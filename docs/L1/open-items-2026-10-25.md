# L1 open items — 2026-10-25: every item this branch has named and not closed, closed or explicitly deferred

**WHAT THIS FILE IS.** The closing record of a **declaration/record pass**: the twelve blind instances (⟶ RE-COUNTED 2026-10-27: **THIRTEEN** — the twelve surface instances plus `blind-defect-cases.test.mjs`, the defect-cases instance) now cover
every general-purpose surface, and what remained was a short list of things recorded as open. **Nothing here is an
implementation, a design or a new unit.** Each item is either **answered from the declared surface**, or
**deferred with the one question that would settle it**, or **named as a record that is simply wrong**.

**METHOD, AND ITS LIMIT, STATED FIRST.** This pass's **own** session had **no shell** — every figure below was read
from a file at its own bytes with a file-reading tool (`read`/`glob`/`grep`), and no count in §1–§4 is a transcript of
a run. **The LEGS were therefore run by DELEGATED READ-ONLY PROBES** — agents that executed the commands in this same
tree and returned their raw output, making no edit, no commit and no branch change. **Their results are printed in §5
in full, because a verification nobody can re-read is a claim.**

**THE WRITE SCOPE THIS PASS HAD, NAMED SO NO READER ASSUMES THE TREE MOVED.** `docs/L1/**`,
`strata/decisions.md`, and `docs/specs/**` by ANNOTATE-BESIDE only. **No source, no test, no manifest byte was
written**, and every edit is an insertion beside a reading that stands byte-for-byte.

---

## §1 · The addon's export set: the oldest thread, and what moves

**WHAT IS TRUE, MEASURED AT THE BYTES.** `bindings/js/src/facade.rs` declares **THIRTEEN line-initial `#[napi]`
sites**, and **no `call`**:

| kind | entries | sites (re-measured 2026-10-25) |
|---|---|---|
| bare `#[napi]` — the four STANDING entries | `storeCreate` · `register` · `version` · `errorMessage` | `:328` · `:942` · `:1019` · `:1047` |
| `#[napi(js_name = …)]` — the nine PER-VERB entries | `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` · `commitFile` | `:544` · `:590` · `:637` · `:676` · `:710` · `:745` · `:776` · `:811` · `:846` |

**`4 + 9 = 13` ✓, and `call` is absent.** The kept corpus already agrees: `docs/specs/storeroom-addon-surface/
contract.md`'s **`P-SAS-1`** — *"the addon's export set is exactly the thirteen declared names — `4` standing plus
`9` per-verb — and `call` is absent"* — and the addon's own battery asserts the retired entry **absent by its exact
registration symbol** (`tests/integration/binding-crossing/addon_adoption.rs`'s `RETIRED_ENTRY`). The archived
`export-set-and-dispatch.md §2` prints the deletion in its own words: *"**`call` IS DELETED.** It **was** the
dispatcher … The split is precisely its replacement, so it does not survive."*

**THE DISPOSITION: THIS IS A STALE DECLARATION, NOT A CODE DIVERGENCE.** No behaviour byte moves, no manifest row
moves, and no design question exists. **The five was TRUE WHEN EACH SITE PRINTED IT** — `A145`'s adoption
(2026-10-21) landed `#[napi]` over a hand-built table of five — and **the sites were never re-derived when the
addon-surface split re-cut the boundary to thirteen.** The count moved `5 → 13` at the split; the declaration did
not follow.

**THE SITES, EACH WITH WHAT IT SAYS, WHAT IS TRUE, AND WHICH ONE MOVES.**

| # | site | what it now says | what is true | which one moves |
|---|---|---|---|---|
| 1 | **`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md` `§1.3` item 4** | *"`version` · `errorMessage` · `storeCreate` · `call` · `register`"* — *"Every one of the five is INTERNAL"* | thirteen, no `call` | **NOTHING MOVES.** The file is archived, `archive/` is gitignored by the project's own rule, and no role writes it. It stands as the record of its date and is **read through `P-SAS-1`**, which is the kept row of record |
| 2 | **`docs/specs/storeroom-js/surface.md`'s 2026-10-16 counter-pass** (`:1864`, its second print `:1871`) | *"the store's own `8`-verb namespace, **the addon's `5` exports**, the dispatcher's `8` tokens, the register's `8` rows, **the kernel's five items** and **the store's closed `16`** … are all UNMOVED"* | addon **13**; kernel **6**; store's closed set **17** | **THE DOCUMENT** — an annotate-beside clause landed by this pass (§5) |
| 3 | **`bindings/js/src/lib.rs`'s closing comment** (`:79`–`:85`) | *"Measured after the deletion, not assumed: the rebuilt artefact still exports exactly the five"* · *"**THE FIVE ENTRY FUNCTIONS KEEP THEIR NAMES AND ARITIES** — `version` · `errorMessage` · `storeCreate` · `call` · `register`"* | thirteen, no `call` | **THE CODE'S COMMENT** — a source comment, and this pass has no source scope. **The exact edit is printed at §4 item 2 and owed to whoever next edits the file.** No behaviour byte moves with it: **this is not a code question** |
| 4 | **`docs/specs/storeroom-js/contract.md`** (`:1913`, `:1921`) | the same five, beside *"the store's closed `16`"* and *"the kernel's five items"* | **13 / 17 / 6** | **THE DOCUMENT** — annotate-beside, landed by this pass (§5) |
| 5 | **`docs/L1/module-map.md` E2** (`:673`–`:686`) | **thirteen, correctly**, but with a stale grep list (`lines 297, 513, 559, 606, 645, 679, 714, 745, 780, 815, 911, 988, 1016`) | the sites in the table above | **THE MAP** — the count stands, the line list is re-measured beside it (§5) |

**AND ONE RECORD THAT IS SIMPLY WRONG, FOUND WHILE READING THESE SITES.** There is **no ruling `A150` that retired
`call`.** `A150` (2026-10-25) is the architect's *"Remove the register half, `constraintOff` removes the
constraint"*, and **nothing in it touches the addon's export set** (`archive/pre-strata-docs-2026-10-24/docs/
decisions.md` `:225`; `archive/pending/2026-10-25-discharged-park-g14.md`; `docs/defects.md`'s `DEF-2026-10-20-F`
closure). **The `call` deletion's declared authority is the addon-surface unit's split** —
`export-set-and-dispatch.md §2` read with `P-SAS-1`, under the architect's 2026-10-18 *"Split and proceed"*.
**`tests/integration/binding-crossing/addon_adoption.rs` cites `A150` twice for that deletion** (`:84`, `:129`–
`:131`), and **both citations are mis-citations** — owed a re-point by the test's owner, since no role in this pass
may write `tests/**`. **The mission's own brief repeated the mis-citation, which is why it is recorded here rather
than absorbed.**

---

## §2 · The five `OWED`s — each ANSWERED with its clause, or DEFERRED with its question

**Each was recorded rather than guessed across the blind passes, at the cell named. None was a design decision in
disguise: four are answerable from the declared surface and one leaves a narrower residue that is.**

### 2.1 The escape arm's runtime observable — **ANSWERED: there is none, and none is owed**

**THE OWED, AS RECORDED** (`tests/e2e/blind-entry-surface.test.mjs:306`–`:308`): *"the escape arm itself is a
TYPE-level property with no runtime observable — no declared member enumerates the set, and no arm lets a drive
force a status the store has not minted."*

**THE CLAUSE THAT ANSWERS IT.** The escape arm's **only** declared duty is typeability: `StoreStatus` is the store's
seventeen literals **plus `(string & {})`** (⟶ RE-DERIVED 2026-10-27: **TWENTY literals**, `bindings/js/index.d.ts:316`–`:336` — the citation `:292`–`:310` here is the block's pre-widening site), and *"an unknown status is still typed — the escape is load-bearing,
not a looseness … its absence would be a finding rather than a strictness"* (`bindings/js/index.d.ts:292`–`:310`).
At runtime the set is **the store's and closed**: `src/error.rs`'s `CODES` carries seventeen (⟶ RE-MEASURED 2026-10-27: **twenty**, `[&str; 20]`), `docs/specs/
storeroom-native/contract.md §8.1` declares *"the operative set is `17` members ranked `1`…`17`"*, and the package
**mints no member** (`strata/brief.md §5` item 4; `D-26` item 5's *"the package mints no code"*). And the surface's
own clause forbids a cell naming a token on the kernel-produced arm: *"on the constraint-check sub-arm A DRIVE MAY
NAME NONE, AND A CELL THAT NAMES ONE IS CLAIMING A VALUE NO CLAUSE OF THIS DIRECTORY DECLARES"*
(`docs/specs/storeroom-js/surface.md §2.12` item 3).

**SO THE ARM'S RUNTIME OBSERVABLE IS: NONE.** A drive may assert (a) `typeof status === 'string'` on every arm and
(b) **membership of the seventeen** where a store-produced code is named; it may assert **nothing** about a member
outside the seventeen (⟶ **the twenty**), in either direction. **The `OWED` closes with no work owed**, and the blind cell's reading is
the operative one. **⟶ RE-DERIVED 2026-10-27 (`D-38`; `DEF-S`/`DEF-N`; `DEF-H`): THE SET IS TWENTY, RANKED `1`…`20`** — `ConstraintBodyThrew` `18` and `ConstraintRefusedAtRegistration` `19` on the architect's *"Expand the returned error set for both S/N"* (`DEF-S`/`DEF-N`), `ConstraintPassRefused` `20` on *"Expand the returned fail-state list to include the refusal"* + *"Assert the constraints on rollback"* (`D-38`'s `DEF-H`/`DEF-W`), carried by `docs/specs/storeroom-native/contract.md §8.1`'s 2026-10-26 amendment (`:4118`) and by `CODES` (`[&str; 20]`). **Every `seventeen` in this subsection is the figure of its own date and is read THROUGH this clause; the READING the `OWED` closes on is UNMOVED** — the arm's runtime observable is still NONE, and (b)'s membership now reads *of the twenty*. **AND THE ESCAPE ARM IS WHAT MAKES THE WIDENING PATCH-SHAPED**: `(string & {})` is open, so no typed consumer can write an exhaustive switch and a widened union breaks none of them (`D-38`'s version consequence read beside the architect's `1.0.1`).

### 2.2 Whether *"no own property of the product is store data"* reaches SYMBOL-KEYED properties — **ANSWERED: it does not reach them as a declared census, and nothing is owed**

**THE OWED, AS RECORDED** (`tests/e2e/blind-entry-surface.test.mjs:427`–`:431`): *"whether that sentence also reaches
an own SYMBOL-KEYED property is not decided by any clause read for this cell … the contract ITSELF relies on
symbol-keyed own properties being invisible to both."*

**THE TWO CLAUSES THAT ANSWER IT, AND THEY ARE DIFFERENT KINDS OF CLAUSE.**

1. **AS A CENSUS**, the rule is fixed at `Object.getOwnPropertyNames`: *"the product's OWN PROPERTY SET IS METHODS
   ONLY … no own property of the product is store data, a record, a map, a tier, an address, a handle or a
   commit"* (`docs/specs/storeroom-js/surface.md §2.1` (e) item 1 and `§2.4` item 9 (f)), read at the fourteeen
   members. **And the same corpus declares symbols invisible to that read**: *"a symbol-keyed own property is
   invisible to both"* (`surface.md §2.11` clause 9; `A117` (D6)), which is the precedent the entry's own
   `STORE_INDEX`, `TERMINAL_ARM` and `FORGET_PAIR` channels cite at their sites (`bindings/js/index.mjs:1200`–
   `:1218`, `:1249`–`:1257`).
2. **AS A SUBSTANCE**, the rule protects the register, and **no symbol slot carries register state**. The store's
   data lives behind the Rust boundary and is reachable **only** through `read` (`strata/brief.md §5` item 3). What
   the symbol slots carry is the kernel's own registration record (`pairs` · `handles` · `live` · `closed` ·
   `store`, the instance-scoped record `D-30` installed) and the receiver's routing channels — **kernel
   bookkeeping and a receiver handle, not the register.**

**AND THE CONSEQUENCE IS ALREADY RULED, WHICH IS WHY THE LITERAL READING MUST NOT BE TAKEN.** A caller who reaches
the slot, mutates it, or forges it from `Object.prototype` **is breaking their own code inside their own realm**:
`D-35` reclassifies exactly those three examiner findings as **client scope**, declines the revert, and moves the
defence to **parameter access and the Rust boundary**. **So: no cell may assert against an own symbol-keyed member
either way, and no layer owes a guard.** The one residue worth naming: **the literal reading would make the symbol
slot a violation, and `D-35` is the ruling that refused it** — a future pass that wants the literal reading needs a
ruling, not a cell.

### 2.3 The reload arm's message — **ANSWERED: the refusal cannot name the deletion, because the two causes are ONE state**

**THE OWED, AS RECORDED** (`tests/e2e/blind-listener-surface.test.mjs:367`–`:371`): *"**Whether the refusal names
the deletion as the reason is `OWED`**"* (`docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 8) —
so that cell asserts the `status` alone and not one byte of the message.

**THE DECLARATION THAT SETTLES IT.** §2.1 item 5's table gives **one row** for the whole state: *"a WELL-FORMED
string THE STORE DOES NOT HOLD (fabricated)"* → `unlisten` a NO-OP SUCCESS, `register` a REFUSAL with the store's
`AddressMalformed` in the surface's one form; and §2.2 item 6 gives the message's rule — *"the message names the
argument's POSITION and its CLASS"* (`A134`'s container-that-names-the-argument rule). **A deleted handle is outside
`map.has` (§2.1 item 8's own words), and the entry is removed WHOLE (`§2.2` item 5 (c)), so nothing remembers it.**
**A message naming the deletion would require the product to retain what the removal declares it destroys** — and
the map's size is *"bounded by the set of handles the caller has LISTENED TO AND NOT EXPLICITLY DELETED"* (§2.2
item 6, `A117` (D6)). **The prior-session arm lands on the same row by §2.1 item 7's own conclusion** (*"handles
are NOT saved data"*, `(AA-3)`: *"NO CLAUSE IS OWED"*).

**SO: the message does not and may not name the deletion; it names the position and the class.** The **only**
per-row message distinction the table declares is the FOREIGN-instance row (*"its message naming a 'FOREIGN
instance'"*), which is a fact the instance can hold; the deleted and the never-registered causes are one state and
are told apart by nothing. **`§2.1` item 8's `OWED` closes on its own revisit condition**: the pass that re-derives
`surface.md §2.5`'s message obligations has now been written, and its answer is that no subject exists.

### 2.4 `removeConstraint`'s uncarried-pair form — **ANSWERED (the form), with a named residue DEFERRED**

**THE OWED, AS RECORDED** (`tests/e2e/blind-removal-surface.test.mjs:265`–`:269`): *"which of the two forms this
arm takes is NOT settled by the clauses read for this cell — `§2.7` item 5 gives a store code for a handle-shaped
value and 'the surface's own one form' for a pair-shaped one, while item 6 gives the constraint methods'
`TypeError` for the pair-shaped arms. `F-8` prints only 'THROWN, with a verbose message'."*

**THE ANSWER, AND THE CELL THAT SETTLES IT.** The absent-row pair is **in the parameter row's OWN outside set**:
`PAR-HL-16`'s outside cell reads *"every shape row of `PAR-HL-8`'s outside list, **PLUS a well-formed pair the
entry does not carry**"*, so this arm is governed by **rule (ii)** — *"THE THREE CONSTRAINT METHODS' EVERY OUTSIDE
VALUE — ONE THROWN `TypeError`, the `status` member ABSENT"* (`docs/specs/storeroom-js/surface.md:1063`;
`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 6; `removal-members.md §6` item 2:
*"the constraint methods' `TypeError`, `status` ABSENT"*). **`F-8`'s *"THROWN, with a verbose message"* is satisfied
by a `TypeError` carrying a verbose message**, which is what `removal-members.md §5` row 1 asks for (*"names the
value and the reason"*). **And the build agrees**, at the site that must: `bindings/js/index.mjs:1155`–`:1163`
throws *"a WELL-FORMED PAIR THIS INSTANCE HOLDS NO ROW FOR IS A THROW WITH A VERBOSE MESSAGE — and NOT a class
refusal … the value is inside every class domain and it is the ROW that is absent"*, naming the `id` and the
addresses. **So: `TypeError`, `status` absent, message naming the pair and the reason. `§2.7` item 5's *"the
surface's own one form for a pair-shaped one"* is read as the CLASS test's arm (F-7), and not as this one.**

**THE RESIDUE, DEFERRED, WITH ITS QUESTION.** The build throws that `TypeError` **carrying a `log` member**
(`withEmptyLog`), and **no clause declares the member set of the pair-shaped `TypeError`**. `A135` (1)'s crossed
form is declared for the surface's **one** form `{status, message, log}`; `D-25`'s own observation already records
that a `TypeError` carrying a `log` is *"neither the one plain `{status, message}` form the surface declares for
every refusal nor a bare `TypeError`"*. **THE QUESTION: does the pair-shaped `TypeError` carry `log`, and if it
does, is that member declared for every class-test arm of the three constraint methods or only where an attempt
exists?** That is a declaration question with an owner (`role_spec_writer`), not a design one.

### 2.5 The empty-address receipt's array identity — **ANSWERED: a fresh array, on every arm, the empty address included**

**THE OWED, AS RECORDED** (`tests/e2e/blind-address-verbs.test.mjs:556`–`:559`): *"the empty-address delete empties
the register (`§4.4` arm `D-5`), and the receipt's `address` there is `[]` — but whether the store's `[]` is a fresh
array on a call that removed nothing is not decided by any clause read for this cell."*

**THE CLAUSE THAT DECIDES IT, AND IT IS UNCONDITIONAL.** `docs/specs/storeroom-native/contract.md §4.4`'s
`DeleteReceipt` row: *"`address`: the address the caller passed, VERBATIM — the same array's segments, in order;
**the store returns a fresh array**"* (`:2329`–`:2334`). **The rule is on the RECEIPT's production and not on the
address's content or the count removed**: a delete that removes nothing is a **success** carrying `tiers: []`
(`DD-9`) and it is the same record (`§4.4`'s arm `D-3`; `5 = 4 + 1` arms, unmoved). **The second ground is the
crossing's own**: *"the crossing is a deep copy in both directions"* (`strata/brief.md §5` item 2), so the receipt's
array is the store's, never the caller's — which is what the same cell asserts at a non-empty address
(`assert.notEqual(receipt.address, caller)`).

**SO THE EMPTY-ADDRESS RECEIPT'S `address` IS A FRESH `[]`, EVERY CALL.** A drive may assert identity
(`notEqual(receipt.address, caller)`) and content (`deepEqual(…, [])`) at the empty address exactly as at any other,
and **the cell's "nothing below asserts the empty-address receipt's own identity" limiter retires** — its owner may
now assert it.

---

## §3 · The four declaration-versus-build disagreements, as one list

**Four were found by the blind set. THREE CORRECTED A DOCUMENT and are CLOSED; ONE STILL POINTS AT THE CODE and is
OPEN.** Each row names the clause, what it says, what the build does, and which side moved.

| # | clause | what the clause says | what the build does | which side moved | state |
|---|---|---|---|---|---|
| **1** | `docs/specs/storeroom-native/contract.md §8.1`'s heading (`:4081`) | *"THE CLOSED CODE SET — `16` members, each with its trigger"* | `src/error.rs`'s `CODES` carries **17**; `index.d.ts`'s `StoreStatus` writes **17** literals in rank order before the escape arm | **THE DOCUMENT**, 2026-10-25 — a PURE INSERTION at the heading's own site (`:4085`–`:4090`), which also corrects its *"one other site"* census to the **five** sites that print the algebra | **CLOSED** |
| **2** | `docs/specs/storeroom-js/surface.md §2.5` item 9 (`:1282`) | *"`Object.keys(caught)` reads exactly `["log","message","status"]`"* | the object literal's own **insertion order**, `["status","message","log"]` — the order the form is written in | **THE DOCUMENT**, 2026-10-25 — a clause at item 9 (`:1285`–`:1286`) whose ground is item 8's own *"sorted ascending"* CENSUS device, plus the two downstream prints it had left stale (`surface.md:1214`; `docs/specs/storeroom-json-crossing/contract.md:478`) | **CLOSED** |
| **3** | `docs/specs/storeroom-publish/contract.md §2.1` item 1 (`:358`) | a **three-entry** `files` allowlist | the manifest carries **FIVE** rows — `index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` | **THE DOCUMENT**, 2026-10-25 — a correction clause at the item, `5 = 3 + 2` ✓ | **CLOSED** |
| **4** | `archive/…/storeroom-constraints/parameter-semantics.md §2.8` (`PAR-C-8`)'s `observable` cell, read with `docs/specs/storeroom-native/contract.md §7.3` (b) `3-bis` (d) | a repair returning `{ok: true, op}` whose `op` is **not the one it landed** *"has carried no op"* — *"fires item 4's arm `(d)`, its `outcome` entry carrying `KC-4`"* | **the kernel CREDITS it** and the attempt fails **`KC-8`**: the credited op joins `attempt.ops`, the per-op rollback walks it, and meets the store's own `JournalOpUnknown` | **THE CODE** — the cell `tests/e2e/blind-constraints-unit.test.mjs:172` is **RED and must stay red** | **OPEN** |

**THE OPEN ONE, AT ITS BYTES.** `bindings/js/src/entry/kernel-foundations.mjs`'s `landedOp` (`:497`–`:510`)
applies **two grounds** to a returned `op`: (i) its `opId` must not be an identity the attempt **already holds**;
(ii) where both ordinals are numbers, its `seq` must stand **above** the invoked-for op's `seq`. The red cell's
return is `{ ok: true, op: { opId: 'not-the-op-it-landed' } }` — a non-empty-string identity no attempt holds, and
**no `seq` member at all**, so ground (ii) *"is not applied"* by its own comment (`:494`–`:495`) and ground (i) has
nothing to see. The op is credited, lands in `ops`, and the attempt's per-op rollback then meets
`JournalOpUnknown` → `KC-8`. **The declaration's answer is `KC-4` and the build's is `KC-8`; the build is the side
in the wrong**, because `PAR-C-8`'s arm is declarative about a value the kernel *can* be handed.

**WHAT A FIX WOULD REQUIRE — THE CARRIER THE CLAUSE ASSUMES, AND WHETHER IT IS A DESIGN OR A DECLARATION QUESTION.**
*"Not the one it landed"* is a comparison against **the set of ops the repair's own invocation landed**, and **no
such carrier exists in the declared surface**: `A110` deleted every route by which the kernel could learn it —
*"no `createRequire`, no addon load path, no addon-verb interception window, no monkey-patch"* — so the kernel reads
the op **off the repair's return and off the attempt's own record and off nothing else** (`kernel-foundations.mjs`
`:456`–`:475`). The two grounds the build has are the **only** identities a caller-side record can prove. **So a fix
needs one of three things, and each is a move this pass may not take:**

- **(a) a declared per-invocation LANDED-OP RECORD** the kernel keeps between the repair's entry and its return (a
  carrier — a new member or a new journal-derived read), **which re-opens `A110`'s one-carrier rule**;
- **(b) a widened `op` domain** — the repair's `op` carrying the store's `seq` **in domain**, so ground (ii) always
  runs (a declared shape move on `PAR-C-7`'s carrier, and every producer of a repair's return changes);
- **(c) a narrowed clause** — *"not the one it landed"* reading as *"not an identity this attempt already holds and
  not an op at or before the invoked-for op"*, **which withdraws a declared arm**.

**IT IS A DESIGN DECISION, NOT A DECLARATION ONE.** The answer `KC-4` is already declared; what is undeclared is
**the instrument that makes the declaration observable**, and (a) and (b) mint a carrier while (c) removes an arm.
**One sentence settles it**, and it is put to the architect at §5.

---

## §4 · The two stale records a review left, and one it did not name

### 4.1 `bindings/js/index.mjs:1233` — the clone sentence opens with the opposite of its own correct half

**WHAT STANDS TODAY** (`:1232`–`:1234`, inside the receiver's own publication block):

> **AND IT IS THE ROW A CLONED STORE OBJECT CARRIES TOO**, because `Object.assign`/spread copy own enumerable
> properties only: a clone carries NO index and therefore resolves NO store, which is the SAME one observable the
> detached call gets.

**The opening clause asserts the clone CARRIES it; its own ground and its own conclusion say the clone carries
NOTHING.** `:1261`–`:1271` was corrected last pass — *"a clone carries NO INDEX AND NO SLOT, AND A CLONE RESOLVES NO
STORE"* — and this one was not.

**WHAT IT SHOULD SAY, AS A COMMENT** (no behaviour byte moves):

> **AND A CLONED STORE OBJECT DOES NOT CARRY THE ROW**, because `Object.assign`/spread copy own ENUMERABLE
> properties only and this row is published at `enumerable: false`: **a clone carries NO index, NO slot and
> therefore resolves NO store**, which is the SAME one observable the detached call gets.

**AND THIS PASS CANNOT EDIT IT**: `bindings/js/src/**` is source and `bindings/js/index.mjs` is the shipped hub;
neither is in this pass's scope. **The edit is the three words *"IS THE ROW A CLONED STORE OBJECT CARRIES TOO"* →
*"A CLONED STORE OBJECT DOES NOT CARRY THE ROW"*, and nothing else in the block moves.**

**ONE ADJACENT STALENESS, NAMED BECAUSE IT SITS IN THE SAME TWO BLOCKS AND NEITHER REVIEW NAMED IT.** `:1202`
(*"the product's declared twelve own members are UNMOVED"*) and `:1231` (*"the product's declared member set is
UNMOVED at twelve"*) print **twelve**, and the set is **fourteen** (`index.d.ts`'s `StoreInstance`; `surface.md
§2.4` item 9 (f)'s operative figure). **Both figures are stale by the `12 → 14` move the held-listener-identity unit
landed (2026-10-19)** — a source comment, owed by the same pass that takes 4.1.

### 4.2 `strata/brief.md` — the figures the branch has moved past

**`strata/brief.md` is OUTSIDE THIS PASS'S WRITE SCOPE** (`docs/L1/**` and `strata/decisions.md` are its scope), so
**it is not edited here** — and this is exactly the file every L1 reads, which is why the stale figures are printed
in full rather than absorbed. **Every figure below was re-measured at the file's own last line by this pass; the
brief's own §2 note that its columns are re-measurable is what makes this a defect of the file and not of a reader.**

| the brief's site | its figure | measured 2026-10-25 | note |
|---|---|---|---|
| §2 table, `bindings/js/` row | `index.mjs` **1,409** (was 5,903) | **1,417** | the hub grew after the cut; the *was* figure is history and stands |
| §2 table, `bindings/js/src/` row | `refusal.mjs` **82** | **161** | |
| " | `artefact.mjs` **355** | **376** | |
| " | `state.mjs` **600** | **602** | |
| " | `class-decision.mjs` **1,204** | **1,214** | |
| " | `carrier.mjs` **960** | **986** | |
| " | `frame.mjs` **416** | **417** | |
| " | `kernel-foundations.mjs` **529** | **597** | |
| " | `codec.rs` **966** | **1,030** | |
| " | `facade.rs` **1,105** | **1,136** | the file that gained the nine per-verb entries |
| §2 table, `tests/` row | **83 files in three scopes** | **104** | `e2e/` **44 → 65**; `integration/` 33 ✓; `unit/` 5 ✓; `tests/Cargo.toml` 1 ✓ |
| §2 table, `tests/` row, the `e2e/` breakdown | **23 `*.test.mjs`, 11 runners, 6 support modules, 1 evidence JSON, 3 documents** | **42 · 11 · 8 · 1 · 3** | the twelve blind instances (⟶ 2026-10-27: **thirteenth**, `blind-defect-cases.test.mjs`) plus `status-census`, `constraint-address-extension`, `instance-independence` and the four `prototype-*` cells; two support modules joined (`module-set`, `pack-reachability`) |

**EVERY OTHER FIGURE THE BRIEF PRINTS WAS CHECKED AND STANDS**, and the ones a reader is most likely to doubt are
named here so the check is not mistaken for a skim: `src/`'s seven line counts (`lib.rs` 41 · `store.rs` 2,472 ·
`error.rs` 795 · `args.rs` 329 · `value.rs` 330 · `records.rs` 268 · `json.rs` 203) · `index.d.ts` **891** ·
`delivery.mjs` 639 · `constraints.mjs` 795 · `kernel-registration.mjs` 644 · `kernel-commit.mjs` 156 ·
`kernel-attempt.mjs` 570 · `kernel-terminal.mjs` 324 · `crossing.rs` 1,216 · `src/lib.rs` 90 · the barrel **4** ·
`src/entry/` **13 files** · `files`' **FIVE** rows · `version` **0.5.0** · the member set **14** · the status set
**17** — **⟶ RE-MEASURED 2026-10-27, and this is the pass's own table re-read, so every figure that moved is named in order:** `index.mjs` **1,509**; `refusal.mjs` **161**; `artefact.mjs` **376**; `state.mjs` **623**; `class-decision.mjs` **1,214**; `carrier.mjs` **1,002**; `frame.mjs` **417**; `delivery.mjs` **647**; `constraints.mjs` **1,530**; `kernel-foundations.mjs` **725**; `kernel-registration.mjs` **677**; `kernel-commit.mjs` **166**; `kernel-attempt.mjs` **627**; `kernel-terminal.mjs` **409**; the barrel **4** ✓; `src/entry/` **13 files** ✓; `files`' **SIX** rows (`README.guide.md` joined them); `version` **1.0.1**; the member set **14** ✓; the status set **TWENTY** (ranked `1`…`20`; `D-38` + `DEF-S`/`DEF-N` + `DEF-H`); the depth ceiling **126** and the node ceiling **1,000,000** (not re-measured by this pass); the two Rust legs **415** / **235** ✓ and `cargo test`'s **650** ✓ (re-run 2026-10-27, `0` failed); `bindings/js/Cargo.lock` **DELETED** ✓. · the depth ceiling **126** and the node ceiling **1,000,000** · the three Rust legs' `415` / `235` / `650` ·
and `bindings/js/Cargo.lock`'s **DELETED**.

---

## §5 · What this pass changed, and what it puts to the architect

**EDITS LANDED (all ANNOTATE-BESIDE; no reading deleted, no behaviour byte anywhere):**

1. **`docs/L1/open-items-2026-10-25.md`** — this file.
2. **`docs/L1/module-map.md`** — E1's `StoreStatus` figure (`sixteen` → **seventeen**, with the site), E2's grep
   line list re-measured beside the stale one, and E2's *"Recorded, not resolved"* closed with the addon-set
   disposition and a pointer here.
3. **`docs/L1/surface-deltas.md §1.5`** — the `StoreStatus` delta it declares is **CLOSED**: the declaration
   carries the seventeenth literal, and the five prose sites the section enumerated are re-spelled read-through.
4. **`docs/specs/storeroom-js/surface.md`** and **`docs/specs/storeroom-js/contract.md`** — one dated
   `RCA-8(g)` clause each, at the counter-pass print, naming the three figures that have since moved (**the addon's
   `5` → `13`**, **the kernel's `five items` → `6`**, **the store's closed `16` → `17`**) and where each moved.
5. **`strata/decisions.md`** — one `FINDING` entry: the record of this pass, the five `OWED`s' disposition, the
   four disagreements, and the brief's stale figures.

**AND THE VERIFICATION, MEASURED — every leg run in this tree after the edits, by read-only probes, with its own exit
status:**

| leg | command | result |
|---|---|---|
| `test` | `npm test` | **`1053` tests · `1051` pass · `1` fail · `1` skipped, exit `1`** — **the one fail is the HELD DISAGREEMENT and it stays red**: `tests/e2e/blind-constraints-unit.test.mjs:172` (*"`KC-8` !== `KC-4`"*, asserted at `:187`) — **⟶ RE-MEASURED 2026-10-27 AT THE `1.0.1` PREPARATION: `1081` tests · `1080` pass · `0` fail · `1` skipped, exit `0`. THE HELD DISAGREEMENT IS NO LONGER RED** — the `D-40`/`D-38` passes re-derived it and the suite is green at the bump; the one skip is the dispatcher-shape cell (*"the old dispatcher shape is absent after the split; the golden was captured before it"*) |
| store | `cargo test --offline -p storeroom-native` | **`415` passed · `0` failed**, exit `0` |
| battery | `cargo test -p storeroom-tests` | **`235` passed · `0` failed**, exit `0` |
| both | `cargo test` | **`650` passed · `0` failed · `0` ignored** over `22` binaries, exit `0` (`415 + 235 = 650` ✓) |
| greens | `npm run greens` | exit `0` — `AUTHORED 100 · EXECUTED 100 · PASS 100 · FAIL 0`, `10` discovered runners, every one exit `0` — **⟶ RE-RUN 2026-10-27: exit `0`, `CHAIN COMPLETE — 10 discovered runner(s), every one exit 0`, with the three batteries' own totals `AUTHORED 254 · PASS 254`, `175 · 175`, `100 · 100` and `0` FAIL anywhere (`CF-11` still `UNRUNNABLE` by declaration, `D-21`)**, layer `LIVE / ASSEMBLED PACKAGE`, `APP` `NONE` |
| e2e | `npm run test:e2e` | exit `0` — `15` declared / `15` recorded: `14 PASS · 0 FAIL · 0 FINDING · 1 LAYER-LIMIT` — **⟶ RE-RUN 2026-10-27: unmoved, `15` declared / `15` recorded / `14 PASS` / `1 LAYER-LIMIT` (`INSTALL-09`), and `INSTALL-01` now reads the assembled `1.0.1` tarball's `20` members** (`INSTALL-09`, the four non-host platform names: driven, refused `EBADPLATFORM`, **never claimed green**), `APP` stays `NONE` |
| typecheck | `npm run typecheck` | exit `0` — no `tsc` diagnostic |

**AND THE TWO JSON FILES STILL PARSE, MEASURED RATHER THAN ASSUMED:** `docs/L1/modules.json` and
`docs/L1/test-stratification.json` were each `JSON.parse`d by a probe and answered **PARSES OK**; **neither was edited
by this pass** (19 modules / 61 endpoints unmoved). **The working tree after every edit and every leg carries
DOCUMENTATION ALONE** — `git status` names exactly five modified files (`docs/L1/module-map.md`,
`docs/L1/surface-deltas.md`, `docs/specs/storeroom-js/surface.md`, `docs/specs/storeroom-js/contract.md`,
`strata/decisions.md`) and one untracked addition (this file): **no source, no test, no manifest byte**, which is why
the seven legs cannot have moved and did not.

**PUT TO THE ARCHITECT — ONE QUESTION, ONE SENTENCE, AND NOTHING ELSE IS OWED HIM:**

> **`KC-4`/`KC-8`: does the kernel get a DECLARED CARRIER for the ops a repair landed — a per-invocation landed-op
> record, or a repair `op` whose domain carries the store's `seq` so the existing `seq`-floor ground always runs —
> or is `PAR-C-8`'s *"not the one it landed"* arm NARROWED to the identities a caller-side record can prove?**

**THE LEDGER, ONE LINE PER SECTION OF THIS PASS:**

| section | state |
|---|---|
| §1 the addon's export set (5 vs 13) | **CLOSED** — a stale DECLARATION at three sites and an archived fourth; the code is right; one mis-citation (`A150`) named for its owner |
| §2 the five `OWED`s | **CLOSED — four ANSWERED** (the escape arm; symbols; the reload message; the receipt's array identity) and **one ANSWERED WITH A NAMED RESIDUE** (`removeConstraint`'s form = `TypeError`, `status` absent; the `log` member on it is a declaration question with an owner) |
| §3 the four disagreements | **CLOSED — three (the documents moved) · OPEN — one (`KC-4`/`KC-8`, the code)** |
| §4 the stale records | **CLOSED for `:1233` (the exact comment edit printed; this pass has no source scope) and CLOSED for `brief.md`'s measurement — but `brief.md` is OUTSIDE this pass's write scope and needs its owner's hand: 10 line-count figures, the `tests/` total and the `e2e/` breakdown** |
