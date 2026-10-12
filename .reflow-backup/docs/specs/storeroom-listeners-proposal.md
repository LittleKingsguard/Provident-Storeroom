# PROPOSAL — the listener implementation for the native store (`U-STOREROOM-LISTENERS`)

**Role of this file.** The artifact-under-review for this project's SECOND unit's proposal-review gate (gate 1).
**Filed by the supervisor.** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no
return shape and no fail-state; it licenses no code task; it admits no unit row; it edits no byte of the
adjacent project. **Its `§1` is the architect's proposal, byte-for-byte.**

**Unit id / prefix (proposed; the gate determines whether this is an AMENDMENT to `U-STOREROOM-NATIVE` or a
successor unit — see `§3`).** **`U-STOREROOM-LISTENERS`** · spec path (if a unit) `docs/specs/storeroom-listeners/`.

**Gate state at filing.** **GATE 1 — OPENED, NOT PASSED.** The chain runs on **this file and on nothing else**:
step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4
`role_change_analysis` (with the STEP-0 block folded in). **The architect's go-ahead is required before any
later gate.**

---

## §1. THE ARCHITECT'S PROPOSAL, VERBATIM

> Start planning for listener implementation
> Proposal: Add a hashmap containing listeners as a new top-level structure
> Nodes of both types carry two additional hashmaps containing references to the listener list: an active list that will be used to return the listener id when the node is written or destroyed, and a carried, inactive listener list that is used by descendants to populate their maps.
> When the register is created, its parent node carries all listener references
> When a node is created, the lists of its nearest parent node are propagated up. Any listener addressed to the current node is added to the active, all others are passive. This is recursive.

---

## §2. THE CONTEXT THIS PROPOSAL LANDS IN (measured this pass; citations, not opinions)

1. **THE STORE EXISTS AND IS GREEN.** This project's first unit `U-STOREROOM-NATIVE` closed at `1 DONE` on
   2026-10-11: `cargo test --offline --no-fail-fast` exits `0` — **`196` tests · `196` PASS · `0` FAIL**, the
   typed register layer executing **`8/8` rows all `HELD`** (`314/400` attempts); `cargo build` and `cargo
   clippy --lib` clean. Its contract is `docs/specs/storeroom-native/contract.md` + five `carrier` parts; its
   crate is `Cargo.toml` + `src/**` (seven modules); its red set is `tests/**`.
2. **THE LISTENER WAS PARKED BY THE ARCHITECT — AND THIS PROPOSAL IS ITS FIRST STEP.** His deferral `A38`
   (*"Defer listener implementation"*) is carried as **`docs/pending.md` `P-3`** with its revisit condition
   **`the store passes its own test suite`** — **which the close-out has now met**, and this filing records the
   park's surfacing duty **`P-2`** as DUE. **WHAT SURVIVES `A38` TODAY, SO THE PROPOSAL'S STARTING POINT IS
   EXACT: the STORE-SIDE half is BUILT — the store TRACKS listener registrations, computes the
   descendant-inclusive watch set (`A33`/`A37`) and RETURNS the watched-address list (as addresses) from a
   successful write; THE LISTENER ITSELF — its order, its attachment rule, its firing and callback
   invocation, and a throwing body's disposition — is what `A38` deferred.** **The park's LIFT is the
   architect's act, and this proposal is filed as the planning vehicle for it, not as the lift.**
3. **THE RULINGS ALREADY IN FORCE ON THIS SUBJECT.** `A7` (*"track the event listeners and pass a list of
   watched addresses that should be called after a successful write"*), `A33` (*"Alerts if a write resolves to
   or through the matched address"*), `A37` (*"…Listener fires if the address or any of its descendants is
   resolved on write"*) and `A38` (the deferral). **Any clause of this proposal that contradicts one of them
   is a gate finding; the proposal's relationship to them is the gate's to determine, not this filing's.**
4. **THE CONTRACT'S PRESENT SHAPES, FOR THE GATE'S USE (quoted from its own `§`):** a node is **one of two
   kinds** (`A13`) — a `leaf` (data, no downstream anchors) or a `branch` (anchors, no readable value); the
   tier and the monotonic clause ride **anchors** (`A27`); a link holds **at most one child anchor per
   `(key/index, tier)`** (`A34`); **the register ACTS AS A LINK and has no parent anchor** (`A18`), and **the
   empty address resolves to the register** (`A25`); the register is **always a hashmap** (`A23`). **The
   contract's own closing clause states that NO ARTIFACT OF THAT UNIT IS FROZEN** — so no re-freeze is owed by
   construction, and the audit duty is the one the licence rules name for a change to a declared surface.
5. **THE TOOLCHAIN/STATE FACTS A PLAN NEEDS:** Rust (`cargo 1.98.0`) at the repository root, **no dependencies**
   in the crate, offline-capable (`--offline` works), the red set at `tests/**` with its own support module,
   and a **blind-greens harness OUTSIDE the repository** (`/tmp/storeroom-blind/`) that runs scenarios authored
   from the docs alone (`357` assertions, `357` PASS at the close-out). **The gate's plan should say which of
   these a listener unit reuses.**
6. **THE PARKS AND CONDITIONS IN FORCE:** `P-1` (the JS integration — realm, builder/ABI, packaging, host
   handoff, every produced value's crossing) is `OPEN`; **`P-3`** (the listener) is `OPEN`; `P-2` (their lift
   report) is DUE; `docs/pending.md` `G-1` is DISCHARGED. **`A8`/`A42` stand: no integration question is asked,
   and no host wiring is this project's work.**

---

## §3. THE FILING'S OWN BOUNDS

1. **IT ASSERTS NOTHING ABOUT THE ADJACENT PROJECT.** Its bytes are `"poisoned"` context by `A9` — never a
   source, never mined; a conflict with them is intentional.
2. **IT LICENSES NO CODE TASK AND ADMITS NO UNIT ROW.** No red set is delegated, no implementer dispatched, no
   tracker row moved by it, and **the ledger's move that this filing owes is its own open row** (see `§7`).
3. **IT IS NOT THE CONTRACT.** Every behaviour clause this unit needs is owed at gate 2 by `role_spec_writer`,
   in the directory form, with the typed `§5.x` register for a code-bearing unit.
4. **IT CARRIES NO RULING.** `§4`'s table prints the proposal's clauses beside the contract's own, as
   quotations, **with no reading taken**; **whether they conflict, and which governs, is the gate's to
   determine.** **AND ONE STRUCTURAL QUESTION THIS FILING NAMES WITHOUT ANSWERING: whether this work is an
   AMENDMENT to `U-STOREROOM-NATIVE` (its contract's declared surface and its crate's record shapes move) or a
   SUCCESSOR UNIT with its own contract directory — the record-shape change the proposal names (`§1`'s two
   per-node hashmaps) touches the SHIPPED unit's declared surface, which is exactly the class the workflow's
   amendment-versus-successor rules decide.**
5. **NOTHING WAS RUN BY THIS FILING'S AUTHOR BEYOND READ-ONLY INSPECTION** — no `cargo`, no test, no build, no
   boot, no writing `git` command. **Layer discipline: every claim here is `[T]` (text/contract/tracker) or a
   named measurement; no `APP` claim is made anywhere.**

---

## §4. THE PROPOSAL'S CLAUSES BESIDE THE CONTRACT'S OWN — QUOTATIONS ONLY, NO READING TAKEN

| # | The proposal's fragment (verbatim) | The contract's own clause (its `§`, quoted) | The two quotations' own terms |
| --- | --- | --- | --- |
| **`X-1`** | *"Add a hashmap containing listeners as a new top-level structure"* | the contract's `§1.1` records the store's data structures as **the five** of `A17` — *"Tier is not a data structure, it is a property"*, so *"the directive's five components"* are **leaf · branch · anchor · link · registry**; `§1.6` gives the register's own record (*"root container keyed by name, always a hashmap"*, `A23`) | the proposal adds a TOP-LEVEL hashmap; the contract's own closure counts five data structures |
| **`X-2`** | *"Nodes of both types carry two additional hashmaps containing references to the listener list"* | the contract's `§1.1`'s node record (**a leaf's data half and a branch's anchors half**, `A13`), and `§1.5`'s member tables | the proposal adds TWO members to BOTH node kinds — the shipped record shape gains two per-node tables |
| **`X-3`** | *"an active list that will be used to return the listener id when the node is written or destroyed"* | `§3.6`/`§6.5` (the returned **watched-address list** as `Vec<Vec<Segment>>`) and `A33`/`A37` (*"the address or any of its descendants is resolved on write"*) | the proposal returns a listener ID on a write **or a destroy**; the contract returns WATCHED ADDRESSES on a write, and its `§6.5` carries the alert rule |
| **`X-4`** | *"a carried, inactive listener list that is used by descendants to populate their maps"* | the contract states **no carried list** on any node; its register read is `A25`'s whole-registry object and its walk is `§2.2`'s arms | the proposal's `carried` list is a new state kind the contract does not carry |
| **`X-5`** | *"When the register is created, its parent node carries all listener references"* | `§1.6`'s register clause: *"root container keyed by name, always a hashmap"*, with `A18`'s *"the register ACTS AS A LINK"* and `A25`'s *"the empty address resolves to the register"*; the contract declares the register **has no parent anchor** | the proposal names the register's PARENT NODE as a carrier of listener state; the contract's register is parentless and *acts as* a link |
| **`X-6`** | *"When a node is created, the lists of its nearest parent node are propagated up. Any listener addressed to the current node is added to the active, all others are passive. This is recursive."* | `§3.4`'s **write arms** and their mint (`A21`'s destroy-and-replace on the same link; `W-2`/`W-3`/`W-4`'s minting), and `§3.3` (every anchor the write mints carries the write's tier) | the proposal defines a **propagation on node creation** and an **active/passive partition** by addressedness; the contract's write arms mint without such a step |
| **`X-7`** | *"Start planning for listener implementation"* | `docs/pending.md` `P-3` (the park: *"THE LISTENER — the alerted list's ORDER, the attachment rule, the firing and callback invocation, and what a throwing listener body does"*, owner the architect, revisit condition *the store passes its own test suite*) and `P-2` (its lift report, DUE) | the proposal opens the planning of what the park deferred; **the LIFT is the architect's act and the park's own rules say a park closes nothing until he lifts it** |

---

## §5. WHAT NEITHER THE PROPOSAL NOR THE CONTRACT NAMES (adjacencies; no ruling)

| # | The adjacent subject | Why it is adjacent |
| --- | --- | --- |
| **`N-1`** | **the listener's ID and its scope** | the proposal returns a listener id on a write or a destroy; the contract's returned list carries ADDRESSES, and no clause names an id's shape, uniqueness domain, lifetime, or how a caller maps an id to a callback |
| **`N-2`** | **registration and withdrawal** | the contract's `§6.5` carries `watch`/`unwatch` and the registration record; the proposal names no registration verb and no key for the new top-level map |
| **`N-3`** | **firing, ordering and the callback** | `A38` deferred the listener's order, its attachment rule, its firing and invocation; the proposal names an active/passive partition but not what fires, in what order, or how a callback is reached in a library with no `JS` binding (`P-1` parked) |
| **`N-4`** | **a throwing body** | deferred by `A38`; unaddressed by the proposal |
| **`N-5`** | **the carried list's own lifetime, tier-binding and persistence** | three tiers exist; the proposal gives the carried list no tier, no lifetime and no place in the `file` tier's bytes or the journal |
| **`N-6`** | **the journal's and the rollback's interaction** | a destroy returns an id; the journal records writes and deletes, and a rollback reverses operations touching the same subtree — whether a listener id survives a rollback, a purge or a re-mint is named nowhere |
| **`N-7`** | **"propagated up"** | the proposal's direction word (*"propagated up"*, *"its nearest parent node"*) is not defined against the walk's own direction (the contract's walk descends from the register) |
| **`N-8`** | **the record-shape change's audit duty** | the shipped unit's contract declares no artifact frozen; a declared-surface change still owes the licence rules' audit duty (`AR-` set), and the proposal does not name the artifact that moves |

---

## §6. THE ADOPTION TRIGGER — THE PREMISE RECORDED, THE DETERMINATION LEFT TO THE GATE

**The STEP-0 determination is `role_change_analysis`'s, folded into step 4.** **This filing records the premise:**
**the identifiers the proposal names — `listener` · `listener list` · `listener id` · `active` · `passive` ·
`carried` · *"top-level structure"* · *"propagated up"* — do not appear in this project's shipped contract as
contract terms, and this project's own rulings (`A7`, `A33`, `A37`, `A38`) are the architect's IN-PROJECT words
already filed here.** **Whether the trigger fires, and whether a dossier or the zero-row exemption with a
written rationale applies, is the gate's determination — not this filing's.**

---

## §7. PROVENANCE AND THE LEDGER MOVE THIS FILING OWES

1. **READ AT ITS OWN BYTES (this pass):** the proposal's own text (the architect's message); this project's
   `docs/next-steps.md` (the DONE row and the ledger), `docs/pending.md` (`P-1`/`P-2`/`P-3`, `G-1`/`G-2`),
   `docs/decisions.md` (the ruling rows), `docs/defects.md` (the status line and rows);
   `docs/specs/storeroom-native/contract.md`'s `§0.1`, `§1.1`–`§1.6`, `§3.3`/`§3.4`, `§3.6`, `§6.1`–`§6.5`,
   `§10` (the parks' clauses), and `docs/specs/storeroom-native-proposal.md` `§1`, `§9`–`§16`
   (`A1`–`A39`); `docs/specs/storeroom-native-greens.md`'s header and `NG-16`; `Cargo.toml`; the crate's
   module list; `tests/`'s file list.
2. **NOT READ, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:** the parts of the contract directory
   beyond the sections named; `src/**` at its own bytes (its module list and the crate's manifest were read);
   `tests/**` beyond its file list; `archive/**` beyond the names of its records; and **every byte under
   `../Provident-Electron/**`** (`A9`).
3. **THE LEDGER MOVE THIS FILING OWES, STATED WITH ITS TERMS:** the ledger stood at **`1 DONE / 0 open`
   UNITS = `1`** at the close-out; **this filing opens a second unit's gate-1 row, so it reads `1 DONE /
   1 open` UNITS = `2` (`1 + 1 = 2` ✓)** — **and the filing's own pass lands that row in
   `docs/next-steps.md`'s `## OPEN` table and its live-ledger line, on the same pass, as the tracker gate
   requires.** **No `DONE` row is re-opened, no artifact is frozen, and no byte of the adjacent project was
   written.**

---

## §8. THE ARCHITECT'S CLARIFICATION OF 2026-10-11 — the register HAS a parent anchor, addressed by the empty set

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Clarification: Register has a parent anchor, whose address is an empty set (i.e.[])

**WHAT IT SETTLES, STATED AS A MAPPING AND NOT AS A READING.** **The proposal's third sentence — *"When the register is created, its parent node carries all listener references"* — HAS A REFERENT: the register carries a PARENT ANCHOR, and that anchor's address is the EMPTY SET `[]`.**

| # | The row it lands on (the listener gate's union) | What the clarification does to it | What it does NOT settle |
| --- | --- | --- | --- |
| **`A40`** | **`U3`** — the register's *"parent node"* (step 1's `C-3`, step 2's `K6`, step 3's `MOOT` disposition on the ground that *"the register has no parent anchor"*) | **`U3`'s ground IS WITHDRAWN BY THE ARCHITECT'S OWN WORDS: the register DOES have a parent anchor and `[]` is its address, so the proposal's third sentence is not referent-free.** **WHAT THIS CHANGES IS A SHIPPED CONTRACT CLAUSE, NOT A PROPOSAL CLAUSE: `§1.6` item 3's *"the register … has NO parent anchor"*, `§1.5` item 4's reading of the early *"parent node of the register"* phrase as *"SUPERSEDED IN REFERENT"*, and the shipped code's register reference (`findAddress([], t)` answering the register itself with an empty-segment marker) were authored on the opposite ground — the amendment owes them a re-read, and the gate's next pass determines what moves** | it does not say **what the register's parent anchor's NODE is** (the register itself, or a distinct carrier node), nor whether the anchor sits on a link, nor what a `read` at `[]` now returns (the shipped contract answers *"an object containing the entire registry"*), nor whether that anchor carries a TIER (the shipped discipline puts the tier on anchors with the monotonic clause), nor what the parent anchor's own parent is |
| **`A40`** (cont.) | **the proposal's `X-5` row, its `§5`'s `N-7`, and the union rows `U1`/`U2`** | **the third sentence gains its referent, so a part of the mechanism the gate had refused as unrepresentable is representable IN PRINCIPLE — but the two per-node maps, the ACTIVE/PASSIVE partition, the id and the returned shapes are untouched by this clarification and remain `ANSWERED-BY-NOTHING`** | it does not touch the storage-home question, the partition's key, the id, the destroy's answer, the propagation's direction, or the persistence axis |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THIS IS A CLARIFICATION OF THE ARCHITECT'S OWN EARLIER WORDS, NOT A NEW MECHANISM: the sentence it answers (`A25`, *"The parent node of the register 'link' … Empty address resolves to register"*) already carried both halves, and the shipped contract's re-reading of it as *"superseded in referent"* was the gate's, not the architect's.** **(2) IT MOVES A SHIPPED CONTRACT CLAUSE AND THE CODE THAT IMPLEMENTS IT — `§1.6` item 3, `§1.5` item 4, and `findAddress([], t)` — so it is part of the AMENDMENT the gate determined (a bounded amendment of `docs/specs/storeroom-native/`), and the amendment's own pass re-reads those cells with the audit duty the gate's record names.** **(3) `P-3` STANDS AND NOTHING HERE LIFTS IT: the listener's own surface (order · attachment rule · firing · callback invocation · a throwing body) is still the park's, and the gate's first question to the architect — the LIFT — is still the precondition of the rest.**

---

## §9. THE ARCHITECT'S REGISTER RULINGS OF 2026-10-11 — the carrier node, the register's tier, and the firing event

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Register has a parent carrier node (which sits on the register-as-a-link, and does not itself have a parent)
> Register has the file tier, if a configured save file is present, or mem otherwise
> 4. Read returns whole register as object - listeners don't fire on read, they fire on write/delete

**THE THREE RULINGS, TRANSCRIBED AS `A41`–`A43` AND MAPPED — transcription only; each fragment's silences are printed beside it.**

| # | The question it answers (`§8`'s list) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A41`** | *is the parent anchor's node the register itself, or a distinct carrier node — and does it sit on a link?* | ***"Register has a parent carrier node (which sits on the register-as-a-link, and does not itself have a parent)"*** | **ANSWERED: the register's parent anchor points at a DISTINCT CARRIER NODE; the carrier node SITS ON THE REGISTER-AS-A-LINK; and the carrier node HAS NO PARENT of its own** — so the shipped contract's *"the register has NO parent anchor"* (`§1.6` item 3) and its *"SUPERSEDED IN REFERENT"* re-reading (`§1.5` item 4) are both corrected by this ruling, and the carrier node is the object the proposal assigns the listener references to | it does not name the carrier node's own record shape (what members it carries beyond the listener references), nor whether the register-as-a-link's parent anchor is the same anchor the proposal's third sentence names, nor what a walk at `[]` resolves to (the carrier node, or the register) given `A43`'s read answer |
| **`A42`** | *does the register's parent anchor carry a tier?* | ***"Register has the file tier, if a configured save file is present, or mem otherwise"*** | **ANSWERED: the register's tier is `file` WHEN a configured save file is present, and `mem` OTHERWISE** — a conditional tier on the register, read with the shipped discipline that puts the tier on anchors and the monotonic clause over anchor pairs (`A27`) | it does not say what the tier attaches to (the parent anchor, the carrier node, or the register entry), nor what happens when the configured save file appears or disappears **after** the register's creation (a re-tiering rule), nor how the conditional interacts with the monotonic clause where the register is the outermost boundary |
| **`A43`** | *what does a read at `[]` return — and when do listeners fire?* | ***"Read returns whole register as object - listeners don't fire on read, they fire on write/delete"*** | **ANSWERED, TWO THINGS: (1) a read at `[]` returns THE WHOLE REGISTER AS AN OBJECT** (which is what the shipped contract already answers, `A25`/`§1.5` item 4, so this half CONFIRMS the shipped clause); **(2) the FIRING EVENT SET is `write` and `delete` — a READ NEVER FIRES A LISTENER**, which narrows the proposal's own *"when the node is written or destroyed"* to exactly those two events and excludes the read, the boot and any read-driven traversal | it does not say **what fires** (which listener), in **what order**, whether a delete's firing differs from a write's, whether a **no-op** delete (`D-3`) or a **failed** write fires anything, or how a body's THROW is disposed — **(these are `P-3`'s own subjects)** |

**AND TWO CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) `A41` AND `A42` TOGETHER PUT THE CARRIER NODE AT THE OUTERMOST BOUNDARY OF EVERY TREE, ON THE REGISTER-AS-A-LINK, WITH A CONDITIONAL `file`/`mem` TIER — which is a record-shape and tier-carrier change to the SHIPPED contract (`§1.6`, `§1.5` item 4, `§1.2`'s tier discipline, and the register reference in the code), so it is part of the AMENDMENT the gate determined, and the amendment's pass re-reads those cells.** **(2) `A43`'s second half is the ONE PART OF `P-3`'S SUBJECT THE ARCHITECT HAS NOW RULED (the firing EVENT set is `write`/`delete`, never a read); THE REST OF `P-3` — what fires, in what order, the attachment rule, the callback's invocation, and a throwing body — IS UNTOUCHED BY THESE THREE RULINGS AND REMAINS THE PARK'S.** **The architect has asked the gate to CLARIFY `P-3` (`§9`'s own request); the gate's answer is appended below as `§9.1`.**

### 9.1 WHAT `P-3` IS — the gate's clarification, at the architect's own request

**`P-3` IS THE PARK YOUR OWN RULING `A38` CREATED.** Its words: ***"Defer listener implementation."*** It is recorded in `docs/pending.md` `P-3`, and it is a PARK in this project's sense: **`OPEN`, NEVER green; a DEFERRAL, never a dismissal; it closes nothing; its LIFT is the architect's act.** Its revisit condition is ***the store passes its own test suite*** — **which the shipped unit has now done**, so the condition is **MET** and its surfacing duty (`P-2`) is **DUE**.

**WHAT IT HOLDS — four subjects, and only these:**
1. **The listener's ORDER** — how many listeners fire for one write and in what sequence (`J-27`).
2. **The ATTACHMENT RULE** — whether a listener is attached **BY ADDRESS** (following the address across a re-mint) or **BY IDENTITY** (following the node) (`J-28`).
3. **The FIRING and the CALLBACK'S INVOCATION** — what is called, on which event, and how a callback is reached at all (`J-67`).
4. **A THROWING BODY's disposition** — what happens to the write (and to the other listeners) when a listener body fails.

**WHAT IT DOES *NOT* HOLD — and this is the half that is ALREADY BUILT AND GREEN:** **listener TRACKING** (registrations keyed by the watched address, idempotent at the address level, with an opaque handle for withdrawal), the **descendant-inclusive watch set computed at write time**, and **the watched-address list RETURNED from a successful write** (`A7`/`A33`/`A37`; `§6.5` items 1–7; `§3.6`'s `watched` member; the red set's `tests/watched_addresses.rs` and the register row `P-TP-8`, all green). **`PAR-9` declares the listener BODY's domain EMPTY BY DECLARATION and its evaluator `nobody inside this unit` — that declaration is the park's own signature in the parameter table.**

**WHY IT BLOCKS THE LISTENER WORK, IN THREE STEPS.** **(a) It forbids the questions: while `P-3` stands, *"no listener question is put to the architect"* (`§10.2` item 3 of the shipped contract; the constraint the park records).** **(b) The mechanism's KEY **IS** the attachment rule: the proposal's ACTIVE/PASSIVE partition and its per-node maps are keyed by *"addressed to the current node"*, and whether "addressed" means BY ADDRESS or BY IDENTITY is precisely subject 2 of the park — so writing the maps' clauses would rule a parked subject by the back door.** **(c) Nothing can be CALLED: a listener that must fire has no caller in a plain Rust library, and the value's crossing into JS is `P-1`'s (deferred by `A8`).**

**WHAT LIFTING IT MEANS, MECHANICALLY.** **One dated act (or one ACTIVE `docs/decisions.md` row) from you that lifts `P-3`.** After it: the gate may put the listener questions it has been holding (`U14`–`U16` of its union); `PAR-9` can be re-declared with a live domain; the amendment's spec region may write the surface clauses (order, attachment, firing, throw); and the red set may drive them. **Before it, the amendment can still land EVERYTHING ELSE the proposal needs** — the register's carrier node and conditional tier (`A41`/`A42`), the read's answer (`A43`), the listener state's home and persistence declaration, and the id surface — **but not one line about what fires.**

**AND IF YOU DO NOT LIFT IT:** the listener work stops at exactly the identity/storage question. **That is a lawful outcome, not a failure** — the shipped unit's store-side half stays green, the amendment lands the register carrier and the persistence declaration, and the park keeps holding the four subjects above until you lift it. **What is NOT lawful, and what the gate will refuse, is writing the surface clauses while the park stands — including writing them by implication through the maps' key.**

---

## §10. THE ARCHITECT'S LIFT OF `P-3` — 2026-10-11

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Yes, this is the listener unpark

**THE RULING, TRANSCRIBED AS `A44`.** ***`P-3` IS LIFTED.*** **The gate asked (*"Do you lift `P-3`?"*); the architect answered in his own words; and the park's own rules make the lift HIS act — this is that act, recorded here verbatim and landed in `docs/pending.md` in the same pass.**

| # | What it settles | What it does NOT settle |
| --- | --- | --- |
| **`A44`** | **`P-3` IS LIFTED, SO ITS FOUR SUBJECTS LEAVE THE PARK: the listener's ORDER, the ATTACHMENT RULE (by address or by identity), the FIRING and the CALLBACK'S INVOCATION, and a THROWING BODY's disposition may now be SPECIFIED, ASKED AND DRIVEN — the constraint *"no listener question is put to the architect while `P-3` stands"* is thereby discharged, and `PAR-9`'s *"domain EMPTY BY DECLARATION"* may be re-declared with a live domain.** **`A43`'s own half (`write`/`delete` fire, a read never does) stands as the first ruled subject of the now-unparked surface.** | **it does not answer the four subjects it unparked** — what fires and in what ORDER, whether attachment is BY ADDRESS or BY IDENTITY, how a callback is invoked, and what a throwing body does are now **ASKABLE and SPECIFIABLE**, not **answered**; **and it does not touch `P-1` (the JS integration), whose crossing remains deferred by `A8`** — a listener that must be *called* still has no caller across a parked boundary, so the firing model needs either a Rust-callable design or the crossing's lift |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) A LIFT IS NOT A CLOSURE: the park's record stays in `docs/pending.md` with its own dated lift clause — `P-3` is not deleted, and its four subjects are now OPEN QUESTIONS OF THE AMENDMENT rather than a park's contents.** **(2) THE GATE'S HELD QUESTIONS MAY NOW BE PUT — the union's `U14`–`U16` (firing/order/attachment/throw, the callback's reach, and a throwing body) move from `CARRIED-OPEN` (a park's subject no pass may class) to `ANSWERED-BY-NOTHING` (the architect's), and the amendment's spec region may specify them once answered or carried as priced `DECLARED-DEFAULT` rows.** **(3) THE AMENDMENT'S REMAINING BLOCKER IS NOW THE VARIANT, NOT THE PARK: whether the mechanism keeps the proposal's two per-node maps or adopts the gate's recommended `LIST-3` (the ONE shipped address-keyed registration home plus an id surface) — the storage-home ruling the union carries as `U1`/`U2`/`U10`.**

---

## §11. THE ARCHITECT'S HOME RULING OF 2026-10-11 — the top-level listener map is the home, the nodes borrow, and the purpose is lookup cost

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> It's rust, the top-level listener map is the home and the nodes borrow. this is used to limit the number of lookups required to check for a listener

**THE RULING, TRANSCRIBED AS `A45` AND MAPPED — transcription only; its silences are printed beside it.**

| # | The question it answers (the gate's last blocker) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A45`** | **the VARIANT** — the proposal's two per-node maps versus the gate's recommended `LIST-3` (one home + an id surface) | ***"It's rust, the top-level listener map is the home and the nodes borrow. this is used to limit the number of lookups required to check for a listener"*** | **THREE THINGS, AND THEY RESOLVE THE GATE'S CENTRAL OBJECTION: (1) THE TOP-LEVEL LISTENER MAP IS THE *HOME* — ONE home for the registration state, which is what the gate's `U1` required and what `P-TP-8`'s *"exactly the set"* totality needs; (2) THE NODES **BORROW** FROM IT — the per-node maps are therefore **NOT COPIES AND NOT A SECOND HOME**: a node does not own listener state, it holds a reference into the one map; (3) THE PURPOSE IS NAMED — **to limit the number of lookups required to check for a listener** — so the per-node references are an INDEX for lookup cost, not an authoritative store.** **Read with `A41` (the register's carrier node at the empty address) and the shipped one-home clause (`§6.5` item 2 keyed by the watched address; `P-TP-8`), the proposal's structure becomes: ONE authoritative map, plus borrowed access from the nodes for speed.** | **it does not say HOW the borrow is spelled in Rust** — a node holding a live `&` into a map it may not mutate is a borrow-checker conflict, so the mechanical form must be one of: a **shared handle** (`Rc`/`Arc` to an entry), a **stable id or index into the home map** (a logical borrow), or an **arena/generational index** — and **which one it is decides the invalidation discipline, the re-entrancy rules and the `file`-bytes/journal question**; nor does it say **whether the two per-node hashes stay TWO tables** or collapse into one reference set; nor what a borrow's **lifetime discipline** is across a re-mint, a purge, a rollback and a boot (the arms that destroy the nodes holding them); nor whether **the "lookup cost" claim is an observable the contract must state or an implementation note**. **NONE OF THAT IS A QUESTION FOR THE ARCHITECT UNLESS HE WISHES: the amendment's spec gate may state the mechanical form as a REVERSIBLE `DECLARED-DEFAULT` with its alternative priced (the gate's own `AR-46`/`AR-44` carriage), and the choice is correctable without moving the store's shape.** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE GATE'S `LIST-1`-VERSUS-`LIST-3` OPPOSITION IS DISSOLVED: the architect has taken the RECOMMENDATION'S SUBSTANCE (one home) AND KEPT THE PROPOSAL'S MECHANISM (per-node references for speed) — the two are no longer alternatives, they are one design: home + borrows.** **(2) THE UNION ROWS `U1` (the home), `U2` (the per-node members) AND `U10` (the thirteenth write arm) ARE THEREBY ANSWERABLE, and the amendment's pass re-dispositions them; the rows the lift opened (`U14`–`U16`: order, attachment, firing, throw) REMAIN OPEN QUESTIONS now lawfully askable and specifiable.** **(3) `P-1` STANDS: the borrow's mechanics live inside this crate, but a listener that must be CALLED still crosses the parked boundary, so the firing model needs either a Rust-callable design or `P-1`'s lift.** **AND ONE THING THIS FILING DOES NOT DO: it does not answer, and no pass may invent, the mechanical form of the borrow — the amendment's spec region states it as a priced default or the architect rules it.**

---

## §12. THE ARCHITECT'S BORROW RULINGS OF 2026-10-11 — the borrow's lifecycle, the two lists, and the gate's own question

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (including his question to the gate, which `§12.1` answers).**

> 1. Why is it a borrow-checker conflict?
> 2. The borrow is removed on node change actions because they destroy and replace nodes.
> 3. Two lists to keep active listeners separate from ones that are being passed to children

**THE TWO RULINGS, TRANSCRIBED AS `A46`–`A47`, AND THE QUESTION, ANSWERED BY `§12.1`.**

| # | The question it answers | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A46`** | *what is a borrow's lifetime discipline across the arms that destroy the holding nodes?* | ***"The borrow is removed on node change actions because they destroy and replace nodes."*** | **ANSWERED, AND IT IS THE LIFETIME RULE: a node's borrows are DROPPED WITH THE NODE — the change actions that destroy and replace nodes (`W-1`'s purge-then-mint, `W-2`'s re-mint, `W-6`'s purge-then-mint, and the boot) remove the borrows WITH the node that held them, and a node newly created inherits the lists of its nearest parent node.** **So the borrows' lifetime is the NODE's, exactly as the proposal's own propagation sentence has it — no borrow outlives a change action, and the invalidation duty the gate raised against the per-node tables is discharged BY DESTRUCTION rather than by a maintenance rule.** | it does not name the **mechanical spelling** of the borrow (a live `&` reference · a shared handle · a stable id/index) — **and that spelling is the whole of the gate's `§12.1` answer**; nor does it say what a node created with NO parent's lists (the register's carrier node at `[]`) starts with |
| **`A47`** | *do the two per-node tables stay two, or collapse into one reference set?* | ***"Two lists to keep active listeners separate from ones that are being passed to children."*** | **ANSWERED: THE TWO LISTS STAY TWO — an ACTIVE list (the listeners that fire at THIS node, on a write or a delete, per `A43`) and a CARRIED list (the listeners that are being PASSED ON to children).** **The separation is the proposal's own, and its purpose is stated: the ACTIVE list is the fire-set of the node's own change, while the CARRIED list is the inheritance channel from which a newly created child takes its own lists.** | it does not say whether an ACTIVE listener is ALSO carried (i.e. does a listener addressed at a node appear in that node's CARRIED list for its descendants, or is the carried list exactly the ones NOT addressed here?); nor what the two lists' entries are (handles, ids, or plain addresses) |

### 12.1 THE GATE'S ANSWER TO THE ARCHITECT'S QUESTION — *why is it a borrow-checker conflict?*

**THE SHORT ANSWER: AS A LIVE `&` REFERENCE IT IS ONE; AS A HANDLE OR AN INDEX IT IS NOT. THE GATE RAISED THE CONCERN ABOUT THE FIRST SPELLING, AND THE ARCHITECT'S `A46` ALREADY DISCHARGES IT UNDER ANY SPELLING.**

**WHY A LIVE REFERENCE WOULD CONFLICT, PRECISELY.** **If a node stores a Rust *reference* into the home map — `entry: &'a ListenerEntry`, where the entry lives in the store's own `listeners: <map>` — then three things follow, and each is a compile-time refusal, not a style objection:** **(a) THE STORE BECOMES SELF-REFERENTIAL.** The store would own the map **and** own nodes that borrow from that map; Rust has no way to type a struct that owns a value and a reference into that same value — the borrow would have to outlive the store's own field, which the language cannot express without `unsafe`, a `Cell`/`RefCell`, or an arena. **(b) THE MAP'S MUTATION IS BLOCKED WHILE ANY BORROW LIVES.** `watch` and `unwatch` mutate the home map and therefore need `&mut listeners`; while any node holds `&listeners[…]` the compiler refuses the mutation (`E0502`: *cannot borrow as mutable because it is also borrowed as immutable*). **Rust cannot see that the holding node is about to be destroyed — the ordering is a run-time fact and the check is a compile-time one.** **(c) EVERY NODE TYPE WOULD CARRY A LIFETIME PARAMETER**, which propagates through the node, the link, the register and every signature that moves them — a surface change far larger than the feature.**

**WHY IT IS *NOT* A CONFLICT UNDER THE SPELLINGS THE AMENDMENT MAY DECLARE.** **If the "borrow" is a SHARED HANDLE (`Rc<ListenerEntry>` / `Arc<ListenerEntry>`) or a STABLE ID / INDEX into the home map, then nothing in the store holds a Rust lifetime into the map: the map owns its entries, the node holds a cheap handle or an integer, and mutating the map stays legal.** **`Rc`/`Arc` additionally keep the entry alive while a node still holds it — a safety net the architect's rule makes unnecessary, since `A46` destroys the holding nodes first.**

**AND `A46` IS WHAT MAKES EVERY SPELLING SAFE: THE BORROWS' LIFETIME IS THE NODE'S.** **Because the change actions DESTROY AND REPLACE nodes, no node — and therefore no handle, id or index it holds — outlives the mutation that would invalidate it: destroying the node drops its lists with it, and the replacement node takes fresh lists from its nearest parent node.** **THE RESIDUAL, NAMED SO IT IS NOT DISCOVERED LATER: an id/index spelling needs the home map's removal path to be the only way an entry dies (so no index can be reused while a node still names it), and a handle spelling needs no such rule — which is exactly the trade the amendment's spec region will state as a priced `DECLARED-DEFAULT`.**

---

## §13. THE ARCHITECT'S HOME-SCOPE RULING OF 2026-10-11 — the home map contains only listeners and sits outside the graph

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> The home listener map (the one that owns the listener data) *only* contains listeners, it is separate from the register and the graph

**THE RULING, TRANSCRIBED AS `A48` AND MAPPED — transcription only; its silences are printed beside it.**

| # | The question it answers | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A48`** | **the home's SCOPE against the graph and against the closure question** (the union's `U1`; step 3's determination that a carrier-internal collection of the journal's class is not a sixth component; the proposal's *"a new top-level structure"*) | ***"The home listener map (the one that owns the listener data) only contains listeners, it is separate from the register and the graph"*** | **TWO THINGS: (1) THE HOME MAP CONTAINS LISTENERS AND NOTHING ELSE — no graph records, no register entries, no values, no addresses-as-keys-with-nodes: it OWNS the listener data and only the listener data; (2) IT IS A PEER STRUCTURE OUTSIDE THE GRAPH — SEPARATE FROM THE REGISTER AND FROM THE GRAPH — so it is NOT a sixth graph component, NOT a member of any node, link, anchor or register entry, and NOT reachable as part of the graph's read.** **This CONFIRMS the reading step 3 reached from the shipped contract's own clauses (`§1.7` closes the GRAPH's record shapes; `§6.1` item 2's carrier-internal class) and it CONFIRMS `A43`'s read answer: a read at `[]` returns the whole register as an object of the GRAPH — the home map is not inside it.** | it does **not** say whether the home map is **per store instance** (as the shipped watch set is, `DD-14`) or shared; nor whether it participates in **persistence** — the `file` tier's committed bytes (`§7.2`'s whole-`file`-state commit) and the boot — which is the one place `A42`'s conditional register tier and `A48`'s separate structure meet; nor whether a **`watch`/`unwatch`** mutation of it is journaled (the shipped journal tracks exactly two verbs, `write` and `delete`, neither of which is a registration); nor what the **register's carrier node's borrows** are keyed by now that the home holds listeners alone |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE *"SIXTH COMPONENT"* OBJECTION IS CLOSED BY THE ARCHITECT'S OWN WORDS: the closure counts the GRAPH's record shapes (leaf · branch · anchor · link · registry, with tier a property), and a peer structure outside the graph adds nothing to that count — exactly as the journal and the shipped watch set already sit beside it.** **(2) THE *"SECOND HOME FOR ONE REGISTRATION STATE"* OBJECTION IS CLOSED WITH IT: the home owns the listener data, the nodes borrow (`A45`), and the shipped address-keyed watch collection is the thing the home IS (or the thing it subsumes) — the amendment's pass states which, in one clause, with the shipped `§6.5` clauses' fate recorded.** **(3) WHAT REMAINS OPEN IS THE PERSISTENCE AXIS AND NOTHING ELSE OF THE STRUCTURE: whether the home's contents are instance-scoped and session-scoped (`LIST-4`'s reading: the shipped contract commits GRAPH values, the journal captures `{path, tier, value}`, and the boot declares *"nothing is watched"*), and how `A42`'s conditional register tier interacts with a structure that is separate from the register. THE AMENDMENT'S SPEC PASS STATES IT AS A PRICED `DECLARED-DEFAULT` OR THE ARCHITECT RULES IT.**

---

## §14. THE ELABORATION OF `A42` — the register's conditional tier, worked out against the shipped clauses

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES. This section ELABORATES the architect's ruling; it takes no ruling of its own, and every clause it quotes is the shipped contract's own words read at its `§`.**

**THE RULING, RE-QUOTED.** ***`A42`:** "Register has the file tier, if a configured save file is present, or mem otherwise."*

### 14.1 WHAT THE SHIPPED CONTRACT SAYS TODAY — three clauses the ruling moves, verbatim

1. **The monotonic clause's register exemption** (`§1.2`): *"The register has no parent anchor and therefore imposes no upper bound on its children — any of the three tiers may stand at a register key."*
2. **The register key's child anchor** (`§1.2`): *"A register key's child anchor carries a tier exactly as any other child anchor does, and the register imposes no monotonicity bound on it."*
3. **The register itself has no tier** (`§1.6` item 3 read with the empty-address reference clause): *"the register carries no tier of its own … `findAddress([], file)` and `findAddress([], temp)` answer the SAME reference."*

**So the shipped state is: the register is TIER-LESS, imposes NO upper bound, and the empty-address reference is TIER-FREE.**

### 14.2 WHAT `A42` CHANGES — the four consequences, each in the shipped clauses' own terms

**(1) THE REGISTER ACQUIRES A TIER, AND THEREFORE THE MONOTONIC CLAUSE ACQUIRES A BOUND AT THE OUTERMOST BOUNDARY.** **With `A42`, the register's tier is `file` when a configured save file is present and `mem` otherwise — so the exemption in `§1.2` is no longer vacuous: the register IS a parent anchor with a tier, and a register key's child anchor is bounded by `rank(child) ≤ rank(register tier)`.** **The immediate, checkable consequence:** **with a configured save file, the register is `file` and a register key may carry ANY of the three tiers (`file`, `mem`, `temp` — all `≤` `file`); WITHOUT one, the register is `mem` and a `file`-tier write at a register key would FAIL `ParentAnchorMonotonicityViolation` (`rank(file)=3 > rank(mem)=2`).** **That is a behaviour change, not a spelling change: "no save file configured" implies "no `file`-tier root", which the shipped contract does not state (its `filePath` is a REQUIRED construction argument, `DD-17`: *"`storeCreate` with a missing or invalid `filePath` or `journalLength` fails at construction with `ConstructionArgumentMissing`"*).** **THE AMENDMENT MUST RECONCILE THESE TWO CLAUSES, and the reconciliation is the ruling's own open edge.**
**(2) THE REGISTER'S ANCHOR CARRIES THE TIER, AND THE REFERENCE OWES IT.** **`A27` put the tier on ANCHORS; `A42` gives the register a tier; so the register's PARENT ANCHOR (the one `A41` gives it, whose node is the carrier node at `[]`) is where that tier stands.** **Consequence: the shipped clause *"the register carries no tier of its own … `findAddress([], file)` and `findAddress([], temp)` answer the SAME reference"* is SUPERSEDED — the empty-address reference must now answer THE REGISTER'S OWN TIER (the conditional one), whatever `t` the caller passed, exactly as `A41`'s ruling already puts a real anchor there.**
**(3) IT INTERACTS WITH `A41`'s CARRIER NODE AND WITH THE HOME.** **The carrier node sits ON THE REGISTER-AS-A-LINK and has NO PARENT (`A41`); the home listener map is SEPARATE from the register and the graph (`A48`). So the tier belongs to the REGISTER'S PARENT ANCHOR (per (2)), the carrier node carries the listener references, and the home owns the listener data — three distinct things at the outermost boundary, each with its own clause.**
**(4) IT GIVES THE PURGE CHAIN A FLOOR.** **`A19`'s purge is *"the write deleting any versions of the addressed node with the same or less persistence"*, and `A15` chains `temp`→`mem`→`file`. With a `file` register, the chain's top is reachable; with a `mem` register, the `file` rung is unreachable at a register key — a consequence the amendment states rather than leaves to be discovered.**

### 14.3 THE THREE QUESTIONS THE ELABORATION CANNOT ANSWER FOR HIM — each answerable in one line, or carried as a priced default

| # | The question | Why it cannot be derived |
| --- | --- | --- |
| **`Q-1`** | **What does *"a configured save file is present"* mean, given the shipped `filePath` is a REQUIRED construction argument?** Is it (a) the argument was supplied and names a usable path (so `file` is the normal case and `mem` the exception), (b) the argument was supplied AND the file exists on disk (so a first boot with a fresh path is `mem` until the first `file` write commits), or (c) something else? | the ruling's word *"present"* is not defined against `DD-17`'s required-argument rule |
| **`Q-2`** | **Is the register's tier FIXATED at creation, or does it MOVE when the save file appears or disappears?** A first-boot `mem` register that becomes `file` after the first commit would re-tier the whole tree's upper bound at run time — and the shipped monotonic clause is stated per write, not per lifetime. | the ruling names the condition but not the moment |
| **`Q-3`** | **Does the register's `mem` state (no save file) refuse a `file`-tier write at a register key — or does it carve the register OUT of the monotonic bound as the shipped `§1.2` does today?** This is the ruling's sharpest edge: `A42` gives the register a tier, which makes the bound real; the shipped clause exempts it. | the two texts collide and only the architect can say which governs |

**AND ONE NOTE THIS ELABORATION ADDS FOR THE AMENDMENT'S BENEFIT: IF `Q-1` IS ANSWERED (a) — the path is required, so a configured save file is always "present" and the register is always `file` — THEN `A42`'s *"or mem otherwise"* arm is UNREACHABLE IN PRACTICE, and the clause is a defensive clause rather than a live branch. THE AMENDMENT SHOULD STATE WHICH IT IS, because a defensive clause and a live branch have different register rows and different red-set drives.**

---

## §15. THE ARCHITECT'S ANSWER SET OF 2026-10-11 — the path made optional, the tier fixed at creation, and the monotonic refusal made real

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the questions they answer).**

> Make path an optional arg. If provided check that the provided file address is reachable (fail verbosely if not) and then create the registry at `file` tier. Otherwise, create at `mem`
> Fix at creation
> Fails as usual for an unpermitted write

**THE THREE RULINGS, TRANSCRIBED AS `A49`–`A51` — the first of which is the one that moves a shipped construction clause.**

| # | The question it answers (`§14.3`) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A49`** | **`Q-1` — what *"a configured save file is present"* means** | ***"Make path an optional arg. If provided check that the provided file address is reachable (fail verbosely if not) and then create the registry at `file` tier. Otherwise, create at `mem`"*** | **THREE THINGS: (1) THE `filePath` CONSTRUCTION ARGUMENT BECOMES OPTIONAL — the shipped clause that makes its absence `ConstructionArgumentMissing` at construction (`DD-17`) is SUPERSEDED, and *"missing"* stops being an error for that key while remaining one for `journalLength`; (2) IF PROVIDED, THE PATH IS CHECKED FOR REACHABILITY AT CONSTRUCTION AND AN UNREACHABLE PATH FAILS VERBOSELY — a new construction failure arm; (3) THE REGISTER'S TIER FOLLOWS THE PATH'S PRESENCE: PROVIDED AND REACHABLE ⇒ THE REGISTER IS CREATED AT `file`; ABSENT ⇒ AT `mem`.** **So `A42`'s *"or `mem` otherwise"* arm is LIVE, not defensive: the absent-path store is a real, supported configuration whose register stands at `mem`.** | **it does not name the fail-code for an unreachable path at construction** — the shipped fail set is CLOSED at `14` members (`§8.1`), and the amendment must either REUSE an existing member (the nearest being `ConstructionArgumentMissing`, whose trigger is a *missing or invalid* argument — an unreachable path is arguably *invalid*) or ADD one as a declared change with its arithmetic reconciled; **nor whether reachability means the parent directory exists, or the file itself is writable, or both** |
| **`A50`** | **`Q-2` — fixated or moving** | ***"Fix at creation"*** | **ANSWERED: THE REGISTER'S TIER IS FIXATED AT CREATION AND NEVER MOVES — a store created without a path stays `mem` for its whole life (its `file` tier being unreachable at register keys), and a store created with a reachable path stays `file`; there is NO re-tiering when a file appears or disappears.** **This closes `§14.2` (2)'s edge: the empty-address reference answers ONE tier for the instance's lifetime.** | it does not say what a *later* disappearance of the file means to an already-`file` register (a `file` write whose commit fails is `DD-25`'s `FileCommitFailed`, already ruled — the tier does not change) |
| **`A51`** | **`Q-3` — refused or carved out** | ***"Fails as usual for an unpermitted write"*** | **ANSWERED, AND THE CARVE-OUT DIES: the shipped `§1.2` clause (*"the register has no parent anchor and therefore imposes no upper bound on its children"*) is SUPERSEDED — the register's bound is REAL, and a write whose tier outranks the register's own tier FAILS with the usual `ParentAnchorMonotonicityViolation` (`§3.4` `F-6`; `§8.1`).** **Consequence: in a store created WITHOUT a path (register at `mem`), ANY `file`-tier write fails — at a register key and, through the monotonic chain, anywhere below it.** | it does not restate the read side (a `file`-qualified read in a `mem`-register store answers `TierNotFound`, the shipped `L-TIER` arm, which stands) |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE AMENDMENT NOW TOUCHES THE CONSTRUCTION SURFACE: `filePath` becomes optional (`DD-17` moves), a reachability check joins the construction, and the register's tier is a construction-time determination fixed for the instance's life.** **(2) THE TWO STORE SHAPES ARE REAL AND BOTH ARE SUPPORTED: a `file`-register store (path provided and reachable) in which all three tiers are usable at register keys, and a `mem`-register store (no path) in which the `file` tier is UNREACHABLE — the latter is the shipped test suite's own default arm (it constructs stores without a path in several drives) and its behaviour must be re-derived where the amendment makes the register's bound real.** **(3) THE BOOT DIVIDES ALONG THE SAME LINE: a `mem`-register store has no configured file to load (the shipped boot declares *"nothing is watched"* and starts clean); a `file`-register store loads its committed state — the amendment states both.** **(4) ONE MECHANICAL ITEM REMAINS OPEN, NAMED SO IT IS NOT DISCOVERED LATER: the fail-code for an unreachable path at construction (reuse `ConstructionArgumentMissing`, or add a member to the closed set with its arithmetic reconciled). THE AMENDMENT MAY STATE IT AS A PRICED `DECLARED-DEFAULT` OR THE ARCHITECT MAY RULE IT IN ONE LINE.**

---

## §16. THE ARCHITECT'S REACHABILITY AND FAIL-CODE RULINGS OF 2026-10-11

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Reachable means the file exists or that the application can write it successfully. Add new failure code

**THE TWO RULINGS, TRANSCRIBED AS `A52`–`A53`.**

| # | The question it answers (`§15`'s own open items) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A52`** | *what does "reachable" mean at construction?* | ***"Reachable means the file exists or that the application can write it successfully."*** | **ANSWERED, AS A DISJUNCTION WITH TWO ARMS: (a) THE FILE EXISTS at the provided path, OR (b) THE APPLICATION CAN WRITE IT SUCCESSFULLY.** **So a first boot with a fresh path is REACHABLE (arm (b)), and a path whose directory is absent or unwritable from both arms is UNREACHABLE and fails at construction.** **Read with `A49`, a store whose path passes either arm is created with its register at `file`.** | **it does not say WHAT ARM (B) LEAVES BEHIND** — does the reachability probe CREATE the file (and with what content: an empty file, or a committed empty registry — which `A43`'s read and the boot would then load), or is the probe a dry-run that leaves the file system untouched? **This is a real branch: a probe that commits an empty registry makes the first boot's bytes non-empty and is what a later `file` write overwrites; a dry-run leaves the file absent until the first write.** **Nor does it say whether arm (a)'s *"exists"* must also be READABLE/WRITABLE (an existing but read-only file passes (a) and fails (b) — the two arms can disagree)** |
| **`A53`** | *the fail-code for an unreachable path at construction* | ***"Add new failure code"*** | **ANSWERED: THE FAIL SET GROWS BY ONE — a NEW MEMBER is added for the unreachable-path construction failure, taking the set from `14` to `15` members, with every printed arithmetic reconciled (`11 + 1 + 1 + 1 + 1 = 15` in its own terms) and the register and red set gaining the drive.** **`ConstructionArgumentMissing` KEEPS its own trigger (a missing or invalid `journalLength`) and is NOT reused for this state.** | **it does not NAME the member** — the closed set's members are UPPER-camel tokens matching their trigger, and the name is the amendment's to mint (a priced `DECLARED-DEFAULT` the architect may correct in one line, or his own one-line naming); **nor does it say where the new member sits in the set's canonical order** (the shipped set is ordered by group, and a construction member belongs with `ConstructionArgumentMissing`'s group) |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE CONSTRUCTION SURFACE NOW CARRIES THREE RULES WHERE IT CARRIED ONE: an optional path, a two-armed reachability test, and a dedicated failure code — with `filePath`'s absence no longer an error and `journalLength`'s absence still one (`DD-17` narrowed, not deleted).** **(2) THE FAIL SET'S COUNT MOVES FOR THE FIRST TIME SINCE THE GATE-4 AMENDMENT ADDED `FileCommitFailed`: `14 → 15`, so EVERY cell that prints the set's size, its arithmetic, or its span is reconciled in the amendment's pass (`§8.1`'s member table, its heading, the register's `P-TP-9` row's drives, the shipped red set's `CLOSED_CODES` array and its count assertions — the LAST of which the amendment's TestWriter re-derives).** **(3) THE REGISTER'S TIER AND THE PROBE'S SIDE EFFECT ARE ONE DECISION: if arm (b) commits, then *"created at `file`"* implies bytes on disk at construction; if it is a dry run, it does not — and the amendment's boot clause, its `file`-bytes clause and its first-write clause all read differently. THE AMENDMENT STATES IT AS A PRICED `DECLARED-DEFAULT` OR THE ARCHITECT RULES IT IN ONE LINE.**

---

## §17. THE ARCHITECT'S CONSTRUCTION-SEQUENCE RULINGS OF 2026-10-11 — the default name, the dry run, and the listener array populated before the registry

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the items they answer).**

> Default name
> Dry run. File must have write access.
> Accept listener array as args, and populate home map before generating registry.

**THE THREE RULINGS, TRANSCRIBED AS `A54`–`A56`.**

| # | The question it answers (`§16`'s open items) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A54`** | *the new member's name* | ***"Default name"*** | **ANSWERED: THE AMENDMENT MINTS THE NEW MEMBER UNDER THE NAME THE SUPERVISOR PROPOSED AS THE DEFAULT — `FilePathUnreachable` — its trigger being the two-armed reachability test of `A52`/`A55` failing at construction, and its place in the shipped set's canonical order being the CONSTRUCTION GROUP, beside `ConstructionArgumentMissing`.** **The set stands at `15` members with every printed arithmetic reconciled.** | it does not restate the token's spelling case (the shipped set is UPPER-camel throughout, and the name follows it) |
| **`A55`** | *what the probe leaves behind, and which arm governs* | ***"Dry run. File must have write access."*** | **TWO THINGS: (1) THE REACHABILITY PROBE IS A DRY RUN — it writes NOTHING: no empty file, no committed empty registry, and the first boot of a fresh path leaves the file system untouched until the first `file`-tier write commits; (2) WRITE ACCESS IS REQUIRED — so an EXISTING BUT READ-ONLY FILE FAILS, and `A52`'s disjunction is read as *"the application can write it successfully"* GOVERNING over *"the file exists"* wherever the two disagree.** | it does not say what the probe does to a path whose PARENT DIRECTORY is absent but whose file could be created (does it attempt creation in a dry run, i.e. is a creatable path reachable?), nor what a path that is a DIRECTORY answers (the shipped red set drives that state as a `FileCommitFailed` on a `file` write; at construction it is a candidate for the new code) |
| **`A56`** | *what the register's carrier node and the nodes' borrows start from at creation* | ***"Accept listener array as args, and populate home map before generating registry."*** | **ANSWERED, AND IT IS A CONSTRUCTION ORDER: the construction takes a LISTENER ARRAY as an argument; the HOME MAP IS POPULATED FROM IT **BEFORE** THE REGISTRY IS GENERATED — so when the register (and its carrier node, at `[]`, per `A41`) comes into being, the home it borrows from (`A45`) IS ALREADY POPULATED, and the register's carrier node carries all listener references from the outset (the proposal's third sentence, now with a stated source).** **The construction sequence is therefore: (i) take the arguments (`filePath?`, `journalLength`, `listeners[]`); (ii) probe the path (dry run, `A55`); (iii) fail `FilePathUnreachable` or fix the register's tier at creation (`A49`/`A50`); (iv) POPULATE THE HOME MAP from the listener array; (v) GENERATE THE REGISTRY — whose carrier node borrows from the populated home.** | it does not say the listener array's ELEMENT SHAPE (an address? an address plus a tier? an address plus a handle?), nor whether the array may be EMPTY, nor what the store does with a DUPLICATE address in it (the shipped `§6.5` item 2 declares address-level idempotence for `watch`; whether construction shares that rule is unstated), nor how an entry in the array that names an address with NO NODE behaves (the graph is empty at that moment — there is nothing to address) |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE CONSTRUCTION SURFACE IS NOW FULLY SPECIFIED IN THE ARCHITECT'S OWN TERMS: `filePath?` (optional, dry-run-probed, write-access-required) · `journalLength` (required) · `listeners[]` (populated into the home before the registry is generated); a new member `FilePathUnreachable` (set `14 → 15`); a register tier FIXED at creation (`file` when the path passes, `mem` otherwise); and a stated construction SEQUENCE whose step (iv) precedes step (v).** **(2) THE HOME IS POPULATED AT CONSTRUCTION AND THEREFORE SURVIVES AS THE INSTANCE'S OWN STATE — which settles the persistence axis's first half (the home exists from construction, instance-scoped) and leaves the second half (whether it participates in the `file` bytes and the boot) as the amendment's priced default.** **(3) WHAT REMAINS IS MECHANICAL AND SMALL: the listener array's element shape and its duplicate/empty cases (`A56`'s silences); the path-is-a-directory state at construction; and the four unparked surface subjects (order · attachment · firing/invocation · throwing body), with `P-1`'s crossing still parked.**

---

## §18. THE ARCHITECT'S LISTENER-RECORD RULING OF 2026-10-11 — an address that binds it and a handle it returns

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Listener has an address to determine where it binds and a handle that it returns to alert the client of the trigger

**THE RULING, TRANSCRIBED AS `A57` AND MAPPED — and it closes more than one of the gate's open items at once.**

| # | What it answers | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A57`** | **the listener's RECORD SHAPE** (`A56`'s element-shape silence) · **the ATTACHMENT RULE** (the park's subject 2) · **the FIRING MODEL** (subject 3) · **the THROWING BODY** (subject 4) | ***"Listener has an address to determine where it binds and a handle that it returns to alert the client of the trigger"*** | **FOUR THINGS: (1) A LISTENER IS `{ address, handle }` — an ADDRESS that determines WHERE IT BINDS, and a HANDLE; (2) BINDING IS **BY ADDRESS** — the park's attachment question is answered on its face: the address determines where it binds, so the listener follows the ADDRESS and not the node's identity; (3) THE FIRING MODEL IS **RETURN-BY-HANDLE**: the store does not CALL anything — **it RETURNS the handle, and the handle is what alerts the client of the trigger** — so the invocation is the CLIENT'S act, outside the store, and the parked JS crossing (`P-1`) is not on the firing path at all; (4) A CONSEQUENCE THE GATE RECORDS PLAINLY: **A THROWING BODY IS NOT A STORE STATE** — if the store never invokes a body, no body can throw inside a store operation, so the park's fourth subject (`J-67`) has no subject inside this unit; what the client does with the handle it is returned is the client's.** **This also answers `A56`'s element shape: the construction's listener array carries `{ address, handle }` ENTRIES.** | **it does not say what the HANDLE IS** — its type, whether the CLIENT supplies it or the STORE mints it, its uniqueness domain, or its relation to the shipped `WatchHandle` (the contract's existing opaque handle returned by `watch`, `DD-23`/`§6.5` item 6, which today is the ONE value `unwatch` accepts); **nor whether the ADDRESS carries a TIER** (the shipped `watch` accepts an optional tier, `DD-26`); **nor the ORDER of the handles a trigger returns** (the park's subject 1 remains open, and is now the only one of the four that is) |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE PARK'S FOUR SUBJECTS NOW READ: attachment ANSWERED (by address, `A57`), firing ANSWERED (the store returns the handle; the client invokes), a throwing body MOOT inside this unit (the store never invokes a body) — and ORDER alone still open (the sequence of the handles a write or a delete returns).** **(2) THE FIRING MODEL NO LONGER NEEDS `P-1`:** the store's contract is *"return the handles of the triggered listeners"*, a pure Rust value crossing the store's own function surface — so a Rust caller is served today, and the parked JS crossing is only about how a JS client eventually receives that list. **`P-1` therefore does not block the listener surface; it blocks the JS consumer of it.** **(3) THE HANDLE'S ONE UNRESOLVED EDGE IS THE SHIPPED ONE: the contract already carries an opaque handle for `watch`/`unwatch`, and the ruling's handle is what a trigger RETURNS. Whether they are ONE handle (the shipped one, given a return path on a trigger) or TWO (a registration handle for withdrawal and a separate alert handle) is the amendment's to reconcile — one clause, with the shipped `§6.5` item 6 and `DD-23`'s fate recorded.** **(4) ORDER REMAINS, AND IT IS NOW ASKABLE IN ONE LINE: in what sequence are the triggered listeners' handles returned — registration order, address order, or unspecified?** **Unspecified is a lawful answer; the contract would then declare order-insignificance and the register's drive would assert that instead.**

---

## §19. WHAT THE SHIPPED `watch` PAYS ATTENTION TO — the gate's answer to the architect's question, at the contract's and the code's own bytes

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES. This section answers the architect's question *"What is the watch currently paying attention to?"* and takes no ruling.**

**THE RECORD IT HOLDS (the code's own shape, `src/store.rs`).** **A registration is `{ registration: u64, address: Vec<Segment>, qualifier: Option<Vec<Tier>> }` — an instance-local id, THE CALLER'S WATCHED ADDRESS, and an OPTIONAL TIER QUALIFIER.** **The store holds a list of them; `watch(address, tier?)` returns an OPAQUE `WatchHandle`; `unwatch(handle)` removes ONE registration, and an unknown handle is a no-op success.** **Registering the same address twice is IDEMPOTENT AT THE ADDRESS LEVEL (`§6.5` item 2).**

**WHAT IT PAYS ATTENTION TO — ONE CONDITION, THREE TERMS.** **On a SUCCESSFUL WRITE at address `X` with tier `t`, a registration is RETURNED iff: (i) its ADDRESS is a PREFIX of `X` — **descendant-inclusive**, so watching `['tabs']` matches a write at `['tabs','page','title']` (`A33`/`A37`; `§6.5` item 3); **and** (ii) where the registration was made WITH a tier argument, `t` is ONE OF ITS TIERS (`DD-26`; `§6.5` item 7 (a)–(c)); **and** (iii) the address appears ONCE in the returned list even when it was registered at two tiers.**

**WHAT IT RETURNS — AND WHAT IT DOES *NOT*.** **It returns THE WATCHED ADDRESSES (`watched: Vec<Vec<Segment>>` on the write's `WriteResult`) — not values, not node references, not handles, and nothing is ever INVOKED.** **And it is returned ON A SUCCESSFUL WRITE **ONLY** (`§6.5` item 4): a `delete` answers a two-member `DeleteReceipt { address, tiers }` and carries NO watched list; a refused write carries none; a read, a rollback and the boot carry none.** **It therefore pays NO attention to the value written, to the written node's identity, to how many registrations an address has, or to any event other than a successful write.**

**THE DELTA, AS THE GATE READS IT — stated so the amendment's reconciliation clause is one paragraph and not an archaeology.** **The shipped watch ALREADY holds the address (the binding, `A57`'s first half) and a per-registration id; WHAT IT LACKS for the listener design is exactly THREE THINGS: (1) a HANDLE that is RETURNED ON A TRIGGER — today the trigger's answer carries ADDRESSES, and the listener's `{ address, handle }` shape (`A57`) wants the handle back; (2) the SECOND TRIGGER EVENT — today only a successful WRITE returns the list, while `A43` rules that listeners fire on `write` **and** `delete`; and (3) the per-node BORROWS FOR LOOKUP COST (`A45`), which the shipped form does not carry at all (it scans its registrations per write).** **Everything else is already shipped and green.**

---

## §20. THE ARCHITECT'S STOPGAP RULING OF 2026-10-11 — the shipped `watch` is a stopgap for this implementation

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Watch is a stopgap for the listener implementation

**THE RULING, TRANSCRIBED AS `A58` — and it changes the amendment's SHAPE, not merely its content.**

| # | What it settles | The ruling (verbatim) | What it does NOT say |
| --- | --- | --- | --- |
| **`A58`** | **the shipped `watch` surface's STANDING** — and, with it, the reconciliation the gate had framed as *"one handle or two"* (`§18`'s `(3)`), the delta `§19` names, and the fate of the shipped register row `P-TP-8` and its red-set file | ***"Watch is a stopgap for the listener implementation"*** | **THE SHIPPED WATCH SURFACE IS A STOPGAP — a PLACEHOLDER the architect put in place to be SUPERSEDED once the listener implementation lands — and NOT a peer surface to be reconciled with it clause by clause.** **CONSEQUENCES THE GATE READS FROM THOSE WORDS: (1) THE LISTENER SURFACE REPLACES `watch`, `unwatch` and the address-returning `watched` list — the amendment SUPERSEDES them rather than merging them; (2) `A57`'s HANDLE IS THE ONE HANDLE, so the *"one handle or two"* question the gate flagged is answered by the stopgap reading: the shipped `WatchHandle` was the stopgap's own handle and the listener's handle takes its place; (3) THE SHIPPED REGISTER ROW `P-TP-8` (`§5.8`, the watched-address-list property, `S-WATCH`, `8` attempts) is RE-DERIVED to the listener's property — handles returned, TWO trigger events (`A43`), the home populated at construction (`A56`) — and (4) THE SHIPPED RED-SET FILE `tests/watched_addresses.rs` (`13` drives) is RE-DERIVED BY ITS AUTHOR ROLE (`role_test_writer`) against the superseding clauses.** | **it does not say whether `watch`'s CLAUSES ARE DELETED OR ANNOTATED `SUPERSEDED` IN PLACE — the repository's own convention is annotate-beside, never delete, so the amendment states the supersession with its pointer and keeps the as-filed text visible; nor does it set a DEPRECATION WINDOW (may both surfaces stand briefly, or does the listener surface land in one pass?); nor does it say what becomes of the shipped `WriteResult.watched` member's NAME** |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) WHAT THE STOPGAP RULING MAKES SIMPLER: the listener surface is a REPLACEMENT and not a second vocabulary — so the amendment needs ONE set of registration/trigger clauses, ONE handle, and ONE returned shape, instead of reconciling two surfaces term by term.** **(2) WHAT IT MAKES LARGER: the shipped unit's GREEN FIGURES MOVE. `tests/watched_addresses.rs`'s `13` drives are re-derived (so the shipped `196` is a figure of the PRE-amendment tree), the register's `P-TP-8` row's property and failure list move with them, and the shipped `DONE` row's cells owe dated re-measures with their layers stated — exactly the audit duty the gate's record names (`AR-16`) and the class `DEF-5`/`DEF-7`/`DEF-10` keep recurring as.** **(3) THE `watched` MEMBER'S FATE IS THE AMENDMENT'S TO STATE: either it carries the TRIGGERED HANDLES under the same name (a silent meaning change — refused as a filing practice), or it is re-named with the shipped member annotated beside its replacement, or it is kept for addresses and a second member carries handles (the least disruptive, and the one the gate would default to).** **(4) THE PARK `P-1` REMAINS UNTOUCHED: the stopgap is a STORE-SIDE surface, and nothing here lifts or reaches the JS integration.** **NO PARK IS READS AS CLOSED, NO UNIT ROW IS ADMITTED AND NO LEDGER COUNT MOVES.**

---

## §21. THE ARCHITECT'S NUMERIC RULINGS OF 2026-10-11 — the canonical file spelling, and the out-of-bounds refusal

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (numbered as the two decisions the e2e battery put to him).**

> 1. Normalize into file
> 2. Refuse out-of-bounds numbers

**THE TWO RULINGS, TRANSCRIBED AS `A59`–`A60`, EACH ANSWERING ONE OF THE BATTERY'S FINDINGS.**

| # | The finding it answers | The ruling (verbatim) | What it settles | What it does NOT say |
| --- | --- | --- | --- | --- |
| **`A59`** | **`CF-2` — the `-0` inexactness: `write(["root"], file, -0)` read back `0` after the `file` tier's JSON text and a boot, with NO clause declaring a canonical number spelling (`§1.4` class 3 + `§0.4`'s `Num(f64)` + `§7.2` item 6/`M-12`)** | ***"Normalize into file"*** | **ANSWERED: THE `file` TIER'S JSON TEXT CARRIES A CANONICAL NUMBER SPELLING — the number is NORMALIZED ON THE WAY INTO THE FILE, so `-0` is written as `0` (and, by the same rule, the OTHER non-canonical spellings a JSON literal may take — `1e2`, `1.0`, `1E+2` — are written in their canonical form).** **CONSEQUENCES: (a) the round trip through the `file` tier and a boot is EXACT-MODULO-THIS-DECLARED-NORMALIZATION, so the battery's `-0` case is no longer an inexactness but a declared normalization; (b) IN MEMORY (`mem`/`temp`) THE SIGN IS NOT TOUCHED — the normalization is a property of the FILE's IMAGE, not of the value the store holds, so a `mem`-tier `-0` reads back `-0` and only the committed bytes carry `0`; (c) `P-IM-1`'s *"byte-equal after a JSON round trip"* half is thereby SCOPED: byte-equal against the CANONICAL spelling, not against the caller's literal.** | **it does not name the canonical spelling's RULE** — what a float is written as (`0.1`? `1e-1`? the shortest round-trip form? a fixed precision?), nor whether a canonical spelling is REQUIRED on the read side (a `file`-loaded value read out) or only on the write-to-file side, nor whether the canonical form is observable to a caller at all (it is, only through the `file` bytes) |
| **`A60`** | **`CF-3` — an integral JSON number ABOVE `2^53` has NO EXACT CARRIER (`§1.4` admits *"a finite JSON number"* unbounded while `§0.4` carries `Num(f64)`: `9007199254740993` rounds IN THE CARRIER, so the admitted value cannot even be written)** | ***"Refuse out-of-bounds numbers"*** | **ANSWERED: A NUMBER OUTSIDE THE CARRIER'S EXACT RANGE IS REFUSED — the admitted numeric domain is BOUNDED, and a value beyond it answers `ValueNotAdmitted` (the fail set's existing member for the taxonomy) rather than being silently rounded.** **So the taxonomy's *"a finite JSON number"* is NARROWED to the f64-exact range, and the refusal is the declared answer for the out-of-bounds value.** | **it does not state the BOUND'S PRECISE PREDICATE** — is it the integral range `|n| ≤ 2^53` (the f64-exact integers), or "every number whose literal the carrier cannot represent exactly" (which would also refuse nothing else, since every f64 IS exactly representable — a distinction that decides whether `2^53 + 1` is the ONLY shape refused or whether some non-integral literal is too)? **nor whether a caller can observe the refusal's TRIGGER (the value) as against its code** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) BOTH RULINGS ARE THE ARCHITECT'S ANSWERS TO FINDINGS THE E2E BATTERY PRODUCED — the battery did its job: it took the directive *"expect exact match in all cases"* literally and surfaced the two places the contract could not honour it.** **(2) THE TWO ARE NOT THE SAME KIND OF RULE: `A59` is a NORMALIZATION (the value is admitted, the FILE's spelling is pinned) while `A60` is a REFUSAL (the value is not admitted at all) — so the contract must state them in different places, the first at the `file` tier's bytes clause and `P-IM-1`'s scope, the second at the value taxonomy (`§1.4`) and the fail set's `ValueNotAdmitted`.** **(3) THE SPEC PASS OWES BOTH AS CLAUSES, and the battery's own cells are re-derived to read them: the `-0` case becomes an asserted DECLARED NORMALIZATION (with the `mem` half asserting the sign IS preserved in memory), and an OUT-OF-BOUNDS case is added asserting the refusal — after which the battery should be `104/104` (or `103/103` with the re-derived `-0` cell) and the suite green.** **NO PARK IS TOUCHED, NO UNIT ROW IS ADMITTED, AND THE LEDGER STANDS AT `1 DONE / 1 open` UNITS = `2`.**

---

## §22. THE ARCHITECT'S INDEX RULING OF 2026-10-11 — the per-node listener index stays OPTIONAL

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (the answer to the fork the supervisor put to him after his own question *"How does it fire if it's bound only to the home and not referenced within the graph?"*).**

> Keep optional

**THE RULING, TRANSCRIBED AS `A61` — and it CONFIRMS a standing clause rather than moving one.**

| # | What it answers | The ruling (verbatim) | What it settles | What it does NOT say |
| --- | --- | --- | --- | --- |
| **`A61`** | **the design fork the supervisor laid out: (a) make the per-node index MANDATORY (a bounded amendment + a host pass to materialise it + ONE declared observable, since with the sets required to be identical either way the index is behaviourally unobservable), or (b) KEEP IT OPTIONAL and accept the home scan per edit** | ***"Keep optional"*** | **ROUTE (b), AND IT CONFIRMS WHAT THE CONTRACT ALREADY DECLARES: the per-node `active`/`carried` index REMAINS OPTIONAL (`DD-41`), `P-SM-4` (f) STAYS CONDITIONAL ON ITS MATERIALISATION, and no host change, no new observable and no contract amendment is owed.** **AND TWO CONSEQUENCES FOLLOW, EACH WORTH STATING SO THE QUESTION IS NOT REOPENED:** **(1) THE FIRE RULE IS THE PREFIX TEST OVER THE HOME — the write or the delete is the ONLY caller (`src/store.rs`'s `triggered_for`/`watched_for`, at the write's and the delete's own return sites), and it returns every home entry whose address is a prefix of the edit's address; that is `A33`/`A37`'s descendant-inclusive rule, and it is what the e2e listener battery asserts arm by arm.** **(2) THE `ACTIVE`/`PASSIVE` PARTITION DESCRIBES HOW A MATERIALISED INDEX WOULD BE ORGANISED — NOT WHAT FIRES: the partition's exact-address reading (*"any listener addressed to the current node is added to the active, all others are passive"*) would, taken as the fire rule, contradict the descendant-inclusive rule; under this ruling the partition is a property of the OPTIONAL index and the home scan's prefix test governs the returned set. `THE SUPERVISOR'S OWN READING, RECORDED AS SUCH AND CONFIRMED BY THE CONTRACT'S SET-EQUIVALENCE CLAUSE (`§5.8` (d)) AND THE PASSING BATTERY.** | **it does not forbid a FUTURE materialisation: `DD-41`'s priced alternative stands, and a later implementation that builds the index still owes the set-equivalence (`§5.8` (d)) and would then owe propagation on the registration verbs and the carried-chain fire rule (all of which stay OWED to that pass, not to this one)** |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) NOTHING MOVES: no contract clause is amended (the optionality is already declared), no `DD` row is added (the `DD` census stays `46`), no register row's condition changes (`P-SM-4` (f) stays conditional as its own `AM-2` resolution wrote it), no fail-set member moves, and NO BYTE OF `src/**` OR `tests/**` IS OWED.** **(2) THE SUPERVISOR'S ANSWER TO THE ARCHITECT'S QUESTION STANDS AS THE RECORD OF WHY FIRING WORKS WITHOUT A GRAPH REFERENCE: the change is the trigger and the home is pulled by it — `triggered_for` is called at the write's and the delete's return sites and nowhere else, so a listener fires EXACTLY when a graph change at (or below) its address happens, and at no other time.** **(3) THE AMENDMENT'S OPEN LIST IS NOW SHORT AND NAMED: the residual bound-predicate alignment in the contract's own sentence (a one-line SpecWriter fix; the crate and the cells agree with each other), the carried `src/records.rs` doc comment (*"two-member result"* where the struct carries three — the implementer's, doc-only), and the close-out landing (the amendment's `DONE`-row cells and the archival loop).** **NO PARK IS TOUCHED (`P-1` stays `OPEN`), NO UNIT ROW IS ADMITTED, AND THE LEDGER STANDS AT `1 DONE / 1 open` UNITS = `2`.**

---

**END OF THE PROPOSAL.** **⟶ AMENDED 2026-10-11 BY §8: the architect CLARIFIED that the register HAS A PARENT ANCHOR, whose address is the EMPTY SET `[]` — which gives the proposal's third sentence its referent and puts the shipped contract's *"the register has NO parent anchor"* clause, its `§1.5` item 4 re-reading, and the register reference in the code into the amendment's own re-read.** **§1 is the architect's own proposal, byte-for-byte. §2 is the measured context. §3
is the filing's bounds. §4 is a quotation table with no reading taken. §5 is a map of adjacencies with no
ruling. §6 records the adoption trigger's premise and leaves its determination to the gate. §7 is the
provenance and the ledger move. No behaviour clause, no signature, no return shape, no fail-state and no
ruling is asserted anywhere in this file.**
