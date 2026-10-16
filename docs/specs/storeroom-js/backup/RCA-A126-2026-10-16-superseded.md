# ARCHIVE — the bytes the `A126` re-derivation of 2026-10-16 moved out of `docs/specs/storeroom-js/`

**This file is the one home of the clause `docs/specs/storeroom-js/surface.md` displaced on `2026-10-16`** —
it NAMES its source path and its `§`, and it is written under `RCA-8(g)`: **the superseded bytes are MOVED
OUT byte-exactly and the source leaves a ONE-LINE POINTER, never the displaced text beside its
replacement.** **No rule lives here: this is the record of the clause that WAS, and a drive may assert
nothing from it** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a relocation carries its
text and moves no claim; `RCA-8(g)` — move out, leave a one-line pointer | requirement]`).

**THE RULING THAT DISPLACED THEM, CITED AND NOT RE-DERIVED HERE:** `docs/decisions.md` · **`A126`**,
2026-10-16, `ACTIVE` — *"Two means of populating constraints:"* · *"Batch supplied during the store
creation"* · *"Added with package surface functions - overwrites if ID already exists. Surface includes
on/off to enable/disable, similar to listeners"*. **THE OPERATIVE DECLARATIONS THAT STAND IN THEIR PLACE ARE
`docs/specs/storeroom-js/surface.md §2.12`'s RE-DERIVED ITEM 2 (the two routes and the three signatures), ITS
RE-DERIVED ITEM 3 (the operative arm table, with the overwrite and the two idempotent toggles), ITS ITEM 5
(the collision block for the three minted names), `§2.9` item 1's dated clause of that date (ELEVEN named
exports, `8 + 3 = 11`), `§2.4` item 9 (f)'s dated clause of that date (SEVEN own members, `4 + 3 = 7`), and
`docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of that date (`PAR-JS-1`…`PAR-JS-26`,
`23 + 3 = 26`).**

---

## §1. MOVED OUT OF `docs/specs/storeroom-js/surface.md §2.12` ITEM 3 — THE `manageConstraints` VIOLATED-PRE-CONDITION TABLE AND THE TWO ORDERING CLAUSES THAT DISPOSED OF ITS THREE ROWS (the region, as filed)

**Reason for the move:** **the table's FIRST ROW declared *"`'add'` at a pair the entry ALREADY CARRIES"* a
THROW of the one `TypeError`; `A126`'s declared answer is OVERWRITE — *"overwrites if ID already exists"* —
so that row is FALSIFIED BY THE RULING, and its two same-state siblings (`'disable'` at an ALREADY-DISABLED
pair, `'enable'` at an ALREADY-ENABLED pair) are WITHDRAWN by the operative arm table, whose toggles are
IDEMPOTENT at the state they ask for.** **The bytes, byte-exactly as they stood, with the opening clause,
the table and the two ordering clauses that followed it; the operative reading of the two same-state
subjects stands at `surface.md §2.12`'s re-derived item 3 and at NOTHING here.**

**THE OPENING CLAUSE, AS FILED:**

> **⟶ AND THE TABLE ABOVE'S SECOND COLUMN IS CLOSED, 2026-10-16: EVERY PRE-CONDITION IT PRINTS HAS A DECLARED ANSWER WHEN IT IS VIOLATED, AND THE ANSWER CROSSES IN THE ONE FORM THIS UNIT USES FOR AN OUTSIDE VALUE — THROWN, AND NEVER RETURNED (`role_spec_writer`; `docs/decisions.md` · `A123`, 2026-10-16; `RCA-8(d)` ANNOTATE-BESIDE: the table's three rows stand BYTE-FOR-BYTE above and are read THROUGH this clause, which adds the violated-pre-condition arms to item 3 and declares nothing else of the arm table, of item 1's flow or of item 4's refusal).** **THE FORM THAT CROSSES: the JS `TypeError` this unit already throws at `§2.4` item 5 (d)'s registration site — an instance of ONE class, its `status` member ABSENT, and NO `message` member of this unit's own; the `status` member's absence is what a drive reads (`§2.4` item 9 (g)'s class test; `§2.5`'s single form, whose two-member `{status, message}` shape is the VERB-side crossing and is NOT the shape this site takes).** **AND THE CALLER RECEIVES THE THROWN VALUE AND NOTHING ELSE: the call returns no value of any arm, the entry's set is left EXACTLY as it stood, the store is reached by no call this refusal makes — no `K-1`, no `K-2`, no store verb, no journal op — and no code of the store's closed `16`-member set is minted, reached or widened** (`§2.12` item 4's no-mint rule, read at this arm; `docs/specs/storeroom-native/contract.md §8.1`). **THE THREE VIOLATED STATES, EACH NAMED WITH THE ARM IT ANSWERS AND THE CALLER'S OBSERVABLE:**

**THE TABLE, AS FILED — THREE ROWS, AND THE FALSIFIED ONE IS THE FIRST:**

| The violated pre-condition | The declared answer — each of the three, in the one form above |
| --- | --- |
| **`'add'` at a pair the entry ALREADY CARRIES — the pair `(address, id)` is held, whatever the held constraint's ENABLED/DISABLED state** | **one thrown `TypeError`, the `status` member absent; the held constraint is NOT replaced, NOT re-keyed and NOT re-added, and the identity the HELD constraint was added under remains the one this pair answers for** |
| **`'disable'` at a pair that is ALREADY DISABLED** | **one thrown `TypeError`, the `status` member absent; the pair stays DISABLED, its constraint is still NOT evaluated at the next write, and no second disable is recorded** |
| **`'enable'` at a pair that is ALREADY ENABLED** | **one thrown `TypeError`, the `status` member absent; the pair stays ENABLED, its constraint is still evaluated at the next write, and no second enable is recorded** |

**THE TWO ORDERING CLAUSES WHICH FOLLOWED IT, AS FILED:**

> **⟶ AND THE ORDER OF THESE THREE REFUSALS AGAINST ITEM 1's STAGES IS DECLARED, BECAUSE ITEM 1'S FLOW ORDERS `2 → 3` WHILE THE `'add'` ROW ABOVE ORDERS ITS CONSTRAINT'S FIRST REFUSAL *"before item 1's stage 2's store leg is taken"* — AND THE TWO ARE ONE ORDER, NOT TWO.** **THE DISTINCTION THAT DISSOLVES THE APPARENT CONFLICT IS *WHOSE ACT ASKS*: the PRE-CONDITION test and the ARM REFUSAL are `manageConstraints`'s OWN acts over the entry's OWN set, taken BEFORE any store call is made and therefore BEFORE stage 1 opens at all; the *"before stage 2's store leg"* phrase orders THE CONSTRAINT'S FIRST EVALUATION — the pass stage 2 issues and stage 3 returns — against the store's own write leg INSIDE a pass that has already begun, and it declares of that evaluation exactly what items 1's items 2–3 declare of every evaluation.** **SO THE THREE REFUSALS OF THE TABLE ABOVE HAVE NO POSITION IN THE `2 → 3` SEQUENCE — they precede stage 1 — AND THE `'add'` ROW'S *"before stage 2's store leg"* KEEPS A SUBJECT INSIDE THE SEQUENCE AND IS NOT A SECOND ORDERING OF IT** (`surface.md §2.12` item 1's five stages; `docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4 — the kernel's evaluation inside the pass; `docs/specs/storeroom-constraints/contract.md §5`).
> **AND THE TWO READINGS ARE ALSO INSEPARABLE AT THE OBSERVABLE, WHICH IS WHY BOTH ARE LAWFUL AND NEITHER IS A DIVERGENCE: a caller that violates a pre-condition observes ONE thrown `TypeError` and an entry UNCHANGED, and a caller whose added constraint refuses its first evaluation observes ONE refusal and an attempt ROLLED BACK — two disjoint observables, no call producing both, and no drive able to read an order between them because no single call reaches both sites** (`[A2 docs/decisions.md` · `A123` · `A122`; A3 docs/specs/storeroom-js/surface.md §2.12 items 1 and 3 and §2.4 item 9 (g); A3 `bindings/js/test/constraints-publication.test.mjs`'s `G2` — the finding this clause closes, its cells driven by that file's author and not by this one | state or fail-state declaration]`).

**AND THE BOUNDARY OF THE QUOTE IS DECLARED SO NOTHING IS LEFT TO A BYTE DIFF: the bytes above are the whole
of the moved region's own three parts — the opening clause, the three-row table and the two ordering clauses.
The two cells `surface.md §2.12` item 4 (`THE REFUSAL`) and item 4's `message` clause carry — the JS
`TypeError`'s form and the prohibition on a unit-minted `message` — were NOT moved by this pass and stand at
their own bytes in the source, whose item 3's operative reading declares the `TypeError`'s `status`-absence
for every outside value; A DRIVE ASSERTS THAT FORM AT `surface.md §2.12` ITEM 4 AND NOTHING OF IT HERE.**
**NO RULE LIVES HERE AND NO DRIVE MAY ASSERT ANYTHING FROM IT** (`RCA-8(g)`; `docs/decisions.md` · `A126`,
2026-10-16).

---

## §2. MOVED OUT OF `docs/specs/storeroom-js/surface.md §2.12` ITEM 2 — THE `manageConstraints` DECLARATION, ONE NAME CARRYING THE OPERATION (the declaration and its signature block, as filed)

**Reason for the move:** **`A126`'s words are *"surface functions"*, PLURAL, plus *"on/off to enable/disable"*
— so the ONE name and its ONE `operation` position are displaced by THREE named functions, and the source's
item 2 now carries the one-line pointer at its own head; this section is the byte-exact record of the
declaration that was filed there and is SUPERSEDED.** **The bytes, byte-exactly as they stood; the operative
declaration stands at `surface.md §2.12`'s re-derived item 2 and at NOTHING here.**

**THE DECLARATION, AS FILED:**

> **2. `manageConstraints` — THE POST-CREATION CONSTRAINT ROUTE, ONE NAME CARRYING THE OPERATION.** **`A123`'s
> request, verbatim: *"If not already present, expose a function to add/enable/disable new constraints after
> store creation, similar to listener handling."*** **ITS DECLARED SHAPE, AND THE DECLARED ARITY THAT GOVERNS
> OVER ANY SHAPE A READER WOULD DERIVE FROM THE THREE OPERATIONS:**
>
> ```
> manageConstraints(instance, pair, operation) -> constraint identity | undefined
>                                                // instance: the object storeCreate returned
>                                                // pair:     { address, id } — PAR-JS-23's domain
>                                                // operation: 'add' | 'enable' | 'disable' — PAR-JS-22's domain
>                                                // 'add' returns the constraint identity; 'enable' and 'disable' return undefined
> ```
>
> 1. **THE OPERATION IS A DECLARED STRING OF THREE MEMBERS AND OF NO FOURTH.** **`'add'` · `'enable'` ·
>    `'disable'` are the whole of the domain; every other string, every non-string and the ABSENT position are
>    OUTSIDE it and take `item 3`'s refusal.** **THE THREE ARE ONE NAMED FUNCTION'S THREE OPERATIONS, NOT THREE
>    NAMES: `A123`'s *"add/enable/disable"* is READ AS ONE OPERATION POSITION, mirroring `§2.10`'s `listen` /
>    `unlisten` pair's shape rather than minting a second and a third verb.**
> 2. **ITS MEMBERSHIP AND ITS ROUTE.** **`manageConstraints` is the NINTH named export of the claimed ESM
>    entry and the FIFTH own member of the object `storeCreate` returns, added 2026-10-16 by `A123`** —
>    **`§2.9` item 1's enumeration and this part's `§2.4` item 9 (f) each carry a dated clause of this date
>    stating the same addition, and this item declares the route rather than the count** (`A123`; `A121`'s
>    `MINOR` class, whose own clause reads the post-creation constraint route as the member addition its cell
>    requires).

**AND THE BOUNDARY OF THE QUOTE IS DECLARED SO NOTHING IS LEFT TO A BYTE DIFF: two cells of the same clause —
what the arm *"returns"* and what its *"pre-condition"* is — are carried by the three-row arm table, whose
bytes stand unquoted in the source under the pointer that names this file, and its `'add'` row's own
pre-condition is FALSIFIED by `A126` while its two sibling rows are superseded by the operative table.**
**NO RULE LIVES HERE AND NO DRIVE MAY ASSERT ANYTHING FROM IT** (`RCA-8(g)`; `docs/decisions.md` · `A126`,
2026-10-16).

---

## §3. MOVED OUT OF `docs/specs/storeroom-js/parameter-semantics.md §2.23` — THE ROW *"THE CONSTRAINT IDENTITY `manageConstraints` RETURNS"*, `PAR-JS-23` AS A `return-field` (the row, as filed)

**Reason for the move:** **`A126` displaces the name `manageConstraints` and its `operation` position, so the
row that declared the identity *as that verb's return* is SUPERSEDED; the home `§2.23` is UNMOVED and now
carries the `instance` position of the three surface functions, and the IDENTITY itself — whose subject is
unmoved by the ruling — is re-declared at `parameter-semantics.md §2.25` (`PAR-JS-25`).** **The bytes,
byte-exactly as they stood at the row's own cells; the operative identity row is `§2.25` and NOTHING here.**

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-23`** |
| `parameter` | **the CONSTRAINT IDENTITY** — the value `manageConstraints`'s `'add'` arm returns, and the identity the kernel's own pair-keyed registry holds the constraint under |
| `kind` | **`return-field`** — **its construction-side twin is a `parameter` and is carried by `PAR-JS-21`'s pair**, which is the same `{ address, id }` read at the construction instead of at this verb (`§2.8`'s two-spelling pattern, read at this identity and not widened by it) |
| `unit` | **unitless** — an identity, not a measure |
| `domain` | **ONE OPAQUE JS VALUE the package owns**, equal to and distinguishable from no other identity by any rule this unit declares beyond the pair it was minted at, and returned by the `'add'` arm alone |
| `the values OUTSIDE it` | **every JS value that is not a returned constraint identity:** a plain `string` · a number · a boolean · `null` · `undefined` · **a LISTENER handle of `PAR-JS-8`'s domain** · **a `JournalOp` of `PAR-JS-13`'s domain** · any object the package did not return |
| `the declared answer for EACH outside value` | **NO ANSWER IS OWED BY THE STORE OR BY THE PACKAGE, and this row's outside values are NOT arguments of any verb of this surface: the identity is never CONSUMED by a verb this unit declares — `'enable'` and `'disable'` are taken over a `pair`, not over this value — so an outside value here reaches no call and THROWS NOTHING and CHANGES NOTHING.** **WHAT A CALLER MAY DO WITH IT IS PRINTED WITH ITS LIMIT: a caller MAY hand the pair back to `manageConstraints`, which is what the three arms are keyed by; a caller may NOT read a member of it, spell it, serialize it or carry it across a process reload** |
| `supplier` | **the PACKAGE** — minted at the `'add'` arm; and the kernel's own registry reads it as the pair-keyed structure `docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4 declares |
| `evaluator` | **THE PACKAGE**, at the `surface.md §2.12` item 3 arm table and at `§2.12` item 5's opacity rule |
| `observable` | **the returned value of a successful `'add'`; and, for every outside value, NO throw, NO change and no reach into any state of this unit** — **because no verb of this surface consumes this identity, and `'enable'` / `'disable'` take the pair** |
| `the clause that declares it` | **`docs/specs/storeroom-js/surface.md §2.12`** item 5 (the identity clause, 2026-10-16) and `§2.12` item 2's signature block |
| `the ruling that pins it` | **`A123`** (`docs/decisions.md`, 2026-10-16) — the route whose `'add'` arm mints it — **read with the store's own pair-keyed registry clause at `docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4, which is why the identity is a PAIR's and not a fresh token family's** |
| `alt` | **A STORE-MINTED TOKEN OF THIS VERB'S OWN, BESIDE OR IN PLACE OF THE PAIR** — priced: the kernel's registry is keyed by (`address`, `id`) and the store's own constraint list is a list of pairs (`PAR-JS-21`), so a third identity family would put ONE constraint under TWO keys and would make `'enable'` / `'disable'` untakeable over the pair — **and a TYPED MEMBER OR ACCESSOR ON THE RETURNED VALUE** — priced: `PAR-JS-8`'s opacity rule and `A69`'s accepted hazard are declared one spelling in each direction, and an accessor would make one of them readable; **both available only with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-js/` — NEVER a park** |
| `park` | **—** (no subject of this row is parked; the identity's opacity, its pair and its one arm are declared at `surface.md §2.12` item 5) |

`[A2 docs/decisions.md` · `A123`, 2026-10-16; A3 docs/specs/storeroom-js/surface.md §2.12 items 2, 3 and 5; A3
docs/specs/storeroom-constraints/kernel-surface.md §2.2` item 4; A3
docs/specs/storeroom-js/parameter-semantics.md §2.21 | declared parameter semantics]`

**AND THE BOUNDARY OF THE QUOTE IS DECLARED SO NOTHING IS LEFT TO A BYTE DIFF: the bytes above are the row's
whole cell set as filed, and the `§`-home `2.23` is NOT among the bytes moved — the home stays at
`parameter-semantics.md §2.23` and carries a different subject from this date.** **NO RULE LIVES HERE** (`RCA-8(g)`).

---

## §4. MOVED OUT OF `docs/specs/storeroom-js/parameter-semantics.md §2.22` — THE `operation` ROW AND THE CITATION RE-SPELLING REQUIREMENT LIST THE EARLIER PASS ENUMERATED AT THAT HOME (the cells and the list, as filed)

**Reason for the move:** **`A126` declares THREE surface functions in place of one name with an `operation`
position, so the row whose subject was *"the post-creation constraint route's own call"* with *"the ONE
operation position"* is SUPERSEDED, and the requirement list that disposed of the earlier id/home re-spelling
is the record of a state this ruling moves past; the home `§2.22` is UNMOVED and now carries the `constraint`
row.** **The bytes, byte-exactly as they stood; the `§2.22` row's operative cells are at
`parameter-semantics.md §2.22` and NOTHING here.**

**THE REQUIREMENT LIST, AS FILED:**

> **⟶ AND THE CITATION RE-SPELLINGS THIS SPLIT OWES ARE ENUMERATED HERE AS A REQUIREMENT LIST, ONE SITE AT A
> TIME, AND NOTHING IS LEFT TO A BYTE DIFF (`role_spec_writer`, 2026-10-16).** **THIS PART'S `§1` HAD ALREADY
> MINTED THE TWO `§`-NUMBERS THAT THE TWO NEW SECTIONS WOULD HAVE TAKEN — its index table's last cells and its
> arithmetic clause read *"`parameter-semantics.md` `§2.22`"* and *"`§2.23`"* while the two sections still stood
> beside `§2.18` — SO THE SECTIONS WERE MOVED TO THE TWO `§`-NUMBERS NEXT FREE AT THIS PART'S OWN END, `§2.22` AND
> `§2.23`, AND THE EARLIER REFERENCE SITES CARRY THE NEW PAIR FROM THIS DATE — the as-filed `§2.24`/`§2.25` wording of these two lines being the earlier pass's own print and read THROUGH the repointing clause above.** **THE REQUIREMENT LIST, EACH
> SITE NAMED BY ITS OWN CELL, AND EACH CHECKED OFF AT ITS OWN BYTES:**
> 1–10. **the ten sites**: `§1`'s header range clause ✓ · `§1`'s index table's `PAR-JS-22` row cell ✓ · the same
> table's `PAR-JS-23` row cell ✓ · `§1`'s arithmetic clause of this date ✓ · `§2.18`'s falsified-claim
> paragraph (*"the subject of `§2.22` below"*) ✓ · `§2.18`'s closing `kind` paragraph (*"`§2.22` below"*) ✓ ·
> `docs/specs/storeroom-js/surface.md §2.9`'s owed-types clause ✓ · `docs/specs/storeroom-js/contract.md §6`'s
> two new index rows ✓ · that document's index-region clause and part-map cell ✓ · `docs/specs/storeroom-js/test-cases.md`'s
> pointer set, its third row's source cell ✓.
>
> **AND WHAT DOES NOT MOVE, SAID SO THE RE-SPELLING IS NOT READ AS A RENUMBERING: NO `§`-NUMBER OF
> `PAR-JS-1`…`PAR-JS-21` MOVES, NO ROW IS RENUMBERED, AND THE TWO ADDED ROWS ARE `22` AND `23` IN ID AND `§2.22`
> AND `§2.23` IN HOME — the id and the home are two different counts and this part prints both**
> (`[A2 docs/decisions.md` · `A123`; A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 and §C.11.9 —
> a citation re-spelling is enumerated and checked off, never inferred from a byte diff | cross-reference]`).

**THE ROW'S CELLS, AS FILED (the cells whose subject `A126` displaces):**

| Cell | Its value |
| --- | --- |
| `parameter` | **the post-creation constraint route's own call** — its THREE positions: `instance`, the object `storeCreate` returned; `pair`, the `{ address, id }` the constraint is taken at; and `operation`, the ONE operation position |
| `kind` | **`parameter`** — a position of a declared verb of this surface, and NOT a seam, a callback, an option of the construction or a returned field. **ITS `instance` AND `pair` POSITIONS ARE CARRIED BY ROWS THAT ALREADY EXIST — `PAR-JS-1`'s construction product and `PAR-JS-21`'s pair — so the ONLY position this row adds to the surface's parameter set is `operation`** (`§2.1`; `§2.21`) |
| `unit` | **unitless** — the operation is a token, the pair an identity and the instance an object |
| `domain` | **ONE string of EXACTLY THREE members — `'add'` · `'enable'` · `'disable'` — taken over an `instance` that is the object `storeCreate` returned, at a `pair` inside `PAR-JS-21`'s domain** |
| `the values OUTSIDE it` | **THE `operation` POSITION:** `null` · `undefined` · **ABSENT** · **a non-string** (`number` · `bigint` · `boolean` · `symbol` · a function · an object · an array) · **any other string** — `'ADD'`, `'remove'`, `'delete'`, `'set'`, `''` and every spelling not one of the three. **THE `pair` POSITION:** every value `PAR-JS-21`'s own outside-value list names. **THE `instance` POSITION:** **ABSENT** · `null` · `undefined` · **a non-object** · **an object that is not the one `storeCreate` returned** |
| `the declared answer for EACH outside value` | **ONE ANSWER, THE SAME FOR EVERY ONE OF THEM: the package throws `TypeError`, carrying NO `status` member and NO `message` member of this unit's own, and NOTHING IS ADDED, ENABLED, DISABLED OR OTHERWISE CHANGED.** **This is `§2.4` item 5 (d)'s class test read through at a second site, and it MINTS NO CODE AND ADDS NO MEMBER TO THE STORE'S CLOSED `16`** (`docs/specs/storeroom-js/surface.md §2.12` item 4; `§2.17`; `docs/specs/storeroom-native/contract.md §8.1`) |
| `supplier` | **the CALLER** — and, for the kernel's own construction-time set, the `cfg.constraints` key `PAR-JS-21` already carries; **this verb's own supplies are the caller's and are POST-CREATION** |
| `evaluator` | **THE PACKAGE, at this verb's own three arms and at no other act — and the KERNEL evaluates the constraint SET this verb's `'add'` arm joins, inside the pass `surface.md §2.12` item 1 declares** |
| `observable` | **THE THREE ARMS, EACH AS `surface.md §2.12` item 3 prints it: `'add'` returns the constraint identity and the constraint is evaluated on every subsequent write — a write it refuses on its FIRST evaluation is refused before the store's own write leg is taken; `'enable'` returns `undefined` and the constraint is evaluated again at the next write; `'disable'` returns `undefined` and a write the disabled constraint would have refused is ACCEPTED.** **AND THE ONE REFUSAL, OBSERVABLE: a `TypeError` with no `status` member, for every outside value of every position, changing nothing** |
| `the clause that declares it` | **`docs/specs/storeroom-js/surface.md §2.12`** — authored there 2026-10-16 — and the module-namespace count it moves is `§2.9` item 1's dated clause of that date |
| `the ruling that pins it` | **`A123`** (`docs/decisions.md`, 2026-10-16) — *"If not already present, expose a function to add/enable/disable new constraints after store creation, similar to listener handling."* — **read with `A121`, whose `MINOR` class the member addition requires, and with `A122`, whose flow this verb's constraints are evaluated in** |
| `alt` | **THREE NAMES INSTEAD OF ONE — `addConstraint` · `enableConstraint` · `disableConstraint`** — priced: `A123`'s own sentence names THREE OPERATIONS and the corpus's precedent for a route pair is `§2.10`'s ONE NAME CARRYING A HANDLE with its counterpart carrying the withdrawal (`listen` / `unlisten`), so three verbs would mint three module-namespace names where one operation position carries the same three states — **and a SECOND NAME AT THE INSTANCE — a member beside `register` rather than the route's own member** — priced: the instance's declared member set is fixed at FIVE own members by `surface.md §2.4` item 9 (f)'s dated clause of this date, so a second member would move that figure again; **both available only with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-js/` — NEVER a park** |
| `park` | **—** (no subject of this row is parked: the route, its three arms, its refusal and its membership are declared at `surface.md §2.12` and pinned at `A123`) |

**AND THE BOUNDARY OF THE QUOTE IS DECLARED SO NOTHING IS LEFT TO A BYTE DIFF: `A126` TOOK THE VERY ARM THE
`alt` cell above priced (three names), so that cell's reading stands as the last pass's and is not this date's
rule; the operative row at `parameter-semantics.md §2.22` declares the FUNCTION and not an operation.**
**NO RULE LIVES HERE AND NO DRIVE MAY ASSERT ANYTHING FROM IT** (`RCA-8(g)`; `docs/decisions.md` · `A126`,
2026-10-16).

---

**END OF THE ARCHIVE.** **FOUR REGIONS, EACH NAMED BY ITS SOURCE PATH AND `§`; each source leaves a one-line pointer
and re-emits no byte of it; the operative declarations are `docs/specs/storeroom-js/surface.md §2.12`'s items 1–5
of 2026-10-16, `§2.9` item 1's dated clause of that date, `§2.4` item 9 (f)'s dated clause of that date, and
`docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of that date with its rows `§2.21`–`§2.25`**
(`RCA-8(g)`; `docs/decisions.md` · `A126` · `A123` · `A122`).
