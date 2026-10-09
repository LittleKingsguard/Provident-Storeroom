# Contract — the native Rust store for `Provident-Storeroom` (`U-STOREROOM-NATIVE`, `D-GP-SNST`): the record shapes, the walk, the three verbs, the tiers and purge, the journal and rollback, and the store's own persistence

- **Status:** **SPEC — the unit's canonical contract document, authored at the gate-2 spec gate of
  `U-STOREROOM-NATIVE` in the pattern-C directory form, in the same pass as its parts and its index region.**
  Gate 1 is **PASSED**: the gate-1 record's closing determination is **`APPROVE-WITH-CONDITIONS` ·
  `DELEGABLE`** (its `§17.4`, the ELEVENTH issuance), and the architect's go-ahead is **recorded as `A39`**
  — his own words, verbatim: *"Just build the damn thing"* (`P: §16 · A39`). `docs/pending.md` `G-1`'s
  second conjunct is thereby satisfied by the architect's own act, and *"no gate is skipped and no gate
  count moves"* (`P: §16`). **This contract asserts no behaviour clause that the architect's rulings supply
  or that this document itself declares as a reversible default; it takes no ruling, answers no residual
  as a fact, and puts no question to the architect (`P: §10 · A8`; `P: §16 · A38`).**
- **Unit id / prefix:** **`U-STOREROOM-NATIVE`** is the unit id, and **`docs/specs/storeroom-native/`** is
  its contract directory (pattern C). **Prefix `D-GP-SNST`** — *declared by this contract, not previously
  filed*: the proposal filing recorded that **prefix: none declared by this filing** and that *"the unit's
  ids (`P-SN-*` register rows, `PAR-n` parameters, `DD-n` defaults) are owed by the spec gate"*
  (`P: §1`, the header's prefix clause). **This document mints those three id families and no fourth: the
  typed register's rows are `P-IM-n`/`P-SM-n`/`P-TP-n` (§5.2–§5.9), the parameter-semantics rows are
  `PAR-1`…`PAR-11` (`parameter-semantics.md` §2), and the design-default rows are `DD-1`…`DD-30` (§0.2).**
  **⟶ RECONCILED 2026-10-11: the design-default rows are `DD-1`…`DD-31` — `DD-31` was added at this
  contract's fifth bounded amendment, carrying the read's assembly-scope reading — and the as-filed
  range above stands; the table's own census at §0.2 prints `24 + 3 + 2 + 1 + 1 = 31` with its terms.**
  **⟶ RECONCILED 2026-10-11, ONE AMENDMENT LATER (THE PROOFREADING GATE, `role_proofreader`; EVERY CELL ABOVE —
  the as-filed `PAR-1`…`PAR-11`/`DD-1`…`DD-30` line and the `DD-1`…`DD-31` clause under it — STANDS
  BYTE-FOR-BYTE, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF BOTH RANGES THIS INDEX REGION PRINTS)**
  (`RCA-8(d)` ANNOTATE-BESIDE: **the two superseded readings are re-emitted here so nothing either read is
  lost**): **THE AS-FILED LINE READ** *"the parameter-semantics rows are `PAR-1`…`PAR-11`
  (`parameter-semantics.md` §2), and the design-default rows are `DD-1`…`DD-30` (§0.2)"* **and the clause
  beside it read** *"the design-default rows are `DD-1`…`DD-31` … and the as-filed range above stands; the
  table's own census at §0.2 prints `24 + 3 + 2 + 1 + 1 = 31` with its terms"*. **THE OPERATIVE RANGES: the
  parameter-semantics rows are `PAR-1`…`PAR-14` — `PAR-12` (`cfg.listeners[]`), `PAR-13` (the listener's
  `handle`) and `PAR-14` (the store's two per-node listener reference lists) were authored at this
  contract's sixth bounded amendment (the listener amendment), carrying `12 + 1 + 1 + 1 = 14` rows in the
  `§9` index's own terms — and the design-default rows are `DD-1`…`DD-45`, the table's census at `§0.2`
  printing `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` with its terms, with the `⟶ RECONCILED 2026-10-11, ONE
  AMENDMENT LATER` clause at `§0.2` already operative and both of ITS as-filed headings standing above it.**
  **NO ID FAMILY MOVES, NO ROW IS ADDED, DROPPED OR RENUMBERED BY THIS CLAUSE, and this index region's own
  rule — that no pin, no tracker row, no ledger count and no unit row is admitted, minted or moved — is
  untouched** (`[T: the two ranges this index region prints, restated with their terms at the proofreading
  gate | CROSS-REF]`).
  **⟶ RECONCILED 2026-10-11, ONE AMENDMENT LATER — THE `DD` RANGE THIS INDEX REGION PRINTS MOVES BY ONE
  ROW, AND EVERY RANGE ABOVE STANDS BYTE-FOR-BYTE** (`RCA-8(d)` ANNOTATE-BESIDE: **this clause adds no
  `PAR` row and moves no `PAR` figure, and it states which of the index region's own RANGES is operative
  rather than re-printing the as-filed and fifth/sixth/seventh-amendment readings above it**): **THE
  OPERATIVE `DD` RANGE IS `DD-1`…`DD-46`** — `DD-46` is the row this contract's EIGHTH bounded amendment
  authors, carrying the CANONICAL NUMBER SPELLING the architect's ruling `A59` names and leaves ruleless
  (`P: §21 · A59`) together with the narrowed numeric domain and the bound's predicate `A60` names
  (`P: §21 · A60`), **and the table's own census at `§0.2` prints `24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46`
  with its terms.** **THE OPERATIVE `PAR` RANGE STANDS UNMOVED AT `PAR-1`…`PAR-14`** (`12 + 1 + 1 = 14`,
  `§9`'s own corrected arithmetic), **and the typed register stands at its `8` rows with the cap holding
  (`8 ≤ 8` ✓), and the closed fail set stands at `15` members with its own algebra
  (`11 + 2 + 1 + 1 = 15` ✓)** — **so ONE figure moves in this index region and NOT ONE ID IS
  RENUMBERED, DROPPED OR RE-MEANED** (`[T: the `DD` range's restatement to `DD-1`…`DD-46`, so the operative
  id family this index region prints is not left at its seventh-amendment form | CROSS-REF]`). **AND THE
  CITATION FORM THIS AMENDMENT'S TWO RULINGS RESOLVE THROUGH, STATED BECAUSE `A59`/`A60` ARE NOT ROWS OF
  `docs/decisions.md`:** **`A59`/`A60` are the marks the FILED proposal `docs/specs/storeroom-listeners-proposal.md`
  prints at its `§21` for the architect's two verbatim numeric rulings, so every citation of them in this
  directory is written `P: §21 · A59` / `P: §21 · A60`** — the in-project ruled artifact's `§21` with the
  ruling's mark — **exactly as the listener amendment's `A41`–`A58` are cited at `P: §8`–`§20`, and no
  citation is written to a `docs/decisions.md` row this repository does not carry** (`§0.1` item 2's
  resolving-form rule and item 7's citation-admissibility rule;
  `[T: the two rulings' resolving citation form | CROSS-REF]`).
  **No pin, no tracker row, no ledger count and no unit row is admitted, minted or moved by this
  document** — the architect admits rows (`P: §3` item 2; the plan's `§P.6` item 2).
- **The gate-1 disposition this contract derives from — one clause, carried VERBATIM:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  — **the clause's own slots, separated by the middle dot `·`, and its AUTHORITY IS THE FILED GATE-1 RECORD
  ITSELF** (the record's `decomposition` row and its `§4.1`, both resolving in this repository); **the
  unfiled process-rule literal that fixed the clause's spelling is NOT cited here, because this repository
  files no process-rule spec and §0.1 item 7 forbids a citation to a path that cannot be opened.** **Its
  slots are read exactly as the gate-1 record's
  `decomposition` row carries them, and the reading is disclosed rather than smoothed:** the row's
  `disposition` cell reads **`SPLIT-NOW`** and its `decider` cell reads **`the user`** — the *answered-bubble*
  reading, which the record's own `§4.1` clause carries on `NO-SPLIT` / `SPLIT-NOW` / `decider = the user`
  / `bubble = yes` / the token `BUBBLE-ANSWERED: DECLINED | 2026-10-11` (its tenth-pass amended clause,
  `RCA-8(d)` ANNOTATE-BESIDE). **`SPLIT-NOW` on a `NO-SPLIT` row means the split question is SETTLED
  (declined): the `NO-SPLIT` recommendation is adopted, the proposal stands whole, nothing is delegated and
  no `sub-module` is named — never that anything is delegated** (`P: §4 · the decomposition row as amended`;
  `[P: §4.1 | CROSS-REF]`). **This unit's `ordering anchor` is therefore written here: the spec path is
  `docs/specs/storeroom-native/contract.md` and the status-line token is the `SPEC —` clause above
  (`[P: §4.1 | CROSS-REF]`).**
- **⟶ THE AMENDMENT'S OWN DERIVATION, A DATED CLAUSE BESIDE THE CLAUSE ABOVE AND NEVER A SECOND
  `derivation:` CLAUSE** (`RCA-8(d)` ANNOTATE-BESIDE; `AR-11`): **THIS CONTRACT'S SIXTH BOUNDED AMENDMENT —
  THE LISTENER AMENDMENT, dated `2026-10-11` — DERIVES FROM `docs/specs/storeroom-listeners-proposal.md`
  (the architect's proposal and his rulings `A40`–`A58` at its `§8`–`§20`) READ WITH
  `docs/specs/storeroom-listeners-proposal-review.md` (that unit's gate-1 record: the union, the
  `decomposition` row `NO-SPLIT`, the FORM determination — **a BOUNDED AMENDMENT of
  `docs/specs/storeroom-native/`** — and the conditions `AR-1`…`AR-19`).** **Its status-line token remains
  the `SPEC —` clause above, its spec path remains this file, and NO SECOND `derivation:` CLAUSE IS AUTHORED
  BY IT: the clause above is the unit's ONE `derivation:` clause and it stands byte-for-byte**
  (`P: §2 · the FORM determination; R: §4.2`; `implementation-plan.md §8.3`'s `A1` row, whose
  reconciliation is landed at that part's own dated clause).
- **Scope boundary — positive (what this contract binds), and nothing else.** Exactly six things:
  1. **the store's record shapes** — the node kinds, the anchor and the link, the register, and the
     address grammar (`§1`);
  2. **the shared resolver and the walk** (`§2`);
  3. **the three verbs** — the write arms, the read arms and the delete arms (`§3`, `§4`);
  4. **the tiers, the monotonic clause, the shadow and the purge chain** (`§5`), with the typed
     property register at `§5.2`–`§5.9` (`P-IM`/`P-SM`/`P-TP`, **`8` rows, cap is `≤ 8`** — see §0.1);
  5. **the journal, the returned journal op, the rollback and the watched-address list** (`§6`);
  6. **the store's own persistence, the construction inputs, the closed fail-code set with its generated
     messages, and the parameter-semantics rows** (`§7`–`§9`, and the `parameter-semantics` part).
- **Scope boundary — the recorded omissions (part of the closure predicate, and they are ABSENT, never
  written empty).** The three names below are **OMITTED from this unit's contract, with their reason
  recorded here**: **an omitted part is ABSENT, and an empty file at any of these paths is a gate-2
  finding**; **a name that would carry nothing is omitted rather than written empty**
  (`[T: §0.1 item 10's single arithmetic, in which the recorded omissions contribute to **NEITHER side**;
  §0.1 item 10's omission rule, *"a name that carries nothing is omitted rather than written empty"* |
  CROSS-REF]`).

  | Omitted part (slug) | Why it is omitted for **this** unit | Its state |
  | --- | --- | --- |
  | `property-register` | **This unit HAS a register, and the register's canonical home is the contract document's own `§5.x` region — so the part would hold no row the document does not already carry.** The register is `§5.2`–`§5.9` of this document; a part would be a second addressable home for the same rows, which is the shadow-home defect the **second register** rule forbids (`[T: §0.1 item 10 — no second register is authored for this unit, and the `≤ 8` P-row cap is stated at §0.1 item 5 and holds at `8 ≤ 8` | CONTRACT]`). **No second register is authored and no per-part register exists.** | **omitted; the name stays ADMISSIBLE** and may be authored later by its own bounded pass, which would MOVE the rows and leave no second home |
  | `test-cases` | The part is a **derived INVENTORY** of the cases the contract already pins, each citing the contract `§n` that pins it, and its first line must state that it contains **no executable tests**. **This contract's cases are derivable from `§1`–`§9` and from the `§5.2`–`§5.9` register rows directly, and authoring an inventory here would place a second, drift-prone copy of every case beside the clauses that pin them** — while the spec writer's own wall forbids authoring tests in this pass. The inventory's lawful home is the TestWriter's own pass, against this contract's `§`-numbers. | **omitted; ABSENT, never written empty** |
  | `data-class-structure` · `process-flow` | Both are **derived VIEWS** of structure and of flow the contract already declares, and **a new declaration in a view is a gate-2 finding**. This contract declares its record shapes at `§1` and its flow at `§2`–`§7`; a view part would declare nothing new, and its absence loses no claim. | **omitted; ABSENT, never written empty** |
- **The part map (a pointer set — no count, no hash, no cap, and no order).** Each row states its part's
  **KIND**. **Rows are not ranked and no citation anywhere depends on a row's position**; every part is
  cited by its path and its `§<n>`.

  | Part | Kind | Path | What it carries |
  | --- | --- | --- | --- |
  | **the contract document** (this file; **not a part**, and not an entry of the closure predicate's left side) | — | `docs/specs/storeroom-native/contract.md` | the index region (`§0`), the claim ledger and the defaults table (`§0.1`–`§0.3`), and the store's own clauses — the record shapes and the address grammar (`§1`), the resolver and the walk (`§2`), the write arms (`§3`), the read and delete arms (`§4`), the tiers and the purge chain with the typed register (`§5`), the journal and rollback (`§6`), the persistence and the construction inputs with the closed fail-code set (`§7`–`§8`), and the parameter-semantics index (`§9`) |
  | `store-model` | **`carrier`** | `docs/specs/storeroom-native/store-model.md` | **relocated:** the record shapes in their expanded form (`§1`) — the two node kinds, the parent and child anchors, the link and its container, the register, the address grammar, the tier rank, and the walk — *a relocation is not a re-derivation*: every `§`-number, every authority citation and every rule's text is unchanged by the move |
  | `write-and-read` | **`carrier`** | `docs/specs/storeroom-native/write-and-read.md` | **relocated:** the verbs (`§3`–`§4`) — the write arms table, the read arms table, the delete arms table, and the journal and rollback (`§6`), with their authority citations unchanged |
  | `seams-and-lifecycle` | **`carrier`** | `docs/specs/storeroom-native/seams-and-lifecycle.md` | **relocated:** the construction inputs (`§7`), the boot and lifetime clauses, the constraint-evaluation seam, the fail-code set with its generated-message rule (`§8`), and the boundary clauses of the two parks — **⟶ AMENDED 2026-10-11: `§7.2` now carries an added item `7` as well, the `file` tier's JSON text's canonical number spelling with its own rule, its side and its observable (`P: §21 · A59`), and the narrowed numeric domain's reach together with the boot's answer for an out-of-range spelling (`P: §21 · A60`; `DD-46`); the item is authored in that part AND at this document's own `§7.2`, byte-for-byte, in the same pass, because the span has two copies and neither is left stale** |
  | `parameter-semantics` | **`carrier`** (its own authored rows are this part's admissible content; the `§9` index relocates here) | `docs/specs/storeroom-native/parameter-semantics.md` | **relocated:** the `§9` index; **and authored:** one row per declared parameter — **`PAR-1`…`PAR-11`** — carrying the parameter's unit, its domain **and the values outside it**, the declared answer for **each** outside value, its supplier, its evaluator and its observable |
  | `implementation-plan` | **`carrier`** | `docs/specs/storeroom-native/implementation-plan.md` | the unit's ordered landing/verification plan **and its acceptance criterion**, **reconciled to this contract and dated** — carrying **no pinnable claim this contract does not already carry**; the pre-contract plan's own body stands at `docs/specs/storeroom-native-implementation-plan.md`, reconciled, never overwritten |
  **AND ONE POINTER THIS REGION RECONCILES RATHER THAN LEAVES AT AN AS-FILED RANGE** (`RCA-8(d)`
  ANNOTATE-BESIDE: **the table above stands byte-for-byte, this region's closure bullet standing below
  unmoved**; `P: §13 · A69`; `§0.1` item 10(a), the relocation rule; `§3.6`, the cross-document citation
  form; `[T: the pointer's own reconciliation, so a reader of the map is not sent to a superseded range and
  the process-scope reconciliation is findable from the map | CROSS-REF]`): **THE `parameter-semantics` ROW'S
  *"one row per declared parameter — `PAR-1`…`PAR-11`"* RANGE IS THE AS-FILED ONE, and the operative range is
  `PAR-1`…`PAR-14` (`12 + 1 + 1 = 14` ✓), the index region's own dated clause above carrying the same
  figure with its terms; `parameter-semantics.md`'s `§1` (the relocation) and its closing arithmetic carry
  it too.** **AND THE PROCESS-SCOPE RECONCILIATION THE ARCHITECT'S RULING `A69` LANDS IS POINTED FROM HERE:
  the directory holds `5` cells that read the *"per instance and per session"* claim — `§0.4` clause 2 (the
  operative re-statement, `contract.md`), `§6.2`'s `JournalOp.opId` comment (the same claim at the record it
  describes, `contract.md`), the RELOCATED twin of that comment (`write-and-read.md §6.2`, reconciled by
  pointer from `contract.md §6.2`'s dated clause, because `write-and-read.md` is a `carrier` part and its
  span is this document's own `§6.2`), `parameter-semantics.md §2.10` (`PAR-10`'s `domain` cell) and
  `parameter-semantics.md §2.13` (`PAR-13`'s `domain` cell) — and each of the `5` is reconciled in place
  beside its own cell, the as-filed text re-emitted and nothing deleted.** **NO PART ENTRY IS ADDED, DROPPED
  OR RENUMBERED BY THIS CLAUSE: the part map still carries its `6` rows (`5` PART entries + the
  contract-document row), the predicate still reads `5 = 5`, and the three recorded omissions still
  contribute to NEITHER side.**
- **Closure state — `CLOSED`, on the single arithmetic.** `{part-map PART entries}` = `{rows of the part
  map} − {the contract-document row}` = **`5`** · `{files present in docs/specs/storeroom-native/} −
  {contract.md}` = **`5`** (`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`,
  `parameter-semantics.md`, `implementation-plan.md`); **the `3` recorded omissions contribute to NEITHER
  side** — so the predicate reads **`5 = 5`** and this unit's state is **`CLOSED`**
  (`[T: §0.1 item 10 — the closure arithmetic is this document's own index-region rule over the file set
  `docs/specs/storeroom-native/` | CENSUS]`). **The closure arithmetic is a `CENSUS`
  observation about the file set and is not a claim about the store's behaviour**
  (`[T: §0.1 item 10's single arithmetic | CENSUS]`).

---

## §0. The index region's own rules — the claim ledger, the defaults table, and the id families

### §0.1 The document's own form rules

1. **Two regions.** The index region above (status line with its `derivation:` clause, unit/prefix line,
   scope boundary and part map) is **required content and carries no pinnable claim of the seven
   classes**; the claim-bearing region is `§0.2` onward, and **every clause there carries its authority
   and its class inline** (`[<authority> | <class>]`), per the claim-ledger rule this document states for
   itself at items 2–3 and 11 below (`[T: §0.1 item 11's citation forms and §0.1 item 3's closed class set |
   CONTRACT]`).
2. **The authority spellings this document uses, each inside the CLOSED seven-value enum.** **`P`** — the
   in-project ruled artifact `docs/specs/storeroom-native-proposal.md`, cited as `P: §n` or `P: §n · A<m>`;
   **`A`** — an ACTIVE `docs/decisions.md` row, cited by its ROW NAME (this project's archival convention:
   *this file is appended to, so its line anchors drift*). **THE ROW-NAME FORM THIS DOCUMENT USES SO EVERY
   `A:` CITATION RESOLVES MECHANICALLY IN THIS REPOSITORY:** `A: docs/decisions.md · A<n>`, where `<n>` is
   the row's own printed decision marker (`A9`, `A34`·`A35`·`A36`·`A37`, `A38`·`A39`, …) — **the marker
   *is* the row name this project's `docs/decisions.md` prints, so a name-indexed lookup resolves the row by
   the `A<n>` it carries**; where a citation quotes the row's prose besides, it quotes the printed name.
   **AND NO CITATION OF THIS DOCUMENT IS WRITTEN TO A PATH THAT DOES NOT RESOLVE IN THIS REPOSITORY:** a
   process-rule spec that is not filed here is **not** cited by path (see item 11, which states this
   document's own forms for the relocation, the omissions and the closure predicate, all of them `T`-tagged).
   **`R`** — the gate-1 record `docs/specs/storeroom-native-proposal-review.md`, cited as `R: §n`;
   **`S`** — a filed process-rule spec, cited as `S: <path> §n`; **`L`** — the adoption dossier
   `docs/specs/storeroom-native-adoption-dossier.md`, cited by its **`identifier` value and `§`**;
   **`M`** — a measurement of a path; **`T`** — what this contract itself declares.
   **No eighth tag exists, and a tag outside these seven is a filing defect** (`[T: §0.1 item 11's closed
   enum, stated here | CONTRACT]`).
3. **The claim classes are the CLOSED seven:** **`CONTRACT`** · **`OBSERVATION`** · **`CENSUS`** ·
   **`CROSS-REF`** · **`OWED`** (always with an owner **and** a positive revisit condition, never bare) ·
   **`DECLARED-DEFAULT`** (always with its alternative priced) · **`NEGATIVE`** (`[T: §0.1 item 11's closed
   class set, stated here | CONTRACT]`).
   **A claim with no authority, an authority outside the enum, or a class outside the set is a filing
   defect.**
4. **The adjudications this document obeys, stated so they are not mistaken for the corpus's own.**
   **No clause of this contract is derived from `../Provident-Electron/**`**: that corpus is **context, never
   a source**, and *"where my instructions conflict with the existing work is intentional"*
   (`P: §11 · A9`; `A: docs/decisions.md · A9` — the ACTIVE row whose printed name is *"DECIDED: THE
   ADJACENT PROJECT'S FILES ARE CONTEXT ONLY — *"POISONED"* BY HALLUCINATED CONSTRAINTS AND/OR MALFORMED
   DATA STRUCTURING, NEVER MINED FOR DIRECT COPYING — AND WHERE THE DIRECTIVE CONFLICTS WITH THE EXISTING
   WORK THE CONFLICT IS INTENTIONAL (`A9`)"*). **A disagreement
   between a clause below and that corpus is therefore intentional and is not evidence of a defect.**
5. **The typed register's row form and cap.** The register is `§5.2`–`§5.9`, its rows are `P-IM-n`
   (invariant), `P-SM-n` (state-machine/arm) and `P-TP-n` (transition/property) rows, **never `F`-rows and
   never a `§6`/`FS-n` form**, and its **cap is `≤ 8` rows per unit** — **AND THE SPAN `§5.2`–`§5.9` PRINTS
   TWO NUMBER SERIES UNDER ONE SET OF NUMBERS — the register's ROW numbers and the TIER CLAUSES' numbers —
   which the dual-mapping disclosure at `§5.2`'s own head prints whole, with the reading rule every
   citation in this directory obeys** (`[T: the span's two referents, named here and mapped at `§5.2` so no
   citation of `§5.3`/`§5.4`/`§5.5`/`§5.9` is left to a reader's guess | CROSS-REF]`). **The rule is this project's own
   directory-form decision, and its resolving in-project authority is the ACTIVE row of `docs/decisions.md`
   whose printed name is *"DECIDED: THIS PROJECT'S UNIT IDS ARE `U-<NAME>` WITH A UNIT DIRECTORY AT THE SPEC
   GATE (`docs/specs/<unit>/contract.md` + its parts), AND A MONOLITH CONTRACT IS NOT A LAWFUL DRAFT"*
   (`A: docs/decisions.md · the row named "DECIDED: THIS PROJECT'S UNIT IDS ARE `U-<NAME>` WITH A UNIT
   DIRECTORY AT THE SPEC GATE (`docs/specs/<unit>/contract.md` + its parts), AND A MONOLITH CONTRACT IS NOT
   A LAWFUL DRAFT"`), whose cell reads *"for a CODE-BEARING unit the spec MUST also carry the typed `§5.x`
   property register (`P-IM`/`P-SM`/`P-TP` rows, ≤ 8, never `F`-rows, never `§6`/`FS-n`)"*; **no process-rule
   path is cited, because none is filed in this repository** (`[T: the citation's resolving form, per §0.1
   item 2 | CROSS-REF]`). **THIS CONTRACT'S REGISTER CARRIES
   THE `9` ROWS `P-IM-1`…`P-IM-3` · `P-SM-4` · `P-TP-5`…`P-TP-9` — ONE ROW ABOVE THE `≤ 8` CAP — AND THE
   BREACH IS DECLARED RATHER THAN HIDDEN, WITH ITS DISCHARGE FIXED:** rows `P-TP-5` and `P-SM-4` are the
   two halves of **one** invariant (the write's own tier is the addressed version's tier) and are **MERGED
   INTO `P-SM-4` at the first amendment of this contract**, which brings the register to **`8` rows and
   the cap holds**; **until that amendment lands the row is `OWED` with owner `role_spec_writer` and
   positive revisit condition *the first bounded amendment to `docs/specs/storeroom-native/contract.md`***
   (`[A: docs/decisions.md · the row named "DECIDED: THIS PROJECT'S UNIT IDS ARE `U-<NAME>` WITH A UNIT DIRECTORY AT THE SPEC GATE (`docs/specs/<unit>/contract.md` + its parts), AND A MONOLITH CONTRACT IS NOT A LAWFUL DRAFT" (the typed `≤ 8` register rule) | OWED]`). **No row is dropped
   by this declaration and no other cap is touched. **⟶ THE AMENDMENT THAT CELL NAMES HAS LANDED: see the
   dated discharge clause below.**
   **⟶ DISCHARGED 2026-10-11, BY THIS CONTRACT'S FIRST
   BOUNDED AMENDMENT (`RCA-8(d)` ANNOTATE-BESIDE — the as-filed `OWED` cell above stands byte-for-byte
   and THIS clause is the operative statement of the breach's state).** **The as-filed cell read:**
   *"**THIS CONTRACT'S REGISTER CARRIES THE `9` ROWS `P-IM-1`…`P-IM-3` · `P-SM-4` · `P-TP-5`…`P-TP-9` — ONE
   ROW ABOVE THE `≤ 8` CAP — AND THE BREACH IS DECLARED RATHER THAN HIDDEN, WITH ITS DISCHARGE FIXED:** rows
   `P-TP-5` and `P-SM-4` are the two halves of **one** invariant (the write's own tier is the addressed
   version's tier) and are **MERGED INTO `P-SM-4` at the first amendment of this contract**, which brings
   the register to **`8` rows and the cap holds**; **until that amendment lands the row is `OWED` with
   owner `role_spec_writer` and positive revisit condition *the first bounded amendment to
   `docs/specs/storeroom-native/contract.md`***"*. **THE DISCHARGE IS EXACTLY THAT MERGE, TAKEN IN THE
   SURVIVING ROW `§5.4`: the surviving id is `P-SM-4`, and its ONE property statement now carries BOTH
   rows' rules — `P-SM-4`'s landing and arm-exclusivity halves (`§5.4` (a), (b)) and `P-TP-5`'s
   totality-and-strictness half (`§5.4` (c)) — with the two rows' own strategies kept as that row's TWO
   strategy ids (`S-ARM`, `S-TIER`), and the tier order's shadow and purge observables FAILABLE there
   exactly once.** **THE MAPPING OF THE TWO ROWS' RULES ONTO THE SURVIVING ROW, STATED SO NOTHING IS
   SILENTLY DROPPED:** `P-SM-4`'s landing rule → `§5.4` (a); its mutual-exclusivity and pair-count rule
   (`DD-8`, `DD-11`) and its container arm (`DD-1`) → `§5.4` (b); `P-TP-5`'s two-halved tier-order
   property → `§5.4` (c), whose terms are *exactly* the as-filed ones — **`3` ordered pairs over `3` tokens
   ⇒ `3` drives, and each drive has `4` assertions**; the as-filed tier-order failure list, item for item
   — **a shadow that does not win the unqualified read · a write that leaves a lower-persistence version in
   place · a read that answers the higher-persistence version · an equal-tier write that grows the pair
   count · a write that removes a HIGHER persistence version** → `§5.4` (d); and the clauses that row cited
   — `§5.4` arms `W-1`/`W-5`/`W-6`, `§2.3`, `§5.1`'s `M-1` → `§5.4` (e). **AFTER THE AMENDMENT THE REGISTER
   CARRIES `8` ROWS — `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-TP-6` · `P-TP-7` · `P-TP-8` ·
   `P-TP-9` — and the cap holds (`8 ≤ 8` ✓).** **AND `P-IM-3` — THE ONE ROW THE DISCHARGE PRINTED WITHOUT A
   ROW BODY — CARRIES ITS ROW TEXT AT `§5.5`, AUTHORED AT THIS CONTRACT'S SECOND BOUNDED AMENDMENT: its
   property (every minted node reachable by exactly one address path; the five components closing and the
   tier a property), its strategy id (`S-STRUCT`), its failure list and its cited clauses.** **Nothing else
   moved: the surviving merged row is still `P-SM-4`, its pointer clause is now numbered `§5.5.1` (a
   POINTER, and not a row), and `§5.2`–`§5.9` carry `8` rows and NO rowless section**
   (`[T: the missing row's authoring, at this contract's second bounded amendment | CONTRACT]`).** **NO OTHER ROW IS RENUMBERED, ADDED OR REMOVED, NO
   `DECLARED-DEFAULT` ROW MOVES, THE FAIL-CODE SET IS UNTOUCHED, AND THE `derivation:` CLAUSE AND THE PART
   MAP STAND AS FILED** (`[T: the discharge, taken in this contract's first bounded amendment | CONTRACT]`;
   the cap rule stands as `[A: docs/decisions.md · the row named "DECIDED: THIS PROJECT'S UNIT IDS ARE
   `U-<NAME>` WITH A UNIT DIRECTORY AT THE SPEC GATE (`docs/specs/<unit>/contract.md` + its parts), AND A
   MONOLITH CONTRACT IS NOT A LAWFUL DRAFT" (the typed `≤ 8` register rule) | CONTRACT]`).**
6. **The dossier's clause cells resolve against THIS contract.** The dossier's `§1-bis` cells read
   `decision <the ACTIVE row naming A…> — awaiting spec`. **THE TRANSITION INSTRUMENT, STATED WITH A FORM
   THAT RESOLVES IN THIS REPOSITORY:** the dossier's `§0` status header and its `§3-ter` amendments row fix
   the operative state, and the `docs/decisions.md` ROW each cell names is what moves a cell to the third
   legal value **`spec §n` — the value whose section is carried by a FILED spec, i.e. by this contract
   directory**; **the dossier carries no `§2.3` and therefore no `§2.3.2`/`§2.3.3`, so no clause of this
   document cites one** (`[T: the transition instrument, stated in this repository's own terms; the
   dossier's `§1-bis`, `§1-ter` and `§3-ter` are its operative records | CROSS-REF]`). **That transition is
   discharged here for all
   eight rows**, and the resolution map is `§0.3`.
7. **The claim ledger's own form, and the citation-admissibility rule — every clause of this document states its own rule where no external
   authority is filed, and no citation points at a path or an id that does not exist in this repository.**
   **Every authority cell of this document uses ONE of the two bracket forms its ledger uses: `[<authority> |
   <class>]` (bare) or `[<authority>: <what is cited> | <class>]`, where the authority is written as a TAG —
   `P` · `A` · `R` · `S` · `L` · `M` · `T`.** **Where a rule this document obeys comes from a process-rule
   spec or an agent role file that is NOT filed under this repository, the clause STATES THE RULE ITSELF and
   tags it `T`, rather than citing a
   path that cannot be opened** — **the gate-4 adversarial pass found every such citation unresolvable and
   this item is its fix** (`[T: the in-project restatement, taken at this contract's third bounded
   amendment, per §0.1 item 2's own resolving-form requirement | CONTRACT]`). **The three rules this item
   restates, and their homes in this document: (i) the RELOCATION of a section into a part is not a
   re-derivation — no claim gains or loses an authority by moving, and a citation to a relocated section is
   written with the part's path plus the section's `§`-number (`§3.6`, and each part's own scope-boundary
   clause); (ii) the closure predicate and its single arithmetic are stated at item 10 below; (iii) the
   omission rule is item 10's own second clause.**
8. **THE ONE-PREDICATE RULE, RESTATED BECAUSE `A11`'s OWN NAME IS ITS RESOLVING CITATION:**
   **`A: docs/decisions.md · A11`** — *"those are the same thing — a lower-tier one IS a lower persistence
   one"* — and **every clause of this document that says *"lower persistence"* means `rank` ascending**
   (`§2.3`, `§5.1`'s `M-1`).
9. **THE CLOSED-STATUS-CODE RULE, RESTATED WITH ITS RESOLVING CITATION:** **`A: docs/decisions.md · A14`** —
   *"a CLOSED SET OF STATUS CODES with GENERATED messages"* — **carried as `§8.1`'s closed set, `§8.2`'s
   generator and `§8.3`'s record, with the membership this contract's own to close** (`DD-3`).
10. **THE RELOCATION, OMISSION AND CLOSURE RULES THIS DOCUMENT OWNS — the three index-region rules no
    process-rule artifact in this repository carries as bytes.** **Their authority is this contract's own
    statement, and each is `T`-tagged wherever it is cited** (`[T: the three rules below, stated at this
    contract's third bounded amendment so that every clause citing them resolves inside this directory |
    CONTRACT]`):
    - **(a) THE RELOCATION RULE.** **A `carrier` part holds RELOCATED SECTIONS of the contract document's
      own text WHOLE**: the relocated span keeps its `§`-number, its tables, its prose and its authority
      citations unchanged, and **a relocation is not a re-derivation — no claim gains or loses an authority
      by moving** (`§3.6`'s closing pointer; each part's scope-boundary clause). **A citation to a relocated
      section names the part's path plus the `§`-number** (`write-and-read.md §3.4`, etc.), **because a bare
      `§n` across two documents is not an edge** (`§3.6`).
    - **(b) THE OMISSION RULE.** **A part name that would carry nothing is OMITTED RATHER THAN WRITTEN
      EMPTY**; **an omitted part is ABSENT, and an empty file at its path is a filing defect**; **every
      omission is recorded with a one-line reason in the scope boundary's omissions table**, and the
      omissions contribute to NEITHER side of the arithmetic below.
    - **(c) THE CLOSURE PREDICATE AND ITS SINGLE ARITHMETIC.** **`{part-map PART entries}` = `{rows of the
      part map} − {the contract-document row}`, and it equals `{files present in
      docs/specs/storeroom-native/} − {contract.md}`; the predicate holds, the unit's state is then
      `CLOSED`, and the arithmetic is a `CENSUS` observation about the FILE SET and not a claim about the
      store's behaviour.**
11. **THE CLAIM LEDGER'S OWN TWO CLOSED SETS, RESTATED ONE LAST TIME SO EVERY CITATION'S ENUM IS IN THIS
    DOCUMENT AND NOT IN A FILE THIS REPOSITORY DOES NOT CARRY:** **the authority tags are the CLOSED seven
    of item 2 (`P` · `A` · `R` · `S` · `L` · `M` · `T`); the claim classes are the CLOSED seven of item 3
    (`CONTRACT` · `OBSERVATION` · `CENSUS` · `CROSS-REF` · `OWED` · `DECLARED-DEFAULT` · `NEGATIVE`).**
    **AND ONE DISCLOSURE THE `S` TAG OWES: this repository files NO process-rule spec, so an `S:`-tagged
    citation has no path to resolve to — and therefore NO CLAUSE OF THIS DIRECTORY CARRIES ONE** (the
    gate-4 adversarial pass's `CL-1`; `[T: the disclosure, and the count of `S`-tagged citations in this
    directory = `0` | NEGATIVE]`).

### §0.2 THE DESIGN-DEFAULTS TABLE (`DD-1`…`DD-31`) — every residual, reversible, with its alternative priced

**THE RANGE, RECONCILED 2026-10-11:** **the as-filed heading read `DD-1`…`DD-30`; `DD-31` was added at this
contract's fifth bounded amendment and the table's own census below prints `24 + 3 + 2 + 1 + 1 = 31` with its
terms** (`[T: the range's restatement, with the as-filed form named | CROSS-REF]`).

**⟶ RECONCILED 2026-10-11, ONE AMENDMENT LATER: THE TABLE'S RANGE IS `DD-1`…`DD-45`, AND BOTH AS-FILED HEADINGS STAND ABOVE BYTE-FOR-BYTE** (`RCA-8(d)` ANNOTATE-BESIDE: **the heading's `DD-1`…`DD-31` and the reconciliation clause under it are the fifth amendment's state and are read through THIS clause, which is the operative statement of the table's range**): **`DD-41`…`DD-45` were added at this contract's seventh bounded amendment — the correction pass the gate-4 adversarial pass's findings opened — and the table's own census at the foot of this section prints `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` with its terms** (`[T: the range's further restatement, with the two as-filed forms named and nothing deleted | CROSS-REF]`).

**WHAT THIS TABLE IS.** **Every subject the architect's rulings left unnamed, and every row the gate-1
record carried as gate-2 `DECLARED-DEFAULT` carriage, enters this contract as a DECLARED, REVERSIBLE
default** — never as a blocker and never as a question (`P: §16`; the record's `§17.4` condition 1;
`R: §5.1`'s `AR-46` with `AR-44`). **Each row states: what it pins · the clause it cites · what it REFUSES · the
property that checks it · its priced alternative · its reversal point.** **A `DD` row is a claim of the
`DECLARED-DEFAULT` class and its `alt` cell is mandatory** (`[T: §0.1 item 3 (`DECLARED-DEFAULT` is *"always
with its alternative priced"*) and §0.1 item 11's closed class set | CONTRACT]`).
**THE REVERSAL POINT, STATED ONCE FOR EVERY ROW WHOSE SOURCE IS A RULING'S SILENCE:** **a fresh ruling of
the architect recorded as an ACTIVE `docs/decisions.md` row** — the transition instrument `§0.1` item 6 names
— **followed by a bounded amendment of this contract**; **no `DD` row may be reversed by a later pass's
preference, and a park is never a reversal point** (`P: §10 · A8`). **THE REVERSAL POINT FOR EVERY ROW
WHOSE SOURCE IS THIS CONTRACT'S OWN CHOICE:** **a bounded amendment of `docs/specs/storeroom-native/`,
owned by `role_spec_writer`**, with the amendment row recorded. **AND THE PREAMBLE'S PARK RULE IS STATED
WITH ITS OWN CONSEQUENCE, SO NO ROW CONTRADICTS THE TABLE IT LIVES IN:** **a row whose subject is PARKED
cannot name the park's lift as its reversal instrument** — its reversal cell names the INSTRUMENT (a fresh
ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment), **and the park's
lift, where the row's subject also stands parked, is stated in the row's `what it REFUSES` or `property`
cell and never in the reversal cell** (`[T: the park rule's consequence, taken at this contract's third
bounded amendment — the gate-4 adversarial pass's `CL-3` | CONTRACT]`).

| DD | The residual it carries (union row · `J`-ids where the record names them) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-1`** | `U-17` — the empty-container round-trip | a write of an **empty object** mints a `branch` whose container is a `MAP` with **`0` child anchors**, and a read there returns `{}` — **never `[]`** | `§1.3`, `§4.2` | a `branch` that reports the other container's empty form; a write of `{}` minting a `VEC` container | `P-IM-1` (round trip); `P-SM-4`'s container arm | **an empty array `[]` as the empty map's read value** — priced: it would make `{}` and `[]` indistinguishable on read and would break `A22`'s read-inference for the empty case | a bounded amendment; the alternative is available only with `A22` re-read |
| **`DD-2`** | `U-21` · `J-37` — the `file` tier's commit protocol and atomicity | the `file` tier's persistence commit is **atomic at the file**: a failed commit leaves the file's prior bytes intact and the `file` tier's in-memory state **as the journal restores it**; a successful commit writes the whole serialized `file` state | `§7.2`, `§6.4` — **⟶ REPOINTED 2026-10-11 (the `clause it cites` cell): the cell AS FILED read `§7.2`, `§6.4` and no third section, so this repointing ADDS the row the atomicity's property is actually carried by rather than correcting a mis-spelled pointer — the atomicity is observed by `P-TP-9`, whose row stands at `§5.4` (`§5.2`'s dual-mapping disclosure), and the purge chain's own section stands at the same printed number; the two referents are named rather than left to the number** | a **partial** file write visible to a later read; a commit that installs in-memory state before the bytes land | `P-TP-9` | **a non-atomic, in-place rewrite** — priced: `JN-2`'s counter-case (state installed, commit failed) becomes observable and `A16`'s automatic rollback has nothing coherent to restore | a fresh ruling + amendment (the atomicity is `U-21`'s own residual) |
| **`DD-3`** | `U-22` · `J-36` · `J-38` | the fail set is the **closed `14`-member code set of `§8.1`**, the code is a **UPPER-camel string token** (`AddressNotFound`, exactly the architect's own example's spelling — `§8.3`; **this cell's earlier *"lowercase-camel"* spelling is CORRECTED here**, the directory defect the second bounded amendment closes: the token's case is fixed by `P: §11 · A14`'s own example and by `§8.1`'s `code` column, and no lowercased variant is admissible), and the message is **generated** from the code and its arguments by the rule of `§8.2` | `§8.1`, `§8.2`, `§8.3` | an **open** error surface; a numeric code; a lowercased or prefixed spelling (`§8.3`); a hand-authored (non-generated) message; a `null`/`undefined` code | `P-TP-9` | **a `22`-token or otherwise larger union** — priced: every extra token is a fail-state with no ruled trigger, and each would need its own generator template | a bounded amendment (the set is this contract's to close: `P: §14 · A14` names the FORM, not the membership) |
| **`DD-4`** | `U-28` — concurrency, reentrancy and isolation | **one store instance is not reentrant across a write**: a write that fails leaves the store in its pre-write state, and no partial subtree of a failed write is observable by any read | `§3.5`, `§6.4` | an observable half-installed subtree after a failure; a read that sees a write's provisional state | `P-TP-9` | **an intermediate-observable write** — priced: `JN-3` (a rollback restoring data another op overwrote) becomes reachable and the `A35` walk has no stable floor | a fresh ruling + amendment |
| **`DD-5`** | `U-29` — the intermediate non-resolving and intermediate-leaf write arms | a write whose **intermediate** segment resolves to a **leaf** fails `LeafHasNoDownstream` and installs nothing; a write whose **intermediate** segment does not resolve fails `AddressNotFound` and installs nothing | `§3.4`, `§3.5` | silent re-minting of an intermediate leaf into a branch; a partial install below the failing segment | `P-TP-9`; `P-IM-1` | **re-minting the intermediate leaf as a branch** — priced: it makes a write's reach unbounded by its caller's tree and contradicts the directive's *"fail verbosely"* | a bounded amendment |
| **`DD-6`** | `U-43` — reachability: every node reachable by exactly one address path | **every minted node is reachable by exactly one address path**: a node's address is `its parent's address ++ its key` at one tier, and **no two distinct paths resolve to one node** | `§1.5`, `§5.2` | a node reachable at two keys; a node whose anchor is reachable at two tiers under one address (the `A34` composite key forbids it) | `P-IM-1` | **a node shared by two anchors** — priced: the read's per-key assembly (one value per key) would have two sources and would stop being a function | a bounded amendment |
| **`DD-7`** | `U-46`'s residual half — the identifier meanings the rulings left unnamed | the store's vocabulary is exactly `§1`'s, and **each name's meaning is the one `L: §1-bis` records**, resolved to the section named in `§0.3` | `§1`, `§0.3` | an adopted meaning from outside this project; a second meaning for one name | `P-IM-1`…`P-TP-9` | **re-deriving a name from the corpus** — priced: forbidden outright by `A9` (*"not to be mined for direct copying"*); the alternative is not available at any price | none but a fresh ruling that re-opens `A9` |
| **`DD-8`** | `J-30` — the same-tier write arm | a write at a tier **equal** to the addressed anchor's tier is the **purge arm**: the old anchor is **removed** and the new anchor is minted in its place, so the version **count does not grow** | `§5.4` arm `W-1` | shadowing at the equal tier (which would put **two** anchors at one `(key, tier)` pair, forbidden by `P: §15 · A34`); an append at the equal tier | `P-SM-4` | **an equal-tier shadow** — priced: it breaks `A34`'s *"at most one child anchor per key/index and tier"*, so it is not available while `A34` stands | a fresh ruling + amendment |
| **`DD-9`** | `J-31` · `J-32` — the delete's answer and its cascade | `delete` returns **`DeleteReceipt { address, tiers }`** — the tiers whose versions were removed, in the canonical order of `§5.1` — and **an address with no version at the named tier is not a failure**: it returns a receipt with `tiers: []` | `§4.3`, `§4.4` | a `throw` for a delete that removed nothing; a delete that removes a higher-persistence version the caller did not name (that is `purge`, a **write**'s act, `P: §12 · A19`) | `P-TP-8` | **a `TierNotFound` refusal for a no-op delete** — priced: `A12` scopes the verb by tier and names no refusal for an absent version, so a refusal would invent a fail-state | a bounded amendment |
| **`DD-10`** | `J-53` — where the write's tier argument lands on the minted anchor set | the write's single tier argument lands on the **new child anchor's `tier` property only**; every other anchor the write mints (each descendant branch's anchor) carries **the same tier**, because a child anchor may not be more persistent than its parent's (`§5.1`'s `M-1`, the rank the clause reads) | `§3.3`, `§5.1`'s `M-1` | a minted descendant anchor at a **higher**-persistence tier than the write's tier; a per-descendant tier | `P-SM-4`; `P-TP-6` | **per-descendant tier assignment** — priced: the write would need a tier per segment, which `A24`'s *"exactly one required on write"* forbids | a fresh ruling + amendment |
| **`DD-11`** | `J-54`'s contract half — a write at an occupied pair | a write at a pair the **same tier** already occupies is `DD-8`'s purge arm, so **no `ContainerKindConflict` and no `PairOccupied` failure arises at an occupied `(key, tier)` pair**; the pair is replaced, never a second anchor minted | `§5.4` arm `W-1` | a second anchor at one pair; a refusal at an occupied pair | `P-SM-4` | **a `PairOccupied` refusal** — priced: it would make an idempotent re-write (`write(a, tier, v)` twice) a failure, contradicting the directive's *"If there is a node already under that key/index on the address-resolved node, then it is overwritten"* | a bounded amendment |
| **`DD-12`** | `J-55` — a passed tier matching no version | a read whose passed tier set matches **no** version at an address that **exists** fails **`TierNotFound`** | `§4.2`, `§8.1` | a `null` answer; an empty object answer; a fall-through to the lowest-persistence version (that is the **zero-tier** arm, reserved to it by `A28`) | `P-SM-4` | **a `null` answer** — priced: the same `null` would then mean both *"the tier is absent"* and *"the key is absent"*, and `A14`'s *"closed set of codes with generated messages"* would have no caller for `TierNotFound` | a bounded amendment |
| **`DD-13`** | `J-56` · `J-65` — what the `secure` instance answers for a sub-floor address | a sub-floor address (`file` or deeper **absent** from the instance's tier domain) is **NOT SEEN** by the instance: the resolver answers **`AddressNotFound`**, exactly as for an address that does not exist — **no distinct refusal code exists for the floor and none is authored** | `§8.3` | a `BelowSecureFloor` code; a distinct floor-specific message; a refusal record that distinguishes invisibility from absence | no property observes the floor (it is client-side) — `P: §14 · A32` + `P: §15 · A36` ** | **a distinct floor code** — priced: it would make the instance's *"not see it"* observable, contradicting `A36`'s own words, and it would move a **client-side** duty into the store | a fresh ruling + amendment |
| **`DD-14`** | `J-57` — the instance's sharing | **the `secure` instance is a separate instance** (`P: §9 · A4`): it does **not** share the base instance's journal, its listener registrations or its `file` path — **each instance owns its own journal, its own watched set and its own `file` path**, and **"does not share its `file` path" means the instance owns its own `file`-tier handle and its own commit path, NOT that two instances given an EQUAL `cfg.filePath` cannot both reach the bytes at that path** (see the independence clause's corrected terms at `§5.7` (the `P-TP-7` row): the boot-load of `§7.2` item 6 and the commit of `§7.2` item 1 are the `file` tier's own declared behaviour at whatever path the cfg names, and they are **NOT** an instance-to-instance channel) | `§7.1`, `§7.2` | a shared journal; a shared watched set; a shared in-memory `file`-tier state or handle; a global singleton store; **a reading of this row that makes the `file` tier's own boot-load or commit a "sharing"** | `P-TP-6` | **sharing the base instance's journal** — priced: two instances' `A35` walks would reach each other's subtrees, and the `A16` automatic rollback would restore another instance's state | a fresh ruling + amendment |
| **`DD-15`** | `J-58` — the client-side duty's home | the `file` **floor** is enforced **client-side** and is a **`HO-` handoff, never a step of this unit**: **this contract declares no floor-policing clause, no floor parameter and no floor check** | `§8.3` | a floor check inside the store; a floor parameter; a plan phase that wires the floor | `DD-13`'s clause (the observation) | **an in-store floor** — priced: it would contradict `A32`'s *"Client-side"* and `AR-36`'s handoff rule, and a red row or unit row that wires the host **fails** | **the preamble's own instrument: a fresh ruling that re-opens `A32` (or `A4`) recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract** (`A: docs/decisions.md · A32`; `P: §14 · A32`) |
| **`DD-16`** | `J-59` — which journal parameters are required, their absence of a default, the unit of measure, and the walk past a compressed base | the journal's construction argument is **exactly one**: **`journalLength`, a positive integer counting *entries*** — **required, with NO default**, and **a missing value is a construction-time `ConstructionArgumentMissing` failure while a present-but-out-of-domain value is an `AddressMalformed` failure (`§7.1`)**; **the caller supplies no base state and no trigger**; and **a rollback may NOT walk past a compressed base** (`P: §15 · A35`'s *"old enough to be compacted … out of scope"*) | `§7.1`, `§6.1`, `§8.1` | a default value; a second required argument; an unstated unit; a rollback that reaches a compacted entry | `P-TP-7` | **a defaulted length** — priced: a fabricated default is exactly the *"decision the consumer owns, baked in as the mechanism's default"* the consuming project's `P-3` bans, and `A31` names the **caller** as the value's owner (*"Required as args on store creation"*) | a bounded amendment; a value's default is available only against a fresh ruling |
| **`DD-17`** | `J-60` — a missing required construction argument's failure | `storeCreate` with a missing or invalid **`filePath`** or **`journalLength`** **fails at construction** with `ConstructionArgumentMissing` (+ `AddressMalformed` when an argument is present but invalid), and **no store instance is returned** | `§7.1`, `§8.1` | an instance that fails at first use instead; a partially constructed instance | `P-TP-7` | **a deferred failure at first write** — priced: it moves a construction fault into the write arm, where `P-TP-7` cannot observe it, and `A16`'s automatic rollback would run against a journal that was never valid | a bounded amendment |
| **`DD-18`** | `J-61` — ancestry only, or ancestry-plus-descendants | the watched set is **descendant-inclusive from the watched address downward**: a watched address `W` is alerted when a write's address `X` satisfies **`W` is a prefix of `X`** (i.e. the write resolves **to** `W` or **through** `W`, which includes resolving to a descendant of `W`) | `§6.5` | ancestry-only selection (a write deep inside `W`'s subtree would not alert `W`); an exact-match-only selection | `P-TP-8` | **ancestry only** — priced: `A37`'s own words are *"the address or any of its descendants"*, so ancestry-only is not available while `A37` stands | **the preamble's own instrument: a fresh ruling that re-opens `A37`'s alert-rule clause recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract** (`A: docs/decisions.md · A34`·`A35`·`A36`·`A37`; `P: §15 · A37`) |
| **`DD-19`** | `J-62` — a contradicting write's code and residue | a write whose JSON top-level kind contradicts the target container fails **`ContainerKindConflict`**, and the failed write leaves **the container, the node and the journal UNTOUCHED** — no journal entry is appended for a failed write | `§8.1`, `§3.4`, `§6.4` | a mutation before the kind check; a journal entry for a failed write; a distinct code per direction (both directions share the one code) | `P-SM-4`; `P-TP-9` | **a direction-specific code pair** — priced: two codes would observe one rule (`A22` names one failure for both directions), and a caller cannot act differently on the two | a bounded amendment |
| **`DD-20`** | `J-63` — a partial rollback's availability | a rollback is addressed by **op id** and is **TOTAL over its scope** — it undoes **every** un-compacted operation touching the same subtree; **no partial/subset rollback is available and none is declared** | `§6.4` | a subset rollback; a per-op rollback; a rollback by address or timestamp | `P-TP-8` | **a subset rollback** — priced: `A35`'s scope is *"every operation touching the same subtree"*, and a subset would need a selection rule no ruling supplies | a fresh ruling + amendment |
| **`DD-21`** | `J-64` — what *"the same subtree"* is measured against | the rollback's scope is measured against **the written address's own subtree**: an operation is in scope iff **its address has the rolled-back write's address as a prefix** (itself or a descendant), at **any** tier | `§6.4` | a store-wide rollback; a scope measured against the failing operation alone | `P-TP-8` | **a store-wide rollback** — priced: it would undo operations in unrelated subtrees, which `A35`'s *"the same subtree"* forbids | a fresh ruling + amendment |
| **`DD-22`** | `J-66` — the op's concrete record shape and its id's type | `JournalOp` is the record of `§6.2`: **`opId: string`** (the id's type) · `address` · `tier` · `before` (the enough-to-reconstruct snapshot) · `after` (enough-to-resolve-the-current-state) · `seq: number` · `compacted: boolean` | `§6.2` | an opaque handle; an id of a numeric or object type; an op without its two state halves | `P-TP-8` | **an opaque handle** — priced: `P: §15 · A37` requires the op to *"store enough data to reconstruct the original tree and resolve the current state"*, which an opaque handle cannot be shown to do | a bounded amendment |
| **`DD-23`** | `J-27` · `J-28` · `J-67` — the listener's attachment rule, the alerted list's order, and a throwing body | **NOT SPECIFIED BY THIS CONTRACT — PARKED.** This contract declares only that the store **tracks registrations** keyed by the **watched address** and returns the list of **distinct watched addresses** whose registration is in the descendant-inclusive scope of the write (`DD-18`), with **`watch` returning an opaque registration handle**; **the order of the returned list, the attachment-by-identity rule, the firing mechanism, the callback invocation, the JS-facing surface and a throwing body's disposition are `P-3`'s** | `§6.5` | any contract clause on order, identity attachment, firing or throw behaviour; a store-side callback invocation | `P-TP-8` (the list's *membership* only — the order is not observable here) | **an ordered, callback-invoking surface** — priced: it is the `P-1` crossing (`A7`'s *"so that node can instruct"*), and a park read as a closure is a finding; **the row's subject also stands in `docs/pending.md` `P-3`'s park, whose lift is the architect's act (`R: §17.1`) — the park is stated in this cell and NEVER as the reversal instrument** | **the preamble's own instrument: a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract** (`A: docs/decisions.md · A38`·`A39`; `P: §10 · A8`) — **which also lifts `P-3`, the lift being the architect's act and never a pass's** |
| **`DD-24`** | the contract's own choices, declared so they are not silent | **(a)** this document's prefix `D-GP-SNST` and its three id families are **this contract's own mint** (`P: §1`'s *"owed by the spec gate"* clause); **(b)** a failure is delivered by **`throw` of the `StoreError` of `§8.3`**, never as a returned tagged union; **(c)** the address segment domain is the **strict** one of `§1.5`; **(d)** the address is supplied as a **JS/JSON array**, *"containing the path to walk through the tree"* (`P: §1`), and **not as a delimited string**; **(e)** a node's value is admitted by the **taxonomy of `§1.4`** | `§1.4`, `§1.5`, `§8.3` | a second prefix; a returned-union error channel; a permissive segment coercer; a string address; an unadmitted value class | `P-TP-9`; `P-IM-1` | **(a)** a `P-SN-*`-prefixed spelling and a different register prefix — priced: either is a rename with no behaviour change, so the price is a citation sweep; **(b)** a returned `{status, …}` union — priced: it makes **every** call site branch on the arm, and `A14`'s example (`status: 'AddressNotFound'`) is a *status code*, which a thrown record carries equally well; **(c)** numeric-string coercion and negative-index-from-end — priced: *"0"* and `0` would resolve alike, destroying `A22`'s read-inference between `MAP` and `VEC`; **(d)** a `"a.b.c"` string form — priced: a key containing a dot becomes unaddressable; **(e)** admitting `null`/functions/`undefined` as leaves — priced: the round trip cannot distinguish `null` from "absent" and a function has no JSON image; **(f)** the register's KEY-DOMAIN reading of `§1.6` — **an INDEX-shaped segment admissible at the register, i.e. the register carrying an ordered-vector form** — priced: `A23`'s own words are *"Registry is always hashmap"*, so an index at the register would give the register a second key domain and would collide with `L-INT-REG`'s own arm (`§2.2`, whose code is `AddressNotFound`); the alternative is therefore available only with `A23` re-read and the arm moved with it | a bounded amendment |

**AND THREE `DD` ROWS MORE, ADDED AT THIS CONTRACT'S SECOND BOUNDED AMENDMENT — THE RESIDUALS THE RED SET'S
STOP-GRADE FINDINGS LEFT OPEN, EACH REVERSIBLE AND EACH WITH ITS ALTERNATIVE PRICED:**

| DD | The residual it carries | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-25`** | this contract's own choice — **the `file`-commit failure's CODE** | **the `file` tier's commit failure answers the member `FileCommitFailed` (`§8.1` #14)** — **one code for all THREE of the failure's parts** (the serialization, the file write, the journal append), delivered **after** `A16`'s automatic journal rollback has run, with **its generated message built from `§8.2`'s `FileCommitFailed` row** and its `MessageArgs.path` | `§7.2` items 3–4; `§8.1` #14; `§8.2` | a family of codes (one per failing part); a `file`-failure carried by an earlier member; a `file`-failure that returns no code at all; a `mem`/`temp` write producing this code | `P-TP-9` (the `file` commit's failure arm — the code and the message) | **narrowing `§7.2`/`§5.9` to a member the set already carried** — priced: **no earlier member's trigger is a serialization, a file write or a journal append**, so the `file`-commit arm would have **no code to observe** and `P-TP-9`'s converse half would fail by construction (`F-10`) | a bounded amendment of this contract (the membership is the contract's own to close: `P: §11 · A14` names the FORM) |
| **`DD-26`** | this contract's own choice — **the tier-qualified registration's effect on the returned watched-address list** | **a `watch` made WITH a tier argument is TIER-QUALIFIED: its address is returned after a successful write at `X` iff `W` is a prefix of `X` AND the write's tier is one of the registration's tier arguments**; **an unqualified registration (`tier` absent or a `0`-token set) has NO tier test**; **the returned list stays a set of ADDRESSES, so registering one address at two tiers yields ONE member** | `§6.5` item 7; `§3.1.1`'s `watch` row | a tier-qualified registration returned after a write at a tier it does not name; a tier test applied to an unqualified registration; a duplicated member for one address registered at two tiers; **any clause on the LISTENER's order, attachment, firing or body** (that is `P-3`'s, `DD-23`) | `P-TP-8` | **striking `§3.1.1`'s `watch` tier column instead — i.e. leaving the argument legal but meaningless** — priced: a legal argument with no declared effect is exactly the undeclared semantics the `PAR` rows exist to prevent, and the red set's `F-12` exposed that the first amendment's cell pointed at a `DD-24` clause that does not exist; **the alternative is available only if that row's tier cells are struck with it** | a bounded amendment |
| **`DD-27`** | this contract's own choice — **how the monotonic clause is made REACHABLE: what the parent resolution runs on** | **the write's parent resolution is TIER-AGNOSTIC (the walk's zero-tier, lowest-persistence arm of `§2.3`), and the monotonic clause is evaluated over the parent anchor so reached and the child anchor the write mints at its own tier** — **so a child CAN differ in tier from its parent, `F-6` is REACHABLE, and `S-MONO`'s `3 × 3` pair table closes as `6` successes + `3` failures = `9`** | `§3.2` items 2 and 4; `§1.2`; `§3.4` arm `F-6`; `§5.6` | **the first amendment's reading, under which `findAddress(parent, tier)` passed the WRITE's own tier and the parent anchor was therefore always at the child's own tier** — which made `F-6` unreachable, falsified `S-MONO`'s pair table (`6 + 3 = 9` did not close) and left `§5.9`'s converse half failing at exactly one member (`F-2`); a per-segment tier; a parent search qualified by any tier a caller passes to a WRITE | `P-TP-6` | **withdrawing `F-6` and `P-TP-6`'s nested half instead** — priced: `§8.1` #6 would have **no trigger at all**, `§5.9`'s closure would fail by construction and a member of the closed set would be unreachable — a worse defect than the reading's cost | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row + a bounded amendment |
| **`DD-28`** | this contract's own choice — **the `delete` and the `rollback` DO NOT COMMIT THE FILE, and the `file` tier's durability is a WRITE's act alone** (the gate-4 adversarial pass's `S-5`) | **`file`-TIER DURABILITY IS PRODUCED BY A SUCCESSFUL `file`-TIER `write` ONLY:** **a `delete` — of any tier scope, including one that removes `file`-tier versions — performs NO file I/O, and a `rollback` performs NO file I/O**; consequently **a FRESH `storeCreate(cfg)` with the same `cfg.filePath` re-boots from the last committed `file` write's bytes, so a version the delete or the rollback removed in memory STANDS AGAIN after the re-boot** — **that re-boot is exactly `§7.2` item 6's declared boot, and it is the declared consequence of this row rather than a defect** | `§7.2` items 1, 5 and 6; `§4.4`; `§6.4` `M-9` | a delete or a rollback that commits the file; a `mem`/`temp` write that reaches the file; a re-boot that reads an uncommitted in-memory state | `P-TP-7` (`S-CONSTRUCT`'s independence drive, over a fresh instance and an equal `filePath`); `P-TP-9` (the `file` failure arm's code, which only a write can produce) | **a `file`-COMMITTING delete and rollback — priced: it moves the durability duty from the write to two further verbs, gives a `delete` or a `rollback` a SECOND failure arm whose code the closed set carries only as `FileCommitFailed` (`§8.1` #14 is a *"`file`-TIER WRITE'S failure path"*), and would require `A16`'s automatic journal rollback — a write's arm — to be re-stated for two verbs `A16` does not name; the alternative is available only with `A16` re-read and one arm added per verb** | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row (`A: docs/decisions.md · A16`), followed by a bounded amendment of this contract |
| **`DD-29`** | this contract's own choice — **the BOOT's answer for a `file` content that carries a NON-ADMITTED value class** (the gate-4 adversarial pass's `S-6`) | **`§1.4`'s taxonomy is a WRITE-TIME rule, and the boot is not a write:** **on `storeCreate`, the `file` tier's content at `cfg.filePath` is loaded per `§7.2` item 6, and a register KEY whose value lies outside `§1.4`'s admitted set is DROPPED from the boot's register — the rest of the content loads, the instance IS returned, and NO code is produced for the dropped key** — **so the store's register begins with exactly the keys whose values the taxonomy admits** | `§7.2` item 6; `§1.4`; `§7.1` | a boot that FAILS on a non-admitted class; a boot that admits one and mints a node for it; a code produced for the dropped key; a boot that drops a key whose value IS admitted | `P-TP-7`'s boot half (`0` register keys before any write, and the keys the file's admitted content carries after one) | **`ValueNotAdmitted` AT BOOT — priced: `§8.1` #13's trigger is *"a write whose `value` is outside `§1.4`'s admitted set (`F-2`)"*, so a boot-time use of that member would widen its trigger beyond the write arm and `§5.9`'s `S-FAILSET` drive would then have one code with two unrelated triggers; a second alternative — refusing to start — would leave the caller with NO instance for a file it can otherwise read, which is a worse outcome than dropping one key** | a bounded amendment of this contract (the boot's treatment of an unadmitted class is this contract's own to close, and `§8.1` is untouched by it) |

**AND ONE `DD` ROW MORE, ADDED AT THIS CONTRACT'S FOURTH BOUNDED AMENDMENT — THE ONE STATE THE DELETE'S
ARMS LEFT SILENT, THE GATE-4 ADVERSARIAL PASS'S `H-2` FINDING, CARRIED REVERSIBLE AND WITH ITS ALTERNATIVE
PRICED, IN THE SAME CELL FORM AS THE TWO BLOCKS ABOVE:**

| DD | The residual it carries | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-30`** | this contract's own choice — **the delete's effect on a `VEC`'s SURVIVING INDEX KEYS** (the gate-4 adversarial pass's `H-2`, and the implementer's fix of it) | **a delete of an indexed version of a `VEC`'s container RENUMBERS that container's SURVIVING ANCHORS IN CONTAINER ORDER FROM `0` — each KEEPING ITS TIER and its NODE, only its index key moving** — **with the container's index domain left CONTIGUOUS FROM `0` (`§1.3`), the parent's own read DENSE AGAIN (`§4.2` arm `R-3`), and every minted node REACHABLE BY EXACTLY ONE ADDRESS PATH (`§5.5`'s `P-IM-3`) — and the `DeleteReceipt`'s two members UNCHANGED by the relabelling (`tiers` = the tiers whose versions were removed; `address` = the caller's array VERBATIM)**; **`VEC`-only, and the register's own keys and a `MAP`'s string keys are never relabelled** | `§4.3`, `§4.4`; `§1.3`'s `VEC` key domain; `§4.2` `R-3`; **`§5.5`'s `P-IM-3` row — the ROW, not the purge-chain number the same `§5.5` prints** | **a delete that leaves an index GAP** (so the parent's read is no longer dense and the container's index domain is no longer contiguous from `0`); **a survivor that keeps its OLD index key**; **a delete of the removed node's own index that leaves the node resolvable there anyway**; **a relabelled `MAP` key or a relabelled register key**; **a surviving anchor whose tier or node the relabelling moves**; **a relabelling that changes the receipt's `tiers` or `address` member** | **`P-IM-3`** (`S-STRUCT` — the read's closure half: the parent's read answers `R-3`'s dense array over the anchors the container's own index keys point to, so `dense from 0` is the observable this row is now failable on) **+ `P-SM-4`'s `D-1`/`D-3` delete pair as `P-TP-8` carries it** — **the register is UNCHANGED: no row is added, dropped or renumbered and the failure lists stand**, because the clause declares what a delete MUST produce inside an arm the tables already carry and makes no state failable that was not already failable | **an INDEX-PRESERVING `VEC` — the delete leaves the gap and the surviving anchors keep their old index keys — priced: a gap breaks `§1.3`'s own index-key domain (*"index keys — non-negative integers, contiguous from `0`"*) and `§4.2` `R-3`'s *"dense from `0` … the container's contiguous index count"*; and if the keys are instead read as *renumbered but unaddressable*, the surviving node that stood at index `1` resolves at NO address — **outside its own parent's read** — which is exactly `P-IM-3`'s failure *"a minted node no address resolves to"* (`§5.5`), so the alternative is available only with `§1.3`'s `VEC` key-domain clause AND `§4.2` `R-3`'s density clause BOTH re-read** | **a fresh ruling recorded as an ACTIVE `docs/decisions.md` row — a bounded amendment of this contract is the instrument, and the ruling is the one that re-reads `A19`'s purge definition (`A: docs/decisions.md · A19`) or the directive's own cascade sentence** (`P: §1`, `P: §12 · A19`) |

**AND ONE `DD` ROW MORE, ADDED AT THIS CONTRACT'S FIFTH BOUNDED AMENDMENT — THE READ'S ASSEMBLY SCOPE, THE
ONE READING A FRESHLY-RUN BLIND GREENS SET PUT IN DISPUTE (`docs/specs/storeroom-native-greens.md`'s `F-1`),
CARRIED REVERSIBLE AND WITH ITS ALTERNATIVE PRICED, IN THE SAME CELL FORM AS THE BLOCKS ABOVE:**

| DD | The residual it carries | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-31`** | this contract's own choice — **THE READ'S ASSEMBLY SCOPE: how far the passed tier set reaches during the read's ASSEMBLY** (the reading `§2.2`'s scope clause left open when it was extended from the WALK to the ASSEMBLY, and the state `docs/specs/storeroom-native-greens.md`'s `F-1` puts in dispute) | **THE PASSED SET GOVERNS VERSION SELECTION PER ADDRESS, AND NEVER WHETHER A READ SUCCEEDS: in the ASSEMBLY's recursive walk the passed set is applied at each step exactly as `§2.3` applies it at a walk step — each member's value is produced by the same read applied to the node of the lowest-persistence anchor WITHIN THE PASSED SET (`§4.2` `R-2`/`R-3`/`R-4`) — and where a key's container holds an anchor but the set selects NO version for it, THAT KEY CONTRIBUTES NO MEMBER rather than failing the read: the read OMITS it, substitutes NO out-of-set anchor, and never falls back to the lowest-persistence arm `A28` reserves to a `0`-token set**; **so `read(a, T)` for a non-empty set `T` answers whenever `a`'s OWN anchor has a version at a tier in `T`, and its assembled subtree carries exactly the members whose selected versions lie in `T`** | `§4.2` `R-4`'s assembly clause and that section's closing sentence; `§2.2`'s scope clause; `§2.3`; `P: §1`'s walk clause (*"checks for a key matching the popped value and, if any, passed tier"*, which speaks about the WALK's steps and not about how a subtree is condensed) | **the ASSEMBLY answering `L-TIER`'s `TierNotFound` for a key the set does not cover** (the reading `§4.2`'s as-filed clause carried, which makes `read(['g'], {file})` unreadable over a `file`-tier `g` whose child `c` stands at `temp` — the state `A19`/`A27` and `§5.6`'s `3 × 3` census exist to make reachable); **an assembled member produced by an anchor at a tier the caller did not pass** (`H-1`'s finding, which stands closed); **a silent fall-back to the lowest-persistence arm under a non-empty set** | **`P-IM-1`** (`S-RT` — the tier-set round trip: write, then read with a set, at an address whose subtree lies inside the set) **+ `P-SM-4`'s (c)/(d) through `S-TIER`** (the tier order and the selection, which this row's omission must not move) — **the register is UNCHANGED: no row is added, dropped or renumbered and no failure list moves**, because the ruling makes no state failable that was not already failable | **FAILING THE WHOLE READ — priced: `TierNotFound` for a descendant the caller did not address makes the contract's own legal state unreadable at its parent's own tier, contradicting `§4.1`'s return table (`R-2`: *one member per key*), `§2.2`'s own sentence (*"a node the walk has resolved has no tier test of its own"*), and `A19`/`A27`'s admission of a child LESS persistent than its parent; the alternative is available only if those three are re-read, and it is the reading the blind set's `F-1` reports as the defect**; **the second alternative — the ASSEMBLY FALLING BACK to the lowest-persistence anchor — is `H-1`'s closed STOP-GRADE finding and is NOT available while `§2.2`'s walk rule stands** | **a fresh ruling recorded as an ACTIVE `docs/decisions.md` row (`A: docs/decisions.md · A24`·`A28`), followed by a bounded amendment of this contract — or a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`** (a `DD`-row change, per `§0.2`'s preamble instrument), **for the omission half alone — that half being this contract's own reading, because `A24`'s own words (*"reading any node that matches one if any tier is passed"*) name no failure and `A28` speaks to the zero-tier arm alone, neither ruling the assembly's disposition of a member outside the set** |

**AND THE ONE SUBJECT OF THOSE FINDINGS THAT IS NOT A `DD` ROW, NAMED SO THE `DD` SET'S SCOPE IS NOT
MISREAD:** **the `P-IM-3` row's own authoring (`§5.5`) is a DECISION stated as a clause and not a default** —
it fills a row the first amendment's register DECLARED and left without text, **so it REFUSES no alternative
the rulings left open and carries itself at its own `§`**; **`FileCommitFailed`'s POSITION in the set
(`§8.1` #14) is a clause likewise, and its own reversibility is `DD-25`'s subject**
(`[T: §0.1 item 3's `DECLARED-DEFAULT` rule — *"always with its alternative priced"*; the scope note, so the
three added rows are not read as covering the row authoring too | CONTRACT]`).
**AND THE TABLE'S OWN CENSUS, PRINTED WITH ITS TERMS AFTER THIS CONTRACT'S FOURTH BOUNDED AMENDMENT: the
table carries `30` rows — `DD-1`…`DD-24` (`24` rows, the as-filed set) + `DD-25`…`DD-27` (`3` rows, added
at the second bounded amendment) + `DD-28`/`DD-29` (`2` rows, added at the third, carrying the
`delete`/`rollback` durability reading and the boot's non-admitted-class reading) + `DD-30` (`1` row, added
at this fourth amendment, carrying the delete's renumbering of a `VEC`'s surviving index keys) —
**so `24 + 3 + 2 + 1 = 30` ✓**,
and **every row of the `30` carries an `alt` cell with a price and a reversal cell naming an instrument, no
reversal cell naming a park** (`[T: the table's own arithmetic, with its terms | CENSUS]`).

**⟶ RECONCILED 2026-10-11 — THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS AFTER THIS CONTRACT'S FIFTH
BOUNDED AMENDMENT (the read's assembly-scope determination): the table carries `31` rows — `DD-1`…`DD-24`
(`24` rows, the as-filed set) + `DD-25`…`DD-27` (`3` rows, the second bounded amendment) + `DD-28`/`DD-29`
(`2` rows, the third) + `DD-30` (`1` row, the fourth) + **`DD-31`** (`1` row, added at this fifth amendment,
carrying the read's assembly-scope reading: the passed set governs version selection per address during the
assembly's walk, and a member for which the set selects no version is OMITTED) —
**so `24 + 3 + 2 + 1 + 1 = 31` ✓**, and **every row of the `31` carries an `alt` cell with a price and a
reversal cell naming an instrument, no reversal cell naming a park**. **THE AS-FILED CELL THIS REPLACES READ
`30`, `24 + 3 + 2 + 1 = 30`, AND NAMED NO FIFTH ROW** — the as-filed count stands above byte-for-byte and
this clause is the operative statement of the table's size
(`[T: the census' restatement, taken at this contract's fifth bounded amendment | CENSUS]`).

**AND THE NINE `DD` ROWS THE LISTENER AMENDMENT ADDS, EACH CARRYING ONE SILENCE ONE OF THE ARCHITECT'S OWN
RULINGS LEFT NAMELESS — EVERY ONE OF THEM REVERSIBLE, EVERY ONE WITH ITS ALTERNATIVE PRICED, AND NOT ONE OF
THEM A QUESTION PUT TO HIM** (`RCA-8(d)` ANNOTATE-BESIDE: **the two blocks above and the census below stand
byte-for-byte, and this block and the dated census clause beneath it are the operative statement of the
table's size**; the amendment's rulings are `A41`–`A58` at `docs/specs/storeroom-listeners-proposal.md`
`§8`–`§20`, and **each row's `Its alternative, priced` cell names the alternative and its reversal cell
names an instrument, never a park**; `[T: the block's own form, per §0.1 item 3's `DECLARED-DEFAULT` rule and
§0.2's preamble | DECLARED-DEFAULT]`):

| DD | The residual it carries (the ruling whose printed silence it carries) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-32`** | **the MECHANICAL SPELLING of a node's borrow into the home map** — `A45`'s own printed silence (*"it does not say HOW the borrow is spelled in Rust"*; the gate's `§12.1` answer leaves exactly three spellings standing) | **a node's borrow is a SHARED HANDLE to the home map's entry (`Rc<ListenerEntry>`, single-instance, no cross-thread sharing declared) — and NOT a live `&` and NOT a stable index into the home map**; **the home OWNS its entries, the node holds a cheap handle, and no `ListenerEntry` is copied into a node** | `write-and-read.md §6.5` item 8 (the home) and item 9 (the borrows' lifetime) | a live `&'a ListenerEntry` into the home (the store would be self-referential and the home's mutation would be blocked while any borrow lived); a stable id/index into the home (it would need the home's removal path to be the ONLY way an entry dies, so no index could be reused while a node still names it — a rule this contract does not carry); a second copy of the entry on the node | **`P-TP-8`** (the home is the ONE home and a node's set is a reference into it — the drive reads the same listener through the node that the home holds) | **a STABLE ID/INDEX into the home** — priced: it needs the additional rule above, and a missing instance of it would let a recycled index fire a listener the caller never registered; the trade is stated at the proposal's `§12.1`; available with that rule authored | a bounded amendment of this contract (the spelling is this contract's own to state) **⟶ AMENDED 2026-10-11 — THE SPELLING IS CONDITIONAL ON THE PER-NODE INDEX'S MATERIALIZATION, AND WHERE NO INDEX IS MATERIALIZED THERE IS NO BORROW TO SPELL** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte and THIS clause is the operative statement of the spelling's own subject; the gate-4 adversarial pass's `AM-2` found the cell has NO STATE in the built node shape, and this clause answers it**): **where the store MATERIALIZES the per-node listener index, this row's spelling binds whole — `Rc<ListenerEntry>`, the home OWNS its entries, the node holds a cheap handle, no entry is copied into a node, and the alternative (a stable id/index) is priced above; where the store does NOT materialize the index — the spelling `§5.8` (d) licenses by its own words — a node holds NO list and NO borrow, the two returned sets are produced from the ONE home at each trigger, and this cell's refusal list binds the sets instead of a node-side member.** **The optionality's own priced alternative and its reversal point are `DD-41`'s** (`store-model.md §1.1`'s dated clause; `§5.4`'s `(f)` clause below) |
| **`DD-33`** | **what the register's CARRIER NODE carries BESIDE the listener references** — `A41`'s own printed silence (*"it does not name the carrier node's own record shape"*) | **the carrier node carries the listener references AND NOTHING ELSE this contract reads as a graph record**: it is a node at the empty address, it holds **no readable value**, **no container**, **no child anchor of its own key** and **no tier of its own** — the register's tier stands on the **register's parent anchor** (`store-model.md §1.6`, the amendment's clause), and a read at `[]` still answers the whole register (`A43`'s first half, which CONFIRMS the shipped clause) | `store-model.md §1.6` (the carrier-node clause) and `§1.1` (the carrier node's own member table) | a carrier node with a readable value; a carrier node holding a container; a sixth data-structure kind minted for it (*"the store's data structures close at exactly five"*, `§1.7`, `P-IM-3`); a tier read off the carrier node instead of off the register's parent anchor | **`P-IM-3`** (`S-STRUCT`'s CLOSURE pass: **no address answers a sixth structure**, and the empty address's reference asserts the register's own tier and never a fabricated one) | **a carrier node spelled as a `branch` with an empty container** — priced: it would give the outermost boundary a real container, make a container-kind contradiction reachable there, and put a node kind inside a structure `§1.7` closes at five; available with `§1.7` re-read | a bounded amendment of this contract |
| **`DD-34`** | **whether the register's tier can MOVE after creation** — `A50`'s own printed silence (*"it does not say what a LATER disappearance of the file means to an already-`file` register"*) | **the register's tier is FIXATED AT CREATION and NEVER MOVES**: a store created without a path stays `mem` for its whole life, a store created with a reachable path stays `file`, and **no write, delete, rollback, boot, purge or re-creation of the file re-tiers it** — **a `file`-tier write whose commit fails is `FileCommitFailed` and the tier stands** | `seams-and-lifecycle.md §7.1` (the construction sequence) and `store-model.md §1.6` | a re-tiering when the configured file appears or disappears; a `mem` register that becomes `file` after its first commit (which would re-tier the whole tree's upper bound at run time); a `file` register that falls back to `mem` when its file is removed | **`P-TP-6`** (the row's register half: the register's tier is one value for the instance's life) **+ `P-TP-7`**'s construction half | **a RE-TIERING rule at the first `file` commit** — priced: the shipped monotonic clause is stated **per write** and not per lifetime, so a moving upper bound would make a write that succeeded under a `mem` register fail later under a `file` one with no caller-visible cause; available with `A27`/`A42` re-read | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment (the fixity is `A50`'s own words and only he may revisit when they take effect) |
| **`DD-35`** | **THE `watched` MEMBER'S FATE on the superseded surface** — `A58`'s own printed silence (*"nor does it say what becomes of the shipped `WriteResult.watched` member's NAME"*) | **`watched` KEEPS CARRYING THE WATCHED ADDRESSES, and a SECOND member `triggered` carries the TRIGGERED LISTENERS' HANDLES** — so `WriteResult` carries **three** members (`op` · `watched` · `triggered`) and `DeleteReceipt` gains **one** (`triggered`), and **no shipped member is silently re-meaned** | `write-and-read.md §3.6` (the amended member set) and `§4.4` (the delete's amended receipt) | **re-meaning `watched` in place** so it carries handles under its shipped name (a silent meaning change, refused as a filing practice); deleting the member; a second member named by a token the shipped surface does not already carry | **`P-TP-8`** (both halves: the address set and the handle set are observed on the same write) | **the handle set carried UNDER the shipped name `watched`** — priced: every shipped drive that reads `watched` as `Vec<Vec<Segment>>` (`tests/watched_addresses.rs`) would change meaning with no edit to its own bytes, and the red set's `same_address_set` predicate would compare segment lists to handles; available with the shipped member annotated as SUPERSEDED and every drive re-derived | a bounded amendment of this contract |
| **`DD-36`** | **whether a listener carries a TIER QUALIFIER** — `A57`'s own printed silence (*"nor whether the ADDRESS carries a TIER"*), and the shipped stopgap's tier column (`§3.1.1`'s `watch` row, `DD-26`) | **a listener's `address` is the WHOLE of its key: NOTHING carries over from the superseded registration's tier qualifier** — a triggered listener is selected by the PREFIX test alone (`A33`/`A37`, descendant-inclusive, `DD-18`), and **`§3.1.1`'s `tier` column is struck for the superseded `watch` row and authored for `listeners[]` as a SHAPE check only** (a tier-shaped value outside `{file, mem, temp}` remains `OutOfDomainTier`, and `null`/`undefined` remain `AddressMalformed`) | `write-and-read.md §3.1.1` (the amended column) and `§6.5` (the listener record) | a tier-qualified listener whose firing is suppressed by the write's tier; an unqualified listener whose selection runs a tier test; a registration's tier changing the prefix test | **`P-TP-8`** (the handle set is exactly the prefix set, with no tier test at any of its members) | **KEEPING THE TIER QUALIFIER on the listener record** — priced: it is the stopgap's own column (`DD-26`), it adds a state the listener's own ruling never names, and the construction array's element shape would grow a third member `A57` does not print; available with `A57` re-read and a third member authored | a bounded amendment of this contract |
| **`DD-37`** | **the ORDER of the handles a trigger returns** — `A57`'s own printed silence, and `§18`'s `(4)` (*"ORDER REMAINS, AND IT IS NOW ASKABLE IN ONE LINE"*): the last of `P-3`'s four subjects **⟶ TAGGED 2026-10-11: THIS CELL'S *"`§18`'s `(4)`"* RESOLVES TO `docs/specs/storeroom-listeners-proposal.md §18 · A57`, its `(4)`** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell stands byte-for-byte and the tag is added beside it**; the gate-4 adversarial pass's `AM-22`; `§0.1` item 2's `P:` tag and item 10 (a)'s citation form): **the ruling's own words *"ORDER REMAINS, AND IT IS NOW ASKABLE IN ONE LINE"* stand at `P: §18`'s consequence (4) under the ruling `A57`, so the bare `§18` is now printed with its path and its `P` tag and resolves mechanically** (`write-and-read.md §6.5` item 10 (e); `parameter-semantics.md §2.13`) | **THE ORDER IS UNSPECIFIED AND THE CONTRACT DECLARES ORDER-INSIGNIFICANCE: the returned handle set is a SET, and a caller may rely on its MEMBERSHIP only** — the drive asserts set equality and never a sequence (`P-TP-8`) | `write-and-read.md §6.5` (the returned-handle clause) | a declared registration order; a declared address order; a declared tier order; any drive that asserts a sequence | **`P-TP-8`** (its drive compares SETS — the same predicate the shipped `S-WATCH` uses for the address list) | **a DECLARED ORDER (registration order first, address order as the runner-up)** — priced: either spelling would need `ListenerEntry` to carry a monotonic ordinal the home does not otherwise need, and it would make a re-registration's position observable, which no ruling names; available with a fresh ruling | a bounded amendment of this contract |
| **`DD-38`** | **whether the HOME MAP is journaled, tier-bound, or persisted** — `A48`'s own printed silence (*"nor whether it participates in PERSISTENCE … nor whether a `watch`/`unwatch` mutation of it is journaled"*), read with `AR-13`'s obligation | **THE HOME IS INSTANCE-SCOPED AND SESSION-SCOPED AND IS OUT OF THE `file` BYTES AND OUT OF THE JOURNAL**: a registration is **not** a `write` and **is not** a `delete`, so it appends no entry (`§6.1`'s two tracked verbs stand); **the home is not serialized into `cfg.filePath`**, so a fresh `storeCreate` over an equal path **loads no registration** and the boot's shipped answer — *"nothing is watched"* — **stands for the listener surface too**; **a registration is dropped at PROCESS EXIT with `mem`** | `write-and-read.md §6.5` item 8 and **`§6.1`** (the two tracked verbs, unchanged); `seams-and-lifecycle.md §7.2` item 6 | a registration surviving a boot; a registration journaled; a registration rolled back; a `file`-tier write committing listener state; a `rollback` restoring a registration | **`P-TP-7`** (a fresh instance over an equal `filePath` begins with the register's admitted keys and **no registration**) **+ `P-TP-8`** (the returned handle set is a function of THIS instance's home) | **PERSISTING the home in the `file` tier's bytes** — priced: it would make a registration durable across process exit while `mem` is not, it would give the `file` commit a second payload whose failure has no code of its own (`§8.1` #15's trigger is a WRITE's commit path), and it would break the shipped boot's declared answer; available with `§7.2` item 6 and `§8.1` re-read | **the preamble's own instrument: a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract** (`A: docs/decisions.md · A48`; `P: §13 · A48`) **⟶ REPOINTED 2026-10-11 — THE `A:` TAG OF THIS CELL DOES NOT RESOLVE AND IS RE-POINTED TO THE `P:` TAG THE RULING ACTUALLY CARRIES** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell stands byte-for-byte and THIS clause is the operative citation**; the gate-4 adversarial pass's `AM-14`; `§0.1` item 2 — *"`A` — an ACTIVE `docs/decisions.md` row, cited by its ROW NAME"*): **`docs/decisions.md` carries rows for `A9`, `A17`–`A45` and NO `A46`–`A58` ROW, so the `A:`-tagged half of this cell pointed at a row this repository does not carry**; **the `A48` ruling is FILED at `docs/specs/storeroom-listeners-proposal.md §13`, which is what the `P:` tag beside it already names, and the cell is therefore read as `P: docs/specs/storeroom-listeners-proposal.md §13 · A48` — ONE resolving citation and no second, unresolvable one.** **AND THE ROW THAT `A:` WOULD NEED, IF THIS CONTRACT WANTED IT, IS NAMED SO THE ALTERNATIVE IS NOT LEFT SILENT:** **landing an ACTIVE `docs/decisions.md` row for `A48` would make the `A:` form resolve — and that is the SUPERVISOR'S act and never this contract's** (the architect admits rows: `§0.1` item 2's own boundary; `P: §3` item 2) — **so no row is invented here and no citation depends on one** |
| **`DD-39`** | **the duplicate and empty cases of the construction's `listeners[]` array** — `A56`'s own printed silence (*"nor whether the array may be EMPTY, nor what the store does with a DUPLICATE address in it"*) | **`listeners[]` may be EMPTY (an empty array is the ordinary no-listener store), and a DUPLICATE is ADMITTED AND BOTH ENTRIES ARE KEPT** — the construction is a POPULATION step and not a registration verb, so the shipped address-level idempotence (`§6.5` item 2, which belonged to the superseded `watch`) is **not** carried into it; the home then holds **two entries at one address with two DIFFERENT handles**, and a trigger returns **both** | `seams-and-lifecycle.md §7.1` (the construction sequence, step (iv)) | an empty array failing construction; a duplicate silently collapsed to one entry; a duplicate rejected with a code; a duplicate sharing one handle | **`P-TP-7`** (the construction is a function of its arguments: `2` entries in ⇒ `2` entries in the home) **+ `P-TP-8`** (both handles returned where both addresses are prefixes) | **COLLAPSING a duplicate at the address level, as the superseded `watch` did** — priced: it would silently discard a handle the caller supplied and can never get back (no verb returns it), and the shipped idempotence rule belonged to a surface `A58` supersedes; available with `A58` re-read | a bounded amendment of this contract **⟶ REPOINTED 2026-10-11 — THE `clause it cites` CELL'S *"step (iv)"* RESOLVES TO `seams-and-lifecycle.md §7.1` STEP `5`** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell of this row stands byte-for-byte, the `(iv)` spelling included, and THIS clause is the operative statement of the step it names**; the gate-4 adversarial pass's `AM-15`; `A56`; `seams-and-lifecycle.md §7.1` steps 1–7): **the amended ordered sequence numbers the HOME'S POPULATION `5`** — *"POPULATE THE HOME MAP FROM `listeners[]` — BEFORE THE REGISTRY IS GENERATED"* — **the `(i)`–`(v)` spelling being `A56`'s own transcription of the construction and not the clause's numbering, so `DD-39`'s citation names step `5` and never step `4`** (`parameter-semantics.md §2.12`, whose two cells carry the same repointing; `§5.7`'s re-derived property, which prints *"`§7.1` step 5"*) |
| **`DD-40`** | **the two states `A55`'s dry run and `A52`'s disjunction leave unnamed** — `A52`/`A55`'s own printed silences (the absent parent directory; the path that is a directory) | **(a)** a provided path whose **PARENT DIRECTORY does not exist** is **UNREACHABLE** — the probe is a DRY RUN and does not create a directory, so the store fails `FilePathUnreachable`; **(b)** a provided path that **IS a directory** is **UNREACHABLE at construction** — it fails the same member, because *"the application can write it successfully"* cannot hold of a directory, and **the same state reached later by a `file`-tier write on an already-constructed store remains `FileCommitFailed`** (the shipped red set's own drive, which does NOT move) | `seams-and-lifecycle.md §7.1` (the reachability clause) and `§8.1` #13 | creating a directory during the probe; creating the file during the probe; a directory path returning an instance; a directory path answering a second, distinct member | **`P-TP-7`** (`S-CONSTRUCT`'s amended cell list: the outside-value states and the two reachability states, each with its declared answer) | **(a)** a CREATABLE path being reachable — priced: it makes the probe a partial `mkdir`, which `A55`'s *"Dry run"* forbids by its own word; **(b)** a distinct member for the directory state — priced: it adds a sixteenth member whose trigger is a construction state the reachability member already covers, and `§8.1`'s closure prefers one member per trigger-class (`DD-19`'s own precedent) | a bounded amendment of this contract |

**AND FIVE `DD` ROWS MORE, ADDED AT THIS CONTRACT'S SEVENTH BOUNDED AMENDMENT — THE CORRECTION PASS'
OWN RESIDUALS, EACH STATING ONE RULE AT ITS OWN `§`, EACH REVERSIBLE, EACH WITH ITS ALTERNATIVE PRICED AND
NOT ONE OF THEM A QUESTION PUT TO THE ARCHITECT** (`RCA-8(d)` ANNOTATE-BESIDE: **the two blocks above, the
`DD-30`/`DD-31` blocks, the nine listener rows and the census clause beneath this block all stand
byte-for-byte, and this block and the dated census clause under it are the operative statement of the
table's size**; the gate-4 adversarial pass's `AM-2`, `AM-4`, `AM-5`, `AM-10` and `AM-11`;
`[T: the block's own form, per §0.1 item 3's `DECLARED-DEFAULT` rule and §0.2's preamble |
DECLARED-DEFAULT]`):

| DD | The residual it carries (the silence or the undeclared state it carries) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-41`** | **whether the PER-NODE LISTENER INDEX is MATERIALIZED** — `A45`'s own printed silence (*"it does not say HOW the borrow is spelled in Rust"*) read with `§5.8` (d)'s licence (*"an INDEX FOR LOOKUP COST only"*), and the state the gate-4 adversarial pass's `AM-2` filed | **THE PER-NODE INDEX (the `active`/`carried` pair) IS OPTIONAL: a store MAY MATERIALIZE it on its nodes, and a store MAY INSTEAD produce the SAME two returned sets by scanning the ONE home at each trigger.** **Where it is NOT materialized a node carries NEITHER list, `DD-32`'s borrow spelling has no subject, and the register's carrier node carries no list — the sets being produced from the home `§7.1` step 5 populated BEFORE the registry was generated, so `A56`'s order stays observable through the sets.** **Where it IS materialized, `§1.1`'s member tables, `A47`'s partition, `A46`'s lifetime and `P-SM-4`'s `(f)` bind it WHOLE** | `store-model.md §1.1` (the member tables and their dated clause); `§5.4`'s `(f)` clause; `§5.8` (d); `write-and-read.md §6.5` item 9's clause (a-bis) and item 13; `parameter-semantics.md §2.14`; `§7.1` step 5 | **a node-side list that DISAGREES with the home** (a stale reference, a reference whose listener is bound at another address, a duplicated handle, a reference outliving its node — each FAILS `(f)` where the index exists); **a third home for the registration state**; **a claim that reads a node-side member a node shape does not carry**; **a read, a `findAddress` or a fresh instance over an equal `cfg.filePath` surfacing either list** | **`P-SM-4`** (`(f)` in both spellings: the index's own consistency where it exists, and the sets' consistency with the home where it does not) **+ `P-TP-8`** (`(d)`: the same two sets either way) **+ `P-IM-3`** (no sixth structure in either state) | **a MANDATORY index — every node of every store carrying `active` and `carried`, with no scan path** — priced: under the built record shape it makes `(f)`'s premise FALSE-BY-ABSENCE, so the row's `HELD` would be a verdict over a state nothing can exhibit, and it makes the node shape owe two members whose only declared purpose is the lookup count `A45` names; **available only with `A45` re-read and a host pass that materializes the index** | a bounded amendment of this contract (the optionality is this contract's own to state: `A45` names the PURPOSE and not the obligation) |
| **`DD-42`** | **the HANDLE-TOKEN COLLISION** — the state no clause declared: a construction-supplied token equal to one the store would MINT (e.g. `listener-1`), read with `§0.4` clause 2 (*"the store does not police their distinctness against its own minted set"*) | **THE TWO WAYS INTO THE DOMAIN ARE MADE MUTUALLY EXCLUSIVE AT MINT TIME: `listen` MUST NOT MINT A TOKEN EQUAL TO ANY TOKEN THE HOME ALREADY HOLDS.** **A mint that would collide SKIPS the colliding token and mints the next one, so the home never holds two entries with ONE token, `unlisten` removes exactly the entry it names, and `triggered` carries NO DUPLICATED MEMBER** — **and the construction's adopted tokens are untouched by the mint's own rule** (`DD-39`'s *"each with its OWN handle"* means two entries at ONE address MAY still carry the SAME caller-spelled token, and in THAT case — and only that case — `triggered` carries the token twice and `unlisten` over it removes the FIRST match, the mis-targeting being the caller's own construction choice and stated here rather than discovered) | `§0.4`'s `ListenerHandle` construction rule (clauses 2, 4 and 5); `write-and-read.md §6.5` item 12 and item 11; `parameter-semantics.md §2.13` (the uniqueness domain) | **a `listen`-minted token equal to a token the home already holds**; **two home entries with one token where only ONE of them was caller-spelled**; **an `unlisten` that removes an entry the caller did not name**; **a `triggered` list carrying a duplicated member**; **a `TierNotFound`-style refusal invented for the collision** (no code exists for it and none is minted) | **`P-TP-8`** (`(a)`/`(b)`: the handle set is exactly the triggered set, with no duplicated member where the store minted the token) **+ `P-SM-4`'s `(f)`** (*"no change action LOSES or DUPLICATES a listener's handle"*) **+ `P-TP-7`** (the construction's own `2`-entries-in/`2`-entries-in-the-home cell) | **(a) REFUSING the colliding token at `listen`** — priced: a refusal needs a code the closed `15`-member set does not carry, and `PAR-13`'s *"a value the store never minted at all (fabricated)"* is declared a NO-OP SUCCESS at `unlisten` and never an error; **(b) POLICING DISTINCTNESS AT ADOPTION (rejecting a construction entry whose token the store would mint, or re-minting it)** — priced: it would contradict `DD-39`'s *"each with its OWN handle"* and `§0.4` clause 2's *"not police their distinctness"*, and it would break `write-and-read.md §6.5` item 12 (b)'s *"ADOPTED VERBATIM"*; **(c) DOCUMENTING THE MIS-TARGETING AND NOTHING MORE** — priced: it leaves a minted token's withdrawal able to remove a construction's entry, which is the defect this row exists to prevent; **available only with `A45`/`A57` re-read** | a bounded amendment of this contract (the mint's own rule is this contract's to state: `A57` names *"a handle that it returns"* and does not say who mints it) |
| **`DD-43`** | **the INDEX-RANGE RULE on a WRITE and the READ'S ANSWER for a hole** — the state `§3.4`'s totality clause, `store-model.md §1.3`'s `VEC` key domain (*"non-negative integers, CONTIGUOUS FROM `0`"*) and `§4.2` `R-3` left undecided (the gate-4 adversarial pass's `AM-5`, whose trace mints a node the parent's own read does not contain) | **A WRITE AT A `VEC` INDEX OUTSIDE THE CONTAINER'S CONTIGUOUS RANGE IS REFUSED BY THE EXISTING MEMBER, AND THE READ'S HOLES HAS NO INSTANCE:** **a write whose LAST segment is an INDEX and whose resolved parent container is a `VEC` holding `n` anchors (`n ≥ 0`) is IN DOMAIN iff the index is `0 ≤ i ≤ n` — `i = n` APPENDS (`W-3`/`W-4`), `i < n` is the pair's own arm — and is OUT OF DOMAIN iff `i > n`, which fails `ContainerKindConflict` and INSTALLS NOTHING** (no anchor, no coercion, no container-kind change, no journal entry) — **the integer segment being an INDEX that contradicts the container's own key domain by falling outside the domain it declares** (`store-model.md §1.3`'s key-domain arm; `F-4`) — **so `read(['v'])` at a `VEC` is DENSE from `0` with its length the container's contiguous index count (`R-3`) while `read(['v', idx(5)])` over a `2`-element `VEC` fails `AddressNotFound` (`L-3`), because no gap can be minted** | `write-and-read.md §3.4` arms `W-3`/`W-4`/`F-4` and that section's totality clause; `store-model.md §1.3` (the `VEC` key domain and the key-domain arm) and `§1.5` items 2–3 (NO COERCION); `write-and-read.md §4.2` `R-3` (density) and `store-model.md §2.2` `L-3`; `§8.1` #7 (the member, UNCHANGED and no new member minted) | **a minted anchor at an index `> n`** (the state `AM-5` traced: `idx 5` minted over a two-element `VEC`); **a parent whose own read does not contain a node it holds**; **a read that answers a hole** (a `null` or an omitted element); **a new range-specific fail-code**; **a silent coercion of an index into a key or of a string into an index** | **`P-IM-3`** (`S-STRUCT`'s ADDRESS and CLOSURE passes: every minted node is reachable by exactly one address path, and no read answers a structure outside `R-1`/`R-2`/`R-3`/`R-5`) **+ `P-IM-1`** (the round trip over a `VEC`) **+ `P-SM-4`'s `(b)`** (the pair count the arm states) **+ `P-TP-9`** (the refusal's code is the SET's own member) | **a DISTINCT range arm — a `VEC`-index range violation answered by a new code** — priced: it would grow the closed `15`-member set by one whose trigger is a state the key-domain arm of `ContainerKindConflict` already covers (`DD-19`'s own one-member-per-trigger-class precedent), and `§8.1`'s closure would need its algebra re-derived; **the alternative is available only with `§8.1` re-read and its arithmetic re-printed** | a bounded amendment of this contract (the range rule is this contract's own to state: `A22` names the kind contradiction and not the index's range) |
| **`DD-44`** | **the EMPTY-ADDRESS REFERENCE'S MARKER, and its COLLISION with the legal `""` REGISTER KEY** — `A41`'s own printed silence (*"nor what a walk at `[]` resolves to … given `A43`'s read answer"*), the gate-4 adversarial pass's `AM-11` | **THE EMPTY-ADDRESS REFERENCE CARRIES A NON-COLLIDING MARKER: its `ChildAnchor` carries `register_marker: true` and a `key` the register can NEVER hold (the declared spelling is `Segment::Key(String::new())` carried BESIDE the marker), so `findAddress([], t)` and `findAddress([""], t)` are DISTINGUISHED by a DECLARED OBSERVABLE.** **`register_marker` is TRUE on exactly ONE reference in a store — the register's — and FALSE on every reference a segment reaches; `findAddress([], t).register_marker == true` and `findAddress([""], t).register_marker == false` in a store where a `""` register key stands** — **so the two references are never confusable and the *"EMPTY segment marker"* is a marker and not a key** | `store-model.md §1.6` item 4 (a)/(b) and `§2.1`'s amended empty-address clause; `§0.4`'s `NodeRef`/`ChildAnchor` spelling row; `§5.7`'s register-reference cell | **a `""` register key whose reference is indistinguishable from the register's own**; **a sixth segment class or a widened `§1.5` segment domain** (the marker is a `ChildAnchor` property and NOT a new `Segment` variant); **a marker TRUE on any reference a segment reaches**; **a marker that moves with a tier or with a caller's `t`** | **`P-TP-7`** (the register-reference cell: `findAddress([], t)` answers the register's own reference and tier, and the marker is the second member of that answer) **+ `P-IM-3`** (`S-STRUCT`'s CLOSURE pass: the register is reached by no segment) | **KEEPING the bare `Segment::Key(String::new())` spelling with NO marker, and declaring the two references OBSERVABLY IDENTICAL** — priced: the declared observable (`anchor.key`) then cannot distinguish `findAddress([])` from `findAddress([""])`, so a drive over a `""` register key could not assert which reference it holds and `P-TP-7`'s register-reference cell would be unfailable for that state; **available only with `A41` re-read and that cell re-derived** | a bounded amendment of this contract (the marker's form is this contract's own to state) |
| **`DD-45`** | **the REACHABILITY PROBE'S DECIDABLE FORM** — `A52`'s *"Reachable means the file exists or that the application can write it successfully"* read with `A55`'s *"Dry run. File must have write access."* (the gate-4 adversarial pass's `AM-10`, whose trace found mode bits approximating the second arm) | **THE PROBE IS A DRY RUN, AND ITS SECOND ARM IS DECIDED BY MODE BITS ON THE PATH'S PARENT DIRECTORY — A DECLARED, DECIDABLE FORM:** **a PROVIDED path is REACHABLE iff (a) the path exists and opening it for writing succeeds without creating, truncating or writing a byte, OR (b) the path does not exist and its PARENT DIRECTORY exists, is a directory, and its write bits permit the process to create an entry in it.** **NO FILE, NO DIRECTORY AND NO BYTE IS CREATED, NO SYSCALL SEAM IS ADMITTED, AND NO DEPENDENCY IS ADDED.** **CONSEQUENCE, DECLARED RATHER THAN LEFT TO DISCOVERY: where the mode bits and the filesystem disagree — a read-only mount, an ACL deny, an ownership mismatch between the bits and the process — the probe answers REACHABLE at construction and the path's failure surfaces LATER as `FileCommitFailed` on the first `file`-tier write (`§8.1` #15), and that later answer is THIS ROW'S DECLARED CONSEQUENCE and not a defect** | `seams-and-lifecycle.md §7.1` step 3 and the amended reachability clause; `§8.1` #13 and #15; `seams-and-lifecycle.md §7.2` items 3–4; `DD-40`; `DD-25` | **a probe that creates a file, a directory or a byte**; **a probe that truncates or reads out the file's content**; **a probe that treats an EXISTING BUT READ-ONLY file as reachable**; **a syscall seam, a new dependency or a second reachability predicate**; **a construction-time `FileCommitFailed`** (the directory-valued path answers `FilePathUnreachable` at construction: `DD-40` (b)); **a probe whose answer differs between two runs on an unchanged filesystem** | **`P-TP-7`** (`S-CONSTRUCT`'s `3` reachability drives and its `27`-cell census: the absent-parent-directory state, the directory state, and an unreachable path each with their declared answers) **+ `P-TP-9`** (`FilePathUnreachable`'s drive, and `FileCommitFailed`'s on the later write) | **a SYSCALL SEAM — an `access(2)`/`faccessat`-shaped check, or a `create`+`remove` dry run with its own cleanup duty** — priced: it moves the answer from a decided predicate to the platform's, it needs a dependency or an `unsafe` binding the crate refuses, and `A55`'s *"Dry run"* word forbids the create-and-remove form outright; **the mode-bit form is therefore taken, with its mismatch case DECLARED and answered by the later `FileCommitFailed`; the alternative is available only with `A52`/`A55` re-read and a dependency admitted** | a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract (the probe's form reads `A52`'s own words and moves only against a fresh ruling) |

**⟶ AMENDED 2026-10-11 — `DD-45`'s OWN PIN CELL'S HEADING IS NARROWED SO THAT IT IS TRUE OF THE CLAUSE IT CITES, AND THE PROBE'S TWO ARMS' DECISIONS ARE NAMED ONE BY ONE** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell of the `DD-45` row above stands byte-for-byte — its heading's *"ITS SECOND ARM IS DECIDED BY MODE BITS ON THE PATH'S PARENT DIRECTORY"* and its `what it pins` cell's disjunction (a)/(b) included — and THIS block is the operative statement of HOW EACH OF THE TWO ARMS IS DECIDED, so the row's heading and the clause it cites agree**; the proofreading gate; the gate-4 adversarial pass's `AM-10`; `A52`; `A55`; `seams-and-lifecycle.md §7.1` step 3 and its dated reachability clause; `[T: the two arms' deciding instruments, stated where the row's own heading left one of them over-broad | CONTRACT]`). **THE STATE THIS DECIDES:** **the as-filed heading reads *"ITS SECOND ARM IS DECIDED BY MODE BITS ON THE PATH'S PARENT DIRECTORY"*, while the clause the row cites — `seams-and-lifecycle.md §7.1`'s dated reachability clause, whose parts (1)–(3) are the operative statement — decides the EXISTING-PATH arm by the OPERATING SYSTEM'S OWN ANSWER to a write-mode open and reserves the MODE-BIT approximation to the ABSENT-PATH arm alone; so the heading's *"the second arm"*, read as *"arm (b) of the same cell's `what it pins` disjunction"*, is exact, and read as *"the second of the probe's two decisions"* it is over-broad.** **THE TWO ARMS, EACH WITH ITS OWN DECIDING INSTRUMENT, AND NOTHING ELSE MOVES: (a) THE PATH EXISTS — REACHABLE iff a write-mode open of it succeeds without creating, truncating or writing a byte (the OS's own answer, and the reason an EXISTING BUT READ-ONLY file FAILS); (b) THE PATH IS ABSENT — REACHABLE iff its parent directory exists, IS a directory, and its write bits permit the process to create an entry in it (the mode-bit approximation, whose mismatch case the row's own consequence sentence declares).** **`DD-40`'s two states, the `what it REFUSES` cell's six items, the consequence sentence, the `alt` cell and the reversal cell are UNCHANGED, and the `P-TP-7` cell it names is untouched** (`seams-and-lifecycle.md §7.1`'s parts (1)–(3)). THE MARKER'S KEY SPELLING IS
**⟶ AMENDED 2026-10-11 — `DD-44`'s OWN PIN IS NARROWED SO THAT IT IS TRUE: THE MARKER'S KEY SPELLING IS
`Segment::Key(String::new())`, WHICH IS **NOT** A KEY THE REGISTER CAN NEVER HOLD, AND THE MARKER'S
NON-COLLISION IS CARRIED BY `register_marker` ALONE** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell of the
`DD-44` row above stands byte-for-byte — its `what it pins` cell's sentence *"its `ChildAnchor` carries
`register_marker: true` and a `key` the register can NEVER hold (the declared spelling is
`Segment::Key(String::new())` carried BESIDE the marker)"* included — and THIS block is the operative
statement of that sentence and of what carries the marker's non-collision**; the gate-4 adversarial pass's
`AM-11`; **the one-contradiction pass on the listener amendment's contract**; `A41`; `A42`; `§1.5` item 1;
`[T: the marker's spelling and its non-collision carrier, stated where the row's own pin cell left them false
of one another | CONTRACT]`).
**THE CONTRADICTION, IN THE CELL'S OWN TERMS, NAMED BEFORE IT IS DISPOSED OF:** **the as-filed pin cell
demands a `key` the register can NEVER hold AND names the spelling `Segment::Key(String::new())` in the same
sentence — while `§1.5` item 1 makes the empty string `""` a LEGAL `string` segment and a legal, WRITABLE
register key** — **so the register's own reference and a reference reached by the legal key `""` spell the SAME
`anchor.key` in a store where a `""` register key stands, and that demand was FALSE of the spelling the same
sentence declared.**
**THE SENTENCE'S RE-STATEMENT — WHAT IT ACTUALLY NEEDS TO SAY, AND NOTHING MORE:** **the register's
reference's `key` is `Segment::Key(String::new())`, the EMPTY segment marker, and the TRUE statement about it
is that it is *"a key NO SEGMENT WALK CARRIES INTO THAT REFERENCE"* — the register is the walk's start and is
reached by NO segment (`§1.5` item 4; `P-IM-3`'s `S-STRUCT` CLOSURE pass) — while the SAME VALUE is a LEGAL
register key that a walk at `[""]` reaches and resolves to a DIFFERENT node.** **The marker's non-collision is
therefore NOT carried by the key value at all, and *"the EMPTY segment marker"* is the marker's own NAME and
not a claim that the register's key domain excludes it.**
**AND ONE SPELLING OF THE AS-FILED CELL IS READ THROUGH `§0.4`'s ROW, SO THE MARKER HAS ONE SPELLING
EVERYWHERE IT IS READ:** **the cell's *"`findAddress([], t).register_marker == true` and
`findAddress([""], t).register_marker == false`"* reads as `NodeRef.anchor.register_marker` — the member is a
`ChildAnchor` property and the reference's own member is its `anchor` (`§0.4`'s `NodeRef`/`ChildAnchor` row;
`§1.2`'s `ChildAnchor` row, as amended) — and the same spelling is the one `§0.4`'s marker clause, §5.7's
register-reference cell, `store-model.md §1.6` item 4 (c), `store-model.md §1.5` item 1 and `store-model.md
§2.1`'s fifth correction print.**
**THE DECLARED CARRIER, SINGLE-VALUED AND FAILABLE:** **`ChildAnchor::register_marker: bool` — a property of
the ANCHOR and NOT a `Segment` variant, so `§1.5` item 1's closed two-class segment domain and `§1.7`'s
five-component closure are UNMOVED — is TRUE on exactly ONE reference in a store, the register's, and FALSE on
every reference a segment reaches**; **the declared observable is the marker alone, or the pair
`(register_marker, tier)` with it:** **`findAddress([], t).anchor.register_marker == true` and
`findAddress([""], t).anchor.register_marker == false` in a store whose register holds a `""` key** — **and
the two `key` values COINCIDE by this block's own declaration: `findAddress([], t).anchor.key ==
findAddress([""], t).anchor.key == Segment::Key(String::new())`.**
**THE CELL THAT MUST MOVE IS THE TEST'S, AND `src/**` IS UNTOUCHED BY THIS BLOCK:**
**`tests/gate4_red_set_fix.rs`'s `ng_l_the_register_marker_against_the_legal_empty_key` must assert the
DECLARED OBSERVABLE — `register.anchor.register_marker == true` against
`at_the_empty_key.anchor.register_marker == false` — and the DECLARED COLLISION of the two `key` values, and
must NOT assert the anchor-key INEQUALITY its as-filed body asserts (`let distinguishable = register.anchor.key
!= at_the_empty_key.anchor.key;` is REFUTED by the pin above, so that cell's `assert!(distinguishable, …)`
can only fail by design).** **Its remaining assertions stand and are this block's own evidence: `""` is a legal
writable key at the register's own tier (`§1.5` item 1), the register's and the `""`-key reference's
`anchor.tier` are equal in a `file`-register store (`store-model.md §1.6` item 4 (d); `DD-34`), and the
register's own READ separates the two states at `§4.2`'s `R-5`.**
**WHY THE RE-SPELLING ROUTE IS REFUSED, WITH ITS PRICE, SO THE NARROWING IS NOT READ AS A LICENCE TO MOVE THE
SPELLING:** **a `key` genuinely outside the register's key domain is reachable only by (i) a `Segment` variant
no write may mint — REFUSED by this row's own `what it REFUSES` cell (*"a sixth segment class or a widened
`§1.5` segment domain"*) — or (ii) a re-typed `ChildAnchor.key` (an absent-key spelling, or a sentinel inside
the existing two-class domain), which MOVES the collision instead of removing it: `Segment::Index` is a
spelling a `VEC` element's child anchor LEGITIMATELY carries, so the register's marker key would then coincide
with a legal `VEC` element's `key` and the two references would be no more separable than they are now — and
`§2.1`'s *"the segment it is held at"* would read false of the register's reference besides, which needs
`§1.2`'s `ChildAnchor` row and `§1.5` re-read.** **Available only with that re-read, and DECLINED here.**
**NO NEW `DD` ROW IS AUTHORED BY THIS BLOCK: the refused species is carried by the row's existing
`what it REFUSES` cell, the row's `alt` cell already prices the alternative it priced (*"KEEPING the bare
`Segment::Key(String::new())` spelling with NO marker"*, whose price *"the declared observable (`anchor.key`)
then cannot distinguish `findAddress([])` from `findAddress([""])`"* is now EXACT), the table's census stands
at `45` (`24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` ✓), the typed register at `8` (`8 ≤ 8` ✓) and the fail set at `15`
(`11 + 2 + 1 + 1 = 15` ✓).**

**AND ONE `DD` ROW MORE, ADDED AT THIS CONTRACT'S EIGHTH BOUNDED AMENDMENT — THE TWO NUMERIC RULINGS THE
ARCHITECT'S OWN ANSWERS TO THE E2E BATTERY'S FINDINGS LEAVE RULELESS (`A59`'s canonical spelling's OWN RULE,
and the reach of the refusal `A60` declares), CARRIED REVERSIBLE AND WITH THEIR ALTERNATIVES PRICED, IN THE
SAME CELL FORM AS THE BLOCKS ABOVE** (`RCA-8(d)` ANNOTATE-BESIDE: **every block above and every census
clause beneath them stand byte-for-byte, and this block and the dated census clause under it are the
operative statement of the table's size**; `P: §21 · A59`; `P: §21 · A60`;
`[T: the block's own form, per §0.1 item 3's `DECLARED-DEFAULT` rule and §0.2's preamble |
DECLARED-DEFAULT]`):

| DD | The residual it carries (the ruling whose printed silence it carries) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-46`** | **the `file` tier's CANONICAL NUMBER SPELLING — its own RULE — and the REACH of the out-of-bounds refusal and the BOOT's answer for an out-of-range literal** — `A59`'s own printed silence (*"it does not name the canonical spelling's RULE … nor whether a canonical spelling is REQUIRED on the read side … or only on the write-to-file side"*) read with `A60`'s (*"nor whether a caller can observe the refusal's TRIGGER (the value) as against its code"*) | **IN FOUR CLAUSES, EACH DRIVABLE.** **(a) THE RULE: THE CANONICAL SPELLING IS THE SHORTEST DECIMAL SPELLING THAT PARSES BACK TO THE SAME `f64` — Rust's `f64` `Display` form, and nothing else** (an integral carrier value takes no fractional part — `100`, never `1e2`, never `100.0`; a signed zero is written `0`; a value that needs an exponent to be shortest takes the exponent form, `1e300` / `5e-324`). **(b) THE SIDE: the rule binds the WRITE-TO-FILE side ONLY** — the normalization is applied on the way INTO the file, so it is *"a property of the FILE's IMAGE and not of the value the store holds"* — **and it is NOT required on the read side: any finite decimal spelling a JSON parser admits is ACCEPTED at the boot and converted to the carrier it denotes.** **(c) THE OBSERVABLE: the canonical form is observable ONLY through the `file` bytes and through what those bytes carry after a boot** — no verb returns JSON text (`§0.4` closes the surface), so no caller reads the spelling back as a value. **(d) THE REFUSAL'S REACH, AND WHAT THE BOOT DOES WITH AN OUT-OF-RANGE SPELLING:** **the narrowed numeric domain is decided over the value a JSON TEXT denotes at the moment of CONVERSION, so the member `ValueNotAdmitted` (`§8.1` #14) is the declared answer for an out-of-domain number exactly where this directory performs that conversion — and THERE IS NO OUT-OF-RANGE `Num(f64)` ON THE DECLARED SURFACE: every numeric value `StoreValue::Num(f64)` can carry is already a carrier value and is IN the `f64`-exact range (`store-model.md §1.4`, whose predicate refuses the shape whose literal has no exact `f64`).** **Where the `file` tier's own TEXT carries an integral literal whose magnitude exceeds `2^53`, the boot applies `DD-29`: that register key's value lies outside the ADMITTED set as `§1.4` now narrows it, so the key is DROPPED, the rest of the content loads, the instance IS returned, and NO code is produced for the dropped key — and the write arm's `ValueNotAdmitted` is NOT borrowed for a boot-time answer, because `§8.1` #14's trigger is a WRITE's value** | `seams-and-lifecycle.md §7.2` (**its own dated clause, item 7 below**), `§7.2` item 6; `store-model.md §1.4` (the narrowed range and the predicate); `§1.4` (the taxonomy's own home); **`§5.2`'s `P-IM-1` row — the ROW, its scope clause included**; `§8.2`'s `ValueNotAdmitted` row and the generator's property (b); `§8.1` #14; `§0.4`'s `Num(f64)` carrier; `DD-29` | **a non-canonical spelling reaching the committed bytes** (`1e2` for `100`; `100.0`; `+1`; a padded or trailing-zero form); **a canonical spelling REQUIRED on the read side, so that a file carrying a non-canonical but parseable literal is refused or dropped**; **the caller's literal treated as the comparison basis anywhere in this directory**; **an OUT-OF-RANGE `Num(f64)` claimed to be constructible on the declared surface**; **a boot-time `ValueNotAdmitted` for an out-of-range spelling** (`§8.1` #14's trigger is a WRITE's value, and `DD-29` governs the boot); **a refusal realised as a silent rounding** (`A60`'s own words forbid it where the conversion happens) | **`P-IM-1`** (`S-RT`'s equality relation, now scoped: the round trip is exact against the CANONICAL spelling, and a `file` `-0` comes back `0` BY THIS ROW'S DECLARATION while a `mem`/`temp` `-0` comes back `-0`) **+ `P-TP-7`** (`S-CONSTRUCT`'s boot cell, which `DD-29`'s drop already drives: the out-of-range key is dropped, the admitted keys load, NO code is produced) **+ `P-TP-9`** (the generator's property (b): the narrowed `ValueNotAdmitted` row still generates a message, and its trigger is the narrowed set) **+ `P-SM-4`**'s round-trip landing (a canonical spelling never changes the VALUE: `§1.4`'s predicate and the `f64` carrier make the canonical text denote the same carrier) | **(a) THE SHORTEST-ROUND-TRIP RULE'S ALTERNATIVES, EACH PRICED: (i) A FIXED PRECISION** (a fixed number of fractional digits) — priced: it CANNOT round-trip `0.1` or `1e300` exactly, so `P-IM-1`'s equality relation would fail on values the taxonomy admits, and it would make the file's text a lossy image no boot could restore; **(ii) THE EXPONENT FORM FOR EVERYTHING** (`1e0` for `1`, `1.5e0` for `1.5`) — priced: it is canonical and round-trips, but it is a spelling NO other JSON producer emits and it makes the file unreadable to a human, while the ruling's own examples (*"`1e2`, `1.0`, `1E+2` … written in their canonical form"*) name the EXPONENT form as the NON-canonical side, so this alternative contradicts the ruling's own example; **(iii) NO CANONICAL SPELLING AT ALL — THE CALLER'S LITERAL PRESERVED INTO THE FILE** — priced: it is exactly the state `CF-2` filed, and it makes the `file` round trip lose `-0`'s sign with no clause declaring it (the battery's own `1` failing test); **(b) THE BOUND'S PREDICATE — THE ALTERNATIVE READING, PRICED:** **`A60`'s second candidate — *"every number whose literal the carrier cannot represent exactly"* — read as refusing ANY literal that does not denote its carrier exactly, is priced: on this crate's surface NO such literal can be presented as a `StoreValue::Num(f64)` (the carrier is the `f64`, so the literal's rounding precedes the store), and the reading would additionally refuse every NON-INTEGRAL spelling whose exact decimal value is not a terminating binary fraction — which `§1.4` class 3 admits by its own words (*"integral or fractional"*) and which the battery's own corpus drives (`0.1`, `1/3`, `pi`, `1e-300`, `5e-324`, all exact under the DECLARED predicate): so it is available only with `§1.4` class 3 re-read and that corpus re-derived; **(c) THE OUT-OF-RANGE SHAPE'S REFUSAL INSTEAD OF THE CARRIER'S OWN ROUNDING** — priced: it needs a boundary conversion the declared surface does not have (`§0.4` hands the store a `Num(f64)`), so it would mint a numeric carrier WIDER than `f64` and put the refusal OUTSIDE every verb this contract declares | **a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this contract** (`A59`'s and `A60`'s own subjects are his rulings, and only he may name the rule he left unnamed; the preamble's own instrument, `§0.2`'s) |

**⟶ AND THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS BY THIS EIGHTH BOUNDED AMENDMENT — THE OPERATIVE
FIGURE** (`RCA-8(d)` ANNOTATE-BESIDE: **every census clause above — the `31`-, `30`-, `40`- and `45`-row
clauses, each with its own terms — stands byte-for-byte, and THIS clause is the operative statement of the
table's size**): **the table carries `46` rows** — `DD-1`…`DD-24` (**`24` rows**, the as-filed set) +
`DD-25`…`DD-27` (**`3` rows**, the second bounded amendment) + `DD-28`/`DD-29` (**`2` rows**, the third) +
`DD-30` (**`1` row**, the fourth) + `DD-31` (**`1` row**, the fifth) + `DD-32`…`DD-40` (**`9` rows**, the
sixth — the listener amendment) + `DD-41`…`DD-45` (**`5` rows**, the seventh — the correction pass) +
**`DD-46`** (**`1` row**, added at THIS amendment, carrying the `file` tier's canonical number spelling
and its own rule, the narrowed numeric domain's predicate, the refusal's reach and the boot's answer for
an out-of-range literal) — **so `24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46` ✓**, and **every row of the `46`
carries an `alt` cell with a price and a reversal cell naming an instrument, no reversal cell naming a
park.** **THE AS-FILED AND AMENDED CELLS THIS REPLACES READ `31`, `30`, `40` AND `45` AND ARE PRINTED ABOVE
BYTE-FOR-BYTE; THIS clause is the operative statement of the table's size** (`[T: the census'
restatement, with its terms, at this contract's eighth bounded amendment — the numeric rulings'
amendment | CENSUS]`). **AND THE TABLE IS STILL UNCAPPED, AND NO `PAR` ROW, NO REGISTER ROW AND NO
FAIL-CODE MEMBER MOVES WITH IT:** **the `≤ 8` cap binds the typed `P-*` register and not this table; the
register still carries `8` rows with the cap holding (`8 ≤ 8` ✓); and the fail set still carries `15`
members (`11 + 2 + 1 + 1 = 15` ✓ at `§8.1`) — a NARROWED TRIGGER IS NOT A NEW MEMBER, and `§1.4`'s
narrowing therefore moves NO figure of the fail set and NO rank of it** (`§0.1` item 5; `§8.1`; `§9`'s
separation clause).

**AND THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS BY THIS AMENDMENT — THE OPERATIVE FIGURE** (`RCA-8(d)`
ANNOTATE-BESIDE: **the as-filed clause (*"`31` rows — `24 + 3 + 2 + 1 + 1 = 31`"*) and the `30`-row
clause above it stand byte-for-byte, and THIS clause is the operative statement of the table's size**):
**the table carries `40` rows** — `DD-1`…`DD-24` (**`24` rows**, the as-filed set) + `DD-25`…`DD-27`
(**`3` rows**, the second bounded amendment) + `DD-28`/`DD-29` (**`2` rows**, the third) + `DD-30`
(**`1` row**, the fourth) + `DD-31` (**`1` row**, the fifth) + **`DD-32`…`DD-40` (**`9` rows**, added at THIS
amendment, each carrying one silence of the architect's listener rulings `A41`–`A58`)** —
**so `24 + 3 + 2 + 1 + 1 + 9 = 40` ✓**, and **every row of the `40` carries an `alt` cell with a price and a
reversal cell naming an instrument, no reversal cell naming a park** (`[T: the census' restatement, with its
terms, at this contract's sixth bounded amendment — the listener amendment | CENSUS]`).
**AND THE CENSUS IS NOT A CAP:** the `≤ 8` cap binds the **typed `P-*` register** (`§0.1` item 5) and not
the `DD` table, which is **uncapped** exactly as the `PAR` rows are (`§9`'s own separation clause).

**⟶ RECONCILED 2026-10-11 — THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS AFTER THIS CONTRACT'S SEVENTH
BOUNDED AMENDMENT (the correction pass the gate-4 adversarial pass's findings opened): the table carries `45`
rows** — `DD-1`…`DD-24` (**`24` rows**, the as-filed set) + `DD-25`…`DD-27` (**`3` rows**, the second bounded
amendment) + `DD-28`/`DD-29` (**`2` rows**, the third) + `DD-30` (**`1` row**, the fourth) + `DD-31` (**`1`
row**, the fifth) + `DD-32`…`DD-40` (**`9` rows**, the sixth — the listener amendment) + **`DD-41`…`DD-45`
(**`5` rows**, added at THIS amendment, carrying the per-node index's optionality, the handle-token
collision, the `VEC` index-range rule, the empty-address reference's marker, and the reachability probe's
decidable form)** — **so `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` ✓**, and **every row of the `45` carries an `alt`
cell with a price and a reversal cell naming an instrument, no reversal cell naming a park.** **THE AS-FILED
CELLS THIS REPLACES READ `31`, `30` AND `40` AND ARE PRINTED ABOVE BYTE-FOR-BYTE; THIS clause is the
operative statement of the table's size** (`[T: the census' restatement, with its terms, at this contract's
seventh bounded amendment — the correction pass | CENSUS]`). **AND THE TABLE IS STILL UNCAPPED, AND NO
`PAR` ROW, NO REGISTER ROW AND NO FAIL-CODE MEMBER MOVES WITH IT:** **the `≤ 8` cap binds the typed `P-*`
register and not this table; the register still carries `8` rows with the cap holding (`8 ≤ 8` ✓); and the
fail set still carries `15` members (`11 + 2 + 1 + 1 = 15` ✓ at `§8.1`)** (`§0.1` item 5; `§8.1`; `§9`'s
separation clause).

**AND THE ROWS THE `DD` TABLE DOES NOT CARRY, STATED SO THE CARRIAGE IS COMPLETE.** **Every `J`-id the
gate-1 record names is carried by exactly one of: a `DD` row above; the closed fail-code set (`§8.1`); or a
**park** — and none is dropped.** **The mapping, by id:** `J-27`/`J-28`/`J-67` → `DD-23` **and** the
`P-3` park; `J-30` → `DD-8`; `J-31`/`J-32` → `DD-9`; `J-33` (the link's container kind) → **ruled**, `P: §13 ·
A22`, carried by `§1.3` and `P-SM-4`; `J-34` (the leaf's back-reference) → **ruled**, `P: §12 · A18`,
carried by `§1.1`; `J-35` (the overwritten anchor's fate) → **ruled**, `P: §13 · A21`, carried by `§3.4`; the
**`secure` instance's mechanism** (`J-9`–`J-15`, and `J-56`'s floor half) → **`P-1`'s park**, carried by
`§7.1` and `§8.3`'s boundary clause; the **realm, the builder/ABI path, the packaging, the value crossing,
the resolver's returned shape across a boundary, the module-supplied functions' crossing and the in-flight
cycle's disposition** (`J-6`, `J-7`, `J-8`, `J-29` and the `28` parked rows) → **`P-1`'s park**, and **no
clause of this contract reaches any of them** (`[R: §17.4 conditions 2–3 | NEGATIVE]`).
**`J-40`–`J-45` and `J-50`–`J-52` exist in the lost gate-1 record and their texts are not carried by any
surviving artifact** (`R: §8.1`); **their subjects are therefore OWED: owner the supervisor, positive
revisit condition *the archival loop recovers or re-derives the lost record's row texts* — and no `DD` row
is invented for them** (`[R: §8.1 (the series' own arithmetic prints the unrecovered remainder) | OWED]`).

**AND THE FOUR DECLARED-MISSING ITEMS THAT ARE NOT RESIDUALS OF A RULING'S SILENCE BUT GAPS IN THIS
DIRECTORY'S OWN OBSERVABILITY — EACH CARRIED HERE SO NONE IS SILENT** (`[T: the carriage of four
observability gaps, authored at this contract's second bounded amendment | OWED]`). **Each names its
subject, its owner and a POSITIVE revisit condition, and each is a DRIVABLE-or-OWED disposition rather than
a claim:**

| # | The subject, and why nothing in this directory can drive it | What IS declared and drivable instead | Its owner and positive revisit condition |
| --- | --- | --- | --- |
| **O-1** (`F-21`) | **a `NodeRef`'s mutation-through-reference observable** (`§2.1`: *"mutating through it mutates the store"`) — **the contract declares NO mutating API that takes a `NodeRef`**, so no drive can mutate *through* the reference. **Stated rather than dropped.** | **the `NodeRef`'s OWN properties ARE drivable and ARE cited by a register row:** `findAddress(address, t)` returns a reference whose `anchor.tier` is `t` (`§5.4` (a)), and **the read's COPY discipline — the one reference-free seam — is `§4.1`'s and is driven by `P-IM-1`'s second assertion** | **owner the supervisor; positive revisit condition *a mutating seam taking a `NodeRef` is declared by a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, and the observable is authored then*** |
| **O-2** (`F-20`) | **the process-exit LIFETIME's own event** (`§5.1`: `mem` is *"lost on process exit"*; `§6.1` item 3: the journal expires at session end — **the session's referent is the PROCESS**) — **no in-process API can end a process's own life and read the store afterwards**, so the event has no in-process observable. **Stated rather than papered.** | **the BOOT side IS drivable and IS stated:** on `storeCreate`, `file`'s content at `cfg.filePath` is loaded (`§7.2` item 6) while **`mem` and `temp` begin EMPTY, the journal begins with `0` entries and nothing is watched** — and **that boot is exactly what the lifetime clause predicts for a process that ended** | **owner the supervisor; positive revisit condition *the live battery of `implementation-plan.md` §4 item 11 runs against the host's two realms (`P-1`'s park lifted), where the lifetime's event is the realm's own*** |
| **O-3** (`F-17`, `§7.1`'s third key) | **a THIRD key on `cfg`** — the clause says such a key is *"ignored"*, but **`cfg`'s member set is CLOSED at `filePath` and `journalLength`**, and in Rust a closed record cannot carry a third key at all, so the state is **UNREPRESENTABLE rather than ignored**. **Stated so the clause is not read as an unimplemented arm.** | **the closure itself is the declared result:** `StoreConfig`'s two members and nothing else (`§0.4`), so **no third key is ignored, admitted or refused — none exists**; and **`§8.1`'s complement already declares that no code is produced for an unknown key** | **owner the supervisor; positive revisit condition *a fresh ruling extends the construction input set (a third required key, a floor, a base state), and the extended record's outside values are authored with it*** |
| **O-4** (the `§8.3` member-exclusivity claim) | **`§8.3`'s *"`status` and `message` are the record's ONLY TWO members"*** — **a Rust struct's destructuring proves its members EXIST but cannot prove a third is ABSENT**, so exclusivity is not drivable by an ordinary test. **Stated rather than asserted.** | **the two members and `status`'s exact spelling ARE drivable and ARE driven** (`StoreError { status, message }`, `§0.4`; `§8.3`), and **the record's Rust spelling is a struct with exactly those two fields** — so a third member would be a visible change to the declared surface | **owner the supervisor; positive revisit condition *a compile-fail harness is admitted to this unit's test strategy, or a fresh ruling narrows the record so the property becomes structural*** |

**AND TWO MORE `OWED` ITEMS THAT THIS AMENDMENT'S FIXES CREATE — EACH A CONSEQUENCE, NOT A RESIDUAL, AND
EACH DRIVABLE-POSITIVE:** **(O-5) the `FileCommitFailed` member has a declared trigger, a declared
generated message and a declared position in the set, but NO RED-SET DRIVE YET** — **owner the TestWriter's
next pass; positive revisit condition *a drive produces `FileCommitFailed` through a `file`-tier write
whose commit cannot land*** (the shape of such a drive is already observable and is exercised today: a
`cfg.filePath` whose path is a DIRECTORY makes the file write unable to land, and **no test may be edited
by the spec role**). **(O-6) three arm-level expectations the FIRST amendment's text produced and this
amendment's parent-resolution rule corrects** — **the arm table is total and the monotonic clause is
reachable now, so the affected red-set expectations must be re-derived from `§3.2`'s single rule: owner the
TestWriter's next pass; positive revisit condition *the red set is re-run and every expectation that
`§3.2`'s tier-agnostic parent resolution invalidates is re-authored against it*** (`[T: the two
consequences of the fixes, named so nothing is silent | OWED]`).

### §0.4 THE CONTRACT'S OWN CRATE AND THE DECLARED **RUST** SPELLINGS OF EVERY SURFACE ITEM — ONE NAMING
CLAUSE, AND THE LAYOUT THE IMPLEMENTER WRITES

**WHY THIS SUBSECTION EXISTS, STATED BEFORE ITS CODES SO ITS CLASS IS NOT MISTAKEN.** **Every clause of
`§1`–`§9` names the surface in the DIRECTIVE'S own JS-shaped vocabulary** — `storeCreate(cfg) → Store`,
`write(address, tier, value) → WriteResult`, `findAddress(address, tier?) → NodeRef`, `readLiteral`,
`watch`/`unwatch`, `rollback(op)`, and camelCase members such as `filePath`, `journalLength`, `opId`,
`undoneOps` and `restoredAt`. **The unit is a RUST crate**, so **each of those names needs exactly ONE
declared Rust spelling, and the declaration belongs in the CONTRACT and not in a test file** — otherwise
the implementer invents one spelling and the red set assumes another, and a rename becomes a change in two
places with no authority between them. **This subsection is that ONE declaration: the crate's id, the
surface's Rust spellings, and the LAYOUT the implementer writes.** **It declares NO new behaviour clause,
NO new fail-state, NO new parameter, NO new arm and NO new `§`-number of the behaviour regions:** every
item below is a **SPELLING** of a clause that already exists, and **its authority cell names that clause**
(`[T: the naming clause; the spellings carry no claim the JS-shaped clause does not already carry |
CONTRACT]`). **A rename is therefore ONE edit HERE, plus the same spelling wherever it is quoted — and no
behaviour moves with it.**

**THE CRATE.** **The unit's crate id is `storeroom_native`** (the crate's `[package] name` may be
`storeroom-native`; the **Rust import path** is `storeroom_native`, which is the id every surface item is
reached through). **Its manifest and its sources are `Cargo.toml` and `src/**` at the repository root, and
the unit's red set lives at `tests/**` beside them** — the layout clause is stated whole at
`docs/specs/storeroom-native/implementation-plan.md §1.1`.

**AND ITS POSITION AMONG THE `§0.x` SUBSECTIONS, NOTED SO THE ORDER OF PRINTING IS NOT READ AS AN ORDER OF
NUMBERING:** **this subsection's number is `§0.4`, and it is PRINTED beside `§0.1`/`§0.2` because it is a
document-form rule like theirs** (a naming, spelling and layout clause, carrying no behaviour claim) —
**`§0.3` (the dossier's clause-cell resolution) stands where it stood and no section of this document is
renumbered by the insertion**, so **`§0.4`'s print position and its number are unrelated facts**
(`[T: the position note; the `§0.x` order is a print order and no citation depends on it | OBSERVATION]`).

**THE SURFACE'S DECLARED RUST SPELLINGS — one row per item, each citing the clause that declares the
THING being spelled.** **A `?` marks a member that may be absent; `Vec<T>` is an ordered list; `BTreeMap`
is used where the clause declares an UNORDERED key domain, so that structural equality is
key-order-insensitive by construction** (`§5.2 · P-IM-1`'s failure list: *"an object's key order counted as
significant"* FAILS the row).

| Rust spelling | The contract item it spells | The clause that declares the item |
| --- | --- | --- |
| `storeroom_native` (crate id) | the unit's crate | `implementation-plan.md §1.1` |
| `Store` · `storeCreate(cfg: &StoreConfig) -> Result<Store, StoreError>` | `Store` · `storeCreate(cfg)` | `§7.1` |
| `StoreConfig { filePath: FilePathArg, journalLength: JournalLengthArg, listeners: ListenersArg }` | `cfg`'s closed **three**-member set — **⟶ AMENDED 2026-10-11: the as-filed cell read *"`cfg`'s closed TWO-MEMBER set"*, which stands above byte-for-byte; the listener amendment adds the third member `listeners`, and with it `filePath` becomes OPTIONAL (`A49`)—the member is still PRESENT in the record and its `Absent` variant is the optional spelling, so `StoreConfig` stays a closed struct under `§7.1`'s *"a third key is UNREPRESENTABLE"* rule** | `§7.1` |
| `ListenersArg::{List(Vec<ListenerEntry>), Absent, Null, Undefined, NonArray(String)}` · `ListenerEntry::{Entry { address: Vec<Segment>, handle: ListenerHandle }, Other}` | **the construction's `listeners[]` array and its element shape `{ address, handle }`** (`A56` + `A57`) — **the permissive argument type is REQUIRED**, or the array's `null`/`undefined`/non-array answers are unreachable (`PAR-12`) | `§7.1`; `parameter-semantics.md §2.12` |
| `ListenerHandle` — an **opaque** handle (`A57`) | the listener's handle — **what a trigger RETURNS**; its type, its minting and its uniqueness domain are declared by its own parameter row and its record is declared at `§6.5` | `write-and-read.md §6.5`; `parameter-semantics.md §2.13` (`PAR-13`) |
| `Listener { address: Vec<Segment>, handle: ListenerHandle }` | the listener record's closed two-member set (`A57`) | `write-and-read.md §6.5` |
| `WriteResult { op: JournalOp, watched: Vec<Vec<Segment>>, triggered: Vec<ListenerHandle> }` | **⟶ AMENDED 2026-10-11 (supersedes the as-filed `WriteResult` row below, which stands byte-for-byte): the write's return gains the THIRD member `triggered`, carrying the triggered listeners' HANDLES** while `watched` keeps carrying the watched ADDRESSES (`DD-35`) | `§3.6`; `write-and-read.md §6.5` |
| `DeleteReceipt { address: Vec<Segment>, tiers: Vec<Tier>, triggered: Vec<ListenerHandle> }` | **⟶ AMENDED 2026-10-11 (supersedes the as-filed `DeleteReceipt` row below, which stands byte-for-byte): the delete's receipt gains the THIRD member `triggered`, because `A43` rules that a `delete` FIRES** (`DD-35`) | `§4.4`; `write-and-read.md §6.5` |
| `Store::write(address: AddressArg, tier: TierArg, value: StoreValue) -> Result<WriteResult, StoreError>` | `write(address, tier, value)` | `§3.1` |
| `Store::read(address: AddressArg, tier: TierArg) -> Result<StoreValue, StoreError>` | `read(address, tier?)` | `§4.1` |
| `Store::readLiteral(address: AddressArg, tier: TierArg) -> Result<StoreValue, StoreError>` | `readLiteral(address, tier?)` | `§4.1`'s literal-only form |
| `Store::delete(address: AddressArg, tier: TierArg) -> Result<DeleteReceipt, StoreError>` | `delete(address, tier?)` | `§4.3` |
| `Store::findAddress(address: AddressArg, tier: TierArg) -> Result<&NodeRef, StoreError>` | `findAddress(address, tier?)` | `§2.1` |
| `Store::watch(address: AddressArg, tier: TierArg) -> Result<WatchHandle, StoreError>` | the registration's **STOPGAP** verb — **⟶ SUPERSEDED 2026-10-11 by the listener surface below (`A58`); the as-filed row stands byte-for-byte, the verb's clauses stay visible at `write-and-read.md §6.5`, and both surfaces do NOT stand briefly — ONE pass lands the replacement** (`DD-35`; the plan's `§8.1` row `A1`) | `§6.5` item 2 (as filed) |
| `Store::unwatch(handle: &WatchHandle) -> Result<(), StoreError>` | the withdrawal of a **STOPGAP** registration — **⟶ SUPERSEDED 2026-10-11, as above (`A58`)** | `§6.5` item 6 (as filed) |
| `Store::listen(address: AddressArg) -> Result<ListenerHandle, StoreError>` | the listener surface's registration verb: it takes the listener's `address`, MINTS its `handle` and populates the home map (`A57`'s *"an address to determine where it binds"*; the home is `A45`/`A48`'s) | `write-and-read.md §6.5` |
| `Store::unlisten(handle: &ListenerHandle) -> Result<(), StoreError>` | the listener surface's withdrawal verb: it drops ONE home-map entry; **an unknown or foreign handle is a no-op success**, exactly as the superseded `unwatch`'s own clause reads | `write-and-read.md §6.5` |
| `Store::rollback(op: OpIdArg) -> Result<RollbackResult, StoreError>` | `rollback(op)` | `§6.3` |
| **`Result<T, StoreError>`** — the `Err` arm is the delivery of a failure | **`throw`** (`DD-24(b)`): a `Result`'s `Err` variant is Rust's only spelling of a throw at a call boundary, and a success path never returns `Err` | `§0.2 · DD-24(b)`, `§8.3` |
| `Tier::{File, Mem, Temp}` (`Copy`, `Eq`, `Ord` by `rank`); `tier_token(Tier) -> &'static str` | the three ranked tokens | `§5.1` |
| `StoreValue::{Str(String), Bool(bool), Num(f64), Object(BTreeMap<String, StoreValue>), Array(Vec<StoreValue>)}` | `§1.4`'s admitted four classes | `§1.4` |
| `StoreValue::{Null, Undefined, Function, Symbol, BigInt(i64), NonFinite(f64), Cyclic, NonPlainCollection}` | `§1.4`'s OUTSIDE classes, **each spelled so its trigger is REACHABLE** (a `ValueNotAdmitted` drive per class) | `§1.4`, `§8.1` #13 |
| `Segment::{Key(String), Index(u64)}` + the outside-segment variants | `§1.5` item 1's closed segment domain and its outside list | `§1.5` |
| `AddressArg::{List(Vec<Segment>), Absent, Null, Undefined, Str(String)}` | `PAR-1`'s domain AND its outside-value list — **the permissive argument type is REQUIRED**, or the `null`/`undefined`/`AddressMalformed` answers are unreachable | `parameter-semantics.md §2.1` |
| `TierArg::{Absent, Token(Tier), Set(Vec<TierSetItem>), OtherToken(String), Null, Undefined, Object, NonString}` — and `TierSetItem::{Token(Tier), Other(String), Null, Undefined, Object}` | **`§3.1.1`'s ARITY TABLE cell by cell, per verb** — the permissive type is REQUIRED, or the write's and delete's absent/array answers are unreachable | `§3.1.1`; `parameter-semantics.md §2.2`–§2.4 |
| `OpIdArg::{Id(String), Absent, Null, Undefined, NonString(i64)}` | `PAR-10`'s domain and outside list (including the blank-string case) | `parameter-semantics.md §2.10` |
| `FilePathArg::{Path(String), Absent, Null, Undefined, Empty, NonString}` · `JournalLengthArg::{Count(u32), Absent, Zero, Negative(i64), Fractional(f64), NaN, Infinity, NonNumberString, NonNumberBool, Null, Undefined, Object}` | `PAR-6`/`PAR-7`'s domains and their outside lists | `§7.1`; `parameter-semantics.md §2.6`, §2.7 |
| `NodeRef` with `NodeRef.anchor: ChildAnchor` and `ChildAnchor.{key, tier}` **⟶ AMENDED 2026-10-11: `ChildAnchor` also carries `register_marker: bool`, TRUE on the register's own reference alone (`DD-44`; the clause above)** | the resolver's RETURNED REFERENCE and the anchor's own properties, **with the empty address's non-colliding marker** | `§2.1`, `§1.2`; `§1.6` item 4 (a)/(b); `DD-44` **⟶ AMENDED 2026-10-11: this row's *"non-colliding marker"* is the `register_marker` member ALONE, and the marker's `key` spelling STAYS `Segment::Key(String::new())` — the SAME value the LEGAL `""` register key carries (`§1.5` item 1), so the collision of the two `key` values is DECLARED and the property is the carrier (`DD-44`'s dated clause; `§0.4`'s marker clause above; `[T: the row's own marker carrier, stated so the spelling table reads no unholdable key | CONTRACT]`)** |
| `StoreError { status: String, message: String }` | `StoreError`'s closed two-member record (**exactly these two members and no third**; `status` is the member's **exact** `§8.1` spelling) | `§8.3` |
| `WriteResult { op: JournalOp, watched: Vec<Vec<Segment>> }` | `§3.6`'s two members; **`watched` is the watched ADDRESSES** (`P-TP-8`, `§6.5`) — **NOT a `string[]`** | `§3.6`, `§6.5` |
| `JournalOp { opId: String, kind: JournalOpKind, address: Vec<Segment>, tier: Option<Tier>, before: BaseState, after: BaseState, seq: u64, compacted: bool }` · `JournalOpKind::{Write, Delete}` | `§6.2`'s closed record shape and `kind`'s closed two-value domain | `§6.2` |
| `BaseState { present: bool, value: StoreValue }` | `§6.2`'s two-member base state (**the multi-value case is spelled as `StoreValue::Array`**) | `§6.2` |
| `DeleteReceipt { address: Vec<Segment>, tiers: Vec<Tier> }` | `§4.4`'s two-member receipt | `§4.4` |
| `RollbackResult { opId: String, undoneOps: Vec<String>, restoredTo: BaseState }` | `§6.3`'s **three**-member result (**⟶ RECONCILED 2026-10-11, BY THE DOCUMENTATION-REVIEW GATE: this cell's *"`§6.3`'s two-member result"* read the same stale count `§6.3`'s own head carried; the record's members are `opId` · `undoneOps` · `restoredTo` — three — as the spelling in this row's own first column prints, and `§6.3`'s head is reconciled to match**) | `§6.3` |
| `WatchHandle` — an **opaque** handle | the registration's handle (**no member is declared**, `DD-23`) | `§6.5` item 2 |
| `MessageArgs` | the generator's `args` record | `§8.2` |

**⟶ AMENDED 2026-10-11 — THE LISTENER AMENDMENT'S SPELLINGS, AND THE ONE `§0.4` RULE THEY OBEY**
(`RCA-8(d)` ANNOTATE-BESIDE: **every row and every sentence of this subsection above stands byte-for-byte —
the `StoreConfig` row, the `Store::watch`/`Store::unwatch` rows, `WriteResult` and `DeleteReceipt` are
AMENDED IN PLACE by dated clauses and NOT deleted; the five rows the amendment ADDS are inserted above the
untouched rows they sit beside**; `[T: the naming clause's amendment, per this subsection's own one-edit
rule | CONTRACT]`). **THE FIVE ADDED ITEMS ARE SPELLINGS AND NOT BEHAVIOUR:** `ListenersArg`/`ListenerEntry`
spell the construction's array (`§7.1`), `ListenerHandle` spells `A57`'s handle, `Listener` spells `A57`'s
record, and the amended `WriteResult`/`DeleteReceipt` spell the members `DD-35` pins — **so a rename is still
ONE edit HERE plus the same spelling wherever it is quoted, and no behaviour moves with it.**
**AND ONE POINTER THIS AMENDMENT OWES HERE, SO A READER OF THE SPELLING TABLE IS NOT SENT TO A SECOND HOME:**
**the ONE authoritative home map is `write-and-read.md §6.5`'s, and the per-node member tables it feeds are
`store-model.md §1.1`'s** — **this subsection spells them and declares no part of their behaviour**
(`A45`, `A48`).

**⟶ AMENDED 2026-10-11 — ONE FURTHER SPELLING ROW IS ADDED TO THE TABLE ABOVE, SO THE CRATE'S PUBLIC
SURFACE AND THE DECLARED TABLE AGREE ITEM FOR ITEM** (`RCA-8(d)` ANNOTATE-BESIDE: **every row and every
sentence of the table above stands byte-for-byte; this clause ADDS the one row the built crate exports and
the table did not carry, and the added row is read as the table's own**;
`[T: the naming clause's amendment, per this subsection's own one-edit rule; the gate-4 adversarial pass's
`AM-19` found the crate's public surface exceeding the declared table by one item | CONTRACT]`):

| Rust spelling | The contract item it spells | The clause that declares the item |
| --- | --- | --- |
| **`CODES`** — the closed set's own token list, spelled `[&'static str; 15]` (or `&'static [&'static str]`) | **`§8.1`'s closed code set AS A LIST: the `15` members in `§8.1`'s CANONICAL RANK ORDER, `AddressMalformed` first and `FileCommitFailed` last** — the store's PUBLIC statement of which codes exist, so that a caller (or a conformance drive) can test membership of a caught `StoreError.status` against the SET rather than against a hand-copied literal list | `§8.1` (the set and its rank order); `§8.2` (the generator's domain, which is exactly this list); `§8.3` (the `status` member whose spelling the list carries) |
**THE ROW'S THREE CONSEQUENCES, EACH DECLARED SO THE ADDITION IS NOT READ AS NEW BEHAVIOUR:** **(1)** **`CODES`
declares NO behaviour: it is the spelling of a set `§8.1` already closes, and its `15` members, their order
and their triggers are `§8.1`'s and unmoved by this row**; **(2)** **its length is a FUNCTION of the set —
`15` today, and the number moves ONLY with `§8.1`'s own membership, never with a crate-side change**, so a
crate whose `CODES` carries a different count is a CONTRACT VIOLATION and not a widening of the set
(`§8.1`'s closure rule: *"a failure whose code is outside this set is a contract violation, not an extension
of the set"*); **(3)** **the crate-root re-export the built crate already carries is thereby INSIDE the
declared table — so no clause owes a `HOST-FIX` for it, and the alternative (the host dropping the
re-export) is REFUSED because it would leave a caller with no declared way to test membership** — **and that
refusal is this row's own priced alternative: DROPPING the public list and keeping the set internal — priced:
a caller asserting the set's closure would have to hand-copy `15` tokens, which is exactly the drift
`§0.1` item 2's one-declaration rule exists to prevent; available only with `§8.1` re-read.** **No `DD` row
is authored by this clause and the defaults table's census stands unmoved at `45` rows
(`24 + 3 + 2 + 1 + 1 + 9 + 5 = 45`).**

**AND ONE FURTHER SPELLING IS ADDED BESIDE THAT ROW, SO THE EMPTY ADDRESS'S MARKER HAS A DECLARED FORM**
(`RCA-8(d)` ANNOTATE-BESIDE: **the `NodeRef` row above — *"`NodeRef` with `NodeRef.anchor: ChildAnchor` and
`ChildAnchor.{key, tier}`"* — stands byte-for-byte, and THIS clause states the one member the register's own
reference carries BESIDE those two**; `A41`; `DD-44`; the gate-4 adversarial pass's `AM-11`;
`[T: the marker's spelling, so the empty-address reference and a `""` register key are never confusable |
CONTRACT]`): **`ChildAnchor::register_marker: bool` — TRUE on EXACTLY ONE reference in a store, the
register's (whose address is the empty set, `§1.6` item 4 (a)/(b)), and FALSE on every reference a segment
reaches; it is a property of the ANCHOR and NOT a `Segment` variant, so `§1.5` item 1's closed segment domain
(`string` · non-negative integer) is UNWIDENED and `§1.7`'s five-component closure is UNMOVED.**
**`findAddress([], t).anchor.register_marker == true` and `findAddress([""], t).anchor.register_marker ==
false` in a store whose register holds a `""` key — so the two references are DISTINGUISHED by a declared
observable, and the *"EMPTY segment marker"* is a MARKER and not a key** (`§5.7`'s register-reference cell
carries the observable; `§2.1`'s amended empty-address clause is unmoved).

**⟶ AMENDED 2026-10-11 — THE MARKER'S OTHER MEMBER, NAMED SO THE MARKER'S NON-COLLISION IS CARRIED BY A
`ChildAnchor` PROPERTY AND NOT BY A KEY VALUE** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence above stands
byte-for-byte — the clause's own tag *"so the empty-address reference and a `""` register key are never
confusable"* included — and THIS clause is the operative statement of the marker's `key` spelling and of what
carries that non-confusability**; `AM-11`; `§1.5` item 1; `DD-44`'s dated clause; `[T: the two members of the
marker, stated beside the clause that declares one of them | CONTRACT]`): **the register's own reference ALSO
carries `ChildAnchor.key = Segment::Key(String::new())` — the EMPTY segment marker — and THAT VALUE IS NOT A
KEY THE REGISTER CAN NEVER HOLD: `§1.5` item 1 makes `""` a LEGAL `string` segment and a legal, WRITABLE
register key, so `findAddress([], t)` and `findAddress([""], t)` spell the SAME `anchor.key` in a store where
a `""` register key stands, and THAT COINCIDENCE IS DECLARED HERE AND NOT DENIED.** **The type's
`register_marker` member is therefore the WHOLE of the non-confusability carrier — `true` on exactly one
reference in a store and `false` on every reference a segment reaches — and the two facts are asserted at the
references' own values, in one line: **the two `anchor.key` values are EQUAL —
`findAddress([], t).anchor.key == findAddress([""], t).anchor.key`, both spelling
`Segment::Key(String::new())` — while the two `anchor.register_marker` values DIFFER:
`findAddress([], t).anchor.register_marker == true` and
`findAddress([""], t).anchor.register_marker == false` in a store whose register holds a `""` key.** **NO NEW
`DD` ROW IS AUTHORED BY THIS CLAUSE — `DD-44`'s dated clause carries the narrowing, the row's `what it
REFUSES` cell the refused species and its `alt` cell the price — so the table's census stands at `45`, the
typed register at `8` (`8 ≤ 8` ✓) and the fail set at `15` (`11 + 2 + 1 + 1 = 15` ✓), and NO `src/**` byte
moves.**

**⟶ AMENDED 2026-10-11 — THE `ListenerHandle` ROW'S CONSTRUCTION RULE, ITS DOMAIN AND EVERY OUTSIDE VALUE,
STATED HERE BECAUSE THIS SUBSECTION IS THE SPELLING TABLE'S ONE HOME** (`RCA-8(d)` ANNOTATE-BESIDE: **the
`ListenerHandle` row above — *"an **opaque** handle (`A57`)"*, with no member, no variant and no constructor —
STANDS BYTE-FOR-BYTE, and THIS clause is the operative statement of how the type may be built and of what
lies in its domain; the as-filed row's own pointer to `parameter-semantics.md §2.13` (`PAR-13`) and
`write-and-read.md §6.5` stands, and this clause is read WITH `PAR-13`'s rows, which it does not replace**;
`A57`; `A58`; `DD-39`). **NO NEW `DD` ROW IS AUTHORED BY THIS CLAUSE and `§0.2`'s census stands unmoved at
`40` rows (`24 + 3 + 2 + 1 + 1 + 9 = 40`): the construction rule below is stated as a claim of the
**⟶ RECONCILED 2026-10-11, ONE AMENDMENT LATER: THIS CELL’S `40` IS SUPERSEDED BY `45`** (`DD-41`…`DD-45` were added at this contract’s seventh bounded amendment; the operative census is `24 + 3 + 2 + 1 + 1 + 9 + 5 = 45` at this section’s foot; `[T: the cell’s count, superseded by the correction pass | CENSUS]`)
`DECLARED-DEFAULT` class at THIS cell, whose `alt` and reversal point are named in it — the table's own home
is unchanged and no row is added to it.**
**THE GAP THIS CLOSES, NAMED AT ITS OWN CLAUSES:** **the as-filed row declares OPACITY and NO constructor,
while TWO clauses of this directory require a CALLER-SPELLED handle:** **`seams-and-lifecycle.md §7.1` step 5
with `PAR-12` (`DD-39`)** requires the construction's `listeners[]` entries to carry a `handle` **the caller
supplies before any instance of that store exists**, so it cannot have been minted by that instance; and
**`PAR-13`'s outside-value list** names *"a value the store never minted at all (fabricated)"*, whose declared
answer (a no-op success at `unlisten`) is assertable only if a fabricated handle is SPELLABLE. **The shipped
`WatchHandle` has no constructor either**, so no precedent settles it.
**THE RULE, IN FIVE CLAUSES:**
1. **THE TYPE IS A NEWTYPE OVER AN OPAQUE TOKEN, PUBLICLY CONSTRUCTIBLE, AND ITS FIELDS ARE PRIVATE:**
   **`ListenerHandle` is an opaque handle with NO public field, NO public member and NO declared variant,
   and it carries ONE infallible public constructor from a string token — spelled
   `ListenerHandle::from(token: &str)`** (the `From<&str>` conversion), **so a caller CAN spell a handle and
   can NEVER read out or mutate the token it holds** (`Display`/`Debug` may print it; no accessor is
   declared). **A handle is therefore OPAQUE to a caller and CONSTRUCTIBLE by a caller, and the two are not
   in tension.** **The type carries `Clone` + `PartialEq` + `Eq` + `Debug`**, because a handle is RETURNED in
   a list, REMOVED by `unlisten` and COMPARED by a caller: **the returned handle and the handle the caller
   supplied are equal EXACTLY when their tokens are equal.**
2. **TWO WAYS INTO THE DOMAIN, AND THEIR SUBJECTS NAMED:** **the domain of `handle` is the set of values
   that are EITHER (a) MINTED BY THE STORE — by `listen(address)`, which returns a freshly minted token for
   a NEW registration and the EXISTING entry's handle where the address is ALREADY registered (the shipped
   address-level idempotence, `§6.5` item 2, carried to the listener surface by `A45`'s one home), or by the
   construction's `listeners[]` population (`seams-and-lifecycle.md §7.1` step 5) — OR (b) ADOPTED AT
   CONSTRUCTION, i.e. a token the caller spelled and passed in a `listeners[]` entry, which the construction
   adopts VERBATIM as that entry's handle (`DD-39`: *"both entries are KEPT, each with its OWN handle"*).**
   **A store-minted handle is unique per instance and per session** (`PAR-13`'s uniqueness domain, `§6.1`
   item 3), **and the construction ADOPTS the caller's tokens rather than re-minting them, so the store does
   not police their distinctness against its own minted set.**
3. **EVERY OUTSIDE VALUE ANSWERED, AND NOT ONE OF THEM A FAILURE OF `unlisten`:** **a handle value OUTSIDE
   the domain above — ABSENT from a `listeners[]` entry · `null` · `undefined` · a blank token · a non-string
   or non-token value · a value a FOREIGN instance minted · a value THIS instance minted in a PRIOR SESSION ·
   a value the store never minted at all (fabricated) — is answered EXACTLY as `PAR-13` declares:** **at
   `unlisten`, a NO-OP SUCCESS, producing NO code and removing NO other registration** (the superseded
   `unwatch`'s own clause, `write-and-read.md §6.5` item 6, carried forward); **and at the construction, a
   `listeners[]` entry whose `handle` the construction cannot admit answers `AddressMalformed` and no
   instance is returned** (`PAR-12`'s own answer). **A fabricated handle is therefore SPELLABLE (clause 1),
   ADMISSIBLE where it is well-shaped, and never a failure at withdrawal** — which is what makes `PAR-13`'s
   fabricated state drivable rather than merely named.
4. **THE HANDLE'S PRESENCE IN `triggered` IS DECIDED BY ADDRESS AND BY NOTHING ELSE:** **a handle appears in
   a trigger's list EXACTLY where its listener's address is a prefix of the triggering address** — **and a
   handle the construction adopted is returned like any other** (`§5.8` (a); `DD-36`; `write-and-read.md`
   §6.5 item 10 (d)). **A handle LOST or DUPLICATED by a change action that replaced the node carrying its
   borrow FAILS `§5.6`'s listener half and `§5.8`'s `(iv)` drive** (`A46`).
5. **THE ONE SPELLING, SO A TEST OR A CALLER WRITES IT ONCE:** **the constructor's name is
   `ListenerHandle::from`; no second constructor, no public token field and no `Default` is declared.**
   **It is reached through the crate root with every other item of the table above** (this subsection's
   closing clause), **so it is available wherever `ListenerHandle` is.**
**ITS `alt`, PRICED, AND ITS REVERSAL POINT** (`[T: the construction rule's own `DECLARED-DEFAULT`
carriage, per `§0.1` item 3 — *"always with its alternative priced"* — and `§0.1` item 11's closed class
set | DECLARED-DEFAULT]`): **the alternative — a STORE-MINTED handle only, `listen` returning a handle and
the construction's `listeners[]` entries carrying an ADDRESS AND NOTHING ELSE (`A56`'s own printed silence,
which names neither the array's element shape nor a caller-supplied handle) — is priced: it would make the
construction's array INCAPABLE of carrying the handle `A57` names in the listener record
`{ address, handle }`, it would leave `PAR-13`'s *"a value the store never minted at all (fabricated)"*
UNSPELLABLE and therefore its declared answer undrivable, it would contradict `DD-39`'s *"each with its OWN
handle"* for two entries at one address, and it would make `seams-and-lifecycle.md §7.1` step 5's
*"each entry's `handle` becomes a home entry"* a clause with no input; the alternative is available only
with `A56`/`A57` re-read.** **REVERSAL POINT: a bounded amendment of `docs/specs/storeroom-native/`, owned by
`role_spec_writer`, with the amendment row recorded** (`§0.2`'s preamble, the reversal instrument for a row
whose source is this contract's own choice; **`A57` names *"a handle that it returns"* and does not say who
mints it, so no ruling is re-decided here and none is taken**).

**⟶ AMENDED 2026-10-11 — THE HANDLE-TOKEN COLLISION IS DECLARED, AND THE MINT'S OWN RULE CLOSES IT** (`RCA-8(d)`
ANNOTATE-BESIDE: **all five clauses above, their `alt` and their reversal point STAND BYTE-FOR-BYTE; clause 2's
sentence *"the store does not police their distinctness against its own minted set"* is READ THROUGH THIS
clause and is not withdrawn — it speaks of the CONSTRUCTION'S ADOPTION, and this clause speaks of the MINT**;
`DD-42`; `PAR-13`; `write-and-read.md §6.5` items 11 and 12; the gate-4 adversarial pass's `AM-4`).
**THE STATE THIS CLOSES, NAMED RATHER THAN LEFT TO BE TRACED:** **`listen` MINTS its token, the construction
ADOPTS the caller's, and NEITHER RULE READ ALONE DECIDED WHAT HAPPENS WHEN A MINT WOULD PRODUCE A TOKEN THE
HOME ALREADY HOLDS** — a construction entry `{["a"], listener-1}` followed by `listen(["b"])` whose mint yields
`listener-1` puts TWO home entries under ONE token, after which `unlisten(&that)` removes the FIRST match (the
CONSTRUCTION'S entry at `["a"]`), leaves the caller's own registration at `["b"]` standing, and a later write
at `["b"]` returns a handle the caller believes withdrawn; and a write whose address both entries' address is a
prefix of returns that token TWICE in a list declared a SET.
**THE RULE, IN THREE CLAUSES:** **(1) THE MINT MUST NOT COLLIDE.** **`listen` mints a store-unique token that
is UNEQUAL to EVERY token the home already holds: a mint whose candidate token is already held SKIPS that
candidate and mints the NEXT one, so the home never holds two entries with one token where the store minted the
token** (`DD-42`; the uniqueness domain is `PAR-13`'s, unchanged). **(2) THE CONSTRUCTION'S ADOPTION IS
UNTOUCHED — AND ITS ONE LAWFUL COLLISION IS STATED WITH ITS CONSEQUENCE.** **Clause 2 above stands: the store
does NOT police the caller's tokens, so TWO CALLER-SPELLED entries at ONE address (or at two addresses) MAY
carry the SAME token** (`DD-39`: *"both entries are KEPT, each with its OWN handle"*) — **and in THAT state,
and only that state: `triggered` MAY carry that token twice, and `unlisten` over it removes the FIRST match,
which may be the construction's entry rather than the caller's own: the CALLER'S OWN CONSTRUCTION CHOICE, so
`unlisten`'s declared answer is unchanged (a no-op success for an unknown handle, a one-entry removal for a
known one) and NO code is produced for it.** **(3) THE MIS-TARGETING IS A DECLARED ANSWER AND NOT A DEFECT,
AND THE DRIVE THEREFORE ASSERTS IT RATHER THAN FAILING ON IT** — **while a MINTED token colliding with an
adopted one remains REFUSED by (1) and is a DEFECT** (`write-and-read.md §6.5` item 12's *"ADOPTED VERBATIM"*;
`§5.8` (a)'s *"NO MEMBER is added and none omitted"*, read with `DD-42`). **ITS `alt`, PRICED, AND ITS REVERSAL
POINT — `DD-42`'s:** **the alternatives are a REFUSAL at `listen` (which would need a code the closed
`15`-member set does not carry) and a DISTINCTNESS POLICE AT ADOPTION (which would contradict `DD-39` and
`write-and-read.md §6.5` item 12 (b)'s *"ADOPTED VERBATIM"*); each is priced at `DD-42` and neither is
taken.** **REVERSAL POINT: a bounded amendment of `docs/specs/storeroom-native/`, owned by
`role_spec_writer`, with the amendment row recorded.**

**⟶ RECONCILED 2026-10-11 — CLAUSE 2'S UNIQUENESS DOMAIN MOVES: A STORE-MINTED HANDLE IS UNIQUE PER
PROCESS, AND THE AS-FILED CLAUSE'S *"PER INSTANCE AND PER SESSION"* CLAIM IS RE-STATED RATHER THAN LEFT
STANDING FALSE** (`RCA-8(d)` ANNOTATE-BESIDE: **every byte of clause 1, of clause 2's *"TWO WAYS INTO THE
DOMAIN"* sentence, of clause 3, of clause 4, of clause 5, of ITS `alt` and of ITS reversal point above
STANDS, and THIS clause is the operative statement of the uniqueness domain clause 2 declares. The
as-filed clause 2 sentence IS RE-EMITTED HERE, so nothing it read is lost and `git diff` recovers it as an
insertion's own quotation:** *"**A store-minted handle is unique per instance and per session**
(`PAR-13`'s uniqueness domain, `§6.1` item 3), **and the construction ADOPTS the caller's tokens rather
than re-minting them, so the store does not police their distinctness against its own minted set.**"*).
**THE RULING THIS CLAUSE LANDS, AND ITS TRANSCRIPTION:** **`P: §13 · A69`** — the architect's own words,
verbatim, ***"Proceed on b"*** — **filed at the in-project ruled artifact
`docs/specs/storeroom-js-proposal.md` `§13`, whose `§12` priced the three `K7` remedies and whose row
prints remedy `(b)` as *"DECLARE THE TOKEN *UNIQUE PER PROCESS*"*. `A69` thereby SUPERSEDES `A67` (*"use
recommended"*, the per-instance-counter remedy the measurement at the proposal's `§12` refuted); `A67`
stands as its own dated history and is not re-read here** (`[P: §13 · A69 | CROSS-REF]`).

**THE OPERATIVE CLAUSE 2 — RE-STATED IN FULL, SO THE DOMAIN, THE ADOPTION AND THE MINT ARE READ FROM ONE
PLACE:** **the domain of `handle` is the set of values that are EITHER (a) MINTED BY THE STORE — by
`listen(address)` or by the construction's `listeners[]` population — OR (b) ADOPTED AT CONSTRUCTION, i.e.
a token the caller spelled and passed in a `listeners[]` entry, which the construction adopts VERBATIM as
that entry's handle (`DD-39`). A store-minted handle is UNIQUE PER PROCESS: the store mints one token, and
no OTHER token the store mints — in THIS instance, in ANY other instance of THIS process, or at ANY LATER
moment of THIS process — is equal to it.** **AND THE MINT'S OWN NON-COLLISION RULE IS UNMOVED by the
domain's restatement: `listen` still mints a token UNEQUAL to EVERY token the home ALREADY holds
(`DD-42`), the construction still ADOPTS the caller's tokens rather than re-minting them, and the store
still does not police the ADOPTED tokens' distinctness against its own minted set.**

**THE TWO CONSEQUENCES THIS CLAUSE STATES HONESTLY, EACH PRINTED AS ITS OWN:** **(i) THE DOMAIN A HANDLE'S
VALIDITY IS MEASURED IN IS *THIS PROCESS'S* STORE INSTANCES.** **A token THE PROCESS NEVER MINTED names NO
entry in ANY of this process's store instances** — the process's minted set and its adopted tokens lie in
one namespace, `listen` never re-mints a token that namespace holds, and a caller-spelled token is
instance-local because only the instance the caller handed it to holds it. **So an unknown, a fabricated,
and a FOREIGN-INSTANCE handle are each OUTSIDE the domain UNCONDITIONALLY, and `unlisten` over each is the
declared NO-OP SUCCESS of clause 3, removing NO OTHER REGISTRATION.** **(ii) A PRIOR SESSION'S HANDLE IS
OUTSIDE THE DOMAIN, AND WHERE THE CURRENT PROCESS HAS SINCE MINTED THE SAME TOKEN IT NAMES *THAT*
REGISTRATION — A DECLARED CROSS-PROCESS HAZARD, NOT A DEFENDED PROPERTY.** **The counter RESTARTS at each
process, so a token a PRIOR SESSION minted can be EQUAL to a token THIS process has since minted for a
DIFFERENT registration** — and, handle identity being TOKEN EQUALITY ALONE (clause 1), `unlisten` over
that value names THAT registration. **THIS IS ACCEPTED, NOT CURED: a caller that must be safe ACROSS A
RELOAD MUST NOT CARRY HANDLES ACROSS IT** (`K7`'s containment note stands open and is not defended here,
`P: §13 · A69`'s own accepted-consequence cell).

**WHAT IS REFUSED, AND WHAT IS NOT MOVED:** **the BARE PER-INSTANCE COUNTER IS REFUSED** — *measured*, not
preferred: a per-instance counter restarts at `1` in every fresh instance, so two instances created in ONE
process mint THE SAME token, and `unlisten` over a foreign instance's handle then removes THE INSTANCE'S
OWN entry, contradicting clause 3 (`373 PASS / 1 FAIL`, the failing cell being
`tests/e2e_listener_firing.rs`'s `lf_e12_a_fabricated_and_a_foreign_handle_unlisten_remove_nothing`,
`P: §12`). **NO `src/**` BYTE MOVES, NO `tests/**` BYTE MOVES, and the store's measured green stands
untouched: the shipped process-global mint IS the declared behaviour.** **NO `DD` ROW IS AUTHORED BY THIS
CLAUSE** (the table's census stands at `46`, `24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46` ✓), **NO `PAR` ROW MOVES**
(the set stands at `14`, `12 + 1 + 1 = 14` ✓), **the typed register stands at its `8` rows with the cap
holding (`8 ≤ 8` ✓), the closed fail set stands at its `15` members (`11 + 2 + 1 + 1 = 15` ✓), the
prohibited set stands at its `7` rows, and the `derivation:` clause stands single.**
**AND WHICH STANDING CELLS THIS DECLARATION MAKES REACHABLE, NAMED SO NOTHING IS CLAIMED GREEN:** **the
cells that drive the foreign-INSTANCE and fabricated no-ops — `tests/watched_addresses.rs`'s
`par_13_a_foreign_instance_s_handle_is_a_no_op_success_and_the_other_instance_is_untouched`,
`par_13_two_instances_never_cross_name_each_other_s_registrations`,
`par_13_a_foreign_handle_is_a_no_op_success`, `par_13_a_fabricated_handle_is_a_no_op_success` and
`dd_42_the_mint_never_takes_a_token_the_instance_s_home_already_holds`, with
`tests/e2e_listener_firing.rs`'s `lf_e12_a_fabricated_and_a_foreign_handle_unlisten_remove_nothing` and
`lf_f6_the_mint_never_collides_and_the_caller_spelled_collision_is_lawful` — hold under THIS declaration
exactly as they hold now, each asserting the behaviour their own clause already declares; the
per-instance/per-session spelling those cells QUOTE in their assertion messages is the AS-FILED form this
clause re-states, and NO ASSERTION OF ANY CELL IS WEAKENED, EDITED OR OTHERWISE MOVED BY THIS PASS.**
(`[P: §13 · A69; T: clause 2's domain, re-stated with its as-filed sentence re-emitted | CONTRACT]`)

**⟶ AND THE HANDLE'S UNIQUENESS, CARRIED TO `§5.8`'s AND `DD-42`'s OWN CELLS SO NO CITATION OF THEM GOES
STALE** (`RCA-8(d)` ANNOTATE-BESIDE; `P: §13 · A69`; **both the `P-TP-8` row's `(a)`/`(b)` half and `DD-42`'s
mint rule stand byte-for-byte and are READ THROUGH this clause**; `[T: `§5.8`'s and `DD-42`'s reading of the
uniqueness domain, stated here because both cells speak of the MINT and of the SET without naming a
domain | CROSS-REF]`): **`§5.8` (a)'s *"the handle set is exactly the triggered set, with no duplicated
member"* and `DD-42`'s *"a home never holds two entries with ONE store-minted token"* are claims about ONE
store instance's home and are UNMOVED — the domain's move from per-instance to per-process makes each
STRONGER, never weaker, because every instance's minted set is a subset of the process's minted set.**
**AND `DD-42`'s mint rule's own scope is UNMOVED: it is a PER-HOME rule — `listen` skips a candidate the
CALLING instance's home holds — and it is not widened by this clause into a cross-instance police; that
cross-instance distinctness comes from the MINT'S SINGLE PROCESS-GLOBAL COUNTER and not from a new duty
upon any instance.** **NO CELL OF `§5.8`, NO `DD` ROW'S CELL, NO `DD` ROW'S COUNT AND NO CELL OF `§6.5` IS
EDITED, ADDED OR DROPPED BY THIS CLAUSE.**

 **every item in the table above is re-exported from the crate root**, and **the red set reaches
them through `tests/support/mod.rs`'s single `pub use`** — so **the test module holds the SPELLINGS the
crate exports, and this subsection holds the AUTHORITY for them**; **a rename edits this table and the
`use` list, and nothing else** (`[T: the naming clause's one-line consequence | CONTRACT]`).

### §0.3 THE RESOLUTION OF THE DOSSIER'S CLAUSE CELLS — `decision <D-id> — awaiting spec` → `spec §n`

**The dossier `docs/specs/storeroom-native-adoption-dossier.md` `§1-bis` carries the third legal clause
value on all eight rows; THE TRANSITION INSTRUMENT `§0.1` item 6 names admits `spec §n` once a filed spec
carries the section.** **Each cell
resolves to the section below, and the resolution is a `CROSS-REF` claim of this document.**

| The dossier's row (`identifier`) | The meaning `§1-bis` records | The section of THIS contract that pins it |
| --- | --- | --- |
| `leaf` / `branch` | two node kinds; a leaf stores data and carries no downstream anchors; a branch stores anchors and no readable value; a re-minting write destroys the leaf's anchor and places a new one on the same link | `§1.1` and `§3.4` |
| `anchor` | the interface between a node and a link; parent or child; the tier is a property carried on the child side | `§1.2` and `§5.1` |
| `link` / `registry` (the consolidated row) | exactly one parent anchor and a container of child anchors; lower tier **is** lower persistence; the container is write-decided and read-inferred and a kind-contradicting write fails; the register acts as a link, is keyed by the caller's names, is always a hashmap, and the empty address resolves to it | `§1.3` and `§2.3` |
| `tier` | a property, not a data structure; optional on read accepting zero to many with any match answering; exactly one required on write | `§5.1` and `§3.1` |
| `file` / `mem` / `temp` | the three ranked tokens; `mem` is lost on process exit; `temp` shadows `mem` and is purged on writes to `mem` as `mem` is to `file`; purge is the write deleting any versions of the addressed node with the same or less persistence | `§5.1`, `§5.4`, `§5.4` (c) (the merged row's own half; its declared-default pointer is `§5.5.1`) |
| `address` | the segment path walked from the register; the empty address resolves to the register and a read there returns an object containing the entire registry, so the empty array is a valid address | `§1.5`, `§2.2`, `§4.2` |
| `findAddress` | the shared resolver, which returns a reference; its failure is a closed status code with a generated message naming the mismatch | `§2.1`, `§8.1`, `§8.2` |
| **the `L`-tagged citations of this document** | — | the clauses above carry `L: §1-bis · <identifier>` beside their ruling citations, so a cell's resolution is checkable from either end |

---

## §1. The store's record shapes — leaf · branch · anchor · link · registry · the tier property

**AUTHORITY NOTE FOR THIS SECTION.** The directive's five components and their clauses stand at
`P: §1`; the rulings that read them stand at `P: §12`–`P: §13`. **A `P`-tagged citation names the
in-project ruled artifact as the record of the architect's words**, and **no clause below is derived from
any adjacent-project text** (`P: §11 · A9`).

### §1.1 The two node kinds — `leaf` and `branch`

**`leaf` and `branch` are TWO NODE KINDS** (`P: §11 · A13`: *"I explicitly said they're two different node
types"*; `L: §1-bis · leaf/branch`). **They are not one record with two member kinds.**

| Kind | Its members, and nothing else | What it REFUSES |
| --- | --- | --- |
| **`leaf`** | **`value`** — exactly one **admitted literal** (`§1.4`); **`anchor`** — the one `AnchorRef` that points to it (a leaf *"is pointed to by an anchor or the register, and must point back"*, `P: §1`) | any child anchor; any downstream link; a value outside `§1.4`; more than one anchor |
| **`branch`** | **`anchor`** — its one parent-side `AnchorRef`; **`container`** — exactly one `Link` (`MAP` or `VEC`, `§1.3`); **`address`** — the path from the register by which it is reachable (`P: §12`'s reachability reading, `DD-6`) | a readable value of its own (*"They do not contain any readable value"*, `P: §1`); more than one container; a container of zero anchors unless the write installed an empty object (`DD-1`) |

**A `branch`'s container may hold `0` child anchors and is still a `branch`** — the empty case is `DD-1`'s.
**THE RE-MINT ARM, RULED — AND IT CARRIES NO TIER CARVE-OUT:** a write whose target resolves to a **leaf**
and whose value is an object or an array destroys that leaf's **pointing anchor** and places a **new anchor
on the SAME link** (`P: §13 · A21`: *"destroy and replace with a new anchor on the same link"*); the old
leaf's `value` and the old anchor are **gone**, and **the destroyed anchor's tier does not survive onto the
new one — the write's tier is the new anchor's tier, WHATEVER TIER THE DESTROYED ANCHOR CARRIED: a leaf at a
MORE persistent tier than the write's is re-minted exactly as one at the write's own tier is, because
`A21`'s words name no tier and this clause reads none into them** (`§5.4` arm `W-2`, whose table's home is
`§3.4` and whose reconciliation clause states the one rule this clause and that arm share; **`W-5` is the
SHADOW arm and is reserved to a target that is NOT the leaf this write re-mints**) (`[P: §13 · A21 (its
printed silence read with `A24`'s single write tier, and read UNCONDITIONALLY: the ruling's own words name
no tier and its transcription names the residual it answered as *"the fate of the anchor a branch overwrites
when a write re-mints a leaf"*) | CONTRACT]`).
`[P: §1, §11 · A13, §13 · A21; L: §1-bis · leaf/branch | CONTRACT]`

### §1.2 The anchor — parent side and child side, and where the tier lives

**The `anchor` is the INTERFACE between a node and a link** (`P: §12 · A18`: *"The anchor interfaces
between the node and the link"*), and **`parent anchor` and `child anchor` are TWO IDENTIFIERS**
(`P: §14 · A30`: *"Two identifiers"`; `L: §1-ter`, `L: §1-bis · anchor`).

| Side | Its members, and nothing else |
| --- | --- |
| **`ChildAnchor`** | **`key`** — a string (the register's and a `MAP`'s key domain) **or** an index — a non-negative integer (a `VEC`'s key domain); **`tier`** — a **tier property** (`§5.1`; **the tier is carried BY ANCHORS**, `P: §14 · A27`); **`node`** — the `NodeRef` it points to |
| **`ParentAnchor`** | **`link`** — the `LinkRef` it belongs to; **`node`** — the `NodeRef` that owns it (**`branch.anchor`** points back, and for a register-held root the register **acts as a link**, so the interface is complete, `P: §12 · A18`) |

**⟶ AMENDED 2026-10-11 — THE `ChildAnchor` ROW ABOVE IS READ THROUGH ITS AMENDED FORM, WHICH CARRIES THE
MARKER MEMBER THIS DOCUMENT'S OWN `§0.4` SPELLS** (`RCA-8(d)` ANNOTATE-BESIDE: **the table's `ChildAnchor` row
and the header's *"Its members, and nothing else"* stand byte-for-byte, the row being this document's
pre-amendment layer of the relocated section**; `AM-11`; `DD-44`'s dated clause; `store-model.md §1.2`'s dated
clause; `[T: the anchor's member set, so no clause reads a member the declared shape does not carry |
CONTRACT]`): **`ChildAnchor`'s members are `key` · `tier` · `node` · `register_marker` — the fourth being the
marker member `§0.4`'s `NodeRef`/`ChildAnchor` spelling row and its marker clause declare, TRUE on the
register's own reference alone and FALSE on every reference a segment reaches — and the operative statement of
the row's member SET is `store-model.md §1.2`'s dated clause, exactly as `§1.1`'s as-filed rows are read
through that section's own dated clause.**

**THE MONOTONIC CLAUSE, STATED OVER ANCHORS** (`P: §14 · A27`): **`rank(childAnchor.tier) ≤
rank(parentAnchor.tier)`**, read with `M-1` of `§5.1`. **A child anchor whose tier outranks its parent's
fails: `ParentAnchorMonotonicityViolation` (`§8.1`).** **The register has no parent anchor and therefore
imposes no upper bound on its children — any of the three tiers may stand at a register key**
(`[P: §1 (the register is used for the tree's top-level nodes) + §12 · A18 | CONTRACT]`).
`[P: §1, §12 · A18, §14 · A27 · A30; L: §1-bis · anchor | CONTRACT]`

### §1.3 The link and its container — `MAP` xor `VEC`, write-decided and read-inferred

**A `Link` has exactly one parent anchor and a container of child anchors** (`P: §1`). **The container is
one of exactly two kinds, and the kind is a property of the link:**

| Kind | Its key domain | Its iteration order | Where it may stand |
| --- | --- | --- | --- |
| **`MAP`** | string keys | **unordered** — the store declares **no order** over a `MAP`'s children | anywhere |
| **`VEC`** | index keys — non-negative integers, **contiguous from `0`** | the index order | **never at the register** (`P: §13 · A23`) |

**THE CONTAINER'S KIND IS DECIDED AT WRITE AND INFERRED FROM CONTENTS ON READ** (`P: §13 · A22`):
a write of a JSON **object** decides/uses `MAP`; a write of a JSON **array** decides/uses `VEC`; **a read
infers the kind from what the container holds** — the read does not carry a stored kind flag as its
authority. **A WRITE WHOSE KIND CONTRADICTS THE EXISTING CONTAINER FAILS**
(`P: §13 · A22`: *"Write attempting to add to vec when hashmap is used, or vice versa, fails"*), with
**`ContainerKindConflict`**, and **the failed write leaves the container, the node and the journal
untouched** (`DD-19`). **THE UNIQUENESS KEY IS THE PAIR `(key, tier)`:** **at most ONE child anchor per key
and tier** (`P: §15 · A34`), so **two versions of one key are two anchors**, one per tier.
**AND THE SEGMENT CLASS'S CONTRADICTION WITH THE PARENT CONTAINER'S KEY DOMAIN — THE STATE THIS CONTRACT
ANSWERS WITH A MEMBER OF `§8.1`'s CLOSED SET, AND NOT WITH A SILENT COERCION OR A SILENT MINT:** **the
container's key domain is part of the container's kind (`MAP` = string keys; `VEC` = index keys,
contiguous from `0`), so a write whose LAST segment's CLASS contradicts the resolved parent container's key
domain — a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP` — is a KIND
CONTRADICTION, and its answer is the SAME member the value's kind contradiction answers:
`ContainerKindConflict`, with NOTHING INSTALLED (no anchor, no coercion, no container-kind change, and no
journal entry)** (`§3.4` arm `F-4`; `§8.1` #7; `§1.5` items 2–3: **NO COERCION OCCURS**, and `"0"` is never
`0`) (`[T: the key-domain arm, stated at this contract's third bounded amendment — the gate-4 adversarial
pass's `H-2`/`S-2` found no arm and no code for the state, and the existing member is extended rather than
a new one minted | CONTRACT]`).
`[P: §1, §13 · A22 · A23, §15 · A34; L: §1-bis · link/registry | CONTRACT]`

### §1.4 The admitted value taxonomy, and the node-kind decision a value forces

**A leaf's `value` is a primitive/literal — *"any primitive/literal format, but not objects/dicts/arrays or
other collections"*** (`P: §1`). **The admitted set is closed at exactly four classes:**

| # | Admitted | A write of it mints |
| --- | --- | --- |
| 1 | **`string`** | a `leaf` |
| 2 | **`boolean`** | a `leaf` |
| 3 | **a finite JSON number** (integral or fractional) | a `leaf` |
| 4 | **a JSON object** `{}`-form, **or** a JSON array `[]`-form | a **`branch`** whose container is `MAP`, resp. `VEC` |

**OUTSIDE the set, and each is a write-time failure rather than a silent coercion:** **`null`** ·
**`undefined`** · **a function** · **a symbol** · **a `BigInt`** · **a non-finite number (`NaN`,
`±Infinity`)** · **a cyclic object** · **a class instance, a `Map`/`Set`/typed array or any other
non-plain collection**. **The answer for each outside value is the SAME: `ValueNotAdmitted`, and no node
is minted** (`[T: §1.4's taxonomy is this contract's closure of the directive's own admission set (`P: §1`);
its carrier `A14`'s closed code set | DECLARED-DEFAULT]`, priced in `DD-24(e)`).
**THE KIND-CONTRADICTING VALUE IS A DIFFERENT FAILURE:** a value that *is* admitted but whose container
kind contradicts the target's is **`ContainerKindConflict`**, not `ValueNotAdmitted` — the taxonomy decides
*what may be stored at all*, the kind rule decides *whether it fits here*.
`[P: §1, §13 · A22; T: §1.4's closure | CONTRACT]`

**⟶ AMENDED 2026-10-11 — CLASS 3 IS NARROWED TO THE `f64`-EXACT RANGE, THE OUT-OF-BOUNDS VALUE'S DECLARED
ANSWER IS THE REFUSAL, AND THE BOUND'S PRECISE PREDICATE IS STATED IN ONE CLAUSE** (`RCA-8(d)`
ANNOTATE-BESIDE: **the table's four rows, the OUTSIDE list and the kind-contradiction paragraph above all
stand BYTE-FOR-BYTE, and THIS clause is the operative statement of class 3's own domain**; **the ruling:
*"Refuse out-of-bounds numbers"*, transcribed as `A60` at the FILED proposal
`docs/specs/storeroom-listeners-proposal.md` `§21`, whose resolving citation form is `P: §21 · A60`**;
`P: §21 · A60`'s own words: *"a number outside the carrier's exact range is REFUSED … a value beyond it
answers `ValueNotAdmitted` … rather than being silently rounded"*).
**THE NARROWED CLASS 3, IN THREE CLAUSES AND NOTHING ELSE:**
1. **THE DOMAIN.** **Class 3 admits a FINITE JSON NUMBER IF AND ONLY IF its `f64` carrier is EXACT** — i.e.
   iff the value the literal denotes and the value `§0.4`'s `Num(f64)` holds are the SAME value.** **Any
   finite JSON number a `f64` can hold at all is thereby admitted (`P: §1`; `§0.4`), and the class is
   narrowed from *"a finite JSON number"* UNBOUNDED to *"a finite JSON number whose value the carrier
   holds exactly"*.**
2. **THE BOUND'S PRECISE PREDICATE — DECLARED HERE, SO THE REFUSAL HAS ONE FORM AND NOT TWO.** **This
   contract takes THE FORMALISATION `A60`'s FIRST CANDIDATE NAMES: the `f64`-EXACT INTEGRAL RANGE.** **A
   number is IN DOMAIN iff it is finite AND its magnitude is at most `2^53` when the literal denotes an
   INTEGER, and iff it is finite when the literal denotes a non-integer** — **so the predicate in one
   line: `n` is IN DOMAIN iff `n` is finite and (`n` is not integral, or `|n| ≤ 2^53`).** **WHY THIS IS THE
   ONE `A60`'s OWN WORDS FIT: the ruling narrows the taxonomy to *"the `f64`-exact range"*, and the
   `f64`-exact range's ONE DECIDABLE BOUNDARY is that every integer of magnitude at most `2^53` has an
   exact carrier while `2^53 + 1` has none** (`9007199254740993` rounds to `9007199254740992`, the
   battery's `CF-3` finding) — **so an integral literal beyond that magnitude is the ONE SHAPE the bound
   refuses, and `A60`'s own parenthetical question (*"whether `2^53 + 1` is the ONLY shape refused"*) is
   ANSWERED YES.** **⟶ AND THE BOUND'S PREDICATE IS RESTATED UNDER CLAUSE 1's OWN HEAD — THE
    EXACT REPRESENTABILITY READING — SO THE BOUND AND ITS
    TRIGGER ARE ONE RULE AND NOT TWO** (`RCA-8(d)` ANNOTATE-BESIDE: **every clause above stands
    BYTE-FOR-BYTE, and THIS addition is the predicate's own operative restatement**; `P: §21 · A60`;
    `§1.4`'s clause 1; `DD-46`): **a number is IN DOMAIN if and only if its `f64` CARRIER HOLDS IT
    EXACTLY, and an INTEGRAL LITERAL THE CARRIER CANNOT REPRESENT EXACTLY is the shape the bound REFUSES
    `ValueNotAdmitted`** (`§8.1` #14) — **so the shape that falls OUTSIDE is `2^53 + 1`** (`9007199254740993`, the integral literal just past the exact
    boundary, whose carrier rounds it to `2^53`), **and the shapes that fall INSIDE are `2^53 + 2` and
    `2^53 + 4`** (`9007199254740994` / `9007199254740996` — both ABOVE `2^53`, both integral, and each one
    HELD EXACTLY by the carrier, the `f64` spacing at `2^53` being `2`) — **so the `|n| ≤ 2^53` spelling
    above is the bound's DECIDABLE FORM and is not a wall at `2^53`: every integer of magnitude AT MOST
    `2^53` is exact and therefore inside it, and an integer ABOVE `2^53` lies outside that spelling's
    range while the bound still ADMITS it whenever the carrier HOLDS ITS VALUE.**
    **AND THE COARSER READING STANDS PRICED AND IS NOT THE OPERATIVE ONE: refusing every integral
    magnitude above `2^53`** — which would refuse `2^53 + 2` and `2^53 + 4` although each is exactly
    representable — **remains `DD-46`'s PRICED ALTERNATIVE, priced at its `(b)` cell beside `A60`'s second
    candidate predicate and the wider-carrier alternative, and reading THIS clause that way is refused.**
    `[P: §21 · A60; T: the bound predicate under the exact-representability reading, printed at this
    contract's own `§1.4` | DECLARED-DEFAULT]`
    **AND THE PREDICATE'S DECIDING POINT IS NAMED RATHER THAN LEFT TO BE DISCOVERED: it is
   decided over the value a JSON TEXT denotes at the moment of CONVERSION into the carrier.** **THE CONVERSION
   POINT IS `seams-and-lifecycle.md §7.2`'s: item `6` decides WHICH CONTENT LOADS AND WHAT THE REGISTER
   BEGINS WITH, and that section's added item `7` (d) governs the value-conversion itself, so the two items
   do not overlap** — **because a `StoreValue::Num(f64)` has ALREADY crossed that point and every value the
   carrier holds is in range by construction** (`§7.2`'s own dated item 7 states this; `DD-46` (d)).
3. **THE OUT-OF-BOUNDS VALUE'S DECLARED ANSWER IS THE REFUSAL, NEVER A SILENT ROUNDING.** **A number
   outside the domain of clause 1 is a WRITE-TIME failure exactly as every other outside class is — the
   SAME `ValueNotAdmitted`, no node minted, no anchor installed and no journal entry appended** (`§8.1`
   #14; `§8.2`'s `ValueNotAdmitted` row; `DD-19`'s no-residue precedent) — **and where the conversion
   happens at the BOOT instead, the boot's declared answer is `DD-29`'s: that register key is DROPPED,
   the rest of the content loads, the instance IS returned, and NO code is produced for it** (the
   out-of-range value is simply outside the now-narrowed admitted set the boot reads).
**WHAT THIS CLAUSE DOES NOT MOVE, SAID PLAINLY SO THE NARROWING IS NOT READ AS A REWRITING:** **the four
classes stay FOUR, the outside list above stands whole, the kind-contradiction paragraph stands whole, the
member is the EXISTING `ValueNotAdmitted` and NO member is added, no rank moves and the fail set's algebra
stands (`11 + 2 + 1 + 1 = 15` ✓ — a NARROWED TRIGGER IS NOT A NEW MEMBER), and `DD-24(e)`'s priced
alternative is untouched.** **AND THE ONE DISCLOSURE THIS CLAUSE OWES: on the crate's DECLARED surface
(`§0.4`) a numeric value enters as `Num(f64)`, so the refusal declared above has NO reachable instance
THERE and its deciding point is the boot's conversion — a scope fact `DD-46` (d) carries as the row's own
cell rather than as a hidden qualification of this clause.** **ITS `alt`, PRICED, AND ITS REVERSAL POINT ARE
`DD-46`'s** (its `(b)` cell prices `A60`'s second candidate predicate and the wider-carrier alternative, and
its reversal cell names the instrument).
`[P: §21 · A60; T: class 3's narrowing, the predicate and the refusal, at this contract's eighth bounded
amendment | DECLARED-DEFAULT]`

### §1.5 The address — grammar, segments, and the empty address

**AN ADDRESS IS A JS/JSON ARRAY OF SEGMENTS** — *"a JS/JSON array containing the path to walk through the
tree, starting from the register"* (`P: §1`) — and **not a delimited string** (`DD-24(d)`).

1. **The segment domain is closed at exactly two classes:** a **`string`** (a key) and a **non-negative
   integer** (an index). **A negative integer, a non-integer number, `null`, `undefined`, a boolean, an
   object, an array or a function as a segment is OUTSIDE the domain and fails `AddressMalformed`.**
   **The empty string `""` is a legal `string` segment and is a legal key** (`[T | DECLARED-DEFAULT]`;
   its alternative — refusing `""` — is priced at `DD-24(c)`).
2. **NO COERCION OCCURS.** `"0"` is a **string key**; `0` is **an index**. They are never the same
   segment, and **the store never coerces one into the other** — that separation is what keeps `MAP` and
   `VEC` distinguishable on read (`DD-24(c)`).
3. **A `string` segment resolves against a `MAP` and against the register; it resolves NOWHERE against a
   `VEC`** (the `VEC`'s key domain is indices). **An integer segment resolves against a `VEC`, and NOWHERE
   against the register** — *"the REGISTRY IS ALWAYS A HASHMAP, so it carries no ordered-vector form and an
   index-shaped segment has no index semantics to reach"* (`P: §13 · A23`), so **an integer segment aimed
   at the register fails `AddressNotFound`** — the register is not a contradicted container, it is a
   container that does not hold that key (`[T: §2.2's arm `L-INT-REG`, whose code is `AddressNotFound` and
   not `ContainerKindConflict` | CONTRACT]`). **A READ, a `delete`, a `watch` or a `findAddress` therefore
   answers `AddressNotFound` at such a segment; A WRITE is the ONE verb whose answer differs, because it
   would MINT at the key — its answer is `§1.3`'s key-domain arm, `ContainerKindConflict`, and it installs
   nothing** (`§3.4` arm `F-4`; `§8.1` #7).
4. **THE EMPTY ADDRESS (`address.length === 0`) IS A VALID ADDRESS** (`P: §13 · A25`: *"Empty address
   resolves to register"*), **and it resolves to the REGISTER.** **The directive's own earlier phrase
   *"An address.len == 0 resolves to the parent node of the register (which otherwise cannot be addressed)"*
   (`P: §1`) is SUPERSEDED IN REFERENT, NOT IN EXISTENCE** (`R: §16.2`'s `O-7` row): the register's
   *"parent node"* under `A18` is the register-as-link itself, and the later ruling's words are operative.
   **A read at the empty address returns an object containing the ENTIRE registry** (`P: §13 · A25`).
   **The address is NOT malformed for being empty** — this is the one place where this unit's contract
   **intentionally differs** from the corpus's *"AN ADDRESS IS A NON-EMPTY SEGMENT LIST"*
   (`[P: §4 · X-6 (the directive's clause beside the corpus's, a conflict the architect ruled
   intentional); P: §11 · A9 | NEGATIVE]`).
5. **A single address reaches exactly one node.** **Every minted node is reachable by exactly one address
   path** (`DD-6`), and **no two distinct addresses resolve to one node**.

`[P: §1, §4 · X-6, §11 · A9, §13 · A23 · A25; L: §1-bis · address | CONTRACT]`

### §1.6 The register — keyed by names, always a hashmap, no parent anchor

**The `registry` (the register) is the root container.** **It acts as a link** (`P: §12 · A18`), and it
differs from an ordinary link in exactly three ways, all of them ruled:

1. **its child anchors are associated with KEYS, not indices** (`P: §1`;
   `L: §1-bis · link/registry`);
2. **it is ALWAYS A HASHMAP** (`P: §13 · A23`) — **no ordered-vector form and no index semantics**;
3. **it has NO parent anchor** — it is the walk's start, and a register-held root node's anchor interfaces
   that node and the register-as-link exactly as any other anchor does (`P: §12 · A18`).

**A register key's child anchor carries a tier exactly as any other child anchor does**, and **the register
imposes no monotonicity bound on it** (`§1.2`). **The register's key domain is the caller's own strings**
(`P: §13 · A23`'s printed silence read with the directive's keyed-not-indexed clause
`[P: §1, §13 · A23 | DECLARED-DEFAULT]`, **whose priced alternative and reversal instrument are
`DD-24(f)`**). **`DD-24(f)` IS THE ROW THIS CLAIM'S `alt` CELL LIVES IN, STATED HERE SO THE CLAIM'S PRICE
IS NOT LEFT POINTING AT A CLAUSE THAT PRICES NOTHING** (`[T: the claim's priced home, corrected at this
contract's third bounded amendment — the gate-4 adversarial pass found this cell claiming a price at
`§1.5` item 3, where nothing is priced; `§1.5` item 3 states the segment-class resolution rule and names no
alternative | CROSS-REF]`).
`[P: §1, §12 · A18, §13 · A23; L: §1-ter, §1-bis · link/registry | CONTRACT]`

### §1.7 The tier is a PROPERTY, not a data structure

**`tier` is not a record kind.** *"Tier is not a data structure, it is a property"* (`P: §12 · A17`), so
**the store's data structures close at exactly five — `leaf` · `branch` · `anchor` · `link` · `registry`**
— and **the tier is carried as the child anchor's `tier` property** (`§1.2`; `P: §12 · A17` read with
`P: §14 · A27`). **There is NO sixth component, no `Tier` record type, and no tier node.**
**The domain, the rank and the lifetime are `§5.1`'s.**
`[P: §12 · A17, §14 · A27; L: §1-bis · tier | CONTRACT]`

---

## §2. `findAddress` and the walk — the shared resolver

### §2.1 The resolver's signature and return shape

**`findAddress(address, tier?) → NodeRef`.** **`findAddress` RETURNS A REFERENCE** (`P: §13 · A26`:
*"find address returns reference"*) — **a `NodeRef`, which is the store's own handle to a node and NOT a
copy of it.** **It is the ONE shared resolution function** (`P: §1`: *"Use a shared `findAddress`
function"*), and **`read`, `write`, `delete` and `watch` each reach their target through it and through no
second resolver.** **A `NodeRef` is a reference and not a value**: mutating through it mutates the store,
and **it is not addressable, not enumerable and not serializable** — its boundary crossing is parked
(`R: §17.1`; `[T: §2.1 names the REFERENCE the ruling requires and declares no boundary shape | CONTRACT]`).
**THE REFERENCE'S OWN DRIVABLE OBSERVABLE, STATED SO THE CLAUSE IS NOT READ AS UNCHECKED:** **the returned
`NodeRef` carries the anchor's OWN properties — `NodeRef.anchor.key` (the segment it is held at) and
`NodeRef.anchor.tier`** (`§1.2`'s `ChildAnchor`; `§0.4`'s spelling) — **and `findAddress(address, t)`
answers a reference whose `anchor.tier` is `t` in exactly the states `§5.4` (a) declares.** **THE CLAUSE'S
MUTATION HALF — *"mutating through it mutates the store"* — HAS NO DRIVE IN THIS UNIT'S SURFACE, because
the contract declares NO mutating API taking a `NodeRef`; it is carried as an `OWED` item with its owner and
its positive revisit condition at `§0.2 · O-1`, NOT dropped and NOT weakened.** (`[T: the reference
discipline's drivable half, stated at this contract's second bounded amendment | CONTRACT]`)

**THE EMPTY ADDRESS'S REFERENCE — THE STATE THE RESOLVER CANNOT ANSWER WITH AN ANCHOR'S OWN PROPERTIES, SO
THE REGISTER'S OWN RULE DECIDES IT** (`[T: the empty address's reference, stated at this contract's third
bounded amendment — the gate-4 adversarial pass's `H-9`/`S-4` found the state undeclared and a fabricated
anchor standing at it | CONTRACT]`): **`findAddress([], t)` — and every walk at the empty address, `L-0`'s
own state — resolves to the REGISTER, which HAS NO PARENT ANCHOR (`§1.6`), so NO ANCHOR OF A CALLER-NAMED KEY AND NO CALLER-PASSED TIER IS READ INTO THE RETURNED REFERENCE: the returned `NodeRef` is the store's
handle to the REGISTER itself, and its `anchor` carries the register's OWN identity marker — the register is
the walk's start and is reached by NO segment, so its reference carries the EMPTY segment marker, and its
`tier` member is the one `§1.6` item 3's no-parent-anchor rule leaves `§5.4` (a) unable to assert — and
NEVER the caller's `t`.** **A `tier` a caller passes with the empty address
is therefore NOT an observed property of the answer: it selects nothing, because `L-0` terminates before any
step consults a container for a tier (`§2.2`'s scope clause's own `L-0` exception), and the register carries
no tier of its own (`§1.6` item 3; `P: §13 · A23`).** **Consequence, stated so it cannot be read as a
fabricated anchor: `findAddress([], file)` and `findAddress([], temp)` answer the SAME reference — the
register's — and neither answer asserts a floor or a tier the register does not have.**

**⟶ AMENDED 2026-10-11 — THE BLOCK'S *"EMPTY segment marker"* SPELLED, SO THIS CLAUSE AND `§0.4`'s MARKER
CLAUSE READ THE SAME SPELLING** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence above stands byte-for-byte**;
`AM-11`; `§1.5` item 1; `DD-44`'s dated clause; `[T: the empty-address reference's key spelling and the
observable that carries its distinction | CONTRACT]`): **the block's *"EMPTY segment marker"* IS
`ChildAnchor.key = Segment::Key(String::new())` — the same value a reference reached by the LEGAL key `""`
carries (`§1.5` item 1) — so the register's own reference and a reference reached by that key COINCIDE in their
`anchor.key` value by declaration, and the register's own is distinguished by the `register_marker` member
ALONE: `findAddress([], t).anchor.register_marker == true` and
`findAddress([""], t).anchor.register_marker == false` in a store whose register holds a `""` key.** **The
block's own conclusions stand unmoved: the reference is the store's handle to the REGISTER, and NO anchor of a
caller-named key and NO caller-passed tier is read into it; and this clause re-declares no spelling — `§0.4`'s
marker clause is the ONE home of the marker's spelling and of the collision's declaration.**

**⟶ THE AS-BUILT REGISTER REFERENCE, RECORDED AT THIS PASS OF THE PROOFREADING GATE WITHOUT RE-DECIDING THE
CLAUSE ABOVE** (`[T: an audit finding's carriage, not a ruling and not a `DD` row; the clause above stands
exactly as filed and NO `src/**` byte is touched by this record | OBSERVATION]`): **the crate answers the
empty address with a reference whose `anchor` carries the EMPTY KEY MARKER and a tier that is the REGISTER'S
OWN standing spelling — and that standing spelling happens to BE `mem` (`Tier::Mem`), so
`findAddress([], mem).anchor.tier == Tier::Mem` holds.** **THE CLAUSE ABOVE IS SILENT ON `mem` AND ASSERTIVE
ON `file`/`temp`: it forbids reading a caller-passed `file` or `temp` into the reference, and the crate obeys
that — `findAddress([], file)` and `findAddress([], temp)` answer a reference whose tier is NOT the caller's
`t`.** **WHAT THE PASS RECORDS, STATED WITH BOTH SIDES: a citation that reads *"NEVER the caller's `t`"* as a
claim about EVERY `t` is contradicted by the register's own case at `mem` (`findAddress([], mem)`), and this
clause's `anchor.tier` is not asserted by any register row (`§5.4` (a) cannot reach a register with no parent
anchor, as the clause itself says).** **THE FINDING'S DISPOSITION IS THE CONTRACT AUTHOR'S AND THE
SPEC WRITER'S — this pass names it, cites it from both sides, and re-decides nothing** (the audit trail is
`archive/reviews/2026-10-11-U-STOREROOM-NATIVE-proofread.md`).

**Its failure is a THROWN `StoreError`** (`§8.3`), carrying a **closed status code** and a **generated
message naming the mismatch that blocked resolution** (`P: §11 · A14`; `DD-24(b)`).
**The walk's failure codes are exactly three: `AddressMalformed`, `AddressNotFound` and
`LeafHasNoDownstream`** (`§8.1`) — plus `OutOfDomainTier` when the tier argument is outside `§5.1`'s domain,
which fails before the walk begins.
`[P: §1, §11 · A14, §13 · A26; L: §1-bis · findAddress | CONTRACT]`

### §2.2 The walk, arm by arm

**The walk starts at the REGISTER** (`P: §1`) and **repeats, consuming exactly one segment per step, until
it terminates.** Let `a` be the address, `i` the index of the segment currently consumed, and `c` the
container currently held (the register at `i = 0`).

| Arm | The state it fires at | The answer |
| --- | --- | --- |
| **`L-0`** | **`a.length === 0`** | **the walk terminates immediately and resolves to the REGISTER** (`P: §13 · A25`) — **not** a sentinel, **not** a failure (`§1.5` item 4) |
| **`L-1`** | `a[i]` is outside the segment domain (`§1.5` item 1) | **fails `AddressMalformed`**, and **no further segment is consumed** |
| **`L-2`** | `c` holds a child anchor whose `key` equals `a[i]` **and**, when a tier argument is passed, whose `tier` is **one of the passed tiers** | **descends**: `c` becomes the node that anchor points to, `i` advances by `1` |
| **`L-INT-REG`** | `c` is the **register** and `a[i]` is an **integer** | **fails `AddressNotFound`** — the register holds no index semantics (`P: §13 · A23`) |
| **`L-3`** | `c` holds **no** anchor matching the key **and** the passed tier (or holds no anchor at that key at all) | **fails `AddressNotFound`**, and **the address's remaining segments are consumed by no further step** |
| **`L-TIER`** | `c` holds an anchor at key `a[i]` but **no** passed tier matches its tier | **fails `TierNotFound`** — distinct from `L-3`, because the key exists and the tier does not (`DD-12`) |
| **`L-4`** | `i` advances and the node now held is a **`leaf`** while `a.length - i > 0` | **fails `LeafHasNoDownstream`** — *"leaf nodes cannot have downstream anchors, thus the walk cannot continue and fails verbosely"* (`P: §1`) |
| **`L-5`** | `i === a.length` (the address is exhausted) | **succeeds**: the currently held anchored node **is the addressed target and is returned as its `NodeRef`** |

**THE TIER FILTER'S SCOPE — ONE CLAUSE, SO `L-TIER` IS NEVER READ AS ADDRESSED-STEP-ONLY:** **when the walk
IS passed a tier argument, the passed-tier filter is applied AT EVERY STEP OF THE WALK — at the ADDRESSED
step (`i = a.length − 1`) AND at every PASS-THROUGH step before it — and `L-TIER` therefore answers
`TierNotFound` at EVERY step at which the container holds an anchor whose `key` equals `a[i]` but whose
`tier` is in NO passed tier, whether or not that step is the addressed one; the only step at which the filter
has no subject is `L-0`'s empty address, where the register is reached before any segment is consumed**
(`[T: the scope clause, stated at this contract's third bounded amendment — the gate-4 adversarial pass's
`H-1`/`S-1` found the per-step wording readable as addressed-step-only, and this clause fixes the reading the
register row `P-SM-4`, the arms `L-2`/`L-3`/`L-TIER` and `§4.2` `R-4` all apply | CONTRACT]`).
**AND THE ONE THING THIS SCOPE CLAUSE IS **NOT** — SO `L-TIER` IS NOT READ INTO THE READ'S ASSEMBLY** (`[T:
the scope's second half, stated at this contract's FIFTH bounded amendment; see the dated reconciliation
below, and its priced home `DD-31` | CONTRACT]`): **the clause above governs THE WALK — the act that
consumes the caller's address, segment by segment, to resolve the node the caller named — and NOTHING ELSE.**
**THE READ'S ASSEMBLY IS A SECOND AND DIFFERENT ACT** (`§4.2`; `P: §1`: *"The descendant node values are read
in the same manner recursively"*), **and the passed set governs it in exactly one respect: WHICH VERSION EACH
ADDRESS ANSWERS.** **So two consequences, each stated here so no citation of this clause can carry them:**
**(i) the set is a SELECTOR, applied at every address the walk visits and at every address the assembly's
recursion reaches — `§2.3`'s rule, run per address, with the lowest-persistence member of the passed subset
answering where a key holds more than one passed tier** (`P: §13 · A24`: *"reading any node that matches one if
any tier is passed"*; `P: §14 · A28`; `P: §11 · A11`); **(ii) a step of the ASSEMBLY at which a key's container
holds an anchor but the set selects NO version for it CONTRIBUTES NO MEMBER to the assembled value — it is
OMITTED, and it is NOT `TierNotFound`, NOT an out-of-set substitution and NOT a fall-back to the
lowest-persistence arm** (`DD-31`'s omission half; `§4.2`'s assembly clause). **THE ONE STATE A READ CANNOT
REACH IS THEREFORE THE ADDRESS IT WAS NAMED** — an addressed node with no version in the passed set is
`L-TIER`'s `TierNotFound`, exactly as this clause says — **while a DESCENDANT the caller did not name cannot
make the read fail**: the set governs which version answers, never whether the read answers. **WHY THE TWO
ACTS DIFFER, STATED SO THE WALK'S PER-STEP FILTER IS NOT READ AS WEAKENED:** **the WALK's step must resolve
the node it will descend through, so a step that matches no passed tier MUST FAIL (`L-TIER`; the gate-4
adversarial pass's `H-1`/`S-1`, whose reading stands UNCHANGED here); the ASSEMBLY has no node to descend
through — it produces each member from the anchor it selects — so where it can select nothing it OMITS,
because answering `TierNotFound` for a member the caller never addressed would make the contract's own legal
states unreadable at the address that WAS named** (`A19`'s purge and `A27`'s monotonic clause admit a child
less persistent than its parent, `§5.6`'s `3 × 3` census makes it reachable, and `§4.2`'s `R-2` says *one
member per key*).
**⟶ RECONCILED 2026-10-11 — THE SCOPE OF THE PASSED-TIER FILTER, EXTENDED TO THE ASSEMBLY WITH ONE CLAUSE
AND NOW SPLIT INTO ITS TWO ACTS** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed text stands byte-for-byte above
and nothing is deleted**; the determination is the read's-assembly bounded pass, taken after
`docs/specs/storeroom-native-greens.md`'s `F-1` and carried at `DD-31`, dated `2026-10-11`). **THE AS-FILED
CELL READ:** *"when the walk IS passed a tier argument, the passed-tier filter is applied AT EVERY STEP OF THE
WALK — at the ADDRESSED step (`i = a.length − 1`) AND at every PASS-THROUGH step before it — and `L-TIER`
therefore answers `TierNotFound` at EVERY step at which the container holds an anchor whose `key` equals
`a[i]` but whose `tier` is in NO passed tier, whether or not that step is the addressed one; the only step at
which the filter has no subject is `L-0`'s empty address, where the register is reached before any segment is
consumed"*. **WHAT THE AS-FILED CELL LEFT OPEN, AND HOW THIS PASS CLOSES IT, ONE QUESTION AT A TIME:**
**(a) whether the set is applied AT EVERY STEP OF THE ASSEMBLY — the reading `§4.2`'s as-filed clause carried
— OR only in the selection of the version each address answers: THE LATTER, and the assembly's per-step
application is WITHDRAWN** (`§4.2`'s reconciliation; a descendant the set does not cover is OMITTED, never
`TierNotFound`); **(b) what the set's arity of ZERO means at an assembly step: the `0`-token set IS the
unqualified read — `§2.3`'s zero-tier arm runs at every address, `A28`'s lowest-persistence selection answers
at each of them, NOTHING is omitted and no address can fail on its tier** (the set's only arity-dependent
effect in the assembly, and the reason `A28` is not a fall-back but the arm itself); **(c) a descendant whose
own version is MORE persistent than its parent's: it is versioned exactly like every other address, so the
set selects it when its tier is in the set and OMITS it when it is not — its persistence relative to its
parent is no part of the selection** (`A27`'s monotone bound runs downward, on the anchor the parent's
container holds, and no clause reads it into a READ's selection at any step). **THE WALK HALF OF THE AS-FILED
CELL IS NOT MOVED: the per-step filter, the ADDRESSED step and the PASS-THROUGH steps and `L-TIER`'s answer
at each of them STAND UNCHANGED** — `H-1` answered a genuine STOP-GRADE finding, and `§3.2`'s closing clause,
`§4.2`'s `R-4`, `§2.3` and this clause now all state the SAME scope: **the set is applied at every step of
the WALK and at every step of the ASSEMBLY, and the two acts differ only in what a step with no in-set
version produces** (`[T: the reconciliation, with the as-filed form named and nothing deleted | CONTRACT]`).
**THE WALK NEVER THROWS ANY CODE OTHER THAN `L-1`/`L-3`/`L-TIER`/`L-4`'s four and the tier-domain failure
that precedes it** (`[T: the walk's fail-closure, every member with a trigger | CONTRACT]`). **The walk
never mutates the store**, and **it never installs anything on its way down**.
`[P: §1, §13 · A23 · A25 | CONTRACT]`

### §2.3 The tier argument at a step — the selection rule the walk runs on

**On each descent step the walk consults the container for `a[i]` and, when a tier argument is passed,
for that tier.** **The two arms the ruling fixes** (`P: §13 · A24`, `P: §14 · A28`):

- **ZERO tiers passed (`tier` absent, or an empty set — `§3.1`/`§4.1`):** **the walk selects the
  LOWEST-PERSISTENCE anchor at that key** (`P: §1`: *"it resolves the lowest-persistence anchor with that
  key"*; `P: §14 · A28`: *"Confirmed"*). **"Lowest persistence" and "lowest tier" are ONE predicate**, not
  two: *"a lower-tier one **IS** a lower persistence one because the tiers are defined by persistence"*
  (`P: §11 · A11`). **So the selection is by `rank` ascending, and `temp` (`rank 0`) is selected before
  `mem` (`rank 1`) before `file` (`rank 2`).**
- **ONE OR MORE tiers passed:** **the walk reads ANY node whose tier is ONE OF THE PASSED TIERS** (`P: §13
  · A24`: *"accepts zero to many tiers, reading any node that matches one if any tier is passed"*).
  **The set is an ANY-MATCH set: it is not a union of values, not an ordered preference and not a filter**
  (`R: §15.2`'s `O-5` row: *"the array form is thus neither a union nor a filter: it is an ANY-MATCH
  set"*). **When a key holds more than one passed tier, the walk applies the SAME lowest-persistence rule
  to the passed subset** — because the rule's ground is the one predicate, and no ruling gives a passed set
  an order of its own (`[P: §11 · A11 + §14 · A28 applied to the matched subset | DECLARED-DEFAULT]`,
  priced at `DD-12`'s neighbourhood; reversal point: a fresh ruling). **AND THE PASSED SET BINDS EVERY STEP
  OF THE WALK — NOT THE ADDRESSED STEP ALONE:** **at each step, the container is consulted for `a[i]` and
  for the passed tiers TOGETHER, exactly as `L-2` states them, so a pass-through step at which the key exists
  and no passed tier matches answers `L-TIER`'s `TierNotFound` — the scope clause of `§2.2` says so at the
  arm table and this clause repeats it for the selection rule** (`[T: the scope, restated at the selection
  rule so the two homes of `L-TIER` agree | CONTRACT]`).
- **No anchor at the key at all** → `L-3`'s `AddressNotFound`. **An anchor at the key but no passed tier
  matching — at ANY step of the walk —** → `L-TIER`'s `TierNotFound` (`DD-12`).

`[P: §1, §11 · A11, §13 · A24, §14 · A28; L: §1-bis · tier | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THE SELECTION RULE'S OWN SCOPE, STATED FOR BOTH ACTS** (`RCA-8(d)`
ANNOTATE-BESIDE: **the as-filed bullet above stands byte-for-byte and nothing is deleted**; the bounded
assembly-scope determination, dated and priced at `DD-31`). **THE AS-FILED SUBJECT OF THE BULLET THAT READS
*"AND THE PASSED SET BINDS EVERY STEP OF THE WALK — NOT THE ADDRESSED STEP ALONE"* WAS:** *"at each step, the
container is consulted for `a[i]` and for the passed tiers TOGETHER, exactly as `L-2` states them, so a
pass-through step at which the key exists and no passed tier matches answers `L-TIER`'s `TierNotFound`"*.
**THE OPERATIVE READING, PER ACT — the selection rule is ONE rule, and the acts it runs over are TWO:**
**(i) AT A WALK STEP** the container is consulted for `a[i]` and for the passed tiers together, exactly as the
as-filed bullet says — **the ADDRESSED step and every PASS-THROUGH step alike — and a step at which the key
exists and no passed tier matches answers `L-TIER`'s `TierNotFound`** (`§2.2`'s scope clause, whose walk half
this bullet states and whose per-step filter STANDS UNCHANGED). **(ii) AT AN ASSEMBLY STEP** the same rule
selects the version the member answers, with the lowest-persistence member of the passed subset answering
where a key holds more than one passed tier — **and a key for which the set selects NO version contributes NO
MEMBER: it is OMITTED, and the read does NOT answer `TierNotFound` and does NOT assemble an out-of-set
anchor** (`DD-31`; `§4.2`'s assembly clause and its reconciliation). **WHERE THE AS-FILED BULLET REACHED
FURTHER THAN THIS: it said *"a pass-through step"* while the read's assembly was already covered by `§4.2`'s
as-filed clause, so the two homes could be read as ONE walk and the assembly as one of its steps — this
clause separates them, and the separation is the whole of the determination.** **NOTHING ELSE MOVES: the
ZERO-TIER arm (`temp` before `mem` before `file`, by `rank` ascending) is untouched, the any-match reading of
the set is untouched, the lowest-persistence rule applied to the matched subset is untouched, and `L-3`'s
`AddressNotFound` at a key with no anchor at all is untouched** (`[T: the reconciliation, with the as-filed
form named and nothing deleted | CONTRACT]`).

---

## §3. The write verb

### §3.1 The write's signature, and the write's tier is REQUIRED and SINGULAR

**`write(address, tier, value) → WriteResult`.**

| Slot | Domain | Outside the domain |
| --- | --- | --- |
| `address` | `§1.5`'s segment array | `AddressMalformed` |
| `tier` | **EXACTLY ONE of the three tokens** — `file` \| `mem` \| `temp` (`P: §13 · A24`: *"Exactly one required on write"*) | **absent, an array of length `0`, an array of length `> 1`, an out-of-domain token, or a non-string** → `OutOfDomainTier` (an out-of-domain or wrongly-typed value) **or `AddressMalformed` (`tier` absent entirely: a required argument is missing)** — `§3.1.1` |
| **`value`** | `§1.4`'s admitted set | **`ValueNotAdmitted`** |

**THE ARRAY FORM IS AVAILABLE ON READ AND NOT ON WRITE** (`P: §13 · A24`): **a write whose tier argument is
an array fails**, even an array of length `1` — *"exactly one"* is read as **exactly one token**, and the
array spelling is a different arity (`[T: the write arity's closure | CONTRACT]`; the alternative —
accepting a length-`1` array — is priced below).

**§3.1.1 The arity table, printed as a closed census.** **The tier argument's arity is per-verb and the
domain is per-argument; both are closed.** Every cell below names what the store answers.

| The verb | `tier` absent | `tier` a single token | `tier` an array of `0` tokens | `tier` an array of `1` token | `tier` an array of `≥ 2` tokens | a token outside the domain | **`tier` `null` or `undefined`** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`read`** | **legal** — lowest persistence (`§2.3`) | **legal** | **legal** — read as the zero-tier arm (lowest persistence) | **legal** — an any-match set of one | **legal** — an any-match set | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`: the shape is not a tier value at all) |
| **`write`** | **`AddressMalformed`** (a required argument is missing) | **legal** | **`OutOfDomainTier`** | **`OutOfDomainTier`** (the array spelling is not the write's arity) | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-3`) |
| **`delete`** | **legal** — every tier at the target (`§4.3`) | **legal** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-4`) |
| **`findAddress`** | as `read` | as `read` | as `read` | as `read` | as `read` | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`) |
| **`watch`** | **legal** — the registration is address-keyed, not tier-keyed (`§6.5`) | **legal** — **and this tier is the registration's TIER QUALIFIER, whose effect on the returned list is stated at `§6.5` item 7** | **legal** — **a zero-token set is the same as `tier` absent: the registration is unqualified, and `§6.5` item 7 states its effect** | **legal** — **a one-token set is the same qualifier as the single token** | **legal** — **the set is the registration's qualifier set** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`) |
| **`readLiteral`** | as `read` — **and the form's own success shape is `§4.1`'s literal-only row** | as `read` | as `read` | as `read` | as `read` | **`OutOfDomainTier`** | **`AddressMalformed`** |
| **`storeCreate`** | — (no per-call tier) | — | — | — | — | — | — |

**THE `null`/`undefined` COLUMN, AND WHY EVERY VERB HAS ONE — the arity census's own closure** (`[T: the
column the `PAR` rows declare and the first amendment's table omitted | CONTRACT]`): **`PAR-2`/`PAR-3`/
`PAR-4` declare that `null` and `undefined` are OUTSIDE every `tier` argument's domain and that their
answer is `AddressMalformed` — *"the shape is not a tier value at all"*** — while **`§8.1` #1's trigger
column enumerates that trigger**. **The column above prints each verb's answer so the census and the `PAR`
rows agree cell by cell**: **`AddressMalformed` for every verb, on `read`/`write`/`delete`/`findAddress`/
`watch`/`readLiteral` alike — NOT `OutOfDomainTier`** (an out-of-domain token is a tier-shaped value
outside the domain; `null` is not a tier-shaped value at all). **`watch`'s zero-token set and its
single-token form are BOTH legal and BOTH are the registration's qualifier: a zero-token set is the
UNQUALIFIED registration** (`§6.5` item 7).

**THE TIER DOMAIN ITSELF IS `§5.1`'s:** **exactly three lowercase tokens — `file` · `mem` · `temp` — ranked
`file > mem > temp`** (`P: §1`: *"three tiers, ranked by their persistence in descending order: file, mem,
and temp"*). **There is NO FOURTH INBUILT TIER:** *"Secure will be a separate instance of this store that
is blocked on the node side from addressing less than `file`, not an inbuilt tier"* (`P: §9 · A4`), and
**an out-of-domain tier argument FAILS** — *"Fail on out-of-domain"* (`P: §14 · A29`) — with
**`OutOfDomainTier`**. **`secure`, `Secure`, `FILE`, `disk`, `session`, `""` and a non-string are
each OUTSIDE the domain, and each fails `OutOfDomainTier`** — **with the ONE exception the table's last
column prints: `null` and `undefined` are not tier-shaped values at all, so they fail
`AddressMalformed`** (`PAR-2`/`PAR-3`/`PAR-4`; `§8.1` #1) (`[P: §1, §9 · A4, §14 · A29 | CONTRACT]`).
`[P: §1, §13 · A24, §14 · A29; L: §1-bis · tier | CONTRACT]`

### §3.2 The write's two-stage resolution — the PARENT RULE, stated once

**The write FIRST attempts to resolve the address ONE LEVEL LOWER THAN THE TARGET — i.e. the TARGET'S
PARENT — unless the address is already `len == 0`, in which case the resolution is the REGISTER**
(`P: §1`: *"The write function first attempts to resolve the address one level lower than the target, i.e.
the target's parent, unless it is already len == 0 (resolving the register)"*).

**THE PARENT-RESOLUTION RULE, STATED ONCE AND IN ONE PLACE — the rule the arm table, the pair table, the
census and `P-TP-6`'s drive all agree with** (`[T: the single statement the amendment exists to make; its
terms are `A24`'s required write tier, `A27`'s anchor-carried tier and monotonic clause, `A11`'s one
predicate and `A18`'s register — no ruling is re-decided and no new one is taken | CONTRACT]`):

1. **Let `parent = address[0 .. address.length - 1]` (`address` without its last segment) and
   `key = address[address.length - 1]`.** **The write's target is the node at `parent ++ [key]`.**
2. **THE PARENT RESOLUTION IS TIER-AGNOSTIC: `findAddress(parent)` runs with NO TIER ARGUMENT — the
   walk's ZERO-TIER arm of `§2.3` — so the parent anchor it reaches is the LOWEST-PERSISTENCE anchor at
   `parent`'s last key, at whichever tier that anchor carries.** **This is the whole rule:** the parent is
   found *by address alone*, and **the tier the write was called with does not qualify the parent search**
   (`§2.3`'s zero-tier arm; `P: §11 · A11`'s one predicate; `P: §14 · A28`). **Its failure is the write's
   failure, the write installs nothing, and the code is the walk's own** (`§3.4` arm `F-3`; `DD-5`).
3. **THE WRITE'S OWN TIER DOES TWO THINGS AND ONLY TWO:** **it is the tier the write's OWN CHILD ANCHOR
   IS MINTED AT** (`P: §13 · A24`: *"Exactly one required on write"*; `P: §14 · A27`: the tier is carried
   by anchors; `§5.4` (a), `DD-10`), **and it fixes the PURGE SCOPE — every version of the addressed node
   at `rank ≤ rank(write tier)` is removed** (`P: §12 · A19`; `§5.4` arms `W-1`/`W-6`). **It does NOT
   qualify the parent resolution** (item 2).
4. **THE MONOTONIC CLAUSE IS THEN EVALUATED ON THE TWO ANCHORS — `§1.2`'s own carrier rule — and the
   write FAILS `ParentAnchorMonotonicityViolation` iff `rank(write tier) > rank(parent anchor's tier)`;
   it installs nothing and appends nothing** (`§3.4` arm `F-6`; `P: §14 · A27`: *"a child anchor may not be
   more persistent than its parent"*; `§8.1` #6). **So a write at tier `t` succeeds at a nested address
   exactly when `t` is the parent anchor's tier or a LOWER-persistence one** — *"lower tier" and "lower
   persistence" being ONE predicate* (`P: §11 · A11`) — **and the child can differ from its parent, which
   is what makes `F-6` REACHABLE and `P-TP-6` failable.** **The REGISTER IS THE EXCEPTION AND IS NOT AN
   ANCHOR-QUALIFIED LINK: it has no parent anchor, so it imposes NO upper bound and any of the three tiers
   may stand at a register key** (`§1.2`, `§1.6`) — **so this clause constrains only writes whose resolved
   parent is a `branch` reached through an anchor.**
5. **If the parent resolution succeeds and the monotonic clause holds, the write checks whether the
   resolved node is a `leaf` or a `branch`.**
   - **If the resolved PARENT is a `leaf`:** **the write CANNOT BEGIN, because a leaf holds a value and
     not a link — it fails `WriteParentNotLink`, for EVERY value class, literal or structured** (`§3.4`
     arm `F-5`; `§8.1` #9). *(`W-2`'s re-mint is the TARGET's arm, not the parent's: see `§3.4`'s
     disambiguation.)*
   - **If the resolved PARENT is a `branch`:** the write adds to / replaces within its container (`§3.4`
     arms `W-1`, `W-3`, `W-4`, `W-5`, `W-6`).
6. **`len == 0` target:** the write's target IS the register — **the write resolves the address one level
   lower, and there is no level lower than the register** — **so `write([], tier, v)` has no `key` to
   install under and FAILS `WriteParentNotLink`** (the register is a link and can hold children; a write
   with no last segment has no key). **`[T: the empty-address write's closure | CONTRACT]`**; the
   alternative — minting a nameless root — is priced below.

**AND THE ONE PLACE THE TIER-QUALIFIED PARENT SEARCH STILL APPLIES, STATED SO IT IS NOT MISTAKEN FOR THE
PARENT RULE:** **the READ, the `delete` and `findAddress` run the tier-qualified walk of `§2.3` when their
caller passes tiers — the resolution rule is PER-CALLER and only the WRITE's parent search is
tier-agnostic** (`§2.3`, `§4.1`, `§4.3`; `[T | CONTRACT]`). **A walk that IS passed a tier argument applies
the passed-tier filter AT EVERY STEP IT TAKES and answers `L-TIER`'s `TierNotFound` AT EVERY STEP — the
addressed step and every pass-through step alike — at which the key exists but no passed tier matches it**
(`§2.2`'s scope clause, whose rule this sentence states for the whole tier-qualified surface) — so
**`TierNotFound` remains reachable through every tier-qualified caller and through `L-TIER`'s own arm at
every step, and the write's parent stage is the one stage that no longer reaches it** (`§8.1` #4).
`[P: §1 (the write's parent-resolution clause), §11 · A11, §13 · A24, §14 · A27 · A28 | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — WHERE THE TIER-QUALIFIED WALK ENDS** (`RCA-8(d)` ANNOTATE-BESIDE: **the closing
clause above stands byte-for-byte and nothing is deleted**; the bounded assembly-scope determination, carried
at `DD-31`). **THE AS-FILED CLAUSE'S SUBJECT WAS THE WHOLE TIER-QUALIFIED SURFACE:** *"the READ, the `delete`
and `findAddress` run the tier-qualified walk of `§2.3` when their caller passes tiers — the resolution rule
is PER-CALLER and only the WRITE's parent search is tier-agnostic"*, with *"a walk that IS passed a tier
argument applies the passed-tier filter AT EVERY STEP IT TAKES and answers `L-TIER`'s `TierNotFound` AT EVERY
STEP"*. **THE OPERATIVE READING, WITH ITS BOUNDARY:** **the clause's scope is the WALK — the act each of the
three verbs runs to resolve the address its caller named — and it is NOT the READ's ASSEMBLY:** the read's
assembled subtree applies `§2.3`'s rule to EACH ADDRESS it reaches, so **`TierNotFound` remains reachable
through every tier-qualified caller, at `L-TIER`'s own arm and at every WALK step, exactly as the as-filed
clause says — while a MEMBER a passed set does not cover is OMITTED rather than refused** (`§2.2`'s scope
clause and its reconciliation; `§4.2`'s assembly clause and its reconciliation; `DD-31`). **So the
sentence *"the write's parent stage is the one stage that no longer reaches it"* is unweakened, and one
second reading is withdrawn: the read's assembly was never a stage of that walk.**
`[T: the boundary of the tier-qualified surface, with the as-filed form named and nothing deleted | CONTRACT]`

### §3.3 The write's install stage — what a successful write leaves

**On a successful install, in every arm:**

1. **the new node — or the new branch-tree, recursively — is added to the child links of the
   address-resolved node found in §3.2, UNLESS the resolved node was a leaf** (`P: §1`);
2. **if a node already stands under that key/index on the address-resolved node, it is OVERWRITTEN**
   (`P: §1`);
3. **"overwritten" means exactly one of two things, and which one is decided by the tier comparison of
   `§5.4`** (`P: §1`; `P: §12 · A19`): **the existing version is either LITERALLY REMOVED AND REPLACED (this
   cascades to all downstream nodes), or ADDED ALONGSIDE so it shadows on read**;
4. **the write's tier lands on the minted child anchors** (`DD-10`), and **every descendant branch's anchor
   carries the same tier**;
5. **the write's journal entry is appended** (`§6.1`) and **the new anchors are added to the store's
   `(key, tier)` pair set at their link** (`P: §15 · A34`).

**AND THE RETURN, STATED BEFORE THE ARMS BECAUSE EVERY ARM RETURNS IT:** **a successful write returns the
journal op it produced** — *"A write passes back the journal op that it produced so that node can instruct
the rollback if needed"* (`P: §9 · A7`) — **and the list of watched addresses** — *"Also track the event
listeners and pass a list of watched addresses that should be called after a successful write"* (`P: §9 ·
A7`). **The record is `§3.6`'s.**
`[P: §1, §9 · A7, §15 · A34 | CONTRACT]`

### §3.4 The write arms — a closed table

**Every write falls into exactly one arm.** **`W-1`…`W-6` are the success arms; `F-1`…`F-6` are the
fail-closed arms, and each fail-closed arm installs NOTHING.** **The target's parent is the node resolved in
`§3.2`.** **`rank` is `§5.1`'s.** **`F-1`…`F-6` ARE EXHAUSTIVE OVER THE FAIL-CLOSED STATES: there is no
`F-7`, and the table below is TOTAL over every write whose `address`, `tier` and `value` are each in its
declared domain.**

| Arm | The pre-state it fires at | What the write does | The code it fails with |
| --- | --- | --- | --- |
| **`W-1`** | the parent is a `branch` (or the register), and the parent's container holds an anchor at `key` **at the write's own tier**, **and holds NO anchor at `key` at a LESS persistent tier than the write's tier** | **PURGE THE PAIR, THEN MINT:** the old anchor and its whole downstream subtree are **removed**, and the new node is minted in their place at the same pair. **The version count at that key does not grow** (`P: §15 · A34`; `DD-8`, `DD-11`) | — |
| **`W-2`** | **the TARGET — `parent ++ [key]`, resolved at whichever tier `§2.3`'s zero-tier arm selects — is a `leaf`, WHATEVER TIER THE LEAF'S ANCHOR CARRIES** (the state is the leaf's, and **no tier carves it out**: `P: §13 · A21`'s words name none)**,** and the value is an **object or array** | **RE-MINT:** the leaf's pointing anchor is **destroyed WHATEVER TIER IT CARRIES**, a **new anchor is placed on the SAME link** at **the write's own tier**, and the new `branch`-tree is minted below it (`P: §13 · A21`; `§1.1`). **The pair set at that key changes by the DESTROYED pair's removal and by the write's own pair's minting or replacement, so the count does NOT grow** | — |
| **`W-3`** | the parent is a `branch`/the register, the parent's container holds **no** anchor at `key`, and the value is a **literal** (`string`/`boolean`/number) | **MINT A LEAF** and its child anchor at the write's tier (`P: §1`) | — |
| **`W-4`** | the parent is a `branch`/the register, the parent's container holds **no** anchor at `key`, the value is an **object/array**, and the container's existing kind **matches** the value's kind (or the container is empty **AT THAT SLOT**, `DD-1`) | **MINT A BRANCH-TREE RECURSIVELY:** *"turning any key/index that is a literal into a leaf node and turning objects/arrays into branches until all keys have been mapped"* (`P: §1`) | — |
| **`W-5`** | the parent's container holds an anchor at `key` at a tier **more persistent** than the write's tier, **no** anchor at the write's tier, **and the write is NOT a re-mint — `W-2`'s pre-state does not hold beside it: the more persistent version is a `branch` (whatever the value's class), or it is a `leaf` and the value is a LITERAL (a leaf is re-minted only when the value is an object or an array — `W-2`, `§1.1`)** | **SHADOW:** the new version is **ADDED ALONGSIDE** the more persistent one, which **survives**; the shadow **wins the unqualified read** (`P: §1`; `P: §11 · A11`; `P: §12 · A19`). **The survivor keeps its ANCHOR AND ITS PAIR, and the pair set at that key GROWS BY ONE** | — |
| **`W-6`** | the parent's container holds an anchor at `key` at a tier **less persistent** than the write's tier — **whether or not an anchor also stands at the write's own tier** | **PURGE THE LOWER VERSIONS, THEN MINT:** **every version of the addressed node for which `rank(v) ≤ rank(write tier)` is removed** — *"Purge is the write deleting any versions of the addressed node with the same or less persistence"* (`P: §12 · A19`) — the whole downstream subtree of each removed version going with it, and the new node is minted at the write's tier | — |
| **`F-1`** | **`tier` is ABSENT (`TierArg::Absent`)** — *and only that: in Rust a missing `address` or `value` argument is a COMPILE error and not a runtime arm, so the reachable half of this arm is the absent tier alone* (`§0.4`'s spelling clause) | **nothing is installed**; no journal entry is appended | **`AddressMalformed`** |
| **`F-2`** | the value is outside `§1.4`'s admitted set | nothing is installed | **`ValueNotAdmitted`** |
| **`F-3`** | the target's parent resolution fails (`§3.2` item 2: `§2.2`'s `L-1`/`L-3`/`L-4` — and `L-TIER`'s `TierNotFound` only where a passed tier qualifies the walk, which the write's parent stage does NOT do) | nothing is installed, **including below the failing segment** (`DD-5`) | the walk's own code |
| **`F-4`** | the parent's existing container kind **contradicts** the value's kind (a `vec` target receiving an object, or a `hashmap` target receiving an array) — **OR the write's LAST segment's CLASS contradicts the parent container's KEY DOMAIN (a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP`)** | nothing is installed; **the container, the node and the journal are untouched** (`P: §13 · A22`; `DD-19`) | **`ContainerKindConflict`** |
| **`F-5`** | **the PARENT resolved by `§3.2` is a `leaf`, WHATEVER THE VALUE IS — literal or structured**: a leaf holds a value and not a link, so no child anchor can be installed there | nothing is installed | **`WriteParentNotLink`** |
| **`F-6`** | the write's tier would make the minted child anchor **outrank the parent anchor's tier** (`rank(write tier) > rank(parent anchor.tier)`) — **the parent anchor being the one `§3.2` item 2 resolved, and `§1.2`'s monotonic clause being stated over exactly those two anchors** | nothing is installed; no journal entry is appended | **`ParentAnchorMonotonicityViolation`** |

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the write's closed arm table is `12` arms = `6` success arms +
`6` fail-closed arms (`6 + 6 = 12`)** (`[T: the arm table's own census | CENSUS]`).
**`F-4` and `F-6` are the two arms `A22` and `A27` name directly**; **`F-6` is the arm that makes the
monotonic clause falsifiable** (`P-TP-6`) — **and it is REACHABLE exactly because `§3.2`'s parent
resolution is tier-agnostic: a child CAN differ in tier from its parent** (`§3.2` items 2 and 4).
**`W-2` vs `F-5`, distinguished so they are not conflated:** **`W-2` fires when the TARGET's own last
segment is at issue** — the target node is a leaf **WHATEVER TIER ITS ANCHOR CARRIES — the write's own tier
is no part of this arm's pre-state** — and the write's value is structured, so the *target* is re-minted. **`F-5` fires when the resolved PARENT is a leaf while the target
segment is a child the parent cannot hold** — **the write cannot even begin, whatever the value's class
is**, because a leaf *"cannot have downstream anchors"* (`P: §1`). **A literal write whose parent is a
leaf is therefore `F-5` and NOT armless: the table is total** (`§3.2` item 5).
**`W-2` vs `W-3` vs `W-5`, distinguished — ONE RULE, WITH NO TIER CARVE-OUT:** when the target resolves to a
**`leaf`** and the value is **structured** (an object or an array), **`W-2` is the arm WHATEVER TIER THE
LEAF'S ANCHOR CARRIES** — the re-mint, not `W-3` (which needs no anchor at the key) and **not `W-5`**, which
is the SHADOW arm **reserved to a target that is NOT the leaf this write re-mints**. **A leaf at a
HIGHER-persistence tier than the write's is therefore `W-2` and NOT `W-5`: the leaf's anchor does NOT
survive, the destroyed anchor's tier does not survive onto the new one, and the write's own tier is the new
anchor's tier** (`§1.1`; `P: §13 · A21`'s *"destroy and replace with a new anchor on the same link"*, which
carries no tier carve-out, read with `P: §11 · A13`'s two node kinds and `P: §15 · A34`'s one-anchor-per-pair
rule — **so a leaf at a MORE persistent tier than the write's is re-minted and does not stand beside the new
version, while a `branch` at that tier does**).
**AND THE PLACES TWO SUCCESS ARMS' PRE-STATES HOLD AT ONCE, DESIGNATED SO THE EFFECT STAYS
SINGLE-VALUED** (`[T: the designation; it closes the overlap the exclusivity clause's earlier wording left
open, it takes the reading `§3.5` item 4 and `§5.4`'s chain already force, and its three further overlaps
are named at this contract's bounded RECONCILIATION pass | CONTRACT]`): **when a key
holds a version at the write's own tier AND a version at a LESS persistent tier, both `W-1`'s and `W-6`'s
pre-states hold** — **the write IS `W-6` BY DESIGNATION, and its effect is `W-6`'s: every version at
`rank ≤ rank(write tier)` is removed** — **which subsumes `W-1`'s replacement, and is the only effect
`§3.5` item 4 and `§5.4`'s purge chain permit.** **AND THE THREE OVERLAPS `W-2`'S WIDENED PRE-STATE PUTS
BESIDE IT, EACH ONE EFFECT AND EACH SPOKEN FOR BY A NAMED ARM — NO DESIGNATION IS NEEDED FOR ANY OF THEM
AND NONE IS INVENTED:** **(i) `W-1`+`W-2`** — a leaf at the write's OWN tier with a structured value:
`W-1`'s *purge the pair, then mint* and `W-2`'s *destroy the anchor, then place a new one on the same link*
are **ONE effect at ONE pair** (the destroyed anchor's pair IS the write's pair), and **the arm the state is
named by is `W-2`**, the re-mint (`§1.1`). **(ii) `W-2`+`W-6`** — the leaf the zero-tier arm selects stands
at a LESS persistent tier than the write's: `W-2` destroys that leaf's anchor and `W-6` purges every version
at `rank ≤ rank(write tier)`, a set that CONTAINS that pair — **the same pair leaves and the same new node
arrives under either row**, so the effect is `W-6`'s and equals `W-2`'s. **(iii) `W-5`+`W-6`** — a key
holding versions at BOTH sides of the write's tier and none at the write's own: **`W-6`'s row removes no
version at `rank > rank(write tier)`**, so its purge and `W-5`'s surviving version are **ONE effect**, and
the pair set and the value are single-valued. **So the success arms are EXCLUSIVE BY EFFECT, with `W-6`
designated for the first pre-state, ONE NAMED ARM for each of the three overlaps above, and a carve-out that
survives ONLY AS THE ARM `W-5` ITSELF** (`§5.4` (b)), and **no write's observable outcome is ambiguous.**

**AND `F-4`'S PREDICATE MEASURED AGAINST THE TARGET SLOT — THE READING THE KIND RULE OPERATES ON, STATED
ONCE SO NO WRITE FALLS BETWEEN `F-4` AND `W-4`** (`[T: the operative reading of the kind rule's scope, taken
at this contract's third bounded amendment so the parent-vs-target ambiguity is closed rather than carried;
each arm's own cell states it and no arm is invented | CONTRACT]`): **the KIND the write's value must match
is the kind of the TARGET SLOT — the value standing at the key the write installs under — and NOT a
sibling's or the container's other members'.** **CONSEQUENCES, EACH DRIVABLE:** **(i) where the parent's
container holds NO anchor at `key`, NO KIND TEST HAS A SUBJECT: the write's own value decides the container's
kind at that slot, so a write of `{}` followed by a write of `[1]` at a DIFFERENT key of the same parent
container is `W-4` and succeeds** — **the two writes land at two slots, and a `MAP` holding one key does not
refuse an array at another key, because a container's KIND is per-slot for these arms**; **(ii) where the
parent's container DOES hold an anchor at `key`, the value standing there decides, and a contradicting
write is `F-4`'s** (`W-1`/`W-5`/`W-6`'s pre-states and the `F-4`-vs-`W-6` designation above) — **so
`write(['m'], mem, {})` followed by `write(['m','k'], mem, [1])` is ADMITTED, and the contradicting case is
the one where `['m','k']` already holds a value the write's kind contradicts** (`§1.3`'s kind rule read with
`DD-1`'s empty-container clause; `§3.4` arms `W-4`/`F-4`). **THE OTHER READING — the whole container's kind
refusing a value at a fresh slot — is REFUSED by these arms:** **it would make a container's first-written
kind govern every later slot and would refuse writes `W-4`'s own cell admits.**

**AND THE `F-4`-vs-`W-6` OVERLAP, DESIGNATED — THE ONE FAIL ARM A SUCCESS ARM'S PRE-STATE CAN ALSO HOLD**
(`[T: the designation, taken at this contract's third bounded amendment so the TestWriter's `NG-8` can be
authored; the gate-4 adversarial pass's `S-7` found this overlap undesignated | CONTRACT]`): **a write whose
VALUE's kind contradicts the parent container's kind, or whose LAST SEGMENT's class contradicts the parent
container's key domain (`§1.3`), has the pre-state `F-4` fires at — and where that same key ALSO holds an
anchor at a tier LESS persistent than the write's, `W-6`'s pre-state holds BESIDE `F-4`'s.  THE WRITE IS
`F-4` BY DESIGNATION, AND THE DESIGNATION IS UNCONDITIONAL:** **the kind contradiction is evaluated BEFORE
any pair-set mutation, so `F-4` subsumes every success arm whose pre-state the write's key and tier also
satisfy — `W-1`, `W-4`, `W-5` and `W-6` alike — and the effect is `F-4`'s own: NOTHING IS INSTALLED, no
version is purged, no anchor is destroyed or minted, the container's kind does not change, and NO JOURNAL
ENTRY IS APPENDED** (`§3.4`'s fail-closed arms' one guarantee; `§3.5`; `DD-19`). **The observable is
therefore single-valued: `write(['a'], mem, {})` followed by `write(['a'], file, [1])` — or by any write
whose segment class or value kind the container contradicts — answers `ContainerKindConflict`, leaves the
`mem` version standing whole, and grows the pair set by NOTHING.** **This designation decides no ruling: it
states which arm already governs, so that the `F-4` arm's totality and the success arms' exclusivity hold
at once** (`§3.4`'s totality clause; `P: §13 · A22`).

**⟶ RECONCILED 2026-10-11 — THE ONE RULE `§1.1`'S RE-MINT CLAUSE AND THIS TABLE'S `W-5` ROW NOW SHARE (this contract held BOTH readings for the same inputs, and now holds ONE).** **THE AS-FILED CELLS READ:** **`§1.1`** — *"a write whose target resolves to a **leaf** and whose value is an object or an array destroys that leaf's **pointing anchor** … the destroyed anchor's tier does not survive onto the new one"*, stated **UNCONDITIONALLY**; and **this table's `W-5` row, read with this section's `W-2`/`W-5` disambiguation sentence** — *"when the target is a leaf at a HIGHER-persistence tier than the write's, `W-5` is the arm (the leaf's anchor survives and the new version shadows it)"* — which gave **the SAME inputs two opposite observables**: the destroyed anchor's pair gone (the leaf's anchor destroyed) against the leaf's anchor standing BESIDE the new version. **THE OPERATIVE READING, AND THE RULING IT RESTS ON: `P: §13 · A21` — *"destroy and replace with a new anchor on the same link"* — IS READ UNCONDITIONALLY, because the ruling's own words name no tier and no persistence, and the ruling's own transcription names the residual it answered as *"the fate of the anchor a branch overwrites when a write re-mints a leaf"*.** **So `W-2` is the arm for EVERY leaf target a structured value re-mints, WHATEVER TIER that leaf's anchor carries, and `W-5` is the SHADOW arm for the states `W-2` does not reach** — **`P: §11 · A13`'s two node kinds** (the node the destroyed anchor pointed to ceases to exist, so that anchor cannot survive it) **and `P: §15 · A34`** (at most one child anchor per `(key, tier)`, so the new anchor stands at the WRITE's pair and the old one is never re-tiered) **being the two rulings that make the replacement singular.** **`A11` IS NOT WEAKENED AND IS NOT RE-DECIDED:** *"lower tier"* IS *"lower persistence"* remains ONE predicate, and it is the predicate the SHADOW arm's survival and the read's selection are stated over. **NO `DECLARED-DEFAULT` ROW IS ADDED, AND NONE IS NEEDED** (`§0.2`): **the tier carve-out the as-filed `W-5` prose carried is not an alternative `A21` leaves open to be priced — it is the reading this reconciliation resolves AGAINST, so no question is put to the architect and no residual is parked** — **and the carve-out that SURVIVES is the SHADOW arm itself, reserved to the states `W-2` does not reach, WITH ITS OWN OBSERVABLE IN THE TABLE ABOVE (the survivor keeps its ANCHOR and its PAIR, and the pair set at that key grows by one): an ARM, never a silent exception.** **THE ALTERNATIVE IS PRICED ANYWAY, SO THE CHOICE IS NOT SILENT:** **restoring the tier carve-out would leave a destroyed leaf's anchor standing beside the write's own version — which `A21`'s words do not authorize (*"the leaf's pointing anchor is DESTROYED and a NEW ANCHOR is placed on the SAME LINK"*), it would make a structured write and a literal write at one key observably identical in their survivor set, and it would give `A34`'s pair set a version whose anchor `A21` ordered destroyed** — **so the alternative is available only against a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment** (`P: §10 · A8`). **THE TABLE STAYS TOTAL AND THE SUCCESS ARMS STAY EXCLUSIVE BY EFFECT, AND THIS SECTION'S CENSUS IS UNMOVED:** **`W-5` remains an arm** (`W-2`'s widened pre-state excludes exactly ONE state from it), so **the write's closed arm table is still `12` arms = `6` success arms + `6` fail-closed arms (`6 + 6 = 12`) ✓**, and **the overlaps `W-2`'s widened pre-state creates are each ONE EFFECT under the designation clause above, so no write's observable outcome is ambiguous and no arm is counted twice.** **AND THE CELLS THIS ONE RULE MOVES, ENUMERATED AS A REQUIREMENT LIST AND CHECKED OFF — ✓ EVERY ONE, AND NO RE-SPELLING IS INFERRED FROM A BYTE DIFF:** **(1) ✓** `§1.1`'s re-mint arm clause — its unconditional words stand and it gains *"WHATEVER TIER THE DESTROYED ANCHOR CARRIED"*; **(2) ✓** this table's `W-2` row — the tier condition on the leaf's anchor is struck and its pair-count effect stated; **(3) ✓** this table's `W-5` row — the re-mint state is excluded from its pre-state and its observable is stated; **(4) ✓** this section's `W-2`/`W-3`/`W-5` disambiguation prose — now ONE rule with no carve-out; **(5) ✓** this section's designation clause — the three overlaps named; **(6) ✓** `§3.5` item 2 — its pair-set cell gains `W-2`; **(7) ✓** `§5.3` item 4 — the shadow rule carries the re-mint's one exception; **(8) ✓** `§5.4` (b) — its pair-count cell gains `W-2` and its overlap list the three names; **(9) ✓** `§5.4` (c) and that row's failure list — the survival half's scope and the *"a write that removes a HIGHER persistence version"* failure each name the re-mint's own destruction; **(10) ✓** `§5.4`'s purge-chain table — its note, so the chain is read as the PURGE's own table and never as the re-mint's.** **AND NO OTHER CELL MOVES:** **the arm ids, this section's arm census (`12 = 6 + 6`), the register's row count and its ids, the closed fail-code set's membership and count, the `derivation:` clause and the part map stand as filed** — **and the two `DD` rows that name an arm (`DD-8`, `DD-11`) are EXAMINED AND UNMOVED: both lean on the SAME-TIER arm `W-1`, whose effect this rule does not touch, and neither leans on the tier carve-out resolved here.** **THE CITATION RE-SPELLINGS THE SPLIT OF THIS SECTION REQUIRES, EACH CHECKED OFF (a relocation re-spells a citation and never re-derives it, `docs/specs/spec-scope-and-structure/contract.md` §C.11.9):** **(a) ✓** the pointer this clause and its cell list carry to `§1.1`'s re-mint arm clause is spelled bare — *"`§1.1`'s re-mint arm clause"* — in `docs/specs/storeroom-native/contract.md`'s `§3.4`, and by its home's path — *"`docs/specs/storeroom-native/store-model.md §1.1`'s re-mint arm clause"* — in this section's carrier copy at `docs/specs/storeroom-native/write-and-read.md`, because the record shapes' relocated span is that part's; **(b) ✓** the reverse pointer — this reconciliation clause is cited from `store-model.md`'s `§1.1` as *"`docs/specs/storeroom-native/write-and-read.md §3.4`'s reconciliation clause"* and from `contract.md`'s `§1.1` as *"`§3.4`'s reconciliation clause"*; **(c) ✓** the arm citation this section and `§1.1` use (*"`§5.4` arm `W-2`"*) is UNMOVED and its home is stated — the arm rows' TABLE is `§3.4`'s, and every other `§5.4`-spelled arm citation in this directory names THAT SAME TABLE through the register row's section, so the idiom resolves from either end and no second arm set is meant; **(d) ✓** every other `§`-number this clause names is this document's own and is spelled bare here — the `DD` table's `§0.2` and this section's own `§3.4`/`§3.5` included; the carrier's copy names that one row as `contract.md §0.2`.**
`[P: §10 · A8, §11 · A11 · A13, §13 · A21, §15 · A34; T: the reconciliation of `§1.1`'s re-mint clause with this section's `W-5` row to ONE rule, taken at this contract's bounded RECONCILIATION pass | CONTRACT]`
`[P: §1, §11 · A11, §13 · A21 · A22, §15 · A34 | CONTRACT]`

### §3.5 The write's post-conditions, and what a failed write guarantees

**A SUCCESSFUL WRITE GUARANTEES, in this order** (`[T: the write's post-condition set | CONTRACT]`):

1. **the install of `§3.3` completed, and the pre-write state is recorded in the journal entry of `§6.1`;
2. **the pair set at the addressed link changed exactly as its arm says** (`W-1`/`W-6` removed; **`W-2` the
   destroyed pair removed and the write's own pair minted or replaced — the count does not grow**; `W-5` grew
   by one; `W-3`/`W-4` grew by one);
3. **the return value carries the op (`§6.2`) and the watched-address list (`§6.5`)**;
4. **no read performed after the write can observe a version at a tier `≤ rank(write tier)` at the
   addressed node other than the one this write installed** — this is `A19`'s purge, stated as an
   observable.

**A FAILED WRITE GUARANTEES** (`[T: the fail-closed arms' residue | CONTRACT]`): **no node was minted, no
anchor was destroyed, no version was removed, no container's kind changed, and NO JOURNAL ENTRY WAS
APPENDED.** **The store's observable state after a failed write is byte-identical to its state before it**
— `DD-4`, `DD-19`; this is the isolation half of `U-28`'s residual and it is `P-TP-9`'s check.
`[T: §3.5's two post-condition blocks; P: §8 ("preserving the original data in case of failure") | CONTRACT]`

### §3.6 The write's return shape — `WriteResult`

**`WriteResult` is a record with exactly two members:**

```
WriteResult {
  op:       JournalOp,             // §6.2 — the op the write produced; ALWAYS present on success
  watched:  Address[]              // §6.5 — the watched ADDRESSES whose callbacks the host should invoke.
                                   //   AN ADDRESS IS A SEGMENT LIST (§1.5), NOT A STRING: the Rust
                                   //   spelling is `Vec<Vec<Segment>>` (§0.4). ALWAYS a list, possibly
                                   //   EMPTY, never absent and never null.
}
```

**`watched` is ALWAYS an array** — it is `[]` when nothing is watched in the write's scope, and **it is
never `undefined`** (`[T: the return shape's closed member set | CONTRACT]`). **AND `watched`'s MEMBERS ARE
ADDRESSES AND NOT STRINGS — the type the list carries, settled so `§5.8`/`§6.5` and this member agree:** a
watched address is **a SEGMENT LIST** (`§1.5`: *"an address is a JS/JSON ARRAY OF SEGMENTS"*), so **the
member is an `Address` and NOT a `string`** — **a `string[]` could carry neither the EMPTY address nor an
integer INDEX segment, both of which are legal watched addresses** (`§1.5` items 1 and 4; `P-TP-8`: *"the
set of registered watched ADDRESSES"*; `§6.5` item 3: a PREFIX relation over addresses). **The Rust
spelling is `Vec<Vec<Segment>>`** (`§0.4`) (`[T: the member's type, corrected at this contract's second
bounded amendment | CONTRACT]`). **`op` is ALWAYS present on a
successful write and is never absent** — `A37`'s *"Op must store enough data to reconstruct the original
tree and resolve the current state, and be id'ed for rollback"* (`P: §15 · A37`) is a duty about **content**,
and its **concrete record shape is this contract's to state** (`R: §17.3`: *"its concrete RECORD SHAPE
stays the CONTRACT's to state"*) — the shape is `§6.2`'s, declared as `DD-22`.
**A failed write returns nothing: it throws the `StoreError` of `§8.3`, so `WriteResult` exists only on the
success path** (`DD-24(b)`).
`[P: §9 · A7, §15 · A37; R: §17.3 | CONTRACT]`

**THE RELOCATED VERB SURFACE AND ITS ARMS LIVE AT `docs/specs/storeroom-native/write-and-read.md`** — the
`write-and-read` **`carrier`** part, which carries **this `§3`, `§4` and `§6` whole**, with every
`§`-number, every authority citation and every rule's text unchanged. **A citation to a relocated section
names its path** (`docs/specs/storeroom-native/write-and-read.md §3.4`, etc.), because *a bare `§n` across
documents is not an edge* (`contract.md §0.1` item 10(a), which states the cross-document citation form;
`[T | CROSS-REF]`).
**The `seams-and-lifecycle` part carries `§7`–`§8` + the parks; `store-model` carries `§1`–`§2`; the
`parameter-semantics` part carries `§9` + its `PAR-n` rows; the `implementation-plan` part carries the plan.**

---

## §4. The read verb and the delete verb

### §4.1 The read's signature — tier OPTIONAL, accepting ZERO TO MANY

**`read(address, tier?) → StoreValue`.** **On read the tier argument is OPTIONAL and accepts ZERO TO MANY
tiers, and a read with tiers passed answers a node whose tier is ONE OF THEM** (`P: §13 · A24`:
*"Optional on read, accepts zero to many tiers, reading any node that matches one if any tier is passed"*).
**The selection rule the read runs is `§2.3`'s** — the walk is shared (`§2.1`), so **the read resolves
nothing of its own.** **The read's own tier-domain failure is `OutOfDomainTier` (`§3.1.1`'s arity table).**

| The read's return, by what it resolved to | Its shape |
| --- | --- |
| a **`leaf`** | **the leaf's stored value** — the admitted literal itself, exactly as written (`P: §1`: *"If leaf: return the leaf's stored value"*) |
| a **`branch`** | **a freshly assembled JSON value** (`§4.2`) |
| **the REGISTER** (empty address) | **an object containing the ENTIRE REGISTRY** (`P: §13 · A25`) |

**§4.1.1 THE LITERAL-ONLY FORM — `readLiteral(address, tier?) → StoreValue`: ITS SUCCESS SHAPE, DECLARED.**
**`readLiteral` is the SAME read with ONE narrowing: its target must be a `leaf`.** **Its declared
behaviour is three clauses and nothing else** (`[T: the form's closure, stated at this contract's second
bounded amendment; the form itself is `§8.1` #8's carrier and the `read` verb's sibling | CONTRACT]`):

1. **`address` and `tier` are `read`'s own**: the address grammar is `§1.5`'s, the tier argument's arity and
   domain are **`§3.1.1`'s `readLiteral` row — identical to the `read` row, `tier` optional and
   zero-to-many, `null`/`undefined` → `AddressMalformed`, an out-of-domain token → `OutOfDomainTier`** —
   and the selection rule is `§2.3`'s. **The resolution is the SHARED walk's (`§2.1`): `readLiteral`
   resolves nothing of its own.**
2. **ON SUCCESS it returns EXACTLY what `read` returns at a `leaf` — the leaf's stored value, THE ADMITTED
   LITERAL ITSELF, exactly as written** (`R-1`; the same value, the same copy discipline, the same
   absence of any wrapper). **It is a `StoreValue` and not a record: there is no `readLiteral`-specific
   return type.** **At a `leaf` target, `readLiteral(a, t)` and `read(a, t)` are indistinguishable — the
   two forms differ ONLY in what they refuse.**
3. **IT REFUSES EXACTLY TWO STATES AND NOTHING ELSE:** **a `branch` target** (including the register, whose
   read assembles an object) fails **`ReadTargetIsBranch`** (`§8.1` #8); **everything else fails with the
   walk's own codes exactly as `read` does** (`L-1`/`L-3`/`L-TIER`/`L-4`, `§2.2`, and `OutOfDomainTier`
   for the tier argument). **It never returns `null` and never returns the assembled JSON of a branch.**

**A read is a VALUE COPY, not a reference** (`[T: the read's copy discipline | CONTRACT]`; `JN-6` records
that *"preserving the original data"* has no observable for a value a caller already read out, so the copy
discipline is stated **over store state**): **mutating the object a read returned never mutates the store**,
and **the only reference-returning seam is `findAddress`** (`P: §13 · A26`, `§2.1`). **`readLiteral` obeys
the same copy discipline.**
**A read NEVER THROWS for an unoccupied key, an absent tier or an unresolved address** beyond the four walk
codes and `OutOfDomainTier`: there is **no `null` answer** (`DD-12`).
**⟶ RECONCILED 2026-10-11 — WHAT THE READ ANSWERS WHEN THE PASSED SET COVERS NOTHING IN ITS SUBTREE** (`RCA-8(d)`
ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and nothing is deleted**; the bounded
assembly-scope determination, dated and priced at `DD-31`). **THE AS-FILED SENTENCE'S TERMS, READ WITH THE
AS-FILED `§4.2`'s CLOSING SENTENCE, LEFT ONE STATE AMBIGUOUS: where a passed tier set selected NO version for
a key inside the ASSEMBLY, one home said the read assembled NOTHING for it and the other said the assembly
*"never omits a member in silence"*.** **THE OPERATIVE READING:** **the read OMITS that member — the assembled
`MAP` or `VEC` carries no entry for it — and the read SUCCEEDS**, because the set selects which version each
address answers and never whether the read answers; **the read's own failure set is UNCHANGED and UNWIDENED:
`L-1`'s `AddressMalformed`, `L-3`'s `AddressNotFound`, `L-TIER`'s `TierNotFound` at a WALK step, `L-4`'s
`LeafHasNoDownstream` and `OutOfDomainTier` remain its whole fail set, and the omission produces no code at
all** (`§2.2`'s scope clause and its reconciliation; `§4.2`'s assembly clause and its reconciliation; `DD-31`;
the walk's fail set is `§2.2`'s and `§8.1`'s and neither moves) (`[T: the read's failure set under the
omission, stated so no code is read into it | CONTRACT]`).
`[P: §1, §13 · A24 · A25 · A26; L: §1-bis · address | CONTRACT]`

### §4.2 The read's assembly arms — a closed table

**`R-1`…`R-5` are the read's arms.** **The recursion is stated once: the descendant node values are read in
the same manner recursively** (`P: §1`: *"The descendant node values are read in the same manner
recursively"*).

| Arm | The state it fires at | The answer |
| --- | --- | --- |
| **`R-1`** | the resolved node is a **`leaf`** | **its value**, verbatim |
| **`R-2`** | the resolved node is a **`branch` whose container is a `MAP`** | **an object** — *"convert to an object, using the same keys"* (`P: §1`) — one member per key, its value produced by the same read applied to the node the key's selected anchor points to |
| **`R-3`** | the resolved node is a **`branch` whose container is a `VEC`** | **an array** — *"If the downstream link is a vec, convert to array"* (`P: §1`) — index order, element `i` produced by the same read applied to the node the index-`i` anchor points to. **The array is dense from `0` and its length is the container's contiguous index count** |
| **`R-4`** | a `MAP` (or `VEC`) holds **more than one anchor at the SAME key/index** at different tiers | **only the node of the lowest-persistence anchor is translated** (`P: §1`: *"If more than one anchor has the same index/key, translate only the node of the lowest-persistence anchor"`), **unless a tier was passed, in which case the passed any-match set decides and the lowest-persistence member of that set answers** (`§2.3`; `P: §13 · A24`) |
| **`R-5`** | the resolved node is the **REGISTER** | **an object containing every register key** — one member per key, its value produced by the same read applied to that key's selected root node. **This is `R-2` applied to the register, which is always a `MAP` (`P: §13 · A23`)** |

**AND `R-4`'s TIER SET IS THE WALK'S OWN SET, APPLIED AT EVERY STEP — THE ASSEMBLY IS NOT A SECOND RULE:**
**when a tier set was passed, the read's ASSEMBLY applies that SAME passed set at EVERY STEP OF ITS OWN
WALK, at the addressed node and at every descendant node the recursion reaches** — **one member per key,
whose value is produced by the same read applied to the node of the lowest-persistence anchor WITHIN THE
PASSED SET**, and **where a descendant key holds an anchor but NO passed tier matches it, the read answers
`L-TIER`'s `TierNotFound` for that step and assembles NOTHING for it** — **the assembly never substitutes an
anchor at a tier the caller did not pass, and it never omits a member in silence** (`[T: the assembly's tier
scope, stated at this contract's third bounded amendment — the gate-4 adversarial pass's `H-1` found the
fallback assembles out-of-set anchors, and this clause fixes the reading `§2.2`'s scope clause and `§2.3`
already carry | CONTRACT]`).

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the read's closed arm table is `5` arms**, and **only one of them
(`R-4`) is a SELECTION arm rather than a SHAPE arm** (`[T: the read arm table's own census | CENSUS]`).
**THE EMPTY CONTAINER'S READ IS `DD-1`'s:** **a `MAP` with `0` child anchors reads as `{}` and a `VEC` with
`0` child anchors reads as `[]`** — **the two empty forms are DISTINCT, and that distinctness is what makes
`A22`'s read-inference observable** (`[T + DD-1 | DECLARED-DEFAULT]`).
`[P: §1, §13 · A23 · A24 | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THE ASSEMBLY'S TIER SCOPE: THE SET SELECTS A MEMBER'S VERSION PER ADDRESS, AND
WITHOUT A SELECTABLE VERSION THE MEMBER IS OMITTED** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed clause of
this section stands byte-for-byte above and nothing is deleted**; the bounded assembly-scope determination,
taken after `docs/specs/storeroom-native-greens.md`'s `F-1` and carried at `DD-31`). **THE AS-FILED CELL
READ:** *"where a descendant key holds an anchor but NO passed tier matches it, the read answers `L-TIER`'s
`TierNotFound` for that step and assembles NOTHING for it — the assembly never substitutes an anchor at a tier
the caller did not pass, and it never omits a member in silence"* — **and BOTH of its last two clauses could
not hold together with `R-2`'s *"one member per key"* once a set was passed over a subtree that lies outside
it.** **THE OPERATIVE READING, IN THREE CLAUSES AND NOTHING ELSE:** **(a) THE SET IS A PER-ADDRESS SELECTOR:
at each step of the assembly's recursive walk, the step applies the passed set exactly as `§2.3` applies it at
a walk step — the lowest-persistence anchor WITHIN THE PASSED SET is the one translated, and where a key holds
more than one passed tier, `A28`'s lowest-persistence rule answers over that matched subset, `A11`'s one
predicate being its ground.** **(b) WHERE NO PASSED VERSION IS SELECTABLE, THE MEMBER IS OMITTED: a key whose
container holds an anchor but whose anchors lie at NO passed tier contributes NO entry to the assembled `MAP`
or `VEC` — the read does NOT answer `TierNotFound`, does NOT assemble an out-of-set anchor, and does NOT fall
back to the lowest-persistence arm `A28` reserves to a `0`-token set** — **so `read(['g'], {file})` over a
`file`-tier `g` whose sibling child `c` stands at `temp` answers the assembled object with `c` OMITTED (the
empty object `DD-1` declares where nothing is left to assemble), and `read(['g','x'], {file,mem})` answers the
`file`-tier child, its own anchor being the lowest-persistence member of the passed subset at that address.**
**(c) THE SUBSTITUTION HALF OF THE AS-FILED CELL STANDS UNCHANGED, AND IT IS `H-1`'s: the assembly NEVER
substitutes or translates an anchor at a tier the caller did not pass** — the finding the as-filed clause
closed remains closed, and nothing in this reconciliation re-opens it. **THE WHOLE OF THE CHANGE IS THEREFORE
THE AS-FILED CELL'S `TierNotFound`-for-a-descendant READING, WITHDRAWN, AND ITS OPPOSITE — THE MEMBER IS
OMITTED — PUT IN ITS PLACE** (`DD-31`; `§2.2`'s scope clause and its reconciliation, which fixes the same
scope at the WALK's home; `§4.1`'s reconciliation, which states that the omission produces no code). **NO
`§`-NUMBER, NO ARM, NO FAIL-CODE, NO REGISTER ROW AND NO CENSUS OF THIS SECTION MOVES: the read's arm table
is still `5` arms and `R-4` is still its one SELECTION arm** (`[T: the reconciliation, with the as-filed form
named and nothing deleted | CONTRACT]`).

### §4.3 The delete's signature — tier OPTIONAL, and its tier-scoped reading

**`delete(address, tier?) → DeleteReceipt`.** **The delete verb STANDS, and its tier scope reads through
the one-predicate discipline** (`P: §11 · A12`: *"See above"` answering the delete question; `P: §11 · A11`).

- **The directive's words are the verb's whole text:** *"If the address resolves, delete the resolved node
  and all downstream. If the tier is specified, delete only that tier(s), otherwise, delete all."*
  (`P: §1`). **`A12` rules that this verb stands and that *"delete only that tier(s)"* removes the instance
  at that tier, while *"the surviving lower- or higher-tier instance at the same key is unaffected unless
  its tier is named"*** (`P: §11 · A12`'s mapped clause).
- **`tier` absent** → **every version of the addressed node is removed, at every tier, together with all
  downstream nodes of each.** **A delete of the empty address removes every top-level entry: the register
  is emptied** (`[T: the empty-address delete's closure | CONTRACT]`).
- **`tier` an array of `≥ 2` tokens** → **`OutOfDomainTier`** (`§3.1.1`) — *"delete only that tier(s)"* is
  read as **one** tier per call, exactly as the write's arity is, because `A24` fixes the array form on
  **read** alone (`[T: the delete's arity closure | CONTRACT]`; the alternative — accepting a set on delete
  — is priced below).
- **A delete that removes nothing is a SUCCESS, not a failure** — it returns `DeleteReceipt` with
  `tiers: []` (`DD-9`).
- **Delete is NOT purge.** **Purge is a WRITE's act** (`P: §12 · A19`) and is `§5.4` arm `W-6`'s; a delete
  is a caller's act and removes only what it names (`[P: §12 · A19; T | NEGATIVE]`).
- **AND WHAT THE DELETE LEAVES BEHIND IN A `VEC`'S OWN CONTAINER IS `§4.4`'S OWN CLAUSE, POINTED HERE SO
  THE RECEIPT IS NOT READ AS CARRYING IT:** **a delete that removes an indexed version RENUMBERS that
  container's surviving anchors **in container order from `0`** — each keeping its tier and its node
  (`DD-30`) — while the receipt's two members are UNTOUCHED by it: `tiers` carries the tiers whose versions
  were REMOVED and `address` is the caller's array VERBATIM** (`§4.4`; `§1.3`, `§4.2` `R-3`, `§5.5`
  `P-IM-3` row — **⟶ REPOINTED 2026-10-11: this cell's as-filed tokens read *"`§5.5` `P-IM-3`"*, two bare tokens that name the row id but leave its number's second referent unnamed; the possessive is added so the citation is read as the ROW rather than as the purge-chain number printed at the same `§5.5` (`§5.2`'s dual-mapping disclosure)**; `[T + `DD-30` | CROSS-REF]`).

### §4.4 The delete arms — a closed table, and the receipt shape

| Arm | The state it fires at | What the delete does | The receipt's `tiers` |
| --- | --- | --- | --- |
| **`D-1`** | `tier` is a single token, and the target holds a version at that tier | removes that one version, **and all of its downstream**, leaving every other tier's version at that key **untouched** | the one named tier |
| **`D-2`** | `tier` is absent, and the target holds versions at `1` to `3` tiers | removes **every** version and all downstream of each | every tier removed, in the canonical order of `§5.1` (`file`, `mem`, `temp`) |
| **`D-3`** | the target resolves, but holds **no** version at the named tier (or no version at all — **a state the model cannot reach: see the clause below**) | **removes nothing**, and is a **success** | **`[]`** |
| **`D-4`** | the address resolves to nothing (`§2.2`'s walk codes) | removes nothing; the delete **fails with the walk's own code** | — (it throws) |
| **`D-5`** | the address is the **empty address** | **empties the register**: every top-level entry and all its downstream is removed. **`tier` present → only that tier's top-level entries** | the tiers removed |

**`D-3`'s PARENTHETICAL, SETTLED SO THE ARM IS NOT READ AS HAVING TWO STATES** (`[T: the parenthetical's
reading, at this contract's second bounded amendment | CONTRACT]`): **the clause *"or no version at all"*
names a state NO ADDRESS CAN BE IN, and it is unreachable by the model's own construction:** **every
reachable node is reached through an anchor** (`§1.1`, `§1.2`), **and every anchor carries a tier**
(`P: §14 · A27`; `§1.2`) — **so a node that resolves at an address always holds a version at the tier of
the anchor that resolves to it, and *"resolves but holds no version at all"* has no instance in this
store.** **The arm's ONE reachable state is the first half: the target resolves and the NAMED tier holds no
version — which is a SUCCESS with `tiers: []` (`DD-9`).** **The parenthetical is retained as the ruling's
own words and read as the arm's degenerate half, never as a second trigger**, and **`D-3` counts as ONE
arm, so the delete's census (`4 + 1 = 5`) is unmoved.**

**`DeleteReceipt` is a record with exactly two members** (`[T: the receipt's closed member set | CONTRACT]`):

```
DeleteReceipt {
  address: string[] | (string|number)[],   // the address the caller passed, VERBATIM — the same array's
                                           // segments, in order; the store returns a fresh array
  tiers:   Tier[]                          // the tiers whose versions were removed, in §5.1's canonical
                                           // order; [] when nothing was removed
}
```

**AND THE DELETE'S EFFECT ON A `VEC`'S SURVIVING INDEX KEYS — THE STATE `D-1`'s AND `D-2`'s ARMS WERE
SILENT ON, AND WHAT THE DELETE DOES INSTEAD** (`DD-30`; **the state the gate-4 adversarial pass's `H-2`
exposed and the implementer's own fix declared**; `[T + `DD-30` | DECLARED-DEFAULT]`): **a delete of an
indexed version of a `VEC`'s container RENUMBERS the surviving anchors in CONTAINER ORDER FROM `0` — each
surviving anchor KEEPS ITS TIER and KEEPS ITS NODE, and only its index key moves.** **THE CONSEQUENCE, IN
THE CONTRACT'S OWN TERMS: the container's index domain stays CONTIGUOUS FROM `0` (`§1.3`'s `VEC` key
domain), the parent's own read is DENSE AGAIN — *"the array is dense from `0` and its length is the
container's contiguous index count"* (`§4.2` arm `R-3`) — and every minted node stays REACHABLE BY EXACTLY
ONE ADDRESS PATH (`§5.5`'s row `P-IM-3`, whose failure list carries *"a minted node no address resolves
to"*): the survivor that stood at the deleted index's successor is addressed at ONE index from `0` after
the delete, and the deleted index's own node no longer resolves — at ANY index.** **AND THE `VEC` BOUNDARY,
STATED SO THE CLAUSE IS NOT READ AS STORE-WIDE:** **the renumbering is `VEC`-only** — a `MAP`'s string keys
are not relabelled by a delete (`§1.3`: a `MAP`'s keys are its own, and its iteration order is not
declared), a container left with `0` surviving anchors has no key to renumber, and the register's own keys
are never relabelled. **THE DELETE'S ANSWER IS UNCHANGED, member for member:** the `DeleteReceipt` of
`§4.4` carries the SAME `tiers` cell — **the tiers whose versions were REMOVED, and renumbering removes
none** — and its `address` member is the caller's own array VERBATIM; **the delete still returns a
`DeleteReceipt` (`D-1`/`D-2`/`D-3`/`D-5`), still throws only `D-4`'s walk codes, and no arm, no receipt
member and no `§4.4` census (`4 + 1 = 5`) moves.** **The renumbering mints NOTHING, removes NO surviving
anchor, touches NO surviving anchor's tier and NO surviving anchor's node, and is NOT a purge: purge is a
WRITE's act (`§4.3`; `P: §12 · A19`), and this is a caller's delete relabelling the keys it left behind.**
**AND THE CLAUSE IS A DECLARED CHOICE, NOT A RULING'S OWN WORDS, SO ITS SOURCE IS STATED:** **the nearest
rulings — `A19`'s purge definition and the directive's own cascade sentence — name what a WRITE purges and
what a delete REMOVES, and NEITHER names the surviving siblings' keys**, so the reading above is this
contract's own and is carried as `DD-30`, **at the alternative's price and with its reversal point —
never as a question to the architect and never read as a closure of theirs.**
`[T: the renumbering clause, `DD-30`'s carrier; the invariants it keeps are `§1.3`'s key domain, `§4.2`
`R-3`'s density and `§5.5`'s `P-IM-3` row's reachability | DECLARED-DEFAULT]`

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the delete's closed arm table is `5` arms = `4` success arms +
`1` fail-closed arm (`4 + 1 = 5`)**; **`D-3` is a success arm that removes nothing, and that is the
ruling's own consequence, not an omission** (`[T: the delete arm table's own census | CENSUS]`).
`[P: §1, §11 · A11 · A12 | CONTRACT]`

---

## §5. The tiers, the monotonic clause, the shadow and the purge chain

### §5.1 The tier domain, its rank, and its lifetime

| Token | `rank` | Its lifetime, ruled | Its meaning |
| --- | --- | --- | --- |
| **`file`** | **`2`** | **survives PROCESS EXIT** — it is saved to a JSON file in a persistent, external location | durable state |
| **`mem`** | **`1`** | **LOST ON PROCESS EXIT** (`P: §12 · A19`: *"Process exit"*) | state that lives for the process's life |
| **`temp`** | **`0`** | **lost on process exit with `mem`**, and **purged on writes to `mem`** | **UNAPPLIED/TRIAL data** — *"a UI change the user should be able to see for trial purposes, but is not willing to save yet"* (`P: §11 · A15`) |

**`M-1` — THE RANK IS TOTAL AND STRICT:** `rank(file) = 2 > rank(mem) = 1 > rank(temp) = 0`. **"Lower
tier" and "lower persistence" are ONE predicate** (`P: §11 · A11`), and **every clause in this contract that
says "lower persistence" means `rank` ascending.** **The canonical order used by every printed list in this
contract is `file`, `mem`, `temp`** — descending persistence, the order the directive prints the tokens in
(`P: §1`: *"ranked by their persistence in descending order: file, mem, and temp"`).
**`M-2` — THE DOMAIN IS CLOSED AT THREE:** an argument outside `{file, mem, temp}` fails `OutOfDomainTier`
(`P: §14 · A29`); **`secure` is not a fourth tier** (`P: §9 · A4`).

**THE CARRYING RULE:** **the tier and the monotonic clause are carried BY ANCHORS** (`P: §14 · A27`:
*"Anchors, so they can be read by links more easily"*), read with **the tier is a PROPERTY** (`P: §12 · A17`)
and **the directive's own carrier** (`P: §11 · A10`: the directive governs, so the tier is carried as the
directive states it — **on the child anchor**).
`[P: §1, §9 · A4, §11 · A10 · A11 · A15, §12 · A17 · A19, §14 · A27 · A29; L: §1-bis · file/mem/temp, · tier | CONTRACT]`

### §5.2 The typed property register — `§5.2`–`§5.9`, **`8` rows** (`P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-TP-6` · `P-TP-7` · `P-TP-8` · `P-TP-9`), and the cap holds after this contract's first bounded amendment (`§0.1` item 5)

**Each row states its property, its strategy id and what FAILS it.** **A row's `strategy` cell names the
test strategy the TestWriter runs; the `fails when` cell names the observable that breaks it.** **No row is
an `F`-row and no row is a `§6`/`FS-n` form** (`§0.1` item 5). **The rows are pinnable claims of the
`CONTRACT` class, each citing the clause that states it verbatim** (the spec-authoring discipline's
`provenance §ref` cell = the spec `§` that states the property).
**THE REGISTER CARRIES `8` ROWS AND NO NINTH: `P-TP-5` was merged into the surviving row `P-SM-4` at this
contract's first bounded amendment (`§0.1` item 5, dated `2026-10-11`).** **THE `8` ROWS ARE `P-IM-1` ·
`P-IM-2` · `P-IM-3` · `P-SM-4` · `P-TP-6` · `P-TP-7` · `P-TP-8` · `P-TP-9`, and EVERY ONE OF THEM NOW
CARRIES ITS ROW TEXT:** **`P-IM-3`'s row — the only row the first amendment's register declared without
authoring — stands at `§5.5`** (authored at this contract's second bounded amendment; `§5.5.1` is the
merged row's pointer, renumbered from `§5.5` by that authoring). **The merged row's section number `§5.5.1`
stands as the merged row's tier-order half and declares no row of its own** — *a citation to the merged row
names `P-SM-4`, the surviving id*. **No row was added, dropped or renumbered by the merge, and no row id
moved at the second amendment either: it AUTHORED the one row text that was missing.**

**THE DUAL-MAPPING DISCLOSURE — THE REGISTER'S ROW NUMBERS AND THE TIER CLAUSES' NUMBERS, PRINTED WHOLE SO
NO CITATION OF `§5.2`–`§5.9` IS LEFT TO A READER'S GUESS** (`[T: the disclosure, taken at this pass of the
proofreading gate; it adds no row, moves no number, re-decides no claim and states no behaviour — it names
which referent each printed number already carries, and the reading rule every citation in this directory
obeys | CONTRACT]`). **THE STATE THIS DISCLOSES, WITHOUT SMOOTHING IT: `§5` PRINTS TWO NUMBER SERIES UNDER
ONE SET OF NUMBERS — the register's ROW numbers (`§5.2` `P-IM-1` · `§5.3` `P-IM-2` · `§5.4` `P-SM-4` ·
`§5.5` `P-IM-3` · `§5.5.1` the pointer · `§5.6` `P-TP-6` · `§5.7` `P-TP-7` · `§5.8` `P-TP-8` · `§5.9`
`P-TP-9`) AND the tier clauses' numbers (`§5.1` the domain and its `M-1` · `§5.3` the monotonic clause and
the shadow, stated as one rule · `§5.4` the purge chain · `§5.5` the register-row region's own number, whose
tier-clause referent is the reachability clause `P-IM-3` states · `§5.6`–`§5.9` the register's rows alone) —
**so the bare forms `§5.3`, `§5.4` and `§5.5` each resolve to TWO printed sections of this one document.**
**THE READING RULE, STATED ONCE AND OBEYED BY EVERY CITATION OF THIS DIRECTORY:** **a citation of `§5.3`,
`§5.4` or `§5.5` is read by its OWN QUALIFIER — a citation naming a REGISTER ROW (`P-IM-2`, `P-SM-4`,
`P-IM-3`), a strategy (`S-ARM`, `S-TIER`, `S-MONO`), an arm identity (`W-1`…`W-6`, `F-1`…`F-6`, `D-1`…`D-5`)
or a property half (`(a)`, `(b)`, `(c)`, `(d)`, `(e)`) resolves to the REGISTER'S ROW at that number, while a
citation naming a CLAUSE (`§5.4`'s purge chain, `§5.4`'s cascade, `§5.3` item 1, `§5.3`'s one rule, `§5.5`'s
reachability clause) resolves to the TIER CLAUSE at that number; and where a citation carries NEITHER
qualifier the referent is named in place rather than inferred.** **AND EVERY SUCH CITATION THAT CARRIED
NEITHER QUALIFIER IS REPOINTED IN PLACE AT THIS PASS, EACH WITH A DATED `⟶ REPOINTED 2026-10-11` CLAUSE
NAMING THE CELL IT SUPERSEDED** (the audit trail is `archive/reviews/2026-10-11-U-STOREROOM-NATIVE-proofread.md`).
**NOTHING ELSE MOVES: NO ROW IS ADDED, DROPPED OR RENUMBERED; NO `§`-NUMBER IS CHANGED; THE REGISTER STILL
CARRIES `8` ROWS AND THE CAP STILL HOLDS (`8 ≤ 8` ✓); AND THE RUNNING REGISTER LAYER AND THE RED SET, WHICH
CITE `§5.2`–`§5.9` BY ROW ID, ARE READ THROUGH THIS RULE UNCHANGED** (the executed layer's own citations at
`tests/properties.rs` name each row id beside its `§`-number, so the rule resolves them without an edit).

#### `§5.2` `P-IM-1` — the write→read round trip is EXACT
- **Property.** **For every admitted value `v` (`§1.4`), every address `a` (`§1.5`) and every tier `t`
  (`§5.1`): `read(a, t)` after `write(a, t, v)` returns a value **structurally equal to `v`** —
  **byte-equal after a JSON round trip** — and the store's state admits no other version of `a` at a tier
  `≤ rank(t)` (`§5.4`'s purge).** `A3` names this the unit's PRIMARY ACCEPTANCE LAYER: *"Test write-->read
  consistency in isolation"* (`P: §9 · A3`).
- **Strategy id.** **`S-RT`** — drive `write` then `read` over a generated `(address, tier, value)` triple;
  compare with a structural-equality predicate.
- **What FAILS it.** **any lossy or coercive conversion** (`"0"` ↔ `0`, a number formatted as a string, an
  object's key order counted as significant, `null` admitted as a leaf, a `VEC`'s index collapsing to a
  `MAP`'s key); **a shadow that survives the write** (the read returning the pre-write version at
  `rank ≤ rank(t)`); **an empty container's read returning the other container's empty form** (`DD-1`);
  **a read whose returned object, mutated, changes the store** (the copy discipline).
- **Clause it cites.** **`§3.3`** (the install stage), **`§4.1` and `§4.2`** (the read's return shape, its
  copy discipline and its assembly arms), **`§3.4`'s `W-1`/`W-2`/`W-5`/`W-6`** (the arms the round trip
  exercises) and **`§5.4`'s purge chain** (the version-set half — **`§5.4` the PURGE-CHAIN section; the
  register row this row's own id names stands at the same printed number, `§5.2`'s dual-mapping disclosure**).
  **⟶ REPOINTED 2026-10-11: the as-filed text of this cell's last clause read *"and `§5.4`'s purge chain (the
  version-set half)"*, which names the purge-chain section and nothing else; the qualifier is added so the
  citation is not read as a register row.** **THE CITATION IS CORRECTED HERE so it
  resolves to BEHAVIOUR CLAUSES and not to register rows:** the first amendment's cell read *"`§3.3`,
  `§4.2`, `§5.3`–`§5.5`"*, and **after the `P-TP-5`/`P-SM-4` merge `§5.3` is `P-IM-2`'s row and `§5.4` is
  `P-SM-4`'s row** — so the old citation pointed at two register rows and one rowless section instead of
  at the clauses it means (`[T: the citation's correction, at this contract's second bounded amendment |
  CROSS-REF]`). `[P: §1, §9 · A3, §12 · A19 | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THIS ROW'S *"byte-equal after a JSON round trip"* HALF IS SCOPED TO THE CANONICAL
SPELLING, SO THE REGISTER'S ROW AND THE BATTERY'S EQUALITY RELATION AGREE** (`RCA-8(d)` ANNOTATE-BESIDE:
**every cell of this row above — its property, its `S-RT` strategy, its failure list and its citations,
the repointed purge-chain cell included — stands BYTE-FOR-BYTE, and THIS clause is the operative
statement of the equality relation's own scope**; **the ruling: *"Normalize into file"*, transcribed as
`A59` at the FILED proposal `docs/specs/storeroom-listeners-proposal.md` `§21`, whose resolving citation
form is `P: §21 · A59`**; `store-model.md §1.4`'s narrowed class 3; `seams-and-lifecycle.md §7.2`'s own
dated clause; `DD-46` (a)). **THE SCOPE, IN THREE CLAUSES:**
- **(a) THE EQUALITY RELATION IS READ AGAINST THE CANONICAL SPELLING AND NOT AGAINST THE CALLER'S
  LITERAL.** **`read(a, t)` after `write(a, t, v)` returns a value STRUCTURALLY EQUAL to `v`, and — where
  the round trip crosses the `file` tier's text — equal to `v` AS THE CANONICAL SPELLING OF `v` CARRIES
  IT** (`§1.4`'s canonical rule; `DD-46` (a)). **So `P-IM-1` asserts ONE relation with TWO spellings of
  its subject, and a drive that compares against the byte image of a caller's non-canonical literal
  (`1e2`, `1.0`, `1E+2`) is measuring a spelling this contract does not pin to.** **`A59`'s own words:
  the round trip through the `file` tier and a boot is *"EXACT-MODULO-THIS-DECLARED-NORMALIZATION"*.**
- **(b) `-0` IS THE ONE DECLARED NORMALIZATION, AND ITS TWO HALVES ARE BOTH ASSERTED.** **The `file`
  tier's committed text carries `0` for a signed zero, so a `file`-tier `-0` READS BACK `0` after the boot
  — BY THIS ROW'S DECLARATION, not as an inexactness — and IN MEMORY (`mem` and `temp`) THE SIGN IS NOT
  TOUCHED: a `mem`/`temp` `-0` reads back `-0`, and only the committed bytes carry `0`** (`P: §21 ·
  A59`: *"the normalization is a property of the FILE's IMAGE, not of the value the store holds"*).
- **(c) NO OTHER HALF OF THIS ROW MOVES.** **The structural equality, the copy discipline (`§4.1`), the
  purge-chain half, the `S-RT` strategy id and every item of the failure list stand exactly as filed; the
  row is the SAME row and the register still carries `8` rows with the cap holding (`8 ≤ 8` ✓).** **AND THE
  ROW REMAINS FAILABLE IN BOTH OF THESE STATES: a `file`-tier spelling that is NOT the canonical one
  (`1e2` for `100`, `100.0`, `+1`), and a `mem`-tier `-0` read back WITHOUT its sign** (`DD-46`'s `what it
  REFUSES` and property cells name both, and its `(a)` cell prices the no-canonical-spelling alternative
  that `CF-2` filed).
**ITS `alt`, PRICED, AND ITS REVERSAL POINT ARE `DD-46`'s** — the row this clause's scope reads, whose
`(a)` cell prices the spelling alternatives and whose reversal cell names the instrument.
`[P: §21 · A59; T: the equality relation's scope, at this contract's eighth bounded amendment |
DECLARED-DEFAULT]`

#### `§5.3` `P-IM-2` — a failed write leaves ZERO residue

- **Property.** **After ANY `F-1`…`F-6` failure (`§3.4`), the store's observable state is IDENTICAL to its
  pre-write state**: no node minted, no anchor destroyed, no version removed, no container kind changed,
  **and no journal entry appended**. Every success arm's residue is likewise exactly what its row says.
- **Strategy id.** **`S-RESIDUE`** — snapshot the observable state (each reachable address's read value,
  each link's pair set, the journal's entry count) before and after a failed write; compare.
- **What FAILS it.** **a partially installed subtree**; **a removed version that was not restored**; **a
  journal entry for a failed write**; **a container's kind flipped by a failed write** (`DD-19`).
- **Clause it cites.** `§3.4`, `§3.5`, `§6.4`. `[T: §3.5's fail-closed guarantees; P: §8 | CONTRACT]`

#### `§5.4` `P-SM-4` (**THE MERGED ROW** — it carries the former `P-TP-5`'s rules whole) — the write's own tier is the addressed version's tier, the arms are exclusive, and the tier order is TOTAL, STRICT and OBSERVABLE

- **Property.** **(a)** **In every success arm, `findAddress(address, t).anchor.tier === t` after the write,
  and the write's tier is the single token the caller passed** (`§3.1`'s arity table). **(b)** **The success
  arms are EXCLUSIVE BY EFFECT, AND THE OBSERVABLE IS THE EFFECT AND NOT AN ARM'S IDENTITY — STATED SO THE
  ROW IS FAILABLE ON THE SURFACE:** **for every legal write, the pair count at the addressed link, the tier
  order and the outcome are SINGLE-VALUED and each is exactly what the designated arm's row states** —
  `W-1`/`W-6`: the pair count does not grow; **`W-2`: the destroyed pair leaves as the write's own pair is
  minted or replaced, so the count does not grow either**; `W-5`/`W-3`/`W-4`: it grows by one — **and where
  two pre-states hold at once, `§3.4`'s DESIGNATION decides the observable: a key holding a version at the
  write's own tier AND one at a less persistent tier yields the pair count and the value of `W-6`'s purge,
  which subsumes `W-1`'s replacement; and a key whose container kind or key domain the write contradicts
  yields `F-4`'s own observable — nothing installed, nothing purged, no pair added** (`§3.4`'s designation
  clauses). **THE ARM'S IDENTITY IS NOT AN OBSERVABLE OF THIS SURFACE, and this row asserts none**
  (`§3.4`'s designation clause exists precisely because the identity of an overlapped arm is not observable;
  `[T: the exclusivity clause's corrected form — the gate-4 adversarial pass found (b)'s arm-identity half
  unfailable and this clause narrows it to the effect, the pair count, the tier order and the exclusivity of
  outcomes | CONTRACT]`). **(c) — THE FORMER `P-TP-5`'S PROPERTY, CARRIED HERE WHOLE:**
  **For any two versions of one key at tiers `t1 ≠ t2`: an unqualified `read` answers the one with the LOWER
  `rank`; and for any write at tier `t`, every version at tier `t'` with `rank(t') ≤ rank(t)` at that node
  is GONE while every version with `rank(t') > rank(t)` SURVIVES — UNLESS it is the ADDRESSED LEAF'S OWN
  POINTING ANCHOR, which `W-2`'s re-mint destroys WHATEVER TIER IT CARRIES (`§1.1`; `P: §13 · A21`).**
  **That is one property with two halves, and both are `A19`'s purge read with `A11`'s one predicate** —
  **read with the ONE act of a write that is NOT a purge: the re-mint REPLACES THE ADDRESSED NODE ITSELF
  (`§3.4` arm `W-2`; `§1.1`), so the survival half's scope is every version at that key OTHER than the
  anchor the walk reached, which `A21` destroys by design — the scope clause is stated beside the as-filed
  words at this contract's bounded RECONCILIATION pass, and the as-filed words stand** (`[T: (c)'s
  survival half's scope, so the re-mint and the purge are never read as one act | CONTRACT]`). **(d)** **The tier order is stated over the
  three tokens in `§5.1`'s canonical order** (`file`, `mem`, `temp`). **(e)** **The selection the read and
  the walk run on is `§2.3`'s, over `§5.1`'s `M-1`, and its purge arms are `§5.4`'s `W-1`/`W-5`/`W-6`.**
- **Strategy ids — TWO, because this one row carries two subjects.** **`S-ARM`** — enumerate the arm
  conditions as a closed decision table over `(parent kind, present pairs at key, container kind, value
  class, tier rank vs present ranks)`; assert one arm fires and its stated effect. **`S-TIER`** — for each
  ordered pair `(t1, t2)` with `rank(t1) < rank(t2)`: write at `t2`, write at `t1`, read unqualified
  (expect `t1`'s value), then write at `t2` again (expect `t1`'s version purged). **`3` ordered pairs over
  `3` tokens ⇒ `3` drives, and each drive has `4` assertions.**
- **What FAILS it.** **Against (a)/(b):** **two anchors at one `(key, tier)` pair** — **observed as a pair
  count that grows where the arm's row says it does not** (breaks `A34`); **a write
  that lands at a tier other than its argument**; **an arm with no effect**, or **an unlisted arm** — an
  observable write that matches no `W-n` row; **an observable outcome the designated arm's row does not
  state** (the `W-1`+`W-6` overlap, where `W-6`'s purge is the only permitted effect — **and the `F-4` vs
  `W-6` overlap, where `F-4`'s *nothing installed, nothing purged, no pair added* is the only permitted
  effect**). **Against (c)/(d):**
  **a shadow that does not win the
  unqualified read**; **a write that leaves a lower-persistence version in place** (purge not run); **a read
  that answers the higher-persistence version**; **an equal-tier write that grows the pair count**
  (`DD-8`); **a write that removes a HIGHER persistence version OTHER than the addressed leaf's own pointing
  anchor — the ONE destruction `A21`'s re-mint orders** (`§3.4` arm `W-2`, `§1.1`; `W-5`'s shadow inverted).
- **Clauses it cites.** `§3.4`, `§1.3`, `§5.4` arms `W-1`/`W-5`/`W-6`, `§2.3`, `§5.1`'s `M-1`;
  `§5.4`'s purge chain (`§5.4` the PURGE-CHAIN section — the register row this citation's row id names
  stands at the same printed number; `§5.2`'s dual-mapping disclosure). **⟶ REPOINTED 2026-10-11: this cell's
  as-filed text read `§3.4`, `§1.3`, `§5.4` arms `W-1`/`W-5`/`W-6`, `§2.3`, `§5.1`'s `M-1`; `§5.4`'s purge
  chain.** — `[P: §11 · A11 · A19, §12 · A19, §13 · A24, §14 · A28, §15 · A34; T | CONTRACT]`
  **⟶ AND THIS ROW'S FAILURE LIST GAINS ITS LISTENER HALF AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT
  (`F-2`), PRINTED HERE SO THE ROW'S FAIL SET AND ITS ADDED PROPERTY AGREE ITEM FOR ITEM:** **the failures
  of item (f) above — a listener record or a callable held ON a node · an address stored as a list entry · a
  `leaf` with a non-empty `carried` list · a reference outliving its node · a node whose `active` and
  `carried` lists hold the SAME reference · a handle LOST or DUPLICATED by a change action that replaced the
  node carrying its borrow · a list surfaced by a read, by `findAddress` or by a fresh instance over an equal
  `cfg.filePath` · a sixth structure minted for these lists — each FAIL this row's (a)/(b) observables and
  none of them is a code** (`parameter-semantics.md §2.14`; `A46`; `A47`; `A48`; **`[T: the failure list's
  added half, at this contract's sixth bounded amendment | CONTRACT]`**).

**⟶ ADDED 2026-10-11 (`F-2`) — THE ROW'S LISTENER HALF (`(f)`), AUTHORED HERE BECAUSE THE ROW THAT OBSERVES
THE PER-NODE REFERENCE LISTS IS THIS ONE** (`RCA-8(d)` ANNOTATE-BESIDE: **the row's property (a)–(e), its two
strategy ids, its failure list and its citations STAND BYTE-FOR-BYTE; this clause ADDS the one half the
amendment's listener surface gave this row, and NOTHING IS DELETED**; `A46`; `A47`; `A48`;
`write-and-read.md §6.5` item 9; `store-model.md §1.1`; **`parameter-semantics.md §2.14` (`PAR-14`), whose
`observable` cell names *"`P-SM-4`'s listener half"* and whose citation now RESOLVES — the row carries it.**)
**THE GAP THIS CLOSES, NAMED WHERE IT WAS:** **`PAR-14`'s `observable` cell points at a listener half of this
row, and as filed this row carried NONE** — the listener half the amendment authored stood in `P-TP-6`'s
failure list at `§5.6` (*"a node that HOLDS a listener reference past a change action that destroyed it"*,
`write-and-read.md §6.5` item 9, `A46`). **BOTH ROWS ARE RIGHT TO CARRY IT AND THE OBSERVABLE IS THE ONE THE
LISTS' OWN ROW NAMES: `§5.6` carries the clause at its failure list, and THIS row carries the failable
property, because these two lists are what (a)'s landing observable and (b)'s arm discipline run OVER —
a handle set computed from a destroyed node's lists is a landing whose tier and whose pair count no longer
describes the store.** **WHICH ROW IS THE CARRIER, STATED SO NEITHER IS A SECOND HOME:** **`§5.6` CITES the
borrows' lifetime clause; THIS ROW is FAILED WHEN IT IS VIOLATED** (`parameter-semantics.md §2.14`: *"each is
a VIOLATION OF `P-SM-4`'s and `P-TP-8`'s declared properties and not a code"*), **and `PAR-14`'s observable
therefore resolves HERE.**
- **(f) THE PER-NODE LISTENER REFERENCES ARE THIS ROW'S OWN FAILABLE PROPERTY, AND THEY ARE NOT A SIXTH
  STRUCTURE.** **For every node the store has minted: its `active` list holds the references of the
  listeners bound EXACTLY at that node's address, at most one entry per listener; its `carried` list holds
  the references a newly created child inherits; the two lists are DISJOINT at a node; the two lists are
  DROPPED WITH THE NODE by every change action that destroys and replaces it (`§3.4`'s `W-1`, `W-2` and
  `W-6`, the delete arms' removals, and the boot), so NO reference outlives the node that held it; and NO
  read, NO `findAddress` and NO other verb's answer surfaces either list — the home is not a graph entry and
  no address reaches it** (`A45`, `A46`, `A47`, `A48`; `store-model.md §1.1`; `write-and-read.md §6.5` items
  8 and 9). **THE HANDLE SETS THE TRIGGERS RETURN ARE PRODUCED FROM THE HOME AND ARE CONSISTENT WITH THESE
  LISTS: the same handles are returned whether the per-node index is consulted or the home is scanned, and
  no change action LOSES or DUPLICATES a listener's handle** (`§5.8` (a)/(d) and its `(iv)` DESTRUCTION drive).
- **What FAILS (f).** **a listener record or a callable held ON a node instead of a reference into the home**
  (`DD-32`; `A45`'s index-for-lookup-cost clause); **an address stored as a list entry in place of a
  reference**; **a `leaf` carrying a NON-EMPTY `carried` list** (`store-model.md §1.1`: a leaf has no
  descendant to inherit anything); **a reference that outlives the node that held it** (`A46`); **a node whose
  `active` and `carried` lists hold the SAME reference** (`A47`'s partition, the disjointness rule of
  `write-and-read.md §6.5` item 9 (d)); **a handle LOST or DUPLICATED across a change action that replaced the
  node carrying its borrow**; **a list surfaced by any read, by `findAddress` or by a fresh instance over an
  equal `cfg.filePath`** (`A48`; `DD-38`; `§5.8`'s `(v)` drive); **a tier read off a node instead of off its
  own child anchor, or a sixth data-structure kind minted for these lists** (`§1.7`; `P-IM-3`).
  **⟶ AMENDED 2026-10-11 — `(f)`'s PREMISE IS CONDITIONAL ON THE PER-NODE INDEX'S MATERIALIZATION, AND ITS SECOND CONJUNCT IS FAILABLE IN EITHER SPELLING** (`RCA-8(d)` ANNOTATE-BESIDE: **the property text of `(f)` above, its eight failure items and every sentence of the surrounding clauses STAND BYTE-FOR-BYTE; THIS clause is the operative statement of WHEN the property's premise holds and of WHICH of its items are reachable, and the gate-4 adversarial pass's `AM-2` — whose reproduction found the built node shape carrying neither list while the layer printed `HELD` — is answered here**; `A45`; `A46`; `A47`; `A48`; `DD-32`; `DD-41`; `store-model.md §1.1`'s dated clause; `§5.8` (d)'s dated clause; `parameter-semantics.md §2.14`). **THE CLAUSE, IN FOUR PARTS AND NOTHING ELSE:**
  **(1) THE PREMISE.** **`(f)`'s opening phrase *"For every node the store has minted: its `active` list holds …"* binds the nodes of a store THAT MATERIALIZES THE PER-NODE INDEX** (`store-model.md §1.1`'s dated clause: the index is optional, and `§5.8` (d) licenses its omission for the lookup path). **In a store that materializes it, every item of `(f)`'s failure list is REACHABLE and each is a DEFECT: a listener record or a callable held ON a node instead of a reference into the home · an address stored as a list entry · a `leaf` carrying a NON-EMPTY `carried` list · a reference that outlives its node · a node whose `active` and `carried` lists hold the SAME reference · a handle LOST or DUPLICATED across a change action · a list surfaced by a read, by `findAddress` or by a fresh instance over an equal `cfg.filePath` · a sixth structure minted for these lists.**
  **(2) WHERE THE INDEX IS NOT MATERIALIZED, THE PREMISE HAS NO INSTANCE AND THE PROPERTY IS NOT FALSE.** **A node of such a store carries NO `active` and NO `carried` list, so `(f)`'s *"for every node"* quantifies over nothing and the row is NOT read as `HELD`-by-absence: the omission is a DECLARED SPELLING and not an unexhibited state** (`store-model.md §1.1` parts 1–2). **And the five items of `(f)`'s list that presuppose a node-side list are UNREACHABLE THERE** — a listener record or callable held on a node, an address stored as a list entry, a `leaf` with a non-empty `carried` list, a reference outliving its node, and a node whose two lists hold the same reference — **each is named here as unreachable rather than left to a reader to find**, exactly as this register names its other unreachable items.
  **(3) THE FAILABLE HALF, IN EITHER SPELLING.** **`(f)`'s LAST TWO SENTENCES BIND IN BOTH SPELLINGS AND ARE THE ROW'S REACHABLE FAIL SET:** **the handle sets the triggers return ARE PRODUCED FROM THE HOME AND ARE CONSISTENT WITH THESE LISTS** — *"the same handles are returned whether the per-node index is consulted or the home is scanned"* — **and *"no change action LOSES or DUPLICATES a listener's handle"*.** **So `(f)` FAILS in a store with no index at all wherever a handle is MISSING from `triggered` at an address a listener's own address is a prefix of, wherever a handle is RETURNED where no listener's address is a prefix, wherever a handle is LOST or DUPLICATED by a change action that replaced a node, wherever a listener is visible through `read([])`, through `findAddress` or through a fresh instance over an equal `cfg.filePath`, and wherever `(f)`'s own two lists-consistency clauses are contradicted by the sets the surface returns** — **and not one of those states is a code.**
  **(4) WHAT THIS ROW THEREFORE CARRIES, STATED SO THE ROW ID SET IS UNMOVED:** **the row `P-SM-4` remains ONE row carrying `(a)`–`(f)`, its two strategy ids and both of its failure lists; `(f)` remains ITS property; NO ROW IS ADDED, DROPPED OR RENUMBERED and the register still carries `8` rows with the cap holding (`8 ≤ 8` ✓)** (`§0.1` item 5; `[T: the conditional premise and the failable half, so no row of this register is a verdict over a state it cannot exhibit | CONTRACT]`).
- **Clauses (f) cites.** **`store-model.md §1.1`** (the two member tables, with the leaf's empty `carried`
  rule), **`write-and-read.md §6.5` item 9** (the borrows' spelling, lifetime and the two lists) and **item 8**
  (the one home), **`§3.4`'s arms `W-1`/`W-2`/`W-6`** and `§3.3` item 3 (the change actions that destroy a
  node), **`§5.8`** (the handle sets the triggers return) and **`§1.7`** (the five-component closure).
  `[P: §11 · A45, §12 · A46 · A47, §13 · A48; T: the row's added half, taken at this contract's sixth
  bounded amendment | CONTRACT]`

#### `§5.5` `P-IM-3` — every minted node is reachable by EXACTLY ONE address path, and the store's data structures close at exactly FIVE

**THIS SECTION CARRIES THE REGISTER'S THIRD `P-IM` ROW, WHICH THE FIRST AMENDMENT'S REGISTER DECLARED AND
WHOSE ROW TEXT WAS MISSING** — **the row `§0.1` item 5's discharge and `§5.9`'s arithmetic printed as
`P-IM-3` while no section carried it: no property, no strategy id, no failure list and no cited clause**
(`[T: the row's authoring, taken at this contract's second bounded amendment so the declared id set and
the row body agree, and so the register's executed layer has no `un-run` row by construction | CONTRACT]`).
**The row's section number `§5.5` is the one the first amendment's pointer clause left declaring no row of
its own, so NO OTHER ROW IS RENUMBERED by this authoring** (`§0.1` item 5; the pointer clause that shared
this number now stands at `§5.5.1`).

- **Property.** **Every node the store has minted is reachable by EXACTLY ONE address path from the
  register** — a node's address is **its parent's address `++` its key, at ONE tier** (`§1.5` item 5,
  `DD-6`), and **no two distinct addresses resolve to one node**; **the store's data structures close at
  exactly five — `leaf` · `branch` · `anchor` · `link` · `registry` — with `tier` carried as the child
  anchor's TIER PROPERTY and never as a sixth record** (`§1.7`; `P: §12 · A17`; `P: §14 · A27`); **so for
  every node the walk reaches, exactly one of the following holds and the other is impossible: the node is
  a `leaf` reachable through exactly one child anchor whose `key` is the address's last segment, or the
  node is a `branch` reachable through exactly one child anchor and holding exactly one container.**
  **The row is the STRUCTURAL INVARIANT the round trip's value equality does not cover:** `P-IM-1` asks
  whether the VALUE read back is the value written; **`P-IM-3` asks whether the TREE that answers it is
  reachable by one path per node and built from the five declared components and nothing else.**
- **Strategy id.** **`S-STRUCT`** — drive it in three closed passes over a pinned store: **(i) the ADDRESS
  pass** — write a nested tree of depth ≥ 2 at every tier, then for every address written, assert the
  address resolves (`findAddress(address, t)` succeeds and its `anchor.tier` is `t`) and that its parent's
  container holds **exactly one** anchor at that key; **(ii) the UNIQUENESS pass** — for every pair of
  distinct segment paths differing in exactly one segment (a key against another key, an index against
  another index), assert that **at most one** of them resolves to a node — no path resolves to a node
  another path also resolves to; **(iii) the CLOSURE pass** — for every address the two passes reached,
  assert that `read` answers **either** a `leaf`'s value (`R-1`) **or** a `branch`'s assembled object/array
  (`R-2`/`R-3`) **or** the register's whole content at the empty address (`R-5`), and that
  `findAddress`'s `NodeRef.anchor` carries a `tier` whose `rank` is one of `§5.1`'s three — **so no
  address answers a sixth structure and no tier surfaces as a data structure of its own.**
- **What FAILS it.** **a node reachable at two keys**; **a node whose address path is ambiguous**;
  **a minted node no address resolves to** (an unreachable node — the same defect `DD-6`'s alternative is
  priced against); **two distinct addresses resolving to one node**; **an address whose read answers
  a structure outside `R-1`/`R-2`/`R-3`/`R-5`**; **a `tier` that surfaces as a record rather than as the
  child anchor's property** (`§1.7`: *"There is NO sixth component, no `Tier` record type, and no tier
  node"*); **a resolved `NodeRef` whose `anchor` carries no tier.**
- **Clause it cites.** `§1.5` item 5 and `§1.7` (the closure of the five components and the tier-as-property
  rule), `§2.2` (`L-2`/`L-5`, the walk that reaches a node by one path), `§5.4` (a)'s landing observable
  (`findAddress(address, t).anchor.tier === t`), and `DD-6` (the reachability default the row checks).
  `[P: §12 · A17 · A18, §14 · A27, §15 · A34; T: the row's authoring | CONTRACT]`

#### `§5.5.1` The merged register row's TIER-ORDER half — the former `P-TP-5`, now carried by the surviving row `P-SM-4`

**THIS SECTION DECLARES NO ROW OF ITS OWN.** **`P-TP-5` was merged into the surviving row `P-SM-4` at this
contract's first bounded amendment (`§0.1` item 5, dated `2026-10-11`), and the merged row's property, its
two strategy ids (`S-ARM`, `S-TIER`), its failure list and its citations stand at `§5.4` above.** **A
citation to the tier order — including the gate's own named interaction at `§5.9` — therefore names
`P-SM-4`, never a `P-TP-5` that no longer exists as a row** (`[T: the merge's own pointer, so a reader
reaching the tier order by its printed section number is not sent to a bare `§n` with no row behind it, and
no citation drifts to a retired id | CONTRACT]`). **ITS NUMBER CARRIES THE `.1` BECAUSE ITS PARENT NUMBER
NOW CARRIES THE ROW `P-IM-3`** — **the renumbering is of a POINTER and of nothing else: no row id moves,
no row's text moves, and no citation to `P-SM-4` or `P-TP-5` is affected** (`§0.1` item 5;
`[T: the section numbering's own note | CROSS-REF]`).

#### `§5.6` `P-TP-6` — the monotonic clause holds at every link, and the register's OWN bound is REAL and its tier is FIXED AT CREATION

- **Property.** **At every link whose parent anchor is carried by a `branch` — i.e. at every NESTED
  address — `rank(childAnchor.tier) ≤ rank(parentAnchor.tier)`**, **the two anchors being the ones `§3.2`
  names: the parent anchor the write's tier-agnostic parent resolution reached, and the child anchor the
  write mints at its own tier.** **AND AT THE REGISTER'S OWN LINK THE BOUND IS REAL WITH `A42` READ IN
  (⟶ AMENDED 2026-10-11): the register's parent anchor carries the register's CONDITIONAL tier — `file`
  when the construction's path is provided and passes the reachability test, `mem` otherwise, FIXED AT
  CREATION (`A42`, `A49`, `A50`; `store-model.md §1.6` item 4) — so `rank(child) ≤ rank(register tier)`
  holds there too, and the as-filed clause *"The REGISTER has no parent anchor and therefore imposes NO
  bound — all three tiers may stand at register keys, at every register key, whatever tiers its neighbours
  carry"* is SUPERSEDED and read through this one** (`A51`: *"Fails as usual for an unpermitted write"*;
  **the as-filed words stand above byte-for-byte and are printed at `§1.2` and `§1.6`, where this
  amendment's own clauses re-read them**). **A write that would violate the clause FAILS
  `ParentAnchorMonotonicityViolation` and installs nothing** (`§3.4` arm `F-6`; `§3.2` item 4) — **at a
  NESTED address and AT A REGISTER KEY alike, the register's tier being the only difference.**
- **Strategy id.** **`S-MONO`** — drive the `3 × 3` tier pairs at a nested address (write tier, parent
  tier), ONE FRESH STORE PER PAIR so the parent's version set is exactly the parent tier: **the `6` pairs
  with `rank(write tier) ≤ rank(parent tier)` SUCCEED, and the `3` pairs with `rank(write tier) >
  rank(parent tier)` FAIL with `ParentAnchorMonotonicityViolation` and leave the store unchanged**; **plus
  `3` drives at a register key OF A `file`-REGISTER STORE, all of which succeed at every one of the three
  tiers** (⟶ AMENDED 2026-10-11: the as-filed cell read *"plus `3` drives at a register key, all of which
  succeed at every one of the three tiers"* with NO qualifier; **the qualifier the register's conditional
  tier now requires is exactly this one, and the store's path is the strategy's own setup**); **plus `3`
  FURTHER DRIVES at a register key OF A `mem`-REGISTER STORE, where the `file`-tier write FAILS
  `ParentAnchorMonotonicityViolation` and the `mem`- and `temp`-tier writes SUCCEED** (⟶ ADDED 2026-10-11:
  **this is the register half of `A51`'s *"Fails as usual for an unpermitted write"* made reachable, and it
  is why the row's second clause is no longer unfailable**). **THE CENSUS, PRINTED WITH ITS TERMS: `9`
  ordered pairs over `3` tokens, of which `6` satisfy `rank(child) ≤ rank(parent)` and `3` satisfy
  `rank(child) > rank(parent)` — `6 + 3 = 9` ✓** (`[T: the cell's own arithmetic, corrected at this
  contract's second bounded amendment: the first amendment's cell printed *"the `3` pairs … the `3` pairs"*
  over a `3 × 3` table, which does not close | CENSUS]`). **The register drives are the row's second
  clause's own census and they do NOT enter the `9`: `3` at a `file` register (`3` successes) + `3` at a
  `mem` register (`1` failure + `2` successes) = `6` register drives, `3 + 3 = 6` ✓, `9 + 6 = 15` drives in
  all** (`[T: the register drives' own arithmetic, added at this contract's sixth bounded amendment so the
  register half's census closes too | CENSUS]`).
- **What FAILS it.** **a minted descendant anchor at a higher tier than its parent anchor's** (`DD-10`
  read with `§3.2` item 4); **a success at an inverted pair**; **a failure that nevertheless installed the
  parent chain**; **a register key that refuses a tier THE REGISTER'S OWN TIER PERMITS** (`rank(t) ≤
  rank(register tier)` — ⟶ AMENDED 2026-10-11: the as-filed cell read *"a register key that refuses a tier
  because of its neighbours' tiers"*, which is the un-conditional form the register's own tier now
  replaces); **a register key that ACCEPTS a tier the register's own tier forbids** (`rank(t) >
  rank(register tier)` in a `mem`-register store — the state `A51` names and the amendment's added drives
  reach); **a register whose tier MOVES after creation** (`A50`'s *"Fix at creation"*; `DD-34`); **a write
  whose tier is ignored in the parent search** (which would make the clause vacuous — the defect this row's
  property is stated against); **and — the listener half, added at this contract's sixth bounded amendment
  with the clause at `write-and-read.md §6.5` item 9 — a node that HOLDS a listener reference past a change
  action that destroyed it** (`A46`: *"The borrow is removed on node change actions because they destroy and
  replace nodes"*; the observable is a trigger returning a handle through a node the arm already replaced,
  `P-TP-8`'s drive).
- **Clause it cites.** `§1.2` (the monotonic clause over anchors), `§3.2` items 2 and 4 (the
  tier-agnostic parent resolution and the clause's evaluation), `§3.4` arm `F-6`, **`store-model.md §1.6`
  item 4** (the register's parent anchor, its carrier node and its creation-fixed conditional tier —
  ⟶ REPOINTED 2026-10-11: the as-filed cell read *"`§1.6` (the register's exemption)"*, which is the clause
  this amendment SUPERSEDES; the item that replaces it is named), **`write-and-read.md §6.5` items 9 and
  10** (the borrows' lifetime and the firing model — the row's listener half's own ground), and `§5.1`'s
  `M-1` (the rank). `[P: §12 · A18, §14 · A27; T | CONTRACT]`
  **AND THE REGISTER-HALF CELLS THIS ROW'S CITATIONS NOW RESOLVE TO, PRINTED WITH THE ROW IDS THAT CARRY
  THEM** (⟶ REPOINTED 2026-10-11; `store-model.md §2.1`'s cell *"`P-TP-7`'s register-reference cell and
  `P-TP-6`'s register half"*): **the register's own creation-fixed tier is observed by `P-TP-7`'s
  REGISTER-REFERENCE CELL, authored at that row's `§5.7` at this contract's sixth bounded amendment, AND by
  `P-TP-6`'s REGISTER DRIVES at `§5.6` — the `3` drives at a `file` register and the `3` at a `mem` register,
  `3 + 3 = 6`, inside that row's `9 + 6 = 15` census** (`[T: the citation's resolving form, so no citation
  names a cell its row does not carry | CROSS-REF]`).

#### `§5.7` `P-TP-7` — the construction is a FUNCTION of its arguments, and a bad argument fails at construction

**⟶ RE-DERIVED 2026-10-11 (`F-1`) — THIS ROW IS BROUGHT INTO AGREEMENT WITH THE FOUR AMENDED CLAUSES THAT
MOVED ITS CONTENT, AND THE AS-FILED ROW BELOW STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE, WHICH IS
THE OPERATIVE ROW TEXT** (`RCA-8(d)` ANNOTATE-BESIDE; `A49`–`A56`; `DD-17`'s operative form, `DD-29`,
`DD-34`, `DD-39`, `DD-40`; `seams-and-lifecycle.md §7.1`'s amended sequence and table; `§8.1` #12/#13;
`store-model.md §1.6` item 4 (d)). **THE ROW'S ID, ITS COUNT AND THE REGISTER'S `≤ 8` CAP ARE UNMOVED: this
re-derivation REPLACES one row's text and adds none** (`§0.1` item 5's cap algebra: `8 ≤ 8` ✓). **WHY IT
MOVES AT ALL, IN ONE LINE:** **four clauses the amendment authored — `§7.1`'s amended table and steps 2–4,
`§8.1` #12 and `#13`, `PAR-6` and `DD-17`'s operative form, and `DD-40` — moved this row's outside-value set,
its failure set and its census, so the row's own text had to follow them.**
- **Property, as RE-DERIVED.** **`storeCreate(cfg)` has EXACTLY THREE OUTCOMES AND NO FOURTH:** **(i) it
  FAILS with `ConstructionArgumentMissing` and returns NO instance — the ABSENCE of `cfg.journalLength`,
  the ONE absence the amended construction still refuses (`§7.1` step 2; `§8.1` #12; `DD-17`'s operative
  form); (ii) it FAILS with `AddressMalformed` and returns NO instance — a PRESENT argument whose SHAPE is
  not the argument's shape at all (`null`, `undefined`, `""`, a non-string `filePath`; `null`, `undefined`,
  `0`, a negative, a non-integer, a non-number `journalLength`), or a `listeners[]` value outside its domain
  (`§7.1`'s amended table; `PAR-6`, `PAR-7`, `PAR-12`; `§8.1` #1); OR (iii) it FAILS with
  `FilePathUnreachable` and returns NO instance — a `filePath` that was PROVIDED and fails the
  construction-time reachability DRY RUN (`§8.1` #13; `seams-and-lifecycle.md §7.1` step 4; `DD-40`) — OR
  **(iv) it returns an instance that is EMPTY and whose every argument is honoured:** **the register holds
  `0` keys; the journal holds `0` entries; the register's tier is FIXED AT CREATION to `file` where a
  REACHABLE path was provided and to `mem` where the path was ABSENT, and it never moves (`§5.6`'s register
  clause; `store-model.md §1.6` item 4 (d); `DD-34`); the journal's bound is `cfg.journalLength` entries
  (`DD-16`); and the HOME MAP holds exactly the `listeners[]` entries the construction accepted — `0` for an
  empty array, `2` for `2` entries at one address with their OWN handles (`DD-39`) — populated BEFORE the
  registry is generated (`§7.1` step 5; `A56`), so the register's carrier node carries the listener
  references FROM THE OUTSET (`write-and-read.md §6.5` item 8 (d)).** **AND THE INDEPENDENCE CLAUSE, STATED
  WITH ITS TERMS SO THE `file` HALF IS NOT READ AS CONTRADICTING THE BOOT** (`DD-14`): **two instances built
  from equal arguments are INDEPENDENT — no register key, no `mem`/`temp` state, no journal entry and no
  listener registration is shared between them, and each owns its own `file`-tier handle and its own commit
  path; a write performed through one instance is INVISIBLE to the other through every read, every rollback
  and every returned list, and only a FRESH `storeCreate(cfg)` with an equal `filePath` sees the committed
  bytes — and it sees them BECAUSE OF `§7.2` ITEM 6'S BOOT-LOAD, NOT BECAUSE THE TWO INSTANCES SHARE STATE**
  (`[T: the independence clause's corrected terms, at this contract's second bounded amendment; `A16`'s
  *"File path is passed to store on first creation"* makes the path an INPUT and never a channel between
  two live instances | CONTRACT]`).
- **Strategy id.** **`S-CONSTRUCT`** — drive **`§7.1`'s amended table, cell by cell, argument by argument,
  plus its two reachability states, plus the boot cell.** **THE CELL LIST, PRINTED WHOLE SO THE COUNT IS
  AUDITABLE:** **(1)** `filePath` — **ABSENT (LEGAL: the register is created at `mem`, NO failure —
  `A49`)** · `null` · `undefined` · `""` · a non-string · a string that FAILS the reachability test
  (`FilePathUnreachable`) · a path that IS a directory (`FilePathUnreachable`) · a path whose PARENT
  DIRECTORY does not exist (`FilePathUnreachable`) · a REACHABLE path (`file` register); **(2)**
  `journalLength` — ABSENT (`ConstructionArgumentMissing`) · `null` · `undefined` · `0` · negative ·
  non-integer · non-number; **(3)** `listeners[]` — ABSENT · `null` · `undefined` · a non-array · an array
  carrying an entry that is not an `{ address, handle }` record · an entry whose `address` is outside
  `PAR-1`'s domain; **(4)** the `listeners[]` LEGAL states — the EMPTY array, and `2` entries at ONE address
  (the duplicate, both handles kept); **(5)** the boot cell (`DD-29`: a `file` content carrying a register
  key whose value lies outside `§1.4`'s admitted set, where the register the instance begins with holds
  exactly the keys whose values the taxonomy admits, `0` registrations loaded, and NO code is produced for
  the dropped key); **then (6) the valid state and the independence drive** — mutate one instance and
  re-read the other, over `mem`-tier state and one equal-`filePath` pair (`DD-14`'s corrected terms).
- **The census, PRINTED WITH ITS TERMS.** **THE STRATEGY'S CELLS ARE `§7.1`'s OWN AMENDED TABLE'S STATES
  PLUS THE AMENDMENT'S THREE ADDED CELL GROUPS, AND THE ARITHMETIC CLOSES IN ITS OWN TERMS:**
  **`filePath`'s outside values are now SIX — `null` · `undefined` · `""` · a non-string · a string that
  fails the reachability test · a value that is not a string at all is counted once, so the six print as
  `5` shape/domain states + `1` reachability state, `5 + 1 = 6`** — **of which the REACHABILITY state is one
  answer (`FilePathUnreachable`) with TWO named pre-states (`DD-40`'s absent parent directory, and the path
  that IS a directory), `1 + 2 = 3` drives**; **`journalLength`'s outside values are `7` (`2` shape-less +
  `5` out-of-domain, `2 + 5 = 7`)**; **`listeners[]`'s outside values are `6` (`3` shape-less —
  ABSENT/`null`/`undefined` — + `1` non-array + `2` malformed-entry classes, `3 + 1 + 2 = 6`)**; **the
  `listeners[]` legal states are `2` (the EMPTY array and the DUPLICATE); the `filePath` LEGAL states are
  `2` (ABSENT → `mem`, and a reachable path → `file`); and the boot cell is `1`.** **SO THE ROW'S CELLS ARE
  `6 + 3 + 7 + 6 + 2 + 2 + 1 = 27` — with the terms printed: `6` `filePath` outside states, `3` of which are
  reachability drives; `7` `journalLength` outside values; `6` `listeners[]` outside values; `2`
  `listeners[]` legal states; `2` `filePath` legal outcomes; and `1` boot cell — `6 + 7 + 6 + 2 + 2 = 23`
  states plus the `1` boot cell, and the `2`-pre-state reachability split counted as `2` extra drives,
  `23 + 1 + 3 = 27` ✓** (`[T: the strategy's own accounting, re-derived at this contract's sixth bounded
  amendment, with the as-filed count named below | CENSUS]`). **THE AS-FILED COUNT IS SUPERSEDED AND NAMED:
  the row's property cell read *"the `4` argument states"* at the first amendment and *"`10` outside values
  … `10 + 2 + 1 = 13` cells"* after the second; both stand byte-for-byte above and BOTH ARE STALE, because
  `filePath`'s ABSENT arm LEFT the outside set (`A49`) and the amendment's reachability, `listeners[]` and
  boot cells JOINED it.**
- **What FAILS it.** **a defaulted `journalLength`** (`DD-16`); **an instance returned from a missing or
  malformed argument**; **an instance returned from a PROVIDED-BUT-UNREACHABLE path** (`§8.1` #13; `DD-40`);
  **a probe that creates a file, a directory or a byte** (`A55`: the probe is a DRY RUN **and** the reachability
  test is *"the application can write it successfully"*); **`FileCommitFailed` raised AT CONSTRUCTION**
  (the directory state at construction answers `FilePathUnreachable`; the same state reached LATER by a
  `file`-tier write remains `FileCommitFailed`, `DD-40` (b)); **a non-empty initial register**; **a register
  whose tier MOVES after creation, or a `file`-tier register in a store created with NO path** (`DD-34`);
  **a shared register key, `mem`/`temp` state, journal entry or listener registration across two
  instances**; **a reading of the independence clause that makes one live instance's `file`-tier state
  visible to another without a fresh `storeCreate`**; **a home NOT populated from `listeners[]`, populated
  AFTER the registry, or populated from a source other than the array** (`A56`; `§7.1` steps 5–6, whose order
  is the ruling's whole point); **an EMPTY `listeners[]` refused, a DUPLICATE collapsed to one entry, a
  duplicate rejected with a code, or two entries at one address sharing ONE handle** (`DD-39`); **a handle
  the caller supplied at construction NOT returned by a trigger whose address its listener's address is a
  prefix of** (`§6.5` item 8 (d); `§5.8` (a)); **AND — ADDED 2026-10-11 (`DD-42`, the gate-4 adversarial pass's `AM-4`) — a `listen`-minted token that COLLIDES with a token the home already holds** (**`listen` skips a candidate token the home holds and mints the next one, so `unlisten` removes exactly the entry it names and `triggered` carries no duplicated member; the CALLER-SPELLED duplicate token is the one lawful collision and its mis-targeting is the DECLARED ANSWER, `DD-42`; `§0.4`'s `ListenerHandle` construction rule's dated clause; `PAR-13`**); **AND — ADDED 2026-10-11 (`DD-45`, the pass's `AM-10`) — a PROVIDED path that is mode-writable but IN FACT unwritable (a read-only mount, an ACL deny, an ownership mismatch)**: **the probe answers REACHABLE and `storeCreate` returns an instance, and the failure surfaces LATER as `FileCommitFailed` on the first `file`-tier write — that later answer being `DD-45`'s DECLARED CONSEQUENCE** (`seams-and-lifecycle.md §7.1` step 3's dated clause; `§8.1` #15); **a registration loaded by the boot, or a registration
  journaled or committed** (`DD-38`); **a boot that FAILS on a non-admitted value class, or that mints a node
  for it** (`DD-29`); **a `file` content whose admitted keys are not all loaded** (`§7.2` item 6).
- **Clause it cites.** `§7.1` (the amended construction sequence, steps 2–6, and its amended table), `§7.2`
  items 1, 5 and 6, `§6.1` items 3 and 4, `§6.3`, `§8.1` (#1, #12, #13), `§5.6`'s register clause and
  `store-model.md §1.6` item 4 (d) (the register's creation-fixed tier), `§6.5` item 8 (d) and §6.5 item 12
  (the home's construction population and the handle), and the `DD` rows the amendment authored: `DD-14`,
  `DD-16`, `DD-17`, `DD-29`, `DD-34`, `DD-38`, `DD-39`, `DD-40`. `[P: §9 · A4, §11 · A16, §14 · A31, §15 ·
  A49 · A50 · A51, §16 · A52 · A53, §17 · A54 · A55 · A56; R: §17.4 | CONTRACT]`
- **⟶ THE AS-FILED ROW TEXT BEGINS HERE AND STANDS BYTE-FOR-BYTE, READ THROUGH THE RE-DERIVATION ABOVE**
  (`RCA-8(d)` ANNOTATE-BESIDE): **its property (the two-outcome form and the independence clause), its
  `S-CONSTRUCT` strategy cell (with `filePath` absent among its outside values and its `13`-cell census),
  its failure list (which names *"an instance that cannot reach the file its own cfg named"* as an
  observable) and its citations are the PRE-AMENDMENT row; NOTHING below is deleted, and the operative row
  is the one above.**

- **Property.** **`storeCreate(cfg)` either (i) fails with `ConstructionArgumentMissing` (or
  `AddressMalformed` for a malformed present argument) and returns NO instance, or (ii) returns an instance
  that is EMPTY — the register holds `0` keys, the journal holds `0` entries, nothing is watched — and
  whose `file` tier is bound to `cfg.filePath` and whose journal bound is `cfg.journalLength` entries.**
  **AND THE INDEPENDENCE CLAUSE, STATED WITH ITS TERMS SO THE `file` HALF IS NOT READ AS CONTRADICTING THE
  BOOT** (`DD-14`): **two instances built from equal arguments are INDEPENDENT — no register key, no
  `mem`/`temp` state, no journal entry and no watched registration is shared between them, and each owns its
  own `file`-tier handle and its own commit path; a write performed through one instance is INVISIBLE to the
  other through every read, every rollback and every watched list, and only a FRESH `storeCreate(cfg)` with
  an equal `filePath` sees the committed bytes — and it sees them BECAUSE OF `§7.2` ITEM 6'S BOOT-LOAD, NOT
  BECAUSE THE TWO INSTANCES SHARE STATE** (`[T: the independence clause's corrected terms, at this
  contract's second bounded amendment; `A16`'s *"File path is passed to store on first creation"* makes the
  path an INPUT and never a channel between two live instances | CONTRACT]`). **AND THE ROW'S
  REGISTER-REFERENCE CELL, NAMED SO `store-model.md §2.1`'s CITATION RESOLVES TO A CELL THIS ROW CARRIES:**
  **`findAddress([], t)` — and every walk at the empty address — answers ONE reference, the register's, and
  that reference's `anchor.tier` is THE REGISTER'S OWN TIER in every case, whatever `t` the caller passed:**
  **it is `file` in a store whose provided path passed the reachability test, `mem` in a store created with an
  ABSENT path, and the caller's `t` selects nothing** (`store-model.md §2.1`'s amended empty-address clause;
  `store-model.md §1.6` item 4 (d); `A41`/`A42`/`A49`/`A50`; `DD-34`). **So the register's tier is a FUNCTION
  OF THIS CONSTRUCTION'S OWN ARGUMENTS and of nothing else** — **the construction row's own subject —
  which is why the cell is this row's and not `P-SM-4`'s landing half's** (`[T: the register-reference cell,
  authored at this contract's sixth bounded amendment | CONTRACT]`). **⟶ AMENDED 2026-10-11 — THE CELL'S
  SECOND OBSERVABLE, NAMED SO `DD-44`'s CITATION OF THIS CELL RESOLVES CELL-FOR-CELL** (`RCA-8(d)`
  ANNOTATE-BESIDE: **every sentence above stands byte-for-byte**; `AM-11`; `DD-44`'s dated clause; `§0.4`'s
  marker clause; `[T: the register-reference cell's second observable | CONTRACT]`): **the same answer carries
  the register's own reference's MARKER — `findAddress([], t).anchor.register_marker == true`, TRUE on exactly
  one reference in a store — while every reference a segment reaches carries `false`, so a store whose register
  holds a `""` key answers `findAddress([""], t).anchor.register_marker == false`; the cell's `2` observables
  are therefore the REFERENCE (with the register's own creation-fixed tier, stated above) and THE MARKER.**
  **The cell's row, its strategy and its `27`-cell census are unmoved (`P-TP-7`, `S-CONSTRUCT`; `8 ≤ 8` ✓).**
- **Strategy id.** **`S-CONSTRUCT`** — drive **`§7.1`'s own outside-value list, cell by cell** (`filePath`
  absent · `null` · `undefined` · `""` · a non-string; `journalLength` absent · `0` · negative ·
  non-integer · non-number), then **the valid state**, then independence: mutate one instance and
  re-read the other; **plus the BOOT's own cell — a `cfg.filePath` whose content carries a register key whose
  value lies outside `§1.4`'s admitted set, where the register the instance begins with holds exactly the keys
  whose values the taxonomy admits and NO code is produced for the dropped key** (`DD-29`; `§7.2` item 6).
  **THIS CELL IS SUPERSEDED BY THE RE-DERIVED CELL LIST ABOVE, WHICH IS THE OPERATIVE ONE** (⟶ the as-filed
  cell's `filePath` list *"absent · `null` · `undefined` · `""` · a non-string"* is read as *"`null` ·
  `undefined` · `""` · a non-string · an unreachable path · a directory path · an absent-parent-directory
  path · the reachable and absent LEGAL arms"*, and its `listeners[]`, duplicate, empty, order and boot
  cells are added there).
  **THE CENSUS, PRINTED WITH ITS TERMS: the strategy's cells are `§7.1`'s OWN TABLE'S
  ROWS — `2` valid-argument states and `10` outside values across the two arguments, each with its
  declared answer, plus `1` boot cell (`DD-29`), so `10 + 2 + 1 = 13` cells** (`[T: the cell's count,
  corrected at this contract's second bounded amendment: the
  first amendment's cell printed *"the `4` argument states"*, which is fewer than `§7.1`'s tables declare;
  the strategy enumerates the TABLE, not a count | CENSUS]`). **THIS CENSUS IS STALE AND THE OPERATIVE ONE IS
  `27` (`6 + 3 + 7 + 6 + 2 + 2 + 1 = 27` ✓), printed with its terms in the re-derived cell list above.**
- **What FAILS it.** **a defaulted `journalLength`** (`DD-16`); **an instance returned from a bad
  argument**; **a non-empty initial register**; **a shared register key, `mem`/`temp` state, journal entry
  or watched registration across two instances**; **an instance that cannot reach the file its own cfg
  named**; **a reading of the independence clause that makes one live instance's `file`-tier state
  visible to another without a fresh `storeCreate`**.
  **THIS FAILURE LIST IS SUPERSEDED BY THE RE-DERIVED ONE ABOVE AND ITS STALE ITEM IS NAMED SO IT IS NOT READ
  AS OPERATIVE:** **the entry *"an instance that cannot reach the file its own cfg named"* was the observable
  of a path state that THIS SAME AMENDMENT moved — a directory-valued path and an absent-parent-directory
  path are now CONSTRUCTION failures (`FilePathUnreachable`, `§8.1` #13, `DD-40`), not an instance that
  cannot reach its file; the pre-state a `file`-tier WRITE leaves behind (`FileCommitFailed`, `§8.1` #15)
  remains and is `P-TP-9`'s, not this row's** (`DD-40` (b); `DD-25`).
- **Clause it cites.** `§7.1`, `§7.2` items 1 and 6, `§6.1` item 4, `§6.3`, `§8.1`,
  **`§8.1` #12 and #13 (`ConstructionArgumentMissing`, `FilePathUnreachable`), `§5.6`'s register clause,
  `store-model.md §1.6` item 4 (d), `§6.5` items 8 (d) and 12, `PAR-12`, `PAR-13`, and `DD-29`/`DD-34`/
  `DD-39`/`DD-40` — ADDED 2026-10-11, so the row's citations name the amended clauses its re-derived text
  reads.** `[P: §9 · A4, §11 · A16, §14 · A31; R: §17.4 | CONTRACT]`

#### `§5.8` `P-TP-8` — the LISTENER SURFACE and the journal are TOTAL FUNCTIONS of the store's addresses

**⟶ RE-DERIVED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT), ON `A43`,
`A45`–`A48`, `A57` AND `A58`** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed row below — *"the watcher and the
journal are TOTAL FUNCTIONS of the store's addresses"*, with its `S-WATCH` strategy and its failure list —
STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE, WHICH IS THE OPERATIVE ROW TEXT**; **the row id, the
row COUNT and the register's `≤ 8` cap are UNMOVED: this re-derivation REPLACES one row's text and adds
none**, `AR-5`'s condition and `§0.1` item 5's cap algebra: `8 ≤ 8` ✓).
**WHY THE ROW MOVES AT ALL, IN ONE LINE:** **`A58` rules the shipped `watch` surface a STOPGAP superseded by
the listener surface, so the row that observed the stopgap must observe the listener** — *"Watch is a
stopgap for the listener implementation"* — **and `A43` adds the second trigger event the stopgap's row
could not see.** **The row's SUBJECT is unchanged — a registration surface whose answer is a total function
of the store's addresses, together with the journal's own totality — and only the surface it names is now
the listener's.**

- **Property, as RE-DERIVED.** **(a) THE HANDLE SET IS EXACTLY THE TRIGGERED SET.** **After any successful
  `write` at address `X` with the write's tier `t`, `WriteResult.triggered` is EXACTLY the set of `handle`s
  whose listener is registered at an address `W` that is a PREFIX of `X` (descendant-inclusive, `DD-18`),
  **and NO MEMBER is added and none omitted** — **the store RETURNS these handles and INVOKES NOTHING**
  (`A57`; `write-and-read.md §6.5` item 10 (d)). **(b) THE SECOND TRIGGER EVENT.** **After any successful
  `delete` THAT REMOVED AT LEAST ONE VERSION, `DeleteReceipt.triggered` is EXACTLY the set of `handle`s
  whose listener binds at a PREFIX of the deleted address, under the same no-add/no-omit rule**
  (`A43`: *"listeners don't fire on read, they fire on write/delete"*); **a `delete` that removed nothing
  (`D-3`) carries `triggered: []`, and a `read`, a `findAddress`, a `rollback` and the boot fire NOTHING
  and carry no handle list.** **(c) THE ONE HOME.** **Both sets are computed from the ONE authoritative
  home map, which CONTAINS LISTENERS AND NOTHING ELSE and stands SEPARATE FROM THE REGISTER AND THE GRAPH
  (`A45`, `A48`) — so neither set is a function of any node, any container, any tier or any value, and a
  registration's own lifetime does not enter either set.** **(d) THE BORROWS DO NOT WIDEN OR NARROW THE
  SETS.** **The per-node reference lists (`A47`) are an INDEX FOR LOOKUP COST only: the same two sets must
  be produced whether the index is consulted or the home is scanned — a node's borrows DROPPED WITH THE
  NODE (`A46`) and a node's `active`/`carried` split (`A47`) change NO membership. **⟶ AMENDED 2026-10-11 — WHAT THIS HALF'S OMISSION LICENSES, AND WHAT IT DOES NOT: THE TWO SETS ARE LICENSED TO BE PRODUCED WITHOUT THE INDEX, AND THE INDEX ITSELF IS DECLARED OPTIONAL RATHER THAN LEFT TO BE INFERRED FROM THE OMISSION** (`RCA-8(d)` ANNOTATE-BESIDE: **the sentences above stand byte-for-byte**; `A45`; `A47`; `DD-41`; `store-model.md §1.1`'s dated clause; `write-and-read.md §6.5` item 9's dated clause; `parameter-semantics.md §2.14`; the gate-4 adversarial pass's `AM-2`). **THE CLAUSE, IN THREE PARTS:** **(1)** **this sentence licenses the omission of the LISTS FROM THE LOOKUP PATH and of nothing else — a store that scans the one home at each trigger satisfies it, and `store-model.md §1.1`'s two added members, `DD-32`'s spelling and `P-SM-4`'s `(f)` are read through the OPTIONALITY that licence requires, which `store-model.md §1.1`'s dated clause now states outright**; **(2)** **the two sets remain FAILABLE in BOTH spellings**: where the index exists, a stale, mis-addressed, duplicated or outliving reference fails `(f)`; where it does not, **a MISSING handle where a listener's address is a prefix of the write's, a handle returned where no listener's address is a prefix, and a handle LOST or DUPLICATED by a change action all fail this row's `(a)`/`(b)` observables, and none of them is a code**; **(3)** **NO CLAUSE OF THIS ROW OWES A NODE-SIDE MEMBER, and the register's carrier node's *"carries the listener references FROM THE OUTSET"* is produced from the home `§7.1` step 5 populated where no index is materialized** (`store-model.md §1.1` part 2).** **(e) THE `watched`
  HALF, KEPT.** **`WriteResult.watched` remains EXACTLY the set of registered watched ADDRESSES `W` whose
  registration satisfies the prefix test AND — where that registration was made WITH a tier argument —
  the write's tier is one of its tier arguments** (`§6.5` item 7 (i)/(ii); `DD-26`), **with no member added,
  none omitted, and one address registered at two tiers yielding ONE member** — **the superseded surface's
  own answer, KEPT BESIDE the handle set so no shipped member is silently re-meaned** (`DD-35`). **(f) THE
  ORDER IS NOT OBSERVABLE.** **Neither list's ORDER is asserted: both are SETS and the drive compares them
  as sets** (`DD-37`; the as-filed row's own sentence, *"The `watched` list's order is not declared
  (`DD-23`)"*, is thereby EXTENDED to the handle lists, and `§6.5` item 5's *"NO ORDER IS DECLARED"* stands
  for both). **(g) THE JOURNAL HALF, UNMOVED.** **`WriteResult.op.opId` subsequently resolves in the
  journal: `rollback(opId)` does not fail `JournalOpUnknown`** (`§6.2`, `§6.3`; `§6.4` `M-11`), **and the
  journal's tracked verbs remain exactly `write` and `delete`** (`§6.1`) — **a registration appends no
  entry, and the home is out of the `file` bytes and out of the journal** (`DD-38`).
- **Strategy id, as RE-DERIVED.** **`S-WATCH`** — **the strategy id is KEPT** (`AR-5`'s cap algebra and the
  register's declared executed layer both read a row's `strategy` cell by its id, and a renamed strategy
  would re-number no row but would break the executed layer's own citations), **and its drives are
  re-derived: (i) the PREFIX drive** — bind listeners at a write's own address, at a strict ancestor, at a
  strict descendant and at an unrelated address, then assert `triggered` equals `{own, ancestor}`'s handles
  and excludes the other two; **(ii) the SECOND-EVENT drive** — the same four binds, then a `delete` at the
  write's address, asserting `triggered` equals `{own, ancestor}`'s handles, **and a `D-3` delete asserting
  `triggered: []` with `tiers: []`**; **(iii) the NO-TIER-TEST drive** — bind at an address a write's
  address has as a prefix and write at every one of the three tiers, asserting the handle is returned EACH
  time (`DD-36`: nothing carries over from the superseded qualifier); **(iv) the DESTRUCTION drive** — bind
  at an address, `write` through it so the arm replaces the node that carried the borrow (`W-1`/`W-2`/`W-6`
  each in turn), and assert the NEXT trigger still returns that listener's handle exactly once
  (`A46`; **the borrow's drop is observed as NO LOST AND NO DUPLICATED handle**); **(v) the HOME-IS-NOT-A-
  GRAPH-STRUCTURE drive** — assert `read([])`'s object carries **no listener entry**, that `findAddress`
  reaches no home entry at any address, and that a fresh instance over an equal `cfg.filePath` begins with
  `triggered: []` on its first write (`A48`; `DD-38`); and **(vi) the `watched`-and-`opId` drive** — the
  as-filed row's own two drives, KEPT and unweakened: `watched`'s membership over `§6.5` item 7 (c) and the
  returned `opId`'s acceptance by `rollback` (`P-TP-8`'s journal half).
  **⟶ RE-DERIVED 2026-10-11 (`F-3`) — THE CELL `(vi)` IS RE-DERIVED TO THE STATES THE AMENDED SURFACE CAN
  REACH, AND ITS TIER-QUALIFIED HALF IS DECLARED **OUT** WITH ITS REASON AND ITS PRICED ALTERNATIVE**
  (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed `(vi)` text above — *"`watched`'s tier-qualified membership over
  `§6.5` item 7 (a)/(b)/(c), and the returned `opId`'s acceptance by `rollback`"* — STANDS BYTE-FOR-BYTE and
  THIS clause is the operative statement of what the cell drives**; `A58`; `DD-26`; `DD-36`;
  `parameter-semantics.md §2.13`/`§2.14`). **THE REASON, IN THREE CLAUSES AND NOTHING ELSE — NO REGISTRATION
  CAN BE TIER-QUALIFIED AFTER THIS AMENDMENT:** **(i)** **`A58` supersedes `watch`/`unwatch` in ONE PASS with
  NO deprecation window** — *"both surfaces do NOT stand briefly … ONE pass lands the replacement"* — **so the
  tier qualifier `DD-26` authored belongs to a superseded verb and no live verb carries it; (ii) `listen`'s
  arity is ONE ADDRESS AND NO TIER** (`§3.1.1`'s amended `listen` row and its added item 4) **and the
  construction's `listeners[]` element shape is `{ address, handle }` with NO THIRD MEMBER** (`§0.4`; `A57`);
  **(iii) `DD-36` rules the ADDRESS the WHOLE of a registration's key** — *"NOTHING carries over from the
  superseded registration's tier qualifier"* — **so no path into the home can carry a tier, and
  `§6.5` item 7 (a)'s pre-state (*"a registration made WITH a tier argument"*) and (b)'s pre-state (*"one
  address registered at TWO tiers"*) HAVE NO INSTANCE.** **THE CELL `(vi)` AS RE-DERIVED DRIVES THREE
  REACHABLE STATES AND ASSERT THE SAME MEMBER:** **(1)** the kept `opId` half, UNWEAKENED — the returned
  `opId` is accepted by `rollback(opId)` and does not fail `JournalOpUnknown` (`§6.2`, `§6.3`, `§6.4`
  `M-11`); **(2)** the `watched` half at the ONE item-7 state a listener surface can reach — **item 7 (c):
  a registration never adds an address the PREFIX test excludes** — together with the list's DISTINCTNESS
  (one address yields ONE member) and its `[]`-iff-nothing-matches rule; and **(3)** the new consistency
  assertion the re-derivation owes in place of the unreachable tier test: **`watched` is exactly the ADDRESS
  PROJECTION of `triggered` — the two lists carry the same count and `watched`'s `i`-th member is the address
  whose listener carries `triggered`'s `i`-th handle** — so one write's two lists are the same selection
  observed in two types (`§6.5` item 10 (d); `write-and-read.md §3.6`'s amended member set).
  **⟶ RE-DERIVED AGAIN 2026-10-11 (`AM-3`) — CELL `(3)` IS RE-STATED, BECAUSE AS FILED IT WAS FALSE IN A STATE `DD-39` DECLARES LAWFUL AND ASSERTED AN ORDER `(f)` DECLARES NOT OBSERVABLE** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence of the `(vi)` cell above — its `(1)`, its `(2)` and its `(3)` — stands byte-for-byte, and THIS clause is the operative statement of what `(3)` asserts**; `DD-39`; `DD-37`; `DD-42`; `§5.8` (f); `§6.5` item 10 (d); `write-and-read.md §3.6`; `parameter-semantics.md §2.12`/`§2.13`). **THE DEFECT, NAMED IN THE STATE THAT EXHIBITS IT:** **`(3)` as filed read *"`watched` is exactly the ADDRESS PROJECTION of `triggered` — the two lists carry the same count and `watched`'s `i`-th member is the address whose listener carries `triggered`'s `i`-th handle"* — and that is FALSE where `DD-39`'s duplicate is in the home or where a caller-supplied token repeats: a `listeners[]` array carrying `[ {["a"],H1}, {["a"],H2} ]` makes one write at `["a"]` answer `triggered` with TWO handles and `watched` with ONE address, so the counts differ and the `i`-th correspondence is undefined; and BOTH lists' orders are `(f)`'s NON-OBSERVABLE, so no `i`-th correspondence can be asserted at all.** **CELL `(3)` AS RE-DERIVED, IN THREE ASSERTIONS AND NOTHING ELSE:**
  **(3a) THE SET CLAIM.** **`watched`'s members are EXACTLY the DISTINCT addresses of the listeners `triggered` names** — **so `watched`'s count equals the number of DISTINCT addresses among the listeners whose handles `triggered` carries, and NO address appears in `watched` that no triggered listener binds at.** **Under `DD-42`'s mint rule this makes `watched.len() == triggered.len()` hold in every state where EACH triggered address carries ONE home entry** — the ordinary case — **while the `DD-39` duplicate state gives `watched.len() == 1` against `triggered.len() == 2` BY THE CONTRACT'S OWN DECLARATION, and that INEQUALITY IS NOT A FAILURE.**
  **(3b) THE CORRESPONDENCE, ORDER-FREE.** **For EVERY member `h` of `triggered`, the home entry carrying `h` has an address that IS a member of `watched`; and for EVERY member `W` of `watched` there EXISTS at least one member of `triggered` whose home entry is keyed at `W`.** **Both directions are asserted as SET MEMBERSHIP over the (handle, address) PAIRS the home holds — NEVER as an index-into-index correspondence**: **neither list's order is declared (`§5.8` (f); `DD-37`), so `watched`'s `i`-th member is NOT the address of `triggered`'s `i`-th handle and the drive MUST NOT assert one.**
  **(3c) THE COUNTS, STATED SO THE PRECONDITION IS EXPLICIT.** **`watched.len() == triggered.len()` is asserted ONLY in the state where NO triggered address carries more than one triggered listener** — **and that precondition is written into the drive, not assumed: where the fixture holds a `DD-39` duplicate (two entries at one address) or two construction entries carrying ONE caller-spelled token, the drive asserts (3a) and (3b) and asserts the counts' INEQUALITY as the DECLARED ANSWER** (`DD-39`'s *"the home then holds two entries at one address with two DIFFERENT handles, and a trigger returns both"*; `DD-42`'s duplicated-member clause). **NO ASSERTION IS DROPPED: (3) still adds ONE consistency assertion to the kept cell, and it is now a SET assertion over the home's pairs instead of an order-dependent projection.**
  **WHY THIS IS A RE-DERIVATION AND NOT A WEAKENING, IN ONE LINE:** **the as-filed `(3)` asserted an ORDER the row itself declares not observable and a COUNT that a lawful state contradicts; the re-derived `(3)` asserts exactly what the contract does guarantee — that the two returned sets are two views of ONE selection over the home — and it names the lawful state in which the counts differ instead of failing there.** **ITS `alt`, PRICED, AND ITS REVERSAL POINT:** **the alternative — ASSERTING THE `i`-th CORRESPONDENCE by DECLARING AN ORDER for both lists — is priced: it would reverse `DD-37` (which prices a declared order's own cost: a monotonic ordinal on `ListenerEntry` that the home does not otherwise need, and a re-registration's position made observable, which no ruling names) and it would make the two lists' correspondence a function of a registration order the store does not carry; **available only with `DD-37` reversed by its own instrument** — **REVERSAL POINT: a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded** (`DD-37`'s own; `§0.2`'s preamble).

  **AND THE ROW'S FAILURE LIST IS RECONCILED TO THAT RE-DERIVATION, SO NO ITEM IS FAILED BY A DECLARED STATE** (`RCA-8(d)` ANNOTATE-BESIDE: **every item of the failure list below stands byte-for-byte and is READ through this clause**; `DD-39`; `DD-42`; the gate-4 adversarial pass's `AM-3`). **TWO ITEMS ARE READ IN THEIR EXACT SCOPE:** **(i) *"a duplicated watched address"* MEANS ONE ADDRESS APPEARING TWICE IN `watched` — a repeated member in a list declared a SET — and NEVER the `DD-39` duplicate case, where ONE address is `watched`'s ONE member while `triggered` carries its TWO handles: that state is LAWFUL and its counts differ BY DECLARATION** (`DD-39`; `(3a)`/`(3c)` above). **(ii) *"a member absent from `triggered`"* IS FAILED WHERE THE TRIGGERED SET OMITS A HANDLE THE HOME HOLDS FOR A PREFIX-MATCHING LISTENER, and NEVER where the counts between the two lists differ: the correspondence is asserted as SET MEMBERSHIP over the home's (handle, address) pairs, never as an index-into-index match** (`(3b)` above). **AND THE DECLARED-OUT ITEM 7 (a)/(b) SURVIVES THIS PASS UNCHANGED AND IS NOT RE-OPENED:** **no verb or argument carries a tier, the tier-qualified registration's pre-state still has no instance, and the audit that found the declaration surviving stands** (`§5.8`'s `F-3` clause above; `A58`; `DD-26`; `DD-36`).
  **WHY THIS IS A RE-DERIVATION AND NOT A WEAKENING, IN ONE LINE:** **no assertion is dropped from the kept
  cell — the `opId` half stands whole, the membership and distinctness assertions stand whole, and a THIRD
  assertion (the address/handle correspondence) is ADDED; the only thing removed is a drive whose PRE-STATE
  the amendment itself makes unreachable.**
  **ITS `alt`, PRICED, AND ITS REVERSAL POINT** (`[T: the OUT declaration's own `DECLARED-DEFAULT` carriage,
  per `§0.1` item 3 and item 11's closed class set | DECLARED-DEFAULT]`): **the alternative — KEEPING a
  tier-qualified registration on the listener surface so item 7 (a)/(b)'s pre-state exists again — is priced:
  it would re-open the tier member `DD-36` strikes from the listener's record, grow `ListenerEntry`'s closed
  two-member set into a three-member one (`A57`), give one address TWO firing rules at once (the suppression
  item 7 (a) declares and the prefix test item 10 (d) declares), and make `triggered` a function of the
  write's TIER — which `§5.8`'s own re-derived failure list names as a DEFECT (*"a handle set that depends on
  the write's TIER"*, `DD-36`); it is available only with `A57` and `A58` re-read together.** **AND THE
  SUPERSEDED CELL IS NAMED RATHER THAN LEFT FOR A READER TO FIND: the tier-qualified half of the as-filed
  `(vi)` is a drive of the STOPGAP surface's own row (`§5.8`'s as-filed text below), whose clause is
  `§6.5` item 7 (a)/(b) via `DD-26`; `DD-26` is not reversed by this clause and its cell stands unmoved, its
  subject now having no live instance.** **REVERSAL POINT: a bounded amendment of
  `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded.**
  **THE CENSUS, PRINTED WITH ITS TERMS: the strategy's drives are `6` (`i` + `ii` + `iii` + `iv` + `v` +
  `vi`), of which the two the as-filed row carried are KEPT WHOLE (`vi` counts as one cell and carries
  BOTH of them) — so `5` new drive cells + `1` kept cell = `6` cells, and `0` cell of the as-filed row is
  dropped** (`[T: the strategy's own accounting, with the kept cell named | CENSUS]`).
- **What FAILS it, as RE-DERIVED (the as-filed failure list STANDS WHOLE and each item is carried).**
  **⟶ AND THE THREE ITEMS WHOSE PRE-STATE THE AMENDMENT MAKES UNREACHABLE ARE NAMED HERE, SO THE ROW'S FAIL
  SET IS READ AS WHAT IT IS — `P-SM-4`'s ROW AND THIS ROW'S OWN `(i)`–`(v)` FAILURES ARE THE ROW'S REACHABLE
  FAIL SET, AND THESE THREE STAND AS CLAUSES WITH NO LIVE PRE-STATE** (`F-3`; `A58`; `DD-26`; `DD-36`): **the
  item *"a tier-qualified registration RETURNED after a write at a tier it does not name"*, the item *"a tier
  test applied to an UNQUALIFIED registration"*, and the *"REGISTERED AT TWO TIERS"* half of the duplicated-
  address item each presuppose a TIER-QUALIFIED registration, and `§6.5` item 7 (a)/(b)'s pre-state has no
  instance after this amendment** — **they are not dropped, they are not weakened, and the row remains
  FAILABLE through every remaining item: a MISSING handle where a listener's address is a prefix of the
  write's, a handle returned where no listener's address is a prefix, a member absent from `triggered`, a
  `D-3` delete carrying a non-empty `triggered`, a handle set that depends on the write's TIER, a handle LOST
  or DUPLICATED by a change action, a listener visible through `read([])`/`findAddress`/a fresh instance over
  an equal `cfg.filePath`, a duplicated watched address, an `opId` the journal does not know, and a node whose
  `active` and `carried` lists hold the SAME listener** (`[T: the unreachable items named, so the row's
  failable set is explicit | CONTRACT]`).
  **Against the as-filed half, unchanged:** **an ancestry-only selection** (a write deep in `W`'s subtree
  failing to alert `W`); **an exact-match-only selection**; **an unrelated address in the list**; **an
  omitted watcher**; **a tier-qualified registration RETURNED after a write at a tier it does not name**
  (`§6.5` item 7 (a)); **a tier test applied to an UNQUALIFIED registration**; **a duplicated watched
  address**; **an `opId` the journal does not know**. **Against the re-derived half, each new:**
  **a MISSING handle where a listener's address is a prefix of the write's**; **a handle returned where no
  listener's address is a prefix**; **a `delete`'s receipt carrying no `triggered` member, or a
  `D-3` delete's carrying a non-empty one**; **a `read`, a `findAddress`, a `rollback` or a boot producing
  a handle list**; **a handle set that depends on the write's TIER** (`DD-36`); **a listener's handle LOST
  or DUPLICATED by a change action that replaced the node carrying its borrow** (`A46`); **a listener
  visible through `read([])`, through `findAddress` or through a fresh instance over an equal
  `cfg.filePath`** (`A48`; `DD-38`); **a `triggered` member absent, `null` or ordered-and-asserted**
  (`DD-37`); **a node's `active` and `carried` lists holding the SAME listener** (`A47`'s partition, the
  disjointness rule of `write-and-read.md §6.5` item 9 (d)).
- **Clause it cites.** `write-and-read.md §6.2`, **`§6.5` (items 2, 3, 4, 5, 6, 7 AND THE AMENDMENT'S OWN
  ITEMS 8–13)**, `§3.6` (the write's amended member set), `§4.4` (the delete's amended receipt), `§6.1`
  (the two tracked verbs), and the `DD` rows the amendment author: `DD-18`, `DD-26`, `DD-32`–`DD-39`.
  **⟶ AMENDED 2026-10-11: the rows THIS clause's re-derivations and the correction pass read are
  `DD-18`, `DD-26`, `DD-32`–`DD-45`** — `DD-40` (the two reachability states), `DD-41` (the per-node index's
  optionality, which `(d)`'s licence now states outright), `DD-42` (the handle-token collision, which `(a)`'s
  no-duplicate rule now answers) and `DD-44` (the empty-address marker, which the register-reference cell's
  observable carries) — **and the as-filed list above stands byte-for-byte** (`§0.1` item 5; `[T: the
  citation's completed form, so every row this row reads is named | CROSS-REF]`).
  `[P: §9 · A7, §14 · A33, §15 · A37, §18 · A57, §9 · A43, §11 · A45 · A48, §12 · A46 · A47, §20 · A58 |
  CONTRACT]`

**⟶ THE AS-FILED ROW TEXT BEGINS HERE AND STANDS BYTE-FOR-BYTE, READ THROUGH THE RE-DERIVATION ABOVE**
(`RCA-8(d)` ANNOTATE-BESIDE): **the three cells that follow — its property (the `watched` set and its
"exactly the prefix set" form), its strategy `S-WATCH` (with its `4` drive cells) and its failure list — are
the STOPGAP SURFACE's own row, and the re-derived row above is the operative one; NOTHING below is deleted,
and its `4` drive cells are the KEPT cell `(vi)` of the re-derived strategy.**

- **Property.** **After any successful write at address `X` with the write's tier `t`, `WriteResult.watched`
  is EXACTLY the set of registered watched addresses `W` such that BOTH hold: `W` is a prefix of `X`
  (descendant-inclusive, `DD-18`), AND — where that registration was made WITH a tier argument —
  `t` is one of the registration's tier arguments** (`§6.5` item 7 (i)/(ii); `DD-26`), **with no member
  added and none omitted, and `WriteResult.op.opId` subsequently resolves in the journal**
  (`rollback(opId)` does not fail `JournalOpUnknown`). **An UNQUALIFIED registration has no tier test and is
  returned on the prefix test alone, and the list's members are ADDRESSES — so one address registered at two
  tiers yields ONE member** (`§6.5` items 2 and 7 (a)–(c)) (`[T: the property's tier half, at this contract's
  third bounded amendment — the gate-4 adversarial pass found the row's *"exactly the prefix set"* wording
  over-strong against `§6.5` item 7 + `DD-26`, and this clause makes the row agree with item 7 | CONTRACT]`).
  **`watched` is `[]` iff no registration satisfies the test, and it is never `undefined`.**
- **Strategy id.** **`S-WATCH`** — register watchers at the write's own address, at a strict ancestor, at a
  strict descendant, and at an unrelated address; assert the returned set equals `{own, ancestor}` and
  excludes the other two; **plus** a tier-qualified drive over `§6.5` item 7 (a)/(b)/(c): register one
  address at `file` and write at `mem` with that address a prefix — **the address is NOT returned**; register
  one address at TWO tiers and assert the returned list carries it ONCE; and assert a tier-qualified
  registration never adds an address the prefix test excludes; **plus** a drive that the returned `opId` is
  accepted by `rollback`.
- **What FAILS it.** **an ancestry-only selection** (a write deep in `W`'s subtree failing to alert `W`);
  **an exact-match-only selection**; **an unrelated address in the list**; **an omitted watcher**;
  **a tier-qualified registration RETURNED after a write at a tier it does not name** (a narrower list is
  required, `§6.5` item 7 (a)); **a tier test applied to an UNQUALIFIED registration** (`§6.5` item 7's
  unqualified clause); **a duplicated watched address** (the list carries **distinct** addresses, and one
  address registered at two tiers yields ONE member, `§6.5` item 2 + item 7 (b)); **an `opId` the journal
  does not know**.
- **Clause it cites.** `§6.2`, `§6.5` (items 2, 3, 6 and 7), `DD-18`, `DD-26`.
  `[P: §9 · A7, §14 · A33, §15 · A37 | CONTRACT]`

**⟶ THE AS-FILED ROW TEXT ENDS HERE** (`RCA-8(d)` ANNOTATE-BESIDE): **its `4` drive cells and its failure
list are the STOPGAP surface's own row and are the KEPT cell `(vi)` of the re-derived strategy above;
NOTHING was deleted, and `§5.2`'s dual-mapping disclosure still resolves every citation of `§5.8` to THIS
row.**

#### `§5.9` `P-TP-9` — the fail set is CLOSED, and every message is GENERATED from its code

- **Property.** **Every failure the store produces is a `StoreError` whose `code` is a member of `§8.1`'s
  closed `15`-member set and whose `message` is the exact string `§8.2`'s generator produces for that code
  and that trigger** (**⟶ AMENDED 2026-10-11: the as-filed cell read *"closed `14`-member set"*; the listener
  amendment's added member takes it to `15` (`FilePathUnreachable`, rank `13`), and the converse half below
  closes at all `15` members with its drive stated**). **Conversely, for every code in the set there EXISTS
  a drive that produces it**: **no member is unreachable and none is a duplicate of another's trigger**
  (**the construction's two members' drives are `seams-and-lifecycle.md §7.1`'s amended outside-value list:
  ABSENCE of `journalLength` → `ConstructionArgumentMissing`, and a PROVIDED-BUT-UNREACHABLE path →
  `FilePathUnreachable` — two distinct triggers, one member each**). **AND THE DELIVERY CHANNEL,
  STATED IN THE FORM THIS UNIT'S SURFACE CAN FAIL ON:** **a failure is delivered as the `Err` arm — the
  `StoreError` — of the verb that produced it, and NO SUCCESS PATH RETURNS A `StoreError` AS A VALUE**: **no
  verb's `Ok` arm carries a `StoreError`, and no record of `§0.4`'s surface spells a failure as a member**
  (`DD-24(b)`; `[T: the channel's failable form, at this contract's third bounded amendment — a bare *"an
  error returned as a value"* is not failable under this surface's `Result` signature, so the row asserts
  the form the surface CAN break | CONTRACT]`). **THE `file`-TIER MEMBER IS PART OF THAT CONVERSES-HALF AND
  IS NOW CARRIED:** **`FileCommitFailed`'s drive is a `file`-tier write whose commit path fails** (`§8.1`
  #15; `§7.2` items 3–4) — **so the set's converse closes at all `15` members and no member is unreachable
  by construction** (**⟶ AMENDED 2026-10-11: the as-filed cell read *"closes at all `14` members"* and named
  `§8.1` #14 as the `file`-tier member's rank; the amendment's added member takes the set to `15` and moves
  the `file`-tier member's rank to #15, while THIS member's own drive is UNCHANGED**) (`[T: the closure's
  completion at this contract's second bounded amendment, re-stated on the amendment's added member |
  CONTRACT]`).
- **Strategy id.** **`S-FAILSET`** — one drive per code, each asserting both the `code` member and the
  generated `message`'s exact text; **plus a closure drive**: assert every caught error's `code` is in the
  set (a fuzz sweep over malformed addresses, values and tiers). **THE CENSUS, PRINTED WITH ITS TERMS: the
  strategy's cells are `1` drive per member = `15` code drives, plus the closure sweep = `15 + 1`**
(**⟶ AMENDED 2026-10-11: the as-filed cell read *"`14` code drives, plus the closure sweep = `14 + 1`"*; the
set now carries `15` members, so the drive count and its arithmetic move with it — the `15`-member set's own
algebra is `11 + 2 + 1 + 1 = 15` at `§8.1`**; `[T: the cell's count, corrected at this contract's second
bounded amendment and re-stated here on the amendment's added member | CENSUS]`).
- **What FAILS it.** **an error with no code or a code outside the set**; **a hand-authored or truncated
  message** (the generator's text is exact); **a code with no reachable drive**; **two codes sharing one
  trigger** (`DD-3`, `DD-19`); **a `StoreError` carried as a value on a success path** — a verb's `Ok` arm
  holding a `StoreError`, or a record of `§0.4`'s surface spelling a failure as a member (`DD-24(b)`'s
  failable form, stated in the row's property above).
- **Clause it cites.** `§8.1`, `§8.2`, `§8.3`, `§7.2` items 3–4 (the `file`-commit failure's code, `DD-25`),
  and `§3.5`/`§6.4`'s no-residue guarantees (the closure drive's other half).
  `[P: §11 · A14, §14 · A29, §15 · A37; T | CONTRACT]`
**ARITHMETIC, PRINTED WITH ITS TERMS:** **after this contract's first bounded amendment the register carries
`8` rows = `3` `P-IM` + `1` `P-SM` + `4` `P-TP` (`3 + 1 + 4 = 8`)**; **the cap is `≤ 8` and it holds
(`8 ≤ 8` ✓)** — **the breach was declared at `§0.1` item 5 with its discharge fixed, and that discharge is
TAKEN: the former `P-TP-5` row is MERGED INTO THE SURVIVING ROW `P-SM-4` (`§5.4` — the row pair was one
invariant stated twice, `§5.4`'s tier-landing half and the tier-order half now carried as `§5.4` (c)), so
the retired id `P-TP-5` names nothing and every citation to the merged row names `P-SM-4`**
(`[A: docs/decisions.md · the row named "DECIDED: THIS PROJECT'S UNIT IDS ARE `U-<NAME>` WITH A UNIT
DIRECTORY AT THE SPEC GATE (`docs/specs/<unit>/contract.md` + its parts), AND A MONOLITH CONTRACT IS NOT A
LAWFUL DRAFT" (the typed `≤ 8` register rule) | CONTRACT]`).
**AND THE ID SET'S OWN TWO AMENDMENTS, PRINTED SO THE COUNT'S TERMS ARE COMPLETE:** **the `3` `P-IM` rows
are `P-IM-1` (`§5.2`) · `P-IM-2` (`§5.3`) · `P-IM-3` (`§5.5`)**, **the `1` `P-SM` row is `P-SM-4` (`§5.4`,
carrying `S-ARM` and `S-TIER`)**, and **the `4` `P-TP` rows are `P-TP-6` (`§5.6`) · `P-TP-7` (`§5.7`) ·
`P-TP-8` (`§5.8`) · `P-TP-9` (`§5.9`)**; **`§5.5.1` declares no row** (`3 + 1 + 4 = 8`, each id printed
beside its section, and **no section of `§5.2`–`§5.9` is rowless by construction**) (`[T: the id set's own
enumeration, so the declared set and the row bodies agree id for id — the defect `F-1` exposed and this
amendment closes | CENSUS]`).
**AND THE GATE'S OWN FOUR NAMED INTERACTIONS ARE EACH FAILABLE HERE, AS THE BRIEF REQUIRES — EACH IN
EXACTLY ONE ROW** (`R: §17.4` condition 5): **the shadow/delete interaction → `P-SM-4`** (the shadow's
winning read and the purge — `§5.4` (c)/(d) through `S-TIER`) **with `P-TP-8`'s `D-1`/`D-3` delete pair**;
**the tier order → `P-SM-4`** (`§5.4` (c), `S-TIER` — failable nowhere else: the retired `P-TP-5` is gone);
**the resolver's return → `P-IM-1`** (the reference's non-copy discipline is `§4.1`'s and is checked by
**`P-IM-1`'s second assertion — the copy discipline, `§4.1`** — **NOT by a reachability assertion: the
reachability claim is `P-IM-3`'s own row (`§5.5`) and the citation is corrected here, so *"`P-IM-1`'s
second assertion"* names ONE thing everywhere it is printed** (`[T: the phrase's disambiguation, at this
contract's second bounded amendment | CROSS-REF]`)), **`P-TP-9`
carrying the fail-set half its own row states and no more**; **the `file` commit's failure arm → `P-TP-9`**
(**`FileCommitFailed`** — the `file`-tier failure's **code, now a member** — and its generated message,
`§8.1` #14 and `§8.2`) **and `DD-2`'s atomicity, observed by `P-TP-9`'s closure drive over a failed
commit**;
**and the construction's reachability arm → `P-TP-9`** **⟶ ADDED 2026-10-11: `FilePathUnreachable`
(`§8.1` #13) and its generated message (`§8.2`'s row for it), observed by `S-FAILSET`'s drive over a
provided-but-unreachable path (`seams-and-lifecycle.md §7.1`; `DD-40`) — so the amended construction group's
`2` members are each carried by exactly one row** (`[T: the interaction map's added entry, at this
contract's sixth bounded amendment | CONTRACT]`).

### §5.3 The monotonic clause and the shadow, stated as one rule

**WHICH `§5.3` THIS IS, STATED BECAUSE THE NUMBER IS PRINTED TWICE — the register's row `P-IM-2` also stands
at `§5.3` (`§5.2`'s dual-mapping disclosure, which prints the whole map and the reading rule).** **A citation
naming a row id, a strategy, an arm identity or a property half of `§5.3` resolves to `P-IM-2`; a citation
naming THIS CLAUSE (`§5.3` item 1, `§5.3`'s one rule) resolves here** (`[T: the disambiguation, taken at this
pass of the proofreading gate | CROSS-REF]`).

**The directive states the same discipline twice — *"(key/order + tier is a composite key)"* and
*"added alongside so it shadows on read"* — and the architect ruled they are ONE rule:** *"Those are the
same thing. A lower-tier one **is** a lower persistence one because the tiers are defined by persistence"*
(`P: §11 · A11`). **So:**

1. **`(key, tier)` is the composite key, and at most ONE child anchor stands at one pair** (`P: §15 ·
   A34`) — **two versions of one key are TWO ANCHORS**, one per tier;
2. **the lower-persistence anchor IS the shadowing one**, and **an unqualified read selects it** (`§2.3`);
3. **a write at a more persistent tier removes every version at `rank ≤ its own`** (`§5.4` arm `W-6`);
4. **a write at a less persistent tier is ADDED ALONGSIDE and shadows the more persistent version, which
   SURVIVES** (`§5.4` arm `W-5`) — **UNLESS the more persistent version is the `leaf` a STRUCTURED write
   re-mints: `W-2`'s destroy-and-replace is the leaf target's own arm and destroys its pointing anchor
   whatever tier that anchor carries (`§1.1`; `P: §13 · A21`), so the ONE state this item does not reach is
   named here rather than carved silently out of its words** (`§3.4`'s reconciliation clause).
`[P: §1, §11 · A11, §15 · A34 | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THE MONOTONIC CLAUSE'S REGISTER EXEMPTION IS SUPERSEDED AND THE SHADOW RULE'S
SHAPE IS UNMOVED** (`A41` + `A42` + `A51`; `RCA-8(d)` ANNOTATE-BESIDE: **the four items above stand
byte-for-byte and nothing is deleted**). **THE AS-FILED STATE, NAMED:** **item 3 above (*"a write at a more
persistent tier removes every version at `rank ≤ its own`"*) and item 4 (*"a write at a less persistent tier
is ADDED ALONGSIDE … UNLESS the more persistent version is the `leaf` a STRUCTURED write re-mints"*) are
BOTH stated over a link's parent anchor and child anchor, and the shipped `§1.2` exempted the register from
the bound because it had no parent anchor.** **THE OPERATIVE READING:** **the register's parent anchor
exists (`store-model.md §1.6` item 4) and carries the register's CONDITIONAL, creation-fixed tier
(`A42`/`A49`/`A50`), so the exemption is DEAD and the bound is REAL** — *"Fails as usual for an unpermitted
write"* (`A51`) — **with TWO consequences this clause states so they are not discovered from a red drive:**
**(i) in a `file`-register store the shadow rule above runs at register keys exactly as it runs at any other
link's keys** (all three tiers stand at `rank ≤ 2`); **(ii) in a `mem`-register store the `file` tier is
UNREACHABLE at a register key and, through the chain, at every address below it** — **so the `file`-tier
purge arm's own top rung is unreachable there, and the chain's floor is `mem`.** **NOTHING ELSE MOVES: the
composite key `(key, tier)`, the one-anchor-per-pair rule, the lowest-persistence read selection and the
re-mint's own destroy-and-replace are exactly as filed** (`[T: the register half of the shadow rule, with the
as-filed exemption named and nothing deleted | CONTRACT]`).

### §5.4 The purge chain — `temp` → `mem` → `file`, as one rule's special case

**WHICH `§5.4` THIS IS, STATED BECAUSE THE NUMBER IS PRINTED TWICE — the register's row `P-SM-4` also stands
at `§5.4` (`§5.2`'s dual-mapping disclosure, which prints the whole map and the reading rule).** **A citation
naming a row id, a strategy, an arm identity (`W-1`…`W-6`) or a property half of `§5.4` resolves to
`P-SM-4`; a citation naming THIS CLAUSE (`§5.4`'s purge chain, `§5.4`'s cascade) resolves here. AND THE
CITATIONS THAT CARRIED NEITHER QUALIFIER ARE REPOINTED IN PLACE AT THIS PASS, EACH NAMED WHERE IT STANDS:
`§5.4`'s own closing citation and `P-IM-1`'s round-trip cell both read *"`§5.4`'s purge chain"* where the
CHAINS THIS SECTION prints were meant, and `DD-2`'s `clause it cites` cell gains the `P-TP-9` row its
atomicity is observed by** (`[T: the disambiguation and the repointings, taken at this pass of the
proofreading gate; the audit trail is
`archive/reviews/2026-10-11-U-STOREROOM-NATIVE-proofread.md` | CROSS-REF]`).

**PURGE IS THE WRITE DELETING ANY VERSIONS OF THE ADDRESSED NODE WITH THE SAME OR LESS PERSISTENCE**
(`P: §12 · A19`, verbatim: *"Purge is the write deleting any versions of the addressed node with the same
or less persistence"*). **Purge's scope is THE ADDRESSED NODE'S OWN VERSIONS** — **not a subtree and not
the store** (`P: §12 · A19`'s mapped clause: *"purge's scope is THE ADDRESSED NODE'S OWN VERSIONS and not a
subtree and not the store"*).

**THE CHAIN, COMPUTED FROM `M-1`, with its terms:**

| A write at tier | Purges versions of the addressed node at | Leaves standing |
| --- | --- | --- |
| **`temp`** | `temp` (**`rank 0 ≤ 0`**) | `mem`, `file` |
| **`mem`** | `mem` and `temp` (**`rank ≤ 1`**) | `file` |
| **`file`** | `file`, `mem` and `temp` (**`rank ≤ 2`**) | none |

**AND THE CHAIN IS THE PURGE'S OWN TABLE, NOT THE RE-MINT'S** (`[T: the note, authored at this contract's
bounded RECONCILIATION pass so the chain's last column is never read as a promise about a re-minted leaf |
CONTRACT]`): **the three rows state what `A19`'s PURGE leaves standing at the addressed key** — **the
re-mint is a DIFFERENT act of the same write** (`§1.1`; `P: §13 · A21`), **so when `W-2` is the arm the
addressed leaf's own pointing anchor does NOT stand even where the table's last column names its tier: a
`file` LEAF addressed by a structured `mem` or `temp` write is DESTROYED and replaced at the write's own
tier** (`§3.4` arm `W-2`; `§3.4`'s reconciliation clause), **while every OTHER version at that key stands
exactly as the rows say.**
**`A15`'s own words are this rule's special case:** *"temp has same behavior as mem, except that is shadows
mem and is purged on writes to mem, like mem is to file."* (`P: §11 · A15`). **The rule is ONE rule, and the
chain is derived from `M-1` rather than stated three times.**
**AND THE CASCADE, STATED WHERE IT BELONGS:** **a purged version's DOWNSTREAM nodes go with it** — the
directive's *"cascades to all downstream nodes"* is the overwrite sentence's own
(`P: §1`), and **`A19`'s printed silence leaves open whether the cascade reaches a purge or only a same-tier
replacement** (`P: §12 · A19`: *"it does not say whether a purged version's DOWNSTREAM nodes go with it"*).
**THIS CONTRACT DECLARES THE CASCADE REACHES BOTH** (`[T | DECLARED-DEFAULT]`, carried by `DD-2`'s
neighbourhood); **the alternative — a purge that removes the version's anchor but leaves its downstream
nodes unreachable — is priced as follows: it would mint unreachable nodes, which `DD-6`'s reachability
property (`P-IM-3`, `§5.5`) then fails; so the alternative is available only with `DD-6`.** **Its
reversal point: a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, then a bounded amendment.**
`[P: §1, §11 · A15, §12 · A19 | CONTRACT + one DECLARED-DEFAULT cascade half]`

---

## §6. The journal, the returned op, the rollback, and the watched-address list

### §6.1 What the journal is, what it tracks, and its lifetime

**THE JOURNAL TRACKS STORE CHANGES, AND THE TRACKED VERBS ARE EXACTLY TWO: `write` and `delete`**
(`P: §9 · A5`: *"Journal track store changes (write/delete), expires at end of session, older entries above
a configured length compress to a base state"*).

1. **One entry per SUCCESSFUL `write`, and one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE
   VERSION.** **A failed write appends NO entry** (`§3.5`); **a delete that removed nothing (`D-3`) appends
   NO entry** (`[T: the entry-formation rule | CONTRACT]`).
2. **The journal is CARRIER-INTERNAL:** it is the store instance's own record, **not addressable through
   `findAddress`, not a node, not reachable by any address, and not a tier of its own** — it is **not
   tier-bound** (`P: §8`'s subjects `J-1`'s printed silences, and `R: §17.5`'s *"the store-side
   counterpart … stays the CONTRACT'S carriage"* read together; `[T | CONTRACT]`).
3. **ITS LIFETIME IS THE SESSION, AND IT EXPIRES AT SESSION END** (`P: §9 · A5`). **The session's referent
   is the PROCESS: `mem` is *"lost on process exit"* (`P: §12 · A19`), and the journal's expiry is the same
   event** — **on process exit the journal is empty and its entries are unrecoverable**
   (`[T: the session's referent read from `A19` | DECLARED-DEFAULT]`; the alternative — a realm or window
   teardown — is priced: `A19`'s own words fix *"Process exit"* for the neighbouring `mem` lifetime, and a
   realm-scoped reading would make the journal die where `mem` does not; reversal point: a fresh ruling).
4. **`M-3` — THE JOURNAL IS BOUNDED BY A CONFIGURED LENGTH:** **`journalLength` is a REQUIRED construction
   argument** (`P: §14 · A31`: *"Required as args on store creation"*), **a positive integer counting
   ENTRIES, supplied by the caller with NO DEFAULT** (`DD-16`).
5. **COMPRESSION:** **older entries above that configured length COMPRESS TO A BASE STATE**
   (`P: §9 · A5`). **THIS CONTRACT DECLARES THE BASE STATE'S FORM AND THE TRIGGER:**
   - **the base state is a SNAPSHOT of the store's own observable state at the moment of compression** —
     the value every reachable address read at that moment, i.e. the register's whole readable content —
     **and it replaces every compressed entry as the walk's floor** (`[T | DECLARED-DEFAULT]`);
   - **the trigger is the APPEND: when an append would leave more than `journalLength` un-compacted
     entries, the oldest entries are compressed until at most `journalLength` entries remain
     un-compacted and are marked `compacted`** (`[T | DECLARED-DEFAULT]`);
   - **`M-4` — THE WALK'S FLOOR:** **a rollback may NOT walk past a compressed base**: an entry marked
     `compacted` is **OUT OF SCOPE** (`P: §15 · A35`: *"If it is old enough to be compacted it's out of
     scope"*), and **`rollback` requested over such a scope fails `RollbackCompacted`** (`DD-16`; `§8.1`).
   **Both halves are priced at `DD-16`, whose alternative is a different form (a full operation log) and
   whose reversal point is a bounded amendment.**
`[P: §9 · A5, §14 · A31, §15 · A35 | CONTRACT + three DECLARED-DEFAULT sub-clauses]`

### §6.2 The journal op — its shape, its content duty, and its id's type

**A WRITE PASSES BACK THE JOURNAL OP IT PRODUCED** (`P: §9 · A7`), and **the op's CONTENT AND IDENTITY ARE
RULED:** *"Op must store enough data to reconstruct the original tree and resolve the current state, and be
id'ed for rollback"* (`P: §15 · A37`).

**The op's CONCRETE RECORD SHAPE and its id's TYPE are this contract's to state** (`R: §17.3`; `P: §16`'s
own consequence clause), and this contract fixes them as follows (`DD-22`):

```
JournalOp {
  opId:      string,                  // the IDENTITY: a non-empty, store-unique string token.
                                      // Uniqueness is per store instance and per session.
  kind:      'write' | 'delete',      // which tracked verb produced it
  address:   (string|number)[],       // the address the verb was called with, VERBATIM, in order
  tier:      Tier | null,             // the write's single tier; null for an unqualified delete
  before:    BaseState,               // the ORIGINAL-STATE half: at least the pre-operation value of the
                                      // addressed node's own version(s) AND of every node the operation
                                      // removed or replaced, transitively — enough to RECONSTRUCT THE
                                      // ORIGINAL TREE for the operation's whole reach
  after:     BaseState,               // the CURRENT-STATE half: at least the post-operation value of the
                                      // addressed node's version(s) — enough to RESOLVE THE CURRENT STATE
                                      // at the written address
  seq:       number,                  // the entry's append ordinal, strictly increasing from 1
  compacted: boolean                  // true once the entry is OUT OF ANY LATER ROLLBACK WALK — its TWO
                                      // sufficient grounds are "compressed into the base state" (§6.1
                                      // item 5) and "undone by a rollback" (§6.4 M-9), and the record
                                      // carries no member that distinguishes them
}
```

**`compacted`'s MEANING IS ONE PREDICATE WITH TWO SUFFICIENT GROUNDS, STATED SO THE SHAPE IS NOT READ AS
NARROWER THAN THE CLAUSES THAT SET IT** (`[T: the member's meaning, at this contract's second bounded
amendment; `§6.4` `M-9` sets it on an undone entry and `§6.1` item 5 on a compressed one, and `DD-22`'s
closed member set carries no `undone` member | CONTRACT]`): **an entry is `compacted` iff it is out of any
later rollback walk's candidate set — (i) because it was COMPRESSED INTO THE BASE STATE (`§6.1` item 5), or
(ii) because a ROLLBACK UNDID IT (`§6.4` `M-9`).** **An `undone` entry is NOT distinguished from a
compressed one by any member of this record, and no member named `undone` exists** — **the two grounds'
common observable is the one this member carries: a rollback over it fails `RollbackCompacted`.**

**`BaseState` is a record with exactly two members** (`[T: the base state's shape, declared here | CONTRACT]`):

```
BaseState {
  present:  boolean,                  // whether the value exists at all (false = the pre-state was absent)
  value:    StoreValue | StoreValue[] // the value, or — where an operation touched more than one version
                                      // or more than one node — the ordered list of the values it touched,
                                      // in contract.md §5.1's canonical tier order
}
```

**PROPERTIES THE OP SATISFIES, EACH CHECKABLE** (`[P: §15 · A37; T | CONTRACT]`):

1. **`reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach** — the state that stood
   before the operation, for every address the operation touched;
2. **`resolve(op.after, currentJournal)` yields the state the store is in NOW at `op.address`** — i.e.
   `read(op.address)` at the moment of the call agrees with `op.after.value` unless a later entry at a
   scope overlapping `op.address`'s subtree supersedes it;
3. **`op.opId` is a non-empty string, unique within the instance, and is the handle `rollback` accepts**;
4. **`op.kind` is exactly one of `'write'` and `'delete'`, and no other value appears.**

**⟶ RECONCILED 2026-10-11 — THE OP'S `opId` UNIQUENESS DOMAIN, RE-STATED BESIDE THE SHAPE IT IS DECLARED IN
SO THE DIRECTORY HOLDS ONE DOMAIN AND NOT TWO** (`RCA-8(d)` ANNOTATE-BESIDE: **the record block above —
its `opId` line's comment *"the IDENTITY: a non-empty, store-unique string token. Uniqueness is per store
instance and per session."* — and every property of the list above STAND BYTE-FOR-BYTE and are READ
THROUGH this clause**; `P: §13 · A69`; `§0.4`'s dated clause; `[T: the `opId` domain's restatement, so
`§0.4` clause 2's process-scoped domain and this record's own comment are not read as two domains |
CROSS-REF]`): **THE AS-FILED COMMENT READ** *"Uniqueness is per store instance and per session."* **THE
OPERATIVE READING, IN THREE CLAUSES, AND NOT ONE OF THEM A NEW DUTY:** **(1)** **`opId`'s uniqueness is
SATISFIED BY THE SAME PROCESS-GLOBAL MINT THAT MINTS `handle`s, so the id is unique PER INSTANCE AND PER
SESSION *and* UNIQUE PER PROCESS — no counter, no member and no verb is added by this clause, and the
stronger reading is the one a caller may rely on** (`§0.4`'s dated clause: *"unique PER PROCESS"*).
**(2)** **THE REACH A CALLER MAY RELY ON IS UNMOVED, AND THAT IS WHAT THE PROPERTIES ABOVE ASSERT: an id
names an entry in THE JOURNAL OF THE INSTANCE THAT RETURNED IT, and a JOURNAL IS PER-INSTANCE
(`§6.1` item 2) — so a foreign instance's id fails `JournalOpUnknown` on THIS instance exactly as
`parameter-semantics.md §2.10` (`PAR-10`) declares, and `rollback`'s reach is the returning instance's own
journal and never a process-wide one.** **(3)** **NO CODE, NO MEMBER, NO `DD` ROW AND NO COUNT MOVES: the
record's closed eight-member set stands, `parameter-semantics.md §2.10`'s domain and outside values stand
with this clause as their companion, and `§2.10`'s cell carries the same dated reconciliation.** **THIS
CLAUSE ADDS NOTHING TO `parameter-semantics.md §2.10` AND TAKES NOTHING FROM IT** — **it states, in this
record's own home, that the *"per instance and per session"* spelling above is the AS-FILED form and that
its operative domain is the one `§0.4`'s dated clause declares.**

`[P: §9 · A7, §15 · A37; R: §17.3 | CONTRACT]`

### §6.3 The journal's own surface

**The journal exposes exactly one verb, and it is not one of the store's address verbs:**

```
rollback(op: string) → RollbackResult      // `op` is a JournalOp.opId
```

**`RollbackResult` is a record with exactly three members** (**⟶ RECONCILED 2026-10-11, BY THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8), ON A CELL THE PROOFREADING GATE RECORDED AND DID NOT FIX: the as-filed clause read *"`RollbackResult` is a record with exactly **two** members"* while the block beneath it prints **three** — `opId`, `undoneOps` and `restoredTo` — and the crate's own `src/records.rs` declares **`RollbackResult { opId: String, undoneOps: Vec<String>, restoredTo: BaseState }`, three fields, on which the red set drives `s6_3_rollback_echoes_the_op_id_and_orders_undone_ops_newest_first` and `s6_3_restored_to_is_the_state_the_addressed_subtree_now_stands_at`.** **THE COUNT WAS THE STALE SIDE AND NOTHING ELSE MOVED: no member was added, dropped or renamed, and the record's shape is exactly the block below** (`[T: the member-count reconciliation, with the as-filed form named | CONTRACT]`):

```
RollbackResult {
  opId:        string,      // the id the caller passed, echoed
  undoneOps:   string[],    // the opIds the rollback undid, in REVERSE append order (newest first)
  restoredTo:  BaseState    // the state the addressed subtree now stands at
}
```

**`rollback` is the ONLY consumer of the journal, and the journal is not readable, enumerable, addressable
or deletable by any other call** (`[T | NEGATIVE]`): **there is no `journalEntries()`, no
`journalLength()`, no `clearJournal()`, and no `findAddress` path that reaches an entry.**
**`J-5` (the journal as an observable) is thereby ANSWERED, in the only form `A7` supplies: the op CROSSES
as a returned value on every write** (`P: §9 · A7`; `R: §16.2`'s `O-8`/`J-5` reading).
`[P: §9 · A7, §15 · A37 | CONTRACT]`

### §6.4 The rollback's rule — its reach, its scope, its floor and its residue

**THE REACH, RULED:** *"Every operation touching the same subtree. If it is old enough to be compacted it's
out of scope."* (`P: §15 · A35`).

1. **`M-5` — THE SCOPE:** **a rollback undoes EVERY operation TOUCHING THE SAME SUBTREE as the named op**
   — **not the last op alone, and not the failing op's own ops alone** (`P: §15 · A35`). **This contract
   declares "the same subtree" measured against the WRITTEN ADDRESS's OWN SUBTREE:** an entry `E` is in
   scope iff **`op.address` is a prefix of `E.address` (itself or a descendant), at ANY tier** (`DD-21`).
   **AND THE SCOPE IS CANDIDATE-SET-WIDE BEFORE IT IS FILTERED — the clause that makes `M-6` REACHABLE:**
   **the reach is stated over EVERY entry the operation's subtree contains, `compacted` entries INCLUDED;
   the FLOOR of `M-6` is then the predicate that decides which of them the rollback may undo.** **So the
   scope is never empty of compacted entries "by definition": a compacted entry IN the addressed subtree's
   reach IS in the candidate set, and `M-6` is the clause that refuses the rollback over it**
   (`[T: the reach's candidate-set-wide form, stated at this contract's second bounded amendment so the
   floor's failure arm is REACHABLE rather than vacuous — the defect the red set's `F-6` exposed |
   CONTRACT]`).
2. **`M-6` — THE FLOOR:** **an entry old enough to be COMPACTED (marked `compacted`, `§6.1` item 5) may NOT
   be undone** (`P: §15 · A35`: *"If it is old enough to be compacted it's out of scope"*). **A rollback
   whose candidate set (item 1) includes AT LEAST ONE COMPACTED ENTRY FAILS `RollbackCompacted` AND UNDOES
   NOTHING — the floor is ALL-OR-NOTHING and never partial** (`DD-16`, `§8.1` #11).
   `[T: the failure arm's all-or-nothing form | CONTRACT]; the alternative — undoing the un-compacted part
   and reporting the rest — is priced: an all-or-nothing floor makes `A35`'s *"out of scope"* a closed
   predicate and keeps `P-TP-9`'s closure drive single-valued; reversal point: a bounded amendment.`
3. **`M-7` — IDENTITY, DIRECTION AND DEPTH:** **a rollback is BY OP ID** (`P: §15 · A37`: *"be id'ed for
   rollback"*), **and it walks BACKWARD** — *"rolled back by walking back through journal changes"*
   (`P: §8`) — **one entry at a time, from the newest in scope to the oldest in scope** (`[T | CONTRACT]`).
   **AND THE ONE STATE AN IN-SCOPE ENTRY'S OWN ADDRESS CAN BE IN WHILE AN OUT-OF-SCOPE OPERATION HAS TAKEN
   ITS PARENT CHAIN AWAY — WHAT `undoneOps` MAY CONTAIN AND WHAT `restoredTo` MUST THEN REPORT** (`[T: the
   state's declared outcome, stated at this contract's third bounded amendment — the gate-4 adversarial
   pass's `H-6`/`S-3` found `undoneOps` claiming an undo the store did not reflect | CONTRACT]`): **the
   scope test of `M-5` is a PREFIX test over ADDRESSES and cannot reach upward, so an entry `E` whose address
   lies under the rolled-back address IS in scope even when an OUT-OF-SCOPE operation (an operation whose own
   address is not under the rolled-back address) has removed the parent chain that `E`'s address walks
   through — and `M-5` and `M-8` together require a stated answer for it. THE ANSWER, IN TWO CLAUSES:**
   - **(i) `undoneOps` CONTAINS ONLY THE opIds WHOSE REVERSAL THE STORE ACTUALLY PERFORMED.** **An in-scope
     entry that CANNOT be reversed because its parent chain is gone is NOT reported as undone: it is
     MARKED `compacted: true` (the only mark `§6.2`'s closed record carries, `M-9`), so it is OUT of the
     candidate set of every later walk and undoes nothing further — and IT IS ABSENT FROM `undoneOps`.** **So
     `undoneOps` is a report of PERFORMED reversals and never a report of in-scope entries** (`§6.3`'s
     member rule: *"the opIds the rollback undid"*).
   - **(ii) `restoredTo` REPORTS THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE ROLLBACK —
     PRESENT OR ABSENT, NEVER AN UNDONE ENTRY'S PRE-STATE.** **Where the parent chain a reversing entry
     needed is gone, the reversal installs NOTHING at that address, and `restoredTo` therefore reports the
     address's ACTUAL state — `present: false` where nothing stands there** — **so `P`roperty 1's
     *"`reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach"* (`§6.2` property 1) is
     read over the operations the rollback REVERSED, and never as a promise about an address whose chain an
     out-of-scope operation removed** (`§6.3`; `DD-20`; `DD-21`). **`M-10` is thereby preserved rather than
     narrowed: the rollback is still ATOMIC — it either reverses what it reports or it fails — and a
     reversal it cannot perform is REPORTED as unperformed by both members.**
4. **`M-8` — A ROLLBACK IS TOTAL OVER ITS SCOPE:** **no partial or subset rollback is available and none is
   declared** (`DD-20`).
5. **`M-9` — THE RESIDUE:** **a rollback ITSELF appends NO journal entry** — the journal records store
   changes (`write`/`delete`), and a rollback is not one of the two tracked verbs
   (`[P: §9 · A5 read at its own words; T | DECLARED-DEFAULT]`); **the alternative — a rollback that
   journals** is priced: it would make a rollback itself undoable, which no ruling names, and would let a
   walk-back reach a rollback entry, which `A35`'s *"operation touching the same subtree"* does not
   contemplate; **reversal point: a fresh ruling.** **THE UNDONE ENTRIES' MARK, STATED IN THE CLOSED SHAPE'S
   OWN TERMS:** **an undone entry is marked `compacted: true` — the ONLY mark `§6.2`'s closed record and
   `DD-22` carry — and it is thereby OUT OF ANY LATER WALK'S CANDIDATE SET (item 1) AND UNDOABLE BY NO
   LATER ROLLBACK, whose attempt fails `RollbackCompacted` (item 2).** **`compacted` is read as ONE
   predicate with TWO sufficient grounds: *"compressed into the base state"* (`§6.1` item 5) and *"undone by
   a rollback"*** — **and the two grounds are DISTINGUISHED by no member of `§6.2`'s record, because the
   record carries none to distinguish them with** (`[T: the mark's closure, at this contract's second
   bounded amendment — the red set's `F-7` exposed that the first amendment's cell named an `undone` member
   `§6.2`'s closed shape does NOT carry, and that reading `compacted` as compression-only would make an
   undone entry distinguishable from a compressed one, which the closed shape forbids | CONTRACT]`).
   **AND THE OBSERVABLE CONSEQUENCE, EACH DRIVABLE:** **(i)** the entry remains reachable BY ITS `opId` and
   by nothing else (it is still the journal's entry); **(ii)** `rollback` over it fails `RollbackCompacted`;
   **(iii)** no read, no `findAddress` and no address reaches it (`§6.3`'s closure); **(iv)** the next
   write's `seq` continues as though the rollback had not happened.
6. **`M-10` — A ROLLBACK IS ATOMIC:** **if it fails, the store is unchanged.**
7. **`M-11` — AN UNKNOWN OP ID FAILS `JournalOpUnknown`.**
8. **AND THE `file` TIER'S OWN AUTOMATIC ROLLBACK, WHICH IS NOT `rollback`:** **on a `file`-tier write
   failure, the FILE tier ROLLS BACK THE CHANGE IN THE JOURNAL AUTOMATICALLY, and THEN passes the failure
   back to the caller** (`P: §11 · A16`: *"File rolls back change in journal automatically on failure, then
   passes failure back to caller"*). **This automatic rollback is the store's own act, requires no caller
   instruction, precedes any caller's `A7` instruction, and is `DD-2`'s atomicity read with this clause.**
   **It also appends NO entry and journals nothing** (`[T: read with `A16`'s *"then passes failure back"* |
   DECLARED-DEFAULT]`; the alternative — the automatic rollback journaling its own reversal — is priced:
   it would double-count one failure as two store changes; **reversal point: a fresh ruling**).
`[P: §8, §9 · A5 · A7, §11 · A16, §15 · A35 · A37 | CONTRACT + three DECLARED-DEFAULT sub-clauses]`

### §6.5 The watched-address list — registration, the selection rule, and the park's boundary

**`watch(address, tier?) → WatchHandle`** and **`unwatch(handle) → void`**.

1. **THE STORE TRACKS LISTENER REGISTRATIONS AND RETURNS THE WATCHED-ADDRESS LIST** — this store-side duty
   **SURVIVES**, narrowed by the architect's deferral (`R: §17.1`; `P: §9 · A7`; `P: §16 · A38`:
   *"Defer listener implementation"* defers the **listener**, not the store's production of the address set
   the listener would be called for).
2. **`watch(address, tier?)` registers the caller's watched address** — **keyed by the ADDRESS it watches**,
   returning an **opaque `WatchHandle`** (`DD-23`). **Registering the same address twice is idempotent at
   the address level: the returned list carries DISTINCT addresses** (`[T | DECLARED-DEFAULT]`).
3. **THE SELECTION RULE, RULED AND FIXED:** **a watched address `W` is returned after a successful write at
   address `X` iff `W` is a PREFIX of `X`** — i.e. the write **resolves to `W` or passes through `W`**
   (`P: §14 · A33`: *"Alerts if a write resolves to or through the matched address"*), **and `A33`'s
   *"through"* is DESCENDANT-INCLUSIVE FROM THE WATCHED ADDRESS DOWNWARD** (`P: §15 · A37`: *"Listener fires
   if the address or any of its descendants is resolved on write"*; `R: §16.1`'s `A37` cell). **`DD-18`.**
4. **THE LIST IS RETURNED ON A SUCCESSFUL WRITE ONLY** — `WriteResult.watched` (`§3.6`). **A failed write
   returns nothing.**
5. **NO ORDER IS DECLARED FOR THE LIST** — the order is `P-3`'s (`DD-23`).
6. **`unwatch(handle)` removes one registration; unwatching an unknown handle is a no-op success**
   (`[T | DECLARED-DEFAULT]`).
7. **THE TIER-QUALIFIED REGISTRATION'S EFFECT ON THE RETURNED LIST, STATED AS A CLAUSE — the effect the
   tier column of `§3.1.1`'s `watch` row requires and that `DD-24` does not carry** (`[T: the clause,
   authored at this contract's second bounded amendment; it is `A33`/`A37`'s alert set read with the store's
   own duty to RETURN that set, and `A38`/`P-3` defer only the LISTENER's own behaviour | CONTRACT]`):
   **a registration made WITH a tier argument is TIER-QUALIFIED, and it is returned after a successful
   write at `X` iff BOTH of the following hold:**
   - **(i) the prefix test of item 3:** `W` is a prefix of `X` (descendant-inclusive, `DD-18`); **and**
   - **(ii) the tier test:** **the write's tier is ONE of the registration's tier arguments** — i.e. the
     write landed at a tier the registration names.
   **An UNQUALIFIED registration (`tier` absent, or an array of `0` tokens — `§3.1.1`'s `watch` row) has
   NO tier test and is returned on the prefix test alone, exactly as item 3 states.**
   **CONSEQUENCES, EACH DRIVABLE:** **(a)** a tier-qualified registration is **not** returned after a write
   at a tier it does not name, **even though the prefix test holds** — the returned set is a subset of the
   unqualified set, never a superset; **(b)** registering the same ADDRESS at two different tiers is
   **idempotent at the address level** exactly as item 2 states — **the returned list still carries the
   address ONCE**, because the list's members are ADDRESSES (item 2) and a member is returned iff ANY of
   its registrations qualifies; **(c)** a registration's tier never changes the PREFIX test and never adds
   an address the prefix test excludes.
   **AND THE BOUNDARY IS UNMOVED:** **which listener is called, in what order, and with what body remains
   `P-3`'s** (`DD-23`; `A38`) — **this clause is about the store's own PRODUCTION AND RETURN of the address
   list and nothing else.**

**THE PARK'S BOUNDARY, IN ONE LINE, EACH WAY.** **`P-1` — THE JS INTEGRATION SET: the store builds the
store; the realm, the builder/ABI path, the packaging, the host handoff, the crossing of every value the
store produces into JS, the load path and the module-supplied functions' crossing are DEFERRED and are NOT
specified by this contract** (`docs/pending.md` `P-1`; `P: §10 · A8`; `R: §17.4` condition 2).
**`P-3` — THE LISTENER IMPLEMENTATION: the store TRACKS listener registrations and RETURNS the
watched-address list; the LISTENER'S ORDER, its ATTACHMENT RULE (by address or by identity), its FIRING, the
CALLBACK INVOCATION, the JS-facing listener surface and a THROWING listener body's disposition are NOT
specified by this contract** (`docs/pending.md` `P-3`; `P: §16 · A38`; `R: §17.1`).
**BOTH PARKS ARE `OPEN`, NEVER GREEN, OWNER THE ARCHITECT, POSITIVE REVISIT CONDITION *THE STORE PASSES ITS
OWN TEST SUITE*, and no listener or integration question is put while either stands; a park read as a
closure is a finding and a pass that lifts a park fails** (`R: §17.1`, `R: §17.4` condition 3;
`[R: §17.1 · §17.4 | NEGATIVE]`).
`[P: §9 · A7, §14 · A33, §15 · A37, §16 · A38 | CONTRACT]`

---

## §7. The store's own persistence, and its construction inputs

### §7.1 The construction input set — `storeCreate(cfg)`, every input ruled or declared

```
storeCreate(cfg) → Store
cfg = {
  filePath:      string,     // REQUIRED — the `file` tier's external location
  journalLength: number      // REQUIRED — a positive integer counting journal ENTRIES
}
```

**THE `file` PATH IS PASSED ON FIRST CREATION** (`P: §11 · A16`: *"File path is passed to store on first
creation"*), **and the journal's parameters are REQUIRED CONSTRUCTION ARGUMENTS** (`P: §14 · A31`:
*"Required as args on store creation"*).

| Input | Its domain | Outside the domain | The declared answer to each outside value |
| --- | --- | --- | --- |
| **`cfg.filePath`** | a non-empty string — a path the process may write | absent · `null` · `undefined` · `""` · a non-string | **absent → `ConstructionArgumentMissing`; present but invalid (`null`, `undefined`, `""`, a non-string) → `AddressMalformed`**; **in both cases NO instance is returned** (`DD-17`) |
| **`cfg.journalLength`** | a positive integer (`≥ 1`) | absent · `null` · `undefined` · `0` · a negative integer · a non-integer number · a non-number | **absent → `ConstructionArgumentMissing`; present but out of domain → `AddressMalformed`**; **no instance is returned** (`DD-16`, `DD-17`) |
| **any third key on `cfg`** | **ignored** (`[T | DECLARED-DEFAULT]`; the alternative — a failure — is priced: `A31` names the required set and `A16` the path, and neither names an unknown-key arm; **reversal point: a bounded amendment**`) | — | — |

**AND THE `null`/`undefined` CELLS, STATED SO THE TRIGGER LIST AND THE `PAR` ROWS AGREE** (`[T: the shape
cells, at this contract's second bounded amendment — `PAR-6`/`PAR-7` declare these values and `§8.1` #1's
trigger column now names them | CONTRACT]`): **a `filePath` or a `journalLength` that is present with the
value `null` or `undefined` is NOT an absent argument** — **it is an argument of the wrong SHAPE, and its
answer is `AddressMalformed`, never `ConstructionArgumentMissing`.** **The line is exact: ABSENCE answers
`ConstructionArgumentMissing`; PRESENCE with a value outside the domain — including the two shape-less
values — answers `AddressMalformed`.**

**AND THE THIRD KEY'S STATE, STATED PLAINLY RATHER THAN LEFT AS AN UNIMPLEMENTED ARM:** **`cfg`'s member
set is CLOSED at exactly the two declared keys** (`§0.4`'s `StoreConfig` spelling), **so in a typed crate a
third key is UNREPRESENTABLE rather than *"ignored"*.** **The clause's declared RESULT still holds — no
third key produces a code, no third key is refused, and `§8.1`'s complement says so** — and **the
unrepresentability is carried as an `OWED` item with its owner and its positive revisit condition at
`§0.2` · `O-3`** (`[T: the third key's state, stated at this contract's second bounded amendment | OWED]`).

**WHERE THE PATH COMES FROM AT FIRST CREATION IS NOT THIS UNIT'S QUESTION.** `A16` names the path as the
**store's own construction input**, and *"the path's ORIGIN may be integration-side and parked"*
(`P: §11`'s consequence 4) — **so this contract states the input and never its source.** **`A16`'s printed
silence — *"it does not say where that path comes from at first creation (the caller, the app, a
configuration)"* — is carried as `P-1`'s, and no clause here reaches it** (`[R: §17.4 condition 2 | NEGATIVE]`).
`[P: §11 · A16, §14 · A31 | CONTRACT]`

### §7.2 The `file` tier's persistence — what a commit guarantees, and its failure arm

1. **`M-12` — THE `file` TIER IS SAVED TO A JSON FILE AT `cfg.filePath`** — *"`file` is meant to be saved to
   a json file in a persistent, external location"* (`P: §1`).
2. **A COMMIT IS ATOMIC AT THE FILE** (`DD-2`): a successful `file`-tier write's bytes land **whole**; **a
   failed commit leaves the file's prior bytes intact** — **and "intact" is DRIVABLE, stated here as the
   observable: after a failed `file`-tier commit, the bytes at `cfg.filePath` are BYTE-IDENTICAL to the
   bytes that stood there before the attempt, so **re-reading the path answers the pre-attempt content, not
   a truncated or partially rewritten file** — and **the store's `file` state is what the journal restores
   it to** (`§6.4` `M-11`). **The failure's CODE is `FileCommitFailed`** (`§8.1` #14)
   (`[T: the atomicity's observable, stated at this contract's second bounded amendment | CONTRACT]`).
3. **A FAILED `file`-TIER WRITE'S FAILURE ARM IS EXACTLY TWO STEPS, IN THIS ORDER** (`P: §11 · A16`):
   **(i)** **the file rolls back the change in the journal automatically; (ii)** **then the failure is
   passed back to the caller** — i.e. the called verb throws the `StoreError` for the failure that caused
   it, and **the caller receives the failure, not the rolled-back state.**
4. **WHAT "FAILURE" COMPRISES** — `A16`'s printed silence is *"what 'failure' comprises (the file write
   alone, the journal's own append, or both)"*. **THIS CONTRACT DECLARES IT COMPRISES BOTH: every failure of
   the `file`-tier write path — the serialization, the file write, and the journal append — is ONE
   failure** (`[T | DECLARED-DEFAULT]`), **and its ONE code is `FileCommitFailed` (`§8.1` #14; `DD-25`),
   whose generated message is `§8.2`'s `FileCommitFailed` row**; the alternative (the file write alone) is
   priced: a journal-append
   failure would leave the file's bytes committed and the journal short an entry, so no walk-back could
   reach the state; **reversal point: a fresh ruling.**
5. **A `file`-tier WRITE IS THE ONLY WRITE THAT TOUCHES THE FILE**; `mem`- and `temp`-tier writes perform
   **no** file I/O (`P: §1`'s tier table; `[T | CONTRACT]`). **AND THE `file` TIER'S DURABILITY IS A
   WRITE'S ACT ALONE — THE `delete` AND THE `rollback` DO NOT COMMIT, STATED HERE BECAUSE THE GATE-4
   ADVERSARIAL PASS FOUND THE CLAUSE ABSENT** (`DD-28`; `[T + DD-28 | DECLARED-DEFAULT]`): **a `delete` —
   at ANY tier scope, INCLUDING a delete that removes `file`-tier versions — performs NO file I/O, and a
   `rollback` performs NO file I/O; the bytes at `cfg.filePath` are therefore the bytes of the LAST
   SUCCESSFUL `file`-TIER WRITE.** **CONSEQUENCE, EACH DRIVABLE: after `write(['a'], file, 1)` commits, a
   `delete(['a'])` leaves the file's bytes carrying `a`; a FRESH `storeCreate(cfg)` at the same
   `cfg.filePath` then re-boots from those bytes, so `read(['a'])` answers the version the delete removed in
   memory** — **that re-boot is `§7.2` item 6's declared boot and is the declared consequence of this
   clause, NOT a defect.** **The priced alternative and the reversal instrument are `DD-28`'s** — **the
   alternative (a `file`-committing delete and rollback) would give two verbs a second failure arm whose
   only available member is `FileCommitFailed`, whose trigger column is *"a `file`-TIER WRITE'S failure
   path"* (`§8.1` #14), and would require `A16`'s automatic journal rollback — a write's arm — to be
   re-stated for two verbs `A16` does not name.**
6. **`mem` IS LOST ON PROCESS EXIT**, and **`temp` with it** (`P: §12 · A19`; `P: §11 · A15`); **`file`
   survives process exit** (`P: §1`). **THE STORE'S BOOT IS: on `storeCreate`, the `file` tier's content at
   `cfg.filePath` is loaded if the file exists, and the store's register begins with the keys that content
   carries** (`[T | DECLARED-DEFAULT]`); the alternative — a store that ignores an existing file until first
   written — is priced: `A16`'s *"File rolls back change in journal automatically on failure"* presumes a
   standing file state, and a lazy-load would make the first post-boot write's `before` half unreconstructable;
   **reversal point: a bounded amendment.** **AND THE BOOT'S ANSWER FOR A CONTENT CLASS `§1.4` DOES NOT
   ADMIT — STATED BECAUSE `§1.4`'s FAILURE IS A WRITE-TIME RULE AND THE BOOT IS NOT A WRITE** (`DD-29`;
   `[T + DD-29 | DECLARED-DEFAULT]`): **a register KEY whose value lies outside `§1.4`'s admitted set (a
   `null`, a non-finite number, a class no leaf may hold) is DROPPED from the boot's register — the rest of
   the content loads, the instance IS returned, and NO code is produced for the dropped key**; **the store's
   register therefore begins with exactly the keys whose values the taxonomy admits, and a boot-time
   `ValueNotAdmitted` is NOT declared, because `§8.1` #13's trigger is a WRITE's value.** **`DD-29`'s `alt`
   cell prices the boot-failure alternative.**
   `[P: §1, §11 · A15 · A16, §12 · A19 | CONTRACT + the boot's and the file-durability DECLARED-DEFAULT
   sub-clauses, priced at `DD-28` and `DD-29`]`
7. **⟶ ADDED 2026-10-11 — THE `file` TIER'S JSON TEXT CARRIES A CANONICAL NUMBER SPELLING, AND THE
   NORMALIZATION IS A PROPERTY OF THE FILE'S IMAGE AND NOT OF THE VALUE THE STORE HOLDS** (`RCA-8(d)`
   ANNOTATE-BESIDE: **every item above stands BYTE-FOR-BYTE and THIS item is the operative statement of
   what the committed bytes carry for a number**; **the ruling: *"Normalize into file"*, transcribed as
   `A59` at the FILED proposal `docs/specs/storeroom-listeners-proposal.md` `§21`, whose resolving citation
   form is `P: §21 · A59`**; `store-model.md §1.4`'s narrowed class 3 and `P: §21 · A60`;
   `§5.2`'s `P-IM-1` scope clause; `DD-46`; **AND THIS ITEM IS CARRIED IN TWO COPIES BECAUSE THIS SPAN HAS
   TWO — this document's `§7.2` and `seams-and-lifecycle.md §7.2`, whose own map row declares it, are the
   same span and this item is authored in BOTH in the same pass, byte-for-byte, so neither copy is left
   stale**; `[T: the `file` image's spelling and the narrowing's own reach, so neither is inferred from a
   value's equality | DECLARED-DEFAULT]`).
   **THE CLAUSE, IN FOUR PARTS:**
   - **(a) THE RULE.** **A NUMBER IS NORMALIZED ON THE WAY INTO THE FILE, and its canonical spelling is
     THE SHORTEST DECIMAL SPELLING THAT PARSES BACK TO THE SAME `f64`** — Rust's `f64` `Display` form: an
     integral carrier value takes no fractional part (`100`, never `1e2` and never `100.0`), a signed zero
     is written `0`, and a value whose shortest spelling needs an exponent takes it (`1e300`, `5e-324`).
     **So `-0` is written `0`, and `1e2`, `1.0` and `1E+2` are each written in the canonical form of the
     value they denote** (`P: §21 · A59`'s own examples) — **`DD-46` (a)'s rule, stated here where the
     file's bytes are the subject.**
   - **(b) THE SIDE.** **The rule binds the WRITE-TO-FILE side ONLY.** **It is NOT required on the read
     side: any finite JSON number spelling a parser admits is ACCEPTED at the boot of item 6 and converted
     to the carrier it denotes, canonical or not** (`DD-46` (b)) — **so a file whose content carries `1E+2`
     loads as `100`, and the file's non-canonical text is not itself an error and is not rewritten by the
     boot.**
   - **(c) THE OBSERVABLE.** **The canonical form is OBSERVABLE ONLY THROUGH THE `file` BYTES** — and
     through what those bytes carry after a boot; **no verb returns JSON text** (`§0.4` closes the surface,
     and no clause of this directory hands a caller the file's text as a value). **AND THE ONE DECLARED
     NORMALIZATION IS OBSERVED IN TWO HALVES, WHICH ARE NOT THE SAME HALF:** **IN MEMORY (`mem` and
     `temp`) THE SIGN IS NOT TOUCHED — a `mem`/`temp` `-0` reads back `-0`; the committed bytes of a
     `file`-tier write of `-0` carry `0`, and a `file`-tier `-0` therefore READS BACK `0` after a boot —
     BY THIS ITEM'S DECLARATION and not as an inexactness** (`P: §21 · A59`: *"the normalization is a
     property of the FILE's IMAGE, not of the value the store holds"*). **AND THE BOOT CONVERTS TO A
     CARRIER AND NOT TO A SIGN: the VALUE read back after a boot of a `file`-tier `-0` is `0`, while a
     `mem`-tier `-0` is never routed through the file at all.**
   - **(d) THE NARROWED DOMAIN'S REACH, AND THE BOOT'S ANSWER FOR AN OUT-OF-RANGE SPELLING.** **A NUMBER
     OUTSIDE THE CARRIER'S EXACT RANGE IS REFUSED, and its declared answer is the EXISTING member
     `ValueNotAdmitted` (`§8.1` #14) and never a silent rounding** (`P: §21 · A60`; the predicate — an
     integral literal of magnitude greater than `2^53` — is `store-model.md §1.4`'s, read under `§1.4`'s
      EXACT-REPRESENTABILITY reading: the literal this predicate reaches is the one whose `f64` CARRIER CANNOT HOLD IT EXACTLY (`2^53 + 1`), while
      `2^53 + 2` and `2^53 + 4` — integral, above `2^53`, each held exactly — are INSIDE the bound).
      **THE REACH, STATED
     BECAUSE THIS DIRECTORY'S SURFACE DECIDES IT:** **the domain is decided over the value a JSON TEXT
     denotes AT THE MOMENT OF CONVERSION, and THIS ITEM IS WHERE THIS DIRECTORY PERFORMS THAT
     CONVERSION — the boot of item 6. On a WRITE the carrier has already converted: every
     `StoreValue::Num(f64)` the write arm can be handed is IN range by construction, so no out-of-range
     value reaches the write arm and no clause is left promising a refusal there that no state can
     exhibit.** **AND WHERE THE FILE'S OWN TEXT CARRIES AN INTEGRAL LITERAL OF MAGNITUDE GREATER THAN
     `2^53` — the ONE shape the taxonomy refuses — THE BOOT APPLIES `DD-29`, THE CLAUSE THAT ALREADY GOVERNS
     NON-ADMITTED BOOT CONTENT: that register key lies outside the ADMITTED set as `§1.4` narrows it, so it
     is DROPPED, the rest of the content loads, the instance IS returned, and NO code is produced for the
     dropped key.** **THE WRITE ARM'S OWN TRIGGER IS NOT WIDENED TO THE BOOT: `§8.1` #14's trigger is a
     WRITE's value, the boot's answer is `DD-29`'s and not this member's, and the two states' answers are
     therefore DIFFERENT AND EACH DECLARED** (`DD-29`'s priced boot-failure alternative stands unmoved).
     **ITS `alt`, PRICED, AND ITS REVERSAL POINT ARE `DD-46`'s** — its `(a)` cell prices the spelling
     alternatives, its `(b)` cell prices the second candidate predicate and the wider-carrier alternative,
     and its reversal cell names the instrument.**

### §7.3 The constraint-and-repair evaluation seam

1. **CONSTRAINTS AND REPAIRS ARE EVALUATED NODE-SIDE** (`P: §9 · A6`: *"Constraints/repairs are evaluated
   node-side"*). **THIS MEANS: THE CORE CARRIES NO CONSTRAINT OR REPAIR IMPLEMENTATION, AND THIS CONTRACT
   DECLARES NO CONSTRAINT SURFACE, NO REPAIR SURFACE, NO CONSTRAINT REGISTRATION AND NO CONSTRAINT
   RECORD** (`[P: §9 · A6 | NEGATIVE]`).
2. **THE JOURNAL IS THE WINDOW THE NODE-SIDE EVALUATION RUNS IN** (`P: §8`: the journal is *"needed to
   check constraint violations while preserving the original data in case of failure"*), **and the
   instrument the node uses to reach it is the returned op plus `rollback`** (`§6.2`, `§6.3`).
3. **`A6`'s own printed silences stand and are NOT answered here:** the evaluation's **timing relative to
   the landing**, **what the core must expose for it**, and **whether a repair writes through the
   journaled write path** are `J-20`/`J-21`/`J-22`, **and each is `P-1`'s** (`P: §9`'s `A6` cell;
   `R: §17.4` condition 2). **NO CLAUSE OF THIS CONTRACT STATES AN EVALUATION POINT, AN EXPOSURE OR A
   REPAIR'S ROUTE** (`[R: §8.1 (the `J-20`–`J-22` rows, carried and not asked) | OWED]` — owner the
   architect, positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row*).
4. **WHAT THE STORE DOES DO, AND ALL IT DOES:** **a write's `before` half is recorded before the install
   lands and the op is returned with it, so a node-side evaluator can instruct a rollback over the state
   that stood** (`§6.2`, `§6.4`).
`[P: §8, §9 · A6; R: §8.1 | CONTRACT + one OWED]`

---

## §8. The closed fail set — the codes, the generated messages, and the error's shape

### §8.1 THE CLOSED CODE SET — `15` members, each with its trigger

**⟶ AMENDED 2026-10-11 — THE SET CLOSES AT `15` MEMBERS: THE AS-FILED HEADING (*"`14` members, each with its
trigger"*) STANDS ABOVE BYTE-FOR-BYTE, AND THE ARCHITECT'S OWN WORDS ADD THE ONE MEMBER** (`RCA-8(d)`
ANNOTATE-BESIDE; `A53`: ***"Add new failure code"***; `A54`: ***"Default name"***). **THE SET'S MEMBERSHIP IS
STILL THIS CONTRACT'S TO CLOSE** (`P: §11 · A14` prints the FORM; `R: §17.4` condition 5 assigns the
membership; `DD-3`), **and the amendment adds EXACTLY ONE member — `FilePathUnreachable`, ranked `13` in the
CONSTRUCTION GROUP beside `ConstructionArgumentMissing` (`A54`'s *"Default name"* fixes the spelling the
supervisor proposed, and the shipped set's UPPER-camel form is followed) — while `ValueNotAdmitted` and
`FileCommitFailed` MOVE BY ONE RANK EACH and NO TRIGGER MOVES.** **A failure whose code is outside this set
is a contract violation, not an extension of the set** (unchanged).

**THE SET IS CLOSED.** *"Closed set of codes, with generated messages"* (`P: §11 · A14`). **Its membership
is this contract's to close** (`P: §11 · A14` prints the FORM and names one example; `R: §17.4` condition 5
assigns the membership to the contract; `DD-3`). **A failure whose code is outside this set is a contract
violation, not an extension of the set.**

| # | `code` | `rank` | The triggering state — the ONLY state that produces it |
| --- | --- | --- | --- |
| 1 | **`AddressMalformed`** | `1` | a segment outside `§1.5`'s domain (`L-1`); **an absent required argument** (`write` with no `tier`, `storeCreate` with `cfg.filePath` or `cfg.journalLength` absent, `rollback` with an absent `opId`); **an argument whose SHAPE is not the argument's shape at all — `null` or `undefined` for a `tier`, an `address`, an `opId`, a `filePath` or a `journalLength`** (`PAR-1`–`PAR-4`, `PAR-6`, `PAR-7`, `PAR-10`); **a blank (empty-string) `opId`** (`PAR-10`); a present construction argument outside its domain (`§7.1`) |
| 2 | **`AddressNotFound`** | `2` | the walk found no anchor at the segment's key (`L-3`); an integer segment aimed at the register (`L-INT-REG`); **a sub-floor address reaching the `secure` instance** (`DD-13`, which is `AddressNotFound` and not a floor-specific code) — **whose declared ANSWER SHAPE is stated and drivable at `§8.3`'s blindness clause: the same `status`, the same generated template, no floor-specific member and no distinguishing record** |
| 3 | **`LeafHasNoDownstream`** | `3` | the walk stood on a `leaf` with segments remaining (`L-4`) |
| 4 | **`TierNotFound`** | `4` | the walk found an anchor at the key but **no passed tier matches its tier** (`L-TIER`); a read whose passed tier set matches no version at an existing address (`DD-12`) |
| 5 | **`OutOfDomainTier`** | `5` | a tier argument outside `{file, mem, temp}` (`P: §14 · A29`); a write or delete whose tier is an array (any length); a non-string tier |
| 6 | **`ParentAnchorMonotonicityViolation`** | `6` | a write whose minted child anchor's tier would outrank its parent anchor's (`rank(child) > rank(parent)`; `F-6`) |
| 7 | **`ContainerKindConflict`** | `7` | a write whose value's kind contradicts the target container's kind (`F-4`; `P: §13 · A22`); **AND a write whose LAST SEGMENT's class contradicts the parent container's KEY DOMAIN — a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP`** (`§1.3`'s key-domain arm; `§1.5` items 2–3's NO-COERCION rule; `F-4`) — **both arms share this ONE member, exactly as the two DIRECTIONS of a value-kind conflict do (`DD-19`)** (`[T: the member's extended trigger, at this contract's third bounded amendment; no new member is minted for it | CONTRACT]`) |
| 8 | **`ReadTargetIsBranch`** | `8` | `readLiteral(address, tier?)` — the literal-only read form — resolves its target to a `branch` (`[T | DECLARED-DEFAULT]`: this contract's `read` returns the assembled JSON of a branch and **never** raises this code; the code exists because `read` also exposes the literal-only form `readLiteral`, which demands a leaf; its alternative — no literal-only form, and therefore one fewer reachable code — is priced at `DD-24`) |
| 9 | **`WriteParentNotLink`** | `9` | the resolved parent cannot hold children — the `leaf`-parent state (`F-5`); a write whose target is the empty address and therefore has no key to install under (`§3.2` item 4) |
| 10 | **`JournalOpUnknown`** | `10` | `rollback` called with an `opId` the instance's journal does not hold (`§6.4` `M-11`) |
| 11 | **`RollbackCompacted`** | `11` | a rollback whose scope includes at least one `compacted` entry (`§6.4` `M-6`) |
| 12 | **`ConstructionArgumentMissing`** | `12` | `storeCreate` called with `cfg.filePath` absent, or with `cfg.journalLength` absent (`§7.1`; `DD-17`) — **the construction-time failure, delivered before any instance exists** |
| 13 | **`FilePathUnreachable`** | `13` | **a `cfg.filePath` that was PROVIDED AND FAILS THE CONSTRUCTION-TIME REACHABILITY TEST** — the two-armed disjunction *"the file exists or the application can write it successfully"* (`A52`) read with the DRY RUN and the WRITE-ACCESS requirement (`A55`): **the path's parent directory does not exist; the path's directory or the file itself is not writable; the path IS a directory** (`DD-40`) — **delivered at construction, before any instance exists, and no file, directory or byte is created by the probe.** **`ConstructionArgumentMissing` is NOT reused for this state and the two members' triggers do not overlap: ABSENCE answers #12, PRESENCE with an unreachable path answers #13, and PRESENCE with a SHAPE outside the domain (`null`, `undefined`, `""`, a non-string) answers `AddressMalformed` (#1)** (`seams-and-lifecycle.md §7.1`; `DD-40`) (`[T: the member's authoring at this contract's sixth bounded amendment, on the architect's own *"Add new failure code"* (`A53`) and his *"Default name"* (`A54`), so the construction's reachability arm has a code to observe | CONTRACT]`) |
| 14 | **`ValueNotAdmitted`** | `14` | **⟶ RENUMBERED 2026-10-11: this member stood at rank `13` on the as-filed set and its TRIGGER IS UNCHANGED** — a write whose `value` is outside `§1.4`'s admitted set (`F-2`) — `null`, `undefined`, a function, a symbol, a `BigInt`, a non-finite number, a cyclic object, or a non-plain collection (`§1.4`). **It moves by ONE because the construction group gains a member; no trigger moves** |
| 15 | **`FileCommitFailed`** | `15` | **⟶ RENUMBERED 2026-10-11: this member stood at rank `14` on the as-filed set and its TRIGGER IS UNCHANGED** — **a `file`-TIER WRITE'S FAILURE PATH**, whichever of its three parts fails (the serialization of the `file` state, the file write at `cfg.filePath`, or the journal's own append) (`§7.2` items 3–4); **the caller receives THIS code after `A16`'s automatic journal rollback has run**; **a `mem`- or `temp`-tier write never produces it** (`§7.2` item 5). **It is the LAST member of the set and its `§8.2` template row moves with it** |

**THE COMPLEMENT, STATED SO THE SET'S CLOSURE IS NOT READ AS AN OMISSION** (`[T | NEGATIVE]`): **the
following are NOT failures and produce NO code** — an unoccupied key **on a write** (it mints,
`W-3`/`W-4`); an **empty address** (`§1.5` item 4); a **delete that removes nothing** (`DD-9`); an
**`unwatch` of an unknown handle** (`§6.5` item 6); **an unknown third key on the construction config**
(`§7.1`); a read of an **empty container** (it returns `{}` or `[]`, `DD-1`); a read at the address of a
**`branch`** through the ordinary `read` (it assembles, `R-2`/`R-3`); **a write at an occupied `(key, tier)`
pair** (`DD-11`).
**AND TWO CODES ARE DELIBERATELY ABSENT, NAMED SO THEIR ABSENCE IS A DECLARED RESULT:** there is **no
`BelowSecureFloor`** (`DD-13`: the instance does not see the address, so the answer is `AddressNotFound`),
and there is **no `PairOccupied`** (`DD-11`: the pair is purged and re-minted, `W-1`).
**AND TWO STATES ARE ON THE SET'S SIDE THAT ARE EASY TO READ AS COMPLEMENT MEMBERS, SAID PLAINLY:** **a
`file`-TIER WRITE'S COMMIT FAILURE IS A FAILURE and answers `FileCommitFailed`** (`§8.1` #15; `DD-25`) —
*whether the serialization, the file write or the journal append is the part that failed*; **and a
`mem`/`temp`-tier write cannot produce it** (`§7.2` item 5). **A `file`-tier write that succeeds produces no
code at all** — committing the bytes is the arm's own success.
**⟶ REPOINTED AT THIS CELL 2026-10-11 (`F-1`) — THE TWO RANK CITATIONS ABOVE MOVED WITH THE SET'S OWN
AMENDED ARITHMETIC AND NOTHING ELSE MOVED** (`RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands
byte-for-byte and THIS clause is the operative rank**). **THE AS-FILED FORM READ *"`§8.1` #14"* for this
member; the amendment's added construction member takes `FilePathUnreachable` to #13, `ValueNotAdmitted` to
#14 and `FileCommitFailed` to #15** — **so THIS member's rank is #15 and the construction group's two
members are #12 and #13** (`§8.1`'s dated clause, whose terms are `11 + 2 + 1 + 1 = 15` ✓). **The code, the
trigger, the message row and `DD-25` are UNCHANGED by this repointing** (`[T: the rank's repointing, so no
printed cell is left stale | CROSS-REF]`).
**ARITHMETIC, PRINTED WITH ITS TERMS:** **the set carries `14` members, ranked `1`…`14` (`14 = 14` ✓)**;
**`11` are reachable from the walk and the three address verbs, `1` (`ConstructionArgumentMissing`) from
construction, `1` (`ValueNotAdmitted`) from the value taxonomy, and `1` (`FileCommitFailed`) from the
`file` tier's commit path — `11 + 1 + 1 + 1 = 14` ✓** — and **every member has a trigger and every named
failure in this contract has a member**
(`[P: §11 · A14, §13 · A22, §14 · A29; T: the set's closure | CONTRACT + 1 CENSUS]`).
**⟶ RECONCILED 2026-10-11 (THE AMENDMENT'S DOCUMENTATION-REVIEW GATE, `role_documentation_reviewer`; THE `#12` TABLE
ROW ABOVE STANDS BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE ONE TRIGGER IT PRINTS STALE)**
(`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed `code` row's own words are quoted below, so nothing it said is lost; this
clause moves NO member, NO rank and NO arithmetic**; the listener amendment's `A49`; `seams-and-lifecycle.md §7.1`'s
amended table and its own dated `ConstructionArgumentMissing` clause; `§5.7`'s re-derived `P-TP-7` row; `§0.2`'s
`DD-17` dated clause; `[T: the trigger's reconciliation, verified against the built suite's own drives | CONTRACT]`).
**THE CELL THAT MOVED AND WHAT IT READ:** **`§8.1` #12's `The triggering state` cell reads *"`storeCreate` called with
`cfg.filePath` absent, or with `cfg.journalLength` absent (`§7.1`; `DD-17`) — the construction-time failure, delivered
before any instance exists"*.** **THE OPERATIVE TRIGGER IS NARROWER THAN THAT CELL, AND IT IS ONE ARGUMENT:**
**`ConstructionArgumentMissing` is produced ONLY by the ABSENCE of `cfg.journalLength`** — **an ABSENT `cfg.filePath`
is LEGAL and the register is created at `mem` (`A49`), a PRESENT-BUT-OUT-OF-DOMAIN `filePath` or `journalLength`
answers `AddressMalformed` (`§8.1` #1), and a PROVIDED path that fails the construction-time reachability test answers
`FilePathUnreachable` (`§8.1` #13)** — **so the member's trigger column, read for `cfg.filePath`, is superseded by the
amendment and the row's own `code`, its rank `12`, its generated-message row and the set's `11 + 2 + 1 + 1 = 15 = 15`
arithmetic are UNMOVED.** **THIS IS THE CELL `seams-and-lifecycle.md §7.1`'s dated clause ALREADY DECLARES — *"the
member's own trigger column at `§8.1` #12 names exactly that one"* — so this clause makes that declaration TRUE rather
than resting on an as-filed cell, and it is the same answer `§5.7`'s re-derived row prints (`(i) … the ABSENCE of
`cfg.journalLength`, the ONE absence the amended construction still refuses`), `§5.9`'s property cell prints (its two
construction members' drives) and the built red set drives (`tests/construction.rs`'s absent-`filePath` arm asserting
a `mem` register with NO code, and `tests/fail_codes.rs`'s `s8_1_12_…` re-derived to the one remaining absence with the
absent-`filePath` negative half asserted beside it).** **NO `DD` ROW IS AUTHORED, NO `PAR` ROW MOVES AND NOTHING UNDER
`src/**` OR `tests/**` MOVES WITH THIS CLAUSE.** **⟶ AND THE AS-FILED COUNT CLAUSE BESIDE THIS ONE STANDS AS FILED:
the `14`-member arithmetic clause below is the pre-amendment `CENSUS` and the amendment's own dated clause under it is
the operative one — nothing here re-prints either figure.**
**⟶ AMENDED 2026-10-11 — THE SET'S ARITHMETIC, PRINTED WITH ITS TERMS IN ITS OWN NEW TERMS** (`A53`/`A54`;
`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed arithmetic above stands byte-for-byte and THIS clause is the
operative count**). **THE SET CARRIES `15` MEMBERS, RANKED `1`…`15` (`15 = 15` ✓)**, and the group algebra
closes in its own terms: **`11` are reachable from the walk and the three address verbs (`1`…`11`, each with
its trigger, UNMOVED) + `2` from CONSTRUCTION (`ConstructionArgumentMissing` `12`, `FilePathUnreachable`
`13` — the amended construction group) + `1` (`ValueNotAdmitted`, now `14`) from the value taxonomy + `1`
(`FileCommitFailed`, now `15`) from the `file` tier's commit path — **`11 + 2 + 1 + 1 = 15` ✓**. **AND THE
MOVED FIGURES, NAMED SO NO PRINTED CELL IS LEFT STALE:** the as-filed sentence *"`11` … `1` … `1` … `1`"*
becomes *"`11` … `2` … `1` … `1`"*; **`§8.2`'s generator table gains the `FilePathUnreachable` row and
`FileCommitFailed`'s row keeps its own template while the TABLE's position of the two renumbered rows moves
with them**; **`§5.9`'s `S-FAILSET` census moves from `14 + 1` to `15 + 1`**; **the register's `P-TP-9`
row's interaction map gains the reachability member; and the shipped red set's `CLOSED_CODES` array and its
count assertions (`tests/fail_codes.rs`'s `14`-member assertions, `tests/support/mod.rs`'s `[&str; 14]`
spelling) are RE-DERIVED BY THE TESTWRITER — no `tests/**` byte is written by this pass**
(`AR-14`; `AR-16`; `[T: this contract states the clauses; the drives are the TestWriter's | OWED]`).
**THE RE-DERIVATION'S OWN DISCHARGE CONDITION, STATED POSITIVELY:** **owner `role_test_writer`; positive
revisit condition *the amendment's red set is authored from these clauses alone and `CLOSED_CODES` carries
the `15` members with `FilePathUnreachable` at rank `13`*** (`[T: the moved arithmetic, with every printed
cell it touches named | CENSUS]`).
**AND THE ONE MEMBER THE FIRST AMENDMENT'S SET DID NOT CARRY, STATED SO THE ADDITION IS NOT READ AS A
SILENT WIDENING:** **`FileCommitFailed` is the member `§7.2` items 3–4 needed and did not have** — a
`file`-tier write's failure path is *"passed back to the caller"* (`P: §11 · A16`) and `§5.9`'s
interaction map assigns *"the `file` commit's failure arm → `P-TP-9` (the `file`-tier failure's code and
message)"*, so **before this amendment the register's `S-FAILSET` drive had a `file`-failure observable
with NO code to carry it** (`[T: the closure's completion | CONTRACT]`). **`FileCommitFailed` is
DELIBERATELY NOT a family:** the serialization, the write and the journal append are **ONE** failure and
answer **ONE** code (`§7.2` item 4), exactly as both directions of a kind conflict answer
`ContainerKindConflict` (`DD-19`).

### §8.2 THE GENERATED-MESSAGE RULE, WITH WORKED EXAMPLES IN THE ARCHITECT'S OWN FORM

**EVERY MESSAGE IS GENERATED FROM ITS CODE AND THE FAILING TRIGGER'S ARGUMENTS — a message is never
hand-authored at a call site** (`P: §11 · A14`). **The architect's own example fixes the FORM:**

> `status: 'AddressNotFound', message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'"`

**THE GENERATOR'S SIGNATURE AND RULE** (`[T: this contract's generator, derived from the example's form | CONTRACT]`):

```
storeErrorMessage(code, args) → string

THE `args` SHAPE, DECLARED (the gate-3 report's own `§5.3` row on `storeErrorMessage(code, args)`, whose subject is *"the generator's `args` shape is undeclared"*): `args` is ONE record, `MessageArgs`, whose five members
are ALL OPTIONAL and each of which is present only when the trigger supplies it:
  MessageArgs = {
    segment:      string?,    // the failing segment's spelling (a string segment prints single-quoted; an
                              //   integer segment prints bare) — or the address's own spelling, joined
                              //   by '/', where the trigger fails on a whole address
    container:    string?,    // the container or node the mismatch was found in: '' for the register,
                              //   a dotted path such as 'window.tabs' otherwise
    keys:         string[]?,  // the container's keys, each printed single-quoted
    tiers:        Tier[]?,    // the tiers present, printed in §5.1's canonical order
    path:         string?     // the `file` tier's path, where the trigger is a `file`-tier commit
  }
AN ARGUMENT THE TEMPLATE NEEDS IS ALWAYS SUPPLIED BY THE TRIGGER (property (c) below); an argument the
trigger does not supply is ABSENT, never `null` and never the string "undefined".

The generated shape, in general:
  '<SEGMENT>' <mismatch clause> '<CONTAINER>', <available clause>

where
  <SEGMENT>         = `MessageArgs.segment`: a string segment is single-quoted ('a'); an integer
                      segment is bare (0); a non-segment argument is printed as its own value, single-quoted
  <CONTAINER>       = `MessageArgs.container`: the container or node the mismatch was found in, named as the
                      address's own spelling ('' for the register, or a dotted path such as 'window.tabs')
  <mismatch clause> = the code's own phrase (the table below)
  <available clause>= the code's own phrase (the table below), with
                      <CONTAINERSEGMENT> = **the container's OWN segment spelling — the last string-key
                      segment of the address at which the container stands, e.g. `tabs` for the container
                      reached by 'window.tabs'** — used as the SUBJECT of the available-keys clause, and
                      `keys` where the container has no segment spelling of its own (the REGISTER, whose
                      address is empty);
                      <KEYLIST> = the container's keys as single-quoted strings joined by ', ';
                      <TIERLIST> = the tiers present, in §5.1's canonical order, joined by ', ';
                      <DOMAINLIST> = the code's domain, joined by ', ';
                      <TRAITS> = the target's kind, one of leaf/branch, then the container kind if any
```

| `code` | `<mismatch clause>` | `<available clause>` |
| --- | --- | --- |
| `AddressMalformed` | `is not a legal address segment` (or, for an absent argument, `requires a <argument-name> argument`) | `segments are strings or non-negative integers` (or, for a construction argument, `a <argument-name> is required`) |
| `AddressNotFound` | `does not exist in` | **`<CONTAINERSEGMENT> are <KEYLIST>`** — **and when the container holds no keys, `it holds no keys`** |
| `LeafHasNoDownstream` | `cannot be walked through` | `it is a leaf` |
| `TierNotFound` | `is not a version of` | `versions are at <TIERLIST>` |
| `OutOfDomainTier` | `is not a tier` | `tiers are <DOMAINLIST>` (`file, mem, temp`) |
| `ParentAnchorMonotonicityViolation` | `outranks its parent anchor's tier` | `a child anchor may not be more persistent than its parent` |
| `ContainerKindConflict` | `does not match the container kind of` | `it holds a <map\|vector>` (plus `, keys are <KEYLIST>` when the container is a map) |
| `ReadTargetIsBranch` | `is a branch and not a leaf in` | `it holds a branch` |
| `WriteParentNotLink` | `cannot be written into` | `it holds a leaf and not a link` |
| `JournalOpUnknown` | `is not an operation this store's journal holds` | `ops are reached through the journal op a write returned` |
| `RollbackCompacted` | `is out of scope because it is compacted` | `compacted operations are out of scope` |
| `ConstructionArgumentMissing` | `requires a <argument-name> argument` | `a <argument-name> is required on store creation` |
| `FilePathUnreachable` | `is not reachable at construction` | `the path must exist or the application must be able to write it` (`MessageArgs.path`; the DRY RUN leaves nothing behind — `A55`) |
| `ValueNotAdmitted` | `is not an admitted value` | `admitted values are strings, booleans, finite numbers, plain objects and arrays` |
| `FileCommitFailed` | `could not be committed to` | `the file write failed at '<PATH>'` (`MessageArgs.path`) |

**THE `<available clause>`'s SUBJECT, SETTLED SO EXAMPLE (1) IS REPRODUCIBLE FROM THE RULE — the directory
defect the amendment closes:** **the architect's own example prints `tabs are 'doc1', 'searchbar'`, naming
the container's OWN SEGMENT rather than the word `keys`** — and the contract calls that example the one
that fixes the FORM. **The rule above therefore makes `<CONTAINERSEGMENT>` the subject** (`tabs` for the
container at `window.tabs`; `keys` only where the container is the register and has no segment spelling),
so **example (1) is now produced BY the rule and not beside it** — which is what *"each reproducible from
the rule above"* claims ([T: the reconciliation, taken in this contract's second bounded amendment |
CONTRACT]).

**WORKED EXAMPLES — three, in the architect's own form, each reproducible from the rule above** (the first is
the architect's own, printed at `P: §11 · A14`) (`[T: generated from §8.2's rule | CONTRACT]`):

```
// (1) the architect's own example — a key absent from a named container
{ status: 'AddressNotFound',
  message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'" }

// (2) the same code at an empty container — the <available clause>'s degenerate arm
read(['window', 'empty'])
{ status: 'AddressNotFound',
  message: "'empty' does not exist in 'window', it holds no keys" }

// (3) the container kind arm — an array written where a map stands
write(['window', 'tabs'], 'mem', [1, 2])
{ status: 'ContainerKindConflict',
  message: "[1,2] does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'" }
```

**THREE PROPERTIES OF THE GENERATOR, EACH CHECKABLE, AND `P-TP-9` IS THEIR HOME**
(`[T | CONTRACT]`): **(a) DETERMINISM** — the same `(code, args)` yields the same string, always;
**(b) COMPLETENESS** — every code in `§8.1` has a `<mismatch clause>` and an `<available clause>` in the
table above, so **no code can generate an empty or placeholder message**; **(c) NO UNSUBSTITUTED PLACEHOLDER
SURVIVES** — **no UNSUBSTITUTED placeholder token survives into a generated message: every `<…>` slot the
rule above names is SUBSTITUTED by the trigger's argument, so no fragment of the form `<SEGMENT>`,
`<CONTAINER>` or `<TIERLIST>` appears in a message, and no message is the empty string — AND A LEGITIMATE
VALUE THE TRIGGER SUPPLIES IS NOT A PLACEHOLDER: a container KEY legally named `null`, `undefined` or `TBD`,
or a key containing `<` or `>`, appears in the generated text because the trigger supplies it, and a
containment check over the raw characters is therefore NOT this property's rule.** **An argument the
template needs is always supplied by the trigger** (a code whose trigger supplies no keys uses the degenerate
arm, as example (2) shows) (`[T: property (c)'s narrowed form, at this contract's third bounded amendment —
the gate-4 adversarial pass's `S-9`/`CL-8` found the raw-character containment check unpinnable against a
legitimate key, and the claim is narrowed to *"no unsubstituted placeholder"* | CONTRACT]`).
`[P: §11 · A14; T: the generator's rule and its three properties | CONTRACT]`

**⟶ AMENDED 2026-10-11 — `ValueNotAdmitted`'s ROW IS READ WITH THE NARROWED TRIGGER, AND THE ONE CELL THIS
AMENDMENT MOVES IN IT IS NAMED SO NO ROW IS LEFT FALSE** (`RCA-8(d)` ANNOTATE-BESIDE: **the table row, the
`MessageArgs` shape, the general shape, the three properties, the `<CONTAINERSEGMENT>` reconciliation and
the three worked examples above all stand BYTE-FOR-BYTE, and NOTHING IS CORRECTED IN THEM**; `P: §21 ·
A60`; `§1.4`'s narrowed class 3; `store-model.md §1.4`; `DD-46`; `§8.1` #14).
**THE CELL THAT MOVES, AND WHAT IT READ: the `ValueNotAdmitted` row's `<available clause>` cell reads
*"`admitted values are strings, booleans, finite numbers, plain objects and arrays`"*.** **THE OPERATIVE
PHRASE FOR THAT ONE ROW IS NARROWER IN ONE COORDINATE AND IS THE SAME IN ALL OTHERS: the admitted values
are strings, booleans, plain objects and arrays, and FINITE NUMBERS WHOSE VALUE THE `f64` CARRIER HOLDS
EXACTLY** (`§1.4`'s predicate; `store-model.md §1.4`). **The generated sentence's SHAPE, its phrase table,
the row's `<mismatch clause>` (*"`is not an admitted value`"*), the code, the rank `14` and the generator's
three properties are UNMOVED** — **`A60`'s own words:** *"So the taxonomy's *'a finite JSON number'* is
NARROWED to the f64-exact range, and the refusal is the declared answer for the out-of-bounds value"*.
**AND THE ONE POINT OF THE ROW `A60` LEAVES OPEN IS ANSWERED WHERE THE PROPERTY THAT CHECKS IT LIVES:**
`A60` asks *"nor whether a caller can observe the refusal's TRIGGER (the value) as against its code"* —
**and this contract's answer is the DELIVERY CHANNEL `§5.9`'s row already states: a failure crosses as the
`Err` arm's `StoreError`, WHOSE TWO MEMBERS ARE `status` AND `message` AND NOTHING ELSE (`§8.3`), so the
TRIGGER IS OBSERVED AS THE `message` THE GENERATOR BUILDS FROM IT and NEVER AS A THIRD MEMBER** — **so a
caller reads the value that failed out of the generated text (the `<SEGMENT>`/`<CONTAINER>` slots the
trigger supplies), and a third member carrying the value structurally is REFUSED by `§8.3`'s closed
two-member record** (`§8.3`'s priced alternative; `[T: the trigger's observability, answered at the channel
the record already carries, so `A60`'s open point is a clause and not a silence | CONTRACT]`).
**NO CODE IS ADDED, NO RANK MOVES AND THE SET'S ALGEBRA STANDS (`11 + 2 + 1 + 1 = 15` ✓ — a NARROWED
TRIGGER IS NOT A NEW MEMBER), and this clause authors no `DD` row: its own `alt` and reversal point are
`DD-46`'s.**
`[P: §21 · A60; T: the narrowed available-clause phrase and the trigger's channel, at this contract's
eighth bounded amendment | CONTRACT]`

### §8.3 The error's shape — the closed status-code carrier

**A failure is delivered by THROWING a `StoreError`** (`DD-24(b)`):

```
StoreError = {
  status:  Code,       // one of §8.1's 15 members, as a string token — EXACTLY the architect's own
                       // example's spelling: `status: 'AddressNotFound'`
                       //   ⟶ AMENDED 2026-10-11: the as-filed comment read `14`; the listener amendment
                       //   takes the set to 15 members (`FilePathUnreachable` at rank 13). THE MEMBERS',
                       //   THE RECORD'S AND THE SPELLING'S OWN RULES ARE UNCHANGED.
  message: string      // the generated message of §8.2
}
```

**`status` is the member's EXACT spelling from `§8.1`'s `code` column** — **not an enum index, not a
numeric id and not a lowercased or prefixed variant** (`P: §11 · A14`'s example prints
`status: 'AddressNotFound'`, and the spelling is the member's own; `[T | CONTRACT]`). **`message` is the
generated string, never a constant, never empty, and never carrying a placeholder** (`§8.2`).
**`status` and `message` are the record's ONLY TWO members** — **no `stack` is declared as a member, no
`cause` and no `data`** (`[T | DECLARED-DEFAULT]`; the alternative — a third member carrying the failing
segment and container structurally — is priced: it would duplicate `message`'s content into an
unruled second channel, and `A14` names a status and a message; reversal point: a bounded amendment).
**THE `secure` INSTANCE'S BLINDNESS IS DELIVERED THROUGH THIS SAME RECORD:** a sub-floor address is
`AddressNotFound` with a message generated exactly as for an absent address — **the record does not
distinguish, and that indistinguishability IS `A36`'s *"Not see it"*** (`DD-13`; `[P: §14 · A32, §15 · A36 |
CONTRACT]`).
`[P: §11 · A14, §14 · A32, §15 · A36; T: the record's closed member set | CONTRACT]`

---

## §9. The parameter-semantics index — every declared parameter, and where its row lives

**One row per declared parameter, carrying its unit, its domain (and the values outside it), the declared
answer for EACH outside value, its supplier, its evaluator and its observable.** **The rows are
`PAR-1`…`PAR-11` and they live at `docs/specs/storeroom-native/parameter-semantics.md` `§2`** — this section
is the index, and **every row below is one map entry, not a restatement.**

| Row | The parameter | Where it is declared | Its row's home |
| --- | --- | --- | --- |
| **`PAR-1`** | `address` — the required path argument | `§1.5` (grammar), `§3.2` (walk), `§4.3` (delete) | `parameter-semantics.md §2 · PAR-1` |
| **`PAR-2`** | `tier` on `read` / `findAddress` / `watch` — optional, zero-to-many | `§3.1.1`'s arity table, `§2.3` | `parameter-semantics.md §2 · PAR-2` |
| **`PAR-3`** | `tier` on `write` — required, exactly one | `§3.1`, `§3.1.1` | `parameter-semantics.md §2 · PAR-3` |
| **`PAR-4`** | `tier` on `delete` — optional, exactly one when present | `§4.3`, `§3.1.1` | `parameter-semantics.md §2 · PAR-4` |
| **`PAR-5`** | `value` — the written value's taxonomy | `§1.4`, `§3.1` | `parameter-semantics.md §2 · PAR-5` |
| **`PAR-6`** | `cfg.filePath` — the `file` tier's external location | `§7.1`, `§7.2` | `parameter-semantics.md §2 · PAR-6` |
| **`PAR-7`** | `cfg.journalLength` — the journal's configured length, in ENTRIES | `§7.1`, `§6.1` | `parameter-semantics.md §2 · PAR-7` |
| **`PAR-8`** | `address` on `watch` / the opaque `WatchHandle` | `§6.5` | `parameter-semantics.md §2 · PAR-8` |
| **`PAR-9`** | the listener body and the JS-facing listener surface | **DECLARED as PARKED, not as a parameter this contract carries** (`§6.5`; `DD-23`) | `parameter-semantics.md §2 · PAR-9` |
| **`PAR-10`** | `opId` on `rollback` — the op's identity | `§6.2` (`opId`), `§6.3`, `§6.4` | `parameter-semantics.md §2 · PAR-10` |
| **`PAR-11`** | the `secure` instance's `file` floor | **DECLARED as CLIENT-SIDE and NOT a store parameter** (`DD-15`; `P: §14 · A32`) | `parameter-semantics.md §2 · PAR-11` |
| **`PAR-12`** | **⟶ ADDED 2026-10-11: `cfg.listeners` — the construction's listener array, its element shape, the empty case and the duplicate case** | **`seams-and-lifecycle.md §7.1`** (the amended construction sequence, step (iv)); `A56`, `A57` | `parameter-semantics.md §2 · PAR-12` **⟶ REPOINTED 2026-10-11: this cell's *"step (iv)"* resolves to `seams-and-lifecycle.md §7.1` STEP `5`** — the amended sequence numbers the home's population `5`, and `A56`'s `(i)`–`(v)` transcription is not the clause's numbering (`AM-15`; `§0.2 · DD-39`'s repointing clause; `parameter-semantics.md §2.12`) |
| **`PAR-13`** | **⟶ ADDED 2026-10-11: the listener's `handle` — its type, its source, its uniqueness domain and every outside value** | **`write-and-read.md §6.5`** (items 10 and 12); `A57`, `A58` | `parameter-semantics.md §2 · PAR-13` |
| **`PAR-14`** | **⟶ ADDED 2026-10-11: the two per-node LISTENER REFERENCE LISTS (`active` and `carried`) — the store's OWN internal reference surface, not a caller parameter** | **`write-and-read.md §6.5`** (item 9) and **`store-model.md §1.1`** (the member tables); `A45`–`A48` | `parameter-semantics.md §2 · PAR-14` |

**ARITHMETIC, PRINTED WITH ITS TERMS: the parameter-semantics set is `11` rows (`PAR-1`…`PAR-11`), of
which `9` are parameters this contract DECLARES the store as carrying, `1` (`PAR-9`) is a parameter declared
PARKED, and `1` (`PAR-11`) is a floor declared CLIENT-SIDE — `9 + 1 + 1 = 11` ✓.** **Every parameter the
store's surface declares has a row, and no parameter outside this list exists** (`[T: the parameter set's
closure | CENSUS]`). **AND THE PARAMETER-SEMANTICS ROWS ARE UNCAPPED AND ARE NOT THE REGISTER'S ROWS** —
**the typed `P-*` register is a separate surface whose cap is `≤ 8` and which holds at `8 ≤ 8`
(`§5.2`–`§5.9`; §0.1 item 5), while the `PAR-n` rows are provenance rows and no count in this document is
a budget for them** (`[T: the two surfaces' own separation, stated at this contract's third bounded
amendment in place of an id this repository does not carry | CONTRACT]`); **and they are not the register's
rows — the two are different surfaces.**
`[T: §9's index; §0.1 item 10(a) (the relocated span's citation form) | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THE INDEX'S OWN ARITHMETIC, RESTATED WITH ITS TERMS BY THE LISTENER AMENDMENT**
(`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed clause above — *"the parameter-semantics set is `11` rows
(`PAR-1`…`PAR-11`), of which `9` are parameters this contract DECLARES the store as carrying, `1` (`PAR-9`)
is a parameter declared PARKED, and `1` (`PAR-11`) is a floor declared CLIENT-SIDE — `9 + 1 + 1 = 11` ✓"* —
STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE**). **THE OPERATIVE CLAUSE, AND THE TWO HOME NOTES A
RELOCATED SPAN OWES ITS RELOCATION** (`§0.1` item 10(a); `§3.6`): **the set is now `14` rows
(`PAR-1`…`PAR-14`) — `12` parameters the store carries (`PAR-1`…`PAR-8`, `PAR-10`, `PAR-12`, `PAR-13`) + `1`
parked parameter (`PAR-9`) + `1` internal reference surface (`PAR-14`) + `1` client-side duty (`PAR-11`) —
so `12 + 1 + 1 + 1 = 15` — **⟶ CORRECTED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; THE AS-FILED TERM LIST AND ITS SUM STAND BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE ARITHMETIC)** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell read `12 + 1 + 1 + 1 = 15` and then asserted the set closes at `14`, so the as-filed sum was FALSE OF ITS OWN TERMS — `4` addends against `3` in the closing figure**): **THE FOUR PARTS OF THE `14`-ROW SET, COUNTED ONCE EACH: `12` caller-facing parameters and surfaces the store carries (`PAR-1`…`PAR-8`, `PAR-10`, `PAR-12`, `PAR-13`) + `1` parked parameter (`PAR-9`) + `1` client-side duty (`PAR-11`) + `1` internal reference surface (`PAR-14`) — and of those four, `PAR-14` is the store's OWN internal surface and NOT a caller parameter, so the CALLER-FACING count is `12 + 1 + 1 = 14` and the DECLARED-`PAR`-ROW count is `11 + 3 = 14` (`PAR-1`…`PAR-14`).** **THE SET THEREFORE CLOSES AT `14` BY EITHER READING, AND THE TRUE ARITHMETIC PRINTED WITH ITS TERMS IS `12 + 1 + 1 = 14` ✓ (`14` caller-facing/declared rows = `14` `PAR` ids) — the `15` the as-filed cell printed is REFUTED and is superseded by this clause; `PAR-14`'s own row at `parameter-semantics.md §2.14` carries the same correction, so the index and its relocation agree** (`[T: the `§9` index's own arithmetic, corrected at the proofreading gate so no cell sums `4` terms to `3` | CENSUS]`) and, with `PAR-14` read as the store's OWN surface rather than a caller parameter,
the CALLER-FACING count closes as `12 + 1 + 1 = 14` ✓**; **the three added rows' bodies live at
`parameter-semantics.md §2.12`, `§2.13` and `§2.14`**, and **the same three additions stand in that part's
own `§1` (the relocation) with the same pointer clause** — **a citation to either index is written with the
part's path, because a bare `§n` across two documents is not an edge** (`§3.6`).
**AND TWO OF THE AMENDMENT'S OWN CONSEQUENCES ON THESE ROWS, NAMED SO NO CITATION GOES STALE:**
**`PAR-6`'s ABSENT case is NO LONGER a failure** (`A49`: the path is optional and its absence creates the
register at `mem`), **and EVERY ROLE THE MEMBERS' CELLS NAME NOW READS FROM THE CLOSED `15`-MEMBER SET AT
`§8.1` rather than the `14`** (`A53`; `§8.2`; `§0.2 · DD-3`).
**THE PARAMETER ROWS REMAIN UNCAPPED AND ARE NOT THE REGISTER'S ROWS** (the two surfaces' separation, stated
above, stands unmoved by this amendment).
`[P: §15 · A49, §17 · A56, §18 · A57, §20 · A58; T: the index's restatement, with the as-filed form named
and nothing deleted | CENSUS]`

---

## §10. The scope boundary's own clauses — the parks, the handoff, and the prohibited set

### §10.1 The two parks, stated as boundaries and not as implementations

| Park | What it holds | Its boundary clause, in one line |
| --- | --- | --- |
| **`docs/pending.md` `P-1` — THE JS INTEGRATION SET** | the realm · the builder/ABI and packaging path · the host handoff · the crossing of every value the store produces into JS (the returned op, the watched-address list) · the load path · the boundary's taxonomy crossing · the surface's ownership · the resolver's returned shape across a boundary · the module-supplied functions' crossing · the packaging · the consumer question · the event surface · the parameter rows' arity · the in-flight cycle's disposition · the `secure` instance's mechanism | **the store builds the store: the realm, the builder/ABI path, the packaging, the host handoff and every value's crossing into JS are DEFERRED and are NOT specified by this contract** |
| **`docs/pending.md` `P-3` — THE LISTENER IMPLEMENTATION** | the alerted list's ORDER · the attachment rule (by address or by identity) · the firing mechanism · the callback invocation · the JS-facing listener surface · a throwing body's disposition | **the store TRACKS listener registrations and RETURNS the watched-address list; the listener's order, attachment rule, firing, invocation surface and throw behaviour are NOT specified by this contract** |

**BOTH ARE `OPEN`, NEVER GREEN, owner the architect, positive revisit condition *the store passes its own
test suite*, surfaced for lifting by the supervisor under `P-2`; no integration or listener question is put
while either stands, a park read as a closure is a finding, and a pass that lifts a park fails**
(`R: §17.1`, `R: §17.4` condition 3; `[R: §6 · §17.1 · §17.4 | NEGATIVE]`).

**⟶ RECONCILED 2026-10-11 (`RCA-8(d)` ANNOTATE-BESIDE: **EVERY CELL OF THIS SECTION, THE `P-1` AND `P-3` ROWS OF THE PARK TABLE AND THE *"BOTH ARE `OPEN`"* CLAUSE UNDER IT — INCLUDING ITS *"no integration or listener question is put while either stands"* AND *"a pass that lifts a park fails"* HALVES — STANDS BYTE-FOR-BYTE, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF `P-1`'S STATE**)** (`P: §11 · A66`; `docs/specs/storeroom-js-proposal.md` `§11`, the ruling's row; nothing in the file re-emits the as-filed paragraph because no byte of it is superseded): **THE AS-FILED HALF THIS CLAUSE RECONCILES READ** *"BOTH ARE `OPEN`, NEVER GREEN … no integration or listener question is put while either stands"*. **THE OPERATIVE STATE: `P-1` — THE JS INTEGRATION SET — IS `LIFTED`, NOT DELETED, BY THE ARCHITECT'S OWN ACT (`A66`, his own words: *"this is the unpark of the integration"*), so its `28` rows LEAVE THE PARK and become `U-STOREROOM-JS`'s own open material, whose ROW-BY-ROW MAP IS OWED AT THAT UNIT'S CONTRACT (the js proposal's condition `C14`, its `§9.4`/`§11`).** **THE PARK'S OWN RECORD STANDS WITH ITS DATED LIFT CLAUSE (`docs/pending.md` `P-1`, *"lifted, not deleted"*, the convention `P-3` already carries under `A44`), and the lift clause was written by the architect's ruling and NOT by the pass that records it here.** **`P-3` — THE LISTENER IMPLEMENTATION — IS UNMOVED BY THIS CLAUSE: its own dated lift clause is recorded at `docs/pending.md` under `A44` (the architect's *"Yes, this is the listener unpark"*) and it stands as it stands, with this clause adding nothing to it and taking nothing from it.** **AND THIS SECTION'S OWN PARK-BOUNDARY CLAUSE IS SCOPED BY THE SAME RULING: *"no integration question is put while either stands"* is SUPERSEDED FOR THE SUCCESSOR JS UNIT — whose gate may put integration questions to the architect — and STANDS FOR EVERY OTHER PASS; *"a park read as a closure is a finding"* is unmoved for every park and for every pass; and *"a pass that lifts a park fails"* is unmoved too, because `P-1` was lifted by the ARCHITECT'S ACT and not by a pass — no pass may read either lift as a licence to lift a park.** **NOTHING MOVES BY THIS CLAUSE: no `DD` row, no register row, no fail-code row, no `CENSUS` and no ledger count, and the rows that left the park are counted at `docs/pending.md` and at the JS unit's contract, never here** (`[T: `P-1`'s operative state and the park-boundary clause's scoping, taken from the architect's own unpark and no pass's preference; `P-3` left as its own dated clause records it | CROSS-REF]`).

### §10.2 The handoff rule — the `HO-` rows and the prohibited set

**HOST INTEGRATION IS A HANDOFF AND NOT THIS UNIT'S WORK** (`P: §9 · A2`: *"integration into
Provident-Electron will be delegated to that project's agents"*), **and the client-side `file` floor
enforcement is the consuming project's duty** (`P: §14 · A32`; `DD-15`). **Consequences binding this
unit's later gates, each a prohibition with its citation** (`R: §17.4` condition 2) (`[R: §17.4 condition 2 | NEGATIVE]`):

| # | Prohibited | Its citation |
| --- | --- | --- |
| 1 | **any plan phase, red row, unit row or `crate/**` byte that wires the host** — a host-wiring step FAILS | `R: §17.4` condition 2 with `AR-36`/`AR-42`; `P: §10 · A8` |
| 2 | **any question about the JS integration put to the architect** | `P: §10 · A8`: *"Stop asking questions about the JS integration"* |
| 3 | **any listener question put to the architect while `P-3` stands** | `R: §17.1` constraint (iv) |
| 4 | **any byte under `../Provident-Electron/**` read as authority or written** — a finding against it is a `HO-` row in `docs/defects.md`, never a patch | `P: §11 · A9`; `A: docs/decisions.md`'s ACTIVE row *"DECIDED: THE ADJACENT PROJECT'S CORPUS IS READ-ONLY FOR THIS PROJECT, AND ITS TEXT IS NEVER EDITED FROM HERE"* |
| 5 | **any clause of this contract derived from the adjacent corpus** — a corpus-ground clause is a finding, and a disagreement with that corpus is intentional | `P: §11 · A9`; `R: §17.8`'s closing bound |
| 6 | **any `secure` tier, `secure` family, `secureAccess` gate, tombstone, purge-as-a-verb, `_value`, `listen`/`constrain`/`load` verb or a second register** — none of these names is a member of this unit's declared surface | `P: §9 · A4` (no fourth inbuilt tier); `L: §1` (a name the declaration does not carry is not a row); **§0**'s omitted-part row for `property-register` and §0.1 item 10(a) (no second register is authored for this unit, and no part holds a second addressable home for the register's rows) |
| 7 | **a red set authored against an unruled carrier, realm or boundary** — and this unit's REALM is still `P-1`'s | `R: §17.4` condition 4 with `AR-17`/`AR-30` |

**⟶ RECONCILED 2026-10-11 (`RCA-8(d)` ANNOTATE-BESIDE: **EVERY ROW OF THE PROHIBITED-SET TABLE ABOVE, ITEM 2 INCLUDED, STANDS BYTE-FOR-BYTE, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF ITEM 2'S SCOPE**)** (`P: §11 · A66`; `docs/specs/storeroom-js-proposal.md` `§11`, the ruling's row; nothing re-emits the as-filed row because no byte of it is rewritten): **THE AS-FILED ITEM THIS CLAUSE RECONCILES READS** *"**any question about the JS integration put to the architect**"*, cited to `P: §10 · A8`: *"Stop asking questions about the JS integration"*. **THE OPERATIVE READING: THAT PROHIBITION IS SCOPED TO THIS UNIT'S OWN BUILD — the deferral `A8` made (*"This is to build the store. Defer the integration until the store passes testing"*) — AND IS SUPERSEDED FOR THE SUCCESSOR JS UNIT BY THE ARCHITECT'S OWN UNPARK (`A66`: *"this is the unpark of the integration"*), so `U-STOREROOM-JS`'s gate MAY PUT INTEGRATION QUESTIONS TO HIM.** **FOR NO OTHER PASS DOES THE PROHIBITION MOVE: it stands for this unit and for every pass that is not the JS unit's own, the as-filed cell standing as the store unit's own boundary.** **NO COUNT AND NO SET MOVES BY THIS CLAUSE — the prohibited set stays the `7` rows the table above prints, no row is added, dropped or renumbered, and no byte of any row's own text is rewritten** (`[T: item 2's scoping and the successor unit's supersession, taken from the architect's own unpark and no pass's preference | CROSS-REF]`).

### §10.3 The candidate-property dispositions (`AR-9`, `F12`) — stated so none vanishes silently

**The gate's candidate-property sets (`IM-1`…`IM-10` · `SM-1`…`SM-10` · `TP-1`…`TP-7`, raised by gate-1
steps 1 and 2) must each be dispositioned in this contract, carried, rewritten with a ruling cited, or
declared out with a reason** (`R: §17.4` condition 5; `AR-9`; `F12`).
**HONEST BOUNDARY, STATED RATHER THAN PAPERED:** **the step reports' candidate id tables are NOT carried by
the artifacts this pass read** — the gate-1 step reports' candidate sets are named by id and count at
`R: §5.2` and `docs/specs/storeroom-native-implementation-plan.md §P.4` item 6, and **their row texts are
not in this workspace's readable records** (`[R: §7.3 (the eight stated gaps) | OBSERVATION]`).

**Therefore this contract disposes of the candidates in the only two ways available to it:** **each
candidate's SUBJECT is carried by a named property row, and the id-level mapping is OWED.**

| The candidate subject, as the gate records it | Its disposition HERE |
| --- | --- |
| the write→read round trip / isolation | **carried as `P-IM-1`** (`§5.2`) — `A3`'s primary acceptance layer |
| the residue of a failed write | **carried as `P-IM-2`** (`§5.3`) |
| the reachability of a minted node and the store's five-component closure | **carried as `P-IM-3`** (`§5.5` — authored at this contract's second bounded amendment; its strategy id is `S-STRUCT`; the id had been declared at `§0.1` item 5 without a row body) |
| the tier order, the shadow and the purge | **carried as `P-SM-4`** (`§5.4` — its tier-order half; **its declared-default pointer is `§5.5.1`**, and the retired id `P-TP-5` names nothing after the first bounded amendment's merge) |
| the monotonic clause | **carried as `P-TP-6`** (`§5.6`) |
| the construction/boot property | **carried as `P-TP-7`** (`§5.7`) |
| the resolver's return and the fail set | **carried as `P-TP-9`** (`§5.9`) **with the resolver's non-copy half in `P-IM-1`'s second assertion — the copy discipline, `§4.1`** |
| the watcher and the journal's totality | **carried as `P-TP-8`** (`§5.8`) |
| any candidate whose subject is the SHADOW/DELETE interaction | **carried as `P-SM-4` + `P-TP-8`** (the `D-1`/`D-3` delete pair; `P-SM-4` is the surviving row the former `P-TP-5` merged into) — see `§5.9`'s interaction mapping |
| **the id-level mapping of `IM-1`…`IM-10`, `SM-1`…`SM-10`, `TP-1`…`TP-7` onto the eight rows above** | **OWED — owner the supervisor; positive revisit condition: the archival loop recovers the step reports' candidate tables, or gate 10 re-derives them from `archive/gate1/storeroom-native-review/{1-validity,2-critique}.md` and the mapping is landed as an amendment row** — **and no candidate id is invented here** |

`[R: §5.2, §7.3, §17.4 condition 5; T: the subject-level dispositions | CONTRACT + one OWED]`

**⟶ RECONCILED 2026-10-11 (`RCA-8(d)` ANNOTATE-BESIDE: **THIS SECTION'S ROWS, ITS HONEST-BOUNDARY PARAGRAPH AND ITS CLOSING TAG STAND BYTE-FOR-BYTE**)** (`P: §11 · A66`; the reconciliation clauses at `§10.1` and `§10.2` above; nothing re-emits a cell because no cell of this section is superseded): **NO CELL OF THIS SECTION READS `P-1` AS `OPEN`, so no `P-1` reconciliation is owed here and none is written: the disposition table above disposes of candidate SUBJECTS, the id-level mapping is `OWED` to the supervisor on its own positive revisit condition, and THAT OWED ROW IS UNMOVED BY `A66` — `P-1`'s `28` rows becoming `U-STOREROOM-JS`'s open material does not land this unit's candidate-id mapping and does not retire its owner** (`[T: the section's own state, checked rather than assumed, so no park reconciliation is read into a table that carries none | CROSS-REF]`).

---

**END OF THE CONTRACT DOCUMENT.** **`§1` states the record shapes; `§2` the walk; `§3` the write arms;
`§4` the read and delete arms; `§5` the tiers, the purge chain and the typed register; `§6` the journal,
the op, the rollback and the watcher; `§7` the persistence and the construction inputs; `§8` the closed
fail set with its generated messages; `§9` the parameter-semantics index; `§10` the parks, the handoff and
the candidate dispositions — and the order is the ADOPTED BUILD ORDER (record shapes → the walk and
resolver → the write/read/delete arms → tiers and purge → the journal and rollback → persistence), with
no step taking its input from a later stage** (`P: §12 · A20`; `R: §17.4` condition 5, `AR-47`).
**No unit row is admitted, no `DONE` row is re-opened, no artifact is frozen and no ledger count moves:
`docs/next-steps.md` stands `0 DONE / 1 open` UNITS = `1`** (`R: §17.4`) (`[T | OBSERVATION]`).
