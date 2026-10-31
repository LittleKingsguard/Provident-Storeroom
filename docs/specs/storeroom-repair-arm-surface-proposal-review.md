# GATE 1 RECORD — the repair arm's shipped surface (`U-STOREROOM-REPAIR-ARM-SURFACE`, provisional id)

- **STATUS: PASSED — `APPROVE-WITH-CONDITIONS` · `DELEGABLE`, with the split fraction CARRIED (`§4`, `§8`).** Compiled in the compile-horizon-review shape: status (this head) · what the proposal asks (`§1`) · feasibility verdict (`§8`) · gaps and costs/benefits (`§3`'s table, `§5`'s close).
- **Date:** 2026-10-30. **Branch:** `main`. **Unit:** `U-STOREROOM-REPAIR-ARM-SURFACE` — a unit id PROPOSED by this record; its prefix is the architect's to file, and none is minted here.
- **Source:** `Provident-Electron` · `strata/records/store-tabs-record-unit.md` `§1`, finding **`ST-F1`**, filed in that project's **`D-5` FOUR-PART SHAPE** (SYMPTOM · REPRODUCTION · SUSPECTED ROOT CAUSE · PROPOSED FIX SHAPE); `§2` (what the consumer does until it lands) read at its bytes.
- **Artifact under review is a REQUEST, not a filing:** it carries no contract text, no signature, no clause and no id of its own.
- **Steps folded, not re-printed:** step 1 (validity) `VALID-WITH-CORRECTIONS` · step 2 (critique) `SURVIVES-WITH-CONDITIONS` · step 3 (architecture) — its decomposition row is **carried as issued** at `§4`, its site map at `§5`.
- **Files this pass wrote, and no other repo byte:** this record. **`strata/decisions.md`'s uncommitted `D-84` entry was not touched**; no ruling is minted and no tracker row is opened.
- **Correction to this pass's own input list, at bytes:** `docs/decisions.md`, `docs/pending.md`, `docs/defects.md` and `docs/next-steps.md` are **archived** (`strata/brief.md:377-379`) and are cited **by identifier** (`A110`, `PAR-C-8`, `DEF-…`); the **live** ruling file is `strata/decisions.md`.
- **Layers:** `[T]` a text claim read at its own bytes, its path/line named · `[M]` a path or figure measurement. **No runtime claim is made here and none is claimable: nothing was run** — no build, no test, no shell, no git verb.

---

## §1 · The request read in its own `D-5` four-part shape

### Part 1 — SYMPTOM, as filed, then at bytes

**As filed:** *"`provident-storeroom` documents three answers a constraint body may give — pass, **repair**, rejection — and ships the shape of two. `true` is declared the only pass value and an object carrying `message` is shown as the rejection (`index.d.ts`'s `Constraint` docblock; `README.guide.md` §7.7's `landing-page-must-stand` example), while a repair is described only in prose."*

**Corrected `[T]`, four readings, each at its byte:**

1. **The `Constraint` docblock declares ONE arm and carries NO `{message}` literal.** `bindings/js/index.d.ts:1168-1177`: its whole answer sentence is *"read for its answer (`kernel-surface.md §2.3` item 1: `true` is the only pass value)"* (`:1172-1173`). **The `{message}` rejection literal the symptom attributes to the docblock stands ONLY in the guide** — `docs/guides/package-use.md:1053-1065`, a `… ? { message: 'the landing page is not removable' } : true` body.
2. **That example is `§7.8`'s, not `§7.7`'s.** `§7.7` starts `:1013`; `§7.8` starts `:1032`; the fenced example stands inside `§7.8`. **The repair prose the request quotes is `§7.6`'s** (`:979-990`, the "a repair that lands somewhere else" case).
3. **The arm has THREE levels, and the request names one.** The archive's one print is `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/kernel-surface.md:481-487`: `true` (pass) · `{ repair: RepairFn, message: string }` (repairable violation) · `{ message: string }` (unrepairable violation). **Two arms are the SHAPE OF THE CONSTRAINT'S RETURN; the third level is the one-level-down shape of the REPAIR'S OWN RETURN**, printed live at `docs/specs/storeroom-constraints/contract.md:558` (`PAR-C-8`'s arm `(b)`: *"its own return carries `{ok: true, op}`"*). So the shipped surface is missing **one attach and one result**, not "one return".
4. **The finding survives with the symptom SPLIT IN TWO, and this split is the substantive correction:** the GUIDE prints two of three outcome arms with literals; the DECLARATION prints one arm and **cites the other two to a path** (`:1172`). Validity's finding stands; its locus moves from "both sites are thin" to "one site is thin and one site is a dangling citation".

### Part 2 — REPRODUCTION, as filed, then at bytes

**As filed:** *"`grep -c 'repair:' index.d.ts README.guide.md` → **0 and 0**; the `Constraint` type is `(context: unknown) => unknown`; the four mentions of "repair" in `index.d.ts` are prose about journal commit lists."*

**Corrected `[T]`/`[M]`:**

- **`0` and `0` CONFIRMED**, and `Constraint = (context: unknown) => unknown` CONFIRMED (`:1177`) — so the answer's shape is untyped at the position the kernel reads it. **`README.guide.md` is the GENERATED landing of `docs/guides/package-use.md`, not an authored site** (`scripts/publish.sh:112-120`: the canonical file is the guide, the landing is copied byte-for-byte); **the two are byte-identical at `2177` lines, md5 `69db1065f9de8e956b3e178522a02697`.**
- **The four `repair` sites are `:122`, `:364`, `:389`, `:433`, and the request's characterisation is close but not exact:** `:122` is the file's own **PROHIBITION** sentence (*"NO constraint or repair seam"*), `:364` and `:433` are journal-commit and refusal prose, and **`:389` is a `LogEntry.kind` LITERAL** (`'constraint-check' | 'repair-run' | …`) — a journal spelling, not prose and not the body's return. `:362` additionally carries *"Constraints/Repairs"*. **No site of the four is the body's return.**
- **The decisive measurement the request omits is not a grep but a POSITION.** The undiscoverable half is the **ATTACH**, not the return: `{ repair, message }` is **two own members on the refusal object**, and the kernel's gate is `Object.hasOwn(outcome, 'message')` with `ownMember(outcome, 'repair')` read only inside that branch (`bindings/js/src/entry/kernel-attempt.mjs:686-699`). **So a `{repair}`-only return is answered by the kernel's own `unrecognized` sentence and its repair is never read** — the pair falls to arm `(c)`, not `(b)`. **`message` is REQUIRED at the attach.**

### Part 3 — SUSPECTED ROOT CAUSE, as filed, then at bytes

**As filed:** the three arms are declared in `kernel-surface.md §2.3`, which the docblock cites, *"and which is **not shipped with the package**"*.

**Corrected `[T]`, and the correction RAISES the defect rather than narrowing it:** the cited path **resolves to no live path at all** — the live tree carries no `kernel-surface.md`, and the archive that holds it is **gitignored** (`.gitignore:180`, `archive/`) and **cited by identifier** by this repository's own convention (`strata/brief.md:377-379`). **So a SHIPPED declaration cites a path that resolves for no audience: not the consumer, and not this repository.** A wording fix that leaves `:1172`'s citation standing leaves the defect live; **the citation repair is part of this unit's work, not an aside.**

**One thing the root cause must NOT overclaim:** the repair RESULT's shape is **not** missing from the live corpus — `contract.md:558` prints it, and `storeroom-constraints/contract.md` is one of the **nine kept contracts**. Only the **three-arm outcome** has no live print.

### Part 4 — PROPOSED FIX SHAPE, as filed, then at bytes

**As filed:** *"documentation only, and nothing behavioural (D-24): state the repair's return shape in `index.d.ts`'s `Constraint` docblock beside the pass and rejection sentences, and add one repair example beside the `landing-page-must-stand` example at guide §7.7."*

**Corrected `[T]`:** the example is at **`§7.8`** (§1 part 1, reading 2); the authored guide is **`docs/guides/package-use.md`**, and `bindings/js/README.guide.md` is a **generated landing** that `scripts/publish.sh` restores and the release preflight **refuses on drift** — an edit landed there alone is a refused build, not a documentation change; and **"the repair's return shape" alone does not make a repair writable.** A consumer needs the **attach** (`{repair, message}`, `message` required), the **result** (two arms, `PAR-C-8`), and the **one argument the repair is handed** (six members, `pending` among them). **That is why the request's fix shape does not survive as written** (`§3`) and why step 3's site map carries three points instead of two.

**And a citation collision this record must not paper over:** the request's `D-5` and `D-24` are the **CONSUMER's** rulings, and **this project's `D-5` and `D-24` are different rulings** (`strata/decisions.md`: the strata preset's test-role scopes; *"the handle IS the `id`"*). **No clause of this unit may quote the consumer's `D-…` unqualified** — the series must be named, or a reader resolves the request's own ground to the wrong ruling, which is the same defect this unit exists to close, one level up.

### The two parts the `D-5` shape is missing, SUPPLIED here

**5 — OBSERVABLE / acceptance (absent from the request).** A consumer reading **only** the shipped pair can (a) write a constraint that returns a repair, (b) have the kernel read it, and (c) have its edit credited — **the credit being `receipt.op` when non-`null`** (`bindings/js/index.d.ts`'s `DeleteRecord.op: JournalOp | null`, `D-43` item 3: an `op: null` delete credits nothing, so a delete-shaped repair credits only a non-`null` op). Checkable at bytes: the docblock carries all three outcome arms and both result arms in a dated clause; the guide carries one fenced example beside the shipped one; **the example's exact bytes drive green once through the published entry** (`§7`, gate 6); **both guide copies stay byte-identical** after the landing.

**6 — OWNERSHIP / route (absent from the request).** Supplied by this record: **the CONSUMER owns the finding and the acceptance** (it is the party who cannot implement, and `§2` of its record states exactly what it cannot do); **the SUPERVISOR owns the split disposition**; **the ARCHITECT owns the fraction's content** — *"No role in this workflow owns the spec corpus — the nine kept contracts are declared inputs, deliberately unowned"* (`strata/decisions.md` `D-3`, `:265-268`); **gate 2's spec writer owns the wording, and this record drafts none of it.**

---

## §2 · Step 1 (validity) disposition

**Token `VALID-WITH-CORRECTIONS` CONFIRMED, and one correction is ADDED by this pass.** The corrections that changed the gate's state, cited by part rather than re-printed: the **single-arm docblock with no `{message}` literal**, the **`§7.8`-not-`§7.7` example**, the **three-level arm structure**, **guide-vs-landing authorship**, the **unresolvable citation**, and the file's own **prohibition sentence** (`§5` resolves it) — read with the stale header at `:125-129` (below). **Step 1's understated root cause is corrected at `§1` part 3:** the citation does not merely point at an unshipped document; it points at a **path that resolves for no audience**, and the live corpus **does** print the result shape. **Added by this pass:** the request is **incomplete by its own `D-5` standard**, and the two missing parts are supplied at `§1`.

---

## §3 · Step 2 (critique) disposition

**The FINDING SURVIVES; the PROPOSED FIX SHAPE does not survive as written** — token `SURVIVES-WITH-CONDITIONS` CONFIRMED, and this record takes step 2's four blocking classes as the gate-changing content. **One step-2 claim is corrected here** (`§1` part 2's position reading, measured at `kernel-attempt.mjs:686-699`), and one step-2 contrary claim is at its own date only: **a delete-shaped repair IS reachable** — `DeleteRecord.op: JournalOp | null` (`D-43` item 3) lets a `delete` credit a non-`null` op, so the archive's `RC-1` sentence (*"`DeleteReceipt` carries no op member"*) stands **as the reading of its own date and is read through the shipped member.**

| `class` | `site` | what is measurably wrong | severity |
|---|---|---|---|
| `REQUEST-FALSE` | the symptom's attribution | the undiscoverable half is the **ATTACH** (`{ repair, message }`, own members on the refusal object), not the return; the repair is never reached without an own `message` (`§1` part 2's position reading) | **BLOCKING for the fix shape** |
| `OMITS-A-FAIL-ARM` | the fix's "the repair's return shape" | `PAR-C-8`'s fail arm is `{ok: false, message}`, and an `{ok:true}` return with no op — or an op not the one it landed — **also** fails `KC-4`; an outside form is read as a failed repair (`kernel-foundations.mjs:1105-1131`). **A repair body's throw is caught AT THE REGISTRATION INSTANT and converted into the registration's refusal** (`kernel-registration.mjs:498-505`), unlike a write's, where the body's own throwable crosses unconverted | **BLOCKING** |
| `SCOPE-TOO-NARROW` | the fix's two-point scope | the repair is handed a **six-member** context and its `pending` member is the commit vehicle its own write joins (`kernel-attempt.mjs:756-782`; `kernel-registration.mjs:387-398`) — and that context is what the consumer's own `§2` next step needs | **BLOCKING for the consumer** |
| `CITATION` | the fix's "edit the guide" | the landing is **generated** and `scripts/publish.sh` **refuses** byte drift; and `archive/` is gitignored, so an archived path resolves for no audience | **BLOCKING as a route** |
| `STALE-ADJACENT` | `index.d.ts:125-129` | the header still claims *"NOTHING IN THIS REPOSITORY TYPE-CHECKS THIS FILE"*, while the root `package.json:8` stages `package.json` + `index.d.ts` into `typecheck/node_modules/provident-storeroom` and `tsconfig.typecheck.json:87` includes `typecheck/**/*.ts` | **NAMED ADJACENT FINDING — not bundled** (`§10`) |

---

## §4 · THE DECOMPOSITION ROW — nine columns, as step 3 issued it, DISPOSITIONED here

| key | recommendation | fraction | boundary | remainder | disposition | decider | revisit | ground |
|---|---|---|---|---|---|---|---|---|
| `decomposition` | **`SPLIT-RECOMMENDED`** | **the live CONTRACT corpus's three-arm outcome**: one dated clause beside `docs/specs/storeroom-constraints/contract.md` `§5.4` `P-SM-4`'s arm `(b)` at `:556-558`, **plus a citation repair for the two archived files that clause cites by bare name** — **`docs/specs/<unit>/contract.md` + its parts, ONE pass** | **excludes every shipped site** (`bindings/js/index.d.ts`, `docs/guides/package-use.md`, `bindings/js/README.guide.md`, both `RELEASE-NOTES.md`, `bindings/js/README.md`) | **the shipped pair** — the `Constraint` docblock + the authored guide, **with its generated landing** | **REMAINDER LANDS AS ONE UNIT NOW / FRACTION CARRIED** | **the SUPERVISOR for the split; the ARCHITECT for the fraction's content** (no role owns the spec corpus — `strata/decisions.md` `D-3`) | **the fraction re-opens at gate 2 of this unit; the remainder never waits on it** | step 3's issued row, carried whole |

**What the architect is asked at this gate's pause, and nothing more:** **the go-ahead for the remainder** (`§10`), **and the fraction's content decision — who authors the three-arm outcome's dated clause and the two archived-citation repairs.** Both are on the pause; neither is decided by this record.

---

## §5 · The unit's scope

**Site map, in the order the pass walks it** (step 3's, carried):

1. **`bindings/js/index.d.ts` — the `Constraint` docblock, one dated clause appended INSIDE the block, before its close at `:1176`.** The clause is read through the block's existing sentences, which stand byte-for-byte.
2. **`docs/guides/package-use.md` — `§7.6`, one dated clause after the read-rule clause that closes at `:990`** — the section whose subject **IS** *"a repair that lands somewhere else"*, which the request itself quotes (`§1` part 1, reading 2). The example lands **beside** the shipped `landing-page-must-stand` example (`§1`), not inside it.
3. **`bindings/js/README.guide.md` — the GENERATED landing, restored by `scripts/publish.sh`, never hand-edited.** The landing pass runs the publish path; the file is a product.
4. **`bindings/js/README.md` — NO sentence owed, and the ground is stated because the file does discuss constraints:** its declared scope is the member set, the status set and the config keys (`:67-71`, `:107-112`), and its two repair mentions are the commit's log and a failed repair's rollback (`:156-157`, `:240-245`) — **never an arm literal**. **A shape sentence here would be a SECOND HOME for the guide's clause**, which this record's one-home discipline refuses.
5. **`RELEASE-NOTES.md`, both copies — NO row:** **no behaviour byte moves**, and a notes row for a documentation clause is a claim the release record does not carry.
6. **`strata/decisions.md` — NOT WRITTEN.** `D-84` stands untouched and **this unit mints no ruling**: no identifier here is new, and no reading here is the architect's.

**Append-only landing (`RCA-8(g)`):** every existing clause stands byte-for-byte and is read through the new one. **No move-out is owed at any of the six sites.**

**The three content levels, fixed so gate 2 does not re-decide them:**

- **DECLARE:** the **three outcome arms** (`true` · `{repair, message}` · `{message}`) and the **two result arms** (`{ok:true, op}` · `{ok:false, message}`).
- **POINT AT, do not re-declare:** the **own-member rule** (`D-35`'s read half) and the **credit ground**; the **six-member context and its `pending`**, via `write`'s declared fourth position (`index.d.ts:837-845`) and `CommitRecord.pending` (`:743-772`).
- **LEAVE OUT:** `PAR-C-8`'s outside-form enumeration, and the context's member census — both re-derivations this unit does not owe and would have to keep true.

**The `:120-123` collision, resolved and stated as the operative reading:** **the prohibition row governs *declaring*, not *documenting*.** *Declares* = binds a type or a symbol; *documents* = says what a kernel-read value looks like. **Both stay true iff the unit MINTS NO TYPE and `Constraint` stays `(context: unknown) => unknown`** — so the added clause documents an own-member pair the kernel reads and introduces no symbol, no export and no seam.

**COSTS AND BENEFITS, in one place (the review's own answer to "is this a good idea, on balance"):**

| | |
|---|---|
| **costs** | one dated clause in a shipped declaration and one in the guide, plus a landing pass and one scratch drive; a docblock that grows where the file is already dense; and a citation repair that must not disturb `:1172`'s neighbours. **No behaviour byte, no export, no type, no notes row.** |
| **benefits** | the third arm becomes producible from the shipped pair alone; **the ATTACH becomes discoverable**, which is the half that actually blocks the consumer; the consumer's own `§2` boundary copy becomes redundant on its own schedule, not this unit's; and a dangling citation in a SHIPPED file is closed. |

---

## §6 · STEP 0 — the adoption-semantics block

- **`STEP 0 run:` YES — and the trigger DOES NOT FIRE. `ZERO-ROW EXEMPTION` taken on the written rationale below.**
- **The trigger, tested against the unit's DECLARED SURFACE** (the identifiers the clause would NAME — `repair` · `message` · `ok` · `op` · `pending` · `RepairContext` · `PAR-C-8`), not against the provenance of the ask: **every one of those identifiers is THIS project's own, declared in its own corpus and read in its own kernel source** — `repair`/`message` as own members of the outcome object (`kernel-surface.md §2.3` item 1's arm, archived; read at `kernel-attempt.mjs:690-696`); `ok`/`op`/`message` as `PAR-C-8`'s arm members (`contract.md:558`); `pending` as `CommitRecord`'s fourth member (`index.d.ts:743-772`); `RepairContext` as the kernel's own declared shape, six members, `5 + 1 = 6` (`kernel-registration.mjs:369-398`, asserted in `tests/e2e/blind-constraints-unit.test.mjs:202`); `PAR-C-8` as a row of this project's own parameter-semantics corpus. **The REQUEST is external; the REQUEST minted no identifier** — `ST-F1` proposes no name, no member and no token, so nothing in the adopted set originates outside `Provident-Storeroom`.
- **`Dossier path:` `NOT TRIGGERED`** — a zero-row dossier is lawful only for a unit adopting no externally-sourced identifier, and this is that unit: **the shipped surface it documents is entirely its own, and the ask's own vocabulary arrives only as PROSE pointing at identifiers that already exist here.** **No adoption dossier is authored and none is owed at gate 1.**
- **`Dossier content-hash snapshot:` `n/a`** — there is no dossier to snapshot; the exemption's ground is the paragraph above, not a missing file.
- **`Open rows:` `none`.**
- **`Open-semantics list:` `none`** — no identifier stands `undefined-until-answered`, and no overflow exists to park. **This is why `BLOCKED-ON-SEMANTICS` is unavailable as this record's token.**
- **Collision check, performed against the consuming project's prohibition rows even on the exemption path:** the one hit is **`index.d.ts:120-123`** (*"NO constraint or repair seam"*, `distribution.md §5.2` item 4's finding rule). It is **RECONCILED by the `declares`-versus-`documents` reading printed at `§5`** — reconciled, not re-named, and the row's own bytes are unmoved.
- **`Architect answers this pass:` NONE WERE GIVEN, and none was needed for the semantics block.** The rulings this record reads are **pre-existing** (`D-3`, `D-35`, `D-43`, `D-50`, `D-53`, `D-56`, `D-65`, `D-66`, `D-77`), and this pass takes **no ruling of its own**: it folds three steps, dispositions the `decomposition` row, and escalates at the existing pause (`§10`).
- **`Effect on the verdict:` `NOT BLOCKING`.** The row limb is lawfully empty and the open-semantics list is empty, so **nothing here forbids the delegable word**; `§8`'s conditions are gate checks and none of them is a semantics question.

---

## §7 · Unit class, and which gates bind it

**Class: DOCS-ONLY, NOT CODE-BEARING.** The unit edits two prose artifacts and their generated landing; no `src/**`, no `tests/**`, no `bindings/js/index.mjs`.

- **Gate 11 (PBT) — ZERO-ROW EXEMPTION, with its reason:** the unit carries no executable predicate: it declares no invariant over generated inputs, and the properties `PAR-C-8` and `P-SM-4` own are **already carried by the constraints unit's own register**. A generator aimed at prose would test the prose's truth, which is gate 6's documented-vs-code check, not PBT.
- **Gate 5 (blind greens) — NONE OWED, and none lawful to add:** the blind writer sets expectations before behaviour exists; **this unit moves no behaviour byte**, so a blind cell would be written against nothing that can turn. Adding one would be a false battery row.
- **Gate 6 (live battery) — split by object:**
  - **The DOCUMENT's battery is STRUCTURALLY NON-EXERCISABLE:** no cell can read a docblock's sentence, and `tests/e2e/**` reaches the kernel, not a guide. **Recorded as `NON-EXERCISABLE`, not as `SKIPPED`.**
  - **The EXAMPLE is owed ONE drive** — its **exact bytes** through the **published entry** as a **SCRATCH DRIVER**: no committed test, no test file touched, and it stands **beside the untouched `tests/e2e/repair-in-commit.test.mjs`**, which continues to drive the repair's commit behaviour.
- **Gate 2 (spec gate) — the unit needs its contract DIRECTORY before any writer role is delegated:** `docs/specs/<unit>/contract.md` **plus its parts, in ONE pass**. **A writer delegated against prose alone would have to invent the semantics this record declines to mint.**

---

## §8 · VERDICT

**`APPROVE-WITH-CONDITIONS` · `DELEGABLE`** — and **the split fraction is `CARRIED`** (`§4`): the remainder lands as one unit now; the fraction waits on the pause.

**Why this token, one sentence each.** **`REJECTED`** — unavailable: the intent (a consumer able to produce a repair) is served by the shipped pair alone, and nothing structural must move. **`FLAWED`** — unavailable *as this record's token*: the request's own fix shape fails, but the **unit under it survives**, its subject is already declared in the live corpus (`contract.md:558`), and the corrected shape is decidable from the tree. **`BLOCKED-ON-SEMANTICS`** — unavailable: `§6`'s row limb and open-semantics list are both empty. **`PROCEED`** — unavailable: the request's shape cannot land as written, and `§3`'s four blocking classes each owe a check at a later gate.

**Conditions — each one a check at a named later gate:**

1. **Gate 2:** the contract directory lands in ONE pass — `contract.md` plus its parts, no shipped site edited.
2. **Gate 2:** the clause DECLARES three outcome arms and two result arms, and pins the ATTACH.
3. **Gate 2:** the clause states that a `{repair}`-only return takes the `unrecognized` path.
4. **Gate 2:** no type is minted and `Constraint` stays `(context: unknown) => unknown`.
5. **Gate 3:** the guide clause lands in `§7.6` only; `§7.7` and `§7.8` bytes stay unmoved.
6. **Gate 6:** the example's exact bytes drive once through the published entry, scratch only.
7. **Gate 6:** the documented-vs-code re-read at the four named source ranges (`§9`).
8. **Gate 10:** `bindings/js/README.guide.md` is restored, never hand-edited; both copies stay byte-identical.

**What would move this token.** **`FLAWED`** — if the three arms had no declared print in the live corpus and the unit had to MINT a semantic, or if the credit ground turned out undetermined. **`BLOCKED-ON-SEMANTICS`** — if any identifier this unit names turned out to be externally sourced, or if the `message`-required attach rule were undetermined by the tree (it is measured, `§1` part 2).

---

## §9 · THE IMPLEMENTATION PLAN (prospective steps; PLAN, not contract claims)

These are **planning steps, not declarations**; they are reconciled to the contract and dated once the contract lands at gate 2.

| # | what it builds | how it is verified |
|---|---|---|
| 1 | the unit's contract directory (`contract.md` + parts, ONE pass) | gate 2's own completeness check: every site of `§5` named, every level assigned, `:120-123` reconciled |
| 2 | the docblock clause, appended inside the block | the trio read at bytes: three outcome arms, two result arms, the attach, the no-new-type rule |
| 3 | the guide clause in `§7.6` and the one example beside the shipped one | `§7.7`/`§7.8` bytes unmoved; the example fenced and self-contained |
| 4 | the landing | `scripts/publish.sh` restores `bindings/js/README.guide.md`; **both copies byte-identical after the landing**; the preflight's drift guard green |
| 5 | the documented-vs-code check — **the one place the plan can be falsified** | re-read against `kernel-attempt.mjs:677-699` (the attach and its own-member gate) and `:859-886` (the result's two arms and the `KC-4` fall-through), `kernel-foundations.mjs:1105-1131` (the credit ground), `kernel-registration.mjs:470-524` (the registration-instant repair, its refusal and the throw conversion) |
| 6 | **the one scratch drive** | the example's exact bytes through the published entry; the repair is read, its edit lands, its op is credited; no committed test, `tests/e2e/repair-in-commit.test.mjs` untouched |

---

## §10 · What this record does not decide, and the pause

1. **It decides no wording.** No docblock and no guide prose is drafted here; **gate 2 owns the sentence**, and a draft here would pre-empt the contract.
2. **It decides no ruling and mints none.** `D-84` stands untouched; no identifier, no token, no tracker row.
3. **It does not decide the fraction** (`§4`): **the three-arm outcome's dated clause and the two archived-citation repairs belong to the architect's pass**, not to this one.
4. **It does not fold the stale header** (`:125-129`) into this unit: that claim is a **NAMED ADJACENT FINDING**, parked with a revisit condition — **revisit at gate 6 only if the clause's added sentence touches the file's limits clause**, and otherwise it waits for a unit of its own.
5. **It does not read the consumer's `§2` as a commitment.** What the consumer does until this lands is the consumer's boundary copy, retired on the consumer's schedule.

**THE PAUSE.** **Two things are asked of the architect, on this gate's existing pause and not on a new one: the GO-AHEAD for the remainder, and the FRACTION's content decision.** **Nothing in this unit proceeds past gate 1 until the go-ahead is given** — a passing review plus the architect's word is what admits gate 2, and the word is not this record's to write.

---

## `§11` · DONE — the unit's record of its own pass, appended 2026-10-30, the tracker home the architect named

**STATUS: DONE — the unit shipped. Gates 1–4 and 7–9 passed, 5 and 6 are recorded as owed-or-not-owed rather than passed, 10 and 11 are discharged by this section, 12's layer statement is below.**

**Gate 1** — `APPROVE-WITH-CONDITIONS` · `DELEGABLE`, eight conditions, all discharged against the sites named in `§8`; the architect's go-ahead is the admission this pass ran on.
**Gate 2** — the unit's contract directory stands at four files (`contract.md` + `sites.md` + `claims.md` + `verification.md`), part-map closure `3 = 3`, `PIN-1`…`PIN-10`, `STEP 0` zero-row exemption with its rationale.
**Gate 3 — no red set exists by construction** (docs-only; `contract.md §3`). Green: TWO dated clauses landed and the landing regenerated — `bindings/js/index.d.ts` `69` insertions / `0` deletions (the clause inside the `Constraint` docblock, `:1177`–`:1244`, the type line `:1245`, the file `1,253` lines); `docs/guides/package-use.md` `45` / `0` in `§7.6` from `:992`, the file `2,222` lines; `bindings/js/README.guide.md` `45` / `0`, regenerated only by `scripts/publish.sh`, `cmp`-identical, same line count.
**⟶ RE-MEASURED AT THE GATE-8 DOCUMENTATION REVIEW, 2026-10-30: THREE OF THE FIGURES ABOVE ARE ONE SHORT.** At the tree's bytes of this date the docblock's own close is the `*/` on `:1245`, the type line `export type Constraint = (context: unknown) => unknown;` stands on `:1246`, and `bindings/js/index.d.ts` stands at `1,254` lines — `1,185 + 69 = 1,254` ✓, the twin's last pre-landing reading at `docs/L1/modules.json:851` plus this unit's `69` insertions, which are themselves unmoved and re-read TRUE. **The clause's own range `:1177`–`:1244` is unmoved and TRUE; the guide's `§7.6` clause from `:992` and its file `2,222` lines are unmoved and TRUE; `README.guide.md`'s `45` / `0` and its `2,222` lines are unmoved and TRUE, and its tail's self-count reads FIVE at `:2222`.** The three short figures are read THROUGH this mark, and their ONE home for the file count is `contract.md §4` item 5.
**Gate 4 — five passes, `SHIP` on the fifth.** Pass 1 `DO-NOT-SHIP` (four blocking: the identity claim between the two evaluation records; the universal `KC-4` sentence; the contract's unrunnable reproduction; the guide's self-count falsified) · pass 2 `DO-NOT-SHIP` with all six earlier findings CLEARED and three new ones (the stale beside-address claim; the unscoped `message` consequence; the `typeof` discriminator) · pass 3 `DO-NOT-SHIP` with two of three CLEARED and the frame sentence found false about its own section, the floor plan's two skip arms dropped, and a repair's surviving edits mis-stated · pass 4 `DO-NOT-SHIP`, the arm taxonomy itself proved false of `floorCallPlan` and duplicative of `§5.4` · pass 5 **`SHIP`, no conditions**, the taxonomy withdrawn from the spec and the shipped item replaced by a pointer. **Every finding of every pass was a host-fix or a spec-fix; no package defect was ever patched from here.**
**Gate 5 — none owed** (nothing can turn; recorded at `contract.md`). **Gate 6 — the document's battery is `NON-EXERCISABLE` (recorded, never `SKIPPED`); the ONE scratch drive the example owes RAN**, in `/tmp` and never as a committed test: `written.op = {"opId":"op-3","kind":"write","address":["b"],"tier":"mem","before":{"present":false},"after":{"present":true,"value":11},"seq":3,"compacted":false}` · `store.read(['a']) = 2` · `store.read(['b']) = 11`. `tests/**` carries no byte of this unit.
**Gate 7** — the proofreader fixed seven stale prints across the two units (pin count, the `index.d.ts` line figure, the docblock and type-line anchors in `sites.md`, `claims.md`, `verification.md`, and four anchors in the sibling unit's contract) and left five items with named owners; the `KC-4` cross-unit contradiction it found was fixed in the sibling's contract.
**Gate 8** — the documentation review is the next step of this pass; its record lands at `archive/reviews/2026-10-30-storeroom-repair-arm-surface-doc-review.md`.
**Gate 9 — the trio, measured:** `npm test` **1120 pass / 0 fail / 1 skipped** (1121 tests, exit 0) · `npm run typecheck` **exit 0** · `npm run build` **exit 0** under the repository's own documented environment (`CARGO_HOME`), and **exit 101** without it — an environment fact, recorded rather than smoothed over. The 23 packaging failures an earlier run showed were traced to a stray `/tmp/node_modules` shifting npm's local prefix, not to any byte of this pass.
**Gate 11 — property register: RECORDED ZERO-ROW EXEMPTION** with its reason (no executable predicate; the properties belong to the code units, and `PAR-C-8`/`P-SM-4`'s are carried by the constraints unit's own register). Not a silent default.
**Gate 12 — WHICH LAYER EACH VERIFICATION COVERS.** The trio, the byte checks, the citation checks and the proofread verify the **documents and the envelope's authored bytes**; the scratch drive verifies the **published entry's runtime behaviour on exactly the example's bytes**; **nothing here verifies a rendered UI or an assembled renderer** — this unit touches no UI, no shell and no assembly, and no DONE claim is made at that layer.

**WHAT THIS UNIT RECORDS AND DOES NOT REPAIR** (each with an owner and a positive revisit condition, at `contract.md §4`): the registration instant reads the constraint outcome through the prototype chain, and the repair's result likewise, against `D-35`/`D-36`'s declared closure — items 3 and 4, owner a code-bearing unit, revisit at the first passing pass touching `addConstraint`'s outcome read; the stale `§5.4` print pair at `:469`/`:471` — item 6; and the floor plan's UNREACHABLE arm with one comment-versus-assertion disagreement — item 7.
**ONE FINDING THIS PASS ADDS AND HANDS ON**: a repair that LANDS a write and then THROWS never reaches the op-credit append, so its address enters no floor call and its beside write stands — measured by the gate-4 reviewer, outside this unit's sites, owner the same code-bearing class, revisit at the first pass touching the repair-body crossing or the floor plan.
**TRACKERS** — kept in this record by the architect's choice; the rulings this pass filed live at `strata/decisions.md` · `D-85` (the three corpus questions) and `D-86` (items 1 and 3 read as the one cell's scope grant). **`U-STOREROOM-CORPUS-CITATION-INTEGRITY` is INSTRUMENTED and UNSTARTED**; `U-STOREROOM-CONSTRAINT-OUTCOME` stands at gate 2 with five conditions and its one `OWED` cell unimplemented.
