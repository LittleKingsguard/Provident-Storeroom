// `addon-adoption-support.mjs` — **THE RED SET'S SHARED HARNESS FOR `U-STOREROOM-ADDON-ADOPTION`**,
// authored from `docs/specs/storeroom-addon-adoption/**` ALONE. **NOTHING IN THIS FILE IMPLEMENTS THE UNIT.**
//
// This file carries the ONE thing the drives of `addon-adoption.test.mjs` cannot supply themselves — **the
// adoption statement `command-sites-and-residue.md §3-bis` owes** — and it states **what this red set
// requires of the landing pass.**
//
// **⟶ RE-DERIVED 2026-10-20, ON THE SPEC-WRITER'S CORRECTIONS, TWICE OVER.**
//
// 1. **THE FIRST PASS'S TWO PINS ARE STRUCK.** The `attemptCount` and `onAttemptOpened` names were this
//    file's own invention against a clause that declared the count's RULE and its HOME and **no name a drive
//    could read it by** — and the five `P-ADA-5` cells failed by THROWING that missing name rather than by
//    measuring a count. **`§4.2` closed that defect by declaring the seam by name, signature and return.**
// 2. **AND THE SECOND PASS'S RE-EXPORT OF THAT DECLARATION IS STRUCK WITH IT, BECAUSE THE DECLARATION'S
//    SPELLING WAS SUPERSEDED THE SAME DAY.** The seam's first declared home — *"an exported
//    `attemptCount(store)` / `onAttemptOpened(store, observer)` from `bindings/js/src/constraint-kernel.mjs`"*
//    — was IN CONFLICT with a standing, closed assertion that module's export set is exactly the six
//    `K-1`–`K-6` items, **so the clause was reconciled to two `Symbol.for`-KEYED CHANNELS ON THE STORE
//    INSTANCE** (`§4.2` item 3; `parameter-semantics.md`'s `PAR-ADA-19`; `implementation-plan.md`'s step
//    `4`). **A re-export of a superseded spelling is a pin against a name the contract no longer declares,
//    which is the same defect one iteration on.**
//
// **SO THIS FILE NOW CARRIES NO SEAM AT ALL** — see the block below, where the operative declaration is
// quoted and the drive's route to the channels is stated.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## 1. THE ADOPTION STATEMENT — `ADOPTION`
//
// **`command-sites-and-residue.md §3-bis`** makes this artifact a PREREQUISITE of the adoption and states its
// three mandatory contents; **the contract declares neither the statement's own name nor its file.** `§3-bis`
// item 1 fixes the statement's TERMS — *"IN `bindings/js/package.json`'S OWN TERMS"* — and its two
// provenances, and item 6 makes the package declaration's provenance a DEFERRED choice that is `OWED`.
//
// **SO THIS FILE HOLDS THE STATEMENT AND NO CELL SUPPLIES IT.** The drive in `addon-adoption.test.mjs` reads
// `ADOPTION` and asserts its three contents against `package.json`'s own bytes, which is what `§3-bis` item 4
// requires (*"THE BYTES THE STATEMENT MUST AGREE WITH"*). **The landing pass moves the statement into
// `package.json`'s own terms and the declaration below goes with it** — and until it does, every cell that
// reads it fails, which is the red set's whole point.
//
// **THE PROVENANCE IS `deferred` AND THAT IS THE CLAUSE'S OWN WORD** (`§3-bis` item 2 and item 6): *"THE
// CHOICE OF WHICH IS GENERATED IS DEFERRED AND THE ARTIFACT IS NOT"*; *"NEITHER OPTION IS MANDATED, and a
// `D-1` statement that declares the package's declaration's provenance without resting it on this deferral is
// a FINDING."*
export const ADOPTION = null;

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// **RE-CUT 2026-10-20 — THE SEAM IS A `Symbol.for`-KEYED CHANNEL ON THE STORE INSTANCE AND IS NO LONGER
// A MODULE EXPORT, SO THE TWO `attemptCount(store)` / `onAttemptOpened(store, observer)` FUNCTIONS THIS
// FILE ONCE CARRIED ARE STRUCK.**
//
// **WHAT WAS WRONG WITH THEM, NAMED AT ITS BYTES.** They were a RE-EXPORT OF A SPELLING THE CLAUSE HAS
// SUPERSEDED: `finalizer-and-teardown.md §4.2` item 3 (2026-10-20) — *"THE SEAM IS NOT A MODULE EXPORT OF
// `bindings/js/src/constraint-kernel.mjs`, AND THIS CLAUSE NO LONGER REQUIRES ONE … the clause as filed
// mandated both names as **exports** of that module, while `bindings/js/test/constraint-kernel-repairop.test.mjs`
// asserts that module's export set is EXACTLY the six `K-1`–`K-6` items"* (`:479`–`:483`, `:584`–`:587`).
// **AND A SECOND DEFECT WAS THEIRS ALONE: THEY WERE DEFINED HERE AND THREW FROM HERE, so the five `P-ADA-5`
// cells that called them failed by THROWING A LOCAL STUB rather than by finding no seam on the store. A cell
// that fails against this file can never go green without the implementer editing THIS FILE**, which is not
// where the seam lands — *"`storeCreate` installs each channel once on the object it returns"* (`§4.2` item
// 4). **THE SUBJECT OF EVERY `P-ADA-5` CELL IS THE CLAUSE'S CHANNEL ON THE STORE, READ THROUGH THE STORE.**
//
// **SO THIS FILE NOW CARRIES NO COUNT SEAM AT ALL.** The seam is reached through the store object and
// nothing else is imported to reach it, which is the whole point of the clause's reconciliation: *"a drive
// holds the instance (`storeCreate(cfg)` returns it), so a `Symbol.for` channel is reachable from the store
// it is about with **no import from the kernel module at all**"* (`§4.2` item 3). The two channel names and
// the three small accessors that read them ON THE STORE live at the top of `addon-adoption.test.mjs`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## 2. WHAT THE CLAUSE DECLARES (THE SEAM'S ONE HOME, QUOTED SO THIS FILE NAMES NO SEAM OF ITS OWN)
//
// **`finalizer-and-teardown.md §4.2`, item 1:** **`store[Symbol.for('provident-storeroom.attempt-count')]() -> number`**
// — *"a FUNCTION that takes no argument, answers the number of OPEN COMMITS for THAT store, a non-negative
// INTEGER, and answers `0` for a store that owns no open commit. It is a pure READ: it changes no state,
// mints no code, appends no journal entry and touches no file."*
//
// **Item 2:** **`store[Symbol.for('provident-storeroom.attempt-opened')](observer) -> unsubscribe`** —
// *"`observer` is a FUNCTION called once per commit that OPENS for that store, and the return is a FUNCTION
// that removes that observer."*
//
// **Item 4:** *"AND THE REGISTRATION IS IDEMPOTENT AND PER STORE. `storeCreate` installs each channel once
// on the object it returns; a second read or a second observer does not install a second copy, and one
// store's channels never answer for another's."*
//
// **AND THE SEAM TOUCHES NO FORBIDDEN RECORD — `§4.2`, AS THE CLAUSE STATES IT AT ITS CLOSE:** *"`§4.3`
// forbids ADDING A MEMBER TO ANY RECORD — the kernel's attempt records keep their NINE members and the
// closed report its FIVE, and no existing reader moves. The seam adds no member to any record: its subject
// is the SECOND INDEX `§4.3` already declares — the one keyed by store, standing OVER the attempt records
// and not inside one."* **So a drive that reads the channel asserts the index's own value and never a
// record's member.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## 3. THE ROLE OF THIS FILE, AND WHAT IT IS NOT
//
// The `U-STOREROOM-JS` red set at `bindings/js/tests/support/mod.rs` did the same thing for the same reason
// and recorded it in the same terms. **THIS FILE IS NOT AN IMPLEMENTATION**: it holds no store, mutates no
// count and stands in for no part of the unit.
//
// **AND `ADOPTION` ABOVE IS NOT AN IMPLEMENTATION EITHER**: `command-sites-and-residue.md §3-bis` declares
// the adoption statement a PREREQUISITE the landing pass authors **in `bindings/js/package.json`'s own
// terms**, and **the contract declares neither the statement's own name nor its file.** So a drive cannot
// read it from a path no clause names, and this file holds it as the one artifact the pass owes — a cell
// that supplied its own value would be asserting itself.
