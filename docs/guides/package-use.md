# Using `provident-storeroom` — the installed package

**This guide is for someone who has just run `npm install provident-storeroom@0.2.0` and has never seen the
repository it comes from.** It describes the package you now have in `node_modules`: how it is reached, what its
surface does — **at `0.3.0` ONE module function and a set of store methods; at the `0.2.0` this guide's `▸` blocks
were measured on, the ELEVEN module-level names** — how an address is shaped, how the tiers behave, what each
refusal means, and — the part most worth
your time — **the handful of behaviours that will surprise you if you guess.**

**Read §0 before anything else. It tells you exactly how much of this is measured and how much is declared — and
§0-bis, which states which VERSION this guide describes, what `0.2.0` added to it, and how to check both at your
own install.**

**The sibling guide is `docs/guides/electron-integration.md`:** it carries this same package into an Electron app
and is deeper on packaging, code signing and the process boundary than this one is. **Where that guide and this
one overlap, that one is the integration story and this one is the consumer story.**

---

## §0 · What is measured here, and what is declared

**Every behaviour this guide states has one of exactly two sources, and the two are not the same thing:**

| The source | What it is | How this guide marks it |
|---|---|---|
| **`0.1.2` measured** | a scratch consumer of the published tarball drove the package and printed what it answered | quoted verbatim in a `▸` block |
| **declared** | the package's own published type declaration, its own published readme, and the store's contract it carries | cited by `path §section` |

**The scratch consumer is not part of this repository.** It drives the **published tarball** rather than the
checkout, every step reports rather than asserts, and it prints a wrong guess rather than aborting on it. **Where
this guide quotes its output, that output is what `0.1.2` answered on one machine** — and where a quoted line is
machine-specific, the guide says so.

**And the layer, stated plainly, because it is the one thing a reader should not have to infer: this guide
describes the package a consumer installs.** It does not claim that any application works, and it makes no claim
about any consumer's program. **§12 lists what this guide did not do.**

---

## §0-bis · Which version this guide describes, and what changed

**THE VERSION THIS GUIDE DESCRIBES IS `0.2.0`.** **THE NEWEST VERSION ANY `▸` BLOCK IN IT HAS BEEN DRIVEN AGAINST IS `0.1.2`.** **AND THE FIRST THING TO CORRECT BESIDE THEM, BECAUSE A CLAUSE HERE READ THE OTHER WAY UNTIL THIS PASS (`role_proofreader`, 2026-10-16) PROVED IT FALSE: `0.2.0` IS PUBLISHED, AND THE REGISTRY SERVES IT AS `latest` — so DECLARED below never meant that no such version exists to install, and no reader should act on that reading.** **The clause as filed said DECLARED meant *"the contract and the package's own documents say this, and no published `0.2.0` exists for a run to have been taken against"*, and what is true is narrower and is about this guide's own blocks rather than about the registry: **NO `▸` BLOCK HERE WAS DRIVEN AGAINST A PUBLISHED `0.2.0` EITHER** — §12-bis's wall is the pass's lack of a shell, not an absent version — **while a battery that DID run against the published `0.2.0` bytes is named where the record lives: `scratch/live/install-0.2.0/0.2.0-live-install-report.md`** (§1.1 of that report reads `dist-tags.latest = 0.2.0` over the versions `0.0.0-stage`, `0.1.0`–`0.1.3`, `0.2.0`; its §4 reproduces the greens set, 12/12 scenarios, `96` cells = PASS `90` + FAIL `0` + OBSERVED `6`). **⟶ CORRECTED 2026-10-16, ONE PASS LATER (`role_proofreader`), ON THE SUPERVISOR'S `R2` AUDIT OF THAT BATTERY'S DRIVE DIRECTORY (`archive/reviews/2026-10-16-constraints-publication-gate1.md §13`, measured): THAT DRIVE WAS A HYBRID — THE ENTRY CAME FROM THE INSTALL, WHILE THE KERNEL, THE NATIVE BINARY AND THE GREENS RUNNER RESOLVED OUT OF THE CHECKOUT BY SYMLINK.** **SO THE `12/12` ABOVE IS EVIDENCE FOR THE GREENS SET AND FOR THE INSTALL'S RESOLUTION, VERSIONS AND SURFACE, AND IT IS `LIVE/CHECKOUT` FOR ANYTHING THAT ASSERTS THE PACKAGE — INCLUDING THE `file`-TIER SAVE, WHOSE BINARY CAME FROM THE CHECKOUT.** **The phrase *"at the installed path"* stood in that parenthesis as filed and is struck here rather than left to be read as an installed-bytes green; the rest of the parenthesis stands byte-exact.** **THAT BATTERY DID NOT RE-DRIVE THE `▸` BLOCKS — it drove the `file`-tier-save greens set at the installed path — so no `▸` block in this guide moved, and none is claimed here to have been re-taken.** **Both sentences are true and neither cancels the other, so the rule is stated here once and applied in every section below: `0.1.2` MEASURED means *"the published `0.1.2` tarball answered this on a scratch run"*, and DECLARED means *"the contract and the package's own documents say this, and no `▸` block in this guide was driven against it."*** **Where a `0.2.0` behaviour is stated below it is marked DECLARED, and §12-bis says so again rather than leaving a reader to notice.** **⟶ RECONCILED 2026-10-16: this paragraph and §12-bis read `0.1.3` where they now read `0.2.0`, and THAT PASS'S OWN CLAUSES STAND BYTE-EXACT BESIDE THEM AS THE READING OF THE TREE THEY WERE WRITTEN FOR — so *"the `0.1.3` documentation pass"*, *"no published `0.1.3`"* and *"DECLARED, NOT MEASURED ON `0.1.3`"* ARE HISTORICAL SITES, read through this clause rather than erased, and NO `▸` BLOCK WAS DRIVEN AGAINST A PUBLISHED `0.2.0` BY THE PASS THIS CLAUSE RECONCILES — a limitation the `0.2.0` LIVE/INSTALL battery later lifted for the greens set and for nothing else, the `▸` blocks standing un-re-driven.**

**★ THE SURPRISING CHANGE FIRST, BECAUSE A READER WHO MEETS IT BY ACCIDENT WILL THINK THE STORE IS CORRUPTING THEIR DISK: PASSING A `filePath` NOW PUTS A FILE ON DISK AT CONSTRUCTION.** **A successful construction over an ABSENT path leaves the store's OWN file there — EXCLUSIVELY created, ZERO-LENGTH, with no register key, no journal entry and no registration committed — and `0.1.2` did not.** **The construction also fixes the register's tier at `file` when that succeeds.** **This is `docs/specs/storeroom-native/contract.md §10.4` part `3`'s rule, and §8.5 below is the state-by-state table.** **The consequence to carry: a `filePath` you pass is a path the store will OCCUPY, so do not point it at a path whose absence is load-bearing to your own arrangement of it.**

**WHAT ELSE `0.1.3` CARRIES.** **A provided, absent `filePath` that the process cannot in fact create is now REFUSED AT CONSTRUCTION with `FilePathUnreachable` and NO instance, where `0.1.2` decided that state from the parent directory's MODE BITS and could answer REACHABLE and then fail on the first `file`-tier write with `FileCommitFailed`** (`contract.md §10.4` parts `1` and `5`; `§8.1` #13's amended trigger clause, which is the rule's home for the refusal's trigger list). **And a path whose NAME IS A DANGLING SYMLINK is now REFUSED rather than accepted.** **Neither of those is a behaviour you ask for; both are states that used to report success and now do not.**

**★ AND THE THREE SURFACE MOVES, PRINTED TOGETHER BECAUSE A CONSUMER MEETS ALL THREE IN THE TYPE FILE: the construction gains a FOURTH declared key, `constraints` — optional, YOUR list, NEVER persisted, validated at create and again at a boot over an existing file (`§8.6`); the instance gains a FOURTH own member, `settle`, which is the arm that performs the `file`-tier save (`§8.3`); and the closed status set gains a SIXTEENTH member, `ConstraintListInvalid`, while the `file`-tier failure keeps its own `FileCommitFailed`** (`bindings/js/index.d.ts`, the `StoreConfig`, `StoreInstance` and `StoreStatus` declarations; `docs/specs/storeroom-js/surface.md §2.1` and `§2.11`; `docs/specs/storeroom-native/contract.md §8.1` ranks `#15` and `#16`). **The corresponding move at the write is the FIFTH optional argument, `commit?`, declared last (§3).**

**⟶ CORRECTED `2026-10-16`, ON THE SETTLED SURFACE: THE SENTENCE ABOVE IS TRUE OF THE PASS THAT WROTE IT AND IS SHORT OF THE OPERATIVE SURFACE — BOTH FIGURES IT PRINTS HAVE MOVED, AND THE PARAGRAPH ITSELF BELONGED IN §0-bis RATHER THAN IN THE VERSION-VOCABULARY SECTION IT STANDS IN.** **IT IS KEPT BYTE-FOR-BYTE AND READ THROUGH THIS CORRECTION RATHER THAN REWRITTEN, FOR THE REASON §0 gives: a re-pointed paragraph reads as a measurement nobody took.** **WHAT IS WRONG WITH IT, NAMED AT THE CLAUSE LEVEL AND NOT AT THE TOKEN:** **(a) *"the instance gains a FOURTH own member, `settle`"* — THE INSTANCE'S OWN MEMBERS ARE SEVEN as of `A126`, `4 + 3 = 7`: `register` · `on` · `off` · `settle` · `addConstraint` · `constraintOn` · `constraintOff`, so `settle` is the fourth of SEVEN and not the fourth of four** (`docs/specs/storeroom-js/surface.md §2.4` item `9 (f)`'s dated clause; `A126`); **(b) the three surface moves it names are THREE OF MORE, the module namespace having gone from EIGHT names to ELEVEN and now to ONE (§1.1-bis).** **AND WHAT IT GOT RIGHT STANDS: `constraints` IS the construction's fourth declared key, `settle` IS an own member, `ConstraintListInvalid` IS the closed set's sixteenth member at rank `#16`, `FileCommitFailed` keeps rank `#15`, and `commit?` IS the write's fifth optional argument declared last** (`bindings/js/index.d.ts`; `docs/specs/storeroom-native/contract.md §8.1`).

**⟶ RECONCILED 2026-10-16 — THE THREE PARAGRAPHS DIRECTLY ABOVE (`★ THE SURPRISING CHANGE FIRST`, `WHAT ELSE `0.1.3` CARRIES` AND `★ AND THE THREE SURFACE MOVES`) ARE HISTORICAL SITES.** **Each names the version the pass that wrote it had measured and declared against — `0.1.2` as the version whose behaviour these moves replace, `0.1.3` as the version whose pass declared them — AND EACH STANDS BYTE-EXACT rather than re-pointed: THE SURFACE THEY DECLARE IS THE SURFACE THE RELEASE CARRIES FORWARD, so `settle`, the fourth `cfg` key `constraints`, the FIFTH `commit` argument and the SIXTEENTH `ConstraintListInvalid` member are LIVE AT `0.2.0` and are NOT `0.1.3`-only, while the `0.1.2`-was-different clauses are read as the reading of the earlier version they compare against.** **The two declarations' own rule is §0-bis's, and §8.5's *"DECLARED, NOT MEASURED ON `0.1.3`"* first line and §6.1's row `FilePathUnreachable`'s *"(b)'s extended trigger list declared (`0.1.3`)"* marker are read through this same clause: they name the pass and the unmeasured version, and NEITHER is a live claim that `0.2.0` carries no such surface.**

**AND HOW TO CHECK WHICH VERSION YOU ACTUALLY HAVE, AT YOUR OWN INSTALL — because a guide's claim about a version is worth nothing to you if you cannot falsify it:**
1. **What the registry offers as `latest`:** `npm view provident-storeroom version` — **one figure, and it is the package's publish-time `latest` tag rather than the version of anything on your disk.** **If it answers a version below the one you intend to rely on, stop here: you are reading about a version you cannot install.**
2. **What you have:** read `node_modules/provident-storeroom/package.json` and check its `"version"` field, **and read its five `optionalDependencies` values.** **All six figures must be the SAME version** — the main `version` and the five exact pins move together and never singly (§2.2).
3. **What is actually loaded:** construct a store and read the empty address, which is §2.4's one thing to check first. **If the loader resolved a differently-versioned platform package, that is where it shows.**

**AND ONE THING THIS GUIDE CANNOT DO FOR YOU, STATED SO YOU DO NOT READ ITS SILENCE AS A CLAIM: NO `▸` BLOCK HERE HAS BEEN DRIVEN AGAINST A PUBLISHED `0.2.0`, and NO `▸` BLOCK HERE HAS BEEN DRIVEN AGAINST A PUBLISHED `0.1.3` either, because this section's pass held no shell and could not install one.** **Every `0.2.0` statement in this guide is DECLARED — DECLARED HERE MEANS *NO `▸` BLOCK MEASURED IT*, NOT *NOTHING HAS BEEN RUN*: a battery has since been driven against the PUBLISHED `0.2.0` bytes and is named at §0-bis (`scratch/live/install-0.2.0/0.2.0-live-install-report.md`) — and the `▸` blocks are `0.1.2` measurements left standing as measurements of the version they were taken on.** **No `▸` block on this page was re-driven by that battery, and none is claimed here to have been.**

---

## §1 · What the package is

`provident-storeroom` is **a native Rust store, reached through a Node addon, behind a thin ES-module entry.** The
package itself is small: an ESM entry, a readme, and a hand-authored type declaration. **The store's own code is
not in it** — the binary travels in a separate per-platform package (§2).

**THE CLAIMED REALM IS NODE ESM AND NOTHING ELSE.** A consumer `import`s this package as an ES module from a Node
runtime whose ABI carries a Node-API addon (`bindings/js/README.md`, opening clause, citing the realm ruling).
**Node CJS, Electron's `main`/`preload`/`renderer`, the browser, `worker_threads` and any IPC route are each
UNCLAIMED** — the package's own readme says in as many words that *"no other realm is described here as
supported"*, and its readme enumerates the unclaimed realms one by one.

**What that means in practice, in one line: the entry is ESM, the addon behind it is CJS, and the package reaches
the addon with its own internal step so that you never have to.** The addon is not an entry point — a consumer that
spells its path directly is outside the package's contract entirely (`docs/specs/storeroom-js/package.md §1.2`
items 1–2).

**The licence of record is `AGPL-3.0`**, and it travels with every artefact: the main package and each of the five
platform packages carries the repository's `LICENSE` byte-for-byte (`bindings/js/README.md`, the licence clause).
**There is no `LICENSE` file under the package's own source tree** — the copy is an artefact-level fact, carried at
assembly time.

### §1.1 The one entry

```js
import {
  storeCreate, read, readLiteral, write, delete as remove, rollback, listen, unlisten,
} from 'provident-storeroom';
```

**That is the whole entry, and it is the whole surface: eight verbs, no ninth name.** **⟶ AND THE FIGURE OF THAT SENTENCE IS SUPERSEDED, DATED `2026-10-16`, AND IS WITHDRAWN WITH ITS SUBJECT NAMED SO IT IS NOT READ AS THE OPERATIVE ENTRY: THE MODULE NAMESPACE IS ONE NAME — `storeCreate` ALONE, `11 → 1` ✓ — and the eight verbs of the block above are the store's own METHODS at `0.3.0`, the ten methods of the table at §1.1-bis plus `register` and `settle` making the product's TWELVE own members, `10 + 1 + 1 = 12` ✓; THE OPERATIVE FIGURES HAVE ONE HOME IN THIS GUIDE, §1.1-bis, whose own sentence reads *"THE SURFACE IS THEREFORE `1` MODULE NAME PLUS THE STORE'S OWN MEMBERS, AND NOTHING ELSE"* with the same `10 + 1 + 1 = 12` ✓** (`docs/specs/storeroom-js/surface.md §2.9` item 1's and `§2.4` item 9 (f)'s `A127` clauses of 2026-10-16; `docs/decisions.md` · `A127` · `A128`; the `11 → 1` terms `8 + 3`). `delete` is exported under
that name although it is a reserved word, so the declaration binds it as `deleteOp` and re-exports it
(`bindings/js/index.d.ts`, the `delete` block). **Import it as `delete` or alias it; either works.**

**`storeCreate` answers an instance object carrying exactly four own members and nothing else:** **⟶ AND THE FIGURE OF THAT SENTENCE IS SUPERSEDED, DATED `2026-10-16`, AND IS WITHDRAWN WITH ITS OWN WORDS QUOTED: *"exactly four own members and nothing else"* WAS THE `0.2.0`-ERA SEAM'S SET — the four members the block below declares, unmoved as members — AND THE PRODUCT'S DECLARED MEMBER SET IS TWELVE, `10 + 1 + 1 = 12` ✓: the TEN METHODS of §1.1-bis's table, which the four names below do not carry, plus `register` and `settle`; the four-member figure is the `A116`/`0.2.0` reading and every reading of it at §1.1, §1.2 and the `1.1`-era blocks of this guide has §1.1-bis's line as its home**

```ts
readonly register(handle: Handle, listener: Listener): void;
readonly on(address: Address, listener: Listener): Handle;
readonly off(handle: Handle): void;
readonly settle(record: CommitRecord): void;   // the ordering seam — see §8.3
```

**⟶ AND THE MEMBER COUNT ABOVE HAS MOVED SINCE, DATED `2026-10-16`, SO THE LINE IS NOT READ AS THE OPERATIVE SURFACE: THE INSTANCE NOW CARRIES SEVEN OWN MEMBERS, `4 + 3 = 7` — `register` · `on` · `off` · `settle` · `addConstraint` · `constraintOn` · `constraintOff` — and the module namespace has grown from `8` names to ELEVEN, `8 + 3 = 11`, the `+3` being `addConstraint` · `constraintOn` · `constraintOff`** (`docs/specs/storeroom-js/surface.md §2.4` item `9 (f)` and `§2.9` item `1`'s dated clauses; `docs/decisions.md` · `A126` and `A123`). **The four members above stand and gain three. And the two toggles are NOT a second spelling of listener registration: `on` and `off` are §9's listener pair, `constraintOn`/`constraintOff` are the constraint pair, and the two subjects are kept apart on purpose (§1.1-bis).** **AND THE OPERATIVE SURFACE IS §1.1-bis's, IMMEDIATELY BELOW: what this paragraph states is the `0.2.0` reading of a surface that moved twice before it moved again.**

**There is no release verb, no `close()`, no `dispose()`** (`bindings/js/index.d.ts`, the `StoreInstance`
declaration). **The instance's own state is released with the instance and by nothing else — which is another way of
saying construct one and keep it.**

**WHAT THE SCRATCH CONSUMER SAW, AND IT AGREES WITH THE README:** all eight verbs are functions, and the instance
carries `on` · `off` · `register`. **⟶ AND THE INSTANCE'S LIST IN THAT SENTENCE IS THE ONE PART OF THE `0.1.2` MEASUREMENT THAT IS SUPERSEDED, 2026-10-16, AND IT IS WITHDRAWN WITH ITS SUBJECT NAMED: THE PRODUCT'S DECLARED MEMBER SET IS TWELVE, `10 + 1 + 1 = 12` ✓ — §1.1-bis's table of TEN METHODS plus `register` and `settle` — so *"carries `on` · `off` · `register`"* is a LIST OF THREE OF TWELVE AND NOT THE SET; the run's own *"all eight verbs are functions"* is that run's reading of ITS date and the module namespace's operative count is the ONE name §1.1-bis declares** **That run's own output for the surface is a type line per verb; its output for
the instance is the member list.** **That run is a `0.1.2` measurement and §1.1-bis is what the `0.3.0` surface is; both stand, at their own dates.**

### §1.1-bis · The `0.3.0` surface — ONE module function, and the store's own methods

**THIS IS THE SURFACE THE RELEASE TO COME DECLARES. It is DERIVED FROM the `0.2.0` surface this guide's signatures are taken from, WITH ONE POSITION DROPPED: `A127` moves the functions for manipulating an existing store to the METHOD implementation and leaves the functions that do not require an existing store discrete — so `storeCreate` alone remains a module name, and THE RECEIVER IS THE STORE.** **`const a = storeCreate(cfgA)` gives you an interface object that CONTAINS THE STORE DATA AND CARRIES THE SURFACE FUNCTIONS AS METHODS, and `a.write(address, tier, value, commit?)` is the shape every other verb now takes.** **THE METHOD NAMES AND SIGNATURES ARE THE OTHER PASS'S TO DECLARE — `docs/specs/storeroom-js/**` owns the surface re-derivation, and the spellings below are THIS GUIDE'S OWN reading of `A127`'s rule applied to the signatures §3 lists: the FIRST POSITION IS DROPPED (the `instance` every `0.2.0` signature takes first) AND EVERY POSITION AFTER IT IS KEPT UNCHANGED, in its own order.**

**THE ONE MODULE NAME, AND IT IS THE ONE THAT DOES NOT REQUIRE AN EXISTING STORE:**

```js
import { storeCreate } from 'provident-storeroom';
```

**AND THE STORE'S METHODS. NO `METHOD` CELL BELOW IS BLANK: each of the ten rows names the method that carries the row's module name, and the three rows this guide once left blank are filled from the module names themselves — the `0.3.0` method is the same name, read ON the interface object instead of off the module.**

| `0.2.0` module name | The store's method | Its declared shape |
|---|---|---|
| `read` | `read` | `(address, tier?) => unknown` — a leaf's literal, a branch's assembled value, or the whole register (§4) |
| `readLiteral` | `readLiteral` | `(address, tier?) => unknown` — the same, narrowed to a leaf; a branch refuses (§5.4) |
| `write` | `write` | `(address, tier, value, commit?) => WriteRecord` (§10, and §1.1-bis's own `commit` note) |
| `delete` | `delete` | `(address, tier?) => DeleteRecord` — **the MODULE export is `deleteOp as delete` because `delete` is a reserved word; the METHOD is `delete` under that name alone, `deleteOp` being the binding workaround and never the consumer spelling** (§1.1, §5.5) |
| `rollback` | `rollback` | `(opId) => RollbackRecord` (§10) |
| `listen` | `listen` | `(address) => Handle` (§9) |
| `unlisten` | `unlisten` | `(handle) => void` — a no-op success for a handle it does not know (§9) |
| `addConstraint` | `addConstraint` | `(pair, constraint) => constraint identity` — **the ADD route, which CARRIES the function and OVERWRITES if the id already exists** |
| `constraintOn` | `constraintOn` | `(pair, constraint) => void` — ENABLE; idempotent, and it THROWS at a pair the store does not carry |
| `constraintOff` | `constraintOff` | `(pair, constraint) => void` — DISABLE; idempotent, and it THROWS at a pair the store does not carry |

**SO NO `METHOD` CELL OF THIS TABLE IS BLANK FROM THIS DATE, AND THE LINE ABOVE THE TABLE NOW NAMES NO BLANK ONE: the three cells that stood empty were empty because the `0.2.0` reading carried the three routes as three module functions and this guide had no `0.2.0` METHOD spelling to copy — the method takes the module's own name, as it does for the other seven rows.**

**THE SURFACE IS THEREFORE `1` MODULE NAME PLUS THE STORE'S OWN MEMBERS, AND NOTHING ELSE** — **and the member set is TWELVE, `10 + 1 + 1 = 12` ✓: THE TABLE'S TEN ROWS ARE THE STORE'S TEN METHODS — one method per row, so a blank cell above would be a missing method and not a missing member — PLUS `register`, the listener-registration member the `0.2.0` instance already carried (§1.1), PLUS `settle`, the internal ordering member the kernel calls; `storeCreate` IS NOT A MEMBER OF ITS OWN PRODUCT, it is the ONE module name** (`A127`'s *"all store-modifying acts should operate by method, not function"*; `docs/decisions.md` · `A127`; the operative enumeration and its arithmetic being `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause and `surface.md:990`'s clause of that date, whose `10 + 1 + 1 = 12` this line reads and does not mint).

- **★ THE PRIVATE-STATE RULE: NOTHING OF THE STORE'S DATA IS A MEMBER YOU CAN READ.** **The interface object CARRIES the store's data in the sense that it is the handle you act through; NO OWN MEMBER IS A DATA MEMBER, and there is no field, no getter and no second property to read the register, the journal or the commit log off.** **Your only route to the store's state is a method, and `read(address)` is the one for the register (§5.4).** **A consumer that expects `a.data`, `a.store` or a `state` field is reading an object that does not exist.**
- **★ THE THREE CONSTRAINTS ROUTES (`A126`).** **There are TWO ways to populate constraints, and they do not substitute for each other:**
  1. **THE BATCH AT CREATION — `storeCreate(cfg)`'s `cfg.constraints`, an array of `{ address, id, constraint }` elements, where the pair `{ address, id }` is the KEY and the function is the element's SUBSTANCE (§8.6).**
  2. **THE SURFACE'S ADD ROUTE after creation — it CARRIES the constraint function as its own argument, and ★ ADDING AN ID THAT ALREADY EXISTS OVERWRITES: IT DOES NOT REFUSE AND IT THROWS NOTHING for the mere fact that the id was held.** **The replacement function is the one the store evaluates from that call on, and the displaced function is invoked no further.** **A pair the batch populated is an id that already exists, so the ADD route overwrites at a batch pair by the same rule.**
  3. **THE TOGGLES ENABLE AND DISABLE, `on`/`off`-shaped and disambiguated by subject: `constraintOn` at a DISABLED pair re-enables the ELEMENT THE PAIR ALREADY CARRIES, `constraintOff` at an ENABLED pair disables it, and a write a disabled constraint would have refused is ACCEPTED.** **Toggles are IDEMPOTENT — asking for the state a pair already carries succeeds and throws nothing — while a toggle naming a pair the store does not carry THROWS.** **AND `on`/`off` BARE ARE NOT THE TOGGLES: `on`/`off` are the listener pair (§9), the constraint pair is `constraintOn`/`constraintOff`, and the kernel carries its own internal `{ register, on, off, settle }` pair beneath all of it.** **REGISTERING ONE THING AS BOTH A CONSTRAINT AND A LISTENER IS AN UNSUPPORTED ANTI-PATTERN AND ITS TWO INVOCATIONS ARE NOT A DEFECT (see §0-bis and §9).**
- **★ THE COMMIT POSITION, AND WHY YOU SHOULD NOT USE IT — THE ANTI-PATTERN NOTE, AT THE POSITION IT IS ABOUT.** **`write`'s fifth position is the optional `commit`, and EXTERNALLY CALLING A WRITE WITH A COMMIT IS AN UNSUPPORTED ANTI-PATTERN.** **IT IS PRESENT FOR ONE REASON, AND THE REASON IS NOT YOURS: THE REPAIR FUNCTIONS MUST REACH THE STORE THROUGH THE EXTERNAL PACKAGE SURFACE — the same published door every other write uses — AND STILL HAVE THEIR WRITES ADDED TO A COMMIT LOG.** **What the position DOES, so you know what you would be doing: passed and matching an existing commit, the write JOINS it; passed and matching nothing, it ERRORS; ABSENT, A NEW COMMIT IS CREATED.** **The supported caller of the three cases is the kernel's repair path, and a consumer that needs a new commit has one by leaving the position out.**
- **AND EVERY CODE SAMPLE IN THIS GUIDE THAT PASSES A STORE FIRST — `read(store, …)`, `write(store, …)`, `listen(store, …)` and the rest, in §3, §4, §5, §9 and §10 alike — IS THE `0.2.0` FORM, AND UNDER THE `0.3.0` SURFACE IT MUST BE SPELLED AS A METHOD CALL: an `instance` passed first is NOW WRONG, not merely redundant, because the receiver supplies the store and the method's positions are the verb's remaining ones.** **Those samples are left at the form their own version measured, and the re-spelling of each is owed to the pass that re-derives the surface; §12-bis records the state rather than leaving it to inference.**

### §1.2 The types you get

The package ships a hand-authored declaration file — **not a generated one** — reached through the package's own
`types` field. **It declares the eight verbs, the instance's four members, and the failure surface; it declares
no store type, no store verb, no `findAddress` and no release verb** (`bindings/js/index.d.ts`, opening block,
citing the distribution contract). **⟶ AND THE TWO COUNTS OF THAT SENTENCE ARE DISPOSED OF AT THEIR OWN BYTES BY THE ONE-LINE POINTER THIS GUIDE OWES THEM, 2026-10-16: *"the eight verbs"* AND *"the instance's four members"* ARE THE `0.2.0` DECLARATION'S OWN FIGURES AND ARE READ THROUGH §1.1-bis, WHOSE SENTENCE *"THE SURFACE IS THEREFORE `1` MODULE NAME PLUS THE STORE'S OWN MEMBERS, AND NOTHING ELSE"* CARRIES THE OPERATIVE ONES — ONE MODULE NAME, `11 → 1` ✓, AND TWELVE OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — AND THE SENTENCE'S OTHER CLAIMS (the failure surface, `findAddress`'s absence, no release verb) STAND WHOLE**

**⟶ AND BOTH COUNTS IN THAT SENTENCE HAVE MOVED SINCE, AND THEY MOVE AGAIN AT `A127`, SO NEITHER IS READ AS THE OPERATIVE ONE: THE DECLARATION OWES `storeCreate` AS ITS ONE NAMED EXPORT — `11 → 1` — AND THE PRODUCT'S TWELVE OWN MEMBERS, `10 + 1 + 1 = 12`; a file still reading eight, nine or eleven names, or a four-, five- or seven-member product, is a FINDING, and an `A126`-era file reading `8 + 3 = 11` and `4 + 3 = 7` is read as that pass's own date and not as this one's** (`docs/specs/storeroom-js/surface.md §2.4` item `9 (f)`'s and `§2.9` item `1`'s `A127` clauses of 2026-10-16; `docs/decisions.md` · `A127` · `A128`, read with `A126` · `A123`). **AND THE OPERATIVE SURFACE THAT DECLARATION MUST DECLARE IS §1.1-bis's: ONE MODULE NAME AND THE STORE'S OWN METHODS.**

**AND TWO THINGS THE SHAPE BLOCK IMMEDIATELY BELOW DOES NOT YET CARRY, NAMED SO ITS SILENCE IS NOT READ AS THE DECLARATION'S:** **`StoreConfig` carries FOUR declared keys at `0.2.0` and the fourth — `constraints` — is OPTIONAL (§8.6), while the block shows three; and `StoreInstance`'s member list is SEVEN and the block shows three.** **Both are DECLARED at `bindings/js/index.d.ts` and at `docs/specs/storeroom-js/surface.md §2.1`, and the block is left at its `0.1.2`-era shape rather than silently completed — §12-bis records the state.** **⟶ AND THE SEVEN IN THAT SENTENCE IS SUPERSEDED WITH THE OTHER COUNTS AT `A127`: `StoreInstance`'s member list is TWELVE, `10 + 1 + 1 = 12` ✓ — the ten methods, `register` and `settle` — and the four keys are `filePath` · `journalLength` · `listeners` · `constraints` with the fourth OPTIONAL, so a block showing three members is short by nine and a block showing three keys is short by one** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause and `§2.1`'s clause of this date; `docs/decisions.md` · `A127` · `A128`).

```ts
export type Address = readonly (string | number)[];
export type Tier = 'mem' | 'file' | 'temp';
export type TierSet = Tier | readonly Tier[];

export interface StoreConfig { journalLength: number; listeners: readonly unknown[]; filePath?: string; }
export interface StoreRefusal { status: StoreStatus; message: string; }
export type Handle = object;
export type Listener = (address: Address) => void;
export interface BaseState { present: boolean; value: unknown; }
export interface JournalOp {
  opId: string; kind: string; address: Address; tier: Tier | null;
  before: BaseState; after: BaseState; seq: number; compacted: boolean;
}
export interface WriteRecord { op: JournalOp; watched: readonly Address[]; triggered: readonly Handle[]; }
export interface DeleteRecord { address: Address; tiers: readonly Tier[]; triggered: readonly Handle[]; }
export interface RollbackRecord { opId: string; undoneOps: readonly string[]; restoredTo: BaseState; }
export interface StoreInstance { register(...): void; on(...): Handle; off(...): void; }
```

**Two of those types have a story worth knowing, because both were once wrong in a way you would have met as a
compiler error on a correct call:**

- **`Address` carries `number` as well as `string`.** A segment may be a key or an index, and the declaration says
  so.
- **`WriteRecord.op` is a journal record and not a number**, `RollbackRecord.opId` is a **string**, and
  `RollbackRecord.undoneOps` is **a list of ids, not a count** (`bindings/js/index.d.ts`, the three record
  declarations, each with the shipped-error note beside it).

---

## §2 · Install and resolution

### §2.1 One name to install

```sh
npm install provident-storeroom
```

**The package pulls its own binary.** You do not install a platform package by hand and you do not need a Rust
toolchain if your runtime is one of the five covered pairs (§2.2).

### §2.2 The five platform packages

The addon ships as five separate packages, declared as `optionalDependencies` of the main one, **pinned exactly to
the package's own version — `0.2.0` at this release, five times:**

| runtime | platform package |
|---|---|
| Linux x64 (glibc) | `@auspicion/provident-storeroom-js-linux-x64-gnu` |
| Linux arm64 (glibc) | `@auspicion/provident-storeroom-js-linux-arm64-gnu` |
| macOS x64 (Intel) | `@auspicion/provident-storeroom-js-darwin-x64` |
| macOS arm64 (Apple silicon) | `@auspicion/provident-storeroom-js-darwin-arm64` |
| Windows x64 | `@auspicion/provident-storeroom-js-win32-x64-msvc` |

**WHAT THE SCRATCH CONSUMER MEASURED: the install pulled exactly ONE platform package — the one this machine's
runtime resolves.** That is the design, and it is the first thing to understand about this package's shape.

**AND THE PINS EQUAL THE VERSION FOR A REASON THAT MATTERS TO YOU.** The five pins are exact strings and no caret,
tilde, wildcard or `>=` range is lawful among them, because **npm's dedupe could otherwise satisfy the loader's
`require` with a differently-versioned copy hoisted into your tree** — a version of the binary other than the one
the entry asks for (`docs/specs/storeroom-publish/resolution.md §3.2` item 4 and its reconciliation clause, which
states the rule and carries the shipped figure). **So: do not "relax" those pins in a lockfile or a resolution
override.** An addon whose own `version` does not match the package's is not silently accepted — it is a declared
refusal (§2.4).

**Three practical consequences of the split:**

- **A lockfile built on one OS does not carry the others.** Build on each platform you ship, or a packaged app will
  be missing a binary for a platform you thought you supported.
- **The platform packages are `optionalDependencies`, and a bundler or a `--production` prune will drop them as
  "not obviously used"** — the main package requires the platform package by a computed name, so static analysis
  cannot see the dependency.
- **A `.node` cannot be loaded from inside an asar archive**, so an Electron pack must unpack it and the directory
  it lives in. `docs/guides/electron-integration.md §3.2` is where that is worked out.

### §2.3 The three resolution rungs

**The entry resolves its artefact in a declared order, and the order is the law:**

1. **the scoped platform package for this runtime's key** — the packaged-app path, and **the rung that fires in a
   published install**;
2. **the module-relative addon beside the entry module** (`build/Release/storeroom_js_binding.node`, built from the
   entry's own location and from no other source — no environment variable, no config key, no working-directory
   path, no parent-directory search) — **the checkout-only rung**;
3. **the package's single declared absent-addon form** — a thrown `{status: 'FilePathUnreachable', message: …}`,
   with **no instance returned**.

**Every throw at rung one is treated as a miss** — an absent package, a present-but-unloadable binary, any other
throw — so the loader moves to rung two rather than surfacing the throw (`docs/specs/storeroom-publish/resolution.md
§2.1` item 1). **And at rung two there is no version comparison; the version read applies at rung one alone**,
because a rung-two artefact is the checkout's own (`§5.1` item 3).

**THERE IS NO FALLBACK AND NO JAVASCRIPT SUBSTITUTE STORE.** An absent or failed addon refuses rather than
degrading: the package never falls back to a JS store, never absorbs the state silently, never returns a partial
instance and never substitutes a package-authored message or status (`docs/specs/storeroom-publish/resolution.md
§5.3` item 3). **`bindings/js/index.d.ts` states the same thing at `storeCreate`: no instance, no JS store, the one
thrown `StoreRefusal`.**

**AND ONE THING THE PACKAGE DOES NOT SHIP, STATED SO YOU DO NOT GO LOOKING FOR IT: no source, no `Cargo.toml`, no
`build.rs` and no build-on-install step.** The package's whole content is `index.mjs` · `README.md` ·
`index.d.ts` (`bindings/js/README.md`). **A consumer whose platform-and-architecture pair is not one of the five
gets no binary, is not offered a build route from the tarball, and would have to build the store crate from its
source themselves** — a limitation the readme states rather than a route it supports. **A covered consumer needs no
Rust toolchain; an uncovered consumer needs one.**

### §2.4 The one thing you should check first

**Construct a store and read the empty address.** If the loader resolved the wrong name, or the binary did not
load, this call is where you find out — and nothing else will tell you as cheaply.

```js
import { storeCreate, read } from 'provident-storeroom';

const store = storeCreate({ journalLength: 64, listeners: [] });
console.log(read(store, []));          // → {} for a fresh store
```

**WHAT THE SCRATCH CONSUMER SAW at the same call on a store with data in it:** `read(store, [])` answers
`{"greeting":"hello","tiered":"file-value","tree":{"kind":"anchor","leaf":42}}` — **the whole register as one
object.** On a fresh store the same call answers `{}`.

**If that call throws `FilePathUnreachable`, go back to §2.3; nothing else in this package will work until it
does.** And note the one hazard a lockfile cannot show you: **the five platform names are a declaration copied into
several files, so only actually installing the package from the registry falsifies them.** `docs/guides/
electron-integration.md §2.4` states that hazard in full and it is worth reading before you ship.

---

## §3 · The eight verbs

| verb | signature | answers |
|---|---|---|
| `storeCreate` | `(cfg: StoreConfig) => StoreInstance` | the instance handle — `{ register, on, off, settle }` |
| `read` | `(instance, address, tier?) => unknown` | a leaf's literal, a branch's assembled value, or the whole register |
| `readLiteral` | `(instance, address, tier?) => unknown` | the same, narrowed to a leaf — **a branch refuses** |
| `write` | `(instance, address, tier, value, commit?) => WriteRecord` | `{ op, watched, triggered }` |
| `delete` | `(instance, address, tier?) => DeleteRecord` | `{ address, tiers, triggered }` |
| `rollback` | `(instance, opId) => RollbackRecord` | `{ opId, undoneOps, restoredTo }` |
| `listen` | `(instance, address) => Handle` | a fresh opaque handle |
| `unlisten` | `(instance, handle) => void` | `undefined` — and a no-op success for a handle it does not know |

**Signatures are the published declaration's, verb for verb** (`bindings/js/index.d.ts`). **All eight are
synchronous and every one of them returns a fresh value.**

**⟶ AND THIS TABLE IS READ THROUGH TWO DATED CORRECTIONS, NEITHER OF WHICH MOVES A ROW OF IT.** **(a) DATED `2026-10-16`: THE SURFACE THIS TABLE LISTS IS NOT ELEVEN NAMES EITHER — the module namespace moved `8 → 11` on `A126` (`addConstraint` · `constraintOn` · `constraintOff`), and §1.1-bis declares the `0.3.0` reading, under which this table's `1` + TEN METHOD ROWS is `1` + the store's own members.** **(b) AND THE `instance` FIRST POSITION IN EVERY ROW OF IT IS THE `0.2.0` FORM: under `0.3.0` the receiver is the store and that position is DROPPED, so `read(instance, address, tier?)` is `a.read(address, tier?)` — the row's remaining positions unchanged, in their own order (§1.1-bis).** **The rows stand BYTE-FOR-BYTE, because each one is a correct statement of the version it was derived from, and the operative reading is §1.1-bis's** (`docs/specs/storeroom-js/surface.md §2.9` item `1`'s dated clause; `docs/decisions.md` · `A126`, `A127`).

**`storeCreate` takes one plain object carrying the store's four declared keys and no fifth of its own** — `journalLength`,
`listeners`, `filePath`, `constraints` (`bindings/js/index.d.ts`; `docs/specs/storeroom-js/surface.md §2.1`). **How
they behave is §8's subject, because `filePath` is the one that changes what survives a restart.**

**`delete` and `rollback` are the two whose surprise is worth reading in the sections devoted to them rather than
here** — §9 and §10. Each is a one-line trap if you assume the obvious thing.

---

## §4 · Addresses

```ts
type Address = readonly (string | number)[];
```

**An address is a path from the register, walked one segment at a time.** A segment is either a `string` key or a
**non-negative integer index** (`bindings/js/index.d.ts`, the `Address` declaration).

```js
read(store, [])                         // THE WHOLE REGISTER
read(store, ['users'])                  // a branch: its assembled value
read(store, ['users', 0, 'name'])       // a leaf's literal
```

**Five rules, each of which a reader guesses wrong at least once:**

1. **The empty address resolves to the register, and the register is itself a branch** — so it must be read with
   `read`, never `readLiteral` (§5.4).
2. **The empty string `''` is a legal key.** So is a string containing a `.` or a `/` — **there is no delimited
   address form; `'a.b'` is not an address at all and is refused as a shape** (`docs/specs/storeroom-js/crossing.md
   §1.3`, `AddressArg` rows 2 and 6).
3. **An integral segment is in domain up to `Number.MAX_SAFE_INTEGER`.** Anything integral above `2^53 − 1` is
   `AddressMalformed` — refused, never folded onto a nearby address (`docs/specs/storeroom-js/crossing.md §1.3`,
   the `AddressArg` row 3 range clause).
4. **An index aimed at the register is `AddressNotFound`** — the register is keyed by names and holds no index
   semantics (`docs/specs/storeroom-native/store-model.md §2.2`, arm `L-INT-REG`).
5. **An array with a hole is not an address.** A sparse address array is `AddressMalformed`, because the two
   readings of a hole disagree and neither may be chosen silently (`docs/specs/storeroom-js/crossing.md §1.4`
   item 2).

**And the sentence that saves the most time: a nested write does not create its parent.** That is §5.1, and it is
the first thing the scratch consumer got wrong.

---

## §5 · The six behaviours that will surprise you

**Each of the six below is a place a careful reader of the package's own readme would still guess wrong.** They
are here together, in the order a consumer meets them, and each carries the output the published `0.1.2` tarball
actually produced.

### §5.1 A nested write does not create its parent

**Writing beneath a path does not bring the path into being. The parent must already stand.**

```
▸ write ["tree","leaf"] with no ["tree"] first     → threw AddressNotFound:
    'tree' does not exist in '', keys are 'greeting', 'tiered'
▸ write ["tree"] — the parent, standing            → ["tree"]
▸ write ["tree","leaf"] again                      → ["tree","leaf"]
▸ read  ["tree","leaf"]                            → 42
```

**So an anchor is a thing you make, not a side effect of writing beneath it.** The first write above fails with
`AddressNotFound` and the message names the container it looked in (`''` — the register), and the keys that
container does hold (`'greeting'`, `'tiered'`).

**THIS IS DECLARED BEHAVIOUR AND NOT AN ACCIDENT OF `0.1.2`.** The write resolves the address one level lower
than its target — the target's parent — before it installs anything, and **a failed parent resolution is the
write's own failure: nothing is installed, and the code is the walk's own** (`docs/specs/storeroom-native/
write-and-read.md §3.2` items 1–2 and its arm `F-3`; the walk's `L-3` arm at `store-model.md §2.2` is the
`AddressNotFound`). The parent search is **tier-agnostic** and is a search **by address alone**.

**What to do about it: create the shape you mean, then fill it.** One way is a single structured write —
**writing an object or an array at a key mints the branch tree beneath it in one call**
(`docs/specs/storeroom-native/write-and-read.md §3.4`, arm `W-4`: *"turning any key/index that is a literal into a
leaf node and turning objects/arrays into branches until all keys have been mapped"*). The other way is the one the
demo took: write the parent first.

### §5.2 A branch assembles its children

**Once the parent stands, reading it gives you a plain object built from its contents — and that is not a bare
map of the children you wrote.**

```
▸ write ["tree"] — the parent, standing  → ["tree"]           (value written: { kind: 'anchor' })
▸ write ["tree","leaf"] again            → ["tree","leaf"]    (value written: 42)
▸ read  ["tree"] — the parent            → {"kind":"anchor","leaf":42}
```

**WHERE THAT SHAPE COMES FROM, so it is not a mystery.** The value written at `["tree"]` was `{ kind: 'anchor' }`,
and a structured write mints the branch tree beneath its target — so the target branch holds a child key `kind` with
value `'anchor'`. Then `["tree","leaf"]` added a second child key. **Reading the branch assembles one member per
key, each produced by the same read applied to the node that key points to** (`docs/specs/storeroom-native/
write-and-read.md §4.2`, arm `R-2`: *"convert to an object, using the same keys"*). **The assembled object is
exactly the branch's contents, in one flat shape.**

**Two further points a consumer should carry:**

- **A branch whose container is an array assembles an array instead**, dense from `0`, with its length the
  container's contiguous index count (`write-and-read.md §4.2`, arm `R-3`).
- **An empty container reads as `{}` or `[]`** — the two empty forms are distinct, and that distinctness is what
  makes the container kind observable at a read (`write-and-read.md §4.2`, `DD-1`'s clause).

**The kind of a container is decided at the write and inferred at the read** — so **a write whose value kind
contradicts the container's answers `ContainerKindConflict` rather than converting** (`write-and-read.md §3.4`,
arm `F-4`; §7's table). **That is a design decision you make once per key, not something the store repairs for
you.**

### §5.3 The tier order decides which version a read lands on — it is not a layered stack

**This is the single most surprising behaviour in the package, and the scratch consumer's own note calls it "the
opposite of what I assumed".** Driving one key up the tiers in ascending order:

```
▸ write ["tiered"] temp  = temp-value   → temp
▸   read now (temp wins alone)          → "temp-value"
▸ write ["tiered"] mem   = mem-value    → mem
▸   read now (mem outranks temp)        → "mem-value"
▸ write ["tiered"] file  = file-value   → file
▸   read now (file outranks mem)        → "file-value"
▸ read ["tiered"] on temp alone         → threw TierNotFound:
    'tiered' is not a version of '', versions are at file
▸ read ["tiered"] on file alone         → "file-value"
```

**Read the last two lines again: after the `file` write, the `temp` version is gone.** A read narrowed to `temp`
refuses `TierNotFound`, and **the message says where the version actually is — `versions are at file`.**

**So the tier order decides WHICH VERSION A READ LANDS ON. It is not a layered stack that retains what it
outranks.** Writing at a tier does not add a version beside the old one; at this release it removes the versions it
outranks, and one version is left holding the key.

**WHAT THE CLAUSES SAY, because this reading is not the demo's alone.** A write fires its arm by the tier of the
versions already at the key: **where the key holds a version at a tier LESS persistent than the write's, the write
purges the lower versions and then mints** — *"Purge is the write deleting any versions of the addressed node with
the same or less persistence"* — and **where the key holds a version at the SAME tier, the write purges the pair
and re-mints it, so the version count at that key does not grow** (`docs/specs/storeroom-native/write-and-read.md
§3.4`, arms `W-6` and `W-1`, citing the ruling they rest on; §3.2 item 3). **The tier's own words elsewhere are
where the order comes from: three tiers *"ranked by their persistence in descending order: file, mem, and temp"***
(`docs/specs/storeroom-native/write-and-read.md §3.1.1`).

**AND ONE THING THIS GUIDE WILL NOT DO: it will not turn that into a promise on the package's behalf.** Two states
are easy to read as one, and a consumer guide is not the instrument that decides between them:

- **The version eviction above is what `0.1.2` did, on the run this guide quotes.** Whether the store's own
  declared semantics and its shipped behaviour agree on this point, at every arm and every tier combination, **is
  not settled by a consumer guide** — and the scratch consumer's readme says the same thing in the same words:
  *"whether it is the contract's declared semantics or a defect is not decided here, and this demo is not the
  instrument that would decide it — the clauses are."*
- **What you can rely on as a consumer is narrower and is worth stating exactly:** the order `file` > `mem` >
  `temp` decides which version a read lands on; **a read narrowed to a tier the key does not hold refuses
  `TierNotFound` and names the tiers that ARE present**; and **the tier argument's arity differs by verb** (§5.5).

**There is one state in which two versions DO stand at one key at once, and it is the one to know about because it
is the exception that makes the rule readable: a SHADOW.** When the key holds a version at a tier MORE persistent
than the write's, the newer version is added alongside and the more persistent one survives — **the shadow wins the
unqualified read** (`write-and-read.md §3.4`, arm `W-5`, which the same clause reserves to the states the re-mint
arm does not reach). **So "one version per key" is not the invariant; "the write's own tier decides which versions
survive it" is.**

### §5.4 The root address is a branch — so read it with `read`, never `readLiteral`

```
▸ read [] — length zero, the whole register  → {"greeting":"hello","tiered":"file-value",
                                                "tree":{"kind":"anchor","leaf":42}}
▸ readLiteral [] — narrowed to a leaf        → threw ReadTargetIsBranch:
                                                 is a branch and not a leaf in '', it holds a branch
▸ readLiteral ["tree"] — the parent          → threw ReadTargetIsBranch: (the same code)
```

**The empty address is the register, the register is a branch, and `readLiteral`'s target must be a leaf — so
`readLiteral(store, [])` refuses.** **The same refusal comes from `readLiteral` on ANY branch**, and it is a
declared refusal rather than an empty answer (`write-and-read.md §4.1.1` item 3: the literal-only form *"refuses
exactly two states and nothing else"*, a branch target being one of them).

**The practical rule: `readLiteral` is for a leaf you are sure of. If you might be looking at a branch — and `[]`
always is one — use `read`.** At a leaf the two forms are indistinguishable; they differ only in what they refuse.

### §5.5 `write` and `delete` take exactly ONE tier token

**The tier argument's arity differs by verb, and it is deliberate.** Readers accept absent, one, or an array read
as an any-match set. **Writers and deletes take exactly one token.**

```
▸ remove ["tiered"] on ["mem"] — an array  → threw OutOfDomainTier:
                                               an array of tiers is not a tier, tiers are file, mem, temp
▸ remove ["tiered"] on mem — one token     → {"address":["tiered"],"tiers":["mem"],"triggered":[]}
```

**The array spelling is the READER's arity** (`bindings/js/index.d.ts`, the `TierSet` declaration, which says so
directly; `docs/specs/storeroom-js/crossing.md §1.3`, `TierArg` rows 2 and 3, whose table prints each verb's cell).
**Asking "do I have this anywhere durable or in memory?" is a legitimate question — `read(store, addr, ['file',
'mem'])` answers a node matching ANY of them. A write is going somewhere, and an array there would be a choice you
did not make.**

**And the tier's domain is three lowercase tokens: `file` · `mem` · `temp`.** `'secure'`, `'FILE'`, `'disk'`,
`'session'` and `''` are each outside it and each answers `OutOfDomainTier` — the last line of the refusal above is
the store naming its own domain (`write-and-read.md §3.1.1`, and its tier-domain clause). **`null` and `undefined`
are NOT tier-shaped values at all, so they answer `AddressMalformed` rather than `OutOfDomainTier`** — a distinction
the arity table prints cell by cell and worth knowing if you are routing tiers through a form.

**AND ONE PLACE WHERE `delete` IS NOT LIKE `write`, WHICH IS EASY TO CONFLATE BECAUSE BOTH TAKE ONE TOKEN.** **A
`write` at a tier purges the versions it outranks (§5.3); a `delete` at a tier removes THAT tier's version and
leaves every other tier's version at that key untouched.** **The demo's own line is the honest illustration rather
than a proof: `remove` at `mem` answered `tiers: ["mem"]` and changed nothing, because by that point §5.3 had left
only a `file` version standing — so the read after the removal, `"file-value"`, is the same line the demo printed
before it.** **What a delete DOES to a single-token target is the store's declared arm, not something that run
demonstrated: the named tier's version is removed with all of its downstream, and every other tier's version at that
key stands** (`write-and-read.md §4.4`, arm `D-1`).

**And the other delete states, so the receipt is never a surprise: a `delete` with no tier removes every version at
the target and all downstream of each; a `delete` of the empty address empties the register; and a delete that
removes nothing is a SUCCESS — it answers `tiers: []` rather than throwing** (`write-and-read.md §4.3`'s tier-scope
clauses and `§4.4`'s arm table, whose `D-1` · `D-2` · `D-3` and `D-5` rows are those states and whose `DD-9` clause
is the last one).

### §5.6 `rollback` undoes that op AND the ops after it

**`rollback` is not a single-op undo. It walks backward through the journal, from the newest in-scope entry to the
oldest, and every reversal it performs is named in its answer.**

```
▸ rollback that opId → {"opId":"op-10",
                        "undoneOps":["op-10","op-9","op-8","op-7","op-1"],
                        "restoredTo":{"present":false}}
```

**Note the two things that answer is telling you.** `undoneOps` carries **five** ids for one call, in reverse
append order — newest first. And `restoredTo` is `{"present":false}`: **the state the addressed subtree actually
stands at after the rollback**, which is "absent" here because the op being undone had created it.

**This is declared, and the clause is worth reading before you build anything reversible on it.** The scope is
*"every operation touching the same subtree"* as the named op — **not the last op alone, measured against the
written address's own subtree, at any tier** — and there is **no partial or subset rollback** (`docs/specs/
storeroom-native/write-and-read.md §6.4`, `M-5` and `M-8`). **`undoneOps` is a report of PERFORMED reversals and
never a report of in-scope entries**, which is why an entry whose parent chain an out-of-scope operation removed
does not appear in it (`§6.4` item 3 (i)).

**Three more things about the journal, each of which changes how you use it:**

- **The journal is not readable, enumerable, addressable or deletable by any other call.** There is no
  `journalEntries()`, no `journalLength()`, no `clearJournal()`. **`rollback` is its only consumer, and the op
  crosses to you as a returned value on every write** (`write-and-read.md §6.3`).
- **`journalLength` is your whole undo window.** It bounds the journal; the store compacts entries into a base
  state as it fills, and **a rollback whose candidate set includes at least one compacted entry fails
  `RollbackCompacted` AND UNDOES NOTHING — the floor is all-or-nothing and never partial** (`§6.1` `M-4`; `§6.4`
  `M-6`). Pick the length against how far back you ever expect to undo.
- **A rollback itself appends no journal entry, and an undone entry is marked `compacted: true`.** **The `compacted`
  flag is ONE predicate with TWO grounds** — compressed into the base state, or undone by a rollback — and the
  record carries no member to tell them apart (`§6.4` `M-9`). **So a `compacted` op you are holding is not
  necessarily an old one.**

**And a `rollback` performs no file I/O** — §8.4 states what that costs you.

---

## §6 · Refusals

**One failure surface, everywhere, and it is thrown:**

```js
try {
  const v = read(store, ['users', 0, 'name']);
} catch (e) {
  // e is a PLAIN OBJECT — never an Error subclass, never a rejected promise, never a tagged union
  const { status, message } = e;
}
```

**It is thrown synchronously from every verb. It is not a promise rejection and not a returned `{ ok: false }`.
`try/catch` is the whole error model** (`bindings/js/index.d.ts`, the `StoreRefusal` declaration).

**EVERY REFUSAL NAMES ITSELF** — by a `status` from the store's own closed set, and by a **human `message` that
carries the address, the domain, and what was found instead.** The message is generated from the code and the
failing trigger's arguments, never hand-authored at a call site: **the general shape is
`'<SEGMENT>' <mismatch clause> '<CONTAINER>', <available clause>`** (`docs/specs/storeroom-native/
seams-and-lifecycle.md §8.2`, whose rule and worked examples are the generator's own). **All six quoted refusals in
§5 match that shape, which is why they read like sentences.**

### §6.1 The statuses a consumer will actually meet

**Sixteen members, and this guide is explicit about which it observed and which it is reading from the type.**

| status | its trigger, in one line | how this guide knows |
|---|---|---|
| `AddressMalformed` | a segment outside the domain; an absent required argument; `null`/`undefined` for an address, tier or opId; a blank opId; a present construction argument outside its domain | **declared type** |
| `AddressNotFound` | the walk found no anchor at the segment's key — **including a nested write whose parent does not stand (§5.1)** | **measured** |
| `LeafHasNoDownstream` | the walk stood on a leaf with segments remaining | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — asserted off a real walk-through of a leaf at `bindings/js/test/surface.test.mjs:345`, and read off the same trigger at `bindings/js/greens/greens.mjs` `JSG-10.4`** |
| `TierNotFound` | the key exists but **no passed tier matches its tier** — **the read names the tiers that are present (§5.3)** | **measured** |
| `OutOfDomainTier` | a tier token outside `{file, mem, temp}`; **an array at `write` or `delete` (§5.5)** | **measured** |
| `ReadTargetIsBranch` | `readLiteral` resolved its target to a branch — **including the empty address (§5.4)** | **measured** |
| `WriteParentNotLink` | the resolved parent is a leaf and cannot hold a child | **declared type** |
| `JournalOpUnknown` | `rollback` called with an op id the instance's journal does not hold | **measured** |
| `RollbackCompacted` | a rollback whose scope includes at least one compacted entry — **and it undoes nothing** | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — the code is read off a real rollback whose candidate set holds the compacted entry, at `bindings/js/greens/greens.mjs` `JSG-10.12` and at `bindings/js/test/constraint-kernel-states.test.mjs:1138`** |
| `FilePathUnreachable` | **two unrelated states that share one member, and conflating them is the mistake this row exists to prevent** — **(a) NO ADDON LOADED at either rung (§2.3)**; **(b) a provided `cfg.filePath` that FAILED THE CONSTRUCTION-TIME REACHABILITY TEST** — an absent parent; the path is a directory; an existing file that is not writable; **a name occupied by a DANGLING SYMLINK**; a parent on a READ-ONLY MOUNT (`EROFS`); a create the process is DENIED (`EACCES`) — **and (b) is delivered at construction, BEFORE any instance exists, with NO instance returned** | **declared type**; **(a) measured at `0.1.2**, **(b)'s extended trigger list declared (`0.1.3`)** |
| `ValueNotAdmitted` | a write whose value is outside the admitted set (§6.3) | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — asserted off real writes at `bindings/js/test/surface.test.mjs:365`, `:483` and `:631`, and read off the same arm at `bindings/js/greens/greens.mjs` `JSG-10.15` and `bindings/js/greens/live-drive.mjs`** |
| `FileCommitFailed` | a `file`-tier write's failure path — serialization, the file write, or the journal append — **and the caller receives it AFTER the store's own journal rollback has already run** | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — the code is asserted off a real failing commit at `bindings/js/test/file-tier-save.test.mjs:563` and `:1389`, at `bindings/js/test/surface.test.mjs:691`, and at `bindings/js/greens/greens.mjs` `JSG-10.16`** |
| `ContainerKindConflict` | a write whose value kind contradicts the container's, or whose last segment's class contradicts the container's key domain (§5.2) | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — both directions of the arm are asserted off real writes at `bindings/js/test/surface.test.mjs:454` and `:466`, and `bindings/js/greens/greens.mjs` `JSG-10.8` and `JSG-10.23` read it** |
| `ParentAnchorMonotonicityViolation` | a write whose minted child anchor would outrank its parent's tier | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — a `file`-tier write at a register key is DRIVEN and read as this code at `bindings/js/greens/greens.mjs` `JSG-05.9` and `JSG-10.7`** |
| `ConstructionArgumentMissing` | `storeCreate` called with `journalLength` absent | **measured**; **MARKED `declared type` AS FILED AND CORRECTED 2026-10-16 (`role_proofreader`) — `bindings/js/test/surface.test.mjs:122` and `:568` assert the code off a real `storeCreate` whose `journalLength` is absent, and `bindings/js/greens/greens.mjs` `JSG-05.11` and `JSG-10.13` read it off the same trigger, so the rank is produced by a drive** |
| `ConstraintListInvalid` | `storeCreate`'s supplied `constraints` list carries an element that is not an `{ address, id }` pair, or whose `address` (or `id`) lies outside its domain — **and, at a boot over an existing `cfg.filePath`, a supplied pair whose `address` no longer resolves in the loaded state** (`§8.6`) | **measured**; **its construction arm and its load arm are DRIVEN — at `bindings/js/test/surface.test.mjs:576`, `bindings/js/test/file-tier-save.test.mjs:1202`, `bindings/js/greens/greens.mjs` `JSG-02.18` and `JSG-10.19`, and the `FTS-08`/`FTS-09` scenarios, whose greens set was also driven — **12/12**, `96` cells — through the battery named at §0-bis** |

**⟶ RE-SPELLED 2026-10-16 (THE PROOFREADING PASS, `role_proofreader`): THIS CELL AND §12's ROW BOTH PRINTED A STALE PARTITION AND NEITHER AGREED WITH THE TABLE ABOVE.** **THE AS-FILED FIGURES ARE NAMED AND THE COUNT IS RE-DERIVED FROM THE ARTIFACTS: at the table as this cell printed it, the as-filed count was *six* with a `0.1.2` measurement somewhere in the trigger and *nine* read from the type declaration and the code set alone. It is now SIXTEEN of the sixteen that a drive produces and NONE that is declared and never produced.** **THE SPLIT, RANK BY RANK: measured — ALL SIXTEEN, `1`…`16`, each named at its own row above with the drive that produces it; declared only — NONE.** **AND THE AS-FILED CELL READ *six* MEASURED AND *nine* DECLARED: the six the `0.1.2` tarball run answered stand measured, and the nine it never reached are now ANSWERED BY THE UNIT'S OWN DRIVES.** **The sixteenth member — `ConstraintListInvalid` — is the added one, read from the type and the code set alike, and it is DRIVEN.** **The `0.1.2` tarball measurement stands as the guide's own weaker evidence (§0), and none of the sixteen was measured on a `0.1.3`.** **The sixteen-member list is the declaration's own** (`bindings/js/index.d.ts`, the `StoreStatus` declaration, which prints all sixteen and adds an escape arm — see §6.4). **The triggers are the store's own** (`docs/specs/storeroom-native/seams-and-lifecycle.md §8.1`, the closed code set, each member with **the ONLY state that produces it**). **The split is stated here rather than smoothed over: all sixteen measured is now the truth of the drives, and a guide that called any of them unseen would disown a run that has answered it.** **And where a `0.1.2` measurement was taken it is of the `0.1.2` tarball: a trigger's EXTENDED list at `0.1.3` — the row below — is declared, and §0-bis states what makes it so: NO `▸` BLOCK IN THIS GUIDE WAS DRIVEN AGAINST A PUBLISHED `0.1.3` — the wall §12-bis reports is the pass's lack of a shell, and not an absent version.**

**★ AND THE ROW TO READ TWICE IS `FilePathUnreachable`, BECAUSE IT IS THE ONE MEMBER THAT ANSWERS FOR TWO UNRELATED FAILURES — and the pair most likely to be conflated is the one below it, not the one above.**

| the state | when you meet it | what it means for you |
|---|---|---|
| **`FilePathUnreachable`** | **at `storeCreate`, for a provided `filePath`** (or for an addon that never loaded) | **NO INSTANCE WAS RETURNED AND NOTHING WAS CREATED.** Your `store` is `undefined`; there is nothing to retry against. **The store never started.** |
| **`FileCommitFailed`** | **on a `file`-tier WRITE, on an instance that is running** | **THE INSTANCE IS FINE AND THE WRITE FAILED — AFTER THE STORE'S OWN JOURNAL ROLLBACK ALREADY RAN.** The store recovered itself; the change is not half-applied. **Surface it to the user rather than retrying blindly** (§8.3). |

**They are different states in every respect a handler cares about: a different moment, a different subject, a different recovery, and a different next act.** **`FilePathUnreachable` is a construction that never produced a store; `FileCommitFailed` is a store that is running and refused one write.** **A handler that branches on `status` and treats them as one "file problem" will retry a construction that cannot succeed, or discard a running store.**

**AND ONE TRIGGER IN THAT TABLE IS IN TENSION WITH ITS OWN NEIGHBOURS, SO A CONSUMER IS NOT LEFT TO DISCOVER IT:
`ConstructionArgumentMissing` — the code's rank-and-trigger row still prints *"`storeCreate` called with
`cfg.filePath` absent, or with `cfg.journalLength` absent"*, while the construction section's own amended table and
the JS parameter semantics both declare an ABSENT `filePath` IN DOMAIN, creating the register at `mem` and returning
an instance; only an absent `journalLength` still answers this code** (`seams-and-lifecycle.md §8.1` #12, whose
as-filed trigger stands, against `§7.1`'s amended construction table and `docs/specs/storeroom-js/
parameter-semantics.md §2.2` / `§2.3`). **This guide follows the construction table and the parameter row, because
they are the construction subject's own homes and they are the later reading** — **and it names the divergence here
so that a reader who opens the code set is not ambushed by it.**

**Where the trigger lines above compress, the clause is the instrument.** Two worth opening if you are writing a
handler: **`ContainerKindConflict` carries more than a value-kind mismatch** — a `string` segment aimed at an
array container, an integer segment aimed at an object container, and an index beyond a container's contiguous
range all share that one member (`seams-and-lifecycle.md §8.1` #7 and its extended-trigger clause; `§3.4`'s
index-range rule, whose observable is that **no gap is mintable and a read never assembles a hole**). And
**`AddressNotFound` is also what a sub-floor address answers on a `secure` instance** — there is deliberately no
floor-specific code (`§8.1` #2).

### §6.2 The one refusal that is not a `{status, message}`

**A registration can throw a JavaScript `TypeError` instead — and it carries no `status` and no `message` member
at all.** The instance's `register(handle, listener)` is a registration site rather than a crossing, and its
outside values are classified separately (`docs/specs/storeroom-js/surface.md §2.4` item 5 (d), whose four outside
classes are one form).

**It is worth knowing that this arm's form has moved.** The clause that replaced the as-filed `TypeError` with the
single `{status, message}` form — `status: 'AddressMalformed'` — is the operative reading at that site, and the
cells that still print the as-filed form are read through it (`surface.md §2.4`, its reconciliation clause, which
names every affected cell by `§`). **So: catch broad, and do not assume a failed registration necessarily carries a
`status`.** The package's own readme states the same in one line, printing `register`'s answer with *"a
non-function listener or a handle this instance never minted throws a `TypeError`"*.

**`off` has three arms and they are the contrast worth carrying beside it** — and this site is exactly where the
package's registry and the store's own registration part company:

| what you pass to `off` | what happens |
|---|---|
| a handle this instance holds a function for | **the store-side withdrawal AND the registry entry's removal**, then `undefined` |
| a handle this instance minted or adopted, with no function held for it | **`undefined`** — nothing was there to remove, the store-side withdrawal is still performed, and no other registration is disturbed |
| a value this instance never minted and never adopted | **a refusal** — the single `{status, message}` form, `status: 'AddressMalformed'` (the amended form; the as-filed `TypeError` cell beside it is read through the amendment) |

**`unlisten` has no third arm: over any value outside the domain it is a plain no-op success** — a handle a foreign
instance minted, a prior session's handle, a fabricated one, a blank token, a non-opaque value — **producing no code
and removing no other registration** (`docs/specs/storeroom-js/surface.md §2.3` item 4, which states the no-op set,
and `§2.4` item 7 (b)'s three-arm table, which states `off`'s arms with their observables; `bindings/js/index.d.ts`
prints both. The reason they differ: `off` acts on the package's own state, which no store rule governs, while
`unlisten` is the store-facing verb whose in-domain answer for an unknown handle is already declared).

**And `off` is the STRONGER of the two, not the weaker.** **`off` performs the store-side withdrawal AND removes the
package's registry entry; `unlisten` withdraws the registration, never the function** — so a withdrawn handle still
sits in the registry, and a trigger that carries it later invokes nothing, silently (`surface.md §2.4` rule 4 and
item 7 (b)'s reconciliation with it). **`off` is therefore the declared way to remove a function; calling both is
redundant, and calling only `unlisten` leaves the function registered.**

### §6.3 What may cross as a value

**The crossing is a deep copy in both directions.** When you write, the store copies your value into itself; when
you read, it copies out. **Neither side holds a reference to the other's data, at any verb, at any argument
position, at any return position** — so you may drop your reference immediately after a write, and a value you read
is yours to mutate (`docs/specs/storeroom-js/crossing.md §1.1`, the four clauses).

**Therefore: values must be structured-clone-compatible, and the admitted set is narrow.** Admitted: **strings,
booleans, finite numbers, plain objects and arrays.** Refused with `ValueNotAdmitted`, at any depth:

- **`null` and `undefined` — always, everywhere, including an object member `{a: undefined}`.** **The member is not
  dropped and its key is not skipped** — the whole value is refused, because any other answer would drop a member
  silently.
- **functions, symbols, `BigInt`, `NaN`, `Infinity`, `-Infinity`.**
- **cyclic values** — refused on the walk's own ancestor stack.
- **anything that is not a plain collection**: a `Map`, a `Set`, a weak collection, a typed array, an
  `ArrayBuffer`, a `DataView`, a `Date`, a `RegExp`, a `Promise`, an `Error`, a `Proxy`, a class instance, an object
  wrapper around a primitive (`new String('a')`, `new Number(1)`).
- **a sparse array** (`[1, , 3]`), an object or array carrying a `Symbol`-keyed own property, an object carrying an
  accessor (a `get`/`set`) own property, and a class extending `Array`.

**The whole table is `docs/specs/storeroom-js/crossing.md §1.2`, one row per class, with each class's refused forms
and its answer.** **Two rows deserve a line of their own because they are the ones that bite:**

- **A plain object from ANY realm is accepted** — `Object.create(null)` included, and a plain object that crossed a
  `vm` or a worker boundary. **What is refused is a class instance, not an object from elsewhere.**
- **The walk refuses a value whose nesting depth exceeds 64 or whose visited-node count exceeds 1,000,000, with
  `ValueNotAdmitted` — and there is no configuration knob for either bound** (`crossing.md §1.4` item 5, and its
  dated clause, which places the arm at the package's own walk, before any verb is called).

**The practical rule, if you are storing something that came from a form, a JSON payload or an IPC message: you
are already inside the domain.** The failures come from storing *live* things — a class instance, a `Date` you
meant to serialize, a DOM node, a `Buffer`. **Serialize at the boundary, once, consciously.**

### §6.4 The set is open by design

**`StoreStatus` carries an escape arm — `(string & {})` — and its presence is load-bearing rather than
looseness.** The store's own set has already grown twice, from fourteen members to fifteen and then to sixteen, and
a future release may add a seventeenth; **an immutably-enumerated union would mis-type a lawful refusal the moment
the store's set moved** (`bindings/js/index.d.ts`, the `StoreStatus` declaration and the clause under it).

**So: do not `switch` on these without a `default`, and never treat an unknown `status` as success.** The set is the
store's to close and the package mints no member, widens no set and renames none.

---

## §7 · Tiers, and how a read picks a version

**The tier order is `file` > `mem` > `temp` in persistence**, and **what each tier means for you is lifetime**:
`temp` shadowed by writes to `mem`; `mem` for the session; `file` for anything that must be there on the next boot
(`docs/specs/storeroom-native/write-and-read.md §3.1.1`, the tier-domain clause, and the adoption dossier's tier
row, which names `mem` as lost on process exit).

**How the arity differs, verb by verb:**

| verb | `tier` absent | one token | an array | `null` / `undefined` |
|---|---|---|---|---|
| `read` · `readLiteral` | legal — the lowest persistence present | legal | **legal — an any-match set** | `AddressMalformed` |
| `write` | `AddressMalformed` | legal | **`OutOfDomainTier`** | `AddressMalformed` |
| `delete` | legal — every tier at the target | legal | **`OutOfDomainTier`** | `AddressMalformed` |
| `listen` | legal — the registration is address-keyed and carries no tier | — | — | `AddressMalformed` (on the address) |

**This table is the store's closed arity census, cell for cell** (`write-and-read.md §3.1.1`, and its own
`null`/`undefined` column clause, which explains the last column: an out-of-domain token is a tier-shaped value
outside the domain, while `null` is not a tier-shaped value at all). **`listen`'s row needs one footnote, and the
amendment that adds the row states it in two clauses: the verb's arity is `one address, no tier`, so a tier-shaped
second argument is an argument the arity does not carry and its answer is `OutOfDomainTier`; and the declared
surface carries ONE argument and no tier slot at all** (`§3.1.1`, items 2 and 4 of that amendment).
**And `listen` is not alone in having a narrow arity — `unlisten` takes a handle and no tier either**, which is the
same table's own row (`§3.1.1`).

**And the selection rule, which is the whole of "which version does a read land on":**

- **`tier` absent** — the lowest-persistence anchor at each address is selected (`write-and-read.md §2.3`, the
  zero-tier arm).
- **`tier` passed, one or many** — the anchor's tier must be **one of them**, and where several match, **the
  lowest-persistence member of the matched set answers** (`write-and-read.md §4.2`, arm `R-4`).
- **A set is a SELECTOR at every address the assembly reaches, and a member no passed tier covers is OMITTED — not
  refused.** That is the operative reading of the assembly's tier scope, and it is stated with its reconciliation
  and its price (`write-and-read.md §4.2`'s reconciliation clause and `store-model.md §2.2`'s, both citing the
  bounded assembly-scope determination; the as-filed *"assembles nothing for it"* / *"never omits a member in
  silence"* wording is superseded there and the fail set is unchanged).
- **A WALK step is not the assembly.** When the walk itself is passed tiers, the filter applies **at every step it
  takes** — the addressed step and every pass-through step — and a step whose key exists but matches no passed tier
  refuses `TierNotFound` (`store-model.md §2.2`'s tier-filter scope clause). **So a tier-qualified read can refuse
  at an address a set does not cover on the way to a target, while omitting members beneath it.**
- **A read with an empty tier array is legal and is the zero-tier arm** — the lowest persistence, nothing omitted
  (`write-and-read.md §3.1.1`, the zero-token cell).

---

## §8 · Construction, and the `file` tier

### §8.1 The four declared keys and no fifth

```js
const store = storeCreate({
  journalLength: 256,          // REQUIRED — a positive integer, counting journal ENTRIES
  listeners: [],               // REQUIRED, even when empty — an absent `listeners` is refused
  filePath: './store.json',    // OPTIONAL — this is what makes a `file`-tier write persist
  constraints: [],             // OPTIONAL — the application's own constraint list; NOT persisted (§8.6)
});
```

**Four keys and no fifth** (`bindings/js/index.d.ts`, the `StoreConfig` declaration; `docs/specs/storeroom-js/
surface.md §2.1`, which adds that the package passes each through without adding a default, a rename or a key of
its own — **a key YOU add beyond the four the caller supplies is what `§2.1`'s *"NO FIFTH KEY"* governs, and a
caller-supplied extra key is IGNORED rather than refused**). **What each one does:**

- **`journalLength` is REQUIRED and there is no defaulted length.** An absent `journalLength` answers
  `ConstructionArgumentMissing` — *"the ONE absence the amended construction still refuses"* — while a present but
  out-of-domain value answers `AddressMalformed` (`docs/specs/storeroom-js/parameter-semantics.md §2.3`, `PAR-JS-3`,
  whose observable column prints both). **The alternative — a fabricated default — is priced and refused, on the
  ground that the caller owns the value** (`PAR-JS-3`'s `alt` cell). **It bounds the journal, which is what
  `rollback` walks (§5.6).**
- **`listeners` is REQUIRED, and an absent `listeners` is the one absence construction does not admit** — it
  answers `AddressMalformed` and returns no instance (`docs/specs/storeroom-js/crossing.md §1.3`, `ListenersArg` row
  5; `parameter-semantics.md §2.4`). **Pass `[]` when you have none — that is the normal case.** Elements are
  `{ address, handle }` records with a plain non-empty string handle; **a malformed member is admitted by the type
  and refused by the store, and a rejected array admits nothing and returns no instance.**
- **`filePath` is what makes the `file` tier real.** **Absent is in domain: the register is created at `mem` and no
  instance is harmed by it** (`crossing.md §1.3`, `FilePathArg` row 2; `parameter-semantics.md §2.2`, whose domain
  cell prints *"ABSENT — which is IN DOMAIN and creates the register at `mem`"*). **Point it at a writable,
  per-user, app-owned location and create the directory first**: a parent directory that does not exist, a path
  that is a directory, and an existing-but-not-writable path each answer `FilePathUnreachable` with **no instance
  returned and nothing created by the probe** (`PAR-JS-2`'s outside-value cell, three named forms; `FilePathArg`
  rows 4–6). **★ AND THE LIST OF REFUSED FORMS IS LONGER THAN THOSE THREE AT `0.1.3` — a name occupied by a
  DANGLING SYMLINK, a read-only mount's `EROFS` and a denied create's `EACCES` join them, and A PROVIDED ABSENT
  PATH IS NOW CREATED AT CONSTRUCTION. §8.5 IS THE TABLE; read it before you choose the path, and read the
  sentence beside this one as the three forms it was written for.**
- **`constraints` is the fourth key and the only OPTIONAL one of the four.** **Your list, held for the
  instance's life, never written to the file, and validated at create — and again against the loaded state at a
  boot over an existing `filePath`** (`docs/specs/storeroom-js/parameter-semantics.md §2.21`, `PAR-JS-21`; §8.6
  below carries the domain, both refusal instants and the `ConstraintListInvalid` answer).

**A construction-time fact worth carrying: the register's own tier is fixed at creation and never moves** — `file`
where a `filePath` was provided and passed the probe, `mem` otherwise (`docs/specs/storeroom-native/
write-and-read.md §3.2`, the register's-tier clauses and their amendment). **That is the parent anchor the
monotonic clause is evaluated against at a register key — so in a `mem`-register store the `file` tier is
unreachable at register keys and, through the chain, below them** (`write-and-read.md §3.2` item 4's operative
reading, citing the register's conditional tier). **And the write's own tier never tiers the register** (`§3.2`'s
clause beside it).

### §8.2 The file the store leaves behind

**A `file`-tier write commits a file at `cfg.filePath`.** The scratch consumer's store left a **23-byte
`demo-store.json`** behind after the run, holding `{"tiered":"file-value"}` — **which is worth reading twice: the
file carried the `file`-tier version and nothing else, and it is a small, readable JSON object.**

**THE FILE IS THE STORE'S, NOT YOURS.** Do not read, edit, parse or migrate it by hand — its shape is the store's
own, and a hand-migration is a corruption waiting to happen. **If you need a migration, read the old value through
the store and write the new one through the store.**

**A fresh instance over an equal `filePath` sees the file tier's versions.** That re-boot is the store's own
declared boot (`docs/specs/storeroom-native/seams-and-lifecycle.md §7.2` item 6, cited by the clauses below) — and
it is also the source of the two readings in §8.3 and §8.4.

### §8.3 A `file`-tier write is the only thing that commits the file — and the WRITE VERB is not what performs it

**A `file`-tier write is the arm that touches the file.** **A `mem`- or `temp`-tier write performs no file I/O**
(`docs/specs/storeroom-native/write-and-read.md §7.2` item 5, cited by the failure clause the delete carries).

**★ AND THE VERB ITSELF PERFORMS NO FILE I/O ON ANY OF ITS ARMS — the save belongs to the package's own terminal arm, and this is the reading most likely to be guessed wrong.** **`write` reaches the store, answers its record, and no byte of `cfg.filePath` moves while it runs** (`docs/specs/storeroom-js/surface.md §2.11` clause 2, the one home of the rule). **The `file`-tier commit is performed by the instance's own `settle` member, at the TERMINAL ARM of a kernel-driven pass and ON THE PASSING ARM ALONE — as the FIRST thing that arm does, before any listener body is invoked — and it is keyed by the `op` the record carries. So a `file`-tier write's durability lands when the pass settles on its passing arm, and a pass that fails on constraints performs NO save at all: the bytes stand byte-identical to what they were before the write.**

**AND ON A SAVE THAT FAILS — the act itself failing, not a constraint — the FILE TIER ROLLS THE WRITE BACK IN THE JOURNAL AUTOMATICALLY, and the failure reaches the caller AFTER that rollback has run**, so the caller receives `FileCommitFailed` (rank `15`) **and never the rolled-back state**, and the package compensates for nothing (`write-and-read.md §6.4` item 8, citing the ruling; `seams-and-lifecycle.md §8.1` #14, whose trigger column names all three parts of the failure as ONE failure; `surface.md §2.11` clause 5, which declares the order; `bindings/js/README.md` states the caller-facing consequence). **A constraint violation the pass itself carries is the OTHER arm and the OTHER code: `ConstraintListInvalid` is the supplied list's own validation failure (`§8.6`) and `FileCommitFailed` is neither reachable from it nor the reverse — the two triggers do not overlap.**

**So `FileCommitFailed` is the one refusal on the list to take seriously** — surface it to the user rather than
retrying blindly, because the store's own recovery has already happened by the time you see it.

### §8.4 A `delete` and a `rollback` perform no file I/O

**This is a reading a consumer will otherwise guess wrong, and it is stated in the package's own readme.**

**A `delete` — at ANY tier scope, INCLUDING a delete that removes `file`-tier versions — performs no file I/O**
(`docs/specs/storeroom-native/write-and-read.md §4.3`'s closing clause, citing the declared default and the
lifecycle clause). **The bytes at `cfg.filePath` remain the bytes of the last successful `file`-tier write, and a
fresh construction at the same `filePath` re-boots from those bytes — so the version the delete removed in memory
STANDS AGAIN after the re-boot.** The clause says in as many words that **that re-boot is the store's own declared
boot and not a defect**, and prices the alternative (a file-committing delete, which would need a second failure
arm).

**And a `rollback` performs no file I/O either**, for the same reason: it appends no journal entry and is not one of
the two tracked verbs (`write-and-read.md §6.4` `M-9`). **The package's own readme states both readings together in
one clause** — *"a consumer that deletes a `file`-tier version and then constructs a fresh instance over an equal
`filePath` sees the removed version STAND AGAIN — that re-boot is the store's own declared boot and not a defect"*.

**What this means for you, in one line: durability is a property of `file`-tier WRITES. A delete or a rollback
changes the running store; it does not rewrite the file. If you delete something durable and the process then
restarts, expect it back — and delete it again after the boot, or write over it.**

### §8.5 ★ What a `filePath` DOES at construction — the state-by-state table

**DECLARED, NOT MEASURED ON `0.1.3`: nothing below was driven against a published `0.1.3`; every cell is the contract's rule, and §0-bis says why.** **The rule's home is `docs/specs/storeroom-native/contract.md §10.4`, parts `1` through `5` — part `1` the two-armed predicate, part `2` the exclusive primitive, part `3` the created empty file, part `5` the refusal — with the refusal's full trigger list at `docs/specs/storeroom-native/contract.md §8.1` #13's amended trigger clause. CITE THEM BY `§`, never by line.**

**THE ONE-LINE VERSION: a `filePath` given a path that is ABSENT AND CREATABLE IS CREATED AT CONSTRUCTION — exclusively, zero-length — and a path that is occupied by anything, or that the process cannot in fact create, is REFUSED AT CONSTRUCTION and returns NO instance.** **Read the table as the answer to *"what does `storeCreate` do to my filesystem"*, because that is now a real question with a real answer.**

| the state of `cfg.filePath` | what `storeCreate` answers | what it leaves behind |
|---|---|---|
| **ABSENT, and the parent exists and is a directory the process can create in** | **an INSTANCE**, with the register's tier fixed at **`file`** | **THE STORE'S OWN FILE, EXCLUSIVELY CREATED AND ZERO-LENGTH — `0` bytes, no register key, no journal entry, no registration committed** |
| **ABSENT, and the parent DIRECTORY DOES NOT EXIST** | **`FilePathUnreachable`** | **NOTHING — no instance and no file, directory or byte created** |
| **the path IS A DIRECTORY** | **`FilePathUnreachable`** | **NOTHING** |
| **the name is occupied by a DANGLING SYMLINK** | **`FilePathUnreachable`** | **NOTHING — and the symlink is UNTOUCHED.** **A name occupied by an entry of ANY KIND is an OCCUPIED name: the write-mode open answers `ENOENT` and refuses, and the create's `AlreadyExists` never falls through to a report of an act it did not take** |
| **ABSENT, and the parent lies on a READ-ONLY MOUNT (`EROFS`)** | **`FilePathUnreachable`** | **NOTHING** |
| **ABSENT, and the process is DENIED the create (`EACCES`) — an access ACL, an ownership mismatch, or a parent whose mode bits say writable while the kernel denies it** | **`FilePathUnreachable`** | **NOTHING** |
| **ABSENT, and the create fails for ANY OTHER reason than the one fall-through above (`EEXIST`-outside-the-fall-through included)** | **`FilePathUnreachable` — the refusal is the KERNEL'S OWN ANSWER on every arm, so there is no residue case to enumerate** | **NOTHING** |
| **an EXISTING, WRITABLE file** | **an INSTANCE** | **YOUR BYTES ARE UNTOUCHED — never truncated.** The construction opens it for WRITING to test reachability and writes no byte; **the create is tried first and its `AlreadyExists` falls through to that open**, which is why a bootstrap can never destroy a persisted register |
| **a SYMLINK WHOSE TARGET IS A REAL WRITABLE FILE** | **an INSTANCE — accepted** | **★ A NAMED LIMITATION, NOT A RULE — see below.** |

**THE TWO THINGS TO TAKE FROM THE TABLE, since both are the opposite of what a careful reader guesses:**
1. **AN ABSENT PATH IS NO LONGER LEFT ABSENT.** The construction is itself a filesystem act. **If your own arrangement of the path depends on its absence — a probe, a marker, a sentinel — the store will have occupied it before you look.**
2. **AN EXISTING FILE IS NEVER TRUNCATED, AND THAT IS DELIBERATE RATHER THAN INCIDENTAL.** The primitive is an **EXCLUSIVE** create, never a truncating one, **because truncation would destroy a file carrying committed bytes before the store's own boot could read it** (`contract.md §10.4` part `2`; the same part's fall-through clause). **So `storeCreate` over an existing store's file is safe; it is not a reset.**

**★ AND THE NAMED LIMITATION, WHICH IS A LIMITATION AND NOT A CONTRACT RULE: a symlink to a real, writable file is ACCEPTED at construction — the write-mode open succeeds — and then the FIRST `file`-tier commit's sibling write, renamed over `cfg.filePath`, REPLACES THE LINK ITSELF WITH A REGULAR FILE.** **So the indirection your construction accepted is destroyed by the first durable write, and the file your link pointed at stops receiving the store's bytes.** **NO CONTRACT PART AND NO `DD` ROW PRINTS A RULE FOR THIS STATE, AND THIS GUIDE IS NOT THE INSTRUMENT THAT DECIDES IT: each of the three available remedies — accept-and-replace (today), refuse a symlink at construction, or commit THROUGH the link by resolving the path once — changes a declared observable or moves the write's declared atomicity off the named path, so the choice is THE ARCHITECT'S and needs a fresh ruling plus a bounded amendment** (`docs/defects.md`'s `DEF-2026-10-13-D` disposition clause, which declares it a LIMITATION so no reader infers a rule). **Priced against your own use: if you point `filePath` at a symlink deliberately, know that the store will end up holding a regular file at that name and that the link is gone.**

**AND ONE THING THAT USED TO BE ABLE TO LEAVE A MESS AND CANNOT ANY MORE: EVERY CONSTRUCTION ARGUMENT IS VALIDATED BEFORE THE CREATE, SO A FAILED CONSTRUCTION LEAVES NOTHING BEHIND.** **A construction whose `listeners` argument is malformed — or absent — is REFUSED BEFORE any filesystem act, and `journalLength` is checked before that**, so **A FAILED CONSTRUCTION LEAVES NO INSTANCE, NO FILE, NO DIRECTORY AND NO BYTE — and that holds for the LATER-argument failures too, which is exactly what the ordering buys** (`contract.md §10.4` part `4`, which fixes the argument order and moves the `listeners[]` domain check ahead of the create, read with part `5`, which draws the consequence; `seams-and-lifecycle.md §7.1` step `3`-bis; `docs/specs/storeroom-js/crossing.md §1.3`'s `ListenersArg` row `5`). **It is why an absent `listeners` costs you nothing but the error.**

### §8.6 The fourth key, `constraints` — supplied by YOU, and never persisted

**`constraints` is the construction's fourth declared key and the only one of the four that is OPTIONAL** (`bindings/js/index.d.ts`, the `StoreConfig` block; `docs/specs/storeroom-js/surface.md §2.1`'s dated clause; `docs/specs/storeroom-js/parameter-semantics.md §2.21`, `PAR-JS-21`). **An absent `constraints` is IN DOMAIN: no list is declared, and nothing downstream of it changes.**

- **The list is a plain array of `{ address, id }` pairs** — an `address` in the address domain of §4, and an `id` that is a NON-EMPTY string (an empty `id` is outside the domain and is refused — `docs/specs/storeroom-native/contract.md §8.1` rank `16`'s trigger clause, whose element shape `§7.2` item 6 fixes; the JS side's element type is `bindings/js/index.d.ts`'s `constraints?: readonly { readonly address: Address; readonly id: string }[]`).
- **★ THE LIST IS NOT PERSISTED — NOT IN THE FILE, NOT AS A REGISTER KEY, AND NOT IN ANY JOURNAL ENTRY.** **The importing application supplies it at startup from its own information**, and the store holds the pair's `address` and `id` for the instance's life only (`A: docs/decisions.md` · `A118`: *"The list is not persisted, the importing application will provide the constraints on startup from its own information."*).
- **It is validated at TWO instants, and both answers are the STORE'S OWN code, `ConstraintListInvalid`** (`docs/specs/storeroom-native/contract.md §8.1` rank `#16`, whose rank `15` is `FileCommitFailed` and whose two triggers do not overlap):
  1. **AT CONSTRUCTION**, before any instance exists — an element that is not a pair, or whose `address` lies outside the segment domain. **No instance is returned.**
  2. **AT A BOOT OVER AN EXISTING `cfg.filePath`** — every supplied pair's `address` is resolved against the LOADED state. **An address no longer present in the image refuses the boot with `ConstraintListInvalid` and NO instance, and the file's bytes stand byte-identical** (`A: docs/decisions.md` · `A119`: the exemption is the FILE'S emptiness, so a ZERO-BYTE file boots an instance while a present two-byte `{}` image IS validated; a key the list does not name is NOT a failure).
- **What the key does NOT do here, said because this guide is a consumer guide: it declares a list, not an engine.** **Nothing in this package runs constraints, repairs nothing and refuses nothing on a constraint's verdict** — the evaluation the key feeds is a caller-side concern (`docs/specs/storeroom-js/surface.md §2.11` is the seam's own arm, and §2.4 item 9 is the member that carries it). **★ SCOPE, SO *"NOTHING RUNS"* IS NOT READ AS *"NOWHERE"*: THIS DENIES AN ENGINE AND NOT AN EVALUATION — THE LIST THE KEY DECLARES IS EVALUATED, IN THE FIRST OF §9's TWO LAYERS, BEFORE THE `file`-TIER SAVE, AND THE LISTENERS' LAYER FOLLOWS IT (§9's dated two-layer clause, `:908`).**

**⟶ AND TWO PARTS OF THIS SECTION ARE SUPERSEDED BY THE SURFACE THIS PAGE NOW DESCRIBES, DATED `2026-10-16`, AND BOTH ARE NAMED RATHER THAN LEFT TO A READER — THE SECTION IS KEPT BYTE-FOR-BYTE BECAUSE EACH SENTENCE WAS A TRUE READING OF THE VERSION THAT WROTE IT.** **(a) THE ELEMENT'S SHAPE: *"a plain array of `{ address, id }` pairs"* READS THE PAIR AS THE ELEMENT'S KEY AND NEVER AS THE WHOLE OF THE ELEMENT — **THE ELEMENT IS `{ address, id, constraint }`, the pair is its addressing and THE FUNCTION IS ITS SUBSTANCE**, so the list you supply carries the constraint function at each element** (`docs/specs/storeroom-js/surface.md §2.12` item `1` (i)'s dated clause, which is the re-derivation's own home — an element carrying a well-formed pair but no function IS admitted by the store's list rule and is NOT a CARRIED pair, which is why the toggles refuse at it). **AND THE TWO VALIDATION INSTANTS ABOVE DO NOT MOVE: they are the store's own, they test the element's SHAPE, its `address` and its `id`, and the function stands at NO position of that domain** (`docs/specs/storeroom-js/parameter-semantics.md §2.21`, unchanged). **(b) *"Nothing in this package runs constraints"* IS FALSE OF THE SURFACE THIS PAGE NOW DESCRIBES AND TRUE OF THE ONE IT WAS WRITTEN FOR: THE ENGINE SHIPS IN THE TARBALL AND RUNS, and the constraint limbs are evidenced only by a battery driving INSTALLED bytes** (`docs/decisions.md` · `A121`, `A122`; `docs/specs/rca-0.2.0-shipped-surface.md` `§7` `R1`/`R2`). **AND WHAT THE SECOND HALF OF THE SENTENCE STILL CARRIES STANDS: the EVALUATION'S ANSWER IS STILL NOT YOURS TO READ OFF THE STORE — there is no getter, no attempt log and no verdict member in this surface, and the constraint's own refusal reaches you the way every other write failure does** (§1.1-bis's private-state rule; §6.2).

---

## §9 · Watching for changes

**Listeners fire on `write` and `delete`, and never on read.** A read is not a change, and a store that fired on
reads would fire on every render. **Nor does a `findAddress`, a boot or any read-driven traversal fire a listener**
(`docs/specs/storeroom-native/write-and-read.md §6.5`, whose listener clauses enumerate what fires and what does
not).

```js
const handle = listen(store, ['greeting']);       // the module-namespace verb: address only
store.register(handle, (address) => {             // the instance member: handle + your function
  console.log('changed at', address);
});
unlisten(store, handle);                          // withdraw it
```

```
▸ watch ["greeting"], then write it twice  → [["greeting"],["greeting"]]
▸ unlisten, then write again               → [["greeting"],["greeting"]]   (no further calls)
```

**The listener's ONE argument is the TRIGGERING ADDRESS** — the address whose triggering produced the event — **so a
listener registered at `['users']` can tell you which user changed.** Two different data travel on a trigger and
they are easy to conflate: **the handle in a `triggered` list decides WHICH function is invoked, and the address
passed to the invocation tells it WHAT happened** (`docs/specs/storeroom-js/surface.md §2.4` item 6 (d), whose
two-row table separates them; the model it states is the ruling that *"JS then has to match id to the function it
was set with"*).

**What the store actually does is return handles — it never invokes anything.** **The store returns the handle set
in the record's `triggered` member and invokes nothing; the invocation is the CLIENT'S act, and the package's
per-instance registry is the id→function map** (`write-and-read.md §3.5`'s amended record and the store-side clause
it cites: *"the store NEVER invokes a callback"*; `surface.md §2.4` items 5–6). **That is why a registration is a
member of the instance and not a function you hand to the store.**

**Four rules, and they are the store's and the package's rather than yours to reimplement:**

1. **An unregistered handle fires nothing, silently.** No warning, no log, no code. **The silence is an assertable
   observable** (`surface.md §2.4` rule 1, and item 6 (c), which adds that the absence of a call, of output and of
   an exception are each declared observables).
2. **A second `register` for one handle replaces the first.** One handle, one function — the registry is not a
   fan-out, and the replaced function is dropped without notice (`§2.4` rule 2).
3. **`triggered` membership is decided by address and by nothing else** — a handle appears exactly where **its
   listener's address is a PREFIX of the triggering address** (`surface.md §2.3` item 5, which now inherits and
   points at the store's own clause). **So a listener bound at a strict descendant of a deleted address does NOT
   fire** (`write-and-read.md §4.4`'s firing clause).
4. **A registration made during a firing window is not invoked during that window.** **A delivery's recipient set
   is read from the array as it stands when the window opens**, and a registration, replacement or withdrawal made
   during it takes effect at the next trigger (`surface.md §2.4`, the delivery-window clause, with its argument
   for why that is the only reading consistent with the contract).

**★ ADDED 2026-10-16 (`role_proofreader`) — ONE WRITE'S SET IS DELIVERED IN TWO LAYERS, AND THE HANDLE IS THE UNIT OF NEITHER.** **EVERY CONSTRAINT of that write's triggered set is evaluated BEFORE the durable save; EVERY LISTENER of it is invoked AFTER that save** (`docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 3 AS RE-SPELLED 2026-10-16 — the sentence *"no handle is delivered twice"* holds **PER SET AND NOT ACROSS THE TWO**; `composition-and-states.md §2.7` items 5–7; `docs/specs/storeroom-js/surface.md §2.11` clauses 2, 3 and 5). **SO A REGISTRATION REACHABLE IN BOTH LAYERS RUNS ONCE IN EACH — one run as an evaluated pair and one as a delivered body — and the pair of invocations is lawful, each run being one layer's own and not a second delivery of either.** **AND THE ANTI-PATTERN, IN ONE SENTENCE: REGISTERING ONE THING AS BOTH A CONSTRAINT AND A LISTENER IS NOT SUPPORTED BY DESIGN, ITS TWO INVOCATIONS ARE NOT A DEFECT, AND A CALLER THAT WANTS BOTH BEHAVIOURS SHOULD REGISTER TWO THINGS.**

**And two smaller things that save a debugging session:**

- **A handle must not be carried across a process reload.** Handle identity is this process's own: a prior
  session's token names no registration of this process, and **`unlisten` over it is a no-op success while
  `register` over it is a refusal** (`surface.md §2.3` item 3, which states the cross-process hazard as a declared
  consequence rather than a defended property; `bindings/js/README.md` prints the same rule for consumers).
- **A repeat `listen` at an already-held address mints nothing and returns the existing entry's handle** — so two
  `listen` calls at one held address return the same value, and `unlisten` over it removes that one entry
  (`surface.md §2.3`, its pointer clause, citing the store's address-level idempotence).

**`off` and `unlisten` are not the same thing, and §6.2's table states the contrast.** **`off` performs the
store-side withdrawal AND removes the package-owned registry entry — and it refuses, rather than succeeding, over a
handle this instance never minted or adopted.** **`unlisten` is the store-facing verb alone: it withdraws the
store-side registration, and it is a no-op success for every value outside the domain.** **And `unlisten` withdraws
the registration, never the function**: the registry entry stands, so a function whose handle is withdrawn simply
never fires again (`surface.md §2.4` rule 4).

**On shutdown, stop caring about listeners. They die with the instance; there is no release verb to call.**

---

## §10 · The records, and what to log

```js
write(store, ['greeting'], 'mem', 'hello');
// { op, watched, triggered }
// op:     { opId, kind, address, tier, before, after, seq, compacted }
// watched:   Address[]  — the watched ADDRESSES
// triggered: Handle[]   — the handles that actually FIRED
```

**`op.opId` is your undo token** — a **string**, unique within the instance, and the handle `rollback` accepts
(`docs/specs/storeroom-native/write-and-read.md §6.2` property 3). **Capture it if the user's action should be
reversible; the journal is bounded by `journalLength`, so an id gets old.**

**The op stores enough to reconstruct the original tree**, which is what `before` and `after` are: a
`BaseState` of `{ present, value }` — **`present` is whether a version stood at the address, and `value` is that
version's value where one did** (`bindings/js/index.d.ts`, the `BaseState` and `JournalOp` declarations, each
citing its rule).

**`triggered` is the list of handles that actually fired for this write — not every listener you registered.**
**That is the honest answer, and it is the one to log when you are debugging why a UI panel did not update.**
**`watched` is a separate list carrying ADDRESSES** — different types on purpose, so a call site cannot confuse
them (`write-and-read.md §3.5`'s amended record and its clause explaining why the two lists were kept under two
names rather than one).

**Three caveats about these lists, each declared:**

- **Neither list's ORDER is declared.** Compare them as sets, never as sequences (`write-and-read.md §4.4`, whose
  amendment extends the store's no-order rule to the handle lists).
- **`triggered` is always a list and may be empty; it is never absent.** **A `delete` that removes nothing is a
  SUCCESS carrying `tiers: []` and `triggered: []`** — no version was removed, so no node was destroyed and no
  trigger occurred (`write-and-read.md §4.4`, arm `D-3`, and its firing clause).
- **A `delete`'s `tiers` member carries the tiers whose versions were REMOVED, and its `address` is the caller's
  own array verbatim** — not a normalised one (`write-and-read.md §4.4`, the receipt's member set).

**And one store behaviour that shows up in the records if you use integer addresses: a delete of an indexed
version of an array container RENUMBERS the surviving anchors in container order from `0`, each keeping its tier
and its node** — so the survivor that stood at the deleted index's successor is addressed at one index from `0`
after the delete, and the deleted index's own node resolves at no index (`write-and-read.md §4.4`'s renumbering
clause and its amendment, whose unit of renumbering is the ELEMENT and not the anchor).

---

## §11 · What to build on, and what to be careful of

**Design**

- [ ] **Decide the address scheme before you write code.** `['domain', id, 'field']` — pick it once, write it down,
      and never let two subsystems invent two schemes. **The addresses are your schema.**
- [ ] **Remember that writing a path does not create it (§5.1).** Either write the parent first, or write the whole
      shape in one structured write — **and decide which, once, rather than discovering the refusal in production.**
- [ ] **Decide the tiers per data class.** What must survive a reboot (`file`), what may survive a reload (`mem`),
      what may vanish (`temp`).
- [ ] **Do not design as if the tiers were a layered stack (§5.3).** The order decides which version a read lands
      on; a read narrowed to a tier that no longer holds the version refuses. **If you need two versions at one key
      by design, the shadow arm is the state to understand — and it is the exception, not the rule.**
- [ ] **Set `journalLength` against your undo promise**, not against a guess.
- [ ] **Decide the value shapes.** They must be structured-clone-compatible (§6.3), so they are shapes you would
      send over an IPC boundary. Serialize once, at the boundary.

**Wire**

- [ ] **Construct one store and keep it.** There is no release verb; the instance's state is released with the
      instance.
- [ ] **Pass `listeners: []` even when you have no listeners** — an absent `listeners` never constructs.
- [ ] **Wrap every verb in one refusal→data mapper.** **`try/catch` is the whole error model**, refusals are plain
      objects, and one place to branch on `status` is the whole design.
- [ ] **`filePath` under a per-user, app-owned, already-created directory** — and for Electron, under
      `app.getPath('userData')` (`docs/guides/electron-integration.md §8`).
- [ ] **Log `triggered` when a UI did not update** — the store tells you which listeners fired, and that is usually
      the whole answer.

**Keep**

- [ ] **Never hand-edit the store's file.** Read and write through the verbs (§8.2).
- [ ] **Never treat an unknown `status` as success** — the set is open by design (§6.4).
- [ ] **Never store a live object.** If it has behaviour, it is data (§6.3).
- [ ] **Never "relax" the five exact pins**, and check that the binary loaded on the platform you are on (§2.2,
      §2.4).
- [ ] **Never carry a handle across a process reload** (§9).

---

## §12 · What this guide did not do

**Stated rather than left to be inferred, because a guide that hides its own edges is the next thing that will
fail quietly.**

- **No shell was available to me while writing this.** **Every figure in this guide is therefore read from a file
  or transcribed from a scratch run's own record, and nothing was measured by me.** **In particular: I did not run
  `npm install`, I did not execute the demo, and I did not count bytes of any file.** **The `▸` blocks are the
  scratch consumer's recorded answers to the calls quoted beside them — not my output, and not a run of mine.**
  - **Not independently verified by me: the 23-byte `demo-store.json` figure.** It is **computed**, not measured:
    the file's one line is the 22-character JSON object `{"tiered":"file-value"}` plus a newline. **If the number
    matters to you, measure the file yourself.**
  - **The line-length sweep this file was written under could not be run.** **A tool's limits apply: the read tool
    truncates a line at 2000 characters, so a line longer than that would not be readable in full by me at all** —
    and this guide was written to stay far below that bound. **But "written to stay below" is not "swept and
    confirmed", and I did not sweep: what I could do was search the finished file for any line above 250
    characters, and that search returned nothing.**
- **I did not verify the package against the registry.** I read the published `0.1.2` tarball's manifest and
  contents as they sit unpacked in the scratch directory, and I read the scratch consumer's readme for what its run
  established. **The scratch consumer is not a project artefact, lives under a gitignored directory, and I neither
  edited it nor treated it as one.**
- **SIXTEEN of the sixteen statuses are measured and NONE is left declared-only (§6.1), and the split is printed in that table row by row — each row naming the drive that produces its rank.** **⟶ RE-SPELLED 2026-10-16 (THE PROOFREADING PASS, `role_proofreader`): THE AS-FILED FIGURE HERE WAS *SEVEN* declared-and-not-measured, and it has run the other way — the ranks the `0.1.2` tarball run never reached (`6`, `11`, `12` among them) are now each ANSWERED by the unit's own JS suite and blind greens, so the declared-only remainder is ZERO.** I drove none of them myself; the drives are the suite's and the greens', and I read them at the bytes.
- **I did not settle the tier-eviction reading (§5.3).** **The version eviction is quoted as measured at `0.1.2`,
  and whether the store's declared semantics and its shipped behaviour agree there at every arm and every tier
  combination is not a consumer guide's question.** I have stated what to rely on and what not to, and I have not
  turned the measurement into a promise.
- **I did not test any consumer application, and this guide claims no application works.** It describes the package
  a consumer installs and what it answers.
- **I did not sweep the rest of the repository, and I did not check that other files' figures agree with mine.**
  Where a clause and a measurement could disagree, I cited both rather than harmonising them.
- **I did not resolve every tension I met in the contract directory.** Where two homes print two readings for one
  cell, the clause that declares itself operative is cited and the as-filed reading is left standing.

### §12-bis · And what the `0.1.3` PASS could not do

**⟶ RECONCILED 2026-10-16: THIS SECTION'S HEADING IS A HISTORICAL SITE — it names the pass that wrote the section, and that pass's own name is `0.1.3`.** **Its heading and every line below stand BYTE-EXACT and are read THROUGH this clause rather than rewritten; NO LATER PASS HAS RE-DRIVEN A `▸` BLOCK AGAINST A PUBLISHED `0.2.0` EITHER — THE ONE LATER PASS THAT RAN AT THOSE BYTES RAN THE GREENS SET, NOT A `▸` BLOCK, AND THAT RECORD IS NAMED ABOVE — so the wall this section reports is still the current wall and only the version its live claims name has moved (§0-bis).**

**`RCA-8(d)`: every line above stands byte-for-byte as the pass that wrote it left it, and this clause is read BESIDE them rather than replacing them.** **That pass wrote the guide against a published `0.1.2`; the pass that added §0-bis, §8.5 and §13 held the same wall — NO SHELL — so its honesty statement is the same and is stated again rather than implied:**
- **NO `▸` BLOCK IN THIS GUIDE WAS DRIVEN AGAINST A PUBLISHED `0.1.3`, BECAUSE THIS PASS COULD NOT INSTALL ONE.** **So every `0.1.3` statement here — §0-bis's version state, §8.5's whole table, §13's Node declarations — is DECLARED, read from the contract and the package's own files, and §8.5 says so in its own first line.** **The `▸` blocks remain `0.1.2` measurements and are labelled as such at §0.**
- **I did not query the registry, so §0-bis's first check is a CHECK YOU RUN and not a figure I report.** **⟶ AND THE SECOND SENTENCE HERE IS CORRECTED 2026-10-16, ONE PASS LATER (`role_proofreader`), BECAUSE IT IS FALSIFIED IN ITS OWN TERMS: §0-bis NOW PRINTS THE REGISTRY READING — `dist-tags.latest = 0.2.0` OVER THE VERSIONS `0.0.0-stage`, `0.1.0`–`0.1.3`, `0.2.0` — SO THIS GUIDE DOES NOW PLACE `0.1.3` IN A PUBLISHED VERSION LIST, IN A `PAGE` THIS SECTION'S HEADING DOES NOT REACH.** **THE HALF THAT STILL HOLDS IS THE HALF TO KEEP: the check you run is still YOURS to run — neither I nor that battery ran `npm view` for you — and a version figure a guide prints without a measurement of its own is still the figure to distrust.**
- **I did not run `npm view`, `npm install`, `node`, `cargo` or `git`.** **The manifest figures at §0-bis and the Node figures at §13 were READ AT THEIR FILES; the workflow's two action pins were read at the workflow.**
- **I did not re-derive any `0.1.2` figure, and I did not check that the `0.1.2` blocks still describe the `0.1.3` artefact at every point they speak of behaviour.** **Where `0.1.3` is known to have moved a behaviour I have said so at the section that carries it — §8.1's `filePath` bullet and §8.5 — rather than editing the `0.1.2` reading.**
- **⟶ AND THE FILE-TIER SAVE'S SURFACE MOVES ARE STATED AT THE POINTS A CONSUMER MEETS THEM, ADDED 2026-10-16 BY THE GATE-7 PROOFREADING PASS (`role_proofreader`): §0-bis's third paragraph, §1.1's member block and §1.2's count, §3's `write` signature and key count, §6.1's sixteenth row, §6.4's growth clause, §8.1's four-key block, §8.3's *"the verb performs no file I/O on any of its arms"* and the passing-arm save, and the new §8.6 (`constraints`).** **NOTHING IN THE `▸` BLOCKS MOVED, no `0.1.2` measurement was re-derived, and the two readings this pass could NOT confirm at a published artefact are marked DECLARED where they stand rather than presented as measured.**

**⟶ AND WHAT THE `2026-10-16` `0.3.0` SURFACE PASS COULD NOT DO — DATED `2026-10-16` — IS ADDED HERE SO THE STATE OF THIS PAGE IS NAMED AND NOT LEFT TO A DIFF.** **THIS PASS HELD NO SHELL, SO IT RAN NOTHING, INSTALLED NOTHING AND QUERIED NOTHING, and every statement it added is DECLARED at the site that carries it.** **AND IT SITS ON A WALL OF ITS OWN, NAMED BECAUSE IT IS WHAT KEEPS THE PAGE FROM BEING WHOLE:** **`docs/specs/storeroom-js/**` IS THE PARALLEL PASS'S AND IS NOT THIS PASS'S TO WRITE — so the method names, the method set and the re-derived signatures UNDER `A127` ARE THAT PASS'S DECLARATION AND NOT THIS GUIDE'S, and §1.1-bis derives its spellings from `A127`'s rule applied to the `0.2.0` signatures rather than reporting a measured `0.3.0` surface.** **Three things stand NAMED AS OWED and not as omissions:**
1. **THE TOGGLES' OWN METHOD NAMES, AND THE ADD ROUTE'S, ARE UNRESOLVED AT THIS PASS — §1.1-bis's table leaves those three `METHOD` cells BLANK for that reason and says so. Every other cell of that table is the `0.2.0` module name with its first position dropped, which is `A127`'s own rule and not an inference.**
2. **THE GUIDE'S CODE SAMPLES ARE STILL THE `0.2.0` FORM.** **Every `read(store, …)` / `write(store, …)` / `listen(store, …)` in §3, §4, §5, §9 and §10 passes an `instance` FIRST — which the `0.3.0` surface makes WRONG rather than merely redundant — and §1.1-bis's last bullet says so at the surface's own section.** **The re-spelling of each sample is owed, and it is owed to the pass that re-derives the surface, because a re-spelled sample is a claim about a surface this pass does not own.**
3. **THE §0-bis / §12-bis / §13 VERSION MARKERS ARE NOT RE-POINTED AT `0.3.0`:** **this page's live version claims still name `0.2.0`, no `▸` block has been driven against a published `0.2.0` or against any `0.3.0`, and NOTHING WAS PUBLISHED, TAGGED OR BUMPED BY THIS PASS — `0.2.0` stands as the published `version` and `0.3.0` is a DECLARED LABEL.**

---

## §13 · The two Node declarations, and why reading one as the other costs you

**★★ THIS SECTION EXISTS BECAUSE ONE DEPRECATION NOTICE HAS NOW BEEN READ THREE DIFFERENT WAYS, AND TWO OF THEM WERE WRONG.** **The notice, from a release run's own log, verbatim: *"`Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4.`"*** **What it names is THE ACTION'S OWN RUNTIME — nothing else.** **It does not name the package's requirements, and it does not name the machine your app runs on.**

**THERE ARE TWO SEPARATE DECLARATIONS HERE, WITH TWO SEPARATE READERS, AND NEITHER IS THE OTHER'S:**

| the declaration | the figure | who reads it |
|---|---|---|
| **what the ARTEFACT LOADS ON** | **the manifest's `engines` floor: `{ "node": ">=18.0.0" }`** | **you — a consumer deciding whether this package will load on your runtime** |
| **what the RELEASE PUBLISHES WITH** | **the release workflow's Node, `24`, installed by its own `setup-node` step** | **nobody who installs the package — it is the publisher's build-and-credential client, not a constraint on your runtime** |

**★ AND THE TWO DECLARATIONS ARE ON DIFFERENT VERSIONS ON PURPOSE, SO A MISREADING CUTS BOTH WAYS.** **If you read the workflow's Node `24` as the package's requirement, you will believe Node 18 and Node 20 are unsupported when they are supported.** **If you read the `engines` floor as the release's build version, you will draw the wrong conclusion about what a published tarball was built against.** **The distinction is a standing rule rather than a note about one release: it is drawn at `docs/specs/storeroom-publish/release.md §1.1` item `3`, whose own words are that the floor *"declares WHAT THE ARTEFACT LOADS ON and this clause declares WHAT THE RELEASE PUBLISHES WITH — two different readers, two different declarations, and neither is the other's."**

**AND THE FLOOR READS `>=18.0.0` AT `0.2.0` BECAUSE THAT IS WHAT IT READS — not as a provisional figure, and not as a value pending a ruling.** **Its domain is PINNED: the parameter that governs it declares the domain as *"exactly `{ "node": ">=18.0.0" }`"*, and a HIGHER FLOOR (`>=20`) is a PRICED AND REFUSED alternative, refused on the ground that it would exclude consumers the carrier itself serves** (`docs/specs/storeroom-publish/parameter-semantics.md §2.6`, `PAR-PUB-6`; `docs/specs/storeroom-js/contract.md`'s `DD-38` cell). **So do not wait for this figure to move, and do not read a guide that calls it "pending" as current: the floor STANDS, and it is honest rather than merely pinned.** **Raising it is not a repair a later release will quietly make; it would be a bounded amendment of a pinned domain, and until such an amendment lands the figure above is the one to code against.**

**★ AND IT IS HONEST, WHICH IS THE PART WORTH KNOWING RATHER THAN TAKING ON TRUST.** **The floor is not a promise about a version the addon happens to have been built with; it is far below what the artefact actually needs, because the addon's Node-API surface is ABI-STABLE and this facade stays LOW IN IT:**
- **the addon's highest-referenced Node-API class is `6` — carried by `napi_get_value_bigint_int64` beside `napi_get_all_property_names` — which is `Node 12.17.0` / `10.20.0`** (`bindings/js/build.rs`, the `NODE_PIN` doc-comment).
- **the ESM entry uses only `node:` builtins and `Object.hasOwn`, which is `Node 16.9`** (`bindings/js/index.mjs`).
- **so `>=18.0.0` stands above both, and RAISING it would not be a correction — it would be a FALSE RESTRICTION that excludes consumers the artefact loads on today.**

**AND THE THIRD THING THAT LOOKS LIKE A VERSION FLOOR AND IS NOT ONE, NAMED SO YOU DO NOT GO LOOKING FOR A FLOOR IN IT: `bindings/js/build.rs` pins `24.11.0`, and the pin is THE WINDOWS IMPORT LIBRARY'S FIXED, REPRODUCIBLE BYTE — a build input, chosen so the Windows link step does not depend on whatever a runner image happens to carry.** **Its own declaration says why any version at or above the floor is lawful: *"the import library's version need not equal any consumer runtime's: it need only EXPORT the `napi_*` symbols."*** **It is a BUILD-TIME pin for one platform's linker, and it is not a constraint on your runtime.** **No consumer-facing consequence follows from it.**

**WHAT TO TAKE AWAY, IN ONE LINE: CHECK YOUR OWN RUNTIME AGAINST THE MANIFEST'S `engines` FLOOR — which you can read in the `package.json` you installed — and ignore every OTHER Node version number you meet in this package's repository, because none of them is addressed to you.**

---

**And the one reading a consumer should take from all of that: the declared documents are the instrument for
questions of semantics, and a scratch run is the instrument for questions of behaviour. This guide is careful to
say which is which, and it is not the instrument that decides between them.**
