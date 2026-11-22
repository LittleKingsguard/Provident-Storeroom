# Publish readiness — the tree at `f176d04`

**WHAT THIS FILE IS.** A review of the tree as committed, against what a release would need. **It moves no byte, claims no release class and cuts no tag** (`D-57`: the cut-state is not a document's to state). Written `2026-11-17` by the **L0 supervisor** after the nine units and the second realm landed.

---

## §1 · The verdict, in one line per leg

| a release needs | state | the evidence, at its byte |
|---|---|---|
| **every battery green** | **✅** | `npm test` **`1359` / `1358` / `0`** · `npm run typecheck` **exit `0`** · `cargo test` **22 result lines, all `ok`, `0` FAILED** · `cargo check --target wasm32-unknown-unknown` **0 errors** · `npm run build` **exit `0`** |
| **one version across the artefacts** | **✅** | **eight manifests at `1.12.0`** — the main package, its **five** `optionalDependencies` pins and **six** `version` fields (five platform siblings + the staged wasm package) |
| **a `files` allowlist that matches the tree** | **✅** | the packed set is now **`25` files** (`1 package.json + 5 root files + 18 entry modules + 1 kernel`), asserted by `blind-installed-surface`'s two figures, which moved with the parts |
| **an `exports` map that reaches the entry** | **✅** | one arm, `types` first, `import` and `require` naming the same file; **unmoved by this work** |
| **no unclaimed realm named as supported** | **✅** | `contract.md`'s realm sentences re-scoped in the plan's coupling order; **no sentence claims a shipped artefact** |
| **a `README` that tells the truth** | **⚠️** | **`bindings/js/README.md` still says *"No other realm is described here as supported"*** — the realm table's row 10, a **shipped artefact byte and `delivery`'s** |
| **the guides cover what ships** | **⚠️** | `docs/guides/package-use.md` describes the Node arm only — the realm table's row 9, **wave 2**, waiting on a build that ships |
| **the sixth artefact admitted** | **❌ NOT ADMITTED** | `bindings/wasm/` is **staged**: its manifest says so, it sits outside `bindings/js/platforms/`, and admitting it moves **the contract's artefact set (`DD-25`), the coupled-version rule and five publish cells together** |
| **a CI job that builds what ships** | **❌** | `publish.yml` carries two jobs — a five-target `platform` matrix and `main` — and **no wasm job** |
| **the installed/publish battery** | **⚠️ UNRUN** | `npm run test:e2e` (the `installed/` battery: `INSTALL-07` and its neighbours) **was not run this session**; its platform-table path was re-pointed and the parse was driven by the battery's own parser, but the battery itself is unverified |
| **the release class** | **❌ UNCLAIMED** | `D-154` item 4 of its unsettled: **the class is claimed before the tag**, and this work is additive — a `MINOR` by `RELEASE-NOTES.md`'s own record of `1.10`, `1.11`, `1.12` — so **`1.13.0`** is the shape and the claim is the architect's |
| **release notes for the landing** | **❌** | `RELEASE-NOTES.md`'s newest section is `§1.12.0`; **no section describes this work** |

**So: the code is release-grade and the release is not prepared.** Every battery is green and the tree is consistent; what stands between this commit and a publish is **one admission, one notes section, two sentences of prose and one CI job** — and none of them is code.

---

## §2 · The five items that block a publish, in the order they must land

1. **THE RELEASE CLASS, CLAIMED.** Additive features (a second realm, three `cfg` keys' companions, one status, two receipt accessors) ⇒ a **`MINOR`** by this file's own precedent. **The architect's, and it is the one act no other act can precede.**
2. **`RELEASE-NOTES.md`'s `§1.13.0`.** The house form is fixed by its own neighbours: the class, the version across the moving sites, what a consumer on `1.12.0` meets at each entry point, what does not move, and **`AND THIS SECTION DESCRIBES ... AND CLAIMS NO TAG`**.
3. **THE SIXTH ARTEFACT ADMITTED**, which is **one pass moving four things together**: `bindings/wasm/` → `bindings/js/platforms/wasm/`; `DD-25`'s membership and `§14`/`§15`'s coupled-version list (`six manifests` → `seven`); the `files`/`exports`/`types` declarations the staged manifest already prints; and **the five publish cells** (`NG-PUB-H`, `S-LICENCE`, `S-MANIFEST` ×2, `S-TAG`). **Doing them apart leaves a window in which the tree claims an artefact the publish shape does not carry** (measured, §21 of `docs/L1/wasm-realm.md`).
4. **A WASM JOB IN `publish.yml`.** The `platform` matrix is five native targets on five runners; the wasm build is one target on any runner, plus `wasm-bindgen --target web` and `scripts/build-wasm-package.mjs`. **It is not a sixth matrix row** and the workflow's own `PAR-PUB-28` clause ("a build this matrix did not perform") is why the distinction is stated rather than assumed.
5. **THE TWO SENTENCES OF PROSE** — `docs/guides/package-use.md`'s new section and `bindings/js/README.md`'s re-scoped realm sentence (`README.guide.md` is its byte-for-byte copy and re-lands with it).

---

## §3 · What is owed and does not block a publish

1. **`STORE_RETIREMENT` HAS NO FINALIZER ON THE WASM ARM.** A WASM store is never released and the crate's `INSTANCES` table grows for the life of the module (`docs/L3/wasm-realm/design.md` §8's `SC-10`, one arm over). **A long-lived page constructs and drops stores and holds every one of them.**
2. **THE `structuredClone` PROBE'S COST IS PRICED AND NOT MEASURED** — one clone per value on that arm's crossing (`D-156` item 3 of its unsettled).
3. **`util.types.isProxy`'S REPLACEMENT IS THE PROBE AND ONLY THE PROBE** — a `Proxy` is refused before any trap runs, which is `DD-34`'s property; **the admitted domain narrows to cloneable values, which `brief.md`'s invariant 2 already assumed and no clause states for that arm.**
4. **`NG-PUB-F`'S CONTROL IS INERT** — its as-filed substitution splices a `node:path` call into `addonLoadMessage`, which imports no `node:path`; all seven `NG-PUB-*` controls still pass and still fail when mutated, and **a pass widening that probe to the absent state must re-cut it.**
5. **`O-3` AND `SS-9`'s ZERO-BYTE-FILE FINDING** — moot on the WASM arm (the probe is not compiled) and **still owed on Node**.
6. **`O-8` — `FileCommitFailed`'s path slot** names a path a pathless build does not have: **moot on the WASM arm, owed on Node.**
7. **TWO TEST FILES REACH `withAddon` THROUGH `artefact.mjs`'s re-export** rather than `addon-slot.mjs` (harmless, one line each when touched).

---

## §4 · What this review could not check

- **`npm run test:e2e`** — the installed/publish battery. It builds, packs and installs the package in a clean directory; **it was not run this session**, and it is the only battery that exercises the published bytes.
- **The fifth platform sibling's own build** — CI's, not this machine's.
- **Anything about a real browser**: the WASM arm was driven under Node with `initSync`. **A browser's loader is not this harness**, and no cell claims it.
- **The release class** — unclaimed, and named as the first blocker rather than assumed to be a `MINOR`.
