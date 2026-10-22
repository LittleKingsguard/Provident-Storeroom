# Part — `command-sites-and-residue` (`U-STOREROOM-ADDON-ADOPTION`): the declared commands and the false comments

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-adoption/contract.md`. **REGENERATED 2026-10-18.** **AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING: *"Lift the dependency constraint, it doesn't apply to the rust side."*** **`§4`'s preflight input is re-noted for the THREE-entry table; NO SITE MOVED, no flag changed, and `§1`–`§2` are unmoved — the lift is about a manifest and this part is about commands.** **AMENDED AGAIN 2026-10-21 (`role_spec_writer`) ON THE SECOND DIRECTIVE, WHOSE TEXT IS VERBATIM: *"I have explicitly clarified that it was a hallucination based on a specific constraint that was only on the JS side."*** **`§3`'s old heading and its root-`Cargo.toml` bullet are MOVED OUT BYTE-EXACTLY TO THE ARCHIVE (`RCA-8(g)`) — the dependency prohibition they carried is retired while the ASYMMETRY THEY GOVERN STANDS; `§2`'s eleven sites still MOVE and still lose `--offline`.** **NO WHOLE-FILE REWRITE WAS TAKEN** (`DEF-2026-10-02`; `docs/decisions.md` · `A131`). **`A129` RETIRES THE `RCA-8(d)` ANNOTATE-BESIDE SPELLING CORPUS-WIDE, so this pass cites `A129`(3)'s classifying instrument and NOT `RCA-8(d)`.**
- **Scope boundary.** No manifest clause (`binding-crate-and-abi.md`), no teardown (`finalizer-and-teardown.md`).
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE RULING

**The binding crate fetches what it needs at build time; `--offline` leaves its declared commands and stays on the store's.**

**THE RULING IS AN EXTENSION OF A PRACTICE ALREADY IN THE CRATE:** the build script **already** fetches `node.lib` at build time behind an existence guard. **The ruling extends that from one artefact to the whole dependency set rather than introducing a new behaviour.** `R: the FETCHES ON BUILD row.`

**AND `--manifest-path` STAYS AT EVERY SITE.** It is **not a flag about the network.** It exists because a bare `cd bindings/js && cargo test` resolved **upward** to the root manifest and ran the store's suite while none of this crate's cells executed. **Dropping `--offline` and keeping `--manifest-path` preserves exactly what `--manifest-path` was written for** — the two halves of the command do different jobs, and the ruling distinguishes them. `[CONTRACT]`

---

## §2. THE ELEVEN SITES THAT MOVE

**Each site is stated with its file and its current command. Every one loses `--offline` and keeps `--manifest-path`.**

| # | Site | The command today |
| --- | --- | --- |
| 1 | `docs/specs/storeroom-js/package.md:503` — **THE DECLARED TEST FORM** | `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` |
| 2 | `docs/specs/storeroom-js/package.md:504` — **THE DECLARED BUILD FORM** | `cargo build --manifest-path bindings/js/Cargo.toml --offline` |
| 3 | `docs/specs/storeroom-js/acceptance.md:80` | the declared test command, quoted |
| 4 | `docs/specs/storeroom-js/acceptance.md:108` | `cargo clippy --manifest-path bindings/js/Cargo.toml --offline …` |
| 5 | root `package.json:11` — the `build` script's **SECOND** half | `cargo build --release --offline --manifest-path bindings/js/Cargo.toml` |
| 6 | `bindings/js/README.md:188` and `:234` | `cargo build --release --manifest-path bindings/js/Cargo.toml --offline` |
| 7 | `bindings/js/README.md:221` | the `cargo test` form |
| 8 | `.github/workflows/publish.yml:171` | the test leg |
| 9 | `.github/workflows/publish.yml:174` | the build leg |
| 10 | `scripts/publish.sh:192` | the artefact build |
| 11 | `docs/specs/storeroom-native/implementation-plan.md:367` and `:407` — **THE DECLARED TRIO'S NARROWED LEG**, two occurrences | `cargo clippy --manifest-path bindings/js/Cargo.toml --offline --tests -- -D clippy::correctness` |

**AND SITE 5 IS TWO COMMANDS IN ONE SCRIPT AND NOT ONE OCCURRENCE, STATED HERE SO A CELL DERIVED FROM THIS TABLE CANNOT MERGE THEM.** **Root `package.json:11` IS THE `build` SCRIPT — THE WHOLE SCRIPT IS ONE LINE, AND IT CARRIES TWO `cargo` commands joined by `&&`: ITS FIRST HALF IS `cargo build --offline --release` AND IS THE STORE'S AND IS UNMOVED — it does not appear in this table at all and is listed at `§3`; ITS SECOND HALF IS `cargo build --release --offline --manifest-path bindings/js/Cargo.toml` AND IS THE BINDING CRATE'S AND IS ROW 5 AND LOSES `--offline`.** **THE TWO HALVES ARE TWO COMMANDS — ONE MOVED, ONE UNMOVED — AND A READER THAT TREATS THE SCRIPT AS ONE OCCURRENCE HAS MERGED A MOVING COMMAND WITH A STANDING ONE.** **THE FIRST HALF KEEPS `--offline` AND DOES NOT CARRY `--manifest-path`, so a drive that requires `--manifest-path` OF EVERY `--offline` OCCURRENCE IN THIS LINE MUST SPLIT BY HALVES FIRST: the first half satisfies the standing rule at `§3` and the second satisfies this row.** `[CONTRACT]`

**AND EVERY SITE IN THIS TABLE IS AN OCCURRENCE THAT MUST STILL CARRY `--offline` WHEN THE DRIVE READS IT, WHICH IS THE ONLY READING UNDER WHICH THE ROW HAS A SUBJECT:** **a site is a MOVE and not a marker — a cell asserting the post-change state at a site whose occurrence is IDENTIFIED BY `--offline` ASSERTS OF AN OCCURRENCE THAT NO LONGER EXISTS, and a cell that finds none must FAIL rather than pass vacuously.** **THE DISCRIMINATOR IS THE COMMAND ITSELF — ITS FILE, ITS HALF AND ITS ARGUMENT BODY — AND NEVER THE FLAG THE ROW REMOVES.** `[NEGATIVE]`

**SITE 11 IS THE ONE A RULING'S OWN ENUMERATION MISSED.** It is a declared leg and not a copy: it keeps `--offline` after the ruling, so on a fresh runner it **fails exactly as the build would**, and a reader following that plan would run a command the ruling falsifies. **The two other copies of the same leg move with it.** `[CENSUS]`

---

## §3. THE COMMANDS THAT DO NOT MOVE

**The binding crate fetches; the store's declared commands carry `--offline`. THE ASYMMETRY IS THE RULING AND NOT AN OVERSIGHT** — a reader who finds the divergence must find this clause with it.

**⟶ 2026-10-21 — THE OLD "THE STORE IS DEPENDENCY-FREE AND OFFLINE" HEADING IS ARCHIVED** — see `archive/spec-history/2026-10-21-dependency-restriction-notes-move-out.md` §8 (`RCA-8(g)`). **THE STORE CRATE MAY CARRY A REGISTRY DEPENDENCY** — `serde`/`serde_json` are declared in the root manifest — **while the asymmetry itself STANDS and is UNMOVED:** the store's commands carry `--offline`, and the binding crate's fetch.

**WHAT `--offline` NOW MEANS AT THE STORE'S SITES, STATED SO THE UNMOVED LIST BELOW IS NOT READ AS A DEPENDENCY CLAIM: the store's declared commands keep `--offline` as their BUILD FORM, satisfied from the populated `CARGO_HOME` cache; a COLD store build must fetch once, exactly as the sibling crate's does.**

**THE STORE'S `--offline` IS A COMMAND PROPERTY AND NO LONGER A DEPENDENCY PROHIBITION — which is the one reading under which this heading's surviving half and the store crate's new `[dependencies]` table are one state and not a contradiction.** `[CONTRACT]`

**Unmoved, each keeping `--offline`:**
- **root `Cargo.toml`'s store build form** — the store's declared commands keep `--offline`, and the old dependency-free note is ARCHIVED — see `archive/spec-history/2026-10-21-dependency-restriction-notes-move-out.md` §9 (`RCA-8(g)`). **The store crate's `[dependencies]` table carries `serde` and `serde_json`; `--offline` remains a COMMAND property and is not a dependency prohibition.**
- the root `package.json:11` `build` script's **FIRST** half — `cargo build --offline --release`, **the store's build, THE OTHER HALF OF THE SAME SCRIPT `§2` ROW 5 IS THE SECOND HALF OF, and UNMOVED: it keeps `--offline` and carries no `--manifest-path`**;
- `scripts/publish.sh`'s store-suite and store-build legs;
- the store's root suite.

**AND THE STORE'S `--offline` IS NOT A POLICY ABOUT THE BINDING CRATE.** A policy restricting dependencies to control JS-side development version conflicts does not reach the Rust crate; the crate's own dependency clause **pins by caret requirement and prohibits PATH dependencies and vendored copies**, and says nothing against a registry dependency. `R: the FOUR CLAUSES row`, adjudication (3). **⟶ AND THE SAME GROUND IS WHAT THE ARCHITECT HAS NOW RULED, IN HIS OWN WORDS — EXTENDED 2026-10-21 (`role_spec_writer`): *"I have explicitly clarified that it was a hallucination based on a specific constraint that was only on the JS side."*** **THE SENTENCE ABOVE IS THE READING AND THE RULING IS ITS AUTHORITY: a JS-side constraint reaches NO Rust crate, this one included.** **IT WAS WRITTEN HERE ABOUT THE BINDING CRATE ONLY, AND THE RULING CARRIES IT TO THE STORE CRATE — which is why the store crate's `[dependencies]` table now carries registry entries and why the residue is at the STORE's manifest and not only at the sibling's.** **WHAT DOES NOT MOVE: the PATH-dependency and vendored-copy prohibition is the crate's own clause and is not this policy, so it is not lifted with it** (`binding-crate-and-abi.md §1`; `docs/decisions.md` · `A132`). `[CONTRACT]`

---

## §3-bis. THE `D-1` PREREQUISITE — the two declarations and their provenances, in `package.json`'s own terms

**`D-1` IS A PREREQUISITE OF THE ADOPTION AND NOT A LATER GATE'S ITEM, AND ITS ABSENCE IS AN EARLY FAILURE AND NOT A LATE CHOICE.** **The ruling assigns it to this unit**, and a regeneration pass dropped it; it is restored here from `archive/addon-surface-regen/2026-10-18/storeroom-addon-adoption/command-sites-and-residue.md §3`. `[CONTRACT]`

1. **THE ARTIFACT IS A WRITTEN STATEMENT, IN `bindings/js/package.json`'S OWN TERMS, OF TWO DECLARATIONS AND TWO PROVENANCES — WITH THE STAGING STEP'S COPY SOURCE NAMED.** **Three contents, each mandatory:** **(a) THE ADDON'S DECLARATION** — a build output beside the artefact, reached by NO `exports` condition, unstaged; **(b) THE PACKAGE'S `index.d.ts`** — **reached by the `types` condition and shipped by `files`; ITS PROVENANCE — tracked-and-hand-authored, or generated — IS THE *DEFERRED CHOICE* ITEM 2 NAMES AND IS NOT MANDATED HERE** (*corrected 2026-10-19, `role_spec_writer`: this cell once read **"TRACKED, HAND-AUTHORED"** as MANDATORY content, which the summary VOIDS — *"a regex — one publication cell asserting a banner's absence"* — while this same clause DEFERRED the generated-or-not choice; the two cannot both stand, and the deferral governs*); **(c) THE STAGING STEP'S COPY SOURCE**, named. `[CONTRACT]`

2. **THE CHOICE OF WHICH IS GENERATED IS DEFERRED AND THE ARTIFACT IS NOT.** **The deferral covers THE CHOICE ALONE**: if the statement requires a `package.json` edit, **the edit is this unit's work and not a later gate's.**

3. **WHY IT CANNOT WAIT, IN THE FAILURE'S OWN ORDER.** **The staging step copies from the tree** — root `package.json` declares a step that copies `['package.json','index.d.ts']` from `bindings/js/` into a staged `node_modules` — **so an UNTRACKED generated file is ABSENT at a clean checkout, and a COMMITTED generated file REINTRODUCES DRIFT.** **And the failure is EARLY: the golden and the greens both run AFTER the staging step, so a stage that copies a file which no longer exists FAILS BEFORE ANY CELL RUNS.**

4. **THE BYTES THE STATEMENT MUST AGREE WITH.** `bindings/js/package.json`'s `exports` map carries a `types` condition pointing at `./index.d.ts` and an `import` condition pointing at `./index.mjs`; its top-level `types` names the same file; its `files` allowlist carries four entries of which `index.d.ts` is one. **A STATEMENT NAMING A `types` TARGET THESE BYTES DO NOT CARRY IS A FINDING; AND SO IS ONE THAT NAMES A COPY SOURCE THE STAGING STEP DOES NOT READ.** `[CENSUS]`

5. **THE HONEST SPLIT OF THE GAIN, AND WHY THE GENERATED ROUTE IS BOUNDED RATHER THAN FORBIDDEN.** **The adopted crate can generate the ADDON's function declarations and can express its own struct types; it CANNOT generate the PACKAGE's hand-shaped surface.** That surface carries a **named type alias** and a **sixteen-member string union** ending in an intersection escape — **neither is a struct, and the library's object macro emits neither.** **So the package's declaration MAY stay hand-authored — and nothing forbids that either way, because the clause forbidding hand-authorship is VOID and the clause MANDATING it is VOID TOO** (*corrected 2026-10-19, `role_spec_writer`: this clause once concluded *"the package's declaration STAYS HAND-AUTHORED"*, which reads the VOID clause's inverse as law; what the VOID settles is that NEITHER provenance is commanded, and item 2's deferral is where the choice lives*). `R: the FOUR CLAUSES row.` `[CONTRACT]`

6. **THE TWO OPTIONS AND THEIR COSTS, NAMED SO THE DEFERRAL IS PRICED AND NOT EMPTY.** **(i)** the addon's generated declarations stay a build output nothing stages, and the package's declaration stays hand-authored — **cost: the drift class survives for the package surface**; **(ii)** the package's declaration becomes partly generated and staged — **cost: the staging step's copy source must move, and a publication test's banner regex fails on any generated part** — **and that regex tests a FABRICATED rule, so its failure is not a regression, but its DISPOSITION is owed.** **THE CHOICE IS `OWED` AND IT IS `OWED` AS A CHOICE: NEITHER OPTION IS MANDATED, and a `D-1` statement that declares the package's declaration's provenance without resting it on this deferral is a FINDING** (*added 2026-10-19, `role_spec_writer`*; see the contract's `§7`). **AND THIS `OWED` CARRIES ITS OWN TWO TERMS, ADDED 2026-10-19 (`role_spec_writer`) SO IT IS THE SAME FORM AS THE CONTRACT'S `§7` ENTRIES: OWNER `role_spec_writer`, and REVISIT CONDITION — the `D-1` statement is authored; its declaration of the package's declaration's provenance is the act that closes this choice, and the landing pass that writes it names which option it took.** `[DECLARED-DEFAULT]`

7. **AND THE ONE THING THE DEFERRAL MUST NOT DO: LEAVE THE STAGING STEP'S SOURCE UNNAMED.** **A `D-1` that states the two declarations and omits the copy source is INCOMPLETE, because the copy source is the byte the early failure turns on.** `[NEGATIVE]`

---

## §4. THE `PKGS` PREFLIGHT — REWRITTEN, NOT BYPASSED

**`scripts/publish.sh` derives an installed-base count from `Cargo.lock` and REFUSES THE RELEASE when it is not `1`.**

**ITS PURPOSE WAS TO PROVE THE TARBALL CARRIED NO SMUGGLED DEPENDENCY. AFTER THIS RULING, A COUNT OF `1` IS NO LONGER THE HONEST FORM OF THAT PROOF — it is a check whose subject has changed.**

**THE REPLACEMENT MUST PROVE THE SAME PROPERTY: the lock's package set EXACTLY MATCHES what the manifests declare** — **no package present in `Cargo.lock` that no `Cargo.toml` requires, and none required that the lock omits.**

**A CHECK RELAXED TO *"THE COUNT IS WHATEVER IT IS"* WOULD BE A WEAKENING AND IS NOT THIS RULING.** The replacement's shell form is the landing pass's to author; **this clause names the property it must keep.**

**AND THE PREFLIGHT GATES THIS UNIT'S OWN REPORT.** A green reported from a preflight that refuses the tree it just built is a **waiver and not a green**. `R: the SPLITS row`. `[CONTRACT]`

**AND THE 2026-10-21 LIFT CHANGES THIS PREFLIGHT'S INPUT AND NOT ITS PROPERTY — ADDED 2026-10-21 (`role_spec_writer`), ON THE ARCHITECT'S RULING *"Lift the dependency constraint, it doesn't apply to the rust side."*** **The table gains a third entry, so the lock's resolved package set gains `napi-derive` and its own closure, and the count this preflight reads moves again.** **THE PROPERTY ABOVE IS UNMOVED AND IS THE REASON IT SURVIVES THE LIFT UNCHANGED: it is stated over the SET and not over a number, so it already covers a three-entry table exactly as it covered a two-entry one.** **AND NOTHING HERE IS AMENDED BY THE LIFT beyond this record: the eleven sites at `§2` are the BINDING CRATE'S and move as they were, the store's at `§3` stay, and no site gains or loses a flag.** **A reader who finds the count of moved sites unaltered by a dependency amendment has found the distinction this item draws: the LIFT is about a MANIFEST, and THESE SITES are about COMMANDS.**

---

## §5. THE RESIDUE SITES

**A residue is a comment or a figure the ruling falsifies. Each is corrected by the pass that lands the change it describes.**

**`S-1`** — `bindings/js/Cargo.toml`'s *"no registry fetch at all"*. **False the moment the library lands.** Corrected to state that the crate fetches.

**`S-4`** — `bindings/js/src/facade.rs`'s header declaring the failure form carries **two** members and forbids a `stack`. **Both halves are wrong**: the form carries **three** (`status`, `message`, `log`), and the `stack` prohibition is **void** — it appears in no clause and is an artefact of a plain object having no stack. **Corrected to the three-member form, with the `stack` sentence removed.**

**`S-6`** — `bindings/js/src/crossing.rs` prints the store's closed status set as **`15`**; the operative size is **`16`**. **This is a source comment, so the fix is this unit's and its owner is `role_implementer`.** **Neither directory's prior residue table listed it**, which is why it is stated here with its own id.

**AND THE ONE SITE THAT IS NOT A RESIDUE: `S-3`** — the JS package spec's sentence about a dependency fetch being declared rather than discovered. **Whether it moves depends on the words it actually carries; the landing pass reads it and corrects it if it is falsified, and reports if it is not.** `[CONTRACT]`
