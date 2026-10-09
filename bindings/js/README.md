# `@provident-storeroom/js` — the Node ESM binding for the native Rust store

**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`A70`, `package.md §1.1`): a consumer `import`s
this package as an ES module from a Node runtime whose ABI carries a Node-API addon. **Every other realm is
UNCLAIMED and each owes its declared answer** (`package.md §2`: Node CJS, Electron `main`, Electron
`preload`, Electron `renderer`, the browser, `worker_threads` and any IPC route). **No other realm is
described here as supported.**

**THE LICENCE OF RECORD IS `AGPL-3.0`** (`DD-43`). It is the repository's own `LICENSE` and no clause of
this unit changes it; **the licence file itself is NOT copied into this package**, so a second, drifting
copy cannot exist beside the repository's own.

## The one entry

```js
import { storeCreate, read, readLiteral, write, delete as remove, rollback, listen, unlisten } from '@provident-storeroom/js';
```

**The `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one** (`package.md §1.3`, `DD-24`):
there is no wildcard export, no deep import to the addon and no CJS arm. **The addon is reached INTERNALLY
by the package's own `createRequire`-style step and is not an entry point**: a consumer that spells the
addon's path directly is outside every clause of this contract.

## The surface

**The eight verbs of `surface.md §2` and NOTHING ELSE**, plus the one member of the object `storeCreate`
returned:

| The member | Its answer |
| --- | --- |
| `storeCreate(cfg)` | the package's own instance handle — `cfg` carries the store's three declared keys and no fourth |
| `read(instance, address, tier?)` | a leaf's literal, a branch's assembled value, the empty address's whole register |
| `readLiteral(instance, address, tier?)` | the same, narrowed to a leaf (`ReadTargetIsBranch` on a branch) |
| `write(instance, address, tier, value)` | `{op, watched, triggered}` |
| `delete(instance, address, tier?)` | `{address, tiers, triggered}` |
| `rollback(instance, opId)` | `{opId, undoneOps, restoredTo}` |
| `listen(instance, address)` | a fresh opaque handle |
| `unlisten(instance, handle)` | `undefined` — and a no-op success for every value outside the domain |
| `instance.register(handle, listener)` | `undefined`; a non-function listener or a handle this instance never minted throws a `TypeError` |

**The failure form is ONE** (`surface.md §2.5`, `DD-12`): a THROWN plain object carrying exactly
`{status, message}` — never an `Error` subclass, never a returned tagged union and never a `Promise`.
**No `findAddress` is exposed** (`A63`), no `exists` verb exists and no release verb is declared (`A74`).

## The two readings a caller will meet, and the reload rule

**A handle MUST NOT be carried across a process reload.** Handle identity is this process's own: a prior
session's token names no registration of this process, and `unlisten` over it is a no-op success while
`register` over it is a `TypeError`.

**Two file-behaviour readings.** A `delete` and a `rollback` perform no file I/O, so a consumer that deletes
a `file`-tier version and then constructs a fresh instance over an equal `filePath` sees the removed version
STAND AGAIN — that re-boot is the store's own declared boot and not a defect. And a `file`-tier `write` that
fails answers `FileCommitFailed` after the store's own automatic journal rollback has run; the package
compensates for nothing.

## Building the addon

The sibling crate lives at `bindings/js/` and is built from the repository root, at its own manifest:

```sh
cargo build --release --manifest-path bindings/js/Cargo.toml --offline
mkdir -p bindings/js/build/Release
cp bindings/js/target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
```

**No binary is ever committed** (`package.md §3.2`): `build/` and `target/` are ignored, and the artefacts
are built and published, never stored in the tree. **The prebuild matrix is five targets** (`linux-x64`,
`linux-arm64`, `darwin-x64`, `darwin-arm64`, `win32-x64`) and its artefacts are hosted as the registry's own
per-target optional dependencies, which this package's `optionalDependencies` declares. **A consumer on a
target the matrix does not cover needs a Rust toolchain**, and that requirement is printed here rather than
discovered. The Node-API version this addon is built against is the sibling crate's own build target and is
not a JS-side floor of this package's own (`package.md §1.4`).

## Tests

```sh
cargo test  --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast   # the sibling crate's Rust tests
node --test bindings/js/test/*.test.mjs                                       # this package's JS tests
```

**AND THE ORDER IS A DECLARED STEP, NOT A CONVENIENCE: THE JS LEG RUNS ONLY AFTER THE ADDON IS BUILT**
(`docs/specs/storeroom-js-proposal.md §17` · `A75`: *"the JS leg of the acceptance layer acquires A BUILD
STEP (a `.node` must exist for those cells)"*). **The JS cells drive the package through its CLAIMED ESM
ENTRY and never the `.node` addon directly** (`acceptance.md §4.1` item 1, `DD-18`), so the entry's own
route — `JS -> facade -> core -> store` — is what they exercise, and that route needs the artefact the
`Building the addon` section above produces:

```sh
# 1. THE BUILD STEP, AT THE REPOSITORY ROOT, BEFORE ANY JS CELL RUNS:
cargo build --release --manifest-path bindings/js/Cargo.toml --offline
mkdir -p bindings/js/build/Release
cp bindings/js/target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
# 2. THE JS LEG, AFTER IT:
node --test bindings/js/test/*.test.mjs
```

**THERE IS NO FALLBACK AND NO JS-SIDE STORE** (`A75`): an addon that is ABSENT or FAILS TO LOAD is a
**DECLARED FAILURE** — `storeCreate` answers the single failure form
`{status: 'FilePathUnreachable', message: <the store's own generated string at the addon's path>}` and NO
instance is returned. **AND THE MESSAGE'S OWN STRING IS NOT A PLACEHOLDER** (`JS-3`, closed): it is the
store's generator's rendering of THAT subject — `'/abs/path/to/build/Release/storeroom_js_binding.node' is
not reachable at construction, the path must exist or the application must be able to write it` — reached
through the addon's `errorMessage` where the artefact loaded far enough to carry the generator, and
reproduced BYTE-FOR-BYTE from the generator's own clause (`src/error.rs`'s `FilePathUnreachable` arm) where
the generator is the thing that failed to load. **A consumer that runs the JS cells without step 1 sees that
failure and not a silently degraded run.** **The Rust leg needs no addon at all**: the conversion core is the
crate's `rlib` half, so `cargo test --manifest-path bindings/js/Cargo.toml` is drivable with no Node runtime
present (`package.md §4.1` item 3, `§4.5` item 7).

