# Part — `parameter-semantics` (`U-STOREROOM-ADDON-ADOPTION`): one row per declared position, seam, callback and returned member

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-adoption/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** The wire's parameters are declared in the sibling package's specs and are **cited, not re-declared**. **This part carries only the semantics THIS UNIT declares or adopts.**
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

**THE ROW SET IS `19` ROWS — `PAR-ADA-1`…`PAR-ADA-19`, ONE PER ID, NO GAP AND NO DUPLICATE.** **`6 + 3 + 7 + 0 + 1 + 1 + 1 = 19 ✓`** — six adopted names, three adopted types, seven adopted seams, zero callbacks, one manifest entry, **one row of THIS unit's own — `PAR-ADA-14`, the active-edit count, which `contract.md §1` item 3 and `finalizer-and-teardown.md §4` rule is NOT adopted from outside; corrected 2026-10-19, `role_spec_writer`, on `A-2`: the row once stood inside the adopted-seams set and `§3`'s heading declares its rows ADOPTED SEAMS, so the row moves to `§3-bis` and the accommodation moves `8 → 7`** — **and one row added 2026-10-20 (`role_spec_writer`) on gate-3 finding `2`: `PAR-ADA-19`, the count's READ SEAM, declared at `finalizer-and-teardown.md §4.2`. The row is authored in the same pass as that clause, so the row and its home are not authored apart. THE ROW IS THIS UNIT'S OWN FOR THE SAME REASON `PAR-ADA-14` IS — the seam is a function on this unit's module and not a hook the library supplies — so it is carried in `§3-bis` beside `PAR-ADA-14` and the ADOPTED-SEAMS set at `§3` stays `7`.**

---

## §1. THE ADOPTED NAMES — `6`

| id | The name | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-ADA-1` | the library crate | `dependency` | a registry crate at a caret requirement, floor `"3.14"` | the binding library itself | `bindings/js/Cargo.toml`'s `[dependencies]`; `P-ADA-1` |
| `PAR-ADA-2` | the derive crate | `dependency` | a registry crate, version-floored with the library | the macro that annotates entry functions | `Cargo.toml`; the build |
| `PAR-ADA-3` | the finalizer hook | `seam` | an object's own finalizer registration | the collection of the JS instance | the library's object API; `§5` of `finalizer-and-teardown.md` **and its `§5-bis`, which rules the registration OBSERVABLE ONLY BY ITS EFFECT — it carries no symbol-keyed own-property witness, so no row of this set declares one** |
| `PAR-ADA-4` | the raw-value throw | `seam` | the library's escape hatch that throws an arbitrary value | **the preservation of the three-member form** | the library's environment API; `failure-form.md §3` |
| `PAR-ADA-5` | the registration entry point | `seam` | the library's module-registration hook | the export table's construction | the library's registration API |
| `PAR-ADA-6` | the typed value handles the boundary names | `seam` | the library's own argument and return types | every crossing value's carrier | the adoption's own code; `binding-crate-and-abi.md §2` |

---

## §2. THE ADOPTED TYPES — `3`

| id | The type | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-ADA-7` | the environment handle | `parameter` | the library's environment type | the per-call runtime context | any entry function's signature |
| `PAR-ADA-8` | the receiver | `parameter` | the library's receiver type, already received at every entry and today discarded | **the store a call is for** (the surface unit's to consume) | `receiver-and-refusal.md` of the sibling directory |
| `PAR-ADA-9` | the generic value | `parameter` | the library's untyped value | a crossing value whose class is decided at the boundary | the wire's own carriers |

---

## §3. THE ADOPTED SEAMS — `7`

| id | The seam | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-ADA-10` | the build script's fetch | `seam` | a build-time network fetch | the crate's dependencies | `command-sites-and-residue.md §1` |
| `PAR-ADA-11` | the `--offline` absence | `seam` | the binding crate's declared commands only | the crate's own build | the eleven sites, `§2` of that part |
| `PAR-ADA-12` | the exported symbol set | `seam` | the built artefact's own symbols | **what the load path may reach** | `P-ADA-6` |
| `PAR-ADA-13` | the version string the artefact reports | `seam` | a string, exactly compared by the load path | the artefact's identity **and NOT its symbol set** | the load path; `binding-crate-and-abi.md §4` |
| `PAR-ADA-15` | the count's increment moment | `seam` | the entry of a bracketing verb | the call's opening | `§4.1` of that part |
| `PAR-ADA-16` | the count's decrement moment | `seam` | **the final return to the client, once, after every listener has fired** | the call's closing | `§4.1` of that part (the count's two moments are stated there) |
| `PAR-ADA-17` | the per-object store ownership | `seam` | the store's owner | **the store's lifetime, and what a finalizer may free** | `§5` of that part |

---

## §3-bis. THIS UNIT'S OWN ROWS, NOT ADOPTED FROM OUTSIDE — `2`

*(ADDED 2026-10-19, `role_spec_writer`, closing `A-2`. `PAR-ADA-14` stood inside `§3`, whose heading declares its rows ADOPTED SEAMS, while `contract.md §1` item 3 and `finalizer-and-teardown.md §4` rule the count belongs to THIS unit — it is this unit's own per-store index, not a seam the library supplies. So the row moves here and `§3`'s own accommodation moves `8 → 7`; the unit's row set and the total `18` are UNMOVED **by that move**.)*

*(AND THIS SECTION CARRIES `2` ROWS FROM 2026-10-20 (`role_spec_writer`), on gate-3 finding `2`: `PAR-ADA-14` above and `PAR-ADA-19`, the count's READ SEAM — the two `Symbol.for` channels on the store instance, declared at `finalizer-and-teardown.md §4.2` and authored in the same pass as that clause. **AND THE SEAM'S SPELLING WAS RECONCILED THE SAME DAY FROM A MODULE EXPORT TO A STORE-KEYED CHANNEL, because exporting it from `constraint-kernel.mjs` conflicted with a standing assertion that closes that module's export set at the six `K-1`–`K-6` items; the ROW MOVES BY THE ADDITION ALONE and its `seam` unit is unmoved.** THE ROW SET MOVES `18 → 19` BY THIS ADDITION and the `§3` heading's `2` follows it; the ADOPTED-SEAMS set at `§3` is UNMOVED at `7`, because the new row is this unit's own for the same reason `PAR-ADA-14` is — the seam is a channel on this unit's own index, not a hook the library supplies.)*

| id | The row | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-ADA-14` | the active-edit count | `seam` | a per-store integer, zero or more | **whether any edit is in flight for that store** | `P-ADA-5`; `finalizer-and-teardown.md §4` |
| `PAR-ADA-19` | **the count's READ SEAM** — the store-keyed channels `Symbol.for('provident-storeroom.attempt-count')` (a pure read) and `Symbol.for('provident-storeroom.attempt-opened')` (an observer, answering an unsubscribe) | `seam` | a non-negative integer, read by a pure call; and a function called once per commit that opens | **the number a drive reads the count by, and the increment's instant** | `P-ADA-5`; `finalizer-and-teardown.md §4.2` — the seam's ONE HOME |

---

## §4. THE MANIFEST ENTRY — `1`

| id | The entry | unit | domain | referent | evaluator |
| --- | --- | --- | --- | --- | --- |
| `PAR-ADA-18` | the library's caret requirement | `parameter` | a caret requirement with a floor of `"3.14"` | **the whole pin**, since the lock is uncommitted | `P-ADA-1`; `Cargo.toml` |

---

## §5. CALLBACKS — `0`, AND THE REASON

**THIS UNIT DECLARES NO CALLBACK.** It adopts a library and replaces a boundary; **the listener invocation is the package's, unchanged, and the finalizer hook is not a callback into caller code** — it runs the package's own drop and takes no caller function.

**Zero is stated with its reason so a reader does not read the gap as an omission.** `[CONTRACT]`
