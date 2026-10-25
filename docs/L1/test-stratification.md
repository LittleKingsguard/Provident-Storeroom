# L1 test stratification — `Provident-Storeroom`

**WHAT THIS FILE IS.** The declaration of the **test-layer stratification**: an assignment of **every existing
test artifact** to one of the strata preset's three test scopes — `tests/e2e/`, `tests/integration/<module>/`,
`tests/unit/<module>/` — with the module each file drives and the layer it reports. **It moves no file and
edits no test.** It is a declaration for the architect's review, made under `strata/decisions.md` **`D-5`**
(*"Keep the preset's choice"*): the preset's three write scopes stand as configured, **the tree adapts**, and no
scope is bent to a path this project already uses.

**INPUTS, AND HOW EACH WAS USED.** `strata/decisions.md` read whole (`D-1`…`D-5`; `D-5` orders this pass, `D-4`
makes the scenarios' placement upstream of the manifest decision, `D-1` and `D-3` are why the kernel's cells
have one module and no declared export set to test against); `strata/brief.md` read whole (§5 item 8 — *a green
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

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `bindings/js/test/surface.test.mjs` | `tests/e2e/surface.test.mjs` | `js-surface` | envelope | the entry's construction, five verbs, failure form, records — *"at its own boundary"* |
| 2 | `bindings/js/test/registry.test.mjs` | `tests/e2e/registry.test.mjs` | `js-registry-delivery` | envelope | handle, registry, delivery, the two registration verbs; also asserts the layer label read off `greens.mjs` |
| 3 | `bindings/js/test/convenience.test.mjs` | `tests/e2e/convenience.test.mjs` | `js-surface` | envelope | **drives `on`/`off`, which are merged away and no longer members** (brief §3) — stale subject, see §4 Q3 |
| 4 | `bindings/js/test/ordering.test.mjs` | `tests/e2e/ordering.test.mjs` | `js-surface` | envelope | the `A112`/`A115` ordering law *at the JS surface's own boundary* |
| 5 | `bindings/js/test/round-trip.test.mjs` | `tests/e2e/round-trip.test.mjs` | `js-crossing` | envelope | write→read equality through the entry; needs the addon |
| 6 | `bindings/js/test/addon-surface.test.mjs` | `tests/e2e/addon-surface.test.mjs` | `binding-facade` | envelope | the artefact's export set, receiver, unwrap — *"reaches the artefact"* |
| 7 | `bindings/js/test/addon-surface-properties.test.mjs` | `tests/e2e/addon-surface-properties.test.mjs` | `binding-facade` | envelope | the artefact's typed property layer (8 rows) |
| 8 | `bindings/js/test/addon-adoption.test.mjs` | `tests/e2e/addon-adoption.test.mjs` | `binding-facade` | envelope | ABI adoption, build fetch, teardown; stages trees and reads hashes |
| 9 | `bindings/js/test/json-crossing.test.mjs` | `tests/e2e/json-crossing.test.mjs` | `js-crossing` | envelope | the `JC-TC-*` acceptance set through the entry; **also imports the kernel by path** (`:124`) |
| 10 | `bindings/js/test/json-crossing-blinded.test.mjs` | `tests/e2e/json-crossing-blinded.test.mjs` | `js-crossing` | envelope | **BLIND** — one `test()` per cell of the json-crossing greens set |
| 11 | `bindings/js/test/json-crossing-gate4-adversarial.test.mjs` | `tests/e2e/json-crossing-gate4-adversarial.test.mjs` | `js-crossing` | envelope | adversarial/malformed battery *over the shipped package entry* |
| 12 | `bindings/js/test/negative-generators.test.mjs` | `tests/e2e/negative-generators.test.mjs` | `js-crossing` | envelope | the tasked negative generators `NG-JS-*`, driven through the entry alone |
| 13 | `bindings/js/test/file-tier-save.test.mjs` | `tests/e2e/file-tier-save.test.mjs` | `js-registry-delivery` | envelope | terminal arm, save order, durability boundary; boots real files; imports the kernel for `commit`/`runAttempt` |
| 14 | `bindings/js/test/file-tier-save-properties.test.mjs` | `tests/e2e/file-tier-save-properties.test.mjs` | `js-registry-delivery` | envelope | the same amendment's typed property layer (8 rows) |
| 15 | `bindings/js/test/held-listener-identity-surface.test.mjs` | `tests/e2e/held-listener-identity-surface.test.mjs` | `js-surface` | envelope | the 14-member set and the listener surface's states |
| 16 | `bindings/js/test/held-listener-identity-properties.test.mjs` | `tests/e2e/held-listener-identity-properties.test.mjs` | `js-surface` | envelope | **spans surface and kernel (`P-HL-*`)** — assigned by dominant; split owed (§4 Q1) |
| 17 | `bindings/js/test/constraints-publication.test.mjs` | `tests/e2e/constraints-publication.test.mjs` | `js-constraints` | envelope | the two population routes at the surface; **also asserts `delivery`'s `files` allowlist** — split owed |
| 18 | `bindings/js/test/package-entry.test.mjs` | `tests/e2e/package-entry.test.mjs` | `delivery` | envelope | the package at its boundary: `exports` map, engines, licence, `HO-*` realms, `.node` load count |
| 19 | `bindings/js/test/register.test.mjs` | `tests/e2e/register.test.mjs` | `js-registry-delivery` | envelope | the register layer's JS half; **`S-LAYER` reads its label off `greens/greens.mjs`** (§3 F1) |
| 20 | `bindings/js/test/version-stamp.test.mjs` | `tests/e2e/version-stamp.test.mjs` | `delivery` | envelope | the stamp's homes, the pre-publish guard, `P-PUB-9`/`P-PUB-10` |
| 21 | `bindings/js/test/version-stamp-r2.test.mjs` | `tests/e2e/version-stamp-r2.test.mjs` | `delivery` | envelope | the `R2` source-assertion set under the architect's `(a)` |
| 22 | `bindings/js/test/publish.test.mjs` | `tests/e2e/publish.test.mjs` | `delivery` | envelope | the 62-cell publish red set; **declares its own home (`PUB-DD-24`)** — see §4 Q5 |
| 23 | `bindings/js/test/publish-generators.test.mjs` | `tests/e2e/publish-generators.test.mjs` | `delivery` | envelope | `NG-PUB-A`…`J`, each with a staged control copy outside the repo |
| 24 | `bindings/js/greens/greens.mjs` | `tests/e2e/greens.mjs` | `js-surface` | envelope | **BLIND** (`JSG`), 16 scenarios |
| 25 | `bindings/js/greens/live-drive.mjs` | `tests/e2e/live-drive.mjs` | `js-surface` | assembled | `LIVE / ASSEMBLED PACKAGE`, real process, real file I/O |
| 26 | `bindings/js/greens/blind-constraints-v2.mjs` | `tests/e2e/blind-constraints-v2.mjs` | `js-constraints` | envelope | **BLIND** (`E2E-C-*`), reached through the kernel's declared caller-side path |
| 27 | `bindings/js/greens/held-listener-identity-greens.mjs` | `tests/e2e/held-listener-identity-greens.mjs` | `js-surface` | envelope | **BLIND**; imports the entry and the kernel's checkout home |
| 28 | `bindings/js/greens/json-acceptance-set-greens.mjs` | `tests/e2e/json-acceptance-set-greens.mjs` | `store-value` | envelope | **BLIND** (`JAS`): the `file` tier's JSON codec as a declared acceptance set |
| 29 | `bindings/js/greens/json-acceptance-set-live.mjs` | `tests/e2e/json-acceptance-set-live.mjs` | `store-value` | assembled | the same set re-driven against the real built package |
| 30 | `bindings/js/greens/json-crossing-live.mjs` | `tests/e2e/json-crossing-live.mjs` | `js-crossing` | assembled | the 144-cell live battery; `JC_ENTRY` also reaches **installed** (a published tarball) |
| 31 | `bindings/js/greens/json-crossing-live-s17.mjs` | `tests/e2e/json-crossing-live-s17.mjs` | `js-crossing` | assembled | the six `§17` boundary laws, kept out of the 144-cell census deliberately |
| 32 | `bindings/js/greens/consumer-fix/scenarios.mjs` | `tests/e2e/consumer-fix/scenarios.mjs` | `delivery` | envelope | **BLIND** (gate 5); reports `SOURCE-PINNED` verdicts off repo bytes as well as the artifact |
| 33 | `bindings/js/greens/file-tier-save/scenarios.mjs` | `tests/e2e/file-tier-save/scenarios.mjs` | `js-registry-delivery` | envelope | **BLIND** (`FTS`), 96 cells, its own exit rule (FAIL **and** CONFLICT) |

*(**33 rows, 33 files**: 23 from `bindings/js/test/` + 10 from `bindings/js/greens/`; the arithmetic is §2.4.)*

### §2.2 `tests/integration/<module>/` — 29 files

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

| # | present path | target | driver | layer | note |
|---|---|---|---|---|---|
| 1 | `bindings/js/test/a126-constraint-methods.test.mjs` | `tests/unit/js-constraints/a126-constraint-methods.test.mjs` | `js-constraints` | envelope | the three constraint methods' signatures: add/overwrite, the two idempotent toggles, the carriage pre-condition, the one `TypeError` |
| 2 | `bindings/js/test/a127-surface.test.mjs` | `tests/unit/js-surface/a127-surface.test.mjs` | `js-surface` | envelope | one export, the member set, `write`'s fifth position, the two refusal rules — **a signature pin**; its `THE_TWELVE` constant is already named as owed a re-derivation |
| 3 | `bindings/js/test/constraint-kernel.test.mjs` | `tests/unit/js-constraints/constraint-kernel.test.mjs` | `js-constraints` | envelope | *"the five-item surface and its argument / return shapes"* — per-signature domains and guardrails |
| 4 | `bindings/js/tests/crossing_carriers.rs` | `tests/unit/binding-crossing/crossing_carriers.rs` | `binding-crossing` | envelope | the 8 carriers over 56 variant rows — the folds' per-signature domains |
| 5 | `bindings/js/tests/crossing_values.rs` | `tests/unit/binding-crossing/crossing_values.rs` | `binding-crossing` | envelope | the value table's 13 class rows — the conversion's per-class domain |

### §2.4 The arithmetic

**e2e 33 · integration 29 · unit 5 · helpers and non-tests 8 · total 75 ✓.**
By directory: `tests/` 15 → 14 integration + 1 helper · `bindings/js/tests/` 7 → 4 integration + 2 unit +
1 helper · `bindings/js/test/` 42 → 23 e2e + 11 integration + 3 unit + 4 helpers + 1 record ·
`bindings/js/greens/` 11 → 10 e2e + 1 set document. **No path is assigned twice and none is omitted**; the
machine-readable form is `docs/L1/test-stratification.json`.

### §2.5 Helpers and non-tests — declared separately, and deliberately not tests

| present path | target | consumed by | what it is |
|---|---|---|---|
| `tests/support/mod.rs` | `tests/integration/support/mod.rs` | integration (every `tests/*.rs`) | the store crate's one scaffolding module: the spellings, the corpus, `support::Drive`'s caps |
| `bindings/js/tests/support/mod.rs` | `tests/integration/binding-crossing/support/mod.rs` | integration | the binding crate's shared harness: corpus, equality relation, deterministic generator |
| `bindings/js/test/constraint-kernel-helpers.mjs` | `tests/integration/js-constraints/constraint-kernel-helpers.mjs` | **integration + unit** | fixtures and assertions for the constraints red set — **a helper consumed by two scopes** |
| `bindings/js/test/held-listener-identity-helpers.mjs` | `tests/integration/js-constraints/held-listener-identity-helpers.mjs` | **e2e + integration** | the handle/listen domains and the two refusal forms — **a helper consumed by two scopes** |
| `bindings/js/test/addon-surface-support.mjs` | `tests/e2e/addon-surface-support.mjs` | e2e | the addon-surface red set's declared figures (`DECLARED_SURFACE`, `THE_THREE_THAT_ARE_NOT_ENTRIES`, `OPEN_OWED`) |
| `bindings/js/test/addon-adoption-support.mjs` | `tests/e2e/addon-adoption-support.mjs` | e2e | the adoption statement and what the landing pass must provide |
| `bindings/js/test/REMEASURE-2026-10-18.md` | `tests/e2e/REMEASURE-2026-10-18.md` | nothing | **not a test and not a helper**: the red set's own measurement record, read by no code |
| `bindings/js/greens/file-tier-save/file-tier-save-greens.md` | `tests/e2e/file-tier-save/file-tier-save-greens.md` | e2e (the `FTS` runner's set) | the blind set the runner drives, cell for cell; authored, never imported |

**The two cross-scope helpers are the only files whose honest answer is "consumed by several scopes", and they
are declared here rather than assigned.** Their target sits under the module that owns the subject; a scope that
imports them reads across a directory, which is lawful (`node --test` follows imports) but means the integration
directory is load-bearing for two unit files and two e2e files.

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

- **The self-reference specifier.** Every JS `*.test.mjs` imports `'provident-storeroom'`, resolved by Node's
  **package self-reference** through `bindings/js/package.json`'s `exports` map — lawful only because the
  importing file sits **inside** that package's directory. Files under `/tests/…` are outside it, so the
  specifier will not resolve: the mechanical fix is a relative `../../bindings/js/index.mjs` import, and **that fix
  destroys the claim the battery rests on** (`acceptance.md §4.1` item 1 / `DD-18`: *"it drives the package
  through its CLAIMED ESM ENTRY POINT"*, *"a test that loads the addon itself is a finding"*; `DD-24` names the
  self-reference as its own drive). A workspace link, an `imports` map, or a `node_modules` staging step are the
  three lawful routes; **each is a decision, and this pass takes none** — it records that the deepest content
  change is not a path but a **specifier**, and that it bears on the e2e battery's meaning.
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
