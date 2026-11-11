# A repair's write's listeners — **DECLARED**: the behaviour, the mechanism **(a)** with **(b)** priced, the failing arm, the ordering, the cells, the write set, the release class

**§0 · WHAT THIS FILE IS, WHAT MAY BE WRITTEN, AND WHAT WAS READ AT ITS BYTES.**

**STATUS: `DECLARATION` — the L1 architect's declaration for the behaviour fix `strata/decisions.md` · `D-104` orders into the
post-`1.8.0` patch. Dated 2026-11-01. Branch `main`, HEAD `90cd8a7`, with the uncommitted `strata/decisions.md` `D-104` and
`strata/research.md` §12 read as the warrant.** **CLASS: `DECLARATION, NO CODE, NO TEST, NO DOC, NO `strata/` BYTE`.** **This pass
writes ONE path — `docs/L1/repair-listener-delivery.md`. Every other path named below was READ and is unchanged by this pass.**

**⟶ AMENDED `2026-11-06`, BY THE GATE-4 BOOKKEEPING PASS, AND THE AMENDMENT IS `D-125` ITEM `1`'s: THIS FILE'S SILENCE AT THE
REGISTRATION INSTANT IS REVERSED AND EVERY SENTENCE THAT STATED IT IS CORRECTED AT ITS OWN SENTENCE, ANNOTATE-BESIDE, WITH THE
SUPERSEDED TEXT LEFT READABLE — §3.2 item `4` (`:359`–`:362`), §7 (`:567`–`:569`), §9's (b)-pricing line (`:731`) and §9's cell list
(`:748`, `RLD-6`), plus the two statements of the same silence inside them (`:506`, `:756`–`:757`) — those six pairs are GATE 4's
BYTES, read before this amendment's own insertions shifted the file; every reference below is re-measured at its own date.** **THE
RULE THEY NOW READ: THE
REGISTRATION INSTANT DELIVERS — at four instants, in `D-117`'s order instant for instant, after the save and before the answer, with
ONE ORDER AND TWO SETS (`storeCreate` and a boot deliver `adopted ∩ resolving`; `addConstraint` and a re-arm deliver the repair's
write's `triggered` set) — and no delivery on a refusing arm.** **No other sentence of this file moves, no cell is deleted, and
nothing here re-prices the mechanism (a)/(b) choice: (b) is still refused, on its scope.**

**THE WARRANT, AND ITS LIMITS, QUOTED FIRST SO NO CLAUSE BELOW IS READ AS MORE THAN IT IS.** `D-104`, verbatim: ***"This is a
behavior defect, wrap into the fix patch"*** — with item 2 fixing the intended behaviour (*"The repair's write's listeners ARE
delivered — in the COMMIT's delivery, after the pass, with the other listeners: the architect's own flow, 'any new
non-constraint listeners are bookmarked to be run after commit'"*), item 3 handing **the mechanism to L1, priced, two routes and
no third**, and item 4 fixing the invariant **"no status, no member, no arity, no type may move"**. **So this file decides the
mechanism (item 3's one question), the seat, the de-duplication, the failing arm's reading, the cells, the write set and the
release class — and it decides nothing `D-104` settled.**

**THE ONE INSTRUMENT LIMIT, STATED AT THE HEAD BECAUSE IT GOVERNS §7.** **This pass has no shell.** Every figure below is a
reading of a file's own bytes on this date; **the red set of §7 is therefore a READING of each fixture's own writes and
assertions and NOT a run.** A pass that lands the fix must re-measure it, and §7 says which cell it expects where.

**§0.1 · THE EXAMINATION THIS DECLARATION PASSED THROUGH — THE TEN FALSE CLAIMS THE EXAMINER FOUND AND THE THREE THINGS ITS READING
ADDED.** The declaration was examined by
`role_l1_examiner` at the bytes on this date; **the verdict was `PASS WITH CORRECTIONS`** and every correction was re-verified by
this pass before it was taken. **They are named so the file's own history is legible rather than silently repaired:** **(1)** §3.3's
predicate was justified by the wrong fixture — `FTS-11`'s pair id is **still in `pending`** at the merge seat, because a run's
check-off (`kernel-attempt.mjs:929`) runs **after** its own repair arm, so the de-duplication already excludes it there; the
predicate's true ground is a **multi-repair** commit (`P-SM-5`), where an **earlier** run's check-off has already taken the id.
**(2)** §7.3's *"every repair fixture lands at an address whose reach is a subset"* is **false of two fixtures**
(`tests/e2e/blind-constraints-v2.mjs:1012`–`:1015`, `tests/e2e/discard-witness.mjs:593`–`:602`, both writing at a SIBLING address)
— the red set is empty there for a different reason, now printed. **(3)** §7.3's coverage claim was wider than its table, and the
omitted fixtures were read by the examiner with the conclusion holding. **(4)** *"`kernel-attempt.mjs`'s import footprint is EMPTY"*
is the contract's phrase **about entry-side imports**; the file imports two kernel parts (`:2`–`:3`) and the accurate sentence is
*"it imports no entry and is imported by none"* (`:5`–`:12`). **(5)** §1 link 2 said *"two writers"* of `pending`; there are **four**
`.pending =` sites. **(6)** §3.2 said `state.mjs` **installs** `TERMINAL_ARM`; state.mjs **declares** it (`:86`) and `index.mjs`
installs it (`:1455`). **(7)** §5 attributed *"the SECOND, UNLAWFUL REMOVAL"* to `A112`; it is the code comment's phrase
(`kernel-terminal.mjs:78`), grounded in `A113` (D1). **(8) and (9)** — **the two substantive ones** — `Q-1`'s *"a constraint body's
write's returned set is read by nothing"* is **FALSE** (a constraint body's three-position write reaches `constraintWrite` →
`constraints.mjs:801`'s `kernel.commit` → a **nested attempt** whose own arm delivers it), **and the same mechanism is a hazard the
fix must guard** (§3.4a); §3.6's cost 1 therefore says **double delivery**, not first. **(10)** §5's **"NO"** on
`D-104` item 2's `discarded` sentence **reversed a printed clause of the ruling in place**; it is now `Q-7`, priced and sent up, and
§5 states the reading and the refusal together. **Three things the examination's READING added and this pass took**: the carrier
needs an **invocation guard** (§3.2 — the list is read only where the invocation's own bracket stood); **a nested-attempt guard**
(§3.4a — a nested commit opened inside the repair invocation must not ride its handles into the enclosing member); and **`A112`'s own
row supplies a ground for the merge stronger than §4's**
(`archive/pre-strata-docs-2026-10-24/docs/decisions.md:80`, verbatim: *"because NO listener runs until the constraints pass, EVERY
listener is `pending` on EVERY write"*).

**WHAT WAS READ, AT ITS OWN BYTES, THIS DATE** (each citation in this file points at one of these and no other):

| path | what was read |
|---|---|
| `strata/decisions.md` | `D-46` (`:3049`–`:3084`), `D-49` (`:3141`–`:3172`), `D-55` (`:3399`–`:3416`), `D-56` (`:3420`–`:3455`), `D-69` (`:3848`), `D-101` (`:5194`–`:5230`), `D-103` (`:5266`–`:5296`), **`D-104` (`:5300`–`:5336`)** |
| `strata/research.md` | **`§12` (`:386`–`:419`)** — the four-link chain this declaration starts from |
| `bindings/js/src/entry/delivery.mjs` (892 lines) | `commitPositionRefusal` `:27`–`:54` (the predicate `:39`); `deliver` `:105`–`:209` (the dedupe `:154`–`:166`, the kind skip `:173`–`:182`, the invocation `:184`–`:208`); `listenerStandingAt` `:633`–`:644`; **`terminalArm` `:729`–`:831`** — the class test `:733`, `const answer = state.leg` `:739`, the `file`-tier save's gate `:740`–`:747`, the save `:780`, **the delivered set `:792`**, the triggering address `:816`–`:818`, **the delivery gate `:825`–`:829` (the call at `:828`)** |
| `bindings/js/src/entry/kernel-commit.mjs` (356 lines) | `commit`'s attempt `:68`–`:94`, the record `:111`–`:126`, **`record.pending = written.triggered.slice()` `:169`**; `commitRemoval`'s attempt `:280`–`:309`, its record `:314`–`:320`, `record.pending = removal.triggered.slice()` `:346` |
| `bindings/js/src/entry/kernel-attempt.mjs` (1,058 lines) | `runToCompletion` `:492`–`:508`; `evaluate` `:522`–`:954` — the pass's list `:573`–`:574`, `commitName` `:585`, the loop `:600`, the pair-application skip `:631`, the context `:635`–`:641`, `constraintInCommit` `:664`, **the repair arm `:757`–`:930`** (the repeat arms `:740`–`:774`, `append(attempt,'repair-run',…)` `:781`, `repairContext` `:784`–`:810`, `pending` at `:809`, `enterCommitFrame` `:825`, `repairInCommit` `:826`, the catch `:827`–`:885`, the two-arm read `:899`–`:914`, the credit `:918`–`:921`, **`:929` `releasePending`**), the pass arm `:936`–`:953`; `settleArm` `:460`–`:469`; `passInCommitScope` `:249`–`:423` (the failing arm's `settleArm` `:292`, `close(…,'passed')` `:307`, **the passing mark `:346`–`:348`**, the arm's `settleArm` `:370`, the save-failure catch `:371`–`:404`); `releasePending` `:985`–`:999`; `publishCheckedOff` `:1015`–`:1028` |
| `bindings/js/src/entry/kernel-terminal.mjs` (468 lines) | `terminal` `:47`–`:114` — **the discard `:89`–`:97`, the returned-set read `:95`, the filter `:96`**; `composeRollback` `:209`–`:249` |
| `bindings/js/src/entry/kernel-foundations.mjs` (1,469 lines) | `CHECKED_OFF` `:110`; `landedOp` `:1105`–`:1131`; `pairsTriggered` `:1272`–`:1288`; `triggeredNames` `:1297`–`:1305` |
| `bindings/js/src/entry/state.mjs` (1,138 lines) | **`TERMINAL_ARM` declared `:86`** (installed by `index.mjs:1455`, with `FORGET_PAIR` at `:1462`); `EXTERNAL_CALL` `:315`, `EXTERNAL_COMMIT` `:319`, `externalCall` `:338`–`:339`; `openCommit` `:536`–`:574` (the name read `:539`, the join `:540`–`:542`); `installAttemptSeam` `:611`, **the channel installs `:659`–`:731`**, the channels' own declared mutability `:374`–`:377`; `bumpWindowMark` `:484` |
| `bindings/js/index.mjs` (1,695 lines) | `state` `:240`–`:250` (`leg: null`, `legDelivery: 'arm'`); **`write` `:312`–`:480`** — `openCommit` `:337`, the class test `:368`–`:371`, the `n <= 3` route `:396`–`:398`, the store verb `:413`, `watched` `:432`–`:443`, **the record `:444`–`:448`**, **`state.leg = record` `:452`**, **the withheld-delivery clause `:453`–`:476`**; `delete` `:543`–`:638` — `legDelivery = 'member'` `:576`, `state.leg` `:588`, the owed set `:600`–`:602`, `deliver` `:605`, the witness `:623`–`:629`, the restore `:632`–`:633` |
| `bindings/js/src/entry/constraints.mjs` (3,314 lines) | `constraintWrite` `:788`–`:878` — `const answer = state.leg` `:805`, the landed op `:846`–`:849`, the record `:850`–`:854` |
| `bindings/js/index.d.ts` (1,530 lines) | `CommitRecord` `:796`–`:815`, **`pending` `:814` and its docblock `:803`–`:813`**; `RepairContext` `:1418`–`:1435`; `CommitCarrier` `:1509`–`:1530`; `write` `:871`–`:884` |
| `docs/guides/package-use.md` (2,305 lines) | **§6.4 `:595`–`:664`** (the `pending` clauses `:619`–`:660`); **§7.6 `:1034`–`:1135`** (the two-arm repair set `:1059`, the record and the commit `:1061`, `D-103`'s clause `:1063`–`:1067`) |
| `docs/L1/modules.json` | `module_count` `:612`, `endpoint_count` `:618` — **`19` modules / `61` endpoints**; the row-by-row reconciliation at `:622` |
| `archive/pre-strata-docs-2026-10-24/docs/decisions.md` | **`A112` `:80`** — the carrier, the sift's withdrawal, **and the sentence this declaration's §4 leans on: *"because NO listener runs until the constraints pass, EVERY listener is `pending` on EVERY write"***; `A113` `:79` (the discard's extent, the blanket clear's withdrawal) |
| `tests/` (the cells §7 names) | `tests/integration/js-constraints/constraint-kernel-deltamodel.test.mjs` `:403`–`:610`; `.../constraint-kernel-layers.test.mjs` `:280`–`:372`, `:349`–`:351`; `.../constraint-kernel-negatives.test.mjs` `:139`–`:239`, `:211`–`:234`; `.../constraint-kernel-deliverymodel.test.mjs` (`pending` reads `:446`, `:513`–`:563`, `:725`); `tests/e2e/discard-witness.mjs` `DW-14.1`–`DW-14.5` (`:2586`–`:2798`); `tests/e2e/registration-write-route.test.mjs` `G3-22` (`:381`–`:519`); `tests/e2e/file-tier-save.test.mjs` `:2367`–`:2501`; `tests/e2e/file-tier-save/scenarios.mjs` `FTS-11` (`:1097`–`:1173`); `tests/e2e/file-tier-save-properties.test.mjs` `P-SM-5` (`:633`–`:690`); `tests/e2e/ordering.test.mjs` `:165`–`:392` |

---

## §1 · THE DEFECT AT THE BYTES — five links, each read, none taken on report

**THE DEFECT IS NOT THAT A LISTENER IS INVOKED TWICE OR WRONGLY. IT IS THAT ONE SET IS READ BY NOTHING**, and the whole of the
declaration below follows from *which* object carries that set.

**LINK 1 — THE DELIVERED SET IS ONE MEMBER OF ONE OBJECT, AND THAT OBJECT IS THE COMMIT'S.** `delivery.mjs:792` reads
`const triggered = Array.isArray(record.pending) ? record.pending.slice() : [];` and `:828` hands it to `deliver` **once**, gated
at `:825` on `state.legDelivery !== 'member'`. **So the arm's whole input is `record.pending`** — the residue the check-off left,
plus (under the older spelling) nothing beside it (`:802`–`:813` names the deleted union and its reason).

**LINK 2 — THAT MEMBER IS SEEDED ONCE, FROM THE COMMIT'S OWN WRITE.** `kernel-commit.mjs:169`:
`record.pending = written.triggered.slice();`. **And the seed is never widened again**: **the member has exactly FOUR writers in the
whole tree** — `kernel-commit.mjs:169` and `:346` (the write's and the delete's seeds), `kernel-terminal.mjs:96`'s discard and
`kernel-attempt.mjs:997`'s check-off — **so after the seed, the only two touches are the removals**: the check-off takes the handle
of a pair **the pass evaluated** (`kernel.handles`' value for a run key) and nothing else, and the discard takes the failed write's
own returned set (§5).

**LINK 3 — A REPAIR'S WRITE IS A DIFFERENT RECORD, AND ITS SET IS CARRIED THERE.** `index.mjs:444`–`:448` builds
`{ op: decodeJournalOp(answer.op), watched, triggered: crossTriggered(state, answer.triggered) }` and `:452` stands it in
`state.leg`. **That record is the repair's write's** — it is built at the entry for the write the repair's body made — and **the
entry's own frame is `the leg` whose *"delivery IS WITHHELD"* (`:464`–`:465`) and whose *"silence is total"* (`:474`)** — the two
halves of that sentence standing eight lines apart. **So the repair's triggered set is carried on a record that no delivery site
reads.**

**LINK 4 — THE REPAIR ARM CREDITS AN `op` AND READS NOTHING ELSE.** `kernel-attempt.mjs:826` invokes the body through
`repairInCommit`; the arm then reads **only** `result.ok` and `result.op` (`:899`–`:901`), credits the op through
`landedOp` (`kernel-foundations.mjs:1105`–`:1131`, which reads `op`, `opId`, and the ordinal ground) and appends it
(`:918`–`:921`). **The returned `triggered` set is read at no line of that arm, and the repair's record is not otherwise reachable
from the kernel** — see §3.1's measured obstacle, which is what decides the mechanism.

**LINK 5 — AND THE RE-RUN ASKS THE COMMIT'S SET, NOT THE REPAIR'S.** `evaluate` reads
`attempt.record.triggered` for its pair list (`:573`–`:574` → `pairsTriggered`, `kernel-foundations.mjs:1272`–`:1288`), so
**the repair's edit's triggered CONSTRAINTS are asked by nothing either** — a sibling of `D-104`'s defect on the constraint side,
which `D-104` does **not** order (`Q-5` in §10).

**SO THE DELIVERED SET IS `pending`, `pending` IS THE COMMIT'S SET, AND THE REPAIR'S SET IS ON A RECORD ONLY THE ENTRY HOLDS.**
`research.md §12`'s four-link chain is confirmed at every link.

**AND THE ONE ARM THE DEFECT DOES NOT REACH, MEASURED, BECAUSE IT DECIDES WHERE THE FIX MAY SIT — AND BECAUSE IT IS ALSO A HAZARD
THE FIX MUST GUARD.** **A repair that names nothing at `write`'s fourth position** — `D-103`'s UNSUPPORTED route — makes a
THREE-position call, which reaches `constraintWrite` (`index.mjs:396`–`:398`) → `constraints.mjs:801`'s `kernel.commit` → **a second
`K-2` and its own attempt**: that nested attempt's terminal arm delivers **its own** `pending` (`kernel-commit.mjs:169`, seeded from
that very write's return), so **those listeners are delivered today by the nested attempt and not by the commit.** **This contradicts
no line of `D-104`** (item 1 is precisely that no site reads *the repair's own record*), **it is not promised** (`D-103` item 1's
third non-promise is *"the `pending` delivery"*) — **and the same nested attempt is why §3.4a exists**: the nested write's leg is
appended while the repair's invocation bracket still stands, so the fix must drop that list rather than merge it, or the handles are
delivered **twice**. `Q-6` puts the route up.

**AND THE CONSTRAINT BODY IS ON THE NESTED-ATTEMPT ARM TOO, WHICH IS WHY `Q-1` IS NOT A SILENCE.** A constraint body's `write`
(`D-53`; `guide §7.6:1115`–`:1126`) is also a three-position call from caller code, so it reaches the same nested `K-2` and **its
listeners are delivered by that nested attempt's arm today.** **So the constraint-body half is not unread; it is delivered on a
nested attempt's own delivery** — **and the fix must not merge it as well** (§3.4a), or the same handle arrives twice. **`Q-1` is
therefore a question about where that delivery SITS and not about a silence, and it is re-spelled at §10.**

---

## §2 · THE BEHAVIOUR DECLARED — `D-104` item 2, spelled to the last observable

**B-1 · THE SET IS DELIVERED IN THE COMMIT'S ONE DELIVERY, AFTER THE PASS.** A listener the repair's write fired is invoked **in
the same `deliver` call** that delivers the commit's residue — `delivery.mjs:828` — **because §3's mechanism puts it in the array
that call reads**, **and only for the repair's SUPPORTED route** (`D-46`, `D-103`): **a repair that names no commit lands in a nested
attempt, whose own arm delivers its listeners today, and §3.4a guarantees the enclosing commit adds no second delivery of them.**
**One call means one window**, and every rule that is a property of the window holds for both sets alike: the recipient snapshot is
taken when the window opens (`:107`–`:121`), an unregistered handle fires nothing silently (`:188`), a registration made during the
window takes effect at the next trigger, and **a body that throws propagates and is not caught, retried or reported** (`§2.7` item 4,
read in the loop's own clause `:59`–`:63`).

**B-2 · ONE INVOCATION PER DISTINCT HANDLE, AND THE DE-DUPLICATION IS `deliver`'s OWN.** `surface.md §2.4` rule 3 stands
(`:123`–`:129`, `:154`–`:166`): the loop invokes **one function per DISTINCT `entry.handle`** of the array it is handed, at the
element's **first occurrence**. **So a listener fired by BOTH the original write and the repair's edit is invoked ONCE.** §3.4
states the second de-duplication the *member* needs (a member that carried one handle twice would make a caller's own loop over
`pending` run it twice) and why the two are not the same rule.

**B-3 · THE ADDRESS THE INVOCATION CARRIES WHEN BOTH ACTS FIRED IT — DECLARED, AND IT IS ONE ADDRESS FOR THE WHOLE DELIVERY.**
`deliver` takes **one** `triggeringAddress` (`:105`–`:106`) and `terminalArm` reads it off **the leg's own op**
(`:816`–`:818`, `answer = state.leg` at `:739`). **Where a repair landed, the leg is the repair's write's record** (§1 link 3,
`index.mjs:452` — nothing restores the slot; only the `delete` member saves and restores its own, `:572`–`:573`, `:632`–`:633`),
**so the whole delivered set is handed the REPAIR's op address** — the original write's residue listeners included. **The fix moves
no byte of that read**, and the consequence is declared rather than discovered:

- **a handle fired by the repair's edit alone** is handed the right address — the act that fired it;
- **a handle fired by BOTH** is handed that same one address, **and which of the two acts fired it is NOT asserted by any clause or
  any cell** (`DD-22`, `DD-37`: the trigger set has no order and no per-element provenance; `AB-3`: *"a body cannot tell which
  binding matched, and that is declared"*);
- **a handle fired by the original write alone** is handed the repair's address — **this is PRE-EXISTING** (the leg is one slot)
  **and is `Q-3`**, not this fix's.

**AND THE PER-ELEMENT READING IS REFUSED, BY NAME.** An element's `address` in `triggered` is **the address the listener was BOUND
at** (`guide §6.4:597`–`:599`; `triggered`'s own clause), **never the act's** — so delivering per element would hand each body the
*watch* address, which is the one datum the surface's `PAR-JS-12` forbids as the invocation's argument. **A second `deliver` call
per element is refused on the same ground plus `B-1`'s: two calls are two windows, and two windows are two recipient snapshots.**

**B-4 · A PAIR IS NEVER IN THE SET — AND ITS ROW IS NOT MERGED EITHER.** `D-69`, verbatim: *"an element whose handle is a
constraint's `id` is asked; a listener's is delivered"* — implemented at `delivery.mjs:173`–`:182` by the registry entry's `kind`.
**So a repair's edit that triggers a CONSTRAINT never has that pair's body invoked as a listener**, and the fix preserves the
second half of that: §3.4's predicate **does not merge a carried pair's handle into `pending` at all**, so the member does not
carry an id the pass will not evaluate.

**B-5 · THE DELETE-SHAPED COMMIT IS THE SAME COMMIT.** `D-55` item 3 gave the delete an attempt and `commitRemoval` mints the same
`CommitRecord` (`kernel-commit.mjs:314`–`:346`); its delivery is the member's, and it already reads the record's residue
(`index.mjs:600`–`:602`, `deliver` at `:605`). **The merge of §3 sits on `evaluate`'s repair arm, which both attempt kinds share, so
a repair during a delete's pass is delivered by the delete's own delivery with no byte of that member moving.** **This is the
fix's scope consequence and `Q-2` asks the architect to confirm or narrow it** — narrowing needs a kind test at the merge, priced
there.

**B-6 · WHAT DOES NOT MOVE.** **No status** (`20`), **no `KC` token** (`9`), **no product member** (`14`), **no kernel item**
(`6`), **no `CommitRecord` member** (`4`), **no declared type, no arity, and no refusal message.** **`triggered` is unmoved** — it
stays the store's own returned set for the commit's write, VERBATIM (`A112`'s *"`triggered` then stands as the store's own
returned set"*; `kernel-commit.mjs:167`–`:168`), and **the repair's set is not added to it**: `triggered` is the store's answer and
a package that wrote a second act's handles into it would be forging one. **Modules `19` / endpoints `61` stand; the harness cap is
unmoved.**

---

## §3 · THE MECHANISM — **(a) MERGE AT THE REPAIR ARM**, AND **(b)** PRICED AND REFUSED

### 3.1 THE MEASURED OBSTACLE THAT DECIDES THE CHOICE, PRINTED BEFORE EITHER ROUTE IS ARGUED

**THE KERNEL CANNOT SEE THE REPAIR'S WRITE'S RETURNED SET TODAY, AND THE REPAIR'S RETURN DOES NOT CARRY IT.** Three facts, each at
its bytes:

1. **A repair returns a two-arm set of `ok` and `op`** (`guide §7.6:1059`; `kernel-attempt.mjs:899`–`:901`) — **and the guide's own
   worked example returns `{ ok: true, op: landed.op }`** (`:1088`), i.e. **the store's `op` and not the write record.** So
   `result.triggered` **does not exist** on the declared route, and requiring it would move a declared shape (`D-104` item 4).
2. **The record that does carry it is the entry's** (`index.mjs:444`–`:448`) and reaches only `state.leg` (`:452`), which the
   kernel cannot read: **`kernel-attempt.mjs` *"imports no entry and is imported by none"*** — the contract's import-footprint rule
   (`kernel-surface.md §1` item 1) read at that file's own head (`:5`–`:12`; the file imports its two kernel siblings, `:2`–`:3`,
   **and nothing of the entry**), so the kernel talks to the entry **only** over `Symbol.for` channels the entry installs.
3. **THE DISTINCTION THE RULING REQUIRES EXISTS ONLY ON THE KERNEL'S SIDE.** `D-104` orders **a repair's write's** listeners. The
   entry cannot tell a repair's write from a **constraint body's** write: **both are caller code the kernel invoked with the
   commit named**, through two wrappers whose bodies are identical (`repairInCommit` `:110`–`:114` and `constraintInCommit`
   `:132`–`:136`, both `channel(run, commit)`), and both land through the same `n >= 4` arm of the write member.

**SO: (a) NEEDS A CARRIER AND GETS THE EXACT SCOPE; (b) NEEDS NO CARRIER AND CANNOT HAVE THE EXACT SCOPE.** That trade is what
this section decides. **A THIRD ROUTE IS NOT OPEN AND IS NOT INVENTED** (`D-104` item 3).

### 3.2 THE CARRIER (a) TAKES — ONE `Symbol.for` CHANNEL, AND NOTHING ELSE CROSSES

**THE DEVICE IS THE TREE'S OWN SEVENTH-BESIDE**: `state.mjs` already **declares** `TERMINAL_ARM` (`:86`) and `COMMIT_SCOPE`,
`RESTART_DRAIN`, `EXTERNAL_CALL`, `BUMP_MARK` (`:659`–`:731`), and `installAttemptSeam` **installs** the four it owns — **while
`TERMINAL_ARM` and `FORGET_PAIR` are installed on the instance by `index.mjs` itself** (`:1455`, `:1462`) — symbol-keyed,
non-enumerable, installed once, invisible to `Object.keys` and to `Object.getOwnPropertyNames` (`A117` (D6)), **read by the `e2e`
battery's own `.includes` assertions and never by an equality over the symbol set** (`tests/e2e/external-commit.test.mjs:357`; no
cell in this tree asserts a symbol count, and the fourteen-name census reads `getOwnPropertyNames` only,
`tests/e2e/blind-package-surface.test.mjs:298`, `external-commit.test.mjs:353`).

**`REPAIR_LEG = Symbol.for('provident-storeroom.repair-leg')`, and its subject is ONE FACT: the legs of the invocation that closed
last.**

- **The invocation's bracket is `EXTERNAL_CALL`'s** (`state.mjs:683`–`:700`): it already holds the commit the invocation names
  (`EXTERNAL_COMMIT` `:686`–`:687`), so **the same bracket opens a leg list beside that name** and closes it in the same `finally`.
- **`index.mjs`'s `write` member, the `n >= 4` arm, appends its record's `triggered` elements to that list** — one append beside
  `state.leg = record` (`:452`). **The leg slot itself is untouched**: its two readers (`delivery.mjs:739`'s `answer`,
  `:740`–`:747`'s save gate, `:816`–`:818`'s triggering address, `constraints.mjs:805`'s `answer`) take no byte.
- **`REPAIR_LEG` answers that list and clears it** — read once, by the kernel's repair arm only, **synchronously after its own
  invocation returned and before any other code runs**, so a "last invocation" slot cannot be confused with another's.
- **AND THE READ IS GUARDED ON THE BRACKET'S OWN PRESENCE, WHICH IS THE ONE HOLE A CLEAR ALONE CANNOT CLOSE.** The channels are
  writable and configurable (`state.mjs:374`–`:377`), so a caller can remove `EXTERNAL_CALL` while `REPAIR_LEG` stands: then
  `repairInCommit` (`kernel-attempt.mjs:110`–`:114`) takes its `run()` fallback with **no bracket**, so nothing is appended — *and
  a bare read would answer a PREVIOUS invocation's legs.* **So the arm reads the channel only where `repairInCommit` found
  `store[EXTERNAL_CALL]` to be a function** — the frame that reads the channel is the frame that knows — **and every other arm
  answers `[]`.** **Its absent arms are therefore total**: no bracket at a write ⇒ the append goes nowhere; no bracket at the
  invocation ⇒ the read is not taken; no invocation closed ⇒ `[]`; a store this package did not build carries neither channel ⇒
  `[]` (the family's own conservative arm, the one `bumpMark` takes at `kernel-attempt.mjs:437`–`:445`).
- **A REPAIR THAT MAKES TWO WRITES LOSES NOTHING**: both append to the invocation's list, and the merge reads the list. **(b)'s
  single leg slot would lose the first — the price §3.6 (b) prints. AND §3.4a IS THE GUARD THAT KEEPS "TWO WRITES" FROM MEANING
  "TWO COMMITS".**
- **A CONSTRAINT BODY'S WRITE APPENDS TO ITS OWN INVOCATION'S LIST, AND NO REPAIR ARM READS IT** ⇒ `D-104`'s exact scope is kept —
  **but the constraint body's own write is ALSO the nested attempt `Q-1` describes, so §3.4a's guard is what keeps its handles out
  of the enclosing commit's member.**

### 3.3 THE PREDICATE — WHICH ELEMENTS MERGE

**An element of the invocation's leg list merges iff its `handle` is not one the kernel's own registry names as a carried pair's**
(`kernel.handles`' values — the map keyed by the pair's `id` (`kernel-foundations.mjs:737`, `:123`) whose values are the adopted
handles `kernel-registration.mjs:201`/`:209`; the same equality `pairsTriggered` reads in the other direction,
`kernel-foundations.mjs:1272`–`:1288`). **That is the architect's *"new non-constraint listeners"* spelled as a kernel-side test**,
it is `D-69`'s own rule read at the merge, **and its load-bearing case is a MULTI-REPAIR commit — not the single-repair one, and the
correction is printed because the first draft of this file got the fixture wrong**:

> **THE SEAT'S OWN TIMING IS WHAT MAKES IT NECESSARY.** A run's check-off (`kernel-attempt.mjs:929`) stands **after** that run's
> repair arm, so at the merge seat **the pair just evaluated is still in `pending`** — **and the de-duplication of §3.4 would
> exclude its id on its own.** **So a single-repair fixture does not measure the predicate**: **`tests/e2e/file-tier-save/
> scenarios.mjs`'s `FTS-11`** (`:1112`–`:1137`) would merge nothing with or without it, because the `c1` its repair's set names is
> still standing in the member.
> **THE FIXTURE THAT DOES MEASURE IT IS `tests/e2e/file-tier-save-properties.test.mjs`'s `P-SM-5`** (`:633`–`:690`): one repair
> write **per pair**, in a chain — **so the SECOND repair's write re-triggers a pair whose check-off an EARLIER run already took,
> and that id is no longer in `pending`.** **Without the predicate the merge would put it BACK** — `pending` would carry an id the
> pass evaluated, which is the one thing its reading forbids (`A112`; `DW-14.4`) — **and the caller's own loop over the member would
> run a constraint's registration as if it were a listener's.** With the predicate nothing of the kind merges.

**AND A HANDLE THE ENTRY'S REGISTRY HOLDS NO FUNCTION FOR MERGES AND FIRES NOTHING, SILENTLY** (`delivery.mjs:77`–`:83`) — so the
predicate may be generous on its second gate, which is why it is a predicate over pair ids and not over liveness: **the kernel holds
no listener registry and must not grow one** (`D-69`, `D-98`).

### 3.4 THE SEAT AND THE MEMBER'S DE-DUPLICATION

**SEAT: inside the repair arm, AFTER the credit is confirmed, immediately BEFORE `releasePending` (`kernel-attempt.mjs:929`) — and
therefore before the re-run.** Stated as three consequences, each checked:

1. **AFTER THE CREDIT** (`:899`–`:921`): a repair whose return carries no op the attempt can be shown to have landed takes arm (d)
   (`:902`–`:914`) and **the attempt fails**, so its listeners would be discarded anyway; **merging nothing keeps the member honest
   for the instant between** and leaves nothing for §5's discard to remove.
2. **BEFORE THE RE-RUN** (`runToCompletion:492`–`:508`): the re-run's evaluated set is `attempt.record.triggered`
   (`:573`–`:574`) **and not `pending`**, so the merge **does not change which pairs the pass asks** — `CX-12`'s fixed-set rule and
   `D-56`/`D-66`'s reach are untouched.
3. **BEFORE `releasePending`** (`:929`): the run's evaluated pairs are checked off immediately after the merge, so a carried pair's
   handle leaves the member at its own check-off as it always did; **the merged elements carry no pair handle at all** (§3.3), so
   the check-off can never remove them.

**DE-DUPLICATION OF THE MEMBER — BY `handle`, AGAINST `pending`'S CURRENT HANDLES, AND IT IS A SECOND RULE WITH A SECOND GROUND.**
`deliver`'s rule 3 de-duplicates **the array it is handed** (§2 B-2); **the member needs its own** because `pending` is also *the
caller's own work list* (`A112`: *"THAT LOOP BEING ONE INVOKER AMONG THE JS SURFACE'S ORDERED LAYERS"*; `guide §6.4:633`–`:639`), **and
a member carrying one handle twice would let a caller's loop run that body twice.** So: **an element whose `handle` already stands in
`pending` is not appended.** The append is by `appendOwn` (the contract's own form, `contract.md §2.1` item `(1c)(v)`), and the
member keeps its element type `{handle, address}` — `TF-1`'s pair shape and `contract.md §2.5` item 2's totality stand.

### 3.4a THE NESTED-ATTEMPT GUARD — the leg list is per-invocation, and a nested commit inside it must not ride it in

**THE HAZARD, MEASURED AT THE BYTES RATHER THAN FOUND LATER.** A repair body's **unnamed** write (`D-103`'s unsupported route) —
and a **constraint body's** write, which is the same shape — takes the three-position route (`index.mjs:396`–`:398`) →
`constraintWrite` → `constraints.mjs:801`'s `kernel.commit` → **`store.write(address, tier, value, record)` at FOUR positions**
(`kernel-commit.mjs:153`) → **the write member's leg branch, inside the invocation's still-open bracket.** **So that nested commit's
handles append to the SAME invocation list the outer repair arm is about to read** — **and the nested attempt's own terminal arm
delivers them as well.** **Merging them would deliver those handles TWICE**: once by the nested attempt (which does it today, §1's
last paragraph) and once by the enclosing commit's delivery — **a double invocation of a caller's body, which is the one thing
`surface.md §2.4` rule 3 forbids and the very class this fix exists to remove.**

**WHAT THE FIX DOES ABOUT IT — ONE GUARD, AT THE ARM, AND IT IS A COUNT THE KERNEL ALREADY KEEPS.** `kernel-attempt.mjs` reads
**`kernel.attempts`** (`kernel-commit.mjs:45`'s counter, one increment per `K-2` and per `commitRemoval`) **before** the body is
invoked and **after** it returns; **where the count has moved, a nested attempt was opened inside this invocation, so the list is
DROPPED and the nested attempt's own delivery stands as the whole of that act's delivery.** **The rule, stated once: the merge reads
the legs of an invocation in which NO ATTEMPT WAS OPENED — the invocation whose writes joined the commit the repair is part of, and
nothing else.**

**AND THE GUARD IS EXACT, NOT CONSERVATIVE, ON THE SUPPORTED ROUTE.** A repair that names its commit (`D-46`, `D-103`) makes a
**four-position** call that **joins** (`index.mjs:337`, `openCommit`'s join at `state.mjs:540`–`:542`), opens **no** attempt, and
leaves the count unmoved — **so every supported repair's legs merge.** **The guard therefore removes exactly the arm `D-103` declares
unsupported and promises nothing for**, and it makes §1's *"neither promises nor depends on"* true of the mechanism as built rather
than only of its intent. **An invocation that opens no attempt but writes nothing answers `[]` and merges nothing (total, and
silent).**



### 3.5 THE DISCARD'S WIDENING — see §5; AND WHAT THE MERGE DOES *NOT* TOUCH

- **`delivery.mjs` takes NO BYTE.** The arm's read at `:792` already delivers whatever the member holds, and the delete's member
  already reads the record's residue (`index.mjs:600`–`:602`). **The defect was never in the delivery's loop; it was in what the
  member was allowed to hold.**
- **The failing arm needs the discard widened** because the merged elements are not in the failed write's returned set (§5).
- **`attempt.repairTriggered`** — one internal member on the attempt (not on any record, not on the product), minted empty at both
  attempt sites (`kernel-commit.mjs:68`–`:94` and `:280`–`:309`), appended beside the merge, **read by `terminal`'s filter and by
  nothing else**. **`A117` (D6) is untouched**: an attempt is not a record a consumer holds, and no census of an attempt is
  asserted (`tests/integration/js-constraints/constraint-kernel-helpers.mjs:300`–`:301`, `:350` censor the **closed report**, whose
  five members are unmoved).

### 3.6 ROUTE (b), PRICED IN FULL, AND REFUSED ON THE DISTINCTION IT CANNOT MAKE

**WHAT IT IS** (`D-104` item 3's second route): **the terminal arm's delivered set becomes the commit's `pending` PLUS the leg's
`triggered` listeners, de-duplicated by handle** — a change inside `delivery.mjs`'s `terminalArm`, with `deliver`'s rule 3 collapsing
the union for free (`:154`–`:166`), and its kind skip handling the leg's pair ids (`:181`).

**ITS THREE ADVANTAGES, PRINTED SO THE REFUSAL IS A CHOICE AND NOT A PREFERENCE.** **(i)** **No carrier and no kernel byte**: the arm
already holds `answer = state.leg` (`:739`). **(ii)** **`CommitRecord.pending`'s contents do not move**, so `§4`'s re-read is a null
one and no cell that asserts the member is re-derived. **(iii)** **Three files instead of five.**

**ITS FOUR COSTS, EACH MEASURED AGAINST THIS TREE:**

1. **THE SCOPE CANNOT BE NARROWED — this is the refusal's ground.** The delivered set becomes *every write the commit landed after
   its own*, because the entry cannot separate a repair's write from a constraint body's (§3.1 fact 3). **A constraint body's
   joined write (`D-53`) would therefore have its listeners delivered a SECOND time by a PATCH that was ordered for repairs only** —
   because that same write already reaches a nested attempt whose own arm delivers them today (§1's last two paragraphs; §3.4a's
   hazard is the mirror of this one) — **an un-ordered behaviour change a release note cannot promise, arriving as a double
   invocation rather than a first one.** **Narrowing (b) needs a channel telling the entry *this write is a repair's* — at which
   point (b) has paid (a)'s carrier cost and still reads a slot.**
2. **THE `state.leg` OVERWRITE HAZARD, AND WHAT (b) WOULD HAVE TO DO ABOUT IT.** `state.leg` is **one slot** (`index.mjs:241`), each
   write's leg branch overwrites it (`:452`), and **nothing restores it for a write** (only the `delete` member brackets its own,
   `:572`–`:573`, `:632`–`:633`). **So a SECOND repair in one commit erases the first's set** — and a two-repair commit is a
   **committed fixture** (`tests/e2e/file-tier-save-properties.test.mjs`'s `P-SM-5`, `:633`–`:690`: one repair write per pair,
   `n > 1`). **The cure is a second accumulation** — a per-window row on `state`, appended at the same `:452` seat, read by the arm
   and released by `closeCommit` — **which is (a)'s carrier in an entry-side dress**, with a further hazard: a nested three-position
   repair write joins the enclosing window, so its nested attempt's terminal arm would read the **enclosing** row and deliver the
   outer commit's listeners early (an `A112` breach) — reachable only on `D-103`'s unsupported route, and therefore a hazard (b) can
   only *declare*.
3. **THE FAILING ARM NEEDS A NEW GATE.** `pending` is emptied by `terminal`'s discard (`kernel-terminal.mjs:96`), but the leg's set
   is not — so (b) must gate the union on `record[SETTLED_ON_THE_PASSING_ARM] === true` (`kernel-attempt.mjs:346`–`:348`), or the
   failing arm would **re-admit every handle the discard just removed**. **That gate is available and clean** (it is also the save's
   gate, `delivery.mjs:741`), and it is (b)'s only genuinely cheap part — printed so the refusal does not overstate.
4. **THE REGISTRATION INSTANT IS SAFE FOR BOTH ROUTES AND IS NOT A DISCRIMINATOR.** A registration's evaluation reaches **no terminal
   arm** (`PIN-6` (v); `D-46`), so `G3-22`'s two zeros (`:490`–`:498`) stand under (b) as they do under (a) — **and under (a) they
   stand structurally rather than by a gate**: a registration's attempt carries no `record` (`kernel-registration.mjs`'s synthetic
   attempt), so the merge has no member to write.
   **⟶ CORRECTED `2026-11-06` BY `D-125` ITEM `1`, AT THIS ITEM AND BY NAME: THE REGISTRATION INSTANT DELIVERS, AND IT IS NEITHER
   SILENT NOR SAFE FROM A DELIVERY.** The architect's word, verbatim: *"Widen: `addConstraint`, a re-arm, the boot and the creation
   ALL deliver after their repairs"* — **at FOUR instants, in `D-117`'s order instant for instant (ask → repairs land → re-run → SAVE
   → DELIVER → the member's record), after the constraints pass and after the save and before the answer, with ONE ORDER AND TWO
   SETS:** `storeCreate` and a boot deliver **`adopted ∩ resolving`**; `addConstraint` and a re-arm deliver **the repair's write's
   `triggered` set** — **and there is NO DELIVERY ON A REFUSING ARM.** **So this item's *"reaches no terminal arm"* and its *"safe
   for both routes and is not a discriminator"* are the reading of the moment before the widening**, and the two clauses that stated
   the silence in the code since the instant was built — `kernel-registration.mjs`'s *"IT STILL OPENS NO `K-2` AND STILL DELIVERS NO
   LISTENER"* (`:888`–`:889`) and `PIN-6` (v) (`:510`–`:512`) — **stop being true** (`D-125` item `1`, its last paragraph; `C-12`
   stops by name). **WHAT SURVIVES OF THIS ITEM: (b) is still refused — on §3.1's trade about SCOPE, and NOT on the silence this item
   priced as a discriminator.** *(`D-125` items `1`, `2` (i); `docs/L1/creation-sweep.md` `PIN-2`, `PIN-6`.)*

**VERDICT: (a) IS TAKEN, ON §3.1's TRADE.** **The ruling's own words are *"any new non-constraint listeners"*, and `D-104` item 2
says *the repair's write's* — so a mechanism whose scope is wider than the ruling, in a patch, is refused before its savings are
counted.** **(b) is not wrong about the bytes; it is wrong about the scope, and it cannot be made right without (a)'s carrier.**

---

## §4 · `pending`'S SEMANTICS, RE-READ — `D-104` item 3's sentence, answered in the direction (a) takes

**THE READING IS UNCHANGED AND THE MEMBER'S EXTENT WIDENS.** The clause that governs is `kernel-surface.md §2.1` item 2 read with
`A112` (*"`pending` IS THE WHOLE RETURNED SET … AND CHECKS EACH OFF AS IT PASSES"*) and the reading this tree measured at
`DW-14.4`: **`pending` is the list of handles the pass did not evaluate** (`tests/e2e/discard-witness.mjs:2730`–`:2768`; the guide's
own sentence at `§6.4:633`–`:639`). **`D-56` is what decides WHICH handles leave it** — the pass's reach is a prefix set, so an
ancestor pair's handle is asked and checked off — and nothing in `D-56` is touched here.

**SO APPENDING A LISTENER IS CONSISTENT, IN THE READING'S OWN TERMS:** a listener **is never the pass's** — the pass asks pairs
(`pairsTriggered`'s filter, `kernel-foundations.mjs:1272`–`:1288`) and a listener's handle is the **delivery's** work (`D-69`; the
guide's `§6.4:641`, verbatim: *"ON A PASSING WRITE `pending` HOLDS EXACTLY THE HANDLES THE PASS DID NOT EVALUATE — NO CONSTRAINT AT
AN ADDRESS IT ASKED, AND EVERY LISTENER THE DELIVERY WILL FIRE"*). **A repair's write's listener is exactly a listener the delivery
will fire and the pass will not evaluate, so the member's meaning does not move; its population grows by one source.**

**AND THE MERGE HAS A GROUND STRONGER THAN "THE POPULATION GROWS": `A112`'S OWN SENTENCE.** The archived ruling row reads, verbatim:
***"because NO listener runs until the constraints pass, EVERY listener is `pending` on EVERY write"***
(`archive/pre-strata-docs-2026-10-24/docs/decisions.md:80`). **The repair's write IS a write of this commit** (`D-46`'s join), so
**that rule, applied to it, is the merge**: the listeners it fired are `pending` on it, and the member is where a listener waits for
the pass. **The fix therefore does not invent a member's meaning; it applies a published one to an act the record had left out.**

**THE THREE THINGS THAT DO MOVE, AND WHERE THEY ARE RE-DERIVED:**

1. **`pending` IS NO LONGER A SUBSET OF `triggered` AFTER A REPAIR.** `triggered` stays the commit's own write's returned set (§2
   B-6) and the merged elements are a second act's. **Two committed claims assert the subset relation on fixtures that land no
   repair firing outside the commit's set** — `tests/integration/js-constraints/constraint-kernel-layers.test.mjs:349`–`:351`
   (*"a layer (b) handle is a handle THIS call's write returned"*) and `constraint-kernel-negatives.test.mjs:223`–`:224`
   (the passing-arm equality) — **and both are GREEN on their own fixtures** (their repairs land at an address whose store reach does
   not reach a listener the commit's write did not return). **They are re-derived as CLAUSES in the same act as the cells** (§7.3).
2. **THE GUIDE'S `§6.4` COMPOSITION CLAUSES GAIN A FOURTH SOURCE.** `:643`–`:660` ends *"a `pending` entry is either a listener the
   delivery still owes (the residue) or a constraint the pass has not reached (the failing arm's whole set)"* — **after the fix a
   residue entry may also be a listener a repair's edit fired.** A dated clause is owed there (`§8`).
3. **`index.d.ts`'s `CommitRecord.pending` DOCBLOCK** (`:803`–`:813`) says the member carries *"THE WHOLE RETURNED SET OF TRIGGERED
   CONSTRAINTS this call's write returned"* — **true as the seed, no longer exhaustive.** A dated clause, no type and no member
   (`§8`).

**AND ONE CONSEQUENCE A LATER REPAIR SEES, DECLARED BECAUSE IT IS A MEMBER A CONSUMER'S BODY HOLDS.** **`RepairContext.pending` is
`attempt.record.pending.slice()` read PER EVALUATION** (`kernel-attempt.mjs:809`), so **in a commit with more than one repair, every
repair after the first is handed a `pending` that carries an EARLIER repair's listener elements.** **No committed cell asserts that
member's CONTENTS** (`guide §7.6:1061` prints the member; `FTS-11.1` reads member NAMES; `S-REPAIR-CTX` asserts `length > 0` and the
element `typeof`, `file-tier-save.test.mjs:2463`–`:2471`), **so nothing reds — and `kernel-surface.md §2.3` item 2's sixth member now
means, for those bodies, "the commit's un-evaluated handles `INCLUDING` the listeners its own earlier repairs fired"**, which the
guide's clause owes a sentence for (§8's guide row). **The alternative — handing a repair a `pending` minus the merged elements —
is refused**: it would make the context disagree with the record it stands for, and `§2.3` item 2's provenance clause is *"read
VERBATIM AND HANDED AS A FRESH LIST"*.

**AND ONE THING THE MERGE MAY NOT DO, SAID HERE BECAUSE IT IS TEMPTING AND UNLAWFUL:** **the repair's elements are NOT added to
`triggered`** to restore the subset relation. `triggered` is the store's answer (`kernel-commit.mjs:167`–`:168`), and a package
that wrote a second act's handles into it would be **forging a store result** — `A112`'s *"`triggered` then stands as the store's own
returned set"* and `DW-14.4`'s own measured claim. **The asymmetry is declared, not repaired.**

---

## §5 · THE FAILING ARM — EMPTY, BY `D-104` ITEM 2 AND `surface.md §2.7` item 6

**THE LAW IS UNMOVED: a failed attempt's delivery is EMPTY.** `kernel-terminal.mjs:73`–`:97` is the discard's one home: it reads
**the failed write's own returned set** (`:95`, `attempt.write.triggered`, VERBATIM per `attempt-lifecycle.md §2.4` item 8 (i) (5))
and removes every handle of it from `record.pending` (`:96`), so the terminal arm's later read delivers `0` — **the arm is still
taken, and an empty delivery is a no-op and not a failure** (`kernel-attempt.mjs:283`–`:292`).

**THE MERGED ELEMENTS ARE **NOT** IN THAT SET — `attempt.write` is the commit's own write's record, not a repair's — SO THE FIX
WIDENS THE FILTER AND NOTHING ELSE.** The filter becomes **the union of the failed write's returned set and the sets this attempt's
repairs' writes returned** (`attempt.repairTriggered`, §3.5): **one removal, by the set each entry came back in, and no second rule.**
**The whole-member clear stays WITHDRAWN BY NAME** (`kernel-terminal.mjs:78`, whose phrase *"the SECOND, UNLAWFUL REMOVAL"* is the
CODE COMMENT's and reads `A113` (D1)'s withdrawal of *"`A112`'s second, unlawful removal"* — the blanket clear), **and no entry that
the failed write and this attempt's repairs did not return is reached.**

**AND THE ORDER OF THE TWO EVENTS IS THE ONE THE LAW NEEDS:** the merge happens **before** the re-run (§3.4 seat 2), the re-run's
refusal closes the attempt through `terminalComposed` → `terminal` → **the discard runs there**, and only then does `settleArm` reach
the arm (`kernel-attempt.mjs:292`). **So the member the arm reads has already lost every one of those handles.**

**DOES THE `discarded` WITNESS (`D-49` / `D-55`) NAME THEM? — `D-104` ITEM 2 SAYS IT DOES, THE BYTES SAY IT CANNOT, AND THIS FILE
DOES NOT DECIDE IT (`Q-7`).** `D-104` item 2's second half reads verbatim: *"the witness (`discarded`) reads them as it reads any
other discarded raise"* (`strata/decisions.md:5317`–`:5319`). **At the bytes the witness's element is `{opId, addresses}`** — a
**discarded reversal request** a delivery window threw away (`index.mjs:606`–`:629`; `D-49`'s ruling, `D-75`'s list, and the
`rollback` record's own live view at `:698`–`:701`) — **so there is no member of that shape into which a listener HANDLE could be
written, and minting one would move a record's declared shape** (`D-104` item 4; `A117` (D6)). **So the reading this file takes is
that the failing arm's witness does NOT name them, and its observables are the invocation count of `0` and the record's `pending`,
which holds none of those handles — and because that reading reverses a printed clause of the ruling, it is put to the architect as
`Q-7` rather than taken here.** **Nothing in this fix depends on the answer**: the delivery is empty either way, and a witness would
be a declaration's business and not a mechanism's.

**AND THE REPAIR'S OWN PASS, WHICH IS THE INSTANCE `D-104` ITEM 4 ASKS ME TO SPELL.** **On the SUPPORTED route the repair's write has
no pass of its own to refuse**: it names the commit (`D-46`; `D-103`), joins it, and its op is the attempt's landing that **the
re-run** judges (`runToCompletion:492`–`:508`; `attempt-lifecycle.md §2.4` item 5 (iv)). **So there are exactly two ways this fix's
set can be discarded, and both are the same arm:**

- **THE STORE REFUSES THE REPAIR'S VERB** — no op exists, `landedOp` credits nothing, the attempt takes arm (d) `KC-4`
  (`kernel-attempt.mjs:902`–`:914`), **the merge had appended nothing** (§3.4 seat 1), and the delivery is empty;
- **THE RE-RUN REFUSES** — a pair at the attempt's address (or its ancestor, `D-56`) violates at the repair's op: arms
  (c)/(e)/(f) (`:740`–`:774`), the discard of §5's widened filter, **the delivery empty**.

**On `D-103`'s UNSUPPORTED route a nested attempt exists and its own pass can refuse** — `D-103` item 1 promises none of the five
including **"the `pending` delivery"**, so **no cell may assert this arm's count and no clause here promises it** (`Q-6`).

---

## §6 · THE ORDERING — `A112` UNMOVED, READ AT ITS OWN INSTANT

**THE LAW, VERBATIM AND UNTOUCHED: *"for a write, the surface runs the write's TRIGGERED CONSTRAINTS FIRST, and THE OTHER LISTENERS
ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED"*** (`surface.md §2.7` item 6, quoted at `kernel-attempt.mjs:329`–`:331` and in
`index.mjs`'s delete clause `:516`–`:519`). **The fix adds no invocation site**: the merged set is delivered by **the same `deliver`
call** the residue uses (`delivery.mjs:828`), at **the same instant** — the terminal arm, after `close(…,'passed')`
(`kernel-attempt.mjs:307`), after `bumpMark` (`:328`) and after the `file`-tier save (`delivery.mjs:740`–`:787`) — **so every
constraint of the attempt has passed before any merged listener is invoked, by construction and not by care.** **`D-60`'s two halves
are unmoved by position**: a repair's write is *during* the sweep, a listener's write is *after* it.

**AND THE ONE THING THE FIX MUST NOT BE READ AS CHANGING: THE PASS'S OWN SET.** The re-run asks `attempt.record.triggered`
(`kernel-attempt.mjs:573`–`:574`) and **not** `pending`, so a merge into `pending` cannot make the pass ask a pair it would not have
asked, and cannot make it skip one. **`D-69`'s filter, `D-66`'s touched set and `D-56`'s prefix reach are byte-unmoved.**

**WHAT A CELL MAY AND MAY NOT ASSERT ABOUT ORDER.** **MAY**: that the constraint's ask happens before the listener's invocation; that
the delivery is **one** call (observed as one recipient snapshot: a registration made by one listener body is not invoked in the same
delivery, `delivery.mjs:107`–`:121`); that each handle's count is `1`. **MAY NOT**: any order among the merged elements, any order
among the residue's elements (`DD-22`, `DD-37` — the store's list is a set whose order is unspecified), **which act fired a
doubly-fired handle**, or a per-handle address (§2 B-3). **The member's own order is a fact of the append** (the merged elements
stand after the residue's), **and it is not a declaration about the store's set** — so no cell may be written on it either.

---

## §7 · THE CELLS — named, with the red set read and its instrument limit declared

**§0's limit applies: these are readings, not runs.** **This pass has no shell**, so the red set is each fixture's writes and
assertions read at their bytes; the landing pass re-measures it and §7.3 says which cell it expects where.

### 7.1 THE CELLS THIS FIX OWES — `tests/e2e/` (`role_l1_test_writer`, `D-5`'s scope)

**One new file — `tests/e2e/repair-listener-delivery.test.mjs` — and eight cells.** Each reaches the entry **by path** (`O4`,
`D-6`/`D-7`: none of these claims the packaged resolution).

| cell | what it drives, and the failure it catches |
|---|---|
| **`RLD-1` · THE DELIVERY** | a pair at `['a']` refuses `2` and its repair writes `3` at `['b']`, where a listener is BOUND; the caller sees it invoked **exactly once**, and the invocation happens **after the pass** (a marker the pair body sets is what the listener reads, and the re-run's ask must have happened before the invocation). **Catches: the defect itself** (`D-104`'s `0`). |
| **`RLD-2` · THE DOUBLY-FIRED HANDLE** | one listener bound at `['a']` is fired by **both** the original write and the repair's edit (the repair rewrites `['a']`): **invoked once**, and `pending` carries **one** element for that handle. **Catches: a merge that appends without the member's de-duplication (§3.4)** — a caller's own loop would then run the body twice. |
| **`RLD-3` · THE FAILING ARM** | a second pair refuses at the re-run; the repair's listener is **not invoked** (`0`), the store is restored, `pending` holds **no handle of either set**, and the `discarded` witness carries **no entry naming it** — **that last half is asserted as the READING `Q-7` puts up, so the cell is HELD there and the rest of it lands**. **Catches: a fix that delivers a discarded set** — the failure `tests/integration/js-constraints/constraint-kernel-deltamodel.test.mjs:524`–`:529` already names in its own clause. |
| **`RLD-4` · THE SEAT** | the repair's listeners are invoked **neither inside the repair body nor inside the pass**: a listener body that reads `store.read(['a'])` sees the **post-re-run** value, and a counter read at the repair body's return is `0`. **Catches: an in-window invocation** (`A116`/`A115`, `A112`). |
| **`RLD-5` · `pending`'S RE-DERIVATION** | at the commit's return `pending` carries the repair's listener's element beside the residue's, **each element is the pair `{handle, address}`** (`TF-1`), and **`triggered` is unmoved** (`pending ⊄ triggered` after a repair, §4). **Catches: a merge into `triggered`, or a bare handle** (`TF-7`). |
| **`RLD-6` · THE REGISTRATION INSTANT IS UNMOVED** | a repair at `addConstraint`'s evaluation delivers **nothing** (`G3-22`'s zero, re-asserted in this file so the fix cannot widen quietly). **Catches: a carrier that fires outside a commit's arm.** **⟶ CORRECTED `2026-11-06` BY `D-125` ITEM `1`: THE STATEMENT IS WITHDRAWN AND THE CELL'S SUBJECT WITH IT — the registration instant DELIVERS, at four instants, in `D-117`'s order instant for instant, after the save and before the answer, with one order and two sets (`storeCreate` and a boot: `adopted ∩ resolving`; `addConstraint` and a re-arm: the repair's write's `triggered`), and nothing on a refusing arm.** The landed cell asserts that delivery and no longer asserts a zero; the silence it printed here is the clause `D-125` closed (`kernel-registration.mjs:510`–`:512`, `:888`–`:889`). *(`D-125` items `1`, `2` (i); `§7.1`'s own corrected entry above; `D-94` item `3` stops.)* |
| **`RLD-7` · THE DELETE-SHAPED COMMIT** | a repair during a `delete`'s pass: its listener is invoked **once**, by the delete's own delivery, after the pass (`Q-2`'s cell; it is **held** if the architect narrows §2 B-5). |
| **`RLD-8` · THE TWO-REPAIR COMMIT** | two pairs violate in turn and **two** repairs land (`P-SM-5`'s shape, with listeners added): **both** listeners are invoked once. **Catches: any single-slot carrier** — the hazard §3.6 (b) 2 would have had to declare. |

### 7.2 THE CELLS THIS FIX OWES — `tests/integration/js-constraints/` (`role_l2_test_writer`)

**One new file — `tests/integration/js-constraints/repair-listener-delivery.test.mjs` — five cells, each at the kernel's own
surface.**

| cell | what it asserts |
|---|---|
| **`RLD-I1` · THE PREDICATE** | a repair's write whose returned set carries a **pair's `id` and a listener's handle**: the listener merges, **the pair's id does not** — read as membership on `pending`, **on the MULTI-REPAIR shape that measures it** (`P-SM-5`'s chain, §3.3), because a single-repair fixture's id is still in the member at the seat. |
| **`RLD-I2` · THE DISCARD'S WIDENED SCOPE** | on the failing arm, `pending` ∩ (`attempt.write.triggered` ∪ the repairs' sets) = ∅, **read as a set relation and never as a count of removals** (`attempt-lifecycle.md §3` item 8's own form). |
| **`RLD-I3` · THE SEAT IS BEFORE THE RE-RUN** | a pair asked **on the re-run** closes over the record and reads `record.pending` at that instant: **the repair's listener's element already stands there**. This is the seat's only direct observable. |
| **`RLD-I4` · THE CREDIT GATE** | a repair whose return names no op (arm (d), `KC-4`) merges **nothing** — the record's `pending` is the whole returned set MINUS the discard's reach, with no repair element in it. |
| **`RLD-I5` · THE NESTED-ATTEMPT GUARD** | a repair that writes **without naming the commit** (three positions, `D-103`'s unsupported route) inside a commit with a listener bound at its address: the enclosing `pending` gains **no** element from that nested write, and the listener's count is **`1`, not `2`** (§3.4a). **Catches: a leg list whose nested commit rides it into the enclosing member — a double invocation.** |

### 7.3 THE RED SET — READ, AND IT IS EMPTY OF ASSERTIONS

**NO COMMITTED CELL'S ASSERTION REDS UNDER (a).** **The reason is NOT that a repair's address is a subset of the commit's** — that
sentence was the first draft's and it is **FALSE of two committed fixtures**, both writing at a **SIBLING** address
(`tests/e2e/blind-constraints-v2.mjs:1012`–`:1015`, commit at `['a']` and the repair at `['b']`;
`tests/e2e/discard-witness.mjs:593`–`:602`, the `W8` shape, the same two addresses). **The reason the merge is empty there is
narrower and it is stated exactly: NO LISTENER IS BOUND AT THE ADDRESS THE REPAIR WROTE TO** — so the repair's returned set carries
no listener handle the commit's set did not already carry (only the store's pair entries, which §3.3 excludes). **A cell that
asserts over `pending`, `triggered` or an invocation count is therefore unmoved on every committed fixture.**

**THE FIXTURES THAT ASSERT OVER THE MEMBER OR OVER AN INVOCATION COUNT, READ ONE BY ONE:**

| fixture | its repair's address | why the merge is empty |
|---|---|---|
| `constraint-kernel-negatives.test.mjs:139`–`:239` (`ck_p_neg_14`) | the attempt's own `['<tag>','c']` | the repair's returned set is `{the pair's id, the ancestor listener's handle}` — **both already in `pending`**, and the id excluded by §3.3 |
| `constraint-kernel-deltamodel.test.mjs:403`–`:610` (`ck_neg_dm_02`) | the attempt's own address | same; **and the arm is the FAILING one**, where the widened discard removes everything |
| `constraint-kernel-layers.test.mjs:280`–`:372` | the ancestor — **and its repair never runs**, because its own body returns `true` for every ask a descendant act makes (`:290`–`:298`: `context.address.length !== ancestorAddress.length`) | no repair, no merge |
| `tests/e2e/file-tier-save.test.mjs:2367`–`:2501` (`S-REPAIR-CTX`) | the commit's own `[key]` at `file` | the repair's set names nothing outside the residue; **`pending`'s post-repair length is captured and never asserted** (`:2410`–`:2411`) |
| `tests/e2e/file-tier-save/scenarios.mjs` `FTS-11` | the commit's own `['c']` | same — **and this is the fixture that also proves the predicate is NOT the de-duplication's deputy** (§3.3) — **`FTS-11.6`'s `observed` figure stays `1`** |
| `tests/e2e/file-tier-save-properties.test.mjs` `P-SM-5` | the commit's own address, one repair per pair | the ids an earlier run checked off are excluded by §3.3, and no listener is bound at all |

**AND THE COVERAGE CLAIM, STATED AT ITS TRUE WIDTH.** **`grep -rl "repair:" tests/` reaches TWENTY files with repair sites; the table
above names the six whose assertions read the member or an invocation count, and the rest were read with the same question and the
same answer** — every one of them lands its repair at the attempt's own address or at `rc.address`, except two: `blind-constraints-v2`'s
E2E-C-9 and `discard-witness`'s `W8`, both at a **listener-free** sibling address, and `file-tier-save.test.mjs:860`'s deeper write,
which is **refused by the store** (`WriteParentNotLink`, arm (d)) and merges nothing. **`ordering.test.mjs`, `constraint-kernel-
deliverymodel.test.mjs`, `constraint-kernel-repairop.test.mjs` and `constraint-kernel-states.test.mjs` contain no repair that a
passing delivery reaches with a listener bound** (the first two contain no repair at all). **The examination that produced this
paragraph is named at §0.1 and its coverage is the twenty-file set, not six rows.**

**AND TWO CLAIMS ARE RE-DERIVED IN THE SAME ACT, WHICH THE LANDING PASS MUST NOT DISCOVER LATE — neither reds today, and each would
red on the first fixture that lands a repair firing a listener handle outside the commit's set (which `RLD-5` creates):**

1. **`tests/integration/js-constraints/constraint-kernel-layers.test.mjs:344`–`:351`** — the loop over `pending` asserting
   `carriesHandle(commitRecord.triggered, entry.handle) === true` for **every** element. **Its claim becomes non-total**: a merged
   element is a handle **the repair's write** returned.
2. **`tests/integration/js-constraints/constraint-kernel-negatives.test.mjs:223`–`:224`** — `setHandles(pending)` equals
   `setHandles(triggered)` minus the checked-off id, on the passing arm. **Same re-derivation**, same fixture-safety.

**AND ONE `observed` CELL BECOMES DISCRIMINATING WITHOUT MOVING**: `FTS-11.6` (`file-tier-save/scenarios.mjs:1172`–`:1173`) prints
*"the number of times the delivered body ran on the repair-join arm"* and asserts nothing. **Its figure stays `1`** — its listener's
handle is already in the residue — **but from the fix's date it is the one printed figure that would move if the merge
over-reached**, so the landing pass promotes it to an `A` cell with the same value.

**AND ONE CELL IS THE FIX'S STRUCTURAL CONSTRAINT RATHER THAN ITS SUBJECT**: `tests/e2e/registration-write-route.test.mjs`'s
`G3-22` (`:381`–`:519`) asserts `listenerDelta === 0` across a repair's route-write at the registration instant. **It stays GREEN
under (a) because a registration's attempt carries no `record`**, and `RLD-6` re-asserts it in the new file so the mechanism's
carrier cannot grow a path to that instant. **⟶ CORRECTED `2026-11-06` BY `D-125` ITEM `1`: THE ZERO IS THE READING OF ITS DATE AND
NOT A STRUCTURAL CONSTANT, BECAUSE THE REGISTRATION INSTANT DELIVERS.** A repair's route-write at `addConstraint` or at a re-arm
**delivers that write's `triggered` set, after the save and before the answer** — so the delta is `0` only where the set names **no
adopted handle** (a refusing arm, or a write no watched address is triggered by), **and a pass that re-asserts the zero as a law has
re-asserted the silence `D-125` reversed.** **`RLD-6` therefore no longer re-asserts it**: that cell's own statement is corrected at
§7.1 in this same act, and its landed form turns on the delivered count. *(`D-125` items `1`, `2`; `D-94` item `3` stops —
*"the caller's view of a registration gains a third observable, the listeners its repairs fired"*.)*

---

## §8 · THE WRITE SET, BY ROLE — and what each role owes, priced in bytes

| role | path | the delta |
|---|---|---|
| **this pass (`role_l1_architect`)** | `docs/L1/repair-listener-delivery.md` | **the declaration — one path; nothing else in the tree is touched, staged or committed** |
| **`js-registry-delivery`** (module `12`) | `bindings/js/src/entry/state.mjs` | **the carrier**: the invocation bracket (`:683`–`:700`) gains the leg list's opening and closing; **one** new `Symbol.for` key and its channel (beside `:724`–`:731`), answering-and-clearing the last closed invocation's legs. **Nothing else in the file moves** — `openCommit`, `closeCommit`, the marks and the windows are untouched |
| **`js-surface`** (module `10`) | `bindings/js/index.mjs` | **the append**, beside `state.leg = record` (`:452`), inside the `n >= 4` arm only; **and a dated clause** re-deriving `:468`–`:469`'s *"`record.pending`'s residue plus the checked-off identities"* (§4). **The leg slot, its readers, the `delete` member and the fourteen members are unmoved** |
| **`js-constraints`** (module `13`) | `bindings/js/src/entry/kernel-attempt.mjs` | **the two guards and the merge**: the read is taken only where `repairInCommit` found the bracket (`:110`–`:114`), the list is dropped where `kernel.attempts` moved across the invocation (§3.4a), and the merge lands at §3.4's seat (before `:929`) with §3.3's predicate and §3.4's de-duplication; **and a dated clause** beside the layer (a) paragraph at `:922`–`:928` |
| **`js-constraints`** | `bindings/js/src/entry/kernel-commit.mjs` | **`attempt.repairTriggered = []`** at both mints (`:68`–`:94`, `:280`–`:309`) — one internal member, no record member |
| **`js-constraints`** | `bindings/js/src/entry/kernel-terminal.mjs` | **the discard's filter widened** to the union (`:95`–`:96`) — one expression, the rule's home unmoved |
| **`js-declaration`** (module `14`) | `bindings/js/index.d.ts` | **a dated clause** inside `CommitRecord.pending`'s docblock (`:803`–`:813`). **No type, no member, no arity, no export and no status moves** |
| **the guide's owner (no module owns a contract — map §5.3)** | `docs/guides/package-use.md` | **a dated clause in §6.4** (the residue's fourth source) and **one in §7.6** (what happens to the listeners a repair's edit fired), each annotated beside and neither rewriting what stands |
| **`role_l1_test_writer`** | `tests/e2e/repair-listener-delivery.test.mjs` (new) and `tests/e2e/file-tier-save/scenarios.mjs` (`FTS-11.6` promoted) | §7.1's eight cells; `FTS-11.6`'s promotion with its figure unmoved |
| **`role_l2_test_writer`** | `tests/integration/js-constraints/repair-listener-delivery.test.mjs` (new), and the two claim re-derivations at `constraint-kernel-layers.test.mjs:344`–`:351` and `constraint-kernel-negatives.test.mjs:223`–`:224` | §7.2's **five** cells (the predicate, the discard's scope, the seat, the credit gate, **the nested-attempt guard**); §7.3's two re-derived CLAIMS |
| **release pass** | `RELEASE-NOTES.md`, its landed copy, and the version line the release pass owns | §9 |
| **`role_l2_integration`** | `docs/L1/module-map.md`, `docs/L1/modules.json` | **NOTHING.** No module is declared and no endpoint moves: **`19` modules / `61` endpoints stand and the harness cap is unmoved** (`modules.json:612`, `:618`, `:622`). The fix lands inside `js-constraints`, `js-registry-delivery`, `js-surface` and `js-declaration`, whose responsibility lines already cover it |
| **nobody in this pass** | `strata/**`, `src/**` (the Rust store), `bindings/js/src/entry/delivery.mjs`, `bindings/js/src/entry/constraints.mjs`, `bindings/js/package.json`, `bindings/js/README.md` | **unmoved — named so the absence is a decision.** `delivery.mjs` in particular: **the fix needs no byte of the loop or of the arm** (§3.5) |

**THE ONE COUPLING THE LANDING ORDER MUST RESPECT.** **The carrier, the merge and the discard's widening are ONE act**: a merge
without the widened discard would **deliver a discarded set** on every failing repaired attempt (§5), and a carrier without a
reader is dead bytes. **So the four `src/entry` edits land together, the two re-derived claims land with the cells, and no release may
be cut between them.**

---

## §9 · THE RELEASE CLASS — **A PATCH, MARKED AND NOT NUMBERED**

**THE CLASS IS `PATCH`, AND THE NUMBER IS THE RELEASE PASS'S** (`D-104` item 4: *"The fix lands in the patch … Its version line is
the release pass's"*; `D-100`'s `1.7.0` and `D-102`'s `1.8.0` are **not reopened**). **The ground is `PUB-DD-9`'s own row read at its
letter**: a patch changes behaviour **without** adding a member, an arity, a type or a status — and **this fix adds none of the
four** (`D-104` item 4). **`bindings/js/package.json`'s version byte is not moved by this declaration, and this pass cuts, tags and
packs nothing.**

**AND THE CLASS IS NARROWER THAN THE CHANGE'S SIZE, WHICH IS WHY THE NOTES ARE LOAD-BEARING.** The behaviour a consumer can observe
moving is **a listener that was never invoked now being invoked**, plus **`pending`'s population gaining a source** (§4) — **two
consumer-visible readings of one behaviour fix.**

**WHAT THE PATCH'S NOTES OWE — five things and no sixth:**

1. **THE VERSION LINE**, and the tag's record, both the release pass's.
2. **ONE ROW IN THE CHANGE LIST** naming **the behaviour fix**: a repair's write's triggered listeners are delivered in the commit's
   delivery, after the pass, once per distinct handle — **with `D-104` cited and this file's §2 named as the declaration**.
3. **THE `pending` SENTENCE, RE-DERIVED AND NOT DROPPED.** The guide's `§6.4` clauses (`:619`–`:660`) and `index.d.ts`'s docblock
   (`:803`–`:813`) are **read through a dated clause** each; the notes' row says so in one sentence, because *"a `pending` entry is
   either a listener the delivery still owes or a constraint the pass has not reached"* is the sentence a consumer will act on —
   **and one sentence beside it for `RepairContext.pending`** (§4's last clause: in a multi-repair commit a later repair is handed a
   member carrying an earlier repair's listener elements), because that is a member a consumer's own body reads.
4. **THE FAILING ARM, STATED SO IT IS NOT DISCOVERED.** A failed attempt still delivers **nothing** (`§2.7` item 6): **the fix changes
   what a PASSING commit delivers and nothing about a failing one** — and the notes say both halves, because a reader who learns the
   first without the second will expect a listener on a refusal.
5. **THE SHIPPED HALF — `D-51` item 1's lesson, applied before it can bite again.** **`1.2.0` shipped a behaviour change declared in
   a file that rides no tarball, and `D-51` filed it as the breach repeating.** **So the notes must say what a consumer RECEIVING THE
   TARBALL can read**: the declaration's clause travels (`index.d.ts` ships), the guide's does not unless the manifest carries it
   (`bindings/js/package.json`'s `files`), **and the release pass states which of the two it is** rather than leaving a reader to
   find out. **This pass does not move that manifest** (`D-3`/`D-4`: the shape is `delivery`'s and the evidence's).

**WHAT THE PATCH DOES NOT COVER, NAMED SO NO ROW IMPLIES IT:** `Q-1`'s constraint-body write, `Q-5`'s unasked pairs, `Q-3`'s
delivery argument, `Q-6`'s unsupported route and `D-88` (2)'s refusal sentence — **none of them is in this fix and the notes promise
none of them.**

---

## §10 · THE QUESTIONS THIS DECLARATION CANNOT SETTLE — priced, and sent up

**`Q-1` — THE CONSTRAINT BODY'S WRITE IS NOT A SILENCE, AND WHERE ITS DELIVERY SITS IS THE QUESTION.** A constraint body's `write`
(`D-53`) is a **three-position** call from caller code, so it reaches `constraintWrite` → a **nested `K-2`** → **its own attempt's
terminal arm, which delivers its listeners today** (§1's last paragraph; the same mechanism §3.4a guards). **So the constraint-body
half is delivered — on a NESTED attempt's delivery, inside the enclosing pass, at the nested attempt's own instant — and the
question is whether that is right.** **Priced, both ways**: **confirming it** costs nothing and makes *"a write's listeners are
delivered by the commit that write landed in"* true of both kinds, **with a caveat that must then be declared** — the nested
delivery runs **inside** the enclosing pass, so a nested act's listeners can be invoked before the enclosing attempt's own pass has
finished, which is the `A112` ordering read one nesting level down; **moving it to the enclosing commit's delivery** would need the
nested attempt not to deliver — a change to `settleArm`'s arm selection — **and an un-ordered behaviour change in a patch.** **Not
taken: `D-104` orders a repair's write, and this file does not widen it.**

**`Q-2` — THE DELETE-SHAPED COMMIT IS IN THE FIX BY CONSTRUCTION (§2 B-5).** The merge sits on `evaluate`'s repair arm, which both
attempt kinds share, and the delete's delivery reads the same record (`index.mjs:600`–`:602`). **Priced, both ways**: **confirming it**
costs nothing and makes `D-55` item 3's commit a commit in the delivery too; **narrowing it** costs a kind test at the merge
(`attempt.kind === 'delete'`, minted at `kernel-commit.mjs:283`) plus the loss of a behaviour that is right by the ruling's own
reason. **`RLD-7` is declared HELD until this is answered.**

**`Q-3` — THE DELIVERY'S ONE ARGUMENT IS THE LEG'S OP ADDRESS, SO A REPAIRED WRITE HANDS ITS WHOLE SET THE REPAIR'S ADDRESS (§2
B-3).** **This is PRE-EXISTING** (`delivery.mjs:739`, `:816`–`:818`; `index.mjs:452`) and the fix moves no byte of it. **Priced**: to
make the argument the commit's own op address is a one-line change at `:816`–`:818` — **but it moves the argument for every repaired
write, it is a behaviour change nobody ordered, and the same slot feeds the save's own gate beside it (§10 `Q-4`).** **Not taken.**

**`Q-4` — AND THE SLOT'S OTHER READER, WHICH THIS PASS FOUND AND DOES NOT REPAIR.** The terminal arm's `file`-tier save is gated on
`answer.op.tier === 'file'` (`delivery.mjs:740`–`:747`) and saves `answer.op.opId` (`:780`) — **both read off the leg, so where a
repair landed a `mem`-tier edit inside a `file`-tier commit, the gate reads the REPAIR's tier and the save would not run.** **No
committed cell covers that combination** (every fixture's repair writes at `file`), so **this is a READING and not a measurement**;
**it is a different defect from `D-104`'s, it is not the fix's, and it needs its own row.** **Priced: one measurement first** — a
`file`-tier write whose repair lands at `mem` across the terminal arm — **then a ruling**, because the cure moves either the save's
gate or the leg's ownership.

**`Q-5` — THE REPAIR'S EDIT'S TRIGGERED CONSTRAINTS ARE ASKED BY NOTHING (§1 link 5).** `evaluate` reads
`attempt.record.triggered` (`:573`–`:574`), so a pair the repair's edit triggered and the original write did not is in **no** pass's
set. **Priced, two ways and both refused here**: **merging pair ids into `pending`** would make the member carry ids the pass never
evaluates (§3.3 forbids it, and `FTS-11` measures why); **widening the pass's set to the repair's returned set** would move `CX-12`'s
fixed-set rule and `attempt-lifecycle.md §2.4` item 5 (iv) — **a spec act, not a patch.** **So a repair that moves a value into a
pair's address leaves that pair unasked, and `D-50`'s responsibility rule is what covers the caller today** (*"If a constraint needs
to look for the data at a given location, it can read()"*). **Filed, not fixed.**

**`Q-6` — `D-103`'S UNSUPPORTED ROUTE, AND THE ONE HAZARD THIS FIX MUST GUARD IN IT.** A repair that names no commit makes a
three-position write, reaches `constraintWrite`, opens a **second attempt**, **and its listeners are delivered by that nested
attempt's own arm today** (§1's last paragraph). **Two consequences the fix owns and neither promises:** **the guard of §3.4a is what
keeps the nested act's handles out of the enclosing member** (without it they would be delivered **twice**), **and under (b)'s
reading that nested attempt would also read the enclosing window's row and deliver the outer commit's listeners early** — one more
reason (b) is refused. **Nothing is promised for the route** (`D-103` item 1), **no cell may assert its counts** (`RLD-I5` asserts the
enclosing commit's own two counts and nothing about the nested attempt's), **and whether it should be REFUSED rather than unsupported
is `D-103`'s own open item — not this fix's.**

**`Q-7` — `D-104` ITEM 2'S `discarded` SENTENCE, WHICH THE BYTES CANNOT HONOUR AS PRINTED.** The ruling reads: *"the witness
(`discarded`) reads them as it reads any other discarded raise"* (`strata/decisions.md:5317`–`:5319`). **At the bytes the witness's
element is `{opId, addresses}` — a discarded reversal request** (`index.mjs:606`–`:629`; `D-49`; `D-75`) — **and a listener handle has
no member in that shape into which it could be written**, so the sentence **cannot** be satisfied without minting a member on a
record, which `D-104` item 4 forbids. **Priced, three ways**: **(i) read the sentence as the FAILING ARM's law and not as a member's
promise** — the delivery is empty and the caller's observables are the count and `pending`, which is this file's reading and needs the
architect's word because it narrows a printed clause; **(ii) mint a handle witness** — refused (`D-104` item 4, `A117` (D6), and a
record's declared shape would move); **(iii) put the discarded handles in the existing witness as an entry whose `opId` is the
repair's op** — refused: the member means *"the id the reversal named and the addresses the refused act MOVED"* (`guide §6.4`'s
neighbour clause, `DEF-AM`), and filling it with a listener's identity makes a witness name something that did not move. **Nothing in
this fix depends on the answer**; `RLD-3`'s witness half is held on it.

---

## ENVELOPE — the declaration this pass delivers

**THE CYCLE THIS PASS DROVE.** `role_l1_test_writer` owed nothing — **this is a declaration pass and it writes no cell** (`D-104`
item 4's *"no status, no member, no arity, no type may move"* is a declaration's bound too) — and **`role_l1_examiner` examined the
declaration at the bytes and returned `PASS WITH CORRECTIONS`**; **the ten corrections are printed at §0.1 and every one was
re-verified before it was taken.**

**THE BEHAVIOUR DECLARED.** A repair's write's triggered **listeners are delivered in the commit's ONE delivery, after the pass,
with the other listeners** (`D-104` item 2) — one `deliver` call (`delivery.mjs:828`), one recipient snapshot, **one invocation per
distinct handle** (`surface.md §2.4` rule 3, implemented at `delivery.mjs:154`–`:166`), **one address for the whole set** — the leg's
op address, which is the **repair's** where a repair landed — **and no per-handle attribution asserted** (`DD-22`, `DD-37`, `AB-3`).
**A PAIR IS NEVER IN THE SET** (`D-69`) **and its handle is not merged into `pending` either** (§3.3). **The delete-shaped commit is
the same commit** (`Q-2`). **And the promise is exactly the SUPPORTED route's** (`D-46`, `D-103`): a repair that names no commit is
delivered by its nested attempt today and the enclosing commit never adds a second invocation of the same handle (§3.4a).

**THE MECHANISM CHOSEN — (a) MERGE AT THE REPAIR ARM, AND WHAT IT NEEDS.** The repair arm appends the repair's write's returned
**listener** elements to the commit's `pending` — `attempt.record` — at the seat **after the credit and before the re-run and before
`releasePending`** (`kernel-attempt.mjs:899`–`:921`, `:929`), **de-duplicated by `handle` against `pending`'s current handles**,
**predicated on the handle not being a carried pair's** (`kernel.handles`). **The carrier it needs, measured**: the kernel imports no
entry and is imported by none, and the repair's return carries `op` only (`guide §7.6:1059`) — **so the entry hands it over one
`Symbol.for` channel**, `REPAIR_LEG`, installed beside `COMMIT_SCOPE`/`RESTART_DRAIN`/`EXTERNAL_CALL`/`BUMP_MARK`
(`state.mjs:659`–`:731`), opened and closed by the existing invocation bracket and appended to by the `write` member's leg branch
beside `index.mjs:452`. **TWO GUARDS MAKE IT SOUND**: the read is taken **only where the bracket stood** (`repairInCommit`'s own
knowledge, §3.2) **and the list is dropped where `kernel.attempts` moved across the invocation** (§3.4a — a nested commit opened
inside the repair must not ride its handles into the enclosing member, or they would be invoked twice). **The discard is widened to the
same sets** (§5); **`delivery.mjs` takes no byte**.

**THE ALTERNATIVE PRICED — (b) READ THE LEG AT THE TERMINAL ARM, REFUSED.** Its three advantages (§3.6 i–iii) and its four costs: **its
scope cannot be narrowed** — the entry cannot separate a repair's write from a constraint body's, so a patch ordered for repairs would
**double-deliver** an un-ordered class (the constraint body's own write already reaches a nested attempt, §1); **the `state.leg` single
slot loses a first repair's set on the two-repair commit `P-SM-5` drives**, and the cure is (a)'s carrier in an entry-side dress with a
nested-window hazard of its own; **the failing arm needs a new gate** (`SETTLED_ON_THE_PASSING_ARM`, available and clean); **and the
registration instant is safe for both**, so it is not a discriminator. **⟶ CORRECTED `2026-11-06` BY `D-125` ITEM `1`: *"THE
REGISTRATION INSTANT IS SAFE FOR BOTH"* IS FALSE AND THIS PHRASE IS WITHDRAWN FROM (b)'s PRICING.** The registration instant
**delivers** — at four instants, in `D-117`'s order instant for instant, after the save and before the answer, with one order and two
sets (`storeCreate` and a boot: `adopted ∩ resolving`; `addConstraint` and a re-arm: the repair's write's `triggered` set) and with
nothing on a refusing arm — **so it IS a discriminator, and (b)'s refusal stands on its other three costs and on §3.1's trade about
scope alone.**

**THE FAILING ARM.** **Empty, unchanged** (`surface.md §2.7` item 6): the discard's filter (`kernel-terminal.mjs:95`–`:96`) widens to
the union of the failed write's returned set and this attempt's repairs' sets, one removal by the set each entry came back in; **a
repair the store refused merges nothing** (arm (d), `KC-4`); **a re-run that refuses empties the member before the arm reads it**;
**and `D-104` item 2's `discarded` sentence cannot be honoured at the bytes** — the witness's element is a discarded reversal request,
`{opId, addresses}`, and no member of that shape can carry a listener handle — **so that half is put up as `Q-7` and `RLD-3`'s witness
assertion is held on it** (`D-49`; `D-75`).

**THE ORDERING.** `A112` unmoved and unmoved **by construction**: the merged set rides the **same call, at the same instant** — the
terminal arm, after `close(…,'passed')`, `bumpMark` and the `file`-tier save — and **the pass's own set never reads `pending`**
(`kernel-attempt.mjs:573`–`:574`), so no pair is asked or skipped differently. **The repair's own judgement under `D-46`/`D-103`**:
on the supported route the repair's write has no pass of its own, and its listeners are discarded iff the store refused the verb or the
re-run refused the landing.

**THE CELLS — NAMED; THE RED SET READ, AND EMPTY OF ASSERTIONS.** `tests/e2e/repair-listener-delivery.test.mjs`: **`RLD-1`** (the
delivery), **`RLD-2`** (the doubly-fired handle invoked once), **`RLD-3`** (the failing arm invokes nothing; **its witness half held on
`Q-7`**), **`RLD-4`** (the seat), **`RLD-5`** (`pending`'s re-derivation; `triggered` unmoved), **`RLD-6`** (the registration instant
unmoved), **`RLD-7`** (the delete-shaped commit, **held on `Q-2`**), **`RLD-8`** (the two-repair commit). **⟶ CORRECTED
`2026-11-06` BY `D-125` ITEM `1`: `RLD-6` IS NOT *"THE REGISTRATION INSTANT UNMOVED"* — THE REGISTRATION INSTANT DELIVERS, AND THE
CELL'S SUBJECT BECOMES THAT DELIVERY.** It is one of the two pre-existing cells that TURN for the delivery instant
(`docs/L1/creation-sweep.md` `§6` item `1`'s third reason names `RLD-6` beside `screg_blind_08`), **so its landed form asserts the
delivery at `addConstraint` and at a re-arm — the repair's write's `triggered` set, after the save and before the answer, nothing on a
refusing arm — and not a zero.** *(`D-125` items `1`, `2` (i); `D-94` item `3` stops.)* `tests/integration/
js-constraints/repair-listener-delivery.test.mjs`: **`RLD-I1`** (the predicate, on the multi-repair shape that measures it),
**`RLD-I2`** (the discard's scope), **`RLD-I3`** (the seat before the re-run), **`RLD-I4`** (the credit gate), **`RLD-I5`** (the
nested-attempt guard — one count, not two). **NO COMMITTED CELL'S ASSERTION REDS** — the merge is empty on every committed repair
fixture, and **the reason printed in §7.3 is the measured one** (no listener is bound where a committed repair writes; **not** the
subset sentence the first draft offered, which two sibling-address fixtures falsify); **two CLAIMS are re-derived in the same act**
(`constraint-kernel-layers.test.mjs:344`–`:351`, `constraint-kernel-negatives.test.mjs:223`–`:224`); **one `observed` cell is promoted
with its figure unmoved** (`FTS-11.6`); **and `G3-22`'s two zeros are re-asserted by `RLD-6`** because they are the mechanism's
structural constraint. **⟶ CORRECTED `2026-11-06` BY `D-125` ITEM `1`: THE LAST CLAUSE IS WITHDRAWN — `RLD-6` RE-ASSERTS NO ZERO,
because the registration instant delivers and its `listenerDelta` is `0` only where the repair's write's `triggered` set names no
adopted handle.** **The instrument limit is printed at §0: this red set is a READING, not a run.**

**THE WRITE SET.** `state.mjs` (the carrier) · `index.mjs` (the append and one dated clause) · `kernel-attempt.mjs` (the two guards, the
merge and one dated clause) · `kernel-commit.mjs` (one attempt member at two mints) · `kernel-terminal.mjs` (the filter) ·
`index.d.ts` (one dated clause, **no type**) · `docs/guides/package-use.md` §6.4 and §7.6 (one dated clause each, the second owing
`RepairContext.pending`'s widened meaning) · the two battery files and the two claim re-derivations · the release files. **No module, no
endpoint, no status, no member, no arity, no type, no refusal message and no version byte moves; `19` modules / `61` endpoints and the
harness cap stand.**

**THE RELEASE CLASS.** **`PATCH`, marked and not numbered**; `D-100`'s `1.7.0` and `D-102`'s `1.8.0` are not reopened; the version line,
the change-list row, the `pending` sentence's re-derivation, the failing arm's statement and the shipped-half statement (§9's five)
are the release pass's.

**THE OPEN QUESTIONS SENT UP.** **`Q-1`** the constraint body's write is delivered by a **nested** attempt today, inside the enclosing
pass — confirm or move, priced both ways. **`Q-2`** the delete-shaped commit is in the fix by construction — confirm or narrow
(`RLD-7` held). **`Q-3`** the delivery's one argument is the leg's op address — pre-existing, not moved. **`Q-4`** the same slot feeds
the `file`-tier save's gate and its op id — **a reading, not a measurement, a different defect, its own row owed**. **`Q-5`** a repair's
edit's triggered **constraints** are asked by nothing — two cures priced and refused. **`Q-6`** `D-103`'s unsupported route delivers
through a nested attempt today, is promised nothing, and is what §3.4a's guard exists for. **`Q-7`** `D-104` item 2's `discarded`
sentence cannot be honoured at the bytes — narrowed three ways, `RLD-3`'s witness half held.

**THE PATH THIS PASS WROTE.** `docs/L1/repair-listener-delivery.md` — **one path, and nothing else in the tree was touched, staged or
committed. `strata/decisions.md` and `strata/research.md` §12 were read and not edited; every code, test, guide and declaration path
named above was read and not edited; no code byte, no test byte, no doc byte outside this file and no `strata/` byte moved.**
