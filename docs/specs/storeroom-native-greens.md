# GREENS — the blind-scenario set for `U-STOREROOM-NATIVE` (`D-GP-SNST`), authored from the docs at gate 5 (`P5`) and corrected at gate 6

**BOUNDED CORRECTION PASSES — gate 5 and gate 6.** The set was re-run against the contract **as it now
stands** (`docs/specs/storeroom-native/contract.md` + its five parts) at each pass.

**The gate-5 pass.** **Three `NG-11` cells were re-derived at this document's own wrong reading** (`F-DOC-1`
— the same-address rollback's scope), **the delete cell that reading also drove was re-derived with them**,
and **one `NG-08` assembly-scope cell was corrected** to the reading the contract's fifth amendment now
carries (`§4.2`'s reconciliation, `DD-31`) — that cell had been driving the WITHDRAWN as-filed reading,
and the implementation was aligned to the contract in parallel with this pass. **`NG-08b`'s two
assembly cells and `NG-08`'s `F-1` observation were driven UNCHANGED** and are reported at their
as-authored expectation. **That pass's run: `355 PASS · 2 FAIL` of `357` assertions** (its record, kept as
history, is `§6`).

**The gate-6 pass — the TWO-CELL CORRECTION THIS SET WAS REMANDED FOR, and the set's verdict is now
`357 PASS · 0 FAIL` (`§7`).** **The two remaining FAILing cells were this document's own — not the
implementation's** (`F-NEW-1`, re-derivable from `§6.1` item 1 read with `§6.2`): they read the entry-formation
rule's SUCCESS half BACKWARDS, as *"a successful version-removing delete appends NOTHING"*, and so asserted
`seq(next operation) = seq(the write before the delete) + 1`. **The contract's own rule is the opposite:
*"one entry per SUCCESSFUL `write`, and one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE
VERSION"*, and a `D-3` no-op delete is the ONLY deleting arm that appends none** — so that delete appends
**exactly one** entry and the next operation's `seq` is the write's **`+ 2`**. **Both cells are corrected to
that arithmetic and now drive the delete's own entry's existence and ordinal with it (`§6.1` item 1 and
`§6.2`, cited in each); NOTHING ELSE IN THE SET MOVED AND NOTHING ELSE IN THE HARNESS WAS TOUCHED**, and the
remaining `355` assertions were driven at their as-authored expectation. **The implementation was not
changed by this pass and no byte of it was read.** **THIS PASS'S RUN: `357 PASS · 0 FAIL` of `357`
assertions** (`§7`).


**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.** The only inputs read were
`docs/specs/storeroom-native/contract.md` and its five parts (`store-model.md`, `write-and-read.md`,
`seams-and-lifecycle.md`, `parameter-semantics.md`, `implementation-plan.md`),
`docs/specs/storeroom-native-proposal.md` (`§1` and `§8`–`§16`, `A1`–`A39`),
`docs/specs/storeroom-native-proposal-review.md` and `docs/specs/storeroom-native-adoption-dossier.md`.
**NO BYTE OF `src/**`, `Cargo.toml`, `Cargo.lock` or `tests/**` WAS READ, AND NO RED-SET OR ADVERSARIAL
REPORT WAS READ.** The crate was reached **only as a consumer**, from a scratch harness **outside the
repository** (`/tmp/storeroom-blind/`, its own `Cargo.toml` with a path dependency on the repository root),
and **no `cargo` command was run inside the repository**. **The only byte this pass wrote inside the
repository is this file.**

**The declared surface was taken from `contract.md §0.4`** (crate id `storeroom_native`; the crate's
`[package] name` is `storeroom-native`, which is the dependency name a consumer declares). Where a
scenario needed a variant spelling `§0.4` does not print (`Segment`'s outside-segment variants,
`AddressArg::Str`), **the spelling was read off the crate's own generated `cargo doc`, never off `src/**`** —
and every one of those variants is required for a documented outside-value arm to be reachable, which is
itself checked below.

**Layer.** Every scenario's expected answer is written from a cited clause, **value by value**, before the
run. A divergence is reported as a FINDING with the clause on each side. **A scenario's own driving error
was corrected and re-driven (each is named in the evidence notes); a scenario's expected answer was
corrected only where the cited clause itself contradicts the drive I had authored.**

**The run, at the gate-5 pass** (kept as that pass's record; **the gate-6 run is `357 PASS · 0 FAIL`, `§7`**).
18 scenarios · 357 assertions · **355 PASS · 2 FAIL**, stable across three consecutive runs.
**(The as-authored run of this set, before the contract's third/fourth/fifth amendments landed, was `338`
assertions · `329` PASS · `9` FAIL — that first count is preserved in this document's history at §3 and is
NOT this set's verdict; neither is the gate-5 count, which the gate-6 pass closed at `0` FAIL.)**

---

## §1. THE SCENARIO SET — 18 scenarios, each bound to its clause

| id | The clause(s) it drives (and the ruling where one governs) |
| --- | --- |
| **NG-01** | write→read round trip for all four admitted classes at all three tiers, both empty-container forms, the no-coercion rule (`"0"` vs `0`), the read's copy discipline, the minted anchor's tier — c`§1.4`, c`§1.5` items 2–3, c`§3.3`, c`§3.4` `W-3`/`W-4`, c`§4.1`, c`§4.2` `R-1`/`R-2`/`R-3`/`DD-1`, c`§5.2 · P-IM-1`, c`§5.4` (a) · **`A3`** |
| **NG-02** | the refusal of each class OUTSIDE the taxonomy (8 classes) and the failed write's zero residue — c`§1.4`, c`§3.4` arm `F-2`, c`§3.5`, c`§6.1` item 1, c`§8.1` #13 · **`A14`** |
| **NG-03** | the read's tier selection: zero tiers, the empty set, a one-token set, an any-match set, a set matching no version (`L-TIER`/`DD-12`), a key with no anchor (`L-3`) — c`§2.2`, c`§2.3`, c`§3.1.1` (the `read` row), c`§4.2` `R-4` · **`A24`** · **`A28`** · **`A11`** |
| **NG-04** | the walk: `L-0` (the empty address resolves to the register and reads as the whole registry), `L-INT-REG` (an index at the register), `L-3` (a missing key at the register and in a MAP), `L-4` (a mid-walk leaf), `L-1` (four outside-segment classes, a string address, an absent address, a null address) — c`§1.5` items 1/4/5, c`§1.6`, c`§2.2`, c`§4.2` `R-5`, c`§8.2` worked example (2) · **`A23`** · **`A25`** |
| **NG-05** | the mint, the re-mint and the arm table's shapes: `W-3`, `W-1`/`DD-8` (the pair count does not grow), `W-5` (a less persistent version added alongside, the shadow winning the unqualified read), `W-6` (the purge), `W-2` (`A21`'s destroy-and-replace at the write's own tier **whatever tier the destroyed anchor carried**), `W-4` (the recursive branch-tree), `DD-1`'s empty container — c`§1.1`, c`§3.3`, c`§3.4`, c`§5.3` items 3–4, c`§5.4` (b)/(c), c`§5.5` · **`A21`** · **`A27`** · **`A34`** · **`A11`** · **`A13`** · **`A19`** |
| **NG-06** | the tier as a PROPERTY carried by anchors: the monotonic clause at every parent tier (`3 × 3`), `F-6`'s refusal and its zero residue, the register's no-upper-bound exemption, the landing observable, `F-5` for both value classes and the empty-address write — c`§1.2`, c`§1.6` item 3, c`§3.2` items 2/4/5/6, c`§3.4` `F-5`/`F-6`, c`§5.4` (a), c`§5.6`, `DD-27` · **`A27`** · **`A18`** · **`A23`** · **`A17`** |
| **NG-07** | the unqualified read's lowest-persistence selection and the purge chain, including the chain's leaves-standing column and the purge's non-subtree scope — c`§2.3`, c`§5.3`, c`§5.4`'s chain, c`§4.2` `R-4` · **`A28`** · **`A11`** · **`A15`** · **`A19`** |
| **NG-08** | the tier-set read and the assembly's own scope: a register read under a passed set, a pass-through key at another tier, the assembly of a child reached through a mismatched chain — c`§2.2`'s scope clause, c`§2.3`, c`§4.2`'s assembly clause **(at this pass's reading: its reconciliation and `DD-31` — the passed set governs WHICH VERSION each address answers and never whether a read answers; a member with no in-set version is OMITTED and produces no code)**, c`§3.1.1` (the `read` row) · **`A24`** |
| **NG-08b** | the same scope clause at its sharpest: the ADDRESSED-step read of a parent at its OWN tier, and the unqualified read's per-step selection descending into a key at another tier — c`§2.2`'s scope clause, c`§2.3`, c`§4.2`, `DD-1` · **`A24`** · **`A28`** |
| **NG-09** | the register's own reference at the empty address — c`§2.1`'s empty-address reference clause, c`§1.6` item 3 · **`A25`** · **`A23`** |
| **NG-10** | the delete: its tier scoping (`D-1`), the unqualified delete (`D-2`), the no-op success (`D-3`/`DD-9`), the walk-code failure (`D-4`), the whole-subtree cascade, the register-emptying delete (`D-5`), and the `VEC` renumbering (`DD-30`) with the MAP's keys unrelabelled — c`§4.3`, c`§4.4`, c`§4.2` `R-3`'s density, c`§5.5` `P-IM-3` · **`A12`** · **`A11`** · **`A19`** |
| **NG-11** | the returned op: its id, its closed record shape, the `before`/`after` duty, `seq` from 1, the entry-formation rule (**one entry per SUCCESSFUL write, and one entry per SUCCESSFUL delete that removed a version — that delete's own entry occupies the next append ordinal, so the next operation's `seq` is the write's `+ 2`; a failed write, a `D-3` no-op delete and a `D-4` failed delete append NONE and advance the ordinal by exactly `1`** — the success half corrected at the gate-6 pass, `§7`), the delete's own arms (`D-1`/`D-2`/`D-3`/`D-4`), and **the same-address rollback's reach over BOTH entries at the written address (`M-5` "itself or a descendant" + `M-8` totality + `M-7` direction + `M-9` mark + `M-10` unchanged-on-failure)** — c`§3.6`, c`§6.1` item 1, c`§6.2` properties 1–4, c`§6.3`, c`§6.4` `M-5`/`M-7`/`M-8`/`M-9`/`M-10`, c`§4.3`/c`§4.4` `D-1`/`D-2`/`D-3`/`D-4` + `DD-9`, `DD-20`/`DD-21` · **`A7`** · **`A12`** · **`A35`** · **`A37`** |
| **NG-12** | the rollback's reach over every operation touching the same subtree, the scope measured against the written address, `undoneOps`' reverse append order and performed-reversal rule, `restoredTo`'s actual state, the undone entry's mark, `M-10`, `M-11` — c`§6.4` `M-5`–`M-11`, `DD-20`/`DD-21` · **`A35`** |
| **NG-13** | the configured journal length and compression into a base state: the append trigger at `journalLength + 1`, the compacted entry's out-of-scope floor, the all-or-nothing refusal, and `seq`'s continuation after a rollback — c`§6.1` items 4–5, c`§6.4` `M-6`/`M-9`, `DD-16` · **`A5`** · **`A31`** |
| **NG-14** | the `file` tier: its commit and the bytes at `cfg.filePath`, the `mem` write's zero file I/O, the failure arm (`FileCommitFailed`) with `A16`'s automatic journal rollback having run before the failure is returned, and the caller receiving the failure — c`§7.2` items 1–5, c`§6.4`'s automatic-rollback clause, c`§8.1` #14, `DD-2`/`DD-25`/`DD-28` · **`A16`** |
| **NG-15** | the construction inputs and their failure arms (16 outside-value cells), the returned instance's EMPTY register, its journal of 0 entries, `journalLength = 1`'s domain, and the file tier bound to `cfg.filePath` — c`§7.1`, c`§8.1` #1/#12, `DD-16`/`DD-17`, c`§5.7` · **`A16`** · **`A31`** |
| **NG-16** | the watched-address list after a successful write: `{own, ancestor}` and descendant-inclusiveness, the exclusion of a descendant and an unrelated address, the empty list, the tier qualifier's three consequences, one member per address registered at two tiers, `unwatch` and its no-op arm, and the returned `opId`'s acceptance by `rollback` — c`§6.5` items 2–7, c`§3.6`, c`§5.8` `P-TP-8`, `DD-18`/`DD-26` · **`A33`** · **`A37`** · **`A38`** (**`P-3` PARKED: the listener is deliberately NOT driven**) |
| **NG-17** | the closed fail set: each of the 14 members produced by its own trigger with its exact status spelling, the message's non-emptiness and its freedom from unsubstituted placeholders, and the contract's three worked messages (A14's own example reproduced, the empty-container arm verbatim, the container-kind arm) — c`§8.1`, c`§8.2`, c`§8.3` · **`A14`** · **`A29`** |
| **NG-18** | **THE USER FLOW**, to the final resolved state: create → write a tree at `temp` and verify → promote to `mem` and verify → promote to `file` and verify → restart the process (a fresh `storeCreate` at the same `cfg.filePath`, which is the boot) and verify the data survived → the delete's non-commit and its re-boot consequence → the caller's rollback — c`§7.2` items 1/5/6, c`§5.4`'s chain, c`§4.4` `D-1`, c`§6.1` item 3, `DD-28`/`DD-29`/`DD-14` · **`A3`** · **`A16`** · **`A19`** · **`A15`** · **`A37`** |

**Coverage against the brief's ten items.** (1) round trip + every refusal → **NG-01/NG-02**; (2) mint,
re-mint and the arm table's shapes → **NG-05**; (3) the walk's five states → **NG-04**; (4) the tier
discipline — the anchor-carried property, the monotonic clause and its refusal, `A34`'s one-anchor-per-pair,
the unqualified selection, the tier-set read, the purge chain → **NG-06/NG-07/NG-08/NG-08b**; (5) the delete's
tier scoping, cascade and `VEC` renumbering → **NG-10**; (6) the journal — the returned op, the rollback's
reach and floor, the configured length and base state, the `file` tier's automatic rollback → **NG-11/NG-12/
NG-13/NG-14**; (7) the construction inputs and their failure arms → **NG-15**; (8) the watched-address list
(and NOT the listener, `P-3` parked) → **NG-16**; (9) the closed fail set with its generated messages →
**NG-17**; (10) the user flow to the final resolved state → **NG-18**.

---

## §2. THE RUN — the gate-5 pass's **355 PASS · 2 FAIL** (history; **the gate-6 run is `357 PASS · 0 FAIL`, `§7`**)

The harness: `/tmp/storeroom-blind/` (`Cargo.toml` declaring `storeroom-native = { path = … }`), built and
run **read-only against the repository** with `cargo run --offline` under
`CARGO_TARGET_DIR=/tmp/storeroom-blind/target`. **Three consecutive runs produced identical counts
(`355` / `2`), so no failure is flaky; the gate-6 pass ran the same harness twice more, identically at
`357` / `0`.** **The crate was reached only as a consumer: nothing under
`src/**` or the contract was read by this pass, no `cargo` command ran inside the repository, and no
`target/` was created there — the only file this pass wrote inside the repository is this document.**

**Scenario verdicts — THIS PASS'S run** (the per-scenario counts are the run's own, printed with their
terms; a scenario's row states the closed findings it now carries, and where a cell was re-derived this pass
the row names the `§` it now drives).

| id | verdict |
| --- | --- |
| **NG-01** | **PASS** (16 PASS · 0 FAIL) — every admitted class round-trips byte-equal at every tier; `"0"` stays a string key and index `0` resolves nowhere in that MAP; mutating the object a read returned did not touch the store; `findAddress(a, file).anchor.tier == File` |
| **NG-02** | **PASS** (11 PASS · 0 FAIL) — all eight outside classes answer `ValueNotAdmitted`, nothing is minted, the pre-existing version survives, and the journal still holds exactly one entry |
| **NG-03** | **PASS** (9 PASS · 0 FAIL) — zero tiers, the empty set and `{mem,temp}` answer `Temp`; `{file,mem}` and `{mem}` answer `Mem`; the single token answers `File`; a set matching no version answers `TierNotFound` while an absent key answers `AddressNotFound` |
| **NG-04** | **PASS** (15 PASS · 0 FAIL) — **F-2's cell is now PASS**: `findAddress([], …)` does not carry the caller's tier |
| **NG-05** | **PASS** (29 PASS · 0 FAIL) — the pair count does not grow at `W-1`, `W-2` or `W-6`; `W-5` leaves two versions standing and the shadow wins the unqualified read; `W-2` destroys a `file` leaf's anchor for a `temp` structured write and the destroyed pair leaves; the recursive `W-4` tree round-trips |
| **NG-06** | **PASS** (23 PASS · 0 FAIL) — `file` → `mem`/`temp` parents succeed and `file` under `mem` or `temp` fails `ParentAnchorMonotonicityViolation` with nothing installed; all three tiers stand at register keys whatever their neighbours carry; `F-5` refuses both value classes and the empty-address write |
| **NG-07** | **PASS** (18 PASS · 0 FAIL) — the chain's three rows exactly (`temp` write leaves `mem`+`file`; `mem` write leaves `file`; `file` write leaves none), the purge's non-subtree scope, and the cascade through a purged version's downstream |
| **NG-08** | **PASS** (12 PASS · 0 FAIL) — the set binds every step of the WALK (`{mem}` at a `temp`/`file` pass-through answers `TierNotFound`); `{file,temp}` answers the temp member; **a temp-only register key under `{file}` is OMITTED with no code** — the read answers `Ok(Object({}))` (this pass's corrected cell, `§4.2`'s reconciliation + `DD-31`); a register read then answers its `file` member once one exists |
| **NG-08b** | **PASS** (9 PASS · 0 FAIL) — **F-1's two cells are now PASS, UNCHANGED as authored**: `read(['g'], {file})` over a `file`-tier `g` whose child `c` stands at `temp` answers the assembled object with `c` OMITTED (the empty object `DD-1` declares), and the addressed-step read of the parent at its own tier answers the parent |
| **NG-09** | **PASS** (3 PASS · 0 FAIL) — **F-2's two cells are now PASS**: `findAddress([], file)` and `findAddress([], temp)` answer the SAME reference's tier (`Mem`, the register's own), so neither answer asserts the caller's tier; the register's key marker is `Key("")` |
| **NG-10** | **PASS** (25 PASS · 0 FAIL) — `D-1`'s receipt names exactly the removed tier and leaves the other two untouched; `D-2`'s receipt is in the canonical order `file, mem, temp`; `D-3` is a success with `tiers: []`; the cascade removes root and descendants; `D-5` empties the register; `DD-30` leaves the parent's read dense, moves the survivor to one index from `0`, leaves the deleted index's node resolving nowhere, and never relabels a MAP key |
| **NG-11** | **PASS** (39 PASS · 0 FAIL — the gate-6 count; at the gate-5 pass this row stood `37 · 2`) — **the three re-derived cells are PASS**: the absent `BaseState.value` is `Undefined`; the same-address rollback undoes BOTH entries (`undoneOps = [w2, w1]`, newest-first) and the reads after it answer `AddressNotFound` at every tier; the delete the old drive then made at the emptied address is `D-4`'s failure. **The two gate-5 FAILs are closed by correcting THIS DOCUMENT'S OWN arithmetic, not the store's** (`F-NEW-1`, `§3`): the `D-1` and `D-2` cells asserted *"a successful version-removing delete appends nothing"* (`seq + 1`) where **`§6.1` item 1** requires exactly ONE entry — the run's own ordinals are `write.seq = 1`, the delete's entry `2`, the next write `3` — so each cell now asserts the write's `+ 2` and cites `§6.1` item 1 with `§6.2` (`§7`) |
| **NG-12** | **PASS** (13 PASS · 0 FAIL) — the rollback undoes the named op **and** a descendant's later operation, reports them newest-first, leaves an unrelated key standing, marks the undone entries so a second rollback over one fails `RollbackCompacted`, appends no entry, and continues `seq` |
| **NG-13** | **PASS** (7 PASS · 0 FAIL) — the fourth append under `journalLength = 2` compacted the older entries; the oldest entry is then out of scope and its rollback fails `RollbackCompacted` all-or-nothing |
| **NG-14** | **PASS** (8 PASS · 0 FAIL) — the committed bytes carry the written key; a `mem` write performs no file I/O; a `file` write whose path is a directory fails `FileCommitFailed` and `A16`'s automatic rollback has already removed the failed version from the store before the failure is returned |
| **NG-15** | **PASS** (20 PASS · 0 FAIL) — all 16 outside-value cells answer their declared code, the instance is returned with `0` register keys and a journal of `0` entries, `journalLength = 1` is in the domain, and the file tier is bound to `cfg.filePath` |
| **NG-16** | **PASS** (14 PASS · 0 FAIL) — the returned list is exactly `{own, ancestor}`, a descendant and an unrelated address are excluded, the list is `[]` when nothing is in scope, a `file`-qualified registration is not returned after a `mem` write, one address registered at two tiers yields one member, `unwatch` removes a registration and a second `unwatch` is a no-op success, and the returned `opId` is accepted by `rollback` |
| **NG-17** | **PASS** (59 PASS · 0 FAIL) — all 14 codes reachable, each status spelling exact, each message non-empty and free of unsubstituted placeholders; A14's own example reproduced at the container it was printed for; the empty-container arm verbatim |
| **NG-18** | **PASS** (27 PASS · 0 FAIL) — the whole user flow to the final resolved state (below) |

**The 14 messages observed (evidence; every one is generated, none is empty and none carries a
placeholder).** These are printed as evidence, not as clauses: where `§8.2`'s rule fixes the text the
scenario asserts it, and where the rule fixes only the form the scenario asserts the form and records the
text here.

```
AddressMalformed   : "the integer -1 is not a legal address segment in '', segments are strings or non-negative integers"
AddressMalformed   : "the address argument is not a legal address segment in '', segments are strings or non-negative integers"
AddressMalformed   : "the tier argument is not a legal address segment in '', segments are strings or non-negative integers"
AddressMalformed   : "'tier' requires a tier argument, a tier is required"
AddressMalformed   : "'opId' is not a legal address segment in '', segments are strings or non-negative integers"
AddressNotFound    : "'zz' does not exist in '', it holds no keys"
AddressNotFound    : "0 does not exist in '', keys are 'l', 'mm', 'vec'"
AddressNotFound    : "'LandingPage' does not exist in 'win.tabs', tabs are 'doc1', 'searchbar'"
LeafHasNoDownstream: "'x' cannot be walked through 'l', it is a leaf"
TierNotFound       : "'l' is not a version of '', versions are at mem"
OutOfDomainTier    : "'secure' is not a tier, tiers are file, mem, temp"
OutOfDomainTier    : "an array of tiers is not a tier, tiers are file, mem, temp"
OutOfDomainTier    : "a value that is not a tier is not a tier, tiers are file, mem, temp"
ParentAnchorMonotonicityViolation : "'c' outranks its parent anchor's tier in 'p.c', a child anchor may not be more persistent than its parent"
ContainerKindConflict : "[1,2] does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'"
ContainerKindConflict : "'k' does not match the container kind of 'vec', it holds a vector"
ContainerKindConflict : "0 does not match the container kind of 'mm', it holds a map, keys are 'doc1', 'searchbar'"
ReadTargetIsBranch : "'mm' is a branch and not a leaf in 'mm', it holds a branch"
ReadTargetIsBranch : " is a branch and not a leaf in '', it holds a branch"
WriteParentNotLink : "'c' cannot be written into 'l', it holds a leaf and not a link"
WriteParentNotLink : "'' cannot be written into '', it holds a leaf and not a link"
JournalOpUnknown   : "'ghost' is not an operation this store's journal holds, ops are reached through the journal op a write returned"
RollbackCompacted  : "'op-120' is out of scope because it is compacted, compacted operations are out of scope"
ConstructionArgumentMissing : "'filePath' requires a filePath argument, a filePath is required on store creation"
ValueNotAdmitted   : "''q'' is not an admitted value, admitted values are strings, booleans, finite numbers, plain objects and arrays"
FileCommitFailed   : "'x' could not be committed to '<DIR>', the file write failed at '<DIR>'"
```

**Two form notes on the messages, neither a finding** (the clause fixes the form, not the characters):
(a) **the container is spelled with DOTS** — `'win.tabs'`, `'p.c'`, `'window.tabs'` — which is A14's own
example's spelling and `§8.2`'s `container` member's own example (`a dotted path such as 'window.tabs'`),
while `§8.2`'s `<CONTAINER>` line also prints *"the address's own spelling"* with `''` for the register;
**the dotted form agrees with both worked examples and is the reading the run settles**;
(b) **`§8.2`'s `<CONTAINERSEGMENT>` subject is read differently in two arms**: the absent-key clauses print
`tabs are 'doc1', 'searchbar'` (the container's own segment, as the reconciliation clause requires) while
the integer-segment arm at the register prints `keys are 'l', 'mm', 'vec'` where the reconciliation clause
requires the register to use `keys` — so the integer arm is the degenerate arm's subject and the two agree.

---

## §3. THE FINDINGS — each with the clause on each side

### F-1 — **the tier filter is applied to a node the walk has already resolved, refusing reads the contract says succeed** (2 assertions: NG-08b) — **CLOSED at this pass: both cells PASS, UNCHANGED**

**⟶ STATE AT THIS PASS (`2026-10-11`+): the contract determined the rule and the implementation was aligned
to it.** `§2.2`'s scope clause was SPLIT into its two acts by the fifth bounded amendment (**the WALK's
per-step filter STANDS; the ASSEMBLY's per-step `TierNotFound` is WITHDRAWN — a member the set does not
cover is OMITTED and produces no code**), the ruling is carried at **`DD-31`**, and `§4.2`'s as-filed cell is
reconciled beside itself. **`NG-08b`'s two cells were driven UNCHANGED, at the expectation this document
authored before that amendment, and BOTH PASS** — the corrected expectation was right: `read(['g'], {file})`
answers the assembled object with the out-of-set descendant OMITTED (the empty object where nothing remains),
and the addressed-step read of the parent at its OWN tier answers the parent. **The record below stands
as the as-authored finding, with its `which side is wrong` cell now HISTORICAL: the wrong side was the
as-filed `§4.2` reading, not the store.** The third observation below (`read(['g','x'], {file,mem})`) also
PASSES this pass.

**The clause.** c`§2.2`'s scope clause (this contract's third bounded amendment):

> **when the walk IS passed a tier argument, the passed-tier filter is applied AT EVERY STEP OF THE WALK —
> at the ADDRESSED step (`i = a.length − 1`) AND at every PASS-THROUGH step before it — and `L-TIER`
> therefore answers `TierNotFound` at EVERY step at which the container holds an anchor whose `key` equals
> `a[i]` but whose `tier` is in NO passed tier, whether or not that step is the addressed one** — **so the
> ADDRESSED step's own container is consulted for the ADDRESSED segment; a node the walk has resolved has
> no tier test of its own beyond the one its own anchor passed.**

with c`§4.2`'s assembly arms (`R-2`: the resolved `MAP` branch reads as an object, one member per key) and
`DD-1` (a `MAP` with `0` child anchors reads as `{}`).

**The drive** (NG-08b, on a store where `['g']` is written at `file` and `['g','c']` is written at `temp`
under it — a state c`§3.2`/c`§5.6` admit, since a child may be less persistent than its parent):

| the operation | expected from the clause | observed |
| --- | --- | --- |
| `read(['g'], {file})` | **`Object({})`** — the passed set matches `g`'s own anchor at the register's step, and the resolved branch is an empty MAP | **`Err(TierNotFound: "'c' is not a version of 'g', versions are at temp")`** |
| `read(['g'], {file})` again (the `DD-1` form) | **`Object({})`** | **the same `Err`** |
| (adjacent, PASSING) `read(['g'], unqualified)` | `Object({"c": "ct"})` | `Object({"c": "ct"})` |
| (adjacent, PASSING) `read(['g','c'], unqualified)` | `"child-temp"` | `"child-temp"` |

**A third observation of the same root cause, from the same scenario's neighbours:** with `['g']` written at
`file` and `['g','x']` written at `temp` under it, `read(['g','x'], {file,mem})` answers
**`Object({"y": "fy"})`** — the `file` child — where the passed set binds only the addressed step and the
unqualified assembly selects the child's own single version (`Object({"y": "ty"})`, which
`read(['g','x'], unqualified)` and `read(['g'])` both answer).

**Which side is wrong.** **The implementation.** `§2.2`'s scope clause was authored (third bounded
amendment) precisely to fix this reading, and it names the arms that apply it (`R-4`, `L-2`/`L-3`/`L-TIER`,
the register row `P-SM-4`): the filter belongs to the segment being consumed, so a **descendant's** anchors
are not the addressed step's business. The observed behaviour additionally makes a state the contract
declares legal — a child less persistent than its parent, which `A27`'s monotonic clause and
`§5.6`'s `3 × 3` census exist to make reachable — **unreadable at the parent's own tier**, and it makes the
per-step selection rule of `§2.3` inoperative below a mismatched ancestor.

### F-2 — **the register's `NodeRef` carries the caller's tier** (4 assertions: NG-04, NG-09) — **CLOSED at this pass: all four cells PASS**

**⟶ STATE AT THIS PASS: the implementation was fixed to `§2.1`'s clause** (`findAddress([], file)` and
`findAddress([], temp)` answer the SAME reference — the register's own `Mem` marker — and neither asserts the
caller's tier). **The four cells were driven UNCHANGED and all four PASS.** The as-authored finding, its
drive and its `which side is wrong` cell stand below as the record of the first run.

**The clause.** c`§2.1`'s empty-address reference clause (also the third bounded amendment):

> **`findAddress([], t)` — and every walk at the empty address, `L-0`'s own state — resolves to the
> REGISTER, which HAS NO PARENT ANCHOR (`§1.6`), so NO ANCHOR OF A CALLER-NAMED KEY AND NO CALLER-PASSED
> TIER IS READ INTO THE RETURNED REFERENCE: the returned `NodeRef` is the store's handle to the REGISTER
> itself, and its `anchor` carries the register's OWN identity marker … and its `tier` member is the one
> `§1.6` item 3's no-parent-anchor rule leaves `§5.4` (a) unable to assert — and NEVER the caller's `t`.**

> **Consequence, stated so it cannot be read as a fabricated anchor: `findAddress([], file)` and
> `findAddress([], temp)` answer the SAME reference — the register's — and neither answer asserts a floor or
> a tier the register does not have.**

**The drive** (NG-09 on a store whose register holds one `mem`-tier key; NG-04's register read):

| the operation | expected from the clause | observed |
| --- | --- | --- |
| `findAddress([], {file}).anchor.tier` vs `findAddress([], {temp}).anchor.tier` | **the two are EQUAL** (the same reference) | **`File` vs `Temp` — different** |
| neither answer asserts the caller's tier | `tier ∉ {File, Temp}` | **`File` for `file`, `Temp` for `temp` — each answer IS the caller's tier** |
| (NG-04) `findAddress([], {file}).anchor.tier` is not the caller's tier | true | **false** |
| (adjacent, PASSING) `findAddress([], unqualified).anchor.key` | the register's own empty segment marker | **`Key("")` — the register marker, as the clause requires** |

**Which side is wrong.** **The implementation.** The key half of the same clause is honoured (`Key("")`),
and only the `tier` member is read from the caller's argument — so the reference distinguishes a state
`§2.1` says it must not distinguish, and the register acquires a tier that `§1.6` item 3's no-parent-anchor
rule denies it. `§5.4` (a)'s landing observable is stated for **an anchor the caller's write minted**, not
for the register, and the same clause says so in terms.

### F-DOC-1 — **the same-address rollback: the contract and the store AGREE, and this document's first expectation was the wrong side** — **RE-DERIVED AND CLOSED at this pass: the three re-derived cells PASS**

**The clause.** c`§6.4` `M-5`/`M-7`/`M-8`/`M-9`/`M-10` read with `DD-20`/`DD-21`:

> **`M-5` — THE SCOPE:** a rollback undoes **EVERY operation TOUCHING THE SAME SUBTREE as the named op** …
> **an entry `E` is in scope iff `op.address` is a prefix of `E.address` (itself or a descendant), at ANY
> tier.**
> **`M-8` — A ROLLBACK IS TOTAL OVER ITS SCOPE:** **no partial or subset rollback is available and none is
> declared.**
> **`M-7` — … a rollback is BY OP ID …, and it walks BACKWARD — one entry at a time, FROM THE NEWEST IN SCOPE
> TO THE OLDEST IN SCOPE.**

with `DD-21`'s measured-against wording (*"itself or a descendant"*), `DD-20` (no subset rollback), `M-9`'s
mark (an undone entry carries `compacted: true` and is out of every later walk), `M-10` (a failed rollback
leaves the store unchanged) and c`§6.2` property 1 / `§6.3`'s member rule / `A35` · `A37`.

**THE WRONG READING, NAMED (the first-authored cell set).** This document's first pass drove the drive as
*"the rollback reverses `w2` alone and restores `"first"`"* — i.e. it read `M-5` as **operations STRICTLY
BELOW the named address**. `M-5`'s own words (**`itself`** or a descendant) and `DD-21`'s measured-against
cell both include the addressed operation's own entry, so **rolling back `write(['j'])` also reverses the
EARLIER `write(['j'])`**: the store's answer was right and the expectation was this document's.
**The three cells re-derived here, each with the `§` it now drives:**

| the cell | what it now asserts (`§`) | what the OLD expectation contradicted |
| --- | --- | --- |
| **1. the rollback's reach and report** (NG-11) | **`M-5` + `DD-21`**: the *named* op is inside its own scope (`itself`), so **BOTH** same-address entries are reversed — `undoneOps` is exactly `[w2.opId, w1.opId]` — and **`M-7`** fixes that order as REVERSE APPEND (newest in scope first); **`M-8`/`DD-20`** make the rollback TOTAL over that scope, so the earlier version cannot be left standing | The old cell asserted `read(['j'], mem) == "first"` after the rollback — an expectation that requires a **PARTIAL** rollback (one entry reversed, one left), which `M-8`/`DD-20` forbid and `M-5`'s `itself` excludes |
| **2. `restoredTo` and the reads that follow** (NG-11) | **`M-5`/`M-8`** with **`M-9`**: `restoredTo.present` reports the addressed subtree's **ACTUAL** state — `false` (absent) — and the reads after it answer **`AddressNotFound` at every tier** (`§2.2`'s walk: the address is gone, so `L-3`); **`M-9`**'s mark is driven by a second rollback over the OTHER undone entry failing `RollbackCompacted`, and **`M-10`** by the store standing unchanged after that failure; **`§6.2` property 1**'s `reconstruct(op.before)` is thereby read over the operations the rollback **REVERSED** (`§6.3`, `§6.4` `M-7` (ii)) — never as a promise about an address whose whole history at it was reversed | The old cell asserted the **ORIGINAL tree** returns after the rollback (`"first"`), i.e. that reversing `w2` restores what `w1` had put there — the reading `M-5`'s `itself` contradicts |
| **3. the delete that follows** (NG-11) | **`§4.3`/`§4.4` `D-4`** first: with the address absent after the rollback, an unqualified delete **FAILS** `AddressNotFound` — *"a delete that removed nothing is a SUCCESS"* is `D-3`/`DD-9` and is reserved to an address that **RESOLVES**; then, on its own store, **`D-1`** (a tier-named delete names exactly the removed tier; the address resolves nothing afterwards), **`D-2`** (the unqualified delete names every tier it removed) and **`D-3`/`DD-9`** (a delete naming a tier the address does not hold is a no-op `Ok` with `tiers: []` that removed nothing), with **`§6.1` item 1**'s entry-formation rule driven at every arm and at the failed write | The old cell drove an **unqualified delete at the address the rollback had just emptied** and asserted it must succeed and remove its versions — expecting versions to be standing that **`M-5`/`M-8` had already reversed**, and expecting `D-3`'s no-op success at a state `D-4` owns |

**The re-derived drive, as this pass ran it** (NG-11, `journalLength = 16`, so no compaction shortens the
walk; each delete arm on its **own** store, so no earlier delete's residue can be the cause of the next arm):

| step | the operation | expected from the clause | observed |
| --- | --- | --- | --- |
| 1 | `w1 = write(['j'], mem, "first")` | an entry; `before.present = false` | `op-85`; `before.present = false` — **PASS** (`op.before.value = Undefined` — **PASS**, `F-3` below) |
| 2 | `w2 = write(['j'], mem, "second")` | `w2.before` records the replaced version | `before.present = true`, `before.value = "first"` — **PASS** |
| 3 | `rollback(w2.opId)` | **`M-5`/`DD-21`/`M-8`**: `['j']` is a prefix of `['j']` ("itself"), so `w1` **is** in scope and the rollback is TOTAL over it — both entries are reversed, newest first (`M-7`) | `undoneOps = ["op-86", "op-85"]` — **PASS**; `restoredTo.present = false`, `restoredTo.value = Undefined` — **PASS** |
| 4 | the reads after that rollback, at every tier | the addressed subtree stands **ABSENT**: `AddressNotFound` at `mem`, `file` and `temp`, and no version stands there (`M-8`'s totality) | `AddressNotFound` at all three; `tiers_at(['j']) = []` — **PASS** |
| 5 | `rollback(w1.opId)` (the OTHER undone entry) | **`M-9`**: `w1` was marked `compacted: true` by step 3, so it is out of the candidate set and the attempt fails `RollbackCompacted`; **`M-10`**: the store is unchanged by that failure | `Err(RollbackCompacted)` — **PASS** |
| 6 | the delete at `['j']` | **`D-4`**: the address resolves to nothing, so the delete fails with the walk's own code — **not** `D-3`'s no-op success | `Err(AddressNotFound)` — **PASS** |
| 7 | `D-1` on its own store: `write(['a'], mem)` then `delete(['a'], mem)` | `D-1` names exactly the removed tier, the address resolves nothing afterwards, and **`§6.1` item 1** appends EXACTLY ONE entry for it — that entry's ordinal is the write's `+ 1`, so **the next operation's `seq` is the write's `+ 2`** (`§6.2`'s *"the entry's append ordinal, strictly increasing from 1"*) | receipt `tiers = [Mem]` — **PASS**; `[]` after — **PASS**; **next `seq` advances by `2`, i.e. `1 → 2 → 3`, the delete's own entry at `2` — PASS** (the gate-5 drive asserted `+ 1` here and FAILed: **this document's arithmetic was the wrong side, `F-NEW-1`**) |
| 8 | `D-2` on its own store: `write(['a'], mem)` then `delete(['a'])` | every tier it removed, named in the canonical order; nothing resolves afterwards; **ONE entry, `§6.1` item 1** — the next operation's `seq` is the write's `+ 2` | receipt `tiers = [Mem]` — **PASS**; `[]` after — **PASS**; **next `seq` advances by `2`, `1 → 2 → 3` — PASS** (the same corrected cell) |
| 9 | `D-3` on its own store: `write(['a'], mem)` then `delete(['a'], file)` | a no-op **SUCCESS** with `tiers: []`, nothing removed, **NO** entry appended | `Ok(tiers: [])` — **PASS**; the `mem` version stands — **PASS**; next `seq` advances by one — **PASS** |
| 10 | `D-4` on its own store: `delete(['absent'])`, then the failed write | the walk's own code, and **NO** entry for either failure | `AddressNotFound` — **PASS**; next `seq` advances by one after each — **PASS** |

**Which side is wrong.** **This document's own expectation — the three cells above, at their
first-authored reading. The store follows the contract, and the re-derived cells PASS.** **The first-pass
record is retained as history rather than erased** (its two FAILing cells were left FAILING at the time
precisely so the set could not be mistaken for a self-verified pass); **this pass re-derives them to the
clause's own scope rule, as instructed, and each now cites the `§` it drives.** **`NG-12` — the dedicated
scope scenario, authored separately from the same clauses — PASSES all 13 of its assertions**, including the
subtree-wide reach, the newest-first order, the exclusion of an unrelated key (`M-5`/`DD-21`), `M-9`'s mark
and `seq`'s continuation, and it was driven **unchanged** at this pass.

**The scenario's intent, kept.** The drive still exercises **the returned op's `before` half end to end**
(`w2.before` carries the replaced version; `op.before.value` is the declared absent-state spelling) and **a
rollback's reach end to end** (`M-5`'s `itself` + `M-8`'s totality + `M-7`'s direction + `M-9`'s mark), with
the delete's arms and `§6.1` item 1's entry-formation rule carried beside them.

### F-DOC-2 — **the register read at the empty address: the two sides AGREE, and the ambiguity is in the clause** (no FAIL is booked on it; recorded as a documentation finding)

**Observation.** `read([])` unqualified answers `Object({ "key": <that key's selected value> })` — one
member per register key, each the **lowest-persistence** version (`§2.3`'s zero-tier arm / **`A28`**) — which
is `R-2` applied to the register (`R-5`) with `R-4`'s selection. `A25`'s words are
*"read returns object containing the entire registry"*, which does not say whether a key holding **several**
versions contributes **one member from the selected version** or **one member per version**.
`§4.2`'s `R-4` and `R-5` settle it as one member per key, and the run agrees with `§4.2`.

**Which side is wrong.** **Neither.** **The clause that carries the ambiguity is `A25`'s own sentence, and
`§4.2` (the contract's carriage of the ruling) already closes it** — recorded here because a greens set must
not treat a clause's silence as a store defect, and because the register read's member count is the one
observable a future amendment of `R-4`/`R-5` would move.

**The gate-5 pass's totals: 2 FAIL assertions, all of them ONE finding (`F-NEW-1`) — which the gate-6 pass
found to be THIS DOCUMENT'S OWN arithmetic, so no implementation finding and no documentation finding stands
FAILing at this set's verdict (`§7`).** The three implementation findings of the first run are
**CLOSED** — `F-1` (its 2 cells PASS unchanged), `F-2` (its 4 cells PASS unchanged) and `F-3` (its 1 cell,
PASS unchanged, `§3` `F-3` below) — and the two documentation findings are settled: **`F-DOC-1` re-derived to the contract's own
scope rule (the three re-derived cells PASS, `§`-cited above)** and **`F-DOC-2`** (no FAIL was ever booked
on it). **The first run's own verdict stood at 9 FAILs across `338` assertions; the gate-5 pass's was `2`
FAILs across `357`; the gate-6 pass's is `0` FAILs across `357` (`§7`).**

### F-NEW-1 — **CLOSED at the gate-6 pass: the clause and the store agreed all along, and THIS DOCUMENT'S arithmetic was the wrong side** (the gate-5 FAILs were booked as the implementation's; the corrected cells PASS)

**The clause.** c`§6.1` item 1 (the entry-formation rule), with c`§6.2`'s `seq` member (*"the entry's append
ordinal, strictly increasing from 1"*) and `DD-22`'s closed record:

> **One entry per SUCCESSFUL `write`, and one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE
> VERSION.** **A failed write appends NO entry**; **a delete that removed nothing (`D-3`) appends NO entry**.

**THE CLAUSE'S OWN ARITHMETIC, WHICH THE GATE-5 CELLS READ BACKWARDS.** *"one entry per SUCCESSFUL `delete`
THAT REMOVED AT LEAST ONE VERSION"* and *"a delete that removed nothing (`D-3`) appends NO entry"* divide the
deleting arms in terms: **`D-3`'s no-op is the ONLY deleting arm that appends none** (and `D-4`'s failure
appends none because it is not a successful delete at all), while **`D-1`'s and `D-2`'s successes each append
exactly ONE entry** — so the `seq` of the operation after such a delete is the preceding write's ordinal
**`+ 2`**, and not `+ 1`. **The gate-5 drive asserted `+ 1` — i.e. it encoded *"a successful version-removing
delete appends NOTHING"*, the opposite of the rule it cited.** The neighbouring cells (`D-3`'s no-op, `D-4`'s
failure, the failed write, and `NG-12`'s account of an intervening APPENDING write at `w_z.op.seq + 2`) were
right, and they are what made the two cells' arithmetic visibly the odd ones out.

**The drive, DRIVEN — with the same instrument the store offers for a `seq`** (NG-11, `§6.1` item 1 read over
the delete verb's own arms; **each arm on its OWN store and its own address**, so the `seq` delta is the
observable of THAT operation alone — a `seq` is read off the next write the same instance returns, `§6.2`):

| the operation | expected from the clause | observed (gate-6 run) |
| --- | --- | --- |
| `write(['a'], mem)` then **`delete(['a'], mem)`** (`D-1`, one version removed) | **ONE** entry → its ordinal is the write's `+ 1`, so the next write's `seq` advances by exactly `2` | receipt `tiers = [Mem]` ✓, the address resolves nothing afterwards ✓, **the next `seq` is `1 → 2 → 3`: the delete's own entry at `2` — PASS** |
| `write(['a'], mem)` then **`delete(['a'])`** (`D-2`, one version removed) | **ONE** entry → the next write's `seq` advances by exactly `2` | receipt `tiers = [Mem]` ✓, the address resolves nothing afterwards ✓, **`1 → 2 → 3` — PASS** |
| (adjacent, PASSING) `delete(['a'], file)` at an address holding only `mem` (`D-3`, removed nothing) | NO entry → the next `seq` advances by exactly `1` | advances by `1` — **PASS** |
| (adjacent, PASSING) `delete(['absent'])` (`D-4`, failed) and the unadmitted-value write (`F-2`, failed) | NO entry each → the next `seq` advances by exactly `1` | advances by `1` each — **PASS** |
| (adjacent, PASSING) the same-address rollback and the `D-4` delete that follows it | NO entry (a rollback is not a tracked verb, `M-9`; the failed delete removed nothing) | the next `seq` advances by exactly `1` — **PASS** |
| (adjacent, PASSING) **`NG-12`**'s intervening appending write between a rollback and the next write | the intervening WRITE is one entry → `w_z.op.seq + 2` | `+ 2` — **PASS, and driven unchanged at every pass** |

**Which side was wrong.** **This document's.** The two cells asserted the entry-formation rule's SUCCESS half
as *"append nothing"*; **`§6.1` item 1 requires exactly one entry for a successful version-removing delete and
reserves the no-append arm to `D-3`**, so the corrected cells now assert the write's `+ 2` and **cite `§6.1`
item 1 with `§6.2`** in their own text. **No assertion was weakened to force a pass and no clause was read
loosely to reach one:** the corrected cells assert MORE than the old ones — the arithmetic AND the delete's own
entry's ordinal between the two writes — and the arms the clause says append nothing are still driven at
exactly `+ 1`, so a store that appended for a `D-3` no-op, a `D-4` failure or a failed write would FAIL here.

**A NOTE ON WHAT THE PUBLIC SURFACE LETS THIS SET OBSERVE, STATED SO THE CELL IS NOT READ AS ASSERTING MORE
THAN IT CAN.** c`§6.3` makes `rollback` the journal's ONLY consumer and c`§4.4`'s `DeleteReceipt` carries
`address`/`tiers` with **no op handle** — nothing in `§0.4`'s table returns a delete's `JournalOp`, so a
blind scenario CANNOT name the delete's entry directly. What it CAN observe is the ordinal the contract makes
reachable: **the `seq` the next write returns (c`§6.2`), which is `+ 2` exactly when one entry lies between**,
read together with the delete's own effects (the address resolving nothing) and with the neighbouring arms'
`+ 1`. The delete's own entry's ordinal is therefore asserted as *the one ordinal between the two writes* and
recorded in the run's evidence notes (`write.seq = 1`, the delete's entry = `2`, the next write = `3`); the
entry's CONTENT is not asserted, because no clause and no call exposes it to a consumer.

**A NEW/UN-HARDENED REGRESSION RATHER THAN A FIRST-RUN FAIL — RESOLVED, AND THE FINDING IS ONE OF MINE.**
At the set's first run (`§3`'s as-authored record) this cell did not exist: the drive's delete at `['j']`
**failed** (`AddressNotFound`) because the rollback had emptied the address, so no successful delete was
observed by `NG-11` and the entry-formation rule's success half was not driven there. The gate-5 pass's
re-derived drive established a state a delete CAN succeed at — which is what made the clause's success half
observable — **and it then asserted that half backwards; this pass corrected the arithmetic, and the store's
answers were the contract's rule at every run.**

---

## §4. NG-18 — THE USER FLOW'S FINAL RESOLVED STATE

The flow as driven, with the observable at every step: create a store at `cfg = { filePath: <scratch>/…,
journalLength: 8 }` → write a tree at `temp` (a `MAP` holding a string, a boolean, and a nested `MAP` with a
number and an array) and read it back byte-equal → promote to `mem` and watch the `temp` version be purged
→ promote to `file` (twice, the second time to show the same-tier replacement) and watch the `mem` version
be purged → **restart the process** (a fresh `storeCreate` at the same `filePath`, which is
c`§7.2` item 6's declared boot) and read the committed tree back → a fresh instance's journal holds `0`
entries (c`§6.1` item 3) → the caller deletes the durable version and **re-boots**, and the version the
delete removed in memory **stands again** (`DD-28`'s declared consequence) → the caller writes a fourth
revision at `file` and instructs the rollback with the op that write returned.

**The final resolved state (observed, verbatim):**

```
address ['doc'] unqualified : Ok(Object({"rev": Num(3.0)}))         -- §2.3's lowest-persistence selection
address ['doc'] @file       : Ok(Object({"rev": Num(3.0)}))         -- the only tier standing at that address
tiers standing at ['doc']   : [File]                                -- one version, at the write's own tier
register (read([]))         : Ok(Object({"doc": Object({"rev": Num(3.0)})}))
file bytes at cfg.filePath  : {"doc":{"rev":4}}
```

**What must hold at the end, and does.** (i) the register holds exactly the one top-level key `doc`; (ii)
`['doc']` resolves at exactly **one** tier, `file`, and its resolved value is the revision the rollback
restored (`§6.4` `M-8`/`M-10`, `P-IM-3`); (iii) the unqualified read at the empty address is the whole
registry with each key's selected value (`R-5`); (iv) **the durable bytes carry the last SUCCESSFUL
file-tier write — rev 4 — and not the rolled-back rev 3**, because **a rollback performs NO file I/O**
(c`§7.2` item 5 + `DD-28`), so the in-memory resolved state (`rev 3`) and the committed bytes (`rev 4`)
legitimately diverge until the caller's next `file` write. **That divergence is the contract's own declared
consequence, stated here as the final state rather than smoothed:** a `file`-tier re-boot immediately after
that rollback would read `rev 4` back, exactly as `DD-28`'s wording predicts.

**The flow's own clause-bound verdicts:** the `temp`→`mem`→`file` promotion purged the lower tiers each
time (`A19`/`A15`); a re-promotion at the same tier replaced rather than accumulated (`DD-8`); the boot
loaded the committed content while `mem`/`temp` began empty (`§7.2` item 6, `O-2`'s drivable half); the
delete committed nothing (`DD-28`); the rollback reversed the named entry and echoed its `opId` (`M-7`,
`§6.3`). **All 27 assertions in NG-18 PASS.**

---

## §5. WHAT THIS PASS COULD NOT DERIVE FROM THE DOCS

1. **`Undefined` vs `Null` for an absent `BaseState.value`** — `§6.2` declares the two-member record and
   `§0.4` declares `Undefined` as a `StoreValue` member, but **no clause says which member an ABSENT
   pre-state's `value` carries**; the scenario asserts the reading `§1.4`/`§0.4`'s closure supports
   (`Undefined`) and records the divergence (**F-3**). A one-line clause would close it.
2. **The `<CONTAINER>` spelling: dots or slashes** — `§8.2` prints *"the address's own spelling"* and, in
   the `container` member's row, *"a dotted path such as `window.tabs`"*, while A14's example prints
   `'window.tabs'`. **The dotted form is the only spelling both worked examples support**, and the run uses
   it; a clause that names the separator would make the assertion exact rather than form-checked.
3. **`Segment`'s outside-segment variants and `AddressArg::Str` are not printed in `§0.4`'s table.** The
   table says *"`Segment::{Key(String), Index(u64)}` + the outside-segment variants"* and lists
   `AddressArg::Str(String)` without saying what `Str` is for. **Their spellings had to be read off the
   crate's generated API docs** (never off `src/**`). Each exists and each outside value is reachable
   (`Segment::{Negative, Fractional, Bool, Null, Object, Array, Function, Undefined}`), so `§1.5` item 1's
   refusal and `PAR-1`'s outside list are drivable — **but a contract that declares a permissive argument
   type "REQUIRED" for reachability should print the variant names it requires**, or a blind author cannot
   write the drive without the implementation's API docs.
4. **`§7.1`'s non-string `filePath` and non-number `journalLength` need a carrier spelling.** `§0.4`
   declares `FilePathArg::NonString` and `JournalLengthArg::{NonNumberString, NonNumberBool, Null, …}`
   without a payload, so "a non-string" is driven as the marker variant. **The answer (`AddressMalformed`)
   is unambiguous; only the drive's shape is underdetermined.**
5. **The `VEC` renumbering's tier scope is derived, not printed** — `DD-30` states that the surviving
   anchors keep their tier and their node and that the receipt's members are unchanged; the scenario drives
   it at one tier (`D-1`). **`DD-30` does not say whether a renumbering at ONE tier's delete leaves an
   anchor that stood at that index at ANOTHER tier in place.** NG-10 asserts the printed half only.
6. **The listener limbs are `P-3`'s and were NOT driven** (`A38`; `§6.5`'s boundary clause; `DD-23`): no
   order, no attachment rule, no firing, no throwing body, no callback invocation — **NG-16 drives the
   store's own PRODUCTION AND RETURN of the address list and nothing else**, and **no clause of this
   greens set lifts the park**.
7. **The `secure` instance's floor is `P-1`'s/`A32`'s and was NOT driven** (`DD-13`/`DD-15`): no scenario
   constructs a floor-bearing instance, since `A32` makes the floor client-side and `A36` makes a sub-floor
   address invisible — **an in-store drive would assert a clause the contract does not carry.**
8. **The process-exit lifetime has no in-process observable** (`§5.1`, `§6.1` item 3, `O-2`): NG-18 drives
   the **boot** side (`file` loads, `mem`/`temp` begin empty, the journal begins at `0` entries, which is
   exactly what the lifetime clause predicts for a process that ended) and **does not claim to have ended a
   process.**

**A review note on this greens set's own discipline.** This set was authored by an agent who did not
implement, from the documentation alone, and was run against the built crate **as a consumer** from outside
the repository (`/tmp/storeroom-blind/`, its own `Cargo.toml` with a path dependency on the repository root;
**no byte of `src/**` and no byte of the contract was read by the correction pass either**). **The six
expectations this document corrected during its first authoring are each named in `§1`'s table** (`W-5` over
an empty container is `W-4`; a `file` write purges the lower tiers, so a three-version selection drive writes
most-persistent-first; a tier-qualified nested read is bounded by `§2.2`'s walk clause, which is why a nested
tier set is probed through the parent's unqualified read; a rollback is subtree-wide per `M-5`; the `file`
bytes after a rollback are the last committed write's; a rollback of the newest in-scope entry reports that
entry in `undoneOps`). **This pass's corrections are the three `NG-11` cells and one `NG-08` cell named at
`§6`, each traceable to the `§` it now cites**, **and the gate-6 pass's corrections are the two `NG-11`
`D-1`/`D-2` entry-formation cells named at `§7`, each now citing `§6.1` item 1 with `§6.2`.**

---

## §6. THE GATE-5 PASS'S RECORD — the bounded correction pass after the contract's third/fourth/fifth amendments (kept as history; **its `2` FAILs are closed at `§7`**)

**Authority read.** `docs/specs/storeroom-native/contract.md` + its five parts
(`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`,
`implementation-plan.md`) **as they now stand**, with the three clauses that landed since this set was
written: **`§4.4`'s `VEC` renumbering on delete (`DD-30`)**, **`§2.1`'s register reference never carrying the
caller's tier** (the implementation was fixed to it), and **`§2.2`/`§2.3`/`§4.1`/`§4.2` + `§0.2` `DD-31`'s
read-assembly rule: the passed tier set governs WHICH VERSION EACH ADDRESS ANSWERS and never whether a read
answers — the WALK's steps fail `TierNotFound`, the ASSEMBLY's steps OMIT the member and produce no code;
the zero-tier read selects lowest-persistence per address and omits nothing.**

**What this pass changed, and why.**

| # | the cell | the `§` it now drives | what the old expectation contradicted |
| --- | --- | --- | --- |
| 1 | **NG-11** · the same-address rollback's reach and report | **`§6.4` `M-5` + `DD-21` + `M-8` + `DD-20` + `M-7`** | that rolling back `write(['j'])` leaves the earlier `write(['j'])` standing — a **PARTIAL** rollback, which `M-8`/`DD-20` forbid and `M-5`'s *"itself"* excludes |
| 2 | **NG-11** · `restoredTo` and the reads that follow | **`§6.4` `M-5`/`M-8` + `M-9` + `M-10` + `§6.2` property 1 + `§2.2`'s walk** | that the rollback's `before` half restores `"first"` at an address whose whole history the rollback reversed (`§6.4` `M-7` (ii): `restoredTo` reports the state the address **ACTUALLY** stands at, never an undone entry's pre-state) |
| 3 | **NG-11** · the delete that follows | **`§4.3`/`§4.4` `D-4`** first, then **`D-1`/`D-2`/`D-3` + `DD-9` + `§6.1` item 1** on their own stores | that a delete succeeds at the address the rollback had just emptied: *"a delete that removed nothing is a SUCCESS"* is `D-3`/`DD-9` and belongs to an address that **RESOLVES**, while an address resolving to nothing is `D-4`'s failure |
| 4 | **NG-08** · the register read under a passed set | **`§4.2`'s reconciliation clause (b) + `DD-31` + `§4.1`'s reconciliation** | that `read([], {file})` over a `temp`-only register key answers `TierNotFound` — the reading `§4.2`'s **as-filed** cell carried and the **fifth bounded amendment WITHDREW**; the read now answers `Ok(Object({}))` with the member OMITTED and NO code, which is `DD-31`'s own worked example (*"the empty object `DD-1` declares where nothing is left to assemble"*) |

**Driven UNCHANGED, at this pass's instruction, and reported at their as-authored expectation:** **`NG-08b`'s
two cells** — `read(['g'], {file})` answering the assembled object with the out-of-set descendant OMITTED
(the empty object where nothing remains) and `read(['g'], {file})` again as the `DD-1` form, with the
addressed-step read of the parent at its OWN tier answering the parent — together with the neighbouring
observations this document recorded under `F-1` (`read(['g','x'], {file,mem})` answering the `file` child
in `NG-08`; the set failing at a PASS-THROUGH step with `TierNotFound`, which `§2.2`'s walk half still
requires). **All of `NG-08b`'s cells now PASS (9 · 0), and the `F-1` observations PASS** — the implementation
was aligned to `DD-31` in parallel with this pass.

**The run, at the gate-5 pass.** `18` scenarios · **`357` assertions · `355` PASS · `2` FAIL**, identical
across three
consecutive runs, from `/tmp/storeroom-blind/` with `CARGO_TARGET_DIR=/tmp/storeroom-blind/target`.
**(The gate-6 pass's run is `357 PASS · 0 FAIL`, `§7`.)**
**Per-scenario: NG-01 16·0 · NG-02 11·0 · NG-03 9·0 · NG-04 15·0 · NG-05 29·0 · NG-06 23·0 · NG-07 18·0 ·
NG-08 12·0 · NG-08b 9·0 · NG-09 3·0 · NG-10 25·0 · NG-11 37·2 · NG-12 13·0 · NG-13 7·0 · NG-14 8·0 ·
NG-15 20·0 · NG-16 14·0 · NG-17 59·0 · NG-18 27·0.**

**The two FAILs this pass booked, with the clause on each side — and the side the gate-6 pass found wrong:**

| the assertion | its clause | the store's answer | which side was wrong |
| --- | --- | --- | --- |
| **NG-11** — the `D-1` cell's entry-formation assertion, at `seq + 1` (the next write's `seq` at the write's `+ 1`) | **c`§6.1` item 1** (*"One entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE VERSION"*) + **c`§6.2`** (`seq` = *"the entry's append ordinal, strictly increasing from 1"*) + `DD-22` | a `D-1` delete that removed one version and left the address unresolved — its receipt `tiers = [Mem]` — consumes **one** ordinal, so the next write reads `3` where the cell expected `2` | **THIS DOCUMENT** (finding **F-NEW-1**, re-derived at the gate-6 pass — the cell read the rule's success half backwards; `§3` and `§7`) |
| **NG-11** — the `D-2` cell's entry-formation assertion, the same `seq + 1` arithmetic | the same two clauses | a `D-2` unqualified delete that removed one version — receipt `tiers = [Mem]` — consumes **one** ordinal | **THIS DOCUMENT** (the same finding) |

**The greens set stood, at the gate-5 pass, NOT fully pass: `2` of `357` assertions FAILed, both on the delete
verb's entry-formation rule (`F-NEW-1`), and both were introduced by that pass's corrected drive** — the first
run's drive never reached a DELETE AT WHICH A DELETE COULD SUCCEED (the address was emptied by the same-address
rollback first), so the rule's success half was untested there. **The neighbouring arms of the same rule are
driven PASSING with the same observable** (`D-3`'s no-op, `D-4`'s failure, the failed write, and the
rollback), **which is exactly what showed the two cells' arithmetic to be the odd ones out** — and the gate-6
pass closed them by correcting that arithmetic (the delete appends one entry; the next operation's `seq` is the
write's `+ 2`), leaving the neighbouring `+ 1` arms driven as they stood (`§7`).

**Still not derivable, and unchanged by this pass** (the eight items of `§5` above): the `Undefined`/`Null`
spelling (**now implemented as `Undefined`, and the clause still does not print which member an absent state
carries**), the `<CONTAINER>` separator, the outside-variant spellings, the two construction carriers'
shapes, `DD-30`'s cross-tier question, the two parks (`P-3`, `P-1`/`A32`) and the process-exit lifetime.
**One addition from this pass:** **`§6.1` item 1 states the entry COUNT but no clause states where a
successful delete's journal entry's own handle would come from** — c`§6.3` makes `rollback` the journal's only
consumer and c`§4.4`'s `DeleteReceipt` carries no op handle, so **a blind consumer cannot name a delete's
`JournalOp`**; the rule is still fully drivable through `§6.2`'s `seq` of the next operation, which is what the
gate-6 pass's corrected cells do (`§7`).

---

## §7. THE GATE-6 PASS'S RECORD — the TWO-CELL CORRECTION (`NG-11`'s `§6.1` item 1 / `D-1` and `D-2` cells), and **`357 PASS · 0 FAIL`**

**Authority read at this pass.** `docs/specs/storeroom-native/contract.md` `§6.1` (item 1, the entry-formation
rule), `§6.2` (`JournalOp`'s closed shape and `seq`'s definition), `§6.3` (`rollback` as the journal's only
consumer), `§4.3`/`§4.4` (the delete's arms and `DeleteReceipt`'s two members), `§2.2`'s walk codes and
`§8.1`/`§8.2` — with `§0.4`'s surface table for the spellings. **No byte of `src/**`, `tests/**`,
`archive/gate3/**` or `archive/gate4/**` was read at this pass either, and no red-set, adversarial or
implementer report was read:** the correction is derived from `§6.1` item 1's own words (below) and from the
`seq`s the store's own calls returned in this pass's run.

**The two cells corrected, the `§` each now drives, and what the old arithmetic encoded.**

| # | the cell (harness `/tmp/storeroom-blind/src/g05.rs`, NG-11) | the `§` it now drives | what the OLD arithmetic encoded |
| --- | --- | --- | --- |
| 1 | the `D-1` arm's entry-formation cell (`g05.rs:85`) — `write(['a'], mem)` → `delete(['a'], mem)` → the next write | **c`§6.1` item 1** (*"one entry per SUCCESSFUL `delete` THAT REMOVED AT LEAST ONE VERSION"*, with *"a delete that removed nothing (`D-3`) appends NO entry"*) **+ c`§6.2`** (`seq` = *"the entry's append ordinal, strictly increasing from 1"*), asserted as the write's `+ 2` with the delete's own entry at the write's `+ 1` | `seq(next operation) == seq(the write before the delete) + 1` — i.e. ***"a successful version-removing delete appends NOTHING"***, which is the clause's `D-3` no-op arm applied to `D-1`'s success arm: the OPPOSITE of the rule the cell cited |
| 2 | the `D-2` arm's entry-formation cell (`g05.rs:102`) — `write(['a'], mem)` → `delete(['a'])` → the next write | the same two clauses, the same `+ 2` | the same `+ 1` — the same backwards reading, on the unqualified arm |

**Both cells now drive the delete's own entry's EXISTENCE AND ORDINAL with the arithmetic, rather than assuming
it:** the corrected cells assert that the delete's entry consumes exactly the one ordinal between the two writes
(`seq(next write) = seq(write) + 2`, so the delete's own entry is `seq(write) + 1`), and each cell's run records
that ordinal explicitly in the harness's evidence notes. **The observable is the one the contract makes
reachable** — c`§6.2`'s `seq` off the next write the same instance returns, since c`§6.3` makes `rollback` the
journal's only consumer and `DeleteReceipt` carries no op handle (the limitation is recorded in `§5`'s closing
addition).
**The neighbouring arms the clause says append NOTHING are driven unchanged at exactly `+ 1`** — `D-3`'s no-op,
`D-4`'s failure, the failed write, and the rollback — so the corrected cells cannot pass for a store that
appended where the clause forbids it, and **`NG-12`'s account of an intervening APPENDING write
(`w_z.op.seq + 2`) was already at this arithmetic and was driven unchanged.**

**Nothing else changed.** No other cell of `NG-11` and **no other scenario** was touched; **no assertion was
weakened, no expectation was smoothed and no clause was re-read to reach a pass** — the two cells assert more
than they did before (the arithmetic and the delete's entry's ordinal), and both FAILed at the gate-5 pass only
because the arithmetic was this document's error, **not the implementation's**. **The crate, the contract, the
harness's in-repo references and every other file were left exactly as they stood; the only file this pass wrote
inside the repository is this document.**

**The run at this pass.** The same harness, `/tmp/storeroom-blind/`, **read-only against the repository**, built
and run at its existing `CARGO_TARGET_DIR=/tmp/storeroom-blind/target`:
**`18` scenarios · `357` ASSERTIONS — `357` PASS · `0` FAIL**, identical across **three** consecutive runs
(outputs kept at `run50-gate6-correction.txt`, `run51-gate6-correction-repeat.txt` and
`run52-gate6-correction-third.txt`), **so no PASS in the corrected cells is flaky.**
**`NG-11`'s state: PASS (39 PASS · 0 FAIL)** — the gate-5 row's `37 · 2` with the two corrected cells now
PASSing and no other cell moved. **Per-scenario: NG-01 16·0 · NG-02 11·0 · NG-03 9·0 · NG-04 15·0 ·
NG-05 29·0 · NG-06 23·0 · NG-07 18·0 · NG-08 12·0 · NG-08b 9·0 · NG-09 3·0 · NG-10 25·0 · NG-11 39·0 ·
NG-12 13·0 · NG-13 7·0 · NG-14 8·0 · NG-15 20·0 · NG-16 14·0 · NG-17 59·0 · NG-18 27·0.**

**`NG-11`'s corrected cells, as the run returned them** (`write.seq = 1`, `the delete's entry = 2`, the next
`write.seq = 3` — one entry between, which is the clause's rule):

| the corrected assertion | expected | observed |
| --- | --- | --- |
| **§6.1(1)/§6.2/D-1**: a successful version-removing delete appends EXACTLY ONE entry, so the next write's `seq` is the write's `+ 2` | `3` | `3` — **PASS** (its evidence note: `write.seq = 1`, the delete's entry = `2`, the next write.seq = `3`) |
| **§6.1(1)/§6.2/D-2**: the same rule on the unqualified arm | `3` | `3` — **PASS** (the same ordinals) |
| (adjacent, unchanged) **§6.1(1)/D-3**: the no-op delete appends NO entry (the next `seq` advances by exactly one) | the write's `+ 1` | `+ 1` — **PASS** |
| (adjacent, unchanged) **§6.1(1)/D-4** and **§6.1(1)/c§3.5**: the failed delete and the failed write append NO entry | the write's `+ 1` each | `+ 1` each — **PASS** |

**THE VERDICT OF THIS SET, AT THIS PASS: the greens set is FULLY PASS — `357` of `357` assertions, `0` FAIL,
stable across three consecutive runs — and `NG-11` is PASS (39 · 0).** **No failure remains, so no clause stands
with a disputed side at this pass:** the gate-5 pass's two FAILs were **this document's own arithmetic**
(`F-NEW-1`, closed at `§3`), the store's answers were `§6.1` item 1's rule at every run, and the arms the rule
reserves to *no append* are still driven at `+ 1` and still PASS. **This set remains a blind set, authored and
corrected from the documentation alone by an agent who did not implement the unit, and run as a consumer from
outside the repository** — and **the two cells corrected here are named, with the `§` they now drive, so a
reviewer can check them against `§6.1` item 1 and `§6.2` without re-running anything** (`§6`'s discipline note,
`§5`, is unchanged and stands for this pass too).

---

## §8. THE LISTENER-AMENDMENT PASS — `NG-19`…`NG-25`, authored 2026-10-11 from the dated `⟶ AMENDED` clauses, and this set's run at that pass: **133 PASS · 0 FAIL** for the amendment's own scenarios

**Authority read at this pass, and nothing else.** `docs/specs/storeroom-native/contract.md` + its five parts
(`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`,
`implementation-plan.md`), **read at their dated `⟶ AMENDED 2026-10-11` clauses** — `store-model.md §1.6` item 4
and `§1.5` item 4 and `§2.1`'s empty-address block; `write-and-read.md §3.1.1` (the `listen` row),
`§3.2` items 2/4 and its amendment, `§3.6`, `§4.4`, `§6.5` items 8–13; `seams-and-lifecycle.md §7.1` (the
ordered sequence and both amended rows) and `§7.2`; `parameter-semantics.md §2.6`/`§2.7`/`§2.12`/`§2.13`/`§2.14`;
`contract.md §0.2 · DD-32`…`DD-40`, `§0.4`'s amended spelling table, `§5.6`'s `P-TP-6`, `§5.8`'s re-derived row
and its `F-3` re-derivation, `§8.1` #12/#13 and `§8.2`'s generator table — **and the architect's proposal with
every ruling verbatim**, `docs/specs/storeroom-listeners-proposal.md` **`§8`–`§20` (`A40`–`A58`)**.
`docs/specs/storeroom-listeners-proposal-review.md` and `docs/pending.md` were read as the gate-1 record and the
tracker (`P-1` still `OPEN`; **the JS integration was NOT driven** — no scenario of this pass crosses a boundary).
**NO BYTE OF `src/**`, `Cargo.toml`, `Cargo.lock` OR `tests/**` WAS READ AT THIS PASS, AND NO RED-SET OR
ADVERSARIAL REPORT WAS READ.** The crate was reached **only as a consumer**, from the scratch harness
**outside the repository** (`/tmp/storeroom-blind/`, its own `Cargo.toml`, `CARGO_TARGET_DIR` outside the repo),
and **no `cargo` command was run inside the repository**. **The only byte this pass wrote inside the repository
IS THIS SECTION** — every earlier scenario, count, table and byte of this document stands untouched.

**How the two things `§0.4` does not print as variants were obtained.** The amendment's Rust surface is declared
at `contract.md §0.4`; where `§0.4` names a type but not its variants (`ListenersArg`, `ListenerEntry`), the
variant list was read off the **crate's own generated `cargo doc` output**, regenerated at this pass from a
scratch probe outside the repository (`/tmp/storeroom-doc/`) — **never off `src/**`**. That output is also the
evidence for `NG-24`'s supersession cell: the crate's public item list carries `Listener`, `ListenerEntry`,
`ListenerHandle`, `ListenersArg`, `Store::listen` and `Store::unlisten`, and **no `WatchHandle` and no `Watch`**.

**The amendment's scenarios — 7 scenarios, 133 assertions, each bound to its clause.**

| id | The clause(s) it drives (and the ruling where one governs) |
| --- | --- |
| **NG-19** | **the register's carrier node and its own conditional tier**: `findAddress([], t)` answering the register's OWN tier whatever `t` the caller passed, in a `file` store and a `mem` store; `read([])` as the whole register OBJECT; the tier's fixity across a `file` commit, a delete and a `mem` write; **the home is NOT inside that object and no address answers it** (a listener-only store's `read([])` is `Object({})`; the registration nonetheless fires; a register key spelled `listeners` is an ordinary graph key) — sm`§1.6` item 4 (a)–(d), sm`§1.5` item 4, sm`§2.1`'s amended block, w`§4.1`'s register row, w`§6.5` item 8 (a)–(e) · **`A41`** · **`A42`** · **`A48`** · **`A49`** · **`A50`** · **`A57`** |
| **NG-20** | **the register's conditional tier, fixed at creation, with its bound REAL**: a reachable path ⇒ `file` and `3` register-key drives at all three tiers succeeding; a `file`-tier commit failure ⇒ `FileCommitFailed` with the tier standing (`DD-34`); no path ⇒ `mem`, where a `file`-tier write at a register key FAILS `ParentAnchorMonotonicityViolation` while `mem`/`temp` succeed, and where the same write BELOW a register key (through the chain) fails and the `mem` rung succeeds — sm`§1.6` item 4 (d) (i)/(ii) and its following amendment, w`§3.2` items 2/4 and its amendment (i)–(iii), w`§3.4` arm `F-6`, w`§3.5`, `contract.md §5.4`'s amended shadow clause, `§5.6`'s `P-TP-6` register drives (`3 + 3`), `§7.2` items 2–4, `§8.1` #6/#15, `DD-34` · **`A42`** · **`A49`** · **`A50`** · **`A51`** |
| **NG-21** | **the construction**: an absent parent directory, a path that IS a directory, and an existing but READ-ONLY file each answering **`FilePathUnreachable`** with `§8.2`'s generated message exact; a fresh path with a writable parent succeeding, the register fixed at `file`, and **the dry run leaving NOTHING behind** (the file absent after `storeCreate`; the parent directory's entry count unchanged; the directory and the read-only file's bytes untouched); `journalLength`'s absence still `ConstructionArgumentMissing` at a present path and at an absent path; **the ordered sequence** — the register begins EMPTY while the home is already populated, so a construction-supplied listener fires on the FIRST write; an EMPTY `listeners[]` legal; a DUPLICATE address admitted with BOTH entries kept and BOTH handles returned (`DD-39`); the caller's token adopted VERBATIM; the home INSTANCE-scoped; an ABSENT `listeners` argument ⇒ `AddressMalformed` — sj`§7.1`'s amended sequence (steps 1–7) and its two amended rows, ps`§2.6`/`§2.7`/`§2.12`/`§2.13`, `contract.md §8.1` #12/#13, `§8.2`'s `FilePathUnreachable` row, `DD-17` (narrowed), `DD-39`, `DD-40` · **`A49`** · **`A52`** · **`A53`** · **`A54`** · **`A55`** · **`A56`** |

**⟶ AMENDED 2026-10-13 — THIS CELL'S *"THE DRY RUN LEAVING NOTHING BEHIND"* HALF IS SUPERSEDED FOR THE PASSING PATH, AND ITS RE-DERIVATION IS NAMED AS AN OWED ITEM RATHER THAN LEFT TO THE NEXT READER** (`RCA-8(d)` ANNOTATE-BESIDE: **this cell stands byte-for-byte and is read THROUGH this clause; the table's other rows, its `NG-21` citation set and its id are UNMOVED — no row is added, dropped or renumbered, and this clause authors no scenario**; `docs/specs/storeroom-native/contract.md §10.4`; that document's `§7.1` step 4b and `§8.1` #13's amended trigger clause; `docs/specs/storeroom-access-probe-review.md` `§5.1`'s `S-8` row; the `docs/decisions.md` rows of `2026-10-13`; `[T: the superseded half and the owed re-derivation, so a blind scenario is not driven against a clause that moved | CROSS-REF + ONE OWED]`).
- **(1) WHAT MOVES, IN THE CELL'S OWN WORDS: its parenthetical *"the file absent after `storeCreate`"* is FALSE OF THE PASSING PATH AFTER THIS AMENDMENT — a fresh path with a writable parent now constructs AND LEAVES THE STORE'S OWN ZERO-LENGTH FILE at that path — while the parenthesis's OTHER TWO halves stand whole and remain the drive: *"the parent directory's entry count unchanged"* holds for a FAILED construction and *"the directory and the read-only file's bytes untouched"* is exactly the untouched-bytes half this amendment preserves.** **So the cell's own *"the dry run"* phrase is read as before: the PROBE creates nothing, and the create is the STORE'S OWN ACT.**
- **(2) WHAT THE CELL'S OWN SUBJECT NOW CARRIES, STATED SO THE RE-DERIVATION IS DERIVABLE: the passing path's observables are THE FILE PRESENT WITH LENGTH `0`, THE PARENT DIRECTORY'S ENTRY COUNT MOVED BY EXACTLY ONE, and NO BYTE WRITTEN (`contract.md §10.4` part 3; `DD-28`'s amended cell) — and the three unreachable forms keep their `FilePathUnreachable` answers with NOTHING created, joined by the two forms this amendment makes decidable for the first time: the READ-ONLY MOUNT and the ACL-deny/ownership-mismatch (`§8.1` #13's amended trigger clause, part (a)).**
- **(3) AND THE RE-DERIVATION IS `OWED`, WITH ITS OWNER AND ITS POSITIVE REVISIT CONDITION: owner — the TestWriter role, at the pass that drives these blind scenarios; positive revisit condition — the amendment's code change landing (`src/store.rs`'s exclusive create and its arm (b)), after which `NG-21` is re-derived against `contract.md §10.4` and this cell's figure is re-printed.** **It is NOT re-derived in this pass: no scenario, no executable test and no run figure is authored by a spec amendment, and this file's header figures (`357 PASS · 0 FAIL`; the amendment's `133 PASS · 0 FAIL` and `NG-21`'s `26·0`) stand as the runs they record** (`docs/specs/storeroom-native-greens.md`'s header; `[T: the owed re-derivation, so no run figure is read as re-run | OBSERVATION]`).
**⟶ AND 2026-10-13 — THIS ITEM'S `OWED` STATE IS RECORDED AS STILL OWED WHILE THE CLAUSE THAT COUNTED A DRIVE FROM IT HAS BEEN REPOINTED, AND NO CELL, NO SCENARIO AND NO RUN FIGURE IS AUTHORED HERE** (the gate-4 adversarial pass's `F-3`; `RCA-8(d)` ANNOTATE-BESIDE: **the `NG-21` re-derivation clause above, its `(1)`/`(2)`/`(3)` items, its cell and the table's `NG-21` row STAND BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause adds NO scenario, renumbers NO id and re-prints NO figure**; `docs/specs/storeroom-native/contract.md`'s `§5.7` `P-TP-7` clauses of the same date; `tests/construction_access_probe.rs`; `[T: the citation, repaired at the document that made the promise, so no census counts a drive from a home that records it as owed | CROSS-REF]`).
- **(1) WHY THIS CLAUSE EXISTS AT ALL, AND IT IS A CITATION DEFECT RATHER THAN A BEHAVIOURAL ONE: `docs/specs/storeroom-native/contract.md`'s `§5.7` census clause counted the two newly-decidable refusal forms' drives *"by `docs/specs/storeroom-native-greens.md`'s `NG-21` re-derivation clause's parenthesis (2)"* — a parenthesis that DECLARES WHAT THE CELL'S SUBJECT NOW CARRIES and drives nothing — while this item marks the re-derivation `OWED` and this document's harness IS NOT IN THIS REPOSITORY AT ALL (`/tmp/storeroom-blind/`, named at `:37` above).** **This item's own positive revisit condition reads *"the amendment's code change landing"*, and THAT CONDITION HAS FIRED, so the citation was left standing on a promise whose condition had already been met.** **NO BEHAVIOUR OF THE CRATE IS IN QUESTION AND NO FIGURE OF THIS DOCUMENT MOVES.**
- **(2) WHERE THE DRIVES ARE NOW, CITED AND NOT RESTATED: they live in `tests/construction_access_probe.rs` and are named by this project's contract at its own clause of this date — the `EROFS` read-only-mount cell, the ownership-mismatch cell that drives `/usr/bin` (the path `DEF-20` measured), the `EACCES` access-ACL cell recorded `SKIPPED-UNREACHABLE` with its measurement printed, and the file's own census cell that names each form's driving cell.** **THIS DOCUMENT DOES NOT RESTATE THEM AND PRINTS NO FIGURE OF ITS OWN: the figure's one home is that contract clause, and this file's recorded run figures — the header's `357 PASS · 0 FAIL`, the amendment's `133 PASS · 0 FAIL` and `NG-21`'s `26·0` — STAND AS THE RUNS THEY RECORD AND ARE NOT RE-PRINTED AS A RE-DERIVATION** (`RCA-13`: **an enumerable is carried once and cited**; `docs/specs/storeroom-native/contract.md`'s `§5.7` clause of this date).
- **(3) WHAT REMAINS OWED, SAID SO THE REPOINT IS NOT READ AS A DISCHARGE BY RE-LABELLING: this item's SCENARIO — `NG-21` re-derived against `contract.md §10.4` — is STILL OWED to the TestWriter at a pass whose wall holds this document, and only the CONTRACT CENSUS'S CITATION of it is discharged here.** **This document's harness is outside the tree and no pass of this one may run it** (`:37` above; the `§8.1` run's own harness clause); **so the debt is named and not paid, and it is not paid by this clause's existence.**
| **NG-22** | **the listener surface**: `listen` returning a store-minted handle; **address-level idempotence** (a second `listen` at one address returns the SAME handle and the trigger fires it once); `unlisten` over a FABRICATED, a FOREIGN-instance and a PRIOR-SESSION handle each a **no-op success** that removes nothing, and the real `unlisten` removing exactly one entry; the trigger's handle set on a **write** and on a **delete**; **a read, `findAddress` and `readLiteral` firing NOTHING**; `D-3` carrying `triggered: []` with `tiers: []`; **no tier test at any trigger** (`DD-36`); the descendant-inclusive binding (`{own, ancestor}` exactly, a strict descendant and an unrelated address excluded); `watched` as the ADDRESS PROJECTION of `triggered`; a never-triggered listener absent from the list — w`§6.5` items 10 (a)–(f) and 12 (a)–(c), w`§3.6`, w`§4.4` and its amendment, `contract.md §0.4`'s `ListenerHandle` construction rule (clauses 1–3), `§5.8`'s re-derived property (a)–(g) and drives (i)–(iii)/(vi) + `F-3`, `DD-18`, `DD-36`, `DD-37`, ps`§2.13` · **`A43`** · **`A57`** · **`A58`** |
| **NG-23** | **the two lists and the borrows**: a listener at a node firing for THAT node's own change and an inherited one firing for a DESCENDANT's change; **no handle duplicated** (an ACTIVE listener is not also carried — one fire per write); the borrows **dropped with the node** while the ADDRESS binding survives — observed across a `W-6` purge, a `W-2` re-mint, a `delete` and a re-mint at the same address (the trigger returns the caller's own handle EXACTLY ONCE each time, nothing lost and nothing re-minted); a listener at a strict DESCENDANT of a deleted address NOT firing and one AT it firing; a `leaf`'s ACTIVE list non-empty — w`§6.5` item 9 (a)–(e) and item 10 (b), w`§6.5` item 12, sm`§1.1`'s amended member tables, `§5.6`'s `P-TP-6` listener half, `§5.8` drive (iv), w`§3.4` arms `W-1`/`W-2`/`W-6`, ps`§2.14` · **`A45`** · **`A46`** · **`A47`** |
| **NG-24** | **the `watch` supersession**: the listener surface as the only registration path (`listen` MINTS its handle and `unlisten` takes it back); **nothing of the superseded surface reachable** (`cargo doc`'s item list carries no `WatchHandle`/`Watch` — recorded as an observation, not counted); `watched` keeping ADDRESSES while `triggered` carries HANDLES and the two lists corresponding item for item; a listener at a strict descendant never returned for a write at the ancestor — `contract.md §0.4`'s amended table, the proposal's `§19`/`§20`, w`§6.5` item 13, w`§3.6`, w`§5.8`'s re-derived property (e)–(f) and drive (vi), `DD-35`, `DD-36`, `DD-37` · **`A58`** |
| **NG-25** | **THE USER FLOW to the FINAL RESOLVED STATE**: create a store WITH a path and a construction `listeners[]` array; write the tree at `temp` and verify; promote the tree and the leaf to `mem` (the `temp` rung purged by `W-6`) and verify; promote to `file` and verify the chain's `[false, false, true]`; the triggered handles at EVERY step; **restart the process** (a fresh `storeCreate` over the equal `cfg.filePath`) and verify the durable `file` state, the loss of `mem`/`temp`, the home's state as the contract declares it (`DD-38`: no registration loaded, the home exactly the construction's own array) and the post-boot trigger; then a `D-1` delete and a `D-3` delete with their `triggered` sets, and the delete's non-commit (`DD-28`) — sj`§7.1` steps 3–7, sj`§7.2` items 1/5/6, w`§5.4`'s chain, w`§3.2` item 2 (the parent chain must resolve — `F-3`), w`§6.5` items 8 (e)/9 (a)/10 (c)/11, w`§4.4` (`D-1`/`D-3`) and its amendment, `contract.md §1.6` item 4 (d), `DD-28`, `DD-38`, `DD-40` · **`A41`** · **`A43`** · **`A50`** · **`A56`** · **`A58`** |

**Coverage against this pass's brief.** (1) the register's carrier node and its own tier → **NG-19**; (2) the
conditional tier and the monotonic refusal at a register key and through the chain → **NG-20**; (3) the
construction, its three unreachable forms, the dry run, `journalLength`'s narrowed absence and the ordered
sequence → **NG-21**; (4) the listener surface — the returned handle, address idempotence, `unlisten`'s outside
handles, the two trigger events and never a read, the descendant-inclusive binding and `D-3` — → **NG-22**;
(5) the two lists and the borrows' destruction → **NG-23**; (6) the `watch` supersession → **NG-24**; (7) the
user flow to the final resolved state → **NG-25**.

---

## §8.1 THE RUN — the amendment's own scenarios `133 PASS · 0 FAIL`, and the pre-amendment set's `8` FAILing cells (each a SUPERSEDED expectation, not a verdict on the crate)

**Harness and invocation.** `/tmp/storeroom-blind/` — a new module `src/g08.rs` (the seven scenarios above) beside
the pre-amendment modules, `CARGO_TARGET_DIR=/tmp/storeroom-blind/target`, run **read-only** against the
repository with `cargo run --offline`, from outside the repository. **Three consecutive runs, identical figures**
(outputs kept at `/tmp/storeroom-blind/run61-amendment.txt`, `run62-amendment-repeat.txt`,
`run63-amendment-third.txt`), **so no cell of this pass is flaky**.

```
amendment (NG-19..NG-25) assertions PASS: 133   FAIL: 0
pre-amendment set (NG-01..NG-18)   PASS: 358   FAIL: 8
TOTAL                              PASS: 491   FAIL: 8
```

**The amendment's per-scenario figures: NG-19 15·0 · NG-20 14·0 · NG-21 26·0 · NG-22 28·0 · NG-23 13·0 ·
NG-24 7·0 · NG-25 30·0.**

**THE AMENDMENT'S SCENARIOS ARE FULLY PASS: `133` of `133` assertions, `0` FAIL** — so at this pass **no
amendment clause stands with a disputed side: the crate answers every one of the `A40`–`A58` clauses this pass
drives, value by value.** The values the deciding observables returned are recorded in each scenario's evidence
notes in the run output; the ones a reviewer is most likely to want are printed verbatim in the table below.

### §8.1.1 THE EIGHT FAILING CELLS, AND WHY EACH IS A SUPERSEDED EXPECTATION RATHER THAN A DEFECT

**These cells belong to the PRE-AMENDMENT scenarios (`NG-04`, `NG-09`, `NG-14`, `NG-16`, `NG-17`) and to the
asymmetry table's own `14`-member closure. Each asserts a state that the `⟶ AMENDED 2026-10-11` clauses move,
so the cited clause now puts MY OLD EXPECTATION in the wrong — the crate's answer is the amended rule's.** They
are driven at their as-authored expectation and reported FAILing **rather than weakened, re-worded or deleted**
(this document's discipline: a divergence is reported with the clause on each side).

| the cell (and its scenario) | its as-filed clause | the store's ACTUAL answer | which side the amendment puts in the wrong |
| --- | --- | --- | --- |
| **`NG-04`**: `findAddress([], file).anchor.tier is NOT the caller's tier (the register has no parent anchor)` | sm`§2.1`'s THIRD-amendment block, whose ground was `§1.6` item 3's *"it has NO parent anchor … the register carries no tier of its own"* | `anchor.tier = File` in a `file`-register store | **THE OLD EXPECTATION.** sm`§1.6` item 4 (a)/(d) gives the register a parent anchor and an own CONDITIONAL tier FIXED at creation, and sm`§2.1`'s `⟶ AMENDED` clause (2)/(4) supersedes exactly the sentence the cell rested on — **and the crate answers the amended rule** (`NG-19`'s four tier cells PASS on the same state) |
| **`NG-09`**: `neither answer asserts the caller's tier` (the guard was `t_file != File && t_file != Temp`) | sm`§2.1`'s third-amendment block (*"NEVER the caller's `t`"*, read as *"never `File`, never `Temp`"*) | both answers are `File` in a `file`-register store — i.e. the register's OWN tier | **THE OLD EXPECTATION'S SECOND HALF.** The amended clause keeps *"never the caller's `t`"* and adds that the one reference's tier IS the register's own, so in a `file`-register store *"not the caller's tier"* and *"`File`"* hold of the SAME answer (`NG-20`'s `findAddress([], mem)` cell PASSES with `File` in a `file` store and `Mem` in a `mem` store) |
| **`NG-14`**: *"(as-filed) a directory path returns an instance and the commit fails at first write"* | w`§7.2` item 2 + `§8.1` #15 (the state reached the commit path) | `storeCreate` throws **`FilePathUnreachable`** and returns NO instance | **THE OLD EXPECTATION.** sj`§7.1` step 3 with `DD-40`(b) moves this state to CONSTRUCTION (*"a directory path … is UNREACHABLE at construction"*), and the same state reached LATER by a `file` write on an already-constructed store remains `FileCommitFailed` — the crate answers both halves (`NG-21`'s directory cell and `NG-20`'s commit-failure cell PASS) |
| **`NG-16`**: *"a file-qualified registration is NOT returned after a write at mem"* | w`§6.5` item 7 (a) + `DD-26` (the tier qualifier's suppression) | no such pre-state is reachable: `listen(address)` carries ONE argument, so the drive cannot be spelled at all | **THE OLD EXPECTATION.** `A58` supersedes `watch` in ONE pass and `DD-36` rules the listener's `address` the WHOLE of its key, with **no tier test at any trigger** — *"the pre-state `§6.5` item 7 (a) names HAS NO INSTANCE"* after this amendment (`§5.8`'s `F-3` re-derivation states it in the register's own words) |
| **`NG-16`**: *"(as-filed) the tier-qualified pre-state"* | the same two clauses | the same: unreachable | **THE OLD EXPECTATION** (the same finding, on the second pre-state) |
| **`NG-16`**: *"(as-filed) the tier-qualified registrations at 't' are untouched by an unrelated unlisten"* | w`§6.5` item 6 (the withdrawal leaves other registrations alone) | the registration at `['t']` is unqualified (the only spelling the surface has), so the cell's qualifier cannot exist | **THE OLD EXPECTATION.** The clause's SUBSTANCE — one withdrawal removes exactly one entry and leaves the others — is driven and PASSES at the listener's own arity (`NG-22`'s `unlisten` cells and `NG-23`'s `['t']`-style arm) |
| **`NG-17`**: *`ConstructionArgumentMissing` ((as-filed) `cfg.filePath` absent)* | `§8.1` #12's as-filed trigger (*"`storeCreate` called with `cfg.filePath` absent, or with `cfg.journalLength` absent"*) | `AddressMalformed` | **THE OLD EXPECTATION.** sj`§7.1`'s amendment NARROWS `DD-17`: *"`storeCreate` with a missing `journalLength` fails at construction with `ConstructionArgumentMissing`"* and an ABSENT `filePath` is **LEGAL** (the register is created at `mem`); the crate answers the amended rule (`NG-19`/`NG-20`'s absent-path stores are returned and read as `mem`, and `NG-21`'s absent-`journalLength` cells PASS with the member) |
| **`NG-17`**: *"(as-filed) the set's `14` members are each produced by at least one drive above"* | `§8.1`'s as-filed heading (*"the closed code set — `14` members"*) and its `14 = 14` arithmetic | the set carries `15` (`FilePathUnreachable` at rank `13`) | **THE OLD EXPECTATION.** `A53` (*"Add new failure code"*) + `A54` (*"Default name"*) close the set at `15` with `11 + 2 + 1 + 1 = 15` ✓, and the amendment's own `FilePathUnreachable` cells PASS (`NG-21`'s three unreachable forms, each with `§8.2`'s generated message exact) |

**AND THE PRE-AMENDMENT SET'S `358` PASSING CELLS ARE ITS OWN, WITH EIGHT CELLS GAINED AND NOTHING WEAKENED.**
The pre-amendment scenarios now drive `366` cells (`356` at their as-authored expectation + `8` at the superseded
one + `2` added to drive the amended rule's own state positively): `NG-15 21·0` (its absent-`filePath` arm is
driven POSITIVELY — an instance IS returned and its register reads `mem` — and its as-filed expectation stands as
the FAILing cell in `NG-17`'s list), `NG-17 62·2` (its `FileCommitFailed` drive is re-pointed to the commit arm's
other reachable failure — a read-only PARENT directory, the probe having passed before the chmod — and a
`FilePathUnreachable` drive is added; its two FAILs are the absent-`filePath` and the `14`-member cells), and
`NG-14 9·1` (its commit-failure arm re-pointed the same way, its superseded directory-path cell kept as the
FAILing one). **Per-scenario for the pre-amendment set: NG-01 16·0 · NG-02 11·0 · NG-03 9·0 · NG-04 14·1 ·
NG-05 29·0 · NG-06 23·0 · NG-07 18·0 · NG-08 12·0 · NG-08b 9·0 · NG-09 2·1 · NG-10 25·0 · NG-11 39·0 ·
NG-12 13·0 · NG-13 7·0 · NG-14 9·1 · NG-15 21·0 · NG-16 12·3 · NG-17 62·2 · NG-18 27·0** (`16+11+9+14+29+23+18+12
+9+2+25+39+13+7+9+21+12+62+27 = 358` ✓ and the `8` FAILs are the eight cells of `§8.1.1`'s table). **No
assertion was deleted, no expectation was smoothed to a pass and no clause was re-read to reach one; the `8`
FAILs are the record, and the amendment's own scenarios carry the amended rule's `133` PASSes.**

### §8.1.2 THE DECIDING VALUES, PRINTED AS THE RUN RETURNED THEM

| the observable | expected (from the clause) | observed |
| --- | --- | --- |
| `findAddress([], t).anchor.tier` in a store created WITH a reachable path — for `t` ∈ {`file`, `mem`, `temp`, absent} | `File` (the register's own, whatever `t` the caller passed) | `File` · `File` · `File` · `File` — **PASS** |
| `findAddress([], mem).anchor.tier` in a store created WITHOUT a path | `Mem` (the register's own) | `Mem` — **PASS** |
| a `file`-tier write at a register key of a `mem` register | `ParentAnchorMonotonicityViolation` | `"…'k' outranks its parent anchor's tier in 'k', a child anchor may not be more persistent than its parent"` — **PASS** |
| the same, one level BELOW a register key (`['p','b']`, parent at `mem`) | `ParentAnchorMonotonicityViolation` | `"'b' outranks its parent anchor's tier in 'p.b', …"` — **PASS** |
| a path with an absent PARENT DIRECTORY · a path that IS a directory · an existing READ-ONLY file | `FilePathUnreachable` with `§8.2`'s exact message | `'<path>' is not reachable at construction, the path must exist or the application must be able to write it` — **PASS** (all three) |
| the dry run: is the configured file present after `storeCreate`, and does the parent directory gain an entry? | absent · the entry count unchanged | absent (`1896` entries before and after) — **PASS** |
| `read([])` in a store whose ONLY content is its home (a listener from `listeners[]`, no write at all) | `Object({})` — the home is NOT a register key | `Object({})` — **PASS** |
| the first write in a store whose `listeners[]` supplied `{['w0'], "ORD-1"}` | `triggered = ["ORD-1"]`, `watched = [['w0']]` | exactly that — **PASS** |
| the construction's duplicate entries (`{['dup'],"DUP-A"}`, `{['dup'],"DUP-B"}`) fired by a write at `['dup']` | both handles | both — **PASS** |
| a second `listen` at one address, then a write there | the same handle, returned ONCE | `listen(['L']) -> listener-6` twice, one handle returned — **PASS** |
| `unlisten` over a fabricated / a foreign-instance / a prior-session handle | a no-op success, removing nothing | `Ok(())` each, and the registration still fires — **PASS** |
| `D-3` (a delete that removes nothing) | `tiers: []` AND `triggered: []` | `[]` and `[]` — **PASS** |
| a write at a strict descendant of a listener's address | `{own-address, ancestor-address}` handles, nothing else | both, and neither the strict descendant's nor the unrelated listener's handle — **PASS** |
| the `W-6` purge, the `W-2` re-mint and a `delete` of the node holding a listener, then a re-mint at that address | the caller's handle, returned EXACTLY ONCE each time | `listener-15` / `listener-15` / `listener-16` / `listener-16` — **PASS** |
| a listener at a `leaf`'s own address | fires on the write that resolves to it, and again on the leaf's own change | fires twice — **PASS** |
| `FileCommitFailed` after the configured path became a directory | status `FileCommitFailed` with `§7.2`'s commit message | `'x' could not be committed to '<path>', the file write failed at '<path>'` — **PASS** |

### §8.1.3 NG-25'S FINAL RESOLVED STATE, as the run returned it

**The flow's evidence, in the run's own values:** the file's committed bytes just before the restart were
`{"app":{"body":"text-file","title":"final-leaf"}}`; at boot `read([]) = Object({"app": Object({"body":
Str("text-file"), "title": Str("final-leaf")})})` and `read(['app','title'], file) = Ok(Str("final-leaf"))`;
after the two post-boot file writes the bytes were `{"app":{"body":"text-file","title":"boot-write-2"}}`; and
after the `D-1` delete of `['app','title']` at the `file` tier the receipt carried `tiers: [File]` and
`triggered: ["FLOW-1"]` (the caller's own token, adopted VERBATIM at construction), while a `D-3` delete of
`['app','body']` at the `temp` tier carried `tiers: []` and `triggered: []`.

**THE FINAL RESOLVED STATE OF THE INSTANCE, value by value:** `read([]) = Object({"app":
Object({"body": Str("text-file")})})` — the register carries the single key `app`, whose only surviving child is
`body` (the deleted `title` is gone in memory); **`findAddress([], file).anchor.tier = File`** — the register's
tier is still the one fixed at creation; **`read(['app','title'], file) = Err(AddressNotFound)`** (`"'title'
does not exist in 'app', app are 'body'"`) — the `D-1` delete removed it and a delete does NOT commit
(`DD-28`); **`read(['app','body'], file) = Ok(Str("text-file"))`** — the durable version of the last successful
`file`-tier write at that address survived the restart; **`read(['app','body'], temp) = Err(TierNotFound)`** —
`temp` (and `mem`) did not survive the process exit; and **the `file` bytes on disk still carry
`boot-write-2` for `app.title`** — the durable state is the LAST `file`-tier WRITE's, exactly as `DD-28`
declares a delete's non-commit.

### §8.2 WHAT THIS PASS COULD NOT DERIVE FROM THE DOCS (the amendment's own gaps, named rather than papered)

1. **The construction's `listeners`-ABSENCE answer is stated in TWO places with ONE voice and one gap.** ps`§2.12`
   (`PAR-12`) names *"ABSENT from `cfg`"* among the array's outside values with `AddressMalformed` and adds the
   reason (*"an ABSENT `listeners` argument is the ONE absence `A56`'s construction does NOT admit … and
   `seams-and-lifecycle.md §7.1`'s amended table prints this cell as its own"*), and sj`§7.1`'s amended
   `cfg.listeners` row does print exactly that answer — **but the as-filed construction table's `filePath` and
   `journalLength` rows are the only rows that enumerate ABSENCE, and `cfg.listeners`' ABSENT state is not itself
   a row of any table the way `journalLength`'s is.** **So: is `listen`'s absence a construction FAILURE (as
   `PAR-12` declares and the crate answers) or is `listeners` an optional member whose absence is the ordinary
   no-listener store?** This pass drove the declared answer: **the crate returns `AddressMalformed` for an
   absent `listeners`**, which is `PAR-12`'s cell — and **a blind consumer cannot tell from the construction
   table alone which member is the missing one, since the generated message names `listeners` while the clause
   that narrows the missing-argument arm names `journalLength` as *"the ONE argument whose absence is still an
   error"*** (sj`§7.1` step 2). **The clause pair that needs one sentence is `§7.1` step 2 against `PAR-12`'s
   outside list.**
2. **The amendment states NO ordering rule among the construction's failure arms.** sj`§7.1`'s sequence numbers
   `journalLength` first (step 2) and the path probe next (step 3), and `PAR-12`'s array check is step 5; **a
   configuration that is wrong in TWO ways at once (`filePath` ABSENT and `listeners` ABSENT — both legal-per-arm
   problems in one call) has no declared single answer.** Driven as an observation, the crate answers
   `AddressMalformed` naming `listeners`. **No assertion of this pass rests on the order.**
3. **The `DD-38` boot half is stated for the HOME but not for the `listeners[]` array's own re-supply.** The
   clause says a fresh `storeCreate` over an equal path *"loads no registration"*; **it does not say whether a
   consumer's second construction should re-supply the same array, and this pass's NG-25 does** (it passes the
   same array to the boot's `storeCreate`, which is the only way the surface can express *"the home as the
   contract declares it"*). **The observation is consistent either way** (the boot loaded no FILE registration;
   the post-boot home was exactly the array's).
4. **The register's empty-address reference exposes no caller-visible marker for *"which reference"* it is.**
   sm`§2.1` says the reference carries *"the register's own identity marker — the EMPTY segment marker"*, and
   `NodeRef.anchor.key` is the only member `§0.4` spells for it; **which `Segment` variant carries that marker is
   not printed**, so this pass asserted the TIER (which is) and left the marker as an observation only.
5. **The handle's `Display` spelling is not a contract item.** `§0.4`'s construction rule says *"`Display`/`Debug`
   may print it; no accessor is declared"*, so **the token's own text is not a drivable observable**; this pass
   compared handles by `PartialEq`/`Eq` only (and `Debug` for the evidence notes). **A drive that needed the
   token's spelling would be authoring behaviour the clause declines to fix.**
6. **The supersession's own observable is a compile-time one.** `A58`'s *"nothing of the old surface is
   reachable"* cannot be driven by a runtime assertion on a surface that no longer exists — **this pass recorded
   it as an OBSERVATION with its evidence (the crate's regenerated `cargo doc` item list) and did NOT count it as
   an assertion**, so it is not a PASS of this set either. **A reviewer who wants it failable would need a
   compile-fail harness, which `contract.md §0.2 · O-4` records as absent from this unit's strategy.**
7. **`P-1` was not crossed.** *"How a JS client supplies the array"* and *"how a JS client receives the handle
   list"* are the park's, and **no scenario here reaches a boundary** (`PAR-12`'s and `PAR-13`'s `park` cells, the
   proposal's `§18` consequence (2)); **the amendment's whole firing model is a store-side `Result` value, which
   is what `NG-22`/`NG-23`/`NG-25` drive.**

**AND ONE THING THIS PASS DOES NOT CLAIM: nothing here re-derives or re-measures the shipped unit's register
rows.** The figures above are assertions of THIS author's scenarios at THEIR run, not the register's counts; **no
unit row, ledger count, red-set file or strategy census is moved by anything this section prints**, and the
`P-TP-7`/`P-TP-8`/`P-IM-3`/`P-SM-4` rows the amendment re-derives are `role_test_writer`'s and the register's to
land, not this document's.

---

## §9. THE BOUNDED RE-DERIVATION PASS — the EIGHT SUPERSEDED CELLS OF `§8.1.1` RE-DERIVED AT THE AMENDED CONTRACT, and this set's run at that pass: **`508 PASS · 0 FAIL`** of `508` assertions

**WHY THIS PASS EXISTS, AND WHAT IT DOES NOT MOVE.** `§8.1`'s run left `8` cells FAILing, each of them a cell of
THIS document's whose expectation the `⟶ AMENDED 2026-10-11` clauses had put on the wrong side (`§8.1.1`'s own
table names each one and its superseding clause). **This pass RE-DERIVES THOSE EIGHT CELLS AT THE AMENDED RULE —
which is what the amendment's authority requires, and specifically what `A42`/`A50`/`A49`/`A52`/`A53`/`A54`/`A55`/
`A58`'s own words say the state now is — and drives them POSITIVELY.** **No expectation was weakened, re-worded
to a tautology, or dropped to reach a pass: each re-derived cell asserts MORE than the cell it replaces did, and
each names the clause and the value it now asserts.** **Every earlier byte, count, table and finding of this
document STANDS UNTOUCHED** — `§8`'s `133 PASS · 0 FAIL` for the amendment's own scenarios is unmoved and
re-measured identically below, and the `8` FAILs of `§8.1.1` stand as that pass's record, **superseded in THEIR
AUTHORITY (not in their existence) by this section.**

**Authority read at this pass, and nothing else.** `docs/specs/storeroom-native/contract.md` + its five parts
(`store-model.md`, `write-and-read.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`,
`implementation-plan.md`) read at their dated `⟶ AMENDED 2026-10-11` clauses — in particular `store-model.md
§1.6` item 4 (a)–(d) (the carrier node, the register's own conditional tier, its fixity) and `§1.5` item 4,
`§2.1`'s four amended corrections to the empty-address reference; `write-and-read.md §3.1.1`'s amended `listen`
row (`F-4`'s clause), `§3.2`'s amended parent rule, `§6.5`'s listener items 8–13, `§4.4`'s amended receipt;
`seams-and-lifecycle.md §7.1`'s amended ordered sequence and its three amended table rows, `§7.2`, and `§8.1`'s
`⟶ AMENDED` closure at `15` members with its operative `11 + 2 + 1 + 1 = 15` arithmetic — **and the architect's
rulings verbatim at `docs/specs/storeroom-listeners-proposal.md` `§8`–`§20` (`A40`–`A58`).**
**NO BYTE OF `src/**`, `Cargo.toml`, `Cargo.lock`, `tests/**`, `archive/gate3/**` OR `archive/gate4/**` WAS READ
AT THIS PASS, AND NO RED-SET OR ADVERSARIAL REPORT WAS READ.** The crate was reached **only as a consumer**, from
the scratch harness **outside the repository** (`/tmp/storeroom-blind/`, its own `Cargo.toml` with a path
dependency on the repository root, `CARGO_TARGET_DIR=/tmp/storeroom-blind/target`), and **no `cargo` command was
run inside the repository and no `target/` byte inside it was touched by this pass.** **The only byte this pass
wrote inside the repository IS THIS SECTION AND ITS TABLE** — the harness lives at `/tmp/storeroom-blind/`
(`src/g02.rs`, `src/g03.rs`, `src/g05.rs`, `src/g06.rs`).

### §9.1 THE EIGHT CELLS, RE-DERIVED — the clause each now drives, and the as-filed expectation each contradicts

| the cell (and its scenario) | what it NOW asserts (and the `§` it drives) | the as-filed expectation the superseding clause contradicts |
| --- | --- | --- |
| **`NG-04`** (1 cell, re-derived into 6) | **the empty-address reference's tier, asserted EXACTLY per caller spelling**: `findAddress([], t).anchor.tier == File` in a store created with a reachable path, for `t` ∈ {`file`, `mem`, `temp`, absent}; the four answers are one tier and one reference (same `anchor.key`); and the `t` argument **selects nothing** — sm`§1.6` item 4 (a)/(d)(i), sm`§2.1`'s `⟶ AMENDED` corrections (2)/(4); `A42`/`A49`/`A50`/`A41` | *"`findAddress([], file).anchor.tier is NOT the caller's tier (the register has no parent anchor)"*, i.e. `!= File`, on sm`§1.6` item 3's ground *"the register HAS NO PARENT ANCHOR … carries no tier of its own"* — a ground the amendment SUPERSEDES; the crate answered the amended rule (`File`) |
| **`NG-09`** (1 cell, re-derived into 5) | **the same rule in the OTHER conditional arm, in a store created WITHOUT a path**: `findAddress([], t).anchor.tier == Mem` for every caller spelling; the tier is FIXED AT CREATION and no `t` is asserted into it; `findAddress([], mem).anchor.tier == Mem` holds as sm`§2.1` (4) prints it; the empty address still resolves — sm`§2.1` (2)/(4), sm`§1.6` item 4 (d); `A42`/`A49`/`A50` | *"neither answer asserts the caller's tier"* as the guard `t_file != Tier::File && t_file != Tier::Temp` — the third-amendment block's *"NEVER the caller's `t`"* read as *"never `File`, never `Temp`"*, which the amended block keeps as *"the `t` argument selects nothing"* while ADDING that the one reference's tier IS the register's own (here `Mem`) |
| **`NG-14`** (1 cell, re-derived into 2) | **the directory-path state at CONSTRUCTION**: `storeCreate` with a path that IS a directory answers **`FilePathUnreachable`** and returns NO instance, on every call, so that state never reaches a write; the same store state reached LATER by a `file`-tier write remains **`FileCommitFailed`** (driven through a path whose parent is unwritable) — sj`§7.1` step 3 with `DD-40`(b), `§8.1` #13, w`§7.2` item 2; `A52`/`A53`/`A54`/`A55` | *"(as-filed) a directory path returns an instance and the commit fails at first write"* — the state was expected at the COMMIT path (w`§7.2` item 2 + `§8.1` #15), and `DD-40`(b) moves it to construction; the crate answered `FilePathUnreachable` at construction |
| **`NG-16`** (3 cells, re-derived into 5) | **what the listener surface actually reaches, at its own arity** (`listen(address)`, no tier slot): a registration is fired by a write at the SAME address at **every** tier (`mem`, `temp`, `file`) — *no tier test runs at any trigger*; `watched` is the ADDRESS PROJECTION of `triggered`; and an `unlisten` of ANOTHER handle removes exactly ONE home entry, leaving the `['t']` registration firing while the withdrawn one fires nothing — w`§6.5` items 10 (d)/(e)/(f), 11, 12 (c) and item 6's substance; `DD-35`/`DD-36`/`DD-37`; `A43`/`A57`/`A58` | *(a)* *"a file-qualified registration is NOT returned after a write at mem"* and *(b)* *"(as-filed) the tier-qualified pre-state"* — w`§6.5` item 7 (a) + `DD-26`'s tier qualifier; `A58` supersedes `watch` in one pass and `DD-36` makes the address the WHOLE key, so **the tier-qualified pre-state has no instance and cannot be spelled at all** (`F-3`'s re-derivation); *(c)* *"the tier-qualified registrations at 't' are untouched by an unrelated unlisten"* — same unreachable qualifier; its SUBSTANCE is now driven at the listener's own arity |
| **`NG-17`** (1 cell, re-derived into 1) | **the `filePath`-ABSENT state as LEGAL**: an instance IS returned and NO `ConstructionArgumentMissing` is produced (the register is created at `mem`) — sj`§7.1`'s amended `filePath` row and step 3, `A49`/`A50`; the member's ONE remaining trigger (an absent `journalLength`) is driven beside it | *"`ConstructionArgumentMissing` ((as-filed) `cfg.filePath` absent)"* — `§8.1` #12's as-filed trigger (*"… `cfg.filePath` absent, or with `cfg.journalLength` absent"*); sj`§7.1`'s amendment NARROWS `DD-17` to `journalLength` alone and an absent `filePath` becomes the `mem`-register arm |
| **`NG-17`** (1 cell, re-derived into 3) | **the set's closure at `15`, driven EXACTLY**: the members this scenario's own drives produced (each by its own trigger) are compared **member for member** with the declared set — `AddressMalformed` · `AddressNotFound` · `LeafHasNoDownstream` · `TierNotFound` · `OutOfDomainTier` · `ParentAnchorMonotonicityViolation` · `ContainerKindConflict` · `ReadTargetIsBranch` · `WriteParentNotLink` · `JournalOpUnknown` · `RollbackCompacted` · `ConstructionArgumentMissing` · **`FilePathUnreachable`** · `ValueNotAdmitted` · `FileCommitFailed` — plus the four non-walk members by name and the size as a count — sj`§8.1`'s `⟶ AMENDED` closure (`15`, rank `13`, CONSTRUCTION GROUP) and its operative `11 + 2 + 1 + 1 = 15` ✓; `A53`/`A54` | *"(as-filed) the set's `14` members are each produced by at least one drive above"* — `§8.1`'s as-filed heading (*"the closed code set — `14` members"*) and its `14 = 14` arithmetic; the amendment adds `FilePathUnreachable` at rank `13` and moves `ValueNotAdmitted`/`FileCommitFailed` by one rank each, `11 + 2 + 1 + 1 = 15` ✓ |

**AND NOTHING ELSE OF THE SET MOVED.** The `25` scenarios are the same `25`; no scenario was added, retired or
re-scoped, and the amendment's own `NG-19`…`NG-25` were driven **UNCHANGED** (`§8`'s cells, byte-for-byte).
The `17` assertions this pass adds are all inside the six re-derived cells above (and one of the as-filed cells'
drives removed from `NG-17`'s case list, its state now driven positively in `NG-15` where it belongs).

### §9.2 THE RUN — `508 PASS · 0 FAIL` of `508`, and the amendment's own section unchanged at `133 · 0`

**Harness and invocation.** `/tmp/storeroom-blind/` — its own `Cargo.toml` with a **path dependency on the
repository root**, `CARGO_TARGET_DIR=/tmp/storeroom-blind/target` (**outside the repository**), built and run
**read-only** against the repository with `cargo run --offline`, from outside it. **FOUR consecutive runs, the
identical figure and the identical per-scenario count string**
(`/tmp/storeroom-blind/run66-pass7.txt`, `run67-pass7.txt`, `run68-pass7-repeat1.txt`, `-repeat2`, `-repeat3`),
**so no cell of this pass is flaky.**

```
amendment (NG-19..NG-25) assertions PASS: 133   FAIL: 0
pre-amendment set (NG-01..NG-18)   PASS: 375   FAIL: 0
TOTAL                              PASS: 508   FAIL: 0
```

**The amendment's per-scenario figures (UNMOVED by this pass): NG-19 15·0 · NG-20 14·0 · NG-21 26·0 ·
NG-22 28·0 · NG-23 13·0 · NG-24 7·0 · NG-25 30·0 = `133`.**

**THE PRE-AMENDMENT SET'S PER-SCENARIO FIGURES, as this run returned them (the three moved scenarios' new counts
in bold): NG-01 16·0 · NG-02 11·0 · NG-03 9·0 · NG-04 20·0 · NG-05 29·0 · NG-06 23·0 · NG-07 18·0 · NG-08 12·0 ·
NG-08b 9·0 · NG-09 5·0 · NG-10 25·0 · NG-11 39·0 · NG-12 13·0 · NG-13 7·0 · NG-14 11·0 · NG-15 21·0 ·
NG-16 17·0 · NG-17 63·0 · NG-18 27·0** (`16+11+9+20+29+23+18+12+9+5+25+39+13+7+11+21+17+63+27 = 375` ✓).
**The as-filed `491 PASS · 8 FAIL` of `§8.1` is therefore closed: `8` superseded cells re-derived, `0` FAIL, and
the set's own assertion count GROWN by `17` rather than shrunk.**

### §9.3 THE EIGHT CELLS' DECIDING VALUES, AS THIS RUN RETURNED THEM

| the observable (the cell) | the clause's value | the run's value |
| --- | --- | --- |
| `findAddress([], file).anchor.tier` — a store created WITH a reachable path (`NG-04`) | `File` — the register's OWN conditional tier | `File` — and `File` for `mem`, `temp` and absent caller spellings too; one `anchor.key` for all four — **PASS** |
| `findAddress([], t).anchor.tier` — a store created WITHOUT a path (`NG-09`) | `Mem` — the register's own conditional tier, fixed at creation | `Mem` for `file`, `temp` and absent caller spellings — **PASS** |
| `storeCreate` with a path that IS a directory (`NG-14`) | `FilePathUnreachable`, no instance, nothing created (`A55`'s dry run) | `Err(FilePathUnreachable)` on both calls; message *"'…' is not reachable at construction, the path must exist or the application must be able to write it"* — **PASS** |
| the same state via a `file`-tier write, parent unwritable (`NG-14`, `NG-17`) | `FileCommitFailed` | `FileCommitFailed`, with `A16`'s automatic rollback leaving `AddressNotFound` at the address — **PASS** |
| a `listen(['t'])` registration and writes at `['t']` at `mem`, `temp`, `file` (`NG-16`) | the same handle fires each time; no tier test at any trigger | `triggered = [ListenerHandle { token: "listener-5" }]` three times — **PASS** |
| `unlisten` of the `['u']` handle, then writes at `['t']` and `['u']` (`NG-16`) | the `['t']` registration still fires; the withdrawn one fires nothing | `["listener-5"]` and `[]` — **PASS** |
| `storeCreate` with `cfg.filePath` ABSENT (`NG-17`) | LEGAL — an instance, register at `mem`, NO code | instance returned, register `Mem`, no `ConstructionArgumentMissing` — **PASS** |
| the set of members this scenario's drives produced (`NG-17`) | exactly the declared `15`, `FilePathUnreachable` among them | the `15` exactly, order-insensitively — **PASS** |

### §9.4 WHETHER THE SET IS NOW FULLY PASS, AND EVERY REMAINING FAIL

**THE GREENS SET IS NOW FULLY PASS AT THIS PASS'S RUN: `508` of `508` assertions, `0` FAIL — `375` from the
pre-amendment scenarios `NG-01`…`NG-18` and `133` from the amendment's own `NG-19`…`NG-25`.** **There is NO
remaining FAIL, so there is NO cell with a disputed side to report: no clause of the amended contract stands
against a value this set expected, and no expectation of this set stands against the crate.** **`§8.1.1`'s
eight cells are closed with the crate's own answer as the amended rule's — and each of the eight now asserts the
AMENDED rule's value EXACTLY (the tier in both conditional arms, the construction failure with no instance, the
tier-blind trigger, the single-entry withdrawal, the legal absent path, and the `15`-member closed set), rather
than the guard it replaced.**

### §9.5 WHAT THIS PASS COULD NOT DERIVE FROM THE DOCS (named rather than papered)

1. **The register reference's own key marker is still not printable as a `Segment` VARIANT.** sm`§1.6` item 4 (c)
   and sm`§2.1` (1) state that the reference *"carries the register's own identity marker — the EMPTY segment
   marker"*, and the run's observation is `anchor.key = Key("")` in both conditional arms; **which variant carries
   the marker is not printed**, so this pass asserted the TIER (which the clause does print) and the ONE-REFERENCE
   identity (same `key` across all four caller spellings) and left the marker as an observation only — the same
   gap `§8.2` item 4 records.
2. **`NG-16`'s three re-derived cells are not the tier-qualifier state they superseded, and this document says so
   in each cell's own text.** **The as-filed cells' PRE-STATE has no instance after `A58`/`DD-36`** — a
   tier-qualified registration cannot be spelled at all — so the cells drive the listener surface's own reach
   instead: the trigger's set at every tier and the withdrawal's single-entry reach. **The alternative the brief
   allows (declaring the three cells OUT with the reason, as `§5.8`'s re-derived row does) was NOT taken, because
   the SUBSTANCE of each — *"a registration fires where it binds, whatever tier the write carries"* and *"a
   withdrawal removes exactly one registration"* — IS stated by the amended clauses and IS drivable; had it been
   taken, this set's assertion count would be `505` rather than `508`.** **No cell of these three asserts
   anything about a tier qualifier, which no longer exists on any surface.**
3. **The supersession's own observable is still a compile-time one.** `A58`'s *"nothing of the old surface is
   reachable"* cannot be a runtime assertion on a surface that no longer exists; `NG-24` records it as an
   OBSERVATION with its evidence (the crate's regenerated `cargo doc` item list carries `Listener`,
   `ListenerEntry`, `ListenerHandle`, `ListenersArg`, `Store::listen` and `Store::unlisten`, and NO `WatchHandle`
   and NO `Watch`) and does NOT count it as an assertion — the same gap `§8.2` item 6 records.
4. **The `15`-member closure is asserted against the members the DRIVES produced, not against a machine-readable
   set declaration.** sj`§8.1` prints its members as a table and its ranks in prose (with `FilePathUnreachable`
   at rank `13` and the two moved ranks named), so this pass transcribes the member names into the harness's own
   expected list and compares it with the observed set; **a rank-ordered census cannot be driven from the table's
   print order** (the table is ordered by rank, and the harness's set comparison is deliberately order-free, since
   `DD-37` declares the triggered list — not this set — order-insignificant). **The rank of each member is
   therefore carried as the clause's figure and not as an assertion.**
5. **`P-1` was not driven and `P-3`'s park record was not read as a closure.** No scenario of this pass crosses a
   boundary: every re-derived cell's observable is a store-side `Result`/`NodeRef`/handle value
   (`PAR-12`/`PAR-13`'s `park` cells, the proposal's `§18` consequence (2), w`§6.5`'s parks block).

**AND THE ONE THING THIS PASS DOES NOT CLAIM.** **Nothing here re-derives, re-measures or moves the shipped
unit's register rows, ledger counts, red-set figures or the `196`-test figure w`§6.5` records as a pre-amendment
figure** — **the `375`/`133`/`508` above are assertions of THIS author's scenarios at THEIR run, and the
`P-TP-6`/`P-TP-7`/`P-TP-8`/`P-IM-3`/`P-SM-4` rows the amendment re-derives remain `role_test_writer`'s and the
register's to land.** **A set authored by the same agent who implemented the crate would be a review finding;
this set is the BLIND author's, it was authored from the documentation alone, and no byte of `src/**` was read at
any pass of it.**

---

## §10. THE GATE-5 BLIND PASS FOR `U-STOREROOM-ACCESS-PROBE` — `NG-21`'S RE-DERIVATION, AUTHORED AND RUN FROM THE DOCUMENTS ALONE, AND THE RUN'S **`107 PASS · 4 FAIL`**

**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.** The authorities read at this
pass were: `docs/specs/storeroom-native/contract.md` (**`§0.4`**'s declared Rust surface, **`§10.4`**'s
seven-part rule and its blast-radius clause, `§8.1` #1/#2/#4/#6/#8/#12/#13, its `§5.7` `P-TP-7` re-derived
row, `§3.2` item 4's amended clause, `§3.4`'s arm table (`W-1`, `W-6`), `§4.4`'s closed delete-arm table),
`seams-and-lifecycle.md` (`§7.1`'s ordered construction sequence, step `3`-bis, step `4b`, `§7.2` items 1,
5 and 6), `store-model.md`'s tier cells, `implementation-plan.md`, `docs/specs/storeroom-access-probe-review.md`,
the last several dated clauses of `docs/decisions.md` (`2026-10-13`), `docs/defects.md` (`DEF-20`),
`docs/pending.md`, and this document's own earlier sections. **NO BYTE OF `src/**` WAS READ, AND NO
IMPLEMENTATION FILE WAS CONSULTED TO DECIDE A SINGLE ASSERTION**; the crate was reached **only as a
consumer**, through the surface `§0.4` declares. **`tests/**` was read ONLY to establish which states are
already driven** (per this pass's brief), never to derive an expectation.

**The harness — WHERE IT RUNS, AND WHY IT HAD TO BE BUILT.** **`§(1)`-level role of this document names a
harness at `/tmp/storeroom-blind/`; THAT PATH DOES NOT EXIST on this machine and is not in this repository,
so this pass could not reuse it.** **`/tmp` is also unusable here for anything durable**: the host's cleaner
removed the first harness this pass created there between two invocations, so a harness in `/tmp` cannot even
be re-run. **This pass therefore created its own harness INSIDE the repository's gitignored build tree:**
`target/blind-ap-harness/` — its own `Cargo.toml` with a path dependency on the repository root, its own
`src/main.rs` (the eleven scenarios), its own `CARGO_TARGET_DIR`, and its captured run at
`target/blind-ap-harness/RUN.txt`. **`/target` is the repository's own `.gitignore` entry (`:152`), so nothing
this pass created is tracked, nothing under `src/**` or `tests/**` was touched, and no specification was
edited: the only tracked byte this pass wrote is THIS SECTION.** **The harness builds and runs OFFLINE
(`cargo run --offline`, no registry, no dependency) and prints `scenario <id> : PASS n FAIL n` per scenario
plus a total — the whole run is reproducible with one command from `target/blind-ap-harness/`.**

**The run, whole: `uid = 1000`, `TOTAL PASS 107 FAIL 4`, every FAIL inside ONE scenario (`G5-AP-07`).**

| id | The clause(s) it drives | What it asserts, and its measured result |
| --- | --- | --- |
| **G5-AP-01** | `§10.4` parts 3, 4, 5 · `§7.1` steps `3`-bis/`4b` · `§7.2` item 6's `2026-10-13` clause · `DD-28`'s amended cell · `§2.1`'s amended block · `§4.1.1` item 3 · `§8.1` #2/#8 · `§6.1` item 1 | **The `NG-21` re-derivation, at the state it is owed against.** Provided + absent + writable parent ⇒ SUCCEEDS, the store's own file EXISTS and is ZERO-LENGTH with an EMPTY byte string (read, not inferred), the parent's entry count moved by EXACTLY ONE, the register lands at `file` **before any write**, `read([])` is `Object({})`, an absent key answers `AddressNotFound`, `readLiteral([])` answers `ReadTargetIsBranch`, `findAddress([], t)` carries `file` at all four caller spellings, and the FIRST write's `seq` is `1` (so the construction committed no journal entry). **`PASS 14 · FAIL 0`.** |
| **G5-AP-02** | `§10.4` parts 1, 2, 6 · `§7.1` step `4b` (B) · `§7.2` item 6 · `DD-14`'s corrected terms | **REPEATED constructions over the path the first one created.** Four constructions in a row each SUCCEED (arm (a): the path EXISTS), the file stays PRESENT and ZERO-LENGTH after each, the parent's entry count moved by EXACTLY ONE **in total across all four**, each instance's register lands at `file` and reads `Object({})`, and the instances are INDEPENDENT — a `file` write through the second is invisible to the first, whose boot-load happened at ITS construction. **`PASS 22 · FAIL 0`.** |
| **G5-AP-03** | `§10.4` part 6 (*"BYTE-IDENTICAL … `boot_load` reads them unaltered"*) · `§7.1` step `4b` (B)/(E) · `DD-28`'s amended cell · `§7.2` items 1, 5, 6 | **Arm (a) — "unmoved" — DERIVED AND DRIVEN.** Over a file carrying a committed write: the bytes are BYTE-IDENTICAL, the length is the committed write's (non-zero, not the store's own `0`), the entry count is unmoved, the register lands at `file`, and the boot-load reads the committed key. Then the second half of "unmoved": a `D-1` delete commits NOTHING, a re-construction over the equal path re-boots from the LAST COMMITTED file write's bytes (the deleted key STANDS AGAIN), and after two constructions and a delete the bytes are still the last file write's. **`PASS 12 · FAIL 0`.** |
| **G5-AP-04** | `§10.4` part 4 (*"LAST act of the construction's ARGUMENT VALIDATION"*) and part 5 (*"LEAVES NOTHING BEHIND"*) · `§7.1` step `3`-bis · `§8.1` #1 | **The ordering `listeners[]`-before-create, made VISIBLE.** A malformed entry at a FRESH path in a WRITABLE parent — **where the create would have succeeded had it run** — answers `AddressMalformed`, and the file is ABSENT afterwards with the entry count unchanged. The same array over a file ALREADY carrying committed bytes also answers `AddressMalformed` and leaves those bytes BYTE-IDENTICAL. **`PASS 6 · FAIL 0`.** |
| **G5-AP-05** | `§7.1`'s ordered sequence, steps `2`, `3`, `3`-bis, `4b` (*"the order is BINDING"*) · `§10.4` part 4 · `§8.1` #12 | **The construction's own failure ORDER.** `journalLength` absent at a reachable path, at an unreachable path (the path IS a directory) and beside a malformed `listeners[]` each answers `ConstructionArgumentMissing`, creating nothing — step 2 precedes both the probe and step `3`-bis. **`PASS 5 · FAIL 0`**, and one OBSERVATION recorded rather than asserted (`§10.3` item 1). |
| **G5-AP-06** | `§8.1` #13's amended trigger clause (a)/(d) · `§10.4` part 5 · `DD-45`'s amended clause · `§7.1` step `4b` (C) · `§8.2` | **The amended trigger list's newly-decidable forms.** (i) A parent on a **READ-ONLY MOUNT** — `/snap/<rev>/`, measured `EROFS` at the probe — answers `FilePathUnreachable`, returns NO instance, leaves the path ABSENT and the parent's entry count unchanged, with a non-empty message and no unsubstituted placeholder. (ii) A parent at **`0o200`**, where `metadata().readonly()` is `false` while the kernel denies the create: refused with the same member and nothing left behind — **the divergence `DEF-20` is filed for, printed at the run.** (iii) An EXISTING read-only file: refused, its bytes untouched. **`PASS 11 · FAIL 0`**; the ACL face is `UNRUN` (`§10.3` item 2). |
| **G5-AP-07** | `§10.4` parts 1, 3, 5 and its blast-radius clause · `§7.1` step `4` and step `4b` · `A55` · `§7.2` item 1 | **THE STATE NO DOCUMENT NAMES: the path EXISTS but as a DANGLING SYMLINK.** See `§10.1` — **`PASS 3 · FAIL 4`, and this is the pass's live finding.** |
| **G5-AP-08** | `§10.4`'s blast-radius clause and part 6 · `DD-28`'s amended cell · `§7.2` item 5 · `§3.4` arm `W-6` · `§4.4` arms `D-1`, `D-4` | **The blast-radius clause's own claims at the instance the construction returned.** The create writes NO BYTE; `mem`- and `temp`-tier writes perform NO file I/O; the `file` write is the only one that touches the path; `W-6`'s purge leaves `[File]` alone at a key written `mem`,`temp`,`file`; a `D-1` delete removes exactly the named version with `tiers: [File]`; the removed address then resolves to nothing (`D-4`'s code); and **the delete and the rollback each leave the bytes as the last file write left them**. **`PASS 12 · FAIL 0`.** |
| **G5-AP-09** | `§3.4` arm `W-6` (*"every version … for which `rank(v) ≤ rank(write tier)` is removed"*) · `§5.1` `M-1` · `§3.4` arm `W-1` (`DD-8`, `DD-11`) · `§5.4`'s purge chain · `§3.2` item 4's amended clause · `§8.1` #6 | **A DERIVED PRECONDITION, and a correction of this document's own first reading.** The six pairwise write orders are driven and compared with `W-6`'s own arithmetic — `mem,file`⇒`[File]`; `temp,file`⇒`[File]`; `mem,temp`⇒`[Mem,Temp]`; `temp,mem`⇒`[Mem]`; `file,mem`⇒`[File,Mem]`; `file,temp`⇒`[File,Temp]` — and the THREE-VERSION state `§3.2` item 4 calls possible is shown to be reached by writing `file`,`mem`,`temp`. The `mem`-register half is driven too: `file` at a register key FAILS `ParentAnchorMonotonicityViolation`. **`PASS 11 · FAIL 0`.** |
| **G5-AP-10** | `§4.4`'s arms `D-1`, `D-3`, `D-2` · `DD-9` · `§8.1` #2, #4 · `§5.1` | **The delete arms on a key whose version count is KNOWN — the state `G5-AP-09` establishes, printed at `[File, Mem, Temp]`.** `D-1` at the `file` tier removes that version ONLY and leaves `mem` and `temp` **still readable** (the clause's *"untouched"* half, asserted POSITIVELY); a second `D-1` at the same tier is `D-3` — the target resolves through its survivors and the delete is a SUCCESS with `tiers: []`; a `D-2` delete removes the survivors in `§5.1`'s canonical order; and over a three-version key the `D-2` receipt carries `[File, Mem, Temp]`. **`PASS 8 · FAIL 0`.** |
| **G5-AP-11** | `write-and-read.md §4.2`'s read arms · `§2.3`'s tier-qualified arm · `§8.1` #4 · `§5.3`'s shadow rule | **A read is not a write — the probes repeated THREE times.** With `mem`,`temp`,`file` written at one key, `read(['z'], File)` answers and `read(['z'], Mem)`/`read(['z'], Temp)` answer `TierNotFound`, **identically at all three passes**, which is the form that fails if a read minted a version or re-tiered a key. **`PASS 3 · FAIL 0`.** |

### §10.1 THE FINDING — **`G5-AP-07`: A CONSTRUCTION THAT ACCEPTS A DANGLING-SYMLINK PATH RETURNS AN INSTANCE WITHOUT CREATING THE STORE'S OWN FILE, AND THE FIRST `file`-TIER WRITE THEN REPLACES THE SYMLINK**

**The state, and why the documents do not decide it.** `contract.md §7.1`'s amended `filePath` row prints
the path's states as ABSENT (the absent-file arm), an EXISTING file (arm (a)), `null`/`undefined`/`""`/a
non-string, and *"a string that FAILS the reachability test"*; `§10.4` part 1 names the predicate's TWO arms
— **(a)** *"the path EXISTS and a WRITE-MODE OPEN of it succeeds"* and **(b)** *"the path is ABSENT and the
process can perform an EXCLUSIVE CREATE at it"*. **A path whose NAME IS TAKEN BY A SYMLINK TO A
NON-EXISTENT TARGET is no arm of that predicate: a write-mode open of it does not succeed (the target is not
there), and the path is not ABSENT (an exclusive create there answers `EEXIST`).** **THE DOCUMENTS DO NOT
PRINT THIS STATE'S ANSWER — THAT IS `§10.3` ITEM 3 — but `§10.4` part 3 does print what a construction that
SUCCEEDS must have done**, and **the measured behaviour contradicts it**:

1. **THE CONSTRUCTION RETURNS `Ok` AND CREATES NOTHING.** `storeCreate` over the dangling-symlink path
   answered `Ok` with `findAddress([], absent).anchor.tier = File`, **while the path is still the SYMLINK it
   was** — `symlink_metadata(link).file_type().is_symlink() == true`, `metadata(link)` = `ENOENT`, the
   symlink's target still absent, and the parent directory's entry count unchanged at `1` (the symlink).
   **So `§10.4` part 3's *"the construction CREATES the store's own file at the provided path — EXCLUSIVELY
   — AND LEAVES IT ZERO-LENGTH: AN EMPTY FILE AND NO BYTE"* has NOT happened**, and the blast-radius
   clause's own declared observables — *"the path EXISTS and its length is `0`"*, *"the parent directory's
   entry count moved by EXACTLY ONE"* — are both **falsified at a construction that reported SUCCESS** (the
   count did not move at all, and the path's length is not `0` because there is no file). **Its register tier
   is nonetheless fixed at `file`, which is the tier `§10.4` part 3 fixes only for a create that succeeded.**
2. **`§10.4` PART 2's FALL-THROUGH IS NOT WHAT HAPPENED.** The clause says the arm must fall through **to
   arm (a)'s write-mode open** *"so a construction over an EXISTING file NEVER TRUNCATES"*. **A write-mode
   open of this path cannot succeed** — the target does not exist — so a fall-through that actually PERFORMED
   arm (a)'s open would have FAILED, and `§10.4` part 5 would then require `FilePathUnreachable` with NO
   instance. **The measured `Ok` therefore reports arm (a)'s outcome without arm (a)'s act**, and it leaves
   the construction having accepted a path that `A55`'s *"File must have write access"* does not hold for.
3. **THE CONSEQUENCE IS CONSUMER-VISIBLE AND SILENT.** On the instance the construction returned, the first
   `file`-tier write **answered `Ok`** — and the observation shows the name that was a SYMLINK before the
   write is **not a symlink after it**, with the path now a regular file of `7` bytes. **So a write the
   construction had approved silently DESTROYED the name that stood at the configured path and replaced it
   with the store's own file.** `DEF-20`'s own defect class — *"a path answered REACHABLE whose first
   `file`-tier write then throws"* — is not what fired here; **what fired is its mirror: a path answered
   REACHABLE whose first `file`-tier write SUCCEEDS by replacing something the store never read.**
4. **WHAT THE PASS DOES NOT CLAIM.** **This is not a claim about the amendment's named forms** — its four
   named forms (`EROFS`, `EACCES`, `ENOENT`, the directory path) were each driven and each REFUSED as the
   amendment declares (`G5-AP-06`). **It is a claim at a state the amendment's own two arms cannot classify,
   where the contract's part 3 still states an observable the implementation does not produce.**

### §10.2 THE GAPS — **THIS PASS'S FINDINGS OF THE SECOND KIND: THE PLACES THE DOCUMENTS DID NOT TELL ME WHAT TO EXPECT** (counted as neither PASS nor FAIL)

1. **The ORDER OF THE PROBE (step `3`) AGAINST THE `listeners[]` CHECK (step `3`-bis) IS NOT PRINTED AS AN
   ANSWER.** `§7.1`'s ordered sequence numbers the steps and `§10.4` part 4 enumerates what the create comes
   *after*, but **no clause states which member is returned when BOTH the probe and the `listeners[]` check
   would refuse.** Driven at a parent on a read-only mount with a malformed entry, the measured answer was
   `AddressMalformed` — **recorded as an OBSERVATION and asserted nowhere**, because from the documents alone
   it could be either (`FilePathUnreachable` under step 3 first, `AddressMalformed` under step 3-bis first),
   **and the pair is unreachable in a single-clause reading: whichever ordering is intended, the other member
   is the one the sequence's own ordering makes unreachable at that input. The documents state the order and
   never the answer.**
2. **`§8.1` #13's amended clause (a) NAMES AN *"ACCESS ACL"* FORM THIS PLATFORM CANNOT CONSTRUCT FOR AN
   UNPRIVILEGED OWNER.** The clause names *"the process is denied the create by an access ACL or by an
   ownership mismatch"*; **this pass could drive the `EACCES` face (a parent the caller owns whose mode
   denies the create) but NOT the ACL face**, because a named-user ACL cannot be made to disagree with the
   owner's own write bit. **`UNRUN`, with that reason, rather than a pass.**
3. **THE DANGLING-SYMLINK STATE IS UNCLASSIFIED BY THE PREDICATE'S OWN TWO ARMS.** *"The path exists"* and
   *"the path is absent"* are stated as if they partition the provided-path states; **they do not** — a
   symlink to a non-existent target is neither (`exists()` answers false, `metadata()` answers `ENOENT`, and
   an exclusive create answers `EEXIST`). **The clause needs either a third named state or a reading of
   *"absent"* that names the symlink case; until then no greens cell can be derived for it, which is why
   `G5-AP-07` asserts the contract's part 3 and not this state's *"declared answer"*.**
4. **`§10.4` part 3's SUBJECT IS THE CREATE AND NOT THE CONSTRUCTION.** It reads *"A successful exclusive
   create produces an empty file … and the construction RETURNS AN INSTANCE"*; **it does not state that the
   construction's SUCCESS is equivalent to the create's success.** **This pass read it as the only available
   reading — a provided-path construction that returns an instance must have satisfied part 3's observables —
   and `G5-AP-07`'s four `FAIL`s rest on that reading.** **If the intended reading is the weaker one (a
   construction may return an instance without part 3's state), then the clause does not say so and `§10.4`
   part 6's fall-through owes the statement that it may approve a path arm (a) would refuse.**
5. **`P-TP-7`'s `S-CONSTRUCT` CENSUS IS NOT RE-DERIVED IN THE COPY OF THE CONTRACT THIS PASS READ.** The
   amendment's own gate-1 record and `docs/decisions.md` both file the census (*`27`*, with two whole
   failure classes appended) as an open gate-2 finding; **this pass did NOT read the census as an authority
   and does not claim any figure for it** — no scenario here asserts anything the census would carry.
6. **THIS DOCUMENT'S OWN HARNESS CITATION IS TO A PATH THAT DOES NOT EXIST ON THIS MACHINE.**
   `docs/specs/storeroom-native-greens.md:37` (and `:99`, `:530`, `:600`, `:691`, `:864`, `:888`) names
   `/tmp/storeroom-blind/`, with `CARGO_TARGET_DIR=/tmp/storeroom-blind/target` **outside the repository**;
   `:654` names a scratch `/tmp/storeroom-doc/` for the `cargo doc` regeneration `§9` cites. **NEITHER PATH
   EXISTS IN THIS REPOSITORY OR ON THIS MACHINE**, and `/tmp` here does not survive between two invocations —
   **so no earlier pass of this document can be re-run as written, and none of its figures is re-checkable by
   a later pass of the same set.** Recorded because **a greens set that cannot be re-run is not a pass**, and
   `§10`'s header states this pass's own harness location (inside the repository's gitignored `target/`) for
   exactly that reason. **This is a property of the RECORD and not of the crate: the earlier passes'
   *"three consecutive runs produced identical counts"* claim (`:101`) is neither confirmed nor denied here —
   this pass ran its own harness and makes no claim about theirs.**

### §10.3 WHAT THIS PASS DID NOT RE-DRIVE, AND THE ONE THING IT DOES NOT CLAIM

**The states the existing red set already drives were not re-driven**: the created-empty file at all four
declared observables, the `0o200`-parent refusal, the `/usr/bin` ownership refusal, the exercised `EROFS`
mount, the absent-parent and path-is-a-directory refusals, arm (a)'s byte-identity, the malformed-`listeners[]`
ordering and the malformed-`journalLength` ordering. **`G5-AP-01` and `G5-AP-06` reach two of those states as
SIDE conditions of their own scenarios (the four observables inside a re-derivation; the mount and the mode
inside the trigger list's reach) — never as a duplicate of another cell's drive, and never asserted where
another cell already asserts it.** **NOTHING HERE RE-DERIVES, RE-MEASURES OR MOVES ANY EARLIER SECTION'S
FIGURES** (`§2`'s `355`/`357`, `§8`'s `133`, `§9`'s `508`): **`107`/`4` are THIS pass's assertions at THIS
run.** **This set is the BLIND author's: no byte of `src/**` was read at any point of it, every expectation
above was written from a `§`-numbered clause named in its own row, the four `FAIL`s of `G5-AP-07` were
derived from `§10.4` part 3 before the state was driven, and the harness that produced them is named in this
section's header.**
