# Part — `parameter-semantics` (`U-STOREROOM-CONSTRAINTS`, prefix `D-GP-SCNT`): one row per declared parameter, option, seam and callback, with its unit, its domain, its referent and its evaluator

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-constraints/`** — authored
  at the gate-2 spec gate **in the same pass** as the contract document's index region and part map, whose
  `parameter-semantics` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-constraints/parameter-semantics.md`. **⟶ REPAIRED at the gate-2 repair pass of
  2026-10-13 (`role_spec_writer`) against `VF-3`, `VF-8`, `VF-12`, `VF-14`, `VF-15`, `VF-17` and
  `CC-1`–`CC-10`, `CC-13`, `CC-19`–`CC-22`: the row set is now `17` rows (`PAR-C-1`…`PAR-C-17`) and the
  four rows this pass ADDED are the ones the findings name — `value`, the attempt reference, the attempt
  context beside the repair context, and the `RollbackStep` record (`§2.14`–`§2.17`).**
  **⟶ AND `§2.17`'s `RollbackStep` ROW IS RE-DERIVED AT THE RESTORATION PASS OF 2026-10-13
  (`role_spec_writer`), WHEN THE ARCHITECT'S RULING *"Clarification on 1: Roll back to the last state that
  passed all constraints."* (`A: docs/decisions.md` · `A102`) LANDED: the record's member set moves `5` → `6`
  with its `checkpoint` member named in the row's own `domain` cell, its `the values OUTSIDE it` cell's
  `a sixth member` is re-spelled `a seventh member`, and the row's `observable` and `the clause that declares
  it` cells are re-derived with it. THE ROW SET'S OWN FIGURE IS UNMOVED: `17` rows are still `17` of `17`, and
  no `PAR-C` row is added for the `checkpoint` member because a member of a declared record already has its
  row in the record's own row.**  **⟶ AND `§2.17`'s ROW IS RE-DERIVED A THIRD TIME AT THE RULING-LANDING PASS OF 2026-10-13 (`role_spec_writer`), WHEN THE ARCHITECT'S ANSWERS *"Redefine the checkpoint AS the stop op."* and *"Single writes are checked atomically."* (`Q-A`; `Q-B`) REPLACE THE PASS-LEVEL READING: the `checkpoint` member's `domain` cell now names THE OP whose landing left the attempt's last valid state — `null` where no op of the attempt left one — and its `the values OUTSIDE it` cell refused a pair key, an op outside `ops` and — **A REFUSAL WITHDRAWN BY NAME AT THE `A105` LANDING PASS, WHICH LANDS *"Any last valid state for the store."* (`Q1`): an op ANOTHER LANDING ESTABLISHED is IN this member's domain wherever that landing's evaluation of every registered pair at the attempt's address returned the pass arm, so an op of another attempt is NO LONGER AN OUTSIDE VALUE anywhere in this directory (`VD-5`)** — an op whose landing no evaluation of this attempt's address read a state after; the `observable` and `the clause that declares it` cells are re-derived with it, and the commit registry's clearing rule (`A: docs/decisions.md` · `A103`) is CITED from its one home `contract.md §5.7`. THE ROW SET, THE `17` AND THE `6`-MEMBER FIGURE ARE ALL UNMOVED** (`D5`).
  **⟶ AND `§2.17` IS RE-DERIVED AGAIN AT THE GATE-2 REPAIR PASS OF 2026-10-13 (`role_spec_writer`), AFTER THE
  SPLIT SET WAS READ — AND THAT BLOCK'S OWN READING IS SUPERSEDED BY THE BLOCK ABOVE, ITS PASS-LEVEL DEFINITION BEING EXACTLY WHAT THE ARCHITECT'S `Q-A`/`Q-B` ANSWERS REPLACE: the `checkpoint` member's DOMAIN was then read from `composition-and-states.md §2.6` item 8
  (ii)'s PASS-LEVEL definition — which pass of an attempt pins it, and that it is that pass's LAST pair's key —
  rather than restated in a sentence of this row's own; and the record's six-member set is CLOSED in the row's
  `the values OUTSIDE it` cell exactly as `PAR-C-14`'s `domain` cell closes `value`'s taxonomy.** **The row set,
  the `17`, and the `6`-member figure are all unmoved — WHICH STANDS; ONLY THE PASS-LEVEL DOMAIN IS WITHDRAWN BY NAME, so no clause of this part reads `checkpoint` as a pair key any longer.**
  **⟶ AND `§2.17`'S `checkpoint` CELLS ARE RE-DERIVED AGAIN AT THE GATE-2 REPAIR PASS OF 2026-10-13 (`role_spec_writer`), WHICH LANDS `A: docs/decisions.md` · `A104` — *"Yes — the checkpoint may name an op ANOTHER attempt landed."*:** **the member's `domain` cell now reads the VALID-STATE DEFINITION AT ITS SINGLE SCOPE — *"every registered pair at the attempt's own address"* — with the per-pair spelling WITHDRAWN BY NAME, it admits ANOTHER ATTEMPT'S OP at a descendant address where this attempt's own evaluation found the address valid after it, and the `the values OUTSIDE it` cell's *"an op of another attempt"* is WITHDRAWN BY NAME with it. THE ROW SET'S FIGURE, THE `17` AND THE `6`-MEMBER FIGURE ARE ALL UNMOVED, and the `RollbackStep` member set's own count is read from its ONE home `kernel-surface.md §1` item 4.**
  **⟶ AND `§2.17`'S `checkpoint` CELLS AND THIS HEAD ARE RE-DERIVED AT THE `A105` LANDING PASS OF 2026-10-13 (`role_spec_writer`), WHICH LANDS THE ARCHITECT'S `Q1` — *"Any last valid state for the store."* — AND CLOSES `VD-5`, WHICH THIS HEAD HAD CARRIED: the member's `domain` cell names THE STORE'S LAST VALID STATE, WHOEVER'S LANDING ESTABLISHED IT, its evaluation ADDRESS-SCOPED, and the exclusion this head once printed — *"an op of another attempt"* as an outside value — is WITHDRAWN BY NAME HERE AND AT THE CELL ITSELF, so no clause of this part refuses a foreign op any longer. THE ROW SET'S FIGURE, THE `17` (`6 + 2 + 2 + 2 + 5`), THE `6`-MEMBER FIGURE AND THE `8 ≤ 8` CAP ARE ALL UNMOVED.**
- **⟶ AND THE REPAIR-OP SEAM IS AMENDED AT THIS PASS OF 2026-10-13 (`role_spec_writer`), WHICH LANDS THE ARCHITECT'S GATE-4 RULING `A: docs/decisions.md` · `A110` — *"the declared repair return shape grows ONE member — the app's repair function returns `{ ok, message, op }`, its `op` being the op its own edit landed; the kernel reads the op off THAT RETURN and nowhere else; the addon route is DELETED, not widened."*:** **THE DECLARED REPAIR RETURN SHAPE IS `{ok, message, op}`.** **`ok` and `message` are the two members this row already carried — a repair attempts an edit and returns its success and its message — and `op` IS THE ONE MEMBER ADDED HERE: the identity of the op the repair's own edit landed, THE STORE'S OWN OP VALUE AS THE STORE'S OWN `write` ANSWERED IT, REQUIRED IFF `ok === true` and ABSENT — NOT `null` — WHERE `ok === false`.** **THE KERNEL READS THAT OP OFF THIS RETURN AND NOWHERE ELSE — AND THE ROUTE `A110` DELETES IS DELETED RATHER THAN WIDENED, whose ONE full statement, the four negatives included, is `§2.7`'s `observable` cell and is cited from every other site.** **THE SHAPE'S ONE HOME IS `§2.7`'s `PAR-C-7` ROW AND THE SEAM'S OWN CLAUSE IS THAT ROW'S TO CARRY: every other site of this directory — the parts, the register rows that name the repair result, and every drive of `e2e-scenarios.md` and `e2e-scenarios-b.md` whose repair body returns a value — re-spells the shape as `{ok, message, op}` and CITES this home, re-deriving no term of it.** **AND THE RE-SPELLING CENSUS IS PRINTED HERE WITH BOTH ITS TERMS, A SITE BEING ONE CLAUSE — one bullet, one table row, one footnote block or one head note — THAT PRINTS THE SHAPE OR A MEMBER OF IT: `37` SITES IN `8` FILES = `25` NON-DRIVE SITES IN `6` FILES (`6` at this part — the head note, `§2.7`'s row, `§2.7`'s footnote, `§2.8`'s row, `§2.8`'s footnote and this closing census — `+ 7` at `kernel-surface.md` — `§1` item 1's fixture clause, `§1` item 4's enumeration, `§2.3` item 2's shape line, its add-rule bullet, its repair-op-seam bullet, its no-second-route bullet and its delete-route sentence — `+ 5` at `attempt-lifecycle.md` — its head note, `§2.4` item 3 and item 4's arms `(b)`, `(d)` and its disjointness rule — `+ 2` at `composition-and-states.md`, `+ 2` at `fail-surface.md` and `+ 3` at `contract.md`: `6 + 7 + 5 + 2 + 2 + 3 = 25` ✓) PLUS `12` DRIVE SITES IN THE BAND'S TWO FILES (`e2e-scenarios.md` `7` on `6` windows and `e2e-scenarios-b.md` `5` on `5` windows, enumerated at `e2e-scenarios.md`'s head): `25 + 12 = 37` ✓ sites and `6 + 2 = 8` ✓ files — **and the FOUR files of the directory that re-spell nothing are named so the set is closed: `proposal.md`, whose quoted *"success true/false"* sentence is the source the shape was derived FROM and not a statement of it, and `proposal-review.md`, `adoption-dossier.md` and `implementation-plan.md`, none of which prints the shape.** **THE ROW SET, THE `17` (`6 + 2 + 2 + 2 + 5`), THE `6`-MEMBER FIGURE AND THE `8 ≤ 8` CAP ARE ALL UNMOVED: this is an amendment of a return shape's member set and NOT a row** (`VF-13`; `VF-17`; `A110`).
- **The gate-2 readiness block this part discharges, named so its subjects are checkable:** **`docs/specs/
  storeroom-constraints/proposal-review.md §11.6` names the parameter-semantics SUBJECTS this unit owes — the
  registration key (`address` + `id`), the attempt's log, the repair's own write/delete, the applied-repair
  marker, and `supplier`/`evaluator` as caller-side.** **EVERY ONE OF THOSE IS A ROW BELOW, and no subject of
  that list is left without one** (`R: §11.6`; `[T: this part's own scope boundary | CONTRACT]`).
- **Scope boundary — what this part is NOT, and what it does not carry.** **This part's rows are
  `PAR-C-1`…`PAR-C-17` and they are a SEPARATE, UNCAPPED provenance surface: they are NOT the typed
  register's, they do not consume its `≤ 8` cap, and they add no row to the store's `PAR-1`…`PAR-14` or to
  the JS unit's `PAR-JS-1`…`PAR-JS-18`** (the three families are cited and never restated). **This part
  carries no behaviour clause, no arm, no record shape and no fail-state that `contract.md` or its parts do
  not already declare: a `PAR-C` row is a PROVENANCE ROW, and its `the clause that declares it` cell points
  at the home rather than copying it.** **A missing row here is a gate-2 finding exactly as a missing return
  shape is** (`[T: the row set's closure over every declared parameter, option, seam and callback |
  CONTRACT]`).
- **AND ONE CLOSURE CLAIM, STATEABLE BECAUSE THE KERNEL'S SURFACE IS CLOSED AT FIVE ITEMS AND ITS MODULE AT
  ONE NAME:** **every parameter, option, seam and callback this unit declares has a row below, and no
  declared parameter lies outside this list** — **the kernel declares `5` surface items
  (`kernel-surface.md §1` item 2), one module name, one attempt context, one constraint outcome set, one
  repair context, one repair result set, one attempt record, one attempt reference, one log, one
  applied-repair marker, one rollback composition and one rollback step, and the `17` rows below dispose of
  exactly that surface** (`[T: the row set's closure | CENSUS]`).
- **AND THE ONE READING RULE THIS PART'S ROWS OBEY, CARRIED FROM THE CONTRACT'S OWN RULE SO A ROW CANNOT
  OUTRUN ITS DECLARATION: EVERY PARAMETER THIS UNIT'S SURFACE TAKES HAS A ROW HERE WHOSE `domain` CELL
  PRINTS ITS CLOSED VALUE SET AND WHOSE `the values OUTSIDE it` CELL ENUMERATES THE OUTSIDE VALUES.** **A
  parameter reached only through another row's `domain` cell is a `VF-3` finding, and this pass closes that
  class at its root: `value`, the attempt reference and the attempt context each carry their own row**
  (`kernel-surface.md`'s reading rule at its head; `[T: this part's own closure rule | CONTRACT]`).

---

## §1. The `PAR-C` index — every subject `§11.6` names, and where its row lives

**One row per declared parameter, option, seam and callback.** **The index below is a MAP and every entry of
it is a pointer, not a restatement.** **AND THE TWO `§`-COLUMNS ARE READ WITH THEIR OWN TWO SCOPES, SO THE
BARE `§n` OF ONE IS NEVER TAKEN FOR THE OTHER: *"Its row's home"* is a BARE `§n` OF THIS FILE only — each of
its `§2.1`…`§2.17` entries naming a section of `parameter-semantics.md` — while *"Where the unit declares it"*
names a FOREIGN document and is therefore ALWAYS written with that document's path, `attempt-lifecycle.md §2.4`
included; so the two `§2.4` spellings in one row name two different files and are never one reference** (`VF-5`).

| Row | The subject | Its `kind` | Where the unit declares it | Its row's home |
| --- | --- | --- | --- | --- |
| **`PAR-C-1`** | the registration key's **`address`** member | `parameter` | `kernel-surface.md §2.1` (`K-1`), `contract.md §5.1` | `§2.1` |
| **`PAR-C-2`** | the registration key's **`id`** member | `parameter` | `kernel-surface.md §2.1` (`K-1`), `contract.md §5.1` | `§2.2` |
| **`PAR-C-3`** | **`constraint`** — the registered function | `parameter` | `kernel-surface.md §2.3` item 1 | `§2.3` |
| **`PAR-C-4`** | the attempt's own log — its carrier, its entry set and its order | `option` | `kernel-surface.md §2.5`, `attempt-lifecycle.md §2.4` | `parameter-semantics.md §2.4` |
| **`PAR-C-5`** | the constraint's **outcome** — the closed three-arm set | `seam` | `kernel-surface.md §2.3` item 1 | `§2.5` |
| **`PAR-C-6`** | the **`repair`** function the outcome names | `callback` | `kernel-surface.md §2.3` item 2 | `§2.6` |
| **`PAR-C-7`** | the repair's own **write / delete** — the repair's declared channel | `seam` | `kernel-surface.md §2.3` item 2 | `§2.7` |
| **`PAR-C-8`** | the repair's own **result** — the closed two-arm set | `return-field` | `kernel-surface.md §2.3` item 2 | `§2.8` |
| **`PAR-C-9`** | the **applied-repair marker** — its predicate, its home and its lifetime | `option` | `kernel-surface.md §2.5` item 2 | `§2.9` |
| **`PAR-C-10`** | **`supplier`** — who supplies each value | `option` | `contract.md §5.1`–`§5.8` (each row's own cell) | `§2.10` |
| **`PAR-C-11`** | **`evaluator`** — who evaluates each value | `callback` | `contract.md §5.1`–`§5.8` (each row's own cell) | `§2.11` |
| **`PAR-C-12`** | the kernel's **module name** and realm | `option` | `kernel-surface.md §1` item 1 | `§2.12` |
| **`PAR-C-13`** | the kernel's **surface extent** — the five items and the ONE `K-3`/`K-5` shape | `option` | `kernel-surface.md §1` item 2, `§2.1` items 3 and 5 | `§2.13` |
| **`PAR-C-14`** | **`value`** — the write's own data, as the attempt context carries it | `parameter` | `kernel-surface.md §2.1` (`K-2`), `§2.3` item 1 | `§2.14` |
| **`PAR-C-15`** | the **attempt reference** — `AttemptRef`; the `attempt` argument of `K-4`/`K-5` and the `attempt` member of `CommitRecord` and of every `AttemptReport` (`K-3` takes the `CommitRecord` that CARRIES it, and no `attempt` argument) | `parameter` | `attempt-lifecycle.md §2.4` items 1 and 2, `kernel-surface.md §2.1` items 2–5 | `§2.15` |
| **`PAR-C-16`** | the **attempt context** — the constraint's ONE argument, and the repair context beside it | `parameter` | `kernel-surface.md §2.3` items 1–2 | `§2.16` |
| **`PAR-C-17`** | the **`RollbackStep`** — what each per-op rollback call returned, and the composition's `checkpoint` target it carries | `return-field` | `composition-and-states.md §2.6` items 3–6 and item 8 | `§2.17` |

**ARITHMETIC, PRINTED WITH ITS TERMS AND CLOSING — THIS LINE IS THE ONE THE ROWS BELOW ARE READ
AGAINST, AND THE INDEX TABLE ABOVE IS RE-READ THROUGH IT WHERE THE TWO DISAGREE.** **The set is `17` rows
(`PAR-C-1`…`PAR-C-17`), and its kind cells are read from the schema's closed five-value enum as:
`parameter` × `6` (`PAR-C-1`, `PAR-C-2`, `PAR-C-3`, `PAR-C-14`, `PAR-C-15`, `PAR-C-16`) · `seam` × `2`
(`PAR-C-5`, `PAR-C-7`) · `callback` × `2` (`PAR-C-6`, `PAR-C-11`) · `return-field` × `2` (`PAR-C-8`,
`PAR-C-17`) · `option` × `5` (`PAR-C-4`, `PAR-C-9`, `PAR-C-10`, `PAR-C-12`, `PAR-C-13`) —
**`6 + 2 + 2 + 2 + 5 = 17` ✓**.** **AND ONE KIND CELL WAS PRUNED BY THE FIRST WRITING OF THIS LINE AND IS
CORRECTED HERE, NAMED SO NO TWO CELLS CONTRADICT: `PAR-C-11` (`evaluator`) is a `callback` row — the
caller's own act of evaluating is the callback this row carries — and `§1`'s index cell for it and
`§2.11`'s own `kind` cell both read `callback`, so the `17` rows dispose of `2` `callback` rows and `0` row
of this part is left with a kind outside the five-value enum.** **AND THE FIGURE THIS LINE PRINTS HAS BEEN
MOVED ONCE, BY THE FINDINGS THAT NAMED MISSING SUBJECTS, AND IT IS MOVED HERE WITH ITS OWN REASON SO NO
READER FINDS TWO FIGURES: the first writing of this part printed `13` (`3 + 2 + 2 + 1 + 5 = 13`), the
gate-2 repair pass added the `value` row, the attempt-reference row, the attempt-context row and the
`RollbackStep` row (`§2.14`–`§2.17`), and the ONLY LIVE FIGURE is the `17` printed above with the terms
`6 + 2 + 2 + 2 + 5`** (`VF-13`; `VF-17`; `parameter-semantics.md §2.14`–`§2.17`).
**THE PARAMETER-ROW SET IS NOT A REGISTER AND NOT A BUDGET: these `17` rows are UNCAPPED provenance rows,
and the typed `P-*` register is a separate surface whose `≤ 8` cap holds at `8 ≤ 8` ✓ and is
`contract.md §5`'s** (`[T: §1`'s index and its own arithmetic, printed with its terms | CENSUS]`).

---

## §2. The `PAR-C` rows — each carrying its unit, its domain, its referent, its evaluator and its observable

**THE ROW SCHEMA, STATED ONCE SO EVERY ROW IS READ THE SAME WAY.** **Each row carries nine cells and each
cell is MANDATORY:** `id` · `the subject` · `kind` · **`unit`** · **`domain` (with the values outside it)** ·
**`referent`** (what the value refers to) · **`evaluator`** (who evaluates it, and at which side) ·
**`observable`** · **`the clause that declares it`**. **`kind` is read from the closed five-value enum this
part uses: `parameter` | `option` | `seam` | `callback` | `return-field`.** **AND THE ONE RULE EVERY ROW
OBEYS: the `domain` cell is never empty, the values outside it are enumerated, and the row's `evaluator`
cell NAMES THE SIDE — `caller-side` or `store-side` — so the unit's own boundary is checkable from the rows
alone** (`[T: the row schema, this part's own declaration | CONTRACT]`).

### §2.1 `PAR-C-1` — the registration key's `address`

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-1`** |
| `the subject` | **`address`** — the registration key's FIRST member |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a segment list (an address) |
| `domain` | **the store's own address domain, UNCHANGED AND NOT RE-DECLARED HERE:** a JS/JSON array of segments, each a `string` key or a non-negative integer index, the empty array included (`A: docs/specs/storeroom-native/store-model.md §1.5` item 1, cited by its home and never copied) |
| `the values OUTSIDE it` | **`null`** · **`undefined`** · **a non-array** · **an array with a segment outside the store's domain** · **an address the store's listener machinery refuses for any reason of its own** |
| `referent` | **the store's own address the registration binds to** — and, in the registry, the FIRST half of the pair key |
| `evaluator` | **STORE-SIDE for the check** — the store's own listener machinery checks it *"as normal for listeners"* (`P: §A.1`) — **and CALLER-SIDE for the keying**, because the registry's pair is the kernel's own shape (`P: §B.7`) |
| `observable` | **a registration that returns the store's handle at an address the store admits; a registration that throws the kernel's `KC-1` at an address SHAPE outside the domain; a registration whose address the store's own `listen` refuses, which throws THE STORE'S OWN CODE in the store's own form at that call; and two registrations at ONE address under two ids that leave TWO registry entries and ONE store home entry** |
| `the clause that declares it` | `kernel-surface.md §2.1` item 1 · `contract.md §5.1` (`P-IM-1`) |

`[P: §A.1 — *"The handle is checked within the rust store as normal for listeners"*; P: §B.7 — *"keyed by
address + id (no store entry)"*; R: docs/decisions.md · `A98`/`A99`; A: docs/specs/storeroom-native/
write-and-read.md §6.5 item 12 (c); **the store-refusal half is `fail-surface.md §1.2` item 2's channel
rule, and `VF-6` is closed by it** | CONTRACT]`

### §2.2 `PAR-C-2` — the registration key's `id`

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-2`** |
| `the subject` | **`id`** — the registration key's SECOND member |
| `kind` | **`parameter`** |
| `unit` | **unitless** — an opaque caller-side token |
| `domain` | **a non-empty `string`** — caller-chosen, opaque to the store, and unique within one `address` in the registry |
| `the values OUTSIDE it` | **the empty string** · **`null`** · **`undefined`** · **a non-string** (a number, a boolean, an object, an array, a function) · **an ABSENT argument** |
| `referent` | **the constraint registration the caller names** — and, in the registry, the SECOND half of the pair key, spelled into the pair token per `attempt-lifecycle.md §2.4` item 2 (`k:1;a/k:1;b#x`) |
| `evaluator` | **CALLER-SIDE** — the kernel checks it before the store sees anything, **because the store has no member for it and no clause about it** (`P: §B.7` — the registry's key is the caller's own shape) |
| `observable` | **a registration that returns the store's handle; a registration that throws the kernel's `KC-2` for every outside value; a second registration at one address under a DIFFERENT id that adds a SEPARATE entry appended after every pair already standing, while the store's home still holds ONE entry at that address; and a `LogEntry` carrying this BARE id in its `id` member rather than the pair token** |
| `the clause that declares it` | `kernel-surface.md §2.1` item 1 · `attempt-lifecycle.md §2.4` item 2 · `contract.md §5.1` (`P-IM-1`, the pair's uniqueness domain) |

`[P: §B.7; P: §1 — *"registered along with a watch address and an id"*, the id's warrant; R: §11.5 —
`AR-10`; A: docs/specs/storeroom-native/write-and-read.md §6.5 item 10 (a) — the store's listener record is
`{address, handle}` and carries NO id, which is WHY this parameter is caller-side | CONTRACT]`

### §2.3 `PAR-C-3` — the registered `constraint` function

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-3`** |
| `the subject` | **`constraint`** — the registered function |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a callable of one argument |
| `domain` | **a function of ONE argument, THE ATTEMPT CONTEXT (`§2.16`'s five-member record), whose RETURN is `PAR-C-5`'s closed three-arm set** |
| `the values OUTSIDE it` | **a non-function at the parameter's position** (a `string`, a number, a boolean, an object, an array) · **an ABSENT argument** · **a function of the wrong arity declared as such is NOT outside the domain — arity is not the kernel's check** |
| `referent` | **the constraint the caller registers** — the function the kernel invokes in the Node.js space, ONCE PER PAIR PER EVALUATION PASS, with `§2.16`'s context |
| `evaluator` | **CALLER-SIDE** — the kernel checks that it is a function **before the store sees anything**, and **the STORE evaluates nothing of it and holds nothing of it** (`P: §B.7` — no store entry) |
| `observable` | **a registration that returns the store's handle; the kernel's `KC-2` for a non-function or an absent argument, with NO registry entry added and NO store registration made; and a `constraint-check` entry per invocation, whose `state` is `null` and whose `message` is the constraint's own text where the arm supplied one** |
| `the clause that declares it` | `kernel-surface.md §2.1` item 1 · `kernel-surface.md §2.3` item 1 |

`[P: §A.1 — *"the function is run in the node.js space (also like listeners)"*; P: §B.4 — the kernel's own
record; A: docs/specs/storeroom-js/contract.md §2.6 — the store's own surface takes no function at any
position, which this row does NOT breach because the kernel is not the store's surface; **where the value it
confirms reaches it is `§2.16` and not this row — `CC-1` is closed there** | CONTRACT]`

### §2.4 `PAR-C-4` — the attempt's message log: its carrier, its entry set and its order

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-4`** |
| `the subject` | **the attempt's message log** — the returned messages the proposal's second register tracks |
| `kind` | **`option`** |
| `unit` | **entries** — an append-ordered list of `LogEntry` records |
| `domain` | **a list of `LogEntry` records whose member set is exactly `{seq, kind, id, message, opId, state}`, whose `kind` is one of the closed four kinds, whose `state` is the kernel's own `KC` token on an `outcome` entry and `null` on the other three, and whose `seq` is strictly increasing from `1`** |
| `the values OUTSIDE it` | **an entry with a member outside the six** · **a `kind` outside the closed four** · **a `state` outside `KC-1`…`KC-8`, or a `state` on a non-`outcome` entry** · **a `seq` that is not strictly increasing, or that starts below `1` or above `1`** · **an entry removed, rewritten or reordered** · **an entry carrying a store member as its `state`** |
| `referent` | **the attempt's own record** — the caller-side registry's state for THAT attempt, and **never a store record, a journal entry or a store list's order** |
| `evaluator` | **CALLER-SIDE** — the kernel appends and orders the log; **the store is asked nothing about it and holds nothing of it** |
| `observable` | **a failed attempt whose thrown form's `log` carries the entries in `seq` order with the `outcome` entry's `state` carrying the same token as the form's `status`; a passed attempt whose report's `log` carries them; and the same list read back by `K-4` over the closed attempt** |
| `the clause that declares it` | `§2.4` · `kernel-surface.md §2.5` item 1 · `contract.md §5.2` (`P-IM-2`) · `contract.md §5.5` (`P-SM-5`) |

`[P: §1 — *"Commits tracks the returned messages, ops created, and what constraints/repairs have already
been run"*; P: §B.4 — *"THE KERNEL'S OWN RECORD, DECLARED IN THE JS DIRECTORY"*, the log's order the
kernel's own (`AR-9`), *"nothing crossing the store's surface"*; R: §11.5 — `AR-9`; **the `state` member is
this pass's addition and is the ONE member that makes `VF-9` derivable** | CONTRACT]`

### §2.5 `PAR-C-5` — the constraint's own outcome: the closed three-arm set

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-5`** |
| `the subject` | **the constraint's return** — its outcome |
| `kind` | **`seam`** |
| `unit` | **unitless** — one of three arms |
| `domain` | **exactly three arms: `true`** (the pass) · **`{repair, message}`** (a repairable violation) · **`{message}`** (an unrepaired violation) |
| `the values OUTSIDE it` | **`false`** · **`undefined`** · **any other value at all** · **a fourth arm** · **a `true` carrying a `message`** — **each outside form is READ as the `{message}` arm, i.e. as a violation carrying NO repair, and NO pass is inferred from a truthy value.** **AND THAT READING IS THE ONE READING THIS DIRECTORY CARRIES, WITH THE CONDITIONAL ONE WITHDRAWN BY NAME: an outside form supplies NO `repair`, so it is READ as the `{message}` arm and is then ROUTED BY THE TWO DISJOINTNESS PREDICATES — NEVER by its own registration — so its single member is the kernel's `KC-3` wherever the pair is NOT IN `ran` before the evaluation and NO repair is registered for it (`attempt-lifecycle.md §2.4` item 4's arm `(c)`, whose trigger cell now names this reading); a pair IN `ran` is `KC-5` or `KC-6` by `appliedRepairs`; and the reading that sent an outside form to arm `(d)` and to `KC-4` wherever the pair had a repair registered is WITHDRAWN BY NAME, because arm `(d)` is the arm of a repair that RAN and produced no op and an outside form runs no repair at all.** **What is single-valued either way is THIS ROW: the outside form's `repair` is empty and its `message` is the KERNEL's own generated sentence naming the unrecognized return, so the `KC` token is the ARM's and not the outside form's.** (`RC-20`; `VA-11`; `VA-12`; `kernel-surface.md §2.5` item 1's `constraint-check` row; `attempt-lifecycle.md §2.4` item 4's arm `(c)`) |
| `referent` | **the violated constraint's answer** — the pass, or a violation with or without a repair |
| `evaluator` | **CALLER-SIDE** — the kernel reads the arm; **the store never sees the outcome** |
| `observable` | **a violating write whose pair has NO repair registered that fails `KC-3` with the whole attempt rolled back; a violating write whose pair's repair IS registered and NOT yet in `appliedRepairs` that reaches `REPAIRING` and whose `{message}` text is carried whole into the `constraint-check` entry; and a passing write that reaches the success arm** |
| `the clause that declares it` | `kernel-surface.md §2.3` item 1 · `attempt-lifecycle.md §2.4` item 4's arms `(a)`, `(b)`, `(c)` · `contract.md §5.4` (`P-SM-4`) |

`[P: §1 — *"It … can return True (constraint passes), a repair function + message, or an error message."*;
P: §A.2; R: docs/decisions.md · `A98`; A: docs/specs/storeroom-js/parameter-semantics.md §2.18 — the pattern
this seam is the caller-side carriage of; **`VF-7` is closed by the `(b)`/`(c)` split printed here** |
CONTRACT]`

### §2.6 `PAR-C-6` — the `repair` function the outcome names

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-6`** |
| `the subject` | **`repair`** — the function the repairable-violation arm names |
| `kind` | **`callback`** |
| `unit` | **unitless** — a callable of one argument |
| `domain` | **a function of ONE argument, THE REPAIR CONTEXT (`kernel-surface.md §2.3` item 2's five-member record `{op, address, id, value, tier}`), whose RETURN is `PAR-C-8`'s closed two-arm set** |
| `the values OUTSIDE it` | **a non-function where the arm names a repair** · **an absent `repair` member on the arm that requires one** — **each outside form's declared answer is the kernel's `KC-4`: the attempt fails as a repair that produced no op** |
| `referent` | **the caller's own edit** — the function that makes the constraint-violating data valid, invoked ONCE per pair per repeat, with `value` set to the value standing at the address |
| `evaluator` | **CALLER-SIDE** — the kernel invokes it in the Node.js space, in the caller's own code; **the store is never handed it** |
| `observable` | **a repair that produces an op and returns the attempt to `EVALUATING`; a repair that does not, which fails `KC-4`; a repair whose store verb call is REFUSED, whose store code is named in the `repair-run` entry's `message` while the caller's form is `KC-4`; and a THROWING REPAIR BODY, whose exception the caller receives UNCHANGED AND UNCONVERTED — the attempt reaching arm `(d)` with its `repair-run` entry appended and its terminal record placed with `outcome: 'failed'`, the caller's channel carrying the BODY'S OWN THROWABLE and NEVER a kernel form carrying `KC-4`, and the reading that made it one being WITHDRAWN BY NAME** (`NX-2`; `RD-7`; `attempt-lifecycle.md §2.4` item 8 (i)) |
| `the clause that declares it` | `kernel-surface.md §2.3` item 2 · `attempt-lifecycle.md §2.4` item 4's arm `(b)` |

`[P: §1 — *"The repair function then attempts to make an edit that fixes the constraint-violating data."*;
P: §A.1; P: §A.2 — a repair already recorded as applied may not run again, which is a rule ABOUT this
function's invocation; **`CC-25` is closed by the context's `value`/`tier` members printed here** |
CONTRACT]`

### §2.7 `PAR-C-7` — the repair's own write / delete: the repair's declared channel

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-7`** |
| `the subject` | **the repair's own edit, made through the caller's own store verb — AND THE OP THAT EDIT LANDED, WHICH CROSSES BACK TO THE KERNEL ON THE REPAIR'S OWN RETURN** — **the repair-op seam `A: docs/decisions.md` · `A110` rules: the repair function calls the store's own `write` in its own body, that call's return carries the store's own op value, and the repair spells that value back on its `{ok, message, op}` return's `op` member** |
| `kind` | **`seam`** — with the verb call itself read as the `callback` half this row also carries |
| `unit` | **an op (`JournalOp`) or nothing** — the store's own `write` return where it produced one, **and the `op` member of the repair's own return where it did (`A: docs/decisions.md` · `A110`)** |
| `domain` | **exactly two store verbs: the store's `write` and the store's `delete`, each called through the caller's own surface** |
| `the values OUTSIDE it` | **any third channel** — a constraint-specific write verb · **a store-side repair route** · **a store-side journal access** · **a function-carrying STORE parameter** · **a direct graph mutation** — **each outside form's declared answer is REFUSAL: the channel does not exist, no store verb takes a function at any position, and the repair's route where it exists is the caller's own verb call** |
| `referent` | **the store's own two tracked verbs** — the acts the journal records, by `kind: 'write'` and `kind: 'delete'` — **and, on the `write`, the op that verb returned, which is the value the repair spells into its own return's `op` member** (`A: docs/decisions.md` · `A110`) |
| `evaluator` | **STORE-SIDE for the verb itself** — the store runs the write or the delete and returns the op — **and CALLER-SIDE for reading the return**, because the kernel reads the op and adds it to the attempt |
| `observable` | **a repaired op that is ADDED to the attempt's ops and re-evaluated; a repair whose verb call the store refuses, whose store code is named in the `repair-run` entry and whose attempt arm is `KC-4`; a repair whose `delete` REMOVED VERSIONS and whose attempt arm is STILL `KC-4`, because the `DeleteReceipt` carries no op member (`RC-1`); a repair whose `delete` REMOVED NOTHING, which returns NO op and fails `KC-4`; and a `write` that lands an UNCHANGED value, which DOES return an op, whose op IS added and whose arm is decided by the re-run** — **AND THE SEAM'S OWN CLAUSE, ITS ONE HOME (`A: docs/decisions.md` · `A110`): THE KERNEL READS THE OP THE REPAIR LANDED OFF THE REPAIR'S OWN RETURN AND NOWHERE ELSE — the op it APPENDS to the attempt's `ops` IS `returnValue.op` — AND `returnValue.op`'s ONE DECLARED VALUE IS THE STORE'S OWN OP VALUE, THE ONE THE STORE'S WRITE ANSWERED WITH, so a return carrying any other identity has carried no op at all.** **AND AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined`, OR NOT THE OP THE REPAIR ACTUALLY LANDED IS THE APP'S OWN DEFECT AND NOT A KERNEL STATE OF ITS OWN: THE KERNEL CREDITS NO OP, THE ATTEMPT TAKES ARM `(d)` AND FAILS `KC-4` (`ConstraintRepairFailed`) exactly as a repair that produced no op does, its `repair-run` entry is appended, and the kernel's own generated sentence names the unrecognized or unlanded `op`** (`attempt-lifecycle.md §2.4` item 4's arm `(d)`; `parameter-semantics.md §2.8`; `fail-surface.md §2`). **AND NO MODULE INTERCEPTION, NO MONKEY-PATCH, NO ADDON LOAD PATH AND NO SECOND DEPENDENCY EXISTS ANYWHERE IN THIS UNIT — the route `A110` DELETES, stated once here so no clause of this directory seeks another channel for the op and no drive reaches the addon by a path of its own** (`kernel-surface.md §1` item 1's fixture clause) |
| `the clause that declares it` | `kernel-surface.md §2.3` item 2 · `contract.md §5.4` (`P-SM-4`'s arm `(d)`) |

`[P: §1 — *"If a repair is made and successfully creates a new op, that op is added, and the triggered
constraints run again."*; P: §B.3 — per-op `rollback` over the attempt's ops; P: §B.7; A:
docs/specs/storeroom-js/parameter-semantics.md §2.18 — *"the store's own surface takes no function at any
position"*; A: docs/specs/storeroom-native/contract.md §7.3 clause 3 — **whether a repair writes through the
journaled write path is `J-22`, `OWED`, owner the architect**, and this row therefore declares the CHANNEL
and not the route; **the two edit shapes' arms are `CC-8`'s and `CC-27`'s close and are printed here**;
**AND THE REPAIR-OP SEAM IS RULED AT THIS ROW — `A: docs/decisions.md` · `A110`: the repair's own return
carries the op it landed, `{ok, message, op}`, `op` REQUIRED IFF `ok === true` and ABSENT where it is
`false`, the kernel reading that op off this return and nowhere else, and the addon route DELETED rather
than widened — whose ONE full statement, the four negatives included, is THIS ROW's `observable` cell and is cited from every other site**; **AND `J-22` STAYS `OWED`, UNMOVED AND UNLIFTED BY THAT RULING, DECLARED HERE SO NO PASS READS THE SEAM AS ANSWERING IT (`A110` closes the KERNEL-SIDE seam — WHICH RETURN carries the op — and NOT the STORE-SIDE question `J-22` asks, whether a repair's write is the journaled write path; `docs/pending.md`'s `P-1` row and `docs/specs/storeroom-native/contract.md §7.3` clause 3 stand as they are)** |
CONTRACT + one OWED]`

### §2.8 `PAR-C-8` — the repair's own result: the closed two-arm set

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-8`** |
| `the subject` | **the repair's return** — its result |
| `kind` | **`return-field`** |
| `unit` | **unitless** — one of two arms |
| `domain` | **exactly two arms, of three members: `{ok: true, op}`** (the repair made its edit, **and `op` is THE OP IT LANDED — the store's own `write` return's value, REQUIRED IFF `ok === true` and ABSENT, NEVER `null`, WHERE `ok === false`**, its one home being this directory's `parameter-semantics.md §2.7`, `A: docs/decisions.md` · `A110`) · **`{ok: false, message}`** (it failed and explains what it ATTEMPTED) |
| `the values OUTSIDE it` | **a bare `true`** · **a bare `false`** · **`undefined`** · **`{ok: true, message}`** · **`{ok: false}` with no message** · **any other object** — **each outside form is READ as the `{ok: false, message}` arm, with the `message` being the KERNEL's own generated sentence naming the unrecognized result, so its declared answer is the kernel's `KC-4`: no op is credited and the attempt fails.** **AND THAT READING DOES NOT DEPEND ON THE PAIR'S STATE — DECIDED HERE, WITH THE READING THAT MADE THE OUTSIDE FORM'S ANSWER CONDITIONAL WITHDRAWN BY NAME: the outside form is read as a repair that produced no op, which is arm `(d)`'s own state, and the attempt's terminal answer is `KC-4` whether or not the pair's repair had been recorded as applied** (`RC-20`; `attempt-lifecycle.md §2.4` item 4's arm `(d)`) |
| `referent` | **the repair's own success or failure, with the change made or ATTEMPTED — and, on the success arm, the op that change landed, the value the store's own `write` returned and the repair spelled into its `op` member** (`A: docs/decisions.md` · `A110`; `§2.7`) |
| `evaluator` | **CALLER-SIDE** — the kernel reads the arm **and reads the op off the repair's own return, the shape `§2.7` owns** (`A: docs/decisions.md` · `A110`) |
| `observable` | **a `{ok: true, op}` repair whose op is added and re-evaluated — where the store returned an op, which a `delete` NEVER does on either arm and which a `delete` that removed nothing does not either (`DeleteReceipt` has no op member, `RC-1`); a `{ok: true}` repair with NO `op`, or with an `op` that is not the one it landed, whose declared answer is the kernel's `KC-4` — arm `(d)` — exactly as a failed repair's is; and a `{ok: false, message}` repair whose message is carried into the `repair-run` entry and whose attempt fails `KC-4`** (`A: docs/decisions.md` · `A110`; `§2.7`; `fail-surface.md §2`) |
| `the clause that declares it` | `kernel-surface.md §2.3` item 2 · `contract.md §5.4` (`P-SM-4`'s arm `(d)`) |

`[P: §1 — *"It returns a success true/false and a message explaining the change made/attempted."*; R:
docs/decisions.md · `A98`; **`A: docs/decisions.md` · `A110` — the success arm's third member, the `op` the
repair landed, ruled at `§2.7`**; `[T: the result's member set | DECLARED-DEFAULT]` — `3` members AT THE
`A110` LANDING PASS OF 2026-10-13 (`2 + 1 = 3`, the member census read at the shape's own home,
`kernel-surface.md §2.3` item 2) | CONTRACT]`

### §2.9 `PAR-C-9` — the applied-repair marker

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-9`** |
| `the subject` | **the applied-repair marker** — *"what constraints/repairs have already been run for a given write attempt"* |
| `kind` | **`option`** |
| `unit` | **constraint pairs** — a set of `(address, id)` pair keys, spelled per `attempt-lifecycle.md §2.4` item 2 |
| `domain` | **the attempt record's own `appliedRepairs` member: pair keys recorded for THIS attempt and for no other** |
| `the values OUTSIDE it` | **a marker that a LATER attempt consults** · **a marker shared between two attempts or two instances** · **a marker read from the journal** · **a marker that writes a store entry** · **a marker that appends a journal entry** — **each outside form's declared answer is REFUSAL: the marker is per attempt, caller-side and home-less, and no clause admits a wider lifetime.** **NO CLOSED SHAPE CARRIES IT: the marker is read off the OPEN `AttemptRecord`'s `appliedRepairs` member, which the closed `AttemptReport` does not have** (`kernel-surface.md §2.5` item 2) |
| `referent` | **whether a repair for a pair has already run IN THIS ATTEMPT** — the predicate `§A.2`'s first limb reads |
| `evaluator` | **CALLER-SIDE** — *"the caller evaluates \"already recorded as applied\""*; **the store evaluates nothing of it and is asked nothing about it** |
| `observable` | **a repeat within ONE attempt that fails `KC-5` with a `repair-run` entry count of `1` for that pair's OWN KEY; and a SECOND, SEPARATE attempt at the same address that runs the same repair again, with its OWN `repair-run` entry, because its `appliedRepairs` starts empty** |
| `the clause that declares it` | `kernel-surface.md §2.5` item 2 · `contract.md §5.8` (`P-TP-8`) · `contract.md §5.6` (`P-SM-6`) |

`[P: §B.8 — the caller-side registry, *"declared by the amendment"*; P: §A.2 — *"A repair already recorded
as applied may not run again"*; R: §11.5 — `AR-23` read caller-side; R: docs/decisions.md · `A99`; **`CC-17`
is closed by the per-attempt predicate printed here** | CONTRACT]`

### §2.10 `PAR-C-10` — `supplier`: who supplies each value

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-10`** |
| `the subject` | **`supplier`** — the source of every value this unit's surface takes |
| `kind` | **`option`** |
| `unit` | **unitless** — a side |
| `domain` | **exactly one value: `caller-side`** — **every value this unit's surface takes is supplied by the CALLER** |
| `the values OUTSIDE it` | **`store-side`** · **`either`** · **`both`** — **each outside form's declared answer is REFUSAL, and the reason is stated rather than left implicit: the store's surface takes no function at any position, holds no constraint registration, no constraint record and no constraint id, and the store's listener record is closed at `{address, handle}`** |
| `referent` | **the caller** — the app, the listener body, or the external call site |
| `evaluator` | **CALLER-SIDE** — a row whose `supplier` were store-side would contradict `P: §B.7` and the store's own `docs/specs/storeroom-native/contract.md §7.3` clause 1 |
| `observable` | **the `supplier` cell of every row of `§2` above reads `caller-side`, and `0` of them reads otherwise** |
| `the clause that declares it` | `contract.md §5.1`–`§5.8` (each row's own cells) · `kernel-surface.md §1` item 3 |

`[P: §B.7 — *"no store entry"*; P: §A.1; A: docs/specs/storeroom-native/contract.md §7.3 clause 1; A:
docs/specs/storeroom-native/write-and-read.md §6.5 item 10 (a) | CONTRACT]`

### §2.11 `PAR-C-11` — `evaluator`: who evaluates each value

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-11`** |
| `the subject` | **`evaluator`** — who decides each value's admissibility, at which side |
| `kind` | **`callback`** — the caller's own act of evaluating |
| `unit` | **unitless** — a side, with the store's own exceptions named |
| `domain` | **`caller-side` for every value EXCEPT THE EXACTLY THREE THE STORE'S OWN MACHINERY CHECKS, each named so the exception set is closed: (i) the registration's `address`, checked by the store's listener machinery *"as normal for listeners"*; (ii) the `tier` a `commit` passes and the `value`'s own admissibility at the store's `write` — the two members `PAR-C-16`'s context carries for exactly this reason; (iii) the `opId` a per-op `rollback` takes** |
| `the values OUTSIDE it` | **an evaluator that is store-side for the `id`** · **store-side for the `constraint` function** · **store-side for the message log** · **store-side for the applied-repair marker** · **store-side for the repair's result** — **each outside form's declared answer is REFUSAL, for `§2.10`'s own reason** |
| `referent` | **the kernel, which is the caller's own code** — with the store's three exceptions named above |
| `evaluator` | **CALLER-SIDE** for the kernel's own acts; **STORE-SIDE** for the three named exceptions and for nothing else |
| `observable` | **an address SHAPE outside the domain that reaches the caller as the kernel's `KC-1`; an address the store's own `listen` refuses, which throws the STORE'S OWN CODE; an address the store admits whose handle the kernel adopts; a `tier` outside its domain that throws the STORE's own `OutOfDomainTier` at the commit's verb call, with NO attempt opened; and an `opId` the journal does not hold that fails the store's `JournalOpUnknown`, whose kernel answer is `KC-8`** |
| `the clause that declares it` | `contract.md §5.1`–`§5.8` · `fail-surface.md §1.2` · `fail-surface.md §3` item 2 |

`[P: §A.1; P: §B.6; P: §B.7; P: §B.8; A: docs/specs/storeroom-native/contract.md §8.1` (the closed `15`,
reached at the caller's own verb calls); **`CC-21` is closed by exception (ii)'s own clause: a `tier`
refusal opens NO attempt and is `K-2`'s store channel, not `P-SM-4`'s arm `(h)`** | CONTRACT]`

### §2.12 `PAR-C-12` — the kernel's module name and realm

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-12`** |
| `the subject` | **the kernel's module name and its realm** |
| `kind` | **`option`** |
| `unit` | **unitless** — a module name |
| `domain` | **exactly one name, `constraint-kernel`, in ONE realm: Node ESM, caller-side** |
| `the values OUTSIDE it` | **a ninth member of the existing JS package's namespace** · **a second published package** · **a store-side module** — **each outside form's declared answer is REFUSAL, with its reason and its reversal point priced at the row's own clause; and the FIRST of them is the form that would reach `PUB-DD-9`'s `MINOR` class** |
| `referent` | **the module the caller imports** — the kernel, not the store and not the JS package |
| `evaluator` | **CALLER-SIDE** — the module name is the caller's own namespace decision, and no store clause and no publish clause is reached by it while the kernel stays separate |
| `observable` | **an import that resolves at `constraint-kernel`; a kernel whose five items are reachable from that module and from nowhere else; and the JS package's namespace standing at its own `8` verbs, unmoved** |
| `the clause that declares it` | `kernel-surface.md §1` item 1 · `fail-surface.md §4` items 2–3 |

`[T: the module name | DECLARED-DEFAULT]` — priced at `kernel-surface.md §1` item 1 · `A:
docs/specs/storeroom-js/contract.md §2.9` item 1 (the `8`-verb namespace closure) · `A:
docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-9` and `docs/specs/storeroom-publish/release.md §2`
(the `MINOR` class this route would reach) · `P: §B.2` | CONTRACT]`

### §2.13 `PAR-C-13` — the kernel's surface extent: the five items, and the ONE `K-3`/`K-5` shape

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-13`** |
| `the subject` | **the kernel's surface extent** — which items exist, and what shape each returns |
| `kind` | **`option`** |
| `unit` | **items** |
| `domain` | **exactly five items: `K-1` `register` · `K-2` `commit` · `K-3` `runAttempt` · `K-4` `log` · `K-5` `report`** |
| `the values OUTSIDE it` | **a sixth item** — an `unregister`, an `attempts()` enumerator, a `pendingListeners()` reader (a SURFACE ITEM, and not the `CommitRecord.pending` member `kernel-surface.md §2.1` item 2 declares, which is no item of this surface) — **each outside form's declared answer is REFUSAL, priced at `kernel-surface.md §1` item 2, and each refusal has a declared substitution for the observation a drive would want (`composition-and-states.md §2.7` item 12)** · **a `K-3`/`K-5` shape divergence** — answered as REFUSAL, because a report is ONE shape whether it arrives from the run or from the record |
| `referent` | **the caller-facing surface** — the items a TestWriter drives and the red set's subjects |
| `evaluator` | **CALLER-SIDE** — the kernel's own extent is the caller-side module's declaration |
| `observable` | **five reachable items; `K-3` and `K-5` returning ONE FIVE-MEMBER shape — `{attempt, outcome, ops, log, rollback}`, `5` members — for `K-3` and `K-5` ALIKE; `K-2` returning ONE FOUR-MEMBER `{attempt, op, triggered, pending}` (the fourth, `pending`, added at the `A108` landing pass of 2026-10-13, which `kernel-surface.md §2.1` item 2 declares and this cell reads — **and which the `A109` landing pass of 2026-10-13 reads there as the CALLER'S OWN WORK LIST, its own loop being layer (b)'s only invoker; THE `ONLY INVOKER` HALF OF THAT READING IS WITHDRAWN BY NAME AT THE `A112` DELIVERY-MODEL RE-SPELL PASS OF 2026-10-13, WHICH LANDS `A: docs/decisions.md` · `A112`: THE STORE RETURNS THE HANDLES AND INVOKES NOTHING, THE JS SURFACE RUNS THE TRIGGERED CONSTRAINTS FIRST AND, ONCE EVERY CONSTRAINT HAS PASSED, THE OTHER LISTENERS, BEFORE RETURNING TO THE CALLING PROCESS, AND `pending` CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES — so the caller's own loop is ONE INVOKER AMONG THE SURFACE'S OWN LAYERS AND NOT THE ONLY ONE, and the member's own census is unmoved (`A: docs/decisions.md` · `A109` `D2`; `A112`; `VK-5`'s census re-check: the member census stands at `§2.1` ITEM 2, and `kernel-surface.md §1` item 4's `CommitRecord` row is the ENUMERATION that points back here, so no citation moved)**); `K-1` returning an adopted `Handle`; `K-4` returning `LogEntry[]`; and no sixth item reachable from the module** |
| `the clause that declares it` | `kernel-surface.md §1` item 2 · `kernel-surface.md §2.1` items 1–5 |

`[T: the surface's extent | DECLARED-DEFAULT]` — priced at `kernel-surface.md §1` item 2 · `P: §B.1` (the
unit's own `≤ 8` register is a DIFFERENT surface from the kernel's five items) · `P: §B.5` — *"its own
directory, register, dossier and red set"*; **`VF-14` is closed by the member counts printed here: the
"one shape" claim is scoped to `K-3`/`K-5` and both shapes' counts are stated** | CONTRACT]`

### §2.14 `PAR-C-14` — the write's `value`, as the attempt context carries it

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-14`** |
| `the subject` | **`value`** — `K-2`'s third argument, and the DATA a constraint confirms |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a value in the store's admitted taxonomy |
| `domain` | **the store's own admitted value taxonomy, UNCHANGED AND NOT RE-DECLARED HERE:** the values the store's `write` admits at the `tier` it lands at (`A: docs/specs/storeroom-native/contract.md §3.1`; `A: docs/specs/storeroom-js/parameter-semantics.md §2.10`) |
| `the values OUTSIDE it` | **a value the store's taxonomy does not admit at that tier — which the STORE refuses with its own `ValueNotAdmitted` at the verb call, in the store's own form; and an ABSENT argument, which the STORE'S OWN `write` refuses AT THE VERB CALL ON THE STORE'S OWN CHANNEL, exactly as an out-of-domain `tier` is refused there — the kernel mints NO `KC-2` for an absent `value`, and this cell's reading is the one `fail-surface.md §2`'s `KC-2` row carries** (`RD-1`; `kernel-surface.md §2.1` item 2's tier clause) |
| `referent` | **the data the write lands** — and, inside the attempt, the SAME value the `AttemptContext.value` member carries VERBATIM to every constraint that evaluates it |
| `evaluator` | **STORE-SIDE for admissibility** — the store's `write` admits or refuses it — **and CALLER-SIDE for the constraint's reading of it**, because the constraint is the caller's own function and the value it sees is the one the verb returned |
| `observable` | **a write whose value the store admits, whose op is returned and whose value every constraint's `constraint-check` evaluation saw — readable through the constraint's own outcome and through the store's read-back at the address; a write whose value the store refuses, which throws the store's own `ValueNotAdmitted` and opens NO attempt; and a constraint that CONFIRMS a value it could not see before this row existed (`CC-1`)** |
| `the clause that declares it` | `kernel-surface.md §2.1` item 2 (`K-2`) · `kernel-surface.md §2.3` item 1 (`AttemptContext.value`) · `contract.md §5.4` (`P-SM-4`'s `S-ATT-SHAPE` line) |

`[P: §1 — *"confirms if the data shape is valid"*, the parameter's warrant, since a constraint that cannot
see the value cannot confirm it; A: docs/specs/storeroom-native/contract.md §3.1` (the admitted taxonomy)
and `§8.1` member `9` (`ValueNotAdmitted`); **`VF-3` is closed by this row: `value` was declared by `K-2`'s
signature and by no `PAR-C` row before this one — and the ABSENT-`value` reading this row first carried as a
kernel `KC-2` is WITHDRAWN BY NAME, because it wrote a `KC-2` site the fail-surface census does not count and
contradicted the tier clause that stands beside it (`RD-1`; `NX-3`)** | CONTRACT]`

### §2.15 `PAR-C-15` — the attempt reference: `AttemptRef`, the `attempt` argument

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-15`** |
| `the subject` | **the attempt reference** — the `attempt` argument of `K-4`/`K-5`, and the `attempt` member of `CommitRecord` and of every `AttemptReport` |
| `kind` | **`parameter`** |
| `unit` | **unitless** — one token |
| `domain` | **`AttemptRef`, a record of exactly ONE member `{id: string}` whose `id` is a non-empty string minted by the kernel at `K-2` and unique within the kernel instance — TOGETHER WITH the bare `id` string itself, which `K-4`/`K-5` accept as the same argument; NOTHING ELSE is in the domain** |
| `the values OUTSIDE it` | **an `id` the kernel holds no attempt for** · **`null`** · **`undefined`** · **a non-string, non-`AttemptRef` value** · **an `AttemptRef` whose `id` is empty** — **each outside form's declared answer is the kernel's `KC-2`** |
| `referent` | **exactly ONE attempt** — the open record the registry holds under its address while it is open, and the closed-attempt record the kernel holds under this reference once it is closed |
| `evaluator` | **CALLER-SIDE** — the kernel mints it and looks it up; **the store never sees it, holds it or is asked about it** |
| `observable` | **`CommitRecord.attempt` carrying a reference; `K-4`/`K-5` returning that attempt's own members for it; `K-5` throwing `KC-7` over a STILL-OPEN attempt; `K-5` throwing `KC-2` over a reference the kernel holds no attempt for — the reading `E2E-C-14` drives; `K-3` throwing `KC-2` over a `CommitRecord.attempt` naming a CLOSED or UNKNOWN attempt — the stale-record arm the caller holds after a terminal arm (`RD-9`); and `K-3`'s report carrying the same reference `K-5` then accepts** |
| `the clause that declares it` | `attempt-lifecycle.md §2.4` items 1 and 2 · `kernel-surface.md §2.1` items 2–5 · `contract.md §5.2` (`P-IM-2`) |

`[P: §1 — *"tracks … for a given write attempt"*, the identity's warrant, since the proposal's own sentence
names the attempt as the unit of bookkeeping; P: §B.4; **`VF-3` and `CC-19` are closed by this row: `K-4` and
`K-5`'s `attempt` argument had no row — and `K-3` takes the `CommitRecord` that CARRIES this reference as its
own member and takes no `attempt` argument, which this row's `the subject` cell and `§1`'s index cell now print
alike** (`RC-5`) — **and `VF-1`'s `A98`–`A101` rows are the authority of the
attempt's own identity** | CONTRACT]`

### §2.16 `PAR-C-16` — the attempt context, and the repair context beside it

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-16`** |
| `the subject` | **the attempt context** — the constraint function's ONE argument — **and, beside it, the repair context the repair function takes** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a record |
| `domain` | **TWO closed records, each with a printed member set: `AttemptContext {address, tier, value, attempt, op}` — `5` members — and `RepairContext {op, address, id, value, tier}` — `5` members.** **Every member is SUPPLIED BY THE CALLER-SIDE KERNEL, VERBATIM from the store's own returns, and the two lists' `address`, `tier` and `value` members refer to the SAME value the constraint confirmed in both** |
| `the values OUTSIDE it` | **a sixth member on either record** · **a member absent from either record** · **`AttemptContext` handed the attempt RECORD instead of the context** · **`RepairContext` missing `value` or `tier`, which would leave a repair unable to issue a lawful `write`** — **each outside form's declared answer is REFUSAL: the member sets are closed, and a context carrying a member `kernel-surface.md §2.3` does not declare is a different shape** |
| `referent` | **the state the invocation happens at** — for `AttemptContext`, the attempt's own evaluation of ONE op at ONE address; for `RepairContext`, ONE violated pair at ONE op |
| `evaluator` | **CALLER-SIDE** — the kernel builds each context and hands it to the caller's own function; **the store is handed nothing and asked nothing** |
| `observable` | **a constraint whose outcome depends on the value it read, which it could only have read from `value`; a repair that issues a lawful `write` at `tier` with the `value` it corrected; and — the negative half — no `constraint-check` or `repair-run` entry carrying a member outside the log's six, because no context member leaks into the log** |
| `the clause that declares it` | `kernel-surface.md §2.3` items 1–2 · `contract.md §5.5` (`P-SM-5`'s `S-SIDE` line) |

`[P: §A.1 — *"the function is run in the node.js space"*; P: §B.4 — the kernel's own record; **`CC-1`,
`VF-3` and `CC-25` are closed by these two records' printed member sets: the constraint can see the value it
confirms and the repair can see the value it corrects, and neither context is left at a name** |
CONTRACT]`

### §2.17 `PAR-C-17` — the `RollbackStep` record: what each per-op call returned

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-C-17`** |
| `the subject` | **the per-op rollback call's own result, as the kernel records it** — the member `CC-14` found carried by no form |
| `kind` | **`return-field`** |
| `unit` | **unitless** — a record per performed call |
| `domain` | **`RollbackStep {opId, undoneOps, restoredTo, answer, failed, checkpoint}`, exactly `6` members, one record PER CALL THE COMPOSITION PERFORMED, in performed order — `failed: false` with the store's own `undoneOps`/`restoredTo` where the call RETURNED, and `failed: true` with `undoneOps: []` and `restoredTo` the state that op's own subtree stood at, read by the store's own `read(address, tier?)` verb; and `checkpoint` THE OP the attempt's own checkpoint is recorded as, or `null`, carried IDENTICALLY by every step of one attempt's composition** — **AND THE `checkpoint` MEMBER'S DOMAIN IS DECLARED AT ITS ONE HOME, `composition-and-states.md §2.6` item 8 (iii), WHICH THIS CELL CITES, AND WHAT THIS CELL READS OFF THAT HOME IS THE MEMBER'S CANDIDATE SET AND ITS `null` ARM** (`VE-10`; `VE-11`; `CZ-6`): **the member is the `opId` OF THE LAST LANDING THAT LEFT EVERY REGISTERED PAIR AT THE ATTEMPT'S OWN ADDRESS PASSING — WHOEVER'S LANDING ESTABLISHED IT (`A: docs/decisions.md` · `A104`, `A105` — *"Any last valid state for the store."*) — and the `null` ARM IS FIXED THERE ADDRESS-WIDE AND NOT AS *"no op of the attempt left one"*, THAT ATTEMPT-SCOPED SPELLING STANDING WITHDRAWN BY NAME AT THAT HOME — AND THE OP SO NAMED MAY BE ONE ANOTHER ATTEMPT LANDED, WHICH THE ARCHITECT HAS CONFIRMED (`A: docs/decisions.md` · `A104` — *"Yes — the checkpoint may name an op ANOTHER attempt landed."*), so NO OP OF ANOTHER ATTEMPT IS AN OUTSIDE VALUE OF THIS MEMBER ANYWHERE IN THIS DIRECTORY; and where NO LANDING AT THE ATTEMPT'S OWN ADDRESS LEFT IT VALID THE MEMBER IS `null` ON EVERY STEP — ADDRESS-WIDE, AS THE HOME DECLARES IT, AND NEVER *"no op of the attempt left one"* — **AND WHICH OF THE MEMBER'S TWO ARMS THIS CELL, OR ANY DRIVE OF THIS DIRECTORY, CAN REACH IS DECLARED WITH IT: THE `null` ARM ALONE IS OBSERVABLE WHILE THE PER-LANDING PASS IS `OWED`, SO NO DRIVE MAY READ A NON-NULL `checkpoint` AS A FAILURE OF THE KERNEL** (`contract.md §0.1` item 5 (i); `composition-and-states.md §2.6` item 8 (i) and (iii); `live-greens.md`'s `CON-1`) |
| `the values OUTSIDE it` | **a seventh member** · **a member dropped** · **a store `RollbackResult` object carried whole in place of this record** · **a step list that carries a call the composition did not perform, or omits one it did** · **a `step` list absent rather than `[]` on the success arm** · **a step whose `failed` flag says a call returned where `answer` names a store code, or says a call threw where `answer` is `'ok'`** · **a step that reports a non-empty `undoneOps` with `failed: true`** · **two steps of ONE attempt carrying two different `checkpoint` values, or **AND THE POSITION THAT MAKES *"OUTSIDE"* DECIDABLE FOR A FOREIGN OP IS READ FROM THAT OP'S OWN PROCESSING'S ENTRY AND NEVER FROM THE ATTEMPT'S OWN `ops` SEQUENCE (the derivation filed under `A106` `Q4`'s second half; `composition-and-states.md §2.6` item 1; `DB-3`; `DB-6`; `VG-8`) — AND THE TWO READINGS ARE NOT DISTINGUISHED BY ANY DRIVE THIS DIRECTORY CARRIES YET, STATED PLAINLY WITH ITS TERMS RATHER THAN LEFT TO A SCENARIO THAT WOULD HAVE TO INVENT AN EXPECTATION NO DECLARED MEMBER DECIDES: on every drive of `e2e-scenarios.md` the foreign `checkpoint` op a walk reads stands at ITS OWN processing's LAST position, so the performed step list the position decides is THE SAME under both readings — a `checkpoint` naming a pair key, an op outside the attempt's own `ops` WHOSE LANDING NO EVALUATION OF THIS ATTEMPT READ A STATE AFTER, or an op whose landing left no valid state — the composition's target is single-valued per attempt and it is an OP (`A106` `Q4`; `DB-6`) —** — **each outside form's declared answer is REFUSAL: the success arm's member is an EMPTY LIST, the failure arm's list is exactly the calls performed, and every step carries all six members on both arms** (`composition-and-states.md §2.6` items 3–4; `RC-10`; `RC-14`; `Q-A`; `Q-B`) — **AND THE SIX-MEMBER SET IS THEREBY CLOSED IN THE SAME WAY THIS ROW SET'S `domain` CELLS ARE CLOSED: the `6` members printed in the cell above are the set's WHOLE membership, NOTHING ELSE is in it, and a shape carrying a member outside it is not this record** (`kernel-surface.md §1` item 4 reads the same closed set) |
| `referent` | **what the store's own `rollback` reported for one call — the opIds it undid and the state the addressed subtree stands at — plus whether that call returned at all and the store's own code where it threw** |
| `evaluator` | **STORE-SIDE for the members' content where the call RETURNED** — `undoneOps` and `restoredTo` are the store's own — **and CALLER-SIDE for their recording, for the throw's status and for the order**, because the kernel writes the step and reads the throwing arm's state through the store's own declared `read(address, tier?)` verb, the verb the kernel's channel names** |
| `observable` | **a failed attempt whose thrown form's log names the floor and whose `K-5` report's `rollback` member carries one `RollbackStep` per performed call, in performed order, with `failed: false` and `answer: 'ok'` where the call returned and `failed: true` with the store's own code where it threw; an attempt whose composition SKIPS an op because a previous step's `undoneOps` held its `opId`; an attempt that claims NO reach past a compacted base, observable as the union of the steps' `undoneOps` members and nothing wider; and the composition's TARGET read off the steps' `checkpoint` member AS AN OP — all steps of one attempt carrying that attempt's one `opId`, `null` where no landing at the attempt's address left every registered pair there passing, the walk stopping at that op and never passing it to the store verb — **AND WHICH OF THAT MEMBER'S TWO ARMS A DRIVE CAN REACH IS DECLARED HERE WITH THE CELL: THE `null` ARM ALONE, BY EVERY DRIVE OF THIS DIRECTORY, WHILE THE PER-LANDING PASS THAT ALONE CAN RECORD A NON-NULL ARM IS `OWED` — so a non-null `checkpoint` is never a drive's expectation and its absence is never a drive's failure** (`contract.md §0.1` item 5 (i); `composition-and-states.md §2.6` item 8 (i); `live-greens.md`'s `CON-1`) |
| `the clause that declares it` | `composition-and-states.md §2.6` items 3–6 and item 8 — **AND THE `checkpoint` MEMBER'S DOMAIN AND ITS `null` ARM ARE READ AT THAT SECTION'S ITEM 8 (iii), WHICH IS THEIR ONE HOME AND WHICH THIS CELL CITES: item 3's block carries the member and its TYPE, item 8 (iii) carries the domain, and neither this cell nor any other re-states either** (`VE-10`; `VE-11`; `CZ-6` — the `checkpoint` member's type and its stop rule included) · `contract.md §5.7` (`P-TP-7`, and the commit registry's clearing rule `A: docs/decisions.md` · `A103` states, CITED from its one home and never re-derived) · `parameter-semantics.md §2.8` (`PAR-C-8`'s sibling return-field) |

`[P: §B.3 — *"the compacted floor named: per-op reach, never a claim past a compacted base."*; A:
docs/specs/storeroom-native/write-and-read.md §6.3` (`RollbackResult`'s three members: *"the opIds the
rollback undid"*); **`CC-14` and `CC-13` are closed by this row: the composition's performed set is
observable, and `P-TP-7`'s claim is read over the members this record carries** — **AND THE `checkpoint`
MEMBERS IS RE-DERIVED HERE BECAUSE THE ARCHITECT'S RULINGS ADDED IT AND THEN RE-SPELLED IT (`A: docs/decisions.md` · `A102`, D1/D2; `Q-A`/`Q-B`; **`A105` `Q1` — *"Any last valid state for the store."* — AND `A104` AND `A103`, D5, THE `A105` ROW BEING THE ONE THAT FIXES THE MEMBER'S DOMAIN AND ITS `null` ARM AND THE `A103` ROW BEING THE CLEARING RULE'S, CITED HERE AS A CLEARING RULE AND NOT AS THIS MEMBER'S DOMAIN, WHICH IS THE CONFUSION `CZ-7` NAMES AND WHICH THIS LINE CLOSES**):
the row's figure moves `5` → `6` with its term named, the `checkpoint` member's TYPE is re-spelled from a pair
key to THE OP whose landing left the attempt's last valid state — the walk's stop op — the outside-value cell's
`a sixth member` is re-spelled `a seventh member` and now admits no pair key as a value, and the row set's own
count is UNMOVED at `17` because this is the `RollbackStep`'s row and not a new subject — the commit registry's
clearing rule being CITED here from its one home `contract.md §5.7` rather than given a row, a register being a
MAP and not a parameter** | CONTRACT]`

---

**END OF THE `parameter-semantics` PART.** **`17` rows (`PAR-C-1`…`PAR-C-17`) — RE-DERIVED AT THIS PASS
FROM THE INDEX'S OWN KIND CELLS, PRINTED WITH BOTH TERMS — AND THE FIGURE IS **UNMOVED** BY THE
RULING-LANDING PASS OF 2026-10-13, WHICH RE-DERIVED `§2.17`'s CELLS AND ADDED NO ROW (the commit registry is a
caller-side MAP whose clearing rule `contract.md §5.7` states, not a parameter of this unit's surface, so no
row is missing for it and none is added): `parameter` × `6` (`PAR-C-1`, `PAR-C-2`,
`PAR-C-3`, `PAR-C-14`, `PAR-C-15`, `PAR-C-16`) + `seam` × `2` (`PAR-C-5`, `PAR-C-7`) + `callback` × `2`
(`PAR-C-6`, `PAR-C-11`) + `return-field` × `2` (`PAR-C-8`, `PAR-C-17`) + `option` × `5` (`PAR-C-4`,
`PAR-C-9`, `PAR-C-10`, `PAR-C-12`, `PAR-C-13`) — `6 + 2 + 2 + 2 + 5 = 17` ✓, and `17` `PAR-C` rows are
`17` of `17` — · `0` rows carrying an empty
`domain` cell · `0` rows whose `evaluator` cell is unstated · `0` rows missing a subject `§11.6` names ·
`0` rows printing a store member as a kernel-side answer · `0` declared parameters of this unit's surface
left without a row — **AND `tier` IS NOT SUCH A PARAMETER, SO NO ROW IS MISSING FOR IT: it carries no
`PAR-C` row, and the claim that it does is withdrawn at `kernel-surface.md §2.1` item 2 (`NV-7`)** —
**and the set is UNCAPPED provenance rows, not a register, with the `≤ 8` cap
untouched at `contract.md §5`.** **AND THE FIGURE IS UNMOVED BY THE `A110` LANDING PASS OF 2026-10-13 TOO, WHICH AMENDED `§2.7`'s AND `§2.8`'s CELLS AND ADDED NO ROW: `PAR-C-8`'s success arm now carries THREE members where it carried two, so the two-term arithmetic that moved is the MEMBER census and not the row census — `2 + 1 = 3` ✓ members at `§2.8` — while `6 + 2 + 2 + 2 + 5 = 17` ✓ row terms stand exactly as printed above and below.** (`[T: this part's own closing census, printed with its terms | CENSUS]`).

## §3. `A112` DELIVERY-MODEL RE-SPELL, 2026-10-13

**THE RULING THIS SECTION RECORDS IS `A: docs/decisions.md` · `A112` — the architect's own words of 2026-10-13: *"The Rust store returns the handles, and then the JS surface functions run first the constraints and then, after all constraints pass, any other listeners before returning to the calling process. On a write, all constraints need to be run again anyway so all triggered constraints need to be run, sifting pending out of the set is not needed. Write the entire returned set of triggered constraints as pending and check off as they pass. Likewise, all listeners are not run until the constraints pass, so all listeners are pending on every write."* — AND THIS SECTION NAMES THE SITES THIS PART RE-SPELLED FOR IT. It restates no standing row.**

1. **`§2.13` (`PAR-C-13`), its `observable` cell — THE ONE SITE OF THIS PART THE RULING MOVES.** **WHAT MOVED: `pending`'s reading in that cell.** **IT STOOD:** the member read as *"the CALLER'S OWN WORK LIST, its own loop being layer (b)'s only invoker"* (the `A109` landing pass's reading). **IT STANDS NOW:** that `ONLY INVOKER` half is **WITHDRAWN BY NAME**; the member is read as **THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, EACH ENTRY LEAVING IT ONLY BY BEING CHECKED OFF AS IT PASSES**, delivered by **the JS surface's TWO ORDERED LAYERS — the triggered constraints first, and, once every constraint has passed, the other listeners — before the calling process is returned to**; the caller's own loop is **ONE INVOKER AMONG THE SURFACE'S OWN LAYERS AND NOT THE ONLY ONE.** **THE MEMBER CENSUS IS UNMOVED (`4` members of `CommitRecord`), THE ROW CENSUS IS UNMOVED (`17` rows, `6 + 2 + 2 + 2 + 5 = 17` ✓), AND `§2.13`'s OTHER CELLS — `unit`, `domain`, `the values OUTSIDE it`, `referent`, `evaluator` and `the clause that declares it` — STAND BYTE-FOR-BYTE.**
2. **AND THE TWO READINGS OF THAT CELL THAT THIS PART DOES NOT CARRY, NAMED SO NO ROW IS READ AS THEM.** **(a) THE SIFTED-SUBSET READING:** sifting a subset out of the returned set is **UNNECESSARY AND UNLAWFUL** — the kernel writes the entire returned set and checks each entry off as it passes, so **no filter, no subset and no re-derivation of membership stands anywhere in this part.** **(b) THE LISTENER-ALREADY-RUN READING:** because **no listener runs until the constraints have passed, EVERY listener is `pending` on EVERY write** — no listener of any write is ever read here as *"already run"* as a ground for absenting it from the member.
3. **THE `PAR-C` ROWS OF THIS PART THAT ARE LEFT UNTOUCHED BY THIS PASS, WITH THE REASON.** **`§2.1`–`§2.12` and `§2.14`–`§2.17` carry no term the ruling moves** — their subjects are the registration key, the constraint and repair functions, the message log, the outcome arms, the marker, the suppliers and evaluators, the module, the write's `value`, the attempt reference, the two contexts and the `RollbackStep` record, and **not one of their `unit`/`domain`/`referent`/`evaluator`/`observable` cells reads `pending`, a listener's status, a filter or a subset** — so no row of theirs is re-spelled and none is re-printed here.
4. **AND THE ONE ROW OUTSIDE THIS PART THAT THIS PART'S `§2.13` POINTS AT CARRIES THE SAME MOVE: `contract.md §5.5` (`P-SM-5`)** — its `THE CALLER'S OWN LOOP … IS LAYER (b)'s ONLY INVOKER` clause is re-spelled there in the same words, and its four strategy ids (`S-SIDE` · `S-WINDOW` · `S-LOG-ORDER` · `S-NO-STORE-ORDER`) are unmoved, so the register's cell count is unmoved.

**END OF THE `A112` DELIVERY-MODEL RE-SPELL SECTION.**
