# View — `test-cases` (`U-STOREROOM-ADDON-SURFACE`): the inventory of states and fail-states the contract already pins

- **Status:** VIEW PART of `docs/specs/storeroom-addon-surface/contract.md`. **It derives and carries no new claim.** **REGENERATED 2026-10-18.**
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

**THE INVENTORY'S CENSUS: `26` ROWS — `11` valid states, `7` fail-states, `8` invariant-driven drives.** **`11 + 7 + 8 = 26 ✓`.** **(`V-12` was REMOVED 2026-10-19 (`role_spec_writer`) — BY DELETION, not by a split: the row left this view and went nowhere, so the row set returns `27 → 26` and `11` valid states stand where `12` stood.** **The row existed only for REBINDING, which the architect's ruling — *"I know re-binding the JS surface is breaking behavior. Stop complaining about it."* — withdraws; it duplicated `V-6`'s state AND its clause, and it carried no claim the surviving rows do not.** **THE ROUTING IS NOT LOST: `V-6` asserts it** — *the row was re-derived 2026-10-19 (`role_spec_writer`) from a row about a re-bound receiver into a row of the receiver that carries the property `P-SAS-2`, because the reduction removes rebinding's own material and not the carrier's* — **and `receiver-and-refusal.md §5` carries the observation as a statement about what the receiver IS** *(the route corrected here 2026-10-19, `role_spec_writer`: this clause and that part's `§5`/`§7` cells all read `§1`, and the sentence each routed stands at `§5`.)* **The word REMOVED is chosen against the sibling view's REPAIRED: there the pair's two rows were SPLIT onto their own lines and NO ROW LEFT THE VIEW, so its census stood unmoved; here one row left and the census moved by exactly one.)**

---

## §1. THE VALID STATES

| id | The state | Its clause | Its property |
| --- | --- | --- | --- |
| `V-1` | the addon exports exactly thirteen names and `call` is absent | `export-set-and-dispatch.md §1` | `P-SAS-1` |
| `V-2` | every entry answers its verb's declared arity | `export-set-and-dispatch.md §1` | `P-SAS-2` |
| `V-3` | each verb's answer is byte-identical to the same verb through the old dispatcher | `export-set-and-dispatch.md §3` | `P-SAS-3` |
| `V-4` | `layout.read(…)` resolves `layout`'s store from the receiver | `receiver-and-refusal.md §1` | `P-SAS-2` |
| `V-5` | two constructions answer two discrete stores, each its own | `receiver-and-refusal.md §2` | `P-SAS-2` |
| `V-6` | a call whose receiver names a live store reaches that store, and one whose receiver names nothing refuses | `receiver-and-refusal.md §5` — the routing clause; the refusal half at `§3` | `P-SAS-2` |
| `V-7` | a freed store's table entry is retired, and a second store's entry survives | `receiver-and-refusal.md §6` | `P-SAS-5` |
| `V-8` | every member reaches its own entry; no deleted wrapper is called | `js-unwrap.md §5` | `P-SAS-6` |
| `V-9` | no `state.id` survives at any of its three sites, and the registration path reaches `register` (arity `2`) with the store coming from the receiver | `js-unwrap.md §4`; its successor sentence at `§4`'s end — `register`'s arity `2` at `export-set-and-dispatch.md §1` | `P-SAS-6` |
| `V-10` | the `ValueNotAdmitted` re-render still appears | `js-unwrap.md §3` | `P-SAS-8` |
| `V-11` | a refusal from every one of the thirteen entries carries the three members | `failure-form.md §1` | `P-SAS-4` |

---

## §2. THE FAIL-STATES

| id | The failure | Its clause | Its property |
| --- | --- | --- | --- |
| `F-1` | `call` survives as an export | `export-set-and-dispatch.md §1` | `P-SAS-1` |
| `F-2` | a verb has no entry, or an undeclared name appears | `export-set-and-dispatch.md §1` | `P-SAS-1` |
| `F-3` | an entry accepts an integer at position `0` in place of its first real argument | `export-set-and-dispatch.md §4` | `P-SAS-2` |
| `F-4` | a record member moves, a value is re-encoded, or a different value is decoded | `export-set-and-dispatch.md §3` | `P-SAS-3` |
| `F-5` | a detached call throws a raw host error or a partial record | `receiver-and-refusal.md §3` | `P-SAS-4` |
| `F-6` | a surviving table entry names a freed store, or a retirement removes a second store's entry | `receiver-and-refusal.md §6` | `P-SAS-5` |
| `F-7` | the `ValueNotAdmitted` arm is dropped and the raw refusal reaches the caller | `js-unwrap.md §3` | `P-SAS-8` |

---

## §3. THE DRIVES THE PROPERTIES OWE

| id | The drive | Row |
| --- | --- | --- |
| `D-1` | read the addon's own key set | `P-SAS-1` |
| `D-2` | call each entry at its declared arity and at ±1 | `P-SAS-2` |
| `D-3` | drive both shapes over one corpus and compare records | `P-SAS-3` |
| `D-4` | detach a member and call it; call a member whose store is collected | `P-SAS-4` |
| `D-5` | release a store and read the table | `P-SAS-5` |
| `D-6` | search for the deleted wrappers and for `state.id` | `P-SAS-6` |
| `D-7` | drive the suite's calls against both shapes | `P-SAS-7` |
| `D-8` | drive a value the walk refuses at a store answering `ValueNotAdmitted` | `P-SAS-8` |

---

## §4. THE ONE CELL THAT CANNOT BE WRITTEN YET

**`D-4`'s expected value cannot be asserted in full.** The arm's `shape` is decided and drivable; **its `status` token and its `message` are `OWED`** (`failure-form.md §2`). **So `D-4` asserts the key set, the member count, non-`Error`-ness — and NOTHING about which token stands in `status`.**

**This is stated here rather than discovered by the test-writer.** **A drive that pins an `OWED` value would fail the moment the value is chosen, for a reason that is not a defect.**
