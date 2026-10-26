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
- **The published package is `0.5.0`** (`bindings/js/package.json`), and the closed failure set is **SEVENTEEN**
  statuses — `ValueRefusedAtBoundary` at rank `17`, appended by the native contract's 2026-10-23 amendment
  (`A148` Q3; `docs/specs/storeroom-native/contract.md` §8.1, *"the operative set is `17` members ranked `1`…`17`"*)
  — plus the open escape arm `(string & {})`. **★ AND THE DECLARATION AGREES: `bindings/js/index.d.ts`'s
  `StoreStatus` carries ALL SEVENTEEN literals, `ValueRefusedAtBoundary` written at rank `17` LAST of them and before
  the escape arm, and `src/error.rs`'s `CODES` carries seventeen.** **⟶ CORRECTED 2026-10-25 (`strata` L1 e2e pass,
  `role_test_writer`): this line read *"the declaration is behind it: `bindings/js/index.d.ts` declares SIXTEEN …
  every census claim in that file is `false` as written"*, and THAT READING IS WITHDRAWN BY NAME — the declaration
  was widened by the same 2026-10-23 amendment that widened the store, so the published type file omits no status
  the store emits and its census claims read seventeen; there is no `delivery`/`js-declaration` defect here.**
  **The escape arm still keeps a consumer from being mis-typed on a set the store may widen again, which is its own
  declared ground and not a defect.**

**THE RULE THIS BRIEF APPLIES:** where the guides and the tree disagree, the tree wins and the kept contract
part is cited; where neither decides a question, this file says **`OWED`** rather than choosing.

**ITS AUTHORITY AND ITS COMPANION.** This file states **what is**. `strata/decisions.md` holds **the
architect's rulings** and overrides this file wherever the two meet — it already does on the constraint kernel
(`D-1`). A design question this file marks `OWED` may be answered there; a question neither answers is taken to
the user and to nobody else.

---

## §1 · What the product is

**`provident-storeroom` is a centralized storage plugin for `Provident-Electron` apps** (`README.md`). Its
concrete shape is more specific than the sentence:

| layer | what ships | where it lives |
|---|---|---|
| the store | a native **Rust** register: record shapes, the walk, the verbs, tiers, journal and rollback, persistence | `src/` — crate `storeroom-native` |
| the JS crossing | a **Node-API addon** binding the store into JS, plus the value crossing, the codec and the constraint kernel | `bindings/js/src/` |
| the entry | a thin **ES-module facade** — one module name and the instance's members at the hub, with the registry, the failure form, the walk, the artefact meeting and the constraint glue in the parts beside it (**it was one file until the cut; re-read 2026-10-25**) | `bindings/js/index.mjs` — the hub — **plus `bindings/js/src/entry/` (13 files)** |
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

**⟶ RE-MEASURED 2026-10-25 AND REPLACED ROW FOR ROW, WITH EVERY SUPERSEDED FIGURE NAMED RATHER THAN ABSORBED
(`RCA-8(d)` ANNOTATE-BESIDE).** The tree moved under this table twice and the table did not move with it: **the
entry was subdivided into a hub plus twelve parts under `bindings/js/src/entry/`** (`D-2`, `D-13`, `D-33`), **the
constraint kernel was cut into five parts behind a re-export barrel** (`D-13`), **the two JS batteries were
stratified out of `bindings/js/test/` and `bindings/js/greens/` into the preset's three scopes under `tests/`**
(`D-5`, `D-6`, `D-7`), **a third package (`storeroom-tests`) now hosts the Rust batteries**, and **the three crates
are one workspace with one committed lock** (`D-34`). **What each row used to say is quoted in the row it
replaced** — `bindings/js/index.mjs` **5,903 → 1,409**, `bindings/js/src/constraint-kernel.mjs` **2,203 → a 4-line
barrel**, `index.d.ts` **788 → 891**, `bindings/js/test/` **42 files → 0** (its files are under `tests/`),
`bindings/js/greens/` **11 files → 0** (likewise), `bindings/js/tests/` **7 files → 0** (likewise), `tests/`
**15 Rust files → 83 files in three scopes**. **The `size` column is dropped rather than re-guessed**: the `458 KB`
and `1.1 MB` were one-passes' disk readings, no command in this pass measured bytes, and a column that cannot be
re-measured is better named as retired than reprinted.

| unit | files | what it is |
|---|---|---|
| `src/` | `lib.rs` 41 · `store.rs` 2,472 · `error.rs` 795 · `args.rs` 329 · `value.rs` 330 · `records.rs` 268 · `json.rs` 203 | the native store crate — **all seven figures unmoved**, re-measured at each file's own last line |
| `bindings/js/` (package root) | **`index.mjs` 1,409** (was **5,903**) · **`index.d.ts` 891** (was **788**) · `package.json` · `build.rs` · `README.md` · `.gitignore` | the shipped package: **the HUB** — the entry's one export, the surface it publishes — plus the declaration and the manifest. **`bindings/js/Cargo.lock` is DELETED**: a workspace member has no lock of its own (`D-34`) |
| `bindings/js/src/` | **`entry/` — 13 files**: `refusal.mjs` 82 · `artefact.mjs` 355 · `state.mjs` 600 · `class-decision.mjs` 1,204 · `carrier.mjs` 960 · `frame.mjs` 416 · `delivery.mjs` 639 · `constraints.mjs` 795 (the entry's eight parts) and `kernel-foundations.mjs` 529 · `kernel-registration.mjs` 644 · `kernel-commit.mjs` 156 · `kernel-attempt.mjs` 570 · `kernel-terminal.mjs` 324 (the kernel's five) · **`constraint-kernel.mjs` 4 — the barrel** (was **2,203**) · `crossing.rs` 1,216 (was **1,178**) · `codec.rs` 966 · `facade.rs` 1,105 · `lib.rs` 90 | the addon crate's Rust, **the entry's parts and the kernel's parts**, and the four-line barrel that keeps the kernel's six names reachable at its old path |
| `bindings/js/platforms/` | 5 platform packages × (`package.json` + `README.md`) | the per-platform binary carriers |
| `tests/` | **83 files in three scopes plus the packages' manifest** — `e2e/` **44** · `integration/` **33** (19 Rust · 13 `js-constraints` · `support/mod.rs`) · `unit/` **5** · `tests/Cargo.toml` (**was: `tests/` 15 Rust files · `bindings/js/tests/` 7 · `bindings/js/test/` 42 · `bindings/js/greens/` 11 = 75**) | the four batteries now sit at the preset's three scopes: **`e2e/` carries 23 `*.test.mjs`, 11 runners (including the new `installed/live-install.mjs`), 6 support modules, 1 evidence JSON and 3 documents; the second Rust battery is the `storeroom-tests` package's 22 files** |
| `typecheck/`, `tsconfig.*.json` | a consumer-shaped fixture plus two `tsc` projects | the type-check harness |
| root manifests | `Cargo.toml` (**now a `[workspace]`**: `members = [".", "bindings/js", "tests"]`, `default-members = [".", "tests"]`) · `tests/Cargo.toml` · `package.json` · `Cargo.lock` (**one workspace lock, 41 packages: 3 members + 38 registry**) · `package-lock.json` · `scripts/publish.sh` | private instrument harness; **not** a publishable package |
| `scratch/` | **477 tracked files** | probes, byproducts, logs and one-off drivers — **tracked in git**, and excluded from ownership by the project's convention that *a scratch is never a source*, not by an ignore rule |

**⟶ MEASURED 2026-10-25, SUPERSEDING THE FIGURES ABOVE — this branch has moved under every one of them and the
inventory is read through this clause.** `index.mjs` **1,417** (not 1,409) · `refusal` **161** · `artefact` **376** ·
`state` **602** · `class-decision` **1,214** · `carrier` **986** · `frame` **417** · `kernel-foundations` **597** ·
`codec.rs` **1,030** · `facade.rs` **1,136** · **`tests/` 104 files** (not 83), of which **`e2e/` 65** — 42 tests,
11 runners, 8 blind instances' worth of cells, 1 record, 3 helpers — **`integration/` 11 · `unit/` 8 · 1 manifest ·
3 records**. **The thirteen entry parts, the eighteen packed members, the eleven blind instances, the workspace and
the seventeen statuses stand as the table states them.** **A reader who needs a figure for a decision should measure
it; this clause exists so the table's numbers are not mistaken for current ones.**

**Three facts about this tree that the ownership plan must respect:**

1. **`bindings/js/index.mjs` is a 1,409-line HUB, not the entry whole** (it was **one 5,903-line file**). The
   entry is **nine parts across thirteen files**: the hub keeps its path, its one `export`, the module-context
   derivation and the fourteen members, and imports the other eight parts from `./src/entry/`; the kernel's five
   parts sit in the same directory behind a barrel. **The single largest undivided ownership question on the
   board is now answered rather than open** — the cut is executed (`docs/L1/entry-subdivision.md` §1,
   `docs/L1/kernel-subdivision.md` §1) — and what a plan must respect instead is that **the hub alone cannot
   load**: a tree carrying `index.mjs` without `src/entry/` fails at its first import.
2. **The root `package.json` is deliberately private** and gives the repository its gate-9 trio
   (`test`/`typecheck`/`build`) against what exists here; the deliverable is `bindings/js`
   (`package.json`, its own description field). **Its `test` script is `node --test "tests/**/*.test.mjs"`** —
   the three scopes at once — and the three Rust legs are `cargo test --offline -p storeroom-native` (**415**),
   `cargo test -p storeroom-tests` (**235**) and a plain `cargo test` (**650**).
3. **The store-side and JS-side batteries are separate and neither is redundant:** `tests/integration/store-*` and
   `tests/unit/binding-crossing/` drive the two Rust crates, and `tests/e2e/`, `tests/integration/js-constraints/`
   and `tests/unit/js-*` drive the addon through the entry — **the same 75 files the stratification declared, at
   the scopes it declared for them, plus the eight paths the move added**: seven battery artifacts (the installed
   battery's three, the cut's three staging/measurement helpers and `REVIEW-2026-10-24.md`) and
   `tests/Cargo.toml`, the third package's manifest.

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
`docs/specs/storeroom-js/surface.md §2.12`, `parameter-semantics.md §2.21`. **★ AND READS CHECK NO CONSTRAINT —
settled by the architect** (`strata/decisions.md` `D-1-bis`, reading (a)): the mechanism is unconditional on
the **write/commit** path over the triggered handle set, and a `read`, a `readLiteral` and a branch's assembly
**consult no constraint, refuse nothing on a constraint's verdict and filter nothing on one.** A read-side
constraint arm is not declared, is not owed, and is **refused as a reading** — so no design may introduce one.

**UC-10 · Refuse in one form.** Every refusal is **thrown synchronously as a plain object** carrying
`{status, message}` — never an `Error` subclass, never a rejection, never `{ok: false}`, so `try/catch` is the
whole error model. The `message` is generated from the code and the failing trigger's arguments, never
hand-authored at a call site, and its general shape carries the address, the domain and what was found
instead. **The set is SEVENTEEN and OPEN by design** (the declaration carries an escape arm), so a consumer
never treats an unknown `status` as success (`docs/specs/storeroom-native/seams-and-lifecycle.md §8.1`,
`§8.2`; `index.d.ts`). **⟶ CORRECTED 2026-10-25: this line read *"sixteen"*, which was the figure before the
native contract's 2026-10-23 amendment (`A148` Q3) ranked `ValueRefusedAtBoundary` at `17`** — the amendment
that this file's own head records, so the two halves of one file disagreed and this half was the stale one. **The
store implements seventeen** (`src/error.rs`'s `CODES`), **and `bindings/js/index.d.ts` declares seventeen too** —
**⟶ CORRECTED 2026-10-25 (`strata` L1 e2e pass, `role_test_writer`): this clause read *"`bindings/js/index.d.ts` still
declares sixteen"* and named a gap *"this brief names at its head"*; BOTH HALVES ARE WITHDRAWN AT THIS LINE — the
declaration's `StoreStatus` carries the seventeenth literal at rank `17`, so there is no gap for a later section of
this file to name, and this brief's head was corrected in the same pass.**

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
   **⟶ CORRECTED 2026-10-25 (`A149`; `RCA-8(d)`): THE DEPTH FIGURE IN THAT SENTENCE IS `126`, NOT `64`.** The
   operative admission ceiling is **`126` on both routes** — `bindings/js/src/entry/carrier.mjs`'s
   `ENCODER_CEILING = 126` at the package's walk and `bindings/js/src/crossing.rs:696`'s `depth > 126` at the
   conversion — and **`127` and beyond is refused at the walk, before any store verb, as
   `ValueRefusedAtBoundary`**. The `64` this sentence printed is the retired declaration's figure, and the `128`
   that stood behind it was the conversion's bound until 2026-10-25; **the `1,000,000` node half is unmoved.**
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
  delivery now follows the pass is `OWED` a measurement, not a claim either way** — and **`D-1-bis` settles what
  the law IS without touching this: it confirms the mechanism is unconditional on the write/commit path and
  refuses a read-side arm, and it does not turn the conformance measurement green.** **⟶ RE-POINTED 2026-10-25,
  AND THE CALL IS UNMOVED: those two calls stand in `bindings/js/src/entry/constraints.mjs`'s `constraintWrite`
  now, not in the hub** — `index.mjs` imports the part and the part reaches the kernel, which is the same call in
  a file that is no longer the entry by itself. **The reach is still lazy** (`constraints.mjs`'s
  `let KERNEL` + `constraintsKernel()`), because retiring the laziness is a behaviour change and not a move.

- **The constraint kernel DOES ship — corrected, and the archived tracker says otherwise.** `bindings/js/package.json`'s
  `files` carries **FIVE** rows today — `index.mjs`, `README.md`, `index.d.ts`, **`src/entry/`**, **`src/constraint-kernel.mjs`**
  (**it carried FOUR** — `index.mjs`, `README.md`, `index.d.ts`, `src/constraint-kernel.mjs` — until the entry's
  cut put thirteen parts on disk: the hub imports them, so the packlist must carry them, which is `D-4`'s
  reachability rule and not a new declaration — re-measured 2026-10-25) — so
  the *"`src/**` reaches no consumer today"* limitation the tracker recorded is superseded. **And the kernel's
  export set is SIX** (`register` · `commit` · `runAttempt` · `log` · `report` · `remove`), where the tracker
  pinned *"exactly five"*; that pin is superseded by the sixth member — **and the six are now `export` SITES in
  four of the kernel's parts, re-exported by a four-line barrel at the unchanged path.** **⟶ AND NO COUNT BINDS THAT ALLOWLIST ANY
  MORE** (`D-3`, `D-4`): the strict count is lifted, `§2.1` items 1 and 6 both retire, and **the required publish
  shape is determined empirically — by `delivery` together with the e2e/blind scenario testing.** So the **five**
  rows above are **a fact of the tree and not a rule**, and no design may restore a hand-maintained allowlist in
  place of that evidence. **The prohibitions are unmoved:** no `.node`, no `build/Release`, no `postinstall` route.
- **★ THE ARCHITECT HAS RULED THAT CONFIGURATION OUT — `D-1`, and it outranks the two paragraphs above.**
  The constraint mechanism is a **strict requirement** and is checked for triggered handles automatically, so
  **the kernel does not need to be an external import and can be tightly integrated**
  (`strata/decisions.md` `D-1`, quoting the architect). **So the lazy reach and the kernel's own `files` row are a
  superseded *configuration*, not the design** — while both remain facts of the code as it stands, because `D-1`
  rules what the mechanism is and orders no code move. **⟶ RE-POINTED 2026-10-25: the lazy reach stood at
  `index.mjs:5227` and stands in `bindings/js/src/entry/constraints.mjs`'s `constraintsKernel()` today**, the hub
  having been cut and the glue having moved out of it; **and the kernel's row is the FIFTH of five, not the
  fourth of four**, `src/entry/` having joined the allowlist when the parts did. **No layer below may read the
  tree's lazy-and-separable shape as the architect's intent, and no layer may read `D-1` as a mandate to
  evaluate constraints in the Rust store, or as a re-decision of the `A112` ordering law.**
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
