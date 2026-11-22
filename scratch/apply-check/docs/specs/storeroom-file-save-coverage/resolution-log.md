# The resolution log — `D-119`'s carrier: the form, the cache, the answers, the order, the stability, the cells, the prose and the write set (`U-STOREROOM-FILE-SAVE-COVERAGE`)

**WHAT THIS PART IS.** **The declaration `D-119` leaves to L1.** The ruling is the architect's, verbatim
(`strata/decisions.md` · `D-119`, 2026-11-02, `main`, landed at `5325526`):

> Cache the log and pass to the surface on resolution, same as on failure. This is needed so that manual data
> changes can check what additional data changed downstream of their request

**THE OPERATIVE DEMAND, IN ONE SENTENCE, SO EVERY CLAUSE BELOW IS CHECKED AGAINST IT: a call that PASSES answers with
the entries its commit appended, exactly as a refusal does — same list, same objects, same `LogEntry` shape, same
order.** **`D-58` STANDS WHOLE** (*"After a commit/attempt resolves/rejects, the store does not need to retain the
message log or other client-returned data. Don't retain it."*): **the kernel still strips the log at `dropHandoff`, and
no retention returns to any structure the kernel or the instance owns.** **`D-53` STANDS WHOLE**: the entries are the
commit's ONE list, never a second one. **`A117` (D6) STANDS WHOLE**: no member is added to any record's DECLARED
census, to the instance's FOURTEEN, or to the kernel's barrel.

**MEASUREMENT MARKS.** This part read source bytes with `read`/`grep` and ran no probe: **every row is
`READ-AT-THE-BYTES` and no row is `[T]`** (`sites.md §6`'s rule, applied here unchanged). **Figures are re-read this
date, 2026-11-02, at HEAD `5325526`.**

---

## §1 · THE FORM CHOSEN, AND THE OTHER PRICED

### 1.1 · THE FORM: **A NON-ENUMERABLE OWN ACCESSOR**, AT THE NAME `log`, ON THE `discarded` PRECEDENT

**(a) IS CHOSEN.** **The `Symbol.for`-keyed, non-enumerable own accessor `A117` (D6) makes possible and `D-75`'s
`discarded` already uses** — **declared by NAME, SHAPE and SEMANTICS in the declaration's own docblock, declared as
NO TYPED MEMBER, installed by one helper, and read by the name the refusal uses.**

**THE DEVICE, STATED PRECISELY BECAUSE `D-119` ITEM 3'S OWN SENTENCE IS INEXACT ABOUT ITS PRECEDENT:** **`discarded` is
NOT `Symbol.for`-keyed — it is a `Symbol`-FREE, STRING-keyed non-enumerable own ACCESSOR (`constraints.mjs`'s
`defineDiscardWitness`, `:1901`–`:1908`: `Object.defineProperty(record, 'discarded', { get: read, enumerable: false,
configurable: true })`).** **The `Symbol.for`-keyed device is the OTHER one — `COMMIT_LOG`
(`state.mjs:104`, `kernel-commit.mjs:152`–`:157`, `:351`–`:356`) — and it is a `data` property carrying the list
by reference.** **`D-119` item 3's phrase conflates the two, and the conflation does not matter, because the
operative clause is the one that follows it: the carrier is a datum attached to a passing record WITHOUT MOVING A
CENSUS.** **THIS PART TAKES THE ACCESSOR AND THE STRING KEY, for three reasons, each its own:**
1. **`log` IS THE NAME THE FAILURE FORM USES** (`StoreRefusal.log`, the four-member form's third member). **"Same as
   on failure" is the ruling's own sentence, and a consumer that catches a refusal and a consumer that holds an
   answer then read the same name.** A `Symbol.for` spelling would make the passing log a private channel with a
   magic string in every consumer's source.
2. **IT IS THE `discarded` DEVICE EXACTLY** — one helper, `enumerable: false`, `configurable: true`, a getter — **so
   this package gains no NEW kind of member, and a consumer who has read `discarded` has already read this.**
3. **IT MOVES NO DECLARED CENSUS, NO DEEP-EQUALITY AND NO ARITY.** `Object.keys` and every deep-equality a consumer
   writes read the record's declared members and nothing else; `Object.assign`/spread copies lose it, exactly as
   they lose `discarded` and `commit`.

**THE ONE CENSUS IT DOES MOVE, NAMED HERE RATHER THAN DISCOVERED: `Object.getOwnPropertyNames` SEES A STRING-KEYED
NON-ENUMERABLE MEMBER.** **Two of the four turned cells (§6.2) are this census's, both on the delete receipt, and both
re-derivations of a row that has already moved three times:**
- **`tests/e2e/held-listener-identity-greens.mjs`'s `HLI-07.6` (`:582`–`:585`)** asserts the receipt's own names are
  exactly `['address','commit','discarded','op','tiers','triggered']` and will read SEVEN. **Its subject is *"the
  receipt's own member set is the declared one"*, and it re-derived in place for `op` (2026-10-27, `D-43`), `discarded`
  (2026-10-28, `D-49`) and `commit` (2026-10-29, `D-55`) — so this is its FOURTH re-derivation and not a red cell left
  behind.**
- **`tests/e2e/surface.test.mjs:762`–`:766`** deep-equals `Object.getOwnPropertyNames(removed)` to
  `['address','tiers','triggered','op','commit','discarded']` — **six names in INSERTION order** — and will read
  seven with `log` last. **Its assertion is the same claim at a second home (the declaration's own `WriteRecord`
  docblock names that file as a record-census home), so it is re-derived with its order preserved and `log` appended
  at the end.**

**The `Symbol.for` alternative would move both by nothing, and that is the whole of what it buys against a name a
consumer can read.** **THE OTHER TWO TURNED CELLS ARE NOT THIS CENSUS'S — they assert that a lawful reversal carries
no `log` at all, and `D-119` reverses that for one member; both are `§6.2`'s rows 3 and 4.**

### 1.2 · WHAT THE OTHER FORM COSTS — **(b) A DECLARED, ENUMERABLE MEMBER**

**IT IS REFUSED, AND THE PRICE IS NOT A STYLE PREFERENCE: IT IS A BREAKING CHANGE TO THREE PUBLISHED RECORDS AND THE
LOSS OF `1.9.1`'s PATCH CLASS.** **A `log` member visible to `Object.keys` turns every census of a write answer, a
delete receipt and a reversal record in the tree, at all three scopes, and every consumer deep-equality that counts
a record's members. The cells that turn, named at the bytes this date:**

| record | the cells that turn | what each reads |
| --- | --- | --- |
| **`WriteRecord`** | `tests/e2e/surface.test.mjs:313` · `tests/e2e/registry.test.mjs:566` · `tests/e2e/ordering.test.mjs:687` (and the message at `:733`–`:734`) · `tests/e2e/held-listener-identity-surface.test.mjs:1158` · `tests/e2e/blind-address-verbs.test.mjs:173` · `tests/e2e/prototype-index-write.test.mjs:153` · `tests/e2e/file-tier-save.test.mjs:1347` · `tests/unit/js-constraints/a126-constraint-methods.test.mjs:229`, `:276`, `:333`, `:519` · `tests/e2e/greens.mjs:1305` (`JSG-11.1`) · `tests/e2e/json-crossing.test.mjs:3148`, `:4369` | `Object.keys(record).sort()` **and the JSON rebuild-and-compare over `{op, watched, triggered}`** |
| **`DeleteRecord`** | `tests/e2e/blind-address-verbs.test.mjs:221` · `tests/e2e/addon-surface.test.mjs:1338` · `tests/e2e/addon-surface-properties.test.mjs:466`, `:917` · `tests/e2e/repair-listener-delivery.test.mjs:711` · `tests/unit/js-surface/a127-surface.test.mjs:328` · `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs:1059` · `tests/e2e/discard-witness.mjs:80` (`RECEIPT_ENUMERABLE`, and every `DW` cell that reads it) | the receipt's four enumerable members |
| **`RollbackRecord`** | `tests/e2e/refused-reversal-restore.test.mjs:682` · `tests/unit/js-constraints/registration-save-seam.test.mjs:87` | the reversal's three declared members |
| **the declaration** | `tests/e2e/blind-entry-module.test.mjs:372`, `:391`, `:392` | the `.d.ts` text censuses of the three records |

**AND THE CLASS MOVES WITH IT**: `D-119` item 5 puts this row in `1.9.1`, **a PATCH** — *"a fix inside the declared
surface"* — **and a new enumerable member on three published records is not a fix inside the surface; it is a MINOR
by `PUB-DD-9`'s own row, and it would need its own number.** **That is the price of (b): roughly twenty cells, four
scopes, both batteries, and a release class.** **It is also the price a CONSUMER pays — every deep-equality over a
write answer that a downstream drive wrote turns with it.** **(a) costs four cells, each a re-derivation with its own
ground (§6.2).**

---

## §2 · THE CACHE: WHERE IT LIVES, WHEN IT IS RELEASED, AND THE STORE'S NON-RETENTION

### 2.1 · THE HOME IS THE SEALED REPORT THE ENTRY ALREADY HOLDS — **NO NEW STRUCTURE IS MINTED**

**THE CROSSING ALREADY EXISTS AND IT ALREADY CARRIES THE LIST.** `kernel-attempt.mjs`'s `runAttempt` closes out with
`sealHandoff(report, shared)` (`kernel-foundations.mjs:944`–`:953`), which **freezes the commit's list and the report
together**, and then `dropHandoff(kernel, sealed)` (`:270`–`:271`) **replaces the closed map's entry with
`{attempt, outcome, ops, rollback}` — four members and NO `log`.** **The sealed report itself is NOT touched by that
drop**: it is the value `runAttempt` returns, and the entry's frame holds it from the return until it builds the
answer. **SO THE CACHE IS THE SEALED REPORT'S `log` MEMBER — one array, frozen, the commit's own — and the answer's
accessor closes over that ONE reference.**

**NO NEW MAP IS MINTED AND NONE MAY BE**: not a `WeakMap` keyed by the record, not a per-instance slot, not a
module-level one. **The list outlives `dropHandoff` by construction** (`sealHandoff` runs BEFORE the drop, and the
report is the frame's own local), **which is exactly `D-119` item 2's requirement — *"the cache must outlive that
strip at least until the answer crosses"* — met by the order the seal already runs in and not by a second store.**

**ONE NEW FACT IS PLACED, AND IT IS A FACT AND NOT A LIST: WHETHER THIS CALL OWNS THE COMMIT'S LIST.**
`sealHandoff` is already HANDED that discriminator as its second position (`shared =
commitLogInFlight(kernelFor(store)) !== null`) and today discards it after using it. **It is kept**: **one
`Object.defineProperty(report, COMMIT_LOG_SHARED, { value: shared === true, enumerable: false, writable: false,
configurable: true })`, placed BEFORE `Object.freeze(report)`**, under
`Symbol.for('provident-storeroom.commit-log-shared')` — **the tree's own cross-side spelling, the device
`COMMIT_LOG`, `RESTART_REFUSAL` and `SETTLED_ON_THE_PASSING_ARM` each use; invisible to `Object.keys` AND to
`Object.getOwnPropertyNames`, so it moves no census anywhere.**

**WHY THE FACT IS NEEDED, AND WHY IT IS NOT AN INFERENCE.** **`Object.isFrozen(report.log)` would answer the same
question today** (the seal freezes the list only where the attempt owns it) **and it is REFUSED as a discriminator:
it reads a property's consequence rather than the fact, and a later pass that froze a shared list would invert every
answer silently.** **The fact is computed at the crossing, so it is placed at the crossing.**

### 2.2 · WHEN IT IS RELEASED — **AT THE ANSWER, AND BY NOTHING ELSE**

**THE RETENTION IS EXACTLY THE ANSWER'S OWN, WHICH IS `D-58`'s BOUND READ FROM THE CLIENT'S SIDE:** **from the entry
frame's return, the package names the list through the answer and through NOTHING else** —
- **`kernel.closed` does not** — `dropHandoff` wrote four members and no `log`, and that is unmoved;
- **`kernel.live` does not** — `release` deleted the attempt at the terminal arm, and that is unmoved;
- **the registry, the instance and every module-level structure do not** — no `WeakMap` is minted (§2.1);
- **and `K-4`'s closed arm still answers `[]` with the sentence *"the store retains nothing"*** (`kernel-terminal.mjs:450`–`:454`, `READ-AT-THE-BYTES`). **THE ANSWER'S `log` IS NOW THE ONLY ROUTE TO A PASSING COMMIT'S ENTRIES, AND THAT IS `D-58`'s SINGLE-COPY PROPERTY APPLIED TO THE PASSING ARM: *"a retained copy would be a second source of truth that can disagree with the one the consumer holds"*.**

**THE LIST IS RELEASED WHEN THE ANSWER IS — the caller's own reference, and no release verb exists in this package
(`index.d.ts`'s `StoreInstance`; `A74`).** **A consumer that drops the record releases the entries; a consumer that
keeps it keeps them, and that is the client's copy and not the store's.** **THE JOINED ARM'S `[]` IS ONE MODULE-LEVEL
FROZEN EMPTY ARRAY AND CARRIES NO CLIENT DATA AT ALL** (§4.2): a constant, not a cache.

### 2.3 · THE STORE'S NON-RETENTION IS INTACT, AND THE RULING'S OWN SENTENCE IS SATISFIED BY ORDER

**The artefact never held a message log** (`D-53`: the log is JS-side; `src/store.rs` has no such member), **so
nothing in `src/` is asked for and nothing there moves.** **What `D-58` forbade is the KERNEL's retention, and
`dropHandoff` still performs it on every arm — passing, failing and registration's alike.** **A pass that re-opened
store retention has left `D-119`; a pass that lets the entry drop the list before the answer crosses has failed it;
this declaration does neither, because the list is read off the sealed report the entry already holds and is installed
on the answer before the frame returns.**

---

## §3 · WHICH ANSWERS CARRY IT, MEMBER FOR MEMBER

**SIX ANSWERS, THREE CARRIERS, THREE THAT CARRY NOTHING AND ONE ARM THE RULING CANNOT REACH. Each is declared, and
each `[]` is given its own meaning so that the empty list never has to be guessed at.**

### 3.1 · `write` — **CARRIES IT: `record.log`** (`constraints.mjs`'s `constraintWrite`, `:859`–`:886`)

**The record the three-position `write` answers — `{op, watched, triggered}` — gains the non-enumerable own accessor
`log`, installed by the new helper `defineResolutionLog` BESIDE `defineDiscardWitness` (`:1901`) and after it, at the
same instant the answer is built.** **The read answers THE CACHED LIST — the sealed report's `log`, one array, no
derivation, no copy-out, no second list — where this call owns its commit, and the FROZEN EMPTY LIST where it joined
one (§4.2).** **`Object.keys(record)` and every deep-equality over it are unmoved** (`A117` (D6); `D-119` item 3).

### 3.2 · `delete` — **CARRIES IT: `receipt.log`** (`constraints.mjs`'s `constraintDelete`, `:981`–`:1008`)

**The receipt the `delete` answers carries the same accessor at the same name**, installed in `constraintDelete`
beside `exposeCommit(receipt, attempt.record)` (`:1006`) — **where the receipt's other two non-enumerable members are
already installed** (`index.mjs:645`–`:650` for `discarded`, `constraints.mjs:1018`–`:1026` for `commit`). **THE ENTRY
INSTALLS IT AND `index.mjs`'s `delete` member DOES NOT MOVE**, because the sealed report and the ownership fact are
both in `constraintDelete`'s frame and neither is in the member's.

**AND IT IS NOT A SECOND ROUTE TO ONE LIST, SAID SO NOBODY BUILDS ONE:** `receipt.commit[COMMIT_LOG]` and
`receipt.log` **are the same array by identity** on the arm that owns the commit. **One list; two names on it; the
`log` name is the one the refusal uses and the one a consumer should read.**

### 3.3 · `rollback` — **CARRIES IT, AND THE LIST IS THE JUDGEMENT'S OWN: `record.log`** (`constraints.mjs`'s
`judgeReversal`, `:2611`–`:2946`; `index.mjs:687`–`:728`)

**THE REVERSAL IS THE ARM `D-119`'s GROUND APPLIES TO MOST SHARPLY, AND IT IS WHY THIS ARM IS NOT `[]`.** **`D-113`
item 3 makes a reversal's judgement run your pairs' repairs; `D-117` item 1 makes it deliver the listeners those
repairs' writes fire — SO A `rollback` CAN LAND AN EDIT YOU DID NOT ASK FOR, WHICH IS EXACTLY THE DOWNSTREAM CHANGE THE
RULING EXISTS TO MAKE READABLE.** **The judgement already keeps the list: `judgeReversal` creates `judgementLog`
(`:2619`) and every entry a repair's write mints in that window lands in it — `repair-run` entries included** (`:2764`).

**SO THE LIST CROSSES, AND THE PLUMBING IS ONE PRIVATE FRAME'S ANSWER AND ONE INSTALL:**
- **`judgeReversal` answers the judgement's list on its JUDGING arms**, with the list **frozen at the frame's end**
  (beside `leaveCommitFrame` / `closeCommit` in the `finally` at `:2942`–`:2945`) — **a freeze in place, so the answer
  holds the very array the frame appended to and not a copy of it**;
- **the member installs it on the record** with the same `defineResolutionLog` helper, after
  `judgeReversal(instance, watched, answer.opId, state)` (`index.mjs:706`) and beside the record's `discarded`
  accessor (`:727`).

**★ AND ONE FACT THIS ARM OWES, MEASURED, BECAUSE IT IS THE ONE PLACE THE PASSING LOG AND ITS REFUSAL DO NOT AGREE:
A REFUSING REVERSAL CROSSES A LIST OF ITS OWN AND NOT THE JUDGEMENT'S.** `reversalRefusal` mints `const log = []`,
appends **exactly ONE** `constraint-check` entry naming the pair that refused and what the undo did, and crosses that
(`:3631`–`:3638`; the form is pinned by `tests/e2e/refused-reversal-restore.test.mjs:218`'s arm and declared in the
guide's `§5.4` item `4`: *"WHEN IT REFUSES AND NO ATTEMPT STANDS, `log` IS ONE `constraint-check` ENTRY — NOT `[]`"*).
**The only route that crosses `judgementLog` on a failing arm is the failed SAVE** (`:2891`). **SO ON THIS ARM THE
PASSING LIST AND THE REFUSING LIST ARE DIFFERENT LISTS BY CONTENT AND NOT MERELY BY IDENTITY** — **a judge that ran a
repair and then passed carries the `repair-run` entry, and the refusal of that same judgement would carry its own one
entry** — **and §5.3's identity sentence is scoped to the `write` and `delete` carriers because of it.** **NO RULE IS
WEAKENED HERE AND NO REFUSAL MOVES**: the refusal's one-entry form is `D-41`'s and is unmoved by `D-119`.

**ITS `[]` ARMS ARE FOUR AND EACH IS TRUE** (§4.2, §4.3): **the deferred arm** (a `rollback` raised inside an open
window — `reversalWatch` answers `[]` and the judgement is the enclosing pass's drain, `:2536`–`:2563`); **the
at-rest judgement over an empty watch** (`:2575`: no pair stands, no repair runs); **a judgement that ran and
appended nothing** (every pair passed, no repair landed); **and the compensating composition** (`:2528`: the kernel's
own undo of a failing attempt — `D-111` item 1's *"compensation and not an act"*).

### 3.4 · `addConstraint` / `constraintOn` / `constraintOff` — **CARRIES NOTHING, DECLARED WITH ITS GROUND**

**`constraintOn` and `constraintOff` answer `undefined`** (`index.d.ts:1068`, `:1073`): **there is no object to carry
a member, and none is minted.**

**`addConstraint` answers the `ConstraintIdentity`, AND THE LOG DOES NOT ATTACH TO IT — with the reason stated,
because the alternative was available and is refused:**
1. **THE IDENTITY IS MINTED ONCE PER PAIR AND HANDED BACK AGAIN ON A SECOND ADD** (`index.mjs:1093`'s `return
   held.identity`; `index.d.ts:1405`–`:1410`: *"equal to itself on a second `addConstraint` at the SAME pair"*).
   **A member on it would therefore be a SLOT EVERY CALL AT THAT PAIR SHARES** — a second registration overwriting
   the first's log on an object the first caller still holds. **That is `D-77`'s forbidden shape (*"a member present
   only sometimes"*) made worse: present always, and true of another call.**
2. **AN IDENTITY IS NOT A RECORD** — `D-49`'s and `D-75`'s own sentence (`index.d.ts:690`–`:693`): *"an identity is
   not a record and no member of it is declared, so the action raised there remains unobservable without a new
   surface"*. **This declaration adds no new surface on an identity.**
3. **WHAT THE CALLER CAN STILL READ, SAID SO THE LOSS IS NOT SILENT:** the registration's route lands its edits
   through the commits it names, **and an edit it lands is visible in the STATECRAFT the caller already has — a
   `read`, an `op`, a fresh boot** — **but the registration's own `constraint-check` / `repair-run` entries are
   dropped at its close (`kernel-registration.mjs:986`'s `dropHandoff`) and cross to nobody.** **THAT IS `D-119`'s
   FIRST UNREACHED ARM AND IT IS DECLARED, NOT OVERLOOKED.**

### 3.5 · `storeCreate` carrying `cfg.constraints` — **CARRIES NOTHING, AND THE RULING'S OWN CARRIER CANNOT REACH IT**

**The batch's registrations are real commits with real logs, and the call answers an INSTANCE — not a record.**
**THE ONLY PLACE A CARRIER COULD STAND IS THE INSTANCE, AND NO MEMBER OF THE FOURTEEN MAY MOVE** (`A117` (D6);
`D-119` item 3). **A `Symbol.for`-keyed channel on the instance would move no census — `index.mjs` carries several —
AND IT IS REFUSED ON `D-58`'s OWN BOUND, WHICH IS THE DECIDING GROUND:** *"the resident set of the client-returned
data is THE INSTANCE'S LIFETIME AND NOTHING LONGER, and within the instance it is THE OPEN COMMIT'S — not the closed
one's."* **A batch log cached on the instance IS a CLOSED commit's log retained inside the instance, which that
sentence forbids in as many words.** **So the batch's entries are dropped at each registration's close, exactly as
they are today, and the same holds for a BOOT over an existing `filePath` carrying them.**

**WHAT WOULD MOVE IT IS THE ARCHITECT'S AND IS PUT AS `Q-1` (§10):** **a boot-batch carrier needs `D-58`'s bound relaxed
for one closed commit.** **It blocks nothing in this unit.**

---

## §4 · WHAT THE PASSING LOG HOLDS, AND IN WHAT ORDER

### 4.1 · THE CONTENTS AND THE ORDINAL

**THE LIST IS THE COMMIT'S OWN ARRAY, MEMBER FOR MEMBER AND IN APPEND ORDER, AND THE APPEND ORDER IS THE ARRAY
INDEX — `D-65`'s ordinal, which is no member at all.** **THE ENTRIES ARE THE KERNEL'S FIVE-MEMBER `LogEntry`
(`index.d.ts:421`–`:427`: `kind` · `id` · `message` · `opId` · `state`) — the SAME objects a refusal crosses with, and
nothing is re-authored, re-ordered or re-numbered.** **The kinds are the kernel's closed four:** `constraint-check`
(one per pair the pass asked, in registration order), `repair-run` (one per repair body that ran), `commit` and
`outcome`.

**ON A PASSING `write` OR `delete` THAT OWNS ITS COMMIT, THE LIST ENDS WITH THE PASSING ARM'S `commit` ENTRY**
(`kernel-attempt.mjs:502`–`:503`): **the kernel appends it AFTER the save and AFTER the delivery, ONCE, and nothing
appends after it** (`:496`–`:498`). **Its `id` is `null`, its `opId` the attempt's last op and its `state` `null`.**

**ON A PASSING `rollback`, NO `commit` ENTRY EXISTS AND NONE IS INVENTED** — a reversal mints no attempt, so no
passing arm runs for it; **its list holds what its judgement appended (`repair-run` entries, and the entries the
repairs' own writes minted in that window), and nothing else.**

### 4.2 · THE JOINED ARM: **`[]`**, AND WHY A PREFIX COPY IS REFUSED

**A CALL THAT JOINED AN ENCLOSING COMMIT ANSWERS `[]`.** **THE SENTENCE IS ALREADY IN THE TREE, WRITTEN FOR
`discarded` AND MEASURED (`index.mjs:632`–`:637`; `DW-09.2`): *"A JOINED DELETE THEREFORE ANSWERS `[]` AND MEANS IT
ABOUT ITS OWN WINDOW — THE RAISES ITS DELIVERY MADE ARE IN THE ENCLOSING WINDOW, AND THE ACT THAT OWNS THAT WINDOW IS
THE ONE THAT REPORTS THEM."*** **Read it for the log: a constraint body's or a repair body's `write` joins the
enclosing commit (`D-53`), whose list has NOT crossed — so this call has no list of its own to hand over, `[]` says
so, and THE ENCLOSING ACT'S ANSWER CARRIES THE ENTRIES, THE NESTED CALL'S OWN INCLUDED.**

**A FROZEN PREFIX COPY IS REFUSED, AND THE RULING REFUSES IT ITSELF:** `D-119` item 4 — *"a call that passes and a
later refusal on the same commit can never disagree"* — **and a copy taken at the nested crossing necessarily holds
fewer entries than the enclosing commit's later answer, so the two WOULD disagree.** **One list, one crossing, one
answer.**

**AND ONE COLLISION IS PUT ON THE RECORD RATHER THAN PAPERED OVER — `Q-2` (§10.3).** **`D-119` ITEM 1 SAYS A PASSING CALL
ANSWERS *"EXACTLY AS A REFUSAL DOES"*, AND ON THE JOINED ARM THE TREE'S REFUSAL DOES SOMETHING ELSE:** **a body's nested
`write` that FAILS crosses the ENCLOSING commit's array** — `attempt.log` IS the joined list (`kernel-commit.mjs:66`–`:67`,
`:81`) and `refuse(…)` throws it (`kernel-attempt.mjs:378`) — **so the failing arm already hands the body the enclosing
commit's list, unfrozen, while the commit runs.** **THE PASSING ARM CANNOT DO THAT WITHOUT BREAKING TWO CLAUSES AT
ONCE**: `D-119` item 4 (*"it is not a live view: the list is cached at the crossing and stable after it"*) and
`D-58` item 1 (*"The client does not need any insight into the current state of a commit/attempt before it completes.
Don't expose any of it."*), **which `D-119` item 2 says stands whole.** **SO `[]` IS DECLARED HERE, ON THOSE TWO GROUNDS,
AND THE ASYMMETRY IS NAMED: the passing arm answers `[]` where the failing arm answers the enclosing list — AND THE
FAILING HALF IS PRE-EXISTING, UNMOVED BY THIS DECLARATION, AND NOT ITS TO CHANGE** (`D-119` item 4's third sentence: a
refusal's carriage is not this row's subject). **A PASS THAT MAKES THE PASSING ARM MIRROR THE FAILING ONE HAS CHOSEN
SIDE WITH ITEM 1 AGAINST ITEMS 4 AND `D-58`, AND THAT CHOICE IS THE ARCHITECT'S.**

**AND `[]` HERE DOES NOT MEAN *"nothing was appended"*: it means *"this call's act appended nothing IT CAN REPORT"*, a
distinction that is `D-78`'s and is stated in the prose (§7).**

### 4.3 · **IS A PASSING CALL'S LOG EVER `[]`? YES, IN FOUR SHAPES — AND THE *"A PASSING WRITE WITH NO PAIR"* SHAPE
IS **NOT** ONE OF THEM, WHICH IS A CORRECTION THE BYTES MAKE**

**A PASSING `write` OR `delete` THAT OWNS ITS COMMIT NEVER ANSWERS `[]`.** **THE PASSING ARM APPENDS ITS `commit` ENTRY
UNCONDITIONALLY** (`kernel-attempt.mjs:487`–`:503`), **and it is reached with a `list` of ZERO pairs exactly as with
`N`** (`:665`–`:702`: no pair standing means the loop is skipped and `{ terminal: null, rerun: false }` returns).
**SO A PASSING WRITE OVER A STORE WITH NO PAIR AT ITS ADDRESS ANSWERS A ONE-ENTRY LIST — `[commit]` — and `[]` would
be a FALSE ANSWER there.** **A cell that asserts `[]` on that arm asserts a value the tree cannot produce, and §6 says
so by name.**

**`[]` ARISES IN EXACTLY FOUR SHAPES:**
1. **THE JOINED ARM** (§4.2) — a body's nested `write`/`delete`;
2. **A `D-3` DELETE** — an act that removed nothing opens no attempt, no pass runs and no entry is appended
   (`kernel-commit.mjs:363`–`:366`; `commitRemoval` answers `null`; the receipt's `commit` is `null`);
3. **A `rollback`'S NON-JUDGING ARMS** — the deferred arm, the at-rest judgement over an empty watch, and the
   compensating composition (§3.3);
4. **A JUDGEMENT THAT RAN AND APPENDED NOTHING** — every pair passed, no repair landed.

**AND `[]` IS NEVER ABSENT, NEVER `undefined`, AND NEVER A PLACEHOLDER ENTRY** — **on every record answer of the three
verbs the member is PRESENT, `[]` included, which is `D-77`'s and `D-78`'s rule read for a third member.**

---

## §5 · THE STABILITY RULE

1. **CACHED AT THE CROSSING, STABLE AFTER IT.** **The list is the array the crossing froze — `sealHandoff`'s
   `Object.freeze` for a `write` or a `delete` (`:950`), the judgement frame's own end for a `rollback` (§3.3) — the
   SAME array the crossing hands, and not a copy of it.** **After the answer exists, no act of the package appends to
   it**: the attempt is closed, the frame that owned it is gone or left, and `dropHandoff` has already run.
2. **A CONSUMER THAT MUTATES ITS COPY CHANGES NOTHING THE PACKAGE HOLDS.** **The array is frozen, so a write to it
   throws under strict mode and is a silent no-op outside it — on the same terms as every refusal's `log` since
   `D-55` item 6.** **The entries are frozen with it; no copy-out is made and none is needed, because there is no
   further reader in the package to disagree with.**
3. **THE SAME OBJECTS A REFUSAL CROSSES WITH — ON THE `write` AND `delete` CARRIERS.** **A refusal about the same
   commit carries the same array, the same entries at the same indices** (`D-53`'s *"the crossed report IS that list"*),
   **so a pass and a later refusal on one commit cannot disagree.** **`D-119` item 4 is thereby satisfied by identity
   and not by convention — FOR THE TWO COMMIT-ANSWERING VERBS.** **THE REVERSAL'S ARM IS THE EXCEPTION AND IT IS
   `D-41`'S AND NOT THIS ROW'S: a refusing reversal crosses its OWN one-entry list (`:3631`–`:3638`), so there the
   passing list and the refusal are different lists by content** (§3.3). **No rule is weakened: the refusal's form is
   pinned by its own cells and unmoved.**
4. **IT IS NOT A LIVE VIEW.** **No getter derives anything at the read**: the accessor answers one captured reference.
   **That is the one place this member DIFFERS from `discarded`, whose accessor is a live read by necessity** —
   **`discarded` is built before the pass that judges its raise (`D-42`), and the log is built after every act that can
   append to it.** **The declared shape is the same; the reason for the accessor is not, and a later pass must not
   carry `discarded`'s justification across.**
5. **AND IT IS NOT A SECOND LOG, NOR A SECOND DELIVERY.** **The delivery's set is still `pending`'s** (`D-119` item 4;
   `surface.md §2.7` item 6): **a listener body's view and the caller's view read the same list, and what is DELIVERED
   is unchanged.**

---

## §6 · THE CELLS, AT THE PRESET'S SCOPES (`D-5`)

### 6.1 · TWO NEW PATHS

| # | path | scope | what stands there |
| --- | --- | --- | --- |
| 1 | `tests/e2e/resolution-log.test.mjs` | **`tests/e2e/`** — the assembled package through its declared entry, in-process, `ENVELOPE/PURE`, the layer `tests/e2e/file-tier-save.test.mjs`'s own row carries | **`RSL-1`** the passing write's list: a pair refuses, its repair lands at another address, and `record.log` holds the `constraint-check`, the `repair-run` and the closing `commit` entry **in index order** — the ordinal read as `i`, no `seq` member (`D-65`) · **`RSL-2`** **THE RULING'S OWN GROUND DRIVEN**: the entry `log[k].opId` names the repair's op and a `read` at the repair's address equals what it wrote — *the audit a manual data change is now able to take* · **`RSL-3`** **a passing write over a store carrying NO pair answers ONE entry, `kind === 'commit'`** — **the arm §4.3 corrects, asserted as the tree produces it** · **`RSL-4`** the joined arm: a constraint body's nested `write` answers `[]` **and the enclosing write's answer carries the nested write's own entries** (`DW-09.2`'s shape) · **`RSL-5`** a passing `delete`: its list ends with `commit`, **and `receipt.log === receipt.commit`'s own `COMMIT_LOG` array by identity**; the `D-3` delete answers `[]` · **`RSL-6`** a passing `rollback` whose judgement runs a repair carries the `repair-run` entry; a `rollback` that appended nothing answers `[]`; the member is PRESENT on both · **`RSL-7`** the refusal is unmoved: a `ConstraintPassRefused`'s `log` still reads the commit's list, `Object.keys(caught)` still `["status","message","log","address"]`, and the entries are the objects the passing answer would have carried · **`RSL-8`** the stability rule: `record.log === record.log`, `Object.isFrozen(record.log) === true`, a `push` throws, and the descriptor reads `enumerable: false` · **`RSL-9`** the non-carriage arms: `('log' in addConstraint(...))` is `false` and the identity's own names are unmoved; `constraintOn` answers `undefined`; a `storeCreate` carrying `cfg.constraints` answers an instance whose `Object.getOwnPropertyNames` still reads FOURTEEN |
| 2 | `tests/unit/js-constraints/resolution-log.test.mjs` | **`tests/unit/js-constraints/`** — one declared device and its guardrails, the scope `registration-save-seam.test.mjs` sits in | the accessor's shape on all three records: a getter (`typeof descriptor.get === 'function'`), `enumerable: false`, `configurable: true`, **the member present on every passing answer and on every `[]` arm**; `Object.keys` reading three/three/four and every deep-equality over the three records unmoved; **the sealed report's own member census unmoved by `COMMIT_LOG_SHARED`** (`Object.getOwnPropertyNames` reads the five, `Object.getOwnPropertySymbols` carries it) |

### 6.2 · FOUR EXISTING CELLS THAT MUST TURN — EACH A RE-DERIVATION, NONE A REPAIR

**THE ACCESSOR IS NON-ENUMERABLE, SO NOT ONE `Object.keys` CENSUS AND NOT ONE DEEP-EQUALITY TURNS; THE FOUR BELOW
TURN ON TWO OTHER SUBJECTS — `Object.getOwnPropertyNames`' TWO CENSUSES AND TWO CELLS THAT ASSERT A LAWFUL REVERSAL
CARRIES NO `log` AT ALL.**

| # | cell | what it reads today | what it reads after | its re-derivation |
| --- | --- | --- | --- | --- |
| **1** | `tests/e2e/held-listener-identity-greens.mjs:582`–`:585` (`HLI-07.6`) | the receipt's own names, exactly `['address','commit','discarded','op','tiers','triggered']` | **seven**, `log` among them | **the row's fourth dated re-derivation** (`op`, `discarded`, `commit` preceded it) — its subject, *"the receipt's own member set is the declared one"*, is unmoved |
| **2** | `tests/e2e/surface.test.mjs:762`–`:766` | `getOwnPropertyNames(removed)` deep-equal to six names **in insertion order** | **seven, `log` appended last** | the same claim at a second home; **the order is preserved and the new name appended**, which is how the member is actually installed |
| **3** | `tests/e2e/refused-reversal-restore.test.mjs:255`–`:256` | `Object.hasOwn(lawfulRollback.value, 'log') === false` — *"a lawful reversal carries NO log"* | **`true`**, and (on that drive's arm) `log.length === 0` | **`D-38`'s *"a lawful reversal is unchanged"* is the ground this assertion stands on, and `D-119` is the ruling that changes it FOR ONE MEMBER** — **the re-derived cell asserts `D-77`'s and `D-78`'s rule instead: the member is PRESENT on the passing arm and `[]` is its honest value there.** The record's three declared members (`:243`) stay green |
| **4** | `tests/e2e/downstream-claims.test.mjs:861`–`:862` | the same assertion, the same sentence | **`true`** | the same re-derivation at its second home; **`Object.keys`' census at `:848`–`:851` stays green** |

**AND EVERY WRITE-ANSWER CENSUS OF §1.2's TABLE STAYS GREEN** — they read `Object.keys` and deep-equality, and the
member is non-enumerable. **Two further rows are named because their greenness is the proof that (a) moved no DECLARED
shape:** `JSG-11.1` (`greens.mjs:1303`–`:1308`) already reads the enumerable set alone (`D-75` moved it there), and
`tests/e2e/blind-entry-module.test.mjs:372`, `:391`, `:392` are `.d.ts` TEXT censuses that a docblock does not touch.
**A pass that finds one of those three red has taken form (b) by accident.**

### 6.3 · NO BLIND CELL IS OWED, AND THE REASON IS THE TREATMENT'S OWN

**A blind cell's value is its capacity to TURN** (`verification.md §3.3`'s rule). **`RSL-1`–`RSL-9` are written BEFORE
the carrier lands, against a tree on which every one of them is RED — so the blind treatment is discharged BY
`RSL-3` AND `RSL-4`, which assert the two arms a reader of the ruling would get wrong (an empty list where the tree
answers `[commit]`, and the enclosing list on the nested call), and no separate blind instance is minted for a
behaviour whose falsifier is one descriptor read.**

---

## §7 · THE PROSE, BY SITE

**SEVEN POSITIONS AND THE NOTE'S SIXTH LINE. TWO of the seven are REPLACEMENTS IN PLACE of sentences this ruling makes
false, and FIVE are ADDITIONS; none of them states a figure that no instrument checks.**

| # | position (read this date, `5325526`) | what stands there now | what replaces it |
| --- | --- | --- | --- |
| **P-1** | **the guide's `§8.0a`**, the clause opening *"⟶ AND ITS SECOND HALF IS NOW DELIVERED, 2026-10-28 — `D-58` · THE DROP"* (`docs/guides/package-use.md:1522`) | its closing sentence: *"on an arm whose handoff carries no list at all — a repair body that throws, and a PASSING `write` (whose answer is `{op, watched, triggered}` and has never carried one) — the entries are no longer readable after the call"* | **A dated clause beside it (`D-119`, 2026-11-02): the PASSING half of that sentence is WITHDRAWN BY NAME and the throwing half stands.** The passing `write` now carries the commit's list at `record.log`; the `[]` arms are §4.3's four; the seal and the drop are unmoved; and **the sentence that survives is the throwing arm's, which has no record at all** |
| **P-2** | **the guide's `§6.5a`**, the measurement's first bullet (`:728`–`:731`) | *"no refusal, no status and no `log` member: nothing of the listener's outcome crossed"* | **A dated clause beside the measurement (`:731`) naming BOTH bytes it supersedes — this one and the same claim at `:786` (*"with no status and no `log`"*) — and stating what is now true: the answer carries `log`, and it carries its OWN commit's entries and NOTHING of the listener's**, because `D-60`/`D-53` put a listener's act in the listener's own commit. **The substance of both measurements — *what crosses* — is unmoved; only the byte string is.** |
| **P-3** | **the guide's `§9.2`**, after the paragraph *"SO THE BYTES AT `filePath` ARE THE BYTES OF THE LAST SUCCESSFUL SAVE"* (`:1720`) | nothing — the section states what SAVES and has no sentence about what the caller can AUDIT | **ONE ADDED PARAGRAPH, and it is the architect's own ground in a consumer's words:** *your passing answer names what your act moved downstream* — a `write` and a `delete` that pass carry the commit's `log`, so the constraint checks each pair ran, every repair that landed an edit and the address each repair moved are readable off the answer you already hold, **without a second call, a `read` sweep or a diff** (`D-119`) |
| **P-4** | **the guide's `§7.6`**, at the `D-104` clause's neighbourhood (`:1101`–`:1104`) | the three things that section owns about a repair's *delivery* | **ONE ADDED CLAUSE:** **the repair that ran for your write leaves a `repair-run` entry in the commit's list, and that list is on YOUR PASSING ANSWER at `record.log`** — so the address a repair moved away from your own write is a datum you can read rather than infer, **and the `repair-run` entry's `opId` is the op the repair landed** |
| **P-5** | **`bindings/js/README.md`'s `## The surface`**, after the `discarded` presence clause (`:84`–`:97`) | the `discarded` rule (`D-78`), beside the `commit` clause (`D-55`) | **ONE CLAUSE, on the same pattern those two set:** **`log` is carried by the three records a PASSING call answers — `write`'s record, `delete`'s receipt and `rollback`'s record — NON-ENUMERABLY, present on EVERY passing answer**, `[]` meaning *this act appended nothing it can report* and never *"nothing happened"*; **a spread loses it exactly as it loses `discarded`**; **the FOURTEEN and the enumerable shapes are unmoved.** **The table's answer column is NOT edited, on the pattern the `commit` clause set** |
| **P-6** | **`bindings/js/index.d.ts`'s `WriteRecord`** (`:544`–`:573`, the docblock after the third member, where `discarded` is declared) | three declared members and `discarded` declared by name | **ONE DOCBLOCK PARAGRAPH declaring `log` by NAME, SHAPE and SEMANTICS** (`readonly LogEntry[]`, non-enumerable own accessor, present on every passing answer, `[]`'s four arms, the joined arm's rule, the freeze) — **A DOCBLOCK AND NOT A TYPED LINE, with `discarded`'s own sentence carried across: *"a future pass that owns the census owes it the typed line"*** |
| **P-7** | **`bindings/js/index.d.ts`'s `DeleteRecord`** (`:652`–`:698`) **and `RollbackRecord`** (`:714`–`:741`) | each carries `discarded`'s docblock clause | **the same paragraph at each, in that record's own words** — the delete's names the identity with `commit`'s own array; the reversal's names the **judgement's** list and the four `[]` arms (§3.3) |

**AND ONE MECHANICAL REQUIREMENT BINDS EVERY GUIDE POSITION:** **`bindings/js/README.guide.md` is the generated landing
and is NEVER hand-edited** (`scripts/publish.sh` refuses on drift) — **the landing pass edits
`docs/guides/package-use.md` and re-stages the copy through `scripts/publish.sh --pack --yes`, after which the two are
byte-identical** (`sites.md §2`'s last paragraph, applied unchanged).

---

## §8 · THE RELEASE NOTE'S SIXTH LINE (`D-119` item 5)

**TWO POSITIONS IN `RELEASE-NOTES.md`, BOTH DECLARED HERE AND NEITHER WRITTEN BY THIS PASS** (the note is outside this
pass's write scope and is the release pass's):

**(a) THE SECTION'S HEAD SENTENCE MOVES `FIVE → SIX`** — `:60`: *"WHAT IT CARRIES IS FIVE BEHAVIOURS, ONE LINE EACH"*
becomes **SIX**, and the enumeration of what the release carries gains the log's clause. **The class is unmoved:
`PATCH`, `1.9.1`** — a non-enumerable accessor adds no member to any declared surface (`PUB-DD-9`'s `PATCH` row), **and
§1.2 is what the other form would have cost.**

**(b) THE SIXTH LINE, VERBATIM, IN THE SECTION'S OWN VOICE:**

> 6. **A PASSING CALL ANSWERS WITH THE COMMIT'S LOG — THE ENTRIES YOUR ACT APPENDED, ON A RESOLUTION AND NOT ONLY ON A
> REFUSAL.** A `write` and a `delete` that pass answer with the commit's own list at `record.log`: the
> `constraint-check` entry for each pair the pass asked, the `repair-run` entry for every repair that landed, and the
> `commit` entry that closes the arm — **in the order the commit appended them**, and **the same list, the same
> entries and the same positions a refusal about that commit carries** — so a manual data change can read what it
> moved downstream of its own request. **A `rollback` that passes carries its judgement's list, which is where a
> repair the judgement ran leaves its entry.** **The member is non-enumerable and present on every passing answer,
> and `[]` means this act appended nothing it can report — a nested call inside a constraint or repair body answers
> `[]` because the commit it joined has not crossed, and the act that owns that commit reports it** (`D-119`).

---

## §9 · THE WRITE SET, AND ITS DELTA AGAINST `sites.md §1`

**NO MODULE AND NO ENDPOINT ENTERS OR LEAVES THE MAP.** **Every position below is inside a file `sites.md §1` already
carries (`§1.1`–`§1.5`) or inside `index.mjs`, which `§1.3` carries** — **so `docs/L1/modules.json` is unmoved and
nothing is owed to `role_l2_integration` on this row.** **NO STATUS, NO ARITY, NO ENTRY, NO MEMBER AND NO COUNT MOVES:
the fifteen, the fourteen, the twenty, the barrel's six and the `LogEntry`'s five all stand.**

### 9.1 · THE CODE — FIVE POSITIONS, EACH A DELTA

| # | position | the delta | what must NOT move |
| --- | --- | --- | --- |
| **D-1** | `bindings/js/src/entry/kernel-foundations.mjs:944`–`:953` (`sealHandoff`) | **ONE `Symbol.for` KEY DECLARED AND ONE `Object.defineProperty` BEFORE THE FREEZE** — `COMMIT_LOG_SHARED = Symbol.for('provident-storeroom.commit-log-shared')`, carrying `shared === true` | the freeze order; the report's five members; the `shared` argument's own use; `dropHandoff`; the barrel |
| **D-2** | `bindings/js/src/entry/constraints.mjs:1901`'s neighbourhood (beside `defineDiscardWitness`) | **ONE PRIVATE HELPER, `defineResolutionLog(record, list)`** — `Object.defineProperty(record, 'log', { get, enumerable: false, configurable: true })`, answering the one captured reference — **and the ONE MODULE-LEVEL FROZEN EMPTY LIST** the `[]` arms answer | `defineDiscardWitness` and every `discarded` byte; the module's import list gains one name |
| **D-3** | `bindings/js/src/entry/constraints.mjs:859`–`:886` (`constraintWrite`'s answer) | **TWO LINES**: read the ownership fact off the sealed report, install the accessor with the sealed list or with the frozen empty list | `recordOut`'s three members; `defineDiscardWitness`'s call; `report.ops`' rule; the refusal arms |
| **D-4** | `bindings/js/src/entry/constraints.mjs:981`–`:1008` (`constraintDelete`, the `D-3` arm and `exposeCommit`) | **THE SAME TWO LINES ON THE RECEIPT**, at `:1006`'s neighbourhood and in the `D-3` arm at `:981`–`:984` | `exposeCommit`'s `commit` property; the `D-3` arm's `null`; `index.mjs`'s delivery and `discarded` install |
| **D-5** | `bindings/js/src/entry/constraints.mjs:2941` (`judgeReversal`'s passing return) **and** `index.d.ts`-adjacent `bindings/js/index.mjs:706`–`:727` (`rollback`) | **THE JUDGEMENT'S LIST IS FROZEN AT THE FRAME'S `finally` AND ANSWERED; the member installs it on the record** with the same helper | the four `[]` arms (§3.3); `reversalWatch`'s and `judgeReversal`'s other call site (`:2020`, the drain); `carryRefusal`; the record's three members; `defineDiscardWitness`'s call at `:727` |

**AND ONE ROW OF THE FORBIDDEN SET IS RE-AFFIRMED, NOT LIFTED:** **`src/store.rs` gains NO byte** — **the log is
JS-side (`D-53`) and a store-side carrier would re-open `D-58` in the other spelling.** **So does `src/error.rs`,
`src/records.rs`, `bindings/js/src/facade.rs`, `carrier.mjs`, `frame.mjs`, `refusal.mjs`, `artefact.mjs`,
`class-decision.mjs`, `src/constraint-kernel.mjs` and `bindings/js/src/entry/delivery.mjs`** — **the gate's
`SETTLED_ON_THE_PASSING_ARM` test, the save's op and the delivery's set are all untouched.**

### 9.2 · THE PROSE — SEVEN POSITIONS (§7), PLUS THE RE-STAGED LANDING AND THE NOTE

`docs/guides/package-use.md` §8.0a · §6.5a · §9.2 · §7.6 — **four, all replacements-additions inside sections `sites.md
§3` already names, none of them a new section** · `bindings/js/README.md` (one clause, `## The surface`) ·
`bindings/js/index.d.ts` (`WriteRecord`, `DeleteRecord`, `RollbackRecord` — **three docblocks, zero typed lines**) ·
`bindings/js/README.guide.md` (generated, re-staged) · `RELEASE-NOTES.md` (two positions, the release pass's).

### 9.3 · THE TESTS — TWO NEW PATHS AND FOUR TURNED CELLS (§6)

`tests/e2e/resolution-log.test.mjs` (new, `RSL-1`–`RSL-9`) · `tests/unit/js-constraints/resolution-log.test.mjs` (new) ·
**turned, each at its own ground:** `tests/e2e/held-listener-identity-greens.mjs:582`–`:585` (`HLI-07.6`, six names to
seven) · `tests/e2e/surface.test.mjs:762`–`:766` (six names in insertion order to seven) ·
`tests/e2e/refused-reversal-restore.test.mjs:255`–`:256)` and `tests/e2e/downstream-claims.test.mjs:861`–`:862`
(`Object.hasOwn(…, 'log')` reads `true` on a lawful reversal).

### 9.4 · THIS DIRECTORY

**This file, plus ONE POINTER at `sites.md` §8** — **the delta against `§1` lives here and not there, because two
lists of one write set is the second home this directory refuses** (`sites.md §7`'s own rule).

---

## §10 · WHAT THIS DECLARATION DOES NOT CARRY, AND THE TWO QUESTIONS

### 10.1 · TWO GAPS NAMED SO THEY ARE NOT DISCOVERED

1. **THE REGISTRATION'S ENTRIES CROSS TO NOBODY** (§3.4): `addConstraint` answers an identity that may not carry a
   log, and `constraintOn` answers `undefined`. **A registration that lands a repair can change `file`-tier data with
   no answer to read it off.** **This is `D-49`'s own recorded limit, re-affirmed and not widened.**
2. **THE DRAIN'S JUDGEMENT LIST IS STILL DROPPED — PRE-EXISTING, RECORDED, AND NOT THIS RULING'S TO FIX.**
   `judgeReversal` creates a FRESH `judgementLog` and enters a commit frame over it (`constraints.mjs:2619`,
   `:2638`) on **every** call, including the call the restart's drain makes (`:2020`, inside a pass). **On the drain
   arm that list is nested inside the pass's own, so the `repair-run` entries a restarted judgement appends land in a
   list nothing reads** — the pass's commit's list does not hold them. **`D-119` does not reach it** (the drain's
   answer is a REPORT, whose list is the pass's) **and this declaration neither fixes it nor pretends it is fixed.**
   **It is a carriage gap in the restart arm, owed to whoever owns `D-42`'s drain, and the entry `D-119` adds would
   show it the moment a drive compares a restarted judgement's entries against the pass's list.**

### 10.2 · `Q-1` — THE `storeCreate` BATCH, AND IT BLOCKS NOTHING

***Must the batch a `storeCreate` carries in `cfg.constraints` hand its entries to the caller, and if so may `D-58`'s
bound be relaxed for one closed commit?*** **The batch is a call that passes, its registrations append entries, and
the call answers an INSTANCE with no record and no member to spare** (§3.5). **Every route that would carry them — a
`Symbol.for` channel on the instance, a `WeakMap` keyed by it — retains a CLOSED commit's log inside the instance,
which `D-58`'s own bound forbids.** **This unit lands without an answer**: no code, no cell and no prose above depends
on it, and the arm is DECLARED WITHOUT A CARRIER rather than left silent.

### 10.3 · `Q-2` — THE JOINED ARM'S `[]`, AND IT BLOCKS NOTHING

***On the one arm where `D-119` item 1's "same as on failure" and item 4's "not a live view" cannot both hold — a body's
nested `write`/`delete` — which gives way?*** **`[]` IS DECLARED HERE, on `D-119` item 4 AND `D-58` item 1** (§4.2), and
**the failure arm keeps crossing the enclosing commit's unfrozen list because that is `D-41`'s pre-existing carriage and
not this row's subject.** **The one-word alternative — hand the joined passing arm the same array the failing arm
crosses — moves one line and two cells (`RSL-4`'s second half and its `[]` arm), and it is the architect's to give
because it decides whether a body may read a commit's list while that commit runs.** **No code, no prose and no other
cell depends on the answer.**
