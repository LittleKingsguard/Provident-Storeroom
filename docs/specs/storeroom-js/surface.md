# `surface` — the verbs that cross, `findAddress`'s non-exposure, the handle clause, the registry, the single failure form and the delivery rules

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§2` (`§2.1`–`§2.10`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **A citation to it names THIS part's path
plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The relocation is SPAN-BY-SPAN
and BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it
required as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

---

## §2. The JS surface — the verbs that cross, the handle, and the registry

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/surface.md` (`§1`–`§9` of this document, relocated WHOLE), the `carrier` part this
directory's map declares for it**; a citation to it names that part's path plus the `§`-number (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

### §2.1 The construction call

**`storeCreate(cfg)` crosses as ONE JS function taking ONE plain object.** **`cfg` carries the store's THREE
declared keys — `filePath` · `journalLength` · `listeners` — and the package passes each through WITHOUT
adding a default, a rename or a fourth key** (`DD-36`). **A returned value is the package's own instance
handle** — an opaque JS object whose identity the package owns (**`ListenerHandle` is NOT this handle: this
is the PACKAGE's wrapper around the store's instance, and no clause of this directory exposes any member of
it**). **Every outside form of `cfg` and of its three keys answers the store's own code and returns no
instance** (`§1.3`; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4`)
(`[A3 docs/specs/storeroom-native/contract.md §7.1 — the construction input set | state or fail-state
declaration]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT  **⟶ THE ARTEFACT'S DIGEST RE-PINNED 2026-10-11 BY THE SUPERVISOR (`LIVE-F4`'s class; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `cf088d91…`/`957,904` cells below STAND as the `Q7`/`Q8` tree's own reading and THIS clause is the operative tie): the artefact is `sha256:0136c912…` over `958112` bytes, the pre-rename/pre-`Q3` artefact being `cf088d91…`/`957,904`. EVERY figure this file prints describes THIS digest from here on; the blind set (`241`) and the JS leg (`185`) and the live battery (`91`) were all re-measured against it.**  **⟶ THE ARTEFACT'S DIGEST RE-PINNED AGAIN 2026-10-11 (the `FMT` pass; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `0136c912…`/`958,112` cells STAND as the pre-formatting tree's reading and THIS clause is the operative tie): the artefact is `sha256:34ff12d3d840a6eba80b9695ade8e0cbedafe27215be4d8c3604ee6ebf9229b1` over `958104` bytes, the `-8` bytes being LLVM's internalization hash for a renamed local losing one digit across nine `.strtab` occurrences.** **AND THE FIGURES ARE NOT RE-MEASURED BECAUSE THEY DO NOT NEED TO BE: CODEGEN IS UNMOVED — every allocatable section byte-identical (`546,698` of `.text` among them) and all `2,168` symbols identical in name, value, size, type and section index — so every figure measured against the earlier digest stands against this one.**  **⟶ THE ARTEFACT'S DIGEST RE-PINNED AGAIN 2026-10-11 (the release-fix pass; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `34ff12d3…`/`958,104` cells STAND and THIS clause is the operative tie): the artefact is `sha256:a3314ac1420019c79201afd9d2fface5ba35ed0f1261479fac4856ef11aedca5` over `958136` bytes.** **THE CAUSE IS DIAGNOSED AND CODEGEN-NEUTRAL: the package GAINED A BUILD SCRIPT, so the crate's own `-C metadata` disambiguator moved and 213 mangled names moved with it — `33` sections each, exactly ONE differs in size (`.strtab` `177,832 → 177,864`), `2,165` symbols in both, and every allocatable code and data section (`.text` `546,698` bytes among them) byte-identical. Parking `build.rs` reproduces the earlier digest exactly; restoring it reproduces this one exactly, measured both directions. NO FIGURE NEEDS RE-MEASURING.**
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) BY RECONCILING THIS SECTION'S NON-EXPOSURE
SENTENCE.** `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and is read THROUGH this
clause; it is not reworded and not withdrawn.** **WHAT IT MEANS, STATED SO IT IS NOT READ WIDER THAN IT IS:
the non-exposure it declares is THE STORE'S — the store's instance, its home, its anchors, its `NodeRef`,
its resolver and its internal tooling are exposed through NO member of the package's handle — and it is
NEVER a claim that the PACKAGE'S OWN instance handle is memberless.** **The PACKAGE's REGISTRY is the
PACKAGE'S OWN SURFACE and is not the store's, so the one member that surface declares stands: the handle
`storeCreate` returns has EXACTLY ONE member, `register(handle, listener)`, declared at `§2.4` item 5, and
NOTHING ELSE.** **A reader must not read the sentence above as forbidding a member of the PACKAGE's own
wrapper; and no reader may read this clause as exposing one byte of the store's internals, because it
exposes none** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-15`; A1
docs/specs/storeroom-js-proposal.md §11 · `A63` · `A65` — no store internal crosses in either direction |
prohibition]`).

**⟶ AMENDED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`): THE SURFACE ENUMERATION, WHICH NOW
CARRIES THE INSTANCE'S THREE MEMBERS AND A MODULE NAMESPACE THAT DOES NOT MOVE.** `RCA-8(d)` ANNOTATE-BESIDE:
**every byte above stands byte-for-byte — the construction clause, its signature block and the `AR-15`
correction clause included — and each is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no
verb to any namespace, overloads nothing, and re-decides no rule of this section.** **THE RULING, VERBATIM:**
***"Use S-1, `off` can deregister, and always validate"*** (`docs/specs/storeroom-js-proposal.md` `§8` ·
**`A79`**).

**1. THE INSTANCE'S OWN MEMBER SET, ENUMERATED — THREE MEMBERS, AND THEY ARE THESE:**
```
storeCreate(cfg) -> instance-object          // §2.1's construction; its product's member set is the three below

register(handle, listener)  -> undefined     // §2.4 item 5 — the registration site, UNMOVED
on(address, listener)        -> handle       // ADDED by `A79` — the combined call: the store's `listen` + the registry's registration
off(handle)                  -> undefined    // ADDED by `A79`/`A80` — the store-side withdrawal + the PACKAGE'S OWN registry removal
```
  **(a) THE MEMBER SET IS `{ register, on, off }` — THREE OWN MEMBERS AND NOTHING ELSE.** **`register` is
  `§2.4` item 5's site and is UNMOVED in signature, domain, return and every outside-value answer.** **`on` and
  `off` are the S-1 shape `A79` adopts, and each member's clauses stand at `§2.4` item 7.** **SO `§2.4` item 5
  (a)'s *"`{ register }` — one own member, and NOTHING ELSE"* IS SUPERSEDED AS A MEMBER-SET FIGURE and read, from
  this date, as `{ register, on, off }`: the as-filed sentence stands byte-for-byte at its own `§` (this
  document's and the contract document's, in the same words), the re-spelling of those two cells is the NAMED
  REPAIR of a later bounded amendment, and THIS clause is the operative member-set statement until it lands.**
  **(b) THE MODULE NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS.** **`storeCreate` · `read` ·
  `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` — `8` NAMES, NO NINTH, AND NO NAME
  REMOVED: `§2.9` item 1's count is UNMOVED, and NEITHER `on` NOR `off` is added to the entry's named exports,
  because both are reached through the FACTORY'S OWN PRODUCT and through nothing else** (`§2.4` item 5 (a)'s own
  pointer; `package.md §1.3` item 3's *"AND NOTHING ELSE"*).
  **(c) AND THE STORE'S OWN TWO VERBS ARE UN-OVERLOADED.** **`listen(instance, address)` and
  `unlisten(instance, handle)` keep their names, their positions, their arity and their returns; the store's own
  listener surface is reached by `on`/`off` through those SAME two declared verbs and through no new store-side
  form, and the store's `379`, its crate and its contract directory do not move** (`§2.10`; **`A68`**;
  `docs/specs/storeroom-js-convenience-proposal.md §6`).
  **(d) AND NOTHING ELSE OF THIS SECTION MOVES: `§2.1`'s construction clause is unchanged — `cfg` still carries
  the store's THREE declared keys and the package still adds no default, no rename and no fourth key (`DD-36`) —
  and `§2.1`'s non-exposure sentence is unchanged in its own scope: it speaks of the STORE's internals, which no
  member of the package's handle exposes, and it was NEVER a claim that the package's own handle is
  memberless.**
  (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` — *"Use S-1"*; A1
  docs/specs/storeroom-js-proposal-review.md §5.4 — a pinned default carries a priced alternative; this
  document's `§2.4` item 7 — the two new members' own clauses | requirement]`).

```
storeCreate(cfg) -> Instance          // throws {status, message} on failure; never returns a partial instance

cfg = {
  filePath:      string | absent,     // PAR-JS-2 — absent is IN DOMAIN (the register is created at mem)
  journalLength: number,              // PAR-JS-3 — REQUIRED, a positive integer counting ENTRIES
  listeners:     { address, handle }[] // PAR-JS-4 — REQUIRED, may be EMPTY, duplicates KEPT
}
```

### §2.2 The address verbs — `read` · `readLiteral` · `write` · `delete`

```
read(instance, address, tier?)        -> JS value          // the assembled value, a leaf's literal, or the whole register
readLiteral(instance, address, tier?)  -> JS value          // the SAME read, narrowed: the target must be a leaf
write(instance, address, tier, value)  -> { op, watched, triggered }
delete(instance, address, tier?)       -> { address, tiers, triggered }
rollback(instance, opId)               -> { opId, undoneOps, restoredTo }
```
**EVERY ONE OF THE FIVE IS SYNCHRONOUS AND RETURNS A FRESH JS VALUE** (`§1.1`'s deep copy out). **THE PACKAGE
PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN** (`DD-46`): **a missing, an extra or a
wrong-shaped argument reaches the store's own carrier value and answers the store's own code.** **`read`'s
`tier` accepts ZERO TO MANY — one token or an array — and an array is an ANY-MATCH set, not a union of
values, not an ordered preference and not a filter** (`DD-37`). **`write`'s `tier` is REQUIRED and SINGULAR;
`delete`'s `tier` is OPTIONAL and EXACTLY ONE when present.**
(`[A3 docs/specs/storeroom-native/contract.md §4.1 · §3.1 · §4.3 · §6.3 — the four verbs' own signatures |
requirement]`)

### §2.3 The handle clause — the construction's string, the returned opaque, and the accepted hazard

1. **THE TOKEN'S DOMAIN IS THE PROCESS, AND IT IS THE STORE'S DECLARED DOMAIN.** **A store-minted handle is
   UNIQUE PER PROCESS: no OTHER token the store mints — in this instance, in ANY other instance of THIS
   process, or at ANY LATER moment of THIS process — is equal to it.** **The construction ADOPTS the
   caller's tokens verbatim rather than re-minting them, and a caller-spelled token is instance-local
   because only the instance the caller handed it to holds it.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — *"Proceed on b"*; A3
   docs/specs/storeroom-native/contract.md §0.4 clause 2's dated reconciliation | requirement]`)
2. **TWO JS SPELLINGS FOR ONE TYPE, ONE PER DIRECTION, AND NEITHER DIRECTION IS THE OTHER'S.**
   **IN:** the construction's `listeners[]` takes each handle as a **plain `string`**. **OUT:** every handle a
   verb RETURNS is the package's **opaque JS value** wrapping the token, whose token is PRIVATE and readable
   by no JS code; the package compares handle identity **internally**, by the token it holds. **`unlisten`
   accepts the OPAQUE form ONLY.** (`DD-14`)
3. **THE TWO ACCEPTED CONSEQUENCES, PRINTED WITH THE CLAUSE BECAUSE A CLAUSE THAT HIDES ITS OWN HAZARD IS
   NOT A CLAUSE.** **(i) A PRIOR SESSION'S HANDLE IS OUTSIDE THE DOMAIN, AND WHERE THE CURRENT PROCESS HAS
   SINCE MINTED THE SAME TOKEN IT NAMES *THAT* REGISTRATION — a declared CROSS-PROCESS hazard, not a
   defended property: the counter restarts at each process, and handle identity is TOKEN EQUALITY ALONE.
   THE PACKAGE'S OWN DOCUMENTATION MUST STATE THAT A HANDLE MUST NOT BE CARRIED ACROSS A PROCESS RELOAD**
   (`DD-28`). **(ii) THE CONTAINMENT NOTE STANDS OPEN AND IS NOT DEFENDED HERE: the `listener-<n>` namespace
   is guessable — and the package's own surface never spells a token, so the hazard is reachable only by a
   caller that guesses one, which `DD-28` refuses to document.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — its accepted-consequence cell; A3
   docs/specs/storeroom-native/parameter-semantics.md §2.13 — `PAR-13`'s four outside-value classes | state
   or fail-state declaration]`)
4. **`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS.** **A value a foreign instance minted,
   a value a prior session minted, a value the store never minted at all (fabricated), a blank token and a
   non-opaque value are EACH a no-op success at `unlisten`: no code is produced and NO OTHER REGISTRATION IS
   REMOVED** (`§1.3`'s `ListenerHandle` rows; `parameter-semantics.md` `PAR-JS-8`).
   (`[A3 docs/specs/storeroom-native/parameter-semantics.md §2.13 — class (A), (B), (C) and (D), each with
   its declared answer | state or fail-state declaration]`)
5. **THE HANDLE'S PRESENCE IN A TRIGGERED SET IS DECIDED BY ADDRESS AND BY NOTHING ELSE:** **a handle
   appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the triggering address**
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 3 | requirement]`).

**⟶ AND ONE CONSEQUENCE OF THE INHERITED MINT RULE FALLS ON THIS SECTION, STATED HERE SO THE TWO HOMES OF
`§2.3` AGREE: A REPEAT `listen` AT AN ALREADY-REGISTERED ADDRESS MINTS NOTHING AND RETURNS THE ENTRY'S OWN
HANDLE.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–5 above stand byte-for-byte; THIS clause is a PURE INSERTION
and it is this part's own pointer to the rule the contract document declares at its `§2.3` item 6.** **THE
CONSEQUENCE FOR THIS SECTION'S OWN SUBJECT, IN ONE LINE: `§2.3` item 2's OUTPUT spelling and `§2.10`'s
`listen(instance, address)` signature are UNCHANGED — `listen` still returns the package's opaque wrapper —
and WHERE THE ADDRESS IS ALREADY REGISTERED the WRAPPER THE CALLER RECEIVES WRAPS THE EXISTING ENTRY'S TOKEN,
so TWO `listen` CALLS AT ONE HELD ADDRESS RETURN THE SAME OPAQUE VALUE, and `unlisten` over it removes THAT
ONE entry.** **AND `§2.3` item 4 is untouched: the no-op set is `unlisten`'s and its members are unchanged.**
**The rule's own declaration, its operative terms (`A45`'s one home entry per address and the store's
address-level idempotence, `write-and-read.md §6.5` items 2 and 12 (c)), the one case in which a later
`listen` DOES mint a different handle — the withdrawal removed the address — and the `alt` it prices, all
stand at `contract.md §2.3` item 6 and are NOT restated here beyond this line**
(`[A3 docs/specs/storeroom-js/contract.md §2.3 item 6 — the inherited mint rule, of which this clause is the
`surface` part's pointer; A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) |
requirement]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THE HANDLE CLAUSE'S FIRING HALF, INHERITED FROM THE STORE AND
POINTED AT ITS OWN CELL.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–5 above, the item-6 clause below and this
part's own dated pointer stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE
INSERTION — it adds no row, no file, no member, no parameter and no `§`-number, and it re-decides no rule of
this part.** **THE RULING, VERBATIM:** ***"Listener behavior is part of store."*** (`docs/specs/storeroom-js-proposal.md`
`§19` · `A78`).
**AND ITS ONE CONSEQUENCE HERE: THE ONE ITEM OF THIS SECTION THAT STATES A FIRING RULE INHERITS IT.**
**`§2.3` ITEM 5 — *"THE HANDLE'S PRESENCE IN A TRIGGERED SET IS DECIDED BY ADDRESS AND BY NOTHING ELSE: a
handle appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the triggering
address"* — IS THE STORE'S RULE AND NOT THIS PART'S:** **its home is
`docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) (iii), which declares the prefix test as a
property of the store's own listener surface, and this item is a POINTER to that clause.**
**NO BEHAVIOUR MOVES BY THIS RE-STATEMENT, AND THE TWO FIGURES THE ITEM PRINTS DO NOT DEPEND ON THIS PART
HERE:** **the prefix sets the store's own trigger returns are produced from the ONE HOME** — **`A45`'s one
home entry per address and the store's address-level idempotence, at their own terms** — **so a handle the store
has not returned for a trigger never appears in the set, and a handle the store HAS returned is carried as the
store's own list carries it.**
**THE DELIVERY-SIDE READING OF `§2.3`'S OWN ITEMS 1–4 IS UNAFFECTED AND IS STATED ONE LINE EACH, BECAUSE A
RE-HOMING THAT LEFT THE READER UNSURE WHICH ITEMS MOVED WOULD HAVE MOVED NOTHING:** **item 1's *"UNIQUE PER
PROCESS"* domain is the STORE's mint rule, inherited by `contract.md §2.3` item 6 and by `PAR-JS-8`'s dated
clause and declared at `write-and-read.md §6.5` item 12 (c)** — **item 2's TWO SPELLINGS (a plain `string` IN,
the package's OPAQUE value OUT) are this package's own** — **item 3's two ACCEPTED CONSEQUENCES (the
prior-session hazard and the guessable namespace) are this package's own documentation duties** — **item 4's
`unlisten` NO-OP SET is the STORE's own answer over an outside value, declared at
`docs/specs/storeroom-native/parameter-semantics.md §2.13` and carried here as `PAR-JS-8`** — **so exactly ONE
item of this section changes what it DOES, and it is item 5: it now INHERITS and POINTS.**
**AND ONE CONSEQUENCE THAT IS NOT THIS SECTION'S TO STATE IS NAMED ONLY, SO IT IS NOT DISCOVERED LATER: the
`listen` clause of `contract.md §2.3` item 6, whose `write-and-read.md §6.5` item 12 (c) terms this section
inherits and points to, prints *"a later `listen` at the same address mints a DIFFERENT handle"* for the
still-registered case, while the STORE's own rule — **which `§2.3` item 6 declares to be the operative one and
which is its home** — returns **THE EXISTING ENTRY'S HANDLE** in that case** — **the two stand together and are
READ AS ONE DECLARATION, the JS sentence's *"different handle"* being the WITHDRAWN case's alone; the full
reconciliation is that document's own dated clause at `§2.3` item 6 and is not restated here.**
**AND NOTHING ELSE OF THIS SECTION MOVES: items 1–5 stand as printed, the registry's four rules are `§2.4`'s
and are unmoved, the register keeps its `8` rows with every failure list unmoved, and no `DD` row, no `PAR-JS`
row and no part entry is authored, renumbered or dropped by this clause**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
item 10 (d) (iii) — the prefix test's store-side home; A3 docs/specs/storeroom-native/parameter-semantics.md
§2.13 · `PAR-13` | requirement]`).

**⟶ AMENDED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`): THIS SECTION'S OWN SUBJECT READ
AGAINST THE TWO NEW INSTANCE MEMBERS — ONE PRODUCES A HANDLE, ONE CONSUMES IT, AND NOTHING OF THE HANDLE MOVES.**
`RCA-8(d)` ANNOTATE-BESIDE: **items 1–5 above, this part's item-6 pointer clause and this section's `A78`
re-homing clause stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds
no member, no verb, no `§`-number and no row, and it re-decides no rule of this section.** **THE RULING,
VERBATIM:** ***"Use S-1, `off` can deregister, and always validate"*** (`docs/specs/storeroom-js-proposal.md`
`§8` · **`A79`** · **`A80`**).

1. **`on(address, listener)` PRODUCES A HANDLE, AND ITS OUTPUT SPELLING IS THE ONE `§2.3` ITEM 2 ALREADY
   DECLARES.** **It returns the package's OPAQUE wrapper for the handle the store's own `listen` returned — the
   SAME form `listen` returns, with the SAME unreadable private token — and AT A HELD ADDRESS it returns the
   EXISTING entry's handle, because the store's address-level idempotence makes a repeat `listen` mint nothing
   and answer the entry's own handle** (`§2.3` item 2; `§2.4` item 7 (a); `contract.md §2.3` item 6;
   `write-and-read.md §6.5` item 12 (c)). **SO THE OUTPUT DIRECTION GAINS NO THIRD SPELLING: there are still
   exactly TWO — a plain `string` IN at the construction, the package's opaque value OUT — and `on`'s return is
   the second of them and nothing else.**
2. **`off(handle)` CONSUMES A HANDLE, AND IT ACCEPTS THE OPAQUE FORM ONLY.** **Its argument's form rules are
   `§2.3` item 2's, at their own words, and NO `string` is admitted at that position: a bare `string`, a
   blank token, a value a foreign instance minted, a value a prior session minted, a fabricated value, `null`,
   an `undefined` and an ABSENT argument are EACH refused by `off` — and the refusal's form, status and content
   are `§2.4` item 7 (b)'s** (`§2.3` item 2; `§2.4` item 7 (b); `parameter-semantics.md §2.8`).
3. **AND ONE CONTRAST THIS SECTION OWES ITS READER, BECAUSE THE TWO VERBS ANSWER ONE VALUE DIFFERENTLY BY
   DECLARATION AND NOT BY OVERSIGHT: `unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS
   (`§2.3` item 4, UNMOVED), WHILE `off` OVER A HANDLE THIS INSTANCE NEVER MINTED OR ADOPTED IS A REFUSAL —
   `AddressMalformed` in `§2.5`'s single form — BECAUSE `off` REMOVES A PACKAGE-OWNED ENTRY AND AN UNKNOWN
   IDENTITY NAMES NO SUCH ENTRY, WHILE `unlisten` NAMES A WITHDRAWAL WHOSE IN-DOMAIN ANSWER FOR AN UNKNOWN
   HANDLE IS ALREADY DECLARED** (`§2.4` item 7 (b); `§2.3` item 4, whose no-op set is `unlisten`'s alone and is
   UNMOVED). **NEITHER VERB'S ANSWER IS READ AS THE OTHER'S, AND NO CELL OF ITEM 4 MOVES.**
4. **AND NOTHING ELSE OF THIS SECTION MOVES: item 1's uniqueness domain and its scope, item 3's two ACCEPTED
   consequences (the prior-session hazard and the guessable namespace), item 4's `unlisten` NO-OP SET, item 5's
   prefix-test pointer and this part's item-6 pointer to `contract.md §2.3` item 6 all stand exactly as printed**
   — **and `A79` adopts a SHAPE: it moves no mint rule, no collision rule, no uniqueness domain and no
   address-level idempotence, all of which remain the STORE's and remain where they stood**
   (`§2.3` items 1–5; `contract.md §2.3` item 6; `write-and-read.md §6.5` item 12 (c) | requirement]`).

### §2.4 The registry — the package's own state, and its four rules

**THE STORE RETURNS HANDLES AND INVOKES NOTHING** (`A57`); **so a JS listener is a FUNCTION the PACKAGE must
hold, and the package owns a PER-INSTANCE REGISTRY keyed by the opaque handle it returned. THE FOUR RULES,
AND NO FIFTH:**
1. **AN UNREGISTERED HANDLE FIRES NOTHING, SILENTLY.** A handle returned in a `triggered` list with **no**
   registered function invokes nothing and reports nothing — **no code, no warning, no log**.
2. **A SECOND REGISTRATION FOR THE SAME HANDLE REPLACES THE FIRST.** **One handle, one function** — the
   registry is **not** a fan-out, and the replaced function is dropped without notice.
3. **A LAWFUL DUPLICATE FIRES ONCE PER DISTINCT HANDLE.** Where two construction entries at one address
   carry the caller's SAME token, the store returns **that token ONCE** in the triggered set where the store
   minted it, and the registry fires **one** invocation per DISTINCT handle — **not one per occurrence, and
   not one per entry** (the store's own `DD-42` is the mint's non-collision rule and its lawful
   caller-spelled collision; this rule is the package's own reading of it).
4. **`unlisten` WITHDRAWS THE REGISTRATION, NEVER THE FUNCTION.** **Withdrawal is the STORE's; invocation is
   the PACKAGE's.** `unlisten` removes the store-side home entry; **the package's registry entry stands**,
   so a function whose handle is withdrawn **simply never fires again** — and a later re-`listen` at the same
   address mints a **DIFFERENT** handle, whose registration is a NEW registry entry. **The registry is
   released with the instance and by nothing else** (`DD-15`, `DD-17`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.2 — the supervisor's priced `K9` rule, as adopted; A1
   docs/specs/storeroom-js-proposal.md §18 · A57 — *"a handle that it returns to alert the client of the
   trigger"* | requirement]`)

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1): THE REGISTRATION SITE'S DECLARED SPELLING.**
`RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4 above stand byte-for-byte and are not restated; THIS clause is the
operative statement of the spelling the four rules' subject is reached through, and it is a PURE
INSERTION.** **THE DEFECT IT CLOSES, NAMED: `§2.4` declared a per-instance registry holding *"the caller's
FUNCTION"* and invoking it, and `parameter-semantics.md §2.12` (`PAR-JS-12`) declared the `TypeError` a
non-function registration throws — while `§2.1`'s *"no clause of this directory exposes any member of it"*
and `package.md §1.3` item 3's *"NOTHING ELSE"* left the member *"FUNCTION"* had to enter through
UNDECLARED. `acceptance.md §4.1` item 3 nevertheless demands one drive per registry rule, so no lawful input
existed for that drive and the red set's `S-REG` line was `un-run` — and `un-run` IS A FAILURE.**

**5. THE REGISTRATION SITE, DECLARED — THE ONE MEMBER OF THE PACKAGE'S OWN INSTANCE HANDLE.** **A caller
registers a listener function for a handle through the ONE member of the object `storeCreate` returned, and
the spelling is FIXED:**
```
register(handle, listener) -> undefined    // the object storeCreate returned; throws TypeError on an outside argument
```
  **(a) THE SITE IS A MEMBER OF THE INSTANCE HANDLE, AND IT IS ITS ONLY MEMBER.** **`storeCreate(cfg)`
  returns an OBJECT whose ENTIRE declared member set is `{ register }` — one own member, and NOTHING ELSE.**
  **This is the ONLY member any clause of this directory exposes on that handle, and `§2.1`'s non-exposure
  sentence is AMENDED to say exactly this** (see `§2.1`'s dated clause). **It is NOT a NINTH NAMED EXPORT of
  the entry: `package.md §1.3` item 3's *"the verbs of `surface.md §2` and the package's own instance handle
  factory — and NOTHING ELSE"* stands WHOLE, because `register` is reached through the FACTORY'S OWN
  PRODUCT and not through the module namespace.** **Neither `register` nor any other name is added to the
  entry's named exports, and `§2.9` item 1's *"`8` verbs"* count does not move.**
  **(b) ITS SIGNATURE, IN THE SAME JS SPELLING THIS SECTION'S TABLES USE.** **`register(handle, listener)`
  takes EXACTLY TWO arguments: `handle` is the OPAQUE value a verb RETURNED (the `ListenerHandle` OUTPUT
  spelling of `§1.3`, `§2.3` item 2) or the opaque value the construction ADOPTED; `listener` is the
  function of `PAR-JS-12`.** **The return is `undefined` on every success, including on a REPLACEMENT.**
  **(c) ITS DOMAIN.** **A pair (`handle`, `listener`) where `handle` is a value THIS INSTANCE minted or
  adopted — the construction's `listeners[]` entries and every handle a verb of THIS instance returned —
  and `listener` is ANY JS function.** **The registry holds AT MOST ONE function per handle (`§2.4` rule
  2), so the domain is a SET OF PAIRS keyed by the handle, never a fan-out.**
  **(d) EVERY OUTSIDE VALUE'S DECLARED ANSWER, ONE PER CLASS — and the four of them are ONE form, because
  the site is a REGISTRATION and not a CROSSING.** **A NON-FUNCTION `listener` → a JS `TypeError` at
  REGISTRATION, carrying NO `status` and NO `message` member** (`PAR-JS-12`'s declared exception; the ONE
  form this package throws that is not the store's `{status, message}`). **A `handle` THE STORE NEVER MINTED
  — a fabricated value, a value a FOREIGN instance minted, a value a PRIOR SESSION minted, a bare `string`,
  a blank token, `null`, `undefined`, a non-opaque value, or an ABSENT argument → the SAME JS `TypeError`,
  for the SAME reason: the registration site admits the handle's OPAQUE spelling and by nothing else, and
  `unlisten`'s NO-OP-SUCCESS reading of `§2.3` item 4 does NOT extend here** — **because `unlisten` names a
  WITHDRAWAL, whose in-domain answer for an unknown handle is already declared, while `register` names a
  REGISTRATION, whose argument is a member of the registry's own key set and has no such arm.** **A
  RE-REGISTRATION OF THE SAME HANDLE → SUCCESS, `undefined`, with the PREVIOUS function REPLACED and dropped
  without notice** (`§2.4` rule 2). **AND NOTHING REACHES THE STORE IN ANY OF THESE CASES: the site performs
  no store call, mints no code, appends no journal entry and changes no node** — **the `TypeError` is
  classified exactly as `PAR-JS-12`'s exception clause classifies it.**
  **(e) THE DRIVE THE ACCEPTANCE LAYER OWES, NAMED SO THE RED SET CAN BE REPAIRED FROM THIS CLAUSE ALONE:**
  **a drive reaches `register` through an instance the package returned, never through the module
  namespace; a drive distinguishing the TWO throw sites is required — `surface.md §2.5`'s `{status, message}`
  for a VERB and this item's `TypeError` for a REGISTRATION — and a `TypeError` thrown by a VERB remains a
  finding.**
  **(f) WHAT THIS ITEM DOES NOT DO.** **It adds no verb, no parameter and no store-side surface; it mints no
  code; it does not widen `§2.9`'s non-exposure of `findAddress`; and it leaves `§2.4` rules 1–4, `§2.7`'s
  firing window and `DD-15`'s *"`unlisten` withdraws the registration, never the function"* standing
  unchanged.**
  (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-15`'s *"the construction's `listeners[]`
  expressible from JS **with a drive**"* and *"the registry's owner/key/duplicate/absence rules"*;
  docs/specs/storeroom-js/parameter-semantics.md §2.12 · `PAR-JS-12`; `DD-15`; `DD-46` | requirement]`)
  **AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE A NEW SURFACE MEMBER OWES ONE:** **`register` as
  a NINTH NAMED EXPORT of the entry** — priced: it would move `§2.9` item 1's `8`-verb count and `package.md
  §1.3` item 3's *"NOTHING ELSE"*, and would make a registration reachable before any instance exists,
  which no registry rule needs; **and** a REGISTRATION THROUGH A `listen` OPTION-BAG — priced: it would
  change `listen`'s declared arity (`§2.10`'s *"`listen`'s `address` is `AddressArg`'s domain and NOTHING
  MORE"*) and would give one verb two arities. **Both are available with a fresh ruling, and the reversal
  instrument is a bounded amendment of `docs/specs/storeroom-js/`** (`[A1
  docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` — a pinned default carries a priced alternative
  | declared parameter semantics]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING `A77`:
THE ID-MATCHING MODEL, AND THE FOUR RULES ABOVE READ THROUGH IT.** `RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4
and item 5 above stand byte-for-byte and are not restated; THIS item is a PURE INSERTION, and it is the model
the registry's own rules are read through — so `§2.4` rule 4's *"a later re-`listen` at the same address mints
a DIFFERENT handle"* and `DD-15`'s same words remain read with `contract.md §2.3` item 6's narrowing, which
this item does not widen.** **THE RULING, VERBATIM:** ***"Listener passes an id back to client-side when
triggered, JS then has to match id to the function it was set with."*** (`docs/specs/storeroom-js-proposal.md`
`§18` · `A77`).

**6. THE ID-MATCHING MODEL — THE IDENTITY THE TRIGGER CARRIES, AND THE MATCH THE PACKAGE MAKES.** **SIX
CLAUSES, AND THE FOUR RULES ABOVE ARE READ THROUGH THEM** (`[A1 docs/specs/storeroom-js-proposal.md §18 ·
`A77`; A1 docs/specs/storeroom-js-proposal.md §9.2 · `A57` | requirement]`):

   **(a) THE STORE PASSES AN ID BACK WHEN A LISTENER IS TRIGGERED.** **The store — the listener's owner —
   passes an ID back to the client side when a listener's address is triggered, and the id it passes is the
   id the store returned at REGISTRATION** — **the same value, ONE identity** — **and it is carried in the
   `triggered` member of the record the verb returned (`§2.7` item 1).**

   **(b) THE JS SIDE MATCHES THAT IDENTITY TO THE FUNCTION IT WAS REGISTERED WITH.** **The package's registry
   IS the id→function map: the registration site of item 5 above takes the id as its FIRST argument and the
   function as its SECOND, so the matching is the registry's own lookup BY THAT IDENTITY AND BY NOTHING
   ELSE.** **NO ORDER IS ASSERTED** (`§2.7` item 3; `DD-22`), **and no clause of this part derives a match
   from a position in the `triggered` array.**

   **(c) AN ID THE PACKAGE HOLDS NO FUNCTION FOR FIRES NOTHING — AND THE SILENCE IS AN ASSERTABLE
   OBSERVABLE.** **No invocation, NO LOG and NO THROW: the absence of a call, the absence of any output and
   the absence of an exception are each DECLARED OBSERVABLES of that state and each may be asserted** —
   **which is the observable `§2.4` rule 1 owes, and gate 4's `JS-11` is the finding that it was unobservable
   while it went undriven** (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-11`). **The rule's own
   words are UNMOVED — *"no code, no warning, no log"* — and this clause ADDS ONLY the statement that they
   are assertable.**

   **(d) THE TWO DATA A TRIGGER CARRIES ARE SEPARATED HERE, AND EACH CELL SAYS WHICH IS WHICH.** **A trigger
   hands the JS side TWO DIFFERENT DATA:**

   | The datum | What it IS | Where it travels | What it decides |
   | --- | --- | --- | --- |
   | **THE ID** | **the matched identity — the value REGISTRATION returned**, which is the handle's OUTPUT spelling (`§2.3` item 2) | **a member of the `triggered` array** (`§2.7` item 1; `crossing.md §1.3`'s `ListenerHandle` row 2) | **WHICH function is invoked** — the registry's lookup, clause (b) |
   | **THE TRIGGERING ADDRESS** | **the address whose triggering produced the event** — the verb's own `address` argument, `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s declared invocation argument | **the invocation's ONE argument** (`§2.7` item 5) | **WHAT the invoked function is told about the trigger** — it never selects a function |

   **A CELL THAT SPEAKS OF *"the handle a trigger carries"* MEANS THE ID AND NEVER THE ADDRESS; a cell that
   speaks of *"the invocation's argument"* MEANS THE TRIGGERING ADDRESS AND NEVER THE ID.**

   **(e) THE FOUR RULES OF `§2.4` ABOVE, READ THROUGH THE MODEL — ONE LINE EACH, AND NO RULE IS RE-DECIDED.**
   **Rule 1 — an unregistered id fires nothing silently: the registry holds no function for that id, so the
   match finds none and clause (c)'s three observables hold.** **Rule 2 — a second registration for the same
   id replaces the first: the id→function map holds AT MOST ONE function per id, so a replacement CHANGES THE
   MATCHED FUNCTION AND NOT THE IDENTITY.** **Rule 3 — a lawful duplicate fires once per DISTINCT id: one
   trigger set carrying an id once matches ONE function ONCE.** **Rule 4 — `unlisten` withdraws the
   registration and never the function: the STORE-side id stops being reached, so the id the trigger carries
   is no longer the registered one, and the registry's entry — which is keyed by the OLD id — simply never
   matches again.**

   **(f) WHAT THIS ITEM DOES NOT DO.** **It adds no member, no verb and no parameter; it mints no code; it
   changes neither the shape of `triggered` nor the two member names `crossing.md §1.3`'s returned-record
   rows print; it does not widen item 5 (d)'s `TypeError` arm; and it leaves `§2.3`'s handle clause, `§2.7`'s
   firing window, `DD-22`'s no-order rule and `DD-15`'s *"`unlisten` withdraws the registration, never the
   function"* standing unchanged.**

**⟶ RECONCILED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S
CONTRACT FINDING `CF-5`: ITEM 6 (f)'s `TypeError` SENTENCE, READ THROUGH THE OPERATIVE READING ITS OWN PASS
DECLARED.** `RCA-8(d)` ANNOTATE-BESIDE: **item 6's clauses (a)–(f) above stand byte-for-byte — *"it does not
widen item 5 (d)'s `TypeError` arm"* included — and (f) is read THROUGH this clause; THIS clause is a PURE
INSERTION and it re-decides no rule of the model.** **THE DEFECT IT CLOSES, NAMED WITH ITS CELLS: (f) reads
*"it does not widen item 5 (d)'s `TypeError` arm"*, while `§2.5` item 5's clause (g), `docs/specs/storeroom-js/parameter-semantics.md
§2.12`'s second dated exception clause and `docs/specs/storeroom-js/test-cases.md`'s own `RECONCILED` clause
each REPLACE that arm's FORM with the single `{status, message}` — so two cells written by the SAME pass could
be read as contradicting each other.**

**THE TWO ARE READ AS ONE, AND THE READING IS THIS: (f) SPEAKS OF THE ARM'S DOMAIN, AND (g) SPEAKS OF THE
ARM'S FORM.** **(i) (f)'s *"does not widen"* is the DOMAIN half and it HOLDS: `A77`'s model adds no member, no
verb and no parameter, so item 5 (d)'s INPUT CLASSES — a non-function `listener`, and a `handle` this instance
never minted or adopted — are UNCHANGED, and no fifth arm is opened by it.** **(ii) THE FORM of the refusal at
that same site is `§2.5` item 5 (g)'s operative reading, and it REPLACES the as-filed `TypeError`: the
rejection travels in the single form `{status, message}`, with `status` the store's own `AddressMalformed` and
its message generated as that item declares.** **SO (f) READS, FROM THIS DATE: *"the model adds no arm to item
5 (d) and changes no input class of it"* — and NEVER *"the `TypeError` form stands at that site"*.**

**AND THE SITES THAT STILL PRINT THE AS-FILED FORM, NAMED WITH THEIR `§` BECAUSE A READER MEETS THEM BEFORE
THIS CLAUSE: `docs/specs/storeroom-js/contract.md` `§2.4` item 5 (d), `docs/specs/storeroom-js/parameter-semantics.md
§2.12`'s exception clauses, and `docs/specs/storeroom-js/acceptance.md` `§4.1` item 9 — EACH is read through
`§2.5` item 5 (g) from this date, and the re-spelling of those cells to this section's form is the NAMED
REPAIR of a later bounded amendment of this directory and never a second form declared here.**
**AND ONE NUMBERING FACT A READER NEEDS, SO THE CELL (f) IS READ WITH CANNOT BE READ AS RESOLVING TO
NOTHING:
THIS part's verbose cell IS `§2.5` item 5, and every citation in this directory that spells the verbose cell
*"`§2.5` item 6"* resolves to it — there is ONE verbose cell and ONE item 5 (g).** **AND THE TWO HOMES OF
`§2.5` CARRY DIFFERENT FIFTH ITEMS — `contract.md §2.5` item 5 is the absent-or-failed-addon state and THIS
part's `§2.5` item 5 is the verbose cell — so a BARE *"`§2.5` item 5"* is ambiguous across the two homes and
every citation of it in this directory is PATH-QUALIFIED; the renumbering of either list is the NAMED REPAIR
of a later bounded pass and no byte of either item's text moves here**
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection travels inside the one form and
`A76`'s reach clause licenses no second form; A1 docs/specs/storeroom-js-proposal.md §18 · `A77` — the model's
own reach; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (g) — the operative reading this clause reads
(f) through | state or fail-state declaration]`).

**⟶ RECONCILED 2026-10-11 — THE BLIND GREENS PASS (`role_spec_writer`), CLOSING THE RECORDED TENSION AT
`archive/gate5/storeroom-js-greens-run.md` §4 (*"THE TENSION THE SET DID NOT ASSERT"*): `§2.4` RULE 3's *"the
store returns that token ONCE"* AGAINST THE STORE'S `DD-42` CLAUSE.** `RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4,
item 5 and item 6 whole — clauses (a)–(f) included, and this part's own earlier dated clauses — stand
byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it re-spells no rule, adds no
member and mints no code.**
**THE AS-FILED SENTENCE, NAMED AS FILED, BECAUSE TWO DOCUMENTS PRINT TWO COUNTS FOR ONE STATE:** ***"Where two
construction entries at one address carry the caller's SAME token, the store returns **that token ONCE** in the
triggered set where the store minted it, and the registry fires **one** invocation per DISTINCT handle — not
one per occurrence, and not one per entry"*** (`§2.4` rule 3, second sentence) — **while the store's own
`DD-42` clause declares, for the same caller-spelled duplicate, that `triggered` carries that token TWICE**
(`docs/specs/storeroom-native/contract.md` §0.2 · `DD-42`; its clause (2) at that contract's `§0.4`, the
mint's-own-rule clause; `write-and-read.md` §6.5 item 12 (b)'s *"ADOPTED VERBATIM"*). **BOTH COUNT WHAT THEY
COUNT, AND WHICH CLAUSE GOVERNS WHICH CASE IS STATED HERE ONCE:**
- **CASE A — ONE IDENTITY IS REACHABLE ONCE (ONE HOME ENTRY, ONE ANCHOR, ONE RETURNED ID), which is EVERY case
  in which THE STORE MINTED THE TOKEN: rule 3's *"once"* governs, and it holds in BOTH of its halves — the
  returned set carries the one identity ONCE and ONE invocation follows.** **AND REACHABILITY, NOT LUCK, IS
  WHY: the mint runs its non-collision rule BEFORE it hands the token out, so one mint can never produce two
  identities and one identity can never be held by two minted entries** (`DD-42` clause (1); the store's
  `§0.4`'s mint clause; `write-and-read.md` §6.5 item 12 (c)'s address-level idempotence).
- **CASE B — TWO ENTRIES CARRY ONE TOKEN BY THE CALLER'S OWN ACT (two `listeners[]` entries at one address,
  the caller's SAME token in both): THE STORE'S DECLARATION GOVERNS THAT ARRAY, and in that state the store
  `triggered` list carries the token TWICE** — **the construction is a POPULATION step that ADOPTS the
  caller's tokens verbatim and keeps BOTH entries, so one token has two occurrences to return** (`DD-39`;
  the store's `§0.4` clause 2 (b); `write-and-read.md` §6.5 item 12 (b)).
**AND RULE 3's *"one invocation per DISTINCT handle"* IS RECONCILED WITH IT, NOT AGAINST IT — THAT IS THE
READING, AND IT SPLITS THE SENTENCE INTO ITS TWO INDEPENDENT OBSERVABLES:**
- **(i) THE INVOCATION COUNT — ONE PER DISTINCT IDENTITY, AND IT IS THE PACKAGE'S OWN RULE.** One identity
  invoked ONCE, however many occurrences carry it: **an array carrying ONE DISTINCT identity yields ONE
  invocation, never one per element and never one per entry** — **so in CASE B the duplicate token's ONE
  function runs ONCE** (`§2.4` rule 3; `§2.4` item 6 (b)–(e)).
- **(ii) THE ARRAY'S ELEMENT MULTIPLICITY — THE STORE'S OWN DECLARED LIST, CARRIED OUT FAITHFULLY AND NOT
  DEDUPLICATED AT THE BOUNDARY.** **`triggered` crosses as a fresh JS array of the handles the store's own
  list carries (`§2.7` item 1), and `crossing.md §1.3`'s returned-record rows carry the members ELEMENT FOR
  ELEMENT** — **so in CASE B THE JS-OBSERVABLE `triggered` CARRIES THE TOKEN TWICE, and a drive may assert the
  array's LENGTH (`2`) and its DISTINCT-identity count (`1`) TOGETHER; `§2.7` item 3's *"no order is asserted"*
  is UNMOVED by either figure** (`PAR-JS-15`; `§2.7` item 3; `docs/specs/storeroom-js/crossing.md` §1.3's
  returned-record rows).
**AND ONE DIVERGENCE IS NAMED RATHER THAN SMOOTHED, BECAUSE THIS PASS MEASURES A BUILD AND NOT A READING: THE
SHIPPED ARTEFACT DEDUPLICATES AT THE BOUNDARY.** **`bindings/js/index.mjs`'s `wrapHandles` pushes each token's
handle into its output AT MOST ONCE and reads rule 3's *"one DISTINCT handle per token, however many home
entries carry it"* as the list's OWN distinctness rule — so the shipped JS-observable `triggered` carries
CASE B's token ONCE where (ii) above reads the store's list as carried faithfully TWICE.** **THE DECLARED
READING OF THIS CLAUSE IS (ii); THE SHIPPED COLLAPSE IS THE PRICED ALTERNATIVE BELOW, and WHICH SIDE THE
DIVERGENCE SITS ON IS FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE TO SAY — this clause declares the
reading and takes no finding against either side.** **AND THE INVOCATION IS UNAFFECTED EITHER WAY: the shipped
`deliver` iterates whatever the array carries and the registry holds AT MOST ONE function per identity, so ONE
identity invokes ONE function ONCE under BOTH readings** (`§2.4` rules 2–3; `bindings/js/index.mjs`'s
`wrapHandles`/`deliver`; `P-SM-5`).
**AND THE ALTERNATIVE, PRICED BECAUSE A DEFAULT THIS PASS TAKES OWES ONE: THE BOUNDARY COLLAPSES DUPLICATE
TOKENS AT HANDOFF — `triggered` carrying ONE member per DISTINCT identity, and *"a count of DISTINCT handles"*
read as a rule about the ARRAY rather than about the COUNT.** **Priced: it needs a DEDUPLICATION CLAUSE with
its own observable, and `parameter-semantics.md §2.15`'s OUTSIDE-value list already names *"a duplicated
member"* while the store's own contract declares that same member for the caller-spelled duplicate — so the
alternative is available only as a bounded amendment that says WHICH list it collapses and cites the store's
row it narrows, AND WHOSE REVERSAL INSTRUMENT IS THAT AMENDMENT ITSELF AND NEVER A PARK; the declared reading
(ii) reverses against the store-side amendment `DD-42`/`DD-39` already name.** `A66` — no park is named as
either instrument.
**AND NO RULE IS RE-DECIDED HERE: rule 1 (an unregistered id fires nothing silently), rule 2 (a second
registration replaces the function and not the identity), rule 4 (`unlisten` withdraws the registration and
never the function) and `§2.7`'s window, order and throwing-body clauses stand exactly as printed; the
register keeps its `8` rows, every failure list unmoved — `P-SM-5`'s *"a duplicate token that fires twice per
distinct handle"* and `P-TP-8`'s *"a duplicate member where the store minted the token"* stay FALSE of every
lawful state — and the cells this clause reads through are named: `JSG-08.19` (the one-identity case) and
`JSG-08.21`/`JSG-08.22` (the distinct-identity count), with the array's own length the one figure neither
scenario asserts** (`archive/gate5/storeroom-js-greens-run.md` §4's tension; `docs/specs/storeroom-js-greens.md`
§2 · `JSG-08`'s named tension).
(`[A1 docs/specs/storeroom-js-proposal.md §9.2 — the registry's four rules as adopted; A1
docs/specs/storeroom-js-proposal.md §18 · `A57` · `A77`; A3 docs/specs/storeroom-native/contract.md §0.2 ·
`DD-42` and `DD-39` — the store's own two declarations; A3 docs/specs/storeroom-native/contract.md §0.4
clauses 1–2 with its mint clause; A3 docs/specs/storeroom-js/crossing.md §1.3's returned-record rows; A3
docs/specs/storeroom-js/parameter-semantics.md §2.15; A3 archive/gate5/storeroom-js-greens-run.md §4 |
declared parameter semantics]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED COMBINED REPAIR (`role_spec_writer`), CLOSING `CF-DUP-3`: THE DELIVERY
WINDOW'S RECIPIENT SET, AND THE ARGUMENT THAT MAKES THE READING NON-ARBITRARY.** `RCA-8(d)` ANNOTATE-BESIDE:
**every byte above stands byte-for-byte — `§2.4` rules 1–4, item 5, item 6 and this section's own dated clause
included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it re-decides no rule, adds
no member, no verb and no parameter, mints no code, moves no register row and names no park.**

**THE FINDING IT CLOSES, NAMED WITH ITS CORNER AND ITS TWO HOMES ON FILE.** **`CF-DUP-3` — THE IN-DELIVERY
REGISTRATION CORNER — STANDS `OPEN` AS AN UNPINNED CORNER at `docs/pending.md`'s own `CF-DUP-3` clause and at
the red set's `§13.6` (`archive/gate3/storeroom-js-red-set.md` `§13` row `1` and `§13.6`); the corner and the
argument are written out at `docs/open-items-review.md` `§2-bis`, and the cell that opened it is this
section's own dated clause (i), which fixes the invocation count as ONE PER DISTINCT IDENTITY and does NOT
SAY whether an identity REGISTERED DURING THE SAME DELIVERY WINDOW — by an earlier listener's own body, which
holds the instance — is invoked at its second occurrence in the array the delivery is walking.** **ITS
DISPOSITION CELL IS THE TRACKER'S AND NOT THIS PASS'S: `docs/pending.md` is OUTSIDE this pass's edit scope and
its row owes a dated closing clause naming this one; THAT LANDING IS NAMED FOR THE SUPERVISOR AND IS NOT
WRITTEN HERE.** **The red set's own revisit conditions (a) and (b) — a clause at `§2.4`'s dated clause (i), or a
clause at `parameter-semantics.md §2.12`'s registration cell — are the two this pass satisfies: (a) HERE, and
(b) by the pointer clause that row now carries.**

**THE RULE, DECLARED — A DELIVERY WINDOW'S RECIPIENT SET IS READ WHEN THE WINDOW OPENS.** **THE RECIPIENT SET
OF A DELIVERY IS READ FROM THE ARRAY AS IT STANDS WHEN THE WINDOW OPENS, AND A REGISTRATION, A REPLACEMENT OR
A WITHDRAWAL MADE *DURING* THE WINDOW TAKES EFFECT AT THE NEXT TRIGGER.** **So an identity whose function was
absent when the delivery began is NOT invoked at this delivery's later occurrence of it, however many
occurrences the array carries and wherever in it they stand; and an identity whose function is registered
between the delivery's first and second elements does not enter the delivery in flight.** **THE WINDOW IS
THIS SECTION'S `§2.7` ITEM 2'S — THE INVOCATION IS THE CALLER'S AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS
RETURNED — and the set is read at that moment and at no later one.**

**THE ARGUMENT, CARRIED BECAUSE IT IS WHAT MAKES THE READING NON-ARBITRARY AND NOT MERELY THE SHIPPED ONE.**
**THE STORE DECLARES THE ORDER IN WHICH `triggered` RETURNS ITS MEMBERS UNOBSERVABLE** — **no clause of this
unit asserts it, `§2.7` item 3 asserts MEMBERSHIP ONLY, and `DD-22` declares that a drive compares SETS and
never sequences, so the blind and live sets are forbidden from asserting it** (`docs/specs/storeroom-native/contract.md`
`§6.5` item 5's *"NO ORDER IS DECLARED FOR THE LIST"*; `DD-22`). **A RULE THAT MADE THE INVOCATION DEPEND ON
WHETHER A REGISTRATION LANDED BEFORE OR AFTER THE ARRAY'S SECOND ELEMENT WOULD THEREFORE MAKE AN OBSERVABLE —
WHETHER THE LISTENER FIRES — DEPEND ON AN UNOBSERVABLE: WHERE IN THE ARRAY THAT SECOND ELEMENT HAPPENS TO
STAND.** **That is a direct contradiction of the order-unobservability rule the same contract declares, so the
alternative reading cannot hold, and THE ONLY READING CONSISTENT WITH THE REST OF THE CONTRACT IS THIS ONE: a
delivery's recipient set is determined from the array as it stands when the delivery begins, and a
registration made during it takes effect at the NEXT trigger.** **A drive may therefore assert the reading at
the observable pair it fixes: an identity registered only from inside one listener's body, standing in the
SAME delivery's array a second time, is NOT invoked in that delivery, and IS invoked at the next trigger whose
array carries it.** **AND IT IS ASSERTABLE WITHOUT REACHING FOR AN ORDER: the drive asserts which identities
were INVOKED and at WHICH trigger, never where in an array they stood.**

**AND THE SYMMETRIC CASES, STATED SO NO READER TAKES *"a registration"* AS THE ONLY ARM: a `replace` made during
the window — a second registration for a handle the registry already holds a function for (`§2.4` rule 2) —
DOES NOT REACH BACK INTO THE DELIVERY IN FLIGHT: THE FUNCTION INVOKED AT THIS DELIVERY'S OCCURRENCE IS THE ONE
THE REGISTRY HELD FOR THAT IDENTITY WHEN THE WINDOW OPENED, and the replacement's function is what a LATER
trigger invokes. A `unlisten` made during the window — a withdrawal of the store-side home entry (`§2.3` item
4) — DOES NOT CANCEL AN INVOCATION THE CURRENT DELIVERY HAS NOT YET MADE and does not withdraw the package's
registry entry, which `§2.4` rule 4 holds; the withdrawal's effect is that a LATER trigger no longer carries
that id, so the function whose handle was withdrawn simply never fires again.** **SO ALL THREE ARMS — a
registration, a replacement and a withdrawal — take effect at the NEXT trigger, and NONE of them rewrites the
delivery in flight.**

**AND THE TWO THINGS THIS CLAUSE IS NOT, EACH PRINTED BECAUSE A NEW READING OWES BOTH.** **(1) IT IS NOT A
`deliver` CHANGE, AND NONE IS OWED OR RECOMMENDED: the shipped `deliver` reads the array's DISTINCT IDENTITIES
into a `Set` as it walks and consults the registry per distinct identity, so the recipient set it uses is the
one read when the window opened — the reading declared here is the reading the build holds, and this clause
CONVERTS an implementation reading into a CONTRACT one and changes no byte of `bindings/js/**`**
(`bindings/js/index.mjs`'s `deliver`; `archive/gate3/storeroom-js-red-set.md` `§13.6`'s *"the reading is the
implementation's and not the contract's"*, which this clause answers). **(2) IT ADDS NO OBSERVABLE, NO MEMBER
AND NO ORDER: the array's element multiplicity and the invocation count stay the TWO independent observables
this section's dated clause already carries, `§2.7` item 3's *"no order is asserted"* is UNMOVED, `§2.4` rule 1
(the unregistered id's silence), rule 2 (the replacement), rule 3 (one invocation per distinct identity) and
rule 4 (`unlisten` withdraws the registration, never the function) each stand exactly as printed, and the
register keeps its `8` rows with every failure list unmoved.** **AND THE `alt` THIS DECLARATION CARRIES, PRICED
BECAUSE A PINNED DEFAULT OWES ONE: THE OCCURRENCE-ORDERED READING** — an occurrence is skipped only if that
identity has ALREADY been invoked in this delivery, so an identity whose registration arrives mid-window IS
invoked at its later occurrence. **Priced: it makes the invocation depend on the array's order — an
UNOBSERVABLE the store declares and no set may assert — so it cannot be stated as a property, it cannot be
driven without asserting an order, and it would silently change what a caller observes at a moment no clause
fixes. Available only with a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row,
followed by a bounded amendment of `docs/specs/storeroom-js/`; the reversal instrument is that amendment and
NEVER A PARK** (`A66`).
(`[A3 docs/specs/storeroom-js/surface.md §2.7` item 3 — the membership-only rule this clause's argument rests
on; A3 docs/specs/storeroom-js/surface.md `§2.4` rules 1–3 and item 6 (b) — the registry arms the three
symmetric cases are read at; A3 docs/specs/storeroom-native/contract.md `§6.5` item 5 — *"NO ORDER IS DECLARED
FOR THE LIST"* — with `DD-22`; A1 docs/specs/storeroom-js-proposal.md `§18` · `A77` — the id-matching model the
recipient set is a set OF; A3 docs/specs/storeroom-js-proposal-review.md `§5.4` · `AR-12` — a pinned default
carries a priced alternative | state or fail-state declaration]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: WHICH HALF OF THIS SECTION'S `CF-DUP-3` CLAUSE IS THE FIRING AND
WHICH IS THE DELIVERY, AND WHERE EACH HALF NOW LIVES.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands
byte-for-byte — `§2.4` rules 1–4, item 5's lettered clauses, item 6's model clauses (a)–(f), this section's own
two earlier dated clauses and the `CF-DUP-3` clause's own text — and they are read THROUGH this clause; THIS
clause is a PURE INSERTION, it re-decides no rule, adds no member, no verb and no parameter, mints no code,
moves no register row and names no park.** **THE RULING, VERBATIM:** ***"Listener behavior is part of
store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**AND THE RULING'S OWN CONSEQUENCE, STATED FOR THIS SECTION FIRST BECAUSE THIS SECTION NAMED THE FINDING:**
***"THE `CF-DUP-3` RULE THE LAST PASS FILED AT `surface.md §2.4` IS RE-HOMED BY THIS RULING: when a
REGISTRATION takes effect is a property of the STORE's listener surface (the home's own state at the moment a
trigger is computed), so its home is the STORE's listener clause, with the package's delivery carrying only
the consequence — that the window's recipient set is read from the array as it stands, which is the
delivery-side half and stays at `§2.4` as a POINTER."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).

**THE FIRING/DELIVERY LINE, DRAWN ONCE AND FOR THIS WHOLE PART, BECAUSE THE RULING'S POINT IS THAT A READER
FINDS IT WHERE THE RULE IS:**
1. **THE FIRING IS THE STORE'S, AND THIS PART IS NEVER ITS HOME.** **WHICH listener fires · WHEN it fires ·
   WHAT it is bound to · WHICH ids a trigger returns · the home's registration semantics (`listen` and
   `unlisten`) · the address-prefix rule · the process-scoped handle — EACH is STORE BEHAVIOUR**, **declared at
   `docs/specs/storeroom-native/write-and-read.md §6.5` items 8–13 and completed there by its item 14, which
   states the authority itself and the registration's effect timing relative to a trigger.**
2. **THE DELIVERY IS THIS UNIT'S, AND IT IS THE WHOLE OF WHAT THIS UNIT OWNS HERE.** **THE id→FUNCTION REGISTRY
   (rules 1–4 above, and item 5's registration site and its domain) · THE INVOCATION (its timing, its count per
   distinct identity, its one argument, and a throwing body's disposition — `§2.7`) · AND THE FAILURE FORM
   (`§2.5`) — EACH IS THIS SECTION'S AND STAYS.** **THIS PART MAY ADD A DELIVERY RULE AND MAY NEVER BE THE HOME
   OF A FIRING RULE.**
3. **AND THE ONE PHRASE THIS SECTION'S `CF-DUP-3` CLAUSE USED THAT NAMES A FIRING TERM IS NOW READ AS A
   POINTER, SO NO SECOND HOME ARISES: *"a delivery window's recipient set"* IS READ AT ITS OWN TWO HALVES.**
   **(i) THE STORE'S HALF — WHAT THE TRIGGER'S RETURNED SET CONTAINS — IS THE STORE'S RULE:** **what a
   `triggered` member contains is what the ONE HOME held when the trigger was computed, so a `listen` or an
   `unlisten` that lands after that computation takes effect at the NEXT trigger, and the returned set is
   FIXED AT THE MOMENT OF ITS COMPUTATION** (`docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)
   and its (e), where the two symmetric cases are stated; that section's item 11 and `§3.6`/`§4.4` for the
   member itself). **(ii) THIS UNIT'S HALF — WHAT THE PACKAGE DOES WITH THE LIST IT HOLDS — IS THIS
   SECTION'S:** **the package receives a `triggered` list, performs its invocation AFTER the verb has
   returned (`§2.7` item 2), and the recipient set it actually invokes is the set IT HOLDS, read ONCE per
   distinct identity** — **so an identity whose function was absent when the package read the list is not
   invoked at a later occurrence in the same list, and an identity registered between two occurrences of one
   list is not invoked in that list; both take effect at the NEXT trigger** (`§2.4` rules 1–3; `§2.4` item 6
   (b)–(e)).
4. **THE THREE SYMMETRIC ARMS THIS SECTION'S EARLIER DATED CLAUSE PRINTS ARE SPLIT THE SAME WAY, AND NEITHER
   HALF IS RE-DECIDED HERE — ONE LINE EACH, BECAUSE A BOUNDARY A READER CANNOT FIND IS NOT A BOUNDARY.**
   **(a) A REGISTRATION MADE DURING THE WINDOW — `register(handle, listener)` on an instance the caller
   holds — IS A REGISTRY ACTION AND IS *THIS UNIT'S*;** **its arrival inside a window is read at (ii) above,
   and its effect on WHICH HANDLES the window's list carries is not a question of the registry at all, because
   the list is the store's and was computed before the window opened** (that section's item 14 (d)). **(b) A
   WITHDRAWAL MADE DURING THE WINDOW — `unlisten` — IS *THE STORE'S* (rule 4 above; `§2.3` item 4).**
   **(c) A REPLACEMENT MADE DURING THE WINDOW — a second `register` for one identity — IS *THIS UNIT'S*
   (rule 2 above);** **it does not reach back into a window already in flight, and the function a LATER
   trigger reaches is the registry's at that later moment.**
5. **NOTHING ELSE OF THIS SECTION MOVES, NAMED SO THE RE-HOMING'S SCOPE IS NOT OVER-READ: rules 1–4 are THIS
   unit's four DELIVERY rules and stand exactly as printed, each of their observables unchanged; item 5's
   site, signature, domain and every outside-value answer stand; item 6's six clauses stand; `§2.7`'s window,
   order and throwing-body clauses stand; the register keeps its `8` rows with every failure list unmoved; and
   no `DD` row, no `PAR-JS` row and no part entry is authored, renumbered or dropped by this clause.**

**AND THE ONE CELL OF THIS SECTION THAT CHANGES WHAT IT DOES, STATED PLAINLY SO NO READER HUNTS FOR IT:** **the
`CF-DUP-3` clause's *"THE RULE, DECLARED"* paragraph — which fixed the recipient set's reading and carried the
argument for it — IS NOW THIS PART'S POINTER TO `docs/specs/storeroom-native/write-and-read.md §6.5` item 14,
where the same rule, the same three arms and the same argument stand as a rule of the STORE's listener
surface.** **The clause's own words stand above byte-for-byte and are READ AS THAT POINTER; its argument is
UNCHANGED and is NOT re-derived here, because a re-derivation would be a second home** (`docs/pending.md`'s
`CF-DUP-3` clause, whose revisit condition (a) named exactly this clause and whose PINNED state stands; the
red set's `§13.6`).
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78` — *"Listener behavior is part of store."*, and its own
`CF-DUP-3` re-homing sentence, re-emitted above; A3 docs/specs/storeroom-native/write-and-read.md §6.5 items 8–14
— the store's listener clauses, each at its own line; A3 docs/specs/storeroom-js/surface.md §2.4 rules 1–4 and
item 6 — the delivery rules left standing; A3 docs/specs/storeroom-js/surface.md §2.7 items 1–5 — the delivery's
own window and argument | requirement]`).

**⟶ ADDED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`), ON THE ARCHITECT'S RULINGS
***"Use S-1, `off` can deregister, and always validate"***: `§2.4`'s SEVENTH ITEM — THE TWO NEW INSTANCE MEMBERS'
OWN CLAUSES.** `RCA-8(d)` ANNOTATE-BESIDE: **rules 1–4 above, item 5, item 6 and every dated clause of this
section stand byte-for-byte and are read THROUGH this item; THIS item is a PURE INSERTION — it adds no `§`-number,
no strategy id and no register row, it moves no rule of the four, and it re-decides nothing this section already
declares.** **THE RULINGS, VERBATIM:** ***"Use S-1"*** · ***"`off` can deregister"*** · ***"always validate"***
(`docs/specs/storeroom-js-proposal.md` `§8` · **`A79`** · **`A80`** · **`A81`**). **THE CONSTRAINTS THESE CLAUSES
OBEY, EACH AT ITS OWN RULING:** **`A76`** (validate first, never repair, reject verbosely, inside the ONE form) ·
**`A77`** (id-matched delivery) · **`A78`** (the firing is the store's) · **`A74`** (no release verb).

**7. THE TWO NEW MEMBERS — `on(address, listener)` AND `off(handle)` — THEIR SIGNATURES, THEIR DOMAINS, THEIR
ANSWERS, AND THE ONE BOUNDARY THEY MAY NOT CROSS.** **They are members of the object `storeCreate` returned,
beside `register`; the module namespace stays at the eight declared verbs and the store's own `listen`/`unlisten`
stay un-overloaded** (`§2.1`'s dated clause).
```
on(address, listener) -> handle      // the store's own `listen`, then the registry's registration; throws {status, message} on refusal
off(handle)           -> undefined   // the store-side withdrawal, then the PACKAGE'S OWN registry removal; throws {status, message} on refusal
```

   **(a) `on` — VALIDATE FIRST, THEN ADMIT, IN ONE FIXED ORDER, SO ATOMICITY IS A CONSEQUENCE AND NOT A
   ROLLBACK.** **IT VALIDATES THE `address` AND THE `listener` FIRST AND ADMITS NOTHING UNTIL BOTH HAVE PASSED,
   and the validation's own order is `crossing.md §1.7`'s: THE CLASS IS DECIDED FIRST, ON THE VALUE AS IT IS —
   before any conversion, before any `Array.isArray`-style shortcut, never deferred and never revisited after a
   coercion — THE SHAPE IS TESTED SECOND against the permitted set, and ADMIT OR REFUSE IS THIRD.** **NOTHING IS
   REPAIRED** (`crossing.md §1.8`). **AND ONLY THEN, IN THIS ORDER AND NO OTHER, THE TWO ADMISSIONS LAND:**
```
on(address, listener):
  1. VALIDATE   address against AddressArg's domain, listener against the function class   // class first, never repaired
  2. LISTEN     the store's own listen(instance, address)                                   // the store's home gains the entry, or returns the entry already held
  3. REGISTER   the package's registry takes the returned handle with this listener          // §2.4 rule 2 governs a replacement
```
   **SO A REFUSED `address` OR A REFUSED `listener` LEAVES NO STORE-SIDE HOME ENTRY, NO REGISTRY ENTRY, NO NODE
   MINTED AND NO JOURNAL ENTRY APPENDED** — **the refusal happens at step 1, and steps 2 and 3 never run: the
   call is refused BEFORE any admission, which is `A76`'s atomicity obtained by the validation's POSITION rather
   than by an `unlisten` rollback** (`A76`; `A81`).
   **⟶ AND THE ORDER THAT WALK OWES IS DECLARED HERE, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
   (`role_spec_writer`), CLOSING THE CONTRACT FINDING THE HOST-FIX PASS FILED AGAINST THIS STEP.**
   `RCA-8(d)` ANNOTATE-BESIDE: **the step list, the atomicity clause and every byte of item 7 (a) above stand
   byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no step to the
   three, adds no member, no verb and no parameter, mints no code and moves no register row.** **THE DEFECT IT
   CLOSES, NAMED WITH ITS STEP: step 1 reads *"VALIDATE `address` against `AddressArg`'s domain, `listener`
   against the function class — class first, never repaired"*, and the step below it names `crossing.md
   §1.7`'s order (class, then shape, then admit-or-refuse) — BUT NEITHER STATES THAT THE CLASS DECISION COMES
   FIRST *BEFORE THE SHAPE TEST AND BEFORE ANY ELEMENT OR LENGTH READ*, and `A81`'s *"always validate"* is
   therefore read at this step only as far as the word *"first"* reaches.** **THE ORDER THE WALK OWES, IN ONE
   CLAUSE, SO THE NEXT READER CANNOT RE-DERIVE A WALK THAT READS BEFORE IT DECIDES:**
   1. **THE CLASS DECISION COMES FIRST, ON THE VALUE AS IT IS — AND THE `Proxy` REFUSAL IS PART OF THAT
   DECISION, NOT BESIDE IT.** **For the `address` at position `1` of `2`: a value that is a `Proxy` is refused
   `AddressMalformed` as `AddressArg` row 12's own class (`DD-34`), BEFORE the shape test, BEFORE
   `Array.isArray`, BEFORE any `.length` read and BEFORE any element is read** — **because `util.types.isProxy`
   or its equivalent reads no member and invokes no handler, while `Array.isArray` and `getPrototypeOf` on a
   trap-carrying `Proxy` RUN ITS TRAPS: a `getPrototypeOf` trap that throws would raise a RAW HOST ERROR out
   of `on`, which clause (e) below declares a FINDING and never a rejection, and a `get` trap's side effects
   would run for an argument the contract refuses without reading it at all.**
   2. **THE SHAPE TEST COMES SECOND, AND ONLY A VALUE WHOSE CLASS THE FIRST STEP HAS ALREADY ANSWERED ABOUT
   IS TESTED: `Array.isArray` and the array-vs-class question follow the class decision and never precede
   it** (`crossing.md §1.7`; `§1.3`'s `AddressArg` rows 1, 11 and 12).
   3. **ADMIT-OR-REFUSE COMES THIRD, and every element read, every `.length` read and the `listener`
   position's own test are reached ONLY for a value the first step has admitted.**
   **THE SAME ORDER BINDS THE `listener` AT POSITION `2` OF `2` AND THE `handle` AT `off`'s POSITION `1` OF
   `2`: each carries its own class decision first, and each is read from only after it.** **AND ONE THING THIS
   ORDER IS NOT: it is not a second declaration of `crossing.md §1.7` — that subsection declares the order for
   EVERY JS value and EVERY argument, and THIS clause states what `on`'s own step 1 OWES under it, so a walk
   that reads before it decides is a FINDING at this item and not a reading of either clause.** **AND NOTHING
   ELSE OF THIS ITEM MOVES: the two admissions' order is unmoved, the atomicity obtained by the validation's
   position is unmoved, the two arms' table, item 5's site, item 6's model and `§2.4`'s four rules stand exactly
   as printed, and the register keeps its `8` rows with every failure list unmoved.**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A81` — *"always validate"*, at its own step; A1
   docs/specs/storeroom-js-proposal.md §18 · `A76` — the class decided first and the code from the class;
   A3 docs/specs/storeroom-js/crossing.md §1.7 — the order this step owes, and §1.8 — the no-repair
   prohibition; A3 docs/specs/storeroom-js/crossing.md §1.3's `AddressArg` rows 1, 11 and 12 — the shape and
   class rows at the address position | requirement]`). **AND THIS IS THE ONE PLACE THE COMBINED CALL IS MORE THAN
   SUGAR: it makes the two admissions atomic as a property of the order, and an implementation that reached the
   store first and withdrew on refusal is a FINDING of this item.**
   **ITS RETURN IS THE HANDLE.** **`on` returns the package's OPAQUE handle — the OUTPUT spelling of `§2.3`
   item 2 — and at an address the store's home ALREADY HOLDS it returns THAT ADDRESS'S EXISTING HANDLE, because
   the store's own address-level idempotence makes a repeat `listen` mint nothing and answer the entry's own
   handle** (`write-and-read.md §6.5` item 12 (c); `contract.md §2.3` item 6; `§2.3`'s dated clause).
   **AND IT REPLACES.** **Where the identity `on` returns is one the registry already holds a function for, THE
   REGISTRY'S FUNCTION IS REPLACED and the previous function is dropped without notice — ONE IDENTITY, ONE
   FUNCTION** (`§2.4` rule 2). **SO THE TWO ARMS OF `on` ARE THESE AND NO OTHERS, EACH WITH ITS OWN OBSERVABLE:**

   | The arm | Its pre-condition | Its observable |
   | --- | --- | --- |
   | **the FRESH arm** | the address's store-side home entry did not exist | **the store minted a token, the package wrapped it, and the registry holds the listener under it — a later trigger under that address invokes THAT function once** |
   | **the HELD arm** | the address is ALREADY registered, so the store's `listen` mints nothing and returns the existing entry's handle | **the SAME opaque value two `on` calls at one address return, and the registry's function for it is the SECOND listener — a later trigger invokes the REPLACEMENT once, and the replaced function never fires again** |

   **(b) `off` — VALIDATE FIRST, THEN WITHDRAW AND DEREGISTER; AND THE RECONCILIATION WITH RULE 4, STATED SO NO
   CONTRADICTION IS READ.** **IT VALIDATES THE `handle` FIRST, the same way — class first, on the value as it is,
   never repaired — and only then performs the two removals, in this order:**
```
off(handle):
  1. VALIDATE    handle against this instance's own handle domain          // class first, never repaired
  2. UNLISTEN    the store's own unlisten(instance, handle)                // the STORE-facing withdrawal (§2.3 item 4)
  3. DEREGISTER  the package's own registry entry for that identity         // the PACKAGE'S OWN state (§2.4 rule 2's map)
```
   **AND THE RECONCILIATION, IN THE TERMS `A80` USES, BECAUSE IT IS THE WHOLE OF WHAT THIS ITEM MUST NOT LEAVE
   AMBIGUOUS: `unlisten(handle)` KEEPS RULE 4 VERBATIM — the STORE-SIDE WITHDRAWAL ONLY, with the registry's
   entry STANDING — and `off(handle)` is A DIFFERENT, PACKAGE-OWNED VERB that performs the store-side
   withdrawal AND removes the PACKAGE'S OWN registry entry. RULE 4 IS THEREFORE SUPPLEMENTED, NOT EXCEPTED: it
   constrains the store-facing `unlisten`, while `off` acts on the package's own state, WHICH NO STORE RULE
   GOVERNS.** **The asymmetry the contract declares survives EXACTLY AS WRITTEN — `unlisten` never removes a
   function — and `off` is the declared way to remove one.** **A reader who takes `off` as an exception to rule
   4 has read a second withdrawal into the store's surface; there is none, and `rule 4`'s four words *"withdraws
   the registration, never the function"* stand unmoved at `§2.4` rule 4 and at `contract.md §2.4` rule 4.**
   **ITS RETURN IS `undefined` ON EVERY SUCCESS, including on every arm below.** **AND ITS ARMS, EACH WITH ITS
   OBSERVABLE:**

   | The arm | Its pre-condition | Its observable |
   | --- | --- | --- |
   | **the OWN arm** | the handle is one THIS INSTANCE minted or adopted, and the registry holds a function for it | **the store-side home entry is withdrawn, the registry's entry for that identity is REMOVED, and `undefined` is returned — a later trigger no longer carries that identity, and there is no registry entry left to match it** |
   | **the OWN-ENTRYLESS arm** | the handle is one THIS INSTANCE minted or adopted, and the registry holds NO function for it (it was registered never, or it was already withdrawn) | **`undefined`: nothing is removed that was not there, the store-side withdrawal is performed, and NO OTHER REGISTRATION IS DISTURBED** (`§2.4` rule 4's *"the registry is released with the instance and by nothing else"* is a statement about the INSTANCE and not about one entry, and it stands) |
   | **the OUTSIDE arm** | the handle is NOT one this instance minted or adopted | **`AddressMalformed` in `§2.5`'s single form, and NEITHER removal is performed** — **this is the arm that makes `off` differ from `unlisten` over one value, and the difference is DECLARED and not incidental** (`§2.3`'s dated clause, clause 3; `parameter-semantics.md §2.8`'s dated clause) |

   **AND `off` REMOVES NO MORE THAN THE HANDLE NAMES: a lawful sibling registration — another address's entry,
   another identity in the same instance — STANDS, and a drive that finds a sibling registration removed by one
   `off` has found a failure of this item.**
   **AND `off` DOES NOT CANCEL A DELIVERY IN FLIGHT, BECAUSE THE DELIVERY'S RECIPIENT SET IS READ WHEN THE
   WINDOW OPENS: a `off` made during a window takes effect at the NEXT trigger and removes neither an entry nor
   an identity the current delivery has already read** (`§2.4`'s `CF-DUP-3` clause and its re-homing clause,
   clause 4; `write-and-read.md §6.5` item 14). **AND THE ORDER OF THE TWO REMOVALS WHEN THE STORE REFUSES —
   whether the registry's entry is removed before or after the store-side withdrawal is attempted, in the one
   case where the store's own `unlisten` answers a malformed argument's shape — IS A DECLARED DEFAULT AND NOT A
   SILENCE: it is `DD-54`.**
   **AND ONE ARM THIS ITEM NAMES SO IT IS NOT DISCOVERED: a function whose identity was registered through
   `register` DIRECTLY and then withdrawn by `off` is removed by `off` — the registry holds AT MOST ONE function
   per handle and does not record which member put it there (`§2.4` rule 2). THE ONE RESIDUAL `A80` LEAVES — a
   NEW function offered by `on` at a HELD address whose entry was placed by `register` — IS `DD-52`.**

   **⟶ AND THIS ITEM'S OWN ARM IS NARROWED TO THE STATES THE STORE CAN DELIVER, LANDED 2026-10-11 BY THE
   BOUNDED CLOSE-OUT PASS (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **the item's three steps, its
   reconciliation with rule 4, its three-arm table — the OWN arm's row included — and every byte of item 7
   (b) above stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no
   arm to the table, no member, no verb and no parameter, mints no code and moves no register row.** **THE
   AS-FILED SENTENCE, NAMED AS FILED AND RE-EMITTED VERBATIM SO `git diff` RECOVERS IT WHERE IT STANDS:** ***"the
   store-side home entry is withdrawn, the registry's entry for that identity is REMOVED, and `undefined` is
   returned — a later trigger no longer carries that identity, and there is no registry entry left to
   match it"*** (`§2.4` item 7 (b), the OWN arm's observable cell). **READ ALONE IT CLAIMS MORE THAN THE
   STORE'S OWN WITHDRAWAL CAN DELIVER, AND THE STATE IT OVERREACHES IS ONE THIS DIRECTORY DECLARES LAWFUL.**
   **THE TWO STATES THAT DELIVER IT, AND NO MORE — STATED AS THE STATES, NOT AS COUNTS:**
   1. **THE ONE-ENTRY STATE.** **The identity's token names EXACTLY ONE home entry — every case in which the
   store MINTED the token** (`§2.4` rule 3's CASE A; `docs/specs/storeroom-native/contract.md §0.2` ·
   `DD-42` clause (1), whose mint skips a colliding candidate, so one mint never produces two entries). **One
   `off` withdraws that entry, the registry's entry is removed, and a later trigger carries the identity no
   more: the as-filed sentence's whole observable holds, with NO qualification.**
   2. **THE CALLER-SPELLED ONE-ADDRESS DUPLICATE.** **The identity's token names more than one home entry by
   the CALLER'S OWN ACT — `DD-39`'s construction duplicate** (`docs/specs/storeroom-native/contract.md §0.2` ·
   `DD-39` and clause 2 (b) of that contract's `§0.4` rule, whose adoption is VERBATIM). **ONE `off` withdraws
   ONE entry — the token's FIRST match, the store's own declared answer (`DD-42` clause (2)) — and THE TOKEN
   STAYS BOUND TO ITS REMAINING ENTRIES: a later write under ANY of those entries' addresses STILL RETURNS
   THAT IDENTITY, and EVERY remaining entry is STILL WITHDRAWABLE by that same token.**
   **SO THE TWO HALVES OF THE AS-FILED SENTENCE ARE READ SEPARATELY, AND EACH IS TRUE OF ITS OWN SUBJECT:**
   **THE STORE-SIDE HALF — *"the store-side home entry is withdrawn"* — IS TRUE EXACTLY OF THE ONE ENTRY THIS
   `off` NAMES and NEVER of the token's other entries; and THE PACKAGE-SIDE HALF — *"the registry's entry for
   that identity is REMOVED ... there is no registry entry left to match it"* — IS TRUE OF THE IDENTITY and
   holds in BOTH states, because the deregistration is keyed by the identity and not by a count of entries**
   (`deregister`; `§2.4` rule 2's map). **The identity may therefore be RETURNED by a later trigger and
   invoke NOTHING SILENTLY — rule 1's own declared observable — while it is withdrawn from the address this
   `off` named: THE TWO ARE NOT IN CONFLICT, and the silence is the registry-entry removal rather than a
   second firing.**
   **AND THE AUTHORITY FOR *"THE TOKEN STAYS BOUND TO ITS REMAINING ENTRIES"* IS THE STORE'S, AND IT IS
   DECLARED THERE — NOT AN IMPLEMENTATION DETAIL READ OUT OF THE CODE:** **the store's home carries a
   handle→address INDEX beside its address-keyed map, and that index is a LOOKUP STRUCTURE ONLY, DERIVED FROM
   THE HOME AND NEVER PATCHED ENTRY BY ENTRY — so a withdrawal's in-bucket removal leaves the token's
   SURVIVING entries INDEXED, and a second withdrawal names the next of them** (`docs/specs/storeroom-native/contract.md
   §0.2` · `DD-51`, whose own `what it REFUSES` cell names *"an index whose membership and the home's entries
   can disagree"*; `docs/specs/storeroom-native/write-and-read.md §6.5` item 12, whose dated clause states the
   rule as a clause of that part). **THE STATE IN WHICH A SURVIVING ENTRY *"CAN NEVER BE WITHDRAWN"* IS
   THEREFORE FORBIDDEN BY CLAUSE AND NOT MERELY ABSENT FROM THE CODE, and a drive that finds such an entry
   has found a failure of that store clause and not of this cell.**
   **AND THE DELIVERY WINDOW IS UNMOVED BY THIS NARROWING: `off` still DOES NOT CANCEL A DELIVERY IN FLIGHT,
   because the package's recipient set is read from the list it holds as that list stands when the window
   opens, ONCE per DISTINCT identity** (`§2.4`'s `CF-DUP-3` clause and its re-homing clause, clause 4 (ii);
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 14).
   **AND NOTHING ELSE OF THIS ITEM MOVES — THE READ THIS CLAUSE DOES NOT TAKE IS NAMED SO IT IS NOT INFERRED:
   THE ALTERNATIVE READING IS THAT ONE `off` CLEARS EVERY ENTRY THE TOKEN NAMES.** **IT IS REFUSED AT THIS
   CELL, AND THE REASON IS A DECLARED CELL RATHER THAN A PREFERENCE: the store's own withdrawal is a
   ONE-ENTRY removal (`docs/specs/storeroom-native/write-and-read.md §6.5` item 12: *"it drops ONE home-map
   entry"*) and its FIRST-match answer is `DD-42` clause (2)'s, so the all-entries reading would CONTRADICT
   that row rather than narrow it — and the one-entry reading is the reading the store's own index clause
   states with its terms** (`docs/specs/storeroom-native/contract.md §0.2` · `DD-51`; **and the store cell
   that read the all-entries alternative is NAMED rather than left implicit: that contract's `§0.4` rule
   clause (2), whose own dated clause states that `DD-42`'s *"FIRST-match withdrawal answer"* is UNMOVED — so
   the all-entries reading would have to be taken THERE, at the store's own cell, and is not taken here.**
   **The register keeps its `8` rows with every failure list unmoved, the `PAR-JS` set stays `18`, and no part
   entry is authored, renumbered or dropped by this clause.**
   (`[A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-39` and `DD-42` and §0.4's adoption rule clause
   (2) — the lawful duplicate and its FIRST-match withdrawal answer; A3 docs/specs/storeroom-native/contract.md
   §0.2 · `DD-51` and `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 — the store's own
   index-rebuild rule that keeps the surviving entries withdrawable; A3
   docs/specs/storeroom-native/write-and-read.md §6.5` item 14 — the delivery window, unmoved; `A68` | state
   or fail-state declaration]`).

   **(c) BOTH ARE DELIVERY-SIDE ONLY, AND NEITHER IS A RELEASE VERB.** **NEITHER `on` NOR `off` STATES, ALTERS OR
   PROMISES ANY FIRING RULE: WHICH listener fires · WHEN it fires · WHAT it is bound to · WHICH ids a trigger
   returns · the home's registration semantics (`listen` and `unlisten`) · the address-prefix rule · the
   process-scoped handle are ALL STORE BEHAVIOUR, and A DRIVE DERIVES EACH OF THEM FROM
   `docs/specs/storeroom-native/write-and-read.md §6.5` ITEM 14, where the authority stands** (**`A78`**;
   this section's re-homing clause, clause 1). **`on` PERFORMING the store's `listen` and `off` PERFORMING the
   store's `unlisten` IS A DELIVERY-SIDE ACTION UPON THE STORE'S OWN VERBS and never a statement about what the
   store's home does when it lands.** **AND NEITHER MEMBER IS A RELEASE VERB: no `dispose()`, no `close()`, no
   finalizer and no teardown is declared at either layer, `off` removes ONE registry entry and releases the
   instance's state at NOTHING, and the state is still released with the instance and by nothing else**
   (**`A74`**; `§3.5`; `DD-17`).
   **AND NOTHING ELSE OF THIS SECTION MOVES: `§2.5`'s single form, `§2.6`'s pattern, `§2.7`'s window, order and
   throwing-body clauses, `§2.8`'s two file-behaviour readings, `§2.9`'s non-exposure and its `8`-verb count,
   `§2.10`'s two signatures, `§2.4`'s four rules and item 5's registration site and domain, and item 6's
   id-matching model all stand exactly as printed — the register keeps its `8` rows with the one row this
   amendment RE-DERIVES named at `contract.md §5.5`'s dated re-derivation clause and NO NINTH ROW MINTED, the
   `PAR-JS` set stays `18` with `PAR-JS-8` and `PAR-JS-12` RE-DERIVED and no nineteenth row minted, and no part
   entry is authored, renumbered or dropped here.**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the three rulings this item implements;
   A1 docs/specs/storeroom-js-proposal.md §18 · `A74` · `A76` · `A77` and §19 · `A78` — the constraints it obeys;
   A3 docs/specs/storeroom-js/crossing.md §1.7–§1.8 — the validation order and the no-repair prohibition;
   A3 docs/specs/storeroom-native/write-and-read.md §6.5 items 12 (c) and 14 | requirement]`).

### §2.5 The single failure form

**⟶ RESTORED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THIS HEADING WAS ABSENT FROM THE FILE AT THIS PASS'S OWN READ AND IS RESTORED BY A PURE INSERTION.** `RCA-8(d)` ANNOTATE-BESIDE: **no byte below is re-worded, moved or deleted — the region's own bytes (item `1` through item `5` and its clauses (a)–(g)) stand exactly as they stood, and the ONLY thing this insertion adds is the heading the region's own citations require.** **THE DEFECT IT REPAIRS, NAMED WITH ITS EVIDENCE AT OTHER FILES' OWN BYTES: `### §2.5 The single failure form` is recorded as PRESENT by two later passes' manifests — `docs/specs/storeroom-js/backup/A78-REHOMING-2026-10-11-manifest.md`'s item `4` (*"the `§2.4` firing/delivery boundary clause at post-pass `515`–`584` (bounded by `### §2.5` at `586`)"*) and `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md`'s item `5` (whose beside-line is *"`### §2.5 The single failure form`"*) — while THIS pass, reading the file for `§2.4` and `§2.6`, found `### §2.4` at the registry and `### §2.6` at the constraint pattern with NO `### §2.5` between them, so this part's `§2.5` region ran UN-HEADED from the failure-form sentence to `§2.6`.** **THAT IS THE `DEF-15` CLASS — *"a literal-anchor edit whose replacement did not re-emit the anchor it matched"* — recurring on a SECTION HEADING rather than on a `##` heading, and it is the reason ~thirty citations across this directory, the four trackers and the gate records had to spell `surface.md §2.5 item 5` at a section whose heading a reader could not find.** **THE ROOT CAUSE IS NOT THIS PASS'S TO ASSIGN AND THE ROW IS NOT THIS PASS'S TO FILE: a `DEF-` row for the consumed `§2.5` heading is OWED to `docs/defects.md` by the supervisor's tracker pass, with this clause as its evidence.** **AND THE CITATIONS THAT NOW RESOLVE: `surface.md §2.5`, its item `5` and its item `5`'s clauses (b)–(g) — the verbose cell, the composite message's Segment One / Segment Two split and the two new members' refusal sites — each resolve to the region this heading opens, and every citation in this directory of the bare form *"`§2.5` item 5"* remains PATH-QUALIFIED because `contract.md §2.5` item 5 is a DIFFERENT cell (`§2.5`'s foot clause, clause 4, names that ambiguity and is unmoved)** (`[A3 docs/specs/storeroom-js/backup/A78-REHOMING-2026-10-11-manifest.md` item 4 · `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` item 5 — the two records that carry the heading; A1 docs/defects.md — `DEF-15`'s class and its standing remedy | cross-reference]`). **THIS CLAUSE AND THIS HEADING ARE A PURE INSERTION: `git diff` shows them as added lines and nothing else.**

**A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY ONE SUCH
FORM:**
```
{ status: string, message: string }
```
1. **`status` is the store's own member token VERBATIM** — one of the store's closed `15` members, as a JS
   `string`, **never an index, never a lowercased or prefixed variant and never a package-minted code** —
   **and a code the store returns that lies outside the closed set is passed through VERBATIM rather than
   re-mapped** (`DD-40`).
2. **`message` is the store's own GENERATED message VERBATIM** — never empty, never a placeholder and never
   hand-authored by the package.
3. **THE FAILURE IS THROWN AND NEVER RETURNED.** There is **no** returned tagged union, **no** `{ok, value}`
   envelope, **no** `Promise` rejection (**every verb is synchronous**) and **no** `Error` subclass: **the
   object thrown is a plain object whose prototype is the caller realm's `Object.prototype` and whose two
   members are exactly `status` and `message`** (`DD-12`).
4. **NO DISCRIMINATION RULE IS OWED.** **A caller that stores a value whose shape is indistinguishable from
   this object and then cannot tell its own input from a genuine failure carries an UNSUPPORTED
   ANTI-PATTERN** — the architect's own ruling — **so this unit declares no discrimination helper, no
   branded record and no third member** (`DD-13`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A64; A3 docs/specs/storeroom-native/contract.md §8.3 — the
   error's closed two-member shape | state or fail-state declaration]`)

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING `A76`'S
THIRD PART: WHAT *"VERBOSE"* MEANS, AT ITS OWN CELL, AND THE ONE CLAUSE THIS SECTION OWES `A64`.** `RCA-8(d)`
ANNOTATE-BESIDE: **items 1–4 above stand byte-for-byte and are read THROUGH this item; THIS item is a PURE
INSERTION, it adds no member to the form, and it changes no status, no code and no count of the store's closed
set.** **THE RULING, VERBATIM:** ***"reject with verbose error to client"*** (`docs/specs/storeroom-js-proposal.md`
`§18` · `A76`).

**5. WHAT *"VERBOSE"* MEANS — THE REJECTION'S CONTENT, DECLARED AT THIS CELL AND INSIDE THE ONE FORM.**
**A REJECTION IS VERBOSE WHERE IT CARRIES TWO THINGS: THE FAILING TARGET, AND THE REASON** — **and BOTH
TRAVEL INSIDE THE SINGLE DECLARED FORM OF THIS SECTION, whose member set stays EXACTLY `{status, message}`
and gains no third member** (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` | requirement]`):

   **(a) THE FAILING TARGET, RENDERED AS THE STORE'S GENERATOR RENDERS IT.** **The target is rendered in the
   SAME SPELLING THE STORE'S OWN MESSAGES USE** — **`<SEGMENT>`, the store's generator's own target slot: a
   string segment SINGLE-QUOTED (`'a'`), an integer segment BARE (`0`), a whole address JOINED BY `/` where
   the failure is about the address, and **a non-segment value PRINTED AS ITS OWN VALUE, SINGLE-QUOTED** (`10n`
   for a `bigint`, `Symbol()` for a symbol) where the failure is about a value and not about a segment** —
   **because the store's generator's own rule prints a non-segment argument that way, and this unit may not
   invent a second rendering of a target the store already renders**
   (`docs/specs/storeroom-native/contract.md §8.2`'s generator rule and its `MessageArgs` shape).

   **(b) THE REASON — THE CLASS THAT FAILED, AND THE POSITION WHERE THE CONTRACT DECLARES ONE.** **The reason
   is the CLASS the value HAS — named as `§1.2`'s or `§1.3`'s own class, never as a class the value could be
   converted to** — **and where a POSITION is declared by the contract, the position is carried BESIDE the
   class: the ARGUMENT POSITION for a verb's arguments, and the MEMBER POSITION for a member inside a value
   the walk reached.** **THE POSITION IS THE ONE THING THIS SECTION DECLARES THAT THE STORE'S OWN PHRASES DO
   NOT CARRY**, **so it is carried INSIDE the generated message's own text and NEVER as a third member** —
   **and WHERE no position is declared the class alone is the reason, because the reason's class half is
   mandatory and its position half is conditional.** **The reason's class half is carried by the store's own
   `<mismatch clause>` for the code the refusal answers** (`crossing.md §1.2` row 10's `is not an admitted
   value` being the value-arm's own).

   **(c) THE STATUS IS THE STORE'S, DRAWN FROM THE STORE'S CLOSED SET, AND NO PACKAGE CODE IS MINTED.** **The
   rejection's `status` is a member of the store's closed `15`-member set, CARRIED VERBATIM** — **minted by no
   clause of this unit, lowercased by none, prefixed by none and re-mapped by none** (`DD-40`) — **and the
   store's closed set is neither widened nor re-spelled here.** **`§1.6`'s count of *"`0` package-minted
   codes"* therefore stands, and a rejection is NOT a licence for a package-minted code.**

   **(d) THE MESSAGE'S AUTHORITY IS THE STORE'S GENERATOR, AND A REJECTION REACHED BEFORE THE STORE IS
   ANSWERED ON THE SAME PATH THE CONTRACT ALREADY DECLARES FOR A STATE THAT PRECEDES ANY VERB.** **For a
   failure the store itself produces, `message` is the store's generated string verbatim (item 2 above).** **For
   a refusal the PACKAGE'S OWN WALK produces — the walk of `§1.7` — the message is the string the store's own
   generator yields for the answering code at the failing target this item names, and the generator is reached
   through the addon exactly as `contract.md §2.5` item 5's lettered clauses establish for the absent-addon
   state, whose ONE documented package-side constant is the single site where the string is carried when the
   generator's own author is the thing that failed** (`docs/specs/storeroom-js/package.md §1.2` item 4;
   `docs/specs/storeroom-js/contract.md §2.5` item 5 (b)–(c)). **AND THE HONEST CONSEQUENCE OF THAT ONE-SITE
   RULE IS STATED RATHER THAN SMOOTHED: a package-side constant can hold the generator's bytes only for a
   FIXED subject, so a rejection whose target VARIES is a rejection whose message is NOT byte-identical to a
   constant's — and this section declares the AUTHORITY (the store's generator) and does not claim a
   byte-equality it cannot reach.** **Gate 4's `JS-3` measures exactly that byte-equality gap, and it is a
   finding for the implementer's own pass, not a licence to hand-author a message here**
   (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-3`).

   **(e) THE TWO THINGS A REJECTION IS NEVER.** **A rejection is NEVER A SECOND FORM — there is no additional
   thrown shape beside `{status, message}`, no `Error` subclass, no wrapper carrying the class or the position
   as a member and no returned union.** **And a rejection is NEVER A RAW HOST ERROR — a `TypeError`, a
   `RangeError`, a `RangeError` from a deep recursion, a string thrown, or any host object escaping from the
   boundary's own frame is a FINDING at whatever site produced it, not a rejection.** **`A76`'s reach clause
   is the authority for both sentences: it does NOT license a second failure form.**
   (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76`'s reach clause | prohibition]`)

   **(f) AND THE INTERACTION WITH `A64`'S NO-DISCRIMINATION RULE, STATED SO THE FOUR ITEMS ABOVE ARE NOT READ
   AS AMENDED.** **`A76` DOES NOT OWE A DISCRIMINATION RULE: the caller still cannot tell its own stored data
   from a failure record, and item 4 above stands unmoved.** **THE CHANGE IS THAT THE RECORD SAYS MORE** —
   **the caller reads the failing target and the reason OUT OF the record it already has, and a caller that
   stored a value indistinguishable from `{status, message}` gains no new way to tell the two apart, because
   nothing is added to the record's SHAPE.** **So no discrimination helper, no branded record and no third
   member becomes lawful or necessary by this item** (`DD-13`; `A64`).

   **(g) AND THE ONE EXISTING CLAUSE THAT MUST BE RECONCILED RATHER THAN READ BESIDE THIS ITEM, NAMED WITH ITS
   `§` BECAUSE A REJECTION'S FORM IS THE WHOLE OF WHAT THIS ITEM DECLARES.** **`contract.md §2.4` item 5 (d)
   and `docs/specs/storeroom-js/parameter-semantics.md §2.12` declare the REGISTRATION site's refusal as a JS
   `TypeError` — a form this section does not declare. THE OPERATIVE READING, STATED WITH ITS TERMS AND TAKEN
   HERE: the registration site's refusal IS a rejection under `A76` and travels in THIS section's single form,
   with its `status` drawn from the store's closed set — the store's own `AddressMalformed`, whose declared
   trigger already covers *"a present argument outside its domain"* and *"an absent required argument"*
   (`docs/specs/storeroom-native/contract.md §8.1` #1) — and its `message` generated as clause (d) declares.**
   **THE `TypeError` IS NOT WITHDRAWN AS A WORD: it is the SHAPE of the failure at the registration site and
   it is what `§2.4` item 5 (d)'s own text names, and a later bounded amendment of this directory re-spells
   those two cells to this section's form.** **AND ONE CONSEQUENCE IS NAMED SO THE RECONCILIATION IS NOT READ
   AS A WIDENING: the `TypeError`'s declared ABSENCE OF MEMBERS was never a permission to mint a status, and a
   `status` of `TypeError` reached at the addon's own boundary is a FINDING against the store's closed set,
   because the set holds no such member** (`docs/specs/storeroom-js/contract.md §2.4` item 5 (d);
   `docs/specs/storeroom-js/parameter-semantics.md §2.12`; `DD-40`; `archive/gate4/storeroom-js-adversarial.md`
   §A · `JS-1`) (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection travels inside
   the one form; `A1` | state or fail-state declaration]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT
FINDING `CF-3`: THE COMPOSITE MESSAGE'S AUTHORITY SPLIT, AND WHAT AN ABSENT ARGUMENT'S MESSAGE IS.** `RCA-8(d)`
ANNOTATE-BESIDE: **items 1–5 above stand byte-for-byte, clauses (a)–(g) included, and they are read THROUGH
this clause; THIS clause is a PURE INSERTION, it adds no member to the form, and it moves no status and no
count of the store's closed set.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: clause (b) declares that the
reason — the class and, where the contract declares one, the position — *"is carried INSIDE the generated
message's own text"*, and clause (d) declares that `message` *"is the string the store's own generator yields
for the answering code at the failing target"*. THE GENERATOR REACHABLE FROM JS FILLS TWO SLOTS AND TWO ONLY —
the segment slot and the path slot** (`bindings/js/src/facade.rs`'s `errorMessage(code, subject)`, whose
`MessageArgs` is built with `segment: Some("'<subject>'")` and `path: Some(subject)` and EVERY OTHER MEMBER
DEFAULTED) — **so the class-and-position text is APPENDED BY THE BOUNDARY and is NOT carried by the
generator, and an ABSENT argument cannot reach the generator's own name-clause through that route at all.**

**THE SPLIT, DECLARED PART BY PART, SO *"THE STORE'S OWN MESSAGE"* STAYS TRUE OF THE PART THAT IS THE
STORE'S:**
1. **PART ONE IS THE STORE'S GENERATOR'S OWN, VERBATIM: the generator's rendering of the ANSWERING CODE at the
   failing TARGET'S SPELLING, the target occupying the generator's own `<SEGMENT>` slot (and its `<path>` slot
   where the code's template is the `file`-tier commit's), every other slot at its default.** **It is reached
   through the addon's `errorMessage` where the artefact carries the generator, and it is reproduced at the
   ONE documented package-side site where the generator is the thing that failed** (`contract.md §2.5` item 5
   (b)–(c); `package.md §1.2` item 4). **THIS PART — THE TARGET HALF — IS THE PART THE PHRASE *"THE STORE'S
   OWN MESSAGE"* IS TRUE OF.**
2. **PART TWO IS THE BOUNDARY'S OWN, AND IT IS APPENDED: the reason's CLASS half — clause (b)'s *"the class
   that failed"* — and, where the carrier declares one, the reason's POSITION half.** **The boundary appends
   it to Part One's bytes, after a separator, and THE COMPOSITE IS THE `message`.**
3. **THE STATUS IS PART OF NEITHER PART'S TEXT AND IS UNMOVED: a member of the store's closed `15`-member
   set, carried verbatim, minted by nothing** (clause (c); `DD-40`).
4. **AND NO BYTE-EQUALITY OF THE COMPOSITE WITH THE GENERATOR'S WHOLE MESSAGE IS DECLARED** — the gap is
   exactly what gate 4's `JS-3` measured (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-3`) — **while
   the APPENDED clause is this item's own and is LAWFUL, and a package-authored string that STANDS IN FOR
   PART ONE is a FINDING** (item 2 above).
5. **WHAT AN ABSENT ARGUMENT'S MESSAGE IS, DECLARED BECAUSE THE GENERATOR'S OWN NAME-CLAUSE IS UNREACHABLE
   FROM JS: THE GENERATOR'S `AddressMalformed` ROW HAS TWO ARMS — a segment's arm (*"`<subject>` is not a
   legal address segment …"*) and an ABSENT-ARGUMENT arm (*"'`<name>`' requires a `<name>` argument, a
   `<name>` is required"*) — and the arm that carries a NAME is selected by a slot the JS-side route does not
   fill** (`src/error.rs`'s `Msg::argument`, set by the store's own absent-argument constructors and left
   `None` by `storeErrorMessage(code, args)`; `docs/specs/storeroom-native/contract.md §8.2`'s
   `AddressMalformed` row, whose `<mismatch clause>` alternates on exactly that slot). **SO AN ABSENT ARGUMENT
   IS ANSWERED ON THE CALL PATH AND NOT BY A BOUNDARY RENDERING: an absent CARRIER argument — an `address`, a
   `tier`, an `opId`, a `handle`, an absent construction key — crosses to the store as its own carrier value
   and the STORE's own name-clause is produced there** (`crossing.md §1.3`'s carrier tables; `DD-1`'s
   pass-through) — **while a BOUNDARY refusal whose own subject is an absent value renders PART ONE at that
   subject's own spelling (or at its class spelling where no value is printable) and APPENDS PART TWO, and it
   NEVER claims the name-clause.** **A boundary message that spells a *"requires a …"* clause of its own is a
   FINDING, because that clause is the generator's and its NAME SLOT is not filled on this route.**
**AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE A MESSAGE'S AUTHORITY OWES ONE: A GENERATOR THAT
CARRIES THE CLASS AND THE POSITION ITSELF — a store-side widening of `MessageArgs` with a class slot and a
position slot, so one string is the whole message.** **Priced: it is a STORE-SURFACE CHANGE on the message
channel — the store's directory closes that generator's `args` record and its clause table, and amending
either is this unit's plan's stop condition `B`; and it would put a boundary-side vocabulary (`§1.2`'s and
`§1.3`'s class names) inside the store's own generator, which the store's taxonomy does not carry.**
**Available only with a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed
by a bounded amendment of the STORE's directory, which is NOT this unit's to take; the reversal instrument is
that amendment and NO PARK IS NAMED AS IT** (`A66`)
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection's content, travelling inside the
ONE form; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (b)–(d) — the clauses this one reads;
A3 docs/specs/storeroom-native/contract.md §8.2 — the generator's rule and its `AddressMalformed` row;
`DD-1`; `DD-40` | state or fail-state declaration]`).

**⟶ RECONCILED 2026-10-11 — THE BLIND GREENS PASS (`role_spec_writer`), ON THE IMPLEMENTER'S PARALLEL PASS'S
CONTRACT FINDING ON `§2.5` ITEM 5 (b): *"carried INSIDE the generated message's own text"* READ AGAINST THE
`CF-3` CLAUSE ABOVE — THE COMPOSITE'S AUTHORITY SPLIT, STATED ONCE SO TWO READINGS CANNOT BE DERIVED FROM IT.**
`RCA-8(d)` ANNOTATE-BESIDE: **items 1–5 above, clause (b) and clause (d) included, the `CF-3` clause above and
its five parts and its `alt` included, all stand byte-for-byte and are read THROUGH this clause; THIS clause is
a PURE INSERTION, it adds no member to the form — the member set stays EXACTLY `{status, message}` — moves no
status, no count and no code of the store's closed set, and re-decides no part of the split.**
**THE AS-FILED WORDING OF CLAUSE (b), NAMED AS FILED:** ***"THE POSITION IS THE ONE THING THIS SECTION DECLARES
THAT THE STORE'S OWN PHRASES DO NOT CARRY, so it is carried INSIDE the generated message's own text and NEVER
as a third member."*** **READ ALONE IT ADMITS TWO READINGS, and the second one is false of the build: (i) the
GENERATOR produces one string that already carries the target, the class and the position (the reading the
`alt` below prices); or (ii) the `message` as a WHOLE carries it, and it COMPOSES two authored parts.** **THE
OPERATIVE READING IS (ii), AND THE SPLIT IS THIS, WITH EACH PART'S AUTHOR, ORDER AND SLOT NAMED SO NO THIRD
READING IS AVAILABLE:**
- **SEGMENT ONE — PART ONE — IS THE STORE'S GENERATOR'S OWN, VERBATIM, AND IT CARRIES THE TARGET.**
  **`message` BEGINS WITH the string the store's own generator yields for the ANSWERING CODE at the failing
  TARGET's spelling — the target occupying the generator's own `<SEGMENT>` slot (and its `<path>` slot where the
  code's template is the `file`-tier commit's), every other slot at its default — reached through the addon's
  `errorMessage` where the artefact carries the generator, and reproduced at the ONE documented package-side
  site where the generator is the thing that failed.** **THE STORE PRODUCES SEGMENT ONE AND THE STORE AUTHORS
  IT** (`contract.md §2.5` item 5 (b)–(c); `package.md §1.2` item 4; the `CF-3` clause above, part 1).
- **SEGMENT TWO — PART TWO — IS THE BOUNDARY'S OWN, IT IS APPENDED, AND IT CARRIES THE CLASS (MANDATORY) AND
  THE POSITION (CONDITIONAL).** **THE BOUNDARY AUTHORS IT AND APPENDS IT TO SEGMENT ONE'S BYTES, AFTER A
  SEPARATOR** — **the boundary's part is NEVER the failing target (that is the store's, in Segment One) and is
  NEVER the store's generated string** (`§2.5` item 5 (b) and (d); the `CF-3` clause above, part 2).
- **SO *"INSIDE THE message"* IS TRUE OF THE COMPOSITE AND *"INSIDE THE GENERATED STRING"* IS TRUE ONLY OF
  SEGMENT ONE — WHICH IS THE WHOLE OF WHAT THE AS-FILED SENTENCE NEEDED TO SAY, stated once, here.** **THE
  `status` IS SEGMENT NEITHER OF AND IS UNMOVED: a member of the store's closed `15`-member set, carried
  verbatim, minted by nothing (clause (c); `DD-40`).**
**AND THE TWO READINGS' CONSEQUENCES, PRINTED SO A READER CANNOT DERIVE THEM BY ACCIDENT: UNDER (i) the
generator would be a STORE-SURFACE CHANGE and the store's own `MessageArgs` record and clause table would have
to widen — the `CF-3` clause's `alt`, priced there and owned by the STORE's directory, NOT this unit's; UNDER
(ii) NO STORE BYTE MOVES, and a boundary-authored string that STANDS IN FOR SEGMENT ONE is a FINDING (the
`CF-3` clause's part 4).** **AND ONE DERIVATION IS NAMED BECAUSE IT IS THE ONE PLACE THE TWO READINGS COULD BE
CONFUSED IN A DRIVE: a drive asserting the COMPOSITE's bytes asserts SEGMENT ONE's spelling of the target
PLUS the appended reason — and NEVER a generator-produced class or position, which the JS-side route does not
carry** (`§2.5` item 5 (d)'s honest consequence; gate 4's `JS-3`; `docs/specs/storeroom-js-greens.md` §2's
`JSG-10.24`, which drives exactly that composite and passes at `233` PASS of `236` with the store-produced
messages byte-for-byte).**
**AND NOTHING ELSE OF THIS ITEM MOVES: the form stays EXACTLY `{status, message}` with no third member; the
rejection is still NEVER a second form and NEVER a raw host error (clause (e)); `A64`'s no-discrimination rule
still owes no helper (clause (f)); an ABSENT argument is still answered on the CALL PATH and never by a
boundary rendering (the `CF-3` clause above, part 5); and the register keeps its `8` rows with every failure
list unmoved** (`§2.5` item 5 (b)–(g); `DD-13`; `DD-40`).
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection's content travelling INSIDE the
ONE form; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 clauses (b), (c) and (d) and the `CF-3` clause above
— the split this clause states once; A3 docs/specs/storeroom-native/contract.md §8.2 — the generator's own rule
and its `AddressMalformed` row, which the store-side reading (i) would have to widen; A3
archive/gate4/storeroom-js-adversarial.md §A · `JS-3` — the byte-equality gap this split explains; `DD-1`;
`DD-40` | state or fail-state declaration]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CALLER-SPELLED-DUPLICATE PASS (`role_spec_writer`), CORRECTING THE ONE
STALE FIGURE THIS PART PRINTS: THE `CF-3` CLAUSE'S CITATION OF THE BLIND SET'S PASS COUNT.** `RCA-8(d)`
ANNOTATE-BESIDE: **the `CF-3` clause's own bytes stand byte-for-byte — its `233`-of-`236` figure included — and
are read THROUGH this clause; THIS clause is a PURE INSERTION, it re-spells no clause and adds no row, and its
one subject is the `JSG-10.24` sentence in the `CF-3` clause above it.**

**THE AS-FILED SENTENCE, NAMED AS FILED AND RE-EMITTED VERBATIM SO `git diff` RECOVERS IT WHERE IT STANDS:**
***"`JSG-10.24`, which drives exactly that composite and passes at `233` PASS of `236` with the store-produced
messages byte-for-byte"***. **THE OPERATIVE FIGURE IS `236` PASS OF `236`.** **The `233` is a gate-5-time
reading of a tree that run's own record files: at gate 5 the blind set read `236` authored · `236` executed ·
`233` PASS · `3` FAIL, the `3` FAILs being ONE finding of ONE scenario — `JSG-04.1.v` · `JSG-04.2.v` ·
`JSG-04.4.v` — whose defect was the implementation's.** **That state was repaired at commit `9707ee9`
(*"js: the value-arm refusal is verbose and the two doc cells reconciled — the blind set is `236/236`"*,
`2026-10-09 23:39:01`), and the gate-6 live determination RE-MEASURED the same `236` assertions against the
rebuilt artefact: `13` scenarios · `236` authored · `236` executed · `236` PASS · `0` FAIL, identical in seven
consecutive runs at the pinned artefact hash, with `JSG-04` reading `67 PASS · 0 FAIL` where the gate-5 record
printed `64 PASS · 3 FAIL`** (`archive/gate6/storeroom-js-live-determination.md` `§2.3` and its `§3` ·
`LIVE-F1`; `LIVE-OBS-2` is the observation whose owner is this role and whose subject is exactly this line).

**AND WHAT THIS CORRECTION IS NOT, SAID SO NO FIGURE IS OVER-READ: it is a CITATION's figure and not a
re-measurement — this pass runs nothing and claims no green.** **The blind set's authored `236` is UNMOVED, no
assertion of it is touched or weakened, its `JSG-10.24` cell is unmoved, and the gate-5 record's `233`/`3`
filings stand byte-for-byte as that tree's own record, read as HISTORICAL rather than withdrawn.** **The
sentence's own subject — the composite `message`'s Segment One / Segment Two split — is UNMOVED by this figure,
and no cell of any set asserts a document's own citation figure** (`archive/gate6/storeroom-js-live-determination.md`
`§3` · `LIVE-OBS-2`, with its `§8` item 2)
(`[A3 archive/gate6/storeroom-js-live-determination.md §2.3 · §3 · `LIVE-F1` and `LIVE-OBS-2` — the
re-measurement at the pinned artefact, pinned by hash; A1 docs/specs/storeroom-js-greens.md §4 — the gate-5
figure, read as historical | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THE FIGURE THIS SECTION'S CORRECTION CLAUSE NAMES AS OPERATIVE IS ITSELF ONE TREE BEHIND, AND THIS DIRECTORY'S OWN CLOSURE IS PRINTED WITH IT.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE — the `CF-3` clause, its `233`-of-`236` citation and the correction clause that supersedes it — and each is read THROUGH this clause; THIS clause is a PURE INSERTION: it re-spells no clause, adds no row, moves no `§`-number, mints no `DD` row and no `PAR-JS` row, and re-measures nothing (this pass holds no execution verb).**
1. **THE FIGURE THE CLAUSE ABOVE DECLARES — *"THE OPERATIVE FIGURE IS `236` PASS OF `236`"* — IS THE PRE-AMENDMENT TREE'S FROM THIS DATE.** **THE OPERATIVE READING, AT ITS OWN SITE: `node bindings/js/greens/greens.mjs` — `240` authored · `240` executed · `240` PASS · `0` FAIL over the SAME `13` scenarios, `JSG-01` reading `17` assertions, the `+4` being `JSG-01.14`–`.17` (the two new members' surface) — so `JSG-10.24`'s own cell is now inside a set whose assertion census is `240`, and the `233`-of-`236` figure this clause corrects is TWO trees behind (the gate-5 tree's `233`/`3` and the gate-6/GATE-8 tree's `236`/`236`).** **NO SCENARIO WAS EDITED AND NO ASSERTION WEAKENED BY THIS PASS; the sentence's own subject — the composite `message`'s Segment One / Segment Two split, which `DD-51` extends to `on`'s and `off`'s two new sites — is UNMOVED.**
2. **AND THE OTHER TWO FIGURES OF THIS UNIT'S OWN TREE, NAMED BESIDE IT SO NO READER TAKES ONE FOR BOTH: the JS leg, `node --test bindings/js/test/*.test.mjs` — `113` tests · `113` pass · `0` fail (as-filed: `101`); and the live battery, `node bindings/js/greens/live-drive.mjs` — `91` authored · `91` PASS · `0` FAIL over `13` scenarios with `LIVE-13` at `19` (as-filed: `72`/`72` over `12`; LAYER `LIVE / ASSEMBLED PACKAGE`).** **The store's root suite, QUOTED and never re-labelled as this unit's, is `379` PASS · `0` FAIL, and the sibling crate is `223` PASS · `0` FAIL, UNMOVED.**
   **⟶ AND THE JS LEG'S OWN `113` IN THIS ITEM IS ONE TREE BEHIND, CORRECTED BESIDE ITSELF 2026-10-11 BY THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`), `RCA-8(d)` ANNOTATE-BESIDE: the item above stands byte-for-byte and is read THROUGH this correction.** **THE OPERATIVE READING OF THAT LEG, AT ITS OWN SITE: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `185` tests · `185` PASS · `0` FAIL · `0` skipped, over `9` files — the `+72` being the publish unit's own red set (`62` cells at `bindings/js/test/publish.test.mjs`) and its `10` generators `NG-PUB-A`…`NG-PUB-J` at `bindings/js/test/publish-generators.test.mjs`, so `113 + 62 + 10 = 185` ✓.** **The `101` this item calls as-filed and the `113` it calls operative are EACH THE SAME LEG'S COUNT AT ITS OWN DATE, and the census re-read beside it is `185` JS tests + `223` sibling-crate cells = `408` `ENVELOPE/PURE` cells on this unit's own tree.** `[A3 docs/specs/storeroom-publish/contract.md` `§4.3` · the publish unit's own figure table; A3 `bindings/js/test/publish.test.mjs` and `bindings/js/test/publish-generators.test.mjs` — the `+72`'s own homes | numeric or census claim]`
3. **AND THIS DIRECTORY'S OWN CLOSURE AND COUNTS, PRINTED WITH THEIR TERMS AS THIS PASS FOUND THEM: the closure predicate reads `6 = 6` on its PART-ENTRY terms (`contract.md` + its `6` parts) and the directory's state is `CLOSED`; the typed register carries `8` ROWS AND NO NINTH (`P-SM-5` RE-DERIVED, its subject widened to the two new members and its failure list extended, `8 ≤ 8`); the `PAR-JS` set carries `18` rows, RE-DERIVED and not minted (`15 + 1 + 1 + 1 = 18` ✓, with `PAR-JS-8`'s handle slot and `PAR-JS-12`'s listener slot the two rows the `Q1` amendment RE-DERIVES, and NO NINETEENTH ROW); the design-defaults table carries `54` AUTHORED rows (`DD-1`…`DD-54`, the amendment's four being `DD-51`…`DD-54`); and the artefact both greens drivers load is `bindings/js/build/Release/storeroom_js_binding.node` at `sha256:cf088d91…` / `957,904` bytes (the pre-amendment digest being `effcf6a6…`).** **THE STORE'S OWN CLOSURE IS `5 = 5` and is NOT this directory's predicate.**
4. **AND THE LEDGER, ON THE ARCHITECT'S CENSUS RULING — AN AMENDMENT IS A ROW AND NEVER A UNIT: `2 DONE / 0 open` UNITS = `2` (`2 + 0 = 2` ✓), the two units being `U-STOREROOM-NATIVE` (`N1`) and `U-STOREROOM-JS` (`N3`, whose amendment row this directory now carries), with the `## OPEN` set at `0` unit rows and `0` open non-unit rows (`0 + 0 = 0` ✓).** **NO `APP`-GREEN IS CLAIMED: every figure above is `ENVELOPE/PURE` except the live battery's, the ASSEMBLED/`APP` LAYER IS `NONE`, and no consumer application loads this package anywhere in this repository** (`§4.2` items 2–3; `DD-20`; `[T: this section's operative figure, the unit's other two, this directory's closure and counts, and the ledger | CENSUS]`).

**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8): THE
DIVERGENCE THIS SECTION'S `§2.4` DATED CLAUSE HANDED TO THE RECONCILING PASS IS ANSWERED, AND IT SITS ON
NEITHER SIDE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — this section's `§2.4`
dated clause, its (i)–(ii) split, its *"THE SHIPPED ARTEFACT DEDUPLICATES AT THE BOUNDARY"* paragraph, its
*"WHICH SIDE THE DIVERGENCE SITS ON IS FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE TO SAY"*
sentence and its `alt` included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it
re-spells no rule, adds no member to any record, mints no code and moves no register row.** **WHAT THE
SECTION READ, VERBATIM, AT ITS `§2.4` DATED CLAUSE:** *"`bindings/js/index.mjs`'s `wrapHandles` pushes each
token's handle into its output AT MOST ONCE and reads rule 3's *"one DISTINCT handle per token, however many
home entries carry it"* as the list's OWN distinctness rule — so the shipped JS-observable `triggered`
carries CASE B's token ONCE where (ii) above reads the store's list as carried faithfully TWICE … and WHICH
SIDE THE DIVERGENCE SITS ON IS FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE TO SAY"*.

**THE BUILD HAS MOVED, AND THE MOVE IS THE IMPLEMENTER'S OWN FILING `CF-DUP-1`/`CF-DUP-2`, READ AT
`bindings/js/index.mjs`'s OWN BYTES BY THIS PASS:** **`wrapHandles` NOW CARRIES THE STORE'S OWN LIST ELEMENT
FOR ELEMENT AND EDITS NOTHING** — its own comment reads *"**THE STORE'S OWN LIST IS CARRIED OUT ELEMENT FOR
ELEMENT, AND THE BOUNDARY EDITS NOTHING**"*, the collapsed form stands BESIDE it as the as-filed reading
(`if (!out.includes(handle)) out.push(handle);`) rather than deleted, and the per-identity deduplication lives
at `deliver` (`if (matched.has(handle)) continue;`), which is where clause (i) puts it. **SO:**
- **(ii) IS THE READING THE BOUNDARY HOLDS** — `triggered` carries a lawful caller-spelled duplicate's token
  `TWICE`, element for element, and a drive may assert the array's LENGTH (`2`) and its DISTINCT-identity
  count (`1`) together, exactly as `docs/specs/storeroom-js/test-cases.md`'s multiplicity row licenses.
- **(i) IS THE READING `deliver` HOLDS** — ONE invocation per DISTINCT identity, never one per element.
- **AND THE PRICED ALTERNATIVE THIS SECTION'S CLAUSE CARRIED — *"THE BOUNDARY COLLAPSES DUPLICATE TOKENS AT
  HANDOFF"* — IS NO LONGER THE SHIPPED STATE; it remains available only as the bounded amendment that clause
  already names, and its reversal instrument is that amendment and NEVER A PARK** (`A66`).

**WHAT THIS CLAUSE DOES NOT DO.** **It re-decides no rule: `§2.4` rules 1, 2 and 4, item 5's registration site,
item 6's id-matching model, `§2.5`'s single form, `§2.3`'s handle clause and `§2.7`'s window, order and
throwing-body clauses all stand exactly as printed.** **The register keeps its `8` rows and every failure list
is unmoved — and every register entry the reconciled reading made FALSE of the shipped build is now TRUE of
it, so no row of `§5` is RED against this state** (`archive/gate3/storeroom-js-red-set.md` §12/§13;
`bindings/js/index.mjs`'s `wrapHandles`/`deliver`; A1 docs/specs/storeroom-js-proposal.md §18 · `A77`; A3
docs/specs/storeroom-native/contract.md §0.2 · `DD-42` clause 3 · `DD-39` | state or fail-state declaration).

### §2.6 The constraint/repair pattern — a usage pattern over declared verbs, never a seam

**CONSTRAINT AND REPAIR EVALUATION IS CLIENT-SIDE.** **The JS side holds the constraint functions; the
crossing this subject needs is ALREADY IN the surface (`write` out, `rollback` in).** **The pattern, stated
in full because it is the whole of what this unit declares about it:** **evaluate constraints AFTER a
`write` returns; on a violation, call `rollback` with the `JournalOp.opId` THAT WRITE RETURNED.**
**NO constraint verb, NO repair verb, NO constraint parameter, NO constraint record and NO function-carrying
parameter is declared — and the store's own surface takes no function at any position** (`DD-16`).
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A73 — *"Constraint/Repair is client-side, using rollback to
reverse constraint violations."*; A3 docs/specs/storeroom-native/contract.md §7.3 — the constraint seam's
own boundary | requirement]`)

### §2.7 Listener delivery — the window, the order and a throwing body

1. **`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN OPAQUE HANDLES**, fresh on every call, in the
   two records the store's own contract declares (`WriteResult` and `DeleteReceipt`).
2. **THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED.** **The
   invocation is SYNCHRONOUS and happens after the store call has completed and the record has been
   copied out** (`DD-22`).
3. **NO ORDER IS ASSERTED.** The store declares the returned set's order unobservable, so **this unit asserts
   MEMBERSHIP ONLY**: a drive compares **sets**, never sequences, and **no clause of this unit promises a
   registration order, an address order or a tier order** (`DD-22`).
4. **A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED.** **The exception propagates out
   of the package's own invocation loop; the store's verb result is already complete and copied out, so the
   throw neither rolls back nor alters anything the store did** (`DD-23`).
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 5 — *"NO ORDER IS DECLARED FOR THE LIST"*; A1
   docs/specs/storeroom-js-proposal.md §15 · A73's neighbourhood — the firing window is this unit's own
   carriage | ordering claim]`)

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON `A77`: THE INVOCATION'S ONE
ARGUMENT, DECLARED BESIDE THE INVOCATION'S OWN WINDOW.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–4 above stand
byte-for-byte and are read THROUGH this item; THIS item is a PURE INSERTION and it adds no argument, no member
and no order.** **THE RULING, VERBATIM:** ***"Listener passes an id back to client-side when triggered, JS
then has to match id to the function it was set with."*** (`docs/specs/storeroom-js-proposal.md` `§18` ·
`A77`).

**5. THE INVOCATION'S ONE ARGUMENT, AND WHICH DATUM IT IS.** **When the package invokes a registered function
for a triggered id, IT PASSES THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT** — **the function's `length`-and-
`arguments` view is ONE argument, the address, and it is NOT the id that selected the function** — **and the
argument is the datum `docs/specs/storeroom-js/parameter-semantics.md §2.12` declares, whose PRODUCER and
whose arms are declared in that row's own dated clause.** **THE TWO DATA ARE NOT THE SAME DATUM AND THIS ITEM
SEPARATES THEM AT THIS CELL: the ID is the matched identity carried in the record's `triggered` member and it
decides WHICH function is invoked (`§2.4` item 6 (b)–(d)); the TRIGGERING ADDRESS is the invocation's own
argument and it tells the invoked function what triggered it.** **NO OTHER ARGUMENT IS DECLARED AND NO RETURN
VALUE IS READ** (`docs/specs/storeroom-js/parameter-semantics.md §2.12`). **A drive that asserts
`arguments.length !== 1`, or an invocation whose argument is the id rather than the address, is asserting a
behaviour this unit does not declare** (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A77`;
docs/specs/storeroom-js/parameter-semantics.md §2.12 | declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS SECTION'S DELIVERY ITEMS READ AGAINST THEIR FIRING
NEIGHBOURS, ONE LINE EACH.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–5 above stand byte-for-byte and are read
THROUGH this item; THIS item is a PURE INSERTION, it adds no item, no member, no argument and no order, and it
re-decides no clause of this section.** **THE RULING, VERBATIM:** ***"Listener behavior is part of
store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE FOUR ITEMS, SPLIT — WHICH IS THE DELIVERY AND WHICH INHERITS A FIRING RULE:**
1. **ITEM 1 — *"`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN OPAQUE HANDLES … in the two records the
   store's own contract declares (`WriteResult` and `DeleteReceipt`)"* — IS A DELIVERY RULE AND STAYS: the
   ARRAY's JS spelling, its freshness per call and the wrappers it carries are this package's.** **WHAT THE
   ARRAY'S MEMBERS ARE is the STORE's**, **and it is declared at
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 11 with that store's `§3.6`/`§4.4`; the package
   carries what those return and edits nothing.**
2. **ITEM 2 — *"THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED"* — IS
   A DELIVERY RULE AND STAYS WHOLE, AND IT IS THE WINDOW `§2.4`'s recipient-set reading is read at.** **THAT
   THE STORE INVOKES NOTHING is the store's own clause and is inherited here, not declared**
   (`docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d), `A57`: *"a handle that it returns to alert
   the client of the trigger"*).
3. **ITEM 3 — *"NO ORDER IS ASSERTED … this unit asserts MEMBERSHIP ONLY"* — IS A DELIVERY-SIDE CONSEQUENCE
   OF A STORE-SIDE PROPERTY, AND IT IS POINTED AT ITS HOME: the ORDER-UNOBSERVABILITY ITSELF is the store's**
   — **`docs/specs/storeroom-native/contract.md §6.5` item 5's *"NO ORDER IS DECLARED FOR THE LIST"*, with
   `DD-22`/`DD-37`, and `write-and-read.md §6.5` item 10 (e)** — **while the drive's own rule (a drive compares
   SETS and never sequences) is this unit's.** **SO A DRIVE DERIVES ITS NO-ORDER RULE FROM THE STORE'S CLAUSE
   AND ITS SET-COMPARISON FROM THIS ITEM, and neither is read as the other.**
4. **ITEM 4 — *"A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED"* — IS A DELIVERY RULE AND
   STAYS:** **it is a statement about the PACKAGE's own invocation loop, and the store's own half (*"a throwing
   body is not a store state"*) is inherited from `write-and-read.md §6.5` item 10 (d) (i)** — **because the
   store never invokes a body, no body can throw inside a store operation.**
**AND NOTHING ELSE OF THIS SECTION MOVES:** **items 1–5 stand exactly as printed; the register keeps its `8`
rows with every failure list unmoved; `§2.4`'s four rules and item 6, `§2.3`'s handle clause, `§2.5`'s single
form and `§2.8`'s two file-behaviour readings are untouched; and no `DD` row, no `PAR-JS` row and no part entry
is authored, renumbered or dropped by this item**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 10 (d)–(e), 11 — the store-side clauses this section reads through; A3
docs/specs/storeroom-native/contract.md §6.5 item 5 with `DD-22` | requirement]`).

### §2.8 The two file-behaviour readings a JS caller will meet

1. **A `delete` AND A `rollback` PERFORM NO FILE I/O.** **`file`-tier durability is produced by a
   successful `file`-tier `write` ONLY**, so **a JS caller that deletes or rolls back a `file`-tier version
   and then constructs a FRESH instance over an equal `cfg.filePath` sees the removed version STAND AGAIN**
   — **that re-boot is the store's own declared boot and is the declared consequence of this reading, NOT a
   defect** (`DD-45`).
2. **THE PACKAGE DOCUMENTS BOTH READINGS AND COMPENSATES FOR NEITHER.** **The package performs no
   compensating file write and no re-commit**, and **a `file`-tier write that fails answers
   `FileCommitFailed` AFTER the store's own automatic journal rollback has run**
   (`[A3 docs/specs/storeroom-native/contract.md §7.2 items 3–6 | state or fail-state declaration]`).

### §2.9 `findAddress` IS NOT EXPOSED — the non-exposure clause, and its consequence

**`findAddress` IS AN INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT.** **The architect's words, verbatim:
*"find address is an internal tool - JS only needs read + edit functions and listeners"*** (`A63`).
**CONSEQUENCES, EACH STATED SO NOTHING IS LEFT TO INFERENCE:**
1. **THE JS SURFACE IS EXACTLY `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` ·
   `listen` · `unlisten` — `8` verbs — plus the returned records.** **No `NodeRef` crosses, no reference
   crosses, and `findAddress`'s *"returns reference"* has no JS spelling.**
2. **A FAILED READ IS THE EXISTENCE PROBE.** **Because no resolver is exposed, a JS caller asks whether an
   address exists by `read`ing it: a `read` that resolves answers the value, and a `read` that does not
   answers a thrown `{status, message}`.** **THEREFORE ALL `15` FAIL CODES REMAIN REACHABLE FROM JS** — the
   walk's `9` address codes on the address verbs, the value taxonomy's `ValueNotAdmitted`, the two
   construction members, `JournalOpUnknown`, `RollbackCompacted`, `ReadTargetIsBranch` and
   `ContainerKindConflict` — **and no code is left without a JS-reachable trigger.**
3. **NO `exists()` VERB, NO `findAddress` SHIM AND NO BINDING-SIDE RESOLVER IS DECLARED** — an `exists()`
   verb would be a **store-surface addition** and a shim would be a **second resolver**, and the store's own
   contract declares exactly ONE shared resolver (`§2.1`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A1 docs/specs/storeroom-js-proposal.md §10 · A65 — no
   reference crosses either way, so the non-exposure is entailed by the copy discipline and not merely a
   surface choice | prohibition]`)

### §2.10 `listen` and `unlisten` — the crossing's two registration verbs

```
listen(instance, address)      -> Handle    // mints a token, populates the store's home, wraps it for JS
unlisten(instance, handle)     -> undefined  // drops ONE store-side home entry; a no-op success for anything else
```
**`listen`'s `address` is `AddressArg`'s domain and NOTHING MORE** — **a listener carries NO tier qualifier:
its address is the WHOLE of its key** (`[A3 docs/specs/storeroom-native/contract.md §6.5 — the listener
record's closed two-member set | requirement]`). **`unlisten` returns `undefined` on success, including on
its no-op success, and throws exactly where the store does** — **and the store throws nowhere on a withdrawal
except for a malformed argument's shape.** (`[A3 docs/specs/storeroom-native/contract.md §0.4 — the
`Store::listen`/`Store::unlisten` rows | requirement]`)

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS SECTION'S SIGNATURES STAY, AND ITS REGISTRATION SEMANTICS ARE
THE STORE'S.** `RCA-8(d)` ANNOTATE-BESIDE: **the signature block above and the paragraph under it stand
byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no verb, no argument,
no return shape and no `§`-number, and it re-decides no rule.** **THE RULING, VERBATIM:** ***"Listener behavior
is part of store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE SPLIT, ONE LINE PER HALF, SO THIS SECTION'S OWN SUBJECT IS NOT READ AS THE FIRING'S:**
1. **WHAT STAYS THIS UNIT'S, AND IT IS ALL OF THIS SECTION'S OWN DECLARATION:** **the two JS SPELLINGS — the
   `listen(instance, address)` signature's return as the package's OPAQUE wrapper and
   `unlisten(instance, handle)`'s argument as that form and no other** (`§2.3` item 2, `DD-14`) — **the
   `AddressArg`-domain pass-through of `address` with no tier qualifier added by the package, the throw
   discipline of `unlisten` (the single form of `§2.5` where the store throws, and `undefined` on every
   success including the no-op success), and the package's own wrapping of the returned handle.**
2. **WHAT THIS SECTION INHERITS AND POINTS AT, AND IT IS THE WHOLE OF THE REGISTRATION SEMANTICS:** **WHICH
   address a registration binds to, WHAT `listen` does when the address is already held, WHAT `unlisten`
   removes, WHICH values it declines as a no-op success, and WHAT the home holds afterwards are ALL THE
   STORE'S** — **declared at `docs/specs/storeroom-native/write-and-read.md §6.5` items 8 (a)/(d), 12 and 14,
   with the store's own `parameter-semantics.md §2.13` (`PAR-13`) answering each outside value** — **so this
   section states the SIGNATURES the crossing reaches and never a second reading of the home.**
3. **AND ONE FIGURE THE RE-HOMING LEAVES EXACTLY WHERE IT WAS, STATED BECAUSE A READER MIGHT EXPECT IT HERE:
   `listen`'s *"mints a token, populates the store's home"* COMMENT — the block's own line above — IS TRUE OF
   THE STORE'S ACTION AND REMAINS THIS SECTION'S DESCRIPTION OF WHAT THE VERB DOES; the MINT RULE, its
   COLLISION rule, its UNIQUENESS DOMAIN and the address-level idempotence that can make the sentence's
   *"mints"* false of a repeat call are the store's, and they stand at `write-and-read.md §6.5` item 12 (c) and
   `docs/specs/storeroom-native/contract.md §0.4`'s `ListenerHandle` construction rule.**
**AND NOTHING ELSE MOVES: the eight-verb set of `§2.9`, `§2.7`'s delivery items, `§2.5`'s single form and the
`§2.6`/`§2.8` clauses stand exactly as printed; the register keeps its `8` rows with every failure list
unmoved; and no `DD` row, no `PAR-JS` row and no part entry is authored, renumbered or dropped here**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5
items 8, 12 and 14 — the home's registration semantics, inherited and pointed at; A3
docs/specs/storeroom-native/parameter-semantics.md §2.13 · `PAR-13` | requirement]`).

---

**END OF THIS PART.** **It carries the contract's `§2` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the signatures and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).

**⟶ AND THE SWEEP RECORD THIS PART POINTS AT, ADDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP
(`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves.** **The unit's divergence table
is the contract document's own `SW-1` clause, and the rows that touch THIS part are: the failure channel's ONE
form and the message's authority against a build whose JS path hand-authors messages and whose addon mints a
`TypeError` status and an unknown-verb status; `§2.4` rule 4's *"`unlisten` withdraws the registration, never
the function"* against a build that deletes the registry entry; `§2.4` item 5 (c)'s per-INSTANCE domain
against a build whose handle identity is token equality; `PAR-JS-12`'s declared invocation argument against a
zero-argument invocation; the registration site's still-`un-run` drive in the red set; and `§2.9` item 2's
`15`-code reachability against the `10` the shipped JS arms reach.** **The verbs, the handle's two spellings,
the registry's four rules and the single failure form stand exactly as printed** (`[A1
docs/specs/storeroom-js/contract.md · the sweep clause | cross-reference]`).

**⟶ AND THE MEMBER-SET CELL THAT STILL PRINTS THE PRE-`Q1` SPELLING IS PAID AT THIS CELL'S OWN HOME,
LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **every
byte above stands byte-for-byte — this part's `§2.1` dated clause 1 (a), its `(a)`–`(d)` sub-items, and its
`§2.4` item 7 whole, this pass's two insertions included — and each is read THROUGH this clause; THIS clause
is a PURE INSERTION, it re-spells no rule, adds no member, adds no `§`-number and moves no register row.**
**THE CELL IT PAYS, NAMED BY ITS OWN WORDS AND ITS OWN `§`:** **`§2.1`'s own `(a)` sub-item reads** *"**SO
`§2.4` item 5 (a)'s *"`{ register }` — one own member, and NOTHING ELSE"* IS SUPERSEDED AS A MEMBER-SET FIGURE
and read, from this date, as `{ register, on, off }`: the as-filed sentence stands byte-for-byte at its own
`§` (this document's and the contract document's, in the same words), the re-spelling of those two cells is
the NAMED REPAIR of a later bounded amendment, and THIS clause is the operative member-set statement until it
lands.**"* **THE REPAIR IS TAKEN FOR ONE OF THE TWO CELLS HERE, AND THE OTHER IS NAMED AS OWED BY A HOME THIS
PASS DOES NOT OWN:**
1. **HERE — IN THIS PART.** **`§2.4` item 5 (a)'s *"`{ register }` — one own member, and NOTHING ELSE"* IS
   READ, FROM THIS DATE, AS `{ register, on, off }` — THREE OWN MEMBERS — the as-filed sentence standing
   byte-for-byte at its own line and THIS clause being the operative member-set statement for this part;
   `§2.4` item 7's two members, their signatures, their domains, their arms and their return values stand
   unmoved beside it.** **AND THE TWO AS-FILED SITES BESIDE IT IN THIS DOCUMENT ARE NAMED SO NONE IS READ AS
   UNTOUCHED: `§2.1`'s own non-exposure clause's *"the one member that surface declares stands: the handle
   `storeCreate` returns has EXACTLY ONE member, `register(handle, listener)`"* and its construction clause's
   closing sentence are READ THROUGH `§2.1`'s dated clause 1 (a), which FIXES the value at the three-member
   set** (`docs/specs/storeroom-js/surface.md §2.1`'s dated clause 1 (a); `§2.4` item 7).
2. **OWED — IN THE CONTRACT DOCUMENT, WHOSE CELLS ARE NOT THIS PART'S TO RE-SPELL.** **`docs/specs/storeroom-js/contract.md`
   `§2.4` item 5 (a)'s own copy of the sentence, and its index region's `Q1` clause's figure table, stand as
   that document prints them — its own dated clauses READING them through `surface.md §2.1`'s dated clause and
   `§2.4` item 7 — and their re-spelling is the NAMED REPAIR of a later bounded amendment OF THAT DOCUMENT,
   exactly as this part's `§2.1` dated clause already prints it** (`docs/specs/storeroom-js/contract.md` `§0.1`'s
   closure region; `docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md` `§3`).
   **AND ONE FURTHER AS-FILED SITE IS NAMED BECAUSE IT CARRIES THE SAME FIGURE TO A CONSUMER AND LIES
   OUTSIDE BOTH DIRECTORIES: `bindings/js/README.md` — read at its own bytes by this pass — and its
   re-spelling is REPORTED and NOT taken here, that path being outside this pass's write scope.**
**AND NOTHING ELSE OF THIS PART MOVES: the module namespace stays at `8`, the `DD` family, the `PAR-JS` set,
the register's `8` rows and every failure list stand exactly as printed, and no part entry is authored,
renumbered or dropped** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79`; A3
docs/specs/storeroom-js/surface.md §2.1`'s dated clause 1 (a) and §2.4` item 7 — the operative member-set
statement; A3 docs/specs/storeroom-js/contract.md §0.1` — the cells this clause reads and does not re-spell |
cross-reference]`).

**⟶ RECONCILED 2026-10-11 — THE `Q8` DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`) ON THE JS CONVENIENCE ADD-ON, AT THIS PART: THE TWO NEW MEMBERS' CLAUSES READ AGAINST THE SHIPPED `onAt`/`offAt`, AND THE ONE ARM THAT HAD TO BE NARROWED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — `§2.1`'s dated clause with its `(a)`–`(d)`, `§2.3`'s dated clauses, `§2.4`'s rules 1–4 with item 5, item 6, item 7 and every dated clause, and this part's foot clause — and each is read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no member, no verb, no `§`-number and no row, and it re-decides no rule.**
1. **`§2.4` ITEM 7 (a)'s THREE STEPS ARE THE SHIPPED SHAPE, IN THE DECLARED ORDER.** `bindings/js/index.mjs`'s `onAt(state, instance, address, listener)` calls `validateOnArguments(address, listener)` FIRST — and that function's own first statement is the `Proxy` decision, before `Array.isArray`, before any `.length` read and before any element read — then the store's own `listen`, then `state.registry.set(handle, listener)`; the return is the handle. **A refused `address` or a refused `listener` therefore leaves NO store-side entry, NO registry entry, NO node minted and NO journal entry appended, because steps 2 and 3 never run.** **THE HELD-ADDRESS ARM IS THE SHIPPED ARM: the store's own address-level idempotence answers the existing entry's handle, `state.registry.set` replaces the function for that same identity, and `DD-52`'s *"the registry does not record which member wrote an entry"* holds of the one map.**
2. **`§2.4` ITEM 7 (b)'s THREE STEPS AND ITS TWO REMOVALS ARE THE SHIPPED SHAPE, IN THE DECLARED ORDER.** `offAt(state, instance, handle)` encodes the handle FIRST — `encodeHandle(state, handle)`'s `Opaque` arm is the only one that passes, and every outside class answers the ONE form with the store's `AddressMalformed` — then calls the store's own `unlisten`, then calls `deregister(state, handle)`, whose whole body is `state.registry.delete(handle)` and nothing else. **SO THE `DD-54` OBSERVABLE HOLDS AT THE SHIPPED BYTES: on any refusal NEITHER removal is performed and the registry entry STANDS; there is no `finally` and none may be added.**
3. **AND THE NARROWED OWN ARM, WHICH IS THE ONE CELL THIS PASS READ AGAINST THE BUILD, RESTATED SO NO READER RE-DERIVES IT: the arm's as-filed observable claims the store-side home entry withdrawn and *"a later trigger no longer carries that identity"*; THAT HOLDS ONLY IN THE ONE-ENTRY STATE — which is every case in which the STORE MINTED the token — AND IN THE CALLER-SPELLED DUPLICATE STATE ONE `off` WITHDRAWS ONE ENTRY, the token's FIRST match, while THE TOKEN STAYS BOUND TO ITS REMAINING ENTRIES, so the identity may be returned by a later trigger and invoke NOTHING SILENTLY, which is rule 1's own declared observable.** **THE TWO HALVES OF THE AS-FILED SENTENCE ARE READ SEPARATELY — the store-side half true exactly of the one entry `off` names, the package-side half true of the IDENTITY — which is what item 7 (b)'s own dated clause prints; the narrowing is consistent with the shipped `offAt`/`deregister`, whose own comment states that the identity's token-to-handle binding STANDS.**
4. **AND ONE AMBIGUITY THIS PART'S OWN FOOT CLAUSE NAMES, RE-STATED BECAUSE A READER MEETS THE CITATIONS FIRST: THIS PART'S `§2.5` ITEM 5 IS THE VERBOSE CELL AND `contract.md §2.5` ITEM 5 IS THE ABSENT-OR-FAILED-ADDON STATE, so a BARE *"`§2.5` item 5"* is ambiguous across the two homes and every citation of the verbose cell in this directory is PATH-QUALIFIED (`docs/specs/storeroom-js/surface.md §2.5` item 5).**
5. **AND NOTHING ELSE MOVES: the module namespace stays at `8`, the register keeps its `8` rows with item 5 and item 6 unmoved, the `PAR-JS` set stays `18`, the `DD` family stays at `54` rows, and the ledger's census — an amendment being a ROW and never a unit — reads `2 DONE / 0 open` UNITS = `2` ✓ with THIS PASS MOVING NO COUNT.** **NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE: NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE, and the `APP` layer for this unit is `NONE`** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A1 docs/specs/storeroom-js-convenience-proposal.md `§8`; A3 `bindings/js/index.mjs`'s `onAt` · `offAt` · `validateOnArguments` · `deregister` — the clauses read at the code's own bytes; A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-39`/`DD-42` — the lawful duplicate and the first-match withdrawal; A3 `archive/gate4/storeroom-js-convenience-adversarial.md` `§2` · `C-1`…`C-14` | state or fail-state declaration]`).
