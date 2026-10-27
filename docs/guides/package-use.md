# Using `provident-storeroom` — the installed package

**This guide is for someone who has just run `npm install provident-storeroom` and has never seen the repository
it comes from.** It describes the package you now have in `node_modules`: how it is reached, what its surface
does, how an address is shaped, how the tiers behave, what each refusal means, and — the part most worth your
time — **§12, which lists the behaviours you can break and tells you exactly where this package's promises stop.**

**The two guides that used to describe this package are archived and wrong.** They are
`package-use.md` and `electron-integration.md` under `archive/pre-strata-docs-2026-10-24/docs/guides/`, and they
describe the `0.2.0`/`0.3.0`-era surface; the surface has moved under them twice more since. **Nothing in this file
is copied from them.** Where a figure here is a declaration, it is cited; where it is a measurement, the
measurement is named.

---

## §0 · What this guide describes, and where its figures come from

**THE VERSION THIS GUIDE DESCRIBES IS `0.5.0`** (`bindings/js/package.json`'s `version` field). **AND NOTHING HERE
WAS DRIVEN AGAINST A PUBLISHED TARBALL:** every behavioural claim below is either read from the package's own
**declaration of record** (`bindings/js/index.d.ts`), from a **kept contract** under `docs/specs/`, or from a
measurement taken on this repository's checkout and named as one. **No `npm install` was run by the pass that
wrote this file against the registry, so a registry-installed `0.5.0` is described here and not witnessed.**

**⟶ CORRECTED 2026-10-26 — THE VERSION THIS GUIDE DESCRIBES IS `1.0.0`, NOT `0.5.0`, AND THE SENTENCE ABOVE STANDS
BYTE-FOR-BYTE AS THE READING OF THE DAY THIS FILE WAS WRITTEN AND IS READ THROUGH THIS CLAUSE** (`RCA-8(g)`
ANNOTATE-BESIDE; `DEF-2026-10-02`: no whole-file rewrite). **`bindings/js/package.json`'s `version` field read at its
own bytes this date is `"version": "1.0.0"`, and all five `optionalDependencies` pins are `1.0.0` with it** — **so
every `0.5.0` this guide prints is the figure of its writing date and reads `1.0.0` from here on: `§2.2`'s five exact
pins, `§8.1`'s *"an installed `0.5.0`"*, and `§11`'s manifest table.** **AND THE ONE THING THIS PASS DID NOT WITNESS
IS UNMOVED: no `npm install` was run against the registry, so a registry-installed `1.0.0` is described here from
the manifest and from measurements on this checkout, and is still not witnessed.**

**⟶ AND THE FIGURE THAT CORRECTION CARRIES IS ITSELF ONE RELEASE BEHIND, 2026-10-27 — THE VERSION THIS GUIDE
DESCRIBES IS `1.0.1`, AND EVERY `1.0.0` THIS GUIDE PRINTS READS `1.0.1` FROM HERE ON.** `RCA-8(g)`
ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause — so do its reading of
`0.5.0` and its reading of `1.0.0`; each was true of the tree it was read on and each is one release behind the
shipped tree from this date.** **THE MANIFEST AT ITS OWN BYTES: `bindings/js/package.json`'s `version` is
`"1.0.1"`, and all five `optionalDependencies` pins are `1.0.1` with it** — the six figures move together and never
singly (§0 item 1; `PUB-DD-10`) — **and the tags the tree carries are `v1.0.0` and `v1.0.1`, with `main` sixteen
commits past `v1.0.1` and no version bump in any of them** (`git describe` at this date reads `v1.0.1-16-gdf3ef88`;
`D-41` item `1`'s semver ruling names the next release `1.1.0`, and that release has not been cut). **SO THE SITES
ARE RE-READ, NOT RE-SPELLED:** §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* — itself already corrected to
`1.0.0` — and §11's manifest table all read `1.0.1`; **every `0.5.0` this guide prints is the figure of its writing
date and reads `1.0.1` from here on.** **AND THE ONE THING NO PASS WITNESSED IS STILL UNMOVED: no `npm install` was
run against the registry, so a registry-installed `1.0.1` is described here from the manifest and from
measurements on a locally packed, installed artefact, and is still not witnessed as a registry download.**

**AND ONE THING A READER OF THE INSTALLED PACKAGE SHOULD KNOW BEFORE THE CITATIONS: WHEN THIS DOCUMENT IS AT
`node_modules/provident-storeroom/README.guide.md`, IT IS THIS GUIDE.** **Its ONE authored home is
`docs/guides/package-use.md` in the repository, and the release's assembly stages it byte-for-byte at the packaging
root as `README.guide.md`, beside `README.md`, where the manifest's `files` row ships it** (`PUB-DD-11`;
`docs/specs/storeroom-publish/contract.md §2.3` item `3`; `scripts/publish.sh`'s guide stage). **The paths this guide
cites — `bindings/js/…`, `docs/specs/…`, `tests/…` — are the CHECKOUT's, and they do not travel in the tarball; a
consumer reading from `node_modules` has this guide's text and the package's own shipped bytes (`index.mjs`,
`index.d.ts`, `README.md`, `src/`), and every declaration a citation names is answered first by those bytes.** **So
nothing here is addressed to a checkout reader alone: the installed tree carries this text unaltered, and a clause
that names a repository path says where its authority lives, not where you must stand to use it.**

**Every figure carries one of four marks, and the four are not the same thing:**

| the mark | what it means |
|---|---|
| **`path §section`** | **declared** — the clause says it, and it is the authority for that subject |
| **`path` alone, or a row id such as `DD-28`** | **declared** at a contract's own named row |
| **`archive/…`** | declared in a file that has been **archived** by this branch's documentation pass; cited so the reference resolves, not as the current home of anything |
| **`measured 2026-10-26`** | **taken on this checkout** — either read at a file's own bytes, or driven against the checkout's own built addon through the published entry, and reported raw |

**AND ONE RESOLUTION RULE, SO NO CITATION HERE DANGLES: a bare `write-and-read.md`, `crossing.md`,
`store-model.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`, `resolution.md`, `kernel-surface.md` or
`package.md` in a citation is one of this project's ARCHIVED `docs/specs/` parts, and resolves under
`archive/pre-strata-docs-2026-10-24/docs/specs/<unit>/` — the archive prefix is printed where each is first cited
and is elided afterwards only to keep the prose readable.**

**AND THE SHORT NAMES THIS FILE USES, so every citation resolves from any line:**

| the short name | the file it is |
|---|---|
| **`index.d.ts`** | `bindings/js/index.d.ts` — **the declaration of record** |
| **`README.md`** | `bindings/js/README.md` — the readme that ships in the package |
| **`surface.md`** | `docs/specs/storeroom-js/surface.md` |
| **`js/contract.md`** | `docs/specs/storeroom-js/contract.md` |
| **`native/contract.md`** | `docs/specs/storeroom-native/contract.md` |
| **`json-crossing/contract.md`** | `docs/specs/storeroom-json-crossing/contract.md` |
| **`held-listener/contract.md`** | `docs/specs/storeroom-held-listener-identity/contract.md` |
| **`publish/contract.md`** | `docs/specs/storeroom-publish/contract.md` |

**AND THE ROW IDS, WHICH ARE STABLE NAMES AND ARE CITED INSTEAD OF A LINE NUMBER ON PURPOSE:** **`DD-n`, `PAR-…`
and `P-…` are the contracts' own named rows** (each contract ids its own families at its `§0.2` or `§0.3`);
**`A…` ids are the ARCHIVED authority log's rows** (`archive/pre-strata-docs-2026-10-24/docs/decisions.md`); and
**`D-…` ids are `strata/decisions.md`'s own rulings**, which outrank every other document in this tree.

**HOW TO CHECK WHICH VERSION YOU ACTUALLY HAVE, at your own install — because a guide's claim about a version is
worth nothing to you if you cannot falsify it:**

1. **What you have:** read `node_modules/provident-storeroom/package.json` and check `"version"`, then read its
   five `optionalDependencies` values. **All six figures must be the SAME version** — the main `version` and the
   five exact pins move together and never singly (`bindings/js/package.json`, measured 2026-10-26; the coupling
   rule is `PUB-DD-10` at `docs/specs/storeroom-publish/contract.md §0.3`).
2. **Which realm you are in:** you must be in **Node ESM**. **No other realm is claimed** (§1).
3. **What is actually loaded:** construct a store and read the empty address. If the loader resolved a
   differently-versioned platform package, that is where it shows.

**THE SHAPE OF THIS GUIDE, IN ONE LINE: one module name, one instance with fourteen own members, one thrown
refusal form, three tiers, two population routes for constraints, and a value domain narrower than JSON's.** The
rest is the consequences.

---

## §1 · What you get

`provident-storeroom` is **a native Rust register, reached through a Node-API addon, behind a thin ES-module
facade.** The package itself is small — an ESM entry, its own parts, a readme and a hand-authored type declaration
— and **the binary does not travel in it**: it arrives in a separate per-platform package (§2).

**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`bindings/js/README.md`, opening clause; `A70`; and
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md §1`–`§2`, archived). **Node CJS, Electron's
`main`/`preload`/`renderer`, the browser, `worker_threads` and any IPC route are each UNCLAIMED** — the package's
own readme enumerates them one by one and describes no other realm as supported.

**The licence of record is `AGPL-3.0`** (`bindings/js/package.json`'s `license` field, measured 2026-10-26), and a
copy of the repository's `LICENSE` travels with every published artefact, landed byte-for-byte by the release's
own assembly step (`docs/specs/storeroom-publish/contract.md §2.3` item 2; `PUB-DD-11`). **Three spellings of the
licence stand in this repository and they are not identical:** the root `Cargo.toml` says `GPL-3.0-or-later`, the
binding's `Cargo.toml` says `AGPL-3.0-or-later`, and the published manifest says `AGPL-3.0`. **Do not assume the
root crate's spelling is a typo** — no clause of the tree says so, and the packaging decision it reflects is not
yours to reverse. **The manifest's field is the one that governs your use of what you installed.**

**AND ONE THING THAT IS ABSENT ON PURPOSE, SAID FIRST BECAUSE YOU WILL LOOK FOR IT: there is no release verb.**
No `dispose()`, no `close()` and no finalizer is a member (`bindings/js/index.d.ts`, the `StoreInstance`
declaration; `A74`). **The instance's state is released with the instance and by nothing else — construct one store
and keep it for the process's life.**

**The five decisions this guide exists to inform** — the checklist the archived guide carried and that is still
true of this surface:

- **Decide the address scheme before you write code.** `['domain', id, 'field']` — pick it once, write it down, and
  never let two subsystems invent two schemes. **The addresses are your schema** (§4).
- **Decide the tiers per data class** — what must survive a reboot (`file`), what may survive a reload (`mem`),
  what may vanish (`temp`) (§5).
- **Set `journalLength` against your undo promise**, not against a guess: it bounds the journal, which is the
  whole undo window (§5.4).
- **Decide the value shapes.** They must be crossing-compatible, so they are shapes you would send over an IPC
  boundary. Serialize once, at the boundary (§10).
- **Wrap every verb in one refusal→data mapper.** Refusals are thrown plain objects, and one place to branch on
  `status` is the whole design (§8).

---

## §2 · How you reach it: install, and the three rungs

### §2.1 One name to install

```sh
npm install provident-storeroom
```

**That installs the package and — if your platform is covered — its binary, as a dependency of its own.** You do
not install five packages; you install one and npm resolves the one your runtime needs.

### §2.2 The five platform packages, named and pinned

**The entry resolves its artefact in a declared order, and the first rung is the scoped per-platform package**
(`docs/specs/storeroom-publish/contract.md §1.1`; `bindings/js/README.md`, *How the addon is resolved*). **The
names are a closed set of five and are never built by concatenating tokens** (`P-PUB-2`; `publish/contract.md §1.3`):

- `@auspicion/provident-storeroom-js-linux-x64-gnu`
- `@auspicion/provident-storeroom-js-linux-arm64-gnu`
- `@auspicion/provident-storeroom-js-darwin-x64`
- `@auspicion/provident-storeroom-js-darwin-arm64`
- `@auspicion/provident-storeroom-js-win32-x64-msvc`

**Measured 2026-10-26 at `bindings/js/package.json`: all five stand in `optionalDependencies`, each pinned to
`0.5.0` — an exact version, five times, with no caret, no tilde and no range.** **THE PINS ARE EXACT ON PURPOSE AND
YOU SHOULD NOT "RELAX" THEM:** npm's dedupe could otherwise satisfy the loader with a differently-versioned copy
hoisted into your tree, and the exact pins are what closes that window (`PUB-DD-10`'s `alt` cell, which prices a
range and refuses it).

**⟶ AND THE FIGURE IS CORRECTED AT THIS DATE: each of the five is pinned to `1.0.0`, not `0.5.0`** (`bindings/js/
package.json`, read at its own bytes 2026-10-26; `RCA-8(g)` ANNOTATE-BESIDE — the sentence above stands and is read
THROUGH this one). **THE READING IT TEACHES IS UNMOVED AND IS THE POINT: five EXACT pins, no caret, no tilde and no
range, all six figures moving together (§0 item 1; `PUB-DD-10`).** **`1.0.0` is the package's own version (§0 and
§11), so the main `version` and the five pins are one figure and a consumer who reads a `0.5.0` anywhere in a
manifest has the wrong package.**

**⟶ AND THE FIGURE MOVES AGAIN, 2026-10-27: each of the five is pinned to `1.0.1`, not `1.0.0`**
(`bindings/js/package.json`, read at its own bytes; §0's correction of this date; `RCA-8(g)` ANNOTATE-BESIDE — the
two clauses above stand and are read THROUGH this one). **THE READING THEY TEACH IS UNMOVED AND IS THE POINT: five
EXACT pins, no caret, no tilde and no range, all six figures moving together (§0 item 1; `PUB-DD-10`) — so `1.0.1`
is the package's own version and the five pins' one figure, and a consumer who reads anything else in a manifest
has the wrong package.**

### §2.3 The three rungs

1. **RUNG ONE — the scoped platform package for this runtime's `process.platform` × `process.arch` key.** This is
   the rung that fires in a published install. **Every throw at this rung is a MISS and not an error** — it falls
   through rather than reporting (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/resolution.md
   §2.1`–`§2.2`, archived).
2. **RUNG TWO — the module-relative addon beside the entry** (`build/Release/storeroom_js_binding.node`), computed
   from the entry module's own location and from no other source: **no environment variable, no configuration
   key, no path relative to the working directory and no search of a parent directory.** **This is the
   checkout-only rung** — a `files`-restricted tarball does not carry it — and no version is compared here
   (`bindings/js/README.md`; `resolution.md §3.2`, archived).
3. **RUNG THREE — the declared absent-addon form.** Failing both, `storeCreate` throws the one refusal carrying
   the store's `FilePathUnreachable`, **and no instance is returned.**

**THERE IS NO FALLBACK AND NO JS-SIDE STORE.** An absent or failed addon refuses; it never degrades to a JavaScript
store, never absorbs state silently and never returns a partial instance (`bindings/js/README.md`; `PUB-DD-1`,
`PUB-DD-2`; `resolution.md §5.3`, archived).

**AND THE UNCOVERED-TARGET ANSWER IS A DECLARED LIMITATION, NOT AN ERROR YOU CAN FIX AT THE INSTALL:** a
`process.platform` × `process.arch` pair outside the five covered keys gets **no binary** — rung one is not
attempted at all, because no name exists for that pair — and a published install carries no `build.rs`, no
`Cargo.toml`, no `src/**` and **no `postinstall` build-on-install step.** **Your only route is to build the store
crate from its source yourself; a covered consumer needs no Rust toolchain, an uncovered one does**
(`publish/contract.md §2.1` item 3; `PUB-DD-1`).

---

## §3 · The surface: one module name and fourteen members

```js
import { storeCreate } from 'provident-storeroom';
```

**That is the whole module namespace — ONE name, `storeCreate`, and nothing else.** There is **no** module-level
`read`, `write`, `listen` or any other verb (`bindings/js/index.d.ts`'s preamble; `surface.md §2.9` item 1's `A127`
clause, the module count `11 → 1` ✓; measured 2026-10-26: the imported namespace's keys are `["storeCreate"]`).

### §3.1 The instance, and its fourteen own members

```js
const store = storeCreate({
  journalLength: 256,       // REQUIRED — a positive integer, bounds the journal and so the undo window
  listeners: [],            // REQUIRED, even when empty — an absent `listeners` is refused
  filePath: '/…',           // OPTIONAL — what makes the `file` tier real, and what construction occupies
  constraints: [],          // OPTIONAL — your own list; NEVER persisted (§7.2)
});
```

**`storeCreate` answers an instance carrying exactly FOURTEEN own members** — `10 + 1 + 1 + 2 = 14` ✓ — and they
are these fourteen and no others (`bindings/js/index.d.ts`, `StoreInstance`;
`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9):

| member | its declared shape | one line |
|---|---|---|
| `read` | `(address, tier?) => unknown` | a leaf's literal, a branch's assembled value, or the whole register |
| `readLiteral` | `(address, tier?) => unknown` | the same, narrowed to a leaf — **a branch refuses** |
| `write` | `(address, tier, value, commit?) => WriteRecord` | `commit` is the kernel's own position; leaving it out is the supported form |
| `delete` | `(address, tier?) => DeleteRecord` | **a method name, not an identifier binding** — `store.delete(…)` |
| `rollback` | `(opId) => RollbackRecord` | walks backward and undoes **that op and everything after it** in scope |
| `listen` | `(handle, addresses) => Handle` | **you spell the handle**; the address position is a **SET**; answers the standing handle |
| `unlisten` | `(handle) => void` | withdraws the store-side entry, and the registry entry where the identity stands nowhere |
| `register` | `(handle, listener) => void` | one handle, one function — a second registration replaces the first |
| `removeListener` | `(handle) => void` | the entry removed whole and its store entries withdrawn |
| `addConstraint` | `(pair, constraint) => ConstraintIdentity` | the ADD route; **overwrites at a held pair and throws nothing for it** |
| `constraintOn` | `(pair, constraint) => void` | enable — idempotent; throws at a pair the store does not carry |
| `constraintOff` | `(pair, constraint) => void` | disable — idempotent; **not a removal** |
| `removeConstraint` | `(pair) => void` | **the one act that deletes an identity** |
| `constraints` | `() => ConstraintPair[]` | the registered pairs, `{address, id}` only — **no function, no identity, no order, no `enabled`** |

**Measured 2026-10-26, on an instance built in memory: `Object.keys(store)` and
`Object.getOwnPropertyNames(store)` are both this same fourteen-name list, and the `read` member's own descriptor
reads `writable: true, enumerable: true, configurable: true`.** **THERE IS NO `on`, NO `off` AND NO `settle`.** `on` and
`off` were merged away — registration is `listen` then `register`, and withdrawal is `unlisten` — and `settle`
was removed whole when the kernel became the only write path (`index.d.ts`, the member-set clauses of 2026-10-18
and 2026-10-19; `A127`). **A guide or a README that declares a `settle` member is describing a surface that no
longer exists.**

### §3.2 The private-state rule

**The instance is the handle you act through, and no own member is a data member.** There is no `store.data`, no
`state` field and no getter over the register; **`read(address)` is the route.** A consumer that expects
`store.data`, `store.store` or a `state` property is reading an object that does not exist
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/surface.md §2.1` (e) item 1, archived at its
operative clause; `A117` (D6)).

### §3.3 The `commit` position, and why you should leave it out

**`write`'s fourth position is the optional `commit`** — `write(address, tier, value, commit?)` — and **an absent
`commit` is in domain**: the write opens or joins a commit all the same (`surface.md §2.2` clause 3;
`index.d.ts`, the `write` member). **Passing one is the kernel's own route into a write, and a caller leaving the
position out is the supported form.** **Every form at that position other than an object carrying a `pending`
member present and not `undefined` throws the class test's own `TypeError`, whose `status` member is ABSENT** — and
**a refused position stops the write: no verb is reached and no byte moves** (`surface.md §2.4` item 9 (g) item 1).

**And one reading that catches people: a SUPPLIED `undefined` at a `tier` position is not the same call as no
position at all.** It is a PRESENT value, and the store answers `AddressMalformed` for it; only the call that
supplies nothing there folds to the absent tier (`parameter-semantics.md §2.6`, `PAR-JS-6`, archived; `index.d.ts`,
`TierSet`).

---

## §4 · Addresses

```ts
type Address = readonly (string | number)[];
```

**An address is a path from the register, walked one segment at a time.** A segment is either a `string` key or a
**non-negative integer index** (`bindings/js/index.d.ts`, the `Address` declaration; `PAR-JS-5`).

```js
store.read([])                     // THE WHOLE REGISTER — measured 2026-10-26: `{}` on a fresh store
store.read(['users'])              // a branch: its assembled value
store.read(['users', 0, 'name'])   // a leaf's literal
store.readLiteral(['users', 0])    // a leaf only — a branch refuses with `ReadTargetIsBranch`
```

**Five rules, each of which a reader guesses wrong at least once:**

1. **The empty address resolves to the register, and the register is itself a branch** — so read it with `read`,
   never `readLiteral`.
2. **The empty string `''` is a legal key, and there is no delimited address form.** `'a.b'` is not an address; it
   is a single string key that happens to carry a dot, and an address is an ARRAY of segments
   (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/crossing.md §1.3`, `AddressArg` rows 2 and 6,
   archived).
3. **An integral segment is in domain up to `Number.MAX_SAFE_INTEGER`.** Anything integral above `2^53 − 1` is
   `AddressMalformed` — refused, never folded onto a nearby address (`crossing.md §1.3`, the `AddressArg` row 3
   range clause).
4. **An index aimed at the register is `AddressNotFound`** — the register is keyed by names and holds no index
   semantics (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/store-model.md §2.2`, arm
   `L-INT-REG`).
5. **An array with a hole is not an address.** A sparse address array is `AddressMalformed`, because the two
   readings of a hole disagree and neither may be chosen silently (`crossing.md §1.4` item 2).

**And the sentence that saves the most time: a nested write does not create its parent.** Writing beneath a path
does not bring the path into being; the parent must already stand, and the failure is the write's own
`AddressNotFound` naming the container it looked in (`archive/pre-strata-docs-2026-10-24` — the archived
`write-and-read.md` `§3.2`, items 1–2, arm `F-3`). **So create the shape you mean, then fill it** —
either write the parent first, or **write a whole structured value at the key, which mints the branch tree beneath
it in one call** (`write-and-read.md §3.4`, arm `W-4`).

**A branch assembles one member per child key**, a branch whose container is an array assembles a **dense array**,
and **an empty container reads `{}` or `[]` — the two are distinct, and that distinctness is what makes the
container's kind observable at a read** (`write-and-read.md §4.2`, arms `R-2`/`R-3`). **A write whose value kind
contradicts the container's answers `ContainerKindConflict` rather than converting** (`write-and-read.md §3.4`,
arm `F-4`). **That is a design decision you make once per key, not something the store repairs for you.**

---

## §5 · Tiers

**The tier order is `file` > `mem` > `temp` in persistence**, and what each means for you is lifetime: `temp` is
shadowed by writes to `mem`, `mem` lives for the session, `file` is for anything that must be there on the next
boot (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md §3.1.1`).

### §5.1 The tier order decides which version a read lands on — it is not a layered stack

**Writing at a tier does not add a version beside the old one: the write purges the versions it outranks, and one
version is left holding the key** (`write-and-read.md §3.4`, arms `W-6` and `W-1`; §3.2 item 3). **A read narrowed
to a tier the key no longer holds refuses `TierNotFound`, and the message names the tiers that ARE present**
(`write-and-read.md §4.2`, arm `R-4`'s message obligation).

**There is one state in which two versions DO stand at one key, and it is the exception that makes the rule
readable: a SHADOW.** When the key holds a version at a tier MORE persistent than the write's, the newer version
is added alongside and the more persistent one wins the unqualified read. **So "one version per key" is not the
invariant; "the write's own tier decides which versions survive it" is** (`write-and-read.md §3.4`, arm `W-5`).

**Whether declared semantics and shipped behaviour agree at every arm and every tier combination is not a
consumer guide's question, and this guide does not turn the rule above into a promise about any particular
pair — it states what to rely on: the order `file` > `mem` > `temp`, the `TierNotFound` refusal with its named
tiers, and the arity rule immediately below.**

### §5.2 The tier argument's arity differs by verb

**READERS take absent, ONE token, or an ARRAY of tokens read as an ANY-MATCH set. WRITERS AND DELETES TAKE EXACTLY
ONE TOKEN** — an array at `write` or `delete` is `OutOfDomainTier` (`bindings/js/index.d.ts`, the `TierSet`
declaration, which says so directly; `crossing.md §1.3`, `TierArg` rows 2 and 3).

| verb | `tier` absent | one token | an array | `null` / `undefined` |
|---|---|---|---|---|
| `read` · `readLiteral` | legal — the lowest persistence present | legal | **legal — an any-match set** | `AddressMalformed` |
| `write` | `AddressMalformed` | legal | **`OutOfDomainTier`** | `AddressMalformed` |
| `delete` | legal — every tier at the target | legal | **`OutOfDomainTier`** | `AddressMalformed` |

**Asking "do I have this anywhere durable or in memory?" is a legitimate question — `store.read(addr, ['file',
'mem'])` answers a node matching ANY of them. A write is going somewhere, and an array there would be a choice you
did not make.**

**And the tier's domain is three lowercase tokens: `file` · `mem` · `temp`.** `'secure'`, `'FILE'`, `'disk'`,
`'session'` and `''` are each outside it and each answers `OutOfDomainTier`; **`null` and `undefined` are not
tier-shaped values at all, so they answer `AddressMalformed` rather than `OutOfDomainTier`**
(`write-and-read.md §3.1.1`, and its `null`/`undefined` column clause).

**★ AND `listen` HAS NO TIER AT ALL** — it takes a handle and an address SET, and nothing else (`index.d.ts`, the
`listen` member; `held-listener/contract.md §2.2` item 1's arity `2`). **The archived guide's tier table carries a `listen` row
and it is superseded: the verb's positions are `(handle, addresses)` and a tier-shaped argument at position two
is a set-position class refusal, not a tier.**

### §5.3 `write` and `delete` do not treat one tier alike

**A `write` at a tier purges the versions it outranks; a `delete` at a tier removes THAT tier's version and
leaves every other tier's version at that key untouched** (`write-and-read.md §4.4`, arm `D-1`). **A `delete` with
no tier removes every version at the target and all downstream of each; a delete of the empty address empties the
register; and a delete that removes nothing is a SUCCESS — it answers `tiers: []` rather than throwing**
(`write-and-read.md §4.3`, `§4.4` arms `D-2`, `D-3` and `D-5`).

### §5.4 Undo is bounded by the journal, and `rollback` is not a single-op undo

**`rollback` walks backward through the journal, from the newest in-scope entry to the oldest, and the scope is
every operation touching the same subtree as the named op — not the last op alone. There is no partial or subset
rollback** (`write-and-read.md §6.4`, arms `M-5` and `M-8`). **Its answer's `undoneOps` is the LIST of the ids the
reversal actually undid — a report of reversals PERFORMED, newest first, and never a census of in-scope entries**
(`index.d.ts`, the `RollbackRecord` declaration; `write-and-read.md §6.4` item 3 (i)). **`restoredTo` is the base
state the addressed subtree now stands at, `{ present, value }`.**

**Three more things about the journal, each of which changes how you use it:**

- **The journal is not readable, enumerable, addressable or deletable by any other call.** There is no
  `journalEntries()`, no `journalLength()` and no `clearJournal()`; **`rollback` is its only consumer, and the op
  crosses to you as a returned value on every write** (`write-and-read.md §6.3`).
- **`journalLength` is your whole undo window.** The store compacts entries into a base state as the journal
  fills, and **a rollback whose candidate set includes at least one compacted entry fails `RollbackCompacted` AND
  UNDOES NOTHING — the floor is all-or-nothing** (`write-and-read.md §6.1` `M-4`; `§6.4` `M-6`).
- **A rollback appends no journal entry, and an undone entry is marked `compacted: true`.** **The `compacted` flag
  is ONE predicate with TWO grounds** — compressed into the base state, or undone by a rollback — **and the record
  carries no member to tell them apart** (`write-and-read.md §6.4` `M-9`).

**★ A REVERSAL IS ALSO JUDGED BY YOUR CONSTRAINTS — AT THE STATE IT LEAVES, AND THAT ARM IS DECLARED BUT NOT
YET CARRIED, WHICH THIS GUIDE SAYS PLAINLY RATHER THAN LETTING YOU DISCOVER IT.** **The ruling** (`D-38`,
verbatim: *"Assert the constraints on rollback"*) **makes a `rollback` whose TERMINAL state violates a registered
constraint FAIL, answering `{status: 'ConstraintPassRefused', message, log}` at rank `20` — the same member a
constraint-refused `write` answers (`§8.1`).** **IT IS JUDGED AT THE TERMINAL STATE AND NEVER PER UNWINDING
STEP**, because a per-step check is unsound: a reversal passes through intermediate states no constraint would
approve, and only the state you are left standing in is a state a constraint can be asked about. **A LAWFUL
REVERSAL IS UNCHANGED** — same `{opId, undoneOps, restoredTo}`, no status and no throw. **MEASURED 2026-10-26:
the shipped `rollback` still consults no constraint** — a refusal registered over the address a reversal
restores is not evaluated, and the reversal succeeds — **so treat this paragraph as the ruling's declaration
and NOT as today's behaviour**; the arm's carrier is owed at the `rollback` member and is the only part of this
guide's constraint story that is not yet observable.

**⟶ AND THE CARRIER THAT PARAGRAPH SAYS IS OWED HAS LANDED (2026-10-26), SO THE RULING IS NOW TODAY'S BEHAVIOUR — WITH FOUR NARROWINGS YOU SHOULD MEET BEFORE YOU RELY ON IT.** `RCA-8(g)` ANNOTATE-BESIDE: **the ★ paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause — so do its two measured readings, *"the shipped `rollback` still consults no constraint"* and *"the arm's carrier is owed at the `rollback` member"*: each was true of the tree it was measured on and each is FALSE of the shipped tree from this date.** **WHAT YOU NOW GET: a `rollback` whose terminal state a registered constraint refuses throws `{status: 'ConstraintPassRefused', message, log}` at rank `20`, and a lawful reversal answers its unchanged record** — same `{opId, undoneOps, restoredTo}`, no throw, no new member. **WHAT THAT PROMISE DOES NOT COVER — FOUR LINES, EACH WITH ITS REASON:**
1. **A reversal INSIDE an open commit is NOT judged.** If you reverse from inside a constraint body, a repair, a listener, or the kernel's own failing-attempt floor call, the state the reversal leaves is not the state that stands (the open window moves it again, and the caller sees nothing yet) — **and judging it would invoke your constraint bodies MID-ATTEMPT and break `D-40`'s promise that a failed attempt leaves the store as it found it.** **The judgement is the AT-REST reversal's: your own `rollback` at the surface, where the state it leaves is the state you then read.**
2. **A DISABLED pair is NOT judged.** A pair you `constraintOff`'d still appears in `constraints()`, but the judgement asks only pairs that are enabled — **because a disabled pair cannot fire, so nothing it would refuse can have run.** Re-enable it and it is asked again at the next reversal.
3. **A pair registered STRAIGHT THROUGH THE KERNEL'S `K-1` is NOT judged at a reversal.** The judgement reads the package's own registry, which the package's declared registration routes write — `cfg.constraints` at construction and `addConstraint` after it — while a pair placed by a kernel-direct call is evaluated at writes but is **not** in the state the judgement reads (and `constraints()` does not list it either). **Register through the package's routes and the promise covers you.**
4. **WHEN IT REFUSES AND NO ATTEMPT STANDS, `log` IS ONE `constraint-check` ENTRY — NOT `[]`.** The `log` member is normally *"the attempt's own message log"*, and `[]` is its value where a failure's cause has no attempt; **a reversal's judgement is one of those causes, and here the refusal AUTHORS ITS OWN RECORD instead of reporting an absence:** `log.length === 1`, `log[0].kind === 'constraint-check'`, `log[0].id` the refusing pair's own id, `log[0].state` `null`, `log[0].opId` the reversal's own op id or `null`. **So do not read an empty array as *"nothing failed"* at this arm, and do not read this one entry as an attempt's history — it is the refusal's.**
**AND ONE THING ABOUT A FAILING REPAIR, WHICH IS THE SAME SHAPE AND IS DECLARED RATHER THAN DISCOVERED: THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE; AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED.** `D-40`'s sentence — *"a failed attempt leaves the store exactly as it found it"* — is measured true of the attempt's own address and false of a beside address: the store's rollback scope is the addressed subtree at or after the named op's own position, so a repair that writes elsewhere leaves THAT value standing after the failed attempt. **If you need the beside address's pre-attempt value, keep it yourself: the store's own floor call does not put it back** (`docs/specs/storeroom-js/contract.md §2.6`'s clause of 2026-10-26, which is where the four narrowings, the `log` arm and this spatial scope are declared; `E2E-C-9` cell 6 in `tests/e2e/blind-constraints-v2.mjs` is the measured reach).

---

## §6 · Watching for changes: the listener surface

**Listeners fire on `write` and `delete`, and never on a read.** A read is not a change, and a store that fired on
reads would fire on every render; **nor does a boot or any read-driven traversal fire a listener**
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md §6.5`).

```js
const handle = store.listen('greeting-watch', [['greeting']]);   // YOU spell the handle; the addresses are a SET
store.register(handle, (address) => {                            // handle + your function
  console.log('changed at', address);                            // the ONE argument is the write's address
});

store.write(['greeting'], 'mem', 'hello');

store.unlisten(handle);                                          // withdraw the registration
```

**Measured 2026-10-26: `store.listen('h1', [['b']])` answered the string `'h1'`, and `store.register('h1', () =>
{})` answered `undefined`.** **Each address in the set is itself an array of segments — `[['b']]` is a set of one
address — and `[]` (the empty set) is in the domain.**

### §6.1 `listen` takes an address SET and answers the handle

**THE SIGNATURE IS `listen(handle: Handle, addresses: readonly Address[]): Handle`** — arity `2`, position `1` a
non-empty `string` you spell, position `2` an ARRAY of addresses
(`docs/specs/storeroom-held-listener-identity/contract.md §2.2` items 1 and 2; `bindings/js/index.d.ts`'s `listen`
member, amended 2026-10-24).

**Four rules about that second position, and they are the ones a reader gets wrong:**

1. **A SINGLE address supplied as a bare array-of-segments is NOT an address set.** `listen('h', ['a'])` puts the
   STRING `'a'` where an address belongs — a string is not a segment list — so that call is a set-position class
   refusal, not a registration. **You mean `listen('h', [['a']])`** (`held-listener/contract.md §2.2` item 2: *"the
   position is a set and a segment list is a different shape"*). **The outside-value set of the set position is: ABSENT · `null` · `undefined` · a non-array · an
   array carrying a member outside the address domain · an array carrying a nested array-of-arrays that is not
   itself an address — and the declared answer for each is the one thrown form carrying the store's
   `AddressMalformed`.**
2. **THE EMPTY ARRAY IS IN DOMAIN.** `listen('h', [])` is a lawful call.
3. **THE SET IS AN ASSIGNMENT, NOT A UNION.** `listen(h, S2)` after `listen(h, S1)` **destroys `S1` wholly and
   installs `S2`**, with no intermediate state observable. **You cannot narrow a live handle's standing by
   omitting an address you previously named** (`held-listener/contract.md §2.2` items 3 and 4; `(R1)`).
4. **THE CALL ANSWERS THE HANDLE.** On success `listen` returns the handle it watches under — your own spelling,
   returned as the identity the store holds for that entry — and **every failure remains the one thrown form**
   (`D-22`, verbatim: *"Listen should return the handle on success, or error message on fail. Discard the noop
   prefix"*; `held-listener/contract.md §2.2`'s 2026-10-25 clause). **A caller that ignores the return is unaffected by the
   return's existence.**

### §6.2 `register`, `unlisten`, `removeListener`

**`register(handle, listener)` installs the function under a handle this instance holds an entry for; a second
`register` for one handle REPLACES the first, and the replaced function is dropped without notice**
(`surface.md §2.4` rule 2). **Measured 2026-10-26: `store.register('h9', () => {})` at a handle no `listen` wrote
and no `cfg.listeners` adopted threw the ONE PLAIN FORM — `{status: 'AddressMalformed', message, log}`, whose
message says *"this instance holds no listener entry for it — a registration names a handle `listen` wrote or
`cfg.listeners` adopted"*.** **That is the declared reading and not a `TypeError`:** the registration site's
refusal *"is a rejection under `A76` and travels in this section's single form, with its `status` drawn from the
store's closed set"* (`surface.md §2.5` item 5 (g)'s operative reading of 2026-10-17; `index.d.ts`'s `register`
block). **A `TypeError` from a store-reaching verb is itself treated as a finding at that site, which is how you
can tell the two apart.**

**`unlisten(handle)` withdraws the registration and performs the package's own half too:** the store-side entry
named by the call is withdrawn, and the registry's entry for the identity is removed **where the identity no
longer stands anywhere** (`surface.md §2.4` item 7 (b)'s step list, merged into this one member;
`held-listener/contract.md §5.5`'s fourth added entry). **Over a value outside the domain it is a PLAIN NO-OP SUCCESS** — a
fabricated handle, a blank token, a prior session's token — producing no code and removing no other registration.

**`removeListener(handle)` is the stronger member and it is not the same act: the listener entry is removed WHOLE
and its store entries are withdrawn, and every arm that is not a REAL removal THROWS** (`held-listener/contract.md §2.7` item 2;
`PAR-HL-14`, `PAR-HL-15`; `index.d.ts`). **Measured 2026-10-26: `removeListener` at a handle the instance holds no
entry for threw the one plain form with `AddressMalformed` and the message *"…removeListener's first argument is
'h9', and this instance holds no listener entry for it"*.** **So `unlisten` is a no-op and `removeListener` is not:
choose the one whose answer you want when the handle is stale.**

### §6.3 The store invokes nothing

**The store returns the triggered set and invokes no callback.** The invocation is the CLIENT's act, and the
package's per-instance registry is the handle→function map (`write-and-read.md §3.5`'s amended record and the
store-side clause it cites; `surface.md §2.4` items 5–6). **That is why a registration is a member of the
instance and not a function you hand to the store.**

**Four rules, and they are the package's rather than yours to reimplement:**

1. **An unregistered handle fires nothing, silently** — no warning, no log, no code. **The silence is an
   assertable observable** (`surface.md §2.4` rule 1).
2. **`triggered` membership is decided by address and by nothing else:** a handle appears exactly where **its
   listener's address is a PREFIX of the triggering address** (`surface.md §2.3` item 5). **So a listener bound at
   a strict descendant of a deleted address does NOT fire.**
3. **A registration made during a firing window is not invoked during that window.** A delivery's recipient set
   is read from the array as it stands when the window opens (`surface.md §2.4`, the delivery-window clause).
4. **One invocation per distinct handle.** A handle bound at two addresses that both match fires ONCE
   (`held-listener/contract.md §2.4` item 6; `surface.md`, *"a lawful duplicate fires once per distinct handle"*).

### §6.4 What a record's `triggered` and `watched` carry

**A trigger is a PAIR, `{handle, address}` — not a bare handle.** **`address` is the address the listener was
BOUND at, never the address the write targeted**, and the two are told apart: **the invocation's one argument is
the write's address** (`index.d.ts`, `TriggerPair`; `held-listener/contract.md §2.4` items 1 and 7; `PAR-HL-19`–`PAR-HL-21`).
**There is no parallel `triggeredAddresses` array and none may be added.**

- **`write` answers `{op, watched, triggered}`** (`index.d.ts`, `WriteRecord`). **`op` is the store's own journal
  record and not a number** — `{opId, kind, address, tier, before, after, seq, compacted}` — and **the op's
  `opId` is a string** and is the token `rollback` accepts (`index.d.ts`, `JournalOp`). **`watched` carries
  ADDRESSES where `triggered` carries pairs — two types on purpose, so a call site cannot confuse the two lists**
  (`index.d.ts`, `WriteRecord`; `write-and-read.md §3.5`).
- **`delete` answers `{address, tiers, triggered}`** — `tiers` naming the tiers whose versions were REMOVED, and
  `address` being your own array (`index.d.ts`, `DeleteRecord`).
- **`rollback` answers `{opId, undoneOps, restoredTo}`** (`index.d.ts`, `RollbackRecord`).
- **Neither list's ORDER is declared.** Compare them as SETS, never as sequences (`DD-22`, `DD-37`;
  `held-listener/contract.md §2.4` item 6's no-order rule).
- **`triggered` is always a list and may be empty; it is never absent.** A delete that removes nothing is a
  SUCCESS carrying `tiers: []` and `triggered: []` (`write-and-read.md §4.4`, arm `D-3`).
- **The kernel's own `pending` list carries the same pair element as `triggered`**, because `pending` is seeded as
  a clone of the store's returned set (`index.d.ts`, `CommitRecord`; `held-listener/contract.md §2.4` item 3).

**And one store behaviour that shows up in the records if you use integer addresses: a delete of an indexed
version of an array container RENUMBERS the surviving anchors in container order from `0`, each keeping its tier
and its node** (`write-and-read.md §4.4`'s renumbering clause).

---

## §7 · Constraining: the pair, the handle, and the two routes

### §7.1 A pair is `{address, id}`, and the `id` IS its handle

**A constraint is addressed by a PAIR — `{ address, id }` — where `address` is an address in §4's domain and `id`
is a NON-EMPTY `string`** (`bindings/js/index.d.ts`, `ConstraintPair`; `PAR-JS-24`).

**★ AND THE PAIR'S `id` IS ITS HANDLE, INSTANCE-SCOPED AND UNIQUE. YOU NAME IT.** `D-23`: *"Setting a constraint
should expect a handle name to be used for handle and process/error logging purposes"*; `D-24`: *"The handle
becomes the id — the handle needs to be unique regardless, and setting a duplicate handle is an overwrite"*;
`D-29`: *"Handle becomes the internal ID"*. **One `id` names one pair, one identity and one handle** — the older
`(id, address-set)` keying is superseded, and **there is only ever one pair per `id`.**

**AND THE `address` MEMBER'S TYPE MOVES BY ACT, which is a fact worth knowing before you write a helper:** at the
REGISTRATION act the pair names a single address; on the `constraints()` read and at `removeConstraint` it is the
pair's own SET of addresses (`index.d.ts`, `ConstraintPair`; `held-listener/contract.md §2.6` items 4–5). **Measured 2026-10-26:
after `store.addConstraint({address: ['a'], id: 'c1'}, () => true)`, `store.constraints()` answered
`[{address: [['a']], id: 'c1'}]` — the element's `address` is a one-member set, and the element carries exactly
`address` and `id`.**

### §7.2 The two population routes, and the function

**There are exactly TWO ways to populate constraints, and neither substitutes for the other**
(`surface.md §2.12` item 1; `index.d.ts`).

**ROUTE ONE — the batch at construction, `cfg.constraints`.** **The element is THREE members —
`{ address, id, constraint }` — AND THE FUNCTION IS REQUIRED** (`D-26`, verbatim: *"The batch in cfg.constraints
must supply functions"*). **The pair is the element's addressing and the function is its substance**, and **the
batch ARMS the function at construction** — not merely validates it and defers (`D-27`, verbatim: *"Functions are
armed"*) — through the same act the add route performs. **The store never sees the function**: a JavaScript
function cannot cross into Rust, so the crossing carries the pair and **the package arms the substance**.

**A batch element that carries no function — absent, `undefined` or a non-function — is REFUSED at construction,
under the store's existing `ConstraintListInvalid`, in the one thrown form, BEFORE ANY FILESYSTEM ACT**
(`D-26` item 5; `D-27`'s closing clause; `bindings/js/src/entry/frame.mjs`, whose `constraintEntry` validates the
member and whose construction walk refuses the element — read 2026-10-26). **So the state the older prose called
*"a pair with no function"* HAS NO PRODUCER ON THIS ROUTE:** a batch element is always carried.

**ROUTE TWO — the add route after creation, `addConstraint(pair, constraint)`.** **It CARRIES the function as its
own argument, and at a pair already held the supplied constraint OVERWRITES the held one under the SAME identity
the pair was already added under — the call throws nothing for the mere fact that the pair was held** (`D-24`;
`index.d.ts`, `addConstraint`).

**★ AND THE LIST IS NEVER PERSISTED — not in the file, not as a register key and not in any journal entry.**
**The importing application supplies it at EVERY startup from its own information, and the store holds the pair's
`address` and `id` for the instance's life only** (`A118`; `native/contract.md §7.2` item 6; `index.d.ts`,
`StoreConfig.constraints`). **It is validated at TWO instants, both answering `ConstraintListInvalid` with no
instance: at CONSTRUCTION, and at a boot over an existing `filePath`, where the LOADED state is validated against
the list you supplied** (`native/contract.md §8.1` #16's amended trigger clause). **So a constraint list is code
your application carries, not state your store stores.**

**★ AND A REPEATED HANDLE ANSWERS DIFFERENTLY AT THE TWO ROUTES, WHICH IS A DIFFERENCE OF ACT AND NOT AN
INCONSISTENCY** (`D-27`'s own table):

| the act | a repeated handle |
|---|---|
| **`cfg.constraints`, the batch** | **REJECTED** — the list is ONE supplied act, so an internal ambiguity is malformed input and not a second write |
| **`addConstraint(pair, constraint)`** | **OVERWRITE** — acts are separate in time, so a later one replaces the earlier |

**At construction that means TWO refusals the store cannot take and the package owns:** no two elements of one
`cfg.constraints` may name one `id`, **and no element's `id` may equal a `handle` this construction's `listeners`
adopts — a cross-KIND collision, rejected regardless of kind** (`D-27`, verbatim: *"Reject duplicate handles in
batch - regardless of listener/constraint type"*; `index.d.ts`, `StoreConfig.constraints`). **Both are refused
before any filesystem act, under `ConstraintListInvalid`; the package mints no code.**

### §7.3 A cross-kind duplicate is REJECTED, in both directions

**A duplicate handle of the SAME kind is an overwrite. A duplicate handle ACROSS KINDS — a listener where a
constraint stands, or a constraint where a listener stands — is REJECTED** (`D-25`, verbatim: *"Attempting to
overwrite a listener with a constraint or vice versa is rejected"*; `D-29`: *"Listen cannot overwrite constraint,
only other listeners"*).

**Measured 2026-10-26, from the constraint-then-listener direction:** with `c1` armed at `['a']`,
`store.listen('h1', [['a']])` threw the **one plain form** — `Object.keys` `["status","message","log"]`, `status`
`'AddressMalformed'`, `log` `[]` — whose message names BOTH sides and carries the shared rule sentence **"a
listener and a constraint do not share one"**. **The form is the surface's one thrown form and NOT a `TypeError`**
(`index.d.ts`, `addConstraint`'s and `register`'s cross-kind clauses). **No state moves: the rejection is taken
after the positions' class tests and before any store call.**

### §7.4 The toggles, and the read

**`constraintOn(pair, constraint)` ENABLES and `constraintOff(pair, constraint)` DISABLES. Both are IDEMPOTENT,
both take the `constraint` position REQUIRED (it is a no-op on every success — the caller supplies as a function
the identity it holds at that pair, and the entry never substitutes one), and both THROW at a pair the entry does
not carry** (`index.d.ts`, the two toggle members; `surface.md §2.12` items 2–3).

**A toggle is NOT a removal.** A disabled pair is still registered and still carried; a write the disabled
constraint would have refused is ACCEPTED. **`removeConstraint(pair)` is the ONE act that deletes an identity:
the pair, its N address rows, the kernel's registration and the store's home entry all go, and a fresh
`addConstraint` at that pair afterwards answers a NEW identity** (`held-listener/contract.md §2.6` item 3; `§2.7` item 3;
`index.d.ts`).

**`constraints()` is the registered-pair read, and it reports PAIRS with four declared exclusions**
(`index.d.ts`, the `constraints` member, items 1–4; `surface.md §2.4` item 9 (f)'s `constraints` clause):

1. **NO constraint function is returned** — a disabled pair makes the hazard sharp, since the caller's function is
   kept in the entry while the kernel holds a stub.
2. **NO opaque identity is exposed** — the pair is your own datum; `ConstraintIdentity` is the package's opaque
   handle for it, and the two are not the same datum. **Compare identities, never contents.**
3. **NO ORDER is promised** — compare the returned pairs **as a SET and never as a sequence.**
4. **A DISABLED PAIR DOES APPEAR, and there is therefore NO `enabled` member on an element and NO way to read a
   pair's state off this return.** `constraintOff` is a toggle and not a removal; **an absence here means nothing
   was ever registered.**

**The read takes no argument, makes no store call, appends no journal entry and changes no node**
(`index.d.ts`).

**⟶ AND EXCLUSION 3 ABOVE IS RETIRED, 2026-10-26, ON `D-39`'S `DEF-R` RULING — VERBATIM *"add deterministic
ordering"* — WHICH RULES THAT *"that exclusion is superseded and the order becomes part of what the method
promises"*** (`strata/decisions.md`; `RCA-8(g)` ANNOTATE-BESIDE — the four exclusions above stand BYTE-FOR-BYTE and
are read THROUGH this clause). **`constraints()` EMITS IN REGISTRATION SEQUENCE — THE ORDER THE PAIRS WERE
REGISTERED — DETERMINISTICALLY AND STABLY ACROSS EVERY CALL AND EVERY INTERVENING ACT; THE ORDER IS PART OF WHAT
THE METHOD PROMISES.** **So you MAY now compare the returned array element by element, and the sequence you read
is the sequence your own calls stood in: a pair from `cfg.constraints` in its list position, then each
`addConstraint` in the order you made it; a pass, a refusal, a toggle and a `rollback` move none of it.** **THE
OTHER THREE EXCLUSIONS STAND UNCHANGED: no function, no opaque identity, and a disabled pair still appears with no
`enabled` member beside it.**

### §7.5 ★ Reads check NO constraint

**The constraint mechanism is unconditional on the WRITE/COMMIT path, over the triggered handle set — and
`read`, `readLiteral` and a branch's assembly CONSULT NO CONSTRAINT, refuse nothing on a constraint's verdict, and
filter nothing on one.** **There is no read-side enforcement arm, none is declared, and none is owed**
(`strata/decisions.md` `D-1-bis`, where the architect refused the read-side reading by name, reading (a)):
*"a is correct"*.

**So a constraint cannot be used as a read filter, a field-level permission, or a projection. It is a gate on
writes and on nothing else** — and **reads consult no constraint's verdict, filter nothing on one, and refuse
nothing because of one.**

---

## §8 · Refusals

**One failure surface, everywhere, and it is THROWN:**

```js
try {
  const v = store.read(['users', 0, 'name']);
} catch (e) {
  // e is a PLAIN OBJECT — never an Error subclass, never a rejected promise, never a tagged union
  const { status, message, log } = e;
}
```

**A refusal is a thrown object literal carrying exactly `{status, message, log}`** — **never an `Error` subclass,
never a returned tagged union, never a `Promise` rejection**, so `try/catch` is the whole error model
(`bindings/js/index.d.ts`, `StoreRefusal`; `surface.md §2.5`'s clause of 2026-10-16, the crossing form's one home;
`js/contract.md §1.4`).

**★ AND THE `log` MEMBER IS ALWAYS PRESENT, and it is a plain own enumerable data member of that same object** —
written with an object literal, not `defineProperty`, not a getter, not on a prototype and not behind a `Symbol`.
**So `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on EVERY arm. It is
never absent, never `null` and never a non-array; `[]` is its declared value where the failure's cause has no
attempt at all, and every failure whose attempt exists carries that attempt's own entries**
(`index.d.ts`, `StoreRefusal` items 4, 9 and 10; `surface.md §2.5`).

**Measured 2026-10-26, on refusals from `read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`,
`unlisten`, `register` and `removeListener`: every one was an `Object` whose `Object.keys` was
`["status","message","log"]`, whose `log` was `[]`, and which was not an `Error` instance.**

**EVERY REFUSAL NAMES ITSELF** — by a `status` from the store's own closed set, and by a **human `message` that
carries the address, the domain, and what was found instead.** The message is generated from the code and the
failing trigger's arguments and never hand-authored at a call site
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/seams-and-lifecycle.md §8.2`, archived);
**`index.d.ts` carries both, verbatim from the store.**

### §8.1 The set is TWENTY and open by design

**⟶ RE-DERIVED AGAIN 2026-10-26 — THE SET IS TWENTY, ON THE ARCHITECT'S TWO RULINGS, VERBATIM: *"Expand the
returned fail-state list to include the refusal"* and *"Assert the constraints on rollback"*.** **`StoreStatus`
carries TWENTY members, plus the open escape arm `(string & {})`** — ranks `1`…`19` stand exactly as the two
paragraphs below print them, and **the appended term is `ConstraintPassRefused` at rank `20`: THE ONE STATUS A
CONSTRAINT REFUSAL ANSWERS WITH.** **Two arms and one member:** a `write` whose registered constraint refuses it
(`{status: 'ConstraintPassRefused', message, log}`, with the kernel's own token still riding the attempt's
`log[].state` — `KC-3`, `KC-5`, `KC-6`, `KC-8` as the case is), **and** a `rollback` whose terminal state a
registered constraint refuses (`§5.4`). **`FileCommitFailed` KEEPS rank `15` AND IS NOW THE **SAVE'S** CODE
ALONE** — it is produced by a failing `file`-tier save and by nothing else — **so a constraint refusal never
answers it again**, and the status stops naming a layer that did not fail. The algebra reads
`11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓. **Every paragraph and every table row below is the reading of its
own date and is read THROUGH this clause** (the guide's figures move with the set's own membership, which is
this section's own rule).

**⟶ RE-DERIVED 2026-10-26 TO THE ARCHITECT'S RULING AND NOT TO THE BYTES** (`DEF-S` and `DEF-N`; the architect,
verbatim: *"Expand the returned error set for both S/N"*). **`StoreStatus` carries NINETEEN members, plus the open
escape arm `(string & {})`** — ranks `1`…`17` stand exactly as the paragraph below prints them, and the two
appended terms are `ConstraintBodyThrew` at rank `18` (a constraint BODY's throw, which the package's crossing
converts into the one failure form from a value the KERNEL marked as a body's own) and
`ConstraintRefusedAtRegistration` at rank `19` (the REGISTRATION VERDICT: a well-formed pair whose body answered
non-`true` at registration or at a re-enable). **`ConstraintListInvalid` stays at rank `16` and names the SHAPE
arm alone — a malformed entry — so a pair that is `{address: ['a'], id: 'c1'}` is never refused with it.** The
algebra reads `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓. The paragraph and the table below are the 2026-10-23
reading and stand as their own date's (the guide's figures move with the set's own membership, which is the
`§8.1` rule the same paragraph states two sentences later).

**`StoreStatus` carries SEVENTEEN members, plus an open escape arm `(string & {})`**
(`bindings/js/index.d.ts`, the `StoreStatus` declaration; `docs/specs/storeroom-native/contract.md §8.1`'s
2026-10-23 amendment, whose own words are *"the operative set is `17` members ranked `1`…`17`"*; the algebra
`11 + 2 + 1 + 1 + 1 + 1 = 17` ✓). **`ValueRefusedAtBoundary` is written at rank `17`, LAST of the seventeen and
BEFORE the escape arm**, and `ConstraintListInvalid` stands at rank `16`. **The store implements seventeen
(`src/error.rs`'s `CODES`).**

| rank | status |
|---|---|
| 1–11 | `AddressMalformed` · `AddressNotFound` · `LeafHasNoDownstream` · `TierNotFound` · `OutOfDomainTier` · `ParentAnchorMonotonicityViolation` · `ContainerKindConflict` · `ReadTargetIsBranch` · `WriteParentNotLink` · `JournalOpUnknown` · `RollbackCompacted` |
| 12–16 | `ConstructionArgumentMissing` · `FilePathUnreachable` · `ValueNotAdmitted` · `FileCommitFailed` · `ConstraintListInvalid` |
| 17 | `ValueRefusedAtBoundary` |
| 18–19 | `ConstraintBodyThrew` · `ConstraintRefusedAtRegistration` (`DEF-S`, `DEF-N`, 2026-10-26) |
| 20 | `ConstraintPassRefused` (`DEF-H`, `DEF-W`, 2026-10-26) — a constraint's refusal of a `write`, and of a `rollback` whose terminal state it refuses |
| escape | `(string & {})` |

**THE ESCAPE ARM IS LOAD-BEARING RATHER THAN LOOSENESS.** The store's set has already moved three times — fourteen
to fifteen, fifteen to sixteen, and sixteen to seventeen — and an immutably-enumerated union would mis-type a LAWFUL
refusal the moment the set moves again; **the arm is what keeps a member the store has added typeable in an
installed `0.5.0`** (`index.d.ts`, `StoreStatus`; `PUB-DD-3`). **It has just done so: the 2026-10-26 ruling
added `ConstraintBodyThrew` and `ConstraintRefusedAtRegistration` at ranks `18` and `19`, and an installed copy
whose union stopped at `17` would mistype both.** **So: do
not `switch` on these without a `default`, and NEVER treat an unknown `status` as success.** The set is the
store's to close; **the package mints no member, widens no set and renames none.**

**AND `ValueRefusedAtBoundary` IS THE ONE YOU WILL MEET ON THE VALUE ROUTE:** the package's own walk decides a
value's class **before any store verb is called** and answers this member with the failing target's spelling
(§10). **`ValueNotAdmitted` stays at rank `14` and is the STORE's own answer on the native route — a pass that
reads rank `17` as a rename of rank `14` has destroyed a member.**

**⟶ AND THREE FIGURES OF THIS SECTION ARE CORRECTED AT THIS DATE, EACH AT ITS OWN SITE, SO THE NINETEEN ABOVE IS
NOT LEFT DISAGREEING WITH ITS OWN NEIGHBOURS** (`RCA-8(g)` ANNOTATE-BESIDE: every sentence above stands BYTE-FOR-
BYTE and is read THROUGH this clause). **(i) *"The store implements seventeen (`src/error.rs`'s `CODES`)"* READS
NINETEEN**: `src/error.rs`'s `CODES` is `[&str; 19]`, ranks `18` and `19` being the two this set's 2026-10-26 ruling
appended — **so the declaration of record and the crate agree at nineteen, which is the row above.** **(ii)
*"installed `0.5.0`"* READS `1.0.0`** (`bindings/js/package.json`, read at its own bytes; §0's correction clause).

**⟶ AND THAT CORRECTED FIGURE IS ITSELF ONE RELEASE BEHIND, 2026-10-27: *"installed `0.5.0`"* READS `1.0.1`**
(`bindings/js/package.json` at its own bytes; §0's correction of this date; `RCA-8(g)` ANNOTATE-BESIDE — the
sentence above stands and is read THROUGH this one). **THE SENTENCE'S OWN POINT IS UNMOVED: the escape arm is what
keeps a member the set has since gained typeable in an installed copy, and the set is the store's to close.**
**(iii) THE SET HAS NOW MOVED FOUR TIMES, NOT THREE**: fourteen to fifteen, fifteen to sixteen, sixteen to
seventeen, **and seventeen to nineteen** — **the escape arm's argument is strengthened rather than weakened by the
fourth move, which is exactly the arm's own evidence.** **NO TABLE ROW, NO RANK AND NO TRIGGER MOVES, and the two
appended members are the ones the table's `18–19` row already prints.**

**⟶ AND TWO FIGURES OF THAT CORRECTION ARE THEMSELVES RE-READ AT THE SHIPPED TREE, 2026-10-26, BECAUSE THE SET MOVED AGAIN AFTER THE CORRECTION WAS FILED AND ITS OWN ALGEBRA MOVED WITH IT.** `RCA-8(g)` ANNOTATE-BESIDE: **the correction's sentences — including its *"READS NINETEEN"* and its *"FOUR TIMES, NOT THREE"* — stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause re-reads two figures and moves no site, no rank and no trigger.** **(i) *"`src/error.rs`'s `CODES` is `[&str; 19]`"* READS `[&str; 20]`** — read at the crate's own bytes — **ranks `18`, `19` and `20` being the three the 2026-10-26 rulings appended, so the declaration of record and the crate agree at TWENTY, which is this section's own heading and its table's own `20` row.** **(ii) THE SET HAS NOW MOVED FIVE TIMES, NOT FOUR:** fourteen to fifteen, fifteen to sixteen, sixteen to seventeen, **seventeen to nineteen, and nineteen to twenty** — **the fifth move being `ConstraintPassRefused` at rank `20`, appended on the architect's ruling *"Assert the constraints on rollback"* — and the escape arm's argument is strengthened rather than weakened by the fifth move, exactly as it was by the fourth.** **NO TABLE ROW, NO RANK AND NO TRIGGER MOVES BY THIS CLAUSE: the heading's algebra `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓ is the one figure of this section that stood right before it and stands right after it.**

### §8.2 The two states that share `FilePathUnreachable`, and what each means for you

**`FilePathUnreachable` is the one member that answers for two unrelated failures, and a handler that treats them
as one "file problem" will retry a construction that cannot succeed, or discard a running store.**

| the state | when you meet it | what it means |
|---|---|---|
| **`FilePathUnreachable`** | **at `storeCreate`** — no addon loaded at either rung (§2.3), or a provided `filePath` that failed the construction-time reachability test | **NO INSTANCE WAS RETURNED AND NOTHING WAS CREATED.** There is no store to retry against |
| **`FileCommitFailed`** | **on a `file`-tier write's save, on an instance that is running** | **THE INSTANCE IS FINE AND THE WRITE FAILED — AFTER THE STORE'S OWN JOURNAL ROLLBACK ALREADY RAN** (§9.2) |

**The refused `filePath` forms, each answering `FilePathUnreachable` with nothing created:** an absent parent
directory; a path that is a directory; an existing file that is not writable; a name occupied by a DANGLING
SYMLINK; a parent on a read-only mount (`EROFS`); and a create the process is denied (`EACCES`)
(`docs/specs/storeroom-native/contract.md §8.1` #13's amended trigger clause; `§10.4` part 5).

### §8.3 The refusal that is not `{status, message, log}` — declared, and narrow

**Two positions throw a `TypeError` instead of the one form, and both are DECLARED rather than accidental:**

1. **`write`'s `commit` position.** Every form at that position outside the admitted one throws **the class
   test's own `TypeError`, whose `status` member is ABSENT and whose STRING `message` member is REQUIRED**
   (`surface.md §2.4` item 9 (g) item 1; `index.d.ts`, the `write` member). **A refused position stops the write:
   no verb is reached and no byte moves.**
2. **The three constraint methods' argument positions.** **Every outside form of either position throws ONE
   `TypeError`, whose `status` member is ABSENT, and nothing is added, enabled, disabled or otherwise changed**
   (`index.d.ts`, `addConstraint`; `surface.md §2.4` item 5's constraint-argument rule (ii);
   `parameter-semantics.md §2.25`, archived).

**Measured 2026-10-26, and it is the sharpest of these:** `store.constraintOn({address: ['a'], id: 'c1'}, () =>
true)` at a pair this entry does not carry threw a **`TypeError`** whose `Object.keys` was `["log"]`, whose
`status` was **absent**, and whose message read *"the pair at the first argument of `constraintOn` carries no
constraint in this instance, and a toggle names a pair the entry carries"*. **So the `TypeError` carries `log` and
no `status`, and no clause declares that member set** (`docs/L1/open-items-2026-10-25.md §2`'s item (d) records
the residue and its owner, `role_spec_writer`).

**THE PRACTICAL RULE, AND IT IS THE WHOLE OF WHAT YOU NEED: catch broad, branch on `status` when it is present,
and never assume a caught value has one.** **A `TypeError` whose `status` is absent is either a declared
class-test site above or your own bug — and it is never a store refusal.**

---

## §9 · The `file` tier

### §9.1 Construction, `filePath`, and the file the store leaves behind

**`filePath` is OPTIONAL and its absence is in domain: the register is created at `mem`.** **The register's own
tier is fixed at creation and never moves** — `file` where a `filePath` was provided and passed the probe, `mem`
otherwise (`docs/specs/storeroom-native/contract.md §10.4`; the archived `write-and-read.md` `§3.2`'s register-tier
clauses). **That matters because it is the parent anchor
the monotonic clause is evaluated against at a register key: in a `mem`-register store the `file` tier is
unreachable at register keys, and through the chain below them.**

**★ AND A PROVIDED, ABSENT PATH IS CREATED AT CONSTRUCTION — EXCLUSIVELY, ZERO-LENGTH AND EMPTY, with no register
key, no journal entry and no registration committed** (`native/contract.md §10.4` part 3; `DD-28`'s amended cell). **So
`storeCreate` is itself a filesystem act: if your own arrangement of the path depends on its absence, the store
will have occupied it before you look.**

**AN EXISTING FILE IS NEVER TRUNCATED, AND THAT IS DELIBERATE:** the primitive is an exclusive create, and its
`AlreadyExists` falls through to a write-mode open that writes no byte — **so `storeCreate` over an existing
store's file is safe, and it is not a reset** (`native/contract.md §10.4` parts 2 and 6).

**AND EVERY CONSTRUCTION ARGUMENT IS VALIDATED BEFORE ANY FILESYSTEM ACT**, so a refused construction leaves
**no instance, no file, no directory and no byte** — which holds for the later-argument failures too, and is what
the ordering buys (`native/contract.md §10.4` part 4; `§8.1` #1 and #12).

**THE FILE IS THE STORE'S, NOT YOURS.** Do not read, edit, parse or migrate it by hand; its shape is the store's
own and a hand-migration is a corruption waiting to happen. **If you need a migration, read the old value through
`read` and write the new one through `write`** (`A117`/`A127`'s private-state rule; `write-and-read.md §7.2`).

**★ AND ONE NAMED LIMITATION WITH NO RULE, so you do not discover it as a mystery: a `filePath` naming a SYMLINK to
a real writable file is ACCEPTED at construction, and the first `file`-tier write's save replaces the link with a
regular file.** **Three remedies exist and all are priced; the choice is the architect's and no clause declares
one** (`archive/pre-strata-docs-2026-10-24/docs/defects.md`, `DEF-2026-10-13-D`; `strata/brief.md §6`). **If you
point `filePath` at a symlink deliberately, know that the store will end up holding a regular file at that name
and the link will be gone.**

### §9.2 Durability is a `file`-tier WRITE's act — and the terminal arm's save is a different save

**`DD-28`'s sentence is law: *"`file`-TIER DURABILITY IS PRODUCED BY A SUCCESSFUL `file`-TIER `write` ONLY"***
(`docs/specs/storeroom-native/contract.md` `DD-28`). **So `store.write(addr, 'file', value)` COMMITS, with no
kernel attempt and no terminal arm in the path, and a fresh `storeCreate` over the same `filePath` resolves the
address** (`strata/decisions.md` `D-32`, where the architect chose the native reading, `"a"`). **That correction is
the single largest of the archived guide's errors: it taught that the write verb performs no file I/O on any of
its arms, and that a bare `file`-tier write therefore does not persist.**

**AND `surface.md §2.11` clause 1 IS READ THROUGH THAT RULING RATHER THAN REPEALED:** *"the verb performs no file
I/O on any of its arms"* becomes **"the write verb performs no file I/O OF ITS OWN beyond the store's declared
write"**. **The clause still governs the PACKAGE's layer — it adds no second write path, no scratch copy and no
package-authored image — and it no longer denies the store's own declared act** (`D-32`, which also supersedes
nothing of clause 2).

**★ AND CLAUSE 2 IS UNTOUCHED AND STILL BINDS, which is why BOTH saves stand:** on the **kernel path**, the
terminal arm performs the store's `commit_file` **as its first act on the PASSING arm, before any delivered
listener body runs, keyed by the settled record's own `op`** — and **that is the KERNEL path's save of a whole
attempt, not a second spelling of the bare write's.** **Both acts stand; the bare write's and the terminal arm's
are different saves of different scopes, and the same bytes may lawfully be committed by both** (`surface.md
§2.11` clauses 2–4; `D-32`).

**So: no listener body runs before the pass, and none runs before the save on the passing arm.** **A failing pass
performs NO save at all** — the bytes at `filePath` after it are byte-identical to the bytes that stood there
before the write (`surface.md §2.11` clause 4 (i)).

### §9.3 A `delete` and a `rollback` perform no file I/O

**A `delete` — at ANY tier scope, INCLUDING one that removes `file`-tier versions — performs no file I/O, and a
`rollback` performs none either.** **The bytes at `filePath` remain the bytes of the last successful `file`-tier
write, and a fresh construction at the same `filePath` re-boots from those bytes — so the version the delete
removed in memory STANDS AGAIN after the re-boot.** **That re-boot is the store's own declared boot and not a
defect** (`DD-28`; `native/contract.md §7.2` item 6; `write-and-read.md §4.3`'s closing clause; `§6.4` `M-9`).

**What this means for you, in one line: durability is a property of `file`-tier WRITES. If you delete something
durable and the process then restarts, expect it back — and delete it again after the boot, or write over it.**

**⟶ AND THE SENTENCE ABOUT THE BYTES IS ONE PRODUCER SHORT, 2026-10-27 — A REFUSED REVERSAL'S RESTORE NOW WRITES
THEM WHERE IT MOVED A `file`-TIER NODE (`bd0fd8c`).** `RCA-8(g)` ANNOTATE-BESIDE: **the section above stands
BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION and moves no verb, no tier, no status
and no record.** **WHAT MOVED: the restore a REFUSED `rollback` performs — the compensating act that puts the state
back before the reversal — takes the `file` tier's projection before it and again after it, and where a version
standing at `Tier::File` moved it SAVES the restored image with the store's one writer.** **SO THE BYTES AT
`filePath` ARE THE LAST SUCCESSFUL SAVE'S, whose producers are a `file`-tier `write`'s commit AND a restore that moved
a file-tier node** — and **`and no other state` stands whole: the boot reads the register image at the file tier and
nothing else** (`native/contract.md §6.6` item `5`'s clause of 2026-10-27, the declaration's one home; `DD-28`'s
amended cell). **WHAT DOES NOT MOVE, SAID SO THE READING IS NOT TAKEN WIDER THAN IT IS:** **a `delete` still performs
no file I/O and a SUCCESSFUL `rollback` still performs none either**, so the paragraph above holds for both — the
removed version still stands again after the re-boot; **the save is the REFUSED arm's alone, it appends no journal
entry (a save is an effect and not an op), and a save that cannot land is reported (`FileCommitFailed`, the
in-memory state restored and the bytes not updated) rather than swallowed.**

### §9.4 When the save itself fails

**On a `file`-tier write's save that fails — the act itself failing, not a constraint — the store rolls the write
back in the journal AUTOMATICALLY, and the caller receives `FileCommitFailed` AFTER that rollback has run and
never the rolled-back state.** **The package compensates for nothing** (`surface.md §2.11` clause 5;
`write-and-read.md §6.4` item 8; `native/contract.md §8.1` rank #15).

**So `FileCommitFailed` is the one refusal to take seriously: surface it to the user rather than retrying blindly,
because the store's own recovery has already happened by the time you see it.**

---

## §10 · The value domain

**THE CROSSING IS A DEEP COPY IN BOTH DIRECTIONS.** When you write, the store copies your value into itself; when
you read, it copies out. **Neither side holds a reference to the other's data, at any verb, at any argument
position, at any return position** — so you may drop your reference immediately after a write, and a value you
read is yours to mutate (`docs/specs/storeroom-json-crossing/contract.md §4`'s copy discipline, and `§5`'s
copy-out form).

### §10.1 The admitted tree

**The admitted tree is the bare JSON tree and nothing else** — a **string** that is a sequence of Unicode scalar
values (no lone surrogate), a **finite** number (`-0` normalizes to `0`), a **boolean**, a **dense, genuine
`Array`** whose elements are admitted values, and a **plain object** whose own enumerable string-keyed members
carry admitted values (`json-crossing/contract.md §1`, its bullets).

**★ AND THE ONE MEMBER JSON CAN SPELL AND THIS STORE CANNOT: `null` IS NOT ADMITTED.** *"`null` is not admitted,
although JSON can spell it, because the store's own taxonomy makes `StoreValue::Null` an outside class"* — and
`undefined` is not admitted either (`json-crossing/contract.md §1`'s closing bullet of that list; `A140`, `A147`,
`A148`; `src/value.rs`'s admitted/outside taxonomy). **So a JSON payload carrying `null` anywhere in it refuses as
a WHOLE value — and there is no envelope, no marker and no `{"v":…}`/`{"e":…}` spelling that rescues it** (the
envelope is retired: `A148` Q1). **And a plain object from ANY realm is admitted** — a `vm` object, a
worker's object, a `structuredClone`d one (`json-crossing/contract.md §1`'s 2026-10-24 clause, item (1)(a); `§3`'s
`p` classification `plain`/`foreign`/`null`).

**A value is a PLAIN OBJECT when its own prototype is ONE LINK from the value and ends the chain, and that
prototype carries the standard `Object.prototype` member set** (`json-crossing/contract.md §1`'s 2026-10-24 clause, items
(1)(a)–(c)). **That is why `Object.create({ a: 1 })` is REFUSED:** its prototype's own prototype is an
`Object.prototype`, so the value's prototype is not terminal, and it is classified as **`a class instance or
another prototype-carrying non-plain object`** — the same row a class instance answers (`json-crossing/contract.md §2` row 14;
`§1` clause's item (1)(b)). **The two refusals are ONE row because they are one shape condition, not because the
package is being blunt.** A `Object.create(null)` tree, by contrast, is ADMITTED.

**An ARRAY is admitted by the same three conditions on its own chain — `value → Array.prototype →
Object.prototype → null` — and `Array.isArray` alone may not stand as the test** (`json-crossing/contract.md §1` clause of
2026-10-24, item (2)). **So a `vm` array, a worker's array and a `structuredClone`d array are admitted by the same
rule as this realm's own.**

### §10.2 What refuses, and with which status

**Every refusal on this route is `ValueRefusedAtBoundary`, decided by the package's own walk BEFORE ANY STORE
VERB IS CALLED, and it carries the failing target's spelling at its own value position**
(`json-crossing/contract.md §2`'s class table, whose rows all answer that one status; `§4`'s 2026-10-23 clause, item (4)).

**The classes, from `json-crossing/contract.md §2`'s rows — SEVENTEEN rows, and the contract's own 2026-10-24 clause
makes every one of its census sites read `seventeen`/`17` (read at their own bytes 2026-10-26; no cell of this guide
drove one):**

- **`null` and `undefined`** (rows 1–2) are refused as VALUES, always and everywhere — **and an object member
  whose value is `undefined` refuses the WHOLE value.** The member is not dropped and its key is not skipped,
  because any other answer would drop a member silently (`json-crossing/contract.md §1`'s admitted tree; `DD-8`).
- **a function** (row 3) · **a symbol** (row 4) · **a `bigint`** (row 6) · **a non-finite number** —
  `NaN`, `Infinity`, `-Infinity` (row 7).
- **a string carrying a LONE SURROGATE** (rows 9 and 10) — **at a value, and at an object member's KEY**, which
  is why a key you built from a truncated astral character refuses the value around it.
- **cyclic values** (row 11) — refused on the walk's own ancestor stack.
- **anything that is not a plain collection** (rows 12–14): a `Map`, a `Set`, a weak collection, a typed array, an
  `ArrayBuffer`, a `DataView`, a `Date`, a `RegExp`, a `Promise`, an `Error`, **a `Proxy`**, a class instance, an
  object wrapper around a primitive (`new String('a')`, `new Number(1)`).
- **a SPARSE ARRAY** (row 16) — **an array is dense if and only if every index in `0…length − 1` is an OWN
  property; an index whose only carrier is the prototype is a HOLE, and a prototype-carried index is never read**
  (`json-crossing/contract.md §2`'s 2026-10-24 clause, item (5)).
- **an object or array carrying an own ACCESSOR** (row 15) — **and note the consequence: a getter cannot occur on
  an admitted value, so the copy reads each member exactly once as a structural property rather than as a promise
  about your getter** (`json-crossing/contract.md §4`'s read-once clause).
- **an object or array carrying an own SYMBOL-keyed member** (row 5).
- **a class instance, and any other prototype-carrying non-plain object** (row 14) — `Object.create({a: 1})`
  included, for the reason §10.1 gives.
- **a class extending `Array`** (row 13).
- **★ an ARRAY CARRYING A NON-INDEX OWN MEMBER** (row 17) — **`const a = [1]; a.foo = 3` is REFUSED, not stored
  without its member.** **The predicate is exact: every string in `Object.keys(a)` must be a canonical index in
  `0…length − 1`**, so a named member on an array has no JSON spelling and the package will not drop it for you
  (`json-crossing/contract.md §2`'s 2026-10-24 clause, items (1)–(8); the arm is decided in the walk —
  `bindings/js/src/entry/carrier.mjs`, read 2026-10-26).

### §10.3 The two ceilings, and there is no knob for either

**The walk refuses a value whose nesting depth exceeds `126`, and it refuses one whose node count exceeds
`1,000,000`.** **BOTH FIGURES ARE THE OPERATIVE ADMISSION CEILING ON BOTH ROUTES, AND DEPTH `127` AND BEYOND IS
REFUSED AT THE PACKAGE'S WALK, BEFORE ANY STORE VERB, as the depth class `a value over the walk ceiling` with the
status `ValueRefusedAtBoundary`** (`json-crossing/contract.md §4`'s 2026-10-23 clause, item (2); `§8` row 7's type `integer,
0…126`).

**AND THE NODE FIGURE IS A VISIT COUNT, WHICH IS THE ONE THING ABOUT IT THAT SURPRISES PEOPLE:** the walk counts
its root as its first node, so **a value of `n` own nodes counts `n + 1`, the declared admitted own-node range is
`0…999,999`, and a value of `1,000,000` own nodes is REFUSED** (`json-crossing/contract.md §8` row 8; `§4`'s clause of
2026-10-24 on `F-RA-4`). **A shared sub-value is counted ONCE PER POSITION it occupies, not once in the caller's
graph: a dense root array of `1,000,000` elements is `1,000,000` own nodes and is REFUSED, while an acyclic diamond
carrying two distinct objects counts three visits and is ADMITTED.** **The ceiling's subject is the crossing's own
work — the visits the walk performs and the nodes the copy allocates — and a census of your graph would bound
neither.**

**THE PACKAGE SHIPS NO CONFIGURATION KNOB FOR EITHER BOUND** — *"the package ships no configuration knob for
either bound"* is `DD-10`'s own sentence (`js/contract.md` `DD-10`). **AND TWO OF THAT ROW'S OTHER TERMS ARE
SUPERSEDED, NAMED SO YOU DO NOT READ THEM OFF IT:** the depth figure it prints is `64`, re-derived to the operative
`126` by `json-crossing/contract.md §4`'s 2026-10-23 clause, **and the status it prints is `ValueNotAdmitted`, where
the package's walk now answers `ValueRefusedAtBoundary`** (§8.1's rank `17`). **The row's SUBJECT — one bound per
call, neither configurable — is what this guide relies on, and it is unmoved.**

### §10.4 The practical rule

**If you are storing something that came from a form, a JSON payload or an IPC message, you are already inside
the domain.** The failures come from storing *live* things — a class instance, a `Date` you meant to serialize, a
DOM node, a `Buffer`. **Serialize at the boundary, once, consciously** — **and if it cannot cross IPC, it cannot
be stored, which is one rule for both boundaries** (`strata/brief.md §5` item 2).

---

## §11 · The installed package, exactly

**These are the manifest's own facts, measured 2026-10-26 at `bindings/js/package.json` — not a summary of a
contract.**

| the field | its value |
|---|---|
| `name` / `version` | `provident-storeroom` / `0.5.0` |
| `type` | `module` — **the entry is ESM and there is no CJS arm** |
| `license` | `AGPL-3.0` |
| `engines` | `{ "node": ">=18.0.0" }` |
| `exports` | **ONE arm** — `"."` → `{ "types": "./index.d.ts", "import": "./index.mjs" }` |
| `optionalDependencies` | **five names, each pinned exactly to `0.5.0`** (§2.2) |
| `files` | **five rows**: `index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` |

**⟶ AND TWO OF THOSE ROWS ARE CORRECTED AT THIS DATE: `version` is `1.0.0` and each of the five
`optionalDependencies` is pinned to `1.0.0`** (`bindings/js/package.json`, read at its own bytes 2026-10-26;
`RCA-8(g)` ANNOTATE-BESIDE — the table above stands as the reading of its own date and is read THROUGH this
clause). **`name`, `type`, `license`, `engines`, `exports` and `files` are UNMOVED and were re-read at the same
bytes; the five `files` rows are still a fact of this tree and not a rule (the ★ paragraph below).**

**⟶ AND THE TWO FIGURES THAT CLAUSE CORRECTS MOVE AGAIN, 2026-10-27: `version` is `1.0.1` and each of the five
`optionalDependencies` is pinned to `1.0.1`** (`bindings/js/package.json`, read at its own bytes; §0's correction of
this date; `RCA-8(g)` ANNOTATE-BESIDE — the table and the correction above stand and are read THROUGH this clause).
**AND THE `files` ROW'S OWN FIGURE IS RE-READ AT ITS OWN SITE IN THE CLAUSE BELOW: it reads SIX rows, the sixth
being the consumer guide's landed copy, `README.guide.md`.**

**⟶ AND THE FIVE FIGURES THIS GUIDE PRINTS ABOUT THE SHIPPED TREE ARE RE-MEASURED AT IT ON ONE DATE, 2026-10-27, SO
THE GUIDE IS NOT LEFT ONE TREE BEHIND ANY OF THEM.** `RCA-8(g)` ANNOTATE-BESIDE: **every table row, every ★
paragraph and every figure above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause adds no rule and
moves no figure — it records, at one date, the reading of each figure the guide states about the shipped tree, and
each is the figure its own clause already prints.** **THE FIVE, EACH WITH ITS MEASUREMENT:**
1. **THE STATUS SET IS TWENTY** — `src/error.rs`'s `CODES` is `[&str; 20]`, ranks `1`…`20`, and the declaration of record (`index.d.ts`, `StoreStatus`) agrees with the crate at twenty (§8.1's heading, its table's `20` row and its dated clauses).
2. **THE PACKED MEMBER SET IS NINETEEN BARE AND TWENTY ASSEMBLED** — measured with `npm pack --json` at `bindings/js`: the BARE tarball carries `19` paths (`1` `package.json` + `4` root files — `README.guide.md` among them + `13` entry modules + `1` kernel: `1 + 4 + 13 + 1 = 19` ✓), and the ASSEMBLED tarball — the same stage with the release's `LICENSE` copy — carries `20`, the nineteen plus the licence (the ★ re-read clause (ii) below; the installed battery's `INSTALL-01` prints `members=20` on every run).
3. **THE ALLOWLIST IS SIX ROWS** — `bindings/js/package.json`'s `files` reads `index.mjs` · `README.md` · `README.guide.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` (`6 = 4 + 2` ✓) — **and `README.guide.md` is THIS document's landed copy** (§0's clause on the landing; the ★ re-read clause (i) below).
4. **THE INSTANCE CARRIES FOURTEEN OWN MEMBERS** — measured on an instance built in memory from the shipped artefact: `Object.keys` and `Object.getOwnPropertyNames` are both the same fourteen-name list, and `read`'s own descriptor reads `writable: true, enumerable: true, configurable: true` (§3's table; §3.1).
5. **THE DEPTH CEILING IS `126`** — the crossing's guard reads `depth > 126` (`bindings/js/src/crossing.rs`), so a value of depth `126` is admitted and one of depth `127` is refused; the node ceiling stands at `1,000,000` beside it (`json-crossing/contract.md §4`'s clause; §10.4).
**NO FIGURE MOVES BY THIS CLAUSE, AND THE ONE THING IT ADDS IS THE DATE ON WHICH ALL FIVE WERE READ AT THE SAME TREE.**

**★ THE `exports` MAP HAS ONE ARM, AND THAT IS A PROMISE ABOUT WHAT IS REACHABLE:** **the addon is NOT reachable
as a subpath and neither is the constraint kernel.** **There is no wildcard export, no deep import to the addon
and no CJS arm** (`bindings/js/README.md`; `docs/specs/storeroom-publish/contract.md §1.3`;
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md §1.3`, archived). **The addon is reached
INTERNALLY by the package's own `createRequire`-style step and is not an entry point: a consumer that spells the
addon's path directly is outside every clause of the contract** — the load succeeds or it does not, and nothing
about it is yours to configure.

**★ AND THE `files` ALLOWLIST IS A CONSEQUENCE OF REACHABILITY, NOT A DECLARED COUNT.** **The rule that binds is:
whatever the entry requires by path must ship in the tarball.** **The strict count is lifted and no hand-maintained
arity replaces it** (`strata/decisions.md` `D-3` and `D-4`; `D-4`'s own words: *"The strict count is lifted, the
delivery module and the e2e/blind scenario testing will determine the required publish shape"*). **THE FIVE ROWS
ABOVE ARE THEREFORE A FACT OF THIS TREE AND NOT A RULE:** the hub imports its parts from `src/entry/` and the
barrel, so those paths must ship; **when the entry requires nothing by path, nothing is owed — and neither you
nor a later release should read "five" as a contract.**

**What else no published tarball carries, each for a declared reason** (`publish/contract.md §2.1`; `P-PUB-7`'s surviving
prohibitions, which the lifted count did NOT touch):

- **no `.node` binary, at any key, on any target** — the binary travels in the platform packages;
- **no `build/Release` path**;
- **no `postinstall` build-on-install step.**

**AND THE LICENCE ROW IS A SEPARATE QUESTION, ANSWERED SEPARATELY:** **measured 2026-10-26, the five allowlist rows
carry no `LICENSE` row, and that is right — the licence TEXT travels at assembly time instead, into all six
artefacts, and a `files` row changes no byte of the tarball** (`publish/contract.md §2.3`; `PUB-DD-11`; and the fact that
makes the choice cheap). **Whether a row is ever added is EVIDENCE-CONDITIONAL and not rule-bound:** `delivery`
adds it **only if an e2e/install scenario shows a consumer or a scanner needs the row** (`strata/decisions.md`
`D-8`, reading (iii)). **So do not read the row's absence as a prohibition and do not read its future presence as
a change of licence.**

**⟶ AND FOUR FIGURES OF THIS SECTION ARE RE-READ AT THE SHIPPED TREE, 2026-10-26, EACH AT ITS OWN SITE, SO THE ALLOWLIST IS NOT LEFT AT A COUNT THE MANIFEST NO LONGER CARRIES.** `RCA-8(g)` ANNOTATE-BESIDE: **every table row, every ★ paragraph and every figure above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause re-reads four figures and moves no rule of theirs — the reachability rule, the licence reading's ground and the `engines` floor all stand whole.** **(i) THE `files` ROW READS SIX ROWS, NOT FIVE** — `bindings/js/package.json`'s `files` array, read at its own bytes: `index.mjs` · `README.md` · `README.guide.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` — **`6 = 4 + 2` ✓, the four root files plus the entry directory and the kernel** — and **the sixth row is the consumer guide's landed copy, `README.guide.md`, staged byte-for-byte from `docs/guides/package-use.md` by the release's assembly and imported by nothing** (`scripts/publish.sh`'s guide stage; `distribution.md §4.2` item 3's documented-text class). **THE TWO *"FIVE"* READINGS ABOVE — the table's own *"five rows"* and the ★ paragraph's *"THE FIVE ROWS ABOVE"* — are the reading of their own date and are read THROUGH this clause; and so is the licence paragraph's *"the five allowlist rows"*, whose subject is UNMOVED: NONE of the SIX rows is a `LICENSE` row, and none will be unless `D-8`'s evidence condition is met.** **THE RULE THE COUNT CARRIES IS UNMOVED EITHER WAY: whatever the entry requires by path must ship, and the count is a fact of this tree and not a contract.** **(ii) THE PACKED SET READS NINETEEN MEMBERS BARE AND TWENTY ASSEMBLED** — measured at the shipped packers: **the bare tarball carries `19` files** (`1` `package.json` + `4` root files + `13` entry modules + `1` kernel, `1 + 4 + 13 + 1 = 19` ✓, the guide standing among the four root files), **and the assembled artefact carries `20`, the nineteen plus `LICENSE`, which lands only in the assembled tree** — so a consumer comparing a bare `npm pack` tree with the release's artefact should expect exactly one member's difference and it is the licence. **(iii) AND THE GUIDE ITSELF NOW SHIPS:** **this document's canonical text reaches `node_modules/provident-storeroom/README.guide.md` in an installed package, beside `README.md`** — so a reader of the installed tree holds the document this file is, at that one path, and the landing adds no code, no export and no import. **(iv) THE STATUS SET IS TWENTY** — the figure `§8.1`'s heading and table print, and the one `§8.1`'s own dated clause and `§12.3`'s entry still spell `nineteen`: **each is read through the correction of this date at its own site, and the crate's own `CODES` is `[&str; 20]` at its bytes**, so the declaration of record and the crate agree at twenty.**

**AND THE `engines` FLOOR IS ONE DECLARATION WITH ONE READER — YOURS.** `>=18.0.0` is what the artefact loads on
and it is honest rather than provisional: the addon's highest-referenced Node-API class is the `napi_*` pair at
**Node-API version 6** (`Node 12.17.0` / `10.20.0`), read at `bindings/js/build.rs:35`–`:36`, and the ESM entry uses
only `node:` builtins — so **raising the floor would be a false restriction rather than a correction**
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/parameter-semantics.md §2.6`, `PAR-PUB-6`,
archived). **And the one other version number in that file is not a runtime floor at all:** `bindings/js/build.rs`
pins `24.11.0` as **the Windows import library's fixed, reproducible byte** — a build input for one platform's
linker, exporting the `napi_*` symbols and needing to equal no consumer's runtime (`build.rs:41`). **Every other
Node version number in this package's repository is addressed to its publisher or to that linker and not to you.**

---

## §12 · ★ Behaviours a client can BREAK — declared OUT OF SCOPE

**This chapter is the most valuable part of this guide, and it is not a list of bugs. It is the list of places
where the package's promises STOP — where a client who does something unusual gets a raw host error, a silent
wrong answer, or their own code back, and where the project has RULED that this is acceptable rather than
defended.**

**THE RULING BEHIND ALMOST ALL OF IT IS ONE SENTENCE, AND IT IS THE ARCHITECT'S** (`strata/decisions.md` `D-35`,
verbatim): *"The client will be able to break the JS code if they want to, the node_modules import is still in
client scope. Guard against parameter access and at the Rust boundary."* **So the package defends exactly two
things — what it reads off a value YOU supplied, and everything crossing into Rust — and nothing else about your
own realm is defended.** **Each entry below says what breaks, why it is out of scope with its ruling, and what to
do instead.**

### §12.1 Deleting or redefining `Array.prototype` members

**WHAT BREAKS:** the package reads arrays IT MINTED with the realm's own prototype methods, so **`delete
Array.prototype.slice` makes a LAWFUL `write` throw a RAW HOST `TypeError`** — **measured, and the measurement is
the ruling's: this guide did not re-take it** — and `Array.prototype.map`/`filter`/`includes` deletions do the same
at other sites. **The most exposed site is `written.triggered`**, the copy of the store's returned trigger set that
the commit path takes.
**WHY IT IS OUT OF SCOPE:** `D-36`, verbatim: *"Presume the client isn't going to vandalize Array.prototype"* —
the ~8 such sites are **not debts and are not fixed**, and the premise is the realm's: **the client will not
delete or redefine `Array.prototype`'s members.** **WHAT TO DO INSTEAD:** do not patch `Array.prototype` in a
process that holds a store. **The distinction the ruling draws is provenance — a value YOU supplied is read by
own-property forms and crossed as a null-prototype node; a value the package minted is read with the realm's
methods, which is ordinary JavaScript** (`D-36`; `bindings/js/src/entry/kernel-commit.mjs`, the `written.triggered`
copy).

### §12.2 Detaching or rebinding a store member

**⟶ CORRECTED 2026-10-26, AND THIS IS THE ONE ENTRY OF THIS CHAPTER WHOSE READING NO LONGER BINDS AT THE
DETACHMENT HALF: a detached call is now REFUSED. THE AS-FILED TEXT BELOW STANDS BYTE FOR BYTE AND IS READ
THROUGH THIS CLAUSE — `RCA-8(g)` ANNOTATE-BESIDE — so a client who quoted it is not left with a silent
reversal.**

**WHAT REPLACED IT, MEASURED ON THE FIXED TREE:** **every one of the fourteen members that CAN refuse a
detached call now refuses it in the ONE plain form** — `{status: 'AddressMalformed', message: "the receiver
position is not the store object this addon's storeCreate returned", log: []}` — **and moves no state**.
**The twelve that carry the receiver arm answer those exact bytes**: the seven store-reaching verbs (`read`,
`readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`), the four constraint members
(`addConstraint`, `removeConstraint`, `constraintOn`, `constraintOff`, which until this date ANSWERED — two
of them editing the store's pair registry — or threw the constraint methods' `TypeError`) and
`removeListener`. **`register` keeps its own domain refusal** (the handle-domain arm, `AddressMalformed`, its
own message) where the handle is not one the instance holds, **which is the arm the ruling keeps rather than
replaces**; a detached `register` whose handle the entry DOES hold still answers and still moves that entry,
because that member's re-install path hands the entry's own published receiver rather than the call's.
**`constraints()` still answers a detached read** — its arity is `0`, its own clause declares it *"THROWS
NOTHING"* (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)), and it performs no store call and changes
no node, so the state half of the promise holds at it and the refusal half has nothing to refuse.

**WHY IT IS NO LONGER OUT OF SCOPE:** the architect *"Run the fix by rejecting the detached functions."*
**The detached call is not defended because your realm is yours — it is refused because the ANSWER it was
giving was a state edit against a store the call had already lost: `constraints()` read what a detached
`addConstraint` had carried, and a bound write at that address evaluated a function nobody had lawfully
registered. A refusal is what the seven verbs had always answered; the four outliers were the defect.**

**WHAT BREAKS:** **`const { read } = store; read(['x'])` resolves NO receiver.** **Measured 2026-10-26:** the seven
store-reaching verbs (`read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`) answer the one
declared refusal — `{status: 'AddressMalformed', message: "the receiver position is not the store object this
addon's storeCreate returned", log: []}`; `register` and `removeListener` answer their own domain refusals in the
same form; **and three members do NOT refuse for the detachment at all** — detached `addConstraint` and
`removeConstraint` **ANSWERED and edited the real store's pair registry**, detached `constraints()` **answered it**,
and the detached toggles threw the constraint methods' `TypeError`. **A REBOUND member is worse: `store.read = fn`
succeeds — the `read` member's own descriptor reads `writable: true, enumerable: true, configurable: true` — the
call answers your own function, and the package raises nothing and prints nothing** (measured 2026-10-26:
descriptor, call and console all read).
**WHY IT IS OUT OF SCOPE:** `D-35` — a member is an own property of an object in your own realm, and the package
defends parameter access and the Rust boundary, not the mutability of its own product. **WHAT TO DO INSTEAD:**
**always call a member on the receiver — never destructure one, never pass one as a callback, and never assign to
one.** **And do not rely on the detachment being detected:** for three of the fourteen it is not detected at all,
and for two more the answer is the constraint methods' `TypeError` rather than the one form.
**⟶ AND THE REBOUND HALF IS UNMOVED AND IS STILL OUT OF SCOPE** (`D-35`, `D-36`): `store.read = fn` still succeeds,
still answers your own function, and the package still raises nothing — **rebinding is client scope and is not
detected, before this correction and after it.** **The detachment half is what moved: do not rely on a detached
call being DETECTED as a call at all — it is refused before it reads or edits anything, which is the answer that
keeps `constraints()` and the store's own home entry exactly as they stood.**

**⟶ AND WHAT IS TRUE AFTER THE DETACHED-CALL REJECTION, IN ONE QUOTABLE LINE — THE ENTRY'S OWN SUMMARY, ADDED
BECAUSE THE AS-FILED TEXT BESIDE IT STILL READS AS THE OLD WORLD** (`RCA-8(g)` ANNOTATE-BESIDE; nothing above is
withdrawn): **DETACHING IS REFUSED; REBINDING IS THE CLIENT'S OWN FUNCTION AND IS STILL UNDETECTED.** **Detaching —
`const { read } = store; read(['x'])` — answers `{status: 'AddressMalformed', message: "the receiver position is not
the store object this addon's storeCreate returned", log: []}` at every member that can refuse it, and moves no
state; `register` keeps its own domain refusal and `constraints()` answers, because it takes no argument, makes no
store call and changes no node.** **Rebinding — `store.read = fn` — succeeds, answers YOUR function, and is still
undetected: it is client scope by `D-35`, and it is the half of this entry that remains OUT OF SCOPE.**

### §12.3 Freezing or sealing a store

**WHAT BREAKS:** `Object.freeze(store)` **before** the store's first kernel act, then a lawful `write` or
`addConstraint`, throws a **raw host `TypeError`** — *"Cannot define property `Symbol(provident-storeroom.kernel)`,
object is not extensible"* — **with `status` absent, not one of the seventeen, and not the one form.** **It is
ORDER-DEPENDENT:** freeze *after* any kernel act and the same write succeeds. **WHY IT IS OUT OF SCOPE:** `D-35`
classifies it as client-scope breakage, not a defect — **the ruling declines the fix and accepts the form**:
*"a raw host `TypeError` where a lawful call used to answer is still worth a note, not a fix."* **WHAT TO DO
INSTEAD:** **do not freeze or seal a store.** If you need an immutable handle, wrap it — a plain object holding
the instance and closing over it, never the instance itself.

**⟶ AND THE SET SIZE THIS ENTRY PRINTS IS CORRECTED AT THIS DATE: it is NINETEEN, not seventeen** (§8.1; the algebra
`11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓; `RCA-8(g)` ANNOTATE-BESIDE — the sentence above stands and is read THROUGH
this one). **THE ENTRY'S OWN POINT IS UNMOVED AND IS SHARPER AT NINETEEN: a raw host `TypeError` carries NO `status`
member at all, so it is not any member of the closed set, whatever the set's size — and a consumer who reads a
caught value by its `status` will find none here (§8.3).**

**⟶ AND THAT CORRECTED SIZE IS ITSELF RE-READ: the set is TWENTY, not nineteen** (§8.1's heading and its table's `20` row; the algebra `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓; `RCA-8(g)` ANNOTATE-BESIDE — the correction above stands and is read THROUGH this one). **THE ENTRY'S OWN POINT IS UNMOVED AND SHARPER AT TWENTY: a raw host `TypeError` carries NO `status` member at all, so it is not any member of the closed set, WHATEVER THE SET'S SIZE — and a consumer who reads a caught value by its `status` will find none here (§8.3).**

### §12.4 Reaching the kernel record on the store

**WHAT BREAKS:** **the kernel's record is an own symbol-keyed property of the store and it is MUTABLE.**
`Object.getOwnPropertySymbols(store)` yields the slot, and the record carries `pairs`, `handles`, `live`, `closed`
and `store`. **`store[SYM].pairs.clear()` makes an ARMED constraint stop refusing — the value lands — while
`constraints()` still reports the pair.** **WHY IT IS OUT OF SCOPE:** `D-35` — it is your own realm and your own
object; the ruling stands `cdd2467` and declines the revert that would have re-privatised the record. **WHAT TO DO
INSTEAD:** **treat the symbol slot as private.** Do not enumerate a store's symbols, do not write to one, and do
not read a store's internals to reconstruct state — **`read(address)` and `constraints()` are the routes, and a
constraint's enforcement is not yours to toggle by hand.**

### §12.5 Prototype forgery on a registered symbol

**WHAT BREAKS:** **a getter at `Object.prototype[Symbol.for('provident-storeroom.kernel')]` supplies ONE record to
EVERY store in the process** — measured in the record at `D-35`: `a[SYM] === b[SYM]` with a shared `attempts`
counter of `2` after one write each. **The key is guessable because `Symbol.for` is a REGISTERED symbol, and the
store's own read of the slot walks the prototype chain.** **WHY IT IS OUT OF SCOPE:** `D-35`'s third vector of the
same client-scope class — **a getter you install on a prototype in your own realm is your own act, and own-property
discipline cannot help a READ.** **WHAT TO DO INSTEAD:** **do not install anything on `Object.prototype` or
`Array.prototype` in a process that holds a store** — and if a dependency does, that is the dependency's defect
reaching your store, not the store's.

### §12.6 Values you read back inherit your realm's prototypes

**WHAT BREAKS:** **the values the crate mints on the way out carry the realm's `Object.prototype`** (and
`Array.prototype` for arrays), so **a client's own prototype pollution APPEARS on what it reads back** — a
`store.read()` answer inherits any member you have added to `Object.prototype`. **WHY IT IS OUT OF SCOPE:** the
contract **does not pin the copy-out's prototype at all**: *"the contract pins the tree and not the allocation"*,
and **no cell may assert a prototype identity on the copy-out, in either direction**
(`docs/specs/storeroom-json-crossing/contract.md §5`'s 2026-10-24 clause, on `F-RA-15`; the same clause's ground is
`D-35`'s client-scope line). **WHAT TO DO INSTEAD:** **do not pollute `Object.prototype`** — and **do not assert
that a read-back's prototype is or is not a particular object.** **What IS declared is that the answer is a FRESH
tree sharing no mutable member with the store or with another crossing**, which is the guarantee worth relying on
(`json-crossing/contract.md §5`, item (3)(c)).

### §12.6b The two known fail-states, and how you leave them

**⟶ ADDED `1.1.0` — THIS IS THE ONE PART OF THE PROMISE A CONSUMER READING ONLY `node_modules` HAD NOWHERE TO FIND, AND IT SHIPS HERE BECAUSE THIS DOCUMENT SHIPS.**

**Two windows in the constraint machinery are known and are NOT defects. Each is a state you can leave.**

1. **A `delete`'s listener delivery.** A listener invoked by a delete's delivery runs **no constraint pass** — there is no attempt for a pass to run over. **A `rollback` issued from inside it is unjudged, and its effect stands.**
2. **A registration's own evaluation.** `addConstraint`'s and `constraintRegister`'s evaluation of a supplied body runs **no pass** for the same reason — **an action raised there is unjudged and its effect stands.**

**THE FIRST EXIT — RELOAD THE FILE.** Since `1.1.0`, **a restore that moved a version standing at the `file` tier SAVES the restored image**, so **the file records the state the store was restored to, and a fresh boot over that path returns to judged bytes.**

**THE SECOND EXIT — REGENERATE THE STORE.** Construct a new instance and replay your writes; **a judged state by construction.**

**Neither window is new and neither is a defect**: both are places **a pass does not begin**, not places a judgement was skipped mid-flight. **And every pass that DOES run drains its own restart request** — so the fail-state is bounded by the two acts that run none.

### §12.7 A skip is not a green, and your own throws are not refusals

**WHAT BREAKS:** **a `skipped` cell is a cell that DID NOT RUN** — *"a skip is not a green"*, in the authority
log's own words: *"`skipped 1` is a cell that did not run"* (`strata/decisions.md`, the examiner's findings) —
**and a client's own throw is not the package's form.** **A listener body that throws is NOT CAUGHT, NOT RETRIED
AND NOT REPORTED:** the package does not wrap your callback, and what escapes is your own throwable, not
`{status, message, log}` (`docs/specs/storeroom-js/surface.md §2.7` item 4). **WHY IT IS OUT OF SCOPE:** `D-35` —
**anything that enters the package from your side and leaves it is your shape, and the one thrown form is the
package's answer to its OWN refusals.** **WHAT TO DO INSTEAD:** **catch inside your listener if you want a
listener's failure to be yours**, and **never count a skipped test as a passed one** — and never treat a caught
value with no `status` as a store refusal (§8.3).

---

## §13 · What this guide does not cover

**Stated rather than left to be inferred, because a guide that hides its own edges is the next thing to fail
quietly.**

- **IT DOES NOT COVER ELECTRON, AND THE STORY IT DOES NOT TELL IS NOT ABSENT FROM THE REPOSITORY.** The Electron
  integration story — main-process-only execution, a data-only preload bridge, `asarUnpack` for `**/*.node`, code
  signing, a `filePath` under `app.getPath('userData')`, and the verification ladder *envelope* → *loaded in dev*
  → *loaded in the packaged app* → *installed from the registry* — lives in the archived
  `archive/pre-strata-docs-2026-10-24/docs/guides/electron-integration.md`. **It describes a superseded surface
  exactly as this guide's predecessor does, and §2.3's rungs and §11's manifest facts are what it predates.** **A
  consumer who has not measured their own Electron packaging has measured nothing about it** — `LIVE / INSTALL` is
  open in this project and the `APP` layer is `NONE` (`strata/brief.md §6`).
- **IT DOES NOT COVER THE RELEASED-BYTES LAYER.** Nothing here was driven against a published tarball, and the
  layer that would do it — an install-shaped battery — is declared and not the thing this file reports on.
  **`D-4`'s publish shape is evidence-derived, and the evidence is not this guide's.**
- **IT DOES NOT DESCRIBE AN APPLICATION.** It says nothing about how you should structure a store, what your
  schema should be, or whether any program works. It describes the package a consumer installs and what it
  answers.
- **IT DOES NOT SETTLE THE TIER-EVICTION QUESTION AS A SEMANTIC CLAIM.** §5.1 states the rule and what to rely on;
  whether declared semantics and shipped behaviour agree at every arm and every tier combination is a question
  for the clauses and not a consumer guide's.
- **IT DOES NOT REPORT THE `A112` ORDERING MEASUREMENT.** The law is that the surface runs the triggered
  constraints first and the other listeners only once every constraint has passed, and §9.2 states it as the law
  (`surface.md §2.11`). **Whether delivery now follows the pass is `OWED` a measurement on this branch and is not
  claimed here either way** (`strata/decisions.md` `D-1-bis`'s closing clause; `strata/brief.md §6`).
- **IT DOES NOT RE-DERIVE ANY FIGURE IT CITES.** Where a contract's own text and its later annotate-beside clauses
  print two readings, this guide cites the operative one and names the superseded one where a consumer would
  otherwise be misled — **and where it cites an archived file, it says so.**
- **AND IT STATES NO MEASUREMENT OF ITS OWN beyond the two of 2026-10-26 this file names.** **It is a consumer
  document, not a test report:** the declared documents are the instrument for questions of semantics, and a
  driven run is the instrument for questions of behaviour. **This guide tries to say which is which, and it is not
  the instrument that decides between them.**
