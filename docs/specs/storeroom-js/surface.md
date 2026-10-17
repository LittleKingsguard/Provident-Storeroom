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
it**). **Every outside form of `cfg` and of its keys answers the store's own code and returns no
instance** (`§1.3`; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4`)
(`[A3 docs/specs/storeroom-native/contract.md §7.1 — the construction input set | state or fail-state
declaration]`).

**⟶ AMENDED 2026-10-15 — THE CONSTRUCTION CLAUSE ABOVE IS READ AT `FOUR` DECLARED KEYS, AND THE TWO FIGURES IT PRINTS ARE RE-SPELLED IN PLACE** (`RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`, its construction half ruled `SETTLED` at that record's `§22.1`; `RCA-8(d)` ANNOTATE-BESIDE — **the clause above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION and it re-decides no rule of it**). **THE TWO CELLS IT RE-SPELLS, NAMED BY THEIR OWN WORDS: *"the store's THREE declared keys — `filePath` · `journalLength` · `listeners`"* reads *"the store's FOUR declared keys — `filePath` · `journalLength` · `listeners` · `constraints`"*; and *"of its three keys"* reads *"of its keys"*.** **THE ADDED KEY'S DECLARATION IS THE `cfg` BLOCK BELOW, ITS ROW IS `parameter-semantics.md §2.21` (`PAR-JS-21`), and the set's declared arity is `4`** (`§2.2`'s dated clause; `docs/specs/storeroom-js/parameter-semantics.md §1`'s re-derived arithmetic). **AND NOTHING ELSE OF THIS SECTION MOVES: the instance's member set, the four-member object `storeCreate` returns, the non-exposure sentence's scope and the single failure form all stand exactly as printed** (`[A3 docs/specs/storeroom-native-proposal-review.md §22.1 and §20.2 | requirement]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT (`LIVE-F4`'s class; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `cf088d91…`/`957,904` cells below STAND as the `Q7`/`Q8` tree's own reading and THIS clause is the operative tie): the artefact is `sha256:0136c912…` over `958112` bytes, the pre-rename/pre-`Q3` artefact being `cf088d91…`/`957,904`. EVERY figure this file prints describes THIS digest from here on; the blind set (`241`) and the JS leg (`185`) and the live battery (`91`) were all re-measured against it.**  AND THE FIGURES ARE NOT RE-MEASURED BECAUSE THEY DO NOT NEED TO BE: CODEGEN IS UNMOVED — every allocatable section byte-identical (`546,698` of `.text` among them) and all `2,168` symbols identical in name, value, size, type and section index — so every figure measured against the earlier digest stands against this one.**  
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) BY RECONCILING THIS SECTION'S NON-EXPOSURE
SENTENCE.** `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and is read THROUGH this
clause; it is not reworded and not withdrawn.** **WHAT IT MEANS, STATED SO IT IS NOT READ WIDER THAN IT IS:
**⟶ WITHDRAWN DIGEST-FAMILY FRAGMENT — REMOVED 2026-10-13: the two digest-family fragments inserted at this site on 2026-10-11 were WITHDRAWN AS CIRCULAR BY CONSTRUCTION on that date and are deleted here; the AS-FILED clause above is RESTORED, rejoined so it READS ONCE AND WHOLE (fragment 1: the `LIVE-F4` re-pin; fragments 2–3: the `FMT` re-pin and the release-fix re-pin, each of which had left its leading `BY` and its `AND THE FIGURES ARE NOT RE-MEASURED` clause inside the severed sentence). The withdrawal's authority is `docs/specs/storeroom-js-proposal-review.md` §5.4; `RCA-8(d)` ANNOTATE-BESIDE, the record standing BESIDE the restored clause and never inside it.**
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
  **⟶ AND THE MEMBER SET'S OWN COUNT MOVES ONCE MORE, BY THE ORDERING SEAM'S OWN CLAUSE, LANDED 2026-10-15 BY
  THE `A116` ORDERING-SEAM PASS (`role_spec_writer`) ON THE ARCHITECT'S RULING *"Name the seam and lift `A115`
  (D1)'s refusal for it."*: THE INSTANCE'S MEMBER SET IS NOW `{ register, on, off, settle }` — FOUR OWN MEMBERS,
  AND NOTHING ELSE — and every count above and below that fixed `{ register, on, off }` is read THROUGH this
  sentence** (`[A2 docs/decisions.md · `A116` (D1) — the set *"opens by ONE clause to carry it"*, and (D3) — the
  lift is narrow; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 — the seam's own clause, which declares the
  fourth member's name, its two instants, its argument, its return and its fail-states | numeric or census
  claim]`). **THE FOURTH MEMBER'S OWN HOME IS `§2.4` item 9 AND NOT THIS CELL, and this cell is re-read rather
  than restated: the set opens BY THIS CLAUSE AND BY RULING, NOT BY DRIFT — no fifth member, no sixth, and no
  name of the four is a named export of the entry.** **THE MODULE NAMESPACE IS UNMOVED AT THE EIGHT DECLARED
  VERBS and the store's own closed `8`-verb namespace is unmoved with it.**
  **(b) THE MODULE NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS.** **`storeCreate` · `read` ·
  `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` — `8` NAMES, NO NINTH, AND NO NAME
  REMOVED: `§2.9` item 1's count is UNMOVED, and NEITHER `on` NOR `off` is added to the entry's named exports,
  because both are reached through the FACTORY'S OWN PRODUCT and through nothing else** (`§2.4` item 5 (a)'s own
  pointer; `package.md §1.3` item 3's *"AND NOTHING ELSE"*).
  **(c) AND THE STORE'S OWN TWO VERBS ARE UN-OVERLOADED.** **`listen` AND `unlisten` KEEP THEIR NAMES, THEIR
  ARITY AND THEIR RETURNS, AND FROM 2026-10-16 THEY KEEP ONE METHOD FORM WITH THE RECEIVER AS THE STORE —
  `a.listen(address)` and `a.unlisten(handle)` — whose positions, answer and refusal are declared at `§2.4`
  item 9 (f)'s `A127` clause of that date, the ONE home of the ten methods' arity, positions, answer and
  refusal; the store's own listener surface is reached through those SAME two declared verbs and through no new
  store-side form, and the store's `379`, its crate and its contract directory do not move** (`§2.10`; **`A68`**;
  `docs/specs/storeroom-js-convenience-proposal.md §6`). **⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: this
  clause's SUPERSEDED COMMAND — its module-level spelling *"`listen(instance, address)` and
  `unlisten(instance, handle)` keep their names, their positions, their arity and their returns"*, a
  PRESENT-TENSE ORDERING that printed the `instance` FIRST POSITION `A127` DROPS — HAS LEFT THIS FILE and
  stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §17`, whose source path and `§`
  are named there; NO BYTE OF IT IS RE-EMITTED HERE, and the site is named in `§2.9` item 1's `A127` clause of
  that date, whose ONE-SPELLING rule reaches it.**
  **(d) AND NOTHING ELSE OF THIS SECTION MOVES: `§2.1`'s construction clause is unchanged — `cfg` still carries
  the store's FOUR declared keys and the package still adds no default, no rename and no FIFTH key (`DD-36`) —
  and `§2.1`'s non-exposure sentence is unchanged in its own scope: it speaks of the STORE's internals, which no
  member of the package's handle exposes, and it was NEVER a claim that the package's own handle is
  memberless.**
  (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` — *"Use S-1"*; A1
  docs/specs/storeroom-js-proposal-review.md §5.4 — a pinned default carries a priced alternative; this
  document's `§2.4` item 7 — the two new members' own clauses | requirement]`).

**(e) ⟶ AUTHORED 2026-10-16 — THIS SECTION'S OWN `A127` CLAUSE (`role_spec_writer`; `A: docs/decisions.md` ·
`A127`, 2026-10-16, `ACTIVE`, read with `A128`; `RCA-8(g)`).** **IT IS AUTHORED AT THIS SECTION BECAUSE THIS IS
THE SECTION THAT DECLARES THE CONSTRUCTION AND ITS PRODUCT, and it carries the THREE RULES THIS UNIT'S READERS
ALREADY CITE IT FOR — one module name, the ten methods, and the private state the ten are reached through —
AS OPERATIVE TEXT; it re-decides no rule of `(a)`–`(d)` above and moves no figure any of them prints — **AND THE ONE FIGURE IT DOES MOVE IS `(b)`'s, NAMED SO THE TWO ARE NOT READ BESIDE ONE ANOTHER: `(b)`'s *"THE MODULE NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS"* STANDS BYTE-FOR-BYTE AT ITS OWN BYTES AND IS READ THROUGH THIS CLAUSE, WHOSE SUBJECT 2 IS THE OPERATIVE STATEMENT OF THE NAMESPACE FROM THIS DATE.** **THE SUB-ITEMS BELOW ARE THIS CLAUSE'S OWN AND NOT `(a)`'s: they are written `(e)` 1–4 and their numbering restarts here.**
1. **THE PRODUCT, AND THE STATE HELD PRIVATELY.** **`storeCreate(cfg)` RETURNS AN INTERFACE OBJECT THAT CARRIES
   THE SURFACE FUNCTIONS AS OWN MEMBERS — METHODS — AND THE STORE'S STATE IS HELD PRIVATELY: no own property of
   the product is store data, a record, a map, a tier, an address, a handle or a commit.** **THE PRODUCT'S
   DECLARED MEMBER SET IS THE TWELVE `§2.4` item 9 (f)'s `A127` clause of this date enumerates —
   `10 + 1 + 1 = 12` ✓, the TEN METHODS plus `register` and `settle` — and its OWN PROPERTY SET IS METHODS ONLY,
   which is how this section's non-exposure sentence above is satisfied BY CONSTRUCTION.**
2. **THE MODULE NAMESPACE IS ONE NAME.** **`storeCreate` ALONE IS A NAMED EXPORT — the function *"that does not
   require an existing store"* — and it is NOT a member of its own product; the TEN NAMES the namespace sheds
   become METHODS and are not removed from the product; the operative enumeration, its arithmetic `11 → 1` and
   their removal with NO deprecation window are declared at `§2.9` item 1's `A127` clause and at `§2.9`'s
   removal-versus-deprecation clause of the same date.**
3. **THE ONE-SPELLING AND RECEIVER RULE, AND THE SITES IT REACHES.** **AT EVERY SITE OF THIS DIRECTORY THAT
   PRINTS A CALL OF A STORE-REACHING NAME THE RECEIVER IS THE STORE: the FIRST POSITION is `address`, `handle`,
   `opId` or `pair`, a superseded module-level call shape — one carrying the `instance` FIRST, its own bytes
   MOVED OUT to the archive named below at the sites this section printed them — IS
   A SUPERSEDED SPELLING, and NO CLAUSE OF THIS DIRECTORY DECLARES A CALL SHAPE IN WHICH AN
   INSTANCE IS PASSED.** **THE SITES, NAMED ONE BY ONE SO NONE IS READ AS UNTOUCHED: `§2.1` (c) — this section's
   own, read above — `§2.3`'s carried mint-rule clause, `§2.2`'s signature block (five lines), `§2.10`'s
   signature block (two lines), `§2.12` item 1's opening and its five-stage walk, `§2.12` item 1's stage `2`,
   `§2.12` item 2 clause (ii)'s three signatures, and `§2.4` item 7's TWO step lists; each is read through this
   clause and through `§2.4` item 9 (f)'s `A127` clause of this date.** **⟶ AND THE COUNT THIS CLAUSE CARRIES IS CORRECTED 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS: THE SET IS **`13` SITES — `9 + 4 = 13` ✓ — AND NOT `5`, `6` OR `9`**, and not the `12` that pass was sent to confirm, because every enlargement before this one came from a sweep and none from the corpus; the FOUR the earlier lists omitted are `docs/specs/storeroom-js/acceptance.md §4.1` item 7, `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s withdrawal half, that part's `§2.15` item 3's arm table and `docs/specs/storeroom-js/crossing.md §1.7` (b) item 2, AND NO MEMBER OF THE EARLIER LISTS IS REMOVED — the one candidate for removal, `surface.md §2.12` item 2 clause (ii)'s three signatures, is kept because `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md`'s `§3` carries those very signatures with `instance` first while that archive's sweep note calls them *"already position-less"*, so the moved bytes decide; the thirteen-site enumeration, each site spelled with its file and its `§`, with the searched set printed beside it, has its ONE home at `§2.4` item 3 of this date.** **AND THE
   SET ABOVE IS `9` SITES AND NOT `5` OR `6`, THE ADDED ONES BEING THIS SECTION'S OWN (c) — omitted from the earliest list — §2.3's carried clause, and
   THE THREE `§2.12` item 1 SITES THE FOURTH PASS'S SWEEP FOUND AND CORRECTED: the
   nine-site read-back — each site spelled with its FILE, because a bare `§n` is not resolvable and both
   `surface.md` and `contract.md` carry `§2.1`–`§2.12` — is written out at this document's `§2.4` item 3 and at
   `§2.9` item 1's clause of this date, and this clause carries the COUNT and POINTS AT that list rather than
   printing a third copy of it.**
4. **AND THIS CLAUSE ADDS NO SECOND HOME TO ITS CITERS: the TEN METHODS, EACH WITH ITS ARITY, ITS POSITIONS, ITS
   ANSWER AND ITS REFUSAL, HAVE THEIR ONE TABLE AND THEIR ONE HOME AT `§2.4` ITEM 9 (f)'s `A127` CLAUSE OF THIS
   DATE, and this clause POINTS to it and RE-EMITS NO ROW OF IT** (`§2.4` item 9 (f); `§2.9` item 1's `A127`
   clause; `docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of this date).
(`[A2 docs/decisions.md` · `A127` · `A128`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f)'s and `§2.9`
item 1's `A127` clauses of the same date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of that
date | requirement and declared parameter semantics]`).

```
storeCreate(cfg) -> Instance          // throws {status, message} on failure; never returns a partial instance

cfg = {
  filePath:      string | absent,     // PAR-JS-2 — absent is IN DOMAIN (the register is created at mem)
  journalLength: number,              // PAR-JS-3 — REQUIRED, a positive integer counting ENTRIES
  listeners:     { address, handle }[], // PAR-JS-4 — REQUIRED, may be EMPTY, duplicates KEPT
  constraints:   ConstraintEntry[]    // ⟶ ADDED 2026-10-15 (RCA-9) — OPTIONAL; the store's constraint
                                      //   list, ONE element per pair: { address, id }. Validated at
                                      //   create AND at load. Its row is `parameter-semantics.md §2.21`
                                      //   (`PAR-JS-21`); `PAR-JS-4`'s domain is UNMOVED
}
```

**⟶ AMENDED 2026-10-15 — THE CONSTRUCTION'S `cfg` GAINS A FOURTH DECLARED KEY, `constraints`, AND THE *"NO FOURTH KEY"* FIGURE IS RE-SPELLED FROM `3 → 4`** (`RCA-9` = the change request recorded at `docs/specs/storeroom-native-proposal-review.md §18.1`, ruled `SETTLED` at its `§22.1`; `RCA-8(d)` ANNOTATE-BESIDE: **the sentence above and `§2.1`'s clause stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION and it re-spells no rule of theirs beyond the member set it must move**). **THE FOUR DECLARED KEYS ARE `filePath` · `journalLength` · `listeners` · `constraints` — `4` — and the package still adds NO DEFAULT, NO RENAME and NO FIFTH KEY** (`DD-36`'s cell is read at this figure from this date; the ruling is `§22.1`). **`constraints` ALONE IS OPTIONAL AMONG THE FOUR: absent, it is IN DOMAIN and no list is declared** — `PAR-JS-4`'s own three outside-value answers for `listeners` are UNMOVED, and the new key's own domain, outside values and answers are declared at `docs/specs/storeroom-js/parameter-semantics.md §2.21` (`PAR-JS-21`). **A PRESENT `constraints` WHOSE ELEMENT IS NOT A `{ address, id }` PAIR, OR WHOSE `address` LIES OUTSIDE `§1.5`'s segment array, IS VALIDATED AT CREATE AND AT LOAD, and its answer is the store's own code — never a package-side code and never a package-side message** (`§2.5`'s single form; `docs/specs/storeroom-native/contract.md §8.1` #16). **THE VALIDATION'S TWO INSTANTS ARE THE STORE'S AND ARE NAMED AT `docs/specs/storeroom-native/contract.md §7.1` and `§7.2` item 6; this clause declares the KEY and no instant of its own.** **⟶ AMENDED 2026-10-16 — `surface.md §2.1`'s *"NO FIFTH KEY"* AND `contract.md §7.1`'s *"any third key on `cfg` … **ignored**"* ARE RULED HERE, AND THE RULING IS THE PACKAGE'S SENTENCE: THE *"NO FIFTH KEY"* FIGURE IS A CONSTRAINT ON THE PACKAGE'S OWN PASSING — THE PACKAGE ADDS NO KEY THE CALLER DID NOT SUPPLY — WHILE A CALLER-SUPPLIED KEY BEYOND THE FOUR DECLARED ONES IS DISPOSED OF AT `docs/specs/storeroom-native/contract.md §7.1`, WHICH GOVERNS IT: **IGNORED, NO CODE, NO REFUSAL, NO MEMBER MOVED** (`contract.md §7.1`'s third-key row and its dated state clause; `§8.1`'s complement block, *"an unknown third key on the construction config"* is NOT a failure). **THE CELL THAT PINS THE OBSERVABLE IS `bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-08.22` (`OBSERVED`): a fifth key beside a valid four-key set is IGNORED**, and the two cells this clause reconciles are that row and `FTS-08.1`'s legal-form arm. **SO THE TENSION THE BLIND PASS FILED AS §5 ITEM (iv) IS CLOSED WITH NO CELL MOVING, `contract.md §7.1` GOVERNING THE CALLER-SUPPLIED KEY AND THIS PART'S *"NO FIFTH KEY"* GOVERNING THE PACKAGE'S OWN HAND — AND NO CLAUSE OF EITHER UNIT READS `cfg`'s MEMBER SET AS OPEN ON THE PACKAGE'S SIDE** (`role_spec_writer`, 2026-10-16; `[A3 docs/specs/storeroom-native/contract.md §7.1` and `§8.1`'s complement | declared parameter semantics]`). **⟶ AMENDED 2026-10-15 — THE CONSTRAINT LIST IS NOT PERSISTED, ON THE ARCHITECT'S OWN WORDS OF THIS DATE: *"The list is not persisted, the importing application will provide the constraints on startup from its own information."*** `RCA-8(d)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION and it re-decides no cell of the four-key law.** **`cfg.constraints` IS A CONSTRUCTION-TIME PARAMETER AND NOTHING MORE: the importing application supplies it on startup from its own information; THE STORE DOES NOT WRITE IT INTO THE FILE AND HOLDS NO REGISTER KEY FOR IT.** **THE SENTENCE THIS CLAUSE SUPERSEDES IS NAMED RATHER THAN LEFT LIVE: `docs/specs/storeroom-native-proposal-review.md §21.4` (`F-5`) prints *"the list PERSISTS THROUGH THE REGISTER"* — THAT SENTENCE IS SUPERSEDED BY THE ARCHITECT'S OWN WORDS ABOVE, and no clause of this part reads the list as a register member or as a byte of `cfg.filePath`** (that record's `§21.4`, ITS OWN BYTES STANDING AS THE RECORD OF WHAT WAS HELD; `docs/specs/storeroom-native/contract.md §7.1` STEP `4`-BIS). **AND THE VALIDATION'S TWO INSTANTS STAND AND ARE MADE MEANINGFUL BY THIS RULING: AT CREATE / STARTUP THE SUPPLIED LIST IS VALIDATED; OVER AN EXISTING FILE AT LOAD THE LOADED STATE IS VALIDATED AGAINST THE SUPPLIED LIST — AND THAT IS WHAT DETECTS A CORRUPT OR OBSOLETE FILE, one whose state no longer satisfies the constraints the application now supplies, the file itself being blocked from saving an invalid state** (`docs/specs/storeroom-native/contract.md §7.1` step 4 and `§7.2` item 6 AS AMENDED 2026-10-15).
(`[A3 docs/specs/storeroom-native-proposal-review.md §22.1 — `R-1` and the construction's constraint list | requirement]`)

### §2.2 The address verbs — `read` · `readLiteral` · `write` · `delete`

```
a.read(address, tier?)        -> JS value          // the assembled value, a leaf's literal, or the whole register
a.readLiteral(address, tier?)  -> JS value          // the SAME read, narrowed: the target must be a leaf
a.write(address, tier, value, commit?) -> { op, watched, triggered }
a.delete(address, tier?)       -> { address, tiers, triggered }
a.rollback(opId)               -> { opId, undoneOps, restoredTo }
```

**⟶ `RCA-8(g)` RE-SPELLED 2026-10-16 — THE `instance` FIRST POSITION IS DROPPED AND THE RECEIVER IS THE STORE.** **THE AS-FILED BLOCK ABOVE — the five lines `read(instance, address, tier?)` · `readLiteral(instance, address, tier?)` · `write(instance, address, tier, value, commit?)` · `delete(instance, address, tier?)` · `rollback(instance, opId)`, each with an `instance` FIRST POSITION — HAS LEFT THIS FILE and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §19`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **The `a` of each line above is the object `storeCreate(cfg)` returned — THE RECEIVER, and not a position — and the operative declarations are `§2.1` (e) item 3 and `§2.4` item 9 (f)'s clause of this date, which carries the ten methods' arity, positions, answer and refusal in one table** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).
**EVERY ONE OF THE FIVE IS SYNCHRONOUS AND RETURNS A FRESH JS VALUE** (`§1.1`'s deep copy out). **THE PACKAGE
PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN** (`DD-46`): **a missing, an extra or a
wrong-shaped argument reaches the store's own carrier value and answers the store's own code.** **`read`'s
`tier` accepts ZERO TO MANY — one token or an array — and an array is an ANY-MATCH set, not a union of
values, not an ordered preference and not a filter** (`DD-37`). **`write`'s `tier` is REQUIRED and SINGULAR;
`delete`'s `tier` is OPTIONAL and EXACTLY ONE when present.**
(`[A3 docs/specs/storeroom-native/contract.md §4.1 · §3.1 · §4.3 · §6.3 — the four verbs' own signatures |
requirement]`)

**⟶ AMENDED 2026-10-15 — THE WRITE'S FIFTH ARGUMENT, `commit?`, DECLARED LAST, AND THE DECLARED ORDER THAT OVERRIDES THE FLOW'S OWN RE-SEQUENCING** (`RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`, ruled `SETTLED` at that record's `§22.1`; `RCA-8(d)` ANNOTATE-BESIDE — **the signature block above stands byte-for-byte with the one argument this clause declares added to it, and the paragraph below it stands UNMOVED**).
1. **WHAT THE ARGUMENT IS.** **`commit` is the record identity the caller's kernel is building for this write — the object `K-2 commit` returned — and it is OPTIONAL: absent, THE WRITE OPENS OR JOINS A COMMIT ALL THE SAME, and every write proceeds through the flow whether or not a commit was supplied** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2; `docs/specs/storeroom-native-proposal-review.md §19.2` and `§20.2`). **THE ARGUMENT CARRIES NO TIER QUALIFIER: it is passed for a `file`-tier write and for no other, and its effect on the crossing is declared at `§2.11`** (`docs/specs/storeroom-native/contract.md §3.1` AS AMENDED 2026-10-15).
2. **ITS POSITION IS LAST AND IS DECLARED, NOT ENTAILED.** **The declared order is `a.write(address, tier, value, commit?)` — the method form, the receiver being the store and no position of it an instance (re-spelled 2026-10-16 at this clause's own cell under `§2.4` item 3's receiver rule) — `4` required arguments and the optional one at POSITION `5` — and the declaration governs over any order the write's own flow would suggest: the seam's act is the FLOW's last, and the argument that carries the record is the SIGNATURE's last, and the two orders are one order.** **SO A DRIVE THAT READS THE POSITION OFF THE FLOW RATHER THAN OFF THIS SIGNATURE HAS READ A CLAUSE THIS ONE DOES NOT CARRY** (`[A3 docs/specs/storeroom-js/parameter-semantics.md §1` — the declared arity, and `§2.20`'s own row | requirement]`).
3. **ITS OUTSIDE VALUES AND THEIR ANSWERS ARE THE STORE'S OWN, AND THE PACKAGE ADDS NONE.** **A `commit` that is not a record position this instance has ADOPTED answers the single form's own class test and NEVER a package-side code** (`§2.4` item 9 (g) — the class test, whose reading is UNAMENDED by this clause; `§2.5`'s single form). **A `commit` absent is IN DOMAIN and is not an outside value.** **THE PACKAGE PERFORMS NO ARITY CHECK OF ITS OWN, and the position is the one place where that rule and this signature meet** (`DD-46`, UNMOVED).
(`[A3 docs/specs/storeroom-native-proposal-review.md §22.1 and §22.5 item 5 | requirement]`)

**⟶ ADDED 2026-10-15 — THE FIFTH POSITION'S ARITY LAW, LANDED ON THE ARCHITECT'S RULING THAT THE PACKAGE'S ARITY CHECK STANDS (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the signature block, the paragraph that follows it, and clauses 1–3 — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION; it adds no argument, moves no position, mints no row and takes no cell off any other verb.**

4. **THE ONE ARITY CHECK THIS PACKAGE PERFORMS, AND THE ONE PLACE IT PERFORMS IT.** **THE PACKAGE MAY READ THE CALL'S ARGUMENT COUNT FOR THE FIFTH POSITION, AND ONLY FOR THE FIFTH POSITION: where the fifth position was SUPPLIED, the class test of clause 3 is taken on the value standing there; where it was NOT SUPPLIED, the write proceeds with the fourth position's own arity exactly as clauses 1–2 declare it, and NO DEFAULT IS FABRICATED FOR THE ABSENT POSITION.** **THE SENTENCE THIS CLAUSE SUPERSEDES IS NAMED BY ITS OWN WORDS AND STANDS BYTE-FOR-BYTE ABOVE: clause 3's *"THE PACKAGE PERFORMS NO ARITY CHECK OF ITS OWN, and the position is the one place where that rule and this signature meet"* — AND `DD-46`'s OWN CELL, *"the package passes every argument position through as supplied and performs NO arity check of its own"*, is read THROUGH this clause AT THE FIFTH POSITION ALONE** (`docs/specs/storeroom-js/contract.md §0.2 · `DD-46`; `docs/specs/storeroom-native/contract.md §0.2`'s `DD-46` row, whose `alt` cell's priced alternative — *"a JS-side arity check throwing a package `TypeError`"* — is TAKEN HERE, and the fresh ruling the cell required is this clause's own authority). **THE LAW THAT REPLACES IT: THE DECLARED ARITY OF `write` REMAINS `4` REQUIRED ARGUMENTS WITH THE FIFTH OPTIONAL AND DECLARED LAST** (`§2.2` clauses 1–2; `docs/specs/storeroom-js/parameter-semantics.md §1`), AND THE PACKAGE READS THE CALL'S ARGUMENT COUNT FOR THE FIFTH POSITION AND FOR NO OTHER POSITION OF ANY VERB: NO OTHER VERB AND NO OTHER POSITION OF THIS SURFACE GAINS AN ARITY READING, A DEFAULT OR A SUBSTITUTED ARGUMENT** (**READ AT THE BOUNDARY'S OWN BYTES**, 2026-10-15: `bindings/js/index.mjs:1547` gates the position on `arguments.length >= 5`, and **ITS ABSENCE IS A READ OF THE CALL, NOT OF THE VALUE — the count is the whole of what this position's arity half reads, and no other position of `write` and no other verb carries such a read**). **SO THE POSITION'S TWO CALL SHAPES ARE ONE LAW EACH AND NOT ONE LAW AND ONE HOLE: `write(instance, address, tier, value)` — the position ABSENT — OPENS OR JOINS ITS COMMIT AND PROCEEDS WHETHER OR NOT A COMMIT WAS SUPPLIED (IN DOMAIN); AND `write(instance, address, tier, value, undefined)` — the position SUPPLIED WITH `undefined` — IS REFUSED** (`docs/specs/storeroom-js/parameter-semantics.md §2.20`'s outside-value cells AS RE-SPELLED 2026-10-15, where the ground's closure is declared). **AND NOTHING ELSE MOVES: the module namespace stays at the `8` declared verbs, the instance's member set stays `{ register, on, off, settle }`, the register keeps its `8` rows, the store's namespace stays CLOSED at `8` verbs, and every other outside-value answer of every other position stands exactly as this part prints it** (`docs/specs/storeroom-native-proposal-review.md §19.1`).

**⟶ ADDED 2026-10-16 — THE FIFTH-POSITION ANTI-PATTERN, DECLARED IN THIS SPECIFICATION'S OWN TERMS ON `A125` (`role_spec_writer`; `docs/decisions.md`, 2026-10-16).** `RCA-8(d)` ANNOTATE-BESIDE: **the signature block, the paragraph after it and clauses 1–4 above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no argument, moves no position, mints no code, moves no cell of the fifth position's own row and no count of this part.**

5. **AN EXTERNALLY-SUPPLIED `commit` IS AN UNSUPPORTED ANTI-PATTERN — NOT A REFUSED CALL, NOT A THROW, AND NOT A SILENT DEGRADATION.** **`A125`, verbatim: *"Externally calling a write with a commit is an unsupported anti-pattern. It is present because repair functions need to use the external package surface and still be added to a commit log."*** **THIS SPECIFICATION'S OWN TERMS, SO NO READER SUPPLIES ONE OF ITS OWN:**
   1. **WHAT THE POSITION IS FOR.** **The fifth position exists SO THAT A REPAIR WRITE MADE BY THE KERNEL'S OWN FLOW — an act that MUST go through the external package surface and MUST land in the commit log — carries the record identity it joins. It is not a caller's control and it is not a way to reach the store directly.**
   2. **WHAT AN EXTERNAL SUPPLY IS.** **An EXTERNAL supply is a fifth-position argument the CALLER authored or obtained for its own call and did NOT receive as the identity THIS INSTANCE HAS ADOPTED as a record position.**
   3. **THE DECLARED ANSWER, AND ITS EXACT SHAPE — THE NARROWEST ANSWER CONSISTENT WITH `A124` AND `§2.4` ITEM 9 (g).** **AN EXTERNAL SUPPLY IS NOT REFUSED BY ARITY, IS NOT REFUSED BY A NAMED CODE, AND IS NOT DETECTED BY A TEST THIS UNIT DECLARES: THE PACKAGE READS NO ARITY AND NO PROVENANCE FOR THIS POSITION BEYOND THE ONE ARITY READING CLAUSE 4 DECLARES, AND EVERY OBJECT AT THE POSITION THAT FAILS `§2.4` ITEM 9 (g)'s CLASS TEST IS REFUSED BY THAT TEST'S OWN SINGLE FORM.** **SO A `commit` THIS INSTANCE HAS NOT ADOPTED AND THAT DOES NOT CARRY A `pending` MEMBER TAKES `parameter-semantics.md §2.20`'s refusal at its own `the declared answer for EACH outside value` cell — CITED AND NOT RESTATED HERE — WHILE ONE THAT DOES CARRY a `pending` member is ADOPTED at its first call by `§2.4` item 9 (g)'s own admission, which `A120` (1) made law.** **THIS UNIT DECLARES NO THIRD ARM AND MINTS NO CODE FOR THE ANTI-PATTERN'S OWN CASE.**
   4. **THE SUPPORTED SHAPE IS THE ONLY ONE THIS UNIT PLACES IN ITS OWN FLOW.** **`§2.12` ITEM 1 IS THE ONE EXTERNAL SUPPLY THIS UNIT DECLARES: THE KERNEL'S, WHERE THE IDENTITY IS THE RECORD POSITION THE INSTANCE HAS ADOPTED, and every write the package's own flow makes carries it for that reason alone.**
(`[A2 docs/decisions.md` · `A125` and `A124`, both 2026-10-16; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (g) and §2.12 item 1; A3 docs/specs/storeroom-js/parameter-semantics.md §2.20; archive/reviews/2026-10-16-constraints-publication-gate1.md §19 | requirement]`)

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
the `listen` method's own signature are UNCHANGED — the receiver being the store and no position of it an instance, per `§2.10`'s clause of 2026-10-16 — `listen` still returns the package's opaque wrapper —
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

**⟶ `RCA-8(g)` ARCHIVAL MOVE, 2026-10-15: `§2.3`'s OWN DATED PASS-RECORD — the bounded `A78` re-homing pass's record for the handle clause, which stood immediately above this line and was read THROUGH by `§2.3` items 1–5 — is moved BYTE-EXACTLY to `archive/spec-history/2026-10-15-js-surface-volume-archival.md` `§1`, the one home that pass record now has; NO RULE MOVED: `§2.3` items 1–5 stand as printed, item 5's prefix test stands at its own store-side home (`docs/specs/storeroom-native/write-and-read.md` `§6.5` item 10 (d) (iii)), the mint rule stands at that section's `§6.5` item 12 (c) and at `contract.md §2.3` item 6, and the `unlisten` no-op set stands at `docs/specs/storeroom-js/surface.md §2.3` item 4 with `PAR-JS-8`.**

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
  sentence is AMENDED to say exactly this** (see `§2.1`'s dated clause). **⟶ AND `§2.1`'s dated clause's own
  member-set statement is RE-READ ONCE MORE, 2026-10-15, BY THE ORDERING SEAM: THE INSTANCE'S DECLARED MEMBER
  SET IS `{ register, on, off, settle }`, so this cell's *"`{ register }` — one own member, and NOTHING ELSE"*
  and its *"IT IS ITS ONLY MEMBER"* are read as the PRE-`A79` state they were written at and NEVER as a
  prohibition of the three later members the later rulings added — `on` and `off` at `§2.4` item 7, and the seam at
  `§2.4` item 9** (`[A2 docs/decisions.md · `A116` (D1); A2 docs/decisions.md · `A79` · `A80`; A3
  docs/specs/storeroom-js/surface.md §2.4 item 9 | numeric or census claim]`). **It is NOT a NINTH NAMED EXPORT of
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
  REGISTRATION, carrying NO `status` member and NO `message` member** (`PAR-JS-12`'s declared exception; the ONE
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
  classified exactly as `PAR-JS-12`'s exception clause classifies it.** **⟶ AND TWO THINGS OF THIS CLAUSE ARE NOT READ AS ONE, SAID HERE FOR A READER MEETING `§2.4` ITEM 9 (b) FIRST, 2026-10-15: (1) THIS clause (d) declares the `TypeError` at the REGISTRATION SITE — the instance's `register` member, ONE of the instance's own members — and this site's OPERATIVE FORM is the one `§2.5` item 5 (g) fixes, the store's single `{status, message}` rejection with the status `AddressMalformed`; (2) `§2.4` item 9 (b), landed the same day on `docs/decisions.md` · `A116` (D1), re-spells *"carrying NO `status` and NO `message` member"* AT ITS OWN BOUNDARY — the ORDERING SEAM's `settle` site — where the refusal's `status` member is ABSENT and a STRING `message` member is REQUIRED AND NOT FORBIDDEN.** **THE TWO SITES ARE DECLARED AT TWO CLAUSES OF THIS PART AND NEITHER RE-SPELLS THE OTHER; and the four input classes above stand UNMOVED either way** (`[A2 docs/decisions.md · `A116` (D1); A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (b) and §2.5 item 5 (g) — the seam's clause and this site's own | requirement]`).
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

**⟶ `RCA-8(g)` ARCHIVAL MOVE, 2026-10-15: `§2.4`'s OWN DATED PASS-RECORD — the bounded `A78` re-homing pass's firing/delivery record for the registry, which stood immediately above this line and drew the firing/delivery line for this part and split the `CF-DUP-3` clause's halves — is moved BYTE-EXACTLY to `archive/spec-history/2026-10-15-js-surface-volume-archival.md` `§2`, the one home that pass record now has; NO RULE MOVED: `§2.4` rules 1–4 and item 6 (b)–(e) stand as printed, `§2.7` items 1–5 stand as printed, the firing half stands at the STORE's own listener clauses (`docs/specs/storeroom-native/write-and-read.md` `§6.5` items 8–14), and this section's `CF-DUP-3` clause stands byte-for-byte and is still read as the pointer that record named.**

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
stay un-overloaded** (`§2.1`'s dated clause). **⟶ AND THE NAMESPACE FIGURE THIS CLAUSE PRINTS IS SUPERSEDED AND IS READ THROUGH AT THIS CLAUSE'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the clause stands BYTE-FOR-BYTE above and THIS clause is its mark): *"the module namespace stays at the eight declared verbs"* IS THE `Q1` PASS'S READING, the operative figure being ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause — the product's declared member set being TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `16` cells**
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
  2. LISTEN     the store's own `listen` verb, reached as the product's `listen` method on the receiver at position `1`   // the store's home gains the entry, or returns the entry already held
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
  2. UNLISTEN    the store's own `unlisten` verb, reached as the product's `unlisten` method on the receiver      // the STORE-facing withdrawal (§2.3 item 4)
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
   **The register keeps its `8` rows with every failure list unmoved, the `PAR-JS` set stays `18` FOR THIS CLAUSE'S OWN DATE — its OPERATIVE count is `21` at `parameter-semantics.md §1`/`§2.20`–`§2.21` NO LONGER: **THAT LABEL IS WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `21` being the gate-2 close-out pass's 2026-10-15 reading and the OPERATIVE count being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — and no part
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
   `PAR-JS` set stays `18` with `PAR-JS-8` and `PAR-JS-12` RE-DERIVED and no nineteenth row minted FOR THAT REASON — ITS OPERATIVE COUNT IS `21` AT `parameter-semantics.md §1`/`§2.20`–`§2.21` NO LONGER: **THAT LABEL IS WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `21` being the gate-2 close-out pass's 2026-10-15 reading and the OPERATIVE count being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — and no part
   entry is authored, renumbered or dropped here.**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the three rulings this item implements;
   A1 docs/specs/storeroom-js-proposal.md §18 · `A74` · `A76` · `A77` and §19 · `A78` — the constraints it obeys;
   A3 docs/specs/storeroom-js/crossing.md §1.7–§1.8 — the validation order and the no-repair prohibition;
   A3 docs/specs/storeroom-native/write-and-read.md §6.5 items 12 (c) and 14 | requirement]`).

**⟶ ADDED 2026-10-15 — THE `A115` ORDERING-GATE PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING ***"Proceed with recommended fix."*** READ WITH ITS OWN ADOPTED READING (K): THE REPLACEMENT SEAM CLOSED, AND THE ONE VERDICT IT PUTS IN PLACE OF TWO `NOT-EXERCISABLE` CELLS.** **rules 1–4 above, item 5, item 6 and item 7 whole stand byte-for-byte and are read THROUGH this clause; THIS clause re-spells no rule, adds no member, no verb and no parameter, mints no code and moves no register row, and it takes NO finding against either side of the conflict it closes.**

**8. TWO HOLDERS, TWO STRUCTURES, AND WHICH CALL REPLACES WHICH.** **THE CONFLICT CLOSED HERE WAS A HELD-ARM CONFLICT AND IT IS CLOSED BY READING (K): the word *"holder"* at `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1 means THE STORE'S HOME ENTRY — one entry per address, the store's own `{address, handle}` record — and NOT the package REGISTRY's function slot; the two are DIFFERENT HOLDERS OVER DIFFERENT MEMBERS, and this section's rules 1–3 and `DD-52` stand as this directory declares them** (`[A2 docs/decisions.md · `A115` (D4) — Reading (K) adopted, the replacement declared behaviour and not a defect; A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) — *"a `listen(address)` whose address IS already registered returns the EXISTING entry's handle rather than minting a second one"*; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1 and `§2.2` item 4 — the item re-spelled to name both holders, and the kernel's pair-keyed registry beside the store's address-keyed home | state or fail-state declaration]`).
- **(a) WHICH CALL REPLACES WHICH HOLDER.** **A caller's `on(address, listenerB)` at an address whose home entry ALREADY STANDS replaces the PACKAGE REGISTRY'S FUNCTION SLOT for the handle that address's home entry carries** — the store's `listen` mints nothing, the entry's own handle is returned unchanged, and the function the registry held for that identity is REPLACED and dropped without notice (rules 2–3; item 5 (a)'s step list, steps 2 and 3). **IT REPLACES NOTHING IN THE STORE: THE HOME ENTRY AT THAT ADDRESS STANDS, ONE ENTRY, ONE HANDLE, and no call of this package's surface replaces it.** **AND IT REPLACES NOTHING IN THE KERNEL'S OWN STRUCTURE: the kernel's registry is keyed by (`address`, `id`) and is not reachable through this package's registry at any instant** (`docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4).
- **(b) THE HELD-ARM OBSERVABLE.** **Held address, two registrations, one handle: the second `on` call RETURNS THE SAME OPAQUE IDENTITY THE FIRST RETURNED, the registry's function for that identity is the SECOND LISTENER, a later trigger carrying that identity invokes THE SECOND LISTENER AND NEVER THE FIRST, and the FIRST function is never invoked again by any trigger** — while, of a `register(handle, fn)` made for that same identity by the other member, `off` and this registry hold **at most one function per identity and do not record which member wrote it** (`DD-52`). **SO THE REPLACEMENT'S EFFECT IS DECLARED BEHAVIOUR AND NOT A DEFECT, AND NO FINDING FOLLOWS FROM IT.**
- **(c) THE CONSEQUENCE A DRIVE READS, STATED SO ONE VERDICT REPLACES TWO.** **AND THE CONSEQUENCE IS SINGLE-VALUED (AMENDED 2026-10-15, on `A115` (D2) — `docs/decisions.md`): THE CELLS THAT WERE `NOT-EXERCISABLE` ON THE HELD-ARM SPLIT ARE EXERCISABLE AT THIS CELL AND THE BLIND DRIVER DERIVES ONE VERDICT: the constraint's body runs ONCE inside the pass — the function that runs once at that address is the one THE PASS EVALUATES, the evaluated pair's own function the kernel reaches through its pair-keyed map, delivered by the kernel's layer (a) INSIDE the pass — and the app's own `on` at that address, which replaced the registry's slot, IS NOT DELIVERED **INSIDE THE PASS** — THE FIRING THAT BODY IS OWED IS NOT WITHDRAWN BY THIS: the identity the pass checked off is the identity the app's registration returned — the app's handle IS the evaluated pair's handle — **AND THE APP'S REGISTRATION AT THE PAIR-ADOPTED ADDRESS IS OWED ITS FIRING AFTER THE PASS, EXACTLY AS ITS SIBLING REGISTRATION AT THE PROPER PREFIX IS: the pass's terminal arm reaches it and invokes the function the registry holds for that identity with the triggering address (`§2.7` item 6 — the other listeners are reached ONCE EVERY CONSTRAINT HAS PASSED — with item 7's delivered set as the carrier (the residue PLUS the checked-off identities the registry resolves, item 7's keying clause AS RE-SPELLED 2026-10-15)) (`[A2 docs/decisions.md — THE ARCHITECT'S CORRECTION OF 2026-10-15, LANDED AT THIS SITE: item 8 (c)'s subject is WHICH IDENTITY THE APP'S REGISTRATION HOLDS AND WHICH SLOT IT REPLACED — the TURNING ON of a listener — and it ANSWERS WHICH FUNCTION THE PASS EVALUATES; IT CANNOT GOVERN WHETHER THE LISTENER FIRES AFTER A CHANGE, the firing law being `§2.7` item 6); A3 docs/specs/storeroom-js/surface.md §2.7` item 6 — the firing law, read with item 7 and item 7 (a) — the removal this correction makes, WITHDRAWN BY NAME: the derived non-delivery this clause carried (*"IS NOT DELIVERED AT THAT INSTANT"*, *"no entry for it stands in `pending`"*) WAS A REGISTRATION-SIDE FACT READ AS A DELIVERY RULE and is not law here; A3 docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) — *"a `listen(address)` whose address IS already registered returns the EXISTING entry's handle"* | state or fail-state declaration]`). A DRIVE THAT FOUND THAT BODY RUN **INSIDE THE PASS** WOULD HAVE FOUND A REPLACEMENT OF THE EVALUATED PAIR'S FUNCTION — the slot this clause declares replaced — and not a non-delivery: THE OWED FIRING IS REACHED AT THE TERMINAL ARM AND A DRIVE THAT FINDS IT UNREACHED THERE HAS FOUND A FAILURE OF `§2.7` ITEM 6.**
- **(d) WHAT THIS CLAUSE DOES NOT DECIDE.** **It takes no finding against `bindings/js/**`, and it re-decides no rule of this section: rules 1–4, item 5's registration site and domain, item 6's id-matching model and item 7's two members stand exactly as printed.** **The register keeps its `8` rows with every failure list unmoved and NO NINTH ROW IS MINTED, the `PAR-JS` set stays `18`, and the `DD` family stays at `54` rows with `DD-52`'s and `DD-39`'s readings unmoved** (READ THROUGH `§2.4` ITEM 9, LANDED 2026-10-15: *"the `PAR-JS` set stays `18`"* is the date this clause was written at, and that set's OWN operative count is `21` at `parameter-semantics.md §1`/`§2.20`/`§2.21` NO LONGER — **THAT LABEL IS WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `19` and the `21` being those passes' readings and the OPERATIVE count being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — the `8` rows, the cap `8 ≤ 8`, `DD-52`'s and `DD-39`'s readings and the `54` `DD` rows all stand UNMOVED) (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A2 docs/decisions.md · `A115` (D3) — the instance's `{register, on, off}` UNMOVED; A3 docs/specs/storeroom-js/contract.md §0.1 item 5 — the `≤ 8` cap | requirement]`).

**⟶ RE-DERIVED 2026-10-16 — THE CONSTRUCTION'S PRODUCT IS THE STORE ITSELF, ITS MEMBER SET IS THE TWELVE OF `§2.4` ITEM 9 (f)'s CLAUSE OF THIS DATE, AND EVERY METHOD'S ARITY AND REFUSAL IS DECLARED THERE ONCE (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`, verbatim: *"Creating a store returns an interface object that contains the store data and has the surface functions as methods"* · *"Functions that do not require an existing store (ex. storeCreate) remain discrete"* · *"Store's state is held privately."* · *"Inconsistency - all store-modifying acts should operate by method, not function"*).** **`RCA-8(g)` MOVE-OUT, AND THE ONE-LINE POINTER IS THE EVIDENCE THAT THE BYTES HAVE LEFT: every dated clause of this section above the retired `RCA-8(d)`-era reading stands byte-for-byte at its own bytes, `(a)`–`(c)` included, and each is read THROUGH this clause, which is the operative statement of the product, of its member set and of the namespace from this date; NO superseded byte of this section stands beside this clause, the superseded readings being carried in their own unit's `backup/` set, and the retired instrument is cited by no clause of this pass** (`RCA-8(g)`; `docs/defects.md` · `DEF-2026-10-16-O`).
1. **THE PRODUCT, AND THE OPACITY SENTENCE `§2.1`'s OWN NON-EXPOSURE CLAUSE CARRIES: `storeCreate(cfg)` RETURNS AN INTERFACE OBJECT THAT CONTAINS THE STORE DATA AND CARRIES THE SURFACE FUNCTIONS AS METHODS, AND THE STORE'S STATE IS HELD PRIVATELY — so the opacity sentence is SATISFIED BY CONSTRUCTION and needs no amendment: no data member of the store is a member of the product, and the product's own-property set is METHODS ONLY.** **A DRIVE THEREFORE DERIVES THE OPACITY OBSERVABLE FROM THE MEMBER SET ITSELF: every own property of the returned object is one of the twelve names `§2.4` item 9 (f)'s clause of this date enumerates, and NO OWN PROPERTY OF IT IS A VALUE, A RECORD, A MAP, A TIER, AN ADDRESS, A HANDLE, A COMMIT OR ANY STORE STATE.**
2. **THE MODULE NAMESPACE FALLS TO ONE NAME AND THE TEN METHODS STAND IN ITS PLACE — `storeCreate` ALONE, `11 → 1` ✓, with the ten names and their migration derivable from `§2.9` item 1's `A127` clause and from `§2.9`'s removal-versus-deprecation clause of this date.**
3. **AND ONE SPELLING, WHICH IS WHAT THE FOURTH OF `A127`'s SENTENCES ABOVE REQUIRES: AT EVERY SITE OF THIS DIRECTORY THAT PRINTS A CALL OF A STORE-REACHING NAME, THE RECEIVER IS THE STORE AND THE FIRST POSITION IS `address`, `handle`, `opId` or `pair` — so `read(instance, address, tier?)`, `write(instance, address, tier, value, commit?)`, `listen(instance, address)` and their siblings ARE SUPERSEDED SPELLINGS and no clause of this directory declares a call shape in which an instance is passed.** **THE SITES ARE NAMED SO NONE IS READ AS UNTOUCHED, AND EACH IS SPELLED WITH ITS FILE BECAUSE A BARE `§n` IS NOT RESOLVABLE — `surface.md` AND `contract.md` BOTH CARRY `§2.1`–`§2.12`:** **(1) `docs/specs/storeroom-js/surface.md §2.1` (c) — this section's own clause, whose module-level command is MOVED OUT to `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §17` and RE-SPELLED AT ITS OWN BYTES in the method form; (2) `docs/specs/storeroom-js/surface.md §2.3`'s carried mint-rule clause; (3) `docs/specs/storeroom-js/surface.md §2.2`'s signature block (five lines), relocated whole into `docs/specs/storeroom-js/contract.md §2.2`; (4) `docs/specs/storeroom-js/surface.md §2.10`'s signature block (two lines), relocated whole into `docs/specs/storeroom-js/contract.md §2.10`; (5) `docs/specs/storeroom-js/surface.md §2.12` item 1's opening and five-stage walk, its stage `1`'s four-position call; (6) `docs/specs/storeroom-js/surface.md §2.12` item 1's stage `2`, whose store-side leg printed the five-position module form and is re-spelled to the method form with the store named as the receiver at its own bytes and the KERNEL'S OWN leg cited in its place; (7) `docs/specs/storeroom-js/surface.md §2.12` item 2 clause (ii)'s three signatures; (8) `docs/specs/storeroom-js/surface.md §2.4` item 7's `on` step list; and (9) `docs/specs/storeroom-js/surface.md §2.4` item 7's `off` step list.** **⟶ AND THE SET THIS LIST CARRIES IS RE-DERIVED BY ENUMERATION, 2026-10-16 BY THE GATE-2 FIFTH REVIEWER-LOOP PASS, BECAUSE EVERY EARLIER ENLARGEMENT OF IT CAME FROM A SWEEP AND NONE CAME FROM THE CORPUS: THE OPERATIVE SET IS **`13` SITES** — `9 + 4 = 13` ✓ — EACH SPELLED WITH ITS FILE AND ITS `§`, AND THE `13` IS NOT THE `12` THIS PASS WAS SENT TO CONFIRM.** **AND NO MEMBER IS REMOVED: the member this pass was directed to drop — `docs/specs/storeroom-js/surface.md §2.12` item 2 clause (ii)'s three signatures — IS **RESTORED AND NAMED AT ITS OWN FILE AND `§`**: it is member `(7)` of the list above, and the evidence the directive cited does not support its removal — that archive's sweep note reads `§2.12` items 2–4 as *"already position-less"*, AND THE NOTE IS FALSE OF THIS CLAUSE, because the same archive's `§3` is headed *"MOVED OUT OF `surface.md §2.12` ITEM 2 CLAUSE (ii) — THE `instance`-CARRYING SIGNATURES OF THE THREE SURFACE FUNCTIONS"* and its byte-exact body reads `addConstraint(instance, pair, constraint)` · `constraintOn(instance, pair, constraint)` · `constraintOff(instance, pair, constraint)` and *"// instance: the object storeCreate returned"*, while that archive's own re-spelling list COUNTS THE SAME CLAUSE AMONG THE SITES RE-SPELLED AT THEIR OWN BYTES.** **SO NO MEMBER OF THE LIST ABOVE IS STRUCK, AND THE FOUR THE EARLIER LISTS OMITTED ARE ADDED BESIDE THE NINE: (10) `docs/specs/storeroom-js/acceptance.md §4.1` item 7 — the arity exemplars' three `read` spellings, re-spelled to `a.read(address)`; (11) `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s withdrawal half — the `off` step `2` that printed `unlisten(instance, handle)` and was re-spelled to `a.unlisten(handle)`; (12) `docs/specs/storeroom-js/parameter-semantics.md §2.15` item 3's arm table — its `write(instance, address, tier, value)` row and its two `delete` rows, re-spelled to the method form; and (13) `docs/specs/storeroom-js/crossing.md §1.7` (b) item 2 — the `rollback(instance, Symbol())` exemplar, whose own bytes now print `a.rollback(Symbol())` and which NO LIST NAMED UNTIL THIS ONE.** **THE SET IS THEREFORE THE LIST'S `(1)`–`(9)` — `9` ✓ — PLUS THE FOUR `(10)`–`(13)` — `4` ✓ — `9 + 4 = 13` ✓, and the superseded *"`9` SITES, ONE COUNT, ONE SET"* tail below is read through this clause.** **AND NO MEMBER IS REMOVED: THE MEMBER THIS PASS WAS DIRECTED TO DROP — member `(7)`, `docs/specs/storeroom-js/surface.md §2.12` item 2 clause (ii)'s three signatures — IS **RESTORED AND NAMED AT ITS OWN FILE AND `§`**, because the evidence the directive cited does not support it: the archive's own sweep note at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md` reads `§2.12` items 2–4 as *"already position-less"*, AND THAT NOTE IS FALSE OF THIS CLAUSE — the same archive's `§3` is headed *"MOVED OUT OF `surface.md §2.12` ITEM 2 CLAUSE (ii) — THE `instance`-CARRYING SIGNATURES OF THE THREE SURFACE FUNCTIONS"* and its byte-exact body reads `addConstraint(instance, pair, constraint)` · `constraintOn(instance, pair, constraint)` · `constraintOff(instance, pair, constraint)` and *"// instance: the object storeCreate returned"*, while that archive's own re-spelling list at its `§68` region COUNTS THE SAME CLAUSE AMONG THE `12` SITES RE-SPELLED AT THEIR OWN BYTES.** **SO THE CLAUSE PRINTED AN `instance` POSITION, IT APPEARS **NONE** OF THE THREE LISTS, AND THE COUNT IS `13`.** **THE CARRIER'S TWO BLOCKS ARE NOT COUNTED BESIDE: (14) `docs/specs/storeroom-js/contract.md §2.2` and (15) `docs/specs/storeroom-js/contract.md §2.10` ARE THE SAME SITES AS `(3)`–`(4)`, moved whole with their carrier, their superseded bytes standing at that archive's `§19` and `§20`.** **AND THE SEARCHED SET, PRINTED BESIDE THE COUNT BECAUSE A SET DERIVED FROM THE SITES ONE PASS HAPPENED TO TOUCH IS A FIGURE ABOUT THE PASS AND NOT ABOUT THE CORPUS (2026-10-16, THE GATE-2 FIFTH REVIEWER-LOOP PASS): EVERY LIVE `.md` FILE OF `docs/specs/storeroom-js/` WAS WALKED — SEVEN FILES: `contract.md` · `surface.md` · `parameter-semantics.md` · `crossing.md` · `acceptance.md` · `implementation-plan.md` · `test-cases.md` — AND EACH WAS SEARCHED FOR A CALL SHAPE BEARING AN `instance` POSITION, THE PATTERN BEING A STORE-REACHING NAME IMMEDIATELY FOLLOWED BY `(instance` OR BY `(` AND AN ARGUMENT LIST WHOSE FIRST POSITION IS `instance`; THE `backup/` DIRECTORY IS EXCLUDED FROM THE WALK BECAUSE IT IS THE ARCHIVE AND EVERY BYTE IT CARRIES WAS ALREADY SWEPT — EXCEPT WHERE ITS OWN RECORDS SETTLE A SITE, WHICH IS WHERE THE ONE DIVERGENCE FROM THE `12` THIS PASS WAS SENT TO CONFIRM COMES FROM; THE CALL-SHAPE COUNTS FOUND IN THE LIVE FILES ARE `surface.md` `7` · `contract.md` `5` · `parameter-semantics.md` `2` · `acceptance.md` `2` · `crossing.md` `1` · `implementation-plan.md` `0` · `test-cases.md` `0`.** **AND ONE ARCHIVE RECORD THAT CONTRADICTS ITS OWN ARCHIVE IS NAMED AT ITS OWN `§`: `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md`'s sweep note reads `surface.md §2.12` items 2–4 *"already position-less"*, WHILE THAT ARCHIVE'S `§3` CARRIES THE `instance`-FIRST SIGNATURES IT MOVED OUT OF THAT VERY CLAUSE AND ITS OWN RE-SPELLING LIST COUNTS THE CLAUSE AMONG THE SITES RE-SPELLED AT THEIR OWN BYTES; the sweep note is a summary and the `§3` body is the moved bytes, so THE BODY DECIDES, member `(7)` STANDS, and THE COUNT IS `13` AND NOT THE `12` THIS PASS WAS SENT TO CONFIRM.** **NO THIRTEENTH SITE WAS FOUND BESIDE THESE THIRTEEN: the two sites `parameter-semantics.md §2.23` item 5's requirement list names ARE members `(11)` AND `(12)` ABOVE and are no member beside them, and `test-cases.md`'s `THE TEN METHODS` row is a `view` part that declares nothing this contract does not already carry.** (`docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md`'s sweep, file items `2`, `4` and `5`; `docs/specs/storeroom-js/parameter-semantics.md §2.23` item 5; `docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v)` | numeric or census claim]`). **ONE SITE IS COUNTED ONCE THOUGH ITS BYTES STAND IN TWO DOCUMENTS: the carrier parts' relocations are the same bytes and are named here rather than counted again** — **AND THESE ARE `9` SITES: the `5`, then the `6`, then the `8`, then the `9` are the four successive readings of ONE set, each re-spelled at its own cell — `§2.1` (c) was the omitted sixth, the two `§2.12` item 1 sites the omitted seventh and eighth, and `§2.3`'s carried clause the omitted ninth — and a print of `5`, `6` or `8` for this set is from this date a READ OF A SUPERSEDED READING; THE SAME `9` IS THE FIGURE `docs/specs/storeroom-js/surface.md §2.9` item 1's clause of this date prints at its own re-stated list** — **each read through this clause and through `§2.4` item 9 (f)'s `A127` clause of this date, which carries every one of the ten methods' arity, positions, answer and refusal in one table.**
(`[A2 docs/decisions.md` · `A127`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f)'s clause of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §1's clause of this date | declared parameter semantics]`).

**9. THE ORDERING SEAM — `settle(record) -> undefined`, THE ONE MEMBER THE KERNEL CALLS AND THE ENTRY
IMPLEMENTS, TAKEN AT THE TWO INSTANTS OF A KERNEL-DRIVEN WRITE.** **LANDED 2026-10-15 BY THE `A116`
ORDERING-SEAM PASS (`role_spec_writer`) ON THE ARCHITECT'S RULING — VERBATIM:** ***"Name the seam and lift
`A115` (D1)'s refusal for it."*** (`docs/decisions.md` · **`A116`**). **THIS ITEM DECLARES THE SEAM AND NOTHING
BESIDE IT: it adds ONE member to the instance's declared set — `{ register, on, off, settle }`, FOUR own members
and NOTHING ELSE, stated where that set is declared at `§2.1`'s dated clause and re-read at `§2.4` item 5
(a) — it mints NO kernel item (the kernel's extent stays FIVE), opens NO second package, adds NO store-namespace
member (that namespace stays CLOSED at `8` verbs), holds NO store value of its own, and puts NO discriminator on
the handle, the registration or the address** **⟶ AND THE SET-FIGURE THIS ITEM PRINTS IS SUPERSEDED AND IS READ THROUGH AT THIS ITEM'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the item stands BYTE-FOR-BYTE above and THIS clause is its mark): *"`{ register, on, off, settle }`, FOUR own members"* IS THE `A116` PASS'S READING, the operative member set being TWELVE own members, `10 + 1 + 1 = 12` ✓ — the TEN METHODS plus `register` and `settle` — at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of that date, with the namespace's ONE name, `storeCreate`, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause; the item's OWN subjects — the seam, the kernel's five-item extent and the store's closed `8`-verb namespace — STAND WHOLE; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory** (`[A2 docs/decisions.md · `A116` (D1) — the seam as a declared ARM
of the instance, the set opening *"by ONE clause"*; (D2) — the kernel calls it and the entry implements it;
(D3) — the narrow lift and the five named refusals; (D4) — the carrier `CommitRecord.pending` unchanged |
declared parameter semantics]`).

**THE ARM, ITS SIGNATURE AND ITS ONE ARGUMENT.**
```
settle(record) -> undefined    // a member of the object storeCreate returned; called ONLY by the kernel, from commit and from runAttempt's terminal arm
```
**IT TAKES EXACTLY ONE argument — THE RECORD IDENTITY the kernel issued through `commit` for the write in
flight, that member's identity and not a copy of it — AND IT RETURNS `undefined`: there is NO second return
shape, no refusal value and no count for a drive to read off the return.** **IT IS THE MEMBER THE KERNEL CALLS
AND THE ENTRY IMPLEMENTS, AND THAT HALF IS THE ONE NO SIXTH KERNEL READ CAN CARRY: the kernel holds NO
handle→function map, so no read of any kernel item can reach the registry a body is held in, and only a
member the kernel CALLS and the entry IMPLEMENTS carries BOTH halves of the delivery decision** (`[A2 docs/decisions.md ·
`A116` (D2); A3 docs/specs/storeroom-constraints/kernel-surface.md §1` item 1 — the kernel's five items, of
which `K-4`/`K-5` are the only readers and neither reaches the store | declared parameter semantics]`). **NO
STORE CALL IS PERFORMED IN ANY ARM OF THIS MEMBER: it reaches the registry and nothing else.** **AND ONE READING THE NON-EXPOSURE SENTENCE OWES:
`settle` is NOT a ninth named export — the module namespace stays at the `8` declared verbs — AND BOTH FIGURES OF THIS SENTENCE ARE SUPERSEDED AND ARE READ THROUGH AT THIS SENTENCE'S OWN BYTES, 2026-10-16 (`RCA-8(g)`: the sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): the `8` declared verbs and the `ninth named export` rule are the `A116` pass's readings, the operative figures being ONE named export, `storeCreate` ALONE, `11 → 1` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause and TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause, and the sentence's own POINT — that `settle` is not a module-namespace name — STANDING WHOLE; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `16` cells — and it is NOT
reached through the caller's own module graph; a caller's addressable sub-surface on that handle is the three
members `§2.4` item 5 and item 7 declare, and a caller that CALLS `settle` is exercising an arm this unit does
not declare.**

**THE TWO INSTANTS, ONE ROW EACH, AND WHAT THE MEMBER DOES AT EACH.**
| Instant | When the kernel calls it | What it receives | What the entry does | What it returns |
| --- | --- | --- | --- | --- |
| **(a) BEFORE THE STORE'S WRITE VERB IS CALLED** | inside `commit`, for a write the kernel has issued, before the store's own `write` verb is reached | the record identity (the `CommitRecord` `commit` is building) | **ADOPTS that identity as a kernel-driven write in flight and WITHHOLDS the package's own delivery for it**: the package's post-verb invocation reaches NO handle of that write, so its in-window invocation set is EMPTY | `undefined` |
| **(b) AT THE PASS'S TERMINAL ARM** | inside `runAttempt`, after the last constraint of the attempt has been evaluated and before `runAttempt` returns to the calling process | the SAME record identity (the one whose `pending` member carries the residue) | **DELIVERS THE RESIDUE** — the handles that stand in the record's `pending` at that instant — by invoking, for each, the function the package's registry holds for that identity, each invocation with the triggering ADDRESS (`§2.7` item 5) | `undefined` |

**AND THE INSTANTS ARE THE KERNEL'S OWN TWO ACTS, CITED AT THEIR HOMES AND NOT RE-DECLARED HERE.** **Instant
(a): the kernel's write is `K-2`'s `commit`, whose store-side act is HELD at the write's own act before the
store's write verb is called** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2; `§2.1` item 2's
own clause that a refused `commit` *"threw BEFORE the write verb ran"*). **Instant (b): `K-3`'s `runAttempt`,
whose terminal arm is the instant `§2.7` item 7 fixes** (`docs/specs/storeroom-constraints/kernel-surface.md
§2.1` item 3 and its `CommitRecord` member clause; `A116` (D4) — the carrier unchanged). **WHOSE ACT CALLS IT IS THEREFORE
SINGLE-VALUED: THE KERNEL'S — from `commit` at instant (a) and from the pass's terminal arm at instant (b) —
and the ENTRY'S half is what this item declares.**

**AND INSTANT (b) IS WHAT MAKES `§2.7` ITEMS 6 AND 7 REACHABLE AT ALL.** **Item 6's ordering law — the
constraints first, the other listeners only once every constraint has passed, and the discard on a constraint
failure — and item 7's delivery instant NEED THIS CHANNEL TO BE IMPLEMENTABLE: the package CANNOT separate a
constraint-handle from a listener-handle at its own boundary, because that knowledge is the kernel's own
pair-keyed registry and is readable through none of the kernel's five items** (`§2.7` item 8's own finding;
`docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4). **SO THIS ITEM MOVES NO RULE OF ITEM 6 OR ITEM
7 AND IS NOT A SECOND HOME FOR ONE: it declares THE CHANNEL through which those items' instant and residue are
delivered, and item 7 (a)–(c) remain the ONE declaration of WHAT the delivery iterates, HOW a handle maps back
to its registration and WHAT an empty residue answers.**

**(a) THE DOMAIN, AND EVERY VALUE OUTSIDE IT WITH ITS DECLARED ANSWER.** **THE DOMAIN IS ONE VALUE: an object
identity this instance has ADOPTED as a record — the identity the kernel passed to this member's FIRST call on
this instance, which is the identity `commit` returned for the write in flight.** **THE ADOPTION HAPPENS AT THE FIRST CALL AND IS NOT REQUIRED BEFORE IT — that call IS the adoption — so an identity is IN-DOMAIN FROM THE FIRST CALL ON IT, and A FIRST CALL IS NEVER REFUSED: no class test and no marker test can refuse one, because the adoption is what that call performs.** **AND THE CALLER WHOSE CALL IT IS MAKES NO DIFFERENCE HERE, STATED SO THE `TypeError` BELOW IS READ AS THE SUBJECT IT HAS: which caller's first call landed on a given identity is NOT OBSERVABLE HERE, so AN IDENTITY IS NOT REFUSED FOR NEVER HAVING BEEN ADOPTED, `parameter-semantics.md §2.19`'s domain cell and this cell being ONE law.** **⟶ AND ONE SENTENCE OF THIS PARAGRAPH IS RE-SPELLED, 2026-10-15, AT ITS OWN BYTE, BECAUSE IT NAMED A TEST THE BOUNDARY DOES NOT WRITE: *"A FIRST CALL IS NEVER REFUSED: no class test and no marker test can refuse one, because the adoption is what that call performs"* reads from this date *"NO IDENTITY IS REFUSED AT THIS POSITION ON EITHER OF TWO GROUNDS: NOT FOR ITS ABSENCE OF ADOPTION HISTORY — the adoption IS what that first call performs, and a first call is the only route that can perform it — AND NOT BY ANY MARKER TEST, since no marker is read here at all. WHAT IS REFUSED HERE IS AN OBJECT POSITION THE BOUNDARY CANNOT READ AS A RECORD — refused by the CLASS TEST clause (g) below states, and refused on that position's OWN CLASS and NEVER on an identity's history."* THE DISTINCTION THE SPENT SENTENCE COLLAPSED IS THE ONE CLAUSE (g) RESTORES, and no other byte of this paragraph moves.**
**EVERY OTHER FORM IS OUTSIDE
THE DOMAIN AND IS ANSWERED WITH THE ONE FORM THE PACKAGE'S OWN BOUNDARY DECLARES FOR IT, AND THE GROUND OF EVERY ROW OF THE TABLE IS A CLASS AND NEVER AN IDENTITY'S ADOPTION HISTORY: every row is decided by the CLASS TEST clause (g) below states, and the narrower refusal of a never-handed identity that the class test admits stands as the class clause (g) below DECIDES BY ADMISSION and does not refuse — ITS READING RE-SPELLED 2026-10-16, THE `OPEN` IT ONCE RECORDED BEING CLOSED THERE**

| The value at the record position | Outside the domain, and the answer |
| --- | --- |
| ABSENT — no argument at all — and `undefined` | **`TypeError`** |
| `null` | **`TypeError`** |
| a primitive (`string` · `number` · `bigint` · `boolean` · `symbol`) | **`TypeError`** |
| a `function` | **`TypeError`** |
| a `Proxy` value | **`TypeError`** |
| any OTHER object identity — INCLUDING another instance's record AND the plain object that carries no `pending` member — ALL of them refused BY THE ONE CLASS TEST CLAUSE (g) BELOW STATES, and NEVER by an identity's adoption history. **A narrower refusal — *"an identity this instance was never handed by the KERNEL"* as SUCH — IS NOT DECLARED HERE, AND FROM 2026-10-16 IT IS NOT DECLARED ANYWHERE: clause (g) item 2's semantics row was `OPEN` and is now closed BY ADMISSION, so such a value IS ADMITTED AND PROCEEDS by the architect's ruling `A: docs/decisions.md` · `A120` (1); the foreign or unresolvable residue it carries is the CALLER'S OWN ERROR surfacing at a LATER LAYER and is NO STATE OF THIS POSITION** | **`TypeError`** |

**⟶ ADDED 2026-10-15 — THE GROUND OF EACH REFUSAL ON THIS TABLE, DECLARED ONCE SO THE GATE-4 AUDIT'S `P-TP-7` CELL CAN DISCRIMINATE WHICH BRANCH REFUSED (`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — item 9's opening clause, its table, items (a)–(d), (f) and (g) — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION: it re-spells no rule, adds no row, no member and no code, and moves no count of this part.**
**(i) THE CLASS TEST OF CLAUSE (g) ITEM 1 IS TAKEN ON THE VALUE AS IT STANDS, AND IT IS A TEST OVER MEMBER PRESENCE: where the position CARRIES a `pending` member whose value is present and not `undefined`, THE VALUE IS IN DOMAIN — no refusal branch is reached, the position is adopted by its first call, and its `pending` member's CONTENTS are never read here.**
**(ii) WHERE THAT FIRST TEST FAILS, THE REFUSAL'S OWN GROUND IS SINGLE-VALUED PER CLASS: a value carrying NO `pending` member (the object `{}`, and any object whose `pending` is absent or `undefined`) is refused BY ABSENCE OF THAT MEMBER — this is the row above; and AN ARRAY and A `Proxy` ARE REFUSED ON THEIR CLASS AND BEFORE ANY MEMBER IS READ FROM THEM, which is clause (b)'s own declared order.**
**(iii) THE TWO ARE DISCRIMINABLE BY A DRIVE, WHICH IS WHAT THIS CLAUSE OWES: a `Proxy` carrying a `pending` member is REFUSED (its ground is the class and never the member's absence), while the same `pending` member on a plain object is IN DOMAIN — so the observed answer alone separates the two branches, and a drive asserts the branch by CONSTRUCTING the pair and not by reading the refusal's message** (`docs/defects.md`'s `DEF-2026-10-15-Z`'s `P-TP-7` cell and `DEF-2026-10-15-AA`'s carried `F5`; `bindings/js/index.mjs:1524` — **READ**, 2026-10-15: *"A `Proxy` IS OUTSIDE THE POSITION'S DOMAIN … and is refused BEFORE a member is read from it"*).
**(iv) AND THE ARITY READING THIS PART'S `§2.2` NOW DECLARES BEARS ON THIS ITEM IN NO RESPECT: the position refused for its ARGUMENT COUNT (`undefined` supplied at the fifth position) is refused BEFORE this table is reached and by a different branch — this item's table has NO row for an argument count and gains none** (`§2.2` clause 4 as added 2026-10-15; `docs/specs/storeroom-js/parameter-semantics.md §2.20`). **AND THE ONE CELL THAT IS RE-SPELLED RATHER THAN MERELY SCOPED IS NAMED HERE, AT THE TABLE IT SITS BESIDE: the table row *"ABSENT — no argument at all — and `undefined`"* is read AS PRINTED of THIS MEMBER'S OWN record position — `settle(record)`, whose argument is REQUIRED and whose domain is one value — and is READ THROUGH `docs/specs/storeroom-js/parameter-semantics.md §2.20` AT THE `write` VERB'S FIFTH POSITION, where `undefined` SUPPLIED is refused by the ARITY GATE and NOT by this table, and where ABSENCE IS IN DOMAIN** (this part's `§2.2` clause 4; `docs/defects.md`'s `DEF-2026-10-15-AA`).

**(b) THE REFUSAL'S OWN CONSEQUENCES, STATED SO THEY ARE NOT READ AS A STORE EFFECT.** **A refused argument
THROWS and CHANGES NOTHING: no store verb is called, no node is minted, no journal entry is appended, no
registry entry is written and no adoption marker is set.** **The form is the registration site's own — the
`TypeError` `§2.4` item 5 (d) declares, AT THIS CELL'S OWN BOUNDARY RE-SPELLED SO ONE VERDICT FOLLOWS: the error
class is `TypeError` (an instance of it, and of nothing else), its `status` member MUST BE ABSENT — the store's
`{status, message}` form is NOT what this site answers, and a `status` printed here is a finding and not this
site's form — and a STRING `message` member is REQUIRED and NOT FORBIDDEN: `§2.4` item 5 (d)'s *"NO `message`
member"* is read AT THIS CELL as *"not the store's `{status, message}` form"* and NEVER as a prohibition of the
refusal's own `TypeError` message, its content being undeclared here** — **and the class decision comes FIRST, on the value as it is, exactly as
that site's order declares it** (`§2.4` item 5 (a)'s step list and its order walk; `crossing.md §1.7`).

**(c) A TERMINAL ARM WHOSE RESIDUE CARRIES NO REGISTERED FUNCTION IS A SILENT NO-OP.** **An identity standing
in the residue with NO function registered for it invokes NOTHING and reports NOTHING — no code, no warning,
no log — which is `§2.4` rule 1's own declared observable, applied at this instant and NOT widened by it.** **A
drive asserts it as a count: zero invocations of that identity's slot, no throw, and this member's return
still `undefined`.**

**(d) A TERMINAL ARM REACHED ON A FAILING WRITE DELIVERS ZERO.** **Where the pass's terminal arm is reached on
a write that FAILED on constraints, the residue is EMPTY — those handles left `pending` by the DISCARD and by
nothing else — so the delivery REACHES ZERO OF THAT WRITE'S OWN TRIGGERED HANDLES: no body of that set is
invoked, THIS MEMBER IS A NO-OP AND NOT A FAILURE, and its return is still `undefined`.** **AND THE FAIL-STATE
IS OBSERVABLE AND THIS ITEM OWES IT, because a body that ran can never be un-run: A BODY OF THAT FAILED WRITE'S
OWN TRIGGERED SET THAT RAN — at instant (a), inside the store write's window, or anywhere after it — IS A
FAILURE OF THIS ITEM AND OF `§2.7` ITEM 6 WITH IT.** **THE SET ITSELF IS UNEDITED BY THIS MEMBER: what instant
(b) reads is the residue that stands in the record's `pending` at that instant** (`§2.7` item 6; `§2.7` item 7
(d); `A114` (D1)/(D2)).

**(e) A BARE CALLER-MADE WRITE IS NOT THIS MEMBER'S SUBJECT.** **⟶ `SUPERSEDED-WHOLE` 2026-10-15 — THIS SUB-ITEM IS DEAD TEXT FROM THIS DATE AND THIS HOME CARRIES THE POINTER.** **ITS SUBJECT IS REMOVED BY `RCA-9` (`docs/specs/storeroom-native-proposal-review.md §18.1`, ruled `SETTLED` at that record's `§22.1`): EVERY WRITE, WITH OR WITHOUT A SUPPLIED `commit`, OPENS OR JOINS A COMMIT AND PROCEEDS THROUGH THE FLOW, SO NO WRITE IS A *"BARE CALLER-MADE WRITE"* AND NO DELIVERY INSTANT IS ITEM 8's.** **ITS READERS ARE RE-POINTED, ONE BY ONE, TO `docs/specs/storeroom-js/surface.md §2.11` — THE ONE HOME OF THE OPERATIVE RULE — and that reader list is `docs/specs/storeroom-native-proposal-review.md §19.5` `Q7`'s own.** **A DRIVE THAT ASSERTS A DELIVERY INSTANT READ OFF THE SENTENCES BELOW IS ASSERTING A CLAUSE THIS RULING REMOVED; the bytes below stand as the record of the clause that WAS.** **A write the caller made through the store's
own write verb and no `commit` produces no `CommitRecord` — so no record identity exists for the kernel to
pass, this member is NEVER CALLED for that write, and its delivery instant is item 8's unchanged post-verb
instant: the package
invokes the registered bodies for the returned handles after the store call has completed and the record has
been copied out.** **THIS ITEM MOVES NEITHER THAT INSTANT NOR ITS DECLARED HOLE** (`§2.7` item 8), AND IT OWES NO DELIVERY ITSELF: where such a write's seam is never called, the bodies run at `§2.7` item 2's post-store-call instant and item 8's law, never at this member's two. **A delivery here that withheld or doubled a bare write's bodies would be a FAILURE of this item AND of `§2.7` item 8.**

**(g) THE CLASS TEST, AND THE ONE OUT-OF-DOMAIN ROW THAT HAS NO DETECTION GROUND — LANDED 2026-10-15 BY THE `A116` DOCUMENTATION-REVIEW REMAND (`role_spec_writer`), SO THAT A BLIND DRIVER DERIVES EXACTLY ONE VERDICT FROM THIS ITEM'S TABLE.** **THIS CLAUSE RE-SPELLS NO RULE OF (a)–(e) AND MOVES NO COUNT OF THIS ITEM OR OF ANY PART: it narrows the one row of (a)'s table whose discriminator the boundary does not have, declares the discriminator the boundary DOES have, and records the wider class as a semantics row its own item `2` CARRIES, WHICH IS NOW CLOSED BY ADMISSION AT THIS ITEM'S DATED RULING OF 2026-10-16 BELOW rather than closed by invention.**
1. **THE DISCRIMINATOR THE ENTRY MAY READ, STATED AS AN OBSERVABLE A DRIVER CAN CONSTRUCT: AN OBJECT POSITION IS A RECORD POSITION ONLY WHERE IT CARRIES A `pending` MEMBER — a member present, and not the value `undefined` — and EVERY OTHER OBJECT IDENTITY IS REFUSED BY THAT CLASS TEST ALONE.** **THE TEST IS A NECESSARY CONDITION AND NOT A PROOF OF ORIGIN: it refuses what is NOT a record position, and what it admits it admits AS A RECORD POSITION — which is why a plain object carrying `pending` is ADOPTED by its first call (`A116` (D1); `PAR-JS-19`'s *"a caller's first call with an identity is the lawful adoption route"*) while a plain object that carries no `pending` member is refused, and why NO identity is refused on its history.** **`pending` is not a test this unit mints: it is the FOURTH DECLARED MEMBER OF THE KERNEL'S OWN RECORD IDENTITY, DECLARED AT `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 and unchanged (`A116` (D4)), AND THE MEMBER BY WHICH THE KERNEL HANDS THIS ENTRY THE RESIDUE IT DELIVERS; the entry reads its PRESENCE and never its contents at this position, and no marker, no ledger and no adoption history is read there** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2; `docs/specs/storeroom-js/surface.md §2.4` item 9 (a)'s table row, whose received value is *"the `CommitRecord` `commit` is building"*). **A DRIVE CONSTRUCTS IT AS: (i) the object `{}` — refused; (ii) any object whose `pending` member is ABSENT or `undefined` — refused; (iii) an object carrying `pending` — admitted by this class test, refused by it for nothing, and adopted as a first call.** **AND THE REFUSAL IS THE CLASS TEST'S AND NEVER AN IDENTITY'S HISTORY, which is what makes (a)'s *"AN IDENTITY IS NOT REFUSED FOR NEVER HAVING BEEN ADOPTED"* TRUE AND THIS ROW REACHABLE AT ONCE.**
2. **THE OPEN SEMANTICS ROW THIS CLAUSE RECORDS, WITH ITS OWNER AND ITS OWN REVISIT CONDITION, BECAUSE THE CLAUSE SET DOES NOT DECIDE IT.** **WHETHER THE BOUNDARY MAY REFUSE *"AN IDENTITY THIS INSTANCE WAS NEVER HANDED BY THE KERNEL"* AS SUCH IS OPEN.** **IT IS NOT DECIDED HERE, IN THREE NAMED GROUNDS: (i) the two instants this unit declares hand the member a record identity the KERNEL ISSUED, and this unit's clauses say nothing about what the entry may read off it to tell a kernel-issued identity from a caller-made one — the two print the same key set at this boundary** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — the record's `4` members, whose member set this unit CITES and does not widen; `bindings/js/test/constraint-kernel-deltamodel.test.mjs`'s own recorded finding, read at its bytes and not adopted as authority); **(ii) an identity test would be a NEW CROSS-BOUNDARY RULE, AND IT IS THE ARCHITECT'S TO MAKE — THIS CLAUSE INVENTS NONE: a rule the boundary can evaluate over an identity's ORIGIN would require the KERNEL's record to be identifiable at the boundary (a mark, a member or a provenance fact the kernel writes), and this unit may not mint a kernel member, a kernel flag or a kernel read to carry one** (`§2.4` item 9's opening clause — this item *"mints NO kernel item (the kernel's extent stays FIVE)"*; `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2's `CommitRecord`, whose FOUR-member set stands); **(iii) the row as it was printed is answerable by NO drive a TestWriter can write, because a caller-made object that carries the four record members and a kernel-issued one are the SAME value at this position — THE CLASS TEST SEES ONE CLASS AND CANNOT SEPARATE THE TWO — so the row's `TypeError` was unreachable AS A CLASS OF ITS OWN while (a)'s adopted domain stands, and a drive that refuses either object refuses it on the class and not on the row.** **OWNER: THE ARCHITECT. POSITIVE REVISIT CONDITION: a ruling recorded as an ACTIVE `docs/decisions.md` row that either (α) declares the kernel's record identifiable at the boundary and names the member or mark that carries the identification, followed by a bounded amendment of `docs/specs/storeroom-js/` and of the kernel's own part, or (β) narrows the row to the class test of item 1 above as this clause has — whereupon this row is removed by the clause that rules.**
3. **WHAT THIS CLAUSE DOES NOT MOVE, PRINTED SO ITS OWN NARROWING IS NOT READ AS A WIDENING:** **item 9 (a)'s domain and its two instants, the four instants' rows (a) and (b), item 9 (c)–(e), `§2.7` items 6–8 and `§2.4` item 8 (c) STAND EXACTLY AS PRINTED AND ARE NOT TOUCHED BY THIS CLAUSE — READ WITH ONE CORRECTION OF 2026-10-15 AT ITS OWN SITE: *"`§2.4` item 8 (c)"* reads from that date as THAT CLAUSE AS RE-SCOPED TO ITS REGISTRATION SUBJECT AT THE ARCHITECT'S CORRECTION (its derived non-delivery WITHDRAWN BY NAME; the app's registration at a pair-adopted address IS OWED ITS FIRING AFTER THE PASS, `§2.7` item 6), so the phrase above is a NO-TOUCH declaration over the re-scoped clause and never a reading that item 8 (c) governs any firing.** **THE INSTANCE'S MEMBER SET STAYS `{ register, on, off, settle }`, the seam still takes EXACTLY ONE argument and still returns `undefined` with no second return shape, the `PAR-JS` set's `19` IS READ THROUGH THE RE-SPELLING AT `parameter-semantics.md §1` AND `§2.20`–`§2.21` — THE OPERATIVE COUNT IS `21` NO LONGER — **THAT LABEL IS WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `21` being the gate-2 close-out pass's 2026-10-15 reading and the OPERATIVE count being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — `PAR-JS-19` UNMOVED AND `PAR-JS-20` MINTED 2026-10-15 AND `PAR-JS-21` MINTED THE SAME DATE AT `§2.21` — the register keeps its `8` rows, the kernel's extent stays FIVE and the store's namespace stays CLOSED at `8` verbs. AND THE POSITION THIS CLAUSE'S TEST IS TAKEN AT IS THE ONE THE MEMBER DECLARES — THE FOUR-MEMBER OBJECT `storeCreate(cfg)` RETURNS, whose `settle(record)` slot is taken by the record this test admits — so the published typed surface clause (e) ABOVE and this clause read together and neither is a second declaration of the other.** **AND THE BUILD'S OWN PREMISE IS RE-SPELLED WITH THIS CLAUSE RATHER THAN LEFT FALSE: the comment at the entry's own seam states that an identity never adopted *"carries no `pending` member and no ledger entry, and is refused here … with the registration site's own `TypeError`"* — the SECOND half of that sentence is the reading of this clause and the FIRST half states the discriminator the build writes, so the operative discriminator is the CLASS TEST of item 1 and the build's own comment is read THROUGH it** (`[A2 docs/decisions.md · `A116` (D1) — the narrow lift and the seam's declared arm; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — the record's fourth member, cited and unmoved; A3 docs/specs/storeroom-js/parameter-semantics.md §2.19 — the one-law domain cell | state or fail-state declaration]`).

**AND WHY THIS CLAUSE BEARS `(g)` AND STANDS BEFORE `(f)`, STATED SO THE ORDER IS NOT READ AS A DEFECT: `(f)` — THE PUBLISHED TYPED SURFACE — IS AN OPERATIVE CLAUSE THE `A116` PASS LANDED AND LATER PASSES ALREADY CITE, so renumbering it would re-spell a published label; a NEW clause takes the NEXT FREE LETTER OF THIS ITEM AND IS PLACED WHERE THE CLAUSE IT NARROWS IS READ — beside `(a)`'s table and the grounds `(b)`–`(e)` fix — rather than appended at the item's foot. NO CLAUSE IS RENUMBERED, NO CLAUSE IS MOVED AND NO BYTE OF `(f)` IS TOUCHED.**

**⟶ AND WHAT ITEM `2` CARRIED ABOVE IS RECONCILED TO THE RULING THAT CLOSED IT, SAID IN ONE CLAUSE SO NO READER MEETS TWO VERDICTS OF ONE CLASS (`role_spec_writer`, 2026-10-16; `A: docs/decisions.md` · `A120` (1)): ITEM `2`'s *"THE OPEN SEMANTICS ROW THIS CLAUSE RECORDS"* AND ITS *"IS OPEN"* VERDICT ARE SUPERSEDED BY THIS CLAUSE'S OWN DATED RE-SPELLING AT ITEM `2` — THE POSITION `ADMITS` ANY VALUE CARRYING A `pending` MEMBER — AND ITS THREE NAMED GROUNDS, ITS `OWNER: THE ARCHITECT` AND ITS POSITIVE REVISIT CONDITION ARE DISCHARGED BY THAT RULING RATHER THAN WITHDRAWN: the grounds stand as the record of why the row as printed was answerable by no drive, and the ruling took the other arm of the question they raised.** **NOTHING ELSE OF THIS ITEM MOVES, AND NO ROW OF THIS DIRECTORY IS LEFT OPEN BY IT: the load-side predicate's own spelling — the one row the gate-5 blind set still printed as `NOT DRIVABLE BLIND` — is DECLARED at its one home, `docs/specs/storeroom-native/contract.md §7.2` item 1 (`ADDED 2026-10-16`), which takes the ADDRESS-PRESENCE reading and DECIDES the differing state: a loaded key no supplied pair names does NOT refuse the boot, the instance returning; `A: docs/decisions.md` · `A119` settled that predicate's REACH and item `1` its SPELLING.**

**⟶ THE OPEN ROW IS CARRIED, NOT CLOSED, AND ITS REVISIT CONDITION IS TRACKED HERE — STATED 2026-10-16 (`role_spec_writer`) BECAUSE THE GATE-5 BLIND RUN OF THE FILE-TIER-SAVE UNIT READ THIS ROW AND COULD NEITHER DRIVE IT NOR SCORE IT (`bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-07.11`, `NOT DRIVABLE BLIND`, and its `§3` item `1`).** **ITEM `9` `(g)` ITEM `2`'s WIDER CLASS — the object carrying `pending` that this instance was never handed by the kernel — REMAINS OPEN AND IS NEITHER NARROWED NOR CLOSED BY THIS CLAUSE: the boundary's class test of item `9` `(g)` item `1` reads the MEMBER and never the member's ORIGIN, so NO STATE OF THIS POSITION SEPARATES A KERNEL-ISSUED RECORD FROM A CALLER-MADE ONE AND THE ROW HAS NO OBSERVABLE A DRIVE CAN CONSTRUCT.** **ITS OWNER IS THE ARCHITECT AND ITS POSITIVE REVISIT CONDITION IS THE ONE ALREADY DECLARED AT ITEM `2` — a ruling recorded as an ACTIVE `docs/decisions.md` row on whether the boundary may refuse an identity this instance was never handed by the kernel, followed by a bounded amendment of this part.** **AND WHAT THIS CLAUSE OWES A TESTWRITER, IN ONE LINE: NO DRIVE MAY ASSERT THIS ROW — neither a refusal nor an admission of such an identity is declared by any clause of this unit, and a cell driving it answers a value the specification does not fix.** **IT MOVES NO DOMAIN, NO OUTSIDE VALUE, NO ROW OF `(a)`'s TABLE, NO COUNT OF THIS ITEM AND NO OTHER OPEN ROW** (`§2.4` item `9` `(g)` items `1`–`3`, unmoved).

**⟶ THE WIDER CLASS IS ADMITTED — THE ARCHITECT'S RULING OF 2026-10-16 RE-SPELLS THIS ITEM'S `OPEN` ROW INTO THE OPERATIVE LAW, AND `ADMISSION IS THE LAW AT THE FIFTH POSITION` (`role_spec_writer`; `A: docs/decisions.md` · `A120` (1), 2026-10-16, `ACTIVE`).** **THE SENTENCE THIS CLAUSE SUPERSEDES IS THIS ITEM'S OWN, NAMED BY ITS WORDS AND STANDING BYTE-FOR-BYTE ABOVE: *"THE OPEN SEMANTICS ROW THIS CLAUSE RECORDS, WITH ITS OWNER AND ITS OWN REVISIT CONDITION"* AND, WITH IT, *"WHETHER THE BOUNDARY MAY REFUSE *'AN IDENTITY THIS INSTANCE WAS NEVER HANDED BY THE KERNEL'* AS SUCH IS OPEN."*** **THE OPERATIVE LAW, DECLARED FROM THIS DATE: `THE FIFTH POSITION ADMITS ANY VALUE CARRYING A `pending` MEMBER.`** **THE CLASS TEST ASKS ONLY WHETHER A `pending` MEMBER IS PRESENT, so an object carrying one is IN DOMAIN, the write PROCEEDS, and NO IDENTITY OF THIS POSITION IS EVER REFUSED ON ITS ORIGIN — the class `ADMITS` by this item `(g)` item `1` and NOTHING ELSE IS ASKED OF IT.** **AND AN UNRESOLVABLE OR FOREIGN RESIDUE IS THE CALLER'S OWN ERROR SURFACING LATER: where the value carries `pending` but the entries standing in it are ANOTHER INSTANCE'S HANDLES, or ARE NOT HANDLES AT ALL, THE POSITION STILL PROCEEDS — the residue is that caller's own to own, and what it answers belongs to a LATER LAYER's own declared law and to no clause of this item.** **THE MEASUREMENT THE RULING STANDS ON IS LIVE: A CONTEXT CARRYING ANOTHER INSTANCE'S HANDLE PROCEEDS, AND AN OBJECT CARRYING A MEMBER THAT IS NOT A HANDLE AT ALL PROCEEDS, EACH BECAUSE THE POSITION'S CLASS TEST ASKS ONLY WHETHER A `pending` MEMBER IS PRESENT** (`A: docs/decisions.md` · `A120` (1), whose measured ground this clause carries). **THE CELLS THAT NOW PIN IT, NAMED: `bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-07` — its EIGHT outside classes, its `Proxy` half, AND ITS *"A PLAIN `{pending:[]}` PROCEEDING"* half — read beside the same file's `FTS-04` cells for the `Object.keys(caught)` census that stays green** (`A: docs/decisions.md` · `A120` (1)'s own *"Tests that pin them"* sentence; `FTS-07.9`/`FTS-07.10`, `FTS-04.2`/`FTS-06.2`/`FTS-06.3`), **AND THE SUITE'S OWN CELLS OF THE SAME CLASS, NAMED SO NO DRIVE READS THE GREEN SET AS THE ONLY PIN: `bindings/js/test/file-tier-save.test.mjs`'s `fts_S_ARG5_the_object_and_any_object_whose_pending_is_absent_or_undefined_is_refused` (the presence discriminator) read with `fts_S_ARG5_a_proxy_value_is_refused_before_a_member_is_read_from_it` and `fts_S_ARG5_the_declared_position_is_the_fifth_and_the_last_and_it_is_optional`.** **AND `commitPositionRefusal` IS UNCHANGED, SAID PLAINLY AND IN ONE LINE: NO BYTE OF THE BOUNDARY'S OWN CLASS TEST MOVES WITH THIS RULING — the position reads `Object.hasOwn(commit, 'pending') && pending !== undefined`, refuses `Proxy` and array carriers before any member read, and admits every carrier of `pending`; THIS CLAUSE RE-SPELLS THE SEMANTICS ROW AND MINTS NO RULE THE BOUNDARY DID NOT ALREADY TAKE** (`bindings/js/index.mjs:1532–1551`, the entry's own bytes; `A: docs/decisions.md` · `A120` (1) — *"`commitPositionRefusal` is UNCHANGED"*). **AND THE BAR THIS ITEM ONCE CARRIED IS LIFTED: THE SENTENCE *"NO DRIVE MAY ASSERT THIS ROW"* IS WITHDRAWN BY NAME, BECAUSE A DRIVE MAY NOW ASSERT THE ADMISSION OF ANY VALUE CARRYING `pending` — and the `parks` of the greens layer fall with it, THAT PARK BEING THE GREENS AUTHOR'S TO LIFT AND NOT THIS CLAUSE'S TO LIFT: THIS CLAUSE STATES THE LAW AND NAMES THE PARK (`bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-07.11`, its `NOT DRIVABLE BLIND` verdict and its `§3` item `1`; `A: docs/decisions.md` · `A120` (1) — *"the greens' `FTS-07.11` park lifts with it"*).** **IT MOVES NO DOMAIN, NO OUTSIDE VALUE, NO ROW OF `(a)`'s TABLE, NO COUNT OF THIS ITEM AND NO OTHER ROW OF IT: the class is CLOSED by admission and no row of `(a)` is re-worded** (`§2.4` item `9` `(g)` items `1`–`3`; `§2.20`'s outside-value row, unmoved).

**THE THREE READ-BESIDE CHECKS, ONE LINE EACH, SO THE PASS THAT AUTHORED THIS ITEM RECORDS WHAT IT READ:
(i) `§2.7` item 6's discard is the DISCARD OF THE BODIES, and this member is the first act at which that
discard can be made real rather than a bookkeeping removal of a set whose bodies already ran; (ii) `§2.4` item
8's READING (K) — the home entry and the registry's function slot as TWO HOLDERS over DIFFERENT members — is
what this member's two instants act on and is not touched; and (iii) the kernel's own holder clause, READ AT
`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1, keeps its word *"holder"* meaning the STORE'S
HOME ENTRY and is unmoved by a member that reaches the PACKAGE'S registry.**

**AND NO CLAUSE OF `§2.7` ITEMS 6–8, OF `§2.4` ITEM 8, OR OF THE KERNEL'S HOLDER CLAUSE IS CONTRADICTED HERE.** **(f) WHAT THE PUBLISHED TYPED SURFACE MUST SAY — STATED HERE SO THE IMPLEMENTER FOLLOWS IT, THIS DOCUMENT AUTHORING NO `index.d.ts` BYTE.** **The published declaration file is the authoring file `bindings/js/index.d.ts`, the IMPLEMENTER'S wall and not this pass's, and it must carry the instance object `storeCreate(cfg)` returns with FOUR own members — `register(handle, listener) -> undefined`, `on(address, listener) -> handle`, `off(handle) -> undefined` and `settle(record) -> undefined` — each with its argument types and its return, and NOTHING ELSE: no fifth member, no named export added for `settle`, and no `pending`-shaped record type this unit does not declare.** **AND THE PUBLISHED `files` ALLOWLIST IS UNMOVED BY THIS ADDITION: the three published files already ship — the entry, the README and the authored `index.d.ts` — so this item adds no fourth published path and moves no cell of that allowlist** **⟶ AND THE FIGURE OF CLAUSE (f) IS SUPERSEDED AND IS READ THROUGH AT CLAUSE (f)'s OWN BYTES, 2026-10-16 (`RCA-8(g)`: clause (f) stands BYTE-FOR-BYTE above and THIS clause is its mark — the `RCA-8(g)` move-out pointer below is the OTHER half and does not mark it): *"FOUR own members"* IS THE `A116` PASS'S READING, and the operative duty is TWELVE own members, `10 + 1 + 1 = 12` ✓, plus the ONE named export `storeCreate`, declared at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of that date and at this part's `§2.1` `A127` clause, so a declaration file that still reads four, five or seven own members — or eight, nine or eleven verbs — is a FINDING; the cell is carried in `docs/specs/storeroom-js/surface.md §2.12` item 5's operative cell inventory, whose count is `16` cells** (`[A2 docs/decisions.md · `A116` (D3) — the published `files` allowlist UNMOVED; A3 docs/specs/storeroom-publish/contract.md §2.1` and its `PUB-DD-1` row — the allowlist's own clause, cited and not restated | requirement]`).

**⟶ AMENDED 2026-10-16 — THE INSTANCE'S MEMBER SET MOVES FROM FOUR OWN MEMBERS TO FIVE, AND THE PUBLISHED
TYPED SURFACE'S OWN DUTY MOVES WITH IT (`role_spec_writer`; `docs/decisions.md` · `A123`, 2026-10-16; read
with the `exports` half of `A122` and with `A121`'s `MINOR` class).** **THE CELL ABOVE STANDS BYTE-FOR-BYTE
AT ITS OWN BYTES — *"FOUR own members — `register(handle, listener) -> undefined`, `on(address, listener) ->
handle`, `off(handle) -> undefined` and `settle(record) -> undefined` … no fifth member, no named export
added for `settle`"* — AND IS READ THROUGH THIS CLAUSE, WHICH IS THE OPERATIVE STATEMENT OF THE SET FROM
THIS DATE.**
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: this clause's `A123`-era live region's AS-FILED BYTES have LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §14`, whose source path and `§` are named there and whose own header names `§2.4` ITEM 9 (f) AS THE SOURCE THEY LEFT; NO BYTE OF THEM IS RE-EMITTED HERE.** **WHAT LEFT, NAMED AT ITS OWN WORDS SO THE POINTER RESOLVES: the two sentences that printed the superseded member set — *"THE OPERATIVE DECLARED MEMBER SET IS `{ register, on, off, settle, manageConstraints }` — FIVE OWN MEMBERS, `4 + 1 = 5`"* — and the whole `bindings/js/index.d.ts` duty sentence that ordered `manageConstraints` AS A NAMED EXPORT, THE FIVE-MEMBER OBJECT AND THE NINTH NAMED EXPORT, WITH ITS *"a declaration file that still reads four own members or eight verbs after this date is a FINDING"* clause.** **THEIR DISPOSITION IS THE CLAUSE IMMEDIATELY BELOW THIS POINTER (`§2.4` item 9 (f)'s `A127` clause of this date), which is the operative statement of the member set and of the types duty from 2026-10-16.**

**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16 (THIS PASS): THE `A126`-ERA CLAUSE THAT STOOD AT THIS SITE — its `RCA-8(d)` ANNOTATE-BESIDE spelling, its *"THE OPERATIVE DECLARED MEMBER SET IS `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }` — SEVEN OWN MEMBERS, `4 + 3 = 7`"* and its whole supersession paragraph — HAS LEFT THIS FILE and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §18`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **THE MOVE IS TAKEN BECAUSE THAT SPELLING WAS THE RETIRED `RCA-8(d)` INSTRUMENT USED AS A LIVE ONE — not quoted, not dated, not a one-line pointer and not a sub-item of such a clause — WHICH FALSIFIED THIS SECTION'S OWN CLAIM AT ITS `DEF-2026-10-16-O` CLAUSE BELOW THAT *"THE RETIRED SPELLING IS NOT USED BY THIS PASS AT ANY SITE"*: from this date that claim is TRUE OF THE SITES THIS PASS OWNS, and every clause of this pass states its move in the `RCA-8(g)` form.** **THE OPERATIVE STATEMENT OF THE MEMBER SET, OF THE TEN METHODS AND OF THE `index.d.ts` DUTY IS THE `A127` CLAUSE BELOW, WHOSE SUBJECTS ARE THE TWELVE AND THE ONE (`RCA-8(g)`; `docs/decisions.md` · `A127` · `A126`, 2026-10-16; `docs/defects.md` · `DEF-2026-10-16-O`).**

**⟶ RE-DERIVED 2026-10-16 — THE OPERATIVE DECLARED MEMBER SET MOVES `7 → 12`, THE TEN STORE-REACHING NAMES BECOME METHODS, AND `register`, `on` AND `off` ARE DISPOSED OF BY NAME (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`; read with `A126` and `A116`, whose subjects it moves and whose rules it does not re-decide).** **THE OPERATIVE DECLARED MEMBER SET IS `{ read, readLiteral, write, delete, rollback, listen, unlisten, addConstraint, constraintOn, constraintOff, register, settle }` — TWELVE OWN MEMBERS, AND NOTHING ELSE: `10 + 1 + 1 = 12` ✓, the `10` being the TEN NAMES `A127` moves off the module namespace into method form, the first `1` being `register`, and the second `1` being `settle`.** **`storeCreate` IS NOT A MEMBER OF ITS OWN PRODUCT: it is the MODULE NAMESPACE'S one remaining name and the factory that returns the product** (`§2.9` item 1's `A127` clause).

**THE TEN METHODS, EACH WITH ITS ARITY, ITS POSITIONS AND ITS REFUSAL — THE ONE TABLE A DRIVE DERIVES FROM, AND THE ONE SPELLING THIS UNIT HAS FROM THIS DATE.** **The receiver is the store: every call below is written `a.<name>(…)` where `a` is the object `storeCreate(cfg)` returned, and NO POSITION OF ANY OF THE TEN IS AN INSTANCE.**

| Method | Arity | Its positions, in declared order | Its declared answer | Its refusal |
| --- | --- | --- | --- | --- |
| `a.read(address, tier?)` | `1` or `2` | `address` — `PAR-JS-5`; `tier` — `PAR-JS-6`, ZERO TO MANY, one token or an array | the assembled JS value, a leaf's literal, or the whole register (`§2.2`) | the store's own thrown `{status, message}` — `§2.5`'s single form |
| `a.readLiteral(address, tier?)` | `1` or `2` | as `read` | the SAME read narrowed: the target must be a leaf | the store's own thrown `{status, message}` |
| `a.write(address, tier, value, commit?)` | `3` or `4` | `address`; `tier` REQUIRED and SINGULAR; `value` — `PAR-JS-10`; `commit` — `PAR-JS-20`, declared LAST | `{ op, watched, triggered }` (`§2.2`) | the store's own form; a `commit` outside `§2.4` item 9 (g)'s class test is refused there |
| `a.delete(address, tier?)` | `1` or `2` | `address`; `tier` OPTIONAL and EXACTLY ONE when present — `PAR-JS-11` | `{ address, tiers, triggered }` | the store's own thrown `{status, message}` |
| `a.rollback(opId)` | `1` | `opId` — `PAR-JS-9` | `{ opId, undoneOps, restoredTo }` | the store's own thrown `{status, message}` |
| `a.listen(address)` | `1` | `address`, `AddressArg`'s domain and NOTHING MORE — a listener carries no tier qualifier (`§2.10`) | the package's opaque handle for the store's home entry | the store's own thrown form, as `§2.10` declares it |
| `a.unlisten(handle)` | `1` | `handle`, the OPAQUE form ONLY (`§2.3` item 2) | `undefined`, INCLUDING on its no-op success for any value outside the domain (`§2.3` item 4) | the store's own form, on a malformed argument's shape only |
| `a.addConstraint(pair, constraint)` | `2` | `pair` — `PAR-JS-24`, the element's KEY, `{ address, id }`; `constraint` — `PAR-JS-22`, the constraint FUNCTION | the opaque constraint identity — `PAR-JS-25` | **the thrown `TypeError` — the common refusal clause below** |
| `a.constraintOn(pair, constraint)` | `2` | as `addConstraint`; the third position is REQUIRED and is a no-op on success (`§2.12` item 3) | `undefined` | **the thrown `TypeError`** |
| `a.constraintOff(pair, constraint)` | `2` | as `constraintOn` | `undefined` | **the thrown `TypeError`** |

**THE COMMON REFUSAL FORM OF THE TEN, IN ONE CLAUSE, SO NO DRIVE ASSERTS A FORM THIS UNIT DOES NOT DECLARE.** **THE RECEIVER RULING CHANGES NO ARGUMENT'S CLASS AND NO ARGUMENT'S DOMAIN: it REMOVES ONE POSITION — `instance` — and NOTHING ELSE, so every outside value a `PAR-JS` row already declares keeps the answer it already had, at one position fewer.** **A DRIVE THEREFORE DERIVES ITS FAILURE CELLS BY TWO RULES AND NO THIRD: (i) WHERE A POSITION'S OUTSIDE VALUE IS DECLARED TO ANSWER THE STORE'S OWN CODE, THE THROWN VALUE IS `§2.5`'s `{status, message}` — exactly two members, `status` a string drawn from the store's closed `16`-member set and `message` the store's own text; (ii) WHERE A POSITION'S OUTSIDE VALUE IS DECLARED TO ANSWER THE PACKAGE'S OWN CLASS TEST, THE THROWN VALUE IS A `TypeError` CARRYING NO `status` MEMBER AND NO `message` MEMBER OF THIS UNIT'S OWN, and the call changes nothing — no store call is made, no pair is added, enabled or disabled, no journal entry is appended and no code is minted.** **RULE (ii) GOVERNS THE THREE CONSTRAINT METHODS' EVERY OUTSIDE VALUE and is the form `§2.12` item 4's replacement clause declares; rule (i) governs the seven store-reaching verbs.** **AND AN ABSENT REQUIRED POSITION IS NOT A THIRD RULE: `write`'s fifth position answers `PAR-JS-20`'s own arity law, and the store's seven verbs answer `DD-46`'s *"the package performs no arity check, no defaulting and no validation of its own"* — a missing, extra or wrong-shaped argument reaches the store's own carrier and answers the store's own code.**

**AND THE DISPOSITION OF `register`, `on` AND `off`, EACH BY NAME AND EACH WITH ITS REASON, BECAUSE THE `A126` PASS DECLARED ALL THREE AND `A127` LEAVES TWO OF THE THREE STANDING:**
1. **`register` — REMAINS, AS A METHOD, WITH ITS SIGNATURE AND ITS RETURN UNMOVED: `a.register(handle, listener) -> undefined`.** **ITS REASON IS THAT NOTHING ELSE CAN CARRY ITS SUBJECT: the store RETURNS handles and INVOKES NOTHING (`A57`), so the id→function map the package holds (`§2.4` rules 1–4 and item 6 (b)) must have a REGISTRATION SITE, and `listen`'s own declared subject — `address`, `AddressArg`'s domain and NOTHING MORE (`§2.10`) — CARRIES NO FUNCTION AND CANNOT BE WIDENED TO CARRY ONE without giving that verb a second arity, which `§2.1`'s own `(c)` clause and `DD-46` refuse.** **A caller that calls `listen` and never registers is `§2.4` rule 1's declared state: an unregistered handle fires nothing, silently.**
2. **`on` — MERGED, AND THE MERGE IS THE RECEIVER RULING'S OWN CONSEQUENCE: `on(address, listener)`'s whole subject was the two admissions of `listen` then `register`, in that fixed order and nothing else (`§2.4` item 7 (a)'s three steps), and BOTH ADMISSIONS NOW STAND AS METHODS — `a.listen(address)` and `a.register(handle, listener)` — so `on` was a SECOND SPELLING of a sequence this member set already declares.** **A SECOND SPELLING IS WHAT `A127`'s OWN WORDS REFUSE: *"Inconsistency - all store-modifying acts should operate by method, not function"*.** **SO `on` IS NOT A MEMBER AND NO CLAUSE OF THIS UNIT DECLARES ONE **OF THE PRODUCT'S DECLARED MEMBER SET** — the set being `§2.4` item 9 (f)'s `TWELVE` own members, `10 + 1 + 1 = 12` ✓, and NEITHER `on` NOR `off` a member of it; AND THE NARROWING IS THE CLAIM, NOT AN ESCAPE FROM IT: `docs/specs/storeroom-js/contract.md`'s `DD-51` does name `on` and `off` as *"the two new sites"* and declares that SEGMENT TWO of their refusals' messages IS AUTHORED BY THE BOUNDARY — a declaration ABOUT THE TWO REGISTRATION SEQUENCES AND THEIR REFUSALS AND NOT ABOUT THE PRODUCT'S MEMBER SET — so the absolute this clause printed until 2026-10-16 was FALSE AT THAT CELL and is NARROWED HERE BY THE GATE-2 FIFTH REVIEWER-LOOP PASS rather than withdrawn**; the sequence is derivable and a drive asserts it through its two members.** **THE TWO THINGS `on` CARRIED ARE NOT LOST, AND EACH IS NAMED: its ATOMICITY-BY-POSITION (`A76`/`A81` — the class decision first, then admit, so a refused `address` or `listener` leaves no store-side home entry, no registry entry, no node minted and no journal entry appended) is `§2.4` item 7 (a)'s and stands for the pair of calls a drive performs in that order, and its declared refusal for a refused `address` or `listener` is `a.listen`'s own, at rule (i) above.**
3. **`off` — MERGED, BY THE SAME READING AND WITH ONE SENTENCE MORE: `off(handle)`'s whole subject was the store-side withdrawal plus the PACKAGE'S OWN registry removal; the withdrawal is `a.unlisten(handle)` — a declared method — while the registry entry's own standing is `§2.4` rule 4's *"`unlisten` withdraws the registration, NEVER the function"*, which is a RULE and not a call, so no member and no call is owed to it.** **SO `off` IS NOT A MEMBER AND NO CLAUSE OF THIS UNIT DECLARES ONE **OF THE PRODUCT'S DECLARED MEMBER SET** — the set being `§2.4` item 9 (f)'s `TWELVE` own members, `10 + 1 + 1 = 12` ✓; AND THE NARROWING IS THE CLAIM: `docs/specs/storeroom-js/contract.md`'s `DD-51` names `on` and `off` as *"the two new sites"* whose refusals' Segment Two the boundary authors, which is a declaration about those two registration sequences and their refusals and NOT about the member set, so the absolute this clause printed until 2026-10-16 was FALSE AT THAT CELL and is NARROWED HERE BY THE GATE-2 FIFTH REVIEWER-LOOP PASS.**

**AND WHAT THIS CLAUSE MOVES, ONCE, SAID SO IT IS NOT READ AS MORE OR LESS THAN IT IS: the `A126` pass's SEVEN-member set and the `A123` pass's FIVE-member set are SUPERSEDED as member-set figures by this clause and by no other; `register`, `on` and `off` keep their own `§2.4` item 5 and item 7 signatures, domains and arms AT THEIR OWN HOMES, where they are read through this disposition; and `settle` — `§2.4` item 9's seam, which the KERNEL calls and the entry implements at two instants — IS A MEMBER STILL, IS NOT ONE OF THE TEN, AND IS NOT A CONSUMER ROUTE.** **`A122`'s seam is unchanged by `A127`: the product's state is held privately and `settle` is the one internal member the kernel's two instants reach** (`§2.4` item 9; `§2.1`'s `A127` clause).
**WHAT `bindings/js/index.d.ts` OWES UNDER `A127`, STATED AT THE HOME THAT CARRIES THE DUTY: the published declaration file must carry the TWELVE-member product with each member's argument types and its return, AND the ONE named export `storeCreate` — so a declaration file that still reads four, five or seven own members, or eight, nine or eleven verbs, after this date is a FINDING** (`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A122` · `A57`; A3 docs/specs/storeroom-js/surface.md §2.1, §2.4 items 5–9 and §2.9 item 1's clauses of this date; A3 docs/specs/storeroom-js/parameter-semantics.md §2.20–§2.25 | numeric or census claim and declared parameter semantics]`).
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: the `A126` duty clause's AS-FILED BYTES have LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §10`, whose source path and `§` are named there; the row's operative duty is the clause immediately above this pointer.**
**AND ONE CELL THAT CANNOT STAND
BESIDE THIS ITEM AS PRINTED, RECORDED AS A FINDING AND NOT PAPERED: `§2.4` item 7 (d)'s *"the `PAR-JS` set stays
`18`"* is FALSE OF THE OPERATIVE SET, which this item's own semantics row `parameter-semantics.md §2.19`
(`PAR-JS-19`) moves to `19`, and which the `RCA-9` FILE-TIER-SAVE PASS and the GATE-2 CONSISTENCY CLOSE-OUT PASS move on to `21` — and it is closed the way this directory closes a dated figure rather than by
rewriting a settled cell: that clause carries the read-through this pass authored immediately above, naming
`parameter-semantics.md §1` and `§2.20`–`§2.21` as the operative count — **⟶ AND FROM 2026-10-16 THE READ-THROUGH NAMES THE OPERATIVE FIGURE ITSELF, NOT A SUPERSEDED RANGE (GATE-2 SEVENTH REVIEWER-LOOP PASS): that clause names `parameter-semantics.md §1`'s count-correction clause of that date, whose operative count is `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, so the `21` this sentence once took as the operative count carries no operative label either** (`[A2 docs/decisions.md · `A116` (D5) — the seam's own clause with a typed semantics row for every
declared parameter, and the re-derivations it names; A3 docs/specs/storeroom-constraints/kernel-surface.md §1`
item 2 and `§2.1` items 1–3; A3 docs/specs/storeroom-js/parameter-semantics.md §2.19 | state or fail-state
declaration]`).

### §2.5 The single failure form

**⟶ RESTORED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THIS HEADING WAS ABSENT FROM THE FILE AT THIS PASS'S OWN READ AND IS RESTORED BY A PURE INSERTION.** `RCA-8(d)` ANNOTATE-BESIDE: **no byte below is re-worded, moved or deleted — the region's own bytes (item `1` through item `5` and its clauses (a)–(g)) stand exactly as they stood, and the ONLY thing this insertion adds is the heading the region's own citations require.** **THE DEFECT IT REPAIRS, NAMED WITH ITS EVIDENCE AT OTHER FILES' OWN BYTES: `### §2.5 The single failure form` is recorded as PRESENT by two later passes' manifests — `docs/specs/storeroom-js/backup/A78-REHOMING-2026-10-11-manifest.md`'s item `4` (*"the `§2.4` firing/delivery boundary clause at post-pass `515`–`584` (bounded by `### §2.5` at `586`)"*) and `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md`'s item `5` (whose beside-line is *"`### §2.5 The single failure form`"*) — while THIS pass, reading the file for `§2.4` and `§2.6`, found `### §2.4` at the registry and `### §2.6` at the constraint pattern with NO `### §2.5` between them, so this part's `§2.5` region ran UN-HEADED from the failure-form sentence to `§2.6`.** 
**THAT IS THE `DEF-15` CLASS — *"a literal-anchor edit whose replacement did not re-emit the anchor it matched"* — recurring on a SECTION HEADING rather than on a `##` heading, and it is the reason ~thirty citations across this directory, the four trackers and the gate records had to spell `surface.md §2.5 item 5` at a section whose heading a reader could not find.** **THE ROOT CAUSE IS NOT THIS PASS'S TO ASSIGN AND THE ROW IS NOT THIS PASS'S TO FILE: a `DEF-` row for the consumed `§2.5` heading is OWED to `docs/defects.md` by the supervisor's tracker pass, with this clause as its evidence.** **AND THE CITATIONS THAT NOW RESOLVE: `surface.md §2.5`, its item `5` and its item `5`'s clauses (b)–(g) — the verbose cell, the composite message's Segment One / Segment Two split and the two new members' refusal sites — each resolve to the region this heading opens, and every citation in this directory of the bare form *"`§2.5` item 5"* remains PATH-QUALIFIED because `contract.md §2.5` item 5 is a DIFFERENT cell (`§2.5`'s foot clause, clause 4, names that ambiguity and is unmoved)** (`[A3 docs/specs/storeroom-js/backup/A78-REHOMING-2026-10-11-manifest.md` item 4 · `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` item 5 — the two records that carry the heading; A1 docs/defects.md — `DEF-15`'s class and its standing remedy | cross-reference]`). **THIS CLAUSE AND THIS HEADING ARE A PURE INSERTION: `git diff` shows them as added lines and nothing else.**

**A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY ONE SUCH
FORM:**
```
{ status: string, message: string }
```
1. **`status` is the store's own member token VERBATIM** — one of the store's closed `16` members, as a JS
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
   rejection's `status` is a member of the store's closed `16`-member set, CARRIED VERBATIM** — **minted by no
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
   those two cells to this section's form.** **⟶ AND THAT SENTENCE'S *"a later bounded amendment … re-spells those two cells to this section's form"* IS READ AT ITS OWN DATE, 2026-10-11, AND NOW STANDS BESIDE A SECOND AND LATER RE-SPELLING OF THE SAME TWO CELLS: `§2.4` item 9 (b), landed 2026-10-15 on `docs/decisions.md` · `A116` (D1), re-spells item 5 (d)'s *"NO `status` and NO `message` member"* at the ORDERING SEAM's boundary — a `TypeError` with its `status` member ABSENT and a STRING `message` member REQUIRED AND NOT FORBIDDEN. SO TWO DATED RE-SPELLINGS OF ONE PHRASE STAND, AT TWO SITES, AND THE DIVERGENCE BETWEEN THEM IS REPORTED HERE AND SETTLED BY NO CLAUSE OF THIS PASS.** **AND ONE CONSEQUENCE IS NAMED SO THE RECONCILIATION IS NOT READ
   AS A WIDENING: the `TypeError`'s declared ABSENCE OF MEMBERS was never a permission to mint a status, and a
   `status` of `TypeError` reached at the addon's own boundary is a FINDING against the store's closed set,
   because the set holds no such member** (`docs/specs/storeroom-js/contract.md §2.4` item 5 (d);
   `docs/specs/storeroom-js/parameter-semantics.md §2.12`; `DD-40`; `archive/gate4/storeroom-js-adversarial.md`
   §A · `JS-1`). **⟶ AND THIS CLAUSE (g)'s `{status, message}` READING STANDS UNMOVED BY THE LATER RE-SPELLING, 2026-10-15: `§2.4` item 9 (b), landed on `docs/decisions.md` · `A116` (D1), re-spells item 5 (d)'s *"NO `message` member"* at the ORDERING SEAM's OWN BOUNDARY — a `TypeError` whose `status` is ABSENT and whose STRING `message` is REQUIRED AND NOT FORBIDDEN — and THE TWO CELLS IT REACHES ARE THEREFORE UNDER TWO DATED RE-SPELLINGS, AT TWO SITES, the divergence between them being REPORTED at this clause and at `§2.4` item 5 (d) and SETTLED BY NO CLAUSE OF THIS PASS** (`[A2 docs/decisions.md · `A116` (D1); A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (b) — the seam's clause, read beside this section and not against it | requirement]`). (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection travels inside
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
3. **THE STATUS IS PART OF NEITHER PART'S TEXT AND IS UNMOVED: a member of the store's closed `16`-member
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
  `status` IS SEGMENT NEITHER OF AND IS UNMOVED: a member of the store's closed `16`-member set, carried
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

### §2.6 The constraint/repair pattern — MOVED OUT 2026-10-16; the operative law is `§2.12`

**THIS SECTION'S AS-FILED TEXT IS SUPERSEDED FOR THE WRITE PATH AND HAS MOVED OUT, BYTE-EXACTLY, TO
`docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1`; the operative law is
`docs/specs/storeroom-js/surface.md §2.12`, and the row this section is cited by is
`docs/specs/storeroom-js/parameter-semantics.md §2.18`** (`RCA-8(g)`: **move out, leave a one-line pointer,
never retain beside**; `docs/decisions.md` · `A122`, 2026-10-16).

### §2.7 Listener delivery — the window, the order and a throwing body

1. **`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN OPAQUE HANDLES**, fresh on every call, in the
   two records the store's own contract declares (`WriteResult` and `DeleteReceipt`).
2. **THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED.** **The
   invocation is SYNCHRONOUS and happens after the store call has completed and the record has been
   copied out** (**AND THE CALL WHOSE COMPLETION THIS INSTANT IS MEASURED FROM IS THE STORE CALL AND NOT
   THE PACKAGE'S OWN VERB RETURN — the addon call the package makes, whose completed-and-copied-out
   record is what the invocation reads; the package's verb has NOT yet returned to the caller at this
   instant, and the ONE observable a drive reads either way is that each body of the returned handles
   records its own finding of the record copied out and of the package's verb not yet returned, so A
   BODY THAT RAN AFTER THE PACKAGE'S VERB RETURNED TO THE CALLER HAS RUN AT AN INSTANT THIS ITEM DOES
   NOT DECLARE**; `§2.4` item 9 (e) — the bare write's own unchanged instant | declared parameter
   semantics]) (`DD-22`)**.
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

**⟶ `RCA-8(g)` ARCHIVAL MOVE, 2026-10-15: `§2.7`'s OWN DATED PASS-RECORD — the bounded `A78` re-homing pass's four-item split of the delivery items against their firing neighbours, which stood immediately above this line and was read THROUGH by `§2.7` items 1–5 — is moved BYTE-EXACTLY to `archive/spec-history/2026-10-15-n7-ordering-archival.md` `§1`, the one home that pass record now has; NO RULE MOVED: `§2.7` items 1–4 stand as printed below and above, the firing rules the record cites are the store's own at `docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) and item 14, and the recipient set's reading stands at `docs/specs/storeroom-js/surface.md §2.4`'s `CF-DUP-3` clause, which is unmoved.**

**⟶ ADDED 2026-10-15 — THE `A115` ORDERING-GATE PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING *"Proceed with recommended fix."*: THE ORDERING LAW, AND THE DELIVERY INSTANT ON A KERNEL EVALUATION SET.** **items 1–5 above stand byte-for-byte and are read THROUGH this item; THIS item re-spells no clause of theirs, adds no member, no verb and no parameter, mints no code and moves no register row — and where it and item 2's window disagree, THIS item is the operative statement for the case it names and item 2's window stands for every other case.**

**6. THE ORDERING LAW — WHAT RUNS FIRST, WHAT IS REACHED ONLY AFTER THE PASS, AND WHAT IS DISCARDED.** **For a write, the surface runs the write's TRIGGERED CONSTRAINTS FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED; on a write that fails on constraints THE OTHER LISTENERS ARE DISCARDED — not delivered, and not left pending for a later deliverer** (`[A2 docs/decisions.md · `A112`; A2 docs/decisions.md · `A114` (D1)/(D2) — *"Constraints pass flows to the listeners (which are discarded if write fails on constraints), not the write return."* | ordering claim]`). **THE TRIGGERED CONSTRAINTS' OWN LAYER IS THE KERNEL'S PASS, AND ITS HOME IS NOT THIS DOCUMENT: `K-3` runs it inside the kernel's own act, in the attempt's registry order, checking each entry off as it passes** (`[A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 and `§2.2` item 2 — the pass's two layers and the handle the kernel delivers; A3 docs/specs/storeroom-constraints/attempt-lifecycle.md §2.4 item 5 (i)–(ii) and item 8 (i) (5) | ordering claim]`). **SO THE TWO LAYERS ARE ORDERED AND NOT CONCURRENT, and a drive that finds a body of the other kind run while a constraint of the same write stands owed has found a failure of this item.**

**7. THE DELIVERY INSTANT FOR A RECORD THAT CARRIES A KERNEL EVALUATION SET — AND WHAT DECIDES WHICH BODIES ARE DELIVERED.** **WHERE THE WRITE WAS ISSUED THROUGH `commit` AND ITS ATTEMPT'S PASS IS RUN BY `runAttempt`, THE PACKAGE'S DELIVERY OF THE TRIGGERED HANDLES DOES **NOT** OCCUR INSIDE THE STORE VERB'S WINDOW: IT FOLLOWS THE PASS, AND ITS INSTANT IS THE PASS'S TERMINAL ARM — after the last constraint of that attempt has been evaluated, and before `runAttempt` returns to the calling process.** **THE DECISION IS THE ONE THE RECORD'S `pending` MEMBER ALREADY CARRIES: AN ENTRY LEAVES THAT MEMBER ONLY BY BEING CHECKED OFF AS IT PASSES, THE FAILED WRITE'S OWN RETURNED SET LEAVES IT BY THE DISCARD, AND WHAT REMAINS IS THE RESIDUE THE DELIVERY REACHES** (`[A2 docs/decisions.md · `A115` (D1)/(D2) and `A113` (D1); A2 docs/decisions.md · `A114` (D2); A2 docs/decisions.md · `A112` — the whole returned set, the check-off and the discard | state or fail-state declaration]`). **⟶ AND WHAT CARRIES AN OWED FIRING — THE ONE READING THIS ITEM IS NOW SINGLE-VALUED BY — IS RE-SPELLED 2026-10-15 ON THE ARCHITECT'S CORRECTION OF THIS DATE AND ON THE ARCHITECT'S `A117` (D5)/(D6) (`role_spec_writer`, this pass's own clause, on the same correction `§2.4` item 8 (c) is re-scoped to).** **THE CHECK-OFF'S ACT AND ITS EXTENT ARE ALREADY THE LAW AND ARE NOT RE-SPELLED: IN THE RESIDUE THE CHECK-OFF TAKES THE EVALUATED IDENTITY'S ENTRY AS IT PASSES — the same warrant, the same by-identity extent, EVERY occurrence of that identity gone and no occurrence counted as a second entry for a set the pass has passed — THE FAILED WRITE'S OWN RETURNED SET LEAVES BY THE DISCARD ON THE FAILING ARM, AND NO SIFT OF ANY SUBSET IS PERFORMED.** **WHAT THIS CLAUSE CORRECTS IS WHERE AN OWED FIRING LIVES, AND THE CORRECTION IS NAMED WITH BOTH SIDES: THE READING THAT STOOD AT THIS SENTENCE — THE RESIDUE'S ENTRIES KEYED BY THE OWED FIRING EACH REGISTRATION OWES, ONE ENTRY PER OWED DELIVERY, with the firing owed to the app's registration at a pair-adopted address LEFT STANDING IN THE RESIDUE as an entry for the delivery to reach — IS WITHDRAWN BY NAME, because it demanded a SECOND CARRIER ENTRY AT ONE ADDRESS AND THE CARRIER CANNOT HOLD ONE.** **THE ONE READING THAT STANDS IS THIS: AN OWED FIRING'S HOME IS THE REGISTRY'S RESOLUTION OF ITS IDENTITY AND NOT AN OCCURRENCE STANDING IN THE RESIDUE.** **THE CARRIER'S KEYING IS ONE HOME ENTRY PER ADDRESS** (Reading (K); `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c); `A117` (D6)) — **so the residue carries one entry for an identity however many registrations owe it a firing — AND THE RECORD KEEPS ITS FOUR MEMBERS, so the identities this attempt's check-off consumed stand on the attempt's own books and reach this record as a NON-ENUMERABLE NOTE under a symbol key: NO MEMBER IS ADDED, the record's four members stand, its enumerable shape does not move, and `pending`'s own value stands exactly as the check-off leaves it.** **SO THE TERMINAL ARM'S DELIVERED SET IS THE RESIDUE PLUS THE CHECKED-OFF IDENTITIES WHOSE REGISTERED FUNCTION THE REGISTRY HOLDS AT ITS WINDOW'S OPENING — the residue's own members and those identities alike resolved by the SAME REGISTRY LOOKUP** (sub-item (b)) — **and the observable is single-valued on every arm: AT THE IN-WINDOW INSTANT THE INVOCATION SET IS EMPTY; AT THE TERMINAL ARM EACH IDENTITY OF THAT SET IS INVOKED EXACTLY ONCE, WITH THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT, WHERE THE REGISTRY HOLDS A FUNCTION FOR IT, AND FIRES NOTHING SILENTLY WHERE IT HOLDS NONE; AND ON THE FAILING ARM, WHERE THE DISCARD EMPTIES THE RESIDUE AND NO SUCH NOTE IS PUBLISHED, ZERO BODIES OF THAT WRITE'S OWN SET RUN** (`[A2 docs/decisions.md · `A117` (D5)/(D6) — one entry per owed firing READ AS the registry's resolution and never as a second carrier entry, the member set `4` and the store's one home entry per address UNMOVED; A2 docs/decisions.md · `A116` (D4) — the carrier unchanged; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — `CommitRecord`'s four members and `pending`'s reading; A3 docs/specs/storeroom-js/surface.md §2.4` rules 1–3, item 6 (b) and item 9 (c) — the one identity→function resolution; `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) and item 14 — one home entry per address | state or fail-state declaration]`).** **AND ONE READING IS NOT OWED HERE: the identities the check-off consumed that the registry holds NO function for fire NOTHING, silently, exactly as a residue member does (`§2.4` rule 1), so the residue's own value is a count a drive may assert — ONE ENTRY PER ADDRESS — and the delivered set is a SET of identities, one invocation each.**ry reaches, the app's body being invoked THERE and ONCE (`§2.7` item 6's law — the other listeners are REACHED once every constraint has passed — read with `§2.4` item 8 (c) AS CORRECTED 2026-10-15, which is the clause that DECIDES this keying: the app's registration at a pair-adopted address is OWED ITS FIRING AFTER THE PASS, so the check-off cannot consume the identity's whole owed delivery); AND THIS KEYING MOVES NOTHING OF THIS ITEM: the discard's by-set extent on a failing write is still ZERO DELIVERIES, the check-off is still THE ONLY LAWFUL REMOVAL on a passing write and a SIFT is still unlawful, `commit`'s whole-set write at `K-2` stands, and a bare caller-made write's own post-verb instant is untouched — the residue being written at `K-2` from the write's own returned set with exactly its two lawful removals** (`[A2 docs/decisions.md — THE ARCHITECT'S CORRECTION OF 2026-10-15 at its own site (`docs/specs/storeroom-js/surface.md §2.4` item 8 (c)), cited and not re-decided here; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — the check-off as the only lawful removal and a `sift` as unlawful, whose `pending` carries THE WHOLE RETURNED SET, read at THIS item's keying; `A116` (D4) — the carrier `CommitRecord.pending` UNCHANGED; `A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3 — the pass's terminal arm | state or fail-state declaration]`).
   - **(a) WHAT IT ITERATES.** **The delivery iterates THE RESIDUE — the handle set that stands in `CommitRecord.pending` at that instant: the whole triggered set MINUS the entries the pass checked off as they passed, MINUS the failed write's own returned set where the DISCARD took it, and MINUS nothing else — AND, BESIDE IT, THE CHECKED-OFF IDENTITIES THE TERMINAL ARM CARRIES, each resolved through THE SAME REGISTRY LOOKUP this section's `§2.4` resolves the residue's own members by: so the identities this arm's delivery reaches are the residue's members PLUS the checked-off identities whose registered function the registry holds, each ONCE, with the triggering address as its single argument** (`§2.4` item 8 (c) AS CORRECTED 2026-10-15 — the app's registration at a pair-adopted address is owed its firing after the pass; `§2.7` item 6; and item 7's keying of 2026-10-15, on which the check-off's act stands UNMOVED — the evaluated identity's entry leaves THIS RESIDUE as it passes, EVERY occurrence of it gone — and ONLY the owed firing's home moves: THE REGISTRY'S RESOLUTION OF THE IDENTITY, and never an occurrence standing in the residue). **A DRIVE THAT READS A CHECKED-OFF IDENTITY'S FIRING OFF A `pending` ENTRY IS ASSERTING THE READING THIS SUB-ITEM WITHDRAWS, and a drive that reads it off the registry's resolution is asserting this one: the residue is a COUNT of entries — one home entry per address — and the delivered set is a SET of identities.** **`triggered` is NOT what the delivery iterates, and the store's returned order is asserted by neither** (item 3 above; `[A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — the member's reading; A2 docs/decisions.md · `A113` (D3) — the caller's first read is `K-2`'s return, where no pass has run | state or fail-state declaration]`).
   - **(b) WHAT MAPS A HANDLE BACK TO ITS REGISTRATION.** **THIS SECTION'S `§2.4` REGISTRY, KEYED BY THE OPAQUE HANDLE THE PACKAGE RETURNED, WHICH HOLDS AT MOST ONE FUNCTION PER IDENTITY** — so a residue handle with **no** registered function invokes nothing and reports nothing, silently (`§2.4` rule 1), and a residue handle whose slot was REPLACED after the pass began invokes the function the registry held when the delivery's own window opened (`§2.4`'s `CF-DUP-3` clause) (`[A3 docs/specs/storeroom-js/surface.md §2.4 rules 1–3 | state or fail-state declaration]`).
   - **(c) AN EMPTY RESIDUE.** **Where every triggered entry was checked off — the ordinary arm on which every constraint passed and every other listener was itself evaluated by the pass — the residue is EMPTY, the delivery invokes NOTHING *OFF THE RESIDUE*, and the empty residue is a NO-OP AND NOT A FAILURE.** **A drive may assert it as a count: zero invocations FROM THE RESIDUE, no throw** — **AND THE RESIDUE IS EMPTY WHERE EVERY OWED FIRING OF THAT WRITE HAS BEEN CONSUMED, WHICH IS THE ONE CASE THIS SUB-ITEM DECLARES: an identity whose pair the pass evaluated IS NOT SUCH AN ENTRY WHERE ITS OWN REGISTRATION STILL OWES IT A FIRING, and its owed firing is NOT withdrawn by the empty RESIDUE — it is delivered at THIS ITEM's arm by THE REGISTRY'S RESOLUTION OF THAT IDENTITY and never by an occurrence standing in `pending` (`§2.7` item 7 (a) AS RE-SPELLED 2026-10-15; `§2.4` item 8 (c) AS CORRECTED 2026-10-15), so the delivery that reaches it there is THIS ITEM's arm and NOT a failure of (c)** (`[A3 docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — the check-off as the only lawful removal for such an entry | state or fail-state declaration]`).
   - **(d) THE DISCARDED ARM, AND ITS FAIL-STATE.** **On a write that fails on constraints the delivery reaches **ZERO** of the failed write's own triggered handles: they left `pending` by the DISCARD, and the law's requirement is that their bodies were NEVER RUN.** **THE FAIL-STATE IS THIS AND IS OBSERVABLE: a body of the failed write's own returned set that RAN — whether inside the verb's window or after it — is a FAILURE of this item, because A BODY ALREADY RUN IS NEVER UN-RUN and the requirement cannot be satisfied retroactively** (`[A2 docs/decisions.md · `A114` (D1)/(D2); A3 docs/specs/storeroom-constraints/attempt-lifecycle.md §2.4 item 8 (i) (5) and `§3` items 8/11 | state or fail-state declaration]`).

**8. WHAT IS UNCHANGED — A RECORD WITH NO KERNEL EVALUATION SET, DECLARED AS LAW AND NOT AS A HEDGE.** **⟶ `SUPERSEDED-WHOLE` 2026-10-15 — THIS ITEM IS DEAD TEXT FROM THIS DATE, AND THIS HOME CARRIES THE POINTER: ITS SUBJECT IS REMOVED BY `RCA-9` (`docs/specs/storeroom-native-proposal-review.md §18.1`, ruled `SETTLED` at that record's `§22.1`), BECAUSE EVERY WRITE OPENS OR JOINS A COMMIT AND PROCEEDS THROUGH THE FLOW, SO NO RECORD CARRIES *"NO KERNEL EVALUATION SET"* AND THE HOLE THIS ITEM DECLARES HAS NO SUBJECT; THE OPERATIVE LAW IS `docs/specs/storeroom-js/surface.md §2.11`, AND THIS ITEM'S READERS ARE RE-POINTED THERE ONE BY ONE PER `docs/specs/storeroom-native-proposal-review.md §19.5` `Q7`. THE BYTES THAT FOLLOW STAND AS THE RECORD OF THE CLAUSE THAT WAS, AND NO DRIVE MAY ASSERT THE INSTANT THEY DECLARE.** **THIS IS THE ONE PLACE THE LAW HAS A CONSUMER-VISIBLE EDGE, AND IT IS STATED PLAINLY: where a record carries no kernel evaluation set — a write the caller made through the store's own write verb and no `commit`, so that no `CommitRecord` and no `pending` member exists to read — THE DELIVERY INSTANT IS TODAY'S AND THIS CLAUSE DOES NOT MOVE IT: item 2's window stands, and the package invokes the registered bodies for the returned handles after the store call has completed and the record has been copied out.** **TO WHAT DOES THAT LEAVE A CONSUMER EXPOSED? THE SAME HOLE THE `N7` ROW OPENED, NAMED AS A FAIL-STATE AND NOT CLOSED BY INVENTION: such a caller's listener body runs at that instant, and it runs WHETHER OR NOT a constraint pass is later driven over that write — and where a pass is later driven and FAILS, that delivery has already happened, so item 6's discard reaches no body this unit delivered and the delivery cannot be undone.** **NO CLOSURE IS INVENTED HERE, AND NONE IS AVAILABLE AT THIS CELL: the package CANNOT separate a constraint-handle from a listener-handle at its own boundary, because that knowledge lives in the kernel's own pair registry (`docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4 — its copy of the pair set, keyed by (`address`, `id`) and not readable through any of the five items)** (`[A3 docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4 and `§2.1` item 1 — the kernel's pair-keyed registry and its five-item extent; A2 docs/decisions.md · `A115` (D3) — the five-item extent, the instance's `{register, on, off}` and the store's namespace are UNMOVED | state or fail-state declaration]`). **⟶ AND THE ONE HALF OF THIS ITEM'S FINDING THAT THE ORDERING SEAM CLOSES IS NAMED HERE, BECAUSE ITEM 9 IS THE CHANNEL THIS CELL SAID WAS UNAVAILABLE AT THE PACKAGE'S OWN BOUNDARY: the package still cannot separate a constraint-handle from a listener-handle AT ITS OWN BOUNDARY, and item 9 answers that by the KERNEL CALLING A MEMBER THE ENTRY IMPLEMENTS, so the carrier is `settle`'s two instants and never a package-side separation of the two handle kinds; the five-item extent and the set `{register, on, off}` named above are each SUPERSEDED AS FIGURES BY `A116` (D3) and by item 9, the extent staying FIVE and the set reading `{register, on, off, settle}`** (`[A2 docs/decisions.md · `A116` (D1) and (D3); A3 docs/specs/storeroom-js/surface.md §2.4 item 9 | requirement]`). **A caller that needs the ordering on a write it authors DRIVES IT THROUGH `commit` AND `runAttempt` — the route on which item 7's instant and residue reach a caller's own write, and no other route is declared on which the record's `pending` member decides the delivery.** **AND THE ASYMMETRY IS DECLARED RATHER THAN SMOOTHED: the same address, written by the same caller, is ordered when it is driven through `commit` and unordered when it is written bare — and that difference is a property of which record the caller holds, not of the address, the registration or the listener.**

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
   answers a thrown `{status, message}`.** **THEREFORE ALL `16` FAIL CODES REMAIN REACHABLE FROM JS** (READ THROUGH THE `RCA-9` PASS OF 2026-10-15: the as-filed `15` is the count before the sixteenth member, `ConstraintListInvalid` at `docs/specs/storeroom-native/contract.md §8.1` #16, whose trigger is a CONSTRUCTION- AND LOAD-side failure and is therefore reachable from `storeCreate` at the same JS boundary; `§8.1`'s own set size and the moved cells are named at `docs/specs/storeroom-native-proposal-review.md §22.4`) — the
   walk's `9` address codes on the address verbs, the value taxonomy's `ValueNotAdmitted`, the two
   construction members, `JournalOpUnknown`, `RollbackCompacted`, `ReadTargetIsBranch` and
   `ContainerKindConflict` — **and no code is left without a JS-reachable trigger.**
3. **NO `exists()` VERB, NO `findAddress` SHIM AND NO BINDING-SIDE RESOLVER IS DECLARED** — an `exists()`
   verb would be a **store-surface addition** and a shim would be a **second resolver**, and the store's own
   contract declares exactly ONE shared resolver (`§2.1`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A1 docs/specs/storeroom-js-proposal.md §10 · A65 — no
   reference crosses either way, so the non-exposure is entailed by the copy discipline and not merely a
   surface choice | prohibition]`)

**⟶ RE-DERIVED 2026-10-16 — THE MODULE NAMESPACE FALLS FROM ELEVEN NAMES TO ONE, AND THE TEN THAT LEAVE IT BECOME METHODS OF THE PRODUCT (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`, read with `A124` · `A125`; `RCA-8(g)`: **the three module-namespace enumerations this item carried — EIGHT, then NINE, then ELEVEN, with their sums `8 + 1 = 9` and `8 + 3 = 11` — together with the owed-types clause that named an eight-verb and a nine-verb `index.d.ts` surface, are MOVED OUT BYTE-EXACTLY to `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §1`, whose source path and `§` are named there; NO BYTE OF ANY OF THEM IS RE-EMITTED HERE and the one-line pointer stands at that region's own place**).
**1. THE OPERATIVE ENUMERATION IS ONE NAME — `storeCreate` — AND `A127`'s NAMESPACE ARITHMETIC IS `11 → 1` ✓: the `11` being this item's own superseded count, whose three terms are `8 + 3`, and the `1` being the architect's own clause — *"Functions that do not require an existing store (ex. storeCreate) remain discrete"*.** **`storeCreate` IS THE ONLY NAMED EXPORT OF THE ENTRY, and it is *"the function that DOES NOT require an existing store"* and is therefore the one that stays discrete.**
**2. THE TEN NAMES THE NAMESPACE SHEDS ARE NOT REMOVED FROM THE PRODUCT — THEY BECOME METHODS, AND THEIR DECLARATION IS THE PRODUCT'S OWN MEMBER SET:** **`read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` · `constraintOff` — TEN NAMES, EACH ONE A METHOD OF THE OBJECT `storeCreate` RETURNS, each at its own arity and each with its own declared refusal, declared at `§2.4` item 9 (f)'s `A127` clause of this date — the ONE home of the ten methods' arity, positions, answer and refusal, which `§2.1`'s `A127` clause POINTS AT and does not restate — and counted at that same `§2.4` item 9 (f) clause.** **SO THE RECEIVER IS THE STORE: no position of any of the ten names an instance, and the module-level call shapes `read(instance, address, tier?)`, `write(instance, address, tier, value, commit?)`, `listen(instance, address)` and their six siblings ARE SUPERSEDED AT EVERY SITE the receiver ruling reaches** — **THE ONE-SPELLING RULE AND ITS LIST ARE `§2.4` ITEM 3's — this clause OWNS the list's RE-STATEMENT and not the rule, which stands at that item and reaches every site of this directory — AND THE NINE SITES ARE, EACH SPELLED WITH ITS FILE — **AND READ THROUGH THE RE-DERIVATION THAT FOLLOWS IT: THE OPERATIVE SET IS **`13` SITES** — `9 + 4 = 13` ✓ — EACH SPELLED WITH ITS FILE AND ITS `§`, THE RULE BEING `§2.4` ITEM 3's AND THIS CLAUSE OWING THE LIST'S RE-STATEMENT (2026-10-16, THE GATE-2 FIFTH REVIEWER-LOOP PASS, WHICH FOUND EVERY EARLIER ENLARGEMENT OF THE LIST CAME FROM A SWEEP AND NONE FROM THE CORPUS).** **(1) `docs/specs/storeroom-js/surface.md §2.1` (c); (2) `docs/specs/storeroom-js/surface.md §2.3`'s carried mint-rule clause; (3) `docs/specs/storeroom-js/surface.md §2.2`'s signature block; (4) `docs/specs/storeroom-js/surface.md §2.10`'s signature block; (5) `docs/specs/storeroom-js/surface.md §2.12` item 1's opening and five-stage walk; (6) `docs/specs/storeroom-js/surface.md §2.12` item 1's stage `2`; (7) `docs/specs/storeroom-js/surface.md §2.4` item 7's `on` step list; (8) `docs/specs/storeroom-js/surface.md §2.4` item 7's `off` step list; (9) `docs/specs/storeroom-js/acceptance.md §4.1` item 7 — the arity exemplars' three `read` spellings, re-spelled to `a.read(address)`; (10) `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s withdrawal half — the `off` step `2` that printed `unlisten(instance, handle)` and was re-spelled to `a.unlisten(handle)`; (11) `docs/specs/storeroom-js/parameter-semantics.md §2.15` item 3's arm table — its `write(instance, address, tier, value)` row and its two `delete` rows, re-spelled to the method form; and (12) `docs/specs/storeroom-js/crossing.md §1.7` (b) item 2 — the `rollback(instance, Symbol())` exemplar, whose own bytes now print `a.rollback(Symbol())` and which NO LIST NAMED UNTIL THIS ONE.** **AND ONE MEMBER IS REMOVED AND NOT RE-SPELLED, ON A CROSS-CHECK OF THE ARCHIVE THAT SWEPT IT: `docs/specs/storeroom-js/surface.md §2.12` item 2 clause (ii)'s three signatures — member `(7)` of the superseded list — IS DROPPED NOTHING AND IS **RESTORED**, because `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md`'s own sweep records `§2.12` items 2–4 as *"already position-less"* AND LISTS THEM IN NO RE-SPELLING, so those three signatures NEVER PRINTED AN `instance` POSITION. SO THE FOUR THE SUPERSEDED LIST OMITTED ARE MEMBERS `(9)`–`(12)` HERE, THE `8` BESIDE THEM BEING ITS `(1)`–`(6)` AND ITS `(8)`–`(9)`, AND THE SEARCHED SET IS PRINTED BESIDE THE COUNT AT THE RULE'S OWN LIST, `§2.4` item 3 of this date, WHERE THE SEVEN LIVE FILES WALKED, THE PATTERN SEARCHED AND EVERY COUNT FOUND ARE STATED.** **(THE CARRIER'S `docs/specs/storeroom-js/contract.md §2.2` AND `§2.10` ARE THE SAME SITES AS `(3)`–`(4)` AND ARE NOT COUNTED BESIDE THEM.)** **THE LIST ABOVE IS THE SUPERSEDED `9` AND ITS OWN *"ONE COUNT"* TAIL IS READ THROUGH THIS CLAUSE AND THROUGH `§2.4` item 3's** (`docs/specs/storeroom-js/surface.md §2.4` item 3 of this date; `docs/specs/storeroom-js/parameter-semantics.md §2.23` item 5 | numeric or census claim]`). — AND THE SITES ENUMERATED BELOW ARE THAT LIST AT ITS OWN BYTES, EACH SPELLED WITH ITS FILE BECAUSE A BARE `§n` IS NOT RESOLVABLE AND BOTH `surface.md` AND `contract.md` CARRY `§2.1`–`§2.12`: (1) `docs/specs/storeroom-js/surface.md §2.1` (c); (2) `docs/specs/storeroom-js/surface.md §2.3`'s carried mint-rule clause; (3) `docs/specs/storeroom-js/surface.md §2.2`'s signature block; (4) `docs/specs/storeroom-js/surface.md §2.10`'s signature block; (5) `docs/specs/storeroom-js/surface.md §2.12` item 1's opening and five-stage walk; (6) `docs/specs/storeroom-js/surface.md §2.12` item 1's stage `2`; (7) `docs/specs/storeroom-js/surface.md §2.12` item 2 clause (ii); (8) `docs/specs/storeroom-js/surface.md §2.4` item 7's `on` step list; and (9) `docs/specs/storeroom-js/surface.md §2.4` item 7's `off` step list — `9` SITES, ONE COUNT, ONE SET, the same nine `§2.4` item 3 prints.** **THE SUCCESSIVE EARLIER PRINTS OF THIS LIST NAMED FIVE, THEN SIX, THEN EIGHT — `§2.1` (c) omitted first, the two `§2.12` item 1 sites second and `§2.3`'s carried clause third: each was a miscount of a set the rule declares it reaches WHOLE, and each is superseded at this clause's own bytes from this date** (`§2.2`'s signature block, `§2.10`'s, and `§2.12`'s items 1–4 — each read through this clause and through `§2.1`'s `A127` clause).
**3. AND THE TEN NAMES' OWN REMOVAL FROM THE NAMESPACE IS DECLARED, WITH ITS GROUND, BY `§2.9`'s REMOVAL-VERSUS-DEPRECATION CLAUSE OF THIS DATE — no deprecation window, on `A128`'s own fiat.** **AND NOTHING ELSE OF THIS ITEM MOVES: `findAddress` remains unexposed, no `NodeRef` and no reference crosses, item 2's `16` codes stay JS-reachable, item 3's *"no `exists()` verb, no `findAddress` shim, no binding-side resolver"* prohibition stands whole, the store's closed `16`-member set and the store's own `8`-verb namespace are UNMOVED, and the kernel's FIVE-item extent is UNMOVED** (`[A2 docs/decisions.md` · `A127` · `A128`; A3 docs/specs/storeroom-js/surface.md §2.1 and §2.4 item 9 (f)'s clauses of this date, and `§2.12` items 2–4 | numeric or census claim]`).

**⟶ REMOVAL VERSUS DEPRECATION, IN WRITING — DECLARED 2026-10-16 AND OWED BY THE FIAT ITSELF (`role_spec_writer`; `A: docs/decisions.md` · `A128`, 2026-10-16, `ACTIVE`, verbatim: *"Only current active consumer is downstream project Provident-Electron, which requires this change. Declare minor by fiat."*).** **TEN PUBLISHED NAMES GO WITH NO DEPRECATION WINDOW: `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` · `constraintOff`.** **THE DECLARATION, IN FOUR SENTENCES, EACH DERIVABLE:**
1. **NO DEPRECATION WINDOW IS OPENED FOR ANY OF THE TEN, AND NONE IS OWED.** **A deprecation window exists to let a consumer migrate while both spellings stand; `A128` rules that there is EXACTLY ONE CURRENT ACTIVE CONSUMER — `../Provident-Electron` — AND THAT IT REQUIRES THE CHANGE, so the population the window serves is empty and the window would publish a second spelling of one act, which this unit's ONE-SPELLING rule refuses** (`A: docs/decisions.md` · `A127` — *"Inconsistency - all store-modifying acts should operate by method, not function"*).
2. **THE REMOVAL IS DECLARED NON-BREAKING ON `A128`'S GROUND AND ON NO OTHER, AND THE GROUND IS A CENSUS RATHER THAN A MEASUREMENT OF THIS REPOSITORY: an unknown consumer holding the module form would FAIL the warrant, and the class then reverts to the open question `A128` closed.** **THIS CLAUSE THEREFORE CARRIES ITS OWN FALSIFIER.**
3. **WHAT SHIPS AT EACH NAME'S PLACE IS DECLARED, SO A CONSUMER'S MIGRATION IS DERIVABLE AND NOT GUESSED: `read` → `a.read(address, tier?)`; `readLiteral` → `a.readLiteral(address, tier?)`; `write` → `a.write(address, tier, value, commit?)`; `delete` → `a.delete(address, tier?)`; `rollback` → `a.rollback(opId)`; `listen` → `a.listen(address)`; `unlisten` → `a.unlisten(handle)`; `addConstraint` → `a.addConstraint(pair, constraint)`; `constraintOn` → `a.constraintOn(pair, constraint)`; `constraintOff` → `a.constraintOff(pair, constraint)` — **ten names, ten receivers, ONE SPELLING, and the `a` in each is the object `storeCreate(cfg)` returned** (`§2.1`'s `A127` clause of this date).
4. **NO SECOND NAME STANDS AT EITHER LAYER FOR ANY OF THE TEN: the module namespace carries `storeCreate` alone (`§2.9` item 1's clause above), and neither `on` nor `off` is a name of the module namespace or of the product's declared method set** (`§2.4` item 9 (f)'s `A127` clause of this date).
**AND WHAT THIS CLAUSE DOES NOT DECIDE: the RELEASE CLASS of `0.3.0` and the class ground's own home — `release.md §2.3` — are the PUBLISH pass's cells and are NOT written by any byte of `docs/specs/storeroom-js/**`** (`[A2 docs/decisions.md` · `A128` · `A127`; A3 archive/reviews/2026-10-16-constraints-publication-gate1.md §23 and §24 — the fiat's two owed items, of which this clause is the second | requirement]`).

**⟶ `RCA-8(g)` ARCHIVAL MOVE, 2026-10-16 — THREE CLAUSES OF THIS ITEM STOOD FROM THIS LINE — THE `A123`-PASS NAMESPACE CLAUSE (`8 → 9`), THE `A126`-PASS ONE (`9 → 11`, `8 + 3 = 11 ✓`) AND THE OWED-TYPES CLAUSE THAT NAMED AN EIGHT-VERB AND A NINE-VERB `bindings/js/index.d.ts` SURFACE — AND THEY ARE SUPERSEDED WHOLE BY `§2.9` ITEM 1's `A127` CLAUSE ABOVE: NO FIGURE THEY PRINT — `8`, `9`, `11` OR ANY SUM OF THEM — IS OPERATIVE AFTER 2026-10-16, AND THEIR OPERATIVE READINGS ARE THAT CLAUSE, `§2.4` ITEM 9 (f)'s `A127` CLAUSE AND `§2.1`'s `A127` CLAUSE.** **AND THE MOVE IS DISCHARGED AND NOT OWED: the byte-exact `RCA-8(g)` MOVE-OUT of the three clauses' bytes was performed by the same date's second half — the AS-FILED BYTES stand BYTE-EXACTLY at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §9`, whose source path and `§` are named there, and the reconstruction the earlier half filed at that archive's `§1` is superseded as a reconstruction by that archive's own `§9`.** **SO THE POINTER BELOW IS THE EVIDENCE THAT THE BYTES HAVE LEFT: nothing of the three clauses is retained at this site, no byte of them is re-emitted, and this clause no longer claims a move-out that has not been taken.**
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: the three clauses' AS-FILED BYTES have LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §9`, whose source path and `§` are named there.**

**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: the superseded duty clause this item carried — the `A123`-era clause that ordered `manageConstraints` as a named export and the instance's declared member set widened from FOUR to FIVE own members, its AS-FILED BYTES have LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §14`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **AND NOTHING IS OWED AT THIS SITE: the superseded clause's own duty left with it, and the one duty `bindings/js/index.d.ts` carries from 2026-10-16 is declared by `§2.4` item 9 (f)'s `A127` clause of that date and by this item's `A127` clause above, each at its own bytes and neither re-derived here.**

**⟶ AND THE DUTY THIS CLAUSE CARRIES IS RE-DERIVED THE SAME DATE, 2026-10-16, BECAUSE THE FIGURES IT PRINTS ARE SUPERSEDED TWICE OVER — BY `A126` AND THEN BY `A127` (`role_spec_writer`; `A: docs/decisions.md` · `A127` · `A126` · `A123`).** **THE OPERATIVE DUTY, STATED AT THE HOME THAT CARRIES IT: `bindings/js/index.d.ts` OWES (i) THE ONE NAMED EXPORT `storeCreate` AND NOTHING ELSE AT THE MODULE NAMESPACE — the `manageConstraints` export this clause printed is SUPERSEDED, the name having been replaced by the three functions and the three then moved off the namespace altogether; and (ii) THE PRODUCT'S TWELVE-MEMBER SET, with each member's argument types and its return, whose figures are `§2.4` item 9 (f)'s `A127` clause of this date.** **AND A TYPES SURFACE THAT STILL DECLARES EIGHT, NINE OR ELEVEN VERBS, OR A FOUR-, FIVE- OR SEVEN-MEMBER PRODUCT, AFTER THIS DATE IS A FINDING OF THE SAME CLASS THIS CLAUSE ALREADY DECLARES.** **THE DUTY'S OWN FIGURES ARE NOT RE-DERIVED HERE A SECOND TIME: `§2.4` item 9 (f)'s `A127` clause and `§2.1`'s `A127` clause are their ONE home, and this clause reads the duty through them** (`§2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause; archive/reviews/2026-10-16-constraints-publication-gate1.md `§17.4`, whose *"NO ninth name"* reading is superseded by `A123`'s count and then by `A127`'s).

### §2.10 `listen` and `unlisten` — the crossing's two registration verbs

```
a.listen(address)      -> Handle    // mints a token, populates the store's home, wraps it for JS
a.unlisten(handle)     -> undefined  // drops ONE store-side home entry; a no-op success for anything else
```

**⟶ `RCA-8(g)` RE-SPELLED 2026-10-16 — THE `instance` FIRST POSITION IS DROPPED AND THE RECEIVER IS THE STORE.** **THE AS-FILED BLOCK ABOVE — the two lines `listen(instance, address)` and `unlisten(instance, handle)`, each with an `instance` FIRST POSITION — HAS LEFT THIS FILE and stands at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §20`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **The `a` of each line above is the object `storeCreate(cfg)` returned — THE RECEIVER, and not a position — and the operative declaration is `§2.4` item 9 (f)'s clause of this date** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).
**`listen`'s `address` is `AddressArg`'s domain and NOTHING MORE** — **a listener carries NO tier qualifier:
its address is the WHOLE of its key** (`[A3 docs/specs/storeroom-native/contract.md §6.5 — the listener
record's closed two-member set | requirement]`). **`unlisten` returns `undefined` on success, including on
its no-op success, and throws exactly where the store does** — **and the store throws nowhere on a withdrawal
except for a malformed argument's shape.** (`[A3 docs/specs/storeroom-native/contract.md §0.4 — the
`Store::listen`/`Store::unlisten` rows | requirement]`)

**⟶ `RCA-8(g)` ARCHIVAL MOVE, 2026-10-15: `§2.10`'s OWN DATED PASS-RECORD — the bounded `A78` re-homing pass's record for the two registration verbs, which stood immediately above this line and split this section's own signatures from the store's inherited registration semantics — is moved BYTE-EXACTLY to `archive/spec-history/2026-10-15-js-surface-volume-archival.md` `§3`, the one home that pass record now has; NO RULE MOVED: this section's signature block and the paragraph below it stand as printed, the two JS spellings stand at `§2.3` item 2 with `DD-14`, the throw discipline stands at `§2.5`'s single form, and the registration semantics the record points at stand at `docs/specs/storeroom-native/write-and-read.md` `§6.5` items 8 (a)/(d), 12 and 14 with the store's `parameter-semantics.md §2.13` / `PAR-13`.**

---

### §2.11 The `file`-tier save's own arm — the terminal arm's act, its scope, and its failure

**⟶ ADDED 2026-10-15 — THE `RCA-9` PASS (`role_spec_writer`), ON THE CHANGE REQUEST AT `docs/specs/storeroom-native-proposal-review.md §18.1` AS RULED AT THAT RECORD'S `§19`–`§22`: THE FILE-TIER SAVE MOVES ONTO THE TERMINAL ARM, AND THIS SECTION IS THE ONE HOME OF THAT RULE.** **IT IS THE OPERATIVE LAW `§2.4` ITEM 9 (e) AND `§2.7` ITEM 8 CARRIED A POINTER TO FROM THIS DATE; it re-decides no rule of `§2.4` item 9's other arms, of `§2.7` items 1–7, or of the store's own clauses, and it declares no new parameter of this surface beyond the fifth argument `§2.2`'s dated clause fixes.**

1. **THE SCOPE, STATED FIRST SO THE LIFT IS NOT READ WIDER THAN IT IS.** **THE LIFT IS FOR THE `file` TIER, THE TERMINAL ARM AND THE PASSING ARM ALONE, AND FOR NOTHING ELSE.** **The five cells that do NOT move, each named: the arm set of `§2.4` item 9 is UNMOVED at its two instants; the instance's member set is UNMOVED; the member's return shape is UNMOVED at `undefined`; the REGISTRY DELIVERY is UNMOVED — the delivered set, its keying and its single argument are `§2.7` items 6–7's, exactly as printed; and the FAILING arm of `§2.4` item 9 (d) is UNMOVED — a pass that fails on constraints drives no save and no store call for that write** (`docs/specs/storeroom-native-proposal-review.md §19.1` and `§19.3`). **THE ONE SENTENCE THAT MOVES IS `§2.4` item 9's *"no store call is performed in any arm of this member"*, and what it is lifted to is the one act ITEM 3 BELOW declares: a `file`-tier commit, at the terminal arm, on the passing arm, keyed by the settled record's own `op`** (`§2.4` item 9's `:822` sentence and its readers at `:848`–`:851` and `parameter-semantics.md §2.19`'s outside-value cell — EACH RE-POINTED HERE, none left inferring).
2. **WHICH ARM, AND WHAT THE ACT IS.** **ON THE PASSING ARM — every constraint of the record's own triggered set evaluated and passed — AND FOR A RECORD WHOSE OWN `op` CARRIES A `file`-TIER WRITE, THE TERMINAL ARM PERFORMS THE STORE'S `commit_file` ACT AS ITS OWN STEP, AND THE ACT IS THE FIRST THING THAT ARM DOES, before any body of the delivered set is invoked.** **KEYED BY THE SETTLED RECORD'S OWN `op` AND NEVER BY AN ADDRESS, A HANDLE OR A RECORD IDENTITY: the record the kernel settled carries the journal op that write returned, and that op is the key this act reads** (`docs/specs/storeroom-native/contract.md §6.2` and `§7.2` as amended; `docs/specs/storeroom-native-proposal-review.md §19.3`). **A WRITE THAT DID NOT REACH THE PASSING ARM PERFORMS NO SAVE, and a record whose own `op` is not a `file`-tier write's performs no save — the act is `file`-tier and terminal-arm, and there is no second arm of it.** **⟶ AND WHEN THIS ACT ITSELF FAILS, THE MARK THIS SURFACE SETS IS `Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm')`, SET ON THE VERY RECORD THE SEAM WAS HANDED AND CARRYING THE VERY THROWABLE THE STORE'S `commit_file` RETHREW — the kernel's half of that symbol being declared at `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 3 and this part's clause 9 below**
3. **THE ORDERING LAW, IN TWO CLAUSES, SO A DRIVE CAN DERIVE EACH STATE.** **(i) NO LISTENER BODY RUNS BEFORE THE PASS: a body of the record's own triggered set that ran while any of that record's constraints stands owed is a FAILURE of this section and of `§2.7` item 6 alike** — **and on the FAILING arm the pass's own discard reaches them, so a failing write's bodies were NEVER RUN** (`§2.7` item 6 and item 7 (d), UNMOVED). **(ii) NO LISTENER BODY RUNS BEFORE THE SAVE ON THE PASSING ARM: the save of clause 2 above precedes the invocation of every body of the delivered set, so a body that observed the file's bytes and read the PRE-SAVE image is a FAILURE of this section** (`docs/specs/storeroom-native/contract.md §7.2` item 2 as amended — the atomicity clause; `docs/specs/storeroom-native-proposal-review.md §20.3`).
4. **THE DURABILITY BOUNDARY, IN TWO CLAUSES.** **(i) A FAILING PASS LEAVES THE LAST PASSING IMAGE DURABLE: a pass that fails on constraints performs NO save, so the bytes at `cfg.filePath` after it are BYTE-IDENTICAL to the bytes that stood there before the write** (`docs/specs/storeroom-native/contract.md §7.2` item 2's own observable — the sibling and the rename — read at this arm). **(ii) A PASSING PASS'S IMAGE IS DURABLE BEFORE ANY LISTENER BODY RUNS, and the observable is the file's own bytes read from a FRESH instance over an equal `cfg.filePath`: the version the write installed is present there when the first body of the delivered set runs** (`docs/specs/storeroom-native/contract.md §7.2` item 6's boot; `docs/specs/storeroom-native-proposal-review.md §20.3`).
5. **THE REFUSAL — A FAILED SAVE IS AN UNREPAIRABLE CONSTRAINT VIOLATION, AND THE SAVE *IS* A CONSTRAINT, EVALUATED LAST.** **THE SAVE IS EVALUATED AS THE LAST CONSTRAINT OF THE WRITE, SO A SAVE THAT FAILS IS A CONSTRAINT VIOLATION AND IS NOT REPAIRABLE BY ANY REPAIR FUNCTION: `ok === false`, the entry is a `KC` token of the kernel's own set, and the pass reports the failure as it reports any other** (`docs/specs/storeroom-constraints/fail-surface.md §1.1`; `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3's instant (b)). **WHERE THE SAVE'S OWN ACT FAILS, THE STORE ROLLS THE WRITE BACK AND THE CALL ANSWERS WITH A MESSAGE: the rollback is the store's own `§7.2` item 3 arm, and the message is the generated one its code carries** (`docs/specs/storeroom-native/contract.md §8.1` rank `#15`, whose trigger column was WIDENED to reach the save act, and `§8.2`; `docs/specs/storeroom-native-proposal-review.md §19.5` `Q1` and `§20.4` `F-3`, which rules the reuse operative; the new member rank `#16`, `ConstraintListInvalid`, is the VALIDATION FAILURE OF THE SUPPLIED CONSTRAINT LIST — at construction / startup, or of the LOADED STATE against that supplied list at load — and is NOT the save's code — the two triggers do not overlap, `docs/specs/storeroom-native/contract.md §8.1` #16). **AND THE FAILURE'S ORDER IS DECLARED SO A DRIVE IS SINGLE-VALUED: the rollback happens FIRST and the message is answered to the caller AFTER it — the caller receives the failure and NEVER the rolled-back state** (`docs/specs/storeroom-native/contract.md §7.2` item 3, read at this arm).
6. **THE JOIN — A REPAIR'S WRITE IS A NEW ENTRY IN THE SAME COMMIT.** **A repair function IS RETURNED BY THE CONSTRAINT THAT TRIGGERED IT and IS PASSED THE COMMIT IT IS PART OF, so ITS OWN WRITE JOINS THAT COMMIT AS A NEW ENTRY and the commit's op set grows by exactly one per repair write** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` items 2–3; `docs/specs/storeroom-native-proposal-review.md §19.2`). **A REPAIR'S WRITE IS AN ORDINARY WRITE OF THIS SURFACE SUBJECT TO EVERY CLAUSE ABOVE: it carries the commit the constraint passed it, at the fifth position this section's `§2.2` fixes, and its own save is its own terminal arm's act.**

**⟶ AND THE DISCRIMINATOR CLAUSE `6`'s *"JOINS THAT COMMIT"* LEFT TO A DRIVE IS DECLARED, 2026-10-16 (`role_spec_writer`), BECAUSE A FALLBACK WRITE ALSO YIELDS AN OP: WHAT MAKES A WRITE *"JOIN THAT COMMIT"* IS THAT ITS OP IS THE OP THE REPAIR'S OWN RECORD CARRIED IN — the `op` member of the `{ok: true, op}` arm of `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 2, which the kernel reads when it decides whether the repair landed a new entry** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3's `ops` member — *"every op the attempt created, in CREATION order"* — read with `attempt-lifecycle.md §2.4` item 4's repair transition) — **AND NOT THE MERE PRESENCE OF AN `op` IN THE RETURNED VALUE, WHICH ANY WRITE ANSWERS WHETHER OR NOT IT JOINED THIS COMMIT, so a drive distinguishes the two by the recorded `op` and not by the return's own shape** (`docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 2's `landedOp` clause; the join's own two-cell observable at `bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-11.2`, whose op-count reading is the discriminating one). **THE RULE OF CLAUSE `6` ABOVE IS UNMOVED: this clause names what a drive reads to tell the join from its fallback, and moves no count of this part.**

**⟶ AND ONE PHRASE OF CLAUSE `5` ABOVE IS RECORDED AS *NOT DRIVEN*, ON THE AUTHORITY OF THE LAYER THAT WOULD HAVE TO DRIVE IT, 2026-10-16 (`role_spec_writer`): THE WORDS *"IS NOT REPAIRABLE BY ANY REPAIR FUNCTION"* ARE LAW AND ARE DRIVEN NOWHERE.** **THE LAW STANDS — the save is the write's LAST constraint, so a save that fails is a constraint violation of the unrepairable kind** — **BUT NO CELL OF EITHER LAYER PRODUCES IT: the red set registers no repair for the save's own arm and drives the save's failure without one (`bindings/js/test/file-tier-save.test.mjs`'s `S-REFUSAL` group, whose states are enumerated at that file's own head — the save's unrepairable violation *"must NOT reach"* a repair registered at the same address, and no state of it registers one FOR the save), and the gate-5 blind set drives the same arm with a repair registered at a DIFFERENT address at most (`bindings/js/greens/file-tier-save/file-tier-save-greens.md`'s `FTS-04`, all cells).** **OWNER: `role_test_writer`. POSITIVE REVISIT CONDITION: a driven state in which a repair IS registered for the save's own pair and the save fails notwithstanding — the repair body never running for that arm, so the observable is a repair-invocation count of `0` on the failing save** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3's instant (b); `docs/specs/storeroom-constraints/fail-surface.md §2`'s `KC-3` row). **NO CLAUSE OF THIS SECTION IS RE-WORDED BY EITHER CLAUSE ABOVE, AND NO COUNT OF THIS PART MOVES** (`§2.11` clauses `5`–`7`, unmoved).
7. **AND NOTHING ELSE OF THIS PART MOVES: the module namespace stays at `8` verbs, the instance's member set stays `{ register, on, off, settle }`, the register keeps its `8` rows, the store's namespace stays CLOSED at `8`, the kernel's extent stays FIVE, and the seam's arity, return and every outside-value answer stand exactly as `§2.4` item 9 prints them** (`docs/specs/storeroom-native-proposal-review.md §19.1` — the member set unmoved, the return shape unmoved, the delivery unmoved).

`[A3 docs/specs/storeroom-native-proposal-review.md §19 · §20 · §22.1 — the change request's own record, its`
`operative semantics and its construction ruling; A3 docs/specs/storeroom-native/contract.md §3.1 · §7.1 · §7.2 ·`
`§8.1 · §8.2 as amended 2026-10-15 | state or fail-state declaration]`

**⟶ ADDED 2026-10-15 — THE CROSSING'S DISPATCHER VERB SET, ITS OWN CENSUS ROW, AND THE CRATE-SURFACE NAMES THE ARTEFACT ADDED, DECLARED HERE WHERE CLAUSE 7 NAMES THE CENSUSES THEY SIT BESIDE (`role_spec_writer`, on the architect's ruling that widens this spec to declare what was built).** `RCA-8(d)` ANNOTATE-BESIDE: **clauses 1–7 above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no verb to the MODULE namespace, no member to the instance, no code to the closed set and no row to the register, and it moves no count of this part.**

8. **THE DISPATCHER VERB SET, DECLARED AND COUNTED HERE BECAUSE CLAUSE 7 NAMES THE CENSUSES THIS ONE IS NOT.** **THE CROSSING'S OWN DISPATCH TABLE — the entry the addon's `call` export routes every package verb through — CARRIES EIGHT DISTINCT TOKENS, AND THEY ARE THESE EIGHT AND NO NINTH: `"read"` · `"readLiteral"` · `"write"` · `"delete"` · `"rollback"` · `"listen"` · `"unlisten"` · `"commitFile"` = `8` ✓** (**READ AT THE ADDON'S OWN BYTES**, 2026-10-15: `bindings/js/src/facade.rs:1269`–`:1337`, one arm per token, with the unknown-token arm at `:1338`–`:1341`; **the seven arms `:1270`–`:1318` carry the module namespace's OWN SEVEN store-reaching verbs — `storeCreate` crossing at the addon's `create`/`storeCreate` export and NOT through this table — so the set's arithmetic is `7 + 1 = 8` ✓, and `"commitFile"` is the token `:1325` adds**). **`"commitFile"` IS THE EIGHTH VERB OF THIS SET AND NOT A VERB OF THE MODULE NAMESPACE: it is the terminal arm's own act crossing, its one argument is an op id and its answer is `undefined`** (`docs/specs/storeroom-native/contract.md §7.2` item 2 as amended 2026-10-15; this part's clause 2; `docs/specs/storeroom-native/contract.md §0.4`'s crate-naming clause, where its two Rust spellings are declared). **AND THE CELL THIS DECLARATION RE-SPELLS IS NAMED BY ITS OWN WORDS: the code-comment beside that arm reads *"IT IS NOT ONE OF THE CROSSING'S EIGHT VERBS"* — from this date it READS *"IT IS THE EIGHTH OF THE CROSSING'S EIGHT DISPATCHER VERBS, AND NOT A VERB OF THE MODULE NAMESPACE"*, the old words standing at their own bytes and this clause being the operative statement** (`docs/defects.md`'s `DEF-2026-10-15-X`; **a re-spelling of a COMMENT and not of a rule: no count of clause 7's list moves**).

**AND THE THREE CENSUSES THIS DECLARATION IS READ BESIDE, EACH RE-DERIVED OR CONFIRMED AT ITS OWN BYTES AND NONE OF THEM MOVED** (**READ**, 2026-10-15): **the MODULE namespace stays at the `8` declared verbs** (`storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` — `§2.1`'s dated clause; **UNMOVED**); **the ADDON's own export set is `5` — `version` · `errorMessage` · `storeCreate` · `call` · `register`** (`bindings/js/src/facade.rs:1577`–`:1581`; **UNMOVED**, and DISTINCT from this clause's dispatcher set, which is the set of TOKENS `call` accepts and not the set of names the addon exports); **and the STORE's own namespace stays CLOSED at `8` verbs** (`§2.9`; **UNMOVED**). **THE DISPATCHER SET IS THUS THE THIRD SET AND NOT A RENAME OF EITHER: `8` module verbs, `5` addon exports, `8` dispatcher tokens.** **AND THE CRATE-SURFACE NAMES THIS DECLARATION COVERS ARE DECLARED AT `docs/specs/storeroom-native/contract.md §0.4` — `storeCreateWithConstraints` · `ConstraintsArg` · `ConstraintEntry` · `crossing::create_with_constraints` · `Instance::commit_file` — EACH WITH ITS OWN ROW THERE, which is the one home of every crate spelling; THIS clause declares the crossing's `"commitFile"` TOKEN and the verb set it belongs to, and re-spells none of them** (`docs/defects.md`'s `DEF-2026-10-15-X`; `docs/specs/storeroom-native/contract.md §0.4` as amended this date).

9. **⟶ ADDED 2026-10-15 — THE SECOND WELL-KNOWN SYMBOL, SET HERE AND DECLARED ON BOTH SIDES OF THE CROSSING** (`role_spec_writer`; `A: docs/decisions.md` · `A117` (D6) **CITED AS THE PRECEDENT, the precedent being the FIRST symbol**). **`Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm')` IS SET BY THIS SURFACE ON THE VERY RECORD THE SEAM WAS HANDED, AT CLAUSE 2's OWN ACT — the terminal arm's `file`-tier save — AND ON THE FAILING ARM OF THAT ACT ALONE, AND IT IS READ BY THE CONSTRAINT KERNEL AT ITS OWN CATCH** (`docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 3, where the kernel's half is declared; `§2.4` item 9 (g) item 1's record identity).
   **WHAT IT CARRIES, AND WHY THE IDENTITY AND NOT A COPY: THE VERY THROWABLE THE STORE'S `commit_file` RETHREW** — the store's own two-member form, produced by the store's verb and crossing on the STORE's channel (`§1.2` item 2; clause 5 above; `docs/specs/storeroom-native/contract.md §8.1` rank `#15` `FileCommitFailed`). **THE KERNEL'S PASSING ARM TAKES ITS ONE TERMINAL ACT ON THAT IDENTITY ALONE**: the mark is what distinguishes a FAILED SAVE from A BODY OF THE DELIVERED SET THAT THREW, the latter being *"NOT CAUGHT, NOT RETRIED AND NOT REPORTED"* (`§2.7` item 4) — so a drive that asserts the failed-save arm reads the arm off this mark and off nothing else.
   **AND NO NAMED MEMBER IS ADDED, SAID EXPLICITLY WHERE THE SYMBOL FAMILY IS ENUMERATED: THE RECORD'S `Object.keys` AND `Object.getOwnPropertyNames` CENSUSES ARE UNMOVED — a symbol-keyed own property is invisible to both — so `CommitRecord` keeps its declared FOUR members (`3 + 1 = 4` ✓) and no record shape's census of this part moves** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 and `§1` item 4; `A117` (D6) — **the precedent clause's own words: *"NO MEMBER IS ADDED"***). **AND THE SYMBOL IS THE SECOND OF THE FAMILY AND NOT A THIRD: the family is exactly two well-known symbols, `provident-storeroom.settled-on-the-passing-arm` (`SETTLED_ON_THE_PASSING_ARM`, the first) and this one — `2` ✓ — and both are `Symbol.for` keys under the same package prefix so BOTH SIDES DECLARE THEM INDEPENDENTLY and neither side imports the other** (`docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 3; `A117` (D6)).

### §2.12 THE WRITE PATH AND THE POST-CREATION CONSTRAINT ROUTE — authored in `surface.md` 2026-10-16 on `A122` · `A123` · `A124` · `A125`; **⟶ RE-DERIVED THE SAME DATE ON `A126`, WHICH SUPERSEDES `manageConstraints` — THE OPERATIVE DECLARATION OF THE CONSTRAINT ROUTE IS ITEM `2`'s RE-DERIVED CLAUSE BELOW, AND THE SUPERSEDED `manageConstraints` DECLARATION AND ARM REGION ARE MOVED OUT BYTE-EXACTLY TO `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §2` AND `§1` (`RCA-8(g)`); THIS HEADER'S `manageConstraints` HALF STANDS AS THE AS-FILED TITLE AND IS READ THROUGH THE RE-DERIVED ITEM**

**⟶ AUTHORED 2026-10-16 BY THE `A122` PASS (`role_spec_writer`), ON THE ARCHITECT'S FOUR RULINGS OF THAT DATE
(`docs/decisions.md` · `A122` · `A123` · `A124` · `A125`).** **THIS SECTION IS AUTHORED HERE FIRST AND IS OWED
ITS CARRIAGE INTO `docs/specs/storeroom-js/contract.md` AS A CLAUSE, WITH `§2.6`'s POINTER AND THE TYPED
REGISTER'S UNMOVED FIGURES, BY THE AMENDMENT `docs/specs/storeroom-js/implementation-plan.md §7` DECLARES —
exactly as `§2.11`'s own end-of-part note records for its own section.** **THE AS-FILED SENTENCES THIS SECTION
SUPERSEDES ARE NAMED BY THEIR OWN WORDS AND ARE **NOT** RETAINED BESIDE IT: `§2.6`'s whole text has MOVED OUT
BYTE-EXACTLY to `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §1`, and `§2.6` above carries
the one-line pointer** (`RCA-8(g)`: **move out, leave a one-line pointer, never retain beside**).

**1. THE ENTRY→KERNEL CALL IS DECLARED — THE ONE UNDECLARED EDGE, CLOSED.** **A `write` CALLED WITH FOUR
POSITIONS — `a.write(address, tier, value)`, the method form, the receiver being the store — ENTERS THE KERNEL'S `K-2` `commit`, AND THE ENTRY'S OWN
SURFACE IS THE ROUTE BY WHICH THE KERNEL REACHES THE STORE.** **THE FLOW, IN FIVE STAGES AND NO SIXTH, EACH AT
ITS OWN HOME:**
1. **`Package surface → kernel`** — the four-position call **`a.write(address, tier, value)`** — the method form, the receiver being the store and no position of it an instance, re-spelled 2026-10-16 at this site — enters `K-2`, which RETURNS the record identity it
   opened or joined; **this call is the entry→kernel edge, and this item is its one home** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 — `K-2`'s signature and its return shape, cited and not restated).
2. **`Kernel → Rust store`** — the kernel calls the STORE's own write with the FIFTH POSITION SUPPLIED, the STORE's own five-position form that
   `docs/specs/storeroom-constraints/kernel-surface.md §1` item 5's dated extension declares; **THAT CALL IS THE KERNEL'S AND NOT THIS PACKAGE'S — the kernel and the store are Rust-side and no `instance` position of THIS surface's ten methods is involved — so this stage declares no JS call shape at all, its spelling standing at the kernel-surface site it cites and re-emitted nowhere here.**
3. **`Rust store → kernel`** — the store returns the write's result to the kernel, and the kernel evaluates
   the constraint set the store's list carries against it, exactly as `docs/specs/storeroom-constraints/contract.md §5`'s register pins that pass.
4. **THE KERNEL'S OWN STORE LEG IS THE ENTRY'S OWN WRITE.** **THE ENTRY IS THE ROUTE AND THE KERNEL IS THE
   DRIVER: a five-position call carrying a commit THIS INSTANCE HAS NOT ADOPTED as a record position is
   REFUSED by `§2.4` item 9 (g)'s class test before the store's write leg runs, so a five-position call can
   never start a second pass — and the call that carries an ADOPTED identity is `item 3`'s own.**
   **SO THERE IS NO RECURSION AND NEED NOT BE ONE:** the entry's four-position call opens the record, the
   kernel's five-position call is that same record's store leg, and a second five-position call carrying the
   same adopted identity JOINS THE SAME RECORD rather than opening a second one.
5. **THE TWO SUCCESS ARMS AND THE FAIL ARM, EACH DECLARED — `A122`'s own flow:**
   - **Success, NOT a `file`-tier write: `Kernel → listeners → report success to the package surface's
     caller`** — the listeners are delivered by `§2.7`'s window and `§2.4` item 8's instants, and the caller
     receives the write's three-member record (`§2.2`'s signature block).
   - **Success, a `file`-tier write: `Kernel → save command to Rust store → Rust store reports success to the
     kernel → listeners → report success to the package surface's caller`** — the save is the terminal arm's
     act, declared at `§2.11` and at no other site.
   - **Fail: `Kernel → rollback over the Rust store → report failure to the package surface's caller`** — the
     rollback is the kernel's own act over the attempt's ops, the listeners of the failing write are NOT
     delivered (`§2.7` item 7 (d)), and the caller receives the refusal.

**⟶ AND *"THE REFUSAL"* THE FAIL ARM ABOVE RECEIVES IS DECLARED BY ITS MEMBER SET, 2026-10-16, SO NO DRIVE IS LEFT TO CHOOSE BETWEEN TWO FORMS (`role_spec_writer`; `RCA-8(d)` ANNOTATE-BESIDE: the fail arm's sentence stands BYTE-FOR-BYTE above and is read THROUGH this clause; `A122` and `A123` of this date are its authority, and NOTHING ELSE of item 1's five stages moves).** **WHAT CROSSES IS THE SURFACE'S OWN TWO-MEMBER FORM — `{status, message}`, a THROWN PLAIN OBJECT OF EXACTLY THOSE TWO MEMBERS, `status` a member of the store's closed `16`-member set and `message` the store's own text — AND WHAT DOES NOT CROSS IS THE KERNEL'S THREE-MEMBER `{status, message, log}`, WHOSE `log` MEMBER STAYS THE ATTEMPT'S OWN RECORD AND IS REACHED BY NO JS CALLER ON THIS ARM.** **THE THREE GROUNDS, EACH AT ITS OWN FILE:** **(1) `docs/decisions.md` · `A120` (2), 2026-10-16, SCOPES THE IDENTITY RULE SO THAT ON A FAILED-ATTEMPT ARM THE STORE'S TWO-MEMBER THROWABLE CROSSES WHILE THE ATTEMPT'S OWN `outcome` ENTRY CARRIES THE KERNEL'S TOKEN — the two members and the one log entry are ON TWO SIDES OF THE BOUNDARY and never in one object a caller catches.** **(2) `docs/specs/storeroom-constraints/fail-surface.md §2`, the home `A120` (2) names, DECLARES THE STORE'S THROWABLE TO KEEP EXACTLY ITS TWO MEMBERS, `status` and `message`, on the arms a caller-side attempt can meet; and that directory's `§1.1` declares the kernel's three-member shape OF THE FAILURES THE KERNEL'S OWN ACT PRODUCED — so the two forms are two homes and not two readings of one.** **(3) THIS UNIT'S OWN `§2.5` DECLARES EXACTLY ONE FORM FOR A FAILURE THAT CROSSES THIS SURFACE, `{status, message}`, AND A THREE-MEMBER OBJECT CROSSING HERE WOULD BE A SECOND FORM IN ONE CHANNEL.** **SO THE KERNEL'S `log` IS NOT LOST AND NOT HIDDEN: it is the attempt's own record, declared at `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3 and at `fail-surface.md §1.1`, and NO CALL OF THIS SURFACE RETURNS, THROWS OR EXPOSES IT** (`[A2 docs/decisions.md` · `A120` (2), 2026-10-16; A3 docs/specs/storeroom-constraints/fail-surface.md §1.1 · §1.2 item 3 · §2; A3 docs/specs/storeroom-js/surface.md §2.5 and §2.11 clause 5; A3 `bindings/js/test/constraints-publication.test.mjs`'s `G3` — the finding this clause closes, its cells driven by that file's author and not by this one | state or fail-state declaration]`).

**⟶ AND THE ONE MEMBER THIS CLAUSE HAS SO FAR LEFT UNNAMED IS DISPOSED OF AT THIS DATE, 2026-10-16, BY NAME AND NOT BY SILENCE (`role_spec_writer`; `RCA-8(d)` ANNOTATE-BESIDE: the clause above stands BYTE-FOR-BYTE and is read THROUGH this one): THE FAIL ARM'S `status` MEMBER IS ***DELIBERATELY UNNAMED*** AT THIS SURFACE, AND THE REASON IS RECORDED HERE SO NO DRIVE ASSERTS A MEMBER THIS DIRECTORY DOES NOT DECLARE.** **THE CLAUSE ABOVE DECLARES THE FAIL ARM'S `status` AS *"a member of the store's closed `16`-member set"* AND NAMES NO MEMBER OF IT: the `member` IS NOT NAMED AT ANY OTHER HOME OF THIS DIRECTORY EITHER — no clause of `docs/specs/storeroom-js/**` mints, pins or spells one for this arm — AND THAT ABSENCE IS NOW A DECLARATION AND NOT AN OMISSION.** **THE THREE GROUNDS, EACH AT ITS OWN HOME:**
1. **THE ARM HAS TWO SUB-ARMS AND THE DIRECTORY DECLARES A MEMBER FOR ONLY ONE OF THEM.** **On the sub-arm where a STORE VERB failed, the `status` is the code THAT CALL'S OWN declared failure carries — the store's own member, carried verbatim** (`§2.5`'s single form and its status clause, `§2.17`'s `PAR-JS-17`, and `docs/specs/storeroom-native/contract.md §8.1`'s member set — **cited and not restated here**). **On the sub-arm `A122`'s own fail stage names — *"Kernel → rollback Rust store → report failure to package surface"* — THE STORE'S OWN CODE IS NOT THE CROSSING VALUE: on a constraint-check failure the pass refuses BEFORE the write is accepted, and the kernel's own token for that refusal is a `KC-1`…`KC-8` member of the CONSTRAINT unit's set, which is NOT a member of the store's closed `16`.** **A CLAUSE MAY NOT NAME A STORE MEMBER ON THIS SUB-ARM WITHOUT RE-DERIVING WHICH ONE THE KERNEL REPORTS, AND THAT SUBJECT IS THE CONSTRAINT DIRECTORY'S AND NOT THIS ONE'S.**
2. **THE KERNEL'S TOKENS MAY NOT BE SPELLED HERE.** `A122` refuses the kernel as a reachable export and keeps its five items INTERNAL, **and `docs/specs/storeroom-constraints/fail-surface.md §1.1`/`§2` declare the kernel's own token spelling `KC-1`…`KC-8` and the store's throwable separately — so a `KC` spelling printed at THIS surface would be a second, unowned home for the kernel's own vocabulary, and THIS clause declines to open one.**
3. **THE FORM IS WHAT THIS SURFACE OWNS AND THE MEMBER IS NOT.** **This surface's duty on the arm is THE FORM — `{status, message}`, exactly two members, a `THROWN` plain object — which `§2.5` already declares as the one form that crosses here; the MEMBER'S VALUE is the store's or the kernel's own and is read at its own home.** **NOTHING IS WIDENED AND NOTHING IS MINTED: the store's closed `16`-member set is NOT reached, widened or re-spelled by this clause, and no member is added to it.**
**WHAT A DRIVE MAY THEREFORE ASSERT AT THIS ARM, STATED SO THE CELL CAN BE DERIVED AND NOT GUESSED: (a) THE THROWN VALUE IS A PLAIN OBJECT WITH EXACTLY THE TWO MEMBERS `status` AND `message`; (b) `status` IS A `string` DRAWN FROM THE STORE'S CLOSED `16`-MEMBER SET — MEMBERSHIP AND FORM, AND NEVER A NAMED MEMBER; (c) THE KERNEL'S THIRD MEMBER `log` IS ABSENT AND IS NOT REACHABLE FROM ANY JS CALLER ON THIS ARM; (d) ON THE SUB-ARM WHERE A STORE VERB FAILED, `status` IS THAT CALL'S OWN DECLARED CODE AND A DRIVE MAY NAME IT; ON THE CONSTRAINT-CHECK SUB-ARM A DRIVE MAY NAME NONE, AND A CELL THAT NAMES ONE IS CLAIMING A VALUE NO CLAUSE OF THIS DIRECTORY DECLARES.** **AND THE `message` MEMBER'S OWN PROHIBITION IS CITED AND NOT RE-SPELLED: `item 4` BELOW IS ITS HOME, IT STANDS AS NO-OBSERVABLE, AND NO BYTE OF IT MOVES BY THIS CLAUSE** (`§2.12` item 4; `§2.5`; `§2.17`). **NO COUNT OF THIS SECTION MOVES: the stage list stays five, the member set of the crossed form stays two, the store's set stays `16`, and the kernel's extent stays `5`** (`[A2 docs/decisions.md` · `A122` · `A123` · `A120` (2), 2026-10-16; A3 docs/specs/storeroom-constraints/fail-surface.md `§1.1` and `§2`; A3 docs/specs/storeroom-constraints/kernel-surface.md `§2.1` item 3; A3 docs/specs/storeroom-js/surface.md `§2.5` and `§2.12` items 1 and 4 — the one form, the five stages and the prohibition cited here | state or fail-state declaration]`).

**THE WORDS OF THE AS-FILED `CLIENT-SIDE` SENTENCE THAT SURVIVE, AND THE WORDS THAT DO NOT, EACH NAMED SO
NEITHER IS LEFT TO INFERENCE.** **SURVIVING: *"The JS side holds the constraint functions"*** — still true,
the functions are JS values the construction's list carries and the package reaches; ***"the crossing this
subject needs is ALREADY IN the surface (`write` out, `rollback` in)"*** — still true as a MECHANICAL
statement, since both verbs remain declared and reachable; and ***"NO constraint verb, NO repair verb, NO
constraint parameter, NO constraint record and NO function-carrying parameter is declared"*** — true of the
STORE's own surface exactly as `§2.6`'s citation of `docs/specs/storeroom-native/contract.md §7.3` has it, and
**UNMOVED**. **SUPERSEDED, AND THEREFORE DISPLACED FROM `§2.6`: *"CONSTRAINT AND REPAIR EVALUATION IS
CLIENT-SIDE"*** — FALSIFIED FOR THE WRITE PATH by item 1, because the evaluation is the KERNEL's act inside
the pass; and ***"evaluate constraints AFTER a `write` returns"*** — FALSIFIED, because on the write path the
evaluation happens INSIDE the call, before it returns. **AND THE ONE SENTENCE THAT IS NOW READ THROUGH THIS
ITEM RATHER THAN DISPLACED, NAMED BECAUSE IT IS STILL THE ROW'S OWN: `parameter-semantics.md §2.18`'s
`evaluator` cell *"the caller — the evaluation is CLIENT-SIDE"* is RE-SPELLED AT ITS OWN ROW to name the
KERNEL for the write path and the caller on the read path, and that row's own dated clause of 2026-10-16 is
the operative statement of it** (this directory's own two homes: `surface.md §2.12` here, and
`parameter-semantics.md §2.18` there).

**2. `manageConstraints` — THE POST-CREATION CONSTRAINT ROUTE, ONE NAME CARRYING THE OPERATION — SUPERSEDED 2026-10-16 BY `A126`, AND ITS BYTES MOVED OUT BYTE-EXACTLY TO `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §2` (`RCA-8(g)`).** **THE OPERATIVE DECLARATION OF THE POST-CREATION CONSTRAINT SET IS THIS SECTION'S RE-DERIVED ITEM 2 BELOW, WHOSE THREE FUNCTIONS STAND WHERE THIS ONE NAME AND ITS `operation` POSITION STOOD; NO BYTE OF THIS ITEM IS RE-EMITTED THERE AND NO RULE IS TAKEN FROM IT.** **AND ITS REFUSAL HALF IS NOT LOST: the form the moved item's clause 1 declared — the JS `TypeError` with no `status` member and no `message` member of this unit's own — stands as the refusal form of `item 4` BELOW, whose reading this re-derivation does not amend, and the three functions' outside values take it at the same site.**
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: THE SUPERSEDED ARM TABLE THAT STOOD AT THIS SITE — the table whose three rows read `addConstraint(instance, pair, constraint)`, `constraintOn(instance, pair, constraint)` and `constraintOff(instance, pair, constraint)` and whose subjects were the three `operation` strings — HAS LEFT THIS FILE, together with its own tail sentence *"the instance's member set stays SEVEN, the module namespace stays ELEVEN … the `PAR-JS` set stays `26`"*, AND ITS AS-FILED BYTES STAND AT `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §15`, whose source path and `§` are named there and whose own header names the clause whose subject they were.** **THE OPERATIVE ARM TABLE, WHOSE SUBJECTS ARE THE THREE METHODS `item 2` DECLARES AND WHOSE EVERY POSITION CARRIES NO INSTANCE, STANDS AT THIS SECTION'S ITEM BELOW THAT RE-DERIVES IT; THE THREE METHODS' POSITIONS AND THEIR ARITY HAVE THEIR ONE HOME AT `§2.4` ITEM 9 (f)'s `A127` CLAUSE OF THIS DATE — whose ten-method table prints, for each of the ten, its arity and its positions in declared order — and that item and item `2` clause (a) read it and introduce no second spelling of it.** **AND THE RECEIVER IS THE STORE: no position of `addConstraint`, `constraintOn` or `constraintOff` is an instance, at this section or at any other site of this unit** (`§2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's `A127` clause; `parameter-semantics.md §1`'s clause of this date).

**⟶ AND THE PRE-CONDITION `item 3`'s SECOND ANSWER RESTS ON — *"a pair the entry does not carry"* — IS DECLARED AT THIS DATE, 2026-10-16, SO A BATCH-POPULATED PAIR IS A NAMEABLE PAIR AT EVERY SURFACE FUNCTION AND NOT A CASE A DRIVE MUST GUESS (`role_spec_writer`; `A: docs/decisions.md` · `A126` — *"Batch supplied during the store creation"* and *"Added with package surface functions - overwrites if ID already exists"* — read with `A122` and `A123` of the same date; `RCA-8(g)`: the three-method arm table's rows stand BELOW at this section's item `3` and are read at the two positions the receiver ruling leaves).**
**(a) THE PRE-CONDITION, DECLARED ONCE AND CITED AT EVERY SITE THAT NEEDS IT: THE ENTRY CARRIES A PAIR IF AND ONLY IF A FUNCTION STANDS REGISTERED AT THAT PAIR IN THE KERNEL'S OWN PAIR-KEYED REGISTRY — `(address, id)` — WHOSE ONE HOME IS `docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4 (`register`'s `K-1`, keyed by the pair, returning the handle the store's own listener machinery holds for that `address`).** **THE PAIR ALONE IS NOT CARRIAGE: `item 1`'s own sentences make the KEY the element's addressing and the FUNCTION its substance, and `K-1`'s signature takes the `constraint` at its FOURTH position with no optional form, so a pair with nothing registered at it is a KEY the entry does not hold and NEVER a carried pair whose function is empty.**
**(b) THE ROUTE THAT POPULATES THE REGISTRY IS `item 1`'s BATCH AS MUCH AS THE SURFACE'S OWN FUNCTIONS — `storeCreate` REGISTERS EACH OF `cfg.constraints`' ELEMENTS THAT CARRIES ITS OWN FUNCTION AT `K-1`, AT THE INSTANCE IT IS CONSTRUCTING, AND THAT ACT IS THE CONSTRUCTION'S OWN AND IS THE ONE `item 1` CLAUSE (iii) LEAVES UNCLAIMED WHEN IT SAYS THE BATCH IS *"read at the store's two validation instants"*:** **the store VALIDATES the list and holds no function at any position — `DD-16`'s *"the store's own surface takes no function at any position"* — so the registration is the ENTRY'S, performed at `storeCreate`, and it is the SAME `K-1` call the surface's ADD route makes.** **(`parameter-semantics.md §2.21`'s `evaluator` cell — *"the package passes the key through WITHOUT adding a default, a rename or a validation of its own"* — is UNMOVED and is not excepted: registering the ELEMENT'S OWN FUNCTION is neither a default, nor a rename, nor a validation.)**
**(c) SO THE THREE DETERMINATIONS THIS GAP OWED, EACH ANSWERED AND EACH OBSERVABLE:**
   1. **`constraintOff` AND `constraintOn` DO REACH A BATCH-POPULATED PAIR.** **A pair `storeCreate` registered from the batch IS *"a pair the entry carries"* under (a), and it is carried on the SAME footing as a pair the ADD route registered: `a.constraintOff({ address, id }, fn)` at a batch pair DISABLES it and returns `undefined` — NOT the `TypeError` of `item 3`'s second answer — and `a.constraintOn` at the same pair re-enables it** (the receiver is the store; the two positions are `pair` and `constraint`, `§2.4` item 9 (f)'s `A127` clause). **THE OBSERVABLE A DRIVE ASSERTS: a write that the batch element's function refused while the pair was enabled is NOT refused after `constraintOff`, and IS refused again after `constraintOn`; and NO function of the caller's is carried by either toggle — the toggle passes the element's existing function through, which is why (a)'s definition and not the toggle's own arguments decide carriage.**
   2. **`addConstraint` AT A BATCH PAIR TAKES THE `A126` OVERWRITE AND NOT A DIFFERENT ROUTE.** **A pair the batch populated is a HELD pair within `A126`'s own words — *"overwrites if ID already exists"* — and the ID the batch supplied IS the ID that already exists; so `a.addConstraint({ address, id }, g)` at a batch pair REPLACES the batch's function with `g` at the SAME pair, returns the SAME identity `item 2` clause (b) declares for any added pair, and REFUSES NOTHING.** **NO SECOND ROUTE, NO THIRD ROUTE AND NO REFUSAL EXISTS BETWEEN THE TWO: the two routes do not substitute for each other (`item 1` clause (iii)), but at one and the same pair the LATER supply stands and the earlier does not.**
   3. **THE OBSERVABLE A DRIVE ASSERTS FOR 2: after `addConstraint` at a batch pair, a write the BATCH's function would have refused is NOT refused by it, and the batch's function is INVOKED NO FURTHER — its invocation count on that pair after the overwrite is `0`, and the added function's own count is `1` per write that reaches the pair.** **`storeCreate`'s return is unchanged, the identity is the same pair-keyed opaque value, and `constraintOff`/`constraintOn` thereafter act on `g` and not on the batch's displaced function.**
**(d) AND THE ONE BATCH CASE THAT IS NOT A CARRIED PAIR, DECLARED HERE BECAUSE (a) DECIDES IT AND `item 1` CLAUSE (i) IS RE-DERIVED AT THIS SAME DATE:** **a `cfg.constraints` ELEMENT THAT CARRIES NO FUNCTION IS A WELL-FORMED PAIR THE STORE ADMITS AND IS **NOT** A CARRIED PAIR — `storeCreate` registers no element that carries nothing, `K-1` takes no `constraint`-less call, and `item 3`'s second answer therefore REFUSES both toggles at that pair with ONE THROWN `TypeError` (the `status` member ABSENT).** **NO PAIR IS LEFT ENABLED WITH NO FUNCTION BY THIS READING: an element the batch supplied a function WITH is carried and toggles act on it; an element the batch supplied WITHOUT one is admitted by the store's list rule and is reached by NO function at all — which is exactly the state `item 3`'s second answer refuses to create and never the state it creates.** **A DRIVE THAT CONSTRUCTS SUCH A STORE ASSERTS `item 3`'s TABLE AT NO PAIR OF IT and reads the store's own acceptance at the store's own home.**
**⟶ `RCA-8(g)` RE-SPELLED 2026-10-16: THIS CLAUSE'S CLOSING COUNT SENTENCE — *"the instance's member set stays SEVEN, the module namespace stays ELEVEN, the store's closed set stays `16`, the kernel's extent stays FIVE and the `PAR-JS` set stays `26`"* — IS SUPERSEDED AS A FIGURE SET AND IS READ THROUGH THE OPERATIVE ONE, ITS AS-FILED BYTES STANDING ABOVE AND STANDING SUPERSEDED: THE OPERATIVE FIGURES ARE THE PRODUCT'S TWELVE OWN MEMBERS `10 + 1 + 1 = 12` ✓, THE MODULE NAMESPACE'S ONE NAME `storeCreate` `11 → 1` ✓, THE STORE'S CLOSED SET `16` ✓, THE KERNEL'S EXTENT `FIVE` ✓ AND THE `PAR-JS` SET `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓.** **THEIR HOMES ARE `§2.4` item 9 (f)'s and `§2.9` item 1's `A127` clauses of this date and `parameter-semantics.md §1`'s clause of this date, and this clause re-derives none of them.** **AND THE ONE READER THIS CLAUSE ADDS IS A CITATION AND NOT A RESTATEMENT: every site of this section, of `§2.9` item 1's `A127` clause, of `§2.4` item 9 (f)'s `A127` clause and of `parameter-semantics.md §2.22`–`§2.25` that reads *"a pair the entry carries"* READS IT THROUGH THIS CLAUSE, AND THIS CLAUSE IS ITS ONE HOME** (`[A2 docs/decisions.md` · `A127` · `A126` · `A123` · `A122`, all 2026-10-16; A3 docs/specs/storeroom-js/surface.md `§2.12` item 1 clauses (i) and (iii) and item 3's second answer; A3 docs/specs/storeroom-js/parameter-semantics.md `§1`, `§2.21`, `§2.22` and `§2.24` — the batch's domain, the function and the key; A3 docs/specs/storeroom-constraints/kernel-surface.md §2.2 item 4 — the pair-keyed registry carriage is defined at | declared parameter semantics]`).

**⟶ AND THE TWO QUESTIONS THE LAST PASS'S OTHER TWO ROWS LEFT OPEN ARE ANSWERED HERE, EACH WITH ITS REASON, BECAUSE AN IDEMPOTENT TOGGLE AND A THROWING TOGGLE ARE TWO DIFFERENT CLAUSES AND THIS TABLE DECLARES WHICH (`role_spec_writer`, 2026-10-16).** **(1) A TOGGLE REACHED WHERE THE PAIR ALREADY STANDS IN THE STATE THE TOGGLE ASKS FOR IS IDEMPOTENT SUCCESS: `constraintOn` at an ENABLED pair and `constraintOff` at a DISABLED pair each return `undefined`, leave the pair's state and its element EXACTLY as they stood, and THROW NOTHING.** **THE REASON, AND IT IS THE RULING'S OWN PRINCIPLE: `A126` settles the ADD route's `held` case as *"overwrites if ID already exists"* — the route WRITES THE STATES IT IS ASKED FOR rather than refusing to reach them — and the toggle pair is that same route's own pair; a caller that asks for a state the pair already carries gets that state, and the observable it asserts is the pair's state and never a throw.** **(2) A TOGGLE NAMING A PAIR THE ENTRY DOES NOT CARRY — at either function, in either direction — IS AN OUTSIDE VALUE AND TAKES `item 4`'s REFUSAL: ONE THROWN `TypeError`, the `status` member ABSENT, AND THE ENTRY IS NOT WIDENED.** **THE REASON: THERE ARE TWO ROUTES TO POPULATE A CONSTRAINT, DECLARED AT `item 1`, AND THE TOGGLE PAIR IS NEITHER OF THEM; a toggle that added an element while carrying nothing to put in it would be a THIRD route, and it would leave a pair ENABLED WITH NO FUNCTION — a state no clause of this directory declares, since an element's function comes from the ADD route or from the BATCH and from nowhere else.** **THE SUPERSEDED READING IS NAMED: the last pass declared BOTH of these cases a THROW — the `'add'`-at-a-held-pair row and the two `same-state` rows alike — and that first of the three is FALSIFIED by `A126` while the last two are WITHDRAWN by this clause for the reason printed above.** **NEITHER WITHDRAWAL MOVES ANY COUNT: the three functions', the refusal form's and `item 4`'s `message` prohibition are untouched, and the arm table above now answers THREE OF THREE rather than two of three** (`[A2 docs/decisions.md` · `A126` · `A123` · `A122`; A3 docs/specs/storeroom-js/surface.md §2.12 items 2, 4 and 5; A3 docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1; A3 archive/reviews/2026-10-16-constraints-publication-gate1.md §20 | state or fail-state declaration]`).

**⟶ AND THE LAST PASS'S VIOLATED-PRE-CONDITION TABLE HAS MOVED OUT WITH IT, BYTE-EXACTLY, TO `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1`, TOGETHER WITH ITS OWN *"SECOND COLUMN IS CLOSED"* CLAUSE AND THE TWO ORDERING CLAUSES THAT DISPOSED OF ITS THREE ROWS — ITS FIRST ROW'S `TypeError` AT A HELD PAIR BEING THE RULING'S OWN FALSIFICATION, AND ITS TWO SAME-STATE ROWS BEING THE WITHDRAWAL ITEM 3's OPERATIVE TABLE DECLARES.** **THE REFUSAL'S FORM, HOWEVER, IS NOT THE TABLE'S AND DOES NOT MOVE: the JS `TypeError` of `§2.4` item 5 (d)'s registration site — ONE class, its `status` member ABSENT, no `message` member of this unit's own — is the form EVERY outside value of `pair`, of `constraint` and of `instance` takes at the three functions above, and the store's closed `16`-member set is NOT minted, reached or widened by any of them** (`§2.12` item 4 below, whose reading is UNAMENDED by this re-derivation; `§2.4` item 9 (g)'s class test; `§2.5`'s single form; `docs/specs/storeroom-native/contract.md §8.1`). **NO BYTE OF THE MOVED TABLE IS RE-EMITTED HERE AND NO RULE LIVES AT THE FILE IT MOVED TO** (`RCA-8(g)`).

4. **THE REFUSAL — THE PACKAGE'S OWN CLASS TEST AT THE THREE METHODS' EVERY POSITION, IN THE FORM `§2.4` ITEM 9 (f)'s CLAUSE OF THIS DATE DECLARES AS RULE (ii), AND IT ADDS NO CODE AND NO MESSAGE.** **`RCA-8(g)` ARCHIVAL MOVE, 2026-10-16: THE `instance`-SELECTOR CLAUSE THIS ITEM CARRIED, WHOSE LIVE TEXT STILL NAMED `manageConstraints` AND AN `operation` POSITION AND WHOSE SUBJECT `A127` REMOVES OUTRIGHT, IS MOVED OUT BYTE-EXACTLY to `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §4`, whose source path and `§` are named there; NO BYTE OF IT IS RE-EMITTED HERE.** **THE OPERATIVE REFUSAL, DECLARED AT THE THREE METHODS THE RECEIVER RULING LEAVES:** **AN OUTSIDE VALUE OF `pair` OR OF `constraint` — every value `parameter-semantics.md §2.24`'s and `§2.22`'s outside-value cells name, and a POSITION BELOW THE DECLARED ONE, since neither position is optional — THROWS THE JS `TypeError` OF `§2.4` item 5 (d)'s REGISTRATION SITE: ONE class, ITS `status` MEMBER ABSENT, AND NO `message` MEMBER OF THIS UNIT'S OWN — AND NOTHING IS ADDED, ENABLED, DISABLED OR OTHERWISE CHANGED: no store call is made, no pair's element is overwritten, no journal entry is appended and no code is minted.** **AND THE STORE'S CLOSED `16`-MEMBER SET IS UNTOUCHED BY THE THREE METHODS: none of them mints a code, and every code this surface can throw remains a member of the SET the store's own contract closes** (`§2.4` item 5 (d); `§2.4` item 9 (g)'s class test; `§2.5`'s single form, whose two-member `{status, message}` shape is the VERB-side crossing and is NOT the shape these three take; `parameter-semantics.md §2.17`; `docs/specs/storeroom-js/contract.md §0.1` item 9; `docs/specs/storeroom-native/contract.md §8.1`). **AND THE `instance`-POSITION CLAUSE `parameter-semantics.md §2.23` CARRIED HAS NO SUBJECT FROM THIS DATE: that position does not exist at any call of this surface** (`§2.9` item 1's `A127` clause; `parameter-semantics.md §2.23`'s own clause of this date).

   **⟶ AND THE DEFECT `DEF-2026-10-16-O` THIS SECTION OWNED IS ANSWERED IN THIS UNIT'S OWN FILES BY THIS PASS, STATED SO THE ANSWER IS VERIFIABLE AND NOT ASSERTED (`role_spec_writer`, 2026-10-16; `A: docs/decisions.md` · `A127`).** **THE DEFECT'S TWO LIMBS WERE: (a) a live sentence of THIS item that still named the superseded `manageConstraints` name and its `operation` position, and (b) a withdrawn sentence RECORDED UNDER THE RETIRED `RCA-8(d)` ANNOTATE-BESIDE SPELLING at this section, whose byte a citation could still reach.** **BOTH LIMBS ARE ANSWERED AT THEIR OWN SITES AND NEITHER WAS PAPERED: (a) THIS ITEM IS RE-DERIVED and the `instance`-selector clause that carried the superseded name IS MOVED OUT BYTE-EXACTLY to `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §4`, with its live declaration — the `TypeError`, its absent `status` member and its no-message rule — RE-DECLARED at this item's own bytes; (b) the retired spelling is NOT USED BY THIS PASS AT ANY SITE — `RCA-8(g)` is the form this pass authors in, and every move-out this pass declares cites `RCA-8(g)` and no other spelling.** **AND THE ROW ITSELF IS NOT THIS PASS'S TO CLOSE: `docs/defects.md` is outside this unit's wall, so the row's own state is REPORTED IN THIS PASS'S DIGEST and the closure is a TRACKER LANDING OWED BY THE SUPERVISOR** (`docs/defects.md` · `DEF-2026-10-16-O`; `RCA-8(g)`).

   **⟶ AND THE `message` HALF OF THIS ITEM'S PROHIBITION IS DISPOSED OF EXPLICITLY, 2026-10-16, SO NO DRIVE IS LEFT LOOKING FOR AN ASSERTION IT CANNOT MAKE (`role_spec_writer`; `RCA-8(d)` ANNOTATE-BESIDE: the item above stands BYTE-FOR-BYTE and is read THROUGH this clause, which withdraws nothing of it and widens no arm).** **THE PROHIBITION IS THE PHRASE *"no `message` member of this unit's own"*, AND IT IS A DRAFTING PROHIBITION CARRYING NO OBSERVABLE OF ITS OWN — AND IT IS LAWFUL BECAUSE ITS WHOLE FORCE IS THE ONE OBSERVABLE THAT CAN BE TAKEN, WHICH IS THE `status` MEMBER'S ABSENCE.** **WHY NO SEPARATE OBSERVABLE EXISTS, AT ITS OWN TERMS: what the phrase forbids is WHAT THIS UNIT MAY MINT, and PROVENANCE IS NOT A PROPERTY OF A THROWN VALUE — a `TypeError` the host mints carries a `message` string of the host's own, nothing in that string is this unit's, and no clause of this directory declares this unit's message TEXT anywhere, so a drive holding the thrown value cannot read whose the string is and no assertion over its content can be derived from this directory** (`§2.4` item 5 (d)'s read-through of the store's `{status, message}` form, the site at which the two halves part; `§2.4` item 9 (b) — the ONE site whose refusal REQUIRES a string `message` and does not forbid it; `parameter-semantics.md §2.17` — the thrown `{status, message}` of a VERB, unmoved). **AND THE OBSERVABLE THE PROHIBITION DOES CARRY IS DECLARED, SO THE PHRASE IS NOT READ AS IDLE: the refusal's `status` member is ABSENT — that is the class test's own mark and the one thing a drive asserts — and the prohibition on a unit-minted `message` is the reason the two-member `{status, message}` VERB form is NOT what crosses here** (the form clause of item 3 above; `§2.5`'s single form). **NO CELL OF `bindings/js/test/constraints-publication.test.mjs` IS MINTED BY THIS CLAUSE AND NONE IS OWED BY IT: that file's `G4` reports the same absence and asserts nothing of the string, which is the correct reading of this cell rather than a gap in it** (`[A2 docs/decisions.md` · `A123`; A3 docs/specs/storeroom-js/surface.md §2.12 items 3 and 4, §2.4 items 5 (d) and 9 (b); A3 `bindings/js/test/constraints-publication.test.mjs`'s `G4` | prohibition — no observable of its own, and the reason declared]`).

 5. **THE IDENTITY IT RETURNS, AND WHAT IDENTITY THE ARM CARRIES.** **The returned constraint identity is
   `PAR-JS-23`'s domain, and it is an OPAQUE value the package owns: this unit declares no spelling for it,
   no accessor reaching a member of it, and a drive compares identities and never contents** (`§2.3` item 1's
   token-domain rule, read at this identity and not widened by it). **AND IT IS NOT ADDED TO `cfg.constraints`:
   the construction's key is read ONLY at the two validation instants `parameter-semantics.md §2.21`
   declares, and this verb is the POST-CREATION route that key does not carry** (`A123`: *"after store
   creation"*; `A121`).
6. **WHAT THIS SECTION DOES NOT DO.** **It re-decides no rule and moves no count of the typed register: the
   register keeps its `8` rows (`contract.md §5.0`), the store's closed set keeps its `16`, the addon's export
   set keeps its `5`, the store's own namespace keeps its `8` verbs, and the store's constraint list — its
   `{ address, id }` pairs — is READ by the kernel and never written by this verb at any instant** (`A123`;
   `A122`; `docs/specs/storeroom-native/contract.md §7.1`). **The TWO counts this pass moves, and no third,
   are named and re-derived at their own clauses: the module namespace's `8 → 9` (`§2.9` item 1's dated clause
   of this date) and the `PAR-JS` set's `21 → 23` (`parameter-semantics.md §1`'s clause of this date).**
   (`[A2 docs/decisions.md · `A122` · `A123` · `A124` · `A125`, all 2026-10-16; A3
   docs/specs/storeroom-constraints/kernel-surface.md §1 item 5 and §2.1 items 1–3; A3
   docs/specs/storeroom-js/surface.md §2.2 · §2.4 item 9 (g) · §2.5 · §2.9 item 1 · §2.11;
   archive/reviews/2026-10-16-constraints-publication-gate1.md §17–§19 | state or fail-state declaration]`).

**⟶ RE-DERIVED 2026-10-16 — ITEM 2's ONE NAME AND ONE OPERATION POSITION ARE SUPERSEDED BY `A126`, AND THE OPERATIVE DECLARATION OF THE SURFACE'S POST-CREATION CONSTRAINT SET IS THIS ITEM (`role_spec_writer`; `A: docs/decisions.md` · `A126`, 2026-10-16, `ACTIVE`, whose words are *"Added with package surface functions - overwrites if ID already exists. Surface includes on/off to enable/disable, similar to listeners"*).** `RCA-8(g)`: **the superseded declaration's bytes — the `manageConstraints(instance, pair, operation)` signature block with its three arms, its declared arity sentence and its membership clause — are MOVED OUT byte-exactly and stand at `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §2`, whose source path and `§` are named there; the ONE-LINE POINTER stands at the `§2.12` header clause, and NO BYTE OF THAT DECLARATION IS RE-EMITTED HERE.**
1. **THE TWO ROUTES, DECLARED AS TWO, AND NEITHER SUBSTITUTES FOR THE OTHER (`A126`'s first sentence: *"Two means of populating constraints"*).** **(i) THE BATCH ROUTE — `cfg.constraints`, supplied at `storeCreate`.** **`cfg`'s FOURTH declared key carries a LIST OF ELEMENTS, one element per `{ address, id }` PAIR (`PAR-JS-21`), and each element carries that pair's constraint FUNCTION alongside its KEY — the key is `{ address, id }`, the element is the pair PLUS the function.** **THE FUNCTION'S ORIGIN IS HERE, AND THIS SENTENCE IS THE ANSWER TO THE GAP THE RED SET RAISED: *"nothing declared where an added constraint's function comes from"* — AN ADDED CONSTRAINT'S FUNCTION COMES FROM THE ADD ROUTE'S OWN ARGUMENT (`item 2` clause (a)), AND THE BATCH ROUTE'S ELEMENT CARRIES ITS OWN BY THE SAME ACT OF SUPPLY; so `PAR-JS-21`'s *"one element per `{ address, id }` pair"* READS THE PAIR AS THE ELEMENT'S KEY AND NEVER AS THE WHOLE OF THE ELEMENT — the element is `{ address, id, constraint }`, the constraint being the function the kernel evaluates at that pair.** **THE KEY IS THE ELEMENT'S ADDRESSING AND THE FUNCTION IS THE ELEMENT'S SUBSTANCE; a pair with no function is not an element and is refused at the store's own `ConstraintListInvalid` (`parameter-semantics.md §2.21`, whose cells stand UNMOVED and whose pair clause is settled at its own dated clause of this date).**
   **⟶ RE-DERIVED 2026-10-16 (`role_spec_writer`; `A: docs/decisions.md` · `A126`; read with `A123` and `A122` of that date; `RCA-8(d)` ANNOTATE-BESIDE — the sentence above stands BYTE-FOR-BYTE and is read THROUGH this clause): THE SECOND HALF OF THAT SENTENCE — *"a pair with no function is not an element and is refused at the store's own `ConstraintListInvalid`"* — IS WITHDRAWN, AND ITS CLAIM IS FALSE AT TWO HOMES: THE STORE'S OWN VALIDATION DOMAIN, AND THE TWO PASSING CELLS THAT ALREADY READ IT AS FALSE.** **THE TWO CLAUSES ARE NOT TWO READINGS OF ONE RULE AND ONE OF THEM MUST GO. THIS CLAUSE DECIDES WHICH, AND IT DECIDES IT ON THE STORE'S OWN DECLARED DOMAIN, WHICH IS THE STRONGER EVIDENCE OF THE TWO:**
   1. **`parameter-semantics.md §2.21`'s `the values OUTSIDE it` CELL — DECLARED UNMOVED, AND THE OPERATIVE DOMAIN OF THE BATCH ROUTE — ENUMERATES *"an array carrying an element that is not a pair"*, *"a pair whose `address` lies outside `§1.5`'s segment array"* and *"a pair whose `id` is absent or not a `string`"*, AND NAMES THE FUNCTION AT NO POSITION.** **A WELL-FORMED `{ address, id }` PAIR WITH NO FUNCTION IS THEREFORE **NOT** AN OUTSIDE VALUE OF `cfg.constraints` AND IS **NOT** REFUSED AT `ConstraintListInvalid` — that code's triggers are the element's SHAPE, its `address` and its `id`, and NOTHING ELSE; the store holds no function at any position and can check none** (`DD-16`).
   2. **AND THE CELLS ALREADY SAY SO BY PASSING: `bindings/js/test/constraints-publication.test.mjs`'s `S-CONSTRAINTS-KEY` group — `fts_S_CONSTRAINTS_KEY_one_well_formed_pair_constructs_and_the_pass_evaluates_it` and its two-pair sibling — ALREADY TAKE THE READING THIS CLAUSE DECLARES, and their reading is UNCHANGED by it.** **⟶ THE DETERMINATION, STATED SO NO TEST IS OWED A RE-DERIVATION IT DOES NOT OWE: THE PASSING CELLS ARE **NOT** SUPERSEDED AND OWE **NOTHING**.** **THE CLAUSE IS WHAT MOVED, BECAUSE THE CLAUSE IS THE SIDE THAT WAS WRONG — its *"is not an element"* half contradicting the very `PAR-JS-21` cell it cites and calls UNMOVED — and the general rule it violated is worth naming: A PASSING CELL IS NOT A LICENCE, BUT A CLAUSE THAT ITS OWN CITED CELL REFUTES IS NOT A LICENCE EITHER; the specification decides, and here its two halves refuted one another and the store's own declared domain broke the tie.** **THE TEST FILES ARE NOT THIS PASS'S AND NO BYTE OF THEM IS READ OR WRITTEN HERE; the cells stand as their author role derived them.**
   3. **WHAT A FUNCTIONLESS ELEMENT IS, DECLARED SO THE STATE IS NOT LEFT AS A HOLE:** **IT IS AN ELEMENT — the store's list rule admits it as a well-formed pair — AND IT IS NOT A **CARRIED PAIR**: no function stands registered at it, `storeCreate` registers no constraint-less element, and the toggles therefore refuse at it by `item 3`'s second answer. `item 3`'s own clause above, clause (d) of the carriage declaration, is that sentence's one home.** **SO TWO HALVES OF THE AS-FILED SENTENCE ARE KEPT AND ONE GOES: *"THE KEY IS THE ELEMENT'S ADDRESSING AND THE FUNCTION IS THE ELEMENT'S SUBSTANCE"* STANDS WHOLE ✓, AND *"refused at the store's own `ConstraintListInvalid`"* IS WITHDRAWN AND NAMED SUPERSEDED — never annotated beside, and never retained as a second reading.**
   **NO COUNT MOVES: the store's closed set stays `16`, its `ConstraintListInvalid` keeps its own triggers, `PAR-JS-21`'s cells stand UNMOVED, the batch route stays one of `A126`'s TWO, and the carriage definition at `item 3`'s clause above gains no term** (`[A2 docs/decisions.md` · `A126` · `A123`, 2026-10-16; A3 docs/specs/storeroom-js/parameter-semantics.md `§2.21` — the batch's domain, cited and not restated; A3 docs/specs/storeroom-native/contract.md `§8.1` #16 and `§8.2` — the member and its two validation instants, at their own home; A3 `bindings/js/test/constraints-publication.test.mjs`'s `S-CONSTRAINTS-KEY` group, READ and not written — the two cells that take this reading | state or fail-state declaration]`).
   **(ii) THE SURFACE-FUNCTION ROUTE — after creation, reached from the package surface.** **`A123`'s route EXISTS and is REACHABLE and its substance is UNTOUCHED by `A126`; what `A126` moves is the SHAPE: not ONE name with an `operation` position but THREE named functions, whose declared shapes are clause (a) below.**
   **(iii) THE TWO DO NOT SUBSTITUTE FOR EACH OTHER, AND THE REASON IS STATED SO NEITHER IS READ AS THE OTHER'S CONVENIENCE SPELLING: the BATCH is a CONSTRUCTION-TIME input — read at the store's two validation instants and NOT persisted (`parameter-semantics.md §2.21`'s `evaluator` cell) — while the ADD route is a POST-CREATION act over the entry's own set, reached by the consumer's call and by nothing the construction does.** **A store whose only constraints came from the batch has, by that fact alone, no post-creation route exercised; a store whose constraints were added after creation has, by that fact alone, no batch element.**
2. **THE SURFACE'S POST-CREATION SET, IN THE SHAPE `listen`/`unlisten` PINS — an ADD route, and an `on`/`off` pair, each address-and-id-keyed.**
   **(a) THE DECLARED SIGNATURES, AND THE ARITY `item 4`'s class test is taken on:**
**RE-SPELLED 2026-10-16 — THE `instance` POSITION IS DROPPED AND THE RECEIVER IS THE STORE (`A127`); the as-filed three-position block stands byte-exactly at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §3`, whose source path and `§` are named there.** **The operative shapes, each with the TWO positions the receiver ruling leaves:**
```
a.addConstraint(pair, constraint)    -> constraint identity   // the ADD route, which CARRIES the function
a.constraintOn(pair, constraint)     -> undefined             // ENABLE
a.constraintOff(pair, constraint)    -> undefined             // DISABLE
                    // a:          the object storeCreate(cfg) returned — THE RECEIVER, and not a position
                    // pair:       { address, id } — the pair's KEY, and the same key the batch element's key is
                    // constraint: the constraint FUNCTION the entry is to carry at that pair
```
   **(b) THE FUNCTION IS THE ADD ROUTE'S OWN ARGUMENT, AND THERE IS NO OTHER SUPPLY AT THIS ROUTE.** **`addConstraint`'s third position is the constraint function; the pair's element after a successful call is that function, and the kernel evaluates THAT function at that pair on every subsequent write.** **NO CLAUSE OF THIS DIRECTORY DECLARES A CONSTRAINT FUNCTION ARRIVING AT THE ADD ROUTE FROM ANYWHERE ELSE — not from the batch, not from a listener registration, not from the store — and a drive that reads an added constraint's body being invoked reads the function the caller supplied at this position and no other.**
   **(c) THE ENABLE/DISABLE PAIR'S VOCABULARY IS RECONCILED AGAINST THE KERNEL'S OWN INTERNAL PAIR, LAYER BY LAYER, AND THE RECONCILIATION IS THIS CLAUSE'S SUBJECT.** **`A126`'s pair is *"on/off to enable/disable, similar to listeners"*; the KERNEL's own pair is `{ register, on, off, settle }`** (`§2.4` item 9 (a)'s dated clause, read with item 7) — **so the two pairs CARRY THE SAME TWO WORDS AT TWO LAYERS, AND THE LAYERS ARE WHAT DECIDE WHICH SPELLING A CONSUMER MEETS:**
   - **THE KERNEL'S `on` AND `off` ARE ITS OWN INTERNAL STAGES — the kernel's consumer-side counterpart of the store's own `listen`/`unlisten` — and are INTERNAL ORCHESTRATION STAGES that no consumer reaches (`A122`: the kernel's items are not consumer API, and *"the kernel is supposed to be behind the published surface, not a separately reachable export"*). The KERNEL's `register(store, address, id, constraint)` is the item that carries a constraint function at that layer, and it is INTERNAL (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` items 1–5).**
   - **THE SURFACE'S POST-CREATION CONSTRAINT PAIR IS SPELLED `constraintOn` / `constraintOff`, AND IT SHARES THE KERNEL'S `on`/`off` VOCABULARY WITH THE CONSTRAINT SUBJECT SPELLED ON: the kernel's pair is address-and-constraint-keyed and the surface's pair is the SAME SHAPE at the consumer layer, so the two read as one vocabulary in two scopes.** **THEY MUST NOT BE THE BARE `on` / `off` AT THE MODULE NAMESPACE, AND THE REASON IS DECLARED RATHER THAN LEFT TO TASTE: `on` and `off` ARE ALREADY BOUND — AS THE *LISTENER* PAIR — at the surface's own `listen`/`unlisten` and at the instance object, and a module-namespace `on(instance, pair, constraint)` WOULD READ AS A THIRD SPELLING OF LISTENER REGISTRATION BESIDE `listen`/`unlisten`, IN THE ONE NAMESPACE WHERE BOTH SUBJECTS LIVE (`§2.9` item 1's dated clause carries the *"NEITHER `on` NOR `off` IS A NAMED EXPORT"* prohibition, and this clause neither moves nor narrows it).**
   - **SO THE PAIR IS ADDRESS-KEYED (`pair` carries the address, exactly as `listen`/`unlisten` key on the address), IT MIRRORS `listen`/`unlisten`'s two-verb shape (one verb reaches the state, its counterpart the other), and it is DISAMBIGUATED BY SUBJECT: `listen`/`unlisten` own the listener subject and `constraintOn`/`constraintOff` own the constraint subject.**
   - **AND IF THE ARCHITECT INTENDED THE BARE `on`/`off` SPELLING ITSELF, THAT IS A FRESH RULING AND NOT THIS PASS'S READING: it would put two names on the module namespace where `§2.1`'s own `(b)` clause and `§2.4` item 7's dated clause forbid them, and it would move the member-set figure a second time. THIS PASS DOES NOT TAKE THAT READING AND NAMES THE PATH RATHER THAN LEAVING IT IMPLICIT.**
3. **THE OPERATIVE ARM TABLE, WITH THE OVERWRITE THE RULING DECLARES, AND WITH EACH TOGGLE'S ANSWER STATED AS THE IDEMPOTENT ONE IT IS** — `RCA-8(g)`: **the last pass's three-arm table and its violated-pre-condition table, whose first row declared `'add'` at a HELD pair a throw of the one `TypeError`, are MOVED OUT byte-exactly to `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md §1` and are SUPERSEDED; the OPERATIVE table stands above, under the heading that re-derived it, and the two questions those two rows left open are answered there, each with its reason.**

**5. THE COLLISION BLOCK FOR THE THREE MINTED NAMES — the searched set, the hits, and the reconciliation, one row per name.** **This block is authored WITH the names and never after them** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii) — the collision block travels with the name it clears; `docs/specs/storeroom-js-adoption-dossier.md §2` — the form | requirement]`). **THE SEARCHED SET, NAMED ONCE AND APPLYING TO ALL THREE ROWS: (i) the module namespace this unit's `§2.9` item 1 declares — `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` (MINTED HERE) · `constraintOn` (MINTED HERE) · `constraintOff` (MINTED HERE), `8 + 3 = 11`; (ii) `listen` and `unlisten`, the pair this one mirrors; (iii) the instance object's own members as `§2.4` item 9 (f)'s dated clause of this date declares them — `{ register, on, off, settle, addConstraint, constraintOn, constraintOff }`, `4 + 3 = 7`; (iv) the KERNEL's FIVE internal items — `register` · `commit` · `runAttempt` · `log` · `report` — and the kernel's own `{ register, on, off, settle }` printing; (v) the store's own `8`-verb namespace; (vi) the BANNED VERB `constrain`, whose prohibition is recorded at `docs/specs/storeroom-constraints/adoption-dossier.md §3` row 2 and `§0.1` item 10; and (vii) the constraint vocabulary already printed at this surface — `cfg.constraints`, `ConstraintListInvalid` (the store's closed set's sixteenth member), the kernel's `constraint-check` entry kind and its own `K-1 register(store, address, id, constraint)` position.**

| The minted name | The searched set's result | The reconciliation, or why the hit is not one |
| --- | --- | --- |
| **`addConstraint`** — the ADD route | **NO HIT in (i)'s existing eight names, in (ii), in (iii)'s four pre-`A126` members, in (iv), in (v), in (vi) or in (vii).** **AND ONE MEASURED PRIOR-STATE HIT, NAMED: `bindings/js/greens/greens.mjs`'s `JSG-01.13` asserts *"no constraint verb and no repair verb is an own export"* by testing `!('addConstraint' in ns)`, read off `bindings/js/index.mjs`, whose eight exports `A123` measured.** | **The greens cell's assertion is the PRE-`A123` surface's, and `A123` and `A126` are the rulings that supersede it: `surface.md §2.6`'s *"NO constraint verb … is declared"* is FALSIFIED FOR THE WRITE PATH and its bytes are moved out to `backup/RCA-A122-2026-10-16-superseded.md §1`. The `add` half of the name is the ruling's own verb (*"Added with package surface functions"*) and the `Constraint` half is the constraint vocabulary's own subject, carried by (vii): one name, one subject, no second meaning.** **A GREENS FILE STILL ASSERTING THIS CELL IS A FINDING FOR ITS AUTHOR AND NOT A COLLISION OF THIS NAME** (`bindings/js/greens/**` is not this pass's to edit) |
| **`constraintOn`** — the ENABLE half | **NO HIT at the module namespace (i): neither `constraintOn` nor any `on`-spelling stands there, and (i)'s eight carry the LISTENER pair as `listen`/`unlisten`.** **A SHARED VOCABULARY HIT AT (iv),(iii): the bare `on` — which is exactly the hit this spelling exists to avoid.** | **The subject is spelled ON: `constraintOn` reads as *the constraint subject's `on`*, and the bare `on` it echoes is the KERNEL's internal pair and the instance's own member, neither of which is the module namespace this name joins. NO PROHIBITION IS RELAXED: the *"NEITHER `on` NOR `off` IS A NAMED EXPORT"* rule stands for the bare spellings and this name is not one of them** |
| **`constraintOff`** — the DISABLE half | **The same, clause for clause, `on` read as `off`.** | **The same, clause for clause: one pair, one subject, both halves spelled the one way, so the two names are one vocabulary and not two** |


**AND NOTHING ELSE OF THIS SECTION MOVES BY THE BLOCK ABOVE: the block clears three names; it moves no count, no arm, no refusal and no clause of items 1–4** (`[A2 docs/decisions.md` · `A127` · `A126`; A3 docs/specs/storeroom-js/surface.md §2.9 item 1's and §2.4 item 9 (f)'s clauses of this date; A3 `bindings/js/index.mjs`'s eight exports as `A123` measured them; A3 docs/specs/storeroom-constraints/adoption-dossier.md §3 row 2 and §0.1 item 10 | declaration of a searched set and its hits]`).


**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: the `A126` inventory region's AS-FILED BYTES — its *"ONLY TWO FIGURES OF THIS PART MOVE"* sentence and its seven-cell list — have LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §11`, whose source path and `§` are named there; no byte of them is re-emitted here, and the clause below is their place.** **AND THE `PAR-JS` SET THE DEPARTED REGION NAMED IS `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s clause of this date; no figure of the departed region's own readings stands.**
**⟶ AND THE CELL INVENTORY ABOVE IS RE-DERIVED THE SAME DATE BY `A127`, WHICH MOVES THE SAME TWO FIGURES ONCE MORE AND INCLUDES THE CELL THE `A126` PASS LEFT OUT (`role_spec_writer`).** **THE OPERATIVE STATEMENTS ARE NOW `§2.4` ITEM 9 (f)'s `A127` CLAUSE, READING TWELVE OWN MEMBERS `10 + 1 + 1 = 12`, AND `§2.9` ITEM 1's `A127` CLAUSE, READING ONE NAMED EXPORT — `storeCreate` — `11 → 1`; the `+3` at each of the superseded readings is displaced at both, and the TEN names that left the namespace became METHODS OF THE PRODUCT and not new members of a namespace.** **THE CITED BYTE RANGES MOVE WITH THE OPERATIVE STATEMENTS, BYTE-FOR-BYTE: the `§§`-numbers, the cells' own sentences and the *"EVERY CELL THAT REPORTS A MEMBER-SET READING ABOVE IS RE-SPELLED BY ONE CLAUSE, ONE BY ONE"* rule all stand.** **AND NO RULE IS RE-DECIDED AND NO EIGHTH CELL IS MOVED BY THIS RE-DERIVATION: the store's own `8`-verb namespace, the addon's `5` exports, the dispatcher's `8` tokens, the register's `8` rows, the kernel's five items, the store's closed `16`, and the seam's arity are all UNMOVED** (`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A123`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f)'s and §2.9 item 1's clauses of this date and §2.12 items 2–5 | numeric or census claim]`). **EVERY CELL THAT PRINTS EITHER FIGURE IS READ
THROUGH THE OPERATIVE STATEMENT, ITS AS-FILED BYTES STANDING WHERE THEY STAND AND NO RULE BEING RE-DECIDED:
`§2.1`'s clause at its member-set sentence; `§2.4` item 5 (a) at its *"member set is `{ register }`"*;
`§2.4` item 7 at its *"THE OPERATIVE DECLARATION IS `{ register, on, off }`"*; `§2.4` item 9 (e)'s clause
at its *"THE INSTANCE'S MEMBER SET STAYS `{ register, on, off, settle }`"* and at its *"the `PAR-JS` set's
`19`"*; `docs/specs/storeroom-js/surface.md §2.4` item 9 (f) — the cell that prints *"the instance's member set stays `{ register, on, off, settle }`"* — AND ITS COLLISION BLOCK at `docs/specs/storeroom-js/surface.md §2.12` item 5, whose DECLARED SEARCHED SET this clause re-spells below; `§2.11`'s clause 8 at its *"the instance's member set
stays `{ register, on, off, settle }`"* and at its *"the module namespace stays at `8` verbs"*; **and THE CELL THAT PRINTS THE PAIR — `§2.11`'s CLAUSE 7 at ITS OWN BYTES, whose *"the module namespace stays at `8` verbs, the instance's member set stays `{ register, on, off, settle }`"* is the ONE sentence of this part printing both figures — the list's earlier member *"`§2.11`'s clause 9 at the same pair"* being a FALSE POSITIVE OF THE SET AND NOT A CELL OF THIS SEARCH: clause 7 PRINTS both figures and clause 9 PRINTS NEITHER, declaring only a `Symbol.for(...)` key (`§2.11` clause 9 above).** **THE SET IS CORRECTED, NOT THE COUNT: one false positive leaves it (`§2.11` clause 9) and one false negative enters it (`§2.11` clause 7) — and this replacement is the LAST correction this region's list takes** (`role_spec_writer`; `RCA-8(g)` — the false positive named by its own `§` and the false negative named by its own `§`; the set, never the count). **⟶ AND A SECOND CELL IS ADDED TO THE INVENTORY RATHER THAN OMITTED, ONE THE `A126` PASS LEFT OUT OF IT: `docs/specs/storeroom-js/contract.md`'s *"the module namespace"* ROW OF THE `Q1` STATEMENT'S FIGURE TABLE — ITS POINTER CELL AT THAT DOCUMENT'S `§0.1` REGION AND AT ITS OWN `:224`, THE CELL THAT PRINTS *"NINE named exports at the module namespace"* AND *"FIVE own members on the instance"* OF 2026-10-16 AND IS READ THROUGH THIS CLAUSE AT `A127`'s FIGURES — ONE NAME AND TWELVE MEMBERS — NAMED HERE BECAUSE AN INVENTORY THAT OMITS A CELL IT READS IS HOW THE ESCAPE SURVIVES A SWEEP; **AND ITS `§`-POINTER IS CORRECTED WITH IT, THE PRIOR SPELLING *"`§3.1` OF `docs/specs/storeroom-js/contract.md`, THE CLAIMED REALM'S OWN SECTION"* HAVING NAMED A SECTION THAT PRINTS NEITHER FIGURE — the cell that DOES print them is the `Q1` statement's own pointer cell, and that document's `§3.1` is a DIFFERENT cell that carries figures of its own** (`RCA-8(g)` — the pointer re-spelling enumerated and checked off, never inferred from a byte diff); AND ONE POINTER IS CORRECTED RATHER THAN LEFT MIS-DIRECTED: THE CELL PRINTED ABOVE THAT NAMES `§2.4` ITEM 7 BESIDE ITS *"THE OPERATIVE DECLARATION IS `{ register, on, off }`"* SENTENCE POINTS AT `docs/specs/storeroom-js/contract.md §2.4` **ITEM 5**'s CLAUSE, WHERE THAT SENTENCE STANDS IN THAT FILE (`:1530`), ITEM 7 CARRYING THE TWO MEMBERS' OWN CLAUSES AND NOT THE DECLARATION'S SENTENCE — AND THAT CELL'S OWN MARK OF 2026-10-16 STANDS AT ITS OWN LIMB BELOW, NOT ONLY AT `docs/specs/storeroom-js/contract.md` `:224`** (`role_spec_writer`; `RCA-8(g)` — the pointer re-spelling enumerated and checked off, never inferred from a byte diff). **AND ONE CELL IS ADDED TO THE INVENTORY RATHER THAN OMITTED, WHICH THE `A126` PASS LEFT OUT OF IT: `§2.12` ITEM 5's COLLISION BLOCK, whose DECLARED SEARCHED SET is read AT `A127`'s FIGURES — limb (i)'s module namespace is `storeCreate` ALONE and not eleven names, limb (iii)'s product members are the TWELVE of `§2.4` item 9 (f)'s clause of this date and not seven, and limbs (ii) and (iv)–(vii) — `listen`/`unlisten`, the kernel's five internal items and its own `{ register, on, off, settle }`, the store's `8`-verb namespace, the BANNED VERB `constrain` and the constraint vocabulary — stand UNMOVED — SO THE INSTRUMENT THAT CLEARED THE THREE MINTED NAMES SEARCHES THE NAMESPACE THAT EXISTS.** **NO NINTH CELL AND NO ROW OF THAT BLOCK IS MOVED BY THIS PASS: the store's own `8`-verb namespace, the
addon's `5` exports, the dispatcher's `8` tokens, the register's `8` rows, the kernel's five items and the
seam's arity are all UNMOVED, and this clause moves no figure of any of them** (`[A2 docs/decisions.md` ·
`A127`; A3 docs/specs/storeroom-js/surface.md §2.4 item 9 (f), §2.9 item 1's clause of this date and §2.12 item 5's collision block | numeric or
census claim]`). **⟶ AND THE INVENTORY'S OWN COUNT IS RE-DERIVED BY ENUMERATION OVER THIS UNIT'S CORPUS, 2026-10-16 BY THIS PASS (`role_spec_writer`; `RCA-8(g)` — a count prints its searched set, and a set is built by enumeration and never by adding the cells a pass was handed): THE CELLS *"THE SEARCH IS EVERY CELL OF `docs/specs/storeroom-js/contract.md` …"* AND *"NINE DISTINCT CELLS (`7 + 2 = 9` ✓)"* STANDING ABOVE ARE FALSE AS PRINTED AND ARE READ THROUGH THIS CLAUSE, WHICH IS THE OPERATIVE COUNT.** **THE SEARCHED CORPUS, PRINTED: EVERY CELL OF THE TWO FILES THAT CARRY THIS UNIT'S `§2` — `docs/specs/storeroom-js/contract.md` AND `docs/specs/storeroom-js/surface.md` — THAT PRINTS ONE OF THE TWO SUPERSEDED FIGURES — A MODULE-NAMESPACE NAME COUNT OR AN OWN-MEMBER COUNT — WITH `backup/**` READ AS ARCHIVED BYTES AND DISPOSED OF BY ITS ARCHIVE STATUS, AND WITH THE ACCEPTANCE, PARAMETER AND TEST PARTS READ AND CARRYING NO CELL OF THIS CLASS.** **THE MEMBERS, ENUMERATED ONE CELL PER LINE, EACH SPELLED WITH ITS FILE AND ITS `§`:**
**1.** `docs/specs/storeroom-js/contract.md` `§0.1`, the `Q1` statement's *"the module namespace"* row, `:224` ✓marked.
**2.** `docs/specs/storeroom-js/contract.md` `§0.1`, the clause under that table, at its *"the module namespace stays at the `8` declared verbs"*, `:256` ✗unmarked.
**3.** `docs/specs/storeroom-js/contract.md` `§0.1`, the `A123`-pass clause's item 3, at *"`8 → 9` verbs"*, `:304` ✗unmarked.
**4.** `docs/specs/storeroom-js/contract.md` `§2`, the `A122`/`A123` dated claims clause, its pointer cell, `:1856`–`:1858` ✗unmarked.
**5.** `docs/specs/storeroom-js/contract.md` `§2.4` item 5 (a), at its *"`{ register }` — one own member, and NOTHING ELSE"*, `:1521`–`:1527` ✗unmarked as a cell, its `Q7` limb at `:1530` ✓marked.
**6.** `docs/specs/storeroom-js/contract.md` `§2.9` item 1, at *"the JS SURFACE IS EXACTLY … — `8` verbs — plus the returned records"*, `:1807`–`:1808` ✗unmarked.
**7.** `docs/specs/storeroom-js/contract.md` `§3.1`, at *"the entry's named exports are the `8` verbs of `§2.9` item 1 and NOTHING ELSE"*, `:1903`–`:1904` ✗unmarked as a cell, the section's re-derivation clause at `:1942` ✓marked.
**8.** `docs/specs/storeroom-js/contract.md` `§3.3`'s blind-run table, at *"named exports are EXACTLY the `8` verbs … and NO ninth"*, `:2912` ✗unmarked.
**9.** `docs/specs/storeroom-js/contract.md` `§3.3`'s same table, at *"returns an object whose entire OWN member set is `{ register }`"*, `:2913` ✗unmarked.
**10.** `docs/specs/storeroom-js/contract.md` `§7.3`'s row `28`, at *"the module namespace's `8` verbs"*, `:2964` ✗unmarked.
**11.** `docs/specs/storeroom-js/surface.md` `§2.1`, the `A127` clause's construction clause item 1, at `:885` ✗unmarked.
**12.** `docs/specs/storeroom-js/surface.md` `§2.1` (c), at *"the module namespace stays at the eight declared verbs"*, `:663` ✗unmarked.
**13.** `docs/specs/storeroom-js/surface.md` `§2.4` item 9 (f)'s `A116`-era duty clause, at *"FOUR own members"*, `:1013` ✗unmarked as a cell, the `RCA-8(g)` pointer at `:1022` ✓marked.
**14.** `docs/specs/storeroom-js/surface.md` `§2.6`, at *"the module namespace stays at the `8` declared verbs"*, `:907` ✗unmarked.
**15.** `docs/specs/storeroom-js/surface.md` `§2.11` clause 7, whose one sentence prints BOTH figures — *"the module namespace stays at `8` verbs, the instance's member set stays `{ register, on, off, settle }`"*, `:1511` ✗unmarked.
**16.** `docs/specs/storeroom-js/surface.md` `§2.12` item 5's COLLISION BLOCK, at limb (i)'s *"…… `8 + 3 = 11`"* and limb (iii)'s *"`4 + 3 = 7`"*, `:1661` ✗unmarked as a cell, the re-spelling clause at `:1679`–`:1680` ✓marked.
**SO THE COUNT FOUND IS `16` AND NOT `9`, AND THE COUNT IS CORRECTED RATHER THAN THE SET: `16` DISTINCT CELLS, ARITHMETIC `7 − 1 + 10 = 16` ✓ — the seven the earlier list carried, MINUS its one FALSE POSITIVE (`§2.11` clause 9, which prints neither figure) and PLUS the ten cells NO PRIOR INVENTORY CARRIED (`2`–`4`, `6`, `8`–`10`, `12`, `14`, `15`).** **AND ONE POINTER IS RE-SPELLED BY THIS PASS, ENUMERATED AS A REQUIREMENT LIST RATHER THAN INFERRED FROM A BYTE DIFF: (i) `§2.4` item 7 → `docs/specs/storeroom-js/contract.md §2.4` ITEM 5, already landed at the clause above and re-stated here so the row resolves; (ii) *"`§2.4` item 9 (f)'s COLLISION BLOCK"* → `docs/specs/storeroom-js/surface.md §2.12` item 5's COLLISION BLOCK, landed at the list above; (iii) *"`§3.1` OF `docs/specs/storeroom-js/contract.md`, THE CLAIMED REALM'S OWN SECTION"* → *"the `Q1` figure table's *«the module namespace»* row"*, landed at the clause above; and (iv) THE RETIRED SPELLINGS' OWN FIXED CITATION, `docs/specs/storeroom-js/contract.md §7` item 8, corrected at that cell to spell `docs/specs/storeroom-js/surface.md §2.12` item 5 with it.** **AND THE COUNT-PRINTED-TWICE SENTENCE THAT STOOD AT THE FOOT OF THE SUPERSEDED LIST — *"AND ONE CELL IS PRINTED TWICE IN THIS INVENTORY RATHER THAN ONCE … REPORTED HERE AS A COUNT DISCREPANCY AND NOT SMOOTHED"* — IS WITHDRAWN (`RCA-8(g)`: a false sentence leaves its cell and the cell carries a ONE-LINE POINTER, never the sentence beside its replacement), BECAUSE ITS PREMISE IS REFUTED BY FINDING: THE SEVEN-CELL LIST'S *"`§2.4` item 9 (f)'s collision block"* IS `docs/specs/storeroom-js/contract.md`'s CELL AND THE ADDED NINTH IS `docs/specs/storeroom-js/surface.md §2.12` item 5's (`:1661`) — TWO DISTINCT CELLS AND NOT ONE PRINTED TWICE — the archive's own head reading *"the region OMITTED `§2.12` item 5's COLLISION BLOCK"* (`docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §11`) and `docs/specs/storeroom-js/contract.md §7` item 8 naming the same block from the other side; THE ONE BLOCK IS ONE CELL, declaring one searched set of seven limbs; THE ARITHMETIC `7 + 2 = 9` ✓ IS DISPLACED AS A COUNT AND NOT AS A SUM; AND NO TENTH CELL IS MINTED BY THAT READING — the `16` this clause enumerates standing as the count and the superseded `9` standing as the `A126`/`A127` list's own reach.** **⟶ AND ONE FURTHER ESCAPE IS FOUND BY THIS PASS AND DISPOSED OF, SO IT IS NEITHER SILENT NOR COUNTED IN THE `16`: `docs/specs/storeroom-js/implementation-plan.md` CARRIES THREE CELLS THAT PRINT ONE OF THE TWO FIGURES — ITS `§9` PHASE TABLE'S `Q1` ROW (*"the two moved counts (`9` verbs and FIVE own members)"*), ITS `Q3`-GREEN ROW (*"`manageConstraints` is added as the ninth named export and the instance's FIFTH own member"*) AND ITS `Q3`-TYPES ROW (*"the NINE names and the FIVE own members"*) — AND THE PLAN IS NOT IN THIS INVENTORY'S DECLARED CORPUS, WHICH IS THE TWO FILES CARRYING THIS UNIT'S `§2`.** **THE THREE ARE FIXED IN PLACE BY THIS PASS (`RCA-8(g)`: each superseded phrase leaves its cell and the cell carries a ONE-LINE POINTER to `docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses and to the archives holding the displaced bytes), so the plan carries the prospective steps and the operative ONE name and TWELVE members and no superseded count.** **AND THE CLASS IS NAMED RATHER THAN LEFT TO A LATER READER: ANY CELL OF THIS UNIT'S OTHER PARTS AND OF ITS OTHER FILES THAT PRINTS ONE OF THE TWO FIGURES WITHOUT A MARK — `implementation-plan.md` ABOVE EXCEPTED AS FIXED — IS A FINDING OF THE NEXT PASS, WHOSE SEARCH MUST SPAN `crossing.md` · `package.md` · `acceptance.md` · `parameter-semantics.md` · `test-cases.md` AND `implementation-plan.md` AS THIS ONE SPANNED THE TWO `§2` FILES; A COUNT TAKEN OVER TWO FILES PRINTS TWO FILES** (`role_spec_writer`; `RCA-8(g)`). **NO RULE, NO FIGURE AND NO `§`-NUMBER OF THIS SECTION MOVES BY THIS RE-DERIVATION** (`role_spec_writer`; `RCA-8(g)` — the members enumerated at their own bytes, the count printing its searched corpus, and the withdrawal's pointer standing in the withdrawn sentence's place; `[A2 docs/decisions.md` · `A127` · `A128`; A3 docs/specs/storeroom-js/contract.md `§0.1`, `§2`, `§2.4`, `§2.9`, `§3.1`, `§3.3` and `§7.3`; A3 docs/specs/storeroom-js/surface.md `§2.1`, `§2.4`, `§2.6`, `§2.11` and `§2.12` | numeric or census claim]`).**

**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: THE SECOND COPY OF THIS SECTION'S CELL INVENTORY THAT STOOD AT THIS SITE — its opening *"AND THE CELL INVENTORY ABOVE IS RE-DERIVED … BY `A127`"* sentence with its operative statements of TWELVE members and ONE name, and its own closing *"all UNMOVED"* figures sentence — HAS LEFT THIS FILE, TOGETHER WITH THE `A126` RE-DERIVATION THAT STOOD BETWEEN THEM, whose *"SEVEN OWN MEMBERS `4 + 3 = 7`"*, *"ELEVEN NAMED EXPORTS `8 + 3 = 11`"* and `PAR-JS` set of `26` contradicted the operative `A127` clause, AND THEY STAND AT `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §16`, whose source path and `§` are named there; THE ONE-LINE POINTER STANDS HERE AND NO BYTE OF THEM IS RE-EMITTED.** **THE OPERATIVE CELL INVENTORY, ITS COLLISION-BLOCK LIMB AND ITS UNMOVED FIGURES ARE THE CLAUSE ABOVE, WHICH STANDS ONCE AND IS NOT REPEATED** (`[A2 docs/decisions.md` · `A127`; A3 docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §16 — the region this pointer resolves to | numeric or census claim]`).

---

**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: THE SECOND COPY OF THIS PART'S CLOSING SENTENCE THAT STOOD AT THIS SITE — its *"carries the contract's `§2` whole and declares nothing the contract does not already carry"* tail, re-emitted with its own `§C.11.6` authority citation — HAS LEFT THIS FILE AND NO BYTE OF IT IS RE-EMITTED; THE ONE CLOSING CLAUSE IS THE `END OF THIS PART` SENTENCE BELOW, WHICH STANDS ONCE** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no claim of its own | requirement]`).

**END OF THIS PART.** **It carries the contract's `§2` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the signatures and every authority citation are the contract
document's own — AND ONE EXCEPTION IS NAMED RATHER THAN LEFT TO A READER: `§2.11` ABOVE IS AUTHORED HERE, IN THIS PASS OF 2026-10-15, AND IS OWED ITS CARRIAGE INTO `docs/specs/storeroom-js/contract.md` BY THE AMENDMENT `docs/specs/storeroom-js/implementation-plan.md §10` DECLARES** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).

**⟶ AND THE SWEEP RECORD THIS PART POINTS AT, ADDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP
(`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves.** **The unit's divergence table
is the contract document's own `SW-1` clause, and the rows that touch THIS part are: the failure channel's ONE
form and the message's authority against a build whose JS path hand-authors messages and whose addon mints a
`TypeError` status and an unknown-verb status; `§2.4` rule 4's *"`unlisten` withdraws the registration, never
the function"* against a build that deletes the registry entry; `§2.4` item 5 (c)'s per-INSTANCE domain
against a build whose handle identity is token equality; `PAR-JS-12`'s declared invocation argument against a
zero-argument invocation; the registration site's still-`un-run` drive in the red set; and `§2.9` item 2's
`15`-code reachability (**⟶ RE-SPELLED 2026-10-15 BY THE `CODES`-CLASS SWEEP, `role_spec_writer`: the `15` is this clause's FILING-TIME figure and stands BYTE-FOR-BYTE above, read THROUGH this reading; `§2.9` item 2's own item is `16` TODAY — *"ALL `16` FAIL CODES REMAIN REACHABLE FROM JS"* — so the live pairing is the `16`-code set against the `10` the shipped JS arms reach, and the `10` stands as the measurement's own**) against the `10` the shipped JS arms reach.** **The verbs, the handle's two spellings,
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
cross-reference]`). **⟶ AND THE FIGURE THIS CLAUSE PRINTS IS SUPERSEDED AND IS READ THROUGH, 2026-10-16 (`RCA-8(g)`: the as-filed sentence stands BYTE-FOR-BYTE above and THIS clause is its mark): *"the module namespace stays at `8`"* IS THE `A123` PASS'S READING AT THIS CELL'S OWN DATE, and the operative figures are ONE named export — `storeCreate` ALONE, `11 → 1` ✓ — and TWELVE own members, `10 + 1 + 1 = 12` ✓, declared at `docs/specs/storeroom-js/surface.md §2.9` item 1's and `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clauses of that date, WHICH THIS CELL IS READ THROUGH; THE CELL IS CARRIED IN THE CELL INVENTORY AT THIS PART'S `§2.12` ITEM 5, ONE CELL PER LINE, AND THIS MARK STANDS AT THE CELL'S OWN BYTES SO NO FIGURE IS LISTED AS READ-THROUGH AND LEFT UNMARKED AT ITSELF; NO RULE, NO `DD` ROW, NO `PAR-JS` ROW AND NO PART ENTRY MOVES BY THIS MARK**

**⟶ RECONCILED 2026-10-11 — THE `Q8` DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`) ON THE JS CONVENIENCE ADD-ON, AT THIS PART: THE TWO NEW MEMBERS' CLAUSES READ AGAINST THE SHIPPED `onAt`/`offAt`, AND THE ONE ARM THAT HAD TO BE NARROWED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — `§2.1`'s dated clause with its `(a)`–`(d)`, `§2.3`'s dated clauses, `§2.4`'s rules 1–4 with item 5, item 6, item 7 and every dated clause, and this part's foot clause — and each is read THROUGH this clause; THIS clause is a PURE INSERTION: it adds no member, no verb, no `§`-number and no row, and it re-decides no rule.**
1. **`§2.4` ITEM 7 (a)'s THREE STEPS ARE THE SHIPPED SHAPE, IN THE DECLARED ORDER.** `bindings/js/index.mjs`'s `onAt(state, instance, address, listener)` calls `validateOnArguments(address, listener)` FIRST — and that function's own first statement is the `Proxy` decision, before `Array.isArray`, before any `.length` read and before any element read — then the store's own `listen`, then `state.registry.set(handle, listener)`; the return is the handle. **A refused `address` or a refused `listener` therefore leaves NO store-side entry, NO registry entry, NO node minted and NO journal entry appended, because steps 2 and 3 never run.** **THE HELD-ADDRESS ARM IS THE SHIPPED ARM: the store's own address-level idempotence answers the existing entry's handle, `state.registry.set` replaces the function for that same identity, and `DD-52`'s *"the registry does not record which member wrote an entry"* holds of the one map.**
2. **`§2.4` ITEM 7 (b)'s THREE STEPS AND ITS TWO REMOVALS ARE THE SHIPPED SHAPE, IN THE DECLARED ORDER.** `offAt(state, instance, handle)` encodes the handle FIRST — `encodeHandle(state, handle)`'s `Opaque` arm is the only one that passes, and every outside class answers the ONE form with the store's `AddressMalformed` — then calls the store's own `unlisten`, then calls `deregister(state, handle)`, whose whole body is `state.registry.delete(handle)` and nothing else. **SO THE `DD-54` OBSERVABLE HOLDS AT THE SHIPPED BYTES: on any refusal NEITHER removal is performed and the registry entry STANDS; there is no `finally` and none may be added.**
3. **AND THE NARROWED OWN ARM, WHICH IS THE ONE CELL THIS PASS READ AGAINST THE BUILD, RESTATED SO NO READER RE-DERIVES IT: the arm's as-filed observable claims the store-side home entry withdrawn and *"a later trigger no longer carries that identity"*; THAT HOLDS ONLY IN THE ONE-ENTRY STATE — which is every case in which the STORE MINTED the token — AND IN THE CALLER-SPELLED DUPLICATE STATE ONE `off` WITHDRAWS ONE ENTRY, the token's FIRST match, while THE TOKEN STAYS BOUND TO ITS REMAINING ENTRIES, so the identity may be returned by a later trigger and invoke NOTHING SILENTLY, which is rule 1's own declared observable.** **THE TWO HALVES OF THE AS-FILED SENTENCE ARE READ SEPARATELY — the store-side half true exactly of the one entry `off` names, the package-side half true of the IDENTITY — which is what item 7 (b)'s own dated clause prints; the narrowing is consistent with the shipped `offAt`/`deregister`, whose own comment states that the identity's token-to-handle binding STANDS.**
4. **AND ONE AMBIGUITY THIS PART'S OWN FOOT CLAUSE NAMES, RE-STATED BECAUSE A READER MEETS THE CITATIONS FIRST: THIS PART'S `§2.5` ITEM 5 IS THE VERBOSE CELL AND `contract.md §2.5` ITEM 5 IS THE ABSENT-OR-FAILED-ADDON STATE, so a BARE *"`§2.5` item 5"* is ambiguous across the two homes and every citation of the verbose cell in this directory is PATH-QUALIFIED (`docs/specs/storeroom-js/surface.md §2.5` item 5).**
5. **AND NOTHING ELSE MOVES: the module namespace stays at `8`, the register keeps its `8` rows with item 5 and item 6 unmoved, the `PAR-JS` set stays `18` FOR THIS PASS'S OWN DATE — its OPERATIVE count is `21` at `parameter-semantics.md §1`/`§2.20`–`§2.21` NO LONGER: **THAT LABEL IS WITHDRAWN 2026-10-16 BY THE GATE-2 SEVENTH REVIEWER-LOOP PASS, the `21` being the gate-2 close-out pass's 2026-10-15 reading and the OPERATIVE count being `PAR-JS-1`…`PAR-JS-25`, `23 + 2 = 25` ✓, whose ONE home is `parameter-semantics.md §1`'s count-correction clause of that date** — the `DD` family stays at `54` rows, and the ledger's census — an amendment being a ROW and never a unit — reads `2 DONE / 0 open` UNITS = `2` ✓ with THIS PASS MOVING NO COUNT. **⟶ AND THE FIGURE THIS LIMB PRINTS IS SUPERSEDED AND IS READ THROUGH, 2026-10-16 (`RCA-8(g)`: the as-filed limb stands BYTE-FOR-BYTE above and THIS sentence is its mark): *"the module namespace stays at `8`"* IS THE `Q8` PASS'S READING AT THIS CELL'S OWN DATE — the sentence's other figures standing unchanged — and the operative figures are ONE named export, `storeCreate` ALONE, `11 → 1` ✓, and TWELVE own members, `10 + 1 + 1 = 12` ✓, at `docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of that date; THE CELL IS CARRIED IN THE CELL INVENTORY AT THIS PART'S `§2.12` ITEM 5 AND ITS MARK STANDS AT THE CELL ITSELF, SO NO FIGURE IS LISTED AS READ-THROUGH AND LEFT UNMARKED AT ITS OWN BYTES**** **NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE: NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE, and the `APP` layer for this unit is `NONE`** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A1 docs/specs/storeroom-js-convenience-proposal.md `§8`; A3 `bindings/js/index.mjs`'s `onAt` · `offAt` · `validateOnArguments` · `deregister` — the clauses read at the code's own bytes; A3 docs/specs/storeroom-native/contract.md §0.2 · `DD-39`/`DD-42` — the lawful duplicate and the first-match withdrawal; A3 `archive/gate4/storeroom-js-convenience-adversarial.md` `§2` · `C-1`…`C-14` | state or fail-state declaration]`).
