# `package` — the claimed realm, the `HO-` handoff rows, the prebuild and publish story, the sibling crate's layout and the ownership clause

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§3` (`§3.1`–`§3.5`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **A citation to it names THIS part's path
plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The relocation is SPAN-BY-SPAN
and BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it
required as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

**AND THIS PART IS WHERE THE DOSSIER'S ONE CLAUSE CELL RESOLVES.** The dossier's row is keyed `Node-API` /
`napi` and its clause cell reads `decision <the ACTIVE row naming A1·A72> — awaiting spec`; **the third legal
value `spec §n` is reached HERE, at `§1.1` and `§4.1`**, and the resolution map is the contract's `§0.3`
(`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi | cross-reference]`).

---

## §1. The package — the claimed realm, the handoffs, the publish story and the sibling crate

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/package.md` (`§1`–`§6` of this document, relocated WHOLE)**, the `carrier` part this
directory's map declares for it (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 |
requirement]`).

### §1.1 The claimed realm — Node ESM, alone

**THE ARCHITECT'S RULING, VERBATIM: *"Node ESM"*** (`docs/specs/storeroom-js-proposal.md` `§15` · `A70`).
**THE CLAIM, STATED SO IT CAN BE FALSIFIED:** **a consumer `import`s the package as an ES module from a Node
runtime whose ABI carries a Node-API addon, at a version at or above the floor this contract declares
(`DD-38`); the package reaches the addon INTERNALLY** — an addon being a CJS artefact, that internal reach is
the package's own `createRequire`-style step and **is NOT a second claimed realm** (`DD-4`).
**AND THE CARRIER'S OWN NAME IS THE ONE TOKEN THIS UNIT ADOPTS FROM OUTSIDE THIS PROJECT:** **`Node-API` /
`napi` is a STANDARD'S name**, it is the carrier this clause claims, and **its dossier row stands `defined`
with its clause supplied at `§0.3`** (`[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi |
cross-reference]`).

### §1.2 The internal reach, stated so it is not a second realm

1. **THE ADDON IS A CJS ARTEFACT AND THE ESM ENTRY REACHES IT THROUGH THE PACKAGE'S OWN INTERNAL STEP**
   (`DD-4`). **There is exactly ONE `.node` load per instance construction, at exactly one path, and the
   path is a file the `exports` map does not expose.**
2. **THE STEP IS NOT DOCUMENTED AS AN ENTRY POINT.** **A consumer that spells the addon's path directly is
   outside every clause of this contract**, and **a consumer that reaches the package through the ESM entry
   observes only the surface of `surface.md §2`.**
3. **NO SUBPROCESS, NO SECOND SHARED LIBRARY AND NO WASM MODULE IS LOADED AT ANY POINT TO REACH THE STORE**
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — *"the package reaches the addon internally (an
   addon being a CJS artefact, that is its own internal `createRequire`/interop step, not a second claimed
   realm)"* | requirement]`).

### §1.3 The one entry, and the `exports` map

1. **THE `exports` MAP PUBLISHES EXACTLY ONE ARMS-BEARING ENTRY — the ESM one** — **and every other subpath
   a consumer could spell is either absent or an internal file the map does not expose** (`DD-24`).
2. **A WILDCARD `"./*"` EXPORT IS REFUSED**, because it would expose the `.node` path; **a deep import is
   refused for the same reason.**
3. **THE ENTRY'S OWN SHAPE, STATED SO THE CLAIM IS CHECKABLE:** **`import`ing the entry yields a namespace
   or default whose NAMED EXPORTS are exactly the verbs of `surface.md §2` and the package's own instance
   handle factory — and NOTHING ELSE.**
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A70; A1 docs/specs/storeroom-js-proposal-review.md §5.4 —
   `AR-17`'s narrowed matrix, one claimed entry | requirement]`)

### §1.4 The engine floor, and what it is not

1. **THE PACKAGE DECLARES `"engines": { "node": ">=18.0.0" }`** (`DD-38`). **The floor is a DECLARATION and
   not a measurement this pass took.**
2. **THE PACKAGE DECLARES NO Node-API VERSION FLOOR OF ITS OWN AND NO ABI ASSERTION** (`DD-28`): **the addon
   is built against the Node-API version the sibling crate's build target declares, and the documentation
   states the floor as the sibling crate's build target rather than as a JS-side constraint.**
3. **A RUNTIME ABI CHECK IN THE PACKAGE'S OWN LOAD PATH IS REFUSED** — it would need a failure form the
   single form of `surface.md §2.5` does not admit, for a state the addon's own loader already reports
   (`DD-28`'s `alt`).
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A71's neighbourhood — the packaging facts this unit's own
   to declare; A3 docs/specs/storeroom-native/contract.md §7.1 | declared parameter semantics]`)

### §1.5 The realm claim's negative half, in one line

**THE PACKAGE CLAIMS `{ Node ESM }` AND PROMISES NO OTHER REALM.** **Every unclaimed realm's declared
answer is `§2`'s table, and no clause of this package's documentation may describe an unclaimed realm as
supported.** (`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 | prohibition]`)

---

## §2. Every other realm is UNCLAIMED, and each owes its declared answer

**THE REALM SET IS CLOSED AT ONE MEMBER, AND THE UNCLAIMED SET IS ENUMERATED RATHER THAN LEFT TO A READER'S
JUDGEMENT.** **Each row below is a `HO-` HANDOFF ROW with its own declared answer and its own positive
revisit condition; the row ids are minted here as `HO-1`…`HO-7` (`DD-41`), and the tracker rows the duties
land in are written by the TRACKER gate and not by this pass.**

| HO | The unclaimed realm | Why it is unclaimed, at the carrier's own terms | Its declared answer (what THIS unit does) | Its positive revisit condition |
| --- | --- | --- | --- | --- |
| **`HO-1`** | **Node CJS** — a consumer that spells `require('…')` | the carrier reaches JS through an addon that IS a CJS artefact, but `A70` claimed the ESM entry alone; a CJS consumer would need a second published arm | **the package publishes NO CJS arm and NO `require` entry** (`DD-24`, `DD-4`); a CJS consumer is served by the consumer's own ESM interop, which is the consumer's side of the boundary | a fresh ruling that claims CJS, followed by a bounded amendment |
| **`HO-2`** | **Electron `main`** — where the process's ABI matches the addon's | Electron carries its own ABI, so an addon built for Node's ABI is not guaranteed to load | **no Electron-specific rebuild, config or note is shipped in the first cut**; **the ABI question is the CONSUMER's host-configuration duty** | a fresh ruling that claims Electron `main`, followed by a bounded amendment |
| **`HO-3`** | **Electron `preload`** | same ABI question as `HO-2`, with a narrower surface | **as `HO-2`** | as `HO-2` |
| **`HO-4`** | **Electron `renderer`** | a renderer with `nodeIntegration` off **cannot load a `.node` at all**; the only route is `preload` + IPC | **nothing is shipped and nothing is promised**; a renderer consumer must go through the consumer's own main process | a fresh ruling that claims a renderer route, followed by a bounded amendment |
| **`HO-5`** | **the browser** — a browser ESM bundle or a browser worker | a bundler **cannot resolve a platform binary**, and tree-shaking cannot help | **nothing is shipped and nothing is promised**; **the promise would be false by construction** | a fresh ruling, which would need a carrier other than a Node-API addon |
| **`HO-6`** | **workers** — `worker_threads` and browser workers | `worker_threads` can load the addon where the ABI matches; a browser worker cannot | **no worker-specific entry, no transferable-value plan and no shared-memory clause is declared**; a `worker_threads` consumer uses the same ESM entry, at its own risk and its own ABI | a fresh ruling that claims a worker realm, followed by a bounded amendment |
| **`HO-7`** | **any IPC route** — a channel that carries store values between processes or realms | **it is A SECOND CROSSING**: every value would be serialized by the channel, so the deep-copy discipline would be re-stated in a second dialect, **functions cannot cross**, and the registry would have to live behind a channel-id dispatch with its own failure channel for a vanished channel and its own ordering rules | **this unit ships no bridge, no channel protocol and no serialized value form**; **the row names the crossing as ANOTHER UNIT'S work** | a fresh ruling, followed by a unit that can own a second serialization contract |

(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed realm; A1
docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`'s closed realm set and its one-declared-answer rule |
requirement]`)

**ARITHMETIC, PRINTED WITH ITS TERMS: `7` rows = `6` unclaimed realms (`HO-1`…`HO-6`) + `1` route (`HO-7`) —
`6 + 1 = 7` ✓.** **AND ONE CONSEQUENCE STATED SO THE ROWS ARE NOT READ AS TASKS: a `HO-` duty discharged as a
patch is a FAILURE of this unit's own stop conditions, and this unit dispatches no implementer into any
consumer** (`[A1 docs/specs/storeroom-js-proposal.md §9 · A2 — *"integration into Provident-Electron will be
delegated to that project's agents"* | prohibition]`).

---

## §3. The publish story — prebuilds, the matrix, and the licence

### §3.1 The ruling, and the registry identity

1. **THE ARCHITECT'S RULING, VERBATIM: *"Publish with prebuilds"*** (`docs/specs/storeroom-js-proposal.md`
   `§15` · `A71`). **A PUBLISHED ARTEFACT WITH PREBUILDS IS IN SCOPE: a registry identity, a per-platform/arch
   prebuild matrix, the CI that produces it and a hosting decision for the binaries are THIS UNIT'S.**
2. **THE PACKAGE'S REGISTRY IDENTITY IS `@provident-storeroom/js`**, and **the sibling crate's
   `[package] name` is `storeroom-js-binding` with the crate id `storeroom_js_binding`** — **a RENAME is a
   `package.json` edit and a citation sweep and NOT a behaviour change** (`DD-26`).
3. **A NAME COLLIDING WITH THE STORE'S OWN CRATE IS REFUSED**: the store keeps `storeroom-native` /
   `storeroom_native`, and this unit reaches it **only** through the path dependency of `§4.2`.
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A71 | requirement]`)

### §3.2 The prebuild matrix

**THE MATRIX IS `5` TARGETS, AND EVERY TARGET IS A DELIVERABLE RATHER THAN AN OPTION:**
`linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64`.
**THEY ARE PRODUCED BY CI ON EACH RELEASE TAG (`§3.3`) AND HOSTED AS THE REGISTRY'S OWN PER-TARGET
OPTIONAL-DEPENDENCY ARTEFACTS** — **a further target (`armv7`, `wasm32`, `freebsd`) is a bounded amendment
and not a build flag** (`DD-25`).
**AND THE ONE CONSTRAINT THAT MAKES THE MATRIX REVIEWABLE:** **NO BINARY IS EVER COMMITTED TO THE TRACKED
TREE.** **The artefacts are BUILT AND PUBLISHED, never stored in the tree** — `archive/` is gitignored and
`/target` is ignored — **so this unit's tracked tree stays reviewable**
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A71 — *"nothing in the repository commits a binary"* |
prohibition]`).

### §3.3 The trigger, the version and the CI

1. **THE MATRIX IS PRODUCED ON A RELEASE TAG OF THE FORM `v<major>.<minor>.<patch>`; the package's
   `version` is that tag's; and NO publication happens from an untagged commit** (`DD-42`).
2. **THE CI'S DUTY IS THREE-FOLD AND NAMED: (i)** build the sibling crate for each of the `5` targets;
   **(ii)** run the sibling crate's own `cargo test` on at least the host target; **(iii)** publish the
   target artefacts and the JS package under the tag.
3. **THE BUILD IS REPRODUCIBLE PER TARGET, AND THE CONSUMER'S REQUIREMENT IS DECLARED RATHER THAN
   DISCOVERED:** **a consumer that installs on a target the matrix covers needs NO Rust toolchain; a
   consumer on a target the matrix does not cover needs one, and that requirement is printed in the
   package's own documentation** (`DD-25`'s `alt` prices the alternative).
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-16`'s re-substantiated builder path, and
   `AR-10`'s figure-with-its-layer rule | requirement]`)

### §3.4 The licence

1. **`AGPL-3.0` IS THE DISTRIBUTION'S DECLARED FACT** — declared in the package's `package.json` `license`
   field, in `bindings/js/README.md`, and here (`DD-43`). **It is the repository's own `LICENSE` and no
   clause of this unit changes it.**
2. **THE LICENCE FILE ITSELF IS NOT COPIED INTO THE SIBLING CRATE** (`DD-43`): **the registry artefact
   carries its own copy, and a second, drifting copy inside the crate is what the refusal exists to
   prevent.**
   (`[A1 docs/specs/storeroom-js-proposal.md §9.3 · `D9` — *"note the licence (AGPL-3.0 per `LICENSE`) as a
   distribution fact"*; A1 docs/specs/storeroom-js-proposal.md §15 · A71 | declared parameter semantics]`)

---

## §4. The sibling crate's layout — an independent crate, never a workspace member

### §4.1 The layout, ruled

1. **THE ARCHITECT'S RULING, VERBATIM: *"Confirm"*** (`docs/specs/storeroom-js-proposal.md` `§11` · `A68`).
   **THE LAYOUT: an INDEPENDENT SIBLING CRATE at `bindings/js/`, with its own `Cargo.toml`, its own
   dependencies, `crate-type = ["cdylib", "rlib"]`, and ONE path dependency on the store:
   `storeroom-native = { path = "../.." }`.**
2. **IT IS NOT A WORKSPACE MEMBER.** **A root `cargo test` therefore keeps its single-package meaning, and
   the store's manifest, its `src/**`, its `tests/**` and its measured green are NOT TOUCHED**
   (`DD-19`; the store's own plan cell *"NOT DONE IF … a second crate, a workspace member or a red set
   outside `tests/**`"* is not contradicted).
3. **`crate-type = ["cdylib", "rlib"]`, AND THE `rlib` HALF IS LOAD-BEARING.** **A `cdylib`-only crate cannot
   be linked by its own Rust integration tests**, so the `rlib` half is what makes the crossing's per-class
   table drivable in Rust **without a Node runtime** — **and it is the mechanical basis of the recommended
   variant `V1`** (a thin export facade over a PURE-RUST conversion core; `DD-2`).
4. **THE STORE'S PUBLIC SURFACE IS CITED AND NEVER AMENDED.** **This unit declares no store-side change; a
   clause it needs and the store's contract does not carry is a CONTRACT FINDING at `contract.md §8`, never
   an inline edit.**
   (`[A1 docs/specs/storeroom-js-proposal.md §11 · A68; A1 docs/specs/storeroom-js-proposal-review.md §5.2
   item 4 | requirement]`)

### §4.2 The crate's manifest facts

1. **THE SIBLING CRATE DECLARES `edition = "2021"`** (`DD-27`).
2. **ITS `Cargo.lock` IS NOT COMMITTED** — **it is a library, and pinning the store's transitive versions
   for every consumer is a consuming-application decision and not a library's** (`DD-27`).
3. **ITS DEPENDENCIES ARE PINNED BY THE CARET REQUIREMENT ITS OWN `Cargo.toml` STATES, AND IT HAS NO PATH
   BACK INTO THE STORE BEYOND THE SINGLE PATH DEPENDENCY** — **no second path dependency reaching into the
   store's `tests/**`, and no vendored copy of the store's sources** (`DD-27`).
4. **THE BINDING'S OWN BUILD AND TEST COMMAND IS DECLARED IN ITS OWN DIRECTORY'S TERMS:** `cargo test` and
   `cargo build` run **inside `bindings/js/`**, and **the store's root command is never used to build this
   crate** (`[A1 docs/specs/storeroom-js-proposal.md §11 · A68 — *"the binding's own build and test command
   is declared in its own directory's terms"* | requirement]`).

### §4.3 The builder path, named and evidenced

1. **THE EXPORT LAYER IS BUILT WITH A NODE-API BINDING LIBRARY OF THE `napi-rs` FAMILY** (`DD-2`), which
   generates the `.d.ts`, ships a build-script helper usable from `build.rs`, and **does not require the
   `napi` CLI that the toolchain probe found absent from `PATH`.**
2. **THE ABSENT CLI IS RESOLVED RATHER THAN LEFT AS A BLOCKER:** **it is the PACKAGING front end and not the
   COMPILER front end**; the compiler front end is `cargo`, which the probe found present, and **the network
   requirement of a dependency fetch is DECLARED rather than discovered** (`[A1
   docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-16`; A1 docs/specs/storeroom-js-proposal.md §9.3 ·
   `D2` and its `L-4` note | requirement]`).
3. **THE NAME `napi-rs` IS NOT WRITTEN AS A CONTRACT TERM**: **the contract spells the class — *"a Node-API
   binding library"* — and names the family only here, in a priced default's own cell**, so that **`A72`'s
   one-row dossier is not re-triggered by a second externally-sourced token** (`DD-2`; `[A4
   docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi — and its `§1.2` item 3 | cross-reference]`).

### §4.4 The recommended variant `V1`, carried

**`V1` — a thin export facade over a PURE-RUST CONVERSION CORE; the sibling crate with its path dependency;
a Node-API binding library for the export layer only; the package's own build-and-publish path; one `Store`
per instance; a package-owned registry; a thrown plain `{status, message}` — is the RECOMMENDED variant, on
an architectural ground rather than an aesthetic one: it is the ONLY variant in which the crossing's
per-class table, the equality relation and the record translations are drivable in Rust BEFORE any addon
exists, so the red set can be authored from the contract alone and reported before the implementation**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — step 3's `V1`, carried and re-priced | declared
parameter semantics]`). **THE RUNNER-UP AND THE REFUSED VARIANTS, NAMED SO THE RECOMMENDATION IS PRICED:**
**`V2` (conversion inline in the export methods) degrades red-before-green to red-before-ADDON**; **`V3`
(hand-written FFI) moves the conformance risk into hand-written unsafe code**; **`V4` (a child process) and
`V5` (a WASM build) are REFUSED on standing rulings — the carrier is `A1`'s and the layout is `A68`'s — and
not on preference.**

---

## §5. The ownership clause — one `Store` per instance, caller-owned, and no release verb

**THE ARCHITECT'S RULING, VERBATIM: *"Not needed"*** (`docs/specs/storeroom-js-proposal.md` `§15` · `A74`).
**ONE `Store` PER PACKAGE INSTANCE, CALLER-OWNED. THERE IS NO FINALIZER AND NO RELEASE VERB — neither
`dispose()` nor `close()`, at the package level or at the store level** — **and THE REASON IS DECLARED, not
implied: the store runs NO background work, holds NO OS handle beyond the path it was given (touched only by
a `file`-tier write) and COMMITS SYNCHRONOUSLY, so there is no in-flight state to flush and no async
resource whose abandonment could lose data. What is lost by dropping a wrapper is MEMORY AT PROCESS EXIT,
not a pending write** (`DD-17`).

**AND THE ONE HAZARD THIS CLAUSE DECLARES RATHER THAN DEFENDS:** **TWO INSTANCES OVER ONE `cfg.filePath` ARE
THE CALLER'S OWN HAZARD.** **Each boots (`crossing.md §1.3`'s `FilePathArg` reading), each commits
independently, and the second instance's `file`-tier write CLOBBERS the first's bytes** — **and because a
`delete` and a `rollback` perform no file I/O (`surface.md §2.8`), a fresh boot over an equal path re-loads
the LAST SUCCESSFUL `file` WRITE's bytes and no other state.** **The package neither refuses the second
instance nor warns on the first: the hazard is declared here and in the package's own documentation**
(`[A3 docs/specs/storeroom-native/contract.md §7.2 item 5–6 and §5.7's `P-TP-7` row | state or fail-state
declaration]`).

### §5.1 The release question, answered in the negative with its reason

1. **A PACKAGE-LEVEL `dispose()` IS REFUSED** (`DD-17`): it is a small surface addition with a declared
   no-op on a second call, **and the architect declined it, so adding it would re-decide a closed ruling.**
2. **A `FinalizationRegistry`-BASED RELEASE IS REFUSED** (`DD-17`): **the store commits synchronously, so
   there is nothing a finalizer could usefully do that dropping the reference does not already do.**
3. **A DROPPED WRAPPER'S FATE, STATED SO IT IS NOT DISCOVERED:** **its Rust memory is held to process exit
   and NOTHING IS FLUSHED, because there is nothing in flight** — **"dispose" is therefore not a missing
   verb but a declared no-op-shaped absence**
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-18`'s release rule; A1
   docs/specs/storeroom-js-proposal.md §15 · A74 | requirement]`).

---

**END OF THIS PART.** **It carries the contract's `§3` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the tables and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).

**AND ONE NUMBERING NOTE, SO A CITATION TO THIS PART RESOLVES:** **`§1.2`–`§1.5` and `§3.1`–`§3.4` and
`§4.1`–`§4.4` and `§5.1` are THIS PART's own sub-numbering of the contract's `§3.1`–`§3.5` span**, and **a
citation to any of them names this part's path plus the `§`-number**, because *a bare `§n` across two
documents is not an edge* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).
