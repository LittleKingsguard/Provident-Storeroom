# PROPOSAL (v3) — the addon's exported surface (`U-STOREROOM-ADDON-SURFACE`)

**Role of this file.** The artifact-under-review for the proposal-review gate (gate 1) of unit
`U-STOREROOM-ADDON-SURFACE`. **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no
return shape and no fail-state; it licenses no code task; it admits no unit row; it edits no byte of any other
file. **Its `§1` is the architect's own words, byte-for-byte.**

**Unit id / prefix (proposed; the gate determines the form — see `§10` item 2).** **`U-STOREROOM-ADDON-SURFACE`** ·
spec path (if a unit) `docs/specs/storeroom-addon-surface/`.

**Gate state at filing.** **GATE 1 — RE-OPENED ON THIS FILE, NOT PASSED.** The chain is restated at `§10` item 1.

---

## §0. THIS FILE SUPERSEDES TWO FILINGS — read this before anything else

**THE PREDECESSOR CHAIN IS `docs/specs/storeroom-addon-surface-proposal.md` (364 lines, "v1") →
`docs/specs/storeroom-addon-surface-proposal-v2.md` (401 lines, "v2") → this file.** **V1 WAS RETURNED
`INVALID` BY GATE 1. V2 WAS RETURNED `VALID-WITH-FINDINGS` BY GATE 1, AND IS THIS FILE'S BASE.** **Both files
stand UNTOUCHED at their own paths and neither head is rewritten; this file is a THIRD filing at a NEW path,
and `v3` is not an edit of `v2` but a filing that CARRIES v2 and CORRECTS it.**

**A reader must be able to see what moved without diffing three files. So this section states, in order: what
v3 ADDS (`§0.1`), the four places v3 CORRECTS v2 or its predecessors (`§0.2`), and what v3 CARRIES UNCHANGED
from v2 (`§0.3`).**

### 0.1 THE ONE NEW LEADING ITEM — the binding-library adoption, `P-12`

**v3 ADDS ONE ITEM AND IT LEADS THE FILE, because the architect has ruled on it and because its cost is
already materialised in the tree (`§0.2` `C-3`).** **It is `§2.0` below; the three v2 items are renumbered
under it and are unchanged in substance.**

**THE ARCHITECT'S RULING, VERBATIM, AND IT IS `§1.4`'s.**

### 0.2 THE FOUR CORRECTIONS — three are the supervisor's/architect's, one is this pass's

**`C-1` — THE DEPENDENCY RULE WAS MISREAD, BY v2 AND BY THE SUPERVISOR BEFORE IT. THIS IS THE TRUE READING.**
**The crate's dependency rule is `docs/specs/storeroom-js/package.md §4.2` item 3** (read at `:484`–`:486`):
*"ITS DEPENDENCIES ARE PINNED BY THE CARET REQUIREMENT ITS OWN `Cargo.toml` STATES, AND IT HAS NO PATH BACK
INTO THE STORE BEYOND THE SINGLE PATH DEPENDENCY — no second path dependency reaching into the store's
`tests/**`, and no vendored copy of the store's sources."* **IT COUNTS DEPENDENCIES IN `npm`-SEMVER TERMS — a
caret requirement — and it PROHIBITS PATH DEPENDENCIES INTO THE STORE and VENDORED COPIES. IT DOES NOT
PROHIBIT REGISTRY DEPENDENCIES. The rule's own instrument is a CARET REQUIREMENT, which is the form a registry
dependency is written in; a clause that meant to ban registry dependencies could not have named that form as
the way its dependencies are pinned.**

**AND BOTH OF THE TWO BYTES THAT WERE READ AS A BAN ARE NOT ONE, EACH AT ITS OWN SITE:**
- **`--offline` IS A BUILD-MODE FLAG AND NOT A DEPENDENCY RULE, AND `§4.2`'S OWN 2026-10-11 AMENDMENT STATES ITS
  PURPOSE, MEASURED RATHER THAN ARGUED** (`package.md:496`–`:500`): *"`cd bindings/js && cargo test` finds NO
  manifest in `bindings/js/` while the crate's `Cargo.toml` does not yet exist, so `cargo`'s UPWARD MANIFEST
  SEARCH resolves the ROOT manifest and the command builds and runs `storeroom-native`'s suite — `exit 0`, the
  store's own green, `0` of this unit's `219` Rust cells executed."* **`--offline` therefore pins WHICH PACKAGE
  RUNS — it keeps a bare invocation from reaching a registry rather than resolving the wrong manifest — and it
  was never a statement that the crate may hold no registry dependency.** **READ AT ITS OWN BYTES: `:503`–`:505`
  declares `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` and
  `cargo build --manifest-path bindings/js/Cargo.toml --offline`.**
- **THE ROOT `Cargo.toml`'s `# No dependencies:` NOTE IS THE *STORE'S* MANIFEST SPEAKING ABOUT ITSELF, NOT A
  RULE ABOUT THE BINDING CRATE.** **`Cargo.toml:12` reads, in full: *"No dependencies: `cargo test --offline`
  and `cargo build --offline` must work with no registry."*** **That line sits inside the ROOT `[package]` block
  whose `name` is `storeroom-native` (`Cargo.toml:2`) — it is the store's own declaration about the store's own
  manifest, which the sibling crate reaches through `§4.2` item 3's single path dependency and does not inherit
  a dependency policy from.** **It is not, and cannot be, a clause governing a DIFFERENT crate's manifest.**

**AND THE ARCHITECT'S RULING CONFIRMS THE POLICY'S SCOPE, VERBATIM AT `§1.4`: *"No/limited dependencies is a
policy intended as a js-side control to limit development version conflicts, it does not apply to the rust
store"*.** **SO THE POLICY IS A JS-SIDE DEVELOPMENT-CONFLICT CONTROL; IT DOES NOT REACH THE RUST CRATE; AND A
REGISTRY DEPENDENCY IN `bindings/js/Cargo.toml` IS LAWFUL UNDER `§4.2` ITEM 3 AS WRITTEN.**

**AND THIS PASS STATES PLAINLY WHAT IT MUST: v2's AND v1's REASONING ON THIS POINT WAS WRONG.** **Neither of
them reached the point only because neither proposed a registry dependency; the moment one is proposed the
misreading would have blocked it, and it is stated here so the misreading is not inherited by the gate.**
**`bindings/js/Cargo.toml:16`–`:17` carries the same misreading at the crate's own manifest — *"`§4.2` item 3:
the only dependency is the single path dependency on the store — no second path dependency, no vendored copy,
no registry fetch at all"* — and THIS FILING REPORTS IT AND DOES NOT EDIT IT** (this role writes one file;
`§12` item 5). **The words *"no registry fetch at all"* are not `§4.2` item 3's and are a comment's own
over-reading; a gate that adopts `P-12` must expect that comment to move, and this filing names it so a later
pass does not discover it as a contradiction.**

**`C-2` — `§4.3` ITEM 1 IS UNOPPOSED, AND `§4.4` REFUSED EXACTLY WHAT WAS BUILT.**
**`docs/specs/storeroom-js/package.md §4.3` item 1** (read at `:534`–`:536`) reads: *"THE EXPORT LAYER IS BUILT
WITH A NODE-API BINDING LIBRARY OF THE `napi-rs` FAMILY"* (`DD-2`), which *"generates the `.d.ts`, ships a
build-script helper usable from `build.rs`, and does not require the `napi` CLI"*. **NOTHING BLOCKED IT. THERE
WAS NO CONFLICT TO RESOLVE.** **And `§4.4`** (read at `:556`–`:560`) prices the variants and REFUSES **`V3` —
*"(hand-written FFI) moves the conformance risk into hand-written unsafe code"*.** **THE TREE CONTAINS `V3`.**

**AND THE VERIFICATION THIS PASS TOOK, STATED WITH ITS SEARCH AND ITS ANSWER (the task set it as a check and the
answer is a NEGATIVE, recorded rather than assumed):**
- **SEARCH 1 — FOR AN AMENDMENT TO `§4.3`.** `package.md`'s `§4.3` is `:532`–`:546` and it carries NO dated
  `AMENDED`/`RECONCILED` clause anywhere in that span. **The file's whole `AMENDED`/`RECONCILED` clause set was
  enumerated — `:183`, `:211`, `:317`, `:345`, `:464`, `:492`, `:596`, `:621`, `:789`, `:922`, `:975` — and
  NONE touches `§4.3`.** **NO AMENDMENT TO `§4.3` EXISTS.**
- **SEARCH 2 — FOR A `docs/decisions.md` ROW SUPERSEDING IT.** Searched the whole file for `napi-rs`,
  `napi-sys`, `DD-2`, `V3` and `hand-written`. **THE RESULT IS NO MATCH ON ANY OF THE FIVE.** **NO
  `docs/decisions.md` ROW SUPERSEDES `§4.3` ITEM 1 OR `DD-2`.**
- **SO THIS IS A DECLARED-VS-ACTUAL DIVERGENCE**: the declared builder path is `§4.3` item 1's library and the
  actual builder path is `§4.4`'s refused `V3`. **The architect has now ruled on its disposition, and the
  ruling is `§1.4`'s *"Adopt napi-rs"*: ADOPT THE LIBRARY.**

**`C-3` — THE DIVERGENCE'S COST IS ALREADY MATERIALISED, AND IT IS THE STRONGEST SINGLE PIECE OF EVIDENCE FOR
THE ADOPTION. THIS IS WHY `P-12` LEADS.**
**`bindings/js/index.d.ts` IS HAND-AUTHORED — BECAUSE NO LIBRARY GENERATES IT.** **That file drifted, and the
drift is read at its own bytes:** **`:38` prints *"THE OPERATIVE SET IS TWELVE OWN MEMBERS, `10 + 1 + 1 = 12`"*;
`:52` prints a *"2026-10-17 thirteen-mark"*; `:72` orders the figure read through as *"FOURTEEN"*; `:493` prints
*"`\"THE TWELVE\"` IS THE OPERATIVE FIGURE FROM 2026-10-18"*; and `:497` prints *"`\"THE TWELVE\"` IS SUPERSEDED
IN TURN, 2026-10-19: THE OPERATIVE FIGURE IS `\"THE FOURTEEN\"`"*.** **FIVE DATED READINGS OF ONE MEMBER COUNT IN
ONE HAND-AUTHORED FILE, EACH SUPERSEDING THE LAST, AND THE PRODUCT'S MEMBER SET MOVED UNDER ALL OF THEM.** **A
clean-up pass repaired the symptom on 2026-10-18; the file remains hand-authored and the class of drift remains
open.**

**THAT IS `§4.4`'s REFUSED `V3` COST, CHARGED TO THE ACCOUNT.** **`§4.4` refused hand-written FFI because it
*"moves the conformance risk into hand-written unsafe code"* — and a hand-authored `.d.ts` is the same risk in
its declaration half: a file a human keeps in step with a boundary no generator is watching.** **It is cited
here, at `§2.0`, as the reason the item leads: the divergence's cost is not prospective and not hypothetical —
it has been paid once and would be paid again at every surface change.**

**`C-4` — THIS PASS'S OWN CORRECTION TO v2, AND IT IS A COUNT.** **v2's `F-11.1` prints *"TEN call sites
carrying EIGHT distinct verb strings"*; the supervisor's brief to this pass prints *"ten call sites carry
SEVEN distinct verb strings (`listen` appears twice), not eight"*.** **NEITHER FIGURE IS WHAT THE TREE HOLDS.
MEASURED THIS PASS, at the sites themselves:**

- **THE `call(state, '<verb>', …)` INVOCATIONS ARE NINE, NOT TEN** — `index.mjs:2051` `'read'` · `:2057`
  `'readLiteral'` · `:2166` `'delete'` · `:2179` `'rollback'` · `:2254` `'listen'` · `:2301` `'unlisten'` ·
  `:2555` `'removeListener'` · `:3145` `'listen'` · `:3244` `'commitFile'`. **`9` SITES.**
- **THE DISTINCT VERB STRINGS ARE EIGHT, NOT SEVEN** — `read` · `readLiteral` · `delete` · `rollback` ·
  `listen` · `unlisten` · `removeListener` · `commitFile`. **`8` DISTINCT STRINGS.**
- **THE ARITHMETIC, PRINTED WITH ITS TERMS: `9` sites = `8` distinct tokens + `1` repeat, the repeat being
  `listen`'s (`:2254` and `:3145`) — `8 + 1 = 9` ✓.**
- **AND `writeCall` IS A TENTH `addon_.call` SITE (`:1922`), WHICH IS WHERE v2's *"ten"* CAME FROM AND WHY IT IS
  NOT A `call(` SITE: `writeCall` calls the ADDON's `call` directly, bypassing the `call` wrapper, which is
  exactly `F-13.2`'s subject.** **So `10` `addon_.call` sites = `9` through the wrapper + `1` through
  `writeCall`, and the wrapper's own arity of distinct verbs is `8`.**

**THIS PASS MEASURED AND DID NOT INHERIT, BECAUSE THE BRIEF ITSELF WARNED THAT A WRONG COUNT HAS TWICE BEEN
PUBLISHED INTO A FILING.** **The correction is this pass's; the misreading corrected in `C-1` is the
supervisor's and `C-2`/`C-3` are the supervisor's and the architect's.**

### 0.3 WHAT v3 CARRIES FROM v2 UNCHANGED, NAMED SO NOTHING IS SILENTLY DROPPED

**Carried whole and only renumbered:** **`P-9`** (the faded dispatch: one export per verb) · **`P-10`** (the
integer index dies; the stores survive) · **`P-11`** (the JS-side wrappers come out) · **`§4`'s three
dispositions of v1's questions** (`A-1`, `A-2`, `A-3`) · **`§5.1`'s parked stateless factory**, with its revisit
condition an architect ruling on store lifetime · **`§6`'s two calibration defects** (the dead `INTERNAL_FIVE`;
the live `FTS-10.2` pin), **including v2's own restriction of the *"stays falsely green"* claim to the first
limb** · **`§7`'s breaking-change clause**, with **NO version number chosen** · **`§10` item 3's `STEP 0`
determination** (the trigger fires; it blocks the delegable verdict, not merely the spec pass) **and the note
that the dossier is OWED** · **`§10` item 4's layer clause** · **`§11`'s provenance discipline**, with its three
evidence classes.

**CARRYING IS NOT ENDORSING, AND THE THREE CARRIES THAT v3 CORRECTS IN PLACE ARE NAMED HERE SO A READER DOES NOT
MISTAKE THEM FOR DROPPED: `§3`'s conclusion (`§3.2`), `F-11.3`'s claim of kind (`§4.3`), the `state.id` site
count (`§4.4`), and the call-site arithmetic (`§0.2` `C-4`).** **Each of the four is carried and corrected, not
carried and left.**

---

## §1. THE ARCHITECT'S WORDS, VERBATIM

### 1.1 THE UNIT'S THREE CONFIRMATIONS — quoted byte-for-byte, no character changed

> For readability in debug don't route everything through call, create separate exports

> Creating multiple instances within the same store is no longer supported behavior, the client is instead expected to create different stores. Instance identity is thus redundant.

> Check if a second store create is still possible or if it has been removed by the instance deprecation

> That is to say, a separate store creation within the same rust space. The client should be able to make two store objects, ex
> const layoutConfig  = storeCreate(cfg)
> const secure = storeCreate(secCfg)
>
> But the stores for layoutConfig and Secure config should live in different memory spaces

### 1.2 THE THREE LATER EXCHANGES — the operative scope, also byte-for-byte

> Yes, still split the exports

> Use reading i

> 3

### 1.3 WHAT EACH OF THE THREE SELECTED — because they are the design and not commentary

1. **`"Yes, still split the exports"` — `P-9` PROCEEDS.** The question put to him was whether the export split
   survives once the instance deprecation is read with it. **It does. The Rust-side dispatcher's string
   indirection is to go.**
2. **`"Use reading i"` — `P-10` LANDS AS: THE INTEGER INDEX DIES; THE STORES SURVIVE.** **Multiple stores per
   process keep working** — the architect's own `layoutConfig`/`secure` example above is the supported path.
   **Each verb resolves its store from the Node-API `this` receiver**, which `napi_get_cb_info(…, &mut this, …)`
   **already receives at every entry and currently discards** (`facade.rs:1251`, `:1199`, `:1489` — each
   declaring `let mut this: NapiValue = std::ptr::null_mut();`, passing `&mut this`, and then never reading the
   local again).
3. **`"3"` — UNWRAP BOTH SIDES.** **This is the item v1 never carried and it is the unit's centre. Its content
   is `§3`, and `§3.2` is the corrected form of the claim it was stated with.**

### 1.4 THE RULING ON THE BUILDING PATH — the new leading item's authority, byte-for-byte

> No/limited dependencies is a policy intended as a js-side control to limit development version conflicts, it does not apply to the rust store

> Adopt napi-rs

> Take as a, then proceed with the recommended order into the gates

**WHAT THESE THREE PINS SELECT, STATED SO THE SELECTION IS NOT LEFT TO INFERENCE:**
1. **THE FIRST PINS THE DEPENDENCY POLICY'S SCOPE** — it is a js-side control and **it does not reach the rust
   store.** This is `C-1`'s confirmation and it is the architect's own act, not a reading of his silence.
2. **THE SECOND PINS THE DESIGN** — **ADOPT `napi-rs`.** This is `C-2`'s disposition of the declared-vs-actual
   divergence, and it is what makes `P-12` a decision to carry rather than a question to file.
3. **THE THIRD PINS THE ORDER** — ***"Take as a"*** selects the versioning option `(a)`, which `§2.0.4` states
   as decided; and ***"proceed with the recommended order into the gates"*** pins **the order at `§2.0.5`**,
   which this filing therefore states as his instruction and not as this filing's preference.

---

## §2. THE FOUR ITEMS AS SCOPED — what is MEASURED, what is READ, what is the supervisor's reading

**Every row carries its class, and the classes are not interchangeable:**
**`MEASURED`** — taken by the supervisor on the live build, carried here as evidence the gate may re-take;
**`READ`** — opened at its own bytes by this pass (every one is listed at `§11`);
**`SUPERVISOR'S READING`** — an inference from the two above that the gate must test;
**`this pass's`** — measured by this pass at the bytes, marked as such because this pass runs nothing.

### 2.0 `P-12` — THE BINDING-LIBRARY ADOPTION (the new leading item)

**THE LABEL, AND WHY IT IS `P-12` RATHER THAN `P-8b`.** **`P-8` IS ALREADY TAKEN** — it is *"THE TEN
PURE-PASSTHROUGH METHOD WRAPPERS COLLAPSE INTO THE FUNCTIONS THEY CALL"*, filed by the architect at code review
2026-10-18 and **LANDED** (`archive/pending/2026-10-22-discharged-parks-and-dated-records.md:667`, `:692`) — **so a `P-8b` spelling would attach a new item to a
closed one's letter, and the next free integer in the sequence `P-9`/`P-10`/`P-11` (which `v2` minted and this
file carries, `§11` item 1) is `P-12`.**

**THE RULING:** ***"Adopt napi-rs"*** (`§1.4`), read with `§4.3` item 1 (`package.md:534`–`:536`) and `DD-2`
(`docs/specs/storeroom-js/contract.md:578`), both of which `C-2` states are UNOPPOSED.

#### 2.0.1 WHAT THE SWAP REPLACES — every row verified at its own bytes by this pass

| Deleted / replaced | By | Class |
| --- | --- | --- |
| **`extern "C" { fn napi_* }` — 23 hand-declared ABI symbols**, the block opening at `facade.rs:63` | **the `napi` crate's checked bindings** | **`READ`** — the 23 declarations are `:64` `napi_get_cb_info` · `:72` `napi_create_string_utf8` · `:78` `napi_get_value_string_utf8` · `:85` `napi_create_function` · `:93` `napi_set_named_property` · `:99` `napi_get_undefined` · `:100` `napi_get_boolean` · `:104` `napi_has_own_property` · `:110` `napi_get_named_property` · `:116` `napi_is_array` · `:117` `napi_get_array_length` · `:118` `napi_get_element` · `:124` `napi_get_value_double` · `:127` `napi_get_value_bigint_int64` · `:133` `napi_get_value_bool` · `:134` `napi_create_uint32` · `:135` `napi_get_value_uint32` · `:136` `napi_typeof` · `:137` `napi_create_object` · `:138` `napi_create_array_with_length` · `:143` `napi_set_element` · `:149` `napi_create_double` · `:150` `napi_throw` — **counted: `23` ✓** |
| **`type NapiEnv` / `NapiValue` / `NapiCallbackInfo` / `NapiStatus` = `*mut c_void`/`i32`** (`facade.rs:58`–`:61`) | **`napi::Env`, `napi::JsUnknown`, `napi::CallContext`** | **`READ`** — `:58` `type NapiEnv = *mut c_void;` · `:59` `type NapiValue = *mut c_void;` · `:60` `type NapiCallbackInfo = *mut c_void;` · `:61` `type NapiStatus = i32;` — **four alias lines, `2` distinct right-hand types** |
| **45 `unsafe fn`** | **safe calls** | **`READ`** — counted: `45` ✓ (`:212`, `:233`, `:241`, `:340`, `:370`, `:391`, `:406`, `:422`, `:436`, `:451`, `:457`, `:467`, `:484`, `:595`, `:636`, `:688`, `:713`, `:753`, `:780`, `:805`, `:909`, `:928`, `:953`, `:963`, `:973`, `:978`, `:983`, `:994`, `:1000`, `:1006`, `:1014`, `:1066`, `:1090`, `:1097`, `:1124`, `:1136`, `:1149`, `:1160`, `:1385`, `:1410`, `:1422`, `:1442`, `:1449`, `:1456`, `:1463`) |
| **50 `unsafe { }` blocks** | **safe calls** | **`READ`** — counted: `50` ✓ (first at `:1200`, last at `:1665`; the count is of `unsafe {` occurrences and no other spelling of the keyword appears in the file) |
| **`napi_register_module_v1` + five `export(…)` calls** | **`#[napi]`-annotated functions** | **`READ`** — the symbol at `facade.rs:1685` (`pub unsafe extern "C" fn napi_register_module_v1(env: NapiEnv, exports: NapiValue) -> NapiValue`, with `#[no_mangle]` at `:1684`), and its **five** `export(…)` calls at `:1686` `"version"` · `:1687` `"errorMessage"` · `:1688` `"storeCreate"` · `:1689` `"call"` · `:1690` `"register"` — **`5` ✓, and `:1691`'s bare `exports` is the function's RETURN and not a sixth export** (v1's `C-1` error, carried corrected from v2) |
| **the hand-authored `bindings/js/index.d.ts`** | **a generated `.d.ts`** | **`READ`** — hand-authored, evidenced by the five dated and mutually superseding member-count readings at `index.d.ts:38`, `:52`, `:72`, `:493`, `:497` (stated at `§0.2` `C-3`) |

#### 2.0.2 THE FIVE ENTRY FUNCTIONS IT REWRITES — verified at their lines

**All five are `extern "C" fn` declarations returning `NapiValue` over `NapiEnv`/`NapiCallbackInfo`, and each is
a `#[napi]`-annotated function's subject under the adoption:**

| # | The entry function | Its line | Class |
| --- | --- | --- | --- |
| 1 | `addon_version` | `facade.rs:1563` | **`READ`** |
| 2 | `addon_error_message` | `facade.rs:1590` | **`READ`** |
| 3 | `addon_create` | `facade.rs:1196` | **`READ`** |
| 4 | `addon_call` | `facade.rs:1248` | **`READ`** |
| 5 | `addon_register` | `facade.rs:1486` | **`READ`** |

**AND EACH NAME'S EXPORT ROW IS THE TABLE AT `§2.0.1`'s LAST ROW — the five `export(…)` calls are these five
functions and nothing else, so the rewrite's arity is `5` functions and `5` exports, one for one.**

#### 2.0.3 `crossing.rs` IS UNTOUCHED — and this pass verifies it rather than assuming it

**`crossing.rs` IS ALREADY PURE RUST WITH ZERO `unsafe`, AND THE ADOPTION DOES NOT REACH IT.** **Verified this
pass: a search of the whole file for `unsafe` and for `napi` returns ONE match, and it is the file's own
declaration of purity at `crossing.rs:4`** — *"IT IS PURE RUST (`§4.5` item 1, `DD-2`): no `napi` type, no
`napi-rs` macro, no `#[napi]` attribute"*. **ZERO `unsafe` occurrences in the file at any byte.**

**SO `crossing.rs` IS `§4.5`'s DECLARED MODULE BOUNDARY AND STAYS EXACTLY AS SPECIFIED.** **`package.md §4.5`
item 1** (read at `:574`–`:579`) declares the boundary and its purity: *"IT IS PURE RUST: no `napi` type, no
`napi-rs` macro, no `#[napi]` attribute and no Node-API symbol appears in it, at any depth"*, and adds *"The
`#[napi]` export facade of `§4.4` and this module are the SAME crate's two halves."* **THE ADOPTION MOVES THE
FACADE HALF AND LEAVES THE CORE HALF AT ITS BYTES — which is what makes the adoption conformant rather than a
re-architecture.**

#### 2.0.4 VERSION PINNING — option `(a)`, DECIDED by the architect, and not re-opened here

**THE ARCHITECT CHOSE `(a)` — *"Take as a"* (`§1.4`) — SO THIS IS STATED AS DECIDED AND IS NOT RE-OPENED.**
**`napi` IS TAKEN AT A CARET REQUIREMENT WITH A FLOOR: `napi = "3.14"`.** **This is `§4.2` item 3's OWN TERMS**
(`package.md:484`–`:486`): the dependencies *"ARE PINNED BY THE CARET REQUIREMENT ITS OWN `Cargo.toml` STATES"*
— a caret requirement with a floor is exactly that form, and `C-1` is the ground on which it is lawful at all.

**AND `Cargo.lock` IS NOT COMMITTED, PER `§4.2` item 2** (`package.md:482`–`:483`): *"ITS `Cargo.lock` IS NOT
COMMITTED — it is a library, and pinning the store's transitive versions for every consumer is a
consuming-application decision and not a library's"* (`DD-27`). **The caret floor and the uncommitted lock are
ONE declaration read together: the floor states what the crate needs, and the lock's absence states that the
CONSUMER resolves it.**

**AND TWO FACTS OF THE BUILD THIS PASS CAN STATE ONLY AS THE SUPERVISOR'S, MARKED AS SUCH BECAUSE THIS PASS RUNS
NOTHING (`§11` item 3):**
- **THE REGISTRY IS REACHABLE: `napi` RESOLVES AT `3.14.2`, which satisfies the `"3.14"` floor.** — **`MEASURED`**
  (the supervisor's, on the live build; the gate may re-take it).
- **`--offline` STILL GOVERNS THE DECLARED BUILD COMMAND**, which stands at `§4.2`'s 2026-10-11 amendment,
  `package.md:503`–`:505`: **`cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast`** and
  `cargo build --manifest-path bindings/js/Cargo.toml --offline`. — **`READ`.** **AND THE TWO FACTS ARE NOT IN
  TENSION, WHICH IS `C-1`'s WHOLE POINT: a FETCH populates the local registry cache and `--offline` governs the
  RUN. `--offline` was never a dependency ban; it is the flag whose stated purpose is that the command cannot
  resolve the root manifest (`package.md:496`–`:500`).**

#### 2.0.5 THE ORDER — the unit's spine, stated as the architect's instruction (*"the recommended order"*)

**THE ARCHITECT'S WORDS ARE *"then proceed with the recommended order into the gates"* (`§1.4`), SO THE ORDER
BELOW IS HIS INSTRUCTION AND NOT THIS FILING'S PREFERENCE.**

1. **THE LIBRARY ADOPTION LANDS FIRST.** **Its witness is that the standing suite does not move: `npm test`
   580/0, typecheck `0` errors on BOTH legs, build `exit 0`, greens `174/0`, `cargo test` 395.** **BEHAVIOUR IS
   IDENTICAL; THE BOUNDARY IS REWRITTEN.** **This is a `MEASURED` figure set (the supervisor's, on the live
   build) and it is the adoption's own acceptance evidence: an identity-preserving rewrite is witnessed by an
   UNMOVED suite, and a suite that moved would witness a behaviour change the item does not claim.**
2. **`P-9` / `P-10` / `P-11` FOLLOW, written against the library.**

**AND THE TWO REASONS THE ORDER IS NOT ARBITRARY — BOTH ARE THE SUPERVISOR's reading, marked as such and put to
the gate to test:**
- **`SUPERVISOR'S READING` (i) — DEFERRING THE ADOPTION MULTIPLIES THE WORK.** **The split takes the dispatcher
  from ONE entry to eleven.** (`facade.rs:1282`'s one `match verb.as_str()` carrying **nine** arms at `:1283`,
  `:1289`, `:1295`, `:1308`, `:1317`, `:1328`, `:1334`, `:1345`, `:1356`, plus the fall-through at `:1369`–`:1372`
  — `READ` this pass; and `§2.1`'s `F-9.2` is the same set.) **Converting first would mean writing the
  hand-rolled ABI eleven times and then deleting it** — the eleven-or-so export entries `§2.1` prices, each
  needing the `extern "C"` signature, the `napi_get_cb_info` prologue and the `argv` marshalling that today
  exist ONCE.
- **`SUPERVISOR'S READING` (ii) — `P-10`'s DETACHED-CALL QUESTION GETS A BETTER ANSWER UNDER THE LIBRARY.**
  **With the hand-rolled ABI the receiver is a `*mut c_void` nobody classifies** (`facade.rs:1251`'s
  `let mut this: NapiValue = std::ptr::null_mut();` is `*mut c_void`, and the local is never read — `READ`);
  **`napi-rs` supplies the receiver as a typed value, so the question becomes answerable rather than
  unanswerable.** **This bears on `§5.2`'s downstream obligation and does not discharge it: the CHOICE between
  binding the members and refusing a detached call remains gate 2's, but the library makes the receiver's
  identity a typed fact the clause can be written over.**

### 2.1 `P-9` — THE FADED DISPATCH: ONE EXPORT PER VERB (Rust side)

**THE RULING (verbatim at `§1.1` and re-confirmed at `§1.2`):** ***"For readability in debug don't route
everything through call, create separate exports"*** → ***"Yes, still split the exports"***.

| # | The fact | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-9.1`** | **THE ADDON'S EXPORT TABLE IS FIVE NAMES — `version` · `errorMessage` · `storeCreate` · `call` · `register` — and `:1691`'s `exports` is the function's RETURN, not a sixth export.** | `facade.rs:1686`–`:1690`; the return at `:1691`. | **READ** |
| **`F-9.2`** | **THE DISPATCHER `addon_call` PARSES `(index, verb, args)` AND MATCHES THE VERB STRING ACROSS NINE ARMS**: `read` `:1283` · `readLiteral` `:1289` · `write` `:1295` · `delete` `:1308` · `rollback` `:1317` · `listen` `:1328` · `unlisten` `:1334` · `removeListener` `:1345` · `commitFile` `:1356`; the fall-through `AddressMalformed` arm at `:1369`–`:1372`. **The parse is at `:1249`–`:1267`.** | `facade.rs:1248`–`:1373` | **READ** |
| **`F-9.3`** | **THE SPEC'S `8` DISAGREES WITH THE CODE'S `9`, AND THE SPEC'S SET IS A DIFFERENT SET RATHER THAN A SMALLER ONE.** `surface.md:1645` declares *"EIGHT DISTINCT TOKENS, AND THEY ARE THESE EIGHT AND NO NINTH: `"read"` · `"readLiteral"` · `"write"` · `"delete"` · `"rollback"` · `"listen"` · `"unlisten"` · `"commitFile"` = `8` ✓"* — **`removeListener` is absent from the eight and is the code's ninth arm; `commitFile` is inside both.** | `surface.md:1645` read with `facade.rs:1345`–`:1349` | **READ** |
| **`F-9.4`** | **BOTH NON-MODULE MEMBERS REACH THE STORE THROUGH `addon_call`**: `removeListener` from `index.mjs:2555` → the `:1345` arm; `commitFile` from `index.mjs:3244` → the `:1356` arm. | `index.mjs:2555`, `:3244`; `facade.rs:1345`–`:1349`, `:1356` | **READ** |

**THE PRICE, AS `P-9` PRICES IT — a `SUPERVISOR'S READING`, not a measured figure.** **The export table moves from
five names to eleven-or-so: the five that stand plus the store verbs given their own entries.** **THE GATE COSTS
THE FINAL ARITHMETIC; this filing prints the terms and takes no count.** **And `F-9.3` is why the denominator is
STATED rather than asked: the two counts measure different things and never disagreed about the same thing —
`surface.md:1645` counts the CROSSING's dispatcher tokens, `facade.rs` carries the arms it carries, and the
disagreement is the spec's stale `8` against the code's `9`.**

**AND ONE THING `P-12` CHANGES ABOUT THIS ITEM'S COST, NAMED SO THE ORDER'S FIRST REASON IS NOT OVERREAD:** **under
the library the eleven entries are `#[napi]`-annotated functions, so the per-entry cost `P-9` would have paid
eleven times over a hand-rolled ABI is paid once at the adoption.** **That is `§2.0.5`'s (i) stated as an effect
on THIS item.**

### 2.2 `P-10` — THE INTEGER INDEX DIES; THE STORES SURVIVE

**MEASURED (`MEASURED`, by the supervisor on the live build, carried as evidence the gate may re-take):** **two
`storeCreate` calls answer two objects that are `!==`; a write at `layout` then a read at `secure` throws
`AddressNotFound`; a handle registered in both fires only its own body.** **Multiple stores already work and are
already isolated, and nothing in this unit removes them.**

**WHAT SURVIVES AND WHAT DIES — THE CORRECTION v1 GOT WRONG (v1's `C-2`, carried from v2).** **`A127` DELETED THE
USER-FACING `instance` POSITION FROM ALL TEN VERBS ON 2026-10-16.** **`bindings/js/index.d.ts:81` declares, in
terms, *"NO DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION"*; the operative namespace arithmetic is
`11 → 1` at `surface.md:879`; `docs/decisions.md:175` records the architect's own correction that dropped the
`instance` position from his example line.** **SO THE INSTANCE POSITION IS NOT LIVE AND THIS FILING DOES NOT
REVIVE IT.** **WHAT DOES CROSS IS A PRIVATE ROUTING SLOT:**

| # | The private slot at its own bytes | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-10.1`** | **`storeCreate` takes the addon's answer as an integer** — `id = addon_.storeCreate(encoded)` | `index.mjs:1981`–`:1983` | **READ** |
| **`F-10.2`** | **The state record is `{id, home, registry, constraints, leg}` — a CLOSURE RECORD, and `id` is its first member** | `index.mjs:2024` | **READ** |
| **`F-10.3`** | **`id` indexes `Vec<crossing::Instance>`**: the push and `all.len() - 1`, answered as `napi_create_uint32` | `facade.rs:1226`–`:1235`; the slot at `:1178` | **READ** |
| **`F-10.4`** | **The index is read back off `argv[0]`** — `napi_get_value_uint32` in `addon_call`, again in `addon_register` | `facade.rs:1264`; `:1502` | **READ** |
| **`F-10.5`** | **It routes and nothing else**: `index.mjs` passes it at every verb and at registration, and no store datum is carried in it | `index.mjs:1896`, `:1922`, `:3156` | **READ** |

**IT IS ROUTING BOOKKEEPING: WHICH VEC SLOT DOES THIS JS OBJECT OWN.** **`crossing::Instance` is `{store, owned}`
(`crossing.rs:926`–`:933`) and `create_with_constraints` (`crossing.rs:956`) constructs a FRESH one per
`storeCreate` — `storeCreate` never returns a second handle onto an existing store.**

### 2.3 `P-11` — THE JS-SIDE WRAPPERS COME OUT

**THE RULING:** ***"3"***, quoting the reading `§1.3` item 3 states. **`index.mjs` HAS TWO ENTRY WRAPPERS, NOT
ONE, AND BOTH ARE DELETED.**

| # | The wrapper and its sites | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-11.1`** | **`call(state, verb, args)` — the generic wrapper, with NINE call sites carrying EIGHT distinct verb strings, `listen` appearing twice.** **THE FIGURE IS CORRECTED AT `§0.2` `C-4` AND IS THIS PASS'S, NOT v2's:** `read` `:2051` · `readLiteral` `:2057` · `delete` `:2166` · `rollback` `:2179` · `listen` `:2254` **and** `:3145` (×2) · `unlisten` `:2301` · `removeListener` `:2555` · `commitFile` `:3244`. **`9` = `8` + `1` repeat ✓** | the definition at `index.mjs:1893`; every site opened individually | **READ** |
| **`F-11.2`** | **`writeCall(state, args, fault)` — a SEPARATE wrapper for `write`, which NEVER goes through `call`**, because it carries the fault record and its own `ValueNotAdmitted` handling. **This is the tenth `addon_.call` site (`:1922`) and the reason a count of `addon_.call` sites is ten while a count of `call(` sites is nine.** | the definition at `index.mjs:1919`; the one site at `:2114` | **READ** |
| **`F-11.3`** | **CORRECTED IN KIND AT `§4.3` — v2's claim that the `ValueNotAdmitted` arm is WHY the second wrapper exists is wrong.** **THE ARM IS PRESERVED AND IS NOT THE REASON.** | `index.mjs:1924`–`:1926` | **READ** |

**EACH MEMBER THEN CALLS ITS OWN EXPORTED VERB DIRECTLY.** **The cost is mechanical and is the gate's to price:
`state.id` moves out of the two generic wrappers and into each call site — which is `P-10`'s receiver work
arriving EARLY, and is why `P-9` and `P-11` are no longer separable (`§3`).** **AND `state.id` HAS A THIRD SITE
OUTSIDE BOTH WRAPPERS, STATED AT `§4.4` SO A ONE-PASS EDIT DOES NOT MISS IT (`index.mjs:3156`).**

---

## §3. THE MEASURED GROUND — why BOTH sides are required, and the corrected scope of that claim

**THIS SECTION IS `SUPERVISOR'S MEASURED EVIDENCE`, taken on the live build. The gate may re-take it; this pass
could not (`§11` item 3).**

1. **A REFUSAL FROM THE PACKAGE CARRIES `status` AND `message` AND A `log`, AND **NO `stack` AT ALL**.** **`facade.rs:11`–`:13` declares the failure form as *"a plain object carrying exactly `{status, message}` and nothing else — never an `Error`, never a `code`, never a `stack`"* (`READ`, this pass).** **AND THE MEASURED FORM IS THREE MEMBERS — `["status","message","log"]` — the third being attached above the facade at the package's own frame** (`package.md:872`–`:880`, `READ`: `index.mjs`'s `fail(refusal, log)` throws `{ status, message, log }`, the two members read off the core's record and `log` attached beside them). **So a refusal carries `["status","message","log"]`, HAS NO `stack`, and IS NOT AN `Error`.**
2. **THE ONLY STACK A CALLER CAN SEE IS ENTIRELY JAVASCRIPT — NOT ONE RUST FRAME APPEARS.** **Measured: `at Module.commit (…/constraint-kernel.mjs:1043:22)`, `at constraintWrite (…/index.mjs:3824:21)`, `at Object.write (…/index.mjs:2110:16)`.** **Every frame is package or kernel JavaScript; the addon is invisible.**
3. **THE MESSAGE ALREADY NAMES THE VERB, BECAUSE `index.mjs` COMPOSES IT.** **The re-render site reads the verb from the wrapper's own argument and writes it into the message** (`index.mjs:1909`–`:1918`'s doc block: the message is *"re-rendered as the composite of item 6"*, reached *"only AFTER the store has chosen which refusal answers"* — `READ`). **So a better Rust export name buys nothing in the message: the composition already happened above it.**

### 3.2 THE CORRECTED CONCLUSION — v2's `§3` was OVERSTATED, and this is the correction

**V2's CONCLUSION, IN ITS OWN WORDS, IS THE CLAIM THIS ITEM REPLACES:** *"THE RUST-SIDE SPLIT ALONE CHANGES
NOTHING A CALLER CAN OBSERVE."* **GATE 1'S VALIDITY PASS FOUND IT OVERSTATED AND THE SUPERVISOR CONFIRMED IT BY
MEASUREMENT.** **IT IS TRUE OF THE STACK AND FALSE OF THE WHOLE OBSERVABLE SET.**

**THREE THINGS A CALLER CAN OBSERVE DO MOVE, EACH NAMED:**
- **`Object.keys(ADDON)`.** **The internal artefact's export table is itself observable, and `FTS-10.2` reads it
  every run** — `scenarios.mjs:831`–`:832` tests `JSON.stringify(Object.keys(ADDON).sort())` against the five
  hard-coded names. **`P-9` moves that set, so a caller that reads the artefact's keys observes the change.**
- **THE AVAILABILITY OF `errorMessage`.** **`FTS-10.3` calls `ADDON.errorMessage(code, 'a')` for every one of
  the sixteen codes** (`scenarios.mjs:839`) — **a name whose presence moves with the export table.**
- **THE LOAD-PATH VERIFICATION.** **`loadAddon` compares `candidate.version()` against `packageVersion()` for
  exact string equality** (`index.mjs:336`–`:343`) — **an artefact-level check whose subject is the artefact's
  own exported names, and `§6.2` states the class it cannot see.**

**AND THE CORRECTED CONCLUSION, STATED SO IT IS NEITHER OVERREAD NOR UNDERREAD:**
- **`P-9` AND `P-11` ARE DEVELOPER-SIDE IMPROVEMENTS — breakpoints, profiling, frame names — AND ARE NOT
  CONSUMER-VISIBLE, BECAUSE THIS PACKAGE'S DECLARED FAILURE FORM CARRIES NO STACK.** **A consumer meeting a
  refusal reads `status`, `message` and `log` and no frames at all; so a Rust export with a better name changes
  nothing the consumer's own code path sees.**
- **THE ARCHITECT'S RULING IS *"for readability in debug"* (`§1.1`), AND THE CLAIM IS SCOPED TO WHAT THAT
  MEANS:** **the improvement is in what a DEVELOPER sees at a breakpoint or in a profile — the frame the
  debugger stops in, and the names those frames carry — and NOT in what a caller observes at an error.**
- **AND THE OBSERVABLE SET THAT DOES MOVE IS THE ARTEFACT'S OWN SURFACE** (`Object.keys(ADDON)`,
  `errorMessage`'s availability, the load-path's version read) — **which is why `P-9` needs the calibration fixes
  `§6` names, and why `§7`'s breaking-change clause is not vacuous.**

**SO BOTH SIDES ARE STILL REQUIRED, AND FOR A STATED REASON RATHER THAN FOR v2's OVERSTATED ONE:** **`P-9` alone
moves the export table and buys no developer-visible frame; `P-11` alone leaves every verb behind one Rust
entry, so a profile still shows one frame.** **The unit needs both to deliver *"readability in debug"*, and
neither delivers a consumer-visible error change — which neither claims.**

---

## §4. THE ANSWERS CARRYING FROM v2 — the closed questions, and three corrections in place

### 4.1 THE THREE DISPOSITIONS OF v1's QUESTIONS — carried unchanged from v2's `§4`

| # | **v1's question** | **The corpus's answer** | **Checked where** |
| --- | --- | --- | --- |
| **`A-1`** | **`Q-1`: what is the denominator of "one export per verb"?** | **THE STORE'S CLOSED `8`-VERB NAMESPACE IS NOT THE EXPORT DENOMINATOR, AND THE DISPATCHER'S NINE IS THE ROUTE'S OWN SET.** **`surface.md:1645` declares eight dispatcher tokens by name, while `facade.rs:1342`–`:1344`'s own comment says `removeListener` *"is NOT a crossing verb of the eight the store's declared namespace carries"* — it is *"the package's own member reaching the store's own new operation"*.** **`commitFile` is likewise *"the terminal arm's own act, and NOT a verb"* (`facade.rs:1350`–`:1355`).** **So the two counts are measuring different things and never disagreed about the same thing.** | `surface.md:1645`; `facade.rs:1342`–`:1344`, `:1350`–`:1355` |
| **`A-2`** | **`Q-2`: what does a DETACHED call do — `const {read} = layout; read(…)`?** | **THE STORES SURVIVE AND THE RECEIVER SUPPLIES THEM (`§1.2`, `"Use reading i"`), SO A DETACHED CALL HAS NO STORE — and the corpus fixes its answer shape without fixing the arm: the store's failure form is ONE (`facade.rs:11`–`:13`), and `AddressNotFound` is a member by construction (`A-3`).** **WHETHER THE PRODUCT BINDS ITS MEMBERS OR THE FACADE REFUSES A DETACHED CALL IS A CODE TASK AND NOT A DESIGN QUESTION** — it is settled by one clause at gate 2 (see `§5.2`). **AND `P-12` IMPROVES THIS QUESTION'S ANSWERABILITY WITHOUT ANSWERING IT: see `§2.0.5`'s (ii).** | `facade.rs:11`–`:13`; `contract.md:3959`–`:3963` |
| **`A-3`** | **`Q-3`: is *"the package holds no instance at that id"* a DECLARED fail-state?** | **IT IS DECLARED, BY CONSTRUCTION AND NOT BY A ROW.** **`facade.rs:1278` HARD-CODES `status: "AddressNotFound"`, with its message at `:1279` (`READ` this pass).** **`AddressNotFound` is rank `2` of the store's closed set, and the set's size is `16`** (`contract.md:3959`–`:3963`; rank at `contract.md:3870`). **A status the facade hard-codes IS a member of the closed set by construction; therefore removing the arm ORPHANS NO MEMBER and moves no membership.** | `facade.rs:1277`–`:1280`; `contract.md:3959`–`:3963`, `:3870` |

### 4.2 `v2`'s `§3` — CORRECTED AT `§3.2` ABOVE

**Stated here so the correction is findable from both sections: `§3.2` carries the measured facts v2's `§3`
carried, plus the corrected conclusion, plus the three observables v2's conclusion omitted.**

### 4.3 v2's `F-11.3` IS WRONG IN KIND — THE CORRECTION

**V2's `F-11.3` READS:** *"THE `ValueNotAdmitted` FAULT ARM IS WHY THE SECOND WRAPPER EXISTS AND IT MUST BE
PRESERVED."* **THE SECOND HALF IS RIGHT AND THE FIRST HALF IS WRONG IN KIND.**

**THE BYTES, READ THIS PASS AT `index.mjs:1919`–`:1929`:**
```
1919: function writeCall(state, args, fault) {
1920:   const addon_ = withAddon();
1921:   try {
1922:     return addon_.call(state.id, 'write', args);
1923:   } catch (refusal) {
1924:     if (fault.found !== null && refusal !== null && typeof refusal === 'object' && refusal.status === 'ValueNotAdmitted') {
1925:       valueReject(fault);
1926:     }
1927:     fail(refusal);
1928:   }
1929: }
```
**`writeCall`'s `ValueNotAdmitted` arm calls `valueReject(fault)` (`:1925`) → which reaches `boundaryReject`, which
THROWS.** **SO THE ARM IS A MESSAGE RE-RENDER AND NOT A FAULT SINK:** it does not swallow a fault, park it, or
give the wrapper a second return path. **It REPLACES the message with the composite `index.mjs:1909`–`:1918`
documents and then re-throws through `fail(refusal)` at `:1927`.**

**AND WHAT FOLLOWS FROM THAT, STATED SO THE CORRECTION IS USEFUL RATHER THAN PEDANTIC: THE ARM FITS INSIDE
`call`'s OWN CATCH ONCE A `fault` ARGUMENT EXISTS.** **`call`'s body is `try { return addon_.call(state.id, verb,
args); } catch (refusal) { fail(notFoundRendering(refusal, listedSegments(args[0]))); }` (`index.mjs:1893`–`:1900`)
— a catch that already re-renders a message and throws. **Give it a fourth position, `fault`, and `writeCall`'s
arm becomes one more arm in that renderer.** **THE ARM MUST BE PRESERVED; IT IS NOT THE REASON THE WRAPPER
EXISTS.**

**SO THE CORRECTED REASON THE SECOND WRAPPER EXISTS IS STATED PLAINLY: `write` CARRIES A FIFTH POSITION THE OTHER
VERBS DO NOT.** **`write`'s call site passes the walk's own fault record** (`index.mjs:2108`'s
`args.push(encodeValue(value, [], 0, [], fault))`, and `:2114`'s `writeCall(state, args, fault)`) — **and that
record has no home in `call`'s three-argument shape.** **The wrapper exists because its VERB has one more thing
to carry, not because its catch has one more arm.**

### 4.4 v2's `state.id` SITE COUNT IS SHORT BY ONE — there is a THIRD site

**V2 SAYS *"`state.id` moves out of the two wrappers and into each call site."* THERE IS A THIRD SITE, OUTSIDE
BOTH WRAPPERS**, and this pass opened it:

**`index.mjs:3156` — `addon_.register(state.id, handleWire(handle));`**, on the REGISTRATION path, inside its own
`try`/`catch` at `:3155`–`:3160` (which calls `fail(refusal)` at `:3159`). **It is not inside `call` and not
inside `writeCall`; it reaches the addon's `register` export directly through `withAddon()`
(`index.mjs:3154`).**

**AND IT IS `P-10`'s REACH, NAMED SO A ONE-PASS EDIT DOES NOT MISS IT.** **The site is the `register` verb's own
`state.id` read — the one place `P-10`'s receiver work must reach that the two wrappers' deletion would not carry
it to.** **A pass that converts the wrappers and their nine call sites and stops has left this site holding the
integer index.** **`F-10.5`'s `index.mjs:3156` citation is the same line, and this clause is where its
consequence is stated.**

### 4.5 v2's CALL-SITE ARITHMETIC — CORRECTED AT `§0.2` `C-4`

**v2's `F-11.1` prints ten sites and eight distinct verbs; the brief to this pass printed ten sites and seven.
The tree holds NINE `call(` sites and EIGHT distinct verb strings, with `writeCall`'s `:1922` the tenth
`addon_.call` site.** **The full arithmetic and every site is at `§0.2` `C-4` and `F-11.1`; it is not repeated
here.**

---

## §5. THE PARKED SUCCESSOR, AND THE ONE ITEM LEFT FOR A LATER PASS

### 5.1 THE STATELESS FACTORY — OFFERED, DECLINED, AND PARKED (carried unchanged from v2's `§5.1`)

**THE ARCHITECT WAS OFFERED A STATELESS-FACTORY READING AND DECLINED IT IN FAVOUR OF READING (i).** **The
declined reading: DELETE `INSTANCES` OUTRIGHT; `storeCreate` returns an OPAQUE HANDLE onto the Rust allocation;
every verb takes the store as its FIRST ARGUMENT.** **He selected *"Use reading i"* (`§1.2`) instead.**

**ITS COST IS NAMED HERE SO A LATER READER DOES NOT RE-DERIVE IT:** **it requires `napi_create_external` and
`napi_ref` with a finalizer, and NONE OF THE THREE APPEARS ANYWHERE IN `facade.rs`** — searched across
`bindings/js/src/**` for `napi_create_external`, `napi_ref`, `napi_add_finalizer` and `napi_wrap`, **which
returned NO MATCH** (v2's search; this pass re-verified the absence by reading the whole `extern "C"` block at
`facade.rs:63`–`:166`, whose 23 declarations include none of them). **It also opens a STORE-LIFETIME question
this codebase has never had to answer: nothing frees a store today; the `Vec` merely never frees one wrongly.**

**THE PARK IS OWED TO `docs/pending.md` AS A SUCCESSOR, AND THAT MOVE IS NOT THIS FILING'S.** **`docs/pending.md`
is written by the SUPERVISOR, not by this role; this filing records that the park is owed there.**
**ITS REVISIT CONDITION IS AN ARCHITECT RULING ON STORE LIFETIME.** **No `P-` label is minted for the parked
reading here, and nothing in this filing depends on it.**

**AND ONE NOTE `P-12` ADDS WITHOUT DISTURBING THE PARK: under the library, `napi_create_external` and `napi_ref`
become `napi-rs` types rather than hand-declared symbols, so the declined reading's MECHANICAL cost falls — while
its DESIGN cost, the store-lifetime question, does not move at all.** **The park's revisit condition is
therefore untouched by the adoption, and the adoption does not revive the reading.**

### 5.2 THE ONE THING THIS FILE DOES NOT DECIDE, AND WHY IT IS NOT A QUESTION TO THE ARCHITECT

**THE DETACHED-CALL DISPOSITION (`A-2`).** **`§1.2`'s *"Use reading i"* settles that the receiver supplies the
store; it does not say what a client sees when it detaches a member.** **This is NOT filed as an open question
because it is not a question the architect alone can answer and it is not answered by any reading of the
messages: it is a DOWNSTREAM SPEC OBLIGATION.** **THE BYTES THAT FIX ITS SHAPE ARE ALREADY IN THE CORPUS
(`facade.rs:11`–`:13`'s one failure form; `contract.md:3870`'s rank-2 member), so the shape is not free — only
the CHOICE between binding the members and refusing the call is, and that choice belongs to gate 2's
`role_spec_writer` authoring the clause.** **Checked before writing this: `docs/specs/storeroom-js/surface.md`'s
`§2.9` and `§2.4` item 9 (f), and `docs/decisions.md`'s `A127`/`A128` rows — the corpus does not choose between
them and does not forbid either.** **STATED AS AN OBLIGATION, NOT AS A QUESTION.**

---

## §6. THE CALIBRATION DEFECTS THIS UNIT MUST FIX — two, both named, both in scope

**Both were found by gate 1's review of the tree and both are consequences of THIS change. Neither is a
footnote. THE TWO CLAUSES ARE CARRIED UNCHANGED FROM v2, INCLUDING v2's OWN RESTRICTION OF THE
*"STAYS FALSELY GREEN"* CLAIM TO THE FIRST LIMB — the restriction is v2's and it was right.**

### 6.1 THE GREENS DO NOT PIN THE EXPORT TABLE, AND ONE CONSTANT IS DEAD

**THE DEFECT HAS TWO LIMBS AND THEY ARE NOT THE SAME LIMB. Stated precisely, because a loose form of this claim
would be false:**

- **(a) A DEAD CONSTANT THAT NAMES THE TABLE AND IS NEVER READ.** `bindings/js/greens/greens.mjs:100` declares
  **`const INTERNAL_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];`** **and the file
  NEVER READS IT** — searched this pass: **the identifier occurs exactly once in the file, at its own
  declaration** (a whole-file search returns one match, `:100`). **The same file's own comment at `:84`–`:86`
  records this practice for a sibling constant: *"THIS CONSTANT HAS NO READER (measured: one occurrence in the
  file)"* — so the pattern is known and this constant was not audited under it.** **`INTERNAL_FIVE` is the only
  thing in `greens.mjs` that names the addon's literal export table.**
- **(b) THE LIVE PIN LIVES IN A DIFFERENT FILE, AND IT IS A STALE EXPECTATION UNDER THIS CHANGE.**
  `bindings/js/greens/file-tier-save/scenarios.mjs:832` asserts `JSON.stringify(Object.keys(ADDON).sort()) ===
  JSON.stringify(['call', 'errorMessage', 'register', 'storeCreate', 'version'])` — **the cell `FTS-10.2`,
  declared at `:828`–`:833` with its subject *"`package.md §1.3` item 4 (the internal addon's export set is
  exactly five names and no sixth)"* (`READ` this pass).** **THIS IS THE ONE LIVE PIN ON THE EXPORT TABLE, IT IS
  HARD-CODED TO FIVE, AND IT SITS IN A DIFFERENT GREENS DIRECTORY FROM THE CONSTANT THAT NAMES THE SAME FIVE.**

**THE CONSEQUENCE, STATED EXACTLY, AND WITH v2's LIMB-RESTRICTION KEPT.** **Under this change the table moves
FIVE → ELEVEN-OR-SO.** **`greens.mjs`'s own run stays 100% green — nothing there reads the table** (limb (a)'s
dead constant is the proof) — **while the real table moves.** **`FTS-10.2` is the only cell that would FAIL, and
it is reachable only when the built `.node` artefact is present:** **`scenarios.mjs:35` requires
`../../build/Release/storeroom_js_binding.node`.** **WHETHER THAT ARTEFACT CURRENTLY EXISTS IS NOT OBSERVABLE FROM
THIS ROLE (`§11` item 4), so the claim that `FTS-10.2` would catch the change is stated CONDITIONALLY, and the
claim that `greens.mjs` "stays falsely green" is made of limb (a) ALONE — because limb (a) has no artefact
dependency at all and its silence is unconditional.**

**THE FIX, IN SCOPE FOR THIS UNIT:** **the greens must PIN the export table in the driver every run, and the dead
`INTERNAL_FIVE` must either become the pin or be deleted.** **A GREEN CLAIMED WITHOUT THAT PIN IS A WAIVER AND
MUST BE DECLARED AS ONE.**

### 6.2 THE LOAD PATH COMPARES A VERSION STRING AND NOTHING ELSE — A REAL REGRESSION CLASS

**`index.mjs:318`–`:381`'s `loadAddon` compares ONLY `candidate.version()`, called as a function, as a STRING
against `packageVersion()`, for exact string equality (`:336`–`:343`, `READ` this pass: `const declared =
packageVersion();` at `:336`, `answered = typeof candidate.version === 'function' ? candidate.version() :
undefined;` at `:339`, and `if (typeof answered !== 'string' || answered !== declared)` at `:343`).** **TEN NEW
EXPORTS CAN SHIP UNDER AN IDENTICAL VERSION STRING**, so **a stale five-name addon LOADS SUCCESSFULLY and fails
only at first call** — and it fails as an `undefined is not a function`-shaped throw rather than as the declared
mismatch arm (`FilePathUnreachable` at `:365`). **This is a real regression class introduced by the change, not a
hypothetical: the freshness gate this package relies on cannot see the change.**

**THE UNIT MUST ADDRESS IT.** **Whether the answer is a new version string, an export-count probe, or a
capability probe is a gate-2 clause and is not decided here.** **`docs/specs/storeroom-publish/contract.md §1.5`
is the corpus home of this read (`PUB-DD-18`/`PUB-DD-19`, cited at `index.mjs:332`–`:335`) and any change to it
reaches that unit.**

**AND `P-12` ADDS ONE FACT TO THIS CLAUSE WITHOUT WEAKENING IT: a GENERATED `.d.ts` narrows the drift that
`§0.2` `C-3` measured, but it does not touch the LOAD PATH, which reads the artefact's runtime export table and
not any declaration file.** **The two defects are independent and both must be fixed.**

---

## §7. THE BREAKING-CHANGE CLAUSE — the published surface moves; NO VERSION NUMBER IS CHOSEN

**All four items move the published package's surface — `P-12` included, because a generated `.d.ts` replaces a
shipped declaration file. What is in scope, each verified at its bytes this pass:**

1. **`bindings/js/index.d.ts`.** **`export function storeCreate(cfg: StoreConfig): StoreInstance;` at `:742`;
   `export interface StoreInstance` at `:506`; `export type StoreStatus` at `:237`; and the receiver clause
   *"NO DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION"* at `:81`, which this unit READS AS SATISFIED
   and must not un-say.** **Any change to the addon's exported names reaches this file first** — and under
   `P-12` this file becomes a build output rather than a tracked hand-authored one, which is the largest single
   change to it.
2. **`bindings/js/package.json`.** **`exports` at `:27`–`:32`, carrying the `types` condition at `:29`; the
   top-level `"types": "index.d.ts"` at `:33`; `files` at `:34`–`:39`.** **In scope because the crossing's change
   can move what must ship** — and under `P-12` the `types` condition's SUBJECT becomes a generated file, so the
   `files` entry that ships it stays and its PROVENANCE moves.
3. **THE VERSION. NO NUMBER IS CHOSEN HERE, AND THAT IS DELIBERATE.** **`package.json:3` reads `"version":
   "0.5.0"` and the five optional platform dependencies print the same at `:41`–`:45` — SIX SPELLINGS.** **The
   class is the release pass's and the architect's, per this project's release discipline (`A128`'s `MINOR`-by-
   fiat precedent at `docs/decisions.md:179` is the instrument any such ruling would use).** **This filing names
   no version and prices no class.**
4. **AND WHAT DOES NOT MOVE, so the claim is not read wider than it is: the store's own closed set stays `16`
   (`contract.md:3959`), the store's own Rust surface (`src/**`) is untouched, the store's closed `8`-verb
   namespace is untouched (`surface.md:1645`), and — `P-12`'s own witness — the BEHAVIOUR of every verb is
   untouched, which the un-moved suite at `§2.0.5` item 1 is the evidence for.** **The unit moves HOW a verb is
   REACHED and HOW its declaration is PRODUCED, not what a verb DOES.**

---

## §8. THE ADOPTION'S COST, PRICED — what `P-12` does NOT buy, so the item is not read as free

**A new leading item owes a price. Four costs, each named and none softened:**

1. **A FOREIGN CRATE'S API SURFACE ENTERS THE CRATE'S OWN BUILD.** **`facade.rs`'s 23 hand-declared symbols and
   45 `unsafe fn` are replaced by a dependency whose own surface the facade must now be written against.** **The
   conformance risk `§4.4` feared does not vanish; it MOVES FROM THIS PROJECT'S UNSAFE CODE INTO A THIRD
   PARTY'S.** **That is a real trade and the architect has made it (`§1.4`), not a trade this filing makes.**
2. **THE BUILD GAINS A REGISTRY FETCH, AND `--offline` STILL GOVERNS THE RUN — so the FETCH and the RUN are two
   separate concerns and the build is no longer fetch-free** (`§2.0.4`). **`bindings/js/Cargo.toml:16`–`:17`'s
   comment currently asserts *"no registry fetch at all"* and is thereby MADE FALSE by the adoption; it is
   reported at `§0.2` `C-1` and must move with the change.**
3. **`Cargo.lock` STAYS UNCOMMITTED (`§4.2` item 2), so the resolved version of `napi` and its transitive
   dependencies are the CONSUMER's, not this project's, above the `3.14` floor** (`§2.0.4`). **The floor is
   therefore the whole of this unit's pin, and a consumer's resolution above it is outside this unit's control.**
4. **A GENERATED `.d.ts` MOVES A TRACKED FILE TO A BUILD OUTPUT, WHICH THE RELEASE AND PUBLISH STORY MUST
   CARRY.** **`docs/specs/storeroom-publish/`'s assembly step and the `files` array's provenance both reach this
   change** (`§7` item 2). **This filing states the reach and does not author the clause: it is gate 2's and the
   publish unit's.**

---

## §9. THE `STEP 0` LINE — two triggers now, and the dossier's rows must carry both

**1. THE TRIGGER FIRES, AND THE DETERMINATION IS TAKEN.** **Gate 1's critique took the determination and this
filing records it as TAKEN: THE TRIGGER FIRES.** **The unit adopts identifiers originating OUTSIDE this
project — `this` as the Node-API receiver (a meaning declared by `napi_get_cb_info` and by no byte of this
project) and EACH NEW EXPORT NAME (the architect's own minted surface).** **BY THE PROJECT'S BINDING RULE, A FIRED
TRIGGER BLOCKS THE DELEGABLE VERDICT WHILE ANY DOSSIER ROW IS OPEN — not merely the spec pass**
(`docs/pending.md:38`: the dossier's existence, one row per adopted identifier with its source citation and
status, a populated collision block where the trigger fires, and **no open row at the point a unit is reported
green**). **THE DOSSIER IS OWED AND IS NOT WRITTEN BY THIS ROLE.**

**2. AND `P-12` IS ITSELF A `STEP 0` EVENT — THIS IS NEW IN v3 AND v2 LACKS IT.** **THE UNIT NOW ADOPTS A
FOREIGN CRATE'S API SURFACE AS WELL AS `this` AND THE EXPORT NAMES.** **`napi` — the crate, and with it the
`napi::Env` / `napi::JsUnknown` / `napi::CallContext` types the facade is rewritten onto (`§2.0.1`), the
`#[napi]` attribute (`§2.0.1`'s sixth row), the `napi-rs` family name `§4.3` item 1 spells, and the
`napi = "3.14"` requirement's own version token — is EXTERNALLY-SOURCED VOCABULARY THIS UNIT ADOPTS.**

**AND THE CORPUS ALREADY FORESAW THIS AND OWED THE ROW, WHICH IS WHY THIS IS A DETERMINATION AND NOT A NEW
QUESTION:** **`docs/specs/storeroom-js-adoption-dossier.md:44` records the rule and its consequence — *"These are
LIBRARY names, and a library becomes a source of a contract element only if the contract NAMES it … If gate 2
instead names one library outright in a clause, that clause's name is a SECOND externally-sourced token … a
second row is lawful and must then be added rather than left silent"* — and `:98` and `:109` repeat it as a
forward duty.** **AND `§4.3` item 1 ALREADY NAMES THE FAMILY** (`package.md:534`, *"of the `napi-rs` FAMILY"*,
read WITH `:542`–`:545`'s rule that *"3. THE NAME `napi-rs` IS NOT WRITTEN AS A CONTRACT TERM"*).** **SO THE ROW
IS OWED ON TWO GROUNDS AT ONCE: the adoption is the architect's act (`§1.4`), and the contract already writes the
family's name at `§4.3` item 1 even as `§4.3` item 3 disclaims doing so.**

**3. SO THE DOSSIER MUST CARRY ROWS FOR IT, AND THIS FILING NAMES THEM RATHER THAN LEAVING THEM TO DISCOVERY.**
**THE ROWS `P-12` OWES, EACH WITH ITS SOURCE:**
- **THE CRATE `napi`**, with its version floor `3.14` and the registry as its source (`§2.0.4`).
- **THE FAMILY NAME `napi-rs`**, sourced to `package.md §4.3` item 1.
- **`napi::Env`**, **`napi::JsUnknown`**, **`napi::CallContext`** — the three types `§2.0.1` replaces the four
  C aliases with.
- **`#[napi]`** — the attribute `package.md §4.5` item 1 already forbids inside `crossing.rs` by name
  (`:576`–`:577`) and `§2.0.1`'s sixth row makes the facade's own instrument.

**AND THE `≤ 8` FIGURE IS A BUDGET AND NOT A CAP** (`docs/pending.md:36`–`:38`, the architect's own ruling that it
*"is a suggestion"*), **so an eleven-name export set plus `P-12`'s rows is many rows and no pass may route one to
an overflow list on count grounds.** **NO ROW IS WRITTEN HERE; each is OWED.**

**4. THE LAYER CLAUSE.** **EVERY OBSERVABLE NAMED IN THIS FILE IS `ENVELOPE/PURE` (`RCA-12`): the export table,
the receiver, the wire's argument positions, the two JS wrappers, the state record, the falsified-or-not suite
figure and the generated `.d.ts` are all ENVELOPE artefacts of the crossing, measured in-process.** **NO
`APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE FOR THIS UNIT.**

---

## §10. THE GATE CHAIN, THE FORM QUESTION, AND THE RE-OPEN

**1. THE GATE CHAIN, RESTATED AS `docs/specs/storeroom-listeners-proposal.md:11`–`:14` STATES IT.** **GATE 1 —
RE-OPENED, NOT PASSED.** **Step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` →
step 4 `role_change_analysis` (with the STEP-0 block folded in).** **The architect's go-ahead is required before
any later gate.** **The chain runs on this file and on nothing else.**

**2. THE FORM QUESTION — the gate's, and this filing leans only where a fact compels it.** **Whether this work is
a NEW UNIT with its own contract directory, a BOUNDED AMENDMENT of `docs/specs/storeroom-js/`, or IN PIECES is
the gate's determination.** **This filing proposes the id `U-STOREROOM-ADDON-SURFACE` and asserts nothing about
it.** **Two facts argue against pieces: `§3.2`'s corrected ground shows `P-9` alone buys no developer-visible
frame, so `P-9` and `P-11` are not separable; and `P-12` must land FIRST (`§2.0.5`), so it cannot be a piece
taken later.**

**3. AND ONE THING THE ARCHITECT'S THIRD RULING CHANGES ABOUT THIS SECTION: *"then proceed with the recommended
order into the gates"* (`§1.4`) is the go-ahead for the ORDER, and it is not a go-ahead for a later gate.**
**The gate chain above is unmoved; what is now fixed is that `P-12` is the item the chain's first gate reviews
FIRST, because the architect put it first.**

---

## §11. PROVENANCE — what this pass read, what it did not, and what it could not verify

**1. READ AT ITS OWN BYTES THIS PASS — every `file:line` this filing cites, opened at its own lines:**

`bindings/js/src/facade.rs` — `:1`–`:20` (the module doc, the failure form of `:11`–`:13`) · `:20`–`:59` ·
`:35`–`:43` (the imports) · `:50`–`:169` (**the whole `extern "C"` block: `:58`–`:61`'s four aliases, the 23
declarations `:64`–`:150`, the deletion comments `:151`–`:165**, and `:166`'s close) · `:168`–`:197` ·
`:212`–`:1463` region boundaries of the 45 `unsafe fn` · `:1178` · `:1196`–`:1238` (`addon_create`) ·
`:1248`–`:1373` (`addon_call` in full: the parse, the `this` declaration at `:1251`, the `AddressNotFound` arm at
`:1276`–`:1281`, and **all nine verb arms** `:1283`, `:1289`, `:1295`, `:1308`, `:1317`, `:1328`, `:1334`,
`:1345`, `:1356`, with the fall-through `:1369`–`:1372`) · `:1385` · `:1406`–`:1469` · `:1486`–`:1534`
(`addon_register`, its `this` at `:1489`) · `:1563`, `:1590`–`:1655` (`addon_version`, `addon_error_message`) ·
`:1657`–`:1676` (the `export` helper) · `:1684`–`:1692` (`#[no_mangle]`, `napi_register_module_v1` and the five
`export(…)` calls at `:1686`–`:1690`). **Counted rather than estimated: `23` ABI symbols, `45` `unsafe fn`, `50`
`unsafe {`, `5` exports, `5` entry functions.** **Searched `bindings/js/**` for `napi_register_module_v1` — ONE
match, `:1685`.**

`bindings/js/src/crossing.rs` — **searched the whole file for `unsafe` and `napi`: ONE match, `:4`, the purity
declaration. ZERO `unsafe`.** `:926`–`:933` (`Instance {store, owned}`) · `:956` (`create_with_constraints`).

`bindings/js/Cargo.toml` — **read in full (24 lines)**: `:2` `name = "storeroom-js-binding"` · `:3` `version =
"0.1.0"` · `:4` `edition = "2021"` · `:6` `license = "AGPL-3.0-or-later"` · `:16`–`:17` **the dependency comment
this filing reports** · `:21` `crate-type = ["cdylib", "rlib"]` · `:24` `storeroom-native = { path = "../.." }`
**and NO other dependency.**

`Cargo.toml` (root) — **read in full (17 lines)**: `:2` `name = "storeroom-native"` · `:12` **the
`# No dependencies:` comment this filing reads at `C-1`** · `:13`–`:14` the empty `[dependencies]` table.

`bindings/js/index.mjs` — `:310`–`:379` (`loadAddon` and its version-string-only comparison at `:336`–`:343`) ·
`:1975`–`:1990` · `:1885`–`:1929` (**`call` and `writeCall` in full, including the `ValueNotAdmitted` arm at
`:1924`–`:1926` and its doc block `:1909`–`:1918`**) · `:2045`–`:2054` · `:2105`–`:2122` · `:3138`–`:3167`
(**including the third `state.id` site at `:3156`**). **Every one of the nine `call(` sites and the one
`writeCall` site was opened individually.**

`bindings/js/index.d.ts` — `:16`, `:30`–`:34`, `:38`, `:52`, `:72`, `:81`, `:132`, `:237`, `:477`, `:491`–`:497`,
`:506`, `:596`, `:610`–`:616`, `:631`, `:667`, `:742`.

`bindings/js/package.json` — `:3` (`"version": "0.5.0"`), `:27`–`:39` (`exports`, the `types` condition, the
`types` field, `files`), `:41`–`:45` (the five optional platform dependencies).

`bindings/js/greens/greens.mjs` — `:100` (the dead constant). **Searched the whole file for `INTERNAL_FIVE` — ONE
match, the declaration.**

`bindings/js/greens/file-tier-save/scenarios.mjs` — `:35` (the built-artefact requirement) · `:825`–`:846`
(**`FTS-10.1`–`FTS-10.3` at their own bytes, including `FTS-10.2` at `:828`–`:833` with its `Object.keys(ADDON)`
comparison at `:831`–`:832`, and `FTS-10.3`'s `ADDON.errorMessage` call at `:839`**).

`docs/specs/storeroom-js/package.md` — `:482`–`:490` (**`§4.2` items 1–4 in full**) · `:492`–`:530` (**the
2026-10-11 amendment, `:496`–`:500`'s measured purpose and `:503`–`:505`'s declared commands**) · `:532`–`:546`
(**`§4.3` items 1–3 in full**) · `:547`–`:560` (**`§4.4` and its refused `V3`**) · `:562`–`:579` (**`§4.5` item 1,
the module boundary and its purity**) · `:1`–`:567` and `:562`–`:1249` read as spans. **The file's whole
`AMENDED`/`RECONCILED` set enumerated: `:183`, `:211`, `:317`, `:345`, `:464`, `:492`, `:596`, `:621`, `:789`,
`:922`, `:975` — NONE touches `§4.3`.**

`docs/specs/storeroom-js/contract.md` — `:578` (**`DD-2` in full**).

`docs/specs/storeroom-js/surface.md` — `:1645` (**the eight-token dispatcher declaration**) · `:879` ·
`:1112`.

`docs/specs/storeroom-native/contract.md` — `:3870` (rank `2`) · `:3959`–`:3963` (the `16` and its algebra).

`docs/decisions.md` — **searched the whole file for `napi-rs`, `napi-sys`, `DD-2`, `V3`, `hand-written`, `No
dependencies`, `dependency-free`, `zero third-party` — NO MATCH on any.** `:175`, `:179` cited from v2 and
carried · `:151`, `:173`–`:183` located.

`docs/pending.md` — `:56`–`:65` (**`§`'s `STEP 0` binding rule at `:61` and the `≤ 8`-is-a-budget ruling at
`:59`–`:61`**) · `:764`, `:820` (**`P-8`'s subject and its LANDED state**). **Searched the whole file for `P-9`,
`P-10`, `P-11` — NO MATCH, so the three labels are free and are minted by v2 and carried here.** **Searched the
whole of `docs/` for `P-12` — NO MATCH, so `P-12` is free and is minted here.**

`docs/specs/storeroom-js-adoption-dossier.md` — `:44`, `:98`, `:109` (the binding-library re-trigger rule and
its forward duty).

`docs/specs/storeroom-listeners-proposal.md` — `:6`–`:27` (the gate chain this filing restates).

`docs/specs/storeroom-addon-surface-proposal.md` — **read in full (364 lines): the v1 predecessor, cited, not
edited.**

`docs/specs/storeroom-addon-surface-proposal-v2.md` — **read in full (401 lines): the base, cited, not edited.**

**2. NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** `src/**` at any byte (the store's own
crate is litigated nowhere here); `tests/**`; `bindings/js/test/**`; `docs/specs/storeroom-constraints/**` beyond
the paths other documents quoted; and **every byte under `../Provident-Electron/**`, which is `"poisoned"`
context by this project's own ruling and is never a source.**

**3. NOTHING WAS RUN BY THIS PASS, AND THE MEASURED CLAIMS ARE NOT ITS OWN.** **This role's tool wall is read,
search and documentation write; no shell, no `cargo`, no `node`, no `npm`, no build, no boot, no debugger.** **SO
`§3`'s three measured facts — the stack-less three-member refusal, the JavaScript-only stack, and the message's
verb composition — are THE SUPERVISOR'S MEASUREMENTS, carried with his marking, NOT THIS PASS'S.** **Equally,
`§2.2`'s two-store isolation drive, `§2.0.4`'s `napi`-resolves-at-`3.14.2` fact, and `§2.0.5` item 1's suite
figures (`npm test` 580/0, typecheck 0 on both legs, build exit 0, greens 174/0, `cargo test` 395) are the
supervisor's.** **The code-level corroboration printed beside each IS this pass's, at the lines `§11` item 1
lists.** **THE GATE MAY RE-TAKE ANY OF THEM.**

**4. WHAT COULD NOT BE VERIFIED AT ALL, NAMED SO IT IS NOT MISTAKEN FOR VERIFIED:** **whether the built `.node`
artefact at `bindings/js/build/Release/storeroom_js_binding.node` currently EXISTS, and therefore whether
`FTS-10.2` is currently executed at all. The path is required at `scenarios.mjs:35` and the cell is recorded
`PASS`, but a recorded PASS is a prior run's state, not this pass's measurement** (`§6.1`). **Equally
unverifiable from this role: whether the registry currently resolves `napi` at `3.14.2` (`§2.0.4` — the
supervisor's `MEASURED` figure, carried as such), and whether the five `§2.0.5` suite figures hold at this tree
(the supervisor's, carried as such).** **THIS PASS'S COUNTS — the `23`, the `45`, the `50`, the `5`, the `9`
`call(` sites, the `8` distinct strings, the `5` entry functions, the `11` `AMENDED`/`RECONCILED` clause sites —
ARE ALL OF THE FORM *open the file and count*, AND NONE OF THEM IS A MEASUREMENT OF A RUNNING THING.**

**5. THE ONE FILE THIS PASS WROTE.** **`docs/specs/storeroom-addon-surface-proposal-v3.md` and nothing else.**
**`docs/specs/storeroom-addon-surface-proposal.md` STANDS UNTOUCHED at 364 lines;
`docs/specs/storeroom-addon-surface-proposal-v2.md` STANDS UNTOUCHED at 401 lines; `docs/pending.md`,
`docs/next-steps.md`, `docs/defects.md`, `docs/decisions.md`, every unit directory, `bindings/**` and `src/**`
were NOT written.** **The park owed to `docs/pending.md` (`§5.1`), the dossier owed at `§9` including `P-12`'s
rows, and the `bindings/js/Cargo.toml:16`–`:17` comment's correction (`§0.2` `C-1`) are the SUPERVISOR'S and
gate 2's moves and are recorded here as owed, not performed.**

---

**END OF THE PROPOSAL (v3).** **`§0` names the two predecessors, v1's rejection and v2's `VALID-WITH-FINDINGS`,
then states the one NEW item (`§0.1`) and the FOUR corrections (`§0.2`) with `C-4` this pass's own count
correction, and what v3 carries unchanged (`§0.3`).** **`§1` is the architect's words byte-for-byte, including
`§1.4`'s three rulings on the building path and what each selects.** **`§2` is the four items, every row classed,
`P-12` leading with its five verified replacement rows, its five entry functions, `crossing.rs` unverified-
untouched, the version decision NOT re-opened, and the order stated as the architect's instruction with its two
reasons marked as the supervisor's reading.** **`§3` is the measured ground and `§3.2` the CORRECTED conclusion,
which is a developer-side improvement and not a consumer-visible one.** **`§4` carries v2's three dispositions and
corrects `F-11.3`'s kind, adds the third `state.id` site, and points the call-site arithmetic at `§0.2`
`C-4`.** **`§5` parks the declined successor and states the one downstream obligation.** **`§6` names the two
calibration defects, carried unchanged including their limb-restriction.** **`§7` is the breaking-change clause,
with no version chosen.** **`§8` prices the adoption's four costs.** **`§9` is the `STEP 0` line, now carrying TWO
triggers and `P-12`'s owed rows.** **`§10` is the gate chain and the form question.** **`§11` is the provenance.
No behaviour clause, no signature, no return shape, no fail-state and no ruling is asserted anywhere in this file
that is not quoted from the architect or carried from v2.**
