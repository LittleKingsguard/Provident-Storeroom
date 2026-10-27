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
  `P-SR-1`/`P-SR-2`/`P-SR-3`/`P-SR-4`/`P-SR-5`/`P-SR-6`/`P-SR-7`/`P-SR-8` (`§5.1`–`§5.8`, `8` rows, cap `≤ 8`),
  **⟶ RE-MINTED 2026-10-17 BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`) ON THE ARCHITECT'S RULING THAT THE TWO REGISTERS BE DISJOINT, AND `DD-3`'s PRICED ALTERNATIVE — *"a `P-SR-*` id family … the price is a citation sweep"* — IS THE INSTRUMENT ADOPTED: the eight ids this clause printed as `P-IM-1`…`P-IM-3`, `P-SM-4`…`P-SM-6`, `P-TP-7`, `P-TP-8` were the SAME EIGHT SPELLINGS `U-STOREROOM-CONSTRAINTS` declares at its own `docs/specs/storeroom-constraints/contract.md §5.1`–`§5.8`, so a bare `P-IM-1` resolved to two different rows in two documents; the `P` = `U-STOREROOM-CONSTRAINTS`, `SR` = the JS unit's prefix `D-GP-SRJS` — and THE ROW COUNT DOES NOT MOVE ON EITHER SIDE, `8 ≤ 8` ✓ here and `8 ≤ 8` ✓ there, because a re-mint renames eight ids and mints no ninth.** **THE MAPPING, PRINTED SO NO CITATION IS SWEPT FROM A BYTE DIFF:** `P-IM-1 → P-SR-1` · `P-IM-2 → P-SR-2` · `P-IM-3 → P-SR-3` · `P-SM-4 → P-SR-4` · `P-SM-5 → P-SR-5` · `P-SM-6 → P-SR-6` · `P-TP-7 → P-SR-7` · `P-TP-8 → P-SR-8` — **EIGHT BEADS, EIGHT, and the `§`-numbers `§5.1`–`§5.8` are UNMOVED** (`DD-3` as re-derived at its own cell below; `DEF-2026-10-16-S`; this document's `§5.5`-area clause of the same date),
  the parameter-semantics rows are `PAR-JS-1`…`PAR-JS-26` (**⟶ RE-SPELLED 2026-10-16 BY THE `A122`/`A123` PASS ON `A123`, AND RE-DERIVED THE SAME DATE BY THE `A126` PASS — this cell's as-filed `PAR-JS-1`…`PAR-JS-19` is the `A116` pass's reading and stands at its own bytes, the `PAR-JS-1`…`PAR-JS-21` reading is the `RCA-9`/gate-2-close-out one, and the `PAR-JS-1`…`PAR-JS-23` reading is the `A122`/`A123` one; THE OPERATIVE RANGE FROM 2026-10-16 IS `PAR-JS-1`…`PAR-JS-26`, the three operative additions being `PAR-JS-22` — the constraint FUNCTION the ADD route carries, at `parameter-semantics.md §2.22` — `PAR-JS-23` — the `instance` position of the three surface functions, at `§2.23` — and `PAR-JS-24` — the pair, the element's KEY, at `§2.24` — with the returned constraint identity at `PAR-JS-25`/`§2.25`; the superseded row's cells (`manageConstraints` with its `operation` position) stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §4` and the superseded identity row at `§3`, and the count's ONE home is `parameter-semantics.md §1`'s clause of that date, reading `23 + 3 = 26` ✓ — **⟶ AND THIS CELL'S OWN RANGE, SUM AND PROVENANCE ARE CORRECTED 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: the operative range is `PAR-JS-1`…`PAR-JS-25` and the arithmetic is `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s clause of that date; the `26` this cell prints and its `23 + 3 = 26` sum are the `A126` pass's reading, READ THROUGH this clause; AND THE PROVENANCE THIS CELL'S OWN CITATION CLAIMED WAS FALSE — it named that clause as READING `23 + 3 = 26`, and the clause reads `23 + 2 = 25` ✓** **⟶ AND THE SUPERSEDED FIGURE ABOVE CARRIES NO OPERATIVE LABEL FROM THIS DATE: the `PAR-JS-1`…`PAR-JS-26` range and its `23 + 3 = 26` sum this cell prints are the `A126` pass's reading, they stand BYTE-FOR-BYTE where they stand, AND THEY ARE READ THROUGH, NOT OPERATIVE; the range, the count and their arithmetic are taken from `parameter-semantics.md §1`'s count-correction clause of 2026-10-16, whose searched set this cell does not re-print (`§6`'s clause of this date; `parameter-semantics.md §1`'s clause of that date)**), the design-default rows
  are `DD-1`…`DD-47` (`§0.2` — `47` AUTHORED rows), and the handoff rows are `HO-1`…`HO-7` (`package.md` `§2`).**
  **No id family of the store unit is reached, re-used or moved** (`[A3 docs/specs/storeroom-native/contract.md §0.1 item 5
  — the store's own `DD`/`PAR`/`P-` families are ITS OWN and the cap is PER UNIT | requirement]`).
- **⟶ RECONCILED 2026-10-11 — THE `DD` RANGE THIS INDEX REGION PRINTS MOVES BY THREE ROWS, AND EVERY FIGURE  **⟶ THE ARTEFACT'S DIGEST RE-PINNED 2026-10-11 BY THE SUPERVISOR (`LIVE-F4`'s class; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `cf088d91…`/`957,904` cells below STAND as the `Q7`/`Q8` tree's own reading and THIS clause is the operative tie): the artefact is `sha256:0136c912…` over `958112` bytes, the pre-rename/pre-`Q3` artefact being `cf088d91…`/`957,904`. EVERY figure this file prints describes THIS digest from here on; the blind set (`241`) and the JS leg (`185`) and the live battery (`91`) were all re-measured against it.** **⟶ AND THE THREE FIGURES OF THAT SENTENCE ARE SUPERSEDED AND ARE READ THROUGH AT ITS OWN BYTES, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the blind set is `255` OVER `16` SCENARIOS, the JS leg is `499`, and the live battery is `95`; the sentence's OWN SUBJECT — that every figure of this document describes the re-pinned artefact from that date on — STANDS WHOLE.**  **⟶ THE ARTEFACT'S DIGEST RE-PINNED AGAIN 2026-10-11 (the `FMT` pass; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `0136c912…`/`958,112` cells STAND as the pre-formatting tree's reading and THIS clause is the operative tie): the artefact is `sha256:34ff12d3d840a6eba80b9695ade8e0cbedafe27215be4d8c3604ee6ebf9229b1` over `958104` bytes, the `-8` bytes being LLVM's internalization hash for a renamed local losing one digit across nine `.strtab` occurrences.** **AND THE FIGURES ARE NOT RE-MEASURED BECAUSE THEY DO NOT NEED TO BE: CODEGEN IS UNMOVED — every allocatable section byte-identical (`546,698` of `.text` among them) and all `2,168` symbols identical in name, value, size, type and section index — so every figure measured against the earlier digest stands against this one.**  **⟶ THE ARTEFACT'S DIGEST RE-PINNED AGAIN 2026-10-11 (the release-fix pass; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `34ff12d3…`/`958,104` cells STAND and THIS clause is the operative tie): the artefact is `sha256:a3314ac1420019c79201afd9d2fface5ba35ed0f1261479fac4856ef11aedca5` over `958136` bytes.** **THE CAUSE IS DIAGNOSED AND CODEGEN-NEUTRAL: the package GAINED A BUILD SCRIPT, 
so the crate's own `-C metadata` disambiguator moved and 213 mangled names moved with it — `33` sections each, exactly ONE differs in size (`.strtab` `177,832 → 177,864`), `2,165` symbols in both, and every allocatable code and data section (`.text` `546,698` bytes among them) byte-identical. Parking `build.rs` reproduces the earlier digest exactly; restoring it reproduces this one exactly, measured both directions. NO FIGURE NEEDS RE-MEASURING.**
  ABOVE STANDS BYTE-FOR-BYTE** (`RCA-8(d)` ANNOTATE-BESIDE: **this clause mints no `PAR-JS` row and moves no
  `PAR-JS` figure, and it states which of this index region's own RANGES is operative rather than re-printing
  the as-filed reading above it**): **THE OPERATIVE `DD` RANGE IS `DD-1`…`DD-50`** — **`DD-48` · `DD-49` ·
  `DD-50` are the rows this directory's NINTH bounded amendment authors, carrying the three structures the
  compliance sweep lists as embodied by the code and decided by no ruling** (`U-10` · `U-11` · `U-12`;
  `archive/reviews/2026-10-11-structural-compliance.md` `§4`) — **and the table's own census at `§0.2` prints
  `29 + 18 + 3 = 50` with its terms.** **THE OPERATIVE `PAR-JS` RANGE IS `PAR-JS-1`…`PAR-JS-19`** (`PAR-JS-19`
   — **⟶ AND READ AT ITS FIRST FIGURE FROM 2026-10-16, AND ITS `the OPERATIVE range is` LABEL WITHDRAWN THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-21` range is the gate-2 close-out pass's reading, the `19` above being the `A116` pass's reading, and the two added rows `PAR-JS-20`/`PAR-JS-21` stand at this clause's own continuation below and at `parameter-semantics.md §1`; THE OPERATIVE RANGE, COUNT AND ARITHMETIC ARE `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is that part's `§1` count-correction clause of 2026-10-16** —
  minted 2026-10-15 by the `A116` ordering-seam pass, and the figure this line printed — `…PAR-JS-18` — read
  THROUGH the `A116` dated clause below), **AND FROM 2026-10-15 ITS OPERATIVE FIGURE IS `PAR-JS-1`…`PAR-JS-21` — A LABEL **WITHDRAWN** 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `PAR-JS-1`…`PAR-JS-21` range and its `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ arithmetic being the `RCA-9`/gate-2-close-out reading, and the operative range, count and arithmetic being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, at `parameter-semantics.md §1`'s count-correction clause of that date — THE TWENTIETH ROW BEING `PAR-JS-20`, THE WRITE'S FOURTH OPTIONAL ARGUMENT `commit`, AND THE TWENTY-FIRST `PAR-JS-21`, THE CONSTRUCTION'S FOURTH `cfg` KEY `constraints`, BOTH MINTED BY THE `RCA-9` FILE-TIER-SAVE PASS AT `parameter-semantics.md §1`, `§2.20` AND `§2.21` — THE ONE HOME OF THAT COUNT** (`docs/specs/storeroom-native-proposal-review.md §22.4`),
  **⟶ AND READ AT ITS FIRST FIGURE AGAIN FROM 2026-10-16, BY THE `A126` PASS (`role_spec_writer`; `docs/decisions.md` · `A126`): THE OPERATIVE RANGE IS `PAR-JS-1`…`PAR-JS-26` — `23 + 3 = 26` ✓ — the operative additions being `PAR-JS-22`, the constraint FUNCTION the ADD route carries, `PAR-JS-23`, the `instance` position of the three surface functions, and `PAR-JS-24`, the pair, the element's KEY, with the returned constraint identity at `PAR-JS-25`; THE SUPERSEDED `manageConstraints` ROW'S CELLS STAND AT `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §4` AND THE SUPERSEDED IDENTITY ROW AT `§3`, the count's ONE home being `parameter-semantics.md §1`'s clause of that date** **⟶ AND THIS CLAUSE'S OWN RANGE AND SUM ARE READ THROUGH, 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: the operative range is `PAR-JS-1`…`PAR-JS-25` and the arithmetic is `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s clause of that date; the `PAR-JS-1`…`PAR-JS-26` range this clause prints and its `23 + 3 = 26` sum are the `A126` pass's reading of this date and are SUPERSEDED, being neither a pointer nor itself read-through-named at any other site; ⟶ AND FROM THIS DATE THAT SUPERSEDED FIGURE CARRIES NO OPERATIVE LABEL EITHER — the `A126` pass's range and sum are READ THROUGH and the operative range, count and arithmetic are taken from `parameter-semantics.md §1`'s count-correction clause of 2026-10-16, named with its searched set at `§6`'s clause of this date** (the figure this line prints for 2026-10-15 and the `PAR-JS-1`…`PAR-JS-23` figure of the `A122`/`A123` pass both read THROUGH this clause),
  the typed register stands at its `8` rows with the cap holding (`8 ≤ 8` ✓), and the `HO-` family stands at
  `HO-1`…`HO-7`** — **so ONE figure moves in this index region and NOT ONE ID IS RENUMBERED, DROPPED OR
  RE-MEANED** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set and the `alt`
  obligation; A3 docs/specs/storeroom-js/contract.md §0.2 — the table's own dated census clause | numeric or
  census claim]`).
- **⟶ AND THIS INDEX REGION'S PARAMETER-SET FIGURE IS READ AT ITS OWN BYTES 2026-10-16 BY THE GATE-2 SIXTH REVIEWER-LOOP PASS, SO ITS `THE OPERATIVE RANGE IS` LABEL CARRIES NOTHING: THE `PAR-JS-1`…`PAR-JS-26` RANGE AND ITS `23 + 3 = 26` SUM PRINTED ABOVE ARE THE `A126` PASS'S READING OF THIS DATE AND THAT READING'S OPERATIVE LABEL IS **WITHDRAWN** — the range, the count and the arithmetic are taken from `parameter-semantics.md §1`'s count-correction clause of this date, whose ONE home the count is, and their SEARCHED SET is printed at this document's `§6` correction clause of this date, where the `PAR-JS-1`…`PAR-JS-25` range and the absence of a `PAR-JS-26` row were the searched set of that date and are read through this clause**, whose searched set the immediately following sentence re-derives; THE BULLET ABOVE STANDS BYTE-FOR-BYTE AND NO FIGURE OF IT IS RE-EMITTED HERE. **⟶ AND THAT READING ALSO GOVERNS THIS REGION'S `A116`-SEAM CLAUSE'S TWO `THE OPERATIVE COUNT IS `21`` LIMBS, SO THE WITHDRAWAL IS EXTENDED TO THEM BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS OF 2026-10-16: those two labels carry nothing from this date either — the figures they introduce stand as their passes' readings, marked at their own cells, and the operative count is the `25` named above.** AND THE SAME READING GOVERNS THIS REGION'S `PAR-JS` TABLE ROW AND ITS `PAR-JS 19`-PROVENANCE PRINT: their `18`/`19`/`21`/`26` figures are their own dates' READINGS and carry no operative label from this date.** **NO OTHER FIGURE OF THIS REGION MOVES: the typed register stands at its `8` rows with the cap holding (`8 ≤ 8` ✓), the `HO-` family stands at `HO-1`…`HO-7`, the `DD` family stands at its `54` rows and the part map stands at its seven entries** (`[A3 docs/specs/storeroom-js/parameter-semantics.md §1`'s count-correction clause of 2026-10-16 and this document's `§6` correction clause of this date — the `PAR-JS` set's operative range, count and arithmetic and their searched set; A2 `docs/decisions.md` · `A127` · `A126` · `A123`, all 2026-10-16 | numeric or census claim]`).
**⟶ AND THIS REGION'S PARAMETER-SET FIGURE IS RE-DERIVED AT ITS OWN BYTES, 2026-10-16, BY THE PASS THAT DECLARED THE MESSAGE LOG'S ROUTE TO THE CLIENT (`role_spec_writer`; the architect's ruling, verbatim: *"Bubble the message log to the client on failure, override any clauses that forbid this."*, read with `docs/decisions.md` · `A121`).** **THE OPERATIVE FIGURES ARE THE RANGE `PAR-JS-1`…`PAR-JS-26` AND THE ARITHMETIC `23 + 3 = 26` ✓ — the `23` being the `A122`/`A123` range `PAR-JS-1`…`PAR-JS-23` and the `+3` the three rows added over it: `PAR-JS-24` (the `pair`), `PAR-JS-25` (the returned constraint identity) and `PAR-JS-26` (`log`, the third member of the thrown failure form) — WHOSE ONE HOME IS `docs/specs/storeroom-js/parameter-semantics.md §1`'s index region's clause of this date.** **AND THE SEARCHED SET THIS RE-DERIVATION STANDS ON IS PRINTED, SO THE COUNT IS CHECKABLE AND NOT ASSERTED: THE ROW LIST `PAR-JS-1`…`PAR-JS-26` — TWENTY-SIX INDEX ROWS, ONE PER ID, WITH NO GAP AND NO DUPLICATE — AGAINST THE PRESENCE OF THE `§2.26` HEADING IN THAT PART AND OF THE `PAR-JS-26` ROW IN BOTH THIS DOCUMENT'S INDEX AND THAT PART'S.** **THE PRIOR READINGS ARE NAMED AND CARRY NO OPERATIVE LABEL FROM THIS DATE: the `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓ reading is the gate-2 fifth reviewer-loop pass's of this date and stands BYTE-FOR-BYTE where it stands, and the `PAR-JS-1`…`PAR-JS-26`, `23 + 3 = 26` reading of the `A126` pass is SUPERSEDED AS FILED — it printed the right total by three terms where two existed, and this clause reaches that total by a third ROW rather than by a third term of the same two rows** (`docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of this date and `§2.26`; `docs/specs/storeroom-js/surface.md §2.5`'s clause of this date | numeric or census claim]`).

**⟶ AND THIS REGION'S PARAMETER-SET FIGURE IS RE-DERIVED ONCE MORE AT ITS OWN BYTES, 2026-10-17, BY THE PASS THAT LANDED THE ARCHITECT'S REGISTERED-CONSTRAINT READ (`role_spec_writer`; the architect's ruling, verbatim: *"Add surface methods for reading registered constraints."*).** **THE OPERATIVE FIGURES ARE THE RANGE `PAR-JS-1`…`PAR-JS-27` — `27` ROWS — AND THE ARITHMETIC `23 + 4 = 27` ✓, the `23` being the `A122`/`A123` range `PAR-JS-1`…`PAR-JS-23` and the `+4` the four rows added over it: `PAR-JS-24` (the `pair`), `PAR-JS-25` (the returned constraint identity), `PAR-JS-26` (`log`, the third member of the thrown failure form) and `PAR-JS-27` (the pair list `a.constraints()` returns, authored 2026-10-17 at `§2.27`) — WHOSE ONE HOME IS `docs/specs/storeroom-js/parameter-semantics.md §1`'s count-correction clause of this date.** **AND THE SEARCHED SET THIS RE-DERIVATION STANDS ON IS PRINTED, SO THE COUNT IS CHECKABLE AND NOT ASSERTED: THE ROW LIST `PAR-JS-1`…`PAR-JS-27` — TWENTY-SEVEN INDEX ROWS, ONE PER ID, WITH NO GAP AND NO DUPLICATE — AGAINST THE PRESENCE OF THE TWENTY-SEVEN `§`-HOMES `§2.1`–`§2.27` IN THAT PART AND OF THE `PAR-JS-27` ROW IN BOTH THIS DOCUMENT'S INDEX AND THAT PART'S.** **THE PRIOR READINGS ARE NAMED AND CARRY NO OPERATIVE LABEL FROM THIS DATE: the `PAR-JS-1`…`PAR-JS-26`, `23 + 3 = 26` ✓ reading is the message-route pass's of 2026-10-16 and stands BYTE-FOR-BYTE where it stands, and the `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓ reading before it is the gate-2 fifth reviewer-loop pass's — BOTH READ THROUGH this clause and neither operative.** **AND THIS REGION'S OTHER MEMBER-SET FIGURES ARE RE-DERIVED BY THE SAME PASS AND READ THROUGH IT: the PRODUCT'S DECLARED MEMBER SET is THIRTEEN own members, `10 + 1 + 1 + 1 = 13` ✓ — the TEN METHODS plus `register`, `settle` and `constraints` — declared at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `constraints` clause of that date; the MODULE NAMESPACE stands at ONE name, `storeCreate` ALONE, `11 → 1` ✓, UNMOVED; and the store's closed `16`, the kernel's FIVE-item extent, the register's `8` rows, the `DD` family's `54` rows and the part map's entries are ALL UNMOVED** (`docs/specs/storeroom-js/parameter-semantics.md §1`'s count-correction clause of this date and `§2.27`; `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `constraints` clause of this date; `docs/specs/storeroom-constraints/kernel-surface.md §1` item 2's mark of this date | numeric or census claim]`).

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
  (`[A3 docs/specs/spec-authoring-discipline/contract.md §6.6 — A PATH THAT RESOLVES NOWHERE IN THIS TREE, ITS META-REPO PROVENANCE RECORDED WITH ITS STATUS AT `§0.1` item 11's amendment clause, WHERE THE 2026-10-16 PROVENANCE LINE STANDS AND IS THE SINGLE DECLARED PROVENANCE POINT FOR THIS PATH AND FOR `docs/specs/spec-scope-and-structure/contract.md` | ordering claim]`).
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
  | `package` | **`carrier`** | `docs/specs/storeroom-js/package.md` | the claimed realm, the `HO-` handoff rows, the prebuild/publish story, the sibling-crate layout, **the conversion core's declared Rust interface (`§4.5`, added by the bounded correction pass of 2026-10-11 — the module boundary, the JS-value model, the conversion functions, the record types, the `Instance` methods and the edge to the JS-facing types; the declaration `§3.4` item 3's and `acceptance.md §4.1` item 2's drivability claim is checked against)** and the ownership clause — **a relocation of this document's `§3` text whole** |
  | `acceptance` | **`carrier`** | `docs/specs/storeroom-js/acceptance.md` | the JS test layer's runner, pattern and LAYER label, the round-trip property, and the handoff ledger — **a relocation of this document's `§4` text whole** |
  | `parameter-semantics` | **`carrier`** (its own authored rows are this part's admissible content; the `§6` index relocates here) | `docs/specs/storeroom-js/parameter-semantics.md` | **⟶ RE-SPELLED ONCE MORE 2026-10-16 BY THE `A122`/`A123` PASS: this cell's as-filed `PAR-JS-1`…`PAR-JS-21` is the `RCA-9`/gate-2-close-out reading; from this date the operative range is `PAR-JS-1`…`PAR-JS-23`, the two added rows being `PAR-JS-22` — the POST-CREATION constraint route's own parameter, `manageConstraints`, at `parameter-semantics.md §2.22`, minted on `A123` — and `PAR-JS-23` — the constraint identity, at `§2.23` — whose count's ONE home is `parameter-semantics.md §1`'s clause of this date, reading `21 + 1 + 1 = 23` ✓** **⟶ AND EVERY `THE OPERATIVE RANGE IS` LABEL THIS CELL PRINTS FOR THE PARAMETER SET IS WITHDRAWN 2026-10-16 BY THE GATE-2 SIXTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-23`, `PAR-JS-1`…`PAR-JS-25` and `PAR-JS-1`…`PAR-JS-26` readings and their sums are their own passes' READINGS, each standing BYTE-FOR-BYTE where it stands, and the range, the count and the arithmetic are taken from `parameter-semantics.md §1`'s count-correction clause of this date — `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, WITH THE SEARCHED SET `PAR-JS-1`…`PAR-JS-25` set beside the absence of any `PAR-JS-26` row — whose ONE home the count is, printed for this document at `§6`'s correction clause of this date** — **relocated:** the `§6` index; **and authored:** one row per declared JS parameter — **`PAR-JS-1`…`PAR-JS-26`** (**⟶ AND READ AGAIN FROM 2026-10-16 BY THE COUNT-CORRECTION PASS: THE OPERATIVE RANGE IS `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, and the `26` above and its `23 + 3 = 26` sum are the `A126` pass's reading, read THROUGH this clause — whose ONE home the count is, at `parameter-semantics.md §1`'s clause of this date — **READ THROUGH, 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: the operative range is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, and the `PAR-JS-1`…`PAR-JS-26` this cell's own `and authored` half prints with its `23 + 3 = 26` sum is the `A126` pass's reading and is SUPERSEDED BY THAT CLAUSE, not by this cell's silence; ⟶ AND FROM THIS DATE THE SUPERSEDED FIGURE OF THIS CELL CARRIES NO OPERATIVE LABEL — the operative range is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s clause of that date and whose searched set is printed at `§6`'s clause of this date** — exactly as this document's own figure-site list item 3 states it**) (**⟶ AND RE-DERIVED THE SAME DATE BY THE `A126` PASS: the operative range is `PAR-JS-1`…`PAR-JS-26`, `23 + 3 = 26` ✓, the operative additions being `PAR-JS-22` — the constraint FUNCTION the ADD route carries, `parameter-semantics.md §2.22` — `PAR-JS-23` — the `instance` position of the three surface functions, `§2.23` — and `PAR-JS-24` — the pair, the element's KEY, `§2.24` — with the returned constraint identity at `PAR-JS-25`/`§2.25`; THE SUPERSEDED `manageConstraints` ROW'S CELLS STAND AT `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §4` AND THE SUPERSEDED IDENTITY ROW AT `§3`, and this cell's earlier ranges — the `A116` pass's `PAR-JS-1`…`PAR-JS-19`, the `RCA-9`/close-out `PAR-JS-1`…`PAR-JS-21` and the `A122`/`A123` `PAR-JS-1`…`PAR-JS-23` — each read THROUGH this clause, whose count's ONE home is `parameter-semantics.md §1`'s clause of this date**)** — carrying the parameter's kind, its unit, its domain, **the values outside it**, the declared answer for **each** outside value, its supplier, its evaluator and its observable |
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE CLOSURE CLAUSE'S PARENTHESIS,
SPELLED SO THE RAW-FILE READING CANNOT BE MISTAKEN FOR THE OPERATIVE ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **the
closure bullet above stands byte-for-byte, including its six-name parenthesis, and it is read THROUGH this
clause; nothing above is reworded, no file is created and no arithmetic moves.** **THE PARENTHESIS IT PRINTS
LISTS SIX NAMES BECAUSE IT ENUMERATES THE MAP'S CARRIER PARTS AND `implementation-plan` — and the SEVENTH
part entry, the `view` part `test-cases.md`, is named in the SAME bullet's own closing sentence, which is
exactly why the parenthesis was written and why a reader must read it with that sentence.**

**AND THE TWO FIGURES, PRINTED UNDER BOTH READINGS SO NEITHER IS ASSUMED:**
- **THE LEFT SIDE IS `{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` =
  `7 − 1 = 6`** — **an ENTRY-COUNTED figure, read off the map's own rows.**
- **THE RIGHT SIDE, UNDER THE OPERATIVE READING — THE MAP'S OWN PART ENTRIES — IS `6`: the `5` `carrier`
  parts (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) plus
  `implementation-plan`, with the `view` part `test-cases` counted in the map's entries and NOT in this
  parenthesis — so the predicate reads `6 = 6` ✓ AND IT HOLDS.**
- **THE RIGHT SIDE, UNDER THE RAW-FILE READING THE CLAUSE'S OWN WORDS NAME — *"{files present in
  docs/specs/storeroom-js/} − {contract.md}"* — IS `7`, because `test-cases.md` is present as well — so THE
  SAME PREDICATE READS `6 = 7` ON THAT COUNTING AND WOULD NOT HOLD.**

**THE OPERATIVE READING IS THE PART-ENTRY COUNTING, `6 = 6`, AND THE RAW-FILE COUNTING'S `7` IS NOT A CLAIM
OF THIS UNIT:** **the state is `CLOSED` on the part-entry terms, the state is NOT claimed on the raw file
count, and the right-hand terms' re-statement is the named repair of a later bounded amendment** — **to be
taken TOGETHER WITH `§4.1` item 6's named repair, so the two re-statements land in one pass and one dated
disclosure covers both** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate's
single arithmetic — and §C.11.7's entry-counted unit, read with this bullet's own closing sentence |
numeric or census claim]`).

**⟶ AND THE RIGHT-HAND TERMS ARE RE-STATED HERE, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
(`role_spec_writer`), SO THE RAW-FILE READING AND THE OPERATIVE READING NOW AGREE.** `RCA-8(d)`
ANNOTATE-BESIDE: **the closure bullet above and the amended clause above it stand byte-for-byte, including
the six-name parenthesis and the as-filed words of the predicate's right side, and both are read THROUGH this
clause; THIS clause is a PURE INSERTION — it creates no file, renumbers no `§`, moves no row of the map and
re-decides no rule.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: the bullet's right-hand terms were written
*"{files present in docs/specs/storeroom-js/} − {contract.md}"* while its own parenthesis enumerated SIX
names — the `5` `carrier` parts plus `implementation-plan` — so a reader taking the TERMS AS WRITTEN counted
`7` files beside `contract.md` (`test-cases.md` is present as well) and met the predicate as `6 = 7`, which
does not hold; and the clause that followed it NAMED that mis-reading as a later bounded amendment's repair
and did not take it.** **THE REPAIR IS TAKEN NOW, IN THE TERMS THE PREDICATE'S OWN LEFT SIDE USES — the
predicate is ENTRY-COUNTED, so its right side is stated as the MAP'S OWN PART ENTRIES and not as the raw file
set:**

| The side | Its terms | Its figure |
| --- | --- | --- |
| **the LEFT side** | `{part-map PART entries}` = `{rows of the part map}` − `{the contract-document row}` = `7 − 1` — **an ENTRY-COUNTED figure, read off the map's own rows** | **`6`** |
| **the RIGHT side, RE-STATED** | **`{the part-map's OWN PART ENTRIES}` = the `5` `carrier` parts (`crossing` · `surface` · `package` · `acceptance` · `parameter-semantics`) + `implementation-plan` (a `carrier` part) + the `view` part `test-cases` — i.e. EVERY entry of the part map but the contract-document row** | **`6`** |
| **the file set itself, printed because a reader may check it** | `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `implementation-plan.md` · `test-cases.md` — **`7` files beside `contract.md`, each one an entry of the map** | **`7` FILES, `7` ENTRIES** |

**SO THE PREDICATE READS `6 = 6` ✓ AND IT HOLDS, AND THE RAW-FILE READING NO LONGER MIS-STATES IT: the `7`
files ARE the `7` map entries, so a reader who counts files and a reader who counts part entries now arrive
at the same predicate.** **THE AS-FILED READING IS NOT WITHDRAWN: it is named above as the mis-reading the
re-stated terms repair, and the `6 = 7` figure is hereby RETIRED AS A READING OF THIS PREDICATE rather than
carried as a divergence.** **NOTHING ELSE IN THIS ARITHMETIC MOVES: the `3` recorded omissions contribute to
NEITHER side, no part is added, omitted or renamed, no file is created and no `§`-number moves** — **and the
SEPARATE named repair the clause above pairs with this one, `§4.1` item 6's renumbering in the contract
document, is NOT this clause's subject and stands as that clause prints it** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate's single arithmetic, and
§C.11.7's entry-counted unit; A3 docs/specs/storeroom-js/contract.md §0.1 item 10 — this unit's own omission
rule and closure table | numeric or census claim]`).

**AND ONE SENTENCE OF THE CLAUSE ABOVE THIS ONE IS NAMED AS SUPERSEDED BY THE REPAIR, SO NO READER TAKES TWO
STATES FOR ONE.** **IT READS, VERBATIM:** *"the state is `CLOSED` on the part-entry terms, the state is NOT
claimed on the raw file count, and the right-hand terms' re-statement is the named repair of a later bounded
amendment"*. **THE OPERATIVE READING, FROM THIS PASS: the state is `CLOSED` on the part-entry terms AND the
raw-file reading is re-stated in the terms of the table above, so the predicate holds on BOTH countings and no
re-statement remains owed** — **the sentence's own filing-time state is preserved above, and the `§4.1` item 6
half of the pairing it names is UNMOVED and remains the later bounded pass's work** (`RCA-8(d)`
ANNOTATE-BESIDE: this clause adds no figure, moves no side and re-decides no rule) (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate's single arithmetic | numeric or
census claim]`).

**⟶ AND THE `Q1` CONTRACT AMENDMENT'S OWN INDEX STATEMENT, LANDED 2026-10-11 BY `role_spec_writer` ON THE
ARCHITECT'S RULINGS `A79`–`A81` — THE FIGURES ABOVE STAND, AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE ONE
MEMBER SET AND THE THREE COUNTS THE AMENDMENT MOVES OR HOLD.** `RCA-8(d)` ANNOTATE-BESIDE: **every bullet and every
figure above stands byte-for-byte — the status block, the unit/prefix line, the scope boundary, the part map, the
omissions table and both closure-arithmetic clauses included — and each is read THROUGH this clause; THIS clause
is a PURE INSERTION, it creates no file, renumbers no `§`, moves no row of the part map and re-decides no rule.**
**THE RULINGS, VERBATIM:** ***"Use S-1, `off` can deregister, and always validate"***
(`docs/specs/storeroom-js-proposal.md` `§8` · **`A79`** · **`A80`** · **`A81`**).

| The figure | What it was before this pass | What it reads now |
| --- | --- | --- |
| **the instance's own member set** (`§2.1`'s surface enumeration, `§2.4` item 5 (a)) | `{ register }` — one own member | **`{ register, on, off }` — THREE own members**; the as-filed `{ register }` cells stand byte-for-byte at their own `§` in this document and in `docs/specs/storeroom-js/surface.md`, and `surface.md §2.1`'s dated clause and `§2.4` item 7 are the operative statements. **The re-spelling of the two as-filed cells is the NAMED REPAIR of a later bounded amendment** — **AND THIS CELL'S *"What it reads now"* FIGURE IS ITSELF READ THROUGH THE CLAUSE BELOW, WHICH RE-DERIVES IT TO `{ register, on, off, settle }` — FOUR own members — on `A116` (D1), so the three-member figure here is the `Q1` amendment's own reading** |
| **the module namespace** | the `8` verbs | **⟶ THE FIGURE THIS CELL PRINTED ON 2026-10-11 IS SUPERSEDED AND ITS BYTES ARE MOVED OUT BYTE-EXACTLY (`role_spec_writer`, 2026-10-16; `RCA-8(g)`), so this cell is a ONE-LINE POINTER FROM THIS DATE: the operative figures are `surface.md §2.9` item 1's dated clause of 2026-10-16 — NINE named exports at the module namespace — and `surface.md §2.4` item 9 (f)'s dated clause of the same date — FIVE own members on the instance — and the superseded cell is at `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §2`** **⟶ AND THE TWO FIGURES THIS POINTER PRINTS — *"NINE named exports at the module namespace"* AND *"FIVE own members on the instance"* — CARRY NO OPERATIVE LABEL FROM 2026-10-16, AND THIS SENTENCE IS THEIR MARK (`RCA-8(g)`: the pointer above stands BYTE-FOR-BYTE and is read THROUGH this clause): the operative figures are ONE named export — `storeCreate` ALONE, `11 → 1` ✓ — and TWELVE own members, `10 + 1 + 1 = 12` ✓, each declared at `surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of that date; the `9` and the `5` are the `A122`/`A123` pass's readings of 2026-10-16 and the moved-out cell's own; the sibling `§2.4` item 5 (a) cell that prints a member-set figure AT ITS OWN CELL carries the same mark, and NO FIGURE, NO ROW AND NO `§`-NUMBER OF THIS TABLE MOVES** **⟶ AND THIS CELL'S MARK AND ITS INVENTORY ROW STAND TOGETHER FROM 2026-10-16 (`RCA-8(g)`: a cell may not be listed as read-through and stand unmarked at its own bytes): the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory — whose count is `25` cells, re-derived by enumeration — AND ITS MARK IS THE SENTENCE ABOVE; the `9` and the `5` this row prints carry NO OPERATIVE LABEL FROM THIS DATE, the operative figures being the ONE name and the TWELVE members named there** **⟶ AND THIS ROW IS MARKED ONCE MORE, 2026-10-16, BY THE PASS THAT DECLARED THE MESSAGE LOG'S ROUTE TO THE CLIENT, AND THE MARK DECIDES THAT THIS ROW'S TWO FIGURES DO **NOT** MOVE: THE ARCHITECT'S RULING *"Bubble the message log to the client on failure, override any clauses that forbid this."* ADDS NO MODULE-NAMESPACE NAME, NO PRODUCT MEMBER AND NO KERNEL ITEM — the route is the THROWN FAILURE carrying one more member — SO THE OPERATIVE FIGURES STAND AT ONE NAME, `storeCreate` ALONE, `11 → 1` ✓, AND TWELVE OWN MEMBERS, `10 + 1 + 1 = 12` ✓, and this row is neither re-spelled nor re-derived by that pass** (`docs/specs/storeroom-js/surface.md §2.5`'s clause of this date, item 6; `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s mark of the same date — **the product's declared member set is UNMOVED, and the ONE figure that moves is the crossed FAILURE FORM's arity, `2 → 3`, which is no row of this table**) |
| **the store, its crate and its `379`** | — | **UNMOVED** — no store byte, no store contract cell and no store measurement moves (`A68`; the filing's `§6`) |
| **the register** | `8` rows, cap `≤ 8` | **`8` rows, cap holding at `8 ≤ 8` ✓, and ONE row RE-DERIVED — `P-SR-5`, whose re-derivation stands at `§5.5`'s dated clause. NO NINTH ROW IS MINTED** |
| **the `PAR-JS` set** | `18` rows | **`18` rows, arithmetic `15 + 1 + 1 + 1 = 18` ✓, and TWO rows RE-DERIVED — `PAR-JS-8` (the `off` handle slot) and `PAR-JS-12` (the `on` listener slot), each at its own dated clause. NO NINETEENTH ROW IS MINTED FOR THE `Q1` AMENDMENT'S OWN REASON** — READ THROUGH THE CLAUSE BELOW, WHICH RE-DERIVES THIS FIGURE TO `19`, AND THROUGH `parameter-semantics.md §1`'s ARITHMETIC, WHOSE OPERATIVE COUNT IS `21` FROM 2026-10-15 **⟶ AND THE OPERATIVE FIGURE FROM 2026-10-16 IS READ, NOT PRINTED HERE: the operative range is `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓, its searched set being the `§1` index table's `PAR-JS-1`…`PAR-JS-25` rows with no `PAR-JS-26` entry — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s clause of this date; the `18`/`19`/`21` readings of this cell and their sums are their own dates' AND CARRY NO OPERATIVE LABEL FROM THIS DATE** |

**⟶ ADDED 2026-10-15 — THE `A116` ORDERING-SEAM PASS (`role_spec_writer`): THE INDEX'S OWN COUNT MOVES BY
ONE ROW AND THE MEMBER SET'S COUNT MOVES BY ONE MEMBER, WHILE NO REGISTER ROW IS MINTED AND NO CELL OF ANOTHER
UNIT'S REGISTER IS SPENT.** **LANDED ON THE ARCHITECT'S RULING — VERBATIM:** ***"Name the seam and lift `A115`
(D1)'s refusal for it."*** (`docs/decisions.md` · **`A116`**). **THE THREE FIGURES, EACH RE-DERIVED RATHER THAN
ASSERTED:**
1. **THE INSTANCE'S MEMBER SET IS `{ register, on, off, settle }` — FOUR own members — so `§2.1`'s dated clause
   and `§2.4` item 5 (a) re-read the three-member figure the `Q1` amendment fixed, and the seam's own clause is
   `surface.md §2.4` item 9** (`[A2 docs/decisions.md · `A116` (D1); A3 docs/specs/storeroom-js/surface.md §2.4
   item 9 | numeric or census claim]`). **⟶ AND RE-DERIVED AGAIN 2026-10-16 BY THE `A126` PASS (`role_spec_writer`; `A126`): THE OPERATIVE MEMBER SET IS `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }` — SEVEN OWN MEMBERS, `4 + 3 = 7` — whose operative statement is `surface.md §2.4` item 9 (f)'s dated clause of this date; the `{ register, on, off, settle, manageConstraints }` FIVE-member reading of the `A122`/`A123` pass stands at its own bytes and is read THROUGH this clause, whose `manageConstraints` half is displaced at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1`–`§2`.** **⟶ AND THE `SEVEN`, ITS `4 + 3 = 7` SUM AND THE `FIVE` BESIDE IT ARE READ THROUGH, 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: THE OPERATIVE MEMBER SET IS `TWELVE` OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — the TEN METHODS plus `register` and `settle` — whose ONE statement is `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of this date and this document's own `§2` clause of the same date; the `7` and `5` are the `A126` and `A122`/`A123` readings and are WITHDRAWN AS OPERATIVE** (`§2.4` item 9 (f)'s clause of this date | numeric or census claim]`). **⟶ AND THIS CELL IS MARKED ONCE MORE, 2026-10-16, BY THE PASS THAT DECLARED THE MESSAGE LOG'S ROUTE TO THE CLIENT, AND THE MARK DECIDES THAT THIS CELL'S OWN FIGURE DOES **NOT** MOVE: the architect's ruling *"Bubble the message log to the client on failure, override any clauses that forbid this."* REACHES THE THROW AND NOT THE SET — the route mints no member, so THE OPERATIVE MEMBER SET STANDS AT `TWELVE` OWN MEMBERS, `10 + 1 + 1 = 12` ✓, and the clause this cell is read through is `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s mark of this date, which re-derives no member** (`docs/specs/storeroom-js/surface.md §2.5`'s clause of this date items 6–7 | numeric or census claim]`).
2. **THE `PAR-JS` SET IS `19` ROWS: `15 + 1 + 1 + 1 + 1 = 19` ✓, the addition being `PAR-JS-19`, kind `seam` (**⟶ READ AT ITS FIRST FIGURE FROM 2026-10-16, AND ITS `THE OPERATIVE COUNT IS` LABEL WITHDRAWN THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `21` ROWS are the gate-2 close-out pass's reading and the `19` here the `A116` pass's, each at its date, and the amendment stands at THIS clause's own continuation below; THE OPERATIVE COUNT IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓ — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s correction clause of this document**) —
   ⟶ AND AMENDED 2026-10-15 BY THE `RCA-9` PASS, AND RE-DERIVED ONCE MORE THE SAME DATE BY THE GATE-2 CONSISTENCY CLOSE-OUT PASS, WHICH CORRECTS THIS CLAUSE'S OWN GATE-1 CONDITION SET: THE OPERATIVE COUNT IS `21` NO LONGER — THAT LABEL IS **WITHDRAWN** 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `21` with its `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ and `20 + 1 = 21` algebra being the gate-2 close-out pass's 2026-10-15 reading — the fifth `1` being `PAR-JS-20`, the write's optional FOURTH argument `commit` at `parameter-semantics.md §2.20`, and the sixth `1` being `PAR-JS-21`, the construction's fourth `cfg` key `constraints` at `§2.21`; the nineteen rows and every cell above stand UNMOVED, and THE OPERATIVE COUNT IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓ — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s correction clause of this document**
   whose row carries the argument's domain, every outside value's `TypeError`, the supplier, the evaluator, the
   observable, its `alt` and its no-park reason** (`[A3 docs/specs/storeroom-js/parameter-semantics.md §1` and
   `§2.19 | numeric or census claim]`).
3. **THE TYPED REGISTER IS UNMOVED AND NO ROW IS MINTED: it stands at `8` rows with the cap holding at
   `8 ≤ 8`, because the property the seam's law makes reachable lives in `U-STOREROOM-CONSTRAINTS`' own
   register, and a row here would be a SECOND ADDRESSABLE HOME for another unit's property** — **and that other
   register's own budget is likewise unmoved by this seam: `21 × 19 = 399 ≤ 400` re-derived at its own figures,
   with NO face added and NO cell spent** (`[A3 docs/specs/storeroom-js/contract.md §5.0`; A3
   docs/specs/storeroom-constraints/contract.md §5.5` | numeric or census claim]`). **AND THE `19` IN THAT
   PRINT IS THE CONSTRAINTS TEST'S OWN `ROW_BUDGET` AND NOT THE `PAR-JS` SET'S ROW COUNT, DECLARED HERE
   BECAUSE THIS CLAUSE PRINTS THE `21 × 19` BESIDE ITS OWN NEW `19`-ROW `PAR-JS` FIGURE AND THE TWO MUST NOT BE
   READ AS EACH OTHER: the first operand is that test's `ROWS_OF_CHECKS` (`21` `row()` cells) and the second is
   `min(100, floor(400 / 21))` = `19` against `MAX_ATTEMPTS_TOTAL = 400`, so the arithmetic closes as printed
   and `PAR-JS 19` (**⟶ THE `19`/`21`/`26` READINGS OF THIS PRINT ARE THEIR OWN DATES' AND CARRY NO OPERATIVE LABEL FROM 2026-10-16: the `A126` pass's `PAR-JS 26` and its `23 + 3 = 26` sum are READ THROUGH `§6`'s clause of that date, and the operative figure is taken from `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at that same `§6` clause — the `PAR-JS-1`…`PAR-JS-25` range and `23 + 2 = 25` ✓, the three operative additions being `PAR-JS-22` (the constraint FUNCTION the ADD route carries, `§2.22`), `PAR-JS-23` (the `instance` position, re-derived IN PLACE to a `VACATED` row, `§2.23`) and `PAR-JS-24` (the pair, the element's KEY, `§2.24`), with the returned identity at `PAR-JS-25`/`§2.25`**) is a SEPARATE, UNCAPPED PROVENANCE COUNT — the terms stand at this document's closing
   remand clause, item 3, and at `parameter-semantics.md §2.19`'s own close** (the same two citations above;
   item 3 of this document's closing remand clause | numeric or census claim]).
**AND NOTHING ELSE MOVES: the module namespace stays at the `8` declared verbs, the store's own closed `8`-verb
namespace is unmoved, the kernel's five-item extent is unmoved, the published `files` allowlist is unmoved, and
no `DD` row, no store byte and no other unit's cell is authored, renumbered or dropped by this pass.** **⟶ AND THE FIGURE THIS BULLET PRINTS IS SUPERSEDED AND IS READ THROUGH, 2026-10-16 (`RCA-8(g)`: the as-filed sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): *"the module namespace stays at the `8` declared verbs"* IS THE `Q1` PASS'S READING AT THIS CELL'S OWN DATE — the bullet's OTHER figures, the store's closed `8`-verb namespace and the kernel's five-item extent among them, standing unchanged by this point — and the operative figures are ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause, and TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause; THIS CELL IS CARRIED IN `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `25` cells, and its mark stands here at its own bytes**
| **the `DD` family** | `50` rows (`DD-1`…`DD-50`) | **`54` rows (`DD-1`…`DD-54`): `DD-51` · `DD-52` · `DD-53` · `DD-54` are the four priced `DECLARED-DEFAULT` rows this amendment authors for the silences the three rulings leave, each with its `alt` and a reversal point that is an instrument and NEVER a park** |

**AND THE CLOSURE PREDICATE, PRINTED WITH ITS FIGURES SO IT IS CHECKED AND NOT ASSUMED — IT HOLDS.** **THE LEFT
SIDE: `{part-map PART entries}` = `{rows of the part map}` − `{the contract-document row}` = `7 − 1` = `6`.** **THE
RIGHT SIDE, ON THE OPERATIVE PART-ENTRY COUNTING: the `5` `carrier` parts (`crossing` · `surface` · `package` ·
`acceptance` · `parameter-semantics`) + `implementation-plan` (a `carrier` part) + the `view` part `test-cases` =
`6`** — **so the predicate reads `6 = 6` ✓ AND IT HOLDS.** **AND THE RAW FILE SET, PRINTED BESIDE IT BECAUSE A
READER MAY COUNT FILES: `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` ·
`implementation-plan.md` · `test-cases.md` = `7` files beside `contract.md`, each one an entry of the map — so the
two countings agree at `7` entries and `7` files, and the `3` recorded omissions contribute to NEITHER side.**
**THIS PASS CREATES NO PART FILE: the ONLY file it adds is `docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md`,
which is a `DEF-14`/`DEF-15` manifest under `backup/` and is NOT an entry of the part map and NOT a part file** —
**so the file set's own figure and the map's own entry count are BOTH UNMOVED, and the state stays `CLOSED`.**
**AND TWO MORE FIGURES, PRINTED BECAUSE THIS PASS'S OWN RULES REQUIRE THEM: the `derivation:` clause stays
SINGLE — this document still carries exactly ONE, at its opening clause, and THIS clause carries an authority tag
and no second one; and the `HO-` family stands at `HO-1`…`HO-7` with no row added, dropped or renamed.**
**AND WHAT THIS PASS DOES NOT DO: it writes ONLY inside `docs/specs/storeroom-js/**` — NO byte under
`bindings/js/**`, `src/**`, `tests/**`, any tracker, or `../Provident-Electron/**` — it puts NO question to the
architect (every silence it closes is a priced, reversible `DECLARED-DEFAULT` whose reversal point is an
instrument), it re-decides NO ruling and NO `DD` row, and the store's directory
`docs/specs/storeroom-native/**` needs NO change, because the store's own two listener verbs keep their
signatures, their arity and their semantics and the registry `off` removes is the PACKAGE'S OWN** (`A68`;
`A79`; `surface.md §2.4` item 7 (b)).
(`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the rulings; A1
docs/specs/storeroom-js-convenience-proposal.md §6 — the blast radius this statement takes; A3
docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate's single arithmetic, and §C.11.7's
entry-counted unit | numeric or census claim]`).

**⟶ AND THE THIRD RE-READING OF THIS STATEMENT'S TWO FIGURES, LANDED 2026-10-16 BY THE `A122`/`A123` PASS
(`role_spec_writer`) ON `docs/decisions.md` · `A122` · `A123` OF THAT DATE, SO THAT NO STALE CELL OF THE `Q1`
STATEMENT IS LEFT BESIDE THIS ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of the statement above — its
row-by-row clauses and the two `A116`/`RCA-9` re-readings inside them — stands BYTE-FOR-BYTE and is read
THROUGH this clause; THIS clause is a PURE INSERTION, it re-decides no rule and moves no row of the part map.**
1. **THE INSTANCE'S MEMBER SET IS `{ register, on, off, settle, manageConstraints }` — FIVE OWN MEMBERS,
   `4 + 1 = 5` — so the `Q1` statement's `{ register, on, off }` and the `A116` re-reading's
   `{ register, on, off, settle }` are each their own date's figure and the operative statement is
   `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s dated clause of this date.** **The `+1` is the
   post-creation constraint route `manageConstraints`, declared at `surface.md §2.12` item 2 on `A123`.**
2. **THE `PAR-JS` SET IS `23` ROWS: `21 + 1 + 1 = 23` ✓, the addition being `PAR-JS-22` — the post-creation
   constraint route's own parameter, `parameter-semantics.md §2.22` — and `PAR-JS-23` — the constraint
   identity, at `§2.23` — and the count's ONE home is `parameter-semantics.md §1`'s clause of this date.**
   **AND THE `21 × 19 = 399 ≤ 400` ARITHMETIC THE CLAUSE ABOVE PRINTS IS UNMOVED BY THIS PASS: its first
   operand is the CONSTRAINTS test's own `ROWS_OF_CHECKS` and not this unit's row count — the clause above
   says so in its own words — so a reader takes both figures as printed and neither as the other**
   (`docs/specs/storeroom-constraints/contract.md §5.5`).
3. **THE MODULE NAMESPACE MOVES WITH THEM: `8 → 9` verbs, `8 + 1 = 9`, whose operative statement is
   `surface.md §2.9` item 1's dated clause of this date — the `+1` being `manageConstraints`.**
   **⟶ AND THIS ITEM'S FIGURE IS SUPERSEDED AND IS READ THROUGH AT THIS ITEM'S OWN BYTES FROM 2026-10-16 (`RCA-8(g)`: the item stands BYTE-FOR-BYTE above and THIS sentence is its mark): the `8 → 9` is the `A122`/`A123` pass's reading, and the operative figures are ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause, and TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `25` cells** **AND NOTHING
   ELSE OF THIS STATEMENT MOVES: no register row is minted, no cell of the store's surface is spent, the
   `files` allowlist's own cell and the kernel's five-item extent stand as the statement above prints them**
   (`[A2 docs/decisions.md` · `A123` · `A122`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f) and §2.12;
   A3 docs/specs/storeroom-js/parameter-semantics.md §1 | numeric or census claim]`).

**⟶ AND THE THREE CELLS OF THIS STATEMENT ARE RE-DERIVED 2026-10-16 BY THE `A126` PASS (`role_spec_writer`; `A: docs/decisions.md` · `A126` of that date): (1) THE INSTANCE'S MEMBER SET IS `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }` — SEVEN OWN MEMBERS, `4 + 3 = 7`; (2) THE `PAR-JS` SET IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS — `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s clause of 2026-10-16, the `26`/`23 + 3 = 26` this clause printed being the `A126` pass's reading, READ THROUGH THIS CELL AND SUPERSEDED BY THE GATE-2 FIFTH REVIEWER-LOOP PASS, and (3) THE MODULE NAMESPACE IS ONE VERB, `11 → 1` ✓ — `storeCreate` ALONE — whose operative enumeration is `surface.md §2.9` item 1's dated clause of this date, the `11`/`8 + 3 = 11` this cell printed being the `A126` pass's reading READ THROUGH THIS CELL AND SUPERSEDED BY THE SAME PASS; AND THE CELLS OF (1) ARE READ THROUGH THE SAME PASS'S CORRECTION: THE OPERATIVE MEMBER SET IS `TWELVE` OWN MEMBERS, `10 + 1 + 1 = 12` ✓, declared at `surface.md §2.4` item 9 (f)'s `A127` clause, so the `7` here and the `5` beside it are WITHDRAWN AS OPERATIVE.** `RCA-8(d)` ANNOTATE-BESIDE: **the statement's own cells above stand BYTE-FOR-BYTE at their own bytes (`{ register, on, off, settle, manageConstraints }` / `8 → 9` / `21 + 1 + 1 = 23`) and are read THROUGH this clause, which is the operative statement of them from this date; the superseded `manageConstraints` declaration, its arm region and its two parameter rows stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1`–`§4`.** **AND NOTHING ELSE OF THIS STATEMENT MOVES: no register row is minted, no cell of the store's surface is spent, the `files` allowlist's own cell and the kernel's five-item extent stand as the statement above prints them** (`[A2 docs/decisions.md` ·
`A126` · `A123` · `A122`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f)'s, §2.9 item 1's and §2.12's dated
clauses of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING *"Change org to
`@auspicion`"* (`docs/specs/storeroom-publish-proposal.md` `§12`): THE FIVE PLATFORM PACKAGES' NAMES MOVE TO THE
ORG `@auspicion`, AND THE TWO HOMES OF THIS DIRECTORY ARE AMENDED RATHER THAN SUPERSEDED.** `RCA-8(d)`
ANNOTATE-BESIDE: **every bullet and every figure above stands BYTE-FOR-BYTE — the status block, the unit/prefix
line, the `RECONCILED` clause, the scope boundary, the part map, the omissions table and both closure-arithmetic
clauses included — and each is read THROUGH this clause; THIS clause is a PURE INSERTION, it creates no file,
renumbers no `§`, moves no row of the part map, mints no `DD` row, inserts no `PAR-JS` row and re-decides no
ruling.** **THE RULING, VERBATIM: *"Change org to @auspicion"*** (`A86`; that filing's `§12`).

| The figure or cell | What it was before this pass | What it reads now |
| --- | --- | --- |
| **the five PLATFORM names' SCOPE** (`package.md §3.2`'s two maps and their table; `contract.md §0.2`'s `DD-25`) | `@provident-storeroom/js-<label>`, `5` names | **`@auspicion/js-<label>`, `5` names** — the scope segment ALONE replaced at `A86`(a), the operative default; **`A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AS THE PRICED ALTERNATIVE and is NOT applied, its reversal being ONE LINE that must be taken BEFORE the first platform publish** |
| **the SCOPE'S OWN FOOTING** | **the supervisor's PRICED DERIVATION** — `A84`'s `A-1`, whose five names that filing's `§9` calls *"always the supervisor's priced derivation"*, so correcting it was *"inside the ruling rather than beside it"* | **THE ARCHITECT'S OWN — AN ORG HE CONTROLS, AND NOT A DERIVATION AT ALL.** `A86` changes the ORG, so the scope is now his act rather than a supervisor's derivation, and `A85`(5)'s precondition — that the scope be OWNED — is thereby answered |
| **`DD-25`** (the prebuild matrix's membership and hosting) | `5` targets, produced by CI on each release tag, hosted as the registry's own per-target optional-dependency artefacts | **UNMOVED: `5` targets, the same hosting, the same `DD-25` row, the same property `P-SR-7`'s `S-LOAD`.** **The SCOPE of the names those five artefacts carry moves UNDER it and THE ROW DOES NOT** |
| **`DD-26`** (the package IDENTITY) | **the package's registry identity is `@provident-storeroom/js`**, with the sibling crate's `[package] name` `storeroom-js-binding` and the crate id `storeroom_js_binding` | **UNMOVED, AND THE RULING DOES NOT REACH IT: `DD-26`'s subject — THIS package's registry identity — is NOT one of the five platform names, and its own crate spellings are the crate's.** **THE ROW IS AN `ACTIVE` ROW AND IT IS AMENDED, NEVER SUPERSEDED** |
| **the register** | `8` rows, cap `≤ 8` | **`8` rows, cap holding at `8 ≤ 8` ✓, and NO ROW ADDED** |
| **the `PAR-JS` set** | `18` rows | **`18` rows, UNMOVED, and NO ROW ADDED** |
| **the `DD` family** | `54` rows (`DD-1`…`DD-54`) | **`54` rows (`DD-1`…`DD-54`), UNMOVED: `29 + 18 + 3 + 4 = 54` ✓, NO ROW ADDED, DROPPED OR RENUMBERED** |
| **the `HO-` family** | `HO-1`…`HO-7` | **UNMOVED, NO ROW ADDED** |
| **the MAIN package's own identity** (`A82`) | `provident-storeroom`, UNSCOPED | **UNMOVED — `A86` changes an ORG and not that identity.** **Its cells are `docs/specs/storeroom-publish/distribution.md §6.1` item 1, `§6.3` row 6, `parameter-semantics.md §2.1`, `release.md §1.4` step 5 and `release.md §4.2` act 1; each was read this pass, each stands, and NONE is edited from this directory** |

**AND THE CLOSURE PREDICATE, PRINTED WITH BOTH FIGURES SO IT IS CHECKED AND NOT ASSUMED — IT HOLDS.** **THE LEFT
SIDE: `{part-map PART entries}` = `{rows of the part map}` − `{the contract-document row}` = `7 − 1` = `6`.** **THE
RIGHT SIDE, ON THE OPERATIVE PART-ENTRY COUNTING: the `5` `carrier` parts (`crossing` · `surface` · `package` ·
`acceptance` · `parameter-semantics`) + `implementation-plan` (a `carrier` part) + the `view` part `test-cases` =
`6`** — **so the predicate reads `6 = 6` ✓ AND IT HOLDS.** **AND THE RAW FILE SET, PRINTED BESIDE IT BECAUSE A
READER MAY COUNT FILES: `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` ·
`implementation-plan.md` · `test-cases.md` = `7` files beside `contract.md`, each one an entry of the map — so the
two countings agree at `7` entries and `7` files, and the `3` recorded omissions contribute to NEITHER side.**
**THIS PASS CREATES NO PART FILE: the ONLY file it adds is
`docs/specs/storeroom-js/backup/A86-SCOPE-2026-10-11-manifest.md`, which is a `DEF-14`/`DEF-15` manifest under
`backup/` and is NOT an entry of the part map and NOT a part file** — **so the file set's own figure and the map's
own entry count are BOTH UNMOVED, and the state stays `CLOSED`.** **AND ONE MORE FIGURE, PRINTED BECAUSE THIS
PASS'S OWN RULES REQUIRE IT: the `derivation:` clause stays SINGLE — this document still carries exactly ONE, at
its opening clause, and THIS clause carries an authority tag and no second one.**
(`[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a)(b); A1 docs/specs/storeroom-publish/contract.md §1.3
and `docs/specs/storeroom-js/package.md §3.1`/`§3.2` — the same ruling's clauses at this pass's two homes; A3
docs/specs/spec-scope-and-structure/contract.md §C.3 — the closure predicate's single arithmetic, and §C.11.7's
entry-counted unit | numeric or census claim]`).

**⟶ AND ONE CELL OF THAT TABLE IS READ FORWARD ONE RULING, DATED, SO THE TWO PASSES' READINGS ARE NOT TAKEN FOR A
DISAGREEMENT** (`RCA-8(d)` ANNOTATE-BESIDE: **the row above stands byte-for-byte; this is a PURE INSERTION that
states the same cells at the later ruling and adds no row to it**): **the `DD-25`/`DD-26` row's own OPERATIVE cell
above reads *"they are `@auspicion/js-<label>`"* — THE SPELLING THAT WAS OPERATIVE FROM THE `A86` PASS TO THIS
ONE — and the `A88` PROJECT-TOKEN PASS of 2026-10-11 reads it at the PROJECT TOKEN: the five artefacts' names are
`@auspicion/provident-storeroom-js-<label>`, so `DD-25`'s row still carries NO scope spelling of its own and ITS
SUBJECT — the membership and hosting of the `5` targets — is UNMOVED, while the scope AND the project token of the
names those five artefacts carry move UNDER it.** **AND `DD-26`'s line is UNMOVED AT BOTH READINGS:
`@provident-storeroom/js`, `storeroom-js-binding` and `storeroom_js_binding` each STAND, because this unit's own
registry identity is not one of the five platform names.** **THE RULING IS `A88` — the architect's words verbatim,
*"Change the platform package names to specify the project they are for, this organization will be used for
multiple"* (`docs/specs/storeroom-publish-proposal.md §14`; `docs/decisions.md` · the ACTIVE `A88` row of
2026-10-11), whose own `NOT PINS` cell records that *"the main package's identity does not move: `A82`'s unscoped
`provident-storeroom` stands"*.** **AND THE CELLS THAT DO NOT MOVE ARE RE-PRINTED WITH THEIR TERMS, so the two
readings are read at one set: the five PLATFORM names' `5` count, the `5` targets, the `5` labels, the hosting,
the trigger and `DD-25`'s own property `P-SR-7`'s `S-LOAD` are UNMOVED, and this pass adds NO row to either `DD`
cell** (`docs/specs/storeroom-js/package.md §3.1` and `§3.2`; `contract.md §0.2` · `DD-25`, `DD-26`). `[A1
docs/specs/storeroom-publish-proposal.md §14 · `A88`(a) — the project token INSERTED before the language marker;
A1 docs/decisions.md · the ACTIVE `A88` row of 2026-10-11 | requirement]`

## §0. The index region's own rules — the claim ledger, the design-defaults table, and the id families

- **⟶ AND THE SECOND INDEX STATEMENT OF THE SAME KIND, LANDED 2026-10-16 BY THE `A122`/`A123` PASS
  (`role_spec_writer`) ON THE ARCHITECT'S RULINGS `A122`–`A125` OF THAT DATE — THE FIGURES ABOVE STAND, AND
  THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE TWO COUNTS THE PASS MOVES AND OF THE ONE UNDECLARED EDGE IT
  CLOSES.** `RCA-8(d)` ANNOTATE-BESIDE: **every bullet, every table and every figure above — the status
  block, the unit/prefix line, the scope boundary, the part map, the omissions table, the closure predicate
  and both closure-arithmetic clauses, and the `Q1` and `A86` and `RECONCILED` clauses — stands
  BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION, it creates no file,
  renumbers no `§`, moves no row of the part map and re-decides no rule of any cell.**

  | The figure | What it was before this pass | What it reads now |
  | --- | --- | --- |
  | **the module namespace** (the `Q1` clause's cell above, and `§2.9` item 1) | `8` verbs, no ninth | **`9` verbs, whose operative enumeration and arithmetic are `docs/specs/storeroom-js/surface.md §2.9` item 1's dated clause of this date: `8 + 1 = 9`, the `+1` being `manageConstraints`, the post-creation constraint route `A123` requests, declared at `surface.md §2.12`** — **⟶ AND RE-DERIVED 2026-10-16 BY `A126`: `11` verbs, `8 + 3 = 11`, the `+3` being `addConstraint` · `constraintOn` · `constraintOff`, whose operative enumeration is `§2.9` item 1's dated clause of this date; the `9` above is the `A122`/`A123` pass's own reading and is read THROUGH this clause** — **⟶ AND THE NAMESPACE'S OWN FIGURE IS CORRECTED 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: THE MODULE NAMESPACE IS ONE NAME — `storeCreate` ALONE, `11 → 1` ✓ — declared at `surface.md §2.9` item 1's `A127` clause of this date, so the `11`/`8 + 3 = 11` this cell prints is the `A126` pass's reading and is SUPERSEDED and read THROUGH this clause** |
  | **the instance's own member set** | `{ register, on, off, settle }` — FOUR own members | **`{ register, on, off, settle, manageConstraints }` — FIVE own members, `4 + 1 = 5`, whose operative statement is `surface.md §2.4` item 9 (f)'s dated clause of this date** — **⟶ AND RE-DERIVED 2026-10-16 BY `A126`: `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }` — SEVEN own members, `4 + 3 = 7`, whose operative statement is `§2.4` item 9 (f)'s dated clause of this date; the `5` above is the `A122`/`A123` pass's own reading and is read THROUGH this clause** — **⟶ AND THE MEMBER SET'S OWN FIGURE IS CORRECTED 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: THE PRODUCT'S DECLARED MEMBER SET IS `TWELVE` OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — the TEN METHODS plus `register` and `settle` — declared at `surface.md §2.4` item 9 (f)'s `A127` clause of this date, so the `7` this cell prints and the `5` beside it are SUPERSEDED and read THROUGH this clause** |
  | **the `PAR-JS` set** (this document's `§6`) | `21` rows | **`23` rows, `PAR-JS-1`…`PAR-JS-23`, whose arithmetic is `parameter-semantics.md §1`'s clause of this date: `21 + 1 + 1 = 23` ✓ — the two added rows being `PAR-JS-22` (`§2.22`) and `PAR-JS-23` (`§2.23`)** **⟶ AND THIS CELL'S FIGURE IS ITS OWN DATE'S AND CARRIES NO OPERATIVE LABEL FROM 2026-10-16: the operative range is `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓, its searched set being the `§1` index table's `PAR-JS-1`…`PAR-JS-25` rows with no `PAR-JS-26` entry — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s clause of this date** |
  | **the typed register** (`§5.0`) | `8` rows, cap `≤ 8` | **UNMOVED: `8` rows, `8 ≤ 8` ✓ — this pass mints no register row and moves no property of any row** |
  | **the store, its crate, its closed `16`-member set and its namespace** | — | **UNMOVED — `16` codes, `8` verbs, no store byte and no store contract cell** |
  | **the addon's export set and the `exports` map** | `5` exports; ONE arms-bearing arm | **UNMOVED — `5` exports, ONE arms-bearing arm: `A122` keeps one arm and gives the kernel NO arm of its own** |

  **AND THE ONE EDGE THIS PASS CLOSES, NAMED HERE BECAUSE IT WAS THE ONLY UNDECLARED ONE: the entry→kernel
  call.** `surface.md §2.6` and this document's `§2.6` declared constraint and repair evaluation as
  *"CLIENT-SIDE"* and the constraint/repair pair *"as a USAGE PATTERN and NOT as a parameter"*; **a
  four-position `write` entering the kernel's `K-2` was declared NOWHERE.** **The operative law is now
  `docs/specs/storeroom-js/surface.md §2.12` item 1 — authored in that part on 2026-10-16 — the superseded
  bytes of `§2.6` have MOVED OUT byte-exactly to
  `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1`, and `§2.6` above carries its one-line
  pointer** (`RCA-8(g)`: **move out, leave a one-line pointer, never retain beside**). **AND NOTHING ELSE OF
  THIS INDEX REGION MOVES: the closure predicate still reads `6 = 6` ✓ — this pass creates no file and
  retires none — the part map's rows stand, the declared edit scope is unmoved, and the ledger reads as it
  reads** (`[A2 docs/decisions.md` · `A122` · `A123` · `A124` · `A125`, all 2026-10-16; A3
  docs/specs/storeroom-js/surface.md §2.12 and §2.9 item 1's dated clause; A3
  docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date; A3
  archive/reviews/2026-10-16-constraints-publication-gate1.md §17–§19 | numeric or census claim]`).

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
   CLOSED SET OF STATUS CODES with GENERATED messages**, `16` members ranked `1`…`16`, whose membership is
   the STORE contract's to close — **and this unit MINTS NO CODE, WIDENS NO SET, and renames no member**
   (**⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: this clause read *"`15` members ranked
   `1`…`15`"*, BYTE-FOR-BYTE above and read THROUGH this reading — the store's set carries `16` from
   `docs/specs/storeroom-native/contract.md §8.1`'s dated clause of 2026-10-15, `ConstraintListInvalid` the
   appended term at rank `16`, so this unit's own *"MINTS NO CODE, WIDENS NO SET"* is unmoved by the
   re-spelling — this unit's own count is a RESTATEMENT of the store's and it moves with the store's
   alone**) (**⟶ AND THE PRE-AMENDMENT WORD *"fifteen"* WHEREVER THIS DOCUMENT SPELLS THE SET'S SIZE IS READ
   AT `16` BY THIS CLAUSE**)
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED DIVERGENCE SWEEP (`role_spec_writer`), MEASURING THIS ITEM'S OWN FIGURE
AGAINST THE BYTES THIS DIRECTORY PRINTS.** `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands
byte-for-byte and is read THROUGH this clause; it is not reworded and not withdrawn.** **THE FIGURE IT PRINTS
IS `0` AND THE FIGURE THIS DIRECTORY'S BYTES YIELD IS `67`: EIGHT of this directory's NINE files — this
document, `crossing.md` · `surface.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` ·
`test-cases.md` · `implementation-plan.md` — carry `A3` citations whose target is `docs/specs/spec-scope-and-structure/contract.md` or
`docs/specs/spec-authoring-discipline/contract.md`, and NO FILE AT EITHER PATH EXISTS IN THIS REPOSITORY**
(the two process-rule specs are the ADJACENT project's, `../Agent Harness/docs/specs/**`, named at `§7`'s
provenance as read-only citation text). **⟶ AND THE META-REPO PROVENANCE OF THOSE TWO PATHS IS RECORDED HERE AS A STATUS AND NEVER AS A CLAIM ABOUT BYTES THIS REPOSITORY DOES NOT HOLD (GATE-2 SEVENTH REVIEWER-LOOP PASS OF 2026-10-16): the `../Agent Harness/docs/specs/**` provenance named in this sentence is the ONLY record of it this tree carries, it is RECORDED AND NOT VERIFIED BY THIS PASS, and WHETHER THE META-REPO ITSELF DECLARES THAT PROVENANCE IS PUT TO THE ARCHITECT AND IS ANSWERED NOWHERE IN THIS REPOSITORY. SO THIS SENTENCE IS THE SINGLE DECLARED PROVENANCE POINT FOR BOTH PATHS, and every citation of `docs/specs/spec-scope-and-structure/contract.md` or of `docs/specs/spec-authoring-discipline/contract.md` in this directory READS THROUGH IT, each such citation being disposed of as a citation whose target lies OUTSIDE this tree rather than left resolving nowhere.** **SO THE AMENDED, OPERATIVE FIGURE IS `67`, AND THE CLASS IS UNMOVED:
this item's own claim is a `numeric or census claim` and its corrected value is the one this pass measured.**
**AND THE CORRECT SPELLING IS THE ONE THIS SAME ITEM NAMES: a `A3` citation targets a FILED spec of THIS
repo, so a clause that obeys a rule of one of those two specs must STATE THE RULE ITSELF and tag it as its own
declaration rather than cite a path this repository does not carry** — **the re-spelling of all `67` is a
BOUNDED CORRECTION PASS of its own and is NOT taken here, because a re-spelling inside a `carrier` part must
be landed in BOTH homes of every relocated span and the four carrier headers' own lists stand byte-for-byte
until that pass lands** (`[A1 | numeric or census claim]`).

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
| **`DD-1`** | **the crossing's ARGUMENT CARRIERS' permissiveness** — `AddressArg`/`TierArg`/`TierSetItem`/`OpIdArg`/`FilePathArg`/`JournalLengthArg`/`ListenersArg` each carry their store-side outside variants as VALUES rather than as pre-checked errors | **the binding ADMITS each carrier's outside variants as values and converts them to the store's own refusal by CALLING the store's verb with them**, so the store's own closed fail set stays the ONLY producer of a code and **no second, binding-side refusal surface exists** | `§1.2`; `crossing.md §2` | a binding-side pre-check that throws its own `{status, message}` before the store is called; a JS-side code table; a coerced or silently repaired argument | `P-SR-3`; `P-SR-8` | **a binding-side pre-check with its own code set** — priced: it would give the crossing TWO producers of `{status, message}`, and `A72`'s dossier counts exactly ONE externally-sourced vocabulary token, so a second code surface would need its own dossier row and its own conformance drives; available only with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-2`** | `U2`/`U15`/`U16` · the BINDING LIBRARY CLASS (the gate-1 record's `U2`, closed by `A71`'s publish-with-prebuilds and priced at `§14.3` of the proposal) | **the export layer is built with a Node-API binding library of the `napi-rs` family, named ONLY as *"a Node-API binding library"*; the conversion core beneath it is PURE RUST with no Node-API types** | `package.md §4.1` | a hand-written `napi-sys` FFI layer; a `napi-rs` name written as a contract term; a conversion core that imports a Node-API type | `P-SR-1` (the core is drivable without a Node runtime); `P-SR-7` | **a hand-written `napi-sys` layer** — priced: it moves the conformance risk into hand-written FFI and gives the sibling crate an unsafe surface the `napi` CLI's absence at `L-4` does not force; **and naming `napi-rs` outright in a clause** — priced: that name is a **SECOND externally-sourced token**, so `A72`'s one-row dossier would owe a second row with its own `defined` instrument (`[A4]`); both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
**⟶ AND THIS ROW IS RE-DERIVED AT ITS OWN CELL, 2026-10-17, BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`; `RCA-8(g)`: the as-filed row above stands BYTE-FOR-BYTE and is read THROUGH this clause, which re-derives TWO of its cells and re-emits the others untouched).** **THE CLAIM *"ids minted by `D-GP-SRJS` and by no other family"* WAS FALSE OF THE CORPUS AND IS RE-DERIVED: `U-STOREROOM-CONSTRAINTS` DECLARED THE SAME EIGHT SPELLINGS AT ITS OWN `docs/specs/storeroom-constraints/contract.md:20` AND `:405`–`:406` (`§5.1`–`§5.8`, `8` rows), so a bare `P-IM-1` named TWO rows in two documents.** **`What it pins`, RE-DERIVED: *"this unit's register rows are `P-SR-1`…`P-SR-3`, `P-SR-4`, `P-SR-5`, `P-SR-6`, `P-SR-7`, `P-SR-8` — EIGHT rows, ids minted by `D-GP-SRJS` and by no other family, and NO OTHER UNIT OF THIS REPOSITORY DECLARES ANY OF THE EIGHT"*; `alt`, RE-DERIVED: *"the `P-SR-*` id family — **ADOPTED 2026-10-17**, its own price exactly as this cell priced it: a rename with no behaviour change, so the price was a citation sweep, taken by `DEF-2026-10-16-S`'s re-mint pass across both units and their parts"*.** **AND WHAT DOES NOT MOVE, NAMED ONE BY ONE: the row's `§`-refs `§5.1`–`§5.8` are UNMOVED; its `Reversed by` cell stands; its reversal point stands; its `refuted by` cell stands; and the `8`-row count stands `8 ≤ 8` ✓ on BOTH SIDES, because this ruling ADOPTS a priced alternative and DOES NOT ADD THE *"ninth row"* the row's own `refuted by` cell refuses** (`DEF-2026-10-16-S`; the `false`-limb's evidence is the constraints unit's own `§0.1`-region clause of the same date; `§5`'s census at its own cell). |
| **`DD-4`** | `U1`/`U14` · the REALM claim's residual: the addon's internal reach from the ESM entry | **the package's ESM entry reaches the `.node` addon through a `createRequire`-style internal shim, and the shim is NOT a documented, supported, second entry point** | `package.md §1.2`; `package.md §2.1` | a documented `require()` entry; a second `.node` load path; an `exports` map publishing a CJS arm | `P-SR-7` (the module resolves and the addon loads through it: `S-LOAD` and `S-ONE-ADDON`) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **publishing a CJS arm as a co-equal entry** — priced: it would make `require` a claimed realm, which `A70` did not claim, and it would oblige the CJS/ESM dual-package hazard's own clause; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-5`** | `U8`/`U23` · the CANONICAL NUMBER SPELLING's observability — the proposal's `K4` | **the canonical number spelling is declared OUTSIDE this unit's acceptance layer and is asserted by the STORE's own Rust battery against the file's bytes; the JS layer never reaches around the store's surface to read `cfg.filePath`** | `crossing.md §4`; `acceptance.md §3` | a JS-side read of `cfg.filePath`; a JSON-text carrier **used to observe the file image** (**⟶ 2026-10-21 on `A140`: this refusal does NOT reach a binding-internal copy route**); a JS assertion about the file's bytes | `P-SR-1`'s two declared exclusions | **a JS-side file read** — priced: it reaches around the store's closed surface, which `A63`'s narrowing exists to prevent, and `docs/specs/storeroom-native/contract.md §7.2` item 7 (c) says *"no verb returns JSON text"*; available with a fresh ruling that opens the surface | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-6`** | `U3` · `K18`/`K2`/`K3`/`K4` — the crossing walk's residual | **the input copy IS a structural walk over the JS value, one decision per class, with no JSON-text step anywhere on the path** | `crossing.md §1`–`§3` | a `JSON.stringify`-then-parse route; a Rust-side JSON parser; a text entry point on the store's surface | `P-SR-2`; `P-SR-7` | **a `JSON.stringify` carrier plus a store-side parse** — priced: it is impossible as the store stands (no verb accepts text) and it would **MOVE THE STORE'S DECLARED SURFACE**, which is this unit's stop condition `B`; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-6` — RE-DECIDED 2026-10-21 ON `A140`; THE AS-FILED ROW ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS ROW** | `U3` · `K18`/`K2`/`K3`/`K4` — the crossing walk's residual, re-derived | **the input copy IS a structural walk over the JS value, one decision per class, and MAY use a BINDING-INTERNAL JSON text step over the walk's own sanitized clone; no store verb accepts, returns or exposes text; the accepted domain is exactly `StoreValue::is_admitted()`, with `-0` normalized to `0` at the binding boundary** | `crossing.md §1`–`§3`; `A140` | a `JSON.stringify` over caller data; a text entry point on the store's surface; a Rust-side parser exposed as a store verb; accepting `null` or any outside class; a store-level `-0` normalization | `P-SR-2`; `P-SR-7` | **a store-surface JSON carrier** — still refused; the binding-internal route is the priced alternative this row takes, and it does not move the store's surface | a fresh ACTIVE `docs/decisions.md` row followed by a bounded amendment; `A140` is that row |
| **`DD-7`** | `U3` · the cross-realm plain-object test's residual | **the plain-object test is STRUCTURAL and REALM-AGNOSTIC: own enumerable string keys only, no accessor properties, no symbol-keyed own property, no holes, and a prototype that is `null` or a realm-agnostic plain-object prototype** | `crossing.md §3.2` | an `instanceof Object` test; an `Object.getPrototypeOf(x) === Object.prototype` test; a test that refuses `Object.create(null)` | `P-SR-2` | **the realm-IDENTITY test** — priced: it refuses a legitimate cross-realm plain object (`vm`, a worker, `structuredClone`), so "plain" would become a property of the caller's realm rather than of the value; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-8`** | `U3` · the walk's two undecided inputs: a symbol-keyed own property and a sparse array | **a value carrying a `Symbol`-keyed own property is REFUSED `ValueNotAdmitted`, and a SPARSE array is REFUSED `ValueNotAdmitted`; neither reading may be chosen silently** | `crossing.md §3.1` | dropping a symbol-keyed member silently; reading a hole as `undefined`; reading a hole as `null`; writing an omitted element | `P-SR-2`; `P-SR-7` | **dropping the symbol-keyed member** — priced: `docs/specs/storeroom-native/contract.md §1.4`'s write-time-failure rule forbids a silent coercion, and a dropped member is exactly that; **and reading the hole as `undefined`** — priced: `Array.from` and `JSON.stringify` disagree on the hole, so neither reading may be chosen silently; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-9`** | `U7`/`U26` · the JS-side EQUALITY RELATION — the proposal's `K3`, the *"third undeclared normalization"* | **the round trip is asserted under one declared relation: member-SET equality for objects (keys compared as a sorted set, never by insertion order), array INDEX ORDER significant, and `Object.is` for numbers where sign and `NaN` matter** | `crossing.md §5`; `acceptance.md §2` | a `===` comparison of objects; a deep-equal that treats `-0` and `0` as equal; a comparison that treats object key order as significant | `P-SR-1` | **member-order-significant object equality** — priced: the engine re-orders integer-like keys regardless of insertion order, so the relation would be unassertable in JS and the round trip could not be driven; **and `===` for numbers** — priced: `-0 === 0` is true while `Object.is(-0, 0)` is false, so a `file`-tier `-0` round trip would be unexpressible; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-10`** | `U31` · the COPY'S COST BOUND — the walk's depth and size ceiling | **the walk refuses a value whose nesting depth exceeds `64` or whose visited-node count exceeds `1,000,000` with `ValueNotAdmitted`, and the package ships no configuration knob for either bound** | `crossing.md §3.4` | an unbounded recursion; a caller-configurable ceiling; a stack-overflow failure path | `P-SR-2` | **no declared ceiling, with the engine's own stack limit as the only bound** — priced: the failure would be the runtime's `RangeError` and not the store's code, so a deep value would produce a failure OUTSIDE the closed `16`-member set (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: the `15` this cell printed is the set's count before its sixteenth member, `ConstraintListInvalid`, and the cell's own terms are UNMOVED); available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-11`** | `U3` · the CYCLE guard's declared form | **a cycle in the input is REFUSED `ValueNotAdmitted`, detected on the walk's OWN ANCESTOR STACK, never by a `WeakSet` of visited objects** | `crossing.md §3.3` | a shared-but-acyclic reference read as a cycle; a cycle read as an ordinary object; a `WeakSet`-based test | `P-SR-2` | **a `WeakSet` of visited objects** — priced: it refuses a DIAMOND (a value reachable by two paths but acyclic), which an ancestor-stack test admits; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-12`** | `U6` · the failure channel's form — the proposal's `D5`/`N-4` | **a failure crosses as a THROWN plain object with EXACTLY two members, `{ status, message }` — the store's own `status` token verbatim as a JS `string` and its generated `message` verbatim as a JS `string`** | `§2.5`; `surface.md §5` | a returned tagged union; an `Error` subclass; a `Promise` rejection; a third member (`code`, `cause`, `stack`, `data`) | `P-SR-3` (the failure channel's one form and its closed-set reachability) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-IM-3`'s** | **a thrown `Error` subclass carrying the two members** — priced: it adds a class the package must export and a `name` literal, and the store's own record declares exactly two members, so the subclass would be a translation of a record rather than the record; **and a returned `{ok, value}` union** — priced: it makes every call site branch on the arm, while the architect's own `status: 'AddressNotFound'` example is a THROWN status code; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-12` — REPAIRED 2026-10-16, ITS `What it pins` AND `alt` CELLS RE-DERIVED IN PLACE ON THE ARCHITECT'S RULING *"Override the failure form limit"*. THE ROW ABOVE IS THE AS-FILED ROW AND STANDS BYTE-FOR-BYTE; THIS ROW IS THE OPERATIVE ONE AND THE TWO ARE READ AS ONE ROW, ONE ID, ONE PROPERTY AND ONE REVERSAL POINT** (`role_spec_writer`; `RCA-8(g)`: an in-place re-derivation states its own two cells and re-emits no other cell) | `U6` · the failure channel's form — the proposal's `D5`/`N-4` · **as re-derived: the failing ATTEMPT's message log crosses on this channel, and the row's own `alt` cell had priced and refused *"a third member"*** | **A FAILURE CROSSES AS A THROWN PLAIN OBJECT OF EXACTLY THREE MEMBERS, `{ status, message, log }` — the store's own `status` token verbatim as a JS `string`, its generated `message` verbatim as a JS `string`, and `log` carrying the failing attempt's own message log VERBATIM as the kernel's `LogEntry[]`, present on EVERY arm with `[]` where the cause has no attempt at all.** **THE OPERATIVE DECLARATION IS `docs/specs/storeroom-js/surface.md §2.5`'s clause of 2026-10-16, items 1–10, WHICH IS THE CROSSED FORM'S ONE HOME; THE MEMBER'S OWN REGISTER ROW IS `parameter-semantics.md §2.26` (`PAR-JS-26`). ONE FORM, THREE MEMBERS — NOT TWO FORMS AND NOT THREE MEMBERS SOMETIMES** | `§2.5`; `surface.md §5`; **`docs/specs/storeroom-js/surface.md §2.5`'s clause of 2026-10-16, items 3/4 equal the arity and the flatness, item 9 the descriptor; and `§2.12` item 1's mark of the same date, where the fail arm's arity moves** | **a returned tagged union; an `Error` subclass; a `Promise` rejection; and — RE-SCOPED, NOT WITHDRAWN — *"a third member (`code`, `cause`, `stack`, `data`)"*, WHICH IS STILL REFUSED AND WHICH IS NOT THE THIRD MEMBER THIS ROW ADOPTS** | `P-IM-3` (the failure channel's one form and its closed-set reachability; **its `S-FAILFORM`'s member set is `{log, message, status}`, `3` members, `§5.3`'s clause of 2026-10-16**) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-IM-3`'s** | **⟶ THIS CELL IS RE-DERIVED, AND ITS REFUSAL IS RECORDED RATHER THAN DELETED — THE WHOLE POINT OF THE REPAIR.** **(i) THE AS-FILED ENTRY *"a third member (`code`, `cause`, `stack`, `data`)"* STANDS REFUSED AND ITS PRICING STAND REFUSED, BECAUSE IT IS A DIFFERENT SUBJECT: those four are DIAGNOSTIC CARRIERS — each CARRIES A STATUS-SHAPED OR ENGINE-SHAPED DATUM BESIDE THE TWO (a code is a second status token; a `cause` is a second failure; a `stack` is a host frame; `data` is unowned payload) — and EACH would give the channel a SECOND SOURCE OF A TOKEN or a second failure inside one form, which is what `DD-1`, `DD-40` and the closed `16`-member set exist to prevent.** **(ii) THE THIRD MEMBER THIS ROW ADOPTS IS OF A DIFFERENT KIND AND IS PRICED AS ITS OWN SUBJECT: `log` IS THE ATTEMPT'S OWN RECORD, WHICH CARRIES NO STATUS AND NO TOKEN** — its `LogEntry.state` member carries the KERNEL's token on the `outcome` entry only and `null` elsewhere, and that token was ALREADY the kernel's own before this ruling (`A120` (2)); **`log` therefore adds NO producer of any code, mints nothing, and moves the closed `16`-member set not at all** (`surface.md §2.5`'s clause of 2026-10-16, items 1/3/8). **(iii) SO THE EARLIER PRICING DOES NOT APPLY TO `log`, AND THE REASON IS THE SUBJECT AND NOT A RE-READING: that price measured a member that would bring a DIAGNOSTIC VOCABULARY into the form; `log` brings the attempt's OWN RECORD, whose vocabulary is the kernel's and whose home is `docs/specs/storeroom-constraints/`. WHAT CHANGED IS NOT THE PRICE BUT THE CANDIDATE.** **(iv) AND THE `alt` ENTRY IS READ THROUGH THIS CELL RATHER THAN CONTRADICTED IN SILENCE: the as-filed clause's *"not one member beside them"* reading, and its priced refusal, are read as REFUSALS OF THE DIAGNOSTIC THIRD MEMBERS and NOT of the attempt's log.** **AND THE TWO OTHER PRICED FORMS STAND WHOLE AND UNTAKEN: a thrown `Error` subclass carrying the members — priced: it adds a class the package must export and a `name` literal, so it would be a translation of a record rather than the record; and a returned `{ok, value}` union — priced: every call site branches on the arm, while the architect's own `status: 'AddressNotFound'` example is a THROWN status code; all three priced forms available only with a fresh ruling.** **AND WHAT THIS REPAIR DOES NOT PRICE, STATED SO THE `alt` CELL IS NOT READ AS COMPLETE WITHOUT IT: the ONE form the ruling forecloses by name is an ENVELOPE — `{status, message, failure: {log}}` or a class instance — REFUSED at `PAR-JS-26`'s own `alt` cell, because the ruling's flat reading puts the third member BESIDE the two and never behind one** | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-13`** | `U6` · `K6`'s residual, as `A64` narrows it | **the unit owes NO discrimination rule between a stored value and a failure record: storing a value whose shape is indistinguishable from `{status, message}` is an UNSUPPORTED ANTI-PATTERN the caller carries** | `§2.5` | a discrimination helper; a branded failure record; a value-shape check on the success path | `P-SR-3`'s form half only (the discrimination half is `A64`'s declared ABSENCE and is carried by no row) · **as filed: `P-TP-9`'s form half only — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-IM-3`'s** | **a branded failure record** — priced: it needs a third member (refused at `DD-12`) or a `Symbol` key (refused at `DD-8`), and the architect ruled the ambiguity the caller's own fault (`A64`); available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-13` — MARKED 2026-10-16 AT ITS OWN `alt` CELL, BECAUSE THE ROW ABOVE CITES A REFUSAL `DD-12` HAS NOW RE-SCOPED** (`role_spec_writer`; `RCA-8(g)`: the row above stands BYTE-FOR-BYTE and is read THROUGH this clause; no cell of it is re-spelled and no rule of it is re-decided) | — | **THE ROW'S OWN RULE IS UNMOVED AND IS THE WHOLE OF THIS MARK: NO discrimination helper, NO branded record, NO value-shape check on the success path — and `A64`'s rule that the ambiguity is the CALLER's fault STANDS WHOLE.** **AND ITS `alt` CELL'S PARENTHESIS *"it needs a third member (refused at `DD-12`)"* IS RE-SCOPED AND NOT WITHDRAWN: the third member it names is a BRANDED/DIAGNOSTIC one — a member that would DISCRIMINATE the form from stored data — and THAT class is still refused at `DD-12`'s repaired row. THE THIRD MEMBER `DD-12` ADOPTS, `log`, IS NOT A DISCRIMINATOR AND IS NOT THIS CELL'S SUBJECT: `log` is present on EVERY arm unconditionally (`[]` where no attempt exists), so it distinguishes NOTHING — a caller's stored value can carry a `log` of its own and the ambiguity `A64` accepts is exactly as unresolved as it was.** | — | — | — | — |
| **`DD-14`** | `U10`/`U11`/`U15` · `K8`/`D7`/`C5` — the handle's JS spelling | **the construction's `listeners[]` takes handles as PLAIN STRINGS (input), and every handle RETURNED to JS is an OPAQUE JS value the package wraps; `unlisten` accepts the OPAQUE form ONLY; the package compares handle identity internally by the token it holds privately** | `§2.3`; `surface.md §3` | a returned handle that is the token string; an `unlisten` that accepts a bare string; a public token accessor on the wrapper | `P-SR-8` | **ONE spelling in both directions, the STRING** — priced: opacity is surrendered for a guessable `listener-<n>` namespace, which the store's own contract declares an ACCEPTED cross-process hazard and does not defend; **and** a caller-spelled opaque wrapper — priced: `unlisten`'s no-op answer over a fabricated handle stops being drivable; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-15`** | `U11` · `K9`/`D6`/`C6` — the handle→function registry's residual | **the registry is PER PACKAGE INSTANCE, keyed by the opaque handle the package returned, holding AT MOST ONE function per handle, and it is the package's own state — the store knows nothing of it** | `§2.4`; `surface.md §4` | an `unlisten` that unregisters the function; a fan-out registry; a registry owned by the store; a registry surviving the wrapper's collection | `P-SR-8` | **an `unlisten` that also unregisters** — priced: it merges a store-side withdrawal with a package-side holding and would make a re-registration's fate depend on the store's own no-op answer; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-16`** | `U22`/`U28` · `U-24`/`J-13` — the constraint/repair pattern's home, `A73`'s client-side cut | **constraint and repair evaluation is CLIENT-SIDE and is stated ONLY as a usage pattern over declared verbs: evaluate constraints after a `write`, and on a violation call `rollback` with the `JournalOp.opId` the write returned. NO constraint verb, no constraint parameter, no repair route and no seam is declared** | `§2.6`; `surface.md §6`; `parameter-semantics.md` `PAR-JS-18` | a constraint verb; a function-carrying parameter; a repair route through the journal; a store-surface change of any kind | `P-SR-8` | **a store-side constraint surface** — priced: the store declares no constraint surface and adding one is a STORE-SURFACE CHANGE (**stop condition `B`**), which `A68`'s whole layout exists to avoid; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-17`** | `U13`/`U30` · `K17`/`S-7`/`D8`/`C18` — instance ownership and the release question, `A74`'s *"Not needed"* | **one `Store` per package instance, CALLER-OWNED, with NO finalizer and NO release verb at either layer; a dropped wrapper holds only memory to process exit, because the store runs no background work, holds no OS handle beyond `cfg.filePath` and commits synchronously** | `§3.5`; `package.md §5` | a `dispose()`; a `close()`; a `FinalizationRegistry`-based release; a store-level teardown | `P-SR-7` | **a package-level `dispose()`** — priced: it is a small surface addition with a declared no-op on second call, and `A74` declined it, so adding it re-decides a closed ruling; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-18`** | `U17` · `S-9`/`D10`/`C10`/`L-6` — the JS test layer's runner and pattern | **the JS layer runs under `node --test` with `node:test` + `node:assert`, driven through the package's claimed ESM entry, from `bindings/js/`'s own test directory; the Rust layer runs `cargo test` in the sibling crate** | `§4.1`; `acceptance.md §1` | a third-party test runner; a runner that drives the addon directly rather than the package entry; a JS test of the store's Rust-only clauses | `P-SR-7`'s `S-LAYER` (every figure carries its site and its layer, and no `APP`-green is claimed) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **a third-party runner** — priced: it adds a dependency to the delivered package and a second lock file, while `node --test` is on the declared toolchain (`v24.20.0`) and ships with the runtime; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-19`** | `U20` · `L-5`/`C8`/`C17` — the RED SET's ownership and derivation | **this unit's own red set lives in `bindings/js/` (`src/**`'s unit tests beside it, the JS suite in its own directory), is authored FROM THIS CONTRACT ALONE, and is run and reported BEFORE any implementation; the store's `tests/**` is RE-RUN as a non-regression record and never rewritten** | `§4.3`; `acceptance.md §4` | a red set authored after the implementation; a rewritten store test; a weakened assertion; a red set inside the store's `tests/**` | `P-SR-1`; `P-SR-7`'s `S-LAYER` (the red set's own run is a figure, and every figure carries its site and its layer) · **as filed: `P-IM-1`; `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s `S-LAYER`** | **a red set kept inside the store's `tests/**`** — priced: it would make a root `cargo test` build and run this unit's drives, contradicting the store's plan cell *"NOT DONE IF … a red set outside `tests/**`"* and its single-package green; available only by amending the store | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment **of the store's directory, which is NOT this unit's to take** |
| **`DD-20`** | `U17`/`U29` · the LAYER discipline — `L-6`, `§5` of the gate-1 record | **this unit's JS-side green is an `ENVELOPE/PURE` green and NOTHING MORE; the ASSEMBLED/`APP` layer for this unit is `NONE`, and no node-suite green may be reported as an `APP`-green** | `§4.2`; `acceptance.md §2.3` | an `APP`-green claimed from a node-green; a re-labelling of the store's green as this unit's; a green claimed without its layer | `P-SR-7`'s `S-LAYER` (the layer label travels with every figure, and no `APP`-green is claimed) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **an `APP`-green driven by a consumer that assembles the package** — priced: there is no assembled application in this repository — the unit delivers a LIBRARY — so the claim would have no host to be green IN; available with a consumer project's own unit | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-21`** | `U29` · `S-8`'s consumer half, `U-38`/`J-8` — the host handoff | **this unit installs, wires and configures NOTHING anywhere; a finding or a wiring duty for any consuming project is a `HO-` HANDOFF ROW and never a patch, and this unit dispatches no patch into any consumer** | `§9`; `package.md §2` | a wiring step in any phase; a `HO-` duty discharged as a patch; a consumer's configuration written by this unit | `P-SR-7`'s `S-HO` (one drive per `HO-` row, and no handoff discharged as a patch) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **a first-consumer wiring step inside this unit** — priced: it would make this unit's scope depend on one consumer's module system and would re-open `A9`'s read-only ruling; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-22`** | `U30` · `S-7`'s delivery half, `U-45` — the FIRING WINDOW and order | **the package invokes a registered listener function SYNCHRONOUSLY AFTER the verb's own call has returned, in the order the package's own registry iteration produces — and NO ORDER IS ASSERTED, because the store declares the order unobservable** | `§2.7`; `surface.md §7` | a declared invocation order; an invocation before the verb returns; an asynchronous invocation with an undeclared scheduler | `P-SR-8` | **an ordering guarantee (registration order, or address order)** — priced: it needs a monotonic ordinal the store's own record does not carry, and the store's `DD-37` declares the returned set order-insignificant; **and** an async delivery — priced: it needs a queue, a flush rule and a failure channel for a throwing body, none of which any ruling names; both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-23`** | `U30` · `S-7`'s delivery half — the THROWING listener body | **a registered function that throws is NOT caught, NOT retried and NOT reported: the exception propagates out of the package's own invocation loop, and the store's verb result is already complete and unaffected by it** | `§2.7`; `surface.md §7` | a `try`/`catch` around a listener body; a retry; a collected error report; a rollback triggered by a listener's throw | `P-SR-8` | **catching and reporting a throwing body** — priced: the report would need a failure channel the package does not own (`DD-12`'s single form is the STORE's), and `A74`'s no-background-work reading leaves no queue to report through; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-24`** | `U14`/`U1` · the ONE ENTRY's shape — the load path's residual | **the package's `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one — and every other subpath a consumer could spell is either absent or an internal file the `exports` map does not expose** | `package.md §1.3` | a co-equal CJS arm; a deep-import path to the `.node`; a wildcard `"./*"` export | `P-SR-7`'s `S-LOAD` and `S-ONE-ADDON` (the module resolves and exactly one addon loads through it) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **a CJS arm beside the ESM one** — priced: it is a SECOND claimed realm, and `A70` claimed exactly one; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-25`** | `U16` · `A71`'s own silence — the prebuild matrix's membership and hosting | **the prebuild matrix is the three platforms × two architectures the package's first cut supports — `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64` — `5` targets, produced by CI on each release tag and hosted as the registry's own per-target optional-dependency artefacts** | `package.md §3.2` | a committed binary; a `postinstall` build-on-install fallback as the primary route; an `armv7`/`wasm32`/`freebsd` target; a self-hosted binary store | `P-SR-7`'s `S-LOAD` (the published artefact is what the one claimed entry loads) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **fewer targets (the host platform's own)** — priced: an ordinary consumer on another platform would then need a Rust toolchain, which `A71`'s publish-with-prebuilds ruling exists to remove; **and a self-hosted artefact store** — priced: it adds a hosting duty and a network dependency the registry already supplies; both available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-26`** | `U16` · the package IDENTITY — `A71` names no registry identity | **the package's registry identity is `@provident-storeroom/js` and the sibling crate's `[package] name` is `storeroom-js-binding`, with the crate id `storeroom_js_binding`** | `package.md §3.1` | an unpublished package with no identity; a scoped name under an owner this project does not carry; a name colliding with the store's own crate | `P-SR-7` | **an unscoped, project-owned name** — priced: it is a rename with a `package.json` edit and a citation sweep and no behaviour change; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-27`** | `U12` · `A68`'s own silence — the sibling crate's edition, resolver and dependency pinning | **the sibling crate declares `edition = "2021"`, its OWN `Cargo.lock` is NOT committed (it is a library), and its dependencies are pinned by the caret requirement its `Cargo.toml` states; the crate has NO path back into the store beyond the single path dependency `storeroom-native = { path = "../.." }`** | `package.md §4.2` | a workspace membership; a second path dependency reaching into the store's `tests/**`; a vendored copy of the store's sources | `P-SR-7` | **a committed `Cargo.lock`** — priced: it would pin the store's transitive versions for every consumer of a library, which is a consuming-application decision and not a library's; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-28`** | `U5`/`U9` · `A69`'s two ACCEPTED consequences — the guessable namespace and the prior-session token | **the package treats a handle token as OPAQUE and NEVER spells one, so the guessable `listener-<n>` namespace is not reachable through the package's own documented surface; and the package states in its own documentation that a handle MUST NOT be carried across a process reload** | `§2.3`; `surface.md §3`; `parameter-semantics.md` `PAR-JS-8` | a documented token spelling; a serialization of a handle; a handle compared to a user-supplied string; a promise that a handle survives a reload | `P-SR-8` | **documenting the token spelling and letting callers build handles** — priced: it would make the containment note's hazard ordinary and would contradict `A69`'s accepted-consequence cell, which *accepts* the hazard rather than defending it; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-29`** | `U16`/`U15` · the PACKAGE'S OWN `Node-API` CARRIER VERSION — the residual `A71` leaves unnamed: the version the addon is built against and what the package declares about it | **the package declares NO Node-API version floor of its own and NO ABI assertion: the addon is built against the Node-API version the sibling crate's build target declares, and the package's documentation states the floor as the sibling crate's build target rather than as a JS-side constraint** | `package.md §1.4`; `package.md §4.3` | a JS-side ABI check at load; a runtime version assertion in the package; a second floor beside `DD-38`'s engine floor and beside `DD-38`'s own `"engines"` cell | `P-SR-7` | **a runtime ABI assertion in the package's own load path** — priced: it would make the package's load fail with a package-minted failure form (`DD-12`'s single form admits no second shape) for a state the addon's own loader already reports; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-30`** | `U33` · whether a `CLOSED` contract directory is a frozen surface, and `AMEND-FROZEN`'s availability | **`CLOSED` is a DIRECTORY-COMPLETENESS state and never a content freeze: this directory's rows are reversible defaults and this contract may be amended by its own author at a bounded amendment pass** | `§0.2`'s preamble; `§0.1` item 10 | a claim that this directory is frozen; an `AMEND-FROZEN` route taken against this contract | `P-SR-7`'s `S-LAYER` (this directory's own state report is a figure, and every figure carries its layer) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **reading `CLOSED` as a freeze** — priced: it would make every one of the `47` defaults permanent and would contradict the reversal instrument each of their own cells names; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-31`** | `U34` · the store's `DONE` row, its green and its layer | **the store's `DONE` row is not re-opened, its green is not re-labelled and it is NOT re-measured as this unit's green; the store's suite is re-run only as a non-regression record, at the figure the artifact that carries it prints** | `§7.1`; `acceptance.md §4.2` | a re-measured store figure reported as this unit's; a re-opened `DONE` row; a store green claimed at the `APP` layer | `P-SR-7`'s `S-LAYER` (the store's green is quoted with its site and its layer and is not re-labelled) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **re-running the store's suite as this unit's own acceptance leg** — priced: it makes this unit's green depend on a DONE unit's tree and contradicts `A68`'s non-touch clause; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-32`** | `U35` · `A69`'s store-side landing duties | **the store-side cells `A69` moved (`docs/specs/storeroom-native/contract.md §0.4` clause 2, `parameter-semantics.md §2.10`/`§2.13`, `write-and-read.md §6.2`'s relocated twin and `seams-and-lifecycle.md §10.2`'s relocated prohibition) are CITED as landed and are NOT amended, re-printed or reconciled by this unit; this unit's own reads are taken on the PROCESS scope** | `§2.3`; `§8` | an edit to any store-side cell; a re-derivation of the store's uniqueness domain here; a second copy of the store's reconciliation in this directory | `P-SR-8` | **re-printing the store's reconciliation here** — priced: it would give one rule two addressable homes in two directories and would drift the moment either moves; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-33`** | `U26`/`U24` · the FIGURES' sites and layers — `G-17`'s own finding | **every run, probe and count this unit reports carries its SITE and its LAYER; and the store's operative green is quoted at the figure the artifact that carries it prints, with the as-filed figures named as historical** | `§7.1`; `§7.2` | a figure without a site; a figure without a layer; a figure quoted from memory; a count re-derived as if measured here | `P-SR-7`'s `S-LAYER` (every figure carries its site and its layer) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **quoting one figure for all time** — priced: three separate acceptance runs print three different figures for the same suite, so a single figure would be false of two of them; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-34`** | the unit's own choice — the WALK's treatment of a `Proxy` | **the BINDING owns proxy detection: a `Proxy` whose target is a plain object is REFUSED `ValueNotAdmitted` (`NonPlainCollection`), because a trap could change the membership between two reads of the same value** | `contract.md §1.4` item 4 (g); `crossing.md §3` | a `Proxy` walked as its traps report; a `Proxy` detected by a vendor-specific check; a `Proxy` admitted with a single-read assumption | `P-SR-2` | **walking the proxy as its traps report (single read)** — priced: the walk reads each member once, so a non-deterministic trap would make the copy's content a function of read order and unassertable; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-35`** | the unit's own choice — the WALK's treatment of `Object.create(null)` | **`Object.create(null)` is ACCEPTED as a plain object** | `contract.md §1.4` item 4 (e); `crossing.md §3` | a test that refuses a prototype-less object; a coercion of it into a prototype-carrying form | `P-SR-2` | **refusing it** — priced: it has no prototype at all, which is the plainest case there is, so refusing it would be a test that refuses its own premise; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-36`** | the unit's own choice — the CONSTRUCTION call's shape on the JS side | **`storeCreate(cfg)` takes ONE plain object with the store's declared keys, and the package passes them through WITHOUT adding a default, a rename or a key of its own.** **⟶ AS FILED the cell read *"the store's THREE declared keys (`filePath` · `journalLength` · `listeners`)"* and *"a fourth key the package injects"*; AMENDED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: the store's declared keys number FOUR — `filePath` · `journalLength` · `listeners` · `constraints` — so *"a fourth key the package injects"* is re-spelled **"a FIFTH key the package injects"** and the cell's own rule is UNMOVED** | `§2.1` and its dated clause of 2026-10-15; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4` and `§2.20` | a defaulted `journalLength`; a required `filePath`; a `listeners` default of `[]`; **a FIFTH key the package injects**; a `constraints` default of `[]` | `P-SR-7` | **defaulting `listeners` to `[]`** — priced: an ABSENT `listeners` is one of `PAR-12`'s own outside values and its declared answer is `AddressMalformed` with no instance, so a default would make a declared refusal unreachable; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-37`** | the unit's own choice — the READ's tier argument spelling on the JS side | **`read(address, tier?)` and `readLiteral(address, tier?)` accept the store's own two spellings — one token or an array of tokens — verbatim, and the package neither normalizes nor validates them** | `§2.2`; `parameter-semantics.md` `PAR-JS-6` | a normalized tier spelling; a pre-validated tier; an array flattened or de-duplicated by the package | `P-SR-8` | **accepting only a single token on read** — priced: it would make the store's own any-match set unreachable from JS and would narrow a declared parameter's domain; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-38`** | the unit's own choice — the PACKAGE's own JS runtime floor | **the package declares `"engines": { "node": ">=18.0.0" }`, which is the floor the Node-API carrier's own version needs and not a floor this unit measures** | `package.md §1.4` | an unbounded engine floor; a floor justified by a measurement this pass did not take; an Electron-specific floor | `P-SR-7`'s `S-LOAD` (the floor is a property of the one claimed entry's own boot) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **a higher floor (`>=20`)** — priced: it would exclude consumers the carrier itself serves, and the version is a declaration rather than a measurement; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-39`** | the unit's own choice — the JS SIDE'S SPELLINGS of the store's returned records | **the store's returned records cross as fresh JS objects with the store's OWN member names: `WriteResult` → `{ op, watched, triggered }`, `DeleteReceipt` → `{ address, tiers, triggered }`, `JournalOp` → `{ opId, kind, address, tier, before, after, seq, compacted }`, `BaseState` → `{ present, value }`, `RollbackResult` → `{ opId, undoneOps, restoredTo }`, and a tier crosses as the STRING token `'file'|'mem'|'temp'`** | `crossing.md §1.3`'s returned-record rows; `parameter-semantics.md` `§2.13`–`§2.16` | a renamed member; a camel-cased re-spelling of `opId`; a numeric index for a tier; an opaque wrapper for a record | `P-SR-1` (the round trip, under the declared relation) · **as filed: `P-IM-1`; `P-TP-9` — the `P-TP-9` half reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-IM-1`'s** | **a camel-casing pass over the store's member names** — priced: `opId` is the store's own declared spelling (`docs/specs/storeroom-native/contract.md §0.4`) and a re-spelling would make the contract's own spelling table and the JS surface disagree; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-40`** | the unit's own choice — the BINDING's error path when the store returns a code outside the closed set | **the binding maps a code outside the `16`-member set (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS — the `15` this cell printed is the set's count before its sixteenth member, `ConstraintListInvalid`; the cell's own rule is UNMOVED) to a thrown `{status, message}` whose `status` is the received token VERBATIM and whose `message` is generated by the store's own `storeErrorMessage`; the package MINTS NO CODE and throws NO code of its own** | `§2.5`; `surface.md §5` | a package-minted code; a silently swallowed non-member; a re-mapped code | `P-SR-3` (the failure channel's single form, and the closed set's reachability with no package-minted code) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-IM-3`'s** | **throwing a package-owned `UnknownFailure` code** — priced: it adds a token outside the store's closed set, which the store's own contract calls *"a contract violation, not an extension of the set"*; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-41`** | the unit's own choice — the HANDOFF rows' ids | **the `HO-` family is minted here as `HO-1`…`HO-7`, one row per unclaimed realm and one for the IPC route, and the tracker rows the `HO-` duties land in are written by the TRACKER gate and not by this pass** | `§9`; `package.md §2` | a handoff duty discharged as a patch; an unnumbered handoff; a handoff row without a positive revisit condition | `P-SR-7`'s `S-HO` (one drive per `HO-` row: the package exposes no entry for the realm) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **deferring the `HO-` ids to the tracker gate** — priced: the realm clause would then print unnumbered duties, which `AR-7` forbids; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-42`** | the unit's own choice — the PUBLISH step's TRIGGER and versioning policy | **the prebuild matrix is produced on a release TAG of the form `v<major>.<minor>.<patch>`, the package's `version` is that tag's, and NO publication happens from an untagged commit** | `package.md §3.3` | a publish from a branch; a version bumping on every commit; a prebuild matrix produced by hand | `P-SR-7`'s `S-LOAD` (the tagged artefact is what the one claimed entry loads) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **publishing from `main`'s head on every merge** — priced: an artefact with no identity to name and no reproducible tag to rebuild from, while the store's own plan cites reproducibility as its build's property; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-43`** | the unit's own choice — the `AGPL-3.0` declaration's SITE | **the licence is declared in the package's `package.json` `license` field, in `bindings/js/README.md`, and at `package.md §3.4`; the licence file itself is NOT copied into the sibling crate** | `package.md §3.4` | a copied `LICENSE` file inside `bindings/js/`; an undeclared licence; a licence other than the repository's | `P-SR-7`'s `S-LOAD` (the licence travels with the artefact the one claimed entry loads) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **copying `LICENSE` into `bindings/js/`** — priced: it would duplicate a tracked file that the registry artefact already has to carry, and a stale copy is a silent licence divergence; available with a bounded amendment | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-44`** | the unit's own choice — the JS-side spelling of the CONSTRUCTION's `listeners[]` entries | **each entry is a plain JS object `{ address, handle }` where `address` is a JS array of segments and `handle` is a plain non-empty `string`** | `§2.1`; `parameter-semantics.md` `PAR-JS-4` | an entry carrying a wrapper object for the handle; an entry carrying a string address; an entry with a third member | `P-SR-7` | **accepting the package's own opaque wrapper in the construction** — priced: no wrapper exists before an instance does, so the construction would be unspellable for a first instance; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-45`** | the unit's own choice — the `delete` and `rollback` verbs' JS-side file behaviour | **`delete` and `rollback` perform no file I/O, so a JS caller that deletes or rolls back a `file`-tier version and then re-`storeCreate`s over an equal `cfg.filePath` sees the deleted version STAND AGAIN, and the package DOCUMENTS this as the store's own declared boot rather than as a defect** | `§2.8`; `surface.md §8` | a package-side compensating file write; a package-side re-commit; a package claim that a delete is durable | `P-SR-7` | **a package-side commit after a delete or a rollback** — priced: it would give the package a file-write duty the store deliberately does not carry, and it would need a failure channel for a write the store's own closed set declares only for a WRITE's commit path; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-46`** | the unit's own choice — the ARITY the package accepts for each verb's arguments | **the package passes every argument position through as supplied and performs NO arity check of its own: a missing, extra or wrong-shaped argument reaches the store's own carrier value and answers the store's own code** | `§2.2`; `parameter-semantics.md`'s every row | a JS-side arity check; a `TypeError` for a missing argument; a defaulted argument | `P-SR-8` | **a JS-side arity check throwing a package `TypeError`** — priced: a `TypeError` is a failure form OUTSIDE `DD-12`'s single form and outside the store's closed set, so the crossing would carry two failure channels; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |

**⟶ AND ONE SENTENCE OF THE ROW ABOVE — `DD-46`'s — IS SUPERSEDED, LANDED 2026-10-15 ON THE ARCHITECT'S RULING THAT THE PACKAGE'S ARITY CHECK STANDS (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **the row, its identifier, its other cells and every other row of this table stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it moves no row, mints no row, renumbers nothing, adds no column and moves no cell of any other row.** **THE ROW'S OWN WORDS IT SUPERSEDES ARE NAMED AND STAND BYTE-FOR-BYTE ABOVE: *"the package passes every argument position through as supplied and performs NO arity check of its own: a missing, extra or wrong-shaped argument reaches the store's own carrier value and answers the store's own code"* — AND ITS REFUSAL CELL'S *"a JS-side arity check"*.** **THE LAW THAT REPLACES IT, AND ITS ONE EXTENT: THE PACKAGE MAY READ THE CALL'S ARGUMENT COUNT FOR THE FOURTH POSITION OF `write` — THE OPTIONAL `commit?`, DECLARED LAST — AND ONLY FOR THAT POSITION.** **`write`'s declared arity is `3` REQUIRED ARGUMENTS WITH THE FOURTH OPTIONAL**; **an argument ABSENT at the fourth position is IN DOMAIN and the write opens or joins its commit all the same**; **an `undefined` SUPPLIED at the fourth position is OUTSIDE THE DOMAIN AND REFUSED**; **and NO OTHER VERB AND NO OTHER POSITION OF THIS SURFACE GAINS AN ARITY READING, A DEFAULT OR A SUBSTITUTED ARGUMENT — every other position still reaches the store's own carrier value and answers the store's own code** (`docs/specs/storeroom-js/surface.md §2.2`'s clause 4 of 2026-10-15, which is the operative declaration and the one home of this law; `docs/specs/storeroom-js/parameter-semantics.md §2.20`'s re-spelled cells of the same date). **⟶ AND THE ORDINAL AND THE ARITY FIGURES OF THIS CLAUSE ARE RE-CUT AT ITS OWN CELL, 2026-10-21 (`role_spec_writer`; `RCA-8(g)`: the law's SUBSTANCE — one arity reading, one position, no default, no other position reached, the priced alternative TAKEN — STANDS WHOLE): `write`'s position is the FOURTH and the reading is `3` required with the FOURTH optional, the surplus trailing position the per-verb entries carried having been removed (`docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §1`/`§4`; `PAR-SAS-4`), and the operative declaration is the SAME `surface.md §2.2` clause 4, re-cut in the same pass.** **AND THE ROW'S OWN PRICE IS ANSWERED RATHER THAN LEFT STANDING: the alternative it priced — *"a `TypeError` is a failure form OUTSIDE `DD-12`'s single form and outside the store's closed set"* — IS TAKEN AT THIS ONE POSITION, and the refusal is an instance of `TypeError` whose `status` member is ABSENT and whose string `message` member is required** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (b)'s own form, read at that site and not restated here). **NO `DD` COUNT MOVES AND NO `§`-NUMBER MOVES** (`[A2 docs/decisions.md` · the architect's ruling of 2026-10-15, quoted at `docs/defects.md`'s `DEF-2026-10-15-AA`; A3 docs/specs/storeroom-js/surface.md §2.2` clause 4 | requirement]`).
| **`DD-47`** | the unit's own choice — the CENSUS of `P-1`'s rows, at its own site | **the `28` rows are disposed of ROW BY ROW at `§7.3`, and the partition table that carried them is marked NON-RE-DERIVABLE here rather than reconstructed** | `§7.3`; `§8` item 1 | an invented row id; a reconstruction of the listener unit's partition table from memory; a silent disposal of the census | `P-SR-7`'s `S-LAYER` (the census is a figure, and every figure carries its site and its layer) · **as filed: `P-TP-9` — reconciled 2026-10-11, a NINTH row the cap forbids, and its subject is `P-TP-7`'s** | **re-deriving the partition from the three step reports** — priced: those reports are transcriptions whose losses are filed as a defect class, so a reconstruction would be evidence about a transcription and not about the partition; available when the archival loop recovers the table | a bounded amendment of `docs/specs/storeroom-js/` |

**AND THREE `DD` ROWS MORE, ADDED AT THIS DIRECTORY'S NINTH BOUNDED AMENDMENT — THE THREE STRUCTURES THE
COMPLIANCE SWEEP LISTS AS EMBODIED BY THE CODE AND DECIDED BY NO RULING, EACH CARRIED REVERSIBLE, EACH WITH ITS
ALTERNATIVE PRICED, AND NOT ONE OF THEM A QUESTION PUT TO THE ARCHITECT** (`RCA-8(d)` ANNOTATE-BESIDE: **every
row above, the two census clauses above and the `P-TP-9` reconciliation block below stand byte-for-byte, and
this block and the dated census clause under it are the operative statement of the table's size**; the
finding's home `archive/reviews/2026-10-11-structural-compliance.md` `§4` · `U-10` · `U-11` · `U-12`, whose
fourteen structures are the finding this block closes for the three of them that are THIS unit's — **an
undeclared structure is a FINDING**; `[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set
and the `alt` obligation | declared parameter semantics]`):

| DD | The residual it carries (the undeclared structure the sweep names) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-48`** | **the HANDLE TYPES' DIFFERENCE (`U-10`)** — *"`JsHandle{token}` — a SECOND handle type derived WITH `Hash` beside the store's `ListenerHandle` (no `Hash`), where the rulings declare ONE opaque handle"* | **MOVED OUT — the full statement stands VERBATIM in the clause at the foot of this table, at `§0.2c`** | `§2.3` items 1–2; `package.md §4.5` item 2's `JsHandle`/`JsHandleArg` row and item 5's dated clause; `docs/specs/storeroom-native/contract.md §0.4` clause 1 (the store's own derive set) and its `§0.2` row for the home's handle index | **a `Hash` added to the store's `ListenerHandle`**; **the two types collapsed into one**; **a public token accessor on either**; **a handle compared by any rule other than its token's equality**; **a handle's identity read through any structure but the registry the package owns** | **`P-SR-8`** (the registry's keying and the opaque identity: `DD-14` · `DD-15`) · **`P-SR-5`** (the registration site's answers, one row per outside class) | **ONE HANDLE TYPE SPELLED IN BOTH CRATES** — priced: the two types are separated by a boundary that shares NO ownership (`A1 docs/specs/storeroom-js-proposal.md §10 · `A65`), so a single type would have to be the store's (no `Hash`, and then the boundary's keyed registry owes a second key type beside it) or the boundary's (`Hash` on a value the store never keys by, and a store-side derive the store's own contract does not declare); available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-49`** | **the CORE-SIDE CARRIER OF THE REGISTRATION SITE'S PER-INSTANCE DOMAIN (`U-11`)** — the sweep's *"`enum JsListener{…}` and its in-crate registry — the package's registry rules are declared, the core-side carrier shape is not"* | **THE CORE'S INSTANCE HOLDS, BESIDE THE ONE STORE INSTANCE, ONE RECORD OF THE HANDLE TOKENS THIS INSTANCE MINTED (`listen`) OR ADOPTED AT ITS OWN CONSTRUCTION — read as a DOMAIN-MEMBERSHIP TEST at the registration site and at NOTHING ELSE.** **The function NEVER crosses and NO SLOT FOR ONE EXISTS CORE-SIDE** (`DD-15`); **the registry that holds the functions is the PACKAGE's, keyed by the identity registration returned** (`§2.4` items 4–5; `package.md §4.5` item 5's dated clause); **and the core-side listener carrier the sweep names is DELETED rather than carried** | `§2.4` item 5 (c); `package.md §4.5` item 5's dated clause; `DD-14`; `DD-15`; `parameter-semantics.md §2.12` (`PAR-JS-12`) | **a callable held core-side, or a carrier holding one**; **a registry — or a variant for one — beside the domain**; **a core-side answer for a non-function listener** (that class is the package's, judged before the addon is reached: `§2.4` item 5 (d)); **a domain widened to another instance's tokens** (`PAR-JS-8`'s FOREIGN value) or narrowed to one address; **a domain that outlives the instance** | **`P-SR-8`** (the registration site's declared answers, and an outside value refused without disturbing any standing registration) · **`P-SR-5`** (`S-REG`'s one row per outside class) | **NO CARRIER AT ALL — THE DOMAIN RECOMPUTED AT EVERY REGISTRATION BY ASKING THE STORE** — priced: the store's mint is PER PROCESS and not per instance (`A1 docs/specs/storeroom-js-proposal.md §13 · `A69`), so the per-instance answer would be unexpressible and a FOREIGN instance's minted token would be accepted; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |
| **`DD-50`** | **the PACKAGE'S LIVE PER-INSTANCE STATE, AND ITS LIFETIME (`U-12`)** — the sweep's *"`state{id,tokens,registry}` and `WeakMap INSTANCES` — the package's live per-instance state; `§2.4` declares the registry's rules and never its carrier"* | **THE PACKAGE'S LIVE STATE IS ONE RECORD PER INSTANCE — the instance's own `id` · the map of the opaque handles it has wrapped to their tokens · and the registry of handle→function — HELD IN A MODULE-LEVEL `WeakMap` KEYED BY THE INSTANCE**, so **the state's lifetime IS the wrapper's, no state is reachable once the wrapper is collected, and the record is never exposed, never enumerated and never crosses the boundary.** **The `id` is the one the addon's own instance dispatch carries; the registry is `§2.4`'s and is keyed by the identity registration returned** | `§2.1`; `§2.3` item 2; `§2.4` (all four rules); `surface.md §3` and `§2.4`; `DD-14`; `DD-15`; `DD-17` (no release verb, no background work) | **a state table holding a STRONG reference to an instance** (a leak the caller cannot release, there being no `dispose()`/`close()`: `DD-17`); **a module-level SINGLE state shared by every instance**; **the state carried on a caller-visible property of the instance object**; **any state surviving the wrapper, or visible to a second instance**; **the registry handed out, or the tokens map read out** | **`P-SR-7`** (a fresh instance over an equal `cfg.filePath` knows nothing of a prior one: `DD-38`'s boot half, and the one claimed entry's own load) · **`P-SR-8`** (each instance's own registry, and the four rules read over it) | **A SYMBOL-KEYED OWN PROPERTY ON THE INSTANCE OBJECT** — priced: the package's state would become enumerable by any consumer holding the instance, and a caller could read or REPLACE the registry whose rules `§2.4` fixes, so a registry rule would stop being the package's; available with a fresh ruling | a bounded amendment of `docs/specs/storeroom-js/` |

**⟶ AND ONE CELL OF THE TABLE ABOVE IS MOVED OUT OF IT AND RE-EMITTED HERE VERBATIM, BECAUSE ITS ROW CANNOT CARRY IT UNDER THE LINE WIDTH THE TABLES ARE HELD TO — A WIDTH RE-CUT AND NOT A SHORTENING, AND THE CLAUSE STANDS AT THE TABLE’S FOOT SO THE TABLE STILL READS AS A TABLE.** `RCA-8(d)` ANNOTATE-BESIDE: **the row’s identifier and its other cells stand as they are; this clause is a PURE INSERTION at the table’s foot, it moves no row, adds no row, drops no row, renumbers nothing, changes no row count and no column count, and it edits no byte of the table’s header, its delimiter row or any other row; the moved cell’s own slot in its row carries the pointer `§0.2c`, which names this clause, and the cell’s text appears below from its first byte to its last, altered in no byte.** THE CELL IS THE ROW’S `What it pins` CELL, RE-EMITTED VERBATIM:** **THE CROSSING'S HANDLE OUTPUT IS THIS UNIT'S OWN NEWTYPE OVER THE TOKEN — carrying `Clone` + `Debug` + `PartialEq` + `Eq` + `Hash`, with a PRIVATE token field and no public accessor — WHILE THE STORE'S `ListenerHandle` CARRIES `Clone` + `PartialEq` + `Eq` + `Debug` AND NO `Hash`.** **The two derive sets are NOT to be unified, and the asymmetry is the RULE rather than an accident: the boundary's value is what a KEYED structure may hold as a key (`§2.4`'s registry is keyed by the identity registration returned), while the STORE's own handle→address index is keyed by the TOKEN and never by the handle, so `ListenerHandle` is declared without a `Hash` and gains none** 

**⟶ AND THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS BY THIS NINTH BOUNDED AMENDMENT — THE OPERATIVE
FIGURE** (`RCA-8(d)` ANNOTATE-BESIDE: **every census clause above — the `47`-row clause, its numbering
disclosure and the `P-TP-9` reconciliation block — stands byte-for-byte, and THIS clause is the operative
statement of the table's size**): **the table carries `50` AUTHORED rows** — `DD-1`…`DD-29` (**`29` rows**, the
`28` carriage rows and the residuals with them) + `DD-30`…`DD-47` (**`18` rows**) + **`DD-48`…`DD-50`** (**`3`
rows**, added at THIS amendment, each carrying ONE structure the compliance sweep lists as embodied by the code
and decided by no ruling) — **so `29 + 18 + 3 = 50` ✓, the numbers run `1`…`50` with no gap, `DD-29` is still the
`Node-API` carrier-version row and still stands at the table's foot, and NO row's citation depends on its
printed position.** **THE `§0.2` HEADING'S *"(`DD-1`…`DD-47`, `47` AUTHORED rows)"* AND THIS INDEX REGION'S
AS-FILED RANGE ARE THE AS-FILED FIGURES AND STAND ABOVE BYTE-FOR-BYTE; the operative range is `DD-1`…`DD-50`,
and the three added rows are the only figure this amendment moves.** **AND NO REGISTER ROW, NO `PAR-JS` ROW, NO
`HO-` ROW AND NO FAILURE-CODE MEMBER MOVES WITH IT: the register still carries `8` rows with the cap holding
(`8 ≤ 8` ✓), the `PAR-JS` range stands at `PAR-JS-1`…`PAR-JS-19` (**⟶ READ AT ITS FIRST FIGURE FROM 2026-10-16, AND ITS `the OPERATIVE range is` LABEL WITHDRAWN THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-21` range is the gate-2 close-out pass's reading, the `19` here being the `A116` pass's reading; the two added rows are `PAR-JS-20`, the write's FOURTH optional argument `commit`, and `PAR-JS-21`, the construction's fourth `cfg` key `constraints`, both at `parameter-semantics.md §1`; the OPERATIVE range, count and arithmetic are `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, at that part's `§1` count-correction clause of that date**) (this line's own as-filed figure, `…PAR-JS-18`, is
the reading of the pass that wrote it and is re-derived by the `A116` dated clause at `§0`'s index region — the
register's `8` rows and every `HO-` row and failure-code member stand UNMOVED), and this unit mints no status code** (`[A3
docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set and the `alt` obligation; A3
docs/specs/storeroom-js/contract.md §0.1 item 5 — the `≤ 8` cap, and none of the three rows cites a row that
does not exist | numeric or census claim]`).

**AND FOUR `DD` ROWS MORE, ADDED AT THE `Q1` CONTRACT AMENDMENT — THE FOUR SILENCES THE ARCHITECT'S RULINGS
`A79`–`A81` LEAVE, EACH CARRIED REVERSIBLE, EACH WITH ITS ALTERNATIVE PRICED, AND NOT ONE OF THEM A QUESTION PUT
TO THE ARCHITECT** (`RCA-8(d)` ANNOTATE-BESIDE: **every row above, the two census clauses above and the `P-TP-9`
reconciliation block below stand byte-for-byte, and this block and the dated census clause under it are the
operative statement of the table's size**; the rulings' silences are at
`docs/specs/storeroom-js-convenience-proposal.md §8` · `A79` · `A80` · `A81` — **a silence a ruling leaves is a
`DECLARED-DEFAULT` here and never a question put to him**; `[A3 docs/specs/spec-authoring-discipline/contract.md
§3.2 — the class set and the `alt` obligation | declared parameter semantics]`):

| DD | The residual it carries (the ruling's own silence) | What it pins | The clause it cites | What it REFUSES | The property that checks it | Its alternative, priced | Its reversal point |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`DD-51`** | **`A81`'s *"always validate"* names the VALIDATION and leaves the MEMBERS' OWN MESSAGES unnamed** — who authors the bytes of `on`'s and `off`'s refusals' Segment Two, and where those bytes live | **THE TWO NEW SITES' MESSAGES ARE BUILT ON `surface.md §2.5` item 5's OWN PATH: SEGMENT ONE IS THE STORE'S GENERATOR'S STRING through `errorMessage` for the answering code at the failing target's spelling, and SEGMENT TWO — the class half and the ARGUMENT POSITION — IS AUTHORED BY THE BOUNDARY and appended after `CF-3`'s separator, so NEITHER NEW SITE MINTS A SECOND MESSAGE FORM, A SECOND STATUS OR A THIRD MEMBER** **⟶ AND *"A THIRD MEMBER"* IN THIS CELL IS SUPERSEDED AS AN ARITY FROM 2026-10-16 BY THE ARCHITECT'S RULING *"Override the failure form limit"*, read with his earlier ruling *"Bubble the message log to the client on failure, override any clauses that forbid this"* (`RCA-8(g)`: the cell stands BYTE-FOR-BYTE and is read THROUGH its own clause at the table's foot): the cell's own LAW is UNMOVED — SEGMENT ONE is the store's generator's, SEGMENT TWO is the boundary's appended class-and-position half, and neither new site mints a second message form or a second status — and the THIRD MEMBER `log` is not a message form and not a status, so the cell forbids exactly what it always forbade** | `surface.md §2.5` item 5 (b)–(d) and its `CF-3` split clause; `parameter-semantics.md §2.17`'s dated clause; **`surface.md §2.5`'s clause of 2026-10-16, item 3** | a package-authored string STANDING IN FOR Segment One; a per-member constant table for these two sites; a member's own status token; a `TypeError` returned as the site's form | `P-SR-3` (the failure channel's single form, and the closed set's reachability) · **`P-SR-5`** (the two new sites' answers, one row per outside class) | **A NAMED MESSAGE HELPER PER MEMBER** — priced: it gives the two sites a package-owned rendering of the store's own target and puts a boundary-side vocabulary outside `§1.2`'s and `§1.3`'s class names, and it would have to be re-spelled in BOTH of `§2.5`'s carrier homes (`contract.md §2.5` and `surface.md §2.5`); available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-52`** | **`A80`'s *"`off` can deregister"* settles THAT `off` removes the registry's entry and leaves unnamed WHAT `on` does with a NEW function at a HELD address whose entry was placed by `register` DIRECTLY** — replacement or refusal | **`on` AT A HELD ADDRESS REPLACES: it returns that address's existing handle — `§2.3` item 6's inherited address-level idempotence — and the registry's function for that identity becomes the NEW listener, whatever member placed the previous one. THE REGISTRY DOES NOT RECORD WHICH MEMBER WROTE AN ENTRY, and `register` and `on` share ONE map with ONE replacement arm (`§2.4` rule 2)** | `surface.md §2.4` item 7 (a) and rule 2; `contract.md §2.3` item 6; `parameter-semantics.md §2.12`'s dated clause | a per-entry PROVENANCE record; a refusal where the previous function arrived through `register`; a second map for `on`'s entries; a replacement that changes the IDENTITY rather than the FUNCTION | `P-SR-5` (the four rules at every transition, and the two new sites' own arms) | **A REFUSAL WHERE THE HELD ENTRY WAS `register`ed DIRECTLY** — priced: a caller's own two-call spelling would then make the one-call spelling unreachable at that address, and `A79`'s whole point — that the combined call is the same act performed once — would hold only of addresses `on` itself created; and it would need a provenance record no clause of this directory declares and `DD-50`'s state record does not carry; available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-53`** | **`A80`'s *"`off` can deregister"* and `A81`'s *"always validate"* leave `off`'s answer over a handle IT NEVER SAW but THIS INSTANCE DID MINT OR ADOPT unnamed** — an entryless in-domain identity | **`off(h)` WHERE `h` IS AN IN-DOMAIN IDENTITY THE REGISTRY HOLDS NO FUNCTION FOR — never registered, or already removed by an earlier `off` — IS A SUCCESS: the store-side withdrawal is performed and `undefined` is returned, removing nothing that was not there and disturbing NO OTHER REGISTRATION. `off`'s REFUSAL ARM IS THE OUTSIDE-DOMAIN HANDLE ALONE** | `surface.md §2.4` item 7 (b), the OWN and OWN-ENTRYLESS arms; `parameter-semantics.md §2.8`'s dated clause; `DD-15` | a throw for an entryless in-domain handle; a silent no-op that SKIPS the store-side withdrawal; a removal of any OTHER registration; a fabricated handle read as entryless rather than outside | `P-SR-5` (the four rules and the two new sites' arms) · **`P-SR-8`** (the outside-value set at the boundary) | **AN `unlisten`-STYLE NO-OP FOR AN UNKNOWN HANDLE AT `off` TOO** — priced: it erases the ONE declared difference between the two verbs over one value, so a caller's typo at `off` and a caller's deliberate `off` would print the same observable, and the store's own `AddressMalformed` trigger for *"a present argument outside its domain"* would be left with no reachable arm at this site; **and a THROW for the entryless in-domain handle** — priced: it makes a lawful second `off` a failure and turns `off`'s own idempotence into an error path; both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| **`DD-54`** | **`A80` fixes `off`'s TWO REMOVALS and does not order them against each other in the ONE case the store refuses** — a malformed argument's shape reaching the store-side `unlisten` | **THE ORDER IS: VALIDATE, THEN THE STORE-SIDE WITHDRAWAL, THEN THE REGISTRY'S REMOVAL — `surface.md §2.4` item 7 (b)'s three steps. So on a refusal NEITHER removal is performed and the registry entry STANDS; and where the store's own `unlisten` answers a malformed argument's shape the package's registry removal is NOT performed, so the entry is left STANDING rather than removed twice-over. ONE ORDER, ONE OBSERVABLE: after any `off` that throws, BOTH the store-side entry and the registry entry are exactly as they were.** | `surface.md §2.4` item 7 (b), steps 1–3; `parameter-semantics.md §2.8`'s dated clause | a deregistration FIRST and a withdrawal second; a partial `off` that removed one half and refused the other; a `try`/`finally` that forces the registry removal on a throwing withdrawal; a second, undocumented order | **`P-SR-5`** (the four rules at every transition, and the two new sites' own answers) | **REMOVE THE REGISTRY ENTRY FIRST, THEN WITHDRAW STORE-SIDE** — priced: an order whose failing half leaves an entry the store still holds and the package no longer knows, so a trigger under that address would carry an identity the registry cannot match and the caller would see a registration it thought it had removed behave as if it still stood; **and a `finally`-forced registry removal** — priced: it makes `off` destroy package state on a path the store refused, and the two halves of one verb would then disagree about whether the call succeeded; both available with a fresh ruling | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |

**⟶ AMENDED 2026-10-15 — `DD-50`'S ENUMERATION GAINS ITS FOURTH MEMBER: THE PER-RECORD SAVE'S OWN MARKER, WHICH IS INTERNAL STATE CARRYING NO SURFACE NAME** (`RCA-8(d)` ANNOTATE-BESIDE: **the row above, every other row of the table, the foot clause below, the table's `54`-row census and every arithmetic beside it STAND BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION at the table's foot — it ADDS NO ROW, DROPS NO ROW, RENUMBERS NO ROW, CHANGES NO ROW COUNT AND NO COLUMN COUNT, and it edits no byte of the table's header, its delimiter row or any row**; `[T: the fourth member of `DD-50`'s enumeration, added with its count re-derived so the enumeration is not read as closed at three | state or fail-state declaration]`). **⟶ AND THIS CLAUSE'S OWN PREMISE IS RE-SPELLED 2026-10-15 BY THE SUPERVISOR'S RULING, AT ITS BYTES AND NOT IN ITS FACTS (`role_spec_writer`; `RCA-8(d)` ANNOTATE-BESIDE: **every sentence below stands BYTE-FOR-BYTE and is read THROUGH this reading; THIS reading moves no member, no count and no citation, and it edits no byte of the table, its census or the three members above**): **THE MARKER IS NOT A MEMBER OF `DD-50`'S ENUMERATION AND THIS CLAUSE ADDS NOTHING TO THAT ROW.** **`DD-50` ENUMERATES THE *PACKAGE'S* LIVE PER-INSTANCE STATE — the instance's `id`, its handle→token map and its handle→function registry — three members, UNMOVED; the reading that closed it at three, and every arithmetic that reading carries, STAND WHOLE.** **`saved` IS the CORE store's own state and is NAMED WHERE `storeroom-native` STATES IT: it is the JOURNAL ENTRY's own member — `src/store.rs:530` inside `struct Entry` (`src/store.rs:512–531`: `op` · `captured` · `home` · `compacted` · `saved`), the per-record carrier `§6.1` item 2 declares CARRIER-INTERNAL — READ at the guard `src/store.rs:1265` and SET at `:1271` on the success arm alone, inside `Store::commit_file` (`src/store.rs:1254`).** **THE DECLARED-SURFACE GAP THIS READING NAMES RATHER THAN CLOSES: `storeroom-native` states that law at `contract.md §0.4`'s `Store::commit_file` row (DECLARED 2026-10-15) and enumerates NO member of `Entry` anywhere — its `DD-50` row carries the pre-state carrier as *"`Entry{op,captured,home,compacted}`"* without `saved` — so THE MEMBERS' OWN ENUMERATION IS OWED THERE as a bounded amendment of `docs/specs/storeroom-native/`, and THIS clause keeps the member's text at its foot until that clause lands** (`docs/specs/storeroom-native/contract.md §6.1` item 2 and `§0.4`'s `Store::commit_file` row; `src/store.rs:512–531`; `src/store.rs:1254`, `:1265`, `:1271`).
**THE MEMBER ADDED: THE CORE STORE'S OWN PER-RECORD SAVE MARKER — `Entry { …, saved: bool }`, one BOOLEAN PER SETTLED RECORD, SET ON THE SUCCESS ARM OF THE `file`-TIER SAVE ALONE. IT IS INTERNAL STATE AND CARRIES NO SURFACE NAME: no member of `DD-50`'s record is exposed by it, no verb returns it, no record's member set moves, it crosses no boundary, and nothing of it is enumerable by a caller — so `DD-50`'s OWN `What it REFUSES` cell (the state reachable by a consumer holding the instance) is UNWIDENED by it.** **THE LAW IT CARRIES: THE SAVE IS PERFORMED AT MOST ONCE PER RECORD — `Store::commit_file(op_id)` (the core's own row at `docs/specs/storeroom-native/contract.md §0.4` — the row whose second cell declares `Store::commit_file(&mut self, op_id: &str) -> Result<(), StoreError>` at `src/store.rs:1254` and THIS once-per-record law — DECLARED 2026-10-15) ANSWERS `Ok(())` ON A RE-DRIVE OF AN `op` THIS INSTANCE HAS ALREADY SAVED AND RE-SERIALIZES NOTHING.** **THE CONSEQUENCE THE MARKER EXISTS TO PREVENT, STATED BECAUSE IT IS THE WHOLE REASON FOR IT: `delete` DOES NOT COMMIT (`DD-28`; the store's own `§7.2` item 5), so a re-driven save would RE-SERIALIZE A REGISTER A MEMORY-ONLY `delete` HAS SINCE CHANGED and move the bytes at `cfg.filePath` OFF THE STORE'S OWN DECLARED LAST SUCCESSFUL `file`-TIER WRITE — a durability statement the contract fixes and no act of the store may silently move.** **ITS AUTHORITY IS A SPEC ARTIFACT AND NOT A NEW `§7.2` CLAUSE: the row is `docs/specs/storeroom-native/implementation-plan.md §10.9` row 3 (`P-SM-3`, strategy id `S-ARM-SAVE`), whose FAILS-IT cell NAMES THIS STATE EXACTLY — *"a save performed twice for one record"* — and whose arms `(a)`/`(b)` dispose of the commit on the passing and failing arms; NO `§7.2` CLAUSE IS OWED AND NONE IS AUTHORED HERE.** **THE COUNTS, RE-DERIVED RATHER THAN ASSERTED: the record's parts MOVE `3 → 4` (the instance's own `id` · the handle-to-token map · the registry · **the per-record save marker**), so *"exactly three parts"* at the proposal-review's `§19.3` finding 5 and at its `Q6` is READ AT FOUR; the `DD` FAMILY DOES NOT MOVE — the table still carries `54` AUTHORED rows (`29 + 18 + 3 + 4 = 54` ✓, `DD-1`…`DD-54`, no row added and no id renumbered), the register still carries its `8` rows with its cap holding, and `PAR-JS` still stands at `PAR-JS-1`…`PAR-JS-21`** (`docs/specs/storeroom-native-proposal-review.md §19.3` finding 5 and `§19.5` `Q6`, whose *"fourth part of that record"* wording this clause LANDS with the home it asked for; the `§0.2` census clause below, whose own terms are unmoved; `docs/defects.md`'s `DEF-2026-10-15-Y`).

**⟶ AND THE TABLE'S OWN CENSUS, RESTATED WITH ITS TERMS BY THE `Q1` CONTRACT AMENDMENT — THE OPERATIVE FIGURE**
(`RCA-8(d)` ANNOTATE-BESIDE: **every census clause above — the `47`-row clause, its numbering disclosure, the
`P-TP-9` reconciliation block and the `50`-row block — stands byte-for-byte, and THIS clause is the operative
statement of the table's size**): **the table carries `54` AUTHORED rows** — `DD-1`…`DD-29` (**`29` rows**) +
`DD-30`…`DD-47` (**`18` rows**) + `DD-48`…`DD-50` (**`3` rows**) + **`DD-51`…`DD-54`** (**`4` rows**, added at THIS
amendment, each carrying ONE silence the rulings `A79`–`A81` leave and each disposed of here as a priced,
reversible `DECLARED-DEFAULT`) — **so `29 + 18 + 3 + 4 = 54` ✓, the numbers run `1`…`54` with no gap, and NO row's
citation depends on its printed position.** **AND NO REGISTER ROW, NO `PAR-JS` ROW, NO `HO-` ROW AND NO
FAILURE-CODE MEMBER MOVES WITH IT: the register still carries `8` rows with the cap holding (`8 ≤ 8` ✓) and ONE
row RE-DERIVED at `§5.5`, the `PAR-JS` range stands at `PAR-JS-1`…`PAR-JS-18` with TWO rows RE-DERIVED (**READ THROUGH THE `A116` ORDERING-SEAM PASS'S DATED CLAUSE AT THE `Q1` CONTRACT AMENDMENT'S OWN INDEX STATEMENT ABOVE, 2026-10-15: the range's OPERATIVE figure is `PAR-JS-1`…`PAR-JS-19`, `PAR-JS-19` being the ordering seam at `parameter-semantics.md §2.19`, so *"`…PAR-JS-18`"* above is this clause's own filing-time reading and the register's `8` rows stand UNMOVED with it** — **AND READ THROUGH ONE MORE, 2026-10-16, AND ITS `the OPERATIVE range is` LABEL WITHDRAWN THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-21` range and the `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ arithmetic are the gate-2 close-out pass's reading of 2026-10-15 (the `19` of both readings above being the `A116` pass's), and the OPERATIVE range, count and arithmetic are `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date; the register's `8` rows stand UNMOVED with it**), and this
unit mints no status code** (`[A3 docs/specs/spec-authoring-discipline/contract.md §3.2 — the class set and the
`alt` obligation; A3 docs/specs/storeroom-js/contract.md §0.1 item 5 — the `≤ 8` cap; A1
docs/specs/storeroom-js-proposal.md §8 · `A79`–`A81` — the silences the four rows carry | numeric or census
claim]`).

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE TWO CELLS OF THIS TABLE THE RULING REACHES, RE-EMITTED WITH THEIR AS-FILED SPELLINGS AND RE-READ — AND BOTH ROWS KEPT, AMENDED AND NEVER SUPERSEDED.** `RCA-8(d)` ANNOTATE-BESIDE: **every row above, every census clause above and every closing arithmetic above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it ADDS NO ROW, DROPS NO ROW, RENUMBERS NO ROW and re-decides no rule.** **THE RULING IS `A86` — *"Change org to @auspicion"* — and the reading applied is `A86`(a), the scope segment alone replaced** (`docs/specs/storeroom-publish-proposal.md` `§12`).

| The row | Its AS-FILED pin (RE-EMITTED VERBATIM) | The operative reading |
| --- | --- | --- |
| **`DD-25`** | **the prebuild matrix is the three platforms × two architectures the package's first cut supports — `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64` — `5` targets, produced by CI on each release tag and hosted as the registry's own per-target optional-dependency artefacts** | **UNMOVED: the membership (`5` labels), the hosting, the trigger and the row's own property (`P-SR-7`'s `S-LOAD`) are the same. THE SCOPE OF THE NAMES THOSE FIVE ARTEFACTS CARRY MOVES UNDER THIS ROW AND THE ROW DOES NOT: they are `@auspicion/js-<label>`, and the row's own citation `package.md §3.2` now prints the operative five names beside the as-filed ones** |
| **`DD-26`** | **the package's registry identity is `@provident-storeroom/js` and the sibling crate's `[package] name` is `storeroom-js-binding`, with the crate id `storeroom_js_binding`** | **UNMOVED, AND `A86` DOES NOT REACH IT: this row's subject — THIS package's own registry identity — is NOT one of the five platform names the ruling re-scopes. The identity `@provident-storeroom/js`, the crate's `storeroom-js-binding` and the crate id `storeroom_js_binding` each STAND. THE ROW IS AN `ACTIVE` ROW AND IT IS AMENDED, NEVER SUPERSEDED: this clause re-reads its fact and replaces no cell of it** |

**AND ONE READING THE TWO ROWS' DIFFERENCE OWES, STATED SO A READER DOES NOT COLLAPSE THEM: THE FIVE PLATFORM ARTEFACTS' NAMES AND THIS PACKAGE'S OWN REGISTRY IDENTITY ARE TWO DIFFERENT IDENTITIES, and after this pass they may spell different scopes. A pass that moved `DD-26`'s subject to `@auspicion/js` as well would be taking a SECOND identity change, which `§12` does not order and this pass does not take.** **AND THE SCOPE'S OWN FOOTING IS RE-STATED WITH THE `DD-25` HALF: `A84`'s `A-1` introduced the five names' scope as THE SUPERVISOR'S PRICED DERIVATION, while `A86` CHANGES THE ORG — so the scope is now THE ARCHITECT'S OWN, an org he controls, AND NOT A DERIVATION AT ALL; and `A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AND UNAPPLIED, its reversal being one line to be taken before the first platform publish.** **AND THE TABLE'S OWN CENSUS IS UNMOVED BY THIS CLAUSE: `54` AUTHORED rows, `29 + 18 + 3 + 4 = 54` ✓, NO ROW ADDED, DROPPED OR RENUMBERED, the register still `8` rows with the cap holding (`8 ≤ 8` ✓), the `PAR-JS` range still `PAR-JS-1`…`PAR-JS-18`, the `HO-` range still `HO-1`…`HO-7`, and no status code minted** (`[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a)(b); A1 docs/specs/storeroom-publish/contract.md §1.3 · A1 docs/specs/storeroom-js/package.md §3.1` and `§3.2` — the same ruling's clauses at this pass's homes; A3 docs/specs/storeroom-js/contract.md §0.1 item 5 — the `≤ 8` cap | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 AGAIN — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
*"Change the platform package names to specify the project they are for, this organization will be used for
multiple"* (`docs/specs/storeroom-publish-proposal.md` §14; `docs/decisions.md` · the ACTIVE `A88` row of
2026-10-11): THE FIVE PLATFORM NAMES GAIN THE PROJECT TOKEN, AND `DD-25` AND `DD-26` ARE RE-READ — BOTH ROWS KEPT,
BOTH `ACTIVE`, BOTH AMENDED AND NEITHER SUPERSEDED.** `RCA-8(d)` ANNOTATE-BESIDE: **every row above, every census
clause above and every closing arithmetic above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause
is a PURE INSERTION — it ADDS NO ROW, DROPS NO ROW, RENUMBERS NO ROW and re-decides no rule.** **THE RULING,
VERBATIM: *"Change the platform package names to specify the project they are for, this organization will be used
for multiple"*** (`A88`; that filing's `§14`).

| The row | Its AS-FILED pin (RE-EMITTED VERBATIM) | The operative reading at `A88` |
| --- | --- | --- |
| **`DD-25`** | **the prebuild matrix is the three platforms × two architectures the package's first cut supports — `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64` — `5` targets, produced by CI on each release tag and hosted as the registry's own per-target optional-dependency artefacts** | **UNMOVED: the membership (`5` labels), the hosting, the trigger and the row's own property (`P-SR-7`'s `S-LOAD`) are the same. THE SCOPE AND THE PROJECT TOKEN OF THE NAMES THOSE FIVE ARTEFACTS CARRY MOVE UNDER THIS ROW AND THE ROW DOES NOT: they are `@auspicion/provident-storeroom-js-<label>` — the project token INSERTED between the scope (`A86`, unmoved) and the language marker (`A88`(a)) — and the row's own citation `package.md §3.2` now prints the operative five names beside the `A86` ones and the as-filed ones** |
| **`DD-26`** | **the package's registry identity is `@provident-storeroom/js` and the sibling crate's `[package] name` is `storeroom-js-binding`, with the crate id `storeroom_js_binding`** | **UNMOVED, AND NEITHER `A86` NOR `A88` REACHES IT: this row's subject — THIS package's own registry identity — is NOT one of the five platform names a ruling re-scopes or re-names. The identity `@provident-storeroom/js`, the crate's `storeroom-js-binding` and the crate id `storeroom_js_binding` each STAND. THE ROW IS AN `ACTIVE` ROW AND IT IS AMENDED, NEVER SUPERSEDED: this clause re-reads its fact and replaces no cell of it** |

**AND THE SCOPE'S OWN FOOTING IS RE-STATED WITH BOTH HALVES, BECAUSE THIS IS THE SECOND RULING IN A ROW TO REACH
`DD-25`: `A84`'s `A-1` introduced the five names' scope as THE SUPERVISOR'S PRICED DERIVATION; `A86` CHANGED THE
ORG, SO THE SCOPE IS THE ARCHITECT'S OWN; AND `A88` NOW NAMES THE PROJECT INSIDE THAT ORG, BY HIS OWN ACT — SO
BOTH THE SCOPE AND THE PROJECT TOKEN ARE HIS, AN ORG HE CONTROLS AND A PROJECT HIS ORG CARRIES, and NEITHER is a
derivation at all.** **AND THE SPELLING THAT WAS OPERATIVE FROM THE `A86` PASS TO THIS ONE — `@auspicion/js-<label>`
— IS SUPERSEDED AND IS REFUSED BY NAME at this pass's sibling directory, so a home, a manifest, an entry, a
workflow matrix or an attempt set still carrying it is a FINDING** (`docs/specs/storeroom-publish/contract.md
§5.6`; `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-29`). **AND THE PRICED ALTERNATIVE `A88`(b) —
`@auspicion/provident-storeroom-<label>`, the project token REPLACING the language marker — IS CARRIED AND
UNAPPLIED, its reversal being ONE LINE to be taken BEFORE the first platform publish, because after it a scoped
name is spent.** **AND ONE READING THE TWO ROWS' DIFFERENCE OWES, STATED SO A READER DOES NOT COLLAPSE THEM: THE
FIVE PLATFORM ARTEFACTS' NAMES AND THIS PACKAGE'S OWN REGISTRY IDENTITY ARE TWO DIFFERENT IDENTITIES, now spelled
at two different projects' worth of tokens — the five carry the token `provident-storeroom` INSIDE a scoped name,
and this unit's own identity carries the word `js` INSIDE a scope that has not moved. NOTHING HERE MIGRATES
`DD-26`'s subject to the five names' spelling, and a pass that took that edit would be taking a SECOND identity
change no ruling orders.** **AND THE TABLE'S OWN CENSUS IS UNMOVED BY THIS CLAUSE TOO: `54` AUTHORED rows,
`29 + 18 + 3 + 4 = 54` ✓, NO ROW ADDED, DROPPED OR RENUMBERED — this pass mints NO `DD` row in this directory and
the ruling's own priced default lives at `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-29` — the
register still `8` rows with the cap holding (`8 ≤ 8` ✓), the `PAR-JS` range still `PAR-JS-1`…`PAR-JS-18`, the
`HO-` range still `HO-1`…`HO-7`, and no status code minted** (`[A1 docs/decisions.md · the ACTIVE `A88` row of
2026-10-11; A1 docs/specs/storeroom-publish-proposal.md §14 · `A88`(a)(b); A1 docs/specs/storeroom-js/package.md
§3.1` and `§3.2` — the same ruling's clauses at this home's two parts; A3 docs/specs/storeroom-js/contract.md §0.1
item 5 — the `≤ 8` cap | numeric or census claim]`).

**AND THE FOURTH STRUCTURE OF THE SAME SWEEP THAT NEEDS NO CELL, STATED BECAUSE IT IS THE ONE OF THAT
DIRECTORY'S NAMED STRUCTURES THAT IS THIS UNIT'S OWN SURFACE'S NEIGHBOUR:** **`U-9` — the `LISTENERS`
thread-local and `invoke_listeners` in the binding's facade — IS SETTLED IN CODE BY DELETION AND NEEDS NO CELL:
the structures the sweep finds DEAD are GONE from the facade and from the core, the Node-API symbols they alone
used are deleted with them, and what remains is declared where it belongs — this unit's `package.md §4.5` item
5's dated clause and the `DD-48`…`DD-50` rows above** (`archive/reviews/2026-10-11-structural-compliance.md`
`§3` · `F-13` and its `§4` · `U-9`; `bindings/js/src/facade.rs`'s own record). **A `DD` row here would declare a
structure that exists in no byte of the tree** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`;
A3 docs/specs/storeroom-js/package.md §4.5 item 5's dated clause | requirement]`).

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

**⟶ AND THE `P-TP-9` RECONCILIATION, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS (`role_spec_writer`),
CLOSING THE RED SET'S CONTRACT FINDING 6 (`archive/gate3/storeroom-js-red-set.md` §5 item 6).** `RCA-8(d)`
ANNOTATE-BESIDE: **no row of the table above is added, dropped, renumbered or re-ordered; each of the
nineteen rows' own checking-property cell now carries its RECONCILED citation AND the citation as filed
beside it, and THIS clause is the list.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: this table's
*"the property that checks it"* column named **`P-TP-9`** in `19` of its `47` rows, while the register
(`§5.1`–`§5.8`) defines **EIGHT** rows — `P-SR-1` · `P-SR-2` · `P-SR-3` · `P-SR-4` · `P-SR-5` · `P-SR-6` ·
`P-SR-7` · `P-SR-8` — whose cap is `≤ 8`, and `§0.1` item 5 and `§5` FORBID A NINTH. So every one of the
nineteen named a row that resolves to nothing, which the plan's own `IT IS NOT DONE IF` list calls a
citation *"that does not resolve."*** **NO NINTH ROW IS MINTED BY THIS CLAUSE OR BY ANY ROW OF THE TABLE:
the register stays at `8` and `§5.0`'s census is unchanged.**

**THE NINETEEN, EACH WITH THE ROW THAT ACTUALLY CARRIES ITS SUBJECT AND THE CITATION AS FILED BESIDE IT:**

| The row | Its subject, as its own cell carries it | Its citation NOW | The citation AS FILED |
| --- | --- | --- | --- |
| **`DD-4`** | the module resolves and the addon loads through the internal reach | **`P-SR-7`** (`S-LOAD`, `S-ONE-ADDON`) | `P-TP-9` |
| **`DD-12`** | the failure channel's ONE form with exactly two members | **`P-SR-3`** | `P-TP-9` | **⟶ THIS ROW'S SUBJECT IS RE-DERIVED AT ITS OWN CELL, 2026-10-16, ON THE ARCHITECT'S RULING *"Override the failure form limit"* (`role_spec_writer`; `RCA-8(g)`: the row stands BYTE-FOR-BYTE and THIS clause is its mark at itself — a cell may not be listed as read-through and stand unmarked at it): THE ONE FORM IS **THREE** MEMBERS, `{status, message, log}`, and the cells that carry the figure are `DD-12`'s REPAIRED row above and `surface.md §2.5`'s clause of this date. The `P-SR-3` half of this row is UNMOVED — the property is the same property — and its `S-FAILFORM` member set moves to `{log, message, status}`, `§5.3`'s clause of this date** **⟶ AND THE ID THAT CLAUSE NAMES IS RE-SPELLED WITH THE ROW IT NAMES, 2026-10-17 BY THE RE-MINT PASS (`RCA-8(g)`: this mark states the ONE re-spelling, and the mark above is itself read through it): *"the `P-IM-3` half"*, as the 2026-10-16 mark printed it, READS *"the `P-SR-3` half"*, and *"`§5.3`'s clause of this date"* still names `§5.3`, whose `§`-number is UNMOVED — the property, the member set and the clause's date are UNTOUCHED** |
| **`DD-13`** | the failure form's half only — the discrimination half is `A64`'s declared absence | **`P-SR-3`**'s form half only | `P-TP-9`'s form half only |
| **`DD-18`** | the JS layer's runner, its pattern and the LAYER label | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |
| **`DD-19`** | the red set's own run as a figure, with its site and its layer | **`P-SR-1`**; **`P-SR-7`** (`S-LAYER`) | `P-IM-1`; `P-TP-9` |
| **`DD-20`** | the layer label travels with every figure | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |
| **`DD-21`** | no handoff discharged as a patch; one drive per `HO-` row | **`P-SR-7`** (`S-HO`) | `P-TP-9` |
| **`DD-24`** | the one claimed entry, and exactly one `.node` load through it | **`P-SR-7`** (`S-LOAD`, `S-ONE-ADDON`) | `P-TP-9` |
| **`DD-25`** | the published artefact the one claimed entry loads | **`P-SR-7`** (`S-LOAD`) | `P-TP-9` |
| **`DD-30`** | this directory's own state report as a figure with its layer | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |
| **`DD-31`** | the store's green quoted with its site and its layer, never re-labelled | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |
| **`DD-33`** | every figure carries its site and its layer | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |
| **`DD-38`** | the engine floor as a property of the one claimed entry's own boot | **`P-SR-7`** (`S-LOAD`) | `P-TP-9` |
| **`DD-39`** | the round trip under the declared relation, over the returned records' own spellings | **`P-SR-1`** | `P-IM-1`; `P-TP-9` |
| **`DD-40`** | the failure channel's single form and the closed set's reachability | **`P-SR-3`** | `P-TP-9` |
| **`DD-41`** | one drive per `HO-` row | **`P-SR-7`** (`S-HO`) | `P-TP-9` |
| **`DD-42`** | the tagged artefact the one claimed entry loads | **`P-SR-7`** (`S-LOAD`) | `P-TP-9` |
| **`DD-43`** | the licence travelling with the artefact the one claimed entry loads | **`P-SR-7`** (`S-LOAD`) | `P-TP-9` |
| **`DD-47`** | the census as a figure with its site and its layer | **`P-SR-7`** (`S-LAYER`) | `P-TP-9` |

**AND THE RECONCILIATION'S OWN ARITHMETIC, PRINTED WITH ITS TERMS SO THE COUNT IS CHECKED AND NOT TRUSTED:
`19` citations reconciled — `14` rows to **`P-SR-7`** (`DD-4` · `DD-18` · `DD-19` · `DD-20` · `DD-21` ·
`DD-24` · `DD-25` · `DD-30` · `DD-31` · `DD-33` · `DD-38` · `DD-41` · `DD-42` · `DD-43`) · `3` rows to
**`P-SR-3`** (`DD-12` · `DD-13` · `DD-40`) · `2` rows to **`P-SR-1`** (`DD-39`, and the `P-SR-1` half of
`DD-19`) — so `14 + 3 + 2 = 19` ✓, **where `DD-19`'s `P-SR-7` half is the SECOND citation of its own cell
and is counted inside the `14`** (`DD-19` therefore carries TWO citations and ONE row of the nineteen).
**NO CITATION OF THE TABLE ABOVE NOW POINTS AT A `P-TP-9` ROW, and no row of the register moved** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions — the per-unit `≤ 8` cap and the
no-second-register rule; `§5.0`'s dual-mapping disclosure, read as the rule that a `P-*` citation names the
ROW | numeric or census claim]`).

**⟶ AND THE `P-` HALF OF THIS TABLE'S CITATIONS IS RE-SPELLED WITH ITS ROWS, 2026-10-17 BY THE RE-MINT PASS (`DEF-2026-10-16-S`; `RCA-8(g)`: the table above stands BYTE-FOR-BYTE and is read THROUGH this clause, which re-spells its `NOW` column and its arithmetic and re-emits nothing else).** **THE RE-SPELLINGS, ONE BY ONE, THE `AS FILED` COLUMN STANDING AS THE HISTORY IT IS:** the `14` `P-TP-7` citations read **`P-SR-7`** (`DD-4` · `DD-18` · `DD-19` · `DD-20` · `DD-21` · `DD-24` · `DD-25` · `DD-30` · `DD-31` · `DD-33` · `DD-38` · `DD-41` · `DD-42` · `DD-43`) · the `3` `P-IM-3` citations read **`P-SR-3`** (`DD-12` · `DD-13` · `DD-40`) · the `2` `P-IM-1` citations read **`P-SR-1`** (`DD-39`, and the `P-SR-1` half of `DD-19`) — so the arithmetic is `14 + 3 + 2 = 19` ✓ **TWO WAYS: the COUNT does not move and the SUM does not move, because a re-mint renames the cited ids and adds no citation.** **AND THE `AS FILED` COLUMN KEEPS ITS OWN SPELLINGS UNCHANGED, because it names the citations as they were filed on 2026-10-11 and those readings are true of that date** (`DEF-2026-10-16-S`; this document's `DD-3` row as re-derived; `§5.0`'s census, whose `8 ≤ 8` is unmoved).

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

**⟶ AMENDED 2026-10-21 BY `A140`: THE PARAGRAPH ABOVE'S *"no JSON-text carrier"* IS READ AS *"no JSON-text carrier ON THE STORE'S SURFACE"*.** **The binding MAY use a JSON-text step internally over the walk's own sanitized clone; the walk, not the text, decides every class. The store's surface is unmoved, and the native clarification at `docs/specs/storeroom-native/contract.md §7.2` item 7(c) says so** (`A140`).

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
**⟶ AMENDED 2026-10-21 BY `A140`: ROW 3'S *"both `0` and `-0` in memory"* IS READ AS *"both `0` and `-0` are admitted, and `-0` crosses as `0`"*.** **The binding's conversion core normalizes `-0.0` to `0.0` in both directions; the store's native `mem`/`temp` behavior is unmoved** (`A140`).
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 4 (`archive/gate3/storeroom-js-red-set.md` §5 item 4) AT THIS SECTION.** `RCA-8(d)` ANNOTATE-BESIDE:
**the paragraph above and every table above stand byte-for-byte; THIS clause is the ONE rule they are read
through, and it is a PURE INSERTION.** **THE DEFECT IT CLOSES: `JournalLengthArg` rows 2/9, `ListenersArg`
row 5, `FilePathArg` rows 2/3 and `TierArg` rows 3/4 each print TWO rows with TWO DIFFERENT answers for
ABSENT against `null`/`undefined`, and NO clause said how a JS call distinguishes them — while JS
`undefined` is TWO states and not one: an ABSENT key, and a key PRESENT carrying `undefined`.**

**THE ABSENT-VERSUS-`undefined` RULE, DECLARED ONCE AND CITED BY THE FOUR ROWS ABOVE.** **1. A VERB'S
TRAILING ARGUMENT IS READ BY CALL ARITY: a position the call supplied no value for IS ABSENT, and a position
the caller spelled `undefined` at folds to THE SAME STATE, because the language makes no distinction a
callee can observe.** **2. A `cfg` KEY IS READ BY `in`-MEMBERSHIP: an ABSENT key and a key PRESENT carrying
`undefined` are TWO states, and their declared answers differ — for `journalLength`, `ConstructionArgumentMissing` against
`AddressMalformed`, told apart by the ANSWER, because both reach the carrier as the same JS value; for
`filePath`, the ABSENT arm is IN DOMAIN (`mem`) against `AddressMalformed`; for `listeners`, the two states
are both `AddressMalformed` and still TWO states of the carrier.** **3. THE RULE DECLARES NO JS-SIDE
PRE-CHECK AND NO ARITY CHECK: the package passes every position and every key through as supplied
(`DD-46`), and the distinction is read by the CARRIER's own conversion, which answers the store's own code.**
**AND IT DOES NOT TOUCH THE WALK'S OWN `undefined` RULE: inside a value, an `{a: undefined}` member is
`§1.4` item 3's refusal and the key is never dropped.** **The four governed rows, named so each is read
through this rule rather than re-derived: `JournalLengthArg` rows 2 and 9 · `ListenersArg` row 5 ·
`FilePathArg` rows 2 and 3 · `TierArg` rows 3 and 4.** **This section's tables are CARRIED WHOLE at
`docs/specs/storeroom-js/crossing.md §1.3`, where the same rule stands with its own clauses and its own
citations** (`archive/gate3/storeroom-js-red-set.md` §5 item 4)
(`[A3 docs/specs/storeroom-js/crossing.md §1.3 — the rule, relocated WHOLE; A3
docs/specs/storeroom-native/contract.md §3.1.1 — the arity table's own `null`/`undefined` column;
`DD-46` | declared parameter semantics]`).

**⟶ ADDED 2026-10-27 — THE CONSUMER'S ROW `STOREROOM-FILE-PROBE-FALSE-PASS` IS RE-MEASURED AT THE SHIPPED TREE, AND THE CONSTRUCTION REFUSES AN UNWRITABLE PARENT WITH `FilePathUnreachable`, LEAVING NO FILE BEHIND.** `RCA-8(d)` ANNOTATE-BESIDE: **every table and every clause above stands BYTE-FOR-BYTE and is read THROUGH this one; THIS clause is a PURE INSERTION beside them and mints no row, moves no cell of either table, strikes no rule and re-decides no ruling.** **`D-41`'s closing line names the two `STOREROOM-*` rows the adjacent consumer filed and records that both were read and never re-measured; this is the second of the two, and its subject is `FilePathArg` rows 4–6 read with the construction's promise that a failing construction *"leaves nothing behind."*** **THE INSTRUMENT, NAMED SO THE READING IS FALSIFIABLE: the checkout's own build (`npm run build`, which builds the crate and stages the artefact), then the installed battery's own staging and packing — the main package's stage with the release's `LICENSE` copy, the host platform package's stage with the built `.node`, `npm pack` of both, `npm install <main tarball> --offline` and `npm install <platform tarball> --no-save` in a clean temporary directory whose ancestry names no repository — then `storeCreate` FROM THE INSTALLED ENTRY in one real Node process.** **THE READING, ONE LINE PER ARM (host `linux`/`x64`, uid `1000`, date 2026-10-27):**
- **THE ROW'S SUBJECT — a `filePath` whose PARENT the process cannot write (mode `0555`): `storeCreate` threw `FilePathUnreachable`, returned NO INSTANCE, and LEFT NO FILE BEHIND — the parent directory held ZERO entries after the call.**
- **CONTROL (a) — an absent parent: `FilePathUnreachable`, no instance, no file.**
- **CONTROL (b) — a path that IS a directory: `FilePathUnreachable`, no instance, and no file created at or beside it.**
- **CONTROL (c) — a writable parent with an absent file: the construction SUCCEEDED and returned an instance; the store's own exclusive create left the file AT THE PATH, ZERO-LENGTH (an empty file and no byte), and a `mem`-tier `write` on that instance answered `op-1`.**
**SO THE PROBE IS NO LONGER A FALSE PASS: the parent's write access is decided by the construction's own act — step 4b's `create_new`, whose `EACCES` is the refusal — and not by a mode-bit predicate that a `0555` parent passes** (the two arms and the withdrawal of the mode-bit instrument are declared at `docs/specs/storeroom-native/contract.md §10.4` part 1 and `§7.1` step 3's clauses; `DD-45`'s amended clause). **AND ONE READING A CONSUMER COMPARING AGAINST AN OLDER TREE SHOULD EXPECT TO HAVE MOVED: control (c) leaves a ZERO-LENGTH FILE at the path, because the construction now creates its own file exclusively as the last act of its argument validation** (`§7.1` step 4b; `§10.4` parts 2–3; `DD-28`'s amended cell's *"an EMPTY FILE AND NO BYTE"*) — **the `0.1.2`-era reading *"a writable parent with an absent file constructs and creates nothing"* is that tree's, and the current construction's own declared act is the empty file.** **NO STATUS IS MINTED, NO MEMBER MOVES AND NO CELL OF THIS UNIT'S SUITE IS REACHED BY THIS CLAUSE: it RECORDS the re-measurement `D-41` owed, at the tree it was owed on** (`docs/specs/storeroom-native/contract.md §7.1` steps 3–4b and `§8.1` #13; `docs/specs/storeroom-js/contract.md §2.8`; the consumer's row `STOREROOM-FILE-PROBE-FALSE-PASS` at `archive/pre-strata-docs-2026-10-24/docs/handoffs/2026-10-12-consumer-verification-of-storeroom-0.1.2.md` §3 and §5 item 5 | state or fail-state declaration).

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

   **⟶ AND THE ARM THIS CEILING ROW'S PROPERTY IS ABOUT, DECLARED 2026-10-11 BY THE BOUNDED DECLARATION PASS
   (`role_spec_writer`), CLOSING GATE 4'S `JS-8`.** `RCA-8(d)` ANNOTATE-BESIDE: **the item above stands
   byte-for-byte and its two figures and its answer do not move; THIS clause is a PURE INSERTION, it adds no
   row, and it declares WHICH SIDE'S WALK answers — because gate 4 found the ceiling measured at the ADDON and
   the clause placed at the package's own walk, one class later**
   (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-8`). **THE ARM IS THE PACKAGE'S OWN WALK'S: the
   depth-`64` / node-`1,000,000` refusal is PRODUCED at the package's boundary — before any verb is called and
   before any addon call is reached — so an ADDON-SIDE refusal of the same value one class later does NOT
   satisfy the property, and a STORE-SIDE bound is not an arm of this row at all.** **THE BOUNDARY IT
   ASSERTS: the package's own walk admits depth `64` and refuses `65`, and admits `1,000,000` visited nodes
   and refuses `1,000,001`** — **and the crossing part's own dated clause at
   `docs/specs/storeroom-js/crossing.md §1.4` item 5 carries the same declaration with gate 4's `NG-JS-D`
   corpus beside it** (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the refusal belongs where the
   walk is, which is the package's own edge | state or fail-state declaration]`).

   **⟶ AND THE ARM AND THE CLASS AT THE BOUND, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS
   (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT FINDING `CF-6` AT THIS HOME, SO THE TWO HOMES OF
   THIS ITEM AGREE.** `RCA-8(d)` ANNOTATE-BESIDE: **the arm clause above stands byte-for-byte — its *"before
   any addon call is reached"* and its *"an ADDON-SIDE refusal of the same value one class later does NOT
   satisfy the property"* included — and it is read THROUGH this clause; THIS clause is a PURE INSERTION and
   it re-decides no rule.** **THE OPERATIVE ASSIGNMENT, STATED SHORT AT THIS HOME AND CARRIED IN FULL AT
   `docs/specs/storeroom-js/crossing.md §1.4` item 5's dated clause, which is the same declaration's own
   home with gate 4's `NG-JS-D` corpus beside it: THE ARM THAT ASSERTS THE PROPERTY IS THE CONVERSION CORE'S
   OWN BOUND, which is *"the package's own walk's"* in the operative sense** — it is the sibling crate's own
   PURE-RUST module (`package.md §4.5` item 1) — **so the ENCODER admits depth `65` and the CORE refuses it,
   the ENCODER refuses depth `66` and beyond by carrying the value as the store's own outside class
   `Cyclic`, and BOTH arms answer `ValueNotAdmitted`; while *"before any addon call is reached"* is read as
   *"before any VERB is called"*, which holds at BOTH arms because neither reaches a store verb.** **THE
   OBSERVABLE IS THEREFORE `63`/`64` ADMITTED AND `65`/`66` REFUSED `ValueNotAdmitted`; a drive that measures
   the BOUNDARY's own frame for the `65` case, or any depth against a STORE-SIDE bound, measures an arm this
   build does not have — and the `alt` this assignment prices (a *"depth"* class of the encoder's own, and
   the encoder's bound withdrawn) stands at that fuller home and is NOT restated here.** **AND NO FIGURE OF
   THIS ITEM MOVES: `64` and `1,000,000` stand as the declared bounds, and `65` and `1,000,001` as the first
   refused figures** (`[A3 docs/specs/storeroom-js/crossing.md §1.4` item 5's dated clause — the same
   declaration's fuller home; A3 docs/specs/storeroom-js/package.md §4.5 item 1 — the core's own module and
   its purity; A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the class decided first and the code from
   the class; `DD-10` | state or fail-state declaration]`).

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
**⟶ AMENDED 2026-10-21 BY `A140`: CLAUSE 3'S `-0` HALF IS READ THROUGH THE BINDING NORMALIZATION.** **`Object.is` remains the relation, but a binding `-0` write reads back `0`, so the mem-tier `-0` round trip is `0`. The store's own `mem`/`temp` sign rule is not amended; the package boundary normalizes it** (`A140`).
**AND THE TWO THINGS THIS RELATION DOES NOT DO, STATED SO IT IS NOT OVER-READ:** **a caller comparing two
objects with `===` is comparing REFERENCES and not values** — the relation above is the only value
comparison this unit declares; and **the relation is a property of the PACKAGE's own helper and of this
unit's acceptance layer, NEVER of the store**, whose own equality already ignores member order
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — *"an object's key order counted as significant"*
FAILS the row — **READ AS THE STORE UNIT'S OWN `P-IM-1`, WHICH THIS CROSS-DOCUMENT CITATION SPELLS WITH ITS PATH AND WITH THAT UNIT'S `§`, AND WHICH IS NOT AN ID OF THIS UNIT'S REGISTER: the re-mint of 2026-10-17 renamed THIS unit's eight ids and reached NO id of `docs/specs/storeroom-native/`** | cross-reference]`).

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

**⟶ AND THE `A122`/`A123` PASS'S OWN CARRIAGE NOTE, LANDED 2026-10-16 (`role_spec_writer`), SO THE TWO HOMES OF
THIS SECTION AGREE AND THE CARRIAGE DEBT IS NAMED RATHER THAN LEFT TO A READER.** `RCA-8(d)` ANNOTATE-BESIDE:
**every byte of `§2.1`–§2.11 below stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause adds no
rule of its own and re-decides none.** **THREE THINGS ARE RECORDED HERE AND NOWHERE ELSE OF THIS DOCUMENT:**
1. **`docs/specs/storeroom-js/surface.md §2.12` IS AUTHORED IN THE PART — by this pass, on `A122` · `A123` ·
   `A124` · `A125` — AND IS OWED ITS CARRIAGE INTO THIS DOCUMENT AS A CLAUSE OF THIS SECTION, together with
   `§2.6`'s pointer below and `§2.9` item 1's re-spelled count. Until that carriage lands, `surface.md §2.12`
   is the ONE HOME of the write path's law and every citation to it names that path and that `§`**
   (`surface.md §2.12`'s own end-of-part note carries the same debt from the other side;
   `docs/specs/storeroom-js/implementation-plan.md §7`'s clause of this date names the amendment).
2. **`§2.6` ABOVE IS SUPERSEDED FOR THE WRITE PATH AND ITS BYTES HAVE MOVED OUT BYTE-EXACTLY to
   `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1`; `§2.6` carries the one-line pointer
   and this document re-emits no byte of it** (`RCA-8(g)`: **move out, leave a one-line pointer, never retain
   beside**).
3. **THE THREE FIGURES THIS SECTION'S OWN ITEMS PRINTED BEFORE THIS PASS — the module namespace's `8`, the
   instance's four-member set and the `PAR-JS` set's `21` — are read through the index region's dated clause
   of this date and through `surface.md §2.9` item 1 and `§2.4` item 9 (f), which are their operative
   statements: `9` verbs, FIVE own members and `23` rows** **⟶ AND ALL THREE OF THESE FIGURES CARRY NO OPERATIVE LABEL FROM 2026-10-16: they are this item's own reading, and the operative figures of this `§2` region are the THREE the re-derivation clause BELOW this list names — ONE namespace name, `storeCreate` ALONE (`11 → 1` ✓), TWELVE own members (`10 + 1 + 1 = 12` ✓) and the `PAR-JS-1`…`PAR-JS-25` range (`23 + 2 = 25` ✓) — whose SEARCHED SETS are printed at this document's `§6` clause of this date and whose ONE count home is `parameter-semantics.md §1`'s count-correction clause of that date** (`[A2 docs/decisions.md` · `A122` · `A123`, 2026-10-16;
   A3 docs/specs/storeroom-js/surface.md §2.12 and §2.9 item 1; A3
   docs/specs/storeroom-js/parameter-semantics.md §1 | cross-reference]`).

**⟶ RE-DERIVED 2026-10-16 — THE RECEIVER RULING RE-SPELLS THE PRODUCT, THE NAMESPACE AND THE PARAMETER SET, AND THIS CLAUSE IS THE INDEX REGION'S OWN STATEMENT OF THE THREE FIGURES (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`, read with `A128`).** **THE THREE OPERATIVE FIGURES, EACH WITH ITS HOME AND ITS ARITHMETIC:**
1. **THE MODULE NAMESPACE IS **ONE** NAME — `storeCreate` ALONE — and `A127`'s arithmetic is `11 → 1` ✓, the `11` being the superseded count whose terms were `8 + 3`. THE TEN NAMES THAT LEAVE IT — `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` · `constraintOff` — BECOME METHODS, AND THEIR REMOVAL FROM THE NAMESPACE IS DECLARED WITH ITS GROUND AT `surface.md §2.9`'s removal-versus-deprecation clause of this date: TEN PUBLISHED NAMES, NO DEPRECATION WINDOW, on `A128`'s fiat.** **THIS DOCUMENT'S OWN `§2.1` ITEM 1 ABOVE NAMES THE EIGHT-VERB ENUMERATION, WHICH IS SUPERSEDED AND IS READ THROUGH `surface.md §2.9` ITEM 1's `A127` CLAUSE.**
2. **THE PRODUCT'S DECLARED MEMBER SET IS **TWELVE** OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — the TEN methods, `register` and `settle` — declared at `surface.md §2.4` item 9 (f)'s `A127` clause of this date, WHERE EVERY METHOD'S ARITY, ITS POSITIONS, ITS ANSWER AND ITS REFUSAL ARE STATED IN ONE TABLE. THE SUPERSEDED FIGURES ARE THE `A123` PASS'S FIVE AND THE `A126` PASS'S SEVEN.** **AND `storeCreate` IS NOT A MEMBER OF ITS OWN PRODUCT, and `settle` is the one internal member the kernel's two instants reach** (`A122`'s seam, unchanged). **⟶ AND THIS ITEM'S `TWELVE` IS SUPERSEDED AND IS READ THROUGH THE CLAUSE BELOW OF THIS SAME REGION, 2026-10-17: the operative figure is THIRTEEN own members, `10 + 1 + 1 + 1 = 13` ✓, whose thirteen names, whose thirteenth member's arity `0` and returned pair list, and whose two exclusions stand at `surface.md §2.4` item 9 (f)'s `constraints` clause of that date** (`role_spec_writer`; `RCA-8(g)`: the item stands BYTE-FOR-BYTE above and THIS clause is its mark at itself; the architect's ruling of 2026-10-17, *"Add surface methods for reading registered constraints."*).
3. **THE `PAR-JS` SET IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓ — whose ONE home is `parameter-semantics.md §1`'s clause of this date; `A127` moves NO row, NO id and NO `§`-home, and it re-derives ONE row IN PLACE to a `VACATED` row: `PAR-JS-23`, the `instance` position, which no call of this surface carries from this date.** **`PAR-JS-26` IS NOT A ROW: no heading and no index row of `parameter-semantics.md` carries that id, and a citation to it as a row is a citation to a superseded count's spelling** (`parameter-semantics.md §2.23`'s clause of this date and its item `7`). **⟶ AND BOTH HALVES OF THIS ITEM ARE SUPERSEDED AND ARE READ THROUGH THE CLAUSE BELOW OF THIS SAME REGION, 2026-10-17: the operative range is `PAR-JS-1`…`PAR-JS-27`, `23 + 4 = 27` ✓, and *"`PAR-JS-26` IS NOT A ROW"* IS FALSE FROM 2026-10-16 — the message route authored `PAR-JS-26` (`log`) at `§2.26`, and `PAR-JS-27` (the pair list `a.constraints()` returns) was authored 2026-10-17 at `§2.27`** (`role_spec_writer`; `RCA-8(g)`: the item stands BYTE-FOR-BYTE above and THIS clause is its mark at itself).
**AND THE CARRIAGE DEBT THIS CLAUSE DOES NOT DISCHARGE, NAMED SO IT IS NOT READ AS DISCHARGED: `surface.md §2.12`'s re-derived items 2 and 4 are AUTHORED IN THE PART and remain OWED their carriage into this document as clauses of its `§2`, together with `§2.1`'s and `§2.9` item 1's re-spelled count clauses** (`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A122`; A3 docs/specs/storeroom-js/surface.md §2.1, §2.4 item 9 (f), §2.9 item 1 and its removal clause, and §2.12 items 2–4, each of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date | numeric or census claim]`).

**⟶ AND THE THREE FIGURES ARE RE-DERIVED ONCE MORE AT THIS CLAUSE, 2026-10-17, BECAUSE THE ARCHITECT RULED A THIRTEENTH MEMBER AND A TWENTY-SEVENTH PARAMETER ROW (`role_spec_writer`; the architect's ruling, verbatim: *"Add surface methods for reading registered constraints."*).** `RCA-8(g)`: **the three items above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause re-derives item `2`'s figure and item `3`'s figure and leaves item `1`'s namespace figure UNMOVED.**
1. **ITEM `2`'s FIGURE MOVES `12 → 13`: THE PRODUCT'S DECLARED MEMBER SET IS THIRTEEN OWN MEMBERS, `10 + 1 + 1 + 1 = 13` ✓ — the TEN methods, `register`, `settle` and `constraints` — declared at `surface.md §2.4` item 9 (f)'s `constraints` clause of this date, whose `constraints()` row carries its arity `0`, its returned pair list, its undeclared order, its disabled-pair rule and its two exclusions.** **THE THIRTEENTH IS NOT ONE OF THE TEN, IS NOT `storeCreate` AND IS NOT A KERNEL ITEM: `storeCreate` remains NOT a member of its own product and `settle` remains the one internal member the kernel's two instants reach** (`A122`'s seam, unchanged). **AND THE SUPERSEDED FIGURES ARE NOW THE `A123` PASS'S FIVE, THE `A126` PASS'S SEVEN AND THE `A127` PASS'S TWELVE, each read THROUGH this clause.**
2. **ITEM `3`'s FIGURE MOVES `25 → 27`: THE `PAR-JS` SET IS `PAR-JS-1`…`PAR-JS-27` — `27` ROWS, `23 + 4 = 27` ✓ — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of this date, and whose NEW rows over the `A127` range are `PAR-JS-26` (`log`, the third member of the thrown failure form, at `§2.26`) and `PAR-JS-27` (the pair list `a.constraints()` returns, at `§2.27`).** **BOTH ARE AUTHORED WITH THEIR HOMES IN THEIR OWN PASSES AND NEITHER IS A COUNTERFACTUAL: item `3`'s sentence *"`PAR-JS-26` IS NOT A ROW"* is FALSE FROM 2026-10-16, when the message route authored it, and is READ THROUGH that row — a superseded count's spelling is no longer what the id names, because the id now names a row** (`parameter-semantics.md §2.26` and `§2.27`).
**⟶ AND ITEM `1`'s FIGURE MOVES ONCE MORE AT THIS CLAUSE, `13 → 12`, 2026-10-18, ON THE ARCHITECT'S RULING THAT `settle` IS REDUNDANT (`role_spec_writer`; `RCA-8(g)` — item `1` above and the clause above it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION and it re-derives no other item).** **THE PRODUCT'S DECLARED MEMBER SET IS TWELVE OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — the TEN methods, `register` and `constraints` — whose operative statement is `surface.md §2.4` item 9 (f)'s clause of this date, AND `settle` IS NOT ONE OF THEM: item `1` above's *"`settle` remains the one internal member the kernel's two instants reach"* is the 2026-10-17 reading and carries no operative label from this date, because there are no two instants left for a member of this product to reach — the kernel drives every write and its terminal arm is the delivery's one act** (`surface.md §2.7`'s clause of 2026-10-18, item `2`; `surface.md §2.12` item 1's clause of the same date; `parameter-semantics.md §2.19`'s clause of the same date — the seam's row, which states the member's removal at its own head). **THE ARCHITECT'S THREE RULINGS, VERBATIM AND DATED 2026-10-18: *"Settle is redundant because the kernel is always in the loop."* · *"Always route to the kernel, because the JS code does not decide whether constraints trigger."* · *"The kernel is always supposed to be in the middle. Any occasion where the write path is not governed by the kernel is a hallucination."*** **AND THE SUPERSEDED FIGURES ARE NOW FOUR — THE `A123` PASS'S FIVE, THE `A126` PASS'S SEVEN, THE `A127` PASS'S TWELVE AND THE 2026-10-17 CLAUSE'S THIRTEEN — each read THROUGH this clause; NO OTHER ITEM OF THIS CLAUSE MOVES, and item `2`'s `PAR-JS-1`…`PAR-JS-27`, `23 + 4 = 27` ✓, STANDS WHOLE because a row's ID is not withdrawn by removing its member from the product's surface** (`parameter-semantics.md §2.19`'s clause of this date, whose head states exactly that disposition).
3. **AND ITEM `1`'S NAMESPACE FIGURE DOES NOT MOVE: `11 → 1` ✓, `storeCreate` ALONE, UNMOVED — the read's route REFUSED a module-namespace function by name precisely so this figure would not move** (`surface.md §2.4` item 9 (f)'s `constraints` clause, item 1, and item `9` of that clause; `surface.md §2.9` item 1's `A127` clause).
4. **AND THE CITATION RE-SPELLINGS THIS RE-DERIVATION OWES, ENUMERATED AS A REQUIREMENT LIST, ONE LINE PER SITE, OLD FORM → NEW FORM, EACH CHECKED OFF AT ITS OWN BYTES AND NEVER INFERRED FROM A BYTE DIFF** (`docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v)`): **`12` → `13` at this document's `§2.4` item 9 (f) `TWELVE`-member sentences** ✓ (read through the `surface.md` clause of this date, which is the ONE home); **`PAR-JS-1`…`PAR-JS-25` → `PAR-JS-1`…`PAR-JS-27`** ✓ at this document's index region, `§6` region and `§7` census rows, read through `parameter-semantics.md §1`'s count-correction clause of this date; **`PAR-JS-26` → UNMOVED AS AN ID, its row REAL** ✓ (`§2.26`, authored 2026-10-16); **`the module namespace's ONE name` → UNMOVED** ✓ (no re-spelling owed); **and NO OTHER CITATION OF THIS DOCUMENT MOVES — the set is four lines and the fourth is a negative.**

**AND THE CITATION RE-SPELLINGS THIS RE-DERIVATION OWES ARE ENUMERATED HERE AS A REQUIREMENT LIST, ONE LINE PER SITE, OLD FORM → NEW FORM, AND EACH IS CHECKED OFF RATHER THAN LEFT TO A BYTE DIFF (`docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v)`):**
1. **`PAR-JS-1`…`PAR-JS-26` → `PAR-JS-1`…`PAR-JS-25`** ✓, at every site of THIS DOCUMENT that prints the range — the index region's id-family line, this clause, `§6`'s parameter-semantics index and `§7`'s census rows. **THE RE-SPELLING'S GROUND IS THE COUNT-CORRECTION PASS'S OWN CLAUSE OF 2026-10-16, not this pass's** (`parameter-semantics.md §1`'s clause of that date, whose single home the range is). **⟶ AND THIS ITEM'S TARGET RANGE IS RE-DERIVED ONCE MORE, 2026-10-17: the operative range is `PAR-JS-1`…`PAR-JS-27`, `23 + 4 = 27` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date — so the re-spelling this item performs is to `…27` from this date, the `25` stage standing as the 2026-10-16 reading it was** ✓.
2. **`§2.9` item 1's `8 + 3 = 11` → `11 → 1`** ✓ — the operative namespace clause is `surface.md §2.9` item 1's `A127` clause.
3. **`§2.4` item 9 (f)'s `4 + 3 = 7` → `10 + 1 + 1 = 12`** ✓ — the operative member-set clause is that item's `A127` clause. **⟶ AND THIS ITEM'S TARGET FIGURE MOVES ONCE MORE, 2026-10-17: the re-spelling a later bounded amendment owes at every `TWELVE`-member cell of this document is to THIRTEEN own members, `10 + 1 + 1 + 1 = 13` ✓, read through `surface.md §2.4` item 9 (f)'s `constraints` clause of that date — so the `12` this item reaches is the 2026-10-16 reading and the `13` is operative** ✓.
4. **the retired `RCA-8(d)` ANNOTATE-BESIDE spelling → `RCA-8(g)`** ✓ at every site THIS PASS authors; **the spelling is RETIRED and a citation to it is a finding** (`docs/defects.md` · `DEF-2026-10-16-O`).
**AND ONE RE-SPELLING THAT IS NOT OWED, NAMED SO NO PASS PERFORMS IT: `PAR-JS-23`'s id and its `§`-home `§2.23` are UNMOVED, and the row is re-derived IN PLACE — so a citation to `PAR-JS-23` needs no change at any site** (`[A2 docs/decisions.md` · `A127` · `A126`; A3 docs/specs/storeroom-js/parameter-semantics.md §1's and §2.23's clauses of this date | cross-reference]`).

### §2.1 The construction call

**`storeCreate(cfg)` crosses as ONE JS function taking ONE plain object.** **`cfg` carries the store's FOUR
declared keys — `filePath` · `journalLength` · `listeners` · `constraints` — and the package passes each through WITHOUT
adding a default, a rename or a FIFTH key** (`DD-36`; RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS on `docs/specs/storeroom-js/surface.md §2.1`'s dated clause: the `THREE` · *"a fourth key the package injects"* and the three-key list this clause printed are its pre-`RCA-9` reading, and the added `constraints` key's own validation instants are declared at `§2.1` and `P-TP-6`). **A returned value is the package's own instance
handle** — an opaque JS object whose identity the package owns (**`ListenerHandle` is NOT this handle: this
is the PACKAGE's wrapper around the store's instance, and no clause of this directory exposes any member of
it**). **Every outside form of `cfg` and of its four keys (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS — the `three` this clause printed is the count before the `constraints` key; the `cfg` key set is `filePath` · `journalLength` · `listeners` · `constraints`, and the clause's own rule is UNMOVED) answers the store's own code and returns no
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) BY RECONCILING THIS SECTION'S NON-EXPOSURE
SENTENCE.** `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and is read THROUGH this
clause; it is not reworded and not withdrawn.** **WHAT IT MEANS, STATED SO IT IS NOT READ WIDER THAN IT IS:
the non-exposure it declares is THE STORE'S — the store's instance, its home, its anchors, its `NodeRef`,
its resolver and its internal tooling are exposed through NO member of the package's handle — and it is
NEVER a claim that the PACKAGE'S OWN instance handle is memberless.** **The PACKAGE's REGISTRY is the
PACKAGE'S OWN SURFACE and is not the store's, so the one member that surface declares stands: the handle
`storeCreate` returns has EXACTLY ONE member, `register(handle, listener)`, declared at `§2.4` item 5, and
NOTHING ELSE.** **A reader must not read the sentence above as forbidding a member of the PACKAGE's own
wrapper; and no reader may read this clause as exposing one byte of the store's internals, because it
exposes none** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-15`; A1
docs/specs/storeroom-js-proposal.md §11 · `A63` · `A65` — no store internal crosses in either direction |
prohibition]`).

### §2.2 The address verbs — `read` · `readLiteral` · `write` · `delete`

```
a.read(address, tier?)        -> JS value          // the assembled value, a leaf's literal, or the whole register
a.readLiteral(address, tier?)  -> JS value          // the SAME read, narrowed: the target must be a leaf
a.write(address, tier, value, commit?) -> { op, watched, triggered }
a.delete(address, tier?)       -> { address, tiers, triggered }
a.rollback(opId)               -> { opId, undoneOps, restoredTo }
```

**⟶ `RCA-8(g)` RE-SPELLED AND MOVED OUT 2026-10-16 — THE `instance` FIRST POSITION IS DROPPED AND THE RECEIVER IS THE STORE.** **THE AS-FILED BLOCK ABOVE — the five lines `read(instance, address, tier?)` · `readLiteral(instance, address, tier?)` · `write(instance, address, tier, value)` · `delete(instance, address, tier?)` · `rollback(instance, opId)`, each with an `instance` FIRST POSITION — HAS LEFT THIS FILE and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §19`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **The `a` of each line above is the object `storeCreate(cfg)` returned — THE RECEIVER, and not a position — and the operative declarations are `§2.1` (e) item 3, `§2.4` item 3 and `§2.4` item 9 (f)'s clause of this date** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).
**EVERY ONE OF THE FIVE IS SYNCHRONOUS AND RETURNS A FRESH JS VALUE** (`§1.1`'s deep copy out). **THE PACKAGE
PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN** (`DD-46`): **a missing, an extra or a
wrong-shaped argument reaches the store's own carrier value and answers the store's own code.** **⟶ AND THIS SENTENCE IS MARKED AT THIS DATE, 2026-10-16, AS READ THROUGH THE OPERATIVE ARITY CLAUSE (`RCA-8(g)`: the sentence stands BYTE-FOR-BYTE and is read THROUGH this clause): the ONE arity reading this surface declares is the one `surface.md §2.2` clause 4 lands at `write`'s FIFTH position, so a drive derives its arity cells from that clause at that position and from this sentence at every other position of every verb** (`surface.md §2.2` clauses 3–4; `surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.20`'s arity clause; `DD-46`). **`read`'s
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE FIRST OF THE TWO
REMAINING RED-SET FAILURES: THE INHERITED MINT RULE AT AN ALREADY-REGISTERED ADDRESS.** `RCA-8(d)`
ANNOTATE-BESIDE: **items 1–5 above stand byte-for-byte and are read THROUGH this clause; nothing is
withdrawn and nothing is reworded — THIS clause is a PURE INSERTION, and it is the rule `§2.4` rule 4 and
`DD-15` are henceforth read with.**

**6. A REPEAT `listen` AT AN ALREADY-REGISTERED ADDRESS MINTS NOTHING AND RETURNS THE ENTRY'S OWN HANDLE.**
   **The rule is the STORE'S and it is INHERITED here, not declared:** **`listen(address)` where the address
   is NOT in the home mints a fresh store-unique token; `listen(address)` where the address IS ALREADY
   REGISTERED returns the EXISTING entry's handle and adds NO second entry** — **so a repeated `listen` at
   one address leaves the home UNCHANGED and a later trigger fires that ONE handle, ONCE.**
   **THE ONE HOME ENTRY PER ADDRESS (`A45`) AND THE ADDRESS-LEVEL IDEMPOTENCE (`write-and-read.md §6.5`
   item 2, carried to the listener surface by item 12 (c)) ARE THE OPERATIVE TERMS, and this unit's own
   `A69`-derived reading is narrowed accordingly: `A69`'s PER-PROCESS UNIQUENESS IS A RULE ABOUT THE TOKENS
   THE STORE **MINTS** — **no OTHER token the store mints, in this instance, in any other instance of this
   process, or at any later moment of this process, is equal to a minted one — and it is NEVER a promise
   that a CALL mints a fresh token.** **A repeat `listen` at a registered address mints no token at all, so
   there is no second token for `A69`'s uniqueness to speak about.**
   (`[A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) — *"a `listen(address)` whose address
   IS already registered returns the EXISTING entry's handle rather than minting a second one"*;
   docs/specs/storeroom-native/write-and-read.md §6.5 item 2 — the address-level idempotence;
   docs/specs/storeroom-native/contract.md §0.4 clause 2 — one home entry per address (`A45`);
   A1 docs/specs/storeroom-js-proposal.md §13 · A69 — the uniqueness domain as a MINT rule |
   state or fail-state declaration]`).

   **AND THE ONE CONSEQUENCE THIS RULE HAS ON `§2.4` RULE 4 AND ON `DD-15`, STATED SO THE TWO ARE READ
   THROUGH IT RATHER THAN RE-DECIDED:** **`§2.4` rule 4's closing sentence *"a later re-`listen` at the same
   address mints a DIFFERENT handle, whose registration is a NEW registry entry"* and `DD-15`'s own *"a later
   re-`listen` at the same address mints a DIFFERENT handle"* are TRUE OF EXACTLY ONE CASE, AND THIS CLAUSE
   NAMES IT: a re-`listen` whose address the WITHDRAWAL HAS REMOVED**, because `unlisten` drops ONE
   store-side home entry, so the address is no longer in the home and the next `listen` at it mints a FRESH
   token. **Where the address IS STILL REGISTERED — including where the `unlisten` ahead of it was one of
   `§2.3` item 4's no-op successes, which removes nothing — the re-`listen` returns the existing entry's
   handle and NO new registry entry arises.** **`§2.4` rule 4's asymmetry (`unlisten` withdraws the
   STORE-side home entry and NEVER the package's function) is UNTOUCHED by this clause: it is about what a
   withdrawal does to the PACKAGE's registry, and this rule is about what a registration does to the STORE's
   home.**

   **AND THE ONE THING THIS UNIT DOES NOT DECLARE — the caller who wants a SECOND registration at ONE
   address.** **The store's contract declares no such route, so this unit declares none and closes the
   silence as a `DECLARED-DEFAULT` rather than leaving it to discovery.** **THE OPERATIVE ANSWER IS `A45`'S
   ONE-ENTRY-PER-ADDRESS, AND IT LEAVES THE CALLER EXACTLY TWO LAWFUL ROUTES, BOTH ALREADY DECLARED:**
   **(i) SUPPLY THE SECOND ENTRY AT THE CONSTRUCTION**, through `cfg.listeners[]`, where a DUPLICATE address
   IS IN DOMAIN and **both entries are KEPT, each with its OWN caller-spelled handle** (`§1.3`'s
   `ListenersArg` row 1; `DD-44`; `§1.3`'s `ListenerHandle` row 1's ADOPTION) — **because the construction is
   a POPULATION step and not a registration verb, so the address-level idempotence is not carried into it**;
   and **(ii) WITHDRAW AND RE-REGISTER**, i.e. `unlisten` the entry's handle and then `listen` the address
   afresh, which mints a SECOND, different handle. **A THIRD REGISTRATION AT ONE ADDRESS WITH THE `listen`
   VERB, WHILE THE ADDRESS IS HELD, IS NOT REACHABLE AND IS A FINDING IF CLAIMED.**
   **AND NAMING WHAT ROUTE (i) DOES NOT BUY, SO THE READING IS NOT READ WIDER THAN IT IS: two entries at one
   address carry TWO handles and a trigger returns BOTH (`§2.4` rule 3; the store's `DD-39`), while route
   (ii) at an address the WITHDRAWAL removed yields a handle that is NEW and whose registration is a NEW
   registry entry — and neither route is a "second mint" of one entry's token.**
   (`[A3 docs/specs/storeroom-native/parameter-semantics.md §2.12 · `PAR-12` — the duplicate case ADMITTED at
   the construction; A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-39` — both entries KEPT; A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` — a pinned default carries a priced alternative
   | declared parameter semantics]`).
   **AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE A PINNED DEFAULT OWES ONE: A SECOND, INDEPENDENT
   HOME ENTRY PER ADDRESS, WITH `listen` MINTING A FRESH TOKEN ON EVERY CALL** — priced: it would make the
   store hold TWO entries at one address for one `listen` call, so `unlisten` over EITHER handle would have
   to choose which entry to drop (the store's own `unlisten` drops exactly ONE entry, `§2.10`), and a trigger
   at that address would return a set that depends on how many times the caller called `listen` rather than
   on the address — **and it would put a second, binding-side reading of the home in this unit, which `DD-1`
   refuses for the refusal surface and this clause refuses for the registration surface.** **Available only
   with a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded
   amendment of `docs/specs/storeroom-js/`; the reversal instrument is that bounded amendment, and NO PARK IS
   NAMED AS IT** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12`; A1
   docs/specs/storeroom-js-proposal.md §11 · A66 — a park is not an instrument a row may name |
      declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS SECTION'S ONE FIRING ITEM INHERITS AND POINTS.** `RCA-8(d)`
ANNOTATE-BESIDE: **items 1–6 above stand byte-for-byte — item 5's prefix rule and item 6's inherited mint rule
included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no item, no member,
no `DD` row and no register row, and it re-decides no rule.** **THE RULING, VERBATIM:** ***"Listener behavior is
part of store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`). **AND WHAT IT DOES AT THIS SECTION,
IN THREE LINES:**
1. **ITEM 5 IS THE STORE'S RULE AND THIS SECTION IS ITS POINTER.** **The handle's presence in a triggered set
   is decided by the address-prefix test — a property of the STORE's listener surface, declared at
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) (iii)**, with the store's own selection
   rule of that part's `§6.5` item 3. **This section keeps the item's words as its own inheritance of the
   rule; a reader taking the rule's home takes that section's.**
2. **ITEM 6'S MINT RULE IS INHERITED TOO, AND ITS HOME IS UNCHANGED: `write-and-read.md §6.5` item 12 (c)** —
   **this section's item 6 remains the crossing's own reading of what a repeat `listen` returns to JS (the
   package's OPAQUE wrapper), and it declares no behaviour of the home.**
3. **AND NOTHING ELSE MOVES.** **Items 1–4 (the process-scoped domain, the two spellings, the two accepted
   consequences and the `unlisten` no-op set) each keep their own subjects as printed; the register keeps its
   `8` rows with every failure list unmoved (`§5.5`'s `S-WITHDRAW` both arms included); and no `DD` row, no
   `PAR-JS` row and no part entry is authored, renumbered or dropped here.**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 3, 10 (d) (iii) and 12 (c) — the firing rules this section inherits; A3
docs/specs/storeroom-js/contract.md §2.3 item 6 and `§2.4`'s own dated clause — the delivery rules left
standing | requirement]`).

**⟶ RECONCILED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`): THE AS-FILED *"DIFFERENT
HANDLE"* SENTENCES AT THIS SECTION'S OWN ITEMS `4`–`6`, READ AS ONE DECLARATION WITH ITEM `6`.** `RCA-8(d)`
ANNOTATE-BESIDE: **items 1–5, item 6 and the re-homing clause above stand BYTE-FOR-BYTE — the quoted
sentences included, quoted here rather than deleted — and are read THROUGH this clause; THIS clause is a
PURE INSERTION, it adds no item, no member, no `DD` row and no register row, and it re-decides no rule.**

**THE THREE SENTENCES, NAMED AS FILED, RE-EMITTED VERBATIM SO `git diff` RECOVERS EACH WHERE IT STANDS, AND
EACH WITH ITS OWN `§`:** **(i) this section's own item `4`, whose closing sentence reads** ***"a later
re-`listen` at the same address mints a DIFFERENT handle, whose registration is a NEW registry entry"***
**(`docs/specs/storeroom-js/contract.md` `§2.3` item 4's closing sentence)**; **(ii) this section's item
`6`'s own consequence block,
whose sentence reads** ***"`§2.4` rule 4's closing sentence *"a later re-`listen` at the same address mints a
DIFFERENT handle, whose registration is a NEW registry entry"* and `DD-15`'s own *"a later re-`listen` at the
same address mints a DIFFERENT handle"* are TRUE OF EXACTLY ONE CASE"*** **(the same section, the paragraph
below item `6`)**; **and (iii) `surface.md §2.3`'s own clause, which NAMES that case and is the
reconciliation this document now agrees with:** ***"the `listen` clause of `contract.md §2.3` item 6, whose
`write-and-read.md §6.5` item 12 (c) terms this section inherits and points to, prints *"a later `listen` at
the same address mints a DIFFERENT handle"* for the still-registered case, while the STORE's own rule —
which `§2.3` item 6 declares to be the operative one and which is its home — returns THE EXISTING ENTRY'S
HANDLE in that case** — **the two stand together and are READ AS ONE DECLARATION, the JS sentence's
*"different handle"* being the WITHDRAWN case's alone"*** **(that part's `§2.3`'s dated clause).**

**THE OPERATIVE RULE, AT ONE HOME AND NOW NAMED AT ALL THREE CELLS: A REPEAT `listen` AT AN
ALREADY-REGISTERED ADDRESS MINTS NOTHING AND RETURNS THE EXISTING ENTRY'S HANDLE**
(`docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c), carried to the listener surface by that
section's items 11 and 12 together; the one home entry per address is `A45`, at
`docs/specs/storeroom-native/contract.md §0.4` clause 2). **THE `DIFFERENT HANDLE` READING IS THEREFORE TRUE OF
EXACTLY ONE CASE — THE WITHDRAWN CASE: the address's ONE store-side home entry has been removed by an
`unlisten` that actually removed it, so the address is no longer in the home and the next `listen` at it
mints a FRESH token — and it is FALSE of the STILL-REGISTERED case, where the `unlisten` ahead of it was one
of item `4`'s NO-OP SUCCESSES and removed NOTHING.** **THE THREE CELLS ARE THEREFORE RECONCILED AND NO
SENTENCE IS WITHDRAWN: item `4`'s sentence, item `6`'s consequence block and `surface.md §2.3`'s clause are
READ AS ONE DECLARATION — `surface.md §2.3`'s clause is the reconciliation, item `6` is the rule's own
statement at this document's home of it, and item `4`'s sentence is read through both** (`[A3 docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) — *"a `listen(address)` whose address IS
already registered returns the EXISTING entry's handle rather than minting a second one"*; A3
docs/specs/storeroom-js/surface.md §2.3's dated clause — the still-registered case named as the
reconciliation; A3 docs/specs/storeroom-native/contract.md §0.4 clause 2 · `A45` | state or fail-state
declaration]`).

**WHOSE TEXT MOVES, AND WHOSE DOES NOT — STATED SO THE TWO HOMES ARE NOT RUN TOGETHER.** **THIS PASS MOVES NO
BYTE OF THIS DOCUMENT AND NO BYTE OF `surface.md`.** **The drives that the three cells' own sentences are
measured by are the RED SET's, and the TEST WRITER re-issues them against `write-and-read.md §6.5` item 12
(c): `tests/watched_addresses.rs`'s `13` drives are re-derived BY ITS AUTHOR ROLE, and this pass writes no
`tests/**` byte** (`write-and-read.md §6.5`'s supersession clause item 4, which names that file's
re-derivation; this directory's own acceptance part's `§4.4`).

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

**⟶ RECONCILED 2026-10-11 — THE BLIND GREENS PASS (`role_spec_writer`), CLOSING THE RECORDED TENSION
(`archive/gate5/storeroom-js-greens-run.md` §4) AT THIS DOCUMENT'S OWN HOME OF RULE 3, SO THE TWO HOMES OF THE
ONE RULE AGREE: *"the store returns that token ONCE"* READ AGAINST THE STORE'S `DD-42` DUPLICATE CASE.**
`RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4 above stand byte-for-byte — rule 3's own sentence included and NOT
re-worded — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it re-decides no rule,
adds no member and mints no code.**
**THE AS-FILED SENTENCE, NAMED AS FILED:** ***"Where two construction entries at one address carry the
caller's SAME token, the store returns **that token ONCE** in the triggered set where the store minted it, and
the registry fires **one** invocation per DISTINCT handle — not one per occurrence, and not one per entry"***
(this document's `§2.4` rule 3, second sentence) — **against the store's `DD-42` clause, which declares for that
same caller-spelled duplicate that `triggered` carries that token TWICE** (`docs/specs/storeroom-native/contract.md`
§0.2 · `DD-42`; its clauses (1) and (2) at that contract's `§0.4`'s mint clause). **THE RECONCILED READING SPLITS
THE SENTENCE INTO TWO OBSERVABLES AND ASSIGNS EACH ITS CARRIER AND ITS GOVERNING CLAUSE:** **where the STORE
MINTED the token, rule 3's *"once"* governs and holds in both halves — ONE identity reachable once is returned
once and invokes once, because the mint's own non-collision rule runs before the token is handed out, so one
mint can never make two entries share a token; and where TWO ENTRIES AT ONE ADDRESS CARRY ONE TOKEN BY THE
CALLER'S OWN ACT, the ARRAY's multiplicity is the STORE's declaration — TWICE, the construction having ADOPTED
both entries verbatim (`DD-39`; `write-and-read.md §6.5` item 12 (b)) — while the INVOCATION COUNT stays the
PACKAGE's own rule, ONE per DISTINCT identity, so that duplicate token's one function runs ONCE.** **NO ORDER IS
ASSERTED BY EITHER FIGURE** (`§2.7` item 3; `DD-22`), **and the register's two relevant failure-list lines stay
FALSE of every lawful state: `P-SR-5`'s *"a duplicate token that fires twice per distinct handle"* and
`P-SR-8`'s *"a duplicate member where the store minted the token"*.**
**THE FULL STATEMENT — WITH THE SHIPPED ARTEFACT'S OWN BOUNDARY COLLAPSE NAMED AND ITS `alt` PRICED, AND WITH
THE TWO INDEPENDENT OBSERVABLES THE ARRAY'S LENGTH AND THE INVOCATION COUNT ARE — STANDS AT
`docs/specs/storeroom-js/surface.md §2.4`'s dated clause of this date, which is the operative statement of rule
3's multiplicity and of the array's faithful carry; THIS clause carries the same split at this document's own
home of the rule and declares nothing the part does not already carry.**
(`[A1 docs/specs/storeroom-js-proposal.md §9.2 — the registry's four rules as adopted; A1
docs/specs/storeroom-js-proposal.md §18 · `A57` · `A77`; A3 docs/specs/storeroom-native/contract.md §0.2 ·
`DD-42` and `DD-39` with that contract's `§0.4` clauses 1–2; A3 docs/specs/storeroom-js/surface.md §2.4's dated
clause of this date (the operative statement); A3 archive/gate5/storeroom-js-greens-run.md §4 |
declared parameter semantics]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1): THE REGISTRATION SITE'S DECLARED SPELLING.**
`RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4 above stand byte-for-byte and are not restated; THIS clause is the
operative statement of the spelling the four rules' subject is reached through, and it is a PURE
INSERTION.** **THE DEFECT IT CLOSES, NAMED: `§2.4` declared a per-instance registry holding *"the caller's
FUNCTION"* and invoking it, and `parameter-semantics.md §2.12` (`PAR-JS-12`) declared the `TypeError` a
non-function registration throws — while `§2.1`'s *"no clause of this directory exposes any member of it"*
and `package.md §1.3` item 3's *"NOTHING ELSE"* left the member *"FUNCTION"* had to enter through
UNDECLARED. `acceptance.md §4.1` item 3 nevertheless demands one drive per registry rule, so no lawful input
existed for that drive and the red set's `S-REG` line was `un-run` — and `un-run` IS A FAILURE.**

**5. THE REGISTRATION SITE, DECLARED — THE ONE MEMBER OF THE PACKAGE'S OWN INSTANCE HANDLE.** **A caller
registers a listener function for a handle through the ONE member of the object `storeCreate` returned, and
the spelling is FIXED:**
```
register(handle, listener) -> undefined    // the object storeCreate returned; throws TypeError on an outside argument
```
  **(a) THE SITE IS A MEMBER OF THE INSTANCE HANDLE, AND IT IS ITS ONLY MEMBER.** **`storeCreate(cfg)`
  returns an OBJECT whose ENTIRE declared member set is `{ register }` — one own member, and NOTHING ELSE.**
  **This is the ONLY member any clause of this directory exposes on that handle, and `§2.1`'s non-exposure
  sentence is AMENDED to say exactly this** (see `§2.1`'s dated clause). **It is NOT a NINTH NAMED EXPORT of
  the entry: `package.md §1.3` item 3's *"the verbs of `surface.md §2` and the package's own instance handle
  factory — and NOTHING ELSE"* stands WHOLE, because `register` is reached through the FACTORY'S OWN
  PRODUCT and not through the module namespace.** **Neither `register` nor any other name is added to the
  entry's named exports, and `§2.9` item 1's *"`8` verbs"* count does not move.** **⟶ AND THE TWO FIGURES THIS CLAUSE PRINTS ARE SUPERSEDED AND ARE READ THROUGH AT THIS CLAUSE'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: clause (a)'s sentences stand BYTE-FOR-BYTE above and THIS clause is their mark): *"`{ register }` — one own member, and NOTHING ELSE"* AND *"`§2.9` item 1's `«8» verbs` count does not move"* ARE THE `Q1`/`A79`–`A81` PASS'S READINGS, and the operative figures are TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause, and ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause; the clause's own POINT — that `register` is not a named export of the entry — STANDS WHOLE, and the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory**

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`), ON THE ARCHITECT'S RULINGS `A79`–`A81` (`docs/specs/storeroom-js-convenience-proposal.md` `§8`, verbatim): TWO CLAUSES OF THIS ITEM ARE READ THROUGH THIS ONE, AND NEITHER AS-FILED CELL IS REWRITTEN.** `RCA-8(d)` ANNOTATE-BESIDE: **items (a)–(f) above stand byte-for-byte — the signature block, the domain, the drive the acceptance layer owes and the priced `alt` included — and this clause is a PURE INSERTION; the register keeps its `8` rows, no `PAR-JS` row is minted (`18` before and `18` after) and no `§` is renumbered.**
1. **CLAUSE (a)'S MEMBER-SET FIGURE, QUOTED IN ITS OWN WORDS:** *"`storeCreate(cfg)` returns an OBJECT whose ENTIRE declared member set is `{ register }` — one own member, and NOTHING ELSE."* **THE OPERATIVE DECLARATION IS `{ register, on, off }` — THREE OWN MEMBERS, AND NOTHING ELSE — fixed by `docs/specs/storeroom-js/surface.md` `§2.1`'s dated clause 1 (a) (the `Q1` contract amendment) and carried by `§2.4` item 7's two clauses and by `package.md §1.3` item 4's dated reconciliation.** **`A79` (*"Use S-1"*) ADOPTS THE SECOND-INSTANCE-MEMBER SHAPE: `on(address, listener) -> handle` and `off(handle) -> undefined`, BESIDE `register`. THE MODULE NAMESPACE IS UNMOVED AT THE EIGHT DECLARED VERBS (⟶ AND BOTH FIGURES THIS LIMB PRINTS ARE WITHDRAWN AS OPERATIVE FROM 2026-10-16 BY `RCA-8(g)`: the `THREE OWN MEMBERS` above and the `EIGHT DECLARED VERBS` here are this limb's own readings for `A79`–`A81`, its bytes standing BYTE-FOR-BYTE, and its operative figures — ONE named export, `storeCreate`, and TWELVE own members — are carried at `surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of that date, which THIS CELL IS READ THROUGH; every reference above that names this cell as *"`§2.4` item 7"* is a MIS-POINTER and resolves HERE, at item 5, whose sentence the pointer quotes) and the store's own `listen`/`unlisten` stay un-overloaded**, **so clause (a)'s SECOND sentence — that `register` is the ONLY member any clause of this directory exposes on that handle — is the read-through that moves with the set, and the sentence's own point (that no member is a ninth named export and that `§2.9` item 1's `8`-verb count does not move) STANDS WHOLE.** **The re-spelling of this cell's own bytes remains the NAMED REPAIR of a later bounded amendment; the operative reading is the one named here** (`docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md`'s repair list, item 1).
2. **AND CLAUSE (d)'S REFUSAL FORM, THE SAME WAY — BECAUSE THIS ITEM STILL PRINTS IT AND THE SHIPPED SITE DOES NOT.** **CLAUSE (d) ABOVE DECLARES** *"A NON-FUNCTION `listener` → a JS `TypeError` at REGISTRATION, carrying NO `status` and NO `message` member (`PAR-JS-12`'s declared exception; the ONE form this package throws that is not the store's `{status, message}`)"*, **and the same reading is given for a `handle` outside the domain.** **THE OPERATIVE READING, AT ITS OWN HOME: the registration site's refusal IS a rejection under `A76` and travels in `§2.5`'s SINGLE form — `{ status, message }`, its `status` the store's own closed-set `AddressMalformed`, its `message` carrying the failing target, the CLASS the value has and the ARGUMENT POSITION — declared at `docs/specs/storeroom-js/surface.md` `§2.5` item 5 (g) and at `parameter-semantics.md` `§2.12`'s second dated exception clause, and DRIVEN by the blind set's `JSG-09` cells (`JSG-09.4`–`.10`) and by `convenience.test.mjs`'s refusal cell.** **THE `TypeError` IS THE SHAPE THE SITE WAS DECLARED WITH at the earlier bounded correction pass: it is not withdrawn as that pass's reading, it is SUPERSEDED as the operative one, `A80`'s and `A81`'s two new members taking the same single form at their own two sites (`§2.4` item 7 (a)–(b)).** **AND NOTHING ELSE OF ITEM (d) MOVES: no code is minted at the site, no journal entry is appended, no node changes and `unlisten`'s no-op-success reading still does not extend here.** **The reader takes the row's own answer from `surface.md §2.5` item 5 (g); this document's own clause (d) stands as filed.** **⟶ AND ONE RE-DERIVATION OF THIS SENTENCE IS NAMED HERE SO THE TWO SITES ARE NOT READ AS ONE, 2026-10-15: `docs/specs/storeroom-js/surface.md` `§2.4` item 9 (b), landed on `docs/decisions.md` · `A116` (D1), re-spells clause (d)'s *"NO `message` member"* AT ITS OWN BOUNDARY — the ORDERING SEAM's `settle` site, where a STRING `message` member is REQUIRED AND NOT FORBIDDEN with its `status` member ABSENT — while THIS document's registration site's operative form remains the `{status, message}` reading `surface.md §2.5` item 5 (g) fixes, THE TWO SITES BEING DECLARED AT TWO CLAUSES OF THE SAME PART AND NOT ONE** (`[A2 docs/decisions.md · `A116` (D1); A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (b) and §2.5 item 5 (g) — the seam's clause and the registration site's own | requirement]`); **THIS clause's reading above stands byte-for-byte and no cell here is re-spelled by that sentence** (`§10`'s divergence table, row 3; `archive/gate3/storeroom-js-red-set.md` `§5` item 1; `[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` | requirement]`).
  **(b) ITS SIGNATURE, IN THE SAME JS SPELLING THIS SECTION'S TABLES USE.** **`register(handle, listener)`
  takes EXACTLY TWO arguments: `handle` is the OPAQUE value a verb RETURNED (the `ListenerHandle` OUTPUT
  spelling of `§1.3`, `§2.3` item 2) or the opaque value the construction ADOPTED; `listener` is the
  function of `PAR-JS-12`.** **The return is `undefined` on every success, including on a REPLACEMENT.**
  **(c) ITS DOMAIN.** **A pair (`handle`, `listener`) where `handle` is a value THIS INSTANCE minted or
  adopted — the construction's `listeners[]` entries and every handle a verb of THIS instance returned —
  and `listener` is ANY JS function.** **The registry holds AT MOST ONE function per handle (`§2.4` rule
  2), so the domain is a SET OF PAIRS keyed by the handle, never a fan-out.**
  **(d) EVERY OUTSIDE VALUE'S DECLARED ANSWER, ONE PER CLASS — and the four of them are ONE form, because
  the site is a REGISTRATION and not a CROSSING.** **A NON-FUNCTION `listener` → a JS `TypeError` at
  REGISTRATION, carrying NO `status` and NO `message` member** (`PAR-JS-12`'s declared exception; the ONE
  form this package throws that is not the store's `{status, message}`). **A `handle` THE STORE NEVER MINTED
  — a fabricated value, a value a FOREIGN instance minted, a value a PRIOR SESSION minted, a bare `string`,
  a blank token, `null`, `undefined`, a non-opaque value, or an ABSENT argument → the SAME JS `TypeError`,
  for the SAME reason: the registration site admits the handle's OPAQUE spelling and by nothing else, and
  `unlisten`'s NO-OP-SUCCESS reading of `§2.3` item 4 does NOT extend here** — **because `unlisten` names a
  WITHDRAWAL, whose in-domain answer for an unknown handle is already declared, while `register` names a
  REGISTRATION, whose argument is a member of the registry's own key set and has no such arm.** **A
  RE-REGISTRATION OF THE SAME HANDLE → SUCCESS, `undefined`, with the PREVIOUS function REPLACED and dropped
  without notice** (`§2.4` rule 2). **AND NOTHING REACHES THE STORE IN ANY OF THESE CASES: the site performs
  no store call, mints no code, appends no journal entry and changes no node** — **the `TypeError` is
  classified exactly as `PAR-JS-12`'s exception clause classifies it.**
  **(e) THE DRIVE THE ACCEPTANCE LAYER OWES, NAMED SO THE RED SET CAN BE REPAIRED FROM THIS CLAUSE ALONE:**
  **a drive reaches `register` through an instance the package returned, never through the module
  namespace; a drive distinguishing the TWO throw sites is required — `§2.5`'s `{status, message}` for a
  VERB and this item's `TypeError` for a REGISTRATION — and a `TypeError` thrown by a VERB remains a
  finding.**
  **(f) WHAT THIS ITEM DOES NOT DO.** **It adds no verb, no parameter and no store-side surface; it mints no
  code; it does not widen `§2.9`'s non-exposure of `findAddress`; and it leaves `§2.4` rules 1–4, `§2.7`'s
  firing window and `DD-15`'s *"`unlisten` withdraws the registration, never the function"* standing
  unchanged.**
  (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-15`'s *"the construction's `listeners[]`
  expressible from JS **with a drive**"* and *"the registry's owner/key/duplicate/absence rules"*;
  docs/specs/storeroom-js/parameter-semantics.md §2.12 · `PAR-JS-12`; `DD-15`; `DD-46` | requirement]`)
  **AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE A NEW SURFACE MEMBER OWES ONE:** **`register` as
  a NINTH NAMED EXPORT of the entry** — priced: it would move `§2.9` item 1's `8`-verb count and `package.md
  §1.3` item 3's *"NOTHING ELSE"*, and would make a registration reachable before any instance exists,
  which no registry rule needs; **and** a REGISTRATION THROUGH A `listen` OPTION-BAG — priced: it would
  change `listen`'s declared arity (`§2.10`'s *"`listen`'s `address` is `AddressArg`'s domain and NOTHING
  MORE"*) and would give one verb two arities. **Both are available with a fresh ruling, and the reversal
  instrument is a bounded amendment of `docs/specs/storeroom-js/`** (`[A1
  docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` — a pinned default carries a priced alternative
  | declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THE FIRING/DELIVERY LINE, DRAWN AT THIS SECTION'S OWN HOME OF THE
REGISTRY.** `RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4 above, item 5's lettered clauses, item 6's model clauses
(a)–(f) and this document's earlier dated clauses at this section stand byte-for-byte — the rule-3
reconciliation and the caller-spelled-duplicate clause included — and they are read THROUGH this clause; THIS
clause is a PURE INSERTION, it re-decides no rule, adds no member, no verb and no parameter, mints no code,
moves no register row and names no park.** **THE RULING, VERBATIM:** ***"Listener behavior is part of
store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE LINE, IN THREE LINES, SO THE BOUNDARY IS WHERE A READER CAN FIND IT:**
1. **THE FIRING IS THE STORE'S AND THIS SECTION IS NEVER ITS HOME:** **which listener fires · when it fires ·
   what it is bound to · which ids a trigger returns · the home's registration semantics (`listen` and
   `unlisten`) · the address-prefix rule · the process-scoped handle are STORE BEHAVIOUR**, **declared at
   `docs/specs/storeroom-native/write-and-read.md §6.5` items 8–13 and completed there by item 14, which states
   the authority itself and the registration's effect timing relative to a trigger (`docs/pending.md`'s
   `CF-DUP-3` corner is re-homed there).**
2. **THE DELIVERY IS THIS UNIT'S AND IS THE WHOLE OF WHAT THIS SECTION OWNS:** **the id→function registry
   (rules 1–4, item 5's registration site and its domain, item 6's id-matching model) · the invocation, its
   timing, its count per distinct identity and its one argument (`§2.7`) · and the single failure form
   (`§2.5`) — EACH STAYS.** **This section may add a delivery rule and may never be the home of a firing
   rule.**
3. **AND THE ONE PHRASE THIS SECTION'S EARLIER DATED CLAUSE USED THAT NAMES A FIRING TERM IS READ AT ITS OWN
   TWO HALVES, SO NO SECOND HOME ARISES: *"a delivery window's recipient set"*.** **(i) The STORE's half — what
   a `triggered` member contains — is the store's: the member carries what the ONE HOME held when the trigger
   was computed, so a `listen` or an `unlisten` landing afterwards takes effect at the NEXT trigger
   (`write-and-read.md §6.5` item 14 (d)/(e), where the two symmetric cases are stated).** **(ii) This UNIT's
   half — what the package does with the list it holds — is this section's and `§2.7`'s: the invocation happens
   after the verb has returned, and the package reads the list IT HOLDS once per distinct identity, so an
   identity whose function was absent when the list was read is not invoked at a later occurrence of it in
   that list.** **AND NOTHING ELSE MOVES: rules 1–4's own observables, item 5's `TypeError`/form reconciliation,
   item 6's six clauses, the register's `8` rows and every failure list stand exactly as printed; no `DD` row,
   no `PAR-JS` row and no part entry is authored, renumbered or dropped here.**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 8–14 — the store's listener clauses, at their own lines; A3 docs/specs/storeroom-js/surface.md §2.4's
re-homing clause of 2026-10-11 — this part's twin of this clause; A3 docs/specs/storeroom-js/contract.md §2.7 |
requirement]`).

### §2.5 The single failure form

**A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY ONE SUCH
FORM:**
```
{ status: string, message: string }
```

**⟶ AND THIS OPENING SENTENCE IS SUPERSEDED AS AN ARITY AT ITS OWN BYTES, 2026-10-16, BY THE ARCHITECT'S RULING VERBATIM *"Bubble the message log to the client on failure, override any clauses that forbid this."* (`role_spec_writer`; `RCA-8(g)`: the sentence and its signature block above stand BYTE-FOR-BYTE and THIS clause is their mark at itself; read with `docs/decisions.md` · `A121`).** **THE OPERATIVE FORM IS `{ status: string, message: string, log: LogEntry[] }` — THREE MEMBERS, ONE SUCH FORM — AND ITS ONE HOME IS `docs/specs/storeroom-js/surface.md §2.5`'s clause of this date, where the three members' sources, `log`'s element shape, its `[]` arm, the refused alternatives and the route's ceiling are declared item by item.** **THIS DOCUMENT'S `§2` IS THAT PART'S OWN RELOCATION AND HOLDS NO SECOND COPY OF THE RULE: a reader takes the crossing form's declaration at that part's own bytes, and THIS cell carries the FIGURE and the pointer — not the rule and not a re-derivation** (`§2.5`'s clause of this date; `docs/specs/storeroom-js/parameter-semantics.md §2.26` — the new member's own register row | state or fail-state declaration]`).
1. **`status` is the store's own member token VERBATIM** — one of the store's closed `16` members, as a JS
   `string`, **never an index, never a lowercased or prefixed variant and never a package-minted code** —
   **and a code the store returns that lies outside the closed set is passed through VERBATIM rather than
   re-mapped** (`DD-40`).
2. **`message` is the store's own GENERATED message VERBATIM** — never empty, never a placeholder and never
   hand-authored by the package.
3. **THE FAILURE IS THROWN AND NEVER RETURNED.** There is **no** returned tagged union, **no** `{ok, value}`
   envelope, **no** `Promise` rejection (**every verb is synchronous**) and **no** `Error` subclass: **the
   object thrown is a plain object whose prototype is the caller realm's `Object.prototype` and whose two
   members are exactly `status` and `message`** (`DD-12`).
   **⟶ `RCA-8(g)` ONE-LINE POINTER, AUTHORED 2026-10-16: *"whose two members are exactly `status` and
   `message`"* IS SUPERSEDED AS AN ARITY BY THE ARCHITECT'S RULING *"Override the failure form limit"*, read
   with his earlier ruling *"Bubble the message log to the client on failure, override any clauses that
   forbid this"*; the operative member set is `{status, message, log}`, `3` members, flat across arms, and its
   ONE home is `docs/specs/storeroom-js/surface.md §2.5`'s clause of this date, items 3/4 and 9. THE THROWN
   AND NEVER RETURNED RULE, THE NO-`Error`-SUBCLASS RULE AND THE PROTOTYPE RULE ABOVE STAND WHOLE.**
4. **NO DISCRIMINATION RULE IS OWED.** **A caller that stores a value whose shape is indistinguishable from
   this object and then cannot tell its own input from a genuine failure carries an UNSUPPORTED
   ANTI-PATTERN** — the architect's own ruling — **so this unit declares no discrimination helper, no
   branded record and no third member** (`DD-13`).
   **⟶ `RCA-8(g)` ONE-LINE POINTER, AUTHORED 2026-10-16: *"and no third member"* IS SUPERSEDED AS AN ARITY
   BY THE ARCHITECT'S RULING *"Override the failure form limit"*; the member set is `{status, message, log}`
   from this date and `DD-13`'s no-discrimination rule is UNMOVED by it — `DD-13`'s own `alt` cell's *"a
   branded failure record"* remains refused, and it is a DIAGNOSTIC third member and not the attempt's log.
   See `DD-12`'s repaired row and `DD-13`'s own mark of this date.**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A64; A3 docs/specs/storeroom-native/contract.md §8.3 — the
   error's closed two-member shape | state or fail-state declaration]`)
   **⟶ `RCA-8(g)` ONE-LINE POINTER, AUTHORED 2026-10-16: THE EVIDENCE TAG'S *"the error's closed two-member shape"* IS SUPERSEDED AS AN ARITY BY THE ARCHITECT'S RULING *"Override the failure form limit"*; the tag's TARGET — `docs/specs/storeroom-native/contract.md §8.3`, the STORE's own error record — STANDS UNMOVED and is correct AS A STATEMENT ABOUT THE STORE'S RECORD, which is not this unit's crossed form. THE OPERATIVE CROSSED FORM IS `{status, message, log}` at `surface.md §2.5`'s clause of this date.**

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE ABSENT-OR-FAILED-ADDON STATE,
DECLARED AS A FAILURE FORM.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–4 above stand byte-for-byte; THIS clause
is a PURE INSERTION and it declares the ONE failure state that is neither a verb's nor a construction key's
— the state `P-SR-7`'s `S-LOAD` line is the row for, and the state the package's own load step can reach
BEFORE any of the four items above can be consulted.**

5. **THE ABSENT-OR-FAILED ADDON IS A DECLARED FAILURE FORM, AND THE PACKAGE HAS NO OTHER ANSWER.**
   **WHERE THE INTERNAL ADDON IS ABSENT, UNREADABLE, OR REFUSES TO LOAD, `storeCreate` ANSWERS THE SINGLE
   FORM OF ITEM 1 ABOVE — a THROWN plain object whose member set is EXACTLY `{status, message}` — AND
   RETURNS NO INSTANCE.** **THE STATE, IN FOUR TERMS, EACH MANDATORY AND EACH DECLARED HERE:**
   **⟶ `RCA-8(g)` ONE-LINE POINTER, AUTHORED 2026-10-16: THE MEMBER SET NAMED IN THIS ITEM'S OPENING
   SENTENCE — *"EXACTLY `{status, message}`"* — IS SUPERSEDED AS AN ARITY BY THE ARCHITECT'S RULING
   *"Override the failure form limit"*, read with his earlier ruling *"Bubble the message log to the client on
   failure, override any clauses that forbid this"*; THIS STATE'S FORM IS `{status, message, log}` with `log`
   the DECLARED `[]` — `surface.md §2.5`'s clause of this date, item 4, names this state's arm among the
   `log: []` arms BY NAME. THE STATE'S FOUR TERMS BELOW STAND WHOLE, and NO SUBJECT, NO STATUS AND NO
   NO-FALLBACK RULE MOVES.**
   **(a) ITS STATUS IS `FilePathUnreachable`**, as a JS `string`, **carried VERBATIM**: one of the store's
   closed `16` members, **never minted by the package, never lowercased, prefixed or re-mapped** — the
   package owns no second code for this state and item 1 above forbids it one.
   **(b) ITS MESSAGE'S HOME IS THE STORE'S OWN GENERATOR, REACHED THROUGH THE ADDON WHERE THE ADDON LOADED
   FAR ENOUGH TO CARRY IT:** **the message is the string the store's own generator produces for
   `FilePathUnreachable` at the SUBJECT THE ADDON ARTEFACT'S OWN PATH — the ignored path the package's
   internal step loads and the very file whose absence or unloadability produced the state — and NOT
   `cfg.filePath`, because THIS state is a statement about the ADDON and not about the construction's own
   argument; a `cfg.filePath` that fails the store's construction-time reachability probe is the SEPARATE
   state `crossing.md §1.3`'s `FilePathArg` rows 4–6 declare, reached at the store's own construction and
   never here.** **The message is never empty, never a placeholder and never hand-authored by the package
   (item 2 above), and the subject the generator renders is that path, because the generator's own spelling is
   `'<the subject>' is not reachable at construction, the path must exist or the application must be able to
   write it`.**
   **(c) THE ONE CASE WHERE THE GENERATOR IS UNREACHABLE, AND HOW THE STRING IS THEN CARRIED:** **the addon
   IS the artefact that failed to load — or it loaded and exposes no generator — so the generator CANNOT be
   consulted at all, and the string is then carried at ONE DOCUMENTED SITE: a package-side constant in the
   package's own entry module, holding the generator's own string for this code and this subject, rendered
   by the same spelling clause (b) prints.** **The constant is the SAME BYTES the generator would answer, so
   there is ONE string for the state on both arms; it is NOT a fallback implementation, NOT a second store
   and NOT a second message authority — it is the one site where the string is carried when its author is
   the thing that failed** — **and a second such site, or a site holding a different string, is a FINDING.**
   **(d) NO FALLBACK EXISTS, AND THIS IS THE WHOLE OF THE CLAUSE.** **The package NEVER falls back to a
   JavaScript store, NEVER absorbs the state silently, NEVER degrades to a partial instance or to a no-op
   verb, and NEVER substitutes a package-authored message, status or instance for it.** **An addon that is
   absent or fails to load is a DECLARED FAILURE AND NEVER A SILENT JS STORE — the outcome the refused `V3`
   variant would have produced.** **CONSEQUENTLY EVERY VERB AND EVERY CONSTRUCTION IN THAT STATE ANSWERS THE
   SAME THROWN FORM, and no verb of this unit is reachable while the addon is not.**
   **AND THE ROW THAT PINS THE STATE IS `P-SR-7`'s `S-LOAD`** — **one `import` of the entry from outside the
   unit directory, resolving and loading exactly one Node-API addon** — **and the state is the same row's
   FAILURE arm.**
   (`[A1 docs/specs/storeroom-js-proposal.md §17 · `A75` — *"an addon that is absent or fails to load is a
   DECLARED FAILURE and never a silent JS store (`V-3` was refused by this choice)"*; A3
   docs/specs/storeroom-native/contract.md §8.1 — `FilePathUnreachable`, rank `14` of the closed `16`;
   A3 docs/specs/storeroom-native/contract.md §8.2 — the generator's own row for that code and its two
   clauses | state or fail-state declaration]`).
   **AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE A PINNED STATUS OWES ONE, AND WITH THE HONESTY
   THE TASK OWES ITS READER — `FilePathUnreachable` IS THE HONEST STATUS HERE AND THE ALTERNATIVE IS PRINTED
   BESIDE IT RATHER THAN HIDDEN:** **the alternative is A PACKAGE-OWNED CODE FOR THIS STATE** (a token the
   store's closed set does not hold, such as a `AddonUnavailable`-shaped name) — **and the price is THREE
   things, each already declared: it would MINT A CODE, which item 1 above and `DD-40` forbid; it would give
   `§2.5` TWO producers of a `status`, which `DD-1` refuses for the refusal surface; and it would put a
   *"second externally-sourced vocabulary token"* beside `A72`'s one-row dossier, which `DD-2`'s own `alt`
   cell prices and the dossier's cap does not admit.** **`FilePathUnreachable` IS THEREFORE OPERATIVE
   WITHOUT A RULING** — its own generator's clause reads *"is not reachable at construction, the path must
   exist or the application must be able to write it"*, which is EXACTLY the state an absent or unloadable
   addon is in — **and the reversal instrument is a fresh ruling of the architect recorded as an ACTIVE
   `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-js/`, with the dossier
   row that a second externally-sourced token would owe** (`[A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12`; A1 docs/specs/storeroom-js-proposal.md §17 ·
   `A75`; `DD-1`; `DD-40`; `DD-2` | declared parameter semantics]`).

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

**⟶ AND ONE DATED CLAUSE STANDS BESIDE THIS SECTION AND MOVES NO BYTE OF IT (`role_spec_writer`,
2026-10-16).** `RCA-8(d)` ANNOTATE-BESIDE: **this section's as-filed text above stands BYTE-FOR-BYTE** (this
document's `§2` is the contract's own relocation of the `surface` part's text, and the relocation rule the
part map prints is that the source's bytes and `§`-numbers are this document's own — so this document does not
move them out of itself, and it does not re-emit them a second time either). **WHAT THE CLAUSE SAYS:**
1. **`§2.6`'S `CLIENT-SIDE` PREMISE IS FALSIFIED FOR THE WRITE PATH BY `A122` (`docs/decisions.md`,
   2026-10-16), and the operative law is `docs/specs/storeroom-js/surface.md §2.12` item 1 — WHICH IS THE
   AUTHORED HOME OF THE CLOSED EDGE: a four-position `write` enters the kernel's `K-2`, the kernel drives the
   store with the FOURTH POSITION SUPPLIED, and the constraint pass runs INSIDE the call and not after it returns.**
   **⟶ AND THE ORDINAL IS CORRECTED AT THIS CELL, 2026-10-21 (`role_spec_writer`; `RCA-8(g)`: the edge, its two
   legs and the pass's instant STAND WHOLE): the entry→kernel call is the FOUR-position call and the position the
   kernel supplies is `write`'s FOURTH — `a.write(address, tier, value, commit?)` at `surface.md §2.2`, four
   positions with `commit` FOURTH, called with four by the kernel (`bindings/js/src/constraint-kernel.mjs:1108`,
   `store.write(address, tier, value, record)`).** **THE OLD *"FIFTH"* WAS THE RETIRED ARRAY-TAKING DISPATCHER'S
   FRAME AND NOT AN ARITY: the deleted `call(instance, verb, args)` counted the verb's arguments as an array
   (`docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §2` — `call` IS DELETED).** **AND AT
   `surface.md §2.12` item 1 STAGE 2 THIS LEG IS THE KERNEL'S OWN RUST-SIDE CALL, whose spelling THAT stage says
   stands at the kernel-surface site it cites and is re-emitted nowhere in this directory — so no JS call shape
   and no JS ordinal is declared by that stage, and this clause's four-position entry call is the JS half alone.**
2. **IN THE `surface` PART, WHERE THAT SECTION'S TEXT LIVES, THE SUPERSEDED BYTES HAVE MOVED OUT
   BYTE-EXACTLY to `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1` AND THAT PART'S `§2.6`
   CARRIES A ONE-LINE POINTER** (`RCA-8(g)`: **move out, leave a one-line pointer, never retain beside**).
3. **AND THIS DOCUMENT READS THE TWO TOGETHER: a reader who takes `§2.6` from this document takes it AT THE
   `surface` PART'S POINTER, and the words that SURVIVE are named there — *"the JS side holds the constraint
   functions"*, the `write`-out/`rollback`-in mechanical reading, and the *"NO constraint verb"* prohibition
   read AT THE STORE's OWN surface; the words that DO NOT survive are *"CONSTRAINT AND REPAIR EVALUATION IS
   CLIENT-SIDE"* and *"evaluate constraints AFTER a `write` returns"*, each falsified for the write path.**
4. **AND ONE ROW WHOSE HOME IS THIS SECTION IS RE-SPELLED AT ITS OWN SITE AND NOT HERE:
   `parameter-semantics.md §2.18` carries the two re-spelled cells, and `DD-16` above is read through them
   with its `alt` cell's priced alternative — *"a store-side constraint surface"* — UNMOVED, because
   `manageConstraints` is the PACKAGE's route and adds no store byte** (`[A2 docs/decisions.md` · `A122` ·
   `A123` · `A125`, all 2026-10-16; A3 docs/specs/storeroom-js/surface.md §2.12; A3
   docs/specs/storeroom-js/parameter-semantics.md §2.18's dated clause; A3
   archive/reviews/2026-10-16-constraints-publication-gate1.md §17.1 | cross-reference]`).

**⟶ AND `DEF-W` IS DECLARED AT THIS SECTION, 2026-10-26, BECAUSE THE REVERSAL IS THIS SECTION'S SUBJECT — AND ITS CARRIER IS OWED, SAID PLAINLY SO NO READER TAKES THIS CLAUSE FOR SHIPPED BEHAVIOUR.** **THE RULING IS THE ARCHITECT'S, VERBATIM: *"Assert the constraints on rollback"*** (`strata/decisions.md` · `D-38`). `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause moves no position, no arity, no verb and no store byte.**
1. **THE LAW, AND THE INSTANT IT IS JUDGED AT: A REVERSAL IS JUDGED AT THE TERMINAL STATE IT LEAVES, AND NEVER PER UNWINDING STEP.** **A `rollback` whose TERMINAL state violates a registered constraint FAILS and says so**, carrying the set's rank-`20` member `ConstraintPassRefused` (`docs/specs/storeroom-native/contract.md §8.1`'s amendment of this date) — *"a refused reversal is a refusal"* — in this surface's one form `{status, message, log}`. **A LAWFUL REVERSAL IS UNCHANGED: same record, same `undoneOps`, same `restoredTo`, no status and no throw.** **A PER-STEP CHECK IS UNSOUND AND IS REFUSED BY NAME**: an unwinding composition passes through intermediate states NO constraint would approve — the states a newest-first walk visits are not states the store ever offered a caller — so only the state the reversal LEAVES is a state a registered constraint can be asked about (`D-38`, adopting the handoff's own `(f)`).
2. **AND IT ADDS NO WALK AND NO SECOND CALL.** `D-40`'s floor law stands whole: **the failing repair's rollback is ONE call at the attempt's first op** (`bindings/js/src/entry/kernel-terminal.mjs`'s `composeRollback`), and **this clause must not resurrect the per-op walk that law forbids** — the constraint check is a JUDGEMENT of the state after that one call, not a sequence of per-op approvals.
3. **★ THE CARRIER IS OWED, AND ITS SITE IS NAMED SO THE OWING IS LEGIBLE RATHER THAN SILENT: `bindings/js/index.mjs`'s `rollback` member (`:483`–`:490`) still passes the reversal straight to the addon — `Reflect.apply(entryOf().rollback, this, args)` — and consults no constraint.** **That file stood outside the write scope of the pass that landed ranks `18`, `19` and `20`; the declaration is the ruling's and the observable is NOT yet.** **SO: NO CELL ASSERTS THE REFUSED-REVERSAL ARM** (it is `D-38`'s second owed cell: *"owed cells (`2` = the single-call multi-address pair, the refused-reversal arm)"*), **and a pass that reads this clause as a description of today's behaviour will find the reversal unjudged.** **The arm's landing is one edit at that member and one cell, and it takes the rank-`20` member this pass already carries on both sides of the closed set.**
`[T: the refused-reversal arm — the terminal-state judgement, the rank-`20` member it carries, and the owed carrier at the `rollback` member, on the architect's ruling of 2026-10-26 (`DEF-W`) | state or fail-state declaration]`)

**⟶ AND THE JUDGEMENT'S MEASURED REACH IS DECLARED AT THIS SECTION, 2026-10-26 — FOUR NARROWINGS THE CLAUSE ABOVE DOES NOT NAME AND `D-40`'S ONE SPATIAL SCOPE, EACH MEASURED AT THE TREE THAT CARRIED THE ARM.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the clause's three items and their stamp — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside it. It moves no position, no arity, no verb, no member, no rank, no register row and no count, and it re-decides no rule of the clause it stands beside.** **AND ITS PREMISE, SAID FIRST SO IT IS NOT SOUGHT: THE CARRIER ITEM 3 ABOVE OWED HAS LANDED (2026-10-26)** — `bindings/js/src/entry/constraints.mjs`'s `reversalWatch` and `judgeReversal`, reached from `bindings/js/index.mjs`'s `rollback` member before and after the reversal's one call — **so item 3's *"the observable is NOT yet"* and its *"NO CELL ASSERTS THE REFUSED-REVERSAL ARM"* are read THROUGH this clause as the record of the instant they were filed; the arm is observable at `tests/e2e/downstream-claims.test.mjs`'s `DEF-W` cell.** **A CLAUSE THAT PROMISES MORE THAN THE CODE DELIVERS IS THE DEFECT CLASS THIS DIRECTION EXISTS TO CLOSE, SO THE FOUR NARROWINGS AND THE ONE SPATIAL SCOPE ARE WRITTEN DOWN HERE RATHER THAN LEFT TO A READER'S MEASUREMENT.**
1. **"A REVERSAL IS JUDGED" HOLDS AT REST ONLY — A REVERSAL INSIDE AN OPEN COMMIT IS AN UNWINDING STEP AND IS NOT JUDGED.** **The judgement is taken where the store owns no open commit** (`reversalAtRest`, **⟶ RE-SOURCED 2026-10-26, ANNOTATE-BESIDE: IT READS THE INSTANCE KERNEL'S OWN OPEN-ATTEMPT MAP — `kernelFor(instance).live.size === 0` — AND NOT the symbol channel named here**, which stands as the reading of its own date; **the channel itself survives** (`finalizer-and-teardown.md §4.2` item 1, installed by `state.mjs` and read by the S-COMMIT/V-13 drives), **and the discriminator has no arm left on which the measurement is missing**: an own `size` off an instance-owned record cannot be absent, forged or throwing, so no lawful call can quietly answer "a step". **The superseded form's `typeof` guard and its `catch` both answered the conservative side, buying a MISSED judgement rather than a wrong one — a terminal reversal going unjudged, which is `DEF-W`'s promise silently undelivered.** The reading that follows is the reading of its own date: reading the declared channel `Symbol.for('provident-storeroom.attempt-count')` on the instance — `finalizer-and-teardown.md §4.2` item 1, the seam `docs/specs/storeroom-addon-adoption/contract.md`'s `P-ADA-5` clause of 2026-10-20 names: *"the number of OPEN COMMITS for THAT store, a non-negative INTEGER"*, a pure read that spends the count without touching anything): a caller's `rollback` at the surface, where the state the reversal leaves is the state the caller then reads. **A reversal performed INSIDE an open commit — from a constraint body, from a repair, from a listener, or from the kernel's own failing-attempt floor call (`kernel-terminal.mjs`'s `composeRollback`) — leaves a state the open window will move again, AND IT IS NOT JUDGED, BECAUSE JUDGING IT WOULD INVOKE BODIES MID-ATTEMPT AND BREAK `D-40`'S *"a failed attempt leaves the store exactly as it found it"*:** the attempt is already evaluating the very bodies a judgement would ask, the state such a reversal leaves is not the state that stands, and the arm `D-40` declares is DEFINED to leave the store exactly as it found it — a state a registered constraint has already approved, or the attempt would not have started from it. **So the promise is the AT-REST reversal's and no wider, and a drive that reads *"a reversal is judged"* over an in-commit reversal has read a clause this item narrows.**
2. **DISABLED PAIRS ARE NOT JUDGED, THOUGH `constraints()` LISTS THEM.** **The judgement asks only pairs whose `enabled === true`** (`carryConstraint` writes `enabled: true`; the enable arm sets it back `true` after its own `K-1`; the disable arm purges the store's standing and sets it `false`) — **AND THE REASON IS THE PAIR'S OWN: A DISABLED PAIR CANNOT FIRE, SO NOTHING IT WOULD REFUSE CAN HAVE RUN.** **The declaration that governs the disable is *"disabling cannot fire — nothing runs"* (`DEF-2026-10-20-F`; `withdrawStanding`), and a reversal is not the act that wakes it.** **`constraints()` remains the enumeration of every pair the entry carries, disabled ones included — the two readings are of two different acts, and neither contradicts the other once this item says which is which.**
3. **PAIRS REGISTERED STRAIGHT THROUGH `K-1` ARE NOT IN THE STATE THE JUDGEMENT READS.** **The judgement reads the PACKAGE'S OWN REGISTRY RECORD** — `state.constraints`, the `Map` keyed by `constraintPairKey(address, id)` whose every value `carryConstraint` writes — **and that record is written at ONE act: `carryConstraint`, which is the site the package's declared registration routes reach** (`storeCreate`'s `cfg.constraints` batch and `addConstraint`; `surface.md §2.12` items 1–3). **A CONSUMER WHO REGISTERS A PAIR STRAIGHT THROUGH THE KERNEL'S `K-1` HAS A PAIR THE KERNEL WILL EVALUATE AT WRITES, AND IT IS NOT IN THE STATE THE REVERSAL'S JUDGEMENT READS** — so it is not judged at a reversal (and it is not enumerated by `constraints()`, the same fact read the other way). **WHAT THAT MEANS FOR A CONSUMER, SAID PLAINLY: THE PACKAGE'S DECLARED REGISTRATION ROUTES ARE THE ONES THIS PROMISE COVERS; a pair placed by a kernel-direct call is outside it, and a consumer that wants the reversal's judgement takes a declared route.**
4. **THE `log` FOR A NO-ATTEMPT REFUSAL IS AUTHORED BY THE REFUSAL ITSELF — ONE KERNEL-SHAPED `constraint-check` ENTRY.** **`§2.5`'s item 4 defines `log` as THE ATTEMPT'S own message log and offers `[]` where the cause has no attempt at all; NO ATTEMPT STANDS AT A REVERSAL'S JUDGEMENT** (the evaluation's context carries `attempt: null` and `op: null`, and a reversal is not a landing), **so the member's own definition has no list to carry here, and the arm is DECLARED rather than inferred: `log` IS `[one entry]`** — the kernel's own six-member `LogEntry` shape (`kernel-surface.md §2.5` item 1: `seq` · `kind` · `id` · `message` · `opId` · `state`), **`kind` `constraint-check`, `seq` `1`, `id` the refusing pair's own id, `message` naming the constraint, the address and the value the reversal left, `opId` the store's own echo of the id the reversal named or `null`, and `state` `null`** (no `KC` token crosses at this arm; `A120` (2)). **IT IS THE REFUSAL'S OWN RECORD AND NOT AN ATTEMPT'S** — no attempt's log exists to carry verbatim, and `[]` would report *"no attempt"* as an absence of fact where the refusal has one fact to state. **A DRIVE THEREFORE ASSERTS `log.length === 1`, `log[0].kind === 'constraint-check'` AND `log[0].id` THE REFUSING PAIR'S ID; and a consumer that reads `log` as *"the attempt's entries"* has read an arm this item declares differently.**
5. **AND `D-40`'S SENTENCE HAS NO SPATIAL SCOPE: THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE, AND AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED.** **The ruling's sentence — *"a failed attempt leaves the store exactly as it found it"* — is measured true of the ATTEMPT'S OWN address and FALSE of a BESIDE address:** **the store's rollback scope is the ADDRESSED SUBTREE at or after the named op's own `seq`** (`src/store.rs`'s `rollback`, the `is_prefix(&address, &entry.address) && entry.seq >= floor` filter — the temporal floor of `M-5` item 1 and the spatial scope it never named), **so an op a repair landed at an address OUTSIDE that subtree is in NO candidate set of the floor call: it is undone by no step, and its value STANDS after the failed attempt.** **THE SPATIAL SCOPE, STATED SO IT IS NOT LEFT TO A MEASUREMENT: THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE; AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED.** **ITS MEASURED REACH IS `tests/e2e/blind-constraints-v2.mjs`'s `E2E-C-9` cell 6 — whose assertion is UNMOVED and whose citation is re-derived to THIS clause at that cell** — **the cell names every op of the attempt at `['a']` in the floor call's candidate set, names the repair's op at `['b']` in NO step's `undoneOps` and in NO step's `opId`, and reads the beside address's value as STANDING.** **AND THIS ITEM MOVES NO STORE BYTE AND NO RULING: `D-40`'s sentence stands as the ruling filed it, and this item declares the scope its own measurement gives it.**
`[T: the reversal's measured reach — the four narrowings the declaration does not carry, the no-attempt refusal's `log` arm, and `D-40`'s spatial scope, on the architect's ruling of 2026-10-26 (`DEF-W`) | state or fail-state declaration]`)

**⟶ AND TWO OF THIS CLAUSE'S ITEMS ARE CORRECTED, 2026-10-26, SECOND ANNOTATE-BESIDE AT THIS SECTION — THE SPATIAL SCOPE IS SUPERSEDED AND A REFUSAL UNDOES THE REVERSAL IT REFUSED.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, this clause's five items and both stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them and re-decides no rule they state, beyond the two items it names as superseded. It moves no position, no arity, no verb, no member, no rank and no store byte, and `D-40`'s ruling stands as the architect filed it.**
1. **ITEM 5'S SPATIAL SCOPE IS SUPERSEDED: THE COMPOSITION ISSUES ONE FLOOR CALL PER DISTINCT ADDRESS THE ATTEMPT'S OWED OPS TOUCHED, AND `D-40`'S SENTENCE THEN HOLDS OF THE ATTEMPT'S WHOLE FOOTPRINT.** **What item 5 measured is TRUE OF THE ONE CALL it described and of nothing else**: the store's scope is the addressed subtree at or after the named op's `seq`, so a repair that landed at a BESIDE address was in no candidate set and its value stood — *"a failed attempt leaves the store exactly as it found it"* holding of one address and false of another. **THE STORE'S FLOOR IS PER ADDRESS, SO THE CURE IS PER ADDRESS**: `bindings/js/src/entry/kernel-terminal.mjs`'s `composeRollback` now calls the store's `rollback` **once per distinct address, at that address's own first owed op** (`floorCallPlan`) — **NO PER-OP WALK IS RESURRECTED** (item 2 of the clause above stands whole: the composition is still one call per address and never a sequence of per-op approvals). **THE CALLS ARE ORDERED SO A LATER ONE CANNOT RE-COMPACT WHAT AN EARLIER ONE UNDID, AND THE RULE IS STRUCTURAL RATHER THAN EMPIRICAL**: addresses are taken SHALLOWEST FIRST (segment count ascending, creation order within a length), the call's floor is THAT ADDRESS'S OWN FIRST OWED OP — never an op beneath it, because the store's scope carries the named op's address and a deeper call cannot reach the shallower address's own entries — and a candidate is SKIPPED in either of the two cases the store's law creates: **COVERED** (an issued address is a prefix of it and that call's floor stands at or before its own first owed op, so that call already swept it) or **UNREACHABLE** (an issued address is a prefix of it and that floor stands AFTER its own first owed op while it still has an owed op at or after that floor — the outer call has compacted the later entries, so a second call would meet the compacted mark and undo nothing; THE OUTER ADDRESS IS KEPT AND THE INNER ADDRESS'S EARLIER ENTRIES STAND). **THE ISSUED CALLS' CANDIDATE SETS ARE THEREFORE PAIRWISE DISJOINT** — no call can see an entry an earlier one compacted — **so no later call can re-compact what an earlier one undid and `RollbackCompacted` is not produced by the composition's own ordering.** **AND ONE ORDERING FACT IS SUBSTANTIVE RATHER THAN BOOKKEEPING: THE OUTER ADDRESS GOES FIRST**, because a repair that landed at an ancestor replaced the subtree with a leaf, and a container's shape must be back before a value is set into it. **THE ARM IS UNMOVED**: a call that throws either floor code is `KC-8` in the attempt's one `outcome` entry (item 5 (b) above), and where several calls are issued the FIRST floor met is the arm's, the steps before it standing in the report beside it. **ITS MEASURED REACH IS `tests/e2e/blind-constraints-v2.mjs`'s `E2E-C-9` cell 6, WHOSE EXPECTATION MOVED TOWARD THE REPAIRED BEHAVIOUR AT THAT CELL** — the beside address is SEEDED and the cell asserts it answers its seeded value after the failed attempt, the attempt's own address answers what stood there before it, the steps number one per distinct address at each address's first owed op, and every op of every touched address is named in a step's `undoneOps`; the row's older assertion (the beside address NOT restored) is withdrawn as the record of the instant it was filed. **AND THE `DEF-M` CELL IS UNMOVED AND GREEN: the failing repaired write still leaves the attempt's own address at the seed** (`tests/e2e/downstream-claims.test.mjs`). **AND WHAT THIS ITEM STILL CANNOT HONOUR, SAID PLAINLY**: where the attempt wrote at a DESCENDANT and its repair landed at an ANCESTOR of that address, the ancestor's call puts the container back and the descendant becomes readable again, **but the store's own `restore` for the descendant's op does not reach into the re-minted container** — measured, `['a']` answers `{b: 99}` where the pre-attempt standing was `{b: 0}` — **and where a nested address has owed ops on both sides of an outer call's floor the inner address's EARLIER entries stand** (the UNREACHABLE case above). Both are the store's `rollback`/`restore` limits read at `src/store.rs`, not this composition's ordering, and neither is claimed as restored.
2. **A REFUSED REVERSAL IS UNDONE: THE PRE-REVERSAL STANDING IS RESTORED BEFORE `ConstraintPassRefused` IS THROWN, AND THE REFUSAL'S LOG SAYS SO.** **The shape the first `DEF-W` pass measured and chose — the refusal answered AFTER the reversal and the reversal's effect STANDING — left the store in a state NO constraint approved, which is the very thing `DEF-W` was filed about: a refusal that reports the violation while leaving it is not a discharge.** **SO: `bindings/js/src/entry/constraints.mjs`'s `judgeReversal` takes the set of addresses the reversal MOVED (the watch's `{entry, address, before}` list, read again after the reversal), and where the judgement refuses it RESTORES every one of them to the `before` it captured — through `restoreReversal`, which clears the address on every tier and sets the standing value at `mem` — THEN throws the surface's one plain form.** **THE RESTORE IS NOT JUDGED AND IT RECURSES INTO NOTHING**: it is a COMPENSATING ACT and not a consumer write, it reaches the store's own verb AT ITS ENTRY (the boundary's carriers, bound to the instance), so no `K-2` opens, **no pass runs, no pair body is asked a second time, no listener is delivered and `judgeReversal` is not re-entered** — the judgement's one pass over the pairs stays one pass and `D-40`'s floor law is not re-walked by it. **AND A CONSUMER IS TOLD**: the refusal's `log` stays `[one entry]` of the six kernel-shaped members (item 4 above, whole), **and that entry's `message` now states that the reversal was UNDONE — or, where a restore could not be taken, names the address still standing at the refused state — so no consumer is left believing the store holds a state the judgement refused.** **THE CROSSED `status` IS UNMOVED** (rank `20`, `ConstraintPassRefused`), **the crossed `message` stays the store's own generated sentence** (`DD-52`), **no member is added to the thrown form** (`{status, message, log}`, three), **and a LAWFUL REVERSAL IS UNCHANGED, member for member**: same `{opId, undoneOps, restoredTo}`, no throw, no log, and nothing restored. **ITS MEASURED REACH IS `tests/e2e/downstream-claims.test.mjs`'s `DEF-W` AND `DEF-W (2)` cells, both re-derived at this date**: the refused arm reads the PRE-REVERSAL standing and its log says the reversal was undone with no listener delivered and no second ask of the pair, and the at-rest control reads the same. **WHAT THIS CLAUSE DOES NOT CLAIM, SAID PLAINLY: the restore's footprint is the ENABLED PAIRS' addresses the watch reads** — a reversal that moves a value at an address no enabled pair watches is not restored by this act (item 3 of the clause above: a pair placed straight through `K-1` is outside the judgement's state), **and the standing is restored at the canonical `mem` tier**, the cross-tier reading the judgement itself took.
`[T: the reversal's judgement, corrected — one floor call per distinct address with `D-40`'s footprint restored, and a refusal that undoes the reversal it refused, with what each still cannot honour named | state or fail-state declaration]`)

**⟶ AND ITEM 1'S *AT REST* IS CORRECTED TO A CONJUNCTION, 2026-10-26, THIRD ANNOTATE-BESIDE AT THIS SECTION — *AT REST* = NO OPEN COMMIT **AND** NO LIVE ATTEMPT.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two items of its second, and all three stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member, no rank, no register row and no store byte, and it re-decides no rule beyond the one reading it names as superseded.
1. **THE DISCRIMINATOR'S READING IS TWO MEASUREMENTS, AND ITEM 1'S *"IT READS … `kernelFor(instance).live.size === 0`"* IS SUPERSEDED AS THE WHOLE READING.** **THE MEASURED DEFECT FIRST: MAKING THE DISCRIMINATOR UNFAILABLE LOOSENED IT, because the two structures it could read MEASURE DIFFERENT THINGS.** **AN OPEN COMMIT IS A SCOPE** — `state.mjs`'s `attemptIndex(store).open`, a DEPTH COUNTER over the store's in-flight VERB WINDOWS (*"a verb that finds an extant commit joins it rather than opening a second, which is what keeps the count exact under nesting"*), one observer firing per commit that OPENS; **it is the structure THIS ITEM'S OWN WORDS name** (*"where the store owns no open commit"*). **A LIVE ATTEMPT IS A RECORD** — `kernelFor(instance).live`, written at `K-2` and cleared at `release`, carrying the pair evaluations, the log, the ops and the `KC` tokens. **THEY DIVERGE IN BOTH DIRECTIONS, AND EACH DIVERGENCE IS A WINDOW THIS ITEM FORBIDS THE JUDGEMENT IN**: a listener body inside the caller's own `write` sees **open commit `1`, live `0`**, and a kernel-driven `K-2`/`K-3` pass sees **open commit `0`, live `1`**. **SO THE READING OF 2026-10-26 THAT TOOK `live` ALONE JUDGED INSIDE THE CALLER'S OWN VERB WINDOW — the very thing this item forbids** — *"BECAUSE JUDGING IT WOULD INVOKE BODIES MID-ATTEMPT AND BREAK `D-40`'S 'a failed attempt leaves the store exactly as it found it'"*: **the ground of this correction is THIS ITEM'S REASON, and not a measurement of convenience.**
2. **THE CORRECTED FORM, AND IT IS STILL UNFAILABLE.** `bindings/js/src/entry/constraints.mjs`'s `reversalAtRest` answers **`openCommits(instance) === 0 && kernelFor(instance).live.size === 0`**, where **`openCommits` is `bindings/js/src/entry/state.mjs`'s EXPORTED PLAIN ACCESSOR** over the same per-store index the symbol channel answers — **and NOT the channel**, whose callable can be absent or throwing. **The accessor CREATES ITS INDEX ON MISS exactly as `kernelFor` creates its record, so it answers a number on every path and cannot answer `undefined`;** there is therefore **no `typeof` guard, no `try`/`catch` and no fallback branch anywhere in the discriminator** — the shape the superseded form's conservative arms had, which bought a MISSED judgement rather than a wrong one. **THE CHANNEL ITSELF SURVIVES UNCHANGED** (`finalizer-and-teardown.md §4.2` item 1's read seam, installed by `state.mjs`, read by the S-COMMIT/V-13 drives, and answered off the same `attemptIndex` record). **THE SEMANTICS ARE UNCHANGED, MEMBER FOR MEMBER**: AT REST ⇒ the watch is taken and the reversal is JUDGED; ANY OTHER ANSWER ⇒ `reversalWatch` answers `[]`, no address is read and no constraint body is invoked.
3. **THE CELL IS RE-DERIVED ON THE CONJUNCTION, AND IT BITES IN BOTH DIRECTIONS.** `tests/e2e/downstream-claims.test.mjs`'s `DEF-W (3)` drives the THREE windows and asserts each: **the listener-inside-the-write instant (open `1`, live `0`) is NOT AT REST ⇒ NOT JUDGED** — the call answers its declared record and the pair is never asked at the state the reversal left, **which is THE HALF THAT FLIPS**, and it flips on this item's reason and not because the code now does it; **the kernel-driven pass (open `0`, live `1`) is NOT AT REST ⇒ NOT JUDGED** — unchanged in outcome, now grounded on the live attempt; **a terminal reversal (open `0`, live `0`) IS JUDGED** — `ConstraintPassRefused` with its one-entry `constraint-check` log naming the refusing pair. **AND THE TWO REVERTS ARE MEASURED, EACH RED IN ITS OWN DIRECTION**: with the discriminator read as `live` ONLY, the flipped arm reddens (the judgement's third ask arrives at the state the reversal left); with it read as the OPEN-COMMIT COUNT ONLY, the kernel-driven arm reddens (the pass's reversal throws `ConstraintPassRefused` out of the body's own call). **The conjunction is the only form that satisfies both, which is what makes neither conjunct droppable.**
4. **WHAT THE CONJUNCTION STILL CANNOT SEE, STATED SO IT IS NOT LEFT TO A MEASUREMENT.** Both conjuncts are the STORE'S OWN structures, so **a caller's COMPOSITION is not measured**: a `rollback` issued between two of the caller's own separate verbs is judged, because at that instant the store owns no open commit and no open attempt and the state the reversal leaves is the state the caller then reads — that is this item's declared scope and not a blind spot. **And a store act that holds NEITHER structure while it moves state is outside the measurement to the same degree**: `removeConstraint` (whose purge travels `K-6 → removeListener → the store's own purge`) and the judgement's own compensating restore (`judgeReversal`'s `restoreReversal`, which reaches the store verb at its entry) open no commit and hold no attempt — **neither invokes a pair body, so no judgement can be taken mid-attempt there and the promise this item narrows is not silently withheld; but the count this clause reads is not a census of every act in flight in the store, and a future act that evaluates bodies outside both structures would not be seen by it.**
`[T: the reversal's at-rest discriminator, corrected to a conjunction — no open commit and no live attempt, the plain exported accessor that keeps it unfailable, the re-derived cell and its two reverts, and what the conjunction still cannot see | state or fail-state declaration]`

**⟶ AND ITEM 4'S `seq` AND THE SECOND ANNOTATE-BESIDE'S RESTORE ARE CORRECTED, 2026-10-27, FOURTH ANNOTATE-BESIDE AT THIS SECTION — THE ENTRY CARRIES NO `seq`, THE RESTORE PUTS BACK THE TIER IT STOOD AT, AND A JUDGEMENT THAT THROWS FAILS CLOSED.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, and all four stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them. It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row and no store byte.** Its authority is `strata/decisions.md` · `D-41` items `2` and `4` (2026-10-26), which records what the adjacent consumer measured against the published `1.0.1`.
1. **ITEM 4'S *"`seq` `1`"* IS WITHDRAWN, AND NO ORDINAL IS MINTED.** The kernel's `seq` is the ordinal WITHIN AN ATTEMPT'S OWN LOG (`kernel-surface.md §2.5` item 1; `bindings/js/src/entry/kernel-foundations.mjs`'s `append`, `attempt.log.length + 1`, renumbered when an entry is withdrawn) — **and no attempt stands at a reversal's judgement, so there is no log whose ordinal this entry's could be and no member of any record here it could be read from.** The `1` was therefore a member with no record behind it. **THE ENTRY NOW CARRIES THE OTHER FIVE MEMBERS AND NO `seq`** — `kind` · `id` · `message` · `opId` · `state` — **and a drive asserts the five and `seq`'s ABSENCE** (`tests/e2e/downstream-claims.test.mjs`'s `NO_ATTEMPT_LOG_MEMBERS`, and `tests/e2e/refused-reversal-restore.test.mjs`). The rest of item 4 stands whole: the entry is the refusal's own `constraint-check` record, `id` the pair's, `message` naming the constraint, the address and the value the reversal left, `opId` the store's own echo or `null`, and `state` `null`.
2. **THE SECOND ANNOTATE-BESIDE'S *"`restoreReversal`, which clears the address on every tier and sets the standing value at `mem`"* IS SUPERSEDED — THAT FORM DESTROYED DATA, AND THE WATCH NOW CAPTURES THE TIER.** **THE MEASURED DEFECT (`D-41` item `2`): a `file`-tier value was DESTROYED by a REFUSAL that then told the consumer every address *"stands again at its pre-reversal state"*; and where the terminal standing was ABSENT the restore could not succeed at `200` of `200`** — `src/store.rs`'s `delete` answers `AddressNotFound` at a key holding no anchor, so the first act failed and the captured value was never written at all. **THE CORRECTED FORM, AT ITS LIMBS:** `reversalWatch` captures, for every enabled pair's every address, **the cross-tier standing the judgement reads AND every tier at which the address stood with that tier's own value, beside the tier that standing was drawn from** (`src/args.rs`'s `read_tier_sel` is the same `read` narrowed to one tier); **`restoreReversal` writes each captured tier back AT ITS OWN TIER, most persistent first** (`STANDING_TIERS`, because a write purges the versions it outranks and that order is what reconstructs a shadow); **it does not clear a tier it cannot repopulate** — the only tiers it removes are the ones that stand after the reversal and stood at no tier before; **where the pre-reversal state was ABSENT it removes what the reversal left**, `AddressNotFound` answering the state owed rather than a failure; **and the act is VERIFIED** — the address is read again and counted restored only where the standing and the tier set both equal the capture. **THE MESSAGE IS HONEST**: the entry may say *"the reversal was UNDONE"* only where every address it moved stands again exactly as it stood, and otherwise it says *"the reversal was NOT undone"*, **names each address that could not be restored, says what stands there instead and what it was owed** (`D-41` item `2`: *"a message must not claim a restoration that did not happen"*). **THE CROSSED `status` IS UNMOVED** (rank `20`, `ConstraintPassRefused`) and **the thrown form's member set is unmoved** (`{status, message, log}`, three). **WHAT IT STILL CANNOT PUT BACK IS NAMED AT `restoreReversal` ITSELF AND NOT LEFT TO A MESSAGE**: a shadow standing at DIFFERENT tiers at different depths of one branch is captured as the branch's own tier readings, and an address whose PARENT the reversal moved out of a reachable tier cannot have a higher tier written back (the store's monotonicity clause) — that address is reported, and the restore performs no file I/O at any tier (`§7.2` item 1), exactly as the reversal it compensates.
3. **AND A CONSTRAINT BODY THAT THROWS AT THE JUDGEMENT FAILS CLOSED.** **THE MEASURED DEFECT (`D-41` item `4`):** the throw propagated out of the judging call **with the reversal's effect STANDING and the refusal's `log` `[]`** — the reversal had already happened, so the store was left at the state nobody could judge and the consumer was told nothing. **A reversal nobody could judge is a reversal nobody could approve**, so the arm is the violating arm's treatment: **the reversal is restored and the call refuses with a `log` that NAMES THE THROWING PAIR** — one `constraint-check` entry, `id` the pair's, its message naming the pair and the state the reversal left and what the compensating act did. **THE CROSSED `status` IS THE BODY'S OWN RANK-`18` MEMBER** `ConstraintBodyThrew` (`DEF-S`; `docs/specs/storeroom-native/contract.md §8.1` #18), whose generated sentence is the crossed `message` (`DD-52`): **the code says what happened — a body threw — while the treatment is the violation's.** **THAT CODE STAYED WITH THE RANK `20` MEMBER FOR A VIOLATION, AND `D-40`'S NO-PER-OP-WALK IS UNTOUCHED**: the restore is the same compensating act, it holds no commit and no attempt, and the judgement is still one pass over the pairs.
`[T: the refused reversal's store — a log entry with no `seq`, a tier-exact restore that does not destroy data and answers the absent cases, an honest message, and a judgement that fails closed when a body throws (`D-41` items `2` and `4`) | state or fail-state declaration]`

**⟶ AND THE FOURTH ANNOTATE-BESIDE'S ITEM `1` — *"ITEM 4'S `seq` `1` IS WITHDRAWN, AND NO ORDINAL IS MINTED"* — IS SUPERSEDED, 2026-10-28, NINTH ANNOTATE-BESIDE AT THIS SECTION: THE ENTRY CARRIES THE DECLARED SIX, `seq` INCLUDED, AND `1` IS ITS OWN PLACE IN THE ONE-ENTRY LIST.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five of its first annotate-beside, the two of its second, the four of its third, the three of its fourth, the five of its fifth, the five of its sixth, the seven of its seventh and the six of its eighth, with all their stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row, no store byte and no member of any record. Its authority is `strata/decisions.md` · `D-48`'s **`DEF-AI`** row — *"a log entry missing a field its own declaration requires"* — read with `D-39`, whose ordering key that row forbids weakening to match an entry.

1. **WHAT THE 2026-10-27 PASS READ RIGHT, AND THE ONE THING IT READ WRONG.** It was right that `seq` is minted by `append` as **the ordinal within the list the entry stands in** (`bindings/js/src/entry/kernel-foundations.mjs`, `log.length + 1`) and that **NO ATTEMPT LOG STANDS at a reversal's judgement** — which is why no attempt's ordinal may be borrowed. **IT WAS WRONG ABOUT THE MEMBER'S DECLARED DOMAIN**: `kernel-surface.md §2.5` item 1 declares `seq` as *"the append ordinal, strictly increasing from `1` in array order"*, and **the array this entry stands in is THIS REFUSAL'S OWN ONE-ENTRY LIST** — its first element's ordinal is `1` **by that rule**, computed by the same arithmetic `append` performs on the list the entry stands in. **`1` was therefore never fabricated; it was the ordinal of a list of one, and the reading that struck it struck the ordering key `D-39` exists to pin.**
2. **AND THE TWO COPIES OF THE VERY SAME ENTRY ALREADY DISAGREED, WHICH IS THE DEFECT CLASS ITSELF.** `constraints.mjs`'s `carryRestartRefusal` re-appends the refusal's entry into the attempt's log **through the kernel's own `append`**, where it carries `seq` — while the list that crossed to the caller carried none: **one entry, two shapes.** **THE CONSUMER MET THE SECOND**, because `log` is declared `LogEntry[]` (`bindings/js/index.d.ts`, whose `LogEntry` declares `readonly seq: number`), so the crossing handed a consumer `undefined` where `number` is declared. **THE DECLARATION IS NOT WEAKENED TO MATCH THE ENTRY — THE ENTRY NOW CARRIES THE MEMBER**, and the entry's member set is the kernel's closed six at every arm.
3. **THE CELLS, AND WHAT THEY NOW ASSERT.** `tests/e2e/downstream-claims.test.mjs`'s `NO_ATTEMPT_LOG_MEMBERS` (the `DEF-W (3)` arms), `tests/e2e/in-commit-restart.test.mjs` (the `D-42` arms `1` and `2`), `tests/e2e/direct-pass-restart.test.mjs` arm `(3)` and `tests/e2e/refused-reversal-restore.test.mjs`'s `D-41` absent-case arm are **RE-DERIVED from `seq`'s ABSENCE to `seq === 1`**, each naming this clause and `D-48` · `DEF-AI`. **`seq`'s place in the list is the one thing that moved**: the entry's `kind` · `id` · `message` · `opId` · `state`, the crossed form's three members, the rank-`20`/`18` statuses and the message's several arms are UNMOVED.
`[T: the refused reversal's own log entry — the declared six members, `seq` included as the ordinal of the one-entry list it stands in, superseding the 2026-10-27 withdrawal (`D-48` · `DEF-AI`; `D-39`'s ordering key) | state or fail-state declaration]`

**⟶ AND THE SECOND ANNOTATE-BESIDE'S *"`restoreReversal` WRITES EACH CAPTURED TIER BACK AT ITS OWN TIER"* IS SUPERSEDED, 2026-10-27, FIFTH ANNOTATE-BESIDE AT THIS SECTION — THE RESTORE IS THE STORE'S OWN, FROM ITS OWN JOURNAL.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, and the three of its fourth — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** Its authority is the architect's ruling of **2026-10-27**, taken over the alternative of exposing a journal read.
1. **WHAT MOVED, AND WHY THE WRITE PLAN WAS THE WRONG INSTRUMENT.** `restoreReversal` (`bindings/js/src/entry/constraints.mjs`) **NO LONGER WRITES OR DELETES ANYTHING**: it calls ONE store verb — `restoreMark`, the journal's second consumer beside `rollback` (`docs/specs/storeroom-native/contract.md §6.6`) — and the STORE returns its own state to the state its journal's head describes. **THE CAPTURE-AND-WRITE COULD NOT REACH TWO SHAPES, AND BOTH ARE NOW CELLS THAT BITE** (`tests/e2e/refused-reversal-restore.test.mjs`): a **MIXED-DEPTH SHADOW** — a subtree whose nodes stand at different tiers at different depths, which the watch records only as the pair's own per-tier readings, so writing the pair's assembled value back at the pair's tier MOVES the descendant's tier with it — and the **HIGHER-TIER/PARENT** case — a `file` version whose parent the reversal left at `mem`, a state `§3.4`'s monotonic clause REFUSES to write at all. **AND IT REWROTE BY HAND WHAT THE STORE REPLAYS EXACTLY**: the journal holds every operation's address with its before AND its after, per version and per tier, and the mark restore re-states that record.
2. **THE MARK IS THE JOURNAL'S HEAD, AND THE CALL NAMES IT BY SUPPLYING NO POSITION.** A reversal appends no entry (`contract.md §6.4` `M-9`), so after it ran the journal's head still describes the pre-reversal state; the position is handed as the carrier's ABSENT arm, which the store reads as the head. **`status` IS UNMOVED** (rank `20`, `ConstraintPassRefused`), **the thrown form's member set is unmoved** (`{status, message, log}`, three), **a LAWFUL reversal is unchanged member for member**, and **`D-40`'s no-per-op-walk is untouched**: the restore opens no `K-2`, runs no pass, delivers no listener, asks no pair body a second time and appends no journal entry.
3. **WHAT THE CAPTURE SURVIVES AS, STATED SO IT IS NOT READ AS A FALLBACK.** `reversalWatch`'s per-tier capture is still taken and is still the ONLY record of **what was owed**: it is the DEBT'S RECORD and the VERIFICATION BASELINE, not a write plan. Every address the reversal moved is read again after the store's act and **counted restored only where the standing AND every tier with its own value equal the capture**, so the message may say *"the reversal was UNDONE"* only where the store reports the state restored AND the verification agrees. **WHERE IT CANNOT, IT SAYS SO**: the sentence names each address that could not be restored, **what stands there instead and what it was owed, and how many addresses stand again** (`D-41` item `2`: *"a message must not claim a restoration that did not happen"*), and **where the store itself refuses the mark** (`JournalOpUnknown`, a mark its journal no longer holds) the message opens with the store's own status and its own generated sentence (`DD-52`) and claims nothing. **THAT LIMB IS NOT REACHED THROUGH A CONSUMER CALL TODAY AND THE RECORD SAYS SO RATHER THAN IMPLYING IT IS DRIVEN**: the head mark is always in the journal, so the store refuses only for an op id no consumer verb here can name — its ground is driven at the store's own battery (`tests/integration/store-core/journal_and_rollback.rs`'s `s6_6_an_unknown_mark_refuses_journal_op_unknown_and_changes_nothing`), and the branch stays as the fail-closed limb it always was.
4. **WHAT IS STILL TRUE OF THE RESTORE'S REACH.** It performs no file I/O at any tier (`§7.2` item 1), exactly as the reversal it compensates, and **its footprint is now the journal's own record of the reversal rather than the enabled pairs' addresses** — every entry the reversal undid is re-stated, including addresses no pair watches. **THAT IS THE RULING'S SUBSTANCE AND NOT A WIDENING BY ACCIDENT:** the state a refusal must not leave behind is the state the reversal produced, and the store's record of it is complete where a per-address capture was not.
`[T: the refused reversal's restore, re-derived to the store's own journal mark restore — the two shapes the capture could not reach, the capture's survival as the debt record, the honest message and its undeclared-reach limb (`D-41` item 2 read forward) | state or fail-state declaration]`

**⟶ AND THE RESTORE'S FILE BEHAVIOUR MOVES, 2026-10-27 — THE ARCHITECT'S RULING, VERBATIM: *"Update file after a restore that touches file-tier nodes."*** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — item `2`'s *"the restore performs no file I/O at any tier (`§7.2` item 1), exactly as the reversal it compensates"* and item `4`'s restatement of it included — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** **THE SENTENCE IS SUPERSEDED BECAUSE ITS REASON WAS THE DEFECT:** the store's mark restore now SAVES where it moves a version standing at `Tier::File`, **because the bytes at `cfg.filePath` otherwise describe the PRE-restore state and `§7.2` item 6's boot READS THEM** — a second instance over the same path answered a state the journal no longer described. **THE DECLARATION IS THE STORE'S AND ITS ONE HOME IS `docs/specs/storeroom-native/contract.md §6.6` item 5's clause of this date** (the detection — the `file` tier's projection compared before and after the replay; the save's identity — the same commit a `file`-tier write performs; and the failed save's report), **and this clause declares only what MOVES ON THIS SIDE:** `restoreReversal` classifies the store's answer — **a REFUSED MARK** (`JournalOpUnknown`, `AddressMalformed`) still counts no address restored and says the store holds what it held; **a FAILED SAVE** (`FileCommitFailed`) does NOT narrow the count (the replay stood) and **the refusal's sentence opens by saying that the in-memory state was restored and the file was NOT updated, with the store's own status and its generated message beside it** (`DD-52`). **THE THROWN FORM'S MEMBER SET IS UNMOVED** (`{status, message, log}`, three), **the crossed `status` is unmoved** (rank `20`, `ConstraintPassRefused`), **no status is minted at this boundary** (`DD-40`), and **no journal entry is appended by the restore on any arm** — a save is an effect and not an op. `[T: the refused reversal's file half, landed at the boundary and declared where its subjects live; the store-side declaration is `§6.6` item 5's clause of the same date | state or fail-state declaration]`

**⟶ AND ITEM `1`'S *"A REVERSAL INSIDE AN OPEN COMMIT … IS NOT JUDGED"* IS CORRECTED, 2026-10-27 — AN ACTION INSIDE AN OPEN COMMIT RESTARTS THE CONSTRAINT CHECK.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, the three of its fourth, the five of its fifth, and all six stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row and no store byte, **and it re-decides no rule beyond the one reading it names as superseded.** Its authority is **`strata/decisions.md` · `D-42` (2026-10-26), THE ARCHITECT, VERBATIM: *"Actions inside of an open commit start the constraint check over again."*** — taken on `D-41` item `3`, which measured that this section's *"is not judged"* made **the conservative direction the permissive one**: a reversal issued inside a listener body or a constraint body was **unjudged**, so **its violating effect STOOD**, while the identical call one frame out was refused and restored.
1. **BEFORE → AFTER, AT THE ONE SENTENCE THIS CLAUSE CORRECTS.** **BEFORE:** *"A REVERSAL INSIDE AN OPEN COMMIT IS AN UNWINDING STEP AND IS NOT JUDGED … it is NOT JUDGED, BECAUSE JUDGING IT WOULD INVOKE BODIES MID-ATTEMPT AND BREAK `D-40`'S 'a failed attempt leaves the store exactly as it found it'."* **AFTER:** **A REVERSAL INSIDE AN OPEN COMMIT IS STILL NOT JUDGED AT ITS OWN INSTANT — `D-40`'s gate stands and `reversalAtRest` keeps both conjuncts, so the step is still not judged AS A STEP — AND THE ACTION IS RECORDED SO THAT THE CHECK IT INVALIDATED IS RESTARTED, FROM ITS BEGINNING, WHERE THE CHECK RUNS, once the window that held it has finished.** The two refusals this item's old wording bought are honoured **in the restart and not at the instant**: **no body is invoked mid-unwind** (the kernel's own failing-attempt floor — `composeRollback` — reaches the addon's `rollback` entry directly and never the member, so it raises no restart and invokes no body inside the composition), and **`D-40`'s failing attempt is untouched** (the restart runs on the passing arm of the terminal call alone; a failing attempt's floor has already restored the state it found).
2. **WHAT THE RESTART IS, AND WHERE IT SITS.** `bindings/js/src/entry/constraints.mjs`'s `reversalWatch` still answers `[]` for an in-commit action — **the member's own answer is unchanged and its caller in `bindings/js/index.mjs` is untouched** — and it now TAKES THE WATCH (the same reads the at-rest judgement takes, no body) and records a RESTART REQUEST on the instance's own restart record (`D-30`; a `WeakMap`, so no member is added to the product, to a record or to the kernel — `A117` (D6) stands). `judgeReversal`, called one line later with that empty list and the store's own echo of the id the reversal named, attaches the id and invokes nothing. **`constraintWrite` — the one place the write path's check runs — consumes the request AFTER the attempt's terminal arm returned**, on the PASSING arm: the check is re-run **from its beginning** (`judgeReversal` over the watch: every enabled pair, in `D-39`'s registration order, at the state the action left), **the pair the state now violates is asked and REFUSES**, and the refusal crosses as **the terminal call's own** — the same plain form `{status, message, log}`, the same rank-`20` `ConstraintPassRefused`, and **the store restored by that refusal's own compensating act** (`restoreReversal` → the store's `restoreMark`, the journal's head — and a reversal appends no journal entry, so the head describes the state that stood BEFORE the action). **A WRITE WHOSE WINDOW HELD ONLY LAWFUL ACTIONS RETURNS ITS RECORD UNCHANGED**: the restart asks, the pairs pass, and no refusal is produced.
3. **AND IT TERMINATES, AND THE BOUND IS DECLARED.** A restart asks pair bodies and a pair body MAY ACT; a request raised while a restart is running raises a new one, which the same loop consumes. **THE LOOP IS BOUNDED AT `RESTART_LIMIT` (`3`) RESTARTS PER TERMINAL ACT, AND THE BUDGET IS SPENT, NOT RESET, BY A REQUEST RAISED INSIDE A RESTART.** Past the budget the check does not pass (`D-41` item `4`'s own direction: *"a reversal nobody could judge is a reversal nobody could approve"*), so the arm refuses **in the same form and the same status**, with its one log entry saying the budget was spent rather than that a pair refused a state it never judged. **A REQUEST WHOSE WATCH SHOWS NO MOVED ADDRESS IS CONSUMED AND ASKS NOTHING**, so a lawful in-commit action costs one round and no more. **AND A REQUEST BELONGS TO THE ACT THAT RAISED IT**: the outermost check clears any request standing before it opens its own, so a request raised in a window whose check never ran — **the two declared ones are a `delete`'s delivery and a pass driven straight through `K-2`/`K-3`, neither of which holds an open commit** — dies with that window and is never attributed to a later, unrelated write.
4. **WHAT THIS ITEM STILL DOES NOT REACH, STATED SO IT IS NOT LEFT TO A MEASUREMENT.** **A reversal inside a KERNEL-DRIVEN pass (`K-2`/`K-3` called directly: no open commit, `live` `1`) is still not judged and is still not restarted** — the ruling's own words are about an open commit, it is the conjunction's second conjunct, and this clause does not widen it. **And a reversal inside a `delete`'s listener delivery holds an open commit whose window has no constraint check at all**: no pass exists to restart (a `delete` consults no constraint — `D-1-bis`), so its request dies at the next outermost write's epoch rather than being restarted. Neither arm's effect is claimed judged, and both are the record's rather than a reader's measurement.
`[T: `D-42` at section §2.6 — an in-commit action restarts the constraint check from its beginning at the terminal call, the step still unjudged, the bound and its fail-closed arm, and the two windows this item does not reach | state or fail-state declaration]`

**⟶ AND ITEM `2`'S PARENTHETICAL *"the store restored by that refusal's own compensating act (`restoreReversal` → the store's `restoreMark`, the journal's head — and a reversal appends no journal entry, so the head describes the state that stood BEFORE the action)"* IS SUPERSEDED, 2026-10-27 — THE MARK IS CACHED WHEN THE COMMIT OPENS, AND THE HEAD IS NO LONGER TRUSTED.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside it and moves no position, no arity, no verb, no member of the thrown form, no status, no register row and no store byte.** **THE RULING IS THE ARCHITECT'S, VERBATIM: *"Cache the restoreMark when opening a commit, based on the last valid state/op of the journal."*** **AND THE SENTENCE IT REPLACES IS `DEF-AE`, THE OPEN SET'S MOST SEVERE ROW — *"a write that reports refusal while its own value lands"*.** *"A reversal appends no journal entry, so the head describes the state that stood before the action"* is TRUE OF A REVERSAL TAKEN AT REST and FALSE OF ONE TAKEN INSIDE A WRITE'S COMMIT: **in the restart arm the enclosing write's OWN OP STANDS AT THE HEAD when the listener's reversal runs, so the compensation restored the write's LANDING and the refusal's own value stood — measured, `9` becoming `7`.** **The only JS-reachable route to the pre-attempt state was a mark naming the op BEFORE the attempt's first, and no declared verb named it. It is named now.**
1. **THE MARK IS TAKEN AT THE COMMIT'S OPENING, AND THE INSTANT IS THE WHOLE FIX.** `bindings/js/src/entry/state.mjs`'s `openCommit` caches, on the window it opens, the store's own `journalMark` answer (`docs/specs/storeroom-native/contract.md §6.6` item 7 — the LAST VALID MARK: an op id, or the FLOOR where the journal holds no entry) — **read in the arm that OPENS and before anything the commit will land has landed, so it names the state the commit FOUND.** **A JOIN RE-TAKES NOTHING**: a joining call appends no window and no mark, so the cache in flight stays the OUTERMOST opening's — **and which openings are outermost is `D-45`/`D-46`'s rule, unmoved**: a repair's write joins the attempt's commit (so it takes the attempt's own position and not a later one), a pass's scope joins on the production path and OPENS the one commit a direct `K-2`/`K-3` drive owes (`D-44`), and **a callback's own commit is its own opening with its own cache** — a listener body's call names nothing and opens, so the mark a listener's own attempt restores to is where ITS window opened. **The stack is one stack read beside `windows` and `externalAt`**, pushed and popped in the same two moments, so no closed window's position can be answered to a later act.
2. **AND THE RESTORE USES THE CACHE — `restoreReversal` PASSES THE CACHED MARK, NOT A HEAD.** The mark is the store's own CARRIER, held opaquely by the package and handed back verbatim (`{k:'s', v:<op id>}` for an entry, the FLOOR row where the journal held none — `crossing.rs`'s `JsOpIdArg::Floor`, `§6.6` item 8), **so the package composes no position of its own and the mark has ONE spelling: the store's.** **THE FLOOR IS WHY THE READ HAS TWO ARMS**: a commit that opened on an EMPTY journal cannot name its position by an op id once the attempt's own op is in the record, so the store's `restoreFloor` re-states the BORN state — the empty register, or the booted `file`-tier image where one was loaded.
3. **A WINDOW WITH NO CACHE IS A WINDOW THAT NEVER OPENED: THE ACT REFUSES RATHER THAN FALLING BACK TO THE HEAD.** The head is the value this clause exists to stop trusting, so a silent fall-back would restore it while the consumer was told the reversal was undone. **The refusal is the ACT'S and not the CALL'S** — no store verb is invoked, **no status is minted** (`DD-40`), the crossed form and its member set are unmoved, every address the reversal moved is reported as NOT restored with what stands there instead, and the log entry says the window carried no cached mark.
4. **AND THE AT-REST JUDGEMENT OPENS ITS OWN WINDOW, WHICH IS `D-44`'S OWN INVARIANT AND `DEF-AE`'S OTHER HALF.** The at-rest judgement was **the one constraint check that ran outside a commit** (`reversalAtRest` had already decided on the count it found — `open` `0`/`live` `0` — so the discriminator's reading is unmoved); `judgeReversal` now opens one **before any pair is asked**, so its cache is the journal's position at that instant — **and since a reversal appends no entry, that is still the PRE-REVERSAL state, which is why the at-rest control restores exactly what it restored before.** On the restart arm the same call JOINS the pass's window (the drain runs inside the pass's own scope) and re-caches nothing.
5. **THE CELLS, AND EACH ONE BITES.** `tests/e2e/def-ae-restore-mark.test.mjs` carries four: **`(1)` `DEF-AE` ITSELF, PRINTED BEFORE → AFTER — the listener's reversal, the restarted check, the refusal, the write's throw, and the store standing at `9` after landing `7`: `9 → 9`**, with the window's cached mark printed as the op id it names and asserted equal to the store's own `journalMark` read at rest before the call; **`(2)` THE ARM SWEEP — the seven refusing arms the last pass measured, NAMED: plain `{message}`, both repair returns, repair-lands-then-re-run-refuses, repair throws, body throws, and a repair at an ancestor — each leaving the store where the attempt found it**; **`(3)` THE LAWFUL SIDE UNCHANGED** — a lawful reversal answers its record and its effect stands, and a lawful write answers with its value standing; **`(4)` THE MARK'S FLOOR** — a commit that opened on an empty journal restores the absent state the store was born with, which no op id could name. **Each is RED under a revert that hands `restoreReversal` the head again** (`(1)` reads `9 → 7`, `(4)` reads the write's own landing). **AND THE CELLS THIS CLAUSE RE-DERIVES ARE THE ONES THAT ASSERTED THE OLD READING**: `tests/e2e/in-commit-restart.test.mjs` arms `(1)` and `(2)`, `tests/e2e/direct-pass-restart.test.mjs` arm `(3)` and `tests/e2e/downstream-claims.test.mjs`'s `DEF-W (2)` now read the pre-attempt state, and the direct-drive arms whose window OPENS AFTER their write landed (`direct-pass-restart (1)`, `DEF-W (3)` arm `(B)`) are unmoved because the mark they cache is where their own window opened. **`reversalAtRest`'s conjunction, the fourteen members, the closed status set, the journal and the journal's replay semantics are unmoved.**
`[T: `DEF-AE`'s fix at section §2.6 — the mark cached at the commit opening, the join that re-takes nothing, the cached mark the restore names, the cacheless refusal, the at-rest judgement's own window, and the cells that bite | state or fail-state declaration]`

**⟶ AND ITEM `4`'S PARENTHETICAL *"NO OPEN COMMIT"* IS SUPERSEDED, 2026-10-27 — NO CONSTRAINT CHECK WITHOUT AN OPEN COMMIT, AND THE ENFORCEMENT POINT IS THE CHECK ITSELF.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside it and moves no position, no arity, no verb, no member, no rank, no register row and no count.** **THE RULING IS THE ARCHITECT'S, VERBATIM: *"There should be no state where a constraint is being checked without an open commit. Any action that would cause a constraint check should open a commit before beginning"*** (`strata/decisions.md` · `D-44`).
1. **THE INVARIANT, AND WHY IT IS NOT A PATCH.** *"A seam a driver can bypass is not an invariant"* (`D-44`): `runAttempt` (`K-3`) has ONE production call site — `bindings/js/src/entry/constraints.mjs`'s `constraintWrite`, inside the caller's verb bracket — **and is driven straight through `K-2`/`K-3` by the batteries**, so a bracket taken in the entry would be joined by the production path and **BYPASSED by every direct drive**. **SO THE SCOPE IS OPENED BY THE PASS ITSELF**: `bindings/js/src/entry/state.mjs`'s `installAttemptSeam` installs a THIRD `Symbol.for` channel on the object `storeCreate` returns — `Symbol.for('provident-storeroom.commit-scope')`, taking a thunk and running it inside a commit window (**opening one if none is open, JOINING the extant one if one is, and closing ONLY WHAT IT OPENED** — `§4.1`'s join rule, so no count is minted and no second index exists) — and `bindings/js/src/entry/kernel-attempt.mjs`'s `runAttempt` runs its pass inside it. **NO MEMBER IS ADDED** to the product, to a record or to the kernel: a symbol key is invisible to `Object.keys` and to `Object.getOwnPropertyNames` (`A117` (D6)), and the kernel's export set and empty import footprint are unmoved (`kernel-surface.md §1` items 1–2).
2. **AND IT FAILS CLOSED.** **A store that carries no such channel is NOT THIS PACKAGE'S STORE, and `K-3` REFUSES it with the kernel's own `KC-2` BEFORE `status` moves, before an entry is appended and before a body is invoked** — no ninth token is minted (`fail-surface.md §2`), the attempt stands OPEN, and no commit is opened for it. **A pass the invariant cannot open a window for does not run.**
3. **THE WINDOW IT EMPTIES, BEFORE → AFTER, MEASURED.** **THE DIRECT-PASS WINDOW** — *"a pass driven by hand, `open=0`/`live=1`: **that state must not exist**"* (`D-44`) — reads `open` `0` **BEFORE** and `open` `1` beside `live` `1` **AFTER**, at every ask the pass makes, and `0` again on its return. **THE PRODUCTION PATH IS UNCHANGED**: the write's own commit holds the count at `1` and the pass's scope JOINS it — `1` before, `1` after, with the body's nested write joining too — and the `attempt-opened` channel fires ONCE across the whole call, so the nesting is JOINED and NEVER DOUBLED. **THE DISCRIMINATOR IS UNMOVED**: `reversalAtRest` keeps both conjuncts (`openCommits === 0 && live.size === 0`) and the restart is not a third conjunct.
4. **WHAT IT DOES NOT DELIVER, STATED SO IT IS NOT LEFT TO A MEASUREMENT.** **A reversal issued INSIDE a directly driven pass is still neither judged nor restarted.** Its window is now `open` `1`/`live` `1`, but the restart's consumer is the write's check path (`constraintWrite`'s `restartInvalidatedCheck`) and **a directly driven pass has no such frame above it**, so the request the body raises dies with its window (`constraints.mjs`'s epoch rule — the next OUTERMOST write clears it at its own entry). **A pass can no longer run where a body's action has no *check* to invalidate, which is the state `D-44` empties; a pass that CONSUMES its own request is a carrier this clause does not claim.** **AND `D-43` ITEM 1 IS UNMOVED**: a listener body's write is a write entering at the package surface and its check already runs inside an open commit — the listener's own bracket when it is the outermost window, a JOIN when it is nested — so `D-44` reaches it and nothing moves; **the *"its own commit rather than a join"* half of that item would move `§4.1`'s join rule and is left owed rather than invented here.**
5. **THE CELLS.** `tests/e2e/direct-pass-commit-invariant.test.mjs` asserts the three readings above — the direct-pass window `≥ 1` at every ask with the production path's `1 → 1` beside it, the body's action inside that pass with the restart's absence PRINTED, and the sealless store's `KC-2` with the pass not run — and `tests/e2e/downstream-claims.test.mjs`'s `DEF-W (3)` arm (B) is re-derived from `open` `0` to `open` `1` under this clause.
`[T: `D-44` at section §2.6 — no constraint check without an open commit, the pass's own scope as the enforcement point, the direct-pass window's `0 → 1` with the production path's join unmoved, the fail-closed refusal, and what is still not delivered | state or fail-state declaration]`

**⟶ AND THAT CLAUSE'S ITEM `4` IS SUPERSEDED AND ITS ITEM `2`'S CONSUMER MOVES, 2026-10-27, SIXTH ANNOTATE-BESIDE AT THIS SECTION — THE RESTART'S REQUEST IS CONSUMED BY THE PASS'S OWN COMMIT SCOPE, AND A DIRECT `K-3` LEARNS THE REFUSAL FROM ITS REPORT.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, the three of its fourth, the five of its fifth, the five of its sixth (`D-42`'s) and the five of its seventh (`D-44`'s), with all their stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row, no store byte and no member of any record. **Its authority is `D-44`'s own declared consequence, quoted at its own item `3`:** *"If every check has a commit, every request has a consumer, and the consumer stops being a property of one call site."*
1. **BEFORE → AFTER, AT THE TWO SENTENCES THIS CLAUSE CORRECTS.** **BEFORE:** the `D-42` clause's item `2` — *"`constraintWrite` — the one place the write path's check runs — consumes the request AFTER the attempt's terminal arm returned"* — and the `D-44` clause's item `4` — *"a reversal issued INSIDE a directly driven pass is still neither judged nor restarted … the restart's consumer is the write's check path … a directly driven pass has no such frame above it, so the request the body raises dies with its window."* **AFTER:** **THE CONSUMER IS THE PASS'S OWN COMMIT SCOPE.** `bindings/js/src/entry/kernel-attempt.mjs`'s `runAttempt` runs its pass inside the `commit-scope` channel (the `D-44` clause, whole) and then, **INSIDE THAT SAME SCOPE**, drains what the pass recorded through a FIFTH `Symbol.for` channel — `Symbol.for('provident-storeroom.restart-drain')`, installed by `state.mjs`'s `installAttemptSeam` and implemented by `bindings/js/src/entry/constraints.mjs`'s `drainRestartRequests` — and **`constraintWrite` no longer consumes it at all**. **SO THE RE-RUN IS REACHED BY EVERY DRIVER**: the pass that asks the pairs is the frame that consumes what its own bodies raised, direct or production, and the restarted check is itself a check with a commit open (`D-44`'s invariant reaches the restart, which it could not while the consumer stood outside the scope).
2. **A REQUEST NOW NAMES THE WINDOW THAT RAISED IT, AND THAT IS THE WHOLE OF THE EPOCH RULE.** The request the pass's bodies raise carries **`window`**, the identity `state.mjs`'s `currentWindow` answers — minted with the commit that opens, held on a stack so a joining verb answers the enclosing window's identity and never a second — and `drainRestartRequests` consumes a request **only where that identity equals the window the draining pass runs in**. **`constraintWrite`'s `CHECK_DEPTH` STACK AND ITS TWO CLEARS ARE DELETED WITH THE INFERENCE THEY APPROXIMATED** (*"a request belongs to the act that raised it"*, the `D-42` clause's item `3`): a request raised in a window whose check never ran still dies with its window, **now by identity rather than by a counting frame**, and a request raised earlier in the SAME window still belongs to that window and is still consumed by the check that follows it.
3. **AND THE REFUSAL REACHES WHOEVER DROVE THE PASS.** **A ROUND THAT REFUSES IS CARRIED INTO THE REPORT AND IS NOT THROWN OUT OF THE KERNEL**: `report.outcome` becomes **`'failed'`** (the two-arm member keeps its two arms), the refusal's own `constraint-check` entry is appended to the attempt's log **through the kernel's own `append`**, so it carries the log's six declared members and the log's own ordinal — **the refusal's own list still carries its five members and no `seq`**, because no attempt log stood at the judgement's own instant (`D-41` item `4`, whole) — and **the refusal itself travels on the report under `Symbol.for('provident-storeroom.restart-refusal')`**, invisible to `Object.keys`. **`constraintWrite` IS THEREFORE STILL THE FRAME THAT REFUSES ON THE WRITE'S PATH**, with **the very value the restarted check built** — the same plain `{status, message, log}`, the same rank-`20` `ConstraintPassRefused`, one log entry, the store already restored by that refusal's compensating act — so this clause adds **no second refusal and no second sentence** (`DD-52`), and **`K-3` DOES NOT THROW FOR A LATER CHECK'S REFUSAL**: the pass it ran passed, and a driver that is not the entry learns the answer from the report it was handed (`K-5` answers the same object). **A LAWFUL IN-COMMIT ACTION IS UNMOVED**: the round asks, the pairs pass, and the report keeps `outcome` `'passed'` with no entry appended.
4. **AND WHAT THE BOUND NOW COUNTS.** The figure and the spend-and-never-reset rule are the `D-42` clause's item `3`, entire; **what moved with the consumer is the frame the count belongs to: `RESTART_LIMIT` (`3`) restarts PER PASS SCOPE and not per write** — one drain is one pass's scope, a request raised inside a restart is consumed by that same drain and spends that same budget, and a nested pass (a listener body's own write) is a scope of its own with its own budget, exactly as the nested `constraintWrite` frame had its own before the move.
5. **THE CELLS, AND THE WINDOW THAT IS STILL LEFT.** `tests/e2e/direct-pass-restart.test.mjs` drives the thread and its partners — a constraint body's violating `rollback` inside a directly driven `K-2`/`K-3` (the pair IS asked at the state the action left, the report says the restarted pass refused, the store restored), the lawful partner (the check restarts and passes, no refusal), the terminal write arm (refused and restored, `D-42`'s form unmoved), the bound measured as a count from a direct drive, and the epoch measured — **and `tests/e2e/direct-pass-commit-invariant.test.mjs`'s arm (2) and `tests/e2e/downstream-claims.test.mjs`'s `DEF-W (3)` arm (B) are re-derived from *"not restarted"* to *"restarted, and the report carries it"* under this clause.** **WHAT THIS CLAUSE STILL LEAVES, STATED PLAINLY — TWO WINDOWS HOLD A COMMIT AND RUN NO PASS, AND BOTH ARE NAMED RATHER THAN LEFT TO A MEASUREMENT.** **(i) A `delete`'s listener delivery** holds a commit and runs NO check (a delete consults no constraint — `D-1-bis`), so a request raised there has no consumer and dies with its window. **(ii) A REGISTRATION's own evaluation** — `addConstraint`/`register` asks the pair's body inside the registering verb's own commit window, at an instant no `K-2`/`K-3` attempt stands at (`context.attempt` is `null` there) — likewise runs no PASS, so a `rollback` a registration body issues is a STEP whose request dies the same way; **measured at this pass, and measured again after the following write answered with the pair never asked at the state the reversal left.** **Neither is a defect and neither is newly opened: both are `D-43` item `2`'s KNOWN FAIL-STATE** — the file reloads or the client regenerates the store, and the state is valid again. **NO RESTORE IS WITHHELD FROM A DIRECT `K-3`**: the refusal's compensating act is `judgeReversal`'s own and runs before the report is amended, so a direct driver's store stands restored; what a direct driver must READ is the report's `outcome` and `log`, never a throw.
`[T: `D-42`'s consumer, moved to the pass's own commit scope under `D-44` — the request's window identity in place of the counting frame, the refusal carried in the report (`outcome` `'failed'` and the entry) and re-thrown by the entry on the write's path, the bound per scope, the cells and the one window still left with its declared exit | state or fail-state declaration]`
**⟶ AND `§4.1`'s JOIN RULE IS NARROWED TO AUTHORSHIP, 2026-10-27, SEVENTH ANNOTATE-BESIDE AT THIS SECTION — AN EXTERNAL CALLBACK'S CALL OPENS A NEW COMMIT, AND ONLY THE PACKAGE'S OWN INTERNAL CONTINUATION JOINS.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, the three of its fourth, the five of its fifth, the five of its sixth (`D-42`'s), the five of its seventh (`D-44`'s) and the five of the `D-42`-consumer clause that follows them, with all their stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row, no store byte and no member of any record. **Its authority is `D-45`'s, THE ARCHITECT, VERBATIM:** *"For 43, how is a listener supposed to be able to reuse the outer verb's commit? The listener is an externally-passed function and should be making calls at the package surface. It should be opening a new commit by default of entering at the surface"* (`strata/decisions.md` · `D-45`).

1. **BEFORE → AFTER, AT THE ONE SENTENCE THIS CLAUSE NARROWS.** **BEFORE:** `§4.1`'s *"**A VERB THAT FINDS AN EXTANT COMMIT JOINS IT RATHER THAN OPENING A SECOND**, which is what keeps the count exact under nesting"* — a rule written for **ONE** case, **the package's own machinery inside its own verb**, and applied to **a second case it does not decide**: **an externally-supplied function the package invoked calling a verb.** **AFTER:** *"**A CALL ENTERING THE SURFACE FROM AN EXTERNALLY-SUPPLIED FUNCTION OPENS A NEW COMMIT BY DEFAULT, AND ONLY THE PACKAGE'S OWN INTERNAL CONTINUATION JOINS. THE DISCRIMINATOR IS AUTHORSHIP, NOT DEPTH**"* (`D-45`: *"That is a DIFFERENT ACT BY A DIFFERENT AUTHOR, entering the package surface from outside, and it has no claim on the outer verb's commit at all"*). **THE TWO CASES STAY ORTHOGONAL**: internal nesting still joins — **one act, one commit** — and the count stays exact in both.
2. **WHAT MARKS AUTHORSHIP, AND FOR HOW LONG.** `bindings/js/src/entry/state.mjs` holds **`EXTERNAL_DEPTH`**, the number of caller-supplied frames the package is running inside, and the per-store index holds **`externalAt`**, in lockstep with `windows`: **the depth each open commit was opened at.** **`openCommit` JOINS IFF THE CURRENT DEPTH IS NOT GREATER THAN THE DEPTH OF THE COMMIT IN FLIGHT**, and opens otherwise — so the package's own continuation of a commit, which runs at that same depth, joins, **and a call made from a caller's function, one frame deeper, opens.** **THE MARK'S LIFETIME IS THE INVOCATION AND NOTHING ELSE**: the site arms it BEFORE the call and disarms it AFTER, on the throwing arm too (`Symbol.for('provident-storeroom.external-call')`, installed by `installAttemptSeam`; a store carrying no such channel answers the invocation unmarked, which is `D-45`-free behaviour and never a commit the mark did not ask for). **NO MEMBER IS ADDED** to the product, to a record or to the kernel: the channel is a symbol key (`A117` (D6)), the product's own names still read `14`, and the kernel's export set and empty import footprint are unmoved (`kernel-surface.md §1` items 1–2; the kernel spells the same key at `kernel-foundations.mjs`'s `externalCall`, as it spells `TERMINAL_ARM` and `COMMIT_SCOPE`).
3. **THE SITES — EVERY PLACE THE PACKAGE INVOKES CALLER CODE, AND EVERY ONE OF THEM NOW OWNS A COMMIT.** **A listener's delivery** (`bindings/js/src/entry/delivery.mjs`'s `deliver`, at both instants it runs, the post-verb window and the terminal arm's residue); **a constraint body's evaluation at its four frames** — the landing's pass and every re-run (`kernel-attempt.mjs`'s `evaluate`), the registration-time evaluation (`kernel-registration.mjs`'s `registrationEvaluation`), the synthetic attempt's re-run (`registrationRerun`), and the reversal's judgement (`constraints.mjs`'s `reversalOutcome`); **a repair body at its two frames** — a landing's arm (b) (`kernel-attempt.mjs`) and the synthetic attempt's own (`kernel-registration.mjs`). **EACH CONTEXT IS BUILT OUTSIDE THE MARK**, so the only bytes measured as external are the caller's own. **ONE SITE IS NOT MARKED, AND IT IS NAMED RATHER THAN LEFT TO A MEASUREMENT: the `attempt-opened` OBSERVER** (`state.mjs`'s `openCommit` notifies it *inside* the opening, before that opening returns; marking it would make a self-writing observer open a commit at every notification, without bound, and `§4.2` item 2's cadence is *"once per commit that OPENS"*). **A function the package invokes to DO WORK ON THE STORE owns its commit; the count's own observer is called by the opening itself and is the one exception.**
4. **AND `D-44`'S ITEM `4`'s LAST SENTENCE IS THEREFORE SUPERSEDED — `D-43` ITEM 1'S *"ITS OWN COMMIT RATHER THAN A JOIN"* HALF IS DELIVERED HERE.** The sentence *"the *'its own commit rather than a join'* half of that item would move `§4.1`'s join rule and is left owed rather than invented here"* stands as text and is read THROUGH this clause: the join rule HAS moved, at `§4.1`, and the half it left owed is landed. **AND THE `D-44` CLAUSE'S ITEM `3` IS RE-DERIVED AT ONE LIMB AND NO OTHER**: *"with the body's nested write joining too — and the `attempt-opened` channel fires ONCE across the whole call"* — **a constraint body's nested write is an EXTERNAL CALL and now OPENS its own commit**, so that channel fires TWICE across such a call (the write's own opening and the body's nested write's own); **the invariant item `3` exists for is UNMOVED** — the count during the pass is `1` at every ask, the pass's scope joins, and the call returns at `0`.
5. **THE CELLS, AND WHAT THEY PRINT.** `tests/e2e/external-commit.test.mjs` drives `D-42`'s descendant window AT ITS ROOT: **a listener body's write at a descendant address, with the pair that refuses its value standing over that address** — the count rises by one for the listener's call and the outer verb's count is unchanged across it (`1` → `1`), **the pair is asked by THE LISTENER'S OWN ATTEMPT** (a different attempt id from the outer write's) **and the violation is refused**; the lawful partner shows a listener body's write that violates nothing ANSWERING its own record with the outer write's own outcome unchanged; and the third cell **re-measures production nesting**: an ordinary write whose pass asks a pair and whose delivery runs a listener body still opens **ONE** commit for its whole length — the mark does not leak into the package's own continuation. `tests/e2e/direct-pass-commit-invariant.test.mjs`'s arm (b) is re-derived at the one limb item `4` names. **`tests/e2e/in-commit-restart.test.mjs` (the `D-42` arms), `tests/e2e/direct-pass-restart.test.mjs` (the restart-consumer arms) and `tests/e2e/direct-pass-commit-invariant.test.mjs` (the `D-44` arms and the fail-closed `KC-2`) stay GREEN, and `reversalAtRest`'s conjunction, the fourteen members, the closed status set, the journal and `restoreMark` are unmoved.**
`[T: `D-45` at section §2.6 — the join rule narrowed to authorship, the external-call marker and its lifetime, the seven invocation sites and the one observer exception, `D-43` item `1`'s own-commit half delivered and `D-44` item `3`'s "fires once" limb re-derived, and the cells that print the counts | state declaration]`

**⟶ AND THAT CLAUSE'S ITEM `2` AND ITS ITEM `3` ARE SUPERSEDED IN ONE LIMB EACH, 2026-10-27, EIGHTH ANNOTATE-BESIDE AT THIS SECTION — THE COMMIT A CALL NAMES IS THE DISCRIMINATOR, A REPAIR JOINS THE ATTEMPT'S COMMIT, AND THE MARKER SURVIVES ONLY AS THE UNNAMED FALLBACK.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause's three items, the five items of its first annotate-beside, the two of its second, the four of its third, the three of its fourth, the five of its fifth, the five of its sixth (`D-42`'s), the five of its seventh (`D-44`'s), the five of the `D-42`-consumer clause, and the five of the `D-45` clause, with all their stamps — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside them.** It moves no position, no arity, no verb, no member of the thrown form, no rank, no register row, no store byte and no member of any record. **Its authority is `D-46`'s, THE ARCHITECT, VERBATIM:** *"A listener should be operating at the surface and opening a new commit"* · *"A constraint's repair needs to stay as part of the same commit so that it can be tracked as part of the commit process"* · *"The original way of maintaining this was to accept an optional parameter on entry for the commit id, so that a constraint can identify which open commit it is repairing"* (`strata/decisions.md` · `D-46`).

1. **THE DISCRIMINATOR IS THE COMMIT A CALL NAMES ON ITS OWN ENTRY, AND IT IS NEITHER A DEPTH NOR AN AUTHORSHIP THE PACKAGE INFERS.** `§4.1`'s *"a verb that finds an extant commit JOINS it rather than opening a second"* is read through this item **where it was read as the whole rule**: **A CALL THAT NAMES A COMMIT JOINS IT; A CALL THAT NAMES NONE OPENS A NEW ONE.** **THE POSITION IS THE ONE THE SURFACE ALREADY HAS** — `write`'s **FOURTH**, `index.d.ts`'s *"the commit, at the FOURTH position of the METHOD"* — so the surface grows **no member** (`§2.2`'s clause 3's *"the write opens or joins a commit all the same"* is thereby **decided** and not widened: an ABSENT `commit` now **OPENS**). **AND ITS DOMAIN IS MEASURED RATHER THAN ASSUMED, SAID PLAINLY BECAUSE `D-46` CALLS THIS A "COMMIT ID" AND THE POSITION HOLDS NO ID TOKEN:** the fourth position accepts **A RECORD** — an object carrying an **own, present** `pending` (`§2.4` item 9 (g) item 1) — and it **REFUSES** a string id, a number, `null`, an explicit `undefined`, an object carrying no `pending`, an own `pending` whose value is `undefined`, an **inherited** `pending`, a `Proxy` and an array, each in the surface's one `TypeError` with `status` ABSENT. **SO THE "ID" IS THE `CommitRecord` THE COMMIT WAS DESCRIBED BY** — the object a repair's context carries at its `pending` — **and a caller names the open commit it holds, never a token it invents.** **A JOIN CAN ONLY BE A JOIN OF A COMMIT THAT IS OPEN**: at a store at rest there is nothing to name, so every such call opens, which is what keeps `D-44`'s directly driven pass inside a commit of its own.
2. **A REPAIR JOINS — AND `D-45` ITEM `3`'s MARKING OF THE TWO REPAIR FRAMES IS WITHDRAWN BY NAME.** **A repair is not a separate act at the surface; it is PART OF THE ATTEMPT BEING TRACKED**, so **the write its body makes stays inside the attempt's commit and the commit's record describes the repair it performed**. **THE MECHANISM IS THE ARCHITECT'S OWN: THE KERNEL SUPPLIES THE ID WHEN IT REPAIRS**, by naming **the attempt's own record** at the second position of the seam's `Symbol.for('provident-storeroom.external-call')` channel — `kernel-attempt.mjs`'s arm `(b)` names `attempt.record`, `kernel-registration.mjs`'s state `3` names its synthetic attempt's `commit`, **the very object each hands the repair at the context's `pending` member** — so a repair that supplies that context at `write`'s fourth position **names the same commit by its own hand** and the two spellings cannot disagree. **BEFORE → AFTER, MEASURED:** `attempt-opened` fires **ONCE** for an ordinary write whose pair repairs (`tests/e2e/repair-in-commit.test.mjs` arm `(1)` prints `1`, the repair's own op as the returned record's `op`, and that op among the attempt's `ops` and named by its `repair-run` entry) **where it fired twice under `D-45`'s marking**; and the pass's own commit scope now carries the pass's commit at its second position (`runAttempt` hands `commitRecord`), so the scope **names** rather than infers what it joins.
3. **A LISTENER OPENS — `D-45` ITEM `1` STANDS WHOLE — AND IT IS THE CALLER THAT HAS NO COMMIT TO NAME.** A listener body is externally-passed code **operating at the surface**, so its call **opens its own commit**; **AND IT CANNOT SUPPLY AN ID, WHICH IS SAID HERE EXPLICITLY AND NOT LEFT TO INFERENCE**: the package hands it the triggering address and nothing else (`§2.7` item 5), so its `write` has **three positions** and names nothing. **A constraint body is the same** — its context carries five members and no commit (`kernel-surface.md §2.3` item 1) — **so a verb it calls opens its own commit too**, and `D-45`'s descendant window stays closed by construction (its own cell, unchanged and green).
4. **THE MARKER'S FATE: IT SURVIVES, NARROWED TO THE UNNAMED FALLBACK, AND IT IS NOT A SECOND RULE.** `bindings/js/src/entry/state.mjs` still arms `EXTERNAL_DEPTH` per invocation and still records, per opening, the depth that opening was taken at (`externalAt`, in lockstep with `windows`) — **`D-45` item `2`'s two structures, unmoved in form** — and `openCommit` reads them **only where no name stands**: **the package's own continuation of the commit in flight (same depth) JOINS, and a call from a caller-supplied function (one frame deeper) OPENS.** **WHY IT IS NOT DELETED, GIVEN THAT A NAMED CALL NEVER READS IT: the package's own nested verbs have no name to supply either.** `constraintOn` brackets for enabling and reaches `listen` through `K-1` **at its own depth and with no `CommitRecord` anywhere in hand**, so without the fallback that nested `listen` would open a second commit and `finalizer-and-teardown.md §4.1`'s *"`constraintOn` opens one — ENABLING"* would read `2` (measured: `tests/e2e/addon-adoption.test.mjs`'s P-ADA-5 arm goes red on exactly that figure). **SO THE ORDER IS STATED ONCE: THE NAME DECIDES WHEREVER THERE IS ONE, AND AUTHORSHIP DECIDES ONLY WHERE THERE IS NONE.** **NO MEMBER IS ADDED** to the product, to a record or to the kernel: the channel is a symbol key (`A117` (D6)), the product's own names still read `14`, and the kernel's export set and empty import footprint are unmoved (`kernel-surface.md §1` items 1–2).
5. **THE CELLS, AND EACH ONE BITES.** `tests/e2e/repair-in-commit.test.mjs` carries three: **arm `(1)`** a repair tracked inside its attempt (the returned record's `op` is the repair's, the attempt's `ops` carry it, the `repair-run` entry names it, `attempt-opened` fires once) — **RED under a revert that hands the repair invocation no name** (the count reads `2`); **arm `(2)`** a caller-supplied fourth position joining (no opening, the enclosing count unchanged, no second pass) beside an absent one opening (one opening, the count at `2` beside the enclosing commit's, its own pass asking its own address) — **RED under a revert that stops reading the position** (the supplied arm opens); **arm `(3)`** the position's domain, measured, as item `1` prints it. **`tests/e2e/external-commit.test.mjs` (the `D-45` arms) is UNMOVED AND GREEN, and it BITES in the other direction**: with the authorship fallback removed — every unnamed call joining — **the listener's own commit vanishes and `D-45` arms `(1)` and `(2)` go red on the count and on the descendant ask**, which is what keeps the fallback from being deletable. **`tests/e2e/in-commit-restart.test.mjs` (the `D-42` arms), `tests/e2e/direct-pass-restart.test.mjs` (the restart-consumer arms), `tests/e2e/direct-pass-commit-invariant.test.mjs` (the `D-44` arms and the fail-closed `KC-2`) and `tests/e2e/downstream-claims.test.mjs`'s `DEF-W (3)` stay GREEN, and the fourteen members, the closed status set, the journal, `restoreMark` and `reversalAtRest`'s conjunction are unmoved.**
6. **WHAT THIS CLAUSE DOES NOT CLAIM, STATED SO IT IS NOT LEFT TO A MEASUREMENT.** **A repair and its attempt now share ONE commit and therefore one window identity**, so the epoch rule's *"a request belongs to the act that raised it"* no longer separates a repair's own nested pass from the pass that invoked it: a restart request the attempt's pass raised may be drained by a pass a repair's write opens inside the same window. **That is `D-46`'s own reading — one commit, one act — and it is named here rather than discovered**, and no clause of this section requires the two to be separable. **AND A CALLER OUTSIDE ANY OPEN COMMIT CAN NEVER NAME ONE** (there is none open to hold a record for), so the fourth position is a **nested** act's discriminator and never a top-level caller's: a top-level `write` always opens.
`[T: `D-46` at section §2.6 — the commit a call names is the discriminator (`write`'s fourth position, measured as a RECORD and never an id token), a repair joins the attempt's commit by the kernel's name at its two frames, a listener and a constraint body open because they have none to supply, the authorship marker surviving only as the unnamed fallback with the nested `constraintOn`→`listen` case that keeps it, the cells and the three reverts, and the one window the change merges | state declaration]`

**⟶ ADDED 2026-10-27 — `D-43` ITEM `2`'S KNOWN FAIL-STATE IS DECLARED HERE WITH BOTH WINDOWS AND BOTH EXITS, BECAUSE THE CLAUSES ABOVE NAME THE WINDOWS AND LEAVE THE EXIT TO A FOOTNOTE.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above — the `DEF-W` clause and its annotate-besides, the `D-42`-consumer clause, the `D-45` clause and the `D-46` clause, with all their stamps — stands BYTE-FOR-BYTE and is read THROUGH this one; THIS clause is a PURE INSERTION beside them and moves no position, no arity, no verb, no member of the thrown form, no rank, no register row, no store byte and no member of any record.** **THE RULING, THE ARCHITECT, VERBATIM: *"Known fail-state, file reloads/client regenerates store to return to valid state"*** (`strata/decisions.md` · `D-43` item `2`).

1. **THE TWO WINDOWS, NAMED AS THE DECLARATION NAMES THEM.** **(i) A `delete`'s listener delivery** — the delivery runs with an open commit (**the clause above holds it at one commit, and since `D-45` that commit is the listener call's own**) and **runs NO PASS**: a `delete` consults no constraint (`D-1-bis`), so a `rollback` a listener body issues inside it is a step whose check never runs, and the restart request it raises dies with that window. **(ii) A REGISTRATION'S OWN EVALUATION** — `addConstraint` and `register` ask a pair's body inside the registering verb's own commit window, at an instant at which no `K-2`/`K-3` attempt stands (`context.attempt` is `null` there), so that window likewise holds a commit and **runs NO PASS**: a `rollback` a registration body issues is a step whose request dies the same way. **NEITHER WINDOW IS NEW, NEITHER IS A DEFECT, AND NEITHER IS AN UNREACHED CASE OF THE RESTART** — the restart's consumer is the pass's own commit scope (`D-44`, `D-42`), and a window with no pass has nothing to consume what its bodies raise. **WHAT IS TRUE OF BOTH, SAID BEFORE THE EXIT: the reversal's own effect STANDS in the live instance** — the store does not put it back on this arm, and no later write is asked at the state it left — **so the absence of a refusal there is NOT an approval and must not be read as one.**

2. **THE FIRST EXIT — RELOAD THE FILE.** **Construct a fresh instance over the same `cfg.filePath`.** The boot reads the bytes at the path and nothing else (`§2.8` item `1`; `§7.2` item `6`'s boot, declared at the store), **and since `bd0fd8c` a restore that moved a version standing at `Tier::File` SAVES the restored image — so THE FILE RECORDS THE RESTORED STATE, AND A RELOAD RETURNS TO JUDGED BYTES RATHER THAN TO BYTES DESCRIBING AN UNJUDGED STATE.** **WHAT THE EXIT DOES NOT CARRY, STATED SO IT IS NOT ASSUMED:** the boot reads the last successful save and no other state — no journal, no registration, no `mem` or `temp` version — and a reversal that moved only `mem`/`temp` nodes does not save, so a reload does not carry it. **`D-43` item `2`'s exit is the store's own declared boot semantics, not a general undo** (`DD-28`; `§2.8`; `docs/specs/storeroom-native/contract.md §6.6` item `5`'s clause of 2026-10-27).

3. **THE SECOND EXIT — REGENERATE THE STORE.** **Discard the instance and construct the store again from the same configuration** — a `mem` register with no `filePath`, or a `file` register over the same path, which is exit `1` as well. **The new instance is a judged state by construction**: it opens with no attempt, no open commit and no window carried over from the discarded instance, so a constraint asked of it is asked at a state no unjudged step produced. **THE CONSUMER'S OBLIGATION IS THE SAME ON BOTH EXITS, AND IT IS THE POINT OF THE RULING: the recovery is the consumer's act; the package neither performs it nor pretends to** — **a known fail-state with a documented exit is a specification, an unreachable window with no exit is a defect** (`D-43` item `2`'s own sentence).

4. **THE CELLS THAT STAND BESIDE THIS DECLARATION, NAMED SO THE DECLARATION IS NOT A CLAIM ABOUT AN UNDRIVEN WINDOW.** `tests/e2e/direct-pass-restart.test.mjs`'s arm `(5)` drives window `(i)` — the delete's listener runs at `open` `1`/`live` `0`, reverses inside it, no check runs, the request is stamped with that window, and the following write ANSWERS with the pair asked at the state the write left and never at the stale window's state — and it names window `(ii)` as the second such window in its own diagnostic. **The registration window was measured at the pass that named it (the clauses above), and neither arm prints a refusal where none ran.**
`[T: `D-43` item 2's known fail-state — both windows (a delete's listener delivery, a registration's own evaluation), both exits (the file reload, which now returns to judged bytes because a restore that moves a file-tier node saves, and the store's regeneration), the effect that stands in the live instance, and the cell that measures the first window; the store's file half at `docs/specs/storeroom-native/contract.md §6.6` item 5's clause of 2026-10-27 and `§7.2` item 6 | state or fail-state declaration]`


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

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS SECTION IS THE DELIVERY'S WHOLE HOME, AND ITS FIRING
NEIGHBOURS ARE POINTED AT.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–4 above and item 5's argument clause beside
them stand byte-for-byte — the `A77` clause included — and they are read THROUGH this clause; THIS clause is a
PURE INSERTION, it adds no item, no member, no argument and no order.** **THE RULING, VERBATIM:**
***"Listener behavior is part of store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE FOUR ITEMS, SPLIT ONE LINE EACH, SO THE DELIVERY'S HOME IS THIS SECTION AND THE FIRING'S IS NOT:**
1. **ITEM 1 — the shape, freshness and wrapping of the `triggered` ARRAY — IS A DELIVERY RULE AND STAYS.**
   **What its MEMBERS ARE is the STORE's, and it is declared at
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 11, with the two records at that store's
   `§3.6`/`§4.4`.** **The package carries what those return and edits nothing** — **including the ARRAY's
   element multiplicity, which is the store's own list carried element for element** (`§2.4`'s
   caller-spelled-duplicate clause).
2. **ITEM 2 — the invocation's timing, its synchronicity and the fact that it is the CALLER'S — IS THE
   DELIVERY'S AND STAYS WHOLE; THAT THE STORE INVOKES NOTHING IS INHERITED** from
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) (`A57`) **and is not declared here.**
3. **ITEM 3 — *"NO ORDER IS ASSERTED … MEMBERSHIP ONLY"* — IS THIS UNIT'S DRIVE RULE AND RESTS ON A STORE
   PROPERTY IT INHERITS:** **the order-unobservability itself is the store's** —
   **`docs/specs/storeroom-native/contract.md §6.5` item 5's *"NO ORDER IS DECLARED FOR THE LIST"*, with
   `DD-22`/`DD-37`, and `write-and-read.md §6.5` item 10 (e)** — **while the set-comparison a drive performs is
   this unit's.** **A drive derives the two from the two homes and never reads either as the other.**
4. **ITEM 4 — the throwing body's disposition — IS THE DELIVERY'S AND STAYS:** **it is a statement about the
   PACKAGE's own invocation loop, while the store's own half (*"a throwing body is not a store state"*, because
   the store invokes no body) is inherited from `write-and-read.md §6.5` item 10 (d) (i).**
**AND ONE CONSEQUENCE OF THE RE-HOMING THAT LANDS EXACTLY HERE, NAMED SO IT IS NOT SOUGHT ELSEWHERE: the
`CF-DUP-3` clause of `§2.4` declared a recipient set's reading and carried its argument; THIS section supplies
the WINDOW that reading is read at (item 2) and the invocation count that makes it observable (item 3's
membership-only rule plus `§2.4`'s distinct-identity rule).** **The RULE and its ARGUMENT now stand at
`docs/specs/storeroom-native/write-and-read.md §6.5` item 14, and the `§2.4` clause is this unit's POINTER to
it.** **AND NOTHING ELSE MOVES: the register keeps its `8` rows with every failure list unmoved; `§2.4`'s four
rules, `§2.3`'s handle clause, `§2.5`'s single form, `§2.8`'s two file-behaviour readings and `§2.6`'s
constraint pattern stand exactly as printed; and no `DD` row, no `PAR-JS` row and no part entry is authored,
renumbered or dropped here.**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 10 (d)–(e) and 11 — the store-side clauses this section reads through; A3
docs/specs/storeroom-native/contract.md §6.5 item 5 with `DD-22`; A3 docs/specs/storeroom-js/surface.md §2.7's
re-homing clause of 2026-10-11 — this document's twin of this clause | requirement]`).

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

**⟶ AND TWO FIGURES OF THOSE TWO READINGS ARE SUPERSEDED AT THEIR OWN SITES, 2026-10-27 — A RESTORE THAT MOVES A
`file`-TIER NODE NOW SAVES (`bd0fd8c`).** `RCA-8(d)` ANNOTATE-BESIDE: **items `1` and `2` above stand
BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION beside them and moves no verb, no
tier, no code, no member, no record and no count.** **ITEM `1`'s *"`file`-tier durability is produced by a
successful `file`-tier `write` ONLY"* READS *"produced by a successful `file`-tier save, whose producers are a
`file`-tier `write`'s commit AND a restore that moved a version standing at `Tier::File`"*; and ITEM `2`'s *"The
package performs no compensating file write and no re-commit"* READS *"the package performs no compensating file
write for a `delete` and none for a `rollback`'s ordinary arm; the ONE compensating write it performs is the
REFUSED reversal's restore, and only where that restore moved a file-tier node"*.** **WHAT DOES NOT MOVE, SAID SO
THE READING IS NOT TAKEN WIDER THAN IT IS:** **a `delete` performs no file I/O and a successful `rollback`
performs none either**, so a JS caller that deletes a `file`-tier version and then constructs a FRESH instance over
an equal `cfg.filePath` **still sees the removed version STAND AGAIN** — the re-boot is the store's own declared
boot and not a defect (`DD-28`; `§7.2` item `6`); **a plain `rollback` still commits nothing**; and **a `rollback`
that REFUSES restores, and where the restore moved a file-tier node it saves the restored image — the one act of
the store that writes bytes without a `write`, and it writes the state the journal records, so a reload returns to
judged bytes rather than to bytes describing an unjudged state.** **A SAVE IS AN EFFECT AND NOT AN OP**: the
restore appends no journal entry, compacts nothing and delivers no trigger, and a save that cannot land is
reported (`FileCommitFailed`, the in-memory state restored and the bytes not updated) rather than swallowed.
**THE DECLARATION'S ONE HOME IS THE STORE'S** — `docs/specs/storeroom-native/contract.md §6.6` item `5`'s clause of
the same date — **and the fail-state the refusal's restore belongs to is declared at `§2.6`'s `D-43` item `2`
clause above** (`bd0fd8c`; `DD-28`'s amended cell | state or fail-state declaration).

### §2.9 `findAddress` IS NOT EXPOSED — the non-exposure clause, and its consequence

**`findAddress` IS AN INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT.** **The architect's words, verbatim:
*"find address is an internal tool - JS only needs read + edit functions and listeners"*** (`A63`).
**CONSEQUENCES, EACH STATED SO NOTHING IS LEFT TO INFERENCE:**
1. **THE JS SURFACE IS EXACTLY `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` ·
   `listen` · `unlisten` — `8` verbs — plus the returned records.** **⟶ AND THE NAMESPACE FIGURE THIS ITEM PRINTS IS SUPERSEDED AND IS READ THROUGH AT THIS ITEM'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): the `8` verbs is the `A63`/`Q1` pass's reading, and the operative figure is ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of that date, the ten other names now standing as METHODS of the product whose member set is TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause; the item's OWN subject — that `findAddress` is not exposed — STANDS WHOLE, and the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory** **⟶ AND THAT MARK'S OWN MEMBER-SET FIGURE IS ITSELF SUPERSEDED, 2026-10-17: the operative figure is THIRTEEN own members, `10 + 1 + 1 + 1 = 13` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `constraints` clause of that date, and the ONE-name namespace figure `11 → 1` ✓ stands UNMOVED — so this item's subject is unchanged and only the member-set figure it cites moves by one** (`role_spec_writer`; `RCA-8(g)`: the mark above stands BYTE-FOR-BYTE and is read THROUGH this clause; the architect's ruling of 2026-10-17, *"Add surface methods for reading registered constraints."*). **No `NodeRef` crosses, no reference
   crosses, and `findAddress`'s *"returns reference"* has no JS spelling.**
2. **A FAILED READ IS THE EXISTENCE PROBE.** **Because no resolver is exposed, a JS caller asks whether an
   address exists by `read`ing it: a `read` that resolves answers the value, and a `read` that does not
   answers a thrown `{status, message}`.** **THEREFORE ALL `16` FAIL CODES REMAIN REACHABLE FROM JS** (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: the `15` this item printed is the count before the sixteenth member, `ConstraintListInvalid` at `docs/specs/storeroom-native/contract.md §8.1` #16, reachable from `storeCreate` at this same JS boundary; the five classes named below stand as printed with that one added) — the
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
a.listen(address)      -> Handle    // mints a token, populates the store's home, wraps it for JS
a.unlisten(handle)     -> undefined  // drops ONE store-side home entry; a no-op success for anything else
```

**⟶ `RCA-8(g)` RE-SPELLED AND MOVED OUT 2026-10-16 — THE `instance` FIRST POSITION IS DROPPED AND THE RECEIVER IS THE STORE.** **THE AS-FILED BLOCK ABOVE — the two lines `listen(instance, address)` and `unlisten(instance, handle)` — HAS LEFT THIS FILE and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §20`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE. The `a` of each line is the product, THE RECEIVER, and the operative declaration is `§2.4` item 9 (f)'s clause of this date** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).
**`listen`'s `address` is `AddressArg`'s domain and NOTHING MORE** — **a listener carries NO tier qualifier:
its address is the WHOLE of its key** (`[A3 docs/specs/storeroom-native/contract.md §6.5 — the listener
record's closed two-member set | requirement]`). **`unlisten` returns `undefined` on success, including on
its no-op success, and throws exactly where the store does** — **and the store throws nowhere on a withdrawal
except for a malformed argument's shape.** (`[A3 docs/specs/storeroom-native/contract.md §0.4 — the
`Store::listen`/`Store::unlisten` rows | requirement]`)

---

### §2.12 THE WRITE PATH AND `manageConstraints` — the operative law, authored in `surface.md` 2026-10-16 on `A122` · `A123` · `A124` · `A125`; **⟶ RE-DERIVED THE SAME DATE ON `A126`, WHICH SUPERSEDES `manageConstraints` — THIS HEADING'S `manageConstraints` HALF STANDS AS THE AS-FILED TITLE AND IS READ THROUGH THE RE-DERIVED CLAUSE BELOW, AND THE OPERATIVE DECLARATION OF THE POST-CREATION CONSTRAINT SET IS `surface.md §2.12`'s RE-DERIVED ITEMS 2–4, WHOSE THREE FUNCTIONS STAND WHERE ONE NAME AND ITS `operation` POSITION STOOD (`role_spec_writer`; `RCA-8(d)`)**

**⟶ THE OPERATIVE LAW OF THE ENTRY→KERNEL EDGE AND OF THE POST-CREATION CONSTRAINT ROUTE IS AUTHORED IN THIS
UNIT'S `surface` PART, AT `docs/specs/storeroom-js/surface.md §2.12`, IN THIS PASS OF 2026-10-16, AND IS
CARRIED HERE BY CITATION AND NOT RE-EMITTED.** **THIS DOCUMENT'S `§2` IS THE CONTRACT'S OWN RELOCATION OF THAT
PART'S TEXT AND HOLDS NO SECOND COPY OF IT: a reader takes `surface.md §2.12`'s five items — the five-stage
flow and the words of `§2.6` that survive and those that do not, the `manageConstraints` declaration with its
three arms, its one refusal, the returned constraint identity with its opacity rule, and the two moved counts —
at that part's own bytes.** **THE THREE CLAIMS THAT TOUCH THIS DOCUMENT ARE PRINTED HERE AND NOWHERE ELSE OF
IT:**
1. **`surface.md §2.6` AND THIS DOCUMENT'S `§2.6` ARE SUPERSEDED FOR THE WRITE PATH, and THIS document's
   `§2.6` carries its own dated clause saying so, with the superseded bytes moved out of the part to
   `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1`** (`RCA-8(g)`).
2. **THE MODULE NAMESPACE IS `9` NAMES FROM THIS DATE — `8 + 1 = 9` — stated at `surface.md §2.9` item 1's
   dated clause, and THE INSTANCE'S OWN MEMBER SET IS FIVE — `4 + 1 = 5` — stated at `surface.md §2.4`
   item 9 (f)'s dated clause; the `+1` at each is `manageConstraints`.** (⟶ AND CLAIMS `2` AND `3` ARE WITHDRAWN AS OPERATIVE FROM 2026-10-16 BY `RCA-8(g)`: the `9` NAMES, `8 + 1 = 9`, the `FIVE` own members, `4 + 1 = 5`, the `NINE NAMES AND THE FIVE OWN MEMBERS` the types file was owed, and the *"eight verbs or four own members"* finding rule are the `A122`/`A123` pass's readings, their bytes standing BYTE-FOR-BYTE, AND EACH IS READ THROUGH THE `A127` RE-DERIVATION IMMEDIATELY BELOW, whose figures are ONE name and TWELVE own members; this pointer adds no count and no `§`)
3. **`bindings/js/index.d.ts` IS NOT EDITED BY THIS PASS AND OWES THE NINE NAMES AND THE FIVE OWN MEMBERS, a
   duty carried at `surface.md §2.4` item 9 (f)'s dated clause of this date; a file still reading eight verbs
   or four own members is a FINDING.** **⟶ AND THE FIGURES OF THIS CLAIM ARE DISPOSED OF AT THIS CLAIM'S OWN BYTES RATHER THAN ONLY IN THE BULLET ABOVE, 2026-10-16 BY THIS PASS (`role_spec_writer`; `RCA-8(g)`: the claim's as-filed sentences stand BYTE-FOR-BYTE above and THIS clause is their mark — a cell may not be listed as read-through and stand unmarked at itself): `THE NINE NAMES`, `THE FIVE OWN MEMBERS` AND THE *"eight verbs or four own members"* RULE ARE THE `A122`/`A123` PASS'S READINGS AND ARE WITHDRAWN AS OPERATIVE. THE OPERATIVE DUTY IS THE ONE THE RE-DERIVATION BELOW NAMES AT ITS OWN ITEM 3 — THE ONE NAMED EXPORT `storeCreate` AND THE TWELVE-MEMBER PRODUCT — whose statement is `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause and `§2.9` item 1's `A127` clause of that date. THIS CLAIM IS ONE OF THE `16` CELLS `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory enumerates, and THIS CLAIM AND THAT INVENTORY'S LISTING ARE TRUE TOGETHER FROM THIS DATE: THE LISTING'S READ-THROUGH HAS ITS MARK HERE AND NOT ONLY AT THE CLAUSE BELOW.**
**AND NOTHING OF THIS SECTION RE-DECIDES A RULE: the store's closed `16`, its `8`-verb namespace, the register's
`8` rows, the addon's `5` exports and the kernel's five items are all UNMOVED** (`[A2 docs/decisions.md` ·
`A122` · `A123` · `A124` · `A125`, all 2026-10-16; A3 docs/specs/storeroom-js/surface.md §2.12` and its items
1–6; A3 archive/reviews/2026-10-16-constraints-publication-gate1.md §17–§19 | cross-reference]`).

**⟶ RE-DERIVED 2026-10-16 — THE THREE CLAIMS ABOVE ARE READ THROUGH `A127`, WHICH RE-SPELLS THE ROUTE'S RECEIVER AND BOTH OF THEIR COUNTS AND INVERTS THE TYPES DUTY (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`, read with `A128`; `RCA-8(g)`: **the `A126` re-derivation of the three claims, with its `RCA-8(d)` spelling and its `PAR-JS-1`…`PAR-JS-26` reading, has LEFT these bytes and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §7`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE, and the retired instrument is cited by no clause of this pass**).**
1. **THE OPERATIVE STATEMENT OF THE POST-CREATION CONSTRAINT ROUTE IS `surface.md §2.12`'s items 1–5, AND ITS SPELLING IS THREE METHODS OF THE PRODUCT, NOT THREE SURFACE FUNCTIONS OF THE ENTRY: `a.addConstraint(pair, constraint)` — which CARRIES the constraint and OVERWRITES the element where the id already exists — with `a.constraintOn(pair, constraint)` and `a.constraintOff(pair, constraint)` for enable and disable.** **THE RECEIVER IS THE STORE: the `instance` first position is DROPPED at every one of the three, and `§2.12`'s re-derived items 2 and 4 of this date declare their position-less signatures and their refusal** (`surface.md §2.12` items 2 and 4; `§2.1`'s `A127` clause; `§2.4` item 9 (f)'s clause of this date). **The superseded `manageConstraints` declaration and arm region stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1` and `§2` and are asserted by no drive.**
2. **THE MODULE NAMESPACE IS **ONE** NAME FROM THIS DATE — `storeCreate` ALONE, `11 → 1` ✓ — and THE PRODUCT'S OWN MEMBER SET IS **TWELVE** — `10 + 1 + 1 = 12` ✓, the TEN METHODS plus `register` and `settle`; the operative statements are `surface.md §2.9` item 1's clause of this date and `§2.4` item 9 (f)'s clause of this date, WHERE EVERY METHOD'S ARITY, ITS POSITIONS, ITS ANSWER AND ITS REFUSAL ARE STATED IN ONE TABLE, and the three constraint methods' parameter rows are `parameter-semantics.md §2.22`, `§2.24` and `§2.25`, whose set's ONE count home is `§1`'s clause of this date (`PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓).**
3. **`bindings/js/index.d.ts` IS NOT EDITED BY THIS PASS AND OWES THE ONE NAMED EXPORT `storeCreate` AND THE TWELVE-MEMBER PRODUCT, a duty carried at `surface.md §2.4` item 9 (f)'s `A127` clause of this date; A FILE STILL READING EIGHT, NINE OR ELEVEN VERBS OR A FOUR-, FIVE- OR SEVEN-MEMBER PRODUCT is a FINDING.**
**AND NOTHING ELSE OF THIS SECTION MOVES: claim 1's own subject — *"the five-stage flow and the words of `§2.6` that survive and those that do not"* — the store's closed `16`, its `8`-verb namespace, the register's `8` rows, the addon's `5` exports, the kernel's five items and the seam's arity are all UNMOVED** (`[A2 docs/decisions.md` ·
`A127` · `A128` · `A126` · `A122` · `A123`; A3 docs/specs/storeroom-js/surface.md §2.12 items 1–5, §2.9 item 1's clause of this date, §2.4 item 9 (f)'s clause of this date and `§2.1`'s clause of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date; A3 docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §7 | cross-reference and numeric or census claim]`).

**⟶ AND THREE OF THE FIGURES THIS CLAUSE PRINTS ARE SUPERSEDED FROM THEIR OWN DATE AND ARE READ THROUGH THIS SENTENCE, 2026-10-25 (`RCA-8(g)` ANNOTATE-BESIDE: the clause above stands BYTE-FOR-BYTE, THIS clause is a PURE INSERTION, and no claim, count, cell or ruling of it moves).** **WHAT IT PRINTS — *"the store's closed `16`"*, *"the addon's `5` exports"*, *"the kernel's five items"* — IS THE POSTURE OF 2026-10-16 AND NOT OF THIS DATE, AND THE THREE ARE ONE KIND OF FINDING: a censused surface a later wave moved and this re-derivation never claimed to cover.** **THE OPERATIVE FIGURES: the store's closed set is `17`, `ValueRefusedAtBoundary` at rank `17` (`docs/specs/storeroom-native/contract.md §8.1`'s 2026-10-23 amendment, `A148` Q3; `src/error.rs`'s `CODES` carries seventeen and `bindings/js/index.d.ts`'s `StoreStatus` declares all seventeen); the addon's export set is `THIRTEEN` — `4` standing plus `9` per-verb — with `call` ABSENT (`docs/specs/storeroom-addon-surface/contract.md`'s `P-SAS-1`, and the deletion at `export-set-and-dispatch.md §2`: *"`call` IS DELETED"*); and the kernel's extent is `6` items, `K-1`…`K-6`, `remove` the sixth (`docs/specs/storeroom-held-listener-identity/contract.md §2.9` item 5, `5 + 1 = 6` ✓).** **AND THE ONE CORRECTION THAT IS A RECORD RATHER THAN A FIGURE: `A150` (2026-10-25) is the architect's *"Remove the register half, `constraintOff` removes the constraint"* and RETIRED NO ADDON ENTRY — the `call` deletion's authority is the addon-surface unit's split, cited above; the tree's own mis-citations of `A150` for it are named at `docs/L1/open-items-2026-10-25.md §1`.**

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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE INTERNAL ADDON'S OWN EXPORT
LIST, DECLARED SO THE ENTRY'S `NOTHING ELSE` IS CHECKABLE AGAINST A NAMED SET.** `RCA-8(d)` ANNOTATE-BESIDE:
**the paragraph above stands byte-for-byte; THIS clause is a PURE INSERTION and it declares the INTERNAL
artefact's export surface — which is NOT the entry's named-export surface, and which no consumer of the
claimed entry can reach.**

**THE INTERNAL ADDON'S EXPORT SET IS EXACTLY FIVE NAMES: `version` · `errorMessage` · `storeCreate` ·
`call` · `register` — and NOT ONE BESIDE THEM.** **Three of the five are the package's own internal step
(`call`, `storeCreate`, `register`) and two exist SO THE ADDON CAN BE AUDITED FROM ITSELF (`version`, the
crate's own version string) AND SO THE STORE'S GENERATOR IS REACHABLE WHERE THE PACKAGE NEEDS IT
(`errorMessage`, the generator reached from the JS side for the one state `§2.5` item 5 declares).** **NO ONE
OF THE FIVE IS A NAMED EXPORT OF THE CLAIMED ESM ENTRY** — **the entry's named exports are the `8` verbs of
`§2.9` item 1 and NOTHING ELSE** — **⟶ AND THIS FIGURE IS SUPERSEDED AND IS READ THROUGH AT THIS CLAUSE'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): the `8` verbs is the `A70`/`Q1` pass's reading, the operative figure being ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause; the clause's own POINT — that the four internal-only addon names are not named exports and that `storeCreate` IS one — STANDS WHOLE, and the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory** — **and the internal artefact is reachable ONLY through the object the ESM
entry's module-private key holds, so a consumer of the claimed entry CANNOT reach `version`, `call`,
`errorMessage` or the addon's own `storeCreate`.** **A sixth name on the internal artefact, or a name of the
five reached from a consumer's own module graph, is a FINDING** — **the second arm of it landing on
`P-SR-7`'s `S-ONE-ADDON` and the first on the sibling crate's own surface.**
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed realm is the ESM entry ALONE; A1
docs/specs/storeroom-js-proposal.md §17 · `A75`; A3 docs/specs/storeroom-js/package.md §1.2 — the internal
reach, which is not a second realm and not a second entry | requirement]`).

**⟶ RECONCILED 2026-10-11 — THE BLIND GREENS PASS (`role_spec_writer`), CLOSING THE DOC FINDING `F-DOC-1`
RECORDED AT `archive/gate5/storeroom-js-greens-run.md` §4, AT THIS DOCUMENT'S OWN HOME OF THE SPAN, SO THE TWO
HOMES OF ONE DECLARATION AGREE.** `RCA-8(d)` ANNOTATE-BESIDE: **the paragraph and the clause above stand
byte-for-byte — *"NO ONE OF THE FIVE IS A NAMED EXPORT … the entry's named exports are the `8` verbs of
`§2.9` item 1 and NOTHING ELSE"* included and NOT re-worded — and they are read THROUGH this clause; THIS
clause is a PURE INSERTION, it adds no name, mints no id and moves no count of this section.**
**THE AS-FILED CLAUSE, NAMED AS FILED, BECAUSE ITS SENTENCE IS FALSE OF ONE OF ITS OWN FIVE NAMES READ AGAINST
`package.md §1.3` ITEM 3's OWN LIST:** ***"NO ONE OF THE FIVE IS A NAMED EXPORT OF THE CLAIMED ESM ENTRY"***
(this document's §3.1 dated clause above, whose five are `version` · `errorMessage` · `storeCreate` · `call` ·
`register`). **THE CLAUSE THAT GOVERNS IS ITEM 3's LIST** — *"the NAMED EXPORTS are exactly the verbs of
`surface.md §2` and the package's own instance handle factory — and NOTHING ELSE"*
(`docs/specs/storeroom-js/package.md §1.3` item 3) — **and that list CONTAINS the construction verb
`storeCreate`.**
**⟶ AND THE TWO `9`s ARE RE-SPELLED `11`s FROM 2026-10-16 BY `A126`, WITHOUT MOVING THE SPLIT OR THE FOUR INTERNAL-ONLY NAMES: THE OPERATIVE FIGURE IS ELEVEN NAMES — `8 + 3 = 11` (⟶ AND THAT LABEL IS WITHDRAWN 2026-10-16 BY `RCA-8(g)`: this figure is the `A126` pass's own reading, standing BYTE-FOR-BYTE, and is read THROUGH THIS SECTION'S OWN CLAUSE BELOW AT `A127`'s ONE-NAME AND TWELVE-MEMBER FIGURES) — the `+3` being `addConstraint` · `constraintOn` · `constraintOff`, whose declared shapes are `surface.md §2.12`'s items 2–3 and whose count's operative statement is `§2.9` item 1's dated clause of this date — AND THE READING THROUGHOUT IS ABOUT THE FIVE INTERNAL-ONLY NAMES AND THE CONSTRUCTION VERB AND IS UNAFFECTED BY A NINTH, A TENTH OR AN ELEVENTH NAMED EXPORT** (`role_spec_writer`; `RCA-8(g)`: **this clause's own *"the clause below … is read THROUGH this one"* is read the other way from 2026-10-16 — THIS CLAUSE IS READ THROUGH THE `§3.1` CLAUSE BELOW**).
**THE SPLIT, IN THE FORM THIS DOCUMENT'S OWN FIVE-FORM CITATION ENUM CAN CARRY — IT IS A READING RULE AND
MINTS NO CONTRACT ID — ⟶ AND ITS TWO `8`s ARE RE-SPELLED `9`s FROM 2026-10-16 BY `A123`, WITHOUT MOVING THE
SPLIT ITSELF: THE OPERATIVE FIGURE IS `9` NAMES — `8 + 1 = 9` (⟶ AND THAT LABEL IS WITHDRAWN 2026-10-16 BY `RCA-8(g)`: this figure is the `A123` pass's own reading and is read THROUGH THE `§3.1` CLAUSE BELOW WITH THE `11` BESIDE IT), the `+1` being `manageConstraints`, whose home is
`surface.md §2.12` item 2 and whose count's operative statement is `surface.md §2.9` item 1's dated clause of
this date — and the reading below is about the FIVE INTERNAL-ONLY NAMES and the construction verb and is
unaffected by a ninth named export:** **the entry's namespace named exports are the `9` of
`§2.9` item 1 — `delete` ·
`listen` · `read` · `readLiteral` · `rollback` · `storeCreate` · `unlisten` · `write` — and OF THE FIVE NAMES
THE CLAUSE ABOVE LISTS, FOUR ARE INTERNAL-ONLY (`version` · `errorMessage` · `call` · and the ADDON's own
`register`) WHILE THE FIFTH, `storeCreate`, IS ALSO THE ENTRY'S OWN CONSTRUCTION VERB AND IS THEREFORE A NAMED
EXPORT OF THIS UNIT'S SURFACE — *"NO ONE OF THE FIVE IS A NAMED EXPORT OF THE CLAIMED ESM ENTRY"* IS READ,
FROM THIS DATE, AS *"NO ONE OF THE FOUR INTERNAL-ONLY NAMES IS A NAMED EXPORT OF THE CLAIMED ESM ENTRY, AND THE
ENTRY'S NAMED EXPORTS ARE THE `8` OF `§2.9` ITEM 1 AND NOTHING ELSE"*.** **THE PACKAGE'S INSTANCE HANDLE'S ONE
MEMBER `register` IS NOT A NAMED EXPORT EITHER, being reached through the factory's own PRODUCT
(`surface.md §2.4` item 5 (a)); and WHAT THE AS-FILED SENTENCE FORBIDS IS AN NAME BEYOND THE DECLARED SET —
a NINTH entry name, or a SIXTH name on the internal artefact, which stays a FINDING.** **⟶ AND THIS SECTION IS ITSELF READ THROUGH, WITH ITS OWN TWO FIGURES NAMED AND WITHDRAWN, SO THE SUPERSESSION IS NOT INVERTED (`RCA-8(g)`, 2026-10-16): the two sentences above that print *"THE OPERATIVE FIGURE IS ELEVEN NAMES — `8 + 3 = 11`"* and *"THE OPERATIVE FIGURE IS `9` NAMES — `8 + 1 = 9`"* CARRY NO OPERATIVE LABEL FROM THIS DATE, and *"the clause below is read THROUGH"* is read the other way — THIS SECTION IS READ THROUGH `surface.md §2.9` item 1's `A127` clause and `§2.4` item 9 (f)'s `A127` clause of that date, whose ONE named export is `storeCreate` (`11 → 1` ✓) and whose product carries TWELVE own members (`10 + 1 + 1 = 12` ✓); the `11` is the `A126` pass's reading and the `9` the `A122`/`A123` pass's, each dated, and the cells this section's reading reaches — `§0.1`'s module-namespace cell, `§0.3`'s namespace cell, `§2.3`'s dated claim 2 — carry that mark at their own cells; THIS CELL IS NAMED IN NO OTHER READ-THROUGH LIST, WHICH IS WHY THE MARK STANDS HERE**
**AND THE TWO FIGURES THAT SETTLE IT, CITED AT THEIR SITE AND NOT RE-DERIVED HERE: the gate-5 blind run's
SURFACE scenario `JSG-01` holds at `13/13` — its `JSG-01.2` enumerating exactly the `8` names above, with
`storeCreate` among them — and the same run's `JSG-12.13` cell, re-derived as a DERIVATION after its first form
obeyed the as-filed sentence, PASSES with the FOUR internal-only names absent and `storeCreate` read as the
entry's own declared factory** (`archive/gate5/storeroom-js-greens-run.md` §2's named derivation correction and
§4 · `F-DOC-1`; the same finding's own home is `package.md §1.3` item 4's dated clause).
**THE FULL STATEMENT, AT THE PART THAT CARRIES THE ITEM: `docs/specs/storeroom-js/package.md §1.3`'s dated
clause of this date, which prints the as-filed sentence beside this one and is the operative statement of the
item; THIS clause carries the same split at the contract document's own home of the span and declares nothing
the part does not already carry.**
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed entry's own namespace; A1
docs/specs/storeroom-js-proposal.md §17 · `A75`; A3 docs/specs/storeroom-js/package.md §1.3 item 3 (the clause
that governs), item 4 and that item's dated clause (the operative statement); A3
docs/specs/storeroom-js/surface.md §2.4 item 5 (a); A3 archive/gate5/storeroom-js-greens-run.md §4 · `F-DOC-1` |
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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE MATRIX'S LABEL-TO-ARTEFACT MAP
AND THE LICENCE'S FOURTH SITE.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–4 above stand byte-for-byte; THIS
clause is a PURE INSERTION, it adds no target and moves no count, and it states the two spellings a consumer
and a CI script read.**

**5. THE MATRIX'S LABELS AND THE PUBLISHED ARTEFACTS' NAMES, AS ONE MAP — because three of the five
   published artefacts carry a TOOLCHAIN SUFFIX the label does not print.** **The label is the platform and
   architecture the matrix row is named for; the artefact name is the registry's own per-target package,
   `SCOPED-PACKAGE-<label>-<toolchain>`.** **THE FIVE ROWS, LABEL BESIDE ARTEFACT:**

   | # | The matrix label (item 2 above) | The published artefact's name |
   | --- | --- | --- |
   | 1 | `linux-x64` | `<the package's scope>-js-linux-x64-gnu` |
   | 2 | `linux-arm64` | `<the package's scope>-js-linux-arm64-gnu` |
   | 3 | `darwin-x64` | `<the package's scope>-js-darwin-x64` |
   | 4 | `darwin-arm64` | `<the package's scope>-js-darwin-arm64` |
   | 5 | `win32-x64` | `<the package's scope>-js-win32-x64-msvc` |

   **THE SUFFIX'S MEANING, STATED SO THE MAP IS NOT READ AS A SIXTH TARGET: `-gnu` is the LINUX TOOLCHAIN
   (the GNU C library and its ABI) and `-msvc` is the WINDOWS TOOLCHAIN (the MSVC ABI) — a target's TOOLCHAIN
   is not a target, so the matrix stays `5` TARGETS and `5` ARTEFACTS, `5 = 5` ✓** (`DD-25`).
   **The two `darwin` rows carry no suffix, because the Apple toolchain is the platform's only one.**
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A71; A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-16` | numeric or census claim]`).

**6. `AGPL-3.0` HAS A FOURTH DECLARED SITE, AND ITS SPELLING THERE CARRIES THE `-or-later` CLAUSE.**
   **The licence is declared (i) in the package's `package.json` `license` field, as `AGPL-3.0`; (ii) in
   `bindings/js/README.md`, as `AGPL-3.0`; (iii) at `package.md §3.4`, as `AGPL-3.0`; and (iv) in the sibling
   crate's own `bindings/js/Cargo.toml` `license` field, as `AGPL-3.0-or-later`.** **THE OPERATIVE SPELLING
   IS `AGPL-3.0` FOR THE DISTRIBUTION'S DECLARED FACT AND `AGPL-3.0-or-later` FOR THE CRATE'S OWN SPDX
   EXPRESSION, AND THE DIFFERENCE IS DECLARED RATHER THAN SMOOTHED:** **the fourth site is the crate
   manifest's SPDX field, whose grammar admits `-or-later` and whose value the crate's own consumers read;
   the repository's `LICENSE` is the file both spellings name, and no clause of this unit changes it.**
   **A FIFTH site, or a spelling other than these two, is a FINDING** (`DD-43`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.3 · `D9` — the licence is a DISTRIBUTION FACT; A1
   docs/specs/storeroom-js-proposal.md §15 · A71; `DD-43` | declared parameter semantics]`).

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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 2 (`archive/gate3/storeroom-js-red-set.md` §5 item 2) AT THIS SECTION.** `RCA-8(d)` ANNOTATE-BESIDE:
**items 1–4 above stand byte-for-byte; THIS clause is a PURE INSERTION and it is the pointer the `rlib`
half's own interface needs.** **Item 3 above says the `rlib` half makes the crossing's per-class table
drivable in Rust *"without a Node runtime"* — and the CORE'S OWN RUST INTERFACE is declared WHOLE at
`docs/specs/storeroom-js/package.md §4.5`: its module boundary, its JS-value model, its conversion
functions, its record types, its `Instance` methods and the edge between the JS-facing types and the core.**
**A citation to it names that part's path plus the `§`-number** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **AND THE REASON THE DECLARATION
IS A REQUIREMENT AND NOT A HINT, STATED WITH ITS TERM: the walk's own rules refuse on a `Symbol`-keyed own
property, on a hole, on an own accessor and on a `Proxy` (`§1.4` items 1–4), and the store's `StoreValue`
can carry NONE of those four states — so the JS-value model is UNAVOIDABLE in Rust, and without a declared
interface the `V1` drivability claim has nothing to be checked against**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`, the only variant in which the per-class table
is drivable in Rust BEFORE any addon exists | requirement]`).

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
(`[A3 docs/specs/storeroom-native/contract.md §7.2 item 5–6 and §5.7's `P-TP-7` row — **THE STORE UNIT'S OWN `P-TP-7`, SPELLED WITH ITS PATH HERE AND REACHED BY NO RENAMING** | state or fail-state
declaration]`).

**⟶ AMENDED 2026-10-27 — THE BYTES AT `cfg.filePath` ARE THE LAST SUCCESSFUL SAVE'S, AND A RESTORE THAT MOVES A
`file`-TIER NODE IS NOW ONE OF THE SAVE'S PRODUCERS (`bd0fd8c`).** `RCA-8(d)` ANNOTATE-BESIDE: **the hazard clause
above — *"a fresh boot over an equal path re-loads the LAST SUCCESSFUL `file` WRITE's bytes and no other state"* —
stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION beside it and moves no arm,
no refusal, no rank, no member, no record and no count.** **THE ARCHITECT'S RULING, VERBATIM: *"Update file after a
restore that touches file-tier nodes."*** (`strata/decisions.md`; the act is `bd0fd8c`'s). **WHAT MOVED, IN ONE
SENTENCE: the mark restore — the compensating act a REFUSED reversal performs — no longer performs no file I/O.**
It takes the `file` tier's projection (each register key's version standing at `Tier::File`, assembled at that
tier) BEFORE the replay and again AFTER it; **equal projections mean no version at `Tier::File` moved, so no byte
is touched and a restore that changes nothing file-tier keeps the old reading whole**, while a different one means
the restore SAVES, with the same serialization, image verification and sibling-and-rename commit a `file`-tier
write's save performs — **the store's one writer and never a second one** (`DD-2`). **A SAVE IS AN EFFECT AND NOT
AN OP**: the restore still appends no journal entry, compacts nothing and delivers no trigger, and a save that
cannot land is REPORTED after the replay has stood (`FileCommitFailed`, the in-memory state restored and the bytes
not updated) rather than swallowed. **SO THE CLAUSE'S SUBJECT IS UNMOVED AND ONE FIGURE OF IT MOVES: *"the LAST
SUCCESSFUL `file` WRITE's bytes"* READS *"the last successful SAVE's bytes, whose producers are a `file`-tier
`write`'s commit AND a restore that moved a version standing at `Tier::File`"*; *"and no other state"* STAND WHOLE
— the boot still reads the register image at the file tier and NOTHING ELSE (no journal, no registration, no `mem`
or `temp` version) — and a `delete` and a successful (unrefused) `rollback` still commit NOTHING, so `DD-28`'s and
`§2.8` item `1`'s readings stand for those two verbs.** **THE DECLARATION'S ONE HOME IS THE STORE'S:
`docs/specs/storeroom-native/contract.md §6.6` item `5`'s clause of the same date**, which carries the detection,
the save's identity and the failed save's report; **this clause declares only what moves on this side, and what
moves is the sentence a JS caller reads about the bytes.** **AND THE HAZARD ITSELF IS NOT WIDENED: two instances
over one `cfg.filePath` still clobber each other, and the second still boots whatever bytes the first last saved**
(`[A3 docs/specs/storeroom-native/contract.md §6.6 item 5's clause of 2026-10-27 and §7.2 items 2–5; `DD-28`'s
amended cell; `bd0fd8c` | state or fail-state declaration]`).

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
   **⟶ AND THE COMMAND ITSELF IS SPELLED AT `docs/specs/storeroom-js/package.md §4.2` ITEM 4'S DATED CLAUSE,
   WITH THE MANIFEST NAMED EXPLICITLY — `cargo test --manifest-path bindings/js/Cargo.toml --offline
   --no-fail-fast`, taken at the REPOSITORY ROOT — BECAUSE A `cd` FORM RESOLVES THE ROOT MANIFEST WHILE THE
   CRATE'S OWN MANIFEST DOES NOT YET EXIST AND SO RUNS THE STORE'S PACKAGE INSTEAD: `0` of this unit's `219`
   Rust cells executed, `exit 0`, the store's own green.** **THE ACCEPTANCE CONSEQUENCE STANDS WITH IT: a leg
   that silently runs the wrong package is NOT A LEG, so a Rust-leg figure whose executed-cell count belongs
   to the store's suite is VOID** (`archive/gate3/storeroom-js-red-set.md` §3, §5 item 3)
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10`; `DD-19` | requirement]`).
5. **THE SUITE'S OWN PATTERN, STATED SO IT IS CHECKABLE:** **one test per crossing row of `§1.2`/`§1.3`
   (the accepted form and each refused form), one test per verb's success shape, one test per code the
   surface can reach, one test per registry rule of `§2.4`, and one test per `HO-` row — the last asserting
   only that the package EXPOSES NO entry for that realm.**

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE NUMBERING DISCLOSURE THIS HOME
OWES, AND THE EXACT REPAIR IT NAMES.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1, 4 and 5 above stand
byte-for-byte and are read THROUGH this clause; no item's number, order or text is moved by it, and THIS
clause is a PURE INSERTION.**

**6. THE TWO HOMES' NUMBERS, STATED SO A READER NEEDS NO OTHER FILE, AND THE REPAIR NAMED RATHER THAN TAKEN
   SILENTLY.** **THIS document's `§4.1` prints items `1` · `4` · `5` — the as-filed item `1`, and the
   as-filed `4` and `5` — while its `carrier` part `acceptance.md`'s own `§4.1` prints `1` · `2` · `3` ·
   `4` · `5` with the inserted clauses `6`–`9` BESIDE them, as that part's own disclosure clause states.**
   **THE HOME IS THE FAULTY SITE AND THE PART IS NOT: `§4`'s authority note declares `acceptance.md` a
   relocation of this document's `§4` WHOLE, so this item list must print the part's own numbers, and items
   `2` and `3` are ABSENT from this home while `4` and `5` are printed as if contiguous.** **NO CLAIM MOVES
   BY THIS DISCLOSURE and no number is re-cut here.**
   **THE EXACT REPAIR, NAMED AS THE WORK OF A LATER BOUNDED PASS OF THIS DIRECTORY — AND IT IS NOT TAKEN
   HERE, BECAUSE TAKING IT WITHOUT THE PART'S ITEMS `2` AND `3` IN HAND WOULD PRINT THE PART'S NUMBERS OVER
   THE HOME'S OWN CONTENT AND INVERT THE DISCLOSURE RATHER THAN CLOSE IT:** **the pass RESTORES this home's
   items `2` and `3` from `acceptance.md`'s own bytes — the part's item `2` (*"THE RUST LAYER RUNS `cargo
   test` IN `bindings/js/`"*, **which is the passage this home prints as part of its item `4` and which the
   part's own item `2` carries with its dated pointer to `package.md §4.2` item 4's clause, where this home's
   item `4` already carries that same pointer**) and the part's item `3` (the suite's own pattern, **which is
   the passage this home prints as its item `5`**) — and it then prints the list CONTIGUOUSLY as `1`–`9`,
   with the as-filed `4` and `5` at their own places and the insertions `6`–`9` where the part places them,
   and WITH A DATED DISCLOSURE BESIDE THE RENUMBERED LIST so `git diff` still recovers every pre-pass byte.**
   **UNTIL THAT PASS LANDS, a reader of either home reads the two lists through this item and through
   `acceptance.md §4.1`'s own disclosure clause, which state the same two facts.**
   (`[A3 docs/specs/storeroom-js/acceptance.md §4.1 — the part's own item list and its disclosure clause,
   which this item is the home-side twin of; A1 | ordering claim]`).

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
**for every value `v` in the layer's corpus, `a.read(address)` after
`a.write(address, tier, v, commit?)` — `a` being the object `storeCreate(cfg)` returned, THE RECEIVER, and not a position — must be EQUAL to `v` UNDER THE RELATION OF `§1.5` —
member-SET equality for objects, array index order significant, and `Object.is` where sign or `NaN` matters.**
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: THE MODULE-FORM PROPERTY LINE AND ITS 2026-10-16 RE-SPELLING CLAUSE — which printed `read(instance, address)` after `write(instance, address, tier, v, commit?)` as *"the declared signature"* — HAVE LEFT THIS DOCUMENT and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §21`, whose source path and `§` are named there; the property, its relation (`§1.5`'s), its corpus and its TWO exclusions are UNMOVED and only the call shape it was stated over moves.** **AND THE PROPERTY'S OWN SHAPE, ITS RECEIVER RULE AND ITS REFUSAL SEMANTICS ARE DECLARED ONCE AT THIS SECTION'S CARRIER, `docs/specs/storeroom-js/acceptance.md §4.3`'s `A127` clause of this date, and re-emitted nowhere** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).
**THE CORPUS AND THE TWO EXCLUSIONS, AND NOTHING ELSE:** **the corpus is `various JSON` — a string, a
boolean, a finite number, an empty object, an empty array, a nested object, a nested array, an object
holding an array holding an object, and a value carrying an integer-like key beside a non-integer-like one;
and TWO DECLARED EXCLUSIONS stand: (i) a `file`-tier `-0` is read back as `0` after a boot — the declared
file-image normalization, asserted by the STORE's battery and NOT by this layer (`DD-5`); and (ii) object
member ORDER is not compared, because the engine re-orders integer-like keys.** **`0` other exclusion is
declared, and a third exclusion is a finding**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-14`'s round-trip property; A3
docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — **THE STORE UNIT'S OWN `P-IM-1`, WHICH THIS CITATION SPELLS WITH THAT UNIT'S PATH AND WHICH LIES OUTSIDE THIS UNIT'S REGISTER AND OUTSIDE THE 2026-10-17 RE-MINT** | requirement]`).

**⟶ AMENDED 2026-10-21 BY `A140`: EXCLUSION (i) IS READ AT THE PACKAGE BOUNDARY, NOT ONLY THE FILE TIER.** **A `-0` written at `mem`, `temp` or `file` reads back `0`, because the binding's conversion core normalizes it. The store's native `mem`/`temp` sign rule is unmoved; the file tier's own normalization is still the store's. The exclusion count is `2` and no third exclusion is declared** (`A140`; `DD-5`).

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

**⟶ AND THE TYPED REGISTER'S OWN ANSWER TO THE `A127` PASS OF 2026-10-16 IS **ZERO ROWS**, WITH ITS RATIONALE WRITTEN RATHER THAN LEFT SILENT — AND THE QUESTION IS ANSWERED HERE BECAUSE THIS UNIT IS CODE-BEARING, SO A SILENT ZERO ROW WOULD BE A FINDING RATHER THAN AN OMISSION (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16).** **THE RATIONALE, IN FOUR CLAUSES:**
1. **WHAT A REGISTER ROW IS FOR, AT THIS UNIT'S OWN FORM: a row carries ONE PROPERTY, one or more strategy ids and an explicit FAILURE LIST, and it pins an observable a drive can take** (this section's form clause and `docs/specs/storeroom-native/contract.md §5.2`). **So a row is owed where this pass declares a NEW PROPERTY, and not where it re-spells the subject of an existing one.**
2. **WHAT `A127` MOVES IS A SPELLING AND A RECEIVER, NOT A PROPERTY: the ten names' arguments keep their own classes, their own domains and their own outside values, and the ONE position it removes — `instance` — is not the subject of any row of this register.** **SO NO PROPERTY OF THE CROSSING, OF THE REGISTRY'S TRANSITIONS, OF THE CONSTRUCTION'S SEQUENCE OR OF THE PACKAGE'S BOOT IS ADDED, WIDENED OR DIVIDED BY IT, and the pass owes no row under clause 1.**
3. **AND THE CAP IS NOT THE REASON: with `8` rows at `8 ≤ 8` a ninth row would move the cap, so the honest form of this disclosure is that a row was NOT NEEDED rather than that one was not available.** **NO NINTH ROW IS MINTED AND NO EXISTING ROW'S SUBJECT CHANGES** — the register's `8` rows, their strategy ids and their failure lists stand as `§5.1`–`§5.8` print them.
4. **WHAT A DRIVE TAKES FROM THIS PASS INSTEAD OF A ROW, NAMED SO THE ZERO IS ACTIONABLE: the ten methods' arity, positions, answers and refusals are ONE TABLE at `surface.md §2.4` item 9 (f)'s `A127` clause of this date, whose rule (ii) is the `TypeError` form and whose rule (i) is the store's own `{status, message}` — so a TestWriter derives every one of the pass's failure cells from that clause and from the `PAR-JS` rows it cites, and no cell of the pass is left without a home.** **AND THE ONE ROW WHICH COULD HAVE BEEN THOUGHT OWED — a row for the namespace's fall from eleven names to one — is `P-TP-7`'s subject already: it pins the package's boot, the realm claim and the handoff set, and the export set is that row's own cell, re-spelled at `surface.md §2.9` item 1's `A127` clause and at `§2.4` item 9 (f)'s owed-types sentence** **⟶ AND THIS CELL'S OWN CITATION IS CORRECTED 2026-10-16 BY THE GATE-3 RED-PHASE CELL-DISPOSITION PASS: `P-TP-7`'s subject is unmoved, while the `§2.9` item 1 `§` this cell prints is the EXPORT-SET enumeration's home and not the TEN METHODS' TABLE — the pass's drive surface is `surface.md §2.4` item 9 (f)'s `A127` clause, which is the ONE home of the ten methods' arity, positions, answer and refusal, and a drive that derives a failure cell from the pass reads THAT table and not this cell's re-spelling** (`§2.9` item 1's `A127` clause; `§2.4` item 9 (f)'s clause of the same date; `A127`) (`[A2 docs/decisions.md` · `A127` · `A128`; A3 docs/specs/storeroom-js/surface.md §2.1, §2.4 item 9 (f), §2.9 item 1 and its removal clause, and §2.12 items 2–4, each of this date; A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — the per-unit cap | numeric or census claim and declared parameter semantics]`).

**⟶ AND THIS SECTION'S TRUE ROW COUNT AND ITS ROWS' TRUE SUBJECT ARE STATED AT THIS DATE, 2026-10-16, SO THE ZERO ABOVE CANNOT BE READ AS AN EMPTY REGISTER BESIDE THE `8` PRINTED BELOW (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16; `RCA-8(g)`).** **THE COUNT: THE REGISTER PRINTS `8` ROWS — `§5.1`–`§5.8`, `3 + 3 + 2 = 8` ✓ — AND THE CAP HOLDS AT `8 ≤ 8` ✓, so the zero clause 4 above claims is a zero of **ROWS OWED BY THE PASS** AND NEVER A ZERO OF **ROWS THIS SECTION PRINTS**; the pass mints no ninth row and the cap is not the reason (`§5.0` clause 3, unmoved).** **THE SUBJECT: EVERY ROW'S PROPERTY IS DECLARED OVER THE TEN METHODS OF `§2.4` ITEM 9 (f)'S `A127` CLAUSE OF THIS DATE — the receiver being the object `storeCreate(cfg)` returned and NO POSITION OF ANY OF THE TEN AN INSTANCE — so the crossing, the registry's transitions, the construction's sequence and the package's boot are ROWS THIS REGISTER ALREADY CARRIES, and `A127` moves their drive's SPELLING and its RECEIVER and no property of them** (`§5.1`–`§5.8`; `surface.md §2.4` item 9 (f)'s `A127` clause; `surface.md §2.1` (e) item 3). **AND THE EIGHT ROWS' OWN DISPOSITION, NAMED ONCE SO NO DRIVE RE-DERIVES IT: NOT ONE ROW IS MINTED, MOVED, RENUMBERED OR WITHDRAWN BY THE PASS; every row's property, strategy ids, failure list and cited clauses STAND BYTE-FOR-BYTE AT ITS OWN HOME; and each row's STRATEGY SUBJECT — the shape of the drive each id names — is RE-DERIVED ON THE METHOD SURFACE, which is the reading `§5.5`'s own re-derivation clause already carries for the whole register when it states that the register stands at its `8` rows with the cap holding (`§5.5`; `surface.md §2.4` item 9 (f)'s `A127` clause; `A127`).** **AND NO ROW OF THIS SECTION PRINTS A CALL SHAPE, AN ORDINAL OR A MODULE-FUNCTION FORM: a drive reads a row's property, its strategy ids and its failure list, and reaches the surface through the ten-method table — which is exactly what clause 4 above directs a TestWriter to do** (`§5.0` clause 4; `surface.md §2.4` item 9 (f)'s table of this date).

**`8` rows — `P-SR-1` · `P-SR-2` · `P-SR-3` (invariants) + `P-SR-4` · `P-SR-5` · `P-SR-6`
(state/arm rows) + `P-SR-7` · `P-SR-8` (transition/property rows) — `3 + 3 + 2 = 8` ✓**, **and every row
below carries a property, one or more strategy ids, and an explicit FAILURE LIST.** **A strategy id names
the shape of the drive; a row's failure list names every observable that makes it FAIL**
(`[A3 docs/specs/storeroom-native/contract.md §5.2 — the row form, cited as the form's precedent |
requirement]`).

**⟶ AND THIS CENSUS'S OWN EIGHT SPELLINGS ARE RE-MINTED AT THIS CELL, 2026-10-17 BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`; `RCA-8(g)`: the census line above stands BYTE-FOR-BYTE and is read THROUGH this clause, which re-spells its eight ids and moves NO term of its arithmetic).** **`8` ROWS, `P-SR-1` · `P-SR-2` · `P-SR-3` (invariants) + `P-SR-4` · `P-SR-5` · `P-SR-6` (state/arm rows) + `P-SR-7` · `P-SR-8` (transition/property rows) — `3 + 3 + 2 = 8` ✓ — AND THE CAP HOLDS AT `8 ≤ 8` ✓.** **THE THREE TERMS, THE ORDER OF THE ROWS AND THE `§`-NUMBERS `§5.1`–`§5.8` ARE ALL UNMOVED: a re-mint renames ids, and this census's arithmetic is a count of ROWS and not of spellings.** **AND THE MAPPING IS PRINTED ONCE AT THIS DOCUMENT'S UNIT/PREFIX LINE ABOVE, `P-IM-1 → P-SR-1` THROUGH `P-TP-8 → P-SR-8`, so no reader derives a spelling from a diff** (`DD-3`'s re-derived row; `DEF-2026-10-16-S`; this document's `§0.2` reconciliation table's mark of the same date).

**⟶ AND THE FOUR THINGS THE BOUNDED CORRECTION PASS OF 2026-10-11 MOVES IN THIS SPAN — NONE OF THEM A ROW OR A
COUNT** (`RCA-8(d)` ANNOTATE-BESIDE: **the census above stands byte-for-byte; THIS clause is the operative
statement of what the same pass changed under it, and it is a PURE INSERTION**): **(1) THE ROW COUNT DOES NOT
MOVE — it is `8`, the cap holds at `8 ≤ 8`, and NO NINTH ROW IS MINTED** — **because the red set's CONTRACT
FINDING 6 (`archive/gate3/storeroom-js-red-set.md` §5 item 6) was closed by RECONCILING the `19` `P-TP-9`
citations of `§0.2` to rows that EXIST, as `§0.2`'s own dated reconciliation clause lists, and not by adding
a row.** **(2) `P-SR-5`'s `S-REG` LINE IS NOW DRIVABLE:** **`§2.4` item 5 declares the registration site's
spelling — `register(handle, listener)` on the object `storeCreate` returned — so that strategy id's drive
reaches the registry instead of being `un-run`, and `un-run` IS A FAILURE** (`§5.5`). **(3) `P-SR-8`'s
`S-FIRE-WINDOW` line's INVOCATION sub-half is drivable for the same reason, and its window, order and
throwing-body halves are unchanged** (`§5.8`). **(4) THE `alt` CELLS AND THE FAILURE LISTS OF EVERY ROW
STAND UNMOVED**, **and the register's citation surface is unchanged: a `§n` citation names the section and a
`P-*` citation names the row, exactly as `§5.0`'s dual-mapping disclosure reads** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-6` — the register exists, `≤ 8` rows, one failable row
per named interaction; A3 docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions | requirement]`).

**AND ONE DUAL-MAPPING DISCLOSURE, PRINTED BECAUSE THIS SPAN CARRIES TWO READINGS OF THE SAME NUMBERS — AND
THE RULE EVERY CITATION IN THIS DIRECTORY OBEYS** (`RCA-8(d)` ANNOTATE-BESIDE: **this clause adds no row,
moves no row and changes no property; it states how a `§5.x` citation is read**): **the numbered span below
carries `8` REGISTER ROWS — one row per `§5.1`…`§5.8` — and NO OTHER numbered content; the `P-*` IDS are
`P-SR-1` · `P-SR-2` · `P-SR-3` · `P-SR-4` · `P-SR-5` · `P-SR-6` · `P-SR-7` · `P-SR-8` and their numbers do NOT
track the `§`-numbers, because the id family's ordinal is the row's own and the `§`-number is its position
here.** **SO A `§n` CITATION IN THIS DIRECTORY NAMES THE SECTION, AND A `P-*` CITATION NAMES THE ROW — and a
sentence that says *"`§5.2`'s `P-SR-2`"* is naming a section and the row that lives in it, which is the ONE
reading this contract uses.** **⟶ AND THE EIGHT SPELLINGS ABOVE ARE RE-MINTED AT THIS CELL, 2026-10-17, BY `DEF-2026-10-16-S`'s RE-MINT PASS (`RCA-8(g)`: the disclosure's own RULE stands BYTE-FOR-BYTE and is UNMOVED — a `§n` citation still names the section and a `P-*` citation still names the row — while the EIGHT IDS IT PRINTS MOVE FROM `P-IM-1`…`P-TP-8` TO `P-SR-1`…`P-SR-8`, THE MAPPING BEING THE ONE PRINTED AT THIS DOCUMENT'S UNIT/PREFIX LINE).** **AND THE DISCLOSURE'S WORK IS NARROWED RATHER THAN ENLARGED BY THAT: with the two units' registers now DISJOINT, a bare `P-SR-n` citation names ONE row in this repository and needs no path to disambiguate it, while the `§`-number still names the section — so the disclosure keeps exactly the half it still owes and loses the half the collision had forced on it** (`DEF-2026-10-16-S`; this document's unit/prefix line and its `DD-3` row as re-derived). **THE RULE IS THIS PROJECT'S OWN DIRECTORY-FORM DECISION and it takes no
ruling** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6's prohibitions — the per-unit cap and
the no-second-register rule — read with this section's own `§5.0` | cross-reference]`).

**⟶ AND ONE LINE OF THIS SPAN IS RE-SPELLED BY THE BOUNDED CLOSE-OUT PASS OF 2026-10-11, WITH THE ROW COUNT
UNMOVED** (`RCA-8(d)` ANNOTATE-BESIDE: **the census above and the disclosure above stand byte-for-byte; THIS
clause is the operative statement of the ONE strategy line the same pass re-spelled, and it is a PURE
INSERTION**): **(1) THE ROW COUNT DOES NOT MOVE — it is `8`, the cap holds at `8 ≤ 8`, and NO NINTH ROW IS
MINTED.** **(2) `P-SR-5`'s `S-WITHDRAW` LINE IS RE-SPELLED, AND THIS IS THE ONE CELL THIS PASS MOVES:** **its
subject is read as *"after `unlisten`, the function never fires again; a LATER `listen` AT THE SAME ADDRESS
MINTS A NEW HANDLE WHERE THE WITHDRAWAL REMOVED THAT ADDRESS'S HOME ENTRY, and returns the EXISTING entry's
handle where the address is still registered"*** — **because `§2.3` item 6 now declares the inherited
address-level mint rule and `§2.4` rule 4's *"a DIFFERENT handle"* is true of exactly the withdrawn case**
(`§2.3` item 6). **(3) THE `alt` CELLS AND THE FAILURE LISTS OF EVERY ROW STAND UNMOVED, `P-SR-5`'s included:
its failure list's *"a re-`listen` that re-uses a withdrawn handle"* stays FALSE-OF-THE-BUILD as printed,
because a re-`listen` at a removed address mints a FRESH token and never re-uses the withdrawn one** (`[A1
docs/specs/storeroom-js/contract.md §2.3 item 6 — the inherited mint rule; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c); `DD-15` | requirement]`).

**⟶ AND THE SAME ROW'S `S-WITHDRAW` LINE IS RE-DERIVED AT ITS OWN `§`, LANDED 2026-10-11 BY THE BOUNDED
DECLARATION PASS (`role_spec_writer`), CLOSING GATE 4'S OVER-STRONG FINDING.** `RCA-8(d)` ANNOTATE-BESIDE:
**both clauses above stand byte-for-byte and are read THROUGH this one; THIS clause is a PURE INSERTION, it
moves no row and re-decides no rule, and it does what the clause above named but did not print at the row's
own `§`: it prints the operative subject at `§5.5`.** **THE ROW COUNT DOES NOT MOVE — it is `8`, the cap holds
at `8 ≤ 8`, NO NINTH ROW IS MINTED, and the `alt` cells and the failure lists of every row stand unmoved.**
**The re-derivation itself, with its two arms and their own observables, stands at `§5.5`'s dated clause,
which is its home; gate 4's audit is the finding it closes** (`archive/gate4/storeroom-js-adversarial.md` §B ·
`P-SR-5`; `§5.5`) (`[A1 docs/specs/storeroom-js/contract.md §2.3` item 6 — the inherited mint rule; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) | requirement]`).

**⟶ AND THE ONE ASSERTION THIS SPAN CARRIED THAT WAS FALSE OF THE ROW'S OWN TEXT IS NAMED RESOLVED HERE,
LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **the
census above, the dual-mapping disclosure and the re-spelling clause above it stand byte-for-byte, and each
is read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no row, moves no count, mints no id
and re-decides no rule.** **THE ASSERTION, RE-EMITTED VERBATIM SO `git diff` RECOVERS IT WHERE IT STANDS:**
*"**`P-SM-5`'s `S-WITHDRAW` LINE IS RE-SPELLED, AND THIS IS THE ONE CELL THIS PASS MOVES**"* — **which was
FALSE of the row's text, because the strategy line at `§5.5` still printed its as-filed words, and TRUE only
of the cell's re-derived subject printed above it** (**the ID INSIDE THE RE-EMITTED SENTENCE IS THE AS-FILED ONE AND IS KEPT AS FILED, 2026-10-17: that sentence is `git diff`'s recovery of the 2026-10-11 assertion and prints that assertion's own spelling, while the ROW it names is `§5.5`'s and that row's id is `P-SR-5` from the re-mint of this date, `DEF-2026-10-16-S`; and the false-of-the-row reading
is the one the pass that
followed this clause filed at `§5.5`, and NOTHING OF IT IS WITHDRAWN**). **THE REPAIR IS TAKEN NOW AND ITS
HOME IS THE ROW'S OWN `§`: the line's OPERATIVE SUBJECT is re-spelled and printed at `§5.5`'s own dated clause
of this pass, with the as-filed sentence re-emitted verbatim beside it and the two arms — the WITHDRAWN arm's
fresh handle and the STILL-REGISTERED arm's existing entry's handle — each carrying its own observable.**
**SO THIS ASSERTION IS RESOLVED AND NOT CARRIED FURTHER: the cell it names HAS moved, at its own `§`, in this
pass.** **THE REGISTER STANDS AT ITS `8` ROWS WITH THE CAP HOLDING (`8 ≤ 8` ✓), NO NINTH ROW IS MINTED, AND
THE `alt` CELLS AND THE FAILURE LISTS OF EVERY ROW STAND UNMOVED** (`[A1 docs/specs/storeroom-js/contract.md
§2.3 item 6 — the inherited mint rule; A3 docs/specs/storeroom-js/contract.md §5.5's dated clause of
2026-10-11 — the re-spelled subject's home; A3 docs/specs/storeroom-js/surface.md §2.3's dated clause — the
reconciliation | state or fail-state declaration]`).

**⟶ AND THE `Q1` CONTRACT AMENDMENT'S OWN STATEMENT AT THIS CENSUS, LANDED 2026-10-11 BY `role_spec_writer` ON
THE ARCHITECT'S RULINGS `A79`–`A81`: THE ROW COUNT HOLDS AT `8`, AND THE ROW THIS AMENDMENT'S TWO NEW MEMBERS
EXTEND IS NAMED.** `RCA-8(d)` ANNOTATE-BESIDE: **every clause above stands byte-for-byte and is read THROUGH
this clause; THIS clause is a PURE INSERTION — it mints NO ninth row, moves NO count, adds, drops and renames NO
row, and re-decides no rule of the register.** **AND THE THREE CELLS OF THIS SPAN, EACH AT ITS OWN TERM:**
1. **THE ROW COUNT DOES NOT MOVE: `8` rows, the cap holds at `8 ≤ 8` ✓, and NO NINTH ROW IS MINTED** — **the two
   new instance members have a FAILABLE home without one, and it is `§5.5`'s, whose re-derivation stands at that
   row's own dated clause: `P-SR-5`'s SUBJECT ALREADY NAMES THE REGISTRY'S TRANSITIONS AND THE HANDLE'S TWO
   SPELLINGS, and `on` and `off` are actions UPON that registry AT that handle** (`§2.4` item 7; `A79`; `A80`).
2. **`P-SR-5` IS RE-DERIVED, NOT SUPPLEMENTED, AND ITS RE-DERIVATION IS AT ITS OWN `§`** (`§5.5`'s dated
   clause of this pass), **where its subject is printed beside the as-filed line and its failure list gains the
   `6` entries the two new members make real.** **NO STRATEGY ID IS ADDED: `S-REG` carries the two new sites'
   arms, `S-OPAQUE` carries the two-spellings half unchanged, and `S-WITHDRAW` carries the `off`/`unlisten`
   contrast as a SECOND arm** — **because a row is FAILABLE only where its own failure list names the observable
   that fails it, and all three of those lines are already that row's.**
3. **AND NOTHING ELSE OF THIS SECTION MOVES: the `alt` cells and the failure lists of `§5.1`–`§5.4` and
   `§5.6`–`§5.8` stand exactly as printed; the dual-mapping disclosure above stands; and the `derivation:`
   clause stays SINGLE** — **this clause carries an authority tag and no `derivation:` clause**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-6` — the register exists, `≤ 8` rows, one failable row
   per named interaction; A3 docs/specs/storeroom-js/contract.md §5.5's dated re-derivation clause of
   2026-10-11 — the row this statement names | numeric or census claim]`).

**⟶ ADDED 2026-10-16 — THE REGISTER'S ATTEMPT BUDGET IS DECLARED HERE WITH BOTH HALVES, BOTH EQUATIONS AND THE ONE SITE THAT MUST FAIL WHEN EITHER IS EXCEEDED, BECAUSE THE `≤ 400`-TOTAL FIGURE THIS DIRECTORY PRINTED WAS A CAP ASSERTED PER HALF AGAINST A WHOLE-LEDGER LIMIT AND COULD NOT FAIL (`role_spec_writer`; `RCA-8(g)`: this clause is a PURE INSERTION — it adds no row, moves the `8 ≤ 8` census, re-derives no property, no strategy id and no failure list, and every clause above stands BYTE-FOR-BYTE and is read THROUGH it).** **A CAP ASSERTED PER-HALF AGAINST A WHOLE-LEDGER LIMIT IS NOT A CAP: it lets each half approach the limit alone, and it leaves the arithmetic that the limit's own words demand unchecked.** **THE DECLARED BUDGET, IN FOUR CLAUSES:**

1. **THE TWO HALVES OF THIS REGISTER'S LEDGER ARE NAMED, EACH WITH ITS RUNNER AND EACH WITH ITS OWN TOTAL — `RUST` AND `JS` — AND THE LEDGER IS THE SUM OF THE TWO AND OF NOTHING ELSE.** **THE `RUST` HALF IS `bindings/js/tests/register_layer.rs`, which drives `5` ROWS (`P-SR-1` · `P-SR-2` · `P-SR-3` · `P-SR-4` · `P-SR-6`) over `19` strategy lines and prints its own total at its own report line *"`REGISTER LAYER attempts={total} rows=5 (rust side) verdict=HELD`*"*.** **THE `JS` HALF IS `bindings/js/test/register.test.mjs`, whose header at its own `:1`–`:9` states which three rows it drives and which five the Rust runner drives — *"Together the two runners cover all `8`"* — and whose LEDGER (`:88`, `:199` · `:570` · `:610`) drives the `3` ROWS `P-SR-5` · `P-SR-7` · `P-SR-8` over `12` strategy lines, printing its own total at its own report line *"`REGISTER JS SIDE attempts=… rows=3 driven_lines=… un_run_lines=…`*"*.** **THE TWO ROW SETS ARE DISJOINT AND THEIR UNION IS THE REGISTER: `5 + 3 = 8` ✓ at `8 ≤ 8` ✓.** **A RUNNER'S OWN PRINTED TOTAL IS THE READING OF ITS OWN HALF; NO THIRD NUMBER IS INVENTED FOR EITHER HALF.** **⟶ AND THE FIVE AND THE THREE IDS THIS CLAUSE PRINTS ARE RE-SPELLED WITH THEIR ROWS, 2026-10-17 BY THE RE-MINT PASS (`DEF-2026-10-16-S`; `RCA-8(g)`: the clause's own figures `19`, `12`, `5`, `3` AND ITS SUM `5 + 3 = 8` ✓ ARE UNMOVED, and only the SPELLINGS move): the two runners' own LEDGER LITERALS still spell `P-IM-1`…`P-TP-8` at their bytes, and re-deriving them to `P-SR-1`…`P-SR-8` is the RUNNERS' AUTHORS' act, named here as a red-set duty and edited nowhere by this pass** (`DEF-2026-10-16-S`).
2. **THE PER-ROW CEILING IS `≤ 100` ATTEMPTS, AND IT IS DECLARED OVER THE ROW AND NOT OVER THE LINE: a row's attempts are the SUM of its strategy lines on BOTH RUNNERS, so the ceiling is taken at the row and no line is a cap of its own.** **IT HOLDS AT EVERY ONE OF THE `8` ROWS, AND THE READING IS ARITHMETIC ACROSS THE TWO FILES: `P-SR-1` `100 ≤ 100` ✓ (`40 + 30 + 30`, the Rust half's three lines — the ceiling is reached here and is not passed) · `P-SR-2` `100 ≤ 100` ✓ (`20 + 20 + 15 + 15 + 10 + 20`) · `P-SR-3` `55 ≤ 100` ✓ (`15 + 30 + 10`) · `P-SR-4` `80 ≤ 100` ✓ (`20 + 40 + 20`) · `P-SR-5` `50 ≤ 100` ✓ (`20 + 10 + 10 + 10`, the JS half) · `P-SR-6` `60 ≤ 100` ✓ (`20 + 10 + 15 + 15`) · `P-SR-7` `22 ≤ 100` ✓ (`5 + 5 + 7 + 5`, the JS half) · `P-SR-8` `35 ≤ 100` ✓ (`10 + 10 + 10 + 5`, the JS half) — **`100 + 100 + 55 + 80 + 50 + 60 + 22 + 35 = 502` ✓, and THE CEILING IS `≤ 100` PER ROW AND NOT A BUDGET FOR THE LEDGER: `8 × 100 = 800` is the sum the ceiling alone would permit, so the ledger's own bound is clause 3's and never this one.**
3. **THE LEDGER-WIDE CEILING IS `≤ 400` ATTEMPTS, AND IT IS ASSERTED OVER BOTH HALVES AT ONE SITE, NEVER PER HALF — `RUST_TOTAL + JS_TOTAL ≤ 400` — AND THE ONE READING THE DECLARED FIGURES GIVE IS `395 + 107 = 502`, SO THE `≤ 400`-TOTAL FIGURE THIS DIRECTORY PRINTED AT `§7.2`'S AND `§7.1`'S CELLS IS FALSE OF THIS LEDGER AS FILED AND IS SUPERSEDED AT ITS OWN CELL BELOW.** **⟶ AND THIS CLAUSE'S THREE FIGURES ARE RE-READ, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the `≤ 400`-TOTAL LIMB OF THE SENTENCE STANDS BYTE-FOR-BYTE AT ITS OWN BYTES AND IS SUPERSEDED AT CLAUSE `4` BELOW, WHICH IS THIS SECTION'S OWN OPERATIVE STATEMENT OF THE LEDGER'S BOUND — the ledger total `395 + 107 = 502` this clause prints is CORRECT AND IS THE OPERATIVE FIGURE, and only the `≤ 400` limb printed beside it is the superseded bound.** **THE `395` IS THE RUST HALF'S OWN TOTAL: `100` (`P-SR-1`) `+ 100` (`P-SR-2`) `+ 55` (`P-SR-3`) `+ 80` (`P-SR-4`) `+ 60` (`P-SR-6`) `= 395` ✓.** **THE `107` IS THE JS HALF'S OWN TOTAL: `P-SR-5`'s four lines `20 + 10 + 10 + 10 = 50` ✓ plus `P-SR-7`'s four `5 + 5 + 7 + 5 = 22` ✓ plus `P-SR-8`'s four `10 + 10 + 10 + 5 = 35` ✓, `50 + 22 + 35 = 107` ✓.** **AND THE SUM IS `19 + 12 = 31` strategy lines and `395 + 107 = 502` attempts.**
4. **AND THE ONE SITE THAT MUST FAIL, STATED SO THE CAP CAN FAIL: THE LEDGER'S OWN BOUND IS `≤ 502` ATTEMPTS, TAKEN AT THE TWO RUNNERS' OWN REPORT LINES — `RUST_TOTAL = 395` and `JS_TOTAL = 107`, `395 + 107 = 502` ✓ — SO (i) A `RUST_TOTAL` OR A `JS_TOTAL` THAT EXCEEDS ITS OWN DECLARED FIGURE FAILS THE LEDGER'S BOUND, AND (ii) AN ATTEMPT COUNT ADDED TO EITHER HALF THAT THIS CLAUSE'S FIGURES DO NOT CARRY FAILS IT TOO, because the declared sum is the reading and the bound is `≤` it and not `≤` a round number the reading may drift under.** **THE `502` IS DECLARED AS THE OPERATIVE FIGURE AND IS NOT A HEADROOM BUDGET: THE ONLY ROOM ABOVE IT IS `0`, and a bounded amendment that moves either half moves this clause's three figures at the same time — `395`, `107` and `502` — or leaves a cap that cannot fail.**
**AND THE TWO ASSERTION STATES OF THE TWO RUNNERS ARE STATED PLAINLY, EACH READ AT ITS OWN BYTES, SO THE CAP'S OWN ENFORCEMENT IS NOT TAKEN ON TRUST: the `JS` half ASSERTS it — *"the register layer may not exceed 400 attempts"*, `assert.ok(total <= 400)` at `bindings/js/test/register.test.mjs:816`, over that runner's own `total` — WHILE THE `RUST` HALF DECLARES THE BUDGET IN ITS HEADER (*"`≤ 100` attempts per row, `≤ 400` TOTAL"*) AND PRINTS ITS TOTAL (`:776`–`:777`) AND ASSERTS NO TOTAL CAP AT EITHER SITE.** **SO TODAY NEITHER RUNNER ASSERTS THE LEDGER-WIDE LIMIT, AND A CAP ASSERTED PER HALF AGAINST A WHOLE-LEDGER LIMIT IS NOT A CAP — WHICH IS WHY CLAUSE 4's SITE IS STATED AS THE DUTY AND NOT AS A MEASUREMENT.**
**AND WHAT THIS CLAUSE DOES NOT TOUCH, NAMED SO ITS ARITHMETIC IS NOT READ INTO ANY OTHER REGISTER: the `21 × 19 = 399 ≤ 400` budget is `U-STOREROOM-CONSTRAINTS`' TEST'S OWN — `bindings/js/test/constraint-kernel-properties.test.mjs`'s `ROWS_OF_CHECKS` × its `ROW_BUDGET`, `min(100, floor(400 / 21)) = 19` against that file's `MAX_ATTEMPTS_TOTAL = 400` — and ITS `400` IS NOT THIS REGISTER'S, WHILE THE RETIRED READING *"`12 × 25 = 300 ≤ 400`"* IS THAT SAME FILE'S OWN WITHDRAWN FIGURE (*"a row count no row of `contract.md §5` declares"*, at its `:1431`–`:1433`) AND IS CARRIED BY NO CELL OF THIS DIRECTORY.** **THIS CLAUSE MOVES NO FIGURE OF THAT FILE, OF THAT REGISTER OR OF `§7.1`/`§7.2`'s other cells** (`[T: the two runners' own report lines and header budget sentences, and the two halves' per-row arithmetic, read at their own bytes; A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — the per-unit cap and the kind rule | numeric or census claim]`).

**⟶ ADDED 2026-10-16 — THE SAME CLAUSE, SECOND HALF: WHICH UNIT OWNS `contract.md §5.1`–`§5.8`, WHETHER A SECOND UNIT MAY READ THE SAME ROWS, AND WHY A BARE ROW ID DOES NOT RESOLVE WITHOUT ITS PATH (`role_spec_writer`; `RCA-8(g)`: this clause is a PURE INSERTION — it adds no row, mints no id, moves no count of either unit and re-decides no ruling).** **THE TWO FACTS, EACH STATED BECAUSE A REGISTER READ BY TWO UNITS IS A SPEC FACT AND NOT AN ACCIDENT:**

1. **THIS UNIT OWNS THE ROWS THIS SECTION DECLARES: `contract.md §5.1`–`§5.8` OF `docs/specs/storeroom-js/` ARE `U-STOREROOM-JS`' OWN — `P-SR-1` · `P-SR-2` · `P-SR-3` · `P-SR-4` · `P-SR-5` · `P-SR-6` · `P-SR-7` · `P-SR-8` at `§5.1` … `§5.8` in that order, `3 + 3 + 2 = 8` ✓ at `8 ≤ 8` ✓ — and their properties, their strategy ids and their failure lists have their ONE home HERE.** **NO OTHER UNIT AUTHORS A ROW IN THIS SPAN, AND NO ROW OF IT IS REACHED, RE-USED OR MOVED BY ANOTHER UNIT** (`§0.1` item 5's cap and no-second-register rule; `§C.6`'s prohibitions).
2. **AND A SECOND UNIT READS THE SAME `§`-SPAN AND THE SAME ROW IDS WITH ITS OWN STRATEGY FAMILY, WHICH IS A COLLISION OF IDS AND NOT A COLLISION OF CLAIMS: `U-STOREROOM-CONSTRAINTS` DECLARES `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` · `P-SM-5` · `P-SM-6` · `P-TP-7` · `P-TP-8` at ITS OWN `contract.md §5.1`–`§5.8` — `docs/specs/storeroom-constraints/contract.md:20`, `:403`–`:406`, the `8` rows — AND ITS OWN RED SET READS THEM WITH A DISJOINT STRATEGY FAMILY: `S-KEY` · `S-KEY-ADDR` · `S-CHECK` · `S-REC` · `S-REC-SURFACE` · `S-REC-DISPOSE` · `S-REC-RETAIN` · `S-CHAN` · `S-CHAN-CONV` · `S-CHAN-FORM` · `S-ATT-ARM` · `S-ATT-OUT` · `S-ATT-SHAPE` · `S-SIDE` · `S-WINDOW` · `S-LOG-ORDER` · `S-NO-STORE-ORDER` · `S-FIRST-REPEAT` · `S-SECOND-VIOLATION` · `S-NO-BUDGET` · `S-ROLLBACK-ALL` · `S-ROLLBACK-PER-OP` · `S-ROLLBACK-FLOOR` · `S-ROLLBACK-TARGET` · `S-MARK-ATTEMPT` · `S-MARK-SCOPE` · `S-MARK-NO-HOME` — `27` ids, `3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27` ✓ — read at `bindings/js/test/constraint-kernel-properties.test.mjs:12`–`:29` and listed at `:1381`–`:1390`.** **THE TWO STRATEGY SETS SHARE NO ID, SO NO STRATEGY ID IS AMBIGUOUS.** **THE TWO ROW-**ID** SETS ARE IDENTICAL, SO EVERY BARE `P-`-CITATION IS AMBIGUOUS AND IS RESOLVED BY ITS FILE PATH AND BY NOTHING ELSE — a bare `P-SM-5` names TWO rows in this repository: this unit's registry-transition row and the other unit's function-side row.** **THEREFORE: THE ROW ID FAMILY IS COLLIDED ACROSS TWO UNITS, EACH UNIT'S TEST FILE CITES ITS OWN CONTRACT'S ROWS AND THE OTHER'S ROWS ARE NOT REACHED, AND A CITATION OF ANY OF THE EIGHT IDS WITHOUT A PATH IS A FINDING.** **AND A THIRD UNIT MINTING THESE IDS AGAIN, OR THIS UNIT AUTHORING A ROW IN THE OTHER'S SPAN, WOULD BE A RE-MEANING OF AN ID AND NEEDS A FRESH RULING ON THE ROW-ID FAMILY — this clause takes none and mints none.**
   **⟶ AND THIS ITEM — THE MITIGATION — IS SUPERSEDED BY THE RULING AND STANDS AS THE RECORD OF THE DEFECT IT MANAGED, NOT AS A STANDING RULE (`DEF-2026-10-16-S`; 2026-10-17; `role_spec_writer`; `RCA-8(g)`: an ANNOTATE-BESIDE at this item's own cell — item `1` above is re-spelled with its rows and is NOT withdrawn, and this mark re-decides nothing item `2` states as fact).** **THE RULING THIS PASS EXECUTES RE-MINTS THIS UNIT'S EIGHT IDS TO `P-SR-1`…`P-SR-8`, SO THE TWO REGISTERS ARE DISJOINT AND THE AMBIGUITY THIS ITEM MANAGES NO LONGER EXISTS: a bare `P-SR-5` now names ONE row in this repository, and the rule *"the two row-id sets are identical, so every bare `P-`-citation is ambiguous and is resolved by its file path and by nothing else"* IS WITHDRAWN AS A RULE — WITHDRAWN AT THIS CELL, AND NOT LEFT STANDING AS THOUGH IT WERE STILL NEEDED.** **WHAT SURVIVES IT IS ITS OWN FACTUAL CONTENT, EACH TERM UNMOVED: the two STRATEGY families are disjoint — the other unit's `27` ids, `3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27` ✓, read at the same site — this unit's span is its own, and no second unit authors a row in it.** **AND THE ITEM'S LAST LIMB STANDS AS PRINTED: a third unit minting these ids again, or this unit authoring a row in the other's span, would be a re-meaning of an id and needs a fresh ruling on the row-id family — this pass took the ruling's own PRICED INSTRUMENT (`DD-3`'s `alt`) rather than minting freely, and it mints no id of the other unit** (`DD-3`'s re-derived row; this document's unit/prefix line and its `§5.0` budget clause of the same date; `docs/specs/storeroom-constraints/contract.md`'s `§0.1`-region clause of the same date). **WHAT THIS CLAUSE DOES NOT DO: IT DOES NOT RENAME, RE-SPELL, WITHDRAW OR MOVE ANY ID OF EITHER UNIT, AND IT REACHES NO BYTE OF THE OTHER UNIT'S DIRECTORY** (`[T: this section's own row census; A3 docs/specs/storeroom-constraints/contract.md §5.0–§5.8 and its `:20`; A1 bindings/js/test/constraint-kernel-properties.test.mjs `:12`–`:29` and `:1381`–`:1390` | CENSUS and cross-reference]`).

**⟶ ADDED 2026-10-16 — THE OTHER UNIT'S REGISTER CLOSURE IS READ HERE AT ITS THREE UNDRIVABLE DISPOSITIONS, BECAUSE ONE OF THE THREE IS RIGHT AND TWO ARE FALSE IN THE DIRECTION OF UNDERSTATING COVERAGE (`role_spec_writer`; `RCA-8(g)`: this clause is a PURE INSERTION — it reaches no byte of the other unit's directory, mints no id of either unit and moves no count of this one).** **THE SITE, NAMED: `bindings/js/test/constraint-kernel-properties.test.mjs`'s `UNDRIVABLE_BY_A_ROW_CELL` list — three entries at `:1397`–`:1421`, each with its reason — read with its own closure assertions at `:1477` (`cited.size === 24`), `:1482` (`DECLARED_STRATEGY_IDS.length === 27`) and its `P-NEG-21` clause (`:1506` down to its closing assertion at `:1521`, the two-directional closure).** **THE THREE DISPOSITIONS, EACH WITH WHAT THE REGISTER NOW READS:** **(1) `S-REC-RETAIN` — RIGHT AND UNMOVED.** **Its subject is the CLOSED-attempt store's own LIFETIME, whose bound `RC-3` is `OPEN` with no bound, no eviction arm and no enumerator over that store declared, so NO FALSIFIABLE DRIVE EXISTS and a line reported as driven would be false.** **(2) `S-ROLLBACK-FLOOR` — CORRECTED, AND IT IS DRIVABLE: it moves OFF the undrivable list and INTO the register's coverage.** **Its own reason names the cells that drive it — *"it IS driven by hand-built cells that fix `StoreConfig.journalLength` small (`constraint-kernel-states.test.mjs`'s `ck_neg_3` and `ck_neg_4` arm 2, and `constraint-kernel-negatives.test.mjs`'s `P-NEG-20`)"* (`:1409`–`:1411`) — so the id's subject (a `compacted` entry in the candidate set of a call over a still-owed op) is DRIVEN, and the drive is a hand-built cell and NOT a seeded generator.** **(3) `S-ROLLBACK-TARGET` — CORRECTED, AND IT IS DRIVABLE: it moves OFF the undrivable list and INTO the register's coverage.** **Its own reason names its drivers likewise — *"it IS driven by the hand-built cells that pin a landing (`ck_states_every_step_carries_the_six_declared_members_and_the_arm_s_own_checkpoint`, `ck_neg_4`)"* (`:1418`–`:1419`) — and the target it names is READ AS A VALUE and not as a shape: `bindings/js/test/constraint-kernel-rollback.test.mjs:783`–`:800` reads `floorStep.opId` against the attempt's own op list and asserts the step's `answer` is `RollbackCompacted` with `undoneOps.length === 0` and `failed === true`.** **SO AN ID DECLARED UNREACHABLE WHILE ITS OWN REASON NAMES A DRIVER IS A COVERAGE CLAIM THAT IS FALSE IN THE DIRECTION OF UNDERSTATING.** **AND THE CORRECTED CLOSURE THE OTHER UNIT'S OWN BOOKKEEPING CLOSES AT, PRINTED WITH ITS TERMS: the driven set is `26` ids — the `24` the `row()` cells cite PLUS the two re-disposed ids `S-ROLLBACK-FLOOR` and `S-ROLLBACK-TARGET`, each read as driven by the hand-built cells its own reason names — and the undrivable list holds `1` id, `S-REC-RETAIN`; so the two sets close the declared register as `26 + 1 = 27` ✓ (`24 + 2 + 1 = 27` ✓, against `DECLARED_STRATEGY_IDS.length === 27` at `:1482`), and THE TWO CELLS WHOSE LITERALS THE CORRECTED READING MOVES ARE THE `cited.size === 24` ASSERTIONS (`:1477` and `:1519`) and the `undrivable` NAME LIST (`:1514`), each of which must read `26` and `['S-REC-RETAIN']` ONCE THE TWO IDS ARE CITED RATHER THAN LISTED.** **THAT DERIVATION IS THE OTHER UNIT'S OWN AND IS NOT TAKEN HERE: this clause records the corrected dispositions and the closure they close at, and reaches no byte of that directory.** **⟶ AND THE THIRD THING THIS REGISTER MUST SAY, SO THE CLOSURE'S OWN READING IS NOT SELF-REFERENTIAL: WHAT THE CLOSURE MUST READ IS THE DECLARED ID SET AS IT STANDS IN THE CONTRACT'S BYTES — the `strategy id` families printed by `docs/specs/storeroom-constraints/contract.md §5.1`–`§5.8` (that unit's own register, whose headings stand at its `:420`, `:457`, `:480`, `:517`, `:563`, `:601`, `:637` and `:691`) — AND NOT THE TWO LITERAL LISTS TYPED IN THE TEST FILE ITSELF (`DECLARED_STRATEGY_IDS` at `bindings/js/test/constraint-kernel-properties.test.mjs:1381`–`:1390`, `UNDRIVABLE_BY_A_ROW_CELL` at `:1397`–`:1421`).** **AS THE CELLS STAND, `cited.size === 24` AND THE `27` ARE ASSERTED AGAINST THOSE LITERALS, SO A TWENTY-EIGHTH ID DECLARED IN THE CONTRACT WOULD NOT FAIL ANY OF THEM: the file would read its own copy and report a closed register over a set the contract had moved.** **THE READING A DRIVE TAKES, STATED SO IT IS DERIVABLE: the cell derives the declared id set FROM THE CONTRACT BYTES — every strategy id named in the eight rows of `docs/specs/storeroom-constraints/contract.md` `§5.1`–`§5.8`, read at the cells that declare them — and asserts BOTH ARMS OF THE CLOSURE against THAT set: (i) every id a `row()` cell of the file cites is a member of it, and (ii) every member of it is either cited by a `row()` cell or stands in the named undrivable list, so the set's own count and the two derived counts may not drift from the contract by one id in either direction; the literals' only remaining office is a PROVENANCE READING of that file's own past, and neither of them may be the authority a closure is asserted against.** **NO `bindings/js/**` BYTE IS WRITTEN BY THIS PASS AND THIS IS A DUTY, NOT A MEASUREMENT** (`bindings/js/test/constraint-kernel-properties.test.mjs:1381`–`:1390`, `:1397`–`:1421`, `:1450`–`:1483`, `:1506`–`:1521`; `docs/specs/storeroom-constraints/contract.md §5.1`–`§5.8` | state or fail-state declaration]`). **THIS CLAUSE ADDS NO ROW TO THIS REGISTER, MOVES NO FIGURE OF IT AND REACHES NO BYTE OF `bindings/js/test/**`** (`bindings/js/test/constraint-kernel-properties.test.mjs:1397`–`:1421`, `:1450`–`:1483`, `:1506`–`:1521`; `bindings/js/test/constraint-kernel-rollback.test.mjs:783`–`:800`; `docs/specs/storeroom-constraints/contract.md §5.7` — the row these two ids belong to; `docs/specs/storeroom-constraints/attempt-lifecycle.md §2.4` item 7 (ii) — `RC-3` | state or fail-state declaration]`).

### §5.1 `P-SR-1` — the round trip, under the declared relation

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
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — **the STORE UNIT'S OWN `P-IM-1`, SPELLED WITH THAT UNIT'S PATH AND REACHED BY NO RENAMING — the same invariant at the store's own layer |
requirement]**)

**⟶ AND THIS ROW'S OWN ID IS RE-MINTED AT ITS HEADER, 2026-10-17 BY `DEF-2026-10-16-S`'s RE-MINT PASS (`role_spec_writer`; `RCA-8(g)`: the row's property, its three strategy ids, its failure list, its `§`-number and its cited clauses all stand BYTE-FOR-BYTE and are read THROUGH this clause, which states the ONE spelling that moved).** **`§5.1`'s ROW IS `P-SR-1` — IT WAS MINTED `P-IM-1` — and `P-IM-1` IN THIS DOCUMENT NOW RESOLVES TO NOTHING, that spelling being `U-STOREROOM-CONSTRAINTS`' OWN ROW AT `docs/specs/storeroom-constraints/contract.md §5.1`.** **The store-side citation at the foot above keeps its own `P-IM-1`, which is the STORE unit's row at `docs/specs/storeroom-native/contract.md §5.2` and lies outside this re-mint** (`DD-3`'s re-derived row; this document's unit/prefix line; this document's `P-SR-1 → P-IM-1` mapping).

### §5.2 `P-SR-2` — the copy's two directions, and the walk's closure

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

### §5.3 `P-SR-3` — the failure channel's single form, and the closed set's reachability

**Property.** **EVERY FAILURE THAT CROSSES IS A THROWN `{status, message}` AND NOTHING ELSE**, whose
`status` is a member of the store's closed `16`-member set or a verbatim echo of a non-member the store
itself produced, and whose `message` is the store's generated string; **and ALL `16` MEMBERS REMAIN
REACHABLE FROM THE JS SURFACE** — a failed `read` being the existence probe, because no resolver is exposed.
**Strategy ids.** **`S-FAILFORM`** (the thrown object's `typeof`, its prototype being the caller realm's
`Object.prototype`, and its member SET being exactly `{status, message}`) · **`S-FAILSET`** (one drive per
member — `16` drives, the set's algebra reading `11 + 2 + 1 + 1 + 1 = 16` ✓, the sixteenth being
`ConstraintListInvalid` at `docs/specs/storeroom-native/contract.md §8.1` #16 — plus the converse drive: no
drive produces a code outside the set) · **`S-PROBE`** (a failed `read` as
the existence probe, at each of the walk's codes).
**FAILURE LIST.** a failure returned as a value; a `Promise` rejection; an `Error` instance; a third member
(`code`, `cause`, `stack`, `data`); a package-minted code; a `status` that is an index, a lowercased variant
or a prefixed variant; an empty or hand-authored `message`; a member of the set with no reachable trigger; a
drive that produces a code outside the set; a `findAddress` or `exists()` route that reaches an address
without going through `read`.
**The clauses it cites.** `§2.5` · `§2.9` · `surface.md §5` · `surface.md §9`.
(`[A1 docs/specs/storeroom-js-proposal.md §8 · A63 · A64; A3
docs/specs/storeroom-native/contract.md §8.1 · §8.2 · §8.3 | requirement]`)

**⟶ AND THIS ROW'S OWN FIGURE THAT NAMES A MEMBER SET IS RE-DERIVED IN PLACE, 2026-10-16, ON THE ARCHITECT'S RULING *"Override the failure form limit"* READ WITH HIS EARLIER RULING *"Bubble the message log to the client on failure, override any clauses that forbid this"* (`role_spec_writer`; `RCA-8(g)`: the row above stands BYTE-FOR-BYTE and is read THROUGH this clause, which re-derives ONE cell of it and moves no other).** **THE CELL RE-DERIVED IS `S-FAILFORM`'S PARENTHESIS: *"its member SET being exactly `{status, message}`"* READS FROM THIS DATE *"its member SET being exactly `{log, message, status}` — THREE members, sorted ascending, `Object.keys(caught).length === 3` on EVERY arm, with `log` an ORDINARY OWN ENUMERABLE DATA MEMBER never absent, never `null` and never a non-array"*.** **AND THE PROPERTY'S OWN FIRST SENTENCE IS READ THROUGH IT RATHER THAN RE-SPELLED: *"A THROWN `{status, message}` AND NOTHING ELSE"* names the two members whose PROVENANCE this row fixes — the store's token and its generated string — and not an arity; the arity is `surface.md §2.5`'s clause of this date, items 3/4 and 9, which is the crossed form's ONE home** (`DD-12`'s repaired row above; `parameter-semantics.md §2.26` — the third member's own register row). **AND NOTHING ELSE OF THIS ROW MOVES: its `3` strategy ids, its `S-FAILSET` algebra `11 + 2 + 1 + 1 + 1 = 16` ✓, its `S-PROBE` strategy, its failure list's entries and its cited clause set all stand exactly as printed** — **⟶ with the ONE exception the same sentence names and does not move: the failure list's entry *"a third member (`code`, `cause`, `stack`, `data`)"* STANDS, because it names the DIAGNOSTIC third member `DD-12`'s `alt` cell refuses and NOT the attempt's log `DD-12` now adopts; a failure whose `log` is ABSENT, `null` or a non-array is a FINDING at the site that produced it and is `PAR-JS-26`'s outside-value cell, not this list's** (`§5.3`'s dated clause below; `DD-40`; `P-SR-3`'s `S-FAILFORM` at `surface.md §2.5`'s clause of 2026-10-16, item 9 | state or fail-state declaration]`).

**⟶ ADDED 2026-10-16 — THE TWO SITES OF THIS ROW'S `S-FAILFORM` STRATEGY THAT SIT OUTSIDE ANY VERDICT ARE DISPOSED OF HERE: THE ROW THAT CARRIES THEM, AND THE DUTY THAT PUTS THEM ON A LEDGER (`role_spec_writer`; `RCA-8(g)`: this clause is a PURE INSERTION — it moves no strategy id, no failure-list entry and no property of this row, and the row above stands BYTE-FOR-BYTE and is read THROUGH it).**

1. **THE `S-FAILFORM` STRATEGY IS CARRIED BY TWO HALVES, ONE ON EACH RUNNER, AND ONLY ONE OF THEM IS A LEDGER LINE.** **THE RUST HALF IS A LINE OF THE REGISTER'S OWN LEDGER — `bindings/js/tests/register_layer.rs:401`–`:404`, `row.strategy("S-FAILFORM", 15, …)` at `§5.3`'s `P-SR-3` — and it carries the row's verdict like every other line.** **THE JS HALF IS THE ASSERTION BLOCK AT `bindings/js/test/register.test.mjs:841`–`:873`, which drives `4` form sites (`a VERB` twice, a construction, and a REGISTRATION) and asserts, at each, that the thrown record's member set is EXACTLY `{status, message}`, that its `status` is one of the store's closed `16` members, that its `message` is a generated non-empty `string`, that its prototype is the caller realm's `Object.prototype`, and that it is no `Error`.**
2. **AND THE ROW IT BELONGS TO IS `P-SR-3`, AS A ROW — AND ITS LEDGER LINE IS OWED RATHER THAN PRESENT, WHICH IS THE DISPOSITION.** **The block asserts THIS ROW's own strategy at THIS ROW's own observables, so it is `P-SR-3`'s and never a free-standing check of the file: the JS half of `S-FAILFORM` is a line of `P-SR-3` on the JS runner.** **IT DOES NOT STAND IN THAT RUNNER'S LEDGER TODAY: `bindings/js/test/register.test.mjs`'s `LEDGER` is the three objects `row('P-SM-5')` (`:199`), `row('P-TP-7')` (`:570`) and `row('P-TP-8')` (`:610`) — **⟶ READ AT ITS THREE LITERALS AS THE RUNNER PRINTS THEM AT THIS DATE, AND AS THE IDS THE ROWS NOW CARRY IN THIS CONTRACT: `row('P-SR-5')`, `row('P-SR-7')` and `row('P-SR-8')`** — and the block sits inside the file-level `test(…)` at `:792` whose assertions `assert.ok(total <= 400)` (`:816`) and `assert.equal(cited…)`-class checks report the `JS` half's total and its un-run count.** **SO ITS FAILURES FAIL THE FILE AND NEVER A ROW VERDICT: the register's own verdict for `P-SR-3` is decided by the Rust run alone, and a JS-side break of the failure channel's single form reports as a red test and NOT as a BROKEN `P-SR-3`.** **THAT IS THE DEFECT AND IT IS DISPOSED OF BY A DUTY, NOT BY A REWRITING: the JS half's `S-FAILFORM` is owed a `line(P_SR_3, 'S-FAILFORM', …, …)` registration in that runner — a thirteenth JS line, whose own attempts this register's budget clause re-declares with the halves — so that a failed JS drive of the row's single form yields a `P-SR-3` verdict.** **AND UNTIL THAT LINE EXISTS, THE HONEST READING IS THE ONE PRINTED HERE: the block is `P-SR-3`'s by subject, OUTSIDE the ledger by registration, and it can fail the suite but never a row verdict.** **NO PROPERTY, NO STRATEGY ID, NO FAILURE-LIST ENTRY AND NO COUNT OF THIS ROW MOVES: the `3` strategy ids, the failure list and the cited clause set stand as the row prints them, and the block's `4` sites are this row's own observables and add no fifth strategy** (`bindings/js/tests/register_layer.rs:401`–`:404`; `bindings/js/test/register.test.mjs:88`, `:199`, `:570`, `:610`, `:792`–`:873`, `:816`; `§5.0`'s dated budget clause of this date — the halves' figures | state or fail-state declaration]`).
**⟶ AND ITEM 1'S OWN CELL IS NAMED AS ONE THE ARITY MOVE PUTS IN THE RED SET'S PATH, 2026-10-16, ON THE ARCHITECT'S RULING *"Override the failure form limit"* (`role_spec_writer`; `RCA-8(g)`: item 1 stands BYTE-FOR-BYTE and is read THROUGH this clause, which names its cell and re-derives none of its bytes).** **THE CELL: `bindings/js/test/register.test.mjs:841`–`:873`'s *"the thrown record's member set is EXACTLY `{status, message}`"* — IT MOVES TO `{log, message, status}`, THREE MEMBERS, SORTED ASCENDING.** **ITS RE-DERIVATION IS THE TEST WRITER'S ACT AND NOT THIS PASS'S, and the set it must re-derive TO is the one `surface.md §2.5`'s clause of this date, item 9, declares. THE OTHER FOUR OBSERVABLES ITEM 1 NAMES — the `status`'s closed-set membership, the non-empty generated `message`, the prototype and the no-`Error` rule — STAND WHOLE AND UNMOVED** (`docs/specs/storeroom-js/surface.md §2.5`'s clause of 2026-10-16, item 9 | state or fail-state declaration]`).

### §5.4 `P-SR-4` — the crossing's own ARM TABLE is total, and every arm's answer is one of the declared ones

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

### §5.5 `P-SR-5` — the registry's transition rules, and the handle's two spellings

**Property.** **THE REGISTRY'S FOUR RULES OF `§2.4` HOLD AT EVERY TRANSITION** — an unregistered handle
fires nothing silently; a second registration replaces the first; a lawful duplicate fires once per DISTINCT
handle; and `unlisten` withdraws the registration and never the function — **AND THE HANDLE'S TWO
SPELLINGS NEVER BLUR** (a plain `string` IN at the construction; the package's opaque value OUT, accepted by
`unlisten` alone).
**Strategy ids.** **`S-REG`** (the four rules, one drive each, **reached through the declared registration
site of `§2.4` item 5** — `register(handle, listener)` on the object `storeCreate` returned — **and now
drivable, because that site's spelling is declared**) · **`S-REG-DUP`** (two construction entries at
one address with one caller-spelled token: `triggered` carries it once where the store minted it, and the
registry fires once) · **`S-OPAQUE`** (a returned handle's token is not readable from JS; a bare string
passed to `unlisten` is an unknown handle and a no-op success) · **`S-WITHDRAW`** (after `unlisten`, the
function never fires again; a re-`listen` at the same address mints a DIFFERENT handle and a NEW entry).
**FAILURE LIST.** an unregistered handle that throws, logs or warns; a fan-out registration; a duplicate
token that fires twice per distinct handle; an `unlisten` that unregisters the function; a returned handle
whose token JS can read; an `unlisten` that accepts a bare `string` as a known handle; a re-`listen` that
re-uses a withdrawn handle.
**The clauses it cites.** `§2.3` · `§2.4` · **`§2.4` item 5 (the registration site's own spelling, added by
the bounded correction pass of 2026-10-11)** · `§2.10` · `surface.md §3`–`§4`.
(`[A1 docs/specs/storeroom-js-proposal.md §9.2 · A57 · A58; A3 docs/specs/storeroom-native/contract.md §6.5
· §0.4's `ListenerHandle` clause | requirement]`)

**⟶ AND THE CARRIER LAW'S REGISTER DECISION, RECORDED 2026-10-15 BY THE `A115` ORDERING-GATE PASS (`role_spec_writer`), WHICH IS ITS OWN FINDING BECAUSE THE CAP FORBIDS A NINTH ROW: NO ROW IS ADDED HERE, AND THE REASON IS THAT THE CARRIER LAW INTRODUCES NO INVARIANT THIS REGISTER DOES NOT ALREADY CARRY.** **THE ROW ABOVE STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause adds no row, moves no count, re-derives no strategy id and re-spells no rule** (`RCA-8(d)` ANNOTATE-BESIDE; `A: docs/decisions.md` · `A115`). **WHY NO ROW, IN THREE TERMS, EACH CHECKABLE AT ITS OWN CELL:**
1. **THE ORDERING LAW'S OWN PROPER SUBJECT LIVES IN THE OTHER UNIT'S REGISTER, WHERE IT ALREADY STANDS.** **The properties *"constraints run first"*, *"the other listeners are reached only once every constraint has passed"* and *"on a constraint failure the listeners are discarded"* are properties of `U-STOREROOM-CONSTRAINTS`' typed register, which already carries them: its `P-IM-3` at `docs/specs/storeroom-constraints/contract.md §5.5` counts *"a listener or a constraint body read as delivered by the STORE rather than by the surface's ordered layers"* among its failure faces, and that register's own census is `21` row cells × `19` = `399 ≤ 400` — **SO A ROW HERE WOULD BE A SECOND ADDRESSABLE HOME FOR A PROPERTY OF ANOTHER UNIT, WHICH THIS CONTRACT'S OWN `§0.1` item 5 STATES AS THE `≤ 8` PER-UNIT ROW CAP AND AS *"authors no row in the store's"*, AND WHICH THE SCOPING-CONTRACT'S `§C.6` PROHIBITIONS STATE AS *"no second register"*** (`A: docs/decisions.md` · `A112`; `docs/specs/storeroom-constraints/contract.md §5.5` and `§5.0`). **⟶ AND THE ID THIS ITEM NAMES IS CHANGED BY NAMING, NOT BY INFERENCE, 2026-10-17 (`DEF-2026-10-16-S`'s re-mint pass; `RCA-8(g)`): the item printed `P-SM-5` and READS `P-IM-3`, because `P-SM-5` WAS the SAME ID ON BOTH SIDES OF THE COLLISION — THIS unit's registry-transition row then and the other unit's `§5.5` row now — while the other unit's `§5.5` row is `P-IM-3` and its spelling was NOT touched by this pass's re-mint. THE PROPERTY, THE CENSUS `21 × 19 = 399 ≤ 400` AND THE OTHER UNIT'S `§`-NUMBERS ARE UNMOVED** (`docs/specs/storeroom-constraints/contract.md §5.5` and `§5.0`, read at their own bytes at this date).
2. **WHAT THIS UNIT'S SURFACE ADDS IS A DELIVERY INSTANT AND ITS CARRIER, NOT A NEW INVARIANT.** **`docs/specs/storeroom-js/surface.md §2.7` item 7 fixes WHEN the package's delivery occurs and WHAT decides which bodies it reaches — and the row above already asserts the transition it constrains: the registry's four rules *"hold at every transition"*, and its `S-REG` strategy reaches them through the declared registration site.** **A ninth row would restate that row's subject at a second home; the instant itself is pinned as a CLAUSE, which is where this unit's `§2` claims live** (`docs/specs/storeroom-js/surface.md §2.7` items 7 and 8).
3. **AND THE FAILURE FACE THE INSTANT CREATES IS ALREADY ASSERTABLE AT THIS ROW.** **A package that delivered a listener body while a constraint of the same write stood owed — or delivered a handle the delivered record's `pending` no longer carries — fails the row above's `S-REG` drives exactly as that row's own failure list's first entry, *"an unregistered handle that throws, logs or warns"*, fails them, and fails the constraints register's `P-IM-3` on that register's own face** (**the id re-spelled by naming, 2026-10-17: this item printed `P-SM-5`, which was the SAME ID on both sides of the collision; the other unit's `§5.5` row is `P-IM-3`, and nothing else of this item moves**). **SO NO FACE IS LEFT UNFAILABLE AND NO ROW IS OWED** (`docs/specs/storeroom-constraints/contract.md §5.5`; `docs/specs/storeroom-js/surface.md §2.7` items 6–8).
   (`[A2 docs/decisions.md · `A115` (D1)–(D4) and `A112`/`A114`; A1 docs/specs/storeroom-js/contract.md §0.1 item 5 — the `≤ 8` cap and the no-second-register rule; A3 docs/specs/storeroom-constraints/contract.md §5.0 and `§5.5` — the other register's census and its fail face | CENSUS]`).

**⟶ RE-SPELLED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE `S-WITHDRAW` LINE'S
OPERATIVE SUBJECT, THE AS-FILED SENTENCE NAMED BESIDE IT, AND THE TWO ARMS THE ROW NOW ASSERTS.** `RCA-8(d)`
ANNOTATE-BESIDE: **the strategy line above stands BYTE-FOR-BYTE — its own printed words are RE-EMITTED below
so `git diff` recovers them where they stand — and it is read THROUGH this clause; THIS clause adds no row,
moves no count, re-decides no rule and re-spells no strategy id.** **THE AS-FILED SENTENCE, RE-EMITTED
VERBATIM:** ***"`S-WITHDRAW` (after `unlisten`, the function never fires again; a re-`listen` at the same
address mints a DIFFERENT handle and a NEW entry)."*** **AND THE OPERATIVE SUBJECT OF THE LINE, PRINTED HERE
WITH THE TWO ARMS THE ROW'S OWN DATED CLAUSE ALREADY CARRIES:**

| The arm | Its pre-condition at the store's own home | Its observable, and it is the one the line asserts |
| --- | --- | --- |
| **the WITHDRAWN arm** | the `unlisten` REMOVED that address's one store-side home entry | **a later `listen` AT THE SAME ADDRESS MINTS A FRESH HANDLE — a NEW opaque value whose registration is a NEW registry entry — and the withdrawn token's function, whose id is no longer reachable, never fires again** |
| **the STILL-REGISTERED arm** | the `unlisten` ahead of it was one of `§2.3` item 4's NO-OP SUCCESSES, which removes NOTHING | **a later `listen` AT THE SAME ADDRESS MINTS NOTHING AND RETURNS THE EXISTING ENTRY'S HANDLE — the SAME opaque value — so no new registry entry arises** |

**SO THE ROW'S OWN OPERATIVE SUBJECT IS THE TWO ARMS, AND THE LINE ASSERTS BOTH: the withdrawn case mints a
fresh handle and the still-registered case returns the existing entry's handle.** **THE RECONCILIATION IS
`docs/specs/storeroom-js/surface.md §2.3`'s dated clause, which ALREADY NAMES the still-registered case as the
case in which the store returns the EXISTING entry's handle and declares the two sentences ONE declaration**;
**the governing rule is `§2.3` item 6's inherited address-level mint rule, and the store-side home entry's
fate is `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c)'s.** **NO FAILURE LIST ENTRY MOVES:
*"a re-`listen` that re-uses a withdrawn handle"* remains a FAILURE, because the WITHDRAWN arm mints a FRESH
token and never re-uses the withdrawn one, while the STILL-REGISTERED arm returns the existing entry's handle
BY DESIGN and is not a re-use of a withdrawn one at all.** **THE REGISTER STANDS AT ITS `8` ROWS WITH THE CAP
HOLDING (`8 ≤ 8` ✓) AND EVERY ROW REMAINS FAILABLE** (`[A1 docs/specs/storeroom-js-proposal.md §9.2 · A57 ·
A58; A1 docs/specs/storeroom-js/contract.md §2.3` item 6 — the inherited mint rule; A3
docs/specs/storeroom-js/surface.md §2.3's dated clause — the reconciliation; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) | state or fail-state declaration]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CALLER-SPELLED-DUPLICATE PASS (`role_spec_writer`), CLOSING THE
IMPLEMENTER'S `CF-DUP-1` AT THIS ROW'S OWN `§` AND AT THE TWO OTHER CELLS THE SAME FIGURE REACHES: THE
COLLAPSED ARRAY FIGURE THIS ROW PRINTS AGAINST THE RECONCILED RULE.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell
above stands byte-for-byte — both strategy lines' own printed words and the failure list's own line
included — and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds NO ROW, moves NO COUNT and
re-decides NO rule.** **THE FINDING, NAMED WITH ITS TERMS: the register's own rows still print the COLLAPSED
array multiplicity for the very state `docs/specs/storeroom-js/surface.md §2.4`'s dated clause of 2026-10-11,
rule 3's clause (i)–(ii), and this document's own `§2.4` dated clause declare CARRIED ELEMENT-FOR-ELEMENT** —
**a lawful caller-spelled duplicate yields the SAME identity TWICE (`triggered.length === 2`) while the
INVOCATION stays ONCE PER DISTINCT IDENTITY — so these rows read `BROKEN` against a build that is correct on
this point** (`archive/gate3/storeroom-js-red-set.md §12.5` finding 3, which assigns exactly this amendment to
this role).

**THE TWO AS-FILED SENTENCES, NAMED AS FILED, RE-EMITTED VERBATIM SO `git diff` RECOVERS THEM WHERE THEY
STAND:** the `S-REG` line reads ***"`S-REG` (the four rules, one drive each, reached through the declared
registration site of `§2.4` item 5 — `register(handle, listener)` on the object `storeCreate` returned — and
now drivable, because that site's spelling is declared)"***; the `S-REG-DUP` line reads ***"`S-REG-DUP` (two
construction entries at one address with one caller-spelled token: `triggered` carries it once where the store
minted it, and the registry fires once)"***. **THE SECOND SENTENCE IS THE REFUTED FIGURE: *"`triggered` carries
it once"* is TRUE of CASE A ALONE — the store-MINTED case — and the line's OWN qualifier *"where the store
minted it"* names that case, while the state the strategy id NAMES is the CALLER-SPELLED token of `§2.4` rule
3's CASE B, where the store's own declaration governs the ARRAY and it carries that token TWICE.** **And the
`S-REG` line's four rules include rule 3, so the SAME refuted figure reaches it: its duplicate drive is CASE B
and its one figure is not the array's.**

**THE OPERATIVE READING, AT THIS ROW, IN TWO INDEPENDENT OBSERVABLES — ONE CARRIER EACH:** **(i) THE ARRAY'S
ELEMENT MULTIPLICITY IS THE STORE'S — `triggered` crosses as a fresh JS array of the handles the store's own
list carries, ELEMENT FOR ELEMENT and NOT DEDUPLICATED AT THE BOUNDARY, so CASE B's duplicate token is carried
TWICE (`triggered.length === 2`), each member the ONE identity that token names** (`§2.7` item 1;
`crossing.md §1.3`'s returned-record rows; `docs/specs/storeroom-native/contract.md §0.2` · `DD-42` clause 3 and
`DD-39`, with that contract's `§0.4` clause 2 (b); `write-and-read.md §6.5` item 12 (b)). **(ii) THE INVOCATION
COUNT IS THE PACKAGE'S — ONE PER DISTINCT IDENTITY, so CASE B's duplicate token's one function runs ONCE, never
one per element and never one per entry** (`§2.4` rules 1–3 and item 6 (b)–(e); `surface.md §2.4`'s dated clause
(i)). **AND THE `S-REG-DUP` LINE'S OWN TWO FIGURES ARE THE TWO OBSERVABLES: *"the registry fires once"* is the
INVOCATION half and it STANDS; the array half is (i) and it is `TWICE`.** **NO ORDER IS ASSERTED BY EITHER
FIGURE** (`§2.7` item 3; `DD-22`).

**THE TWO FAILURE LISTS, AS THEY NOW READ AT THIS ROW — THE AS-FILED ENTRIES RE-EMITTED WHOLE FROM THE LINES
ABOVE AND THE ENTRIES THIS AMENDMENT ADDS PRINTED BESIDE THEM, because a register row is FAILABLE only where
its own failure list names the observable that fails it:** the as-filed list STANDS UNMOVED AND UNCUT — *"an
unregistered handle that throws, logs or warns; a fan-out registration; a duplicate token that fires twice per
distinct handle; an `unlisten` that unregisters the function; a returned handle whose token JS can read; an
`unlisten` that accepts a bare `string` as a known handle; a re-`listen` that re-uses a withdrawn handle"* —
**and the COLLAPSED-ARRAY half of this state now fails by these FIVE ADDED entries: A COLLAPSED ARRAY —
`triggered` carrying a caller-spelled duplicate's token ONCE where the store's own list carries it TWICE; A
SIZE-ONLY COMPARISON — a drive that reads the array's length, or its distinct-member count, AS the invocation
count, or that satisfies one observable by asserting the other; AN INVOCATION PER ELEMENT — the duplicate
token's one function running TWICE for two occurrences of one identity; a drive that asserts the array's
ORDER; and a drive that asserts the `S-REG` duplicate arm's multiplicity from the ARRAY's own length instead
of asserting BOTH figures beside each other.** **SO THE ROW REMAINS FAILABLE FROM EITHER SIDE: change the
ARRAY's multiplicity and the collapsed-array entry fails; change the INVOCATION's multiplicity and *"a
duplicate token that fires twice per distinct handle"* fails.**

**AND WHAT DOES NOT MOVE HERE:** **the register stands at its `8` rows with the cap holding at `8 ≤ 8`, NO
NINTH ROW IS MINTED, NO strategy id is added, dropped, renamed or re-spelled, and `§5.0`'s census and its
dual-mapping disclosure stand as printed** — **`S-REG`'s drivability (it IS drivable, `§2.4` item 5 having
declared the site's spelling) is UNMOVED, and only its duplicate drive's ARRAY figure is read through this
clause.** **The state this row declares is the build's to reach: `bindings/js/index.mjs`'s `wrapHandles`
collapses the duplicate at the boundary today, which is the priced alternative named at `surface.md §2.4`'s
dated clause and NOT this row's; the register's figure is the DECLARED one and is not adjusted to a build.**
**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8): THE
SENTENCE ABOVE IS STALE AGAINST THE SHIPPED BUILD AND IS READ THROUGH THE CLAUSE BELOW IT.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the as-filed sentence included, quoted here rather
than deleted — and the clause below is the OPERATIVE STATEMENT of the build's own state at this row's
subject.** **WHAT THE SENTENCE READ, VERBATIM:** *"`bindings/js/index.mjs`'s `wrapHandles` collapses the
duplicate at the boundary today, which is the priced alternative named at `surface.md §2.4`'s dated clause and
NOT this row's"*. **THE BUILD HAS MOVED, AND IT IS NAMED AT ITS OWN BYTES: `bindings/js/index.mjs`'s
`wrapHandles` NOW CARRIES THE STORE'S OWN LIST ELEMENT FOR ELEMENT AND EDITS NOTHING** — the file's own line
reads *"**THE STORE'S OWN LIST IS CARRIED OUT ELEMENT FOR ELEMENT, AND THE BOUNDARY EDITS NOTHING**"* and the
collapsed form stands beside it RE-EMITTED AS THE AS-FILED READING
(`if (!out.includes(handle)) out.push(handle);`), with the per-identity deduplication RELOCATED to `deliver`,
where `surface.md §2.4`'s dated clause (i) puts it. **SO THE DIVERGENCE `surface.md §2.4`'s dated clause left
open — *"WHICH SIDE THE DIVERGENCE SITS ON IS FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE TO SAY"*
— IS ANSWERED, AND IT SITS ON NEITHER SIDE: THE BUILD NOW HOLDS THIS ROW'S DECLARED FIGURE.** **THIS ROW'S
OWN FIGURE IS UNMOVED, THE REGISTER STAYS AT ITS `8` ROWS, NO FAILURE LIST ENTRY MOVES, AND NO RULE IS
RE-DECIDED HERE** (`archive/gate3/storeroom-js-red-set.md` §13; `bindings/js/index.mjs`'s `wrapHandles` and
`deliver`; A1 docs/specs/storeroom-js-proposal.md §18 · `A77`; A3 docs/specs/storeroom-native/contract.md §0.2 ·
`DD-42` · `DD-39` | state or fail-state declaration).
**AND THE `derivation:` CLAUSE STAYS SINGLE: this clause carries an authority tag and no `derivation:`
clause** (`§0.1` item 2; `surface.md §2.4`'s dated clause of 2026-10-11 — the operative statement; this
document's own `§2.4` dated clause; `docs/specs/storeroom-js/parameter-semantics.md §2.15`'s dated clause;
`docs/specs/storeroom-js/test-cases.md`'s multiplicity row; `archive/gate3/storeroom-js-red-set.md §12.1`–`§12.2`
and its `§12.5` finding 3)
(`[A1 docs/specs/storeroom-js/contract.md §2.4 rule 3 and its dated clause — this row's own governing reading;
A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-42` and `DD-39`; A3
docs/specs/storeroom-js/surface.md §2.4's dated clause of 2026-10-11 | requirement]`).

**⟶ RE-DERIVED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), CLOSING GATE 4'S OVER-STRONG
FINDING AT THIS ROW: THE `S-WITHDRAW` STRATEGY CELL'S PRINTED SUBJECT.** `RCA-8(d)` ANNOTATE-BESIDE: **every
cell above stands byte-for-byte — including the `S-WITHDRAW` line's own printed words and the failure list's
own line — and it is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no row, moves no
count and re-decides no rule.** **THE FINDING, NAMED WITH ITS TERMS: gate 4's PBT audit graded this row's
`S-WITHDRAW` cell as the ONE OVER-STRONG cell in the register — *"its printed subject still reads 'a re-`listen`
mints a DIFFERENT handle' while `§2.3` item 6 narrows it to the WITHDRAWN case"* — so the strategy line
asserted MORE THAN `§2.3` item 6 PINS** (`archive/gate4/storeroom-js-adversarial.md` §B · `P-SR-5`'s row;
`§5.0`'s close-out clause, which named the re-spelling but did not print the operative subject at the row's
own `§`).

**THE OPERATIVE SUBJECT OF THE `S-WITHDRAW` LINE, PRINTED AT ITS OWN `§` AND DERIVED FROM `§2.3` ITEM 6
ALONE:** ***"after `unlisten`, the function never fires again because the store-side home entry is gone and
the id the trigger would carry is no longer the registered one; a LATER `listen` AT THE SAME ADDRESS MINTS A
NEW HANDLE **WHERE THE WITHDRAWAL REMOVED THAT ADDRESS'S HOME ENTRY**, and returns the EXISTING entry's handle
where the address is STILL REGISTERED — so the withdrawn case and the still-registered case are TWO arms and
the cell asserts BOTH."*** **THE TWO ARMS, EACH WITH ITS OWN OBSERVABLE, SO A DRIVE CANNOT SATISFY ONE BY
ASSERTING THE OTHER:**

| The arm | Its pre-condition | Its observable |
| --- | --- | --- |
| **the WITHDRAWN arm** | the `unlisten` REMOVED the address's one store-side home entry | **a later `listen` at that address MINTS A FRESH token, so the handle it returns is a NEW opaque value whose registration is a NEW registry entry — and the old function, whose id is no longer reachable, never fires again** |
| **the STILL-REGISTERED arm** | the `unlisten` ahead of it was one of `§2.3` item 4's NO-OP SUCCESSES, which removes NOTHING | **a later `listen` at that address MINTS NOTHING and RETURNS THE EXISTING ENTRY'S HANDLE — the SAME opaque value — so no new registry entry arises** |

**AND THE FAILURE LIST'S OWN LINE IS UNMOVED AND STAYS FALSE-OF-THE-ARM: *"a re-`listen` that re-uses a
withdrawn handle"* remains a FAILURE, because the WITHDRAWN arm mints a FRESH token and never re-uses the
withdrawn one, while the STILL-REGISTERED arm returns the existing entry's handle by design and is not a
re-use of a withdrawn one at all** (`§2.3` item 6; `surface.md §2.3`'s dated clause;
`docs/specs/storeroom-js/parameter-semantics.md §2.8`'s dated clause)
(`[A1 docs/specs/storeroom-js/contract.md §2.3 item 6 — the inherited mint rule; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c); `DD-15` | requirement]`).

**⟶ RECONCILED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`): THIS ROW'S TWO MINT CELLS,
THEIR STALENESS AND THE ONE CELL THE RECONCILIATION MAKES FALSE.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell
above stands BYTE-FOR-BYTE — the `S-REG-DUP` line's own printed words, the `S-WITHDRAW` line's own printed
words and the failure list's own entries included — and each is read THROUGH this clause; THIS clause is a
PURE INSERTION, it adds no row, moves no count, re-decides no rule and re-spells no strategy id.**

**THE TWO CELLS AND WHAT IS OPERATIVE IN EACH, EACH WITH ITS `§` AND EACH AGAINST THE SAME RULE:**
1. **THE `S-REG-DUP` LINE** (this row's list, quoted at that line) **is read with the ARRAY half and the
   INVOCATION half as the dated clause above splits them** — *"`triggered` carries it once"* is TRUE of the
   store-MINTED case alone, the caller-spelled duplicate is carried TWICE and the invocation stays ONCE per
   distinct identity. **THIS ROW'S FIGURE NEEDS NO CHANGE FROM THIS PASS AND THIS CLAUSE MOVES NONE OF
   IT**; what it adds is that the *"different handle"* reading does not reach this cell either, because a
   duplicate at ONE construction is TWO CALLER-SPELLED entries and not a second `listen` at one address.
2. **THE `S-WITHDRAW` LINE** (this row's list, the line reading *"after `unlisten`, the function never fires
   again; a re-`listen` at the same address mints a DIFFERENT handle and a NEW entry"*) **is the cell the
   finding below is about: its as-filed words stand UNMOVED at this row's own `§`, and the OPERATIVE SUBJECT
   of the line is the one the dated clause above prints at its own `§` and derives from `contract.md §2.3`
   item 6 alone — the TWO ARMS, the WITHDRAWN arm (a fresh token) and the STILL-REGISTERED arm (the existing
   entry's handle).**
3. **AND `docs/specs/storeroom-js/surface.md §2.3`'s clause is the reconciliation the other two cells are
   read with** — **it ALREADY NAMES the still-registered case as the case in which the store returns the
   EXISTING entry's handle, and it already declares the two sentences ONE declaration** — **so this pass
   adds no reconciliation rule of its own: it names `§2.3`'s clause as the operative reconciliation and
   carries that document's own words, at that clause, for the two cells above** (`surface.md §2.3`'s dated
   clause; `write-and-read.md §6.5` item 12 (c)).

**AND THE RED-SET CELLS AND THE ONE BLIND-GREEN ASSERTION THIS RECONCILIATION DOES NOT MOVE — NAMED, EACH
WITH ITS `§`, SO NOTHING IS INHERITED FROM A BYTE DIFF.** **NO BYTE OF ANY RED-SET CELL MOVES BY THIS PASS
AND NO CELL ABOVE BECOMES FALSE BY IT.** **The drives the three cells are measured by are the TestWriter's;
the cells that NAME them are these three and each is read as stated: `§5.5`'s `S-WITHDRAW` strategy line (this
row, item 2 above); `§5.5`'s `S-REG-DUP` strategy line (this row, item 1 above); and `surface.md §2.3`'s
clause, which is the reconciliation.** **AND THE ONE BLIND-GREEN ASSERTION THAT IS FALSE-OF-THE-ROW-BEFORE-THIS-PASS
STANDS NAMED RATHER THAN SILENTLY REPAIRED:** **this document's `§5.5` dated clause of 2026-10-11 asserts
that *"`P-SM-5`'s `S-WITHDRAW` LINE IS RE-SPELLED, AND THIS IS THE ONE CELL THIS PASS MOVES"* — **the RE-EMITTED AS-FILED SENTENCE, its id KEPT AS FILED and its row now `P-SR-5` (`DEF-2026-10-16-S`)** — and THE
STRATEGY LINE AT THIS ROW STILL PRINTS ITS AS-FILED WORDS, so the assertion is FALSE of the row's text and
TRUE only of the cell's own re-derived subject printed above it.** **THIS PASS MOVES NO BYTE OF EITHER, and
a reader takes the operative subject from the dated clause above and the as-filed line from the row's own
list** (`docs/specs/storeroom-js/contract.md §5.5`'s dated clause of 2026-10-11 — the assertion this clause
reconciles rather than rewrites; `acceptance.md §4.4` — the red set's ownership; `[A1
docs/specs/storeroom-js/contract.md §2.3 item 6; A1 docs/specs/storeroom-js/contract.md §5.5's dated clause |
CROSS-REF]`).

**⟶ RE-DERIVED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`), ON THE ARCHITECT'S RULINGS
`A79`–`A81`: THIS ROW'S SUBJECT WIDENED TO CARRY THE TWO NEW INSTANCE MEMBERS, AND ITS FAILURE LIST EXTENDED WITH
THE `6` ENTRIES THEY MAKE REAL.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte — the
property sentence, the four strategy lines' own printed words, the failure list's own line, this row's four dated
clauses and the assertion-naming clause directly above included — and each is read THROUGH this clause; THIS
clause is a PURE INSERTION, it adds NO ROW, moves NO COUNT, mints NO strategy id, and re-decides NO rule of the
registry; it RE-DERIVES this row's SUBJECT and extends this row's FAILURE LIST, which is what a row whose subject
gains two verbs owes.** **THE RULINGS, VERBATIM:** ***"Use S-1"*** · ***"`off` can deregister"*** · ***"always
validate"*** (`docs/specs/storeroom-js-proposal.md` `§8` · **`A79`** · **`A80`** · **`A81`**).

**1. THE OPERATIVE SUBJECT OF THIS ROW, PRINTED AT ITS OWN `§` — THE REGISTRY'S TRANSITIONS READ OVER FOUR
MEMBERS: THE REGISTRATION SITE, `unlisten`'s CONTRAST, `on` AND `off`.** **The subject is THE REGISTRY'S
TRANSITION RULES AND THE HANDLE'S TWO SPELLINGS, and the four members that reach that registry are `register`
(this row's item 5), `unlisten` (whose contrast the row's item 4 declares), `on(address, listener) -> handle` and
`off(handle) -> undefined` (`§2.4` item 7; `surface.md §2.4` item 7).** **THE THREE THINGS THE TWO NEW MEMBERS
ADD TO THIS ROW'S SUBJECT, ONE LINE EACH, EACH AT ITS OWN CELL:**
- **`on` WRITES TO THE MAP.** **It performs the store's `listen` and then the registry's registration, IN THAT
  ORDER (VALIDATE → LISTEN → REGISTER); it returns the handle; at a HELD address it returns that address's
  EXISTING handle — the store's address-level idempotence (`§2.3` item 6; `write-and-read.md §6.5` item 12 (c)) —
  and REPLACES the registry's function for that identity, so ONE IDENTITY CARRIES ONE FUNCTION** (`§2.4` rule 2;
  `surface.md §2.4` item 7 (a)).
- **`off` REMOVES FROM THE MAP — AND THE REMOVAL IS THE PACKAGE'S OWN.** **It validates first, then performs the
  STORE-SIDE `unlisten` AND removes the PACKAGE'S OWN registry entry for that identity; `unlisten` KEEPS RULE 4
  VERBATIM — the store-facing withdrawal only, the registry's entry STANDING — so RULE 4 IS SUPPLEMENTED, NOT
  EXCEPTED, and the asymmetry this row's item 4 declares survives EXACTLY AS WRITTEN** (`§2.4` rule 4;
  `surface.md §2.4` item 7 (b); **`A80`**).
- **AND BOTH ARE DELIVERY-SIDE ACTIONS UPON THE STORE'S OWN TWO VERBS, SO THIS ROW GAINS NO FIRING RULE.** **What
  the store's home does when a `listen` or an `unlisten` lands — and WHAT a trigger's returned set contains
  relative to one that lands after it was computed — remains the STORE's, and the authority is
  `docs/specs/storeroom-native/write-and-read.md §6.5` item 14** (**`A78`**; `surface.md §2.4` item 7 (c)).

**2. THE FAILURE LIST, AS IT NOW READS AT THIS ROW — THE AS-FILED ENTRIES RE-EMITTED WHOLE FROM THE LINE ABOVE,
WITH THE `6` ENTRIES THIS AMENDMENT ADDS PRINTED BESIDE THEM.** **The as-filed list STANDS UNMOVED AND UNCUT** —
*"an unregistered handle that throws, logs or warns; a fan-out registration; a duplicate token that fires twice
per distinct handle; an `unlisten` that unregisters the function; a returned handle whose token JS can read; an
`unlisten` that accepts a bare `string` as a known handle; a re-`listen` that re-uses a withdrawn handle"* — **and
the two new members now fail by these SIX ADDED entries, each naming its own observable:**
- **A NON-FUNCTION ADMITTED at `on`'s listener position** — **or at `register`'s, whose `TypeError` and whose
  replacement arm `surface.md §2.5` item 5 (g) already reads through the single form.** **The refusal must be
  `AddressMalformed` in `§2.5`'s one form, and NO second form arises.**
- **AN ADDRESS ADMITTED UNVALIDATED at `on`'s address position** — **an address outside `AddressArg`'s domain
  reaching the store, so that the store's own home or the registry is touched before the class decision.**
- **A STORE-SIDE ENTRY LEFT BEHIND AFTER A REFUSAL** — **a refused `on` whose address the home did not hold, with
  the home holding a new entry afterwards; and, at a held address, a refused `on` that disturbed the standing
  entry.**
- **`off` FAILING TO REMOVE THE REGISTRY ENTRY** — **a successful `off` whose identity the registry still holds a
  function for, so a later trigger invokes a function the caller deregistered.**
- **`off` REMOVING MORE THAN THE HANDLE NAMES** — **a sibling registration, or an entry at another address, gone
  after one `off`; and an `off` that also removed the store-side entry of an address its own handle does not
  name.**
- **A FIRING RULE STATED BY THE PACKAGE** — **`on` or `off` asserting, promising or altering WHICH listener fires
  or WHEN; and any drive that derives its firing terms from these two members instead of from
  `write-and-read.md §6.5` item 14.**
**SO THE ROW IS FAILABLE FROM BOTH SIDES OF THE TWO NEW MEMBERS: change what `on` or `off` DOES and one of the six
fails; change the registry's four rules or the handle's spellings and an as-filed entry fails, exactly as
before.**

**3. THE STRATEGY IDS, ONE LINE EACH, BECAUSE A DRIVE MUST REACH THE TWO NEW SITES FROM A LINE THIS ROW ALREADY
CARRIES.** **`S-REG`** (the four rules, one drive each, reached through the declared registration site — **and now,
by THIS clause, ALSO through `on` and `off`, whose arms are the same map's; the line's own words stand and are
extended here**). **`S-REG-DUP`** (UNMOVED, this row's item 1 above). **`S-OPAQUE`** (UNMOVED — and it now covers
`on`'s RETURN and `off`'s ARGUMENT as well, both of them the package's opaque value and nothing else).
**`S-WITHDRAW`** (UNMOVED in its two arms — and `off`'s contrast with `unlisten` over ONE value is asserted BESIDE
them: `unlisten` no-op-succeeds where `off` refuses `AddressMalformed`). **NO STRATEGY ID IS ADDED, DROPPED,
RENAMED OR RE-SPELLED BY THIS CLAUSE** (`§5.0`'s dual-mapping disclosure).

**4. AND WHAT DOES NOT MOVE HERE: the register stands at its `8` rows with the cap holding at `8 ≤ 8` ✓ and NO
NINTH ROW IS MINTED — the two new members owe no row of their own, because a row is FAILABLE only where its
failure list names the observable that fails it and this row's list now does; the `alt` cells of every row stand
unmoved; `§5.1`–`§5.4` and `§5.6`–`§5.8` stand exactly as printed; and `§5.0`'s census and its dual-mapping
disclosure stand as printed.**

**5. AND EVERY RED-SET CELL AND EVERY BLIND-GREEN ASSERTION THIS RE-DERIVATION MAKES FALSE IS NAMED HERE, EACH
WITH ITS `§`, BECAUSE A MEMBER-SET CLAIM IS THE ONE THING THE TWO NEW MEMBERS MOVE AND NO SUCH CLAIM MAY BE LEFT
TO A BYTE DIFF.** **The amendment's own subject is the INSTANCE's member set, so the cells below — which assert
`{ register }` EXACTLY — read FALSE against the declared `{ register, on, off }` and MUST BE RE-DERIVED BY THEIR
OWN AUTHORS. This clause NAMES them; it edits NONE of them, and NONE of their bytes moves here.**
- **THE BLIND GREEN SET — `role_blind_test_writer`, per the filing's `Q5`:** **`docs/specs/storeroom-js-greens.md`
  `§2`'s `JSG-01` scenario's HEADER** (its *"the instance's own member set is exactly `{ register }`"* clause, and
  its own clause list's `§2.4` item 5 (a) entry) — **and `JSG-01`'s cell `JSG-01.9`**, whose drive is
  `Object.getOwnPropertyNames(inst).sort()` and whose expected observable is *"exactly `['register']` — one own
  member and NOTHING ELSE"*, cited to `§2.4` item 5 (a). **Both are FALSE from this date and the RE-RUN is
  required, because the scenario's `13` assertions are re-derived as a set and its verdict must be re-measured
  against the rebuilt artefact** (`docs/specs/storeroom-js-greens.md` `§2` · `JSG-01` and `JSG-01.9`;
  `docs/specs/storeroom-js-convenience-proposal.md §5` · `Q5`). **`JSG-01.2` — the module namespace's EIGHT names —
  is NOT moved and stands TRUE, and so do `JSG-01.7`, `JSG-01.11` and `JSG-01.12`.**
- **THE RED SET — `role_test_writer`, per the filing's `Q2` — CARRIES NO FALSE CELL FOR THIS CLAIM, AND THAT IS
  MEASURED RATHER THAN ASSUMED.** **This pass read `bindings/js/test/**` at its own bytes for the member-set
  claim and found the two cells that enumerate own properties are `registry.test.mjs`'s
  `handle_the_returned_token_is_readable_by_no_js_code` and `register.test.mjs`'s `S-OPAQUE` arm, AND BOTH
  ENUMERATE THE **HANDLE**, which stays FROZEN AND MEMBERLESS — `Object.getOwnPropertyNames(handle).length !== 0`
  and `Object.getOwnPropertyNames(returned).join(',')` — so **NOT ONE OF THEM IS MADE FALSE: the two new members
  are properties of the INSTANCE and not of the handle, and `§2.3` item 2's memberless-handle clause is
  UNMOVED.** **(READ THROUGH `§2.1`'s dated clause 1 (a) AND `surface.md §2.4` ITEM 9, 2026-10-15: the set these cells enumerate is `{ register, on, off, settle }` — the `{ register }` figure here is the as-filed one the `Q1` amendment moved, and the `settle` member the ordering seam added is reached through the same factory product and through no named export, so no CELL OF THIS BULLET's subject — the handle's memberlessness, `register`'s absence from the module namespace and the `8`-verb count — MOVES.)** **AND THE CELLS THAT ASSERT `register`'S ABSENCE FROM THE MODULE NAMESPACE ARE NOT MOVED EITHER —
  `on` and `off` are absent from it too, and `§2.9` item 1's `8`-verb count stands** (`bindings/js/test/**`'s own
  bytes; `archive/gate3/storeroom-js-red-set.md` `§3` and `§11.4`; `acceptance.md §4.4` — the red set's
  ownership). **AND THE DRIVES THE AMENDMENT MAKES DERIVABLE, STATED SO THEY ARE TASKED AND NOT INHERITED — a
  drive for `on`'s atomicity (a refused argument leaving NO store-side entry and NO registry entry), a drive for
  the held-address arm (the existing handle returned AND the function replaced), a drive for `off`'s two removals
  and its contrast with `unlisten`'s no-op set, and a drive for the outside-handle refusal at `off` — NONE of
  them exists in either set today and ALL of them are owed** (`archive/gate3/storeroom-js-red-set.md` `§5`
  finding 1's subject, whose `S-REG` line is the row's own drivable line; `contract.md §5.5` this clause's
  clauses 1–2).
- **THE LIVE BATTERY — `role_live_scenario_runner`, per the filing's `Q6`:** **`bindings/js/greens/live-drive.mjs`'s
  `LIVE-1.3`**, whose assertion is `Object.getOwnPropertyNames(inst).sort().join(',') === 'register'` —
  **FALSE from this date, and its RE-RUN is a new scenario's work.** **Its own record names the same clause:
  `archive/gate6/storeroom-js-live-determination.md`'s `D-L1` row cites `LIVE-1.3`'s *"the instance's member set is
  exactly `['register']`"*, so a re-run that leaves that assertion standing fails on the declared state**
  (`archive/gate6/storeroom-js-live-determination.md` · `D-L1`, and that record's `§4`; the filing's `§6` — *"the
  live battery `12` · `72` → `+1` scenario"*).
- **AND THE CONTRACT DOCUMENT'S OWN TWO CELLS ARE NAMED WITH THEIR `§`, BECAUSE A READER MEETS THEM BEFORE THIS
  CLAUSE: `contract.md`'s `§2.4` item 5 (a)'s *"`{ register }` — one own member, and NOTHING ELSE"* and
  `surface.md`'s `§2.4` item 5 (a) in the same words** — the two homes of one relocated span, each read through
  `surface.md §2.4` item 7 and this document's `Q1` index clause from this date; **the re-spelling of both is the
  NAMED REPAIR of a later bounded amendment, which must land in BOTH homes in ONE pass** (`§0.1` item 2's
  relocation rule; `surface.md`'s own KIND statement). **And `docs/specs/storeroom-js/package.md §1.4`'s *"the
  INSTANCE'S OWN MEMBERS — `register(handle, listener)` alone, the ONE member"* and its citation of
  `JSG-01.9`'s `{ register }` are the SAME claim at a third and fourth site, named here for the same pass**
  (`package.md §1.4`; `archive/gate5/storeroom-js-greens-run.md` §4 · `F-DOC-1`).
**AND THE CONVERSE, STATED SO NO AUTHOR MOVES A CELL THAT IS STILL TRUE: no cell anywhere asserts the count of
`on`/`off` in the MODULE namespace — because they are not there — and `§2.9` item 1's `8`-name count, `package.md
§1.3` item 3's *"AND NOTHING ELSE"*, `§2.4` item 5 (a)'s *"`register` is not a ninth named export"* and the
`HO-1` non-exposure arm each stand TRUE of the amended surface and are NOT to be moved.**
(`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the rulings
this re-derivation implements; A1 docs/specs/storeroom-js-convenience-proposal.md §6 — the blast-radius table
whose *"the instance's own member set"* row names exactly these cells; A3 docs/specs/storeroom-js-greens.md §2 ·
`JSG-01.9`; A3 archive/gate6/storeroom-js-live-determination.md · `D-L1` | requirement]`). (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the rulings
this re-derivation implements; A1 docs/specs/storeroom-js-proposal.md §18 · `A76` · `A77` — the constraints it
obeys; A3 docs/specs/storeroom-js/surface.md §2.4 item 7 — the two new members' own clause home; A3
docs/specs/storeroom-js/parameter-semantics.md §2.8's and §2.12's dated clauses — the two re-derived parameter
rows | requirement]`).

### §5.6 `P-SR-6` — the construction's sequence and the two instances hazard

**Property.** **THE CONSTRUCTION IS A FUNCTION OF ITS ARGUMENTS AND OF THE STORE'S OWN SEQUENCE:**
`cfg`'s four keys (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS — the `three` this clause
printed is the count before the `constraints` key, whose own validation instants `P-TP-6` declares; the
`filePath` · `journalLength` · `listeners` handling named below is UNMOVED) are passed through unmodified; the store's own sequence runs (its `journalLength` and
`filePath` handling, its reachability probe — a DRY RUN that creates no file, no directory and no byte —
its tier fixity, its home population from `listeners[]` BEFORE the register is generated, and its boot-load
of `cfg.filePath` when the path is present); **a legal construction returns an instance and an illegal one
throws and returns NOTHING**; and **two instances over one `cfg.filePath` are the caller's own declared
hazard, not a refused state.**
**Strategy ids.** **`S-CONSTRUCT`** (one drive per outside form of `cfg`'s four keys, plus the two legal
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
(`[A3 docs/specs/storeroom-native/contract.md §7.1 · §7.2 · §5.7 · P-TP-7 — **THE STORE UNIT'S OWN `P-TP-7`, SPELLED WITH ITS PATH** |
requirement]`)

**⟶ AMENDED 2026-10-13 — `S-8`'S DISPOSITION, LANDED BY THIS DIRECTORY'S OWN BOUNDED AMENDMENT: THE STORE-SIDE CLAUSE THIS ROW CARRIES IS THE SIBLING'S OWN, AND ITS `S-PROBE-DRY` STRATEGY IS NARROWED TO THE FORM THIS DIRECTORY ALREADY DRIVES** (`RCA-8(d)` ANNOTATE-BESIDE: **this row's `Property`, its four strategy ids, its failure list and its clause set above stand BYTE-FOR-BYTE and are read THROUGH this clause, which is the operative statement of what the row's PROBE sentence and its `S-PROBE-DRY` strategy now govern**; `docs/specs/storeroom-native/contract.md §10.4`; that document's `DD-45`'s amended clause and `§8.1` #13's amended trigger clause; `docs/specs/storeroom-access-probe-review.md` `§5.1`'s `S-8` row; the `docs/decisions.md` rows of `2026-10-13`; `[A3 docs/specs/storeroom-native/contract.md §10.4 · §7.1 steps 3-bis and 4b · `DD-45` as amended | declared parameter semantics + one narrowed strategy]`).
- **(1) THE CLAUSE THIS ROW CITED IS THE SIBLING'S AND HAS MOVED THERE: the row's *"its reachability probe — a DRY RUN that creates no file, no directory and no byte"* is read at its SOURCE, `docs/specs/storeroom-native/contract.md §7.1` step 3's dated clauses read with that document's `§10.4` — where the PROBE still creates nothing AND THE STORE'S OWN ACT, at a PROVIDED and ABSENT `filePath` under a writable parent, now LEAVES A ZERO-LENGTH FILE (an EMPTY FILE AND NO BYTE, not a second durability route).** **THIS ROW DECLARES NO STORE-SIDE CLAUSE OF ITS OWN: it carries the sibling's, and where the sibling's moves, this row POINTS rather than re-states** (`A3`; the sibling's `§8.2`-style one-slot rule for a `<available clause>` is NOT engaged, because the message is byte-stable).
- **(2) AND THE ROW'S OWN `S-PROBE-DRY` IS NARROWED TO THE FORM THIS DIRECTORY ALREADY DRIVES, WITH NO NEW STRATEGY ID MINTED AND NO ROW'S FAILURE LIST WIDENED: `S-PROBE-DRY`'s subject is THE FAILED CONSTRUCTION — *"the parent directory, the file's bytes and the directory's entries are unchanged by a failed construction"* — which is the drive `bindings/js/tests/register_layer.rs` already performs, and that drive's assertions are UNMOVED** (`A55`'s *"leaves nothing behind"*; the sibling's `§10.4` part 5; `§5.1`'s eight-row register, unmoved — **its EIGHT ROWS ARE `P-SR-1`…`P-SR-8` FROM 2026-10-17, a RECORDED re-mint and not a move**).
- **(3) AND THE TWO HAZARD CELLS THE AMENDMENT DOES **NOT** REACH, SO NEITHER IS LEFT TO A READER'S GUESS: the row's *"two instances over one `cfg.filePath` are the caller's own declared hazard"* clause, its `S-TWO-PATHS` strategy, its `S-CONSTRUCT` and `S-COUNT` strategies, its whole failure list and its clause set are UNMOVED — and the sibling's `DD-28` amendment (the construction's create as a producer of AN EMPTY FILE AND NO BYTE, and not a second durability route) is exactly what keeps `S-TWO-PATHS`'s *"clobbers the first's bytes"* half TRUE, so no hazard cell of this row moves.** **ITS `S-COUNT` CELL IS UNMOVED FOR THE SAME REASON: `2` construction entries in ⇒ `2` entries in the store's home, `0` entries in ⇒ a first write whose `triggered` is `[]` — the create commits NO register key and NO registration.** **AND THIS DIRECTORY MINTS NO ROW, NO STRATEGY ID AND NO IDENTIFIER: the JS half of the typed register stands at `3` rows (`P-SR-4`, `P-SR-5`, `P-SR-6`) inside the `8`-row set, and its ids are UNMOVED — **⟶ THEIR SPELLINGS MOVED AT THE RE-MINT OF 2026-10-17 AND THEIR COUNT DID NOT, `3` ROWS INSIDE `8`, `8 ≤ 8` ✓ (`DEF-2026-10-16-S`; `RCA-8(g)`: this cell's `3`-row figure and its `8`-row set are UNMOVED, and only the three ids' spellings move)**.**

### §5.7 `P-SR-7` — the package's boot, the realm claim, and the handoff set

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

### §5.8 `P-SR-8` — the handle's boundary domain, the trigger's membership, and the no-op set

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
(`[A3 docs/specs/storeroom-native/contract.md §6.5 · §5.8 · P-TP-8 — **THE STORE UNIT'S OWN `P-TP-8`, SPELLED WITH ITS PATH** — the store's own member-set rule |
requirement]`)

**⟶ AMENDED 2026-10-11 — THE BOUNDED CALLER-SPELLED-DUPLICATE PASS (`role_spec_writer`), CLOSING THE
IMPLEMENTER'S `CF-DUP-1` AT THIS ROW'S `S-SET` CELL: THE SIZE-ONLY PHRASING THAT READ ONE FIGURE WHERE THE
RECONCILED RULE SPLITS TWO.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte — the
failure list's own line included — and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds
NO ROW, moves NO COUNT and re-decides NO rule.** **THE FINDING, NAMED WITH ITS TERMS: the `S-SET` cell reads
*"set equality, never a sequence; a registration's order is unobservable"*, and that phrasing is read by a
drive as a SIZE-ONLY comparison of the `triggered` set — while `docs/specs/storeroom-js/surface.md §2.4`'s dated
clause of 2026-10-11 splits the very state this row's subject carries into TWO figure classes: THE ARRAY'S
ELEMENT MULTIPLICITY (THE STORE'S, carried ELEMENT FOR ELEMENT, so a lawful caller-spelled duplicate's token
crosses TWICE and `triggered.length === 2`) and THE INVOCATION COUNT (THE PACKAGE'S, ONE PER DISTINCT
IDENTITY).**

**THE `S-SET` CELL, AS FILED, NAMED AS FILED AND RE-EMITTED VERBATIM SO `git diff` RECOVERS IT WHERE IT
STANDS:** ***"`S-SET` (set equality, never a sequence; a registration's order is unobservable)"***. **THE
OPERATIVE READING OF ITS TWO HALVES: (1) THE MEMBERSHIP COMPARISON IS MEMBER BY MEMBER, IN BOTH DIRECTIONS,
AND NEVER BY SIZE — two enumerations of equal length with different members MUST fail, and a drive may NOT
conclude equality from a length, from a distinct-member count or from a `Set`'s size alone; AND (2) THE TWO
FIGURE CLASSES ARE CARRIED BESIDE EACH OTHER AND NOT COLLAPSED INTO ONE — the array's OWN LENGTH (the store's
multiplicity: `2` for a lawful caller-spelled duplicate) and the DISTINCT-IDENTITY COUNT (the package's
invocation count: `1` for that same state) are asserted TOGETHER, each as its own observable, and neither is
read as the other.** **AND THIS ROW'S PROPERTY'S OWN SENTENCE IS UNMOVED: *"the triggered set is a SET whose
ORDER IS UNOBSERVABLE AND NEVER ASSERTED"* — no order is asserted by either figure** (`§2.7` item 3;
`DD-22`; `surface.md §2.4`'s dated clause, clauses (i)–(ii); `parameter-semantics.md §2.15`'s dated clause).

**THE FAILURE LIST, AS IT NOW READS AT THIS ROW — the as-filed entries re-emitted whole from the line above,
with the entries this amendment adds printed beside them:** the as-filed list STANDS UNMOVED AND UNCUT —
*"a handle returned for a listener that did not trigger; a handle omitted for one that did; a duplicate member
where the store minted the token; a foreign or fabricated handle that removes an existing registration; a
drive that asserts a sequence; an invocation before the verb returns; a `try`/`catch` around a listener body;
a rollback triggered by a listener's throw; a listener whose tier qualifier suppresses (or extends) its own
trigger"* — **and the size-only comparison now fails by these FOUR ADDED entries: A SIZE-ONLY COMPARISON —
a membership equality concluded from a LENGTH, a distinct-member count or a `Set`'s size alone, where two
different sets of equal size then pass; A COLLAPSED ARRAY — a drive that accepts `triggered.length === 1` for
a lawful caller-spelled duplicate whose store-side list carries the token TWICE, or that reads the boundary's
COLLAPSE as this row's declared reading; AN INVOCATION PER ELEMENT — an invocation count derived from the
array's length rather than from the DISTINCT identities, so the duplicate token's one function runs TWICE; and
a drive that collapses the TWO figure classes into ONE asserted number.** **NOTHING ELSE OF THE ROW MOVES:
the as-filed entry *"a duplicate member where the store minted the token"* STAYS FALSE of every lawful state,
because the mint's own non-collision rule runs before the token is handed out, so a MINTED token is never held
by two minted entries** (`§2.4` rule 3's CASE A; `DD-42` clause 1).

**AND WHAT DOES NOT MOVE HERE:** **the register stands at its `8` rows with the cap holding at `8 ≤ 8`, NO
NINTH ROW IS MINTED, no strategy id is added, dropped or renamed, and `S-TRIGGER` · `S-NOOP` ·
`S-FIRE-WINDOW` stand exactly as printed** — **the `S-FIRE-WINDOW` line's INVOCATION sub-half stays the
PACKAGE's rule and is UNMOVED by this clause, and its window, order and throwing-body halves are unchanged.**
**The state this row declares is the build's to reach: `bindings/js/index.mjs`'s `wrapHandles` collapses the
duplicate at the boundary today — the priced alternative named at `surface.md §2.4`'s dated clause — and the
register's figures are the DECLARED ones and are not adjusted to a build.**
**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8): THE
SENTENCE ABOVE IS STALE AGAINST THE SHIPPED BUILD AND IS READ THROUGH THE CLAUSE BELOW IT.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the as-filed sentence included, quoted here rather
than deleted — and the clause below is the OPERATIVE STATEMENT of the build's own state at this row's
subject, taken together with the twin clause at `§5.5`'s `S-REG-DUP` row.** **WHAT THE SENTENCE READ,
VERBATIM:** *"`bindings/js/index.mjs`'s `wrapHandles` collapses the duplicate at the boundary today — the
priced alternative named at `surface.md §2.4`'s dated clause"*. **THE OPERATIVE STATE, AT THE BUILD'S OWN
BYTES: the boundary's collapse is GONE — `wrapHandles` carries the store's list ELEMENT FOR ELEMENT, with the
per-identity deduplication at `deliver` — so `triggered` carries a lawful caller-spelled duplicate's token
`TWICE` and this row's `S-TRIGGER` figures hold of the shipped package.** **NO FIGURE OF THIS ROW MOVES: the
set's own property sentence, the four added failure-list entries and the `S-TRIGGER` · `S-NOOP` ·
`S-FIRE-WINDOW` lines stand exactly as printed, and a drive that accepts a collapsed array remains a FAILURE
of this row** (`archive/gate3/storeroom-js-red-set.md` §13; `bindings/js/index.mjs`'s `wrapHandles`/`deliver`;
A1 docs/specs/storeroom-js-proposal.md §18 · `A77`; A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-42` ·
`DD-39` | state or fail-state declaration). **AND THE `derivation:` CLAUSE STAYS
SINGLE: this clause is an insertion and carries no `derivation:` clause**
(`archive/gate3/storeroom-js-red-set.md §12.5` finding 3; `surface.md §2.4`'s dated clause of 2026-10-11)
(`[A1 docs/specs/storeroom-js/contract.md §2.4 rule 3's CASE B — the array's multiplicity is the store's; A3
docs/specs/storeroom-js/parameter-semantics.md §2.15's dated clause; A3
docs/specs/storeroom-native/contract.md §5.8 — the store's own member-set rule, read with `DD-42` and `DD-39` |
state or fail-state declaration]`).

---

**⟶ THE BOUNDED DIVERGENCE SWEEP (`SW-1`), LANDED 2026-10-11 BY `role_spec_writer`, MEASURING THIS CONTRACT
AGAINST THE SHIPPED BUILD OF `bindings/js/`.** `RCA-8(d)` ANNOTATE-BESIDE: **every clause above this one
stands byte-for-byte; THIS clause is a PURE INSERTION and it is the SWEEP'S OWN RECORD, not a ruling.** **IT
RE-DECIDES NOTHING: no `§` is renumbered, no rule is withdrawn, no `DD` row's `alt` moves, the register stays
at its `8` rows (`§5.0`), the `derivation:` clause stays SINGLE (this file's opening clause), and the closure
predicate reads `6 = 6` with the file set unmoved by this pass, because this pass writes ONLY inside
`docs/specs/storeroom-js/**` and creates no file.** **AND THE CLOSURE'S TWO FIGURES ARE PRINTED HERE WITH
THEIR TERMS RATHER THAN ASSUMED: the left side — `{part-map PART entries}` = the map's `7` rows minus the
contract-document row — is `6`; the right side counted as the map's own PART ENTRIES is `6` (the `5` carrier
parts plus `implementation-plan`), so `6 = 6` ✓ **and the predicate HOLDS on that counting**; the right side
counted as THE RAW FILE SET the clause's words name — *"{files present in docs/specs/storeroom-js/} −
{contract.md}"* — is `7`, because `test-cases.md` is present as well, so the SAME predicate reads `6 = 7` on
that counting and would NOT hold.** **THE OPERATIVE READING IS THE PART-ENTRY COUNTING, `6 = 6`, and the raw
count's `7` is dispositioned as row `30` of item 2 below: the state is `CLOSED` on the part-entry terms, the
state is NOT claimed on the raw file count, and the re-statement of the clause's right-hand terms is the named
repair of a later bounded amendment.** **A DISPOSITION HERE NAMES THE SIDE THAT MUST MOVE; where
the side is the CODE or the RED SET the repair is a FINDING for that side's role and the bytes of this
directory are NOT widened to excuse the build.**
**AND THE SUBJECT, STATED WITH ITS AUTHORITY: what a build DOES is a measurement of `bindings/js/**` — read
this pass at its own bytes — while every "the contract says …" half is this directory's own pinned
`§`.** **The `WHO MUST MOVE` column is therefore the only pinnable half of each row, and each row names its
owner** (`[A1 | numeric or census claim]`).

**1. WHAT HELD — THE AXES THIS PASS MEASURED AND FOUND MATCHING THE DECLARED ANSWERS, IN ONE LINE EACH.**

| The axis | It HELD, at the clause that pins it |
| --- | --- |
| the declared surface, at the module namespace | `bindings/js/index.mjs`'s named exports are EXACTLY the `8` verbs — `storeCreate` · `read` · `readLiteral` · `write` · `delete` (published under that name alone, from the reserved-word workaround `deleteOp`) · `rollback` · `listen` · `unlisten` — and NO ninth (`§2.9` item 1) |
| the instance handle's member set | `storeCreate` returns an object whose entire OWN member set is `{ register }`, and the handle's state lives in a module-level `WeakMap` (`§2.4` item 5 (a)) |
| `findAddress` | ABSENT everywhere: `0` occurrence in `index.mjs`, in `src/**`, in `package.json` and in the addon's own export list (`§2.9`) |
| the crossing's walk rules | the ancestor-stack cycle guard with the ADMITTED diamond, the depth-`64` / node-`1,000,000` ceiling, the `Symbol`-keyed own property, the sparse-array hole, the own accessor, the `Proxy` and the `{a: undefined}` member — each refused, at the walk's own site (`§1.4` items 1–7) |
| the plain-object test's (e)-half | `Object.create(null)` is ACCEPTED (`§1.4` item 4 (e); `DD-35`) |
| the carriers' absent-versus-`undefined` reading | the build reads a VERB's trailing `tier` by CALL ARITY (`arguments.length >= 3`) and a `cfg` KEY by `in`-membership, with `ConstructionArgumentMissing` against `AddressMalformed` told apart by the ANSWER (`§1.3`'s dated rule; `DD-46`) |
| the registry's rules 1–3 and the opaque handle | an unregistered handle fires nothing silently; `register` replaces and never fans out; a duplicate token enters the triggered set once; the returned handle is a frozen memberless object whose token no JS code can read (`§2.3` item 2, `§2.4` rules 1–3) |
| the registration site's declared answers | `register` throws a real JS `TypeError` — carrying no `status` and no `message` — for a non-function OR for a token this instance never minted, and a re-registration of an in-domain handle returns `undefined` (`§2.4` item 5 (d)) |
| the process-scoped identity | two instances at one address mint DIFFERENT handles (`§2.3` item 1) |
| the triggered set, the firing window and a throwing body | membership is the prefix test, the set is compared as a set, the invocation follows the verb's return, and a throwing body is neither caught nor reported (`§2.3` item 5, `§2.7`) |
| the two file-behaviour readings | `delete` and `rollback` perform no file I/O, a fresh boot re-loads the last successful `file` write, and a failed commit answers `FileCommitFailed` (`§2.8`; `DD-45`) |

**⟶ AND THE TWO FIGURES THIS TABLE'S FIRST TWO ROWS PRINT ARE SUPERSEDED AND ARE READ THROUGH AT THOSE ROWS' OWN BYTES, 2026-10-16 (`RCA-8(g)`: every other row and both clauses of this pass stand BYTE-FOR-BYTE and THIS clause is their mark, at their own cells and not only in a list elsewhere): *"named exports are EXACTLY the `8` verbs … and NO ninth"* IS THE `A122` PASS'S READING, and so is *"returns an object whose entire OWN member set is `{ register }`"*; THE OPERATIVE FIGURES ARE ONE named export, `storeCreate` ALONE, `11 → 1` ✓, and TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of that date. AND THE THIRD ROW'S AXIS IS NAMED SO ITS FIGURE IS NOT READ AS A CELL OF THE INVENTORY: its `0` occurrence is a MEASUREMENT of `findAddress`'s absence and not a member-set or namespace count, so it PRINTS NEITHER SUPERSEDED FIGURE and it is NOT a member of the inventory that carries the two rows above. THE TWO ROWS THAT PRINT THE TWO FIGURES ARE CARRIED, ONE CELL PER LINE, IN `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `25` cells** (`role_spec_writer`; the two rows above read at their own bytes and each cell's mark standing at itself).
| the package | ONE arms-bearing `exports` arm (the ESM one), no wildcard, no CJS arm, no `main`, no `.cjs`; `"engines": { "node": ">=18.0.0" }`; `AGPL-3.0` in `package.json`'s `license` and in `bindings/js/README.md`; the `5`-target prebuild matrix named in `optionalDependencies`; the addon documented as INTERNAL and as no entry point (`§3.1`–`§3.4`; `DD-24`, `DD-25`, `DD-38`, `DD-43`) |
| the binary rule and the ignore file | `bindings/js/.gitignore` carries `/target/`, `/build/` and `/Cargo.lock`; the built artefact sits at the IGNORED path `bindings/js/build/Release/storeroom_js_binding.node`; no `.node`, `.so`, `.dll` or `.wasm` is tracked (`§3.3` item 3; `DD-25`) |
| the crate's manifest facts | one path dependency, no second, no `[workspace]` in either manifest, `edition = "2021"`, `crate-type = ["cdylib", "rlib"]`, `[package] name = "storeroom-js-binding"` with the crate id `storeroom_js_binding` (`§3.4`; `DD-26`, `DD-27`) |
| the acceptance layer | the declared Rust command and the declared JS command are the ones `bindings/js/README.md` prints; the runner is `node --test` with `node:test` + `node:assert`, driven through the claimed ESM entry; the layer label is `ENVELOPE/PURE` and the `APP` layer is `NONE` (`§4.1`, `§4.2`; `DD-18`, `DD-20`) |
| the register's ids | every strategy id the two runners print exists in `§5.1`–`§5.8`, and the ids the build prints number the register's own `8` (`§5.0`) |
| the `test-cases` view | its first line states that it contains NO executable tests, and its census reads `71` rows over its own numbering (`§7.1` figure 10's neighbourhood) |

**2. THE DIVERGENCE TABLE — EVERY ONE, WITH THE SIDE THAT MUST MOVE AND THE ONE-LINE REASON.** **Each row
names a contract cell against the build's exact path and name; `contract` is fixed by THIS pass, `code` is a
finding for `role_implementer`, `red set` is a finding for `role_test_writer`, and `record/plan` is a finding
for the supervisor's tracker pass or the plan's own author** (`[A1 | state or fail-state declaration]`).

| # | The divergence: the contract cell `§` against the build's path and name | WHO MUST MOVE | The reason |
| --- | --- | --- | --- |
| **1** | `package.md §4.5` item 1 / `§4.4`'s `V1`: *"the `#[napi]` export facade … and this module are the SAME crate's two halves"*, the facade's methods converting through the CORE — against `bindings/js/index.mjs`, whose `Boundary` class carries the register tree, the home, the journal, the file log and all `8` verbs IN JAVASCRIPT, and which never calls the addon's `storeCreate` or its `call` dispatch | **the CODE** (the contract-side half is fixed by this row's own disposition below) | the addon is loaded and held and its dispatch is dead code, so the JS side IS a second store and `A65`'s single-store discipline and the `V1` layout both read false of the shipped package; the contract keeps its clause and the code routes the verbs through the addon's dispatch, or a fresh ruling replaces `V1` — and the minimal repair is to make the core the ONE authority for store state |
| **2** | `package.md §4.5` item 3: `fn from_store_value(v: &StoreValue) -> Result<JsValue, Refusal>` — against `bindings/js/src/crossing.rs`'s `pub fn from_store_value(v: &StoreValue) -> JsValue` | **the CONTRACT**, in `package.md §4.5` item 3, at the next bounded amendment | the DECLARED interface and the shipped signature disagree on the error arm, and this pass may not widen the declaration to match a build; the repair is the smallest one and it is a re-spelling of one line |
| **3** | `package.md §4.5` item 2's `JsValue` row — *"the `5` admitted classes of rows 1–5 and the `8` outside classes of rows 6–13, plus the sparse-array carrier … `13 + 1 = 14` variants"* — against `bindings/js/src/crossing.rs`'s `pub enum JsValue`, whose `Function` and `Symbol` are DISTINCT variants BESIDE the `SparseArray` carrier, so the model carries the `8` outside classes, the `5` admitted ones, the hole's carrier AND a distinction the table does not draw | **the CONTRACT**, in `package.md §4.5` item 2, at the next bounded amendment | the model's variant count is a census this declaration prints and the build does not yield, and `§4.5` item 7 makes an undeclared state a FINDING rather than a licence; the repair is a re-derivation of the count with its terms, not a change to the model |
| **4** | `package.md §4.5` item 2's `JsProto` row — `Plain` · `Null` · `Class`, *"3 variants"* — against `bindings/js/src/crossing.rs`'s `pub enum JsProto` with `Plain` · `Null` · `FOREIGNPLAIN` · `Class` | **the CONTRACT**, in `package.md §4.5` item 2, at the next bounded amendment | `DD-7`'s realm-agnostic test NEEDS a fourth prototype class and the build has one (`ForeignPlain`, ACCEPTED), while the declaration prints three; the repair re-spells the row and its count |
| **5** | `package.md §4.5` item 2 — the `JsHandle` / `JsHandleArg` row names the pair and prints *"the opaque handle OUT; the bare-string and outside forms IN"* — against `bindings/js/src/crossing.rs`'s `pub enum JsHandleArg` with FOUR variants `Opaque(JsHandle)` · `Bare(String)` · `NonOpaque` · `Absent`, and `JsHandle` with a PRIVATE `token` field and three `pub(crate)`/`pub` constructors | **the CONTRACT**, in `package.md §4.5` item 2, at the next bounded amendment | the variant SET is what `§4.5` item 7 makes a finding when the core exposes it and the section does not declare it; the token's privacy is `§2.3` item 2's and holds, so the repair is the enumeration and nothing else |
| **6** | `package.md §4.5` item 2 — the `8` carrier types row — against `bindings/js/src/crossing.rs`'s `pub enum JsJournalLengthArg`, which declares FIFTEEN variants (`Count` · `Absent` · `Zero` · `Negative` · `Fractional` · `NaN` · `Infinity` · `NumericString` · `Bool` · `Object` · `Function` · `BigInt` · `TooLarge` · `Null` · `Undefined`) while `crossing.md §1.6` prints `JournalLengthArg` TWELVE rows | **the CONTRACT**, in `package.md §4.5` item 2 AND `§1.6`'s carrier row count, at the next bounded amendment | the declared *"each carrier's variant count being EXACTLY the variant-row count `crossing.md §1.6` prints for it"* is contradicted by the model the same clause requires, because `Absent`/`Null`/`Undefined` are three states the twelve rows carry as two; the repair is a disclosure of the mapping or a re-derivation of the count, and a ninth-row-style widening is NOT it |
| **7** | `package.md §4.5` item 3's `to_store_value` clause `(c)` — *"APPLIES `crossing.md §1.4` IN FULL … the declared depth-`64` / node-`1,000,000` ceiling"* — against the same function in `src/crossing.rs`, which measures its ceiling and then returns `StoreValue::NonPlainCollection` for a value that exceeds it WITHOUT walking it, and which NEVER consults a `JsValue::Cyclic` marker or an ancestor stack at all | **the CODE** | the refusal is DECLARED to be `ValueNotAdmitted` and the ceiling's own arm produces a DIFFERENT outside class, so two declared answers differ by a class and no Rust cell may drive the ceiling's declared answer — and the cycle guard the core names is carried only by the JS walk (`index.mjs`), which is the JS layer's and not the rlib's |
| **8** | `§1.4` item 4 (e) — *"its prototype is either `null` or a prototype whose OWN properties are exactly the plain-object prototype's, reached WITHOUT … a comparison against this realm's `Object.prototype` — so a plain object from ANOTHER REALM (`vm`, a worker, `structuredClone`) is ACCEPTED"* — against `bindings/js/index.mjs`'s `isPlainObject`, whose whole prototype test is `proto === null || proto === Object.prototype` | **the CODE** | the shipped test IS the realm-IDENTITY test `DD-7` refuses by name, so a cross-realm plain object — an accepted form of `§1.2` row 4 — is refused; the contract stands and the minimal repair is the structural comparison the clause spells out |
| **9** | `§2.9` item 2 / `P-IM-3` — *"ALL `15` FAIL CODES REMAIN REACHABLE FROM JS"* — against `bindings/js/index.mjs`, whose model carries no compaction arm and no anchor-monotonicity check, so `RollbackCompacted` and `ParentAnchorMonotonicityViolation` have NO reachable trigger through the claimed ESM entry | **the CODE** (a red-set half is filed at row 22) | the JS surface as shipped reaches `10` of the `15` from its own arms while the clause's figure is `15` (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: the clause's operative figure is `16`, the sixteenth member `ConstraintListInvalid` being reachable from `storeCreate`; the `10`-of-`15` reading stands as THIS FINDING'S OWN and its SUBJECT — the codes with no reachable trigger through the claimed ESM entry at the tree this row measured — is UNMOVED); the codes are reachable on the Rust leg only, and `§2.9` item 2's own words make a code without a JS-reachable trigger a failure |
| **10** | `§2.5` item 1 / `DD-40` — *"a code the store returns that lies outside the closed set is passed through VERBATIM rather than re-mapped"* and *"the package MINTS NO CODE"* — against `bindings/js/index.mjs`'s `fail()`, which THROWS an `Error` when `CODES.includes(status)` is false, and against `src/facade.rs`'s `addon_call`, which mints `"AddressMalformed"` for an unknown verb and whose `register` path mints the status `"TypeError"` | **the CODE** | three distinct breaches of one clause: a non-member status becomes an `Error` on a path that does not throw the declared plain object at all, a verb NAME mints a status, and a REGISTRATION failure carries a `status` token the store's closed set does not hold — the declared shape is ONE thrown `{status, message}` whose `status` is the store's own token |
| **11** | `§2.5` item 2 — *"`message` is the store's own GENERATED message VERBATIM — never hand-authored by the package"* — against `bindings/js/index.mjs`'s `refusedMessage(address)` and every hand-written string in `fail(…)` in that file and in `src/facade.rs` | **the CODE** | the shipped failure messages are the package's own prose, and `crossing.md §1.2`'s closing clause makes the generator's string part of the refusal's declaration; the Rust leg's cells that compare against the store's own oracle pass because they use the store (`tests/support/mod.rs`), so this divergence lives on the JS path alone |
| **12** | `§2.4` rule 4 / `DD-15` — *"`unlisten` withdraws the registration, never the function … the package's registry entry STANDS"* — against `bindings/js/index.mjs`'s `unlisten`, which performs `state.registry.delete(token)`, i.e. withdraws the FUNCTION with the registration | **the CODE** | the two verbs' declared asymmetry (`§2.4` item 5 (d)'s *"`unlisten` names a WITHDRAWAL … while `register` names a REGISTRATION"*) rests on the registry entry outliving the store-side home entry; the contract stands and the minimal repair is to delete nothing from `state.registry` |
| **13** | `§2.4` item 5 (c) — the domain *"a value THIS INSTANCE minted or adopted"*, and (d) a value a FOREIGN instance minted → the SAME `TypeError` — against `bindings/js/index.mjs`'s `registerOn`, which resolves the handle through a MODULE-LEVEL `WeakMap` and accepts any token equal to one of THIS instance's home tokens, and against `src/facade.rs`'s `addon_register`, which accepts ANY token string at the addon's own boundary | **the CODE** | handle identity is token equality across package instances in the shipped build, so the foreign-instance `TypeError` arm is unreachable from JS while `§5.8`'s `S-NOOP` and the `§2.3` item 3 (i) hazard reading both rest on the declared per-instance identity; the minimal repair is a per-instance key, not a new rule |
| **14** | `PAR-JS-12`'s `domain` cell — *"The package's invocation passes the triggering ADDRESS as its argument; no other argument is declared"* — against `bindings/js/index.mjs`'s `deliver`, which invokes `listener()` with ZERO arguments, and `src/facade.rs`'s `invoke_listeners`, which calls `napi_call_function` with `argc = 0` | **the CODE** | the invocation's argument is a declared parameter-semantics cell and no drive can observe the declared address through the claimed entry; the contract stands |
| **15** | `package.md §1.2` item 1 (and the same words in `bindings/js/README.md` and in `src/facade.rs`) — *"There is exactly ONE `.node` load per instance construction"* — against `bindings/js/index.mjs`'s module-scope `let addon` with `loadAddon()`, which loads ONCE PER PROCESS and is reached only when the first `Boundary` is constructed | **the CODE** (a contract-side re-spelling is the priced alternative and is NOT taken here) | the declared count is per construction and the shipped behaviour is per process; `P-TP-7`'s `S-ONE-ADDON` asserts only that ONE load happened after ONE construction, so the figure and the behaviour disagree without a failing cell — and the minimal repair is either the declared per-construction reach or a bounded re-spelling of the three sites that print it, which needs its own amendment |
| **16** | `package.md §4.5` item 4's record row — `struct JsJournalOp { … kind: JournalOpKind, … }` and `enum JsJournalOpKind { Write, Delete }` — against `bindings/js/src/crossing.rs`'s `pub struct JsJournalOp { … pub kind: String, … }` and `src/facade.rs`'s `journal_op`, which spells `"write"`/`"delete"` as strings; the `JsJournalOpKind` enum does not exist in the build at all | **the CONTRACT**, in `package.md §4.5` item 4, at the next bounded amendment | the JS side OBSERVES the two tokens either way (`§0.2`'s `DD-39`), so nothing behavioural moves, but the declared Rust type set is contradicted by the shipped one and `§4.5` item 7 names this case a FINDING; the repair re-spells the struct row and NAMES the token spelling the build prints |
| **17** | `crossing.md §1.3`'s `JournalLengthArg` row 12 — *"a positive integer beyond `u32` → `AddressMalformed`"* — against `src/crossing.rs`'s `JsJournalLengthArg::TooLarge(u64)`, which carries the `u64` and is then converted through `JournalLengthArg::Fractional` | **the CONTRACT**, in `package.md §4.5` item 2 and `crossing.md §1.3`'s row-12 neighbourhood, at the next bounded amendment | the row is reachable only through a carrier the declared variant list does not name, so the declared answer arrives by a third state rather than by row 12's own arm; the repair names the carrier beside the row or drops the conversion |
| **18** | `§0.3` and `package.md`'s header — *"the third legal value `spec §n` is reached HERE, at `§1.1` and `§4.1`"* — against the dossier at `docs/specs/storeroom-js-adoption-dossier.md`, not re-read by this pass | **the RECORD (the dossier's own clause cell; owner: the supervisor's tracker/record pass)** | the resolution map itself is the contract's `§0.3` and it stands; the dossier byte the map claims to move is outside this directory and this pass may not write it, so the cell's landing is named and not measured |
| **19** | `§0.1` item 11 — *"the count of `A3` citations in this directory that point outside this workspace is `0`"* — against this directory's own bytes, which yield `67` such citations over the two process-rule specs' paths | **the CONTRACT** — **FIXED IN THIS PASS as a pure insertion beside item 11, which now reads the operative figure `67` and names the bounded re-spelling as the reversal path** | eight files carry an `A3` citation to `docs/specs/spec-scope-and-structure/contract.md` or to `docs/specs/spec-authoring-discipline/contract.md` and no file exists at either path, so a claim of `0` was false of the bytes it describes |
| **20** | `acceptance.md §4.1` — the AMENDED clause's *"the relocation … is SPAN-BY-SPAN and BYTE-EXACT against the baseline"* — against `contract.md §4.1`, which prints numbered items `1` then `4` while `acceptance.md`'s own `§4.1` prints `1`–`5` with the insertions `6`–`9` beside them | **the CONTRACT** — **DISPOSED OF IN THIS PASS as a NUMBERING DISCLOSURE inside `acceptance.md`, which is the fix; the renumbering of `contract.md §4.1` is the named repair of a later bounded pass** | the contract document's `§4` is the RELOCATION'S HOME and its item list must print the part's own numbering; the insertions took `6`–`9` and the as-filed `4`–`5` were renumbered without a disclosure, which is a defect in the home and NOT in the part — see item 3 below |
| **21** | `implementation-plan.md §3`'s `Q2`/`Q3` cell — *"`U16` if the architect rules that a published artefact is in scope … `U32` if step 4 leaves an open entry"* — against the plan's own landed reconciliation (which records BOTH closures) and against the tree, where the red set and the green have LANDED and `Q4` is the next phase | **the CONTRACT** — **FIXED IN THIS PASS as a dated phase-state reconciliation inserted beside the gate-2 clause in `implementation-plan.md`** | a phase table that still reads as BLOCKED for two phases that have since been delivered is a plan whose cells contradict its own dated reconciliation; the re-emission is additive and the as-filed `§1`–`§6` stand byte-for-byte |
| **22** | `§5.5`'s `S-REG` and `§5.8`'s `S-FIRE-WINDOW` INVOCATION sub-half — *"now drivable, because that site's spelling is declared"* (`§5.0`'s dated clause) — against `bindings/js/test/register.test.mjs`, where `S-REG` is still handed an `unrunReason` and printed `UN-RUN (FAILURE)`, naming *"CONTRACT FINDING #1"* whose subject `§2.4` item 5 has since declared | **the RED SET** | `acceptance.md §4.1` item 9 and `§2.4` item 5 (e) demand the registration drive and the two-throw-sites drive, and the amended clause makes both reachable; `un-run` remains a FAILURE, so the register's `P-SM-5` row is not drivable-green while the line is stubbed, and no JS cell yet reaches `instance.register` at all |
| **23** | `§2.3` item 4's no-op set and `§1.3`'s `AddressArg` rows — the outside forms' declared answers — against `bindings/js/test/surface.test.mjs` and `registry.test.mjs`, which drive `[]` · `[null]` · `-1` · `1.5` · a sparse array · a `Proxy` but NOT an array holding a FUNCTION, and NOT a cross-realm plain object anywhere on the JS path | **the RED SET** | `AddressArg` row 10 names *"a boolean, an object, a nested array or a function"* as FOUR refused forms and `§1.2` row 4 names a cross-realm plain object as an ACCEPTED one; a declared form with no drive is a row without evidence, and the cross-realm acceptance is exactly the divergence row 8 rests on |
| **24** | `crossing.md`'s `FilePathArg`/`JournalLengthArg` outside forms and `§2.5`'s discrimination half — against `bindings/js/test/*.test.mjs`, where `filePath: ''` · a non-string `filePath` · a `journalLength` beyond `u32` · a `bigint` `journalLength` and `DD-13`'s indistinguishable-value anti-pattern each have no JS cell | **the RED SET** | the Rust leg carries each of these (`crossing_carriers.rs`), but `acceptance.md §4.1` item 1 drives the package through its claimed ENTRY and the shipped entry is where the JS model's own answers live; a form driven on one leg only leaves the other leg's answer unmeasured |
| **25** | `package.md §4.5` item 7's *"a type, a function or an entry point the core exposes and this section does not declare is a FINDING"* — against `bindings/js/src/facade.rs`'s `napi_register_module_v1`, which exports FOUR names (`version` · `storeCreate` · `call` · `register`) while `package.md §1.3` item 3's `NOTHING ELSE` speaks of the ENTRY's named exports | **NO ONE — WITHDRAWN AT MEASUREMENT; the row is kept so its withdrawal is auditable** | **it held on the second reading and this pass records the withdrawal rather than a finding: the addon's own export object is reachable ONLY through the object the module-private `const ADDON = Symbol('addon')` keys (`index.mjs`), so a consumer of the claimed ESM entry CANNOT reach `version`, `call` or the addon's own `storeCreate`, and `package.md §1.3` item 3's `NOTHING ELSE` is therefore true of the module namespace — `HO-1`'s non-exposure arm needs no amendment and the `§4.5` item 7 FINDING does not fire on the addon's internal surface; the row's ORIGINAL subject, the `V1`-vs-JS-model question, is row 1's** |
| **26** | `package.md §3.4` item 1 and `bindings/js/README.md` — *"the licence is declared in the package's `package.json` `license` field, in `bindings/js/README.md`, and at `package.md §3.4`"* (`DD-43`) — against `bindings/js/Cargo.toml`'s `license = "AGPL-3.0-or-later"` | **the CONTRACT**, in `package.md §3.4`'s item list, at the next bounded amendment (the site is a FOURTH one and the spelling is a DIFFERENT one) | `DD-43`'s three-site list is the declared set and the sibling crate's manifest carries a fourth site with an `-or-later` spelling; the repair names the site and states which spelling is operative |
| **27** | `package.md §3.2`'s matrix — the `5` TARGETS `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64` — against `bindings/js/package.json`'s `optionalDependencies` names, which spell `linux-x64-gnu` · `linux-arm64-gnu` · `win32-x64-msvc` | **the CONTRACT**, in `package.md §3.2`, at the next bounded amendment | the matrix's `5` members and their order hold, but three of the five published artefacts carry a toolchain suffix the declared label does not print; the repair states the label-to-artefact map so a consumer and a CI script read one spelling |
| **28** | `§2.4` item 5 (a) and `§2.9` item 1 — the module namespace's `8` verbs — against `bindings/js/test/round-trip.test.mjs`, whose surface cell builds its OWN API object of eight keys and asserts `Object.keys(api).length === 8` over that literal rather than over the module namespace | **the RED SET** | the cell can pass with a NINTH named export present, because it counts a hand-built object; the declared *"the entry's named exports are exactly the verbs … and NOTHING ELSE"* is then unmeasured at the one site it names, and the minimal repair is to count the imported namespace's keys. **⟶ AND THIS ROW'S OWN FIGURE IS SUPERSEDED AND IS READ THROUGH AT THIS ROW'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the row stands BYTE-FOR-BYTE above and THIS sentence is its mark): *"the module namespace's `8` verbs"* IS THE `A122` PASS'S READING, the operative figure being ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of that date — AND THE FINDING'S OWN FORCE IS UNAFFECTED BY THE FIGURE, a drive counting a HAND-BUILT object of any arity still measuring nothing of the imported namespace; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory** |
| **29** | `implementation-plan.md §2`'s `Q3` cell and `§1`'s scope row — `bindings/js/**`'s own tests, manifest and sources, *"the build configuration for the sibling and the package (`build.rs`, any `scripts/**`)"* — against the tree, which carries no `build.rs`, no `scripts/**`, and no documented home for `bindings/js/.gitignore`, the addon's `build/Release/` placement or the `optionalDependencies` wiring | **the CONTRACT**, in `implementation-plan.md`'s dated reconciliation (a NAMED GAP, not a repair this pass may take) | the plan's declared edit scope is not contradicted by the tree, because a non-`build.rs` FFI facade is inside `src/**`; but the `.gitignore` file and the `build/Release/` load path are build-surface files no cell of the plan's own scope names, so the scope row is incomplete rather than wrong |
| **30** | the index region's closure clause — *"`{files present in docs/specs/storeroom-js/} − {contract.md}` = `6` (`crossing.md`, `surface.md`, `package.md`, `acceptance.md`, `parameter-semantics.md`, `implementation-plan.md`)"*, *"so the predicate reads `6 = 6` and this unit's state is `CLOSED`"* — against the file set itself, which holds ONE MORE part file than the clause enumerates: `test-cases.md` is AUTHORED and PRESENT (`§0.1` item 10's own last bullet says so), so the file set minus `contract.md` is `7` files | **the CONTRACT** — **DISPOSED OF IN THIS PASS: the operative predicate is the PART-ENTRY count, and it HOLDS at `6 = 6`; the re-statement of the right side's own terms is the named repair of a later bounded amendment** | the predicate's LEFT side is `{part-map PART entries}` = the map's `7` rows minus the contract-document row = `6`, and the RIGHT side is the files the map declares as PARTS — the `5` carrier parts plus `implementation-plan` = `6` — so `6 = 6` ✓ **and the file set carries `7` files beside `contract.md` because `test-cases`, a `view`, is a PART entry as well, which the clause's own parenthesis omitted while listing only the six; the STATE is `CLOSED` on the corrected terms and NOT on the raw file count** |

**3. THE `§4.1` NUMBERING DISPOSITION, NAMED BECAUSE A PRIOR PASS REPORTED IT AND LEFT IT OPEN.** **(i) IT IS A
DEFECT — a numbering defect in the HOME and not in the part.** **`acceptance.md §4.1` prints its items `1`–`5`
with the inserted clauses `6`–`9` BESIDE them, and its own AMENDED clause STATES that the as-filed `4` and `5`
keep their numbers and that `6`–`9` are pure insertions placed between item `3` and item `4`.** **The
contract document's `§4`, which is the SAME text's home (`§4`'s authority note declares `acceptance.md` a
relocation of this document's `§4` WHOLE), prints `1`, then `4`, then `5` — items `2` and `3` are ABSENT from
the home and `4`, `5` are printed as if contiguous.** **(ii) SO THE RENUMBERING WAS TAKEN IN THE HOME AND THE
DISCLOSURE WAS WRITTEN IN THE PART, and the two homes of one relocated span therefore disagree about their
own numbering** — **which contradicts, and only for `§4.1`, the relocation rule the part's own header states.**
**(iii) `acceptance.md` is NOT at fault and NO byte of its numbering moves.** **(iv) THE DISPOSITION IS
TAKEN HERE: the disclosure is landed INSIDE `acceptance.md` at `§4.1`'s own AMENDED clause, so the part
states the two homes' numbering in one place; and the NAMED REPAIR OF A LATER BOUNDED PASS is the
renumbering of the contract document's `§4.1` item list to its own declared `1`–`9` — item `1`, the as-filed
`2` and `3` (which the home must RESTORE or the part must withdraw, because the home cannot print a
contiguous `1`–`9` while two of them are absent), the as-filed `4` and `5` at their own places, and the
insertions `6`–`9` where the part places them — with a dated disclosure beside the renumbered list so `git
diff` still recovers every pre-pass byte.** **A reader of TODAY'S bytes reads the two lists through this
item** (`[A1 | ordering claim]`).

**4. WHAT THIS SWEEP DOES NOT DO.** **It writes only inside `docs/specs/storeroom-js/**`; it writes NO byte
under `bindings/js/**` (the code is `role_implementer`'s and the tests are `role_test_writer`'s), none under
`archive/**`, none in any tracker and none under `../Provident-Electron/**`.** **It puts no question to the
architect: every silence it closes is a priced, reversible `DECLARED-DEFAULT` whose reversal point is a
bounded amendment of this directory, and NO ruling and NO `DD` row is re-decided by it.** **The register is
`8` rows with cap `≤ 8` (`§5.0`), `0` of its rows is added, dropped, renamed or re-spelled by this pass, and
every row remains FAILABLE because every failure list above stands unmoved** — **and the rule this sentence
obeys is STATED HERE RATHER THAN CITED, because the spec that carries it is not at a path this repository
carries: a sweep RECORDS and never widens the `≤ 8` register, and a row is added to it by no pass's own
measurement** (`[A1 | requirement]`).

**⟶ AND THE PASS AFTER THE SWEEP — THE BOUNDED DECLARATION PASS OF 2026-10-11 (`role_spec_writer`), ON THE
ARCHITECT'S RULINGS `A76`/`A77` — RECORDS ITS OWN EFFECT HERE, IN THE SWEEP'S OWN FORM.** `RCA-8(d)`
ANNOTATE-BESIDE: **every clause of the sweep above stands byte-for-byte; THIS clause is a PURE INSERTION, it
is a RECORD and not a ruling, and it re-decides nothing.**

1. **WHAT IT DECLARES, AND WHERE EACH DECLARATION STANDS.** **The validation order — the class decision
   first, on the value as it is, the shape test second, and ADMIT or REFUSE third, with the class decision
   never deferred and never revisited after a coercion — is `docs/specs/storeroom-js/crossing.md §1.7`,
   whose four negative examples are gate 4's `JS-6` · `JS-1` · `JS-2` · `JS-5`.** **The no-repair prohibition
   is `docs/specs/storeroom-js/crossing.md §1.8`.** **What *"verbose"* means — the failing target rendered as
   the store's generator renders it, plus the reason (the class that failed, and the position where the
   contract declares one), ALL INSIDE the single declared failure form, with a status drawn from the store's
   closed set and no package-minted code — is `docs/specs/storeroom-js/surface.md §2.5` item 6, whose clause
   (g) reconciles the registration site's `TypeError` to that form and to that set.** **The id-matching model
   — the store passes an ID back when a listener is triggered, the ID is the value REGISTRATION returned, the
   JS side matches that identity to the function it was registered with, and an ID the package holds no
   function for fires NOTHING as an ASSERTABLE OBSERVABLE — is `docs/specs/storeroom-js/surface.md §2.4` item
   6, with the invocation's one argument at `docs/specs/storeroom-js/surface.md §2.7` item 5, the producer and
   the arms at `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s dated clause, and the id/address
   separation at `docs/specs/storeroom-js/parameter-semantics.md §2.15`'s dated clause.** **The ceiling row's
   ARM is `docs/specs/storeroom-js/crossing.md §1.4` item 5's dated clause (gate 4's `JS-8`).** **The
   `S-WITHDRAW` cell's re-derivation is `§5.5`'s dated clause.** **The licence's fourth site and the matrix's
   concrete artefact names are `docs/specs/storeroom-js/package.md §3.4`'s and `§3.2`'s dated clauses (gate
   4's `JS-20`).**
2. **WHAT IT DOES NOT MOVE, IN THE SWEEP'S OWN TERMS.** **It writes only inside `docs/specs/storeroom-js/**`;
   it writes NO byte under `bindings/js/**` (the code is `role_implementer`'s and the tests are
   `role_test_writer`'s), none under `archive/**`, none in any tracker and none under
   `../Provident-Electron/**`.** **It puts no question to the architect: every silence it closes is a priced,
   reversible `DECLARED-DEFAULT` whose reversal point is a bounded amendment of this directory, and NO ruling
   and NO `DD` row is re-decided by it.** **The register is `8` rows with cap `≤ 8` (`§5.0`), NO row is
   added, dropped or renamed by this pass, and every row remains FAILABLE because every failure list above
   stands unmoved — while ONE strategy cell's printed subject is RE-DERIVED at `§5.5`, which is the
   re-derivation gate 4's audit required and NOT a re-spelling of the row.** **The `derivation:` clause stays
   SINGLE (this document's opening clause), the closure predicate reads `6 = 6` with the file set unmoved,
   and `§0.2`'s `47` rows, `§5.0`'s `8`, `§6`'s `18` and `§1.6`'s `56` all stand as printed.**
   (`[A1 | requirement]`).

   **⟶ AND ONE SENTENCE OF THIS ITEM IS RE-READ, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
   (`role_spec_writer`), SO THE CELL IT NAMES IS NOT READ AS UNMOVED.** `RCA-8(d)` ANNOTATE-BESIDE: **every
   sentence above stands byte-for-byte and is read THROUGH this clause; THIS clause is a PURE INSERTION — it
   adds no row, moves no count and re-decides no rule.** **THE SENTENCE, RE-EMITTED VERBATIM SO `git diff`
   RECOVERS IT:** *"while ONE strategy cell's printed subject is RE-DERIVED at `§5.5`, which is the
   re-derivation gate 4's audit required and NOT a re-spelling of the row."* **THE RE-DERIVATION STOOD AND
   STANDS; WHAT HAS NOW ALSO HAPPENED IS THAT THE ROW'S OWN LINE IS RE-SPELLED AT ITS OWN `§`: `§5.5`'s dated
   clause of this pass prints the `S-WITHDRAW` line's OPERATIVE SUBJECT — the two arms — beside the as-filed
   sentence re-emitted verbatim, so a reader of the row's own list and a reader of its dated clause now read
   the SAME subject.** **`§5.5`'s own `S-WITHDRAW` cell, named at item 1 above as *"the `S-WITHDRAW` cell's
   re-derivation is `§5.5`'s dated clause"*, is therefore read THROUGH that clause and not through this
   sentence.** **THE `derivation:` CLAUSE STAYS SINGLE: this clause carries an authority tag and no
   `derivation:` clause** (`[A1 docs/specs/storeroom-js-proposal.md §9.2 · A57 · A58; A3
   docs/specs/storeroom-js/contract.md §5.5's dated clause of 2026-10-11 — the re-spelled subject's home |
   state or fail-state declaration]`).

**⟶ AND THE PASS THAT CLOSED SEVEN OF THE IMPLEMENTER'S CONTRACT FINDINGS RECORDS ITS OWN EFFECT HERE, IN THIS
RECORD'S OWN FORM, SO NO ROW ABOVE IS READ AS A STANDING CONTRADICTION.** `RCA-8(d)` ANNOTATE-BESIDE: **every
row of the sweep above stands byte-for-byte; THIS clause is a PURE INSERTION and it is a RECORD, not a
ruling — it re-decides no rule and widens no register.**

1. **ITEM 1'S ROW *"the registration site's declared answers — `register` throws a real JS `TypeError` …"* IS
   FALSE FROM THIS DATE, AND IT IS THE ONE CELL OF THAT ITEM THIS PASS'S OWN READING MOVES:** the operative
   reading is `docs/specs/storeroom-js/surface.md §2.5` item 5's clause (g) — the single `{status, message}`
   with the store's own `AddressMalformed` — which is also what this pass's dated clause at item 6 (f) reads
   that model's *"does not widen"* sentence through.
2. **ITEM 2'S ROW `7` — *"which measures its ceiling and then returns `StoreValue::NonPlainCollection`"* — IS
   FALSE OF THE BUILD AS IT NOW STANDS AND OF THE CONTRACT'S OWNER READING:** **the ceiling's arm and the class
   it carries at the bound are declared at `docs/specs/storeroom-js/crossing.md §1.4` item 5's dated clause of
   2026-10-11, where the class is the store's own outside class `Cyclic` and the property's two arms are split
   at depth `65` and `66`** (`docs/specs/storeroom-js/crossing.md §1.4` item 5's dated clause; `DD-10`).
3. **AND THE ROWS OF ITEM 2 WHOSE BUILD-SIDE MEASUREMENT THE SAME LANDED REWRITE HAS MOVED ARE RECORDED HERE
   SO THEY ARE NOT READ AS STANDING FINDINGS, THOUGH NO FINDING OF THIS PASS TOUCHES THEM: ROW `8`** (the
   boundary's prototype test is now the STRUCTURAL, REALM-AGNOSTIC one, whose ARRAY-arm spelling is
   `docs/specs/storeroom-js/crossing.md §1.7` (b) 3's dated clause; the `isPlainObject` name the row prints no
   longer exists), **ROW `10`** (the `fail()` `Error` branch and the registration site's minted `TypeError` are
   both GONE: `fail()` throws the declared two-member form for every refusal, the registration site answers the
   core's own `AddressMalformed`, and the only minted status left is the addon's unknown-verb arm, which no
   verb name the package spells can reach), **ROW `12`** (the shipped `unlisten` no longer removes the registry
   entry, so the declared asymmetry of rule 4 holds in the build), **and ROW `14`** (the shipped `deliver`
   passes the triggering address as the invocation's ONE argument, per `PAR-JS-12`'s dated clause).

   **⟶ `RCA-8(g)` ONE-LINE POINTER, AUTHORED 2026-10-16: ROW `10`'S CLAUSE *"`fail()` throws the declared two-member form for every refusal"* IS SUPERSEDED AS AN ARITY BY THE ARCHITECT'S RULING *"Override the failure form limit"*, read with his earlier ruling *"Bubble the message log to the client on failure, override any clauses that forbid this"*; `fail()` throws the THREE-member form `{status, message, log}` — the two members read off the core's `Refusal` record and `log` attached beside them (`bindings/js/index.mjs:457`–`:463`) — whose ONE HOME is `docs/specs/storeroom-js/surface.md §2.5`'s clause of 2026-10-16. THIS ROW'S OWN TWO CLAIMS STAND WHOLE AND UNMOVED: the `fail()` `Error` branch is gone, and the registration site answers the core's own `AddressMalformed`.**
4. **NO ROW IS WITHDRAWN, NO ROW IS ADDED, NO ROW IS RENUMBERED AND NO OTHER ROW'S MEASUREMENT IS RE-DECIDED
   BY THIS CLAUSE** — **and the register stays at its `8` rows with every row failable** (`§5.0`).
   (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` · `A77` — the rulings the landed rewrite implements;
   A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (g) and §2.4 item 6 (f)'s dated clause; A3
   docs/specs/storeroom-js/crossing.md §1.4 item 5's and §1.7 (b) 3's dated clauses; `DD-10` | cross-reference]`).

---

## §6. The parameter-semantics index — every declared JS parameter and where its row lives

**One row per declared JS parameter, carrying its kind, its unit, its domain, the values outside it, the
declared answer for EACH outside value, its supplier, its evaluator and its observable.** **The rows are
`PAR-JS-1`…`PAR-JS-19` and they live at `docs/specs/storeroom-js/parameter-semantics.md` `§2`** — **⟶ RE-SPELLED 2026-10-16 AT ITS FIRST FIGURE, AND THAT RE-SPELLING'S OWN FIGURE WITHDRAWN AS LIVE THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-21` rows are the gate-2 close-out pass's reading, the `19` above is the `A116` pass's, `PAR-JS-20` is the write's FOURTH optional argument `commit` (`§2.20`) and `PAR-JS-21` the construction's fourth `cfg` key `constraints` (`§2.21`); THE OPERATIVE ROWS ARE `PAR-JS-1`…`PAR-JS-25` — `23 + 2 = 25` ✓ — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at this region's correction clause below, so this sentence complies with that clause's own home discipline —** **this
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
| **`PAR-JS-12`** | **`listener`** — the caller's function, held by the package's registry, **together with the `handle` its registration site takes as its FIRST argument (the domain of `PAR-JS-8`)** | `callback` | `§2.4`, **`§2.4` item 5 (the registration site's declared spelling, 2026-10-11)**, `§2.7` | `parameter-semantics.md` `§2.12` |
| **`PAR-JS-13`** | **the returned `op`** — the `JournalOp` the write returned, in its JS spelling | `return-field` | `§1.3`, `§2.6`, `§2.8` | `parameter-semantics.md` `§2.13` |
| **`PAR-JS-14`** | **the returned `watched`** — the watched ADDRESSES | `return-field` | `§1.3`, `§2.2` | `parameter-semantics.md` `§2.14` |
| **`PAR-JS-15`** | **the returned `triggered`** — the triggered handles | `return-field` | `§2.7`, `§1.3` | `parameter-semantics.md` `§2.15` |
| **`PAR-JS-16`** | **the returned `tiers`** on the delete receipt | `return-field` | `§1.3` | `parameter-semantics.md` `§2.16` |
| **`PAR-JS-17`** | **the thrown `{status, message, log}`** — the failure channel's members; **⟶ READ AT ITS FIRST FIGURE FROM 2026-10-16: the `two` this cell printed is superseded as an ARITY by the architect's ruling *"Override the failure form limit"*, and the operative form is three members, `{status, message, log}`, whose ONE home is `surface.md §2.5`'s clause of that date; the ROW'S SUBJECT — `PAR-JS-17`'s `status` and `message` members and their provenance — is UNMOVED, and the third member has its own row, `PAR-JS-26` below** | `error-code` | `§2.5`; **`surface.md §2.5`'s clause of 2026-10-16, items 1–2** | `parameter-semantics.md` `§2.17` |
| **`PAR-JS-18`** | **the constraint/repair pattern's own carrier** — the `write` → `rollback` pair, declared as a USAGE PATTERN and NOT as a parameter | `vocabulary-token` | `§2.6` | `parameter-semantics.md` `§2.18` |
| **`PAR-JS-19`** | **`settle(record)`** — **the ORDERING SEAM**: the one member the kernel calls and the entry implements, at the two instants of a kernel-driven write **⟶ AND THE MEMBER THIS ROW'S SUBJECT NAMES IS REMOVED FROM THE DECLARED SURFACE, 2026-10-18: the row stands as the PROVENANCE RECORD of a parameter that WAS, and its disposition is declared at `parameter-semantics.md §2.19`'s clause of that date, whose own head carries the architect's three rulings of the day** (`role_spec_writer`; `RCA-8(g)`: the row stands BYTE-FOR-BYTE and THIS limb is its mark at itself; `docs/specs/storeroom-js/surface.md §2.4` item 9's `REMOVED-WHOLE` pointer and item 9 (f)'s clause, `13 → 12`) | `seam` | **`surface.md §2.4` item 9**, minted 2026-10-15 on `A116` | `parameter-semantics.md` `§2.19` |
| **`PAR-JS-20`** | **`commit` on `write`** — the FIFTH argument, OPTIONAL, declared LAST: the record identity the write joins, and the key the terminal arm's own `file`-tier save reads (`surface.md §2.11` clause 2) | `parameter` | **`surface.md §2.2`**'s signature block and its dated clause of 2026-10-15, minted by the `RCA-9` file-tier-save pass | `parameter-semantics.md` `§2.20` |
| **`PAR-JS-21`** | **`cfg.constraints`** — the construction's FOURTH declared key, OPTIONAL: the store's constraint list, one element per `{ address, id }` pair, validated at create and at load | `parameter` | **`surface.md §2.1`**'s `cfg` block and its dated clause of 2026-10-15, minted by the `RCA-9` file-tier-save pass | `parameter-semantics.md` `§2.21` |

| **`PAR-JS-22`** | **`constraint`** — the constraint FUNCTION, the THIRD argument of `addConstraint` · `constraintOn` · `constraintOff`: **the answer to the red set's gap — an added constraint's function comes from the ADD route's own argument** | `callback` | **`surface.md §2.12`** items 2 (a)–(b) and 3, re-derived 2026-10-16 on `A126` | `parameter-semantics.md` `§2.22` |
| **`PAR-JS-23`** | **`instance`** — the object `storeCreate` returned, the FIRST argument of each of the three surface functions | `parameter` (its subject is `PAR-JS-1`'s product, declared here as a POSITION at three new call sites) | **`surface.md §2.12`** items 2 (a), 3 and 4, this date | `parameter-semantics.md` `§2.23` |
| **`PAR-JS-24`** | **`pair`** on the three surface functions — the constraint element's KEY, `{ address, id }`, which SETTLES `PAR-JS-21`'s *"one element per `{ address, id }` pair"*: **the pair is the KEY and the element carries the constraint FUNCTION** | `parameter` | **`surface.md §2.12`** items 2 (a) and 3, this date | `parameter-semantics.md` `§2.24` |
| **`PAR-JS-25`** | **the returned constraint identity** — the opaque value `addConstraint` returns, and the identity the kernel's registry holds the element under; **on the overwrite the identity is NOT re-minted** | `return-field` (its construction-side twin is `PAR-JS-21`'s pair) | **`surface.md §2.12`** item 3, this date | `parameter-semantics.md` `§2.25` |
| **`PAR-JS-26`** | **`log`** — the THIRD member of the thrown failure form: the failing attempt's own message log, CARRIED VERBATIM as the kernel's `LogEntry[]`; **authored 2026-10-16 with its `§2.26` home on the architect's ruling *"Bubble the message log to the client on failure, override any clauses that forbid this"*** | `return-field` | **`surface.md §2.5`**'s clause of 2026-10-16 (items 3 and 4) — the crossing form's ONE home | `parameter-semantics.md` `§2.26` |

**⟶ AND THE FOUR ROWS ABOVE ARE RE-DERIVED AND AUTHORED 2026-10-16 BY THE `A126` PASS (`role_spec_writer`; `A126` `ACTIVE`), WHICH MOVES THIS SECTION'S FIGURE ONCE MORE AND RENUMBERS NO ROW THAT STANDS: `PAR-JS-22` and `PAR-JS-23` keep their IDs and their `§`-homes while their SUBJECTS are re-derived (`PAR-JS-23`'s earlier subject, the constraint identity as a `return-field`, standing at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §3`; `PAR-JS-22`'s earlier subject, the `operation` position, at `§4`), and `PAR-JS-24`/`PAR-JS-25` take the two ids next free with their homes `§2.24`/`§2.25` beside them.** **THE ARITHMETIC, PRINTED WITH ITS TERMS AND CLOSED: `23 + 3 = 26` ✓, so THIS section's figure and `parameter-semantics.md §1`'s are ONE from this date, and the three added terms are the three functions' own new positions — the function, the instance and the pair — with the identity re-declared.** **THE CAP: the set is UNCAPPED, both here and there; the `≤ 8` figure belongs to the typed register and is PER UNIT** (**⟶ AND THE `23 + 3 = 26` SUM THIS CLAUSE PRINTS CARRIES NO OPERATIVE LABEL FROM 2026-10-16: it is the `A126` pass's reading and is READ THROUGH `parameter-semantics.md §1`'s count-correction clause of that date, the ONE home of the count; the correction itself is landed by the clause that follows this arithmetic below, and it names the operative figure WITH ITS SEARCHED SET**) (`[A2 docs/decisions.md` · `A126` · `A123`; A3 docs/specs/storeroom-js/surface.md §2.12 items 1–5; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date | numeric or census claim]`).

**ARITHMETIC, PRINTED WITH ITS TERMS, RE-DERIVED 2026-10-15 — AND RE-DERIVED ONCE MORE THE SAME DATE BY THE GATE-2 CONSISTENCY CLOSE-OUT PASS, WHICH MINTS THE TWENTY-FIRST ROW — ⟶ AND RE-DERIVED A THIRD TIME, 2026-10-16, BY THE `A122`/`A123` PASS (`role_spec_writer`), WHICH MINTS THE TWENTY-SECOND AND TWENTY-THIRD ROWS, SO THAT THIS SECTION'S FIGURE AND `parameter-semantics.md §1`'s ARE ONE: the parameter-semantics set is `23` rows (`PAR-JS-1`…`PAR-JS-23`), and the addition is `21 + 1 + 1 = 23` ✓ — `PAR-JS-22` the post-creation constraint route's own parameter (`§2.22`, minted on `A123`), `PAR-JS-23` the constraint identity (`§2.23`), and neither row renumbers a row that stands.** **THE ORIGINAL TERMS BELOW STAND AS THE `21`-FIGURE'S OWN READING AND ARE UNMOVED: the parameter-semantics set is `21` rows
(`PAR-JS-1`…`PAR-JS-21`) — `15` are parameters or returned fields this unit declares the JS surface as
carrying (`PAR-JS-1`…`PAR-JS-11` and `PAR-JS-13`…`PAR-JS-16`) + `1` callback (`PAR-JS-12`) + `1` error-code
carrier (`PAR-JS-17`) + `1` declared NON-parameter, the constraint pattern (`PAR-JS-18`) + `1` seam
(`PAR-JS-19`) + `1` parameter (`PAR-JS-20`, the write's FOURTH optional argument `commit?`) + `1` parameter
(`PAR-JS-21`, the construction's fourth `cfg` key `constraints`) — so
`15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓, and the addition is `20 + 1 = 21` against the figure this line
printed before.** **Every parameter the JS surface declares has a row, and no parameter outside this list
exists** (`[A3 docs/specs/storeroom-js/parameter-semantics.md §2 — the rows themselves, each printed with
its own cells | numeric or census claim]`). **AND THE PARAMETER ROWS ARE UNCAPPED AND ARE NOT THE
REGISTER'S ROWS** — **the typed `P-*` register is a separate surface whose cap is `≤ 8` and which holds at
`8 ≤ 8` (`§5`), while the `PAR-JS-n` rows are provenance rows and no count in this document is a budget for
them** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — no per-part reading of the cap |
requirement]`).

**⟶ AND THIS SECTION'S OWN FIGURE IS CORRECTED 2026-10-16 BY THE GATE-2 SIXTH REVIEWER-LOOP PASS (`role_spec_writer`; the correction's ONE home for the count is `parameter-semantics.md §1`'s count-correction clause of that date, and this clause is where this `§6` region READS it and prints it with its searched set).** **THE SUPERSEDED FIGURES ARE THIS REGION'S OWN AND THEY ARE STATED, NOT WITHDRAWN FROM PRINT: *"the parameter-semantics set is `23` rows (`PAR-JS-1`…`PAR-JS-23`)"*, *"`ARITHMETIC, PRINTED WITH ITS TERMS … `23 + 3 = 26` ✓"*, *"THIS section's figure and `parameter-semantics.md §1`'s are ONE"* and *"`21 + 1 + 1 = 23` ✓"* stand BYTE-FOR-BYTE where they stand AND CARRY NO OPERATIVE LABEL FROM THIS DATE.**
**THE OPERATIVE FIGURE, RE-DERIVED AT THIS DATE, PRINTED WITH ITS SEARCHED SET BESIDE IT: THE `PAR-JS` SET IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS — AND THE ARITHMETIC IS `23 + 2 = 25` ✓, the `23` being the `A122`/`A123` range and the `+2` the two rows `A126` ADDS BY A FRESH ID (`PAR-JS-24`, the `pair`, at `§2.24`, and `PAR-JS-25`, the returned constraint identity, at `§2.25`), while `PAR-JS-22` and `PAR-JS-23` are RE-DERIVED IN PLACE and add no id.** **AND THE SEARCHED SET, PRINTED RATHER THAN IMPLIED — THE TWO READINGS THAT CLOSE AT `25`:** **THE SET SEARCHED = THIS `§6` REGION'S OWN INDEX ROWS BELOW, `PAR-JS-1`…`PAR-JS-25`, ONE ROW EACH WITH ITS `§`-HOME AT `parameter-semantics.md §2.1`–`§2.25`; THE ROWS FOUND = `25`, and NO `PAR-JS-26` ROW AND NO `§2.26` HEADING EXISTS AT THAT PART** (`parameter-semantics.md §1`'s index table).
**⟶ AND THIS FIGURE AND ITS SEARCHED SET ARE THEMSELVES SUPERSEDED THE SAME DATE, AND ARE READ THROUGH THIS CLAUSE RATHER THAN LEFT STANDING (`role_spec_writer`; `RCA-8(g)`: the sentence above stands BYTE-FOR-BYTE and THIS clause is its mark at itself — a figure may not be listed as read-through and stand unmarked at it; the architect's ruling, verbatim: *"Bubble the message log to the client on failure, override any clauses that forbid this."*).** **THE OPERATIVE FIGURES FROM THIS DATE: THE RANGE IS `PAR-JS-1`…`PAR-JS-26` AND THE ARITHMETIC IS `23 + 3 = 26` ✓ — the `23` the `A122`/`A123` range and the `+3` the three rows added over it: `PAR-JS-24` (the `pair`), `PAR-JS-25` (the returned constraint identity) and `PAR-JS-26` (`log`, the thrown form's third member).** **THE SEARCHED SET, RE-PRINTED WITH THIS FIGURE AND NOT INFERRED FROM THE ONE ABOVE: THE SETS SEARCHED ARE **TWO** — this `§6` region's own index rows AND `parameter-semantics.md §1`'s index table — and THE ROWS FOUND ARE `26` IN EACH, `PAR-JS-1`…`PAR-JS-26`, one row each with its `§`-home at `parameter-semantics.md §2.1`–`§2.26`; and the `§2.26` HEADING EXISTS at that part, carrying `PAR-JS-26` (`parameter-semantics.md §2.26`, `:1591`–`:1628`).** **THE ARITHMETIC'S OWN CHECK, PRINTED: `23 + 3 = 26` ✓ and `26 = 26` across the two sets ✓.** **AND THE TWO READINGS THAT DO NOT CLOSE ARE NAMED SO NEITHER IS TAKEN: the `25` above is the BUBBLE PASS'S reading, written before `PAR-JS-26` existed and superseded by this clause; and the `16`/`15`-term `kind` cross-tab printed below is that same pass's second reading and is UNMOVED by this clause — it neither adds nor subtracts a term for `log`, whose `kind` is `return-field` and whose place in that cross-tab is therefore the `+ 4` return-field term's, now `+ 5`.** **NO ROW IS MOVED, RENUMBERED OR RE-KINDED BY THIS CORRECTION: `PAR-JS-26` is APPENDED at this region's own table, no `§`-home moves and the set stays UNCAPPED** (`parameter-semantics.md §2.26`; `docs/specs/storeroom-js/surface.md §2.5`'s clause of 2026-10-16; `parameter-semantics.md §1`'s index row for `PAR-JS-26` | numeric or census claim]`). **THE SECOND READING, OVER THE SAME SEARCHED SET — A CROSS-TAB THAT DOES NOT ADD UP TO THE SET, PRINTED SO ITS OWN LIMIT IS VISIBLE AND NOT LEFT TO IMPLY THAT BOTH READINGS CLOSE AT ONE FIGURE:** **`16` rows whose `kind` cell reads `parameter` (`PAR-JS-1`…`PAR-JS-11` is `11`, plus `PAR-JS-13`, `PAR-JS-20`, `PAR-JS-21`, `PAR-JS-24`; `11 + 1 + 1 + 1 + 1 = 15` — **AND THE `16` THIS LINE PRINTS AGAINST THAT TERM LIST IS CORRECTED HERE TO `15`, its own terms deciding**) `+ 1` row whose cell reads `VACATED` (`PAR-JS-23`) `+ 1` row whose cell reads `return-field` while its subject is ALSO the construction-side `parameter` (`PAR-JS-8`) `+ 4` rows whose cell reads `return-field` and whose subject has no construction-side twin (`PAR-JS-14`, `PAR-JS-15`, `PAR-JS-16`, `PAR-JS-25`) `+ 2` `callback` (`PAR-JS-12`, `PAR-JS-22`) `+ 1` `error-code` (`PAR-JS-17`) `+ 1` `vocabulary-token` (`PAR-JS-18`) `+ 1` `seam` (`PAR-JS-19`) `= 15 + 1 + 1 + 4 + 2 + 1 + 1 + 1 = 26` ✗ — **A READING THAT IS OVER THE SET BY ONE (`26 = 25 + 1`) AND IS THEREFORE RECORDED AS NOT CLOSING: the `27` THIS LINE ONCE PRINTED WAS THE UNCORRECTED `16` TERM PROPAGATING INTO THE SUM AND IS CORRECTED IN PLACE HERE, its own terms deciding the sum they print; and the ONE over is the DOUBLE COUNT of `PAR-JS-8`, whose id stands inside the `11` (`PAR-JS-1`…`PAR-JS-11`) AND again as the `return-field`-with-a-`parameter`-subject term; AND THE RULE BESIDE IT IS UNMOVED: the set's size is taken from the ROW COUNT `25` and NEVER from a `kind` partition's sum, `PAR-JS-8` being the row whose cell reads one `kind` while its subject carries two, and the `VACATED` row being counted for the id's place in the count and not for a class**
**THE HOME DISCIPLINE THIS SECTION NOW OBEYS, SO IT IS THE SAME ONE `§1` USES: this `§6` region carries the OPERATIVE FIGURE AND ITS SEARCHED SET AND NO SUPERSEDED FIGURE AS LIVE; `parameter-semantics.md §1`'s count-correction clause is the count's ONE home; and the superseded `PAR-JS-1`…`PAR-JS-26` bytes of the region above stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §5` as that clause names them.** **NO ROW OF THIS INDEX MOVES, NO `§`-HOME MOVES, NO ROW IS RENUMBERED AND NO ROW IS RE-KINDED BY THIS CORRECTION; the `≤ 8` cap stays the TYPED REGISTER's and PER UNIT, and this set stays UNCAPPED** (`[A2 docs/decisions.md` · `A127` · `A126` · `A123`, all 2026-10-16; A3 docs/specs/storeroom-js/parameter-semantics.md §1's index table, its `§1` count-correction clause of that date and its `§2.22`–`§2.25`; A3 docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §5 | numeric or census claim]`).

**⟶ AND THE SAME CORRECTION'S EFFECT ON THE TWO ARITHMETIC CLAUSES ABOVE IS NAMED SO A READER TAKES NO SECOND COUNT FROM THIS REGION: the clause beginning *"ARITHMETIC, PRINTED WITH ITS TERMS, RE-DERIVED 2026-10-15"* prints the `21`-figure and the `23`-figure; its `21` is that figure's own date's reading and its `23` is the `A122`/`A123` pass's, and the OPERATIVE figure from this date is the `25` printed at the correction clause above, WITH ITS SEARCHED SET. AND THE `A126` PASS'S `23 + 3 = 26` SUM INSIDE IT IS READ THROUGH `parameter-semantics.md §1`'s count-correction clause of that date AND IS NOT WITHDRAWN FROM PRINT, because the superseded bytes' home for that very sum is `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §5` and re-emitting them here would give one clause two homes** (`RCA-8(g)`; `docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of 2026-10-16).

**⟶ AND ONE RE-DERIVATION OF THIS INDEX, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS (`role_spec_writer`),
CLOSING THE RED SET'S CONTRACT FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) WITHOUT MOVING A
COUNT.** `RCA-8(d)` ANNOTATE-BESIDE: **the table above stands byte-for-byte; THIS clause is the operative
statement of what the same pass changed in it, and it is a PURE INSERTION — `18` rows before and `18` rows
after, so `§0`'s and `parameter-semantics.md §1`'s arithmetic is UNCHANGED.** **`PAR-JS-12` IS RE-DERIVED
RATHER THAN JOINED BY A NINETEENTH ROW: `§2.4` item 5 declares the registration site `register(handle,
listener)`, and that site's TWO argument positions are the function `PAR-JS-12` ALREADY names and the HANDLE
`PAR-JS-8` ALREADY names — so the registration's own parameter pair is carried by the two rows that exist
and NO new row is minted.** **The index's `PAR-JS-12` row therefore reads, from this date: *"`listener` — the
caller's function, held by the package's registry, TOGETHER WITH the `handle` its registration site takes as
its FIRST argument (the domain of `PAR-JS-8`)"*, and its `Where it is declared` cell gains `§2.4` item 5.**
**`PAR-JS-13` … `PAR-JS-18` are NOT renumbered and no row's `§`-home moves**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-15` — the registry's rules drivable; A3
docs/specs/storeroom-js/parameter-semantics.md §2.12 | numeric or census claim]`).

**⟶ AND ONE COVERAGE SENTENCE IS RE-SPELLED AND ONE PARAMETER IS DECLARED, LANDED 2026-10-11 BY THE BOUNDED
CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT FINDING `CF-4`.** `RCA-8(d)`
ANNOTATE-BESIDE: **the table above and its arithmetic stand byte-for-byte — `18` rows and `15 + 1 + 1 + 1 =
18` included — and the COVERAGE sentence above them is read THROUGH this clause; THIS clause is a PURE
INSERTION, and NO ROW IS MINTED BY IT.** **THE SENTENCE THAT IS RE-SPELLED: *"Every parameter the JS surface
declares has a row, and no parameter outside this list exists"* reads, from this date, *"EVERY PARAMETER THE
JS SURFACE DECLARES HAS A ROW, OR IS CARRIED INSIDE A ROW'S OWN SCOPE BY A DATED CLAUSE — and no parameter
outside this list exists"*.** **WHAT IT DECLARES, AND WHY NOTHING ELSE COULD MOVE WITH IT: the VERBS' `instance`
argument — the package's own instance handle, the FIRST position of `§2.2`'s five verbs and of `§2.10`'s two **UNTIL 2026-10-16, WHEN `A127`'s RECEIVER RULING DROPPED THAT POSITION AT EVERY SITE, SO NO POSITION OF ANY STORE-REACHING CALL IS AN INSTANCE AND THE RECEIVER IS THE STORE (that sentence is the as-filed one and is re-spelled here by the fourth reviewer-loop pass at its own cell; the operative statement is this document's `§2.2` clause and `docs/specs/storeroom-js/surface.md §2.1` (e) item 3)** —
had NO row, so `docs/specs/storeroom-js/parameter-semantics.md §2.1` (`PAR-JS-1`, the CONSTRUCTION's own row,
whose product the handle is) now carries its domain, its outside values and its code, `AddressMalformed`, in a
dated clause of its own — **and that clause of 2026-10-16 declares the position VACATED and not a live one, the row and its `§`-home standing unmoved** (`parameter-semantics.md §2.1`'s second dated clause). **AND WHY THAT ROUTE AND NOT A
NINETEENTH ROW, SAID BECAUSE THE CHOICE MUST BE STATED: minting `PAR-JS-19` would falsify NINE printed ranges
and counts at once — this file's index-region bullet, its part-map row for `parameter-semantics`, this `§6`
header sentence, this `§6` arithmetic, `§7.1`'s figure 10 and `§7.3`'s row 29; `parameter-semantics.md §1`'s
scope statement and its arithmetic; and `docs/specs/storeroom-js/test-cases.md` row 63 — while the precedent
for a declared position carried inside a row that already exists is this directory's own re-derivation of
`PAR-JS-12`.** **SO THE SET STAYS `18` ROWS, ITS ARITHMETIC STAYS `15 + 1 + 1 + 1 = 18` ✓, EVERY PRINTED RANGE
ABOVE STAYS TRUE, AND THE COVERAGE IS COMPLETE** — **and NO FIGURE OF THIS DIRECTORY MOVES BY THIS CLAUSE: the
ONE sentence it moves is a COVERAGE sentence, and it moves by RE-SPELLING and not by counting.**
(`[A3 docs/specs/storeroom-js/parameter-semantics.md §2.1 — the row that now carries the `instance` position;
A3 docs/specs/storeroom-js/surface.md §2.2 — the signatures that declare that position; A1
docs/specs/storeroom-js-proposal.md §17 · `A75` — the package's own instance handle factory |
cross-reference]`).

**AND THE SAME PASS'S OWN ROW-BY-ROW EFFECT ON THE INDEX, SO A READER NEEDS NO OTHER FILE:** **`PAR-JS-1` ·
`PAR-JS-2` · `PAR-JS-3` · `PAR-JS-4` — UNCHANGED, each still declared at `§2.1` and `§1.3` (`§1.3`'s dated
absent-versus-`undefined` rule is what their two-key distinction is read through).** **`PAR-JS-5` …
`PAR-JS-11` — UNCHANGED.** **`PAR-JS-12` — re-derived as above.** **`PAR-JS-13` … `PAR-JS-18` — UNCHANGED.**

**⟶ AND THE `Q1` CONTRACT AMENDMENT'S OWN EFFECT ON THIS INDEX, LANDED 2026-10-11 BY `role_spec_writer` ON THE
ARCHITECT'S RULINGS `A79`–`A81` — TWO ROWS RE-DERIVED, `18` ROWS BEFORE AND `18` AFTER.** `RCA-8(d)`
ANNOTATE-BESIDE: **the table above, its arithmetic and the two coverage/effect clauses under it stand
byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds NO row, moves NO
count, renumbers NO row and re-decides NO ruling — and `15 + 1 + 1 + 1 = 18` ✓ is UNMOVED in this index and in
`docs/specs/storeroom-js/parameter-semantics.md §1`.** **THE RULINGS, VERBATIM:** ***"Use S-1"*** · ***"`off` can
deregister"*** · ***"always validate"*** (`docs/specs/storeroom-js-convenience-proposal.md §8` · **`A79`** ·
**`A80`** · **`A81`**).

**THE TWO ROWS THE TWO NEW MEMBERS REACH, NAMED WITH THE SLOT EACH NOW CARRIES AND WITH THE ROW EACH WOULD HAVE
FALSIFIED IF A NINETEENTH HAD BEEN MINTED INSTEAD:**
1. **`PAR-JS-12` — `on`'s LISTENER SLOT.** **`on(address, listener) -> handle` puts a LISTENER at ARGUMENT
   POSITION `2` OF `2`, and this row ALREADY names the caller's function held by the package's registry; the
   slot's domain, its outside classes and the position its refusal is reported at stand at that row's own dated
   clause** (`parameter-semantics.md §2.12`). **AND THE INDEX CELL THAT MOVES IS THIS ROW'S OWN `Where it is
   declared` CELL, READ WITH `§2.4` item 7: the registration site's spelling is no longer the only place the
   function enters — `on`'s position `2` is the second, and it is the same datum.**
2. **`PAR-JS-8` — `off`'s HANDLE SLOT.** **`off(handle) -> undefined` takes the handle at ARGUMENT POSITION `1`
   OF `2`, and this row ALREADY names the handle at the construction, at `unlisten` and at `register`; the slot's
   domain, its outside classes, its two contrast arms against `unlisten`'s no-op set and the position its refusal
   is reported at stand at that row's own dated clause** (`parameter-semantics.md §2.8`).

**AND WHY THE RE-DERIVATION ROUTE AND NOT A NINETEENTH ROW, RESTATED FOR THIS INDEX BECAUSE THE CHOICE OWES ITS
REASON A SECOND TIME:** **minting `PAR-JS-19` would falsify NINE printed ranges and counts at once, exactly as
the `instance` position's carriage did — this file's index-region bullet, its part-map row for
`parameter-semantics`, this `§6` header sentence, this `§6` arithmetic, `§7.1`'s figure `10` and `§7.3`'s row
`29`; `parameter-semantics.md §1`'s scope statement and its arithmetic; and `docs/specs/storeroom-js/test-cases.md`'s
own numbered inventory — while the precedent for a declared position carried inside a row that already exists
is this directory's own re-derivations of `PAR-JS-12` and, at the construction, of `PAR-JS-1`.** **SO THE SET
STAYS `18` ROWS, EVERY PRINTED RANGE ABOVE STAYS TRUE, AND THE COVERAGE IS COMPLETE.**
**AND THE SAME PASS'S ROW-BY-ROW EFFECT ON THIS INDEX, SO A READER NEEDS NO OTHER FILE: `PAR-JS-1` ·
`PAR-JS-2` · `PAR-JS-3` · `PAR-JS-4` — UNCHANGED. `PAR-JS-5` … `PAR-JS-7`, `PAR-JS-9` … `PAR-JS-11`, `PAR-JS-13` …
`PAR-JS-16` — UNCHANGED. `PAR-JS-8` — RE-DERIVED for `off`'s handle slot. `PAR-JS-12` — RE-DERIVED for `on`'s
listener slot. `PAR-JS-17` — the refusal at the two new sites declared at its own `§`; its cells UNCHANGED.
`PAR-JS-18` — UNCHANGED.**

**⟶ AND THE FIGURE-SITES OF THIS DOCUMENT, THE TWO PARTS AND THE ACCEPTANCE LAYER THAT PRINT A `PAR-JS` SET SIZE OR A MEMBER-NAME ENUMERATION ARE RE-READ HERE, ONE SITE AT A TIME, ON `A127` — AND NOTHING IS LEFT TO A BYTE DIFF. **⟶ AND FROM 2026-10-16 THE SEARCHED SET IS PRINTED BESIDE THE COUNT, BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: THE SET SEARCHED IS THIS DIRECTORY'S NINE FILES, EACH SWEPT FOR THE FOUR PATTERNS `OPERATIVE COUNT` · `OPERATIVE FIGURE` · `OPERATIVE RANGE` · `operative count is` AND FOR THE FIGURES `21` · `23` · `26` PRINTED UNDER SUCH A LABEL; THE ROWS FOUND = THE `22` ITEMS OF THIS LIST, OF WHICH THE FIRST `16` ARE `A127`'S AND ITEMS `17`–`22` ARE ADDED BY THIS PASS BECAUSE THE FIRST `16` OMITTED THEM; AND THE THREE FILES THAT CARRY `operative` FIGURES OF OTHER FAMILIES AND NO `PAR-JS` FIGURE OF THOSE THREE ARE `crossing.md` (the carrier and `FilePathArg` figures), `implementation-plan.md` (the JS-suite, blind-set and ledger figures) and `acceptance.md`, which carries no such site at all — while `backup/**` is read as ARCHIVED BYTES whose own `operative` hits are disposed of by their archive status** (`role_spec_writer`; `docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v)` — A PATH THAT RESOLVES NOWHERE IN THIS TREE, ITS META-REPO PROVENANCE RECORDED WITH ITS STATUS AT `§0.1` item 11's amendment clause, WHERE THE 2026-10-16 PROVENANCE LINE STANDS AND IS THE SINGLE DECLARED PROVENANCE POINT FOR THIS PATH AND FOR `docs/specs/spec-authoring-discipline/contract.md`).** `RCA-8(g)`: **the `A126` reading of these same sites, ten items with its own `RCA-8(d)` spelling, `PAR-JS-1`…`PAR-JS-26` figures and `§7.1` row `PAR-JS 26`, has LEFT these bytes and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §8`; NO BYTE OF IT IS RE-EMITTED HERE and no clause of this pass cites the retired instrument.**
**THE REQUIREMENT LIST, EACH SITE BY ITS OWN WORDS AND ITS OWN `§`:**
1. **this document's index region, the `PAR-JS` bullet's range figure** — *"`PAR-JS-1`…`PAR-JS-26`"* → **`PAR-JS-1`…`PAR-JS-25`**, `23 + 2 = 25` ✓ (re-spelled in place by the re-derivation clause above this one; **READ AT THIS CELL'S OWN BYTES 2026-10-16 BY THE GATE-2 SIXTH REVIEWER-LOOP PASS: the `PAR-JS-1`…`PAR-JS-26` figure and its `23 + 3 = 26` sum ARE STILL PRINTED THERE, AND THEIR OWN `THE OPERATIVE RANGE FROM 2026-10-16 IS` LABEL IS WITHDRAWN AT THAT CELL BY A CLAUSE OF THIS DATE — the range, the count and the arithmetic being taken from `parameter-semantics.md §1`'s count-correction clause of this date, whose searched set `§6`'s correction clause of this date prints —** ✓).
2. **this document's index region, the operative-range clause** — *"THE OPERATIVE RANGE IS `PAR-JS-1`…`PAR-JS-26` — `23 + 3 = 26` ✓"* → **`PAR-JS-1`…`PAR-JS-25`**, `23 + 2 = 25` ✓ (**READ AT ITS OWN BYTES BY THE GATE-2 SIXTH REVIEWER-LOOP PASS: that `THE OPERATIVE RANGE IS` LABEL IS WITHDRAWN at that clause by a clause of this date and that clause's own operative range, count and arithmetic are read from `parameter-semantics.md §1`'s count-correction clause of this date, printed with its searched set at `§6`'s correction clause** ✓).
3. **the part map's `parameter-semantics` cell** — *"`PAR-JS-1`…`PAR-JS-26`"* → **`PAR-JS-1`…`PAR-JS-25`** ✓ **⟶ AND READ AT ITS OWN BYTES BY THIS PASS: that cell now prints the `PAR-JS-1`…`PAR-JS-25` range, the `23 + 2 = 25` ✓ sum and the searched set beside it, naming `parameter-semantics.md §1`'s count-correction clause of this date as the count's ONE home, and its superseded `PAR-JS-1`…`PAR-JS-26` figure CARRY NO OPERATIVE LABEL**.
4. **`§6`'s parameter-semantics index, its `§6` header arithmetic and `§2`'s re-derived clause** — the `26`-reading read through the operative figure **`25`**; the `A126` pass's `23` added rows and their `§`-homes are UNMOVED ✓.
5. **`§7.1`'s figure row `10` for the parameter set** — the row's `19`/`20`/`21` readings stand each at its own date's and THE THREE LIMBS THAT PRINT AN OPERATIVE LABEL ARE EACH MARKED — the `21` by the read-through clause of 2026-10-16, AND THE `19` AND THE `20` BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS'S OWN MARK OF 2026-10-16 AT THOSE TWO LIMBS, THOSE TWO HAVING STOOD UNMARKED BESIDE THE MARKED `21` UNTIL THIS PASS, and the operative figure `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, its searched set being the `§1` index table's `PAR-JS-1`…`PAR-JS-25` rows with no `PAR-JS-26` entry, is read from `parameter-semantics.md §1`'s count-correction clause of that date, printed at this `§6` correction clause; the `26`-reading stands in the archive named above ✓ (**READ AT ITS OWN BYTES 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the check-off this item carried — *"reads `PAR-JS 25` from this date"* — WAS FALSE OF THE TARGET, which printed *"THE OPERATIVE COUNT IS `21`"* with NO `25` AND NO READ-THROUGH IN THE CELL; the cell is marked now and this check-off reads what the cell says**).
6. **`§2.12`'s re-derived items 2 and 4 and this document's `§2` clause of this date** — **ONE namespace name and TWELVE own members**, with the `§2.12` items' receiver-ruling spellings and their refusal read through those items ✓ (landed by this pass, with the three claims themselves re-derived at the clause above).
7. **`§4`'s acceptance layer and `docs/specs/storeroom-js/test-cases.md`'s pointer sets** — the rows whose subjects `A127` moves have LEFT that part and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §12`, and that part's `A127` clause of this date is its operative set ✓ (landed by this pass).
8. **`docs/specs/storeroom-js/surface.md`'s `§2.1`, `§2.4` item 5 (a)/item 7/item 9 (e)/(f)/item 9 (f)'s collision block, and `§2.9` item 1** — every cell that prints a member-set, a namespace figure or a searched set is read through `docs/specs/storeroom-js/surface.md §2.9` item 1's and `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clauses of this date, AND `docs/specs/storeroom-js/surface.md §2.12` ITEM 5's COLLISION BLOCK IS IN THE INVENTORY FROM THIS DATE with its searched set re-spelled to the ONE-name namespace and the TWELVE-member product ✓ (landed by this pass). **⟶ AND THE COLLISION-BLOCK POINTER OF THIS ITEM IS QUALIFIED AT THIS DATE, 2026-10-16 BY THIS PASS (`role_spec_writer`; `RCA-8(g)` — the pointer re-spelling enumerated and checked off): the BARE *"`§2.12` ITEM 5's COLLISION BLOCK"* RESOLVES TO THIS DOCUMENT'S OWN `§2.12` — the write-path section whose own bytes carry no collision block at all — AND NOT TO THE CELL THE ROW MEANS, SO THE BLOCK IS SPELLED `docs/specs/storeroom-js/surface.md §2.12` ITEM 5, WHICH IS ITS ONE HOME; AND THE TWO `§2.4` ITEM 9 (f) CELLS THIS ITEM'S FIRST HALF REACHES ARE SPELLED WITH THEIR FILE BECAUSE `§2.4` ITEM 9 (f) EXISTS IN BOTH DOCUMENTS — the four-member sentence at `docs/specs/storeroom-js/contract.md §2.4` item 9 (f) and the collision block at `docs/specs/storeroom-js/surface.md §2.12` item 5 — SO A BARE `§2.4` ITEM 9 (f) NAMES ONE OF TWO CELLS AND IS BARRED AT EVERY POINTER OF THIS LIST. THE BLOCK IS ONE CELL DECLARING ONE SEARCHED SET OF SEVEN LIMBS, AND IT COUNTS ONCE IN THE `16`-CELL INVENTORY `docs/specs/storeroom-js/surface.md §2.12` item 5 carries.**
9. **`docs/specs/storeroom-js/parameter-semantics.md`'s `§1` scope statement, header range clause and arithmetic** — **`PAR-JS-1`…`PAR-JS-25`**, `23 + 2 = 25` ✓, with `PAR-JS-23` re-derived IN PLACE to a `VACATED` row and its displaced cells at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §13`.
10. **this document's `§2`'s dated claims clause** — re-derived above this list, carrying ONE name, TWELVE members and the inverted types duty ✓ (landed by this pass).
11. **this document's part-map `parameter-semantics` cell** — the `PAR-JS` set's range figure and its `23 + 2 = 25` ✓ sum with the searched set printed BESIDE them, its superseded `23`-rows figure carrying NO OPERATIVE LABEL ✓ (**landed by this pass at that cell; THE CELL THE FIRST TEN ITEMS OF THIS LIST OMITTED, NAMED HERE BECAUSE THE OMISSION IS HOW ITS FIGURE SURVIVED UNMARKED**).
12. **this document's `§0` index region's `Q1`-statement table row *"the `PAR-JS` set"*** — the operative range, the `23 + 2 = 25` ✓ sum and the searched set printed AT that cell, the cell's `18`/`19`/`21` readings carrying NO OPERATIVE LABEL ✓ (**landed by this pass at that cell; THE SECOND CELL THE FIRST TEN ITEMS OMITTED**).
13. **this document's `§0` index region's `PAR-JS 19`-provenance print in the seam clause's item `3`** — the `19`/`21`/`26` readings stated as their own dates' with no operative label, and the operative range, count and sum read from `parameter-semantics.md §1`'s clause of this date ✓ (**landed by this pass at that cell; the third and last omitted cell**).
14. **this document's `§2` region's clause item `3`** — *"`9` verbs, FIVE own members and `23` rows"* stated as that item's own reading with no operative label, its three figures read through the re-derivation clause of this date named in the same item, whose searched sets are printed at this `§6` clause ✓ (**landed by this pass**).
15. **this document's `§6` region's own arithmetic clause and both of its figures** — the `21`- and `23`-figures carry NO OPERATIVE LABEL, and the OPERATIVE figure `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, WITH ITS SEARCHED SET, stands at the correction clause of this date in this same region ✓ (**landed by this pass**).
16. **this document's `§6` region's clause of the `A126` pass** — its `23 + 3 = 26` ✓ sum carries no operative label and is read through `parameter-semantics.md §1`'s count-correction clause of this date ✓ (**landed by this pass**).
17. **`§7.3`'s row `29`, the parameter rows' arity** — the row's `18`/`19`/`20`/`21` readings stand each at its own date's and THE THREE LIMBS THAT PRINT AN OPERATIVE LABEL ARE EACH MARKED — the `21` by a read-through clause of 2026-10-16, AND THE `19` AND THE `20` BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS'S OWN MARK OF 2026-10-16 AT THOSE TWO LIMBS, THOSE TWO HAVING STOOD UNMARKED BESIDE THE MARKED `21` UNTIL THIS PASS, and the operative figure `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, is read from `parameter-semantics.md §1`'s count-correction clause of that date ✓ (**ADDED BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: THIS ROW IS THE ONE THE FIRST SIXTEEN ITEMS OF THIS LIST OMITTED, AND THE OMISSION IS HOW ITS FIGURE SURVIVED UNMARKED**).
18. **this document's index region's `A116`-seam clause, both of its limbs that print an operative `PAR-JS` count** — *"THE OPERATIVE COUNT IS `21` ROWS"* and *"THE OPERATIVE COUNT IS `21`"* — each WITHDRAWN AS A LABEL at its own cell by a clause of 2026-10-16, their `19`/`20`/`21` figures standing as their passes' readings, with the `§0.1` withdrawal bullet EXTENDED to both ✓ (**landed by this pass; the two cells the sixth reviewer-loop pass's bullet did not reach**).
19. **this document's index region's `A116`-dated limbs that print `PAR-JS-1`…`PAR-JS-21` as the operative range, and `§0.2`'s census clause's own `the OPERATIVE range is `PAR-JS-1`…`PAR-JS-21`` limb** — each marked AT ITS OWN CELL, its figure standing as its pass's reading, the operative `25` named there ✓ (**landed by this pass**).
20. **this document's `§10` region, every cell in it that prints a `PAR-JS` figure of `21` as operative: the consumer-fix clause's item `3`; the `A116` remand clause's items `1`–`4` (its head's *"the operative `19`"* phrasing being read through item `1`'s correction of the same date); and the `file`-tier re-derivation clause's own operative-figure sentence and its item `1`** — each WITHDRAWN AS A LABEL AT ITS OWN CELL, the `19`/`21` readings standing as their passes' readings and the operative `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, named there with its `parameter-semantics.md §1` count-correction home ✓ (**landed by this pass; the region below this list's former reach**).
21. **`docs/specs/storeroom-js/surface.md`'s SIX *"its/THE OPERATIVE count is `21`"* cells** — each marked at its own cell by a clause of 2026-10-16, its `18`/`19`/`21` figures standing as their own dates' readings and the operative `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, named there ✓.
22. **`docs/specs/storeroom-js/test-cases.md`'s row `63` and its `file`-tier clause's item `4`, and `docs/specs/storeroom-js/package.md`'s `§6.1` item `9` and the clause under it, `§6.1`'s item `2`** — the `21` limbs of each carry no operative label from 2026-10-16, the operative `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, being read from `parameter-semantics.md §1`'s count-correction clause of that date ✓.
**AND THE ONE FIGURE THAT DOES NOT MOVE, PRINTED SO THE LIST IS NOT READ AS A WIDER SWEEP: the typed register stays at its `8` rows with the cap holding (`8 ≤ 8` ✓) — the parameter-semantics set is UNCAPPED and is not the register's** (`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A123`, all 2026-10-16; A3 docs/specs/storeroom-js/surface.md §2.9 item 1's, §2.4 item 9 (f)'s, §2.1's and §2.12 items 2–5's clauses of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date; A3 docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §8 · §12 · §13; A3 docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v) | numeric or census claim]`).
**AND NOTHING ELSE OF THIS SECTION MOVES: the index's own rows, their kinds and their homes stand exactly as
printed, no `§`-number of `parameter-semantics.md` moves, and no parameter the JS surface declares is left without
a row or without its carriage inside a row's own scope** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` ·
`A80` · `A81`; A3 docs/specs/storeroom-js/parameter-semantics.md §2.8's and §2.12's dated clauses of
2026-10-11 — the two rows this clause names; A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-15` |
numeric or census claim]`).

---

## §7. The census region — the figures this unit carries, each with its site and its layer

### §7.1 The figures, and where each comes from

| # | The figure | Its SITE | Its LAYER | Its status here |
| --- | --- | --- | --- | --- |
| **1** | **the store's own suite green: `379` test functions · `379` PASS · `0` FAIL · `0` un-run, exit `0`; the typed register layer executing `11/11` strategy lines, ALL `HELD`; `cargo build` · `cargo clippy --lib` · `cargo fmt --check src/*.rs` clean** | **the store unit's own tree, as the gate-1 record reads it** (`docs/specs/storeroom-js-proposal-review.md` `§5.1` · `L-6`) | **`ENVELOPE/PURE`** | **THE OPERATIVE FIGURE, RE-STATED BY THE BOUNDED CLOSE-OUT PASS OF 2026-10-11 (`377` → `379`); QUOTED, NOT RE-MEASURED HERE — this pass holds no execution verb. `377` is the figure the gate-1 RECORD'S OWN MEASUREMENT prints and `374` the gate-1 FILING's reading: BOTH are marked HISTORICAL below, each with its tree, and `379` is the figure the store's tree prints now** (`DD-33`) |
| **2** | **the store's e2e JSON round-trip battery: `110/110`, exact match in every case but the two DECLARED normalizations** | **the store unit's own tree, per the gate-1 filing** (`docs/specs/storeroom-js-proposal.md` `§2` item 1) | **`ENVELOPE/PURE`** | **QUOTED. `103` is the FILING's earlier reading and is HISTORICAL; `110` is operative (`G-17`'s sibling, the proposal's `§9.4`)** |
| **3** | **the store's e2e listener-firing battery: `46/46`** | **the store unit's own tree, per the gate-1 filing** | **`ENVELOPE/PURE`** | **QUOTED** |
| **4** | **the store's suite at the `A69` correction pass: `373 PASS / 1 FAIL` for the refuted per-instance remedy, and `379/379` on the handed-back tree** | **the proposal's `§12` measurement, with the handed-back tree's figure re-stated by the bounded close-out pass of 2026-10-11** | **`ENVELOPE/PURE`** | **QUOTED, and it is the evidence the refusal at `§2.3` rests on. `373 PASS / 1 FAIL` is the CORRECTION PASS'S OWN reading and is HISTORICAL; the handed-back tree's reading the proposal's `§12` prints as `377/377` is HISTORICAL TOO, and the tree's own operative figure is `379/379`** (`DD-33`) |
| **5** | **the toolchain probe: Rust `1.98.0` · `cargo` offline-capable · Node `v24.20.0` · npm `12.0.2` · `pnpm` present · NO `napi` CLI on `PATH`** | **`docs/next-steps.md` `L-4`'s probe, at the gate-1 record's reading** | **`ENVELOPE/PURE` (a record reading, not this pass's measurement)** | **QUOTED. AND THE ABSENT CLI IS RESOLVED RATHER THAN BLOCKING: it is the PACKAGING front end and not the COMPILER front end, and the recommended builder path does not require it** (`DD-2`, `AR-16`) |
| **6** | **the out-of-repo blind harness at `/tmp/storeroom-blind/` — a scratch crate with a path dependency** | **out of this repository; named by the gate-1 filing** (`docs/specs/storeroom-js-proposal.md` `§2` item 5) | **out-of-repo EVIDENCE** | **PRECEDENT FOR THE SHAPE of the sibling crate's path dependency, NEVER AUTHORITY; it has no in-repo site and none is claimed** (`AR-10`, `AR-27`) |
| **7** | **this directory's closure: `6 = 6`** | **`docs/specs/storeroom-js/`'s own file set, read this pass** | **a file-set `CENSUS`** | **A claim about the FILE SET and not about the package's behaviour** (`§0.1` item 10) |
| **8** | **the crossing's own counts: `13` value rows · `8` carriers · `56` carrier-variant rows** | **`§1.2`/`§1.3` of this document, and `crossing.md §1`–`§2`** | **a table `CENSUS`** | **THIS UNIT'S OWN, re-derivable from the tables by their own first columns** (`§1.6`) |
| **9** | **the register's count: `8` rows, cap `≤ 8`** | **`§5` of this document** | **a table `CENSUS`** | **THIS UNIT'S OWN** |
| **10** | **the parameter-semantics count: `19` rows** (**RE-SPELLED 2026-10-15 BY THE REMAND OF THE `A116` DOCUMENTATION REVIEW — the filing-time figure of this cell was `18`, and the operative count is `19` — NO LONGER — A LABEL WITHDRAWN 2026-10-16 BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS, THIS LIMB'S OWN MARK: `15 + 1 + 1 + 1 + 1 = 19` ✓, the addition being `PAR-JS-19`, the ordering seam at `parameter-semantics.md §2.19`; NO OTHER CELL OF THIS ROW MOVES AND NO COUNT OF THIS TABLE MOVES**) **⟶ AND RE-SPELLED ONCE MORE 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: THE OPERATIVE COUNT IS `20` NO LONGER — A LABEL WITHDRAWN 2026-10-16 BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS, THIS LIMB'S OWN MARK — the four terms this cell prints are retained and the fifth is appended, so the algebra reads `15 + 1 + 1 + 1 + 1 + 1 = 20` ✓ and `19 + 1 = 20`, the fifth `1` being `PAR-JS-20`, the write's FOURTH optional argument `commit`, declared last, at `parameter-semantics.md §2.20`; the `19` this cell printed stands as the `A116` pass's reading and the count's ONE home is `parameter-semantics.md §1`** ⟶ AND RE-SPELLED ONCE MORE 2026-10-15 BY THE GATE-2 CONSISTENCY CLOSE-OUT PASS: THE OPERATIVE COUNT IS `21` NO LONGER — A LABEL **WITHDRAWN** 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS — the six terms this cell prints are retained and the SIXTH appends, so the algebra reads `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ and `20 + 1 = 21`, the fifth `1` being `PAR-JS-20`, the write's FOURTH optional argument `commit`, declared last, at `parameter-semantics.md §2.20`, and the sixth `PAR-JS-21`, the construction's fourth `cfg` key `constraints`, at `parameter-semantics.md §2.21`; the `19`, the `20` and the `21` this cell printed stand as the earlier passes' readings, each dated, and CARRY NO OPERATIVE LABEL FROM 2026-10-16 — AND ALL THREE OF THE LIMBS THAT PRINT AN OPERATIVE LABEL CARRY THAT MARK AT THEIR OWN POSITIONS FROM THIS DATE — THE OPERATIVE COUNT IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓, its searched set being the `§1` index table's `PAR-JS-1`…`PAR-JS-25` rows with no `PAR-JS-26` entry — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** | **`§6` of this document, and `parameter-semantics.md §2`** | **a table `CENSUS`** | **THIS UNIT'S OWN** |
| **11** | **`P-1`'s carriage census: `28` rows; `P-1`'s own enumeration as read from `docs/pending.md` names `27` ids and one row whose id is not recoverable** | **`docs/pending.md` `P-1`'s own text** | **a `CENSUS` of a tracker row** | **NON-RE-DERIVABLE IN PART — the partition table that carried the `28` does not survive in any artifact this workspace holds (`G-1`); the disposal is at `§7.3` and the finding is at `§8` item 1** |
| **12** | **the Rust leg's OWN command site, named because the as-filed form resolved the WRONG package: `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast`, taken at the REPOSITORY ROOT, the manifest named EXPLICITLY — and the acceptance consequence that a leg whose executed-cell count belongs to the store's suite is VOID** (**added 2026-10-11 by the bounded correction pass, closing the red set's CONTRACT FINDING 3; measured at `archive/gate3/storeroom-js-red-set.md` §3: `cd bindings/js && cargo test` executed `0` of this unit's `219` Rust cells and ran the store's suite instead — `exit 0`**) | **`package.md §4.2` item 4's dated clause; `acceptance.md §4.1` item 8** | **`ENVELOPE/PURE`, and the figure is a COMMAND SITE and not a measurement this pass took** | **DECLARED HERE, NOT MEASURED: this pass runs nothing, and the two figures the red set reports (`0` of `219`, and the store's own green) are QUOTED from that record** (`DD-19`, `DD-33`) |

**AND THE LAYER STATEMENT, IN ONE LINE:** **every figure above is an `ENVELOPE/PURE` or file-set figure;
the ASSEMBLED/`APP` layer for this unit is `NONE`, and no figure here may be reported as an `APP`-green**
(`§4.2`; `DD-20`).

**⟶ AND THIS TABLE'S STORE-GREEN CELLS ARE RE-STATED, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
(`role_spec_writer`): THE STORE'S ROOT SUITE IS `379` PASS · `0` FAIL.** `RCA-8(d)` ANNOTATE-BESIDE: **every
other cell of the table above stands byte-for-byte and every figure of it is unmoved; the two cells this pass
re-states carry the as-filed reading BESIDE the operative one, so `git diff` recovers `377` where it stood and
NOTHING IS DELETED.** **THE FIGURE MOVED, AND WHY, WITH ITS TERMS:** **the store's root suite is now `379`
PASS · `0` FAIL — the `+2` are the two LISTENER CELLS that
`docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e) required, and their home is
`tests/watched_addresses.rs`, whose own count moves `19` → `21`.** **SO `377` IS HISTORICAL FROM THIS DATE —
it is the figure the store's tree printed before those two cells landed — and `374` (the gate-1 FILING's
reading) and `373 PASS / 1 FAIL` (the `A69` correction pass's) both stand as they were, each with its own tree
and neither withdrawn.**

| The cell, as it stood | What it reads now, and its terms |
| --- | --- |
| **row `1`** — *"the store's own suite green: `377` test functions · `377` PASS · `0` FAIL · `0` un-run, exit `0`"*, with *"`377` is the figure the record's own measurement prints and is the OPERATIVE one"* | **`379` test functions · `379` PASS · `0` FAIL · `0` un-run, exit `0`** — the store's root suite, `cargo test --offline --no-fail-fast`, its root `Cargo.toml` byte-identical; **`377` is HISTORICAL and `374`, the filing-time reading, is HISTORICAL** |
| **row `4`** — *"`373 PASS / 1 FAIL` for the refuted per-instance remedy, and `377/377` on the handed-back tree"* | **`373 PASS / 1 FAIL` unmoved as that pass's own reading, and the handed-back tree's figure re-stated at `379/379`** — **the row's SUBJECT (the refusal the handed-back tree evidences) is unmoved, and only its trailing count is re-stated** |

**AND THE RESTATEMENT DOES NOT RE-MEASURE ANYTHING: this pass holds no execution verb, the figure is the one
the tree that carries it prints, and every other reading of this table — `110/110`, `46/46`, the toolchain
probe, the out-of-repo harness, this directory's own closure and the three table censuses — stands exactly as
printed** (`DD-31`; `DD-33`; `[A1 docs/specs/storeroom-js-proposal-review.md §1.2 · `G-17`; A3
docs/specs/storeroom-native/write-and-read.md §6.5 item 14 (d)–(e) — the two cells the `+2` are | numeric or
census claim]`).

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

**⟶ AND THE STORE-GREEN FIGURE THIS SECTION SETTLES IS RE-STATED, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT
PASS (`role_spec_writer`): THE OPERATIVE FIGURE IS `379` PASS · `0` FAIL.** `RCA-8(d)` ANNOTATE-BESIDE: **both
clauses above — the `G-17` clause and the `U26` clause — stand byte-for-byte and are read THROUGH this clause;
the `110`-versus-`103` settlement is NOT this clause's subject and is UNMOVED by it; THIS clause is a PURE
INSERTION and it re-measures nothing.** **WHAT THE `G-17` CLAUSE ABOVE SETTLES, AND WHAT MOVES INSIDE THAT
SETTLEMENT: it settled the `377` (the record's own measurement) against the `374` (the filing's reading) and
declared `377` OPERATIVE; THE TREE HAS MOVED SINCE, so `379` is operative now while BOTH `377` and `374` become
the two as-filed readings, each still named with its tree.** **THE THREE CELLS OF THIS SECTION THAT READ
`377`, EACH WITH WHAT IT NOW READS:**

| The cell | The reading it carried | What it reads now |
| --- | --- | --- |
| **this section's `G-17` clause** — *"the operative store green is `377/377` … `377` is OPERATIVE and `374` is the filing-time reading"*, with its own arithmetic *"the three cells the `A69` correction pass added (`377 − 374 = 3`)"* | **`377` OPERATIVE · `374` HISTORICAL** | **`379` OPERATIVE · `377` HISTORICAL (the pre-listener-cells tree) · `374` HISTORICAL (the filing's reading); the `377 − 374 = 3` arithmetic is that amendment's own and stands UNMOVED as history** |
| **the `G-17` reading's twin in the gate-8 clause's table** — *"`UNMOVED AND ACCURATE: `377` PASS · `0` FAIL is the store's root suite as the build prints it now"* | **`377` as the current tree's figure** | **`379` PASS · `0` FAIL, and `377` is the figure of the tree that preceded the two listener cells** |
| **the gate-8 clause's other `377`** — *"the store's root suite reads `377` PASS · `0` FAIL"* (in the row that settles the JSON battery) | **`377` as the current tree's figure** | **`379` PASS · `0` FAIL — and the row's OWN subject, the battery's `103`-versus-`110` pair, is UNMOVED** |

**AND ONE FIGURE THIS CLAUSE ADDS, BECAUSE IT IS THE ARITHMETIC THE `+2` RESTS ON: `379 = 377 + 2`, where the
two are the LISTENER CELLS `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e) required at
`tests/watched_addresses.rs`, whose own count moves `19` → `21`.** **NO OTHER FIGURE OF THIS SECTION MOVES,
AND NO `APP`-GREEN IS CLAIMED** (`DD-31`; `DD-33`; `[A1 docs/specs/storeroom-js-proposal-review.md §1.2 ·
`G-17`; A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 14 (d)–(e) | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-JS` GATE-7 PROOFREADING PASS (`role_proofreader`), CORRECTING THE
FIGURES THIS SECTION AND `§7.1`'s TABLE PRINT.** `RCA-8(d)` ANNOTATE-BESIDE: **every clause and every cell above
stands byte-for-byte — `§7.1`'s seven-row table and its `110/110`, `377`, `374` and `373/1` readings, and this
section's two `G-17`/`U26` clauses — and each is read THROUGH this clause; THIS clause is a PURE INSERTION, it
adds no table row, moves no id family and re-decides no ruling.** **THE FIGURES, EACH WITH THE TREE IT
DESCRIBES:**

| The reading that stands above | The tree it describes | The operative figure, and its source |
| --- | --- | --- |
| `§7.1` row `2`: *"the store's e2e JSON round-trip battery: `110/110`, exact match in every case but the two DECLARED normalizations"*, with *"`110` is operative and `103` is HISTORICAL"* in this section | the `A59`/`A60` re-derivation's projected battery (`104/104`, *"or `103/103` with the re-derived `-0` cell"*, `docs/specs/storeroom-listeners-proposal.md` `§21`) and the `U26` clause's two figures | **THE BATTERY AT `tests/e2e_json_round_trip.rs` IS `103` TEST FUNCTIONS**, authored from the amended contract, and the store's root suite reads **`377` PASS · `0` FAIL**: so `103` is the figure the artifact carries and `110` is the RE-DERIVATION's own projected/enlarged reading, quoted from the records that name it. **BOTH READINGS STAND, EACH WITH ITS TREE, AND NEITHER IS WITHDRAWN: `103` is the battery's cell count at its file, `110` the figure the re-derivation's clauses print.** |
| `§7.1` row `1` and this section's `G-17` clause: the store's green at `377`, `374` marked HISTORICAL, and row `4`'s `373 PASS / 1 FAIL` | the store unit's own tree, at three dates | **UNMOVED AND ACCURATE: `377` PASS · `0` FAIL is the store's root suite as the build prints it now (root `Cargo.toml` byte-identical); `374` is the LISTENER-AMENDMENT tree's reading; `373 PASS / 1 FAIL` is its `A69` correction-pass reading.** |
| — (no row prints it) | — | **AND THE FIGURES THIS DIRECTORY'S OWN TREE PRINTS, ADDED HERE BECAUSE `§7.1`'s TABLE CARRIES NONE OF THEM: `node --test bindings/js/test/*.test.mjs` — `101` tests · `101` pass · `0` fail; `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` — `223` PASS · `0` FAIL; the typed register layer — `8` rows (`5` Rust strategy lines · `3` JS) ALL `HELD`, `395` attempts on the Rust half and `107` on the JS half, `0` un-run against the `≤ 100`-per-row / `≤ 400`-total budget; `node bindings/js/greens/greens.mjs` — `236` authored · `236` executed · `236` PASS · `0` FAIL; `node bindings/js/greens/live-drive.mjs` — `72` authored · `72` PASS · `0` FAIL.** **`89` and `92` stand in `implementation-plan.md`'s own clauses as that part's HISTORICAL readings of the same JS suite.** **⟶ AND FOUR OF THE FIGURES IN THAT SENTENCE ARE SUPERSEDED AND ARE READ THROUGH THIS CLAUSE, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`: the sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): THE JS NODE SUITE IS `499` TESTS · `499` PASS · `0` FAIL (NOT `101`); `greens.mjs` IS `255` AUTHORED · `255` EXECUTED · `255` PASS · `0` FAIL over `16` scenarios (NOT `236`), read at that driver's own header; `live-drive.mjs` IS `95` AUTHORED · `95` PASS · `0` FAIL (NOT `72`), the `+23` being the cells `LIVE-13.20` and its neighbours added — **and the `91`-to-`95` movement of THIS DATE is `+4` (`LIVE-13.20` and the three cells filed with it), `91 + 4 = 95` ✓**; and the `file`-tier-save battery reads `96` cells — PASS `90` · OBSERVED `6` · FAIL `0`. THE REGISTER'S TWO ARITHMETIC FIGURES OF THAT SENTENCE STAND EXACTLY AS PRINTED AND ARE THIS PASS'S OWN SUBJECT: the ledger total is `395 + 107 = 502`, against the declared bound `≤ 502`, per-row `≤ 100` taken at the row — the `≤ 400` in that sentence being the SUPERSEDED bound of the pass that wrote it, so the `0` un-run reading is the one figure of the register the sentence still carries correctly** — ]`).

**AND THE ONE THING THIS CLAUSE DOES NOT DO: it re-measures nothing, because this pass holds no execution verb.
The figures above are read at the sites that carry them — the store's root suite, the two sibling-crate legs, the
two register halves and the two greens drivers — and the layer of every one of them is `ENVELOPE/PURE` with the
assembled/`APP` layer `NONE`** (`DD-20`, `DD-31`, `DD-33`; `[T: this section's figures, reconciled row by row with
each superseded reading quoted | CENSUS]`).

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
| 29 | **`U-40`** | **the parameter rows' arity** | **THIS UNIT** — the parameter-semantics set's `21` rows (**RE-SPELLED 2026-10-15 BY THE REMAND OF THE `A116` DOCUMENTATION REVIEW — this cell's filing-time figure was `18`; `PAR-JS-19` is the set's nineteenth row and this row's subject, arity, is unmoved**) **⟶ AND RE-SPELLED ONCE MORE 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE PASS: the set's operative count is `20` rows NO LONGER — A LABEL WITHDRAWN 2026-10-16 BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS, THIS LIMB'S OWN MARK — `15 + 1 + 1 + 1 + 1 + 1 = 20` ✓, `PAR-JS-20` being the twentieth, the write's FOURTH optional argument `commit` at `parameter-semantics.md §2.20`, whose declared write arity is `3` required with the `commit?` at its FOURTH position; the `19` this cell printed stands as the `A116` pass's reading, and THIS ROW'S SUBJECT, the parameter rows' arity, is unmoved** **⟶ AND RE-SPELLED ONCE MORE 2026-10-15 BY THE GATE-2 CONSISTENCY CLOSE-OUT PASS, WHICH CORRECTS THE `RCA-9` CONDITION SET: the set's operative count is `21` rows NO LONGER — A LABEL **WITHDRAWN** 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS — `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓, `PAR-JS-20` being the twentieth, the write's FOURTH optional argument `commit` at `parameter-semantics.md §2.20`, and `PAR-JS-21` the twenty-first, the construction's fourth `cfg` key `constraints` at `§2.21`, while THIS ROW'S SUBJECT, the parameter rows' arity, is unmoved, and the `18`, the `20` and the `21` this cell printed stand as the earlier passes' readings, each dated, and CARRY NO OPERATIVE LABEL FROM 2026-10-16, EACH OF THE THREE LIMBS THAT PRINTS ONE CARRYING THAT MARK AT ITS OWN POSITION; THIS CELL'S FIRST LIMB — the `A116` re-spelling clause, whose filing-time figure is `18` and whose own subject is `PAR-JS-19`, the set's NINETEENTH ROW — CARRIES THE SAME MARK (`RCA-8(g)` CORRECTION OF `:3401`'s identifier, 2026-10-16: the *"figure"* this limb prints is its `18`-and-`19` pair and NOT `21`, which is this whole cell's head figure; the limb named *"the `19`-figured `A116` clause"* by the round's finding stands in no part of this directory, `19` being the row's ordinal and the filing-time figure, the `RCA-9` LIMB's own print being the count `20`): THE OPERATIVE LABEL IS `19` NO LONGER — A LABEL WITHDRAWN 2026-10-16 BY THE GATE-2 EIGHTH REVIEWER-LOOP PASS, THIS LIMB'S OWN MARK ALSO; THE OPERATIVE COUNT IS `PAR-JS-1`…`PAR-JS-25` — `25` ROWS, `23 + 2 = 25` ✓ — whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** | `§6`; `parameter-semantics.md §2` |
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
| **3** | **THE STORE'S GREEN FIGURE IS STALE IN THREE PLACES.** The filing, `docs/next-steps.md`'s `N3` row and both step reports print `374/374` or `374`, while the record's own measurement and the correction pass's hand-back print `377/377` (`377 − 374 = 3`, the three cells the `A69` correction pass added) | `docs/specs/storeroom-js-proposal-review.md §1.2` · `G-17`; `docs/next-steps.md` `N3`; `docs/specs/storeroom-js-proposal.md §2` item 1 | one operative figure, with the as-filed readings named as historical | **UNMOVED AS A ROW AND RE-READ AS TO ITS FIGURE: `379` is treated as OPERATIVE BY THE BOUNDED CLOSE-OUT PASS OF 2026-10-11 and `377`, named here as operative, is HISTORICAL from that date — it is the figure the store's tree printed before the two LISTENER CELLS `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e) required landed at `tests/watched_addresses.rs` (`19` → `21`, so `379 = 377 + 2`) — while `374` and `374/374` remain HISTORICAL wherever this directory quotes the store's green; the cell's own ARITHMETIC `377 − 374 = 3` stands as that amendment's history. **A reader takes the operative figure at `§7.1`'s and `§7.2`'s dated clauses of this pass.** the tracker reconciliation belongs to the supervisor's tracker pass (`AR-20`) and is not taken here** (`DD-33`; `§7.2`) |
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

## §10. THE GATE-8 RECONCILIATION — this directory's contract and its parts against the build they describe

**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8, the
per-unit pass): EVERY CLAUSE ABOVE STANDS BYTE-FOR-BYTE, AND THIS SECTION IS THE OPERATIVE STATEMENT OF
THE CELLS THE SHIPPED BUILD HAS OUTGROWN.** `RCA-8(d)` ANNOTATE-BESIDE: **no `§` above is renumbered, no rule
is withdrawn, no `DD` row's `alt` moves, the register stays at its `8` rows, the `derivation:` clause stays
SINGLE, and this pass ADMITS NO UNIT ROW AND WRITES NO `DONE` ROW.** **THE ROWS BELOW NAME THE DIVERGENCE
SWEEP'S OWN CELLS THAT THE LANDED REWRITE HAS MOVED; the sweep's `§8`-neighbouring item 3 already records
rows `8`, `10`, `12` and `14` of its `ITEM 2` table as moved, and the rows here are the ones THAT clause
does not reach.** **Each row quotes what its cell read BEFORE, so `git diff` recovers every pre-pass byte.**

| # | The sweep's cell, as filed | What it reads now, at the build's own bytes |
| --- | --- | --- |
| **1** | **`ITEM 2` ROW `1`** — *"`bindings/js/index.mjs`, whose `Boundary` class carries the register tree, the home, the journal, the file log and all `8` verbs IN JAVASCRIPT, and which never calls the addon's `storeCreate` or its `call` dispatch"* | **THE CLASS AND THE SECOND STORE ARE GONE.** `index.mjs` declares NO `class Boundary` and carries no register tree, home, journal or file log; every verb delegates through `call(state, verb, args)` → `addon_.call`, and `src/facade.rs`'s `#[napi]` facade is the ONE authority for store state, so `A65`'s single-store discipline and the `V1` layout (`package.md §4.5` item 1 / `§4.4`) HOLD OF THE SHIPPED PACKAGE. **The `ITEM 2` row's `WHO MUST MOVE` cell — `the CODE` — is answered by the landed rewrite and owes nothing** (its subject is the implementer's `V1` rewire; `archive/gate3/storeroom-js-red-set.md` §9's header records the rewire) |
| **2** | **`§5.5`'s and `§5.8`'s dated clauses' build-side sentence** — *"`bindings/js/index.mjs`'s `wrapHandles` collapses the duplicate at the boundary today"* | **RECONCILED IN PLACE ABOVE** at both rows, each with its own dated clause: the boundary carries the store's list ELEMENT FOR ELEMENT and the per-identity dedup stands at `deliver`, so **the DIVERGENCE `surface.md §2.4`'s dated clause handed to the reconciling pass is answered — and it sits on NEITHER side, because the build now holds the DECLARED figure** |
| **3** | **`ITEM 2` ROW `13`** — *"`registerOn`, which resolves the handle through a MODULE-LEVEL `WeakMap` and accepts any token equal to one of THIS instance's home tokens, and … `addon_register`, which accepts ANY token string at the addon's own boundary"* | **THE PER-INSTANCE KEY IS THE INSTANCE'S OWN PRIVATE HANDLE, AND THE BOUNDARY NO LONGER ACCEPTS A BARE TOKEN.** `registerOn` resolves the argument through `encodeHandle(state, handle)`, whose `Opaque` arm is the only one that reaches `addon_.register(state.id, encoded)`; a bare `string`, a fabricated object, a foreign instance's value and an ABSENT argument each answer the ONE form with the store's `AddressMalformed` at the registration site (`§2.4` item 5 (d) as read through `surface.md §2.5` item 5 (g)). **So `§5.8`'s `S-NOOP` and `§2.3` item 3 (i)** — which rest on the declared per-instance identity — **are reachable and are driven** (`archive/gate3/storeroom-js-red-set.md` §10.1; `bindings/js/index.mjs`'s `registerOn`/`encodeHandle`) |
| **4** | **`ITEM 2` ROWS `2`, `3`, `4`, `5`, `6`, `16`, `17`** — the `package.md §4.5` item 2/3/4 declaration rows (`from_store_value`'s `Result` arm · the `JsValue` `14`-variant count · `JsProto`'s `3` variants · `JsHandleArg`'s pair · `JsJournalLengthArg`'s `12` rows · `JsJournalOpKind` · `TooLarge`) | **EACH IS RECONCILED AT ITS OWN HOME IN `package.md §4.5` AND IN `crossing.md §1.3` BY THE LATER BOUNDED PASSES**, whose dated clauses are the operative reads: the counts are re-derived WITH THEIR TERMS beside the as-filed figures, `§4.5` item 7's "undeclared state" FINDING is answered type by type, and `JsJournalOpKind`'s absence is declared with the string spelling the build prints. **Nothing in THIS clause re-spells one of them, and no row of the sweep is withdrawn** |
| **5** | **`ITEM 2` ROW `30`** — the closure clause's RAW-FILE reading, `6 = 7` | **UNMOVED AND ALREADY DISPOSED OF: the operative reading is the PART-ENTRY counting, `6 = 6`, and the predicate HOLDS.** This pass creates no root-level file of this directory (its own record lands under `archive/reviews/`), so the file set's figure is unmoved; the right-hand terms' re-statement remains the named repair of a later bounded amendment |
| **6** | **`§7.1`'s and `§7.3`'s figures, and `§4.1`'s numbering** | **UNMOVED.** `§4.1`'s `1` · `4` · `5` numbering stands as filed, read through `acceptance.md §4.1`'s disclosure clause and its home-side twin; `§7.1`'s figures and `§7.3`'s `28`-row map are unmoved by this pass and by the sweep |

**AND THE FIVE FIGURES THIS PASS VERIFIED AT THEIR OWN BYTES RATHER THAN TAKING THEM FROM ITS BRIEF, EACH
WITH ITS SITE AND ITS LAYER.** **This pass holds NO execution verb** (its tool wall is read/search plus doc
writes, so no `node` and no `cargo` command was run by it); **the figures below are therefore READ OFF THE
ARTIFACTS THAT CARRY THEM AND OFF THE TREE'S OWN STATIC DECLARATIONS, and the tree's own records are named as
the measurements they are.** **And the layers are stated so no cell is over-read: every one of them is an
`ENVELOPE/PURE` figure, the ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`, and NO CONSUMER APPLICATION LOADS
THIS PACKAGE ANYWHERE IN THIS REPOSITORY** (`§4.2` items 2–3; `DD-20`).

**⟶ ADDED 2026-10-16 — THE `≤ 400`-TOTAL READING THIS SECTION PRINTS IS SUPERSEDED AT THIS CELL, AND THE OPERATIVE BUDGET IS `§5.0`'S OWN DATED CLAUSE (`role_spec_writer`; `RCA-8(g)`: the cell below stands BYTE-FOR-BYTE and is read THROUGH this clause, which is its mark and moves nothing of it).** **THE CELL: *"the typed register layer — `8` rows (`5` Rust strategy lines · `3` JS) ALL `HELD`, `395` attempts on the Rust half and `107` on the JS half, `0` un-run against the `≤ 100`-per-row / `≤ 400`-total budget"*.** **THE TWO FIGURES IT PRINTS ARE THE TWO HALVES' OWN AND ARE UNMOVED — `395` RUST and `107` JS, each read at its runner's own report line — AND ITS `≤ 400`-TOTAL BUDGET IS NOT THIS LEDGER'S: `395 + 107 = 502`, so a `≤ 400` total is FALSE of the ledger as it stands and CANNOT FAIL while it is asserted per half, which is how the two runners assert it — the JS half at `bindings/js/test/register.test.mjs:816` over its own `total` alone, the Rust half at no site at all.** **THE OPERATIVE STATEMENT IS `§5.0`'S DATED BUDGET CLAUSE OF THIS DATE, whose four clauses print the two halves, the per-row ceiling `≤ 100` taken at the ROW, the ledger-wide ceiling `≤ 400` taken at ONE SITE AS `RUST_TOTAL + JS_TOTAL` and the declared bound `≤ 502 = 395 + 107` ✓ that must fail when either half exceeds its own declared figure; a reader takes the cap and its arithmetic from that clause and NOT from this cell.** **AND `§5.0`'S `8` ROWS, `5` RUST AND `3` JS, `ALL HELD` AND `0` UN-RUN READ AS THIS CELL PRINTS THEM: the row set, the verdicts and the un-run count are UNMOVED** (`§5.0`'s dated budget clause of this date; the two runners' own report lines | numeric or census claim]`).
| The figure | Which layer it covers | Where it is carried, and what this pass read |
| --- | --- | --- |
| **`101` tests · `101` PASS · `0` FAIL** (`node --test bindings/js/test/*.test.mjs`, at the repository root) | **`ENVELOPE/PURE`** — the JS leg, driven through the claimed ESM entry | **STATICALLY RE-DERIVED BY THIS PASS FROM THE FILES' OWN DECLARATIONS:** `6` files under `bindings/js/test/**`; `83` literal `test(...)` declarations **+** the `13`-member `CORPUS` loop in `round-trip.test.mjs` **+** the `7`-row `HO_ROWS` loop in `package-entry.test.mjs` = `83 + 13 + 7 = 101` ✓, with the per-file set `21` · `36` · `17` · `17` · `2` · `8` = `101` ✓. **The last two figures are the ones the plan's `92` does not carry** (see `implementation-plan.md`'s new `§3` clause). The tree's records (`archive/gate3/storeroom-js-red-set.md` §11.4, §13.4) print the same totals |
| **`236/236`** (`node bindings/js/greens/greens.mjs`, at the repository root) | **`ENVELOPE/PURE`** — the blind set, a consumer driving the claimed entry | **`bindings/js/greens/greens.mjs`'s own per-scenario header counts**: `13 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 236` ✓, over `13` scenarios. **The gate-5 record's `233`/`3` is HISTORICAL and is superseded by commit `9707ee9`; the operative run is `236/236`** (`archive/gate6/storeroom-js-live-determination.md` `§2.3`, `§3` · `LIVE-F1`) |
| **`72/72`** (`node bindings/js/greens/live-drive.mjs`, at the repository root) | **LIVE / ASSEMBLED PACKAGE** — the real artefact, a real process, real file I/O, a real caller. **`APP` LAYER: `NONE`** | **`live-drive.mjs`'s own `12` `LIVE-n` scenario blocks** (`archive/gate6/storeroom-js-live-determination.md` `§4`). **This is NOT an `APP`-green and no cell of it may be read as one** |
| **`223` PASS · `0` FAIL** (`cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast`, at the repository root) | **`ENVELOPE/PURE`** — the sibling crate's own suite, the `rlib` half driven with no Node runtime | `archive/gate3/storeroom-js-red-set.md` §11.4/§13.4: `76` (`crossing_carriers`) + `17` (`crossing_copy`) + `66` (`crossing_values`) + `2` (`register_layer`) + `62` (`surface_verbs`) = `223` ✓ |
| **`379` PASS · `0` FAIL** (`cargo test --offline --no-fail-fast`, at the ROOT) | **`ENVELOPE/PURE`** — the STORE's own suite, **QUOTED and NOT re-labelled as this unit's** | `archive/gate3/storeroom-js-red-set.md` §11.4/§13.4, with its own term-by-term arithmetic `0 + 22 + 110 + 46 + 28 + 11 + 22 + 12 + 26 + 20 + 12 + 20 + 19 + 29 + 0 = 377` ✓ **AS THAT RECORD FILED IT — the tree has since grown by `2` CELLS, so the operative arithmetic is `377 + 2 = 379`, the two being the LISTENER CELLS `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e) required at `tests/watched_addresses.rs`, whose own count moves `19` → `21`** (`DD-31`; `DD-33`) |

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THE FIVE FIGURES OF THE TABLE ABOVE, RE-READ AT THEIR OWN SITES, PLUS ONE DERIVATION OF THIS DOCUMENT'S THAT DOES NOT CLOSE.** `RCA-8(d)` ANNOTATE-BESIDE: **every clause and every cell above stands byte-for-byte — the table's five rows, its `101`, `236/236`, `72/72` and `379` readings, and the two rows the close-out pass re-stated — and each is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no row, moves no id family and re-measures nothing (this pass holds no execution verb: no `node` and no `cargo` command was run by it).**

| The reading that stands above | The tree it describes | The operative figure, and where it is carried |
| --- | --- | --- |
| **row 1: *"`101` tests · `101` PASS · `0` FAIL (`node --test bindings/js/test/*.test.mjs`)"***, with its derivation *"`83` literal `test(...)` declarations + the `13`-member `CORPUS` loop + the `7`-row `HO_ROWS` loop = `83 + 13 + 7 = 101` ✓"* | the JS unit's own close-out tree, before the convenience amendment's cells landed | **`113` tests · `113` pass · `0` fail at `node --test bindings/js/test/*.test.mjs`, at the REPOSITORY ROOT** — **the `+5` being `convenience.test.mjs`'s eighth cell and the four new generators `NG-JS-I`…`NG-JS-L` at `negative-generators.test.mjs`.** **THE DERIVATION RE-DERIVED AT THE FILES' OWN DECLARATIONS BY THIS PASS (a static count, not a run): SEVEN files under `bindings/js/test/**`, `93` literal `test(...)` declarations + the `13`-member `CORPUS` loop + the `7`-row `HO_ROWS` loop = `93 + 13 + 7 = 113` ✓, and the per-file set `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2` · `negative-generators` `12` · `convenience` `8` = `113` ✓. AND THE AS-FILED DERIVATION'S OWN ARITHMETIC DOES NOT CLOSE: `83 + 13 + 7 = 103` and not `101`, so at the tree it describes the literal count was `81` — the as-filed `83` is a stale term of that cell and both readings are named here rather than one of them re-written.** |
| **row 2: *"`236/236` (`node bindings/js/greens/greens.mjs`)"*, with its per-scenario sum `13 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 236`** | the pre-amendment blind set, re-measured at the pinned artefact | **`240` authored · `240` executed · `240` PASS · `0` FAIL over the SAME `13` scenarios, `JSG-01` reading `17` assertions** — the `+4` being `JSG-01.14`–`.17`, the two new members' surface, so the heads sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 240` ✓ (`docs/specs/storeroom-js-greens.md` `§2`'s heads and its `Q5` clause; its `§4` region's `233`/`3` is the gate-5 tree's HISTORICAL reading). |
| **row 3: *"`72/72` (`node bindings/js/greens/live-drive.mjs`)"*, over `12` `LIVE-n` blocks** | the live battery before the amendment's end-to-end scenario | **`91` authored · `91` PASS · `0` FAIL over `13` scenarios, `LIVE-13` (the end-to-end `on`/`off` flow, from real caller input to the final resolved state) carrying `19` assertions, so `72 + 19 = 91` ✓.** **LAYER `LIVE / ASSEMBLED PACKAGE`; `APP` LAYER `NONE`, and it is NOT an `APP`-green.** |
| **row 4: *"`223` PASS · `0` FAIL"*** | the sibling crate's own suite | **UNMOVED — `223` PASS · `0` FAIL at the manifest-path command above, its `76 + 17 + 66 + 2 + 62 = 223` arithmetic unmoved.** |
| **row 5 and the close-out pass's two rows: the store's `379`/`379`** | the store's root suite at the listener-cells tree | **UNMOVED AT THIS PASS: `379` PASS · `0` FAIL at `cargo test --offline --no-fail-fast` (`tests/watched_addresses.rs` `21`), `377` HISTORICAL; the typed register layer executes `8` rows — `5` Rust strategy lines beside `3` JS ones — `12` of `12` lines driven, `0` un-run, `107` JS attempts beside `395` Rust.** **⟶ AND ROWS `3`, `4` AND `5` OF THIS TABLE ARE SUPERSEDED AND ARE READ THROUGH AT THEIR OWN BYTES, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the live battery is `95` AUTHORED · `95` PASS · `0` FAIL with `LIVE-13` at `20` (NOT `91`/`19`; the `72 + 19 = 91` arithmetic is that tree's own and stands as history); the sibling crate is `224` PASS · `0` FAIL (NOT `223`); the store's root suite is `395` PASS · `0` FAIL (NOT `379`); and the register's two counters compose the ledger total `395 + 107 = 502` against the declared bound `≤ 502`, per-row `≤ 100`, the `0` un-run reading UNMOVED.** |
| — (no row prints it) | — | **AND THE BYTES THE TWO GREENS DRIVERS' FIGURES DESCRIBE, ADDED HERE BECAUSE NO CELL OF THIS TABLE NAMES THEM: `bindings/js/build/Release/storeroom_js_binding.node` — `sha256:cf088d91…`, `957,904` bytes — the PRE-AMENDMENT digest these records carry being `effcf6a6…`.** **The figure and the digest are named together because the artefact is gitignored and untracked here, so the digest is the only durable tie.** |

**AND THE LEDGER THIS SECTION'S CLOSING CLAUSE PRINTS IS RE-READ WITH IT, ON THE ARCHITECT'S CENSUS RULING — AN AMENDMENT IS A ROW AND NEVER A UNIT: `2 DONE / 0 open` UNITS = `2` (`2 + 0 = 2` ✓), the two units being `U-STOREROOM-NATIVE` (`N1`) and `U-STOREROOM-JS` (`N3`), whose amendment is the ROW this clause's figures describe; the `## OPEN` set holds `0` unit rows and `0` open non-unit rows (`0 + 0 = 0` ✓), so the `2 DONE / 1 open`, `3 DONE / 0 open` and `1 DONE / 2 open` readings this document prints are superseded states or rows-as-units readings and none of them is the census.** **THE LAYER STATEMENT OF THIS SECTION IS UNMOVED: every figure above is `ENVELOPE/PURE` or `LIVE / ASSEMBLED PACKAGE`, the ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`, NO CONSUMER APPLICATION LOADS THIS PACKAGE ANYWHERE IN THIS REPOSITORY, and no `APP`-green is claimed** (`§4.2` items 2–3; `DD-20`, `DD-31`, `DD-33`; `[T: this section's figures, re-read at their own sites with each superseded reading and each tree named, plus one derivation of this document's that does not close | CENSUS]`).

**AND THE CITATION RESOLUTION THIS PASS OWES, STATED BECAUSE A CITATION THAT POINTS AT A MOVED FILE IS A
FINDING** (`A3`'s own cross-reference clause, restated as this document's own declaration): **every
`archive/**` path this section and the four trackers cite was RESOLVED BY THIS PASS AT ITS LIVE LOCATION, and
NOTHING WAS ARCHIVED, MOVED OR REPOINTED BY IT.** **The resolved set: `archive/gate1/storeroom-js-review/`
(the three gate-1 step reports) · `archive/gate3/storeroom-js-red-set.md` ·
`archive/gate4/storeroom-js-adversarial.md` · `archive/gate5/storeroom-js-greens-run.md` ·
`archive/gate6/storeroom-js-live-determination.md` · and the five `archive/reviews/**` records of the two
other units' gates.** **NO FILE OF THIS UNIT WAS OBSOLETE AND NO FILE WAS ARCHIVED, so the count of citations
this pass REPOINTED is `0` and the count of cells it re-spelled for a moved path is `0`.** **AND ONE FACT A
READER NEEDS, SO A MISSING FILE IS NOT READ AS A MOVE: A GATE-7 PROOFREAD RECORD FOR THIS UNIT DOES NOT
EXIST AT `archive/reviews/**` — that pass's reconciliation landed in the TRACKERS themselves (its dated
clauses at `docs/next-steps.md`'s `## OPEN` and `## DONE` sections, at `docs/defects.md`, at
`docs/pending.md` and at this document's own `§7`, where its figure table stands above), and the unit's
landing row cites the proofread by its gate and its clauses rather than by a filed record.** **The archive's
gitignored status and its consequence are the standing ACTIVE `docs/decisions.md` row's own, and this pass
neither re-raises nor re-ignores it** (`[A1 docs/specs/storeroom-js-proposal.md §11 · A9 — the adjacent
corpus is read-only; docs/decisions.md · the archival row, "Keep as is" | cross-reference]`).

**AND THE LEDGER OF THIS FILE'S OWN LAST CLAUSE IS RECONFIRMED, NOT MOVED — AND ONE DIVERGENCE IS
FLAGGED RATHER THAN SMOOTHED.** **THIS SECTION WAS FIRST WRITTEN AGAINST A BRIEF THAT STATED THE LEDGER AT
`1 DONE / 2 open` UNITS = `3`; THE FILE'S OWN BYTES READ OTHERWISE, AND THIS PASS RE-READ THEM BEFORE
CLOSING: `docs/next-steps.md`'s `## DONE` section carries the rows `N1` (`U-STOREROOM-NATIVE`, closed
`2026-10-11`) AND `N2` (`U-STOREROOM-LISTENERS`, closed `2026-10-11`), so the operative arithmetic is
`2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓) and the OPEN SET holds exactly the ONE unit row `N3`
(`U-STOREROOM-JS`) with `1 + 0 = 1` ✓.** **THE DIVERGENCE IS ATTRIBUTED TO THE PARALLEL GATE-7
`role_proofreader` PASS'S LANDING, which closed `N2` into `## DONE` in the same window; a reader must take
the FILE's bytes and not the brief's figure.** **AND `U-STOREROOM-JS`'s OWN CLOSURE IS THE SUPERVISOR'S
CLOSE-OUT AND NOT THIS PASS'S: the close-out will move the ledger to `3 DONE / 0 open` UNITS = `3`
(`3 + 0 = 3` ✓) with the open set's own arithmetic at `0 + 0 = 0`, and this pass takes NEITHER figure.** **NO
PARK IS LIFTED BY THIS SECTION, `CF-DUP-3` STANDS `OPEN` AS AN UNPINNED CORNER WITH ITS REVISIT CONDITION,
NO ROW IS ADDED, DROPPED OR RE-OPENED, NO `APP`-GREEN IS CLAIMED, AND NO FIGURE OF ANOTHER UNIT IS
RE-LABELLED**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` — every figure carries its site and its layer;
A3 docs/specs/storeroom-js/acceptance.md §4.2 · `DD-20`; `DD-31`; `DD-33` | numeric or census claim]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THE TWO REGISTRATION VERBS AND THE NON-EXPOSURE CLAUSE, WHERE THE
FIRING IS INHERITED AND THE DELIVERY REMAINS THE UNIT'S.** `RCA-8(d)` ANNOTATE-BESIDE: **`§2.9`'s three items,
`§2.10`'s signature block and its paragraph, and the register's rows stand byte-for-byte — this document's
earlier dated clauses included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it
adds no verb, no member, no `§`-number, no `DD` row and no register row, and it re-decides no rule.**
**THE RULING, VERBATIM:** ***"Listener behavior is part of store."*** (`docs/specs/storeroom-js-proposal.md`
`§19` · `A78`).
1. **`§2.10`'s `listen` AND `unlisten` ARE THIS UNIT'S *CROSSING* AND THE STORE'S *SEMANTICS*.** **The TWO
   SIGNATURES, their argument domains and their return spellings stay this section's** — `listen`'s `address`
   as `AddressArg`'s domain and nothing more, `listen` returning the package's OPAQUE wrapper for the handle
   the store returned, `unlisten` accepting that form ONLY and answering `undefined` on every success
   including its no-op success, and each throwing exactly where the store throws (`§2.5`'s single form). **The
   HOME'S SEMANTICS are the store's, declared at `docs/specs/storeroom-native/write-and-read.md §6.5` items 8
   (a)/(d), 12 and 14** — **which address a registration binds to, what `listen` does at an address already
   held, what `unlisten` removes, and which values it declines as a no-op success** — **with the store's own
   `parameter-semantics.md §2.13` (`PAR-13`) answering each outside value.**
2. **AND ONE ITEM OF `§2.9` IS READ THROUGH THE SAME LINE, NAMED SO NO READER READS IT AS A FIRING RULE: item
   2's *"A FAILED READ IS THE EXISTENCE PROBE"* is this unit's own consequence of `A63`'s non-exposure and is
   unaffected by the re-homing** — **`findAddress` remains internal, no resolver shim is declared, and the
   `16`-code reachability claim stands exactly as printed (RE-SPELLED 2026-10-15 BY THE `RCA-9` FILE-TIER-SAVE
   PASS: the `15` this item printed is the count before the sixteenth member, `ConstraintListInvalid` at
   `docs/specs/storeroom-native/contract.md §8.1` #16, and the operative figure is `16` — the claim's own
   SUBJECT, that a failed `read` is the existence probe, is UNMOVED).** **Item 1's `8`-verb set is unmoved** — `listen`
   and `unlisten` remain two of the eight, and the re-homing changes neither their count, their spelling nor
   their presence.
3. **AND WHAT THE RE-HOMING LEAVES THIS DOCUMENT OWNING, SAID PLAINLY SO THE BOUNDARY IS FINDABLE FROM THE
   INDEX REGION AND FROM HERE BOTH:** **this unit owns THE DELIVERY — the id→function registry and its four
   rules, the registration site and its domain, the invocation, its timing and its one argument, and the
   single failure form (`§2.4`·`§2.7`·`§2.5`) — and THE CROSSING (`§1`) and THE PACKAGE (`§3`);** **it owns NO
   firing rule, and every clause of this directory that once carried one now INHERITS it from
   `write-and-read.md §6.5` items 8–14 and POINTS there.** **The store's half of the same directory line is
   `docs/specs/storeroom-native/contract.md §6.5`'s dated clause, which states the authority at the store's
   own foot.**
4. **NOTHING ELSE MOVES: the register keeps its `8` rows with every failure list unmoved (each row's own
   subject unchanged), the design-defaults table keeps every row and its priced `alt`, the closure predicate
   reads `6 = 6` on its own part-entry terms, and no `DD` row, no `PAR-JS` row and no part entry is authored,
   renumbered or dropped here.**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 8, 12 and 14 — the home's registration semantics, inherited and pointed at; A3
docs/specs/storeroom-native/contract.md §6.5's dated clause of 2026-10-11 — the same authority stated at the
store's own foot; A3 docs/specs/storeroom-native/parameter-semantics.md §2.13 · `PAR-13` | requirement]`).

---

**END OF THE CONTRACT DOCUMENT.** **The index region states the status, the unit and prefix, the scope
boundary and the part map; `§0` the claim-ledger rules, the `47`-row design-defaults table and the
dossier's clause-cell resolution; `§1` the value crossing; `§2` the JS surface; `§3` the package; `§4` the
acceptance layer; `§5` the typed register's `8` rows; `§6` the parameter-semantics index; `§7` the census
region with `P-1`'s `28`-row disposal; `§8` the CONTRACT FINDINGS for the store's author; `§9` the
handoff ledger; **and `§10` — ADDED BY THE GATE-8 RECONCILIATION OF 2026-10-11 — this directory's contract
and its parts against the build they describe, which is a RECORD and not a ruling** — and the order is the
ADOPTED BUILD ORDER (the crossing → the surface → the package → the
acceptance layer → the plan), with no step taking its input from a later stage** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.3 — the recommended variant `V1` and its ordering ground |
ordering claim]`). **This directory's closure predicate reads `6 = 6` and its state is `CLOSED`.**
**No unit row is admitted, no `DONE` row is re-opened, no artifact is frozen and no ledger count moves:
`docs/next-steps.md` stands `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓ — the file's own bytes, read by
this pass; the `1 DONE / 2 open` this closing clause carried as filed is named and dispositioned at `§10`'s
ledger clause above)** (`[A1
docs/specs/storeroom-js-proposal-review.md §6 item 2 | numeric or census claim]`).

**⟶ AND THE DIGEST'S TIE IS READ WITH ITS TWO LIMITS, LANDED 2026-10-11 BY THE `Q8` DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`) BECAUSE THIS TABLE PRINTS THE FIGURES AND ONE ROW OF IT PRINTS THE DIGEST.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the `§7.2` figure table with its byte row, the `Q7` clause and the closing clause — and each is read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no table row, moves no figure, edits no cell and runs nothing.**
1. **THE DIGEST `sha256:cf088d91…` (`957,904` bytes) TIES EXACTLY TWO FIGURES OF THIS UNIT'S AMENDMENT — THE BLIND SET'S `240/240` AND THE LIVE BATTERY'S `91/91` — AND IT TIES THEM FROM A TAIL CLAUSE OF EACH RUN RECORD AND FROM NOWHERE ELSE.** **NEITHER FIGURE NAMES A DIGEST IN ITS OWN CELL: the gate-5 record's `§7.3` blind-set row, its `§7.4` totals and the gate-6 record's `§4` row each print the figure with its site and its layer alone.** **THIS TABLE'S OWN BYTE ROW IS THE ONE PLACE IN THIS DIRECTORY WHERE THE DIGEST IS CARRIED, and it carries it as a CROSS-REFERENCE to the two records and never as a measurement of any pass.**
2. **AND THE GATE-5 RECORD'S IN-RECORD LEGS ARE UNRESOLVED RATHER THAN UNSTATED, WHICH IS A DIFFERENT STATE: its `108`-test JS leg, its `379` store-root leg and its `72`-assertion live leg (`71` PASS · `1` FAIL) were taken on a `950,960`-byte artefact written `2026-10-10 03:12` FOR WHICH NO DIGEST IS RECORDED ANYWHERE IN THIS REPOSITORY.** **The pre-amendment digest `effcf6a6…` names a different tree's artefact, and the tail clause's own grouping of every pre-amendment figure under it does not reach figures taken after that clause's framing and before the landed digest.**
3. **AND THE TWO RUST LEGS BEAR NO DIGEST AT ALL: `223` (the sibling crate) and `379` (the store's root suite) are the two Rust suites' own totals and neither loads a `.node`, so a cell that reads either as artefact-tied is a FINDING.** **NO FIGURE MOVES BY THIS CLAUSE, NO `APP`-GREEN IS CLAIMED OR AVAILABLE, AND NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE** (`[A3 `archive/gate5/storeroom-js-greens-run.md` `§7.3`/`§7.4` and its tail digest clause; A3 `archive/gate6/storeroom-js-live-determination.md` `§4` and its tail digest clause; A3 docs/specs/storeroom-js-greens.md`'s own digest clause — the same tie at the set itself | cross-reference]`).

---

**⟶ RECONCILED AGAIN 2026-10-11 — THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`): THIS DIRECTORY'S THREE FIGURES, ITS DIGEST AND ITS LEDGER LINE, EACH READ AT ITS OWN BYTES AND CORRECTED BESIDE ITSELF, BECAUSE A FOURTH UNIT HAS LANDED SINCE THE CLAUSES ABOVE WERE FILED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the `§7`–`§10` census region, the `§7.1` figure table and its byte row, the `§7.2` dated clauses, the `§10` table with its `Q7` clause, the digest-limits clause and the closing clause with its ledger clause — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no table row, moves no figure, edits no cell, mints no `DD` or `PAR-JS` row, adds no register row and runs nothing.** **THIS PASS HOLDS NO EXECUTION VERB: every figure below is the publish unit's CLOSE-OUT MEASUREMENT'S, QUOTED at the site that carries it, taken on artefact `sha256:0136c912…` (`958,112` bytes).**

1. **THE JS-SUITE FIGURE — THIS DIRECTORY'S `101` AND ITS `113` ARE EACH ONE TREE BEHIND, AND THE `§10` ROW THAT DERIVES `113` ALSO PRINTS A TERM THAT DOES NOT CLOSE.** **THE OPERATIVE READING, AT ITS OWN SITE: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `185` tests · `185` PASS · `0` FAIL · `0` skipped, over `NINE` files under `bindings/js/test/**`: `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2` · `negative-generators` `12` · `convenience` `8` · `publish` `62` · `publish-generators` `10` = `185` ✓.** **THE TERMS, SO THE MOVEMENT IS NOT READ AS A SILENT RESTATEMENT: the `+72` over this directory's `113` are `U-STOREROOM-PUBLISH`'s own red set (`62` cells at `bindings/js/test/publish.test.mjs`) and its `10` generators `NG-PUB-A`…`NG-PUB-J` at `bindings/js/test/publish-generators.test.mjs` — `113 + 62 + 10 = 185` ✓.** **AND TWO CELLS OF THE `§10` TABLE ARE RE-READ HERE BECAUSE THEY ARE THE ONES A READER TAKES FIRST: `§10`'s row `1` prints the operative figure as `113` and DERIVES it as *"`93` literal `test(...)` declarations + the `13`-member `CORPUS` loop + the `7`-row `HO_ROWS` loop = `93 + 13 + 7 = 113` ✓"* — an arithmetic that closes at ITS tree — and `§7.1`'s row `1` prints the closer's own as-filed *"`83 + 13 + 7 = 101` ✓"*, whose `83` is the stale term the `§10` row already names. NEITHER IS REWRITTEN: both stand, each at its own tree, and NEITHER IS RE-USED AS THE SHAPE OF THE `185`, whose cells are minted by the two files' own REGISTRIES (`BLOCKS` and `GENERATORS`) and not by a countable set of literal declarations — so the per-file arithmetic above is the only arithmetic this pass prints for it.** **SO FIVE READINGS OF ONE SUITE STAND ACROSS FIVE TREES — `89`, `92`, `101`, `113` AND `185` — and the operative one is `185`; `174`, wherever a record prints it, is the reading of the tree between the last two.**

2. **THE BLIND SET AND THE LIVE BATTERY — THE `240/240` THIS DIRECTORY'S `§7.1`, `§7.2` AND `§10` PRINT IS ONE TREE BEHIND; THE `91/91` IS UNMOVED.** **THE OPERATIVE BLIND-SET READING: `241` AUTHORED · `241` EXECUTED · `241` PASS · `0` FAIL over the SAME `13` scenarios, `JSG-12` reading `18` assertions — the `+1` being `JSG-12.18`, the `files` allowlist, which the publish unit's re-derivation ADDED and which `docs/specs/storeroom-js-greens.md`'s own `JSG-12` clause, item `5`, prints; the `236`/`236` and the `233`/`3` this directory also carries remain the two earlier trees' readings, each at its own date.** **THE LIVE BATTERY IS UNMOVED AT `91` AUTHORED · `91` PASS · `0` FAIL OVER `13` SCENARIOS with `LIVE-13` at `19`.** **⟶ AND BOTH FIGURES OF THAT SENTENCE ARE SUPERSEDED AND ARE READ THROUGH HERE, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the operative live battery is `95` AUTHORED · `95` PASS · `0` FAIL over `13` scenarios with `LIVE-13` at `20`, the `+4` being `LIVE-13.20` and the three cells filed with it.** **`ENVELOPE/PURE` FOR THE FIRST AND THE TWO RUST LEGS; `LIVE / ASSEMBLED PACKAGE` FOR THE SECOND; `APP` LAYER `NONE`, NO `APP`-GREEN CLAIMED OR AVAILABLE.** **⟶ AND THE BLIND-SET AND JS-LEG FIGURES ABOVE ARE RE-DERIVED ONCE MORE, 2026-10-15, BY THE `A116` ORDERING-SEAM PASS — EACH AT ITS OWN TREE AND WITH THE CLAUSE THAT MOVED IT NAMED: the blind set is `250` AUTHORED · `247` PASS · `3` FAIL, deterministic over six runs, its `JSG-01.9` member-set cell re-derived to FOUR and EIGHT cells added on the seam's own clauses; the JS leg is `348` tests · `348` PASS · `0` FAIL at `node --test bindings/js/test/*.test.mjs`, of which `constraint-kernel*` is `127`/`127`/`0` and `ordering` is `5`/`5`/`0`; and the live battery's ADDED SIBLING is `18`/`18` PASS while the original demo's limb 2 is fully green and ITS LIMB 1 SPLITS at the pair-adopted address — the split between `surface.md §2.7` item 6 and `§2.4` item 8 (c), which AWAITS THE ARCHITECT'S RULING and is settled by no clause of this document** — **⟶ AND THAT SENTENCE IS RE-SPELLED 2026-10-16, THE RULING HAVING LANDED 2026-10-15: the split between `surface.md §2.7` item 6 and `§2.4` item 8 (c) was SETTLED — item 6 GOVERNS THE FIRING (the write's triggered constraints run first, and the other listeners are reached once every constraint has passed) while item 8 (c) is read as the REGISTRATION-side statement it is, its non-delivery derivations superseded — and the split STANDS AS ONE DATED LINE: `JSG-16.1` asserts the ruled firing, both readings are printed at the greens specification's own `JSG-16` head, and NOTHING AWAITS ANY RULING at this cell; and the blind set's operative reading is `255` AUTHORED · `255` PASS · `0` FAIL while the JS leg's is `410` tests, each re-derived at the clause immediately below** (`docs/decisions.md` · `A114` (D1) and `A117` (D3)–(D6); `docs/specs/storeroom-js/surface.md §2.7` item 6 and `§2.4` item 8 (c) as corrected). **THE THREE BLIND FAILURES ARE REPORTED RATHER THAN PATCHED, and one of the three IS that split cell (`JSG-16.1`), both readings printed; the two live legs' figures are the run record's OWN (`docs/next-steps.md`'s `A116` cycle record) and each stands at its own layer** (`[A2 docs/decisions.md · `A116`; A3 docs/next-steps.md — the `A116` cycle record's measured figures; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 | numeric or census claim]`).

3. **AND THE ARTEFACT'S IDENTITY — THE `sha256:cf088d91…` / `957,904`-BYTE READING THIS DIRECTORY'S BYTE ROW CARRIES, AND THE TIE IT STATES, ARE THE `Q7`/`Q8` GATES' OWN TREE'S.** **THE OPERATIVE IDENTITY AT THIS CLOSE-OUT: `bindings/js/build/Release/storeroom_js_binding.node` — `sha256:0136c912…`, `958,112` bytes — the same re-pinned identity `archive/gate6/storeroom-js-live-determination.md` `§11.2` reads, and the identity the publish unit's own legs were measured on.** **SO THE `cf088d91…` TIE IS HISTORICAL AND STANDS AT ITS OWN TREE; the two figures it tied (`240/240` and `91/91` at that date) therefore carry it as that date's tie, and the operative `241/241` and `91/91` each carry the tail clause of the run record that measures them.** **AND THE TWO RUST LEGS BEAR NO DIGEST AT ALL — `223` (the sibling crate) and `379` (the store's root suite) load no `.node` — so a cell that reads either as artefact-tied is a FINDING.** **⟶ AND BOTH LEG FIGURES ARE SUPERSEDED AND ARE READ THROUGH, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the sibling crate reads `224` PASS · `0` FAIL and the store's root suite reads `395` PASS · `0` FAIL; the item's OWN POINT — that neither leg loads a `.node` and so neither bears a digest — STANDS WHOLE, and the operative artefact identity is still `0136c912…` over `958,112` bytes.**

4. **AND THE LEDGER, READ ONCE MORE AT THIS CLOSE-OUT.** **`docs/next-steps.md`'s operative line now reads `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓), the `U-STOREROOM-PUBLISH` `DONE` row having landed; the `2 DONE / 1 open`, `1 DONE / 2 open` and `2 DONE / 0 open` readings this directory's clauses print are each the state at their own date, and the census ruling — an amendment is a ROW and never a unit — is unmoved.** **THIS PASS MOVES NO LEDGER COUNT, ADMITS NO ROW, RE-OPENS NONE AND LIFTS NO PARK.** **THE ONE MEMBERSHIP THE BYTES DO NOT FIX is which three units the `3` names; it is reported at `docs/next-steps.md`'s own close-out clause with both readings and is decided neither there nor here.**

5. **AND THE ONE FIGURE THIS DIRECTORY LEAVES EXACTLY AS ITS `§10` CLAUSE FILED IT: the register's JS half — `107` attempts as filed, against `117` over `12` lines at `bindings/js/test/register.test.mjs`'s own `line(...)` caps — REMAINS OPEN FOR THE REGISTER RUNNER'S OWN OUTPUT, no pass of this one having measured the amended tree.** **THE ROW SET IS UNMOVED AT `8` ROWS (`5` RUST · `3` JS), EVERY ROW `HELD`, `0` UN-RUN; the closure predicate reads `6 = 6` ✓ and the state is `CLOSED`; the `DD` family stands at `54` rows and the `PAR-JS` set at `18`, each unmoved.** **⟶ AND THE LEDGER TOTAL THIS ITEM PRINTS IS RE-DERIVED, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the `395` Rust attempts and the `107` JS attempts are the SAME TWO COUNTERS this item carries, and their total is `395 + 107 = 502`, against the DECLARED BOUND `≤ 502` — per-row `≤ 100`, taken at the row; the `≤ 400`-total budget asserted elsewhere in this document is the superseded bound of the pass that wrote it, and the `0` UN-RUN reading is unmoved either way. THE `8` ROWS, THE `5`/`3` SPLIT, THE CLOSURE PREDICATE, THE `DD` `54` AND THE REGISTER-RUNNER DEBT STAND WHOLE** **(READ THROUGH THE `A116` ORDERING-SEAM PASS'S RECORD, 2026-10-15: the `PAR-JS` set's operative count is `19` — `PAR-JS-19`, the ordering seam, at `parameter-semantics.md §2.19` — while the `8` rows, the cap, the closure predicate, the `DD` `54` and this item's OWN register-runner debt stand UNMOVED.)** **⟶ AND THE `PAR-JS` FIGURE IS RE-READ ONCE MORE, 2026-10-16: the set's OPERATIVE COUNT IS `21` (`PAR-JS-1`…`PAR-JS-21`) NO LONGER — **A LABEL WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS**, the `18` of this cell, the `19` of the read-through above and the `21` here being the readings of the passes that filed them, each dated — and THE OPERATIVE COUNT IS `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s correction clause of this document; the two rows added after them are `PAR-JS-20`, the write's fifth optional argument `commit` at `parameter-semantics.md §2.20`, and `PAR-JS-21`, the construction's fourth `cfg` key `constraints` at `§2.21` — the key's home being `§2.21` and never `§2.20`. THE `DD` `54`, the `8` rows, the cap, the closure predicate and this item's register-runner debt stand UNMOVED.**

**⟶ RE-DERIVED 2026-10-16 — THE `file`-TIER SAVE'S OWN PASS (`role_spec_writer`), ON THE GATE-8 DOCUMENTATION REVIEW OF THAT UNIT (`archive/reviews/2026-10-16-file-tier-save-doc-review.md` §2 items `17`–`18`): THE TWO OPERATIVE FIGURES THE `§10` ITEMS ABOVE PRINT ARE RE-DERIVED, EACH AT ITS OWN TREE, AND THE RULING-PENDING SENTENCE IS SPENT.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no `§`-level section, mints no `DD` row, no `PAR-JS` row and no register row, adds no part file, moves no file count, and re-decides no ruling. THIS PASS RAN NOTHING: every figure below is the runner's, the suite's or the tracker's own reading.**

1. **THE JS LEG, RE-DERIVED AT THE SETTLED TREE AND WITH ITS TERMS: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `410` tests · `410` PASS · `0` FAIL · `0` skipped, and the file-tier save's own suite is part of that set** (`bindings/js/test/file-tier-save.test.mjs`, whose discriminating cells this pass cites elsewhere: `:1556–1596` the failed save's failing arm and `:1657–1677` the passing arm's once-and-last append). **THE `348` THIS ITEM'S OWN TEXT PRINTS IS THE `A116` ORDERING-SEAM PASS'S READING AT ITS OWN TREE, NAMED HERE AND NOT WITHDRAWN — `348` tests · `348` PASS · `0` FAIL, of which `constraint-kernel*` was `127`/`127`/`0` and `ordering` was `5`/`5`/`0` — and the `113`, `185` and `241`-era readings this directory carries are each their own tree's, at their own dates.** **SO FIVE READINGS OF ONE SUITE STAND IN THIS DIRECTORY AND THE OPERATIVE ONE IS `410` (`113` · `174` · `185` · `348` · `410`) — ⟶ AND `410` IS ITSELF SUPERSEDED AND IS READ THROUGH, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the operative reading is `499` tests · `499` PASS · `0` FAIL, and this directory's five are each their own tree's, at their own dates.**
2. **THE BLIND SET, RE-DERIVED AT THE SETTLED TREE AND WITH ITS TERMS: `node bindings/js/greens/greens.mjs` — `255` AUTHORED · `255` EXECUTED · `255` PASS · `0` FAIL over the SAME `16` scenarios, exit `0`, nothing retired; the `§2` heads summing `17 + 18 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 + 5 + 3 + 4 = 255` ✓, and the relation being `255 = 253 + 2` — the `253` RE-POINTED to the terminal arm (the ten cells `JSG-02.10`/`.11`/`.14`/`.15`/`.16` and `JSG-10.16`–`.20`) plus the `2` ADDED (`JSG-02.17`/`.18`, the two halves of `A119`).** **THE `250` AUTHORED · `247` PASS · `3` FAIL THIS ITEM'S OWN TEXT PRINTS IS THE `A116` PASS'S READING AT ITS OWN TREE and the `240/240` and `241/241` this directory carries are the `Q5` and `U-STOREROOM-PUBLISH` trees' — each at its own date, none withdrawn** (`docs/specs/storeroom-js-greens.md`'s own foot census clause, which is the census's ONE home from 2026-10-16).
3. **AND THE ONE SENTENCE THAT NO LONGER RESOLVES, SPENT: the split's *"AWAITS THE ARCHITECT'S RULING"* is re-spelled at its own cell above — the ruling LANDED 2026-10-15 and `JSG-16.1` asserts the ruled firing — and the split stands as ONE DATED LINE, both readings printed at the greens specification's `JSG-16` head.** **NO OTHER CLAUSE OF THIS DOCUMENT AWAITS A RULING ON THIS SUBJECT, AND NO CELL OF THIS DOCUMENT PRINTS THE `348`-ERA OR `250`-ERA FIGURES AS OPERATIVE FROM THIS DATE.**
4. **AND THE FIGURES THIS PASS DOES NOT MOVE, NAMED SO THE TWO ABOVE ARE NOT READ AS A RE-MEASUREMENT OF THEM: the live battery stays `91` authored · `91` PASS · `0` FAIL over `13` scenarios with `LIVE-13` at `19` — ⟶ AND THIS FIGURE IS SUPERSEDED AND IS READ THROUGH, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): the operative reading is `95` AUTHORED · `95` PASS · `0` FAIL, the `+4` being `LIVE-13.20` and the three cells filed with it, `LIVE-13` now standing at `20` — ; the layers stay `ENVELOPE/PURE` · `LIVE / ASSEMBLED PACKAGE` · `APP` `NONE`; the store's two Rust legs stay `223` and `379` — ⟶ AND BOTH ARE SUPERSEDED AND ARE READ THROUGH, SAME PASS AND SAME DATE (`RCA-8(g)`): the sibling crate reads `224` PASS · `0` FAIL and the store's root suite reads `395` PASS · `0` FAIL — ; the `DD` family stays `54` rows; the register stays `8` rows (`5` RUST · `3` JS), all `HELD`, `0` UN-RUN, its closure predicate `6 = 6` ✓ `CLOSED`; and this `§10`'s item `5`'s register-runner debt (`107` attempts as filed against `117` over `12` lines at `bindings/js/test/register.test.mjs`'s own `line(...)` caps) REMAINS OPEN exactly as that item files it.**

(`[A3 bindings/js/greens/greens.mjs` — the runner and its own totals line; A3 bindings/js/test/file-tier-save.test.mjs` — the suite this pass's unit added, `:1556–1596` and `:1657–1677`; A3 docs/next-steps.md` — the settled tree's `GATE 5 RE-MEASURED` and gate-9 figures (`410/410/0/0` · `255/255` · root `cargo test` `395`/`0` · binding crate `224`/`0`); A2 docs/decisions.md` · `A114` (D1), `A117` (D3)–(D6), `A119`; A3 archive/reviews/2026-10-16-file-tier-save-doc-review.md §2` items `17`–`18` and §5 (b) item `4` | numeric or census claim]`)

**⟶ APPENDED 2026-10-12 — THE `U-STOREROOM-CONSUMER-FIX` SPEC PASS (`role_spec_writer`): THE SELF-REPORT'S SOURCE, DECLARED AT THIS DIRECTORY'S `§3.4`, READ WITH THE SIBLING DIRECTORY'S `release.md §2.2`, `§2.4`, `§6.10` AND `§1.4a`.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — this directory's index region with its part map, its omissions, its two closure countings and its scope boundary, `§0.1`'s form rules, the reconciled `DD`-range clause with its `PAR-JS` and register readings, `§1.3`'s export set with `version` among the five, `§1.4` item 3's ABI-check refusal, `§3.1`–`§3.4`'s registry identity, matrix, trigger/version/CI and licence, `§4`'s layout and interface, `§5`'s ownership clause, `§7`–`§10`'s census region and every dated reconciliation and proofreading clause — STANDS BYTE-FOR-BYTE and is read THROUGH this clause.** **THIS CLAUSE IS A PURE INSERTION: it adds no `§`-level section to the numbered body this document already carries (its home is the reconciled `§3.4` subject-matter at this document's foot, and `§3.4` itself is UNMOVED), it mints no `DD` row, no `PAR-JS` row and no register row, it adds no part file, it moves no file count and it re-decides no ruling.** **THIS PASS RAN NOTHING.**

1. **THE CLAUSE THIS PASS COMPLETES, AT ITS OWN SUBJECT: THE CROSS-DIRECTORY INDEPENDENCE STATEMENT THIS DIRECTORY READS AT `bindings/js/Cargo.toml`'s OWN VERSION FIELD IS TRUE AND IS INCOMPLETE.** **ITS LAST LIMB, AS THE SIBLING DIRECTORY FILES IT: *"the artefact's self-report's own source is a fact of the sibling crate's `src/**`, which no clause of that unit declares"*.** **IT REMAINS TRUE OF **THE CRATE'S `version`** — `bindings/js/Cargo.toml`'s own version is DELIBERATELY INDEPENDENT of the package's `version`, the decision is NOT REVERSED, and no clause of this unit writes a byte of that manifest** (`§4.2`'s manifest facts stand; `docs/specs/storeroom-publish/release.md §2.2`'s independence clause, UNREVERSED). **AND IT IS NO LONGER TRUE, IN ITS OWN WORDS, OF **THE RELEASED SELF-REPORT**: UNDER `A91`'s `(a2)` the artefact's `version` is STAMPED AT BUILD TIME FROM `bindings/js/package.json`'s `version`, so the released self-report's source is THE PACKAGE MANIFEST and its carrier is a thing THIS unit declares — at `package.md §6.1`.** **SO THE STATEMENT IS READ IN TWO LIMBS AND NOT ONE: the CRATE'S VERSION is independent and undeclared here; the RELEASED SELF-REPORT is stamped from the package manifest and IS declared here** (`docs/specs/storeroom-publish/parameter-semantics.md §5.1` · `PAR-PUB-35`; `docs/specs/storeroom-publish/contract.md §5.0` · `P-PUB-9`). **AND `§1.3` ITEM `4`'S OWN DUTY IS THEREBY SATISFIABLE BY CONSTRUCTION RATHER THAN BY COINCIDENCE: `version` exists *"so the artefact can be audited from itself"*, and the value it answers is now the package manifest's own — which is what makes that audit a check rather than a hope.** `[A2 docs/decisions.md · the ACTIVE `A91` row of 2026-10-12; A1 docs/specs/storeroom-js/package.md §6.1`; read with `§1.3` item `4`, `§4.2` and the sibling `release.md §2.2` | declared parameter semantics]`
2. **THE CARRIER'S HOME IN THIS DIRECTORY, NAMED SO THE CLAUSE'S OWN PLACE IS NOT INFERRED: the mechanism, the directive's exact name (`STOREROOM_JS_PACKAGE_VERSION`), the build-script form's precedence, the absent case, the empty case, the semver question, the cache hazard and the release-only legality of the fallback are ALL declared at `package.md §6.1`** — **the part whose subject is this crate's own build surface and the value its artefact audits itself with.** **AND THIS DOCUMENT CARRIES NO SECOND COPY OF THEM: a reader who wants the mechanism is sent to `package.md §6.1`, and the sibling directory's `release.md §2.4` and `§6.10` carry the release's half.** `[A1 docs/specs/storeroom-js/package.md §6.1` | cross-reference]`
3. **AND THE TWO COUNTS THIS DIRECTORY'S OWN BYTES PRINT ARE RE-READ, EACH UNMOVED, SO THIS PASS'S SILENCE IS NOT READ AS A WIDENING: THE `PAR-JS` SET STANDS AT `21` ROWS (`PAR-JS-1`…`PAR-JS-21`) WITH NO ROW ADDED FROM THIS PASS — **⟶ AND THAT `21` CARRIES NO OPERATIVE LABEL FROM 2026-10-16 (GATE-2 SEVENTH REVIEWER-LOOP PASS): it is the `RCA-9`/gate-2-close-out reading, and the set's OPERATIVE count is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — the added rows being the `RCA-9` pass's own, `PAR-JS-20` and `PAR-JS-21`, minted 2026-10-15 at `parameter-semantics.md §1`, `§2.20` and `§2.21`, THE ONE HOME OF THAT COUNT — the stamp's consumed value being declared at the PUBLISH unit's own parameter surface as `PAR-PUB-35`, because a parameter row is its own unit's and is not minted across the directory edge — and THE TYPED REGISTER'S JS HALF STANDS AT `3` JS ROWS (`P-SR-4`, `P-SR-5`, `P-SR-6`) INSIDE THE `8`-ROW SET with NO ROW ADDED, no row's failure list widened and no strategy id minted** (**the three ids' SPELLINGS moved at the re-mint of 2026-10-17 and their `3`-inside-`8` COUNT did not: `8 ≤ 8` ✓, `DEF-2026-10-16-S`**). **THE TWO ROWS THIS UNIT MINTS ARE THE SIBLING DIRECTORY'S OWN (`P-PUB-9`, `P-PUB-10`), AND THEY ARE NOT ROWS OF THIS REGISTER** (`docs/specs/storeroom-publish/contract.md §5.0`; `§0.2`'s design-defaults row stands as printed). `[A1 docs/specs/storeroom-publish/contract.md §5.0`; A1 `docs/specs/storeroom-publish/parameter-semantics.md §1` | numeric or census claim]`
4. **AND BOTH DIRECTORIES' CLOSURE PREDICATES HOLD, PRINTED WITH THEIR FIGURES BECAUSE THIS PASS WROTE INSIDE TWO DIRECTORIES AND ADDED NO PART FILE TO EITHER: THIS DIRECTORY READS `6 = 6` ✓ AT ITS OWN PART-ENTRY COUNTING — the `5` `carrier` parts + `implementation-plan` + the `view` part `test-cases` = `6` — with its RAW-FILE reading printed beside it and unchanged at `7` files beside `contract.md`, so the state stays `CLOSED`; AND THE SIBLING DIRECTORY READS `6 = 6` ✓ — its map's `7` rows − `1` contract-document row = `6`, against `6` files beside its `contract.md`.** **AND THIS PASS'S OWN BACKUP MANIFEST — `docs/specs/storeroom-js/backup/CONSUMER-FIX-2026-10-12-manifest.md` — IS NEITHER A PART NOR AN ADDEND: it is under a `backup/` subdirectory, so it is not an entry of the part map and not a member of either directory's file set, and it contributes to neither side of either predicate.** **AND THE SIBLING DIRECTORY'S MANIFEST IS `docs/specs/storeroom-publish/backup/CONSUMER-FIX-2026-10-12-manifest.md`, read together with this one as ONE pass's record.** `[A1 docs/specs/storeroom-js/contract.md — this directory's index region, its part map and its two closure countings; A1 docs/specs/storeroom-publish/contract.md — the sibling closure region | numeric or census claim]`
5. **AND WHAT THIS PASS DID NOT DO, SAID PLAINLY BECAUSE ITS SUBJECT IS A SHIPPED ARTEFACT: it wrote NO byte of `bindings/js/**`, `src/**`, `tests/**` or `.github/**`; it ran no `cargo`, no `npm` and no `node`; it measured no artefact, no digest and no byte count; and it changed no figure of this directory's green sets** (`§7.1`; `§10`). **THE IMPLEMENTER'S PASS OWNS THE CARRIER'S TWO CELLS (`bindings/js/build.rs`'s manifest read and its two `cargo:` re-run directives, and `bindings/js/src/facade.rs`'s self-report), and the release act owns the guard and the cut** (`docs/specs/storeroom-publish/implementation-plan.md §5` · stop conditions `I`, `J`). **⟶ AND THE DUTY'S CITED AUTHORITY IS RE-CUT HERE, DATED `2026-10-13` BY THE GATE-2 EIGHT-FINDING CLOSE-OUT PASS (`role_spec_writer`), BECAUSE THE TWO STOP CONDITIONS NAMED BESIDE IT DO NOT CARRY THE CARRIER DUTY AT ALL.** `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above and its as-filed citation stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause re-cites an authority and edits no claim.** **WHAT THE TWO STOPS ACTUALLY CARRY: `I` is *"the `LIVE/INSTALL` battery is run, or its figure reported, before the release act"*, and `J` is *"a release is attempted with no declared partial-publish arm"* — neither says anything about the carrier, and a citation that resolves to a clause of a different subject is not a resolving citation.** **THE AUTHORITY THAT CARRIES IT, NAMED INSTEAD: the build-surface file `bindings/js/build.rs` IS DECLARED AT `docs/specs/storeroom-publish/distribution.md §7.3` ITEM `1`, and the stamp's carrier duty is declared at `docs/specs/storeroom-publish/release.md §2.4` ITEM `2` — whose own words price the chosen form as *"ONE BUILD-SURFACE FILE OF THE SIBLING CRATE gains a manifest read and two `cargo:` re-run directives"* — 
carried at the crate's own directory by `package.md §6.1` ITEM `2` and at `docs/specs/storeroom-publish/release.md §6.10` ITEM `1`, under the ruling `docs/decisions.md` · the ACTIVE `A91` row of `2026-10-12`.** **AND THE PLAN NOW CARRIES THE DUTY AT ITS OWN HOME RATHER THAN LEAVING IT IN THIS SENTENCE: its `§12` item `1` binds these two files to the implementer for this cell, dated, and NAMES the prohibition the binding collides with** (`docs/specs/storeroom-publish/implementation-plan.md §12` items `1` and `4`). `[A2 docs/decisions.md · the ACTIVE `A91` row of 2026-10-12; A1 docs/specs/storeroom-publish/release.md §2.4` item `2`; A1 docs/specs/storeroom-publish/distribution.md §7.3` item `1`; read with `package.md §6.1` item `2` and `docs/specs/storeroom-publish/implementation-plan.md §12` | requirement]`
`[A3 docs/specs/storeroom-js-greens.md` `JSG-12`'s clause, item `5` · its head's `LIVE-F5` clause, and its own close-out proofreading clause — the `241`'s three homes; A3 `bindings/js/test/publish.test.mjs` `BLOCKS` and `bindings/js/test/publish-generators.test.mjs` `GENERATORS` — the `+72`'s own homes; A3 `archive/gate6/storeroom-js-live-determination.md` `§10.5`, `§10.6`, `§11.2` and `§11.6` — the re-pinned identity and the live battery's totals; A1 `docs/next-steps.md`'s close-out clause — the ledger and the one undecided membership | numeric or census claim]`

**⟶ AND THE LEDGER THIS CLOSING CLAUSE PRINTS IS RE-READ, LANDED 2026-10-11 BY THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`) — ON THE ARCHITECT'S CENSUS RULING, AN AMENDMENT IS A ROW AND NEVER A UNIT.** `RCA-8(d)` ANNOTATE-BESIDE: **the whole closing paragraph above stands byte-for-byte — its `2 DONE / 1 open` UNITS = `3` reading, the `1 DONE / 2 open` filed clause it names and the `3 DONE / 0 open` close-out it predicts included — and it is read THROUGH this clause; THIS clause is a PURE INSERTION and it admits no unit, re-opens no row, freezes no artifact and re-decides no ruling.** **THE AS-FILED READINGS, QUOTED: *"`docs/next-steps.md` stands `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓ — the file's own bytes, read by this pass"* and *"the close-out will move the ledger to `3 DONE / 0 open` UNITS = `3` (`3 + 0 = 3` ✓)"*.** **THE OPERATIVE ARITHMETIC: `2 DONE / 0 open` UNITS = `2` (`2 + 0 = 2` ✓) — the two `DONE` units being `U-STOREROOM-NATIVE` (`N1`, carrying the listener amendment as its own row) and `U-STOREROOM-JS` (`N3`, carrying THIS convenience add-on as its own row) — with the `## OPEN` set holding `0` unit rows and `0` open non-unit rows (`0 + 0 = 0` ✓), exactly as `docs/specs/storeroom-js-convenience-proposal.md` `§5`'s `Q7` row and `§6`'s ledger row are filed (`2 DONE / 0 open`, *"an amendment adds no unit"*).** **SO THE `3` THIS CLOSING CLAUSE PRINTS IS A ROWS-AS-UNITS READING AND NOT THE CENSUS, AND THE `2 DONE / 1 open` IT READS FROM THE FILE'S OWN BYTES IS THE STATE BEFORE THE JS UNIT'S CLOSE-OUT ROW LANDED; neither is withdrawn as its own date's reading and neither is the operative count.** 
**AND THE FIGURES THE `§10` TABLE PRINTS ARE RE-READ AT THIS CLAUSE'S SIBLING ABOVE THAT TABLE: the JS leg `113` · the blind set `240/240` · the live battery `91/91` over `13` scenarios · the sibling crate `223` UNMOVED · the store's root suite `379` · the register's `8` rows at `107` JS + `395` Rust attempts, `0` un-run · the artefact `sha256:cf088d91…` at `957,904` bytes.** **⟶ AND THE OPERATIVE READINGS OF THE FIVE FIGURES OF THAT SENTENCE ARE THE ONES THE CLAUSE BELOW NAMES, DATED 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`: the sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): the JS leg `499` · the blind set `255` over `16` scenarios · the live battery `95` · the sibling crate `224` · the store's root suite `395`; the register's two attempt counters it prints (`107` JS + `395` Rust) are the SAME TWO that compose the ledger total `395 + 107 = 502` against the declared bound `≤ 502`; and the only cell of the sentence this pass leaves exactly as printed is the artefact's `cf088d91…`/`957,904` reading, which `§10`'s item `3` above already declares HISTORICAL at its own tree — the operative identity being `0136c912…` over `958,112` bytes at that same item.** **AND THE FIVE FIGURES THIS SECTIONS' ITEMS PRINT ARE SUPERSEDED AND ARE READ THROUGH THIS CLAUSE, 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`: items `1`, `2` and `4` stand BYTE-FOR-BYTE above and THIS clause is their mark): THE JS LEG IS `499` TESTS · `499` PASS · `0` FAIL (NOT `410`, `348`, `185`, `113` or `101`); THE BLIND SET IS `255` AUTHORED · `255` EXECUTED · `255` PASS · `0` FAIL over `16` scenarios (NOT `250`/`247`/`3`, `241/241` or `240/240` — the `410`-era blind figure and the `253 + 2 = 255` relation standing at the `file`-tier pass's own clause above, which the operative tree now itself prints); THE LIVE BATTERY IS `95` AUTHORED · `95` PASS · `0` FAIL (NOT `91/91`), the `+4` being `LIVE-13.20` and the three cells filed with it; and THE STORE'S TWO RUST LEGS READ `224` PASS · `0` FAIL for the sibling crate (NOT `223`) and `395` PASS · `0` FAIL for the store's root suite (NOT `379`), with the typed register layer's ledger total `395 + 107 = 502` against the declared bound `≤ 502`, per-row `≤ 100` taken at the row. THE SEAM'S BUDGET — `21 × 19 = 399 ≤ 400` — IS A DIFFERENT TEST'S OWN `ROW_BUDGET` AND IS UNMOVED, exactly as item `3` above says; NO CLAUSE OF THIS REGION RE-DECIDES IT.** **NO UNIT ROW IS ADMITTED, NO `DONE` ROW IS RE-OPENED, NO PARK IS LIFTED, NO ARTIFACT IS FROZEN AND NO `APP`-GREEN IS CLAIMED BY THIS PASS** (`[T: this document's closing ledger clause and the census ruling that re-reads it | CENSUS]`).

**⟶ ADDED 2026-10-15 — THE REMAND OF THE `A116` DOCUMENTATION REVIEW (`role_spec_writer`): THE `PAR-JS` FIGURES THIS DOCUMENT PRINTS, DISPOSED OF ONE BY ONE, AND THE BUDGET'S OWN TERMS.** **THIS CLAUSE ADDS NO ROW OF ITS OWN TABLE, NO CELL, NO `§` AND NO PART, AND IT IS THE OPERATIVE STATEMENT OF EXACTLY THREE THINGS — which `PAR-JS` figures are the operative `19` and which are filed readings read through it, the status of the two nine-figure *"would falsify"* lists, and which figure the printed budget's `19` is.** **AND IT IS ALSO THE AUTHORITY FOR THREE CELLS ABOVE IT THAT THIS PASS RE-DERIVED, NAMED SO *"PURE INSERTION"* IS NOT READ AS *"NOTHING ABOVE MOVED"*: `§0.1`'s closing seam clause's arithmetic sentence disambiguating the two `19`s (an insertion inside that clause, adding no byte of its arithmetic and no count), `§7.1`'s row `10` (the parameter-semantics count, `18` → `19`) and `§7.3`'s row `29` (the set's rows, `18` → `19`), the last two re-spelled in place with their read-through, and all three enumerated at item 1 below.**

1. **THE `PAR-JS` SET'S OPERATIVE FIGURE IS `19`, AT EVERY SITE THAT PRINTS IT, **⟶ AND RE-DERIVED 2026-10-16 TO `21`: the `19` here is the `A116` pass's own reading, named and not withdrawn, and the re-derivation clause at THIS clause's foot below disposes of the same eight sites one by one at `21`** — **⟶ AND THE `21` THAT RE-DERIVATION REACHES IS ITSELF WITHDRAWN AS OPERATIVE THE SAME DATE BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS: the `19` and the `21` are those passes' readings, each named, and the OPERATIVE figure is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s correction clause of this document; THE EIGHT SITES ARE RE-READ AT THAT `25` AT ITEM `1` OF THE `file`-TIER CLAUSE UNDER THIS ONE AND AT ITEMS `17`–`20` OF THIS `§6` REGION'S REQUIREMENT LIST** AND THE EIGHT ADDRESSABLE SITES ARE DISPOSED OF HERE ONE BY ONE SO NONE IS LEFT UNCOVERED.** **THE EIGHT, ONE LINE EACH, WITH THE FIGURE EACH CARRIES NOW: (1) this document's index-region unit/prefix bullet — `PAR-JS-1`…`PAR-JS-19`; (2) its part-map row for `parameter-semantics` — the same range; (3) this `§6`'s header sentence — *"The rows are `PAR-JS-1`…`PAR-JS-19`"*; (4) this `§6`'s arithmetic — `15 + 1 + 1 + 1 + 1 = 19` ✓, `18 + 1 = 19`; (5) `§7.1`'s row `10`, the parameter-semantics count — RE-SPELLED AT ITS OWN CELL from `18` to `19`; (6) `§7.3`'s row `29`, the parameter rows' arity — RE-SPELLED AT ITS OWN CELL from `18` to the set's `19`; (7) `parameter-semantics.md §1`'s scope statement and its arithmetic — `PAR-JS-1`…`PAR-JS-19` and `15 + 1 + 1 + 1 + 1 = 19` ✓; and (8) `docs/specs/storeroom-js/test-cases.md`'s row `63` — `19` rows, its `18` standing as that row's filed reading.** **THE FIRST FOUR AND THE LAST TWO OF THOSE EIGHT CARRIED `19` BEFORE THIS CLAUSE; THE `§7.1` AND `§7.3` CELLS ARE RE-SPELLED BY THIS CLAUSE AT THEIR OWN CELLS, on the authority of the `A116` dated clause at `§0`'s index region and of `parameter-semantics.md §2.19`, which named both cells among the sites the mint would move.** **AND THE RECKONING BETWEEN THAT EIGHT AND THE TWO LISTS' OWN *"NINE"*, STATED HERE SO NEITHER NUMBER IS READ AS A DEFECT OF THE OTHER: the two lists' *"NINE printed ranges and counts"* is THEIR OWN as-filed reckoning, taken over the six cell-level sites above and the three clause-level figures of the same documents — the `§0.2` census clause and the `A86` ruling clause named immediately below among them — and THIS clause disposes of every one of those nine: the six cells and sentences it re-derives or reads through here, and the three clause-level readings it reads through the `A116` dated clause at `§0`.** **AND ONE CELL IS NAMED SO ITS READ IS NOT MISTAKEN FOR A MOVED FIGURE: the `A86` scope clause's own table in `§0` carries a *"the `PAR-JS` set"* row whose `What it reads now` cell prints `18` rows — that cell's subject is the `A86` RULING'S OWN effect (no row added BY `A86`), not the set's census, and it is read THROUGH the `A116` dated clause at the same index region; NO BYTE OF IT IS EDITED HERE AND NO FIGURE OF THIS DOCUMENT MOVES BY THIS CLAUSE.** **AND TWO MORE CELLS ARE NAMED FOR THE SAME REASON, EACH A DATED CLAUSE THAT PRINTS ITS OWN RANGE BESIDE THE READ-THROUGH THAT RE-DERIVES IT: the `§0.2` census clause's *"the `PAR-JS` range stands at `PAR-JS-1`…`PAR-JS-19` (this line's own as-filed figure, `…PAR-JS-18`, …)*", which already reads through the `A116` dated clause and prints the operative `19` in the same sentence; and the `A86` ruling clause's closing *"the `PAR-JS` range still `PAR-JS-1`…`PAR-JS-18`"* — the LAST remaining site of the nine whose own sentence does not yet print `19`, read from this date THROUGH the `A116` dated clause at `§0`'s index region exactly as the other two are.** **NO BYTE OF EITHER IS EDITED HERE AND THE THREE, WITH `§7.1`'s and `§7.3`'s cells, ARE THE ONLY SITES AT WHICH THE RANGE OR THE COUNT IS READ OTHER THAN `19`** (`docs/specs/storeroom-js/contract.md §0`'s unit/prefix bullet, its part-map row for `parameter-semantics` and its `A116` dated clause; `§6`'s header and arithmetic; `§7.1`'s row `10` and `§7.3`'s row `29`, each read through the same clause; `parameter-semantics.md §1` and `§2.19`; `docs/specs/storeroom-js/test-cases.md`'s row `63` | numeric or census claim]).
2. **AND THE TWO NINE-FIGURE *"WOULD FALSIFY"* LISTS ARE ANSWERED AT THEIR OWN SITES: THEY ARE NOT FALSE OF THIS DIRECTORY, AND THEY ARE NOT THE OPERATIVE STATEMENT OF THE SET'S SIZE EITHER.** **Both lists — this `§6`'s own clause and its restatement at the index's second dated clause — print the same NINE sites and each says, verbatim, that MINTING `PAR-JS-19` *"would falsify"* them.** **THE HYPOTHESIS EACH LIST STATES IS A COUNTERFACTUAL ABOUT AN ACT NOT TAKEN IN THE FORM EACH PRICES, SO NEITHER LIST IS FALSIFIED BY THE `PAR-JS-19` THAT LATER LANDED — and the reason is the route those clauses' own choice took: the `instance` position was the ONE parameter carried inside `PAR-JS-1`'s scope, and the seam's row is the NINETEENTH, so all NINE sites those lists named stand at `19` — the NINE of item 1 above, at their own `§`s — and NOT ONE OF THEM IS FALSIFIED INTO A FALSEHOOD: EVERY ONE OF THE NINE IS DISPOSED OF at item 1 above — six cells and sentences, two of which are re-derived there and four of which already print `19`, together with the three clause-level figures carried there or read through the `A116` dated clause at `§0`'s index region — so NO SITE OF THE NINE IS LEFT UNREAD AND NO FIGURE OF THE NINE PRINTS A FALSE COUNT.** **BOTH LISTS STAND AS FILED AT THEIR OWN SITES, WITH THESE FOUR TERMS READ WITH THEM: (i) their operative figure is `19`, declared by the `A116` dated clause at `§0`'s index region and by `parameter-semantics.md §1` and `§2.19` — AND READ THROUGH FROM 2026-10-16, the operative figure being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date; (ii) the *"would"* each prints is the counterfactual's, and never a claim about the state of this directory; (iii) the re-derivation of the NINE sites is the `A116` pass's own, cited and not re-stated; and (iv) NO LIST IS WITHDRAWN, NO LIST IS EDITED AND NO SITE IS COUNTED TWICE — `PAR-JS-19` being the ONE row added since the lists were filed** (`docs/specs/storeroom-js/parameter-semantics.md §2.19`; `docs/specs/storeroom-js/contract.md §6`'s re-derivation clause and the index's second dated clause | numeric or census claim]`).
3. **AND THE BUDGET `21 × 19 = 399 ≤ 400` PRINTED AT THE SEAM PASS'S OWN ANCHORS HAS BOTH ITS TERMS ESTABLISHED, AND NEITHER TERM IS A `PAR-JS` FIGURE.** **THE FIRST OPERAND `21` IS `bindings/js/test/constraint-kernel-properties.test.mjs`'s own `ROWS_OF_CHECKS` — that test file's `row()` cells — and the SECOND OPERAND `19` IS THAT SAME TEST'S `ROW_BUDGET`, derived at its own file as `min(MAX_ATTEMPTS_PER_ROW, floor(MAX_ATTEMPTS_TOTAL / ROWS_OF_CHECKS))` = `min(100, floor(400 / 21))` = `19`, closing as `21 × 19 = 399 ≤ 400` against `MAX_ATTEMPTS_TOTAL = 400`.** **SO THE `19` PRINTED BESIDE `21 × 19 = 399 ≤ 400` IS THE CONSTRAINTS UNIT'S TEST `ROW_BUDGET` AND IS NOT `PAR-JS 19`, which is `19` at the same moment for an unrelated reason — the row count of a SEPARATE, UNCAPPED provenance surface.** **THE ARITHMETIC IS RIGHT AND IS NOT CHANGED: `399 ≤ 400` ✓, ONE cell of headroom, NO row added and NO cell spent — ONLY THE PRINT IS MADE UNAMBIGUOUS, here and at `parameter-semantics.md §2.19`'s own close, which carries the same sentence for its own anchor** (`[A2 docs/decisions.md · `A113`; A3 docs/specs/storeroom-js/parameter-semantics.md §2.19` — the same terms at that anchor; A3 docs/specs/storeroom-js/contract.md §6` — the `PAR-JS` count, a different figure | numeric or census claim]`).

**⟶ RE-DERIVED 2026-10-16 — THE `file`-TIER SAVE'S OWN PASS (`role_spec_writer`), ON THE GATE-8 DOCUMENTATION REVIEW OF THAT UNIT (`archive/reviews/2026-10-16-file-tier-save-doc-review.md` §5 (c)'s `PAR-JS` row, which names this clause's own figure among the cells a gate-10 reader meets as `19` first): THE `PAR-JS` SET'S OPERATIVE FIGURE IS `21` NO LONGER — THAT LABEL IS **WITHDRAWN** 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS — AND THE `19` THE THREE ITEMS ABOVE ARE BUILT ON IS THE `A116` PASS'S OWN READING, NAMED, NOT WITHDRAWN AS A READING AND TRUE AT ITS DATE; THE OPERATIVE FIGURE FROM THIS DATE IS `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, printed with its searched set at `§6`'s correction clause of this document.** **THIS CLAUSE ADDS NO ROW, NO CELL, NO `§`, NO PART AND NO ID; IT MINTED NOTHING AND IT RE-DECIDES NO RULING.**

1. **THE TWO ROWS THE `A116` PASS DID NOT MINT, AND THEIR ONE OWNER: `PAR-JS-20` — the write's FOURTH optional argument `commit`, declared LAST at `surface.md §2.2`, its own row `parameter-semantics.md §2.20` — and `PAR-JS-21` — the construction's fourth `cfg` key `constraints`, OPTIONAL, its own row `parameter-semantics.md §2.21`.** **BOTH ARE THE `RCA-9` FILE-TIER-SAVE PASS'S, MINTED 2026-10-15 and re-derived at the same date by the gate-2 consistency close-out; THE COUNT'S ONE HOME IS `parameter-semantics.md §1`, whose arithmetic reads `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ and `20 + 1 = 21` — THAT ALGEBRA BEING THE GATE-2 CLOSE-OUT PASS'S 2026-10-15 READING AND CARRYING NO OPERATIVE LABEL FROM 2026-10-16, THE OPERATIVE ARITHMETIC BEING `23 + 2 = 25` ✓ AT THAT PART'S `§1` COUNT-CORRECTION CLAUSE OF THAT DATE.** **AND THE KEY'S OWN HOME IS `§2.21` AND NEVER `§2.20` — the mis-pointer the same review reports at `docs/specs/storeroom-constraints/kernel-surface.md §1` item `1`'s fixture clause, re-pointed at its own site by this pass.**
2. **THE EIGHT SITES ITEM 1 ABOVE DISPOSES OF, EACH RE-READ AT `21` WITH THE `19` IT NAMED LEFT WHERE IT STANDS — AND NEITHER THE `19` NOR THE `21` CARRIES AN OPERATIVE LABEL FROM 2026-10-16 (GATE-2 SEVENTH REVIEWER-LOOP PASS): the operative figure is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, and EVERY SITE THIS ITEM RE-READS AT `21` NOW CARRIES THAT WITHDRAWAL AT ITS OWN CELL, at items `17`–`20` of this `§6` region's requirement list: (1) this document's index-region unit/prefix bullet — the operative range is `PAR-JS-1`…`PAR-JS-21`, re-spelled at its own cell; (2) its part-map row for `parameter-semantics` — the same range, re-spelled at its own cell; (3) this `§6`'s header sentence — `PAR-JS-1`…`PAR-JS-21`; (4) this `§6`'s arithmetic — `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓ and `20 + 1 = 21`, the `15 + 1 + 1 + 1 + 1 = 19` ✓ standing as the `A116` reading; (5) `§7.1`'s row `10` — RE-SPELLED AGAIN AT ITS OWN CELL, `18` → `19` → `20` → `21`, each reading dated at that cell; (6) `§7.3`'s row `29` — likewise; (7) `parameter-semantics.md §1`'s scope statement and arithmetic — `PAR-JS-1`…`PAR-JS-21` and `15 + 1 + 1 + 1 + 1 + 1 + 1 = 21` ✓; and (8) `docs/specs/storeroom-js/test-cases.md`'s row `63` — `21` rows, its `18` and its `19` standing as that row's own filed readings.** **NO NINTH SITE IS MINTED AND NO SITE IS COUNTED TWICE.**
3. **AND THE TWO NINE-FIGURE *"WOULD FALSIFY"* LISTS OF ITEM 2 ABOVE ARE UNMOVED AT THEIR OWN SITES, READ THROUGH THIS CLAUSE AT ONE TERM ALONE: their item `(i)`'s *"their operative figure is `19`"* reads `21` from this date AND, FROM THE CORRECTION OF THE SAME DATE, NEITHER `19` NOR `21` IS OPERATIVE: the operative figure is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date, while the counterfactual's force, the *"would"*, the non-withdrawal, the no-edit and the no-double-count stand exactly as filed.** **AND THE SAME ONE REASON READS THE `A117` CLAUSE'S OWN UNMOVED LIST AT ITS FOOT: the `PAR-JS 19` it prints there is the `A116` pass's figure and its OPERATIVE reading is `PAR-JS-1`…`PAR-JS-25` (`23 + 2 = 25` ✓, `parameter-semantics.md §1`'s count-correction clause of 2026-10-16); every other member of that list — the store's one home entry per address, the member set `4`, the register's `8` rows, the budget `21 × 19 = 399 ≤ 400`, `KC 8`, the kernel's FIVE-item extent, the store's `8`-verb namespace, the seam's two instants and its withholding, and item 6's firing law — stands UNMOVED.**
4. **AND THE BUDGET'S `19` IS UNMOVED AND IS STILL NOT A `PAR-JS` FIGURE, SAID AGAIN SO THE `21` IS NOT READ INTO IT: `21 × 19 = 399 ≤ 400` ✓ is `bindings/js/test/constraint-kernel-properties.test.mjs`'s own `ROW_BUDGET` (`min(100, floor(400 / 21))`), and it stays `19` at the very moment `PAR-JS` reads `25` (`PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, from 2026-10-16; the `21` this item once named beside it being the gate-2 close-out pass's superseded reading).** **NO CELL OF THE BUDGET IS SPENT, NO ROW IS ADDED TO EITHER REGISTER, AND THE REGISTER'S `8` ROWS STAND.**

(`[A2 docs/decisions.md` · `A116` (D5); A3 docs/specs/storeroom-js/parameter-semantics.md §1`, `§2.19`, `§2.20` and `§2.21` — the count's ONE home and the two added rows; A3 docs/specs/storeroom-js/surface.md §2.1`'s dated clause (the `cfg` block) and `§2.2`'s signature block and dated clause; A3 docs/specs/storeroom-constraints/kernel-surface.md §1` item `1`'s fixture clause, re-pointed this pass; A3 archive/reviews/2026-10-16-file-tier-save-doc-review.md §5 (c)` | numeric or census claim]`)

**⟶ ADDED 2026-10-15 — THE `A117` KEYING REMAND (`role_spec_writer`): THE OWED FIRING'S HOME, SINGLE-VALUED AT ITS OWN SITE AND HERE.** **THIS CLAUSE ADDS NO ROW, NO CELL, NO `§`, NO PART, NO ID AND NO COUNT; it re-spells no byte of the clauses it reads through, and it is the operative statement of EXACTLY ONE THING — WHERE AN OWED FIRING LIVES, `A117` (D5) having been landed at the one site that decides it.**

**THE ONE READING, STATED SO NO OTHER IS DERIVABLE FROM IT: THE CHECK-OFF'S ACT AND ITS EXTENT ARE THE SHIPPED LAW AND ARE UNMOVED** — **in the residue the check-off takes the evaluated identity's entry as it passes, every occurrence of it, with the same warrant and the same by-identity extent; the failed write's own returned set leaves by the discard on the failing arm; no sift of any subset is performed** (`surface.md §2.7` item 7 and its sub-items (a)–(d); `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2; `docs/decisions.md` · `A117` (D6)). **AND THE OWED FIRING'S HOME IS THE REGISTRY'S RESOLUTION OF ITS IDENTITY AND NOT AN OCCURRENCE STANDING IN THE RESIDUE: THE TERMINAL ARM'S DELIVERED SET IS THE RESIDUE PLUS THE CHECKED-OFF IDENTITIES WHOSE REGISTERED FUNCTION THE REGISTRY HOLDS, RESOLVED BY THE SAME REGISTRY LOOKUP THE RESIDUE IS DELIVERED BY, EACH INVOKED ONCE WITH THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT — NOTHING WHERE THE REGISTRY HOLDS NO FUNCTION FOR IT — AND ZERO OF THE FAILED WRITE'S OWN SET ON THE FAILING ARM, WHOSE RESIDUE THE DISCARD EMPTIES AND WHOSE ARM PUBLISHES NOTHING.** **THE OBSERVABLE IS THEREFORE SINGLE-VALUED: THE IN-WINDOW INVOCATION SET IS EMPTY; the terminal arm invokes that delivered set, one invocation per identity (sub-item (a)); and the residue stays a COUNT a drive may assert off the member — ONE HOME ENTRY PER ADDRESS** (`surface.md §2.4` item 9 (b); `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c); `docs/decisions.md` · `A117` (D6)).

**AND TWO READINGS ARE WITHDRAWN BY NAME, EACH AT EVERY SITE THAT CARRIED IT: THE RESIDUE'S ENTRIES KEYED BY THE OWED FIRING EACH REGISTRATION OWES — ONE ENTRY PER OWED DELIVERY — IS WITHDRAWN, because it demanded a SECOND CARRIER ENTRY AT ONE ADDRESS the carrier cannot hold** (`surface.md §2.7` item 7's keying clause of 2026-10-15, re-spelled at its own site; `parameter-semantics.md §2.19`'s addendum of the same date, re-spelled at its own site); **and the derived NON-DELIVERY at `surface.md §2.4` item 8 (c) stands withdrawn as `A117` (D3) withdrew it.** **NO CARRIER CHANGE IS MADE OR IMPLIED: the store's one home entry per address, the member set `4`, `PAR-JS 19`, the register's `8` rows, the budget `21 × 19 = 399 ≤ 400`, `KC 8`, the kernel's FIVE-item extent, the store's `8`-verb namespace, the seam's two instants and its withholding, and item 6's firing law are ALL UNMOVED** (`docs/decisions.md` · `A117` (D6); `A116` (D4)).

`[A2 docs/decisions.md · `A117` (D3)–(D6) — the firing law governs, the registration-side fact withdrawn, one owed firing per registration, the residue's keying READ AT THE REGISTRY'S RESOLUTION, and the unmoved set; A3 docs/specs/storeroom-js/surface.md §2.7` item 7 (its keying clause AS RE-SPELLED 2026-10-15) with its sub-items (a)–(d), and `§2.4` item 8 (c) as corrected; A3 docs/specs/storeroom-js/parameter-semantics.md §2.19` — the addendum AS RE-SPELLED at its own site; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — `CommitRecord`'s four members and `pending`'s reading; A3 docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) and item 14 | state or fail-state declaration]`
