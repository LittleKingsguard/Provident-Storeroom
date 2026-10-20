# View — `test-cases` (`U-STOREROOM-ADDON-ADOPTION`): the inventory of states and fail-states the contract already pins

- **Status:** VIEW PART of `docs/specs/storeroom-addon-adoption/contract.md`. **It derives and carries no new claim** — every row cites the clause that pins it. **REGENERATED 2026-10-18.**
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

**THE INVENTORY'S CENSUS: `30` rows — `13` valid states, `9` fail-states, `8` invariants-driven drives.** **`13 + 9 + 8 = 30 ✓`.** **(`V-13` and `F-9` are ADDED 2026-10-20, `role_spec_writer`, on gate-3 findings `2` and `3`: the count's read seam had no row, and the released store's row had no discriminator — so a drive was derivable for neither. THIS IS AN ADDITION AND NOT A REPAIR — unlike the pair at `V-11`/`V-12`, no row moved and TWO ROWS ARRIVED, so the census moves by exactly two and `28 → 30` is that pair.)**

**AND EVERY ROW STANDS ON ITS OWN LINE — REPAIRED 2026-10-19 (`role_spec_writer`), AND THE WORD IS `REPAIRED` BECAUSE THIS WAS A SPLIT AND NOT A DELETION: `V-11` and `V-12` once shared one line, so `V-12` was a row no search could return. The two are now separate rows and no other row moved; the census above is unmoved because the pair's sum was already counted — BOTH ROWS STAYED IN THE VIEW AND THE REPAIR MOVED A BYTE BOUNDARY, NOT A ROW.** *(`SETTLED 2026-10-19`, `role_spec_writer`: the surface view attributes its `27 → 26` to a DELETION and says so in its own census; the two directories describe two different repairs and now name them — a split here, a deletion there, neither vocabulary imported by the other.)*

**AND THIS VIEW'S OWN CENSUS IS READ AGAINST THE SIBLING VIEW'S, BECAUSE THE TWO ARE THE SAME SHAPE AND DIFFERENT NUMBERS — ADDED 2026-10-19 (`role_spec_writer`), AND ITS FIGURE CORRECTED 2026-10-20 (`role_spec_writer`) BECAUSE THIS SENTENCE PRINTED `28` AS *"HERE"* WHILE THE HEAD ABOVE IT HAD ALREADY MOVED TO `30` ON THE `V-13`/`F-9` PAIR.** **HERE: `30` rows, and the pair's SPLIT moved nothing and the LAST pass's ADDITION moved the census by exactly two. There: `26` rows, and one row's DELETION moved the census by one. SAME VOCABULARY, TWO REPAIRS, AND EACH VIEW NOW NAMES ITS OWN — a reader who finds `30` beside `26` has found two views and not a disagreement.** `[CONTRACT]`

**AND NO ROW MOVES ON THE 2026-10-20 RE-CUT AMENDMENT — ADDED 2026-10-20 (`role_spec_writer`), GATE-3 RE-CUT FINDINGS `D` AND `E`, AND THE WORD IS *RE-CUT* BECAUSE THE CENSUS IS UNMOVED AT `30`.** **THREE ROWS ARE RE-CUT IN PLACE AND NONE IS ADDED OR DELETED: `V-7` and `F-9` and `D-5` each gained the ruling `finalizer-and-teardown.md §5-bis` now makes — that the finalizer registration is observable ONLY BY ITS EFFECT and carries NO symbol-keyed own-property witness — so a drive reads the surviving store and the surviving file and NEVER a witness property on the returned object and NEVER a forced collection.** **THE THREE ROWS CARRIED THAT DEMAND IMPLICITLY BEFORE THIS PASS AND IT WAS UNSATISFIABLE** (`contract.md §4` item 1: teardown is `napi`'s `Object::add_finalizer`, which installs no such property), **so the re-cut removes an over-strong reading rather than adding a case.** **AND THE `V-13` ROW'S READ SEAM IS RE-CUT IN THE SAME PASS ON FINDING `E`: it names the channel and spells no call shape, which is what the eight-row citation list at `finalizer-and-teardown.md §4.2`'s foot checks off.** **NO ROW MOVED, SO THE CENSUS IS `30` BEFORE AND AFTER: `13 + 9 + 8 = 30`, UNMOVED.**

**AND THE LAYER ON EVERY COUNT OF VERBS — ADDED 2026-10-19 (`role_spec_writer`).** **EVERY VERB COUNT IN THIS VIEW IS A COUNT OF PACKAGE-SURFACE CALLS AT THE JS/KERNEL LAYER, and `D-7`'s walk is over the set `finalizer-and-teardown.md §4.1` declares — `13` calls, `5` bracketing NAMES + `8` non-bracketing NAMES, `5 + 8 = 13` ✓, `constraints` included — and the second table's `7` ROWS are a ROW-count and are never added to the name-count.** **THAT FIGURE IS STATED ONCE, AT `finalizer-and-teardown.md §4.1`, AND EVERY OTHER SITE POINTS AT IT.** **AND THE FIGURE AND THE ENUMERATION WERE BOTH CORRECTED 2026-10-20 (`role_spec_writer`) ON GATE-3 FINDING `1`, WHICH IS THE FINDING THIS LINE RECORDS: the walk printed `17` while the names it enumerated numbered `13`, so a drive could not walk the set it was told to walk.** **THE ONE HOME NOW PRINTS EVERY NAME NUMBERED — `5` bracketing and `8` non-bracketing — and the total is derived from that list and not the reverse.** **`removeConstraint` and `removeListener` stood in the enumeration and are struck: neither is a call of this surface** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s member table carries no row for either). **That set is NOT the addon's export set**, which is the wire's thirteen boundary entries (`docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §1`) — **the same count, a different set**: `constraints` is a package-surface call in this walk and is not an addon entry.

**AND THE `2026-10-21` DEPENDENCY AMENDMENT RE-CUTS TWO ROW TEXTS AND MOVES NO ROW — ADDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING, VERBATIM: *"Lift the dependency constraint, it doesn't apply to the rust side."*** **`V-1` and `F-1` ARE RE-CUT IN PLACE: `V-1`'s table is THREE entries and `F-1` is a FOURTH entry rather than a third — because `P-ADA-1` now requires the third, which is `napi-derive`** (`binding-crate-and-abi.md §1`). **NEITHER ROW IS ADDED, DELETED OR RENUMBERED AND NO OTHER ROW MOVED, SO THE CENSUS IS `30` BEFORE AND AFTER: `13 + 9 + 8 = 30` ✓, UNMOVED.** **AND `F-1` IS THE ROW A STALE READING BREAKS: the old text *"a third dependency appears in the manifest"* now names the REQUIRED state, so a cell derived from it would be red on a correct landing** — which is why the row is re-cut here rather than left to the reader.

---

## §1. THE VALID STATES

| id | The state | Its clause | Its property |
| --- | --- | --- | --- |
| `V-1` | the manifest's dependency table carries exactly three entries — the store's path dependency, the adopted library and the library's derive | `binding-crate-and-abi.md §1` | `P-ADA-1` |
| `V-2` | the crate builds to both artefact kinds | `binding-crate-and-abi.md §1` | `P-ADA-1` |
| `V-3` | the core file carries no `napi` byte but its purity declaration | `binding-crate-and-abi.md §3` | `P-ADA-2` |
| `V-4` | a refusal thrown across the boundary carries the three members | `failure-form.md §1` | `P-ADA-3` |
| `V-5` | the artefact's export set is a superset of what the JS side reaches, and a symbol the boundary calls resolves at link time | `binding-crate-and-abi.md §4` | `P-ADA-6` |
| `V-6` | two constructions answer two discrete stores | `finalizer-and-teardown.md §2` | `P-ADA-4` |
| `V-7` | releasing one store leaves the other answering, and a release is expressible because the returned object carries the finalizer registration — **READ BEHAVIOURALLY: the registration is observable ONLY BY ITS EFFECT and has NO symbol-keyed own-property witness, so this row is driven by the two constructions and the surviving store's answers and NEVER by a witness property on the returned object** | `finalizer-and-teardown.md §5` and `§5-bis` (the ruling); the registration's effect and its one-store firing | `P-ADA-4` |
| `V-8` | a released store's file is present and unmodified | `finalizer-and-teardown.md §3` | `P-ADA-4` |
| `V-9` | a later construction at that path reads the file | `finalizer-and-teardown.md §3` | `P-ADA-4` |
| `V-10` | a write brackets the count, and the count is zero after the call returns | `finalizer-and-teardown.md §4` | `P-ADA-5` |
| `V-11` | a constraint modification brackets the count for a repair's duration | `finalizer-and-teardown.md §4.1` | `P-ADA-5` |
| `V-13` | the count is read by a declared seam — the store-keyed `Symbol.for('provident-storeroom.attempt-count')` before, during and after a call, and `Symbol.for('provident-storeroom.attempt-opened')` at the increment's instant | `finalizer-and-teardown.md §4.2` | `P-ADA-5` |
| `V-12` | the binding crate's commands carry no `--offline`, and the store's do | `command-sites-and-residue.md §2`–`§3` | — (a read of the declared commands) |

---

## §2. THE FAIL-STATES

| id | The failure | Its clause | Its property |
| --- | --- | --- | --- |
| `F-1` | a fourth dependency appears in the manifest — **and NOT the third entry, which `P-ADA-1` now requires** | `binding-crate-and-abi.md §1` | `P-ADA-1` |
| `F-2` | a `napi` type or an `#[napi]` attribute reaches the core | `binding-crate-and-abi.md §3` | `P-ADA-2` |
| `F-3` | a refusal carries a fourth member, or an `Error` prototype | `failure-form.md §1` | `P-ADA-3` |
| `F-4` | a refusal path returns a library error instead of a value | `failure-form.md §3` | `P-ADA-3` |
| `F-5` | the export set is missing a name the JS side reaches, **or a `napi_*` symbol the boundary calls fails to resolve at link or dynamic-load time** | `binding-crate-and-abi.md §4` | `P-ADA-6` |
| `F-6` | releasing one store breaks a second store's calls | `finalizer-and-teardown.md §2` | `P-ADA-4` |
| `F-7` | the released store's file is deleted or truncated | `finalizer-and-teardown.md §3` | `P-ADA-4` |
| `F-8` | a verb outside the bracketing set moves the count, or a set member does not | `finalizer-and-teardown.md §4.1` | `P-ADA-5` |
| `F-9` | the returned object carries no finalizer registration, **or** a firing frees more than one store — **and the first limb is read BEHAVIOURALLY and NEVER as an absent witness property: `§5-bis` rules the registration has no symbol-keyed own property by design, so a drive that demanded one would be red on a correct landing** | `finalizer-and-teardown.md §5` and `§5-bis` | `P-ADA-4` |

---

## §3. THE DRIVES THE PROPERTIES OWE

**Each property's failure list is its drive set; this table maps drives to rows rather than restating them.**

| id | The drive | Row |
| --- | --- | --- |
| `D-1` | read the manifest's dependency table — **THREE entries, and the third is the library's derive** (`binding-crate-and-abi.md §1`) | `P-ADA-1` |
| `D-2` | search the core for the three forbidden strings — **the `napi` count taken over the STRIPPED code, where it is ZERO**; the header comment's mention is permitted and is counted over the file as it lies | `P-ADA-2` |
| `D-3` | catch a refusal and read its own keys | `P-ADA-3` |
| `D-4` | catch a refusal and read its prototype | `P-ADA-3` |
| `D-5` | two constructions, release one, drive the other — **and assert that the returned object's finalizer registration is expressible and that its firing frees exactly one store, READ BEHAVIOURALLY: the surviving store's calls still answer and the released store's file is present and unmodified. NO witness property is read, and NO collection is forced** (`finalizer-and-teardown.md §5-bis`) | `P-ADA-4` |
| `D-6` | release, then hash the file | `P-ADA-4` |
| `D-7` | for every package-surface call that can open a commit — the walk's set at `finalizer-and-teardown.md §4.1`, `13` calls, `5 + 8 = 13` ✓, `constraints` included — read the count before, during and after **by the store-keyed `Symbol.for('provident-storeroom.attempt-count')` channel** | `P-ADA-5` |
| `D-8` | read the built artefact's export set and compare it against **the names the JS side reaches**; the LINK-SYMBOL risk is driven by **the build succeeding plus the loader's own report**, which no export-set read can observe | `P-ADA-6` |

---

## §4. WHAT THIS VIEW DOES NOT CARRY

**No new claim, no new figure, and no drive that a property's own failure list does not already name.** **The counts above are the view's own census of its rows**, and a row is a pointer to a clause, not a second statement of it.
