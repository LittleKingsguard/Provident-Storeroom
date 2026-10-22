# PROPOSAL — the addon's exported surface (`U-STOREROOM-ADDON-SURFACE`)

**Role of this file.** The artifact-under-review for a new unit's proposal-review gate (gate 1).
**Filed by the supervisor.** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no
return shape and no fail-state; it licenses no code task; it admits no unit row; it edits no byte of the
adjacent project. **Its `§1` is the architect's own words, byte-for-byte.**

**Unit id / prefix (proposed; the gate determines the form — see `§7` item 2).** **`U-STOREROOM-ADDON-SURFACE`** ·
spec path (if a unit) `docs/specs/storeroom-addon-surface/`.

**Gate state at filing.** **GATE 1 — OPENED, NOT PASSED.** The chain runs on **this file and on nothing else**:
step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4
`role_change_analysis` (with the STEP-0 block folded in). **The architect's go-ahead is required before any
later gate.**

**Label state at filing.** These are the **next free labels** after the landed set: `P-5`…`P-8` have landed
(`P-8`'s landing is recorded at `docs/pending.md`, *"⟶ `P-8` LANDED — 2026-10-18"*), and **no `P-9` and no
`P-10` exist anywhere in `docs/pending.md`** — verified by search this pass, which returns no match. **The
labels are therefore free and are minted here; the landing move into `docs/pending.md` is not this filing's
and is owed by the pass that takes the gate's verdict.**

---

## §1. THE ARCHITECT'S PROPOSAL, VERBATIM

> For readability in debug don't route everything through call, create separate exports

> Creating multiple instances within the same store is no longer supported behavior, the client is instead expected to create different stores. Instance identity is thus redundant.

> A

> Check if a second store create is still possible or if it has been removed by the instance deprecation

> That is to say, a separate store creation within the same rust space. The client should be able to make two store objects, ex
> const layoutConfig  = storeCreate(cfg)
> const secure = storeCreate(secCfg)
>
> But the stores for layoutConfig and Secure config should live in different memory spaces

> Accept recommended

---

## §2. THE TWO ITEMS, AS SCOPED — what is MEASURED FACT and what is the supervisor's reading

**Both items are stated as the architect's RULINGS.** **The filing separates them from the supervisor's
reading, because the two are not the same class of statement and the gate must be able to cost each
separately.** **The separation is marked row by row below and is marked again wherever it matters in the
prose.**

### 2.1 `P-9` — THE FADED DISPATCH: ONE EXPORT PER VERB

**THE RULING (the architect's, verbatim at `§1`):** ***"For readability in debug don't route everything through
call, create separate exports"*** — **give each crossing verb its own exported entry, so the debug surface
names the verb.**

**THE MEASURED FACTS IT RULES ON — each opened at its own bytes this pass:**

| # | The fact | Where it was read | Class |
| --- | --- | --- | --- |
| **`F-9.1`** | **`napi_register_module_v1` exports exactly SIX names: `version` · `errorMessage` · `storeCreate` · `call` · `register`** — the whole of the addon's external surface | `bindings/js/src/facade.rs:1685` and its five `export(…)` calls at `:1686`–`:1690` | **MEASURED FACT** |
| **`F-9.2`** | **The store's verbs are a STRING MATCH inside the single `addon_call` entry**: the arm set is `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` · `commitFile`, with a fall-through arm answering `AddressMalformed` | `bindings/js/src/facade.rs:1248` (`extern "C" fn addon_call`), its arms at `:1283`–`:1368`, the fall-through at `:1369`–`:1372` | **MEASURED FACT** |
| **`F-9.3`** | **The unit's own contract already names the dispatcher set as EIGHT tokens** — `"read"` · `"readLiteral"` · `"write"` · `"delete"` · `"rollback"` · `"listen"` · `"unlisten"` · `"commitFile"` = `8` ✓ — **and names the addon's export set as `5`**, in the same clause, as **THREE DISTINCT CENSUSES** (`8` module verbs, `5` addon exports, `8` dispatcher tokens) | `docs/specs/storeroom-js/surface.md:1645` and `:1647` (the clause is numbered item `8` and is dated 2026-10-15) | **MEASURED FACT — and it is a CONTRADICTION the gate must confront, not this filing: the spec says `5` exports where the code spells `6`, and it says `8` dispatcher tokens where the arms spell `9`** |
| **`F-9.4`** | **Nothing appears in a debugger's stack but `addon_call`; the verb never becomes a frame.** **NOT RE-MEASURED BY THIS FILING** — this role runs no shell and launched no debugger. **It is recorded as the architect's and the supervisor's measurement, and the gate may re-take it** | the ruling's own ground (`§1`, the first clause); no byte was read for it | **MEASURED, BY ANOTHER PASS — carried here as a claim the gate should re-take, not as a measurement of this filing's** |

**THE PRICE, AS THE SUPERVISOR PRICES IT (a reading, not a fact).** **The export table goes from six names to
eleven** — the five that stand (`version` · `errorMessage` · `storeCreate` · `call` · `register`) plus **six
store verbs given their own entries** (`read` · `readLiteral` · `write` · `delete` · `rollback` · `commitFile`)
**if `call` is kept as the route for the four listener verbs** (`listen` · `unlisten` · `removeListener` and any
successor). **The wire payload per verb is otherwise unchanged; the dispatch string disappears from the path a
debugger shows.** **THE ARITHMETIC IS THE GATE'S TO CLOSE AND IT IS NOT CLOSED HERE, BECAUSE THE VERB SET IS
ITSELF TWO SETS AND THE SPEC AND THE CODE DISAGREE ABOUT BOTH:** the store's declared namespace is CLOSED at
`8` verbs (`docs/specs/storeroom-js/surface.md:1647`, *"the STORE's own namespace stays CLOSED at `8` verbs"*),
the dispatcher table is declared at `8` tokens (`:1645`), and the arms at `facade.rs:1283`–`:1368` spell
**nine** — the ninth being `removeListener`, which `facade.rs:1342`–`:1344`'s own comment says is **"NOT a
crossing verb of the eight the store's declared namespace carries"**. **So "one export per verb" has no fixed
denominator until the gate says which of the three counts governs.** **This is `§4`'s first open question.**

### 2.2 `P-10` — THE INSTANCE INDEX DIES; THE STORES DO NOT

**THE ARCHITECT'S RULING AND THE MEASURED CORRECTION STAND TOGETHER, BECAUSE THE CORRECTION IS THE POINT.**

**MEASURED FACT — MULTIPLE STORES ALREADY WORK AND ARE ALREADY ISOLATED.** **The supervisor drove it on the live
build, with the architect's own example.** **Measured: two `storeCreate` calls answer two objects that are
`!==`; `layout.write(['layout'],…)` then `secure.read(['layout'])` throws `AddressNotFound`; the same handle
string registered in both fires only its own body.** **The code agrees at its bytes:** `INSTANCES:
RefCell<Vec<crossing::Instance>>` (`facade.rs:1178`) holds a **separate `Store` per `storeCreate`**, because
`crossing::create_with_constraints` (`crossing.rs:956`) constructs a fresh `crossing::Instance` — `Instance {
store, owned }`, `store` being the core's own store (`crossing.rs:926`–`:933`) — and `facade.rs:1226`–`:1230`
pushes it and answers its index. **`storeCreate` NEVER returns a second handle onto an existing store.**

**SO NOTHING DEPRECATED MULTIPLE STORES, AND `P-10` MUST NOT BE READ AS REMOVING THEM.** **The architect's own
second message says exactly the same thing in his own words — *"the client is instead expected to create
different stores"*, with the `layoutConfig`/`secure` example — and the correction is not a rebuttal of the
ruling but the ruling's own clarification, asked for and given: *"Check if a second store create is still
possible or if it has been removed by the instance deprecation"* → the answer is that it is still possible,
was never removed, and is the SUPPORTED path.**

**WHAT IS REDUNDANT IS THE INTEGER INDEX.** **`state.id` on the JS side, `argv[0]` on every `call` and
`register`:**

| # | The index at its own bytes | Where it was read |
| --- | --- | --- |
| **`F-10.1`** | **The JS object holds the integer**: `storeCreate` assigns `id = addon_.storeCreate(encoded)` and closes it into the instance's state — `const state = { id, home: [], registry: new Map(), … }` | `bindings/js/index.mjs:1983`; `:2024` |
| **`F-10.2`** | **Every verb call carries it as `argv[0]`**: `addon_.call(state.id, verb, args)` and the write's own `addon_.call(state.id, 'write', args)` | `bindings/js/index.mjs:1896`; `:1922` |
| **`F-10.3`** | **The registration carries it too**: `addon_.register(state.id, handleWire(handle))` | `bindings/js/index.mjs:3156` |
| **`F-10.4`** | **The addon allocates and answers it**: the push and `all.len() - 1`, then `napi_create_uint32(env, index as u32, &mut out)` | `bindings/js/src/facade.rs:1226`–`:1235` |
| **`F-10.5`** | **The addon reads it back off `argv[0]`**: `napi_get_value_uint32(env, argv[0], &mut index)` in `addon_call`, and again in `addon_register` | `bindings/js/src/facade.rs:1264`; `:1502` |

**IT IS ROUTING BOOKKEEPING: WHICH VEC SLOT DOES THIS JS OBJECT OWN.** **Nothing else reads it. It names no
store datum, carries no store state, and crosses no value the store produces.**

**THE OPERATIVE READING, WHICH THE ARCHITECT ACCEPTED — STATED AS SUCH, BECAUSE HIS `A` AND HIS *"Accept
recommended"* ARE WHAT ACCEPTED IT:** **ONE STORE PER JS OBJECT, N OBJECTS PER PROCESS, NO INDEX ON THE WIRE.
THE INDEX DIES; THE STORE DOES NOT.** **Each exported verb resolves its store from the Node-API `this`
receiver**, which `napi_get_cb_info(…, &mut this, …)` **already receives at every entry and currently
discards** — verified at each of the three entries this pass: `addon_create` at `facade.rs:1196`–`:1209`,
`addon_call` at `facade.rs:1248`–`:1261`, `addon_register` at `facade.rs:1486`–`:1499`, **each declaring
`let mut this: NapiValue = std::ptr::null_mut();`, passing `&mut this` into the call, and then never reading
the local again.**

**AND ONE COST THE SUPERVISOR HAS PRICED IS PUT ON THE RECORD AS AN OPEN QUESTION THE GATE MUST ANSWER, AND
NOT AS A DECIDED FACT.** **Under receiver-based resolution a DETACHED CALL — `const { read } = layout;
read(...)` — HAS NO STORE.** **Today it works, because `index.mjs` closes over `state` and `call(state, verb,
args)` reads `state.id` from the closure (`index.mjs:1893`–`:1900`), so the receiver is irrelevant to the
present design.** **Whether the facade REFUSES a detached call or `index.mjs` BINDS its members (every member
being a function property whose `this` the product already owns) IS UNDECIDED BY THE ARCHITECT.** **Both
options are named; neither is taken.** **This is `§4`'s second open question.**

### 2.3 THE THREE ORDERED EXCHANGES THAT ACCEPTED THE SUPERVISOR'S READING

**`A` — the architect's single letter, quoted at `§1` in its own block — selected the SUPERVISOR'S FIRST
OPTION.** **The option put to him first was the receiver-based reading of `P-10` (one store per JS object, no
index on the wire); his `A` answers it.** **AND `Accept recommended` — quoted at `§1` — CONFIRMED THE
SUPERVISOR'S READING OF `P-10` AS A WHOLE, the reading being the one printed in `§2.2`: the stores stay, the
index goes, and the detached-call disposition is left for the gate.** **Neither message moves a fact; both
move whose reading is operative, and that is what this filing records them as.**

---

## §3. THE `P-10` CONSEQUENCE SET — named so the gate costs it

**Each consequence is stated with what it costs and what it does not decide. None of them is a behaviour
clause; none of them may be read as one.**

1. **`state.id` DIES ON THE JS SIDE, AND ITS THREE USE SITES DIE WITH IT** — `index.mjs:1896` (`call`),
   `:1922` (`writeCall`), `:3156` (`register`). **THE COST IS NOT THE THREE LINES: it is that the state record
   `{ id, home, registry, constraints, leg }` (`index.mjs:2024`) loses its first member, so a later reader
   asking *"which store does this JS object own"* gets no answer from the package at all — the answer moves to
   the receiver, where only the addon can see it.**
2. **`napi_create_uint32` ANSWERS `undefined` AT `storeCreate`** (`facade.rs:1231`–`:1235`). **The construction's
   RETURN TYPE moves from `uint32` to `undefined`, though the constructor's SERVICE does not move: it still
   builds the store, still pushes it, and still fails on a refused `cfg` with the store's own code
   (`facade.rs:1224`, `throw_refusal`).** **THE COST THE GATE MUST PRICE: `facade.rs`'s own doc comment calls
   `addon_create` *"The addon's `create(cfgWire) -> uint32`"* (`:1195`) — and that sentence is a declared
   signature in prose, so it is a finding, not a typo, wherever the corpus reads it.**
3. **THE `AddressNotFound` ARM AT `facade.rs:1276`–`:1281` DISAPPEARS** — the arm that answers *"the package
   holds no instance at that id"*, reached when `all.get_mut(index)` answers `None`. **The same class of arm
   stands at `facade.rs:1515`–`:1522` in `addon_register`, answering through
   `crossing::registration_refusal(…, "an instance id the package holds no instance at")`.**
   **AND THIS IS THE CLAUSE'S SHARPEST POINT — SAY PLAINLY WHETHER THAT STATUS IS THEN UNREACHABLE, BECAUSE
   THE STORE'S CLOSED STATUS SET IS A NAMED MEMBERSHIP AND THIS CHANGE WOULD ORPHAN ONE OF ITS MEMBERS IF IT
   IS:**
   - **`AddressNotFound` IS A MEMBER OF THE STORE'S CLOSED SET.** **The store's closed set stands at `16`
     members ranked `1`…`16`** (`docs/specs/storeroom-native/contract.md:3959`, the operative count, its
     algebra `11 + 2 + 1 + 1 + 1 = 16` ✓ at `:3960`–`:3963`); **its arity is printed at `:3980`; and
     `AddressNotFound` is spelled in the set's JS mirror, `bindings/js/index.d.ts:239`.** **The supervisor's
     brief said `15`; the bytes say `16`, and the operative clause is the one that governs — the `15` readings
     at `contract.md:3924`/`:3959`/`:4024` are superseded by name and stand byte-for-byte above their marks.**
   - **IS THE STATUS THEN UNREACHABLE? THE HONEST ANSWER IS "NOT BY THIS ARM ALONE, AND THAT IS WHY IT IS AN
     OPEN QUESTION AND NOT A FINDING."** **`AddressNotFound` has a LARGE and independent reach as an ORDINARY
     STORE ANSWER** — a read of an address that stands nowhere, whose generated sentence the package's own
     bytes discuss at `bindings/js/index.mjs:1837`–`:1844` (*"an ORDINARY, IN-DOMAIN TIER AND AN ORDINARY
     MISSING KEY"*) — **so deleting the facade's instance-index arm orphans the STATUS only if that status were
     reachable from nowhere else, and it is reachable from the store's walk.** **WHAT WOULD BE ORPHANED IS A
     ROW AND NOT A MEMBER: the *"no instance at that id"* arm has no declared home in the shipped corpus —
     searched, and `"the package holds no instance"` appears exactly twice, at `facade.rs:1279` and
     `facade.rs:1520`, and in NO `docs/specs/**` byte.** **SO THE GATE'S QUESTION IS PRECISE AND THIS FILING
     PUTS IT: is a status the addon mints for its own routing bookkeeping a DECLARED fail-state, or an
     undeclared one? If it is declared, its loss is a contract change; if it is undeclared, its loss is a
     dead-branch deletion and `AddressNotFound` keeps its membership untouched.** **The third open question,
     and the one the gate must answer in one line either way.**
4. **`INSTANCES: RefCell<Vec<…>>` LOSES ITS INDEX-BASED PROTOCOL BUT NOT NECESSARILY ITS EXISTENCE.** **The vec
   would either go, or be replaced by a container keyed by something the receiver can yield — and "something
   the receiver can yield" is a MECHANICAL question (a wrapper object on the JS side, a weak reference, a
   symbol-keyed own property, a handle the client never sees) that the ARCHITECT HAS NOT NAMED.** **This filing
   does not choose one; it records that the choice is a consequence the gate must cost, because the vec's
   `RefCell` was chosen precisely because *"a `Store` is not required to be `Send`"* (`facade.rs:1172`–`:1176`)
   and a receiver-keyed container inherits that constraint unchanged.**
5. **THE WIRE LOSES ONE POSITION FROM `call` AND FROM `register`, AND THE ARITY MOVES.** **`addon_call`
   declares `let mut argc: usize = 3;` over `argv: [NapiValue; 3]` (`facade.rs:1249`–`:1250`);
   `addon_register` declares `argc = 2` over `[NapiValue; 2]` (`facade.rs:1487`–`:1488`).** **Under the ruling
   both lose position 0, so `call` reads `verb` at `args[0]` and `register` reads the handle at `args[0]` —
   which is a change to EVERY arm's index expressions at once, `:1284`–`:1367` and `:1505`.** **THE COST IS THE
   LARGEST OF THE SET AND IS MECHANICAL: every `args.first()`/`args.get(n)` in that match block shifts by one,
   and a silent off-by-one in a crossing is exactly the class the unit's own register and red set exist to
   catch.** **NO CLAUSE IS AUTHORED HERE; the gate costs it.**
6. **THE PUBLISHED PACKAGE'S OWN DECLARATIONS MOVE WITH IT** — see `§5`, the breaking-change clause.

---

## §4. THE OPEN QUESTIONS THIS FILING CARRIES — named, both options printed, none taken

**A filing takes no ruling.** **Where the two items need a decision the architect has not made, the question is
printed with its options and left standing.** **Three are carried; the first two were open when this filing
began and the third was created by the supervisor's own analysis — all three are the gate's.**

| # | The open question | Option (a) | Option (b) | What it blocks |
| --- | --- | --- | --- | --- |
| **`Q-1`** | **WHAT IS THE DENOMINATOR OF "ONE EXPORT PER VERB"?** **Three counts stand and they disagree: the store's declared namespace is CLOSED at `8` verbs** (`docs/specs/storeroom-js/surface.md:1647`); **the crossing's dispatcher table is declared at `8` tokens** (`:1645`); **the arms at `facade.rs:1283`–`:1368` spell `9`**, the ninth being `removeListener`, which the file's own comment (`facade.rs:1342`–`:1344`) calls *"NOT a crossing verb of the eight the store's declared namespace carries"* | **THE STORE'S `8`** — `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `commitFile`; `removeListener` reaches the store through a non-verb member and keeps whatever route it has | **THE DISPATCHER'S OWN SET AS THE CODE SPELLS IT, `9`** — admitting `removeListener` as a verb of the exported surface, which requires the store's `8`-verb closure to be re-read (`surface.md:1647`) or the ninth to be declared as a package member crossing under its own name | **the export table's final size (`6 → 11` versus `6 → 12`), and therefore `§5`'s breaking-change arithmetic** |
| **`Q-2`** | **WHAT DOES A DETACHED CALL DO?** — `const { read } = layout; read(['a'], 'mem')` | **THE FACADE REFUSES IT**: no receiver, no store, and the refusal travels as the store's one declared failure form — with the question of WHICH member of the closed set it answers left to the gate | **`index.mjs` BINDS ITS MEMBERS**, so every member is a function whose `this` the product owns and detachment cannot occur from a lawful client | **whether the change is a BEHAVIOUR change (a new refusal arm) or a purely mechanical one; and whether any red-set drive may construct a detached call at all** |
| **`Q-3`** | **IS *"THE PACKAGE HOLDS NO INSTANCE AT THAT ID"* A DECLARED FAIL-STATE?** — the arm dies at `facade.rs:1276`–`:1281` and its twin at `:1515`–`:1522`; the sentence appears in NO `docs/specs/**` byte | **DECLARED** — then the arm's removal is a CONTRACT change to the failure surface, and the status's closure and the *"no instance at that id"* row must be reconciled by a bounded amendment | **UNDECLARED** — then the arm is a dead branch, its deletion is mechanical, and `AddressNotFound` keeps its membership of the closed `16` (`contract.md:3959`) untouched because the store's walk still mints it | **whether the change is a bounded amendment of `docs/specs/storeroom-js/` or a mechanical refactor with no contract seat; and, downstream, whether `P-9`'s and `P-10`'s landing is one amendment or two** |

**AND ONE THE ARCHITECT'S OWN WORDS LEAVE OPEN WITHOUT NAMING AN OPTION, RECORDED SO IT IS NOT DISCOVERED
LATER: *"the stores for layoutConfig and Secure config should live in different memory spaces"* is met TODAY
by construction** — two `storeCreate` calls build two independent `Store` values (`crossing.rs:956`–`:970`),
which is what the supervisor's live drive measured — **and the ruling's *"should"* therefore describes the
present state rather than asking for a new one.** **Whether the gate reads it as a REQUIREMENT TO BE GUARANTEED
(a declared isolation observable, which no clause today states) or as a STATEMENT OF WHAT ALREADY HOLDS is the
gate's; this filing takes neither.**

---

## §5. THE BREAKING-CHANGE CLAUSE — the published surface moves, and no version is chosen here

**BOTH ITEMS MOVE THE PUBLISHED PACKAGE'S EXPORT SURFACE AND THE WIRE'S SIGNATURES, AND THE MOVES ARE
SUBSTANTIAL ENOUGH THAT NO DRIVE, NO DECLARATION AND NO CONSUMER SURVIVES UNEDITED.** **What is in scope, each
verified at its bytes this pass:**

1. **`bindings/js/index.d.ts`'s DECLARATIONS.** **The file declares `export function storeCreate(cfg:
   StoreConfig): StoreInstance;` at `:742`, and the whole of `StoreInstance` at `:506` onward — twelve own
   members per the file's own arithmetic (the members are declared as interface members, and the corpus's
   operative member count is printed at `docs/specs/storeroom-js/surface.md:1813`–`:1814` as TWELVE,
   `10 + 1 + 1 = 12` ✓, and again at `:1004`).** **The type entry point is named at `:181` (`StoreConfig`) and
   the status union at `:237`, whose members include `'AddressNotFound'` at `:239`.** **A detached-call refusal
   (`Q-2` (a)) and any change to the addon's exported names reach this file FIRST.**
2. **`bindings/js/package.json`'s `exports` / `files` REGION AND ITS `types` CONDITION.** **`exports` is
   `{ ".": { "types": "./index.d.ts", "import": "./index.mjs" } }` at `:27`–`:32`; the `types` condition
   stands at `:29`; the top-level `"types": "index.d.ts"` at `:33`; and `files` lists exactly four entries —
   `index.mjs` · `README.md` · `index.d.ts` · `src/constraint-kernel.mjs` — at `:34`–`:39`.** **This region is
   in scope because a change to the CROSSING can move what must ship (a new file, a new subpath, or a narrowed
   import surface), and because the `types` condition is the one place a TypeScript consumer's view of the
   export surface is declared.**
3. **THE CHANGE WANTS A VERSION BUMP, AND ITS CLASS IS `MAJOR` UNDER THE CORPUS'S OWN PUBLISH DECLARATIONS.**
   **The package's manifest reads `"version": "0.5.0"` (`package.json:3`), and the five optional platform
   dependencies print the same `0.5.0` at `:41`–`:45`, so the bump is SIX spellings and not one.** **The corpus
   already has the class vocabulary: `docs/specs/storeroom-publish/contract.md §0.3`'s `PUB-DD-9` and its
   `§3.2` name the `MINOR` class, and `release.md §2.3` carries the release rules** — both are cited by
   `docs/specs/storeroom-native/contract.md:3983` as the places a version class is determined. **Under a
   surface that removes a position from two functions and changes an export table, `MAJOR` is the reading the
   supervisor PRICES; whether it is `MAJOR` or `0.5.0 → 0.6.0` under whatever this package's pre-`1.0`
   convention is, is NOT THIS FILING'S TO SAY — the version number is neither chosen nor named here, and it is
   `§4`'s orbit, not this clause's.**
4. **AND WHAT DOES NOT MOVE, PRINTED SO THE BREAKING CLAIM IS NOT READ AS WIDER THAN IT IS: the store's own
   namespace stays CLOSED at `8` verbs (`surface.md:1647`), the store's closed fail set stays at `16` members
   (`contract.md:3959`), and the store's own Rust surface — `src/**` — is untouched by both items, since every
   observable here is the crossing's.** **`P-9` and `P-10` are ADDON-SURFACE changes: they move how a verb is
   REACHED, not what a verb DOES.**

---

## §6. THE SCOPE BOUNDARY — what this proposal does NOT decide

**Printed as a list because each member is a decision this filing deliberately does not take, and a gate that
reads any of them as settled has read the filing wrong.**

1. **THE VERSION NUMBER.** **Not chosen, not named, not implied beyond the `MAJOR`-class priced reading at
   `§5` item 3.** **The bump's spelling, its site list and its timing are the gate's and the release pass's.**
2. **THE DETACHED-CALL RESOLUTION.** **`§4`'s `Q-2`, both options standing.** **The filing does not lean.**
3. **WHETHER `addon_call`'s DISPATCH ARMS ARE DELETED OUTRIGHT OR KEPT AS A COMPATIBILITY SHIM.**
   **THE SUPERVISOR'S READING, RECORDED AS A READING AND NOT AS A FACT: THEY ARE DELETED.** **The ground is
   the architect's own — *"don't route everything through call, create separate exports"* is a ruling about the
   route, and a retained `call` with the same nine arms would leave the faded frame standing under a second
   name.** **BUT THIS IS THE SUPERVISOR'S READING, AND THE CORPUS'S OWN PRACTICE POINTS THE OTHER WAY: this
   project's convention is ANNOTATE-BESIDE, NEVER DELETE** (`docs/pending.md`'s `A58` clause states it at
   `§`-level: *"the repository's own convention is annotate-beside, never delete, so the amendment states the
   supersession with its pointer and keeps the as-filed text visible"*), **and a shim is the code-side form of
   the same convention.** **So the gate must test the reading, and `DEF-2026-10-02`'s bar on whole-file rewrites
   is the standing constraint under which either answer lands.**
4. **WHICH CONTAINER REPLACES `INSTANCES`' INDEX PROTOCOL** — see `§3` item 4. **Named as a consequence; not
   designed.**
5. **WHAT A REFUSAL ANSWERS WHERE THERE IS NO STORE** — the fail-CODE for `Q-2` (a) and for `Q-3`, both
   deliberately unnamed.
6. **AND THIS FILE IS NOT THE CONTRACT.** **Every behaviour clause, every signature, every return shape and
   every fail-state this unit needs is owed at gate 2, by `role_spec_writer`, in the directory form, with the
   typed `§5.x` register for a code-bearing unit.** **No behaviour clause, no signature, no return shape and no
   fail-state is asserted anywhere in this file — and no code task is licensed by it.**

---

## §7. THE GATE CHAIN, THE `STEP 0` LINE, AND THE LAYER

**1. THE CHAIN, STATED AS THE PROJECT STATES IT.** **GATE 1 — OPENED, NOT PASSED.** **Step 1 `role_validity` ∥
step 2 `role_critique` → step 3 `role_architecture_review` → step 4 `role_change_analysis` (with the `STEP-0`
block folded in).** **THE ARCHITECT'S GO-AHEAD IS REQUIRED BEFORE ANY LATER GATE** — the standing condition
this project carries as `G-1` (`docs/pending.md §1`), which reads *"NO GATE LATER THAN GATE 1 MAY RUN UNTIL GATE
1'S VERDICT IS ISSUED AND THE ARCHITECT GIVES THE GO-AHEAD"*. **The chain runs on this file and on nothing
else.**

**2. THE FORM QUESTION IS LEFT OPEN, AND NAMED SO IT IS NOT ASSUMED.** **Whether this work is a NEW UNIT with its
own contract directory, a BOUNDED AMENDMENT of `docs/specs/storeroom-js/` (whose declared surface it moves), or
IN TWO PIECES — `P-9` and `P-10` being separable, `P-9` moving the export table and `P-10` the wire's positions
and the index — is the gate's determination.** **This filing proposes the unit id `U-STOREROOM-ADDON-SURFACE`
and asserts nothing about it: the label is a proposal, and `§5` item 4's *"the store's own Rust surface is
untouched"* is the one fact that makes a bounded amendment plausible rather than compelled.**

**3. THE `STEP 0` LINE — THE PREMISE RECORDED, THE DETERMINATION LEFT TO THE GATE.** **This unit adopts
identifiers from OUTSIDE this project, and two of them are named so the gate can test the premise rather than
re-derive it: (i) `this` AS THE NODE-API RECEIVER — the meaning of the JavaScript-value-of-the-call's-receiver
is Node-API's, declared by `napi_get_cb_info` and by no byte of this project; and (ii) the ELEVEN EXPORT NAMES
at `§2.1`, which are the architect's own minted surface and appear in no corpus this project writes.** **By the
project's own binding rule, a `STEP 0` dossier is owed for a unit *"whose contract names, parameters or
vocabulary originate outside this project"* (`docs/pending.md:38`), with **one row per adopted identifier**, its
source citation and its status, and **NO OPEN ROW at the point a unit is reported green**.** **WHETHER THE
TRIGGER FIRES — and, if it does, whether the dossier is a populated one-row-per-identifier file or the ZERO-ROW
FORM WITH A WRITTEN RATIONALE — IS `role_change_analysis`'s DETERMINATION, FOLDED INTO STEP 4. THIS FILING TAKES
NEITHER.** **The `≤ 8` figure is a BUDGET and not a cap (`docs/pending.md:38`), so an eleven-name export set is
eleven rows if the trigger fires, and no pass may route a name to an overflow list on count grounds.**

**4. THE LAYER CLAUSE.** **EVERY OBSERVABLE NAMED IN THIS FILE IS `ENVELOPE/PURE` (`RCA-12`): the addon's export
table, the receiver, the wire's argument positions, and the JS object's state record are all ENVELOPE artefacts
of the crossing, measured in-process.** **NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE FOR THIS UNIT, and the
assembled/`APP` layer's status does not move by this filing.**

---

## §8. PROVENANCE — what this filing read, and what it did not

1. **READ AT ITS OWN BYTES (this pass):** `bindings/js/src/facade.rs:1160`–`:1692` (the `INSTANCES` slot, the
   three entries, the dispatch block, the export helper and the registration symbol);
   `bindings/js/src/crossing.rs:905`–`:999` (the `Instance` type and the construction);
   `bindings/js/index.mjs:524`–`:539`, `:1820`–`:1844`, `:1875`–`:1934`, `:1950`–`:2024`, `:3145`–`:3174`;
   `bindings/js/index.d.ts:230`–`:269`, `:742`; `bindings/js/package.json` in full (50 lines);
   `docs/specs/storeroom-listeners-proposal.md:1`–`:60` (the FORM this file matches) and `:60`–`:489`;
   `docs/pending.md:30`–`:134` (now `docs/pending.md:27`, the `## §1` heading, and `archive/pending/2026-10-22-discharged-parks-and-dated-records.md:149`), `docs/pending.md:760`–`:840` (now `archive/pending/2026-10-22-discharged-parks-and-dated-records.md:632`–`:712`), `docs/pending.md:896`–`:935` (now `archive/pending/2026-10-22-discharged-parks-and-dated-records.md:753` and `docs/pending.md:231`), and a search of the whole file for `P-9`/`P-10`;
   `docs/next-steps.md`'s live-ledger clauses; `docs/specs/storeroom-js/surface.md:1148`–`:1165`,
   `:1214`–`:1253`, `:1643`–`:1647`, `:1746`, `:1813`–`:1814`; `docs/specs/storeroom-js/contract.md:588`–`:589`;
   `docs/specs/storeroom-native/contract.md`: the `§8.1` arithmetic region and the set's operative count;
   `docs/specs/storeroom-js-adoption-dossier.md`'s head and its `STEP 0` clauses.
2. **NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** `src/**` at any byte (the store's own
   crate is litigated nowhere here); `tests/**` at any byte; `bindings/js/test/**`; the whole of
   `docs/specs/storeroom-constraints/**` beyond the paths other documents quoted; `docs/decisions.md` beyond
   the identifiers other documents print; and **every byte under `../Provident-Electron/**`, which is
   `"poisoned"` context by this project's own ruling and is never a source.**
3. **NOTHING WAS RUN BY THIS FILING'S AUTHOR.** **This role's tool wall is read, search and documentation
   write; no shell, no `cargo`, no `node`, no `npm`, no test, no build, no boot, no debugger and no writing
   `git` command was available or invoked.** **CONSEQUENCE, STATED PLAINLY BECAUSE IT BOUNDS EVERY MEASURED
   CLAIM IN THIS FILE: the `P-9` stack-frame measurement (`§2.1`'s `F-9.4`) and the two-store isolation drive
   (`§2.2`) are NOT MEASUREMENTS OF THIS PASS — they are carried as the architect's and the supervisor's, with
   the code-level corroboration that IS this pass's printed beside them, and the gate may re-take either.**
4. **THE LEDGER MOVE THIS FILING DOES NOT MAKE.** **`docs/next-steps.md`'s live ledger is not touched by this
   pass, and the unit row this filing would open is not opened:** **the filing records the proposal, and the
   pass that takes gate 1's verdict lands the row on the same pass, as the tracker gate requires.** **No `DONE`
   row is re-opened, no artifact is frozen, and no byte outside `docs/specs/storeroom-addon-surface-proposal.md`
   was written.**

---

**END OF THE PROPOSAL.** **§1 is the architect's own words, byte-for-byte. §2 is the two items as scoped, with
every MEASURED FACT separated from the supervisor's reading and every citation opened. §3 is the `P-10`
consequence set, priced and not decided. §4 is the three open questions, both options printed and none taken.
§5 is the breaking-change clause, with no version chosen. §6 is the scope boundary. §7 is the gate chain, the
`STEP 0` line and the layer. §8 is the provenance, including what this pass could not measure. No behaviour
clause, no signature, no return shape, no fail-state and no ruling is asserted anywhere in this file.**
