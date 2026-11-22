# L1 module plan — the second claimed realm: a WASM build of the store, and what it costs

**WHAT THIS FILE IS.** The plan `D-154` item 5 orders, at the path that row names. **It moves no byte, opens no unit, claims no release class and designs no crossing** — every choice the ruling left open is priced below and marked unchosen. Figures are re-read at their own bytes on this tree; **nothing here was measured by this pass** (shell-less; `npm test`, `cargo test` and `npm run build` were not run). Written `2026-11-17` by **`role_l1_architect`**, landed by the supervisor because that role holds no write channel.

---

## §1 · The change, and its non-scope

**`A70`'s one-claimed-realm premise is withdrawn, so a SECOND REALM MAY BE CLAIMED** and a browser/WebAssembly build of this store **may be described as supported** (`D-154` items 1–2). That build carries **no `cfg.filePath`** — the key is **not in domain** there, refused as broken config at `cfg`'s own class gate — and the **`file` tier's path arm is not compiled**: the seven `std::fs` calls and the one `std::process::id()` that `strata/research.md §24.1` measured are `#[cfg]`-ed out with the writer and reader they belong to. What replaces `filePath` is the pair the landed units already built: **`saveCall`** carries the store's own image out, **`initialImage`** carries state in, and on that build the register is **`Tier::File` with `file_path == ""`** — `D-132` item 1's third entry condition, the only configuration there (`D-154` item 4). **That is not a degraded store: it is a `saveCall` store whose `filePath` arm does not exist.**

**NOT IN SCOPE, stated so no pass cites it as authority:** this plan **moves no byte** (`D-154`: *"IT ORDERS A PLAN AND NO CODE … AND NO LANDING MAY CITE THIS ROW AS AUTHORITY FOR A BYTE"*) · **opens no unit** · **claims no release class** · **designs no crossing** (three routes priced in §5, none chosen) · **re-decides `DD-24`** (no — item 2 keeps it) **or `P-SR-7`'s load-time-reach sentence** (no — item 3 keeps it) · and **settles none of the three items the row puts to the architect** (declaration shape, sync-graph reading, release class).

---

## §2 · The sentences that move, each at its byte

| # | the byte | its present words | class | what replaces it | owner |
|---|---|---|---|---|---|
| 1 | `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md:134`–`:136` | *"THE PACKAGE CLAIMS `{ Node ESM }` AND PROMISES NO OTHER REALM … no clause of this package's documentation may describe an unclaimed realm as supported."* | **REVERSAL** | the second clause is lifted; the first narrows to *this package*. **Its home is ARCHIVED and is CITED, never rewritten** (`contract.md:700`); the live operative homes are #2 and #4 | a spec pass, by a dated clause at the live home |
| 2 | `docs/specs/storeroom-js/contract.md:2296`–`:2300` (`§3.1`), `:2383`–`:2384` (*"THE REALM SET IS CLOSED AT ONE MEMBER"*) | the claim stated so it can be falsified; the realm set closed at one | **NARROWING** | *"closed at one member **per build**"*: the Node build's realm is one, the WASM build's is one, and **no build carries two**. `D-129` item 5's supported-route reading is the Node arm's own answer and stands | a spec pass |
| 3 | `contract.md:3272` (`P-SR-7`) | *"no WASM module is loaded at any point **to reach the store**"* | **UNMOVED**, read through `D-154` item 3 | a Node consumer's boot: no wasm instantiated to reach a Node-API addon. A WASM build of the store *is* this store, not a module loaded to reach it | — |
| 4 | `contract.md:3269`–`:3271` | *"THE PACKAGE'S OWN BOOT IS `ENVELOPE/PURE` AND REACHES EXACTLY ONE CLAIMED REALM"* | **NARROWING** | *exactly one claimed realm **per boot***: the Node boot reaches the addon, the WASM boot reaches the build. **The property is not weakened — it is indexed** | a spec pass |
| 5 | `contract.md:3276` (`S-ONE-ADDON`) | *"exactly one `.node` load; no subprocess, no `dlopen` of a second library, no WASM instantiation"* | **UNMOVED** — the Node arm's own property | byte for byte. The WASM arm's counterpart is a **new cell class** (§7 `C-W1`), not an edit here | — |
| 6 | `contract.md:3280` (`P-SR-7`'s FAILURE LIST) | *"a browser or renderer promise anywhere in the package's documentation"* | **REVERSAL — and the least sure one** | re-scoped to *a browser promise **for the Node build***. **As written this member reddens the very sentence item 1 permits** | a spec pass, **coupled to #7** |
| 7 | `contract.md:2394` (`HO-5`, the browser) and `:3970` | *"nothing is shipped and nothing is promised; the promise would be false by construction…"*; revisit: *"a fresh ruling, which would need a carrier other than a Node-API addon"* | **REVERSAL — this row's own revisit condition is the one `D-154` fires** | re-said on `HO-1`'s post-`D-128` template (`:2402`–`:2410`, `:3984`–`:3990`): the row keeps its id, its place and the `6 + 1 = 7` arithmetic; its duty narrows to *what the package still does not ship*, and its ground survives only as a fact about a Node build | a spec pass |
| 8 | `contract.md:604`–`:605` (`DD-24`) | the refusal *"a co-equal CJS arm"*; its `alt` price *"it is a SECOND claimed realm, and `A70` claimed exactly one"* | **REFUSAL UNMOVED** (`D-154` item 2); **the `alt`'s GROUND IS NOW FALSE** | the refusal stands as *two module systems in one realm*; its price cell owes a re-spelling on that ground. **A pass that reads the price's collapse as the refusal's is wrong** | a spec pass |
| 9 | `docs/guides/package-use.md:130`–`:132`, `:148`–`:155` | *"you must be in Node ESM … No other realm is claimed"*; *"the browser … UNCLAIMED … describes no other realm as supported"* | **NARROWING** | the Node build's realm sentence **plus a NEW section** for the WASM build's supported status. §11's tables (`:2036`–`:2084`) are unaffected until a build ships (§8 step 5's red) | a guide pass |
| 10 | `bindings/js/README.md:3`–`:10`, `:12`–`:15` | *"**No other realm is described here as supported.**"* | **INSERTION + NARROWING** | a **shipped artefact's** sentence, so it is `delivery`'s byte and **a release act**. `bindings/js/README.guide.md` is the guide's byte-for-byte landed copy and must be re-landed with #9 | `delivery` |
| 11 | `strata/brief.md:65`–`:72` | *"The claimed realm is Node ESM and nothing else."* | **NARROWING** | L0's own file: a re-read owed by whoever owns the brief | the supervisor |

**AND ONE CITATION DEFECT THIS SECTION WILL NOT HIDE.** `D-154` item 1 cites *"`contract.md §1.5`"* for the `{ Node ESM }` sentence. **At the live file `§1.5` is the JS-side equality relation** (`contract.md:1165`); the quoted sentence resolves only at the **archived** `package.md:134`–`:136`. **The ruling's sentence is real; its cited path is retired** — row 1 says what to do instead of re-pointing it.

---

## §3 · The build's `cfg` domain — the one place the ruling is concrete

**(a) At the package's class gate, before any filesystem act.** `bindings/js/src/entry/frame.mjs:203`'s `encodeConfig` is where `cfg`'s outside forms are decided, and it already carries the two arms this one joins (`D-144` item 2's non-function `saveCall` at `:229`–`:235`, item 7's cross-key rule at `:242`–`:249`). **The `filePath`-not-in-domain arm is a third sibling at the same gate, one thrown form, the same status** (`AddressMalformed`), subject `'filePath'` — the shape `D-147` item 4's `initialImage` arm takes at `:260`–`:272`. **The projection at `:212` never runs; the package mints no code and no second form.** **Note the direction is the INVERSE of the Node arm's**: on the WASM build *absence* is in domain and *presence* is broken config — and the cross-key rule at `:242` becomes unreachable there, which is a fact to state rather than a rule to delete.

**(b) The declaration — BOTH ARMS PRICED, NEITHER CHOSEN** (`D-154` item 2: *"A declaration question, and it is the architect's"*). Today `index.d.ts:249` declares `readonly filePath?: string` inside `StoreConfig`.

- **(i) ONE `index.d.ts`, `filePath?` optional everywhere, refused at runtime on the WASM arm.** *Price:* the Node declaration untouched, `D-129` item 6's staging copies the same two files, one file for `typecheck`. *Cost:* **the type says yes where the gate says no** — the contradiction carried as prose, and a typed consumer of the WASM build cannot be prevented at compile time.
- **(ii) TWO declarations, the key absent on the WASM arm.** *Price:* the type is truthful and the absence structural. *Cost:* the declaration is **hand-authored**, so the second file is a second hand-maintained surface with its own `types` target; **the `typecheck` harness needs a second project or it only ever proves the Node arm**; and the `StoreConfig` census cell reads one file and would read two.

**SILENT, and it must stay so until ruled: whether the WASM build is a second package, a second artefact in this package, or a separately delivered thing.** `D-4` hands the publish shape to `delivery`. **Arm (ii) is much cheaper if it is a second package.**

**(c) The coherence the ruling asserts, which is the load-bearing claim.** The package sets the tier bit itself: `durable_without_path` is read at `facade.rs:356`–`:377`, carried at `codec.rs:281`, folded at `crossing.rs:1046`–`:1056`, answered at `src/store.rs:779`–`:784` as the third entry condition (`D-137` item 3: *"The caller spells NOTHING"*). On the WASM build there is no `filePath` key to be absent from, **so the bit is set on every construction ⇒ `store.rs:764`'s first arm is unreachable and `:779`'s is the only one** ⇒ **`Tier::File` with `file_path == ""` is the whole store**.

---

## §4 · The `#[cfg]` boundary in `src/store.rs`, drawn on real code

| # | call | at | enclosing function | what else lives there | what moves |
|---|---|---|---|---|---|
| 1 | `OpenOptions::new().write(true).create_new(true).open(…)` | `:765`–`:769` | `storeCreateWithInputs` (`:697`) — **step 4b's first arm** | steps 2, 3, 3-bis, 4-bis, 4b's other arms, 5–7: **the whole construction** | **the call and its arm** (`:764`–`:777`) — never the function |
| 2 | `fs::symlink_metadata` | `:994` | `path_is_reachable` (`:992`–`:1010`) | **nothing else — the body is the two calls** | **the whole function**, with #3 |
| 3 | `OpenOptions::new().write(true).open(…)` | `:998` | `path_is_reachable` | — | the whole function |
| 4 | `std::process::id()` | `:1591` | `write_file` (`:1589`–`:1599`) | `compose_verified_image(address)?` (`:1590`) — **the realm-pure compose** | **the call and the three beside it, and NOT `:1590`** |
| 5 | `fs::write` | `:1592` | `write_file` | as above | as above |
| 6 | `fs::rename` | `:1593` | `write_file` | as above | as above |
| 7 | `fs::remove_file` | `:1595` | `write_file` | as above | as above |
| 8 | `fs::read_to_string` | `:1860` | `read_file_image` (`:1856`–`:1870`) | the `file_path.is_empty()` early return, the empty-text class, **`classify_image`'s tail — the SEED's decoder** | **the read only**; the three `NoImage` classes and the tail stay, because they are facts about text |

**So two functions move whole and two move in part.** `path_is_reachable` is the only one whose body is entirely platform; `write_file` and `read_file_image` both keep a realm-pure half — and in `write_file`'s case **that half is the one `exportImage` already reaches**, which is why the export act is already realm-free.

**WHAT THE BUILD LOSES, AND WHAT IT MUST STILL DO — every caller named, because a `#[cfg]` that removes a function a remaining caller names is a build error.**

- **Step 4b's first arm and the probe go.** `path_is_reachable`'s callers are exactly two: `storeCreateWithInputs:724` and `:772`. **Both must be cfg'd with the function, or the function stays.** `:729`'s `malformed_named("filePath")` arm stays on both builds (the carrier type is unchanged; the key cannot arrive).
- **The writer's two acts go; its signature stays.** `write_file`'s callers are exactly two: `commit_file:1662` and `save_file_delta:3591`. **Neither can be cfg'd away** — `commit_file` is published as the `commitFile` entry (`facade.rs:1072`) and `save_file_delta` is `save_state`'s whole body. **So a third body arm lands where the platform acts were** — which is also the structural discharge of **`O-3`**: the stray `.snst-commit-<pid>` sibling becomes unreachable **by construction** rather than by a guard.
- **The reader's one act goes; the function stays.** `read_file_image`'s callers are **four**: `storeCreateWithInputs:826` (step 7's rank-`22` check), `boot_load:1820`, `regenerate:3421`, `durable_projection:3603`. **All four keep naming it and all four already answer the mem-tier way through `:1857`'s empty-path return** — so only the read moves. **`FileImageRefused` loses a subject on that build**; the seed's rank-`22` arm survives because it decodes `initialImage` through `classify_image`, which is realm-pure.
- **★ AND `save_state` — the check the task demands.** `save_state:1752` → `save_file_delta:3578` → `if self.file_path.is_empty() { return Ok(()) }` → **`self.write_file(subject)` at `:3591`**, and `durable_projection:3602` names the reader. **So the state-keyed save is a function the WASM build still needs and it names the writer.** It compiles because the writer keeps its signature; it **writes no byte** there because the path is empty. **Draw the boundary as "signatures stay, platform acts leave" and every caller holds; draw it as "the functions go" and six call sites break at compile time.**
- **The boot and the regeneration.** `boot_load:1819` returns `None` (no path ⇒ `NoImage`) and mints nothing; `regenerate:3408` takes its `NoImage | Refused` arm and rebuilds from `born` — **`D-144` item 5's *"errors as if it's a mem-tier store"* reached by the same clause, not by a second one.**

---

## §5 · The second crossing, priced and not chosen

**What the Node crossing's discipline IS, at its bytes, so the re-authoring cost is not guessed:** the **one thrown form** (`refusal.mjs`'s `fail`, `carryRefusal` at `state.mjs:1212`, `boundaryReject`) · the **class-first reads** (`util.types.isProxy`, **37 call sites across five parts** — `frame.mjs`, `class-decision.mjs`, `carrier.mjs`, `delivery.mjs`, `constraints.mjs` — whose whole point is that it *reads no member and runs no trap*) · **`carryRefusal`'s unconverted crossing** (the store's `{status, message, log, address}` datum reaches the kernel without being rebuilt) · and the **19-entry export set** (15 `#[napi(js_name=…)]` plus four unnamed).

| route | what of the discipline is re-authored | the export set | the loader |
|---|---|---|---|
| **(i) `wasm-bindgen`** | the glue converts `Err` to a throw but **not into this one form** — the refusal must leave as a *value* the glue renders through `fail`; `codec.rs`'s carrier accessors are re-authored against generated bindings; **the generated `.d.ts` collides with the hand-authored declaration** and with `D-129` item 6's `types`-first ordering | **19 only if `commitFile` keeps an entry whose body refuses**; otherwise **18** | an **injected instance** is the only arm that keeps the graph synchronous; `instantiateStreaming` is async (§7 `C-W4`); a bundled glue module is a third file in that graph |
| **(ii) hand-rolled `extern "C"` exports** | **every marshalling act on both sides** — strings, the `message[]`, the depth ceiling, the class decision re-expressed over linear memory; **`carryRefusal`'s premise has no carrier at all and one must be minted** | the same 19-or-18 question, the set read off a hand-written table | no glue to bundle, no generated declaration: the injected-instance arm is free |
| **(iii) one text entry** (the image's own currency) | the value crossing re-expressed as text on the far side of one entry, which moves **the class decision and both ceilings off the JS walk and onto the caller** — honest and by far the dearest | **1**, and the package's members would answer differently | irrelevant — **but the store's verbs would no longer take JS values, which no ruling permits** |

**`D-133` item 1's direction is already fixed (addon → package) and `D-137` item 1 already spent the carrier question.**

---

## §6 · The delivery and the settle, which must not move

**Realm-independent, carried by a second loader unchanged:** the awaited delivery and the settle (`D-130` item 4) · `bodyFailures` and `returnedValues` (both symbol-keyed accessors; `Object.keys` three, `getOwnPropertyNames` seven) · rank `23` · rank `15`'s widened seat · the `saveCall` trio · the seed. **The strongest evidence is that the two demos ARE a WASM build's shape**: `§22`'s seeded construction and `§23`'s post-creation repairs each save through the caller's function and never touch a path.

**Loader-bound in `bindings/js/src/**`, by file:** `index.mjs:87`–`:91` (five `node:` builtins at load, then `createRequire(import.meta.url)`, `ADDON_PATH`, `adoptModuleContext`) — **the entry's realm-specific block and its first line** · `artefact.mjs:2`–`:4`, `:79` (`readFileSync` of `package.json`), `:175`–`:232` (the three-rung walk has **no browser meaning**) · `node:util`'s `types.isProxy` in the five parts above · `constraints.mjs:100`'s lazy `require_`.

**NOT loader-bound — the finding worth the most:** **`refusal.mjs` and all five kernel parts import no `node:` module at all.** **The constraint mechanism and the one failure form are already realm-free.** **What is not realm-free is the class decision** — and `util.types.isProxy` **has no browser equivalent that distinguishes a Proxy from its target**. That is a declaration-class problem (`DD-34`'s Proxy refusal loses its instrument on that arm), not a port: residual §9.5.

---

## §7 · The cells and the gates, named by class and not written

| id | class | its subject | status |
|---|---|---|---|
| **`C-W1`** | the realm sentence's own cell | a staged WASM build that **constructs, writes at `file` tier, saves through `saveCall`, seeds through `initialImage`, and reads back** — **`§23`'s transcript is the shape** | owes the build |
| **`C-W2`** | `cfg` domain | `filePath` **refused** on that arm (`AddressMalformed`, subject `'filePath'`, **before any filesystem act**), with the `initialImage: ''` sibling beside it | owes the build |
| **`C-W3`** | the Node arm unchanged | **every existing cell stays green**: 1356/1355/0, `P-SR-7`'s `S-LOAD`/`S-ONE-ADDON`, the published-map cells, `SS-1`…`SS-12`, `RV-1`…`RV-7`, and the three `cargo test` legs | **the floor of the whole plan** |
| **`C-W4`** | the sync-graph ordering | `WebAssembly.instantiate` is asynchronous and the entry's graph is synchronous (`contract.md:2379`). **The order: the host instantiates, then injects, then the entry runs** — so the entry's own graph carries no top-level `await`. **The reading of the law is the architect's** | **blocked on §9.3** |
| **`C-W5`** | the coherence claim | on that arm the construction sets `durable_without_path` with no caller spelling, the register reads `file` tier with `file_path == ""`, and a `file`-tier write lands and reads back | owes the build |
| **`C-W6`** | the export set | the WASM build's entry set counted against whichever arm §5 lands on — **19 or 18** | **blocked on §5** |

**⟶ AMENDED `2026-11-17` — THE STATUS COLUMN IS RE-DERIVED AND EVERY CELL IN THIS TABLE IS LANDED** (`RCA-8(d)`
ANNOTATE-BESIDE: **the six rows above stand BYTE-FOR-BYTE as the reading of their own date and are read THROUGH this
clause; no row is rewritten and no row is deleted**). **THE SUITE'S WORD IS `tests/e2e/wasm-arm.test.mjs` — SIX CELLS,
ALL GREEN, THE ARM BUILT BY THE FILE ITSELF AND NOT SKIPPED** (`node scripts/build-wasm-package.mjs`; a cell that
cannot build FAILS in words, `P-PUB-7`'s doctrine). **AND WHAT EACH ONE ACTUALLY ASSERTS, WHICH IS THE COLUMN THIS
CLAUSE OWES:**

| id | status | what the cell asserts, at its own members |
|---|---|---|
| **`C-W1`** | **✅ LANDED** (`CW-1`) | a `saveCall` store **constructs with no path** and carries the fifteen declared members · a **`file`-tier write lands** and the receipt's op reads `tier: 'file'` · the caller's saver is handed the store's **IMAGE TEXT** once, naming the address · **and a second store seeded with that image reads the value back** (`initialImage`) |
| **`C-W2`** | **✅ LANDED** (`CW-2`), **WITH ONE DIVERGENCE RECORDED AT THE CELL** | `filePath` is refused **at the construction** and its message names the path the caller supplied — **the code is `FilePathUnreachable`, from the STORE's own `Path` arm, and not the `AddressMalformed` at the `cfg` gate this row names**, because the `cfg` reader is realm-blind and one shared part serves both arms: the PLAN'S INTENT AND THE TREE'S ANSWER DIFFER IN THE CODE AND AGREE IN THE FACT (the key is refused, at construction, before any filesystem act) · and an **empty `initialImage`** is refused `AddressMalformed` (`D-147` item 4) |
| **`C-W3`** | **✅ THE FLOOR, AND IT IS NOT A CELL OF THAT FILE** | it is this row's own subject — **every existing cell stays green** — and it is re-measured at the whole suite: `npm test` **`1371` / `1370` / `0`**, `npm run typecheck` **exit `0`**, `cargo test` **22 `ok` / 0 FAILED** |
| **`C-W4`** | **✅ LANDED** (`CW-4`) | the glue offers **`initSync`** · and the entry's **transitive set carries no `node:` specifier and no top-level `await`**, walked from `index.mjs` downward by specifier — the narrowed subject §10 item 2 fixed |
| **`C-W5`** | **✅ LANDED** (`CW-5`) | **the same verb, two stores, two answers**: the `file`-tier write LANDS on a `saveCall` store and `readTiered` reads `{ _tier: 'file', value: 1 }` at the address (`file_path === ''`, the tier set by the construction) · the identical write on a store with **neither `saveCall` nor a path** is refused **`ParentAnchorMonotonicityViolation`** · and the durable store is the one that saved |
| **`C-W6`** | **✅ LANDED** (`CW-6`) | **NINETEEN** entries, counted off the module · **`commitFile` absent** by `D-155` item 4 · **`delete` spelled `_delete`** (the toolchain escapes a keyword and `addon-slot.mjs`'s `MODULE_SPELLING` spells it back) · `saveSucceeded` and `exportImage` present · **and `storeRelease` is the nineteenth, added 2026-11-19**. **⟶ THE FIGURE MOVED `18 → 19` AT THIS ROW, AND THE SENTENCE IT MOVED FROM IS QUOTED BEFORE IT IS RE-CUT — *"eighteen entries, counted off the module … The `19-or-18` fork is gone: §10 item 3 took 18"*.** **THE SHAPE OF THE COUNT IS UNMOVED** — the Node arm's twenty minus `commitFile` (`D-155` item 4), which is what `§10` item 3 took and what this landing re-derives one entry wider |

**AND THE FILE'S SIXTH CELL IS NOT A ROW OF THIS TABLE**: `CW-7` in `tests/e2e/wasm-arm.test.mjs` is `D-156`'s own —
**a value crosses by value both ways (an app-side mutation of the written object and of the read one changes nothing
the store holds) and a `Proxy` at a VALUE is refused `ValueRefusedAtBoundary` with all eight trap counters at zero**.
**AND `C-W7`…`C-W11` ARE A DIFFERENT FIVE AND ARE NOT LANDED** — they are `docs/L3/wasm-realm/design.md` §7's, they
share two ids with this table's numbering only by collision, and no cell of this file claims them.

**⟶ AND TWO MORE CELLS LAND IN THAT FILE ON 2026-11-19, NEITHER OF THEM A ROW OF THIS TABLE** — the arm's RETIREMENT,
which this plan's seven sections do not price because the arm had no release when it was written (`§9`'s residual
list and `design.md` §8's last sentence both declared the absence; the architect's closure answer, arm `a`, closes
it). **`CW-8` drives the entry's arms**: a live store's release answers `undefined`, the released handle answers
**`AddressNotFound` at the verb that names it** (the observable `SR-03` reads on the Node arm, and never a table
length — `receiver-and-refusal.md §6`'s `OWED-2`), a second release refuses, a handle no mint reached answers the same
arm, nine non-index positions answer **`AddressMalformed`**, and a neighbour store still answers its own register
across the release. **`CW-9` drives the PACKAGE'S FINALIZER**: a child re-executed with `--expose-gc` constructs and
drops a batch, collects, and then asks the module to release each handle it kept — every one answering
`AddressNotFound` is a slot the finalizer had ALREADY emptied, so the count is the retirement measured at the entry's
own answer. **What the cell cannot force is stated at its byte**: the asserting process has no `gc()`, and the host's
collection TURN is the host's.

**WHAT THIS PLAN'S CELL SECTION OWED AND WHAT IT NOW OWES.** **Owed then: the build. Owed now: none of the six**, and the
arm's whole behaviour is driven above. **AND THE ONE RESIDUAL THIS SECTION LEANED ON IS ANSWERED RATHER THAN MERELY
CARRIED: `§9.5`'s `util.types.isProxy` replacement is `D-167`, whose split states the answer and its price AT THE
PREDICATE'S OWN BYTE** (`class-instrument.mjs`'s `isProxyOf` and `isProxyOfCarrier`; `D-167` items 1–2 and 4). **AND IT
CLOSES WITH THE HAZARD DECLARED AND NOT CURED**: a `Proxy` at a CARRIER gate is **not detected** on that arm — **so
`§9.5` closes with that sentence standing, which is the form `D-167` item 5 chose on purpose.**

---

## §8 · The order of work, as units and not as wishes

| # | unit | depends on | measurable at that step | red if it lands alone? |
|---|---|---|---|---|
| 1 | **the `#[cfg]` boundary** — three bounded units on §4's table: the probe pair + its two call sites, the writer's two acts + its third arm, the reader's one act | nothing | the three `cargo test` legs **unmoved on native**; a `cargo check` for the WASM target **once a target is chosen** — **this plan names no triple, because it did not check which are installed** | **no** |
| 2 | **the second crossing**, on the route the architect takes | 1, and §5's choice | one construction, one `file`-tier write, one read-back through the new boundary; the export set counted at a built artefact | **no**, but it cannot start |
| 3 | **the package's loader split** — the injected instance, and the parts that must stop importing `node:` | 2 | the entry loads in a host with no `node:` builtins; **`C-W1` green for the first time** | **no** — but it is where `util.types.isProxy` surfaces |
| 4 | **the declaration**, on §3(b)'s chosen arm | 3, and §9.2 | `npm run typecheck` exit `0`; the `StoreConfig` census cell; the WASM arm's type surface | **yes on arm (ii)** — a second hand-authored declaration moves the `typecheck` staging and needs its own census: a declaration + harness + cell wave, not one file |
| 5 | **the realm sentences** — §2's rows 1, 2, 4, 6, 7, 9, 10, 11 | §2's couplings: row 6 with row 9; row 10 is `delivery`'s and a release act | the spec's own cells; the batteries that read the guides and the manifest | **yes — and this is the step that looks like prose and is not.** **Row 6 (`contract.md:3280`) as written makes *"a browser promise anywhere"* a FAILURE of `P-SR-7`**: a guide or README sentence landing before row 6 is re-scoped **leaves a stated failure standing in the same directory**, and the `blind-*`/`surface` batteries read those guides. **And it is coupled the other way**: if the WASM build ships as an artefact **in this package**, the packed-member census moves — a `delivery` + publish-cell wave |

**So: 1 first, 5 last, and 5 is two waves rather than one. The only step that can land alone and stay green is 1.**

---

## §9 · The residuals, each with an owner and a positive revisit condition

| # | the residual | owner | positive revisit condition |
|---|---|---|---|
| **9.1** | **the release class** (`D-154` item 4; `D-124` item 3's discipline) | **the architect** | when a release is prepared that ships a second realm — the class is claimed **before** the tag, because `MINOR` says a build moved and `MAJOR` a realm did |
| **9.2** | **the declaration's realm-conditional shape** (`D-154` item 2; §3(b)'s arms) | **the architect** | **when §5's route is chosen** — route (i) generates a `.d.ts` and route (ii) does not, so the route decides whether arm (ii) is one file |
| **9.3** | **the sync-graph reading** (`D-154` item 3; `contract.md:2379`) | **the architect** | on that answer: an **injected instance** keeps the graph synchronous and `instantiateStreaming` does not, so `C-W4`'s order follows the choice |
| **9.4** | **every `file`-tier question the WASM build makes moot while the Node build must still answer** | the design pass, as today | each closes on its own cell: **`O-3`** and **`SS-9`'s zero-byte-file finding** are **moot on the WASM build** (the probe is not compiled) and **still owed on Node**; **`O-9`** is untouched by either |
| **9.5** | **`util.types.isProxy` has no browser equivalent** — `DD-34`'s Proxy refusal loses its instrument on that arm | **the architect**, on the crossing's route | when §5's route is taken: the route decides whether the class decision stays in JS (and needs a substitute) or moves behind the boundary |
| **9.6** | **`D-154` item 1's citation `contract.md §1.5` does not resolve at the live file** (§2's note) | a spec pass | when that amendment opens: **row 1's dated clause is where the correction lives, and the archived sentence is cited, never rewritten** |
| **9.7** | **`DD-24`'s `alt` price now states a false ground** | a spec pass | the same amendment; the refusal itself needs nothing |

---

## Envelope — what this plan could not settle, and where it is unsure

**Read at their bytes:** `D-154`, `D-132`, `D-133`, `D-137`, `D-144`–`D-147`, `D-149`, `D-150`, `D-129`, `D-131`, `strata/brief.md`, `research.md §24`, `contract.md`'s realm block and `DD-24`, `src/store.rs`'s seven regions, `frames`/`refusal`/`artefact.mjs`'s realm blocks, `package-use.md`, `README.md`, and `docs/L1/seven-key-config.md §2–§23`.

**The three sentences this ruling is least sure to reverse, quoted:** (1) **`contract.md:3280`'s failure member** *"a browser or renderer promise anywhere in the package's documentation"* — **it is a DOCUMENTATION prohibition and item 3 keeps `P-SR-7` whole, so whether it survives as a failure is settled by neither item**; (2) **`:3269`–`:3272`'s property**, whose `D-154` item 3 reading rests on a *reaching-versus-being* distinction the row's own words do not draw; (3) **`bindings/js/README.md:9`–`:10`**, a **shipped** byte lifted by item 1's permission and moved by nobody's order.

**The one `#[cfg]` this plan would not draw without the architect's word:** the one over **`write_file`'s body** (`:1589`–`:1599`). Its signature must stay (`commit_file:1662`, `save_file_delta:3591` both name it, and `save_file_delta` is a function the WASM build still needs), so the cfg removes two acts and **leaves a body where they were** — and **whatever that body answers is a declaration**: `commitFile` is a published entry and `D-144` item 5 declares only what a store answers that *"would read a file to rebuild"*, not what an explicit `commitFile` answers on a build where the writer does not exist. **So this cfg does not choose a mechanism; it chooses a declared answer.**

**The plan's riskiest line:** *"On the WASM build `durable_without_path` is the only configuration, so `Tier::File` with `file_path == ""` is not a degraded store but the whole store."* **Falsified by either of two readings, both fatal:** (a) if a construction **without** `saveCall` is in domain on that build, the register is `Tier::Mem` and the build **is** degraded; (b) if the bit's carrier depends on `filePath`'s **absence** at a site that no longer exists when the key is not in domain, the package cannot set it and the third entry condition is unreachable there. **The measurement that would settle it, on any build:** construct with no `saveCall` and read the register's tier; then construct with `saveCall` + `initialImage`, write at `file` tier, and read the value back.

---

## §10 · AMENDED `2026-11-17` — `D-155` takes three of the four forks, and one of them closes this plan's refusals

**Later than §1–§9 and superseding them where they meet.** **The crossing is `wasm-bindgen`**; the other three are his words, arm for arm.

| `#` | the choice | what it changes here |
|---|---|---|
| **1** | **option 2 `(iii)`** — one declaration source, two generated declarations, the WASM arm typing `filePath?: never` | **§3(b)'s four arms collapse to one.** **This plan's §9.2 residual is CLOSED**: no second hand-maintained surface, and the type is truthful on both arms. **What it binds, newly:** the `StoreConfig` census cell must read the arm's own generated file, and `typecheck:stage`'s two-file copy (which `D-129` item 6 fixes) must learn a third. **The real**m marker's home is the design's — the plan prices none. |
| **2** | **option 3 `(b)`** — an injected instance | **§7's `C-W4` is no longer `BLOCKED`**: **the law's reading is HIS, given by the arm** — the entry's own graph stays synchronous, the instantiation is outside it. **The cell's subject narrows** to the prohibition that follows: no `instantiateStreaming` and no `await __wbg_init()` may stand in the entry's graph. **§9.3 is CLOSED.** **What it binds, newly:** the construction that takes the instance is a declaration of `storeCreate`'s own class and is not spelled by this plan. |
| **3** | **option 4 `(d)`** — `commitFile` absent, **18 exports** | **§4's last open question is DISCHARGED** — *"the one `#[cfg]` I would not draw"*: with the entry absent the writer's body answers nobody, **dead on both sides of the boundary, so no declared answer is owed**. **§7's `C-W6` loses its `19-or-18` fork: the WASM arm is 18.** **And `O-8`'s path slot becomes moot on that arm while staying owed on Node.** |
| **4** | **the crossing is `wasm-bindgen`** | **§5's three routes collapse to one**, and the discipline survives it: the refusal crosses **constructed** (`js_sys::Object` + `Reflect::set`, `throw_refusal`'s own idiom) and never serialized. **Two sub-decisions are now in the code's path and neither is taken by the row:** the export **form** (`pub struct Store` with methods, or free functions taking a handle) and the glue **target** (`web` / `bundler` / `no-modules`). **And `initSync`'s availability is the single tool fact to verify before any of the crossing is written** — because with the reading given, only the instrument is unknown. |

**What this plan now says, in one line per step.** **Step 1 unchanged** (the `#[cfg]` boundary — three units on §4's table, route-independent, the only step that lands alone and stays green). **Step 2 gains two sub-decisions** (form, target) **and one verification** (`initSync`). **Step 3 stays the largest** — the receiver convention for **42** call sites in the package (16 `withAddon()`, 8 `.call(state.receiver)`, 14 `Reflect.apply`), which the injected-instance shape decides the form of. **Step 4's census and staging work is now known and one file wider.** **Step 5 unchanged, and still last** — `contract.md:3280`'s failure member re-scoped before any guide sentence lands.

**Residuals, after this amendment:** §9.2 and §9.3 **closed**; **§9.1 (the release class) now the only realm item unclaimed**; §9.4 unchanged (moot on WASM, owed on Node); §9.5 (`isProxy` has no browser equivalent) unchanged and still the design-class problem the crossing cannot solve; §9.6 and §9.7 unchanged.

**⟶ AND ITEM 3'S FIGURE MOVED ON 2026-11-19, AT ITS OWN ROW, WITHOUT MOVING ONE WORD OF THAT ROW'S GROUND.** **THE ROW
READ *"`commitFile` absent, **18 exports**"* AND CLOSED WITH *"§7's `C-W6` loses its `19-or-18` fork: the WASM arm is
18"*.** **BOTH FIGURES OF THAT FORK WERE TAKEN BEFORE THE ARM HAD A RETIREMENT**, and the arm now exports
**NINETEEN** — *"the Node arm's twenty minus `commitFile`"*, the same shape, one entry wider (the architect's closure
answer, arm `a`; `D-155` item 4 re-cut at its own sentence in `strata/decisions.md`; `CW-6` re-cut at its own count).
**EVERY OTHER CLAUSE OF THE ROW STANDS BYTE FOR BYTE**: the writer's body still answers nobody, the cfg still leaves
any faithful arm, and `O-8`'s path slot is still moot on that arm and owed on Node.

---

## §11 · STEP 1 LANDED `2026-11-17` — the `#[cfg]` boundary is drawn, and every native leg is unmoved

**THE THREE BOUNDED UNITS §4's TABLE NAMES ARE IN, AS FIVE `cfg` SITES IN `src/store.rs` AND NOT ONE BYTE OF LOGIC ELSEWHERE.** **No store verb, no addon entry, no package file and no test moved** — the cfg'd build is the native build plus a second arm per site.

| site | what the cfg does | the native bytes |
|---|---|---|
| **step 3's `Path` arm** (`:732`/`:736`) | the probe is a **statement** on native and the arm answers `p.clone()`; on `wasm32` the arm **answers the store's own `FilePathUnreachable`** and never probes | the probe's bytes are unmoved, and the arm's value is the same `p.clone()` |
| **step 4b** (`:780`/`:808`) | native keeps the **three-way** fork (probe · durable · mem); `wasm32` keeps **two** — `durable` alone, because the path cannot be non-empty there | the durable arm's bytes and the mem arm's are unmoved |
| **`path_is_reachable`** (`:1018`) | the **whole function** leaves `wasm32`, with its two callers — the only sound way to remove a function a caller names | untouched on native |
| **`write_file`** (`:1629`/`:1640`) | **one tail per target**: native keeps `process::id()` + `fs::write` + `fs::rename` + `fs::remove_file`; `wasm32` answers rank `15` `FileCommitFailed` and composes nothing else | `compose_verified_image` and the signature are on **both** |
| **`read_file_image`** (`:1909`/`:1922`) | **one tail per target**: native keeps the read, the empty-text class and `classify_image`; `wasm32` answers `FileImage::NoImage` | the empty-path return and `classify_image` are on **both**, because the SEED decodes through that tail |

**AND THE TWO ARMS THAT ANSWER ON `wasm32` ARE DEAD CODE BY CONSTRUCTION, WHICH IS `D-155` ITEM 4's POINT** — the path is empty on every construction there and `save_file_delta` returns early on an empty path, so nothing on either side of the boundary reaches them.

**MEASURED, EVERY NATIVE LEG.** `cargo build --offline --release -p storeroom-native`: **exit `0`** · `cargo test`: **twenty-two result lines, every one `ok`, `0` FAILED** · `npm run build`: **exit `0`** · `npm test`: **`1356` tests, `1355` pass, `0` fail**.

**★ AND THE ONE LEG THIS STEP CANNOT CLOSE, NAMED RATHER THAN IMPLIED.** `cargo check --target wasm32-unknown-unknown` **cannot run here**: `rustup target list --installed` returns **`x86_64-unknown-linux-gnu` and nothing else**, and adding the target needs a network this environment does not have. **So the `wasm32` arms are READ and UNCOMPILED** — every one of them is a `cfg`-selected tail the native build never sees. **The first measurement after a toolchain with the target is that `cargo check`; until then this step's `wasm32` half is `NOT DRIVEN`**, and no cell may claim it.

**WHERE THE LADDER STANDS.** Steps 1 done · **step 2 (the crossing) blocked on two sub-decisions — the export FORM and the glue TARGET — and on one tool fact, `initSync`** · step 3 (the loader split, **42 call sites**) · step 4 (the declaration's generator and its census/staging chore) · step 5 (the realm sentences, last, with `contract.md:3280` re-scoped before any guide sentence lands).

---

## §12 · STEP 4 LANDED `2026-11-17` — the declaration's generator, its marker, and its three cells (the step no toolchain blocks)

**THE ONE SOURCE IS STILL ONE FILE, AND THE SECOND ARM IS PRODUCED RATHER THAN MAINTAINED** (`D-155` item 2). Four bytes of the plan's step 4 are in:

1. **`bindings/js/index.d.ts`** carries the realm region — **`// ⟦realm:filePath:begin⟧` and `…:end⟧`, two comment lines at the member's own two-space depth** — around `readonly filePath?: string;`, with a docblock clause saying what they mean, that the WASM arm's emission replaces the region's body with `filePath?: never`, and **that the member's PRESENCE and OPTIONALITY are identical on both arms** (`never` narrows the *value's* type, not the member).
2. **`scripts/emit-declarations.mjs`** (new, 18.4 KB) emits **two** declarations: the **NODE** arm's — the source's own bytes, **identity asserted by a read-back** — and the **WASM** arm's — the same bytes with **exactly the region's body** replaced, **everything outside it asserted byte-identical** on both sides. **It refuses loudly** (nonzero exit, a message naming the byte) on an absent, duplicated or unbalanced marker, on a body that is not the one member line, on an unindented marker, and **on an output directory inside `bindings/js/`** — a generator must never write where it reads. **It takes its directory from its argument and defaults to `build/declarations/`**, because the WASM declaration's PATH is `delivery`'s and stands `SILENT`. **It is synchronous** — no top-level `await` anywhere — because the identity assertion is a claim about a moment.
3. **`package.json`** gains `"declarations": "node scripts/emit-declarations.mjs"` — **inserted AFTER `build` and not before it**, and the reason is not cosmetic: `tests/e2e/addon-adoption.test.mjs` pins **root `package.json` line 11** and asserts its halves are the two `cargo` commands, so an insert above `build` would move the command, find zero occurrences and fail that cell's own vacuous-pass refusal.
4. **`tests/e2e/realm-declaration.test.mjs`** (new, three cells): the region is **well-formed and INVISIBLE to both parsers** — the begin/end lines are measured against `blind-entry-module.test.mjs`'s own member pattern (no match), and the `StoreStatus` union is shown to open **after** the region, so the status census is out of range rather than merely shape-blind · both emissions exist, **the Node arm is byte-identical to the source**, the two absolute paths are printed, **and a second run is byte-identical** · and **the two arms differ only inside the region**, with the `StoreConfig` census **identical on both** (`filePath`, optional, on each) and the value type `string` on one arm and `never` on the other.

**DRIVEN, BY THE SUPERVISOR, ON THIS TREE.**

```
node scripts/emit-declarations.mjs /tmp/decl-out
  → /tmp/decl-out/index.d.ts      (160274 bytes) — the Node arm: the source's own bytes, identity asserted
  → /tmp/decl-out/index.wasm.d.ts (160273 bytes) — the WASM arm: the region's body replaced, outside byte-identical
  node arm, line 277: "  readonly filePath?: string;"
  wasm arm, line 277: "  readonly filePath?: never;"
```

**`160274 → 160273` is the whole difference**: one byte, `string` → `never`, at one member, with the docblock outside the region emitted verbatim on both arms.

**MEASURED, EVERY LEG.** `npm test`: **`1359` tests, `1358` pass, `0` fail** (three new cells, all green, and the `addon-adoption` line-pin untouched) · `npm run typecheck`: **exit `0`** · the generator run above: **exit `0`**.

**WHERE THE LADDER STANDS.** Step 1 ✅ · **step 4 ✅** · **step 2 and step 3 are BLOCKED on the toolchain**: `wasm32-unknown-unknown` is not installed and `wasm-bindgen` is not in the offline registry, so `cargo check --target wasm32-unknown-unknown` — the first measurement the design asks for — cannot run here. **Step 5 remains last and still owes `contract.md:3280`'s re-scope before any guide sentence lands.**

---

## §13 · THE TOOLCHAIN EXPANDED `2026-11-17` — and step 1's `wasm32` half is now DRIVEN

**THE ARCHITECT'S INSTRUCTION WAS *"Expand the toolchain"*, AND THE THREE PIECES THAT WERE MISSING ARE NOW PRESENT.**

| piece | before | now |
|---|---|---|
| the `wasm32` target | `rustup target list --installed` carried `x86_64-unknown-linux-gnu` **and nothing else** | **`wasm32-unknown-unknown` installed** — the component download succeeded; **the write needed `~/.rustup`, which the file policy denies, so the add was escalated once and approved** |
| the `wasm-bindgen` CRATE | not in the offline registry (`cargo add --offline --dry-run` → *"could not be found in registry index"*) | **fetched into `.cargo-home` and declared** in `bindings/js/Cargo.toml`'s **`[target.'cfg(target_arch = "wasm32")'.dependencies]`** at `0.2.130` |
| the `wasm-bindgen` CLI | absent | **installed at `.cargo-home/bin/wasm-bindgen`, `0.2.130`** — the same version as the crate, because the two disagreeing is a hard error (`wasm-bindgen` refuses to run against a mismatched crate) |

**★ AND THE ONE THING THIS STEP PROVED THAT STEP 1 COULD NOT: THE `wasm32` HALF OF THE `#[cfg]` BOUNDARY COMPILES.**

```
cargo check --offline --target wasm32-unknown-unknown -p storeroom-native   → 0 errors
cargo check --offline --target wasm32-unknown-unknown --manifest-path bindings/js/Cargo.toml → 0 errors
```

**`§11`'s `NOT DRIVEN` IS DISCHARGED.** The five `cfg` sites the boundary drew — step 3's `Path` arm, step 4b's two-arm fork, `path_is_reachable`'s absence with its two callers, `write_file`'s `wasm32` tail, `read_file_image`'s `wasm32` tail — **all compile for the target**, so the boundary is sound at the compiler and not merely read.

**AND THE DEPENDENCY WENT IN A TARGET TABLE, WHICH IS WHY ONE CENSUS MOVED AND THE OTHER DID NOT.** `P-ADA-1`'s `S-DEP-TABLE` reads the `[dependencies]` table and **stops at the next header** (`tests/e2e/addon-adoption.test.mjs:286`–`:301`), so the four declared rows — `napi` · `napi-derive` · `serde_json` · `storeroom-native` — **stand byte-for-byte and the new entry is invisible to that cell.** **What DID move is the LOCK, and legitimately**: `D-34`'s one lock grew `41 → 47` blocks (`3` workspace members + `44` registry packages), and that cell's two figures are re-pinned at their own sites with the reason (`wasm-bindgen` and its own closure, locked for the target). **A target table grows the lock and not the dependency table** — the distinction is now recorded at the cell that reads each.

**MEASURED, EVERY LEG, BOTH TARGETS.** `cargo check --target wasm32-unknown-unknown` (both crates): **0 errors** · `cargo test` (native): **twenty-two result lines, every one `ok`, `0` FAILED** · `npm run build`: **exit `0`** · `npm run typecheck`: **exit `0`** · `npm test`: **`1359` tests, `1358` pass, `0` fail** · `wasm-bindgen --version`: **`0.2.130`**.

**WHERE THE LADDER STANDS.** Step 1 ✅ (now with its wasm half driven) · step 4 ✅ · **steps 2 and 3 are NO LONGER BLOCKED** — the toolchain they needed is present, so the design's first instruction (`cargo check --target wasm32-unknown-unknown`, then one `wasm-bindgen --target web` run, then a read of the emitted glue for `initSync`) is now executable **the moment a `cdylib` crate-type and a `#[wasm_bindgen]` entry exist** · step 5 still last, still owing `contract.md:3280`'s re-scope before any guide sentence lands.

---

## §14 · STEP 2's FIRST SLICE LANDED AND DRIVEN `2026-11-17` — the wasm crossing runs, and the whole `saveCall` cluster crosses with it

**THREE FILES**: `lib.rs` gains the target split the design named (65 lines, no deletion — `crossing` stays `pub` and realm-pure, `facade`/`codec` take `#[cfg(not(target_arch = "wasm32"))]`, `wasm`/`wasm_codec` take `#[cfg(target_arch = "wasm32")]`) · **`bindings/js/src/wasm_codec.rs`** (new, 927 lines) — the codec's twin, the copy in and the copy out · **`bindings/js/src/wasm.rs`** (new, 370 lines) — **six entries, free functions each taking the handle first**, the handle table, and the refusal's twin. **`crossing.rs` moves no byte.**

**THE SIX**: `storeCreate(wire)` · `read(handle, address, tier)` · `write(handle, address, tier, value, commit)` · `exportImage(handle)` · `saveSucceeded(handle, opId)` · `saveFailed(handle, opId)` — all `#[wasm_bindgen]`, all answering `Result<JsValue, JsValue>` where the `Err` is **the constructed refusal and never a `String`**.

**THE TOOLCHAIN FACTS `design.md` §8 NAMED ARE NOW MEASURED, THREE CLOSED AND ONE CORRECTED IN THE DESIGN'S FAVOUR.**

| the design's open fact | measured |
|---|---|
| does `--target web`'s glue instantiate anything at its top level? | **NO** — every `await`/`instantiateStreaming` sits inside `__wbg_init_once`; the module's evaluation defines functions and exports |
| is `initSync` present? | **YES** — declared at `:417` and exported at `:471` by `export { initSync, __wbg_init as default }`. **A grep for `export function initSync` finds nothing and is WRONG**: the function is declared unexported and named in the bottom export list. **§2's decision holds: synchronous instantiation, no top-level `await`, the entry's graph synchronous.** |
| does `web` import the `.wasm` as a module (a `bundler` leak)? | **NO** |
| `js_sys::Reflect::define_property`'s spelling | **VOID — `js_sys` IS NOT IN THIS TREE'S CLOSURE** (`Cargo.lock` carries `wasm-bindgen` and its three siblings, no `js-sys`). **The twin declares the eight globals it needs itself** (`Object()` · `Object.create` · `Object.hasOwn` · `Object.keys` · `Array()` · `Reflect.get` · `Reflect.set` · `Reflect.defineProperty`) through `#[wasm_bindgen] extern "C"` — **no new dependency was taken**, and the `set` the design feared is used **only on a null-prototype descriptor**, never on a caller-visible object. |

**AND THE ONE THING THE DESIGN CALLED ITS RISKIEST LINE IS CONFIRMED BY THE GLUE'S OWN BYTES**: `initSync({ module })` performs the instantiation synchronously, so the host holds the instance before the entry's graph evaluates.

**DRIVEN END TO END BY THE SUPERVISOR** — the module built for `wasm32-unknown-unknown` (`447,752` bytes), `wasm-bindgen --target web` emitting the glue (six entries exported), `initSync` with a compiled `WebAssembly.Module`, then **the package's own carriers** (`carrier.mjs`'s `encodeAddress` · `encodeTier` · `encodeOpId` — **the wire is fully TAGGED on this arm exactly as on the Node arm**), against a `saveCall`-shaped store (`durable_without_path: true`, no `filePath`):

```
handle = 0 | a saveCall-shaped store: no filePath, durable without a path
write(addr, file, {a:1})    → {"op":{"opId":"op-1","kind":"write","address":["tabs"],"tier":"file",
                                 "before":{"present":false},"after":{"present":true,"value":{"a":1}},
                                 "seq":1},"watched":[],"triggered":[],
                                 "triggeringAddress":["tabs"]}
read(addr)                  → {"a":1}
exportImage()               → "{\"tabs\":{\"a\":1}}"          ← the store's own image text
saveSucceeded(op-1)         → undefined
saveFailed(op-1)            → undefined
read after the unwind       → AddressNotFound                  ← the commit was ROLLED BACK
exportImage() after unwind  → "{}"                             ← and the image is empty
```

**And the declared refusals cross in the one form**: a `file`-tier write on a store with no `durable_without_path` answers **`ParentAnchorMonotonicityViolation`** (the same measurement that started this session) · `saveSucceeded`/`saveFailed` on an unknown op answer **`JournalOpUnknown`** · and a handle the table does not hold answers **`AddressNotFound`** for `999`, `undefined` and `'x'` alike — **one form, three misses**, which is `C-W10`'s subject.

**MEASURED.** `cargo check --target wasm32-unknown-unknown` (both crates): **0 errors** · `cargo build` wasm release: **exit `0`** · `cargo test` native: **every suite `ok`** · `npm test`: **`1359` / `1358` / `0`** · `npm run build`: **exit `0`**.

**WHAT THIS SLICE DOES NOT HAVE, named so it is not read as the whole arm.** Twelve entries are absent (`delete` · `rollback` · `restoreMark` · `journalMark` · `readLiteral` · `readTiered` · `listen` · `unlisten` · `removeListener` · `register` · `version` · `errorMessage`; `commitFile` is absent **by ruling**, `D-155` item 4) · **the table never retires a store** (`storeRelease` absent: `SC-10`'s shape, `design.md` §8) · **the forked JS entry is step 3's** · **the `Proxy` instrument is still `design.md` §9.5's open arm** · and **`crossing.rs:840`'s `from_handle` loses its only wasm reader** and prints a dead-code warning on that arm — **a residual with three priced arms and none taken** (accept the warning · `pub` it, still dead · or land `register`/`listen`/`unlisten`, which re-open the reader).

---

## §15 · THE WASM ARM'S ENTRY SET IS COMPLETE `2026-11-17` — eighteen entries, driven, and one name the toolchain moved — **⟶ NINETEEN FROM 2026-11-19, WITH THE RETIREMENT'S FRAME AS THE NINETEENTH**

**`wasm.rs` 370 → 683 lines, `wasm_codec.rs` 927 → 1134**; the twelve new entries are in, the six readers they needed are in, and `lib.rs`/`crossing.rs`/`Cargo.toml` move no byte.

**THE SET, AT THE INSTANTIATED MODULE** (`Object.keys` of the `initSync`'d glue, `default`/`initSync` excluded): **eighteen names — `_delete` · `errorMessage` · `exportImage` · `journalMark` · `listen` · `read` · `readLiteral` · `readTiered` · `register` · `removeListener` · `restoreMark` · `rollback` · `saveFailed` · `saveSucceeded` · `storeCreate` · `unlisten` · `version` · `write`.** **`commitFile` is `undefined` at runtime and absent from the set** (`D-155` item 4) — the one textual match in the glue is a docblock sentence, not an entry.

**⟶ AND THE SET IS NINETEEN FROM 2026-11-19, READ AT THE SAME INSTRUMENT (`Object.keys` of the instantiated glue, the same two exclusions).** **THE LIST ABOVE IS QUOTED, NOT REPLACED, BECAUSE IT IS THE SET OF ITS OWN DATE**, and the entry this section's figure moved for is added beside it: **`storeRelease` — `storeCreate`'s twin, the retirement's frame, `wasm.rs`'s own `#[wasm_bindgen(js_name = "storeRelease")]`.** **IT IS THE ONE ENTRY OF THE NINETEEN WHOSE STORE IS A POSITION AND NOT A HANDLE-STOPPED RECEIVER-CARRIER**: `FinalizationRegistry`'s callback is handed the HELD VALUE — the integer the package publishes on its own `STORE_INDEX` row — and nothing else, so *"a finalizer has no receiver"* is the whole reason, and `addon-slot.mjs` forwards it as a **PASSED-THROUGH** member rather than a handle-first one. **THE FIGURE'S SHAPE IS UNMOVED**: nineteen of the Node arm's twenty, `commitFile` absent (`D-155` item 4, re-cut at its own sentence the same date).

**★ AND ONE NAME MOVED, MEASURED, AND IT IS THE TOOLCHAIN'S AND NOT THE ARM'S: `delete` EXPORTS AS `_delete`.** `wasm-bindgen-macro-support-0.2.130/src/parser.rs:1604`–`:1607` escapes every free exported function whose JS name is a keyword — *"Due to legacy behavior, we need to escape all keyword identifiers as `_keyword`"* → `name = format!("_{}", name)` — **and the CLI already owns the machinery that would spell it lawfully** (`wasm-bindgen-cli-support-0.2.130/src/js/mod.rs:712`–`:716` emits `export { id as 'delete' }` for a name that is not an identifier); **the escape fires first and the alias arm is never reached.** **`delete` is the only JS keyword among the eighteen** — **⟶ AND STILL THE ONLY ONE AMONG THE NINETEEN** (`storeRelease` is not a keyword) — which is why the first six never surfaced it. **THE CURES ARE ALL OUTSIDE THE ARM'S RUST**: a `wasm-bindgen` bump · a glue post-step emitting `export { _delete as 'delete' }` · or **the package's forked entry dispatching `delete` to the module's `_delete` member**, which is the cheapest and lands in step 3's dispatch table.

**DRIVEN BY THE SUPERVISOR on the built module and the emitted glue** (a `mem` store, `initSync({ module })`, the package's own carriers):

```
readLiteral(a)         → 41
readTiered(a)          → {"_tier":"mem","value":41}          ← the compiled shape, byte for byte
journalMark()          → {"k":"s","v":"op-1"}
rollback(op-2)         → {"opId":"op-2","undoneOps":["op-2"],"restoredTo":{"present":true,"value":41}}
read(a) after rollback → 41
_delete(a)             → {"address":["a"],"tiers":["mem"],"triggered":[],
                          "op":{…"kind":"delete","before":{"present":true,"value":41},"after":{"present":false}…},
                          "triggeringAddress":["a"]}
version()              → 1.12.0
errorMessage(...)      → 'a' does not exist in '', it holds no keys   ← the store's generated sentence
```

**AND WHAT `register` ACTUALLY DOES, SETTLED AT ITS BYTES** (the brief's question): **it records nothing — it is a membership test.** `crossing.rs:1336`–`:1360` answers one question, *is this handle inside THIS instance's own domain* (`owned` = the adopted `listeners[]` tokens ∪ the tokens `listen` minted), and holds no function, opens no slot and mutates nothing. **The caller's function never crosses** (`DD-15`) **and lives in the package**; the core-side registry was deleted (`F-13`, `U-11`). **So the `listener_slot is unused` warning on the host build is that sentence measured** — the third position exists so the arity is the signature's property, and no byte of the body names it.

**MEASURED, EVERY FLOOR.** `cargo check --target wasm32-unknown-unknown` (both crates): **0 errors** · wasm release build: **exit `0`**, module `544,350` bytes, glue `32,509` · `cargo test`: **22 suites, every one `ok`, `0` FAILED** · `npm test`: **`1359` / `1358` / `0`**.

**TWO PLACES `facade.rs`'s behaviour could not be carried, both named and neither silent:** the `delete` spelling above, and **`errorMessage`'s `code` position** — the node arm's `String` conversion is strict and throws a library error before the frame is entered, while the glue decodes/coerces it; **no shipped caller can see the difference** (every call site passes a status token) and declaring the position a value would have been a third, third-place answer.

**WHERE THE LADDER STANDS.** Step 1 ✅ · step 2 ✅ (**eighteen entries, driven** — **⟶ NINETEEN FROM 2026-11-19**, the retirement's frame beside them, this section's own added clause) · step 4 ✅ · **step 3 — the loader split — is the last implementation step, and `D-156` unblocked it**: the five `node:util` parts take an injected class-decision instrument, `artefact.mjs`'s Node-only walk is extracted, and the forked entry dispatches through `state.handle` (with `delete → _delete` at that table). · step 5 (the realm sentences) still last, still owing `contract.md:3280`'s re-scope first.

---

## §16 · STEP 3's SEAM LANDED `2026-11-17` — the five parts are realm-neutral, and the extraction is still owed

**THE CLASS-DECISION SEAM IS IN, AND IT IS THE PART OF STEP 3 THAT `D-156` UNBLOCKED.** `src/entry/class-instrument.mjs` (70 lines, **zero import specifiers**) holds a module-level instrument, one setter and one predicate · **the five parts** (`frame.mjs` · `class-decision.mjs` · `carrier.mjs` · `delivery.mjs` · `constraints.mjs`) each swap their `node:util` import for it and **all twenty-five `types.isProxy(` sites become `isProxyOf(`** (6 + 12 + 4 + 2 + 1 = 25, measured) · **`index.mjs` installs `types.isProxy` at its own evaluation**, which is the line that makes the predicate's `false` default unreachable.

**DRIVEN BY THE SUPERVISOR, ON THIS TREE:**

```
isProxyOf(new Proxy({}, {})) = true | isProxyOf({}) = false       ← the Node entry installed its instrument
a Proxy at write's value position → REFUSED ValueRefusedAtBoundary
  the form = ["address","log","message","status"]                  ← the ONE crossed form, four members
  names the class = true                                           ← "… is a Proxy …"
  traps that ran = {"get":0,"set":0,"has":0,"ownKeys":0,"getPrototypeOf":0,"getOwnPropertyDescriptor":0,
                    "deleteProperty":0,"defineProperty":0}         ← ★ NOT ONE TRAP, which is DD-34's whole property
  is an Error? false
a plain object round-trips → {"a":1}                               ← and the control admits
```

**So the seam preserves the observable exactly**: the refusal is `ValueRefusedAtBoundary` (rank `17`, `class-decision.mjs`'s `valueReject` — **not** the `ValueNotAdmitted` the brief predicted, and the design's own reading was superseded by that file's 2026-10-23 amendment), it crosses in the one form, and **no trap of the caller's Proxy ran**.

**AND TWO PINNED FIGURES MOVED, WITH THEIR REASON AT THEIR SITES.** `blind-installed-surface.test.mjs`'s `ENTRY_MODULE_COUNT` and `PACKED_FILE_COUNT` were `13` and `20`; **they are `14` and `21` now**, because `class-instrument.mjs` is the fourteenth part. **`P-PUB-7`'s own doctrine is the authority** — *"a fourteenth part … is a LAWFUL change and a pinned figure would go red on the commit that lands it"*.

**★ WHAT THIS PASS DID *NOT* LAND, AND THE TREE RECORDS IT BY NAME: THE `artefact.mjs` EXTRACTION.** The design's §5 splits the Node-only bytes (the three-rung walk · `packageVersion()` · the platform table · `adoptModuleContext` · `absentSubject`) into an `artefact-node.mjs`; **that half is OWED.** A stage-by-stage application was taken deliberately: **the first attempt removed `adoptModuleContext` from the entry's import without creating its new home, and the entry threw `ReferenceError: adoptModuleContext is not defined` at its own line 118** — four whole test FILES failed at load, not four cells. **Restoring the import and re-cutting to `14/21` (the ONE part actually added) returned the battery to `1359`/`1358`/`0`**, and the extraction stays as the next increment with its own count move to `15/22`.

**MEASURED.** `npm test`: **`1359` tests, `1358` pass, `0` fail** · the drive above · every part parses (`node --check`).

**WHERE THE LADDER STANDS.** Step 1 ✅ · step 2 ✅ (18 entries, driven — **⟶ 19 FROM 2026-11-19**, `storeRelease`) · **step 3: seam ✅, extraction OWED, the fork OWED** · step 4 ✅ · step 5 (the realm sentences) still last, still owing `contract.md:3280`'s re-scope first.

---

## §17 · THE EXTRACTION LANDED `2026-11-17` — `artefact.mjs` carries no host specifier, and the whole loader split's package half is done but the fork

**ATOMICALLY, AND THE ATOMICITY WAS EARNED BY THE PREVIOUS FAILURE.** The patch was returned as a `git apply`-able diff (`scratch/l4-artefact/artefact-extraction.diff`, 52,017 bytes, `git apply --check` exit `0`) and applied in one act. **`artefact.mjs` 396 → 146 lines with ZERO `node:` specifiers**; **`artefact-node.mjs` (310 lines, new)** carries the three host imports, the module-context seam, `PLATFORM_NAMES` and both helpers, `packageVersion()`, the three-rung walk, the attempt list, `absentSubject` and `generatorFilePathUnreachable` — **every one byte-for-byte as it stood, with seven visibility tokens changed and nothing else** (`fail` dropped from its import; `ADDON_PATH`, `addon`, `addonArm`, `loadAddon`, `absentSubject`, `generatorFilePathUnreachable` exported, which is what makes `withAddon`'s read a live binding and not a copy).

**AND THE DIRECTION IS ONE WAY WITH NO CYCLE, MEASURED TWICE**: a static edge walk over the closed set (17 modules, DFS colouring, zero cycles; `artefact-node.mjs` reaches `artefact.mjs` = false) **and the real ESM loader** (`import('./bindings/js/index.mjs')` → `["storeCreate"]`, no `ReferenceError`) — the failure class that took four test files down on the first attempt.

**THE ONE OWED PATH, NOW RE-POINTED**: `tests/e2e/installed/live-install.mjs:520` read the platform table out of `src/entry/artefact.mjs`; it reads `artefact-node.mjs` now, and `install-support.mjs`'s parser docblock says the same. **Measured with the battery's own parser: `artefact.mjs` → 0 rows, `artefact-node.mjs` → 5 (`linux·x64`, `linux·arm64`, `darwin·x64`, `darwin·arm64`, `win32·x64`).** **That cell is `INSTALL-07`, reachable only through `npm run test:e2e`** — `live-install.mjs` is a runner script and not a `*.test.mjs`, so `npm test` never ran it; the re-point is nonetheless owed and is now done.

**TWO PINNED FIGURES MOVED WITH THEIR PART**: `blind-installed-surface.test.mjs`'s `ENTRY_MODULE_COUNT` `14 → 15` and `PACKED_FILE_COUNT` `21 → 22`, each with a dated clause (`P-PUB-7`: *"a fourteenth part … is a LAWFUL change and a pinned figure would go red on the commit that lands it"*).

**MEASURED.** `npm test`: **`1359` tests, `1358` pass, `0` fail** · `npm run typecheck`: **exit `0`** · `cargo check --target wasm32-unknown-unknown`: **0 errors** · the cycle check above: **0 cycles**.

**AND ONE RESIDUAL THE IMPLEMENTER NAMED RATHER THAN HID:** `publish-generators.test.mjs`'s `NG-PUB-F` control now cuts anchors in **two** files where it cut one, and its *as-filed* substitution splices a `node:path` call into `addonLoadMessage` — a file that now imports no `node:path`. **It is inert because the probe drives the mismatch state and never evaluates `addonLoadMessage`**, and all seven `NG-PUB-*` controls still pass and still fail when mutated. **A later pass that widens that probe to the absent state re-cuts the control**, or it dies with `ReferenceError: join is not defined`. **⟶ CLOSED 2026-11-17** — **THE RE-CUT LANDED**: the inert as-filed half is **RETIRED with a dated record**, and the successor splice lands in `artefact-node.mjs` — the part that carries the mismatch arm **and** the three `node:` imports — at a site the mismatch drive evaluates, reading `entryUrl`. **BOTH HALVES CAN NOW FAIL**, each shown by isolating it (removing the other's `.replace`, running, restoring `diff`-clean): `(3a)` hands arm (b) the module-relative addon path in place of rung one's own — `§1.4` item 7's **second** named failure, which no control of that generator measured — and `(3b)` appends it to arm (b)'s fallback. **AND THE GUARDED BEHAVIOUR WAS SEEN RED**: altering `addon-slot.mjs`'s `generatorFilePathUnreachable` rendering reddens `NG-PUB-F` with *"THE PROPERTY DOES NOT HOLD AT THE SHIPPED BYTES"*, and the restore prints nothing.

**WHERE STEP 3 STANDS NOW.** Seam ✅ · extraction ✅ · **the FORK is the last piece** — the WASM entry: no `node:` specifier, the injected instance, `state.handle` at the 42 receiver-handed sites, and `delete → _delete` at that dispatch table.

---

## §18 · STEP 3 COMPLETE `2026-11-17` — THE SECOND REALM RUNS, and the first drive of a fifteen-member store on a WebAssembly build

**THE ADDON SLOT AND THE FORK ARE LANDED (one `git apply`-able diff, 469,421 bytes, 14 files), and the arm was driven end to end by the supervisor with the REAL wasm glue as its bindings.**

**THE THREE PIECES, AND WHY THE SLOT WAS REQUIRED AT ALL.** The extraction made `artefact.mjs` specifier-clean but **not load-clean** — it imports six names from `artefact-node.mjs`, so the fork could not use it. The addon therefore got the class instrument's own pattern: **`src/entry/addon-slot.mjs`** (zero `node:` specifiers, no `artefact-node` import) owns the slot, `installAddon(module)`, `installAddonPath(path)` for the Node arm's walk, and `withAddon`/`boundaryReject`/`addonLoadMessage` moved **byte-for-byte**. **`src/entry/instance.mjs`** is the entry's body, ONE copy, both heads importing it. **`bindings/js/wasm/index.wasm.mjs`** is the second head: `storeCreate(bindings, cfg)` — the spelling `D-155` item 3 fixed — which installs the bindings and calls the same body.

**★ AND `D-156`'s INSTRUMENT IS INSTALLED ON THE FORK, WHICH THE PATCH LEFT OUT.** The returned patch's own finding `F-3` reported the fork shipping with **no class instrument**, so `isProxyOf` answered its `false` default and **`DD-34`'s refusal was silently lost on that arm** — a gap against `D-156`, not an open arm. **The second head now installs the `structuredClone` probe at its own evaluation**, so a `Proxy` is refused **before any trap runs** on both realms and the instrument's home, not the decision, is what differs.

**THE DRIVE — the real glue instantiated by `initSync`, handed to the fork as its bindings:**

```
storeCreate(glue, cfg)        → an instance with 15 own members
write(["t"], "mem", {a:1})    → {"op":{"opId":"op-1","kind":"write","address":["t"],"tier":"mem",
                                   "before":{"present":false},"after":{"present":true,"value":{"a":1}},
                                   "seq":1},"watched":[],"triggered":[]}
read(["t"])                   → {"a":1}
readLiteral(["t"])            → THREW ReadTargetIsBranch        ← the declared refusal: a container is a branch
write again {a:2}             → op-2 | read after → {"a":2}
listen + register + write     → "listener fired 1"              ← ★ A LISTENER RAN THROUGH THE WASM CROSSING
delete(["t"])                 → a DeleteRecord, triggered:[{"handle":"h","address":["t"]}]
read after delete             → AddressNotFound
```

**Fifteen members, listeners firing, writes landing, deletes landing — on a WebAssembly build, through the package's own entry, with no `node:` byte on its path** (18 modules transposed, `node:` specifiers: none, `artefact-node` absent).

**AND THE DRIVE FOUND ONE GAP THE PATCH COULD NOT SEE, WHICH IS THE REASON A DRIVE RUNS.** `D-155` item 4 ruled `commitFile` absent from that arm and said *"the writer is unreachable"* — **true of the STORE's writer and not of the PACKAGE's call to it**: `state.mjs`'s `commitFile` helper is reached by the terminal arm on a passing `file`-tier write and **lets the store decide eligibility**, so with no entry a lawful write threw a raw host **`TypeError`** (`state.mjs:1263` ← `delivery.mjs:1245` ← `terminalArm`). **The fix is two lines and one declaration**: an arm that exports no `commitFile` **performs no store save** — because on that arm a `file`-tier register is reachable only with a caller's `saveCall`, whose save the terminal arm performs instead (`D-133` item 3: *"the store's own writer is NOT USED"*). **The Node arm's bytes are unmoved** (its entry exists, the branch is never taken).

**MEASURED, EVERY FLOOR, AFTER ALL OF IT.** `npm test`: **`1359` tests, `1358` pass, `0` fail** · `npm run typecheck`: **exit `0`** · `cargo test`: **22 `ok` lines, 0 FAILED** · `cargo check --target wasm32-unknown-unknown`: **0 errors** · the load test: **18 modules, no `node:` specifier, `artefact-node` absent** · cycle check: **0 cycles over 20 modules**.

**WHAT THE PATCH ITSELF REPORTED, CARRIED HERE SO IT IS NOT LOST.** **`F-1`** the fork sits at `bindings/js/wasm/index.wasm.mjs` because **two shipped cells refuse a root `.mjs`** — `blind-cjs-interop.test.mjs:308` (the package root carries exactly one `.mjs`) and `package-entry.test.mjs:78`–`:87` (`S-ONE-ADDON` scans the entry's bytes for `/WebAssembly|\.wasm/`) — **so the canonical location is a test-writer's re-cut and the `DELIVERY` question of whether the second realm ships at all**; the move is `git mv` plus four `../src/` → `./src/`. **`F-2`** an empty injected slot answers `FilePathUnreachable` with the subject **`'bindings'`** — **the architect's open item, answered by not minting a status**. **`F-4`** `commitFile`'s absence is now handled at the one call site. **`F-6`** two test files still import `withAddon` from `artefact.mjs`'s re-export. **`F-7`** `installAddon` admits *"an object carrying a callable own data `storeCreate`"* and refuses everything else, class-first by descriptor.

---

## §19 · STEP 5's FIRST WAVE LANDED `2026-11-17` — six sentences re-scoped, five pointed at, and not one promise made

**`scratch/l4-realm-sentences/realm-sentences-wave1.diff` (31,307 bytes, two files, `git apply --check` exit `0`) applied: 36 inserted lines across `docs/specs/storeroom-js/contract.md` and `strata/brief.md`, PURE INSERTION in every hunk — the amended sentences stand byte-for-byte and are READ THROUGH their dated clauses (`RCA-8(d)` ANNOTATE-BESIDE).**

**THE SIX TAKEN, IN §13's COUPLING ORDER, ROW 6 FIRST.**

| §2 row | the sentence now | the class |
|---|---|---|
| **6** | the failure member reads *"a browser or renderer promise **for the Node build** anywhere in the package's documentation"*, with the provenance that it stood on `A70`'s premise | **REVERSAL**, landed first |
| **2** | *"THE REALM SET IS CLOSED AT ONE MEMBER **PER BUILD**"* and the claim re-spelt as *the Node build's* realm claim beside *the second build's* | **NARROWING** (indexed, not weakened — said in those words) |
| **4** | *"reaches exactly one claimed realm **PER BOOT**"* | **NARROWING** |
| **7** | `HO-5`: *"NOTHING OF A BROWSER BUILD IS SHIPPED … AND THE REALM IS NOW SUPPORTED AS A BUILD"*, its revisit recorded as **FIRED and partially discharged** (`D-154` is that fresh ruling and it names the carrier), the row keeping its id, its place and `6 + 1 = 7` | **REVERSAL** |
| **8** | `DD-24`'s **refusal unmoved** (*"a co-equal CJS arm"*), its **`alt` price RE-GROUNDED** from *"a second claimed realm"* to *"two module systems inside ONE claimed realm"*, with the guard written: *"a reader who takes this row's re-grounding for a collapse of the refusal is wrong, and this cell is where that reader is stopped"* | **REFUSAL UNMOVED + a FALSE GROUND repaired** |
| **11** | `strata/brief.md`: *"the claimed realm is Node ESM"* narrowed to *the Node build's realm*, with the second build named **as a build** | **NARROWING** |

**THE FIVE LEFT, EACH WITH ITS POINTER AT ITS OWN BYTE**: the archived `package.md` (**cited at `:700`, never rewritten**) · `P-SR-7`'s load-time-reach sentence and `S-ONE-ADDON` (**UNMOVED by `D-154` item 3**) · the guides (a guide pass, waiting on a build that SHIPS) · `bindings/js/README.md` (**a shipped artefact's byte — `delivery`'s, and a release act**).

**AND THE HONESTY SENTENCE THE WAVE TURNS ON, WRITTEN ONCE**: *"no sentence of this clause asserts that a WebAssembly build of this store is published, is in the package's `files` allowlist, or is reachable through the published `exports` map. The build is SUPPORTED AS A BUILD; NO ARTEFACT OF IT IS PUBLISHED ON THIS TREE."* **The implementer's own refused flourish is recorded with it**: it declined to write *"a browser consumer may reach the store today by importing the second entry"* — **the one promise this wave exists to refuse**, since the fork stands outside `files` where two shipped cells and `delivery` leave it.

**NO CELL READS A MOVED SENTENCE, CHECKED RATHER THAN ASSUMED**: nothing in `tests/` reads a `docs/` or `strata/` byte; the cells that QUOTE these sentences quote them in titles and messages over shipped bytes; and every moved sentence is ANNOTATE-BESIDE, so its original bytes still stand.

**MEASURED.** `npm test`: **`1359` tests, `1358` pass, `0` fail** · `npm run typecheck`: **exit `0`**. Docs-only: no code, no test, no declaration and no Rust byte moved.

**AND THE TWO ITEMS STILL WITH THE ARCHITECT, unchanged by this wave and now the only things between the second realm and a SHIPPED one**: **`F-1`** — the fork's canonical home (`bindings/js/wasm/index.wasm.mjs`) is blocked by `blind-cjs-interop.test.mjs:308`'s root-`.mjs` count and `package-entry.test.mjs:78`–`:87`'s `S-ONE-ADDON` `.wasm` scan, **both of which are the NODE arm's own cells and neither of which may be re-cut by a pass that does not own the publish shape** — and whether the second realm ships at all is `D-4`'s `delivery`; **`F-2`** — the status an empty injected slot answers is `FilePathUnreachable` with subject `'bindings'`, which this tree **chose by not minting a member** and which no ruling names.

---

## §20 · `D-157` TAKEN `2026-11-17` — the second realm becomes a SIXTH PACKAGE, the class form replaces the status form, and the two blocking cells dissolve

**`F-1` IS ARM (e) AND `F-2` IS ARM (d), AND BOTH ARE NOW IN THE TREE OR IN THE PLAN.**

**`F-1` — a sixth platform package, and the two cells that blocked the root DISSOLVE rather than move.** `blind-cjs-interop.test.mjs:308` (*"the root carries exactly one `.mjs`"*) and `S-ONE-ADDON`'s `.wasm` scan are **the Node package's sentences about its own root**; a sixth package has its own root, `files`, `exports` and cells. **The fork's home becomes that package's `index.mjs`** (a `git mv` plus its manifest). **What it owes is a UNIT and not a byte**: the name, `files`, `exports`, the `types` condition, the floor and the publish path — **every one a declaration (`D-4` hands the publish shape to `delivery`), with the five platform packages as the template and not the decision** — plus its own surface, reachability and install-shape cells. **The WASM declaration's path, `SILENT` since `D-155` item 2, now has a home.**

**`F-2` — IMPLEMENTED AND DRIVEN, and it is TWO STATES TOLD APART BY ONE FACT OF THE FILE.** `addon-slot.mjs`'s `withAddon()` reads its own `loadPath`: **a path stands only on the host-borne arm**, so where a path stands and the walk answered nothing the surface's **declared** `FilePathUnreachable` stands **(byte-unmoved, `PUB-R-3`'s arm, its cells green)**; where **no** path stands the factory was handed nothing and **`PAR-JS-12`'s `TypeError` is thrown** — `status` absent, message present — as `installAddon`'s own refusal already does. **Both leave the slot empty.**

**DRIVEN BY THE SUPERVISOR:**

```
storeCreate(undefined, cfg) → TypeError | status member: false | "…the injected bindings are undefined…"
storeCreate(null, cfg)      → TypeError | status member: false | "…are null…"
storeCreate({}, cfg)        → TypeError | status member: false | "…are a plain object…"
storeCreate(7, cfg)         → TypeError | status member: false | "…are a number…"
storeCreate(glue, cfg)      → an instance
withAddon() on an empty injected slot → TypeError (no status)
after install: read → 1
```

**MEASURED.** `npm test`: **`1359` tests, `1358` pass, `0` fail** — **the Node arm's absent-artefact path is untouched and every cell that
drives it is green** · the drive above.

**THE LADDER, AND WHAT REMAINS.** The nine units ✅ · the second realm ✅ (crossing, seam, extraction, fork) · the realm sentences §19 ✅ · **`D-157`'s
`F-2` ✅** · **what is left is a single unit of `delivery`'s**: the sixth package — its manifest, its declaration's filename, its publish path, and
its three cells — and with it the guides and the shipped `README.md` that `wasm-realm.md` §2 rows 9–10 hold until a build ships.

---

## §21 · THE SIXTH PACKAGE IS BUILT AND STAGED `2026-11-17` — and it stands BESIDE the published five, not among them

**`D-157` item 1 IS IMPLEMENTED AS A PACKAGE THAT BUILDS, LOADS AND REFUSES — and its ADMISSION to the published set is the one thing still `delivery`'s, for a reason this pass measured rather than assumed.**

**WHAT EXISTS**: `bindings/wasm/` — `package.json` (name `@auspicion/provident-storeroom-js-wasm`, `type: module`, 1.12.0, the six housekeeping fields the five siblings carry, **no `os`/`cpu` because a WebAssembly build runs anywhere**) · `index.mjs` (the fork, its five `./src/` imports) · **`src/entry/` (18 parts) and `src/constraint-kernel.mjs` COPIED, because this package must be self-contained — the main package's `exports` map exposes none of its parts** · `storeroom_js_binding_bg.wasm` + its glue and its two generated `.d.ts` · `LICENSE` · `README.md` · `BUILD-INFO.txt`. **`scripts/build-wasm-package.mjs`** stages all of it: the crate for `wasm32`, the glue, the body copy, the housekeeping, **and the declaration — the generator's WASM arm installed as this package's `index.d.ts`, the Node arm not shipped here** (one generator, one source, two arms, each package taking the arm that describes it).

**DRIVEN, FROM THE PACKAGE'S OWN ENTRY**: **15 members** · `write`/`read` → `{"a":1}` · a `Proxy` at the value position → **`ValueRefusedAtBoundary`** · **`index.d.ts` line 277 reads `readonly filePath?: never;`** · **transitive set 18 modules, `0` outside the package, `0` `node:` specifiers**.

**★ AND THE ONE MEASUREMENT THAT MOVED THE PACKAGE.** Built first **inside `bindings/js/platforms/`**, where the five platform siblings live, **it reddened FIVE published-artefact cells** — `NG-PUB-H` (a platform manifest's `os`/`cpu` match its name and its `files` carry its `.node`), `P-PUB-7::S-LICENCE` (no sixth declaration site), `P-PUB-7::S-MANIFEST` (the licence notice travels with **all six artefacts**, and the publish-configuration fields) and `P-PUB-8::S-TAG` (**the workflow file and the five platform manifests**). **They are not wrong and neither is the package: they are the PUBLISH SHAPE's censuses, and the contract declares the artefact set at `§14`/`§15` with the *"the six manifests move to `X.Y.Z` together"* coupling — so a sixth artefact is `D-4`'s publish shape and `D-157` item 1 of its unsettled says so in those words.** **So the package was moved OUT of `platforms/` to `bindings/wasm/`, the five cells returned to green, and the manifest now declares itself STAGED rather than admitted.** **What that buys is that the act which admits it moves the contract's artefact count, the version-coupling rule and those five cells TOGETHER — one pass, one declaration, and no window in which the tree claims an artefact the publish shape does not carry.**

**MEASURED.** `npm test`: **`1359` tests, `1358` pass, `0` fail** (all five publish cells green again) · `npm run typecheck`: **exit `0`** · the drive above · `node scripts/build-wasm-package.mjs`: **exit `0`**.

**THE LADDER, CLOSED EXCEPT ONE ADMISSION.** The nine units ✅ · the second realm ✅ · the realm sentences ✅ · **`D-157`'s `F-2` ✅** · **the sixth package ✅ BUILT AND STAGED** · **what remains is `delivery`'s**: admit the staged package to the published set (the contract's artefact count, the coupled-version rule, the five publish cells) — and with it the guides and the shipped `README.md` that §2's rows 9–10 hold until a build ships.

---

## §22 · CLOSE-OUT VERIFICATION `2026-11-17` — every leg of both realms, measured in one sweep

**THE WHOLE TREE, END TO END, WITH THE SECOND REALM IN IT.**

| # | leg | the reading |
|---|---|---|
| 1 | `npm test` (the Node package) | **`1359` tests · `1358` pass · `0` fail** |
| 2 | `npm run typecheck` | **exit `0`** |
| 3 | `cargo test` (native) | **22 `test result: ok` lines · `0` FAILED** |
| 4 | `cargo check --target wasm32-unknown-unknown` (both crates) | **`Finished`, 0 errors** |
| 5 | `npm run build` (the `.node` artefact) | **exit `0`** |
| 6 | `node scripts/build-wasm-package.mjs` (the sixth package) | **exit `0`** — staged at `bindings/wasm/` |
| 7 | `node scripts/emit-declarations.mjs` (both arms) | **`160274` bytes** (Node, identity asserted) and **`160273`** (WASM, region body replaced, outside byte-identical) |
| 8 | **the second realm, driven through its own package** | see below |

**THE DRIVE, IN ONE OBJECT**: `{"members":15,"read":{"a":1},"fired":1,"proxy":"ValueRefusedAtBoundary","deepClone":{"a":1},"detached":"AddressNotFound"}` — **a fifteen-member store on a WebAssembly build · a write and a read · a listener firing through the wasm crossing · a `Proxy` refused in the declared form · the deep clone holding under an app-side mutation (`D-156`) · and a detached call answering the one declared form rather than a host `TypeError` (`C-W10`).**

**WHAT THE SESSION BUILT, IN ONE PLACE.** `D-154` lifted the one-realm claim · `D-155` took three forks and corrected this plan's own `Reflect::set` error · `D-156` took the `structuredClone` instrument and declared the deep-clone law · `D-157` took the sixth package and the class form · **nine units landed, the realm plan's steps 1–5 executed**, and the ledger is `docs/L1/wasm-realm.md` §1–§22 with `docs/L3/wasm-realm/design.md` beneath it.

**⟶ AND THAT READ AS OF ITS OWN DATE, NOT AS THE TREE'S: THE PACKAGE IS ADMITTED FROM `d949447`** — it moved to
`bindings/js/platforms/wasm/` beside the five native siblings, `DD-25`'s published set reads **seven** manifests, the coupled-version rule
reads *"the seven manifests move to `X.Y.Z` TOGETHER"*, and `publish.yml` carries a `wasm` job beside the matrix. **The sentence below is
the row's own state and is read through this one.**
**AND WHAT IS DELIBERATELY NOT DONE, so no pass mistakes the state for a finished release.** **The sixth package is STAGED, NOT ADMITTED**: `bindings/wasm/` sits outside `bindings/js/platforms/`, its manifest declares itself staged, and **the act that admits it must move the contract's artefact set (`DD-25`, the `§14`/`§15` coupling), the workflow's matrix, and five published-artefact cells TOGETHER** (§21's measurement) — **and that act is a RELEASE, whose class `D-154` item 4 of its unsettled still leaves unclaimed.** **The guides and the shipped `bindings/js/README.md` wait on that same shipment** (§2 rows 9–10). **`design.md` §8's `isProxy` residue, the `STORE_RETIREMENT` finalizer and the guides' unwrap sentence remain open as it records them.** **Nothing is committed: 70 changed or untracked paths stand in the working tree.**
