# Part — THE THREE FURTHER ARMS (`α`, `β`, `γ`): the re-run's throw rolls back, the composition's floor is corrected, and the save's eligibility reaches a PURGE

**WHAT THIS PART IS.** `U-STOREROOM-FILE-SAVE-COVERAGE` is landed and green (`1,242` node tests, `1,241` pass,
`0` fail, `1` skipped; `675` Rust pass, `0` fail; typecheck `0`, build `0` — the landing's own legs,
`verification.md §5`). **The property register then surfaced three further acts which `D-106` item 2 (*"the file
saves after ANY action that changes the file-tier data, without exception"*) and `D-107` item 1 (*"a refusal rolls
back, any exception is a defect"*) reach and no arm of the directory covers, and the architect has ordered all
three CLOSED IN THIS UNIT, BEFORE THE RELEASE CUT.** This part declares them, and it lands three pins
(`PIN-15`, `PIN-16`, `PIN-17`) and one numbered question (`Q-2`) at `contract.md §8`. **It is a `carrier` part and
it is AUTHORED in this pass: it restates no pin, it applies `PIN-15`–`PIN-17`, and where it corrects a pin it
corrects it AT THAT PIN.**

**FIGURES, INSTRUMENT AND DATE, ONCE.** **Every `path:line` here was read with the `read`/`grep` file tools on
2026-11-02 at the landed bytes; THIS WALL CARRIES NO SHELL, so no leg was run and every behavioural verdict here
is `READ-AT-THE-BYTES` or `MEASURED-L0` (the register's own printed findings, cited at their sites), never `[T]`.**
**The file lengths this pass read at their own last line, where it cites them: `src/store.rs` `3,419` ·
`bindings/js/src/entry/constraints.mjs` `3,665` · `bindings/js/src/entry/kernel-foundations.mjs` `1,454` ·
`bindings/js/src/entry/kernel-attempt.mjs` `1,388` · `bindings/js/src/entry/kernel-registration.mjs` `1,099` ·
`bindings/js/src/entry/delivery.mjs` `938` · `bindings/js/src/entry/kernel-terminal.mjs` `510` ·
`bindings/js/index.mjs` `1,735` · `bindings/js/index.d.ts` `1,580` · `tests/e2e/file-save-coverage.test.mjs` `811` ·
`tests/e2e/file-save-coverage-properties.test.mjs` `1,257`.** **`strata/brief.md §2` still prints `store.rs` at
`2,472` and `index.mjs` at `1,417`; those are the figures of their own dates and are not this part's**
(`claims.md §2.2` carries the correction, owned elsewhere).

---

## §A · ARM `α` — A CONSTRAINT BODY THAT THROWS AT THE RE-RUN COMPOSES THE REGISTRATION'S ROLLBACK

### A.1 The defect, at its bytes

**The re-run's body-throw arm leaves a landed edit standing, and it does so by LEAVING THE FUNCTION.** Read today:

1. `bindings/js/src/entry/kernel-registration.mjs:660` — `const failed = registrationRerun(kernel, attempt, produced, key);` — **the call is NOT inside any `try`**, and it stands after the route has landed.
2. `:767`–`:782` — inside `registrationRerun`, the pair's body is invoked in a `try`, and **a throw is marked at that frame and re-thrown**: `throw markBodyThrow(body, attempt.address, attempt.log)` (`:779`).
3. So the throwable leaves `registrationRerun`, then leaves `registrationAttempt` at `:660`, then leaves
   `registrationEvaluation` at `:396`, and reaches the caller frame at `:246` — **which does not catch it either**:
   `:247`–`:253` withdraws the registry row and re-throws only for the **returned** refusal (`refused !== null`).
4. **`closeRegistrationAttempt` (`:867`–`:931`) IS NEVER REACHED.** And the close is the whole of the unit's
   machinery at this instant: **the composition** (`:891`–`:903`, `composeRollback`), the attempt's own `report`
   (`:905`–`:914`), `kernel.closed.set` (`:918`), `dropHandoff` (`:924`) and `kernel.live.delete` (`:925`). **So on
   this arm: the route's `file`-tier landing stands in memory and NO SAVE RAN (the save is the passing close's,
   `:871`–`:889`), the attempt is left `status: 'open'` in `kernel.live` with no report, and the registry row the
   caller's act wrote is left standing.**

**MEASURED, and filed by the register rather than asserted**: `tests/e2e/file-save-coverage-properties.test.mjs:927`–`:951`
drives exactly this (`addConstraint` whose body throws on its second ask; the repair's route-write lands at
`['alpha']` at the `file` tier) and prints, as a finding, that the address reads the landed value after the
refusal while the bytes still read the pre-call image. **`D-107` item 1 reaches it and `D-108` item 2 calls that
sentence unconditional, so this is a defect and not a boundary.**

### A.2 The arm, in four parts, each at a named site

**(a) THE FRAME THAT OWNS THE LIST CATCHES, COMPOSES AND CLOSES — `kernel-registration.mjs:660`–`:664`, ONE
POSITION.** `registrationAttempt` wraps the re-run call: on a throw it calls
`closeRegistrationAttempt(kernel, attempt, landed)` and then **re-throws the value the catch received**. `landed`
is the frame local `:613` and the composition's scope; **`attempt.ops` is NOT the scope** (`:651` adds only a
repair's *credited* op, and `PIN-10` (i) already says why that list cannot be the composition's). **Nothing else
in that function moves**: the credited `appendOwn(attempt.ops, produced)` and the two log-entry rewrites stand
(`:651`–`:655`), the three returning refusing closes stand (`:636`, `:647`, `:662`), the passing close stands
(`:667`), and `registrationRerun` itself is **byte-unmoved**, its mark and its re-throw included (`:769`–`:779`).

**(b) THE FLOOR PLAN IS `D-40`'s, UNCHANGED, AND THIS IS ITS THIRD CALLER.** `composeRollback(kernel, attempt,
landed)` is the landing's own instrument (`kernel-terminal.mjs:242`–`:290`) over `floorCallPlan`
(`:330`–`:356`): **one store `rollback` call per DISTINCT ADDRESS the route's landings touched, at that address's
own FIRST owed op, SHALLOWEST ADDRESS FIRST, creation order within a length, a candidate under an already-issued
address skipped as covered or unreachable.** The plan's declared property is inherited whole: **the issued
addresses form an antichain, their candidate sets are pairwise disjoint, and the composition's ordering can never
be the producer of a floor** (`:317`–`:322`). **`composeRollback` gains no position, no member and no branch**:
`PIN-10` (ii) already made its op list a position for its second caller, and this is that position's second
value.

**(c) THE LOG: ONE `outcome` ENTRY WHERE A CALL IS ANSWERED BY A CODE, AND NO ENTRY ELSEWHERE** — `PIN-10` (iv)'s
rule, applied to the fourth arm, at the close's existing site (`:899`–`:903`, byte-unmoved). **AND IT REACHES THE
CALLER WITHOUT A SECOND CARRIER**, which is the one fact this part had to check rather than assume:
`markBodyThrow` carries **the attempt's own list by reference** (`kernel-foundations.mjs:236`–`:241`, `carried.log
= Array.isArray(log) ? log : []`) and the crossing reads it at conversion time
(`constraints.mjs:1347`, `log: refusalLog(carried.log)`) — **so the close's entry stands in the very list the
crossed refusal carries.**

**(d) THE CALLER'S FRAME WITHDRAWS — `kernel-registration.mjs:246`–`:253`, ONE POSITION.** A `catch` around the
`registrationEvaluation` call that runs `withdrawRegistration(kernel, address, id, standing === undefined,
adopted)` and **re-throws the same value**. **This is not a new rule: it is the rule that frame already states**
(*"a refused registration leaves the registry exactly as it stood"*, `:248`–`:251`) **reaching the one refusal arm
that never came back through it**, and the caught value crosses **by identity** (`caught === thrown`), as
`D-35`'s read half and `fail-surface.md §1.1` item 5 require.

### A.3 What the caller then sees, and the body-throw rule

**THE STATUS IS RANK `18` `ConstraintBodyThrew` ON EVERY ARM, THE FLOOR'S CODE IS IN THE LOG AND NEVER IN
`status`, AND THE THROWABLE IS STILL THE BODY'S OWN VALUE.** In full:

- **The form**: `{status: 'ConstraintBodyThrew', message: <the store's generated sentence, plus the `DEF-AK`
  clause saying the value does NOT cross as this refusal>, log: <the synthetic attempt's list, verbatim>, address:
  <the pair's address>}` — built by `registrationCrossing` (`constraints.mjs:505`–`:523`) and `bodyThrowRefusal`
  (`:1308`–`:1366`), **both byte-unmoved by this arm**.
- **The log** carries, in its own order, the registration's `constraint-check` and `repair-run` entries
  (`:604`, `:606`), the `repair-run`'s rewritten `landed <opId>` sentence (`:655`), and — **only where an issued
  call was answered by a code — ONE `outcome` entry whose `state` is `null` and whose message names the store's
  code and the op id it was met at** (`:900`–`:901`). **`state` IS `null` AND NOT `KC-8`, for `PIN-10` (iv)'s
  reason read one arm over**: the thrown form's `status` and the entry's `state` are one token
  (`kernel-terminal.mjs:56`–`:63`), and **writing a `KC` token beside a rank-`18` refusal would break the
  one-token clause to report a token no caller can act on.**
- **The refusal's floor on this arm is `JournalOpUnknown` OR the narrowed `RollbackCompacted`** — see `§B`: the
  composition calls the same store entry the landing calls, so it meets the same two codes.
- **The bytes**: the composition's reversal is what makes the image right (`D-107` items 1–2, `PIN-10` (vi)), and
  **a registration whose route wrote no byte of its own** (the verb performs no file I/O on any arm,
  `src/store.rs:2479`–`:2484`) **finds `save_file_delta`'s projection equal and writes nothing** — the `0`
  serializations `FSC-ARM1-REFUSED-FILE` already measures (`file-save-coverage.test.mjs:281`–`:288`). **This arm
  therefore adds no save and may not: a second save would give one image two saves** (`D-107` item 2).

**THE RULE THAT A BODY'S THROWABLE CROSSES UNCONVERTED IS NOT BROKEN, AND HOW IT IS KEPT IS THE POINT.** The
kernel's frames convert nothing: they **mark** (`markBodyThrow`, `kernel-foundations.mjs:236`–`:258`) and the
**entry's crossing** is the only converter (`constraints.mjs:1376`–`:1382`, `:514`–`:522`), **which is exactly
today's division.** This arm adds an act **beside** the throw — a composition and a close — and **never wraps,
replaces, re-words or re-classes the throwable**: the catch re-throws **the value it received**, which is the
marked value `registrationRerun` threw. **AND THE FROZEN-VALUE CARRIER IS HONOURED**: `markBodyThrow` answers
`{value: thrown, [CONSTRAINT_BODY_THREW]: carried}` where an object refuses the mark (`:242`, `:253`–`:257`), and
that carrier is what crosses — the fix re-throws the caught value and never re-marked `thrown`, so a frozen,
sealed or trap-refusing throwable crosses by the same path it always did.

### A.4 The one sentence inside code, and the one doc clause

- **`constraints.mjs:1337`–`:1343` — `recorded === false`'s sentence, RE-DERIVED, and `recorded` STAYS
  `false`.** It reads *"no entry of this failure's `log` records it — `log` is the declared empty list where no
  attempt stands"*. **On this arm an attempt DOES stand and the list is NOT empty** (it holds `constraint-check`,
  `repair-run`, and possibly the floor's `outcome` entry), **and still no entry records the throwable's form** —
  the re-run records none (`kernel-registration.mjs:773`–`:778`: `DEF-AK`'s recorded arm is the landing's). **The
  replacement says that, and names the list it crosses with, so no arm points at a `log` that does not carry
  what the sentence claims** (`bodyThrowRefusal`'s own obligation, `:1333`–`:1345`).
- **`kernel-registration.mjs:844`–`:846` — the close's doc clause says the close *"REACHES the per-op rollback
  composition on its three REFUSING arms"*.** With this arm it reaches **four** (`:636`, `:647`, `:660`'s new
  catch, `:662`). **A count of arms in a clause is corrected at its own line; no other byte of that clause moves.**

### A.5 What this arm does not settle, declared rather than left

- **The attempt's report on this arm** is a `'failed'` report in `kernel.closed` for an act whose caller received
  a rank-`18` refusal and no rank-`19` one. **Declared: the report is a record of an ATTEMPT and not of the
  refusal**; its `rollback` member carries the composition's steps (`PIN-10` (iii)) and the synthetic attempt's
  `KC-4`/`KC-5`/`KC-6` token still reaches no caller. **No member of the report moves.**
- **A throw at the FIRST evaluation** (`:373`–`:381`) is not this arm: it opens no attempt, lands nothing, and
  already crosses as itself — **its mark carries the `[]` its clause declares (`:357`–`:361`) and stays so.**
- **A throw at the LANDING** is not this arm either: `kernel-attempt.mjs:757`–`:790` already calls
  `terminalComposed` — the terminal act with the composition — before it marks and throws. **Byte-unmoved, and
  named here so no pass mistakes the symmetry for an omission.**

---

## §B · ARM `β` — THE COMPOSITION'S FLOOR: THE CURE IS THE REGENERATION IT ALREADY INHERITS, AND `PIN-14` (ii) IS FALSE

### B.1 The defect, at its bytes

**`PIN-14` (ii) declares that *"`STORE_FLOOR_CODES` KEEPS ITS TWO ELEMENTS AND ONLY ONE OF THEM IS NOW
PRODUCED … it fires on `JournalOpUnknown` alone."* THE STORE PRODUCES THE OTHER.** The floor branch is
`kernel-terminal.mjs:272`–`:274` (`STORE_FLOOR_CODES.includes(answer)`, the table at
`kernel-foundations.mjs:80` is two elements and is unmoved), and it reads the answer of
`attempt.store.rollback(call.opId)` (`:264`), which is the published member (`index.mjs:687`–`:728`) over the
addon entry over `Store::rollback` (`src/store.rs:2772`–`:2865`). **That function refuses `RollbackCompacted` on
exactly one state** — `:2792`–`:2802` finds a compacted entry in scope and calls `regenerate`, and `regenerate`
returns `Err(rollback_compacted(op_id))` where `read_file_image()` answers `Refused` (`:3093`–`:3095`, `D-109`'s
narrowing) — **and it refuses BEFORE a byte of the register moves** (`:3091`–`:3095`). **So a refusing
registration whose composition meets that state gets a call that undoes nothing, records a step with
`failed: true` and the code as its `answer` (`kernel-terminal.mjs:265`–`:287`), appends ONE `outcome` entry
(`kernel-registration.mjs:899`–`:903`), refuses at rank `19` — and leaves its landing standing.**

**MEASURED AND FILED**: `tests/e2e/file-save-coverage-properties.test.mjs:952`–`:985` drives it (a `journalLength:
1` store, a `filePath` overwritten with text that is not a register, a repair that lands twice and then declines)
and prints both consequences: the landed edit stands, and `PIN-14` (ii)'s sentence is false of this arm.

### B.2 The two lawful cures, priced, and the one taken

**(ii) THE COMPOSITION REGENERATES THE WAY `D-108` TAUGHT A REVERSAL TO — AND THE REGISTRATION'S COMPOSITION
ALREADY INHERITS IT, SO THE FINDING IS A DECLARATION GAP AND NOT A CODE GAP.** The reversal's regeneration is not
a package act: it is `Store::rollback`'s own arm (`src/store.rs:2792`–`:2802`, `:3090`–`:3119`), reached through the
same entry `composeRollback` already calls. **So on every state the regeneration can reach, the registration's
composition rebuilds the last valid state and the landing does not stand** — `D-108` item 2's *"A pass that keeps
the all-or-nothing strand as the arm's final answer has left this row"* is satisfied **by the call, at no byte of
this unit's own.** **THE PRICE IS THEREFORE: TWO CORRECTED DECLARATIONS AND ONE CORRECTED CODE CLAUSE, AND ZERO
BEHAVIOUR BYTES** — `PIN-14` (ii) (corrected at its pin), `PIN-13` (vi)'s *"the floor branch fires only where the
store answers a code, which from this pass on means `JournalOpUnknown` and not `RollbackCompacted`"*, and
`kernel-terminal.mjs:237`–`:240` (its clause says the same thing in code). **`PIN-10` (v)'s *"the composition's
coverage is total"* is re-read as *"total on every state in which the store's reversal answers"*.**

**(i) THE REGISTRATION REFUSES ITS REPAIR'S LANDING BEFORE IT LANDS WHEN THE COMPOSITION COULD NOT UNDO IT —
REFUSED, ON THREE PRICED GROUNDS.**
1. **IT NEEDS A READ-ONLY STORE ANSWER THE TREE DOES NOT HAVE.** The predicate is `read_file_image() ==
   Refused` (`src/store.rs:3093`), and both readers of it are private: `save_owed` (`:1517`) is read by
   `commit_file` alone (`:1458`), and `durable_projection` (`:3238`) is the mark's. The only entries that answer
   are `rollback` — which **moves the register** (`:2803`–`:2850`) — and `commitFile`, which **writes**. **So this
   cure mints a read-only addon entry or a second form of an existing position, and the addon's `15` moves**: the
   whole census family turns in both batteries and at all three scopes (`contract.md §8`'s `Q-1` pricing
   enumerates the nineteen files). **Refused by `PIN-6` (i) and `D-113` item 1.**
2. **IT IS A FALSE REFUSAL, AND BROADER THAN THE DEFECT.** The state is **store-wide** (the whole image is
   unreadable), so every registration on that store would be refused — **including a pair that passes its own
   evaluation and lands nothing**, which is a lawful registration refused for a condition its own act never
   meets. **That is a new refusal arm the corpus does not declare.**
3. **IT IS NOT KNOWABLE AT THE RIGHT INSTANT.** The composition's scope is the ops the route landed, and those do
   not exist before the repair runs: a pre-flight can ask about an ADDRESS, not about ops. **So the cure buys the
   one state at the price of refusing registrations it has no ground against.**

**(iii) DOING NOTHING is not a third cure** — it is the defect, and `D-108` item 2 rules the strand out by name.

### B.3 What is declared where even the regeneration cannot help — the corrupt image

**DECLARED, AND NOT AS BEHAVIOUR.** On the one state `D-109` narrowed the token to — **a temporally-bounded
candidate set holding a compacted entry AND a standing `filePath` whose image the store's loader cannot read as an
object** — the store's reversal refuses its CALL before moving the register, so **no reversal in that store can
run at all**: the refusal's ground is the IMAGE, which the store reads WHOLE (`read_file_image`, `src/store.rs:3093`; `durable_projection` at `:3238` is the same one read), **so every issued call of the composition would meet it and so would a write's failing pass (`kernel-terminal.mjs:51`–`:63`) — which is why this is not a registration arm alone. THAT NO OTHER CALL COULD SUCCEED IS A DECLARED CONSEQUENCE OF A STORE-WIDE READ AND NOT A MEASUREMENT: the state is reachable only by corrupting a file by hand, and no drive in this corpus takes it.** **The consequences, each
stated so the release pass cannot read this as closed:**

- **the landed edit STANDS in memory and NO SAVE RAN** — memory and file diverge, and the divergence is exactly
  `D-106` item 1's ride-along shape;
- **`PIN-14` (ii)'s *"`JournalOpUnknown` alone"* is FALSE** and is corrected in this unit, whatever the answer to
  `Q-2` (`§D.2`);
- **`D-107` item 1's *"without exception"* HAS AN EXCEPTION HERE, AND THIS CONTRACT MAY NOT GRANT ONE.** **The rule
  is the architect's; an exception to it is his to give or to close.** **So it is PUT, numbered and priced, as
  `Q-2` at `contract.md §8`** — with the recommendation and its cost — and **until it is answered this arm is
  `OPEN-BY-RULING`: it may not be reported closed and no release note may carry `D-107` item 1 as unconditional.**
- **what the caller sees meanwhile** is the arm's existing form: rank `19` `ConstraintRefusedAtRegistration` with
  ONE `outcome` entry naming the store's `RollbackCompacted` and `state: null` (`PIN-10` (iv), unmoved) — **so the
  refusal tells the truth about what it met and lies about nothing it did**; what is missing is that it did not
  undo.

### B.4 The cells this arm owes

- **`PIN-14` (ii)'s assertion**, at `P-FSC-3`'s own block (`file-save-coverage-properties.test.mjs:970`–`:975`):
  the entry's message **NAMES `RollbackCompacted`** — the block currently asserts only that one `outcome` entry
  stands with `state: null`, and asserts nothing about the code, which is how the false pin survived.
- **A deterministic ordinary-compaction cell** (`FSC-ARM1-REFUSED-COMPACTED`, new, at
  `tests/e2e/file-save-coverage.test.mjs`): a refusing registration over a store whose journal has compacted the
  composition's candidate set leaves **no** landed edit standing, and the bytes are byte-identical — **the arm
  `P-FSC-3`'s generator reaches only statistically** (`journalLength` `1`–`4`, its own sentence at
  `verification.md §4`).

---

## §C · ARM `γ` — A LOWER-PERSISTENCE WRITE OF A **CONTAINER** PURGES THE `file`-TIER VERSION, AND THE SAVE'S ELIGIBILITY MUST REACH IT

### C.1 The defect, at its bytes

**THE ACT, AND THE ASYMMETRY THAT MAKES IT EXACT.** `Store::write` takes `doomed` = every version at
`rank ≤ rank(write tier)` (`src/store.rs:2409`–`:2413`) **and then, for a CONTAINER value, one more**: where the
least-persistent version standing at the pair is a **LEAF** (`link_of(reference).is_none()`) whose tier outranks
the write's, that version is pushed into `doomed` too (`:2414`–`:2425`) and removed (`:2439`) before the container
is minted at the write's own tier (`:2440`). **So a `mem`-tier (or `temp`-tier) write of a CONTAINER over an address
holding a `file`-tier scalar DESTROYS the `file` version.** **A SCALAR write over the same address pushes nothing:
the `file`-tier version STANDS beside the new one, and NOTHING DURABLE MOVED on either side of the pair** — **and
the unqualified read's direction, which an earlier draft of this part got backwards and an examiner's read
corrected, is the zero-tier selection's own: `TierSel::All` resolved to the LOWEST rank, i.e. the least
persistent version, so a shadowing scalar is what the unqualified read ANSWERS and the durable version is the one
it hides.** **That direction is the battery's, not this part's, and it is asserted where it was measured**
(`tests/e2e/file-save-coverage-properties.test.mjs:500`–`:501`) — **it changes nothing in this arm's subject,
which is that the durable version is still STANDING (the store's own `delete(addr, 'file')` receipt still names
`['file']`, and a `file`-narrowed read still answers it) and that no byte therefore is owed.**

**AND NOTHING SAVES.** `save_owed` (`:1517`–`:1529`) answers `false` for any op whose own `tier` is `Some` and not
`File` (`:1522`–`:1524`) — its second disjunct is reserved to a TIER-LESS op (`:1511`–`:1513`) — **and the
package's gate never even asks**: `delivery.mjs:792` reads `answer.op.tier === 'file' || answer.op.tier === null`.
**So the version leaves the memory, the file still holds it, and A FRESH BOOT RESURRECTS THE VERSION THE MEMORY NO
LONGER HOLDS** — `D-106` item 2's rule reached by an act no arm of the unit covers.

**MEASURED AND FILED**: `tests/e2e/file-save-coverage-properties.test.mjs:503`–`:522` drives both halves and
asserts them — the store's own receipt answers `tiers: []` after the container write, the image is unmoved, the
modification state never moves, and a fresh boot reads `value "leaf"` where the acting instance answers
`value {"k":1}`. **The block's own head says a fix of either route turns it red, which is the point.**

### C.2 The store's eligibility: the SECOND DISJUNCT'S READING IS CORRECTED, NOT A THIRD DISJUNCT ADDED

**THE GROUND DOES NOT MOVE. `PIN-4` (i)'s sentence stands whole: *an op is eligible exactly when THE ACT IT NAMES
MOVED AT LEAST ONE VERSION STANDING AT `Tier::File`*.** What moves is **how the store reads *moved* on its own
record**, and the correction is forced by `γ` rather than chosen:

- **AS SPELLED, the second disjunct reads *"its `captured` set holds a version at `Tier::File`"*** — which is
  correct for the whole-target delete **only because everything a delete captured leaves**, and wrong the moment
  a write can purge a `file` version while another `file` version survives... or, as here, can purge one while its
  own `captured` still holds it. **It is also a CARDINALITY test where the rule is a DEPARTURE test**, and the
  shadow case is what makes that visible: a lower-tier SCALAR write's `captured` **also** holds the `file`
  version, so a cardinality reading would make every shadowing write eligible and write a byte for a datum
  nothing durable moved — the very defect `P-FSC-1`'s silent arms are built to catch.
- **AS CORRECTED**: **an op is eligible exactly when at least one version standing at `Tier::File` LEFT THE
  REGISTER DURING THE ACT** — wrote over, replaced at its own tier, **or purged** — **and the store reads
  "left" off two records it already holds on the entry**: `Entry::captured`, the pair's pre-state taken at
  `:2383`, and the entry's own post-state taken at `:2459`–`:2464`, both `Vec<Captured>` with `Captured::tier`
  (`:564`–`:578`). **A `file`-tier `Captured` in the pre-state with NO COUNTERPART in the post-state left the
  register during the act.** **So the first disjunct (`op.tier == Some(Tier::File)`) is unmoved, the second
  becomes this departure test, and the whole-target delete's arm stays right for free** (its post-state holds
  none of what it removed). **NO MEMBER IS MINTED: `Entry` gains nothing, `Captured` gains nothing,
  `JournalOp::tier`'s `Tier | null` is unmoved, `save_owed`'s arity is unmoved and its one reader is still
  `commit_file` (`:1458`).** **`PIN-6` (i)'s census stands whole.**

**THE SHADOW CASE, EXPLICITLY, BECAUSE IT IS THE NEGATIVE THAT KEEPS THE FIX FROM BEING "ANY LOWER WRITE SAVES":**
**a scalar write at a lower tier SHADOWS and moves nothing durable, so it OWES NOTHING and NOTHING IS WRITTEN** —
the departure test answers `false`, `commit_file` returns before `write_file`, and the modification state does not
move. **And a `mem`/`temp` CONTAINER write that PURGES a `file` version OWES A SAVE**, and gets one. **The two
controls the unit already carries stay the controls they are**: `FSC-ARM1-MEM`
(`file-save-coverage.test.mjs:234`–`:250`) and `FSC-ARM2-NEG`/`FSC-ARM3-NEG` (`:360`–`:380`, `:401`–`:415`) drive
addresses that hold no more-persistent version; **`P-FSC-1`'s boundary block's SCALAR half stays the silent
control** and its `file`-tier receipt keeps naming `['file']` (`:495`–`:501`).

### C.3 The gate: what LEAVES the terminal arm, and why the substitution is not a second mechanism

**WHAT LEAVES: THE TIER CONJUNCT WHOLE — `delivery.mjs:792`'s `(answer.op.tier === 'file' || answer.op.tier ===
null)` — AND THE CLAUSE THAT SPELLS IT AT `:785`–`:791`, whose last sentence (*"A `mem`- or `temp`-tier op remains
outside at this gate, because it cannot have moved a `file`-tier version"*) `γ` FALSIFIES BY NAME.** What remains
of the gate is **the kernel's own mark** (`record[SETTLED_ON_THE_PASSING_ARM] === true`), **a leg that stands**
(`answer !== null && answer !== undefined`) and **an op that stands** (`answer.op !== null && answer.op !==
undefined`) — the four tests above `:792` — and then the one call it already makes, `commitFile(record.op.opId)` (`:826`), which **the store answers with
`save_owed`.**

**WHY IT IS NOT A SECOND MECHANISM, IN THREE STEPS.**
1. **`save_owed` IS THE UNIT'S ONE ELIGIBILITY GROUND** (`PIN-4` (i)); no second ground is introduced here and
   none is moved.
2. **The conjunct the gate carried was a PRE-FILTER APPROXIMATING that ground from what the package can see, and
   `PIN-4` (ii) said so in its own words** — *"the package narrows its test to what it can see and the store
   adjudicates what it cannot"*. **`γ` removes the last class the pre-filter could see**: a `mem`- or `temp`-tier
   op **can** have moved a `file`-tier version, so the pre-filter's subject is gone and what is left is not a
   predicate but **the ground itself, asked directly**. **A gate is narrower than the ground only while it is
   sound; an unsound pre-filter is not a second opinion, it is a wrong one.**
3. **The store's answer is unchanged and unmoved in its negative direction**: where the act moved nothing at
   `Tier::File`, `commit_file` returns `Ok(())` before `write_file` (`:1458`–`:1460`), **so the four conforming
   controls (`PIN-6` (iii)) stay green and the silent arms stay silent** — **the pre-filter's job was to avoid
   these calls, and avoiding them is no longer worth being wrong about which arms owe a save.** **THE PRICE, SAID
   PLAINLY: one addon call per passing write's and delete's op that the old gate would have skipped.** **It is a
   call and not a byte** — `save_owed` is a predicate over the entry's own records and the store performs no I/O
   until it answers `true` — and **`P-FSC-2`'s "no act serializes the image more than once" is unmoved** because
   the early return stands before the serializer. **AND TWO FURTHER STOPS STAND BEHIND IT, NAMED SO THE
   SUBSTITUTION IS NOT READ AS A WIDENING OF WHAT MAY BE WRITTEN**: an op id no standing entry names is a no-op
   (`src/store.rs:1451`–`:1457`), and an entry whose own save has already been performed is a no-op
   (`:1461`–`:1463`, the once-per-record mark). **So the store keeps three refusals and the package keeps none —
   which is the shape the once-per-record law wants.**

### C.4 `γ`'s second position — the registration's close, and why it is a CANDIDATE FILTER and not a second ground

**`lastFileLanding` (`kernel-registration.mjs:938`–`:947`) filters `op.tier !== 'file'`, so a registration whose
repair landed a `mem` CONTAINER purge saves nothing at the close** — `§A`'s instant (III) reaching an act `PIN-3`
(iii) declared as *"no save is owed"* on the strength of the same false sentence. **The close cannot take the
terminal arm's cure verbatim, and the reason is structural rather than a preference:** the close must name **one**
op (`commitFile`'s one position), the store's answer does not say whether it wrote, **and naming the route's last
op at ANY tier would lose an earlier `file`-tier landing's save** (the store marks `saved` on the entry it was
handed and writes the whole image; a later `mem` op that owes nothing would return before writing). **So the close
keeps a candidate filter and widens it by ONE disjunct the package CAN see:**

> **the last landing whose op is `file`-tier, OR tier-less, OR A WRITE AT A TIER BELOW `file` WHOSE CARRIED VALUE
> WAS A CONTAINER** — the only class that can purge a `file`-tier version, because the purge is the container's
> minting (`src/store.rs:2417`–`:2425`) and a scalar shadows.

**THE CARRIER IS A SECOND FRAME LOCAL, AND NOT A MEMBER** (`PIN-3` (ii)(a)'s device): `registrationRoute`
(`:503`–`:524`) has the `value` in hand at `:512`, so it records the fact beside the landed op in the list the
close reads. **IT IS A CANDIDATE SELECTION AND NOT AN ELIGIBILITY DECISION**: the store's `save_owed` remains the
only ground, and a container write over a CONTAINER target — which purges nothing — is answered `Ok(())` with no
byte written. **`attempt.ops`, the nine-member attempt record and the report's five members are unmoved.**

### C.5 What this arm does not settle

- **`temp`-tier writes** reach the same arm where a `file` version stands below a leaf, **and are covered by the
  same sentence**: the departure test is tier-agnostic by construction and the gate no longer names tiers.
- **Whether a `mem`-tier write ever *should* purge a durable version** is **not** this arm's: it is the store's
  `W-6`/re-mint semantics, declared in `docs/specs/storeroom-native/` and unmoved. **This arm's subject is only
  that the bytes follow the act.**
- **`§9.4` IS NOT WIDENED** (`D-107` item 3): a `mem`-tier write's failed save answers `FileCommitFailed` like any
  save that cannot land, and `§9.4`'s narrowness is not falsehood — **it names one arm correctly**, and this
  contract adds no sentence to it (`clauses.md §10.1`).

---

## §D · THE WRITE SET AND THE CELLS, AS A DELTA

### D.1 The code positions — EIGHT, ALL INSIDE THE TEN FILES `PIN-1` (i) ALREADY NAMES

| arm | file | positions | what moves |
| --- | --- | --- | --- |
| `α` | `bindings/js/src/entry/kernel-registration.mjs` | `:660`–`:664`; `:246`–`:253`; the doc clause `:844`–`:846` | a catch that composes and closes before the re-throw; a catch that withdraws and re-throws; one arm count in a clause |
| `α` | `bindings/js/src/entry/constraints.mjs` | `:1337`–`:1343` | `recorded === false`'s sentence re-derived (one sentence; `recorded` stays `false`) |
| `β` | `bindings/js/src/entry/kernel-terminal.mjs` | `:237`–`:240` | the floor's two-element table read as it stands: both codes fire (`PIN-14` (ii) corrected) |
| `γ` | `src/store.rs` | `:1517`–`:1529` | `save_owed`'s second disjunct: CARDINALITY → DEPARTURE |
| `γ` | `bindings/js/src/entry/delivery.mjs` | `:779`–`:793` | the tier conjunct leaves the terminal arm's gate |
| `γ` | `bindings/js/src/entry/kernel-registration.mjs` | `:503`–`:524`; `:938`–`:947` | the route records the carried value's kind; the close's candidate filter widens by one disjunct |

**NO NEW FILE, NO NEW MEMBER, NO NEW ARITY, NO NEW STATUS, NO NEW ENTRY.** **The addon's `15`, the instance's
fourteen, the twenty statuses, the barrel's four lines and six names, `OpIdArg`'s six declared values and its
two per-entry readings, `RollbackResult`'s three members, the attempt's nine and the report's five all stand
byte-for-byte.** **`src/error.rs` is not opened** (`PIN-14` (v)); **`src/records.rs` is not opened**; **no
manifest, no `RELEASE-NOTES.md`, no `BK-1`.**

### D.2 What is corrected in the directory, by pin

- **`PIN-14` (ii)** — corrected at its pin: the table keeps two elements **and BOTH ARE PRODUCED**, the floor
  fires on either, and the narrowed `RollbackCompacted` is produced **by the store's unreadable image and not by
  the composition's ordering**. **The pin's own *"so no question is put on it"* stands for the STATUS and does
  not stand for `Q-2`**, which is a question about the store's all-or-nothing law and not about a token.
- **`PIN-10` (iv) and (v)** — (iv)'s `outcome` entry's subject widens from one code to two; (v)'s *"no exception on
  any arm"* reads *"no exception on any state in which the store's reversal answers"*, with the corrupt-image
  state named at `§B.3` and put at `Q-2`.
- **`PIN-13` (vi)** — the sentence *"which from this pass on means `JournalOpUnknown` and not
  `RollbackCompacted`"* is false and is corrected.
- **`PIN-4` (i)–(ii)** — (i)'s ground is unmoved and its second disjunct's **reading** is corrected (`§C.2`);
  (ii)'s *"a `mem`- or `temp`-tier op remains outside at the gate"* is false and is replaced by `§C.3`'s
  substitution.
- **`PIN-3` (iii)'s *"where the route landed NO `file`-tier op … NO SAVE IS OWED"*** — re-read through `§C.4`: a
  lower-tier container purge is a landing that owes one.
- **`PIN-1` (v)'s arithmetic** — `10` code files (unchanged as a set; the eight positions above are added to the
  position count), `5` prose files with the positions `clauses.md §11` prints, `18` test paths (**+3 new, and the
  one block that turns**), so the whole write set reads `10 + 5 + 21 = 36` paths and the code+prose positions read
  `8` new against `PIN-1`'s counted ones.

### D.3 The cells — the preset's scopes (`D-5`), the new ones and the ones that turn

**NEW, e2e (`role_l1_test_writer`, `tests/e2e/`):** **`FSC-ARM1-REFUSED-THREW`** (`α` — a body that throws at the
re-run: rank `18`, the store where the call found it, the bytes byte-identical, the registry row withdrawn, the
attempt closed); **`FSC-ARM1-REFUSED-COMPACTED`** (`β` — the ordinary compaction at the registration's
composition: nothing stands); **`FSC-ARM0-CONTAINER-PURGE`** (`γ` — a bare `mem`-container purge saves once, the
fresh boot agrees, and the SCALAR control writes nothing); **`FSC-ARM1-MEM-CONTAINER`** (`γ` at the close — a
registration whose repair lands a container purge saves once). **NEW, native, inside the existing targets**
(`tests/integration/store-core/journal_and_rollback.rs` and `tests/integration/store-core/properties.rs`): **two
cells for the departure reading** — `commit_file` writes for an op that purged a `file` version and returns before
`write_file` for an op that shadowed one. **NEW, unit (`tests/unit/js-constraints/`):** **one cell for the
close's candidate filter** (`lastFileLanding`'s three disjuncts), beside the existing
`registration-save-seam.test.mjs`.

**THE ONE EXISTING BLOCK THAT TURNS RED, AND IT TURNS BY ITS OWN HEAD'S PREDICTION:**
`tests/e2e/file-save-coverage-properties.test.mjs:472`–`:533` — `P-FSC-1`'s boundary block. **Three assertions
invert**: `bytesOf(filePath) === purgeImage` (the image must move), `purgeMoved === false` (the modification state
must move), and *"a fresh boot resurrects the purged version"* (it must read the container). **Its SCALAR half is
re-derived as the silent control it already is**, and the block stops being a boundary block for the container
case and becomes an asserted saving arm. **And `P-FSC-3`'s two boundary blocks (`:927`–`:985`) are RE-DERIVED, not
turned**: their asserted observations (rank `18`; rank `19` with one `outcome` entry and `state: null`) are stable
by the file's own design, and **the (alpha) half gains the assertions `α` earns** while **the (beta) half stays a
printed finding and gains the code-name assertion `§B.4` names.**

**AND THE CELLS THAT ARE RE-READ AND MUST NOT BE "FIXED"**: `FSC-ARM1-MEM` (`:234`–`:250`),
`FSC-ARM1-REFUSED-MEM` (`:292`–`:310`), `fts_S_ARM_SAVE_a_mem_tier_write_commits_nothing_on_either_arm`
(`file-tier-save.test.mjs:537`–`:555`), `..._a_temp_tier_write_...` (`:557`–`:573`) and
`..._a_record_whose_op_is_not_a_file_tier_writes_commits_nothing` (`:575`–`:593`) **all stay GREEN** — their
addresses hold no more-persistent version — **and four clauses inside them still say *"a `mem`- or `temp`-tier
write commits nothing, because it moves no byte of the file"*, which is now false as a RULE and true only as
those fixtures' fact**: **re-spelled, with no assertion moved** (`clauses.md §11`).

---

## §E · THE PROSE, BY SITE, AND WHAT `§9.4` DOES NOT GET

**THE FOUR SITES, EACH REPLACED IN PLACE** (`PIN-7`'s form: no mark at a sentence's own position, one dated closing
mark per section; the final text is `clauses.md §11`):

1. **guide `§9.2`, instant `(I)`** (`docs/guides/package-use.md:118` of the landed section, inside
   `§9.2`'s landed body) — **the write's terminal arm's bullet gains the `γ` sentence**: a lower-tier write owes a
   save exactly when it purged a `file`-tier version, and a scalar at the same address shadows and owes none.
2. **guide `§9.2`, its last paragraph — *"an act that moves no `file`-tier data saves nothing: a `mem`- or
   `temp`-tier write, a `delete` …"*** — **`γ`'s second site.** The `mem`/`temp` clause is narrowed to the acts
   that moved nothing.
3. **guide `§9.2`, its refusal paragraph — *"so there is no arm of a refusal on which the store is NOT where the
   call found it"*** — **`α`'s and `β`'s shared site.** It becomes: the refusing arms roll back, **including a
   body that throws at a registration's re-run**; **and the ONE state where the store cannot put the state back —
   a `filePath` whose image nothing can read, with a compacted candidate set — is named as the single exception,
   at `§9.4`'s neighbour and not inside `§9.4`.**
4. **guide `§7.2` (4)'s second paragraph** (`:96` of the landed clause block; `package-use.md` `:914`'s
   neighbourhood) — **two sentences**: the refusing-arm list gains *"a constraint body that throws at the
   registration's re-run"*, and *"a repair that writes at `mem` or `temp` changes no byte of the file and owes
   none"* gains `γ`'s exception. **`bindings/js/README.md`'s persistence paragraph carries the same two facts**
   (site 6 of the eight), and its landing is generated (`scripts/publish.sh`, `PIN-7` (v)) — never hand-edited.
5. **`bindings/js/index.d.ts`'s `commit` bullet (:628–:632)** — **`γ`'s declaration site, one clause**: *"THE SAVE
   IS KEYED TO WHAT THE ACT MOVED AND NOT TO THE OP'S OWN TIER WORD"* widens from *"removed at least one version
   standing at the `file` tier"* to ***"wrote, replaced or PURGED at least one version standing at the `file`
   tier — so a `mem`-tier write of a CONTAINER value that purges a `file`-tier version saves, and a scalar at the
   same address shadows it and saves nothing"***. **`α` AND `β` OWE NO `index.d.ts` BYTE**: the declaration carries
   no clause about the registration's refusing arms (checked: `StoreStatus`'s prose at `:334`–`:356` is a census
   and no more) and **`RollbackCompacted`'s union literal at `:369` is `D-109`'s and is unmoved.**
6. **`docs/specs/storeroom-native/contract.md` `§7.2` item 2** — **already corrected by this unit** (`D-107` item
   4); **`γ` does not touch it**: the sentence *"a record whose own `op` is not a `file`-tier write's performs
   none"* was replaced by *"what the act moved"*, and **that replacement is now TRUE of `γ` rather than needing a
   third wording.** **No third exception to the read-through rule is taken** — **`PIN-9`'s two exceptions stand at
   two.**

**`§9.4` STAYS OUT, AND THE REASON IS `D-107` ITEM 3'S: ITS NARROWNESS IS NOT FALSEHOOD.** It names a `file`-tier
write's save and says nothing about a registration's close or a reversal's; **after `α` and `γ` it is also silent
about a throwing re-run's refusal and about a lower-tier write's failed save — silence, not a false sentence.**
**No sentence is held for it, no pass may write one, and if the architect wants it widened that is a numbered
question and not this contract's act** (`clauses.md §10.1`, unmoved).

---

## §F · THE PROPERTY REGISTER — WHICH ROWS GAIN A LIMB

| row | what this pass does to it |
| --- | --- |
| **`P-FSC-1`** | **A LIMB IS ADDED, AND IT IS `γ`'S.** The row's act classes gain **a lower-persistence CONTAINER write at an address holding a `file`-tier version, as a SAVING arm**, and **a lower-persistence SCALAR write at the same address, as its SILENT control** — the two cases the generator excluded by name (`:371`–`:377`). **The row's predicate does not move** (the image agrees with the projection once the act returns) and **neither does its falsifier**. |
| **`P-FSC-2`** | **THE SAME CLASS IS ADDED TO ITS GENERATOR** and **the limb is not**: the once-per-record contrapositive already quantifies over "the five classes", and `γ`'s arm is one more act whose serialization count must not exceed `1`. **`FSC-ARM0-CONTAINER-PURGE` is its deterministic instance.** |
| **`P-FSC-3`** | **A FIFTH REFUSAL ARM IS ADDED TO ITS GENERATOR** (`α`'s: a constraint body that throws at the re-run) — the row's sentence *"for any refusing registration whose route landed ops"* **already quantified over it and the arm failed the quantifier**, which is why the register surfaced it. **No limb, no predicate change.** |
| **`P-FSC-4`** | **UNMOVED IN EVERY TERM.** `β` changes no regeneration byte, and the narrowed floor's one producer is what `§B.3` declares and puts at `Q-2`. |

**AND THE REGISTER'S OWN DISPOSITION CHANGES WITH THIS PASS, WHICH IS A FACT THE RELEASE PASS NEEDS**: the file
`tests/e2e/file-save-coverage-properties.test.mjs` **IS IN THE TREE** (`1,257` lines, read today) and carries
`P-FSC-1`, `P-FSC-2`, `P-FSC-3` and `P-FSC-4` as executed tests with their generators, so **`verification.md §4`'s
*"NO LANDED HOME"* is superseded and gate 11 is no longer verdictless** — **and its four rows are the reason this
pass exists**, since two of them print, as findings, exactly the arms `α` and `β` close.

---

## §G · THE RELEASE CLASS

**`PATCH`, AND `1.9.1` STANDS** (`carrier.md §7`'s number, declared for the delivery the same day). **The three
arms move no member of any declared surface** — the addon's `15`, the instance's fourteen, the twenty statuses,
the barrel's four lines and six names, `RollbackResult`'s three members, `CommitRecord`'s four, `OpIdArg`'s row —
**so `PUB-DD-9`'s `MINOR` ground is not met and no number other than `1.9.1` is available without a ruling.** **The
CLASS is unmoved; the CHANGE LIST grows by three lines and the release note must carry each, because a consumer
can observe all three:**

- **`α`** — *a registration whose repair landed and whose re-run then threw a body's own throwable now rolls the
  registration's landings back and leaves the store where the call found it; the caller still receives
  `ConstraintBodyThrew`, and its `log` now carries the close's `outcome` entry where the rollback met a store code.*
- **`β`** — *a refusing registration whose rollback meets a compacted journal base reverts to the last valid state
  by regenerating it, and the one state it cannot reach — a `filePath` whose image nothing can read — is declared,
  with its question pending.*
- **`γ`** — *a `mem`- or `temp`-tier write of a CONTAINER value at an address holding a `file`-tier version now
  SAVES, so a durable version such a write purges no longer comes back after a restart; a SCALAR write at the
  same address still shadows it and still saves nothing.*

**AND ONE LINE OF SCOPE THE NOTE OWES: `Q-2` IS OPEN, SO THE NOTE MAY NOT SAY THAT EVERY REFUSAL ROLLS BACK
WITHOUT EXCEPTION** (`§B.3`).
