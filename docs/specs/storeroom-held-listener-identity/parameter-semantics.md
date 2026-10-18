# Part — `parameter-semantics` (`U-STOREROOM-HELD-LISTENER-IDENTITY`, prefix `D-GP-SHLI`): one row per declared parameter, option, seam, callback and returned member, with its unit, its domain, its referent and its evaluator

- **Status:** **CARRIER PART of this change's contract directory `docs/specs/storeroom-held-listener-identity/`** — authored at the gate-2 spec gate **in the same pass** as the contract document's index region and part map, whose `parameter-semantics` row declares it **KIND `carrier`** at the path `docs/specs/storeroom-held-listener-identity/parameter-semantics.md`.
- **What this part discharges.** **`docs/pending.md`'s `⟶ THE HOLD IS SUPERSEDED` clause owes *"the parameter-semantics rows for every declared position, seam and callback"*.** **THE POSITIONS IT NAMES BY NAME AND THIS PART CARRIES: `listen`'s handle and set-of-addresses positions (with their new class tests); `register`'s positions and the conflict test's seat there; `addConstraint`/`constraintOn`/`constraintOff`'s positions; `removeListener`/`removeConstraint`'s positions and their fail arms; the `{handle, address}` pair's members; `triggered`/`pending`'s element types; and `cfg.listeners`' element shape.** **EVERY ONE OF THOSE IS A ROW BELOW, and no subject of that list is left without one.** `[CONTRACT]`
- **Scope boundary — what this part is NOT.** **These are `PAR-HL` provenance rows: they are a SEPARATE, UNCAPPED surface, they are NOT the typed register's, they do not consume its `≤ 8` cap, and they add no row to the store's `PAR-1`…`PAR-14`, the JS unit's `PAR-JS-1`…`PAR-JS-27` or the constraints unit's `PAR-C-1`…`PAR-C-17`** (the four families are cited and never restated). **This part carries no behaviour clause, no arm, no record shape and no fail-state the contract or its parts do not already declare: a `PAR-HL` row is a PROVENANCE ROW, and its `the clause that declares it` cell points at the home rather than copying it.** **A missing row here is a gate-2 finding exactly as a missing return shape is.**
- **The row schema, stated once so every row is read the same way.** **Each row carries nine cells and each cell is MANDATORY:** `id` · `the subject` · `kind` · `unit` · `domain` (with the values outside it) · `referent` · `evaluator` (who evaluates it, and at which side) · `observable` · `the clause that declares it`. **`kind` is read from the closed five-value enum `parameter` | `option` | `seam` | `callback` | `return-field`.** **AND THE ONE RULE EVERY ROW OBEYS: the `domain` cell is never empty, the values outside it are enumerated, and the row's `evaluator` cell NAMES THE SIDE — `caller-side` or `store-side` — so the change's own boundary is checkable from the rows alone.** `[CONTRACT]`

---

## §1. The `PAR-HL` index — the subject map, and where each row lives

**One row per declared parameter, option, seam, callback and returned member.** **The index below is a MAP and every entry of it is a pointer, not a restatement.**

| Row | The subject | Its `kind` | Where the change declares it | Its row's home |
| --- | --- | --- | --- | --- |
| **`PAR-HL-1`** | `listen`'s `handle` position | `parameter` | `contract.md §2.2` item 1 | `§2.1` |
| **`PAR-HL-2`** | `listen`'s `addresses` position — the SET, and the set-position class test | `parameter` | `contract.md §2.2` item 2 | `§2.2` |
| **`PAR-HL-3`** | `listen`'s return — `undefined` | `return-field` | `contract.md §2.2` item 10 | `§2.3` |
| **`PAR-HL-4`** | the purge operation — its `handle` position and its removed-count answer | `seam` | `contract.md §2.2` item 4 | `§2.4` |
| **`PAR-HL-5`** | the entry's `off` member, and the `listen`-writes-it / `register`-clears-it rule | `option` | `contract.md §2.2` item 5 | `§2.5` |
| **`PAR-HL-6`** | `register`'s `handle` position | `parameter` | `contract.md §2.1` item 5 | `§2.6` |
| **`PAR-HL-7`** | `register`'s `listener` position, and the conflict test's seat there | `seam` | `contract.md §2.3` item 8 | `§2.7` |
| **`PAR-HL-8`** | `addConstraint`'s `pair` position — its `address` member as a SET, its `id` member | `parameter` | `contract.md §2.6` item 5 | `§2.8` |
| **`PAR-HL-9`** | `addConstraint`'s `constraint` position | `parameter` | `contract.md §2.3` item 4 | `§2.9` |
| **`PAR-HL-10`** | `addConstraint`'s return — the store's identity | `return-field` | `contract.md §2.6` item 2 | `§2.10` |
| **`PAR-HL-11`** | `constraintOn`'s two positions | `parameter` | `contract.md §2.3` item 7 | `§2.11` |
| **`PAR-HL-12`** | `constraintOff`'s two positions | `parameter` | `contract.md §2.3` item 7 | `§2.12` |
| **`PAR-HL-13`** | `constraints()`'s return — the pair list, its `address` member's type | `return-field` | `contract.md §2.6` item 5 | `§2.13` |
| **`PAR-HL-14`** | `removeListener`'s `handle` position | `parameter` | `contract.md §2.7` item 2 | `§2.14` |
| **`PAR-HL-15`** | `removeListener`'s return — `undefined` | `return-field` | `contract.md §2.7` item 2 | `§2.15` |
| **`PAR-HL-16`** | `removeConstraint`'s `pair` position | `parameter` | `contract.md §2.7` item 3 | `§2.16` |
| **`PAR-HL-17`** | `removeConstraint`'s return — `undefined` | `return-field` | `contract.md §2.7` item 3 | `§2.17` |
| **`PAR-HL-18`** | the two remove members' throw pattern and its two forms | `seam` | `contract.md §2.7` items 4–6 | `§2.18` |
| **`PAR-HL-19`** | the trigger pair's `handle` member | `return-field` | `contract.md §2.4` item 1 | `§2.19` |
| **`PAR-HL-20`** | the trigger pair's `address` member — the BINDING address | `return-field` | `contract.md §2.4` item 7 | `§2.20` |
| **`PAR-HL-21`** | `triggered`'s element type | `return-field` | `contract.md §2.4` item 1 | `§2.21` |
| **`PAR-HL-22`** | `pending`'s element type, its totality and its seeding | `return-field` | `contract.md §2.4` items 3–4 | `§2.22` |
| **`PAR-HL-23`** | `triggeringAddress` — the write's address, and its owed home | `return-field` | `contract.md §2.4` item 7 | `§2.23` |
| **`PAR-HL-24`** | `cfg.listeners[]`' element shape, and the boot route | `option` | `contract.md §2.2` item 8 | `§2.24` |
| **`PAR-HL-25`** | `cfg.constraints[]`' element shape, and the batch route | `option` | `contract.md §2.3` item 2 | `§2.25` |
| **`PAR-HL-26`** | the commit's cache of the store's returned values | `option` | `contract.md §2.8` item 1 | `§2.26` |
| **`PAR-HL-27`** | the pass's materialised snapshot and its order rule | `seam` | `contract.md §2.8` item 6 | `§2.27` |
| **`PAR-HL-28`** | `K-1`'s four positions, as this change moves them | `parameter` | `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1, moved by `contract.md §2.3` | `§2.28` |
| **`PAR-HL-29`** | `K-6`'s `store` position | `parameter` | `contract.md §2.9` item 3 | `§2.29` |
| **`PAR-HL-30`** | `K-6`'s `pair` position | `parameter` | `contract.md §2.9` item 3 | `§2.30` |
| **`PAR-HL-31`** | `K-6`'s return — `undefined` | `return-field` | `contract.md §2.9` item 3 | `§2.31` |
| **`PAR-HL-32`** | the conflict test's `listener` identity, and the `noopListener` exclusion | `callback` | `contract.md §2.3` item 8 | `§2.32` |
| **`PAR-HL-33`** | a constraint's body at a pair — its ONE argument and its three arms | `callback` | `contract.md §2.3` item 4 | `§2.33` |
| **`PAR-HL-34`** | the `repair` function the outcome carries | `callback` | `contract.md §2.3` item 6 | `§2.34` |
| **`PAR-HL-35`** | a listener's body — its ONE argument, and the unsupported-mutation rule | `callback` | `contract.md §2.5` item 5 | `§2.35` |
| **`PAR-HL-36`** | the construction's `cfg` keys, as this change touches them | `option` | `contract.md §2.2` item 8; `§2.3` item 2 | `§2.36` |
| **`PAR-HL-37`** | the store's `ListenersArg` / `ListenerEntry` spellings and their outside values | `option` | `contract.md §2.2` item 8 | `§2.37` |
| **`PAR-HL-38`** | the store's `WriteResult` / `DeleteReceipt` `triggered` member | `return-field` | `contract.md §2.4` item 1 | `§2.38` |
| **`PAR-HL-39`** | `CommitRecord`'s four members, with `pending`'s type moved | `return-field` | `contract.md §2.4` item 8 | `§2.39` |
| **`PAR-HL-40`** | `RepairContext`'s `pending` member | `return-field` | `contract.md §2.4` item 8 | `§2.40` |

**ARITHMETIC, PRINTED WITH ITS TERMS AND CLOSING — THIS LINE IS THE ONE THE ROWS BELOW ARE READ AGAINST.** **The set is `40` rows (`PAR-HL-1`…`PAR-HL-40`), ONE PER ID, WITH NO GAP AND NO DUPLICATE, and its kind cells are read from the schema's closed five-value enum as: `parameter` × `12` (`PAR-HL-1`, `PAR-HL-2`, `PAR-HL-6`, `PAR-HL-8`, `PAR-HL-9`, `PAR-HL-11`, `PAR-HL-12`, `PAR-HL-14`, `PAR-HL-16`, `PAR-HL-28`, `PAR-HL-29`, `PAR-HL-30`) · `seam` × `4` (`PAR-HL-4`, `PAR-HL-7`, `PAR-HL-18`, `PAR-HL-27`) · `callback` × `4` (`PAR-HL-32`, `PAR-HL-33`, `PAR-HL-34`, `PAR-HL-35`) · `return-field` × `14` (`PAR-HL-3`, `PAR-HL-10`, `PAR-HL-13`, `PAR-HL-15`, `PAR-HL-17`, `PAR-HL-19`, `PAR-HL-20`, `PAR-HL-21`, `PAR-HL-22`, `PAR-HL-23`, `PAR-HL-31`, `PAR-HL-38`, `PAR-HL-39`, `PAR-HL-40`) · `option` × `6` (`PAR-HL-5`, `PAR-HL-24`, `PAR-HL-25`, `PAR-HL-26`, `PAR-HL-36`, `PAR-HL-37`) — **`12 + 4 + 4 + 14 + 6 = 40` ✓**, and the searched set is the row list `PAR-HL-1`…`PAR-HL-40` against the presence of the forty `§2.n` headings below.**
**THE COUNT'S ONE HOME IS `contract.md §6`'s census clause, WHICH THIS LINE CITES AND RE-DERIVES NO TERM OF** (`contract.md §6`; `[CENSUS]`).
**THE PARAMETER-ROW SET IS NOT A REGISTER AND NOT A BUDGET: these `40` rows are UNCAPPED provenance rows, and the typed `P-*` register is a separate surface whose `≤ 8` cap holds at `8 ≤ 8` ✓ and is `contract.md §5`'s.**

---

## §2. The `PAR-HL` rows

**EACH ROW'S `the values OUTSIDE it` CELL AND ITS `evaluator` CELL ARE MANDATORY, and a row whose domain cell is empty is a filing defect.** **The nine cells are printed in a two-column table per row, in the schema's own order, so a reader can diff two rows by their cell names rather than by their prose.**

### §2.1 `PAR-HL-1` — `listen`'s `handle` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-1`** |
| `the subject` | **`handle`** — `listen`'s FIRST position |
| `kind` | **`parameter`** |
| `unit` | **unitless** — an identity, not a quantity |
| `domain` | **`{ s : s ∈ String ∧ s ≠ "" }`** — a non-empty string the caller spells (`identity-and-domain.md §2` item 1) |
| `the values OUTSIDE it` | **`""`** · **a non-string primitive** · **`null`** · **`undefined` / ABSENT** · **an object, an array, a function, a class instance** · **a `Symbol`** · **a `Proxy`** · **a well-formed string a FOREIGN instance holds** · **a well-formed string held in a PRIOR SESSION** · **a well-formed string the store never held (fabricated)** |
| `referent` | **the store's listener entry and the package's map key** — ONE value in both |
| `evaluator` | **caller-side for the class test; store-side for the entry's admission** |
| `observable` | **the surface's one thrown form with `AddressMalformed` at an outside value; an entry created with `off` set at an admitted one** |
| `the clause that declares it` | `contract.md §2.2` item 1 · `listen-verb.md §2.1` |

`[P: docs/pending.md · P-6` (the type ruling) · `P: docs/pending.md · R-B4` · `[CONTRACT]`]`

### §2.2 `PAR-HL-2` — `listen`'s `addresses` position, and the set-position class test

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-2`** |
| `the subject` | **`addresses`** — `listen`'s SECOND position, A SET |
| `kind` | **`parameter`** |
| `unit` | **count** — a count of addresses; each member is a segment list |
| `domain` | **an ARRAY whose every member lies in the store's own address domain** (`docs/specs/storeroom-native/store-model.md §1.5` item 1); **THE EMPTY ARRAY IS IN THE DOMAIN** |
| `the values OUTSIDE it` | **ABSENT** · **`null`** · **`undefined`** · **a non-array** · **an array carrying a member outside the store's address domain** (a `null` or `undefined` segment, a float index, a negative index, a nested array where a segment belongs) · **an ARRAY OF ARRAYS THAT IS NOT ITSELF A SET** · **a BARE SEGMENT LIST** — one address where a set is required |
| `referent` | **the set of addresses the handle stands at after this act** — the whole set, never a delta |
| `evaluator` | **caller-side for the class test; store-side for the set's installation** |
| `observable` | **the one thrown form with `AddressMalformed` for every outside value, with NO store act reached; the standing set after the act equal to the supplied set and never to a union** |
| `the clause that declares it` | `contract.md §2.2` item 2 · `listen-verb.md §2.2` |

`[P: docs/pending.md · P-7` (the set ruling and its consequence (ii)) · `P: docs/pending.md · P-6`'s rule (R1) · `A: docs/specs/storeroom-native/parameter-semantics.md §2.12 | CONTRACT]`

### §2.3 `PAR-HL-3` — `listen`'s return

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-3`** |
| `the subject` | **`listen`'s RETURN** |
| `kind` | **`return-field`** |
| `unit` | **`undefined`** |
| `domain` | **`{ undefined }`** — one value and no arm |
| `the values OUTSIDE it` | **the supplied handle returned** · **a purge count** · **an entry record** · **a promise** — each a shape no clause declares |
| `referent` | **nothing: the caller supplied the identity, so there is no datum to return** |
| `evaluator` | **caller-side — a drive asserts `=== undefined`** |
| `observable` | **`a.listen(h, S) === undefined`, and the state the act left read through the entry and the store** |
| `the clause that declares it` | `contract.md §2.2` item 10 · `listen-verb.md §1` |

`[P: docs/pending.md · P-6` (the minting ruling) · `P: docs/pending.md · P-5` (the listen-populates ruling) · `[DECLARED-DEFAULT]`]`

### §2.4 `PAR-HL-4` — the purge operation: its `handle` position and its answer

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-4`** |
| `the subject` | **the PURGE** — a `Home` operation beside `mint`/`withdraw`/`adopt` (`src/store.rs:363-490`), declared as `purge(handle) -> usize` |
| `kind` | **`seam`** |
| `unit` | **count** — the answer is a count of entries removed |
| `domain` | **the store's own handle domain** — a non-empty string the store holds |
| `the values OUTSIDE it` | **a handle the home holds no entry for** — IN DOMAIN and answering `0`, because a purge of nothing is a lawful act and not a refusal; **`""`** · **a non-string** · **`null`** · **`undefined`** — each refused or absorbed by the caller of the operation and never by it |
| `referent` | **every `Listener` the handle names, across `members`' buckets and the `handles` index** |
| `evaluator` | **STORE-SIDE — the store performs it and the store answers it** |
| `observable` | **the returned count equals the number of entries the handle named at every address it stood at, and equals `0` where it named none; after the call, no `triggered` set carries the handle at any address** |
| `the clause that declares it` | `contract.md §2.2` item 4 (`HL-DD-2`) · `listen-verb.md §3` item 2 |

`[P: docs/pending.md · (M-1)` (the naming-and-signature questions and their answers) · `P: docs/pending.md · (Y-1)` (the purge is by handle) · `[DECLARED-DEFAULT]`]`

### §2.5 `PAR-HL-5` — the entry's `off` member

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-5`** |
| `the subject` | **`off`** — the entry's listening-state member, on the one map's value |
| `kind` | **`option`** |
| `unit` | **boolean** |
| `domain` | **`true`** (reserved: `listen` wrote the entry) · **`false`** (armed: `register` cleared it). **NO THIRD VALUE and no ABSENT arm: the entry's value always carries it** |
| `the values OUTSIDE it` | **ABSENT** · **`undefined`** · **`null`** · **a truthy non-boolean** — each a shape no clause declares; **and `off` CONSULTED ANYWHERE BUT THE SNAPSHOT READ** |
| `referent` | **whether this handle is reserved or armed** — and it carries NO delivery semantics beyond the one snapshot-time read |
| `evaluator` | **caller-side** — it is the package's own record; the read's INSTANT is the recipient-building loop (`bindings/js/index.mjs:2364`) |
| `observable` | **a reserved entry that a trigger returns in `triggered` and invokes nothing for; an armed entry that a trigger invokes once for** |
| `the clause that declares it` | `contract.md §2.2` item 5 · `identity-and-domain.md §4` |

`[P: docs/pending.md · P-5` (the entry-shape ruling, the explicit-delete ruling and the A2 timing ruling) · `[CONTRACT]`]`

### §2.6 `PAR-HL-6` — `register`'s `handle` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-6`** |
| `the subject` | **`handle`** — `register`'s FIRST position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **the handles THIS INSTANCE's map carries** — that is, any handle `listen` wrote or `cfg.listeners` adopted, and none other |
| `the values OUTSIDE it` | **every row of `PAR-HL-1`'s outside list, PLUS a well-formed string the map does not carry — a handle never listened, or one already deleted** |
| `referent` | **the map entry the function is installed into** |
| `evaluator` | **caller-side — the direct map key check** (`identity-and-domain.md §1` item 4) |
| `observable` | **the one thrown form with `AddressMalformed` at every outside value, with the registry untouched; the function installed and invoked at the next trigger at an admitted one** |
| `the clause that declares it` | `contract.md §2.1` item 5 · `identity-and-domain.md §2` item 2 |

`[P: docs/pending.md · P-6` (the direct-map-key ruling) · `P: docs/pending.md · P-5` (the deleted-handle refusal) · `A: docs/decisions.md · A134 | CONTRACT]`

### §2.7 `PAR-HL-7` — `register`'s `listener` position, and the conflict test's seat

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-7`** |
| `the subject` | **`listener`** — `register`'s SECOND position, AND THE CONFLICT TEST'S SEAT |
| `kind` | **`seam`** |
| `unit` | **unitless** — a function reference |
| `domain` | **`{ f : f is a JS function }`** — and, at the conflict test, **a CALLER-AUTHORED function; the kernel's own `noopListener` is EXCLUDED BY IDENTITY** |
| `the values OUTSIDE it` | **a non-function of every class** (`number`, `string`, `boolean`, `null`, `undefined`, ABSENT, an object, an array) · **a `Proxy` over a function, which is a function by class and is not refused on that ground** |
| `referent` | **the function the delivery invokes for that handle** |
| `evaluator` | **caller-side for the class test and the conflict test; NEVER store-side — the function never crosses** (`bindings/js/src/crossing.rs:1052-1058`: *"The FUNCTION never crosses (`DD-15`) and the core holds no slot for one"*) |
| `observable` | **the thrown `AddressMalformed` naming the position and the class at an outside value; the invoked body at the next trigger at an admitted one; the thrown `TypeError` with NO `status` member at a caller-listener/caller-constraint conflict, thrown BEFORE `state.registry.set`** |
| `the clause that declares it` | `contract.md §2.3` item 8 · `constraint-sites.md §5` |

`[P: docs/pending.md · (C-1)` · `P: docs/pending.md · (C-2)` (the seat and the identity keying) · `P: docs/pending.md · (C-3)` (the form) · `[CONTRACT]`]`

### §2.8 `PAR-HL-8` — `addConstraint`'s `pair` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-8`** |
| `the subject` | **`pair`** — `addConstraint`'s FIRST position: `{address, id}` |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a two-member record whose `address` is a SET of addresses and whose `id` is a string |
| `domain` | **a plain object carrying `address` (an address SET per `PAR-HL-2`) and `id` (a non-empty string)**; **ONE PAIR OVER N ADDRESSES IS ONE PAIR** |
| `the values OUTSIDE it` | **a non-object** · **a `null`** · **an object carrying no `address`** · **an `address` outside the store's domain** · **an object carrying no `id`** · **a non-string `id`** · **an empty-string `id`** · **an ABSENT pair** |
| `referent` | **the constraint's registration key at the kernel and the pair row at the store** |
| `evaluator` | **caller-side for the shape test (`constraintSite`); kernel-side for the `KC-1`/`KC-2` domain refusals** |
| `observable` | **the thrown `TypeError` with no `status` at a shape failure; the kernel's `KC-1`/`KC-2` in the kernel's own form at a domain failure; ONE pair row and ONE identity at an admitted pair** |
| `the clause that declares it` | `contract.md §2.6` item 5 · `constraint-identity.md §4` |

`[P: docs/pending.md · P-7` (the set-address ruling and the `one id, N addresses` answer) · `P: docs/pending.md · P-5`'s item 1.2 ruling · `bindings/js/index.mjs:2899-2919 | CONTRACT]`

### §2.9 `PAR-HL-9` — `addConstraint`'s `constraint` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-9`** |
| `the subject` | **`constraint`** — `addConstraint`'s SECOND position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **`{ f : f is a JS function }`** |
| `the values OUTSIDE it` | **a non-function of every class**, and **the ABSENT position** |
| `referent` | **the body the pass evaluates at the pair** |
| `evaluator` | **caller-side for the class test; and the BODY ITSELF runs caller-side** (`bindings/js/src/constraint-kernel.mjs:1186`) |
| `observable` | **the thrown `TypeError` with no `status` at a non-function; the pair's evaluation at the next pass at an admitted one; and the pre-check that leaves the OLD element whole when it refuses** |
| `the clause that declares it` | `contract.md §2.3` item 4 · `constraint-sites.md §2` item 1 |

`[P: docs/pending.md · (O-4)` (the pre-check's classes) · `P: docs/pending.md · P-5`'s `(F-2b)` · `docs/specs/storeroom-js/parameter-semantics.md §2.22` (`PAR-JS-22`) | CONTRACT]`

### §2.10 `PAR-HL-10` — `addConstraint`'s return: the store's identity

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-10`** |
| `the subject` | **the constraint IDENTITY** — `addConstraint`'s return |
| `kind` | **`return-field`** |
| `unit` | **unitless and OPAQUE** |
| `domain` | **a store-side identity value, answerable only by the store for a pair it holds; EQUAL TO ITSELF on a second `addConstraint` at the SAME pair** |
| `the values OUTSIDE it` | **a value carrying any own enumerable member** · **a value the package minted** · **a value from a cache** · **a NEW value at a held pair** — each a falsification of `PAR-JS-25` |
| `referent` | **the pair's identity at the store** — the one act that deletes it is `removeConstraint` (`PAR-HL-16`) |
| `evaluator` | **store-side for the identity's existence; caller-side for the comparison, which compares IDENTITIES AND NEVER CONTENTS** |
| `observable` | **`second === first` at a held pair; two pairs answering two unequal values; `Object.keys(returned)` empty; and a fresh `addConstraint` after a `removeConstraint` answering a DIFFERENT value** |
| `the clause that declares it` | `contract.md §2.6` item 2 · `constraint-identity.md §2` |

`[P: docs/pending.md · (AA-2)` (the identity moves into the store) · `P: docs/pending.md · (X-1)`'s reading (a) · `docs/specs/storeroom-js/parameter-semantics.md §2.25` (`PAR-JS-25`) | CONTRACT]`

### §2.11 `PAR-HL-11` — `constraintOn`'s two positions

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-11`** |
| `the subject` | **`constraintOn(pair, constraint)`** — arity `2`, NO third position |
| `kind` | **`parameter`** |
| `unit` | **unitless ×2** |
| `domain` | **`pair`** as `PAR-HL-8`; **`constraint`** as `PAR-HL-9` |
| `the values OUTSIDE it` | **the union of `PAR-HL-8`'s and `PAR-HL-9`'s outside lists**, PLUS **a well-formed pair the entry does not carry** |
| `referent` | **the pair's enablement and the element it already carries** — the second position is a NO-OP ON EVERY SUCCESS and the entry NEVER SUBSTITUTES ONE (`bindings/js/index.mjs:3062-3066`) |
| `evaluator` | **caller-side for both class tests and the pair's presence; the kernel's `K-1` for the re-registration** |
| `observable` | **`undefined` on success; `entry.fn` evaluated at the next write; the thrown `TypeError` with no `status` at an outside pair or a pair the entry does not carry; and the purge-then-add at every successful toggle** |
| `the clause that declares it` | `contract.md §2.3` item 7 · `constraint-sites.md §1` |

`[P: docs/pending.md · (O-3)` item (v) · `docs/specs/storeroom-js/surface.md:1059`'s corrected ordinal clause · `docs/specs/storeroom-js/surface.md:1748` item (2) | CONTRACT]`

### §2.12 `PAR-HL-12` — `constraintOff`'s two positions

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-12`** |
| `the subject` | **`constraintOff(pair, constraint)`** — arity `2`, NO third position |
| `kind` | **`parameter`** |
| `unit` | **unitless ×2** |
| `domain` | **as `PAR-HL-11`** |
| `the values OUTSIDE it` | **as `PAR-HL-11`** |
| `referent` | **the pair's disablement; the element the entry carries is KEPT and a parked passing stub, `constraintParked` (`bindings/js/index.mjs:3006-3008`), is the element added** |
| `evaluator` | **as `PAR-HL-11`; the parked stub is a CALLER-SIDE function and is subject to the conflict test** |
| `observable` | **`undefined` on success; the pair STILL CARRIED and STILL ENUMERATED by `constraints()`; the purge-then-add at the toggle** |
| `the clause that declares it` | `contract.md §2.3` item 7 · `constraint-sites.md §5` item 3 |

`[P: docs/pending.md · (O-3)` item (v) · `P: docs/pending.md · (C-2)` item (iii) · `docs/specs/storeroom-js/surface.md §2.12` item 3 | CONTRACT]`

### §2.13 `PAR-HL-13` — `constraints()`'s return

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-13`** |
| `the subject` | **the registered-pair LIST** — `a.constraints()`'s return, arity `0` |
| `kind` | **`return-field`** |
| `unit` | **count** — a count of pairs |
| `domain` | **a FRESH JS array whose every element is a FRESH plain object carrying EXACTLY TWO members, `address` (an address SET, a fresh array of the store's own segments) and `id` (a non-empty string)**; **the EMPTY ARRAY is in the domain** |
| `the values OUTSIDE it` | **an element carrying a THIRD member** · **an element carrying the constraint FUNCTION** · **an element carrying the opaque identity** · **a shared element or a shared `address` array across two calls** · **an ARRAY THIS ENTRY DID NOT PRODUCE** — each forbidden at its own exclusion |
| `referent` | **the pairs the entry carries** — the ADD route's and the BATCH route's on the SAME footing |
| `evaluator` | **caller-side — the read makes no store call and mints no code** |
| `observable` | **the element count shrinking by one per `removeConstraint` and unmoved by a `constraintOff`; a disabled pair PRESENT; a refused registration ABSENT; no order asserted (compared as a SET)** |
| `the clause that declares it` | `contract.md §2.6` item 5 · `constraint-identity.md §2` item 3 |

`[P: docs/pending.md · P-7`'s `1. (one id, N addresses)` answer · `docs/specs/storeroom-js/surface.md §2.12` items 3–7 · `docs/specs/storeroom-js/parameter-semantics.md §2.27` (`PAR-JS-27`) | CONTRACT]`

### §2.14 `PAR-HL-14` — `removeListener`'s `handle` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-14`** |
| `the subject` | **`handle`** — `removeListener`'s FIRST position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **the handles THIS INSTANCE's map carries** — `PAR-HL-6`'s domain, exactly |
| `the values OUTSIDE it` | **every row of `PAR-HL-1`'s outside list, PLUS a well-formed string the map does not carry, PLUS an already-deleted handle** — **and EVERY one of them is a THROW here, where `unlisten` answers it as a no-op success** |
| `referent` | **the map entry to remove and the store entries to withdraw** |
| `evaluator` | **caller-side for the map's key set; store-side for the withdrawal** |
| `observable` | **the thrown form with a verbose message at every outside value; on success, the entry gone and a later `register` on the handle REFUSED** |
| `the clause that declares it` | `contract.md §2.7` item 2 · `removal-members.md §2` |

`[P: docs/pending.md · P-5`'s `(R2)` (the declared reversal) and its explicit-delete ruling · `[CONTRACT]`]`

### §2.15 `PAR-HL-15` — `removeListener`'s return

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-15`** |
| `the subject` | **`removeListener`'s RETURN** |
| `kind` | **`return-field`** |
| `unit` | **`undefined`** |
| `domain` | **`{ undefined }`** |
| `the values OUTSIDE it` | **a `{ok, message}` discriminant** · **a boolean** · **a removed count** · **a promise** — each a second failure or success form `§2.5` forbids |
| `referent` | **the success arm, whose discriminant is the ABSENCE of a throw** |
| `evaluator` | **caller-side** |
| `observable` | **`a.removeListener(h) === undefined` on success and a thrown value on every other arm** |
| `the clause that declares it` | `contract.md §2.7` item 2 · `removal-members.md §2` item 2 |

`[P: docs/pending.md · P-5`'s `(R3)` · `P: docs/pending.md · P-5`'s ruling *"2. removeListener(/Constraint) returns success/fail + verbose error message to client"* | DECLARED-DEFAULT]`

### §2.16 `PAR-HL-16` — `removeConstraint`'s `pair` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-16`** |
| `the subject` | **`pair`** — `removeConstraint`'s FIRST position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **a plain object carrying `address` and `id` (a non-empty string), FOR A PAIR THIS INSTANCE CARRIES — and `address`'s domain is THE TWO SPELLINGS `constraint-identity.md §6` DECLARES FOR THE CONSTRAINT'S PAIR, NOT ONE OF THEM: (i) the pair's ADDRESS SET, and (ii) at the REGISTRATION act, a SINGLE address — so the pair domain admits BOTH, which is what `bindings/js/index.mjs:3578-3583` implements and what `S-12` requires: A CALLER'S OWN PAIR MUST BE REMOVABLE, including the pair a caller registered at one address** |
| `the values OUTSIDE it` | **every shape row of `PAR-HL-8`'s outside list**, PLUS **a well-formed pair the entry does not carry** |
| `referent` | **the pair row, its N address rows, the kernel's registration and the store's home entry — FOUR structures** |
| `evaluator` | **caller-side for the shape test and the pair's presence; kernel-side through `K-6`; store-side through the purge** |
| `observable` | **the thrown `TypeError` with no `status` at a shape failure; the thrown verbose form at a pair the entry does not carry; on success, `constraints()`'s return shrunk by one and a fresh `addConstraint` answering a DIFFERENT identity** |
| `the clause that declares it` | `contract.md §2.7` item 3 · `removal-members.md §3` |

`[P: docs/pending.md · P-5`'s `(R4)` and `(R2)` · `P: docs/pending.md · (AA-2)` (the identity's deletion) · `[CONTRACT]`]`

### §2.17 `PAR-HL-17` — `removeConstraint`'s return

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-17`** |
| `the subject` | **`removeConstraint`'s RETURN** |
| `kind` | **`return-field`** |
| `unit` | **`undefined`** |
| `domain` | **`{ undefined }`** — **THE DOCUMENTED VALUE `(R3)` NAMES** |
| `the values OUTSIDE it` | **a discriminant** · **the removed identity** · **a boolean** · **a promise** |
| `referent` | **the success arm** |
| `evaluator` | **caller-side** |
| `observable` | **`a.removeConstraint(pair) === undefined` on success and a thrown value on every other arm** |
| `the clause that declares it` | `contract.md §2.7` item 3 · `removal-members.md §3` |

`[P: docs/pending.md · P-5`'s `(R3)` | DECLARED-DEFAULT]`

### §2.18 `PAR-HL-18` — the two remove members' throw pattern

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-18`** |
| `the subject` | **the two remove members' THROW PATTERN** — two forms, told apart by `status`'s presence |
| `kind` | **`seam`** |
| `unit` | **unitless** |
| `domain` | **rule (i)'s form `{status, message, log}`** with `status` a member of the store's closed `16`-member set; **rule (ii)'s form a `TypeError` carrying no `status`**, with `log: []` |
| `the values OUTSIDE it` | **a RETURNED failure** · **an `Error` instance** · **a `Promise` rejection** · **a throw carrying a KERNEL `KC` token** · **a form with two members** — each forbidden by `§2.5`'s single-form rule |
| `referent` | **which of the two declared refusals the arm is** |
| `evaluator` | **caller-side — a drive reads `status`'s presence to tell them apart and nothing else** |
| `observable` | **the thrown object's own member set: exactly `status`·`message`·`log` for rule (i); a `TypeError` with `log: []` and no `status` for rule (ii)** |
| `the clause that declares it` | `contract.md §2.7` items 4–6 · `constraint-sites.md §6` |

`[P: docs/pending.md · P-5`'s `(R2)`/`(R3)` · `P: docs/pending.md · (C-3)` · `P: docs/pending.md · R-B4` · `docs/specs/storeroom-js/surface.md §2.5` | CONTRACT]`

### §2.19 `PAR-HL-19` — the trigger pair's `handle` member

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-19`** |
| `the subject` | **`handle`** — the FIRST member of the `{handle, address}` element of `triggered` and of `pending` |
| `kind` | **`return-field`** |
| `unit` | **unitless** |
| `domain` | **the store's own handle domain** — a non-empty string, never a wrapper and never a token |
| `the values OUTSIDE it` | **an object** · **a token** · **an encoded value** · **`null`** · **an empty list member** |
| `referent` | **the listener entry the store holds, matched against the package's own `registry`** |
| `evaluator` | **store-side for the naming; caller-side for the match and for the dedupe** |
| `observable` | **the string the caller supplied, carried unchanged; the value the delivery keys on; the value the dedupe's `entry.handle` comparison reads** |
| `the clause that declares it` | `contract.md §2.4` item 1 · `trigger-and-pair.md §1.1` |

`[P: docs/pending.md · P-7`'s `WHAT IT CARRIES` clause · `P: docs/pending.md · P-6` (the type ruling) | CONTRACT]`

### §2.20 `PAR-HL-20` — the trigger pair's `address` member, the BINDING address

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-20`** |
| `the subject` | **`address`** — the SECOND member of the `{handle, address}` element: `listener.address`, THE BINDING'S OWN ADDRESS |
| `kind` | **`return-field`** |
| `unit` | **unitless** — a segment list |
| `domain` | **the store's own address domain**, and **the value is a PREFIX OF, OR EQUAL TO, the written address** — never a value the prefix test excluded |
| `the values OUTSIDE it` | **the WRITTEN address where the binding is a strict prefix** · **an empty list member** · **a value the prefix test excluded** · **a derived key** |
| `referent` | **the address the listener was BOUND at — which address of the trigger set produced this element** |
| `evaluator` | **store-side — it is available at the selection site inside the filter (`src/store.rs:1723-1724`) and is today DISCARDED by the `.map(|listener| listener.handle.clone())` on the next line** |
| `observable` | **the member's value against the invocation's argument: they DIFFER wherever the binding is a strict prefix, and EQUAL where the listener is bound at the written address** |
| `the clause that declares it` | `contract.md §2.4` item 7 · `trigger-and-pair.md §1.2` |

`[P: docs/pending.md · P-7`'s `WHAT IT CARRIES` clause and its finding (5) · `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) (iii) | CONTRACT]`

### §2.21 `PAR-HL-21` — `triggered`'s element type

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-21`** |
| `the subject` | **`triggered`'s ELEMENT TYPE** — on `WriteResult`, on `DeleteReceipt`, and in `CommitRecord` |
| `kind` | **`return-field`** |
| `unit` | **count** — a count of PAIRS |
| `domain` | **an array whose every element is a `{handle, address}` pair**; **the EMPTY array** is in the domain |
| `the values OUTSIDE it` | **a BARE HANDLE** · **a value whose `address` member is the written address** · **a THIRD member on an element** · **a parallel `triggeredAddresses` array** · **a mix of pair and non-pair elements** |
| `referent` | **the store's own answer to WHICH listeners fired and WHERE EACH WAS BOUND** |
| `evaluator` | **store-side for the selection; caller-side for the read, compared as a SET** |
| `observable` | **every element a pair at `K-2`'s return, mid-pass, after a check-off and after a discard; the pair's `address` equal to the binding's** |
| `the clause that declares it` | `contract.md §2.4` item 1 · `trigger-and-pair.md §2` item 1 |

`[P: docs/pending.md · P-7` (the pair ruling and its fork-(a) clause) · `A: docs/specs/storeroom-native/contract.md §0.4 | CONTRACT]`

### §2.22 `PAR-HL-22` — `pending`'s element type, totality and seeding

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-22`** |
| `the subject` | **`pending`'s ELEMENT TYPE** — on `CommitRecord` and on `RepairContext` |
| `kind` | **`return-field`** |
| `unit` | **count** — a count of STILL-PENDING STEPS |
| `domain` | **an array whose every element is a `{handle, address}` pair**; **the EMPTY array**; and **the SEED is a CLONE of the store's `triggered`, member for member and by the SAME element identities** |
| `the values OUTSIDE it` | **a BARE HANDLE** — the retired union · **a value that is not the clone's own element** · **an element appended by the terminal arm's re-append route** · **a whole-member clear** |
| `referent` | **the still-pending steps of this attempt's write, each leaving only by being checked off** |
| `evaluator` | **caller-side — the kernel seeds it, pops it and filters it** |
| `observable` | **at `K-2`'s return, `pending`'s elements are the `triggered` elements by identity; after a pass, `pending`'s size is the still-pending count; a discarded write's own set has left it and another write's entries stand** |
| `the clause that declares it` | `contract.md §2.4` items 3–4 · `trigger-and-pair.md §3` |

`[P: docs/pending.md · P-7`'s `pending` ruling · `P: docs/pending.md · (AA-7)` · `A: docs/decisions.md · A117` (D5)/(D6) | CONTRACT]`

### §2.23 `PAR-HL-23` — `triggeringAddress`

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-23`** |
| `the subject` | **`triggeringAddress`** — the WRITE's own address, crossing beside the pair |
| `kind` | **`return-field`** |
| `unit` | **unitless** — a segment list |
| `domain` | **the store's own address domain** — the address the write or delete targeted |
| `the values OUTSIDE it` | **the BINDING address** · **a list of addresses** · **a derived key** · **`null`** |
| `referent` | **where the WRITE landed — a different question from the pair's `address`, which is where the listener was BOUND** |
| `evaluator` | **store-side — attached at `bindings/js/src/facade.rs:1292`, `:1301` — and caller-side as the invocation's ONE argument** |
| `observable` | **the value a listener's body receives as its single argument (`PAR-JS-12`), and its DIFFERENCE from the pair's `address` at a prefix binding** |
| `the clause that declares it` | `contract.md §2.4` item 7 · `trigger-and-pair.md §5` item 5 |

`[P: docs/pending.md · (AA-1)` (part of the store's response) · `P: docs/pending.md · P-7`'s fork (b) and its finding (4) | OWED — its declared home is owed at `docs/specs/storeroom-native/contract.md`'s returned-record region]`

### §2.24 `PAR-HL-24` — `cfg.listeners[]`' element shape and the boot route

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-24`** |
| `the subject` | **`cfg.listeners[]`** — the construction's listener array |
| `kind` | **`option`** |
| `unit` | **count** — a count of listener ENTRIES, each one `{address, handle}` record |
| `domain` | **an ARRAY of `{address, handle}` records, `address` in the store's address domain and `handle` a NON-EMPTY STRING**; **THE EMPTY ARRAY IS IN THE DOMAIN**; **ONE HANDLE MAY ARRIVE AT N ADDRESSES AS N ELEMENTS** |
| `the values OUTSIDE it` | **ABSENT from `cfg`** · **`null`** · **`undefined`** · **a non-array** · **an array carrying an entry that is not an `{address, handle}` record** · **an entry whose `address` is outside the store's domain** · **an entry whose `handle` is not a non-empty string** |
| `referent` | **the handles the store holds at boot, each applied through `listen(handle, addresses)` — the same verb the caller calls** |
| `evaluator` | **store-side for the admission (the array is admitted WHOLE); caller-side for the home mirror's rows** |
| `observable` | **`AddressMalformed` with NO instance returned at every outside value; at an admitted array, one map entry per distinct handle with `off` set and N mirror rows `{key, handle}` where one handle arrived at N addresses** |
| `the clause that declares it` | `contract.md §2.2` item 8 · `listen-verb.md §6` |

`[P: docs/pending.md · P-5` (the boot ruling, *"Boot goes through listen()"*) · `A: docs/specs/storeroom-native/parameter-semantics.md §2.12` (`PAR-12`) | CONTRACT]`

### §2.25 `PAR-HL-25` — `cfg.constraints[]`' element shape and the batch route

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-25`** |
| `the subject` | **`cfg.constraints[]`** — the construction's constraint array |
| `kind` | **`option`** |
| `unit` | **count** — a count of ELEMENTS |
| `domain` | **an ARRAY whose every element is a plain object carrying an `address` (a single address at this site), an `id` and optionally a `constraint` FUNCTION**; **an element carrying NO function is WELL-FORMED AND ADMITTED and registers nothing** |
| `the values OUTSIDE it` | **a non-array** · **an element that is not a plain object** · **an element whose `address` is outside the store's domain** · **an element whose `id` is not a non-empty string** |
| `referent` | **the pairs the entry carries from birth, registered through the SAME `K-1` the ADD route reaches** |
| `evaluator` | **store-side for the list's validation at construction and again over a loaded image; caller-side for the batch loop that registers each element carrying its own function** |
| `observable` | **a batch-populated pair enumerated by `constraints()` on the same footing as an ADD-route pair; a functionless element ABSENT from the enumeration; a refusal at any element refusing the CONSTRUCTION** |
| `the clause that declares it` | `contract.md §2.3` item 2 · `constraint-sites.md §1` |

`[P: docs/pending.md · (O-4)` item (iii) (the batch site reaches `K-1` from a held pair) · `A: docs/decisions.md · A126` · `A: docs/specs/storeroom-native/contract.md §0.4`'s `ConstraintsArg` row | CONTRACT]`

### §2.26 `PAR-HL-26` — the commit's cache of the store's returned values

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-26`** |
| `the subject` | **the COMMIT'S CACHE** — the store's returned values held on the record |
| `kind` | **`option`** |
| `unit` | **count** — a count of cached values |
| `domain` | **the record's own `triggered` and `pending` members, carrying THE STORE'S RETURNED VALUES and never a kernel-side reconstruction** |
| `the values OUTSIDE it` | **a FIFTH `CommitRecord` member** · **an `addressToken`-shaped reconstruction** · **a value read from a second store call** · **a value outliving the commit** |
| `referent` | **what the store answered, for the pass and the delivery to read without a second store act** |
| `evaluator` | **caller-side — the kernel writes it and reads it** |
| `observable` | **the record's four members and no fifth (`A117` (D6)); the cached values equal to the store's returned ones by identity; no second store read at the pass** |
| `the clause that declares it` | `contract.md §2.8` items 1 and 4 · `kernel-selection.md §1` item 4 |

`[P: docs/pending.md · (O-2)` (the cache, its member and its lifetime) · `A: docs/decisions.md · A117` (D6) | CONTRACT]`

### §2.27 `PAR-HL-27` — the pass's materialised snapshot and its order rule

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-27`** |
| `the subject` | **the PASS'S EVALUATED SET** — materialised once when the pass begins |
| `kind` | **`seam`** |
| `unit` | **count** — a count of pairs |
| `domain` | **the `kernel.pairs` rows whose `address` IS the attempt's address, materialised once, ordered by FIRST-REGISTRATION ORDER AT THAT ADDRESS** |
| `the values OUTSIDE it` | **a pair at an ANCESTOR address** · **a pair at a DESCENDANT address** · **the store's prefix-selected `triggered` set** · **a live view of the registry** · **a global insertion order across addresses** · **a derived key instead of `attempt.address`** |
| `referent` | **the set the pass evaluates and the delivery's layer (a) reads** |
| `evaluator` | **caller-side — the kernel materialises it** |
| `observable` | **the pass's `constraint-check` entry count equal to the snapshot's size and never larger; a mid-pass `K-1` carrying no entry from the registering pass; a two-address pair evaluated ONCE** |
| `the clause that declares it` | `contract.md §2.8` item 6 (`HL-DD-6`) · `kernel-selection.md §3` |

`[P: docs/pending.md · (AA-1)` · `P: docs/pending.md · R-B3` · `P: docs/pending.md · (M-3)`'s closing sentence · `A: docs/specs/storeroom-constraints/attempt-lifecycle.md §2.4` item 5 (iv) and `:193` | DECLARED-DEFAULT]`

### §2.28 `PAR-HL-28` — `K-1`'s four positions, as this change moves them

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-28`** |
| `the subject` | **`K-1 register(store, address, id, constraint)`** — its FOUR positions |
| `kind` | **`parameter`** |
| `unit` | **unitless ×4** |
| `domain` | **`store`**: the caller's own instance handle; **`address`**: the store's address domain, AT THIS SITE A SINGLE ADDRESS (the registration act's own); **`id`**: a non-empty string; **`constraint`**: a JS function |
| `the values OUTSIDE it` | **`K-1`'s two `KC` channels, unmoved: `KC-1` for the address and `KC-2` for the id and the function.** **AND THE CHANGE'S ONE ADDITION AT THIS ITEM: the STANDING ARM now PERFORMS A STORE ACT (the purge) where it previously performed none** (`P: docs/pending.md · (D-ii)` as overridden by `(O-3)` item (ii)) |
| `referent` | **the pair's registration in the kernel's registry and the store-side home entry it stands on** |
| `unit` | (as above) |
| `evaluator` | **caller-side for `KC-1`/`KC-2`, before any store verb; store-side for the `listen` channel** |
| `observable` | **the same two channels and the same return; PLUS: at a held pair, the old handle's store entries purged before the new element is installed** |
| `the clause that declares it` | `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1 · `contract.md §2.3` items 1–2 |

`[P: docs/pending.md · (O-3)` items (i)–(ii) · `P: docs/pending.md · (D-ii)` · `A: docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1's throws bullet | CONTRACT]`

### §2.29 `PAR-HL-29` — `K-6`'s `store` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-29`** |
| `the subject` | **`store`** — `K-6`'s FIRST position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **a value `storeCreate(cfg)` returned in THIS process** — the caller's own instance handle |
| `the values OUTSIDE it` | **a value from another process** · **a plain object** · **`null`** · **`undefined`** — each refused by whatever the caller's own store does with a foreign value |
| `referent` | **the store the removal acts on** |
| `evaluator` | **caller-side — the caller passes what it already holds, and the kernel holds no store** |
| `observable` | **a removal that reached the store; and the kernel's own first-position convention unmoved** |
| `the clause that declares it` | `contract.md §2.9` item 3 · `remove-member.md §3` |

`[P: docs/pending.md · R-B2` · `A: docs/specs/storeroom-constraints/kernel-surface.md §1` item 5 (the first-position binding) | DECLARED-DEFAULT]`

### §2.30 `PAR-HL-30` — `K-6`'s `pair` position

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-30`** |
| `the subject` | **`pair`** — `K-6`'s SECOND position |
| `kind` | **`parameter`** |
| `unit` | **unitless** |
| `domain` | **a `{address, id}` record, `id` a non-empty string and `address` the pair's own address SET, for a pair the KERNEL carries a row for** |
| `the values OUTSIDE it` | **a malformed pair** · **a non-string or empty `id`** · **a well-formed pair the kernel carries no row for** |
| `referent` | **the kernel's `pairs` row and its N address rows, and the store's home entries they stand for** |
| `evaluator` | **caller-side for the class test; kernel-side for the row's presence** |
| `observable` | **the `KC-2` throw at either outside class, with both structures unmoved** |
| `the clause that declares it` | `contract.md §2.9` items 3–4 · `remove-member.md §3` |

`[P: docs/pending.md · R-B2` · `P: docs/pending.md · (M-2)` | DECLARED-DEFAULT]`

### §2.31 `PAR-HL-31` — `K-6`'s return

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-31`** |
| `the subject` | **`K-6`'s RETURN** |
| `kind` | **`return-field`** |
| `unit` | **`undefined`** |
| `domain` | **`{ undefined }`** — matching `removeConstraint`'s own answer |
| `the values OUTSIDE it` | **a removed count** · **a `{removed}` record** · **a boolean** · **the pair** |
| `referent` | **the success arm** |
| `evaluator` | **caller-side** |
| `observable` | **`K-6(...) === undefined` on success; a throw on each of the three arms** |
| `the clause that declares it` | `contract.md §2.9` item 3 · `remove-member.md §3` |

`[P: docs/pending.md · R-B2` · `P: docs/pending.md · P-5`'s `(R3)` | DECLARED-DEFAULT]`

### §2.32 `PAR-HL-32` — the conflict test's `listener` identity, and the `noopListener` exclusion

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-32`** |
| `the subject` | **the CONFLICT TEST'S IDENTITY** — which registration the test keys on |
| `kind` | **`callback`** |
| `unit` | **unitless** |
| `domain` | **a registration performed by A CALLER with its OWN function**; **the kernel's own `noopListener` (`bindings/js/src/constraint-kernel.mjs:395`, `:771`) is EXCLUDED BY IDENTITY** |
| `the values OUTSIDE it` | **an ADDRESS-ONLY keying**, which would refuse the kernel's own registration on the overwrite arm and at every `constraintOn`; **any identity comparison over the address rather than the function** |
| `referent` | **the caller's own registration act, which is the only one that carries a caller-authored function** |
| `evaluator` | **caller-side — the package holds the function and the kernel does not** (`bindings/js/src/crossing.rs:1052-1058`) |
| `observable` | **a caller's function refused at a caller's constraint-pair address; the kernel's stub at the same address NOT refused; the registry untouched on the refusal** |
| `the clause that declares it` | `contract.md §2.3` item 8 · `constraint-sites.md §5` items 1–3 |

`[P: docs/pending.md · (C-2)` (the seat and the identity keying) · `[CONTRACT]`]`

### §2.33 `PAR-HL-33` — a constraint's body at a pair

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-33`** |
| `the subject` | **the CONSTRAINT FUNCTION** — its ONE argument and its three arms |
| `kind` | **`callback`** |
| `unit` | **unitless** |
| `domain` | **an argument record** (`docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 1's `AttemptContext`, `5` members); **its return: `true` | an object carrying `message` | an object carrying `message` and a `repair` FUNCTION** |
| `the values OUTSIDE it` | **a return outside the three arms**, READ AS the `{message}` arm and never as a fourth arm (`VA-11`); **a THROW**, which is the body's own and reaches the caller unconverted |
| `referent` | **the pair's pass or violation, and the repair the violation names** |
| `evaluator` | **caller-side — the kernel invokes it inside its own window** |
| `observable` | **the `constraint-check` entry's text; the arm the attempt takes (`KC-3`/`KC-5`/`KC-6` or a repair run); on a throw, NO `constraint-check` entry and the body's own throwable reaching the caller** |
| `the clause that declares it` | `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 1 · `contract.md §2.3` item 4 |

`[P: docs/pending.md · (O-4)` item (i) (the class test at this position) · `P: docs/pending.md · (X-4)` · `docs/specs/storeroom-constraints/parameter-semantics.md §2.3` (`PAR-C-3`) | CONTRACT]`

### §2.34 `PAR-HL-34` — the `repair` function the outcome carries

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-34`** |
| `the subject` | **`repair`** — the function the violation arm names |
| `kind` | **`callback`** |
| `unit` | **unitless** |
| `domain` | **a JS function, present iff the arm names one**; **its own return is `{ok, message, op}`, `op` REQUIRED IFF `ok === true` and ABSENT where `ok === false`** |
| `the values OUTSIDE it` | **a non-function where a repair is declared** · **a return carrying an `op` the repair did not land** · **a return with `ok === true` and no `op`** — each the app's own defect, answered by `KC-4` (`bindings/js/src/constraint-kernel.mjs`'s `landedOp`, `:324-337`) |
| `referent` | **the state a violation can be repaired to, and the op its edit landed** |
| `evaluator` | **caller-side — the kernel invokes it and reads `op` off its return and nowhere else** (`A: docs/decisions.md · A110`) |
| `observable` | **the repair's own op appended to the attempt's `ops`; a failing or absent op taking arm `(d)` and failing `KC-4`** |
| `the clause that declares it` | `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 2 · `contract.md §2.3` item 6 |

`[P: docs/pending.md · (O-4)` item (i) · `A: docs/decisions.md · A110` · `docs/specs/storeroom-constraints/parameter-semantics.md §2.6`–`§2.7` | CONTRACT]`

### §2.35 `PAR-HL-35` — a listener's body

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-35`** |
| `the subject` | **a listener's BODY** — its ONE argument and the unsupported-mutation rule |
| `kind` | **`callback`** |
| `unit` | **unitless** |
| `domain` | **a JS function taking ONE argument: the TRIGGERING address, a fresh dense segment array per invocation (`PAR-JS-12`; `JS-19`)** |
| `the values OUTSIDE it` | **a second argument** · **a shared array across invocations** · **the BINDING address as the argument** · **an object or a record as the argument** |
| `referent` | **the caller's own reaction to a trigger** |
| `evaluator` | **caller-side — the package invokes it after the verb returned, and it never crosses** (`DD-15`) |
| `observable` | **one invocation per distinct handle; the argument equal to the written address; a fresh array at each invocation; and MUTATING CONSTRAINTS OR LISTENERS FROM WITHIN THE BODY IS UNSUPPORTED, so no drive asserts such a mutation's effect** |
| `the clause that declares it` | `contract.md §2.5` item 5 · `docs/specs/storeroom-js/parameter-semantics.md §2.12` (`PAR-JS-12`) |

`[P: docs/pending.md · (AA-6)` (by-reference capture and the unsupported rule) · `P: docs/pending.md · P-7`'s dedupe ruling · `A: docs/decisions.md · A57` | CONTRACT]`

### §2.36 `PAR-HL-36` — the construction's `cfg` keys, as this change touches them

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-36`** |
| `the subject` | **`cfg`** — the construction's ONE argument, and its FOUR declared keys |
| `kind` | **`option`** |
| `unit` | **count** — a count of declared keys, `4` |
| `domain` | **a plain object carrying `journalLength` (required), `listeners` (required), `constraints` (optional) and `filePath` (optional)** — **the four declared keys and NO FIFTH** |
| `the values OUTSIDE it` | **a non-object** · **`null`** · **`undefined`** · **an array** · **an object carrying no `journalLength`** · **an object carrying no `listeners`** — **AND A CALLER-SUPPLIED KEY BEYOND THE FOUR IS IGNORED AND NEVER REFUSED** (`docs/specs/storeroom-native/contract.md §7.1`) |
| `referent` | **the store's construction** |
| `evaluator` | **store-side — the store's own `encodeConfig` and its admission** |
| `observable` | **`AddressMalformed` with no instance at each outside value; the four keys' own cells agreeing with `docs/specs/storeroom-native/contract.md §0.4`'s `StoreConfig`** |
| `the clause that declares it` | `docs/specs/storeroom-native/contract.md §0.4`'s `StoreConfig` row; `contract.md §2.2` item 8 |

`[P: docs/pending.md · P-5`'s boot ruling · `A: docs/specs/storeroom-js/surface.md §2.1`'s `cfg` block · `bindings/js/index.mjs:1643-1660 | CONTRACT]`

### §2.37 `PAR-HL-37` — the store's `ListenersArg` / `ListenerEntry` spellings

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-37`** |
| `the subject` | **the store's own RUST SPELLING** of the construction's listener array and its element |
| `kind` | **`option`** |
| `unit` | **unitless** |
| `domain` | **`ListenersArg::{List(Vec<ListenerEntry>), Absent, Null, Undefined, NonArray(String)}`** and **`ListenerEntry::{Entry { address: Vec<Segment>, handle: ListenerHandle }, Other}`** — **the PERMISSIVE argument type is REQUIRED, or the array's `null`/`undefined`/non-array answers are unreachable** |
| `the values OUTSIDE it` | **a strict type that makes the three outside arms unreachable** · **a second element variant** · **a third member on `Entry`** |
| `referent` | **the construction's array and its one element shape, pre-spelled at the boundary** |
| `evaluator` | **store-side — `src/args.rs` admits or refuses it** |
| `observable` | **the three refusal codes reachable at the boundary; the element's two members and no third** |
| `the clause that declares it` | `docs/specs/storeroom-native/contract.md §0.4`'s `ListenersArg`/`ListenerEntry` rows; `docs/specs/storeroom-native/parameter-semantics.md §2.12` |

`[A: docs/specs/storeroom-native/contract.md §0.4` · `P: docs/pending.md · P-6` (the handle's type: `ListenerHandle` collapses to the string) | CONTRACT]`

### §2.38 `PAR-HL-38` — `WriteResult` / `DeleteReceipt`'s `triggered` member

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-38`** |
| `the subject` | **the STORE's `triggered` MEMBER** on both returned records |
| `kind` | **`return-field`** |
| `unit` | **count** — a count of pairs |
| `domain` | **a list of `{handle, address}` pairs; the EMPTY list** |
| `the values OUTSIDE it` | **a bare-handle list** · **a third record member** · **a list ordered by any declared rule** · **the `watched` list's addresses folded into it** |
| `referent` | **the triggered listeners and their binding addresses** |
| `evaluator` | **store-side — `triggered_for` (`src/store.rs:1718-1726`) selects and the answer carries the binding address** |
| `observable` | **`watched` and `triggered` as two views of ONE selection, asserted as SET MEMBERSHIP over the home's pairs and NEVER as an index-into-index correspondence** (`docs/specs/storeroom-native/contract.md:2887` (3b)) |
| `the clause that declares it` | `docs/specs/storeroom-native/contract.md §0.4`'s two rows, moved by `contract.md §2.4` item 1; `docs/specs/storeroom-native/write-and-read.md §3.6`, `§4.4` |

`[P: docs/pending.md · P-7`'s `WHAT IT CARRIES` clause · `A: docs/decisions.md · A43` (a delete fires) | CONTRACT]`

### §2.39 `PAR-HL-39` — `CommitRecord`'s four members, with `pending`'s type moved

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-39`** |
| `the subject` | **the `CommitRecord`** — `{attempt, op, triggered, pending}` |
| `kind` | **`return-field`** |
| `unit` | **count ×4** — `4` members |
| `domain` | **exactly four members**; **`triggered` and `pending` are pair lists**; **`op` the store's journal op VERBATIM**; **`attempt` the `AttemptRef`** |
| `the values OUTSIDE it` | **a FIFTH member** · **a member removed** · **`pending` carrying bare handles** · **`triggered` carrying the triggering address rather than the binding's** |
| `referent` | **the commit's record, read by the caller's own loop and by the kernel's pass** |
| `evaluator` | **caller-side — the kernel builds it** |
| `observable` | **`Object.keys(record)` reading four names; `pending`'s elements a pair list at `K-2`'s return; the seeding identity relation with `triggered`** |
| `the clause that declares it` | `contract.md §2.4` item 8 · `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2 |

`[P: docs/pending.md · P-7`'s `pending` ruling item (3) · `A: docs/decisions.md · A117` (D6) · `A: docs/decisions.md · A112` | CENSUS]`

### §2.40 `PAR-HL-40` — `RepairContext`'s `pending` member

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-HL-40`** |
| `the subject` | **`RepairContext`'s `pending` MEMBER** — the sixth of the record's six members |
| `kind` | **`return-field`** |
| `unit` | **count** |
| `domain` | **a pair list, seeded by a clone of the commit's `pending`** |
| `the values OUTSIDE it` | **a bare-handle list** · **an absent member** · **a shared list the repair may mutate** |
| `referent` | **the still-pending steps the repair's own run is part of** |
| `evaluator` | **caller-side — the kernel builds it and passes it** |
| `observable` | **the member's elements a pair list; its seed a clone of the commit's `pending` at the repair's own instant** |
| `the clause that declares it` | `contract.md §2.4` item 8 · `bindings/js/src/constraint-kernel.mjs:549-560`, `:575`; `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 2 |

`[P: docs/pending.md · P-7`'s `pending` ruling item (3) · `A: docs/decisions.md · A117` (D6) | CONTRACT]`

---

## §3. The closure claim, stateable because the change's surface is closed

1. **EVERY PARAMETER, OPTION, SEAM, CALLBACK AND RETURNED MEMBER THIS CHANGE DECLARES HAS A ROW ABOVE, AND NO DECLARED POSITION LIES OUTSIDE THIS LIST.** **The change declares fourteen product members (of which twelve carry positions or returns here and two — `readLiteral` and `rollback` — carry no position this change moves, which is why they hold no row), six kernel items (of which `K-1` and `K-6` move and hold rows, and `K-2`…`K-5` are unmoved beyond the pair their records carry), one construction `cfg`, four returned records and their members, and four callbacks.** **The `40` rows dispose of exactly that surface.** `[CENSUS]`
2. **AND THE ONE THING A READER MIGHT LOOK FOR AND NOT FIND, NAMED: `read`, `readLiteral`, `rollback` AND `write`'S POSITIONS HOLD NO `PAR-HL` ROW.** **This change does not move them: `write`'s four positions, `read`'s two, `readLiteral`'s two and `rollback`'s one are declared at `docs/specs/storeroom-js/parameter-semantics.md §2.5`–`§2.11` and `§2.20`, and their rows are THAT unit's.** **A row here for one of them would be a second addressable home for a position this change did not move.** `[NEGATIVE]`
3. **AND THE THREE POSITIONS THE GATE-1 RECORD NAMED BUT WHICH BELONG TO A LANDED UNIT, NAMED SO THE CLOSURE IS NOT READ AS AN OMISSION: `a.constraints()`'s ARITY `0`** (declared at `docs/specs/storeroom-js/surface.md §2.12` item 2 and `PAR-JS-27`) **and `settle`'s REMOVAL** (declared at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clause of 2026-10-18 and `docs/decisions.md · A139`) **are read by this change and moved by neither; `PAR-HL-13` carries only the RETURN's moved type.** `[NEGATIVE]`
