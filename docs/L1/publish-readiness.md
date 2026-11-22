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

---

## §5 · AMENDED `2026-11-17` — four of the five blockers are cleared, and the fifth is one word

**LATER THAN §1–§4 AND SUPERSEDING THEM WHERE THEY MEET.** The blockers §2 named have moved, and the measurements below are the ones taken after the move.

| §2 item | state | the evidence |
|---|---|---|
| **1 · the release class** | **❌ STILL OPEN, AND IT IS THE ONLY ONE** | `1.12.0` stands on all seven manifests; the class is the architect's and no act after this one can precede it |
| **2 · `RELEASE-NOTES.md`'s section** | **owed, and blocked on item 1** | its version figure is the class's |
| **3 · the sixth artefact admitted** | **✅ `2ec4fc9`** | `bindings/js/platforms/wasm/` beside the five native siblings; `DD-25` reads the published set as **seven** with the wasm artefact produced by **a job beside the matrix**; the coupling rule reads *"the seven manifests move to `X.Y.Z` together"*; five publish cells moved with their reasons; **no version moved** |
| **4 · a wasm job in the workflow** | **✅ `2ec4fc9`** | `publish.yml` carries a `wasm` job (`needs: platform`, `runs-on: ubuntu-24.04` — a member of the five, never a sixth image), and **`main` now needs `[platform, wasm]`**, so the main package is published last of all seven |
| **5 · the two sentences of prose** | **✅ `0ef8aa1`** | `README.md` keeps this package's realm claim byte-for-byte and names the sibling as a **build**; the guide carries the three consumer-visible differences; `README.guide.md` is byte-identical again; the licence sentence reads **seven** |
| **6 · the installed/publish battery** | **✅ RUN, AND GREEN** | `npm run test:e2e`: **15 cells PASS · 1 `LAYER-LIMIT` (`INSTALL-09`, neither a pass nor a failure by its own clause) · 0 FAIL · `EXIT 0`** — `INSTALL-07` reads **5/5** pins and **5/5** table pairs, against a locally packed tarball installed into a clean directory |

**AND THE WHOLE FLOOR, RE-MEASURED AFTER ALL FOUR: `npm test` `1359` / `1358` / `0` · `npm run typecheck` exit `0` · `cargo test` 22 `ok` / 0 FAILED · `cargo check --target wasm32` 0 errors · `node scripts/build-wasm-package.mjs` exit 0 · the installed battery `EXIT 0`.**

**SO A PUBLISH IS ONE CLASS AND ONE SECTION AWAY.** The class is additive work's — **a `MINOR`**, `1.13.0`, by the three precedents `RELEASE-NOTES.md` already records (`1.10`, `1.11`, `1.12`) — and **it is the architect's to claim**, after which the section writes itself from this landing's own record: the second realm, the three `cfg` keys' companions, the twenty-third status, the two receipt accessors, and the seven-manifest coupling.

**AND THE RESIDUALS §3 NAMED STAND UNCHANGED** — `STORE_RETIREMENT`'s missing finalizer on the WASM arm · the `structuredClone` probe's priced-but-unmeasured cost · `NG-PUB-F`'s inert control · `O-3`, `SS-9` and `O-8` moot on that arm and owed on Node · and the two test files that reach `withAddon` through `artefact.mjs`'s re-export.

---

## §6 · `D-158` — THE CLASS IS CLAIMED, THE NOTES ARE WRITTEN, AND THE REVIEW'S LAST ROW CLOSES

**THE ARCHITECT'S *"MINOR — 1.13.0"* IS RECORDED AT `strata/decisions.md` · `D-158`, AND NOTHING IN §5's TABLE IS OPEN.**

| §5 item | state |
|---|---|
| **1 · the release class** | **✅ `D-158` — a `MINOR`, `1.13.0`**, the same class the three precedents took, and it **discharges `D-154` item 4 of its unsettled** |
| **2 · `RELEASE-NOTES.md`'s section** | **✅ `§1.13.0`**, in the file's own house form: the class and its ruling, the twelve moving sites, the headline sentence, **seven entry points a consumer on `1.12.0` meets**, **eleven things that do not move**, the published set's `6 → 7`, and **`AND THIS SECTION DESCRIBES 1.13.0 AND CLAIMS NO TAG`** (`D-57`) |

**THE VERSION MOVED TWELVE SITES TOGETHER** — the main manifest's `version`, its **five** exact `optionalDependencies` pins, and the
**six** `platforms/*/package.json` versions (five native + the WebAssembly sibling the coupled-version rule now names). **The artefact
is stamped from the manifest by `bindings/js/build.rs`, so `version()` answers `1.13.0`**, and `README.md`'s generated version line
reads the same.

**MEASURED, EVERY LEG, AT THE NEW VERSION.** `npm test` **`1359` / `1358` / `0`** · `npm run typecheck` **exit `0`** · `cargo test`
**22 `ok` / `0` FAILED** · `cargo check --target wasm32` **0 errors** · `node scripts/build-wasm-package.mjs` **exit `0`** (the package
stages at `1.13.0`) · **the installed battery `EXIT 0` — 15 cells `PASS`, 1 `LAYER-LIMIT`, 0 FAIL, and `INSTALL-06` reads
`version=1.13.0` beside the entry.**

**AND ONE THING A LATER PASS MUST KNOW, BECAUSE IT COST THIS PASS SIXTEEN RED CELLS FOR A MINUTE**: **the version bump alone reddens
sixteen cells until the artefact REBUILDS** — the stamp is baked at build time (`build.rs`), so `version()` answers the OLD figure
until `npm run build` runs after the manifests move. **The bump and the rebuild are one act**, and a pass that bumps and does not
rebuild will read sixteen reds that are not defects.

**WHAT REMAINS, AND IT IS NOT THIS REVIEW'S** — the residuals §3 named (unchanged), and **the sixth package's first publish**, which is
`delivery`'s with its own first-release questions. **No tag is claimed anywhere**: `D-57`.

---

## §7 · THE RESIDUALS, WORKED `2026-11-17` — two closed, one measured, one found, one deliberately left

**§3's list, item by item, with what actually happened.**

| §3 item | outcome |
|---|---|
| **the `structuredClone` probe's cost — priced and unmeasured** | **✅ MEASURED, AND IN A WAY THAT FOUND SOMETHING ELSE.** The `installClassInstrument` seam lets the same store be driven twice — once with the probe, once with a no-op — so the probe's cost is the difference: **`18,662 ns/write`, `9.3%` of a write** (`220,179` against `201,517`; 400 writes per round, 50 warm-up, six alternating rounds, medians, the WebAssembly arm under a Node host). **Recorded at `D-159` item 4.** |
| **`NG-PUB-F`'s inert control** | **⚠️ STILL OWED, AND THE RE-CUT WAS ATTEMPTED AND REVERTED.** The as-filed half splices `join(dirOf(fileURLToPath(...)))` into `absentSubject()`, which now lives in `addon-slot.mjs` and imports no host module — **inert only because the probe drives the mismatch state.** The re-cut needs the spliced value to be a literal; **the edit was made twice and both times the anchor matched an earlier site and damaged the file, so it was reverted from `HEAD` rather than landed half-right.** **The landmine is documented at the control and in this row**: a pass that widens that probe to the absent state must re-cut it first. |
| **the two test files reaching `withAddon` through `artefact.mjs`'s re-export** | **✅ CLOSED.** `def-ae-restore-mark.test.mjs` and `discard-witness.mjs` now import from `addon-slot.mjs`, so a later pass that retires the re-export does not have to find them. |
| **`STORE_RETIREMENT`'s missing finalizer on the WASM arm** | **OPEN, and now larger than it was**: see `D-159`. |
| **`O-3`, `SS-9` and `O-8` — moot on the WASM arm, owed on Node** | **OPEN, unchanged.** |

**★ AND THE FINDING THE RESIDUAL PASS WAS NOT LOOKING FOR — `D-159`.** Measuring the probe's cost needed a bench, **and the bench OOM'd.** The trail from there is one row: **a store that has taken N writes holds on the order of N × (1–4 KB), without bound, on both arms.** The WebAssembly arm is merely the first place it meets a ceiling — **it OOMs at about 16,000 writes** (`rust_oom` at `alloc`) — while the Node arm reaches 7.3 GB of `rss` at the same count. **Two probes rule out the obvious causes**: the rate does not track `journalLength` (`124` · `113` · `75` KB/write at caps `4` · `64` · `1024`) and one address grows like eight thousand distinct ones. **And `rss` is the wrong figure**: `heapUsed` grows ~`3.7 KB` per write, so the growth is LINEAR and V8's heap merely expands to hold it. **The layer is not isolated** — three raw-addon drives failed on this harness's wire, so the retention lies between the kernel and the store and is attributed to neither. **No cell catches it, which is why it has lived through every green battery this session ran.**

**THE FLOOR, AFTER ALL OF IT: `npm test` `1359` / `1358` / `0`.** Nothing in this pass moved a shipped byte.

---

## §10 · RE-MEASURED AFTER `D-160`/`D-162` — four items stand between this tree and a publish, and none is code that ships

**THE FLOORS, TAKEN ON THIS TREE NOW.**

| leg | reading |
|---|---|
| `npm test` | **`1364` / `1363` / `0`** |
| `npm run typecheck` | **exit `0`** |
| `cargo test` | **22 `ok` / 0 FAILED** |
| `cargo check --target wasm32-unknown-unknown` | **0 errors** |
| `npm run build` · `node scripts/build-wasm-package.mjs` | **exit `0`** · staged |
| **the installed battery** (`live-install.mjs`, re-run after the store and kernel changed) | **15 cells `PASS` · 1 `LAYER-LIMIT` · 0 FAIL · `EXIT 0`** |
| `tests/e2e/greens.mjs` (out of glob) | **254 authored · 254 executed · 254 PASS · 0 FAIL** |

### 10.1 · THE FOUR BLOCKERS

1. **✅ DISCHARGED `2026-11-17` (`D-163`, the architect's *"Proceed on the E2E fix"*) — AND IT WAS TWO RULINGS, NOT ONE.** The row reads
   **`rows=17 cells=125 PASS=125 FAIL=0 NONRUN=0`, `EXIT 0`**. **The attribution below was half wrong and the measurement says so**: the `x0`
   throw was `FileImageRefused` from the CORRUPT WINDOW's boot (`D-126` item 2), not the body's `rollback`; and `D-160` had already removed the
   arm's subject. **Three limbs retired with their rulings** (the `D-108` regeneration, `D-118` item 1's equality, the title's *"no producer
   left"*), **and the provenance is weaker**: a blind row rewritten by the pass that broke it. The original entry follows, unedited. Its title is *"… and `RollbackCompacted` has no producer left"* — **`D-160` gave that rank a producer at the dropped floor**, so the row's drive stops at its first step (`x0` FAIL) and **nine cells go `NONRUN`**. **Eight of the file's other rows are `PASS=8`**; this one is the file's own subject falsified. **A blind row cannot be re-derived from inside the pass that falsifies it** — that is its own test pass's `D-16`-class correction, and it must land or the row must be retired with its reason.
2. **`tests/e2e/discard-witness.mjs` REPORTS 3 FAIL** (`DW-09.1`, `DW-09.2`, `DW-16.3`) — **reported by the pass that ran it as the recorded pre-existing baseline, and NOT independently verified by this review.** They read as the kernel's **commit-window** subject (`open 1`, `live 1`), which is not the two maps `D-160`/`D-162` touched. **A release should not carry three unnamed reds**: each needs a fix or a defect row with an owner.
3. **`RELEASE-NOTES.md`'s `§1.13.0` IS STALE BY TWO BEHAVIOURS.** It was written before `D-160` and `D-162` and **mentions neither**: (a) **the journal DROPS history and `journalLength` is now the width of the compensation window** — a semantic the notes must state, because it conditions `D-108` item 2's *"no landed edit survives a refusal … unconditional"*; and (b) **a closed attempt's report is retained for the most recent `1024` attempts, and a pruned id answers `KC-2`**, the same refusal an id that never named an attempt meets.
4. **THE RULING ON `D-108` ITEM 2** — `D-160`'s consequence makes *"no landed edit survives a refusal"* **conditional on the window's width** (where the window took an op a composition must reverse, the store refuses and landed edits stand). **That is a declaration, and it is the architect's.**

### 10.2 · THE RESIDUALS, NAMED AND NOT BLOCKING

1. **`STORE_RETIREMENT` has no finalizer on the WASM arm** — a WASM store is never released and the crate's `INSTANCES` table grows per constructed store (`design.md` §8's `SC-10`, one arm over).
2. **`replayMark`'s base is `born`** — a dropped entry's effects are not replayable without a per-version capture at each drop.
3. **The foreign-id collision class in the floor watermark** — an id another instance minted inside this store's span also answers `RollbackCompacted`.
4. **`NG-PUB-F`'s inert control** — its as-filed half splices a `node:path` call into a part that no longer imports one; inert only because the probe drives the mismatch state.
5. **`O-3`, `SS-9` and `O-8`** — moot on the WASM arm and **still owed on Node**.
6. **NO CELL DRIVES THE WASM ARM'S BEHAVIOUR.** `C-W1`, `C-W2` and `C-W5` from `wasm-realm.md` §7 are **named and unwritten**: the staged package is driven **by hand** in this review and in §7/§9 of the RCA, and **the arm's own behaviour — construction, a `file`-tier write, a save through `saveCall`, a seed through `initialImage`, the `Proxy` refusal, the deep clone — is claimed by no cell.** **That is the last real gap between "the arm works" and "the suite says so".**

### 10.3 · WHAT IS NOT A BLOCKER AND IS WORTH SAYING

**The sixth artefact is admitted, the workflow carries its job, the shipped prose names the build, the class is claimed and the version is `1.13.0` across all twelve sites.** **Nothing in §10.1 is a shipped byte except item 3**, and item 3 is prose in an artefact that travels.
