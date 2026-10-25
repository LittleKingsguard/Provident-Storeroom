# L1 module map — `Provident-Storeroom`

**WHAT THIS FILE IS.** The ownership map of the tree that exists on branch `docs/pre-strata-consolidation`.
It divides the code that is already here into discrete modules, says which module owns which existing path,
states each module's one-line responsibility, records the interactions between modules, and declares the e2e
I/O surface. **It designs nothing.** No module internals, no logic, no restructuring, no code. Where the tree
already draws a boundary the map adopts it; where one file plainly carries several responsibilities the map
declares the ownership split it recommends and says so as an ownership boundary, never as a work item.

**INPUTS.** `strata/brief.md` (read whole), the nine kept contracts under `docs/specs/` (read selectively by
section heading and by `grep` — the sections actually read are listed in the return envelope), and the tree
itself, surveyed file by file. The first pass had no decision file: `strata/decisions.md` did not exist on this
branch then, and the only rulings available were what the brief and the contracts quote. **It exists now, and
its entry `D-1` is the authority this revision applies.**

**REVISION AT `D-1` — WHAT THIS MAP REPLACED.** `D-1` rules the constraint kernel **tightly integrated, not an
external import**, and on that ruling the boundary this map drew between module **13 `js-constraints`** and
module **14 `constraint-kernel`** is *not a boundary the architect recognises*. The two are **one module**
below; interaction **I-11** ceases to be a boundary interaction; the kernel's export set stops being a boundary
claim; and the fourth `files` allowlist entry has no subject. **`D-1` orders no code move**, so every fact this
map records about the tree is a fact of the tree as it stands, and each changed reading is marked where it
stands rather than presented as though it had always read that way.

**MEASUREMENT LIMIT — READ BEFORE TRUSTING THE COUNTS.** The first pass over this map had no shell. Its
inventory was built from the file tools' glob enumeration of the workspace (a complete 11,930-path listing of
everything under the repository root, filtered against the project's own `.gitignore` rules), **not** from
`git ls-files`, so its counts were *paths present on disk and not excluded by the project's own ignore files*
and **not** a verified tracked set. A supervisor-run shell pass has since measured the tracked set, and this
correction pass settles the figures that pass could not: the corrected denominator reconciles exactly to
`git ls-files`'s **126** non-`scratch/` paths (see **FIGURES**), the `#[napi]` figure is 13 **line-initial
attribute sites** (§4 E2), and both root lock files are confirmed tracked (§5.3). Three consequences are
carried openly:

- the paths below are present on disk but **excluded by the project's own ignore rules**, so they are neither
  owned nor listed as unowned: `bindings/js/Cargo.lock` (`bindings/js/.gitignore` line 6),
  `bindings/js/target/` and `bindings/js/build/` (`bindings/js/.gitignore` lines 4–5), and the trees
  `.cargo-home/`, `target/`, `archive/`, `.impl-rc8-backup/`, `.tracker-reflow-backup/`,
  `.npm-cache/`, `typecheck/node_modules/` (root `.gitignore`);
- **`scratch/` is NOT in that class, and the first pass put it there wrongly.** **477 files under `scratch/`
  are tracked in git.** They are excluded from ownership by the project's own *convention* and never by an
  ignore rule: the root `.gitignore`'s own prose states the rule it applies — *"a scratch is never a source"*
  (`.gitignore:217`) — and on that rule each of the 477 is a probe, a byproduct, a log or a one-off driver,
  which is the whole answer; this map does not classify them path by path. Only scattered subpaths of
  `scratch/` are ignored, and the root `.gitignore` names them (`scratch/live/install-0.2.0/drive/`,
  `scratch/g7-*/`, `scratch/depth-probe/`, `scratch/def-f-live/`, `scratch/def-f-probe/`, `scratch/jcx-*/`,
  `scratch/npmcache/`, `scratch/probe-shape-a/`). **The project's convention and git's tracking disagree
  here**, and a reader who runs `git ls-files` will see all 477 of them. Nothing under `scratch/` is owned,
  listed or counted; §5.4 is the whole statement of it;
- the root `Cargo.lock` and the root `package-lock.json` exist on disk, **no ignore rule names them**, and
  **both are tracked** — verified: `git ls-files` lists each one. The root `.gitignore`'s prose states
  *"`Cargo.lock` STAYS UNCOMMITTED by decision"*, which the repository's own index contradicts. The
  contradiction is recorded, not resolved; both are listed in §5.3.

**THE REVISION AT `D-1` HAD NO SHELL EITHER**, so it measures nothing: it re-reads the map's own figures
against the module merge and moves two of them (**20 → 19 modules**, **68 → 61 endpoints**), re-reads the four
tree facts it restates (`package.json`'s four `files` entries, `constraint-kernel.mjs`'s six `export` sites, the
`constraintsKernel()` call sites, and the `kernel.commit` / `kernel.runAttempt` calls), and changes no path
ownership at all — **105 + 1 + 20 = 126 stands untouched**. Everything it could not check is named where it
stands (§5.3, §7).

**FIGURES.** 126 paths in the denominator — the corrected figure, reconciled to `git ls-files`'s 126 tracked
non-`scratch/` paths. **105 are owned by exactly one module**, **1 is co-owned by five modules over
declared line regions** (`bindings/js/index.mjs`), and **20 are unowned with a reason** (§5). The
reconciliation by ownership is exact: **105 owned + 1 co-owned + 20 unowned = 126**, with no path
unaccounted for. **19 modules** are declared, **61 endpoints** — **revised at `D-1` from the 20 modules and 68
endpoints this line carried at `e2fcbef`, and the movement is shown rather than absorbed:** folding 13 and 14
into one module removes one module and **dissolves seven endpoints** — the six kernel exports, whose subject is
the export set `D-1` rules away, and `constraintsKernel`, the lazy reach that *was* the boundary (§3, §4 E6).
The five member-facing constraint endpoints stay. **61 + 7 = 68**, and 19 + 1 = 20. The arithmetic by tree:
`src/` 7 owned ·
`tests/` 15 owned · `bindings/js/` root 7 (5 owned, `index.mjs` co-owned, `.gitignore` unowned) ·
`bindings/js/src/` 5 owned · `bindings/js/test/` 42 owned · `bindings/js/tests/` 7 owned ·
`bindings/js/greens/` 11 owned · `bindings/js/platforms/` 10 owned · `docs/specs/` 9 unowned ·
`typecheck/` 1 unowned · `.github/workflows/` 1 owned · `scripts/` 1 owned (`scripts/publish.sh`, the release
runbook, given to `delivery` by this correction pass — §2.3, §5) · root 9 (1 owned, 8 unowned) · `strata/`
1 unowned (`strata/brief.md`; **`strata/decisions.md` now stands beside it and this pass could not verify
whether it is tracked**, so whether the tracked denominator is now 127 is owed a shell check — the 126 is left
as measured). The 477 tracked files under `scratch/` are **outside** this denominator by convention, not by rule
(§5.4); the whole tracked tree is **603 = 477 + 126**.

---

## §1 · The modules

| # | id | name | one-line responsibility |
|---|---|---|---|
| 1 | `store-core` | The register | Hold the register, walk addresses, and perform the verbs — tiers and purge, the journal and rollback, the listener home, the file image and its boot, and construction. |
| 2 | `store-value` | The store's value domain and its JSON image | Declare the admitted value taxonomy and convert it to and from the canonical JSON text the `file` tier stores. |
| 3 | `store-args` | The argument carriers | Carry every declared parameter as a permissive Rust type whose outside-value arms make each refusal reachable, and fold it to the in-domain argument or the refusal. |
| 4 | `store-records` | The record shapes | Declare the shapes the verbs, the resolver and the listener surface return, including the tier token and the listener identity. |
| 5 | `store-fail-set` | The closed fail set | Hold the sixteen statuses as one closed set and generate every message from the code and the failing trigger's arguments. |
| 6 | `binding-crossing` | The pure-Rust conversion core | Model a JS value, admit or refuse it per class, convert in both directions, and hold the per-instance `Instance` over the store — with no Node-API type at any depth. |
| 7 | `binding-codec` | The wire's codec | Convert the Node-API carrier to the core's model and the core's answer back to a Node-API value, over the decided tree. |
| 8 | `binding-facade` | The Node-API export facade | Publish the addon's exported entry functions, each thin over the core, and declare the crate's link and version-stamp treatment. |
| 9 | `js-resolution` | The addon's resolution ladder | Name the platform packages, read the version stamp, run the three ordered rungs, and answer the one declared absent-addon refusal. |
| 10 | `js-surface` | The entry and its members | Publish the module's one export, define the instance's fourteen members, admit each call's arguments at its site, and render the single failure form. |
| 11 | `js-crossing` | The JS-side walk | Decide each value's class, guard the walk's ceilings and caller-code arms, and encode arguments in and decode answers out. |
| 12 | `js-registry-delivery` | The registry and the delivery path | Hold the package's per-instance state, the handle and its registry, deliver the triggered set to the caller's functions, and perform the terminal arm's `file`-tier save. |
| 13 | `js-constraints` | The constraint members and the integrated kernel | Carry the five constraint members and the write path's constraint evaluation, and evaluate a write against registered pairs — composing and repairing the attempt and answering its log and report — as **one integrated mechanism rather than an external import**. |
| 14 | `js-declaration` | The published declaration | Declare the whole published surface — the config, the statuses, the records and the fourteen members — as the hand-authored `index.d.ts`. |
| 15 | `delivery` | What ships and how it is built | Own the package manifest, the five per-platform packages, both crate manifests, the shipped README and the release pipeline. |
| 16 | `store-battery` | The store-side battery | Drive the native crate's declared behaviour through its own integration battery. |
| 17 | `binding-battery` | The binding crate's battery | Drive the conversion core's per-class table in Rust, with no Node runtime present. |
| 18 | `js-battery` | The JS battery | Drive the assembled package through the entry: surface, kernel, listeners, codec, properties, publication. |
| 19 | `greens-harness` | The greens runners | Drive the assembled package as a caller from outside, per wave, and report each green with its layer. |

**Row 13 is a supersession, not an original reading.** At `e2fcbef` this table carried two rows here — **13
`js-constraints`** (*"reach the kernel lazily without importing it at load"*) and **14 `constraint-kernel`**
(*"evaluate a write against registered pairs…"*) — and `D-1` folds them into one: the mechanism is a strict
requirement with nothing to defer, so the boundary between the members' glue and the evaluation machinery is
not an ownership boundary. **The merged row keeps the id `js-constraints`** rather than taking a new one, so
that every consumer-facing relation keeps its key and `D-1`'s own citations keep resolving; the separate
`constraint-kernel` key is dropped from every module's list (§3, `modules.json`). The
fourteen-member instance and the single failure form are unmoved by `D-1` and are still stated at row 10 and
§4 E1.

---

## §2 · Ownership — which existing paths each module owns

### §2.1 The native store crate (`storeroom-native`)

| module | paths |
|---|---|
| `store-core` | `src/store.rs` (2,472 lines), `src/lib.rs` (41 — the crate root and its re-export list) |
| `store-value` | `src/value.rs` (330), `src/json.rs` (203) |
| `store-args` | `src/args.rs` (329) |
| `store-records` | `src/records.rs` (268) |
| `store-fail-set` | `src/error.rs` (795) |

`src/lib.rs` re-exports (read at the bytes, lines 31–41): `args::{…}`, `error::{storeErrorMessage, MessageArgs,
StoreError, CODES}`, `records::{…}`, `store::{storeCreate, storeCreateWithConstraints, Store}`,
`value::{Segment, StoreValue}`. The crate root is owned by `store-core` because it is the store's own
public-surface declaration; every other store module's items reach the outside world *through* it, which is
recorded as an interaction rather than as co-ownership of the file.

### §2.2 The binding crate (`storeroom-js-binding`, `bindings/js/`)

| module | paths |
|---|---|
| `binding-crossing` | `bindings/js/src/crossing.rs` (1,178) |
| `binding-codec` | `bindings/js/src/codec.rs` (966) |
| `binding-facade` | `bindings/js/src/facade.rs` (1,105), `bindings/js/src/lib.rs` (90), `bindings/js/build.rs` (325) |

The three-way split is **the crate's own declared split**, not this map's proposal: `bindings/js/src/lib.rs`
declares `pub mod crossing` (the pure-Rust core, `package.md §4.5` item 1), `pub mod facade` (the `cdylib`
half) and `pub(crate) mod codec` ("the facade's conversion core … an implementation detail of the facade's own
thin methods"). `build.rs` is owned by `binding-facade` because it exists to make the facade's `extern "C"`
Node-API symbols link, and it emits the version stamp that the facade's `addon_version` reads.

### §2.3 The published JS package

| module | paths |
|---|---|
| `js-resolution` | `bindings/js/index.mjs` — **region** `L79–L617` |
| `js-surface` | `bindings/js/index.mjs` — **regions** `L1–L78` (file header and route statement), `L618–L746` (the failure form), `L3425–L4593` (`storeCreate` and the fourteen members) |
| `js-crossing` | `bindings/js/index.mjs` — **region** `L747–L3070` |
| `js-registry-delivery` | `bindings/js/index.mjs` — **regions** `L88–L200` (the symbol-key registry), `L201–L331` (the attempt seam), `L3072–L3424` (instance state and carriers), `L4594–L5200` (commit refusal, delivery, registration, terminal arm) |
| `js-constraints` | `bindings/js/index.mjs` — **region** `L5202–L5903`; and `bindings/js/src/constraint-kernel.mjs` (2,203) |
| `js-declaration` | `bindings/js/index.d.ts` (788) |
| `delivery` | `bindings/js/package.json`, `bindings/js/README.md`, `bindings/js/Cargo.toml`, `Cargo.toml`, `bindings/js/platforms/{linux-x64,linux-arm64,darwin-x64,darwin-arm64,win32-x64}/package.json` (5), the same five `README.md` (5), `.github/workflows/publish.yml`, `scripts/publish.sh` |

**`js-constraints` owns both paths, and the line between them is internal to it.** At `e2fcbef` this table gave
`bindings/js/src/constraint-kernel.mjs` to its own module **14**; under `D-1` the kernel is tightly integrated,
so the module owns the entry's constraint region `L5202–L5903` **and** the kernel file, at one ownership. The
two paths and the `require_` that joins them are therefore **inside one module's boundary, not across it** —
their separation is a fact of how the code is laid out, not an ownership claim. **Dissolving it physically
(moving the kernel's content into the entry, or folding the two files) is an implementation pass's act, and
neither this map nor `D-1` orders it**: `D-1` rules what the mechanism *is*, and says in as many words that it
orders no code move. The file still exists and is still owned here; nothing in this map presumes it has moved.

`scripts/publish.sh` (410 lines) is the release runbook, and it is owned here because it and
`.github/workflows/publish.yml` are **one pipeline under one owner**: the script's own header says its tag push
is what fires the workflow, and `delivery`'s responsibility already carries *the release pipeline*. The first
pass left the path out of the map altogether; §5 carries the reconciliation that puts it back.

**`bindings/js/index.mjs` is the one file this map splits.** It is 5,903 lines and carries, by its own
declaration sites (measured by grep on function declarations, not read line by line): the platform and version
table and the resolution ladder (`L332–L617`), the failure form (`L618–L746`), the JS-side walk, class
decisions and all encoders and decoders (`L747–L3070`), the per-instance registry, the state carriers and the
`finalization` retirement (`L3072–L3424`), the fourteen members as one 1,169-line `storeCreate`
(`L3425–L4593`), delivery and the terminal arm (`L4594–L5200`), and the constraint glue (`L5202–L5903` — the
one region whose owner also owns a second file, `src/constraint-kernel.mjs`, under `D-1`). The five regions
above are declared **as ownership boundaries only**, and the count of owning modules is unchanged at **five**:
the merge folds two file-owners into one module, it does not free a region. The path itself is therefore listed
in §5 as co-owned: *no single module can own `index.mjs` until the regions are physically separable*, and this
map does not order that separation.

### §2.4 The batteries and the greens

| module | paths |
|---|---|
| `store-battery` | `tests/` — 15 files: `construction.rs`, `construction_access_probe.rs`, `e2e_json_round_trip.rs`, `e2e_listener_firing.rs`, `fail_codes.rs`, `gate4_red_set_fix.rs`, `journal_and_rollback.rs`, `properties.rs`, `read_and_delete.rs`, `record_shapes.rs`, `tiers_and_purge.rs`, `walk_and_resolver.rs`, `watched_addresses.rs`, `write_arms.rs`, `support/mod.rs` |
| `binding-battery` | `bindings/js/tests/` — 7 files: `addon_adoption.rs`, `crossing_carriers.rs`, `crossing_copy.rs`, `crossing_values.rs`, `register_layer.rs`, `surface_verbs.rs`, `support/mod.rs` |
| `js-battery` | `bindings/js/test/` — 42 files: 37 `*.test.mjs`, 4 shared helpers (`addon-adoption-support.mjs`, `addon-surface-support.mjs`, `constraint-kernel-helpers.mjs`, `held-listener-identity-helpers.mjs`), and `REMEASURE-2026-10-18.md` |
| `greens-harness` | `bindings/js/greens/` — 11 files: `greens.mjs`, `live-drive.mjs`, `blind-constraints-v2.mjs`, `held-listener-identity-greens.mjs`, `json-acceptance-set-greens.mjs`, `json-acceptance-set-live.mjs`, `json-crossing-live.mjs`, `json-crossing-live-s17.mjs`, `consumer-fix/scenarios.mjs`, `file-tier-save/scenarios.mjs`, `file-tier-save/file-tier-save-greens.md` |

The two Rust batteries are separate modules by the project's own ruling (`docs/specs/storeroom-js/contract.md`
§3.4 item 2: an independent sibling crate means *"the store's … `tests/**` and its measured green are NOT
TOUCHED"*), and the two JS-side drivers are separate because they differ in kind: `bindings/js/test/` is a
`node --test` battery over the entry, while `bindings/js/greens/` is a set of caller-shaped live runners that
report each green with its layer. **This is an ownership choice, not an observation** — see §6 Q3.

---

## §3 · Interactions — who calls whom, over what surface

The system has one declared route, and it is the direction of every interaction in it:

```
consumer → provident-storeroom entry (index.mjs) → addon artefact (.node, facade) → conversion core → native store
```

| # | from | to | over what surface | direction |
|---|---|---|---|---|
| I-1 | `js-surface` | `js-resolution` | `withAddon()` before any construction; the resolution answer or the absent-addon refusal | call |
| I-2 | `js-surface` | `js-crossing` | each verb's arguments, position by position, to the encoders; the decoded answer back | call |
| I-3 | `js-surface` | `js-registry-delivery` | `stateOf(instance)` for per-instance state; the member set handed the state at construction | call |
| I-4 | `js-surface` | `js-constraints` | the five constraint members and the write path's constraint evaluation | call |
| I-5 | `js-crossing` | `js-surface` (the failure form declared at `L618–L746`) | the package's one refusal form, rendered by `boundaryReject` with the store's own generator, appended with the class and position that failed | call |
| I-6 | `js-resolution` | `delivery` | the five scoped platform names and the version the ladder compares are the manifest's own `optionalDependencies` set — the entry's table and the manifest must name the same five at the same exact version | carried, not called |
| I-7 | `js-crossing` | the addon artefact | the encoded carrier set for `storeCreate` and the verb entries; the answer decoded back | runtime crossing |
| I-8 | `js-registry-delivery` | the addon artefact | `commitFile(opId)` — the terminal arm's only store call, on the passing arm alone | runtime crossing |
| I-9 | `js-registry-delivery` | the caller's own functions | `deliver` invokes each registered function with the triggering ADDRESS as its one argument | the package's own act |
| I-10 | `js-registry-delivery` | `js-crossing` | the `triggered` set's addresses, decoded, and the handle tokens | call |
| I-11 | — **vacated at `D-1`** — | — | stood for `js-constraints → constraint-kernel` as a lazy `require_`; the relation it named is **internal** to `js-constraints` now, and the number is retained rather than reused (see below) | internal, not a boundary |
| I-12 | `js-constraints` (its integrated kernel half) | the instance (an object `js-surface` defines) | the kernel drives the instance's own public members (`write`, `read`, `rollback`, `listen`, `unlisten`, `removeListener`) through the object it is handed | call, consumer-shaped |
| I-13 | `js-surface`, `js-crossing`, `js-declaration` | the store's fail set | the statuses are the store's and are carried, never minted; `index.mjs`'s header states this at `L18–L25` | carried value |
| I-14 | addon artefact (`binding-facade`) | `binding-codec` | each entry's Node-API arguments and its return value | call |
| I-15 | `binding-codec` | `binding-crossing` | the carrier model (`JsConfig`, `JsAddressArg`, `JsValue`, …) | call |
| I-16 | `binding-crossing` | `store-core` | `storeCreate`, `storeCreateWithConstraints`, and the `Store` verb surface | call (`Result<_, StoreError>`) |
| I-17 | `binding-crossing` | `store-args` | the permissive argument carriers folded to the store's arguments | call |
| I-18 | `store-core` | `store-value` | the admitted value domain for every value written and read | call |
| I-19 | `store-core` | `store-args` | `address_segments(arg)` and the config's closure | call |
| I-20 | `store-core` | `store-records` | the returned record shapes, the tier token and the resolver's reference | call |
| I-21 | `store-core`, `binding-crossing` | `store-fail-set` | `StoreError` / `Refusal` construction and the generated messages | call |
| I-22 | `binding-crossing` | `store-value` + `store-records` | `StoreValue` conversion and the `Js*` record wrappers over the store's records | call |
| I-23 | `delivery` | every published module | the `files` allowlist **carries four entries in the tree today** — `index.mjs`, `README.md`, `index.d.ts`, `src/constraint-kernel.mjs` — and `D-1` rules the **fourth has no subject**, so the intended shipped set is three entries plus one the ruling leaves standing in the manifest; the `exports` map publishes `"."` only; five `optionalDependencies` pinned exactly | declared, not called |
| I-24 | `store-battery` | `store-core`, `store-value`, `store-args`, `store-records`, `store-fail-set` | the crate's own integration battery | test drive |
| I-25 | `binding-battery` | `binding-crossing` | the per-class table driven with no Node runtime | test drive |
| I-26 | `js-battery` | `js-surface`, `js-crossing`, `js-registry-delivery`, `js-constraints`, `delivery`, `js-resolution` | `node --test` through the entry (`import { storeCreate } from 'provident-storeroom'`) and, for the kernel's cells, `../src/constraint-kernel.mjs` — a fact of the tree; `D-1`'s consequence is that those cells reach a file internal to one module, not a peer module's published export | test drive |
| I-27 | `greens-harness` | the assembled package (all JS modules) | the entry and the built `.node` as a caller would reach them, per wave | live drive |
| I-28 | `js-declaration` | nothing at runtime | it declares the same surface the entry publishes; no module imports it | declaration |

**I-11 is vacated, and its number is retained rather than reassigned.** At `e2fcbef` that row declared
`js-constraints → constraint-kernel` over `require_('./src/constraint-kernel.mjs')` — **lazily**, inside
`constraintsKernel()`, never at load. `D-1` rules the kernel **not an external import but tightly integrated**,
so the reach it described is **internal to one module** and nothing crosses a boundary there; what stood in the
row was a module boundary, and there is none. The number stays with the row it named because
`strata/decisions.md`'s `D-1` cites `I-11` by number — renumbering would make the ruling's own citation resolve
to a different relation — so **27 boundary interactions stand in this table and no id shifted**. I-12, I-23 and
I-26 are likewise kept at their numbers and restated where `D-1` moved them.

**Two interactions the map states explicitly because they are the ones a reader gets wrong.** The store
invokes no callback: I-9 is the *package's* act, performed after the addon's call has returned, and the addon
only ever returns the triggered handle set (`A57`, brief §5 item 5). And the constraint mechanism is **not an
external import**. The sentence that stood here at `e2fcbef` — I-11's lazy `require_` keeps the entry's
zero-dependency rule intact *"while the kernel still ships in the package's `files` allowlist"* — is
**superseded**: the mechanism is a strict requirement, so there is nothing to defer and nothing separate to
ship, and the fourth allowlist entry's subject is gone (I-23). The `require_` is still in the tree and `D-1`
orders no code move; what changes is that its two ends are one module's ends.

---

## §4 · The e2e I/O surface

What a driver of the whole system touches, and what crosses at each place.

### E1 · The consumer entry — the package's one export

```js
import { storeCreate } from 'provident-storeroom';
const store = storeCreate(cfg);
```

- **Crosses IN:** `cfg` — four declared keys, no fifth (`journalLength` and `listeners` required; `filePath`
  and `constraints` optional; a caller-supplied extra key is ignored rather than refused). Then, per member
  call: an address (`readonly (string|number)[]`), a tier token or tier set, a JS value, a `Handle` (a string
  the caller spells), a `Listener` function, a `ConstraintPair` and a `Constraint` function, a `CommitRecord`,
  an `opId`.
- **Crosses OUT:** the `StoreInstance` (fourteen own members, **none of them data**); a leaf's literal, a
  branch's assembled value or the whole register; `WriteRecord`, `DeleteRecord`, `RollbackRecord`;
  `ConstraintPair[]` from `constraints()`; `ConstraintIdentity`; `undefined` from `listen` / `unlisten` /
  `register` / the toggles; and, on every refusal, **one thrown plain object** `{status, message[, log]}` —
  never an `Error` subclass, never a rejection.
- **Verified at the bytes:** the module carries exactly one `export` (`storeCreate`, `index.mjs:3425`); the
  declaration carries exactly fourteen `StoreInstance` members (`index.d.ts:506–L729`: `read` ·
  `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` ·
  `constraintOn` · `constraintOff` · `register` · `removeListener` · `removeConstraint` · `constraints`), and
  `StoreStatus` is sixteen spellings plus the open escape arm `(string & {})` (`index.d.ts:237–L254`).

### E2 · The addon artefact boundary

- **The path:** `bindings/js/build/Release/storeroom_js_binding.node`, reached by `createRequire` from the
  entry (`index.mjs:85–L86`), or the scoped platform package at rung one.
- **Crosses IN:** the thirteen exported entry names as built — `storeCreate` · `read` · `readLiteral` ·
  `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` · `commitFile` · `register` ·
  `version` · `errorMessage` (`facade.rs`'s `#[napi]` sites, read by grep: lines 297, 513, 559, 606, 645, 679,
  714, 745, 780, 815, 911, 988, 1016).
- **The measurement behind the thirteen, stated exactly, because three greps give three numbers.** The figure
  counts **line-initial `#[napi` attribute sites only**: 4 bare `#[napi]` plus 9 `#[napi(js_name = …)]`. A
  `grep -c '#\[napi\]'` returns **24** and a looser grep **33**, because `facade.rs`'s own prose names the
  attribute many times in comments — those are mentions of it, not sites that export anything. The 13 is
  verified against the file's line-initial attributes, and it stands.
- **Crosses OUT:** a `JsVal` answer per entry, or the store's own thrown `{status, message}` carried verbatim.
- **Note a divergence:** `bindings/js/src/lib.rs`'s closing comment still says *"THE FIVE ENTRY FUNCTIONS KEEP
  THEIR NAMES AND ARITIES — `version` · `errorMessage` · `storeCreate` · `call` · `register`"*. The bytes of
  `facade.rs` declare thirteen annotated entries and **no `call`**: the single `call` dispatcher the comment
  describes has been replaced by nine per-verb entries plus `commitFile`. Recorded, not resolved.

### E3 · The store file boundary

- **The path:** `cfg.filePath`, probed at construction; the register's tier is fixed there and never moves.
- **IN:** the file's bytes at boot, through the store's own codec only (*never read, edited, parsed or migrated
  by hand* — brief §5 item 6).
- **OUT:** the canonical JSON image, written by the terminal arm's `commitFile`/`commit_file` on a passing
  `file`-tier write alone, before any listener body runs.
- **A `delete` and a `rollback` cross this boundary in neither direction** (brief §5 item 7).

### E4 · The publication boundary

- **IN:** `npm install provident-storeroom` for a consumer; a registry install for the five platform packages;
  the release workflow's run.
- **OUT:** the `provident-storeroom@0.5.0` package, one `exports` arm (`"."`), and five
  `@auspicion/provident-storeroom-js-*` packages pinned **exactly** at `0.5.0`.
- **Verified:** `bindings/js/package.json` — `version` `0.5.0`, `files` = `index.mjs` · `README.md` ·
  `index.d.ts` · `src/constraint-kernel.mjs` (four entries), `engines.node` `>=18.0.0`, five exact
  `optionalDependencies`.
- **The allowlist is what `D-1` corrects, and both halves are stated.** The tree **does** carry four entries
  today — that is a fact of the manifest, not a reading — and `D-1` rules that the **fourth
  (`src/constraint-kernel.mjs`) has no subject**, because a tightly integrated kernel is not published as a
  separately-reachable module. So the shipped set the ruling intends is three entries plus one row the ruling
  leaves in place. **This map records the ruling and does not pretend the code has moved**; no manifest edit is
  ordered here, and the fourth-row removal is an implementation pass's act.

### E5 · The repository's instrument surface (not the product's)

`package.json` at the root is **private** and declares the gate-9 trio plus the greens:
`npm test` (`node --test bindings/js/test/*.test.mjs`), `npm run typecheck` (staged copy + two `tsc`
projects), `npm run build` (two `cargo build`s), `npm run greens` (three runners). Nothing here is a consumer
entry point; it is how the batteries in §2.4 are driven.

### E6 · The kernel's loop — inside the module, no longer a package surface

`constraint-kernel.mjs` carries six `export` sites (`register` · `commit` · `runAttempt` · `log` · `report` ·
`remove`, read at L486, L1008, L1158, L2063, L2075, L2111). At `e2fcbef` this subsection declared those six
**a caller loop deliberately outside the package**, on the ground that the kernel was a separately-reachable
published module (`files` entry four) with its own consumer-facing entry points. **`D-1` supersedes that
reading:** a tightly integrated kernel **publishes no export set at all**, so the six are not a surface anything
outside the module crosses, and the pin that once governed them — an archived unit's *"exactly five"*, widened
to six, with a seventh refused by name — **governs nothing outside the code**. The six functions remain a fact
of the file (`D-1` orders no code move); they are internal to `js-constraints` (§2.3), and their endpoints are
among the seven the revision dissolves (FIGURES, §1).

**A divergence is recorded, not resolved.** This subsection also said the entry never invokes the loop. The tree
says otherwise: `constraintsKernel()` is called at `L3995`, `L4089`, `L4156`, `L5426`, `L5542`, `L5599`, and
`constraintWrite` runs `kernel.commit(instance, address, tier, value)` at `L5723` then
`kernel.runAttempt(instance, record)` at `L5729` — the brief's account, verified at the bytes. **Nor is that the
`A112` question:** whether delivery follows the constraint pass is still `OWED` a measurement (brief §6, §7
below), and this map takes no position on it.

---

## §5 · Paths not owned by exactly one module

**THE ARITHMETIC OF §5, RECONCILED.** 105 paths owned by exactly one module (`§2`) + 1 co-owned (`§5.1`) + 20
unowned with a reason (`§5.3`) = **126**, which is the number of tracked non-`scratch/` paths in
`git ls-files`. No path is unaccounted for. The one path that accounts for the difference between the first
pass's 125 and the tracked 126 is **`scripts/publish.sh`** — tracked, at the repository root's `scripts/`, and
the release runbook — which that pass neither owned nor listed; this correction pass **gives it an owner**:
`delivery`, whose declared responsibility already carries *the release pipeline* and which already owns
`.github/workflows/publish.yml`, the workflow the script's own tag push fires (§2.3). `scratch/`'s 477 tracked
files are outside that 126 altogether, and §5.4 is why.

### §5.1 Co-owned — one file, several declared ownership regions

| path | why it is not owned once |
|---|---|
| `bindings/js/index.mjs` | 5,903 lines carrying five plainly distinct responsibilities (resolution, failure form, walk/codec, registry/delivery, constraints). §2.3 declares the regions and which module owns each; the physical file cannot be owned by exactly one module until the regions are separable. **This map does not order the separation** — the split is an ownership declaration, and §6 Q2 asks whether it should be taken. |

### §5.2 Generated, vendored or built — present on disk, excluded by the project's own rules

`.cargo-home/` (the vendored crates.io cache, which its own ignore entry describes in those words: *"24 MB and
1,589 files … NEVER A DELIVERABLE AND NEVER A SOURCE"* — root `.gitignore` lines 154–169); `target/` and
`bindings/js/target/` (Rust build output); `bindings/js/build/`
(the built `.node`); `bindings/js/Cargo.lock`; `typecheck/node_modules/` (a staged copy of the shipped
manifest and declaration, rebuilt by `npm run typecheck`); `archive/` (the historical corpus — gitignored by
the project's own process rule, so the `archive/pre-strata-docs-2026-10-24/` tree the task describes is
**present but untracked**); `.impl-rc8-backup/`; `.tracker-reflow-backup/`; `.npm-cache/`.

**`scratch/` is not in this class** — it is not excluded by an ignore rule at all, and it must not be read as
though it were. See §5.4.

### §5.3 Harness and configuration — owned by no product module, and why

| path | class | reason |
|---|---|---|
| `package.json` (root) | harness | The private instrument manifest; *"INSTRUMENT HARNESS ONLY … NOT a publishable package"* (its own description). It carries no version of the deliverable. |
| `package-lock.json` (root) | harness lock | Produced by the harness's own `typescript` devDependency. **No ignore rule names it, and it is tracked** — verified: `git ls-files` lists it. |
| `Cargo.lock` (root) | store lock | **Present on disk and tracked** — verified: `git ls-files` lists it. Root `.gitignore` prose says it *"STAYS UNCOMMITTED by decision"* (`binding-crate-and-abi.md §1`) **and neither an ignore rule nor the index implements that** — the contradiction is the repository's own, and it is recorded here rather than resolved. |
| `tsconfig.typecheck.json`, `tsconfig.typecheck.nodenext.json` | configuration | The two `tsc` projects the harness runs; they describe a staged copy, not the product. |
| `typecheck/consumer-fixture.ts` | harness fixture | The consumer-shaped fixture the type check compiles against. |
| `.gitignore` (root), `bindings/js/.gitignore` | configuration | Repository hygiene rules. `bindings/js/.gitignore` is the crate's own ignore set and is deliberately **not** owned by `delivery`, because it is a rule about what never ships. |
| `README.md` (root) | repository documentation | Product-level prose; the brief cites it, but no module's behaviour depends on it. (The *shipped* README at `bindings/js/README.md` **is** owned, by `delivery`.) |
| `LICENSE` | licence of record | *"Carried into every artefact at assembly time"* (brief §1). It is an input to the assembly, not an artefact any module produces; the package's `files` allowlist deliberately carries **no** `LICENSE` row. |
| `docs/specs/**` — 9 contracts | specification corpus | The authoritative kept contracts (`storeroom-native`, `storeroom-js` + `surface.md`, `storeroom-publish`, `storeroom-json-crossing`, `storeroom-held-listener-identity`, `storeroom-constraints`, `storeroom-addon-surface`, `storeroom-addon-adoption`). They are this workflow's *inputs*, and no code module owns its own specification: a module that owned its contract could amend what it is measured against. |
| `strata/brief.md` | L1 input | The brief itself. `strata/decisions.md` was **absent when this map was written** and is **present now**, carrying `D-1` — it is the authority this revision applies. Neither file is owned by a code module: a ruling is not a module's to hold. **Whether `strata/decisions.md` is tracked is not verified by this pass** (no shell), so it is neither owned nor counted; see FIGURES. |

### §5.4 `scratch/` — excluded from ownership by convention, never by an ignore rule, and git disagrees

**477 files under `scratch/` are tracked in git.** The tree as a whole carries no ignore rule; only scattered
subpaths of it do, and the root `.gitignore` names them one by one — `scratch/live/install-0.2.0/drive/`,
`scratch/probe-shape-a/`, `scratch/depth-probe/`, `scratch/g7-cache/`, `scratch/g7-consumer/`,
`scratch/g7-logs/`, `scratch/g7-stage/`, `scratch/npmcache/`, `scratch/def-f-live/`, `scratch/def-f-probe/`,
`scratch/jcx-impl/`, `scratch/jcx-s17/`. Everything else under `scratch/` is in the index.

What excludes those 477 from ownership is the project's own **convention**, and the root `.gitignore` states
it in those words in its own prose: **"a scratch is never a source"** (`.gitignore:217`). On that rule every
one of the 477 is a probe, a byproduct, a log or a one-off driver — **and that class is the whole answer**:
this map does not classify them path by path, and no reader should expect a per-file inventory of `scratch/`
anywhere in it.

**The convention and git's tracking disagree here, and this map says so instead of smoothing it over.** A
reader who runs `git ls-files` will see all 477 of those files; a reader who trusts the first pass's claim
that `scratch/` was *"excluded by the project's own ignore rules"* would not, and that claim was false.
Nothing under `scratch/` is owned, co-owned or listed as unowned, and none of it enters the 126-path
denominator. The whole tracked tree is **603 = 477 + 126**, which accounts for every path git carries.

---

## §6 · Boundaries that are unclear in the existing tree

Stated as the question to be decided, not as a decision taken.

**Q1 — `src/store.rs`: one module, or one module per declared region?** The file is 2,472 lines and holds one
`Store` with 1,577 lines of methods across the contract's own regions: the resolver and walk
(`storeroom-native/contract.md` §2), the write/read/delete verbs (§3–§4), the tiers and purge chain (§5), the
journal, rollback and watched-address list (§6), the file image and construction (§7), and the listener home
(§6.5). **The tree draws no boundary inside it** — one `impl` block, no region banners — so this map adopts it
whole. Should ownership follow the file (as declared), or should the six contract regions each be owned
separately, which would make `src/store.rs` a second co-owned path?

**Q2 — are the five declared regions of `index.mjs` the right boundaries, and specifically: (a) the symbol-key
block at `L88–L200`, where `FORGET_PAIR` and `KERNEL_REFUSAL` are written for `js-constraints` to read while
the block itself is declared under `js-registry-delivery`; (b) the failure form at `L618–L746`, owned by
`js-surface` but called from inside `js-crossing`'s encoders; (c) the 1,169-line `storeCreate` at
`L3425–L4593`, which both defines the fourteen members and constructs the instance state, so the surface and
the registry cannot be separated without a code change?** Is the split to be taken at all, or is `index.mjs`
to remain one module and the size accepted?

**Q3 — batteries as modules, or tests owned by the module they drive?** This map declares four harness
modules (`store-battery`, `binding-battery`, `js-battery`, `greens-harness`) because each battery is a real,
discrete unit and because the alternative requires assigning 75 individual battery files to product modules
— and six of those are genuinely shared (`tests/support/mod.rs`, `bindings/js/tests/support/mod.rs`, and the
four `bindings/js/test/*-helpers.mjs` / `*-support.mjs` files, which are imported across subjects). Should a
test path be owned by the module whose behaviour it drives, with those six helper files listed as shared?

**Q4 — where do the build inputs belong: `build.rs`, the two `Cargo.toml` files, and one correctness choice
that lives inside a manifest?** This map gives `build.rs` to `binding-facade` (it exists for the facade's
symbols and emits the facade's version stamp) and both crate manifests to `delivery`. But the root
`Cargo.toml`'s `serde_json` `float_roundtrip` feature is declared there as *"NOT OPTIONAL AND NOT A
PERFORMANCE CHOICE — IT IS A CORRECTNESS ONE"*: without it a `file`-tier state holding `f64::MAX` writes bytes
the decoder cannot read back. Should that feature selection be owned by `store-value` and the manifest split,
or does a manifest's whole content belong to delivery?

**Q5 — are the kernel and the declaration peers or dependants?** **(a) is answered by `D-1`, and the question is
kept so a reader sees what was asked.** It read: *"`constraint-kernel.mjs` is declared here as a peer module
that `js-constraints` loads lazily, which matches the fact that it is a separate published file (`files` entry
four) with its own six exports and its own battery. Should it instead be owned by `js-constraints`…?"* — **yes,
and `D-1` is the ground:** the kernel is not an external import, so it is not a peer, and one integrated module
owns both paths (§1 row 13, §2.3). The question is **closed, not re-decided here**; what `D-1` leaves open is
the *physical* merge, which is an implementation pass's act and which the ruling does not order. **(b) is still
open.** `index.d.ts` is declared here as a peer (`js-declaration`) because it is hand-authored and shipped and
the brief lists it as its own layer. But it declares shapes no runtime member of the entry carries (`BaseState`,
`AttemptRef`, `CommitRecord`, `LogEntry`) and it is the surface the type check measures — should the
declaration be owned by `js-surface` as *the surface's own declaration*, or stay a peer so that a divergence
between the two is visible as an interaction rather than hidden inside one module?

---

## §7 · What was read off a file, and what was concluded

**Read at the bytes** (file + site named in the body): the seven `src/*.rs` paths and `src/lib.rs`'s re-export
list; `bindings/js/src/lib.rs`'s three-module declaration; the `Store` public method list and `storeCreate`'s
two entry points (`src/store.rs`); `facade.rs`'s thirteen **line-initial** `#[napi]` sites (§4 E2 says which
measurement that is); `crossing.rs`'s `Instance` methods
and its 45 public items; `codec.rs`'s `Codec` methods; `constraint-kernel.mjs`'s six `export` sites (L486,
L1008, L1158, L2063, L2075, L2111) — **read as exports of a file, not as a published export set, since `D-1`
rules a tightly integrated kernel publishes none**;
`index.d.ts`'s fourteen `StoreInstance` members and sixteen-plus-open `StoreStatus`; `index.mjs`'s single
export and its function-declaration line map, and — added by this revision — the `constraintsKernel()` call
sites and the `kernel.commit` / `kernel.runAttempt` calls at `L5720–L5729` (§4 E6);
`bindings/js/package.json`'s version, `files`, `exports`,
`engines` and five exact pins; the root `package.json`'s scripts and `private`; root `Cargo.toml`'s
`float_roundtrip` clause; both `.gitignore` files; the nine `docs/specs/**` paths and the section headings of
`storeroom-native/contract.md` and `storeroom-js/contract.md`; and, for the revision, all of
`strata/decisions.md`.

**Concluded, not read:** that the five `index.mjs` regions correspond to five coherent responsibilities
(the boundaries are the declaration sites, which I measured; the *coherence* is my judgement); that the
`contract.md §3.4`/`§0.4` boundary clauses and the bytes agree on the binding crate's three-module split (they
do as far as the split goes, but the *content* of `codec` was read only at its method list); that `delivery`'s
responsibility is one thing rather than two; and every count in this file's header — those counts remain a
disk measurement *by method*, and the aggregate denominator plus the three figures the measurement limit names
have since been reconciled to the tracked set by a supervisor-run shell pass, not by this one.

**Divergences verified at the bytes** — between the brief and the tree, or between an earlier reading in this
map and the tree — recorded so no reader inherits a stale figure:

1. **The kernel DOES ship — and `D-1` rules its allowlist row has no subject.** Brief §6 says *"The constraint
   kernel does not ship … `bindings/js/package.json`'s `files` still has three entries; `src/**` reaches no
   consumer today"*. The bytes read four entries — `index.mjs`, `README.md`, `index.d.ts`,
   `src/constraint-kernel.mjs` — and the corpus's own clause agrees (`greens.mjs:1211` quotes
   `distribution.md §2.1` item 6, *"the kernel's own module as the FOURTH entry"*). **The tree fact stands
   unchanged by this revision** (the manifest is not edited here); what `D-1` adds is that the fourth entry has
   no subject under an integrated kernel, so the *shipping* reading and the *ruling* are both carried and
   neither is used to erase the other (§4 E4, I-23).
2. **`index.mjs` is at the package root, not under `src/`.** The brief's §2 table and the task statement both
   list it as `bindings/js/src/index.mjs`; the tree has it at `bindings/js/index.mjs` (5,903 lines, confirmed
   at the file's own end-of-file marker) and `bindings/js/src/` holds no `index.mjs` at all.
3. **`bindings/js/src/lib.rs` describes five addon entries including `call`; `facade.rs` declares thirteen and
   no `call`** (§4 E2).
4. **The commit act is `Store::commit_file`, not `Instance::commit_file` as `storeroom-native/contract.md`
   §0.4's row spells it** — `src/store.rs:1343` declares it inside `impl Store`, and the crate re-exports
   `store::{storeCreate, storeCreateWithConstraints, Store}` with no `Instance` type.
5. **The store crate's manifest declares `license = "GPL-3.0-or-later"`** while the package and the brief
   carry `AGPL-3.0` / `AGPL-3.0-or-later` (`bindings/js/Cargo.toml`). Not an ownership question; recorded
   because ownership puts `delivery` in front of both files.
6. **`E6`'s old claim that the entry never invokes the kernel loop was wrong, and the brief was right.**
   `index.mjs` calls `constraintsKernel()` at `L3995`, `L4089`, `L4156`, `L5426`, `L5542`, `L5599` and runs
   `kernel.commit` / `kernel.runAttempt` at `L5723` / `L5729`. Recorded because the sentence this revision
   replaced asserted the opposite, and `D-1` does not depend on either reading (§4 E6).

**Not verified:** the tracked status of this map's owned entries **path by path** — a supervisor-run shell
pass settled the aggregate (603 tracked, 477 of them under `scratch/`, 126 outside it), the `#[napi]` figure
and the two root lock files, but it did not walk §2's ownership table line by line; **whether
`strata/decisions.md` is tracked, which this revision could not check** (it had no shell either), so whether the
tracked denominator is now 127 rather than 126 is owed a check and FIGURES keeps the 126 as measured; whether
the five platform package names resolve on any registry (`LIVE / INSTALL` is OPEN, brief §6); the A112 ordering
gate's state (the brief carries it as RED; this map takes no position); and the tier-eviction reading, which the
brief itself declines to settle.
