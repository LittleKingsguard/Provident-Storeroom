# Wiring `provident-storeroom` into an Electron app

**The demo case is `Provident-Electron`.** Nothing in this guide is specific to it — it is written to carry into any Electron app as a foundation store, and the sections that *are* demo-specific say so.

**Read §0 before anything else. It tells you exactly how much of this has been proven.**

---

## §0 · Status — what is verified, and what is not

**This store has never been loaded inside an Electron app.** The `APP` layer is `NONE`, and `LIVE/INSTALL` — the post-release layer that installs the delivered bytes from the registry and exercises them — is `OPEN`.

| Layer | State | What it means for you |
|---|---|---|
| `ENVELOPE / PURE` — the store crate, the JS binding, the blind suite | **green** | the semantics, the crossing and the failure surface are pinned by tests |
| `LIVE / ASSEMBLED PACKAGE` — the shipped tarball, unpacked and driven | **green** | the package resolves, loads and answers the declared shapes |
| `APP` — a real Electron app | **none** | **nobody has done what this guide describes, yet** |
| `LIVE / INSTALL` — installed from the registry | **open** | the five platform names are unfalsified (§2.4) |

**So: every API fact below is read from the shipped type declaration and the contract, not from a working app.** Where this guide says *"the store does X"*, that is a **declared** behaviour with tests behind it. Where it says *"your app should X"*, that is **advice from Electron's model**, and it is the part most likely to need adjustment against reality.

**Write the integration with that in mind: build the smallest possible app that constructs a store, writes, reads and listens — and let it tell you which of my assumptions were wrong.**

---

## §1 · Where the store runs

**The store is a native Node addon. It runs in the MAIN process, and nowhere else.**

```
┌─ main process (Node) ─────────────────────────────┐
│  const store = await openStore()                  │   ← the store lives here, for the app's lifetime
│  write(store.instance, [...], 'file', value)      │
│  on(store.instance, [...], a => win.webContents.send('store:changed', a))
└───────────────────┬───────────────────────────────┘
                    │ ipcMain.handle / webContents.send
┌───────────────────▼───────────────────────────────┐
│  preload (contextBridge)                          │   ← a small, explicit, data-only bridge
│    storeRead / storeWrite / storeDelete / onChanged│
└───────────────────┬───────────────────────────────┘
┌───────────────────▼───────────────────────────────┐
│  renderer (browser)                               │   ← NO addon, NO require, NO nodeIntegration
└───────────────────────────────────────────────────┘
```

**Rules, and the reason for each:**

1. **Never load the addon in the renderer.** Requiring a `.node` in a renderer forces `nodeIntegration: true` and `contextIsolation: false` — which turns every piece of content you render into arbitrary code execution with filesystem access.
2. **Never turn on `nodeIntegration` to "just make it work".** The bridge in §9 is about forty lines.
3. **Construct the store once, in main, and own it for the process lifetime.** The store's register is a single structure with one journal and one listener map; two constructions are two stores, not one store seen twice.
4. **The renderer's handle on the store is a promise-of-IPC, not an object.** Design the bridge as a small, closed set of verbs — never as a generic `invoke(anything)` passthrough, or you have rebuilt `nodeIntegration` with extra steps.

---

## §2 · Install and resolution

### §2.1 The package

```sh
npm install provident-storeroom
```

One name to install. The package is a thin ESM entry that **resolves the correct native addon for the runtime** and re-exports eight verbs. **⟶ AND THE FIGURE OF THAT SENTENCE IS SUPERSEDED, DATED `2026-10-16`, AND IS WITHDRAWN WITH ITS SUBJECT NAMED (`role_proofreader`, gate 7): the module namespace is ONE NAME — `storeCreate` ALONE, `11 → 1` ✓ — and the store's own verbs are METHODS of the object `storeCreate(cfg)` returns, TWELVE own members `10 + 1 + 1 = 12` ✓ (the ten methods plus `register` and `settle`); `on` and `off` are MERGED AWAY and the leading `instance` position is DROPPED everywhere, so `read(instance, addr)` is `store.read(addr)`** (`docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of 2026-10-16; `docs/decisions.md` · `A127` · `A128`; the `11 → 1` terms being `8 + 3`).

### §2.2 The five platform packages

The addon ships as five separate packages, declared as `optionalDependencies` of the main one, pinned **exactly** to the same version: — **⟶ AND AT `0.2.0` THE PINS READ `0.2.0`, FIVE TIMES: the bump to `0.3.0` is the ARCHITECT'S release act and has NOT been taken (`role_proofreader`, gate 7, 2026-10-16; `docs/guides/package-use.md §2.2`).**

| runtime | platform package |
|---|---|
| Linux x64 (glibc) | `@auspicion/provident-storeroom-js-linux-x64-gnu` |
| Linux arm64 (glibc) | `@auspicion/provident-storeroom-js-linux-arm64-gnu` |
| macOS x64 (Intel) | `@auspicion/provident-storeroom-js-darwin-x64` |
| macOS arm64 (Apple silicon) | `@auspicion/provident-storeroom-js-darwin-arm64` |
| Windows x64 | `@auspicion/provident-storeroom-js-win32-x64-msvc` |

**Your package manager installs only the one matching your machine.** That is the point of the split, and it is also why a lockfile built on one OS will not carry the others: **build on each platform you ship** (or install with `--force`/`--os`/`--cpu` overrides on a build machine), or your packaged app will be missing a binary for a platform you thought you supported.

### §2.3 The three resolution rungs

The loader resolves, in order:

1. **the platform package** for this runtime — the packaged-app path;
2. **this checkout's own module-relative addon** (`build/Release/storeroom_js_binding.node`) — the development path, where you have built it yourself;
3. **nothing** → a thrown refusal with `status: 'FilePathUnreachable'`.

**And a fourth check, which is not a rung: an addon whose own `version` does not match the package's `version` is a declared refusal.** There is **no silent fallback and no JavaScript substitute store** — an absent or mismatched addon refuses rather than degrading. If you mix a locally built addon with a released package, expect to be told.

### §2.4 The one thing that is still unfalsified

**The five platform names are one declaration, copied into five files, and every local test compares copies to copies.** Transposing two of those names would pass every test this project has. **Only installing the real package from the registry can catch it.** So: **after your first `npm install`, check that the binary actually loaded on the platform you are on** — construct a store and read the empty address (§4.3). If the names were wrong, that call tells you, and nothing else will.

---

## §3 · Packaging

### §3.1 Node-API is ABI-stable — no `electron-rebuild` needed

The addon is built against **Node-API (N-API)**, which is **ABI-stable across Node versions and across Electron releases**. That is the whole reason this store can ship prebuilt binaries at all.

**Consequences:**

- **Do not run `electron-rebuild`, `node-gyp rebuild`, or `npmRebuild: true` on it.** Rebuilding is for addons compiled against V8's unstable ABI. For an N-API addon it is at best a no-op and at worst a broken binary.
- **The binding is built for a Node major, and Electron embeds its own Node.** N-API stability means that is fine — **provided the Electron version you ship supports the N-API version the addon was built against.** Newer Electron, newer Node-API: supported. Very old Electron, modern addon: check before you promise support for it.

```jsonc
// package.json (your app)
{
  "build": {
    "npmRebuild": false,                       // ← the addon is prebuilt N-API; do not rebuild it
    "asarUnpack": [
      "**/*.node",                             // ← a .node cannot be loaded from inside an asar archive
      "node_modules/@auspicion/**"             // ← the platform package dir, resolved at runtime
    ]
  }
}
```

**`asarUnpack` is the single most common packaging failure here.** A `.node` inside `app.asar` cannot be `dlopen`ed. Unpack the binary **and** the directory it lives in, because the loader resolves a *path* inside the platform package.

### §3.2 Do not prune the platform packages

`optionalDependencies` are exactly the kind of thing a bundler or a `--production` prune will drop as "not obviously used" — **the main package requires the platform package by a computed name, so static analysis cannot see the dependency.** If your packaged app dies with `FilePathUnreachable` while `node_modules` looks populated in dev, this is why.

### §3.3 Code signing

The addon is a native binary, so it must be signed like any other binary in your bundle: **macOS hardened runtime + notarisation, Windows Authenticode.** Unsigned, it will fail to load on a machine with a strict policy — and the failure will look like a module-not-found error, not like a signing problem.

---

## §4 · The API you actually get

### §4.1 The eight verbs — ⟶ and the operative reading is ONE module name plus the store's own methods (`role_proofreader`, gate 7, 2026-10-16)

```ts
import {
  storeCreate, read, readLiteral, write, delete, rollback, listen, unlisten,
} from 'provident-storeroom';
```

| verb | signature | answers |
|---|---|---|
| `storeCreate` | `(cfg: StoreConfig) => StoreInstance` | the instance |
| `read` | `(instance, address, tier?) => unknown` | a leaf's literal, a branch's assembled value, or the whole register |
| `readLiteral` | `(instance, address, tier?) => unknown` | the same, narrowed to a leaf — a branch refuses |
| `write` | `(instance, address, tier, value, commit?) => WriteRecord` | the op, what it watched, what it triggered |
| `delete` | `(instance, address, tier?) => DeleteRecord` | the address, the tiers removed, what it triggered |
| `rollback` | `(instance, opId) => RollbackRecord` | the id, what it undid, the state restored |
| `listen` | `(instance, address) => Handle` | a fresh opaque handle |
| `unlisten` | `(instance, handle) => void` | — |

**The eight verbs of the block and the table below are the `0.2.0` MODULE FORM — ⟶ SUPERSEDED AND READ THROUGH THIS ONE-LINE POINTER, DATED `2026-10-16` (`role_proofreader`, gate 7): the OPERATIVE surface is ONE module name, `storeCreate`, plus the store's own TWELVE own members `10 + 1 + 1 = 12` ✓ — the ten methods of the table below, re-spelled as METHODS with the `instance` FIRST POSITION DROPPED, plus `register` and `settle` — so a verb's receiver is the store (`docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of 2026-10-16; `docs/guides/package-use.md §1.1-bis`, which carries the consumer-side derivation of the same rule).** **`delete` is exported under that name although it is a reserved word** — the declaration binds it as `deleteOp` and re-exports it as `delete`. Import it as `delete` or alias it; either works. **⟶ AND UNDER THE METHOD FORM IT IS A METHOD NAME AND NOT AN IDENTIFIER BINDING, so it is declared as `delete` with no `deleteOp` workaround and no alias needed** (`bindings/js/index.d.ts`, the `StoreInstance` declaration).

**And the instance carries four own members and nothing else:** **⟶ AND THIS FIGURE IS SUPERSEDED AND IS READ THROUGH HERE, `2026-10-16` (`role_proofreader`, gate 7): the product's declared member set is TWELVE own members, `10 + 1 + 1 = 12` ✓, and `on`/`off` of the block below are MERGED AWAY — registration is `listen` + `register` and withdrawal is `unlisten`. The block stands byte-for-byte as the `0.2.0` instance's own shape** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause; `docs/guides/package-use.md §1.1-bis`).

```ts
interface StoreInstance {
  register(handle: Handle, listener: Listener): void;   // register a listener under a store-issued handle
  on(address: Address, listener: Listener): Handle;     // register at an address, answer a fresh handle
  off(handle: Handle): void;                            // withdraw the listener the handle names
  settle(record: CommitRecord): void;                   // the ordering seam — the arm that performs the file-tier save
}
```

**There is no release verb.** The instance's own state is released with the instance and by nothing else — which is another way of saying **construct one and keep it.**

### §4.2 Construction

```ts
const instance = storeCreate({
  journalLength: 128,        // positive integer — the journal's declared length
  listeners: [],             // REQUIRED, even when empty — an absent `listeners` is refused
  filePath: join(app.getPath('userData'), 'store.json'),   // omit for a memory-only store
  constraints: [],           // OPTIONAL — the app's own constraint list; NOT persisted, supplied at every startup
});
```

- **`listeners` is required.** An absent `listeners` is the one absence construction does not admit, and it answers `AddressMalformed`. Pass `[]` when you have none — that is the normal case, because you will register listeners from code (§7) rather than from config.
- **`listeners` elements are `{ address, handle }` records**, adopted at construction. A malformed member is **admitted by the type and refused by the store** — the package mints no second refusal for that position.
- **`filePath` absent means the register is created at `mem`** — nothing is persisted, and the `file` tier behaves accordingly.
- **`journalLength` bounds the journal**, which is what `rollback` walks. A short journal means a shallow rollback window; a long one costs memory. Pick it against how far back you ever expect to undo.

### §4.3 Addresses

```ts
type Address = readonly (string | number)[];
```

**A segment is a `string` key or a non-negative integer index.** `['users', 0, 'name']` is three segments: key, index, key.

```ts
read(instance, [])                       // THE WHOLE REGISTER as an object
read(instance, ['users'])                // a branch: its assembled value
readLiteral(instance, ['users', 0, 'name'])   // a leaf's literal; a branch refuses
```

**An empty address resolves to the register.** That is your smoke test — see §11.

**The register is created at `mem` and holds the root.** Everything you write hangs beneath it.

### §4.4 Tiers

```ts
type Tier = 'mem' | 'file' | 'temp';
type TierSet = Tier | readonly Tier[];

write(instance, addr, 'file', v)         // EXACTLY ONE token
delete(instance, addr, 'mem')            // EXACTLY ONE token
read(instance, addr)                     // absent — any tier
read(instance, addr, 'file')             // one token
read(instance, addr, ['file', 'mem'])    // a SET — answers any node matching ANY of them
```

**The arity differs by verb, and it is deliberate:**

- **Readers take absent, one, or an array-as-any-match set.** Asking "do I have this anywhere durable or in memory?" is a legitimate question.
- **Writers and deletes take exactly one token.** A write is going *somewhere*, and an array there would be a choice you did not make.

**The tier ordering is `file > mem > temp` in persistence.** Writing over an address that holds a version at the same or lower persistence **overwrites** it; a write at a *higher* persistence establishes the more durable version. **Design your tiers by asking how long the value must survive**: `temp` for values that may vanish with the process, `mem` for the session, `file` for anything that must be there on the next boot.

### §4.5 The records

```ts
write(...)   // { op: JournalOp, watched: Address[], triggered: Handle[] }
delete(...)  // { address, tiers: Tier[], triggered: Handle[] }
rollback(...)// { opId: string, undoneOps: string[], restoredTo: { present, value } }

interface JournalOp {
  opId: string;          // ← a STRING. Keep it; `rollback` takes it back.
  kind: string;          // 'write' | 'delete' today — the store's own set to close
  address: Address;
  tier: Tier | null;
  before: { present: boolean; value: unknown };
  after:  { present: boolean; value: unknown };
  seq: number;
  compacted: boolean;    // ← true means this op's detail is gone and it cannot be undone
}
```

**`op.opId` is your undo token.** Capture it if the user's action should be reversible; the journal is bounded by `journalLength`, so an id gets old.

**`triggered` is the list of handles that actually fired** for this write — not every listener you registered. That is the honest answer, and it is the one to log when you are debugging why a UI panel did not update.

---

## §5 · The value model — what may cross

**The crossing is a deep copy in both directions.** When you write, the store copies your value *into* itself; when you read, it copies *out*. **Neither side can hold a reference to the other's data**, which is why you can drop your reference immediately after a write and why a value you read is yours to mutate.

**Therefore: values must be structured-clone-compatible.** No functions, no class instances with behaviour, no getters that do work, no cyclic structures, no `Symbol`s, no `Map`/`Set` unless the store admits them (assume it does not), no `undefined` inside an array where a hole is meant, no `BigInt` unless declared.

**This is exactly the constraint Electron's IPC already imposes on you.** Anything that can cross `ipcRenderer.invoke` can cross into the store — and vice versa. **So the practical rule is simple and it unifies two problems into one: if it cannot be sent over IPC, it cannot be stored.**

**Refused values answer `ValueNotAdmitted`.** If you are storing something that came from a form, a JSON payload or an IPC message, you are already inside the domain — the failures come from storing *live* things: a class instance, a `Date` you meant to serialize, a DOM node, a `Buffer`.

**Serialize at the boundary, once, consciously:** `JSON.parse(JSON.stringify(x))` is crude but honest for a first cut; a declared schema is better. **Do not discover the boundary by getting `ValueNotAdmitted` in production.**

---

## §6 · Refusals

**One failure surface, everywhere:**

```ts
try {
  const v = read(instance, ['users', 0, 'name']);
} catch (e) {
  // e is a PLAIN OBJECT — never an Error subclass, never a rejected promise, never a tagged union
  const { status, message } = e as { status: string; message: string };
}
```

**It is thrown, always** — synchronously, from every verb. It is **not** a promise rejection and **not** a returned `{ ok: false }`. `try/catch` is the whole error model.

**The sixteen declared statuses, and what you should do about each:**

| status | you probably meant | your move |
|---|---|---|
| `AddressMalformed` | an address with a bad segment, or `listeners` absent | fix the call — this is a bug in your code |
| `AddressNotFound` | read a path that does not exist | treat as "absent"; this is normal, not an error state |
| `LeafHasNoDownstream` | walked *through* a leaf | fix the call |
| `TierNotFound` | read a tier that holds nothing | normal — answer "not there" |
| `OutOfDomainTier` | a tier token the store does not carry | fix the call |
| `ContainerKindConflict` | wrote an object into a place that holds an array, or vice versa | **a design decision you skipped**: a link's container kind is decided at write |
| `ReadTargetIsBranch` | `readLiteral` on a branch | use `read` |
| `WriteParentNotLink` | wrote through something that is not a branch | fix the call |
| `ParentAnchorMonotonicityViolation` | an internal invariant | **log it verbatim and report it** — this is a store bug, not yours |
| `JournalOpUnknown` | rolled back an id the journal no longer holds | the undo window closed; tell the user |
| `RollbackCompacted` | rolled back an op whose detail was compacted | the undo window closed; tell the user |
| `ConstructionArgumentMissing` | a missing construction key | fix the call |
| `FilePathUnreachable` | **no addon loaded, or the file tier's path is not usable** | see §2.3 — this is *the* integration error |
| `ValueNotAdmitted` | a value that cannot cross (§5) | serialize it |
| `FileCommitFailed` | the file tier could not commit | **the one to take seriously** — surface it to the user |
| `ConstraintListInvalid` | the `constraints` list you supplied is malformed, or names an address the loaded image no longer holds | fix the list, or migrate the file — the boot refused and returned no instance |

**The set is open by design** — the type carries an escape arm, because the store's own set has already grown twice, from fourteen to fifteen and then to sixteen, and a future release may add a seventeenth. **Do not `switch` on these without a `default`**, and never treat an unknown `status` as success.

---

## §7 · Listeners, across the process boundary

**Listeners fire on `write` and `delete`, and never on read.** A read is not a change, and a store that fired on reads would fire on every render.

```ts
// main process
const handle = on(instance, ['users'], (address) => {
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send('store:changed', address);
  }
});
```

**The listener runs in the main process.** To make a renderer react, send it a message — **you cannot pass a renderer function into the store**, because (a) the crossing deep-copies and a function is not copyable, and (b) §5's rule applies: if it cannot go over IPC, it cannot go in.

**The address handed to the listener is the triggering address**, so a listener registered at `['users']` can tell you *which* user changed.

**Three rules, and they are the store's, not yours to reimplement:**

1. **An unregistered handle fires nothing, silently.** No warning, no log, no code.
2. **A second `register` for one handle replaces the first.** Re-registering is a replacement, not a duplicate.
3. **A registration made during a firing window is not invoked during that window.** Registering while listeners are firing does not make the new one fire for the change in flight.

**`on(address, listener)` answers a fresh handle; `off(handle)` withdraws it.** **⟶ AND BOTH HALVES OF THAT ARE SUPERSEDED AND ARE READ THROUGH HERE, `2026-10-16` (`role_proofreader`, gate 7): `on` and `off` are MERGED AWAY by `A127` and are NOT members of the product — the same registration is `const h = store.listen(address); store.register(h, listener);` and the withdrawal is `store.unlisten(h)`, which `A127` MERGES BOTH HALVES INTO: the store-side withdrawal AND the removal of the package's registry entry for the identity where the identity no longer stands anywhere** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (b)'s step list as merged by `A127`; `bindings/js/index.d.ts`, the `unlisten` member's own clause; `docs/guides/package-use.md §6.2`). **`unlisten(handle)` is the watching-side counterpart — and under the merged member it is the whole of the withdrawal, so `off` with a handle the store does not know no longer has a `{status, message}` arm to speak of here; `unlisten` over any value outside the domain is a plain no-op success** (`docs/guides/package-use.md §6.2`'s three-arm table, which states the contrast at its own site).

**On shutdown, stop caring about listeners.** They die with the instance; there is no release verb to call.

---

## §8 · The file tier

Point `filePath` at a **writable, per-user, app-owned** location:

```ts
filePath: join(app.getPath('userData'), 'provident-store.json')
```

- **`userData`** is the right home — it survives updates, and it is per-user by construction.
- **Do not point it at the app bundle.** On macOS that is read-only on a signed build; on Windows it is under `Program Files`.
- **Create the directory before constructing** (`mkdir -p` equivalent). A missing parent directory is a `FilePathUnreachable` at best and a `FileCommitFailed` on first write.
- **The file is the store's, not yours.** Do not read, edit, parse or migrate it by hand — its shape is the store's own, and a hand-migration is a corruption waiting to happen. If you need a migration, read the old value through the store and write the new one through the store.
- **Omit `filePath` for a memory-only store** — good for tests, good for a session-only scratchpad, wrong for anything the user expects to find tomorrow.

---

## §9 · A complete minimal skeleton

**⟶ AND EVERY SAMPLE IN THIS SECTION — the `import { storeCreate, read, write, delete as del, on }` below with its `read(store(), …)` calls, and §7's `on(instance, …)` — IS AT THE `0.2.0` MODULE FORM AND IS READ THROUGH §4.1's POINTER (`role_proofreader`, gate 7, 2026-10-16): under the operative surface there are NO `read`/`write`/`del`/`on` MODULE EXPORTS AT ALL, and each call is a METHOD of the store `storeCreate` returned — `store.read(address)`, `store.write(address, tier, value)`, `store.delete(address, tier)`, and `const h = store.listen(address); store.register(h, listener)` in place of `on`.** **The samples are left at the form their own version measured; the re-spelling of each is owed to the pass that re-derives the surface, and `docs/guides/package-use.md §12-bis` records the same state for the consumer guide.**

**`main/store.ts`** — the only place the addon is ever required.

```ts
import { app } from 'electron';
import { join } from 'node:path';
import {
  storeCreate, read, write, delete as del, on,
  type StoreInstance, type Address,
} from 'provident-storeroom';

let instance: StoreInstance | null = null;

/** Open the store once, at app start, and keep it for the process lifetime. */
export function openStore(): void {
  instance = storeCreate({
    journalLength: 256,
    listeners: [],
    filePath: join(app.getPath('userData'), 'provident-store.json'),
  });

  // One listener, registered in code rather than in config (§7).
  on(instance, [], (address: Address) => {
    for (const win of require('electron').BrowserWindow.getAllWindows()) {
      win.webContents.send('store:changed', address);
    }
  });
}

function store(): StoreInstance {
  if (!instance) throw new Error('the store was never opened');
  return instance;
}

/** Every verb is wrapped so a refusal crosses as DATA rather than as a thrown native object (§6, §10). */
type Result<T> = { ok: true; value: T } | { ok: false; status: string; message: string };

function guard<T>(fn: () => T): Result<T> {
  try {
    return { ok: true, value: fn() };
  } catch (e) {
    const r = e as { status?: string; message?: string };
    return { ok: false, status: r?.status ?? 'Unknown', message: r?.message ?? String(e) };
  }
}

export const api = {
  read:      (address: Address, tier?: 'mem' | 'file' | 'temp') => guard(() => read(store(), address, tier)),
  write:     (address: Address, tier: 'mem' | 'file' | 'temp', value: unknown) =>
               guard(() => write(store(), address, tier, value)) as Result<{ op: { opId: string } }>,
  remove:    (address: Address, tier: 'mem' | 'file' | 'temp') => guard(() => del(store(), address, tier)),
  closeStore: () => { instance = null; },
};
```

**`main/ipc.ts`** — the bridge, registered once.

```ts
import { ipcMain } from 'electron';
import { api } from './store';

export function registerStoreIpc(): void {
  ipcMain.handle('store:read',   (_e, address, tier) => api.read(address, tier));
  ipcMain.handle('store:write',  (_e, address, tier, value) => api.write(address, tier, value));
  ipcMain.handle('store:delete', (_e, address, tier) => api.remove(address, tier));
}
```

**`preload.ts`** — the renderer's whole view of the store.

```ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('store', {
  read:   (address: unknown[], tier?: string)     => ipcRenderer.invoke('store:read', address, tier),
  write:  (address: unknown[], tier: string, value: unknown) =>
            ipcRenderer.invoke('store:write', address, tier, value),
  remove: (address: unknown[], tier: string)      => ipcRenderer.invoke('store:delete', address, tier),
  onChanged: (cb: (address: unknown[]) => void) => {
    const h = (_e: unknown, address: unknown[]) => cb(address);
    ipcRenderer.on('store:changed', h);
    return () => ipcRenderer.removeListener('store:changed', h);
  },
});
```

**Renderer.**

```ts
const res = await window.store.write(['users', 0], 'file', { name: 'Ada' });
if (!res.ok) console.error(res.status, res.message);   // ← refusals are values here, not exceptions

const back = await window.store.read(['users', 0], 'file');
const off  = window.store.onChanged((address) => console.log('changed at', address));
```

**Why the wrapper exists:** a value thrown in main does not survive `ipcMain.handle` as a structured object with a stable shape. **Map the refusal to `{ ok, status, message }` in main, and re-throw or branch in the renderer.** Do it once, in one place, and every verb gets it.

---

## §10 · Lifecycle

- **Open at `app.whenReady()`, before the first window loads**, so no renderer can call the store before it exists.
- **Close on `before-quit`.** Do not `process.exit` with a `file`-tier write in flight; the store's own commit path is what keeps the file coherent.
- **One store per app instance.** If you support multiple windows, they share the store over IPC — that is the design, and it is why **the store's listener map is the single source of "something changed."** Do not construct a second store to "scope" a window.
- **Back up before you first ship a `filePath`**, on the machine of anyone upgrading. You are introducing a file whose shape only the store knows; a copy costs nothing.
- **If the user's data matters, keep the journal long enough to undo.** `journalLength` is the whole undo window; `RollbackCompacted` is what the user sees when it closed.

---

## §11 · What to verify before you trust it

**In this order. Each one tells you something the previous could not.**

1. **The addon loaded at all.** Construct a store and `read(instance, [])`. If that throws `FilePathUnreachable`, nothing else matters — go to §2.3, then §3.1.
2. **It loaded the *right* addon.** The empty-address read answers the whole register as an object — the register's own shape. **This is also the check that the platform name was not transposed** (§2.4).
3. **The write/read round trip survives the crossing.** Write an object with a nested array on `file`; quit the app; read it back on the next boot. **A round trip that works in dev but not across a restart means the `file` tier or the `filePath` is wrong**, and no amount of in-process testing will show it.
4. **A listener fires on write and not on read.** Register, read, write, and assert the callback ran exactly once.
5. **A refusal crosses as data.** Force one (`read` a nonexistent path) and confirm the renderer sees `{ ok: false, status: 'AddressNotFound' }` rather than an unhandled rejection.
6. **The packaged app, not the dev run.** `asarUnpack`, signing, and the platform package all only exist after packaging. **A dev-green store proves nothing about the shipped app** — this is the single most expensive lesson in this project's history, learned four separate times.
7. **The delivered bytes.** Install `provident-storeroom` from the registry into a scratch app and do 1–6 there. **Only this falsifies the platform names and the package contents.**

**And record which of these you ran.** "The store works" means nothing without the layer: *envelope*, *loaded in dev*, *loaded in the packaged app*, *installed from the registry*. **A green on one layer does not retire a red on another.**

---

## §12 · Carrying this to another project

**This is the foundation-app checklist. It is deliberately short, because most of it is §11.**

**Design**

- [ ] **Decide the address scheme before you write code.** `['domain', id, 'field']` — pick it once, write it down, and never let two subsystems invent two schemes. The addresses are your schema.
- [ ] **Decide the tiers per data class.** What must survive a reboot (`file`), what may survive a reload (`mem`), what may vanish (`temp`).
- [ ] **Set `journalLength` against your undo promise**, not against a guess.
- [ ] **Decide the value shapes.** They must be structured-clone-compatible (§5), so they are the same shapes you would send over IPC. Serialize once, at the boundary.

**Wire**

- [ ] Addon in **main only**; a **closed** preload bridge; no `nodeIntegration`.
- [ ] Open the store at `whenReady`, close it at `before-quit`.
- [ ] Wrap every verb in **one** refusal→data mapper.
- [ ] `filePath` under `app.getPath('userData')`, directory created first.
- [ ] One listener registered in code, fanning out to windows.

**Ship**

- [ ] `asarUnpack` for `**/*.node` **and** the platform package directory.
- [ ] `npmRebuild: false` — it is N-API, do not rebuild it.
- [ ] Sign and notarise, or the binary will not load.
- [ ] Build the app **on each platform** you ship, so each platform package is present in the lockfile.
- [ ] Re-run the **whole of §11 against the packaged app**.

**Keep**

- [ ] **Never hand-edit the store's file.** Read and write through the verbs.
- [ ] **Never treat an unknown `status` as success.** The set is open by design.
- [ ] **Never store a live object.** If it has behaviour, it is not data.
- [ ] **Log `triggered` when a UI did not update** — the store will tell you which listeners fired, and that is usually the whole answer.
- [ ] **State the layer of every green you report.** *Envelope* is not *packaged* is not *installed*.

---

## §13 · The `Provident-Electron` demo, specifically

**The demo app is the first real consumer, so it is also the first real test of everything above.** It is where `APP` moves from `NONE` to something, and it is the reason `LIVE/INSTALL` is worth doing.

**What the demo should be, in the smallest useful form:** a window that owns one store, edits one list of records through the bridge, shows the list, and **re-reads it from the `file` tier after a restart.** That exercises: construction, all three tiers, the crossing, the bridge, a listener, a refusal mapped to data, `asarUnpack`, and the file tier's boot round-trip.

**What it must not do — and this is the trap this project already fell into once, at the workflow layer:** **do not report the demo working from a green test suite.** An empty boot, the window actually painting, the store file actually present on disk after a quit, and the list actually restored on relaunch are **four observations no unit test can make for you.** Look at the app.

**And when you find the first thing this guide got wrong, fix the guide in the same pass.** A foundation document that is allowed to drift from the app it describes is the next thing that will fail quietly.
