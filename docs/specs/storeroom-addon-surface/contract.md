# Contract — `U-STOREROOM-ADDON-SURFACE`: the per-verb export split, the receiver, and the JS unwrap

**Status:** **SPEC — the whole contract of this unit.** **REGENERATED 2026-10-18, not amended.** The prior directory — 191 KB carrying five amendment layers and six completeness findings over its own bookkeeping — is archived byte-exactly at `archive/addon-surface-regen/2026-10-18/` and this document supersedes it entirely. **No supersession clauses, no sweep tables, no audit of audits.** A position appears once.

**The authority.** `docs/decisions.md`'s ACTIVE rows, cited **by name** (that file's header warns its line anchors drift):

| Row | What it decides, for this unit |
| --- | --- |
| *"SPLITS AT THE DEPENDENCY BOUNDARY…"* | this unit's scope, its order, the freeze it consumes |
| *"THE STORE IS TORN DOWN BY A GC FINALIZER…"* | the refusal arm; the receiver-table retirement |
| *"FOUR CLAUSES … ARE HALLUCINATED OR MISREAD"* | the failure form's member count and the void `stack` rule |
| *"THE `STEP 0`…"* | the zero-row exemption and the budget rule |

**Upstream dependency, declared and not re-derived: `U-STOREROOM-ADDON-ADOPTION` lands FIRST and produces the freeze** — the built `.node`'s `sha256`, the export name set and `facade.rs`'s byte count. **This unit consumes those three as declared inputs.** Its own dossier is a **lawful zero-row exemption**: the export names it mints are this project's own declared words, not identifiers sourced from outside it.

**The layer.** `ENVELOPE/PURE` (`RCA-12`). **No `APP`-green is claimed or available.**

---

## §0. THE INDEX — the parts, and what carries nothing

| Part | KIND | What it carries |
| --- | --- | --- |
| `contract.md` | index + clauses | this file: `§1`–`§7` |
| `export-set-and-dispatch.md` | carrier | the thirteen entries, their arities, and the dispatcher's end |
| `receiver-and-refusal.md` | carrier | the receiver, the receiver table, the refusal arm |
| `js-unwrap.md` | carrier | the two wrappers' removal and the sites that call them |
| `failure-form.md` | carrier | what the boundary throws, unchanged by this unit |
| `parameter-semantics.md` | carrier | one row per declared position, seam, callback and returned member |
| `test-cases.md` | view | the valid states and fail-states, derived; **carries no new claim** |
| `implementation-plan.md` | carrier | what lands, in what order, verified how |

**Omitted, each with its reason:**

| Omitted | Reason |
| --- | --- |
| `property-register` | **the register is `§5` of this file**; a separate part would be a second home |
| `data-class-structure` | the unit introduces **no data class**: it renames dispatch and moves a carrier |
| `process-flow` | **no runtime flow changes**: the same verbs, records and failures |
| `census` | the unit's figures are counts of the unit's own members, stated at `§2` with their derivation |

**Closure predicate: `8 − 1 − 3 = 4` carrier parts and views, `1` index — `5` files, `5 = 5` ✓.**

---

## §1. WHAT THIS UNIT IS

1. **IT IS A REFACTOR.** **No verb's signature, arity, return shape or failure changes; no record's shape changes.** What moves is *how a verb is reached* — the dispatch, the store's address, and two JS indirections. **A consumer of the package cannot observe the change except in one named case (`§4`).**

2. **ITS THREE PARTS ARE ONE MECHANISM AND LAND AS ONE EDIT.** The dispatcher's arms, the integer index, the two JS wrappers and the three `state.id` sites are one apparatus: **a partial landing does not compile as behaviour.**

3. **IT LANDS SECOND, AFTER THE ADOPTION AND ITS FREEZE.** The freeze is its integration target, so the split is a change against a known ABI rather than a rewrite of live code.

4. **THE EXPORT SET MOVES `5 → 13`, AND THE COUNT IS CLOSED.** `4` surviving standing exports (`version` · `errorMessage` · `storeCreate` · `register`) plus `9` per-verb entries = `13`. **`call` is deleted — it was the dispatcher.** **`removeListener` gets its own entry**; it is a live arm the prior filing omitted. **`commit` is neither an export nor an arm**: it is `write`'s fourth *position*.

---

## §2. THE EXPORT SPLIT

**Clauses and the per-name table: `export-set-and-dispatch.md`.**

1. **ONE ENTRY PER VERB, EACH NAMED FOR ITS VERB.** The dispatcher's nine arms become nine entries: `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` · `commitFile`. **Each takes the verb's own arguments and nothing else.**

2. **THE DISPATCHER'S STRING INDIRECTION GOES.** Today a verb arrives as a JS string and is matched across nine arms; nothing shows as a debugger frame. After the split, the verb is the frame's name.

3. **ARITIES ARE UNMOVED.** Each entry takes what its verb took through the dispatcher: the arguments the JS side already built, with the instance position gone (`§3`).

4. **THE FAILURE FORM IS UNCHANGED AND IS NOT THIS UNIT'S TO MOVE.** See the sibling unit's part, **three members `{status, message, log}`, never an `Error`.** **`stack` is not part of the form and is NOT forbidden** — *added 2026-10-19 (`role_spec_writer`): the `stack` half of a *"never an `Error`, never a `stack`"* rule once stood here as LIVE and is STRUCK, as it has already been struck in `failure-form.md`, `parameter-semantics.md`, `test-cases.md` and this file's own `§7` `OWED` line; the prohibition is VOID, and `P-ADA-3` excludes `stack` from its failure list.* **The idiomatic library error path would breach it and is therefore forbidden on every refusal path.**

5. **THE WRITE PATH KEEPS ITS OWN ENTRY.** `write` carries a fifth position the others do not, so it is not a uniform case; its entry is stated with its arity like every other.

---

## §3. THE RECEIVER

**Clauses: `receiver-and-refusal.md`.**

1. **THE INTEGER INDEX DIES, AND THE RECEIVER REPLACES IT.** Today the store is found by a `u32` the package minted; after the split each entry resolves its store from the Node-API `this` receiver.

2. **ONE CONSTRUCTION IS ONE STORE IS ONE JS OBJECT.** The index was a lookup slot and never a store identity. **Two `storeCreate` calls remain two discrete stores**, and this change does not touch that.

3. **A CALL THAT NAMES NO LIVE STORE REFUSES, IN THE ONE DECLARED FORM.** This covers **both** a detached call and a call on a collected store: **one arm, one observable — the receiver names no live store.** `R: the TORN DOWN row`, part (6).

4. **NO MEMBER BINDING AND NO `WeakMap` RECEIVER LOOKUP.** Both were considered and both are withdrawn: binding exists only to support a listener that is itself a store member, **and that is not supported**; a `WeakMap` resolves through the same `this` and buys only legibility.

5. **THE ONE DECLARED COST, NAMED AS A REGRESSION AND NOT AS A DESIGN CHOICE: `const { read } = layout; read(…)` is legal today and throws after this change.** The closure made `this` irrelevant and the split does not.

6. **REBINDING A STORE'S FUNCTION IS UNSUPPORTED BREAKING BEHAVIOUR AND THE PACKAGE OWES NO GUARD FOR IT — REDUCED TO ONE LINE 2026-10-19 (`role_spec_writer`), ON THE ARCHITECT'S RULING: *"I know re-binding the JS surface is breaking behavior. Stop complaining about it. A consumer doesn't get to complain that they deliberately broke a package surface and it doesn't work right."*** **THE REDUCTION: the withdrawn second declared cost, the verbatim and the prior reading kept beside it, and the category-with-siblings construction all stood at this item and its `6·bis` sub-item and are REMOVED — the `6·bis` sub-item is gone and no eighth item takes its place. The observation that item 7 and `receiver-and-refusal.md §1` carry — the receiver is a ROUTING carrier and the index was unforgeable only because the caller never saw it, which is obscurity and not authority — is untouched and stands apart from any cost. `docs/decisions.md`'s own row for the ruling stands and settles it; see item 5 for the ONE declared cost.**

7. **THE RECEIVER TABLE NEEDS A RETIREMENT PATH**, because nothing is never-freed any more. **The table's form and its retirement are `OWED`** — see `§7`.

---

## §4. THE JS UNWRAP

**Clauses and the site table: `js-unwrap.md`.**

1. **TWO WRAPPERS ARE DELETED.** `index.mjs` has two entry wrappers, not one: the generic `call(state, verb, args)` and a separate `writeCall(state, args, fault)` that `write` reaches instead. **Each member then calls its own entry directly.**

2. **THE WRITE WRAPPER'S ARM IS PRESERVED.** Its `ValueNotAdmitted` arm is a **message re-render that throws** — not a fault sink — so it moves into the member's own body. **It must not be dropped.**

3. **`state.id` HAS THREE SITES AND THEY MOVE TOGETHER.** Two are inside the wrappers; **the third is on the registration path, outside both** — named here so a one-pass edit does not miss it.

4. **THE COUNTED SITES.** Nine `call(state, …)` call sites carrying eight distinct verb strings (`listen` appears twice), plus `writeCall`'s one. **A prior filing got this wrong twice; the count is stated with its terms so it can be checked rather than inherited.**

---

## §5. THE TYPED PROPERTY REGISTER — `8` rows, budget `≤ 8`

**`3 + 3 + 2 = 8` ✓.** Each row carries its property, its strategy ids and an explicit failure list. **Ids disjoint from every existing family** (`P-IM`/`P-SM`/`P-TP`, `P-SR`, `P-PUB`, `P-HL`, `P-ADA`).

**`P-SAS-1`** — **the addon's export set is exactly the thirteen declared names — `4` standing plus `9` per-verb — and `call` is absent.** Strategies: **`S-EXPORT-SET`** (read the addon's own key set; assert equality with the declared set, sorted). Failure list: `call` present; a verb missing; an undeclared name; `removeListener` absent. **AND THIS ROW IS THE KEY SET'S ONE HOME — ADDED 2026-10-19 (`role_spec_writer`): the key set moves `5 → 13`, so the golden's parity diff EXCLUDES the key-set cells and this row asserts the set directly instead** (`§6` item 2). **A key-set cell left in the golden's diff would fail by design and mask every other diff.**

**`P-SAS-2`** — **every entry takes its verb's own arguments, with no leading instance position.** Strategies: **`S-ARITY`** (call each entry at its declared arity and at ±1; the declared arity answers, the others refuse) · **`S-NO-INSTANCE`** (no entry accepts a `u32` at position 0 in place of its first real argument). Failure list: an index position accepted; a wrong arity answering; an arity differing from its verb's.

**`P-SAS-3`** — **each verb's result is byte-identical to the same verb's result through the old dispatcher.** Strategies: **`S-PARITY`** (drive both shapes over the same corpus, compare records member-for-member). Failure list: a record member moved; a value re-encoded; a different value decoded.

**`P-SAS-4`** — **a call whose receiver names no live store refuses in the one declared form.** Strategies: **`S-REFUSE-FORM`** (detach a member and call it; **and** call a member whose store has been collected — both refuse) · **`S-REFUSE-KEYS`** (the thrown value carries the three members and is not an `Error`). Failure list: a raw host `TypeError`; a partial record; a success; a throw carrying a member beyond the three **other than `stack`, which is not part of the form and is not forbidden**.

**`P-SAS-5`** — **the receiver table holds no entry whose store has been freed, and a freed store's entry is retired.** Strategies: **`S-TABLE-REMOVE`** (release a store; the table's entry is gone). Failure list: a surviving entry for a freed store; a retirement removing a second store's entry.

**`P-SAS-6`** — **`index.mjs` calls no wrapper that the split deletes, and every member reaches its own entry.** Strategies: **`S-UNWRAP-SITES`** (grep for the deleted wrapper names; zero live call sites) · **`S-STATE-ID-GONE`** (grep for `state.id`; zero occurrences). Failure list: a surviving wrapper call; a surviving `state.id`; a member calling another verb's entry.

**`P-SAS-7`** — **the JS unwrap changes no observable: the same call answers the same thing before and after.** Strategies: **`S-UNWRAP-PARITY`** (drive the suite's calls against both shapes). Failure list: a changed return shape; a changed failure; a changed arity read.

**`P-SAS-8`** — **the `write` wrapper's `ValueNotAdmitted` re-render survives the deletion.** Strategies: **`S-FAULT-ARM`** (drive a value the walk refuses at a store that answers `ValueNotAdmitted`; the rendered message appears). Failure list: the raw refusal reaching the caller; the arm dropped.

---

## §6. THE STATES A DRIVE DERIVES, AND THE GOLDEN

**The derivation lives at `test-cases.md`.**

1. **THE REPLACEMENT WITNESS IS A GOLDEN CAPTURE.** The standing suite does not witness this change: the Rust cells drive the core, and the node cells drive the boundary *through* `index.mjs` as a means rather than a subject. **The golden captures the pre-rewrite suite's case-level output — before the split, against the FROZEN artefact — and diffs it case by case after.**

2. **AND WHAT THE GOLDEN COMPARES EXCLUDES THE KEY-SET CELLS — ADDED 2026-10-19 (`role_spec_writer`).** **THE RULE: THE GOLDEN COMPARES EVERYTHING EXCEPT THE CELLS THAT READ THE ARTEFACT'S KEY SET.** **The artefact's key set moves `5 → 13` between the capture and the diff**, so a naive parity diff fails BY DESIGN on exactly those cells: **the key set IS the change**, and `P-SAS-1` asserts it directly as its own property. **A parity diff that included it would fail for the RIGHT REASON and mask every OTHER diff** — which is the failure mode this rule exists to prevent. **The key-set cells are excluded from the diff and carried by `P-SAS-1` alone; every other cell is compared as it stands.** **An absent artefact is a separate case and is priced at `implementation-plan.md §6` item 1.**

3. **THE CASE IDENTITY IS THE HARNESS'S OWN `test('<id> — …')` LITERAL.** Never an ordinal; **never anything taken from the rebuilt `.node`** — the artefact is what changes, so an identity derived from it would compare the change against itself.

4. **THE CAPTURE NAMES ITS INVOCATION AND ITS SEED, AND RECORDS WHICH CELLS RAN AND WHICH SKIPPED.** The artefact-dependent cells skip when no `.node` exists, and a skip that becomes a run is a diff and not noise.

5. **THE GOLDEN'S OBLIGATION: each new entry has at least one cell driving it.** This is the same obligation as the calibration defect below, and it is stated once — *(a second statement of this claim once stood at `receiver-and-refusal.md §1` and was REMOVED 2026-10-19, `role_spec_writer`: one obligation, one home.)*

6. **THE TWO CALIBRATION DEFECTS ARE IN SCOPE.** The green runner declares a constant naming the addon's export table and **never uses it** — so under this change the runner stays green while the real table moves. **And a live pin elsewhere asserts the five-name table.** **Both are the same obligation as item 5 and are repaired with it — and items 5 and 6 are that obligation's whole statement, ADDED 2026-10-19 (`role_spec_writer`): it once stood a third time at `receiver-and-refusal.md §1`, which was one claim with three homes.**

---

## §7. WHAT THIS UNIT DOES NOT SETTLE

- **`OWED` — the refusal arm's `status` token and its `message`.** **The arm's SHAPE is decided and drives are authorable** (`P-SAS-4` asserts shape, member count and non-`Error`-ness — **and NOT a `stack`, which is not part of the form and is not forbidden** — **and never the token**). Which member of the store's closed set, and the message text, is `role_spec_writer`'s. **REVISIT CONDITION: this unit's arm is authored and names a member of the store's closed status set — the choice is taken here and this bullet is discharged by it.** *(owner and revisit condition stated in this bullet's own sentence, 2026-10-19, `role_spec_writer`; the `§7` list is the three `OWED`s' one home.)*
- **`OWED` — the receiver table's form and its retirement mechanism.** The requirement is decided (`§3` item 7); the structure is not. Owner: `role_implementer`. **REVISIT CONDITION: the retirement path is landed and `P-SAS-5` drives it green — a retirement that removes a second store's entry is the failure the row exists to catch** (`implementation-plan.md §2`, step `4`). *(owner and revisit condition added 2026-10-19, `role_spec_writer`.)*
- **`OWED` — the freeze it consumes.** Produced by the adoption unit's landing pass; this unit cannot begin before it exists. Owner: the adoption unit's step `2` (`role_implementer`). **REVISIT CONDITION: the adoption unit's step `2` asserts its first build of both artefact kinds and records the three figures on the gate record — this unit's step `1` cannot start before that record exists.** **NAMED ONCE, CONSISTENTLY: the sibling unit's `§7` names the same owner and the same step for these three figures — *step `2`, THE LIBRARY AND THE ABI*, whose owner is `role_implementer`** (`docs/specs/storeroom-addon-adoption/contract.md §7`; `implementation-plan.md §4`). *(owner and revisit condition added 2026-10-19, `role_spec_writer`; corrected the same day — this bullet read *"the adoption unit's landing pass"*, the very phrasing the sibling's `§7` reconciliation removed, so the two named one step by two names. Both now name step `2`.)*

---

## §8. THE GATE CHAIN

Step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4 `role_change_analysis`. **Gate 2's rule: a code task is delegable once this contract exists and the reviewer loop returned an empty list — or parked the remainder with a decision record.** Gate 3 is the red set, authored from this contract alone.

**END OF THE CONTRACT.** **`§2` items 1–5 · `§3` items 1–7 · `§4` items 1–4 · `§5` rows `P-SAS-1`…`P-SAS-8` · `§6` items 1–6 · `§7` — and the four carrier parts this file names.** **(`§3`'s `6·bis` sub-item and item 7's carry-over were both REMOVED 2026-10-19 (`role_spec_writer`); `§3` is seven items and no sub-item, and no other section moved.)**