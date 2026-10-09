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
   testing"*; `A57` ruled the firing model **return-by-handle** (the store returns handles and **invokes
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

**THE LEDGER MOVE THIS FILING OWES, WITH ITS TERMS:** the ledger stood at **`1 DONE / 1 open` UNITS = `2`**; **this filing opens a third unit's gate-1 row, so it reads `1 DONE / 2 open` UNITS = `3` (`1 + 2 = 3` ✓)** — landed in `docs/next-steps.md` in the same pass.

---

## §7. PROVENANCE

1. **READ AT ITS OWN BYTES (this pass):** the directive (the architect's message) · `Cargo.toml`, the crate's module list, `src/error.rs` (the closed `StoreError`), `src/records.rs` (the returned shapes), `src/value.rs` (the taxonomy) · `docs/specs/storeroom-native/contract.md`'s `§0.4`, `§3.6`, `§5.x`'s register, `§8.1`–`§8.3` · the greens and both e2e batteries' headers and figures · `docs/pending.md` (`P-1`/`P-2`/`P-3`) · `docs/next-steps.md` (the ledger, the DONE row, `L-4`'s toolchain probe) · `docs/decisions.md` · `docs/specs/storeroom-native-proposal.md` (`A1`/`A2`/`A8`/`A9`/`A57`/`A58`).
2. **NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** the parts of the contract directory beyond the sections named; `src/**` beyond the named files; `tests/**` beyond its census; `archive/**` beyond record names; and **every byte under `../Provident-Electron/**`** (`A9`).
3. **NOTHING WAS RUN, NOTHING WAS COMMITTED, AND NO BYTE OF THE ADJACENT PROJECT WAS WRITTEN.**

---

**END OF THE PROPOSAL.** **§1 is the architect's directive, byte-for-byte. §2 is the measured context. §3 is
the filing's bounds. §4 is a quotation table with no reading taken. §5 is a map of adjacencies with no
ruling. §6 records the adoption trigger's premise and the ledger move. §7 is the provenance. No behaviour
clause, no signature, no return shape, no fail-state and no ruling is asserted anywhere in this file.**
