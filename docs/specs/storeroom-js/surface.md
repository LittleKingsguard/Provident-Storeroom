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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
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

### §2.5 The single failure form

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
