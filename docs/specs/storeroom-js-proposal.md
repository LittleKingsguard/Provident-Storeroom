# PROPOSAL — the generic JS integration for the native store (`U-STOREROOM-JS`)

**Role of this file.** The artifact-under-review for this project's THIRD unit's proposal-review gate (gate 1).
**Filed by the supervisor.** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no
return shape and no fail-state; it licenses no code task; it admits no unit row; it edits no byte of the
adjacent project. **Its `§1` is the architect's directive, byte-for-byte.**

**Unit id / prefix (proposed).** **`U-STOREROOM-JS`** · spec path `docs/specs/storeroom-js/`.

**Gate state at filing.** **GATE 1 — OPENED, NOT PASSED.** The chain runs on **this file and on nothing
else**: step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4
`role_change_analysis` (with the STEP-0 block folded in). **The architect's go-ahead is required before any
later gate.**

---

## §1. THE ARCHITECT'S DIRECTIVE, VERBATIM

> Proceed to close-out, then prepare for JS integration (generic, not Provident-Electron install)

---

## §2. THE CONTEXT THIS PROPOSAL LANDS IN (measured; citations, not opinions)

1. **THE STORE IS BUILT, GREEN AND AMENDED.** `U-STOREROOM-NATIVE` closed `DONE` on 2026-10-11, and the
   **listener amendment** has run all its gates: **`cargo test --offline --no-fail-fast` exits `0` — `374`
   tests · `374` PASS · `0` FAIL · `0` un-run**; the typed register layer executes **`8/8` rows on `11`
   strategy lines, ALL `HELD`, `318/400` attempts**; the **e2e JSON round-trip battery** is **`110/110`**
   (exact match in every case but the two DECLARED normalizations) and the **e2e listener-firing battery** is
   **`46/46`** (an edit at a listener's address fires its handle to the interface in every edit arm). The
   contract is `docs/specs/storeroom-native/contract.md` + five `carrier` parts; the crate is `Cargo.toml` +
   `src/**` (no dependencies).
2. **THE JS SIDE IS PARKED AS `P-1`, AND THAT PARK IS WHAT THIS UNIT IS.** `docs/pending.md` `P-1` — the
   **`28` INTEGRATION rows** of the listener gate's partition: **the realm** (`J-6`) · **the builder/ABI and
   packaging path** (`J-7`) · **the host handoff** (`J-8`) · **the crossing of every value the store
   produces** (`U-23`/`U-34`/`U-39`/`U-40`) · **the load path** · **the surface's ownership** (`U-26`) · **the
   module-supplied functions' crossing** (`U-24`) · **the consumer question** (`U-38`) · **the in-flight
   cycle's disposition** (`U-45`). **Its revisit condition is `the store passes its own test suite` — MET —
   and its LIFT IS THE ARCHITECT'S ACT; the directive above is read as authorising the PREPARATION this
   filing performs, with the park's own record left standing (lifted, not deleted, at `P-1`).**
3. **THE RULED CARRIER IS NODE-API AND THE INTEGRATION WAS DEFERRED, NOT REFUSED.** `A1` (*"Node-API"*) is the
   ruled carrier; `A8` ruled *"This is to build the store. Defer the integration until the store passes
   testing"*; `A57` ruled the firing model **return-by-handle** (the store returns handles and **invokes  **⟶ CORRECTED 2026-10-11 (STEP 2'S FINDING `K15`, THE FILING'S OWN DEFECT — `RCA-8(d)` ANNOTATE-BESIDE): `A1`/`A2`/`A8`/`A9` stand in `docs/specs/storeroom-native-proposal.md`, while **`A57` AND `A58` OCCUR ZERO TIMES THERE** — they are filed at `docs/specs/storeroom-listeners-proposal.md §18` and `§20`. Every `A40`–`A61` citation in this file therefore carries its `P:` tag with the LISTENER proposal's path and section, and every `A1`–`A9` citation the store proposal's path (the form condition `C11` makes checkable).**
   nothing**), which means **the JS side receives a list of handles and owns the invocation** — a fact this
   unit's design must honour rather than re-litigate.
4. **THE DIRECTIVE'S OWN QUALIFIER — *"generic, not Provident-Electron install"* — IS THE SCOPE RULING.** This
   unit prepares the JS integration AS A GENERIC PACKAGE for any Node/Electron/JS consumer; it does **not**
   install, wire or configure anything in the adjacent project, and **no byte under
   `../Provident-Electron/**` is read as authority or written** (`A9`). **The `HO-` handoff rule stands: a
   finding or a wiring duty for that project is a handoff row, never a patch.**
5. **THE TOOLCHAIN AND THE FIXTURES A PLAN NEEDS:** Rust `1.98.0` + `cargo` (offline-capable, **the crate has
   NO dependencies**), Node `v24.20.0`, npm `12.0.2`, `pnpm` present, and **NO `napi` CLI on `PATH`** (the
   probe is carried at `docs/next-steps.md` `L-4`) · the red set at `tests/**` with its support module · the
   **out-of-repo blind harness** at `/tmp/storeroom-blind/` (a scratch crate with a path dependency) — **the
   existing precedent for consuming this crate from outside its repo** · the amendment's declared **rust
   spellings** at `contract.md §0.4` (the crate id `storeroom_native`, the verbs, `Result<T, StoreError>`,
   `Tier`, `StoreValue`, `Segment`, the `*Arg` carriers, `NodeRef`, `StoreError`, `WriteResult`,
   `JournalOp`, `BaseState`, `DeleteReceipt`, `RollbackResult`, `ListenerHandle`, `MessageArgs`).

---

## §3. THE FILING'S OWN BOUNDS

1. **IT ASSERTS NOTHING ABOUT THE ADJACENT PROJECT** and licenses nothing in it. A conflict with its bytes is
   intentional (`A9`).
2. **IT LICENSES NO CODE TASK AND ADMITS NO UNIT ROW.** No binding is written, no package is published, no
   `package.json` is created by this filing, and **the ledger move it owes is its own open row** (`§6`).
3. **IT IS NOT THE CONTRACT.** Every clause this unit needs is owed at gate 2 by `role_spec_writer`, in the
   directory form, with the typed `§5.x` register for a code-bearing unit — **and this unit is code-bearing
   (a binding crate and/or a JS package), so the register is owed.**
4. **IT CARRIES NO RULING.** `§4` prints the directive's fragments beside the standing rulings as quotations,
   **with no reading taken**; **whether they conflict, and which governs, is the gate's to determine.**
5. **NOTHING WAS RUN BY THIS FILING'S AUTHOR BEYOND READ-ONLY INSPECTION** — no `cargo`, no `node`, no `npm`,
   no test, no build, no writing `git` command. **Layer discipline: every claim here is `[T]` (text/contract/
   tracker) or a named measurement; NO `APP` CLAIM is made anywhere.**

---

## §4. THE DIRECTIVE BESIDE THE STANDING RULINGS AND PARKS — QUOTATIONS ONLY, NO READING TAKEN

| # | The directive's fragment (verbatim) | The standing clause (its own words, with its path) | The two quotations' own terms |
| --- | --- | --- | --- |
| **`X-1`** | *"prepare for JS integration"* | `A1`: *"Node-API"*; `A8`: *"This is to build the store. Defer the integration until the store passes testing"*; `docs/pending.md` `P-1`'s row (the `28` integration rows and their revisit condition) | the carrier is ruled and the work was deferred to exactly this moment (the store now passes its own suite) |
| **`X-2`** | *"generic, not Provident-Electron install"* | `A2`: *"integration into Provident-Electron will be delegated to that project's agents"*; `A9`: the adjacent project is *"poisoned"* context, never a source; the `HO-` handoff rule | the JS side is this project's to BUILD AS A PACKAGE and not to INSTALL anywhere; the consuming project's wiring is its own agents' |
| **`X-3`** | *"close-out"* | the amendment's open list (its `DONE`-row cells, the archival loop) | the first clause of the directive names the outstanding close-out, which this pass performs |
| **`X-4`** | the JS side's firing duty | `A57`: *"a handle that it returns to alert the client of the trigger"*; the listener amendment's return-by-handle clause (`write-and-read.md §6.5` item 12 (c)) | the store **invokes nothing**; a JS consumer receives handles and owns the invocation, so this unit's surface is a delivery surface |
| **`X-5`** | the value crossing | the amendment's `§0.4`'s declared rust spellings; the e2e batteries' `StoreValue` corpus (`110` cases) | the crossing must carry the store's own value taxonomy **including its two DECLARED normalizations and its `ValueNotAdmitted` refusal**, and `Handle`s/`Segment`s are values that cross too |

---

## §5. WHAT NEITHER THE DIRECTIVE NOR THE RULINGS NAME (adjacencies; no ruling)

| # | The adjacent subject | Why it is adjacent |
| --- | --- | --- |
| **`N-1`** | **the binding mechanism's concrete form** | `A1` rules *"Node-API"* as the carrier and names no builder, no ABI policy, no prebuild matrix and no `napi-rs` vs hand-written `napi-sys` choice — `J-7`'s own subject |
| **`N-2`** | **the realm** | the adjacent host bundles `main` as node-CJS and the renderer as browser-ESM (`docs/specs/storeroom-native-proposal.md` `§2` item 5); **the directive says GENERIC**, so the realm question becomes *"which realms does the generic package claim"* — `J-6`'s subject |
| **`N-3`** | **the value crossing's rules** | the store's taxonomy (`StoreValue`), its `Segment`/`AddressArg`/`TierArg` carriers, its `Handle`, and its two declared normalizations must be MAPPED to JS types (and back) with the refusals preserved — `U-34`'s subject |
| **`N-4`** | **the failure channel across the boundary** | the store answers a closed `StoreError { status, message }` and **never throws in Rust**; whether the JS side returns it as a value or throws is this unit's to declare — `U-22`/`U-23`'s subject |
| **`N-5`** | **the handles' and the watched list's delivery** | `A57`/`A58`'s surfaces: `triggered: ListenerHandle[]`, `watched: Segment[][]`, `opId`, `BaseState`, `NodeRef` — each must cross as a value with a declared JS spelling |
| **`N-6`** | **packaging, publishing and the install story** | a generic package needs a name, a versioning policy, a prebuilt-artifact policy, a rebuild-on-install story and an npm-vs-cargo distribution decision |
| **`N-7`** | **the crate's own surface across the FFI boundary** | the store's `Store` is a Rust structure with borrows (`&NodeRef`, `&ListenerHandle`); a Node-API binding owns the instance and its lifetime — the ownership model is unstated |
| **`N-8`** | **where the JS tests run** | the store proved itself in an out-of-repo scratch harness; whether this unit's JS tests run under `node --test`, a JS test runner, or a Rust-driven integration crate is unstated |

---

## §6. THE ADOPTION TRIGGER'S PREMISE, AND THE LEDGER MOVE THIS FILING OWES

**The STEP-0 determination is `role_change_analysis`'s (folded into step 4).** **The premise this filing records: the identifiers this unit will name — `binding` · `addon` · `napi`/`Node-API` · the JS spellings of the store's own types — are NOT contract terms of this project's shipped contract (its `§0.4` declares RUST spellings only), while the JS side's own vocabulary (a callback, a promise, a plain object) belongs to the JS language and not to any artifact of this project.** **Whether the trigger fires, and whether a dossier or the zero-row exemption with a written rationale applies, is the gate's determination — not this filing's.**

**THE LEDGER MOVE THIS FILING OWES, WITH ITS TERMS:** the ledger stood at **`1 DONE / 1 open` UNITS = `2`**; **this filing opens a third unit's gate-1 row, so it reads `1 DONE / 2 open` UNITS = `3` (`1 + 2 = 3` ✓)** — landed in `docs/next-steps.md` in the same pass.  **⟶ CORRECTED 2026-10-11 (STEP 2'S FINDING `K14`, THE FILING'S OWN DEFECT — `RCA-8(d)` ANNOTATE-BESIDE): the tracker's `## DONE` section carries TWO closed unit rows and `## OPEN`'s own closing clause still read `1 + 0 = 1`, so the move was landed while three of the file's arithmetic statements contradicted it. THE TRACKER GATE OWED THE RECONCILIATION AND THIS PASS PAID IT: `## OPEN`'s closing clause now reads `2 + 0 = 2` and names the live ledger `1 DONE / 2 open` UNITS = `3`, with the LAST dated clause of the head line as its operative statement (condition `C12` makes three-way agreement over the tracker's sections a gate-1 condition).**

---

## §7. PROVENANCE

1. **READ AT ITS OWN BYTES (this pass):** the directive (the architect's message) · `Cargo.toml`, the crate's module list, `src/error.rs` (the closed `StoreError`), `src/records.rs` (the returned shapes), `src/value.rs` (the taxonomy) · `docs/specs/storeroom-native/contract.md`'s `§0.4`, `§3.6`, `§5.x`'s register, `§8.1`–`§8.3` · the greens and both e2e batteries' headers and figures · `docs/pending.md` (`P-1`/`P-2`/`P-3`) · `docs/next-steps.md` (the ledger, the DONE row, `L-4`'s toolchain probe) · `docs/decisions.md` · `docs/specs/storeroom-native-proposal.md` (`A1`/`A2`/`A8`/`A9`/`A57`/`A58`).
2. **NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** the parts of the contract directory beyond the sections named; `src/**` beyond the named files; `tests/**` beyond its census; `archive/**` beyond record names; and **every byte under `../Provident-Electron/**`** (`A9`).
3. **NOTHING WAS RUN, NOTHING WAS COMMITTED, AND NO BYTE OF THE ADJACENT PROJECT WAS WRITTEN.**

---

## §8. THE ARCHITECT'S ANSWER SET OF 2026-10-11 — K1, K5 and K6 ruled

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the findings they answer).**

> K1 - don't care, defense in depth
> K5 - find address is an internal tool - JS only needs read + edit functions and listeners
> K6 - if the JS application tries to store an error message and can't tell its own input from a genuine error message that's it's own fault. Unsupported anti-pattern.
> Elaborate on others.

| # | The finding | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A62`** | **`K1`** — the out-of-bounds refusal has no reachable instance across a JS boundary (a JS `Number` cannot spell `2^53 + 1`; only `BigInt` can, and `BigInt` is an outside class) | ***"don't care, defense in depth"*** | **ANSWERED: THE REFUSAL STANDS AS FILED AND THE UNREACHABILITY IS ACCEPTED — it is a DEFENSE-IN-DEPTH rule, not a promise about what a JS caller can spell.** **Consequences: `C3`'s crossing table need not carry a JS-reachable drive for the numeric bound; `S-4`'s numeric half narrows to *"the JS side passes a `Number` (already `f64`) and the refusal fires for whatever the store's own carrier cannot hold exactly"*; and no JS-side rounding-detection rule is owed.** |
| **`A63`** | **`K5`** — `findAddress`'s *"returns reference"* has no crossing form | ***"find address is an internal tool - JS only needs read + edit functions and listeners"*** | **ANSWERED, AND IT SCOPES THE ENTIRE JS SURFACE: `findAddress` IS NOT EXPOSED TO JS — it is an INTERNAL tool.** **The JS surface is `read` + the edit functions (`write`, `delete`) + the listener functions (`listen`/`unlisten` and the returned `triggered` sets).** **Consequences: `S-6`'s borrow-crossing half DISSOLVES (no reference, no `NodeRef`, crosses); `C7` (the resolver-return clause) is WITHDRAWN as inapplicable and replaced by a NON-EXPOSURE clause; `D7` (handle spelling) survives only for the listener handles; and `D8` (ownership) narrows to the `Store` instance alone.** |
| **`A64`** | **`K6`** — the failure record is ambiguous with an admitted store value | ***"if the JS application tries to store an error message and can't tell its own input from a genuine error message that's it's own fault. Unsupported anti-pattern."*** | **ANSWERED: THE AMBIGUITY IS NOT THE UNIT'S TO FIX — storing a value whose shape is indistinguishable from the failure record is an UNSUPPORTED ANTI-PATTERN, and the discrimination rule is NOT owed.** **Consequences: `C4` narrows to *"the failure channel names exactly one JS form"* (no discrimination rule, no discrimination drive); `S-5` narrows to the FORM question alone; and the failure record's two members stay closed.** |

---

## §9. THE REMAINING FINDINGS ELABORATED — the supervisor's analysis, each with its options priced and a recommendation

**<⟶ APPENDED, DATED. This section ELABORATES; it takes NO ruling. Every recommendation is the supervisor's and is priced so the architect can rule in one line, refuse, or carry it as a declared default.** **THE RULED ONES ARE OUT: `K1`, `K5`, `K6` (`§8`).**

### 9.1 THE VALUE CROSSING — `K18` · `K2` · `K3` · `K4` (`S-3`, `S-4`, `D4`)

**`K18` — no JSON-text carrier exists on the declared surface.** `§0.4` closes the Rust surface with no text entry point and `§7.2` item 7 (c) states *"no verb returns JSON text"*; the store's own JSON-text route is the `file` tier's bytes alone (the JSON battery's `CF-1`). **So the crossing cannot be "stringify, pass, parse" — a JS caller hands over a JS VALUE and the binding must WALK it into `StoreValue`, node by node, exactly as the store does internally.**
- **Option (a) — the recursive walk (RECOMMENDED).** The binding converts a JS value into the store's taxonomy member by member, refusing per class. **Cost:** a decision per class (the ~40-row table of `C3`), plus the "plain object" test's realm problem (below). **Gain:** the store's own refusals are preserved exactly (`ValueNotAdmitted` stays reachable), and the round-trip relation is assertable at the boundary.
- **Option (b) — `JSON.stringify` + a Rust-side parse.** **Impossible as filed:** no verb accepts JSON text, and adding one would move the store's declared surface (`A63` just narrowed the JS surface; a text entry point is a store-side change). **Cost:** a store amendment for a carrier the JS side alone wants.
- **Option (c) — a wrapper type per class.** **Cost:** the caller must know the taxonomy to call the store at all, which contradicts the directive's *"passing in various JSON"* language.

**`K2` — the classes a WALK can meet and the store's taxonomy has no place for.** The drivable cases and what each option does:

| the JS input | what a naive walk does | the honest declared answer (recommended) |
| --- | --- | --- |
| `{[Symbol('k')]: 1}` | **drops the member silently** (symbol keys are invisible to `Object.keys`/`entries`/`JSON.stringify`) | **REFUSE** the whole value `ValueNotAdmitted` — a dropped member is the one thing `§1.4`'s *"write-time failure rather than a silent coercion"* forbids |
| `[1, , 3]` (a sparse array) | `undefined` under `Array.from`, `null` under `JSON.stringify` | **REFUSE** — a hole is not an admitted element and the two readings disagree, so neither may be chosen silently |
| `{a: undefined}` | `undefined` is an outside class if passed as a value, but a WALK sees the member and must decide | **REFUSE** the member's value as an outside class (it is `Undefined`, already outside) — never drop the key |
| an object from another realm (`vm`, worker, `structuredClone`) | a `instanceof Object` / `Object.getPrototypeOf(x) === Object.prototype` test **refuses a semantically plain object** as `NonPlainCollection` | **accept it**: test STRUCTURALLY (own enumerable STRING keys only, no accessor properties, no prototype-carried members) rather than by realm identity — otherwise "plain" is a property of the caller's realm and not of the value |
| `Object.create(null)` | the same identity test refuses it | **accept** it structurally (it has no prototype at all, which is the plainest case there is) |
| a class instance (`new Foo()`) | a structural test accepts it while an identity test refuses it | **REFUSE** — a prototype-carrying object is a collection the taxonomy does not admit (this is where an identity-ish rule is right, and it is the ONE place) |

**RECOMMENDATION:** the rule is **structural, with one named exception** — own enumerable string keys, no accessors, no symbol-keyed own property, no holes, and **no prototype that is not `null` or a realm-agnostic plain-object prototype**; anything else refuses `ValueNotAdmitted`. **Cost of the structural rule:** the "plain" test cannot be a one-liner and must be declared in words; **cost of the identity rule:** a legitimate cross-realm object is refused, which is the bug the rule exists to prevent.

**`K3` — the JS engine's own third normalization.** Two undeclared facts: (i) an object whose keys look like array indices is **re-ordered numerically by the engine** regardless of insertion order, so a JS consumer never sees the store's `BTreeMap` (lexicographic, `"10" < "2"`) order; (ii) JS `===` says `-0 === 0` while `Object.is` says they differ, so "exact round trip" is unexpressible in JS terms. **RECOMMENDATION:** the unit declares the JS-side EQUALITY RELATION explicitly — **member-SET equality (keys compared as a sorted set, never by insertion order), array index order significant, and `Object.is` for numbers where sign matters** — and states that a caller comparing by `===` on objects is comparing references, not values. **Cost:** one clause and one helper the package may ship; **no cost to the store**, whose own equality already ignores member order (`P-IM-1`).

**`K4` — the canonical number spelling is observable only through the `file` bytes.** `§7.2` item 7 (c) says no verb returns JSON text, so a JS test can only reach the canonical image by reading `cfg.filePath` behind the package's back. **RECOMMENDATION:** declare the file-image normalization **outside the JS unit's acceptance layer** and cite the store's own Rust battery (`e2e_json_round_trip.rs`, which asserts the bytes exactly), rather than inventing a JS-side file read. **Cost:** the JS layer cannot itself prove that rule; **gain:** the package never reaches around the store's surface, and `A63`'s narrowed surface stays closed.

### 9.2 IDENTITY, HANDLES AND THE REGISTRY — `K7` · `K8` · `K9` (`S-7`, `D6`, `D7`)

**`K7` — a REAL STORE DEFECT the critique measured, and the first thing to fix.** The contract's `§0.4` clause 2 declares a handle *"unique per instance and per session"* and `PAR-13` makes a foreign or prior-session handle a no-op success. **The code mints `format!("listener-{}", NEXT_HANDLE.fetch_add(1, Ordering::SeqCst))` over a PROCESS-GLOBAL counter** — so after a reload the new session re-mints `listener-1`, a stale JS token matches a DIFFERENT registration, and `unlisten` removes it. **`PAR-13`'s *"prior session ⇒ no-op success"* is unreachable, and the token namespace is guessable (`unlisten("listener-7")`).**
- **Option (a) — fix the store's mint (RECOMMENDED):** a per-instance counter on `Store`, so the declared per-instance scoping is TRUE and `PAR-13` becomes reachable. **Cost:** a small `src/**` change + one red-set cell for the prior-instance case; the store's public surface does not move. **Gain:** the declaration and the behaviour agree, and a JS-exposed token stops being a containment hole.
- **Option (b) — weaken the contract's claim** to *"unique per process"*. **Cost:** `PAR-13`'s no-op clause must be re-derived, and two instances in one process share a namespace (the JS case makes that ordinary).
- **Option (c) — an opaque JS wrapper carrying an instance nonce.** **Cost:** the store's own `unlisten` cannot verify the nonce unless the store mints it; this moves the fix into the binding for a defect the store owns.

**`K8` — opacity versus the caller-spelled construction handle, and it RESOLVES CLEANLY.** `§0.4` clause 1 forbids reading the token OUT; the construction requires a token IN. **RECOMMENDATION (and it needs no store change): the JS surface accepts a plain STRING at the construction's `listeners[]` (input) and NEVER exposes a token on the way out** — returned handles are opaque JS values the package wraps, whose identity it compares internally. **Cost:** two JS spellings for one type (a string in, an opaque value out) and `unlisten` must accept the opaque form only. **Gain:** opacity holds where it matters and the construction stays expressible. *(If the architect prefers one spelling in both directions, the recommended one is the STRING — and then opacity is surrendered for a guessed-token namespace, which `K7`'s fix (a) makes survivable but not pretty.)*

**`K9` — no handle→function registry exists in any artifact, and it is the JS unit's own to declare.** The store returns handles and invokes nothing (`A57`), so a JS *listener* is a function the PACKAGE must hold. **RECOMMENDATION:** the package owns a **per-instance registry** keyed by the handle value, with four declared rules: (i) a handle returned in `triggered` with **no** registered function invokes nothing, silently; (ii) registering a second function for the same handle **replaces** the first (one handle, one function — the registry is not a fan-out); (iii) `DD-42`'s lawful duplicate token (two construction entries at one address carrying the caller's SAME token) fires **one** invocation per distinct returned handle, not one per occurrence; (iv) `unlisten` **does not** unregister — withdrawal is the store's, invocation is the package's, and a function whose handle is withdrawn simply never fires again. **Cost:** the package owns state the store mints tokens for; **gain:** the directive's own check (*"listeners fire to the interface"*) finally has a declared carrier.

### 9.3 PACKAGING, LAYOUT AND REALMS — `K11` · `K10` (`D1`, `D2`, `D3`, `D9`, `S-1`, `S-2`, `S-8`)

**`K11` — an externality onto a DONE unit's manifest and its measured green.** The store's `implementation-plan.md §1.1` declares the crate AT THE REPOSITORY ROOT (`Cargo.toml` + `src/**`, `use storeroom_native::…`), its `§4`'s *"IT IS NOT DONE IF"* list names *"a second crate, a workspace member or a red set outside `tests/**`"*, and `Cargo.toml`'s no-dependency/offline property is what `cargo test --offline`'s `374/374` green rests on. **A binding needs dependencies and `crate-type = ["cdylib"]`.**
- **Option (a) — an INDEPENDENT SIBLING CRATE with a path dependency (RECOMMENDED, and it is the pattern this project already uses):** `bindings/js/` (or `js/`) holds its own `Cargo.toml` with `crate-type = ["cdylib"]`, its own dependencies, and `storeroom-native = { path = "../.." }` — **exactly the shape the out-of-repo blind harness already proved** (`/tmp/storeroom-blind/`, a path dependency with `CARGO_TARGET_DIR` outside). **The store's manifest, its `src/**`, its `tests/**` and its offline green are NOT touched, and no byte of the store's declared layout moves.** **Cost:** the binding is not a workspace member (so a root `cargo test` does not build it — which is the FEATURE here: the store's green keeps its meaning), and its own build/test command must be declared. **This is the option that satisfies condition `C8`'s non-touch clause without weakening the store's plan.**
- **Option (b) — a workspace member.** **Cost:** the root `cargo test`'s meaning changes (all members, unless `-p`), and the store's plan's own *"NOT DONE IF"* cell is contradicted — an externality onto a closed unit's acceptance.
- **Option (c) — an in-crate target (`crate-type = ["rlib","cdylib"]`).** **Cost:** the store acquires dependencies and loses its no-dependency/offline property — the property three separate acceptance runs rest on.

**`K10` — the realm claim exceeds what a Node-API carrier can deliver.** Node-API binds to the **Node ABI**: a browser renderer has no `require`/`process`, an Electron renderer with `nodeIntegration` off cannot load a `.node` addon at all (preload + IPC is the only route, and that SERIALIZES every value), and a browser-target bundler cannot even resolve the binary. **RECOMMENDATION:** claim **Node CJS + Node ESM** (and Electron main/preload *where the ABI matches*, with a rebuild-on-install note), and declare every other realm as a **`HO-` HANDOFF row** — browser renderers, workers, and any IPC route — with the note that an IPC route needs its own value-serialization contract, which is a SECOND crossing and therefore another unit's work. **Cost:** the package is honest about what it reaches; **gain:** *"generic"* stops promising realms `A1`'s carrier cannot reach.
- **`D2` builder:** recommend **`napi-rs`** (it generates the `.d.ts`, ships `napi-build` usable from `build.rs`, and the absent `napi` CLI at `L-4` is then not required) — **cost:** new dependencies in the SIBLING crate only; a hand-written `napi-sys` binding is the fallback if the architect wants zero third-party code.
- **`D9` packaging:** recommend **source + build-on-install** for the first cut (nothing in this repository authorises committed binaries; `archive/` is gitignored and `/target` ignored), with the prebuild matrix as a later option; **note the licence** (AGPL-3.0 per `LICENSE`) as a distribution fact the architect may want to consider.

### 9.4 PROCESS AND GOVERNANCE — `K12` · `K13` · `K14` · `K15` · `K16` · `D11` · `D12`

**`K12` — the live rule conflict, and it is the one that must be settled FIRST.** The store contract's `§10.2` item 2 files *"any question about the JS integration put to the architect"* among the prohibited acts (from `A8`: *"Stop asking questions about the JS integration"*), while the adoption contract's `§3.1.2` FORCES escalation to the architect if this unit's dossier carries any open row or entry. **Both stand as filed; they cannot both be obeyed.** **RECOMMENDATION:** one `docs/decisions.md` row declaring the prohibition **superseded for this unit** — the architect's own directive (*"prepare for JS integration"*) necessarily re-opens the integration questions, and a gate that cannot ask them cannot do its job. **Cost:** the store's `§10.2` cell gains a dated reconciliation; **gain:** `G-2`'s no-deferral rule survives, and this unit's gate-1 pause can carry a real bubble.
- **`D12`/`S-*` `P-1`'s status:** the same row settles it — **`P-1` is LIFTED for this unit by the directive**, recorded as its own dated lift clause at `docs/pending.md` (`lifted, not deleted`, the convention `P-3` already uses).

**`K13` — `P-1`'s `28` rows need a row-by-row map.** The critique measured that `P-1`'s own enumeration carries the `secure` row and the filing's `§2` subject list omits it (the count `28` closes either way, so the omission is invisible in the arithmetic), and that `P-1`'s enumeration carries **`U-24` and does NOT carry `J-13` at all**. **RECOMMENDATION:** condition `C14` is satisfied by a table in this unit's contract mapping **every id in `P-1`'s own enumeration exactly once** to one of: this unit · a `HO-` handoff row · another unit · out of scope with its reason. **The map is OWED at gate 2 and the supervisor will draft it from `docs/pending.md` as the gate-1 record's own annex if the architect wants it earlier.**

**`K14`/`K15` — MY OWN FILING'S DEFECTS, BOTH CORRECTED IN PLACE at the previous pass** (the ledger claim; the `A57`/`A58` citation path). **`K16` — the `103`-vs-`110` battery figures:** the JSON battery was re-derived (the numeric cells were added after the first authoring), so **`110` is operative** and `103` is historical; the tracker's cell carries both and is reconciled in this pass.

**`D11` — is the module-supplied-functions crossing (`U-24`; `J-13`) in scope?** **RECOMMENDATION: OUT of scope, with the owner named** — `A63` just narrowed the JS surface to **read + edit + listeners**, and the store's constraint/repair seam is neither; `P-1`'s own enumeration carrying `U-24` while omitting `J-13` is the evidence that the subject was never cleanly assigned. **Cost:** a `docs/pending.md` row and `U-24`'s disposition recorded (condition `C14`'s map covers it); **gain:** the JS unit's surface stays exactly what the architect named.

### 9.5 THE THREE SMALLEST REMAINING ITEMS, STATED SO THEY ARE NOT LOST

1. **`K17` — instance ownership, exclusivity and finalization.** Recommend: one `Store` per instance, caller-owned, no finalizer, with the rule declared that **two instances over one `cfg.filePath` are the caller's own hazard** (each boots and each commits; the second clobbers the first) — and a `dispose()`/`close()` verb **only if the architect wants one**, since the store has no such verb and adding one is a store surface change.
2. **`K3`'s equality relation** needs one clause (9.1 above) and, with it, the JS unit's acceptance layer can assert *"exact match"* in JS terms.
3. **`K10`'s handoff rows** need their ids minted at gate 2 (`HO-` rows for the unclaimed realms), which is the tracker gate's work in that pass.

**AND ONE THING THIS ELABORATION DOES NOT DO: it does not rule. Every recommendation above is the supervisor's, priced beside its alternatives; the architect may adopt any of them in one line, refuse any, or let the spec carry them as priced `DECLARED-DEFAULT` rows.**

---

**END OF THE PROPOSAL.** **§1 is the architect's directive, byte-for-byte. §2 is the measured context. §3 is
the filing's bounds. §4 is a quotation table with no reading taken. §5 is a map of adjacencies with no
ruling. §6 records the adoption trigger's premise and the ledger move. §7 is the provenance. No behaviour
clause, no signature, no return shape, no fail-state and no ruling is asserted anywhere in this file.**
