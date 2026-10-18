# Part — `write-and-read` (`U-STOREROOM-NATIVE`, prefix `D-GP-SNST`): the write, the read and the delete verbs, and the journal with its rollback and the watched-address list

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-native/`** — authored at
  the gate-2 spec gate in the **same pass** as the contract document's index region and part map, whose
  `write-and-read` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-native/write-and-read.md`.
- **The derivation clause this part reads through — one clause, carried by
  the contract document and NOT re-spelled here:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  (`docs/specs/storeroom-native/contract.md`, its status block; the middle dot `·` separates the slots). **Its
  authority is the FILED gate-1 record itself (that record's `decomposition` row and its `§4.1`); no unfiled
  process-rule path is cited, per `contract.md §0.1` item 7.**
- **WHAT A `carrier` PART IS, AND WHAT THIS ONE HOLDS.** **A `carrier` part holds RELOCATED SECTIONS of the
  contract's own text**, and **those sections keep the authority citations they carried in the contract
  document** — *a relocation is not a re-derivation: no claim gains or loses an authority by moving*
  (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a), which states the relocation rule in this
  directory's own bytes). **This part's relocated spans are
  `contract.md §3` (its §3.1–§3.6), `contract.md §4` (its §4.1–§4.4) and `contract.md §6`
  (its §6.1–§6.5), WHOLE, each keeping its `§`-numbers, its tables and its authority citations unchanged.**
  **This part declares NO new claim, NO new parameter, NO new fail-state, NO new arm, NO new `§`-number, no
  `DD` row, no `PAR` row and no `P-*` register row.** `[T: this part's own scope boundary | CONTRACT]`

## Scope boundary — the three regions this part carries

**The relocated spans, named by their contract `§`-numbers:**

| Relocated section | Its home in the contract document | What it carries |
| --- | --- | --- |
| **`§3`** (with `§3.1`–`§3.6`) | `docs/specs/storeroom-native/contract.md §3` | the write's signature with its REQUIRED-SINGULAR tier · the arity table, per verb, as a closed census · the two-stage parent resolution · the install stage · **the write's closed arm table (`W-1`…`W-6`, `F-1`…`F-6`)** · the write's post-conditions and a failed write's residue · the `WriteResult` return shape |
| **`§4`** (with `§4.1`–`§4.4`) | `docs/specs/storeroom-native/contract.md §4` | the read's signature with its OPTIONAL-ZERO-TO-MANY tier and its copy discipline · **the read's closed assembly arms (`R-1`…`R-5`)** · the delete's signature and its tier-scoped reading · **the delete's closed arm table (`D-1`…`D-5`)** and the `DeleteReceipt` shape |
| **`§6`** (with `§6.1`–`§6.5`) | `docs/specs/storeroom-native/contract.md §6` | what the journal is, the two tracked verbs, its entry-formation rule, its carrier and its session lifetime · the configured length, the base state's form, the compression trigger and the walk's floor · **the `JournalOp` and `BaseState` shapes with their content duty and id type** · the `rollback` verb and the `RollbackResult` shape · **the rollback's reach, scope, floor, direction and residue (`M-5`…`M-11`)** · the registration surface, the descendant-inclusive selection rule and **the two parks' boundary clauses** |

**RECORDED OMISSIONS (what this part does NOT carry, and why).** **This part carries no arm, no record
shape, no fail-state and no parameter that the contract document does not already declare** — every span
above is the contract's own text, and **every code it names is a member of the contract's closed
`14`-member fail set at `§8.1`** (`seams-and-lifecycle.md`) — **`14` and not `11`: the first amendment's
sentence mis-stated the set's own `§8.1` arithmetic, and this part's forward pointer is corrected to the
set's declared size at this contract's second bounded amendment, so the cross-reference closes** — **and
from 2026-10-15 the operative size is `16` (`11 + 2 + 1 + 1 + 1 = 16` ✓, `ConstraintListInvalid` appended at
rank `16`; `contract.md §8.1`'s dated clause of that date), the `14` and `15` prints above standing
BYTE-FOR-BYTE and read THROUGH this reading**
(`[T: the pointer's count, corrected | CROSS-REF]`). **⟶ AMENDED 2026-10-11: the pointer's figure moves ONE
MORE TIME — the listener amendment's added member takes the closed set to `15` members
(`seams-and-lifecycle.md §8.1`: `FilePathUnreachable` at rank `13`), so this sentence's *"`14`-member"* is
read as *"`15`-member"* and NO OTHER CELL OF THIS SENTENCE MOVES; the count's own arithmetic is
`11 + 2 + 1 + 1 = 15` ✓ and it is printed at that section's amended clause — **⟶ RE-SPELLED 2026-10-15 BY
THE GATE-4 FINDINGS PASS: the pointer's figure moves ONE MORE TIME — the set is `16` members
(`FilePathUnreachable` keeping rank `13`, `ConstraintListInvalid` appended at rank `16`), so *"`15`-member"*
above is read as *"`16`-member"* and NO OTHER CELL OF THIS SENTENCE MOVES; the count's own arithmetic is
`11 + 2 + 1 + 1 + 1 = 16` ✓ and it is printed at `contract.md §8.1`'s dated clause of 2026-10-15**). **In particular this part does NOT carry, and
does not restate:** the record shapes and the walk (`§1`–`§2`, at `store-model.md`) · the tier domain, the
rank, the purge chain and the typed property register (`§5`, in the contract document) · the closed fail-code
set with its generated messages and the construction inputs (`§7`–`§8`, at `seams-and-lifecycle.md`) · the
`PAR-n` rows (`§9`, at `parameter-semantics.md`). **A reader seeking one of those is pointed, never served a
second copy here** — a **second copy** of a `§`-numbered section is the shadow-home defect the closure
predicate forbids (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a), §0.1 item 10(c)).
**An omitted part is ABSENT, never written empty** (`docs/specs/storeroom-native/contract.md` §0.1
item 10(b), the omission rule).

**AND ONE FORWARD POINTER THIS PART CARRIES BECAUSE THE RELOCATED TEXT CARRIES IT:** **the fail-state
carrier of every arm below is the closed code set of the contract's `§8.1`** — cited here by path, not
restated: `docs/specs/storeroom-native/seams-and-lifecycle.md §8.1` (its home after relocation).
`[T: the pointer's form | CROSS-REF]`

**⟶ ADDED 2026-10-11 — THE ARM THAT ANSWERS AN OUT-OF-RANGE INTEGRAL SEGMENT, POINTED AT FROM THIS PART BECAUSE
A READER OF THE VERBS ARRIVES HERE FIRST.** `RCA-8(d)` ANNOTATE-BESIDE: **the pointer clause above and every
span of this part stand BYTE-FOR-BYTE; THIS clause is a PURE INSERTION: it adds no claim, no arm, no code, no
`§`-number, no `DD` row, no `PAR` row and no `P-*` row, and it re-decides no rule.** **THE TWO HOMES, NAMED SO
EITHER RESOLVES AND NEITHER IS COPIED HERE:** **the segment domain's upper bound — an index `n` is in domain
iff `0 ≤ n ≤ Number.MAX_SAFE_INTEGER` (`2^53 − 1`, INCLUSIVE), so an integral segment above it is OUTSIDE the
domain — is DECLARED at `store-model.md §1.5` item 1's dated clause, and THE ARM THAT ANSWERS IT IS
`store-model.md §2.2`'s `L-1`, whose code is `AddressMalformed`** (`seams-and-lifecycle.md §8.1` #1) — **and
this part carries the pointer because every verb it relocates reaches its target through that walk** (`§3.2`'s
parent resolution, `§3.2` item 2's `L-1`/`L-3`/`L-4`; `§4.2`'s read; `§4.3`'s delete). **A SECOND COPY OF EITHER
RULE IS THE SHADOW-HOME DEFECT THIS PART'S OWN SCOPE BOUNDARY FORBIDS** (`docs/specs/storeroom-native/contract.md`
§0.1 item 10(a) and item 10(c)).
`[T: the two homes of the bound and of its answer, pointed at from this part | CROSS-REF]`

---

## §3. The write verb

### §3.1 The write's signature, and the write's tier is REQUIRED and SINGULAR

**`write(address, tier, value, commit?) → WriteResult`.**

**⟶ AMENDED 2026-10-15 — THE `RCA-9` PASS ADDS THE OPTIONAL FOURTH ARGUMENT AND RE-SPELLS THE VERB'S `file`-TIER ARM** (`RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`; its store-side re-spell is ruled at that record's `§22.5` item 2; `RCA-8(d)` ANNOTATE-BESIDE: **the `write(address, tier, value)` line that stood here, the slot table beneath it and every clause of this section stand BYTE-FOR-BYTE and are read THROUGH this clause**; **the declared JS-side order of the four-and-one arguments is `docs/specs/storeroom-js/surface.md §2.2`'s and the argument is declared LAST there**).
- **THE FOURTH SLOT, DECLARED SO THE SENTENCE ABOVE IS NOT READ AS FOUR REQUIRED ARGUMENTS: `commit` IS OPTIONAL, and its `Absent` variant is the optional spelling.** **It carries the record identity the write joins** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2) — **so the terminal arm's own `file`-tier save can be keyed by the settled record's `op`** — **and its outside values and their answers are `docs/specs/storeroom-native/contract.md §3.1`'s own row for it, which is the ONE home of that table.** **A write carrying it and a write carrying nothing are ONE verb with ONE return shape.**
- **AND THE VERB'S `file`-TIER ARM RETURNS AS IT DOES TODAY: `Store::write` records the journal entry, installs the node and returns its `WriteResult` ON EVERY TIER — and for a `file`-tier write IT PERFORMS NO FILE I/O.** **THE COMMIT IS THE TERMINAL ARM'S ACT** (`docs/specs/storeroom-native/contract.md §7.2`'s dated clause of 2026-10-15; `docs/specs/storeroom-js/surface.md §2.11`). **SO `§3.5`'s post-condition block below is read with ONE COORDINATE ADDED: a successful `file`-tier write's post-conditions hold OF THE WRITE as its own two steps, and the durability of its image is owed by the terminal arm and NOT by this verb.**

| Slot | Domain | Outside the domain |
| --- | --- | --- |
| `address` | `§1.5`'s segment array | `AddressMalformed` |
| `tier` | **EXACTLY ONE of the three tokens** — `file` \| `mem` \| `temp` (`P: §13 · A24`: *"Exactly one required on write"*) | **absent, an array of length `0`, an array of length `> 1`, an out-of-domain token, or a non-string** → `OutOfDomainTier` (an out-of-domain or wrongly-typed value) **or `AddressMalformed` (`tier` absent entirely: a required argument is missing)** — `§3.1.1` |
| **`value`** | `§1.4`'s admitted set | **`ValueNotAdmitted`** |

**THE ARRAY FORM IS AVAILABLE ON READ AND NOT ON WRITE** (`P: §13 · A24`): **a write whose tier argument is
an array fails**, even an array of length `1` — *"exactly one"* is read as **exactly one token**, and the
array spelling is a different arity (`[T: the write arity's closure | CONTRACT]`; the alternative —
accepting a length-`1` array — is priced below).

**§3.1.1 The arity table, printed as a closed census.** **The tier argument's arity is per-verb and the
domain is per-argument; both are closed.** Every cell below names what the store answers.

| The verb | `tier` absent | `tier` a single token | `tier` an array of `0` tokens | `tier` an array of `1` token | `tier` an array of `≥ 2` tokens | a token outside the domain | **`tier` `null` or `undefined`** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`read`** | **legal** — lowest persistence (`§2.3`) | **legal** | **legal** — read as the zero-tier arm (lowest persistence) | **legal** — an any-match set of one | **legal** — an any-match set | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`: the shape is not a tier value at all) |
| **`write`** | **`AddressMalformed`** (a required argument is missing) | **legal** | **`OutOfDomainTier`** | **`OutOfDomainTier`** (the array spelling is not the write's arity) | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-3`) |
| **`delete`** | **legal** — every tier at the target (`§4.3`) | **legal** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-4`) |
| **`findAddress`** | as `read` | as `read` | as `read` | as `read` | as `read` | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`) |
| **`watch`** *(the STOPGAP row — **⟶ SUPERSEDED 2026-10-11 by the `listen` row below; the as-filed cells stand byte-for-byte and are read through this amendment**)* | **legal** — the registration is address-keyed, not tier-keyed (`§6.5`) | **legal** — **and this tier is the registration's TIER QUALIFIER, whose effect on the returned list is stated at `§6.5` item 7** | **legal** — **a zero-token set is the same as `tier` absent: the registration is unqualified, and `§6.5` item 7 states its effect** | **legal** — **a one-token set is the same qualifier as the single token** | **legal** — **the set is the registration's qualifier set** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-2`) |
| **`listen`** (*added 2026-10-11*) | **legal** — the registration is address-keyed and carries NO tier (`DD-36`) | **`OutOfDomainTier`** — **the surface's arity is `listen(address)`, so a tier-shaped argument is an argument this verb's arity does not carry** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`OutOfDomainTier`** | **`AddressMalformed`** (`PAR-13`) |
| **`unlisten`** (*added 2026-10-11*) | — (**the verb takes a `ListenerHandle` and no tier**) | — | — | — | — | — | — |
| **`readLiteral`** | as `read` — **and the form's own success shape is `§4.1`'s literal-only row** | as `read` | as `read` | as `read` | as `read` | **`OutOfDomainTier`** | **`AddressMalformed`** |
| **`storeCreate`** | — (no per-call tier) | — | — | — | — | — | — |

**THE `null`/`undefined` COLUMN, AND WHY EVERY VERB HAS ONE — the arity census's own closure** (`[T: the
column the `PAR` rows declare and the first amendment's table omitted | CONTRACT]`): **`PAR-2`/`PAR-3`/
`PAR-4` declare that `null` and `undefined` are OUTSIDE every `tier` argument's domain and that their
answer is `AddressMalformed` — *"the shape is not a tier value at all"*** — while **`§8.1` #1's trigger
column enumerates that trigger**. **The column above prints each verb's answer so the census and the `PAR`
rows agree cell by cell**: **`AddressMalformed` for every verb, on `read`/`write`/`delete`/`findAddress`/
`watch`/`readLiteral` alike — NOT `OutOfDomainTier`** (an out-of-domain token is a tier-shaped value
outside the domain; `null` is not a tier-shaped value at all). **`watch`'s zero-token set and its
single-token form are BOTH legal and BOTH are the registration's qualifier: a zero-token set is the
UNQUALIFIED registration** (`§6.5` item 7).

**THE TIER DOMAIN ITSELF IS `contract.md §5.1`'s:** **exactly three lowercase tokens — `file` · `mem` · `temp` — ranked
`file > mem > temp`** (`P: §1`: *"three tiers, ranked by their persistence in descending order: file, mem,
and temp"*). **There is NO FOURTH INBUILT TIER:** *"Secure will be a separate instance of this store that
is blocked on the node side from addressing less than `file`, not an inbuilt tier"* (`P: §9 · A4`), and
**an out-of-domain tier argument FAILS** — *"Fail on out-of-domain"* (`P: §14 · A29`) — with
**`OutOfDomainTier`**. **`secure`, `Secure`, `FILE`, `disk`, `session`, `""` and a non-string are
each OUTSIDE the domain, and each fails `OutOfDomainTier`** — **with the ONE exception the table's last
column prints: `null` and `undefined` are not tier-shaped values at all, so they fail
`AddressMalformed`** (`PAR-2`/`PAR-3`/`PAR-4`; `§8.1` #1) (`[P: §1, §9 · A4, §14 · A29 | CONTRACT]`).

**⟶ AMENDED 2026-10-11 — THE `watch` ROW IS SUPERSEDED AND THE `listen` ROW IS ADDED: THE TIER COLUMN IS
STRUCK FOR THE SUPERSEDED VERB AND THE LISTENER SURFACE'S ARITY IS DECLARED** (`A58` + `A57`; `RCA-8(d)`
ANNOTATE-BESIDE; `DD-36`). **THE AMENDMENT, IN THREE CLAUSES AND NOTHING ELSE:**
1. **THE `watch` ROW'S CELLS ARE STRUCK AS OPERATIVE ARITY AND KEPT AS RECORD.** **The stopgap's tier
   qualifier (`DD-26`) belonged to the superseded surface** (*"Watch is a stopgap for the listener
   implementation"*, `A58`), **and NOTHING CARRIES OVER FROM IT**: the listener's `address` is the whole of
   its key and **no tier test runs at any trigger** (`DD-36`; `write-and-read.md §6.5` item 10 (f)).
2. **THE `listen` ROW'S ARITY IS `one address, no tier`** — **so a tier-shaped second argument is an
   argument the verb's arity does not carry, and its answer is `OutOfDomainTier`; a `null`/`undefined`
   address is `AddressMalformed`, exactly as `PAR-1` states.** **The verb's own registration clause is
   `write-and-read.md §6.5`'s listener items.**
3. **`storeCreate`'s ROW IS UNMOVED BY THIS TABLE and its own arity is stated at
   `seams-and-lifecycle.md §7.1`** — **the construction takes `filePath?`, `journalLength` and
   `listeners[]`, and NO per-call tier** (the ordered sequence is that section's amendment).
4. **⟶ ADDED 2026-10-11 (`F-4`) — THE `listen` ROW'S *"a tier-shaped argument"* CELL IS ANSWERED HERE, AND
   ITS ANSWER IS THAT THE STATE IS OUTSIDE THE DECLARED SURFACE** (`RCA-8(d)` ANNOTATE-BESIDE: **the `listen`
   row above stands byte-for-byte, and THIS item is the operative statement of what its `tier` column's
   cells resolve to**). **THE DECLARED SURFACE, PRINTED WITH ITS ONE ARGUMENT:**
   **`Store::listen(address: AddressArg) -> Result<ListenerHandle, StoreError>` carries ONE argument and NO
   tier slot, and `Listener`/`ListenerEntry` carry `{ address, handle }` and NO tier member**
   (`docs/specs/storeroom-native/contract.md §0.4`; `A57`; **`DD-36`: *"a listener's `address` is the WHOLE of
   its key: NOTHING carries over from the superseded registration's tier qualifier"***). **A tier-shaped
   second argument CANNOT BE PASSED to `listen` at all** — so the row's `tier`-column cells are **NOT
   REACHABLE STATES OF THIS VERB**, **while the ANSWER ITSELF (`OutOfDomainTier`) IS REACHED BY SIX OTHER ROWS
   OF THIS SAME TABLE** (`read` · `write` · `delete` · `findAddress` · `readLiteral` — each of which declares a
   `tier` slot — **and `watch`'s superseded row**), **each of them answering it for a tier-shaped argument, as
   the table already prints cell by cell.** **WHAT THE `tier` COLUMN DECLARES IN ANSWER TO `F-4`:** **the
   declared answer for a tier-shaped argument is `OutOfDomainTier`, and it is DECLARED ON THE ROWS THAT CAN
   PRODUCE IT; on the `listen` row the column's cells are read as `—` (*not applicable: the verb's arity
   carries no tier slot*), and the row's `null`/`undefined` ADDRESS cell stands EXACTLY as filed
   (`AddressMalformed`, `PAR-1`'s own answer for a shape-less address).** **NOTHING ELSE OF THAT ROW MOVES,
   NO NEW CODE IS AUTHORED, AND `§8.1`'s SET STAYS CLOSED AT `15` MEMBERS.** **WHICH WAY WAS NOT TAKEN, AND
   WHY:** **giving `listen` a tier-shaped second parameter — so the as-filed answer becomes reachable — is
   REFUSED, because it would AUTHOR the very slot `DD-36` strikes and would grow `ListenerEntry`'s closed
   two-member set `{ address, handle }` (`A57`) into a three-member one** (`[T: the reconciliation, with the
   as-filed cell named and nothing deleted, at this contract's sixth bounded amendment | CONTRACT]`).
**AND THE AMENDMENT TOUCHES NO OTHER ROW OF THIS CENSUS: the `read`, `write`, `delete`, `findAddress` and
`readLiteral` rows stand byte-for-byte, and the arity table's own shape is unmoved** (it gains one row and
marks one superseded, and **`PAR-2`, `PAR-3` and `PAR-4` are unmoved by the register's conditional tier,
which is a `§5` tier-domain matter and never a per-argument arity matter**)
(`[T: the amendment, with the as-filed row named and nothing deleted | CONTRACT]`).
`[P: §1, §13 · A24, §14 · A29; L: §1-bis · tier | CONTRACT]`

### §3.2 The write's two-stage resolution — the PARENT RULE, stated once

**The write FIRST attempts to resolve the address ONE LEVEL LOWER THAN THE TARGET — i.e. the TARGET'S
PARENT — unless the address is already `len == 0`, in which case the resolution is the REGISTER**
(`P: §1`: *"The write function first attempts to resolve the address one level lower than the target, i.e.
the target's parent, unless it is already len == 0 (resolving the register)"*).

**THE PARENT-RESOLUTION RULE, STATED ONCE AND IN ONE PLACE — the rule the arm table, the pair table, the
census and `P-TP-6`'s drive all agree with** (`[T: the single statement the amendment exists to make; its
terms are `A24`'s required write tier, `A27`'s anchor-carried tier and monotonic clause, `A11`'s one
predicate and `A18`'s register — no ruling is re-decided and no new one is taken | CONTRACT]`):
**⟶ AMENDED 2026-10-11 — THE REGISTER'S EXCEPTION DIES: `A42` GIVES THE REGISTER A CONDITIONAL TIER, FIXED
AT CREATION (`A49`, `A50`, `A51`), SO ITEM 4'S AS-FILED SENTENCE *"The REGISTER IS THE EXCEPTION AND IS NOT AN
ANCHOR-QUALIFIED LINK: it has no parent anchor, so it imposes NO upper bound and any of the three tiers may
stand at a register key"* IS SUPERSEDED AND READ THROUGH THIS CLAUSE** (`store-model.md §1.6` item 4; the
as-filed sentence stands byte-for-byte at item 4 below). **THE OPERATIVE READING OF ITEM 4, IN THREE
CLAUSES:** **(i)** **the register HAS a parent anchor, whose node is the distinct carrier node sitting on
the register-as-a-link and having no parent of its own** (`A41`); **(ii)** **that anchor carries the
register's OWN tier — `file` when the construction's path is provided and passes the reachability test,
`mem` otherwise — FIXED AT CREATION** (`A42`/`A49`/`A50`); **(iii)** **so the monotonic clause is evaluated at
a register key exactly as at a nested address, and a write whose tier outranks the register's own tier FAILS
`ParentAnchorMonotonicityViolation`** — *"Fails as usual for an unpermitted write"* (`A51`) — **with the
consequence that in a `mem`-register store the `file` tier is UNREACHABLE at register keys and, through the
chain, below them, while in a `file`-register store all three tiers may stand at a register key.** **THE
CLOSING SENTENCE OF ITEM 4 IS NARROWED RATHER THAN WITHDRAWN: *"this clause constrains only writes whose
resolved parent is a `branch` reached through an anchor"* is read as *"… a `branch` reached through an
anchor, or THE REGISTER, whose parent anchor `A42` gives it"*.** **Nothing else moves: the parent search's
tier-agnosticism, the `F-3`/`F-6` arms and the two-anchor evaluation stand exactly as filed**
(`[T: the register's own bound, with the as-filed exception named and nothing deleted, at this contract's
sixth bounded amendment | CONTRACT]`).

**⟶ AMENDED 2026-10-11 — THE REGISTER'S OWN TIER, STATED WHERE THE PARENT RULE READS IT, SO `P-TP-6`'s
ADDED REGISTER DRIVES HAVE A CLAUSE TO CITE** (`A42` + `A49` + `A50`; `RCA-8(d)` ANNOTATE-BESIDE): **the
register's tier is the CONSTRUCTION-TIME, NEVER-MOVING value `store-model.md §1.6` item 4 (d) declares, and
THE WRITE'S OWN TIER DOES NOT REACH IT** — *"the write's own tier does two things and only two"* (item 3
below) **stands unweakened: it lands on the minted child anchor and it fixes the purge scope, and it never
tiers the register** (`DD-34` prices the re-tiering alternative).
(`[P: §9 · A41 · A42, §15 · A49 · A50 · A51 | CONTRACT]`)

1. **Let `parent = address[0 .. address.length - 1]` (`address` without its last segment) and
   `key = address[address.length - 1]`.** **The write's target is the node at `parent ++ [key]`.**
2. **THE PARENT RESOLUTION IS TIER-AGNOSTIC: `findAddress(parent)` runs with NO TIER ARGUMENT — the
   walk's ZERO-TIER arm of `§2.3` — so the parent anchor it reaches is the LOWEST-PERSISTENCE anchor at
   `parent`'s last key, at whichever tier that anchor carries.** **This is the whole rule:** the parent is
   found *by address alone*, and **the tier the write was called with does not qualify the parent search**
   (`§2.3`'s zero-tier arm; `P: §11 · A11`'s one predicate; `P: §14 · A28`). **Its failure is the write's
   failure, the write installs nothing, and the code is the walk's own** (`§3.4` arm `F-3`; `DD-5`).
3. **THE WRITE'S OWN TIER DOES TWO THINGS AND ONLY TWO:** **it is the tier the write's OWN CHILD ANCHOR
   IS MINTED AT** (`P: §13 · A24`: *"Exactly one required on write"*; `P: §14 · A27`: the tier is carried
   by anchors; **`§5.4`'s `P-SM-4` row (a)** — **⟶ REPOINTED 2026-10-11: the as-filed form was the bare
   `§5.4` (a); the contract document prints `§5.4` twice and this citation names the ROW's half
   (`contract.md §5.2`'s dual-mapping disclosure)** — `DD-10`), **and it fixes the PURGE SCOPE — every version of the addressed node
   at `rank ≤ rank(write tier)` is removed** (`P: §12 · A19`; **`§5.4`'s `P-SM-4` rows** arms `W-1`/`W-6`). **It does NOT
   qualify the parent resolution** (item 2).
4. **THE MONOTONIC CLAUSE IS THEN EVALUATED ON THE TWO ANCHORS — `§1.2`'s own carrier rule — and the
   write FAILS `ParentAnchorMonotonicityViolation` iff `rank(write tier) > rank(parent anchor's tier)`;
   it installs nothing and appends nothing** (`§3.4` arm `F-6`; `P: §14 · A27`: *"a child anchor may not be
   more persistent than its parent"*; `§8.1` #6). **So a write at tier `t` succeeds at a nested address
   exactly when `t` is the parent anchor's tier or a LOWER-persistence one** — *"lower tier" and "lower
   persistence" being ONE predicate* (`P: §11 · A11`) — **and the child can differ from its parent, which
   is what makes `F-6` REACHABLE and `P-TP-6` failable.** **The REGISTER IS THE EXCEPTION AND IS NOT AN
   ANCHOR-QUALIFIED LINK: it has no parent anchor, so it imposes NO upper bound and any of the three tiers
   may stand at a register key** (`§1.2`, `§1.6`) — **so this clause constrains only writes whose resolved
   parent is a `branch` reached through an anchor.**
5. **If the parent resolution succeeds and the monotonic clause holds, the write checks whether the
   resolved node is a `leaf` or a `branch`.**
   - **If the resolved PARENT is a `leaf`:** **the write CANNOT BEGIN, because a leaf holds a value and
     not a link — it fails `WriteParentNotLink`, for EVERY value class, literal or structured** (`§3.4`
     arm `F-5`; `§8.1` #9). *(`W-2`'s re-mint is the TARGET's arm, not the parent's: see `§3.4`'s
     disambiguation.)*
   - **If the resolved PARENT is a `branch`:** the write adds to / replaces within its container (`§3.4`
     arms `W-1`, `W-3`, `W-4`, `W-5`, `W-6`).
6. **`len == 0` target:** the write's target IS the register — **the write resolves the address one level
   lower, and there is no level lower than the register** — **so `write([], tier, v)` has no `key` to
   install under and FAILS `WriteParentNotLink`** (the register is a link and can hold children; a write
   with no last segment has no key). **`[T: the empty-address write's closure | CONTRACT]`**; the
   alternative — minting a nameless root — is priced below.

**AND THE ONE PLACE THE TIER-QUALIFIED PARENT SEARCH STILL APPLIES, STATED SO IT IS NOT MISTAKEN FOR THE
PARENT RULE:** **the READ, the `delete` and `findAddress` run the tier-qualified walk of `§2.3` when their
caller passes tiers — the resolution rule is PER-CALLER and only the WRITE's parent search is
tier-agnostic** (`§2.3`, `§4.1`, `§4.3`; `[T | CONTRACT]`). **A walk that IS passed a tier argument applies
the passed-tier filter AT EVERY STEP IT TAKES and answers `L-TIER`'s `TierNotFound` AT EVERY STEP — the
addressed step and every pass-through step alike — at which the key exists but no passed tier matches it**
(`docs/specs/storeroom-native/store-model.md §2.2`'s scope clause, whose rule this sentence states for the
whole tier-qualified surface) — so **`TierNotFound` remains reachable through every tier-qualified caller
and through `L-TIER`'s own arm at every step, and the write's parent stage is the one stage that no longer
reaches it** (`§8.1` #4).
`[P: §1 (the write's parent-resolution clause), §11 · A11, §13 · A24, §14 · A27 · A28 | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — WHERE THE TIER-QUALIFIED WALK ENDS** (`RCA-8(d)` ANNOTATE-BESIDE: **the closing
clause above stands byte-for-byte and nothing is deleted**; the contract document's bounded assembly-scope
determination, carried at its `§0.2 · DD-31`, dated `2026-10-11`). **THE AS-FILED CLAUSE'S SUBJECT WAS THE
WHOLE TIER-QUALIFIED SURFACE:** *"the READ, the `delete` and `findAddress` run the tier-qualified walk of
`§2.3` when their caller passes tiers — the resolution rule is PER-CALLER and only the WRITE's parent search
is tier-agnostic"*, with *"a walk that IS passed a tier argument applies the passed-tier filter AT EVERY STEP
IT TAKES and answers `L-TIER`'s `TierNotFound` AT EVERY STEP"*. **THE OPERATIVE READING, WITH ITS BOUNDARY:**
**the clause's scope is the WALK — the act each of the three verbs runs to resolve the address its caller
named — and it is NOT the READ's ASSEMBLY:** the read's assembled subtree applies `§2.3`'s rule to EACH ADDRESS
it reaches, so **`TierNotFound` remains reachable through every tier-qualified caller, at `L-TIER`'s own arm
and at every WALK step — while a MEMBER a passed set does not cover is OMITTED rather than refused** (`§4.2`'s
assembly clause and its reconciliation; `store-model.md §2.2`'s scope clause and its reconciliation;
`DD-31`). **So the sentence *"the write's parent stage is the one stage that no longer reaches it"* is
unweakened, and one second reading is withdrawn: the read's assembly was never a stage of that walk**
(`[T: the boundary of the tier-qualified surface, with the as-filed form named and nothing deleted |
CONTRACT]`).

### §3.3 The write's install stage — what a successful write leaves

**On a successful install, in every arm:**

1. **the new node — or the new branch-tree, recursively — is added to the child links of the
   address-resolved node found in §3.2, UNLESS the resolved node was a leaf** (`P: §1`);
2. **if a node already stands under that key/index on the address-resolved node, it is OVERWRITTEN**
   (`P: §1`);
3. **"overwritten" means exactly one of two things, and which one is decided by the SHADOW AND PURGE RULE the
   write's arm table carries — **`§5.4` arm `W-1`/`W-5` of `§5.4`'s `P-SM-4` row** (**⟶ REPOINTED
   2026-10-11: this cell's as-filed text read the bare *"`§5.4`"*; the contract document prints `§5.4` twice
   — the row `P-SM-4` and the purge chain (`contract.md §5.2`'s dual-mapping disclosure) — and this clause
   means the ROW's arms, so the row id and the arms are named**)** (`P: §1`; `P: §12 · A19`): **the existing version is either LITERALLY REMOVED AND REPLACED (this
   cascades to all downstream nodes), or ADDED ALONGSIDE so it shadows on read**;
4. **the write's tier lands on the minted child anchors** (`DD-10`), and **every descendant branch's anchor
   carries the same tier**;
5. **the write's journal entry is appended** (`§6.1`) and **the new anchors are added to the store's
   `(key, tier)` pair set at their link** (`P: §15 · A34`).

**AND THE RETURN, STATED BEFORE THE ARMS BECAUSE EVERY ARM RETURNS IT:** **a successful write returns the
journal op it produced** — *"A write passes back the journal op that it produced so that node can instruct
the rollback if needed"* (`P: §9 · A7`) — **and the list of watched addresses** — *"Also track the event
listeners and pass a list of watched addresses that should be called after a successful write"* (`P: §9 ·
A7`). **The record is `§3.6`'s.**
`[P: §1, §9 · A7, §15 · A34 | CONTRACT]`

### §3.4 The write arms — a closed table

**Every write falls into exactly one arm.** **`W-1`…`W-6` are the success arms; `F-1`…`F-6` are the
fail-closed arms, and each fail-closed arm installs NOTHING.** **The target's parent is the node resolved in
`§3.2`.** **`rank` is `§5.1`'s.** **`F-1`…`F-6` ARE EXHAUSTIVE OVER THE FAIL-CLOSED STATES: there is no
`F-7`, and the table below is TOTAL over every write whose `address`, `tier` and `value` are each in its
declared domain.**

| Arm | The pre-state it fires at | What the write does | The code it fails with |
| --- | --- | --- | --- |
| **`W-1`** | the parent is a `branch` (or the register), and the parent's container holds an anchor at `key` **at the write's own tier**, **and holds NO anchor at `key` at a LESS persistent tier than the write's tier** | **PURGE THE PAIR, THEN MINT:** the old anchor and its whole downstream subtree are **removed**, and the new node is minted in their place at the same pair. **The version count at that key does not grow** (`P: §15 · A34`; `DD-8`, `DD-11`) | — |
| **`W-2`** | **the TARGET — `parent ++ [key]`, resolved at whichever tier `§2.3`'s zero-tier arm selects — is a `leaf`, WHATEVER TIER THE LEAF'S ANCHOR CARRIES** (the state is the leaf's, and **no tier carves it out**: `P: §13 · A21`'s words name none)**,** and the value is an **object or array** | **RE-MINT:** the leaf's pointing anchor is **destroyed WHATEVER TIER IT CARRIES**, a **new anchor is placed on the SAME link** at **the write's own tier**, and the new `branch`-tree is minted below it (`P: §13 · A21`; `§1.1`). **The pair set at that key changes by the DESTROYED pair's removal and by the write's own pair's minting or replacement, so the count does NOT grow** | — |
| **`W-3`** | the parent is a `branch`/the register, the parent's container holds **no** anchor at `key`, and the value is a **literal** (`string`/`boolean`/number) | **MINT A LEAF** and its child anchor at the write's tier (`P: §1`) | — |
| **`W-4`** | the parent is a `branch`/the register, the parent's container holds **no** anchor at `key`, the value is an **object/array**, and the container's existing kind **matches** the value's kind (or the container is empty **AT THAT SLOT**, `DD-1`) | **MINT A BRANCH-TREE RECURSIVELY:** *"turning any key/index that is a literal into a leaf node and turning objects/arrays into branches until all keys have been mapped"* (`P: §1`) | — |
| **`W-5`** | the parent's container holds an anchor at `key` at a tier **more persistent** than the write's tier, **no** anchor at the write's tier, **and the write is NOT a re-mint — `W-2`'s pre-state does not hold beside it: the more persistent version is a `branch` (whatever the value's class), or it is a `leaf` and the value is a LITERAL (a leaf is re-minted only when the value is an object or an array — `W-2`, `§1.1`)** | **SHADOW:** the new version is **ADDED ALONGSIDE** the more persistent one, which **survives**; the shadow **wins the unqualified read** (`P: §1`; `P: §11 · A11`; `P: §12 · A19`). **The survivor keeps its ANCHOR AND ITS PAIR, and the pair set at that key GROWS BY ONE** | — |
| **`W-6`** | the parent's container holds an anchor at `key` at a tier **less persistent** than the write's tier — **whether or not an anchor also stands at the write's own tier** | **PURGE THE LOWER VERSIONS, THEN MINT:** **every version of the addressed node for which `rank(v) ≤ rank(write tier)` is removed** — *"Purge is the write deleting any versions of the addressed node with the same or less persistence"* (`P: §12 · A19`) — the whole downstream subtree of each removed version going with it, and the new node is minted at the write's tier | — |
| **`F-1`** | **`tier` is ABSENT (`TierArg::Absent`)** — *and only that: in Rust a missing `address` or `value` argument is a COMPILE error and not a runtime arm, so the reachable half of this arm is the absent tier alone* (`§0.4`'s spelling clause) | **nothing is installed**; no journal entry is appended | **`AddressMalformed`** |
| **`F-2`** | the value is outside `§1.4`'s admitted set | nothing is installed | **`ValueNotAdmitted`** |
| **`F-3`** | the target's parent resolution fails (`§3.2` item 2: `§2.2`'s `L-1`/`L-3`/`L-4` — and `L-TIER`'s `TierNotFound` only where a passed tier qualifies the walk, which the write's parent stage does NOT do) | nothing is installed, **including below the failing segment** (`DD-5`) | the walk's own code |
| **`F-4`** | the parent's existing container kind **contradicts** the value's kind (a `vec` target receiving an object, or a `hashmap` target receiving an array) — **OR the write's LAST segment's CLASS contradicts the parent container's KEY DOMAIN (a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP`)** | nothing is installed; **the container, the node and the journal are untouched** (`P: §13 · A22`; `DD-19`) | **`ContainerKindConflict`** |
| **`F-5`** | **the PARENT resolved by `§3.2` is a `leaf`, WHATEVER THE VALUE IS — literal or structured**: a leaf holds a value and not a link, so no child anchor can be installed there | nothing is installed | **`WriteParentNotLink`** |
| **`F-6`** | the write's tier would make the minted child anchor **outrank the parent anchor's tier** (`rank(write tier) > rank(parent anchor.tier)`) — **the parent anchor being the one `§3.2` item 2 resolved, and `§1.2`'s monotonic clause being stated over exactly those two anchors** | nothing is installed; no journal entry is appended | **`ParentAnchorMonotonicityViolation`** |

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the write's closed arm table is `12` arms = `6` success arms +
`6` fail-closed arms (`6 + 6 = 12`)** (`[T: the arm table's own census | CENSUS]`).
**`F-4` and `F-6` are the two arms `A22` and `A27` name directly**; **`F-6` is the arm that makes the
monotonic clause falsifiable** (`P-TP-6`) — **and it is REACHABLE exactly because `§3.2`'s parent
resolution is tier-agnostic: a child CAN differ in tier from its parent** (`§3.2` items 2 and 4).
**`W-2` vs `F-5`, distinguished so they are not conflated:** **`W-2` fires when the TARGET's own last
segment is at issue** — the target node is a leaf **WHATEVER TIER ITS ANCHOR CARRIES — the write's own tier
is no part of this arm's pre-state** — and the write's value is structured, so the *target* is re-minted. **`F-5` fires when the resolved PARENT is a leaf while the target
segment is a child the parent cannot hold** — **the write cannot even begin, whatever the value's class
is**, because a leaf *"cannot have downstream anchors"* (`P: §1`). **A literal write whose parent is a
leaf is therefore `F-5` and NOT armless: the table is total** (`§3.2` item 5).
**`W-2` vs `W-3` vs `W-5`, distinguished — ONE RULE, WITH NO TIER CARVE-OUT:** when the target resolves to a
**`leaf`** and the value is **structured** (an object or an array), **`W-2` is the arm WHATEVER TIER THE
LEAF'S ANCHOR CARRIES** — the re-mint, not `W-3` (which needs no anchor at the key) and **not `W-5`**, which
is the SHADOW arm **reserved to a target that is NOT the leaf this write re-mints**. **A leaf at a
HIGHER-persistence tier than the write's is therefore `W-2` and NOT `W-5`: the leaf's anchor does NOT
survive, the destroyed anchor's tier does not survive onto the new one, and the write's own tier is the new
anchor's tier** (`§1.1`; `P: §13 · A21`'s *"destroy and replace with a new anchor on the same link"*, which
carries no tier carve-out, read with `P: §11 · A13`'s two node kinds and `P: §15 · A34`'s one-anchor-per-pair
rule — **so a leaf at a MORE persistent tier than the write's is re-minted and does not stand beside the new
version, while a `branch` at that tier does**).
**AND THE TABLE'S TOTALITY IS COMPLETED BY ONE NAMED RULE THE ARMS ABOVE DID NOT DECIDE — THE `VEC` INDEX-RANGE RULE** (`RCA-8(d)` ANNOTATE-BESIDE: **every row of the table above, its arithmetic and every clause around it stand byte-for-byte; this clause ADDS the rule that makes the table total over the index state it did not decide**; the gate-4 adversarial pass's `AM-5`; `DD-43`; `store-model.md §1.3`'s `VEC` key domain and its key-domain arm; `§4.2` `R-3`; `store-model.md §2.2` `L-3`; `§8.1` #7; `[T: the index-range rule, so no write mints an anchor the parent's own read cannot contain | CONTRACT]`).
**THE STATE THIS DECIDES, NAMED RATHER THAN LEFT TO BE TRACED:** **`write(["v"], mem, [10,20])` mints a `VEC` holding `idx0` and `idx1`, and `write(["v", idx(5)], mem, 9)` satisfies `key_fits(Vec, Index)` at the key-class level — yet `idx 5` lies outside the container's own declared index domain (*"non-negative integers, CONTIGUOUS FROM `0`"*, `store-model.md §1.3`), so minting there would leave the `VEC` holding `0, 1, 5` while `read(["v"])` — `R-3`'s dense array, *"dense from `0` and its length is the container's contiguous index count"* — answers `[10,20]`: a minted node the parent's own read does not contain, with no arm refusing it and no code for it.**
**THE RULE, IN THREE CLAUSES:** **(1) THE WRITE'S DOMAIN.** **A write whose LAST segment is an INDEX and whose resolved parent container is a `VEC` holding `n` anchors (`n ≥ 0`) is IN DOMAIN iff the index is `0 ≤ i ≤ n`: `i = n` APPENDS the new anchor (`W-3` for a literal, `W-4` for a structure), and `i < n` fires the pair's own arm (`W-1`/`W-2`/`W-5`/`W-6`) exactly as any other key does.** **(2) THE OUT-OF-DOMAIN STATE IS `F-4`'s, AND NO NEW CODE IS MINTED.** **A write whose last segment is an index `i > n` fails `ContainerKindConflict` (`§8.1` #7) and INSTALLS NOTHING — no anchor, no coercion, no container-kind change, and NO JOURNAL ENTRY** — **because an index outside the container's declared index domain contradicts that container's KEY DOMAIN, exactly as an integer segment aimed at a `MAP` or a `string` segment aimed at a `VEC` does** (`store-model.md §1.3`'s key-domain arm, whose member this shares; `write-and-read.md §3.4`'s own key-domain arm; the two DIRECTIONS of a value-kind conflict already share one member, `DD-19`'s own precedent; 
**and THIS clause is the one that extends that arm's `F-4` pre-state to a same-CLASS index outside the container's declared range, which the class-level test alone does not reach**). **A `VEC`'s key domain is thereby never widened by a write, and NO GAP IS MINTABLE.** **(3) THE READ'S ANSWER FOR A NON-EXISTENT INDEX.** **Because no gap can be minted, the state *"a hole"* HAS NO INSTANCE: a resolved `VEC` is DENSE from `0` with its length the container's contiguous index count (`R-3`), and `read(["v", idx(5)])` over a two-element `VEC` fails `AddressNotFound` at `L-3` — *"the container holds no anchor at that key"* — and never answers `null`, never omits an element, and never assembles a hole** (`§2.2` `L-3`; `§4.2` `R-3`). **THE OBSERVABLE IS THEREFORE SINGLE-VALUED: the parent's read contains every address the parent's own subtree resolves, at EVERY index `0 ≤ i < n`, and no write can make it otherwise** (`P-IM-3`'s ADDRESS and CLOSURE passes; **`P-IM-1`'s round trip over a `VEC`; `P-SM-4`'s `(b)` pair count; `P-TP-9`'s refusal code**).
**ITS `alt`, PRICED, AND ITS REVERSAL POINT — `DD-43`'s:** **the alternative is a DISTINCT `VEC`-index range arm with its own code** — priced: it would grow `§8.1`'s closed set by one whose trigger the key-domain arm of `ContainerKindConflict` already covers (`DD-19`'s one-member-per-trigger-class precedent), and the set's `11 + 2 + 1 + 1 = 15` algebra would need re-deriving; **REVERSAL POINT: a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded.**
**AND THE `NG-6` INVARIANT'S SCOPE IS THEREBY FIXED FOR ITS AUTHOR:** **the property *"whatever the parent's read contains, every element it does not contain must resolve to NO node"* holds over BOTH paths — a delete's renumbering (`DD-30`) and a write at an index — because clause (2) makes the write path unable to mint the state the delete path leaves.** **NO `tests/**` BYTE IS WRITTEN BY THIS PASS** (`AR-14`; `AR-16`); **the cell's re-derivation is `role_test_writer`'s** (`archive/gate4/storeroom-native-amendment-adversarial.md §4`'s `NG-D`).

**AND THE PLACES TWO SUCCESS ARMS' PRE-STATES HOLD AT ONCE, DESIGNATED SO THE EFFECT STAYS
SINGLE-VALUED** (`[T: the designation; it closes the overlap the exclusivity clause's earlier wording left
open, it takes the reading `§3.5` item 4 and **`§5.4` the purge chain's rule** already force, and its three further overlaps
are named at this contract's bounded RECONCILIATION pass | CONTRACT]`): **when a key
holds a version at the write's own tier AND a version at a LESS persistent tier, both `W-1`'s and `W-6`'s
pre-states hold** — **the write IS `W-6` BY DESIGNATION, and its effect is `W-6`'s: every version at
`rank ≤ rank(write tier)` is removed** — **which subsumes `W-1`'s replacement, and is the only effect
`§3.5` item 4 and **`§5.4` the purge chain's section** permit.** **AND THE THREE OVERLAPS `W-2`'S WIDENED PRE-STATE PUTS
BESIDE IT, EACH ONE EFFECT AND EACH SPOKEN FOR BY A NAMED ARM — NO DESIGNATION IS NEEDED FOR ANY OF THEM
AND NONE IS INVENTED:** **(i) `W-1`+`W-2`** — a leaf at the write's OWN tier with a structured value:
`W-1`'s *purge the pair, then mint* and `W-2`'s *destroy the anchor, then place a new one on the same link*
are **ONE effect at ONE pair** (the destroyed anchor's pair IS the write's pair), and **the arm the state is
named by is `W-2`**, the re-mint (`§1.1`). **(ii) `W-2`+`W-6`** — the leaf the zero-tier arm selects stands
at a LESS persistent tier than the write's: `W-2` destroys that leaf's anchor and `W-6` purges every version
at `rank ≤ rank(write tier)`, a set that CONTAINS that pair — **the same pair leaves and the same new node
arrives under either row**, so the effect is `W-6`'s and equals `W-2`'s. **(iii) `W-5`+`W-6`** — a key
holding versions at BOTH sides of the write's tier and none at the write's own: **`W-6`'s row removes no
version at `rank > rank(write tier)`**, so its purge and `W-5`'s surviving version are **ONE effect**, and
the pair set and the value are single-valued. **So the success arms are EXCLUSIVE BY EFFECT, with `W-6`
designated for the first pre-state, ONE NAMED ARM for each of the three overlaps above, and a carve-out that
survives ONLY AS THE ARM `W-5` ITSELF** (**`§5.4`'s `P-SM-4` row (b)**), and **no write's observable outcome is ambiguous.**

**AND THE `F-4`-vs-`W-6` OVERLAP, DESIGNATED — THE ONE FAIL ARM A SUCCESS ARM'S PRE-STATE CAN ALSO HOLD**
(`[T: the designation, taken at this contract's third bounded amendment so the TestWriter's `NG-8` can be
authored; the gate-4 adversarial pass's `S-7` found this overlap undesignated | CONTRACT]`): **a write whose
VALUE's kind contradicts the parent container's kind, or whose LAST SEGMENT's class contradicts the parent
container's key domain (`docs/specs/storeroom-native/store-model.md §1.3`), has the pre-state `F-4` fires at
— and where that same key ALSO holds an anchor at a tier LESS persistent than the write's, `W-6`'s pre-state
holds BESIDE `F-4`'s.  THE WRITE IS `F-4` BY DESIGNATION, AND THE DESIGNATION IS UNCONDITIONAL:** **the kind
contradiction is evaluated BEFORE any pair-set mutation, so `F-4` subsumes every success arm whose pre-state
the write's key and tier also satisfy — `W-1`, `W-4`, `W-5` and `W-6` alike — and the effect is `F-4`'s own:
NOTHING IS INSTALLED, no version is purged, no anchor is destroyed or minted, the container's kind does not
change, and NO JOURNAL ENTRY IS APPENDED** (`§3.4`'s fail-closed arms' one guarantee; `§3.5`; `DD-19`). **The
observable is therefore single-valued: `write(['a'], mem, {})` followed by `write(['a'], file, [1])` — or by
any write whose segment class or value kind the container contradicts — answers `ContainerKindConflict`,
leaves the `mem` version standing whole, and grows the pair set by NOTHING.** **This designation decides no
ruling: it states which arm already governs, so that the `F-4` arm's totality and the success arms'
exclusivity hold at once** (`§3.4`'s totality clause; `P: §13 · A22`).

**⟶ RECONCILED 2026-10-11 — THE ONE RULE `§1.1`'S RE-MINT CLAUSE AND THIS TABLE'S `W-5` ROW NOW SHARE (this contract held BOTH readings for the same inputs, and now holds ONE).** **THE AS-FILED CELLS READ:** **`§1.1`** — *"a write whose target resolves to a **leaf** and whose value is an object or an array destroys that leaf's **pointing anchor** … the destroyed anchor's tier does not survive onto the new one"*, stated **UNCONDITIONALLY**; and **this table's `W-5` row, read with this section's `W-2`/`W-5` disambiguation sentence** — *"when the target is a leaf at a HIGHER-persistence tier than the write's, `W-5` is the arm (the leaf's anchor survives and the new version shadows it)"* — which gave **the SAME inputs two opposite observables**: the destroyed anchor's pair gone (the leaf's anchor destroyed) against the leaf's anchor standing BESIDE the new version. **THE OPERATIVE READING, AND THE RULING IT RESTS ON: `P: §13 · A21` — *"destroy and replace with a new anchor on the same link"* — IS READ UNCONDITIONALLY, because the ruling's own words name no tier and no persistence, and the ruling's own transcription names the residual it answered as *"the fate of the anchor a branch overwrites when a write re-mints a leaf"*.** **So `W-2` is the arm for EVERY leaf target a structured value re-mints, WHATEVER TIER that leaf's anchor carries, and `W-5` is the SHADOW arm for the states `W-2` does not reach** — **`P: §11 · A13`'s two node kinds** (the node the destroyed anchor pointed to ceases to exist, so that anchor cannot survive it) **and `P: §15 · A34`** (at most one child anchor per `(key, tier)`, so the new anchor stands at the WRITE's pair and the old one is never re-tiered) **being the two rulings that make the replacement singular.** 
**`A11` IS NOT WEAKENED AND IS NOT RE-DECIDED:** *"lower tier"* IS *"lower persistence"* remains ONE predicate, and it is the predicate the SHADOW arm's survival and the read's selection are stated over. **NO `DECLARED-DEFAULT` ROW IS ADDED, AND NONE IS NEEDED** (`contract.md §0.2`): **the tier carve-out the as-filed `W-5` prose carried is not an alternative `A21` leaves open to be priced — it is the reading this reconciliation resolves AGAINST, so no question is put to the architect and no residual is parked** — **and the carve-out that SURVIVES is the SHADOW arm itself, reserved to the states `W-2` does not reach, WITH ITS OWN OBSERVABLE IN THE TABLE ABOVE (the survivor keeps its ANCHOR and its PAIR, and the pair set at that key grows by one): an ARM, never a silent exception.** **THE ALTERNATIVE IS PRICED ANYWAY, SO THE CHOICE IS NOT SILENT:** **restoring the tier carve-out would leave a destroyed leaf's anchor standing beside the write's own version — which `A21`'s words do not authorize (*"the leaf's pointing anchor is DESTROYED and a NEW ANCHOR is placed on the SAME LINK"*), it would make a structured write and a literal write at one key observably identical in their survivor set, and it would give `A34`'s pair set a version whose anchor `A21` ordered destroyed** — **so the alternative is available only against a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment** (`P: §10 · A8`). **THE TABLE STAYS TOTAL AND THE SUCCESS ARMS STAY EXCLUSIVE BY EFFECT, AND THIS SECTION'S CENSUS IS UNMOVED:** **`W-5` remains an arm** (`W-2`'s widened pre-state excludes exactly ONE state from it), so **the write's closed arm table is still `12` arms = `6` success arms + `6` fail-closed arms (`6 + 6 = 12`) ✓**, and 
**the overlaps `W-2`'s widened pre-state creates are each ONE EFFECT under the designation clause above, so no write's observable outcome is ambiguous and no arm is counted twice.** **AND THE CELLS THIS ONE RULE MOVES, ENUMERATED AS A REQUIREMENT LIST AND CHECKED OFF — ✓ EVERY ONE, AND NO RE-SPELLING IS INFERRED FROM A BYTE DIFF:** **(1) ✓** `docs/specs/storeroom-native/store-model.md §1.1`'s re-mint arm clause — its unconditional words stand and it gains *"WHATEVER TIER THE DESTROYED ANCHOR CARRIED"*; **(2) ✓** this table's `W-2` row — the tier condition on the leaf's anchor is struck and its pair-count effect stated; **(3) ✓** this table's `W-5` row — the re-mint state is excluded from its pre-state and its observable is stated; **(4) ✓** this section's `W-2`/`W-3`/`W-5` disambiguation prose — now ONE rule with no carve-out; **(5) ✓** this section's designation clause — the three overlaps named; **(6) ✓** `§3.5` item 2 — its pair-set cell gains `W-2`; **(7) ✓** `§5.3` item 4 — the shadow rule carries the re-mint's one exception; **(8) ✓** `§5.4` (b) — its pair-count cell gains `W-2` and its overlap list the three names; **(9) ✓** `§5.4` (c) and that row's failure list — the survival half's scope and the *"a write that removes a HIGHER persistence version"* failure each name the re-mint's own destruction; **(10) ✓** `§5.4`'s purge-chain table — its note, so the chain is read as the PURGE's own table and never as the re-mint's.** **AND NO OTHER CELL MOVES:** **the arm ids, this section's arm census (`12 = 6 + 6`), the register's row count and its ids, the closed fail-code set's membership and count, the `derivation:` clause and the part map stand as filed** — 
**and the two `DD` rows that name an arm (`DD-8`, `DD-11`) are EXAMINED AND UNMOVED: both lean on the SAME-TIER arm `W-1`, whose effect this rule does not touch, and neither leans on the tier carve-out resolved here.** **THE CITATION RE-SPELLINGS THE SPLIT OF THIS SECTION REQUIRES, EACH CHECKED OFF (a relocation re-spells a citation and never re-derives it, `docs/specs/spec-scope-and-structure/contract.md` §C.11.9):** **(a) ✓** the pointer this clause and its cell list carry to `§1.1`'s re-mint arm clause is spelled bare — *"`§1.1`'s re-mint arm clause"* — in `docs/specs/storeroom-native/contract.md`'s `§3.4`, and by its home's path — *"`docs/specs/storeroom-native/store-model.md §1.1`'s re-mint arm clause"* — in this carrier copy, because the record shapes' relocated span is that part's; **(b) ✓** the reverse pointer — this reconciliation clause is cited from `store-model.md`'s `§1.1` as *"`docs/specs/storeroom-native/write-and-read.md §3.4`'s reconciliation clause"* and from `contract.md`'s `§1.1` as *"`§3.4`'s reconciliation clause"*; **(c) ✓** the arm citation this section and `§1.1` use (*"`§5.4` arm `W-2`"*) is UNMOVED and its home is stated — the arm rows' TABLE is `§3.4`'s, and every other `§5.4`-spelled arm citation in this directory names THAT SAME TABLE through the register row's section, so the idiom resolves from either end and no second arm set is meant; **(d) ✓** every other `§`-number this clause names is the contract document's own and is spelled bare here and in `contract.md`, except the one `contract.md §0.2` above, which names the `DD` table's home across the split.**
`[P: §10 · A8, §11 · A11 · A13, §13 · A21, §15 · A34; T: the reconciliation of `§1.1`'s re-mint clause with this section's `W-5` row to ONE rule, taken at this contract's bounded RECONCILIATION pass | CONTRACT]`
`[P: §1, §11 · A11, §13 · A21 · A22, §15 · A34 | CONTRACT]`

### §3.5 The write's post-conditions, and what a failed write guarantees

**A SUCCESSFUL WRITE GUARANTEES, in this order** (`[T: the write's post-condition set | CONTRACT]`):

1. **the install of `§3.3` completed, and the pre-write state is recorded in the journal entry of `§6.1`;
2. **the pair set at the addressed link changed exactly as its arm says** (`W-1`/`W-6` removed; **`W-2` the
   destroyed pair removed and the write's own pair minted or replaced — the count does not grow**; `W-5` grew
   by one; `W-3`/`W-4` grew by one);
3. **the return value carries the op (`§6.2`) and the watched-address list (`§6.5`)**;
4. **no read performed after the write can observe a version at a tier `≤ rank(write tier)` at the
   addressed node other than the one this write installed** — this is `A19`'s purge, stated as an
   observable.

**A FAILED WRITE GUARANTEES** (`[T: the fail-closed arms' residue | CONTRACT]`): **no node was minted, no
anchor was destroyed, no version was removed, no container's kind changed, and NO JOURNAL ENTRY WAS
APPENDED.** **The store's observable state after a failed write is byte-identical to its state before it**
— `DD-4`, `DD-19`; this is the isolation half of `U-28`'s residual and it is `P-TP-9`'s check.
`[T: §3.5's two post-condition blocks; P: §8 ("preserving the original data in case of failure") | CONTRACT]`

### §3.6 The write's return shape — `WriteResult`

**`WriteResult` is a record with exactly two members:**

```
WriteResult {
  op:       JournalOp,             // §6.2 — the op the write produced; ALWAYS present on success
  watched:  Address[]              // §6.5 — the watched ADDRESSES whose callbacks the host should invoke.
                                   //   AN ADDRESS IS A SEGMENT LIST (§1.5), NOT A STRING: the Rust
                                   //   spelling is `Vec<Vec<Segment>>` (§0.4). ALWAYS a list, possibly
                                   //   EMPTY, never absent and never null.
}
```

**`watched` is ALWAYS an array** — it is `[]` when nothing is watched in the write's scope, and **it is
never `undefined`** (`[T: the return shape's closed member set | CONTRACT]`). **AND `watched`'s MEMBERS ARE
ADDRESSES AND NOT STRINGS — the type the list carries, settled so **`§5.8`'s `P-TP-8` row** and `§6.5` — this part's own section — and this member agree:** a
watched address is **a SEGMENT LIST** (`§1.5`: *"an address is a JS/JSON ARRAY OF SEGMENTS"*), so **the
member is an `Address` and NOT a `string`** — **a `string[]` could carry neither the EMPTY address nor an
integer INDEX segment, both of which are legal watched addresses** (`§1.5` items 1 and 4; `P-TP-8`: *"the
set of registered watched ADDRESSES"*; `§6.5` item 3: a PREFIX relation over addresses). **The Rust
spelling is `Vec<Vec<Segment>>`** (`§0.4`) (`[T: the member's type, corrected at this contract's second
bounded amendment | CONTRACT]`). **`op` is ALWAYS present on a
successful write and is never absent** — `A37`'s *"Op must store enough data to reconstruct the original
tree and resolve the current state, and be id'ed for rollback"* (`P: §15 · A37`) is a duty about **content**,
and its **concrete record shape is this contract's to state** (`R: §17.3`: *"its concrete RECORD SHAPE
stays the CONTRACT's to state"*) — the shape is `§6.2`'s, declared as `DD-22`.
**A failed write returns nothing: it throws the `StoreError` of `§8.3`, so `WriteResult` exists only on the
success path** (`DD-24(b)`).
`[P: §9 · A7, §15 · A37; R: §17.3 | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THE WRITE'S RETURN GAINS A THIRD MEMBER, `triggered`, AND THE AS-FILED RECORD
ABOVE STANDS BYTE-FOR-BYTE** (`A57` + `A43` + `A58`; `RCA-8(d)` ANNOTATE-BESIDE; `DD-35`). **THE OPERATIVE
RECORD:**

```
WriteResult {
  op:         JournalOp,              // §6.2 — unchanged, ALWAYS present on success
  watched:    Address[],              // §6.5 — KEPT, carrying the watched ADDRESSES the superseded
                                      //   registration set produced: `Vec<Vec<Segment>>`, `[]` when none,
                                      //   never absent, never null (unchanged)
  triggered:  ListenerHandle[],       // NEW — the handles of the TRIGGERED LISTENERS, in the ONE
                                      //   event `write` (A43, A57): the store RETURNS them and invokes
                                      //   nothing; ALWAYS a list, possibly EMPTY, never absent
}
```

**WHAT MOVED, AND WHY NOTHING WAS SILENTLY RE-MEANED:** **`A58` rules the shipped `watch`/`unwatch`
surface a STOPGAP superseded by the listener surface** — *"Watch is a stopgap for the listener
implementation"* — **and `A43` rules that listeners fire on `write` AND `delete`, so a write's answer now
carries a HANDLE SET as well as an ADDRESS SET.** **THIS CONTRACT DECLARES THE LEAST DISRUPTIVE FORM OF THAT:
`watched` KEEPS ITS OWN NAME AND ITS OWN TYPE, and `triggered` is ADDED BESIDE IT** — **the alternative
(leaving the handle set to be carried UNDER the shipped name) is priced at `DD-35`, and a silent meaning
change under the shipped name is REFUSED as a filing practice.** **The `triggered` list carries HANDLES and
the `watched` list carries ADDRESSES: they are DIFFERENT TYPES on purpose, so a caller cannot confuse them at
a call site, and the one place both are produced is this success path.**
**AND THE FIRING MODEL IS THE STORE'S WHOLE PART IN IT: the store NEVER invokes a callback.** *"Listener has
an address to determine where it binds and a handle that it returns to alert the client of the trigger"*
(`A57`) — **so the returned handle IS the alert, the invocation is the CLIENT'S ACT outside this store, and
NO THROWING BODY IS A STORE STATE** (the proposal's `§18`, consequence (4): *"if the store never invokes a
body, no body can throw inside a store operation"*). **This is stated here because this is where the value
crosses; `§6.5`'s listener clauses are the firing model's home.**
`[P: §18 · A57, §9 · A43, §20 · A58; T: the amended member set, with the added member named | CONTRACT]`

**THE VERB SURFACE IS HERE, AND THE ARMS ABOVE ARE ITS WHOLE TABLE** — this part is the home of `§3`, `§4`
and `§6`. **A citation to one of them names this path plus its `§`-number**
(`docs/specs/storeroom-native/write-and-read.md §3.4`, etc.), because *a bare `§n` across documents is not
an edge* (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a), which states the cross-document
citation form; `[T | CROSS-REF]`).
**The contract document's own `§3.6` carries the pointer to this part; this part carries the spans.**

---

## §4. The read verb and the delete verb

### §4.1 The read's signature — tier OPTIONAL, accepting ZERO TO MANY

**`read(address, tier?) → StoreValue`.** **On read the tier argument is OPTIONAL and accepts ZERO TO MANY
tiers, and a read with tiers passed answers a node whose tier is ONE OF THEM** (`P: §13 · A24`:
*"Optional on read, accepts zero to many tiers, reading any node that matches one if any tier is passed"*).
**The selection rule the read runs is `§2.3`'s** — the walk is shared (`§2.1`), so **the read resolves
nothing of its own.** **The read's own tier-domain failure is `OutOfDomainTier` (`§3.1.1`'s arity table).**

| The read's return, by what it resolved to | Its shape |
| --- | --- |
| a **`leaf`** | **the leaf's stored value** — the admitted literal itself, exactly as written (`P: §1`: *"If leaf: return the leaf's stored value"*) |
| a **`branch`** | **a freshly assembled JSON value** (`§4.2`) |
| **the REGISTER** (empty address) | **an object containing the ENTIRE REGISTRY** (`P: §13 · A25`) |

**§4.1.1 THE LITERAL-ONLY FORM — `readLiteral(address, tier?) → StoreValue`: ITS SUCCESS SHAPE, DECLARED.**
**`readLiteral` is the SAME read with ONE narrowing: its target must be a `leaf`.** **Its declared
behaviour is three clauses and nothing else** (`[T: the form's closure, stated at this contract's second
bounded amendment; the form itself is `§8.1` #8's carrier and the `read` verb's sibling | CONTRACT]`):

1. **`address` and `tier` are `read`'s own**: the address grammar is `§1.5`'s, the tier argument's arity and
   domain are **`§3.1.1`'s `readLiteral` row — identical to the `read` row, `tier` optional and
   zero-to-many, `null`/`undefined` → `AddressMalformed`, an out-of-domain token → `OutOfDomainTier`** —
   and the selection rule is `§2.3`'s. **The resolution is the SHARED walk's (`§2.1`): `readLiteral`
   resolves nothing of its own.**
2. **ON SUCCESS it returns EXACTLY what `read` returns at a `leaf` — the leaf's stored value, THE ADMITTED
   LITERAL ITSELF, exactly as written** (`R-1`; the same value, the same copy discipline, the same
   absence of any wrapper). **It is a `StoreValue` and not a record: there is no `readLiteral`-specific
   return type.** **At a `leaf` target, `readLiteral(a, t)` and `read(a, t)` are indistinguishable — the
   two forms differ ONLY in what they refuse.**
3. **IT REFUSES EXACTLY TWO STATES AND NOTHING ELSE:** **a `branch` target** (including the register, whose
   read assembles an object) fails **`ReadTargetIsBranch`** (`§8.1` #8); **everything else fails with the
   walk's own codes exactly as `read` does** (`L-1`/`L-3`/`L-TIER`/`L-4`, `§2.2`, and `OutOfDomainTier`
   for the tier argument). **It never returns `null` and never returns the assembled JSON of a branch.**

**A read is a VALUE COPY, not a reference** (`[T: the read's copy discipline | CONTRACT]`; `JN-6` records
that *"preserving the original data"* has no observable for a value a caller already read out, so the copy
discipline is stated **over store state**): **mutating the object a read returned never mutates the store**,
and **the only reference-returning seam is `findAddress`** (`P: §13 · A26`, `§2.1`). **`readLiteral` obeys
the same copy discipline.**
**A read NEVER THROWS for an unoccupied key, an absent tier or an unresolved address** beyond the four walk
codes and `OutOfDomainTier`: there is **no `null` answer** (`DD-12`).
**⟶ RECONCILED 2026-10-11 — WHAT THE READ ANSWERS WHEN THE PASSED SET COVERS NOTHING IN ITS SUBTREE**
(`RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and nothing is deleted**; the contract
document's bounded assembly-scope determination, dated `2026-10-11` and priced at its `§0.2 · DD-31`). **THE
AS-FILED SENTENCE'S TERMS, READ WITH THE AS-FILED `§4.2`'s CLOSING SENTENCE, LEFT ONE STATE AMBIGUOUS: where
a passed tier set selected NO version for a key inside the ASSEMBLY, one home said the read assembled NOTHING
for it and the other said the assembly *"never omits a member in silence"*.** **THE OPERATIVE READING:** **the
read OMITS that member — the assembled `MAP` or `VEC` carries no entry for it — and the read SUCCEEDS**,
because the set selects which version each address answers and never whether the read answers; **the read's
own failure set is UNCHANGED and UNWIDENED: `L-1`'s `AddressMalformed`, `L-3`'s `AddressNotFound`, `L-TIER`'s
`TierNotFound` at a WALK step, `L-4`'s `LeafHasNoDownstream` and `OutOfDomainTier` remain its whole fail set,
and the omission produces no code at all** (`store-model.md §2.2`'s scope clause and its reconciliation;
`§4.2`'s assembly clause and its reconciliation; `DD-31`; the walk's fail set is `store-model.md §2.2`'s and
`seams-and-lifecycle.md §8.1`'s, and neither moves) (`[T: the read's failure set under the omission, stated so
no code is read into it | CONTRACT]`).
`[P: §1, §13 · A24 · A25 · A26; L: §1-bis · address | CONTRACT]`

### §4.2 The read's assembly arms — a closed table

**`R-1`…`R-5` are the read's arms.** **The recursion is stated once: the descendant node values are read in
the same manner recursively** (`P: §1`: *"The descendant node values are read in the same manner
recursively"*).

| Arm | The state it fires at | The answer |
| --- | --- | --- |
| **`R-1`** | the resolved node is a **`leaf`** | **its value**, verbatim |
| **`R-2`** | the resolved node is a **`branch` whose container is a `MAP`** | **an object** — *"convert to an object, using the same keys"* (`P: §1`) — one member per key, its value produced by the same read applied to the node the key's selected anchor points to |
| **`R-3`** | the resolved node is a **`branch` whose container is a `VEC`** | **an array** — *"If the downstream link is a vec, convert to array"* (`P: §1`) — index order, element `i` produced by the same read applied to the node the index-`i` anchor points to. **The array is dense from `0` and its length is the container's contiguous index count** |
| **`R-4`** | a `MAP` (or `VEC`) holds **more than one anchor at the SAME key/index** at different tiers | **only the node of the lowest-persistence anchor is translated** (`P: §1`: *"If more than one anchor has the same index/key, translate only the node of the lowest-persistence anchor"`), **unless a tier was passed, in which case the passed any-match set decides and the lowest-persistence member of that set answers** (`§2.3`; `P: §13 · A24`) |

| **`R-5`** | the resolved node is the **REGISTER** | **an object containing every register key** — one member per key, its value produced by the same read applied to that key's selected root node. **This is `R-2` applied to the register, which is always a `MAP` (`P: §13 · A23`)** |

**AND `R-4`'s TIER SET IS THE WALK'S OWN SET, APPLIED AT EVERY STEP — THE ASSEMBLY IS NOT A SECOND RULE:**
**when a tier set was passed, the read's ASSEMBLY applies that SAME passed set at EVERY STEP OF ITS OWN
WALK, at the addressed node and at every descendant node the recursion reaches** — **one member per key,
whose value is produced by the same read applied to the node of the lowest-persistence anchor WITHIN THE
PASSED SET**, and **where a descendant key holds an anchor but NO passed tier matches it, the read answers
`L-TIER`'s `TierNotFound` for that step and assembles NOTHING for it** — **the assembly never substitutes an
anchor at a tier the caller did not pass, and it never omits a member in silence** (`[T: the assembly's tier
scope, stated at this contract's third bounded amendment — the gate-4 adversarial pass's `H-1` found the
fallback assembles out-of-set anchors, and this clause fixes the reading `store-model.md §2.2`'s scope clause
and `§2.3` already carry | CONTRACT]`).

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the read's closed arm table is `5` arms**, and **only one of them
(`R-4`) is a SELECTION arm rather than a SHAPE arm** (`[T: the read arm table's own census | CENSUS]`).
**THE EMPTY CONTAINER'S READ IS `DD-1`'s:** **a `MAP` with `0` child anchors reads as `{}` and a `VEC` with
`0` child anchors reads as `[]`** — **the two empty forms are DISTINCT, and that distinctness is what makes
`A22`'s read-inference observable** (`[T + DD-1 | DECLARED-DEFAULT]`).
`[P: §1, §13 · A23 · A24 | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THE ASSEMBLY'S TIER SCOPE: THE SET SELECTS A MEMBER'S VERSION PER ADDRESS, AND
WITHOUT A SELECTABLE VERSION THE MEMBER IS OMITTED** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed clause of
this section stands byte-for-byte above and nothing is deleted**; the contract document's bounded
assembly-scope determination, taken after `docs/specs/storeroom-native-greens.md`'s `F-1` and carried at its
`§0.2 · DD-31`, dated `2026-10-11`). **THE AS-FILED CELL READ:** *"where a descendant key holds an anchor but
NO passed tier matches it, the read answers `L-TIER`'s `TierNotFound` for that step and assembles NOTHING for
it — the assembly never substitutes an anchor at a tier the caller did not pass, and it never omits a member
in silence"* — **and BOTH of its last two clauses could not hold together with `R-2`'s *"one member per key"*
once a set was passed over a subtree that lies outside it.** **THE OPERATIVE READING, IN THREE CLAUSES AND
NOTHING ELSE:** **(a) THE SET IS A PER-ADDRESS SELECTOR: at each step of the assembly's recursive walk, the
step applies the passed set exactly as `§2.3` applies it at a walk step — the lowest-persistence anchor WITHIN
THE PASSED SET is the one translated, and where a key holds more than one passed tier, `A28`'s
lowest-persistence rule answers over that matched subset, `A11`'s one predicate being its ground.** **(b)
WHERE NO PASSED VERSION IS SELECTABLE, THE MEMBER IS OMITTED: a key whose container holds an anchor but whose
anchors lie at NO passed tier contributes NO entry to the assembled `MAP` or `VEC` — the read does NOT answer
`TierNotFound`, does NOT assemble an out-of-set anchor, and does NOT fall back to the lowest-persistence arm
`A28` reserves to a `0`-token set** — **so `read(['g'], {file})` over a `file`-tier `g` whose child `c` stands
at `temp` answers the assembled object with `c` OMITTED (the empty object `DD-1` declares where nothing is
left to assemble), and `read(['g','x'], {file,mem})` answers the `file`-tier child, its own anchor being the
lowest-persistence member of the passed subset at that address.** **(c) THE SUBSTITUTION HALF OF THE AS-FILED
CELL STANDS UNCHANGED, AND IT IS `H-1`'s: the assembly NEVER substitutes or translates an anchor at a tier the
caller did not pass** — the finding the as-filed clause closed remains closed, and nothing in this
reconciliation re-opens it. **THE WHOLE OF THE CHANGE IS THEREFORE THE AS-FILED CELL'S
`TierNotFound`-for-a-descendant READING, WITHDRAWN, AND ITS OPPOSITE — THE MEMBER IS OMITTED — PUT IN ITS
PLACE** (`DD-31`; `store-model.md §2.2`'s scope clause and its reconciliation; **and what the read's failure
set is under the omission is stated at `§4.1` below in this part**). **NO `§`-NUMBER, NO ARM, NO FAIL-CODE, NO
REGISTER ROW AND NO CENSUS OF THIS SECTION MOVES: the read's arm table is still `5` arms and `R-4` is still
its one SELECTION arm** (`[T: the reconciliation, with the as-filed form named and nothing deleted |
CONTRACT]`).

### §4.3 The delete's signature — tier OPTIONAL, and its tier-scoped reading

**`delete(address, tier?) → DeleteReceipt`.** **The delete verb STANDS, and its tier scope reads through
the one-predicate discipline** (`P: §11 · A12`: *"See above"* answering the delete question; `P: §11 · A11`).

- **The directive's words are the verb's whole text:** *"If the address resolves, delete the resolved node
  and all downstream. If the tier is specified, delete only that tier(s), otherwise, delete all."*
  (`P: §1`). **`A12` rules that this verb stands and that *"delete only that tier(s)"* removes the instance
  at that tier, while *"the surviving lower- or higher-tier instance at the same key is unaffected unless
  its tier is named"*** (`P: §11 · A12`'s mapped clause).
- **`tier` absent** → **every version of the addressed node is removed, at every tier, together with all
  downstream nodes of each.** **A delete of the empty address removes every top-level entry: the register
  is emptied** (`[T: the empty-address delete's closure | CONTRACT]`).
- **`tier` an array of `≥ 2` tokens** → **`OutOfDomainTier`** (`§3.1.1`) — *"delete only that tier(s)"* is
  read as **one** tier per call, exactly as the write's arity is, because `A24` fixes the array form on
  **read** alone (`[T: the delete's arity closure | CONTRACT]`; the alternative — accepting a set on delete
  — is priced below).
- **A delete that removes nothing is a SUCCESS, not a failure** — it returns `DeleteReceipt` with
  `tiers: []` (`DD-9`).
- **Delete is NOT purge.** **Purge is a WRITE's act** (`P: §12 · A19`) and is **`§5.4`'s `P-SM-4` row (arm `W-6`)**, read with **`§5.4` the purge chain**; a delete
  is a caller's act and removes only what it names (`[P: §12 · A19; T | NEGATIVE]`).
- **AND THE DELETE FIRES, WHICH IS THE ONE THING THIS SIGNATURE'S BLOCK ABOVE DID NOT SAY** (`A43` +
  `A57`; `RCA-8(d)` ANNOTATE-BESIDE; `DD-35`): **the delete's trigger event reaches exactly the listeners
  whose address is a PREFIX of the deleted address — descendant-inclusive from the listener's own address
  downward (`A33`/`A37`, `DD-18`) — and the store RETURNS their handles in the receipt's `triggered` member
  and INVOKES NOTHING** (§4.4's amended receipt; `write-and-read.md §6.5` item 10). **A listener bound at a
  STRICT DESCENDANT of the deleted address does NOT fire** (the delete resolves to the named node and
  removes its subtree; it passes through the named address's ancestors and not through its descendants),
  **a `delete` that removes nothing fires nothing (`D-3`: `triggered: []` with `tiers: []`, `DD-9`)**, and
  **the shipped sentence *"THE LIST IS RETURNED ON A SUCCESSFUL WRITE ONLY"* (`§6.5` item 4) is SUPERSEDED
  IN ITS `ONLY` HALF while its failure half stands: a FAILED delete returns no receipt at all (`D-4`
  throws)** (`[T: the delete's firing clause, with the superseded sentence named | CONTRACT]`).
- **AND WHAT THE DELETE LEAVES BEHIND IN A `VEC`'S OWN CONTAINER IS `§4.4`'S OWN CLAUSE, POINTED HERE SO
  THE RECEIPT IS NOT READ AS CARRYING IT:** **a delete that removes an indexed version RENUMBERS that
  container's surviving anchors **in container order from `0`** — each keeping its tier and its node
  (`DD-30`) — while the receipt's two members are UNTOUCHED by it: `tiers` carries the tiers whose versions
  were REMOVED and `address` is the caller's array VERBATIM** (`§4.4`; `§1.3`, `§4.2` `R-3`, **`§5.5`'s
  `P-IM-3` row** — **⟶ REPOINTED 2026-10-11: the as-filed pair read *"`§5.5` `P-IM-3`"*; the number `§5.5` is
  printed twice in the contract document and this citation names the ROW, so the possessive is added
  (`contract.md §5.2`'s dual-mapping disclosure)**; `[T + `DD-30` | CROSS-REF]`).
- **AND THE DELETE DOES NOT COMMIT THE FILE — THE GATE-4 ADVERSARIAL PASS'S `S-5`, STATED HERE BECAUSE THIS
  VERB IS THE ONE THE CLAUSE WAS MISSING FOR** (`DD-28`; `[T + `DD-28` | DECLARED-DEFAULT]`): **a `delete` —
  at ANY tier scope, INCLUDING a delete that removes `file`-tier versions — performs NO file I/O**
  (`seams-and-lifecycle.md §7.2` item 5), **so the bytes at `cfg.filePath` remain the bytes of the LAST
  SUCCESSFUL `file`-TIER WRITE, and a FRESH `storeCreate(cfg)` at the same `cfg.filePath` re-boots from those
  bytes — the version the delete removed in memory STANDS AGAIN after the re-boot.** **That re-boot is
  `§7.2` item 6's declared boot and is the declared consequence of `DD-28`, not a defect; the alternative (a
  file-committing delete) carries a second failure arm whose only available member is `FileCommitFailed`,
  whose trigger column is *"a `file`-TIER WRITE'S failure path"* (`§8.1` #14), and is priced at `DD-28`.**

### §4.4 The delete arms — a closed table, and the receipt shape

| Arm | The state it fires at | What the delete does | The receipt's `tiers` |
| --- | --- | --- | --- |
| **`D-1`** | `tier` is a single token, and the target holds a version at that tier | removes that one version, **and all of its downstream**, leaving every other tier's version at that key **untouched** | the one named tier |
| **`D-2`** | `tier` is absent, and the target holds versions at `1` to `3` tiers | removes **every** version and all downstream of each | every tier removed, in the canonical order of `§5.1` (`file`, `mem`, `temp`) |
| **`D-3`** | the target resolves, but holds **no** version at the named tier (or no version at all — **a state the model cannot reach: see the clause below**) | **removes nothing**, and is a **success** | **`[]`** |
| **`D-4`** | the address resolves to nothing (`§2.2`'s walk codes) | removes nothing; the delete **fails with the walk's own code** | — (it throws) |
| **`D-5`** | the address is the **empty address** | **empties the register**: every top-level entry and all its downstream is removed. **`tier` present → only that tier's top-level entries** | the tiers removed |

**`D-3`'s PARENTHETICAL, SETTLED SO THE ARM IS NOT READ AS HAVING TWO STATES** (`[T: the parenthetical's
reading, at this contract's second bounded amendment | CONTRACT]`): **the clause *"or no version at all"*
names a state NO ADDRESS CAN BE IN, and it is unreachable by the model's own construction:** **every
reachable node is reached through an anchor** (`§1.1`, `§1.2`), **and every anchor carries a tier**
(`P: §14 · A27`; `§1.2`) — **so a node that resolves at an address always holds a version at the tier of
the anchor that resolves to it, and *"resolves but holds no version at all"* has no instance in this
store.** **The arm's ONE reachable state is the first half: the target resolves and the NAMED tier holds no
version — which is a SUCCESS with `tiers: []` (`DD-9`).** **The parenthetical is retained as the ruling's
own words and read as the arm's degenerate half, never as a second trigger**, and **`D-3` counts as ONE
arm, so the delete's census (`4 + 1 = 5`) is unmoved.**

**`DeleteReceipt` is a record with exactly two members** (`[T: the receipt's closed member set | CONTRACT]`):

```
DeleteReceipt {
  address: string[] | (string|number)[],   // the address the caller passed, VERBATIM — the same array's
                                           // segments, in order; the store returns a fresh array
  tiers:   Tier[]                          // the tiers whose versions were removed, in §5.1's canonical
                                           // order; [] when nothing was removed
}
```

**⟶ AMENDED 2026-10-11 — THE DELETE'S RECEIPT GAINS A THIRD MEMBER, `triggered`, BECAUSE `A43` RULES THAT A
`delete` FIRES** (`A43` + `A57` + `A58`; `RCA-8(d)` ANNOTATE-BESIDE; `DD-35`). **THE OPERATIVE RECORD:**

```
DeleteReceipt {
  address:    (string|number)[],      // the address the caller passed, VERBATIM — unchanged
  tiers:      Tier[],                 // the tiers whose versions were removed — unchanged; [] when none
  triggered:  ListenerHandle[],       // NEW — the handles of the TRIGGERED LISTENERS in the event
                                      //   `delete` (A43, A57): the store RETURNS them and invokes
                                      //   nothing; ALWAYS a list, possibly EMPTY, never absent
}
```

**WHAT THE MEMBER CARRIES, STATED SO ITS SCOPE IS NOT OVER-READ:** **the `delete`'s trigger event reaches
exactly the listeners whose address is a PREFIX of the DELETED address (descendant-inclusive from the
listener's own address downward, `A33`/`A37`, `DD-18`) — so a listener bound AT the deleted address fires, a
listener bound at a strict ANCESTOR of it fires, and a listener bound at a STRICT DESCENDANT of it does NOT**
(the delete resolves to the named node and removes its subtree; it passes through the named address's
ancestors and not through its descendants). **AND A DELETE THAT REMOVES NOTHING (`D-3`, `DD-9`) FIRES
NOTHING**: **it is a SUCCESS carrying `tiers: []` and `triggered: []`** — **no version was removed, so no
node was destroyed and no trigger occurred** (`DD-9`'s own arm read with `A43`'s event set). **THE
`D-1`/`D-2`/`D-5` ARMS FIRE, the `D-3` ARM DOES NOT, and the `D-4` ARM THROWS the walk's own code and returns
no receipt at all** (`§4.4`'s table, unmoved).
**AND THE TWO SUPERSEDED CLAUSES THIS MEMBER'S ARRIVAL TOUCHES ARE NAMED RATHER THAN LEFT TO BE FOUND:**
**`§6.5` item 4's *"THE LIST IS RETURNED ON A SUCCESSFUL WRITE ONLY"* is SUPERSEDED IN ITS `ONLY` HALF** —
**a successful `write` returns the `write` event's handle set and a successful `delete` returns the `delete`
event's handle set** — **while its FIRST half stands: a FAILED write and a FAILED delete return nothing,
because each throws** (`§3.5`; `D-4`) — **and `§6.5` item 5's *"NO ORDER IS DECLARED FOR THE LIST"* is
EXTENDED to the handle lists by `DD-37` (the order is unspecified for BOTH lists, and the drive compares
SETS).**
`[P: §9 · A43, §18 · A57, §20 · A58; T: the amended receipt, with the added member and its firing scope |
CONTRACT]`

**AND THE DELETE'S EFFECT ON A `VEC`'S SURVIVING INDEX KEYS — THE STATE `D-1`'s AND `D-2`'s ARMS WERE
SILENT ON, AND WHAT THE DELETE DOES INSTEAD** (`DD-30`; **the state the gate-4 adversarial pass's `H-2`
exposed and the implementer's own fix declared**; `[T + `DD-30` | DECLARED-DEFAULT]`): **a delete of an
indexed version of a `VEC`'s container RENUMBERS the surviving anchors in CONTAINER ORDER FROM `0` — each
surviving anchor KEEPS ITS TIER and KEEPS ITS NODE, and only its index key moves.** **THE CONSEQUENCE, IN
THE CONTRACT'S OWN TERMS: the container's index domain stays CONTIGUOUS FROM `0` (`§1.3`'s `VEC` key
domain), the parent's own read is DENSE AGAIN — *"the array is dense from `0` and its length is the
container's contiguous index count"* (`§4.2` arm `R-3`) — and every minted node stays REACHABLE BY EXACTLY
ONE ADDRESS PATH (`§5.5`'s row `P-IM-3`, whose failure list carries *"a minted node no address resolves
to"*): the survivor that stood at the deleted index's successor is addressed at ONE index from `0` after
the delete, and the deleted index's own node no longer resolves — at ANY index.** **AND THE `VEC` BOUNDARY,
STATED SO THE CLAUSE IS NOT READ AS STORE-WIDE:** **the renumbering is `VEC`-only** — a `MAP`'s string keys
are not relabelled by a delete (`§1.3`: a `MAP`'s keys are its own, and its iteration order is not
declared), a container left with `0` surviving anchors has no key to renumber, and the register's own keys
are never relabelled. **THE DELETE'S ANSWER IS UNCHANGED, member for member:** the `DeleteReceipt` of
`§4.4` carries the SAME `tiers` cell — **the tiers whose versions were REMOVED, and renumbering removes
none** — and its `address` member is the caller's own array VERBATIM; **the delete still returns a
`DeleteReceipt` (`D-1`/`D-2`/`D-3`/`D-5`), still throws only `D-4`'s walk codes, and no arm, no receipt
member and no `§4.4` census (`4 + 1 = 5`) moves.** **The renumbering mints NOTHING, removes NO surviving
anchor, touches NO surviving anchor's tier and NO surviving anchor's node, and is NOT a purge: purge is a
WRITE's act (`§4.3`; `P: §12 · A19`), and this is a caller's delete relabelling the keys it left behind.**
**AND THE CLAUSE IS A DECLARED CHOICE, NOT A RULING'S OWN WORDS, SO ITS SOURCE IS STATED:** **the nearest
rulings — `A19`'s purge definition and the directive's own cascade sentence — name what a WRITE purges and
what a delete REMOVES, and NEITHER names the surviving siblings' keys**, so the reading above is this
contract's own and is carried as `DD-30`, **at the alternative's price and with its reversal point —
never as a question to the architect and never read as a closure of theirs.**
**⟶ AMENDED 2026-10-11 — THE RENUMBERING'S GROUPING RULE: A MULTI-VERSION ELEMENT'S ANCHORS RENUMBER TOGETHER, AND THE ELEMENT IS THE UNIT** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence of the renumbering clause above stands byte-for-byte — *"each KEEPING ITS TIER and its NODE, only its index key moving"* included — and THIS clause is the operative statement of WHAT ONE *"surviving anchor"* IS where several anchors stand for ONE element**; the gate-4 adversarial pass's `AM-12`; `DD-43`; `DD-30`; `store-model.md §1.3`'s `(key, tier)` uniqueness rule; `§4.2` `R-3`; `§2.3`; `[T: the grouping rule, so a shadowed element's versions do not split across two indices | DECLARED-DEFAULT]`). **THE STATE THIS DECIDES, NAMED RATHER THAN LEFT TO BE TRACED:** **a `VEC` may hold SEVERAL ANCHORS AT ONE INDEX — one per tier, because two versions of one element are two anchors (`P: §15 · A34`) — and the clause above relabels *"each surviving anchor"*, which read PER-ANCHOR lets a shadowed element SPLIT: `write(["v"], file, [10,20])`; `write(["v", idx(1)], temp, 99)`; `delete(["v", idx(0)], Absent)` → the survivors `idx1-file(20)` and `idx1-temp(99)` would be relabelled `0` and `1`, and `read(["v"])` would answer `[20, 99]` where the element the unqualified read selects is `99` ALONE.**
**THE RULE: THE UNIT OF RENUMBERING IS THE ELEMENT, NOT THE ANCHOR.** **The container's surviving ELEMENTS are its surviving INDEX KEYS in container order, and EACH ELEMENT'S WHOLE ANCHOR SET — EVERY tier's anchor standing at that index — RE-INDEXES TOGETHER to the element's new index, each anchor KEEPING ITS TIER and ITS NODE and NEITHER splitting off into an index of its own.** **So in the example above the shadowed element re-indexes to `0` with BOTH its anchors, and `read(["v"])` answers `[99]` — the version `§2.3`'s zero-tier selection answers at the element's own address — while the `20` version stands at `idx0`'s `file` pair exactly as a shadowed version stands anywhere else** (`§2.3`; `R-4`; `P: §11 · A11`'s one predicate). **AND THE DENSITY, THE KEY DOMAIN AND THE REACHABILITY THE CLAUSE ABOVE WON ARE UNMOVED: the container's index domain stays CONTIGUOUS FROM `0` (`store-model.md §1.3`), the parent's read is DENSE with its length the element count (`R-3`), every minted node stays reachable by exactly one address path (`contract.md §5.5`'s `P-IM-3`), no surviving anchor's tier or node moves, and the `DeleteReceipt`'s two members are untouched** (`tiers` = the tiers whose versions were removed; `address` = the caller's array VERBATIM).
**ITS `alt`, PRICED, AND ITS REVERSAL POINT — `DD-30`'s own, and the priced form is the PER-ANCHOR relabelling the as-filed words permit:** **priced: it SPLITS one element across two indices, so a shadowed version becomes addressable at an index its own element no longer stands at, the parent's read answers the SHADOWED value as a second element where one element stood, and `R-4`'s *"only the node of the lowest-persistence anchor is translated"* is contradicted at a container whose element count the relabelling itself changed** — **available only with `A34` re-read and `R-3`/`R-4` re-derived.** **REVERSAL POINT: a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded** (the instrument its own `DD-30` row names).**
`[T: the renumbering clause, `DD-30`'s carrier; the invariants it keeps are `§1.3`'s key domain, `§4.2`
`R-3`'s density and **`§5.5`'s `P-IM-3` row**'s reachability | DECLARED-DEFAULT]`
**WHERE THE SECTIONS THIS CLAUSE NAMES LIVE, SO NO BARE `§n` CROSSES A DOCUMENT UNNAMED** (`contract.md`
§0.1 item 10(a)): **`§1.3` is `docs/specs/storeroom-native/store-model.md §1.3`**, **`§5.5` is the contract
document's own `§5.5`** (`docs/specs/storeroom-native/contract.md §5.5`, the `P-IM-3` row — the register's
home is the contract document and is NOT relocated — **and the contract document prints `§5.5` twice, the ROW
and the tier clause; this clause means the ROW, and `contract.md §5.2`'s dual-mapping disclosure states the
reading rule**), and **`§4.2`/`§4.4` are this part's own**
`[T: the pointers, `DD-30`'s cross-references resolving inside this directory | CROSS-REF]`

**ARITHMETIC, PRINTED WITH ITS TERMS:** **the delete's closed arm table is `5` arms = `4` success arms +
`1` fail-closed arm (`4 + 1 = 5`)**; **`D-3` is a success arm that removes nothing, and that is the
ruling's own consequence, not an omission** (`[T: the delete arm table's own census | CENSUS]`).
`[P: §1, §11 · A11 · A12 | CONTRACT]`

---

## §6. The journal, the returned op, the rollback, and the watched-address list

### §6.1 What the journal is, what it tracks, and its lifetime

**THE JOURNAL TRACKS STORE CHANGES, AND THE TRACKED VERBS ARE EXACTLY TWO: `write` and `delete`**
(`P: §9 · A5`: *"Journal track store changes (write/delete), expires at end of session, older entries above
a configured length compress to a base state"*).

1. **One entry per SUCCESSFUL `write`, and one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE
   VERSION.** **A failed write appends NO entry** (`§3.5`); **a delete that removed nothing (`D-3`) appends
   NO entry** (`[T: the entry-formation rule | CONTRACT]`).
2. **The journal is CARRIER-INTERNAL:** it is the store instance's own record, **not addressable through
   `findAddress`, not a node, not reachable by any address, and not a tier of its own** — it is **not
   tier-bound** (`P: §8`'s subjects `J-1`'s printed silences, and `R: §17.5`'s *"the store-side
   counterpart … stays the CONTRACT'S carriage"* read together; `[T | CONTRACT]`).
3. **ITS LIFETIME IS THE SESSION, AND IT EXPIRES AT SESSION END** (`P: §9 · A5`). **The session's referent
   is the PROCESS: `mem` is *"lost on process exit"* (`P: §12 · A19`), and the journal's expiry is the same
   event** — **on process exit the journal is empty and its entries are unrecoverable**
   (`[T: the session's referent read from `A19` | DECLARED-DEFAULT]`; the alternative — a realm or window
   teardown — is priced: `A19`'s own words fix *"Process exit"* for the neighbouring `mem` lifetime, and a
   realm-scoped reading would make the journal die where `mem` does not; reversal point: a fresh ruling).
4. **`M-3` — THE JOURNAL IS BOUNDED BY A CONFIGURED LENGTH:** **`journalLength` is a REQUIRED construction
   argument** (`P: §14 · A31`: *"Required as args on store creation"*), **a positive integer counting
   ENTRIES, supplied by the caller with NO DEFAULT** (`DD-16`).
5. **COMPRESSION:** **older entries above that configured length COMPRESS TO A BASE STATE**
   (`P: §9 · A5`). **THIS CONTRACT DECLARES THE BASE STATE'S FORM AND THE TRIGGER:**
   - **the base state is a SNAPSHOT of the store's own observable state at the moment of compression** —
     the value every reachable address read at that moment, i.e. the register's whole readable content —
     **and it replaces every compressed entry as the walk's floor** (`[T | DECLARED-DEFAULT]`);
   - **the trigger is the APPEND: when an append would leave more than `journalLength` un-compacted
     entries, the oldest entries are compressed until at most `journalLength` entries remain
     un-compacted and are marked `compacted`** (`[T | DECLARED-DEFAULT]`);
   - **`M-4` — THE WALK'S FLOOR:** **a rollback may NOT walk past a compressed base**: an entry marked
     `compacted` is **OUT OF SCOPE** (`P: §15 · A35`: *"If it is old enough to be compacted it's out of
     scope"*), and **`rollback` requested over such a scope fails `RollbackCompacted`** (`DD-16`; `§8.1`).
   **Both halves are priced at `DD-16`, whose alternative is a different form (a full operation log) and
   whose reversal point is a bounded amendment.**
`[P: §9 · A5, §14 · A31, §15 · A35 | CONTRACT + three DECLARED-DEFAULT sub-clauses]`

### §6.2 The journal op — its shape, its content duty, and its id's type

**A WRITE PASSES BACK THE JOURNAL OP IT PRODUCED** (`P: §9 · A7`), and **the op's CONTENT AND IDENTITY ARE
RULED:** *"Op must store enough data to reconstruct the original tree and resolve the current state, and be
id'ed for rollback"* (`P: §15 · A37`).

**The op's CONCRETE RECORD SHAPE and its id's TYPE are this contract's to state** (`R: §17.3`; `P: §16`'s
own consequence clause), and this contract fixes them as follows (`DD-22`):

```
JournalOp {
  opId:      string,                  // the IDENTITY: a non-empty, store-unique string token.
                                      // Uniqueness is per store instance and per session.
  kind:      'write' | 'delete',      // which tracked verb produced it
  address:   (string|number)[],       // the address the verb was called with, VERBATIM, in order
  tier:      Tier | null,             // the write's single tier; null for an unqualified delete
  before:    BaseState,               // the ORIGINAL-STATE half: at least the pre-operation value of the
                                      // addressed node's own version(s) AND of every node the operation
                                      // removed or replaced, transitively — enough to RECONSTRUCT THE
                                      // ORIGINAL TREE for the operation's whole reach
  after:     BaseState,               // the CURRENT-STATE half: at least the post-operation value of the
                                      // addressed node's version(s) — enough to RESOLVE THE CURRENT STATE
                                      // at the written address
  seq:       number,                  // the entry's append ordinal, strictly increasing from 1
  compacted: boolean                  // true once the entry has been compressed into the base state
}
```

**`BaseState` is a record with exactly two members** (`[T: the base state's shape, declared here | CONTRACT]`):

```
BaseState {
  present:  boolean,                  // whether the value exists at all (false = the pre-state was absent)
  value:    StoreValue | StoreValue[] // the value, or — where an operation touched more than one version
                                      // or more than one node — the ordered list of the values it touched,
                                      // in §5.1's canonical tier order
}
```

**PROPERTIES THE OP SATISFIES, EACH CHECKABLE** (`[P: §15 · A37; T | CONTRACT]`):

1. **`reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach** — the state that stood
   before the operation, for every address the operation touched;
2. **`resolve(op.after, currentJournal)` yields the state the store is in NOW at `op.address`** — i.e.
   `read(op.address)` at the moment of the call agrees with `op.after.value` unless a later entry at a
   scope overlapping `op.address`'s subtree supersedes it;
3. **`op.opId` is a non-empty string, unique within the instance, and is the handle `rollback` accepts**;
4. **`op.kind` is exactly one of `'write'` and `'delete'`, and no other value appears.**

`[P: §9 · A7, §15 · A37; R: §17.3 | CONTRACT]`

### §6.3 The journal's own surface

**The journal exposes exactly one verb, and it is not one of the store's address verbs:**

```
rollback(op: string) → RollbackResult      // `op` is a JournalOp.opId
```

**`RollbackResult` is a record with exactly three members** (**⟶ RECONCILED 2026-10-11, BY THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8): this relocated clause's as-filed text read *"exactly **two** members"* while the block beneath it prints **three** — `opId` · `undoneOps` · `restoredTo` — and the crate's `src/records.rs` declares three fields; **the COUNT was the stale side and nothing else moved: no member was added, dropped or renamed**, and the contract document's `§6.3` head carries the same reconciliation**):

```
RollbackResult {
  opId:        string,      // the id the caller passed, echoed
  undoneOps:   string[],    // the opIds the rollback undid, in REVERSE append order (newest first)
  restoredTo:  BaseState    // the state the addressed subtree now stands at
}
```

**`rollback` is the ONLY consumer of the journal, and the journal is not readable, enumerable, addressable
or deletable by any other call** (`[T | NEGATIVE]`): **there is no `journalEntries()`, no
`journalLength()`, no `clearJournal()`, and no `findAddress` path that reaches an entry.**
**`J-5` (the journal as an observable) is thereby ANSWERED, in the only form `A7` supplies: the op CROSSES
as a returned value on every write** (`P: §9 · A7`; `R: §16.2`'s `O-8`/`J-5` reading).
`[P: §9 · A7, §15 · A37 | CONTRACT]`

### §6.4 The rollback's rule — its reach, its scope, its floor and its residue

**THE REACH, RULED:** *"Every operation touching the same subtree. If it is old enough to be compacted it's
out of scope."* (`P: §15 · A35`).

1. **`M-5` — THE SCOPE:** **a rollback undoes EVERY operation TOUCHING THE SAME SUBTREE as the named op**
   — **not the last op alone, and not the failing op's own ops alone** (`P: §15 · A35`). **This contract
   declares "the same subtree" measured against the WRITTEN ADDRESS's OWN SUBTREE:** an entry `E` is in
   scope iff **`op.address` is a prefix of `E.address` (itself or a descendant), at ANY tier** (`DD-21`).
   **AND THE SCOPE IS CANDIDATE-SET-WIDE BEFORE IT IS FILTERED — the clause that makes `M-6` REACHABLE:**
   **the reach is stated over EVERY entry the operation's subtree contains, `compacted` entries INCLUDED;
   the FLOOR of `M-6` is then the predicate that decides which of them the rollback may undo.** **So the
   scope is never empty of compacted entries "by definition": a compacted entry IN the addressed subtree's
   reach IS in the candidate set, and `M-6` is the clause that refuses the rollback over it**
   (`[T: the reach's candidate-set-wide form, stated at this contract's second bounded amendment so the
   floor's failure arm is REACHABLE rather than vacuous — the defect the red set's `F-6` exposed |
   CONTRACT]`).
**⟶ AMENDED 2026-10-16 (`M-5`) — THE SCOPE GAINS A TEMPORAL FLOOR, ON THE ARCHITECT'S RULING, VERBATIM: *"Add temporal stop to the rollback."*** **`RCA-8(d)` ANNOTATE-BESIDE: every byte of item 1 above — its `M-5` heading, its *"EVERY operation TOUCHING THE SAME SUBTREE"* claim, its prefix test, `DD-21`'s citation and its candidate-set-wide clause with the `F-6` tag — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is the operative statement of the SCOPE, and it RE-STATEs no term of `M-6` (item 2), of `M-7`'s identity half (item 3), of `M-8`…`M-11` (items 4–7) or of item 8's automatic rollback.** **THE DEFECT IT CLOSES, NAMED BY ITS CAUSE AND NOT BY ITS SYMPTOM:** **the scope as filed is a PREFIX TEST OVER ADDRESSES and nothing more, so an entry written LONG BEFORE the named op — at the same address, or under it — is reversed SOLELY BECAUSE IT LIES UNDER THAT ADDRESS: a caller seeding a lawful value at `['k']`, then arming a constraint, then writing a violating value, loses the PRE-EXISTING value to the rollback and cannot recover it, because the route back answers `RollbackCompacted` (`M-9`'s mark).** **THE INSTRUMENT NEEDED ALREADY EXISTS AND THIS AMENDMENT MINTS NONE: the journal is SEQUENCED — every `JournalOp` carries `seq`, its append ordinal, *"strictly increasing from 1"* (`§6.2`'s shape) — so a temporal floor needs NO new member, NO new record and NO new parameter: THE SCOPE FILTER GAINS ONE UPPER BOUND IN `seq` TERMS.** **THE CLAUSE, IN FOUR PARTS:**
- **(a) THE SCOPE, AMENDED: AN ENTRY `E` IS IN SCOPE IFF BOTH HOLD —** **(i) THE SPATIAL TEST OF ITEM 1 IS SATISFIED** (`op.address` is a prefix of `E.address`, itself or a descendant, at ANY tier; `DD-21`), **AND** **(ii) THE TEMPORAL TEST: `E.seq` ≥ THE NAMED OP'S OWN `seq`** — **so AN ENTRY AT OR AFTER THE NAMED OP, WITHIN ITS SUBTREE, AND NOTHING OLDER.** **THE FLOOR'S SOURCE IS CHOSEN AND IT IS *THE NAMED OP'S OWN `seq`*, NOT A CALLER-SUPPLIED ONE, for three reasons that are the corpus's own:** **(1) THE CONSUMER'S CLAUSE READS EXACTLY THIS WAY** — `composition-and-states.md §2.6` item 8 (i) reads *"a subsequent write that violates and cannot be repaired is rolled back to that last valid state: the checkpoint op stands, only the ops after it are undone, and the ops before it — and the checkpoint op itself — are never undone, whether or not the attempt created them"* — **and *"only the ops after it"* is a floor expressed at the named op, which is the op the kernel passes to the verb;** **(2) THE ONLY CURRENT CALLER COULD NOT EXPRESS A FLOOR IT HAD TO SUPPLY:** the kernel's internal call is spelled `rollback(store, opId)` — `docs/specs/storeroom-constraints/kernel-surface.md §1` item 5 — **with the instance and the op id in its two positions and NO THIRD ARGUMENT, so a caller-supplied `seq` would have fixed nothing the ruling exists to fix until a second parameter and a second store-surface signature were both authorised, which no ruling names;** **(3) THE CHECKPOINT'S BEING AN OP ID AND NOT A `seq` IS THE ARGUMENT FOR THIS READING AND NOT AGAINST IT:** the kernel names its stop by an `opId` because an op id is what the journal hands back (`§6.2` property 3) — **and the `seq` the floor needs is the `seq` of THAT OP, read off the same entry, so the op-id spelling carries the floor without loss and without a second parameter; the kernel's own stop is likewise expressed at ops, by NEVER ISSUING A CALL OVER AN OP AT OR BEFORE THE CHECKPOINT.** **A CALLER-SUPPLIED FLOOR IS PRICED AND REFUSED:** it would change `§6.3`'s one-verb surface and every store-surface signature that crosses it, and it buys no state the op-id floor cannot reach; **reversal point: a fresh ruling recorded as an ACTIVE `docs/decisions.md` row.**
- **(b) THE SELF-INCLUSION IS STATED IN THE COMPARISON: `≥`, NOT `>`,** — **because the named op itself must be reversed or nothing is: the rollback exists to undo the named op and the ops after it.** **AN ENTRY WITH `E.seq` GREATER THAN THE NEWEST ENTRY'S IS impossible while the journal is the session's own (`§6.1` item 3) and `seq` is monotonic on append; the stated comparison is `≥` regardless, so the clause does not depend on that fact.**

**AND THE OVERRIDE IS NAMED, SO (a) (ii) IS NOT READ AGAINST ITEM 2: (a) (ii) GOVERNS WHICH ENTRIES ARE IN SCOPE AND NOTHING ELSE.** **`M-6`'s FLOOR IS NOT WEAKENED, NARROWED OR RE-ORDERED BY IT: where the scope (a) contains at least one `compacted` entry the rollback STILL fails `RollbackCompacted` and undoes NOTHING (item 2, unchanged), and where it contains none the rollback reverses every entry (a) put in scope (item 4's `M-8`, unchanged).** **⟶ `RCA-8(g)`: NO BYTE OF ITEM 2 ABOVE MOVES; its `compacted` entry is the ALL-OR-NOTHING predicate and this clause's floor is TEMPORAL.**

**⟶ READ WITH `M-7`'s OWN AMENDMENT, DATED THE SAME DAY AND CARRIED AT ITEM 3 BELOW: THE WALK'S DIRECTION IS UNMOVED AND ITS STOP MOVES.** **⟶ AND THE OBSERVABLE THIS AMENDMENT EXISTS TO GIVE, STATED AS THIS CLAUSE'S OWN AND DRIVABLE FROM THIS CLAUSE ALONE:** **A ROLLBACK OVER AN OP THAT AN ATTEMPT CREATED LEAVES EVERY VALUE WRITTEN AT THE SAME ADDRESS (OR ANYWHERE UNDER IT) BY AN OP WHOSE `seq` IS LESS THAN THAT OP'S `seq` STANDING — SO A PRE-EXISTING VALUE AT THE ROLLED-BACK OP'S OWN ADDRESS SURVIVES THE ROLLBACK THAT REVERSES THAT OP, and the caller finds it where it stood.** **A drive that seeds a value, arms a constraint whose body passes, writes a violating value and observes the rollback has found the property when the seed still reads.** **A drive that finds the seed reversed, or the address absent, has found a failure of THIS clause** (`[T: the temporal floor on `M-5`'s scope, its source chosen from the consumer's own clause and the only caller's call shape, and the overshoot property stated as the clause's own observable | CONTRACT]`; the ruling's citation and the corpus it is read against: `docs/specs/storeroom-native/contract.md §6.4` item 1 (`M-5`), `§6.2` (`JournalOp`'s `seq`), `§6.3` (the one verb), `seams-and-lifecycle.md §8.1` #11 (`RollbackCompacted`); `docs/specs/storeroom-constraints/composition-and-states.md §2.6` item 8 (i) and (iii); `docs/specs/storeroom-constraints/kernel-surface.md §1` item 5's call shape).
**⟶ 1A. THE OBSERVABLE `M-5`'s AMENDMENT IS DRIVEN AT, AND THE WINDOW IT HOLDS ON** — **DECLARED BECAUSE A PLAIN `read` CANNOT CARRY THE PROPERTY ON THE WINDOW WHERE IT MATTERS, AND A CLAUSE WHOSE OBSERVABLE IS UNREADABLE ON ITS OWN FAILING WINDOW IS NOT A CLAUSE A DRIVE CAN ENFORCE** (**⟶ ADDED 2026-10-16, at the same amendment as item 1's temporal floor, on the same two rulings, both verbatim: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."*; `RCA-8(g)`: this clause is a PURE INSERTION and every byte of items 1–8 above and below stands unmoved and is read THROUGH it — no whole-file rewrite, no `replace_all`, `DEF-2026-10-02`). **THE DEFECT IT CLOSES, AND IT IS THE READING PASS'S OWN FINDING REPORTED AT THE CLAUSE RATHER THAN PATCHED:** **the observable item 1's amendment prints — *"A drive … has found the property when the seed still reads"* — was written for a store on which *"the seed still reads"* and *"the seed was reversed"* answer DIFFERENTLY.** **ON EVERY WINDOW WHERE THE ROLLED-BACK CANDIDATE SET ALSO MEETS THE COMPACTED FLOOR THAT IS FALSE, AND THE ROLLBACK IS NOT EVEN RUN:****the un-compacted entries that an appraisal of the seed's own address would map are COMPRESSED INTO THE BASE STATE at their own append (`§6.1` item 5) — the base state being, in that item's words, *"a SNAPSHOT of the store's own observable state at the moment of compression … the value every reachable address read at that moment"* — so the store's own answer at the seed's address IS THE SEED'S VALUE, RESTORED BY COMPRESSION RATHER THAN BY ANY REVERSAL; and where a temporally in-scope entry of the candidate set is compacted, `M-6` (item 2) refuses the rollback and **UNDOES NOTHING**. THE OUTCOME IS THEREFORE THE SAME ON BOTH ARMS OF THE INSTRUMENTED QUESTION — the seed reads its own value whether the store honoured the temporal floor or overshot, **because on neither arm did the walk reach the seed's entry** — AND A PLAIN `read` AT THE SEED'S ADDRESS DISCRIMINATES NOTHING THERE.** **⟶ THE OBSERVABLE A DRIVE READS ON THAT WINDOW IS A COMBINATION OF TWO, AND THE COMBINATION IS THE READING RULE THIS CLAUSE FIXES:** **(A1) `RollbackResult.undoneOps` (`§6.3`) CONTAINS NO `opId` WHOSE ENTRY LIES AT OR UNDER THE ROLLED-BACK OP'S ADDRESS WITH `seq` LESS THAN THE NAMED OP'S** — this is the overshoot read AT THE STORE'S OWN PERFORMED SET, and it is the FIRST member every drive reads on EVERY window, floor-met or not; **AND (A2) WHERE THE CALLS RETURNED AND AT LEAST ONE UNDID AN ENTRY AT OR UNDER THE SEED'S ADDRESS, THE SEED'S OWN `opId` IS ABSENT FROM THE UNION OF THE RETURNED `undoneOps` MEMBERS** — read as a MEMBERSHIP test over an id the drive already holds from its own seeding write's returned `JournalOp.opId` (`§6.2` property 3), **never as an absence inferred from a value**. **WHERE (A2)'s precondition does not hold — the floor was met and nothing at the seed's address was undone — the absence is DECLARED BY THE CLAUSE'S OWN SCOPE rather than observed, and the drive's reading rests on (A1) alone, which is decidable on that window because `undoneOps` is printed whether the call returned or threw.**
- **WHY EACH OF THE OTHER CANDIDATES CANNOT CARRY IT, NAMED SO THE CHOICE IS A DERIVATION AND NOT A PREFERENCE:**
  - **A PLAIN `read` AT THE SEED'S ADDRESS — REFUSED. THIS IS THE READING PASS'S OWN FINDING AND THIS CLAUSE ADOPTS IT:** **it cannot discriminate on the floor-meeting window, for the reason stated above, and a property whose only observable agrees with its own negation is not pinned.** **IT IS RETAINED, BUT AS (A2)'s EVIDENCE ON A DIFFERENT WINDOW AND NOT AS THE PROPERTY'S OBSERVABLE:** on a window where the temporal floor is the ONLY floor in play — a candidate set of un-compacted entries only, the window `NG-12` and `E2E-C-2` drive — the seed's own value still reading IS a consequence of the floor and is read there as a SUPPORTING observation; **it is never the discriminating one.**
  - **`restoredTo` — PARTIALLY DECIDABLE AND THEREFORE NOT SUFFICIENT ALONE, AND ITS FRESH-ADDRESS ARM IS DECIDED AT ITEM 1A (B) BELOW.** **`restoredTo` reports *"the state the addressed subtree NOW STANDS AT"* (`§6.3`; item 3 (ii)) — i.e. THE STORE'S OWN ANSWER AT THE ADDRESS — so it is exactly the plain `read` in a different envelope and inherits its blindness on the critical window.** **What `restoredTo` CAN carry is the sub-state item 3 (ii) already owns: an address left ABSENT where an out-of-scope operation had taken its parent chain away.** **It carries no overshoot fact that (A1)/(A2) do not carry, so it is cited as (A2)'s envelope and never as the property's test.**
  - **THE STORE'S OWN ANSWER AT THE ADDRESS — REFUSED for the same reason as the plain `read`, which is that answer's own verb; and it is not a separate observable at all: it IS `read`, and `restoredTo` is its record.**
  - **A REQUEST FOR THE JOURNAL'S CONTENTS — REFUSED as UNAVAILABLE, not as unsuitable:** **the journal is *"not readable, enumerable, addressable or deletable by any other call"* than `rollback` itself (`§6.3`'s `[T | NEGATIVE]` clause), and `rollback` answers only the three members of `§6.3`.** **So the only journal-side fact any drive can read is the performed set in `undoneOps` and the arithmetic over ids the drive itself obtained from the write returns — which is exactly (A1)+(A2).** **A drive that reached for anything else would be reading an observable this contract does not declare.**
- **(B) `restoredTo` ON A FRESH-ADDRESS WINDOW — PICKED, AND BY A CLAUSE THAT ALREADY DECIDES IT, SO NO QUESTION IS PUT TO THE ARCHITECT.** **THE WINDOW: a SUCCESSFUL rollback of an op that created a value at an address that held NOTHING before that op — so the reversal installs nothing there.** **THE VALUE IS `{ present: false }` (`BaseState.present: false`, the `value` member carrying no standing reading, exactly as the store's own `BaseState` reports an absent pre-state at `§6.2`).** **THE CLAUSE THAT DECIDES IT IS ITEM 3 (ii) AND NOT A NEW RULE: `restoredTo` REPORTS *"THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE ROLLBACK — PRESENT OR ABSENT, NEVER AN UNDONE ENTRY'S PRE-STATE"*, and `§6.3`'s member comment reads the same word — *"the state the addressed subtree NOW STANDS AT"*.** **On this window the reversed op's own `before` half would say `{ present: false }` too, so the two readings coincide HERE and the clause needs no exception; what the fresh-address window tests is the opposite of item 3 (ii)'s parent-chain example and reaches the same member by the same words.** **AND THE CROSS-CHECK IS THE CORPUS'S OWN RATHER THAN THIS CLAUSE'S: `tests/watched_addresses.rs`'s sibling cell `s6_3_restored_to_is_the_state_the_addressed_subtree_now_stands_at` and the JS unit's `JSG-11.15` both read **`{present: false}`** on this window (`docs/specs/storeroom-js-greens.md` `JSG-11.15`), and the live battery printed `"restoredTo":{"present":false}` on a returned call over a fresh address (`docs/specs/storeroom-constraints/live-greens.md` `[E2E-C-9.1]`).** **SO THE CORPUS DECIDES IT AND THIS CLAUSE RECORDS THE DECISION RATHER THAN MINTING ONE: a drive asserting `restoredTo.present === true` on a fresh-address success has read a member the clause refuses, and a drive asserting `AddressNotFound` from `read` afterwards is reading `read` and not this member.**
- **⚠ AND THE CLAUSE'S OWN REACH, STATED HONESTLY AT THE CLAUSE: THE OVERSHOOT PROPERTY HOLDS ON EVERY WINDOW, AND ONLY ONE OF ITS TWO OBSERVABLES HOLDS ON EVERY WINDOW.** **THE PROPERTY — *"no entry whose `seq` is less than the named op's is reversed by a rollback over it"* — IS A UNIVERSAL: it is exactly item 1's amendment (a) (ii), it admits no exception, and (A1) reads it on EVERY window including the floor-meeting one.** **WHAT IS NOT UNIVERSAL IS THE SEED-STILL-READS OBSERVATION THAT ITEM 1's AMENDMENT PRINTED: it is TRUE on every window but it is DISCRIMINATING only where the compacted floor is not met, because where that floor is met `M-6` (item 2) refuses the rollback and undoes nothing, and the seed reads for a reason that has nothing to do with the temporal floor.** **SO THE DECLARATION THAT MUST NOT BE IMPLIED: *"the seed still reads"* IS NEVER SUFFICIENT EVIDENCE ON A FLOOR-MEETING WINDOW, and a drive that reads it there and concludes the floor works has verified the compression, not the scope.** **The failing arm is likewise window-qualified and is NOT: a returned `undoneOps` naming an entry older than the named op is a defect on EVERY window, floor met or not, because a refused rollback undoes nothing and so cannot name anything** (`[T: the property's observable on the floor-meeting window, its combination rule, why each other candidate cannot carry it, the fresh-address `restoredTo`, and the property's reach declared rather than implied | CONTRACT]`; `docs/specs/storeroom-native/write-and-read.md §6.1` item 5, `§6.2` properties 1 and 3, `§6.3`, `§6.4` items 1–3; `docs/specs/storeroom-js-greens.md` `JSG-11.15`; `docs/specs/storeroom-constraints/live-greens.md` `[E2E-C-9.1]`; `docs/specs/storeroom-constraints/composition-and-states.md §2.6` item 8 (iii); **the rulings, verbatim and dated `2026-10-16`: *"Add temporal stop to the rollback."* AND *"Overshoot is a defect."***).

2. **`M-6` — THE FLOOR:** **an entry old enough to be COMPACTED (marked `compacted`, `§6.1` item 5) may NOT
   be undone** (`P: §15 · A35`: *"If it is old enough to be compacted it's out of scope"*). **A rollback
   whose candidate set (item 1) includes AT LEAST ONE COMPACTED ENTRY FAILS `RollbackCompacted` AND UNDOES
   NOTHING — the floor is ALL-OR-NOTHING and never partial** (`DD-16`, `§8.1` #11).
   (`[T: the failure arm's all-or-nothing form | CONTRACT]`; the alternative — undoing the un-compacted part
   and reporting the rest — is priced: an all-or-nothing floor makes `A35`'s *"out of scope"* a closed
   predicate and keeps `P-TP-9`'s closure drive single-valued; reversal point: a bounded amendment.)
**⟶ AND THE TWO FLOORS, DATED 2026-10-16 WITH `M-5`'s AMENDMENT ABOVE — THEY ARE DIFFERENT FLOORS AND NEITHER IS READ AS THE OTHER** (`RCA-8(d)` ANNOTATE-BESIDE: **item 2 above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause re-decides no term of it, mints no member and moves no fail code**). **THEY ARE DISTINGUISHED, ONE ROW EACH:**
- **THE TEMPORAL FLOOR (`M-5` item 1's amendment (a) (ii)) IS A SCOPE BOUND IN `seq` TERMS: it decides WHICH ENTRIES ARE IN SCOPE — `E.seq` ≥ the named op's `seq` — and it is decided BEFORE any entry is examined for the compacted mark.**
- **THE COMPACTED FLOOR (`M-6`, item 2) IS AN ALL-OR-NOTHING PREDICATE OVER THE SCOPE THE TEMPORAL FLOOR ALREADY FIXED: it decides WHETHER THE ROLLBACK MAY PROCEED at all.**
**AND WHERE BOTH APPLY, THE ORDER IS DECLARED AND IT IS THIS ONE: THE TEMPORAL FLOOR BOUNDS THE CANDIDATE SET FIRST, AND THE COMPACTED PREDICATE IS THEN EVALUATED OVER THAT BOUNDED SET.** **CONSEQUENCE, STATED SO NEITHER FLOOR IS READ WIDE: an entry OLDER than the named op that carries `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE — it is outside the candidate set by the temporal bound, so `M-6` never examines it and the rollback over that op does NOT answer `RollbackCompacted` because of it.** **AND THE COMPACTED FLOOR IS NOT NARROWED THEREBY, WHICH IS THE HALF THAT MUST NOT BE LOST: a candidate set that is TEMPORALLY IN SCOPE and contains a compacted entry STILL FAILS `RollbackCompacted` AND UNDOES NOTHING** — **so the amended reach and the all-or-nothing predicate keep their joint single value, and `§8.1` #11's triggering state is read as *"a rollback whose TEMPORALLY BOUNDED candidate set includes at least one `compacted` entry"* (`seams-and-lifecycle.md §8.1` #11, whose rank, code and generated message are UNMOVED: `RollbackCompacted`, its text *"is out of scope because it is compacted"* reading the same state, now over a bounded set).** **THE ALTERNATIVE — reading the compacted floor over the UNBOUNDED subtree so that an old compacted entry still fails a rollback its temporal floor would otherwise permit — is PRICED AND REFUSED: it would restore exactly the loss this amendment exists to prevent, an entry written long before the named op refusing the reversal of that op; reversal point: a fresh ruling.** **AND THE SET'S SIZE IS UNMOVED AT `16` MEMBERS WITH ITS ALGEBRA `11 + 2 + 1 + 1 + 1 = 16` ✓: NO FAIL CODE IS MINTED, RANKED, RE-RANKED OR RETIRED BY THIS AMENDMENT, AND `#11`'s narrow, `#10`'s (`JournalOpUnknown`) and every other member's trigger stand as printed** (`[T: the two floors' distinction, their order and the compacted floor's unchanged strength, so `M-5`'s amendment is not read as lifting `M-6` | CONTRACT]`).
3. **`M-7` — IDENTITY, DIRECTION AND DEPTH:** **a rollback is BY OP ID** (`P: §15 · A37`: *"be id'ed for
   rollback"*), **and it walks BACKWARD** — *"rolled back by walking back through journal changes"*
   (`P: §8`) — **one entry at a time, from the newest in scope to the oldest in scope** (`[T | CONTRACT]`).
   **⟶ AMENDED 2026-10-16 (`M-7`'s DIRECTION AND ITS STOP) — THE DIRECTION IS UNMOVED AND THE STOP MOVES TO THE FLOOR, AND EVERY BYTE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE** (`RCA-8(d)` ANNOTATE-BESIDE; **this clause amends the DIRECTION SENTENCE's stop term and re-decides nothing of the identity half, nothing of the depth clause's two answer clauses (i)/(ii) below, and nothing of item 1 or item 2**; the architect's ruling *"Add temporal stop to the rollback."*; item 1's amendment (a) (ii)). **THE AMENDED DIRECTION, IN ONE SENTENCE: a rollback walks BACKWARD — one entry at a time — FROM THE NEWEST ENTRY IN SCOPE DOWN TO THE NAMED OP, AND IT STOPS AT THE NAMED OP, WHICH IS THE OLDEST ENTRY IT MAY REVERSE.** **So the walk's STOP is the temporal floor item 1's amendment fixes, and *"the oldest in scope"* now names THE NAMED OP — the entry whose `seq` is the floor — rather than the oldest entry of the addressed subtree.** **THE UNREVERSED SET IS THEREFORE NAMED: every entry of the addressed subtree whose `seq` is LESS than the named op's is IN NO WALK AND IS REVERSED BY NO ROLLBACK OVER THAT OP** — **it is not merely left unreached by a walk that ran out of entries: it is out of scope by item 1's amendment (a) (ii), so no rollback over the named op can ever touch it, and the state *"an entry older than the named op was reversed by a rollback over it"* is FORBIDDEN BY CLAUSE and is a defect where a drive finds it.** **AND THE WALK STILL NEVER RUNS FORWARD, STILL REVERSES ONE ENTRY AT A TIME, AND STILL ENDS WHEN THE FLOOR IS REACHED RATHER THAN BY EXHAUSTING A LIST** (`[T: the direction's stop, moved to the temporal floor so `M-5`'s amended scope and `M-7`'s walk state one boundary | CONTRACT]`).
   **AND THE ONE STATE AN IN-SCOPE ENTRY'S OWN ADDRESS CAN BE IN WHILE AN OUT-OF-SCOPE OPERATION HAS TAKEN
   ITS PARENT CHAIN AWAY — WHAT `undoneOps` MAY CONTAIN AND WHAT `restoredTo` MUST THEN REPORT** (`[T: the
   state's declared outcome, stated at this contract's third bounded amendment — the gate-4 adversarial
   pass's `H-6`/`S-3` found `undoneOps` claiming an undo the store did not reflect | CONTRACT]`): **the
   scope test of `M-5` is a PREFIX test over ADDRESSES and cannot reach upward, so an entry `E` whose address
   lies under the rolled-back address IS in scope even when an OUT-OF-SCOPE operation (an operation whose own
   address is not under the rolled-back address) has removed the parent chain that `E`'s address walks
   through — and `M-5` and `M-8` together require a stated answer for it. THE ANSWER, IN TWO CLAUSES:**
   - **(i) `undoneOps` CONTAINS ONLY THE opIds WHOSE REVERSAL THE STORE ACTUALLY PERFORMED.** **An in-scope
     entry that CANNOT be reversed because its parent chain is gone is NOT reported as undone: it is
     MARKED `compacted: true` (the only mark `§6.2`'s closed record carries, `M-9`), so it is OUT of the
     candidate set of every later walk and undoes nothing further — and IT IS ABSENT FROM `undoneOps`.** **So
     `undoneOps` is a report of PERFORMED reversals and never a report of in-scope entries** (`§6.3`'s
     member rule: *"the opIds the rollback undid"*).
   - **(ii) `restoredTo` REPORTS THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE ROLLBACK —
     PRESENT OR ABSENT, NEVER AN UNDONE ENTRY'S PRE-STATE.** **Where the parent chain a reversing entry
     needed is gone, the reversal installs NOTHING at that address, and `restoredTo` therefore reports the
     address's ACTUAL state — `present: false` where nothing stands there** — **so `§6.2` property 1's
     *"`reconstruct(op.before)` yields the ORIGINAL tree for the operation's reach"* is read over the
     operations the rollback REVERSED, and never as a promise about an address whose chain an out-of-scope
     operation removed** (`§6.3`; `DD-20`; `DD-21`). **`M-10` is thereby preserved rather than narrowed: the
     rollback is still ATOMIC — it either reverses what it reports or it fails — and a reversal it cannot
     perform is REPORTED as unperformed by both members.**
4. **`M-8` — A ROLLBACK IS TOTAL OVER ITS SCOPE:** **no partial or subset rollback is available and none is
   declared** (`DD-20`).
5. **`M-9` — THE RESIDUE:** **a rollback ITSELF appends NO journal entry** — the journal records store
   changes (`write`/`delete`), and a rollback is not one of the two tracked verbs
   (`[P: §9 · A5 read at its own words; T | DECLARED-DEFAULT]`); **the alternative — a rollback that
   journals** is priced: it would make a rollback itself undoable, which no ruling names, and would let a
   walk-back reach a rollback entry, which `A35`'s *"operation touching the same subtree"* does not
   contemplate; **reversal point: a fresh ruling.** **THE UNDONE ENTRIES' MARK, STATED IN THE CLOSED SHAPE'S
   OWN TERMS:** **an undone entry is marked `compacted: true` — the ONLY mark `§6.2`'s closed record and
   `DD-22` carry — and it is thereby OUT OF ANY LATER WALK'S CANDIDATE SET (item 1) AND UNDOABLE BY NO
   LATER ROLLBACK, whose attempt fails `RollbackCompacted` (item 2).** **`compacted` is read as ONE
   predicate with TWO sufficient grounds: *"compressed into the base state"* (`§6.1` item 5) and *"undone by
   a rollback"*** — **and the two grounds are DISTINGUISHED by no member of `§6.2`'s record, because the
   record carries none to distinguish them with** (`[T: the mark's closure, at this contract's second
   bounded amendment — the red set's `F-7` exposed that the first amendment's cell named an `undone` member
   `§6.2`'s closed shape does NOT carry, and that reading `compacted` as compression-only would make an
   undone entry distinguishable from a compressed one, which the closed shape forbids | CONTRACT]`).
   **AND THE OBSERVABLE CONSEQUENCE, EACH DRIVABLE:** **(i)** the entry remains reachable BY ITS `opId` and
   by nothing else (it is still the journal's entry); **(ii)** `rollback` over it fails `RollbackCompacted`;
   **(iii)** no read, no `findAddress` and no address reaches it (`§6.3`'s closure); **(iv)** the next
   write's `seq` continues as though the rollback had not happened.
6. **`M-10` — A ROLLBACK IS ATOMIC:** **if it fails, the store is unchanged.**
7. **`M-11` — AN UNKNOWN OP ID FAILS `JournalOpUnknown`.**
8. **AND THE `file` TIER'S OWN AUTOMATIC ROLLBACK, WHICH IS NOT `rollback`:** **on a `file`-tier write
   failure, the FILE tier ROLLS BACK THE CHANGE IN THE JOURNAL AUTOMATICALLY, and THEN passes the failure
   back to the caller** (`P: §11 · A16`: *"File rolls back change in journal automatically on failure, then
   passes failure back to caller"*). **This automatic rollback is the store's own act, requires no caller
   instruction, precedes any caller's `A7` instruction, and is `DD-2`'s atomicity read with this clause.**
   **It also appends NO entry and journals nothing** (`[T: read with `A16`'s *"then passes failure back"* |
   DECLARED-DEFAULT]`; the alternative — the automatic rollback journaling its own reversal — is priced:
   it would double-count one failure as two store changes; **reversal point: a fresh ruling**).
`[P: §8, §9 · A5 · A7, §11 · A16, §15 · A35 · A37 | CONTRACT + three DECLARED-DEFAULT sub-clauses]`

### §6.5 The watched-address list — registration, the selection rule, and the park's boundary

**`watch(address, tier?) → WatchHandle`** and **`unwatch(handle) → void`**.

1. **THE STORE TRACKS LISTENER REGISTRATIONS AND RETURNS THE WATCHED-ADDRESS LIST** — this store-side duty
   **SURVIVES**, narrowed by the architect's deferral (`R: §17.1`; `P: §9 · A7`; `P: §16 · A38`:
   *"Defer listener implementation"* defers the **listener**, not the store's production of the address set
   the listener would be called for).
2. **`watch(address, tier?)` registers the caller's watched address** — **keyed by the ADDRESS it watches**,
   returning an **opaque `WatchHandle`** (`DD-23`). **Registering the same address twice is idempotent at
   the address level: the returned list carries DISTINCT addresses** (`[T | DECLARED-DEFAULT]`).
3. **THE SELECTION RULE, RULED AND FIXED:** **a watched address `W` is returned after a successful write at
   address `X` iff `W` is a PREFIX of `X`** — i.e. the write **resolves to `W` or passes through `W`**
   (`P: §14 · A33`: *"Alerts if a write resolves to or through the matched address"*), **and `A33`'s
   *"through"* is DESCENDANT-INCLUSIVE FROM THE WATCHED ADDRESS DOWNWARD** (`P: §15 · A37`: *"Listener fires
   if the address or any of its descendants is resolved on write"*; `R: §16.1`'s `A37` cell). **`DD-18`.**
4. **THE LIST IS RETURNED ON A SUCCESSFUL WRITE ONLY** — `WriteResult.watched` (`§3.6`). **A failed write
   returns nothing.**
5. **NO ORDER IS DECLARED FOR THE LIST** — the order is `P-3`'s (`DD-23`).
6. **`unwatch(handle)` removes one registration; unwatching an unknown handle is a no-op success**
   (`[T | DECLARED-DEFAULT]`).
7. **THE TIER-QUALIFIED REGISTRATION'S EFFECT ON THE RETURNED LIST, STATED AS A CLAUSE — the effect the
   tier column of `§3.1.1`'s `watch` row requires and that `DD-24` does not carry** (`[T: the clause,
   authored at this contract's second bounded amendment; it is `A33`/`A37`'s alert set read with the store's
   own duty to RETURN that set, and `A38`/`P-3` defer only the LISTENER's own behaviour | CONTRACT]`):
   **a registration made WITH a tier argument is TIER-QUALIFIED, and it is returned after a successful
   write at `X` iff BOTH of the following hold:**
   - **(i) the prefix test of item 3:** `W` is a prefix of `X` (descendant-inclusive, `DD-18`); **and**
   - **(ii) the tier test:** **the write's tier is ONE of the registration's tier arguments** — i.e. the
     write landed at a tier the registration names.
   **An UNQUALIFIED registration (`tier` absent, or an array of `0` tokens — `§3.1.1`'s `watch` row) has
   NO tier test and is returned on the prefix test alone, exactly as item 3 states.**
   **CONSEQUENCES, EACH DRIVABLE:** **(a)** a tier-qualified registration is **not** returned after a write
   at a tier it does not name, **even though the prefix test holds** — the returned set is a subset of the
   unqualified set, never a superset; **(b)** registering the same ADDRESS at two different tiers is
   **idempotent at the address level** exactly as item 2 states — **the returned list still carries the
   address ONCE**, because the list's members are ADDRESSES (item 2) and a member is returned iff ANY of
   its registrations qualifies; **(c)** a registration's tier never changes the PREFIX test and never adds
   an address the prefix test excludes.
   **AND THE BOUNDARY IS UNMOVED:** **which listener is called, in what order, and with what body remains
   `P-3`'s** (`DD-23`; `A38`) — **this clause is about the store's own PRODUCTION AND RETURN of the address
   list and nothing else.**

**THE PARK'S BOUNDARY, IN ONE LINE, EACH WAY.** **`P-1` — THE JS INTEGRATION SET: the store builds the
store; the realm, the builder/ABI path, the packaging, the host handoff, the crossing of every value the
store produces into JS, the load path and the module-supplied functions' crossing are DEFERRED and are NOT
specified by this contract** (`docs/pending.md` `P-1`; `P: §10 · A8`; `R: §17.4` condition 2).
**`P-3` — THE LISTENER IMPLEMENTATION: the store TRACKS listener registrations and RETURNS the
watched-address list; the LISTENER'S ORDER, its ATTACHMENT RULE (by address or by identity), its FIRING, the
CALLBACK INVOCATION, the JS-facing listener surface and a THROWING listener body's disposition are NOT
specified by this contract** (`docs/pending.md` `P-3`; `P: §16 · A38`; `R: §17.1`).
**BOTH PARKS ARE `OPEN`, NEVER GREEN, OWNER THE ARCHITECT, POSITIVE REVISIT CONDITION *THE STORE PASSES ITS
OWN TEST SUITE*, and no listener or integration question is put while either stands; a park read as a
closure is a finding and a pass that lifts a park fails** (`R: §17.1`, `R: §17.4` condition 3;
`[R: §17.1 · §17.4 | NEGATIVE]`).
`[P: §9 · A7, §14 · A33, §15 · A37, §16 · A38 | CONTRACT]`

---

**⟶ SUPERSEDED 2026-10-11 — THE `watch`/`unwatch` SURFACE IS A STOPGAP AND THE LISTENER SURFACE REPLACES
IT; EVERY CLAUSE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE AND THE SIX ITEMS BESIDE IT**
(`A58` + `A57` + `A43` + `A45`–`A48` + `A56`; `RCA-8(d)` ANNOTATE-BESIDE; **the pointer:
`docs/specs/storeroom-listeners-proposal.md §20`**). **THE ARCHITECT'S OWN WORDS, VERBATIM:** ***"Watch is a
stopgap for the listener implementation"*** (`A58`). **WHAT THAT MAKES OF THE AS-FILED SECTION ABOVE, IN
FOUR CLAUSES AND NOTHING ELSE:**
1. **THE VERBS ARE SUPERSEDED, NOT DELETED.** **`watch(address, tier?) → WatchHandle` and
   `unwatch(handle) → void` are the STOPGAP'S verbs.** **The listener surface's verbs are
   `listen(address) → ListenerHandle` and `unlisten(handle) → void`, and their spelling is `contract.md
   §0.4`'s** (the spelling table's two added rows). **The as-filed verbs' clauses — items 1–7 above, with
   their citations, their selection rule and their tier qualifier — STAY VISIBLE as the historical
   record of what the stopgap did, and NO SHIPPED ROW IS DELETED.** **`AR-7`'s *"a destroy returns no
   listener-shaped value"* is answered by `DD-35`'s added member and not by reading the park as a
   closure.**
2. **NO DEPRECATION WINDOW: THE REPLACEMENT LANDS IN ONE PASS.** **BOTH SURFACES DO NOT STAND BRIEFLY.**
   **This is a DECLARED DEFAULT, priced and reversible** (`DD-35`'s neighbourhood carries the member's
   own alternative; the window itself is fixed by this amendment's plan region `§8.1` row `A1`, whose
   edit scope is ONE pass). **The alternative — a deprecation window in which `watch` and `listen` both
   stand — is priced: it would leave TWO registration homes live at once, which is exactly the
   *"second home for one registration state"* the gate refused (`A45`/`A48`), and it would make the
   returned lists' union an undeclared rule; it is available only with `A45` re-read.**
3. **`WatchHandle` IS THE STOPGAP'S OWN HANDLE, AND THE LISTENER'S HANDLE IS THE ONE HANDLE.** **`A57`'s
   handle is the ONE handle; `A58`'s stopgap reading answers the *"one handle or two"* question the
   proposal's `§18` flagged: the shipped `WatchHandle` was the stopgap's own handle and the listener's
   takes its place** (`DD-32`'s neighbourhood; `parameter-semantics.md §2.13`). **The type's own record
   is stated at item 12 below, and its shipped spelling stands at `contract.md §0.4`.**
4. **THE STOPGAP'S OWN STOP-GRADE CELLS: THE REGISTER ROW AND THE RED-SET FILE ARE RE-DERIVED, NOT
   DROPPED.** **`contract.md §5.8`'s `P-TP-8` row is RE-DERIVED to the listener's property** (the
   re-derivation is stated at `§5.8` and printed with its terms at `§5.9`), **and the shipped red-set
   file `tests/watched_addresses.rs` (`13` drives, green) is RE-DERIVED BY ITS AUTHOR ROLE
   (`role_test_writer`) against these clauses** — **this contract states the clauses and drives no
   test: no `tests/**` byte is written by this pass. THE SHIPPED `196`-TEST FIGURE IS THEREFORE A FIGURE
   OF THE PRE-AMENDMENT TREE, and the moved figure owes a dated re-measure with its layer (the class
   `DEF-5`/`DEF-7`/`DEF-10` keep recurring as; `AR-14`).** **⟶ RECONCILED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; EVERY SENTENCE ABOVE STANDS BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE STATEMENT OF THE MOVED FIGURE)** (`RCA-8(d)` ANNOTATE-BESIDE): **THE AS-FILED TEXT READ:** *"THE SHIPPED `196`-TEST FIGURE IS THEREFORE A FIGURE OF THE PRE-AMENDMENT TREE, and the moved figure owes a dated re-measure with its layer".* **THE RE-MEASURE HAS BEEN TAKEN AND IS THE FIGURE THIS DIRECTORY'S RECORDS NOW PRINT: `cargo test --offline --no-fail-fast` EXITS `0` — `218` test functions · `218` executed · `218` PASS · `0` FAIL over the AMENDED AND CORRECTED tree, whose register layer executes `11/11` STRATEGY LINES, ALL `HELD`, `318` attempts against the `400` cap (`archive/gate3/storeroom-native-red-set.md` `§16.2`/`§16.3`).** **THE `196` ABOVE IS THE PRE-AMENDMENT TREE'S FIGURE AS THIS PASS FILED IT, and the amendment's own tree stood at `207` tests when the gate-4 adversarial pass found it (`archive/gate4/storeroom-native-amendment-adversarial.md` `§7` item 2); the `218` is the `207` plus the `11` functions the correction pass's negative generators added.** **BOTH EARLIER FIGURES STAND ABOVE BYTE-FOR-BYTE, EACH WITH ITS TREE, AND THIS PASS WRITES NO `tests/**` BYTE** (`[T: the moved figure's landing place, with its terms and its tree | CENSUS]`).**

### The listener amendment's own clauses — the home, the record, the firing model, the borrows and the two lists

**THESE SIX ITEMS ARE `§6.5`'S OWN OPERATIVE CONTENT. EVERY ONE OF THEM CITES A RULING OR A `DD` ROW, AND
NO ONE OF THEM IS A QUESTION PUT TO THE ARCHITECT** (`[T: the items' own statement, taken at this contract's
sixth bounded amendment (the listener amendment) | CONTRACT]`).

**ITEM 8 — THE HOME MAP: ONE AUTHORITATIVE HOME, CONTAINING LISTENERS AND NOTHING ELSE, SEPARATE FROM THE
REGISTER AND THE GRAPH.** **THE ARCHITECT'S OWN WORDS:** ***"It's rust, the top-level listener map is the
home and the nodes borrow. this is used to limit the number of lookups required to check for a listener"***
(`A45`), ***"The home listener map (the one that owns the listener data) only contains listeners, it is
separate from the register and the graph"*** (`A48`). **THE CLAUSE, IN FIVE PARTS:**
- **(a) THE HOME IS THE ONE HOME.** **The store instance owns exactly ONE home map, and it owns the
  LISTENER DATA — registrations keyed by the listener's `address`, each carrying its `handle`.**
  **The node-side lists of item 11 are REFERENCES INTO IT and never a second copy** — **so the shipped
  `§6.5` item 2's *"keyed by the ADDRESS it watches"* survives as the home's key, and the gate's
  *"second home for one registration state"* objection is closed by the ruling's own words.**

**⟶ AFFIRMED 2026-10-11 — ITEM 8 (a)'s CELL STANDS AS WRITTEN, AND IT NOW MATCHES THE STRUCTURE THE STORE
SHIPS, SO A LATER PASS DOES NOT "RECONCILE" A CORRECT CELL** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell above
stands byte-for-byte; not one byte of it is re-spelled, narrowed, excepted or withdrawn, and THIS dated clause
is the affirmation the cell owes rather than a change to it**; `archive/reviews/2026-10-11-structural-compliance.md`
`§3` · `F-9`, whose smallest repair names this cell's *"registrations keyed by the listener's `address`"*
TOGETHER WITH `store-model.md`'s sentence, and its `§6`; `P: §11 · A45`; `store-model.md §2.1`'s dated
re-spelling; `[T: the cell's affirmation, dated, so the two cells read as one declaration | CONTRACT]`).
**THE CELL, RE-EMITTED BECAUSE THIS CLAUSE READS IT AND DOES NOT MOVE IT:** *"(a) THE HOME IS THE ONE HOME. The
store instance owns exactly ONE home map, and it owns the LISTENER DATA — **registrations keyed by the
listener's `address`**, each carrying its `handle`. **The node-side lists of item 11 are REFERENCES INTO IT and
never a second copy** …"*. **AND THAT IS WHAT THE STRUCTURE NOW DOES: the home's primary structure IS an
address-keyed map whose key IS the registration's own `address`, each entry carrying its `handle` — so the cell
is TRUE of the shipped structure and owes no exception, and the sweep's `F-9` and this cell are ONE declaration
rather than a divergence and its repair.**
**AND THE TWO CELLS ARE READ TOGETHER, NAMED SO NEITHER IS READ WITHOUT THE OTHER:** **this item's
*"registrations keyed by the listener's `address`"* and `store-model.md §2.1`'s dated clause**, whose FIRST half
declares the home ADDRESS-KEYED with its own entries reached by their address, and whose SECOND half declares it
NOT a resolver consumer — traversed by NO walk, reached by no segment path and by no `findAddress` (`A48`).
**THE DISTINCTION IS THE WHOLE POINT OF THE PAIR: the KEY is the address a registration binds to, and the
RESOLUTION is no verb's and no walk's, so `store-model.md §2.1`'s consumer set stands unmoved by it** — **and
the drive that carries that second half is `contract.md §5.8`'s `(v)` cell of the `P-TP-8` row, which this
affirmation leaves untouched.**
- **(b) IT CONTAINS LISTENERS AND NOTHING ELSE.** **No graph records, no register keys, no values, no
  node references and no journal entries live in it.** **It is NOT addressable: no segment path reaches
  it, `findAddress` never returns it, and a read at the empty address DOES NOT INCLUDE IT** (`A43`'s
  read half — the whole register as an object of the GRAPH — and `A25`).
- **(c) IT IS A PEER STRUCTURE OUTSIDE THE GRAPH — AND THEREFORE NOT A SIXTH COMPONENT.** **It is not a
  member of any node, link, anchor or register entry, it is not a tier of its own, and it is not
  reachable as part of the graph's read** (`A48`). **`§1.7`'s closure at exactly five — `leaf` · `branch`
  · `anchor` · `link` · `registry` — and `P-IM-3`'s *"no address answers a sixth structure"* therefore
  stand UNWEAKENED**, exactly as the journal already sits beside the graph as a carrier-internal
  collection (`§6.1` item 2).
- **(d) IT IS POPULATED AT CONSTRUCTION, BEFORE THE REGISTRY EXISTS.** **The construction takes a
  `listeners[]` array and POPULATES THE HOME FROM IT BEFORE THE REGISTRY IS GENERATED**
  (`A56`: *"Accept listener array as args, and populate home map before generating registry"*; the
  ordered construction sequence is `seams-and-lifecycle.md §7.1`'s amendment) — **so when the register and
  its carrier node (`store-model.md §1.6` item 4) come into being, the home they borrow from is ALREADY
  POPULATED and the register's carrier node carries the listener references FROM THE OUTSET.**
- **(e) IT IS INSTANCE-SCOPED AND SESSION-SCOPED, AND OUT OF THE `file` BYTES AND OUT OF THE JOURNAL.**
  **A registration is neither a `write` nor a `delete`, so it appends no journal entry** (`§6.1`'s two
  tracked verbs stand) — **and the home is not serialized into `cfg.filePath`, so a fresh
  `storeCreate` over an equal path loads NO registration and the shipped boot's declared answer
  (*"nothing is watched"*, `seams-and-lifecycle.md §7.2` item 6) stands for the listener surface too**
  (`DD-38`, which prices the persistence alternative). **The shipped `P-TP-7` independence clause is
  thereby the row's own: *"no watched registration is shared"* between two instances.**

**ITEM 9 — THE BORROWS: THEIR SPELLING, THEIR LIFETIME, AND THE TWO LISTS.** **THE ARCHITECT'S OWN WORDS:**
***"The borrow is removed on node change actions because they destroy and replace nodes"*** (`A46`), and
***"Two lists to keep active listeners separate from ones that are being passed to children"*** (`A47`).
**THE CLAUSE, IN FOUR PARTS:**
- **(a) A NODE'S BORROWS ARE DROPPED WITH THE NODE.** **The change actions that DESTROY AND REPLACE nodes —
  `§3.4`'s `W-1` purge-then-mint, `W-2`'s re-mint, `W-6`'s purge-then-mint, the delete arms' removals, and
  the boot — remove the node's two listener lists WITH THE NODE THAT HELD THEM, and a newly created node
  takes its lists from its nearest parent node.** **So THE BORROWS' LIFETIME IS THE NODE'S: no borrow
  outlives a change action**, and **the invalidation duty is discharged BY DESTRUCTION rather than by a
  maintenance rule.** **A node created with NO parent's lists — the register's carrier node at `[]` —
  starts from the POPULATED HOME (`A56`) and from nothing else.**
- **(a-bis) THE TWO LISTS ARE CONDITIONAL ON THE PER-NODE INDEX, AND WHERE THE INDEX IS NOT MATERIALIZED A NODE HOLDS NEITHER** (`[T: the conditional materialization of this item's own two lists, stated at this contract's seventh bounded amendment — the gate-4 adversarial pass's `AM-2` found the two lists' clauses and `P-SM-4`'s `(f)` have no state in a node shape that carries neither, and this clause answers it; `A45`; `A47`; `DD-41`; `contract.md §5.8` (d)'s dated clause; `store-model.md §1.1`'s dated clause | DECLARED-DEFAULT]`): **the `active`/`carried` pair is an INDEX FOR LOOKUP COST (`A45`'s own words), and its MATERIALIZATION IS DECLARED OPTIONAL: a store MAY build it on its nodes and a store MAY instead produce the SAME returned handle sets by scanning the ONE home at each trigger — the two are the SAME clause's two spellings, and `contract.md §5.8` (d) licenses the omission in its own words (*"the same two sets must be produced whether the index is consulted or the home is scanned"*).** 
**WHERE THE INDEX IS NOT MATERIALIZED: a node carries NO `active` and NO `carried` list, `DD-32`'s pinned borrow spelling (`Rc<ListenerEntry>`) has no subject, the register's carrier node carries NO list and the sets are produced from the home `seams-and-lifecycle.md §7.1` step 5 populated BEFORE the registry was generated — so the order `A56` rules stays observable through the sets — and `contract.md §5.4`'s `(f)` quantifies over no node, its premise having no instance.** **WHERE THE INDEX IS MATERIALIZED: (a)–(e) above bind it WHOLE, and every item of `(f)`'s failure list is reachable and is a defect.** **IN BOTH SPELLINGS THE FAILABLE HALF IS UNCHANGED: no change action LOSES or DUPLICATES a listener's handle, and the sets the triggers return are consistent with the home.** **ITS `alt`, PRICED, AND ITS REVERSAL POINT — `DD-41`'s, whose alternative (a MANDATORY index, and therefore a host pass that materializes it) is priced there and whose reversal instrument is a bounded amendment of `docs/specs/storeroom-native/` owned by `role_spec_writer`.****
- **(b) THE ACTIVE LIST IS THE FIRE-SET OF THIS NODE'S OWN CHANGE.** **It holds the references of the
  listeners bound EXACTLY at this node's address** — **the set a `write` or a `delete` resolving to this
  address fires for** (`A43`; `A47`). **A `leaf`'s `active` list is NOT empty by construction** (a listener
  may bind at a leaf's own address), **while a `leaf`'s `carried` list IS empty by construction**
  (`store-model.md §1.1`).
- **(c) THE CARRIED LIST IS THE INHERITANCE CHANNEL TO CHILDREN.** **It holds the references a NEWLY
  CREATED CHILD takes as its own lists — so the inheritance is one step from the nearest parent node, and
  the proposal's *"This is recursive"* is exactly that repetition down the tree, with NO up-edge and NO
  maintenance step on creation** (`A47`; the `12`-arm mint table is unmoved — `U10`'s own ground).
- **(d) AN ACTIVE LISTENER IS NOT ALSO CARRIED, AND THE ALTERNATIVE IS PRICED.** **A listener bound AT a
  given address stands in that node's ACTIVE list and NOT in its CARRIED list** — **the two lists are
  disjoint at a node, and a listener reaches a descendant's ACTIVE list through the CARRIED channel and
  never through the ACTIVE list.** **This is THIS CONTRACT'S OWN CHOICE and is declared as `DD-33`'s
  neighbour in the defaults table** (`DD-33` carries the carrier node's shape; **the disjointness rule is
  stated here and its alternative is priced in the `DD` row that carries the two lists' contents**).
  **The alternative — an ACTIVE listener ALSO carried, so that a descendant's own node also carries the
  ancestor's listener — is priced: it would make a listener bound at an ancestor fire TWICE for one write
  (once through its own node's active list and once through the inherited copy) unless a de-duplication
  rule were added, and `A47`'s stated purpose (*"to keep active listeners separate from ones that are
  being passed to children"*) reads the separation as a partition rather than an overlay; available with
  `A47` re-read.**
- **(e) THE TWO LISTS' ENTRIES ARE HANDLE-BEARING REFERENCES, NOT ADDRESSES AND NOT COPIES.** **An entry is
  a reference into the home — the ONE authoritative registration state — so its lifetime, its address and
  its handle are the home's, and a node holds no copy of any of them** (`A45`; `DD-32` prices the spelling).

**ITEM 10 — THE LISTENER RECORD, THE BINDING, AND THE FIRING MODEL.** **THE ARCHITECT'S OWN WORDS:**
***"Listener has an address to determine where it binds and a handle that it returns to alert the client
of the trigger"*** (`A57`); ***"Read returns whole register as object — listeners don't fire on read, they
fire on write/delete"*** (`A43`). **THE CLAUSE:**
- **(a) A LISTENER IS `{ address, handle }` AND NOTHING ELSE.** **The record is CLOSED at those two
  members.** **`address` is a segment list (`§1.5`'s grammar, `PAR-1`'s domain) and determines WHERE THE
  LISTENER BINDS; `handle` is the value the store RETURNS when the listener triggers.**
- **(b) BINDING IS BY ADDRESS.** **The listener follows the ADDRESS and not a node's identity** — *"an
  address to determine where it binds"* — **so a re-mint, a purge, a shadow, a `VEC` renumbering (`DD-30`)
  or a rollback that changes the NODE at an address does not move, drop or redirect the listener: the
  binding is the address's** (`U17`'s DERIVABLE ground, now a clause). **This is the park's subject 2
  ANSWERED on the ruling's own face.**
- **(c) THE TRIGGER EVENTS ARE EXACTLY TWO: `write` AND `delete`. A READ NEVER FIRES.** **No read, no
  `findAddress`, no `rollback`, no boot and no read-driven traversal fires a listener** (`A43`, verbatim:
  *"listeners don't fire on read, they fire on write/delete"*). **The proposal's own *"when the node is
  written or destroyed"* is thereby narrowed to exactly these two events.**
- **(d) THE STORE NEVER INVOKES ANYTHING: IT RETURNS THE HANDLES.** **On a trigger the store RETURNS the
  handles of the triggering listeners, and the CLIENT invokes its own callbacks** (`A57`: *"a handle that
  it returns to alert the client of the trigger"*). **CONSEQUENCES, EACH STATED SO NONE IS DISCOVERED
  LATER:** **(i)** **a THROWING BODY IS NOT A STORE STATE** — if the store never invokes a body, no body
  can throw inside a store operation, so the park's fourth subject has **no subject inside this unit**;
  what the client does with the handle it is returned is the client's. **(ii)** **THE FIRING MODEL DOES
  NOT NEED `P-1`** — *"return the handles of the triggered listeners"* is a pure value crossing the
  store's own function surface, so a Rust caller is served today; **the parked JS crossing is only about
  how a JS client eventually RECEIVES that list, and `P-1` stands untouched.** **(iii)** **THE SELECTION
  RULE IS `§6.5` ITEM 3'S, UNCHANGED AND RE-STATED HERE AS THE LISTENER'S OWN:** a listener bound at
  address `W` is triggered by a successful `write` or `delete` at address `X` iff **`W` is a PREFIX of
  `X`** — descendant-inclusive from `W` downward (`A33`: *"Alerts if a write resolves to or through the
  matched address"*; `A37`: *"Listener fires if the address or any of its descendants is resolved on
  write"*; `DD-18`).
- **(e) THE ORDER IS UNSPECIFIED AND THE CONTRACT DECLARES ORDER-INSIGNIFICANCE** (`DD-37`): **the
  returned list is a SET over membership, and no drive asserts a sequence.** **This is the last of the
  park's four subjects and the ONLY one the ruling left unnamed, so it is carried as a DECLARED DEFAULT
  with its alternative priced rather than left silent.**
- **(f) NOTHING CARRIES OVER FROM THE STOPGAP'S TIER QUALIFIER** (`DD-36`): **the listener's `address` is
  the whole of its key and no tier test runs at any trigger.** **`§3.1.1`'s `tier` column is struck for
  the superseded `watch` row and authored for the listener surface as a SHAPE check only** (the
  amendment's `§3.1.1` clauses below).

**ITEM 11 — WHAT A `write` AND A `delete` RETURN, AND THE LIST'S FATE.** **The return shapes are `§3.6`'s
and `§4.4`'s, amended there:** **a successful `write` returns `op`, `watched` and `triggered`; a successful
`delete` returns `address`, `tiers` and `triggered`; a FAILED write and a FAILED delete return NOTHING**
(each throws). **`watched` keeps carrying ADDRESSES and `triggered` carries HANDLES** (`DD-35`, which prices
the alternative in full). **A `delete` that removes nothing (`D-3`) carries `triggered: []` as well as
`tiers: []`, because nothing was destroyed and no trigger occurred.**

**ITEM 12 — THE HANDLE: ITS TYPE, ITS MINTING, AND THE SUPERSEDED `WatchHandle`.** **`ListenerHandle` is
an OPAQUE, STORE-MINTED, STORE-UNIQUE token** — **the successor of the shipped `WatchHandle` and the ONE
handle of this surface** (`A57`; `A58`; `DD-32`'s neighbour; `parameter-semantics.md §2.13` states its row
with every outside value answered). **It is minted by `listen` and by the construction's `listeners[]`
population, it is what `unlisten` accepts and the only value it removes, and it is what `triggered` carries
— so the registration handle and the alert handle are ONE handle, which is the reconciliation `§18`'s own
consequence (3) asked for.** **A handle the store did not mint is not a failure: `unlisten` over an unknown
or foreign handle is a no-op SUCCESS** (the superseded `unwatch`'s own clause, `§6.5` item 6, carried
forward — and `PAR-8`'s row is RE-POINTED to `§6.5`'s listener clauses by this amendment).
**⟶ ADDED 2026-10-11 (`F-5`) — HOW THE TYPE MAY BE BUILT, AND WHAT THE CONSTRUCTION DOES WITH A HANDLE THE
CALLER SUPPLIED** (`RCA-8(d)` ANNOTATE-BESIDE: **the item above stands byte-for-byte and THIS clause is the
operative statement of the type's construction; the ONE home of the spelling and of the construction rule
is `docs/specs/storeroom-native/contract.md §0.4`, and this clause states what the construction and the verb
DO with a handle, never a second spelling table**). **IN THREE CLAUSES:**
**(a)** **`ListenerHandle` is a NEWTYPE OVER AN OPAQUE TOKEN with PRIVATE fields and ONE infallible public
constructor from a string token (`ListenerHandle::from`), and it carries `Clone` + `PartialEq` + `Eq` +
`Debug`** — **so a caller CAN spell a handle and can NEVER read out or mutate the token it holds**
(`contract.md §0.4`'s construction rule; **`A57`'s *"a handle that it returns"* names what the handle is FOR
and does not say who mints it, so this rule is that cell's own `DECLARED-DEFAULT`, priced and reversible
there**).
**(b)** **AT CONSTRUCTION, THE HANDLE IS ADOPTED VERBATIM:** **each accepted `listeners[]` entry's `handle`
becomes that home entry's handle, UNCHANGED and NOT re-minted** — *"each entry's `handle` becomes a home
entry keyed by its address"* (`seams-and-lifecycle.md §7.1` step 5) — **so two entries at ONE address carry
their OWN two handles and a trigger returns BOTH** (`DD-39`), **and the handle a trigger returns for such a
listener is EXACTLY the token the caller passed.**
**(c)** **AT `listen`, THE HANDLE IS MINTED, AND AN ALREADY-REGISTERED ADDRESS RETURNS THE HANDLE THE HOME
ALREADY HOLDS:** **a `listen(address)` whose address is NOT in the home mints a fresh store-unique token; a
`listen(address)` whose address IS already registered returns the EXISTING entry's handle rather than
minting a second one** — **which is the shipped address-level idempotence (`§6.5` item 2) carried to the
listener surface by `A45`'s ONE home, and which is why `unlisten` over the returned handle removes exactly
one entry.** **`ListenerHandle` is INSTANCE-SCOPED AND SESSION-SCOPED** (`parameter-semantics.md §2.13`;
`§6.1` item 3): **a handle a foreign instance minted, or this instance minted in a prior session, is OUTSIDE
its domain and `unlisten` over it is a no-op success.**

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE CONTRACT FINDING THE
HOST-FIX PASS FILED AGAINST THIS ITEM: THE TOKEN STAYS BOUND TO ITS REMAINING ENTRIES AFTER A FIRST-MATCH
WITHDRAWAL.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — item 12's opening clause,
its `F-5` clause and its three lettered parts (a), (b) and (c) — *"which is why `unlisten` over the returned
handle removes exactly one entry"* included — and the item is read THROUGH this clause; THIS clause is a
PURE INSERTION, it adds no `§`-number, re-decides no clause, mints no code, moves no register row and names no
park.** **THE DEFECT IT CLOSES, NAMED WITH THE SENTENCE IT ANSWERS AND THE TWO HOMES THAT CARRY THAT SENTENCE:**
**`contract.md §0.2` · `DD-42`'s `what it pins` cell reads *"the home never holds two entries with ONE token,
`unlisten` removes exactly the entry it names, and `triggered` carries NO DUPLICATED MEMBER"*, and this item
carries the same claim as the shipped consequence of the address-level idempotence — WHILE THE SAME ROW'S OWN
EXCEPTION SENTENCE LICENSES THE CALLER-SPELLED DUPLICATE AT TWO ADDRESSES: two `listeners[]` entries the
caller spelled with ONE token, which the construction ADOPTS VERBATIM (`DD-39`; `contract.md §0.4`'s
construction-rule clause 2 (b) of ADOPTION).** **In THAT state the unconditional reading of the sentence is
FALSE at its first two clauses, and the state is a LAWFUL one this directory declares: after `unlisten` over
that token, the token DOES still stand in the home, at the entries it named that were NOT the first match.**
**THE CLAUSE, STATED HERE SO THE `"can never be withdrawn"` STATE IS FORBIDDEN BY CLAUSE AND NOT ONLY BY THE
CODE:**
1. **A FIRST-MATCH WITHDRAWAL UNBINDS THE TOKEN FROM THE ONE ENTRY IT NAMES AND FROM NOTHING ELSE.** **Where a
   token names MORE THAN ONE home entry — the caller-spelled duplicate `DD-39` declares — a `unlisten` over
   that token removes ONE entry: the FIRST match, which is `DD-42` clause (2)'s declared answer.** **THE TOKEN
   STAYS BOUND TO ITS REMAINING ENTRIES: each of them still carries that handle, each is still returned by a
   trigger whose prefix test it satisfies, and EACH IS STILL WITHDRAWABLE BY A LATER `unlisten` OVER THE SAME
   TOKEN — which reaches the next of them by the first-match rule rather than failing.**
2. **SO THE *"`triggered` CARRIES NO DUPLICATED MEMBER"* HALF IS READ THE WAY `DD-42` ITSELF QUALIFIES IT: it
   is a claim about the tokens THE STORE MINTED, and the caller-spelled duplicate at two addresses is the
   state in which one token is carried twice by declaration** (`DD-42`'s own exception sentence; `DD-39`;
   `contract.md §0.4`'s construction-rule clause 2 (b); `§0.4`'s mint clause, whose dated clause leaves
   `DD-42`'s first-match withdrawal answer UNMOVED).
3. **AND THE STATE *"an entry that CAN NEVER BE WITHDRAWN"* IS FORBIDDEN, BY THIS CLAUSE:** **no home entry a
   token name — call it the survivor — may be left un-indexed by a withdrawal of another entry the same token
   names, and a later `unlisten` over that token MUST reach it.** **A drive that finds a surviving entry this
   token can no longer name has found a failure of THIS clause, and the failure is a defect rather than a
   declared answer** (`contract.md §5.8`'s handle-preservation half; `DD-42` clause (2)).
**AND THE AUTHORITY THIS CLAUSE POINTS AT, BECAUSE THE RULE IS THE STORE'S OWN STRUCTURE AND NOT THIS PASS'S
PREFERENCE: THE HOME'S HANDLE→ADDRESS INDEX IS A LOOKUP STRUCTURE ONLY — DERIVED FROM THE HOME AND NEVER
PATCHED ENTRY BY ENTRY — so a withdrawal's in-bucket removal re-derives the index from the home and the
token's SURVIVING entries remain INDEXED; the alternative spelling, an index patched at the one address a call
happened to name, is exactly the form whose membership and the home's entries can DISAGREE, which that row's
own `what it REFUSES` cell forbids** (`contract.md §0.2` · `DD-51` and its dated clause; `contract.md §0.4`'s
mint clause and its dated clause; item 8 (a) above for the home's own two structures, and item 12's
address-level idempotence for the one-entry case). **NO CODE IS MINTED FOR ANY OF THIS: a first-match
withdrawal over an unknown or foreign handle is still the no-op SUCCESS this item's opening clause declares,
and a known one still answers *"a one-entry removal for a known one"*** (`contract.md §0.4`'s
construction-rule clause 2 (2)).
**AND NOTHING ELSE OF THIS ITEM MOVES: the construction's VERBATIM adoption, the address-level idempotence,
the instance-scoped and session-scoped handle, the no-op success over an unknown or foreign handle, item 11's
returned members and item 14's `CF-DUP-3` reading all stand exactly as printed, and `contract.md`'s typed
register keeps its `8` rows with every failure list unmoved** (`contract.md §5`; `contract.md §0.4` clause 2,
whose uniqueness domain is `A69`'s and stands whole).
(`[P: §20 · A58; P: §18 · A57; T: this item's own extension of the token's binding, taken from the row the
clauses above cite and from no preference of this pass | CONTRACT]`).

**ITEM 13 — WHAT THE SHIPPED `watch` PAYS ATTENTION TO, AND THE DELTA THIS AMENDMENT CLOSES.** **STATED AS
ONE PARAGRAPH, SO THE RECONCILIATION IS NOT AN ARCHAEOLOGY** (the proposal's `§19`). **THE SHIPPED FORM
holds a registration `{ registration: u64, address, qualifier }`, returns an opaque `WatchHandle` from
`watch`, is idempotent at the address level, and — on a SUCCESSFUL WRITE at `X` with tier `t` — returns a
registration iff (i) its ADDRESS IS A PREFIX of `X` (descendant-inclusive) AND (ii) where a tier argument was
given, `t` is ONE OF ITS TIERS, with the address appearing ONCE even when registered at two tiers; it
returns **the watched ADDRESSES**, and **nothing is ever invoked**. **THE DELTA IS EXACTLY THREE THINGS,
AND THIS AMENDMENT CLOSES ALL THREE:** **(1) A RETURNED HANDLE** — the trigger's answer now carries the
triggered listeners' HANDLES (`triggered`), which the shipped form did not carry at all; **(2) THE SECOND
TRIGGER EVENT** — `delete` now carries `triggered` too, because `A43` rules that a delete FIRES, while the
shipped form returned a list on a successful write ONLY; and **(3) THE PER-NODE BORROWS FOR LOOKUP COST** —
the nodes now carry the two reference lists (`A45`, `A47`), which the shipped form did not carry at all (it
scans its registrations per write) — **with the borrows' lifetime discharged by destruction (`A46`) and the
one home declared as the authoritative registration state (`A45`/`A48`).** **⟶ AMENDED 2026-10-11 — THE THIRD DELTA ITEM IS READ THROUGH THE PER-NODE INDEX'S DECLARED OPTIONALITY** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence of item 13 above stands byte-for-byte**; the gate-4 adversarial pass's `AM-2`; `A45`; `DD-41`; `store-model.md §1.1`'s dated clause; `§6.5` item 9's clause (a-bis)): **the delta's THIRD thing is *"the per-node borrows for lookup cost"* — and the DELTA IS CLOSED BY EITHER SPELLING: a store that MATERIALIZES the two reference lists carries them and the borrows' lifetime is discharged by destruction (`A46`); a store that DOES NOT carries neither list, discharges no borrow, and produces the SAME returned sets from the ONE home — so the delta this item names is the LOOKUP-COST spelling and never an obligation that a node hold a list** (`P-TP-8`'s `(d)`; `§5.4`'s `(f)` clause).** **EVERYTHING ELSE THE SHIPPED FORM
DOES IS ALREADY SHIPPED AND GREEN AND IS CARRIED UNCHANGED: the address-keyed binding, the
descendant-inclusive selection rule, the distinctness of the returned address set, the failure discipline,
and the instance's own scope.**

**THE PARKS' BOUNDARY, RE-STATED WITH ITS OPERATIVE STATE.** **`P-1` — THE JS INTEGRATION SET: UNMOVED AND
STILL `OPEN`.** *"The store builds the store; the realm, the builder/ABI path, the packaging, the host
handoff, the crossing of every value the store produces into JS, the load path and the module-supplied
functions' crossing are DEFERRED and are NOT specified by this contract"* (`docs/pending.md` `P-1`;
`P: §10 · A8`; `R: §17.4` condition 2) — **and nothing in this amendment reaches it: the listener surface's
returned handle list is a store-side value, and how a JS client receives it stays `P-1`'s.**
**`P-3` — THE LISTENER IMPLEMENTATION: LIFTED BY THE ARCHITECT, `A44`, AT
`docs/specs/storeroom-listeners-proposal.md §10`** — ***"Yes, this is the listener unpark"*** — **so the
as-filed park clause above stands byte-for-byte as the record of what the park held, and the four subjects
it held are now this section's own OPERATIVE CLAUSES rather than a park's contents: the ORDER (`DD-37`, a
declared default), the ATTACHMENT RULE (item 10 (b): BY ADDRESS), the FIRING AND THE CALLBACK'S INVOCATION
(item 10 (d): the store RETURNS the handle and the CLIENT invokes), and a THROWING BODY (item 10 (d) (i):
NOT a store state, no subject inside this unit).** **A LIFT IS NOT A CLOSURE: the park's record stands with
its own dated lift clause, `P-3` is not deleted, and `P-1` remains the ONE park this section's clauses
obey.** **NO PARK IS READ AS A CLOSURE AND NO PARK IS NAMED AS A `DD` ROW'S REVERSAL INSTRUMENT**
(`[T: the operative park state, with the as-filed form named and nothing deleted | CONTRACT]`;
`[P: §10 · A8, §10 · A44, §16 · A38 · A39, §20 · A58 | CONTRACT]`)

**⟶ ADDED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THE FIRING'S AUTHORITY, ITS OWNER, AND THE `CF-DUP-3` READING
STATED AS A STORE-SIDE RULE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — items
1–7, the supersession clause and its four clauses, item 8 (a) and the `F-9` affirmation beside it, item 9 and
its clause (a-bis), item 10 (a)–(f), item 11, item 12 (a)–(c), item 13 and its `AM-2` amendment, and the parks'
operative state — and they are read THROUGH this item; THIS ITEM IS A PURE INSERTION, it re-decides no rule,
adds no `§`-number, mints no code, moves no register row and names no park.** **THE RULING, VERBATIM:**
***"Listener behavior is part of store."*** (`P: docs/specs/storeroom-js-proposal.md §19 · A78`).

**ITEM 14 — THE FIRING'S SEMANTICS ARE THIS SECTION'S, AND THE STORE'S CONTRACT IS THEIR AUTHORITY.** **SEVEN
PARTS, AND NO PART OF THEM IS A NEW BEHAVIOUR: (a) is the authority, (d) is the one rule no clause of this
directory had carried, and (b)–(c), (e)–(g) state, at this home, what the clauses above already declare.**

**(a) THE AUTHORITY, AND WHY IT IS STATED HERE RATHER THAN INFERRED.** **THE ARCHITECT'S WORDS, VERBATIM:**
***"Listener behavior is part of store."*** (`P: docs/specs/storeroom-js-proposal.md §19 · A78`). **THE CLAUSE:
THE FIRING'S SEMANTICS ARE THE STORE'S AND THIS SECTION IS THEIR AUTHORITY** — **the rules that answer WHICH
listener fires, WHEN it fires, WHAT it is bound to, WHICH ids a trigger returns, the home's registration
semantics (`listen` and `unlisten`), the address-prefix rule and the process-scoped handle are THIS store's
behaviour, declared at items 8–13 above; and NO OTHER ARTIFACT — no consumer's contract, no binding's, no
package's — is their home.** **What another artifact may declare is DELIVERY: the id→function registry, the
invocation, its argument and the failure form; what it may NEVER declare is a firing rule of its own.**
**AND THE RE-HOMING IS DECLARED WITH ITS REACH, SO A LATER READER DOES NOT TAKE IT FOR A BEHAVIOUR CHANGE: the
shipped `listen` / `unlisten` and the one authoritative home DO implement the firing, and the consumer side
DOES implement only the delivery — SO THIS ITEM IS A RE-HOMING OF AUTHORITY AND NEVER A CHANGE OF BEHAVIOUR.**

**(b) WHAT THE HOME OWNS.** **THE HOME IS THE ONE AUTHORITATIVE REGISTRATION STATE (item 8 (a), `A45`/`A48`,
`store-model.md §2.1`'s dated clause) AND IT OWNS THE REGISTRATION SEMANTICS AND NOTHING ELSE:** **a
registration is keyed by the listener's `address` and carries its `handle`** (item 8 (a)) · **`listen` adds an
entry at an address the home does not hold, and a `listen` at an address the home ALREADY holds adds NO second
entry and returns the EXISTING entry's handle** (item 12 (c), the address-level idempotence of `§6.5` item 2
carried to this surface) · **`unlisten` removes exactly ONE home entry and, over an unknown or foreign handle,
is a no-op SUCCESS that removes no other registration** (item 12; `parameter-semantics.md §2.13`, `PAR-13`,
which states the row with every outside value answered) · **the
construction populates the home from `listeners[]` BEFORE the registry is generated, ADOPTING each entry's
handle VERBATIM and KEEPING a duplicate address's both entries** (item 8 (d), item 12 (b), `DD-39`). **NO
CONSUMER HOLDS A SECOND COPY OF ANY OF IT:** **a node's lists are REFERENCES INTO the home and never a copy**
(item 9 (e)), **and the home is outside the graph, outside every read and outside the `file` bytes and the
journal** (items 8 (b)/(c)/(e)).

**(c) WHAT THE TRIGGERS ARE, WHAT IS BOUND, AND WHAT A TRIGGER RETURNS.** **THE TRIGGER EVENTS ARE EXACTLY
TWO — `write` and `delete` — AND A READ NEVER FIRES** (item 10 (c), `A43`: *"listeners don't fire on read, they
fire on write/delete"*). **THE BINDING IS BY ADDRESS AND NOT BY A NODE'S IDENTITY:** a re-mint, a purge, a
shadow, a `VEC` renumbering or a rollback that changes the node at an address **does not move, drop or
redirect the listener** (item 10 (b)). **AND THE PREFIX RULE DECIDES MEMBERSHIP AND NOTHING ELSE:** a listener
bound at `W` is triggered by a successful `write` or `delete` at `X` **iff `W` is a PREFIX of `X`**,
descendant-inclusive from `W` downward (item 10 (d) (iii), `A33`, `A37`, `DD-18`). **A SUCCESSFUL `write`
returns `triggered` and a successful `delete` returns `triggered`; a FAILED one returns NOTHING, because each
throws** (item 11). **AND NO ORDER IS DECLARED FOR THE RETURNED LIST** — the list is a SET over membership and
**no clause of this directory promises a registration order, an address order or a tier order** (item 10 (e),
`DD-37`). **THE HANDLE A TRIGGER CARRIES IS THE ONE HANDLE OF THIS SURFACE: the registration handle and the
alert handle are ONE handle** (item 12), **minted by `listen` and by the construction's adoption, accepted by
`unlisten`, and carried by `triggered`.**

**(d) THE `CF-DUP-3` READING, AS A RULE OF THE STORE'S LISTENER SURFACE — WHAT A TRIGGER'S RETURNED SET
CONTAINS.** **WHAT A TRIGGER'S RETURNED SET CONTAINS IS WHAT THE HOME HELD WHEN THE TRIGGER WAS COMPUTED.**
**A `listen` OR AN `unlisten` THAT LANDS AFTER A TRIGGER HAS BEEN COMPUTED CANNOT ALTER THAT TRIGGER'S
RETURNED SET: IT TAKES EFFECT AT THE NEXT ONE.** **So the set a computed trigger carries is FIXED AT THE
MOMENT OF ITS COMPUTATION and is not re-read, re-derived or amended afterwards; and a return-by-handle answer —
the `triggered` list of a successful `write` or `delete` (item 11) — is therefore a statement about the home AS
IT STOOD, and never about the home as it stands after a later `listen` or `unlisten`.** **AND THIS IS A
PROPERTY OF THE STORE'S LISTENER SURFACE AND NOT OF ANY CONSUMER'S DELIVERY:** **a delivery window, a
registration held in a package's own registry, an invocation and its argument are the CONSUMER'S, and NO
clause of theirs may be read as a rule about what THIS surface returned** — **the firing's authority is
(a)'s and the delivery's is not.**

**(e) THE TWO SYMMETRIC CASES, STATED SO NO READER TAKES ONE ARM FOR THE WHOLE RULE.** **(i) A `listen` THAT
LANDS AFTER A TRIGGER HAS BEEN COMPUTED.** **WHERE ITS ADDRESS WAS NOT IN THE HOME AT THE TRIGGER'S OWN
COMPUTATION, THE TRIGGER'S RETURNED SET DOES NOT CARRY IT** — **the new registration's handle is returned by
THE NEXT trigger whose prefix test it satisfies, and by nothing earlier** (**item 10 (d) (iii)'s prefix test;
item 14 (d)'s own rule**). **AND WHERE ITS ADDRESS WAS ALREADY REGISTERED AT THAT COMPUTATION, THE HOME GAINS
NOTHING AND THE RETURNED SET IS UNCHANGED** — **because a `listen` at an address the home already holds returns
the EXISTING entry's handle and adds NO second entry** (item 12 (c)) — **so the one identity that address
already carried is the one the set carries, once, and there is no second identity for the set to gain.**
**(ii) AN `unlisten` THAT LANDS AFTER A TRIGGER HAS BEEN COMPUTED.** **IT REMOVES ONE HOME ENTRY AND IT DOES
NOT REWRITE THE SET THE EARLIER TRIGGER RETURNED:** **that set still carries the handle, because it is what the
home held when the trigger was computed; the withdrawal's effect is that a LATER trigger at an address the
withdrawn listener's own address is a prefix of NO LONGER CARRIES THAT HANDLE** (**item 12's no-op-success
clause; item 14 (d)'s own rule**). **AND WHERE THE `unlisten` WAS ONE OF THE ITEM-4-CLASS NO-OP SUCCESSES — an
unknown, a foreign, a prior-session, a fabricated or a non-handle value — IT REMOVED NOTHING AT ALL, so the
home it leaves is the home the next trigger reads, unchanged** (item 12). **NEITHER ARM HAS AN ORDER IN IT: no
part of this item derives an outcome from a position in any list** (item 10 (e), `DD-37`).

**(f) THE ARGUMENT THAT MAKES (d) NON-ARBITRARY, CARRIED BECAUSE A RULE THAT IS MERELY THE SHIPPED ONE IS NOT
A RULE.** **THIS SECTION DECLARES THE ORDER IN WHICH A TRIGGER RETURNS ITS MEMBERS UNOBSERVABLE** — **no clause
of this directory asserts it, item 10 (e) declares ORDER-INSIGNIFICANCE, and `DD-37` declares that a drive
compares SETS and never sequences, so no drive of any set may assert it** (item 10 (e); `DD-37`). **A RULE THAT
TIED AN OUTCOME TO WHERE IN THE RETURNED LIST A REGISTRATION'S OCCURRENCE HAPPENED TO STAND — so that a
registration landing before the second occurrence of an identity took effect in the trigger in flight while
one landing after it did not — WOULD THEREFORE MAKE AN OBSERVABLE DEPEND ON AN UNOBSERVABLE:** **whether a
listener is returned would depend on a POSITION in the array whose ORDER THIS CONTRACT DECLARES NOT
OBSERVABLE.** **That is a direct contradiction of the order-unobservability rule the same clause declares, so
the position-dependent reading cannot hold, AND THE ONLY READING CONSISTENT WITH THE REST OF THIS SECTION IS
(d)'s: a trigger's returned set is the home as it stood when that trigger was computed, and a `listen` or an
`unlisten` that lands afterwards takes effect at the NEXT trigger.** **AND IT IS DRIVABLE WITHOUT REACHING FOR
AN ORDER: a drive asserts WHICH handles a trigger returned and at WHICH trigger, never where in a list they
stood** (item 10 (e); `§3.6`/`§4.4`'s `triggered` member; `DD-37`).

**(g) WHAT THIS ITEM DOES NOT DO, AND WHERE THE DELIVERY'S CONSEQUENCE STAYS.** **IT ADDS NO VERB, NO
PARAMETER, NO MEMBER, NO RECORD SHAPE AND NO FAIL CODE; it changes no derive set, no mint and no uniqueness
domain (item 12 is `A69`'s and stands whole); it re-decides no clause of items 8–13; it moves no row of the
typed register and no row of the defaults table; and it names no park.** **AND ONE CONSEQUENCE OF (d) LANDS ON
THE CONSUMER'S SIDE, WHERE IT IS STATED AND NOT HERE: a CONSUMER that receives a `triggered` list and invokes
its own functions performs that invocation AFTER this store's verb has returned, and the recipient set it
actually invokes is read from the list IT HOLDS as that list stands** — **which is the DELIVERY-side half of
the same rule and belongs to the consumer's own contract, at ITS own clause, as its pointer to this item; no
delivery rule is authored, restated or widened here.**
(`[P: docs/specs/storeroom-js-proposal.md §19 · A78 — *"Listener behavior is part of store."*, the ruling that
makes this section the firing's authority; A3 `write-and-read.md §6.5` items 8–13 above — the clauses the
authority is read over, each at its own line; A3 `contract.md §6.5` item 5 (*"NO ORDER IS DECLARED FOR THE
LIST"*) with `DD-37` — the order-unobservability on which (f)'s argument rests; A1
`docs/pending.md`'s `CF-DUP-3` clause and A3 `docs/specs/storeroom-js/surface.md §2.4`, the two as-filed homes
of the corner this item now owns | CONTRACT]`).

---

**END OF THE `write-and-read` PART.** **Its relocated spans are `contract.md §3`, `contract.md §4` and
`contract.md §6`, whole**, **and its own authored content is `§6.5`'s listener amendment — the supersession
clause, the home (item 8), the borrows and the two lists (item 9), the listener record and the firing model
(item 10), the returned members (item 11), the handle (item 12), the delta (item 13), and the parks'
operative state — each of which cites a ruling or a `DD` row and invents no behaviour.** **This part adds no
`§`-number and no arm; the three spans' `§`-numbers and authority citations are exactly those of the
contract document, and a citation to any of them is written with this part's path**
(`docs/specs/storeroom-native/write-and-read.md §6.4`, etc.).
