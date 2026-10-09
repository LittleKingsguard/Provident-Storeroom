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

## §10. THE ARCHITECT'S CROSSING RULING OF 2026-10-11 — deep copy in, deep copy out, no shared ownership either way

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Clarification to value crossing: Input must deep-copy the external data into the store, and the output must deep-copy from the store into the JS output. Neither the store nor the JS should be able to get a reference/pointer to data owned by the other.

**THE RULING, TRANSCRIBED AS `A65` AND MAPPED — and it is the crossing's WHOLE copy discipline in one sentence.**

| # | What it settles | The ruling (verbatim) | What the fragment does NOT say |
| --- | --- | --- | --- |
| **`A65`** | **the value crossing's copy discipline, BOTH DIRECTIONS**, and — with `A63` — the boundary's ownership model | ***"Input must deep-copy the external data into the store, and the output must deep-copy from the store into the JS output. Neither the store nor the JS should be able to get a reference/pointer to data owned by the other."*** | **FOUR THINGS, AND EACH HAS A NAMED CONSEQUENCE IN THE ELABORATION BELOW (`§9.1`, `§9.2`): (1) INPUT IS A DEEP COPY — the JS value the caller passes is read once and CONVERTED into a value the STORE OWNS; the store retains NO reference into JS memory; (2) OUTPUT IS A DEEP COPY — a value the store returns is CONVERTED into fresh JS-owned data; **the JS side holds NO reference into store-owned data**; (3) NO SHARED OWNERSHIP EITHER WAY — no proxy, no live view, no getter into either side, no borrow, no pointer; (4) CONSEQUENTLY THE BOUNDARY IS A VALUE BOUNDARY IN BOTH DIRECTIONS: a mutation on one side after the call is INVISIBLE to the other, and neither side's lifetime constrains the other's.** | **it does not name HOW either copy is performed** — the input copy is a structural WALK through the store's taxonomy (there is no JSON-text carrier, `CF-1`/`K18`) or some other conversion, and the output copy is a translation into fresh JS values (there is no zero-copy route either way) · **nor whether the store's OWN read already returns a copy that the binding may adopt** (the store's `§4.2 R-5` copy discipline says it returns a deep copy; whether the binding treats THAT copy as the thing to translate, or re-copies, is a `DECLARED-DEFAULT`) · **nor what a caller observes if it MUTATES its argument during a call** (a single-call window, unstated) · **nor the copy's COST bound** (nothing declares a depth or size ceiling) |

**AND ITS EFFECT ON THE ELABORATED ITEMS — THE FIVE IT TOUCHES AND THE TWO IT DOES NOT:**
- **`K18` (no JSON-text carrier) — CONFIRMED AND MADE LOAD-BEARING:** with a deep copy required in both directions, the input walk is **the only** legal route; a `JSON.stringify`-then-parse route remains impossible on the declared surface.
- **`K5`/`A63` — CONFIRMED:** no reference crosses, so `findAddress`'s non-exposure is not merely a surface choice but entailed by the copy discipline.
- **`K2` (the classes a walk can meet) — UNCHANGED IN SUBSTANCE AND NOW UNAVOIDABLE:** the walk's per-class decisions (`Symbol` key · sparse array · `undefined` member · cross-realm plain object · class instance) are the crossing's own rules, because the copy IS the walk.
- **`K3` (the JS engine's own key order and `-0` equality) — UNCHANGED:** the copy does not remove the engine's integer-like key ordering or the `-0 === 0` fact, so the JS-side equality relation is still owed as one clause.
- **`K4` (the file-image normalization observable) — UNCHANGED:** the copy discipline does not make the canonical spelling visible through the surface, so it remains outside the JS acceptance layer.
- **`K7` (the process-global mint) — NOT TOUCHED by this ruling:** the handle's declared per-instance/per-session scoping is a store-side defect independent of the copy discipline, and its fix (a per-instance counter, recommended at `§9.2`) stands as its own decision.
- **`K11` (the sibling-crate layout) and `K12` (`P-1`'s lift, the prohibition's supersession) — NOT TOUCHED.**

**AND ONE CONSEQUENCE THIS FILING STATES PLAINLY: `A65` MAKES THE JS SIDE'S `"EXACT MATCH"` EXPECTATION HONEST.** **With a deep copy in and a deep copy out, the JS caller's value and the JS caller's read-back are TWO INDEPENDENT JS VALUES THAT MUST COMPARE EQUAL UNDER THE DECLARED RELATION (`§9.1`'s member-set equality, array index order, `Object.is` where sign matters) — and the architect's own battery directive (**"passing in various JSON … Expect exact match in all cases"**) is satisfied at the JS layer on exactly the terms the store's own Rust battery already asserts, with the two DECLARED normalizations and nothing else excluded.** **NO PARK IS TOUCHED, NO UNIT ROW IS ADMITTED, AND THE LEDGER STANDS AT `1 DONE / 2 open` UNITS = `3`.**

---

## §11. THE ARCHITECT'S UNPARK, MINT AND LAYOUT RULINGS OF 2026-10-11

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the findings they answer).**

> K12 - this is the unpark of the integration
> K7 - use recommended
> K11 - Confirm

**THE THREE RULINGS, TRANSCRIBED AS `A66`–`A68`.**

| # | The finding | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A66`** | **`K12`** — the live conflict: the store contract's `§10.2` item 2 prohibits *"any question about the JS integration put to the architect"* (`A8`), while the adoption contract's `§3.1.2` FORCES escalation on any open row | ***"this is the unpark of the integration"*** | **ANSWERED, TWICE OVER: (1) `P-1` — THE JS INTEGRATION PARK — IS LIFTED BY THIS RULING, recorded as its own dated lift clause at `docs/pending.md` (`lifted, not deleted`, the convention `P-3` already carries under `A44`); and (2) the store contract's PROHIBITION on integration questions is SUPERSEDED FOR THIS UNIT — the architect's own directive to prepare the integration necessarily re-opens exactly those questions, so `§10.2` item 2's cell gains a dated reconciliation in the same pass and `A8`'s ban is read as SCOPED TO THE STORE'S OWN BUILD (the deferral it was) rather than as a standing gag.** **Consequence: this unit's gate may put listener/integration questions to the architect, and `G-2`'s no-deferral rule survives intact.** |
| **`A67`** | **`K7`** — the handle mint is `listener-{PROCESS-GLOBAL counter}` while the contract declares handles unique *"per instance and per session"*, so a stale token from a prior session can remove a DIFFERENT registration and `PAR-13`'s *"prior session ⇒ no-op success"* is unreachable | ***"use recommended"*** | **ANSWERED, ADOPTING THE SUPERVISOR'S RECOMMENDED FIX: the mint becomes a PER-INSTANCE COUNTER ON THE STORE, so the declared per-instance/per-session scoping is TRUE, a foreign instance's or a prior session's handle is genuinely OUTSIDE the domain, and `unlisten` over it is the declared no-op success.** **The store's PUBLIC surface does not move (the mint is internal); the change is `src/**` plus a red-set cell asserting the prior-instance/foreign-instance no-op.** |
| **`A68`** | **`K11`** — a napi binding's dependencies and `cdylib` would land on the DONE unit's declared manifest and its measured offline green | ***"Confirm"*** | **ANSWERED, CONFIRMING THE RECOMMENDED LAYOUT: an INDEPENDENT SIBLING CRATE with a PATH DEPENDENCY on the store (`bindings/js/`, its own `Cargo.toml` with `crate-type = ["cdylib"]`, its own dependencies, and `storeroom-native = { path = "../.." }`) — the shape the out-of-repo blind harness already proved.** **Consequences: THE STORE'S MANIFEST, ITS `src/**`, ITS `tests/**` AND ITS OFFLINE `374/374` GREEN ARE NOT TOUCHED; the store keeps its no-dependency property and its plan's *"NOT DONE IF a second crate, a workspace member or a red set outside `tests/**` appeared"* cell is not contradicted (the binding is NOT a workspace member, so a root `cargo test` keeps its single-package meaning); and the binding's own build and test command is declared in its own directory's terms.** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) GATE 2 IS NOW UNBLOCKED ON THE THREE DECISIONS THAT WERE OUTSTANDING — `K12`/`P-1`, `K7` and `K11` are all ruled, and the remaining `§9` items (the walk's per-class table, the JS-side equality clause, the registry's four rules, the realm handoffs, `napi-rs`, source-and-build-on-install) are carried as priced, reversible `DECLARED-DEFAULT` rows in this unit's contract.** **(2) TWO LANDING DUTIES ARE OWED WITH THIS PASS AND ARE BEING PAID IN IT: `docs/pending.md`'s dated lift clause at `P-1`, and a `docs/decisions.md` ACTIVE row recording `A62`–`A68` (including the `§10.2` supersession) — with the store contract's `§10.2` item 2 cell reconciled by a dated clause.** **(3) `P-1`'S LIFT DOES NOT DISCHARGE `P-2`: the lift report's duty to surface `P-1` for the architect is met BY this ruling, and `P-2`'s row is annotated to say so — while `P-1`'s `28` rows still owe their row-by-row map (`C14`) in this unit's contract.** **NO UNIT ROW IS ADMITTED BY THIS FILING; THE LEDGER'S MOVE BELONGS TO THE JS UNIT'S OWN GATE-1 ROW.**

---

## §12. THE SUPERVISOR'S CORRECTION OF `A67` — THE RECOMMENDED FIX WAS MEASURED WRONG, AND THREE REMEDIES ARE PRICED

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES. THIS SECTION REPORTS A MEASUREMENT AND PRICES REMEDIES; IT RULES NOTHING AND ASKS THE ARCHITECT TO CHOOSE.**

**THE ARCHITECT RULED `A67` AS *"use recommended"* — i.e. he adopted THE SUPERVISOR'S RECOMMENDATION: a PER-INSTANCE COUNTER on the store. THAT RECOMMENDATION WAS WRONG, AND TWO INDEPENDENT PASSES MEASURED IT.**

**THE MEASUREMENT, IN THE IMPLEMENTER'S OWN TERMS (the fix was implemented, run, and reverted cleanly — the tree is byte-identical to its pre-pass state).** **A per-instance counter restarts at `1` for every fresh instance, so two instances created in one process MINT THE SAME TOKEN (`listener-1`).** **And handle identity is TOKEN EQUALITY ALONE (`contract.md §0.4` clause 1), so `unlisten` over a FOREIGN instance's handle FINDS THIS INSTANCE'S OWN ENTRY AND REMOVES IT — contradicting `§0.4` clause 3 and `write-and-read.md §6.5` item 12 (a) and `PAR-13`, each of which requires that an outside-domain handle remove NO other registration.** **Measured: with the fix, `cargo test` is `373 PASS / 1 FAIL` — the failing cell is `tests/e2e_listener_firing.rs`'s `lf_e12_a_fabricated_and_a_foreign_handle_unlisten_remove_nothing` (repeatable), reporting *"the DECLARED `triggered` set is `{listener-1}` (1 member) and the store returned `{}` (0 members)"*.** **AND THE RELOAD HALF OF `K7` IS NOT DELIVERED EITHER: a fresh PROCESS restarts at `1` in both designs, so a prior-session handle remains indistinct from a fresh instance's — the *"prior session ⇒ no-op"* clause stays unreachable by a counter alone.** **The test writer's parallel pass reached the same projection independently (its `CF-4`: *"a bare per-instance counter turns cells 1–2 RED"*), and its three new cells — authored from the declared clauses — are GREEN on the current tree and are exactly the guard the chosen rule must keep green.**

**THE THREE REMEDIES, EACH PRICED**
| # | The remedy | Its cost |
| --- | --- | --- |
| **(a) A DISCRIMINATOR-BEARING MINT — RECOMMENDED** — a per-instance counter **plus a per-instance (or per-session) discriminator inside the token**, e.g. `listener-<instance-or-session-token>-<n>` | satisfies `§0.4` clause 2 AND clause 3 AND `DD-42`, keeps the failing cell green, and **actually delivers `K7`'s reload gain** (a prior-session token carries a different discriminator and is genuinely outside the domain). **Cost: the token's spelling becomes non-deterministic**, so one red-set cell that seeds a `listener-1..N` range (`NG-C`'s seed) becomes vacuous for the minted range and must be re-derived by its author role; and the token's text stops being observable-stable — which no declared clause promises anyway (`§0.4` clause 1 forbids reading it OUT). |
| **(b) DECLARE THE TOKEN *"UNIQUE PER PROCESS"*** — amend `§0.4` clause 2 and reconcile `PAR-13` | **no `src/**` change** (the shipped behaviour is already process-global and green), and `PAR-13`'s foreign no-op then holds exactly for tokens this instance never minted — which is what the standing cells drive. **Cost:** `§0.4` clause 2's *"per instance and per session"* becomes false as declared and must be re-derived, `K7`'s containment hole (a guessable namespace) stays, and a prior-session token is still indistinguishable. |
| **(c) A PER-INSTANCE COUNTER SEEDED FROM A SESSION-SCOPED BASE** | green, and **delivers NONE of `K7`'s gain** — the token is per-instance-unique but not session-distinct, so the reload half stays unreachable. **Cost:** a cosmetic change with a real spec claim behind it. |

**AND THREE THINGS THIS FILING STATES PLAINLY.** **(1) THE SUPERVISOR OWNS THE ERROR: the recommendation at `§9.2` asserted that *"a per-instance counter"* would make `PAR-13`'s no-op REACHABLE without checking the token-equality premise — the implementer's measurement and the test writer's projection both refute it, and this correction is filed rather than the defect carried.** **(2) THE STORE'S `374/374` GREEN STANDS UNTOUCHED IN THE HANDED-BACK TREE — the fix was reverted cleanly (`cmp` byte-identical), and the three new cells added by the test writer are green on the current tree at `377/377`.** **(3) THE CHOICE IS THE ARCHITECT'S, IN ONE LINE: `(a)`, `(b)` or `(c)`.** **`(a)` is the supervisor's recommendation — now with the cost named — and it is the only one of the three that makes both halves of `K7` true.**

---

## §13. THE ARCHITECT'S MINT RULING OF 2026-10-11 — remedy (b): the token is unique PER PROCESS

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Proceed on b

**THE RULING, TRANSCRIBED AS `A69` — the `K7` remedy chosen, and the one whose cost lands on the CONTRACT rather than on the code.**

| # | What it answers | The ruling (verbatim) | What it settles | What it does NOT say |
| --- | --- | --- | --- | --- |
| **`A69`** | **the `K7` fork the supervisor corrected at `§12`: (a) a discriminator-bearing mint, (b) declare the token *"unique per process"*, or (c) a session-scoped base** | ***"Proceed on b"*** | **REMEDY (b) ADOPTED: THE HANDLE TOKEN IS DECLARED UNIQUE PER PROCESS, the per-instance/per-session claim MOVES, and `parameter-semantics.md`'s `PAR-13` is reconciled to the process-scoped domain with its outside values answered. NO `src/**` CHANGE: the shipped process-global mint IS the declared behaviour, and the store's `377/377` green stands untouched.** **AND IT ACCEPTS, RATHER THAN DEFENDS, THE ONE HAZARD THE MEASUREMENT NAMED: `K7`'s CONTAINMENT NOTE (a guessable `listener-<n>` namespace) stays open, and A PRIOR SESSION'S HANDLE IS DECLARED OUTSIDE THE DOMAIN WHILE ITS TOKEN MAY COINCIDE WITH ONE THE CURRENT PROCESS HAS SINCE MINTED — a declared cross-process hazard the caller carries, not a defended property.** | it does not make the reload half of `K7` reachable (no remedy but (a) would), and it does not withdraw `K7`'s containment note — **both are recorded as ACCEPTED CONSEQUENCES of this ruling, each with its own cell in the contract's reconciliation** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE SPEC PASS IS AUTHORED IN THIS PASS: `§0.4`'s construction-rule clause 2 is re-stated as UNIQUE PER PROCESS with its as-filed wording preserved beside it, `PAR-13`'s domain and outside values are reconciled to the process scope (with the prior-session answer's own conditional printed), every other *"per instance and per session"* cell is reconciled, and the relocated twin of the integration-question prohibition at `seams-and-lifecycle.md §10.2` receives the same dated clause the contract's own copy carries.** **(2) NO TEST MOVES: the standing cells drive exactly what (b) declares — a token the process never minted names no entry and `unlisten` over it is a no-op success — and the test writer's `CF-4` projection (a bare per-instance counter would turn them red) DOES NOT FIRE under this ruling.** **(3) THE `K7` DECISION IS CLOSED, AND THE JS UNIT'S THREE UNBLOCKING DECISIONS ARE ALL ANSWERED (`A66` the unpark, `A67`→`A69` the mint, `A68` the layout) — SO STEPS 3 AND 4 OF THIS GATE MAY RUN: the architecture review's nine-column `D-GP-SAD-5` row and the FORM determination, then the verdict, the gate-1 record with its Semantics block, and the plan.** **NO UNIT ROW IS ADMITTED; THE LEDGER STANDS `1 DONE / 2 open` UNITS = `3`.**

---

## §14. THE BUBBLE ELABORATED — `Q1`–`Q5`, each with its options priced and a recommendation

**<⟶ APPENDED, DATED. This section ELABORATES `§G.3`'s five questions; it takes NO ruling. Every recommendation is the supervisor's, priced beside its alternatives, and the architect may rule in one line, refuse, or let the spec carry any of them as a priced `DECLARED-DEFAULT`.**

### 14.1 `Q1` — THE REALM CLAIM: what the package promises to load in

**WHAT THE QUESTION IS.** `A1` ruled the carrier as *"Node-API"*. A Node-API addon is a **native binary bound to the Node ABI**, so the realms it can actually load in are a property of the loader, not of the API. The question is **which realms the package CLAIMS** — because "generic" is a promise, and every unclaimed realm owes its own declared answer (a handoff row) rather than silence.

**THE FACTS, REALM BY REALM.** **Node CJS** — `require(path/to/addon.node)` loads it; **works**. · **Node ESM** — an addon is a CJS module, so ESM reaches it through `createRequire` or Node's CJS interop; **works, and the package's `exports` map must publish both entry points** (a real, small obligation). · **Electron main / preload** — Electron carries **its own Node ABI**, so an addon must be built against **that** ABI; **works WITH a rebuild-on-install note** (the note is a declared requirement, not a caveat to be discovered by a consumer). · **Electron renderer with `nodeIntegration` off** — **cannot load a `.node` at all**; the only route is preload + IPC. · **Browser ESM (a renderer bundle)** — a bundler **cannot even resolve** a platform binary; tree-shaking cannot help. · **Workers** — `worker_threads` can load it if the ABI matches; a browser worker cannot. · **Any IPC route** — see the cost below.

**THE OPTIONS, PRICED.** **(i) Node CJS + Node ESM only.** Cost: the adjacent project's browser-ESM renderer is out of scope and owes a handoff row; a renderer consumer must go through the main process. Gain: the claim is exactly what the carrier delivers, and the test matrix is two entry points. **(ii) (i) + Electron main/preload with the rebuild note — RECOMMENDED.** Cost: one declared host-configuration requirement (the ABI must match, and the build follows the host's Electron version) and one extra build target. Gain: the ordinary Electron consumer's main process is served, which is the realistic first consumer of a store like this. **(iii) (ii) + a declared IPC bridge for renderers.** Cost: **it is a SECOND CROSSING** — every value would be serialized by the channel, so `A65`'s deep-copy discipline would be re-stated in a second dialect; **functions cannot cross**, so the registry would have to live in the main process behind a channel-id dispatch, with its own failure channel for a vanished channel and its own ordering rules — **another unit's work, not a variant of this one**. **(iv) All realms.** Cost: the widest promise against the narrowest carrier; the widest test matrix; and a claim that is false in a browser by construction.

**RECOMMENDATION: (ii).** It claims precisely what a Node-API addon can deliver, hands off the renderer and the browser with a named row each, and leaves the IPC route to a unit that can own a second serialization contract.

### 14.2 `Q2` — THE DISTRIBUTION CUT: how the package reaches a consumer

**WHAT THE QUESTION IS.** Whether this unit's deliverable is a **buildable source tree**, a **published artefact**, or an **open policy** — and with it, whether a registry identity, a prebuild matrix and a licence decision are in scope.

**THE OPTIONS, PRICED.** **(i) Source + build-on-install, unpublished, no prebuilds — RECOMMENDED.** Cost: **the consumer needs a Rust toolchain** and a one-time dependency fetch (the store's own `--offline` posture is the STORE's; the binding has dependencies by `A68`), and that requirement must be **declared** rather than discovered. Gain: **nothing in this repository authorises committed binaries** (`archive/` is gitignored, `/target` is ignored, and no clause in either unit's contract admits a binary artefact), the tree stays reviewable, and the build is reproducible per platform. **(ii) Published to a registry with prebuilds.** Cost: a registry identity, a per-platform/arch/libc prebuild matrix, CI to produce it, a hosting decision for the binaries, and **a licence decision — the project is `AGPL-3.0` (per `LICENSE`), which is lawful to publish but is a fact every consumer must be told**; the architect may want to weigh that before a public name is chosen. **(iii) A cargo-distributed crate only, the consumer builds the addon.** Cost: this is not a JS package — there is no `npm install` story — so the unit would not deliver the thing the directive asks for. **(iv) Publish nothing and leave the policy open.** Cost: the unit has no deliverable, and the question returns unchanged next pass.

**RECOMMENDATION: (i) for the first cut**, with (ii) explicitly available later behind its own decision (it is a distribution decision, not a design one) — **and the honest note that (i) costs the consumer a toolchain**, which is the price of shipping no binaries.

### 14.3 `Q3` — THE CARRIER TOKEN'S SOURCE: the one line step 4's STEP-0 route needs

**WHAT THE QUESTION IS.** The adoption trigger fires on a unit whose **contract names, parameters or vocabulary originate outside this project**. `A63` narrowed the surface to `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` plus the returned records — **and every one of those names is the STORE's own**, declared in Rust at the store contract's `§0.4`. The JS-side spellings are this unit's own to declare. **So the question is: which tokens in this unit's declared surface come from OUTSIDE?**

**THE CANDIDATES, SORTED HONESTLY.** **`Node-API` / `napi` — YES, AND IT IS THE ONE THAT MATTERS:** the name is a **standard's**, cited by the architect's own `A1`, and a contract element of this unit (the carrier) carries it. · **The JS language's ambient names** (`Object`, `Array`, `BigInt`, `Symbol`, `Proxy`, `undefined`) — these are the **language's** vocabulary, not an artefact's; a contract may use them the way it uses `string` or `number`. · **ecosystem/tooling names** (`npm`, `package.json`, `exports`, `.node`) — the **format's**, not a source of a contract element. · **`napi-rs` / `napi-sys`** — a **library's** name, and only if the contract NAMES the binding library (a `DECLARED-DEFAULT` can instead say *"a Node-API binding library"* without naming one).

**THE OPTIONS, PRICED.** **(i) `Node-API`/`napi` is the ONLY externally-sourced token — RECOMMENDED.** Then the dossier carries **one identifier row** (keyed `Node-API`/`napi`, the carrier), well inside the `≤ 8` cap, and its `defined` instrument is the landing pass filing `A1` within an ACTIVE `docs/decisions.md` row (the same instrument the listener unit's rows used). **(ii) The architect names further tokens** — e.g. if he wants the contract to name `napi-rs` outright, that is a second row; if he wants the JS language's type names treated as externally sourced, several more. **The cap is `8`, so there is room — but each row is a row the unit must carry and, if any lands `undefined-until-answered`, the row bars the delegable word.**

**RECOMMENDATION: (i)** — and **the honest consequence stated so it is not a surprise: the trigger DOES fire on that one limb, so this unit carries a dossier with one row rather than a zero-row exemption**, and **that row must be `defined` (not `undefined-until-answered`) or the word is barred**. `A1`'s own filing as an ACTIVE `docs/decisions.md` row is the instrument, and it is the supervisor's landing duty.

### 14.4 `Q4` — `U-24` / `J-13`: the module-supplied-functions crossing

**WHAT THE QUESTION IS.** Whether the store's **module-supplied functions** — constraints and repairs, whose evaluation the architect ruled NODE-SIDE (`A6`) — and the `J-13` subject cross in THIS unit.

**THE FACTS.** **The store's contract declares NO constraint or repair surface:** the amendment's own reconciliation left the constraint seam out of the declared surface, `PAR-9`'s row was re-pointed to the listener surface, and no verb in the `A63` surface takes a function. **And `P-1`'s own enumeration carries `U-24` while it does NOT carry `J-13` at all** — so `J-13` is a subject that was never cleanly assigned, and `U-24` is one the park carried.

**THE OPTIONS, PRICED.** **(i) OUT of scope, with the owner named — RECOMMENDED.** Cost: **a `docs/pending.md` row must be authored** for the crossing (owner named, a positive revisit condition), `U-24`'s disposition recorded, and `J-13`'s absence from `P-1` recorded as the fact it is; this is cheap and it is what `P-1`'s row-by-row map (`AR-8`) needs anyway. **(ii) IN scope.** Cost: the unit declares a surface **no artifact has enumerated** — the store has no constraint verb, so the unit would first have to define one, which is a **store-surface change** (stop condition `B`).

**RECOMMENDATION: (i).** `A63`'s surface does not include a function-carrying parameter, and inventing one would move the store — which `A68`'s whole layout exists to avoid.

### 14.5 `Q5` — THE LIFETIME VERB: does the package expose a way to release an instance

**WHAT THE QUESTION IS.** The store declares **no `dispose()` and no `close()`**; the addon boxes the instance and the JS wrapper holds it; **no finalizer is declared**. So a wrapper that becomes unreachable before process exit keeps its Rust memory to exit.

**IS THAT A PROBLEM, HONESTLY?** **Mostly not, and the reason matters:** the store runs **no background work**, holds **no OS handle beyond the path it was given** (touched only by a `file`-tier write), and **commits synchronously** — so there is **no in-flight state to flush and no async resource whose abandonment could lose data**. What is lost by dropping the reference is **memory at process exit**, not a pending write. That is why no finalizer is a defensible choice rather than an omission.

**THE OPTIONS, PRICED.** **(i) No verb — RECOMMENDED for the first cut.** Cost: memory held to exit for a dropped wrapper, and no deterministic release — **acceptable because the amount is bounded by the store's own state and the process is ending anyway**. **(ii) A PACKAGE-level `dispose()`** that drops the registry and the wrapper's reference. Cost: a small surface addition with one clause — *"dispose releases the package's own references; the store's state needs no tear-down because it commits synchronously"* — and the question of what a second call does (**a declared no-op**). Gain: deterministic release, and a place to state that nothing needs flushing. **This is NOT a store-surface change** — it is the package's own verb. **(iii) A STORE-level `dispose()`/`close()`.** **REFUSED** — it is a store-surface change for a need the store does not have (stop condition `B`).

**RECOMMENDATION: (i)** — with (ii) available in one line if the architect wants deterministic release; (iii) is not available without a store amendment.

**AND ONE THING THIS ELABORATION DOES NOT DO: it does not rule. Every recommendation above is the supervisor's, priced beside its alternatives; the architect may adopt any in one line, refuse any, or let the spec carry them as priced, reversible `DECLARED-DEFAULT` rows. ONLY `Q3` CAN CHANGE THE VERDICT — the other four bind the contract's form, not the word.**

---

## §15. THE ARCHITECT'S BUBBLE ANSWER SET OF 2026-10-11 — Q1–Q5 ruled

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES. THE BUBBLE IS ANSWERED IN FULL.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the questions they answer).**

> Q1 - Node ESM
> Q2 - Publish with prebuilds
> Q3 - Use recommended
> Q4 - Constraint/Repair is client-side, using rollback to reverse constraint violations.
> Q5 - Not needed

| # | The question | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A70`** | **`Q1`** the realm claim | ***"Node ESM"*** | **ANSWERED: THE PACKAGE'S CLAIMED REALM IS NODE ESM — a consumer `import`s the package as a module, and the package reaches the addon internally (an addon being a CJS artefact, that is its own internal `createRequire`/interop step, not a second claimed realm).** **Consequences: the package's `exports` publishes an ESM entry as the CLAIMED one; CJS, every Electron realm, the browser, workers and any IPC route are UNCLAIMED and each owes its declared answer (`HO-` handoff rows) — conditions `AR-7`'s realm set is thereby closed at `{ ESM }`.** |
| **`A71`** | **`Q2`** the distribution cut | ***"Publish with prebuilds"*** | **ANSWERED: A PUBLISHED ARTEFACT WITH PREBUILDS IS IN SCOPE — a registry identity, a per-platform/arch prebuild matrix, the CI that produces it and a hosting decision for the binaries are THIS UNIT'S, and the `AGPL-3.0` licence (`LICENSE`) is the distribution's declared fact.** **Consequences: `U16` closes; the plan's `Q2` row gains the prebuild phases; nothing in the repository commits a binary — the artefacts are BUILT AND PUBLISHED, never stored in the tree (`archive/` is gitignored, `/target` ignored), so the store's and this unit's tracked trees stay reviewable.** |
| **`A72`** | **`Q3`** the carrier token's source (STEP 0) | ***"Use recommended"*** | **ANSWERED, ADOPTING THE SUPERVISOR'S RECOMMENDATION: `Node-API` / `napi` IS THE ONLY EXTERNALLY-SOURCED TOKEN in this unit's declared surface.** **Consequences: THE TRIGGER FIRES ON THAT ONE LIMB, so this unit carries a DOSSIER WITH ONE IDENTIFIER ROW (keyed `Node-API` / `napi`), and that row MUST BE `defined` — its instrument being `A1` filed within an ACTIVE `docs/decisions.md` row (the same instrument the listener unit's rows used).** **`U32` closes, and with it the last row that could bar the delegable word.** |
| **`A73`** | **`Q4`** `U-24` / `J-13`, the module-supplied-functions crossing | ***"Constraint/Repair is client-side, using rollback to reverse constraint violations."*** | **ANSWERED, AND IT CLOSES `U-24` WITHOUT ADDING A STORE SURFACE: CONSTRAINT AND REPAIR EVALUATION IS CLIENT-SIDE — the JS side holds the constraint functions — and A VIOLATION IS REVERSED BY THE STORE'S OWN `rollback`, called with the OP THE WRITE RETURNED.** **This is exactly the mechanism the store already declares: `write` returns its `JournalOp` (with its `opId`), and `rollback(opId)` is the journal's only consumer (`§6.3`/`§6.4`).** **So the crossing this subject needs is ALREADY IN `A63`'s SURFACE (`write` out, `rollback` in) — no constraint verb, no function parameter, no store change — and `U-24`'s disposition is *"client-side, carried by the existing `write`→`rollback` pair"*, with `J-13`'s absence from `P-1` recorded as the fact it is.** **`U28` closes.** |
| **`A74`** | **`Q5`** the lifetime verb | ***"Not needed"*** | **ANSWERED: NO `dispose()` AND NO `close()` — not at the package level and not at the store level.** **Consequence: the ownership clause states one `Store` per instance, caller-owned, NO FINALIZER AND NO RELEASE VERB, with the reason declared (the store runs no background work, holds no OS handle beyond its path and commits synchronously, so the only thing a dropped wrapper holds to process exit is memory).** **`U13` closes.** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE BUBBLE IS ANSWERED IN FULL — ALL FIVE QUESTIONS, and every row the step-3 record named as pending on them is now closed: `U1` (the realm claim, `A70`), `U13` (the lifetime verb, `A74`), `U16` (the distribution cut, `A71`), `U28` (`U-24`/`J-13`, `A73`) and `U32` (the STEP-0 route, `A72`).** **(2) THE VERDICT'S ONE CONDITIONAL IS RESOLVED FAVOURABLY: step 3 returned `APPROVE-WITH-CONDITIONS` / `DELEGABLE` on the condition that step 4's STEP-0 route lands no open row — `A72` determines the route and names the instrument, so the route is a ONE-ROW DOSSIER whose row is `defined` on an ACTIVE decisions row, and the delegable word is not barred.** **STEP 4 MUST STILL ISSUE IT on its own determination (the trigger is step 4's to find, and the dossier's row and snapshot are its own to author).** **(3) `A73` MAKES THE CONSTRAINT MECHANISM A *CLIENT-SIDE PATTERN* AND NOT A SURFACE: the package's documentation may state *"evaluate constraints after a write; on a violation, call `rollback` with the op the write returned"* — that is a usage pattern over declared verbs, NOT a new seam, and the store's own `§10.2`-class prohibition on a constraint surface is untouched.** **NO UNIT ROW IS ADMITTED; THE LEDGER STANDS `1 DONE / 2 open` UNITS = `3`.**

---

## §16. ROW 1 ELABORATED — who owns the verbs: the JS entry, or the addon over the Rust core?

**<⟶ APPENDED, DATED. This section ELABORATES the fork the contract-vs-build sweep measured at its row 1; it takes NO ruling. The recommendation is the supervisor's, priced beside its alternatives.**

**WHAT WAS MEASURED (`docs/specs/storeroom-js/contract.md`'s `SW-1` row 1, and the red-set pass's own findings):** **`bindings/js/index.mjs`'s `Boundary` carries ALL EIGHT VERBS and NEVER calls the addon's `storeCreate` or `call`** — so the Rust facade's dispatch is **dead code**, and **the JS side is a second store**. The shipped entry implements the walk, the carriers, the boundary model and the verbs **in JavaScript**, with the native crate present but unexercised.

**WHAT THE CONTRACT DECLARES (`package.md §4.5` item 1 and `§4.4`'s `V1`):** *"the same crate's two halves"* — a **pure-Rust conversion core** (`storeroom_js_binding::crossing`, Node-API-free) and a **thin Node-API facade** (`facade`), where the facade *"maps JS values into the core's model and the core's answers back into JS values"*. **The declared route is therefore `JS → facade → core → store`; the shipped route is `JS → JS`.** The red set's Rust cells exercise the core, the JS cells exercise the entry, and **the crossing the architect ruled `A65` about — the deep copy in both directions, the per-class walk, the plain-object test, the ceiling, the cycle guard — is thus implemented TWICE, in two languages, and neither implementation is the declared one.**

**WHY THE STAKES ARE NOT COSMETIC — FIVE CONSEQUENCES, EACH MEASURABLE.**
1. **THE STORE THE APP RUNS.** If the JS entry owns the verbs, the semantics that actually execute are JavaScript's: the tier discipline, the journal and its rollback, the listener firing, the fifteen fail codes and their generated messages would have to be re-implemented in JS and kept in step with Rust. **That is the very reimplementation this project exists to replace** — the original directive was to *"replace the implemented storage tree … with a native code plugin using Rust"* and `A1` ruled the native carrier.
2. **`A65` BECOMES VACUOUS.** The deep-copy discipline is a statement about **two owners**; with one owner there is no boundary to copy across, so the ruling's whole content — *"neither the store nor the JS should be able to get a reference/pointer to data owned by the other"* — describes a crossing that does not happen.
3. **`A70`'s CLAIM LOSES ITS VALUE.** The claimed realm is Node ESM *so that* the native store is what a consumer loads. If the entry is a JS store, the package ships a JavaScript store and the addon is decoration.
4. **THE STORE'S OWN GREEN STOPS MATTERING.** `377/377` (the store) and the `223` core cells would verify a library the application never calls; **the JS unit's green would attest nothing about the store**, and the sweep's rows 7–14 (the wrong ceiling class, the realm-identity plain-object test, ten of fifteen codes reachable, package-minted statuses, hand-authored messages, the registry asymmetry, cross-instance handle identity, the unpassed invocation argument) are **all symptoms of that one shape** rather than independent defects.
5. **TWO STORES IN ONE PROCESS.** If the addon were also reachable, a consumer could hold a Rust `Store` and a JS store over the same `cfg.filePath` — the hazard `A74`'s ownership clause declares for two *instances*, now doubled by two *implementations*.

**THE THREE SHAPES, PRICED.**
- **(V-1) THE DECLARED SHAPE — the entry DELEGATES every verb to the addon, which calls the core. RECOMMENDED.** The `Boundary` becomes a **mapping layer only**: JS values → the wire codec → the core, and the core's answers → JS values, with the **registry, the opaque handle and the single failure form staying in JS** (they are the *package's* surface, `§2.4`) and **the message coming from the STORE VERBATIM** (which also settles the sweep's row 11: the hand-authored `fail()` strings disappear). **Cost, stated honestly: the JS leg of the acceptance layer then needs the BUILT ADDON — a `.node` must exist for those cells to run, so the JS test layer acquires a build step (exactly what the prebuild work `A71` implies), and every "the addon is absent or fails to load" state must be DECLARED as a failure form rather than silently absorbed — which is `P-TP-7`'s `S-LOAD`/`S-ONE-ADDON` subject.** **Gain: the crossing is what is under test; the semantics are single-sourced in Rust; `A65` and `A70` mean what they say.** **AND THE EFFORT IS LIKELY A NET REDUCTION: the JS-side store logic is deleted, the Rust cells become the substantive crossing layer (as `V1` intended), and the JS cells shrink to the wiring (the load, the mapping, the failure form, the registry, the handles).**
- **(V-2) THE SHIPPED SHAPE DECLARED AS INTENTIONAL — the JS entry OWNS the verbs and the Rust core serves as a conversion reference (or is dropped).** **Cost: it contradicts the project's purpose and `A1`, makes `A65` vacuous, re-implements the store in a second language to be kept in step forever, and leaves the store's green attesting nothing. This is the option that would require the ARCHITECT to re-scope the whole unit** — and if he wants it, the honest consequence is that `U-STOREROOM-JS` is not an integration but a **JavaScript store implementation**, and its contract's `crossing` part should be re-titled.
- **(V-3) A DECLARED DUAL PATH — delegate when the addon loads, fall back to a JS implementation otherwise.** **Cost: two implementations to keep semantically equal, a DIFFERENTIAL harness to assert it (a new test layer with its own layer label), and a fallback whose fail codes, journal, tiers and firing must match Rust exactly — which is `V-1`'s work plus `V-2`'s work, with a silent-mode hazard on top: an application that *thinks* it is running the native store while running the JS one is the worst of the three outcomes. Gain: the JS cells can run without a build, and a consumer missing a prebuild still functions.**

**RECOMMENDATION: (V-1).** It is what the contract already declares, what `A1`/`A65`/`A70` each assume, and what makes the remaining gates worth their cost — and its single real cost (the JS leg needs the built addon) is a build step the prebuild decision has already accepted.

**AND ONE THING THIS ELABORATION DOES NOT DO: it does not rule, and it does not touch the code. The choice is the architect's; whatever he rules becomes the implementer's next pass, and the sweep's eight remaining code rows fall where the choice puts them — under `V-1` most of them are consequences of ONE wiring change rather than eight independent repairs.**

---

## §17. THE ARCHITECT'S SHAPE RULING OF 2026-10-11 — `V-1`: the entry delegates every verb to the addon

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Proceed V-1

**THE RULING, TRANSCRIBED AS `A75`.**

| # | What it answers | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A75`** | **the sweep's row 1 fork: (V-1) the entry delegates every verb to the addon over the pure-Rust conversion core — the shape the contract already declares · (V-2) the shipped shape declared intentional, the JS entry owning the verbs · (V-3) a declared dual path with a fallback** | ***"Proceed V-1"*** | **`V-1` ADOPTED, AND IT IS THE DECLARED SHAPE AFFIRMED: THE JS ENTRY DELEGATES EVERY VERB TO THE ADDON, WHICH CALLS THE PURE-RUST CONVERSION CORE — the route is `JS → facade → core → store`. THE `Boundary` BECOMES A MAPPING LAYER ONLY (JS values → the wire codec → the core, and the core's answers → JS values); THE REGISTRY, THE OPAQUE HANDLE AND THE SINGLE FAILURE FORM STAY IN JS (they are the PACKAGE's surface, `§2.4`); AND THE MESSAGE CROSSES FROM THE STORE VERBATIM — which settles the sweep's hand-authored-message row as a by-product.** **CONSEQUENCES: (1) the JS-side store logic is DELETED, so the crossing is what is under test and the semantics are single-sourced in Rust; (2) the JS leg of the acceptance layer acquires A BUILD STEP (a `.node` must exist for those cells), which is what `A71`'s prebuild decision already accepted; (3) every "the addon is absent or fails to load" state must be DECLARED as a failure form rather than silently absorbed — `P-TP-7`'s `S-LOAD`/`S-ONE-ADDON` subject; (4) the sweep's remaining code rows fall as consequences of ONE wiring change rather than as independent repairs — the wrong ceiling class, the realm-identity plain-object test, the ten-of-fifteen code reachability, the package-minted statuses, the hand-authored messages, the registry asymmetry, the cross-instance handle identity and the unpassed invocation argument are all symptoms of the shape this ruling removes.** | **it does not license a FALLBACK: there is no second implementation, so an addon that fails to load is a DECLARED FAILURE and never a silent JS store (`V-3` was refused by this choice).** |

**AND TWO CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE IMPLEMENTER'S NEXT PASS IS THE REWIRE: `index.mjs` delegates to the addon, the JS-side store logic goes, the mapping layer stays, and the code rows the sweep measured against the declared shape are corrected — with the red set's three findings (the unpassed invocation argument, the arity-decided absent-vs-undefined fold, the registry asymmetry's unobservable) landing with them.** **(2) NO CONTRACT CLAUSE MOVES: the contract already declared `V-1` (`package.md §4.4`/`§4.5`), so this ruling affirms the contract and indicts the build — its only new demand is the DECLARED absent/failed-addon failure form and the JS leg's build step.** **NO UNIT ROW IS ADMITTED; THE LEDGER STANDS `1 DONE / 2 open` UNITS = `3`.**

---

## §18. THE ARCHITECT'S BOUNDARY RULINGS OF 2026-10-11 — validate BEFORE admitting, never repair, and reject verbosely; the triggered id is matched client-side

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Test JS data for compliance with permitted shape before admitting and do not attempt to fix. reject with verbose error to client
> Listener passes an id back to client-side when triggered, JS then has to match id to the function it was set with.

**THE TWO RULINGS, TRANSCRIBED AS `A76`–`A77`.**

| # | What it answers | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A76`** | **gate 4's coercion/validation defect class — `JS-1`, `JS-2`, `JS-5`, `JS-6` (and `§1.4`'s *"a write-time failure rather than a silent coercion"* read at the JS boundary): the shipped walk and the facade COERCE or READ PAST a non-conforming input (a bigint through the number arm to `0`; `Number(Symbol())` throwing a raw `TypeError`; `Array.isArray` short-circuiting the prototype test so a class extending `Array` is admitted; prototype-chain member reads admitting a class instance as `cfg`)** | ***"Test JS data for compliance with permitted shape before admitting and do not attempt to fix. reject with verbose error to client"*** | **A VALIDATION-FIRST DISCIPLINE IS RULED, IN THREE PARTS: (1) EVERY JS VALUE IS TESTED FOR COMPLIANCE WITH THE PERMITTED SHAPE BEFORE IT IS ADMITTED — the class decision is made first, on the value as it IS, never after a coercion; (2) NOTHING IS REPAIRED — no conversion, no substitution, no defaulting, no "fixing up" of a non-conforming input (so a bigint is a `BigInt` and is refused as one, `Symbol()` is refused by its own class, an `Array` SUBCLASS is refused as a class rather than admitted for passing `Array.isArray`, and a prototype-carrying `cfg` is refused rather than read through the chain); (3) A NON-CONFORMING INPUT IS REJECTED WITH A **VERBOSE ERROR TO THE CLIENT** — the rejection names the failing target and the reason, inside the single declared failure form.** **CONSEQUENCE FOR THE CONTRACT: the crossing part must DECLARE the validation order (class test → shape test → admit, in that order, with the class decision never deferred), the prohibition on repair, and WHAT *VERBOSE* MEANS at its own cell (the failing target rendered as the store's generator renders it, plus the position or the class that failed) — `A64`'s *"no discrimination rule is owed"* is UNAFFECTED: the caller still cannot tell its own stored data from a failure record, and now the failure record SAYS MORE.** |
| **`A77`** | **gate 4's `JS-11`/`JS-12` and the registry's own model — who owns the id→function matching, and what a trigger hands back** | ***"Listener passes an id back to client-side when triggered, JS then has to match id to the function it was set with."*** | **ANSWERED, AND IT CONFIRMS THE DECLARED SHAPE: THE STORE (THE LISTENER'S OWNER) PASSES AN **ID** BACK TO THE CLIENT WHEN A LISTENER IS TRIGGERED, AND **THE JS SIDE MATCHES THAT ID TO THE FUNCTION THE CALLER REGISTERED IT WITH**.** **So `triggered` is a list of IDS (the handles the caller received at registration), the invocation is the client side's, and the package's registry is the id→function map — which is exactly `A57`'s return-by-handle read at the JS boundary and the four registry rules the contract already declares.** **CONSEQUENCES: (1) an id the package holds NO function for fires NOTHING, silently — and that SILENCE IS THE DECLARED OBSERVABLE rule 1 owes (gate 4's `JS-11`: the absence of an invocation, of a log and of a throw must be ASSERTED, not assumed); (2) the id a trigger carries is the id REGISTRATION returned — the same value, one identity, so the matching is by that identity alone and NO ORDER is asserted (the store declares the returned order unobservable); (3) a DUPLICATE id in one trigger set matches ONE function and the contract's *"once per distinct handle"* rule stands; (4) the invocation receives the id it was matched by and the triggering ADDRESS per `PAR-JS-12` — the two are not the same datum and the contract must say which is which at each cell.** |
| **`A76`'s reach, stated so it is not over-read** | — | — | **it does NOT license a SECOND failure form: the verbose rejection still travels inside the one `{status, message}` the store's closed set produces (`§2.5`), so `JS-1`'s raw `TypeError` is a violation OF `A76` rather than a permitted extra form; and it does NOT license a package-minted code (`DD-40`).** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) FOUR OF GATE 4'S SIX STOP-GRADE FINDINGS ARE DISPOSED BY `A76` AS A CLASS, not one by one: `JS-1`, `JS-2`, `JS-5` and `JS-6` are all the same defect — a validation that happens AFTER a coercion or that is skipped for a value the language makes look conforming — and the ruling fixes the discipline that produced them.** **(2) `A77` MAKES TWO OF GATE 4'S SUBSTANTIVE FINDINGS ACTIONABLE: `JS-11`'s *"rule 1's silence is unobservable"* becomes an ASSERTABLE observable (no invocation, no log, no throw for an unmatched id), and the id→function identity is what `S-OPAQUE` and `S-REG`'s outside-class drives must pin.** **(3) THE IMPLEMENTER'S PASS AND THE CONTRACT'S PASS ARE BOTH OWED: the contract DECLARES the validation order, the no-repair prohibition, the verbose rejection's content and the id-matching model, and the code is REWRITTEN at the boundary to validate first — with the four stop-grade findings and `JS-3`'s byte-equality landing in the same pass.** **NO UNIT ROW IS ADMITTED; THE LEDGER STANDS `1 DONE / 2 open` UNITS = `3`.**

---

**END OF THE PROPOSAL.** **§1 is the architect's directive, byte-for-byte. §2 is the measured context. §3 is
the filing's bounds. §4 is a quotation table with no reading taken. §5 is a map of adjacencies with no
ruling. §6 records the adoption trigger's premise and the ledger move. §7 is the provenance. No behaviour
clause, no signature, no return shape, no fail-state and no ruling is asserted anywhere in this file.**
