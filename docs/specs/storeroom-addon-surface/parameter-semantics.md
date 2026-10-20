# Part — `parameter-semantics` (`U-STOREROOM-ADDON-SURFACE`): one row per declared position, seam, callback and returned member

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-surface/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** The wire's parameters are the sibling package's and are **cited, not re-declared**. **This part carries only what THIS unit declares or moves.**
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

**THE ROW SET IS `14` ROWS — `PAR-SAS-1`…`PAR-SAS-14`, ONE PER ID, NO GAP AND NO DUPLICATE.** **`5 + 3 + 5 + 0 + 1 = 14 ✓`** — five moved positions, three moved seams, five new or moved returned members, zero callbacks, **ONE `observable` ROW IN `§4`** (*corrected 2026-10-19 twice over: the fourth term was `2` when `§4` carried a second row, and that row — `PAR-SAS-15`, the re-bound receiver — is REMOVED under the architect's ruling on rebinding, so the row set returns `15 → 14` and the `observable` term returns `2 → 1`*). **AND THE REMAINING ROW IS THE UNIT'S ONE DECLARED COST: this unit declares exactly one cost, and the figure `1` counts a cost here as it counts a row.**

---

## §1. THE MOVED POSITIONS — `5`

| id | The position | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-SAS-1` | the receiver, at every entry | `parameter` | the Node-API `this` — **an object the package itself returned, or nothing** | **the store the call is for** | `P-SAS-2` (the receiver is driven by that row's own strategies) |
| `PAR-SAS-2` | the verb, as data | `parameter` | **DELETED** — it was a string matched across nine arms | — (it becomes the entry's own name) | `P-SAS-1`; `export-set-and-dispatch.md §3` |
| `PAR-SAS-3` | the instance integer | `parameter` | **DELETED** — it was a `u32` slot in a lookup table, never a store identity | — (the receiver replaces it) | `P-SAS-6`; `receiver-and-refusal.md §1` |
| `PAR-SAS-4` | `write`'s fifth position | `parameter` | an adopted record identity | **a repair write's join key** | `export-set-and-dispatch.md §4` — **preserved unmoved** |
| `PAR-SAS-5` | the `fault` record the write path threads | `parameter` | the boundary walk's own record | **the `ValueNotAdmitted` re-render** | `P-SAS-8`; `js-unwrap.md §3` |

---

## §2. THE MOVED SEAMS — `3`

| id | The seam | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-SAS-6` | the generic entry wrapper | `seam` | **DELETED** | — (each member reaches its own entry) | `P-SAS-6`; `js-unwrap.md §1` |
| `PAR-SAS-7` | the write entry wrapper | `seam` | **DELETED, WITH ITS ARM PRESERVED IN THE MEMBER'S BODY** | **the `ValueNotAdmitted` re-render survives** | `P-SAS-8` |
| `PAR-SAS-8` | the receiver table | `seam` | a per-store key retaining the store | **the store's address, and its retirement** | `P-SAS-5`; `receiver-and-refusal.md §6` |

---

## §3. THE RETURNED MEMBERS AND OBSERVABLES — `5`

| id | The member | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-SAS-9` | the refusal's three members | `return-field` | `{status, message, log}`, never an `Error` | **the one form, unchanged** | `failure-form.md §1` — the sibling unit's part |
| `PAR-SAS-10` | the refusal arm's `status` token | `return-field` | **a member of the store's closed set — WHICH ONE IS `OWED`** | the arm's identity | `failure-form.md §2`; **a drive must not assert it** |
| `PAR-SAS-11` | the refusal arm's `message` | `return-field` | a string — **`OWED`** | the arm's rendering | `failure-form.md §2` |
| `PAR-SAS-12` | the addon's own key set | `return-field` | the thirteen names, closed | **what the artefact exports** | `P-SAS-1`; *⟶ corrected 2026-10-19 (`role_spec_writer`): this cell once carried a parenthetical claiming the five-name table stood *"in violation of the addon's own key set"*, which restated `P-SAS-1`'s property in a cell whose subject is the set's IDENTITY; that parenthetical is REMOVED, and the removal is CHECKABLE because the claim it made is stated where it belongs — `P-SAS-1` asserts the key set is exactly the thirteen declared names and that `call` is absent (`contract.md §5`)* |
| `PAR-SAS-13` | `state.id`'s three sites | `parameter` | **DELETED, all three — AND SITE 3'S PATH IS NOT: the registration path keeps reaching `register` (arity `2`, unmoved) as a member of the store object, so its receiver is the store and no integer is handed across** | — (the operand vanishes; the path does not) | `P-SAS-6`; `js-unwrap.md §4` |

---

## §4. THE ONE `observable` ROW — THE UNIT'S ONE DECLARED COST

*(HEADING REDUCED 2026-10-19: it read **"THE TWO `observable` ROWS — ONE DECLARED COST, AND ONE THAT IS NOT A COST"**. The second row — `PAR-SAS-15`, the re-bound receiver — is REMOVED under the architect's ruling on rebinding, so the section carries one `observable` row and it is the one declared cost.)*

| id | The cost | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-SAS-14` | a detached member call | `observable` | **legal today, refuses after the change** | **the regression this unit declares** | `P-SAS-4`; `receiver-and-refusal.md §7`; *⟶ corrected 2026-10-19 (`role_spec_writer`): this cell once carried a cross-reference to the store-member-listener case as a sibling cost, which the architect's ruling on rebinding withdraws; that cross-reference is REMOVED, and the removal is CHECKABLE because the case it named is stated where it belongs — `receiver-and-refusal.md §4` declines a store-member listener outright and names it NO cost, and this unit declares exactly one, the detached call above* |

**AND THE `observable` ROW SET IS ONE, NOT TWO** — *corrected 2026-10-19: this sentence once stated what this section's rows had already stated, which is the restatements this regeneration removes; the ROW and the fact are unmoved and stand at `§4`.* **The observation the removed row's referent carried — the receiver is a ROUTING carrier and the index was unforgeable only because the caller never saw it, which is obscurity and not authority — STANDS at `receiver-and-refusal.md §1` as a statement about WHAT THE RECEIVER IS and is not restated here, where it would read beside a cost.**

---

## §5. CALLBACKS — `0`, AND THE REASON

**THIS UNIT DECLARES NO CALLBACK.** **The delivery path is unchanged**, because a listener that is a store member is not supported — so no binding, no thunk and no call-site change is needed there. **The one function-valued thing this unit touches is `write`'s `fault` record, which is data the boundary makes and not a caller's function.**

**Zero is stated with its reason so the gap is not read as an omission.** `[CONTRACT]`

---

## §6. THE FIVE POSITIONS THIS UNIT LEAVES ALONE, NAMED

**`storeCreate`'s argument** · **`register`'s two positions** · **`version`'s zero** · **`errorMessage`'s two-to-three** · **each verb's own declared arguments.** **Each is unmoved and each is declared at its own clause.** **This part carries those this unit moves; the unmoved ones are cited from the sibling package's specs and re-declaring them here would be a second home.** `[CONTRACT]`
