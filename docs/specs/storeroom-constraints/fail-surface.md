# Part — `fail-surface` (`U-STOREROOM-CONSTRAINTS`, prefix `D-GP-SCNT`): the kernel's own fail states, the boundary a store code may cross, and the publish reading

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-constraints/`** — authored
  at the gate-2 spec gate **in the same pass** as the contract document's index region and part map, whose
  `fail-surface` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-constraints/fail-surface.md`. **⟶ REPAIRED at the gate-2 repair pass of
  2026-10-13 (`role_spec_writer`) against `VF-4`, `VF-6`, `VF-8`, `VF-9`, `VF-15`, `VF-17` and `CC-3`,
  `CC-9`, `CC-20`, `CC-21`, `CC-31`: the state set stays CLOSED at `KC-1`…`KC-8`, the census is printed
  once with one closing figure, and the message rule and the channel rule are each printed once.**
- **What this part is, and what it is not.** **This part declares the kernel's OWN failure form and the
  kernel's OWN closed state set `KC-1`…`KC-8`; it declares the BOUNDARY at which a store code may reach the
  caller, as a rule about WHOSE ACT produced the code and not as a second store surface; it reads the
  store's closed `16`-member set ONCE as the untouched neighbour it is (**⟶ RE-SPELLED 2026-10-15 BY THE
  GATE-4 FINDINGS PASS: this sentence read `15`, BYTE-FOR-BYTE above and read THROUGH this reading —
  `A: docs/specs/storeroom-native/contract.md §8.1`'s dated clause of 2026-10-15, `ConstraintListInvalid`
  the appended term at rank `16`; no `KC-` state, no census figure and no rule of this part moves with the
  re-spelling**); and it carries the publish reading
  `§B.2`.** **It declares NO store member, mints NO store code, and authors NO test and no implementation**
  (`P: §B.6`; `[T: this part's own scope boundary | CONTRACT]`).
- **THE RULE THIS PART IS BUILT ON, STATED ONCE AT ITS HEAD:** **THE KERNEL'S FAILURE CHANNEL IS THE
  KERNEL'S OWN, AND IT IS THE CALLER'S OWN — SO A CONSTRAINT FAILURE NEVER REACHES THE CALLER AS A STORE
  CODE, AND A STORE CODE REACHES THE CALLER ONLY WHERE THE STORE'S OWN VERB IS WHAT THE CALLER (OR THE
  KERNEL COMPOSING THE STORE'S VERB) INVOKED** (`P: §B.6` — *"the kernel's own failure form and **never** a
  store code; the closed set untouched"*).
  **⟶ RE-DERIVED AT THE RULING-LANDING PASS OF 2026-10-13 (`role_spec_writer`), WHICH LANDS THE ARCHITECT'S LAST THREE ANSWERS (`Q-A`; `Q-B`; `Q-C`) AND CLOSES `CW-07`–`CW-11`: the `KC-8` row's floor sentence now reads a STILL-OWED op's call meeting a compacted base — the checkpoint op itself being one the kernel never passes to the store verb, so the target rule cannot meet a base by its own act — and the row's `observable` cell's *"registry entry is REMOVED"* is read as the OPEN `AttemptRecord` entry and NOT as the commit registry, whose clearing rule (`A: docs/decisions.md` · `A103`) is stated once at `contract.md §5.7`. THIS PART'S CENSUS IS UNMOVED: `8` members on `13` sites (`1 + 4 + 4 + 3 + 1 = 13`), and NO new `KC` member is minted.** **⟶ AND RE-DERIVED AGAIN AT THE `A110` LANDING PASS OF 2026-10-13 (`role_spec_writer`), WHICH AMENDS THE `KC-4` ROW'S TRIGGER LIST AND NOT ITS MEMBER SET: *"produced no op"* now names its THIRD form — an `ok === true` repair return whose `op` member is absent, `undefined` or not the op it landed, which is the APP'S OWN DEFECT and is disposed of as a failed repair — so `KC-4` gains NO new trigger site and its token is read off the SAME `outcome` entry on the same arm `(d)`. THIS PART'S CENSUS IS UNMOVED: `8` members on `13` sites (`1 + 4 + 4 + 3 + 1 = 13`), and NO new `KC` member is minted** (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`).
- **AND THE ONE READING RULE THE STATE TABLE BELOW IS WRITTEN TO SATISFY, STATED SO A TESTWRITER CAN DRIVE
  A STATE WITHOUT PARSING A SENTENCE: EVERY STATE IN THIS PART IS CARRIED BY TWO MEMBERS AND BOTH ARE
  DECLARED — the thrown form's `status` (`§1.1` item 1) and the `outcome` log entry's `state`
  (`kernel-surface.md §2.5` item 1), which carry THE SAME `KC` TOKEN by `§1.1` item 3.** **A drive that
  could only read a state out of a generated sentence had no observation, and `VF-9` is that defect closed**
  (`[T: this part's own reading rule | CONTRACT]`).

---

## §1. The kernel's own failure form, and the boundary rule

### §1.1 The form — one shape, a closed member set, and a thrown-not-returned rule

**EVERY FAILURE THIS KERNEL REPORTS IS A THROWN PLAIN OBJECT WITH EXACTLY THREE MEMBERS, AND THERE IS
EXACTLY ONE SUCH FORM — AND *"THIS KERNEL REPORTS"* MEANS WHERE THE KERNEL'S OWN ACT PRODUCED THE FAILURE:
ON THE ARMS WHERE A STORE'S OWN VERB PRODUCED IT THE CALLER MEETS THE STORE'S OWN FORM INSTEAD, AND
WHICH FORM IS MET BY WHICH ARM IS DECLARED ONCE AT `§1.2` ITEM 3 (`[A: docs/specs/storeroom-constraints/fail-surface.md §1.2 item 3 | CROSS-REF]`).** **THE FALSIFIER IT CARRIES: an object a caller catches from a
failure the KERNEL'S OWN ACT produced whose member set is not exactly `{status, message, log}`, or whose
`status` is a member of the store's closed `15` rather than one of `KC-1`…`KC-8` (`§1.1` item 1).**
**AND THE REFUSED-REPAIR ARM OF `§1.2` ITEM 3 IS THE ONE EXCEPTION THIS SHAPE'S OWN SCOPE NAMES.**

```
{ status: string, message: string, log: LogEntry[] }
```

**`[T: the kernel's failure form and its member set | DECLARED-DEFAULT]`** — **alternatives priced: (i) the
two-member `{status, message}` form the JS unit's `docs/specs/storeroom-js/contract.md §2.5` declares for
the STORE's failures — REFUSED, because the proposal's own clause requires *"returning the message log to
the app as an error message"*, and a two-member form has no place for the log while a caller-side global
would put the log outside the failure and break `P-SM-4`'s arm table; (ii) a returned tagged union or an
`{ok, log}` envelope — REFUSED, because the store's own declaration puts every failure on the THROW side and
this kernel is the store's caller-side twin** (`A: docs/specs/storeroom-native/contract.md §8.3`; `A:
docs/specs/storeroom-js/contract.md §2.5` item 3). **Reversal point: a fresh ruling recorded as an ACTIVE
`docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-constraints/`.**

1. **`status` IS THE KERNEL'S OWN MEMBER TOKEN, AND IT IS ONE OF `KC-1`…`KC-8`.** **It is a string; it is
   never a member of the store's closed `15`; it is never an index, never a lowercased or prefixed variant
   and never a variant of a store member's spelling** (`P: §B.6`; `contract.md §5.3`, `P-IM-3`).
   **AND THE ONE SPELLING IS DECLARED HERE, ONCE, FOR BOTH MEMBERS THAT CARRY A STATE, BECAUSE THE DIRECTORY
   PINNED ONE TOKEN TWICE AND A DRIVE CANNOT READ TWO SPELLINGS OF ONE STATE** (`VF-9`; `CC-3`; `CC-22`);
   **THE `KC` CENSUS DOES NOT MOVE: `8` MEMBERS (`2 + 2 + 2 + 1 + 1`) ON `13` SITES (`1 + 4 + 4 + 3 + 1`).**
   **(a) THE REFUSAL'S `status` CARRIES THE TOKEN SPELLING — `KC-1` … `KC-8` — AND NOTHING ELSE:** **the
   member's value is the token, so `status: 'KC-3'` is the declared spelling and `status:
   'ConstraintViolated'` IS NOT A VALUE THIS MEMBER EVER CARRIES.** **(b) `LogEntry.state` CARRIES THE SAME
   TOKEN, FROM THE SAME CLOSED SET, AND `null` ON THE THREE NON-`outcome` KINDS** — declared at
   `kernel-surface.md §2.5` item 1 and CITED here and never re-derived (`VF-9`). **(c) SO THE ONE RULE
   RELATING THE TWO MEMBERS IS IDENTITY: a drive reads the attempt's state off the thrown form's `status`
   and off its log's `outcome` entry's `state`, AND THE TWO READ THE SAME TOKEN STRING.**
   **(d) THE FULL NAMES ARE LABELS AND NEVER VALUES, AND THEY KEEP EXACTLY ONE DECLARED USE: the `name`
   column of `§2`'s table below pairs each token with its name, and a clause elsewhere in this directory may
   cite a name BESIDE its token — as `KC-8` (`ConstraintRollbackFloor`) — while NO clause may spell a member's
   VALUE as a name.** **AND THE SITES THAT SPELLED THE VALUE AS A NAME ARE RE-SPELLED BY THIS PASS, NAMED ONE
   BY ONE AND COUNTED: `15` `status` slots — `e2e-scenarios.md`'s `E2E-C-3` cell (`ConstraintRepeat`), `§2`
   (`ConstraintRepairFailed`), `E2E-C-13` (`ConstraintRepairRepeat` and `ConstraintRepeat`),
   `e2e-scenarios-b.md`'s `E2E-C-9` (`ConstraintRollbackFloor`), `E2E-C-10` (`ConstraintRepairRepeat`),
   `E2E-C-12` (`ConstraintAddressRefused` and `ConstraintArgRefused`), `E2E-C-14` (`ConstraintRepairFailed`),
   `E2E-C-15` (`ConstraintAttemptOpen` and, twice over, `ConstraintArgRefused`) — with
   `e2e-scenarios.md`'s `E2E-C-1` ruling cell re-spelled for the ORDER clause at
   `attempt-lifecycle.md §2.4` item 5 (iii) (`15 + 4 + 13 = 32` ✓).**

**⟶ AMENDED 2026-10-15 — THE STORE'S SET GAINS A SIXTEENTH MEMBER AND THIS DIRECTORY'S OWN READ MOVES WITH IT, AT ONE CLAUSE, THE AS-FILED CELLS ABOVE STANDING BYTE-FOR-BYTE** (`RCA-8(d)` ANNOTATE-BESIDE: **every `15` printed above is read THROUGH this clause; THIS clause mints no `KC` row, moves no `KC` rank and re-decides nothing the constraint kernel owns**; `RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`, whose set move is ruled at that record's `§22.2`). **THE STORE'S CLOSED SET NOW CARRIES `16` MEMBERS, RANKED `1`…`16`, AND THE SIXTEENTH IS `ConstraintListInvalid` — A LOAD-SIDE VALIDATION FAILURE OF THE CONSTRAINT LIST (`cfg.constraints`), at `docs/specs/storeroom-native/contract.md §8.1` #16 and `§8.2`; the algebra closes as `11 + 2 + 1 + 1 + 1 = 16` ✓.** **AND THIS UNIT'S OWN READ IS UNAFFECTED IN SUBSTANCE AND MOVED IN FIGURE: NOT ONE `KC-1`…`KC-8` ROW MOVES, NO `KC` TOKEN IS MINTED, AND THE SIXTEENTH MEMBER IS NOT A `KC` TOKEN — it is the STORE'S, its trigger is the CONSTRUCTION- AND LOAD-side validation and NOT an attempt's arm, so `§1.1` item 1's rule (*"`status` is a member of the store's closed set rather than one of `KC-1`…`KC-8`"*) reads at `16` from this date.** **AND THE COUNTS THAT MOVE ARE THE ONES THAT PRINT THE SET'S SIZE — `§1.1` item 1, `§1.3`'s cells and `§3.1` — WHILE THE `15 + 4 + 13 = 32` ARITHMETIC IS UNMOVED: its `15` counts `status` SLOTS the kernel's own attempts name and not the store's set size, and no slot of it is added by this amendment** (`docs/specs/storeroom-native-proposal-review.md §22.4`).

2. **`message` IS A KERNEL-OWNED SENTENCE, AND IT HAS TWO PROVENANCES — NAMED HERE, IN ONE CLAUSE, BECAUSE
   THREE OF THIS DIRECTORY'S EARLIER CELLS DISAGREED ABOUT WHOSE TEXT A FAILURE'S MESSAGE CARRIES**
   (`VF-8`; `CC-22`): **(i) THE KERNEL'S OWN GENERATED TEXT — a sentence the kernel generates from its own
   state and the failing trigger's arguments; it is never hand-authored at a call site, never empty, and
   never a placeholder.** **(ii) THE CALLER'S OWN TEXT, CARRIED WHOLE — a string a CONSTRAINT or a REPAIR
   supplied (the constraint's violation message, the repair's *"what was attempted"*), which the kernel
   CARRIES, never rewrites and never regenerates.** **BOTH PROVENANCES ARE LAWFUL IN THIS MEMBER AND IN ITS
   LOG ENTRIES; THE GENERATION RULE GOVERNS (i) AND NOTHING ELSE, and a drive that finds an empty string,
   a placeholder, or a string the kernel rewrote has found the failure this item names.** **AND *"IS A
   CONSTRAINT'S OWN STRING KERNEL-GENERATED?"* IS ANSWERED NO, ONCE: it is carried, and the kernel's own
   text is the kernel's own sentence about the kernel's own state** (`kernel-surface.md §2.5` item 1's
   provenance table).
   **AND A STORE-GENERATED STRING IS NEVER USED AS A KERNEL STATE'S MESSAGE:** the store's generator renders
   messages from the store's codes and there is no store code for a constraint failure, so a store-generated
   string standing as a kernel state's message is a filing defect (`A: docs/specs/storeroom-native/
   contract.md §8.2`). **A store code MAY however be NAMED INSIDE a kernel sentence — and it is named as the
   STORE'S answer, only in the two places `§2`'s table allows: the `repair-run` entry where the store refused
   a repair's edit, and the `outcome` entry where the composition met the floor** (`VF-15`).
3. **`log` IS THE ATTEMPT'S OWN MESSAGE LOG, CARRIED WHOLE** — the same list the attempt record held, plus
   its `outcome` entry (`kernel-surface.md §2.5`). **Its member set is not widened by this form: the log is
   the attempt's, and the failure carries it, it does not copy it into a second shape.** **AND THE TWO LISTS
   ARE THE SAME LIST MEMBER FOR MEMBER, AND ON THE CONSTRAINT-BODY PATH A FAILURE'S `log` carries EXACTLY ONE
   entry the open record's log did not — the `outcome` entry, whose `state` member carries the same `KC` TOKEN
   this form's `status` carries — while ON THE REPAIR-BODY PATH the log the caller holds differs from the open
   record's by that SAME ONE entry: the `outcome` entry, whose `state` carries `KC-4`'s own token, because the caller there holds the BODY'S OWN THROWABLE rather than any form of `§1.1`'s shape and reads no `status` of this form's at all — **AND ON THE THROWING-REPAIR PATH THAT ENTRY'S `state` IS THE ONLY DECLARED CARRIER OF `KC-4`: `e2e-scenarios-b.md`'s `E2E-C-16` step (7) reads the token off the attempt's own `outcome` entry and never off a thrown form's `status`, and no other member of that attempt's report carries it** (`VF-9`;
   `attempt-lifecycle.md §2.4` item 8 (i)–(ii); `composition-and-states.md §2.7` item 13).
4. **THE FAILURE IS THROWN AND NEVER RETURNED.** **There is no returned tagged union, no `{ok, value}`
   envelope, no `Promise` rejection — every kernel item is synchronous — and no `Error` subclass:** **the
   object thrown is a plain object whose prototype is the caller realm's `Object.prototype` — AND WHERE THE
   KERNEL'S OWN ACT IS WHAT PRODUCED THE FAILURE, THE THROWN FORM IS `§1.1`'s three-member one and its
   member set is COMPLETE (`§1.1` items 1 and 3).**
5. **AND A THROWING CONSTRAINT OR REPAIR BODY IS NOT THIS FORM AND NOT A KERNEL STATE:** **its exception
   propagates out of the kernel's own invocation, untouched and unconverted** (`kernel-surface.md §2.3`
   item 1; `A: docs/specs/storeroom-js/contract.md §2.7` item 4).

### §1.2 THE BOUNDARY RULE — whose act produced the code decides whose channel carries it

**THE RULE, IN ONE SENTENCE, WITH ITS TWO HALVES STATED SO BOTH ARE DRIVABLE:** **A FAILURE CROSSES THIS
KERNEL'S SURFACE BY THE CHANNEL OF THE ACT THAT PRODUCED IT — the KERNEL'S channel where the kernel's own
act produced it, and the STORE'S channel where the store's own verb produced it — and the kernel NEVER
CONVERTS ONE CHANNEL'S FAILURE INTO THE OTHER'S FORM.**

1. **THE KERNEL'S OWN ACTS THAT CAN FAIL — FOUR ACTS, WHICH ARE THE FOUR GROUPS OF THE `13` TRIGGER SITES
   `§2`'s census COUNTS AND NOT A CLAIM OF FOUR SITES — each throwing the form of `§1.1`:** **(i)** a
   registration (`K-1`) whose own SHAPE checks the kernel performs before the store sees them
   (`KC-1` for an address shape outside the domain / `KC-2` for an `id` or a `constraint` outside it);
   **(ii)** the attempt's own bookkeeping at `K-2`'s address (`KC-7`); **(iii)** the constraint pass's own
   rule and the repair's own outcome (`KC-3`…`KC-6`); **(iv)** the per-op rollback composition's floor and
   its guard (`KC-8`, `composition-and-states.md §2.6` items 4–5).
   **AND THE FOUR IS A COUNT OF ACTS AND NEVER OF SITES, PRINTED WITH THE CENSUS'S OWN ARITHMETIC SO THE TWO
   FIGURES ARE NOT READ AS ONE: the census's own terms are what decide the sites — `KC-2` and `KC-7` are each reachable at TWO of these acts — `KC-2` at `(i)`'s
   shape check and at an attempt-reference check, `KC-7` at `(ii)` and at `(iii)` — while the other `6`
   members (`KC-1`, `KC-3`, `KC-4`, `KC-5`, `KC-6`, `KC-8`) stand at ONE site each — **so the census's `13`
   member-site pairs split by act as `2 + 3 + 4 + 4 = 13`, whose terms are the four counts `(i)`–`(iv)`, and
   the acts' OWN members account for `6` of the `13` with the `7` sites of `KC-2` and `KC-7` making up the
   rest: `6 + 7 = 13` ✓** (`fail-surface.md §2`'s
   closing census, where `KC-2` stands on `4` sites and `KC-7` on `3`).
2. **THE STORE'S OWN ACTS, AND THE VERB THAT PRODUCED THE CODE DECIDES THE CHANNEL:** **where the kernel
   invokes the store's own verb as the caller's own act — the `listen` call `K-1` makes, the write verb at
   `K-2`, and the write or delete a REPAIR invokes — the failure is the STORE'S, it is thrown in the STORE'S
   own form, and the KERNEL WRAPS NOTHING AND RE-LABELS NOTHING.** **The store's form is a thrown
   `{status, message}` whose `status` is one of the store's closed `16` members VERBATIM and whose `message`
   is the store's own generated string — **⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: this item read
   `15`, BYTE-FOR-BYTE above and read THROUGH this reading; the set is `16` with `ConstraintListInvalid`
   appended at rank `16` (`A: docs/specs/storeroom-native/contract.md §8.1`'s dated clause of 2026-10-15),
   and the store's form, the channel rule and every `KC-` state of this part are UNMOVED by the count (`A: docs/specs/storeroom-native/contract.md §8.3`; `A:   docs/specs/storeroom-js/contract.md §2.5`). **AND THAT IS THE ANSWER AT `K-1` AS WELL, WHERE THE STORE'S
   MACHINERY REFUSES A REGISTRATION** (`VF-6`): **the store's own code is thrown at the `listen` call the
   kernel makes, in the store's own form, and it reaches the caller unconverted — the kernel's `KC-1` is
   reserved for the address SHAPES `kernel-surface.md §2.1` item 1 enumerates as outside the domain, which
   the kernel refuses BEFORE `listen` is called** (`parameter-semantics.md §2.1`; `§2.11` item (i)).
3. **AND ONE ASYMMETRY, STATED BECAUSE IT IS THE RULE'S OWN CONSEQUENCE AND NOT AN EXCEPTION TO IT:** **a
   REPAIR's store failure does not reach the caller as a store failure, because the repair runs INSIDE the
   attempt and the attempt's own answer is the kernel's** — **the repair's verb call threw the store's code
   to the code that made the call, which is the repair's own body and, through it, the kernel; and the
   KERNEL'S OWN RECORD CARRIES `KC-4` ON ITS `outcome` ENTRY'S `state`, WHOSE MESSAGE IS THE KERNEL'S OWN
   SENTENCE, AND THE STORE'S CODE IS NAMED
   INSIDE the `repair-run` entry's `message` as the store's answer** (`A: docs/decisions.md` · `A113`; `kernel-surface.md §2.3` item 2's
   channel clause; `P: §1` — *"a message explaining the change made/attempted"*). **AND WHAT THE CALLER MEETS ON EITHER REPAIR ARM IS DECLARED HERE, ONCE, WITH ITS
    MEMBER SET NAMED EXACTLY, BECAUSE NO CLAUSE OF THIS ITEM NAMES `KC-4` AS THE `status` THE CALLER HOLDS ON THE REFUSED-REPAIR ARM: A REPAIR BODY THAT THROWS
    BEFORE IT RETURNS HANDS THE CALLER THE BODY'S OWN THROWABLE AND NO FORM OF `§1.1`'s SHAPE AT ALL, SO WHERE THE STORE'S OWN VERB REFUSED
    THAT BODY'S EDIT THE CALLER RECEIVES EXACTLY `{message, status}` — TWO MEMBERS, THE STORE'S OWN CODE (`WriteParentNotLink` in this
    unit's own repair window) AS THE `status`, THE STORE'S OWN GENERATED SENTENCE AS THE `message`, AND NO `log` MEMBER — WHILE THE
    KERNEL'S THREE-MEMBER FORM OF `§1.1` IS MET WHERE THE KERNEL'S OWN ACT ANSWERS THE CALLER, I.E. ON A `K-3` THROW AND ON `K-2`'S OWN
    REFUSALS, AND THERE ONLY IS THE THROWN FORM'S `status` `KC-4`.** **AND THE KERNEL'S OWN `KC-4` STANDS WHOLE BESIDE THE STORE'S OBJECT:
    THE CLOSED ATTEMPT'S RECORD CARRIES THE TOKEN IN ITS `outcome` ENTRY'S `state` AND NAMES THE STORE'S CODE INSIDE THE `repair-run`
    ENTRY'S `message`, SO A DRIVE THAT READS `KC-4` OFF THE `status` OF THE OBJECT THE CALLER CAUGHT HAS MISREAD THIS ARM, AND A DRIVE
    THAT FINDS A `log` MEMBER ON THAT OBJECT HAS FOUND THE TWO ARMS CONFLATED** (`A: docs/decisions.md` · `A113`; `attempt-lifecycle.md §2.4` item
    8 (i)–(ii); `composition-and-states.md §2.7` item 13; `live-greens.md`'s `CON-4`; `DEF-2026-10-15-O`). **AND WHICH MEMBER CARRIES
   IT IS NOT A CHOICE: the entry's `message` carries it, the entry's `state` stays `null`, and — on the KERNEL's own channel, where this item's own thrown form is the one met (`§1.1` item 1) — the thrown form's `status` is `KC-4`** (`VF-15`; `CC-20`; `CC-9` — **an op the store refused was never returned, so
   it is not in the attempt's `ops`**). **AND WHAT EACH OF THOSE TWO MEMBERS CARRIES ON THIS PATH IS DECLARED
   ONCE, AT `§2`'s `KC-4` ROW'S OWN BODY, WHICH THIS ITEM CITES AND DOES NOT RE-STATE: where the store's own verb
   refused the repair's edit, that entry's `message` is the KERNEL's own sentence for the attempted repair WITH
   THE STORE'S OWN CODE NAMED IN IT as the store's answer — the store's generated sentence being the store's own
   and never a kernel string (`§1.1` item 2) — and that entry's `state` is `null`, this member's token standing on
   the ONE member the throwing-repair path leaves, the attempt's own `outcome` entry** (`§2`'s `KC-4` row;
   `kernel-surface.md §2.5` item 1; `attempt-lifecycle.md §2.4` item 8; `live-greens.md`'s `CON-4`) — **AND THAT SETTING'S NAMING DUTY IS SETTLED AT `§2`'s `KC-4` ROW'S OWN `observable` CELL — *"its `message` NAMES the store's own code where the store refused the repair"* — SO THE SENTENCE THAT MADE THIS CLAUSE'S NAMING DUTY `OWED` TO THE KERNEL BUILD IS WITHDRAWN BY NAME HERE, at this item, AND WHAT THE BUILD OWES IS THAT DECLARED CELL AND NOT A CLAUSE OF THIS ITEM: a `repair-run` entry whose `message` carries the kernel's own description of the attempted repair and NOTHING OF THE STORE'S OWN TOKEN is RED at `e2e-scenarios-b.md`'s `E2E-C-13` — driven live, its window's store token being `WriteParentNotLink`** (`scratch/live-constraints-gate6-out.txt`'s `E2E-C-13.6`, `13.7`; `§2`'s `KC-4` row's `observable` cell). **AND THE ONE READING OF THIS ITEM
   THAT COULD BE READ AGAINST `§1.1` ITEM 1 (c) IS RULED HERE: THAT ITEM'S IDENTITY RULE GOVERNS THE FORM
   `§1.1` DECLARES — the kernel's own thrown form and the log it carries — while ON THIS PATH the caller holds
   the BODY'S OWN THROWABLE, which is the STORE's own form carrying the store's own code for its `status`, so the
   two homes do not disagree, `§2`'s `KC-4` row is the MORE SPECIFIC clause and governs this path, and the driver
   that read it that way read it rightly** (`§1.1` item 3; `attempt-lifecycle.md §2.4` item 8 (i);
   `kernel-surface.md §2.3` item 1; `NX-2`).
4. **NO DOUBLE-REPORTING, AND NO SWALLOWING:** **a failure is reported ONCE, on the channel of the act that
   produced it** — **a kernel state that repeats a store code as its own `status` is a finding, and a store
   failure the kernel silently swallows where the caller's own act was the verb call is a finding too.**
   **AND THE ONE PLACE A STORE MEMBER IS OBSERVABLE FROM THE KERNEL'S OWN RECORD IS THEREFORE NAMED, SO
   *"ONCE"* IS CHECKABLE: it is a LOG ENTRY'S `message` and nothing else** (`§2`'s table's `The log's duty`
   column).

## §2. THE KERNEL'S OWN CLOSED STATE SET — `KC-1`…`KC-8`, each with its trigger, its answer and its log duty

**THE SET IS CLOSED AT EIGHT MEMBERS.** **`8` states = `2` registration states (`KC-1`, `KC-2`) + `2`
evaluation states (`KC-3`, `KC-4`) + `2` repeat states (`KC-5`, `KC-6`) + `1` attempt-bookkeeping state
(`KC-7`) + `1` composition state (`KC-8`) — `2 + 2 + 2 + 1 + 1 = 8` ✓.** **A failure whose `status` is
outside this set is a filing defect and not an extension of the set.** **AND THE SITES ARE NOT THE MEMBERS: `8` MEMBERS STAND ON `13` TRIGGER SITES, AND THE `5` FURTHER SITES ARE THE MULTI-SITE MEMBERS THE CLOSING CLAUSE NAMES — `KC-2` on `4` sites and `KC-7` on `3`, so the `6` single-site members' `6` sites plus those `7` are the `13` — and that figure is the ONE live one.** **THE TRIGGER-SITE COUNT IS PRINTED WITH ITS TERMS AT THIS TABLE'S CLOSING CLAUSE, WHICH IS WHERE ITS ARITHMETIC CLOSES.**

| # | `status` | The triggering state — the ONLY state that produces it | The kernel's answer | The log's duty |
| --- | --- | --- | --- | --- |
| **`KC-1`** | **`ConstraintAddressRefused`** | **`K-1` `register`: the `address` is a SHAPE outside the store's own address domain (`null`, `undefined`, a non-array, **OR AN ARRAY CARRYING A SEGMENT THE STORE'S OWN SEGMENT DOMAIN REFUSES**), refused by the kernel BEFORE the store sees anything — **AND THIS ROW'S OUTSIDE ENUMERATION IS RE-DERIVED FROM THE KEY'S OWN INJECTIVE SPELLING, WHOSE ONE HOME IS `attempt-lifecycle.md §2.4` item 2, SO IT PRINTS EXACTLY THE SHAPES A PAIR KEY CANNOT SPELL (`S6`):** **the REFUSED shapes are a NON-ARRAY (`null`, `undefined`, a boolean, a number, a `string`, a function — and NOT an array, the EMPTY ARRAY `[]` included) and an ARRAY CARRYING A SEGMENT OUTSIDE THE STORE'S OWN SEGMENT DOMAIN** — a NON-`string` element (`null`, `undefined`, a boolean, an object, an array, a function) · a negative integer · a non-integer number · an integer above `Number.MAX_SAFE_INTEGER` (`2^53 − 1`) — **and the OUTSIDE SET NAMES NO STRING-LENGTH GROUND: NEITHER THE STORE'S SEGMENT DOMAIN NOR THIS KERNEL DECLARES ANY BOUND ON A SEGMENT'S LENGTH, so an over-long element is REFUSED BY NOTHING HERE and a length bound is owed, if it is owed at all, to a fresh ruling at `docs/specs/storeroom-native/store-model.md §1.5` item 1's OWN HOME.** **AND THE *BLANK TOKEN* THIS ROW'S EARLIER WRITING REFUSED IS NOT REFUSED ANY LONGER, WITHDRAWN HERE BY NAME BECAUSE THE DOMAIN'S OWN HOME ADMITS IT: the empty string `''` is a LEGAL `string` segment, a legal key and a legal register key at the store's own domain, so the kernel REFUSES NO ADDRESS FOR CARRYING IT, and every address that carries it keeps a spelled, injective key (the segment `''` spelling its own length-bound field `0:`)** (`A: docs/specs/storeroom-native/store-model.md §1.5` item 1, `''`'s legality), AND **NOT the state in which the store's own `listen` refuses an in-domain address, which is the store's own code on the store's own channel (`§1.2` item 2)** | **throws `§1.1`'s form; NO registry entry is added and NO store registration is made** | **no entry is appended: no attempt is open** |
| **`KC-2`** | **`ConstraintArgRefused`** | **at `K-1`: the `id` is not a non-empty string, or the `constraint` is not a function** — **and at `K-3` `runAttempt`: the `CommitRecord.attempt` names a CLOSED or UNKNOWN attempt — the stale record a caller still holds after a terminal arm (`RD-9`; `kernel-surface.md §2.1` item 3) — and at `K-4`/`K-5`: the attempt reference names no attempt the kernel holds.** **AND NOT AN ABSENT `value` AT `K-2`, WHICH IS NOT THIS MEMBER** (`NV-9`): **the `value` argument is the store's own write argument and an absent one is refused by the STORE's own verb, whose own code is thrown on the STORE's own channel — the kernel passes the argument through, reads no `KC-2` for it, and adds no registry entry** (`kernel-surface.md §2.1` item 2's `tier` clause carries the same reading for the tier; `§1.2` item 2) | **throws `§1.1`'s form; NO registry entry is added, and NO attempt's state moves** | **no entry is appended** |
| **`KC-3`** | **`ConstraintViolated`** | **the evaluation pass: a constraint returns the `{message}` arm — **OR a value outside the three-arm set, WHICH IS READ AS THIS `{message}` ARM and NOT by the pair's own registration** — AND NO REPAIR IS REGISTERED FOR ITS PAIR, **AND THE PAIR IS NOT IN `ran` BEFORE THE EVALUATION — i.e. the pair has NOT ALREADY RUN in this attempt** — the arm `attempt-lifecycle.md §2.4` item 4 calls `(c)`. **A `{message}`-returning pair that HAS a repair is NOT this state: it takes arm `(b)`** (`VF-7`; `RC-20` — an outside form's own reading is the arm and does not depend on the pair). **AND A PAIR THAT IS IN `ran` IS NEVER THIS STATE — NO REPAIR REGISTERED OR NOT: a pair already run and violated again is `KC-6`'s state** (`RE-4`) | **appends the failing entry and the `outcome` entry; composes the per-op rollback; removes the registry entry where that arm's own rollback is a SUCCESSFUL ROLLBACK and leaves it standing where it is not (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause); THROWS `§1.1`'s form carrying the log** | **the failing entry's `message` is the CONSTRAINT's own text where the arm carried one and the KERNEL's own generated sentence otherwise; the `outcome` entry's `state` is `KC-3` and its `message` names the arm** |
| **`KC-4`** | **`ConstraintRepairFailed`** | **the repair transition: the repair returns `{ok: false, message}`, OR the repair returns a value OUTSIDE `§2.3`'s declared repair-result forms (read as this `{ok: false, message}` arm — `parameter-semantics.md §2.8`), OR the repair's own verb call threw the store's code, OR the repair produced no op — AND *"PRODUCED NO OP"* INCLUDES AN `ok === true` RETURN WHOSE `op` MEMBER IS ABSENT, `undefined`, OR NOT THE OP THE REPAIR ACTUALLY LANDED: that return is the APP'S OWN DEFECT, it is disposed of as a FAILED REPAIR and never as a kernel defect of its own, and it lands HERE with the same token, the same arm and the same log entries** **AND WHERE THE STORE'S OWN VERB REFUSED THE REPAIR'S EDIT — THE GROUND THIS UNIT'S OWN REPAIR PATH RUNS ON — THAT ENTRY'S `message` IS THE KERNEL'S OWN SENTENCE WITH THE STORE'S OWN CODE NAMED IN IT, declared once at `§1.2` item 3 and read here: THE KERNEL'S GENERIC DESCRIPTION OF THE ATTEMPTED REPAIR ALONE DOES NOT SATISFY IT, AND THE CODE IS THE STORE'S OWN TOKEN — `WriteParentNotLink` in this unit's own repair window — and never a kernel string and never a `KC` token.** **THE CELL THAT PINS IT IS `E2E-C-13`'s `repair-run` MESSAGE, AND ITS DRIVE READS THE STORE'S OWN TOKEN OFF THAT MEMBER** (`e2e-scenarios-b.md`'s `E2E-C-13` step (5) (β); `scratch/live-constraints-gate6-out.txt`'s `E2E-C-13.6`, `13.7`; `live-greens.md`'s `CON-4`; `§1.2` item 3) (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`) — the arm `attempt-lifecycle.md §2.4` item 4 calls `(d)`. **AND A REPAIR BODY THAT THROWS BEFORE IT RETURNS REACHES THIS SAME ARM AND THIS SAME MEMBER, DECLARED SO THE TWO READINGS ARE ONE (`NX-2`; `RD-7`): its `repair-run` entry is appended, this member's token is what the terminal record carries, and the CALLER STILL RECEIVES THE BODY'S OWN THROWABLE AND NEVER `§1.1`'s FORM (`attempt-lifecycle.md §2.4` item 8 (i)).** **AND THE THIRD GROUND IS EXHAUSTIVE OVER THE `delete` ROUTE, DECIDED AT `kernel-surface.md §2.3` ITEM 2 (ii) (`RC-1`): the `DeleteReceipt` carries no op member on ANY arm, so a delete-shaped repair — a successful fix by deletion included — produces no op and reaches THIS state and no other** | **same as `KC-3`; the attempt fails and the log explains what was ATTEMPTED** | **the `repair-run` entry carries what was attempted, and its `message` NAMES the store's own code where the store refused the repair; and THE DECLARED MEMBER THAT CARRIES THIS MEMBER ON THE THROWING-REPAIR PATH IS NAMED SO IT IS NOT SOUGHT IN THE THROWN FORM: WHERE THE REPAIR BODY THROWS BEFORE IT RETURNS, THE CARRIER IS THE ATTEMPT'S OWN MESSAGE LOG — its ONE `outcome` ENTRY, whose `state` member carries `KC-4` and is read off the log the caller holds after the throw (`e2e-scenarios-b.md`'s `E2E-C-16` step (7) reads THIS member and not any arm of `§1.1`'s form, the caller there holding the BODY'S OWN THROWABLE) — while WHERE THE ARM IS REACHED WITHOUT A BODY THROW the same member is read off that same `outcome` entry's `state` (`attempt-lifecycle.md §2.4` item 4's arm `(d)`)** |

**AND THIS ROW'S `The log's duty` CELL IS THE ONE HOME OF WHAT THE `repair-run` ENTRY CARRIES WHEN THE STORE
REFUSED THE REPAIR'S OWN EDIT, AND OF WHAT THAT NAMING COSTS — DECLARED HERE BECAUSE THE GATE-5 BLIND RUN READ
THE ENTRY'S `message` AS *"the pair's repair was attempted"* WITH THE STORE'S OWN CODE NAMED NOWHERE IN IT, the
`state` `null`, the body's own throwable reaching the caller unchanged and THIS member's token standing on the
attempt's `outcome` entry** (`live-greens.md`'s `CON-4`, `[E2E-C-13.3]`, `[E2E-C-13.6]`): **the `message` that
NAMES the store's own code WHERE THE STORE REFUSED THE REPAIR is a DECLARED DUTY OF THE KERNEL BUILD AND IS
`OWED` — owner `role_kernel_writer`, positive revisit condition *the kernel's own generated sentence for a
refused repair naming the store's code, driven again by this directory's `E2E-C-13`* — AND THE TWO OBSERVATIONS
BESIDE IT ARE UNAFFECTED AND ALREADY GREEN: the entry's `state` IS `null` and this member's token IS carried by
the attempt's `outcome` entry on the throwing-repair path, both VERIFIED AT THE BLIND RUN. **SO `e2e-scenarios-b.md`'s
`E2E-C-13` observation (β)'s naming limb is RED AT THE BUILD THE BLIND RUN DROVE AND GREEN ON NOTHING ELSE: this
directory declares the naming, the drive asserts it, and the build does not yet do it — a MISSING SENTENCE and not
a missing member, the entry's own two members being present and their declared values read.**

| **`KC-5`** | **`ConstraintRepairRepeat`** | **`§A.2`'s first limb, and the ONLY state that produces it: an evaluation violates a pair that (i) had ALREADY RUN in this attempt — `ran` membership BEFORE this evaluation — and (ii) IS IN `appliedRepairs` before it — its repair is the repair already RECORDED AS APPLIED** — so the repair's own edit was broken by another constraint's repair; **the state `attempt-lifecycle.md §2.4` item 4 calls `(e)`.** **The predicated pair is (i)+(ii) and NOT *"a repair is registered for it"*, DECIDED HERE WITH THE REGISTRATION-KEYED READING WITHDRAWN BY NAME: a pair in `ran` whose registered repair has NOT run is `KC-6`'s state and never this one** (`RC-6`) — **AND (i)+(ii) IS ONE PREDICATE AND NOT A LIST FROM WHICH A LIMB MAY BE TAKEN, DECIDED HERE AT THE ROW'S OWN BODY BECAUSE THE TWO LIMBS ARE DRIVEN SEPARATELY AND A ROW READ IN PARTS DECIDES THE WRONG TOKEN** (`RE-1`; `e2e-scenarios.md`'s `E2E-C-5` `[5.6]`/`[5.9]`; `live-greens.md`'s `CON-3`): **(ii) ALONE — a pair in `ran` that is NOT IN `appliedRepairs` — IS `KC-6`'s row's state and NOT this one, so this row is read as `ran` AND `appliedRepairs` together and never as its second conjunct standing by itself; the two arms are PAIRWISE DISJOINT on the `appliedRepairs` predicate alone, exactly as `attempt-lifecycle.md §2.4` item 4's disjointness rule declares, and the ONE window this directory drives on that side is `e2e-scenarios.md`'s `E2E-C-2`, whose pair `1:a#x` is IN `ran` and NOT IN `appliedRepairs` and whose token is `KC-6`** | **same as `KC-3`; NO repair function is invoked a second time** | **the failing entry names the pair and the fact that its repair had already run — observable as a `repair-run` entry count of `1` for that pair's OWN KEY and never `2`; the `outcome` entry's `state` is `KC-5`** |
| **`KC-6`** | **`ConstraintRepeat`** | **`§A.2`'s second limb, and the ONLY state that produces it: an evaluation violates a pair that (i) had ALREADY RUN in this attempt — `ran` membership BEFORE this evaluation — and (ii) is NOT IN `appliedRepairs` at that moment — NO repair is registered for it, or a registered repair has not run** — a constraint whose repair the attempt never applied, violated a SECOND time in one attempt; **the state `attempt-lifecycle.md §2.4` item 4 calls `(f)`.** **A pair NOT yet in `ran` whose violation has no repair registered is `KC-3` and NOT this state, and the `KC-3`/`KC-5`/`KC-6` arms are therefore pairwise disjoint on the two predicates `ran` membership and `appliedRepairs` membership** (`VF-4`; `RC-6`) | **same as `KC-3`** | **the failing entry names the pair — observable as the pair's OWN VIOLATION count of `1` and never `2` for that pair's key, whose `constraint-check` entries under that key are `2` and never `3` (`RD-3`) — and the `outcome` entry's `state` is `KC-6`** |
| **`KC-7`** | **`ConstraintAttemptOpen`** | **`K-2`: the address already holds an OPEN attempt — the kernel's own bookkeeping, and the refusal happens BEFORE the write verb is reached** — **at `K-3`: a re-entrant `runAttempt` for a live attempt's own address, i.e. a second run of ONE attempt, refused where the first run has not returned (`attempt-lifecycle.md §2.4` item 8 (ii) (b), which adds this site and mints no member) — and at `K-5`: `report` over an attempt that is STILL OPEN.** **All three sites name ONE state: an attempt at that address is live — THE `K-2` SITE REFUSING A SECOND CALL ONLY WHILE THE ATTEMPT IS GENUINELY LIVE — AND WHEN THE ADDRESS COUNTS AS HELD IS READ AT ITS ONE DECLARED HOME, `kernel-surface.md §2.1` item 2, WHICH THIS ROW DOES NOT RE-STATE: the hold opens by the `K-2` call's own act and is released by the attempt's own TERMINAL ARM AND BY NO OTHER ACT, so a second `K-2` issued after that arm RETURNS a fresh record and throws no `KC-7` whatever the tick it is issued in, and a second `K-2` issued while the attempt is live is refused before the write verb is reached. **AND WHAT A FAILED COMMIT LEAVES AT THE ADDRESS IS READ UNDER THE SAME ONE READING, WITH `A111` CITED WHERE IT GOVERNS: THE CALLER'S OWN EARLIER WRITE AT THAT ADDRESS IS NOT LEFT STANDING BY ANY CLAUSE OF THIS DIRECTORY — a failed commit there UNDOES it, the store's own reach being subtree-wide and backward to the oldest entry (`A: docs/decisions.md` · `A111`; `A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4) — AND THE PRE-STATE CLAIM IS `OWED` TO THE STORE-SIDE PASS `J-20`–`J-22` (`contract.md §0.1` item 5 (i)), so NO CELL OF THIS BATTERY READS AN ADDRESS'S PRE-STATE AS A VERIFICATION THIS SURFACE CAN HAVE.** **AND WHETHER A REMAINDER A FAILURE ARM LEAVES STANDING — THE COMMIT REGISTRY'S OWN ENTRY, HOLDING THE OPS THAT ATTEMPT NEVER UNDID (`A: docs/decisions.md` · `A106` `Q3`) — COUNTS AS AN ATTEMPT THAT HAS NOT REACHED ITS TERMINAL ARM AND SO REFUSES A LATER `K-2` IS DECLARED HERE, AT THIS MEMBER'S OWN ROW, IN ONE READING, BECAUSE THE GATE-6 LIVE RUN FOUND THE ADDRESS UNABLE TO ANSWER AFTER A FAILED ATTEMPT AND THE CLAUSE MUST LEAVE NO ROOM FOR THAT READING: **THE COMMIT REGISTRY'S OWN ENTRY STANDING AFTER A FAILURE ARM IS RESIDUE AND NOT A LIVE ATTEMPT — AN ATTEMPT WHOSE TERMINAL ARM HAS RUN HAS REACHED ITS TERMINAL ARM WHATEVER ITS OWN COMPOSITION LEFT STANDING — SO A LATER `K-2` AT THAT ADDRESS RETURNS A FRESH RECORD AND NEVER THROWS `KC-7`, ITS WRITE VERB BEING REACHED, because THE HOLD IS RELEASED BY THAT ARM AND BY NO OTHER ACT and is READ AT ITS ONE HOME `kernel-surface.md §2.1` item 2, WHICH THIS ROW STILL DOES NOT RE-STATE; AND THE REMAINDER THE ENTRY HOLDS IS READ BY THE ATTEMPT THAT OWNS IT AND BY NO LATER PROCESSING** (`kernel-surface.md §2.1` item 2; `composition-and-states.md §2.6` item 10; `A: docs/decisions.md` · `A106` `Q3`; `E2E-C-6.3`/`E2E-C-6.4`). **AND THE DRIVING CELL IS NAMED, WITH THE TWO LIMBS THE LIVE RUN SEPARATES** (`scratch/live-constraints-gate6-out.txt`; `live-greens.md`): **`E2E-C-2.8` IS THE CELL THAT PINS THE ADDRESS'S POST-FAILURE STATE — THE DUTY IT WAS WRITTEN WITH, *"after a failed attempt at an address that held a value, the store's own read there MUST ANSWER THE CALLER'S OWN EARLIER VALUE, `present: true` and never `AddressNotFound`"*, IS WITHDRAWN BY NAME AS THE FAILED COMMIT'S PRE-STATE CLAIM (`A: docs/decisions.md` · `A111`), WHICH IS `OWED` TO THE STORE-SIDE PASS `J-20`–`J-22` AND IS NO VERIFICATION THIS SURFACE CAN HAVE: the cell pins THE STORE'S OWN ANSWER INSTEAD — what the composition's own performed calls left there, read from the steps' own `undoneOps`/`restoredTo` members — while `E2E-C-6.3` and `E2E-C-6.4` pin the `K-2` LAYER: a second `K-2` BEFORE the terminal arm throws `KC-7`, and one after it returns a fresh record and throws none. AND THE LIVE RUN'S OWN OBSERVATION IS THE STANDING LIMIT AND NOT A FAILURE OF THAT LIMB: its second `K-2` at the OPEN attempt's address was refused with `KC-7` as declared, while the address a FAILED attempt had left behind answered `AddressNotFound`, so the later write the caller made there was refused by the STORE's own absent value and by nothing this member declares — that absence being what `A111` records the store's own reach leaves at an address the caller already wrote to, and not a limb of this member over-reaching the hold. SO THIS MEMBER IS READ OVER THE TWO CASES ABOVE ONLY, AND THE ENTRY THE WORDING THAT MADE THE REMAINDER A SETTLED NON-REFUSAL IS WITHDRAWN BY NAME AT THIS ROW** (`kernel-surface.md §2.1` item 2; `VG-4`; `DB-7`; `E2E-C-6.3`/`E2E-C-6.4`).** **AND THE `K-2` SITE'S OWN SCOPE IS NAMED SO THE TABLE DOES NOT CARRY TWO ANSWERS FOR ONE CALL** (`NV-9`): **it is the ADDRESS-ALREADY-HELD refusal and NOT an absent `value` — an absent `value` at `K-2` is the store's own write-verb refusal, thrown on the store's own channel, and the kernel adds no registry entry for it** (`kernel-surface.md §2.1` item 2) | **throws `§1.1`'s form; the store sees NO write at all** | **no entry is appended: the first attempt's log is untouched** |
| **`KC-8`** | **`ConstraintRollbackFloor`** | **the per-op rollback composition, on `composition-and-states.md §2.6` item 5 (b)'s OWN condition: a `rollback` call over an op the composition STILL OWES fails `RollbackCompacted`, or fails `JournalOpUnknown`** — **and where a recorded throwing step's `answer` carries a store code that is NEITHER, this member is still the kernel's own answer and that code is named in the message and is NOT minted into the kernel's `status`** (`RD-8`) — and NOT a call the kernel skipped under `composition-and-states.md §2.6` item 5 (a), which it never issues | **throws `§1.1`'s form; NO reach past the compacted base is claimed and NO rollback the store did not perform is reported; the ATTEMPT-RECORD ENTRY the address was HELD BY is REMOVED where that arm's own rollback is a SUCCESSFUL ROLLBACK — the predicate whose ONE home is `attempt-lifecycle.md §2.4` item 8 (i) (3) — AND THE STANDING REMAINDER WHERE IT IS NOT IS THE COMMIT REGISTRY'S OWN ENTRY AND NOT THAT OPEN `AttemptRecord` ENTRY, THE WORDING THAT MADE IT THE LATTER BEING WITHDRAWN BY NAME (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause; `VG-3`; `A: docs/decisions.md` · `A106` `Q3`)** | **the `outcome` entry's `state` is `KC-8` and its `message` NAMES the store's own `RollbackCompacted` (or `JournalOpUnknown`, or the third code `§3` item 2 names) as the store's answer and names the op whose call met the floor; the attempt's `rollback` member carries one `RollbackStep` per performed call. **AND THIS STATE IS ANSWERED IN THE ATTEMPT'S ONE `outcome` ENTRY: appended ONCE — where the attempt also had a failure arm the floor is answered in that same entry and NO SECOND ENTRY IS APPENDED** (`composition-and-states.md §2.6` item 6 (a); `RE-6`). **AND THIS ROW'S OWN DUTY IS NAMED BESIDE THEM, BECAUSE THE GATE-6 LIVE RUN FOUND A WINDOW WHOSE COMPOSITION MET THE COMPACTED FLOOR AND WHOSE THROWN FORM READ ITS PASS'S OWN ARM INSTEAD (`scratch/live-constraints-gate6-out.txt`'s `E2E-C-9.7`; `live-greens.md`'s `CON-6`): WHERE THE COMPOSITION MEETS THE FLOOR THE KERNEL'S ANSWER IS THIS TOKEN AND NOT THE PASS'S ARM — the attempt's ONE `outcome` entry carries `KC-8`, its `message` NAMES the store's own `RollbackCompacted` as the store's answer AND NAMES THE OP WHOSE CALL MET THE FLOOR, the composition STOPS at that failing call with no step recorded for an op after it, and the token the pass's own arm would otherwise carry `(e)`/`(f)`'s `KC-5`/`KC-6` included — is NOT what the caller holds: `e2e-scenarios-b.md`'s `E2E-C-9` own FALSIFIER states it in that scenario's words (`e2e-scenarios-b.md`'s `E2E-C-9` step (5) and cell 6; `composition-and-states.md §2.6` item 6 (a))**

**AND THE FLOOR IS NOT OVERRIDDEN BY THE COMPOSITION'S TARGET** (`A: docs/decisions.md` · `A102`, `D3`; `RC-14`): **a still-owed op's call that meets a compacted base leaves the store verb answering `RollbackCompacted`, the kernel reporting `KC-8`, and NOTHING RESTORED — the stop op itself being one the kernel never passes to the store verb, the target rule never meets a base by its own act and this rule never makes a restored state observable past the compacted base, this state's `rollback` member still carries one `RollbackStep` per PERFORMED call (the failing call's own step included, its `undoneOps` an EMPTY list and its `answer` the store's code), and NO `KC` token is minted beyond the `8` — **AND THE ENTRY THIS ROW'S `observable` CELL SAYS IS REMOVED IS THE KERNEL'S OPEN `AttemptRecord` ENTRY FOR THE ATTEMPT'S ADDRESS AND NOT THE COMMIT REGISTRY: the commit registry is NOT cleared by this state, its edit ops still standing when the composition's own walk reads them, its clearing rule having ONE home at `contract.md §5.7`** (`Q-C`; `A: docs/decisions.md` · `A103`; `attempt-lifecycle.md §2.4` item 7 (i)) — this member's own site is the composition's, and the site count therefore does not move** (`composition-and-states.md §2.6` item 8 (iv)).

**AND ONE CENSUS THIS TABLE CARRIES, PRINTED ONCE WITH ITS TERMS AND CLOSING — THE FIGURE AND THE SITES ARE
ONE OBSERVATION'S TWO COUNTINGS AND THE CLOSING FIGURE IS THE MEMBER COUNT** (`VF-17`; `CC-16`): **THE MEMBER COUNT
IS `8` — the table's own `8` rows, `KC-1`…`KC-8`, read once per member: `2` registration members (`KC-1`,
`KC-2`) + `2` evaluation members (`KC-3`, `KC-4`) + `2` repeat members (`KC-5`, `KC-6`) + `1`
attempt-bookkeeping member (`KC-7`) + `1` composition member (`KC-8`) — `2 + 2 + 2 + 1 + 1 = 8` ✓, and this
is the figure any clause of this directory reads.** **AND THE SITE COUNT IS `13`, RE-DERIVED HERE FROM THE
ENUMERATION AT THE BYTES AND PRINTED WITH BOTH OF ITS TERMS SO THE ARITHMETIC CLOSES** (`NV-9`; `NX-3`; `RD-9`): **`KC-1` is
reached at `K-1`, which is `1` site; `KC-2` at `K-1` (the `id`/`constraint` shape) · at `K-3` (a `CommitRecord.attempt` naming a CLOSED or UNKNOWN attempt — the stale-record arm `RD-9` declares) · and at `K-4`/`K-5` (the
unknown attempt reference), which is `4`; `KC-3`, `KC-4`, `KC-5` and `KC-6` at the evaluation and its
transition, which is `4`; `KC-7` at `K-2` (the address already holds an open attempt, the refusal happening
BEFORE the write verb is reached) · at `K-3` (THE RE-ENTRANT `runAttempt` FOR A LIVE ATTEMPT'S OWN ADDRESS —
an act that runs no second attempt and appends no entry, whose member is this one) and at `K-5` (`report` over
an attempt that is still open), which is `3`; and `KC-8` at the composition, which is `1` — so the same `8`
members stand on `1 + 4 + 4 + 3 + 1 = 13` sites.** **`8` members · `13` sites · the difference is `5` and it is
EXACTLY the further sites of the two multi-site members named: `KC-2` stands on `4` sites and `KC-7` on `3`
where every other member stands on one — `KC-1`, `KC-3`, `KC-4`, `KC-5`, `KC-6` and `KC-8` are `6` members on
`6` sites, `KC-2` and `KC-7` are `2` members on `7` sites, and `6 + 7 = 13` ✓, with `13 − 8 = 5` the further
sites and NOTHING ELSE.** **AND THE `K-2` SITE IS `KC-7`'S AND NOT `KC-2`'S, DECIDED HERE BECAUSE THE TWO
READINGS DIFFERED ON WHICH MEMBER A REFUSED `commit` CARRIES** (`NV-9`): **an absent `value` at `K-2` is the
STORE's own write-verb refusal — the kernel passes the argument through and the store's own code is thrown on
the store's own channel, exactly as `kernel-surface.md §2.1` item 2's `tier` clause prints for the tier — and
the kernel does NOT read that state as `KC-2`; `KC-2` stands on the four sites printed above, and a drive that
finds `KC-2` thrown for an absent `value` has found a defect.** **AND `KC-7`'s
`K-3` site is this pass's own addition, declared at `attempt-lifecycle.md §2.4` item 8 (ii) (b): a re-entrant
`runAttempt` for a live attempt is refused by the EXISTING member and mints no ninth one, so the MEMBER
census stands at `8` and only the subsidiary site count moves.** **AND `KC-2`'s
`K-3` site is this pass's own addition, declared at `kernel-surface.md §2.1` item 3 (`RD-9`): a `K-3` whose `CommitRecord.attempt` names a CLOSED or UNKNOWN attempt is refused by the EXISTING member and mints no ninth
one, so the MEMBER census stands at `8` and only the subsidiary site count moves.** **The `11`-site figure
the PREVIOUS pass printed is WITHDRAWN BY NAME at this line, together with the `4`-site listing the first
writing of this table printed and the earlier `9`-site and `12`-site figures, and together with the line
reading *"the one-member-over-two-sites is `KC-2`"* — and the two `K-3` additions this pass made are
WITHDRAWN FROM NO CLAUSE, because they are declared: `KC-7`'s `K-3` site at `attempt-lifecycle.md §2.4` item 8
(ii) (b) and `KC-2`'s `K-3` site at `kernel-surface.md §2.1` item 3.** **The reading each withdrawn figure
carried is retired with it: the `11`-site figure omitted `KC-2`'s `K-3` site, the first counted
`KC-2`'s second site inside a group it also counted as one member, which made two readings out of one census;
the second over-counted the sites by reading an absent `value` at `K-2` as a site of `KC-2` while the same
table's `KC-7` row claimed that call as its own; and the third under-counted the multi-site members as one.**
**The figure and the sites are ONE observation's two
countings and the closing figure is the member count: `8` ✓**
(`[T: the table's own census, printed once with its terms and one closing figure | CENSUS]`).

**⟶ AND THE IDENTITY RULE OF `§1.1` ITEM 1 (c) IS SCOPED HERE, ON THE ARCHITECT'S RULING OF 2026-10-16, SO IT IS NEVER READ OVER THE ONE ARM WHOSE CROSSING FORM IS THE STORE'S (`role_spec_writer`; `A: docs/decisions.md` · `A120` (2), 2026-10-16, `ACTIVE`).** **THE RULE STANDS BYTE-FOR-BYTE ABOVE AND READS: *"a drive reads the attempt's state off the thrown form's `status` and off its log's `outcome` entry's `state`, AND THE TWO READ THE SAME TOKEN STRING"* — AND IT GOVERNS WHERE THE KERNEL'S OWN FORM CROSSES, WHICH IS EVERY ARM BUT ONE.** **THE ONE ARM IT DOES NOT REACH IS THE FAILED SAVE'S TERMINAL ARM, DECLARED AT `kernel-surface.md §2.1` item 3 FROM THIS DATE AND READ HERE AT THIS FILE'S OWN ROW ABOVE: THE STORE'S TWO-MEMBER `{status: 'FileCommitFailed', message}` CROSSES — no caller-side `status` carries a `KC` token — WHILE THE ATTEMPT'S ONE `outcome` ENTRY CARRIES THE KERNEL'S OWN COMPOSED TOKEN, `KC-8` AT THE FLOOR (`KC-8`'s own row above) AND `KC-3` WITHOUT ONE.** **SO ON THAT ARM THE TWO MEMBERS CARRY TWO DIFFERENT TOKENS OF TWO DIFFERENT SETS, and that is the declared law and not a divergence: `KC-8`'s row's *"the `outcome` entry's `state` is `KC-8`"* is the member that carries it** (`kernel-surface.md §2.1` item 3; `composition-and-states.md §2.6` item 6 (a); `docs/specs/storeroom-js/surface.md §2.11` clause 5). **AND THE `Object.keys(caught)` CENSUS THIS DIRECTORY'S REFUSAL ROW PINS GREEN IS NOT DISTURBED BY THIS READING: the store's throwable keeps exactly its two members, `status` and `message`** (`bindings/js/test/file-tier-save.test.mjs:180`, `:873`, `:928`, `:1859`; `A: docs/decisions.md` · `A120` (2)). **NO ROW OF THIS TABLE MOVES, NO MEMBER IS MINTED, AND THE COUNTS ABOVE — `8` MEMBERS ON `13` SITES — ARE UNMOVED BY THIS CLAUSE.**

## §3. THE STORE'S CLOSED `16` READ ONCE — the untouched neighbour, and the two members a caller-side attempt can meet

**THIS SECTION DECLARES NOTHING STORE-SIDE.** **It reads the store's own set as the neighbour this unit does
not move, so that no reader of this directory has to open the store's contract to answer *"did the constraint
kernel add a code?"* — the answer is NO, and this section is why.**

1. **THE SET IS THE STORE'S, IT IS CLOSED AT `16` MEMBERS AS OF 2026-10-15 AND WAS CLOSED AT `15` WHEN THIS SECTION WAS FILED, AND IT IS STILL UNTOUCHED BY THIS UNIT:** **no member
   is minted, renamed, re-ranked, dropped or re-triggered; `§8.1`'s table and its own arithmetic
   (`11 + 2 + 1 + 1 = 15` ✓ — **⟶ RE-SPELLED 2026-10-15 BY THE `CODES`-CLASS SWEEP (`role_spec_writer`): the sum is §8.1's FILING-TIME print and stands BYTE-FOR-BYTE above; the LIVE ALGEBRA OF THE STORE'S SET IS `11 + 2 + 1 + 1 + 1 = 16` ✓, the fifth term being `ConstraintListInvalid` at rank `16`, so nothing of this unit's own claim moves — the set is the store's and this unit still touches none of it**) stand whole; and every store message is still GENERATED from its code and its
   arguments by `§8.2`'s rule** (`A: docs/specs/storeroom-native/contract.md §8.1` · `§8.2`).
2. **THE TWO MEMBERS A CALLER-SIDE ATTEMPT'S OWN COMPOSITION CAN MEET ARE NAMED, AND THE CLAIM'S SCOPE IS
   STATED SO IT IS NOT OVER-READ** (`P: §B.6`): **they are `RollbackCompacted` (member `11`) and
   `JournalOpUnknown` (member `10`) — the store's two arms THAT THE KERNEL'S OWN PER-OP ROLLBACK COMPOSITION
   can meet, because the composition is the only store act the ATTEMPT itself performs.** **AND THE THIRD STORE CODE A PER-OP CALL CAN RAISE IS ANSWERED HERE RATHER THAN DISCOVERED, DECLARED SO THIS ITEM'S `TWO`
   IS NOT OVER-READ** (`RD-8`): **a per-op call over an op the composition still owes may fail for a store arm
   that is NEITHER of these two, and where that recorded step's `answer` carries such a code the KERNEL'S OWN
   ANSWER IS STILL `KC-8` — the store's code is named in the `outcome` entry's message as the store's own
   answer, and it is NEVER minted into the kernel's `status`** (`composition-and-states.md §2.6` items 3 and 5 (b);
   `fail-surface.md §1.2` item 2; `[T: the third store code's disposal, so no caller meets an unnamed arm | CONTRACT]`). **NO MEMBER IS MINTED FOR IT: the kernel's set stands CLOSED at `8`.** **The other
   members of the set are reached at the CALLER'S OWN verb calls and are not arms of the attempt's own
   machinery:** **`commit`'s write can throw the write path's own codes** (`AddressMalformed` ·
   `AddressNotFound` · `LeafHasNoDownstream` · `TierNotFound` · `OutOfDomainTier` ·
   `ParentAnchorMonotonicityViolation` · `ContainerKindConflict` · `WriteParentNotLink` · `ValueNotAdmitted`
   · `FileCommitFailed`), and **a repair's write or delete can throw any of them too** — **the store's code is the STORE'S, thrown by the store's own verb, on the store's own channel, and it is the store's own code** (`fail-surface.md §1.2` items 2–3; `A: docs/specs/storeroom-native/write-and-read.md §3.4` · `§4.4`).
   **AND THE TWO SHAPES BEHIND
   THE TWO WRITE-PATH GROUPS ARE NAMED, SO A REPAIR'S `delete` ROUTE IS NOT READ AS UNWATCHED** (`CC-31`):
   **the store's `write` returns `{op, watched, triggered}` and its `delete` reports what it removed; the
   journal op's closed `kind` set is exactly `'write'` and `'delete'`, and the store's trigger selection is
   prefix-inclusive at any tier for its tracked operations — so a repair's delete at a watched address is in
   the store's own triggered set** (`A: docs/specs/storeroom-native/write-and-read.md §6.2` item 4 · `§6.5`
   item 3; `kernel-surface.md §2.3` item 2's delete-route clause).
3. **AND THE STORE-SIDE SUBJECTS THIS UNIT DOES NOT SETTLE STAND `OWED`, NOT SILENT — AND THEY ARE NAMED
   HERE AS THE FAIL SURFACE'S OWN DEBT:** **`J-20`** (the evaluation's timing relative to the landing) ·
   **`J-21`** (what the core must expose for the evaluation) · **`J-22`** (whether a repair writes through
   the journaled write path) — **owner: the architect; positive revisit condition: a ruling recorded as an
   ACTIVE `docs/decisions.md` row** (`A: docs/specs/storeroom-native/contract.md §7.3` clause 3; `R: §11.1`
   — the `U22` residue). **No clause of this part states any of the three, and this unit's failure arms are
   declared WITHOUT any of them** — **which is why `KC-4` is stated as *"the repair produced no op"* and not
   as *"the repair's route"*** (`P: §B.7`). **AND THE SAME HOLDS FOR THE TWO `CARRIED-OPEN` ROWS THE FILING
   LEAVES: `U12` (the attempt's window edges against store activity, owned into `EO-1`) and `U15` (the
   journal's scope and lifetime as a caller-side attempt's referent, owned into `EO-2`) stand `OWED` with
   their owners named at `e2e-scenarios.md §3`, and no clause here settles either** (`attempt-lifecycle.md §2.4`
   item 6; `CC-4`; `CC-30`). **AND THE GATE-2 RE-REVIEW'S OWN PARKED ROWS ARE DISPOSED OF HERE BY THEIR
   STATUS AND BY NOTHING ELSE — `RC-3` (the closed-attempt store's retention) · `RC-19` (the finite bound's authority) · `RC-14` (the per-op rollback's collateral reach, `ANSWERED`) · `RC-18` (two live attempts at nested addresses, `ANSWERED`) —
   the two that are OWED are `RC-3` and `RC-19`, and ONLY THOSE TWO are `OWED` here:
   BOTH STAND AS `OWED` ROWS at the same item's own rows — AND ONLY THOSE TWO — with the architect named: each `STATUS: OPEN — awaiting the `architect`, and NO clause of this part settles either** (`RC-3`; `RC-19`). **AND THE OTHER TWO STAND AS `OWED` ROWS NOWHERE: `RC-14` AND `RC-18` READ `ANSWERED` — 2026-10-13, `A: docs/decisions.md` · `A102` — `RC-14` reading the per-op
   rollback's subtree-wide collateral reach and `RC-18` two live attempts at nested addresses, so this list
   CLOSES AT TWO AND NOT AT FOUR** (`RC-14`; `RC-18`; `contract.md §0.1` item 5 (v);
   `composition-and-states.md §2.6` item 8).

## §4. THE PUBLISH READING — `§B.2`, and where it is acted on

1. **THE RULING, AND ITS OWN CONDITIONAL FORM:** **`§B.2` reads `PUB-DD-9`'s `MINOR` class and requires it
   to be ACTED ON BEFORE ANY PUBLISH.** **The reading, in the publish unit's own declared terms: `MINOR` is
   *"a member ADDED to the declared surface, or a target ADDED to the matrix"*, and its declared handling is
   *"a BOUNDED AMENDMENT of `docs/specs/storeroom-publish/` FIRST — because a sixth name is a bounded
   amendment and not a build flag"*** (`A: docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-9`;
   `A: docs/specs/storeroom-publish/release.md §2` — the `MINOR` row).
2. **WHAT THIS UNIT DOES ABOUT IT, DECLARED SO THE READING IS ACTED ON AND NOT MERELY CITED:** **this unit
   ADDS NO MEMBER TO ANY DECLARED SURFACE** — **the store's surface is unchanged, and the JS package's
   surface stands at its own `8` verbs**, because the kernel is **a SEPARATE, CALLER-SIDE MODULE**
   (`kernel-surface.md §1` items 1–2). **So the reading's class is NOT reached by this unit's own
   declaration, and NO bounded amendment of `docs/specs/storeroom-publish/` is owed by THIS pass.**
   **AND THE REPAIR PASS ADDS NO SURFACE MEMBER EITHER: the records this pass added (`AttemptContext`,
   `RepairContext`, the `RollbackStep`, the `LogEntry.state` member) are the KERNEL'S OWN CALLER-SIDE
   SHAPES, they cross no store surface and they add no member to the store's or the JS package's declared
   surface** (`kernel-surface.md §1` item 3; `P: §B.4`).
3. **AND THE ONE PLACE THE CLASS WOULD BE REACHED, NAMED SO THE READING IS NOT MADE VACUOUS:** **the filing's
   own alternative — placing the kernel INSIDE the existing JS package's namespace as a ninth member of a
   surface closed at `8` (`A: docs/specs/storeroom-js/contract.md §2.9` item 1) — WOULD reach `MINOR`, and
   acting on it would require the bounded amendment FIRST and the architect's release act after it.**
   **That route is REFUSED at this pass and priced at `kernel-surface.md §1` item 1.** **So `§B.2`'s reading
   is consumed as a DECLARED CONDITION on a route this unit does not take, and its conditional is stated
   rather than discharged silently** (`P: §B.2`; `R: §11.4` — the row's own conditional reading).
4. **AND THE PHASE THAT CARRIES IT:** **`implementation-plan.md`'s phase `B2a` is the conditional phase the
   filing declares for exactly this reading** — *"`1` is conditional"* in that file's own closing arithmetic
   — **and it is carried there with its trigger named, never silently skipped**
   (`A: docs/specs/storeroom-constraints/implementation-plan.md` — its phase table's `B2a` row and its
   closing clause).

## `A112` DELIVERY-MODEL RE-SPELL, 2026-10-13

**THE RULING THIS SECTION RECORDS IS `A: docs/decisions.md` · `A112` — the architect's own words of 2026-10-13: *"The Rust store returns the handles, and then the JS surface functions run first the constraints and then, after all constraints pass, any other listeners before returning to the calling process. On a write, all constraints need to be run again anyway so all triggered constraints need to be run, sifting pending out of the set is not needed. Write the entire returned set of triggered constraints as pending and check off as they pass. Likewise, all listeners are not run until the constraints pass, so all listeners are pending on every write."* — AND THIS SECTION RECORDS THAT THIS PART IS UNMOVED BY IT. It restates no standing row.**

1. **NO `KC` ROW OF THIS PART CHANGES — THE FINDING, STATED SO THE ABSENCE IS A READ AND NOT AN OMISSION.** **Every row's `trigger` and `observation` cells were re-read for the ruling's terms, and NOT ONE of them reads a `pending` member, a listener's status, a filter, a subset or a delivery layer:** `KC-1` reads the address's shape at `K-1`; `KC-2` the attempt reference; `KC-3` the pair's first violation; `KC-4` the constraint that keeps failing with no repair registered; `KC-5` a pair's `ran` membership together with `appliedRepairs`; `KC-6` a pair in `ran` without an `appliedRepairs` entry; `KC-7` a live attempt at the address; `KC-8` the store's own floor code crossing the store's channel. **THE MEMBER SET STANDS AT `8` ON `13` SITES, AND NO ROW ID IS CHANGED, ADDED OR RENUMBERED (`§2`; `kernel-surface.md`'s own census).**
2. **AND THE TWO ROWS THAT COME CLOSEST, DECIDED HERE SO NO ROW IS RE-READ AS THE RULING'S SUBJECT.** **(a) `KC-5`'s *"had ALREADY RUN in this attempt"* is the pair's `ran` membership — the attempt's own pass registry, whose one home is `attempt-lifecycle.md §2.4` item 4 — and never a LISTENER's delivery status: `A112`'s *"all listeners are pending on every write"* is a statement about the returned set's membership and moves no membership predicate of that registry.** **(b) `§1.2` item 2's clause that the kernel invokes the store's own verb as the caller's own act stands exactly as printed: the STORE VERBS a `K-1`/`K-2`/repair calls are the caller's own acts, and `A112`'s ruling is about who runs the CONSTRAINTS and the other LISTENERS — the JS surface — and not about who calls the store's verbs.**
3. **THE SUPERSEDED READING THIS PART NEVER CARRIED, NAMED SO NOTHING HERE IS READ AS IT.** **No clause of this part reads a listener as absent from a write's set because it has *"already run"*, and none reads a `pending` member as a sifted subset** (`A: docs/decisions.md` · `A112`; `kernel-surface.md §2.1` item 2).

**END OF THE `A112` DELIVERY-MODEL RE-SPELL SECTION.**

---
