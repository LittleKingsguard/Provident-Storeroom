# `U-STOREROOM-06 DELIVERY-SETTLE` — module design

**PROVENANCE.** Written `2026-11-17` at `HEAD` `e3136af` by **`role_l3_designer`**, landed by the supervisor because that role holds no write
channel. **Its brief is `docs/L1/seven-key-config.md` (`§2.3`, `§4 (iv)`, `§5`, `§6`, `§8`, `§9`), `strata/proposals.md P-5` and
`strata/decisions.md D-130`…`D-138`.** **It implements nothing, writes no cell, and amends no spec.** Every runtime statement is
`NOT DRIVEN`; the only measured facts it cites are `strata/research.md §22.12`'s `M-1`…`M-4` and `§23.16` (2)'s `own=[…]` line.

---

## §1 · The unit, and its first sentence

**This unit changes the package and only the package** — `bindings/js/src/entry/{delivery,state,constraints}.mjs` and `bindings/js/index.mjs`
— **so that every body of a write's or a delete's delivered set is started in the one synchronous invocation loop, and the act's answer is
withheld until that set has settled.** No store byte, no addon entry, no Rust, no contract directory (`D-130` moves no store byte;
`surface.md:387`; `D-137` item 1 leaves `commitFile`'s answer unmoved). It changes **what `write` and `delete` answer**, **what `deliver`
does**, and **which package state is safe while a body is suspended** (`D-130`'s unsettled item 5). It answers to `D-130` items 3–5 and
`D-138` whole, and to nothing else.

---

## §2 · The changed surface, in signatures

| # | site | BEFORE | AFTER | why |
|---|---|---|---|---|
| 1 | `delivery.mjs:105` `deliver(state, triggered, triggeringAddress)` | `→ void` (`modules.json:332` declares *"void — each registered function invoked …"*) | `→ null \| Promise<readonly BodyFailure[]>`, plus a fourth position `settlement` (absent = *this caller has no answer to withhold*) | the invocation loop is UNMOVED; its answer becomes the settle. `null` iff no started invocation returned a thenable — **so an all-synchronous delivery produces no promise anywhere and no shipped cell changes shape** |
| 2 | `delivery.mjs:875` `terminalArm(state, record)` | `→ undefined` | **`→ undefined`, unmoved** | forced, not preferred: `PAR-JS-19`'s answer cell says *"ITS ANSWER IS `undefined` AND NO KERNEL ACT BRANCHES ON IT"* (`state.mjs:84`–`:85`) and the kernel discards it (`kernel-attempt.mjs:550`). The settle leaves by `state.legSettle`, not by the return |
| 3 | `index.mjs:475`–`:497`, the `state` literal | 7 slots | **8**: `legSettle: null` beside `leg: null` (`:476`) | the one place the *leg's* settle can live, exactly as `leg` holds the leg's record. One writer (`terminalArm:987`), one reader (`constraintWrite`'s tail), both inside one synchronous span |
| 4 | `constraints.mjs:797` `constraintWrite(state, instance, address, tier, value)` | `→ recordOut` (sync) | `→ recordOut \| Promise<recordOut>`: its tail reads-and-clears `state.legSettle` and answers `settledAnswer(settle, recordOut)` | it is the write's answering frame, and the only place the settle composes with the record |
| 5 | `index.mjs`'s `write` member / `index.d.ts:1121` | `write(address, tier, value, commit?): WriteRecord` | same body, declared `WriteRecord \| Promise<WriteRecord>` | the ≤3 arm already returns `constraintWrite(...)` (`:658`); the ≥4 arm is the kernel's leg and stays synchronous (`:758`). **No byte of the member's frame moves** — only the declaration (U-09's byte) |
| 6 | `index.mjs`'s `delete` member / `index.d.ts:1140` | `delete(address, tier?): DeleteRecord` | `DeleteRecord \| Promise<DeleteRecord>`: `:887` becomes `const settle = deliver(state, owed, …, true)`; `:912` becomes `return settledAnswer(settle, receipt)` | the `finally` at `:913`–`:916` still runs first, so `state.leg`/`state.legDelivery` are restored **before** the wait |
| 7 | `constraints.mjs:2975`–`:3037` `judgeReversal(...)` | `→ judgementLog` | `→ judgementLog \| Promise<judgementLog>`: the per-leg loop collects each `deliver`'s settle; the tail composes | the `finally` at `:3061`–`:3068` (freeze, `leaveCommitFrame`, `closeCommit`) still runs before the wait |
| 8 | `delivery.mjs`, new names | — | `settledAnswer(settle, answer)` · `bodyFailures(invoked)` | inside `js-registry-delivery`'s own assignment (*"hold the delivered set's settlement: the running count, the start-all, the one rejection that crosses and the per-handle value map, answered to the arm that attaches them"*); `settledAnswer` is the design's **only** suspension point |

**What a caller receives, both cases.** *Plain:* the same `WriteRecord`/`DeleteRecord` as today, `Object.keys` `["op","watched","triggered"]`,
**no promise anywhere**, because no body suspended. *A body rejected:* **the write RESOLVES with that same record** (`D-138` item 2) and the
failure is a datum read beside the record's other accessors (§5). **Never a rejection**: the settle is built by `Promise.allSettled`, which
cannot reject, and no `async` frame stands between a store act and the caller.

**How `D-73` survives the await.** `settledAnswer` contains **no invocation, no store call and no `deliver`**, and is entered only after the
start loop returned normally. A synchronous body's throw therefore never reaches an `async` frame: it leaves `deliver` as a throw, crosses
`terminalArm` (`:987`, no `try`), `settleArm`, `runAttempt`, and is re-thrown unchanged by `constraintWrite`'s `catch`/`constraintCrossing`
(`constraints.mjs:811`–`:813`) — **the write answers nothing and the caller sees the body's own error object** (measured, `M-1`).
**Corollary, and it is the design's spine: no `async` and no `await` may stand anywhere between the first invocation and the last, on any
of the five call sites.** An `async deliver` or an `async write` would do two forbidden things at once — turn `D-73`'s throw into a
*rejection* (the four sites `D-138` item 3 leaves standing) and move the invocations after a suspension, which is `DD-22`'s *"asynchronous
invocation with an undeclared scheduler"* (`contract.md:602`).

---

## §3 · The settle device

**No scheduler, no queue, no flush, no timer, no counter.** The start loop is `deliver`'s shipped `:184`–`:208` loop with its snapshot
(`:154`–`:183`), its dedupe on `entry.handle` (`:160`) and its one-argument invocation (`:206`) unmoved; it additionally records, per started
recipient, `{handle, address, returned}` into a local list `invoked`. **The body count lives in one place — `invoked.length`, a local of
`deliver` — and its settlement in another: `Promise.allSettled` over `invoked`'s returned values, taken after the loop ends.** There is no
package-side counter, because a counter would have to be module-level or on `state` and would be a sixth slot §4 must defend.

Steps, and nothing else: (1) build `recipients` (unmoved, `:154`–`:183`); (2) `invoked = []`; for each recipient with a function,
`const returned = externalCall(state.receiver, () => listener(decodeSegments(address)))` and append — **a throw here leaves `deliver`
immediately** (§7 arm 1); (3) if `settlement` is falsy and any `returned` is a thenable → `null`; (4) if no `returned` is a thenable →
`null`; (5) otherwise return `bodyFailures(invoked)`, an `async` function awaiting one `Promise.allSettled` and answering
`readonly {handle, address, status, message}[]` for the rejections only.

**Why this arm and not the two the plan prices.** *The stack discipline* is refused by the mechanism (`state.mjs:826`–`:839` closes at the
body's first suspension). *Arm (A), per-window state on the attempt*, is **the wrong key for this unit's case**: `start all` makes **N bodies
of ONE window** concurrent (`D-130` item 4), and a per-window slot holds one value for all N — so (A) makes two concurrent *windows* sound
and leaves the crossing `D-130` item 5 names. *Arm (C), capture-into-locals*, matches the fact: **one invocation, one capture**, at the cost
of one local and no new surface. So **(C) is the arm, plus one ordering rule stated as a rule because it is what makes (C) sufficient: no
`await` inside any `openCommit`/`closeCommit` bracket** (`state.mjs:790`–`:795`; `index.mjs:598`/`:760`, `:827`/`:918`;
`constraints.mjs:3061`–`:3068`). With that rule the commit count is zero at every microtask boundary, which is what keeps a suspended body's
own write on its declared arm (§4, slot 1).

`Promise.allSettled` is chosen over a hand-rolled `.then` for a corpus reason: it is a **static own data property of a global binding** — the
class `Reflect.apply` already sits in (a sweep's boundary stops there, `index.mjs:545`–`:548`) — whereas `p.then(…)` reads
`Promise.prototype`. **`settledAnswer` uses `await`, not `.then`, for the same reason.** *(A language fact, not a measurement: `await` on a
native promise resolves through internal slots and reads no `then`.)*

---

## §4 · The five slots, one by one

`D-130`'s unsettled item 5 is discharged below **for the delivered set**; two residuals are named rather than absorbed.

| slot | the crossing | the device | the code site | the observable that proves it does not cross |
|---|---|---|---|---|
| **`EXTERNAL_COMMIT` / `EXTERNAL_DEPTH`** (`state.mjs:319`, `:328`; bracket `:811`–`:845`) | the bracket's `finally` (`:826`–`:839`) restores the name and decrements the depth **at the body's first suspension** while the body still runs; a second suspended body then reads a depth that is not its own | **(C) + the no-await rule.** For a *delivered* body the name is `undefined` at both ends by construction (`deliver:206` calls `externalCall` with the thunk alone and no commit), so nothing in the name can cross; the depth's one consumer (`openCommit:674`–`:675`) is reached with `index.open === 0` (no bracket spans a microtask), so its fallback answers the **declared** OPEN of `D-45` though the depth it reads is the restored one — **same answer, second route** | `delivery.mjs:206`; `state.mjs:667`, `:674`–`:675`, `:822`, `:837`–`:838` | **`S-SLOTS-1`**: two suspended bodies each call `openCommits(store)` immediately before and after their own `write`; each reads `1` then `0`, never `2`; the two records' `op.opId`s differ and neither body's `op` appears in the other's commit. **Residual, declared:** a **repair** body's suspension is not covered — `deliver` never invokes a repair (`:181` skips `kind === 'constraint'`), and (A) would not cover it either. The arm that would is a fourth position on `openCommit` naming the invocation: **SILENT**, priced under `RM-6` |
| **`state.legDelivery`** (`index.mjs:484`, `:858`, `:915`; read `delivery.mjs:984`) | a `delete` holding `'member'` across a suspension makes an interleaved write's terminal arm **skip its delivery silently** — no code, no log, no throw | **(C):** the flag is already captured into `standingDelivery` (`:855`) and restored in a `finally`; the design's rule puts **the wait outside that `finally`**, so the `'arm'`/`'member'` window covers only the synchronous act | `index.mjs:855`, `:858`, `:913`–`:916`, `:887`/`:912` | **`S-SLOTS-2`**: a listener fired by a `delete` suspends; from its continuation the caller issues a `write` at an address carrying a listener of its own; **that listener fires** (count `1`, not `0`), and the delete's record still answers its full `triggered` set |
| **`state.listenerFailure`** (`delivery.mjs:580`; declared `index.mjs:496`) | two registration deliveries write the same slot; the second act's throwable overwrites the first's before the first act reads and converts it | **(C) and only (C):** the slot's lifetime is one synchronous frame — the catch (`:576`–`:582`) and the act's conversion are in the same span, and **a suspension cannot reach this arm at all**, because a suspended body's failure arrives as a rejection, which `registrationDelivery` never sees | `delivery.mjs:572`–`:582`; `index.mjs:496` | **`S-SLOTS-3`**: two registrations, each firing a synchronously throwing body, **nested inside one another**; each act answers rank `21` `ListenerBodyThrew` naming **its own** address, and neither answer carries the other's throwable |
| **`witnessDiscardedReversal`** (read `index.mjs:905`) | a raise is stamped with a window id and consumed by whichever act reports it; a suspended body's raise could be settled by the wrong window's report | **(C):** the window is captured into the local `window` at `:830` at the delete's opening and handed to the witness at its own answer; the suspended body's raise is stamped with its own window at raise time, and the witness clears only `raise.window === window` (`constraints.mjs:2176`–`:2189`) | `index.mjs:830`, `:905`; `constraints.mjs:2164`–`:2192` | **`S-SLOTS-4`**: two suspended bodies each raising a `rollback`; the delete's answer reports **its own** window's discarded raise and `[]` about the other's; the other is reported on the act that owns its window |
| **`REPAIR_LEGS_LAST`** (`state.mjs:388`, set `:836`, read `:887`–`:888`) | the outer bracket sets it at its own first suspension; an inner bracket closing *later* would leave the outer's legs answering | **(C):** the brackets close **LIFO by construction** (an inner invocation is invoked inside the outer's synchronous run, so it closes first), so the value at any read is the outermost-closed bracket's; and an append from a suspended body finds `REPAIR_LEGS_OPEN` empty and goes nowhere (`:423`) — **loss, never mis-attribution** | `state.mjs:421`–`:423`, `:823`, `:831`–`:836`, `:886`–`:889` | **`S-SLOTS-5`**: a body suspended in one delivery writes at an address carrying a pair; no `repair-run` entry and no `pending` element of the *other* delivery names that write, and the kernel's restore floor is unchanged across both. **Residual, declared:** a suspended **repair** body's post-`await` legs are lost silently. Not a crossing between delivered bodies; named, not claimed clean |

**Verdict on `D-130` item 5's last sentence:** for the set `deliver` starts, **no slot crosses**, and the four arguments are by construction
of the *rule* rather than by luck — the rule being one sentence: *nothing suspends inside a commit bracket, an invocation bracket, or a
registration's catch.* The two residuals are both a body the **kernel** invokes, and belong to the design that makes the kernel's act
suspend — `U-04 SAVE-CALL`'s `saveCall`, the only `async` the rulings name.

---

## §5 · The receipt's delivery accessor

**Two accessors, not one.** One accessor carrying both the channel's values (`D-136`) and the delivery's failures (`D-138`) would weld
`D-138`'s observability to `CH-3`'s still-open keying question, so a `CH-3` answer could unmake a failure's readability. Two keep them
independent and land in two units: **this unit adds the failure datum (`getOwnPropertyNames` `5 → 6`); `U-08 CHANNEL` adds the channel's
(`6 → 7`).**

**Name — proposed: `bodyFailures`.** The subject is a listener **body**; rank `23`'s own name is `ListenerBodyRejected` (`D-137` item 5); the
sibling on the same record is `discarded`, a plural noun. It collides with neither `discarded` nor `log` nor a plausible `CH-NAME`.

**Emptiness — proposed: present always, `{}`.** Forced toward *present* by `D-138`'s unsettled item 3 (a body's failure must be readable
**exactly when no channel stands**), so no `channel`-conditional presence and no `undefined` arm; and because the datum is a per-handle map,
its empty value is `{}` rather than `log`'s `[]`. A frozen module-level `{}` is the constant, on `defineResolutionLog`'s precedent for `[]`
(`constraints.mjs:1959`).

**The datum and its shape.** `settledAnswer` installs `record[BODY_FAILURES] = failures`, a symbol-keyed own property (beside
`COMMIT_LOG`/`SETTLED_ON_THE_PASSING_ARM` in `state.mjs`'s symbol block) — invisible to both censuses, the `A117` (D6) device. The accessor
is the **third of the family** and lives with the other two: `defineBodyFailures(record)` in `constraints.mjs`, beside `defineDiscardWitness`
(`:1924`) and `defineResolutionLog` (`:1961`) — a non-enumerable, `configurable` own **getter** over `record[BODY_FAILURES]` answering the
frozen empty map when the symbol key is absent. **A getter by necessity, not by taste:** the record is built at `constraints.mjs:859`–`:895`
*before* the set settles, so a datum captured there would answer `{}` about a body that then rejects — the same reason `discarded` is a read
(`:1918`–`:1923`).

Each entry is `{status, message, address}`: `status` is `'ListenerBodyRejected'` verbatim, `message` is `D-137` item 5's generated sentence
over the **watched address's spelling**, `address` is the binding's own address off the pair at `deliver:157`. **The body's own reason is
never read, stored or rendered** (`D-137`'s *"the sentence declares what crossed and not what the body rejected with"*; `D-58`'s retained-data
bound).

**The census, stated.** `Object.keys(record)` stays `["op","watched","triggered"]`; `Object.getOwnPropertyNames(record)` moves **`5 → 6`** —
today **measured** `["op","watched","triggered","discarded","log"]` (`§23.16` (2)). Nothing else moves: not `CommitRecord`'s four, not
`triggered`/`pending`'s `TriggerPair[]`, not the instance's fifteen.

**The plurality — confirmed, with one correction to `D-138`'s claim.** *First-to-settle* is unnecessary (nothing is dropped); *a declared
order* is unnecessary (a map has no declared order); *a list* **is** what this is — keyed by handle, which is what makes it total; *one
refusal per call* is refused (it changes what an answer is). **The correction:** a JS object's own string keys are read in insertion order,
so the **arrival** order of `N` rejections is observable through `Object.keys(failures)`. **No clause may promise it and no drive may assert
it** — a drive compares the entry **set**, never its order (`DD-22` read at the datum). **`CH-3` is untouched**: the channel's keying stays
`U-08`'s.

---

## §6 · The ordering and the window

The declared order is `D-117`'s and is not moved: **ASK → REPAIRS LAND → RE-RUN → SAVE → DELIVER → the answer.**

- **Before the save, nothing changes.** Nothing here runs before `:939`; no body is started before the save.
- **After the save, the start loop runs synchronously in the kernel's own frame** — the same frame as today. Every body is *started* before
  `terminalArm` returns; the kernel's logic above it sees byte-identical state.
- **The answer stops being withheld at exactly one instant: when `settledAnswer` resumes.** That frame holds no store call, no invocation and
  no commit: `closeCommit` has already run (`write`'s `finally`, `index.mjs:760`/`:918`), the record is built (`constraints.mjs:859`), and
  `state.leg`/`state.legDelivery` are restored. The only thing unsettled when the caller receives the record is the caller's own knowledge
  of the bodies' outcomes — **which is the datum**.
- **A body's synchronous part still runs inside the verb's window**, exactly as `§2.7` item 2 measures it (`surface.md:1654`–`:1662`); only a
  *post-suspension* continuation runs at the instant item 2 does not declare (`M-3`), and that instant is now **covered by the answer**,
  since the answer cannot arrive before the continuation's settlement.
- **No order is asserted among bodies, by construction:** the start loop is the shipped loop, the snapshot is taken at `:154`–`:183`, and
  `allSettled` reports a **set** of outcomes. **A drive may compare the membership of the started set, the membership of the settled set,
  the multiset of outcomes, and the phase boundary (every start precedes every resume) — never an index-to-index correspondence.**

**The four registration instants and the creation** (`index.mjs:334`/`:2171`; `delivery.mjs:575`): **out of this unit's answer and in it only
as a one-line consequence.** They have **no `WriteRecord` and no `DeleteRecord`** — a registration answers an opaque identity or `undefined`
and the construction answers an instance — so `D-138`'s carrier has no seat there and `D-130` item 4's *"the answer"* has no answer to
withhold. Their `deliver` calls are therefore called with `settlement` absent and drop the answer: **the start loop is unchanged and the
invocations are unmoved** (`surface.md:1728`). The consequence is stated and not absorbed: **a rejecting body at those five instants has no
surface at all**, so `deliver` must *not* observe the settlement there — otherwise this unit would convert `M-2`'s measured **fatal**
unhandled rejection into a **silence**, a harmonisation `D-138` item 4 forbids. **That is the third architect question (§9).**

---

## §7 · The failure arms

1. **A body throws synchronously.** The start loop lets it out; it crosses `terminalArm`, `settleArm`, `runAttempt` and is re-thrown
   unchanged; **the write answers nothing** (`D-73`, measured `M-1`). Bodies already started are **not** waited for and their settlements are
   **not** observed — a sibling that then rejects is an unhandled rejection (`M-2`'s measured fatal shape), which is `D-130` item 5's caller
   hazard. **"Start all" is a property of the non-throwing arm only:** a throw pre-empts the loop and later bodies never start, exactly as
   `registrationDelivery` already declares (`delivery.mjs:578`–`:581`).
2. **A body rejects.** The rejection becomes the datum; **the write resolves** with the record (`D-138` items 2, 4); nothing is rendered from
   the reason.
3. **A body's own write refuses.** The refusal is the body's own — a throw if the body is sync (arm 1), the settled reason if `async`
   (arm 2). `D-71`: *"a listener's refusal does not fail the write that fired it"*. Nothing is retried or rolled back (`D-138` item 5:
   *"expect the client to recover as needed"*).
4. **The settle never happens.** **The package waits forever, and that is the caller's hazard by `D-130` item 5.** Said plainly:
   `write`/`delete` answer a pending promise, no timeout is armed (a timer is a scheduler — `contract.md:602`; no flush boundary may be
   invented, `D-131` item 4), no record is reachable by any other route, and the caller's own `await` never resumes. **The answer is
   withheld, and that means withheld.**
5. **The construction's and the registrations' throwables** are unmoved (rank `21`; `state.listenerFailure`), and a *rejection* there is the
   silence named in §6.

---

## §8 · The cells this unit owes

| cell | the drive | the assertion | the clause |
|---|---|---|---|
| **`S-SETTLE-1`** | three listeners at `['a']`,`['b']`,`['c']`, each appending `{id,'start'}` then awaiting one shared gate; `const answer = write(['a'],'mem',1)` | `answer` is a thenable; every start is recorded before the gate opens and before the record is read; the settled set's membership equals the started set's — **read as sets, never as index correspondence** | `D-130` items 3–4; `surface.md:1664`–`:1666` |
| **`S-SETTLE-2`** | one listener awaits a gate opened by a later `setImmediate`; a sibling is synchronous | the sibling's mark stands **before** the answer resolves and the gate-holder's after — a suspension delays **no sibling** and the answer only | `D-130` item 4 |
| **`S-SETTLE-3`** *(control)* | a delivered set whose bodies are all synchronous | `write` answers a **record**, not a thenable; `Object.keys` is the three; the shape is today's | the design's own no-promise arm; keeps every shipped cell green |
| **`S-REJECTED-BODY`** | two `async` listeners, one resolving one rejecting; the drive counts `unhandledRejection` | the write **resolves**; `record.bodyFailures` has **one** entry at the rejecting handle with `status === 'ListenerBodyRejected'`, a message naming the watched address's spelling and **no** rendering of the reason; `read` answers the written value; **unhandled-rejection count `0`** | `D-138` items 1–2, 5; `D-137` item 5 |
| **`S-REJECTED-BODY-PLURAL`** | three bodies reject | three entries, read as a **set** of handles; no entry names another's reason; `Object.keys(failures)` order never asserted | `D-138` unsettled 2; `DD-22` |
| **`S-SYNCTHROW`** *(anti-harmonisation control)* | a synchronous listener throws a sentinel | `write` **throws that same object**, answers no record and no thenable; a sibling started earlier is not waited for | `D-73`; `D-138` item 4; `M-1` |
| **`S-RECEIPT-ACCESSOR`** | one plain write, one rejected-body write, one `delete`, one `rollback` | `Object.keys` is the three; `getOwnPropertyNames` reads **six** with `bodyFailures` present; the descriptor is `enumerable: false, configurable: true` with a `get`; the plain arm reads `{}` and is **present** | `D-136` items 1, 4; `D-138` unsettled 3 |
| **`S-SLOTS-1`…`-5`** | §4's five drives | each reads the observable in that row | `D-130` item 5's last sentence; `N-4` |

**`S-A112` stays `OWED`** — constraints-before-listeners under a suspension is unmeasurable until `RM-5`'s instrument exists. No cell is
written for it.

---

## §9 · What this unit does not touch, and the three questions the architect still owns

**Not touched:** every store byte and every Rust file · every `kernel-*.mjs` byte (including `kernel-attempt.mjs:550`, which is why the settle
leaves by `state.legSettle` and not by the arm's return) · `commitFile` and the save (`U-02`/`U-04`) · `encodeConfig` and the seven `cfg` keys ·
any status name, rank or message (`ListenerBodyRejected` is used, never minted) · the channel's invocation and its accessor (`U-08`) · the two
declaration copies (`index.d.ts` is `U-09`'s; the typecheck copy is re-staged, never hand-edited) · every `triggered`/`pending` shape,
`CommitRecord` and the instance's fifteen members · `modules.json` (`deliver`'s `output` row moves `void → null | Promise<…>`, and **that
re-derivation is `role_l2_integration`'s**) · every contract, guide and `strata/**` byte.

**Pending the architect's word (this document proposes, he confirms).**
1. **`CH-NAME`** — proposed `bodyFailures`.
2. **`CH-EMPTY`** — proposed *present always, `{}`*; the *presence* is forced by `D-138`'s own requirement, the empty **value**'s spelling is
   his to confirm.
3. **Whether the creation's and the four registration instants' answers move in this unit or a later one.** This design leaves them unmoved,
   which means a rejecting body there reaches no surface — and by §6's argument `deliver` must therefore not observe its settlement there.
   The alternative (observe it and answer nothing) buys `M-2`'s process death away at the price of a declared silence. **No pass may take that
   trade for him.**

**And one flag beside them:** this unit introduces the entry's graph's **first `await` token**, inside a function body — lawful under
`contract.md:2379`'s synchronous-graph law (whose subject is load-time module evaluation), and it falsifies `strata/research.md §20.3`'s
`K-11` *reading* (*"no `await` token at all"*) without touching the law. **`O3`'s load-under-`require` sentinel is the instrument that
distinguishes the two; no cell here claims it.**

---

## §10 · The design's riskiest line

**"No `await` inside any `openCommit`/`closeCommit` bracket"** — and with it the claim that the commit count is therefore zero at every
microtask boundary, which is what lets arm (C) carry `EXTERNAL_DEPTH`/`EXTERNAL_COMMIT` without arm (A).

**What would falsify it:** a path on which a bracket is left open across a suspension without an `await` of ours. The candidates are (i)
`constraints.mjs`'s `judgeReversal`, whose `finally` at `:3061`–`:3068` calls `leaveCommitFrame`/`closeCommit` and which this pass read as
*returns-the-compose-promise-after-the-finally* but **did not drive**; and (ii) `kernel-attempt.mjs`'s `COMMIT_SCOPE` bracket
(`state.mjs:789`–`:795`), which this pass **did not open** — if `run()`'s caller awaits inside that bracket, `index.open` is `1` when a
suspended body's continuation runs, the depth fallback answers `false` against `externalAt`, and **the body's write JOINS the triggering
caller's commit** — `P-5`'s MUST NOT — silently.

**The one drive that settles it:** `S-SLOTS-1` as written, plus a variant with a constraint pair registered at the body's own address,
asserting the body's `write` produced a record whose `op` is absent from the triggering commit's `log`. **Until it is driven, this is the
claim in this design most likely to be wrong.**

---

## §11 · AMENDED `2026-11-17` — `D-139` closes §9's three questions, and moves one boundary

**Later than §1–§10 and superseding them where they meet.**

| `#` | what `D-139` decided | what it changes here |
|---|---|---|
| **1** | **`bodyFailures` and *present always, `{}`* are ACCEPTED** | **§5's two proposals become declared.** `Object.getOwnPropertyNames` `5 → 6`; `Object.keys` unmoved; the getter, the frozen empty map and the symbol-keyed datum stand as designed. **§9's questions 1 and 2 are closed.** |
| **2** | **where no receipt exists and a channel stands, the package FORGES one and passes it to the channel** | **§6's *"and in it only as a one-line consequence"* is SUPERSEDED for those instants.** The creation's and the four registration instants' `deliver` calls **no longer drop the settlement when a channel stands**: `settlement` is passed, the delivered set's data is composed, a forged receipt is built, and the channel receives it. **The caller's answer there is UNMOVED** — an instance at the creation, an identity or `undefined` at a registration (`D-125` item 1). |
| **3** | **so §9's question 3 is answered, and by neither arm it priced** | **The design's dilemma — observe-and-answer-nothing (a declared silence) versus observe-nothing (the rejection stays fatal as `M-2` measured) — is dissolved for the channel-bearing case.** **A body that rejects at a no-receipt instant now has a SEAT (`bodyFailures` on the forged receipt) whenever a channel stands.** **The dilemma SURVIVES for the no-channel case, and the design's status quo governs it: nothing is observed, and the rejection is the caller's hazard (`D-130` item 5). `D-139` item 4 of its unsettled says no pass may read it as changed.** |
| **4** | **`CH-2` is answered in substance — five sites, three through the forged receipt** | **§6's per-instant treatment and `U-08`'s brief both move.** |
| **5** | **the forged receipt's SHAPE is open** | **Two things a design must price and may not assume:** what the forgery puts in `op` and `watched` (a value, `null`, an empty array, an omitted member — and `triggered` is determined, since the instant's delivered set is known), **and whether `discarded`/`log` — a write's and a commit's own facts — are absent, empty or present-with-an-empty-value on it.** **`bodyFailures` must be readable on the forged receipt: that is the reason it exists.** |

**Cell consequence, stated so it is not discovered at the gate.** §8's `S-REJECTED-BODY` gains a **second arm** — a rejecting body at a
registration instant, with a channel standing: the act's own answer is unmoved, the channel received a forged receipt, and **the forged
receipt's `bodyFailures` carries the entry**. **And `S-SYNCTHROW`'s anti-harmonisation control is untouched by it**: a *thrown* body at those
instants still refuses the act at rank `21` (`bindings/js/src/entry/delivery.mjs:576`–`:582`; `bindings/js/index.mjs:333`–`:337`), because a throw is not a settlement and it is converted
before any forged receipt is built.

---

## §12 · AMENDED `2026-11-17` — `D-149` removes the forged path, and `D-150` names the datum

**Later than §1–§11 and superseding them where they meet.**

| `#` | what changed | what it does to this design |
|---|---|---|
| **1** | **nothing is forged — the package invokes only listeners** | **§11's forged-receipt treatment is SUPERSEDED.** `deliver`'s `settlement` position is passed **only from arms that answer a receipt**: the terminal arm's residue (`:987`), a `delete`'s own arm (`index.mjs:887`–`:912`), and a reversal's judgement if it keeps one. **The creation's and the four registration instants' calls pass NOTHING and withhold nothing** — their answers are an instance and an identity, and the caller is the one who acted. |
| **2** | **the receipt carries the listeners' settled return values as `returnedValues`** (`D-149` item 2, `D-150`) | **§5's accessor family grows to four**, and **the settle is where the datum is completed**: `settledAnswer` resumes only after every started body has settled, so **the map it installs is total for the delivered set** — one entry per handle that returned a value, `undefined`-returners excluded, no constraint ever among them. **`getOwnPropertyNames` `6 → 7`; `Object.keys` unmoved.** |
| **3** | **`returnedValues` is `U-08`'s per the plan's `§13`, and this unit is where the values are produced** | **This design OWES the map and not the member**: it must leave the settled outcomes readable at the instant the answer is built (the `invoked` list already holds each `{handle, address, returned}`, and `bodyFailures` already reads the rejections from the same list). **Where the accessor is defined is that unit's byte.** |
| **4** | **rank `24` `ChannelThrew` is withdrawn** | **§7's arms are unchanged and narrower**: a body throws (unanswered, `D-73`) · a body rejects (`bodyFailures`, resolved answer, `D-138`) · a body's own write refuses (its own arm) · the settle never happens (`D-130` item 5's caller hazard). **No fifth arm exists.** |

**The cells, after this.** §8's twelve stand, with `S-RECEIPT-ACCESSOR` reading six names rather than seven (`returnedValues` is not this unit's member)
and `S-SETTLE-1`'s observable gaining the map's totality: **the value map's key set equals the set of started handles that returned a value.**

---

## §13 · AMENDED `2026-11-17` — two of this design's own citations are corrected by the contract pass

**Later than §1–§12. Both findings are `path:line` and neither is priced.**

1. **`§2` ROW 7 MIS-CITES `judgeReversal` AND UNDER-COUNTS ITS ANSWER SET.** The function's **head is `constraints.mjs:2618`**, not `:2975` —
   `:2975`–`:3038` is its **tail** (the save at `:2989`, the per-leg loop `:3009`–`:3038`). **And its declared answer set is THREE-ARMED —
   `undefined \| judgementLog \| Promise<judgementLog>`**, with its two `undefined` arms at `:2622` and `:2657`; **this design printed two.** **The
   contract carries the three-armed set and this pointer is the correction.**
2. **AND THAT ROW'S `→ judgementLog \| Promise<judgementLog>` CANNOT BE LANDED AS WRITTEN**: `index.mjs:977` and `:1005` read `judgedLog` as the array
   and hand it to `defineResolutionLog`, so a promise in that position would need those two frames moved. **The contract therefore leaves
   `judgeReversal` UNMOVED** — its per-leg `deliver` keeps three positions and passes no `settlement` — **which is the boundary `D-149` item 1 of its
   unsettled left open, taken as *no settle at a reversal's legs*.** **A reversal's judgement therefore answers synchronously on every arm, and
   `PIN-11`'s second half is what keeps that true.**
