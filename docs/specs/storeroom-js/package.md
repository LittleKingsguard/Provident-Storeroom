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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE ABSENT/FAILED-ADDON
STATE `P-TP-7`'s `S-LOAD` ROW IS THE HOME FOR.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–3 above stand
byte-for-byte; THIS clause is a PURE INSERTION and it is this part's own statement of the load step's ONE
failure state, whose single failure FORM is declared at `contract.md §2.5` item 5 and whose terms are these.**

**4. THE LOAD STEP HAS EXACTLY TWO OUTCOMES, AND THE SECOND IS A DECLARED FAILURE — never a fallback and
   never a silent JS store.** **WHERE THE INTERNAL ADDON IS ABSENT, UNREADABLE, OR REFUSES TO LOAD, THE
   PACKAGE ANSWERS `contract.md §2.5`'s SINGLE FORM AND RETURNS NO INSTANCE:**
   `{ status: 'FilePathUnreachable', message: <the store's generator's string for that code at the ADDON
   ARTEFACT'S OWN PATH> }` — **the subject being the ignored path this part's item 1 declares the package's
   internal step loads and the very file whose absence or unloadability produced the state — and NOT
   `cfg.filePath`, which is the SEPARATE state `crossing.md §1.3`'s `FilePathArg` rows 4–6 declare at the
   store's own construction-time reachability probe.**
   **THE STATUS IS THE STORE'S OWN MEMBER TOKEN, CARRIED VERBATIM AND NOT MINTED HERE; THE MESSAGE'S HOME IS
   THE STORE'S OWN GENERATOR, REACHED THROUGH THE ADDON WHERE THE ADDON LOADED FAR ENOUGH TO CARRY IT; AND
   THE ONE CASE WHERE THE GENERATOR IS UNREACHABLE — the addon IS the artefact that failed to load, or it
   loaded and exposes no generator — IS CARRIED AT ONE DOCUMENTED SITE, a package-side constant in the
   package's own entry module holding that SAME STRING, so there is one string for the state on both arms
   and no second message authority.** **NO FALLBACK EXISTS: the package never falls back to a JavaScript
   store, never absorbs the state silently, never degrades to a partial instance or a no-op verb, and never
   substitutes a package-authored message, status or instance for it.** **AND BECAUSE THE ADDON IS REACHED
   BEFORE ANY VERB, EVERY VERB AND EVERY CONSTRUCTION IN THAT STATE ANSWERS THE SAME THROWN FORM.**
   **THE ROW THAT PINS THE STATE IS `P-TP-7`'s `S-LOAD`, whose drive is one `import` of the entry from
   outside the unit directory, resolving and loading exactly one Node-API addon — and this state is that
   row's FAILURE arm.** **`contract.md §2.5` item 5 is the declaration of record for the state, its status,
   its message's home and the no-fallback rule; this item is the LOAD PATH's own statement of where the
   state is reached, and `bindings/js/README.md` prints the same two outcomes for a consumer.**
   (`[A1 docs/specs/storeroom-js-proposal.md §17 · `A75` — *"an addon that is absent or fails to load is a
   DECLARED FAILURE and never a silent JS store (`V-3` was refused by this choice)"*; A3
   docs/specs/storeroom-native/contract.md §8.1 — `FilePathUnreachable` among the closed `15`; A3
   docs/specs/storeroom-native/contract.md §8.2 — the generator's row for it | state or fail-state
   declaration]`).

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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE INTERNAL ADDON'S OWN FIVE
NAMES, DECLARED SO `NOTHING ELSE` ABOVE HAS A NAMED SET TO BE TRUE OF.** `RCA-8(d)` ANNOTATE-BESIDE: **items
1–3 above stand byte-for-byte; THIS item is a PURE INSERTION, it adds no entry to the `exports` map and it
moves no named export of the entry.**

**4. THE INTERNAL ADDON'S EXPORT SET IS EXACTLY FIVE NAMES AND NO SIXTH: `version` · `errorMessage` ·
   `storeCreate` · `call` · `register`.** **Every one of the five is INTERNAL** — **none is a named export
   of the claimed ESM entry, and the internal artefact is reachable ONLY through the object the entry's own
   module-private key holds, so a consumer of the claimed entry cannot reach `version`, `call`,
   `errorMessage` or the addon's own `storeCreate`.** **Their duties, so the set is not read as an
   undeclared surface: `storeCreate` and `call` are the package's own boot and verb dispatch;
   `register` is the registry site's own judge (`surface.md §2.4` item 5); `errorMessage` reaches the
   store's GENERATOR from the JS side, whose one declared caller is the load state this part's `§1.2` item 4
   declares; and `version` exists so the artefact can be audited from itself.** **A SIXTH NAME IS A FINDING
   (`§4.5` item 7), and so is a name of the five reached from a consumer's own module graph.**
   (`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed entry is the ESM one; A1
   docs/specs/storeroom-js-proposal.md §17 · `A75`; A3 docs/specs/storeroom-js/package.md §1.2 item 1 — the
   reach is internal and its path is not exposed | requirement]`).

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

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE FIVE PLATFORM PACKAGES' ORG,
AND THE ONE THING THIS RULING CHANGES ABOUT THE SCOPE'S OWN FOOTING.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–3
above stand BYTE-FOR-BYTE — including item 2's identity `@provident-storeroom/js` and item 3's crate-collision
refusal — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no `HO-` row, mints no
`DD` row, moves no `PAR-JS` row and writes no byte outside this directory and this unit's sibling contract
directory.** **THE RULING, VERBATIM: *"Change org to @auspicion"*** (`docs/specs/storeroom-publish-proposal.md`
`§12` · **`A86`**).

**THE FIVE PLATFORM PACKAGES' NAMES MOVE FROM THE SCOPE `@provident-storeroom` TO THE SCOPE `@auspicion`, and
THE SCOPE SEGMENT ALONE IS REPLACED** — the operative default `A86`(a) — **so the five become
`@auspicion/js-linux-x64-gnu` · `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` ·
`@auspicion/js-darwin-arm64` · `@auspicion/js-win32-x64-msvc`.** **`A86`(b) — `@auspicion/storeroom-js-<label>` —
IS CARRIED AS THE PRICED ALTERNATIVE AND IS NOT APPLIED; its reversal is one line and must be taken BEFORE the
first platform publish.**

**AND THE ONE THING THIS RULING CHANGES ABOUT THE SCOPE'S OWN FOOTING — WHICH IS WHY `A86` IS NOT MERELY `A84`'s
`A-1` RE-SPELLED: `A84`'s `A-1` INTRODUCED THE SCOPE AS THE SUPERVISOR'S PRICED DERIVATION** — its own words at
that filing's `§9` are that the five names *"were always the supervisor's priced derivation"*, so correcting a
derivation was *"inside the ruling rather than beside it"* — **WHILE `A86` CHANGES THE ORG. SO THE SCOPE IS NOW
THE ARCHITECT'S OWN — AN ORG HE CONTROLS — AND NOT A DERIVATION AT ALL.** **AND `A85`(5)'s own precondition is
thereby answered: the org is one the architect owns, rather than one named after the project.** **AND `DD-26` IS
AN ACTIVE ROW AND THIS HOME IS AMENDED AND NEVER SUPERSEDED: the row stands, its subject stands, and this clause
re-reads its fact rather than replacing it.**

(`[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a)(b) — the org change, the operative reading and the
priced alternative; A1 docs/specs/storeroom-publish/contract.md §1.3 — the same ruling's clause at this pass's
sibling home; A3 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-6`, `PUB-DD-15` | requirement]`)

**⟶ RECONCILED 2026-10-11 AGAIN — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
*"Change the platform package names to specify the project they are for, this organization will be used for
multiple"* (`docs/specs/storeroom-publish-proposal.md` §14; `docs/decisions.md` · the ACTIVE `A88` row of
2026-10-11): THE PROJECT TOKEN IS INSERTED BEFORE THE LANGUAGE MARKER, AND THE SCOPE'S OWN FOOTING IS RE-STATED
BECAUSE THE SCOPE (`A86`) AND NOW THE PROJECT TOKEN (`A88`) ARE THE ARCHITECT'S ACTS RATHER THAN THE SUPERVISOR'S
DERIVATION `A-1` INTRODUCED.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–3 above, the `A86` clause beside them and
every cell they reconcile stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE
INSERTION — it adds no `HO-` row, mints no `DD` row, moves no `PAR-JS` row and writes no byte outside this
directory and this unit's sibling contract directory.**

**THE FIVE PLATFORM PACKAGES' NAMES NOW CARRY THE PROJECT TOKEN, so they are
`@auspicion/provident-storeroom-js-linux-x64-gnu` · `@auspicion/provident-storeroom-js-linux-arm64-gnu` ·
`@auspicion/provident-storeroom-js-darwin-x64` · `@auspicion/provident-storeroom-js-darwin-arm64` ·
`@auspicion/provident-storeroom-js-win32-x64-msvc` — the SCOPE `@auspicion` (`A86`, UNMOVED), the PROJECT TOKEN
`provident-storeroom`, and the LANGUAGE MARKER, the TARGET, the ARCH and the TOOLCHAIN SUFFIX UNMOVED.**
**`A88`(a) IS THE OPERATIVE READING — the ADDITIVE one, *"the project token is INSERTED before the language
marker"* — and `A88`(b) — `@auspicion/provident-storeroom-<label>`, the project token REPLACING the language
marker — IS CARRIED AND PRICED AND NOT APPLIED: its reversal is ONE LINE and MUST BE TAKEN BEFORE the first
platform publish, because after it a scoped name is spent and the alternative becomes a deprecate-and-re-publish.
AND `A86`(b) — `@auspicion/storeroom-js-<label>` — IS THEREBY SUPERSEDED, as the clause above already declared it
carried and unapplied.** **AND THE SPELLING THAT WAS OPERATIVE FROM THE `A86` PASS TO THIS ONE —
`@auspicion/js-<label>` — IS NOW REFUSED BY NAME, so a home, a manifest, an entry or an attempt set still
carrying it is a FINDING rather than a stale spelling** (`docs/specs/storeroom-publish/contract.md §5.6`;
`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-29`).

**AND THE ONE THING THIS RULING CHANGES ABOUT THE FOOTING — WHICH IS WHY `A88` IS NOT MERELY `A86`'s CLAUSE
RE-SPELLED, AND WHY THE `A86` CLAUSE ABOVE IS NOW ONE-HALF OF THE ANSWER RATHER THAN THE WHOLE OF IT: `A84`'s
`A-1` INTRODUCED THE FIVE NAMES' SCOPE AS THE SUPERVISOR'S PRICED DERIVATION, AND `A86` CHANGED THE ORG — SO THE
SCOPE IS THE ARCHITECT'S OWN. `A88` NOW NAMES THE PROJECT INSIDE THAT ORG, BY HIS OWN ACT.** **SO BOTH THE SCOPE
AND THE PROJECT TOKEN ARE HIS — an org he controls and a project his org carries — and NEITHER IS A DERIVATION
AT ALL; `A85`(5)'s precondition, that the scope be OWNED, is answered at `@auspicion` and `A88` adds no new
precondition, because a project token is part of a name the org's owner claims.** **AND `DD-25`'s AND `DD-26`'s
OWN STANDING IS RE-STATED BECAUSE THIS IS THE SECOND RULING IN A ROW TO REACH ONE OF THEM: BOTH ARE `ACTIVE` ROWS
AND BOTH ARE AMENDED AND NEVER SUPERSEDED — `DD-25`'s membership, hosting and trigger are unmoved while the
SCOPE AND THE PROJECT TOKEN of the names its five artefacts carry move UNDER it, and `DD-26`'s subject — this
unit's own registry identity — is NOT one of the five platform names and does not move at all**
(`contract.md §0.2` · `DD-25`, `DD-26`; `§3.2`).

(`[A1 docs/decisions.md · the ACTIVE `A88` row of 2026-10-11 (the architect's words verbatim, *"Change the
platform package names to specify the project they are for, this organization will be used for multiple"*); A1
docs/specs/storeroom-publish-proposal.md §14 · `A88`(a)(b) — the operative reading and its priced alternative; A1
docs/specs/storeroom-publish/contract.md §1.3 — the same ruling's clause at this pass's sibling home; A3
docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-29` | requirement]`)

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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE LABEL-TO-ARTEFACT MAP, SO THE
MATRIX'S `5` AND THE REGISTRY'S `5` ARE READ AS ONE SET.** `RCA-8(d)` ANNOTATE-BESIDE: **the paragraph above
stands byte-for-byte and its `5`-TARGET figure does not move; THIS clause is a PURE INSERTION and it states
the ARTEFACT NAME each label publishes under.**

**THE MAP, LABEL BESIDE ARTEFACT — because THREE of the five published artefacts carry a TOOLCHAIN SUFFIX
the declared label does not print:** `linux-x64` → `<scope>-js-linux-x64-gnu` · `linux-arm64` →
`<scope>-js-linux-arm64-gnu` · `darwin-x64` → `<scope>-js-darwin-x64` · `darwin-arm64` →
`<scope>-js-darwin-arm64` · `win32-x64` → `<scope>-js-win32-x64-msvc`, **where `<scope>` is the package's
own registry scope and the suffix names the TARGET'S TOOLCHAIN and never a sixth target.** **THE ARITHMETIC,
PRINTED WITH ITS TERMS: `5` labels = `5` artefacts, and `3` of the `5` carry a suffix (`-gnu` twice, `-msvc`
once) while `2` carry none (the Apple rows, whose platform has one toolchain) — so `3 + 2 = 5` ✓ and NO
TARGET IS ADDED BY A SUFFIX** (`DD-25`). **A consumer that installs on a covered target reads the
`optionalDependencies` NAMES; a CI script that builds the matrix reads the LABELS; and this map is the one
place the two spellings are related.** **`contract.md §3.3` item 5 and `package.md §3.2` carry the same map,
and a sixth artefact name is a FINDING** (`[A1 docs/specs/storeroom-js-proposal.md §15 · A71; A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-16` | numeric or census claim]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), CLOSING GATE 4'S `JS-20` HALF AND
`SW-1` ROW 27 AT ITS OWN TERMS: THE MAP'S `<scope>` IS THE PACKAGE'S DECLARED IDENTITY, SPELLED.** `RCA-8(d)`
ANNOTATE-BESIDE: **the paragraph and the map above stand byte-for-byte and the `5`-TARGET and `5`-ARTEFACT
figures do not move; THIS clause is a PURE INSERTION and it states the CONCRETE spelling of the placeholder
the map above prints.** **THE FINDING IT CLOSES, NAMED WITH ITS TERMS: the map printed
`<the package's scope>-js-<label>` while `bindings/js/package.json`'s `optionalDependencies` names spell the
scope CONCRETELY, so a consumer reading one and a CI script reading the other saw TWO spellings of five
artefacts** (`archive/gate4/storeroom-js-adversarial.md` · FIGURES THE PASS COULD NOT REPRODUCE · item `6`;
`contract.md`'s sweep clause, row `27`).

**THE CONCRETE SPELLING IS `@provident-storeroom/js` — the identity `§3.1` item 2 declares — AND THE FIVE
ARTEFACT NAMES ARE THESE, LABEL BESIDE NAME:**

| # | The matrix label (`§3.2`'s own list) | The published artefact's CONCRETE name |
| --- | --- | --- |
| 1 | `linux-x64` | `@provident-storeroom/js-linux-x64-gnu` |
| 2 | `linux-arm64` | `@provident-storeroom/js-linux-arm64-gnu` |
| 3 | `darwin-x64` | `@provident-storeroom/js-darwin-x64` |
| 4 | `darwin-arm64` | `@provident-storeroom/js-darwin-arm64` |
| 5 | `win32-x64` | `@provident-storeroom/js-win32-x64-msvc` |

**AND THE ARITHMETIC IS THE MAP'S OWN AND UNMOVED: `5` labels = `5` names, `3` of the `5` carrying a toolchain
suffix (`-gnu` twice, `-msvc` once) and `2` carrying none — so `3 + 2 = 5` ✓, and the suffix names a TARGET'S
TOOLCHAIN and never a sixth target.** **A SIXTH ARTEFACT NAME, A NAME THAT DROPS A SUFFIX THE PUBLISHED
ARTEFACT CARRIES, OR A NAME WHOSE SCOPE IS NOT `@provident-storeroom/js`, IS A FINDING** (`DD-25`, `DD-26`;
`§3.1` item 2). **AND ONE CONSEQUENCE IS NAMED SO IT IS NOT READ AS A WIRING DUTY: this clause states the
SPELLINGS and it resolves, loads or publishes NOTHING — the `optionalDependencies` wiring is `implementation-plan.md`'s
own build-surface row, and no artefact in this unit's tree is resolved or loaded by any clause here**
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A71; A1 docs/specs/storeroom-js-proposal-review.md §5.4 ·
`AR-16`; `DD-26` | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE TABLE ABOVE IS RE-EMITTED ROW BY ROW
WITH ITS AS-FILED SPELLING, BESIDE THE OPERATIVE FIVE NAMES.** `RCA-8(d)` ANNOTATE-BESIDE: **the concrete-spelling
clause, its five-row table and its arithmetic and finding-rule paragraph stand BYTE-FOR-BYTE and are read THROUGH
this clause; THIS clause is a PURE INSERTION — it moves no row, adds no artefact and mints no `DD` row.** **THE
RULING IS `A86` — *"Change org to @auspicion"* — at its operative default `A86`(a): THE SCOPE SEGMENT ALONE IS
REPLACED.**

| # | The matrix label (`§3.2`'s own list) | The AS-FILED concrete name (RE-EMITTED VERBATIM) | The `A86` concrete name (the PRIOR OPERATIVE reading, SUPERSEDED by `A88`(a)) | The OPERATIVE concrete name (`A88`(a)) |
| --- | --- | --- | --- | --- |
| 1 | `linux-x64` | `@provident-storeroom/js-linux-x64-gnu` | `@auspicion/js-linux-x64-gnu` | **`@auspicion/provident-storeroom-js-linux-x64-gnu`** |
| 2 | `linux-arm64` | `@provident-storeroom/js-linux-arm64-gnu` | `@auspicion/js-linux-arm64-gnu` | **`@auspicion/provident-storeroom-js-linux-arm64-gnu`** |
| 3 | `darwin-x64` | `@provident-storeroom/js-darwin-x64` | `@auspicion/js-darwin-x64` | **`@auspicion/provident-storeroom-js-darwin-x64`** |
| 4 | `darwin-arm64` | `@provident-storeroom/js-darwin-arm64` | `@auspicion/js-darwin-arm64` | **`@auspicion/provident-storeroom-js-darwin-arm64`** |
| 5 | `win32-x64` | `@provident-storeroom/js-win32-x64-msvc` | `@auspicion/js-win32-x64-msvc` | **`@auspicion/provident-storeroom-js-win32-x64-msvc`** |

**AND THE ARITHMETIC IS STILL THE MAP'S OWN AND STILL UNMOVED: `5` labels = `5` names, `3` of the `5` carrying a
toolchain suffix (`-gnu` twice, `-msvc` once) and `2` carrying none — so `3 + 2 = 5` ✓, the SUFFIX and the
SECOND SEGMENT are UNMOVED in every row, and the REPLACED SEGMENT IS THE FIRST ONE ALONE.** **AND THE FINDING RULE
IS RE-SPELLED AT THE NEW SCOPE AND WIDENED BY NAME: A SIXTH ARTEFACT NAME, A NAME THAT DROPS A SUFFIX THE
PUBLISHED ARTEFACT CARRIES, A NAME WHOSE SCOPE IS NOT `@auspicion`, OR A NAME WHOSE SCOPE IS STILL
`@provident-storeroom`, IS A FINDING** (`DD-25`; `DD-26`; `§3.1` item 2). **AND THE PRICED ALTERNATIVE `A86`(b) —
`@auspicion/storeroom-js-<label>` — IS CARRIED AND UNAPPLIED.** **AND ONE THING THIS CLAUSE DOES NOT MOVE, STATED
BECAUSE IT IS THE MAP'S OWN PLACEHOLDER: the earlier map's `<scope>` spelling stands UNMOVED as a PLACEHOLDER
whose filling is `§3.1` item 2's identity, and this clause fills nothing in it**
(`[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a)(b); A1 docs/specs/storeroom-publish/contract.md §1.3 —
the same ruling's clause at this pass's sibling home; A3 docs/specs/storeroom-publish/contract.md §0.3 ·
`PUB-DD-15` | numeric or census claim]`).

**⟶ RECONCILED 2026-10-11 — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`): THIS TABLE GAINS ITS OPERATIVE
COLUMN AT THE PROJECT TOKEN, AND THE CLAUSE ABOVE IS READ THROUGH THIS ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **the
concrete-spelling clause, its five-row table, the `A86` reconciliation table beside them and that clause's own
arithmetic and finding-rule paragraph stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE
INSERTION — it moves no row, adds no artefact, adds no label and mints no `DD` row.** **THE RULING IS `A88` —
*"Change the platform package names to specify the project they are for, this organization will be used for
multiple"* — at its operative default `A88`(a): THE PROJECT TOKEN `provident-storeroom` IS INSERTED BETWEEN THE
SCOPE AND THE LANGUAGE MARKER.** **THE FIVE OPERATIVE NAMES, CHARACTER FOR CHARACTER, ARE
`@auspicion/provident-storeroom-js-linux-x64-gnu` · `@auspicion/provident-storeroom-js-linux-arm64-gnu` ·
`@auspicion/provident-storeroom-js-darwin-x64` · `@auspicion/provident-storeroom-js-darwin-arm64` ·
`@auspicion/provident-storeroom-js-win32-x64-msvc`** (`docs/specs/storeroom-publish/resolution.md §3.1` —
that part's table's own OPERATIVE column).

**AND THE FIGURES, RE-PRINTED WITH THEIR TERMS BECAUSE THE CLAUSE ABOVE PRINTS THREE READINGS OF ONE SET AND A
READER MAY MISTAKE THEM FOR THREE SETS: `5` labels = `5` concrete names = `5` matrix targets; the three readings
in this table's columns are THE AS-FILED SPELLING, THE `A86` SPELLING AND THIS PASS'S SPELLING, all at the SAME
five labels; and the `3 + 2 = 5` ✓ suffix arithmetic is UNMOVED in every column.** **AND THE ONE FIGURE THIS PASS
MOVES, NAMED WITH ITS OLD AND ITS NEW READING: the `A86` column's `@auspicion/js-<label>` was THE OPERATIVE
SPELLING from the `A86` pass to this one and is now the SUPERSEDED reading, and this table's OPERATIVE column
reads `@auspicion/provident-storeroom-js-<label>`.** **AND THE FINDING RULE IS RE-SPELLED WITH THE SUPERSEDED FORM
AMONG THE FINDINGS, ON THE SAME FOOTING THIS UNIT'S OTHER HOME PRINTS IT: A SIXTH ARTEFACT NAME; A NAME THAT DROPS
A SUFFIX THE PUBLISHED ARTEFACT CARRIES; **A NAME WHOSE SPELLING IS `@auspicion/js-<label>` — THE SUPERSEDED
FORM**; **A NAME WHOSE SCOPE IS `@provident-storeroom` — THE RETIRED SCOPE**; a third org's scope; **and the priced
alternative `A88`(b), `@auspicion/provident-storeroom-<label>`, which drops the language marker** — EACH A FINDING**
(`DD-25`; `DD-26`; `§3.1` item 2; `docs/specs/storeroom-publish/contract.md §5.6`).
**AND THE EARLIER MAP'S `<scope>` PLACEHOLDER STANDS UNMOVED AS A PLACEHOLDER, and so does `§3.2`'s own finding
rule beside this table's: this clause fills nothing in either and replaces no cell of the concrete-spelling
clause.** **AND ONE THING THIS CLAUSE DOES NOT DO, STATED SO THE TWO DIRECTORIES' ROWS ARE NOT DUPLICATED: it
mints NO `DD` row in this contract — the five names' operative spelling is `DD-25`'s subject read at this
ruling, and the ruling's own priced default lives at the sibling directory's `PUB-DD-29`** (`contract.md §0.2` ·
`DD-25`; `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-29`).
(`[A1 docs/decisions.md · the ACTIVE `A88` row of 2026-10-11; A1 docs/specs/storeroom-publish-proposal.md §14 ·
`A88`(a)(b) — the project token INSERTED before the language marker, and the priced shorter reading; A3
docs/specs/storeroom-publish/resolution.md §3.1 — the operative five names at their own table | numeric or census
claim]`).

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

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE FOURTH DECLARED SITE AND THE
`-or-later` SPELLING, RECONCILED RATHER THAN SMOOTHED.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–2 above stand
byte-for-byte; THIS item is a PURE INSERTION and it declares the site `DD-43`'s three-site list does not
carry.**

**3. THE LICENCE IS DECLARED AT FOUR SITES, AND THE FOURTH'S SPELLING CARRIES THE `-or-later` CLAUSE.**
   **(i) the package's `package.json` `license` field, `AGPL-3.0`; (ii) `bindings/js/README.md`,
   `AGPL-3.0`; (iii) `package.md §3.4` (this section), `AGPL-3.0`; and (iv) the sibling crate's own
   `bindings/js/Cargo.toml` `license` field, `AGPL-3.0-or-later`.** **THE OPERATIVE READING, STATED WITH ITS
   TERMS: the DISTRIBUTION'S DECLARED FACT is `AGPL-3.0` at sites (i)–(iii), and the CRATE MANIFEST'S SPDX
   EXPRESSION at site (iv) is `AGPL-3.0-or-later`, whose grammar admits the `-or-later` clause and whose
   value the crate's own consumers read; BOTH NAME THE REPOSITORY'S OWN `LICENSE` FILE, and no clause of
   this unit changes it.** **The divergence is DECLARED and not repaired here, because the two sites answer
   two different readers — a registry metadata field and an SPDX-carrying manifest — and a re-spelling of
   either would have to move a byte of a file this pass may not write.** **A FIFTH site, or a third
   spelling, is a FINDING** (`DD-43`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.3 · `D9`; A1 docs/specs/storeroom-js-proposal.md §15 · A71;
   A3 docs/specs/storeroom-js/contract.md §3.3 item 6 — the home's own statement of the same two spellings;
   `DD-43` | declared parameter semantics]`).

   **⟶ AND THE FOURTH SITE'S OWN READING, RESTATED 2026-10-11 BY THE BOUNDED DECLARATION PASS
   (`role_spec_writer`) BESIDE ITEM 3 ABOVE, SO GATE 4'S `JS-20` HALF IS CLOSED AT THIS PART AND NOT ONLY AT
   THE CONTRACT DOCUMENT'S OWN CLAUSE.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–3 above stand byte-for-byte;
   THIS clause is a PURE INSERTION and it adds no site and no spelling.** **THE FOUR SITES, AND THE TWO
   SPELLINGS: `package.json`'s `license` field `AGPL-3.0` · `bindings/js/README.md` `AGPL-3.0` ·
   `package.md §3.4` (item 3 above) `AGPL-3.0` · and `bindings/js/Cargo.toml`'s `license` field
   `AGPL-3.0-or-later`.** **THE OPERATIVE SPELLING IS `AGPL-3.0` FOR THE DISTRIBUTION'S DECLARED FACT AT THE
   THREE REGISTRY- AND DOCUMENTATION-FACING SITES AND `AGPL-3.0-or-later` FOR THE CRATE MANIFEST'S SPDX
   EXPRESSION — a manifest field whose grammar admits that clause and whose value the crate's own consumers
   read — and the divergence is DECLARED rather than smoothed.** **A FIFTH SITE, OR A THIRD SPELLING, IS A
   FINDING** (`DD-43`; `docs/specs/storeroom-js/contract.md §3.3` item 6, which carries the same two
   spellings at the contract document's own home) (`[A1 docs/specs/storeroom-js-proposal.md §9.3 · `D9`; A1
   docs/specs/storeroom-js-proposal.md §15 · A71; `DD-43` | declared parameter semantics]`).

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

**⟶ RECONCILED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): EVERY TYPE-SET AND CENSUS
FIGURE OF THIS ITEM, RECONCILED TO THE SHIPPED MODEL AND TO `crossing.md §1.6`, WITH EACH AS-FILED FIGURE
PRINTED BESIDE ITS REPLACEMENT.** `RCA-8(d)` ANNOTATE-BESIDE: **the table above stands byte-for-byte and its
rows are read THROUGH this clause; NO ROW IS DROPPED, NO VARIANT IS ADDED TO THE DECLARATION AND NO
BEHAVIOUR MOVES — the shipped model was declared a REQUIREMENT by item 7, so this clause states the counts
the requirement yields instead of printing counts it does not.** **THE FOUR FIGURES THAT MOVE, EACH
AS-FILED → NOW, WITH ITS TERMS:**

| # | The declared figure, as filed | Its replacement, as this pass measured it at the shipped `bindings/js/src/crossing.rs` | The arithmetic that yields the replacement |
| --- | --- | --- | --- |
| **1** | the `JsValue` row's *"`13 + 1 = 14` variants"* | **`14` variants — THE FIGURE DOES NOT MOVE, AND THIS PASS RE-DERIVED IT RATHER THAN REPLACING IT** | **the model's arms, counted at the shipped enum: `Str` · `Bool` · `Num` · `Object` · `Array` = `5` admitted; `Null` · `Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` · `NonPlainCollection` = `8` outside; `SparseArray` = the hole's carrier — so `5 + 8 + 1 = 14` ✓ and the `+1` is NOT a fourteenth outside class — THE ROW IS RE-DERIVED SO ITS FIGURE IS A COUNT AND NOT A COINCIDENCE, and the model carries NO state beside these `14`** |
| **2** | the `JsProto` row's *"`Plain` · `Null` · `Class`, `3` variants"* | **`4` variants: `Plain` · `Null` · `ForeignPlain` · `Class`** | **`DD-7`'s realm-agnostic plain-object test NEEDS a fourth prototype class — a plain object from ANOTHER realm, ACCEPTED — and the shipped model carries it as `ForeignPlain`; `3 + 1 = 4` ✓** |
| **3** | the `JsHandle` / `JsHandleArg` row's *"the opaque handle OUT; the bare-string and outside forms IN"* | **`JsHandle` is a STRUCT with a PRIVATE token field and ONE public constructor (`wrap`) plus two `pub(crate)` constructors; `JsHandleArg` is an ENUM of `4` variants: `Opaque(JsHandle)` · `Bare(String)` · `NonOpaque` · `Absent`** | **`1 + 3 = 4` ✓ — the `Opaque` arm is the OUTPUT spelling of `crossing.md §1.3`'s `ListenerHandle` row 2, and `Bare` · `NonOpaque` · `Absent` are the three INPUT arms `unlisten` answers as no-op successes (`§2.3` item 4); the token's PRIVACY is `§2.3` item 2's and it HOLDS (no public accessor)** |
| **4** | the `8`-carrier-types row's *"each carrier's variant count being EXACTLY the variant-row count `crossing.md §1.6` prints for it"* | **the per-type counts below, of which `2` of the `8` carriers MATCH `§1.6`'s row count EXACTLY, `4` stand OVER it and `2` stand UNDER it while still covering every row** | **the four over-counts are `JsSegment` (`10` states against its `2` admitted rows, beside the `10` refused segment classes `§1.6` itself prints), `JsTierArg` (`8` against `7`), `JsTierSetItem` (`7` against `4`) and `JsJournalLengthArg` (`15` against `12`); the two under-counts are `JsAddressArg` (`14` rows against `9` variants, the five-row gap closed by `NonArray`'s `JsNonArray` sub-arms) and `JsOpIdArg` (`6` against `5`, total because `Absent`/`Null`/`Undefined` are three states for its two `null`/`undefined` rows); the two that match are `JsFilePathArg` (`6`) and `JsListenersArg` (`5`)** |

**AND THE `8` CARRIERS' OWN COUNT TABLE, SO THE BLANKET RULE IS READ WITH ITS FIGURES RATHER THAN AGAINST
THEM — the carrier, `crossing.md §1.6`'s ROW count, and the shipped MODEL's state count:**

| The carrier type | `§1.6`'s row count | The model's state count | Where the difference comes from |
| --- | --- | --- | --- |
| `JsSegment` | `2` admitted (rows 2–3) | `10` states: `2` admitted (`Key` · `Index`) + `8` outside arms (`Negative` · `Fractional` · `Null` · `Undefined` · `Bool` · `Object` · `Array` · `Function`) | **beside the `2` admitted rows, the `10` outside segment classes `§1.6` itself prints are the arms of `Segment`'s own outside set, and the model carries them as `8` of its own arms (`Object` · `Array` are the two `AddressArg`'s non-array reading folds into one shape, exactly as `§1.6`'s `AddressArg` row 6 names four classes in one refusal) — so `2 + 8 = 10` states cover `2` admitted rows and the `10` refused classes with NO ROW AND NO CLASS UNANSWERED** |
| `JsAddressArg` | `14` | `9` **— UNDER by `5`, and STILL TOTAL** | **`9` variants COVER the `14` rows: one variant per outside arm (`Absent` · `Null` · `Undefined` · `NonArray` · `ClassArrayLike` · `Proxy` · `Sparse` = `7`) plus the two LIST arms (`List` · `CrossRealmList` = `2`), so `7 + 2 = 9` ✓ — and the five-row gap is closed by `NonArray`, which carries ROW 6's five named classes as ONE variant through `JsNonArray`'s own `5` arms (`Str` · `Number` · `Bool` · `Object` · `Function`), so NO ROW IS UNANSWERED** |
| `JsTierArg` | `7` | `8` **— OVER by `1`** | **the extra state is the `Set(Vec<JsTierSetItem>)` carrier, which is `TierArg` row 2's ARRAY spelling carried as a variant rather than as a token class** |
| `JsTierSetItem` | `4` | `7` **— OVER by `3`** | **`4` states would cover rows 1–4 one for one; the model SPLITS the scalar and object classes into `Number` · `Bool` · `Object` · `Function` beside `Token` · `Null` · `Undefined`, so seven states cover four rows with no row unanswered** |
| `JsOpIdArg` | `6` | `5` **— UNDER by `1`, and STILL TOTAL** | **the model's `5` states (`Str` · `Absent` · `Null` · `Undefined` · `Number`) COVER the `6` rows because rows 4 and 5 (ABSENT against `null`/`undefined`) are the three distinct states `Absent` · `Null` · `Undefined`, and rows 3 and 6 (the empty string and the number) are the `Str` and `Number` arms — so the `6`-row table is total under `5` states and NO ROW IS UNANSWERED** |
| `JsFilePathArg` | `6` | `6` **— EXACT** | **`Str` · `Absent` · `Null` · `Undefined` · `Empty` · `NonString`: one state per row ✓** |
| `JsJournalLengthArg` | `12` | `15` **— OVER by `3`** | **the three extra states are `Null` and `Undefined` (rows 9's two halves carried as two states, per `crossing.md §1.3`'s absent-versus-`undefined` rule) and `TooLarge(u64)`, the state this pass DECLARES below and `crossing.md §1.3`'s row 12 is read through** |
| `JsListenersArg` | `5` | `5` **— EXACT** | **`List` · `Absent` · `Null` · `Undefined` · `NonArray`: one state per row ✓** |

**AND THE RULE THE TABLE REPLACES, STATED SO THE REPLACEMENT IS EXPLICIT: *"each carrier's variant count being
EXACTLY the variant-row count `crossing.md §1.6` prints for it"* IS WITHDRAWN AS A BLANKET CLAIM and replaced
by the two-part rule it should have been — (i) `§1.6`'s row counts are the CARRIER TABLES' own figures and
they do not move, and (ii) the MODEL'S state counts are reconciled to `§1.6` by the table above, so a state
that answers no row is a FINDING and a row no state answers is a FINDING, while a state count that EXCEEDS a
row count is lawful where this table names where the difference comes from.** **A `Js*` type the core exposes
and this section does not declare is a FINDING by item 7's own rule, and it was one:** **`JsKey` ·
`JsObject` · `JsNonArray` · `JsListenerEntry` · `JsConfig` · `JsHandle` · `JsHandleArg` · `JsBaseState` ·
`JsJournalOp` · `JsWriteResult` · `JsDeleteReceipt` · `JsRollbackResult` · `JsListener` · `Refusal` · and the
core's own `Instance` ARE the remaining declared types, and every one of them is reached from the table above
or from items 4–6.** **`crossing.md §1.6`'s `56`-row census is UNMOVED by this clause: it is the CARRIER
TABLES' own arithmetic, re-derived row by row (`14 + 7 + 4 + 6 + 6 + 12 + 5 + 2 = 56` ✓), and no row of any
of the eight tables is added, removed or renumbered here** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`'s drivability; A3
docs/specs/storeroom-js/crossing.md §1.6 · §1.3; `DD-7`; `DD-35` | numeric or census claim]`).

**⟶ AND ONE STATE OF `JsJournalLengthArg` IS DECLARED HERE BECAUSE `crossing.md §1.3`'s ROW 12 ARRIVES
THROUGH IT: `TooLarge(u64)`.** `RCA-8(d)` ANNOTATE-BESIDE: **the table above and the count table above it
stand byte-for-byte; THIS clause is a PURE INSERTION and it declares the ONE state of the carrier table that
the tables of `crossing.md §1.3` do not name.** **THE STATE: a positive integer `number` BEYOND `u32` that
reaches the construction as a `journalLength`.** **AND THE ROW IT ANSWERS, WITH ITS DECLARED ANSWER UNMOVED:
`crossing.md §1.3`'s `JournalLengthArg` row 12 declares `AddressMalformed` for *"a positive integer beyond
`u32`"*, and the answer is CARRIED AS DECLARED — the row is read THROUGH this state rather than
re-derived.** **THE CARRIER BESIDE THE ROW, STATED SO THE ANSWER'S PATH IS DECLARED:**
`JsJournalLengthArg::TooLarge(u64)` carries the `u64` and is converted through the STORE'S OWN
`JournalLengthArg::Fractional` arm, whose answer for a non-integral value is `AddressMalformed` — **so the
`u64` reaches the store's own closed set and NO CODE IS MINTED, CONVERTED OR RE-MAPPED on the way**
(`DD-1`; `DD-40`). **A value beyond `u32` that answers anything but `AddressMalformed`, and a state beside
this one that carries the same class, are FINDINGS.** **`crossing.md §1.3`'s row-12 neighbourhood carries the
same declaration at its own home, and the row's own printed text does not move.**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12`; A3
docs/specs/storeroom-js/crossing.md §1.3 — the `JournalLengthArg` table and its row 12; A3
docs/specs/storeroom-native/parameter-semantics.md §2.7 · `PAR-7` — the same value at the store's own
parameter set; `DD-1`; `DD-40` | declared parameter semantics]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT
FINDING `CF-7`: THE `BigInt` ARM'S VALUE SLOT, ITS BOUND, AND THE ONE ANSWER FOR A `bigint` BEYOND IT.**
`RCA-8(d)` ANNOTATE-BESIDE: **item 2's table and its dated clauses above stand byte-for-byte — the `JsValue`
row's `BigInt(i64)` included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds
no state to the model and moves no count (the `JsValue` row stays at its `14` states).** **THE DEFECT IT
CLOSES, NAMED WITH ITS TERMS: the row declares `BigInt(i64)`, so the model's value slot CANNOT EXPRESS a
`bigint` beyond `i64`, while the crossing carries that class across the boundary as a DECIMAL STRING whose read
into the slot is `.parse::<i64>().ok().unwrap_or(0)` — a SUBSTITUTION OF THE VALUE that no clause covered, and
one that is INVISIBLE because THE CLASS ALONE DECIDES THE REFUSAL.**

**THE BOUND, DECLARED: THE MODEL'S `BigInt` VALUE SLOT IS `i64`, AND THE PAYLOAD'S DECLARED SPELLING IS THE
DECIMAL STRING `BigInt.prototype.toString()` writes** (`bindings/js/index.mjs`'s `{k:'g', v:<decimal string>}`
arm, read at `bindings/js/src/facade.rs`'s `"g"` arm) **— and the construction's `journalLength` twin is read
by its OWN class into the same `i64` slot** (`JsJournalLengthArg::BigInt(i64)`, from
`napi_get_value_bigint_int64`, whose lossless-or-not answer changes no arm of the carrier's conversion).
**AND THE CONVERSION'S ANSWER FOR AN OUT-OF-`i64` `bigint`, DECLARED RATHER THAN LEFT TO DISCOVERY: THE SHIPPED
CONVERSION ANSWERS `0` FOR THAT VALUE SLOT — a substituted VALUE INSIDE THE ARM, AND NEVER A SUBSTITUTED
CLASS.** **AND ITS OPERATIVE CONSEQUENCE, WHICH IS THE WHOLE OF THIS FINDING'S CLOSURE: THE CLASS ALONE
DECIDES AND THE VALUE IS UNOBSERVABLE.** **NO CLAUSE of this directory reads, echoes, compares or re-renders a
`BigInt` arm's carried value:** **at a VALUE position the refusal is generated from the failing target's
ADDRESS and the class answers `ValueNotAdmitted`** (`crossing.md §1.2`'s closing clause; its row 10);
**at the construction key the class answers `AddressMalformed` and the value is read by no clause**
(`crossing.md §1.3`'s `JournalLengthArg` row 11); **and the boundary's own rendering of a `bigint` target is
computed IN JS at FULL PRECISION, before the addon is reached** (`index.mjs`'s `targetSpelling`, which prints
a `bigint` with its own `n`). **SO THE SUBSTITUTION CHANGES NO ANSWER, NO OBSERVABLE AND NO MESSAGE, and it is
NOT a repair of a class** — **the class is decided first and is never converted** (`A76`; `crossing.md §1.7`
(a)).
**AND THE DRIVE THIS DECLARATION DISPOSES OF, STATED SO IT IS NOT AUTHORED AGAINST AN UNOBSERVABLE: a drive
asserts THE CLASS AND ITS DECLARED CODE — `10n` at a value position answers `ValueNotAdmitted`, and a `bigint`
`journalLength` answers `AddressMalformed`** (`crossing.md §1.2` row 10; `crossing.md §1.3`'s
`JournalLengthArg` row 11; `parameter-semantics.md §2.10` and `§2.3`) — **while a drive that asserts the VALUE
the boundary carried, or that a `bigint` beyond `i64` and one inside it answer DIFFERENTLY, asserts a
behaviour this contract does not declare and would be FALSE of the build.** **A clause that reads the arm's
carried value, and a SECOND STATE beside `BigInt(i64)` carrying the same class, are FINDINGS.**
**AND THE `alt` THIS DECLARATION CARRIES, PRICED, NAMED FOR THE READING THAT STOOD OPEN: CARRY THE VALUE
WITHOUT A SUBSTITUTION — a wider value slot (`i128`, a sign-and-digits pair, or a string) so that no `bigint`
is ever substituted.** **Priced: it moves the `JsValue` row the model is counted by and it buys a distinction
NO OBSERVABLE CARRIES, because the class answers the same code for `0n`, `10n` and `2**70 + 1` alike — while
`§1.2`'s own clause fixes the MODEL as the carrier of the taxonomy's STATES and not of the values it refuses;
and a BOUNDARY refusal of an out-of-`i64` `bigint` is a second reading of the same alternative, priced the
same way, because the store already answers that class and `DD-1` puts the refusal at the store.** **Available
only as a bounded amendment of `docs/specs/storeroom-js/`, whose instrument is the amendment itself and NOT a
park** (`A66`)
(`[A3 docs/specs/storeroom-js/package.md §4.5 item 2 — the `JsValue` row this clause reads; A3
docs/specs/storeroom-js/crossing.md §1.2's closing clause and row 10 · §1.3's `JournalLengthArg` row 11 — the
two classes' declared answers; A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the class decided first
and never converted; `DD-1`; `DD-40` | declared parameter semantics]`).

**⟶ ADDED 2026-10-11 — WHERE THE BOUND NOW STANDS RELATIVE TO THIS ITEM'S `JsSegment` ROW, DECLARED AT THAT
ROW BECAUSE THE ROW IS THE CARRIER THE BOUND SITS IN FRONT OF.** `RCA-8(d)` ANNOTATE-BESIDE: **the `JsSegment`
row above, item 2's dated clause, its two count tables and item 2's `BigInt` declaration stand BYTE-FOR-BYTE —
the row's `Index(u64)`, its `10` states, its *"`10` REFUSED classes beside the `2` admitted ones"* and its
`crossing.md §1.6` citation included — and each is read THROUGH this clause; THIS clause is a PURE
INSERTION: it adds no variant to the model, moves no count, mints no code and re-decides no rule.**

**THE STATE, AND IT IS THE ONE `crossing.md §1.3`'s `RECONCILED` clause item 1 NAMED AS *"the carrier the bound
sits in front of"*: THE BOUND NOW STANDS IN FRONT OF THIS CARRIER AT BOTH ENDS OF THE CROSSING, AND THIS
CARRIER'S OWN `Index(u64)` IS THEREFORE REACHED ONLY BY VALUES THE BOUND HAS ALREADY ADMITTED.**

1. **AT THE PACKAGE'S OWN BOUNDARY THE BOUND REFUSES BEFORE THE CAST IS REACHED.** **`index.mjs`'s
   `encodeSegment` takes the class decision first and the RANGE second on the value as it is, and
   `validateOnAddress` takes the same two decisions at `on`'s position — so an integral segment above
   `Number.MAX_SAFE_INTEGER` is refused `AddressMalformed` BEFORE any carrier is built and BEFORE the
   carrier's own conversion runs** (`crossing.md §1.3`'s `AddressArg` row 3 range clause; `§1.7` (a); `§1.8`).
   **NO `JsSegment::Index` IS EVER CONSTRUCTED FOR SUCH A VALUE, so the `u64` slot is populated from no
   out-of-range `number` at all.**
2. **AT THE STORE'S OWN SURFACE THE BOUND REFUSES AT THE ONE SHARED PREDICATE.** **`src/value.rs`'s
   `Segment::is_in_domain` — the ONE predicate the walk's `L-1` arm, `write`'s target arm, `delete`'s target
   arm, `listen`'s per-segment loop and the construction's `listeners[]` adoption each ask — admits
   `Index(n)` iff `n <= 9_007_199_254_740_991` (`2^53 − 1`)**, **so a segment the boundary's own RANGE decision
   did not stop is still refused at the store, and the refusal is `AddressMalformed`, the store's own member**
   (`docs/specs/storeroom-native/store-model.md §1.5` item 1 — the domain's home; `docs/specs/storeroom-native/store-model.md
   §2.2` — `L-1`, the arm that answers it; `docs/specs/storeroom-native/seams-and-lifecycle.md §8.1` #1 —
   the code).
3. **AND THE HONEST STATEMENT OF WHAT THAT MAKES OF THIS ROW'S CONVERSION — SAID EXACTLY, BECAUSE THE TWO
   HALVES DIFFER:** **THE STORE'S SHARED PREDICATE MAKES THE CARRIER'S CAST TOTAL IN THE CONTRACT SENSE —
   every value that can reach the cast stands in domain, so the cast has NO out-of-domain input to answer
   for and `to_segment`'s mapping of an in-domain `Index` admits no unrepresented value — WHILE THE CAST
   ITSELF STILL SATURATES ARITHMETICALLY, that being what a Rust `n as u64` on the full `f64` value space
   does.** **So the cast is NOT re-spelled, NOT narrowed and NOT accompanied by a new guard here: ITS
   SATURATION IS RENDERED UNOBSERVABLE BY THE TWO REFUSALS ABOVE AND NOT BY ANY CHANGE TO IT** — **and a
   drive that asserts an out-of-range integral segment reaching this carrier, or that reads this carrier's
   `Index` slot as carrying a saturated value, asserts a state the tree cannot reach and a state this
   clause does not declare.** **The class is what answers; the saturation has no observable.** **A clause or
   a code path that reaches this carrier's `Index` slot with a value outside `[0, 2^53 − 1]`, and a guard
   added AT this carrier for that value, are each a FINDING** (`DD-40`'s own *"carried and never minted"*
   discipline; `A76`'s no-repair prohibition; `crossing.md §1.8`).
4. **WHAT DOES NOT MOVE, NAMED SO NEITHER ROW IS READ AS AMENDED: this item's `JsSegment` row keeps its `10`
   states and its `2` admitted classes; the `8`-carrier-types count table keeps its figures and its
   *"`10` states against its `2` admitted rows"* cell; `crossing.md §1.3`'s `AddressArg` row 3 keeps its
   accepted forms and row 8 its declared code; and NO `Js*` TYPE, NO VARIANT AND NO COUNT IS ADDED, DROPPED
   OR RENUMBERED.** **`crossing.md §1.6`'s `56`-row carrier census is unmoved.**
(`[A3 docs/specs/storeroom-js/crossing.md §1.3 — the `AddressArg` row 3 range clause and its `RECONCILED`
item 1, which names this item's `JsSegment` row as the carrier the bound sits in front of; A3
docs/specs/storeroom-native/store-model.md §1.5 item 1 and §2.2 — the bound's home and the arm that answers
it; A3 docs/specs/storeroom-native/seams-and-lifecycle.md §8.1 #1 — the code; `A76`;
`docs/specs/storeroom-js/crossing.md §1.7` (a) and `§1.8`; `DD-40` | state or fail-state declaration]`).

**3. THE CONVERSION FUNCTIONS — ONE ENTRY PER CARRIER AND ONE PER DIRECTION.** **The core exposes EXACTLY
these public functions, and each returns the SAME refusal type:**

```
fn to_store_value(v: &JsValue)        -> Result<StoreValue, Refusal>
fn from_store_value(v: &StoreValue)   -> JsValue
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

**⟶ RECONCILED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): `from_store_value`'S DECLARED
RETURN, RE-SPELLED TO THE SIGNATURE THE CORE CAN HONESTLY HAVE.** `RCA-8(d)` ANNOTATE-BESIDE: **the signature
block above is re-emitted with ONE LINE RE-SPELLED — `fn from_store_value(v: &StoreValue) -> JsValue`, where
the block read `-> Result<JsValue, Refusal>` — and every other line, and item 3 (a)–(c) whole, stand
byte-for-byte.** **THE DEFECT, NAMED WITH ITS TERMS: the declaration and the shipped function disagreed on
the ERROR ARM** — the declaration printed a `Result` whose `Err` is `Refusal`, while the shipped function
returns the value directly — **and item 7 names an interface the core does not carry a FINDING, so the
declaration had to move or the code had to.**

**THE DECLARED RETURN IS NOW `JsValue`, AND THE REFUSAL-CARRYING FORM IS **NOT** REQUIRED — THE REASON
STATED, SO THE RE-SPELLING IS NOT READ AS A WEAKENING.** **`from_store_value` traverses the STORE'S OWN
`StoreValue` and nothing else, and every one of that enum's arms has exactly one declared answer: the copy
out is TOTAL over `StoreValue`, so there is NO input on that path for which a `Refusal` could be produced.**
**A `Result` there therefore had exactly TWO possible readings, and both are refused: either its `Err` arm
was UNREACHABLE — a signature promising a failure the function can never answer, which makes every caller's
error branch dead code — or it was REACHABLE, which would mean the copy out can fail where `crossing.md §1.1`
clause 2 declares it CONVERTS the store's value into fresh JS-owned data with no failure arm and where
`§1.5`'s relation presupposes a value to compare.** **AND THE STORE'S ANSWERS ARE THE ONLY SOURCE ON THIS
PATH: `StoreValue` is the store's own closed taxonomy and the store's own closed `15`-member set is produced
at its VERBS, not at its value type — so the refusal is no longer the store's answer here and it is NOT this
unit's to mint (`DD-1`; `DD-40`).**
**THE CONSEQUENCE, PRICED BECAUSE A SIGNATURE CHANGE OWES ONE: THE COPY OUT HAS NO FAILURE CHANNEL OF ITS
OWN.** **Where a future crossing needed one — an arm of `StoreValue` the model could not carry, or a
normalization that must report itself — `from_store_value` would have to return a `Result` again, and THAT
would be a CONTRACT AMENDMENT this section's own item 7 requires, never a silent widening of the core; and
the shape the refusal would carry is `Refusal`'s, exactly `{status, message}` and not one member beside them
(item 4).** **Available only as a bounded amendment of `docs/specs/storeroom-js/`, whose instrument is the
amendment itself and NOT a park.** **AND ONE CONSEQUENCE IS NAMED SO IT IS NOT READ AS A GAP: the OUT-path
totality is what makes `Instance`'s own `read`/`readLiteral`'s `Result<JsValue, Refusal>` a `Result` of the
VERB and never of the conversion — the `Err` arm there is the STORE's answer to the read, and the copy out
adds none of its own.**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`'s drivability; A3
docs/specs/storeroom-js/crossing.md §1.1 clause 2 — the copy out; A3 docs/specs/storeroom-native/contract.md
§0.4 — the `StoreValue` taxonomy; `DD-1`; `DD-40` | state or fail-state declaration]`).

**4. THE RECORD TYPES — THE DEEP COPY OUT, MEMBER FOR MEMBER.** **The core returns fresh records whose
members are the store's own spellings of `§0.2`'s `DD-39`:**
```
struct Refusal                 { status: String, message: String }               // EXACTLY two members, no third
struct JsBaseState             { present: bool, value: JsValue }
struct JsJournalOp             { opId: String, kind: String, address: Vec<JsSegment>,
                                 tier: Option<String>, before: JsBaseState, after: JsBaseState,
                                 seq: u64, compacted: bool }
struct JsWriteResult           { op: JsJournalOp, watched: Vec<Vec<JsSegment>>, triggered: Vec<JsHandle> }
struct JsDeleteReceipt         { address: Vec<JsSegment>, tiers: Vec<String>, triggered: Vec<JsHandle> }
struct JsRollbackResult        { opId: String, undoneOps: Vec<String>, restoredTo: JsBaseState }
```
  **`Refusal` IS `§2.5`'s SINGLE FAILURE FORM AT THE CORE LAYER — a record with EXACTLY `{status, message}`
  and not one member beside them — and it is the ONLY error type the core exposes.** **A `status` outside
  the store's closed `15`-member set is carried VERBATIM and re-mapped to nothing** (`DD-40`).
  **⟶ AND `JsJournalOp`'S `kind` MEMBER IS RE-SPELLED BY THE BOUNDED CLOSE-OUT PASS OF 2026-10-11: the struct
  carries `kind: String`, and the `enum JsJournalOpKind { Write, Delete }` the block above printed DOES NOT
  EXIST IN THE BUILD.** **The declared Rust type set is reconciled to the shipped one, and NOTHING
  BEHAVIOURAL MOVES: the JS side OBSERVES the same two tokens either way, because the member crosses as the
  store's own kind token — `"write"` for a write and `"delete"` for a delete — as a JS `string`, which is
  `DD-39`'s own spelling for `kind`.** **The token is the STORE'S (`storeroom-native`'s own
  `JournalOpKind`, which is a STORE type and not this unit's) and the core spells it at its own translation;
  a third token, a `null`/absent `kind` on a successful write, or a kind that is not a `string` is a
  FINDING.** **AND ONE
  CONSEQUENCE IS NAMED SO THE RE-SPELLING IS NOT READ AS AN OPENING: a `JsJournalOpKind` enum is NOT declared
  here and is NOT required — a caller that wants a closed kind set reads the two tokens `DD-39` declares, and
  a Rust consumer that wants one may match on the store's own enum rather than on a second one this unit
  would have to keep in step.** **The reversal instrument, where the closed enum is wanted after all, is a
  bounded amendment of `docs/specs/storeroom-js/` (`A1`; `DD-39`).**
  (`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`; A3 docs/specs/storeroom-js/crossing.md §1.3 —
  the returned-record rows this struct serves; A1 docs/specs/storeroom-js/contract.md §0.2 · `DD-39` — the JS
  side's own spellings, read with `DD-40` | requirement]`).

**⟶ RECONCILED 2026-10-11 — THE BLIND GREENS PASS (`role_spec_writer`), CLOSING THE DOC FINDING `F-DOC-1`
RECORDED AT `archive/gate5/storeroom-js-greens-run.md` §4: `§1.3` ITEM 4's *"none of the five is a named
export of the claimed ESM entry"*, READ THROUGH ITEM 3's OWN LIST.** `RCA-8(d)` ANNOTATE-BESIDE: **items 1–4
above stand byte-for-byte — item 4's own duties list and its *"A SIXTH NAME IS A FINDING"* clause included —
and item 4 is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no name to the addon's five,
moves no entry of the `exports` map and moves no figure of this section.**
**THE AS-FILED SENTENCE, NAMED AS FILED, BECAUSE IT IS FALSE OF ONE OF ITS OWN FIVE NAMES ON ITEM 3's
READING:** ***"Every one of the five is INTERNAL — none is a named export of the claimed ESM entry …"***
(`package.md §1.3` item 4, its second sentence). **ITEM 3's OWN LIST IS THE CLAUSE THAT GOVERNS** — *"the
NAMED EXPORTS are exactly the verbs of `surface.md §2` and the package's own instance handle factory — and
NOTHING ELSE"* — **and that list CONTAINS the construction verb `storeCreate`, which item 4's own first
sentence counts among the addon's five.** **SO THE ONE SPELLING CARRIES TWO CARRIERS' DUTIES, and the split is
stated here ONCE:**
- **WHICH NAMES *ARE* NAMED EXPORTS OF THE CLAIMED ESM ENTRY — THE NAMESPACE ITEMS, AND THEY ARE THE `8` OF
  ITEM 3'S OWN LIST: `delete` · `listen` · `read` · `readLiteral` · `rollback` · `storeCreate` · `unlisten` ·
  `write`. `storeCreate` IS one of the eight, as the entry's construction verb and instance-handle factory;
  the enumeration remains *"AND NOTHING ELSE"* — a NINTH name is still a FINDING, and `register` is not one.**
- **WHICH NAMES ARE *NOT* — and they are read in TWO families, because they are two carriers: (i) THE
  INSTANCE'S OWN MEMBERS — `register(handle, listener)` alone, the ONE member of the object `storeCreate`
  RETURNS (`surface.md §2.4` item 5 (a): reached through the factory's own PRODUCT and never through the
  module namespace); and (ii) THE ADDON'S INTERNALS — its five export names are `version` ·
  `errorMessage` · `storeCreate` · `call` · `register`, of which the FOUR INTERNAL-ONLY ones are `version` ·
  `errorMessage` · `call` and the addon's OWN `register`, while the fifth is the SHARED SPELLING — so the FOUR
  are absent from the module graph and the FIFTH is present BECAUSE ITEM 3 DECLARES THAT NAME.**
- **AND THE SPLIT OF THE ONE SHARED SPELLING, STATED WITH ITS TERM: the entry's `storeCreate` and the addon's
  `storeCreate` are TWO EXPORTS OF TWO CARRIERS — one is a NAMED EXPORT of the ESM namespace, the other is a
  member of the internal artefact's own export set reached ONLY through the object the entry's module-private
  key holds (`§1.2` items 1–2) — and `register` exists twice in the same way, once as the INSTANCE's only
  member and once as the ADDON's internal step, and NEITHER is a named export of the module namespace
  (`surface.md §2.4` item 5 (a); `§2.9` item 1's `8`-verb count).**
**WHAT THE AS-FILED SENTENCE WAS TRYING TO FORBID, NAMED SO THE RE-SPELLING IS NOT READ AS A WIDENING: A NAME
BEYOND THE DECLARED SET — `package.md §1.3` item 3's *"AND NOTHING ELSE"* — whether it be a NINTH named export
of the entry (`findAddress` · `exists` · `dispose`/`close` · a verb of the store's own surface · an internal
name reached from a consumer's own module graph) or a SIXTH name on the addon itself (`§4.5` item 7's finding
rule).** **A READER WHO TAKES ITEM 4's SENTENCE AS A BAN ON THE NAME `storeCreate` WOULD READ A FINDING
AGAINST A BUILD THAT ITEM 3 DECLARES AND AGAINST THE PACKAGE ITSELF; and a reader who takes it as a licence
for a ninth name would read item 3's *"NOTHING ELSE"* out of existence — NEITHER READING IS THIS CLAUSE's.**
**AND THE MEASUREMENT THAT SETTLES IT, CITED RATHER THAN RE-DERIVED HERE: the gate-5 blind run's SURFACE
scenario `JSG-01` holds at `13/13`, whose `JSG-01.2` enumerates the namespace AS EXACTLY THE `8` NAMES ABOVE
(`storeCreate` among them), whose `JSG-01.9` enumerates the returned object's own member set AS EXACTLY
`{ register }`, and whose `JSG-01.7` and `JSG-01.12` read `register` and the four internal-only names as NOT
own exports of the module — so ITEM 4's SENTENCE IS FALSE OF `storeCreate` AND THE BUILD FOLLOWS ITEM 3**
(`archive/gate5/storeroom-js-greens-run.md` §4 · `F-DOC-1`; its §2's `JSG-12.13` derivation; §5 item 1).
**AND NO FIGURE OF THIS SECTION MOVES: `§1.3` item 3's *"NOTHING ELSE"* stands, the addon's `5` names stand,
`§4.5` item 7's finding rule stands, and the entry's named-export count stays `8`** — **a NINTH name, a sixth
addon name, a name of the four internal-only ones reached from a consumer's own module graph, and a claim
that `storeCreate` is NOT a named export of the entry, are EACH a FINDING**
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A70 — the claimed entry is the ESM one and its namespace is the
declared set; A1 docs/specs/storeroom-js-proposal.md §17 · `A75` — the internal reach; A3
docs/specs/storeroom-js/package.md §1.3 item 3 — the clause that governs; A3 docs/specs/storeroom-js/surface.md
§2.4 item 5 (a) — the instance's one member; A3 archive/gate5/storeroom-js-greens-run.md §4 · `F-DOC-1`, with
its `JSG-01`/`JSG-12.13` figures | cross-reference]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE CONTRACT FINDING THE
HOST-FIX PASS FILED AGAINST THIS ITEM: THE INSTANCE'S MEMBER SET, RECONCILED TO THE THREE THE `Q1` AMENDMENT
DECLARES.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — item 3's list, item 4's opening clause and its
two families (i) and (ii), the `F-DOC-1` reconciliation clause and its `JSG-01` figures — stands byte-for-byte
and is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no name to the addon's five, adds no
member to the instance's set beyond the two the `Q1` amendment declares, moves no entry of the `exports` map
and moves no figure of this section.** **THE AS-FILED SENTENCE, NAMED AS FILED AND RE-EMITTED VERBATIM SO
`git diff` RECOVERS IT WHERE IT STANDS:** ***"THE INSTANCE'S OWN MEMBERS — `register(handle, listener)` alone,
the ONE member of the object `storeCreate` RETURNS"*** (`§1.3` item 4, its family (i)). **READ ALONE IT IS FALSE
OF THE OPERATIVE MEMBER SET: the object `storeCreate` returns carries THREE own members, and the two the
`Q1` amendment's rulings added are `on(address, listener) -> handle` and `off(handle) -> undefined`**
(`docs/specs/storeroom-js-proposal.md §8` · **`A79`** · **`A80`**; `docs/specs/storeroom-js/surface.md §2.1`'s
dated clause 1 (a), which FIXES the value, and `§2.4` item 7, which declares the two members' signatures,
their domains, their arms and their return values). **THE OPERATIVE READING, IN ONE LINE: THE INSTANCE'S OWN
MEMBERS ARE `{ register, on, off }` — THREE OWN MEMBERS AND NOTHING ELSE — and the as-filed sentence's
*"alone"* and *"the ONE member"* are read as the PRE-`Q1` state they were written at, and never as a
prohibition of the two later members.**
**AND THE TWO OTHER CELLS OF THIS SECTION THAT TOUCH THE SAME SUBJECT ARE NAMED HERE, SO THE RECONCILIATION
IS READ AT EVERY SITE AND NOT ONLY AT THE ONE:** **the same item's bullet (ii) reads *"and `register` exists
twice in the same way, once as the INSTANCE's only member and once as the ADDON's internal step"* — its
*"only member"* is RE-SPELLED BY THIS CLAUSE to *"one of the instance's three members"*, while the ADDON-side
half of the sentence stands unmoved** (the addon's own five names, item 4); **and the same item's closing
figure-cell reading *"`register` is not one"* of the entry's named exports stands TRUE AND UNMOVED — NEITHER
`on` NOR `off` IS A NAMED EXPORT OF THE MODULE NAMESPACE EITHER, and the entry's named-export count stays
`8`** (`§1.3` item 3; `docs/specs/storeroom-js/surface.md §2.9` item 1's `8`-verb count). **THE ONE AS-FILED
REPAIR THAT STANDING ORDER NAMES — *"the two as-filed `{ register }` cells"* — IS THEREBY PAID AT THIS CELL
FOR THIS PART'S CELL, and the other of the two is `surface.md §2.4` item 5 (a)'s, whose own dated clause
already carries it** (`docs/specs/storeroom-js/contract.md` `§0.1`'s closure region, its `Q1` index clause's
figure table; `docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md` `§3`'s owed-repair
list, item 1).
**AND ONE CELL WITH THE SAME AS-FILED SUBJECT SITS OUTSIDE THIS DIRECTORY AND IS REPORTED RATHER THAN
RECONCILED HERE, NAMED SO IT IS NOT DISCOVERED LATER: `bindings/js/README.md` prints the same one-member
subject for a consumer (*"plus the one member of the object `storeCreate` returns"*), and a `README.md` under
`bindings/js/**` is outside this pass's write scope — so it is REPORTED as an as-filed reading of the
pre-`Q1` state and NOT rewritten by any clause of this directory** (the read this pass took; `surface.md
§2.1`'s dated clause 1 (a) and `§2.4` item 7 are the operative statements a consumer's README would cite).
**AND NO FIGURE OF THIS SECTION MOVES: the addon's `5` names stand, the addon's `4` internal-only names
stand, the entry's named-export count stays `8`, `§1.3` item 3's *"AND NOTHING ELSE"* stands, and `§4.5` item
7's finding rule stands** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80`; A1
docs/specs/storeroom-js-proposal.md §15 · A70 and §17 · `A75`; A3 docs/specs/storeroom-js/surface.md §2.1's
dated clause 1 (a) and §2.4 item 7 — the operative member-set statement; A3
docs/specs/storeroom-js/contract.md §0.1's closure region — the `Q1` figures this clause reconciles to |
cross-reference]`).

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

**⟶ RE-SPELLED 2026-10-11 — THE INVOKER IS THE MAPPING LAYER AND NOT THE FACADE, AND THIS ITEM'S SIGNATURE
BLOCK IS RECONCILED MEMBER BY MEMBER TO WHAT THE CORE ACTUALLY CARRIES** (`RCA-8(d)` ANNOTATE-BESIDE: **item 5's
opening sentence, its signature block, its clauses (a)–(c) and this section's own item list stand
byte-for-byte above and are read THROUGH this clause; not one byte of them is re-worded, moved or deleted, and
this clause NAMES the as-filed text it re-spells**; the finding's home
`archive/reviews/2026-10-11-structural-compliance.md` `§3` · `F-13` (with its `§4` · `U-9` · `U-11`) and its
`§6`; `A1 docs/specs/storeroom-js-proposal.md §17 · `A75`` — the route `JS → facade → core → store` — and its
`§18` · `A77`; `A3 docs/specs/storeroom-js/surface.md §2.4` item 5 and `§2.7` item 5 · `A3
docs/specs/storeroom-js/parameter-semantics.md §2.12`; `DD-15`; the boundary's own record
`bindings/js/src/crossing.rs`; `[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`'s drivability, so
that the DECLARED interface and the build read as ONE declaration | requirement]`).
**THE AS-FILED SENTENCE READ:** *"`Instance` is the core's own type, holding ONE store instance and the
PACKAGE-OWNED registry of `§2.4`; the core never invokes a listener of its own accord, and **the facade** reads
the registry's answer and performs the invocation after the verb returns (`§2.7`)."* **THE CLAUSE THIS
RE-SPELLING MOVES, AND WHERE IT MOVES TO — ONE CLAUSE, AND NOTHING BESIDE IT:** **THE INVOKER IS THE MAPPING
LAYER — the package, reached through the claimed ESM entry — and NEITHER the facade NOR the core invokes
anything.** **`A75`'s route is `JS → facade → core → store`: the facade CROSSES (arguments in, the store's
records out) and the invocation happens ONE LAYER ABOVE it, in the package, after the verb's own call has
returned** — **`A77` puts the id→function matching on the CLIENT side** (*"the store passes an ID back to the
client when a listener is triggered, and the JS side matches that ID to the function the caller registered it
with"*), so the live invocation is the ESM entry's own `deliver`, which matches `triggered`'s member to the
function its registry holds and calls it with the TRIGGERING ADDRESS (`surface.md §2.7` item 5;
`parameter-semantics.md §2.12`'s dated clause declares that ONE argument; `DD-22` declares the window and
asserts no order). **THE HALF THAT STANDS TRUE AND IS KEPT WHOLE: *"the core never invokes a listener of its own
accord"* — and it is true for the strongest reason there is: the core holds NO listener, NO callable and NO slot
for one, so it can invoke nothing.** **The `§2.7`/`DD-22` clauses the sentence cites are UNMOVED by this clause,
and no clause of this directory is re-decided with it.**
**AND THE SAME ITEM'S SIGNATURE BLOCK, RECONCILED — ONE MEMBER IS DELETED, ONE MOVES IN ITS PARAMETER LIST
ONLY, AND THE REST STAND:** **as filed the block printed**

```
  fn register(&mut self, h: &JsHandleArg, listener: JsListener) -> Result<(), Refusal>
  fn triggered_set(&self, r: &JsWriteResult)             -> Vec<JsHandle>
```

**and the OPERATIVE declaration is the block's own eight members — `read` · `read_literal` · `write` · `delete` ·
`rollback` · `listen` · `unlisten` · `register` — with `register`'s sole surviving signature
`fn register(&mut self, h: &JsHandleArg) -> Result<(), Refusal>`, and NO NINTH member.** **Named, one by one:**
1. **`triggered_set(&self, r: &JsWriteResult) -> Vec<JsHandle>` IS DELETED, AND ITS SUBJECT IS ALREADY A MEMBER
   OF WHAT THE VERBS RETURN.** **The triggered handles cross IN the write's and the delete's own records**
   (`JsWriteResult.triggered` · `JsDeleteReceipt.triggered`; item 4; `§0.2`'s `DD-39`) — **so a second accessor
   over an ALREADY-CROSSED member is a second spelling of one answer, it has no caller on either side of the
   boundary, and no drive may need it.** **Clause (c) above survives as the ORDER rule it states** (`DD-22`),
   **now read over the returned records' own `triggered` member.**
2. **THE `listener: JsListener` PARAMETER DOES NOT SURVIVE: THE FUNCTION NEVER CROSSES** (`DD-15`). **The
   package holds the caller's function in its own per-instance registry, keyed by the opaque handle
   registration returned; the core is asked nothing about it** (`§2.4` items 4–5; `surface.md §2.4` item 6).
   **A callable, or a carrier FOR one, appearing in the core's declared surface is a FINDING under item 7.**
3. **`register` SURVIVES AS THE DOMAIN HALF, AND CLAUSE (a) ABOVE IS THAT DOMAIN's ANSWER.** **The surviving
   member answers ONE question — does this handle belong to THIS instance's own domain, the tokens it MINTED
   by `listen` or ADOPTED at its own construction? — with clause (a)'s declared refusal for every outside value
   and the success for an in-domain handle** (`surface.md §2.5` item 5 (g)'s one form, carrying the store's own
   closed-set `AddressMalformed` and never a minted code: `DD-40`). **It holds NO slot, stores NOTHING and
   invokes NOTHING.** **AND THE TABLE'S OWN ROW IS ITS OTHER HALF: the per-instance domain's carrier is
   declared at `§0.2` · `DD-49`, the row carrying the core-side carrier of the registration site's domain, so
   this interface and that row read as ONE declaration.**
4. **THE REGISTRY'S FOUR RULES STAND WHOLE, AND EACH RULE IS READ AT THE PLACE THAT HOLDS ITS STATE: clause
   (b) is unmoved.** **Rule 2 (`register` replaces and never fans out), rule 1 (an unregistered handle's
   `triggered` membership fires nothing silently), rule 3 (a duplicate token enters the set once) and rule 4
   (`unlisten` removes the store-side home entry while the registry entry STANDS) are the PACKAGE's registry
   rules, and they stand exactly as this item prints them** (`§2.4`; `surface.md §2.4`; `DD-15`) — **because the
   registry that holds the functions is the package's, and the store-side half each rule names is the home's**
   (`docs/specs/storeroom-native/write-and-read.md §6.5` item 8, cited and never re-declared here).
**AND ONE CONSEQUENCE NAMED SO THE RE-SPELLING IS NOT READ AS A WIDENING OR A NARROWING ANYWHERE ELSE:** **this
clause declares the interface the unit's Rust half is authored against, and it MINTS NO CODE, NO STATE, NO
MEMBER AND NO BEHAVIOUR.** **The invocation's argument, its window, its order and a throwing body's
disposition are the JS layer's own declared clauses and NOT this core's** (`surface.md §2.7` item 5;
`parameter-semantics.md §2.12`; `DD-22`; `DD-23`) — **so a drive that asserts an invocation THROUGH the core, or
a ninth accessor over the returned records, is authored against an interface this core does not carry.**

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

**⟶ AND THE FINDING RULE'S OWN TWO CONSEQUENCES, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
(`role_spec_writer`), SO THIS ITEM IS READ WITH THE DECLARATION IT GUARDS.** `RCA-8(d)` ANNOTATE-BESIDE:
**item 7 above stands byte-for-byte; THIS clause adds no rule and moves no row, and it states the two things
the SAME pass reconciled UNDER that rule.**

**(1) THE `Js*` TYPE SET IS NOW DECLARED IN FULL, SO THE RULE HAS NOTHING LEFT TO CATCH ON THE MODEL:** **the
table of item 2 declares every `Js*` type the core exposes — `JsSegment` · `JsKey` · `JsProto` · `JsObject` ·
`JsValue` · the `8` carrier types · `JsListenerEntry` · `JsConfig` · `JsHandle` / `JsHandleArg` — and item 2's
dated clause prints each declared count beside the shipped one, names the three over-counts and the one
under-count, and states the two-part rule that replaces the withdrawn blanket claim.** **The remaining types —
`JsBaseState` · `JsJournalOp` · `JsWriteResult` · `JsDeleteReceipt` · `JsRollbackResult` · `Refusal` ·
`JsListener` · and `Instance` — are declared at items 4–5, and the EDGE between them and the JS-facing types
is item 6's.** **SO THE `JsValue` MODEL'S `14` STATES, `JsProto`'s `4`, `JsHandleArg`'s `4`, and
`JsJournalLengthArg`'s `15` ARE DECLARED RATHER THAN FINDINGS** — **and the FINDING this item declares now
fires only on a NINTH carrier, a variant of an already-declared type that this section does not print, or a
public function outside item 3's list.**

**(2) THE FACADE'S OWN METHODS AND THE ADDON'S OWN EXPORT NAMES ARE DECLARED, SO THE RULE ALSO HAS A NAMED
SET ON THE `cdylib` HALF:** **the internal artefact's export set is EXACTLY FIVE NAMES — `version` ·
`errorMessage` · `storeCreate` · `call` · `register` — declared at `package.md §1.3` item 4 and at
`contract.md §3.1`'s dated clause, and NONE of the five is a named export of the claimed entry.** **A sixth
name is a FINDING** — **and the facade's methods are thin, as item 1 declares: each validates nothing,
converts through the core and returns the core's result translated to a Node-API value.**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.3 — `V1`; A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-17` — the one claimed entry and `NOTHING ELSE`; A3
docs/specs/storeroom-js/package.md §1.3 item 4 and item 2's dated clause | requirement]`).

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

**⟶ AND THE SWEEP RECORD THIS PART POINTS AT, ADDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP
(`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves, and `§4.5`'s declaration is not
widened by a byte.** **The unit's divergence table is the contract document's own `SW-1` clause, and the rows
that touch THIS part are: `§4.5` item 3's `from_store_value` signature, item 2's `JsValue` · `JsProto` ·
`JsHandleArg`/`JsHandle` and carrier variant sets, item 4's `JsJournalOpKind` and `JsListener` type set, and
item 7's FINDING rule — each against the shipped `bindings/js/src/crossing.rs`'s own declarations; the
registration site's still-`un-run` drive; the licence's FOURTH site and its `-or-later` spelling in the
sibling crate's `Cargo.toml`; the prebuild matrix's label-to-artefact spellings; and the `V1` layout's own
authority question, whose declared repair is on the code side and NOT here.** **The realm claim, the `HO-`
ledger, the publish story, the sibling crate's layout and the ownership clause stand exactly as printed, and
this part's `§4.5` remains the declaration the red set was authored against** (`[A1
docs/specs/storeroom-js/contract.md · the sweep clause | cross-reference]`).
