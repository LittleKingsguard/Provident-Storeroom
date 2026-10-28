# `provident-storeroom` — the published Node ESM binding for the native Rust store

**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`A70`, `package.md §1.1`): you `import` this package
as an ES module from a Node runtime whose ABI carries a Node-API addon. **Every other realm is UNCLAIMED and
each owes its declared answer** (`package.md §2`: Node CJS, Electron `main`, `preload` and `renderer`, the
browser, `worker_threads` and any IPC route). **No other realm is described here as supported.**

**THE LICENCE OF RECORD IS `AGPL-3.0`** (`DD-43`): it is the repository's own `LICENSE`, and no clause of this
package changes it. **AND THE LICENCE COPY TRAVELS WITH EVERY ARTEFACT, THIS PACKAGE'S OWN INCLUDED: each of
the SIX artefacts — this package and the five platform packages — carries a copy of the repository's own
`LICENSE` as the licence TEXT travelling with it, copied BYTE-FOR-BYTE at the release's own assembly step**
(`docs/specs/storeroom-publish/contract.md §2.3` item 2; `distribution.md §4.3` item 2; `PUB-DD-11`; `Q3-5`).
**The copy is an ARTEFACT-LEVEL fact and not a crate-level file**: no `LICENSE` byte is written under
`bindings/js/` (`§2.3` item 4), the manifest's `files` allowlist names no `LICENSE` row, and **a tarball's own
copy is not a fifth declaration site** — four AUTHORED sites stay four, while six artefacts CARRY a notice.

**★ AND THIS FILE IS THE SHIPPED HALF OF A TWO-PART STORY: the long-form consumer guide — every member, every
refusal, every file-tier reading and the measured behaviour behind each — **TRAVELS WITH THIS PACKAGE at
`README.guide.md`, beside this file**, so an installed copy reads it at
`node_modules/provident-storeroom/README.guide.md`.** **IT REACHES THE TARBALL BY THE RELEASE'S OWN ASSEMBLY
STEP**: that step copies its one authored home, `docs/guides/package-use.md`, byte-for-byte to this package's
root as `README.guide.md` — the same mechanism that lands the `LICENSE` copy, and not a `files` row pointing
outside the package root (npm omits such a row SILENTLY, which is the one hazard worse than a missing
document) — and the manifest's `files` allowlist names the landed copy, so the text ships. **THE CANONICAL
TEXT IS `docs/guides/package-use.md` AND IS NEVER EDITED IN TWO PLACES: `README.guide.md` is a generated
landing, and the release runbook's preflight (`scripts/publish.sh`) refuses when the two differ
byte-for-byte.** The same guide is readable in this
package's repository at
`https://github.com/LittleKingsguard/Provident-Storeroom/blob/main/docs/guides/package-use.md`, which is where
an edit belongs.

**⟶ AND THE ONE FIGURE THIS PAGE CAN BE RIGHT ABOUT IS GENERATED AND ASSERTED, 2026-10-28 — `DEF-AC`'s third part, and `D-57`'s one surviving figure.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause above stands BYTE-FOR-BYTE and is read THROUGH this one; nothing above moves.** **THE DEFECT THIS CLOSES: THIS PAGE DECLARED NO VERSION AT ALL** — a shipped document a consumer reads first, saying nothing about which release it describes — **so `scripts/publish.sh --figures` now GENERATES the line below from `bindings/js/package.json`'s `version` and REFUSES when it disagrees, exactly as it does at the guide's and the change list's own marked lines: three shipped documents, three version lines, one generator, one assertion.** **AND THE CUT-STATE IS NOT STATED HERE, OR ANYWHERE ELSE IN THIS PACKAGE'S DOCUMENTS** (`D-57`, the architect verbatim: *"Drop the cut-state"*): a document is sealed before the tag that would make its cut-state true, so **the cut-state is not a document's to state**; the record of what has been cut is the change list's, and it is past tense. **EVERY OTHER CLAIM OF THIS PAGE STANDS EXACTLY AS IT STOOD.**

PUBLISH-README-VERSION-LINE: THE VERSION THIS README DESCRIBES IS `1.5.0`.

## The one entry

```js
import { storeCreate } from 'provident-storeroom';
```

**That is the whole module namespace: ONE name, `storeCreate`** (`surface.md §2.9` item 1's `A127` clause; the
namespace's `8 → 1`). There is no module-level `read`, `write`, `listen` or any other verb — every other name
you will use is a method of the instance `storeCreate` returns.

**The `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one** (`package.md §1.3`, `DD-24`),
and its whole content is: no wildcard export, no deep import to the addon and no CJS arm. **The addon is
reached INTERNALLY by the package's own resolution step and is not an entry point.**

## The surface

**`storeCreate(cfg)` answers an instance carrying exactly FOURTEEN own members** — `10 + 1 + 1 + 2 = 14` ✓ —
**and they are these fourteen and no others** (`bindings/js/index.d.ts`, `StoreInstance`;
`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9):

| The member | Its answer |
| --- | --- |
| `read(address, tier?)` | a leaf's literal, a branch's assembled value, or the empty address's whole register |
| `readLiteral(address, tier?)` | the same, narrowed to a leaf (`ReadTargetIsBranch` on a branch) |
| `write(address, tier, value, commit?)` | `{op, watched, triggered}` — **four positions, `commit` the fourth and optional** |
| `delete(address, tier?)` | `{address, op, tiers, triggered}`, plus a non-enumerable `discarded` witness |
| `rollback(opId)` | `{opId, undoneOps, restoredTo}` |
| `listen(handle, addresses)` | **the handle it watches under** (`Handle`) — **you spell it**, and position `2` is a SET |
| `unlisten(handle)` | `undefined` — the withdrawal: the store-side entry and this package's registry entry |
| `register(handle, listener)` | `undefined` — one handle, one function; a second registration replaces the first |
| `removeListener(handle)` | `undefined` — the entry removed whole and its store entries withdrawn |
| `addConstraint(pair, constraint)` | the constraint's identity — the ADD route, which CARRIES the function and OVERWRITES at a held pair |
| `constraintOn(pair, constraint)` | `undefined` — enable, idempotent; throws at a pair the store does not carry |
| `constraintOff(pair, constraint)` | `undefined` — disable, idempotent, **not a removal** |
| `removeConstraint(pair)` | `undefined` — **the one act that deletes an identity** |
| `constraints()` | the registered pairs, `{address, id}` only — **no function, no order, no `enabled`** |

**⟶ AND THE `delete` ROW'S ANSWER HAS A SECOND NON-ENUMERABLE MEMBER, 2026-10-29 — ITS COMMIT RECORD.** The row above
names the `discarded` witness and stops there; **a `delete` is an editing verb with its own attempt, its own pass and
its own commit, so the receipt ALSO carries `commit`, a NON-ENUMERABLE own member holding the same four-member
`CommitRecord` a `K-2` returns — `attempt` · `op` · `triggered` · `pending` — and `null` on the arm that removed
nothing.** **Measured on this checkout: `Object.keys(receipt)` reads `["address","tiers","triggered","op"]` — four —
while `Object.getOwnPropertyNames(receipt)` reads six, `commit` and `discarded` being the two it does not list** — so
a spread or `Object.assign` copy of a receipt loses BOTH, and nothing throws when it does. **Read either off the
receipt itself.** **No member is added to the FOURTEEN and no enumerable shape moves.** (`D-57`; `D-55` item `3`;
`index.d.ts`'s `DeleteRecord.commit`; the long-form reading — the adoption, the `pending` residue, the `file`-tier
save and `K-4`/`K-5` by reference — is the shipped guide's `§7.8`, which is where those four follow-ons are stated.)

**THE RECEIVER IS THE STORE, SO NO CALL CARRIES AN `instance` POSITION** (`surface.md §2.1` (e) item 3):
`store.write(address, tier, value)` is the shape every method takes, and a leading `instance` is a SUPERSEDED
SPELLING — wrong, not redundant. **AND NO OWN MEMBER IS A DATA MEMBER:** there is no `store.data`, no `state`
field and no getter over the register; `store.read(address)` is the route to state. **There is no release
verb** — construct one store and keep it for the process's life.

### The construction's four keys

**`cfg` carries FOUR declared keys and no fifth: `filePath` · `journalLength` · `listeners` · `constraints`**
(`parameter-semantics.md §2.21`; `docs/specs/storeroom-native/contract.md §7.1`). `journalLength` and
`listeners` are REQUIRED; `filePath` and `constraints` are OPTIONAL and absent-in-domain. **The constraint list
is YOURS and is NEVER persisted** — you supply it from your own information at every startup, and it is
validated at two instants: at construction, and at a boot over an existing file. **A caller-supplied fifth key
is IGNORED and produces no code** — it is a constraint on this package's own passing, not a refusal of your
extra key.

### The `write`'s fourth position

**THE DECLARED ORDER IS `write(address, tier, value, commit?)` — three required arguments and the optional one
last, at the FOURTH position** (`surface.md §2.2` clause 1; `index.d.ts`, the `write` member). **AN ABSENT
`commit` IS IN DOMAIN**: the write opens or joins a commit all the same, no default record is fabricated for
it, and leaving the position out is the supported form for an external caller. **The position is the KERNEL's
own** — an object carrying a `pending` member present and not `undefined` — and **every other form there
throws the class test's own `TypeError`, whose `status` member is ABSENT and whose message names the
position**. A refused position stops the write: no store call is reached and no byte moves.

## The failure form is ONE

**Every refusal is THROWN as a plain object carrying exactly `{status, message, log, address}`** — never an `Error`
subclass, never a returned tagged union and never a `Promise` rejection, so `try`/`catch` is the whole error
model (`index.d.ts`, `StoreRefusal`; `surface.md §2.5`).

**⟶ AND THE CROSSED FORM IS FOUR MEMBERS FROM 2026-10-29 — `D-77`, THE ARCHITECT'S RULING, ONE WORD: *"New member"*.** Every figure above and below that prints that form as THREE is read THROUGH this clause and stands as the reading of its own date. **THE FOURTH MEMBER IS *WHICH ACT WAS REFUSED* — `address`, the ADDRESS the refusal is about**: a segment array in the caller's own domain, or the declared `null` where there is nothing to name. The measurement it answers: **a caller's OWN act refused and a caller's act that PASSED while a LISTENER's was refused cross with the same `status`, the same `message`, the same keys and the same two log entries** — only the `opId` differs, and a refused act answers no `op` to key against — so the caller read `ConstraintPassRefused` and concluded its own write did not happen while the store says it did. **Compare the member with the address you wrote: `equal` means your own act, `different` means a listener's, and a retry is then a decision rather than a guess.** **IT IS PRESENT ON EVERY REFUSAL, `null` WHERE NOTHING IS NAMEABLE** (*"a member absent on some arm is the `DEF-AH` defect wearing a new name"*), so `Object.keys(caught)` reads exactly `["status","message","log","address"]`, length `4`, on EVERY arm. **THE CLOSED STATUS SET IS NOT REACHED — twenty stays twenty — and the member is no heuristic a consumer has to reproduce.** The form's one home is `docs/specs/storeroom-js/surface.md §2.5` item `4-ter`.

```js
try {
  store.write(['users', 0, 'name'], 'mem', 'ada');
} catch (e) {
  // The FOUR members, in the form's own order (`D-77`: `address` is the act the refusal is about).
  const { status, message, log, address } = e;   // Object.keys(e) is ["status","message","log","address"] on EVERY arm
  // equal to the address you wrote ⇒ YOUR OWN act was refused; different ⇒ a LISTENER's was and your write stands.
}
```

**★ AND `log` IS NEVER ABSENT.** It is an ordinary own enumerable data member of that same object — written
with an object literal, not `defineProperty`, not a getter, not on a prototype and not behind a `Symbol` — and
**`Object.keys(caught)` reads exactly its FOUR members in the form's own order, `["status","message","log","address"]`,
length `4`, on EVERY arm.** **`[]` is its declared value where the failure's cause has no attempt at all, and
every failure whose attempt exists carries that attempt's own entries — the kernel's FIVE-member `LogEntry`
records, with the `outcome` entry's `state` carrying the `KC` token where the constraint pass produced one** **⟶ AND IT IS
FIVE SINCE `D-65`: `kind` · `id` · `opId` · `message` · `state` — the `seq` member is GONE, because a log entry's position
IS its array index and a member restating the index was a second copy of a fact the array already carried.**
(`index.d.ts`, `LogEntry`; `surface.md §2.5` items 3–4). **The `message` is generated from the code and the
failing trigger's arguments**, never hand-authored at a call site.

**★ AND TWO THINGS ABOUT THAT LIST THAT A CONSUMER COUNTING IT NEEDS — DECLARED HERE BECAUSE THE SURFACE DOES NOT
TELL YOU EITHER BY ITSELF.** **ONE: THE LIST BELONGS TO THE COMMIT, NOT TO THE ATTEMPT.** One write is one commit,
and everything the commit does — the passes that judged its value, a repair's own write, the re-run after that
repair, the terminal arm's `outcome` entry — appends to **one** array, **so a crossed report carries the entries of
EVERY attempt in the commit, including a write a constraint body makes** (a listener's write opens a commit of its
own, so its entries are that new commit's). **`log.length` is therefore every entry of the commit and not "how many
constraints were evaluated".** **TWO: AN ENTRY'S `seq` IS THE POSITION OF THE ENTRY IN THAT LIST — NOT THE STORE'S
JOURNAL ORDINAL.** `JournalOp.seq` orders the store's own record; this `seq` orders the commit's message log, and
the two differ by design (a refusal's entry can carry `seq` `1` while the store's journal counter reads `41`). **The
kernel's `state` token set is `KC-1`…`KC-9`, `KC-9` being the save arm's own; the store's status set has not moved.**

**⟶ AND THE SECOND OF THOSE TWO THINGS IS WITHDRAWN AT THE MEMBER, 2026-10-28 — `D-65`: `LogEntry` CARRIES NO `seq`,
AND AN ENTRY'S POSITION IS ITS ARRAY INDEX.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE as
the reading of its own date and is read THROUGH this clause — the withdrawn sentence is *"AN ENTRY'S `seq` IS THE
POSITION OF THE ENTRY IN THAT LIST … the two differ by design"*, and it described a member that no longer exists.**
**THE RULING, THE ARCHITECT, ONE WORD: *"Drop it"*** — `seq: log.length + 1` WAS the index of the entry being
appended, a second copy of a fact the array already carries. **WHAT YOU READ NOW: FIVE members, `kind` · `id` ·
`opId` · `message` · `state`** (declared at the same place the clause above declares them, and stated there beside
its `seq` retirement), **and the position of an entry is `log.indexOf(entry)` or the index of the loop you are
already in.** **`JournalOp.seq` IS STILL THE STORE'S OWN APPEND ORDINAL, so the distinction the sentence above drew
has not disappeared — only the member that could be confused with it has**, and the two are now impossible to
confuse for that reason. **So do not read `entry.seq` for an ordering, and do not read its absence as an entry that
lost its place: the list's order is the commit's append order and the index is the place.**

## The status set is TWENTY, and open by design

**`StoreStatus` carries TWENTY members, ranked `1`…`20`, plus the open escape arm `(string & {})`** — the union
in `index.d.ts` and the array in `src/error.rs` (`CODES`, `[&str; 20]`) are the same members in the same rank
order, and the algebra reads `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓
(`docs/specs/storeroom-native/contract.md §8.1`).

| rank | status |
| --- | --- |
| 1–11 | `AddressMalformed` · `AddressNotFound` · `LeafHasNoDownstream` · `TierNotFound` · `OutOfDomainTier` · `ParentAnchorMonotonicityViolation` · `ContainerKindConflict` · `ReadTargetIsBranch` · `WriteParentNotLink` · `JournalOpUnknown` · `RollbackCompacted` |
| 12–16 | `ConstructionArgumentMissing` · `FilePathUnreachable` · `ValueNotAdmitted` · `FileCommitFailed` · `ConstraintListInvalid` |
| 17 | `ValueRefusedAtBoundary` — the package's own boundary refusal, decided at the value walk |
| 18 | `ConstraintBodyThrew` — a constraint BODY threw |
| 19 | `ConstraintRefusedAtRegistration` — a well-formed pair whose body answered non-`true` at registration |
| 20 | `ConstraintPassRefused` — a registered constraint refused: the write's attempt, or a reversal's terminal state |
| escape | `(string & {})` |

**THE ESCAPE ARM IS LOAD-BEARING RATHER THAN LOOSENESS.** The set has moved four times, and an
immutably-enumerated union would mis-type a LAWFUL refusal the moment the set moves again. **So do not `switch`
on these without a `default`, and NEVER treat an unknown `status` as success.** The set is the STORE's to
close; **this package mints no member, widens no set and renames none.**

**`FileCommitFailed` IS THE SAVE'S CODE** — a failing `file`-tier save and nothing else — **and
`ConstraintPassRefused` is the CONSTRAINT PASS's**: a constraint refusal no longer answers a save code, so a
handler can branch on which layer failed. **`ValueRefusedAtBoundary` is the one you will meet on the value
route**: the walk decides a value's class **before any store verb is called** and answers that member with the
failing target's spelling. **`ValueNotAdmitted` stays at rank `14` and is the STORE's own answer on the native
route — a pass that reads rank `17` as a rename of rank `14` has destroyed a member.**

## Watching for changes

**Listeners fire on `write` and `delete`, and never on a read.** The store invokes nothing: it returns the
triggered handle set and this package's own registry matches handle to function (`A57`, `A77`).

```js
const handle = store.listen('greeting-watch', [['greeting']]);  // you spell the handle, the addresses are a SET
store.register(handle, (address) => { /* the ONE argument is the triggering address */ });
```

**`listen(handle, addresses)` has an arity of TWO, position `1` a non-empty `string` and position `2` a SET of
addresses** — an array of addresses, **with the empty array `[]` in the domain**. **A REPEATED CALL AT A HELD
HANDLE IS SET-ASSIGNMENT AND NOT UNION**: `listen(h, S2)` after `listen(h, S1)` purges `S1` wholesale and
installs `S2`, with no intermediate state observable. **The call ANSWERS THE HANDLE on success** (`D-22`) — the
success signal that carries the identity, and every failure remains the one thrown form. `unlisten(handle)` is
the withdrawal. **AND A HANDLE MUST NOT be carried across a process reload**: handle identity is this
process's own, so a prior session's token names no registration and `register` over it is a refusal.

## Constraining writes

**A constraint is addressed by a PAIR `{address, id}`**, where the `id` is a non-empty `string` that IS the
pair's handle — you name it, it is instance-scoped and unique, and a repeated `id` at the same kind is an
overwrite. **There are exactly TWO population routes**: the batch at creation (`cfg.constraints`, elements
`{address, id, constraint}`) and the post-creation `addConstraint` route. **A registered pair stays registered
until `removeConstraint`** — `constraintOff` is not a removal, and a disabled pair still appears in
`constraints()`. **Toggles are idempotent and throw at a pair the store does not carry. A cross-kind duplicate
is REJECTED in both directions** — a listener and a constraint do not share one handle.

**★ AND READS CHECK NO CONSTRAINT** (`D-1-bis`, reading (a)): the mechanism is unconditional on the
**write/commit** path over the triggered handle set, and a `read`, a `readLiteral` and a branch's assembly
**consult no constraint, refuse nothing on a constraint's verdict and filter nothing on one.** No read-side
constraint arm is declared, and none is owed.

**What a refusal costs you:** a write whose registered constraint refuses it **throws
`{status: 'ConstraintPassRefused', message, log}`** — rank `20` — with the failure's `log` carrying the entries of
the write's whole commit (the attempt's own among them, and every attempt the commit held) and the kernel's `KC`
token on the `outcome` entry's `state`. **The value is not written
and a failed attempt leaves the store exactly as it found it**, whether the constraint refused outright or its
repair failed on the re-run (`D-40`).

**⟶ AND ONE ARM OF THAT STATUS IS NOT YOURS, DECLARED HERE 2026-10-29 — `D-76` ITEMS 1 AND 2, ON THE DOWNSTREAM'S
`DEF-AU`.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is the reading of its own
date; what it cannot say is whose act the status names.** **`ConstraintPassRefused` ALSO CROSSES WHEN THE REFUSED
ACT WAS A LISTENER'S AND YOUR OWN WRITE HAD ALREADY LANDED** — **a listener's act is in the listener's own commit,
and its throw is the channel by which your code logs that violation, because you are the only party positioned to**
— **and the answer does not tell the two apart: `status`, `message`, the three own members, the log's length and
every entry's `kind` · `id` · `message` · `state` are EQUAL, the log's `opId` the only differing byte, and that byte
cannot be keyed against anything, because a refused act answers no `op`.** **SO DO NOT RETRY ON THE STATUS ALONE:
READ THE ADDRESS YOU WROTE.** **Your value stands ⇒ the refusal was a listener's and your data landed, so a retry
re-applies it; your value does not stand ⇒ it was your own act's and nothing was written.** **NO STATUS, MEMBER OR
RANK MOVES FOR THIS: the distinction is a closed set's business (`D-38`) and the architect's call** (the guide's
`§6.5a` and its `§8.1` row `20` carry both arms measured, and `D-73` carries the throw's rule; `D-76`.)

## The `file` tier, and what actually persists

**Durability is produced by a successful `file`-TIER WRITE ONLY** (`DD-28`, `D-32`). **So a BARE `file`-tier
write persists**: `store.write(['k'], 'file', 1)` commits with no kernel attempt in the path, and a fresh
`storeCreate` over the same `filePath` resolves the address. **⟶ A `DELETE` NOW SAVES AND A `ROLLBACK` STILL DOES NOT, 2026-10-28.** The sentence this replaces said **both**
performed no file I/O at any tier scope — **and that was measured false for a `delete` once it became an editing
verb with its own attempt**: a `file`-tier delete's save is the terminal arm's at the record's own op, so
**`delete(['k'], 'file')` followed by a fresh `storeCreate` over the same `filePath` answers `AddressNotFound`
rather than the version it removed** (measured `{"a":1}` → `{}`, boot `1` → absent). **A `ROLLBACK` still performs no
file I/O at any tier scope** — **a reversal appends no journal op (`M-9`), so its terminal arm has no op of its own
to save at** — **and a durable version a reversal removed in memory therefore stands again after a re-boot, which is
the store's declared boot and not a defect.**

**A kernel-driven write's `file`-tier save is a DIFFERENT save of a different scope**: it is the package's
terminal arm, performed on the passing arm alone, before any delivered listener body runs, keyed by the
record's `op` — and the same bytes may lawfully be committed by both acts. **AND A FAILING SAVE ANSWERS
`FileCommitFailed` AFTER the store's own journal rollback has already run**, so the caller receives the
failure and never the half-applied state; the package compensates for nothing. **A rollback whose candidate
set includes a compacted entry fails `RollbackCompacted` and undoes nothing** — the floor is all-or-nothing.

## The value domain

**A value crosses by deep copy in both directions and must be structured-clone-compatible**: strings,
booleans, finite numbers, plain objects and arrays. **If it cannot cross IPC it cannot be stored.** **The walk
refuses a value whose nesting depth exceeds `126`, and one whose visited-node count exceeds `1,000,000`, with
no configuration knob for either.** `126` is the deepest depth a `file`-tier value ADMITS, COMMITS and
RE-BOOTS; `127` and beyond is refused at the walk, before any store verb, as `ValueRefusedAtBoundary` (`A149`;
`docs/specs/storeroom-json-crossing/contract.md §4`).

## How the addon is resolved — three rungs

**THE ENTRY RESOLVES ITS ARTEFACT IN THE DECLARED ORDER** (`docs/specs/storeroom-publish/resolution.md §2`;
`docs/specs/storeroom-publish/contract.md §1.1`):

1. **RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** The entry requires THE ONE NAME the
   closed key set declares for the `process.platform` × `process.arch` pair, and no other name. The five
   declared names are

   **`@auspicion/provident-storeroom-js-linux-x64-gnu`** · **`@auspicion/provident-storeroom-js-linux-arm64-gnu`** ·
   **`@auspicion/provident-storeroom-js-darwin-x64`** · **`@auspicion/provident-storeroom-js-darwin-arm64`** ·
   **`@auspicion/provident-storeroom-js-win32-x64-msvc`**

   — five names, three carrying a toolchain suffix (`-gnu` twice, `-msvc` once) and two carrying none. **The
   name is SELECTED from this table and never built by concatenating tokens**, so no sixth name is computed.
   These five are the registry's own per-target optional dependencies, and this package's
   `optionalDependencies` pins each of them at this package's own version, exactly.
2. **RUNG TWO — THE MODULE-RELATIVE ADDON.** Failing rung one, the entry requires
   `build/Release/storeroom_js_binding.node` beside the entry module, constructed from the entry module's own
   location and from no other source — no environment variable, no configuration key, no path relative to the
   working directory and no search of a parent directory.
3. **RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** Failing rung two, the load path answers the single failure
   form with `FilePathUnreachable` and no instance is returned.

**IN A PUBLISHED INSTALL, RUNG ONE IS THE RUNG THAT FIRES**, because rung two's path is the checkout's own and
a tarball of this package carries **no binary at any key, on any target**. **AND THE FIVE PLATFORM ARTEFACTS
EACH CARRY THEIR OWN TARGET'S BINARY**: each one's allowlist names the `.node` beside its manifest, which is
what gives rung one a declared source to load at that key at all (`PAR-PUB-21`; `distribution.md §3.2` item 5).
**RUNG TWO IS THE CHECKOUT-ONLY RUNG** — the in-place developer loop — and building it is a step of a checkout
rather than of an install:

```sh
cargo build --release --manifest-path bindings/js/Cargo.toml
mkdir -p bindings/js/build/Release
cp target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
```

**No binary is ever committed** (`package.md §3.2`): `build/` and `target/` are ignored, and the artefacts are
built and published, never stored in the tree. **The prebuild matrix is five targets** (`linux-x64`,
`linux-arm64`, `darwin-x64`, `darwin-arm64`, `win32-x64`), one runner per target, by the release's own workflow
`/.github/workflows/publish.yml`.

**AND THE UNCOVERED-TARGET ANSWER IS A DECLARED LIMITATION, WITH ITS CONSEQUENCE STATED RATHER THAN
DISCOVERED** (`docs/specs/storeroom-publish/contract.md §2.1` item 3; `distribution.md §2.2`; `PUB-DD-1`,
`PUB-DD-2`): **a consumer whose `process.platform` × `process.arch` pair is not one of the five covered keys
gets no binary** — rung one is not attempted for that pair, rung two is not carried by a published install, and
the load path answers the declared absent-addon form. **No `build.rs`, no `Cargo.toml`, no Rust `src/**` and no
`postinstall` build-on-install step is shipped**: the only route for an uncovered consumer is to build the
store crate from its source themselves, which is a LIMITATION and not a promise. **A covered consumer needs no
Rust toolchain; an uncovered consumer needs one.** **And a covered key whose C library differs from its
artefact's gets the same answer**: `os` and `cpu` cannot express a C library, so no C library is read, detected
or measured anywhere on this load path.

## The manifest

**This package's `files` allowlist is a consequence of REACHABILITY and not of a declared count** (`D-3`,
`D-4`): **whatever the entry requires by path must ship in the tarball**, and the release's shape is determined
empirically by `delivery` together with the e2e/install instruments. **No declared arity and no declared
exclusivity binds the allowlist** — a hand-maintained count in its place would re-create the constraint those
rulings lifted. **ONE DOCUMENTATION ROW IS ADDITIVE AND DECLARED AS SUCH:** `README.guide.md` names no module and
imports nothing, so it travels in the reachability rule's own declared non-code class (`README*` at the package
root) and no limb of that rule moves for it. **AND A SECOND: `RELEASE-NOTES.md` is the change list, staged
byte-for-byte at the packaging root by the release's assembly, names no module and imports nothing, and is likewise
admitted and declared** — so the manifest's `files` allowlist reads **seven rows** and the packed set reads **`20`
members bare / `21` assembled** (`1` manifest + `5` root files + `13` entry modules + `1` kernel `= 20`, plus the
licence at assembly). **The prohibitions are unmoved:** no `.node`, no `build/Release` path and no `postinstall`
route in this package's own tarball, and no `LICENSE` row.

## Tests — a REPOSITORY instruction, not a consumer one

**EVERY COMMAND BELOW IS FOR A CHECKOUT OF THIS REPOSITORY.** The root manifest is PRIVATE and is not shipped,
and a consumer's install carries no `tests/` directory at all, so a consumer cannot run these and is promised
nothing by them. **A consumer's own tests are the consumer's.**

```sh
cargo test  --manifest-path tests/Cargo.toml -p storeroom-tests --no-fail-fast   # THE BATTERY'S LEG — 235 cells, 0 fail
cargo test --offline -p storeroom-native                                          # THE STORE'S LEG — 434 cells, 0 fail
cargo test                                                                        # BOTH — 669 cells, 0 fail
```

**AND THE THIRD COMMAND IS NOT A FOURTH LEG:** a bare `cargo test` runs `default-members = [".", "tests"]`, so
it is EXACTLY the store's `434` plus the battery's `235` — `434 + 235 = 669` ✓ — in one run (`D-34`: one
workspace at the repository root, `members = [".", "bindings/js", "tests"]`). **`-p` IS NOT DECORATION ON THE
BUILD SIDE EITHER:** the store's leg keeps `--offline`, and a workspace-root `cargo build --offline` would pull
this crate's `napi` crates and `--offline` would refuse them.

**AND THE JS LEG RUNS ONLY AFTER THE ADDON IS BUILT** (`docs/specs/storeroom-js-proposal.md §17` · `A75`: *"the
JS leg of the acceptance layer acquires A BUILD STEP (a `.node` must exist for those cells)"*):

```sh
# 1. THE BUILD STEP, AT THE REPOSITORY ROOT, BEFORE ANY JS CELL RUNS:
cargo build --release --manifest-path bindings/js/Cargo.toml
mkdir -p bindings/js/build/Release
cp target/release/libstoreroom_js_binding.so bindings/js/build/Release/storeroom_js_binding.node
# 2. THE JS LEG, AFTER IT — the repository's own battery, from the REPOSITORY ROOT:
npm test
```

**THERE IS NO FALLBACK AND NO JS-SIDE STORE** (`A75`): an addon that is ABSENT or FAILS TO LOAD is a DECLARED
FAILURE — `storeCreate` answers the single failure form with `FilePathUnreachable` and NO instance is returned.
**The message is not a placeholder**: it is the store's generator rendering THAT subject, reached through the
addon's `errorMessage` where the artefact loaded far enough to carry the generator, and reproduced
BYTE-FOR-BYTE from the generator's own clause where the generator is the thing that failed to load. **The Rust
leg needs no addon at all**: the conversion core is the crate's `rlib` half, so the battery is drivable with no
Node runtime present (`package.md §4.1` item 3, `§4.5` item 7).
