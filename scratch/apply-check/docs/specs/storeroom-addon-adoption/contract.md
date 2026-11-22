# Contract — `U-STOREROOM-ADDON-ADOPTION`: the binding library, the ABI it replaces, the fetch on build, and the store teardown

**Status:** **SPEC — the whole contract of this unit.** **REGENERATED 2026-10-18, not amended**: five prior passes produced an amendment-layered directory that carried the same position marked at dozens of sites and sweep tables auditing the markings; it is archived byte-exactly at `archive/addon-surface-regen/2026-10-18/` and this document supersedes it entirely. **This document carries NO supersession clauses and NO audit tables.** A position appears once, states what is true, and cites the ruling that made it true.

**Why there is no amendment history here.** The six rulings below are the authority; a reader who wants the derivation follows the row. **Restating a superseded reading beside its successor is what made the prior directory unauditable** — thirty-one completeness findings across six passes, every one of them bookkeeping over prose rather than a defect in the change. *(`FIVE → SIX`, corrected 2026-10-19, `role_spec_writer`: this file's table below already carried the sixth row — *"FUNCTION REBINDING ON THE STORE IS UNSUPPORTED BREAKING BEHAVIOUR…"* — while this sentence still printed `five`, so the count and its own table disagreed. RECONCILED TO `docs/decisions.md`'s ACTIVE rows and to `docs/specs/storeroom-addon-surface-changes-summary.md`, whose own head and `§1` heading carried the same stale figure.)*

**The authority.** `docs/decisions.md`'s ACTIVE rows, cited **by name** (that file's own header warns its line anchors drift):

| Row | What it decides, for this unit |
| --- | --- |
| *"THE BINDING CRATE FETCHES ON BUILD…"* | `--offline` leaves this crate's declared commands; the store's keep theirs; `PKGS` is rewritten |
| *"FOUR CLAUSES … ARE HALLUCINATED OR MISREAD"* | the four void clauses; the failure form's member count |
| *"SPLITS AT THE DEPENDENCY BOUNDARY…"* | this unit's scope, its boundary, its order, its freeze, four conditions |
| *"THE STORE IS TORN DOWN BY A GC FINALIZER…"* | teardown, the file's fate, the wait, the refusal |
| *"THE `STEP 0` ADOPTION DOSSIER IS SEQUENCED IN TWO PASSES…"* | the dossier's two passes and the budget rule |
| *"FUNCTION REBINDING ON THE STORE IS UNSUPPORTED BREAKING BEHAVIOUR…"* | **rebinding is unsupported and unguarded, and THE COST COUNT IS `1`** — the one cost is the detached call, which is the surface unit's (`docs/specs/storeroom-addon-surface/contract.md §3` items 5–6) |

**The layer.** Every observable in this unit is `ENVELOPE/PURE` (`RCA-12`). **No `APP`-green is claimed or available.**

---

## §0. THE INDEX — the parts, and what carries nothing

| Part | KIND | What it carries |
| --- | --- | --- |
| `contract.md` | index + clauses | this file: the unit, its boundary, its clauses `§1`–`§6` |
| `binding-crate-and-abi.md` | carrier | the manifest, the library, the ABI replacement and its counts |
| `command-sites-and-residue.md` | carrier | the eleven `--offline` sites, the residue sites, the `PKGS` preflight |
| `finalizer-and-teardown.md` | carrier | the finalizer, the active-edit count, the file barrier, the freeze |
| `failure-form.md` | carrier | the one thrown form, and the obligation that keeps it |
| `parameter-semantics.md` | carrier | one row per declared position, seam, callback and returned member |
| `test-cases.md` | view | the valid states and the fail-states, derived; **carries no new claim** |
| `implementation-plan.md` | carrier | what lands, in what order, verified how |

**Omitted, each with its reason — these names carry nothing in this unit:**

| Omitted | Reason |
| --- | --- |
| `property-register` | **a separate part is not warranted: the register is `§5` of this file** — six rows, and a second home for them would be a second copy |
| `data-class-structure` | the unit introduces **no data class**: it adopts a library and replaces a boundary |
| `process-flow` | **the unit changes no flow**: the wire's verbs, records and failures are byte-identical; `implementation-plan.md` carries the landing order, which is not a runtime flow |
| `census` | **the unit's figures are forensic rather than behavioural** — ABI counts, command sites — and each is stated at its own clause with its own byte anchor |

**Closure predicate: `8 − 1 − 3 = 4` named carrier parts and views, and `1` index — `5` files, `5 = 5` ✓.**

---

## §1. WHAT THIS UNIT IS, AND ITS BOUNDARY

1. **IT ADOPTS A NODE-API BINDING LIBRARY AND REPLACES THE HAND-WRITTEN BOUNDARY.** The crate's export layer is built with a library of the `napi-rs` family. Today's `bindings/js/src/facade.rs` hand-declares the Node-API ABI in an `extern "C"` block and calls it through `unsafe`. **The hand-declared ABI goes; the library's checked bindings take its place.**

2. **IT REPLACES THE BOUNDARY IT SHARES — IT DOES NOT TOUCH THE CORE.** `bindings/js/src/crossing.rs` is pure Rust: **zero `unsafe`, zero `napi` type, zero `#[napi]` attribute, at any depth.** That is a **checkable clause**, not an observation — **`#[napi]` annotates ENTRY functions, and it reaches the core only if an implementer puts it there.** `R: the SPLITS row`, condition (i).

3. **IT IS THE FIRST OF TWO UNITS, AND IT LANDS FIRST.** The export split, the receiver and the JS unwrap are `U-STOREROOM-ADDON-SURFACE`'s. **The order's REAL GROUND — ADDED 2026-10-19 (`role_spec_writer`), replacing the release-preflight argument this item once carried:** **this unit produces the freeze the surface unit consumes, and THE FREEZE IS NOT DERIVABLE FROM ANYTHING THAT EXISTS BEFORE THIS UNIT LANDS** (`§1` item 5; `implementation-plan.md §4`). **Its three figures — the built `.node`'s `sha256`, the export name set and `facade.rs`'s byte count — are read off a BUILT ARTEFACT that does not exist until step `2` has run.** **So the surface unit's input has no earlier source, its step `1` cannot be taken against an artefact that has not been built, and the order is closed for that reason alone.** **The receipt that once stood here — *"the surface unit's report cannot be green while a release preflight refuses the tree"* — was a WEAKER ground and is not the reason: the `PKGS` preflight is step `5` of this unit's own plan and is not a gate the next unit's work passes through.**

4. **THE BOUNDARY IS THE DEPENDENCY BOUNDARY.** After this unit, **no other crate in this repository may gain a registry dependency without its own unit.** That is the line the residue site `S-1` and the `PKGS` preflight exist to protect.

5. **IT PRODUCES THE FREEZE THE SURFACE UNIT CONSUMES.** Before the surface unit starts: the built `.node`'s `sha256`, the export name set, and `facade.rs`'s byte count, recorded on the gate record. **This is a declared output of this unit and a declared input to the next.**

6. **WHAT IT DOES NOT TOUCH.** No verb's signature, arity, return shape or failure changes. No record's shape changes. **The wire is byte-identical before and after** — which is why this unit's acceptance witness is *the standing suite does not move*, with the one named exception in `§6`.

---

## §2. THE MANIFEST, THE LIBRARY, AND THE ABI REPLACEMENT

**Clauses and counts: `binding-crate-and-abi.md`.** The substance:

1. **`napi` enters `bindings/js/Cargo.toml`'s `[dependencies]` at a caret requirement with a floor of `"3.14"`.** Registry reachable, resolved at `3.14.2` on 2026-10-18. **`bindings/js/Cargo.lock` stays UNCOMMITTED** — pinning a consumer's transitive versions is a consuming-application decision, not a library's.

2. **THE HAND-DECLARED ABI IS DELETED, AND `crossing.rs` IS UNTOUCHED.** What goes: the `extern "C"` block, the four `*mut c_void`/`i32` aliases, the `unsafe fn`s and `unsafe` blocks that call the ABI directly. What stays: `crossing.rs`, byte-for-byte.

3. **THE FIVE ENTRY FUNCTIONS REMAIN FIVE, UNDER THEIR OWN NAMES.** `version` · `errorMessage` · `storeCreate` · `call` · `register`. **Their arities are unmoved.** The split into per-verb entries is the other unit's.

4. **THE BUILD IS VERIFIED BY ITS EXPORTED SYMBOL SET, NOT BY THE FACT THAT IT BUILT.** A rung-one load throw is read as a *miss* by the entry, so an un-exported registration symbol degrades silently to the rung-two fall-through the entry removed. `R: the SPLITS row`, condition (iv).

5. **`cargo clippy`'s `-D clippy::correctness` LEG IS RESOLVED, NOT IGNORED.** `napi-derive` is a proc-macro crate whose expansions are linted **in this crate's context**; the leg is declared at `docs/specs/storeroom-js/acceptance.md:108` and `docs/specs/storeroom-native/implementation-plan.md:367`/`:407`, and it fails the trio. The leg is run with its dependency scope declared. `R: the SPLITS row`, condition (iii).

---

## §3. THE COMMANDS AND THE RESIDUE

**Clauses and sites: `command-sites-and-residue.md`.** The substance:

1. **`--offline` LEAVES THE BINDING CRATE'S DECLARED COMMANDS AND STAYS ON THE STORE'S.** The binding crate fetches what it needs at build time. **`--manifest-path` stays at every site** — it is not a flag about the network; the two halves of the command do different jobs.

2. **ELEVEN SITES MOVE**, each named in the carrier part. **The store's commands are unmoved and the asymmetry is the ruling**, not an oversight: the store is dependency-free and offline; the binding crate fetches.

3. **`scripts/publish.sh`'s `PKGS = 1` PREFLIGHT IS REWRITTEN, NOT BYPASSED.** Its subject changed. **The replacement proves the same property the old one did: the lock's package set EXACTLY MATCHES what the manifests declare** — no package in `Cargo.lock` that no `Cargo.toml` requires, and none required that the lock omits. **A check relaxed to "the count is whatever it is" would be a weakening.**

4. **THE RESIDUE SITES.** `S-1` — `bindings/js/Cargo.toml`'s *"no registry fetch at all"* comment, false the moment `napi` lands. `S-4` — `facade.rs:11`–`:13`'s stale header. **`S-6`** — `bindings/js/src/crossing.rs:11`'s *"closed `15`-member set"*, stale against the operative `16`; **the source fix is this unit's, owner `role_implementer`.**

5. **THE ROOT `Cargo.toml`'S *"No dependencies"* COMMENT IS NOT A RESIDUE.** It describes the **store crate**, is true of it, and **stands exactly as written.**

---

## §4. THE FINALIZER AND THE TEARDOWN

**Clauses: `finalizer-and-teardown.md`.** The substance, and it is short because the mechanism is short:

1. **TEARDOWN IS A GC FINALIZER ON THE JS INSTANCE.** `napi` supplies `Object::add_finalizer`. **No verb is added**: a client that holds its reference forever leaks exactly as it does today, so no leak becomes worse.

2. **IT FREES THE ONE STORE THAT INSTANCE OWNS, AND NO OTHER.** Verified: one construction builds one `Store` with its own handle domain, and the index beside it is a lookup slot, not a store identity. **Two `storeCreate` calls are two discrete stores in separate memory.**

3. **THE FILE PERSISTS AND TEARDOWN DOES NOT TOUCH IT.** Teardown is memory, not bytes. **Reopening is already the designed path**: the store's construction creates the file when absent and, on `AlreadyExists`, falls through to an existing write-mode open that deliberately never truncates. **The persisting file is the seed of the next construction.**

4. **THE OWNERSHIP MODEL CHANGES.** A `Vec` cannot lose an element without either shifting later entries — **which would silently re-point store #2's calls to store #3** — or holding a tombstone, which grows unboundedly. **So the store is per-object owned.** This serves the surface unit's index removal too; the two converge on the same change.

5. **THE WAIT IS PER-STORE, AND THE BRACKETING RULE HAS ONE HOME.**

   **THE RULE, AND THE VERB SET IT DERIVES, ARE STATED AT `finalizer-and-teardown.md §4.1` AND ARE NOT RESTATED HERE.** **Restating them is the defect class this regeneration exists to remove, and a restatement that disagrees with its source is worse than none.**

   **THE ONE LINE THIS CONTRACT CARRIES, SO A READER OF THE BELOW NEEDS NOTHING ELSE: the count is the number of open commits, a verb brackets it iff it OPENS A COMMIT, and the count reaches zero once on the final return to the client — after every listener has fired.**

   **AND THE WALK'S SET AND ITS LAYER, NAMED HERE BECAUSE A COUNT OF VERBS READ WITHOUT ITS LAYER READS AS A CONTRADICTION — ADDED 2026-10-19 (`role_spec_writer`), AND ITS FIGURE CORRECTED THE SAME DAY.** **THE WALK COVERS THE PACKAGE-SURFACE CALLS THAT CAN OPEN A COMMIT — `17` calls, `5` bracketing plus `12` non-bracketing, `5 + 12 = 17` ✓ — A POPULATION AT THE JS/KERNEL LAYER, spelled at `finalizer-and-teardown.md §4.1`, which is its ONE HOME and which states the layer beside its rows.** **THE `15` THIS ITEM ONCE PRINTED WAS STALE, AND SO WAS THE `13` THAT REPLACED IT — the non-bracketing NAMES are `12` and the `8` standing beside them was a count of the second TABLE'S ROWS, so that sum added a row-count to a name-count.** **THE FIGURE IS STATED HERE BECAUSE THIS CLAUSE IS A COUNT OF VERBS AND WOULD BE THE EXACT SENTENCE A LAYER-LESS READER NEEDS IT IN; THE POPULATION'S ONE HOME IS THE PART'S `§4.1`, AND THE TWO AGREE.** **IT IS A DIFFERENT SET FROM THE ADDON'S EXPORT SET**, which is the wire's thirteen boundary entries (`docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §1`) — **the same count, a different set.** **`constraints` SITS IN THE WALK AS A PACKAGE-SURFACE CALL AND IS NOT AN ADDON ENTRY — both true, at two layers.**

6. **THE FINALIZER WAITS FOR THE STORE'S COUNT TO REACH ZERO, THEN DROPS IT.** The wait is **per store** — one store's teardown never blocks on another's traffic. **`constraint-kernel.mjs` gains a second index over the same attempt records for this, and the kernel's own refactor is deferred**; the index is deliberately narrow so that refactor is a replacement, not the same idea written twice. **The attempt record already carries its own `store`, so nothing is added to any record and no existing reader moves.**

7. **THE FILE BARRIER IS THE SAME BARRIER.** An in-flight file edit is inside the call that opened it, so a zero count means no edit is mid-flight. **The delivery's coverage is a READING and not a separately measured fact**: the corpus declares the listener invocation synchronous and after the addon's call returned, so a delivery downstream of an edit completes inside the window that edit holds — **the thing the count cannot see is a listener body that outlives its triggering write, and the synchronous declaration is the only ground for saying it cannot.**

---

## §5. THE TYPED PROPERTY REGISTER — `6` rows, budget `≤ 8`

**`2 + 2 + 2 = 6` ✓.** Each row carries its property, its strategy ids and an explicit failure list. **The ids are disjoint from every existing family** (`P-IM`/`P-SM`/`P-TP`, `P-SR`, `P-PUB`, `P-HL`, `P-SAS`).

**`P-ADA-1`** — **the crate's dependency table carries exactly the two entries the manifest declares — the store's path dependency and the adopted library — and no third.** Strategies: **`S-DEP-TABLE`** (read `bindings/js/Cargo.toml`'s `[dependencies]`; assert exactly two entries with those keys and that requirement string). Failure list: a third entry; a missing entry; a caret floor other than `"3.14"`; the store's path dependency renamed or repointed.

**`P-ADA-2`** — **`crossing.rs` carries no `napi` type, no `#[napi]` attribute and no `unsafe`, at any depth.** Strategies: **`S-CORE-PURE`** (grep the file for `napi`, `#[napi`, `unsafe`; exactly one textual `napi` match is lawful — the purity declaration in its header comment). Failure list: any `napi` import; any `#[napi]` annotation; any `unsafe` block; a `*mut c_void` alias.

**`P-ADA-3`** — **a refusal crossing this boundary carries exactly `{status, message, log}` — the three members, never an `Error` prototype — and `napi::Error` is used on no refusal path.** **`stack` IS NOT PART OF THE FORM AND IS NOT FORBIDDEN: it is an artefact of a plain object having none, and NOTHING ASSERTS ITS ABSENCE** (`failure-form.md §1`). Strategies: **`S-FF-KEYS`** (catch a refusal; `Object.keys` sorted equals the three) · **`S-FF-PROTO`** (the thrown value is not an `Error` and carries no `code`; **`stack` is NOT asserted — it is not part of the form and is not forbidden**) · **`S-FF-STATUS`** (the status is a present, non-empty **string** — **and NOT which member of the closed set it is: the token is `OWED` and NO DRIVE ASSERTS IT**). Failure list: a fourth member; an `Error` subclass; a `napi::Error` reaching the caller. **`stack` is NOT on this list.**

**`P-ADA-4`** — **a released instance's store is freed while a second store's calls still answer, and the freed store's file is present and unmodified.** Strategies: **`S-FIN-ONE`** (two constructions; release one; the other's reads and writes still answer) · **`S-FIN-NOSHARE`** (the released store's file exists, byte-identical to its last committed state). Failure list: the second store failing after the first is freed; the file deleted or truncated; a call on the freed store answering anything but the declared form.

**`P-ADA-5`** — **the count is the number of OPEN COMMITS in the store: a verb brackets it iff it opens a commit, a verb finding an extant commit joins it rather than opening a second, and the count reaches zero once on the final return to the client.** Strategies: **`S-COMMIT-OPEN`** (**walk EVERY PACKAGE-SURFACE CALL THAT CAN OPEN A COMMIT, at the JS/kernel layer** — the set of `finalizer-and-teardown.md §4.1`, which is `17` calls — `5 + 12 = 17` ✓ — is `constraints` included and is NOT the addon's export set; record whether the count moved; **assert the movement against the RULE and not against a list** — a call whose movement disagrees with *"did it open a commit"* names itself as the failure) · **`S-COMMIT-JOIN`** (a kernel-driven write joining an extant commit does not open a second → the count rises once for the pair) · **`S-COMMIT-ONCE`** (a write with a listener that itself fires → the count is zero AFTER the call returns and non-zero before it). Failure list: **a call whose movement disagrees with the rule, NAMED BY THE WALK**; a nested call double-counting; a count reaching zero before the listener fires; a count left non-zero after a return. **THE WALK IS THE POINT: it catches a misclassified verb that a list would hide.**

**`P-ADA-6`** — **the build's exported symbol set contains every name the entry reaches, and the load path verifies the artefact it loads.** Strategies: **`S-SYM-SUPERSET`** (read `Object.keys` of the built addon; assert it is a **superset of the `23` hand-declared symbols the boundary reaches** — **NOT of the five JS-visible names, which is a different set**) · **`S-SYM-NO-FALLBACK`** (a build missing one name fails at load, not at first call). Failure list: an un-exported registration symbol; a load succeeding against a stale artefact; the version check passing for a build with a different export set.

---

## §6. THE STATES A DRIVE DERIVES, AND THE ONE THAT MOVES

**The contract's states are the wire's, which this unit does not change.** The derivation lives at `test-cases.md`.

**AND THE ONE EXCEPTION TO *"THE SUITE DOES NOT MOVE"*, NAMED SO IT IS NOT A SURPRISE:** **`bindings/js/test/version-stamp.test.mjs` reads `bindings/js/src/facade.rs` AS TEXT** — it binds the path, reads it, strips comments, and asserts the file carries `option_env!("STOREROOM_JS_PACKAGE_VERSION")` and `env!("CARGO_PKG_VERSION")`. **A correct rewrite of that file moves those cells.** **This is an INSTRUMENT change and not a behaviour change**: the relation the cells assert — the directive where emitted, the crate's version where not — is unmoved, and **the cells are re-cut to the RELATION, never re-pinned to whatever spelling the rewrite happens to emit.**

---

## §7. WHAT THIS UNIT DOES NOT SETTLE

- **`OWED` — the freeze's three figures.** The `.node`'s `sha256`, the export name set and `facade.rs`'s byte count are produced by **step `2`, THE LIBRARY AND THE ABI** — *the step that actually builds the artefact*; the artefact does not exist yet. Owner: `role_implementer`. **REVISIT CONDITION: the first build of step `2` that emits both artefact kinds — the three figures are taken there and recorded on the gate record.** **Named once, consistently: `implementation-plan.md §2`/`§4` carries the same step.** **It is NOT step `5`, which edits residue and a preflight and builds nothing.** *(`OWNER AND REVISIT CONDITION RECONCILED 2026-10-19, `role_spec_writer`: this bullet named its owner as *"the landing pass"* while `§7`'s other two `OWED`s named none, so the three were not the same form. All three now carry BOTH.)*
- **`OWED` — `STEP 0` PASS 2's symbol enumeration.** The crate's source is not in this tree and the lock is uncommitted, so the enumerated surface cannot be taken from the artefact until the build exists. `R: the `STEP 0` row`. **The dossier's 8 rows are all `defined`; no row is open.** Owner: `role_spec_writer`. **REVISIT CONDITION: the same first build — the enumeration is taken from the artefact it names, and `STEP 0` PASS 2 closes the row against that artefact.** *(owner and revisit condition added 2026-10-19, `role_spec_writer`, for the reason stated at the first bullet.)*
- **`OWED` — the refusal arm's `status` token and `message`.** The **shape** is decided and drives are authorable; the token's identity belongs to the surface unit's arm. Owner: `role_spec_writer`. **REVISIT CONDITION: the surface unit's arm is authored and names a member of the store's closed status set — the choice is taken there and this bullet is discharged by it** (`docs/specs/storeroom-addon-surface/failure-form.md §2`). *(owner and revisit condition added 2026-10-19, `role_spec_writer`, for the reason stated at the first bullet.)*

---

## §8. THE GATE CHAIN

Step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4 `role_change_analysis`. **The gate is passed and the go-ahead given.** Gate 2's rule: **a code task is delegable once this contract exists and the reviewer loop returned an empty list — or parked the remainder with a decision record.** Gate 3 is the red set, authored from this contract alone.

**END OF THE CONTRACT.** **`§2` items 1–5 · `§3` items 1–5 · `§4` items 1–7 · `§5` rows `P-ADA-1`…`P-ADA-6` · `§6` · `§7` — and the four carrier parts this file names.**
