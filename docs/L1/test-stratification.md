# L1 test stratification — `Provident-Storeroom`

**WHAT THIS FILE IS.** The declaration of the **test-layer stratification**: an assignment of **every existing
test artifact** to one of the strata preset's three test scopes — `tests/e2e/`, `tests/integration/<module>/`,
`tests/unit/<module>/` — with the module each file drives and the layer it reports. **It moves no file and
edits no test.** It is a declaration for the architect's review, made under `strata/decisions.md` **`D-5`**
(*"Keep the preset's choice"*): the preset's three write scopes stand as configured, **the tree adapts**, and no
scope is bent to a path this project already uses.

**⟶ AMENDED IN PLACE, SAME BRANCH, BY THE ROUTE PASS THE ARCHITECT ORDERED.** The blocker this declaration
raised — *the bare specifier does not resolve from outside `bindings/js/`, and a relative re-pointing destroys
the claim the battery rests on* (§5's *self-reference* bullet) — **is closed by `strata/decisions.md` `D-6`**:
*"Use O3 for e2e publish-readiness, O4 for earlier tests."* This pass **adds a route to every one of the 33
e2e cells** (§2.1's new `route` column; the declaration at **§2.6**), **states what the integration and unit
scopes' route is** (§2.6.3 — *none, by design*, with three named exceptions), **declares what `O3`'s staged
tree contains** (§2.6.2), **states the re-spellings by route** (§2.6.4), and **carries the two-cell migration
consequence of `D-3`'s correction** (§5). **Everything else stands as committed**: the 75 files and their three
scopes, the two cross-scope helpers, the layer column, the five files that span two layers, and every finding
and question. **No route tag implies a label** — **`F3` and `F4` are NOT answered here** (§2.6.7, §3). **This
pass moved no file, edited no test and started no L2**: `D-6` orders no file move.

**INPUTS, AND HOW EACH WAS USED.** `strata/decisions.md` read whole (`D-1`…`D-6`; `D-5` orders the
stratification, **`D-6` orders this route pass and `D-5`, `D-4` and `D-3`'s correction are its context**,
`D-4` makes the scenarios' placement upstream of the manifest decision, `D-1` and `D-3` are why the kernel's
cells have one module and no declared export set to test against); `strata/brief.md` read whole (§5 item 8 — *a green
is always reported with its layer* — and §6's open limits are the layer-preservation clause's ground); the
existing map `docs/L1/module-map.md` and `docs/L1/modules.json` (§2.4 owns the four batteries and states their
paths are present-state; the 19 module ids are the only ids used below); and the **75 files themselves**,
surveyed on this branch by glob, by `grep` for their imports and cell names, and by reading each file's header
and doc comments — **not by reading 75 files end to end**, and **no test was run** (this pass had no shell).

**THE DENOMINATOR, MEASURED ON THIS BRANCH.** `tests/` **15** files (14 `.rs` + `support/mod.rs`) ·
`bindings/js/tests/` **7** (6 `.rs` + `support/mod.rs`) · `bindings/js/test/` **42** (37 `*.test.mjs` +
4 shared helpers + `REMEASURE-2026-10-18.md`) · `bindings/js/greens/` **11** (10 runners + 1 `.md`).
**15 + 7 + 42 + 11 = 75 ✓** — the same denominator the map's FIGURES print for those four directories, and the
same 75 `D-5` calls *"a redistribution of 75 files across three layers"*.

---

## §1 · The rule applied, in one paragraph

**A file's scope is decided by what its assertions are evidence about, not by the wave, unit or directory it was
authored in.** **(1) e2e** — the assertions are about behaviour that exists only once **the shipped artifact
stands**: the drive reaches the system through the package's **declared entry point** (`import { storeCreate }
from 'provident-storeroom'`, the registry identity resolved through the `exports` map), or it needs the built
`storeroom_js_binding.node` behind that entry, or it assembles/installs a tree or a tarball, or it reads the
artifact's own identity across homes (the version stamp, the `files` allowlist, the workflow, the layer label);
its red tells you *the assembled package is red* and cannot tell you which module is. **(2) integration** — the
file reaches **one module by that module's own declared path** and drives **that module's declared endpoints**,
with the rest of the system either absent (the Rust crates: no Node runtime) or present only as fixture
scaffolding: the kernel at its checkout home `../src/constraint-kernel.mjs`, the store crate at
`storeroom_native`, the conversion core at the binding crate's `rlib` half; its red names the module. **(3) unit**
— the file's subject is **one declared signature and its guardrails**, asserted as a per-signature or per-class
domain table (a member set and its arity, a fifth argument position, the carrier folds' 56 variant rows, the
value table's 13 class rows) rather than as a state machine driven across the module's surface; it exists so that
an invention at L4 fails loudly. **Applied to this project's artifacts specifically:** a `*.test.mjs` that calls
`storeCreate({…})` and then exercises members is **e2e**, because the object it holds is the entry's product over
the built addon and every assertion it makes is an assertion about the assembled package — while a `*.rs` under
`tests/` that calls `storeroom_native::storeCreate(&StoreConfig{…})` is **integration**, because the crate is the
only boundary it crosses and no `.node`, no entry and no package exists in its process. A file whose header
states it drives *"the package's own boundary"*, *"the claimed ESM entry"*, *"the built/shipped artefact"*, the
`LIVE / ASSEMBLED PACKAGE` layer, or that it is **blind**, is e2e for that stated reason — the project's own
headers are the evidence, not my reading of their bodies.

**THE BLIND INSTANCES, AND WHERE THEY LAND.** The preset's e2e battery is *"the battery that drives the built
artifact through its declared entry points, **plus one blind instance per general-purpose surface**"*. This tree
already carries **seven** self-declared blind instances, and all seven go to `tests/e2e/` — one per
general-purpose surface, each authored from `docs/specs/**` alone: **`greens.mjs`** (the package entry's member
surface, `JSG`), **`blind-constraints-v2.mjs`** (the constraint kernel's caller-side surface, `E2E-C-*`),
**`held-listener-identity-greens.mjs`** (the held-listener-identity surface), **`json-crossing-blinded.test.mjs`**
(the JSON crossing, one `test()` per cell of `storeroom-json-crossing-greens.md`), **`file-tier-save/scenarios.mjs`**
(the `file`-tier save, `FTS`), **`json-acceptance-set-greens.mjs`** (the `file` tier's JSON codec as a declared
acceptance set, `JAS`), and **`consumer-fix/scenarios.mjs`** (the publish/version-stamp surface). The two **live**
runners are the same surfaces at the assembled layer, not further instances: `live-drive.mjs`,
`json-acceptance-set-live.mjs`, `json-crossing-live.mjs`, `json-crossing-live-s17.mjs`.

---

## §2 · The assignment table — 75 paths, each exactly once

**Legend.** *scope* is the preset's three; *driver* is one of the 19 ids in `modules.json` (never a battery id —
the four battery modules are the present-state owners, not the model's homes); *layer* is what the file reports,
in the preset's vocabulary, mapped from this project's own labels: `ENVELOPE/PURE` → **envelope**,
`LIVE / ASSEMBLED PACKAGE` (and *loaded in dev*) → **assembled**, `LIVE/INSTALL` (an installed-from-the-registry
reach) → **installed**, and the `APP` layer → **app**. **No file in the inventory reports `installed` or `app`;
that is a finding, not an omission (§4).**

### §2.1 `tests/e2e/` — 33 files

**The ten `bindings/js/greens/` entries below are declared `is_test: false` in the JSON, and they still take a
scope**: they *report* rather than assert (§4 Q6), and the preset's e2e scope is the one that holds a battery
plus its blind and live instances. A scope assignment does not turn an instrument into a test.

**`route`** is **`O3`** (publish-readiness: a staged tree, and the package reached by its **name** through
`exports`) or **`O4`** (earlier: the entry reached **by path**, which bypasses `exports`) — assigned per `D-6`'s
criterion of **purpose**, and declared at **§2.6**, whose calls this column is read with. **No row is blank.**

| # | present path | target | driver | layer | route | note |
|---|---|---|---|---|---|---|
| 1 | `bindings/js/test/surface.test.mjs` | `tests/e2e/surface.test.mjs` | `js-surface` | envelope | `O4` | the entry's construction, five verbs, failure form, records — *"at its own boundary"* |
| 2 | `bindings/js/test/registry.test.mjs` | `tests/e2e/registry.test.mjs` | `js-registry-delivery` | envelope | `O4` | handle, registry, delivery, the two registration verbs; also asserts the layer label read off `greens.mjs` |
| 3 | `bindings/js/test/convenience.test.mjs` | `tests/e2e/convenience.test.mjs` | `js-surface` | envelope | `O4` | **drives `on`/`off`, which are merged away and no longer members** (brief §3) — stale subject, see §4 Q3 |
| 4 | `bindings/js/test/ordering.test.mjs` | `tests/e2e/ordering.test.mjs` | `js-surface` | envelope | `O4` | the `A112`/`A115` ordering law *at the JS surface's own boundary*; spells no specifier — its reach is `constraint-kernel-helpers.mjs`'s (§2.6.6) |
| 5 | `bindings/js/test/round-trip.test.mjs` | `tests/e2e/round-trip.test.mjs` | `js-crossing` | envelope | `O4` | write→read equality through the entry; needs the addon |
| 6 | `bindings/js/test/addon-surface.test.mjs` | `tests/e2e/addon-surface.test.mjs` | `binding-facade` | envelope | `O4` | the artefact's export set, receiver, unwrap — *"reaches the artefact"* |
| 7 | `bindings/js/test/addon-surface-properties.test.mjs` | `tests/e2e/addon-surface-properties.test.mjs` | `binding-facade` | envelope | `O4` | the artefact's typed property layer (8 rows) |
| 8 | `bindings/js/test/addon-adoption.test.mjs` | `tests/e2e/addon-adoption.test.mjs` | `binding-facade` | envelope | `O4` | ABI adoption, build fetch, teardown; stages trees and reads hashes — **a substitute *build*, not a package tree** (§2.6.1) |
| 9 | `bindings/js/test/json-crossing.test.mjs` | `tests/e2e/json-crossing.test.mjs` | `js-crossing` | envelope | `O4` | the `JC-TC-*` acceptance set through the entry; **also imports the kernel by path** (`:124`); **four embedded child-drive specifiers** (§2.6.4) |
| 10 | `bindings/js/test/json-crossing-blinded.test.mjs` | `tests/e2e/json-crossing-blinded.test.mjs` | `js-crossing` | envelope | `O4` | **BLIND** — one `test()` per cell of the json-crossing greens set |
| 11 | `bindings/js/test/json-crossing-gate4-adversarial.test.mjs` | `tests/e2e/json-crossing-gate4-adversarial.test.mjs` | `js-crossing` | envelope | `O4` | adversarial/malformed battery *over the shipped package entry* |
| 12 | `bindings/js/test/negative-generators.test.mjs` | `tests/e2e/negative-generators.test.mjs` | `js-crossing` | envelope | `O4` | the tasked negative generators `NG-JS-*`, driven through the entry alone; **one arm assembles a copy of the package (`:1536-1572`) and its name reach is that arm's SUBJECT, so it is not the file's route** (§2.6.1 call 3) |
| 13 | `bindings/js/test/file-tier-save.test.mjs` | `tests/e2e/file-tier-save.test.mjs` | `js-registry-delivery` | envelope | `O4` | terminal arm, save order, durability boundary; boots real files; imports the kernel for `commit`/`runAttempt` |
| 14 | `bindings/js/test/file-tier-save-properties.test.mjs` | `tests/e2e/file-tier-save-properties.test.mjs` | `js-registry-delivery` | envelope | `O4` | the same amendment's typed property layer (8 rows) |
| 15 | `bindings/js/test/held-listener-identity-surface.test.mjs` | `tests/e2e/held-listener-identity-surface.test.mjs` | `js-surface` | envelope | `O4` | the 14-member set and the listener surface's states |
| 16 | `bindings/js/test/held-listener-identity-properties.test.mjs` | `tests/e2e/held-listener-identity-properties.test.mjs` | `js-surface` | envelope | `O4` | **spans surface and kernel (`P-HL-*`)** — assigned by dominant; split owed (§4 Q1); its name reach is **dynamic-only** (`:1096`), §2.6.5 |
| 17 | `bindings/js/test/constraints-publication.test.mjs` | `tests/e2e/constraints-publication.test.mjs` | `js-constraints` | envelope | `O4` | the two population routes at the surface; **also asserts `delivery`'s `files` allowlist** — split owed; that limb is **`O3`-shaped inside an `O4` file** (§2.6.1 call 6) |
| 18 | `bindings/js/test/package-entry.test.mjs` | `tests/e2e/package-entry.test.mjs` | `delivery` | envelope | **`O3`** | the package at its boundary: `exports` map, engines, licence, `HO-*` realms, `.node` load count — **its subject IS the packaged resolution; it stages nothing today and adopts the tree's manifest** (§2.6.1 call 1) |
| 19 | `bindings/js/test/register.test.mjs` | `tests/e2e/register.test.mjs` | `js-registry-delivery` | envelope | `O4` | the register layer's JS half; **`S-LAYER` reads its label off `greens/greens.mjs`** (§3 F1); name reach **dynamic-only** (`:91`), §2.6.5 |
| 20 | `bindings/js/test/version-stamp.test.mjs` | `tests/e2e/version-stamp.test.mjs` | `delivery` | envelope | **`O3`** | the stamp's homes, the pre-publish guard, `P-PUB-9`/`P-PUB-10`; **assembles a full scratch tree** (manifest + entry copy + `node_modules/<platform name>` + a `build/Release` candidate) — §2.6.1 call 2 |
| 21 | `bindings/js/test/version-stamp-r2.test.mjs` | `tests/e2e/version-stamp-r2.test.mjs` | `delivery` | envelope | `O4` | the `R2` source-assertion set under the architect's `(a)`; **no entry reach at all — byte assertions of the stamp's source sites** (§2.6.1 call 4) |
| 22 | `bindings/js/test/publish.test.mjs` | `tests/e2e/publish.test.mjs` | `delivery` | envelope | **`O3`** | the 62-cell publish red set; **declares its own home (`PUB-DD-24`)** — see §4 Q5; **`makeScratch`/`coveredEnv` is the precedent `D-6` cites** |
| 23 | `bindings/js/test/publish-generators.test.mjs` | `tests/e2e/publish-generators.test.mjs` | `delivery` | envelope | **`O3`** | `NG-PUB-A`…`J`, each with a staged control copy outside the repo |
| 24 | `bindings/js/greens/greens.mjs` | `tests/e2e/greens.mjs` | `js-surface` | envelope | `O4` | **BLIND** (`JSG`), 16 scenarios; reaches by path (`:196`); **its `JSG-12.18` allowlist cell is `O3`-shaped inside an `O4` file** (§2.6.1 call 6) |
| 25 | `bindings/js/greens/live-drive.mjs` | `tests/e2e/live-drive.mjs` | `js-surface` | assembled | `O4` | `LIVE / ASSEMBLED PACKAGE`, real process, real file I/O; `ENTRY = path.resolve(HERE,'..','index.mjs')` (`:35`) |
| 26 | `bindings/js/greens/blind-constraints-v2.mjs` | `tests/e2e/blind-constraints-v2.mjs` | `js-constraints` | envelope | `O4` | **BLIND** (`E2E-C-*`), reached through the kernel's declared caller-side path; `new URL('../index.mjs', …)` (`:28`) |
| 27 | `bindings/js/greens/held-listener-identity-greens.mjs` | `tests/e2e/held-listener-identity-greens.mjs` | `js-surface` | envelope | `O4` | **BLIND**; imports the entry and the kernel's checkout home (`:110`, `:117`) |
| 28 | `bindings/js/greens/json-acceptance-set-greens.mjs` | `tests/e2e/json-acceptance-set-greens.mjs` | `store-value` | envelope | `O4` | **BLIND** (`JAS`): the `file` tier's JSON codec as a declared acceptance set (`:55`) |
| 29 | `bindings/js/greens/json-acceptance-set-live.mjs` | `tests/e2e/json-acceptance-set-live.mjs` | `store-value` | assembled | `O4` | the same set re-driven against the real built package (`:51`) |
| 30 | `bindings/js/greens/json-crossing-live.mjs` | `tests/e2e/json-crossing-live.mjs` | `js-crossing` | assembled | `O4` | the 144-cell live battery; `JC_ENTRY` also reaches **installed** (a published tarball) — **a path from the environment, not a staged tree, so it stays `O4`** |
| 31 | `bindings/js/greens/json-crossing-live-s17.mjs` | `tests/e2e/json-crossing-live-s17.mjs` | `js-crossing` | assembled | `O4` | the six `§17` boundary laws, kept out of the 144-cell census deliberately; `JC_ENTRY ?? HERE/../index.mjs` (`:50`) |
| 32 | `bindings/js/greens/consumer-fix/scenarios.mjs` | `tests/e2e/consumer-fix/scenarios.mjs` | `delivery` | envelope | **`O3`** | **BLIND** (gate 5); reports `SOURCE-PINNED` verdicts off repo bytes as well as the artifact — **publish-readiness by purpose with NO entry reach today** (§2.6.1 call 5) |
| 33 | `bindings/js/greens/file-tier-save/scenarios.mjs` | `tests/e2e/file-tier-save/scenarios.mjs` | `js-registry-delivery` | envelope | `O4` | **BLIND** (`FTS`), 96 cells, its own exit rule (FAIL **and** CONFLICT); `await import('../../index.mjs')` (`:32`) |

*(**33 rows, 33 files**: 23 from `bindings/js/test/` + 10 from `bindings/js/greens/`; the arithmetic is §2.4.
**Routes: `O3` 5 · `O4` 28 ✓** — by battery, `bindings/js/test/` 23 → **4 `O3` + 19 `O4`** and
`bindings/js/greens/` 10 → **1 `O3` + 9 `O4`**.)*

### §2.2 `tests/integration/<module>/` — 29 files

**`route`: `none, by design` for 28 of these**, and `O4` for one — **they reach a module by that module's own
declared path** (the store crate, the binding crate's `rlib`, the kernel at `../src/constraint-kernel.mjs`) with
no `.node`, no entry and no package in the process. **The exception is `held-listener-identity-gate4-regressions`**,
which spells the package name at its own `:45`; §2.6.3 states both counts and the helper-inherited reach that a
per-scope answer would hide.

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `tests/construction.rs` | `tests/integration/store-core/construction.rs` | `store-core` | envelope | contract §7: construction, probe, boot |
| 2 | `tests/construction_access_probe.rs` | `tests/integration/store-core/construction_access_probe.rs` | `store-core` | envelope | `U-STOREROOM-ACCESS-PROBE`'s driving cells |
| 3 | `tests/write_arms.rs` | `tests/integration/store-core/write_arms.rs` | `store-core` | envelope | contract §3, the closed arm table |
| 4 | `tests/read_and_delete.rs` | `tests/integration/store-core/read_and_delete.rs` | `store-core` | envelope | contract §4 |
| 5 | `tests/tiers_and_purge.rs` | `tests/integration/store-core/tiers_and_purge.rs` | `store-core` | envelope | contract §5 |
| 6 | `tests/journal_and_rollback.rs` | `tests/integration/store-core/journal_and_rollback.rs` | `store-core` | envelope | contract §6 |
| 7 | `tests/walk_and_resolver.rs` | `tests/integration/store-core/walk_and_resolver.rs` | `store-core` | envelope | contract §2 |
| 8 | `tests/watched_addresses.rs` | `tests/integration/store-core/watched_addresses.rs` | `store-core` | envelope | §6.5: the registration surface and the journal half |
| 9 | `tests/record_shapes.rs` | `tests/integration/store-core/record_shapes.rs` | `store-core` | envelope | §1: node kinds, anchor, link, register (the value taxonomy is `store-value`'s) |
| 10 | `tests/e2e_json_round_trip.rs` | `tests/integration/store-core/e2e_json_round_trip.rs` | `store-core` | envelope | **the name claims `e2e`**; it runs under `cargo test` in-process — §4 Q2 |
| 11 | `tests/e2e_listener_firing.rs` | `tests/integration/store-core/e2e_listener_firing.rs` | `store-core` | envelope | same naming collision |
| 12 | `tests/properties.rs` | `tests/integration/store-core/properties.rs` | `store-core` | envelope | the register's executed layer, 8 rows, pinned seed |
| 13 | `tests/fail_codes.rs` | `tests/integration/store-fail-set/fail_codes.rs` | `store-fail-set` | envelope | one drive per member of the closed set + the generated messages |
| 14 | `tests/gate4_red_set_fix.rs` | `tests/integration/store-args/gate4_red_set_fix.rs` | `store-args` | envelope | its subject is the construction's and the listeners' outside values (the carriers) |
| 15 | `bindings/js/tests/crossing_copy.rs` | `tests/integration/binding-crossing/crossing_copy.rs` | `binding-crossing` | envelope | the copy discipline and the equality relation |
| 16 | `bindings/js/tests/register_layer.rs` | `tests/integration/binding-crossing/register_layer.rs` | `binding-crossing` | envelope | the register layer's RUST half (5 of 8 rows) |
| 17 | `bindings/js/tests/surface_verbs.rs` | `tests/integration/binding-crossing/surface_verbs.rs` | `binding-crossing` | envelope | the verb-level layer, driven through the conversion core |
| 18 | `bindings/js/tests/addon_adoption.rs` | `tests/integration/binding-crossing/addon_adoption.rs` | `binding-crossing` | envelope | the adoption unit's Rust half (lifetime/registry) |
| 19 | `bindings/js/test/held-listener-identity-kernel.test.mjs` | `tests/integration/js-constraints/held-listener-identity-kernel.test.mjs` | `js-constraints` | envelope | the kernel's selection/removal law; reached by the kernel helper |
| 20 | `bindings/js/test/held-listener-identity-gate4-regressions.test.mjs` | `tests/integration/js-constraints/held-listener-identity-gate4-regressions.test.mjs` | `js-constraints` | envelope | the four gate-4 findings, `K-6`'s non-enumeration among them |
| 21 | `bindings/js/test/held-listener-identity-refusal-restore.test.mjs` | `tests/integration/js-constraints/held-listener-identity-refusal-restore.test.mjs` | `js-constraints` | envelope | the purge order's wake; **reaches its subject through the entry** — arguably e2e (§4 Q1) |
| 22 | `bindings/js/test/constraint-kernel-deliverymodel.test.mjs` | `tests/integration/js-constraints/constraint-kernel-deliverymodel.test.mjs` | `js-constraints` | envelope | the two ordered delivery layers and the order law |
| 23 | `bindings/js/test/constraint-kernel-layers.test.mjs` | `tests/integration/js-constraints/constraint-kernel-layers.test.mjs` | `js-constraints` | envelope | layer (a)/(b) and `CommitRecord.pending` |
| 24 | `bindings/js/test/constraint-kernel-states.test.mjs` | `tests/integration/js-constraints/constraint-kernel-states.test.mjs` | `js-constraints` | envelope | the `KC` arms, repair, log, per-op rollback |
| 25 | `bindings/js/test/constraint-kernel-rollback.test.mjs` | `tests/integration/js-constraints/constraint-kernel-rollback.test.mjs` | `js-constraints` | envelope | the `A111` re-derivation of the rollback target |
| 26 | `bindings/js/test/constraint-kernel-deltamodel.test.mjs` | `tests/integration/js-constraints/constraint-kernel-deltamodel.test.mjs` | `js-constraints` | envelope | the delta model's arms |
| 27 | `bindings/js/test/constraint-kernel-negatives.test.mjs` | `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs` | `js-constraints` | envelope | the negative arms and the discard |
| 28 | `bindings/js/test/constraint-kernel-properties.test.mjs` | `tests/integration/js-constraints/constraint-kernel-properties.test.mjs` | `js-constraints` | envelope | the kernel's typed property layer, 21 rows × ≤19 |
| 29 | `bindings/js/test/constraint-kernel-repairop.test.mjs` | `tests/integration/js-constraints/constraint-kernel-repairop.test.mjs` | `js-constraints` | envelope | the repair-op seam and its malformed-return arm |

### §2.3 `tests/unit/<module>/` — 5 files

**`route`: `none, by design` for 3 of these** (`constraint-kernel.test.mjs` reaches the kernel through the
helper; both `crossing_*` files reach the `rlib`), and **`O4` for 2** — `a127-surface.test.mjs:72` and
`a126-constraint-methods.test.mjs:46` both import the package **by name**, so both must be re-spelled by a route
(§2.6.3, §2.6.4).

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `bindings/js/test/a126-constraint-methods.test.mjs` | `tests/unit/js-constraints/a126-constraint-methods.test.mjs` | `js-constraints` | envelope | the three constraint methods' signatures: add/overwrite, the two idempotent toggles, the carriage pre-condition, the one `TypeError` |
| 2 | `bindings/js/test/a127-surface.test.mjs` | `tests/unit/js-surface/a127-surface.test.mjs` | `js-surface` | envelope | one export, the member set, `write`'s fifth position, the two refusal rules — **a signature pin**; its `THE_TWELVE` constant is already named as owed a re-derivation |
| 3 | `bindings/js/test/constraint-kernel.test.mjs` | `tests/unit/js-constraints/constraint-kernel.test.mjs` | `js-constraints` | envelope | *"the five-item surface and its argument / return shapes"* — per-signature domains and guardrails |
| 4 | `bindings/js/tests/crossing_carriers.rs` | `tests/unit/binding-crossing/crossing_carriers.rs` | `binding-crossing` | envelope | the 8 carriers over 56 variant rows — the folds' per-signature domains |
| 5 | `bindings/js/tests/crossing_values.rs` | `tests/unit/binding-crossing/crossing_values.rs` | `binding-crossing` | envelope | the value table's 13 class rows — the conversion's per-class domain |

### §2.4 The arithmetic

**e2e 33 · integration 29 · unit 5 · helpers and non-tests 8 · total 75 ✓.**
**Routes across those 75: `O3` 5 · `O4` 33 · none-by-design 37 — the 33 e2e cells all carry a tag, the two
helpers take `O4` as well (their reach is the name, §2.6.6), three integration/unit files take `O4` between them,
and every route-null file's null is a stated answer and not a blank (§2.6.3).**
By directory: `tests/` 15 → 14 integration + 1 helper · `bindings/js/tests/` 7 → 4 integration + 2 unit +
1 helper · `bindings/js/test/` 42 → 23 e2e + 11 integration + 3 unit + 4 helpers + 1 record ·
`bindings/js/greens/` 11 → 10 e2e + 1 set document. **No path is assigned twice and none is omitted**; the
machine-readable form is `docs/L1/test-stratification.json`.

### §2.5 Helpers and non-tests — declared separately, and deliberately not tests

| present path | target | consumed by | route | what it is |
|---|---|---|---|---|
| `tests/support/mod.rs` | `tests/integration/support/mod.rs` | integration (every `tests/*.rs`) | none, by design | the store crate's one scaffolding module: the spellings, the corpus, `support::Drive`'s caps |
| `bindings/js/tests/support/mod.rs` | `tests/integration/binding-crossing/support/mod.rs` | integration | none, by design | the binding crate's shared harness: corpus, equality relation, deterministic generator |
| `bindings/js/test/constraint-kernel-helpers.mjs` | `tests/integration/js-constraints/constraint-kernel-helpers.mjs` | **e2e (2) + integration (9) + unit (1)** | **`O4`** | fixtures and assertions for the constraints red set — **a helper consumed by all three scopes**; its name reach is the `O4` path (§2.6.6) |
| `bindings/js/test/held-listener-identity-helpers.mjs` | `tests/integration/js-constraints/held-listener-identity-helpers.mjs` | **e2e (2) + integration (3)** | **`O4`** | the handle/listen domains and the two refusal forms — **a helper consumed by two scopes** |
| `bindings/js/test/addon-surface-support.mjs` | `tests/e2e/addon-surface-support.mjs` | e2e | none (no specifier; `PACKAGE_DIR` joins only) | the addon-surface red set's declared figures (`DECLARED_SURFACE`, `THE_THREE_THAT_ARE_NOT_ENTRIES`, `OPEN_OWED`) |
| `bindings/js/test/addon-adoption-support.mjs` | `tests/e2e/addon-adoption-support.mjs` | e2e | none (no specifier) | the adoption statement and what the landing pass must provide |
| `bindings/js/test/REMEASURE-2026-10-18.md` | `tests/e2e/REMEASURE-2026-10-18.md` | nothing | none | **not a test and not a helper**: the red set's own measurement record, read by no code |
| `bindings/js/greens/file-tier-save/file-tier-save-greens.md` | `tests/e2e/file-tier-save/file-tier-save-greens.md` | e2e (the `FTS` runner's set) | none | the blind set the runner drives, cell for cell; authored, never imported |

**The two cross-scope helpers are the only files whose honest answer is "consumed by several scopes", and they
are declared here rather than assigned.** Their target sits under the module that owns the subject; a scope that
imports them reads across a directory, which is lawful (`node --test` follows imports) but means the integration
directory is load-bearing for **one unit file and four e2e files** — `ordering` and `constraints-publication`
through `constraint-kernel-helpers`, `held-listener-identity-surface` and `-properties` through
`held-listener-identity-helpers`. **§2.6.3 corrects this section's own earlier count** (8 integration → 9 for
`constraint-kernel-helpers`, whose two e2e consumers were missing) and **§2.6.6 records the route finding those
consumers carry.**

---

## §2.6 · The route — `O3` / `O4`, per `D-6`

**This section is `D-6`'s answer, declared where the blocker was.** It adds a **route** to every e2e cell,
states what the other two scopes' route is, declares the staged tree, and names the re-spellings. **It decides
no label** (`F3`, `F4` stand open — §2.6.7) and **builds nothing on the one reading `D-6` marks as inference**
(§2.6.7). **It moves no file and edits no test.**

### §2.6.1 The rule, the counts, and the borderline calls

**THE RULE.** `D-6`'s criterion is **purpose, not layer**. A cell whose subject is **whether the package as
shipped resolves and runs** takes **`O3`**: it assembles a package tree into a scratch `node_modules` and
imports the package **by its name from inside that tree**, passing through the package's **`exports` map** *and*
through an install-shaped tree. **Every other cell takes `O4`**: it reaches `bindings/js/index.mjs` **by path**,
which resolves the addon ladder from the entry's own directory and **bypasses `exports`**. **The tag is assigned
per file**, from the file's own header, its own specifier and the reach it spells — **never from its scope**, and
**never from whether it is a test**: the preset's three scopes cut across both routes, and a route may be
**inherited from a helper** (§2.6.6). The evidence per row is in §2.1's note column: the specifier each file
spells, or the path it computes.

**COUNTS.** **`O3` 5 · `O4` 28 · 33 ✓** — `bindings/js/test/` 23 → **4 `O3`** (`publish`, `publish-generators`,
`version-stamp`, `package-entry`) **+ 19 `O4`**; `bindings/js/greens/` 10 → **1 `O3`**
(`consumer-fix/scenarios`) **+ 9 `O4`**.

**THE BORDERLINE CALLS — six, each defended in one line, and none left silent.**

1. **`package-entry.test.mjs` → `O3`, though it stages nothing.** Its subject *is* the packaged resolution — its
   own header says the identity is *"reached as a SELF-REFERENCE through its `exports` map — which is also
   `DD-24`'s drive"* — and it asserts the one arms-bearing arm (`:82`), the refused wildcard and deep import
   (`:97`, `:136`), the single `.node` load (`:54`) and the engines/licence; **a path route would delete the very
   claim it exists to make**, so it takes `O3` and **adopts the staged tree's manifest** for its byte reads
   (today `PACKAGE_DIR/package.json`, `:30`). **★ and it must not inherit its state-(2) arm blindly**: that arm
   pins `MODULE_NOT_FOUND` *because* `bindings/js/node_modules` does not exist (`:150-154`) — **a state the
   staged tree removes**, so the migration restates that arm rather than carrying it across.
2. **`publish.test.mjs`, `publish-generators.test.mjs`, `version-stamp.test.mjs` → `O3`: each assembles a tree,
   whatever its subject.** `publish`'s `makeScratch`/`coveredEnv` **is** the precedent `D-6` cites;
   `publish-generators` drives the same idiom with staged **control** copies outside the repository;
   `version-stamp` assembles `<scratch>/{package.json, index.mjs, node_modules/<platform name>/…, build/Release/…,
   preload.cjs, driver.mjs}` and reads the stamp off the loaded artefact and the pre-publish guard. **A
   behaviour subject does not demote a cell that assembles the install shape** — that is the ruling's own words.
3. **`negative-generators.test.mjs` → `O4`, though one arm assembles a copy of the package.** That copy
   (`:1536-1572`) is not the cell's route, it is the cell's **subject** — *"a bare specifier resolved from a file
   UNDER the copy resolves to the copy through its `package.json`"* — while the file's own reach is the checkout
   entry (`:66`); and **tagging it `O3` would move ~60 crossing cells into a staged tree the ruling does not ask
   them to enter.** **The consequence is a hard constraint on the migration: its embedded specifier at `:1550`
   must NOT be re-spelled** — there, the name is the assertion. *(This is the call most open to the architect's
   correction: it is the one file where "assembles a tree" and "the file's own route" point the same way and
   disagree.)*
4. **`version-stamp-r2.test.mjs` → `O4`, and it reaches no entry at all.** Its subject is the stamp's **source**
   sites — `package.json`, `bindings/js/Cargo.toml`, `build.rs` and three specification documents, all read as
   bytes (`:311-330`, `:1960`) — not resolution and not running, so **`D-6`'s criterion does not reach it**. It is
   tagged `O4` because it is an earlier-set cell, and **its route is `none` in words rather than blank**: it has
   no specifier to re-spell.
5. **`consumer-fix/scenarios.mjs` → `O3`, with no entry reach today.** Its subject is the publish/version-stamp
   surface as a consumer meets it, and its own header records why it cannot drive the entry: *"the entry-level
   refusal cannot be driven by this pass: `index.mjs` is behind the implementation wall, and no published platform
   package exists to install"* (`:361-365`). So it is **publish-readiness by purpose and route-less by
   construction** — and `O3`'s staged tree is **the first instrument that could give it a subject**. **Whether it
   should take one is the test layer's to declare, not this pass's.**
6. **Two `O3`-shaped limbs sit inside `O4` files, and no cut is drawn** (the Q1 convention, preserved):
   **`greens.mjs`'s `JSG-12.18`** — the `files` allowlist's exact set equality at `:1205`, with the fifth entry
   and the looser form refused at `:1211` — and **`constraints-publication.test.mjs`'s allowlist assertion**. Both
   **read manifest bytes** rather than make a reach, so **neither forces its file's route**; both appear in §5's
   migration consequence, because the count's retirement hits them.

### §2.6.2 What `O3`'s staged tree contains — the declaration

**Following the tree's own precedents, not inventing a shape.** `D-6` makes this design the declaration's to
state; the four answers it names are given below, each citing the existing idiom it follows.

- **Which files it copies — the `files` allowlist as the manifest carries it.** `index.mjs`, `README.md`,
  `index.d.ts` and — **today** — `src/constraint-kernel.mjs` (the fourth entry), staged under
  `node_modules/provident-storeroom/`, with **the tree's own `package.json`** carrying `name`, `version`, `type`,
  `exports` and `optionalDependencies` **as the shipped manifest carries them**. **The precedent is exact**:
  `publish.test.mjs:711-715` writes that manifest (`exports: {'.': {import: './index.mjs'}}`) beside a
  byte-for-byte copy of the entry; and the **`typecheck` stage** (`package.json:8`, `typecheck:stage`) stages the
  *minimum* a name-resolved consumer needs — `package.json` + `index.d.ts` into
  `typecheck/node_modules/provident-storeroom` — which is the name route proven end-to-end for `tsc`. **The
  allowlist is copied as a fact of the tree and not as a rule** (`D-3`, `D-4`): when the fourth entry retires,
  the tree loses that file and nothing else about the shape moves.
- **How the addon is staged — as a platform package, not as the checkout's `build/Release`.** Rung one is
  `node_modules/@auspicion/<one of the five declared names>/`, with the artefact as that package's `main` —
  exactly what both publish batteries compose (`writeStub`, `writeArtefact`) and exactly the names the manifest's
  `optionalDependencies` pin. **The checkout's `build/Release` is NOT copied**, for two declared reasons: the
  prohibitions forbid `build/Release` in the tarball (`P-PUB-7`, `JSG-12.18`), and **rung two is precisely the
  rung an install shape must not lean on**. **Where a cell's subject *is* rung two, the tree writes its own
  candidate** (`makeScratch({rungTwo})`, `version-stamp`'s `build/Release`) — never the checkout's bytes.
- **How the tree is isolated per cell — one root per file, one tree per cell, every drive a subprocess.**
  `publish.test.mjs` mints one `SCRATCH_ROOT` per file under the OS temporary area (`:404`) and one `mkdtemp` tree
  per environment beneath it (`:705`), then runs every drive as
  `execFileSync(process.execPath, ['--require', preload, driver, entry])` with `cwd` = that tree and `NODE_PATH` =
  its `node_modules` (`:744-763`); `version-stamp` does the same (`:574`, `:647-674`);
  `publish-generators` adds a second root for its controls (`:189-190`). **Nothing of the repository is written,
  renamed or removed** — a control's mutant entry is staged in the temp area (`:706-711`) — and each file sweeps
  its root on exit.
- **Whether one tree may serve several cells — yes, but only where the cells differ by environment and not by
  tree contents.** `makeScratch`'s `env` lever (and `coveredEnv`'s options) is exactly that permission: a cell
  that changes only `PUBRED_*` reuses nothing structurally and still mints its own tree; **a cell whose subject is
  the tree's contents always mints its own.** **No tree is ever shared across files.**
- **★ THE ONE PIECE THE PRECEDENT DOES NOT SUPPLY, DECLARED RATHER THAN ASSUMED.** `D-6`'s `O3` has two halves —
  an **install-shaped tree** *and* an import **by name** through `exports`. **The precedent supplies the first
  half and a *rung-one* name reach**: `publish.test.mjs`'s driver imports the entry as
  `await import(process.argv[2])` (`:466`) — **by path inside the tree** — and reaches only the *artefact* by
  name. **No single existing cell does both at once.** The name-through-`exports` half exists in this tree in two
  other places: the package **self-reference** that 19 e2e files spell (a name reach through `exports`, with no
  staged tree) and **`negative-generators`' copy** (`:1539-1572`). So **`O3`'s mechanism is those precedents
  combined** — the `typecheck` stage's resolution site carrying the `publish` tree's contents — and this pass
  **declares the composition and invents no shape**. **It also states the test that would falsify it: a drive
  whose import site stands inside the tree and spells the package's name resolves through `exports` or the route
  is not being exercised.** *(Not measured — no shell in this pass; §7.)*

### §2.6.3 The integration and unit scopes: `none, by design`, with three named exceptions

**Stated plainly rather than left silent, because the silence would read as an omission.**

- **`tests/integration/<module>/` — 28 of 29 have no entry reach, by design.** The Rust legs reach the crate
  (`storeroom_native`, the binding crate's `rlib`) and the kernel legs reach `../src/constraint-kernel.mjs` **by
  that module's own declared path**. No `.node`, no entry, no package. **Their route is `none`, and that is the
  answer.**
- **The exception is `held-listener-identity-gate4-regressions.test.mjs`**, which spells
  `import { storeCreate } from 'provident-storeroom'` at `:45` — **kernel law is its subject, the entry is its
  reach** — so it takes **`O4`** with the e2e set and is re-spelled with it.
- **`tests/unit/<module>/` — 3 of 5 are route-free**; **`a127-surface.test.mjs:72`** and
  **`a126-constraint-methods.test.mjs:46`** both import the package **by name**, so both take **`O4`**: their
  subject is a signature pin and not a resolution, so a path route preserves them exactly.
- **★ AND A REACH THAT A PER-SCOPE ANSWER WOULD HIDE — the helpers.** `constraint-kernel-helpers.mjs` is imported
  by **9 integration files + 1 unit file + 2 e2e files**, and `held-listener-identity-helpers.mjs` by **3
  integration + 2 e2e**. **Both helpers reach the entry by name**, so **those ten integration/unit files inherit
  an entry reach they do not spell.** That is correct for their subjects — but it means the integration scope is
  **not** entry-free, and **the route is therefore stated per file and never per scope.**

### §2.6.4 The re-spellings, by route

**All 24 files that carry the bare specifier `'provident-storeroom'` today are re-spelled — 22 tests + the two
helpers** (see §2.6.5 for why this is 24 and not `D-6`'s 19). **The spelling each one becomes is decided by its
route, and the two routes take different mechanisms because they make different claims.**

**`O3` — 2 files carry the name**: `publish.test.mjs:4277` and `package-entry.test.mjs:38`, both
`await import('provident-storeroom')`.
- **The specifier does not move within the test file; it moves into the tree.** From `tests/e2e/` **no** file can
  resolve a package by name, so an `O3` cell's name reach must be spelled **in a driver staged inside the staged
  tree** — the `execFileSync(process.execPath, [driver])` / `--require preload` shape both publish batteries
  already run. **It must NOT be "fixed" to a path inside the tree**: a path there bypasses `exports` and voids
  the route it was tagged for.
- **`package-entry`'s byte reads re-point too** (`PACKAGE_DIR/package.json` → the tree's manifest), for the same
  reason: the cell's subject is the *shipped* shape, which is the tree's.
- **The other three `O3` files spell no name of their own** — `publish-generators` composes artefacts,
  `version-stamp` reaches the entry by path-in-tree and rung one by name, `consumer-fix` reaches nothing — so
  **they have nothing to re-spell and are listed here so the absence is explicit.**

**`O4` — the remaining 20 test files** (**all 17** of the test files `D-6` names, plus **3** its census omits:
`register`, `held-listener-identity-properties`, `a126-constraint-methods`):
- **The specifier becomes a path to the entry** — `bindings/js/index.mjs`, written relative from the new tree —
  which resolves the addon ladder **from the entry's own directory** (rung two, exactly as a name route does) and
  **bypasses `exports`**. **That bypass is the route's declared cost**, and it is why the `exports` claim is
  `O3`'s to make.
- **Two files need the re-spelling a second time, in embedded child-drive source**: `json-crossing.test.mjs`'s
  four `CHILD_*_SOURCE` templates (`:1719`, `:2330`, `:2830`, `:5025`) and `negative-generators.test.mjs`'s
  (`:1550`) — **and they point in opposite directions.** For `json-crossing` the child's specifier is a reach and
  must become a path **computed for the child's own location**; for `negative-generators` it is the assertion and
  **must stay the name** (§2.6.1 call 3). A mechanical sweep that re-spells both has broken one of them.
- **Three files carry the name only through a dynamic `await import(...)`** — `register.test.mjs:91`,
  `held-listener-identity-properties.test.mjs:1096`, `a126-constraint-methods.test.mjs:46` — and they are `O4`
  like their neighbours (§2.6.5).

**The two helpers — both `O4`, and §2.6.6 says why that is contingent.**

### §2.6.5 A measured correction to `D-6`'s census — recorded, put to the architect, not decided

**`D-6` names 19 files as carrying the bare specifier: 17 `*.test.mjs` plus the two helpers.** **Measured on this
branch by `grep` over `bindings/js/`, the figure is 24 — 22 test files + the two helpers.** The five files
`D-6`'s list does not carry are **`register.test.mjs`, `held-listener-identity-properties.test.mjs`,
`a126-constraint-methods.test.mjs`, `publish.test.mjs`, `package-entry.test.mjs`**, and they share one shape:
**their only occurrence is a dynamic `await import('provident-storeroom')`**, where **all 17 of the named files
spell a top-level static `import … from 'provident-storeroom'`**. **So `D-6`'s census appears to count static
imports** — that reconciliation is **my inference and is marked as one**, not as the ruling's meaning. **The five
are owed the same re-spelling by the same route rule**, and this pass tags and routes them rather than leaving
them out. Of the 22: **19 are e2e, 1 integration, 2 unit.**

### §2.6.6 The helpers: one mechanism serves both kinds today, and that is contingent — the finding

- **`constraint-kernel-helpers.mjs` → `O4`.** Imported by **2 e2e** (`ordering`, `constraints-publication`),
  **9 integration** (`held-listener-identity-kernel`, `constraint-kernel-deliverymodel`, `-rollback`,
  `-deltamodel`, `-layers`, `-states`, `-negatives`, `-repairop`, `-properties`) and **1 unit**
  (`constraint-kernel.test.mjs`) — **12 files, not the 8+1 this declaration's own §2.5 recorded**; that count is
  corrected here and in `test-stratification.json`'s `consumed_by`.
- **`held-listener-identity-helpers.mjs` → `O4`.** Imported by **2 e2e** (`held-listener-identity-surface`,
  `-properties`) and **3 integration** (`-kernel`, `-refusal-restore`, `-gate4-regressions`) — 5, as §2.5 says.
- **★ THE FINDING.** **A single `import` statement cannot be both a name reach and a path reach.** So **any
  helper consumed by cells of *both* routes must carry both mechanisms** — a name arm resolved inside the staged
  tree and a path arm for everything else — and the two cannot be one spelling. **Today that bifurcation is not
  owed: neither helper is imported by any `O3` cell** (`O3`'s five files import no helper at all). **It becomes
  owed the moment an `O3` cell imports one** — and because **the helpers are the only cross-route seam this
  declaration contains**, the migration wave must **re-check this negative file by file** rather than trust it.
  **That contingency is the finding; the current `O4` answer is a measurement, not a principle.**

### §2.6.7 The route is not the label, and one reading stays open

- **`D-6` answers no label question, and this pass answers none either.** **`F3`** — whether a `.node`-loading
  checkout cell is labelled `assembled` or `envelope` — and **`F4`** — the absence of an installed-from-the-
  registry green — **stand exactly as §3 records them, unanswered.** A route records **how a cell reaches the
  package**; §2's layer column records **what it reports**. They are independent and must not collapse: an `O4`
  cell can be `assembled` (`live-drive`), an `O3` cell can be `envelope` (`publish`), and **no `O3` tag upgrades
  any file's layer.** `O3` is install-**shaped**, not installed: **it produces no `installed` green**, and `F4`'s
  driver is still owed.
- **★ THE OPEN READING, RECORDED AND NOT BUILT ON.** `D-6` carries L0's reading — *the packaged-resolution
  (`exports`) claim lives **exclusively** in the `O3` set* — as **inference awaiting the architect's
  confirmation**, and says so by name. **This pass's tagging is consistent with it and does not establish it.**
  What §2.6 actually shows is narrower: **the re-spelling moves the `exports` reach out of the `O4` cells**
  (their path route bypasses the map) — **not** that any earlier-set claim is thereby retired, and **not** that a
  packaged-resolution cell may not be added to the earlier set. **No design below may cite this section as having
  decided it.** It is put to the architect as **§4 Q10**.

---

## §3 · The layer-preservation clause

**The project's rule (`strata/brief.md` §5 item 8, `docs/guides/electron-integration.md`'s ladder): a green is
always reported with its layer, the ladder is *envelope* → *loaded in dev* → *loaded in the packaged app* →
*installed from the registry*, and a green on one layer does not retire a red on another.** The move changes no
file's label, and this section states what each scope's battery reports **and what the move would cost if the
labels were not carried with the files.**

| scope | the layers its battery reports | evidence read off the files |
|---|---|---|
| `tests/e2e/` | **envelope** (29 files), **assembled** (4: `live-drive`, `json-acceptance-set-live`, `json-crossing-live`, `json-crossing-live-s17`); **installed** is *declared but unexercised* (`json-crossing-live.mjs`'s `LIVE/INSTALLED` reach via `JC_ENTRY`); **app** — never, by declaration (`APP LAYER: NONE` in every runner, `DD-20`) | the `LAYER:`/`const LAYER` heads of `greens.mjs`, `held-listener-identity-greens.mjs`, `live-drive.mjs`, `json-acceptance-set-greens.mjs`, `json-acceptance-set-live.mjs`, `json-crossing-live.mjs`; `publish.test.mjs`'s `P-PUB-8` (`ENVELOPE/PURE`); `register.test.mjs`'s `S-LAYER`; `package-entry.test.mjs`'s `S-LAYER` |
| `tests/integration/<module>/` | **envelope only**, and *by construction*: no `.node`, no entry, no process boundary — the Rust legs (`cargo test`) and the kernel legs (in-process) | `docs/specs/storeroom-publish/contract.md` §4.5 item 2 declares both Rust legs `ENVELOPE/PURE`; the kernel's files print no `LIVE` label |
| `tests/unit/<module>/` | **envelope only**, at the signature level: no state machine crosses a boundary, so no higher layer can be claimed | `a126`/`a127`'s own headers (specification-only, no artifact read); `crossing_*`'s `rlib`-only reach |

**FINDINGS — reporting that the move would *lose*, surfaced rather than absorbed:**

**⟶ AND THE ROUTE DOES NOT TOUCH ANY OF IT.** `D-6` settles **how a cell reaches the package**, not **what it
reports**: **no route tag in §2.1 upgrades, downgrades or re-labels a file**, and **`F3` and `F4` below are
answered by neither `D-6` nor this pass.** `O3` is install-**shaped** and not installed, so it mints **no
`installed` green**; an `O4` cell that loads the built `.node` is `assembled`/`envelope` by the same open question
it was before. **A reader who takes the route tag as a layer answer has collapsed two questions this declaration
keeps apart on purpose (§2.6.7).**

- **F1 · `register.test.mjs`'s `S-LAYER` reads its label by *path*.** `LAYER_ARTIFACT =
  join(PACKAGE_DIR, 'greens', 'greens.mjs')` (`:129`) — a green whose subject is *"the layer label READ OFF the
  artifact"* would stop resolving the moment `greens.mjs` and `register.test.mjs` sit in the same scope but the
  `PACKAGE_DIR/greens` join is not re-pointed. The assertion does not weaken; **it fails at extraction**, and a
  mechanical path edit is the repair. Recorded because it is exactly the kind of relocation damage that a
  "path rename" framing would absorb silently.
- **F2 · `publish.test.mjs`'s and `publish-generators.test.mjs`'s `S-LAYER` rows assert a `{site, layer}` pair
  with `site` a literal `'bindings/js/test/publish.test.mjs'`.** The move falsifies the site half of a *layer
  assertion* (`acceptance.md §2.3`: *"a wrong pair is void"*). Either the literal is re-derived at the move or the
  row is void — and re-deriving a *layer* row is not a path rename.
- **F3 · The node leg's own label and the preset's scope disagree.** Every JS `*.test.mjs` in this tree is
  labelled **`ENVELOPE/PURE`** by the declarations that govern it (`acceptance.md §5.2` row 1, `PUB-DD-24`,
  `implementation-plan.md §2`), yet each one **loads the built `storeroom_js_binding.node` through the package
  entry** — which the preset's own words make *"drives the built artifact"*, i.e. **assembled**. **This pass
  preserves the files' declared labels** (§2's `layer` column is `envelope` for them) and **does not upgrade
  them**: whether `ENVELOPE/PURE` means *the layer of the package's envelope* (and is therefore unchanged by the
  addon being loaded) or *the layer at which the claim is measured* (and is therefore `assembled` once a `.node`
  is in the process) is **the architect's question, put below as Q4** — and it is the single finding that matters
  most, because if the answer is "assembled" then 24 files' reported layer changes with their directory and the
  project has been reporting one layer higher than its evidence for two waves.
- **F4 · `app` and `installed` have no battery at all.** The `APP` layer is `NONE` everywhere by declaration and
  `LIVE / INSTALL` is `OPEN` (brief §6). A stratification that reports nothing at `installed` and `app` is honest
  but **incomplete against `D-4`**, which hands the publish shape to *"the e2e/blind scenario testing"*: the
  evidence `delivery` needs is `installed` evidence, and the only declared route to it (`json-crossing-live.mjs`'s
  `JC_ENTRY=LIVE/INSTALLED`) is a runner flag, not a cell. Named, not repaired.
- **F5 · `file-tier-save.test.mjs` reads the greens set by name** (`file-tier-save-greens.md`, cited at `:2271`
  as the source of a claim it refuses to assert). The runner and its set document move together in this
  declaration (`tests/e2e/file-tier-save/`), which is why the set's directory is preserved rather than flattened.

---

## §4 · What does not stratify cleanly — named questions

**Q1 · Four files span two layers and are assigned by dominant; the split is owed and is not drawn here.**
`held-listener-identity-properties.test.mjs` (surface + kernel, `P-HL-1`…`8`), `constraints-publication.test.mjs`
(constraints + `delivery`'s allowlist), `json-crossing.test.mjs` (crossing + the kernel's `commit`/`runAttempt` at
`:124`), `file-tier-save(-properties).test.mjs` (the terminal arm + the kernel's pass).
`held-listener-identity-refusal-restore.test.mjs` is a fifth, of a different kind: its **subject** is kernel law but
its **reach** is the entry, so it is assigned `integration/js-constraints` on subject and could honestly be e2e on
reach. **This pass draws no cut inside any file.**

**Q2 · The word `e2e` means two different things, and two file names collide with the preset.** `tests/e2e_*.rs`
are the project's *in-crate* end-to-end batteries — the architect's own words commissioned them — and they run
under `cargo test` in-process with no artifact and no entry point. Under the preset's definition they are
**integration** (`store-core`), and this pass assigns them there **while keeping their names**; a rename is not a
stratification and is not ordered here.

**Q3 · `convenience.test.mjs` tests a surface that no longer exists.** It drives `on(address, listener)` and
`off(handle)`, which the brief's §3 records as **merged away** (no `on`, no `off`, no `settle` in the 14-member
declaration) — the file's own header says it was red by declaration and then green in its own era. Its scope
answer is e2e (it reaches the entry's product), but **its subject is superseded**: filing it under `tests/e2e/`
must not be read as renewing its claim. Whether it is retired, re-derived, or kept as a record is the architect's
or the test layer's, not this pass's.

**Q4 · `ENVELOPE/PURE` for a drive that loads the built addon** — see **F3**. This is the biggest open question
this pass raises.

**Q5 · Five declared homes contradict the preset, and the contracts are unowned.** `docs/specs/storeroom-publish/
contract.md` **`PUB-DD-24`** fixes the publish red set's home at `bindings/js/test/publish.test.mjs` *"INSIDE THE
DIRECTORY THE LANDED JS LEG'S COMMAND GLOBS"* and prices the alternative; the same contract's §4.5 (and
`storeroom-js/package.md §4.2`) declare the legs **by command and site** (`node --test bindings/js/test/*.test.mjs`
at the repository root; `cargo test --manifest-path bindings/js/Cargo.toml`). Four further homes name the moved
paths: `package.json:7` (the root instrument harness), `scripts/publish.sh:197` (`delivery`), and
`bindings/js/README.md:222,238` (`delivery`). **`D-5` answers "which convention survives" and does not answer
"what happens to a contract clause that declares the path it is leaving."** The precedent is `D-3`'s: the clause
**stands as text and is read through the ruling** (ANNOTATE-BESIDE), no role rewrites the spec corpus, and the
authority log is what supersedes it. **That is a question for the architect, not a decision of this pass.**

**Q6 · The greens runners report rather than assert, and their scope answer is `e2e` on reach, not on kind.**
Six of the ten are blind instances and four are live re-drives; all ten print `RESULT <id> <verdict> :: …` and
carry their own exit rules — two of them (`json-acceptance-set-greens.mjs`, `file-tier-save/scenarios.mjs`) count
`FAIL` **and** `CONFLICT`, one ranks `LAYER-LIMIT`/`OBSERVED`/`GAP` as non-passes-not-failures, and one
(`consumer-fix/scenarios.mjs`) can answer `SOURCE-PINNED` off repo bytes with no run at all. **They are
instruments, not a battery that fails a build**: `node --test` will not even discover them (their names carry no
`.test.`), so placing them inside `tests/e2e/` makes one scope hold two kinds — discovered tests and
explicitly-invoked runners — and the run command (`npm run greens`) must keep naming them. Declared as a
consequence, not repaired.

**Q7 · Two `.md` artifacts live inside the batteries.** `REMEASURE-2026-10-18.md` (a measurement record, consumed
by nothing) and `file-tier-save-greens.md` (the blind set a runner drives). Neither is a test; both are declared
in §2.5 rather than assigned a scope. A fourth class — `bindings/js/test/*.mjs` where the name is not
`*.test.mjs` — is what the project's own glob turns into "not a test" (`node --test … *.test.mjs` does not match
them), and the four helpers say so at their own bytes.

**Q8 · No blind instance exists for either Rust crate, and one surface has none of its own.** The store crate and
the binding crate are internal libraries rather than general-purpose consumer surfaces, so this pass gives them
none; `js-resolution` has no blind instance of its own (its cells sit inside `package-entry.test.mjs` and
`consumer-fix/scenarios.mjs`). Whether the store crate's public surface is *general-purpose* enough to owe one is
put to the architect.

**⟶ QUESTIONS RAISED BY THE ROUTE PASS (`D-6`).**

**Q9 · `D-6`'s census says 19 files carry the bare specifier; this pass measures 24.** The five it does not carry
are `register`, `held-listener-identity-properties`, `a126-constraint-methods`, `publish` and `package-entry`, and
each reaches the name **only** through a dynamic `await import(...)` — where all 17 named files spell a static
import. **My reconciliation — that the ruling's census counts static imports — is an inference, not the ruling's
meaning.** The five are re-spelled by route above; **whether that is the right reading of `D-6` is the
architect's** (§2.6.5).

**Q10 · The packaged-resolution claim's exclusivity — `D-6`'s own open item, untouched here.** `D-6` records
L0's reading that *the `exports` claim lives exclusively in the `O3` set* as **inference awaiting confirmation**.
This pass's tagging is consistent with it and **does not settle it** (§2.6.7). **Confirm, correct, or leave it
open** — and note that if it is confirmed, `O4`'s path route is a *declared absence* of an `exports` claim rather
than an incidental bypass.

**Q11 · `O3`'s mechanism is a composition of two precedents, and the composition is unmeasured.** `D-6`'s `O3`
needs an install-shaped tree **and** a name import through `exports`. `publish.test.mjs`'s `makeScratch` supplies
the tree but imports the entry **by path inside it**; the `typecheck` stage and 19 e2e files supply the **name**
reach but no tree. **No existing cell does both** (§2.6.2). This declaration composes them and invents no shape —
**is the composition the intended `O3`, or does the ruling's "by name from inside that tree" require the entry
itself to be unreachable except through the map?** (No shell in this pass: the composition is declared, not
measured.)

**Q12 · `consumer-fix/scenarios.mjs` is publish-readiness with no subject it can reach.** Its own header records
that the entry-level refusal *"cannot be driven by this pass: `index.mjs` is behind the implementation wall, and no
published platform package exists to install."* It is tagged `O3` on purpose; **`O3`'s staged tree is the first
instrument that could give it a subject, and whether it should take one is the test layer's to declare — not this
pass's** (§2.6.1 call 5).

**Q13 · `D-4` lifts "NOTHING ELSE" while `D-3`'s correction keeps `JSG-12.18`'s `LICENSE`-row refusal.** The two
clauses meet at one manifest row: a `LICENSE` row is *"something else"* under `D-4` and a refusal under the
correction. **It blocks that cell's edit and is the architect's to separate** (§5).


---

## §5 · The migration shape — declared as consequences, not performed

**Nothing in this section has been done.** It states what the wave that executes §2 will meet.

**Paths.** **None of the three scopes exists today**: `tests/` holds only the store crate's 15 files,
`bindings/js/test/`, `bindings/js/tests/` and `bindings/js/greens/` hold the rest. The wave **creates**
`tests/e2e/` (with `file-tier-save/` and `consumer-fix/` subdirectories), `tests/integration/` (with
`store-core/`, `store-fail-set/`, `store-args/`, `binding-crossing/`, `js-constraints/`, `support/`),
`tests/unit/` (`js-surface/`, `js-constraints/`, `binding-crossing/`), and **empties** the four present-state
directories.

**Discovery — the two legs, and neither is a path rename:**

1. **`cargo test`.** `tests/` at the repository root *is* the store crate's integration-test directory, and
   `bindings/js/tests/` is the sibling crate's. Cargo's autodiscovery finds `tests/*.rs` (one target each) and
   `tests/*/main.rs` (one target per directory) — **it does not find `tests/integration/store-core/construction.rs`**,
   and it will walk the new directories looking for `main.rs` and find none. So the Rust half of the move needs
   either `[[test]]` entries carrying `path` in the root `Cargo.toml` and `bindings/js/Cargo.toml` (**owned by
   `delivery`**), or a shape change per target (`tests/<scope>/<module>/main.rs` declaring its siblings as
   modules) — and `mod support;` stops resolving across the extra directory level (`#[path = "../support/mod.rs"]`
   or a per-scope copy is owed). **These two targets' declarations are `delivery`'s and both crate manifests are
   in its `owns` list.** *(Stated as a consequence of cargo's documented discovery rules; this pass had no shell
   and ran no build — not measured here.)*
2. **`node --test`.** The root `package.json`'s `test` script globs `bindings/js/test/*.test.mjs`. After the move
   it must name three trees, and the four runners keep a separate command. **The root `package.json` is owned by
   no module** — map §5.3 gives it to no one, deliberately — so *"who re-points the instrument harness"* is a real
   question the wave will hit (it is not `delivery`'s: `delivery` owns `bindings/js/package.json`).

**Content — what will need adaptation, and where the adaptation is more than mechanical:**

- **The self-reference specifier — `D-6` HAS NOW ANSWERED THIS, PER ROUTE.** Every JS `*.test.mjs` imports
  `'provident-storeroom'`, resolved by Node's **package self-reference** through `bindings/js/package.json`'s
  `exports` map — lawful only because the importing file sits **inside** that package's directory. Files under
  `/tests/…` are outside it, so the specifier will not resolve, and the mechanical relative re-point **destroys
  the claim the battery rests on** (`acceptance.md §4.1` item 1 / `DD-18`: *"it drives the package through its
  CLAIMED ESM ENTRY POINT"*, *"a test that loads the addon itself is a finding"*; `DD-24` names the
  self-reference as its own drive). **This declaration recorded three lawful routes and took none; `D-6` takes
  them apart by purpose: `O3` cells keep a name reach and move it inside a staged tree, `O4` cells take the path —
  and the claim is carried by the `O3` set, not by a spelling every file shares.** The re-spelling is stated file
  by file at **§2.6.4**, including the two embedded child-drive specifiers that must be treated **oppositely**
  (`json-crossing`'s become paths; `negative-generators`' `:1550` stays a name, because there the name is the
  assertion).

**★ THE TWO CELLS THE `D-3` CORRECTION NAMES — the fourth `files` entry's retirement, costed where the move will
meet it.** Retiring the fourth `files` entry (`src/constraint-kernel.mjs`) fails **two cells in two batteries**,
and **both are e2e-bound**: **`P-PUB-7`** in `js-battery` (`publish.test.mjs`, tagged **`O3`**) — the
`assert.deepEqual` against the sorted four-name array at `:2283-2285` — and **`JSG-12.18`** in `greens-harness`
(`greens.mjs`, tagged **`O4`**) — the exact set equality at `:1205`, with the fourth entry refused any looser
form, a fifth entry refused and a `LICENSE` row refused at `:1211`. **A test cannot be superseded by a ruling**
(`D-3` says so by name), so both are **owed an edit by their owners**; and **each cell's *other* subjects are
prohibitions that survive the count's lifting and must not travel with it**:
**`P-PUB-7`** keeps `build/Release` leaving `files`, no `.node` published, no `postinstall` build-on-install route
and the tracked-tree walk for a shipped binary (`:2286-2299`); **`JSG-12.18`** keeps **no `build/Release` path**,
**no `.node` at any entry** and **no `LICENSE` row**. **A pass that deletes an equality and takes the
prohibitions with it has destroyed the load-bearing half of both cells** — and it will be doing it in **one `O3`
cell and one `O4` cell**, which is the sharpest illustration that **the route tag is no help at this migration**:
both cells read the manifest **as bytes**, neither goes through its route, and **neither tag makes the edit
mechanical**.
- **★ AND ONE COLLISION THIS PASS RECORDS WITHOUT RESOLVING.** `D-4` lifts the strict count **and** `§2.1` item
  `1`'s *"NOTHING ELSE"* exclusivity, while the `D-3` correction carries `JSG-12.18`'s **`LICENSE`-row refusal**
  as a *licensing* prohibition that survives. **A `LICENSE` row would be "something else" under `D-4` and a
  refusal under the correction, and the two clauses meet at one byte of one manifest.** Whether the `LICENSE` row
  is lawful after `D-4` is the architect's to separate — it blocks `JSG-12.18`'s edit (**§4 Q13**).
- **Relative reaches to the kernel and to the artifact.** `../src/constraint-kernel.mjs` (five files import it,
  `:124`/`:156`/`:79`/`:161` and the helpers' `:33`/`:157`), `HERE/../index.mjs` and
  `HERE/../build/Release/storeroom_js_binding.node` (the greens), `ROOT` computed four levels up
  (`consumer-fix/scenarios.mjs`), `PACKAGE_DIR`-based joins (`register.test.mjs`, `addon-*-support.mjs`) — each
  is computed from `import.meta.url` and each must be recomputed once, in one pass, by one hand.
- **`fileURLToPath(new URL('../src/constraint-kernel.mjs', import.meta.url))`** is also used as an **identity**
  (`json-crossing.test.mjs:3936`, `CROSSING_KERNEL_FILE_SUFFIX`, a census exclusion) — a path used as a name.
- **Layer-asserting literals** (F1, F2) and **`a127`'s `THE_TWELVE`** — the latter is already named as owed a
  re-derivation by `docs/specs/storeroom-held-listener-identity/contract.md` §5.7 item 5 and §8 item 5.
- **Import graph across scopes**: the two cross-scope helpers (§2.5) mean `tests/integration/js-constraints/`
  is imported by two unit files and two e2e files — lawful, but it makes the integration directory a dependency
  of a scope that is not allowed to own it.
- **The map's own revision is owed *after* execution, not now**: `modules.json`'s four battery modules keep
  their ids and their `owns` lists must be re-pointed to the three scopes; the map's §2.4 note and its FIGURES
  (75 paths in four directories) move with them. **This pass does not edit either file.**

---

## §6 · What this pass did NOT decide

- **It moved nothing and edited no test.** No file under `tests/`, `bindings/`, `src/`, `docs/specs/` or
  `strata/` was created, renamed, edited or deleted.
- **It drew no cut inside any file.** Where a file is genuinely two layers (Q1), it is assigned by its dominant
  layer and the split is **owed**.
- **It decided no question in §4** — not the `ENVELOPE/PURE` label (Q4), not the fate of `convenience.test.mjs`
  (Q3), not what happens to `PUB-DD-24` and the leg declarations (Q5), not the specifier route, not whether the
  store crate owes a blind instance (Q8).
- **It ran nothing.** No `cargo test`, no `node --test`, no greens run. Every layer claim in §3 is read off a
  file's declaration, not measured by a run.
- **It did not verify** cargo's and Node's discovery behaviour on this tree (no shell); it did not verify the
  tracked status of any path; and it did not open any cell body it did not need — the survey was headers, doc
  comments, imports, cell names and file census, per the brief.
- **It did not delegate.** No L2 role was started: the decomposition is for the architect's review, and the
  cascade begins only after this is ruled on.
- **⟶ AND THE ROUTE PASS DECIDED NONE OF THE FOLLOWING.** **It did not answer `F3`** (the label of a
  `.node`-loading checkout cell) **and did not answer `F4`** (the absent installed-from-the-registry green):
  **`D-6` answers neither, and a route tag does not imply a label** (§2.6.7, §3). **It did not confirm the
  packaged-resolution claim's exclusivity** — `D-6`'s inference stands open as **Q10**, and nothing here is built
  on it. **It invented no packaged-resolution cell for the earlier set** (Q10 again): what §2.6 shows is that the
  *re-spelling* moves the `exports` reach out of the `O4` cells, not that any earlier-set claim changed. **It
  ordered no migration**: `D-6` orders no file move, and §5's costs are consequences, not a schedule. **It
  decided none of Q9–Q13.** **It started no L2.**


---

## §7 · What was read off a file, and what was concluded

**Read at the bytes.** The **headers/doc comments of all 68 test artifacts** (and the whole of the two `.md`
files' first sections) — these are the evidence for every *scope* and *driver* cell in §2; the **import lines of
all 42 `bindings/js/test/*` files and all 11 greens** (the self-reference, the kernel reach, the helpers, the
`execFileSync`/`createRequire` staging); the **glob census** of the four directories (15 / 7 / 42 / 11 = 75); the
`LAYER`/`constraint-kernel.mjs`/`node --test bindings/js/test` greps behind §3; `docs/L1/modules.json` whole (the
19 ids and the four battery modules' `owns` lists); `docs/L1/module-map.md` §1, §2.1–§2.4, §3 (I-11…I-28), §4
(E1–E6), §5, §6, §7; `strata/decisions.md` and `strata/brief.md` whole; `package.json` (root) and
`bindings/js/package.json` whole; `docs/specs/storeroom-publish/contract.md`'s `PUB-DD-24` row and §4.5 legs
clause and `docs/specs/storeroom-js/contract.md`'s register-ledger clauses (by `grep`, quoted above where used).

**Concluded, not read.** That a file whose header says it drives *"the package's own boundary"* has the assembled
package as its subject (the headers are read; the *classification* is mine). That `tests/gate4_red_set_fix.rs`
belongs to `store-args` rather than `store-core` (its header names construction and listener outside values; the
carrier module is my mapping). That `record_shapes.rs` is `store-core`'s rather than `store-records`'s (the node
kinds are the register's; the module's declared responsibility is the *returned* records). That
`consumer-fix/scenarios.mjs` belongs to `delivery` (it reads the manifest, the workflow, the crate manifest and
the built stamp). Every "dominant layer" call in Q1.

**Could not verify.** Cargo and Node discovery on the moved tree (§5) — no shell in this pass; whether
`package.json`'s self-reference would resolve for a file outside `bindings/js/` (stated as a Node packaging rule,
not measured); the layer labels of the four `bindings/js/test/*` files that print no `LAYER` line (they inherit
`ENVELOPE/PURE` from the declarations that govern the leg, not from their own bytes); and the A112 ordering
gate's state, which the brief carries as `OWED` and which this pass neither re-measures nor uses.

**⟶ THE ROUTE PASS — WHAT WAS READ AT THE BYTES, WHAT WAS CONCLUDED, WHAT COULD NOT BE VERIFIED.**

**Read at the bytes (measured).** A `grep` census of the bare specifier `'provident-storeroom'` across
`bindings/js/**`, **file by file and line by line**, which returned **24 carrying files** — 22 `*.test.mjs` + the
two helpers — with each occurrence's line number and form (**static import / dynamic `import()` / embedded
child-drive source string**): this is the evidence for §2.6.5's correction of `D-6`'s 19, and it is a
**measurement**, not a reading. A `grep` census of the **staging idiom** (`mkdtemp` · `execFileSync` ·
`copyFileSync` · `node_modules` · `createRequire`) over the same 33 files, which returned **exactly four
tree-assembling files** — `publish`, `publish-generators`, `version-stamp`, and **one arm** of
`negative-generators` — plus two files (`surface`, `json-crossing-blinded`) whose `mkdtemp` calls are **real files
for a store boot**, not package trees: this is the evidence for §2.6.1's calls 2 and 3. The **entry reach of all
ten greens**, read off their own lines (`greens.mjs:196`, `live-drive.mjs:35`, `blind-constraints-v2.mjs:28`,
`held-listener-identity-greens.mjs:110`, `json-acceptance-set-greens.mjs:55`, `json-acceptance-set-live.mjs:51`,
`json-crossing-live.mjs:132`, `json-crossing-live-s17.mjs:50`, `file-tier-save/scenarios.mjs:32`, and
`consumer-fix/scenarios.mjs` — which imports nothing from the package at all). The **driver and preload shapes**
that make `O3`'s mechanism concrete (`publish.test.mjs:466`, `:704-764`, `:711-715`; `version-stamp:596-645`,
`:653-674`; `publish-generators:415-520`; `package.json:8`'s `typecheck:stage`). `package-entry.test.mjs`'s
manifest reads and its `exports` claims (`:30`, `:38`, `:82`, `:97`, `:136`, `:150-154`). `P-PUB-7`'s count
equality at `:2283-2285` and its four surviving prohibitions at `:2286-2299`. The **helper import graph**, both
helpers, consumer by consumer (12 and 5) — which is the measurement behind §2.6.6's correction.

**Concluded, not read.** **Every one of the 33 route tags** — the ruling names the criterion and deliberately
lists no cell, so **the assignment is mine**, made from each file's header, its own specifier and the reach it
spells; the six borderline calls are defended one by one at §2.6.1, and **call 3 (`negative-generators` → `O4`)
is the one I would put first to the architect if one is corrected.** That `consumer-fix` is *publish-readiness by
purpose* despite reaching nothing (call 5). That the five files `D-6`'s census omits are omitted because it counts
**static** imports (§2.6.5) — an inference, marked as one. That `O3`'s two precedent-halves can be composed
(§2.6.2) — declared, **not** measured.

**Could not verify (route pass).** **No shell and no run**: no staged tree was assembled, no `node --test`, no
greens run, no `cargo test`. So **the `O3` composition at §2.6.2 is a declaration and not a measurement**; no
cell's route was exercised; and **the claim that a path route bypasses `exports` while a name-from-tree route
passes through it is Node's documented resolution rule read off the map, not a driven result.** Whether
`bindings/js/index.mjs` reached by a **relative path from `tests/e2e/`** still resolves the addon ladder from the
entry's own directory **is likewise stated from the entry's own resolution code and not driven** — that is the
single most load-bearing unmeasured claim in `O4`, and the first thing the migration wave should drive.

