# The repair-outcome types — **DECLARED**: the five named shapes, the two instants, the op, the `Constraint` line, the typecheck's cells, and the release class

**§0 · WHAT THIS FILE IS, WHAT IT MAY WRITE, AND WHAT IT RE-MEASURES.**

**STATUS: `DECLARATION` — the L1 architect's module-and-surface declaration for the typing pass the architect approved. Dated
2026-11-01. Branch `main`, HEAD `06189fa`.** **CLASS: `DOCS AND TYPING, NOT CODE-BEARING` — a declaration file's bytes and no
behaviour byte, no test byte, no manifest byte and no `strata/` byte.** **This pass writes ONE path: `docs/L1/repair-outcome-types.md`.
Every other path in this section is READ, and each figure printed below is a reading of that path's own bytes on this date.**

**THE APPROVAL THIS FILE EXISTS UNDER, AND ITS LIMITS, STATED FIRST BECAUSE EVERY CLAUSE BELOW CARRIES THEM.** The downstream
request `ST-F2` measured three gaps against `provident-storeroom@1.6.1` — a worked example, the SHAPE documented and the TYPE not,
and the refusal sentence's address — and the record disposed of two of them: the example landed in `1.6.2`, the sentence is
`D-88` (2)'s **recorded defect row and not a unit** (`docs/L1/open-items-2026-10-25.md §6` row `5`), and the third was left to the
architect — **`strata/research.md:350`–`:351`, verbatim: *"The one decision the record leaves open is the architect's: mint the
types, move the sentence's text, or leave the record as it stands."***

**AND THAT DECISION HAS BEEN GIVEN — MINT THE TYPES — IN SESSION ON 2026-11-01, AND IT IS THE WARRANT OF THIS PASS.** **IT IS
CITED AS THE ARCHITECT'S WORD OF THAT DATE AND NOT AS A FILED RULING, AND THE DIFFERENCE IS LOAD-BEARING RATHER THAN PEDANTIC:
`strata/decisions.md` ends at `D-100`, no entry there records this approval, and `D-88` (1) — the unit whose fraction *"No code byte,
no type, no test"* bounded THAT unit — is neither amended nor reopened by this pass.** **SO TWO THINGS FOLLOW, BOTH OWED: the
approval needs a `docs/decisions.md`-home row (`D-`-numbered, by whoever holds that file) before any pass may cite it as one, and
until that row stands this file is the approval's only printed record — which is exactly why it is stated at the head, in the
architect's terms, and not buried in a clause.** **NO CLAUSE HERE MAY BE READ AS A RULING: this is a declaration under a word given,
and the word is quoted as given.** **SO THIS PASS TYPES WHAT IS ALREADY DECLARED IN PROSE AND PINNED BY THE KERNEL — five aliases,
one changed type line, and the date-stamped re-derivation of the one sentence that declared the omission.** **It mints no member
(`0`), moves no member (`0`), moves no arity (`0`), mints no status (`0`), mints no `KC` token (`0`), and touches the refusal
sentence's text at no byte — that text stays `D-88` (2)'s, and `D-89`'s withdrawal of `D-88` (3)'s example sentence is read and not
re-opened.**

**WHAT WAS READ, AT ITS OWN BYTES, THIS DATE** (each citation in this file points at one of these and no other):

| path | what was read |
|---|---|
| `strata/decisions.md` | `D-35` (`:2517`–`:2548`), `D-88` (`:4531`–`:4560`), `D-89` (`:4564`–`:4594`), `D-91` (`:4655`–`:4697`), `D-92` (`:4701`–`:4743`), `D-100` (`:5171`–`:5190`) |
| `strata/research.md` | `§10` (`:323`–`:355`), the `ST-F2` intake and its three asks |
| `bindings/js/index.d.ts` | the whole file: **1,308 lines**; the `Constraint` docblock `:1222`–`:1299`, the type line `:1300`; `JournalOp` `:514`–`:523`; `WriteRecord` `:532`–`:561`; `DeleteRecord` `:581`–`:683`; `CommitRecord` `:775`–`:794`; `StoreInstance.write` `:883`; the four `Constraint` positions `:273`, `:1014`, `:1020`, `:1025` |
| `bindings/js/src/entry/kernel-attempt.mjs` | the constraint's context build `:635`–`:641`; the three-arm read `:705`–`:727` (own-member read `:718`–`:724`); the repair's context build `:784`–`:810`; the two-arm read `:899`–`:914` |
| `bindings/js/src/entry/kernel-foundations.mjs` | `landedOp` `:1105`–`:1131`; `landedOpDefect` `:1139`–`:1150` |
| `bindings/js/src/entry/kernel-registration.mjs` | `registrationContext` `:392`–`:403`; `registrationRepairContext` `:447`–`:460`; the route `:492`–`:503`; the outcome read `:377`–`:380`; the credit call `:615`–`:616`; the records' own docblocks `:415`–`:446` |
| `docs/guides/package-use.md §7.6` | the three-arm set `:1055`; `message` required and the own-member read `:1057`; the two-arm set `:1059`; the two records' three-place divergence `:1061`; the four ways the arm meets a consumer `:1063`–`:1068`; the worked example `:1072`–`:1090`; its reading `:1092`; the measurement `:1094`; the arm's messages `:1096`–`:1103` |
| `typecheck/` and the two manifests | `consumer-fixture.ts` (380 lines); `tsconfig.typecheck.json` (88); `tsconfig.typecheck.nodenext.json` (56); the root `package.json`'s `typecheck:stage` / `typecheck` / `typecheck:nodenext` (`:8`–`:10`); `bindings/js/package.json` `:3`, `:27`–`:33`, `:34`–`:42` |
| `tests/e2e/blind-entry-module.test.mjs` | `DECLARED_TYPE_NAMES` `:61`–`:83`; `typeExports()` `:168`–`:175`; the export-set cell `:237`–`:244`; its two neighbours `:246`–`:252`, `:415`–`:425` |
| `docs/specs/storeroom-publish/contract.md` | `PUB-DD-9` at `:117` — the semver policy's `MINOR` row |
| `docs/specs/storeroom-repair-arm-surface/{contract,sites}.md` | `PIN-7` (`contract.md` `:36`); `§4` items 3 and 4 (the two `D-35` divergences); `sites.md:7`, `:11`, `:49` |
| `docs/specs/storeroom-constraint-registration-instant/contract.md` | `PIN-6` (i)–(iii) (`:30`), `PIN-8` (ii)'s re-spelled ranges (`:34`) |
| `docs/L1/module-map.md`, `docs/L1/modules.json` | `module-map.md`'s `index.d.ts` sizes `:111`, `:124`, `:128`; `modules.json`'s latest `sizes_remeasured_*` note (`:854`) and the module/endpoint counts |
| `RELEASE-NOTES.md` | `§1.7.0`'s head `:58`, its two unmoved-sentences bullet `:78`, and the seventh member's own row `:111` |

**THE ONE COUNT THIS FILE PRINTS AS ITS OWN INSTRUMENT, WITH THE INSTRUMENT NAMED.** `bindings/js/index.d.ts` carries **22 exported
declarations at its own `^export` lines** — **13 `interface`s, 8 `type` aliases and 1 `function`** — and **21 of them are TYPES**.
`typecheck/consumer-fixture.ts` imports **20 of those 21** (its `:77`–`:98`; `LogEntry` is the one it does not name). This file's
delta is stated against that figure and against nothing else.

---

## §1 · THE FIVE NAMES AND THEIR MEMBER SETS

**THE SET IS FIVE AND NOT FOUR, AND THE ARITHMETIC IS PRINTED SO NO SIXTH IS READ IN.** The architect's own words name four
shapes to be typed — **the context records and the two returns.** **The kernel's bytes separate the contexts into FIVE aliases'
worth of shape, because ONE of the two records exists in TWO memberships at TWO instants and the kernel says so in terms**: the
repair's record is **six members at the write's own evaluation** (`kernel-attempt.mjs:784`–`:810`) and **the same six plus `write`
at every registration instant — "the record gains its seventh member at this instant and at no other"**
(`kernel-registration.mjs:434`–`:441`, `:447`–`:460`). **So the set is `4 + 1 = 5` ✓, the fifth being the registration's own
addition and nothing invented (§2 prices the three ways to express it).** **NO SIXTH NAME IS MINTED: the route's own function type
is written inline in the fifth alias, and a consumer who wants to name it writes `RegistrationRepairContext['write']`.**

**EVERY MEMBER BELOW IS READ AT THE SITE THAT BUILDS IT. NOT ONE IS INVENTED HERE — the columns are the member name, the member's
type in this file's own idiom, and the line that builds the value.**

### 1.1 `AttemptContext` — **WHAT THE KERNEL HANDS THE CONSTRAINT BODY. 5 members.** Built at **THREE** sites

**THE NAME IS THE TREE'S, AND THE BRIEF'S SUGGESTED `ConstraintContext` IS REFUSED BY NAME WITH ITS GROUND.** The kernel calls
this record **`AttemptContext`** (`kernel-registration.mjs:421`, `:428`; `kernel-attempt.mjs:483`, *"its `AttemptContext.op`"*) —
**and so does THIS FILE, in its own shipped prose, at `index.d.ts:450`: *"`AttemptContext.address`"*, printed beside `JournalOp.address`
and `pair.address` as one of the three addressed records the declaration names.** **The file's `Constraint` docblock already calls the
record *"the attempt's own context"* (`:1225`), and its subject member is named `attempt`.** **`ConstraintContext` would name the
record after the thing that RECEIVES it rather than after the attempt it describes — the brief's list was a suggestion, and the
bytes prefer the word the declaration already prints about itself, so the final set takes `AttemptContext` and says so rather than
renaming the tree's vocabulary silently.**

| member | type | the readings, at the THREE builds |
|---|---|---|
| `address` | `Address` | always `attempt.address.slice()` — a fresh list (`kernel-attempt.mjs:636`, `kernel-registration.mjs:394`, `:729`) |
| `attempt` | `AttemptRef \| null` | the landing's ref (`kernel-attempt.mjs:637`); **`null` at a registration's first ask on states 1 and 2**, the synthetic attempt's ref on state 3 (`kernel-registration.mjs:400`); **the synthetic attempt's ref at the re-run** (`:732`) |
| `op` | `JournalOp \| null` | **the landing, VERBATIM** (`kernel-attempt.mjs:638`); **`null` at a registration's first ask, where there is no landing** (`kernel-registration.mjs:401`); **the repair's own landed op at the re-run** (`:733`, `op: produced`) |
| `tier` | `Tier \| null` | `op.tier === undefined ? null : op.tier` (`kernel-attempt.mjs:639`); **`null` at a registration's first ask** (`kernel-registration.mjs:397`); **the repair's landed tier at the re-run** (`:730`) |
| `value` | `unknown` | `op.after === undefined ? undefined : op.after.value` — **the value the write verb returned** (`kernel-attempt.mjs:640`); **at a registration's first ask, the store's CURRENT value, READ and not landed** (`kernel-registration.mjs:399`); **the repair's landed value at the re-run** (`:731`) |

**WHAT IT IS FOR.** It names the ONE argument the kernel invokes a `Constraint` with, so a consumer can annotate a body and reach its
five members through the compiler instead of through prose.

**AND THE CORRECTION THAT MAKES THE TABLE ABOVE TRUE, PRINTED BECAUSE THE FIRST DRAFT OF THIS FILE GOT IT WRONG: THE CONSTRAINT'S
RECORD IS NOT BUILT AT ONE SITE AND THE TWO INSTANTS ARE NOT ITS ONLY AXIS.** **The builds are THREE — the pass's
(`kernel-attempt.mjs:635`–`:641`), the registration's first ask (`kernel-registration.mjs:392`–`:403`), and the registration's
RE-RUN (`:728`–`:734`)** — and **at the third the three members that are `null` at the second are the REPAIR'S LANDED OP.** So
*"`null` at a registration"* is FALSE as a sentence about the instant: it is true of the registration's FIRST ask and false of its
re-run, and **the `| null` members are each reachable at a NAMED build, not at a named instant.** **The kernel's own clause — *"built
at ONE site so states 1, 2 and 3 hand the caller's body the SAME record and only `attempt` moves"* (`:389`–`:391`) — is SCOPED TO
`registrationEvaluation`'s three states and is not a census of the instant: the re-run is a fourth invocation and a third build.**
**This is why the alias must carry the nullable arms and why it may not print an instant-to-value table of its own: the site decides
the value, and a consumer narrows `op` before reading it — at a re-run and at a landing the narrowing succeeds, at a registration's
first ask it does not.**

**THE PRICE IS PRINTED: at a landing instant and at a re-run `op` is never `null` and `tier` is the op's own tier, so a consumer
must narrow `op` before reading `op.opId` there.** §2 prices the alternative and refuses it.

### 1.2 `RepairContext` — **WHAT THE KERNEL HANDS THE REPAIR AT THE WRITE'S OWN EVALUATION. 6 members.** `kernel-attempt.mjs:784`–`:810`

| member | type | the build |
|---|---|---|
| `address` | `Address` | `attempt.address.slice()` |
| `id` | `string` | `pair.id` — **the member the constraint's record does not carry**; its non-emptiness is `PAR-JS-24`'s prose rule and no type carries it (the same class as `Handle`) |
| `op` | `JournalOp \| null` | the op this evaluation carried — **never `null` at this instant**; the `| null` is the registration's, declared once because the shape is one shape |
| `tier` | `Tier \| null` | `context.tier`, the landed tier |
| `value` | `unknown` | `context.value`, the value the write verb returned |
| `pending` | `readonly TriggerPair[]` | `attempt.record === undefined ? [] : attempt.record.pending.slice()` — **a FRESH list, never the record's own member** (`:806`–`:809`) |

**WHAT IT IS FOR.** It names the ONE argument the kernel invokes a repair with, and it is the record whose `pending` member a
repair supplies at `write`'s declared FOURTH position to join the commit it is already inside (`index.d.ts:862`, pointed at and
re-declared nowhere; `D-46`; the guide `:1061`). **THE NAME IS THE KERNEL'S OWN**: *"the six-member `RepairContext`"*
(`kernel-registration.mjs:416`, `:421`) — the kernel prints `SIX` for this shape, and this alias is that shape.

### 1.3 `RegistrationRepairContext` — **THE SAME SIX AND THE ROUTE THE REGISTRATION ADDS. 7 members.** `kernel-registration.mjs:447`–`:460`

| member | type | the build |
|---|---|---|
| *(the six above)* | — | **NOT RE-DECLARED**: the alias `extends RepairContext` (§2, choice `C`), so each of the six has ONE home |
| `write` | `(address: Address, tier: Tier, value: unknown) => WriteRecord` | `registrationRoute(store, commitRecord)` — **EXACTLY the store's first three positions, the commit NOT a position**, and a supplied fourth refused BEFORE any store act (`:492`–`:503`; `D-91` (2)) |

**WHAT IT IS FOR.** `D-91` granted the registration instant a LAWFUL write route and handed the carrier to the contract; the
contract took **the repair's own record and nothing else** (`D-92` (1); the kernel: `:434`–`:441`, *"the carrier is this record and
nothing else"*). **The alias is where that seventh member is TYPED — it is not a new member and not a new route: the member shipped
and its release note already declares it.** **THE CONSTRAINT'S RECORD GAINS NOTHING AT ANY INSTANT** (`D-92` (1)), and the alias
set enforces that: `AttemptContext` has no `write` and no `pending`, and the typecheck asserts both refusals (§5).

### 1.4 `ConstraintOutcome` — **WHAT THE CONSTRAINT BODY ANSWERS. The CLOSED THREE-ARM SET, 3 arms.** `kernel-attempt.mjs:705`–`:727`

| arm | the shape | the read |
|---|---|---|
| **the pass arm** | `true` | `outcome === true` (`:716`–`:717`) — **the ONLY pass value** |
| **the repairable violation** | `{ message: string; repair: (context: RepairContext \| RegistrationRepairContext) => RepairOutcome }` | the `message` gate first (`Object.hasOwn`), the repair looked for **only inside that branch** (`:718`–`:724`) |
| **the unrepairable violation** | `{ message: string }` | the `message` arm with no repair attached; **AND A VALUE OUTSIDE THE THREE IS READ AS THIS ARM AND NEVER AS A FOURTH** (`:725`–`:727`) |

**WHAT IT IS FOR.** It names the answer the kernel reads, so **a fourth arm becomes a COMPILE ERROR instead of a return the kernel
silently reads as `{message}`**, and a `{repair}`-only return — *"the arm outside the three, and its repair is NEVER SEEN"*
(guide `:1057`) — becomes one too. **`message` IS REQUIRED ON THE REPAIR ARM because the kernel reads it FIRST** (`:718`), and the
alias puts that requirement where a consumer's compiler can hold it.

**WHAT THE ALIAS DOES NOT CARRY, SAID HERE BECAUSE A TYPE THAT APPEARS TO CARRY IT WOULD BE THE DEFECT THIS FILE'S NEIGHBOURS
RECORD.** **The type declares the SHAPE and never the READ.** **AT THE WRITE'S OWN EVALUATION the kernel reads `message` and
`repair` as OWN members** (`:718`–`:724`) **and at a registration instant it reads the same closed outcome through the prototype
chain** (`kernel-registration.mjs:377`–`:380`) — **ONE RETURNED SHAPE ANSWERING TWO DIFFERENT THINGS AT THE TWO INSTANTS, which is
`D-35`'s recorded defect and is OWED to a code-bearing unit.** **A shared type does not make the two reads one and this file does
not claim that it does: the own-member rule stays the instant's, declared where it already stands, and nothing here is read as
symmetric.** **Nor does the type carry `message`'s NON-EMPTINESS or the repair's invocability beyond `function`** — both are prose
rules at `:720` and `:724`, and the typecheck's §5 names them as claims a compiler does not check.

### 1.5 `RepairOutcome` — **WHAT THE REPAIR ANSWERS. The CLOSED TWO-ARM SET, 2 arms.** `kernel-attempt.mjs:899`–`:914`

| arm | the shape | the read |
|---|---|---|
| **the credited arm** | `{ ok: true; op: WriteRecord['op'] }` — `op` **REQUIRED** | `okMember === true`, then `landedOp(attempt, result, op)` (`:899`–`:901`) |
| **the failed arm** | `{ ok: false; message: string }` — `op` **ABSENT** | the caller's own sentence where it is a non-empty string, else the kernel's (`:906`–`:910`) |

**WHAT IT IS FOR.** `ST-F2`'s measured defect is exactly a repair that returns `undefined` or `{ok: true}` and is refused
`ConstraintPassRefused` while nothing a consumer reads says so. **This alias is the sentence, in the compiler's own language:
the op is REQUIRED on the credited arm, the arm is closed, and `undefined` is not one of the two.** §3 takes the `op`'s type apart.

---

## §2 · THE TWO INSTANTS: **ONE COMMON ALIAS PLUS THE REGISTRATION'S OWN ADDITION** (`C`), AND THE TWO ALTERNATIVES PRICED

**THE FACT THE EXPRESSION HAS TO CARRY, IN `D-35`'S AND THE GUIDE'S OWN WORDS: *"ONE RETURNED SHAPE ANSWERS TWO DIFFERENT THINGS
AT THE TWO INSTANTS"* (the guide `:1057`, of the OUTCOME) and, of the RECORD, that the two records *"stand apart at THREE PLACES —
by COUNT, SIX against FIVE; by `id` …; and by `pending`"* (`:1061`).** **The repair's record is SIX against the constraint's FIVE
at the write, and SEVEN at a registration because `write` rides it there and nowhere else. A type that hid the difference would
be the defect it documents.** **AND THE OTHER SIDE OF THE SAME FACT, WHICH IS WHY THE CONSTRAINT'S RECORD NEEDS NO SECOND ALIAS:
its member set does not move across its three builds — only three members' VALUES do (§1.1).**

**DECLARED: `RepairContext` (six) and `RegistrationRepairContext extends RepairContext { readonly write: … }` (seven).** **Four
grounds, each at a byte:**

1. **THE MEMBERSHIP DIFFERENCE IS THE DISCRIMINANT THE KERNEL ITSELF USES**: the seventh member's PRESENCE is what the instant
   adds, and the kernel says the member is *"instant-scoped"* — *"six" and "seven" are one census each, never one census across
   the two instants* (`kernel-registration.mjs:438`–`:441`). `in`-narrowing on `write` is therefore not a device this declaration
   invented; **it is the shape of the fact.**
2. **THE SIX ARE DECLARED ONCE.** `extends` puts each shared member at one home, so a member's type cannot drift between the two
   instants — and the kernel's own six-member builder IS the shared shape (`:416` names it `RepairContext`).
3. **NO MEMBER IS MINTED.** The seventh is read at `:458`; the six at `:449`–`:456`; the constraint's five at
   `kernel-attempt.mjs:636`–`:640`. **Nothing here invents a member, and no `instant`/`kind`/flag is added to either record.**
4. **THE TWO RECORDS STAY TWO.** The constraint's context is not an `extends` of anything and carries neither `id` nor `pending`
   nor `write` — the three-place divergence, kept by construction.

**ALTERNATIVE `A` — ONE ALIAS WITH THE SEVENTH MEMBER OPTIONAL (`write?: …`). PRICED AND REFUSED.** **It would make the repair's
record read SEVEN at BOTH instants, which falsifies `SIX against FIVE` (`:1061`), the kernel's *"the SIX-member `RepairContext`"*
(`:416`) and the instant-scope clause that says the member exists *at this instant alone* (`:434`–`:441`) — and it would state a
PRESENCE that is FALSE at a write, where the member is ABSENT and not merely `undefined`. **It also BUYS THE CONSUMER NOTHING**:
under `strict`, calling a possibly-`undefined` member is a compile error too (`TS2722`), so the same narrowing is owed at the same
call sites. **Cost of taking it: one falsified census figure in a shipped guide clause and one falsified kernel docblock, for no
ergonomic gain.**

**ALTERNATIVE `B` — TWO ALIASES WITH A DISCRIMINANT (`{ instant: 'write' | 'registration', … }`, or a two-arm split on `op`'s
null-ness). PRICED AND REFUSED, AND THE REFUSAL IS NOT "NO DIFFERENCE EXISTS".** **One value DOES differ across the two builds of the
repair's record — `op` is the landing's `JournalOp` at a write (`kernel-attempt.mjs:787`) and the declared `null` at a registration
(`kernel-registration.mjs:454`) — so a split on `op !== null` would compile and would correlate with the instant TODAY.** **IT IS
REFUSED ON THREE GROUNDS THAT ARE THE BYTES' AND NOT TASTE'S:** **(i) it would encode an ACCIDENT of the current build as the
instant's meaning** — the registration's `null` states *"there was no landing before this repair"*, not *"this is a registration"*,
and any later instant in which a repair is invoked after a landing would silently break the correlation while the record stayed
lawful; **(ii) the null-ness is spread across THREE members at that build** (`tier` and `value` ride `op`; `op: null` at
`:454`, `tier: null` at `:452`, `value` read at `:453`), **so a type that picked one of them as THE discriminant would be arbitrary
and the other two would then be redundant arms of the same fact**; **(iii) the narrowing would tell a consumer nothing they can use.
`'write' in rc` answers the question a repair at a registration actually has — *may I write here, and with what?* — while
`rc.op === null` answers a question about the PAST that the consumer already knows, and leaves the route's presence undeclared.**
**And a MINTED discriminant is refused outright: `instant` is on neither record, and the approval this pass holds mints names and no
member.**

**ALTERNATIVE `D` — A SECOND ALIAS FOR THE CONSTRAINT'S CONTEXT (`LandingAttemptContext`, with `op`/`tier`/`attempt` non-null).
PRICED AND REFUSED**, and the price is the one a reader will ask about: **it would buy precision at the landing instant and at the
registration's re-run (no narrowing before `op.opId`) and cost a SECOND declared shape for a record the kernel builds at THREE sites
with ONE member set** (§1.1: `kernel-attempt.mjs:635`–`:641`, `kernel-registration.mjs:392`–`:403`, `:728`–`:734`) — **so the "second
alias" could not be one alias: the sites divide TWO-against-ONE (`op` is a landing at one, `null` at one, a repair's landed op at
one), and a union of two aliases at the position would then be the alias.** **A consumer's constraint is ONE function, armed once
and asked at every one of the three builds, so its parameter type is ONE type.** **The `| null` members are the declared absence the
kernel's own clause prints for the first ask** — *"`tier` — ABSENT … `op` — ABSENT"* (`kernel-registration.mjs:395`–`:396`) — **and
the price is stated in §1.1 and paid at every consumer's `op` read.**

---

## §3 · THE OP: THE STORE'S OWN RECORD, NAMED BY INDEXED ACCESS, AND NEVER A SECOND CARRIER

**DECLARED: `op: WriteRecord['op']` — the store's OWN record, reached through the member that already declares it, so the carrier
is named once and no second carrier is minted** (`index.d.ts:533`; the record is `JournalOp`'s eight members, `:514`–`:523`).
**`DeleteRecord['op']` IS THE SAME MEMBER AT THE SAME NAME AND THE SAME TYPE, WITH ONE DECLARED `null` ARM** (`:591`–`:593`,
`:605`), **and the alias does NOT admit that arm**: a `delete` that removed nothing answers `null` and **credits nothing**
(`:601`–`:605`), so `NonNullable<DeleteRecord['op']>` and `WriteRecord['op']` are ONE type here and the `null` arm is refused by
the TYPE as the credit rule refuses it at runtime. **A repair that called `delete` therefore passes `removed.op` only after
narrowing — and a repair that passes the raw `DeleteRecord['op']` is a compile error rather than a `KC-4`.** **THIS IS THE ONE
PLACE THE TYPE AND THE CREDIT RULE AGREE FOR FREE, and it is worth printing because it is the case `ST-F2`'s class of defect hits
next.**

**HOW THE ALIAS EXPRESSES `opId` AND `seq`, AND WHERE THE GROUND STOPS BEING A TYPE'S.** `opId` and `seq` are `JournalOp`'s own
members and the alias reaches them by naming that record: **`op.opId` is a `string` and `op.seq` is a `number`, at every position
the credited arm is read** — and the two cells of §5 assert exactly that, because the shipped declaration once read `op: number`
and a consumer met a type error on a correct call (`:528`–`:530`). **THE CREDIT GROUND ITSELF IS NOT A TYPE AND THIS FILE DOES NOT
PRETEND IT IS: `landedOp` (`kernel-foundations.mjs:1105`–`:1131`) reads FOUR grounds, and the division they fall into is
RETURN-BYTES against RUNTIME-RELATIONS and not the one a reader might expect — the first TWO are the return's own members and
neither is expressible here:**

1. **the `op` is the return's OWN member** — `ownMember(returned, 'op')`, a `[[GetOwnProperty]]` read (`:1113`). **Structural
   typing cannot express own-versus-inherited**, so a repair returning `Object.assign(Object.create({ ok: true }), { op })` is
   admitted by the TYPE and refused by the KERNEL — the recorded second divergence of `D-35`'s class
   (`docs/specs/storeroom-repair-arm-surface/contract.md §4` item 4).
2. **the `opId` is a non-empty string** (`:1116`–`:1117`) — **`string` cannot express non-emptiness**, the same limit `Handle`
   carries (`index.d.ts:486`).
3. **the `opId` is absent from `attempt.ops`** (`:1118`–`:1120`) — **`attempt.ops` is on no declared record**, so the conjunct has
   no type-level term at all.
4. **where the invoked-for op carries a `seq`, the candidate's is STRICTLY GREATER** (`:1121`–`:1129`) — **a relational ground
   between two runtime values, outside any declaration.**

**AND THE FOURTH GROUND'S SECOND HALF IS THE REGISTRATION'S, STATED SO NO CLAUSE HERE IS READ AS SYMMETRIC**: the credit call at a
registration passes `null` as the invoked-for op (`kernel-registration.mjs:615`–`:616`), **so the ordinal ground is not applied
there and the membership ground stands alone** (`kernel-foundations.mjs:1101`–`:1103`). **The alias is one type for both instants
and the GROUND is one instant's plus a clause — which is why the ground is pointed at and never re-spelled in the type's own
docblock.**

---

## §4 · `Constraint` ITSELF: THE NEW LINE, AND THE SEVEN THINGS THAT DO NOT MOVE

**THE LANDING BYTES — what the implementation pass writes, printed here so nothing is left to a judgement.** **THE FIVE ALIASES
GO AFTER THE TYPE LINE, AT THE FILE'S END, AND THE FILE'S OWN DIVISION OF KEYWORDS IS KEPT**: **a RECORD is an `interface` in this
file (`:832`, `:775`, `:532`, `:581`, `:514`, …) and a UNION is a `type` (`:158`, `:167`, `:346`, `:1300`)** — **so the three
contexts are `interface`s and the two outcomes are `type`s.** **NO OTHER KEYWORD CHOICE IS DEFENSIBLE FROM THIS FILE'S BYTES, and
the choice carries the seventh member's expression: `extends`, one home per shared member.**

```ts
export interface AttemptContext {
  readonly address: Address;
  readonly attempt: AttemptRef | null;
  readonly op: JournalOp | null;
  readonly tier: Tier | null;
  readonly value: unknown;
}

export interface RepairContext {
  readonly address: Address;
  readonly id: string;
  readonly op: JournalOp | null;
  readonly tier: Tier | null;
  readonly value: unknown;
  readonly pending: readonly TriggerPair[];
}

export interface RegistrationRepairContext extends RepairContext {
  readonly write: (address: Address, tier: Tier, value: unknown) => WriteRecord;
}

export type ConstraintOutcome =
  | true
  | {
      readonly message: string;
      readonly repair: (
        context: RepairContext | RegistrationRepairContext,
      ) => RepairOutcome;
    }
  | { readonly message: string };

export type RepairOutcome =
  | { readonly ok: true; readonly op: WriteRecord['op'] }
  | { readonly ok: false; readonly message: string };
```

**AND THE ONE EXISTING LINE THAT MOVES — `:1300`, whose bytes are the subject of the whole pass:**

```ts
export type Constraint = (context: AttemptContext) => ConstraintOutcome;
```

**WHAT THAT COSTS AT THE FOUR POSITIONS THE NAME IS DECLARED AT, AND WHAT IT DOES NOT COST.** `Constraint` stands at `:273`
(`StoreConfig.constraints[]`'s `constraint`), `:1014` (`addConstraint`), `:1020` (`constraintOn`) and `:1025`
(`constraintOff`). **NO POSITION MOVES, NO ARITY MOVES, AND NO MEMBER MOVES — the four signatures are byte-unmoved and only the
alias they name changes meaning.** **A consumer's body annotated `(context: unknown)` STILL COMPILES** — a parameter accepting
`unknown` accepts a `AttemptContext` — **and a body whose RETURN is annotated `unknown`, or which hands back a widened
`boolean`, does not**; that consequence is the pass's point and is priced at §6 and §7.3, not hidden.

**THE DOCBLOCK'S SENTENCE, RE-DERIVED BY NAME, DATED, WITH THE SUPERSEDED SENTENCE STANDING BYTE-FOR-BYTE.** **THE SENTENCE IS
`index.d.ts:1294`–`:1296`:**

> **AND NOTHING HERE MINTS A TYPE, A SYMBOL, AN ALIAS, A SEAM, A RECORD MEMBER OR AN EXPORT**: this clause DOCUMENTS the pair
> your function returns and a two-arm result the kernel already reads, and DECLARES nothing — `Constraint` below is unmoved, one
> `unknown` in and one `unknown` out.

**IT STANDS WHERE IT STANDS, UNTOUCHED, AS THE READING OF 2026-10-30 — the date it was written under
`U-STOREROOM-REPAIR-ARM-SURFACE`'s `PIN-7`, whose own words are *"NO TYPE IS MINTED"* — and it is READ THROUGH the new clause.**
**THE NEW CLAUSE LANDS INSIDE THE SAME DOCBLOCK, BEFORE ITS CLOSE AT `:1299`, DATED 2026-11-01, AND ITS SUBJECT IS THE SENTENCE IT
DOES NOT MOVE. ITS BYTES, PRINTED SO THE LANDING DECIDES NOTHING:**

```text
 * **⟶ RE-DERIVED BY NAME, 2026-11-01: THE SENTENCE ABOVE NO LONGER GOVERNS, AND IT IS NOT DELETED — IT IS READ THROUGH THIS
 * CLAUSE AS THE READING OF ITS OWN DATE.** The architect has approved minting the types that sentence declined, so what stands
 * now is: **FIVE NAMES ARE DECLARED BELOW THIS LINE — `AttemptContext` · `RepairContext` · `RegistrationRepairContext` ·
 * `ConstraintOutcome` · `RepairOutcome` — and `Constraint` below is TYPED rather than unmoved.** **EVERY MEMBER THEY CARRY IS ONE
 * THE KERNEL ALREADY BUILDS, AND NOTHING IS MINTED BUT THE NAMES**: no member, no symbol, no seam, no export, no route and no
 * arity moves, the module namespace keeps its ONE value name, and the closed sets these names carry are the ones this clause
 * already declares. **AND THE CENSUS SENTENCE ABOVE — *"No member census of either record is printed here"* — IS TRUE OF THIS
 * CLAUSE AND IS READ THROUGH THIS ONE: the census is DECLARED at the aliases below, in the only place a consumer's compiler can
 * hold it, and this clause still prints none.** **NO BEHAVIOUR BYTE MOVES: the aliases are erased at run time and the kernel
 * reads the same values it read on 2026-10-30.**
```

**FOUR THINGS THE CLAUSE MUST NOT DO, NAMED SO A LANDING PASS DOES NOT REACH FOR THEM.** **It does not rewrite the superseded
sentence** (`RCA-8(g)` annotate-beside: the old reading stays printed). **It does not spell the own-member rule symmetrically**
(`:1261`–`:1270`'s divergence stands and is `D-35`'s; §1.4 restates it here and the clause itself need not). **It does not print a
member census in prose** — the census is the aliases', and a second printed census would be a second home. **And it edits no byte of
`:1253`–`:1293`** — **the attach and its *"SIX against FIVE"* paragraph (`:1253`–`:1259`), the three-place divergence
(`:1261`–`:1270`), the two-arm set (`:1272`–`:1280`), the credit ground (`:1282`–`:1286`) and the commit paragraph
(`:1288`–`:1292`)** — **nor of `:1296`–`:1298`, the archived-citation sentence, which stands and stays TRUE: its claim is that every
point the clause cites is *"a live print of the kept contract or a live source range on this branch"*, and §7.2's eight rows are LIVE
RANGES that no longer point at their SUBJECTS. Resolve is not point, and the sentence claims the first.**

**THE REST OF `index.d.ts` DOES NOT MOVE, ENUMERATED SO THE DECLARATION IS NOT READ AS WIDER THAN IT IS:**

- **THE CLOSED STATUS SET** — twenty, ranked `1`…`20` (`:346`–`:408`): no status is minted, re-ranked or renamed, and the escape
  arm `(string & {})` stands.
- **THE MEMBERS** — the instance's fourteen (`StoreInstance`, `:832`), `LogEntry`'s five (`:409`), the failure form's four
  (`:460`), `JournalOp`'s eight (`:514`), `CommitRecord`'s four (`:775`), **`DeleteRecord`'s SIX — `address` · `tiers` ·
  `triggered` · `op` · `commit` · `discarded` (`:582`, `:583`, `:585`, `:605`, `:635`, `:679`, and the battery's own cell at
  `tests/e2e/blind-entry-module.test.mjs:373`)** — `WriteRecord`'s three declared members (`:533`–`:535`, its `discarded` carried
  by a non-enumerable accessor and named rather than declared, `:537`–`:560`), `TriggerPair`'s two (`:575`), `ConstraintPair`'s two
  (`:1180`): **not one moves, and the five aliases add no member to any existing record.**
- **THE ARITIES** — `write`'s four positions (`:883`), `read`'s two (`:847`), the three constraint methods' two (`:1014`,
  `:1020`, `:1025`), the module namespace's one name (`storeCreate`, `:1162`): **unmoved.**
- **THE COUNT** — **named TYPES `21 → 26` ✓ (`13` interfaces `+` `8` aliases `→` `16 + 10`) and VALUE exports `1 → 1` ✓.** **A
  `type` alias and an `interface` are ERASED: the runtime namespace's count does not move, and the fixture's existing
  `@ts-expect-error` cells for value imports (`:129`–`:132`) stand.**
- **ZERO CODE BYTES OUTSIDE THE DECLARATION FILE** — no `.mjs`, no `.rs`, no manifest, and no runtime path: **the aliases are a
  `.d.ts`'s, erased at run time, and the kernel executes the same bytes it executed on 2026-10-30.** **AND ONE TEST BYTE IS NOT A
  CODE BYTE AND IS NOT IN THAT CLAIM: `tests/e2e/blind-entry-module.test.mjs:61`–`:83`'s twenty-one-name census of this file's
  type exports MUST gain the five names in the same act, or the battery reds (§5.5).** **That is a CENSUS of a declaration and not
  a behaviour byte; a pass that reads this bullet as "no test moves" reads it wrong, and the wrong reading costs a red leg.**

---

## §5 · THE TYPECHECK'S PART: WHAT `typecheck/` MUST ASSERT SO THE TYPES ARE NOT ORNAMENTAL

**THE INSTRUMENT, FIRST, BECAUSE THE ANSWER QUALIFIES EVERY CELL BELOW.** **YES — the published `index.d.ts` IS the file a
consumer's `tsc` meets, and today it is reached BOTH WAYS.** `bindings/js/package.json:27`–`:32` carries
`"." : { "types": "./index.d.ts", "import": "./index.mjs" }`, so a `nodenext`/`bundler` consumer resolves the declaration through the
`exports` map's own `types` condition, and the top-level `types` field (`:33`) serves the classic resolver the first leg uses.
**The subject is re-staged before every run**: the root `package.json:8`'s `typecheck:stage` deletes and re-copies **`package.json`
and `index.d.ts`** into `typecheck/node_modules/provident-storeroom`, and `:9` runs the stage before `tsc`, so **the bytes checked
are the shipped bytes of the moment, never a checked-in copy** — and **the typecheck is only as good as that step**: a `tsc -p`
invoked without `npm run typecheck`'s stage checks the PREVIOUS stage's declaration. `skipLibCheck: false` (`tsconfig.typecheck.json:81`,
`tsconfig.typecheck.nodenext.json:52`) means the declaration is checked as a library, so the five aliases' internal consistency is
part of the green. **AND THE LIMIT, WHICH IS THIS INSTRUMENT'S WHOLE LIMIT AND IS ALREADY DECLARED AT `consumer-fixture.ts:66`–`:74`:
a green `tsc` never loads `index.mjs` and never compares a declaration to the kernel.** **What a green does NOT prove is
enumerated at §5.4 and it is not short.**

### 5.1 Two existing cells MOVE, and the pass that lands §4 must land them in the same act

**`typecheck/consumer-fixture.ts:115` and `:192` both annotate a constraint body `(context: unknown): unknown`.** **`:192` is the
cell that literally asserts today's `Constraint`** — `const constraint: Constraint = (context: unknown): unknown => context !==
undefined;` — **and under §4's line it is `TS2322`: `unknown` is not assignable to `ConstraintOutcome`.** **`:115` is the same body
inside `StoreConfig.constraints[0]`, where the member is declared `Constraint` (`index.d.ts:273`), and it reds for the same
reason.** **THE HARNESS MAY BE READ BY THIS PASS AND NOT EDITED, SO THESE TWO ARE PRINTED AS OWED DELTAS, NOT APPLIED** — and the
obligation is stated plainly: **a landing pass that writes §4's five aliases and the new `Constraint` line WITHOUT re-deriving
these two cells turns `npm run typecheck` red, and it is the one leg that can see the change.** **Their re-derivation is not
inventive: `:115` becomes a body returning `true` (or an arm) and `:192` becomes the same body annotated `Constraint`, and both
keep the parameter spelling `context: unknown`, which stays lawful.**

### 5.2 The cells the harness must ADD — the four groups, each with the failure it catches

**(i) THE THREE-ARM ANSWER, ASSIGNABLE AS DECLARED** — one cell per arm, and one through the position:
`const passArm: ConstraintOutcome = true;` · a repairable arm whose repair answers `{ ok: false, message: '…' }` · a bare
`{ message: '…' }` · and `store.addConstraint(pair, (ctx) => (ctx.value === 2 ? true : { message: 'refused' }))` answering a
`ConstraintIdentity`. **Catches: an alias that admits a fourth arm, or one that refuses the arm the kernel reads.**

**(ii) THE TWO-ARM REPAIR, ASSIGNABLE AS DECLARED** — `const credited: RepairOutcome = { ok: true, op: written.op };` (the guide's
worked arm, `:1082`, with `written: WriteRecord`) and `const failed: RepairOutcome = { ok: false, message: '…' };`, **plus one
END-TO-END body that compiles**: a `Constraint` whose repair performs `const landed = store.write(['b'], 'mem', 11);` and returns
`{ ok: true, op: landed.op }`. **THE THREE-POSITION SPELLING IS THE ONE THAT COMPILES TODAY, AND THAT IS A FINDING, NOT A
PREFERENCE — §7.1 prices it: the guide's own FOUR-position spelling is refused by the DECLARED TYPE of `write`'s commit position
while the kernel admits it.** **Catches: an `op` that is optional, or a repair whose return is unchecked.**

**EVERY CELL IN THIS SECTION AND THE TWO IN §5.1 WERE MEASURED BEFORE THEY WERE PRINTED, BY A READ-ONLY PROBE THAT STAGED
`bindings/js/index.d.ts` AND `package.json` IN `/tmp`, SPLICED §4'S TEXT OVER `:1300`, AND RAN THE REPOSITORY'S OWN `tsc 5.9.3`
UNDER BOTH LEGS.** **IT READ, WROTE NOTHING IN THIS TREE, AND ITS THREE FIGURES ARE: the spliced declaration is GREEN on both legs
with `skipLibCheck: false`; the real fixture reds with EXACTLY TWO diagnostics, both `TS2322` at `:115` and `:192`; and no
`@ts-expect-error` cell becomes unused (`TS2578` appears nowhere).** **The codes below are that probe's, not this file's
expectation.**

**(iii) WHAT MUST NOT BE ASSIGNABLE — each under `@ts-expect-error`, so an unused directive is itself a compile error**

| the cell | why it must fail | the code the probe measured |
|---|---|---|
| `const a: RepairOutcome = { ok: true };` | `op` is REQUIRED on the credited arm (`:899`–`:901`); this is `ST-F2`'s exact shape | `TS2322`, `Property 'op' is missing` |
| `const b: RepairOutcome = { ok: true, op: written };` | **THE BARE RECEIPT IS NOT THE OP**: `WriteRecord` is not `WriteRecord['op']`, and the credit reads the op, never the record (`:917`, the guide's *"never a record you assembled yourself"*, `:1092`) | `TS2740`, naming the eight members `WriteRecord` lacks |
| `const c: RepairOutcome = undefined;` | a repair that returns nothing is refused `ConstraintPassRefused` (`kernel-attempt.mjs:911`); the type must say so | `TS2322` |
| `const d: ConstraintOutcome = { repair: () => credited };` | no `message`, so *"its repair is NEVER SEEN"* (`:718`–`:724`, guide `:1057`) — **a REAL refusal, not an excess-property one: it reds through a variable too** | `TS2322`, `Property 'message' is missing` |
| `const e: ConstraintOutcome = 'pass';` | the closed set has no string arm, and an outside value is read as `{message}` (`:725`–`:727`) | `TS2322` |
| `const e-bis: ConstraintOutcome = true as boolean;` | **the widened `boolean`** — the shape a consumer's existing body hands back, and the reason §6's change-list row is owed | `TS2322` |
| `const f: RepairOutcome = { ok: false, message: 'x', op: written.op };` | `op` is ABSENT on the failed arm and *"never `null`"* (`:906`–`:910`, guide `:1059`) — **as a FRESH literal this is refused; through a variable it is NOT, and §5.4 prints the measured limit** | `TS2353`, excess-property only |
| `const g: number = written.op;` | stands already (`:324`): `op` is the store's journal record, not a number (`:528`–`:530`) | `TS2322`, and it holds on the OLD declaration too, so that cell stays used |

**(iv) THE `op`'s OWN MEMBERS AND THE TWO CONTEXTS' CENSUSES**

- `const opId: string = written.op.opId;` and `const seq: number = written.op.seq;` — **the alias expresses `opId` and `seq` by
  naming the store's record (§3), and these two cells are the only place that is checked.**
- `AttemptContext`: the five members read at their declared types, then `// @ts-expect-error` on `ctx.pending` **and** on
  `ctx.write` — **the body's context gains no member at any instant** (`D-92` (1)).
- `RepairContext`: `// @ts-expect-error` on `rc.write(…)` **without narrowing** (`TS2339`); **and the narrowing cell must be written
  on THE UNION, not on `RepairContext`** — `declare const u: RepairContext | RegistrationRepairContext;` then
  `if ('write' in u) { u.write(…) }` **compiles**. **`typeof u.write === 'function'` does NOT narrow: the member is `TS2339` BEFORE
  the test, so a `typeof` guard cannot be written at all and the `in` operator is the only discriminator the union offers** (both
  measured).
- **`RegistrationRepairContext` as a STANDALONE declaration** — `declare const reg: RegistrationRepairContext;` and then
  `reg.write(address, 'mem', 1)` compiles, while `// @ts-expect-error` on a FOURTH position (`reg.write(address, 'mem', 1, commit)`,
  `TS2554`) **pins the runtime's own arity refusal** (`kernel-registration.mjs:494`–`:500`) as a compile error — a cell that ties a
  behaviour byte to a type.
- **AND THE FINDING THAT CELL CARRIES, WHICH THE WRITE IS NOT OBVIOUS ABOUT AND MUST NOT BE PRINTED WITHOUT: THE CELL MUST BE A
  `declare const`, NOT AN ANNOTATED REPAIR BODY.** `repair: (rc: RegistrationRepairContext) => …` is **`TS2322`** — the union
  `RepairContext | RegistrationRepairContext` is not assignable to the narrower parameter — **so a consumer annotating their
  repair with the SEVEN-member alias is refused, and the lawful spellings are the six-member alias, the union with `'write' in`
  narrowing, or no annotation at all.** **This is a price of §2's choice `C`, printed rather than discovered.**
- `// @ts-expect-error` on `const seven: RegistrationRepairContext = { …the six… };` — the seventh member is not optional where the
  registration alias is named.

### 5.3 What the harness must NOT be asked to assert

**The count of `@ts-expect-error` cells is not a figure this pass fixes.** **The nodenext leg's head prints `28`
(`tsconfig.typecheck.nodenext.json:21`); read at the fixture's own `:@ts-expect-error` lines this date, the directives stand at
**26**.** **The figure is the harness's to re-take with the cells §5.1 and §5.2 add, and this file prints its instrument so the
reading is falsifiable rather than trusted.** **No cell may be written against a claim §5.4 names as unenforceable.**

### 5.4 The five claims a compiler does not check, printed so no green is read as their evidence

1. **The own-member read, and the three members whose read differs by instant.** **At the write's own evaluation the kernel reads
   `message`, `repair` (`kernel-attempt.mjs:718`–`:724`) and `ok` (`:899`–`:901`) as OWN members; at a registration it reads
   `message` and `repair` through the prototype chain (`kernel-registration.mjs:377`–`:380`) and `ok` with a plain `[[Get]]`
   (`:615`).** **THE `op` MEMBER IS THE EXCEPTION AND IS OWN-ONLY AT BOTH INSTANTS** — `ownMember(returned, 'op')`
   (`kernel-foundations.mjs:1113`, called from `:616` at a registration and from `kernel-attempt.mjs:901` at a write) — **so the
   divergence `D-35` records is three members' and never the carrier's.** **Structural typing cannot tell an own member from an
   inherited one**, so `Object.assign(Object.create({ ok: true }), { op })` satisfies `RepairOutcome` and is refused by the kernel
   at a write while being CREDITED at a registration.
2. **`message`'s non-emptiness** (`kernel-attempt.mjs:720`, guide `:1057`). `string` admits `''`.
3. **`id`'s non-emptiness and `opId`'s** — `PAR-JS-24` and `PAR-JS-9`, the `Handle` class of limit (`index.d.ts:486`).
4. **The excess-`op` arm, and the measured set a variable admits.** A failed-arm return carrying `op` is refused only as a FRESH
   object literal (`TS2353`). **THROUGH A VARIABLE IT IS ADMITTED, AND THE ADMITTED SET IS WIDER THAN THE INFERRED SHAPE — MEASURED
   TWICE, IN THE DECLARATION AND IN A DECLARATION-FREE MINIMAL REPRO: a variable of type `{ ok: boolean; message: string; op:
   JournalOp }` IS assignable to `RepairOutcome`, while the same variable WITHOUT `op` is refused.** **The mechanism is unexplained
   and this file does not guess at one; what it prints is the fact and its consequence: the type cannot be read as a guarantee
   about the failed arm's member set, and the kernel reads nothing there anyway (`:906`–`:910`).**
5. **The credit ground's four grounds** (§3). **The type names the carrier and the ground is prose.** **A green run is not
   evidence of a credit, and `ST-F2` is what a consumer reads when nobody says so.**

**AND ONE STALE HEAD, NAMED AND NOT EDITED.** `tsconfig.typecheck.json:22`–`:33` still declares that a `nodenext` consumer CANNOT
reach the shipped declaration, and `tsconfig.typecheck.nodenext.json:29`–`:33` still names `TS7016` as the failure that leg
catches. **At `bindings/js/package.json:27`–`:32`'s bytes the `exports` map carries a `types` condition, so both legs now resolve
the same file and the second leg measures a reachability the manifest has since granted** — **MEASURED, NOT INFERRED: the probe's
`--traceResolution` on BOTH legs prints a successful resolution of `provident-storeroom` to `index.d.ts`, and both legs exit `0`
on the real tree.** **The harness's owner re-derives those two heads; this pass may not touch them, and no cell above rests on
either sentence.**

### 5.5 **THE ONE COMMITTED CELL THIS CHANGE REDS IS NOT IN `typecheck/` — IT IS IN `tests/e2e/`**

**`tests/e2e/blind-entry-module.test.mjs:237`–`:244` asserts `assert.deepEqual([...typeExports()].sort(),
[...DECLARED_TYPE_NAMES].sort())`, and `DECLARED_TYPE_NAMES` (`:61`–`:83`) is a HARD-CODED list of TWENTY-ONE names; its
`typeExports()` (`:168`–`:175`) is a line regex over `^export (?:type|interface)\s+NAME`.** **§4 takes the file's named types
`21 → 26`, so that cell REDS on the landing pass unless its list gains the five names** — **and the figure is PRINTED in three
places of that one file, each of which the same pass must move: the assertion message at `:242` (`"… twenty-one argument/answer
shapes beside its one name"`), the second test's TITLE at `:246` (`"… the twenty-one declared type names are ERASED …"`), and the
file's head at `:4`.** **THE SAME FILE'S TWO NEIGHBOURS DO NOT RED AND MUST STILL BE READ: `:246`–`:252` iterates
`DECLARED_TYPE_NAMES` and asserts each is `undefined` on the runtime namespace — it passes today only because it never looks at the
five new names, so it is a COVERAGE delta and not a red — and `:415`–`:425` builds its forbidden-name set from
`valueExports() + typeExports() + StoreInstance`'s members and finds none of `findAddress`, `dispose`, `close`, `flush`, `settle`,
`constraintLog`, which none of the five aliases is.** **This cell is the one place a TYPING-ONLY change can turn a green leg red,
and it is the reason `tests/**` is not in this declaration's "unmoved" row: `blind-entry-module.test.mjs` MOVES, in the same act as
`index.d.ts`'s aliases.**

**AND ONE DISAMBIGUATION A READER OF §4 WILL NEED, because two members named `write` now stand in one file's type world and they
are NOT one position.** **`store.write(address, tier, value, commit?)` is the INSTANCE'S member: four declared positions, the commit
fourth** (`index.d.ts:883`). **`RegistrationRepairContext['write']` is the ROUTE the registration instant puts on the repair's own
record: THREE positions, and a supplied fourth is refused before any store act** (`kernel-registration.mjs:492`–`:503`; the arity
test at `:495`–`:500`; `D-91` (2)'s requirement that the write join the registration's own commit, which is why the commit is not
naming). **The docblock's sentence at `:1288`–`:1292` — *"supply it at `write`'s DECLARED FOURTH POSITION"* — is about the FIRST of
the two and stays true; the alias set keeps them apart by giving the route's function type the third position and no fourth.** **A
consumer who reads the two as one spelling meets `TS2554` at the route and `TS2345` at the instance's position (§7.1), and neither
is a defect of this declaration: they are the two positions the kernel and the ruling actually publish.**

---

## §6 · THE RELEASE CLASS — **MARKED, AND NOT DECIDED**

**THE CLASS IS `MINOR`, AND THE NUMBER IS `D-100`'s, UNMOVED.** `docs/specs/storeroom-publish/contract.md:117`'s `PUB-DD-9` row
reads *"a MINOR adds a member to the declared surface or a target to the matrix and is a BOUNDED AMENDMENT of this contract"*, and
**`D-100` (2026-11-01) already fixed this release's class and number — *"Minor — 1.7.0"* — on a different measurement (four refusal
messages changing text).** **`bindings/js/package.json:3` reads `"version": "1.7.0"` and its eleven cells are `D-100`'s; nothing
here moves a version byte, and this declaration does not cut, tag or pack.** **A type addition with no behaviour change therefore
RIDES the number that is already standing rather than minting a second — AND IT RIDES IT ONLY ONCE THE AMENDMENT `PUB-DD-9`'s
`MINOR` ROW REQUIRES HAS BEEN TAKEN** (*"a MINOR … is a BOUNDED AMENDMENT of this contract"*, `:117`), **which is `Q-2`'s question
and not this section's answer: until that amendment stands, the addition is a MINOR-worthy change WITH ITS AMENDMENT OUTSTANDING,
and the change-list row below cannot land ahead of it.**

**WHAT THE RELEASE NOTES WOULD OWE, IF THIS DECLARATION LANDS INSIDE `1.7.0` — three things and no fourth:**

1. **ONE ROW IN THE CHANGE LIST**, naming the five aliases and the one changed line, **in the section that already exists**
   (`RELEASE-NOTES.md`'s `§1.7.0`, `:58`; the landed copy `bindings/js/RELEASE-NOTES.md` is staged byte-for-byte and must be
   re-staged).
2. **THE UNMOVED SENTENCE, READ THROUGH THE ROW.** `§1.7.0`'s *"EVERY MEMBER, EVERY TYPE AND EVERY CONSUMER-VISIBLE ARITY"* is
   unmoved (`RELEASE-NOTES.md:78`) **and is read as *no existing type is moved*: the row is the one place a reader learns that a
   type was ADDED, and the sentence above it is not re-spelled — `RCA-8(g)` annotate-beside, so the old reading stays printed.**
3. **THE CONSUMER CONSEQUENCE, STATED RATHER THAN DISCOVERED.** **A body annotated `(context: unknown): unknown`, or one handing
   back a widened `boolean`, meets a COMPILE ERROR after the change** (§4). **That is a type-level consequence of a type-level
   addition and it is the reason the row is owed at all; a consumer who never annotated their body is unaffected, and no runtime
   answer moves for anybody.**

**AND THE THREE THINGS THE CLASS DOES NOT COVER, EACH NAMED SO IT IS NOT ABSORBED:**

- **`D-100`'s `1.7.0` is UNMOVED by this declaration** — class and number are its, and this file only says the addition fits inside
  them.
- **THE REFUSAL SENTENCE'S TEXT STAYS `D-88` (2)'s RECORDED DEFECT.** *"the repair `<id>` produced no op at `<address>`"*
  (`kernel-attempt.mjs:911`, copied whole at guide `:1100`) **is untouched, unfixed, un-re-versioned and un-queued**: `ST-F2`'s
  third ask stays answered by the ledger row and not by a unit, and **no clause of this file may be read as proposing that the
  new types make the sentence true — they do not, and §1.5's `op`-required arm is a compiler's statement about a RETURN, never a
  store reach at the instant the sentence composes** (`D-67`).
- **`D-89`'s withdrawal stands**: `D-88` (3)'s example sentence is not this file's, is not restored by it, and the address geometry
  is read at `D-89`'s own bytes.

---

## §7 · WHAT THIS PASS FOUND AND DOES NOT REPAIR — three findings, each with an owner

### 7.1 **A DECLARED-vs-BUILT DISAGREEMENT AT `write`'s COMMIT POSITION, WHICH §4's ALIASES MAKE CHECKABLE FOR THE FIRST TIME**

**THE FINDING.** `write`'s declared fourth position is `commit?: CommitRecord` (`index.d.ts:883`) — four members, `attempt` · `op`
· `triggered` · `pending` (`:775`–`:794`) — **while the kernel's own clause says the position is a CLASS TEST and not an identity
test: *"the member this context carries is THE COMMIT'S OWN `pending`, VERBATIM … so the repair's write passes THE CONTEXT and the
position reads the commit it stands for … IT IS A CLASS TEST AND NEVER AN IDENTITY TEST"*** (`kernel-attempt.mjs:800`–`:809`), and
the position's own prose enumerates every admitted form as *"an object carrying a `pending` member present and not `undefined`"*
(`:858`–`:866`). **SO THE REPAIR'S OWN RECORD — six members at a write, `pending` among them — IS ADMITTED AT RUNTIME AND REFUSED
BY THE DECLARED TYPE**, which requires three members it does not carry (`attempt`, `triggered`, and an `op` that is not
`JournalOp | null`). **The consequence is exact and it lands on the guide's own example**: **a TypeScript consumer transcribing
`:1072`–`:1090` — `store.write(['b'], 'mem', 11, repairContext)` — meets `TS2345`, while the same block runs as written in
JavaScript.** **The guide is not falsified** (its block is `js`, it carries no annotation by the unit's own `PIN-7`/`sites.md §3`
ban, and its measurement stands) — **but the one worked example the package owes a TypeScript consumer does not type-check.**

**TWO LAWFUL REMEDIES, PRICED, NEITHER TAKEN HERE — this pass may not move a member's declared argument type:**

- **(a) WIDEN THE POSITION TO ITS OWN CLASS TEST** — a structural type carrying the one member the test reads
  (`{ readonly pending: readonly TriggerPair[] }`), so the declaration says what the kernel does. **Cost: `write`'s fourth position
  is a DECLARED type that moves, at four documents' citation sets, and `CommitRecord` loses its one exclusive consumer — which needs
  its own ruling and its own row, and `PUB-DD-9`'s `MINOR` row would want the publish corpus amended first.**
- **(b) LEAVE THE POSITION AND DOCUMENT THE SPELLING** — a TS consumer names the commit it already holds, or omits the fourth
  position and takes the kernel's own fallback (`kernel-attempt.mjs:820`–`:822`, the guide `:1061`'s last sentence: *"A repair that
  names nothing in the fourth place also joins, by the kernel's own name"*). **Cost: the guide's four-position spelling stays
  unmatched by the type, and §5.2 (ii)'s end-to-end cell must use the three-position form.**

**⟶ AND ALTERNATIVE `(b)` IS WITHDRAWN, 2026-11-01 — `D-103` RULES THE OMISSION UNSUPPORTED, SO THE SPELLING IT
PRICES IS NOT ONE THIS DECLARATION MAY DOCUMENT.** `RCA-8(g)` ANNOTATE-BESIDE: **the two remedies above stand
BYTE-FOR-BYTE and are read THROUGH this clause; what it withdraws is `(b)`'s standing as an OPTION, and it moves no
other byte of §7.1's finding.** **THE ARCHITECT, VERBATIM** (`strata/decisions.md` · `D-103`, 2026-11-01):
***"Writing a repair function that does not pass the commit in is unsupported"***. **SO `(b)`'s SECOND SPELLING —
*"omits the fourth position and takes the kernel's own fallback"* (`kernel-attempt.mjs:820`–`:822`; the guide
`:1061`'s last sentence) — IS REFUSED RATHER THAN PRICED: the package declares NOTHING about a repair that omits
the commit, and the five things `D-103` item `1` lists — the op in `attempt.ops`, the entries in the commit's log,
the `pending` delivery, the rollback's scope, and a `file`-tier save riding the commit's terminal act — are not
promised for it.** **THE FALLBACK IS A MECHANISM OF THE CODE WHOSE BYTES STAND AND NOT A ROUTE** (`D-103` item `2`,
which names the frame's own name and keeps it; `D-46`, which makes the supplied commit id the discriminator) — **so
the guide `:1061` is read THROUGH `D-103` as a description of that mechanism and may not be cited as leave to take
`(b)`.**

**AND `(b)`'s FIRST HALF IS SUPERSEDED IN FACT TOO: *"the guide's four-position spelling stays unmatched by the
type"* was this finding's reading of its own date, and `(a)` is the remedy TAKEN** (`D-101`; this file's `Q-1`
`⟶ ANSWERED` clause below, whose measurement is the guide's block GREEN as written at four positions) — **so the
guide's spelling is MATCHED and there is nothing left for `(b)` to reach.**

**AND WHAT THE CELL DOES, IT ALREADY DOES: `§5.2 (ii)`'s end-to-end cell KEEPS THE FOUR-POSITION SPELLING** — the
spelling `Q-1`'s answered clause FREED as a cell already owed (`:781`–`:783`) — **so this clause re-derives no
cell, reds no cell and asks no ninth cell; its one subject is the option it withdraws.** **NOTHING ELSE MOVES: no
type, no member, no figure of §7.1's finding and no behaviour byte** (`D-103`'s own `TERMS`: the types it moves
`0`, the code bytes it moves `0`, the sites re-derived under it `2` — the guide's sentence and this note).

**AND THE ONE RE-ANCHOR THIS CLAUSE OWES, PRINTED RATHER THAN DISCOVERED, BECAUSE ITS OWN PLACEMENT IN THE GUIDE
MOVES LINES THIS FILE CITES:** the clause stands inside the guide's `§7.6`, on the sentence's own site, and adds
**SIX** lines there, **so every `docs/guides/package-use.md` line this file cites at or below `:1063` stands SIX
lines lower from 2026-11-01** — the four-ways list `:1063`–`:1068` now `:1069`–`:1074`; the worked example
`:1072`–`:1090` now `:1078`–`:1096`; the guide's own arm at `:1082` now `:1088`; its reading `:1092` now `:1098`;
the measurement `:1094` now `:1100`; the arm's messages `:1096`–`:1103` now `:1102`–`:1109`; and the copied
sentence `:1100` now `:1106`. **The four figures ABOVE the insertion are unmoved — `:1055`, `:1057`, `:1059` and
`:1061`, the last being the sentence the clause reads through** — and every superseded range stands as the reading
of its own date (`RCA-8(g)`); **`§7.2`'s eight-row obligation is not discharged by this note, and it now extends by
the guide figures this clause prints.** **AND ONE CITATION IS OUTSIDE THIS PASS'S WRITE SET, NAMED SO ITS OWNER
READS IT: `typecheck/consumer-fixture.ts:412` cites the same example at `:1072`–`:1090` and now needs
`:1078`–`:1096`.**

**OWNER: whoever next owns `bindings/js/index.d.ts`'s `write` member and whoever owns `docs/specs/storeroom-publish/`'s class
amendment. REVISIT CONDITION: it re-opens at the first pass that types or re-types the commit position, and at the latest at any
pass that adds a TypeScript cell transcribing the guide's example.**

### 7.2 **EIGHT CITATIONS INSIDE THE `Constraint` DOCBLOCK NO LONGER RESOLVE TO THEIR SUBJECTS — the `D-90`/`D-91`/`D-94` landings moved the ranges**

**This is the class the tree keeps meeting (a clause corrected at one site and not at its neighbours' anchors), and it is
named because §4's new clause sits inside the block that carries it.** **Each row is a site in `index.d.ts`, the range it cites,
what stands there now, and where the subject stands now — every figure measured at this date:**

| # | site | cites | what stands there now | where the subject stands now |
|---|---|---|---|---|
| 1 | `:1250`–`:1251` | `kernel-attempt.mjs:686-699` | `:687`–`:698`, the body-throw arm's terminal entry and its mark | `:705`–`:727` (the closed set), `:718`–`:724` (the own-member read) |
| 2 | `:1263` | `kernel-attempt.mjs:690-696` | the same throw arm's mark clause | `:718`–`:724` |
| 3 | `:1266` | `kernel-registration.mjs:330-332` | the skip-is-not-a-refusal clause | `:377`–`:380` (the outcome read) |
| 4 | `:1257`–`:1258` | `kernel-registration.mjs:373-374` (*"the kernel's own words"* on the two records) | the `{message}` sentence of the outcome read | `:420`–`:424` |
| 5 | `:1258` | `kernel-attempt.mjs:607-613` (the constraint's five) | the pair-application guard's clause | `:635`–`:641` |
| 6 | `:1258` | `kernel-attempt.mjs:756-782` (the repair's six) | the repeat arms' returns | `:784`–`:810` |
| 7 | `:1286` | `kernel-registration.mjs:510-517` (the credit check with no invoked-for op) | the synthetic attempt's nine-member docblock | `:615`–`:616` |
| 8 | `:1290`–`:1291` | `index.d.ts:772` (`CommitRecord.pending`) | the `CommitRecord` docblock's `op` sentence | `:793` (`readonly pending: readonly TriggerPair[]`) |

**THE SAME EIGHT STAND IN THE GUIDE'S TWIN SENTENCES, ACROSS THREE OF THEM — rows `1`–`3` at `docs/guides/package-use.md:1057`, row
`7` at `:1059`, and rows `4`–`6` and `8` at `:1061`** — **and in the sibling corpus's own re-spelling**
(`docs/specs/storeroom-constraint-registration-instant/contract.md` `PIN-8` (ii), which re-spelled `:345`-`:356`/`:387`-`:398` to
`:369`-`:380`/`:424`-`:437` on 2026-11-02 and is **stale again**: the records stand at `:392`–`:403` and `:447`–`:460`). **NOTHING
HERE IS REPAIRED AND NO OWNER IS USURPED.** **The form the repair takes is the tree's own: one dated `RE-ANCHORED` mark per
citation, beside it, the superseded range printed and read through — never a rewrite, never a deletion.**

**AND ONE OBLIGATION THIS PASS PUTS ON THE LANDING PASS, because it is the pass that edits that block:** **§4's new clause cites
only the ranges §0's table prints — measured on 2026-11-01 — and the landing pass either lands the eight marks with it or records,
in its own ledger, that they are owed.** **A block whose new clause cites live ranges beside a neighbour citing eight dead ones is
the half-corrected state this project has already filed twice.**

### 7.3 **THE THREE READINGS THIS PASS REFUSES TO PRINT AS CENSUSES** — carried so the figures are not taken on trust

- **`docs/L1/module-map.md`'s `index.d.ts` size is behind the file, and `docs/L1/modules.json`'s newest size key is behind it again.**
  The map prints **`1,089`** at its `:128` (and `1,088` at `:124`, `1,017` at `:111` — each the reading of its own date);
  `modules.json`'s latest `sizes_remeasured_*` note prints **`1,185`** (its `:854`) — **and the file stands at `1,308` lines this
  date, before §4's insertion.** **The map's own next re-measure pass owns both figures; this pass's write set is one file and
  neither path is in it.**
- **NO MODULE AND NO ENDPOINT MOVES.** `docs/L1/modules.json`'s **`19` modules / `61` endpoints** stand: the declaration is
  `js-declaration`'s (module `14`, `:398`–`:399`) and it gains a surface reading, not a module and not an endpoint. **The harness
  cap is unmoved.**
- **`bindings/js/index.d.ts:125`–`:129` still declares that nothing in this repository type-checks the file**, which §5's
  instrument falsifies and which the sibling unit already parked as a named adjacent finding
  (`docs/specs/storeroom-repair-arm-surface/contract.md §4` item 1). **Its bytes stand; no clause of §5 rests on it.**

---

## §8 · THE QUESTIONS THIS DECLARATION PUTS UP, PRICED, AND DOES NOT TAKE

**`Q-1` — MAY `write`'s COMMIT POSITION'S DECLARED TYPE BE WIDENED TO ITS OWN CLASS TEST?** §7.1's finding, with the two remedies priced
there. **It is a DECLARED type of a published member and therefore a member's argument moving, which no approval this pass holds
covers; it is also the one thing that stands between a TypeScript consumer and the guide's own worked example.** **If it is not
decided, nothing here blocks: the aliases land, the guide's block is untouched and stays true as JavaScript, and the type's
disagreement is printed rather than discovered.**

**⟶ ANSWERED 2026-11-01 — `Q-1` IS TAKEN, AND THE ANSWER IS THE ARCHITECT'S WORD OF THIS DATE, VERBATIM:** ***"Widen the
position to its class test"*** (`strata/decisions.md` · `D-101`'s `⟶ ANSWERED` clause, which names this paragraph as the
amendment's home). **`RCA-8(g)` ANNOTATE-BESIDE: the question's bytes stand above BYTE-FOR-BYTE and are read THROUGH this clause;
nothing above is rewritten, and `Q-2` and `Q-3` below stand exactly as this section lists them — this clause answers NEITHER.**
**Every figure below is MEASURED, and the instrument is named: this tree's own `bindings/js/index.d.ts` was copied into `/tmp`
UNCHANGED, §4's five aliases, this clause's sixth, the new `Constraint` line and the widened `write` position were spliced over
the copy — the six declarations appended after the file's last export (`ConstraintIdentity`, `:1308`), which reads `1,347` lines
spliced — the copy was staged as `node_modules/provident-storeroom` the way `typecheck:stage` stages it, and THIS
REPOSITORY'S `tsc 5.9.3` ran it under the `nodenext` leg with `skipLibCheck: false` (and the guide's block under a `bundler` leg
as well). It wrote nothing in this tree.**

**1 · THE POSITION'S TYPE — DECLARED: ONE NAMED STRUCTURAL ALIAS, THE CLASS TEST'S OWN CLASS, AND NOT THE UNION OF THE TWO
DECLARED CARRIERS.**

```ts
export interface CommitCarrier {
  readonly pending: readonly TriggerPair[];
}

  write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord;
```

**THE ALIAS IS A RECORD AND SO IT IS AN `interface` — §4's keyword division, unmoved: a RECORD is an `interface` in this file
and a UNION is a `type`.** **ITS ONE MEMBER IS SPELLED EXACTLY AS THE KERNEL'S OWN CARRIER SPELLS IT** (`CommitRecord.pending`,
`index.d.ts:793`: `readonly pending: readonly TriggerPair[]`), **so no second TYPE is minted; what is minted is the NAME the class
test's class never had.** **THE ALIAS IS EXPORTED — a position's type that no consumer can annotate is the `ST-F2` gap in a new
place, and the five aliases of §4 exist to be annotatable; the carrier is the one value a consumer CONSTRUCTS at a position
rather than receives.** **SO THE COUNT §4 PRINTED IS NOT THE COUNT THIS CLAUSE DELIVERS: named types `21 → 27` (`13 + 4 = 17`
interfaces and `8 + 2 = 10` aliases), value exports `1 → 1` — §4's `21 → 26`, §5.5's delta and this file's ENVELOPE are read
through this clause as `21 → 27`, and the census cell of §5.5 therefore owes SIX names and not five (item `4` below).**

**THE UNION `CommitRecord | RepairContext` IS REFUSED, AND IT IS MEASURED RATHER THAN ARGUED.** It would admit both declared
carriers, and it would admit the guide's own repair record — it is not wrong about those two. **But it is NARROWER THAN THE
CLASS TEST, and the narrowing lands on the spelling the package's own drive writes:** `store.write(['c'], 'mem', 3, { pending: [] })`
(`tests/e2e/repair-in-commit.test.mjs:281`) and a fresh `{ pending: [] }` are **`TS2345` under the union** — *"missing the following
properties from type `RepairContext`: address, id, op, tier, value"* — **and GREEN under `CommitCarrier`.** **So the union would
leave the declared-vs-built disagreement standing and merely move its edge, in the direction that hurts: a call the KERNEL
ADMITS meeting a type error at the one position this ruling exists to make honest.** **And it would make the position's domain a
function of HOW MANY CARRIERS A PASS HAS HAPPENED TO MINT, where the class test's domain is one predicate** — the drive's own
census is that the domain has three admitted spellings (an absent position, an own present `pending` on any carrier, and the
kernel's own record: `accepted.length === 3`, `:414`–`:417`) **and only one of the three is a record this declaration names.**

**TWO SPELLINGS PRICED AND NOT TAKEN, AND WHY THE NAME IS WORTH ITS COUNT.** **The ANONYMOUS INLINE SHAPE**
(`commit?: { readonly pending: readonly TriggerPair[] }`) is the same type with no name: refused because the position's type would
then be citable by NOTHING — not by the guide, not by `RELEASE-NOTES.md`, not by a cell, not by a consumer's annotation — and
because it is invisible to the census that reads `^export (?:type|interface)` (`tests/e2e/blind-entry-module.test.mjs:168`–`:175`),
so the one figure this tree counts its declared types by would under-report the file. **`Pick<CommitRecord, 'pending'>`** is
refused for the same uncitability and on one further ground at the bytes: **this file's idiom carries NO utility type anywhere**
— `Pick<`, `Readonly<` and `Omit<` stand at no line of the whole 1,308, and the only `&` in the file is `StoreStatus`'s escape arm
`(string & {})` (`:367`).

**AND TWO CLAUSES OF THE DECLARATION'S OWN HEAD STOP BEING TRUE IN FACT AND OWE A DATED MARK — named here because this pass may
not touch them.** `index.d.ts:103`–`:110` reasons from *"the write's commit position IS the kernel's own record"* to *"this file
MINTS NO RECORD TYPE OF ITS OWN to carry it"*, and `:747` heads the record's block *"THE WRITE'S COMMIT POSITION IS THIS RECORD"*.
**The position is now the class test's class and the record is ONE CARRIER OF IT**, so both sentences stand as the reading of their
own date and are read through this clause, and **a `pending`-shaped name now stands in a file that said it minted none.** **What
needs NO byte is the position's own docblock: `:858`–`:866` ALREADY prints the class test — *"an object carrying a `pending` member
present and not `undefined`"* — so the declared type now agrees with the parenthesis the declaration already wrote, and the noun
beside it (`CommitRecord`) is read as the one carrier that names the shape.**

**2 · WHAT IT DOES NOT WIDEN.**

1. **THE CLASS TEST IS UNMOVED AT ITS OWN BYTES**: `bindings/js/src/entry/delivery.mjs:27`–`:54`, the predicate at `:39` —
   `Object.hasOwn(commit, 'pending') && pending !== undefined` — behind `commit !== null && typeof commit === 'object'` (`:28`),
   past `!types.isProxy(commit) && !Array.isArray(commit)` (`:32`), with the guarded read at `:34`–`:38`.
2. **THE POSITION'S REFUSAL IS UNMOVED IN ALL FOUR OF ITS PARTS**: its FORM (ONE `TypeError` whose `status` member is ABSENT), its
   MESSAGE (`:50`–`:53`, the position's ordinal corrected 2026-10-26), its INSTANT (before any verb is reached — *"A REFUSED
   POSITION STOPS THE WRITE"*, `:24`–`:26`), and its CLASS (a class test and never an identity test).
3. **NO BEHAVIOUR BYTE MOVES**: a `.d.ts` is erased at run time, and the kernel executes the bytes it executed on 2026-10-30.
4. **THE GUIDE'S EXAMPLE IS NOT EDITED, AND IT NOW TYPE-CHECKS AS WRITTEN — MEASURED GREEN on both legs**, `:1072`–`:1090`
   transcribed with no annotation added. **The guide's `:1061`, *"pass it as `write`'s DECLARED FOURTH POSITION"*, becomes true in
   the compiler's own terms and keeps its bytes.**
5. **THE PACKAGE'S OWN DRIVE IS NOT RE-POINTED — with one correction owed to `D-101`'s sentence.** `tests/e2e/repair-in-commit.test.mjs`
   is `.mjs` and **NOTHING TYPE-CHECKS IT** (§5's own declared limit, `consumer-fixture.ts:66`–`:74`), so *"the package's own drive
   type-checks as written"* is true of a **TypeScript transcription** of its lines and is FALSE as a claim about the file. **What
   the amendment does is move the TYPE to the drive's measurement and never the drive to the type**: its `D-46 (1)` body writes with
   THREE positions (`:106`), which compiled under the old declaration too; its `D-46 (2)` arm B and its `D-46 (3)` probe table hold
   the spellings the old type refused and the new one admits.
6. **`CommitRecord` KEEPS EVERY BYTE, ITS FOUR MEMBERS AND ITS EXPORT**; what it loses is being the position's SOLE declared type —
   §7.1 (a)'s printed cost, now paid by the ruling rather than by a judgement of this file.

**3 · THE COUNTER-CASES — MEASURED AT THE SPLICED DECLARATION, AND SPLIT INTO THE HALF THE TYPE HOLDS AND THE HALF IT CANNOT.**

**(i) UNASSIGNABLE, AND REFUSED BY THE CLASS TEST TOO — the two halves agree, so no cell here is owed a runtime witness.**

| the value at the position | the type's answer, measured | the class test's answer |
|---|---|---|
| `null` | `TS2345` — not assignable to `CommitCarrier` (nor to its `undefined` arm) | refused (`:28`) |
| `'attempt-1'` · `7` | `TS2345` | refused: not an object |
| `() => 1` | `TS2345` | refused: not an object |
| `[]` | `TS2345` — `never[]` carries no `pending` member | refused by `Array.isArray` BEFORE a member is read (`:32`) |
| `{ pending: undefined }`, fresh and by name | `TS2322` at the member, `TS2345` by name — `undefined` is not `readonly TriggerPair[]` | refused (`:39`) |
| a `pending?: readonly TriggerPair[]` variable | `TS2345` — an optional member is *`readonly TriggerPair[]` or `undefined`* | refused (`:39`) |
| `{ attempt: null }` — no own `pending` | `TS2353` (a fresh literal) | refused by `Object.hasOwn` |

**SO AN OBJECT WITH NO OWN, DEFINED `pending` IS NEVER TYPED AS A CARRIER** — the two halves of the class test the type CAN see
(`pending` present, and not `undefined`) are the two the alias states; the two it cannot see are rows (ii) below.

**(i-bis) THE FOURTH DIRECTION — REFUSED BY THE TYPE AND ADMITTED AT RUN TIME.** **A FRESH OBJECT LITERAL carrying `pending` plus any
other member is `TS2353` at the argument position** (*"`extra` does not exist in type `CommitCarrier`"*), **while the class test
admits it, because it reads a member's PRESENCE and never the member count** (`:39`); **and through a NAMED variable the same value
is GREEN, so the type's refusal is the excess-property check and not a domain rule.** **This is §5.4 item 4's class at a new
position, printed for the same reason it is printed there: the declared type is not a guarantee about a carrier's member set, and
no cell may be written that reads it as one.**

**(ii) ASSIGNABLE, AND STILL REFUSED BY THE CLASS TEST — the honest remainder, printed so no green is read as the test's evidence.**

| the value at the position | the type's answer, measured | what refuses it, and where |
|---|---|---|
| `Object.create({ pending: [] })` | GREEN — `Object.create` answers `any` | `Object.hasOwn` (`:39`): its `pending` is INHERITED |
| `class C { get pending() { … } }` | GREEN — a prototype accessor satisfies structural typing | the same row: inherited, so not own |
| `new Proxy({ pending: [] }, {})` | GREEN — `Proxy<T>` carries its target's static type | `types.isProxy` (`:29`–`:32`), BEFORE any member read, so no `get` trap is raised |
| **an explicit `undefined`** | **GREEN** — the position is `commit?: CommitCarrier`, which admits the supplied `undefined` | the class test refuses it, and the drive asserts the refusal (`:390`, `:446`–`:447`: *"an explicit `undefined` is a SUPPLIED position outside the domain and is refused — only ABSENCE opens"*) |

**THE `undefined` ROW IS THE `?`'s OWN LIMIT AND NOT A NEW CLASS OF LIMIT: this file's head ALREADY declares it at `read`'s
`tier?`** (`index.d.ts:131`–`:135`: *"an optional parameter admits both spellings identically and no type can separate them; the
distinction is a RUNTIME one"*). **So the amendment adds no limit the file had not already printed: the two holes are `§5.4`'s
first item (own-versus-inherited, which `Object.hasOwn` and `types.isProxy` close at run time) and the `?`-cannot-separate limit
(which the drive's own probe table closes at run time) — and in both, THE RUNTIME REFUSAL IS WHAT KEEPS THE POSITION'S DOMAIN.**

**4 · THE CELLS THIS MOVES — MEASURED, WITH THE BASELINE PRINTED SO *"NOTHING ELSE MOVES"* IS FALSIFIABLE.**

- **`typecheck/consumer-fixture.ts:115` and `:192` ARE UNMOVED BY THIS CLAUSE.** They red with `TS2322` on `Constraint`'s ANSWER
  type (§5.1) and on nothing here; **the measured set is EXACTLY TWO, and the same fixture against the UNSLICED declaration is
  GREEN** — so nothing else in the harness moves. **`:227`'s `store.write(address, 'file', 1, commit)` is GREEN and unmoved**:
  `commit` is a `CommitRecord`, whose `pending` satisfies `CommitCarrier` field for field.
- **FREED: §5.2(ii)'s end-to-end cell**, which §5.2(ii) prints as *"the THREE-position spelling … the one that compiles today"*.
  **It may now be the guide's own FOUR-position form** — the guide's block is the measured green — **so that cell's spelling moves
  from three positions to four, and it is a cell already owed rather than a ninth cell.** **§5.2(ii)'s finding sentence, §5.5's
  closing `TS2345` half and §7.1's remedy `(b)` are superseded IN FACT by this clause** (`RCA-8(g)`: their bytes stand and are read
  through it); **remedy `(a)` is the one taken.**
- **NONE OF THE EIGHT `@ts-expect-error` REFUSALS OF §5.2(iii) IS RE-DERIVED, AND THE MEASUREMENT IS `TS2578` = 0 ON EVERY LEG.**
  Not one of the eight stands at the fourth position — rows (a)–(g) measure the two outcome arms and the op's own type — so none
  becomes unused and none is re-derived. **This clause asks no ninth refusal cell; and if one is ever written, only the cells of
  table (i) above are writable — the `Proxy`, the inherited `pending` and a supplied `undefined` are NOT refusable by any type.**
- **THE ONE COMMITTED CELL THIS CLAUSE MOVES IS THE CENSUS.** `tests/e2e/blind-entry-module.test.mjs:237`–`:244` deep-equals the
  declaration's type exports against `DECLARED_TYPE_NAMES` (`:61`–`:83`, twenty-one names), **so the SIXTH name belongs in that list
  and the printed *"twenty-one"* moves to *"twenty-seven"* at that file's THREE sites (`:4`, `:242`, `:246`)** — **§5.5's delta is
  SIX names and `21 → 27`, not five and `21 → 26`.** **The spliced declaration is itself GREEN under `skipLibCheck: false`, and its
  `^export function` count is still exactly ONE.**
- **AND THE CELL THAT DECIDES THE SPELLING'S SHAPE — `tests/e2e/file-tier-save.test.mjs:1203`–`:1228` — IS UNMOVED, and it is why
  the position's type must read as ONE TOKEN**: `:1217` splits the member's parameter list on commas, `:1218` asserts FOUR
  parameters, and `:1226` requires `params[3]` to open `commit?:`. **`commit?: CommitCarrier` satisfies all three; a shape printing
  a second member at that position would red `params.length === 4`.**
- **NO MODULE, NO ENDPOINT, NO MANIFEST BYTE AND NO VERSION BYTE MOVES**: `19` modules / `61` endpoints stand, and the harness cap
  is unmoved.

**5 · `Q-2` AND `Q-3` STAND AS THIS SECTION LISTS THEM.** **This clause answers neither, moves neither, and licenses nothing in the
publish or harness corpus: the amendment rides the same gate the rest of this pass rides** (`Q-2`'s bounded amendment, owed first if
`index.d.ts:120`–`:123` is read as reaching type aliases; `Q-3`'s two stale heads) **and it decides neither.**

**`Q-2` — DOES THE PUBLISH CORPUS OWE AN AMENDMENT BEFORE THE TYPES LAND, AND WHOSE IS IT?** `PUB-DD-9`'s `MINOR` row makes a MINOR
*"a BOUNDED AMENDMENT of this contract FIRST"* (`docs/specs/storeroom-publish/contract.md:117`), and two clauses enumerate what the
declaration carries. **BOTH ARE READ AT THEIR LIVE PRINTS AND NOT AT THEIR ARCHIVED HOME**: the prohibition's operative byte is
**the declaration's own header, `bindings/js/index.d.ts:120`–`:123`** — *"it declares NO store type, NO store verb, NO
`findAddress`, NO release verb and NO constraint or repair seam"* — **and the export enumeration's is the same head, `:95`–`:101`,
which already puts *"the records those methods answer with"* inside part (1) as *"still part (1) and not a fourth thing"*.** **(The
corpus part those two rows live in — `docs/specs/storeroom-publish/distribution.md` — is NOT in the tree: `docs/specs/
storeroom-publish/` carries `contract.md` and nothing else at this date, so its `§5.2` is named here as an ARCHIVED home and is
cited by NOBODY as a target — `D-85` item 2, *"an archived part is not citable"*; a pass that needs the row re-read has the shipped
header it describes.)** **THE READING THIS FILE TAKES, PRINTED SO IT CAN BE REFUSED RATHER THAN ASSUMED: the prohibition's subject
is a SEAM — a route, a dispatch or a module name — and a TYPE that names a shape is not one.** **Under that reading no amendment is
owed before the landing and the corpus's owner owes one beside it. If the architect reads `:120`–`:123` as reaching TYPE ALIASES,
then the amendment is owed FIRST and the landing waits on it** — and the reading above is then the finding, not the answer.

**`Q-3` — MAY THE TWO STALE `tsconfig.typecheck*.json` HEADS BE CORRECTED BY THE PASS THAT ADDS THE CELLS?** §5.4's last
paragraph. **The harness is one instrument with two heads and its owner is the pass that re-derives the cells; if that pass is not
the harness's owner, the two heads stay stale and the second leg keeps measuring a reachability the manifest has granted — a
green that no longer means what its head says.**

---

## ENVELOPE — the declaration this pass delivers

**THE ALIASES AND THEIR MEMBER SETS — `5` names, `0` members minted, each read at its site.** **`AttemptContext`** — `5`
(`address: Address` · `attempt: AttemptRef | null` · `op: JournalOp | null` · `tier: Tier | null` · `value: unknown`), ONE member
set across **THREE builds** — `bindings/js/src/entry/kernel-attempt.mjs:635`–`:641`, `kernel-registration.mjs:392`–`:403`, and
`:728`–`:734` — where only three members' VALUES move; **the name is the tree's own and the brief's `ConstraintContext` is refused
by name with its ground (§1.1)**. **`RepairContext`** — `6` (the five without `attempt`, plus
`id: string` and `pending: readonly TriggerPair[]`), built at `kernel-attempt.mjs:784`–`:810`. **`RegistrationRepairContext`** —
`7 = 6 + write`, `write: (address: Address, tier: Tier, value: unknown) => WriteRecord`, built at
`kernel-registration.mjs:447`–`:460` with the route at `:492`–`:503`. **`ConstraintOutcome`** — `3` arms (`true` ·
`{ message, repair }` · `{ message }`), read at `kernel-attempt.mjs:705`–`:727`. **`RepairOutcome`** — `2` arms
(`{ ok: true, op: WriteRecord['op'] }` · `{ ok: false, message }`), read at `:899`–`:914`.

**THE TWO INSTANTS — ONE COMMON ALIAS PLUS THE REGISTRATION'S OWN ADDITION (`§2`, `C`), the alternatives priced.** **`A`** (one
alias, `write?` optional) refused: it falsifies `SIX against FIVE` and states a false presence at a write, and buys the consumer
nothing under `strict`. **`B`** (two aliases plus a discriminant) refused: **a split on `op`'s null-ness would compile and correlate
today, and it would encode a build's accident as the instant's meaning on three printed grounds (§2); a MINTED discriminant is
outside this approval.** **`D`** (a second alias for the constraint's context) refused: **its one member set is built at three
sites whose `op` is a landing, a `null` and a repair's landed op, so a "second alias" could not be one alias**; the `| null` members
are the declared absences and their price is printed (§1.1).

**THE OP.** `WriteRecord['op']` — the store's own record by INDEXED ACCESS, so no second carrier is minted; `DeleteRecord['op']` is
the same member with a declared `null` arm that the alias REFUSES (a `delete` that removed nothing credits nothing). **`op` is
REQUIRED on `ok: true` and ABSENT on `ok: false`.** **`opId` and `seq` are reached by naming that record, and the four credit
grounds are prose** (`kernel-foundations.mjs:1105`–`:1131`), with the ordinal ground absent at a registration
(`kernel-registration.mjs:615`–`:616`).

**WHAT `Constraint` BECOMES.** `export type Constraint = (context: AttemptContext) => ConstraintOutcome;` — **one line, four
unmoved positions** (`:273`, `:1014`, `:1020`, `:1025`); **named types `21 → 26`, value exports `1 → 1`, statuses `20`, `KC` tokens
`9`, instance members `14`, and ZERO code bytes outside the declaration file** — **no runtime path, no behaviour byte; the one
committed census that moves is a declaration census and not a code byte (§5.5).**

**THE DOCBLOCK'S SENTENCE, RE-DERIVED.** `:1294`–`:1296`'s *"AND NOTHING HERE MINTS A TYPE … `Constraint` below is unmoved, one
`unknown` in and one `unknown` out"* **stands BYTE-FOR-BYTE as the reading of 2026-10-30** (`PIN-7`'s date) **and is read THROUGH a
new dated clause inside the same block: five names are declared below the line, every member is one the kernel already builds, and
the census sentence above it — *"No member census of either record is printed here"* — is true of the clause and read through the
alias, which is the only place a compiler can hold it.** **The clause's bytes are printed at §4 so the landing decides nothing.**

**THE TYPECHECK'S CELLS.** **The published `index.d.ts` IS what a consumer's `tsc` meets** — both legs, through the `exports` map's
`types` condition (`bindings/js/package.json:27`–`:32`) and through the top-level field (`:33`) — **re-staged before every run**
(`package.json:8`–`:9`) **with `skipLibCheck: false`, and MEASURED: both legs resolve the declaration and exit `0` on this tree, the
spliced declaration is green on both, and the real fixture reds with exactly two `TS2322`s.** **TWO EXISTING CELLS RED AND ARE OWED
A RE-DERIVATION IN THE SAME ACT** (`typecheck/consumer-fixture.ts:115`, `:192`, both `(context: unknown): unknown`). **ADDED: the
three-arm answer assignable; the two-arm repair assignable plus one end-to-end body; EIGHT `@ts-expect-error` refusals, each with
the code the probe measured** (`{ok: true}` with no `op` · the bare `WriteRecord` as the `op` · `undefined` · a `{repair}`-only
outcome · a string outside the three · a widened `boolean` · an excess `op` on the failed arm, fresh-literal only · `op` as a
number) **plus `op.opId`/`op.seq`, the two contexts' censuses, the union's `'write' in` narrowing, and the route's third position
against a fourth.** **FIVE CLAIMS A GREEN DOES NOT PROVE, printed at §5.4, and one of them corrected by measurement rather than
argument.** **The fixture's `@ts-expect-error` count is the harness's to re-take: its own head prints `28`, and this pass's reading
of the fixture's own bytes — confirmed by the TypeScript parser's own directive table — is `26`.**

**AND ONE COMMITTED CELL OUTSIDE `typecheck/` REDS, PRINTED HERE SO THE LANDING PASS DOES NOT DISCOVER IT LATE.**
**`tests/e2e/blind-entry-module.test.mjs:237`–`:244` deep-equals this file's type exports against a hard-coded twenty-one-name list
(`:61`–`:83`), so the five aliases turn it red until that list and its printed *"twenty-one"* — at its three sites, `:4`, `:242`,
`:246` — move to twenty-six; its two neighbours (`:246`–`:252`, `:415`–`:425`) pass and one of them gains coverage (§5.5).** **A
TYPING-ONLY CHANGE THAT REDS A COMMITTED CELL IS A FINDING AND NOT A DETAIL, and it is the one place this pass's "zero code bytes"
claim could be misread as "no test moves".**

**THE WRITE SET BY ROLE.**

| role | path | the delta |
|---|---|---|
| **this pass (`role_l1_architect`)** | `docs/L1/repair-outcome-types.md` | **the declaration — one path, and nothing else in the tree is touched, staged or committed** |
| **the record's owner (L0)** | `strata/decisions.md`'s next entry | **the 2026-11-01 approval is cited in this file as the architect's WORD and has no filed row; a row is owed before any pass may cite it as a ruling (§0), and this pass writes no `strata/` byte** |
| **implementation** (`bindings/js/index.d.ts`'s owner) | `bindings/js/index.d.ts` | §4's five aliases after `:1300`'s neighbourhood, the new clause inside the docblock before `:1299`, the `:1300` line replaced. **The eight re-anchoring marks of §7.2 either land with it or are recorded as owed.** |
| **the typecheck harness's owner** | `typecheck/consumer-fixture.ts` | **`:115` and `:192` re-derived FIRST (they red otherwise)**, §5.2's four groups added, §5.3's count re-taken |
| **the typecheck harness's owner** | `tsconfig.typecheck.json`, `tsconfig.typecheck.nodenext.json` | the two stale heads (§5.4, `Q-3`) — **owed, not this pass's byte** |
| **the blind battery's owner** | `tests/e2e/blind-entry-module.test.mjs` | **`:61`–`:83`'s `DECLARED_TYPE_NAMES` gains the five names and the printed *"twenty-one"* moves at its THREE sites — `:4`, `:242`, `:246`; `:246`–`:252`'s coverage loop then reaches the five as well (§5.5). WITHOUT THIS THE BATTERY REDS.** |
| **release** | `RELEASE-NOTES.md` and its landed copy `bindings/js/RELEASE-NOTES.md` | §6's one row in `§1.7.0`, the unmoved-type sentence read through it, the consumer consequence stated; **the landed copy re-staged byte-for-byte** |
| **publish corpus's owner** | `docs/specs/storeroom-publish/contract.md` (`PUB-DD-9`, `:117`) — and **NOT** the archived `distribution.md §5.2`, which this tree does not carry | **`Q-2`'s amendment, before the landing if `index.d.ts:120`–`:123` is read as reaching type aliases; the live print of that prohibition is the declaration's own header** |
| **the spec corpus's owner** | `docs/specs/storeroom-repair-arm-surface/{contract,sites}.md` | `PIN-7`'s *"NO TYPE IS MINTED"* and `sites.md:11`'s *"`export type Constraint = (context: unknown) => unknown;` … is UNMOVED"* **are the reading of 2026-10-30 and are now superseded in fact: they stand byte-for-byte and are read through this declaration; their re-derivation is the corpus's, and `sites.md`'s three-line re-spelling of the block's anchors is stale by §7.2** |
| **L2 integration** | `docs/L1/module-map.md`, `docs/L1/modules.json` | **NOTHING.** No module, no endpoint: `19` modules / `61` endpoints stand and the harness cap is unmoved. The map's `index.d.ts` size figure (§7.3) is owed to its own next re-measure, not to this declaration |
| **nobody in this pass** | `strata/**`, `src/**`, `bindings/js/index.mjs`, `bindings/js/src/entry/**`, the guide, `bindings/js/README.md`, both manifests, and every other `tests/**` cell | **unmoved** — named so the absence is a decision |

**THE OPEN QUESTIONS SENT UP.** **`Q-1`** may `write`'s commit position be widened to its own class test, so the guide's worked
example type-checks (§7.1, two remedies priced). **`Q-2`** does the publish corpus owe a bounded amendment before the types land,
and whose is it (§8, the reading this file takes printed so it can be refused). **`Q-3`** may the two stale typecheck heads be
corrected by the pass that adds the cells.

**THE PATHS THIS PASS WROTE.** `docs/L1/repair-outcome-types.md` — **one path, and nothing else in the tree was touched, staged or
committed. `strata/research.md`'s `§10` was read and not edited; `strata/decisions.md` was read and not edited; the typecheck
harness was read and not edited; no code, no test, no manifest and no version byte moved.**
