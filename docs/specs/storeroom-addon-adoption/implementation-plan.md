# Part — `implementation-plan` (`U-STOREROOM-ADDON-ADOPTION`): what lands, in what order, verified how

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-adoption/contract.md`. **REGENERATED 2026-10-18.** **AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING: *"Lift the dependency constraint, it doesn't apply to the rust side."*** **Step `2` names the THREE-entry dependency table, step `1` states why the fetch must be reachable before it, and `§1`/`§5` are reconciled to the same reading of `command-sites-and-residue.md §2`.** **NO WHOLE-FILE REWRITE WAS TAKEN AND NO STEP MOVED** (`DEF-2026-10-02`; `docs/decisions.md` · `A131`).
- **Scope boundary.** No clause of its own; **this part states the landing order and each step's verification**, and every step cites the clause it lands.
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE ORDER, AND WHY IT IS THIS ORDER

**Five steps.** **Step `1` MUST precede `2`, because the crate cannot build with a registry dependency under a command that forbids the fetch.** **Steps `3`–`5` may interleave**, but `5` — the acceptance run — is last and sees the whole.

**AND THE ORDER'S GROUND IS SHARPER UNDER THE 2026-10-21 DEPENDENCY AMENDMENT — ADDED 2026-10-21 (`role_spec_writer`), ON THE ARCHITECT'S RULING *"Lift the dependency constraint, it doesn't apply to the rust side."*** **A ONE-ENTRY TABLE WAS ALREADY A REGISTRY FETCH; A THREE-ENTRY TABLE IS ONE STILL, AND ITS THIRD ENTRY — `napi-derive`, a proc-macro crate — IS NOT VENDORED IN `.cargo-home`** (`binding-crate-and-abi.md §1`). **So the first cold build of step `2` needs the network for the derive as well as the library, and step `1` is the step that makes the network reachable. THE AMENDMENT CHANGES NO ORDER: it makes an existing order's necessity plainer.** **AND THE TWO RULINGS AGREE AND ARE NOT TWO RULES: `command-sites-and-residue.md §2` already rules that the BINDING CRATE'S commands FETCH — its declared clippy leg carries no `--offline` — while the STORE's carry theirs** (`command-sites-and-residue.md §1`, `§3`). **THE BILL THIS PART'S `§5` RISK `1` PRICES IS UNCHANGED IN KIND AND WIDENED IN SCOPE: the fetch now covers two registry crates rather than one.**

---

## §2. THE STEPS

| # | The step | What it moves | How it is verified |
| --- | --- | --- | --- |
| `1` | **THE COMMANDS** | the eleven sites named at `command-sites-and-residue.md §2`; the store's commands unmoved (`§3`) | the declared commands run; the store's still carry `--offline`; the sites are read and each is named; **AND THE BINDING CRATE'S COMMANDS CARRY NO `--offline`, SO THE FETCH IS AVAILABLE TO THEM — which is the whole of why this step precedes `2`: a cold build of a three-entry table CANNOT resolve under a flag that forbids the network** (`command-sites-and-residue.md §1`–`§2`) |
| `2` | **THE LIBRARY AND THE ABI** | `bindings/js/Cargo.toml`'s `[dependencies]` — **THREE entries: the store's path dependency, `napi` at `"3.14"`, and its derive `napi-derive` at `"3"`** (`binding-crate-and-abi.md §1`, AMENDED 2026-10-21 on the architect's ruling *"Lift the dependency constraint, it doesn't apply to the rust side."*); `facade.rs`'s `extern "C"` block, its four aliases, its five `pub unsafe extern "C" fn *_callback` shims, its `unsafe` calls, its hand-built export table and its `.init_array`/`.CRT$XCU`/`__DATA,__mod_init_func` initialiser registration | **the crate builds to both artefact kinds**, and the artefact's own symbol set is read and found a superset of what the entry calls (`P-ADA-6`); **the THIRD dependency is FETCHED on this step's first run, not available offline** (`§5` risk `1`; `command-sites-and-residue.md §1`–`§2`) |
| `3` | **THE CORE'S PURITY** | nothing — **a clause that holds as a consequence, and is checked because `#[napi]` reaches the core only if someone puts it there** | `P-ADA-2`: the three forbidden strings searched in the core |
| `4` | **THE FINALIZER AND THE COUNT** | the ownership change (per-object store ownership); the finalizer; **the count's READ SEAM — the two `Symbol.for` channels on the store instance, `Symbol.for('provident-storeroom.attempt-count')` and `Symbol.for('provident-storeroom.attempt-opened')`, and NOT module exports of `constraint-kernel.mjs`, whose export set a standing assertion closes at the six `K-1`–`K-6` items** (`finalizer-and-teardown.md §4.2`); the per-store edit index in `constraint-kernel.mjs`; the increment and the single decrement at the bracketing verbs' entry and final return | `P-ADA-4` and `P-ADA-5`: two stores driven with one released **and the returned object's finalizer registration asserted — READ BEHAVIOURALLY, per `finalizer-and-teardown.md §5-bis`: the registration is observable ONLY BY ITS EFFECT and carries NO symbol-keyed own-property witness, so the landing step is verified by the surviving store's answers and the surviving file and NEVER by a witness property and NEVER by a forced collection — its firing freeing exactly one store**; **the count read before, during and after EVERY PACKAGE-SURFACE CALL THAT CAN OPEN A COMMIT BY the `attempt-count` channel** (`finalizer-and-teardown.md §4.1` — the walk's set, which is `13` calls, `constraints` included and is NOT the addon's export set); a constraint modification that triggers a repair |
| `5` | **THE RESIDUE AND THE PREFLIGHT** | `S-1`, `S-4`, `S-6`; `scripts/publish.sh`'s `PKGS` preflight rewritten | the preflight fails on a lock that disagrees with the manifests **and passes on the tree this unit builds**; **the residue is corrected or the site is reported as not falsified** |

---

## §3. THE WITNESS

**THE STANDING SUITE IS NECESSARY AND NOT SUFFICIENT.**

- **Necessary:** the wire is byte-identical, so the node suite's cells must not move — **except the one named cell class below.**
- **Not sufficient:** the Rust cells drive the **core**, which this unit does not touch; the node cells drive the boundary **through the package's own entry** as a means rather than a subject. **Neither set executes the boundary as a subject.**
- **The named exception:** `bindings/js/test/version-stamp.test.mjs` reads the boundary source **as text** and asserts two macro spellings. **A correct rewrite moves those cells. This is an INSTRUMENT change, not a behaviour change** — the relation is unmoved, and **the cells are re-cut to the RELATION, never re-pinned to whatever spelling the rewrite emits.**
- **What the acceptance run therefore is:** the trio, **plus the symbol-set read**, **plus the re-cut cells green**. **A green claimed from the trio alone would not witness this unit.**

---

## §4. WHAT THIS UNIT PRODUCES FOR THE NEXT

**THE FREEZE, produced by step `2`, THE LIBRARY AND THE ABI:** the built artefact's `sha256`, the export name set, and the boundary source's byte count, **recorded so the surface unit's split is a change against a known ABI.**

***Corrected 2026-10-19 (`role_spec_writer`): this part once named the producer *"step `5`'s close-out"*, and `§7` of the contract named it *"the pass that lands this unit"* — two names for one step, and the first was WRONG: step `5` is THE RESIDUE AND THE PREFLIGHT, which edits comments and a shell preflight and BUILDS NO ARTEFACT, so it cannot produce a built artefact's hash. THE FREEZE IS PRODUCED BY THE STEP THAT ACTUALLY BUILDS THE ARTEFACT — step `2` — and that is the one name both sites now carry*** (`contract.md §7`; `§2` above, whose step `2` verifies *"the crate builds to both artefact kinds"*). **Step `2`'s own acceptance is where the three figures are taken: the `.node` exists there for the first time.** **Steps `3`–`5` may interleave, but none of them builds anything, so none of them can be the freeze's producer.**

---

## §5. THE RISKS, NAMED SO THEY ARE NOT DISCOVERED

1. **THE FIRST COLD BUILD FETCHES.** On a runner with no cache the build needs the network; **the failure is later and less legible than a declared-command error**, and that is the price the ruling accepts. **AND THIS RISK NOW COVERS TWO CRATES AND NOT ONE — AMENDED 2026-10-21 (`role_spec_writer`): `napi-derive` is a second registry fetch and is NOT vendored in `.cargo-home`, so a cache warmed for the library alone is not a warm cache for the build.** **The declared commands are the remedy in both cases, which is why step `1` precedes step `2` and why `--offline` leaves them** (`command-sites-and-residue.md §1`–`§2`).
2. **NOTHING PINS THE LIBRARY'S CLOSURE.** The lock is uncommitted, so the caret floor is the whole pin. **Said of the library AND — since 2026-10-21 — of its derive: TWO caret floors are the whole pin, `"3.14"` and `"3"`, and neither has a lock entry to check it against** (`binding-crate-and-abi.md §1`).
3. **THE LINT LEG CAN TRIP ON A MACRO EXPANSION.** The `-D` is declared; the scope is declared with it rather than disabled. **MEASURED ABSENT UNDER THE THREE-ENTRY TABLE — AMENDED 2026-10-21 (`role_spec_writer`): the probe ran the leg with the derive present and it EXITED `0`, so NO SCOPE DECLARATION IS OWED and this risk stands UNTRIGGERED rather than waived** (`binding-crate-and-abi.md §5`).
4. **THE COUNT'S SET IS CLOSED BY A RULE, NOT BY A LIST.** A verb added later that lands an edit **must** bracket the count, and the rule is written so that it does.
