# PROPOSAL (v2, CORRECTED) — the addon's exported surface (`U-STOREROOM-ADDON-SURFACE`)

**Role of this file.** The artifact-under-review for the proposal-review gate (gate 1) of unit
`U-STOREROOM-ADDON-SURFACE`. **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no
return shape and no fail-state; it licenses no code task; it admits no unit row; it edits no byte of any other
file. **Its `§1` is the architect's own words, byte-for-byte.**

**Unit id / prefix (proposed; the gate determines the form — see `§8` item 2).** **`U-STOREROOM-ADDON-SURFACE`** ·
spec path (if a unit) `docs/specs/storeroom-addon-surface/`.

**Gate state at filing.** **GATE 1 — RE-OPENED ON THIS FILE, NOT PASSED.** The chain is restated at `§8` item 1.

---

## §0. THIS FILE SUPERSEDES A REJECTED FILING — read this before anything else

**THE PREDECESSOR IS `docs/specs/storeroom-addon-surface-proposal.md` (364 lines, "v1"). GATE 1 RETURNED
`INVALID` ON IT.** **That file stands UNTOUCHED at its own path and its head is not rewritten; this file is its
replacement at a NEW path, and `v2` is not an edit of `v1` but a second filing.** **A reader must be able to see
what moved without diffing the two files, so the four falsified claims are stated here, each with the correction
and with where the correction lives in this file.**

| # | **v1's falsified claim** | **The correction, verified at the bytes** | **Where in v2** |
| --- | --- | --- | --- |
| **`C-1`** | *"`napi_register_module_v1` exports exactly SIX names"* (`v1`'s `F-9.1`, `v1:61`) | **THE EXPORT COUNT IS FIVE, NOT SIX.** `facade.rs:1686`–`:1690` is **five** `export(…)` calls — `version` · `errorMessage` · `storeCreate` · `call` · `register`. **v1 counted six LINES, the sixth being the closing `exports` expression at `:1691`, which exports nothing.** `docs/specs/storeroom-js/surface.md:1647` **already prints `5` and was CORRECT; v1 called it a contradiction against the code, and v1 was wrong about the code, not the spec.** | `§2.1` `F-9.1` |
| **`C-2`** | *"`state.id` is the instance position crossing the wire"* — v1 presented the index as a LIVE user-facing position (`v1:99`–`:111`) | **THE USER-FACING `instance` POSITION WAS ALREADY DELETED IN 2026-10-16 BY `A127`**, which removed it from all ten verbs (`docs/decisions.md:175`; `docs/specs/storeroom-js/surface.md:879`, *"`storeCreate` ALONE, `11 → 1` ✓"*). `bindings/js/index.d.ts:81` declares *"NO DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION"*. **What survives is a PRIVATE VEC SLOT, not a declared position.** | `§2.2` `F-10.1`–`F-10.5` |
| **`C-3`** | *"three counts disagree"* — v1 put a THREE-WAY contradiction to the gate (`v1:63`, `v1:210`) | **IT IS TWO COUNTS DISAGREEING, AND ONE OF THEM IS THE SPEC.** The dispatcher maintains **NINE** arms, not eight: `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · **`removeListener`** · **`commitFile`** (`facade.rs:1283`–`:1368`). `surface.md:1645` declares eight tokens **explicitly excluding `removeListener`**. **So the spec's stale `8` versus the code's `9` — that is the whole disagreement.** | `§2.1` `F-9.2`, `F-9.3` |
| **`C-4`** | **v1 filed `Q-1` and `Q-3` as OPEN QUESTIONS** (`v1:210`, `v1:212`) | **BOTH ARE ANSWERABLE FROM THE CORPUS AND NEITHER IS RE-FILED AS OPEN.** `Q-1`: the denominator is settled by `surface.md:1645` read with `facade.rs:1342`–`:1344`. `Q-3`: the *"the package holds no instance at that id"* arm hard-codes `AddressNotFound` (`facade.rs:1278`), a member of the store's closed set **by construction**; the set's true size is **16** (`docs/specs/storeroom-native/contract.md:3959`–`:3963`), and `AddressNotFound` is **rank 2** (`contract.md:3870`). **A hard-coded member of a closed set is not an undeclared status.** | `§4` `A-1`, `A-3` |

**AND ONE THING v1 GOT RIGHT AND THIS FILE KEEPS: its honesty about provenance.** **v1 marked which claims were
measured, which were read, and which were its author's reading (`v1:57`–`:64`, `v1:345`–`:350`). That habit is
kept and is the organising rule of `§2`: every row carries its class, and `§9` states what this pass did not do.**

**AND v1's LARGEST OMISSION, NAMED HERE BECAUSE IT IS NOW THE UNIT'S CENTRE: v1 SCOPED ONLY THE RUST SIDE.**
**It never carried the JS-side wrapper at all, and it therefore never reached the reason the work is needed —
the measured fact that the Rust-side split alone changes nothing a caller can observe (`§3`). `P-11` is new in
this file, and `§3` is the ground for it.**

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
3. **`"3"` — UNWRAP BOTH SIDES.** **This is the item v1 never carried and it is now the unit's centre. Its
   content is `§3`, and without it the unit is a refactor that no caller can observe.**

---

## §2. THE THREE ITEMS AS SCOPED — what is MEASURED, what is READ, what is the supervisor's reading

**Every row carries its class, and the classes are not interchangeable:**
**`MEASURED`** — taken by the supervisor on the live build, carried here as evidence the gate may re-take;
**`READ`** — opened at its own bytes by this pass (every one is listed at `§9`);
**`SUPERVISOR'S READING`** — an inference from the two above that the gate must test.

### 2.1 `P-9` — THE FADED DISPATCH: ONE EXPORT PER VERB (Rust side)

**THE RULING (verbatim at `§1.1` and re-confirmed at `§1.2`):** ***"For readability in debug don't route
everything through call, create separate exports"*** → ***"Yes, still split the exports"***.

| # | The fact | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-9.1`** | **THE ADDON'S EXPORT TABLE IS FIVE NAMES — `version` · `errorMessage` · `storeCreate` · `call` · `register` — and `:1691`'s `exports` is the function's RETURN, not a sixth export.** | `facade.rs:1686`–`:1690`; the return at `:1691`. **`surface.md:1647` independently prints `5`, confirmed.** | **READ** |
| **`F-9.2`** | **THE DISPATCHER `addon_call` PARSES `(index, verb, args)` AND MATCHES THE VERB STRING ACROSS NINE ARMS**: `read` `:1283` · `readLiteral` `:1289` · `write` `:1295` · `delete` `:1308` · `rollback` `:1317` · `listen` `:1328` · `unlisten` `:1334` · `removeListener` `:1345` · `commitFile` `:1356`; the fall-through `AddressMalformed` arm at `:1369`–`:1372`. **The parse is at `:1249`–`:1267`.** | `facade.rs:1248`–`:1373` | **READ** |
| **`F-9.3`** | **THE SPEC'S `8` IS STALE AND ITS EXCLUSION IS EXPLICIT**: `surface.md:1645` names `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `commitFile` = `8` ✓ *"AND THEY ARE THESE EIGHT AND NO NINTH"* — **`removeListener` is the ninth arm and `commitFile` is inside the spec's eight. So the spec's eight is a different set, not a smaller one.** | `surface.md:1645` read with `facade.rs:1345`–`:1349` | **READ** |
| **`F-9.4`** | **BOTH NON-MODULE MEMBERS REACH THE STORE THROUGH `addon_call`**: `removeListener` from `index.mjs:2555` → the `:1345` arm; `commitFile` from `index.mjs:3244` → the `:1356` arm. | `index.mjs:2555`, `:3244`; `facade.rs:1345`–`:1349`, `:1356` | **READ** |

**THE PRICE, AS `P-9` PRICES IT — a SUPERVISOR'S READING, not a measured figure.** **The export table moves from
five names to eleven-or-so: the five that stand plus the store verbs given their own entries.** **`F-9.3` is why
the denominator is now STATED rather than asked: the store's own namespace is CLOSED at eight and the
dispatcher's nine is eight-plus-a-package-member, so the exported surface is the dispatcher's set as the code
spells it, nine, plus the non-verb exports.** **THE GATE COSTS THE FINAL ARITHMETIC; this filing prints the
terms and takes no count.**

### 2.2 `P-10` — THE INTEGER INDEX DIES; THE STORES SURVIVE

**MEASURED (`MEASURED`, by the supervisor on the live build, carried as evidence the gate may re-take):** **two
`storeCreate` calls answer two objects that are `!==`; a write at `layout` then a read at `secure` throws
`AddressNotFound`; a handle registered in both fires only its own body.** **Multiple stores already work and are
already isolated, and nothing in this unit removes them.**

**WHAT SURVIVES AND WHAT DIES — THE CORRECTION v1 GOT WRONG (`C-2`).** **`A127` DELETED THE USER-FACING
`instance` POSITION FROM ALL TEN VERBS ON 2026-10-16.** **`bindings/js/index.d.ts:81` declares, in terms, *"NO
DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION"*; the operative namespace arithmetic is `11 → 1` at
`surface.md:879`; `docs/decisions.md:175` records the architect's own correction that dropped the `instance`
position from his example line.** **SO THE INSTANCE POSITION IS NOT LIVE AND THIS FILING DOES NOT REVIVE IT.**
**WHAT DOES CROSS IS A PRIVATE ROUTING SLOT:**

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

### 2.3 `P-11` — THE JS-SIDE WRAPPERS COME OUT (the new item)

**THE RULING:** ***"3"***, quoting the reading `§1.3` item 3 states. **`index.mjs` HAS TWO ENTRY WRAPPERS, NOT
ONE, AND BOTH ARE DELETED.**

| # | The wrapper and its sites | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-11.1`** | **`call(state, verb, args)` — the generic wrapper, with TEN call sites carrying EIGHT distinct verb strings**: `read` `:2051` · `readLiteral` `:2057` · `delete` `:2166` · `rollback` `:2179` · `listen` `:2254` **and** `:3145` (×2) · `unlisten` `:2301` · `removeListener` `:2555` · `commitFile` `:3244` | the definition at `index.mjs:1893`; every site opened | **READ** |
| **`F-11.2`** | **`writeCall(state, args, fault)` — a SEPARATE wrapper for `write`, which NEVER goes through `call`**, because it carries the fault record and its own `ValueNotAdmitted` handling | the definition at `index.mjs:1919`; the one site at `:2114` | **READ** |
| **`F-11.3`** | **THE `ValueNotAdmitted` FAULT ARM IS WHY THE SECOND WRAPPER EXISTS AND IT MUST BE PRESERVED** — `fault.found !== null && refusal.status === 'ValueNotAdmitted'` → `valueReject(fault)` | `index.mjs:1924`–`:1926` | **READ** |

**EACH MEMBER THEN CALLS ITS OWN EXPORTED VERB DIRECTLY.** **The cost is mechanical and is the gate's to price:
`state.id` moves out of the two generic wrappers and into each call site — which is `P-10`'s receiver work
arriving EARLY, and is why `P-9` and `P-11` are no longer separable (`§3`).**

---

## §3. THE MEASURED GROUND — why BOTH sides are required, which is why `P-11` exists

**THIS SECTION IS `SUPERVISOR'S MEASURED EVIDENCE`, taken on the live build. It is the unit's motivating fact and
it is marked `MEASURED`.** **The gate may re-take it; this pass could not (see `§9` item 3).**

1. **A REFUSAL FROM THE PACKAGE CARRIES `status` AND `message` AND NO `stack` AT ALL.** **`facade.rs:11`–`:13`
   declares the form as *"a plain object carrying exactly `{status, message}` and nothing else — never an
   `Error`, never a `code`, never a `stack`"* (`READ`, this pass).** **So the ordinary debug path shows a caller a
   status string and NO FRAMES WHATSOEVER.**
2. **THE ONLY STACK A CALLER CAN SEE IS ENTIRELY JAVASCRIPT — NOT ONE RUST FRAME APPEARS.** **Measured: `at
   Module.commit (…/constraint-kernel.mjs:1043:22)`, `at constraintWrite (…/index.mjs:3824:21)`, `at
   Object.write (…/index.mjs:2110:16)`.** **Every frame is package or kernel JavaScript; the addon is invisible.**
3. **THEREFORE THE RUST-SIDE SPLIT ALONE CHANGES NOTHING A CALLER CAN OBSERVE.** **A separate Rust export with a
   better name is still behind the same JS wrapper, so the debugger still shows `Object.write →
   constraintWrite → Module.commit` and still shows no verb.** **BOTH SIDES ARE REQUIRED. This is why `P-11`
   exists, and it is why `P-9` and `P-10` are no longer separable: the `state.id` position has to move out of the
   generic wrapper at the same time the wrapper goes.**

**THE HONEST FORM OF THE CLAIM, STATED SO IT IS NOT OVERREAD: the deliverable is a CALLER-VISIBLE improvement in
what a debugger shows.** **If only `P-9` lands, the unit ships a refactor with no observable effect and cannot
honestly be reported green against its own architect's stated purpose — *"for readability in debug"*.**

---

## §4. THE ANSWERS `v1` FILED AS QUESTIONS — closed here from the corpus

**`v1` put three open questions to the gate. Gate 1 rejected `v1` partly for filing questions the corpus
answers.** **Each is disposed of below with the bytes that answer it; what genuinely remains is at `§5`.**

| # | **`v1`'s question** | **The corpus's answer** | **Checked where** |
| --- | --- | --- | --- |
| **`A-1`** | **`Q-1`: what is the denominator of "one export per verb"?** | **THE STORE'S CLOSED `8`-VERB NAMESPACE IS NOT THE EXPORT DENOMINATOR, AND THE DISPATCHER'S NINE IS THE ROUTE'S OWN SET.** **`surface.md:1645` declares eight dispatcher tokens and EXCLUDES `removeListener` BY NAME, while `facade.rs:1342`–`:1344`'s own comment says `removeListener` *"is NOT a crossing verb of the eight the store's declared namespace carries"* — it is *"the package's own member reaching the store's own new operation"*.** **`commitFile` is likewise *"the terminal arm's own act, and NOT a verb"* (`facade.rs:1350`–`:1355`).** **So the exported surface is the addon's route set, and the store's eight-verb closure is NOT the denominator — the two counts are measuring different things and never disagreed about the same thing.** | `surface.md:1645`; `facade.rs:1342`–`:1344`, `:1350`–`:1355` |
| **`A-2`** | **`Q-2`: what does a DETACHED call do — `const {read} = layout; read(…)`?** | **THE STORES SURVIVE AND THE RECEIVER SUPPLIES THEM (`§1.2`, `"Use reading i"`), SO A DETACHED CALL HAS NO STORE — and the corpus fixes its answer shape without fixing the arm: the store's failure form is ONE (`facade.rs:11`–`:13`), and `AddressNotFound` is a member by construction (`A-3`).** **WHETHER THE PRODUCT BINDS ITS MEMBERS OR THE FACADE REFUSES A DETACHED CALL IS A CODE TASK AND NOT A DESIGN QUESTION** — it is settled by one clause at gate 2 (see `§5` item 1). | `facade.rs:11`–`:13`; `contract.md:3959`–`:3963` |
| **`A-3`** | **`Q-3`: is *"the package holds no instance at that id"* a DECLARED fail-state?** | **IT IS DECLARED, BY CONSTRUCTION AND NOT BY A ROW.** **`facade.rs:1278` HARD-CODES `status: "AddressNotFound"`.** **`AddressNotFound` is rank `2` of the store's closed set, and the set's size is `16` — `11 + 2 + 1 + 1 + 1 = 16` ✓** (`contract.md:3959`–`:3963`; rank at `contract.md:3870`). **A status the facade hard-codes IS a member of the closed set by construction; therefore removing the arm ORPHANS NO MEMBER and moves no membership.** **`AddressNotFound`'s reach is ordinary and large — the walk mints it at `contract.md:1603` (`L-3`) and `:1602` (`L-INT-REG`).** **The `16` reading supersedes the `15` printed earlier at `contract.md:3924`/`:3959` by that file's own dated clause.** | `facade.rs:1278`; `contract.md:3959`–`:3963`, `:3870`, `:1602`, `:1603` |

**SO NO QUESTION ABOUT THE SET'S SIZE OR THE STATUS'S MEMBERSHIP IS OPEN, AND THIS FILING FILES NONE.** **The
membership question `v1` escalated was answered by the corpus before `v1` was written.**

---

## §5. THE PARKED SUCCESSOR, AND THE ONE ITEM LEFT FOR A LATER PASS

### 5.1 THE STATELESS FACTORY — OFFERED, DECLINED, AND PARKED

**THE ARCHITECT WAS OFFERED A STATELESS-FACTORY READING AND DECLINED IT IN FAVOUR OF READING (i).** **The
declined reading: DELETE `INSTANCES` OUTRIGHT; `storeCreate` returns an OPAQUE HANDLE onto the Rust allocation;
every verb takes the store as its FIRST ARGUMENT.** **He selected *"Use reading i"* (`§1.2`) instead.**

**ITS COST IS NAMED HERE SO A LATER READER DOES NOT RE-DERIVE IT:** **it requires `napi_create_external` and
`napi_ref` with a finalizer, and NONE OF THE THREE APPEARS ANYWHERE IN `facade.rs`** — searched this pass for
`napi_create_external`, `napi_ref`, `napi_add_finalizer` and `napi_wrap` across `bindings/js/src/**`, **which
returned NO MATCH.** **It also opens a STORE-LIFETIME question this codebase has never had to answer: nothing
frees a store today; the `Vec` merely never frees one wrongly.**

**THE PARK IS OWED TO `docs/pending.md` AS A SUCCESSOR, AND THAT MOVE IS NOT THIS FILING'S.** **`docs/pending.md`
is written by the SUPERVISOR, not by this role; this filing records that the park is owed there.**
**ITS REVISIT CONDITION IS AN ARCHITECT RULING ON STORE LIFETIME.** **No `P-` label is minted for the parked
reading here, and nothing in this filing depends on it.**

### 5.2 THE ONE THING THIS FILE DOES NOT DECIDE, AND WHY IT IS NOT A QUESTION TO THE ARCHITECT

**THE DETACHED-CALL DISPOSITION (`A-2`).** **`§1.2`'s *"Use reading i"* settles that the receiver supplies the
store; it does not say what a client sees when it detaches a member.** **This is NOT filed as an open question
because it is not a question the architect alone can answer and it is not answered by any reading of the two
messages: it is a DOWNSTREAM SPEC OBLIGATION.** **THE BYTES THAT FIX ITS SHAPE ARE ALREADY IN THE CORPUS
(`facade.rs:11`–`:13`'s one failure form; `contract.md:3870`'s rank-2 member), so the shape is not free — only
the CHOICE between binding the members and refusing the call is, and that choice belongs to gate 2's
`role_spec_writer` authoring the clause.** **Checked before writing this: `docs/specs/storeroom-js/surface.md`'s
`§2.9` and `§2.4` item 9 (f), and `docs/decisions.md`'s `A127`/`A128` rows — the corpus does not choose between
them and does not forbid either.** **STATED AS AN OBLIGATION, NOT AS A QUESTION.**

---

## §6. THE CALIBRATION DEFECTS THIS UNIT MUST FIX — two, both named, both in scope

**Both were found by gate 1's review of the tree and both are consequences of THIS change. Neither is a footnote.**

### 6.1 THE GREENS DO NOT PIN THE EXPORT TABLE, AND ONE CONSTANT IS DEAD

**THE DEFECT HAS TWO LIMBS AND THEY ARE NOT THE SAME LIMB. Stated precisely, because `v1` carried neither and a
loose form of this claim would be false:**

- **(a) A DEAD CONSTANT THAT NAMES THE TABLE AND IS NEVER READ.** `bindings/js/greens/greens.mjs:100` declares
  **`const INTERNAL_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];`** **and the file
  NEVER READS IT** — searched: **the identifier occurs exactly once in the file, at its own declaration.** **The
  same file's own comment at `:84`–`:86` records this practice for a sibling constant: *"THIS CONSTANT HAS NO
  READER (measured: one occurrence in the file)"* — so the pattern is known and this constant was not audited
  under it.** **`INTERNAL_FIVE` is the only thing in `greens.mjs` that names the addon's literal export table.**
- **(b) THE LIVE PIN LIVES IN A DIFFERENT FILE, AND IT IS A STALE EXPECTATION UNDER THIS CHANGE.**
  `bindings/js/greens/file-tier-save/scenarios.mjs:832` asserts `JSON.stringify(Object.keys(ADDON).sort()) ===
  JSON.stringify(['call', 'errorMessage', 'register', 'storeCreate', 'version'])` — **the cell `FTS-10.2`,
  recorded `PASS` at `bindings/js/greens/file-tier-save/file-tier-save-greens.md:116`.** **THIS IS THE ONE LIVE
  PIN ON THE EXPORT TABLE, IT IS HARD-CODED TO FIVE, AND IT SITS IN A DIFFERENT GREENS DIRECTORY FROM THE
  CONSTANT THAT NAMES THE SAME FIVE.**

**THE CONSEQUENCE, STATED EXACTLY.** **Under this change the table moves FIVE → ELEVEN-OR-SO.** **`greens.mjs`'s
own run stays 100% green — nothing there reads the table — while the real table moves.** **`FTS-10.2` is the only
cell that would FAIL, and it is reachable only when the built `.node` artefact is present (`scenarios.mjs:35`
requires `../../build/Release/storeroom_js_binding.node`; the `FTS-10` layer statement at
`file-tier-save-greens.md:224` records addon use for `FTS-10.2`/`.3`/`.4` only).**

**THE FIX, IN SCOPE FOR THIS UNIT:** **the greens must PIN the export table in the driver every run, and the dead
`INTERNAL_FIVE` must either become the pin or be deleted.** **A GREEN CLAIMED WITHOUT THAT PIN IS A WAIVER AND
MUST BE DECLARED AS ONE.**

### 6.2 THE LOAD PATH COMPARES A VERSION STRING AND NOTHING ELSE — A REAL REGRESSION CLASS

**`index.mjs:318`–`:381`'s `loadAddon` compares ONLY `candidate.version()`, called as a function, as a STRING
against `packageVersion()`, for exact string equality (`:336`–`:343`).** **TEN NEW EXPORTS CAN SHIP UNDER AN
IDENTICAL VERSION STRING**, so **a stale five-name addon LOADS SUCCESSFULLY and fails only at first call** — and
it fails as an `undefined is not a function`-shaped throw rather than as the declared mismatch arm
(`FilePathUnreachable` at `:365`). **This is a real regression class introduced by the change, not a
hypothetical: the freshness gate this package relies on cannot see the change.**

**THE UNIT MUST ADDRESS IT.** **Whether the answer is a new version string, an export-count probe, or a
capability probe is a gate-2 clause and is not decided here.** **`docs/specs/storeroom-publish/contract.md §1.5`
is the corpus home of this read (`PUB-DD-18`/`PUB-DD-19`, cited at `index.mjs:332`–`:335`) and any change to it
reaches that unit.**

---

## §7. THE BREAKING-CHANGE CLAUSE — the published surface moves; NO VERSION NUMBER IS CHOSEN

**All three items move the published package's surface. What is in scope, each verified at its bytes this pass:**

1. **`bindings/js/index.d.ts`.** **`export function storeCreate(cfg: StoreConfig): StoreInstance;` at `:742`;
   `export interface StoreInstance` at `:506`; `export type StoreStatus` at `:237`; and the receiver clause
   *"NO DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION"* at `:81`, which this unit READS AS SATISFIED
   and must not un-say.** **Any change to the addon's exported names reaches this file first.**
2. **`bindings/js/package.json`.** **`exports` at `:27`–`:32`, carrying the `types` condition at `:29`; the
   top-level `"types": "index.d.ts"` at `:33`; `files` at `:34`–`:39` (four entries: `index.mjs`, `README.md`,
   `index.d.ts`, `src/constraint-kernel.mjs`).** **In scope because the crossing's change can move what must
   ship.**
3. **THE VERSION. NO NUMBER IS CHOSEN HERE, AND THAT IS DELIBERATE.** **`package.json:3` reads `"version":
   "0.5.0"` and the five optional platform dependencies print the same at `:41`–`:45` — SIX SPELLINGS.** **The
   class is the release pass's and the architect's, per this project's release discipline (`A128`'s `MINOR`-by-
   fiat precedent at `docs/decisions.md:179` is the instrument any such ruling would use).** **This filing names
   no version and prices no class.**
4. **AND WHAT DOES NOT MOVE, so the claim is not read wider than it is: the store's own closed set stays `16`
   (`contract.md:3959`), the store's own Rust surface (`src/**`) is untouched, and the store's closed `8`-verb
   namespace is untouched (`surface.md:1647`). The unit moves HOW a verb is REACHED, not what a verb DOES.**

---

## §8. THE GATE CHAIN, THE `STEP 0` LINE, AND THE LAYER

**1. THE GATE CHAIN, RESTATED AS `docs/specs/storeroom-listeners-proposal.md:11`–`:14` STATES IT.**
**GATE 1 — RE-OPENED, NOT PASSED.** **Step 1 `role_validity` ∥ step 2 `role_critique` → step 3
`role_architecture_review` → step 4 `role_change_analysis` (with the STEP-0 block folded in).** **The architect's
go-ahead is required before any later gate.** **The chain runs on this file and on nothing else.**

**2. THE FORM QUESTION — the gate's, and this filing leans only where a fact compels it.** **Whether this work is
a NEW UNIT with its own contract directory, a BOUNDED AMENDMENT of `docs/specs/storeroom-js/`, or IN PIECES is
the gate's determination.** **This filing proposes the id `U-STOREROOM-ADDON-SURFACE` and asserts nothing about
it.** **`§3` is the one fact that argues against pieces: the measured ground shows `P-9` alone is unobservable,
so `P-9` and `P-11` are not separable.**

**3. THE `STEP 0` LINE — THE DETERMINATION IS TAKEN, AND THE DOSSIER IS OWED.** **Gate 1's critique took the
determination and this filing records it as TAKEN: THE TRIGGER FIRES.** **The unit adopts identifiers originating
OUTSIDE this project — `this` as the Node-API receiver (a meaning declared by `napi_get_cb_info` and by no byte
of this project) and EACH NEW EXPORT NAME (the architect's own minted surface).** **BY THE PROJECT'S BINDING
RULE, A FIRED TRIGGER BLOCKS THE DELEGABLE VERDICT WHILE ANY DOSSIER ROW IS OPEN — not merely the spec pass**
(`docs/pending.md:61`: the dossier's existence, one row per adopted identifier with its source citation and
status, a populated collision block where the trigger fires, and **no open row at the point a unit is reported
green**). **THE DOSSIER IS OWED AND IS NOT WRITTEN BY THIS ROLE.** **The `≤ 8` figure is a BUDGET and not a cap
(`docs/pending.md:59`–`:61`, the architect's own ruling that it *"is a suggestion"*), so an eleven-name export
set is eleven rows and **no pass may route a name to an overflow list on count grounds.**

**4. THE LAYER CLAUSE.** **EVERY OBSERVABLE NAMED IN THIS FILE IS `ENVELOPE/PURE` (`RCA-12`): the export table,
the receiver, the wire's argument positions, the two JS wrappers and the state record are all ENVELOPE artefacts
of the crossing, measured in-process.** **NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE FOR THIS UNIT.**

---

## §9. PROVENANCE — what this pass read, what it did not, and what it could not verify

**1. READ AT ITS OWN BYTES THIS PASS — every `file:line` this filing cites, opened at its own lines:**

`bindings/js/src/facade.rs` — `:1`–`:30` (the failure form of `:11`–`:13`) · `:1166`–`:1187` (`INSTANCES` and
its `Send` ground) · `:1196`–`:1238` (`addon_create`, the push, `napi_create_uint32`) · `:1248`–`:1373`
(`addon_call` in full: the parse, the `this` declaration, the `AddressNotFound` arm at `:1276`–`:1281`, and all
nine verb arms) · `:1345`–`:1349`, `:1350`–`:1368` · `:1381`–`:1404` · `:1406`–`:1469` · `:1480`–`:1534`
(`addon_register`, its `this`, its twin refusal at `:1515`–`:1522`) · `:1660`–`:1692` (`export` helper and the
five-`export` registration symbol). **Searched for `napi_create_external`/`napi_ref`/`napi_add_finalizer`/
`napi_wrap` across `bindings/js/src/**` — NO MATCH.**

`bindings/js/src/crossing.rs` — `:922`–`:941` (`Instance {store, owned}`) · `:952`–`:965`
(`create_with_constraints`).

`bindings/js/index.mjs` — `:316`–`:381` (`loadAddon` and its version-string-only comparison) · `:1885`–`:1929`
(`call` and `writeCall`, including the `ValueNotAdmitted` arm) · `:1950`–`:1987` (`storeCreate`'s `id`) ·
`:2016`–`:2031` (the state record) · `:2044`–`:2059` · `:2100`–`:2129` · `:3138`–`:3155` · `:3236`–`:3255`.
**Every one of the ten `call` sites and the one `writeCall` site was opened individually.**

`bindings/js/index.d.ts` — `:70`–`:99` (the `A127` receiver clause at `:81`); `:237`, `:506`, `:742` located.

`bindings/js/package.json` — read in full (50 lines).

`bindings/js/greens/greens.mjs` — `:68`–`:99` (the declared sets and the dead-constant note at `:84`–`:86`) ·
`:100` (the constant) · `:1168`–`:1181` (the cells that do NOT read it). **Searched the whole of
`bindings/js/greens/**` for `INTERNAL_FIVE` — one hit, the declaration.**

`bindings/js/greens/file-tier-save/scenarios.mjs` — `:818`–`:839` (the `FTS-10` block and the live pin at
`:832`) and `:35` (the built-artefact requirement).

`bindings/js/greens/file-tier-save/file-tier-save-greens.md` — `:116`, `:224`.

`docs/specs/storeroom-js/surface.md` — `:1630`–`:1659` (`:1645`, `:1647`) and `:879` (`11 → 1`).
`docs/specs/storeroom-native/contract.md` — `:3950`–`:3989` (`:3959`–`:3963`, the `16` and its algebra) and
`:3870` (rank `2`); `:1602`–`:1603` (`L-INT-REG`, `L-3`).
`docs/decisions.md` — `:151`, `:173`–`:183` (`A127`, `A128`, `A129`).
`docs/defects.md` — `:228`, `:526`–`:528`.
`docs/pending.md` — `:52`–`:69` (`:59`–`:61`, the `STEP 0` binding rule). **Searched the whole file for `P-9`,
`P-10`, `P-11` — NO MATCH, so the three labels are free and are minted here.**
`docs/specs/storeroom-listeners-proposal.md` — `:6`–`:27` (the gate chain this filing restates).
`docs/specs/storeroom-addon-surface-proposal.md` — read in full (364 lines): the predecessor, cited, not edited.

**2. NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** `src/**` at any byte (the store's own
crate is litigated nowhere here); `tests/**`; `bindings/js/test/**`; `docs/specs/storeroom-constraints/**` beyond
the paths other documents quoted; and **every byte under `../Provident-Electron/**`, which is `"poisoned"`
context by this project's own ruling and is never a source.**

**3. NOTHING WAS RUN BY THIS PASS, AND THE MEASURED CLAIMS ARE NOT ITS OWN.** **This role's tool wall is read,
search and documentation write; no shell, no `cargo`, no `node`, no `npm`, no build, no boot, no debugger.** **SO
`§3`'s three measured facts — the stack-less refusal, the JavaScript-only stack, and therefore that `P-9` alone
is unobservable — are THE SUPERVISOR'S MEASUREMENTS, carried with his marking, NOT THIS PASS'S.** **Equally,
`§2.2`'s two-store isolation drive is the supervisor's.** **The code-level corroboration printed beside each IS
this pass's, at the lines `§9` item 1 lists.** **THE GATE MAY RE-TAKE ANY OF THEM.**

**4. WHAT COULD NOT BE VERIFIED AT ALL, NAMED SO IT IS NOT MISTAKEN FOR VERIFIED:** **whether the built `.node`
artefact at `bindings/js/build/Release/storeroom_js_binding.node` currently EXISTS, and therefore whether
`FTS-10.2` is currently executed at all, is not observable from this role** — the path is required at
`scenarios.mjs:35` and the cell is recorded `PASS`, but **a recorded PASS is a prior run's state, not this
pass's measurement.** **`§6.1`'s consequence is stated for both the present and the absent case for that
reason.**

**5. THE ONE FILE THIS PASS WROTE.** **`docs/specs/storeroom-addon-surface-proposal-v2.md` and nothing else.**
**`docs/specs/storeroom-addon-surface-proposal.md` STANDS UNTOUCHED at 364 lines; `docs/pending.md`,
`docs/next-steps.md`, `docs/defects.md`, `docs/decisions.md`, every unit directory, `bindings/**` and `src/**`
were NOT written.** **The park owed to `docs/pending.md` (`§5.1`) and the dossier owed at `§8` item 3 are the
SUPERVISOR'S moves and are recorded here as owed, not performed.**

---

**END OF THE PROPOSAL (v2).** **`§0` names the predecessor, its rejection, and the four falsified claims with
their corrections. `§1` is the architect's words byte-for-byte, including the three later exchanges and what each
selected. `§2` is the three items, every row classed. `§3` is the measured ground that makes both sides
required. `§4` closes the questions `v1` filed and the corpus already answered. `§5` parks the declined
successor and states the one downstream obligation. `§6` names the two calibration defects the unit must fix.
`§7` is the breaking-change clause, with no version chosen. `§8` is the gate chain, the `STEP 0` determination as
TAKEN, and the layer. `§9` is the provenance. No behaviour clause, no signature, no return shape, no fail-state
and no ruling is asserted anywhere in this file.**
