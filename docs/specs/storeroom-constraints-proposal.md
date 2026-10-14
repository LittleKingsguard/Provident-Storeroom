# PROPOSAL — `U-STOREROOM-CONSTRAINTS` (provisional id): constraint / repair functionality built on the listener system, for `0.2.0`

**Filed 2026-10-13 by the supervisor — a byte-verbatim transcription of the architect's proposal text, and nothing else.** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, no signature, no return shape and no fail-state; it admits no unit row, moves no ledger count, delegates no red set and enters no gate. **Gate state: GATE 1 OPENED, NOT PASSED — the four steps run on THIS FILE, then the architect's go-ahead.** **The id `U-STOREROOM-CONSTRAINTS` is PROVISIONAL and this filing's own invention: the FORM determination (new unit · bounded amendment of a shipped contract · successor) is step 3's output, and the step-4 verdict and record are the authority for it.**

**What this pass authored, stated so the file's own scope is checkable: THIS FILE ALONE.** No tracker byte, no spec byte, no `src/**` byte, no `tests/**` byte, no proposal-review record, no dossier, no `archive/**` byte was written by this pass. **No analysis is authored here** — §2 is a POINTER list (paths and ids) and states no verdict, no finding and no collision. **Nothing was run: no `cargo`, no test, no build, no shell beyond the file reads this filing's own transcription required.**

---

## §1. THE ARCHITECT'S PROPOSAL, VERBATIM

> **Proposal for 0.2.0: A constraint/repair functionality built on top of the listener system**
>
> A constraint is a specialized listener that runs before other listeners and confirms if the data shape is valid. It is registered along with a watch address and an id, and can return True (constraint passes), a repair function + message, or an error message.
>
> The repair function then attempts to make an edit that fixes the constraint-violating data. It returns a success true/false and a message explaining the change made/attempted
>
> Included in the design is two additional registers
>
> - Constraints stores the constraint functions separately from the default listeners
> - Commits tracks the returned messages, ops created, and what constraints/repairs have already been run for a given write attempt from a listener or external call
>
> When a write is attempted, the op is added to the commit registry. Any constraint functions that are violated are also added to the commit. If a repair is made and successfully creates a new op, that op is added, and the triggered constraints run again. If a constraint fails without a repair, or if it fails and it is already in the commit registry for failing (ex. the repair it made failed or was broken by a different constraint's repair), the entire commit fails to prevent a cycle and rolls back, returning the message log to the app as an error message. A commit is removed from the registry after reporting failure or if it reaches a state where it passes all constraints (returning success).

---

## §2. THE POINTERS THIS FILING CARRIES (paths and ids only — no verdict, no finding, no collision, no preference)

**A pointer list is not an analysis and asserts nothing.** Every entry below is a path, an id or a named artifact **a reviewing step is asked to read at its own bytes**, given here so that no reviewing step's read set depends on a guess. **The reviewing steps are free to find more, and to find that an entry here is irrelevant.**

### §2.1 The proposal's own inputs

| # | The artifact | What a reviewing step may want it for |
| --- | --- | --- |
| 1 | `docs/specs/storeroom-constraints-proposal.md` (this file) | the artifact under review |
| 2 | `docs/specs/storeroom-listeners-proposal.md` | the prior listener filing — the mechanism this proposal says it builds on |
| 3 | `docs/specs/storeroom-listeners-proposal-review.md` | that filing's gate-1 record |
| 4 | `archive/gate1/storeroom-listeners-review/{1-validity,2-critique,3-architecture}.md` | that gate's three step reports |
| 5 | `docs/specs/storeroom-native-proposal.md` (`§8`, `§9`) | the native directive's amendment (the journal and rollback-by-walk) and the architect's answer set `A1`–`A8` |

### §2.2 The shipped tree this proposal would sit on

| # | The artifact | What a reviewing step may want it for |
| --- | --- | --- |
| 6 | `docs/specs/storeroom-native/contract.md` + its declared parts (`write-and-read.md`, `store-model.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`, `implementation-plan.md`) | the store's own contract: `§0.4` spellings, `§3.6` `WriteResult`, `§4.4` `DeleteReceipt`, `§6.2`/`§6.3` the journal and the rollback, `§6.5` the listener surface, `§8` the closed fail-code set |
| 7 | `src/lib.rs`, `src/records.rs`, `src/args.rs`, `src/store.rs`, `src/error.rs`, `src/value.rs` | the shipped Rust surface — the record shapes as built, the listeners' home, the trigger's selection, the verbs |
| 8 | `tests/**` (`e2e_listener_firing.rs`, `properties.rs`, `journal_and_rollback.rs`, `write_arms.rs`, and their siblings) | what is pinned today, and the register's executed layer |
| 9 | `Cargo.toml` (`version = "0.1.0"`) · `bindings/js/package.json` · `docs/specs/storeroom-publish/**` | the versions in the tree, and the semver policy the publish unit priced |

### §2.3 The standing rulings a reviewing step is asked to read before judging

| # | The artifact | What a reviewing step may want it for |
| --- | --- | --- |
| 10 | `docs/decisions.md` — the ACTIVE rows naming `A41`–`A45` (the listener unpark, the register's carrier node and tier, the listener's firing model) and `A46`–`A58` (the listener amendment's answer set: the one home, `listen`/`unlisten`, the `triggered` member, the firing model) | the shipped listener surface's own rulings, including what the store does and does not do when a listener is triggered |
| 11 | `docs/decisions.md` — the ACTIVE row naming `A70`·`A71`·`A72`·`A73`·`A74` (the JS package's realm, its published artefact with prebuilds, its one-row dossier, **`A73`** and **`A74`**) | **`A73` is the architect's standing ruling on this proposal's subject-matter**; `A74` is cited here only as an id in the same row |
| 12 | `docs/next-steps.md` (`## CURRENT WORK / HANDOVER STATE`, `## OPEN`, `## DONE`, the `N*` rows, the `L-*` rows) · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | the ledger, the parks, the open items and the handoff state as of this filing |
| 13 | `docs/pending.md` — the listener/constraint-related parks (their ids and their lift clauses) | whether a park bearing on this subject stands or has been lifted |
| 14 | `docs/next-steps.md` — the row `L-10` (the architect's `A1`–`A7` answer set and its consumption) | **`A1`–`A8` are cited there with their own words, and one of them bears on constraint/repair evaluation** |

### §2.4 The process rules a reviewing step is bound by

| # | The artifact | What a reviewing step may want it for |
| --- | --- | --- |
| 15 | the gate-1 preset (the topology, the closed verdict vocabulary `PROCEED` \| `APPROVE-WITH-CONDITIONS` \| `BLOCKED-ON-SEMANTICS` \| `FLAWED` \| `REJECTED`, the STEP-0 Semantics block, the `decomposition` row) | the shape of this gate's own record |
| 16 | `docs/specs/adoption-semantics-gate/contract.md` (in the adjacent `Agent Harness` project, read-only) | the STEP-0 trigger predicate, the identifier-row schema, the collision block and the snapshot duty |
| 17 | `docs/specs/spec-authoring-discipline/contract.md` (same project, read-only) | the claim ledger, the nine-column row form and the disposition vocabulary |

---

**§3 is not authored by this filing.** The gate's four steps' verdicts, findings, unions, the `decomposition` row's disposition, the Semantics block and the implementation plan are step 4's output onto this gate's record — `docs/specs/storeroom-constraints-proposal-review.md` — and step 3's onto `archive/gate1/storeroom-constraints-review/3-architecture.md`.

---

## §A. THE ARCHITECT'S ANSWERS — FILED 2026-10-13 BY THE SUPERVISOR, VERBATIM

**A FILING OF THE ARCHITECT'S OWN WORDS, AT GATE 1'S EXISTING PAUSE — the same act the native unit's answer set received (filed as that proposal's `§9`), and no analysis is authored here.** **`RCA-8(d)`: every clause of this filing above this section stands byte-for-byte and is read THROUGH this section; the closing clause's *"`§3` is not authored by this filing"* is read as TRUE of `§3` and is unmoved by this section, which is lettered and not numbered.** **This section asserts no behaviour clause, admits no unit row, moves no ledger count (`4 DONE / 0 open` UNITS = `4`) and delegates nothing.**

**The architect was put the gate-1 record's questions (`docs/specs/storeroom-constraints-proposal-review.md` `§7`, `Q1`–`Q8`) and answered `Q1` and `Q2`; the remaining six stand unanswered, and the record's `§7` is their home.** **The answers are consumed by a dated SUPPLEMENTARY `role_change_analysis` pass on the existing gate-1 record — no new pause, no new gate number, no nineteenth tool row.**

| # | Question as put | The architect's answer, verbatim |
| --- | --- | --- |
| **`§A.1`** | **`Q1` THE HOME — which side holds a constraint?** | ***"The handle is checked within the rust store as normal for listeners, the function is run in the node.js space (also like listeners)."*** |
| **`§A.2`** | **`Q2` THE FINITE TERMINATION BOUND** — what bounds a write attempt when a repair's own edit breaks another constraint's repair? | **Selected: *"Fail on the first repeat, never repeat a repair (corpus R15)"*** — the option as it was put to him reading: ***"A repair already recorded as applied may not run again; a second violation of the same constraint fails the attempt."*** |
| **`§A.3`** | **Not a gate-1 question: the tracker-volume remedy** (`DEF-2026-10-13-F`) | **Selected: *"Archival pass: superseded cells move byte-exactly to `archive/` with one-line pointers (`RCA-8(g)`)"*** — **a TRACKER duty and NOT gate material: it pins no unit behaviour, adds no ruling row and is consumed by the supervisor's own archival loop, not by this gate's record.** |

**WHAT `§A.1` NAMES, READ AS ITS OWN WORDS AND NOTHING MORE:** **the constraint's HANDLE is checked WITHIN THE RUST STORE — *"as normal for listeners"* — and the constraint's FUNCTION is run IN THE NODE.JS SPACE — *"also like listeners"*.** **It fixes the two sides' duties, and it does not, in these words, fix: the registration verb, the record shape that carries a constraint's address and id, the fail arm for a violated constraint, what a repair's write is issued through, what a `commit` is as a record, the rollback's reach, the message log's carrier, or which artifact the `0.2.0` of this filing's title names.** **Those remain `Q3`–`Q8`'s and the record's `§7` is their home.** **NO READING BEYOND THESE WORDS IS FILED HERE.**

---

## §B. THE ARCHITECT'S SECOND ANSWER SET — FILED 2026-10-13 BY THE SUPERVISOR, VERBATIM

**The remaining questions of the gate-1 record's `§7` (`Q3`–`Q8`) and the two the supplementary pass opened (`Q9`/`Q10`, legible through that record's `§10.2` rows `U26`/`U27`) were put to the architect, and he answered ALL EIGHT.** **Each cell below is the SELECTED OPTION EXACTLY AS IT WAS PUT TO HIM, with that option's own substance as it was put; no option text is reworded and nothing is added.** **`RCA-8(d)`: every clause of this filing above this section stands byte-for-byte and is read THROUGH this section.** **This section asserts no behaviour clause, admits no unit row BY ITSELF (the unit's admission is the consuming pass's act on the record), moves no ledger count, and delegates nothing.** **Read with `§A` (the first answer set), the architect has now answered EVERY question gate 1 put to him.**

| # | The question as put | The selected option, verbatim, with its own substance as put |
| --- | --- | --- |
| **`§B.1`** | **`Q3` THE REGISTER CARRIER** — which register carries the property rows for this work? | **Selected: *"(c) A NEW UNIT with its own `≤ 8` register"*** — as put: *"lawful; moves the census the architect ruled on"*. |
| **`§B.2`** | **`Q4` THE PUBLISH READING** — how is the publish contract's `MINOR` rule read? | **Selected: *"(a) READ IT AND ACT BEFORE ANY PUBLISH"*** — as put: *"recommended if any kernel member is a declared-surface member"*. |
| **`§B.3`** | **`Q5` THE ROLLBACK'S REACH** — how does *"the entire commit fails … and rolls back"* meet the shipped per-op instrument? | **Selected: *"(a) PER-OP `rollback` REPEATED OVER THE ATTEMPT'S OPS"*** — as put: *"the compacted floor named: per-op reach, never a claim past a compacted base."* |
| **`§B.4`** | **`Q6` THE ATTEMPT'S RECORD SHAPES** — what carries the returned messages, ops created and what has already run? | **Selected: *"(a) THE KERNEL'S OWN RECORD, DECLARED IN THE JS DIRECTORY"*** — as put: *"the message log's order the kernel's own (`AR-9`), nothing crossing the store's surface."* |
| **`§B.5`** | **`Q7` THE PROVISIONAL UNIT ID** — is `U-STOREROOM-CONSTRAINTS` admitted as a unit? | **Selected: *"(b) ADMIT A UNIT"*** — as put: *"with its own directory, register, dossier and red set — lawful; the ledger then reads `5 DONE / 1 open` or `4 DONE / 1 open` by the counting adopted"*. |
| **`§B.6`** | **`Q8` THE CONSTRAINT-FAILURE CHANNEL** — how does a constraint failure reach the caller? | **Selected: *"(a) THE CALLER'S OWN MESSAGE"*** — as put: *"the kernel's own failure form and **never** a store code; the closed set untouched; `RollbackCompacted`/`JournalOpUnknown` remain the only store-side arms a caller-side attempt can meet."* |
| **`§B.7`** | **`Q9` (the record's `U26`) THE REGISTRATION'S ENTRY** — how does a constraint's registration enter the one authoritative home, and may its handle stand at an address the home already holds? | **Selected: *"(b) A caller-side registry keyed by address + id (no store entry)"*** — as put: *"the store's listener machinery and its closed record shapes stay untouched; only the handle check duty sits store-side."* |
| **`§B.8`** | **`Q10` (the record's `U27`) WHAT MARKS A REPAIR APPLIED** — and who evaluates *"already recorded as applied"*? | **Selected: *"(a) The caller-side registry, declared by the amendment"*** — as put: *"`AR-23`'s own text names it the lawful home for *"already recorded as applied"* — nothing crosses the store's surface."* |

**TWO READINGS THE ANSWERS PUT BEYOND DOUBT, STATED SO NO LATER PASS INFERS THEM.** **(1) `§B.5` ADMITS A UNIT: the work's form is its OWN unit with its own directory, its own `≤ 8` register (`§B.1`), its own dossier and its own red set — so the ledger's count moves, and the `decomposition` row authored at gate 1 is superseded in its `disposition` by this answer (the `decider` cell is NOT rewritten: the architect answered).** **(2) `§B.7` AND `§B.8` PLACE BOTH THE CONSTRAINT REGISTER AND THE *"ALREADY APPLIED"* BOOKKEEPING CALLER-SIDE WITH NO STORE ENTRY, while `§A.1` keeps the HANDLE CHECK inside the Rust store *"as normal for listeners"*: read together, the store's part is its EXISTING listener-machinery duty and its closed record shapes are untouched, and the constraint's own register, attempt record and applied-repair record are the unit's own caller-side shapes.** **NOTHING IN THESE ANSWERS MOVES A STORE-SIDE CONTRACT BY ITSELF; every store-side change they name is `OWED` until its own ruling and its own amendment.**
