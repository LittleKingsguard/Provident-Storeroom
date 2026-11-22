# L3 design — the crossing and the loader split (the second claimed realm)

**WHAT THIS FILE IS.** The design `D-155` leaves owed after the form and the target. **No byte is moved by this pass** — it is shell-less, `wasm32-unknown-unknown` is not installed and `wasm-bindgen` is not in the offline registry. **EVERY RUNTIME CLAIM IN THIS FILE IS `NOT DRIVEN`.** Written `2026-11-17` by **`role_l3_designer`**, landed by the supervisor.

**Figures re-read at their bytes:** 19 Node entries · 18 on the WASM arm · 17 `Instance` delegates · 6 `cfg` keys · 15 `StoreInstance` members · 23 statuses. **And four figures the plan printed short — printed here rather than absorbed (see §8): `types.isProxy` is 25 code sites, not 37 · `withAddon()` is 15 sites, not 16 · the receiver census is a sum of four forms, not 42 addon calls · seven parts of `src/entry/` are realm-neutral, not six.**

---

## §1 · The crossing's form — **FREE FUNCTIONS EACH TAKING A HANDLE**

**DECISION, and it moves no caller-facing surface**: the instance's fifteen members and `cfg`'s six keys are the package's; the crossing may be shaped freely beneath them.

**Why not `#[wasm_bindgen] pub struct Store` with methods** — three grounds at their bytes:

1. **The receiver is DATA, not a language mechanism here.** `state.receiver` (`state.mjs:1204`, `:1209`) is the object the package returns to the caller; its identity is the `INSTANCES` key (`:949`) and it carries `STORE_INDEX` (`:962`). A `#[wasm_bindgen]` class method resolves its store from `this.__wbg_ptr`, which that object is not; making it so means either a sixteenth own member (moving the fifteen-member census) or fifteen pure-forwarding methods.
2. **It loses the declared detached-call observable.** `store_index_of` (`facade.rs:547`–`:581`) and `no_instance_at` (`:588`) answer **one form** for a call whose receiver names no live store. A wasm-bindgen method called detached raises a **raw host `TypeError`** from the glue; called on a freed instance it panics. **Both are a second failure form crossing the boundary** (`DD-12`'s prohibition). Free functions keep the crate's own arm.
3. **`withAddon()` hands out a module object** (`entryOf()`, `state.mjs:1186`; 15 sites). Free functions keep that shape.

| the call | today | on the WASM arm |
|---|---|---|
| ordinary | `entryOf().read.call(state.receiver, a, b)` | `entryOf().read(state.handle, a, b)` |
| `Reflect.apply` | `Reflect.apply(entryOf().read, this, args)` | `Reflect.apply(entryOf().read, undefined, withHandle(state.handle, args))` |

`withHandle` is one helper on the file's own idiom — a fresh dense list by `appendOwn`, so the caller's array is never mutated and `Reflect.apply`'s by-index guarantee is kept. `state.receiver` becomes **`state.handle`** as the routing datum: **the envelope's forced change.**

## §2 · The glue target and the entry's shape — **`--target web` + `initSync`, INJECTED BY THE HOST**

**`web`, because it is the only target whose glue is an ES module that instantiates nothing at its top level.** `bundler` imports the `.wasm` as a module (the instantiation joins the entry's graph, resolved by a loader the package does not control); `no-modules` is a classic script (not an ESM, and the graph then depends on a `<script>` tag). **`D-155` item 3's order is honoured literally**: the host fetches the bytes and calls **`initSync`**; the entry imports the glue **statically** (a synchronous import that evaluates no instantiation) and calls functions. **No `instantiateStreaming`, no `await __wbg_init()`, no top-level `await`.**

**The entry's shape: forked, not cfg'd** (JS has no cfg). The Node arm keeps `index.mjs:87`–`:112` byte-identical; the WASM arm is a second module with **no `node:` specifier at all**, importing the same parts and the same shared instance-building body. The arms differ in one function: how the module of free functions arrives.

**Two shapes priced; (A) is the one this design draws.** **(A)** a factory `storeCreate(bindings, cfg)` in the WASM arm's own module — **the Node arm's `storeCreate(cfg)` is byte-unmoved**, one position, one export, and the two arms are already two modules, so `wasm-realm.md §2` row 2's *"closed at one member per build"* is exactly this shape. **(B)** `storeCreate` gains a position on one shared module — that moves the Node arm's declared one-position arity, every Node call site, and the `ONE_VALUE_EXPORT` and arity cells: **caller-facing and a declaration, not a design's.** **So the factory's SPELLING is the architect's; its SHAPE — `(bindings, cfg)` in, the same fifteen-member instance out — is this design's and every byte below assumes it.**

`lib.rs` gains a target split the plan did not name: `crossing` stays `pub` and realm-pure; `facade`/`codec` are `#[cfg(not(target_arch = "wasm32"))]`; `wasm` is `#[cfg(target_arch = "wasm32")]`. **`crossing.rs` and `create_with_inputs` are byte-unmoved**; only `codec.rs`'s accessors are re-authored (§4). **The factory returns what `storeCreate` returns today** — fifteen own members, the same `Object.keys` census, the same non-enumerable row carrying an opaque handle. **The injection changes no entry:** the addon's `storeCreate` keeps one wire position and a `u32` answer on both arms.

## §3 · The refusal through the glue — **and the one figure `D-155` gets wrong**

`throw_refusal` (`facade.rs:195`–`:224`) is `Object::new`, a two-pair `Vec<Property>` (`status`, `message`) from the core's own `Refusal`, **`define_properties` (`:219`) — `DefineOwnProperty`, consulting no chain** — then `env.throw(object)`, the raw-value escape hatch, with two `Err(_) => return` arms because *"there is no second shape to fall back to"*.

**★ `D-155` item 1 calls `js_sys::Object` + `Reflect::set` *"`throw_refusal`'s own idiom", AND THAT IS WRONG.** **`Reflect::set` is `[[Set]]`, and `[[Set]]` is precisely what `D-35` removed from this frame** (`facade.rs:182`–`:194`): with a non-writable own `status` on `Object.prototype`, `[[Set]]` answers `false` and **the own member is dropped** — measured on the artefact as `own=["message"]`, `hasOwnStatus=false`. Reproduced through the glue, the object reaches `refusal.mjs:103` with no own `status`, `fail`'s provenance test refuses it, and **the caller receives the bare object instead of the one form** — the `F8-2` state, and in a browser `Object.prototype` is the page's own.

**So the twin is `define_property`, not `set`** — same two names, same two strings from the same core bytes, same flags, and **no caller-facing surface moves**. Two members and no third: **`log` and `address` are the JS boundary's**, attached at `fail`, never in Rust. **Thrown and never serialized:** `Err` carries the object; wasm-bindgen's glue performs `throw takeObject(err)`. **Forbidden by construction:** `JsValue::from_str`, `JsError`, `Result<_, String>`, any exported error struct — and `Refusal` must never be an exported signature's `Err` (`Into<JsValue>` would put `js_sys` inside the realm-pure `crossing.rs`). **`version` and `errorMessage` answer no `Result` at all** — a `Result` there mints a failure path the export set does not declare.

**`answer_or_throw`'s twin** returns the refusal rather than throwing beside an `Ok(undefined)`. **And what `carryRefusal` sees is nothing new**: `state.mjs:1212` catches it, `fail` reads `status`/`message` by `[[GetOwnProperty]]`, and rebuilds the four-member form. **Both members are own DEFINED data properties on both arms, so the same four members cross and `carryRefusal` and `fail` move zero bytes** — the crossing's cheapest asset after §5's.

## §4 · The codec's replacement, class by class

| class | today | the twin | what keeps the discipline |
|---|---|---|---|
| member read | class test → `has_own_property` → read (`:257`–`:268`) | `is_object()`/`is_function()` → `has_own_property` → read | **the own-key gate IS the discipline**: an own data property shadows the chain, so no `[[Get]]` reaches a caller's prototype. **No `coerce_to_object`** — no wrapper minted, no trap reachable by the class test |
| `Str`/`Absent` | `cast::<String>`, `unwrap_or_default` | `as_string()` → `None` → **the same sentinel** | class read first; a non-string still answers `''`, so `NonString` rows are reached by class |
| boolean | `Kind::Boolean` + `cast::<bool>()` | `as_bool().unwrap_or(false)` | **class-first and silent-false**: a caller-spelled `durable_without_path: 1` still reads `false` |
| number/bigint | number gate, `bigint` read as its own class | `as_f64()` is `None` for a `bigint`; the class predicates carry the same rows | `A76`/`JS-6`: a `bigint` never reaches the numeric arm |
| address walk | dense walk, holes decided at the boundary | `is_array()` + `length()` + `get(i)` | the walk stays dense and index-ordered |
| op id | four class tests | the same four | no coercion, no default |
| **depth ceiling** | `depth > 126 \|\| visited > 1_000_000` measured over the core tree (`crossing.rs:717`, `:655`–`:680`) | **the ceiling does not move (core code)**; what moves is the *builder* — `codec.rs`'s `value_of` casts through `serde_json::Value`, **which cannot be cast from a `JsValue`** | ★ **the twin must consult `126` / `1_000_000` BEFORE it descends, with its own counter** — a recursive walk overflows the wasm stack long before 126 if the ceiling is consulted afterwards. **A new obligation, not a port** |

**`util.types.isProxy` has no browser equivalent** (`wasm-realm.md §9.5`), and the affected sites are **five parts, 25 code occurrences** (`frame.mjs` 6 · `class-decision.mjs` 12 · `carrier.mjs` 4 · `delivery.mjs` 2 · `constraints.mjs` 1). **`DD-34`'s Proxy refusal loses its instrument.** Four arms, **priced and none chosen**: **(i) a DECLARATION** that a Proxy is not detected on this arm — **and a trap may now run**, the hazard the refusal existed for; **(ii) a WEAKER CHECK** — no ECMAScript primitive distinguishes a Proxy from its target, and the walk must read own descriptors, which a Proxy's trap answers — nothing sound builds; **(iii) A REFUSAL THAT CANNOT FIRE** — a dead arm a reader would trust; **(iv) `structuredClone` as a substitute instrument** — it throws on a Proxy, giving the refusal a real detector **at one clone per value on the hottest path**, and narrowing the admitted domain to cloneable values, which `brief.md §5` invariant 2 already assumes but no clause states for this arm.

## §5 · The loader split, by file

**★ SEVEN PARTS ARE ALREADY REALM-NEUTRAL, NOT SIX.** `refusal.mjs`, the five kernel parts, **and `state.mjs`** — `carryRefusal`, `entryOf`, `INSTANCES`, the commit windows and every symbol-keyed datum import **no `node:` specifier**. **The crossing's own machinery and the kernel are realm-free today**; `wasm-realm.md §6`'s list understates it by one file, and it is the largest one.

| loader-bound byte | what the WASM arm does instead | how |
|---|---|---|
| `index.mjs:87`–`:91` (five `node:` builtins), `:109`–`:110` (`createRequire`, `ADDON_PATH`) | nothing — no path to derive, the bindings are injected | **forked** with the entry |
| `index.mjs:112` `adoptModuleContext(url, require_, ADDON_PATH)` | **the same call with the injected bindings as its subject** | **injected** — the seam already exists |
| `artefact.mjs:2`–`:4` (three static `node:` imports — the module cannot even load without them) | the `node:`-importing bytes move out | **fork by extraction**: the three-rung walk, `packageVersion()`, the platform names and `absentSubject` go to a Node-only part; `withAddon` · `boundaryReject` · `addonLoadMessage` · the generator strings stay |
| `artefact.mjs:175`–`:238` (the three-rung walk) | **`withAddon()` answers the injected bindings**: `loadAddon()` gains one arm at its head and the walk is not reached | **injected** — `adoptModuleContext` is already an injection seam |
| `node:util` in five parts | one import line swapped for a local helper | **neutralised**, conditional on §4's instrument |
| `constraints.mjs:100` (lazy `require_` of the barrel) | **a static import**: a browser build ships the package, so the laziness has no subject — and an `await import()` would make the first constraint act asynchronous and break `DD-17` | **neutralised**, and the WASM arm is *closer* to `D-1`'s *"tightly integrated"* than the Node arm |

**What the fork leaves:** the forked entry is `:87`–`:112` plus the module-access function; **the shared body — the fifteen members, `deliver`, the kernel glue — is ONE copy.**

## §6 · The entry set at 18, and the declaration's generation

**The WASM module exports 18 of the Node arm's 19: `commitFile` (`facade.rs:1072`) is ABSENT** (`D-155` item 4), and the other eighteen keep their names and positions. **Which `create` entry the injection changes: NEITHER of the crossing's** — `create` → `create_with_constraints` → `create_with_inputs` keep all four positions and the addon's `storeCreate` keeps one. **What changes is where `storeCreate`'s argument comes from being called** — that is why `D-155` item 3 is the cheapest of the three forks.

**The declaration's generation (`D-155` item 2).** The one source stays `bindings/js/index.d.ts`, hand-authored — **no second hand-maintained surface.** **The realm marker's home (the design's): a comment-delimited region around the one member** — `// ⟦realm:filePath:begin⟧` above, `…:end⟧` below — **both indented comment lines, so neither the member parser nor the status parser sees them and they cannot move a census.** A Node script run from `npm run build` emits **two** declarations: the Node arm's — **the source's own bytes, region unchanged, and its identity is asserted** — and the WASM arm's, the region's body replaced by `readonly filePath?: never;`. **The WASM file's PATH is `delivery`'s** (second package, second artefact, or subpath is `SILENT`).

**The two census cells.** **`StoreConfig`** asserts six rows with `filePath` optional — **and on the WASM arm the key is still PRESENT and still optional**, because `never` narrows the value's type and not the member's presence: **the six rows are byte-identical on both arms and the cell runs twice unchanged**, gaining one new assertion (a `string` in that position reddens). **`StoreStatus` is arm-invariant** (23 literals) and runs twice with nothing new. **`typecheck:stage` learns a third file — and a staged declaration no fixture imports proves nothing**: the harness owes a second consumer fixture, or arm (iii)'s type is only *staged*, never *compiled*.

## §7 · The cells this design owes

`C-W1` · `C-W2` · `C-W4` · `C-W5` · `C-W6` (the plan's, needing a build) — **plus this design's five**: **`C-W7`** the thrown value carries **own `status` and own `message`, DEFINED and never set**, run with a non-writable `status`/`message` on `Object.prototype` (**`D-35`'s measurement re-run on the WASM arm**, red if `Reflect::set` is used) · **`C-W8`** a store refusal reaches `fail` and the caller reads exactly `{status, message, log: [], address: null}`, four members, `carryRefusal` moving no byte · **`C-W9`** the factory's answer has the fifteen-member census and a non-enumerable row naming no index · **`C-W10`** every receiver-handed site reaches its entry with the handle in front and **a handle the table does not hold answers the same one refused form** · **`C-W11`** the WASM declaration carries `filePath?: never`, its six rows and 23 statuses match, and the Node emission is identity-clean. **And `C-W3` as the floor**: `npm test` 1356/1355/0, the twenty-two `cargo test` lines, `P-SR-7`'s `S-LOAD`/`S-ONE-ADDON`, the published-map cells, `SS-1`…`SS-12`, `RV-1`…`RV-7`.

## §8 · What this design cannot decide or verify

**NOT DRIVEN, all of it.** `rustup target list --installed` carries `x86_64-unknown-linux-gnu` and nothing else; `wasm-bindgen` is not in the offline registry. **The first measurement is `cargo check --target wasm32-unknown-unknown`, then one `wasm-bindgen --target web` run, then a read of the emitted `.js`'s first twenty lines and its export list for `initSync` — before a byte of §3's twin is written.**

**Tool facts named so no later pass assumes them:** `js_sys::Reflect::define_property`'s exact spelling (and that it performs `DefineOwnProperty`) · `JsValue::is_bigint`'s presence · whether `web`'s glue instantiates anything at its top level in the pinned version · whether `as_f64` is `None` for `bigint`.

**The architect's, named and left:** **the `isProxy` substitute** (§4's four arms, none chosen) · **the release class** (`D-154` item 4; the only realm item still unclaimed) · **the factory's spelling and module** (§2 prices (A) and (B), draws only (A)'s shape) · **the publish shape** (`SILENT`, and it decides the WASM declaration's path) · **the `FilePathUnreachable` replacement** (below) · **the sentence passes** (`D-154` item 1's eleven rows, with `contract.md:3280` re-scoped **before** any guide sentence lands).

**★ THE ONE PLACE THE INJECTED-INSTANCE SHAPE FORCES A CHANGE THE PLAN DID NOT NAME.** `wasm-realm.md §6` names `artefact.mjs`'s three-rung walk as what goes — **and what it does not name is the STATUS the walk exists to answer: `FilePathUnreachable`**, the absent/failed-artefact state (`artefact.mjs:94`–`:101`, `withAddon()`'s `fail`, the reproduced generator string). **On the injected arm there is no artefact to be absent, so that status has NO SUBJECT — and the case it covered does not vanish: it becomes *"the factory was handed nothing, or something that is not the bindings"*.** **The package must refuse that in the one form with a member of the closed twenty-three, and no ruling names which.** `AddressMalformed` — the arm `D-144` item 2 and `D-147` item 4 both use for a broken carrier — is **a reading, not a ruling.** **The same shape, smaller, appears twice more and is named so it is not discovered:** `version`'s mismatch arm is **unreachable** on this arm (there is no `package.json` read to compare against), and **`STORE_RETIREMENT` has no finalizer to fire it** — so **a WASM store is never released and the `INSTANCES` table grows**, `SC-10`'s shape one arm over.

**The design's riskiest line:** *"an injected instance keeps the entry's own graph synchronous, because `web`'s glue instantiates nothing at its top level and `initSync` performs the instantiation in the host's frame."* **Falsified by any one of three tool facts, each fatal to §2 rather than to a detail:** the pinned glue carries a top-level instantiation or `await` · **`initSync` is absent, leaving only the async `__wbg_init` and therefore a top-level `await` — the exact arm `D-155` item 3 was chosen over** · or the `web` output imports the `.wasm` as a module (the `bundler` shape leaking in).
