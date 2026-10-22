# Part — `binding-crate-and-abi` (`U-STOREROOM-ADDON-ADOPTION`): the manifest, the library, and what replaces the hand-declared boundary

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-adoption/contract.md`, authored in the same pass as its index region. **REGENERATED 2026-10-18.** **AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING: *"Lift the dependency constraint, it doesn't apply to the rust side."*** **`§1`'s two-entry rule is LIFTED FOR THE BINDING CRATE; the table is now THREE entries, and `P-ADA-1`, the view's `V-1`/`F-1` and the plan's step `2` are re-cut to it in the same pass.** **NO WHOLE-FILE REWRITE WAS TAKEN AND NO OTHER SECTION MOVED** (`DEF-2026-10-02`; `docs/decisions.md` · `A131`).
- **Scope boundary — what this part does NOT carry.** No command site (that is `command-sites-and-residue.md`), no teardown (`finalizer-and-teardown.md`), no failure form (`failure-form.md`).
- **The layer.** Every observable in this part is `ENVELOPE/PURE`. **No `APP`-green is claimed.** `[CONTRACT]`

---

## §1. THE MANIFEST AS IT MUST READ

**AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING — THE OPERATIVE CLAUSE OF THIS PASS.** **The ruling, verbatim: *"Lift the dependency constraint, it doesn't apply to the rust side."*** **The clause as filed read: *"`bindings/js/Cargo.toml`'s `[dependencies]` carries exactly TWO entries … **No third entry, and no other crate in this repository gains a registry dependency.**"* — A TWO-ENTRY FORM THAT THE ADOPTED FORM CANNOT BE BUILT IN.** **It is LIFTED, and the table below is the amendment.**

**WHY THE TWO-ENTRY FORM COULD NOT STAND, STATED AT ITS OWN CLAUSES SO THE LIFT IS A READING AND NOT A PREFERENCE.** `#[napi]` is **not in the `napi` crate**: it lives in **`napi-derive`, a separate proc-macro crate**. **Measured at the vendored artefact: `napi-3.14.2/Cargo.toml.orig` carries NO `napi-derive` dependency and NO re-export of it**, and **`napi-derive` is not vendored in `.cargo-home`** — so the annotation the adoption is defined by is unreachable from a two-entry table. **AND THIS PART ALREADY PRICED THE EXPANSION `§1` FORBADE: `§5` (*THE LINT LEG*) reads *"the adopted library's derive is a **proc-macro crate** whose expansions are linted IN THIS CRATE'S CONTEXT"*. `§5` prices an expansion `§1`'s two-entry rule forbids from ever happening, so the two clauses cannot both hold — and the ruling lifts `§1`.**

**`bindings/js/Cargo.toml`'s `[dependencies]` carries exactly THREE entries: the store's path dependency, unmoved; the adopted library at a caret requirement with a floor of `"3.14"`; and the library's derive, a proc-macro crate, at a caret requirement with a floor of `"3"`.** **NO FOURTH ENTRY IS LAWFUL.**

```
[dependencies]
storeroom-native = { path = "../.." }
napi = "3.14"
napi-derive = "3"
```

**THE DERIVE'S FLOOR IS `"3"` AND WHERE THAT REQUIREMENT IS READ FROM — ADDED 2026-10-21 (`role_spec_writer`).** **It is read from the adopted library's OWN DOCUMENTED FORM and not guessed: `napi-3.14.2/README.md` §*Building* prints the dependency table every napi-based add-on should carry, and it reads `napi = "3"` beside `napi-derive = "3"`.** **The probe pinned `3.6.12`, WHICH IS INSIDE THAT CARET — the `"3"` floor is the requirement, and `3.6.12` is a resolution of it rather than a second requirement.** **NO FEATURE LIST IS DECLARED ON THIS ENTRY**, and it is the one `[dependencies]` row whose feature selection the contract does not name.

**AND THE LIFT'S SCOPE, NAMED SO IT IS NOT OVER-READ.** **The dependency constraint the filed sentence carried was a JS-side constraint on imports and runtime data retrieval, and it reaches no compiled Rust crate.** **The old repository-wide "no other crate gains a registry dependency" prohibition is ARCHIVED** — see `archive/spec-history/2026-10-21-dependency-restriction-notes-move-out.md` §6 (`RCA-8(g)`). **WHAT STANDS INSTEAD IS A PROCESS REQUIREMENT, NOT A PROHIBITION:** a crate other than `bindings/js` may carry a registry dependency **by its own unit and its own clause**, which is how the store crate's `serde`/`serde_json` are declared (`contract.md §1` item 4). **AND THE LIFT'S OWN LIMIT IS UNWIDENED: `§1`'s table is THREE entries for `bindings/js` and NO FOURTH.**

**`Cargo.lock` STAYS UNCOMMITTED.** Pinning a consumer's transitive versions is a consuming-application decision, not a library's. **The consequence is stated rather than hidden: nothing in this repository pins the adopted library's closure, so the caret floor is the whole pin.** **THIS CLAUSE IS UNMOVED BY THE RULING** — the amendment changes the table's row count and nothing about the lock's fate. **AND THE THIRD ENTRY WIDENS THE CONSEQUENCE AND DOES NOT CHANGE ITS KIND: `napi-derive`'s closure is unpinned beside `napi`'s, and the `PKGS` preflight's replacement still proves the lock's package set exactly matches what the manifests declare** (`command-sites-and-residue.md §4`).

**`crate-type = ["cdylib", "rlib"]` IS UNMOVED, and the `rlib` half is LOAD-BEARING.** It is what lets this crate's own Rust tests link the conversion core and drive it **with no Node runtime present**. Verified: the dual type works with the library adopted; both artefacts are emitted. **THIS CLAUSE IS UNMOVED BY THE RULING TOO**, and the probe re-confirmed the dual type under the three-entry table. `[CONTRACT]`

---

## §2. WHAT THE LIBRARY REPLACES

**Everything below is in `bindings/js/src/facade.rs` and nothing below touches `bindings/js/src/crossing.rs`.**

| Deleted | Replaced by |
| --- | --- |
| the `extern "C"` block declaring the Node-API symbols | the library's bindings |
| the four type aliases (`*mut c_void` × 3, `i32`) | the library's typed handles |
| the `unsafe fn`s and `unsafe` blocks that call the ABI | safe calls |
| `napi_register_module_v1` — the hand-built export table taking `exports` and calling `napi_create_function` per name | the library's registration |
| the five `export(env, exports, name, fn)` calls | annotations on the five entry functions |

**THE FIVE ENTRY FUNCTIONS KEEP THEIR NAMES AND ARITIES:** `version` · `errorMessage` · `storeCreate` · `call` · `register`. **Their argument counts are unmoved.** This unit does not split them — that is the surface unit's.

**AND ONE HELPER IS NOT DELETABLE: `throw_refusal`.** It is what produces the declared failure form out of an object rather than an `Error`. **The library's idiomatic error path would throw an `Error`; the escape hatch that throws a raw value is the one to use.** `§3` of `failure-form.md` states it as an obligation. `[CONTRACT]`

---

## §3. THE CORE'S PURITY — A CHECKABLE CLAUSE

**`bindings/js/src/crossing.rs` carries no `napi` type, no `#[napi]` attribute and no `unsafe`, at any depth.**

**THIS IS A CLAUSE AND NOT AN OBSERVATION.** The risk is specific: **`#[napi]` annotates ENTRY functions and their argument types, and it reaches the core only if an implementer puts it there.** The clause exists so that a later pass cannot move a `#[napi(object)]` struct into the core while the adoption still reads as complete.

**The instrument, stated with its SUBJECT — WHAT TEXT IS SEARCHED AND WHAT THE COUNT IS OVER — CORRECTED 2026-10-20 (`role_spec_writer`) BECAUSE THE CLAUSE AS FILED WAS UNSATISFIABLE.** The old form read *"search the file for `napi`, `#[napi` and `unsafe`. **Exactly one textual `napi` match is lawful** — the word inside its own header comment declaring the purity."* **AND THE DRIVE STRIPS COMMENTS FIRST, SO THE TWO TERMS MEET AT NO TREE: a comment-borne match is stripped and the count is `0`, and a `napi` surviving the strip is CODE and its count is `1`, which the clause then forbade. A clause and a drive that cannot both hold are not a check and no tree satisfies them.**

**THE CLAUSE'S OWN TWO HALVES, EACH WITH ITS SUBJECT NAMED:**

1. **IN THE STRIPPED CODE, THE COUNT IS ZERO.** **The searched text is `bindings/js/src/crossing.rs` AFTER RUST COMMENTS ARE STRIPPED** — line comments and block comments alike — **and over that text, the number of occurrences of `napi` is `0`.** **THE HONEST FORM IS *"ZERO OCCURRENCES IN STRIPPED CODE"***, and it is the whole of the code half of the intent: **no `napi` import, no `#[napi]` attribute, no `napi::` path reaches the core.** `#[napi]` and `unsafe` are searched over that same stripped text, at `0` likewise.
2. **IN THE UNSTRIPPED SOURCE, THE WORD MAY STAND IN THE HEADER COMMENT — AND ONLY THERE.** **The header may MENTION the word while declaring the purity**, and a mention is not a use. **The searched text for this half is the file AS IT LIES, and the permitted occurrence is ONE, inside `crossing.rs`'s own header comment.** **So the `1` counts a DECLARATION in a comment and the `0` counts USES in code; they are two counts over two texts and they are never one count over one text.** **The comment is PERMITTED and is NOT REQUIRED** — a header that declares the purity in other words has no `napi` byte at all and satisfies both halves.

**AND THE TWO HALVES ARE CHECKED BY THE SAME STRIPPER, WHICH IS WHY THEY AGREE WITH THE DRIVE.** The red set's `stripRustComments` (`bindings/js/test/addon-adoption.test.mjs:237`–`:240`) removes `/* … */` spans and truncates each line at `//`, and **its cells read the STRIPPED text once and then assert BOTH terms against it: zero `napi` occurrences is term `1`'s, and the header mention survives only as the stripped file's own count being `0` — a cell that counted `1` over stripped text would be asserting term `2` over the wrong text, which is exactly the defect this correction closes.** **`P-ADA-2` drives both terms.** `[CONTRACT]`

---

## §3-bis. THE ABI CENSUS — what the hand-declared boundary actually carries

**THE COUNTS ARE RE-DERIVED AT THE SOURCE'S OWN BYTES, ONE PER ROW, BECAUSE THE REPLACEMENT IS PRICED AGAINST THEM.**

| What | The figure |
| --- | --- |
| the Node-API symbols the `extern "C"` block declares | **`23`** |
| the type aliases beside them | **`4`** — three raw pointers and one integer |
| the helper functions declared `unsafe` | **`45`** |
| the `unsafe` blocks | **`50`** |
| the entry functions the boundary exports | **`5`** — `version`, `errorMessage`, `storeCreate`, `call`, `register` |
| the `export(…)` calls that build the table | **`5`** |
| the boundary file's line count | **`1692`** |

**AND THE `23` IS THIS CENSUS'S SUBJECT AND NOT AN EXPORT CLAIM — CORRECTED 2026-10-20 (`role_spec_writer`), BECAUSE THE CLAIM ONCE MADE AGAINST IT WAS UNACHIEVABLE.** The superset claim this row once carried — *"the rebuilt artefact must export every one of the `23` hand-declared symbols the boundary still reaches"* — **requires a Node-API addon to EXPORT the `napi_*` C-API symbols, and an addon IMPORTS them from the host: it can never export them.** **The observation that introduced it was TRUE and its remedy was not:** *"the `23` and the `5` are different sets, and a check written against the five would pass while a link symbol was missing"* remains true, and **it does not license a check against the `23`.** **The `23` stays here as the CENSUS the replacement is priced against (what was deleted), and the export claim is made at `§4` against the set it can honestly be made against.** `[CENSUS]`

---

## §4. THE BUILD IS VERIFIED BY ITS SYMBOLS

**A successful build is NOT the acceptance evidence.** The load path reads a rung-one throw as a **miss**, so an un-exported symbol degrades silently to the rung-two fall-through the entry removed — *"EVERY THROW AT RUNG ONE IS A MISS … a `MODULE_NOT_FOUND`, an `ERR_DLOPEN_FAILED` and any other throw alike."*

**So the artefact is opened and its exported symbol set read.** **AND WHAT THAT SET IS COMPARED AGAINST, CORRECTED 2026-10-20 (`role_spec_writer`): THE NAMES THE JS SIDE REACHES** — the entry names the package's own load path calls, `version` · `errorMessage` · `storeCreate` · `register` and the per-verb entries the surface unit declares. **The set must be a SUPERSET of those and not an equality**, because a build may lawfully export more than the entry reaches. **IT IS NOT COMPARED AGAINST THE `23` HAND-DECLARED `napi_*` SYMBOLS** — an addon **IMPORTS** those from the host and **CAN NEVER EXPORT THEM**, so that comparison is unachievable and was never a check. **THE `23` IS A CENSUS AND NOT AN EXPORT SET** (`§3-bis`).

**AND THE REAL RISKS ARE TWO, AND THEY ARE DIFFERENT — STATED SEPARATELY BECAUSE ONE `Object.keys` READ CANNOT SEE BOTH:**

1. **THE ARTEFACT MUST LOAD AND REGISTER.** The registration hook fires, so the entry finds a built module rather than a rung-one miss. **Instrument: the LOAD ITSELF, plus the registration the load performs** — the artefact is required and the loaded module's names are read. **This is the risk `Object.keys` observes, and it is the only one it observes.**
2. **A SYMBOL THE BOUNDARY *CALLS* MUST RESOLVE AT LINK TIME.** **THIS IS NOT OBSERVABLE VIA `Object.keys`** — **it is a LINK-TIME property of the built artefact, and no export-set comparison against the C-API list can reach it.** **The honest instrument is THE BUILD ITSELF SUCCEEDING, plus WHATEVER THE LOADER REPORTS**: an unresolved `napi_*` reference fails the link, or fails the dynamic load with the loader's own diagnostic, **before any export set exists to read.** **A build that succeeds and a load that answers are therefore this half's evidence, and they are stated as such rather than being dressed as a symbol comparison.** **CONDITION (iv) OF THE SPLITS ROW IS WHAT THIS SERVES.** `[CONTRACT]`

**AND THE VERSION CHECK IS NOT A SUBSTITUTE.** The load path compares only the version **string** the addon reports; the export set is orthogonal to it, so a build with a different export set can carry an identical version. **The symbol read is the check for risk `1`; it is no check at all for risk `2`.** `[CONTRACT]`

---

## §5. THE LINT LEG

**`cargo clippy` runs with `-D clippy::correctness`, and the leg is declared at `docs/specs/storeroom-js/acceptance.md:108` and `docs/specs/storeroom-native/implementation-plan.md:367`/`:407`.** It fails the trio if it fails.

**THE RISK IS SPECIFIC AND IS NOT THE USUAL ONE.** The adopted library's derive is a **proc-macro crate whose expansions are linted IN THIS CRATE'S CONTEXT**. A `-D` on a lint the macro's expansion trips turns the leg red for a reason that is neither this crate's code nor its defect.

**THE LEG IS RUN, AND ITS DEPENDENCY SCOPE IS DECLARED.** The instruction to the implementer is: **run the leg; if the macro expansion trips a `correctness` lint, declare the scope and name the lint — do not disable the `-D`.** `R: the SPLITS row`, condition (iii). `[CONTRACT]`

**AND THE RISK IS MEASURED NOT TO MATERIALISE UNDER THE THREE-ENTRY TABLE — ADDED 2026-10-21 (`role_spec_writer`), ON THE RULING THAT LIFTED `§1`.** **The probe ran the leg against the derive present and `cargo clippy -- -D clippy::correctness` EXITED `0`.** **SO NO SCOPE DECLARATION IS OWED, and the obligation above stands UNTRIGGERED rather than discharged by a waiver: it is what the implementer does IF an expansion trips a lint, and on this measurement none does.** **THE OBLIGATION IS NOT STRUCK — the leg is declared at two other units' clauses and a later library resolution may yet trip it — but the implementer owes no scope declaration on the strength of this measurement, and a cell asserting one exists would be asserting a scope the measurement empties.** **THIS IS ALSO WHY THE LIFT IS CHEAP: the one risk `§1`'s two-entry rule was implicitly guarding against — a third crate's expansion turning the trio red — is measured absent, so the amendment trades no green for the table it needs.**
