# `provident-storeroom` — the published Node ESM binding for the native Rust store

**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`A70`, `package.md §1.1`): a consumer `import`s
this package as an ES module from a Node runtime whose ABI carries a Node-API addon. **Every other realm is
UNCLAIMED and each owes its declared answer** (`package.md §2`: Node CJS, Electron `main`, Electron
`preload`, Electron `renderer`, the browser, `worker_threads` and any IPC route). **No other realm is
described here as supported.**

**THE LICENCE OF RECORD IS `AGPL-3.0`** (`DD-43`). It is the repository's own `LICENSE` and no clause of
this unit changes it. **AND THE LICENCE COPY TRAVELS WITH EVERY ARTEFACT, THIS PACKAGE'S OWN INCLUDED**:
each of the SIX artefacts — this package and the five platform packages — carries a copy of the
repository's own `LICENSE` as the licence TEXT travelling with it, copied BYTE-FOR-BYTE at the release's
own assembly step (`docs/specs/storeroom-publish/contract.md §2.3` item 2; `distribution.md §4.2` item 1 and
`§4.3` item 2; `PUB-DD-11`; `Q3-5`). **WHAT IS REFUSED IS A SECOND, DRIFTING COPY INSIDE THE TREE**: no
`LICENSE` byte is written under `bindings/js/` (`§2.3` item 4; `distribution.md §4.3` item 1), so the copy
is an ARTEFACT-LEVEL fact and not a crate-level file, and this package's `files` allowlist names it
nowhere — the allowlist is the three entries `§2.1` item 1 fixes and NOTHING ELSE (`Q3-2`). **AND THE COPY
IS NOT A FIFTH DECLARATION SITE** (`distribution.md §4.2` item 3): the four sites are AUTHORED
DECLARATIONS ABOUT the licence, while a tarball's own copy is the licence's text travelling with an
artefact — so the count of SITES stays four and the count of artefacts CARRYING A NOTICE is six.

## The one entry

```js
import { storeCreate } from 'provident-storeroom';
```

**⟶ AND THIS BLOCK'S SUPERSEDED FORM IS NAMED SO IT IS NOT READ AS THE ENTRY: it once printed
`import { storeCreate, read, readLiteral, write, delete as remove, rollback, listen, unlisten }` — EIGHT module
names, seven of which are no longer exports at all. THE MODULE NAMESPACE IS ONE NAME**, and the seven that left it
are the instance's own methods, `delete` among them spelled `a.delete(address, tier?)` on the receiver (the
`delete as remove` binding was the MODULE-side workaround for a reserved word and is not the consumer spelling).
**These are the `0.2.0`-era names; the `8 → 1` is `A127`'s** (`surface.md §2.9` item 1's `A127` clause;
`docs/guides/package-use.md` `§1.1-bis`).

**The `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one** (`package.md §1.3`, `DD-24`):
there is no wildcard export, no deep import to the addon and no CJS arm. **The addon is reached INTERNALLY
by the package's own `createRequire`-style step and is not an entry point**: a consumer that spells the
addon's path directly is outside every clause of this contract.

## The surface

**ONE module name — `storeCreate` — and NOTHING ELSE** (`surface.md §2.9` item 1's `A127` clause; the namespace's
`8 → 1`), **plus the instance `storeCreate` returned — whose own member set is the TWELVE the table below prints,
`10 + 1 + 1 = 12` ✓** (`surface.md §2.4` item 9 (f)'s `A127` clause; the member set's `4 → 12`).

**⟶ WITHDRAWN 2026-10-17 — THE SENTENCE THIS ONE REPLACES READ *"The eight verbs of `surface.md §2` and NOTHING
ELSE"*, plus an instance whose own member set was *"the FOUR the dated clause below prints"*: BOTH FIGURES ARE THE
`0.2.0`-ERA READING AND NEITHER DESCRIBES A SURFACE THAT EXISTS. The operative figures are the ONE module name and
the TWELVE own members above, whose home is `docs/guides/package-use.md` `§1.1-bis`.**

**AND THE LEADING `instance` POSITION IS DROPPED AT EVERY METHOD** (`surface.md §2.1` (e) item 3's one-spelling
and receiver rule): **the receiver IS the store, so `a.write(address, tier, value, commit?)` is the shape every
method takes and an `instance` passed first is a SUPERSEDED SPELLING — wrong, not redundant.**

| The member | Its answer |
| --- | --- |
| `storeCreate(cfg)` | the package's own instance handle — `cfg` carries the store's four declared keys and no fifth; the four are `filePath` · `journalLength` · `listeners` · `constraints`, and `listeners` is an ARRAY |
| `read(address, tier?)` | a leaf's literal, a branch's assembled value, the empty address's whole register |
| `readLiteral(address, tier?)` | the same, narrowed to a leaf (`ReadTargetIsBranch` on a branch) |
| `write(address, tier, value, commit?)` | `{op, watched, triggered}` — the fifth argument OPTIONAL and declared LAST; its absence is in domain |
| `delete(address, tier?)` | `{address, tiers, triggered}` |
| `rollback(opId)` | `{opId, undoneOps, restoredTo}` |
| `listen(address)` | a fresh opaque handle — the registration route is `listen` **then** `register` |
| `unlisten(handle)` | `undefined` — the withdrawal: the store-side removal AND this package's own registry removal; a no-op success for every value outside the domain |
| `addConstraint(pair, constraint)` | the constraint's identity — the ADD route, which CARRIES the function and OVERWRITES if the id already exists |
| `constraintOn(pair, constraint)` | `undefined` — ENABLE; idempotent, and it throws at a pair the store does not carry |
| `constraintOff(pair, constraint)` | `undefined` — DISABLE; idempotent, and it throws at a pair the store does not carry |
| `register(handle, listener)` | `undefined`; a non-function listener or a handle this instance never minted throws a `TypeError` |
| `settle(record)` | `undefined` — the ordering seam: the one member THE KERNEL CALLS, and the arm that performs the `file`-tier save |

**⟶ AND THE `on` AND `off` ROWS THIS TABLE ONCE CARRIED ARE WITHDRAWN, NOT MOVED AND NOT COUNTED: both members
were MERGED AWAY** (`surface.md §2.4` item 9 (e) items 2 and 3; `A127`). **`on(address, listener)` was a SECOND
SPELLING of `listen` then `register`, and both admissions are now methods, so the pair of calls `a.listen(address)`
then `a.register(handle, listener)` carries its whole subject; `off(handle)`'s withdrawal IS `a.unlisten(handle)`'s,
and the registry entry's own standing is `unlisten`'s rule, not a call.** **`on` and `off` are therefore NOT
members of the product and NOTHING above declares them as one** — the listener pair the guide at `§1.1-bis` calls
`on`/`off`-shaped is the CONSTRAINT toggles, which are `constraintOn`/`constraintOff` and a DIFFERENT subject.

**AND A `tier` IS OPTIONAL BY OMISSION ALONE: a SUPPLIED `undefined` tier is a PRESENT value and takes the
`AddressMalformed` refusal, while only the call that supplies nothing there — `a.read(address)` — folds to the
absent tier** (`parameter-semantics.md §2.6`'s `PAR-JS-6`, its in-writing adjudication of 2026-10-16).

**⟶ AMENDED 2026-10-15 — THE TABLE ABOVE IS READ AT THE FOUR-KEY CONSTRUCTION AND THE
WRITE'S FIFTH ARGUMENT** (`surface.md §2.1`'s dated clause of 2026-10-15 and its `cfg` block; `§2.2`'s dated
clause of the same date and its clause 4; `§2.11`; `parameter-semantics.md §2.20` = `PAR-JS-20` and `§2.21` =
`PAR-JS-21`; `docs/decisions.md` · `A116`). **THE CELLS IT RE-SPELLS, EACH NAMED BY ITS OWN WORDS: the
cells above are ALREADY RE-SPELLED IN PLACE, so the table stands in its OPERATIVE form and the as-filed wording
is the one NAMED here — *"the store's three declared keys and no fourth"* READS *"the store's four declared keys
and no fifth"*; *"plus the one member of the object `storeCreate` returned"* READS *"plus the instance
`storeCreate` returned — whose own member set is the TWELVE printed above"*; and the `write` cell's
*"`write(instance, address, tier, value)`"* READS *"`write(address, tier, value, commit?)`"*.**
**⟶ AND THE *"FOURTH OWN MEMBER"* THIS CLAUSE WAS FILED WITH, AND ITS *"whose own member set is the FOUR printed
above"*, ARE BOTH WITHDRAWN 2026-10-17 AND ARE READ AT THE TWELVE, `10 + 1 + 1 = 12` ✓** — the `A116`/`0.2.0`
member figure this pass supersedes (`surface.md §2.4` item 9 (f)'s `A127` clause; `A127`), **and the
`instance` FIRST POSITION the as-filed `write` spelling carries is DROPPED with it** (`§2.1` (e) item 3).

1. **THE FOUR DECLARED KEYS, AND NO FIFTH.** **They are `filePath` · `journalLength` · `listeners` ·
   `constraints` — `4` — each passed through WITHOUT a default, a rename or a key of the package's own, and
   the declared arity is `4`.** **THE FOURTH IS `constraints`, OPTIONAL AND ABSENT-IN-DOMAIN like `filePath`:
   it is the APPLICATION'S OWN constraint list, supplied at startup — and THE LIST IS NOT PERSISTED, so the
   store writes no byte of it into the file and holds no register key for it, while at a boot over an existing
   file the LOADED STATE is validated against the supplied list.** **AND A CALLER-SUPPLIED KEY BEYOND THE FOUR
   IS IGNORED AND PRODUCES NO CODE** — *"no fifth"* is a constraint on the PACKAGE's own passing and never a
   refusal of the caller's extra key (`parameter-semantics.md §2.21`; `docs/specs/storeroom-native/contract.md
   §7.1`).
2. **THE INSTANCE'S OWN MEMBERS ARE TWELVE: `{ read, readLiteral, write, delete, rollback, listen, unlisten,
   addConstraint, constraintOn, constraintOff, register, settle }`, AND NOTHING ELSE** — `10 + 1 + 1 = 12` ✓
   (`surface.md §2.4` item 9 (f)'s `A127` clause of 2026-10-16). **`register` is the registration site, reached
   after `listen`; the withdrawal is `unlisten`; the listener pair `on`/`off` is MERGED AWAY and is no member of
   this set; and `settle(record) -> undefined` is THE ORDERING SEAM the kernel calls at the two instants of a
   kernel-driven write** (`surface.md §2.4` item 9 (e) items 1–3; `§2.4` item 9 (f); `A127`). **AND NO RELEASE VERB
   IS ONE OF THEM** — none of the twelve releases the instance. **⟶ WITHDRAWN 2026-10-17: THIS CLAUSE ONCE READ
   *"THE INSTANCE'S OWN MEMBERS ARE FOUR: `{ register, on, off, settle }`, AND NOTHING ELSE"* — the `A116`/`0.2.0`
   figure, superseded in BOTH of its halves, the set's `4 → 12` and the `on`/`off` merge; the operative figure is
   the TWELVE above and its home is `docs/guides/package-use.md` `§1.1-bis`.**
3. **THE WRITE'S DECLARED ARITY IS `4` REQUIRED ARGUMENTS WITH A FIFTH OPTIONAL `commit`, DECLARED LAST**, and
   the declaration governs over the flow's own order: the `commit` is the kernel's own `{ attempt, op,
   triggered, pending }` record — `K-2 commit`'s return — and **AN ABSENT `commit` IS IN DOMAIN**, because the
   write opens or joins a commit all the same (`surface.md §2.2` clause 1). **THE PACKAGE READS THE CALL'S
   ARGUMENT COUNT AT THE FIFTH POSITION AND NOWHERE ELSE** (`§2.2` clause 4): the position ABSENT proceeds, and
   a SUPPLIED `undefined` at the position — or any other form outside the admitted one — is REFUSED, so no
   verb is reached and no byte moves. **AND NO OTHER POSITION OF ANY VERB GAINS AN ARITY READ, A DEFAULT OR A
   SUBSTITUTED ARGUMENT.**
4. **THE VERB PERFORMS NO FILE I/O ON ANY OF ITS ARMS** (`§2.11` clause 2): the durable `file`-tier save is the
   instance's `settle` member's own act at THE TERMINAL ARM of a kernel-driven pass and ON ITS PASSING ARM
   ALONE — constraints, then save, then the delivered listener bodies, the save first because no listener body
   runs before it — keyed by the `op` the settled record carries. **AND THE SAVE *IS* A CONSTRAINT, EVALUATED
   LAST: a FAILED SAVE IS AN UNREPAIRABLE CONSTRAINT VIOLATION** (`§2.11` clause 5). **WHERE THE SAVE'S ACT
   FAILS, THE STORE ROLLS THE WRITE BACK AND THE CALLER RECEIVES THE FAILURE AFTER IT AND NEVER THE
   ROLLED-BACK STATE**, and the package compensates for nothing (`§2.11` clauses 3 and 5).

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
compensates for nothing. **⟶ AMENDED 2026-10-15 — THE SECOND READING'S *"a `file`-tier `write` that fails"* IS
RE-SPELLED IN PLACE, BECAUSE THE VERB IS NO LONGER WHAT PERFORMS THE SAVE: it READS *"a `file`-tier save that
fails"* — the `settle` member's terminal-arm act of the clause above — the cell above standing in that
operative form** (`surface.md §2.8` item 2 and `§2.11` clause 5; `parameter-semantics.md
§2.19`; `A116` (D3)).

## How the addon is resolved — three rungs, and the covered/uncovered answer

**THE ENTRY RESOLVES ITS ARTEFACT IN THE DECLARED ORDER** (`docs/specs/storeroom-publish/resolution.md
§2`; `docs/specs/storeroom-publish/contract.md §1.1`):

1. **RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** The entry `require`s THE ONE NAME
   the closed key set declares for the `process.platform` × `process.arch` pair, and no other name. The
   five declared names are

   **`@auspicion/provident-storeroom-js-linux-x64-gnu`** · **`@auspicion/provident-storeroom-js-linux-arm64-gnu`** ·
   **`@auspicion/provident-storeroom-js-darwin-x64`** · **`@auspicion/provident-storeroom-js-darwin-arm64`** ·
   **`@auspicion/provident-storeroom-js-win32-x64-msvc`**

   — five names, three of them carrying a toolchain suffix (`-gnu` twice, `-msvc` once) and two carrying
   none. **The name is SELECTED from this table and is never built by concatenating tokens**, so no sixth
   name is computed. These five are the registry's own per-target optional dependencies, and this
   package's `optionalDependencies` pins each of them at this package's own version, exactly.

2. **RUNG TWO — THE MODULE-RELATIVE ADDON.** Failing rung one, the entry `require`s
   `build/Release/storeroom_js_binding.node` beside the entry module, constructed from the entry module's
   own location and from no other source — no environment variable, no configuration key, no path
   relative to the working directory and no search of a parent directory.

3. **RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** Failing rung two, the load path answers the single
   failure form, and no instance is returned.

**IN A PUBLISHED INSTALL, RUNG ONE IS THE RUNG THAT FIRES**, because rung two's path is the checkout's
own and a `files`-restricted tarball does not carry it — **no binary ships IN THIS PACKAGE'S OWN TARBALL,
at any key, on any target** (`§2.1` item 1; `Q3-2`). **AND THE FIVE PLATFORM ARTEFACTS EACH CARRY THEIR OWN
TARGET'S BINARY**: each one's allowlist names the `.node` beside its manifest, which is what gives rung one
a declared source to load at that key at all (`PAR-PUB-21`; `distribution.md §3.2` item 5). **RUNG TWO IS
THE CHECKOUT-ONLY RUNG**: it is the in-place developer loop and every battery that exists today, and
building it is a step of a checkout rather than of an install:

```sh
cargo build --release --manifest-path bindings/js/Cargo.toml
mkdir -p bindings/js/build/Release
cp target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
```

**No binary is ever committed** (`package.md §3.2`): `build/` and `target/` are ignored, and the artefacts
are built and published, never stored in the tree. **The prebuild matrix is five targets** (`linux-x64`,
`linux-arm64`, `darwin-x64`, `darwin-arm64`, `win32-x64`), built one runner per target by the release's own
workflow, `/.github/workflows/publish.yml`. The Node-API version this addon is built against is the sibling
crate's own build target and is not a JS-side floor of this package's own (`package.md §1.4`).

**AND THE UNCOVERED-TARGET ANSWER IS A DECLARED LIMITATION, WITH ITS CONSEQUENCE STATED RATHER THAN
DISCOVERED** (`docs/specs/storeroom-publish/contract.md §2.1` item 3; `docs/specs/storeroom-publish/
distribution.md §2.2`; `PUB-DD-1`, `PUB-DD-2`):

* **A CONSUMER WHOSE `process.platform` × `process.arch` PAIR IS NOT ONE OF THE FIVE COVERED KEYS GETS NO
  BINARY.** Rung one is not attempted at all for that pair — no name exists for it — so the load path
  falls to rung two, which a published install does not carry, and the uncovered consumer therefore meets
  the declared absent-addon form.
* **THEY GET NO BUILDABLE ROUTE FROM THE TARBALL EITHER: no `build.rs`, no `Cargo.toml`, no `src/**` and
  no `postinstall` build-on-install step is shipped.** The store crate's source is deliberately outside
  this package's allowlist, whose whole content is `index.mjs` · `README.md` · `index.d.ts`.
* **THEIR ONLY ROUTE IS TO BUILD THE STORE CRATE FROM ITS SOURCE THEMSELVES.** This is a LIMITATION and
  not a promise: no clause of this package claims that an uncovered consumer's route is supported, tested
  or witnessed. **A covered consumer needs NO Rust toolchain; an uncovered consumer needs one.**
* **AND THE DECLARED ANSWER TO A COVERED KEY WHOSE C LIBRARY DIFFERS FROM ITS ARTEFACT'S IS THE SAME
  ONE**: the `os` and `cpu` fields carry an operating system and an architecture and cannot express a C
  library, so no C library is read, detected or measured anywhere on this load path, and a state that
  follows from that is a state the load path reaches rather than a key of its own.

## Tests

```sh
cargo test  --manifest-path tests/Cargo.toml -p storeroom-tests --no-fail-fast   # THE BATTERY'S LEG — this crate's six Rust targets, 235 cells
npm test   # THE REPOSITORY'S JS BATTERY — a REPOSITORY instruction, NOT a consumer one; see the note below
```

**AND THE ORDER IS A DECLARED STEP, NOT A CONVENIENCE: THE JS LEG RUNS ONLY AFTER THE ADDON IS BUILT**
(`docs/specs/storeroom-js-proposal.md §17` · `A75`: *"the JS leg of the acceptance layer acquires A BUILD
STEP (a `.node` must exist for those cells)"*). **The JS cells drive the package through its CLAIMED ESM
ENTRY and never the `.node` addon directly** (`acceptance.md §4.1` item 1, `DD-18`), so the entry's own
route — `JS -> facade -> core -> store` — is what they exercise, and that route needs the artefact the
`Building the addon` section above produces:

```sh
# 1. THE BUILD STEP, AT THE REPOSITORY ROOT, BEFORE ANY JS CELL RUNS:
cargo build --release --manifest-path bindings/js/Cargo.toml
mkdir -p bindings/js/build/Release
cp target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
# 2. THE JS LEG, AFTER IT — the repository's own battery, from the REPOSITORY ROOT:
npm test
```

**AND THE THREE RUST LEGS, EACH WITH THE COUNT IT CARRIES** (`D-34`: one workspace at the repository root,
`members = [".", "bindings/js", "tests"]`, `default-members = [".", "tests"]`; and the architect's `★ A`:
**THE LEGS ARE PACKAGE-SCOPED**). **THE THREE, AT THE REPOSITORY ROOT:**

```sh
cargo test --offline -p storeroom-native   # THE STORE'S LEG — 415 cells, 0 fail
cargo test -p storeroom-tests              # THE BATTERY'S LEG — 235 cells, 0 fail
cargo test                                 # BOTH OF THEM — 650 cells, 0 fail
```

**AND THE THIRD COMMAND IS NOT A FOURTH LEG: a bare `cargo test` runs `default-members = [".", "tests"]`, so
it is EXACTLY the store's `415` plus the battery's `235` — `415 + 235 = 650` ✓ — in one run.** The two `-p`
forms are what measures one crate's own red/green; the bare form is what a release runbook reaches for.
**`-p` IS NOT DECORATION ON THE BUILD SIDE EITHER:** the store's leg keeps `--offline`, and a workspace-root
`cargo build --offline` would pull this crate's `napi` crates and `--offline` would refuse them — which is
why the root manifest's `build` script names the store by package as well.

**AND WHAT NO LONGER RUNS ANYTHING IS NAMED HERE RATHER THAN LEFT TO BE DISCOVERED: `cargo test
--manifest-path bindings/js/Cargo.toml` USED to be this crate's Rust leg and NOW EXITS `0` HAVING RUN
NOTHING** (`tests 0 · pass 0 · fail 0`), because this crate's six test targets LEAVE `bindings/js/tests/` with
the stratification's move and a member carries no test targets of its own. **The leg is the battery's
command above, which reaches the same six targets through the package that hosts them.**

**AND THE JS COMMAND ABOVE IS A *REPOSITORY* INSTRUCTION, NOT A CONSUMER ONE — SAID PLAINLY BECAUSE THIS
FILE SHIPS INSIDE THE PACKAGE** (it is in the allowlist, `docs/specs/storeroom-publish/contract.md §2.1`
item 1). **`npm test` is the repository root manifest's own `test` script — `node --test
"tests/**/*.test.mjs"`, taken at the repository root — and THE ROOT MANIFEST IS NOT SHIPPED**: a consumer's
install carries `package.json` · `index.mjs` · `index.d.ts` · `README.md`, the entry's own modules and the
licence copy the release's assembly step lands, and **carries NO `tests/` directory at all**, so a consumer
cannot run this command and is promised nothing by it. **A consumer's own tests are the consumer's**; the
commands in this section are for a CHECKOUT of this repository. **AND THE COMMAND THAT STOOD HERE IS NAMED SO
ITS ABSENCE IS LEGIBLE RATHER THAN DISCOVERED: `node --test bindings/js/test/*.test.mjs` was this package's
own JS leg until the batteries were stratified into `tests/e2e/`, `tests/integration/` and `tests/unit/`, and
`bindings/js/test/` NO LONGER EXISTS — measured on this tree, the dead command exits `0` having run NOTHING
(`tests 0 · pass 0 · fail 0`), which is a VACUOUS GREEN rather than even a red, so a reader who kept it would
believe this package had been tested.**

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
crate's `rlib` half, so `cargo test --manifest-path tests/Cargo.toml -p storeroom-tests` is drivable with no
Node runtime present (`package.md §4.1` item 3, `§4.5` item 7).

---

**⟶ CORRECTED 2026-10-25 (`D-34`, `strata/decisions.md`; `RCA-8(d)` ANNOTATE-BESIDE: the superseded figure is
named once, here, and the clause stands at the file's end so that no line of the shipped text above it moves).**

**1. THE `cp` SOURCE IN THE `Building the addon` BLOCK, ABOVE, WAS `bindings/js/target/release/libstoreroom_js_binding.so`
AND IS `target/release/libstoreroom_js_binding.so`.** `D-34` made this crate a **member of the one workspace at the
repository root** (`members = [".", "bindings/js", "tests"]`), and **a member's target directory IS the workspace
root's**, so `bindings/js/target/` is no longer produced by any command this repository runs. **Nothing else in
that block moved**: the `cargo build` above it, the `mkdir -p` between them and the destination are the same
bytes. **The `Tests` section's step 1 already read `cp target/release/…` and did not need the correction** — the
two homes of the build form disagreed until this clause; they agree now.

**2. ONE SENTENCE ABOVE IS STALE AND IS LEFT AS TEXT BECAUSE ITS CORRECTION IS `delivery`'s, NOT THIS PASS's.**
The uncovered-target bullet reads *"this package's allowlist, whose whole content is `index.mjs` · `README.md` ·
`index.d.ts`"*. **The allowlist carries FIVE rows today** — those three plus **`src/entry/`** (the entry's
thirteen parts) and **`src/constraint-kernel.mjs`** (the barrel), measured at `bindings/js/package.json` — because
the entry now imports its parts by path and a tarball carrying the hub alone cannot load (`D-13`, `D-14`). **The
sentence's SUBJECT survives**: the Rust store crate's own `src/**` is still outside the allowlist and an
uncovered consumer still needs a Rust toolchain. **Its parenthetical figure does not**, and it is named here
rather than edited, because the shipped manifest's own description is `delivery`'s declaration and a documentation
pass does not amend a manifest's prose in the manifest's own voice.

