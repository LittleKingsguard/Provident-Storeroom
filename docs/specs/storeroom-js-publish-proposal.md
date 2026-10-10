# PROPOSAL — publishing the current Node-API build for downstream user access

**Filed 2026-10-11 by the supervisor, on the architect's instruction: *"proceed with package planning on current build."*** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, licenses no code task, admits no unit row. **Gate state: GATE 1 OPENED, NOT PASSED** — the four steps run on THIS FILE, then the architect's go-ahead. **Scope: the Node-API build that exists today; the WASM/browser carrier is `P-4`, parked, and is NOT this plan's subject.**

## §1. THE INSTRUCTION, VERBATIM

> File as a pending feature then proceed with package planning on current build

## §2. WHAT EXISTS, MEASURED (so the plan starts from facts, not intentions)

**`bindings/js/package.json`** — name `@provident-storeroom/js`, version `0.1.0`, `"type": "module"`, `license: AGPL-3.0`, `engines: { node: ">=18.0.0" }`, one ESM `exports` arm (`"." → import: "./index.mjs"`), a `files` allowlist (`index.mjs`, `README.md`, `build/Release`), and **five `optionalDependencies` slots at `0.1.0`** (`js-linux-x64-gnu` · `js-linux-arm64-gnu` · `js-darwin-x64` · `js-darwin-arm64` · `js-win32-x64-msvc`).
**The loader** (`index.mjs:69–75, 117`) — `createRequire(import.meta.url)` and **one hard-coded module-relative path**: `join(dirname(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node')`. **No fallback**: `A75`'s declared absent-addon form (`FilePathUnreachable`, no instance) is the only answer when the artefact is missing.
**The artefact** — `build/Release/storeroom_js_binding.node`, **`sha256:cf088d91…`, `957,904` bytes**, gitignored/untracked by the project's own convention (the digest is the only durable tie, and it is on file in both run records).
**The verification** — store root `379` · sibling crate `223` · JS leg `113` · blind set `240/240` · live battery `91/91` (layer `LIVE/ASSEMBLED PACKAGE`, `APP` `NONE`) · both narrowed correctness gates exit `0` · `clippy --lib` clean · `rustfmt` clean · root manifest byte-identical.
**What does NOT exist:** any CI (no `.github/`, no Makefile, no `.npmrc`); any platform package; any resolution rule; any `LICENSE` inside the package directory; any `.d.ts`; any `repository`/`homepage`/`bugs`/`keywords`; any tarball smoke test. **NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE — and the live battery loads it IN PLACE from the repository.**

## §3. THE FILING'S BOUNDS

1. **It licenses no code task and admits no unit row.** Nothing is built, published, or versioned by this filing.
2. **It is not the contract.** Every clause the work needs is owed at gate 2 by `role_spec_writer`, in the unit's own directory.
3. **The store does not move.** This is the sibling crate's and the package's distribution surface; `src/**`, `tests/**` and the store's `379` are untouched by the plan.
4. **The WASM/browser carrier is out of scope** (`P-4`, parked) — this plan publishes the Node-API build that exists.
5. **Nothing was run by this filing beyond read-only inspection** — no `npm`, no `cargo`, no `node`, no publish, no pack.

## §4. THE GAPS, EACH WITH ITS DISPOSITION — and the ONE SEMANTIC DECISION

| # | The gap | Kind | Disposition |
| --- | --- | --- | --- |
| **1** | **HOW THE ENTRY FINDS THE RIGHT BINARY IN A PUBLISHED INSTALL** — the loader uses a module-relative path and nothing resolves the five platform packages | **SEMANTIC — THE ONE DECISION** | **A contract clause.** The candidates: **(i) platform-package-first, local-path fallback** — `require('@provident-storeroom/js-' + platformKey)` where the package exists, else the local path, else the declared absence; **(ii) platform-package-STRICT** — no local path in a published install, so the absence arm is the only answer elsewhere; **(iii) one package, no matrix** — ship per-platform tarballs (a different distribution shape). **SUPERVISOR'S RECOMMENDATION: (i)**, because it keeps the in-place developer loop working while making the published path real, **and it names ONE failure arm** (the platform's package missing ⇒ the declared absent-addon form). **The clause must also fix the platform→package mapping** (`process.platform` + `process.arch` + glibc-vs-musl detection, with the musl case's answer declared rather than guessed). |
| **2** | **THE FIVE PLATFORM PACKAGES DO NOT EXIST** | mechanics | **BUILD AND PUBLISH THEM.** Each carries its own `.node`, its own `package.json` with **`os`/`cpu` fields** (so npm installs exactly one), the **licence text**, and a version that tracks the main package. |
| **3** | **CI: THE MATRIX** | mechanics | **A tag-triggered workflow** building the five targets and publishing them **before** the main package, with **npm provenance** (OIDC). The repository has **no CI at all** today, so this is the plan's first new artifact. |
| **4** | **`files` SHIPS `build/Release`** | mechanics | **DROP IT FROM THE MAIN PACKAGE** once the matrix exists — otherwise a publish from one machine ships ONE platform's binary into a package that claims five. |
| **5** | **NO `LICENSE` IN THE PACKAGE DIRECTORY** | mechanics + licence | **ADD IT**, and **reconcile the spelling** (`AGPL-3.0` in `package.json` vs `AGPL-3.0-or-later` in the crate) in one pass. |
| **6** | **NO TYPES** | mechanics | **A `.d.ts`** + a `types` field. The surface is eight verbs, an instance member set of `{ register, on, off }`, and a closed fifteen-member failure set — small enough that a hand-authored declaration is the honest option. |
| **7** | **NO PACKAGE METADATA** | mechanics | `repository` · `homepage` · `bugs` · `keywords` · a long `description`. |
| **8** | **SCOPE OWNERSHIP** | **DECISION** | Publishing `@provident-storeroom/js` needs **that npm org/scope** — or a rename. **The architect's call.** |
| **9** | **VERSION + VISIBILITY OF THE FIRST RELEASE** | **DECISION** | `0.1.0` as filed; public or restricted; and **the semver policy for a store whose surface is governed by rulings.** The architect's call. |
| **10** | **NO INSTALL-TIME PROOF** | **EVIDENCE GAP — THE PUBLISH'S OWN ACCEPTANCE** | **A TARBALL SMOKE TEST**: `npm pack` → install into a **clean directory** → import through a real `node_modules` → run one real flow (construct, write, read, a boot on the same path, a listener firing, `off`) → **and assert the DECLARED absent-addon failure on a platform with no prebuild**. **This is the first evidence the package works AS SHIPPED rather than in place — and it is still NOT an `APP`-green, because no consuming application is involved.** |
| **11** | **THE OPEN CONTENT ITEMS** (the `AddressArg` row 8 reading · `package.md`'s README-side member sentence · `DEF-17`'s tracker row) | content | **Do NOT block a publish**; each is named in the trackers with its owner. |

## §5. THE PLAN — the project's own topology

| # | Phase | What it does | Owner |
| --- | --- | --- | --- |
| **Q0** | **THIS FILING** | gate 1's four steps on this file; the architect's go-ahead plus gaps 8 and 9's lines | the roles, then the architect |
| **Q1** | **THE CONTRACT** | the resolution clause (gap 1's decision), the platform→package mapping, the absence arm's per-platform reading, the version/distribution policy, and the smoke test as the acceptance criterion — in the unit's own directory, dated | `role_spec_writer` |
| **Q2** | **THE PLATFORM PACKAGES** | five manifests + a build script's declaration; **their code is the SAME crate built per target** — no new Rust | `role_implementer` |
| **Q3** | **THE ENTRY'S RESOLUTION** | the platform-package-first rule implemented, with the local path kept for the in-place loop | `role_implementer` |
| **Q4** | **THE MAIN PACKAGE'S SURFACE** | `files` (minus `build/Release`), `LICENSE`, `.d.ts`, metadata | `role_implementer` |
| **Q5** | **THE RED SET** | the resolution rule's drives: each platform key mapping to its package; the absence arm per platform; **and the tarball smoke test as a cell** | `role_test_writer` |
| **Q6** | **CI** | the tag-triggered matrix + provenance | `role_implementer` |
| **Q7** | **THE BLIND GREENS + THE LIVE BATTERY** | the set re-run against the packed tarball, and a new live scenario installing the **packed** artifact into a clean directory — **a new instrument: an install, not an in-place load** | `role_blind_test_writer`, `role_live_scenario_runner` |
| **Q8** | **THE DOC GATES + THE TRIO** | proofread, per-unit review, and the four legs over the packed tree | the doc roles, the supervisor |
| **Q9** | **THE FIRST PUBLISH — THE ARCHITECT'S OWN ACT** | no pass publishes; the publication itself is his act, with the version and visibility he names | the architect |

## §6. THE BLAST RADIUS

**Moves:** the package's `package.json` (files, licence, types, metadata, the optional deps' new versions) · the entry's resolution code · **five new package directories** · **a CI workflow** · the unit's contract (the resolution clause and the distribution policy) · the acceptance layer (the smoke test as its criterion) · the records. **Does NOT move:** the store, its crate, its `379`, its contract · the crossing core · the eight-verb surface and the instance's member set · the ledger (**a distribution change to an existing row adds no unit**).

## §7. PROVENANCE

**READ AT ITS OWN BYTES (this pass):** `bindings/js/package.json` · `bindings/js/index.mjs`'s loader (`:69–75`, `:117`) and its export list · `bindings/js/README.md`'s declared build step · `docs/specs/storeroom-js/package.md` (`§1`–`§4`, the realm claim, the handoffs, the prebuild/publish clauses) · `docs/specs/storeroom-js/acceptance.md` · the JS unit's `DONE` row and the trackers · `docs/pending.md`'s new `P-4` (the WASM/browser park) · and the runs' recorded figures and artefact digest. **NOTHING WAS PUBLISHED, PACKED, BUILT OR RUN BEYOND READ-ONLY INSPECTION.**

## §8. THE ARCHITECT'S RELEASE RULING OF 2026-10-11 — public, `provident-storeroom`, `0.1.0`

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> public at provident-storeroom:0.1.0

**THE RULING, TRANSCRIBED AS `A82` — and it answers `§4`'s gaps 8 and 9, with a RENAME the filing did not propose.**

| # | The question | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A82`** | **`§4` gap 8 (the npm scope/name) and gap 9 (the first release's version and visibility)** | ***"public at provident-storeroom:0.1.0"*** | **(1) VISIBILITY: PUBLIC** — a public registry release, not a restricted one. **(2) THE NAME: `provident-storeroom` — UNSCOPED.** That is **NOT** the `package.json`'s filed `@provident-storeroom/js`, so **the ruling carries a RENAME**, and it **removes the scope-ownership problem** the filing listed as a decision: an unscoped name needs only to be unclaimed on the registry. **(3) THE VERSION: `0.1.0`** — the filed version stands as the first release. |

**ITS DERIVED CONSEQUENCES, EACH NAMED SO IT IS NOT DISCOVERED LATER:**
1. **THE RENAME'S BLAST RADIUS.** `bindings/js/package.json`'s **`name`** and **the five `optionalDependencies` KEYS** · every cell and record that prints the old scoped name (`docs/specs/storeroom-js/**`'s package cells, the proposal's `§2`/`§4` tables, the run records) · **and nothing else**: the artefact and its digest are name-independent, and the store is untouched.
2. **THE PLATFORM PACKAGES' NAMES ARE DERIVED, NOT RULED** — under an unscoped main name the convention gives **`provident-storeroom-linux-x64-gnu` · `-linux-arm64-gnu` · `-darwin-x64` · `-darwin-arm64` · `-win32-x64-msvc`** (the same five targets, the scope simply dropped). **THIS IS THE SUPERVISOR'S READING, CARRIED AS A PRICED `DECLARED-DEFAULT`** whose reversal is one line; the ruling names the main package's identity and does not name theirs.
3. **`--access public` IS MOOT FOR AN UNSCOPED NAME** (publicity is the default for an unscoped package), so the publish command needs no access flag — worth stating so a later pass does not add one as if it were required.
4. **THE SEMVER POLICY REMAINS OPEN** by the ruling's silence: `0.1.0` is fixed as the FIRST release, and what a **breaking change** means for a surface governed by rulings (a major bump per ruling that changes an admitted class? a minor per added member?) is **a priced `DECLARED-DEFAULT`**: **minor for an added member or a new clause that does not change an admitted value's answer; major for a change to the admitted taxonomy, the closed fail set, or any clause that makes a previously valid call refuse.** Reversal: one line, and it is the distribution's own policy rather than the store's semantics.
5. **AND ONE THING THIS RULING DOES NOT ANSWER — `§4` GAP 1, THE ONE SEMANTIC DECISION: how the entry finds the right binary in a published install.** The filing's recommendation stands unchallenged (**platform-package-first, local-path fallback, ONE failure arm**), and **it is carried as the gate's input**; a different choice in one line replaces it.
**END OF THE PROPOSAL. §1 is the instruction. §2 is what exists. §3 bounds the filing. §4 enumerates the gaps with the one semantic decision priced. §5 is the phase plan. §6 is the blast radius. §7 is the provenance.**
