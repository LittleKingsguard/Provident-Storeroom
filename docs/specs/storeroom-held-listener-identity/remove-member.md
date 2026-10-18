# Part — `remove-member` (`U-STOREROOM-HELD-LISTENER-IDENTITY`, prefix `D-GP-SHLI`): `K-6` — the kernel's sixth item, its route, its answer, its failure arms and its extent `5 → 6`

- **Status:** **CARRIER PART of this change's contract directory `docs/specs/storeroom-held-listener-identity/`** — authored at the gate-2 spec gate **in the same pass** as the contract document's index region and part map, whose `remove-member` row declares it **KIND `carrier`** at the path `docs/specs/storeroom-held-listener-identity/remove-member.md`. **It declares nothing the contract does not already carry; it EXPANDS `contract.md §2.9` (`HL-9`).**
- **What this part is.** **Where the kernel's sixth surface item is declared: the ruling that mints it, the route it takes, the signature this contract derives from the route, the answer and every failure arm, the extent's arithmetic and the four sites that print it, the no-cycle dependency chain, and the one state the ruling leaves `OWED`.**
- **Scope boundary — what this part does NOT carry.** **It carries no store-side operation (`listen-verb.md §3`), no constraint-site order (`constraint-sites.md §2.3`), no removal member (`removal-members.md §2.7`) and no selection rule (`kernel-selection.md §2.8`).** **It cites `docs/specs/storeroom-constraints/kernel-surface.md` for `K-1`…`K-5`'s own declarations and re-derives none of them.** `[CONTRACT]`
- **The layer.** **Every observable in this part is `ENVELOPE/PURE` — the kernel module's own tests, caller-side Node ESM. NO `APP`-GREEN IS CLAIMED.** `[CONTRACT]`

---

## §1. The ruling that mints the item

1. **THE ARCHITECT'S WORDS, VERBATIM: *"Add a sixth kernel item (K-6)"*** (`P: docs/pending.md · R-B2`, verbatim). **THE KERNEL'S DECLARED EXTENT MOVES `5 → 6`** (`P: docs/pending.md · R-B2`, verbatim). `[CONTRACT]`
2. **WHAT THE RULING DOES TO TWO STANDING CLAUSES, EACH AT ITS OWN BYTES.** **(i) `docs/specs/storeroom-constraints/kernel-surface.md §1` item 2's *"no sixth name"* clause IS AMENDED AT ITS OWN BYTES to name `K-6`; (ii) `bindings/js/src/constraint-kernel.mjs:472-475`'s *"no clause of this unit declares a kernel-side withdrawal of it"* IS FALSIFIED BY THIS RULING AND MUST BE REPLACED — the new item DOES withdraw the store-side home entry** (`P: docs/pending.md · R-B2`, verbatim). **AND `docs/specs/storeroom-constraints/kernel-surface.md:87`'s *"IT MINTS NO `K-6`"* IS FALSIFIED BY THE SAME RULING AND OWES A DATED CLAUSE AT ITS OWN SITE** (`P: docs/pending.md`, the `⟶ THE HOLD IS SUPERSEDED` clause's work list, item 1; `contract.md §8` item 1). `[REQUIREMENT]`
3. **AND WHAT THE RULING DOES NOT DO, SAID SO IT IS NOT ASSUMED: *"THE RULING NAMES THE ITEM, NOT ITS SIGNATURE; the proposal must declare `K-6`'s positions, its domain, its answer and its failure arms, and must state whether it calls the app's own removal verb or performs the withdrawal kernel-side."*** (`P: docs/pending.md · R-B2`, verbatim). **THIS CONTRACT DECLARES ALL FIVE, AND `§3` IS THE SIGNATURE'S HOME.** `[CONTRACT]`
4. **AND THE RULE THE SIGNATURE'S DECLARATION MUST OBEY, WHICH IS THE ONE THE RULING SETS: the two dependency directions are different and the ruling requires this one stated — `K-6` CALLS THE APP'S OWN REMOVAL VERB, and does not perform the withdrawal kernel-side** (`P: docs/pending.md · R-B2`; `§2`). `[CONTRACT]`

---

## §2. The route, stated once for both acts

1. **THE RULING, VERBATIM: *"the kernel already reaches a store verb (`store.listen` / `store.register` at `:394-395`), so `K-6` withdraws through the same route rather than inventing a second one — and the proposal must state that route once, for both acts."*** (`P: docs/pending.md · (D-iv)` and its close, verbatim; `bindings/js/src/constraint-kernel.mjs:394-395`). `[CONTRACT]`
2. **SO THE ROUTE IS: `K-6` REACHES `removeListener`, THE PRODUCT'S OWN PUBLISHED MEMBER, exactly as `K-1` reaches `listen`/`register`.** **AND `removeListener` IN TURN REACHES THE STORE'S OWN PURGE.** **NO STORE-SIDE PRIVATE ACT, NO SECOND SEAM, AND NO NEW STORE VERB.** `[CONTRACT]`
3. **AND THE ONE THING THIS PART MUST FORBID BY NAME, BECAUSE IT IS THE OTHER DEPENDENCY DIRECTION AND A PROPOSAL MIGHT PREFER IT.** **`K-6` DOES NOT PERFORM THE WITHDRAWAL KERNEL-SIDE: it does not reach the store's `unlisten` directly, it does not hold a second view of the store's home, and it does not re-implement the purge** (`P: docs/pending.md · R-B2`, verbatim: *"must state whether it calls the app's own removal verb or performs the withdrawal kernel-side (the two are different dependency directions and the kernel currently reaches no store verb from a removal path)"*). **THIS PART STATES IT: IT CALLS THE APP'S OWN REMOVAL VERB.** `[NEGATIVE]`

---

## §3. The signature, its positions and its answer

1. **THE SIGNATURE.** **`K-6 remove(store, pair) -> undefined`.** `[DECLARED-DEFAULT]`
2. **THE THREE POSITIONS AND THEIR CELLS, GIVEN SO THE DECLARED-DEFAULT IS CHECKABLE.**
   - **`store`** — `unit`: the caller's own instance handle; `domain`: a value `storeCreate(cfg)` returned in THIS process; `referent`: the store the removal acts on; `evaluator`: caller-side (the caller passes what it already holds); `observable`: a removal that reached the store and one that did not.
   - **`pair`** — `unit`: unitless, a `{address, id}` record; `domain`: `id` a non-empty `string`, `address` the TWO SPELLINGS `constraint-identity.md §6` DECLARES — the pair's own address SET and, at the REGISTRATION act, a SINGLE address — a domain no narrower than either; `referent`: the registered pair the kernel's `pairs` rows and the store's home entries stand for; `evaluator`: caller-side for the class test and kernel-side for the row's presence; `observable`: the pair's rows' absence after the call and their standing after a refusal.
   - **the return** — `undefined` on success, matching `removeConstraint`'s own answer (`removal-members.md §3`; `P: docs/pending.md · P-5`'s `(R3)`).
   **AND THE TWO ALTERNATIVES, PRICED AND REFUSED.** **(A) `K-6 remove(store, handle)`** — priced: a handle names a LISTENER and not a constraint pair, so the kernel rows the item must also delete (`kernel.pairs`, its N address rows) would be unreachable from the argument. **(B) `K-6 remove(store, pair, handle)`** — priced: it hands the caller a position whose value the kernel already holds (`kernel.handles`), i.e. a second spelling of one datum, and a caller-supplied handle would let the removal name a handle the pair does not own. **Reversal point: a bounded amendment of `docs/specs/storeroom-constraints/`.** `[DECLARED-DEFAULT]`
3. **AND THE FIRST-POSITION CONVENTION IT INHERITS.** **Every item of the kernel takes the caller's own store as its FIRST argument, and the caller passes what it already holds: the kernel holds no store** (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 5, cited and not restated). **`K-6` follows it and mints no second convention.** `[CONTRACT]`

---

## §4. The answer and every failure arm

1. **THE ANSWER ON SUCCESS IS `undefined`, AND THE TWO STRUCTURES ARE GONE.** **The kernel's `pairs` row and its N address rows are deleted; the store's home entries the pair's handle named are withdrawn; the pair's identity is deleted with the row** (`removal-members.md §3`; `contract.md §2.6` item 3). `[CONTRACT]`
2. **THE FAILURE ARMS, ENUMERATED — three and no fourth.** **(i) A PAIR OUTSIDE THE KERNEL'S DOMAIN — `KC-2`, thrown in the kernel's own form BEFORE any store verb is reached** (the two-channel rule, `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1's throws bullet, applied at this item: **channel (i) is the kernel's own and precedes the store**). **(ii) A PAIR THE KERNEL HOLDS NO ROW FOR — `KC-2`, and no state moves.** **(iii) THE STORE'S OWN REFUSAL AT THE WITHDRAWAL — THE STORE'S OWN CODE, thrown at that call in the store's own form and UNCONVERTED, exactly as `K-1`'s channel (ii) declares** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1's throws bullet; `docs/specs/storeroom-constraints/fail-surface.md §1.2` item 2). `[CONTRACT]`
3. **AND THE ONE THING THE ARMS DO NOT DO: NO `KC` ROW IS MINTED.** **The `KC` set stays closed at EIGHT (`2 + 2 + 2 + 1 + 1`) on its `13` sites, no rank moves and no member is minted** (`docs/specs/storeroom-constraints/fail-surface.md §1.1` and `§2`, cited and re-derived nowhere here; `P: docs/pending.md · R-B2`'s own boundary, which names the item and not a fail set). `[CENSUS]`
4. **AND THE ONE STATE-AFFECTING RULE ON A REFUSAL: NOTHING MOVES.** **A refused `K-6` leaves the kernel's row and its address rows standing and the store's entries standing — the arms' answers are the two forms above and no partial removal is declared** (`contract.md §2.7` item 7's atomicity rule, applied at this item). `[CONTRACT]`
5. **AND THE ONE ARM THE RULING LEAVES `OWED`, AT ITS OWN SITE.** **Where `kernel.handles` holds a PRE-PURGE handle the store no longer holds — the stale-handle state `(D-vi)` declares — the removal's `removeListener`-equivalent may name a handle the store does not hold; WHETHER THAT IS A NO-OP OR WHETHER THE PURGE IS ALSO REACHED FROM THE REMOVAL IS `OWED`** (`P: docs/pending.md · (M-2)`, closing paragraph, verbatim). **Owner `role_spec_writer`, positive revisit condition: the pass that lands `removeListener`'s store-side no-op arm and this item's third failure arm together.** **AND UNTIL IT LANDS, THE DRIVE ASSERTS THE ARMS OF `§4` ITEM 2 AND NOT A FOURTH.** `[OWED]`

---

## §5. The extent `5 → 6` and the four sites that print it

1. **THE ARITHMETIC, PRINTED WITH ITS TERMS.** **The kernel's surface is `6` items — `K-1` `register` · `K-2` `commit` · `K-3` `runAttempt` · `K-4` `log` · `K-5` `report` · `K-6` `remove` — `5 + 1 = 6` ✓** (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 2's extent sentence, moved by `R-B2`). `[CENSUS]`
2. **THE FOUR SITES THAT PRINT THE EXTENT, EACH AT ITS OWN PATH.** **(i) `docs/specs/storeroom-constraints/kernel-surface.md §1` item 2 (`:75-77`)** — the extent sentence and its *"NO sixth item is declared"* clause; **(ii) the same part's `:86`** — `unregister`'s status clause, which reads *"ITS STATUS HERE IS THEREFORE `REFUSED BY THIS ITEM'S OWN PRICING` AND NOTHING MORE"* and which `R-B2` moves: **`K-6` is NOT `unregister`** (it removes a pair, not a registration), so `:86`'s `unregister` refusal STANDS and a DATE CLAUSE must say so; **(iii) `docs/specs/storeroom-constraints/parameter-semantics.md §1`'s `PAR-C-13` row** (the surface-extent row, whose subject is the five items); **(iv) `docs/specs/storeroom-constraints/contract.md`'s index region's `K-1`…`K-5` figure.** `[REQUIREMENT]`
3. **AND THE ONE DISTINCTION THAT KEEPS `:86`'S REFUSAL WHOLE, PRINTED SO NO AMENDMENT SWEEPS IT AWAY.** **`unregister` — the name `docs/specs/storeroom-constraints/kernel-surface.md §1` item 2's priced alternative prints — IS NOT `K-6`.** **`unregister` would withdraw a CONSTRAINT'S STORE REGISTRATION by removing the store's home entry while leaving the pair carried; `K-6` REMOVES THE PAIR, its rows and its identity, AND ITS STORE ENTRY WITH THEM.** **SO `:86`'s refusal of `unregister` is UNMOVED and `K-6` is a different name with a different subject** (`docs/specs/storeroom-constraints/kernel-surface.md:86`, cited; `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 1's *"the kernel declares NO `unregister` and calls the store's `unlisten` NEVER"* clause, which `R-B2`'s `K-6` NARROWS: `K-6` calls the app's own `removeListener`, not the store's `unlisten`). `[CONTRACT]`

---

## §6. The dependency chain, and why it has no cycle

1. **THE CHAIN.** **`removeConstraint → K-6 → removeListener → the store's purge`.** `[CONTRACT]`
2. **AND THE TWO PROPERTIES THAT MAKE IT LAWFUL.** **(i) IT HAS NO CYCLE: `removeListener` reaches no constraint member, so nothing returns to `removeConstraint` or to `K-6`.** **(ii) IT PRESERVES THE KERNEL'S BINDING RULE: the kernel composes the store's own declared verbs and declares none of its own** (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 3, verbatim: *"the kernel declares NO store verb, NO store parameter, NO store record, NO store member and NO function-carrying STORE parameter. The two store verbs the kernel COMPOSES … are the store's own DECLARED verbs, cited and never re-declared"*). `[CONTRACT]`
3. **AND THE CIRCULARITY IT CLOSES, AT ITS OWN WORDS.** **`(D-ii)`'s circularity: the repair route *"`removeConstraint` then `addConstraint`"* named a member that did not exist, and `removeConstraint`/`removeListener` (`12 → 14`) had no kernel-side counterpart, because `docs/specs/storeroom-constraints/kernel-surface.md §1` item 2 closed the extent at FIVE and `withdrawRegistration` (`:460-476`) declined to withdraw the store's home entry** (`P: docs/pending.md · (M-2)`, verbatim). **`K-6` IS THAT COUNTERPART AND THE CIRCULARITY IS CLOSED.** `[CONTRACT]`
4. **AND THE ONE THING THE CHAIN DOES NOT CARRY, SAID SO IT IS NOT INFERRED.** **`K-6` DOES NOT ENUMERATE ADDRESSES AND DOES NOT CONSULT A COUNT: it hands the handle to `removeListener`, whose purge reach is total** (`P: docs/pending.md · (Y-1)`, verbatim: *"the kernel does not need to know N because it does not enumerate addresses at all"*). `[CONTRACT]`

---

## §7. The states and fail states this part declares

| # | The state / fail state | Its condition | Its declared answer | The observable a drive reads |
| --- | --- | --- | --- | --- |
| `MF-1` | a successful `K-6` | a pair the kernel carries | `undefined`; the kernel's rows and the store's entries gone | the kernel's pair list; `constraints()`'s return; a later write at the pair's address |
| `MF-2` | a pair outside the kernel's domain | a malformed pair, a non-string or empty `id` | `KC-2`, before any store verb | the thrown `status`; both structures unmoved |
| `MF-3` | a pair the kernel holds no row for | a well-formed pair with no kernel row | `KC-2`; no state moves | as `MF-2` |
| `MF-4` | the store's own refusal at the withdrawal | the store refusing the removal | the STORE'S OWN CODE, unconverted | the thrown object's own members; both structures unmoved |
| `MF-5` | a sixth item reached by a PRIVATE store act | a kernel-side withdrawal | NONE — the route is the published member | the store verb the kernel reached |
| `MF-6` | a seventh name reachable on the kernel's surface | any item beyond `K-6` | NONE | the module's own export set |
| `MF-7` | a `K-6` whose answer is a record | a returned `{removed}` or similar | NONE | the call's return shape |
| `MF-8` | a `KC` member minted for the removal | any new `KC` row | NONE | the `KC` census and its site count |
| `MF-9` | a `K-6` success leaving the kernel's row standing | a partial removal | NONE | the kernel's pair list after the call |
| `MF-10` | a value an `unregister` would name | the refused alternative | STILL REFUSED — `unregister` is not `K-6` | the item's own declaration at its site |

**AND THE ONE ROW THAT KEEPS THE EXTENT HONEST: `MF-6`.** **The kernel's surface is `6` items and no seventh name is reachable; `K-6` widens the extent by exactly ONE and its own pricing has already refused every other candidate by name** (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 2's priced alternative and `:86`'s `unregister` clause; `R: docs/decisions.md · A139`'s exclusions of `attempts()` and `pending()`). `[CONTRACT]`
