# Brief — `Provident-Storeroom`

**WHAT THIS FILE IS.** The condensed project brief: what the product is, what it is for, how it is used, and
what the tree beneath it actually contains. It is distilled from the project's two use-case guides —
`docs/guides/package-use.md` (1,148 lines, the consumer story) and `docs/guides/electron-integration.md`
(519 lines, the Electron story), both now at
`archive/pre-strata-docs-2026-10-24/docs/guides/` — and **checked line by line against the tree as it stands
on branch `docs/pre-strata-consolidation`.** It is an L1 input. It states use cases and ground truth; it
designs nothing, ranks nothing and opens no unit.

**SOURCE STATUS — READ BEFORE TRUSTING ANY SURFACE FIGURE IN THIS FILE.** Both guides describe the
`0.2.0`/`0.3.0`-era surface and both say so themselves. The surface has moved under them twice, and the moves
are declared in the kept contracts, not in the guides:

- **The module namespace is ONE name.** `bindings/js/index.mjs` carries exactly one `export`
  (`storeCreate`). Every `read(store, …)` / `write(store, …)` / `listen(store, …)` sample in both guides is
  the superseded module form and is *wrong* under the current surface, not merely redundant.
- **The instance's member set is FOURTEEN**, per `bindings/js/index.d.ts`'s `StoreInstance` declaration:
  `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `register` ·
  `removeListener` · `removeConstraint` · `addConstraint` · `constraintOn` · `constraintOff` · `constraints`.
  There is **no `on`**, **no `off`** (merged away) and **no `settle` member** in the declaration.
- **`listen` changed shape**, and this is the largest single divergence:
  `listen(handle: Handle, addresses: readonly Address[]): void` — the *caller* spells the handle, the address
  position is a **SET** with `[]` in the domain, a repeated call is set-assignment and not union, and the call
  answers `undefined`. `unlisten(handle)` is the withdrawal. Every listener sample in both guides is
  superseded (`docs/specs/storeroom-held-listener-identity/contract.md §2.2`, `listen-verb.md §1`–`§3`).
- **Two removal members exist**, `removeListener(handle)` and `removeConstraint(pair)` — the guides' repeated
  claim *"no removal route exists"* is superseded. `constraints()` is the registered-pair read.
- **The published package is `0.5.0`** (`bindings/js/package.json`), and the closed failure set is **sixteen**
  statuses plus the open escape arm `(string & {})` (`index.d.ts`, the `StoreStatus` declaration).

**THE RULE THIS BRIEF APPLIES:** where the guides and the tree disagree, the tree wins and the kept contract
part is cited; where neither decides a question, this file says **`OWED`** rather than choosing.

---

## §1 · What the product is

**`provident-storeroom` is a centralized storage plugin for `Provident-Electron` apps** (`README.md`). Its
concrete shape is more specific than the sentence:

| layer | what ships | where it lives |
|---|---|---|
| the store | a native **Rust** register: record shapes, the walk, the verbs, tiers, journal and rollback, persistence | `src/` — crate `storeroom-native` |
| the JS crossing | a **Node-API addon** binding the store into JS, plus the value crossing, the codec and the constraint kernel | `bindings/js/src/` |
| the entry | a thin **ES-module facade** — one module name, the instance's members, the registry and the failure form | `bindings/js/index.mjs` |
| the declaration | a **hand-authored** `index.d.ts`, not a generated one | `bindings/js/index.d.ts` |
| the delivery | the `provident-storeroom` package plus **five** per-platform binary packages, pinned exactly | `bindings/js/package.json` |

- **The claimed realm is Node ESM and nothing else.** Node CJS, Electron `main`/`preload`/`renderer`, the
  browser, `worker_threads` and IPC are each **unclaimed** by the package; the Electron story is a *guide*,
  not a declared realm (`docs/specs/storeroom-js/package.md §1`).
- **Licence of record:** `LICENSE` is `AGPL-3.0` and travels with every published artefact at assembly time.
  **Three spellings stand in the tree and they are not identical:** the root `Cargo.toml` says
  `GPL-3.0-or-later`, `bindings/js/Cargo.toml` says `AGPL-3.0-or-later`, and `bindings/js/package.json` says
  `AGPL-3.0`. A reader should not assume the root crate's spelling is a typo without the architect saying so.
- **Runtime floor is `engines: { "node": ">=18.0.0" }`** — a pinned domain, not a provisional figure, and far
  below what the artefact actually needs, because the addon's Node-API surface is ABI-stable and the facade
  stays low in it (`docs/specs/storeroom-publish/release.md §1.1` item 3, `parameter-semantics.md §2.6`).
- **No JavaScript substitute store exists and none is declared.** An absent or failed addon refuses; it never
  degrades to a JS store, never absorbs state silently, never returns a partial instance
  (`docs/specs/storeroom-publish/resolution.md §5.3`).

---

## §2 · The tree as it stands

**This is the inventory the ownership plan has to divide. Figures are measured on this branch.**

| unit | files | size | what it is |
|---|---|---|---|
| `src/` | `lib.rs` 41 · `store.rs` 2,472 · `error.rs` 795 · `args.rs` 329 · `value.rs` 330 · `records.rs` 268 · `json.rs` 203 | 252 KB | the native store crate |
| `bindings/js/` (package root) | **`index.mjs` 5,903** · `index.d.ts` 788 · `package.json` · `build.rs` · `README.md` · `.gitignore` | 458 KB for the entry | the shipped package: the entry, the declaration, the manifest |
| `bindings/js/src/` | `constraint-kernel.mjs` 2,203 · `crossing.rs` 1,178 · `facade.rs` 1,105 · `codec.rs` 966 · `lib.rs` 90 | — | the addon crate's Rust and the constraint kernel |
| `bindings/js/platforms/` | 5 platform packages × (`package.json` + `README.md`) | — | the per-platform binary carriers |
| `tests/` | 15 Rust integration files | 1.1 MB | store-side battery |
| `bindings/js/test/` | 42 `*.test.mjs` | — | JS battery: surface, kernel, listeners, codec, properties |
| `bindings/js/tests/` | 7 Rust files | — | the binding crate's own battery |
| `bindings/js/greens/` | 11 drivers — `greens.mjs`, `live-drive.mjs`, per-wave scenario drivers | — | the project's own greens runners |
| `typecheck/`, `tsconfig.*.json` | a consumer-shaped fixture plus two `tsc` projects | — | the type-check harness |
| root manifests | `Cargo.toml`, `package.json`, `Cargo.lock`, `package-lock.json`, `scripts/publish.sh` | — | private instrument harness; **not** a publishable package |
| `scratch/` | **477 tracked files** | — | probes, byproducts, logs and one-off drivers — **tracked in git**, and excluded from ownership by the project's convention that *a scratch is never a source*, not by an ignore rule |

**Three facts about this tree that the ownership plan must respect:**

1. **`bindings/js/index.mjs` is one 5,903-line file** and is the only shipped entry. It carries the instance's
   fourteen members, the registry, the refusal mapper and the delivery path in one unit — the single largest
   undivided ownership question on the board.
2. **The root `package.json` is deliberately private** and gives the repository its gate-9 trio
   (`test`/`typecheck`/`build`) against what exists here; the deliverable is `bindings/js`
   (`package.json`, its own description field).
3. **The store-side and JS-side batteries are separate and neither is redundant:** `tests/` drives the Rust
   crate, `bindings/js/test/` drives the addon through the entry.

---

## §3 · The surface today

**One module name and the instance's members; nothing else crosses.** This is what a consumer writes against:

```js
import { storeCreate } from 'provident-storeroom';

const store = storeCreate({
  journalLength: 256,       // REQUIRED — positive integer, bounds the journal and so the undo window
  listeners: [],            // REQUIRED, even when empty — an absent `listeners` is refused
  filePath: '/…',           // OPTIONAL — what makes the `file` tier real, and what construction occupies
  constraints: [],          // OPTIONAL — the application's own list; NEVER persisted
});
```

| member | shape | one line |
|---|---|---|
| `read` | `(address, tier?) => unknown` | a leaf's literal, a branch's assembled value, or the whole register |
| `readLiteral` | `(address, tier?) => unknown` | the same, narrowed to a leaf — **a branch refuses** |
| `write` | `(address, tier, value, commit?) => WriteRecord` | `commit` is the kernel's own position; an external caller leaving it out is the supported form |
| `delete` | `(address, tier?) => DeleteRecord` | a method name, not an identifier binding |
| `rollback` | `(opId) => RollbackRecord` | walks backward and undoes **that op and everything after it** in scope |
| `listen` | `(handle, addresses) => void` | **caller spells the handle**; the address position is a SET; set-assignment, not union |
| `unlisten` | `(handle) => void` | withdraws the store-side entry and the registry entry where the identity stands nowhere |
| `register` | `(handle, listener) => void` | one handle, one function — a second registration replaces the first |
| `removeListener` | `(handle) => void` | the entry removed whole, store entries withdrawn |
| `removeConstraint` | `(pair) => void` | **the one act that deletes an identity** |
| `addConstraint` | `(pair, constraint) => ConstraintIdentity` | carries the function; **overwrites at a held pair and throws nothing for it** |
| `constraintOn` | `(pair, constraint) => void` | enable — idempotent; throws at a pair the store does not carry |
| `constraintOff` | `(pair, constraint) => void` | disable — idempotent; **not a removal** |
| `constraints` | `() => ConstraintPair[]` | the registered pairs, `{address, id}` only — **no function, no identity, no order, no `enabled`** |

**The private-state rule that a designer keeps breaking:** the instance is the handle you act through, and
**no own member is a data member.** There is no `store.data`, no `state` field and no getter over the register;
`read(address)` is the route. **There is no release verb** — construct one store and keep it for the process's
life.

---

## §4 · The use cases

**The eleven below are the whole of what the two guides promise a consumer. Each carries the behaviour that
makes it non-obvious, because that is what a designer gets wrong.**

**UC-1 · Install and resolve.** One name installs; the package pulls its own binary; the five platform packages
are `optionalDependencies` pinned **exactly**, because npm's dedupe could otherwise satisfy the loader with a
differently-versioned copy. Resolution is three ordered rungs: the scoped platform package (a published
install), then the module-relative addon beside the entry (the checkout rung), then the one declared
absent-addon refusal. **Every throw at rung one is a miss, not an error.** Rung two compares no version.
`docs/specs/storeroom-publish/resolution.md §2.1`, `§3.2`, `§5.1`.

**UC-2 · Construct a store, once.** Four declared keys and no fifth; a caller-supplied extra key is ignored
rather than refused. The register's tier is fixed at creation — `file` where `filePath` was provided and
passed the probe, `mem` otherwise — and never moves. **Every construction argument is validated before any
filesystem act**, so a refused construction leaves no instance, no file and no byte.
`docs/specs/storeroom-native/contract.md §10.4` parts 1–5, `§8.1` #13.

**UC-3 · Address-shaped CRUD.** An address is a path from the register walked one segment at a time; a segment
is a `string` key or a non-negative integer index. Five rules a reader guesses wrong: the empty address is the
register and the register is a branch; `''` is a legal key and `'a.b'` is not an address at all; integral
segments are in domain to `Number.MAX_SAFE_INTEGER`; an index aimed at the register is `AddressNotFound`; a
sparse address array is malformed. `docs/specs/storeroom-js/crossing.md §1.3`–`§1.4`,
`docs/specs/storeroom-native/store-model.md §2.2`.

**UC-4 · Write a shape and read it back.** **A nested write does not create its parent** — the parent must
already stand, and the failure is the write's own `AddressNotFound` naming the container it looked in. A
structured write at a key **mints the branch tree beneath it in one call**, which is the other way to create a
shape. A branch assembles one member per child key; an array container assembles a dense array; an empty
container reads `{}` or `[]` and the two are distinct. **A write whose value kind contradicts the container
answers `ContainerKindConflict` rather than converting.**
`docs/specs/storeroom-native/write-and-read.md §3.4` (`W-4`, `F-4`), `§4.2` (`R-2`, `R-3`).

**UC-5 · Tiers decide which version a read lands on.** The order is `file` > `mem` > `temp`, and **it is not a
layered stack**: a write at a tier purges the versions it outranks, so one version is left holding the key. A
read narrowed to a tier the key no longer holds refuses `TierNotFound` **and names the tiers that are
present**. The one state with two versions at one key is a **shadow**, where the key holds a *more* persistent
version than the write's — the shadow wins the unqualified read. The tier argument's arity differs by verb:
readers take absent, one token or an any-match array; writers and deletes take **exactly one**.
`write-and-read.md §3.1.1`, `§3.4` (`W-1`, `W-5`, `W-6`), `§4.2` (`R-4`).

**UC-6 · Durability is a property of `file`-tier WRITES only.** A `file`-tier write is the arm that touches the
file, and **the write verb itself performs no file I/O on any of its arms** — the save belongs to the
package's terminal arm, performed on the passing arm alone, before any listener body runs, keyed by the
record's `op`. **A `delete` performs no file I/O at any tier scope and a `rollback` performs none either**, so
a durable version deleted in memory **stands again after a re-boot** — that re-boot is the store's declared
boot, not a defect. On a save that fails, the file tier rolls the write back in the journal automatically and
the caller receives `FileCommitFailed` after that rollback. `write-and-read.md §3.2`, `§4.3`, `§6.4` item 8,
`§7.2` item 5, `docs/specs/storeroom-native/seams-and-lifecycle.md §7.2`. **ONE PART OF THAT CLAUSE IS `OWED` A
CHECK: the guides describe the save as performed by an instance member named `settle`, and `settle` is no longer
a declared member** (`index.d.ts`, `StoreInstance`), so the arm's present carrier is unverified here even though
the *rule* — the save lands on the passing arm and only there — is the declared one.

**UC-7 · Undo, bounded by the journal.** `rollback` is **not a single-op undo**: its scope is every operation
touching the same subtree, and its answer's `undoneOps` is a report of reversals **performed**, newest first.
`journalLength` is the whole undo window; it bounds the journal and the store compacts entries into a base
state as it fills. **A rollback whose candidate set includes one compacted entry fails `RollbackCompacted` and
undoes nothing** — the floor is all-or-nothing. A rollback appends no entry, and an undone entry is marked
`compacted: true` — one flag with two grounds and no member to tell them apart.
`write-and-read.md §6.1`–`§6.4` (`M-4`–`M-9`).

**UC-8 · Watch for changes.** Listeners fire on `write` and `delete`, never on read, and **the store invokes
nothing** — it returns the triggered handle set and the client's registry matches handle to function. The
listener's one argument is the **triggering address**, so a listener registered above a changed node can tell
which node changed. An unregistered handle fires nothing, silently; a second `register` replaces the first;
`triggered` membership is decided by address prefix and by nothing else; a registration made during a firing
window is not invoked in it. **A handle must not cross a process reload**: a prior session's token names no
registration and `register` over it is a refusal. **One write's set is delivered in two layers** — constraints
evaluated before the durable save, listeners invoked after it — so a registration reachable in both layers
runs once in each, and registering one thing as both is an unsupported anti-pattern rather than a defect.
`docs/specs/storeroom-js/surface.md §2.4`, `§2.11`, `write-and-read.md §6.5`,
`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3.

**UC-9 · Constrain writes.** Two population routes and neither substitutes for the other: the batch at
creation (`cfg.constraints`, elements `{address, id, constraint}` where the pair is the addressing and the
function is the substance) and the post-creation add route. **The list is never persisted** — the importing
application supplies it from its own information at every startup — and it is validated at two instants, at
construction and at a boot over an existing file, both answering `ConstraintListInvalid` with no instance.
Toggles enable and disable and are idempotent; a toggle naming an uncarried pair throws. **A registered pair
stays registered until `removeConstraint` — `constraintOff` is not a removal, and a disabled pair still
appears in `constraints()`.** `docs/specs/storeroom-native/contract.md §8.1` #16, `§7.2` item 6,
`docs/specs/storeroom-js/surface.md §2.12`, `parameter-semantics.md §2.21`.

**UC-10 · Refuse in one form.** Every refusal is **thrown synchronously as a plain object** carrying
`{status, message}` — never an `Error` subclass, never a rejection, never `{ok: false}`, so `try/catch` is the
whole error model. The `message` is generated from the code and the failing trigger's arguments, never
hand-authored at a call site, and its general shape carries the address, the domain and what was found
instead. **The set is sixteen and OPEN by design** (the declaration carries an escape arm), so a consumer
never treats an unknown `status` as success (`docs/specs/storeroom-native/seams-and-lifecycle.md §8.1`,
`§8.2`; `index.d.ts`).

**UC-11 · Run it under Electron.** The store is a native addon and runs **in the main process only**; the
renderer reaches it through a small, closed, data-only preload bridge and never through `nodeIntegration`.
Node-API is ABI-stable so `npmRebuild: false`; a `.node` cannot load from inside an asar, so
`asarUnpack` covers `**/*.node` **and** the platform package directory; the binary must be signed and
notarised; `filePath` belongs under `app.getPath('userData')` with its directory created first; open at
`whenReady`, one store per app instance. **A dev-green store proves nothing about the shipped app** — the
verification ladder is *envelope* → *loaded in dev* → *loaded in the packaged app* → *installed from the
registry*, and a green on one layer does not retire a red on another.
`docs/guides/electron-integration.md §1`–`§12` (guide, archived), `docs/specs/storeroom-publish/contract.md`.

---

## §5 · Invariants a design must not break

1. **One store per process, constructed once, no release verb.** The register is one structure with one
   journal and one listener map; two constructions are two stores.
2. **The crossing is a deep copy in both directions**, and values must be structured-clone-compatible.
   **If it cannot cross IPC it cannot be stored** — that single rule unifies the value domain with Electron's
   own boundary. Refused values answer `ValueNotAdmitted`, and the walk refuses nesting past `64` or more
   than `1,000,000` visited nodes with no configuration knob (`crossing.md §1.2`, `§1.4`).
3. **No own member of the instance is data.** The only route to state is a read.
4. **The failure set is closed by the store and open by declaration.** The package mints no member, widens no
   set and renames none.
5. **The store invokes no callback.** Delivery is the client's act; the package's registry is the
   handle→function map.
6. **The file is the store's.** Never read, edit, parse or migrate it by hand; a migration reads through the
   store and writes through the store.
7. **Durability, undo and deletion are three different scopes** and only `file`-tier writes touch bytes.
8. **A green is always reported with its layer.**

---

## §6 · Open questions and known limits the model must inherit

**These are live on this branch and are not the strata model's to resolve:**

- **The `A112` ordering question is UNVERIFIED on this branch, and it was RED when the tracker last spoke.**
  The law is: the surface runs the triggered constraints first and the other listeners only once every
  constraint has passed. The archived tracker (`docs/next-steps.md` `N7`, now at
  `archive/pre-strata-docs-2026-10-24/`) measured it **red** on 2026-10-15 — the listener ran inside the write
  window and was delivered exactly where the model requires zero — and carried a two-way carrier decision that
  was the architect's to take: `CommitRecord.pending` versus a store-surface signal. **This pass did not
  re-measure it.** All that is verified here is that the entry does call the kernel: `index.mjs` reaches
  `kernel.commit(instance, address, tier, value)` and then `kernel.runAttempt(instance, record)`. **Whether
  delivery now follows the pass is `OWED` a measurement, not a claim either way.**
- **The constraint kernel DOES ship — corrected, and the archived tracker says otherwise.** `bindings/js/package.json`'s
  `files` carries **four** entries — `index.mjs`, `README.md`, `index.d.ts`, `src/constraint-kernel.mjs` — so
  the *"`src/**` reaches no consumer today"* limitation the tracker recorded is superseded. **And the kernel's
  export set is SIX** (`register` · `commit` · `runAttempt` · `log` · `report` · `remove`), where the tracker
  pinned *"exactly five"*; that pin is superseded by the sixth member.
- **`LIVE / INSTALL` is OPEN and the `APP` layer is `NONE`.** No store has ever been loaded inside an Electron
  app, and the five platform names are declarations copied into several files that only a registry install
  falsifies.
- **A named limitation with no rule:** a `filePath` naming a symlink to a real writable file is accepted at
  construction, and the first `file`-tier commit replaces the link with a regular file. Three remedies exist
  and all are priced; the choice is the architect's (`docs/defects.md` `DEF-2026-10-13-D`).
- **The tier-eviction reading is not settled** as a semantic claim — it is a measurement on one version, and
  whether declared semantics and shipped behaviour agree at every arm and tier combination is a question for
  the clauses, not for a guide.
- **A property-based-test gap stands open** on the JSON-crossing unit's gate 11 (the last commit on `main`).
- **The corpus's own record of these is now archived.** `docs/pending.md`, `docs/decisions.md` and
  `docs/defects.md` live at `archive/pre-strata-docs-2026-10-24/docs/` and are cited by identifier (`A127`,
  `G-13`, `DEF-…`) rather than by path from this branch.

---

## §7 · Edges — what this brief does not do

- **It states no measurement of its own.** Every figure is read from a file on this branch or transcribed
  from a guide that states its own provenance. Nothing here was driven against a published artefact.
- **It decides no open question** in §6, and it takes no position on the ordering carrier, on the symlink
  remedy, or on whether the kernel ships.
- **It carries no module map.** Dividing §2's inventory into owned modules is L1's work and is the next
  delegation, not this file's claim.
- **It inherits the guides' own edges:** the `▸` blocks those guides quote are `0.1.2` measurements, no block
  was ever driven against a published `0.2.0`, and both guides were written without a shell.
