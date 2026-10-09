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

  **⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
  FINDING 2 (`archive/gate3/storeroom-js-red-set.md` §5 item 2) AT THIS ITEM.** `RCA-8(d)` ANNOTATE-BESIDE:
  **items 1–4 above stand byte-for-byte; THIS clause is the operative statement of the `rlib` half's own
  interface, and it is a PURE INSERTION.** **THE DEFECT IT CLOSES, NAMED: item 3 above says the `rlib` half
  *"makes the crossing's per-class table drivable in Rust **without a Node runtime**"* — the reason `V1` was
  chosen — while NO clause of this directory declared the core's own Rust interface: not its module path,
  not its JS-value model, not its conversion functions and not its returned-record types.** **AND THE WALK'S
  OWN RULES MAKE A JS-VALUE MODEL UNAVOIDABLE IN RUST:** `crossing.md §1.4` items 1–4 refuse on *"an own
  property whose key is a `Symbol`"*, on *"an array with a hole"*, on *"an own accessor property"* and on
  *"a `Proxy`"*, and the store's `StoreValue` cannot carry ANY of those four states.**
  **`§4.5` THEREFORE DECLARES THE CORE'S INTERFACE as a REQUIREMENT — not as a hint — so that the crossing
  is drivable in Rust with no Node runtime at all** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 —
  `V1`, the only variant in which the per-class table is drivable in Rust BEFORE any addon exists; A1
  docs/specs/storeroom-js-proposal-review.md §5.2 item 4 | requirement]`).

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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 3 (`archive/gate3/storeroom-js-red-set.md` §5 item 3): THE DECLARED COMMAND, SPELLED SO IT CANNOT
RESOLVE THE ROOT.** `RCA-8(d)` ANNOTATE-BESIDE: **item 4 above stands byte-for-byte — the `cd bindings/js`
form it declares is not withdrawn; THIS clause is the operative statement of the COMMAND, and it is a PURE
INSERTION.** **THE DEFECT IT CLOSES, MEASURED RATHER THAN ARGUED:** **`cd bindings/js && cargo test` finds NO
manifest in `bindings/js/` while the crate's `Cargo.toml` does not yet exist, so `cargo`'s UPWARD MANIFEST
SEARCH resolves the ROOT manifest and the command builds and runs `storeroom-native`'s suite — `exit 0`, the
store's own green, `0` of this unit's `219` Rust cells executed.** **The red-set record prints exactly that
run at `§3` of `archive/gate3/storeroom-js-red-set.md`.**
**THE DECLARED COMMAND, AND WHY THIS FORM RATHER THAN ANOTHER — ONE SITE, ONE FORM:**
```
cargo test  --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast
cargo build --manifest-path bindings/js/Cargo.toml --offline
```
  **(i) THE MANIFEST IS NAMED EXPLICITLY, AND THE PATH IS THE CRATE'S OWN (`bindings/js/Cargo.toml`), relative
  to THE REPOSITORY ROOT — so the command's SITE is `the repository root` and its LAYER is
  `ENVELOPE/PURE`.** **A `--manifest-path` invocation is not a `cd`-and-hope: `cargo` is told WHICH package
  to build, and its upward search is never entered, so the command CANNOT run the store's package by
  accident.** **(ii) WHY NOT `-p <name>`:** **`-p` selects a package INSIDE a workspace, and this crate is
  NOT a workspace member (`§4.1` item 2), so a `-p` form would have no workspace to resolve within — and it
  would re-open the membership question `A68` settled.** **(iii) WHY THE MANIFEST PATH RATHER THAN A `cd`
  ALONE:** **the `cd` form is correct ONCE the manifest exists, and it is precisely the form that silently
  ran the wrong package while the manifest did not — so the explicit manifest is what makes the command
  SELF-DESCRIBING rather than dependent on a directory's current state.** **(iv) AND WHY NOT CREATE THE
  MANIFEST HERE:** **the crate's `Cargo.toml` is the IMPLEMENTER's `Q3` deliverable
  (`implementation-plan.md §2`); this pass writes no byte under `bindings/js/**`, and neither the manifest
  nor the `cd` form is created, moved or exercised by it.**
**AND THE ACCEPTANCE CONSEQUENCE, STATED BECAUSE A COMMAND IS ONLY A LEG IF IT MEASURES THE UNIT IT CLAIMS
TO: A LEG THAT SILENTLY RUNS THE WRONG PACKAGE IS NOT A LEG.** **A run whose executed-cell count belongs to
another package is not evidence about this unit, and the figure it prints may not be reported as this
unit's** — **so the Rust leg's report MUST name its SITE as the repository root, name the manifest it
resolved, and state the executed-cell count it actually executed, and a leg whose count belongs to the
store's suite is VOID and must be re-taken** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` —
every figure carries its site and its layer; A1 docs/specs/storeroom-js-proposal.md §11 · `A68`; `DD-19`;
`DD-33` | requirement]`). **AND ONE READING RULE BESIDE IT, SO THE TWO LEGS' SITES ARE NOT CONFUSED:** **the
JS leg's command is `node --test bindings/js/test/*.test.mjs`, taken at the same repository root, and its
SITE is the repository root while its LAYER is `ENVELOPE/PURE`** — **neither leg is run, and neither figure
is produced, by this pass** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` | numeric or
census claim]`).

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

### §4.5 THE CONVERSION CORE'S DECLARED RUST INTERFACE — the `rlib` half's own surface, and the reason `V1` was chosen

**THIS SECTION IS ADDED BY THE BOUNDED CORRECTION PASS OF 2026-10-11, CLOSING THE RED SET'S CONTRACT FINDING
2 (`archive/gate3/storeroom-js-red-set.md` §5 item 2), AND IT IS THE REQUIREMENT `§4.1` ITEM 3 AND `§4.4`
OWED.** `RCA-8(d)` ANNOTATE-BESIDE: **`§4.1` item 3, `§4.4`, `contract.md §3.4` item 3 and `acceptance.md §4.1`
item 2 all cite the *"PURE-RUST conversion core"* and its drivability *"without a Node runtime"*; THIS
section is where that core's own interface is DECLARED, and every clause of it is a PURE INSERTION beside
the as-filed text.** **AND THE NAMES BELOW ARE NOT A SECOND DESIGN:** **the red set PINS this interface in
its own harness and shows it MAKEABLE GREEN by a scratch core
(`bindings/js/tests/support/mod.rs`'s header), so the declaration below is the contract's own statement of
the interface the red set was authored against — and it is a REQUIREMENT, never a hint.**

**1. THE MODULE BOUNDARY, AND ITS PURITY.** **The conversion core is the SIBLING CRATE'S OWN MODULE
`storeroom_js_binding::crossing`, reachable from the crate root `storeroom_js_binding` through the `rlib`
target `§4.1` item 3 declares.** **IT IS PURE RUST: no `napi` type, no `napi-rs` macro, no `#[napi]`
attribute and no Node-API symbol appears in it, at any depth** (`DD-2`). **The `#[napi]` export facade of
`§4.4` and this module are the SAME crate's two halves, and the facade's methods are thin: each validates
nothing, converts through the core and returns the core's result translated to a Node-API value.**

**2. THE JS-VALUE MODEL — REQUIRED, BECAUSE THE WALK'S OWN RULES CANNOT BE CARRIED BY `StoreValue`.** **The
model is a closed set of Rust types carrying EXACTLY the states `crossing.md §1.2`–`§1.4` names, and no
state the store can hold. The DECLARED minimum:**

| The declared type | Its variants / members, exactly as the crossing tables require |
| --- | --- |
| **`JsSegment`** | **`Key(String)`** (the string segment of `crossing.md §1.3`'s `AddressArg` row 2, **including `''`**) · **`Index(u64)`** (row 3) · **and the outside-segment classes the walk refuses:** **`Negative(i64)`** (row 7) · **`Fractional(f64)`** (row 8, carrying `1.5`, `NaN` and `±Infinity`) · **`Null`** · **`Undefined`** (row 9) · **`Bool(bool)`** · **`Object`** · **`Array`** · **`Function`** (row 10) — **`10` REFUSED classes beside the `2` admitted ones** (`crossing.md §1.6`: *"`10` outside segment classes"*) |
| **`JsKey`** | **`Key(String)`** · **`Symbol`** — the own-key test of `crossing.md §1.4` item 1 and item 4 (d) |
| **`JsProto`** | **`Plain`** (a plain-object prototype, realm-agnostic) · **`Null`** (**`Object.create(null)`, ACCEPTED** — item 4 (e)) · **`Class`** (a class instance, REFUSED — item 4 (f)) |
| **`JsObject`** | **`members: Vec<(JsKey, JsValue)>`** · **`proto: JsProto`** · **`has_accessor: bool`** (item 4 (c) — *"no own accessor property"*) · **`proxied: bool`** (item 4 (g) and `DD-34`) |
| **`JsValue`** | **`Str(String)`** · **`Bool(bool)`** · **`Num(f64)`** (keeping `-0`'s sign for `crossing.md §1.5` clause 3) · **`Object(JsObject)`** · **`Array(Vec<JsValue>)`** · **`Null`** · **`Undefined`** · **`Function`** · **`Symbol`** · **`BigInt(i64)`** · **`NonFinite(f64)`** · **`Cyclic`** · **`NonPlainCollection`** · **`SparseArray`** — **the `5` admitted classes of `crossing.md §1.2` rows 1–5 and the `8` outside classes of rows 6–13, plus the sparse-array carrier `crossing.md §1.4` item 2 refuses; `13 + 1 = 14` variants, and the `+1` is the hole's own carrier, not a fourteenth outside class** |
| **the `8` carrier types** | **`JsAddressArg`** (row 1's `List(Vec<JsSegment>)`; rows 4–6's `Absent`, `Null`, `Undefined`, `NonArray(JsNonArray)` with `JsNonArray` = `Number(f64)` · `Str(String)` · `Bool(bool)` · `Object` · `Function`; row 11's `ClassArrayLike`; row 12's `Proxy`; row 13's `CrossRealmList(Vec<JsSegment>)`; row 14's `Sparse`) · **`JsTierArg`** (`Absent` · `Token(String)` · `Set(Vec<JsTierSetItem>)` · `Null` · `Undefined` · `Object` · `Function` · `Number(f64)` · `Bool(bool)`) · **`JsTierSetItem`** (`Token(String)` · `Null` · `Undefined` · `Number(f64)` · `Bool(bool)` · `Object` · `Function`) · **`JsOpIdArg`** (`Id(String)` · `Absent` · `Null` · `Undefined` · `NonString(i64)`) · **`JsFilePathArg`** (`Path(String)` · `Absent` · `Null` · `Undefined` · `Empty` · `NonString`) · **`JsJournalLengthArg`** (`Count(u32)` · `Absent` · `Zero` · `Negative(i64)` · `Fractional(f64)` · `NaN` · `Infinity` · `NonNumberString(String)` · `NonNumberBool(bool)` · `Null` · `Undefined` · `Object`) · **`JsListenersArg`** (`List(Vec<JsListenerEntry>)` · `Absent` · `Null` · `Undefined` · `NonArray`) · **`JsHandle`** / **`JsHandleArg`** (the opaque handle OUT; the bare-string and outside forms IN) — **each carrier's variant count being EXACTLY the variant-row count `crossing.md §1.6` prints for it**
| **`JsListenerEntry`** | **`Entry { address: JsAddressArg, handle: String }`** (`ListenersArg` rows 1 and 4) · **`Other`** (row 2) |
| **`JsConfig`** | **`file_path: Option<JsFilePathArg>`** · **`journal_length: Option<JsJournalLengthArg>`** · **`listeners: Option<JsListenersArg>`** · **`fourth_key: Option<String>`** (read at `§0.2`'s `DD-36`'s fourth-key cell and refused) — **`Option` here is the ABSENT-versus-present carrier of `crossing.md §1.3`'s absent-versus-`undefined` rule, where `None` IS the key's absence** |

**3. THE CONVERSION FUNCTIONS — ONE ENTRY PER CARRIER AND ONE PER DIRECTION.** **The core exposes EXACTLY
these public functions, and each returns the SAME refusal type:**
```
fn to_store_value(v: &JsValue)        -> Result<StoreValue, Refusal>
fn from_store_value(v: &StoreValue)   -> Result<JsValue, Refusal>
fn create(cfg: &JsConfig)             -> Result<Instance, Refusal>
fn to_segment(s: &JsSegment)          -> Segment
fn to_address_arg(a: &JsAddressArg)   -> AddressArg
fn to_tier_arg(t: &JsTierArg)         -> TierArg
fn to_tier_set_item(i: &JsTierSetItem) -> TierSetItem
fn to_op_id_arg(o: &JsOpIdArg)        -> OpIdArg
fn to_file_path_arg(p: &JsFilePathArg) -> FilePathArg
fn to_journal_length_arg(l: &JsJournalLengthArg) -> JournalLengthArg
fn to_listeners_arg(l: &JsListenersArg) -> ListenersArg
fn to_config(c: &JsConfig)            -> StoreConfig
```
  **(a) THE SEGMENT AND CARRIER CONVERTERS ARE TOTAL AND INJECTIVE WHERE THE TABLE SAYS SO:** **`to_segment`
  maps `Key`/`Index` onto the store's own `Segment` and carries EVERY outside class onto the store's own
  `Segment` outside variants — it does NOT refuse and it mints no code — because `DD-1` binds each carrier's
  outside variants AS VALUES and lets the STORE produce the refusal when a verb is called with them.**
  **(b) THE WALK AND THE VERB ENTRY POINTS RETURN THE REFUSAL:** **`create` and `to_store_value` are the two
  entries that can answer a code of the store's own closed `15`-member set, and `from_store_value` answers
  only what the store's own translation out can answer.** **Every converter's answer is one of the DECLARED
  answers of the row the value belongs to — no converter invents a code, and no converter returns a
  carrier's outside value as a success where its row declares a refusal.**
  **(c) `to_store_value` APPLIES `crossing.md §1.4` IN FULL:** **the plain-object test's items (a)–(g), the
  `Symbol`-keyed own property, the hole, the accessor, the `Proxy`, the ancestor-stack cycle guard with the
  ADMITTED diamond, and the declared depth-`64` / node-`1,000,000` ceiling** (`DD-7`–`DD-11`, `DD-34`,
  `DD-35`).

**4. THE RECORD TYPES — THE DEEP COPY OUT, MEMBER FOR MEMBER.** **The core returns fresh records whose
members are the store's own spellings of `§0.2`'s `DD-39`:**
```
struct Refusal                 { status: String, message: String }               // EXACTLY two members, no third
struct JsBaseState             { present: bool, value: JsValue }
struct JsJournalOp             { opId: String, kind: JournalOpKind, address: Vec<JsSegment>,
                                 tier: Option<String>, before: JsBaseState, after: JsBaseState,
                                 seq: u64, compacted: bool }
enum   JsJournalOpKind         { Write, Delete }
struct JsWriteResult           { op: JsJournalOp, watched: Vec<Vec<JsSegment>>, triggered: Vec<JsHandle> }
struct JsDeleteReceipt         { address: Vec<JsSegment>, tiers: Vec<String>, triggered: Vec<JsHandle> }
struct JsRollbackResult        { opId: String, undoneOps: Vec<String>, restoredTo: JsBaseState }
```
  **`Refusal` IS `§2.5`'s SINGLE FAILURE FORM AT THE CORE LAYER — a record with EXACTLY `{status, message}`
  and not one member beside them — and it is the ONLY error type the core exposes.** **A `status` outside
  the store's closed `15`-member set is carried VERBATIM and re-mapped to nothing** (`DD-40`).

**5. THE INSTANCE, ITS VERBS AND THE PACKAGE-OWNED REGISTRY'S HOME.** **`Instance` is the core's own type,
holding ONE store instance and the PACKAGE-OWNED registry of `§2.4`; the core never invokes a listener of
its own accord, and the facade reads the registry's answer and performs the invocation after the verb
returns (`§2.7`).** **Its declared methods are the crossing's own verbs, and their signatures are:**
```
impl Instance {
  fn read(&self, a: &JsAddressArg, t: &JsTierArg)        -> Result<JsValue, Refusal>
  fn read_literal(&self, a: &JsAddressArg, t: &JsTierArg) -> Result<JsValue, Refusal>
  fn write(&mut self, a: &JsAddressArg, t: &JsTierArg, v: &JsValue) -> Result<JsWriteResult, Refusal>
  fn delete(&mut self, a: &JsAddressArg, t: &JsTierArg)  -> Result<JsDeleteReceipt, Refusal>
  fn rollback(&mut self, o: &JsOpIdArg)                  -> Result<JsRollbackResult, Refusal>
  fn listen(&mut self, a: &JsAddressArg)                 -> Result<JsHandle, Refusal>
  fn unlisten(&mut self, h: &JsHandleArg)                -> Result<(), Refusal>
  fn register(&mut self, h: &JsHandleArg, listener: JsListener) -> Result<(), Refusal>
  fn triggered_set(&self, r: &JsWriteResult)             -> Vec<JsHandle>
}
```
  **(a) `register` IS `contract.md §2.4` ITEM 5'S SITE AT THE CORE LAYER, and its answer is that item's
  answer: an outside `handle` or a non-function `listener` is a REFUSAL whose `status` is NOT a store code**
  — **so the facade translates it to the JS `TypeError` that item (d) declares, and the core carries no
  `TypeError` of its own.** **(b) THE REGISTRY'S FOUR RULES HOLD HERE:** **`register` replaces, never fans
  out (rule 2); an unregistered handle's `triggered_set` membership fires nothing silently (rule 1); a
  duplicate token enters the set ONCE (rule 3); and `unlisten` removes the STORE-side home entry while the
  registry entry STANDS (rule 4).** **(c) `triggered_set` IS THE SET, AS A SET:** **its ORDER IS NOT A
  DECLARED ORDER and no drive may assert one** (`§2.7` item 3, `DD-22`).

**6. HOW THE JS-FACING TYPES RELATE TO THE CORE — THE EDGE, STATED SO NO SECOND DEFINITION ARISES.** **The
Node-API facade declares NO JS-shaped type of its own: every `Js*` type above is the core's, and the facade's
`#[napi]` methods CONVERT a Node-API value INTO the core's model and, on the way back, convert the core's
records into Node-API values.** **The one-for-one map is `crossing.md §1.3`'s own:** **each `Js*` carrier
type is the core-side spelling of the JS argument form its table row prints, and each conversion function is
the edge between that spelling and the STORE's own argument type.** **The record types' member names are the
store's own (`DD-39`), so the JS side observes exactly `crossing.md §1.3`'s returned-record spellings.** **NO
other edge exists between a JS value and a store value, in either direction.**

**7. THE ACCEPTANCE CLAUSE THIS DECLARATION MAKES TRUE — A REQUIREMENT, CHECKED RATHER THAN ASSUMED.** **The
conversion core MUST compile and its tests MUST run through the crate's own `rlib` at the declared module
path, WITH NO ADDON AND NO NODE RUNTIME PRESENT, under the command `§4.2` item 4 declares — with the manifest
named explicitly, as that item's dated clause requires.** **A type, a function or an entry point the core
exposes and this section does not declare is a FINDING, because the red set was authored against the
declaration and its drives reference nothing else.** **AND THE CONVERSE, STATED SO THE DECLARATION IS NOT
READ AS PERMISSIVE: a crossing the contract names that this interface cannot carry is a CONTRACT FINDING at
`contract.md §8` and never an inline widening of this section** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`'s architectural ground; A1
docs/specs/storeroom-js-proposal-review.md §5.2 item 4 — the store's surface cited and never amended; `DD-2`;
`DD-19` | requirement]`).

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
`§4.1`–`§4.5` and `§5.1` are THIS PART's own sub-numbering of the contract's `§3.1`–`§3.5` span**, and **a
citation to any of them names this part's path plus the `§`-number**, because *a bare `§n` across two
documents is not an edge* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).
**⟶ AND ONE ROW OF THAT SPAN IS NEW, NAMED HERE SO THE NUMBERING NOTE IS TRUE AFTER THIS PASS TOO: `§4.5` —
THE CONVERSION CORE'S DECLARED RUST INTERFACE — WAS ADDED BY THE BOUNDED CORRECTION PASS OF 2026-10-11, and
it is the ONE sub-number this part gains; `§4.4`'s own text and every other sub-number stand unmoved**
(`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed note above is re-emitted by reference and read THROUGH this
sentence; `§4.1`–`§4.4` stand byte-for-byte**).
