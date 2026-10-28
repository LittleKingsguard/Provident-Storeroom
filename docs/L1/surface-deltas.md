# L1 surface deltas — the seven rulings, declared implementation-ready

**WHAT THIS FILE IS.** The implementation-ready delta of **`D-22` … `D-27`** and the two `FINDING`s they answer
(`strata/decisions.md` lines 1411–1783): the exact declared change to the published declaration, **every refusal
arm the rulings create or reconcile** with its act, instant, status, thrown form, `log` and state movement, **the
construction's own act order**, **the kernel's replacement occupancy**, and **the implementation wave's file set
and verification bar**. It is written so that the L4 pass that follows has nothing left to invent.

**WHAT IT IS NOT.** It edits **no source, no test, no manifest, no contract and no `strata/` file**, it opens no
unit, and it orders no wave. It draws no module boundary, adds no module and adds no endpoint: **the map's figures
stand at 19 modules and 61 endpoints** (`docs/L1/module-map.md` FIGURES; `docs/L1/modules.json`), because every
delta below lands **inside** an endpoint that already exists. The one movement the rulings force on a *declared*
surface is the fail set's `16 → 17` (§1.5), which the store already carries and the declaration does not.

**AUTHORITY AND ORDER OF READING.** `D-22` (a return shape and a discarded prefix), `D-23` (the caller names the
constraint's handle), `D-24` (the handle **is** the `id`; unique; a duplicate is an overwrite), `D-25` (a
cross-**kind** overwrite is rejected; the form is L1's), `D-26` (the batch must supply functions), `D-27` (the batch
arms them; duplicate handles in the batch are rejected regardless of kind; the check placement is L1's). Context
that is **not** re-opened and **not** contradicted: `D-17`, `D-19`, `D-20`, `D-21` (the battery work is staged and a
runner's exit code carries its red). Read with the two `FINDING`s at `strata/decisions.md:1411` (the `constraint@`
prefix is a seam, not a design) and `:1654` (the batch element carried `{address, id}` only and the function was
dropped).

**THE HONESTY CONVENTIONS THIS FILE KEEPS.** *Measured* means read at the bytes of the path and line named.
*Concluded* means derived from a measured fact plus a cited clause, and it is marked as such. *Not verified* is
printed at §6 and never smoothed into an absence. Every delta states **what it replaced**, at the site it
replaced, because the project's supersession convention is ANNOTATE-BESIDE and not whole-file rewrite
(`DEF-2026-10-02`).

---

## §0 · What was read, and the three figures this file leaves alone

**READ AT THE BYTES, all on branch `docs/pre-strata-consolidation`.**

| path | what was read |
|---|---|
| `bindings/js/index.d.ts` | the `StoreConfig` block (`:181`–`:208`), `StoreStatus` (`:237`–`:254`), `LogEntry` (`:267`–`:274`), `StoreRefusal` (`:293`–`:297`), the `listen` doc block and its declaration (`:585`–`:616`), `addConstraint`/`register`/`constraints` (`:632`–`:729`), `ConstraintPair` (`:760`–`:769`), `Constraint` (`:780`), `ConstraintIdentity` (`:788`) |
| `bindings/js/index.mjs` | `encodeConfig` (`:2956`), `encodeConstraints` (`:2846`), `constraintEntry` (`:2868`), `storeCreate`'s body from `encodeConfig` through both batch routes and the seam (`:3455`–`:4567`), the members `listen` (`:3765`), `addConstraint` (`:3941`), `constraints` (`:4181`), `register` (`:4354`), `removeListener` (`:4203`), `removeConstraint` (`:4261`); `registerOn` with its prefix exemption (`:4862`–`:4926`); `deliver` (`:4664`); `constraintAtAnyAddress` (`:4999`); `constraintPairKey`/`addressSetKey` (`:5247`, `:5259`); `withEmptyLog` (`:5326`); `constraintSite` (`:5352`); `carryConstraint` (`:5411`); `registrationCrossing` (`:5473`); `isLawfulListenerElement` (`:4827`); `KERNEL_HANDLE_PREFIX` (`:5216`) |
| `bindings/js/src/constraint-kernel.mjs` | `K-1 register` (`:486`–`:582`), `noopListener` (`:970`), `KERNEL_HANDLE_PREFIX` (`:983`), `noopHandleFor` (`:1001`), `pairKey`/`pairKeyOf`/`pairRowCarrying` (`:239`, `:273`, `:281`) |
| `typecheck/consumer-fixture.ts` | the config cell (`:105`–`:108`), the `listen` cell (`:171`–`:178`), the registration and remove cells (`:181`–`:199`) |
| the kept clauses cited below | `docs/specs/storeroom-held-listener-identity/contract.md` §2.2 items 1–10, §2.6 items 4–6, §2.7; `docs/specs/storeroom-native/contract.md` §8.1 (set and its 2026-10-23 amendment; `#16`; `#17`), §10.4 parts 1–5; `docs/specs/storeroom-js/surface.md` §2.12 items 1–6 |
| `bindings/js/test/REVIEW-2026-10-24.md` | §1 and §2, for the red ledger at §5.4 |

**THE THREE FIGURES THIS FILE DOES NOT MOVE.** **19 modules**, **61 endpoints**, and the path denominator
(`docs/L1/module-map.md` FIGURES: `105 owned + 1 co-owned + 20 unowned = 126`, with the declared target at `138`).

**⟶ AND THE THIRD OF THOSE FIGURES IS THE ONE THAT MOVED WITHOUT THIS FILE, 2026-10-28 — THE DENOMINATOR IS `198`, AND THE TWO THAT ARE THIS FILE'S SUBJECT ARE UNMOVED.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause; its `126` and its `138` are the readings of their own date.** **MEASURED AT THE INDEX THIS DATE: `git ls-files | grep -v '^scratch/'` RETURNS `198` AND THE WHOLE INDEX IS `675`, so `675 = 477 + 198` ✓** (`docs/L1/module-map.md`'s own `2026-10-28` clause carries the thirteen-term by-tree list; the owned/unowned split is owed a walk that clause did not take). **THE 19 MODULES AND THE 61 ENDPOINTS THIS FILE DOES NOT MOVE ARE EXACTLY AS PRINTED** — a tracked file is not a module, and `DEF-AC` (a)'s seventh allowlist row (`RELEASE-NOTES.md`) adds one tracked path and no endpoint. **So a reader checking this file's three figures finds two green and the third superseded at the map rather than here.**
**⟶ AND THE DENOMINATOR AND THE TWO FIGURES THIS FILE'S SUBJECT RESTS ON ARE RE-MEASURED AGAIN AT THIS TREE 2026-10-28, BECAUSE THE CLAUSE ABOVE IS ITSELF PAST STATE — THE ELEVEN COMMITS PAST `v1.4.0`.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed, including the `198`, and the `twenty` it reads `StoreStatus` at.** **THE DENOMINATOR IS UNMOVED AT `198`:** `git ls-files | grep -v '^scratch/'` reads **198** against a whole index of **675** and **477** `scratch/` paths, `675 = 477 + 198` ✓, and the thirteen terms are the ones the 2026-10-28 clause itemises — the eleven commits added files to none of them. **THE STATUS SET IS UNMOVED AT TWENTY** ✓ (`src/error.rs`'s `CODES: [&str; 20]` at `:113`), with the kernel's own token set at **NINE** ✓ and the fourteen own members ✓ — **so no row of this file's delta table moves a member, a rank or an endpoint.** **AND THE ONE SHAPE THAT DID MOVE IS NOT AN ENDPOINT AND NOT A STATUS: `LogEntry` is FIVE members since `D-65`** (`kind` · `id` · `opId` · `message` · `state`, the `seq` member gone and the array index the position), **which is a delta in the *shape* of the failure form's `log` member and therefore belongs to this file's subject even though it adds no endpoint** — `store-fail-set`'s responsibility line reads it, and the `log` clause at the surface's own declaration is its home. **THE VERSION THE DELTAS ARE READ AT IS `1.4.0` at eleven sites**, and the tag set is a record of releases, past tense, with `git describe` at `v1.4.0-11-g90f810c`; **whether `1.5.0` is cut is not a claim this file makes (`D-57`).** (`D-57`; `D-65`; the matching re-reads are `docs/L1/module-map.md`'s, `open-items-2026-10-25.md`'s and `test-stratification.md`'s clauses of the same date and `modules.json`'s `sizes_remeasured_2026_10_28_eleven_past_v1_4_0` key.)

**⟶ AND THE DENOMINATOR, THE STATUS SET AND EVERY FIGURE THIS FILE'S SUBJECT RESTS ON ARE RE-MEASURED AGAIN AT THIS TREE, 2026-10-29 — AND NOT ONE OF THEM MOVES, WHICH IS THE READING.** `RCA-8(g)` ANNOTATE-BESIDE: **both clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed, including the `198`, the `twenty` it reads `StoreStatus` at, and the `v1.4.0-11-g90f810c` it reads the tree at.** **THE DENOMINATOR IS UNMOVED AT `198`** ✓ (`git ls-files | grep -v '^scratch/'` reads 198 against a whole index of `675` and `477` `scratch/` paths, `675 = 477 + 198` ✓), **and the owned/unowned split it was owed is now taken at the map: `127 owned + 0 co-owned + 71 unowned = 198` ✓** (the `docs/L1/` term of the thirteen is now `9`, and `docs/guides/`'s `1` is the term the walk adds). **THE STATUS SET IS UNMOVED AT TWENTY** ✓ (`src/error.rs`'s `CODES: [&str; 20]`), with the kernel's own token set at **NINE** ✓, the fourteen own members ✓, the `files` allowlist at **SEVEN** ✓ and the packed member set at **`20` bare / `21` assembled** ✓ — **so no row of this file's delta table moves a member, a rank, an endpoint or a packed byte.** **AND `LogEntry` STAYS FIVE** ✓ (`kind` · `id` · `opId` · `message` · `state`, the position its array index): `D-66`, `D-67`, `D-69` and `D-70` add no member to it. **THE VERSION THE DELTAS ARE READ AT IS `1.4.0` AT ELEVEN CELLS** ✓ — unmoved, and `scripts/publish.sh --figures` PASSES on it this date (three documents, three version lines, one generator) — **with `git describe` at `v1.4.0-21-ga1c65d9`**, and the tag set a record of releases, past tense; **whether `1.5.0` is cut is still not a claim this file makes (`D-57`).** (`D-66`; `D-67`; `D-69`; `D-70`; the matching re-reads are `docs/L1/module-map.md`'s and `test-stratification.md`'s clauses of the same date and `modules.json`'s `ownership_remeasured_2026_10_29` key.)

**⟶ AND THE SAME FIGURES ARE READ A FIFTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-FOUR COMMITS PAST `v1.4.0` (`git describe`: `v1.4.0-24-g5331993`), AND NOT ONE OF THEM MOVES A DELTA.** `RCA-8(g)` ANNOTATE-BESIDE: **both clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed.** **THE DENOMINATOR IS UNMOVED AT `198`** ✓ (`675 = 477 + 198`, and the split closes `127 + 0 + 71`), **the status set at TWENTY** ✓ (`src/error.rs`'s `CODES: [&str; 20]`), **the kernel's token set at NINE** ✓, **the fourteen own members** ✓, **the `files` allowlist at SEVEN** ✓, **the packed member set at `20` bare / `21` assembled** ✓ and **`LogEntry` at FIVE** ✓ — **`D-71` and `D-72` add no member, no rank, no endpoint and no packed byte; they declare the delivery's independence and its nesting, which is a clause of use and not a row of this file's delta table.** **THE VERSION IS `1.4.0` AT ELEVEN CELLS** ✓ and **`scripts/publish.sh --figures` PASSES on this tree this date** ✓ (three documents, three version lines, one generator). (`D-71`; `D-72`; the matching re-reads are `docs/L1/module-map.md`'s, `test-stratification.md`'s and `entry-subdivision.md`'s clauses of the same date and `modules.json`'s `ownership_remeasured_2026_10_29` key.)

**⟶ AND THE SAME FIGURES ARE READ A SIXTH TIME AT THIS TREE, 2026-10-29 — THE TWENTY-SIX COMMITS PAST `v1.4.0` (`git describe`: `v1.4.0-26-g92d2ec6`), AND NOT ONE OF THE TWO SINCE THE LAST READING MOVES A DELTA.** `RCA-8(g)` ANNOTATE-BESIDE: **both clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; every figure they printed stays printed.** **THE DENOMINATOR IS UNMOVED AT `198`** ✓ (`675 = 477 + 198`, and the split closes `127 + 0 + 71`), **the status set at TWENTY** ✓ (`src/error.rs`'s `CODES: [&str; 20]`), **the kernel's token set at NINE** ✓, **the fourteen own members** ✓, **the `files` allowlist at SEVEN** ✓, **the packed member set at `20` bare / `21` assembled** ✓ and **`LogEntry` at FIVE** ✓ — **`D-73` adds no member, no rank, no endpoint and no packed byte; it keeps the listener's throw, contains the refusal beside it and declares the consequence — an unanswered write — which is a clause of use and not a row of this file's delta table.** **THE VERSION IS `1.4.0` AT ELEVEN CELLS** ✓ and **`scripts/publish.sh --figures` PASSES on this tree this date** ✓ (three documents, three version lines, one generator). (`D-73`; the matching re-reads are `docs/L1/module-map.md`'s, `test-stratification.md`'s and `entry-subdivision.md`'s clauses of the same date and `modules.json`'s `ownership_remeasured_2026_10_29` key.)

None of the seven rulings adds an I/O surface any other module reaches: `listen`'s return travels the surface it
already travels, the batch's element is the config the entry already receives, and the kernel's occupancy is
already an interaction (`I-12`). **What this file therefore owes `modules.json` is not an endpoint but a reading**
— three endpoint descriptions (`js-surface`'s `storeCreate`, `js-constraints`' `addConstraint`, `js-declaration`'s
`StoreStatus`) and one responsibility line (`store-fail-set`'s *"sixteen statuses"*) are now read through this file.
That annotation is deliberately **not** made here: it belongs to the pass that lands the edits, on the same
ANNOTATE-BESIDE ground every prior revision of the map took (`D-3`'s own disposition of a superseded clause), and
§5.1 names it as part of the wave's docs step.

---

## §1 · (A) The declaration's deltas — `bindings/js/index.d.ts`

**SEVEN EDITS, EACH WITH THE SITE IT REPLACES** — `listen`'s return (§1.1); the kernel-prefix language, whose
declaration-side delta is **nil** (§1.2); the element's `constraint` member (§1.3); the uniqueness rule as a
documented constraint on the `id` (§1.4); the union's seventeenth member and its five prose sites (§1.5) — **⟶ SUPERSEDED 2026-10-27: the union is TWENTY, and `ConstraintBodyThrew` `18` · `ConstraintRefusedAtRegistration` `19` · `ConstraintPassRefused` `20` are the three members that followed (`D-38`; `DEF-S`/`DEF-N`; `DEF-H`). `docs/L1/module-map.md` §4 E1 carries the clause and the sites**; the three
further sentences the rulings falsify (§1.6); and `register`'s doc sentence at the end of §1.6. **`js-declaration`
owns every one of them; no module may amend a declaration it does not own.**

### 1.1 `listen`'s return moves `void → Handle`, and the doc sentence that forbade it is read through `D-22`

**THE DECLARATION.** `bindings/js/index.d.ts:616`

```ts
listen(handle: Handle, addresses: readonly Address[]): Handle;
```

was `… : void;`. **`Handle` is already declared at `index.d.ts:309`** (`export type Handle = string;`) — no new type
is minted.

**THE DOC SENTENCE, DECLARED VERBATIM FOR THE IMPLEMENTER** — inserted into the member's own doc block, not
substituted for the bytes it supersedes:

> **⟶ AMENDED 2026-10-24 (`strata/decisions.md` `D-22`, verbatim: *"Listen should return the handle on success, or
> error message on fail. Discard the noop prefix"*): `listen` ANSWERS THE HANDLE IT WATCHES UNDER ON SUCCESS — the
> caller's own spelling, returned as THE IDENTITY THE STORE HOLDS FOR THAT ENTRY — and EVERY FAILURE REMAINS THE
> SURFACE'S ONE THROWN FORM (`{status, message, log}`), because this ruling mints no second failure channel. **THE
> RETURN IS A SUCCESS SIGNAL THAT CARRIES THE IDENTITY AND NOT AN ECHO TO BE SUPPRESSED**: the ground this block
> states above — *"returning the supplied handle would be a second spelling of the caller's own datum"* — is
> OVERRULED BY NAME, and the sentence stands as text read THROUGH this clause (`RCA-8(d)` ANNOTATE-BESIDE;
> `DEF-2026-10-02`: no whole-file rewrite). **What it is FOR, declared because the return has one consumer:**
> `K-1` ADOPTS the value, which is what `kernel-surface.md` declared all along (*"adopted, never minted by the
> kernel"*) and what the discarded `constraint@<JSON address>` prefix had replaced.

**WHAT IT REPLACED, AND WHAT STILL STANDS.** The block's feature sentence and its two superseded clauses —
`:592`–`:594` (*"THE CALLER SPELLS THE HANDLE AND `listen` ANSWERS `undefined`"*) and `:610`–`:614` (*"AND THE CALL
ANSWERS NOTHING"*) — stand as text and are read through the clause above. **The set-position clauses (`:594`’s
`addresses`, `:599`–`:606`'s argument position, `:610`'s SET-ASSIGNMENT) are untouched**: `D-22` moves the return
and nothing else. **The file header carries no return figure for `listen`** — verified by grep: its two `listen`
sentences (`:16`, `:30`–`:34`) speak of the arity `1 → 2` and the set position — **so the header owes no clause.**

### 1.2 The kernel-prefix language: **none stands in the declaration**

**VERIFIED BY GREP, AND PRINTED BECAUSE ITS ABSENCE IS THE DELTA.** `bindings/js/index.d.ts` carries **zero**
occurrences of `constraint@`, `KERNEL_HANDLE_PREFIX`, `noopHandleFor` or `noopListener`. The prefix was never a
declared surface, which is exactly `strata/decisions.md:1411`'s finding: *it is a seam, not a decision*. **So the
declaration-side delta for the prefix's removal is nil, and the removal lands at three code sites** — `index.mjs`
`:4900`–`:4926` (the `conflicted` exemption and its six-line comment), `index.mjs` `:5206`–`:5216` (the prefix's
declaration), and `constraint-kernel.mjs` `:983`, `:1001`–`:1003` (§4) — **plus one doc sentence in the entry's own
`register` block, which is code-side and therefore not this file's. A pass that searches the declaration for
prefix language will find none; a pass that reads the absence as *"nothing to remove"* has mis-read it.**

### 1.3 The `cfg.constraints` element gains `constraint: Constraint`, and it is REQUIRED

**THE DECLARATION.** `index.d.ts:207`

```ts
readonly constraints?: readonly {
  readonly address: Address;
  readonly id: string;
  readonly constraint: Constraint;
}[];
```

was `readonly constraints?: readonly { readonly address: Address; readonly id: string }[];`.

**ITS DOC, DECLARED.** The key's own clause gains:

> **⟶ AMENDED 2026-10-24 (`D-26`, verbatim: *"The batch in cfg.constraints must supply functions"*): THE ELEMENT IS
> THREE MEMBERS AND THE FUNCTION IS REQUIRED. The pair is the element's ADDRESSING and the function is its
> SUBSTANCE — the reading the use-case record has carried since 2026-10-16, now the declaration's own. **THE STORE
> NEVER SEES THE FUNCTION**: a JavaScript function cannot cross into Rust at any depth, so the crossing carries the
> pair and **the PACKAGE arms the substance** at construction through the same act the add route performs
> (`D-26` items 3–4). The state this key's earlier prose named — *"a well-formed element that carried no function …
> is NOT a carried pair"* — therefore **HAS NO PRODUCER ON THIS ROUTE**: a batch element is always carried.

**AND ONE THING THE DECLARATION DOES NOT CHANGE, SAID SO ITS OMISSION IS NOT READ AS AN OVERSIGHT.**
`StoreConfig.listeners` stays `readonly unknown[]` (`:194`) with the element shape *"the store's to refuse"*: the
package reads `handle` off a `cfg.listeners` element only where its own `isLawfulListenerElement` predicate holds
(`index.mjs:4827`), which the store's whole-array admission already implies — *"a REJECTED ARRAY ADMITS NOTHING"*
(`surface.md:2118`). **Narrowing it here would mint a second declaration of a position the store already owns.**

### 1.4 The uniqueness rule, **as a documented constraint on the `id` key**

The element's `id` doc gains, and this is the whole of `D-23`/`D-24`/`D-27` at the declaration:

> **THE `id` IS THE PAIR'S HANDLE, AND A HANDLE IS INSTANCE-SCOPED AND UNIQUE** (`D-23`, verbatim: *"Setting a
> constraint should expect a handle name to be used for handle and process/error logging purposes"*; `D-24`,
> verbatim: *"The handle becomes the id - the handle needs to be unique regardless, and setting a duplicate handle
> is an overwrite"*). **Two rules follow, and they are DIFFERENT RULES FOR DIFFERENT ACTS — a declaration that
> conflates them gets both wrong** (`D-27`'s own table):
>
> | act | a repeated handle |
> |---|---|
> | **this key, `cfg.constraints`** | **REJECTED** — the list is ONE supplied act, so an internal ambiguity is malformed input and not a second write |
> | **`addConstraint(pair, constraint)`** | **OVERWRITE** — acts are separate in time, so a later one replaces the earlier |
>
> **SO, AT CONSTRUCTION, TWO REFUSALS THAT THE STORE CANNOT TAKE AND THE PACKAGE OWNS** (`D-27`): no two elements of
> one `cfg.constraints` may name one `id`; and no element's `id` may equal a `handle` this construction's
> `listeners` adopts — **a cross-KIND collision, rejected regardless of kind** (`D-27`: *"Reject duplicate handles
> in batch - regardless of listener/constraint type"*). **The second is not an overwrite and the first is not a
> second registration.**
>
> **AND THE NAME'S OTHER TWO READERS NEED NOTHING** (`D-24` items 2–3, both recorded here so no pass adds a member):
> `constraints()` already returns the bare `id`, so its four exclusions stand exactly as written; and `LogEntry`
> already carries `id`, so **the name's logging role moves no member-set** and no undeclared seventh member exists.

### 1.5 The `StoreStatus` question, stated explicitly: the declaration is **one behind**, and here is the member

**MEASURED.** `src/error.rs`'s `CODES` carries **17** spellings; `docs/specs/storeroom-native/contract.md` §8.1's
2026-10-23 amendment reads *"the operative set is `17` members ranked `1`…`17`"* with `ValueRefusedAtBoundary` at
rank **`17`** (`11 + 2 + 1 + 1 + 1 + 1 = 17` ✓). **`bindings/js/index.d.ts:237`–`:254` declares SIXTEEN** —
`AddressMalformed` … `ConstraintListInvalid` — plus the escape arm `(string & {})`. **So the published type file
omits a status the store emits and the contract declares.** This is not a new finding (`strata/brief.md` §0;
`REVIEW-2026-10-24.md`'s `Q4`; `R-3`'s disposition: *"`index.d.ts` declaring sixteen is the defect"*); **it is the
delta this ruling set inherits and must not ship around**, because three of the arms at §2 refuse through this
very union.

**THE DELTA, EXACTLY.**

1. **THE SEVENTEENTH MEMBER SITS LAST OF THE LITERALS, at rank `17`, IMMEDIATELY BEFORE THE ESCAPE ARM** — the
   position `ConstraintListInvalid` held, because §8.1's amendment appends and moves no rank of `1`…`16`:

   ```ts
     | 'ConstraintListInvalid'
     | 'ValueRefusedAtBoundary'
     | (string & {});
   ```

   **⟶ AND THIS ITEM'S READING IS SUPERSEDED THREE WIDENINGS LATER, 2026-10-27 (`D-38`; `DEF-S`/`DEF-N`;
   `DEF-H`): THE LAST MEMBER IS `ConstraintPassRefused` AT RANK `20`, AND THE SHAPE ABOVE IS KEPT AS THE
   RECORD OF ITS OWN DATE.** The rule the item states is the one that has held every time — *the appended
   member sits LAST of the literals and immediately before the escape arm*, and no rank below moves — and it
   has now been applied twice more: `ConstraintBodyThrew` `18` and `ConstraintRefusedAtRegistration` `19`
   (`DEF-S`/`DEF-N`, *"Expand the returned error set for both S/N"*), then `ConstraintPassRefused` `20`
   (`DEF-H`/`DEF-W`, *"Expand the returned fail-state list to include the refusal"*). **So the delta this
   section draws is CLOSED, not withdrawn**, and the escape arm's ground is reinforced a fourth time —
   which is also why a widened union is **PATCH-shaped**: `(string & {})` is open, so no typed consumer can
   write an exhaustive switch for a new member to break.

2. **`ValueNotAdmitted` STAYS AT RANK `14`** and is not removed: it remains the store's own answer on the native
   route (`§8.1` #14 and the 2026-10-23 amendment's own sentence, *"`ValueNotAdmitted` remains the store's own
   answer on the native route and keeps rank `14`"*). **A pass that reads rank 17 as a RENAME of rank 14 has
   destroyed a member.**
3. **FIVE PROSE SITES IN THE SAME BLOCK ARE RE-SPELLED READ-THROUGH, not rewritten** (ANNOTATE-BESIDE): `:214`
   (*"THE SIXTEEN MEMBERS BELOW"*), `:219`–`:220` (the two-move history), `:225`–`:226` (*"THE SIXTEENTH MEMBER …
   LAST of the sixteen"*), `:228`–`:230` (the algebra `11 + 2 + 1 + 1 + 1 = 16`, which becomes
   `11 + 2 + 1 + 1 + 1 + 1 = 17`), and `:723` in `constraints()`' doc (*"the store's closed `16`-member set is not
   reached"* — the phrase stays true of *this read* and its figure must move).
4. **THE ESCAPE ARM'S GROUND IS REINFORCED, NOT WEAKENED**: `:218`–`:223` argues the arm from the set's having
   moved twice. It has now moved a third time — **and that is the arm's own evidence, so the sentence gains a
   third instance rather than losing its point.**
5. **NOTHING ELSE IN THE UNION MOVES**: `StoreRefusal` (`:293`) still declares `{status, message, log}` and the
   `log` census sentence still reads `["log","message","status"]`, length `3`.

**WHY NO MEMBER IS MINTED FOR THIS PASS'S ARMS.** `D-26` item 5 and `D-27` both say the package *"may mint no new
code"* and must use an existing set member; **`strata/brief.md` §5 item 4 and `D-1` item 'the failure set is closed
by the store and open by declaration'** are the standing rule. §2 therefore assigns existing members only.

**⟶ AND THIS DELTA IS CLOSED, 2026-10-25 — THE DECLARATION MOVED AND NOTHING ELSE DID.** `RCA-8(g)`
ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE
INSERTION — it moves no arm, no member, no code and no cell.** **`bindings/js/index.d.ts`'s `StoreStatus` now carries
ALL SEVENTEEN literals**, `ValueRefusedAtBoundary` written at rank `17`, **LAST of the seventeen and before** — **⟶ SUPERSEDED 2026-10-27 (`D-38`; `DEF-S`/`DEF-N`; `DEF-H`): the block at `bindings/js/index.d.ts:316`–`:336` writes TWENTY literals in rank order, `ValueRefusedAtBoundary` now stands at `17` and is followed by `ConstraintBodyThrew` `18`, `ConstraintRefusedAtRegistration` `19` and `ConstraintPassRefused` `20`, all before**
`(string & {})` (`index.d.ts:292`–`:310`), so **the delta §1.5 measures — *"the declaration is one behind"* — has no
subject from this date**; and the block's **five prose sites the section enumerated (item 3) are re-spelled
read-through** inside the declaration's own 2026-10-24 amendment, so the declaration is one file whose figures and
whose literals now agree. **The section's own reasoning stands whole and is worth keeping for the next widening:**
the escape arm is **reinforced, not weakened**, by a set that has moved a third time — and **the arm's runtime
observable is NONE** (a type-level arm only; the store's `CODES` is closed at seventeen (⟶ 2026-10-27: **closed at TWENTY**) and the package mints no
member), which is the reading `docs/L1/open-items-2026-10-25.md §2.1` closes as an `OWED`.

### 1.6 Three further declaration sentences the rulings falsify, found at the bytes

These are **not** additions: they are sentences that are now false as written, and each is a delta the implementer
would otherwise miss.

| site | what it says today | why it is false from `D-26`/`D-24` | the declared reading |
|---|---|---|---|
| `index.d.ts:710`–`:712` | *"a well-formed `cfg.constraints` element that carried no function is **not** a carried pair and does not appear"* | the batch can no longer produce that element (`D-26` item 4) | the exclusion stands for **the add route's refused registration alone**; the batch half of the sentence is read through `D-26` |
| `index.d.ts:760`–`:769` (`ConstraintPair`) | the `id` is the pair-local key; *"two pairs at different addresses are TWO pairs"* is implied by `constraintPairKey`'s shape | the `id` is **instance-scoped** from `D-24` | the shape is unchanged (no field is added); the doc gains: **one `id` names one pair, one identity and one handle**, and the pair-local reuse of one `id` at two addresses is **no longer lawful** — see **`Q-2`** (§7), which is where the two readings collide and where this file refuses to choose |
| `index.d.ts:643` and `:632`–`:642` (`addConstraint`) | *"throws nothing for the mere fact that the pair was held"* | true and unaffected — **but the overwrite is now SAME-KIND ONLY** (`D-25`) | the doc gains the cross-kind refusal sentence and its status (§2.4), and the overwrite clause is scoped by kind in words |

**AND `register`'s doc (`:655`) gains one sentence**: `register` refuses where a constraint's `id` stands at the
address — the cross-kind rule's other direction — **in the surface's one thrown form** (§2.5).

---

## §2 · (B) The refusal arms — five, each declared arm by arm

**THE COUNT: 5.** Three at construction (`ConstraintListInvalid`), two at the post-creation acts
(`AddressMalformed`). **The status rule, stated once and applied five times:** *the member is chosen by the ACT'S
OWN SUBJECT — a supplied LIST is validated under the list's own member, and a single registration's identity is
refused under the handle/address domain's* — and **no member is minted** (§1.5's clause 5).

| # | arm | the act that refuses | the instant | `status` | `log` | state moved before? |
|---|---|---|---|---|---|---|
| **B-1** | a batch element whose `constraint` is missing, `undefined` or not a function | `storeCreate` | pre-create, list's walk, first fault in position order | `ConstraintListInvalid` | present, `[]` | **no** |
| **B-2** | two batch elements naming one `id` | `storeCreate` | pre-create, same walk, at the **later** element | `ConstraintListInvalid` | present, `[]` | **no** |
| **B-3** | a batch `id` equal to an adopted listener's `handle` | `storeCreate` | pre-create, same walk, after B-1 and B-2 for that element | `ConstraintListInvalid` | present, `[]` | **no** |
| **B-4** | `addConstraint` whose `id` equals a live listener's handle | `addConstraint` | after the position class tests, **before** the held-pair purge and before any store call | `AddressMalformed` | present, `[]` | **no** |
| **B-5** | `register` where a constraint's `id` stands (today `throw withEmptyLog(new TypeError(…))`) | `register` | after the handle's domain and registry tests, **before** the registry write and before the re-install `listen` | `AddressMalformed` | present, `[]` | **no** |

**ONE FORM, DECLARED ONCE FOR ALL FIVE:** the surface's single failure channel, a **thrown plain object carrying
exactly `{status, message, log}`** — never an `Error` subclass, never a rejection, never a returned discriminant
(`index.d.ts:276`–`:297`; `surface.md §2.5` items 1–10). **`log` IS PRESENT AND EMPTY (`[]`) ON EVERY ONE OF THE
FIVE**, which is the declared value *"where the failure's cause has no attempt at all"* (item 4): at `B-1`–`B-3`
no instance exists and no attempt was opened; at `B-4`/`B-5` the refusal precedes every store act, so no attempt
was opened either. **A pass that omits `log` on any of them breaks the census cell that reads
`Object.keys(caught)` as exactly `["log","message","status"]`.**

**AND THE MESSAGE'S PROVENANCE, DECLARED BECAUSE A REFUSAL THAT AUTHORS ITS OWN SENTENCE IS A FINDING.** The
`message` is the **store's own generated string**, reached through the generator the entry already holds
(`addon_.errorMessage(status, subject[, container])`, the path `boundaryReject` (`index.mjs:700`) and
`registrationCrossing` (`:5473`) already take), **with the failing target's class-and-position clause appended as
part two** — the shape `§8.2`'s rows are built from (`<CONTAINER>`, `<SEGMENT>`, and for `ValueRefusedAtBoundary` the
package's own appended class clause). **No code is minted and no status is authored.**

### 2.1 `B-1` — a batch element's `constraint` is missing, `undefined` or not a function

**THE ACT.** `storeCreate`. **THE INSTANT.** In the construction's pre-create validation walk, over the elements
the store would otherwise admit, in ascending position order — i.e. **before `addon_.storeCreate(encoded)` and
therefore before any filesystem act** (§3). **It is not the arming loop.** Today's code silently `continue`s at
`index.mjs:4455` (`if (typeof element.constraint !== 'function') continue;`), **after** the store has been created
and the file possibly written — which is exactly the defect `D-26` rules away.

**THE STATUS — `ConstraintListInvalid`, AND WHY IT IS THE RIGHT MEMBER.** §8.1 #16's trigger column already owns
**the element's shape**: *"a validation of that list … finds an ELEMENT that is not a `{address, id}` pair, or an
element whose `address` lies outside §1.5's segment array, or an element whose `id` is absent or not a record
identity's own member"*. `D-26` makes the function a member of the **declared element type**, so an element without
one is an element that is not of the declared shape — **the same subject the member already governs, decided one
layer up because a function cannot cross**. **`AddressMalformed` is refused for this arm** on §8.1's own
non-overlap clause: *"#1 governs CONSTRUCTION ARGUMENTS' own presence and shape, while this member governs THE
LIST'S VALIDATION"* — and an element is not an argument.

**WHAT THE `message` NAMES.** The container (`constraints`), **the failing element's own position**, the element's
own `address` spelling where it carries one (§8.2's `<SEGMENT>` rule), **and the class found at the `constraint`
member** — absent, `undefined`, or `a <class>` — with the declaration's own rule: *"a batch element's `constraint`
is a JS function and it is the pair's substance"*. **The position is named because the element is not otherwise
identifiable** — two elements may carry one address.

**ALTERNATIVES, PRICED, AND REFUSED.**
- **(a) Keep the silent drop** (today's `continue`) — **refused**: `D-26` item 1 rules the element three-member and
  names the drop *"a DEFECT and not a design"*; a caller who supplied a function and got an unarmed pair has been
  told nothing, which is the shape this project keeps filing.
- **(b) Refuse in the arming loop, after the store is created** — **refused**: it would refuse a construction
  *after* the exclusive create has left the store's own zero-length file, breaking §10.4 part 5's *"every
  construction that fails leaves nothing behind"*.
- **(c) Let the store refuse** — **impossible**: *"a JavaScript function cannot cross into Rust at all"*
  (`D-26` item 3), so the store cannot see the member, and §7.1 step 4-bis has no arm for it.
- **(d) Mint a status** — **forbidden**: the package mints none (`D-26` item 5).

### 2.2 `B-2` — two batch elements naming one handle

**THE ACT.** `storeCreate`. **THE INSTANT.** The same pre-create walk, **at the later element** — so the report is
per **element**, not per pair, and the first fault in list order is the one that crosses (`D-27`'s own open
question, *"whether a duplicate inside the batch is reported per element or per pair — a receipt shape"*, is
answered here as **per element**, because a refusal names one failing position and `B-3` needs the same shape).

**THE STATUS — `ConstraintListInvalid`.** `D-27`'s own table gives the ground: *"the list is ONE supplied act, so an
internal ambiguity is malformed input and not a second write."* **The list's validation is the member's subject;
`addConstraint`'s overwrite rule is not, and reading this arm as an overwrite is the conflation `D-27` warns
against.**

**WHAT THE `message` NAMES.** The `id` **by value**, **both positions that name it**, and the rule — *"a batch
element's `id` is the store-side handle for its pair, and one batch may not name one handle twice"*.

**ALTERNATIVES, PRICED, AND REFUSED.**
- **(a) Treat the second as an overwrite** (the add route's rule) — **refused by `D-27`'s table**: the distinction
  *is* whether the two namings arrive in one act or in two, and a list is one act.
- **(b) Let the last element win silently** — **refused**: it is a silent loss of a caller-supplied function, and
  the store cannot see the id namespace to decide it.
- **(c) Let the store refuse** — **impossible**: `ConstraintEntry::Pair { address, id }` is pair-local
  (`src/args.rs`), and pair-local uniqueness says nothing about two elements naming one **handle**.
- **(d) Refuse at the arming loop** — **refused**: §2.1's (b), the file is already on disk.

### 2.3 `B-3` — a batch `id` equal to an adopted listener's handle (the cross-kind case at construction)

**THE ACT.** `storeCreate`. **THE INSTANT.** The same pre-create walk, **after `B-1` and `B-2` have run for that
element**. **It must run where the adopted listeners are known** — see §3.3 for the information dependency, which
is not L1's to move.

**THE STATUS — `ConstraintListInvalid`.** Ground: `D-27` — *"both arms are the PACKAGE's, refusing in the one
thrown form with an existing set member (`ConstraintListInvalid` remains the natural one)"*. **This is the arm at
which `D-25`'s cross-kind rule reaches the construction**, and `D-27` says so in as many words: *"a batch `id`
colliding with an adopted listener's handle must be REJECTED … which is `D-25`'s cross-kind rejection applied at the
one instant it can be checked wholesale."*

**WHAT THE `message` NAMES — BOTH SIDES, as the register-side arm already does** (`contract.md §2.3` item 9 (iii)'s
obligation): the element's position, the `id` by value, **and the address that `id`'s listener is adopted at** —
with the shared rule sentence *"a listener and a constraint do not share one"*. **The same sentence is reused at
`B-5` so the two directions read alike**, which is what makes `D-25`'s *"symmetric"* observable as one text.

**ALTERNATIVES, PRICED, AND REFUSED.**
- **(a) Let the later act win** — **refused by `D-27`** (*"regardless of listener/constraint type"*), and because
  the winning act is a purge: `listen`'s set-assignment destroys the entries the handle names
  (held-listener contract §2.2 item 3).
- **(b) Refuse at the arming loop, post-create** — **refused**: §2.1's (b).
- **(c) Refuse with a `TypeError`** — **refused**: §2.5's ground; a store status exists for this arm.
- **(d) `AddressMalformed`** — **refused here** even though `B-4`/`B-5` take it: this arm's subject is *the supplied
  list's* element, and the split is `D-27`'s own (list → the list's member; a single act → the act's).

### 2.4 `B-4` — `addConstraint` whose `id` equals a live listener's handle: `D-25`'s *"vice versa"*, **a direction with no test at all today**

**THE ACT.** `addConstraint`. **THE INSTANT.** **After** `constraintSite` (`index.mjs:5352`) has passed the two
positions' class tests and decoded the address set, and **before** the held-pair branch — therefore before
`withdrawStanding`'s purge (`:3984`), before `K-1`, and before any store call. **The seam is named because it is
load-bearing:** the held-pair arm's order is CHECK → PURGE → ADD, and a purge that ran before a cross-kind refusal
would destroy a standing registration and then refuse — *"a purge with no add"*, the state `(O-4)`'s ground exists
to prevent.

**THE STATUS — `AddressMalformed`.** Ground: this surface's own reading of that member, *"`AddressMalformed` — the
instance's domain is the domain"* (`R-B4`, quoted at `index.mjs:4876`), read with `D-24`'s instance-scoped handle:
**an `id` that names a live listener is outside this instance's handle domain for a constraint.** It is also the
status the register-side sibling already answers for the adjacent fact (*"this instance holds no listener entry
for it"*, `:4888`), so one member function does not print two codes for one namespace question.

**WHAT THE `message` NAMES.** The pair's `id`, **the address the colliding listener stands at**, and the shared
rule sentence — *"the listener '<h>' cannot share its handle with the constraint '<id>' at <address>: a listener and
a constraint do not share one"* — naming **both sides**, per §2.3 item 9 (iii).

**ALTERNATIVES, PRICED, AND REFUSED.**
- **(a) Let the kernel's `listen(id, set)` purge the listener** (the §2.2 item 7 unconditional reach, now under the
  caller's own word) — **refused by `D-25`'s *"vice versa"*, and refused as a silent loss**: the listener stops
  firing with no observable at the instant of the loss.
- **(b) Let the same-kind overwrite rule swallow it** (one handle ⇒ overwrite) — **refused by `D-25`**: *"the
  overwrite rule is same-kind only"*.
- **(c) The constraint methods' `TypeError`** (their declared form for outside *values*, `surface.md §2.12`
  item 4) — **refused**: the pair is **in** domain as a pair; what is refused is a cross-registration fact, so a
  store status is available and the `TypeError`'s absent `status` would make `B-4` and `B-5` indistinguishable to a
  caller's one `catch`.
- **(d) `ConstraintListInvalid`** — **refused**: no list is being validated at this act; see §2.3 (d)'s rule.
- **(e) Open a THIRD population route via the toggles** — **refused**: `constraintOn`/`constraintOff` name an
  **existing** pair and introduce no `id` (`surface.md §2.12` item 3), so no arm is owed at either.

### 2.5 `B-5` — the existing `register`-side cross-kind refusal, whose form is reconciled

**WHAT IT IS TODAY, AT ITS BYTES.** `index.mjs:4918`–`:4926`:

```js
const conflicted = typeof handle === 'string' && handle.startsWith(KERNEL_HANDLE_PREFIX)
  ? null
  : constraintAtAnyAddress(state, handle);
if (conflicted !== null) {
  throw withEmptyLog(new TypeError(
    `the listener '${handle}' cannot be registered at ${JSON.stringify(conflicted.address)}: the constraint `
      + `'${conflicted.id}' stands at that address, and a listener and a constraint do not share one`,
  ));
}
```

**Neither the one plain `{status, message}`/`{status, message, log}` form the surface declares for every refusal,
nor a bare `TypeError`** — it is a `TypeError` carrying `log: []` (`withEmptyLog`, `:5326`). **`D-25` hands the form
to L1; here it is.**

**THE DECLARED RECONCILIATION — the one plain form, `AddressMalformed`, and the prefix exemption deleted.**

1. **THE FORM MOVES TO THE SURFACE'S ONE THROWN OBJECT** `{status: 'AddressMalformed', message, log: []}`, rendered
   through `boundaryReject` exactly as the three arms directly above it in the same function already are
   (`:4864`–`:4893`). **The grounds:** *(i)* one member function cannot print two failure forms — the arm sits
   between two `boundaryReject` calls today, and a caller's single `catch` sees an object with `status` on nine of
   `register`'s ten arms and without one on the tenth; *(ii)* the surface's own header calls a `TypeError` thrown by
   any store-reaching verb **a finding** (`index.d.ts:542`–`:552`, and the battery cell
   `a127_no_store_reaching_verb_throws_the_class_test_form`), and `register` **is** a store-reaching member on its
   re-install arm (`index.mjs:4953`); *(iii)* the class test form belongs to **outside values of a position**, and
   a handle that names another kind's registration is **in** its position's domain and outside the instance's
   domain for that kind — the distinction the three constraint methods' `TypeError` already rests on.
2. **THE STATUS IS `AddressMalformed`**, and **the message is the package's own text naming BOTH SIDES** — both the
   listener's handle and the standing constraint's `id` and address, **its words unchanged from the sentence above**
   (`contract.md §2.3` item 9 (iii) is a prose obligation and not a generator row, so the text is the package's and
   the move is a change of form and not of content).
3. **THE PREFIX EXEMPTION IS DELETED, NOT MOVED** (`index.mjs:4918`–`:4920` and its six-line comment at `:4900`–
   `:4917`): under `D-22` the kernel's handle is no longer a reserved spelling, and under `D-25`'s own reading *"the
   kernel registers nothing, so nothing needs to get past the test"* (§4.3) — **so `Q2`'s hazard dissolves with its
   cause**, and the exemption's removal is the code half of `R-4`/`D-22`'s promise.

**THE INSTANT.** Unchanged and **load-bearing**: after `state.registry.has(handle)` succeeds (`:4886`) and **before**
the registry write and **before** the re-install `listen` (`:4953`) — a refusal leaves the registry, the home mirror
and the store untouched.

**ALTERNATIVES, PRICED, AND REFUSED.**
- **(a) Keep `TypeError` + `log: []`** — the form the held-listener contract's §2.2 item 9 declares for the conflict
  — **refused**: that item's ground is *"NO `CODES` WIDENING … NO census re-derivation at the ~13 sites that print
  `16`"*, and it was written while a reserved prefix existed so that the conflict could be told from a class test
  by **identity**. `D-22` removes the prefix and `D-25` keeps the test, so the arm is no longer a class test at all
  and the price it was buying is gone. **The census it protected is now owed anyway** (§1.5), so the `TypeError`'s
  second reason has expired.
- **(b) A bare `TypeError`** (no `log`) — **refused**: `Object.keys(caught)` would differ between this arm and every
  other refusal of the same member, and the caller's one `catch` cannot branch on it.
- **(c) An object-literal form with no `log`** — **refused**: §2.5 item 4's census.
- **(d) Refuse at `listen` instead** — **refused, and this is a contract wall, not a preference**: held-listener
  contract §2.2 item 7 — *"`listen` GAINS NO CONFLICT TEST AT ALL, and its purge reach stays UNCONDITIONAL"*.
  See `Q-1` (§7).

### 2.6 Two candidates that are **not** arms, and why the count is 5

- **`constraintOn`/`constraintOff` owe no cross-kind arm**: both name an existing pair and introduce no `id`
  (`surface.md §2.12` item 3; `D-24`), so neither can bring a **new** handle into the namespace.
- **`listen` owes no arm and may take none** (item 7, above). **The residual state this leaves is printed at
  `Q-1`** rather than closed here.

---

## §3 · (C) The construction order — `D-27`'s delegated placement

**THE TWO CONSTRAINTS THAT ARE NOT L1'S TO MOVE** (`D-27` item 3, in the ruling's own words): **every check
precedes any filesystem act**, and **the function check precedes the uniqueness check that must see the adopted
listeners**. Everything below sits inside those two walls.

### 3.1 The order, act by act

**THE PACKAGE PERFORMS NO FILESYSTEM ACT AT ALL**: `encodeFilePath` class-tests the value and the probe is the
store's (`src/store.rs`'s `path_is_reachable`, §10.4 part 1). **The construction's first filesystem act is inside
`addon_.storeCreate(encoded)`**, which is what makes "before any filesystem act" a decidable line in the entry.

| # | the act | where it stands today | what it refuses |
|---|---|---|---|
| 0 | **`withAddon()`** — the artefact gate | `index.mjs:3455`'s predecessor | the absent/failed/mismatched addon (`js-resolution`) |
| 1 | **`encodeConfig(cfg)`** — the class test on `cfg`, then the four keys by their own membership rule, in the encoder's own order: **`filePath` (class/shape only, no probe), `journalLength` (positive integer), `listeners` (the array's class then each element's `address`/`handle`), `constraints` (the array's class then each element's `address`/`id`)** | `index.mjs:2956`–`:2975` | `AddressMalformed` for `cfg` and for each argument's own presence/shape |
| 2 | **★ NEW — the batch's member checks**, over the elements the store would admit, ascending position, three checks per element: **(2a) the function check (`B-1`)** → **(2b) the within-batch uniqueness check (`B-2`)** → **(2c) the cross-kind check against the adopted listeners (`B-3`)** | *no such block exists*; the function test is a silent `continue` at `:4455`, after the create | `ConstraintListInvalid` |
| 3 | **`addon_.storeCreate(encoded)`** — the store's own seven-step sequence (§7.1 + 3-bis + 4b): argument folds → **the path probe (step 3)** → **the exclusive create (step 4b, the LAST argument-validation act)** → boot and registry | `index.mjs:3458` | `ConstructionArgumentMissing`, `AddressMalformed`, `FilePathUnreachable`, and the store's own `ConstraintListInvalid` |
| 4 | **the instance's publication** — `STORE_INDEX`, `state.receiver`, the `FinalizationRegistry` row | `:4432`–`:4443` | none |
| 5 | **the batch's arming** — per admitted element, `carryConstraint(state, instance, [address.s], id, element.constraint)` (`K-1`, the same call the add route makes) | `:4449`–`:4481` | the registration-time evaluation's refusal (`ConstraintListInvalid`, states 2/3-failure) — **the only list-shaped refusal that survives step 2** |
| 6 | **the adopted listeners' application** — one `instance.listen(handle, addressSet)` per accumulated handle (the boot route, §2.2 item 8) | `:4515`–`:4561` | the store's own `listen` refusal |
| 7 | **`installAttemptSeam(instance)`** | `:4565` | none |

**NO ACT MOVES ACROSS ANOTHER.** Steps 1, 3, 4, 5, 6 and 7 keep today's order and today's content; **step 2 is
inserted between them, and steps 5 and 6 change only in what they now know** (below).

### 3.2 Where the function check and the two uniqueness checks sit, and why

- **The function check (`2a`) is FIRST among the three, and first for every element before that element's
  uniqueness checks.** Ground: `D-27`'s own surviving constraint — *"it precedes the uniqueness check that must see
  the adopted listeners"* — generalised, because a function fault is decidable **from the element alone** while
  both uniqueness checks need a second input (an earlier element, or the listener list). **The first fault to cross
  is therefore the fault that needs the least information**, which is the first-fault convention the JS walk
  already takes (`A76`'s part (1), `crossing.md`).
- **The within-batch check (`2b`) precedes the cross-kind check (`2c`) for the same element.** Ground: `2b` is
  decidable from the list alone; `2c` requires the adopted handles. **A caller whose list is self-contradictory is
  told the self-contradiction, not a collision with an argument they may not even have supplied.**
- **All three precede the listeners' adoption — and are computed from the SUPPLIED listener list, not from the
  store's adopted one.** **That is not a loophole; it is the only placement that satisfies both walls**, because
  under the boot ruling (held-listener §2.2 item 8) every adopted handle is applied **through `listen`**, i.e. at
  step 6, after the create. **The information the check needs is available at step 1 and is the same set**: a
  `cfg.listeners` array that reaches step 3 is admitted **whole** — *"a REJECTED ARRAY ADMITS NOTHING"*
  (`surface.md:2118`) — so on any construction that can succeed, **the lawful supplied handles and the adopted
  handles are the same set**. **Concluded, not read**: this rests on the whole-array admission clause plus
  `encodeListeners`' own per-element arms (`index.mjs:2814`–`:2831`), which are the store's refusals carried and not
  the package's decisions. **A pass that finds a per-element admission arm in `src/args.rs` has found a falsifier
  of this paragraph and must re-place step 2c** — that is the honest boundary of the claim.
- **The checks are taken over the elements the STORE WOULD ADMIT, and skip the encoder's own `{bad: …}` arms**
  (`constraintEntry`'s three refusals, `index.mjs:2868`–`:2888`; `encodeListeners`' two, `:2822`–`:2830`). Ground:
  `D-27` — *"the store's own list validation keeps its subject — shape, address domain, `id` domain — and gains no
  arm"*. **The package does not shadow a store refusal**, so an element that is both malformed and functionless is
  refused by the store's own code, at its own instant, with its own generated message.

### 3.3 What the order buys, stated because it is the point of the delegation

**THE CONSTRUCTION'S STEP 5 AND STEP 6 NOW COMMUTE.** Under `D-22`/`D-24` the pair's home entry is created under the
caller's own `id` (§4), and `listen`'s purge is total over the entries the handle names (§2.2 item 3). **Before step
2 existed, a batch `id` equal to an adopted listener's `handle` would have made the order of steps 5 and 6 a
correctness matter** — whichever ran second would purge the first (`D-26`'s own open question, answered by `D-27`
as *"an information dependency"* rather than as a sequence). **Step 2 removes the colliding state before either act
runs, so the order between them becomes unobservable and stays as filed.** **That is the whole answer to `D-26`'s
*"how it composes with `D-25` at construction"*, and it is why the checks are pre-create rather than in the arming
loop: a check placed at step 5 would leave the colliding state reachable at step 6's instant.**

---

## §4 · (D) The kernel's deltas

### 4.1 What `constraint-kernel.mjs` loses

| symbol | at | what it is | what replaces it |
|---|---|---|---|
| `noopListener` (`function noopListener() {}`) | `constraint-kernel.mjs:970` | the inert body armed at the pair's home entry | **nothing** — the kernel registers no body (§4.2) |
| `KERNEL_HANDLE_PREFIX` (`'constraint@'`) | `:983` | the reserved spelling's prefix | **nothing** — there is no kernel-authored spelling left to reserve (`D-23`: *"There is no kernel-authored identity left to reserve, so the prefix is not merely discarded — it has nothing left to name"*) |
| `noopHandleFor(address)` | `:1001`–`:1003` | `constraint@` + `JSON.stringify(address)` | **the caller's own `id`**, which is already `K-1`'s third position |

**AND THE ENTRY'S HALF DIES WITH THEM**: `index.mjs:5216`'s `KERNEL_HANDLE_PREFIX` and `:4918`–`:4926`'s exemption
(§2.5 item 3). **The kernel's export set is untouched: all three symbols are module-private** — verified: the six
`export` sites are `register` (`:486`), `commit` (`:1008`), `runAttempt` (`:1158`), `log` (`:2063`), `report`
(`:2075`), `remove` (`:2111`). **So the two greens cells that census the module namespace by exact string
(`blind-constraints-v2.mjs:1139`'s five names; `held-listener-identity-greens.mjs:909`'s sorted-vs-unsorted
comparison) are neither fixed nor worsened by this delta, and their reds stay attributable elsewhere** — which
matters for §5.4's bar. **⟶ AND THIS PARAGRAPH'S LINE NUMBERS AND ITS COLOUR ARE BOTH SUPERSEDED, MEASURED
2026-10-25:** the blind cell's six-name assertion stands at **`tests/e2e/blind-constraints-v2.mjs:1251`** (the cell
opens at `:1249`) and it is **GREEN**, pinning `commit,log,register,remove,report,runAttempt`; **`HLI-13.1`** stands
at **`tests/e2e/held-listener-identity-greens.mjs:951`** and is **GREEN**, because the greens file declares its own
sorted `KERNEL_ITEMS` at `:31` (`strata/decisions.md` `D-15`). **So neither cell is red and nothing here is
attributable** — the two pre-move addresses this sentence cites (`:1139`, `:909`) were `bindings/js/greens/`
addresses before the batteries were stratified into `tests/e2e/`. **The six `export` sites listed above are stale by
the same cause and to the same degree:** `:486`/`:1008`/`:1158`/`:2063`/`:2075`/`:2111` are addresses in a file that
no longer carries them, the kernel being a **4-line barrel** at `bindings/js/src/constraint-kernel.mjs` whose six
names are re-exported from four of its five parts (`docs/L1/kernel-subdivision.md` §4).

### 4.2 What replaces the pair's occupancy of its home entry — the call and the return

**THE NEED THAT SURVIVES ANY SIGNATURE** (`strata/decisions.md:1442`): the pair must occupy a **store-side home
entry** so it appears in the caller-visible `triggered`/`watched` sets, and so the two-layer delivery can be stated
over one set. **`kernel-surface.md`'s declared purpose for that entry is exactly this**, and under `D-23`/`D-24` it
now does so **under the caller's own `id` as the handle**.

**THE DECLARED REPLACEMENT, at `K-1`'s own two lines (`constraint-kernel.mjs:562`, `:565`–`:566`):**

```js
// was: const home = standing === undefined ? noopHandleFor(address) : kernel.handles.get(…);
// was: store.listen(home, set);
// was: store.register(home, noopListener);
const adopted = store.listen(id, set);   // the caller's own word IS the handle (D-23, D-24)
// … and the return is the adoption point (D-22):
kernel.handles.set(<the row's own key>, adopted);
```

**FOUR DECLARED PROPERTIES OF THAT CALL, EACH CHECKABLE.**

1. **WHAT IT CALLS: `store.listen(id, set)` — the published member, two positions, the handle first.** `set` is
   unchanged (`:557`–`:561`'s accumulated set), so the pair's ONE handle still stands at every one of its addresses
   in **one** set-assignment act.
2. **WHAT IT DOES WITH THE RETURN: it ADOPTS it.** `D-22` makes `listen` answer the handle; the kernel stores the
   answered value as the pair's handle and **consults it again only where it already did** (the `K-6` purge, and the
   `kernel.handles` row). **The ruling's own words settle why this matters**: the return restores what
   `kernel-surface.md` declared all along — *"adopted, never minted by the kernel"* — and it is what makes
   `FTS-12.4`'s observable (`store.listen(addr) === kernel.register(...)`, by reference equality) **assertable
   instead of unsatisfiable** (`D-22`'s own closing paragraph).
3. **IT MAKES NO SECOND CALL.** **`store.register(home, noopListener)` is deleted, not re-pointed.** Grounds, in
   order: `D-22` discards the noop entirely; `D-25` states the consequence the architect drew — *"under `D-22` the
   kernel registers nothing, so nothing needs to get past the test"*; and **the registry entry is not needed**: a
   handle the registry holds **no function** for **fires nothing, silently** (`surface.md §2.4` rule 1,
   `index.mjs:4636`–`:4639`), which is precisely the noop's whole behaviour. **So the deletion is behaviour-preserving
   and removes the one registration that ever needed the exemption.**
4. **THE REGISTRY ENTRY THE `listen` CREATES STAYS RESERVED** (`{fn: undefined, off: true, addresses}`,
   `index.mjs:3839`–`:3846`), and `K-6`'s route (`removeListener`) removes it whole — so a `removeConstraint` still
   leaves nothing behind.

### 4.3 The consequence for §2.2 item 7's unconditional purge — and whether an arm is owed

**WHAT ITEM 7 DECLARES.** *"`listen` does not test whether the entry it destroys belongs to another actor, and no
clause exempts a kernel-held entry"*, with its declared consequence printed in the contract: *"the store's home
entry is PER ADDRESS and the kernel's `noopListener` registration is SHARED by every pair at that address, so a
write to one pair at an address silences delivery for every pair there"*.

**THE CONSEQUENCE OF `D-22`, STATED AT THE SIZE IT ACTUALLY IS.** **The kernel becomes an ordinary actor with an
unconditional purge — and, because the purge is BY HANDLE, its reach is narrower than the prefix made it look.**
`listen(id, set)` destroys the entries **the handle `id` names** (item 3: the set is an assignment), not every entry
at those addresses; so it cannot touch an app listener standing at the same address under a **different** handle.
**The one entry it can destroy is one that carries the same string — i.e. the same identity — which is exactly the
cross-kind collision `D-25` rejects at every population act and `B-3`/`B-4` name.** **Concluded, not read**: this
follows from item 7's own declared consequence (*"the home entry is PER ADDRESS"*, and `DD-39`'s two-elements-at-one-
address keep two entries) plus item 3's set-assignment; `src/store.rs`'s `Home::purge` was **not** read at its bytes
by this pass. A pass that reads it and finds an address-wide purge has found a falsifier of this paragraph and one
more silent-loss arm than §2 declares.

**SO: NO ARM IS OWED AT `listen`, and none may be taken** — item 7's *"GAINS NO CONFLICT TEST AT ALL"* is a kept
clause and this file does not overrule it. **What `D-23` said would happen, happens**: the occupancy stops being an
anonymous intrusion and becomes *"the application's own word for that constraint"*, so the residual is **legible**
rather than hidden. **The residual itself is `Q-1` (§7)**, put to the architect rather than closed here.

**AND ONE ARM IS OWED ELSEWHERE BECAUSE OF THIS SHAPE, AND IT IS PRINTED AS A FINDING** — see **`Q-2`**.

---

## §5 · (E) The implementation wave's shape

### 5.1 The file set, in order, with the owner of each step

**FOUR STEPS, AND THE ORDER IS A DEPENDENCY AND NOT A PREFERENCE.**

| # | the files | the module | what lands | what verifies it |
|---|---|---|---|---|
| **1** | `bindings/js/index.d.ts` **and** `typecheck/consumer-fixture.ts` — **one atomic step** | `js-declaration` (the declaration) and **no module** (the fixture, `module-map.md §5.3`) | §1's seven deltas; the fixture re-derived at its two now-false cells (`:108`'s functionless element, `:177`'s `const listen: void`) | **`npm run typecheck` — and it is GREEN ONLY IF BOTH LAND TOGETHER.** Measured: the fixture supplies `constraints: [{ address: ['k'], id: 'c1' }]` and binds `listen`'s return to a `void`-typed constant, so **each edit alone makes the leg red**; a pass that lands the declaration and calls the leg's redness "pre-existing" has broken the bar |
| **2** | `bindings/js/src/constraint-kernel.mjs` | `js-constraints` | §4: three symbols out, `store.listen(id, set)` in, the return adopted, `store.register`'s call deleted | the JS battery's `constraint-kernel-*` cells and the greens — **all red for documented reasons (§5.4)**, so this step is verified by *whose* reds appear, not by green |
| **3** | `bindings/js/index.mjs` | `js-surface` (the members and `storeCreate`), `js-registry-delivery` (`registerOn`), `js-constraints` (the glue, `KERNEL_HANDLE_PREFIX`) | `listen`'s return (§1.1); the construction's step 2 block (§3.1) and the arming loop reading the checked function; `registerOn`'s form and the exemption's deletion (§2.5); `addConstraint`'s cross-kind check (§2.4) | as step 2 |
| **4** | `bindings/js/test/**` and `bindings/js/greens/**` | `js-battery`, `greens-harness` — **not L4's step**: `D-19`'s/`D-20`'s execution pass, under the transitional write-scope grant | every cell whose expectation is one of the shapes steps 1–3 move (§5.3) | `npm test` and `npm run greens`, against §5.4's ledger |

**WHAT IS DELIBERATELY ABSENT FROM THE SET, EACH WITH ITS GROUND.**

- **`bindings/js/package.json`** — **untouched.** The kernel keeps its path and the entry keeps requiring it, so
  **reachability is unchanged** and the fourth `files` row stands as a fact of the tree (`D-3`/`D-4` lifted the
  count; `D-1-ter`'s ordering still forbids retiring the row before the code stops requiring the file, and this
  wave does **not** stop requiring it).
- **`src/**` and `bindings/js/src/*.rs`** — **untouched.** `ConstraintEntry::Pair { address, id }` stays two fields
  (`D-26` item 3), `CODES` already carries seventeen (⟶ RE-MEASURED 2026-10-27: **twenty**, `[&str; 20]`) (`src/error.rs`), and no store arm gains a subject (`D-27`:
  *"the store's own list validation keeps its subject … and gains no arm"*). **So `cargo test --offline` is a pure
  regression gate at this wave.**
- **`docs/specs/**`, `strata/**`, `archive/**`** — **untouched**: a ruling supersedes by being recorded, not by a
  rewrite (`D-3`'s own disposition), and no role here owns the spec corpus.
- **`docs/L1/modules.json` and `docs/L1/module-map.md`** — **counts unmoved** (19 / 61); the four read-through
  annotations §0 names are owed **with** this wave's docs step and are not endpoint changes.
- **The kernel's five-part cut (`D-13`) and the entry's subdivision (`D-2`)** — **not this wave.** **This delta is
  drawn against the kernel as ONE 2,203-line file and the entry as ONE 5,903-line file, which is the tree.** If a
  pass lands a cut and this delta in one act, the symbols move with their part
  (`noopHandleFor`/`noopListener`/`KERNEL_HANDLE_PREFIX` sit in `kernel-foundations`, and `K-1`'s two calls in
  `kernel-registration`), and the falsifier is a stale reference at a part boundary — `docs/L1/kernel-subdivision.md`
  §8's own test.

### 5.2 The verification bar, in one sentence

> **No new red, every red accounted for.**

**It is the bar because there is no green oracle on the two legs that judge this change** (`D-18`'s baseline
finding: *"the implementation wave cannot be verified against a green oracle, because there is no green oracle"*),
and **two legs that are green today judge it only partly** (§5.4).

### 5.3 The reds the change itself makes — attributable to the change, owed a move at step 4

**These are NOT "attributable elsewhere"; they are the change's own debt and the wave may not leave them unclaimed.**
Each is listed by the *shape* that moves, with the sites this pass measured, and each unmeasured population is
marked as such rather than counted.

| the shape that moves | measured sites | what a cell sees |
|---|---|---|
| `listen` answers a `Handle` | `index.d.ts:616`, `typecheck/consumer-fixture.ts:177` (both moved at step 1) | a cell binding the return to `void`, or asserting `undefined` |
| `cfg.constraints`' element is three-member | `index.d.ts:207`, `typecheck/consumer-fixture.ts:108` (both moved at step 1) | a cell constructing a functionless element and expecting an instance |
| the batch refuses instead of dropping | *no declared cell measured* | a cell asserting the functionless element is admitted (the contract's own §2.12 item 3 (d) state, now unreachable) |
| the kernel calls `listen(id, set)` and no `register` | `constraint-kernel.mjs:562`, `:565`–`:566` | a cell whose stub store asserts the `constraint@` spelling or a `register` call |
| `register`'s cross-kind refusal is a plain object | `index.mjs:4918`–`:4926` | `register.test.mjs`'s `isRegistrationRefusal` **counts a `TypeError` as a FAILURE** (`index.d.ts:547`), so cells asserting the refusal goes green and cells asserting `instanceof TypeError` go red |
| `StoreStatus` is seventeen (⟶ 2026-10-27: **twenty**; the site below is the pre-widening block, `:237`–`:254`, and the block is at `:316`–`:336` today) | `index.d.ts:237`–`:254` | every census cell reading the set's arity — **`greens`' census cells assert sixteen** (`REVIEW-2026-10-24.md`'s `Q4` disposition), and the shipped-set figure is printed at ~13 sites |
| `constraintPairKey`'s pair-local collision freedom is narrowed | see **`Q-2`** | **deliberately not declared** — no cell moves until `Q-2` is answered |

### 5.4 The reds that must remain attributable to something other than this change

**MEASURED, at the ledger `bindings/js/test/REVIEW-2026-10-24.md` §1–§2 records and re-verified there.**

**`npm test` — exit `1`, TEN distinct failing entries** (not the `21` `✖` display count), **every one an `ENOENT`
on a `docs/**` path the 2026-10-24 archival moved**: `publish.test.mjs` **7** (`P-PUB-2::S-KEYSET`,
`P-PUB-3::S-PLATFORM`, `P-PUB-6::S-SCOPE` ×2, `P-PUB-7::S-MANIFEST`, `P-PUB-8::S-TAG`, `P-PUB-8::S-LAYER`),
`addon-adoption.test.mjs` **1**, `file-tier-save.test.mjs` **1**, and **`version-stamp-r2.test.mjs` as ONE FILE
entry** (it dies at import on three `readFileSync` calls, so its eleven cells never run). **`D-17` disposes of all of
them by rewrite-or-retire, and the disposition is the test layer's.** **After step 4 the count may shrink; it may not
grow, and no surviving red may be one whose cause is steps 1–3.**

**`npm run greens` — exit `1`, three runners, all red for pre-existing staleness**: `greens.mjs` **48 `FAIL`** over
all 16 scenarios, `live-drive.mjs` **13 `FAIL`** over 13/13, `file-tier-save/scenarios.mjs` reaching `CLEANUP` with
its own red set — and **`D-21` requires each runner's exit code to carry its red**, which it now does not for
`blind-constraints-v2.mjs` (exits `0` with 21 `FAIL`) and `json-acceptance-set-live.mjs` (exits `0` with cells that
never ran). **Those two exit-contract debts stay attributable to `D-21`'s own obligation and to `greens-harness`,
and this change neither fixes nor worsens them.**

**`npm run typecheck` — GREEN today (exit `0`).** **It must be green at the end of step 1, and any redness there is
this change's** (§5.1's warning).

**`cargo test --offline` — GREEN today (exit `0`).** **It must be green, unconditionally: no file in this wave's set
is Rust, so a red there is a real regression with no attributable cause.**

### 5.5 What can verify what, stated so no green is claimed at the wrong layer

**The legs are asymmetric, and the asymmetry is the whole risk** (`docs/L1/module-map.md`'s baseline addendum):
**the compiled side and the type declaration are green; the two JavaScript batteries are red.** **So this change
— whose subject is a JavaScript surface — is verifiable by the leg it needs least and unverifiable by the leg it
needs most.** Two consequences follow, and both belong in the wave's report:

1. **A green `npm run typecheck` proves the declaration's shapes and the fixture's use of them, and nothing about
   behaviour.** It cannot see `listen`'s return value, the batch's refusals, or the kernel's calls.
2. **A green `cargo test --offline` proves the store did not move — which is the wave's *claim*, not its *effect*.**
   It is a falsifier of "this delta needs no Rust change", and it is worth exactly that.

---

## §6 · Measured, concluded, and not verified

**CONCLUDED, not measured at the bytes.** (i) That `listen`'s purge reaches **by handle** and not by address, and so
that the kernel's occupancy cannot destroy an app listener's entry under a different handle (§4.3) — derived from
held-listener §2.2 items 3 and 7 and `DD-39`, **not** from `src/store.rs`'s `Home::purge`, which was not read.
(ii) That the lawful **supplied** listener handles equal the store's **adopted** set on any construction that can
succeed (§3.2) — derived from `surface.md:2118`'s *"a REJECTED ARRAY ADMITS NOTHING"* plus `encodeListeners`' arms.
(iii) That `pairRowCarrying`'s function-identity discriminator keeps two same-`id` pairs apart — read at its
comment and its call, not at a drive (§7's `Q-2` depends on it). (iv) That the store's `CODES` carries 17 — carried
from the two contracts and the review, not re-run by this pass.

**NOT VERIFIED BY THIS PASS — each printed so it is not read as an absence.** **No leg was run**: `npm test`,
`npm run greens`, `npm run typecheck` and `cargo test --offline` were **not** invoked, and every baseline figure in
§5.4 is transcribed from `REVIEW-2026-10-24.md` §1–§2 and the L1 documents that measured them. **The battery
population each §5.3 shape touches was not enumerated**: the shapes are derived from the declaration and the entry,
the cells are not, and a cell census is the test layer's to take. **The harness cap's arithmetic was not checked**
against this file (no count moved, §0). **Whether `strata/decisions.md` is tracked** is unverified and unrelated
(`module-map.md` FIGURES). **The `A112` ordering question is untouched by every clause here** — this file declares
no delivery-order claim and may not be read as turning `D-1-bis`'s `OWED` measurement green.

---

## §7 · Questions — put, not decided

**`Q-1` — `listen` can still overwrite a constraint, and item 7 forbids testing it. Is that accepted?**
`D-25` makes the cross-kind overwrite a **rejected** act at every population route (§2.3, §2.4) and at the
register-side seat (§2.5). **The one act left untested is `listen` itself**: a caller who calls
`listen(c1, [addr])` where a constraint's `id` is `c1` **purges that pair's home entry** and the pair then evaluates
while its `triggered`/`watched` membership is gone — the state held-listener §2.2 item 7 declares and this file may
not close, because that clause says *"`listen` GAINS NO CONFLICT TEST AT ALL, and its purge reach stays
UNCONDITIONAL"*. **The three priced dispositions, none taken here:** *(a)* accept it as item 7's own outcome, now
legible because the handle is the caller's word (`D-23`'s closing paragraph says exactly this and calls it
**unresolved**); *(b)* give `listen` the cross-kind test, which needs a **bounded amendment of §2.2 item 7** and a
fresh ruling; *(c)* make the kernel's occupancy carry a distinguishable identity — which is the prefix `D-22`
discarded, so it is refused by name.

**`Q-2` — one `id`, two address sets, one handle: `D-24`'s uniqueness against `K-1`'s "begins a pair of its own".**
**This one is created by the ruling set and is not created by any arm above.** Today the kernel's two same-`id`
pairs are kept apart by the **prefix**, which includes the address (`constraint@["a"]` vs `constraint@["b"]`).
Under `D-23`/`D-24` both pairs' handle is the string `c1`, and `constraint-kernel.mjs:267`–`:278` declares in as many
words that *"TWO DISTINCT PAIRS THAT SHARE ONE `id` CARRY TWO DIFFERENT FUNCTIONS and are therefore never
confused"* — i.e. the kernel deliberately keys two pairs under one id. **The measured mechanism, concluded from
the calls (not driven):** the second `addConstraint({address:['b'], id:'c1'}, f2)` takes the fresh arm
(`carryConstraint` → `K-1` → `pairRowCarrying` finds no row carrying `f2`), so `store.listen('c1', [['b']])`
**purges the first pair's home entry at `['a']`**; and a later `removeConstraint({address:['a'], id:'c1'})` hands
the **same** handle to `removeListener`, which deletes **the second pair's** store entry and registry row.
**`D-24` says the handle "needs to be unique regardless, and setting a duplicate handle is an overwrite"; the kernel
says two pairs under one id are two pairs.** **Two priced repairs, neither taken here:** *(i)* **the pair's identity
key becomes the `id` alone** — consistent with held-listener §2.6 item 4 (*"one pair, N registry rows and ONE
identity"*) and with `D-24`, and it makes a second `addConstraint` at a new address an **extension plus an
overwrite**; it moves `constraintPairKey`'s shape, `constraints()`' row count and `removeConstraint`'s reach.
*(ii)* **a new refusal** at `addConstraint` when the `id` is already carried at a different address — cheap, but it
contradicts `K-1`'s own declared arm and `surface.md §2.12`'s *"the pair's element IS the supplied `constraint` from
this call on"*. **Nothing in steps 1–3 depends on which answer is taken; the release does** — see the ordering note
below.

**`Q-3` — may `D-22`'s prefix removal ship to a published release before `Q-2` is answered?** **This pass's
reading, marked as inference and built on nothing:** no. **The prefix is currently the only thing keeping two
same-`id` pairs' handles apart**, so landing steps 1–3 without an answer to `Q-2` publishes a surface in which a
lawful-looking pair of registrations can silence one another. **The steps are independently landable and the wave
is not blocked; the *release* is the thing that needs `Q-2`** — and `D-1-ter`'s ordering rule (no tarball cut
mid-wave) is the precedent for saying so rather than discovering it.

**`Q-4` — is the boot route held to `D-27`'s strictness?** `D-27` says it should be (*"it is the same route by the
surface's own word"*) and a pass must say so. **This file says so: yes** — `cfg.constraints` **is** the boot
route's list (`storeCreate` runs at every startup), so `B-1`–`B-3` apply at every construction, and no second
strictness exists. **No clause here treats a "boot" differently from a "creation".**
