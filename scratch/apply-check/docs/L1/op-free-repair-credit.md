# An op-free repair is CREDITED — **DECLARED**: the credit, the re-run's carrier, the joined triggers, the independent rollback, the sentence, the types, the cells, the write set, the release class

**§0 · WHAT THIS FILE IS, WHAT MAY BE WRITTEN, AND WHAT WAS READ AT ITS BYTES.**

**STATUS: `DECLARATION` — the L1 architect's declaration for what `strata/decisions.md` · `D-105` orders. Dated 2026-11-01.
Branch `main`, HEAD `7a31053` (the `1.8.1` fix patch), with the uncommitted `strata/decisions.md` · `D-105` (`:5340`–`:5379`)
read as the warrant.** **CLASS: `DECLARATION, NO CODE, NO TEST, NO DOC, NO `strata/` BYTE`.** **This pass writes ONE path —
`docs/L1/op-free-repair-credit.md`. Every other path named below was READ and is unchanged by this pass; nothing was
staged, committed, run or edited.**

**THE WARRANT, QUOTED FIRST SO NO CLAUSE BELOW IS READ AS MORE THAN IT IS.** `D-105`, the architect, verbatim:

> You don't need the ops, the rollback point is determined independently. Track the failing constraints for the duplicate
> repairs. The only supported route for repairs is with the commit id so that its triggers can be joined to the commit and
> the constraint battery run again.

**`D-105` settles four things and hands L1 nine: the returned `op` is not the credit's carrier (`1`), the rollback is
independent of it (`2`), the repair's route is the commit and through it the repair's TRIGGERS join the constraint battery
(`3`), and the failed arm `{ok: false, message}` still fails, no status is minted, and one-invocation-per-distinct-handle
stands (`4`). Its own `WHAT IT DOES NOT SETTLE` list is this file's agenda: the credited arm's shape, the residual `KC-4`
arm, the floor call's candidates, the re-run's value carrier, the types, the cells, the write set, the sentence's fate and
the release class.** **So this file decides those and decides nothing `D-105` settled.**

**THE ONE INSTRUMENT LIMIT, STATED AT THE HEAD BECAUSE IT GOVERNS §7.** **This pass has no shell.** Every figure below is a
reading of a file's own bytes on this date; **the red set of §7 is therefore a READING of each fixture's own writes and
assertions and NOT a run.** A landing pass must re-measure it, and §7.4 says which cell it expects where.

**§0.1 · THE EXAMINATION THIS DECLARATION PASSED THROUGH — THE FIFTEEN FINDINGS AND WHAT EACH DID TO THE FILE.** The
declaration was examined by `role_l1_examiner` at the bytes on this date; **the verdict was `PASS WITH CORRECTIONS`**, and
every finding was re-verified by this pass before it was taken. **They are named so the file's own history is legible rather
than silently repaired:** **(1)** a claimed **RED→GREEN is withdrawn** — the `PAR-C-8` `observable` cell
(`blind-constraints-unit.test.mjs:183`–`:200`) has answered `KC-4` since the ordinal ground landed on 2026-10-26, so what
`D-105` moves is its GROUND and not its verdict (§7.4's `★`); **(2) ★ the substantive one — the `D-103` RESERVATION**:
`§1.1`'s first draft disclaimed the unnamed route's regression as *"not a refusal"* while the caller-visible consequence IS
the route's outcome, so the disclaimer is replaced by a two-part statement and `Q-2` is **upgraded from a cell permission to
a behaviour question**; **(3)** `D-88` (2)'s row is **no longer claimed closed** — its address half **survives on `(d2)`'s
nested-attempt arm**, where the repair's edit landed at a beside address (§5.1, `Q-4`); **(4)** `repairLegs`' absent arms are
**five and not four** — the THROWING arm (`:191`–`:193`) and the `Array.isArray` arm (`:190`) are named, and `ORC-5`/`ORC-I5`
drive them (§1.1 step 5, §7.1, §7.2); **(5)** *"nothing is appended"* is **false of the log** and is corrected to the three
members it meant (§1.1 step 2, §4 `RB-5`); **(6)** the red set is **TWELVE cells, not eleven** (`4 + 7 + 1`), and §8.1's row
had mis-filed the Class-A `P-NEG-18` cell as a Class-B one — both corrected; **(7)** the `1.8.1` set is **THIRTEEN cells, not
twelve**, and **`RLD-6` had no bullet** — added, and it is the cell `Q-1` is about; **(8)** the blanket *"every repair in the
set takes four positions or the failed arm"* is **false of `RLD-I5`** (three positions) and is restated at its true width;
**(9)** `{ok: false}` **with no message** — credited by §1.1 and refused by the alias — is **named on both sides** and inside
the printed gap (§6.1); **(10)** `op: null`'s ground was **withdrawn by the file's own `Q-6`** (a deletion-repair is never
credited) and is re-grounded on the member's informational status; **(11)** the pair-join's de-duplication was **incomplete
against the SAME handle twice inside one leg's `triggered`** (`DD-42` clause 3's lawful duplicate) — a third rule added
(§3.3 `JN-4`), with `ORC-I4` extended; **(12)** `ORC-5` cited a **nonexistent "guard (iii)"** and did not exercise guard (i) —
corrected, and the `EXTERNAL_CALL`-read-away drive added; **(13)** a **verbatim mark was put on `A112` for a sentence it does
not print** (*"`triggered` then stands as the store's own returned set"*) — the printed sentence is **`A113` (D1)'s** *"on a
failing arm `triggered` stands verbatim"*, and the other is **marked as the tree's paraphrase** (§3.2, ENVELOPE); **(14)**
`opSpelling` **is private and imported by no file**, so **one** import is to be removed and not two (§5.2); **(15)** the
*"nothing else reds"* claim was **wider than the read set printed** — the claim is narrowed to that set, and the
examination's own reading of the fixtures beyond it (which found no red) is recorded as a READING with the landing pass's
sweep still owed (§7.4's `⟶`).

**§0.2 · THREE THINGS THE BRIEF'S OWN PREMISE GOT WRONG, CORRECTED HERE RATHER THAN ABSORBED.**

**(1) ★ THE `1.8.1` LEG DOES *NOT* ALREADY HAND THE KERNEL THE REPAIR'S WRITE'S RECORD.** The brief reads *"its `REPAIR_LEG`
carrier already hands the kernel the repair's write's record: the op, the value, the triggered set"*. **At the bytes the
channel hands the TRIGGERED ELEMENTS AND NOTHING ELSE**: `state.mjs`'s `appendRepairLeg` (`:403`–`:420`) reads
`record.triggered` and mints one `{handle, address}` element per element (`:418`), and **`record.op` is never read —
`index.mjs:452`'s `state.leg = record` is the one place the op is stood, and the kernel cannot reach that slot**
(`kernel-surface.md §1` item 1: `kernel-attempt.mjs` *"imports no entry and is imported by none"*). **So the OP AND THE VALUE
ARE NOT ON THE CHANNEL TODAY, and §2 declares the widening that puts them there — the single largest move in this
declaration, and the one the brief assumed was already made.** **The correction is not cosmetic: without it `D-105`'s item
`2` has no carrier at all, and a repair's edit could be neither credited nor swept nor re-judged.**

**(2) THE REPAIR ARM'S LINE RANGE HAS MOVED.** The brief cites `kernel-attempt.mjs:800`–`:930`; **the repair arm stands at
`:834`–`:1029` in this tree (1,229 lines), with the return read at `:965`–`:980`, `landedOp`'s call at `:967`, the credit at
`:982`–`:987`, the `1.8.1` merge at `:1010`, `releasePending` at `:1027` and the re-run's landing read at `:561`.**

**(3) THE SENTENCE'S SITE.** `D-88` (2) and `docs/L1/open-items-2026-10-25.md §6` row `5` cite the template at
`kernel-attempt.mjs:883`; **the template stands at `:977` in this tree**, and the two `landedOpDefect` sentences at
`kernel-foundations.mjs:1139`–`:1150`.

**WHAT WAS READ, AT ITS OWN BYTES, THIS DATE** (each citation in this file points at one of these and no other):

| path | what was read |
|---|---|
| `strata/decisions.md` | **`D-105` (`:5340`–`:5379`)**; `D-104` (`:5300`–`:5336`); `D-103` (`:5266`–`:5296`); `D-102` (`:5243`–`:5262`); `D-101` (`:5194`–`:5240`); `D-91` (`:4655`–`…`, items `1`–`2`); `D-90` (`:4598`–`:4651`); `D-89` (`:4564`–`:4595`); `D-88` (`:4531`–`:4560`); **`D-69` (`:3848`–`:3867`)**; `D-67` (`:3795`–`:3813`); `D-66` (`:3756`–`:3791`); **`D-63` (`:3662`–`:3700`)**; `D-58` (`:3486`–`:3520`); **`D-56` (`:3420`–`:3455`)**; **`D-46` (`:3049`–`:3084`)**; `D-40` (`:…`) |
| `docs/L1/repair-listener-delivery.md` (780 lines) | §1's five links (`:71`–`:124`); **§3.2 the carrier (`:207`–`:241`)**; **§3.3 the predicate (`:242`–`:264`)**; **§3.4 the seat and the member's de-duplication (`:266`–`:286`)**; §3.4a the nested-attempt guard (`:288`–`:312`); §5 the failing arm (`:422`–`:463`); §6 the ordering (`:466`–`:486`); §7.3 the red set (`:523`–`:571`); **`Q-5` (`:668`–`:674`)** |
| `docs/L1/open-items-2026-10-25.md` | **§3 row `4` and its priced carriers (`:203`–`:231`)** — the per-invocation landed-op record this ruling supersedes; §6 row `5` (the `no op` sentence, `:376`–`:383`); §7 row `8` (the address geometry, `:401`) |
| `bindings/js/src/entry/kernel-attempt.mjs` (1,229 lines) | `EXTERNAL_CALL` `:106`; `repairInCommit` `:117`–`:124`; `constraintInCommit` `:142`–`:146`; **`REPAIR_LEG` `:160`**; **`repairLegs` `:183`–`:194`** (guard (i) `:184`, guard (ii) `:185`, the read `:186`–`:190`, the throwing arm `:191`–`:193`); `runToCompletion`'s landing read `:561`; **`evaluate`'s snapshot `:631`–`:632`**; `commitName` `:643`; **the context `:693`–`:699`**; the constraint outcome's three arms `:774`–`:785`; the repeat arms `:795`–`:832`; the `repair-run` entry `:839`–`:840`; **`repairContext` `:842`–`:868`**; the two `1.8.1` guards `:875`–`:876`; the invocation `:891`–`:892`; the throw arms `:893`–`:948`; **the return read `:953`–`:980`**, `landedOp`'s call `:967`, **the fall-through's sentence `:977`**; **the credit `:982`–`:987`**; **the merge seat `:988`–`:1010`**; `releasePending` `:1027`; the pass arm and **the checkpoint pin `:1034`–`:1051`**; `releasePending` `:1083`–`:1097`; **`mergeRepairListeners` `:1128`–`:1149`**; `carriedPairHandle` `:1153`–`:1159`; `pendingNames` `:1163`–`:1170` |
| `bindings/js/src/entry/kernel-foundations.mjs` (1,469 lines) | **`landedOp` `:1105`–`:1131`** (the membership ground `:1113`–`:1120`, the ordinal ground `:1121`–`:1129`); **`landedOpDefect` `:1139`–`:1150`**; `opSpelling` `:1152`–`:1165`; **`pairsTriggered` `:1272`–`:1288`**; `triggeredNames` `:1297`–`:1305`; `pairApplication`/`pairAppliesAt` `:1209`–`:1239` |
| `bindings/js/src/entry/kernel-terminal.mjs` (481 lines) | the `outcome` entry `:72`; **the discard `:95`–`:109`** (`repairTriggered`'s read `:104`–`:109`); the report's `ops` `:121`, `:150`; **`composeRollback` `:222`–`:262`** (`ops.length === 0` `:225`, the checkpoint's filter `:227`, the plan `:228`, **the store call `:236`**, the floor codes `:244`, the step `:248`–`:259`); **`floorCallPlan` `:301`–`:356`**; `addressBelow` `:361`–`:366` |
| `bindings/js/src/entry/kernel-commit.mjs` (370 lines) | `kernel.attempts` `:45`, `:281`; the attempt's mint `:69`, `:288`, **`ops: []` `:79`, `:309`, `repairTriggered: []` `:100`, `:320`**; the record `:120`–`:134`; **`store.write(address, tier, value, record)` at FOUR positions `:162`**; **`attempt.ops = [written.op]` `:168`**, `:354`; `record.op`/`triggered`/`pending` `:176`–`:178` |
| `bindings/js/src/entry/state.mjs` (1,252 lines) | **`REPAIR_LEG` `:372`** and its clause `:344`–`:371`; `REPAIR_LEGS_OPEN` `:382`; `REPAIR_LEGS_LAST` `:388`; **`appendRepairLeg` `:403`–`:420`**; the invocation bracket `:761`–`:795` (the list opened `:770`, pushed `:773`, popped `:780`–`:782`, the last set `:786`); **the channel `:834`–`:845`** |
| `bindings/js/index.mjs` (1,716 lines) | the three-position route `:396`–`:398`; the store verb `:413`; `watched` `:432`–`:443`; **the record `:444`–`:448`**; **`state.leg = record` `:452`**; **`appendRepairLeg(record)` `:463`**; the withheld-delivery clause `:468`–`:491`; `delete`'s arity `:564` (`delete(address, tier)`), the no-position clause `:586` |
| `bindings/js/index.d.ts` (1,543 lines) | `write` `:917`; **`ConstraintOutcome` `:1489`–`:1497`** (its docblock `:1472`–`:1488`); **`RepairOutcome` `:1499`–`:1519`** (the docblock `:1500`–`:1516`, the alias `:1517`–`:1519`); `RepairContext` `:1442`–`:1449`; `RegistrationRepairContext` `:1468`–`:1470`; `AttemptContext` `:1417`–`:1423`; `CommitCarrier` `:1541`–`:1543`; `delete` `:936` |
| `docs/guides/package-use.md` (2,324 lines) | **§7.6 `:1046`–`:1149`** — the `context.value` rule `:1048`–`:1063`, the repair-landing-elsewhere clause `:1052`–`:1054`, the three-arm constraint set `:1067`, **the two-arm repair set and the credit's ground `:1071`**, the record and the commit `:1073`, `D-103`'s route clause `:1075`–`:1079`, the four ways `:1081`–`:1086`, **the `1.8.1` clause `:1088`–`:1091`**, **the worked example `:1095`–`:1115`**, **its reading `:1117`**, **items (1)–(5) `:1121`–`:1132`** |
| `typecheck/consumer-fixture.ts` (594 lines) | §5.2's cells `:401`–`:453` — `credited` `:406`, `failed` `:407`, `endToEnd` `:415`–`:424`, **the seven `@ts-expect-error` cells `:430`–`:443`**, the credited arm's members `:448`–`:453` |
| `tests/` (the fixtures §7 names) | `tests/integration/js-constraints/constraint-kernel-repairop.test.mjs` `:195`–`:316`, **`:322`–`:373`, `:375`–`:409`, `:411`–`:455`**; `constraint-kernel-negatives.test.mjs` **`:646`–`:709`**, `:962`–`:1025`; `constraint-kernel-states.test.mjs` `:310`–`:347`, `:349`–`:384`, **`:1574`–`:1672`**; `repair-listener-delivery.test.mjs` `RLD-I1`–`RLD-I5` (`:82`–`:509`); `tests/e2e/blind-constraints-unit.test.mjs` **`:138`–`:161`, `:183`–`:200`**, `:237`–`:313`; `blind-constraints-v2.mjs`; **`repair-in-commit.test.mjs:86`–`:246`**; **`discard-witness.mjs:578`–`:696`**; `registration-write-route.test.mjs` `G3-21`/`G3-23`; `blind-registration-instant.test.mjs:622`–`:724`; `repair-listener-delivery.test.mjs` (`tests/e2e/`, `RLD-1`–`RLD-8`) |
| `docs/L1/module-map.md`, `docs/L1/modules.json` | the ownership rows this declaration's write set reads (`module-map.md:389`–`:390`, `:608`, `:1020`); **`module_count` `19` / `endpoint_count` `61`** (`modules.json:612`–`:622`) |

---

## §1 · THE CREDIT — the pair's mark is the credit, and the returned `op` is read by nothing

### 1.1 THE DECLARATION

**CT-1 · THE CREDIT IS THE FAILING PAIR'S MARK.** **The credit is `appendOwn(attempt.appliedRepairs, key)` — the pair's own
registry key, the identity `attempt.ran` and `appliedRepairs` both carry (`kernel-attempt.mjs:795`–`:832`) — and the returned
`op` is neither required nor read for it.** `D-105` item `1`, verbatim: *"The credit is the **FAILING PAIR's** mark
(`attempt.appliedRepairs`, keyed by the pair), and **the returned `op` is neither required nor read for it**."*

**CT-2 · THE PREDICATE CHAIN, IN ORDER, AND IT IS THE WHOLE OF THE RULE.** Five steps, each at a site that exists:

1. **THE BODY RETURNED** — a THROW is unchanged and is not this rule's: a store code on the throwable keeps the `KC-4`
   conversion and the store's own token in the message (`:893`–`:948`), and any other throwable crosses to the caller
   unconverted (`:947`–`:948`). **No byte of either arm moves.**
2. **THE DECLARED FAILED ARM IS READ FIRST** — the return's OWN `ok` is exactly `false` **and** its OWN `message` is a
   non-empty string (`ownMember`, `D-35`'s read half) → **the attempt fails `KC-4` carrying the CALLER'S WORDS**, and
   nothing is pinned, credited or merged, and **nothing is appended to `attempt.ops`, to `attempt.appliedRepairs` or to
   `record.pending`.** **This is `D-105` item `4`'s first clause and the precedence the tree already has** (`:965`–`:980`:
   `ok === false` reaches the failure arm before any op is looked for). **AND THE ONE ENTRY THAT STANDS IS APPENDED BEFORE
   THE INVOCATION AND NOT BY THIS ARM:** the `repair-run` entry is minted at `:839`–`:840` on every arm (`kernel-surface.md
   §2.5` item 1's *"the op it was INVOKED FOR"* row), this arm rewrites its `message` (`:978`), and the terminal act then
   appends the attempt's ONE `outcome` entry — **so "appends nothing" is true of the three members above and FALSE of the
   log, and the cells that read that entry (`ck_states:332`, `P-NEG-22:1019`) depend on it.**
3. **THE LEGS OF THIS INVOCATION ARE READ, ONCE** — the `1.8.1` channel, through the two guards `repairLegs` already
   carries (`:183`–`:194`), and **in the shape §2 declares** (one element per write, carrying that write's own journal `op`
   and its `triggered` elements).
4. **THE LANDING TEST** — the invocation landed at least one op (`legs` carries an element whose `op` is a journal op).
   **Where it did: THE PAIR IS CREDITED and the pins are taken** — `entry.opId` = the LAST leg's `opId`, every leg's op
   appended to `attempt.ops` (§4), `entry.message = the repair <id> landed <opId>`, the pair's key appended to
   `appliedRepairs`, then the merge seat (§3) and the re-run.
5. **THE RESIDUAL `KC-4` ARM** — **the invocation landed no op.** One predicate over `repairLegs`' **FIVE** absent
   arms (`:183`–`:194`, each read at its own line): **no invocation bracket** (`invocation.bracketed !== true`, `:184` —
   the `EXTERNAL_CALL` channel read away, so a bare read would answer a PREVIOUS invocation's legs); **a nested attempt
   opened across the invocation** (`kernel.attempts` moved, `:185`); **a store carrying no `REPAIR_LEG` channel**
   (`:186`–`:187`); **a channel that THREW** (`:191`–`:193`, `D-35`'s read half read for a hand-over); **or a bracketed
   invocation whose answer is not a non-empty array of elements carrying an `op`** (`:188`–`:190` — the `Array.isArray`
   arm, which conflates *"landed nothing"* with *"a non-array answer"* and owes both the same arm). **The attempt fails
   `KC-4` with the residual sentence (§5).**

**★ AND `repairLegs`' FIVE ARMS ARE AN INHERITED SHAPE, NOT THIS DECLARATION'S: they are the `1.8.1` channel's absence
handling verbatim, and this declaration only says that ALL FIVE now share one consequence. §7.1 `ORC-5` drives four of
them and §7.2 `ORC-I5` the fifth.**

**CT-3 · ★ A REPAIR THAT RETURNS `undefined` — OR ANY VALUE THAT IS NOT THE DECLARED ARMS — IS CREDITED.** `D-105` item
`1`, verbatim: *"A repair that does its write and returns `undefined` — the natural shape of `repair: () => { … }` — is NOT
refused"*, and *"a repair returning `undefined` … or any value that is not the declared arms — is CREDITED (its write
landed; its pair is marked applied; the re-run judges it)"*. **So all of these are the SAME credited arm**, differing in
nothing but the value their body happened to return: `undefined` / no `return`; `{ok: true}`; `{ok: true, op: <the op it
landed>}`; `{ok: true, op: <an op it did not land>}`; `{ok: true, op: undefined}`; `{ok: true, message: '…'}`; `true`;
`false`; `7`; `'done'`; `{ok: 'yes'}`; `{ok: false}` **with no message**. **`ST-F2`'s measured defect — a repair answering
`undefined` refused `ConstraintPassRefused` — is thereby CLOSED BY CARRIER and not by text** (`index.d.ts:1501`–`:1503`'s
*"`undefined` IS NOT ONE OF THE TWO"* is the sentence §6 re-derives).

**CT-4 · THE CREDITED ARM'S FINAL SHAPE — CHOSEN: `{ok: true}` WITH `op` OPTIONAL AND INFORMATIONAL, AND NO RETURN
REQUIRED AT ALL.** **The three candidates `D-105` lists, priced:**

| candidate | what it declares | verdict |
|---|---|---|
| **(i) `{ok: true}` with `op` optional/informational** | the return carries an opinion and MAY carry the op; the opinion is the failed arm's alone to spend | **TAKEN**, and it is the shape §6's alias states |
| **(ii) `{ok: true, op?}` as the WHOLE of the credited arm — i.e. a return is still required** | a body must return an object | **REFUSED**: it refuses `repair: () => { … }`, which is the exact shape `D-105` says is *"NOT refused"*, and it would keep `ST-F2` alive for the most natural spelling of a repair anyone writes |
| **(iii) no return required at all** | `undefined`/`void` is lawful | **TAKEN, and it is not a third arm but (i)'s boundary**: `undefined` is what (i) answers when the body has no opinion, which is why §6's alias takes `void` into the union |

**SO THE CREDITED ARM IS: `undefined` · `{ok: true}` · `{ok: true, op}` — three spellings of one arm, and the `op` member
is INFORMATIONAL: the credit does not read it, the pins do not read it, the re-run does not read it, the floor call does
not read it, and no sentence names it.** **Its price, stated:** a repair's `op` member stops being a hand-over and becomes a
**comment**, so a consumer who relied on "return the op or your repair is refused" now has no reason to return one — and
no reason NOT to; the type keeps the member (a) because the store's own op is what the member always meant and (b) so that
the guide's worked example (`§7.6:1107`) type-checks exactly as written.

**CT-5 · THE `KC-4` ARM'S RESIDUAL — WHAT STILL FAILS, AND BY WHICH PREDICATE.** **Two DIFFERENT predicates answer the ONE
token, and that is not a new token** (`D-105` item `4`: *"no status is minted — the `KC-4` token's subject is re-derived by
L1"`):

| arm | predicate | the sentence | the store |
|---|---|---|---|
| **`(d1)` THE DECLARED FAILED ARM** | own `ok === false` AND own non-empty-string `message` | **the caller's words, VERBATIM** | whatever the arm left: the pins were never taken (§4) |
| **`(d2)` THE INVOCATION LANDED NOTHING** | the legs' answer carries no journal `op` (§1.1 step 5's **five** arms) | **the residual template (§5), byte-for-byte** | nothing was landed by this invocation, so nothing of it stands |

**★ AND ONE THING THE RESIDUAL *DOES*, WHICH THIS DECLARATION MUST NOT DISCLAIM: ON `D-103`'s UNNAMED ROUTE IT IS THE
CALLER-VISIBLE OUTCOME, AND THAT IS THE QUESTION `D-103` RESERVED.** **`D-103`'s own `WHAT IT DOES NOT SETTLE` reserves
*"whether the unnamed route should be REFUSED — a behaviour byte, needing its own ruling and its own version"*, and its
item `3` records that *"the code's fallback is unchanged"* and that *"an unsupported use is NOT a refusal"*.** **This
declaration mints no token for the route, refuses no CALL — the unnamed-route repair's own write still lands and its own
verb still answers its record — and yet the caller holding that write now meets a `ConstraintPassRefused` where it met a
receipt before, because the ENCLOSING attempt cannot track an op landed in another commit (`D-46`).** **Two things are
therefore true and both are printed rather than one:** **(a) it is not a refusal OF THE ROUTE** — the route's mechanism is
byte-unmoved (`D-103` item `2`: *"the mechanism's bytes are unmoved here and by that ruling"*) and nothing in this
declaration orders a code byte that names it; **(b) it IS the route's observable outcome, and it changes.** **So the
consequence is PUT UP as a behaviour question (`Q-2`) and NOT absorbed as a cell permission:** the architect's word is
needed on whether an unsupported route's repair may go from passing to failing, and `D-103`'s reservation is the reason the
question is his and not this file's.** **The alternative is priced at `Q-2` and it is one of two: keep the unnamed route
passing by reading the RETURN on that arm alone (`D-105` item `1` forbids it by name), or pin the nested commit's ops into
the enclosing attempt (which crosses `D-46`'s tracking rule and re-opens the class the `1.8.1` guard closed).**

### 1.2 WHAT IS NOT READ, SAID AS A LIST SO NO LATER PASS READS IT

**Nothing below is read by this rule, and each is named because a reader will expect it to be:** `result.op` ·
`result.op.opId` · `result.op.seq` · `landedOp`'s two grounds (`kernel-foundations.mjs:1113`–`:1129`) · `opSpelling`
(`:1152`–`:1165`) · `landedOpDefect` (`:1139`–`:1150`) · the membership ground's scan of `attempt.ops`
(`:1118`–`:1120`). **`attempt.ops`' own membership test survives as the APPEND'S DE-DUPLICATION (§4 `RB-4`) and not as a
credit test** — the one place a returned op was ever compared against the attempt is gone, and the comparison that remains
is between two ops the store itself landed.

---

## §2 · THE RE-RUN'S CARRIER — the `1.8.1` leg, WIDENED to carry the write's own op

### 2.1 THE CORRECTION THAT MAKES THIS SECTION NECESSARY

**The `REPAIR_LEG` channel's subject is ONE FACT: the legs of the invocation that closed last** (`state.mjs:344`–`:372`;
read by `kernel-attempt.mjs:160`, `:183`–`:194`). **Today that fact is the returned ELEMENT LIST only** — `appendRepairLeg`
(`state.mjs:403`–`:420`) takes `record.triggered`, mints a fresh `{handle, address}` per element (`:410`–`:419`), and never
touches `record.op`. **So `D-105`'s item `2` has no instrument at the bytes as they stand: the op the repair's write
landed is in `state.leg` (`index.mjs:452`), a slot the kernel cannot reach.**

### 2.2 THE WIDENING — ONE ELEMENT PER WRITE, AND NOTHING ELSE CROSSES

**`REPAIR_LEG`'s element becomes `{op, triggered}`: ONE element per `write` the invocation made, carrying THAT WRITE'S OWN
JOURNAL OP and its returned elements.** Three consequences, each at a site:

- **The mint is the same seat and moves no caller.** `appendRepairLeg(record)` already receives the WHOLE record
  (`index.mjs:463`), whose `op` is `decodeJournalOp(answer.op)` (`:445`) — a journal op carrying `opId`, `kind`, `address`,
  `tier`, `before`, `after`, `seq`, `compacted` (`frame.mjs:421`–`:431`) — and whose `triggered` is the crossed element
  list (`:447`). **So `js-surface` (`bindings/js/index.mjs`) takes NO BYTE**, and the widening is one function in
  `state.mjs` plus its consumer in `kernel-attempt.mjs`.
- **The element is minted FRESH and the segments are COPIED**, exactly as `:410`–`:419` already does for the elements: the
  record stands on a record the repair body itself was handed back, so the commit must not alias it (`crossing.md §1.1`'s
  copy discipline). **The op is copied at its own members** — `opId`, `kind`, `address`'s segment list, `tier`, `before`,
  `after`, `seq`, `compacted` — so a body that mutates the op it was handed can move nothing the kernel reads.
- **The bracket, the stack, the clear and the two guards are UNMOVED** (`state.mjs:761`–`:795`, `:834`–`:845`;
  `kernel-attempt.mjs:183`–`:194`). **The subject is still "the invocation that closed last", the read is still taken
  synchronously after the invocation returned, and the answer is still cleared in the same read.**

**AND THE `1.8.1` MERGE KEEPS ITS OWN SHAPE:** `mergeRepairListeners` (`:1128`–`:1149`) iterates the legs' elements;
**with the widening it iterates the legs and then each leg's `triggered` list**, and its predicate (`carriedPairHandle`),
its member de-duplication (`pendingNames`) and its `repairTriggered` record (`:1142`) move no byte.

### 2.3 WHAT THE ATTEMPT PINS — AND THE OP IS THE LEG'S

**PN-1 · THE RE-RUN'S LANDING IS `attempt.ops`' TAIL, AND THAT IS THE WHOLE OF THE VALUE'S CARRIER.** `runToCompletion`
reads `const landing = attempt.ops[attempt.ops.length - 1]` (`:561`) and hands it to `evaluate`, which builds the context
at `:693`–`:699`:

> `op` = `landing` · `tier` = `landing.tier` · **`value` = `landing.after === undefined ? undefined : landing.after.value`**

**So `D-105`'s *"the re-run's own value carrier"* needs NO MEMBER AND NO SECOND CHANNEL: it is the leg's `op.after.value`,
reached because the leg's op is the attempt's landing.** **This is the same expression the guide teaches at `§7.6:1052`–
`:1054`** (*"The repair's op is the attempt's last op, so the re-run hands your body the value that op landed"*) — **and the
only thing that moves is WHICH op the attempt's last op is: the leg's, never the return's.**

**PN-2 · THE PINS, NAMED ONE BY ONE.** On the credited arm:

| pin | what it takes | why |
|---|---|---|
| **`entry.opId`** | **the LAST leg's `opId`** | the `repair-run` entry's declared member (*"the op the repair produced where it produced one, ELSE THE OP IT WAS INVOKED FOR"*, `kernel-surface.md §2.5` item 1) — so the entry names the landing, not the invocation |
| **`entry.message`** | `` `the repair ${pair.id} landed ${produced.opId}` `` (`:985`) | the existing sentence, unmoved, with the leg's identity |
| **`attempt.ops`** | **EVERY leg's op, in leg order**, appended after the commit's own op (§4) | the rollback's candidates and the report (§4) |
| **`attempt.checkpoint`** | **UNMOVED — the pass pins it** (`:1050`, `sameAddress(landing.address, attempt.address)`) | `D-63`'s restore mark is the pass's, not the credit's: a passing sweep bumps it, a failing one leaves it |
| **`attempt.appliedRepairs`** | the pair's key (§1) | the credit |
| **`attempt.repairTriggered`** | the legs' handles, at the merge seat (`:1142`) | the `1.8.1` discard's own set, unmoved |
| **`attempt.repairPaired`** | the legs' PAIR handles, at the merge seat (§3.3) | the joined pairs |

**PN-3 · WHAT THE RETURN NO LONGER DOES.** The returned `op` is read at NO pin: **it cannot set `entry.opId`, cannot join
`attempt.ops`, cannot become the landing, cannot move the checkpoint and cannot be named in a sentence.** **The `ST-F2` limb
this closes, verbatim from `docs/L1/open-items-2026-10-25.md §3` row `4`:** *"*`op` is read off the repair's return and off
the attempt's own record and off nothing else"* — and a fix that makes *"not the one it landed"* observable **"needs a
declared per-invocation LANDED-OP RECORD the kernel keeps between the repair's entry and its return (a carrier — a new
member or a new journal-derived read), which re-opens `A110`'s one-carrier rule"** (`:222`–`:223`). **★ THAT PER-INVOCATION
RECORD NOW EXISTS AND IS THE `1.8.1` LEG: `D-105` supersedes the need for the priced carrier, `A110` is not re-opened
(the channel is the existing `Symbol.for` device, `A117` (D6): no member is added to any record and none to the product),
and the comparison the clause wanted is not needed because there IS no comparison — the leg's op is the op.**

**PN-4 · TWO WRITES IN ONE INVOCATION, AND THE CHOICE.** A repair that writes twice appends TWO legs. **DECLARED: both ops
join `attempt.ops` in leg order, and the LAST is the attempt's landing and the re-run's `op`.** Priced: the alternative —
the FIRST leg only — **REFUSED**, because the first landing is not the state the repair left and the re-run would judge a
value the repair had already replaced; and pinning none but the last **REFUSED**, because the floor call's candidates are
per distinct address (`kernel-terminal.mjs:301`–`:356`) and a second write at a second address would stand outside every
call's scope, which is the residual `D-39`/`D-40` closed. **The cost, printed:** `report.ops` and `attempt.ops` grow by
the repair's WRITE COUNT and not by its repair count, so any cell asserting `1 + repairs` is green only on fixtures whose
repairs write once — **`RLD-8`'s `1 + repairs` (`tests/e2e/repair-listener-delivery.test.mjs:784`) is such a fixture and
stays green; `RLD-5`'s two-write repair (`:506`–`:510`) gains an op it does not assert, and the landing pass must
re-measure it (§7.5).**

---

## §3 · THE TRIGGERS JOINED — the declaration's `Q-5`, now ruled

### 3.1 THE RULING THIS SECTION IMPLEMENTS

`D-105` item `3`, verbatim: *"**The only supported route is with the commit id so that its triggers can be joined to the
commit and the constraint battery run again over them**: the PAIRS the repair's edit reaches join the commit's evaluated
set (the listener half is the `1.8.1` delivery's — `D-104`), so **the pairs a repair's edit fires are asked by the commit's
next battery** and not by nothing (the declaration's `Q-5`)."*

**THE GAP IT CLOSES, AT ITS BYTES.** `evaluate` materialises its snapshot from `attempt.record.triggered` ALONE (`:631`–
`:632` → `pairsTriggered`, `kernel-foundations.mjs:1272`–`:1288`), and `record.triggered` is the COMMIT's own write's
returned set, seeded once (`kernel-commit.mjs:177`) and never widened. **So a pair the repair's edit fires that the
commit's write did not is in NO pass's set** — `docs/L1/repair-listener-delivery.md` `Q-5` (`:668`–`:674`), filed and not
fixed, and `D-50`'s `read()` rule was the caller's whole cover.

### 3.2 THE SPLIT AT THE MERGE SEAT — ONE READ, TWO DESTINATIONS

**At the merge seat (`:988`–`:1010`: after the credit and the pins, BEFORE the re-run, BEFORE `releasePending`), the legs
are split by `D-69`'s ONE membership test — `carriedPairHandle` (`:1153`–`:1159`, the equality `pairsTriggered` reads in
the other direction):**

| the element's handle | where it goes | why |
|---|---|---|
| **a LISTENER's** (a handle `kernel.handles` does not name) | **`attempt.record.pending`**, by the `1.8.1` merge (`:1143`–`:1147`) — predicated, de-duplicated by `handle` against the member's current handles, and delivered in the commit's ONE delivery after the pass | `D-104` item `2`: a listener is DELIVERED, never asked |
| **a CARRIED PAIR's `id`** | **`attempt.repairPaired`** — the run's own joined-pair list — **and NEVER `pending`** | `D-69`: *"an element whose handle is a constraint's `id` is asked; a listener's is delivered"*. **`1.8.1` §3.3's ban stands byte-for-byte: a pair's id is merged into no member the caller loops over** |

**AND THE RECORD'S `triggered` IS UNMOVED.** The joined pairs join the PASS's set and never `record.triggered`: `triggered`
is **the store's own returned set for the commit's write, VERBATIM** (`kernel-commit.mjs:176`–`:178`, whose own clause reads
it off `written.triggered`), **and a package that wrote a second act's handles into it would be forging a store result.**
**THE ATTRIBUTION IS STATED CAREFULLY, BECAUSE TWO OF THE THREE SENTENCES IN CIRCULATION ARE NOT A RULING'S WORDS:** the
sentence *"on a failing arm `triggered` stands verbatim"* **IS** printed, at **`A113` (D1)**
(`archive/pre-strata-docs-2026-10-24/docs/decisions.md:79`); **`A112`'s own row (`:80`) is about `pending`** — *"`pending` IS
THE WHOLE RETURNED SET … and checks each off as it passes"*, *"because NO listener runs until the constraints pass, EVERY
listener is `pending` on EVERY write"* — **and it prints nothing about `triggered`**; and *"`triggered` then stands as the
store's own returned set"* is **the TREE's paraphrase**, carried in this corpus's own declaration
(`docs/L1/repair-listener-delivery.md` §2 B-6) and in the kernel's comments, **and it is a paraphrase and is marked as one
here rather than given a ruling's verbatim mark.** **The asymmetry between `triggered` and the evaluated set is declared,
not repaired** (`docs/L1/repair-listener-delivery.md` §2 B-6, `:176`–`:181`, and its own §4's refusal to forge a store
result).

### 3.3 THE NEXT PASS'S SNAPSHOT — APPENDED WHERE, READ WHEN, DE-DUPLICATED HOW

**JN-1 · THE APPEND'S SEAT** is the merge seat, on the credited arm only: **after the credit** (a repair whose attempt fails
never reaches it) **and before the re-run** (`runToCompletion:561`–`:564`). **The member is `attempt.repairPaired`, minted
empty at the two `K-2` mints beside `repairTriggered`** (`kernel-commit.mjs:100`, `:320`) — **one internal member on the
attempt, no record member, no product member** (`A117` (D6): an attempt is not a record a consumer holds). **The
registration's synthetic attempt takes none** (`kernel-registration.mjs:551`–`:573`): its re-run's set is `[key]` and D-105
does not reach that instant (`Q-1`).

**JN-2 · THE READ** is `evaluate`'s snapshot, and it is ONE call widened by ONE argument — **not a second selection
function**:

> `pairsTriggered(kernel, stored)` → **`pairsTriggered(kernel, stored, attempt.repairPaired)`**

**`pairsTriggered`'s own rule is unmoved:** it walks `kernel.pairs` (whose `Map` iteration IS `D-39`'s registration
sequence) and admits a pair iff the list NAMES its `id` — **an equality test on a handle and never an address relation**
(`kernel-foundations.mjs:1272`–`:1288`; `D-69`, `D-67`). **The second argument only widens MEMBERSHIP; the ORDER stays the
registry's, and each pair is still evaluated AT MOST ONCE per pass** (`contract.md §2.6` item 5).

**JN-3 · ★ THE SNAPSHOT'S OWN PROPERTIES ARE UNMOVED, AND THAT IS THE POINT.** The set is materialised **once per run at
the same instant** — `CX-12`'s fixed-set rule, `attempt-lifecycle.md §2.4` item 5 (iv), `HL-8` item 6 — **so a pair joined
by repair `k` enters the snapshot of the run that follows it and no other**, and no pass ever reads a live registry.

**JN-4 · THE DE-DUPLICATION — THREE RULES, EACH WITH ITS OWN GROUND.**

1. **AGAINST THE COMMIT'S OWN SET, BY HANDLE.** An element whose handle already stands in `record.triggered` is **not**
   appended to `repairPaired`: the pair is already in the evaluated set, and the member's second copy would ask it twice —
   the very double-ask `pairsTriggered`'s `break` prevents within one list and cannot prevent across two.
2. **AGAINST THE MEMBER ITSELF, BY HANDLE — INCLUDING EARLIER IN THE SAME LEG LIST.** An element whose handle already
   stands in `repairPaired` — **whether an earlier repair appended it or the SAME repair's write returned it twice** — is
   not appended again. **THE SECOND HALF IS LOAD-BEARING AND IS NOT HYPOTHETICAL:** the store lawfully returns one handle
   twice (the caller-spelled duplicate — two construction entries at one address carrying the caller's same token resolve
   to ONE home entry and ONE handle, which the store returns TWICE — `DD-42` clause 3; `DD-39`; `PAR-JS-15`), **and
   `releasePending`'s own clause records that this tree has already been bitten by it** (`kernel-attempt.mjs:1064`–`:1069`;
   `pendingNames` exists for exactly that reason at `:1146`). **So the member is a SET, its order is the registry's, and the
   append is guarded on the member as it grows** — **`pairsTriggered`'s `break` (`kernel-foundations.mjs:1283`) would admit
   the pair once anyway, which is why the duplicate is harmless to the READ and still wrong in the MEMBER** (an attempt
   member a later pass censuses would carry one identity twice).
3. **AND NEVER AGAINST `pending`.** `pending` carries no pair's id at all (`1.8.1` §3.3), so there is nothing to compare —
   **and the merged listener elements are not consulted, because a listener is not a pair** (`D-69`).

**AND ONE CASE THAT IS NOT A DUPLICATE AND MUST NOT BE DE-DUPLICATED AWAY: A PAIR AN EARLIER RUN ALREADY CHECKED OFF.** A
repair's edit that re-triggers a pair whose check-off an earlier run took **IS joined**, and it is **asked again on the
next run** — which is lawful and is the tree's existing arm: the pair is in `ran`, so a violation takes limb `(e)`/`(f)`
and its repair is **never invoked twice** (`:795`–`:832`; `P-SM-6`; `attempt-lifecycle.md §2.4` item 4's disjointness rule).
**The loop guard is the applied-repair marker and the restart budget (`D-42`), and neither moves: `D-105` widens what is
ASKED and never what may REPAIR.**

### 3.4 WHAT A LISTENER'S HANDLE DOES THERE — THE `1.8.1` MERGE, UNMOVED

**Nothing in §3 moves the delivery.** A listener's handle is merged into `pending` by the `1.8.1` predicate and
de-duplication, delivered by the commit's ONE `deliver` call at the terminal arm, **after the pass**, once per distinct
handle, with ONE address for the whole batch (`docs/L1/repair-listener-delivery.md` §2 B-1–B-3; `delivery.mjs`'s
`terminalArm`). **The one thing §3 changes about the merge is that it is now TWO destinations rather than one**, and the
pair half leaves `pending` exactly as EMPTY of pair ids as it was.

### 3.5 THE ALTERNATIVES, PRICED AND REFUSED

| route | what it would cost | verdict |
|---|---|---|
| **(i) Widen `record.triggered` itself** with the repair's elements | `pending`'s subset relation with `triggered` would be restored and one member would carry the whole evaluated set — **and `A112`'s sentence would be broken**: `triggered` is the store's own returned set for THIS write, and writing a second act's handles into it forges a store result. **`RLD-5`'s cell (`tests/e2e/repair-listener-delivery.test.mjs:549`–`:555`) asserts `triggered` unmoved and would red.** | **REFUSED** |
| **(ii) Walk `kernel.pairs` and compute the repair's reach in the kernel** | a second reach beside the store's — **`D-67`'s exact finding** (*"the store computes the reach of an act, and the kernel computed a second one"*), undone by `D-69` | **REFUSED** |
| **(iii) Merge pair ids into `pending`** (the obvious shortcut) | the member would carry ids the pass evaluates, and **the caller's own loop over `pending` would run a constraint's registration as if it were a listener's** — `1.8.1` §3.3's load-bearing case (`P-SM-5`, `FTS-11`) | **REFUSED** |
| **(iv) The taken route: a second list, joined at the snapshot** | one internal attempt member, one argument on `pairsTriggered`, one predicate already in the tree, and the registry's order untouched | **TAKEN** |

---

## §4 · THE ROLLBACK — INDEPENDENT of the returned op, and the plan reads the commit's own record

### 4.1 THE DECLARATION

**RB-1 · THE ROLLBACK POINT IS THE RESTORE MARK (`D-63`), AND THE RETURNED OP IS NOT ITS INSTRUMENT.** `D-105` item `2`,
verbatim: *"The rollback point is the **restore mark** (`D-63` — the last validated state), and the returned op is not its
instrument; the floor call's candidates are re-derived from the commit's own record, not from the repair's return."*
**`D-63`'s mechanism stands byte-for-byte** (`:3662`–`:3700`): a commit opens at the journal's mark; **a passing sweep bumps
the mark to that position before the delivery runs**; a later refusal restores to the bumper mark; **a repair's write is
DURING the sweep, so a refusal undoes it with the write; a listener's write is AFTER it, beyond the mark.** **`D-105` adds
nothing to that and takes nothing from it.**

**RB-2 · THE FLOOR CALL'S CANDIDATES ARE `attempt.ops`, AND THAT IS THE COMMIT'S OWN RECORD.** `composeRollback`
(`kernel-terminal.mjs:222`–`:262`) reads `attempt.ops` and nothing else: **no op → no call** (`:225`); the checkpoint's own
op as the first op → no call (`:227`); otherwise **`floorCallPlan`** (`:301`–`:356`) takes **ONE call per distinct address
the attempt's ops touched, at that address's own FIRST owed op, SHALLOWEST FIRST**, skipping `COVERED` and `UNREACHABLE`
candidates, and the call is `attempt.store.rollback(call.opId)` (`:236`). **The returned op never reached this function and
cannot: it has no parameter for one.**

**RB-3 · WHAT `attempt.ops` NOW CARRIES — ALL OF THE COMMIT'S OPS, AND THE LIST IS THE ONE THE COMMIT BUILT.** In creation
order: **(1) the commit's own landing** — `attempt.ops = [written.op]` at the `K-2` mint (`kernel-commit.mjs:168`) and
`[removal.op]` at the delete's (`:354`); **(2) EVERY op the attempt's credited repairs landed, in leg order** — the legs of
each invocation (§2.2), appended at the credit (§1.1 step 4). **So the list is exactly "the ops this commit performed",
which is `D-46`'s tracking and the floor plan's whole input.** **The answer to the brief's question is therefore: the
leg's ops AND the commit's own — every op of the commit, and no op of anything else.**

**RB-4 · THE APPEND'S DE-DUPLICATION.** A leg's op whose `opId` already stands in `attempt.ops` is **not** appended again —
**the one membership test `landedOp` performed survives as the append's guard** (`kernel-foundations.mjs:1118`–`:1120`, read
forward instead of in reverse), **and the ordinal ground (`:1121`–`:1129`) retires altogether**: a leg's op IS an op this
invocation landed, so there is no floor to compare it against and nothing to prove. **No second identity can enter the
list, because every entry is now a `JournalOp` the store answered.**

**RB-5 · WHAT THE FAILING ARM'S UNDO PLAN READS — AND IT IS NOT WHAT A CREDITED ARM'S READS.** **On `(d1)` (the declared
failed arm) and `(d2)` (nothing landed), NOTHING is pinned and no member is appended to `attempt.ops`, to
`attempt.appliedRepairs` or to `record.pending`** — **the log's `repair-run` and `outcome` entries stand, as they stand on
every arm** (§1.1 step 2) — the arm returns before the credit, so
`attempt.ops` holds only what the prior arms put there (the commit's own op and any earlier repair's ops) and the floor plan
is derived from THAT list. **So a failed-arm repair's landed edit is swept only where it lies AT OR UNDER an address one of
`attempt.ops` named** — **`D-89`'s geometry, which is the operative axis and never credit**: *"a repair's write **at or
under** an address one of `attempt.ops` named **is swept with the attempt, credited or not**, and a write at an address **no
attempt op named STANDS**"* (`D-89`, `:4570`–`:4577`; `§5.4:469` and `§5.4:476`(2) read by line, `§7.6:1131` item `(5)`).
**`D-63`'s atomic half holds on the credited arm (the repair's write is inside the sweep and is undone); the beside write
stands on both arms unless an attempt op named its address.**

**AND ONE MOVE THIS DECLARATION DOES *NOT* TAKE, PRICED.** **Appending a FAILED-ARM repair's landed ops to `attempt.ops`
would sweep its edit too** — one line, and it would make *"a failed attempt leaves the store exactly as it found it"* truer.
**REFUSED here, because:** it would move `§5.4:476`(2)'s *"a repair's write goes with the write"* from an address rule to a
credit rule, which `D-89` withdrew **by name**; it would change the store's state on a documented arm in a cut nobody
ordered it in; and `D-105` item `2` says the candidates are re-derived from the commit's own record, **which for a failed
arm is the record of what the commit's ops named and not what a refused repair wrote.** **It is `Q-3`.**

---

## §5 · THE SENTENCE — the template stands, `landedOpDefect`'s sentences are withdrawn, and `D-88` (2) is read THROUGH `D-105`

### 5.1 THE TEMPLATE — **KEPT, BYTE-FOR-BYTE; TRUE OF ITS OP ON EVERY ARM, AND OF ITS ADDRESS ON FOUR OF `(d2)`'s FIVE**

**The sentence** — `kernel-attempt.mjs:977`, quoted from its one line:

```js
`the repair ${pair.id} produced no op at ${addressSpelling(attempt.address)}`
```

**DECLARED: IT STANDS UNEDITED, AND IT ANSWERS `(d2)` ALONE.** **`D-105` item `1` says the arm that answered an OP-LESS
RETURN *"and the sentence with it"* are **superseded** — and the arm that is gone is that one: the arm where the kernel
denied an op it was HANDED.** **The arm that remains is the arm where the kernel holds no op because the invocation landed
none this commit can name — and there the sentence's OP half is TRUE of its own bytes on every one of the five arms:** the
repair produced no op the attempt can pin (no leg carries one), **and the address it names is the attempt's, which is the
only address the kernel holds on four of the five** (`repairLegs` answers nothing, so there is no repair op and no repair
address to name). **THE FIFTH — the nested attempt — is where the address half is not complete, and §5.1's own `★` clause
below is what says so.**

**★ AND `D-88` (2)'s RECORDED DEFECT IS *HALVED* — ONE HALF DISSOLVES BY CARRIER, THE OTHER SURVIVES ON `(d2)`'s THIRD
ARM, AND THE ROW DOES **NOT** CLOSE.** `D-88` (2) recorded, verbatim: *"**THE REFUSAL SENTENCE'S ADDRESS IS A RECORDED
DEFECT AND NOT A UNIT.** *"the repair `<id>` produced no op at `<address>`"* names the **caller's** address, and on that arm
the kernel holds neither the repair's op nor its address — so the row is filed in the live open-items ledger … as **OPEN,
recorded, not repaired**, and **no successor unit is queued**; a change to that text would be a behaviour byte needing its
own ruling and its own version, and naming the repair's address at that instant would need a store reach `D-67` forbids."*
**`D-105` item `1` reads that disposition THROUGH itself — *"`D-88` (2)'s "recorded, not repaired" disposition is read
**THROUGH** it"* — and the reading is TWO-PART, because the arm's population splits:**

- **THE OP-DENIAL HALF DISSOLVES, AND THAT IS `D-105`'s OWN SUBJECT.** The defect's first limb was that the arm could answer
  a repair **whose edit landed and whose op the kernel was HANDED** — a repair may legally write elsewhere (`§7.6:1052`–
  `:1063`), and the sentence denied an op the return carried. **After this declaration a repair whose edit lands on the
  supported route is CREDITED (§1) and never reaches the arm at all**, so the sentence denies no op the kernel holds.
- **★ THE ADDRESS HALF SURVIVES, ON `(d2)`'s NESTED-ATTEMPT ARM, AND IT IS STILL TRUE OF IT.** Guard (ii) (`:185`) answers
  when a nested attempt opened across the invocation — and **on that arm the repair's edit DID land, in its own commit, at
  an address the sentence does not name.** That arm is not hypothetical: it is `discard-witness.mjs:602`,
  `blind-constraints-unit.test.mjs:148`, `repair-in-commit.test.mjs:106`, `constraint-kernel-states.test.mjs:1594` and
  `repair-listener-delivery.test.mjs` (integration) `:458` — **five of the seven Class-B fixtures §7.4 names — and every one
  of them will hold a store value at a beside address while the refusal says *"produced no op at `<the attempt's
  address>`"*.** **So open-items §6 row `5` stays OPEN, with its population NARROWED in its own record rather than closed:**
  it no longer answers an op-less RETURN; **it answers the landed-nowhere and landed-elsewhere arms, where naming the
  repair's address still needs the store reach `D-67` forbids.** **`Q-4` prices the only two exits (keep it, or a text byte
  of the architect's own).**

**AND ONE SENTENCE THE TEMPLATE GAINS, WHICH IS A CLAUSE AND NOT A TEXT:** the address it names is **the ATTEMPT's**, and
that is a complete statement on `(d2)`'s first, second, fourth and fifth arms — *"the invocation landed nothing this commit
can name"* — **and it is NOT complete on the third (the nested attempt), which is exactly the residual `Q-4` carries.** **A
landing pass may say so in a comment at the site; it may not edit the template.**

### 5.2 `landedOpDefect`'s SENTENCES — **WITHDRAWN FROM THE WRITE PATH, AND THE FUNCTION IS OWED DELETION**

**Both sentences** (`kernel-foundations.mjs:1139`–`:1150`): *"the repair `<id>` returned `ok: true` and carried no op at
`<address>`"* (:1146) and *"… named the unrecognized or unlanded op `<opSpelling>` at `<address>`"* (:1148–`:1149`).
**Their subject is THE RETURNED OP'S IDENTITY, and after `D-105` the write path reads no returned op at all.** **`landedOpDefect`
has exactly ONE caller in the tree — the repair arm's `carried` expression at `:973` — so with that arm re-derived the
function has NO CALLER:** **DECLARED: `landedOpDefect` is DELETED by the landing pass, and `opSpelling`
(`:1152`–`:1165`) with it.** **Priced, and the two names are not the same kind of thing:** they are kernel-internal
(`src/entry/`), not product members and not kernel items — **so the deletion moves no declared surface: no status, no
member, no arity, no type and no record member.** **AND THE IMPORT IS ONE NAME, NOT TWO:** `opSpelling` is a PRIVATE
function (`:1154`, no `export`), imported by no file, so the import to remove at `kernel-attempt.mjs:2` is
**`landedOpDefect`'s alone** — **`opSpelling` goes with the function that is its only caller.** **The alternative
(**retain them as the registration instant's sentence builders**) is REFUSED**, because the registration's refusal is
composed by `registrationRefusal` (`kernel-registration.mjs:763`–`…`, `§8.2`'s generated message) and has never used them.

**AND `landedOp` SURVIVES WITH ONE CALLER — THE REGISTRATION INSTANT** (`kernel-registration.mjs:616`). **Its two grounds
stand there, unmoved** (`Q-1`), **and on the write path its grounds retire**: the membership ground survives as the append's
de-duplication (§4 `RB-4`), the ordinal ground retires (§4 `RB-4`), and **the function's write-path caller goes with the arm.**

### 5.3 THE GUIDE'S THREE MESSAGES BECOME TWO ON THE WRITE PATH

`§7.6:1122` prints the three sources of a `KC-4` refusal's message: **the kernel's op-identity sentence**, **the caller's
own `message`**, and **the `produced no op` template**. **After this declaration the write path has TWO:** `(d1)`'s caller's
words and `(d2)`'s template. **`§8` names that clause as a re-derivation the guide's owner owes** — annotate-beside, no
byte of the printed copy moves.

---

## §6 · THE TYPES — `RepairOutcome` and `ConstraintOutcome` re-derived

### 6.1 `RepairOutcome` — THE CREDITED ARM'S `op` IS OPTIONAL AND INFORMATIONAL, AND `undefined` IS ASSIGNABLE

**Today** (`index.d.ts:1517`–`:1519`):

```ts
export type RepairOutcome =
  | { readonly ok: true; readonly op: WriteRecord['op'] }
  | { readonly ok: false; readonly message: string };
```

**DECLARED** (`index.d.ts`, the alias and its docblock re-derived by a dated clause):

```ts
export type RepairOutcome =
  | void
  | { readonly ok: true; readonly op?: WriteRecord['op'] | null }
  | { readonly ok: false; readonly message: string };
```

**WHY EACH MOVE, AND WHAT IT COSTS.**

| move | its ground | its price |
|---|---|---|
| **`void` joins the union** | `D-105` item `1`: *"the natural shape of `repair: () => { … }` — is NOT refused"*. **A body that returns nothing has the type `void`/`undefined`, and a `void`-returning function is NOT assignable to a signature returning a non-void type** — so without this member the guide's own natural repair is a compile error | **the type stops refusing the one shape `ST-F2` was about.** **That is the point of the ruling and not a loss** |
| **`op` becomes OPTIONAL** | the op is informational: **no reader in the kernel reads it** (§1.2) | **a consumer who annotated a value as `RepairOutcome` and reads `.op` must now narrow** — the declared break, and the reason the release class is `MINOR` (§8.2). **The reading cell at `typecheck/consumer-fixture.ts:448`–`:453` reds and is re-derived** |
| **`op` admits `null`** | **the member is INFORMATIONAL: nothing is read from it and nothing is refused for it, so the store's own `null` arm (`DeleteRecord['op']` where a `delete` removed nothing) costs a consumer nothing** | **a widening**: a consumer reading its own `op` narrows either way |
| **the failed arm is UNMOVED** | `D-105` item `4`: *"The failed arm still fails (`{ok: false, message}` — the caller's words)"* | **none: no member, no arity, no sentence moves on that arm** |

**AND THE TYPE STAYS NARROWER THAN THE RUNTIME, ON PURPOSE, AND SAYS SO.** The runtime credits `true`, `false`, `7`,
`'done'`, `{ok: 'yes'}`, **`{ok: false}` WITHOUT A MESSAGE** and `{ok: true, op: <a whole WriteRecord>}`; **the alias
admits none of them.** **`{ok: false}` with no message is named on both sides deliberately, because it is the one form that
looks like the failed arm and is not:** §1.1 CT-3 credits it (the declared failed arm needs a non-empty `message`), the
alias refuses it, **and the gap below is what says the two are not in conflict.** **THAT GAP IS DECLARED, NOT CLOSED:** the
alias **declares the shape a consumer should return**, and the runtime **declines to judge what a consumer does return** —
**the mirror image of `CommitCarrier`'s printed limit** (*"an INHERITED `pending` … and a `Proxy` … are both admitted by the
type … **THE RUNTIME REFUSAL IS WHAT KEEPS THE POSITION'S DOMAIN**"*, `index.d.ts:1535`–`:1539`). **Here the runtime is the
wider side: `THE TYPE DECLINES, THE RUNTIME CREDITS, AND NOTHING IN THIS DECLARATION PROMISES THAT A GREEN COMPILE IS A
CREDIT OR THAT A REFUSED COMPILE IS A REFUSAL.`** **A `unknown`-typed `op` was considered and REFUSED:** it would un-type
the member and lose the one thing the alias is for (`D-101`/`D-102`'s additive surface), and it would refuse nothing while
promising nothing. **`exactOptionalPropertyTypes` is not set in either `tsconfig` head** (`tsconfig.typecheck.json`,
`tsconfig.typecheck.nodenext.json`), **so `{ok: true, op: undefined}` type-checks as written** — a property of the config
heads and not of this alias, printed so a landing pass does not "fix" it.

**WHAT THE PUBLISHED DECLARATION DOES AND DOES NOT PROMISE, SAID IN ONE PARAGRAPH EACH.** **IT PROMISES:** the three
credit-bearing spellings (`undefined`, `{ok: true}`, `{ok: true, op}`) are assignable; the failed arm carries `message`; the
returned `op`, when present, is the store's own record type and never a receipt; and **nothing is required of the position
beyond the failed arm's own two members.** **IT DOES NOT PROMISE:** that a returned `op` is looked at (it is not), that a
value outside the arms is refused (it is credited), that a repair which lands nothing passes (it fails `KC-4`, §1.1 step
5), or that a green compile is a passing attempt — **that last one `index.d.ts:1514` already declares and this declaration
leaves it standing:** *"A green compile is not evidence of a credit."*

### 6.2 `ConstraintOutcome` — THE SHAPE IS UNMOVED AND MOVES THROUGH ITS `repair` MEMBER

**`ConstraintOutcome`'s alias (`index.d.ts:1489`–`:1497`) keeps its three arms byte-for-byte**, and **its `repair` member
already names `RepairOutcome`** — so the widened union reaches it with no edit at that site. **What that buys, stated so it
is not mistaken for an accident:** a constraint body may return `repair: (rc) => { store.write(…, rc); }` — no return —
**and the arm type-checks as written.** **Its docblock's *"`message` IS REQUIRED ON THE REPAIR ARM BECAUSE THE KERNEL READS
IT FIRST"* stands** (`:1482`), and **the `D-35` divergence it prints** (own-member read at the landing, chain read at the
registration, `:1483`–`:1488`) **stands unmoved** — `D-105` touches neither.

**AND `RepairContext` / `RegistrationRepairContext` / `AttemptContext` TAKE NO BYTE.** Six members, seven, five — **the
`pending` member's contents change (§3 changes nothing about it; `1.8.1` §4's widened population stands), and no type
moves.** **`CommitCarrier` takes no byte.** **No new name is minted: the declaration adds `0` types.**

---

## §7 · THE CELLS — named by battery, with the red set read and its instrument limit declared

**§0's limit applies: these are readings, not runs.** **No cell is written by this pass; every cell below is named, and the
red set is each fixture's own writes and assertions read at its bytes.**

### 7.1 THE CELLS THIS DECLARATION OWES — `tests/e2e/` (`role_l1_test_writer`, `D-5`'s scope)

**One new file — `tests/e2e/op-free-repair-credit.test.mjs` — nine cells.** **Each reaches the entry by path** (`O4`,
`D-6`/`D-7`: none of these claims the packaged resolution).

| cell | what it drives, and the failure it catches |
|---|---|
| **`ORC-1` · THE OP-LESS CREDIT** | a pair at `['a']` refuses `2`; its repair writes `3` at `['b']` with `rctx` at `write`'s FOURTH position and **returns nothing**. The write answers its receipt; the pair is marked applied; `report.ops` carries the commit's op **and** the repair write's op by `opId`; the `repair-run` entry's `opId` is the repair's; the re-run judged it; `read(['b']) === 3`. **Catches: the defect `D-105` closes** (`ST-F2`). |
| **`ORC-2` · THE BARE RECEIPT** | the same drive, the repair returning `{ok: true, op: written}` — the **whole** `WriteRecord`, not its `op`. Credited identically; `report.ops` carries the JOURNAL op and not the receipt; nothing in the record's `log` names the receipt. **Catches: any path that hands the return's op into `attempt.ops`.** |
| **`ORC-3` · THE OP, STILL LAWFUL — AND NOT THE CARRIER** | two arms: `{ok: true, op: landed.op}` credited (the guide's spelling, `§7.6:1107`); **and `{ok: true, op: <an op this repair did not land>}` ALSO credited**, with no log entry and no refusal naming that id. **Catches: the retired identity ground read back in** (`landedOp`'s membership + ordinal, `kernel-foundations.mjs:1113`–`:1129`). |
| **`ORC-4` · THE DECLARED FAILED ARM** | a repair that lands `['b']` with `rctx` and then returns `{ok: false, message: '…'}`: the attempt fails **`KC-4`** with **the caller's exact words**, `pending` gains no repair element, `report.ops` carries the commit's op alone, and **the landed edit's fate is the address geometry** (`['b']` a beside address no attempt op named → it STANDS; `D-89`, `§5.4:469`). **Catches: a failed arm that credits, and a merge taken before the arm.** |
| **`ORC-5` · THE RESIDUAL `KC-4`** | **four drives, one arm, each reaching a DIFFERENT absent arm of `repairLegs`:** (a) a repair that returns nothing **and writes nothing** (the `:188`–`:190` arm — a bracketed invocation whose answer carries no op); (b) a repair whose only write is the THREE-position route (`D-103`'s unsupported route — a nested attempt, the `:185` guard); (c) a store whose **`REPAIR_LEG`** channel was read away (`Object.defineProperty` to a non-function — the `:186`–`:187` arm); (d) a store whose **`EXTERNAL_CALL`** channel was read away, so `repairInCommit` (`:117`–`:124`) takes its `run()` fallback and `invocation.bracketed` stays `false` (the `:184` guard) — **the drive `repairLegs`' own clause calls load-bearing** (*"a bare read of the leg channel would answer a PREVIOUS invocation's legs"*, `:111`–`:116`). **Each fails `KC-4`, and the log's `outcome` entry carries the residual template's sentence with the ATTEMPT's address.** **Catches: an arm that credits a repair which landed nothing; a leg read that answers a previous invocation's legs; and the two channel losses that are a caller's own act and not a store's defect.** |
| **`ORC-6` · THE REPAIR'S EDIT'S TRIGGERED PAIR IS ASKED** | a counting pair at `['b']` (the repair's landing address, **not** in the commit's write's triggered set) plus a pair at `['c']` the repair never touched: after the drive, the `['b']` pair has been asked **exactly once more**, **at the re-run, against the repair's op and the value it landed** (`context.op.opId` = the repair's op, `context.value` = `3`), and the `['c']` pair's count is unmoved. **Catches: `Q-5`'s silence** — and the over-reach that asks every registered pair. |
| **`ORC-7` · THE REPAIR'S EDIT'S TRIGGERED LISTENER** | the `1.8.1` subject re-asserted at the op-free shape: a listener bound at `['b']` is invoked **once**, **after** the pass, and `pending` carries one `{handle, address}` element for it. **Catches: an op-free credit that skips the merge (the natural regression of moving the seat to the new carrier).** |
| **`ORC-8` · THE FLOOR CALL'S UNDO ON A FAILING ARM** | an op-free repair credits and lands `['b']`; a **second** pair refuses at the re-run: the attempt fails, **the repair's op IS in `report.ops` and IS in the floor call's `undoneOps`**, and `read(['b'])` answers its pre-attempt state. **Catches: a credit that appends no op — the repair's edit would stand after a failed attempt.** |
| **`ORC-9` · THE DELETE-SHAPED REPAIR IS NOT CREDITED** | a repair that edits by `store.delete(address)` and returns nothing: `KC-4`, `report.ops` unchanged. **The cell exists because `delete` has no commit position at all** (`delete(address, tier?)`, `index.mjs:564`, `index.d.ts:936`) — **so a repair whose only edit is a deletion cannot be on `D-103`'s supported route** (`Q-6`). **Catches: a leg minted for a verb that cannot name the commit.** |

### 7.2 THE CELLS THIS DECLARATION OWES — `tests/integration/js-constraints/` (`role_l2_test_writer`)

**One new file — `tests/integration/js-constraints/op-free-repair-credit.test.mjs` — six cells, each at the kernel's own surface.**

| cell | what it asserts |
|---|---|
| **`ORC-I1` · THE CREDIT IS THE MARK** | `attempt.appliedRepairs` and `attempt.ran` carry the pair's key on the credited arm, and **a return naming an op the attempt never landed is credited** — the inverse of `ck_p_neg_18`. **The return's op is read by nothing**: the same drive with `op` absent, with `op: undefined`, with a foreign `op` and with no return at all all reach the same arm. |
| **`ORC-I2` · THE PINS AND THE ORDER** | `entry.opId` = the last leg's `opId`; `attempt.ops` = `[the commit's op, …every leg's op in leg order]`; no `opId` twice; **a repair that writes TWICE appends TWO ops and the last is the landing** (§2 PN-4). |
| **`ORC-I3` · THE RESIDUAL'S TWO PREDICATES** | `(d1)` and `(d2)` are distinct and both answer `KC-4`: the failed arm's message is the caller's VERBATIM and `attempt.ops`/`appliedRepairs` are untouched; the landed-nothing arm's message is the residual template. |
| **`ORC-I4` · THE JOINED PAIR** | the union reaches the next run's snapshot: a pair named only by the leg is asked at the re-run, once, in the REGISTRY's order and not the leg's; a pair already in `record.triggered` is not asked twice; **a pair handle the store returned TWICE inside one `triggered` list (`DD-42` clause 3's lawful duplicate) stands ONCE in `attempt.repairPaired` and is asked once**; `record.triggered` is unmoved; `pending` carries no pair id. |
| **`ORC-I5` · THE LEG'S SHAPE** | the channel answers one element per write carrying that write's `op` (with `opId`, `seq`, `address`, `after`) and its `triggered`; two writes → two elements; **a store with the channel read away answers nothing, a channel that THROWS answers nothing (`:191`–`:193`, `D-35`'s read half), and a channel answering a non-array answers nothing (`:190`)** — three drives, one arm, `(d2)`. |
| **`ORC-I6` · THE FAILED ARM'S UNDO PLAN** | a failed-arm repair's beside write is swept where an attempt op named its address and STANDS where none did — the two conjuncts of `§5.4`'s pair of lines, asserted as store state (`D-89`'s geometry, not credit). |

### 7.3 THE CELLS THIS DECLARATION OWES — `typecheck/` (`js-declaration`, the fixture the declaration is compiled against)

| cell | change |
|---|---|
| **`ORC-T1`** | `refusedNoOp` (`{ok: true}`) and `refusedUndefined` (`undefined`) lose their `@ts-expect-error` and become **lawful assignments** — the two directives that state `ST-F2`'s defect |
| **`ORC-T2`** | `credited`'s members (`typecheck/consumer-fixture.ts:448`–`:453`) **narrow before reading `op`**, and a new cell reads `op` off a narrowed value |
| **`ORC-T3`** | `refusedReceiptAsOp` **keeps** its directive (§6.1's declared gap: the type declines what the runtime credits) and `refusedExcessOp` keeps its own |

### 7.4 ★ THE RED SET — THE COMMITTED CELLS WHOSE ASSERTIONS FAIL UNDER THIS DECLARATION

**TWELVE CELLS RED, IN FOUR CLASSES. Each was read at its own bytes; the instrument limit of §0 applies.**

**CLASS A — a FOUR-position repair that lands, whose cell asserts the RETURNED op is the credit (the ruling's own target):**

| # | cell | the assertion that fails |
|---|---|---|
| 1 | `tests/integration/js-constraints/constraint-kernel-repairop.test.mjs:322`–`:373` — `ck_repairop_arm_d_an_ok_true_return_with_no_op_member_is_KC4_…` | the repair lands `['a']` with `rctx` (`:340`) and returns `{ok:true, message}` (`:341`); the cell asserts arm `(d)`/`KC-4` (`:356`) — **now credited and passing** |
| 2 | `…:375`–`:409` — `…whose_op_is_undefined_is_KC4` | same, `op: undefined` (`:393`) |
| 3 | `…:411`–`:455` — `…naming_an_op_the_repair_never_landed_is_KC4` | same, `op: unlanded` (`:430`) — **and `:450`–`:454` asserts the kernel's sentence names that id, which no longer exists** |
| 4 | `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs:646`–`:709` — `ck_p_neg_18_a_repair_naming_a_pre_attempt_op_credits_nothing_and_is_KC4` | the repair lands with `rctx` (`:663`) and returns `op: before` (`:665`); the cell asserts `KC-4` (`:682`), the sentence naming `before.opId` (`:689`), `ops.length === 1` (`:694`) |

**CLASS B — a THREE-position repair (D-103's UNSUPPORTED route), whose op the leg cannot reach, so the enclosing attempt lands on `(d2)`:** seven cells. **These are the cells `D-103` item `1`'s five NON-PROMISES already withdrew and no pass re-derived** — *"the op in `attempt.ops`"*, *"the pending delivery"*, *"the rollback's scope"* and *"a `file`-tier save riding the commit's terminal act"* are four of the five.

| # | cell | why it reds |
|---|---|---|
| 5 | `tests/e2e/blind-constraints-unit.test.mjs:138`–`:161` (`PAR-C-8`'s closed two-arm cell) | asserts `outcome === 'passed'` and `ops.length === 2`; the repair writes three positions (`:148`) → `(d2)` |
| 6 | `…:237`–`:262` (arms `(e)`/`(f)`) | asserts `KC-5` / `KC-6`; the enclosing attempt now takes `(d2)`/`KC-4` on both arms |
| 7 | `…:264`–`:275` (`PAR-C-9`'s per-attempt marker) | asserts `KC-5` twice; `(d2)` now answers |
| 8 | `…:277`–`:313` (the `LogEntry` census on a passing repaired attempt) | the run is read without a `try`; it now throws |
| 9 | `tests/integration/js-constraints/constraint-kernel-states.test.mjs:1574`–`:1672` (`ck_neg_2`, the call list reaching beside addresses) | asserts `KC-5`, `ops.length === 2`, and the repair's op inside the floor call's `undoneOps` — **two of `D-103`'s five non-promises, asserted for an unnamed-route repair** |
| 10 | `tests/e2e/repair-in-commit.test.mjs:86`–`:246` (`D-46` (1), the drive whose own title says the write is *"THREE positions, naming nothing"*) | asserts the write passes and the repair's op joins `ops` (`:137`, `:167`–`:176`) |
| 11 | `tests/e2e/discard-witness.mjs:578`–`:696` (`DW-08.1`, the greens leg) | asserts `control.written.ok === true` and the store's repaired value |

**CLASS C — THE TYPES:** `typecheck/consumer-fixture.ts:430`–`:435` (two directives become unused — a compile error) **and** `:448`–`:453` (reading `op` off an optional member). **Counted as ONE cell in the arithmetic above and named as THREE edits in §7.3 — so `4 + 7 + 1 = 12`.**

**CLASS D — NOTHING ELSE *WITHIN THE READ SET THIS PASS TOOK*, AND THE READ SET IS PRINTED RATHER THAN THE CLAIM.** The
readings found **no other committed cell** whose assertions move, **over the fixtures §0's table names**: `blind-constraints-v2.mjs` (every repair four positions or the declared failed arm — **no cell reds**), `file-tier-save.test.mjs`/`-properties` (four positions), `registration-write-route.test.mjs` (`G3-21`/`G3-23`: **the registration instant is unmoved, `Q-1`**), `blind-registration-instant.test.mjs` (`screg_blind_10`'s `noop` arm: **same**), `pair-application-rule`, `blind-kernel-surface`, `def-ae-restore-mark`, `downstream-claims`, `blind-defect-cases`, `registration-repair-existence`, and `greens.mjs` (**no repair cell at all**). **And `constraint-kernel-states.test.mjs:310`–`:347` and `:349`–`:384` stay GREEN** — their repairs land no write, so `(d2)` answers exactly the arm they assert.

**⟶ AND THE FIXTURES §0's TABLE DOES *NOT* NAME, READ BY THE EXAMINATION THAT PRODUCED THESE CORRECTIONS.** The examiner
read the remaining repair-bearing fixtures and **found no red among them** — `constraint-kernel-properties.test.mjs`,
`constraint-kernel-rollback.test.mjs`, `constraint-kernel-deltamodel.test.mjs`, `constraint-kernel-layers.test.mjs`,
`repair-restart-state-machine.test.mjs`, `registration-instant-properties.test.mjs`, and `discard-witness.mjs`'s other three
repair cells (`:754`, `:2023`, `:3029`) — **on this ground, each read at its own site:** `layers:298`'s repair **never runs**
(the fixture's own shield at `:292` passes every descendant ask), `rollback:1067`'s write **is refused by the store** (so the
throw arm `:893`–`:948` carries it and the credit is never reached), and the rest are four-position with a landed op, the
declared failed arm, or a `{ok: true}` that lands nothing (`def-ae:282` → `(d2)`). **That is a READING and not a run, and
the landing pass owes the full sweep** — **§7's limit is not retired by a second reading of the same kind.**

**★ AND ONE CELL WHOSE *GROUND* MOVES WITHOUT ITS VERDICT — CORRECTED, BECAUSE THE FIRST DRAFT OF THIS PARAGRAPH CLAIMED A
RED→GREEN THAT DOES NOT EXIST.** **`tests/e2e/blind-constraints-unit.test.mjs:183`–`:200` — the `PAR-C-8` `observable` cell
that `docs/L1/open-items-2026-10-25.md §3` row `4` files as RED — IS GREEN ON THIS TREE ALREADY, and has been since
2026-10-26:** its repair writes THREE positions (`:191`) and returns `{ok:true, op:{opId:'not-the-op-it-landed'}}` (`:192`),
**and the CURRENT credit path answers `KC-4` for it — not because the identity was refused, but because the candidate carries
no `seq` and `landedOp`'s ORDINAL GROUND (`kernel-foundations.mjs:1121`–`:1129`, added 2026-10-26) returns `null` wherever the
invoked-for op's `seq` is a number** — which the commit's own landing always is (`frame.mjs:421`–`:431`). **So the row's own
two figures are stale in BOTH directions and the declaration prints rather than inherits them:** **row `4` cites
`:172`**, which is inside the OUTSIDE-FORMS cell (`:163`–`:181`), **while its drive is at `:183`–`:200`**; and **row `4`'s
text says the ordinal ground *"is not applied"*, which the 2026-10-26 clause contradicts.** **WHAT `D-105` CHANGES HERE IS
THE GROUND AND NOT THE VERDICT: the arm answers because the invocation landed no op the enclosing attempt can own
(`(d2)`'s third arm), the ordinal ground retires (§4 `RB-4`), and the cell stays green on a different reason.** **The row is
owed a disposition saying exactly that — closed as to the op, narrowed as to the address (§5.1) — and `Q-5` (b) puts the
correction of its own stale text up rather than absorbing it.**

### 7.5 THE `1.8.1` CELLS — DO THEY MOVE? **NO. THIRTEEN CELLS, AND THREE GROUNDS.**

**`RLD-1`–`RLD-8`** (`tests/e2e/repair-listener-delivery.test.mjs`, declared at `:131`, `:228`, `:292`, `:395`, `:481`,
`:571`, `:669`, `:740` — **eight**) and **`RLD-I1`–`RLD-I5`**
(`tests/integration/js-constraints/repair-listener-delivery.test.mjs`, declared at `:82`, `:189`, `:269`, `:351`, `:421` —
**five**) = **THIRTEEN.** **Not one assertion changes.** Each was read for the two things this declaration could break — **an
op-less return, or an asked-set claim** — and **twelve of the thirteen** either take the four-position route and return
`{ok:true, op: written.op}` or return the declared failed arm; **the thirteenth (`RLD-I5`) takes the three-position route and
is unmoved anyway**, on its own ground below.

- **`RLD-1`, `-2`, `-4`, `-7`, `-8`, `-I1`, `-I2`, `-I3`** — four-position repairs returning the landed op: **the leg's op IS
  that op**, so every reading the cells take (`ops`, `pending`, `triggered`, the seat's `opId`, the listener's count) is the
  same reading.
- **`RLD-3`** — the failing arm is the **re-run's** refusal, not the credit's: unmoved.
- **`RLD-6` (THE REGISTRATION INSTANT IS UNMOVED) — GREEN, AND IT IS THE CELL `Q-1` IS ABOUT.** Its repair writes through
  the registration's OWN route (`repairContext.write(…, 'mem', 99)`, `:604`–`:605`), which takes THREE positions at the
  caller's hand and reaches `store.write(…, commitRecord)` at FOUR internally (`kernel-registration.mjs:492`–`:503`) —
  **so a leg exists either way, and the cell's subject (a registration's repair delivers nothing, `listenerDelta === 0`) is
  untouched by the write path.** **It stays green BECAUSE the registration's credit site keeps `D-91` (2)'s rule
  (`kernel-registration.mjs:615`–`:616`); if `Q-1` is answered the other way, this cell and `G3-23` move together.**
- **`RLD-I4` (THE CREDIT GATE) — GREEN, AND ITS GROUND MOVES.** Its repair lands a four-position write and returns
  `{ok: false, message}` (`:377`–`:379`) — **the DECLARED FAILED ARM, not an op-less return.** The gate survives (§1.1 step
  2), **and the cell's title and its comments (`:348`–`:356`, `:386`–`:393`) quote the retired ground** (*"a repair whose
  return names no landed op merges nothing"*, *"`landedOp` credits nothing"*) → **a comment re-derivation, no assertion
  change.**
- **`RLD-I3` — GREEN ON ITS FIXTURE, AND ITS SENTENCE IS SUPERSEDED FOR THE PAIR HALF.** It asserts *"THE PASS'S ASKED SET
  IS UNCHANGED BY THE MERGE"* (`:338`–`:341`). **That sentence is now true of the LISTENER half alone** (§3: a joined pair
  DOES change the asked set). **It stays green because its repair writes at `[tag,'leaf']`, where no pair stands** — the
  same fixture-safety `1.8.1` §7.3 printed for its two re-derived claims. **The landing pass owes a dated comment at the
  cell, and `ORC-I4` is the cell that measures the half it cannot see.**
- **`RLD-I5` (THE NESTED-ATTEMPT GUARD) — GREEN, AND ITS UNASSERTED FIGURE MOVES.** Its repair writes three positions
  (`:458`), so the enclosing attempt now ends on `(d2)`. **The cell asserts only the enclosing member, `triggered` and the
  listener's count `1` — all unmoved — and records the outcome without asserting it** (`Q-6`'s own discipline), **so it
  greens on a `KC-4` it does not name.** **That is exactly the record the declaration needs, and the landing pass must
  print it rather than leave it latent.**
- **`RLD-5`** — its repair writes **twice** and returns the second op (`:506`–`:510`). **Its assertions do not read `ops`**,
  so it greens; **but under §2 PN-4 `attempt.ops` gains TWO ops where it gained one, and no committed cell measures that.**
  **`Q-5` and §2 PN-4 print it; the landing pass must re-measure.**

### 7.6 THE CLAIMS RE-DERIVED IN THE SAME ACT (no cell reds; each would red on the first fixture that measures it)

**Not a red set — a list of printed sentences that the landing pass must re-derive beside the cells**, RCA-8(g)
ANNOTATE-BESIDE, each with the site read:

1. **`tests/integration/js-constraints/constraint-kernel-repairop.test.mjs:240`–`:241`, `:253`–`:255`** — *"THE OP THE KERNEL APPENDS IS `returnValue.op` — read off the repair's own return and nowhere else"*.
2. **`…:466`–`:471`, `:526`–`:541`** — *"the seam has ONE carrier, and the caller's own instance is it"*: **the seam now has TWO channels and the instance is no longer the op's carrier** (the leg is).
3. **`tests/integration/js-constraints/constraint-kernel-states.test.mjs:25`–`:32`, `:141`–`:144`** — the arm `(d)` enumeration and *"ADDS THE OP THE REPAIR'S OWN RETURN CARRIES"*.
4. **`tests/integration/js-constraints/constraint-kernel-negatives.test.mjs:622`–`:645`, `:943`–`:950`** — `P-NEG-18`'s and `P-NEG-22`'s *"THE KERNEL'S ONE CARRIER IS THE REPAIR'S OWN RETURN"*. **`P-NEG-22`'s ASSERTIONS stay green** (its repair's `delete` appends no leg — see `ORC-9`/`Q-6`) **and its ground does not.**
5. **`tests/e2e/blind-constraints-unit.test.mjs:10`–`:32`, `:138`–`:139`, `:163`** — the file head's `PAR-C-7`/`PAR-C-8` provenance and *"A REPAIR THAT CARRIES NO OP … IS READ AS THE `{ok: false, message}` ARM"* (**green on fixtures that land no write, and by a different ground**).
6. **`tests/e2e/registration-write-route.test.mjs:191`–`:192`, `:268`** — *"THE CREDIT: the op the route landed, returned as the repair's answer"* (**`Q-1`: the registration instant is unmoved and its ground is `D-91` (2)'s**).
7. **`tests/e2e/def-ae-restore-mark.test.mjs:279`–`:283`** — *"REPAIR-RETURN OUTSIDE THE CLOSED TWO-ARM SET — `{ok: true}` carrying no `op`, read as \"no op produced\""*.
8. **`tests/e2e/repair-listener-delivery.test.mjs:12`–`:15`** — the head's *"credited that write's `op` and read nothing else"* (history now, not the rule).

---

## §8 · THE WRITE SET, THE RELEASE CLASS, AND THE QUESTIONS

### 8.1 THE WRITE SET, BY ROLE

| role (module) | path | the delta |
|---|---|---|
| **this pass (`role_l1_architect`)** | `docs/L1/op-free-repair-credit.md` | **the declaration — one path; nothing else in the tree is touched, staged or committed** |
| **`js-registry-delivery`** (module `12`) | `bindings/js/src/entry/state.mjs` | **the leg's widening**: `appendRepairLeg` (`:403`–`:420`) mints **one `{op, triggered}` element per write**, the op copied member by member and the segments copied. **Nothing else in the file moves** — the bracket, the stack, the clear and the channel are untouched |
| **`js-constraints`** (module `13`) | `bindings/js/src/entry/kernel-attempt.mjs` | **the credit, the pins, the residual, the merge seat and the pair-join**: the return read (`:953`–`:980`) collapses to the declared failed arm's test; the credit (`:982`–`:987`) takes its op from the legs; the merge seat (`:988`–`:1010`) splits listener handles to `pending` (unmoved) and pair handles to `attempt.repairPaired`; `evaluate`'s snapshot (`:631`–`:632`) hands `pairsTriggered` the joined list; **and dated clauses beside each** |
| **`js-constraints`** | `bindings/js/src/entry/kernel-foundations.mjs` | **`pairsTriggered` gains its second argument** (membership only; the order and the `break` unmoved); **`landedOpDefect` and `opSpelling` DELETED** (§5.2); **`landedOp` keeps its registration caller** (`kernel-registration.mjs:616`) and its write-path comment re-derived |
| **`js-constraints`** | `bindings/js/src/entry/kernel-commit.mjs` | **`attempt.repairPaired: []`** at both `K-2` mints (`:100`, `:320`) — one internal member, no record member |
| **`js-constraints`** | `bindings/js/src/entry/kernel-terminal.mjs` | **NO BYTE.** The discard (`:95`–`:109`) reads `repairTriggered` (unmoved) and the floor call reads `attempt.ops` (widened by §4, not by this file). **Named so the absence is a decision** |
| **`js-surface`** (module `10`) | `bindings/js/index.mjs` | **NO BYTE.** `appendRepairLeg(record)` already passes the whole record (`:463`), so the widening is `state.mjs`'s. **Named so the absence is a decision** |
| **`js-declaration`** (module `14`) | `bindings/js/index.d.ts` | **`RepairOutcome` re-derived** (§6.1: `void`, `op?`, `null`) and **its docblock re-derived by a dated clause** (`:1500`–`:1516`). **`ConstraintOutcome`, `RepairContext`, `RegistrationRepairContext`, `AttemptContext` and `CommitCarrier` take no byte**; **no name is minted** |
| **`js-declaration`** (the fixture the declaration compiles against) | `typecheck/consumer-fixture.ts` | **§7.3's three edits** — two directives retired, one kept, and the narrowed `op` reading |
| **the guide's owner (no module owns a contract — map §5.3)** | `docs/guides/package-use.md` §7.6 | **three dated clauses**: the two-arm paragraph (`:1071`) — the credit's ground moves to the mark and the leg; **the worked example's reading (`:1117`)** — *"a repair that returned an op it did not land fails `KC-4` instead"* is **withdrawn by name**; and **item `(2)`'s three messages become two** (`:1122`). **Annotate-beside; `:1071`'s other sentences (`op` is the store's record, the failed arm's shape) stand** |
| **the declaration corpus** | `docs/L1/repair-listener-delivery.md` | **one dated clause at §3.4 seat `2` (`:274`–`:278`)** — *"the merge does NOT change which pairs the pass asks"* is **true of the listener half alone** from this date — **and the `Q-5` row (`:668`–`:674`) closed by `D-105`** |
| **the open-items ledger** | `docs/L1/open-items-2026-10-25.md` | **§3 row `4`'s disposition** (its VERDICT is unmoved and its GROUND is what moves — the row's own text is stale in both figures; §7.4's note, `Q-5` (b)), **§6 row `5`'s disposition** (**NARROWED and not closed**: the op-denial half dissolves, the address half survives on `(d2)`'s nested arm; §5.1), and **§7 row `8`'s second conjunct re-derived** (*"only an uncredited repair's write stands"* → *"only a repair that landed no op stands"*: the axis stays the address, `D-89`) |
| **`role_l1_test_writer`** | `tests/e2e/op-free-repair-credit.test.mjs` (new) | **§7.1's nine cells** |
| **`role_l2_test_writer`** | `tests/integration/js-constraints/op-free-repair-credit.test.mjs` (new), **plus FOUR Class-A cells re-derived in place** (§7.4: the three `constraint-kernel-repairop.test.mjs` cells and `constraint-kernel-negatives.test.mjs`'s `P-NEG-18`), **plus ONE Class-B cell** (`constraint-kernel-states.test.mjs:1574`–`:1672`), **plus §7.6's eight comment re-derivations** | §7.2's six cells; the red set reconciled |
| **`role_l1_test_writer` / `role_l2_test_writer`, jointly** | **the seven Class-B e2e cells** (`blind-constraints-unit.test.mjs`, `repair-in-commit.test.mjs`, `discard-witness.mjs`) | **re-derived on `D-103` item `1`'s non-promises**, each carrying a stated red side — **and this is `Q-2`, because the route's observables REGRESS and the architect has not said they may** |
| **release pass** | `RELEASE-NOTES.md`, its landed copy, and the version line the release pass owns | §8.2 |
| **`role_l2_integration`** | `docs/L1/module-map.md`, `docs/L1/modules.json` | **NOTHING.** No module is declared and no endpoint moves: **`19` modules / `61` endpoints stand and the harness cap is unmoved** (`modules.json:612`–`:622`). Every edit lands inside `js-constraints`, `js-registry-delivery`, `js-declaration` and `js-surface`, whose responsibility lines already cover it |
| **nobody in this pass** | `strata/**`, `src/**` (the Rust store), `bindings/js/src/entry/delivery.mjs`, `bindings/js/src/entry/constraints.mjs`, `bindings/js/src/entry/kernel-registration.mjs`, `bindings/js/package.json`, `bindings/js/README.md` | **unmoved — named so the absence is a decision.** `kernel-registration.mjs` in particular: **its credit site is `D-91` (2)'s and stays as it stands (`Q-1`)** |

**THE ONE COUPLING THE LANDING ORDER MUST RESPECT.** **The leg's widening, the credit, the pins and the pair-join are ONE
act**: a credit that takes its op from a channel which does not carry it yet credits nothing (`(d2)` on every repair, and
the Class-B red set becomes the whole tree's repair behaviour), and a pair-join without the widened snapshot is dead bytes.
**So `state.mjs`, `kernel-attempt.mjs`, `kernel-foundations.mjs` and `kernel-commit.mjs` land TOGETHER, the declaration
lands with them (a repair that returns nothing must type-check or the ruling's own shape is a compile error), the cells
land with both, and no release may be cut between them.**

### 8.2 THE RELEASE CLASS — **A MINOR, MARKED AND NOT NUMBERED**

**THE CLASS IS `MINOR`.** **Two grounds, and the second is the one that decides it:**

1. **THE BEHAVIOUR MOVES.** A return that was refused is credited; a repair's edit's triggered pairs are asked; the
   `KC-4` arm's population shrinks to the two predicates of §1.1 step 5 **and grows** by the unnamed route's regression
   (Class B). **Behaviour alone would be a PATCH** — that is `1.8.1`'s class (`D-104` item `4`).
2. **★ THE DECLARATION MOVES, AND IT MOVES CONSUMER-VISIBLY.** `RepairOutcome`'s `op` is no longer required and admits
   `null`, and a consumer reading `op` off a value typed `RepairOutcome` **must now narrow** — **the same class `D-102` gave
   the typing pass: *"the release is consumer-visible at the declaration even though nothing a call does moves"*.** **A
   patch changes behaviour "without adding a member, an arity, a type or a status"** (`PUB-DD-9`'s row, the ground
   `docs/L1/repair-listener-delivery.md` §9 prints) — **and this declaration moves a type, so it is not a patch.**

**SO: `MINOR`, unnumbered; the number is the release pass's** (`D-100`'s `1.7.0`, `D-102`'s `1.8.0` **and the `1.8.1` patch
are not reopened**), and the next line's candidate is **`1.9.0`**. **THE `PATCH` ALTERNATIVE, PRICED AND REFUSED:** it would
ship the behaviour and defer the types — **and the deferred half is `ST-F2` itself**, because a compile error on
`repair: () => { … }` is the defect the ruling was given for; **and a split cut has no honest notes row**, since the notes
would have to say *"the runtime credits what the declaration refuses"* and then unsay it.

**WHAT THE MINOR'S NOTES OWE — six things and no seventh:** (1) the version line and the tag's record, the release pass's;
(2) one change-list row naming **the credit moved to the failing pair's mark**, with `D-105` cited and this file named as the
declaration; (3) **the return's contract re-derived in one sentence** — `undefined` and `{ok: true}` are credited, the
returned `op` is informational, and the failed arm is the only return that fails; (4) **the joined triggers**, in one
sentence — a pair a repair's edit fires is asked by the commit's next pass; (5) **the unnamed route's regression, stated**
— a repair that does not pass the commit in is promised nothing (`D-103`) **and now lands on `KC-4` where it used to be
credited**, so no reader discovers it as a bug — **AND THE ROW MAY NOT BE WRITTEN UNTIL `Q-2` IS ANSWERED, because that
consequence is the behaviour `D-103` reserved to the architect and the notes cannot promise an unruled outcome**; (6) **the
shipped half** — the declaration's clause travels (`index.d.ts` ships) and the guide's does not unless the manifest carries
it (`D-51` item `1`'s lesson), **stated by the release pass rather than left to a reader.**

### 8.3 THE QUESTIONS THIS DECLARATION CANNOT SETTLE — priced, and sent up

**`Q-1` — THE REGISTRATION INSTANT IS A SECOND CREDIT SITE, AND THIS DECLARATION LEAVES IT UNMOVED.** `kernel-registration.mjs:615`–`:628`
reads `landedOp(attempt, result, null)` and credits on it; `D-91` (2) declares that route *"creditable by the same rule every
repair's return is — the op the write landed, returned as the repair's answer"*. **`D-105`'s words name the failing pair's
mark on a COMMIT's attempt, so this declaration reads them as the write path's, and the registration instant keeps `D-91`'s
rule.** **Priced, both ways:** **confirming it** costs nothing and keeps `G3-23` (`tests/e2e/registration-write-route.test.mjs:533`,
four repairs including `{ok: true}` with no `op`) and `screg_blind_10`'s `noop` arm (`blind-registration-instant.test.mjs:674`)
green, **at the price of TWO credit rules in one kernel** — a repair returning `undefined` is credited at a write and refused
at a registration; **moving it** is cheap in mechanism (**the route is the kernel's own function and returns the
`WriteRecord` — `registrationRoute`, `:492`–`:503` — so `landedOp`'s call can read `written.op` with no channel at all**)
**and costs two committed cells plus a re-derived `D-91` (2) sentence, and it is the registration refusal's behaviour, which
the just-landed registration-instant unit's blind set (`G3-23`, `P-SCRI-3`) has an open residual on.** **NOT TAKEN: the
asymmetry is declared here and the architect's word is what closes it.**

**`Q-2` — ★ THE UNSUPPORTED ROUTE'S OBSERVABLES REGRESS, AND THAT *IS* THE QUESTION `D-103` RESERVED.** Seven committed
cells (§7.4 Class B) assert a repair whose write names no commit, and four of the five things they assert are `D-103` item
`1`'s explicit NON-PROMISES. **This declaration re-derives them on that ground** — **and it puts up, rather than absorbs, the
fact that the bill which comes due is a BEHAVIOUR byte and not a cell edit: the caller's own write goes from a receipt to a
`ConstraintPassRefused`.** **`D-103` reserved exactly that question** (*"Whether the unnamed route should be REFUSED — a
behaviour byte, needing its own ruling and its own version"*), **and `D-105`'s carrier move reaches it as a consequence rather
than as an order.** **Priced, three ways:** **(i) confirm the consequence (recommended, and this file's reading)** — the
unnamed route's repair cannot be tracked (`D-46`), so its enclosing attempt failing is the honest outcome, and the seven
cells re-derive to the `KC-4` they now meet, at the price of one release-note sentence. **(ii) Refuse the route by name** —
the architect's own act, one status and one version, and `D-103` says it is his. **(iii) Keep the route credited** — the only
two mechanisms are *reading the RETURN on that arm alone* (`D-105` item `1` forbids it by name: *"the returned `op` is neither
required nor read"*) **or** *pinning a nested commit's ops into the enclosing attempt* (which crosses `D-46`'s tracking rule
and re-opens the class the `1.8.1` guard closed — a double-credit hazard on every nested write). **So the question asked is
narrow and it is not a cell permission: MAY THE UNNAMED ROUTE'S REPAIR FAIL ITS ENCLOSING WRITE, OR IS THAT THE REFUSAL
`D-103` KEPT FOR YOU?**

**`Q-3` — A FAILED-ARM REPAIR'S LANDED EDIT AND THE FLOOR PLAN.** `{ok: false, message}` after a landed write: nothing is
pinned, so the edit is swept only where an attempt op named its address (`D-89`'s geometry). **Priced:** **leaving it
(taken)** keeps `§5.4`'s two lines and `D-89`'s withdrawal of the credit axis; **appending a failed-arm repair's ops** would
make *"a failed attempt leaves the store exactly as it found it"* truer — **one line — and it would move a documented store
state on an arm nobody ordered it in, and re-introduce credit as the axis `D-89` withdrew.** **The architect's word decides
whether a refused repair's edit should be undone too.**

**`Q-4` — THE SENTENCE IS KEPT; ITS ROW IS *NARROWED* AND NOT CLOSED, AND THE ALTERNATIVE IS A TEXT CHANGE.** §5.1 keeps
`produced no op at <attempt address>` byte-for-byte and reads `D-88` (2)/open-items §6 row `5` **THROUGH** `D-105`: **the
op-denial half dissolves by carrier, and the address half survives on `(d2)`'s nested-attempt arm, where the repair's edit
landed at a beside address the sentence cannot name.** **Priced:** **leaving it (taken)** costs nothing and keeps `D-88` (2)'s
disposition honest — **the row stays OPEN, with its population narrowed in its own record**; **the alternative — withdraw the
template and mint a sentence naming the legs' absence** — is a shipped-refusal-text change, **and it would say no more than
the template does on the arms where the kernel holds no repair address to name** (the ground `D-88` (2) recorded is intact:
naming the repair's address on that arm needs a store reach `D-67` forbids). **Confirming §5.1 costs nothing; correcting it
costs a text byte and a version line — and it is the architect's.**

**`Q-5` — TWO BOOKKEEPING ITEMS THE LANDING PASS MUST NOT ABSORB.** **(a)** `RLD-5`'s two-write repair gains a second op in
`attempt.ops` under §2 PN-4 and **no committed cell measures it** — a cell is owed or the choice is narrowed to one op per
repair. **(b)** `docs/L1/open-items-2026-10-25.md §3` row `4` is **stale in its own text** (it cites `landedOp` at
`:497`–`:510` and says the ordinal ground *"is not applied"*; the ground landed 2026-10-26 at `:1124`–`:1129`), so the
disposition this declaration owes must print the correction rather than inherit the row's figure.

**`Q-6` — ★ A REPAIR THAT EDITS BY `delete` CANNOT BE ON THE SUPPORTED ROUTE AT ALL.** `delete`'s declared arity is
`delete(address, tier?)` (`index.mjs:564`; `index.d.ts:936`) — **it has NO commit position**, so a repair whose only edit is a
deletion opens its own commit by construction, lands on the unsupported route, and **is refused `KC-4` after this
declaration where the return's op used to credit it.** **`P-NEG-22` stays green** (it drives the refusal), and **no committed
cell drives a delete-shaped repair that is credited** — so nothing reds today and the hole is real. **Priced:** **declaring it
unsupported (taken, and `ORC-9` measures it)** costs one guide clause and says out loud what `D-103` already implies; **giving
`delete` a fourth position** is a member/arity move — a MINOR of its own, a `D-46`-class declaration and every generator
re-spelled — **and it is the only route by which a deletion-repair can ever be tracked.** **The architect's decision, not
this pass's.**

---

## ENVELOPE — the declaration this pass delivers

**THE CYCLE THIS PASS DROVE.** `role_l1_test_writer` ran **read-only** — this is a declaration pass and it writes no cell —
and returned the cell inventory this file's §7.4 red set and §7.1/§7.2 owed-cell list are built from; **`role_l1_examiner`
then examined the declaration at the bytes and returned `PASS WITH CORRECTIONS`** — **the fifteen findings are printed at
§0.1 and every one was re-verified before it was taken.**

**THE CREDIT DECLARED.** **The pair's mark (`attempt.appliedRepairs`, keyed by the pair's registry key) is the credit, and the
returned `op` is read by nothing** (`D-105` item `1`). **The predicate chain is five steps** (§1.1): the body returned; the
DECLARED FAILED ARM (`ok === false` + non-empty own `message`) fails with the caller's words; the legs are read once; **the
LANDING TEST — at least one leg carries a journal `op` — credits the pair and takes the pins**; and the **residual `KC-4`**
answers when the invocation landed nothing. **`undefined`, `{ok: true}`, `{ok: true, op}` and every value outside the arms are
CREDITED.** **The credited arm's final shape is `{ok: true}` with `op` optional and informational, and NO RETURN AT ALL is
required** (`{ok:true, op?}`-as-a-requirement is refused; `{ok:true}`-plus-`undefined` is the arm). **`KC-4`'s residual is TWO
predicates on ONE token:** `(d1)` the declared failed arm → the caller's words; `(d2)` the invocation landed nothing → the
residual template, **over `repairLegs`' FIVE absent arms** (no bracket · a nested attempt · no channel · **a channel that
throws** · **a non-array answer**), each read at its own line.

**THE RE-RUN'S CARRIER.** **The `1.8.1` leg, WIDENED from returned elements to ONE ELEMENT PER WRITE carrying that write's own
journal `op` and its `triggered` set** (§2.2) — **the brief's premise that the op already crosses is FALSE at the bytes and
is corrected at §0.2 (1).** **The legs are read once, through the two `1.8.1` guards; the re-run's context value is the leg's
`op.after.value` (reached because the leg's op is `attempt.ops`' tail, `:561` → `:698`); the triggers are the leg's
`triggered`; and the attempt pins `entry.opId` (the last leg's), `attempt.ops` (every leg's op, in order), the pair's mark,
`repairTriggered` and `repairPaired` — and the checkpoint is the PASS's, unmoved (`:1050`).** **The return's `op` sets no
pin.**

**THE TRIGGERS' JOIN.** **At the merge seat — after the credit and the pins, before the re-run and before `releasePending` —
the legs are split by `D-69`'s one membership test: a listener's handle to `pending` (the `1.8.1` merge, unchanged) and a
CARRIED PAIR's id to `attempt.repairPaired` (never `pending`).** **The next pass's snapshot is the same `pairsTriggered` call
with ONE more argument — the registry supplies the ORDER, the commit's set plus the joined list supply the MEMBERSHIP —
materialised once per run at the same instant (`CX-12`).** **De-duplicated by handle against `record.triggered` and against an
earlier repair's join; NEVER against `pending`; and a pair an earlier run checked off IS re-joined and re-asked, which is the
`1.8.1`-era repeat arm `(e)`/`(f)` and the loop guard `D-42` — no repair runs twice.** **`record.triggered` is UNMOVED** —
**on `A113` (D1)'s printed sentence (*"on a failing arm `triggered` stands verbatim"*) and on `kernel-commit.mjs:176`–`:178`'s
own read of `written.triggered`; the sentence *"`triggered` then stands as the store's own returned set"* is the TREE's
paraphrase and is marked as one, not given a ruling's verbatim mark** (`A112`'s row prints nothing about `triggered`; §3.2).

**THE ROLLBACK — INDEPENDENT.** **The restore mark is `D-63`'s and the returned op is not its instrument.** **`attempt.ops`
now carries ALL of the commit's ops: the commit's own landing (the write's or the delete's) plus EVERY op each credited
repair's invocation landed, in creation order, de-duplicated by `opId`** — **the leg's ops AND the commit's, and no op of
anything else.** **The floor call's plan is `floorCallPlan`'s, derived from `attempt.ops` alone (per distinct address, at
that address's first owed op, shallowest-first); the failing arm's undo plan reads the same list MINUS everything this arm
would have pinned — so a failed-arm repair's landed edit is swept only where an attempt op named its address (`D-89`'s
geometry, never credit).**

**THE SENTENCE.** **The `produced no op at <attempt address>` template is KEPT BYTE-FOR-BYTE and answers `(d2)` alone.**
**`D-88` (2)'s recorded defect is HALVED, NOT CLOSED:** the arm that denied an op the kernel was HANDED is gone (a repair
whose edit lands is credited and never reaches the arm), **and the address half SURVIVES on `(d2)`'s nested-attempt arm,
where the repair's edit landed at a beside address the sentence cannot name** — **so open-items §6 row `5` stays OPEN with its
population NARROWED in its own record, no refusal byte moves, and the store reach `D-67` forbids is still what a text change
would need.** **`landedOpDefect`'s two op-identity sentences are WITHDRAWN from the write path, and `landedOpDefect` plus its
private helper `opSpelling` are DELETED (no caller remains; the one import to remove is `landedOpDefect`'s)**; **`landedOp`
survives with its one registration caller.** **The write path's three messages become two.**

**THE TYPES.** **`RepairOutcome` = `void | {ok: true; op?: WriteRecord['op'] | null} | {ok: false; message: string}`** — **`undefined`
assignable, `op` optional/informational, `null` admitted; the failed arm unmoved.** **`ConstraintOutcome` keeps its three arms
and moves only through its `repair` member's alias.** **The type stays NARROWER than the runtime, and the gap is DECLARED, not
closed:** a value outside the arms is credited and not admitted by the alias — the mirror of `CommitCarrier`'s printed limit.
**No name is minted; `0` types added.**

**THE CELLS — NAMED, WITH THE RED SET READ.** **OWED:** `tests/e2e/op-free-repair-credit.test.mjs` (`ORC-1`…`ORC-9`,
`role_l1_test_writer`) and `tests/integration/js-constraints/op-free-repair-credit.test.mjs` (`ORC-I1`…`ORC-I6`,
`role_l2_test_writer`), plus `typecheck/`'s `ORC-T1`…`ORC-T3`. **★ THE EXISTING CELLS THAT RED — TWELVE, IN FOUR CLASSES
(`4 + 7 + 1`):** **Class A (4)** — `constraint-kernel-repairop.test.mjs:322`–`:373`, `:375`–`:409`, `:411`–`:455` and
`constraint-kernel-negatives.test.mjs:646`–`:709` (`P-NEG-18`): a four-position repair that lands, whose cell asserts the
RETURNED op is the credit. **Class B (7)** — `blind-constraints-unit.test.mjs:138`–`:161`, `:237`–`:262`, `:264`–`:275`,
`:277`–`:313`, `constraint-kernel-states.test.mjs:1574`–`:1672`, `repair-in-commit.test.mjs:86`–`:246`, `discard-witness.mjs:578`–`:696`:
the THREE-position route, whose four asserted goods are `D-103` item `1`'s own non-promises. **Class C (1)** — the typecheck
fixture's two unused directives and its un-narrowed `op` reading. **Class D — NOTHING ELSE *within the read set §0 prints*,
and the examination's read of the fixtures beyond it found no red either** (§7.4's `⟶` clause), **with the landing pass owing
the full sweep.** **AND ONE CELL WHOSE GROUND MOVES WITH ITS VERDICT UNMOVED — a RED→GREEN IS *NOT* CLAIMED:**
`blind-constraints-unit.test.mjs:183`–`:200`, the `PAR-C-8` `observable` cell of open-items §3 row `4`, **has answered `KC-4`
since the ordinal ground landed on 2026-10-26; under this declaration it answers `KC-4` for a different reason** (the
invocation landed nothing the commit can own, not a rejected identity) — **so that row's disposition is a GROUND change plus a
correction of its own two stale figures (`Q-5` (b)), not a verdict flip.** **THE `1.8.1` SET DOES NOT MOVE**
(`RLD-1`–`8`, `RLD-I1`–`I5`): **thirteen cells, no assertion changed** — `RLD-I4`'s GROUND moves (the failed arm, not an
op-less return), `RLD-I3`'s asked-set sentence is true of the listener half alone on its own listener-only fixture,
`RLD-I5`'s unasserted outcome figure becomes `KC-4`, `RLD-6` is green because the registration instant is unmoved (`Q-1`),
and `RLD-5`'s two-write repair gains an unasserted op. **The instrument limit is printed at §0: the red set is a READING, not
a run.**

**THE WRITE SET.** `state.mjs` (the leg's widening) · `kernel-attempt.mjs` (the credit, the pins, the residual, the pair-join,
the snapshot) · `kernel-foundations.mjs` (`pairsTriggered`'s second argument; `landedOpDefect`/`opSpelling` deleted) ·
`kernel-commit.mjs` (`attempt.repairPaired` at both mints) · `index.d.ts` (`RepairOutcome` and its docblock) ·
`typecheck/consumer-fixture.ts` · `docs/guides/package-use.md §7.6` (three dated clauses) ·
`docs/L1/repair-listener-delivery.md` (§3.4 seat 2 and `Q-5`) · `docs/L1/open-items-2026-10-25.md` (three dispositions) · the
two battery files and the twelve red cells · the release files. **`index.mjs`, `delivery.mjs`, `constraints.mjs`,
`kernel-terminal.mjs` and `kernel-registration.mjs` take NO BYTE, and each absence is named as a decision. No module, no
endpoint, no status, no member, no arity, no refusal message and no version byte moves; `19` modules / `61` endpoints and the
harness cap stand.**

**THE RELEASE CLASS.** **`MINOR`, marked and not numbered** — the behaviour moves AND the declaration moves consumer-visibly
(`RepairOutcome.op` becomes optional, so a consumer reading it must narrow), which is not `PUB-DD-9`'s patch row; the next
line's candidate is `1.9.0`, and `1.7.0`, `1.8.0` and the `1.8.1` patch are not reopened. The `PATCH` alternative is priced
and refused: the deferred half would be `ST-F2` itself.

**THE OPEN QUESTIONS SENT UP — SIX, PRICED.** **`Q-1`** the registration instant is a second credit site and stays on
`D-91` (2)'s rule — **two rules in one kernel**, and the move is priced both ways. **`Q-2` ★ the unsupported route's
observables REGRESS (seven cells) and that consequence IS the question `D-103` reserved** — *may the unnamed route's repair
fail its enclosing write, or is that the refusal `D-103` kept for you?* — a **behaviour** question, not a cell permission,
with the three routes priced. **`Q-3`** a failed-arm repair's landed edit and the floor plan. **`Q-4`** the sentence is kept
and `D-88` (2)/open-items §6 row `5` is **narrowed and not closed** (the address half survives on `(d2)`'s nested arm); the
alternative is a text byte. **`Q-5`** two bookkeeping items (a two-write repair's second op; a stale row's own two figures).
**`Q-6` `delete` has no commit position, so a deletion-repair can never be on the supported route** — the only route by which
it could ever be tracked is a fourth position on `delete`, and that is an architect's MINOR.

**THE PATH THIS PASS WROTE.** `docs/L1/op-free-repair-credit.md` — **one path, and nothing else in the tree was touched,
staged or committed. `strata/decisions.md` `D-105` was read and not edited; every code, test, guide, declaration and ledger
path named above was read and not edited; no code byte, no test byte, no doc byte outside this file and no `strata/` byte
moved.**
