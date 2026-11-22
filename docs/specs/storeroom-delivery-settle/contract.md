# Contract — the delivered set's settle (`U-STOREROOM-06 DELIVERY-SETTLE`)

**PROVENANCE.** Authored `2026-11-17` at `HEAD` `e3136af` by **`role_l1_architect`**, landed by the supervisor because that role holds no write
channel. **Its one `derivation:` clause:** `derivation: docs/L1/seven-key-config.md · §5 · unit = U-STOREROOM-06 DELIVERY-SETTLE ("independent;
lands FIRST") · scope = the package's delivery machinery and no store byte · decider = the ARCHITECT for this contract's pins and for the U-06/U-08
boundary; the DESIGN for every runtime statement; the RULINGS for every semantics`.

**Inputs, read at their bytes:** `docs/L3/delivery-settle/design.md` (`§1`–`§12` whole; `§11` and `§12` govern where they meet) ·
`docs/L1/seven-key-config.md` (`§2.3`, `§4` (iv), `§5`, `§6`, `§8`–`§13`, **`§13` latest**) · `strata/proposals.md` `P-5` (`§1`, `§3`, `§5`) ·
`strata/decisions.md` `D-130` (items 3–5), `D-138` whole, `D-149`, `D-150` · `strata/walkthrough.md` (gates 2, 4, 12; exit questions 5, 6, 9, 12) ·
the format template `docs/specs/storeroom-repair-failure-path/`.

**Class: `CODE-BEARING, PACKAGE-ONLY`.** It declares pins over `bindings/js/**` and reaches **no store byte, no addon entry, no Rust file, no `cfg`
key, no status**. It writes no code, no cell and no spec byte, mints no ruling, and puts no question to the architect — the three questions
`design.md §9` filed were closed by `D-139` items 1–4 and then dissolved by `D-149`.

**FIGURES CARRIED, NOT RE-TAKEN, each at its source:** the status set is **twenty-three** (`src/error.rs:171`–`:196` plus `D-137`'s rank `23`) · the
instance declares **fifteen** own members · `cfg` carries **six** keys since `D-149` · the receipt carries **three typed + four accessors**
(`D-150` item 1) · today's `Object.getOwnPropertyNames(record)` reads **five** (measured, `strata/research.md §23.16` (2)) · `bindings/js/**`
carries no `await` token at all (`§20.3`'s `K-11`).

---

## §1 · Scope, and the non-scope

**THE SCOPE SENTENCE, and it claims no store byte.** **This unit changes the package and only the package — every body of a write's or a delete's
delivered set is *started* in the one synchronous invocation loop, and the act's answer is *withheld* until that set has settled, and no package
slot two suspended bodies can both reach may cross between them.**

**THE NON-SCOPE, named so a later pass cannot read this unit as having settled them.** **NOT this unit:** `U-08 RETURN-VALUES`' `returnedValues`
member byte and its census step `6 → 7` (`D-150` item 1) — this unit produces the outcomes and defines no member for them (§8) · `U-03 IMAGE-EXPORT`'s
and `U-04 SAVE-CALL`'s save, `saveCall`'s substitution, `commit_file`'s suppression and the whole failure machinery `SC-6`/`VN-2` name ·
`U-07 STATUS-23`'s seat — **rank `23` `ListenerBodyRejected` is USED here and neither minted, renamed nor widened, and no rank `24` exists**
(`D-149`) · the creation's and the four registration instants' answers · `index.d.ts` (U-09's byte) and `modules.json` (`role_l2_integration`'s, §7) ·
`commitFile`'s answer and the terminal arm's return, both `undefined` and both unmoved.

## §2 · `STEP 0`

**`STEP 0` run: yes.** **The trigger fires: this unit MINTS SIX IDENTIFIERS and takes no zero-row exemption** — `settlement` (a position on
`deliver`) · `state.legSettle` · `settledAnswer` · `bodyFailures` (the module-local function) · `defineBodyFailures` · `BODY_FAILURES` and
`BODY_FAILURES_EMPTY` (one symbol and one frozen empty). **`open-semantics list: EMPTY`; `open rows: none`** — no question of this unit's waits on a
ruling (`D-138` closed `RM-3`; `D-149` closed the channel cluster and withdrew rank `24`; `D-150` named the datum).

**What is TRUE OF THE TREE at `e3136af`, carried:** the delivery is one synchronous loop whose snapshot, dedupe and one-argument invocation are
unmoved (`delivery.mjs:154`–`:208`) · `deliver` answers nothing (`modules.json:330`–`:332` declares `void`) · the terminal arm's return is discarded
by the kernel (`kernel-attempt.mjs:550`) and its answer is `undefined` (`PAR-JS-19`; `state.mjs:84`–`:85`) · no `await` token stands anywhere in the
shipped graph (`K-11`) · a listener body's throwable crosses VERBATIM where a constraint body's is converted, because no kernel frame catches a
listener (`constraints.mjs:1243`–`:1249`; `:1424`).

**THE ONE MEASUREMENT THIS UNIT BEGINS WITH — `M-0`, the design's §10 riskiest line, `NOT DRIVEN`.** **Whether an `openCommit`/`closeCommit` bracket
can stand OPEN across a suspension on a path THIS UNIT DOES NOT AUTHOR.** With a bracket open at a microtask boundary, `index.open` is not `0` when a
suspended body's continuation runs, `openCommit`'s depth fallback (`state.mjs:674`–`:675`) answers `false` against `externalAt`, and **the body's
write JOINS the triggering caller's commit — `P-5`'s MUST NOT — silently.** **Two candidates, named and neither opened here:** `constraints.mjs`'s
`judgeReversal` tail, whose `finally` at `:3061`–`:3068` runs `leaveCommitFrame`/`closeCommit` (read as returns-the-compose-promise-after-the-finally
but **not driven**); and `state.mjs:787`–`:800`'s `COMMIT_SCOPE` bracket, **whose caller this pass did not open.** **Instrument:**
`openCommits(store)` (`state.mjs:516`) sampled at both ends of a suspended body's own write, on the unit's first cell. **Until it is driven, no
clause of this contract reads slot 1 as proven.**

## §3 · The part map

**`delivery.mjs` is the overloaded part, and the split is stated first because it is the thing this section exists for.** Under a naive division
`deliver` owns **five** behaviours — invocation · start-all · settlement · the per-handle value map · the plurality of `N` rejections — and would
become the only place a correctness property lives. **The division splits it at `deliver`'s own seam:** `deliver` keeps **invocation** and
**start-all**; **`settledAnswer`** takes the settlement (the unit's one suspension point); **`bodyFailures`** takes the plurality; and the
**per-handle value map is PRODUCED here and CARRIED nowhere in this unit** — it is `U-08`'s member (§8). No new module id is minted
(`modules.json` stays at `19`).

| part · existing name · its line | it gains | it must not acquire |
|---|---|---|
| `delivery.mjs` · `deliver` `:105`–`:209` | the fourth position `settlement`; the local `invoked` list, one `{handle, address, returned}` per **started** recipient; the two `null` arms; the answer `null \| Promise<readonly BodyFailure[]>` | a counter (module-level or on `state`) · a queue, timer, flush, `.then` or `async` · an ordering rule · a `try` around the invocation · a changed snapshot, dedupe, kind test or argument |
| `delivery.mjs` · `terminalArm` `:875`–`:990` (delivery at `:984`–`:988`) | **one assignment** at `:987`: `state.legSettle = deliver(state, triggered, triggeringAddress, true)` — taken only where `state.legDelivery !== 'member'` | a return value (**stays `undefined`**, `PAR-JS-19`) · a `try` around the delivery (`D-73`) · an `async`, an `await`, a rollback · a second writer of the slot |
| `delivery.mjs` · **`settledAnswer(settle, answer)`** *(new)* | the settle: one `Promise.allSettled` over `invoked`'s returned values, then the datum, then the answer. **The unit's only suspension point** | an invocation, a store call, a `deliver` · a `.then`, a `new Promise`, a timeout · a rejection on any arm · a read of any package slot |
| `delivery.mjs` · **`bodyFailures(invoked)`** *(new)* | `readonly {handle, address, status, message}[]` for the rejections only — `status` verbatim `'ListenerBodyRejected'`, `message` generated over the **watched** address's spelling, `address` off the pair at `:157` | the body's own reason, read, stored or rendered (`D-137` item 5; `D-58`) · an asserted order among its entries (`DD-22`) · a status it did not find · a catch-and-report (`DD-23`) · an export shadowing the receipt's accessor |
| `constraints.mjs` · `constraintWrite` `:797`–`:897` | the tail's **read-and-clear** of `state.legSettle` into a local, and the branch `settle === null ? recordOut : settledAnswer(settle, recordOut)` — taken **before** the record's accessors are read and **after** the kernel returned | an `async`, an `await` · a second read of the slot · a change to `recordOut`'s three members (`:859`–`:863`) · a change to either `catch` (`:811`–`:813`, `:818`–`:828`) |
| `constraints.mjs` · `judgeReversal` head `:2618`, tail `:2989`–`:3038`, `:3060`–`:3068` | **nothing in this unit** — its per-leg `deliver` (`:3037`) passes three positions and its answer set stays `undefined \| judgementLog` (arms at `:2622` and `:2657`) | a `settlement` · an `async`/`await` inside its `try` · a moved `finally`, a moved freeze, a moved `leaveCommitFrame`/`closeCommit` |
| `constraints.mjs` · **`defineBodyFailures(record)`** *(new, beside `defineDiscardWitness:1924` and `defineResolutionLog:1961`)* | a **non-enumerable, `configurable` own GETTER** over `record[BODY_FAILURES]`, answering `BODY_FAILURES_EMPTY` (a frozen `{}`) where the symbol key is absent | a data property · an enumerable member · an `undefined` or absent arm (**present always**) · a fresh `{}` per call |
| `index.mjs` · the `state` literal `:475`–`:497` | the **eighth** slot: `legSettle: null`, beside `leg: null` (`:476`) | a second slot · a counter · a Map, a record, a commit, a window |
| `index.mjs` · `write` `:573`–`:762` | nothing but what its two callees carry: `:658`'s `return constraintWrite(...)` becomes the suspendable return, and the `finally` at `:759`–`:761` already closes the bracket **before** the wait | an `async`, an `await` · a moved `closeCommit` · a change to `:758`'s `n >= 4` arm |
| `index.mjs` · `delete` `:825`–`:920` | `:887` gains the fourth position (`true`); `:912` becomes the branch on the settle; `defineBodyFailures` is installed beside `:906`–`:911` | a moved `finally` (`:913`–`:916` restores `state.leg`/`state.legDelivery` **before** the wait) · an `async` · a change to `witnessDiscardedReversal`/`discarded` |
| `index.mjs` · `deliverAtTheCreation`/`:334`, `:2171` and `delivery.mjs` · `registrationDelivery` `:543`–`:585` | **nothing — unchanged**, three positions, the answer dropped (`D-149` item 3) | a `settlement` · a settle reader · a moved catch (`:335`–`:337`; `:576`–`:582`, rank `21`'s seat) |
| the receipt-building frames — `constraints.mjs:859`–`:895` (a write's) and `index.mjs:863`–`:911` (a delete's) | the **accessor's installation on every arm**, at the build; the **datum's installation by `settledAnswer`** only | a datum captured at the build (the getter exists for exactly this) · a fourth enumerable member · a second accessor (`returnedValues` is `U-08`'s) |

## §4 · The pins

**Twelve, each a single falsifiable requirement, each with a part and a cell.** A pin no part executes is a pin the unit did not meet; **no pin
rests on a run for its verdict** — every verdict is a cell's (§6).

- **`PIN-1` · START-ALL.** Every member of the delivered set whose registry slot holds a function is **started** before the answer is given, in the
  one shipped loop, and the started set's membership equals the delivered set's minus the kind-skipped and the absent. **Part:** `deliver`.
  **Lands:** `delivery.mjs:184`–`:208`, `:154`–`:183`. **Cells:** `S-SETTLE-1`, `S-SETTLE-2`.
- **`PIN-2` · THE WITHHOLD, AND ITS ONE SCOPE.** The answer is withheld until the delivered set has settled — and **only** where an answer exists:
  `settlement` is passed at `delivery.mjs:987` and `index.mjs:887` and nowhere else; the creation (`index.mjs:334`), the registrations
  (`delivery.mjs:575`) and the reversal's legs (`constraints.mjs:3037`) pass nothing. **Part:** `deliver` + `settledAnswer`. **Lands:**
  `delivery.mjs:105`, `:987`; `index.mjs:887`, `:912`. **Cells:** `S-SETTLE-1`, `S-SETTLE-3`.
- **`PIN-3` · NO ORDER IS ASSERTED — `DD-22` read at the datum.** No clause promises an invocation order, an arrival order among rejections, or an
  index-to-index correspondence between the started and the settled set; a drive compares sets and multisets, never sequences. **Part:** `deliver`,
  `bodyFailures`. **Cells:** `S-SETTLE-2`, `S-REJECTED-BODY-PLURAL`.
- **`PIN-4` · `D-73`'S SYNCHRONOUS THROW LEAVES THE WRITE UNANSWERED, AND NO `await` STANDS BETWEEN THE INVOCATIONS.** A body that throws
  synchronously leaves `deliver` as a throw; it crosses `terminalArm` (no `try` at `:987`), `settleArm` (`kernel-attempt.mjs:550`), `runAttempt`, and
  is re-thrown **unchanged** by `constraintCrossing` (`constraints.mjs:1424`); the write answers no record and no thenable, and a sibling already
  started is neither awaited nor observed. **And:** `settledAnswer` is entered only after the start loop returned normally, so no `async` and no
  `await` stands anywhere between the first invocation and the last, on any of the five call sites. **Part:** `deliver`, `constraintWrite`.
  **Cell:** `S-SYNCTHROW`.
- **`PIN-5` · `D-138`'S REJECTING BODY RESOLVES IT, AS A DATUM.** The write **resolves** with its record; the failure is read as one entry per
  rejecting handle; the reason is never read, stored or rendered; nothing retries and nothing rolls back. **No `Promise` rejection is a failure form
  on any arm.** **Part:** `bodyFailures`, `settledAnswer`, `defineBodyFailures`. **Cells:** `S-REJECTED-BODY`, `S-REJECTED-BODY-PLURAL`.
- **`PIN-6` · THE ALL-SYNCHRONOUS CONTROL — NO PROMISE ANYWHERE.** A delivered set whose bodies are all synchronous produces **no thenable**:
  `deliver` answers `null`, `settledAnswer` is never invoked, `write` answers the record it answered before, `Object.keys` is the three.
  **Part:** `deliver`'s two `null` arms; `constraintWrite`'s branch. **Cell:** `S-SETTLE-3`.
- **`PIN-7` · THE FIVE SLOTS DO NOT CROSS — `D-130` item 5's last sentence, discharged for the delivered set by the ONE RULE.** **The rule: nothing
  suspends inside a commit bracket, an invocation bracket, or a registration's catch.** Then: `EXTERNAL_COMMIT`/`EXTERNAL_DEPTH` (the name is
  `undefined` at both ends by construction, `delivery.mjs:206`; the depth's one consumer is reached with `index.open === 0` and its fallback answers
  `D-45`'s declared OPEN) · `state.legDelivery` (the `'arm'`/`'member'` window covers only the synchronous act, `index.mjs:855`–`:858`, `:913`–`:916`) ·
  `state.listenerFailure` (its lifetime is one synchronous frame and a suspension cannot reach it) · `witnessDiscardedReversal` (the window is
  captured at `index.mjs:830`; the witness clears only `raise.window === window`) · `REPAIR_LEGS_LAST` (brackets close LIFO; a suspended body's append
  finds the stack empty and is **lost**, never mis-attributed). **Cells:** `S-SLOTS-1`…`S-SLOTS-5`.
- **`PIN-8` · THE SLOT'S LIFETIME IS ONE SYNCHRONOUS SPAN.** `state.legSettle` has exactly **one writer** (`terminalArm:987`) and **one
  reader-and-clearer** (`constraintWrite`'s tail, synchronously, before `settledAnswer` is invoked); its value is `null` at every microtask boundary;
  and a nested write's own tail clears its own value before the enclosing assignment is made. **Part:** `terminalArm`, `constraintWrite`, the `state`
  literal. **Cell:** `S-SLOTS-1`.
- **`PIN-9` · THE SETTLE IS TOTAL AND IT IS THE ANSWER'S ONLY WAIT.** Every started body's outcome is **final** before the answer arrives: the
  answer resolves after the last settlement and after no other event; the count of started bodies equals the deduplicated triggered set's count; and
  each started body's continuation is observed before the answer. **The per-handle value map's CARRIAGE is `U-08`'s and is not read by any cell here**
  — what this unit owes is that the outcomes are settled and readable at the instant the answer is built. **Part:** `invoked` + `settledAnswer`.
  **Cells:** `S-SETTLE-1`, `S-REJECTED-BODY-PLURAL`.
- **`PIN-10` · THE RECEIPT'S CENSUS MOVES BY ONE NAME AND NO MORE.** `Object.keys(record)` stays `["op","watched","triggered"]`;
  `Object.getOwnPropertyNames` moves `5 → 6` with `bodyFailures` present; the descriptor is `{ enumerable: false, configurable: true, get: … }`; the
  plain arm reads the frozen empty `{}` and is present, never absent and never `undefined`; and no seventh name is added here.
  **Part:** `defineBodyFailures` + the receipt-building frames. **Cell:** `S-RECEIPT-ACCESSOR`.
- **`PIN-11` · THE NO-RECEIPT INSTANTS WITHHOLD NOTHING AND THEIR ANSWERS ARE UNMOVED.** The creation answers an instance, a registration an
  identity or `undefined`, a reversal's judgement its log — each is **not** a thenable on every arm, including the arm where a body suspends; and
  `settlement` is absent at those sites so that a rejecting body there stays `D-130` item 5's caller hazard rather than becoming a declared silence
  (`D-138` item 4's asymmetry, kept). **Part:** `deliverAtTheCreation`, `registrationDelivery`, `judgeReversal`. **Cell:** `S-SETTLE-3`'s second arm.
- **`PIN-12` · NOTHING ELSE MOVES.** No store byte, no addon entry, no Rust file; no status minted, renamed, ranked or widened; no `cfg` key; the
  instance stays at fifteen own members; `CommitRecord` at four and `TriggerPair` at two; the entry's load-time graph carries no top-level `await`
  (`contract.md:2379`) — this unit's first `await` is inside a function body and no module of the graph awaits at evaluation; no
  `bindings/js/index.d.ts` byte (U-09's) and no `docs/L1/modules.json` byte (`role_l2_integration`'s). **Cell:** `S-RECEIPT-ACCESSOR` (the census half)
  **and the shipped suite re-run** (the non-regression half).

## §5 · The closure predicate

**`CLOSED` iff, all at once:** **(a)** `{pins}` `=` `{pins with ≥1 part}` `=` `{pins with ≥1 cell}` — `12 = 12 = 12`; **(b)** `{cells named}` `=`
`{cells naming ≥1 pin}` — `12 = 12`, and no cell names none; **(c)** `{residuals}` `∩` `{pins}` `= ∅` — nothing this unit cannot drive was promoted to a
pin (§9); **(d)** `{amendments owed}` `∩` `{this unit's write set}` `= ∅` — every sentence §7 moves is another pass's to edit; **(e)** every pin's
**lands** resolves at `e3136af`. **A pin with no part, a pin with no cell, a cell with no pin, a residual read as a pin, or an amendment this unit
edits, each VOIDS the closure.** **The gate-2 token this contract returns is `CLOSED`, with the pin range `PIN-1`…`PIN-12`.**

## §6 · The cell map

**`S-SLOTS-1` RUNS FIRST: it is the falsifying drive of §2's `M-0`, and if it is red the spine is wrong and no later cell means anything.**

| # | cell | pin(s) | its observable, in one line | order |
|---|---|---|---|---|
| 1 | `S-SLOTS-1` | `PIN-7`, `PIN-8` | two suspended bodies each read `openCommits(store)` before and after their own `write` — each reads `1` then `0`, never `2`; the two `op.opId`s differ and neither body's `op` appears in the other's commit `log`; **the variant registers a constraint pair at the body's own address and asserts the body's `op` is absent from the triggering commit's `log`** | **FIRST** |
| 2 | `S-SETTLE-1` | `PIN-1`, `PIN-2`, `PIN-9` | three listeners each record `start` then await one shared gate; the answer is a thenable; all starts precede the gate and the answer; the settled set's membership equals the started set's, read as sets | 2 |
| 3 | `S-SLOTS-2` | `PIN-7` | a `delete`-fired listener suspends; from its continuation the caller writes at an address carrying its own listener — that listener fires (count `1`, not `0`) and the delete still answers its full `triggered` set | 3 |
| 4 | `S-SLOTS-3` | `PIN-7` | two registrations each fire a synchronously throwing body, nested; each act answers rank `21` naming **its own** address and neither carries the other's throwable | 4 |
| 5 | `S-SLOTS-4` | `PIN-7` | two suspended bodies each raise a `rollback`; the delete's answer reports **its own** window's raise and `[]` about the other's | 5 |
| 6 | `S-SLOTS-5` | `PIN-7` | a body suspended in one delivery writes at an address carrying a pair; no `repair-run` entry and no `pending` element of the *other* delivery names that write, and the kernel's restore floor is unchanged across both | 6 |
| 7 | `S-SETTLE-2` | `PIN-1`, `PIN-3` | one listener awaits a gate opened by a later `setImmediate`, a sibling is synchronous: the sibling's mark stands before the answer resolves — a suspension delays no sibling and the answer only | 7 |
| 8 | `S-REJECTED-BODY` | `PIN-5`, `PIN-10` | of two `async` listeners one resolves one rejects: the write resolves; `bodyFailures` has **one** entry at the rejecting handle with `status === 'ListenerBodyRejected'`, a message naming the watched address's spelling and no rendering of the reason; `read` answers the written value; unhandled-rejection count `0` | 8 |
| 9 | `S-REJECTED-BODY-PLURAL` | `PIN-3`, `PIN-5`, `PIN-9` | three bodies reject: three entries, read as a **set** of handles; no entry names another's reason; `Object.keys(failures)` order never asserted | 9 |
| 10 | `S-SYNCTHROW` | `PIN-4` | a synchronous listener throws a sentinel: the write **throws that same object**, answers no record and no thenable, and a sibling started earlier is not waited for | 10 |
| 11 | `S-RECEIPT-ACCESSOR` | `PIN-10`, `PIN-12` | over a plain write, a rejected-body write, a delete and a rollback: `Object.keys` is three; `getOwnPropertyNames` reads **six** with `bodyFailures` present; the descriptor has `enumerable: false, configurable: true` and a `get`; the plain arm reads `{}` and is present | 11 |
| 12 | `S-SETTLE-3` *(control)* | `PIN-6`, `PIN-11` | arm (a): an all-synchronous delivered set answers a **record**, not a thenable. arm (b): at the creation, at `addConstraint`, at a re-arm and at a `rollback`'s judgement — with a body that suspends — each answer is **not** a thenable | 12 |

**`S-A112` stays `OWED` and no cell is written for it.**

## §7 · The amendments this unit owes

Each is `role_spec_writer`'s; none is in this unit's write set, and no pin depends on the amendment having landed.

1. **`surface.md §2.7` item 2 (`:1654`–`:1662`) — THE INSTANT.** A post-suspension continuation now runs at an instant the item does not declare, and
   that instant is **covered by the answer**. **Owner: `role_spec_writer`**, at the amendment pass `RM-2` names.
2. **`surface.md §2.11` clause 2 (`:1896`) — THE SAVE'S PRIORITY.** Unmoved as to order, **read through** for the new second act: the arm now also
   carries the settle, created after the save and after the start loop, and the settle holds no store call. **Owner: `role_spec_writer`.**
3. **`surface.md §2.11` clause 3(ii) (`:1897`) — "RUNS".** The item measures a body's **synchronous span**; its continuation runs after the save and
   after its own suspension, which is not a failure of the clause. **Owner: `role_spec_writer`.**
4. **`surface.md §2.11` clause 8 (`:1915`) — THE ENTRY'S DECLARED ANSWERS.** The dispatcher census (`8` tokens) is unmoved; two of the instance's ten
   store-reaching members change what they answer (`write`, `delete`: `record` → `record | Promise<record>`). **Its `"commitFile"` half is READ
   THROUGH and not edited here** — it is the sentence that forecloses `terminalArm`'s return; the amendment that half is owed belongs to `U-02`/`U-03`.
   **Owner: `role_spec_writer`; scope: one sentence.**
5. **`surface.md §2.11` clause 1 (`:1895`)** — *"the member's return shape is UNMOVED at `undefined`"* stands whole. **No byte owed; recorded so no
   reader takes the clause-8 amendment for a licence to move this one.**
6. **`docs/L1/modules.json` `:330`–`:332` — `deliver`'s `output` row.** `"void — each registered function invoked …"` → `null | Promise<readonly
   BodyFailure[]>`, plus the fourth position. **`role_l2_integration`'s**; the endpoint counts are unmoved either way.
7. **`bindings/js/index.d.ts` `:616`–`:681` — `WriteRecord`'s fourth accessor.** Declared here and **written by `U-09`**: this unit's `bodyFailures` is
   runtime-carried and typed by no byte (the docblock precedent is `:621`–`:644` and `:645`–`:680`). **Owner: `U-09`.**

## §8 · The `U-06` / `U-08` boundary — decided

**THE DECISION: `returnedValues`' member byte STAYS `U-08`'s. This unit owns the PRODUCER and no carrier — it lands no accessor, no symbol-keyed value
datum and no census step for the values, and its `Object.getOwnPropertyNames` claim is `5 → 6` and no more.**

**The ordering half of the boundary, which this unit does take:** the settled outcomes must be **readable at the instant the answer is built** —
`invoked` holds `{handle, address, returned}` for every started recipient, `settledAnswer` resumes only after `allSettled` over all of them, and both
consumers (`bodyFailures` here, `returnedValues` in `U-08`) read **the same list at the same instant**; so `U-08` is a member's definition over data
this unit has already made total, needing no second wait and no second settle.

**Justification, in one paragraph.** `D-150`'s own unsettled item says the boundary is the design's to draw and *"either way the code is the same
delivery point"* — so the question is not cost but **falsifiability and blast radius**, and both point the same way. A unit whose deliverable is a
*correctness property* must be checkable by a green or red on that property alone: if this landing also owned the fourth accessor, then
`S-RECEIPT-ACCESSOR` would have to distinguish a defect in the settle from a defect in the datum, and the two censuses (`5 → 6` and `6 → 7`) would
move in one pass with no cell able to say which one failed. Keeping the carrier in `U-08` also preserves the ladder's one declared dependency
(`seven-key-config.md §13` item 5: *"It depends on `U-06` alone"*), keeps `U-09` the single home of the declaration byte `D-150` item 3 named, and
leaves this contract's census pin at one number a drive can read. **What this unit owes in exchange is a pin and not a promise:** `PIN-9` makes the
outcomes total and final at the answer's instant, and `PIN-3` forbids the arrival order from ever becoming an assertion — so the datum `U-08`
installs is complete, unordered, and `undefined`-returners excluded, on data no later pass has to recompute.

## §9 · The residuals

1. **A suspended REPAIR body's `EXTERNAL_*` slots.** `deliver` never invokes a repair (`delivery.mjs:181` skips `kind === 'constraint'`), so no argument
   here covers it and arm (A) would not either. **The arm that would** is a fourth position on `openCommit` naming the invocation — **`SILENT`,
   priced under `RM-6`. Owner: `U-04 SAVE-CALL`.** **Revisit:** the first pass that lands an `async` `saveCall`.
2. **A suspended repair body's post-`await` legs are LOST silently** (`REPAIR_LEGS_OPEN` is empty when a continuation appends, `state.mjs:823`) —
   **loss, never mis-attribution**, named rather than claimed clean. **Owner: `U-04`. Revisit:** the same.
3. **A rejecting body at the three no-receipt delivery sites reaches no surface** (`index.mjs:334`, `delivery.mjs:575`, `constraints.mjs:3037`) —
   `D-130` item 5's caller hazard **preserved deliberately** (`PIN-11`; `D-138` item 4's asymmetry). **Owner: `U-08` for the reversal's judgement;
   the creation's and the registrations' have no owner and need a ruling first.** **Revisit:** the first pass that gives a no-receipt instant a receipt.
4. **`A112` stays `OWED`.** Unmeasurable until `RM-5`'s instrument exists. **Owner: `role_test_writer`.** **Revisit:** that instrument's landing.
5. **`K-11`'s reading — *"no `await` token at all"* — is FALSIFIED by this unit**, which introduces the entry graph's first `await` inside a function
   body. **The law (`contract.md:2379`) is untouched** (its subject is load-time module evaluation). **Owner: the pass that lands `NEW-1`**, whose `O3`
   load-under-`require` sentinel distinguishes the two. **Revisit:** that sentinel's first run. **No cell here claims it.**
6. **The settle never happens.** A body's promise that never settles means the answer never arrives: no timeout is armed (a timer is a scheduler,
   `contract.md:602`), no record is reachable by any other route, and the caller's `await` never resumes. **The answer is withheld, and that means
   withheld** (`D-130` item 5). **Owner: the caller, declared.** **Revisit: none — recorded so it is never read as a defect.**
7. **`M-0` — whether a commit bracket can stand open across a suspension this unit does not author.** `NOT DRIVEN`; the two candidates at §2.
   **Owner: this unit's first cell, then the pass that owns whichever bracket is found open.** **Revisit:** `S-SLOTS-1`'s variant, positively.

---

## §10 · `M-0` — DRIVEN `2026-11-17`, AND GREEN ON THE DELIVERED-SET PATH

**The supervisor ran the instrument §2 named, on the current tree, through the checkout's own entry and the built addon** (`e3136af`; Node `v24.20.0`; `bindings/js/build/Release/storeroom_js_binding.node`, `1,456,712` bytes, mtime `2026-11-17 22:46:21`). **It imports the entry's own internal accessors — `openCommits` and `currentWindow` from `bindings/js/src/entry/state.mjs`** — because that is the only place the commit count is readable, and a test may import them.

```
const store = storeCreate({ journalLength: 16, listeners: [] });
store.listen('h', [['a']]);
store.register('h', async () => {
  samples.push(['body:sync-part', openCommits(store), currentWindow(store)]);
  await null;                                        // ONE microtask hop
  samples.push(['body:post-await-BEFORE-write', openCommits(store), …]);
  const inner = store.write(['b'], 'mem', 9);
  samples.push(['body:post-await-AFTER-write', openCommits(store), …]);
  … inner.op.opId, descriptor of `log` …
});
const rec = store.write(['a'], 'mem', 1);             // the OUTER write
… two setImmediate drains …
```

```
["before-outer-write",0,0]
["body:sync-part",1,2]                    ← the commit IS open inside the body's synchronous span
["after-outer-write-returned",0,0]       ← and it has CLOSED by the time the verb returned
["body:post-await-BEFORE-write",0,0]     ← ★ AT THE SUSPENDED CONTINUATION NO BRACKET STANDS OPEN
["body:post-await-AFTER-write",0,0]      ← the inner write opened and closed its own, synchronously
["after-drain",0,0]
outer.op.opId = op-1 | b = 9             ← the inner write LANDED as its own operation
```

**WHAT IT PROVES, AND WHAT IT DOES NOT.** **The premise `PIN-7`'s slot 1 rests on holds on the delivered-set path, MEASURED:** the commit count is `1` inside a body's synchronous span and **`0` at that body's own post-suspension continuation**, so `openCommit`'s depth fallback (`state.mjs:674`–`:675`) is **never reached with a commit open** — the condition `P-5`'s MUST NOT needs in order to be crossed silently **does not stand on this path today**, and the inner write opened a commit of its own (`op-2`).

**AND THE HONEST EDGES, so this is not read as a clean bill.** **(a)** This drives the **delivered-set** path only. **The two candidate brackets §2 named are not exercised**: `judgeReversal`'s tail `finally` (`constraints.mjs:3061`–`:3068`) and `state.mjs:787`–`:800`'s `COMMIT_SCOPE` bracket — **the reversal arm needs a reversal whose listener suspends, and no cell here builds one.** **(b)** The tree today carries **no `await` token at all** (`K-11`), so the property is *trivial* on today's bytes: nothing can suspend inside a bracket because nothing suspends. **What this drive establishes is the BASELINE the unit must preserve — the bracket closes before the verb returns — and the real test of `PIN-7` is `S-SLOTS-1`'s variant after this unit's own `await` exists.** **(c)** `S-SLOTS-1` as specified in §6 therefore stays the FIRST cell, unchanged; `M-0`'s residual 7 is not retired, it is narrowed to the two candidate brackets.

**NO CELL IS CLAIMED GREEN BY THIS DRIVE.** It is a pre-implementation probe of the spine's premise, not the unit's cell.

---

## §11 · THE LANDING, MEASURED — and one finding that stops two cells

**THE IMPLEMENTATION LANDED `2026-11-17`** (18 edits: `delivery.mjs` ×7, `state.mjs` ×1, `constraints.mjs` ×5, `index.mjs` ×5, with `index.mjs`'s `write` verified as a no-op). **The twelve cells ran:** **`10` pass, `2` fail** — and the shipped e2e battery beside them reads **`1108` tests, `1105` pass, `2` fail**, the two failures being the same two cells. **No shipped cell is red** (`PIN-12`'s non-regression half), and `S-SYNCTHROW` — the anti-harmonisation control — is green, so `D-73`'s synchronous throw still leaves the write unanswered.

**CELL REPAIRS MADE AT THE LANDING, EACH A DEFECT IN THE DRIVE AND NOT IN THE UNIT.**
1. **`S-SLOTS-1`** read its record synchronously off a call that now answers a thenable; its two arms now `await` the answer after the gate (the cell's own `M-0` shape, carried past the withhold this unit introduces).
2. **`S-SETTLE-3` (b.1)/(b.2)** could not reach their own premise: the `addConstraint` arm's context carries a non-null `op` or `tier` at every pass, so the guard answered `true` and **no repair ever landed**; the re-arm's guard had the mirror defect (`context.value !== undefined` at an address that already held a value). Both bodies now refuse on a reachable condition and repair **at the pair's own address**, so the re-run passes.
3. **A misordered assertion** in `S-SLOTS-4` (`assert.equal(<expr>, <message>)`) — the same defect class as one in `S-SETTLE-3`; both are `assert.ok` now.
4. **The shipped census cell** `tests/e2e/surface.test.mjs:775` pinned the delete receipt's seven own names and now reads eight: **the delete withholds its answer exactly as a write does** (`PIN-2`), so its delivered set can reject and `bodyFailures` is where those rejections cross. The name is appended after `discarded`; the order the entry produces is unchanged.

### ★ THE FINDING — NO LISTENER BODY IS DELIVERED AT A REGISTRATION INSTANT, MEASURED

**Two probes on the landed tree, in a `mktemp -d`, through the checkout's own entry:**

```
(a) listener at the pair's OWN address; the pair PASSES; addConstraint at that address
    → answered an OBJECT (identity), fired = []            ← nothing delivered
(b) listener at a repair's write address; the pair refuses and its repair writes there
    → asked twice, repaired once, P = 7 LANDED, body-fired = []   ← the write landed, nothing delivered
(c) CONTROL — a plain write at that same address
    → fired = ["sync-body"]                                ← the same listener fires
```

**So at `addConstraint` (and by the same shape, at `rearm`'s `constraintOn`), a registration fires NO listener body — neither from its own act nor from a repair's write — while a plain write at the same address does.** **TWO DECLARED SENTENCES ARE CONTRADICTED BY IT:** `D-125` item 1's *"the four registration instants deliver"* (`strata/decisions.md:6520`–`:6535`; `surface.md:1728`) **and** `D-104` item 2's *"a repair's write's listeners are delivered in the commit's delivery"* (`strata/decisions.md:5321`–`:5326`). **The mechanism is legible**: a registration mints no journal op, so the store's `triggered` for it is empty; and a repair's write inside that pass is a nested write whose delivery the outer act owns — and the outer act has nothing to deliver.

**IT PREDATES THIS UNIT AND THIS UNIT DOES NOT TOUCH THAT PATH** (the registration deliveries still pass three positions and were byte-unmoved; the probes' `deliver` answers `null` there by `PIN-11`'s first arm).

**AND IT IS WHY TWO CELLS CANNOT GO GREEN.**
- **`S-SLOTS-3`** needs two registrations to fire a *throwing* body: the drive counted `{"outer":0,"inner":0}` — nothing fired, so neither act can answer rank `21`.
- **`S-SETTLE-3`'s arm (b.1)/(b.2)`** needs a body to *suspend* at a registration: with nothing delivered, the arm's premise is unreachable, and the drive's own guard (`addSuspended === true`) fails honestly rather than turning the cell green on a fiction.

**THE DECISION THIS CONTRACT CANNOT TAKE, STATED FOR THE ARCHITECT.** **Either the registration instants DO deliver and the tree has a defect against `D-125` item 1 / `D-104` item 2 — in which case the two cells stay red until a unit makes a registration instant deliver, and that unit is not this one — or the DECLARATION is wider than the mechanism, and the two cells must be re-specified to a reachable premise (the answer is not a thenable, measured without a suspending body, and the delivery claim narrowed in a spec pass).** **`PIN-11`'s own text is unaffected either way** — a no-receipt instant withholds nothing — **but the cell that discharges it must know which of the two worlds it lives in.**

---

## §12 · THE DEFECT FIXED, THE TWELVE GREEN, AND THE TRIO MEASURED — `2026-11-17`

**THE DEFECT `D-151` RULED IS FIXED, AND `D-152`'s TWO ANSWERS ARE WHAT MADE THE FIX SMALL.** Five edits in
`bindings/js/src/entry/kernel-registration.mjs`, no store byte, no addon entry, no status, no `cfg` key, no declaration byte.

**THE DIAGNOSIS, AND IT WAS NEITHER "NO CALL" NOR "SUPPRESSED DELIVERY" — THE LIST WAS EMPTY.** The channel is called and its
flag is right (`index.mjs`'s `state.registrationDelivery = 'triggered'`; the close's `store[REGISTRATION_DELIVER]`), and the
shipped `RLD-6`/`SCREG-08` cells fire through it. **What failed is that `owed` is filled by `registrationRoute` — the repair's
`context.write` — and by nothing else.** **A repair that takes `D-105`'s ONE SUPPORTED ROUTE instead — the published
`store.write(address, tier, value, record)`, a four-position call that JOINS the commit — appends no `owed` entry at all**: it
takes the entry's `n >= 4` arm, leaves the store's answer on the repair-leg channel, and delivers nothing in its own frame. **So
the close was handed an empty list, its gate never called the channel, and no listener could fire** — the `body-fired = []` of
§11, measured with the write landed.

**THE FIX, AND WHY IT TOUCHES NO STORE BYTE.** A repair leg already carries `{op, triggered}` where `triggered` is **the store's
own computed set** (`src/store.rs:2211`–`:2240`), so `D-152`'s *"Compute within the store"* is satisfied by *reading* rather than
computing. The edit reads that channel in `kernel-registration.mjs`'s own frame — **the only frame that holds the two guards the
read needs** (`invocation.bracketed`, and `kernel.attempts` unmoved across the body, `D-104` item 2's own guards) — and appends
each leg to `owed` in the shape `registrationRoute` already uses. **No address is walked, no prefix is tested, and no handle is
de-duplicated in that frame**: the union is a concatenation and `deliver`'s dedupe is the only one (`D-152` item 1). **A
registration that lands no write appends nothing and delivers nothing** (`D-152` item 1), which is why the act's answer stays a
non-thenable identity (`PIN-11`).

**THE TWELVE, MEASURED.** **`tests/e2e/delivery-settle.test.mjs`: `12` tests, `12` pass, `0` fail.** `S-SLOTS-3` and
`S-SETTLE-3` — the two the defect held red — are green, and `S-SYNCTHROW` (the anti-harmonisation control) is still green.

**THE TRIO, WITH ITS INVOCATIONS.**
- **`test`** — `npm test` (`node --test "tests/**/*.test.mjs"`): **`1337` tests, `1336` pass, `0` fail.**
- **`typecheck`** — `npm run typecheck` (stage + `tsc -p tsconfig.typecheck.json` + `tsc -p tsconfig.typecheck.nodenext.json`):
  **exit `0`.**
- **`build`** — `npm run build`: **exit `0` with `CARGO_HOME="$PWD/.cargo-home"`**, which is an **ENVIRONMENT FACT** the
  repository carries and not a green on a bare invocation: without it the leg stops at *"location searched: crates.io index …
  offline mode"*, a resolution failure of the toolchain home and not of this unit's bytes.

**THE ONE RESIDUAL THIS LANDING LEAVES, NAMED RATHER THAN SMOOTHED.** `registrationDelivery` still runs **one `deliver` per
landing** and keeps a running handle list of its own, so the instant's union is delivered in as many calls as it has landings.
**The outcome is lawful** — that list makes it once-per-distinct-handle — **but it is a SECOND dedupe beside `deliver`'s, which
`D-152` item 1 names as the thing that must not exist.** **The collapse is one edit and it has a cost:** with a single `deliver`
over the whole union, `state.listenerFailure.address` — the address rank `21` `ListenerBodyThrew` names — becomes **the first
landing's op address** rather than the address of the landing whose body threw, which is observable only on a **multi-write**
registration. **Owner: a later pass, whose choice is the collapse or the second dedupe.** No cell among the twelve can tell the
two apart.
