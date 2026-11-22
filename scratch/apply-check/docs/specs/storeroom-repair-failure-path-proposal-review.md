# GATE 1 RECORD — the repair's failure path (`U-STOREROOM-REPAIR-FAILURE-PATH`)

- **STATUS: `APPROVE-WITH-CONDITIONS` · `DELEGABLE`**, its conditions at `§0`. Compiled in the compile-horizon-review shape: status (this head and `§0`) · what the proposal asks (`§1`) · feasibility verdict (`§0`'s token, `§1`'s close) · gaps and costs/benefits (`§1`'s close, `§2`'s ledger, `§1` part 4's three dispositions).
- **Date:** 2026-10-30. **Branch:** `main`. **Unit:** `U-STOREROOM-REPAIR-FAILURE-PATH` — the id the architecture review minted; **this record adopts it and mints nothing of its own**.
- **Source:** `Provident-Electron` · `ST-F2`, the third of three asks filed against installed `provident-storeroom@1.6.1`, read here in that project's `D-5` FOUR-PART SHAPE (`§1`). **The artifact under review is a REQUEST**: it carries no contract text, no signature, no clause and no id of its own.
- **Steps folded, not re-printed.** Step 1 (validity) **`FLAWED`**. Step 2 (critique) **`SOUND-WITH-CONDITIONS` on the finding and `UNSOUND` as filed**. Step 3 (architecture) **`SPLIT-RECOMMENDED`**, its fraction carried whole at `§4`, its site map at `§2`, its three item dispositions at `§1` part 4. **No step is re-argued; each is cited to its finding as this record dispositions it.**
- **The consumer's ruling series is not this project's.** `ST-F2` cites its own `D-5` and its fix shape's *"documentation only, nothing behavioural (D-24)"*; **those are the CONSUMER's rulings and this project's like-named ids are different rulings** (`docs/specs/storeroom-repair-arm-surface-proposal-review.md:51`). **No `D-…` of the consumer's is quoted unqualified here**; the ids printed below are `strata/decisions.md`'s own.
- **Files this pass wrote, and no other repo byte:** this record. **No spec gate, no contract directory, no guide byte, no source byte, no ruling.**
- **Layers:** `[T]` a text claim read at its own bytes, its `path:line` named · `[M]` a path or figure measurement. **Nothing was run** — no build, no test, no shell, no git verb. **Every runtime fact below is a SHIPPED MEASUREMENT read at the byte that prints it**, and is marked as such.

---

## §0 · THE HEAD VERDICT AND ITS CONDITIONS

**`APPROVE-WITH-CONDITIONS` · `DELEGABLE`.** **The proposal is a good idea on balance** (`§1`'s close): its SYMPTOM is real and its own fix shape is not, its three asks are one excluded, one prohibited and one impossible-as-filed, and the residue under them is a genuine, unstated, pointer-only documentation gap with a settled design behind it. **The unit under the request survives; the request does not.**

**No spec gate opens and no byte moves until the architect's go-ahead is recorded.** **Gate 1 PAUSES at `§7`**: a passing review plus the architect's word is what admits gate 2, and the word is not this record's to write. **Nothing below is an admission; `§5` is a PLAN and every step of it is unstarted.**

**Conditions — eight, each one a check at a named later gate:**

1. **Gate 2:** the contract directory lands in ONE pass — `contract.md` plus its parts — and no shipped site is edited at that pass (`§5` step 4).
2. **Gate 2:** both appended sentences POINT and neither MINTS: no `KC` token, no status, no member, no `LogEntry` census, no type and no export is declared by either. **This is what keeps `PIN-3` uncollided** (its row is `§2` row 16), and it is the whole of the unit's negative scope.
3. **Gate 3:** the `§7.6` clause lands between `:1033` and `:1035` and the `§8.0a` sentence lands inside `:1376-1379` — those two sites and no third. `§7.7`, `§7.8` and `§8.1` bytes stay unmoved.
4. **Gate 3:** the store-state fact is READ THROUGH `§5.4:469` and no byte of `§5.4` moves; the appended clause cites it and restates none of it.
5. **Gate 10:** the guide's generated landing is restored by `scripts/publish.sh` and both copies stay byte-identical; **the guide's own SELF-COUNT clause does not move**, because neither sentence names a measurement (that clause's anchor is `§2` row 17).
6. **Gate 6:** `T1` (the dual-home term sweep) and `T2` (the quote-outlives-its-byte check) are both GREEN on the exact appended bytes (`§5` steps 2–3).
7. **Gates 5 and 11:** gate 5 is recorded **NONE OWED** with its reason and not skipped; gate 11's **ZERO-ROW EXEMPTION is RECORDED** with its reason and not defaulted (`§5` steps 5–6).
8. **This and every pass of this unit:** `U-STOREROOM-REPAIR-REFUSAL-SENTENCE` is **NOT STARTED** — no byte of it, no ruling on it, no version for it. It waits on the architect's question (b) and on a go-ahead this record does not give.

**What would move this token.** **`FLAWED`** — if the failure path had no declared ground and the unit had to MINT a status, a token or a member. **`BLOCKED-ON-SEMANTICS`** — if any identifier either sentence names were externally sourced; `§3` measures that none is. **`PROCEED`** and **`REJECTED`** — both unavailable: the request's shape fails at all three asks, and the residue is real, settled in design, and unanswerable from the shipped pair.

---

## §1 · `ST-F2` READ IN ITS FOUR-PART `D-5` SHAPE

Each part is printed **as filed**, then judged at bytes: **TRUE**, **REFUTED**, or **ALREADY SHIPPED**, with the measurement that decides it.

### Part 1 — SYMPTOM · **TRUE as a symptom; one of its two readings REFUTED**

**As filed:** *a repair that writes legally and returns `undefined` is refused `ConstraintPassRefused` with a three-entry `log` whose third entry says the pair PASSED.*

**At bytes, three readings:**

1. **THE REFUSAL IS THE DECLARED ARM, NOT A DEFECT — TRUE and lawful.** `bindings/js/src/entry/kernel-attempt.mjs:859-863` states it in the kernel's own words: *"AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined` OR NOT THE OP THE REPAIR ACTUALLY LANDED HAS CARRIED NO OP AND IS THE APP'S OWN DEFECT: it is read as a repair that produced no op, so it fails `KC-4`"* — and the clause continues that it fails *"whether or not the pair's repair had been recorded as applied."* **So a `void` return failing `KC-4` is a DECLARED arm, and the design is settled**: crediting requires the returned op — `docs/specs/storeroom-constraints/contract.md:601-603` prints *"its own return carries `{ok: true, op}` — the op its edit landed, read off that return and nowhere else"*, and `strata/decisions.md:2614-2616` records that **`A110` deleted every route by which the kernel could learn it**. **So this is a teaching gap and not a defect** — **and the gap is not in the return contract, which ships (`§2` rows 1 and 8): it is in the FAILURE PATH that follows the refusal.**
2. **THE RETURN IS DECLARED AT BOTH SHIPPED HOMES — the PATH is declared nowhere.** `docs/guides/package-use.md:998` declares the closed two-arm result and that an outside identity *"fails `KC-4`"*; `bindings/js/index.d.ts:1218-1226` declares the same. **What no shipped byte states is what the caller then holds**: the crossed status, the sentence, the list's census, which entry is the verdict, and whether the repair's edit stands. **That residue is the unit** (`§1` part 4, `§2`).
3. **THE THIRD ENTRY *"SAYS THE PAIR PASSED"* — REFUTED as a defect.** The `log` is the COMMIT's ONE list and not a pair's verdict list (`docs/guides/package-use.md:1324-1332`), a `constraint-check` entry whose message reads *passed* is a lawful member of it, and the verdict is the ONE entry whose `state` is non-`null` (`§2` row 11). **The precedent is shipped and measured**: `tests/e2e/downstream-claims.test.mjs:1498-1501` prints, as `log[0]` of one refusal's own log, `[constraint-check] the constraint x passed at ["a"]` — beside a later refusal in the same list. **So the consumer read a lawful entry as a contradiction, and the reason it could is that no clause tells it which entry to read.**

### Part 2 — REPRODUCTION · **REFUTED on the census and on the locus; TRUE on the behaviour**

**As filed:** the three-entry `log` whose third entry says PASSED, reproduced against the guide's `§7.7` example `landing-page-must-stand`.

- **THE THREE-ENTRY CENSUS IS REFUTED AS A CENSUS `[T]`.** `log.length` is **not** a count of pairs, of passes or of attempts: `docs/guides/package-use.md:1376-1379` says so in the guide's own heading (*"READ THIS BEFORE YOU LOG-COUNT"*), and `:1329-1332` says the entries run `0..n-1` continuously across a repair's own joined write and the re-run. **A count read as a shape is the row's own class**, and a lawful list may be longer or shorter than three at the same refusal.
- **THE LOCUS IS REFUTED `[T]`.** `§7.7` is the RESTART BUDGET — three restarts per terminal act — and it opens at `docs/guides/package-use.md:1056`; the `landing-page-must-stand` example stands in **`§7.8`**, at `:1096-1108`. **The request names a section that is about something else.**
- **THE BEHAVIOUR IS TRUE `[T]`.** The `void` arm is the `KC-4` fall-through at `bindings/js/src/entry/kernel-attempt.mjs:883`, reached when `produced === null` (`:874`) and returning a terminal before the append at `:892`. **So the reproduction's behaviour exists; its census and its address do not.**

### Part 3 — SUSPECTED ROOT CAUSE · **TRUE as a position measurement; REFUTED as a repairable defect of this unit's scope**

**As filed:** the refusal sentence interpolates the ATTEMPT's address, so the repair's own write address is missing from it.

- **TRUE, and measurable at one byte.** `bindings/js/src/entry/kernel-attempt.mjs:883` composes `the repair ${pair.id} produced no op at ${addressSpelling(attempt.address)}` — **the ATTEMPT's address, and the only address in scope at that line.**
- **REFUTED as a fix inside this unit, on three independent grounds.** **(a)** On the `void` arm the kernel holds no repair op: `:871-885` returns before the only append to `attempt.ops` on this path (`:892`). **(b)** It holds no repair ADDRESS either: the sentence's slot is the one address the record carries, and the repair's return carries no address member at all. **(c)** Nothing downstream restores it: `floorCallPlan` takes its candidates from `attempt.ops` alone (`bindings/js/src/entry/kernel-terminal.mjs:288-290`), and by `A110` no carrier is left to learn the landed op from. **So there is no second address to interpolate, and the ask is impossible as filed** — which is why step 3 DISSOLVED it into a named code-bearing successor rather than into this unit (`§1` part 4).
- **THE SHARPEST RESIDUAL SURVIVES, AND ITS SECOND HALF IS ALREADY SHIPPED.** The sentence asserts an absence in the store (*"produced no op"*) that the store contradicts when the repair did write — **and the fact that matters to a consumer, that an uncredited write's address is NOT restored by the floor call and therefore stands, already ships at `docs/guides/package-use.md:469`**: *"THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE; AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED."* **What is missing is not the fact; it is that no clause in `§7.6` or `§8.0a` sends the reader to it from the refusal** (`§6` question (c)).

### Part 4 — PROPOSED FIX SHAPE · **(i) ALREADY SHIPPED · (ii) PROHIBITED · (iii) IMPOSSIBLE AS FILED → DISSOLVED; the frame REFUTED**

**As filed:** documentation only and nothing behavioural — (i) an example in `§7.7` beside `landing-page-must-stand` showing a repair returning its write's own op; (ii) the repair's return shape in `index.d.ts`'s `Constraint` docblock, *"named so it is typeable"*; (iii) the repair's own write's address inside the refusal sentence.

1. **(i) `ALREADY SHIPPED`.** `docs/guides/package-use.md:992-1033` is a dated clause of 2026-10-30 declaring the closed two-arm return, the store's-own-record ground for `op` and the credit ground — all at `:998` — and **a measured example whose repair returns `{ ok: true, op: landed.op }`** (`:1021`), driven on its exact bytes through the published entry (`:1033`). **The content ships; only the section the request names is wrong** (`§1` part 2).
2. **(ii) `PROHIBITED`.** The declaration carries a prohibition row — *"it declares NO store type, NO store verb, NO `findAddress`, NO release verb and NO constraint or repair seam"* — **reconciled at `§3`'s collision check and nowhere else**. **The row governs DECLARING, not DOCUMENTING** (`PIN-7`, `§2` row 16): the return shape may be — and is — documented in prose (`index.d.ts:1218-1238`, `§2` row 8) while `Constraint` stays `(context: unknown) => unknown` (`§2` row 9). **So the return cannot be "named so it is typeable"; the sentence that would type it is the one the shipped pair already refuses.**
3. **(iii) `IMPOSSIBLE AS FILED`, DISSOLVED** into `U-STOREROOM-REPAIR-REFUSAL-SENTENCE`, a code-bearing successor that needs a ruling and a version and is **UNSTARTED — no pass here may start it** (`§0` condition 8, `§6` question (b)).
4. **THE FRAME ITSELF IS REFUTED, AND THIS IS THE REQUEST'S OWN LAST-PART ERROR.** The part is labelled *"documentation only, nothing behavioural"*, and **(iii) is not a documentation ask at all**: the sentence is composed in kernel source at `bindings/js/src/entry/kernel-attempt.mjs:883`, so landing the ask would move a BEHAVIOUR byte while the part claims it moves none. **That mislabel is a behaviour byte filed as a documentation edit** — and it is why step 1 read the request `FLAWED`, step 2 read it `UNSOUND as filed`, and the unit that survives is the residue and not the ask.

### §1's close — ON BALANCE: is it a good idea, and what are the costs and benefits?

**Yes, on balance, and only as the residue.** The three asks are one shipped, one prohibited and one impossible; **what is left under them is a measured gap** — the failure path is undeclared in both shipped homes, the list's reading rule exists only as a caution about counting (`§2` row 6) and not as a rule about the verdict, and a consumer holding a refusal cannot name which entry decided it. **No better solution exists, and that is a measurement and not a preference**: the design is settled (`§1` part 1 reading 1), the store-state fact ships (`§2` row 7) and the return contract ships (`§2` row 1) — **so the only lawful shape is two POINTERS at the two sites a reader of a refusal reaches.** A clause restating any of the three would be a second home and would have to be kept true.

| | |
|---|---|
| **costs** | one dated clause in `§7.6` and one sentence in `§8.0a`, a landing pass, and the `T1`/`T2` sweeps; a `§7.6` that already carries several dated clauses grows by one; and a pointer-only clause must be written so it cannot drift from the homes it sends the reader to. **No behaviour byte, no export, no type, no status, no member, no notes row, no ruling.** |
| **benefits** | a consumer holding a refusal answers its four questions from the shipped pair alone — what crossed, what the list is, which entry is the verdict, whether its repair's edit stands; the lawful *"passed"* entry stops reading as a contradiction; and the guide gains no figure, so its self-count clause stands unmoved (`§0` condition 5). |

---

## §2 · THE MEASURED SITE LEDGER — "already shipped" as a measurement, not an impression

Every row is one `path:line` read at its own bytes this pass. **The `reading` column is the judgment; the `at its bytes` column is the fact.**

| # | site | what exists there, at its bytes | reading |
|---|---|---|---|
| 1 | `docs/guides/package-use.md:992-1033` | the 2026-10-30 dated clause: the closed three-arm outcome (`:994`) with `message` read first (`:996`), the closed two-arm repair result with `op` *"THE STORE'S OWN OPERATION RECORD"* (`:998`), the one argument and its `pending` (`:1000`), the four ways the arm meets you (`:1002-1007`), the example returning `{ ok: true, op: landed.op }` (`:1011-1029`), the landing drive (`:1033`) | **ALREADY SHIPPED** — the return contract (i)/(ii) ask for |
| 2 | `docs/guides/package-use.md:1056` | `### §7.7` — the restart budget, `RESTART_LIMIT` = `3`, one log entry past it | **the request's named locus is a different section** |
| 3 | `docs/guides/package-use.md:1096-1108` | `landing-page-must-stand`, fenced, in `§7.8`, with its two-entry `log` sketch | **what the request called `§7.7`** |
| 4 | `docs/guides/package-use.md:1089-1091` | `§7.8` step 3: the refusal's `log` names the pair and carries *"the kernel's token in the terminal entry's `state`"*; *"the delete is UNDONE together with every edit the delete's own attempt made (a repair's write included)"* | **a shipped instance of the verdict rule and the repair-edit fact**, read THROUGH, never edited |
| 5 | `docs/guides/package-use.md:1324-1332` | `§8.0a`: *"THE LIST BELONGS TO THE COMMIT AND NOT TO THE ATTEMPT"*; a repair's `commit` entry *"can stand in the middle of the list"*; entries run `0..n-1` | **the census rule, shipped** — the request's three-entry reading has no home here |
| 6 | `docs/guides/package-use.md:1376-1379` | *"READ THIS BEFORE YOU LOG-COUNT"*: `log.length` is *"every entry of the commit"*, count *"by `kind` and `id`"*, and *"a repair or a body's own write legitimately adds entries to the list you caught"* | **THE UNIT'S SECOND HOME** — a counting caution with no verdict rule beside it |
| 7 | `docs/guides/package-use.md:469` | `§5.4`: *"THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE; AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED"*, with `E2E-C-9` cell 6 as the measured reach | **the store-state fact ALREADY SHIPPED** — the unit cites it and `§5.4` must not move |
| 8 | `bindings/js/index.d.ts:1218-1238` | the docblock's dated clause: the closed two-arm return, `op` as the store's own record, `KC-4` for any other identity, the credit ground pointed at, `write`'s fourth position | **ALREADY SHIPPED** — ask (ii)'s content, in prose |
| 9 | `bindings/js/index.d.ts:1246` | `export type Constraint = (context: unknown) => unknown;` | **the type line the ask (ii) would have to move — prohibited** |
| 10 | `bindings/js/src/entry/kernel-attempt.mjs:859-886` | the result's two arms read own-member (`:871-872`); `produced === null` is the failure (`:873-874`); the carried message is `landedOpDefect`'s where `ok`, the repair's own `message` where `ok === false`, and **`the repair <id> produced no op at <attempt address>`** as the fall-through (`:883`); the terminal returns before `:892` | **the sentence (iii) names, and the arm that makes it impossible** |
| 11 | `bindings/js/src/entry/kernel-terminal.mjs:66-72` | the `outcome` entry appended ONCE, `state` *"THE ARM'S ONE TOKEN"*, `pair: null` and the attempt's last op; `:288-290` — `floorCallPlan` iterates `attempt.ops` alone | **the verdict rule — shipped in code, stated in no consumer byte** |
| 12 | `bindings/js/src/entry/kernel-foundations.mjs:1105-1131` | `landedOp`: own-member `op`, own `opId`, no identity the attempt already holds, and the ordinal floor above the invoked-for op | **the credit ground — cited by both shipped clauses, restated by neither** |
| 13 | `docs/specs/storeroom-constraints/contract.md:557` · `:589-603` | the `KC-4` token printed live in `§5.3`'s clause; `§5.4`'s `P-SM-4` arms with arm (b)'s `{ok: true, op}` *"read off that return and nowhere else"* and `A110` | **the token and the design's live homes** — both in the corpus, neither in this unit's sites |
| 14 | `docs/specs/storeroom-js/surface.md:2079` | item `(D)`: a constraint refusal *"crosses as the set's rank-`20` member `ConstraintPassRefused`"*, one status for the refusal, **the `log` unmoved and the token riding `log[].state`** | **the crossed status's live home** — a MUST-NOT site |
| 15 | `tests/e2e/downstream-claims.test.mjs:1498-1501` | one refusal's own log printed: `[constraint-check] the constraint x passed at ["a"]` · `[repair-run] the repair x landed op-3` · a refusing `constraint-check` · the `outcome` | **a PASSED entry inside a refusal is lawful and already measured** |
| 16 | `docs/specs/storeroom-repair-arm-surface/contract.md:27` · `:36` | `PIN-3` (the closed two-arm return, `KC-4` for outside forms) and `PIN-7` (`declares` vs `documents`; `Constraint` unmoved) | **the two pins the request's (ii) collides with and this unit does not** |
| 17 | `docs/guides/package-use.md:2222` | the guide's own self-count: *"This file now names FIVE measurements of its own"* | **must not move** — neither appended sentence names a measurement |

**Two sites the request names resolve to nothing of the kind it expects:** `§7.7` (`§2` row 2) and the `Constraint` docblock as a place a NAME may be declared (`§2` rows 8–9). **Two sites it does not name are where the residue lives:** `§8.0a:1376-1379` (`§2` row 6) and the verdict rule's code-only home (`§2` row 11).

---

## §3 · STEP 0 — THE ADOPTION-SEMANTICS BLOCK

- **`STEP 0 run:` YES — and the trigger DOES NOT FIRE. `ZERO-ROW EXEMPTION` taken on the written rationale below.** A zero-row dossier is lawful only for a unit adopting no externally-sourced identifier; **this is that unit, and the rationale is written, not silent.**
- **The question STEP 0 exists to ask, and its answer.** **Does ANY part of this unit's contract — a name, a parameter, a vocabulary term — originate OUTSIDE `Provident-Storeroom`?** **No.** **The ask is external; the ask minted nothing**: `ST-F2` proposes no name, no member, no token and no clause, and the unit's declared surface is **two sentences that NAME ONLY what this project already declares.**
- **THE UNIT'S DECLARED SURFACE, NAMED SO THE EXEMPTION IS CHECKABLE: the two appended sentences in `§7.6` and `§8.0a`, and the terms they may name — `KC-4` · `LogEntry` · `state` · `attempt.ops` · `ConstraintPassRefused` · the `outcome` entry · the commit's `log` · the floor call.** **Every one is THIS project's own, each with a live home measured this pass**: `KC-4` at `docs/specs/storeroom-constraints/contract.md:557`; `LogEntry` and its `state` at `bindings/js/index.d.ts:388-393`; `ConstraintPassRefused` at `docs/specs/storeroom-js/surface.md:2079`; `attempt.ops` and the `outcome` entry at `bindings/js/src/entry/kernel-terminal.mjs:72` and `:288-290`; the commit's one `log` at `docs/guides/package-use.md:1324-1332`; the floor call at `:469`. **Nothing in that set originates outside this repository, and because the unit MINTS nothing the set cannot grow past it** (`§0` condition 2).
- **`Dossier path:` `NOT TRIGGERED`** — no dossier is authored and none is owed at gate 1. **The ask's own vocabulary arrives as PROSE pointing at identifiers that already exist here**, so there is nothing to adopt.
- **`Dossier content-hash snapshot:` `PENDING — filed at the pass that opens the spec gate`.** There is no dossier to hash; the snapshot owed at gate 2 is of this record's own `§3`, taken then.
- **`Open rows:` `none`.**
- **`Open-semantics list:` EMPTY** — no identifier stands `undefined-until-answered` and no overflow exists to park. **This is why `BLOCKED-ON-SEMANTICS` is unavailable as this record's token** (`§0`).
- **Collision check, performed against the consuming project's prohibition rows even on the exemption path.** **The one hit is `bindings/js/index.d.ts:120-123`** (*"NO constraint or repair seam"*), **RECONCILED by row id at `PIN-7`** — reconciled, not re-named, the row's own bytes unmoved (the pin's anchor is `§2` row 16). **The rest of the prohibition class does not fire**: the unit writes no `bindings/js/src/entry/*` byte, no `index.d.ts` byte, no `tests/*` byte, no `strata/decisions.md` byte, no `RELEASE-NOTES.md` row and no `§5.4`, `§7.7`, `§7.8` or `§8.1` byte (`§0` conditions 3–4, `§2`). **No unreconciled hit stands, so no finding is carried.**
- **`Architect answers this pass:` NONE WERE GIVEN, and none was needed for this block.** The rulings it reads are pre-existing (`A110`, `D-53`, `D-63`, `D-65`); **this pass takes no ruling of its own** — it folds three steps, dispositions the `decomposition` row, and escalates at the existing pause (`§7`).
- **`Effect on the verdict:` `NOT BLOCKING`.** The row limb is lawfully empty and the open list is empty, so **nothing here forbids the delegable word**; `§0`'s conditions are gate checks and none of them is a semantics question.

---

## §4 · THE `DECOMPOSITION` ROW — nine columns, filled from the architecture review's decision

| key | recommendation | fraction | boundary | remainder | disposition | decider | revisit | ground |
|---|---|---|---|---|---|---|---|---|
| `decomposition` | **`SPLIT-RECOMMENDED`** | **`U-STOREROOM-REPAIR-FAILURE-PATH`** — ONE dated clause appended in `§7.6` between `docs/guides/package-use.md:1033` and `:1035`, plus ONE sentence inside `§8.0a:1376-1379`, **both pointing and neither minting** | **excludes every shipped site**: `bindings/js/src/entry/*` · `bindings/js/index.d.ts` · `§5.4` · `§7.7` · `§7.8` · `§8.1` · `docs/specs/storeroom-js/surface.md` · `docs/specs/storeroom-constraints/*` · `tests/*` · `strata/decisions.md` · both `RELEASE-NOTES.md` · the guide's self-count clause | **(i) EXCLUDED — already shipped** (`§2` row 1) · **(ii) EXCLUDED — prohibited**, reconciled at `§3` (`§2` rows 9, 16) · **(iii) DISSOLVED** into the successor `U-STOREROOM-REPAIR-REFUSAL-SENTENCE`, **UNSTARTED, needing a ruling and a version** (`§0` condition 8) | **FRACTION MINTED AS THE UNIT; remainder disposed as the `remainder` cell prints — two EXCLUDED, one DISSOLVED, the successor queued and NOT started** | **the ARCHITECT for the go-ahead and the successor's ruling; the SUPERVISOR for the split**; no role owns the spec corpus (`D-3`) | **the fraction re-opens at gate 2; the successor only on question (b); `PIN-3` only if the `void` instance is ever to be named — under a NEW `D-88`, by the architect alone** | the architecture review's decision, carried whole; `PIN-3` is **NOT** collided with and needs no amendment (`§2` row 16) |

---

## §5 · THE IMPLEMENTATION PLAN — drafted at the proposal stage · **PLAN, NOT CONTRACT CLAIMS**

**Every step below is a PLANNING step and not a declaration.** None is a claim this record makes about the tree, and each is reconciled to the contract — and dated — once the contract lands at gate 2. **No step here is started** (`§0`'s pause).

### Step 1 — what will be built: the two appended sentences, and their content in order

**Home 1 — `docs/guides/package-use.md` `§7.6`, one dated clause appended between `:1033` and `:1035`.** It answers what a reader holding a refusal needs, **in this order, because that is the order the machinery answers them**:

1. **THE CROSSED STATUS.** A repair whose answer is not credited — `{ok: true}` with no `op`, with an `op` that is not the one it landed, or any identity outside the two arms — fails the attempt, and what the caller catches is `ConstraintPassRefused` at rank `20`, with **the kernel's token `KC-4` riding the terminal entry's `state`** (`§2` rows 13, 14). **POINT at both live homes; declare no status and no token.**
2. **THE SENTENCE.** What the refusal's `message` and its `repair-run` entry say, **characterised and never quoted**, with the one thing a reader must not conclude stated plainly: **the address in that sentence is the attempt's, and is no claim about where the repair wrote** (`§2` row 10).
3. **THE LIST'S CENSUS.** The `log` is the COMMIT's ONE list; entries may lawfully read *passed*; `log.length` is not a pair census (`§2` rows 5, 15). **POINT at `§8.0a`; restate no member and print no count.**
4. **WHICH ENTRY IS THE VERDICT.** The single entry whose `state` is non-`null`, appended once by the terminal act, and last (`§2` row 11). **This is the one rule the unit states as a rule**; every other item here is a pointer.
5. **WHETHER THE REPAIR'S EDIT STANDS.** A refused act undoes the edits the attempt made, the repair's write included (`§2` row 4); **and an UNCREDITED write's address is not restored by the floor call, so it stands** — **read THROUGH `§5.4:469` and never edited** (`§2` row 7; `§6` question (c)).

**Home 2 — `docs/guides/package-use.md` `§8.0a`, ONE sentence inside `:1376-1379`.** It adds the reading rule beside the counting rule that already stands there: **one commit, one list, several entries may read *passed*, and the ONE entry whose `state` is not `null` is the verdict — and it is last.** **It points back at `§7.6`'s clause for the failure path and mints no member, no kind and no count.**

**Order and division of labour, fixed so gate 2 does not re-decide it:** home 1 carries the five items and the state-read-through; home 2 carries the reading rule alone; **neither duplicates the other's sentence**, and that is `T1`'s subject.

### Step 2 — `T1`, the dual-home term sweep

**`T1` is a sweep over TERMS and their homes, run against the exact appended bytes.** For each term the two sentences name — `ConstraintPassRefused` · `KC-4` · `LogEntry` · `state` · the `outcome` entry · the commit's `log` · `attempt.ops` · the floor call — it records the term's **ONE declared home** (`§2`'s ledger is that list) and proves **neither appended sentence creates a second print**: no status set, no member census, no token table, no count, and no restatement of a rule whose home is `§5.4`, `§8.0a` or `surface.md`. **A term whose home would move, or a rule printed twice, is a FINDING and blocks the landing.** **`T1` keeps `§0` condition 2 true of the bytes and not only of the intent.**

### Step 3 — `T2`, the quote-outlives-its-byte check

**`T2` is a citation sweep run against the appended bytes at the landing pass, and re-run at every later pass.** Two halves: **(a)** every `path:line` either sentence cites is re-read at that path and line, and a citation resolving to a moved region re-opens the sentence at the same pass; **(b)** **no kernel sentence is quoted verbatim** — the refusal's own sentence is characterised, not copied (`§5` step 1 item 2) — **so no quoted byte can outlive the byte it would have copied.** **`T2` keeps the unit's pointers resolvable and its one quotation-shaped sentence from going stale.**

### Step 4 — what the spec gate must produce

- **The contract directory in ONE pass**: `docs/specs/<unit>/contract.md` plus its parts, with the **part map closed** (parts named = parts present) and the **index region** landing in that same pass. **A writer delegated against prose alone would have to invent the semantics this record declines to mint.**
- **A POINTER-ONLY pin set**: each pin a requirement that its sentence POINT at a named home and declare nothing there — no pin may be satisfied by a clause that restates a rule, and **no pin may name a `KC` token, a status member, a `LogEntry` member or a type as MINTED.**
- **The ledger rows**: `§2`'s seventeen rows carried as the unit's own site ledger, each re-read at its own bytes at gate 2, with `§2`'s two MUST-NOT classes (`§0` conditions 3–4) as the negative scope.
- **STEP 0 carried, not re-derived**: `§3`'s zero-row exemption and its declared surface, with the dossier path `NOT TRIGGERED` and the open list empty.

### Steps 5–6 — the two gates already owed a disposition

- **Gate 5 (blind greens): `NONE OWED`, and none lawful to add — THE BATTERY CANNOT TURN.** The blind writer sets expectations before behaviour exists; **this unit moves no behaviour byte at all** (its two sites are prose and the landing is generated), so a blind cell would be written against nothing that can turn, which is a false battery row. **Recorded as `NONE OWED` with this reason and never as `SKIPPED`.**
- **Gate 11 (property register): a `ZERO-ROW EXEMPTION` IS OWED, and it is owed because the unit carries NO EXECUTABLE PREDICATE.** It declares no invariant over generated inputs and mints no property: the predicates its subject touches — `P-SM-4`'s closed arm table and `KC-4`'s repair-body arm — are **already carried by the constraints unit's own register** (`docs/specs/storeroom-constraints/contract.md:589-603`), and a generator aimed at prose would test the prose's truth, which is gate 6's documented-vs-code check and not PBT. **The exemption is RECORDED with this reason and is not a default.**

### Step 7 — reconciliation, stated so the plan is not read as a contract

**Every step above is reconciled to the contract and dated once the contract lands at gate 2.** **Until then this section is a PLAN**: if gate 2's contract finds any of steps 1–6 unsatisfiable at the tree's bytes, **the contract governs and this section is corrected beside it at that pass** — no step here is a claim this record will defend against the tree.

---

## §6 · THE ARCHITECT'S QUESTIONS — three, and the pause they sit on

**(a) The fraction and its two sentence homes.** **Question:** approve `U-STOREROOM-REPAIR-FAILURE-PATH` as minted — one clause in `§7.6` between `:1033` and `:1035`, one sentence inside `§8.0a:1376-1379`, and nothing else. **Turns on:** whether gate 2 opens at all; the unit has no second site and no code scope. **Default:** approved as drafted, **unstarted without the word** (`§7`).
**(b) The sentence's TEXT, ask (iii) — a defect row only, or a successor unit queued.** **Question:** does *"the repair `<id>` produced no op at `<address>`"* — the attempt's address in a sentence a consumer reads as the store's (`§1` part 3) — get a **defect row** in the live open-items ledger (`docs/L1/open-items-2026-10-25.md:198-203`, the shape carrying a `state` column) **or** a **version for `U-STOREROOM-REPAIR-REFUSAL-SENTENCE`**? **Turns on:** whether a code-bearing unit exists to change a kernel sentence, and which ruling authorises it — **`PIN-3` is not collided with, so nothing here amends it; only the architect may, under a new `D-88`, if the `void` instance is ever to be named.** **Default:** **a defect row only**, the successor left `UNSTARTED`, the sentence byte unmoved (`§0` condition 8).
**(c) The store-state fact's wording — stated as the consequence, or pointed at?** **Question:** is *"an uncredited write's address is not restored, so it stands"* the DECLARED CONSEQUENCE this unit may state in its own words, **read THROUGH `§7.8:1091`** rather than editing it — `§7.8` saying a refusal undoes every edit the attempt made, the repair's write included, and `§5.4:469` saying a beside address is not restored. **Turns on:** whether home 1's item 5 is a sentence of the unit's own or a bare pointer, and so whether `T1` sweeps a consequence or a citation. **Default:** **read-through and POINTER ONLY**, `§5.4` and `§7.8` byte-unmoved (`§0` conditions 3–4).

---

## §7 · THE PAUSE

**No spec gate opens. No byte moves. Gate 1 pauses here.**

- **No spec gate opens**: no contract directory is authored, no part map is closed, no pin is written (`§5` step 4 is a plan, not an artifact).
- **No byte moves**: this record is the only repo byte this pass wrote; `docs/guides/package-use.md`, `bindings/js/index.d.ts`, `bindings/js/src/entry/*`, `tests/*`, `strata/decisions.md` and both `RELEASE-NOTES.md` are untouched and no ruling is minted (`§0`, `§3`).
- **The unit's id: `U-STOREROOM-REPAIR-FAILURE-PATH`** — minted by the architecture review, adopted here, started nowhere.
- **What the pause waits on, and nothing else:** the go-ahead for the fraction and the answers to `§6`'s three questions. **A passing review plus that word is what admits gate 2; neither is this record's to give or to write.**

---

## `§8` · `2026-11-02` · DONE — the unit's tracker entry: the gates, the measured green, and what it records and does not repair

**STATUS: DONE — the unit shipped. Gates 1–4 and 7–9 passed, 5 and 6 are recorded as `NONE OWED` rather than passed, 10 and 11 are discharged by this section, and 12's layer statement is below. `§7`'s pause is the reading of 2026-10-30 and is not a standing prohibition: the architect's word at `§6` was given and is `D-88`, so gates 2–10 ran on it.**

**Gate 1** — **`APPROVE-WITH-CONDITIONS` · `DELEGABLE`**, eight numbered conditions, and the architect's go-ahead for the fraction with his three answers as **`strata/decisions.md` `D-88`** (dated 2026-11-01), whose terms are the unit's scope: docs-only, two guide sites, the refusal sentence a recorded defect row and not a unit.

**Gate 2** — **the directory form, six files**: `contract.md` with `claims.md`, `clause-7-6.md`, `clause-8-0a.md`, `sites.md`, `verification.md`; the part map's **`6 − 1 = 5`** and the file count's **`5`** reading **`5 = 5`** ✓; **`PIN-1`…`PIN-7`** (`PIN-7` minted by the consolidation delta); `STEP 0`'s zero-row exemption carried whole with its rationale.

**Gate 3 — no red set exists by construction** (docs-only; `contract.md §3`). **Green, and re-discharged by the archival pass of 2026-11-02:** the guide's `§7.6` clause stands as **ONE clause of five items, ONE fenced quote and ONE closing dated mark** at `docs/guides/package-use.md:1035`–`:1046`, the paragraph below it heading at `:1048`; the `§8.0a` site is **ONE sentence** at `:1393`; the landing is a **restore** — `bindings/js/README.guide.md` regenerated by the assembly's own `cp -f`, `cmp` clean, both copies **2,236 lines** and byte-identical at **`sha256 d53a8fa46472a80828212a18020aa63b1e8fa532eefc234642c1de8588b3e12a`** (the pair read `64d9610…` before the gate-7/gate-8 corrections closed), **`14` insertions / `0` deletions in each** and the generated version line reading `1.6.1` in both; and ruling (b)'s **ONE ledger row** is filed at `docs/L1/open-items-2026-10-25.md §6` row **`5`**, state **`OPEN — recorded, not repaired. No unit is queued`**, its "which side moved" cell reading **`THE CODE`** with the supervisor's `NEITHER` correction printed beside it. **The consolidation was performed on 2026-11-02 and its artifacts are these**: the two sites as above, and the archive record at `archive/spec-history/2026-11-02-storeroom-repair-failure-path-clause-first-draft.md` (**18 blocks**, a five-field head, a **computed** `sha256` per block, 18/18 recomputing to the head), with the census **`M-1`…`M-19`** disposing of every **non-blank** pre-move line exactly once and the four blank separators as its one stated exception. **Gate 3's sentence-by-sentence account is carried by this corpus** — `clause-7-6.md §1A` (the five delivered items, each with its one ground) and `§6` (the census) — **and no separate landing record exists or is owed.**

**Gate 4 — two passes on the landed bytes.** Pass 1 **`DO-NOT-SHIP`**: six re-derivations (the copy is the fall-through's of three messages; FACT (A) split so each site keeps one half; the verdict is the **LAST** entry whose `state` is not `null`; the axis is the address's membership in `attempt.ops` with **both** `§5.4` lines read by line; `clause-8-0a`'s sentence scoped to a refusal carrying a commit's list). Pass 2 closed all six and returned **`SHIP-WITH-CONDITIONS`** on four conditions, which landed — and **named the structural cost the correction rounds left: ten items of which six were withdrawal marks that inverted the sentence above them.** **The consolidation delta (`PIN-7`) is that finding's remedy**, and its form is `RCA-8(g)`'s **move-out** — a superseded byte leaves byte-exactly for the archive and leaves one pointer — **not** the annotate-beside spelling that produced the accretion.

**Gate 5** — **`NONE OWED`**: the blind battery cannot turn, because no behaviour byte moves.

**Gate 6** — **`NO DRIVE OWED`**, recorded with its reason: the unit ships no example and no code path, so a drive would be a run with nothing of this unit's in it; the checks its bytes can fail are the ladder's `V-3`, `V-4`, `V-5`, `V-9` and `V-10`, and the measurement the clause leans on is **cited** at `tests/e2e/downstream-claims.test.mjs:1498`-`:1501`, not re-taken.

**Gate 7 — the proofread, run twice.** Pass 1 returned **`FAIL`** on two blocking findings: the closing mark asserted that the move's **bytes and their `sha256` stand in `contract.md`**, which prints neither; and item 3 named a second token, **`KC-3`**, where `PIN-3` (c) bounds the clause to `KC-4` alone. **Both closed at the bytes**: `:1046` now declares the move at the corpus path and stops there, and `:1043` cites the print without its token and carries the `§7.8` step-3 citation `PIN-2` (iv) required. **Pass 2 returned `PASS`, with the whole ladder `V-1`…`V-10` clean**, the fenced quote still byte-identical to `bindings/js/src/entry/kernel-attempt.mjs:883`'s template literal and all its citations resolving.

**Gate 8 — the documentation review, three passes.** Pass 1 **`PASS-WITH-CONDITIONS`** (two blocking: `sites.md`'s shift arithmetic, which the consolidation had reversed, and its figures' twelve repetitions; and `PIN-2` (iv)'s `§7.8` pointer discharged by no part). Pass 2 **`PASS-WITH-CONDITIONS`** (two new blocking: a `:2240` citation that cannot resolve, the guide being 2,236 lines and the sentence standing at `:2228`; and the census's exhaustive quantifier contradicting its own blank-line note; plus seven advisories). Pass 3, scoped, **confirmed `B1`, `B2` and `A3`–`A9` disposed at the bytes**, and left **one condition — a reading dated 2026-10-31 of bytes produced on 2026-11-02 — and three advisories**, all discharged in the same pass. **The closure predicate read `5 = 5` at every one of the three, and the write set never left the unit's paths.**

**Gate 9 — the trio, measured:** `npm test` **1121 tests · 1120 pass · 0 fail · 1 skipped**; `npm run typecheck` **exit 0**; `npm run build` **exit 0** under the repository's own documented environment (`CARGO_HOME`), and **exit 101** without it — an environment fact, recorded rather than repaired. **`scripts/publish.sh --check` additionally read green** on the cut-claim ratchet, `cargo test --offline` **669 pass / 0 fail**, the lock-versus-manifest set, the artefact staging and the byte-for-byte landing, **refusing only on pre-existing state** (a dirty tree, `HEAD` off `origin/main`, and a manifest seven commits past its tag) — **no refusal of its was this unit's**.

**Gate 10** — **discharged by this section**, which is the landing restore's record: the canonical guide is the authored home, the landed copy is the assembly's `cp -f`, and the two are byte-identical.

**Gate 11 — `ZERO-ROW EXEMPTION`, recorded with its reason and not defaulted.** No property is falsifiable of two English sentences; the predicates the sentences point at are quantified by the constraints unit's own register; and a generator aimed at prose would be gate 6's documented-versus-code re-read. **This determination is distinct from `STEP 0`'s zero-row dossier exemption**, which `contract.md §1` carries on its own ground, and no document of this unit claims a register row exists.

**Gate 12 — which layer each verification covers.** The trio, the byte checks, the citation re-reads and the ladder verify **the documents and the shipped envelope's authored bytes**. **Nothing here verifies runtime behaviour, because no behaviour byte moved**; the runtime green this clause leans on is the one already printed at `tests/e2e/downstream-claims.test.mjs:1498`-`:1501`, and it is cited, never re-taken.

**WHAT THIS UNIT RECORDS AND DOES NOT REPAIR** (each with an owner and a positive revisit condition).

1. **The refusal sentence's text and address at `bindings/js/src/entry/kernel-attempt.mjs:883`** — filed as one ledger row (`§6` row `5`, `OPEN`), **`D-88` (2)'s recorded defect and not a unit**, with **no successor queued**. The two lawful outcomes and why neither is taken here stand in that row: a change to the text is a behaviour byte needing its own ruling and its own version, and naming the repair's address at that instant needs a store reach `D-67` forbids. **Owner: the code-bearing class; revisit: a ruling that grants a version.**
2. **The `§5.4` pair (`:469`, `:476`(2))** — a **named adjacent tension**, read by line and adjudicated nowhere; **owner the guide's owner; revisit on any pass that edits `§5.4`.**
3. **`D-88` (3)'s read-through mark is RETIRED, and its own example sentence is false at the kernel.** The mark belongs to the spelling `RCA-8(g)` retires, and the clause cites `§7.8`'s step 3 and both `§5.4` lines instead; and the ruling's example — *"an uncredited write's address is not restored and therefore stands"* — is **false as a general sentence**, the axis being the address's membership in the attempt's own ops and not the credit of the returned op. **Recorded here and corrected nowhere by any pass of this unit: no pass may correct a ruling.** **`D-89` IS THAT ROW, filed `2026-11-02` after this entry's first draft: it withdraws the example by name, stands the address geometry in its place, and leaves `D-88` (1) and (2) whole, moving no shipped byte.** **Owner: the architect.**
4. **One advisory is left as written.** `claims.md` `R-15`'s trailing clause — that every home naming the archive record names it as where moved bytes stand — is stretched of `contract.md §7`, whose naming is a closure-predicate exclusion; the row's second half holds. **Owner: the next pass that edits `claims.md`; revisit: narrow the clause to the half that is strictly true.**
5. **This record's `§2` anchors are the readings of 2026-10-30, and this record is append-only.** `:1056`, `:1096`–`:1108`, `:1089`–`:1091`, `:1324`–`:1332`, `:1376`–`:1379`, `:2222` resolve at that date's bytes and not at today's; `sites.md §4`'s table maps each to its delivered position, and no clause of this unit treats either as a fact about the file.
6. **`STEP 0`'s content-hash snapshot is discharged-and-not-required of this unit, with its reason**: its subject is this record's own `§3`, a byte the unit may not write; two shell-carrying passes ran without taking it; no rung reads it. **The record's `§3` line stays `PENDING` as the reading of its date, and the obligation re-points to this record's owner.**

**TRACKERS.** **`D-88`** at `strata/decisions.md:4531` is the ruling this unit ran on; the ledger row is `docs/L1/open-items-2026-10-25.md §6` row `5`; **`U-STOREROOM-REPAIR-REFUSAL-SENTENCE` is UNSTARTED and queued nowhere**; `U-STOREROOM-REPAIR-ARM-SURFACE`, `U-STOREROOM-CONSTRAINTS`, `U-STOREROOM-JS` and `U-STOREROOM-CORPUS-CITATION-INTEGRITY` are untouched, unrenumbered and unmoved; and **`D-84`'s uncommitted row is another pass's**, filed before this unit and committed by neither.

**This section is the unit's tracker home: dated `2026-11-02`, appended at this record's end, and append-only.**
