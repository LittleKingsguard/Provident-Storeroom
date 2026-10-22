# Part — `seams-and-lifecycle` (`U-STOREROOM-NATIVE`, prefix `D-GP-SNST`): the construction inputs, the store's persistence and boot, the node-side evaluation seam, the closed fail-code set with its generated messages, and the parks' boundaries

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-native/`** — authored at
  the gate-2 spec gate in the **same pass** as the contract document's index region and part map, whose
  `seams-and-lifecycle` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-native/seams-and-lifecycle.md`.
- **The derivation clause this part reads through — one clause, carried by
  the contract document and NOT re-spelled here:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  (`docs/specs/storeroom-native/contract.md`, its status block; the middle dot `·` separates the slots). **Its
  authority is the FILED gate-1 record itself (that record's `decomposition` row and its `§4.1`); no unfiled
  process-rule path is cited, per `contract.md §0.1` item 7.**
- **WHAT A `carrier` PART IS, AND WHAT THIS ONE HOLDS.** **A `carrier` part holds RELOCATED SECTIONS of the
  contract's own text**, and **those sections keep the authority citations they carried in the contract
  document** — *a relocation is not a re-derivation: no claim gains or loses an authority by moving*
  (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a), which states the relocation rule in this
  directory's own bytes). **This part's relocated spans are
  `contract.md §7` (its §7.1–§7.3), `contract.md §8` (its §8.1–§8.3) and `contract.md §10`
  (its §10.1–§10.3), WHOLE, each keeping its `§`-numbers, its tables and its authority citations unchanged**,
  **together with the contract's two unnumbered top-level blocks that belong to no numbered section and whose
  map row this part's own row declares: the boot/lifetime block and the parks' boundary block.** **This part
  declares NO new claim, NO new parameter, NO new fail-state, NO new code, NO new `§`-number, no `DD` row, no
  `PAR` row and no `P-*` register row.** `[T: this part's own scope boundary | CONTRACT]`

## Scope boundary — the regions this part carries

**The relocated spans, named by their contract `§`-numbers:**

| Relocated section | Its home in the contract document | What it carries |
| --- | --- | --- |
| **`§7`** (with `§7.1`–`§7.3`) | `docs/specs/storeroom-native/contract.md §7` | **the construction inputs** — `storeCreate(cfg)` with its REQUIRED `filePath` and `journalLength` **⟶ AMENDED 2026-10-11: `journalLength` is the ONE required argument, `filePath` is OPTIONAL (`A49`) and `listeners[]` is a THIRD input (`A56`)** — each input's domain, the values outside it, and the declared answer for each; **the `file` tier's persistence** — the JSON file at `cfg.filePath`, the commit's atomicity, and `A16`'s two-step failure arm; **the boot and lifetime clause**; **the node-side constraint-and-repair evaluation seam** with its three OWED residual rows |
| **`§8`** (with `§8.1`–`§8.3`) | `docs/specs/storeroom-native/contract.md §8` | **the CLOSED fail-code set — `14` members, each with its trigger and its rank** **⟶ AMENDED 2026-10-11: `15` members (`FilePathUnreachable` at rank `13`, `A53`/`A54`)** **⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: the operative figure is `16` members, `ConstraintListInvalid` appended at rank `16` (`contract.md §8.1`'s dated clause of 2026-10-15), and the `14`→`15` readings above stand BYTE-FOR-BYTE and are read THROUGH this reading**; the complement block and the two deliberately absent codes; **the generated-message rule `storeErrorMessage(code, args)` with its `MessageArgs` shape, its clause table and three worked examples, the first being the architect's own**; **the `StoreError` record shape** and the `secure` instance's indistinguishable blindness |
| **`§10`** (with `§10.1`–`§10.3`) | `docs/specs/storeroom-native/contract.md §10` | **the two parks, each with its one-line boundary clause**; **the `HO-` handoff rule and the `7`-row prohibited set**; **the candidate-property dispositions (`AR-9`, `F12`) with the id-level mapping recorded as OWED** |

**THE TWO UNNUMBERED TOP-LEVEL BLOCKS THIS PART DECLARES.** **Both are unnumbered headings that stand
outside any numbered section's span, so both are top-level blocks, and this part's map row declares them** —
**the map row's own declaration of each block, and the rule that a top-level block belongs to the part whose
map row declares it, are `docs/specs/storeroom-native/contract.md` §0's part-map row read with §0.1 item
10(a)'s relocation rule** (`[T: contract.md §0's part-map row and §0.1 item 10(a) | CROSS-REF]`):

| The block | Its heading | Its home, and the reason |
| --- | --- | --- |
| **the boot/lifetime block** | `### §7.2`'s `M-12` and its items 5–6 are the clause's home, and the block's own unnumbered statement stands below in this part's `## The boot and lifetime block` heading | **this part** — the block's subject is the store's own lifetime across a process boundary, which is this part's concern name |
| **the parks' boundary block** | `## The parks' boundary block` (below) | **this part** — the block names `P-1` and `P-3`, their owners, their revisit condition and their constraints; §0.1 item 10(a)'s map-row rule makes the declaring part this one **for the block the map sends here**, which is the case this block occupies |

**RECORDED OMISSIONS (what this part does NOT carry, and why).** **This part carries no code, no input, no
seam and no prohibition that the contract document does not already declare.** **In particular it does NOT
carry, and does not restate:** the record shapes and the walk (`§1`–`§2`, at `store-model.md`) · the three
verbs and the journal with its rollback and the watcher (`§3`–`§4`, `§6`, at `write-and-read.md`) · the tier
domain, the rank, the purge chain and the typed property register (`§5`, in the contract document — the
register's `P-TP-7` and `P-TP-9` rows observe this part's clauses) · the `§9` index and the `PAR-n` rows
(`parameter-semantics.md`). **A reader seeking one of those is pointed, never served a second copy here.**
**An omitted part is ABSENT, never written empty** (`docs/specs/storeroom-native/contract.md` §0.1
item 10(b), the omission rule).

**AND THE CLOSURE PREDICATE, READ OFF THE UNIT'S SINGLE ARITHMETIC:** **`{part-map PART entries}` = `5`;
`{files present} − {contract.md}` = `5`; the `3` recorded omissions contribute to NEITHER side — so `5 = 5`
and the unit's state is `CLOSED`** (`docs/specs/storeroom-native/contract.md` §0.1 item 10(c), the closure
predicate's home in this directory's own bytes)
(`[T: contract.md §0.1 item 10(c); the arithmetic is a CENSUS observation about the file set | CENSUS]`).

---

## The boot and lifetime block (unnumbered top-level; declared by this part's map row)

**This block belongs to no numbered section and carries no `§`-number of its own.** Its claims are the
contract's, stated once and cited; **it declares nothing the contract does not already carry.**

1. **THE STORE IS CREATED BY `storeCreate(cfg)` AND BY NOTHING ELSE**, and **`cfg.filePath` and
   `cfg.journalLength` are BOTH REQUIRED** (`P: §11 · A16`, `P: §14 · A31`; `§7.1`).
2. **`mem` IS LOST ON PROCESS EXIT** (`P: §12 · A19`: *"Process exit"*) **and `temp` with it**
   (`P: §11 · A15`); **`file` survives process exit** (`P: §1`). **"Process exit" is read at its narrow
   arm: not a realm teardown, not a window close, not a renderer reload** (`P: §12 · A19`'s own words).
3. **THE JOURNAL'S LIFETIME IS THE SESSION, AND IT EXPIRES AT SESSION END** (`P: §9 · A5`), **whose
   referent is the SAME EVENT — the process exit of item 2** (`§6.1` item 3).
4. **AT `storeCreate`, THE `file` TIER'S CONTENT AT `cfg.filePath` IS LOADED IF THE FILE EXISTS, AND THE
   STORE'S REGISTER BEGINS WITH THE KEYS THAT CONTENT CARRIES** (`§7.2` item 6) —
   **`[T | DECLARED-DEFAULT]`**, its alternative priced at `§7.2`.
5. **NOTHING ELSE IS RESTORED AT BOOT:** **the `mem` and `temp` tiers begin EMPTY, the journal begins with
   `0` entries, and nothing is watched** (`§7.2`; `P-TP-7`'s construction property).
6. **THE STORE'S OWN LIFETIME HAS NO VERB.** **This contract declares no `close`, no `shutdown`, no
   `dispose`, no `save` and no `load`** — **`file`-tier durability is a WRITE's act and a boot read's act, and
   nothing else** (`[P: §1, §11 · A16; T | NEGATIVE]`). **`A8`'s parked set includes the load path
   (`P-1`), and a `load` verb is not a name this unit's declaration carries**
   (`L: §1`'s enumeration rule: a name the declaration does not carry is not a row).
7. **A SECOND INSTANCE FROM THE SAME `cfg` IS A SEPARATE STORE:** **no state, no journal entry, no watched
   registration and no `file` path is shared** (`DD-14`; `P-TP-7`). **⟶ AMENDED 2026-10-11: the same sentence
   now reads over the LISTENER surface's own home — NO LISTENER REGISTRATION is shared between two
   instances, and a fresh `storeCreate` over an equal `filePath` loads NO registration (`DD-38`; `A45`/`A48`;
   `write-and-read.md §6.5` item 8 (e)) — while `A56`'s step (iv)/(v) order means each instance's OWN home is
   populated from ITS OWN `listeners[]` argument, BEFORE its registry is generated.**
8. **⟶ ADDED 2026-10-11 — WHAT THE BOOT DOES NOT RESTORE, STATED IN THE LISTENER SURFACE'S OWN TERMS:**
   **`AT storeCreate`, THE HOME MAP IS POPULATED FROM THE CALLER'S `listeners[]` ARGUMENT AND FROM NOTHING
   ELSE** — the `file` tier's content at `cfg.filePath` carries NO listener state (`A48`'s home is separate
   from the register and the graph; `DD-38` puts it out of the `file` bytes and out of the journal), **and
   the shipped answer *"nothing is watched"* therefore stands for the listener surface too when the array
   is empty.** **A registration is neither a `write` nor a `delete` and appends NO journal entry**
   (`write-and-read.md §6.1`'s two tracked verbs, unmoved).
`[P: §1, §9 · A5, §11 · A15 · A16, §12 · A19, §11 · A45 · A48, §17 · A56; T: the block's own citation set,
with item 8 taken at this contract's sixth bounded amendment | CONTRACT]`

---

## §7. The store's own persistence, and its construction inputs

### §7.1 The construction input set — `storeCreate(cfg)`, every input ruled or declared

```
storeCreate(cfg) → Store
cfg = {
  filePath:      string,     // ⟶ OPTIONAL (amended 2026-10-11) — the `file` tier's external location
  journalLength: number      // REQUIRED — a positive integer counting journal ENTRIES
  listeners:     Listener[]  // ⟶ ADDED 2026-10-11 — the listeners whose home is populated BEFORE the
                             //   registry is generated; each is `{ address, handle }` (A56, A57)
}
```

**THE `file` PATH IS PASSED ON FIRST CREATION** (`P: §11 · A16`: *"File path is passed to store on first
creation"*), **and the journal's parameters are REQUIRED CONSTRUCTION ARGUMENTS** (`P: §14 · A31`:
*"Required as args on store creation"*).

**⟶ AMENDED 2026-10-11 — THE CONSTRUCTION SURFACE: `filePath` BECOMES OPTIONAL, THE PATH IS PROBED BY A DRY
RUN, THE REGISTER'S TIER IS FIXED AT CREATION, THE `listeners[]` ARRAY IS TAKEN, AND THE HOME MAP IS
POPULATED BEFORE THE REGISTRY IS GENERATED** (`A49` + `A50` + `A51` + `A52` + `A53` + `A54` + `A55` + `A56`;
`RCA-8(d)` ANNOTATE-BESIDE; **the as-filed block and table above stand byte-for-byte**; `DD-34`, `DD-39`,
`DD-40`). **THE ARCHITECT'S OWN WORDS, VERBATIM:** ***"Make path an optional arg. If provided check that the
provided file address is reachable (fail verbosely if not) and then create the registry at `file` tier.
Otherwise, create at `mem`"*** (`A49`) · ***"Fix at creation"*** (`A50`) · ***"Fails as usual for an
unpermitted write"*** (`A51`) · ***"Reachable means the file exists or that the application can write it
successfully"*** (`A52`) · ***"Add new failure code"*** (`A53`) · ***"Default name"*** (`A54`) ·
***"Dry run. File must have write access."*** (`A55`) · ***"Accept listener array as args, and populate home
map before generating registry"*** (`A56`).

**THE CONSTRUCTION SEQUENCE, STATED AS ONE ORDERED CLAUSE — the order is BINDING and a step taking its
input from a later step FAILS** (`AR-47`; `implementation-plan.md §8.6`'s stop A):
1. **TAKE THE ARGUMENTS:** `filePath?` · `journalLength` · `listeners[]`.
2. **CHECK `journalLength` FIRST, BECAUSE IT IS THE ONLY ARGUMENT WHOSE ABSENCE IS STILL AN ERROR:**
   **ABSENT → `ConstructionArgumentMissing` and NO instance is returned; PRESENT but outside `{≥ 1
   integer}` → `AddressMalformed` and NO instance is returned** (the as-filed table's row, unchanged;
   `DD-16`, `DD-17`).
3. **PROBE `filePath` IF IT IS PROVIDED — A DRY RUN THAT WRITES NOTHING:** **the path is REACHABLE iff the
   file exists OR the application can write it successfully** (`A52`), **read with `A55`'s two
   requirements: the probe creates NO file, NO directory and NO byte, and WRITE ACCESS IS REQUIRED (so an
   EXISTING BUT READ-ONLY FILE FAILS; `A52`'s disjunction is read as *"the application can write it
   successfully"* GOVERNING over *"the file exists"* wherever the two disagree).** **A path that is
   ABSENT/`null`/`undefined`/`""`/a non-string is NOT probed: its answer is the as-filed one** (`""`
   and a non-string → `AddressMalformed`; **the two shape-less values are arguments of the wrong SHAPE
   and answer `AddressMalformed`, never `ConstructionArgumentMissing`** — the as-filed `null`/`undefined`
   clause below, unmoved).
**⟶ AMENDED 2026-10-11 — THE PROBE'S TWO ARMS ARE STATED IN THEIR DECIDABLE FORM, AND THE ARM WHOSE DECISION IS APPROXIMATE IS NAMED AS SUCH** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence of step 3 above stands byte-for-byte and THIS clause is the operative statement of HOW each arm is decided**; the gate-4 adversarial pass's `AM-10`; `DD-45`; `A52`; `A55`; `seams-and-lifecycle.md §7.2` items 3–4; `[T: the probe's decidable form, so no clause promises a decision the dry run cannot make | DECLARED-DEFAULT]`). **THE CLAUSE, IN THREE PARTS, AND NOT ONE OF THEM A NEW ARM:**
**(1) ARM (a) — THE PATH EXISTS: THE TEST IS THE WRITE-ACCESS OPEN ITSELF.** **An EXISTING path is REACHABLE iff a write-mode open of it SUCCEEDS WITHOUT CREATING, TRUNCATING OR WRITING A BYTE, and UNREACHABLE otherwise — so an EXISTING BUT READ-ONLY file FAILS, as `A55`'s *"File must have write access"* requires.** **This arm is DECIDED BY THE OPERATING SYSTEM'S OWN ANSWER to the open and not by a mode-bit inspection: it is the honest form of *"the application can write it successfully"* (`A52`), it leaves NO byte behind (the open is not a write), and it needs no dependency and no syscall seam beyond what a file open already is.**
**(2) ARM (b) — THE PATH IS ABSENT: THE TEST IS DECIDED ON THE PARENT DIRECTORY'S MODE BITS, AND THAT IS THE ARM WHOSE DECISION IS AN APPROXIMATION.** **An ABSENT path is REACHABLE iff its PARENT DIRECTORY exists, IS a directory, and its write bits permit the process to create an entry in it; UNREACHABLE otherwise — *"the path's parent directory does not exist"* being `DD-40` (a)'s own state.** **THIS ARM APPROXIMATES *"the application can write it successfully"*, because the only honest tests for an absent path are a CREATE — which `A55`'s *"Dry run"* forbids BY ITS OWN WORD — or a syscall seam, which this crate refuses.** **ITS APPROXIMATION IS THEREFORE DECLARED, WITH ITS CONSEQUENCE.**
**(3) THE MISMATCH CASE, DECLARED RATHER THAN DISCOVERED.** **Where arm (b)'s mode bits and the filesystem DISAGREE — a read-only MOUNT, an ACL deny, an ownership mismatch between the bits and the process — the probe answers REACHABLE, `storeCreate` RETURNS AN INSTANCE, and the path's failure surfaces LATER as `FileCommitFailed` (`§8.1` #15) on the FIRST `file`-TIER WRITE — and THAT LATER ANSWER IS THIS CLAUSE'S DECLARED CONSEQUENCE AND NOT A DEFECT, nor a second construction-time arm** (`DD-45`'s `what it REFUSES` cell names the alternatives: a syscall seam, a `create`+`remove` dry run, and a construction-time `FileCommitFailed`). **AND NO OTHER STATE MOVES: an ABSENT/`null`/`undefined`/`""`/non-string `filePath` is still NOT PROBED and answers the as-filed `AddressMalformed`; a path that IS a directory is still UNREACHABLE (`DD-40` (b)); and the probe still creates NO FILE, NO DIRECTORY AND NO BYTE.**
**ITS `alt`, PRICED, AND ITS REVERSAL POINT — `DD-45`'s:** **the priced alternative is a SYSCALL SEAM (`access(2)`/`faccessat`, or a `create`+`remove` dry run with its own cleanup duty), which would move arm (b)'s answer from a decided predicate to the platform's and needs a dependency or an `unsafe` binding this crate refuses; the mode-bit form is taken, with its mismatch case declared and answered by the later `FileCommitFailed`.** **REVERSAL POINT: a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-native/`** — **the instrument for a form that reads `A52`'s own words** (`DD-45`'s own reversal cell).

4. **FAIL `FilePathUnreachable` OR FIX THE REGISTER'S TIER AT CREATION:** **an unreachable path fails at
   construction with the NEW member `§8.1` #13 — `FilePathUnreachable` (`A53`; `A54`'s *"Default name"* fixes
   the spelling) — and NO instance is returned**; **a provided path that passes fixes the register's tier
   at `file`, and an ABSENT path fixes it at `mem`, and THE TIER NEVER MOVES AGAIN** (`A49`, `A50`;
   `store-model.md §1.6` item 4 (d); `DD-34`).
4. **bis. VALIDATE `cfg.constraints` IF IT IS PRESENT — THE CONSTRUCTION-TIME HALF OF THE SIXTEENTH MEMBER'S TRIGGER, ADDED 2026-10-15 BY THE `RCA-9` PASS** (`docs/specs/storeroom-native/contract.md §7.1` step 4 and `§8.1` #16; `docs/specs/storeroom-native-proposal-review.md §22.1` and `§22.4`). **`cfg.constraints` is the construction's FOURTH declared key and it is OPTIONAL: ABSENT is IN DOMAIN, no list is declared and NO code is produced** (`docs/specs/storeroom-js/surface.md §2.1`'s dated clause and its `cfg` block; `parameter-semantics.md §2.21`). **PRESENT, EVERY ELEMENT IS CHECKED AND THE VALIDATION IS ALL-OR-NOTHING: an element that is not a `{ address, id }` pair, or whose `address` lies outside `store-model.md §1.5`'s segment array, or whose `id` is ABSENT, answers THE SIXTEENTH MEMBER `ConstraintListInvalid` (`§8.1` #16), and NO INSTANCE IS RETURNED.** **A VALID LIST IS TAKEN AND THE CONSTRUCTION PROCEEDS TO STEP 5; NOTHING ELSE OF THIS SEQUENCE MOVES, and the construction creates NO file, NO directory and NO byte on either arm of this step** (`DD-40`'s dry-run requirement, read at this step). **AND THE LIST IS A CONSTRUCTION-TIME PARAMETER AND NOTHING MORE, DECLARED AT THIS STEP 2026-10-15 ON THE ARCHITECT'S OWN WORDS: the importing application supplies it on startup from its own information; THE STORE DOES NOT WRITE IT INTO THE FILE AND HOLDS NO REGISTER KEY FOR IT, so no step of this sequence, and no boot, carries it** (`docs/specs/storeroom-js/surface.md §2.1`'s dated clause of this date; `docs/specs/storeroom-native-proposal-review.md §21.4`, whose sentence *"the list PERSISTS THROUGH THE REGISTER"* is thereby SUPERSEDED and NAMED). **THE LOAD-SIDE HALF OF THE SAME MEMBER'S TRIGGER IS STEP 7's, below — AND IT VALIDATES THE LOADED STATE AGAINST THE SUPPLIED LIST, THE LIST BEING NO BYTE OF THE FILE AND NO REGISTER KEY** (`§7.2` item 6, AS AMENDED 2026-10-15; THE ARCHITECT'S WORDS OF THAT DATE: *"The list is not persisted, the importing application will provide the constraints on startup from its own information."*).

5. **POPULATE THE HOME MAP FROM `listeners[]` — BEFORE THE REGISTRY IS GENERATED** (`A56`): **each entry's
   `address` is checked against `PAR-1`'s domain (outside → `AddressMalformed`, NO instance returned) and
   each entry's `handle` becomes a home entry keyed by its address.** **An EMPTY array is legal and is the
   ordinary no-listener store; a DUPLICATE address is ADMITTED AND BOTH ENTRIES ARE KEPT** (`DD-39`, which
   prices the collapse alternative). **The home is INSTANCE-SCOPED and SESSION-SCOPED, is out of the `file`
   bytes and out of the journal, and a fresh `storeCreate` over an equal path loads no registration**
   (`DD-38`).
6. **GENERATE THE REGISTRY:** **the register comes into being WITH its parent anchor, whose node is the
   distinct carrier node carrying the listener references, BORROWING FROM THE ALREADY-POPULATED HOME**
   (`A41`; `A56`; `store-model.md §1.6` item 4). **The order of steps 5 and 6 is the ruling's whole point
   and is NOT interchangeable.**
7. **BOOT-LOAD THE `file` TIER'S CONTENT** — the as-filed item 6 below, unchanged — **which places the
   admitted keys of the file at `cfg.filePath` into the register's container and produces `0`
   registrations** (the home was populated by step 5 and is NOT re-populated from the file: `DD-38`).
   **⟶ AMENDED 2026-10-13 — STEP `3`-BIS AND STEP `4b`, THE TWO STEPS THIS CONTRACT'S TENTH BOUNDED AMENDMENT ADDS BETWEEN ITS NEIGHBOURS: the SEVEN-STEP ORDER IS NOT RENUMBERED — steps `1`…`7` keep their numbers and their subjects, and this block states what happens between step `3` and step `4`** (`RCA-8(d)` ANNOTATE-BESIDE: **every numbered step above stands byte-for-byte and is read THROUGH this block**; `A52`; `A55`; `DD-40`; `DD-45`'s amended clause; the `docs/decisions.md` rows of `2026-10-13`; `contract.md §10.4`'s rule parts 1–6; `contract.md §8.1` #13's amended trigger clause; `[T: the two interpolated steps, so the order is read as binding rather than as a licence to move a step | CONTRACT + 1 DECLARED-DEFAULT]`).
   **STEP `3`-BIS — VALIDATE EVERY `listeners[]` ENTRY BEFORE THE CREATE (the NEW step, added ahead of step `4b` and before the home is populated):** **each entry's `address` is checked against `PAR-1`'s domain and each entry's `handle` is checked against the `ListenerHandle` surface the store can admit, and an array failing either check answers `AddressMalformed` with NO instance returned — the as-filed step 5's own answer, performed HERE so that NO ARGUMENT IS VALIDATED AFTER THE CREATE** (`contract.md §8.1` #1; the amended `cfg.listeners` row below; `parameter-semantics.md §2.12`; `contract.md §10.4` part 4). **THE STEP'S REASON, STATED SO IT IS NOT READ AS A REORDERING FOR ITS OWN SAKE: the create is a REAL, ONCE-PER-CONSTRUCTION FILESYSTEM ACT, so a construction that fails on a LATER argument would otherwise LEAVE THE FILE IT CREATED BEHIND — and `A55`'s *"leaves nothing behind"* must hold of EVERY construction that FAILS rather than of the ones that fail early** (`A55`; `contract.md §10.4` part 5). **AND THE AS-FILED STEP 5 IS UNMOVED BESIDE THIS ONE: its input is the array this step has already validated, and its own order against step 6 (the registry's generation) is the ruling's whole point and is NOT interchangeable** (`A56`).

   **⟶ RECONCILED 2026-10-13 BY THE GATE-8 DOCUMENTATION REVIEW (`role_documentation_reviewer`, `U-STOREROOM-ACCESS-PROBE`) — STEP `3`'S `⟶ AMENDED 2026-10-11` PARTS `(2)` AND `(3)` ARE **SUPERSEDED**, AND THE CLAUSE THAT SUPERSEDED THEM HAS BEEN STANDING SINCE THE RULING WHILE THEY STILL PRINT AS OPERATIVE** (`RCA-8(d)` ANNOTATE-BESIDE: **step `3` above, the amendment's three parts, the `alt` clause and the two interpolated steps stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause adds no step, moves no number, re-decides no ruling and re-writes no part — it states which parts a recorded ruling has taken and where their operative replacements are**; `[T: the two superseded parts and their operative replacements, so no reader derives a mode-bit probe or a later `FileCommitFailed` from a clause the code no longer implements | state or fail-state declaration]`).

   - **(1) PART `(2)` — *"ARM (b) — THE PATH IS ABSENT: THE TEST IS DECIDED ON THE PARENT DIRECTORY'S MODE BITS"* — IS WITHDRAWN, AND ITS OWN `alt` CLAUSE NAMED THE INSTRUMENT THAT WITHDREW IT.** **The reversal point printed one step below reads *"a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-native/`"* — AND THAT RULING EXISTS, IN THE ARCHITECT'S OWN WORDS: *"the file store method needs a writeable file address"*, recorded as an ACTIVE row and taken as this contract's tenth bounded amendment.** **THE OPERATIVE DECISION OF THE ABSENT-PATH ARM IS THE CONSTRUCTION'S OWN EXCLUSIVE CREATE — `create_new`, which asks the kernel BY ATTEMPTING THE ACT — with the arms separated by a NAME LOOKUP (`symlink_metadata`, `lstat`) and NOT by a permission word; NO mode-bit inspection of the parent occurs anywhere in the implementation and NO syscall seam was taken** (`contract.md §10.4` parts `1`, `2` and `5`; `src/store.rs`'s `storeCreate` step `4b` and its `path_is_reachable`; `docs/decisions.md`'s ruling row and its gate-8 correction clause, which records that the `libc::faccessat` remedy the row names was ABANDONED and never added a dependency).
   - **(2) PART `(3)` — THE MISMATCH CASE *"DECLARED RATHER THAN DISCOVERED"*, WHERE THE PROBE ANSWERS REACHABLE AND THE FAILURE SURFACES LATER AS `FileCommitFailed` — IS SUPERSEDED FOR THE CONSTRUCTION, AND THIS IS THE FIFTH INSTANCE OF THE CLASS THE UNIT EXISTS TO FIX.** **The three states part `(3)` names — a read-only MOUNT, an ACL deny, an ownership mismatch between the bits and the process — are each REFUSED AT CONSTRUCTION with `FilePathUnreachable` and NO instance, and the blind greens set drove them and measured exactly that** (`contract.md §8.1` #13's amended trigger clause part (a) and `§10.4` part `5`; `docs/specs/storeroom-native-greens.md §10`'s `G5-AP-06` row, whose three forms each refused). **WHAT SURVIVES FROM PART `(3)` UNMOVED, AND IT IS ITS SECOND HALF: `FileCommitFailed` (`§8.1` #15) KEEPS ITS ROLE for a parent whose access CHANGES BETWEEN THE CONSTRUCTION AND THE FIRST WRITE — a drift the probe cannot see and never claimed to** (`contract.md §8.1` #13's amended clause; `docs/decisions.md`'s narrowing clause that this part's own row already records).
   - **(3) AND THE TWO PARTS ARE NOT DELETED, RE-SPELLED OR REPLACED IN PLACE: they stand as the declared form of `2026-10-11`, whose own reversal point was honoured.** **A reader who needs the arm as it is DECIDED TODAY reads step `3`'s text THROUGH these two items and then `§10.4` parts `1`–`5`; a reader who needs why the earlier form was taken reads the parts themselves.** **AND STEP `4`'s FAILURE MEMBER AND STEP `4b`'s INTERPOLATED STEPS ARE UNMOVED BY THIS CLAUSE.**
   **THE STORE'S OWN ACT — A DATED CLAUSE BESIDE STEP `3`, AND NEVER A SECOND STEP `3`: `A55`'S WORD *"Dry run"* GOVERNS THE PROBE, AND THE PROBE'S OWN CLAIM ABOVE STANDS WHOLE** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence of step 3 above — *"PROBE `filePath` IF IT IS PROVIDED — A DRY RUN THAT WRITES NOTHING"*, its three parts (1)–(3), its *"the probe still creates NO FILE, NO DIRECTORY AND NO BYTE"* clause, its `alt` cell and its reversal point — stands BYTE-FOR-BYTE and is read THROUGH this clause, which is the operative statement of what the STORE does with the path the probe has approved**; the `docs/decisions.md` row of `2026-10-13` whose decision marker is *"Yes, creating the store with a file path can cause a test write to that file path."*; `contract.md §10.4`; `DD-28`'s amended cell; `DD-45`'s amended clause; `store-model.md §1.6` item 4 (d); `[T: the store's own act, stated where the probe's claim lives so neither is read as the other | CONTRACT]`). **THE CLAUSE, IN FIVE PARTS:**
   - **(A) THE ACT.** **WHERE `filePath` IS PROVIDED AND ITS FILE IS ABSENT, THE STORE CREATES ITS OWN FILE AT THAT PATH — EXCLUSIVELY — AND LEAVES IT ZERO-LENGTH: AN EMPTY FILE AND NO BYTE.** **The primitive is the EXCLUSIVE create (`create_new`, `O_CREAT|O_EXCL`) and NEVER a truncating create, so the store's own bootstrap can never destroy a file that carries committed bytes** (the same row). **THE FILE IS THE STORE'S OWN STORAGE AND NOT A PROBE'S LITTER: its success IS the reachability answer, it needs NO CLEANUP DUTY, and it is not a file at a path some other party owns.**
   - **(B) THE FALL-THROUGH.** **ON `AlreadyExists` — an existing file, or a file that appeared between step 3 and this act — THE ARM FALLS THROUGH TO STEP 3 ARM (a)'S EXISTING WRITE-MODE OPEN, WHICH CREATES NOTHING AND TRUNCATES NOTHING: so a construction over an EXISTING file leaves that file's bytes BYTE-IDENTICAL and the persisted register a `boot_load` is about to read is never destroyed by the construction that reads it** (the same row; step 7 above).
   - **(C) THE FAILURE ARM.** **A CREATE THAT FAILS FOR ANY REASON OTHER THAN THE FALL-THROUGH REFUSES THE CONSTRUCTION: `EROFS` (a read-only mount), `EACCES` (an ACL deny, an ownership mismatch between the mode bits and the process), `ENOENT` (an absent parent directory) and every other failure ANSWER `FilePathUnreachable` (`contract.md §8.1` #13) AND RETURN NO INSTANCE.** **The three states the withdrawn mode-bit arm declared as a LATER `FileCommitFailed` are therefore DECIDED AT CONSTRUCTION, which is the case this amendment closes.**
   - **(D) THE ORDER, AND WHY IT IS FIXED.** **THE CREATE IS STEP `4b`: it runs AFTER step `3`'s probe, AFTER step `3`-bis's listener validation and AFTER step `2`'s `journalLength` check, and BEFORE step `4`'s tier fixity and before steps `5`–`7`.** **NO ARGUMENT IS VALIDATED AFTER IT, so EVERY CONSTRUCTION THAT FAILS LEAVES NOTHING BEHIND** (`contract.md §10.4` parts 4 and 5).
   - **(E) WHAT THE PATH IS NOT, AND WHAT THIS CLAUSE DOES NOT DECIDE.** **IT IS NOT A SECOND DURABILITY ROUTE: it commits NO register key, NO journal entry and NO registration, and the bytes at the path remain the bytes of the last successful `file`-tier `write`** (`DD-28`'s amended cell; the as-filed item 5 above). **AND IT PUTS NO QUESTION ABOUT THE PATH'S ORIGIN: *"where the path comes from at first creation"* stays `A16`'s printed silence and item 7 below's negative, unmoved** (`A16`).
   **AND `contract.md §10.4`'S PARTS (A)–(E) ARE THE SAME CLAUSE STATED AT THAT DOCUMENT'S OWN HOME, WITH ITS OWN DATED CLAUSES BESIDE STEP `3`'S AND STEP `4`'S TWIN CELLS THERE: this part is a `carrier` and its `§7.1` span IS that document's `§7.1`, so the two homes are reconciled BY POINTER and neither is left stale** (`contract.md §0.1` item 10(a)'s relocation rule; `[T: the two homes' pointer, so a reader of either is sent to both | CROSS-REF]`).

**⟶ THE ARM `(b)` CLAUSE IS RE-READ, DATED `2026-10-13` — step `3`'s *"the probe still creates NO FILE, NO DIRECTORY AND NO BYTE"* STANDS OF THE PROBE AND IS NOT THE DECIDING INSTRUMENT FOR AN ABSENT PATH.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of step `3` above — the as-filed sentence, parts `(1)`–`(3)`, its *"the probe still creates NO FILE, NO DIRECTORY AND NO BYTE"* clause, its `alt` cell and its reversal point — stands BYTE-FOR-BYTE and is read THROUGH this clause and through the store's-own-act clause above; THIS clause moves no numbered step and adds no arm.**
**THE WITHDRAWN READING, QUOTED SO IT IS NOT READ AS OPERATIVE: *"An ABSENT path is REACHABLE iff its PARENT DIRECTORY exists, IS a directory, and its write bits permit the process to create an entry in it"*, and *"THIS ARM APPROXIMATES *"the application can write it successfully"*"*.** **IT IS WITHDRAWN AND IS NOT THE INSTRUMENT THIS TREE PERFORMS: the mode bits decide NOTHING about an absent path here, and the three states this part's own part `(3)` named as a LATER `FileCommitFailed` are DECIDED AT CONSTRUCTION by the store's exclusive `create_new` — `EROFS`, `EACCES`, `ENOENT` each answering `FilePathUnreachable`** (part `(C)` above; `contract.md §8.1` #13's amended trigger clause).
**WHAT ARM `(b)` NOW DECIDES, AND WHAT IT DOES NOT: it is a SCREEN and NOT the decision — for an ABSENT path the binding verdict is STEP `4b`'s exclusive create, and this step's own outcome is the kernel's answer at that act: the create SUCCEEDING is step `4b`'s reachability answer and its failure is the refusal.** **AND WHAT THIS STEP STILL DECIDES ALONE AND HONESTLY, UNMOVED: ARM `(a)` (the write-mode open of an EXISTING path, part `(1)` above), THE SHAPE CASES (`null`/`undefined`/`""`/a non-string answering `AddressMalformed`; a path that IS a directory answering UNREACHABLE), and THE PROBE'S OWN INNOCENCE — THE PROBE CREATES NOTHING AND NO BYTE, at every path it is given** (`contract.md §10.4` parts 1–3 and 5; `DD-45`'s amended clause; `seams-and-lifecycle.md §7.2` items 3–4; the `docs/decisions.md` rows of `2026-10-13` | CONTRACT + 1 DECLARED-DEFAULT]).

**AND THE AMENDED `filePath` ROW OF THE TABLE BELOW, PRINTED IN FULL SO THE AS-FILED ROW IS NOT READ AS
OPERATIVE:** **`cfg.filePath`'s domain is *"ABSENT, or a non-empty `string` naming a path the process may
write AND that passes the reachability test"*; its outside values and their declared answers are:**
**ABSENT → the path is legal and the register is created at `mem` (NO failure)**; **`null`/`undefined`/`""`/a
non-string → `AddressMalformed`, no instance**; **a string that FAILS the two-armed test → the NEW member
`FilePathUnreachable` (`§8.1` #13), no instance, and nothing created by the probe** (`DD-40` prices the two
unnamed states the dry run leaves: an absent parent directory is UNREACHABLE, and a path that IS a directory
is UNREACHABLE at construction while the same state reached later by a `file`-tier write remains
`FileCommitFailed`).
**AND THE `ConstructionArgumentMissing` TRIGGER IS NARROWED, NOT DELETED — `DD-17` MOVES:** **the as-filed
`DD-17` row read *"`storeCreate` with a missing or invalid `filePath` or `journalLength` fails at construction
with `ConstructionArgumentMissing`"*; the OPERATIVE form is *"`storeCreate` with a missing `journalLength`
fails at construction with `ConstructionArgumentMissing`, and a present-but-out-of-domain `filePath` or
`journalLength` answers `AddressMalformed`"* — so the missing-argument arm now has ONE argument and the
member's own trigger column at `§8.1` #12 names exactly that one** (`DD-17`'s as-filed cell stands
byte-for-byte at `contract.md §0.2` and is read through this clause)
(`[P: §15 · A49 · A50 · A51, §16 · A52 · A53, §17 · A54 · A55 · A56; T: the sequence's own statement |
CONTRACT]`).

| Input | Its domain | Outside the domain | The declared answer to each outside value |
| --- | --- | --- | --- |
| **`cfg.filePath`** | **⟶ AMENDED 2026-10-11: ABSENT, or a non-empty string — a path the process may write THAT PASSES THE REACHABILITY TEST (`A52`/`A55`)** | **⟶ `null` · `undefined` · `""` · a non-string · a string that FAILS the reachability test** (**ABSENT is no longer an outside value**) | **⟶ ABSENT → LEGAL, the register is created at `mem` (`A49`); `null`, `undefined`, `""`, a non-string → `AddressMalformed`; a string that fails the reachability test → `FilePathUnreachable` (`§8.1` #13)**; **in the three failing cases NO instance is returned** (`DD-40`) **⟶ AMENDED 2026-10-13 (`contract.md §10.4`): the reachability test's TWO ARMS ARE BOTH DECIDED BY THE KERNEL — a write-mode open of an EXISTING path, and the store's own EXCLUSIVE CREATE at an ABSENT one — and the string that PASSES now LEAVES A ZERO-LENGTH FILE (AN EMPTY FILE AND NO BYTE: the boot's own act, not a second durability route), while the string that FAILS leaves NOTHING BEHIND and returns NO instance. THE DEFECT THIS REPLACES IS NAMED SO THE ROW'S OWN HISTORY IS NOT SMOOTHED: the withdrawn arm read the PARENT DIRECTORY'S MODE BITS, so a root-owned `0755` path the process could not write was answered REACHABLE and the first `file`-tier write then threw `FileCommitFailed` (`DEF-20`; `DD-45`'s amended clause).** |
| **`cfg.listeners`** | **⟶ ADDED 2026-10-11: an ARRAY, each entry an `{ address, handle }` record whose `address` lies in `PAR-1`'s domain and whose `handle` is a `ListenerHandle` the store can admit; the EMPTY array is IN the domain** | **ABSENT from `cfg` · `null` · `undefined` · a non-array · an array carrying an entry whose `address` is outside `PAR-1`'s domain · an array carrying an entry whose `handle` is not a `ListenerHandle` the store can admit** | **⟶ `AddressMalformed` for EVERY ONE of the six, with NO instance returned** (the shape is not the argument's shape at all; a malformed address inside the array is `PAR-1`'s own answer carried; **ABSENT is the ONE absence `A56`'s construction does NOT admit**; **an inadmissible `handle` is the element-shape cell the amended row now prints — `AM-16`'s reconciliation**) **⟶ AND 2026-10-13: THIS ROW'S SIX ANSWERS ARE DELIVERED AT THE NEW STEP `3`-BIS, AHEAD OF THE CONSTRUCTION'S CREATE, so a construction refused here has created NO FILE, NO DIRECTORY AND NO BYTE — the values, the code and the no-instance half are UNMOVED** (`contract.md §10.4` part 4; step `3`-bis above) — `parameter-semantics.md §2.12`, whose six outside values this row prints value for value |
| **`cfg.journalLength`** | a positive integer (`≥ 1`) | absent · `null` · `undefined` · `0` · a negative integer · a non-integer number · a non-number | **absent → `ConstructionArgumentMissing`; present but out of domain → `AddressMalformed`**; **no instance is returned** (`DD-16`, `DD-17`) |
| **⟶ THE `cfg.listeners` ROW'S OWN RECONCILIATION, ADDED HERE SO THE TWO HOMES AGREE BY POINTER AND BY COUNT (2026-10-11, the gate-4 adversarial pass's `AM-16`)** | **six outside values, as its cell above prints them** | **its cell above** | **`AddressMalformed` for every one, with no instance returned** — `parameter-semantics.md §2.12`, whose list is the same one; **the as-filed row's `4` values and `PAR-12`'s `6` are the SAME list read at two granularities** (the entry-shape class and the two malformed-entry classes — a malformed `address`, an inadmissible `handle` — print as one class in the as-filed row and as three in `PAR-12`), **and `contract.md §5.7`'s re-derived `S-CONSTRUCT` census counts `6` (`3` shape-less + `1` non-array + `2` malformed-entry classes, `3 + 1 + 2 = 6`)** |
| **any third key on `cfg`** | **ignored** (`[T | DECLARED-DEFAULT]`; the alternative — a failure — is priced: `A31` names the required set and `A16` the path, and neither names an unknown-key arm; **reversal point: a bounded amendment**`) | — | — |

**AND THE `null`/`undefined` CELLS, STATED SO THE TRIGGER LIST AND THE `PAR` ROWS AGREE** (`[T: the shape
cells, at this contract's second bounded amendment — `PAR-6`/`PAR-7` declare these values and `§8.1` #1's
trigger column now names them | CONTRACT]`): **a `filePath` or a `journalLength` that is present with the
value `null` or `undefined` is NOT an absent argument** — **it is an argument of the wrong SHAPE, and its
answer is `AddressMalformed`, never `ConstructionArgumentMissing`.** **The line is exact: ABSENCE answers
`ConstructionArgumentMissing`; PRESENCE with a value outside the domain — including the two shape-less
values — answers `AddressMalformed`.**

**AND THE THIRD KEY'S STATE, STATED PLAINLY RATHER THAN LEFT AS AN UNIMPLEMENTED ARM:** **`cfg`'s member
set is CLOSED at exactly the two declared keys** (`§0.4`'s `StoreConfig` spelling), **so in a typed crate a
third key is UNREPRESENTABLE rather than *"ignored"*.** **The clause's declared RESULT still holds — no
third key produces a code, no third key is refused, and `§8.1`'s complement says so** — and **the
unrepresentability is carried as an `OWED` item with its owner and its positive revisit condition at
`§0.2` · `O-3`** (`[T: the third key's state, stated at this contract's second bounded amendment | OWED]`).

**WHERE THE PATH COMES FROM AT FIRST CREATION IS NOT THIS UNIT'S QUESTION.** `A16` names the path as the
**store's own construction input**, and *"the path's ORIGIN may be integration-side and parked"*
(`P: §11`'s consequence 4) — **so this contract states the input and never its source.** **`A16`'s printed
silence — *"it does not say where that path comes from at first creation (the caller, the app, a
configuration)"* — is carried as `P-1`'s, and no clause here reaches it** (`[R: §17.4 condition 2 | NEGATIVE]`).
`[P: §11 · A16, §14 · A31 | CONTRACT]`

### §7.2 The `file` tier's persistence — what a commit guarantees, and its failure arm

**⟶ AMENDED 2026-10-15 — THE `RCA-9` PASS RE-SPELLS THE STORE'S SIDE HERE: THE COMMIT IS THE TERMINAL ARM'S ACT, AND THE VERB'S `file`-TIER ARM RETURNS AS IT DOES TODAY** (`RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`; its store-side re-spell is ruled at that record's `§22.5` item 2; `RCA-8(d)` ANNOTATE-BESIDE: **items 1–7 below stand BYTE-FOR-BYTE and are read THROUGH this clause**). **ITEM 1's `M-12` IS UNMOVED — the `file` tier IS saved to a JSON file at `cfg.filePath` — and WHAT MOVES IS THE ACT THAT SAVES IT: the verb's `file`-tier arm performs NO file I/O and returns its `WriteResult` as it does today, while the commit is performed by the SURFACE'S TERMINAL ARM, after every constraint of that write's triggered set has passed and before any listener body of the delivered set runs, KEYED BY THE SETTLED RECORD'S OWN `op`** (`docs/specs/storeroom-native/contract.md §7.2`'s dated clause of this date; `docs/specs/storeroom-js/surface.md §2.11` clauses 2–3). **ITEM 2's ATOMICITY — THE SIBLING WRITE AND THE RENAME — IS UNMOVED IN EVERY RESPECT, and so is its observable: after a FAILED commit the bytes at `cfg.filePath` are BYTE-IDENTICAL to the bytes that stood there before the attempt, so a FAILING PASS LEAVES THE LAST PASSING IMAGE DURABLE and a PASSING PASS'S IMAGE IS DURABLE BEFORE ANY LISTENER BODY RUNS** (`docs/specs/storeroom-js/surface.md §2.11` clause 4). **ITEM 3's TWO-STEP FAILURE ARM IS UNMOVED AND ITS ORDER IS THE ONE A DRIVE READS: the rollback first, the failure answered to the caller second, and the caller receives the failure and never the rolled-back state — SO A FAILED SAVE IS AN UNREPAIRABLE CONSTRAINT VIOLATION and the message it answers is its code's generated one** (`docs/specs/storeroom-native/contract.md §8.1` rank `#15` `FileCommitFailed`, whose trigger column was WIDENED 2026-10-15 to reach the save act (`docs/specs/storeroom-native-proposal-review.md §20.4` `F-3`), and `§8.2`; `docs/specs/storeroom-js/surface.md §2.11` clause 5). **ITEM 4's ONE-FAILURE CLAUSE AND ITS `FileCommitFailed` CODE ARE UNMOVED, and ITEM 5's *"a `file`-tier write is the only write that touches the file"* IS RE-SPELLED AT ONE COORDINATE ONLY: the file's I/O is the TERMINAL ARM's `file`-tier save, and the `delete` and the `rollback` still perform none** (`docs/specs/storeroom-native/contract.md §7.2` item 5, read through its dated clause). **ITEM 6's BOOT AND ITEM 7's NUMBER NORMALIZATION STAND EXACTLY AS PRINTED, read with the boot's new duty: ON `storeCreate`, THE `file` TIER'S CONTENT AT `cfg.filePath` IS LOADED AS BEFORE, AND A PRESENT `cfg.constraints` IS VALIDATED AGAINST IT — A VALIDATION FAILURE AT LOAD BEING THE TRIGGER OF THE SIXTEENTH MEMBER, `ConstraintListInvalid`** (`docs/specs/storeroom-native/contract.md §7.1` step 4 and `§7.2` item 6, AS AMENDED; `§8.1` #16).

1. **`M-12` — THE `file` TIER IS SAVED TO A JSON FILE AT `cfg.filePath`** — *"`file` is meant to be saved to
   a json file in a persistent, external location"* (`P: §1`).
2. **A COMMIT IS ATOMIC AT THE FILE** (`DD-2`): a successful `file`-tier write's bytes land **whole**; **a
   failed commit leaves the file's prior bytes intact** — **and "intact" is DRIVABLE, stated here as the
   observable: after a failed `file`-tier commit, the bytes at `cfg.filePath` are BYTE-IDENTICAL to the
   bytes that stood there before the attempt, so re-reading the path answers the pre-attempt content, not a
   truncated or partially rewritten file** — and **the store's `file` state is what the journal restores it
   to** (`§6.4` `M-11`). **The failure's CODE is `FileCommitFailed`** (`§8.1` #15 — **RE-POINTED 2026-10-16: this cell's as-filed rank was `#14`, which `ValueNotAdmitted` took when the `file`-tier save's pass added the store's sixteenth closed-set member; the rank's ONE home is `docs/specs/storeroom-native/contract.md §8.1`, whose own row prints `FileCommitFailed` at `15` and `ValueNotAdmitted` at `14`**)
   (`[T: the atomicity's observable, stated at this contract's second bounded amendment | CONTRACT]`).
3. **A FAILED `file`-TIER WRITE'S FAILURE ARM IS EXACTLY TWO STEPS, IN THIS ORDER** (`P: §11 · A16`):
   **(i)** **the file rolls back the change in the journal automatically; (ii)** **then the failure is
   passed back to the caller** — i.e. the called verb throws the `StoreError` for the failure that caused
   it, and **the caller receives the failure, not the rolled-back state.**
4. **WHAT "FAILURE" COMPRISES** — `A16`'s printed silence is *"what 'failure' comprises (the file write
   alone, the journal's own append, or both)"*. **THIS CONTRACT DECLARES IT COMPRISES BOTH: every failure of
   the `file`-tier write path — the serialization, the file write, and the journal append — is ONE
   failure** (`[T | DECLARED-DEFAULT]`), **and its ONE code is `FileCommitFailed` (`§8.1` #15 — **RE-POINTED 2026-10-16: this cell's as-filed rank was `#14`; the store's sixteenth member took `15` and `ValueNotAdmitted` holds `14`**; `DD-25`),
   whose generated message is `§8.2`'s `FileCommitFailed` row**; the alternative (the file write alone) is
   priced: a journal-append
   failure would leave the file's bytes committed and the journal short an entry, so no walk-back could
   reach the state; **reversal point: a fresh ruling.**
5. **A `file`-tier WRITE IS THE ONLY WRITE THAT TOUCHES THE FILE**; `mem`- and `temp`-tier writes perform
   **no** file I/O (`P: §1`'s tier table; `[T | CONTRACT]`). **AND THE `file` TIER'S DURABILITY IS A
   WRITE'S ACT ALONE — THE `delete` AND THE `rollback` DO NOT COMMIT, STATED HERE BECAUSE THE GATE-4
   ADVERSARIAL PASS FOUND THE CLAUSE ABSENT** (`DD-28`; `[T + DD-28 | DECLARED-DEFAULT]`): **a `delete` —
   at ANY tier scope, INCLUDING a delete that removes `file`-tier versions — performs NO file I/O, and a
   `rollback` performs NO file I/O; the bytes at `cfg.filePath` are therefore the bytes of the LAST
   SUCCESSFUL `file`-TIER WRITE.** **CONSEQUENCE, EACH DRIVABLE: after `write(['a'], file, 1)` commits, a
   `delete(['a'])` leaves the file's bytes carrying `a`; a FRESH `storeCreate(cfg)` at the same
   `cfg.filePath` then re-boots from those bytes, so `read(['a'])` answers the version the delete removed in
   memory** — **that re-boot is `§7.2` item 6's declared boot and is the declared consequence of this
   clause, NOT a defect.** **The priced alternative and the reversal instrument are `DD-28`'s** — **the
   alternative (a `file`-committing delete and rollback) would give two verbs a second failure arm whose
   only available member is `FileCommitFailed`, whose trigger column is *"a `file`-TIER WRITE'S failure
   path"* (`§8.1` #15 — **RE-POINTED 2026-10-16: this cell's as-filed rank was `#14`; `FileCommitFailed` stands at `15` and `ValueNotAdmitted` holds `14`**), and would require `A16`'s automatic journal rollback — a write's arm — to be
   re-stated for two verbs `A16` does not name.**
6. **`mem` IS LOST ON PROCESS EXIT**, and **`temp` with it** (`P: §12 · A19`; `P: §11 · A15`); **`file`
   survives process exit** (`P: §1`). **THE STORE'S BOOT IS: on `storeCreate`, the `file` tier's content at
   `cfg.filePath` is loaded if the file exists, and the store's register begins with the keys that content
   carries** (`[T | DECLARED-DEFAULT]`); the alternative — a store that ignores an existing file until first
   written — is priced: `A16`'s *"File rolls back change in journal automatically on failure"* presumes a
   standing file state, and a lazy-load would make the first post-boot write's `before` half unreconstructable;
   **reversal point: a bounded amendment.** **AND THE BOOT'S ANSWER FOR A CONTENT CLASS `§1.4` DOES NOT
   ADMIT — STATED BECAUSE `§1.4`'s FAILURE IS A WRITE-TIME RULE AND THE BOOT IS NOT A WRITE** (`DD-29`;
   `[T + DD-29 | DECLARED-DEFAULT]`): **a register KEY whose value lies outside `§1.4`'s admitted set (a
   `null`, a non-finite number, a class no leaf may hold) is DROPPED from the boot's register — the rest of
   the content loads, the instance IS returned, and NO code is produced for the dropped key**; **the store's
   register therefore begins with exactly the keys whose values the taxonomy admits, and a boot-time
   `ValueNotAdmitted` is NOT declared, because `§8.1` #13's trigger is a WRITE's value.** **`DD-29`'s `alt`
   cell prices the boot-failure alternative.**
   `[P: §1, §11 · A15 · A16, §12 · A19 | CONTRACT + the boot's and the file-durability DECLARED-DEFAULT
   sub-clauses, priced at `DD-28` and `DD-29`]`
   **⟶ AND ONE STATE ITEM 6 NOW REACHES THAT IT COULD NOT REACH BEFORE, STATED AT THE BOOT BECAUSE THE BOOT IS WHAT READS IT (2026-10-13, `contract.md §10.4`):** **WITH THE CONSTRUCTION'S OWN EXCLUSIVE CREATE LANDED (step `4b` above), a `storeCreate` over a PROVIDED, ABSENT path now REACHES THIS ITEM WITH A FILE THAT EXISTS AND CARRIES `0` BYTES — so item 6's *"loaded if the file exists"* is read on a ZERO-LENGTH FILE: the content is the empty text, `0` register keys load, `0` registrations load, and NO code is produced.** **THE INSTANCE IS STATE-IDENTICAL TO THE ONE A CONSTRUCTION OVER AN ABSENT FILE PRODUCED BEFORE THIS AMENDMENT, which is why no clause of this item moves and why `DD-38`'s *"a fresh `storeCreate` over an equal path loads NO registration"* stands whole** (`DD-38`; `DD-28`'s amended cell; `contract.md §10.4` part 3; `[T: the boot's new reachable state, so a zero-length file is not read as an unadmitted or a malformed content | CONTRACT]`).
7. **⟶ ADDED 2026-10-11 — THE `file` TIER'S JSON TEXT CARRIES A CANONICAL NUMBER SPELLING, AND THE
   NORMALIZATION IS A PROPERTY OF THE FILE'S IMAGE AND NOT OF THE VALUE THE STORE HOLDS** (`RCA-8(d)`
   ANNOTATE-BESIDE: **every item above stands BYTE-FOR-BYTE and THIS item is the operative statement of
   what the committed bytes carry for a number**; **the ruling: *"Normalize into file"*, transcribed as
   `A59` at the FILED proposal `docs/specs/storeroom-listeners-proposal.md` `§21`, whose resolving citation
   form is `P: §21 · A59`**; `store-model.md §1.4`'s narrowed class 3 and `P: §21 · A60`;
   `contract.md §5.2`'s `P-IM-1` scope clause; `DD-46`; `[T: the `file` image's spelling and the narrowing's
   own reach, so neither is inferred from a value's equality | DECLARED-DEFAULT]`).
   **THE CLAUSE, IN FOUR PARTS:**
   - **(a) THE RULE.** **A NUMBER IS NORMALIZED ON THE WAY INTO THE FILE, and its canonical spelling is
     THE SHORTEST DECIMAL SPELLING THAT PARSES BACK TO THE SAME `f64`** — Rust's `f64` `Display` form: an
     integral carrier value takes no fractional part (`100`, never `1e2` and never `100.0`), a signed zero
     is written `0`, and a value whose shortest spelling needs an exponent takes it (`1e300`, `5e-324`).
     **So `-0` is written `0`, and `1e2`, `1.0` and `1E+2` are each written in the canonical form of the
     value they denote** (`P: §21 · A59`'s own examples) — **`DD-46` (a)'s rule, stated here where the file's
     bytes are the subject.**
   - **(b) THE SIDE.** **The rule binds the WRITE-TO-FILE side ONLY.** **It is NOT required on the read
     side: any finite JSON number spelling a parser admits is ACCEPTED at the boot of item 6 and converted
     to the carrier it denotes, canonical or not** (`DD-46` (b)) — **so a file whose content carries `1E+2`
     loads as `100`, and the file's non-canonical text is not itself an error and is not rewritten by the
     boot.**
   - **(c) THE OBSERVABLE.** **The canonical form is OBSERVABLE ONLY THROUGH THE `file` BYTES** — and
     through what those bytes carry after a boot; **no verb returns JSON text** (`contract.md §0.4` closes
     the surface, and no clause of this directory hands a caller the file's text as a value). **THIS ITEM
     GOVERNS THE STORE'S DECLARED VERBS AND SURFACE, AND IT DOES NOT GOVERN A BINDING'S OWN INTERNAL
     REPRESENTATION: a binding MAY translate its own value copy through JSON text, provided no store verb
     accepts, returns or exposes that text and the store's `StoreValue` boundary is unchanged** (`A140`,
     2026-10-21). **AND THE ONE
     DECLARED NORMALIZATION IS OBSERVED IN TWO HALVES, WHICH ARE NOT THE SAME HALF:** **IN MEMORY (`mem` and
     `temp`) THE SIGN IS NOT TOUCHED — a `mem`/`temp` `-0` reads back `-0`; the committed bytes of a
     `file`-tier write of `-0` carry `0`, and a `file`-tier `-0` therefore READS BACK `0` after a boot
     — BY THIS ITEM'S DECLARATION and not as an inexactness** (`P: §21 · A59`: *"the normalization is a
     property of the FILE's IMAGE, not of the value the store holds"*). **AND THE BOOT CONVERTS TO A
     CARRIER AND NOT TO A SIGN: the VALUE read back after a boot of a `file`-tier `-0` is `0`, while a
     `mem`-tier `-0` is never routed through the file at all.**
   - **(d) THE NARROWED DOMAIN'S REACH, AND THE BOOT'S ANSWER FOR AN OUT-OF-RANGE SPELLING.** **A NUMBER
     OUTSIDE THE CARRIER'S EXACT RANGE IS REFUSED, and its declared answer is the EXISTING member
     `ValueNotAdmitted` (`contract.md §8.1` #14) and never a silent rounding** (`P: §21 · A60`; the
     predicate — an integral literal of magnitude greater than `2^53` — is `store-model.md §1.4`'s). **THE **⟶ RECONCILED 2026-10-11 (THE SUPERVISOR'S LANDING OF THE BOUND-PREDICATE ALIGNMENT — `RCA-8(d)` ANNOTATE-BESIDE: the as-filed cell stands and THIS clause is the operative predicate): the predicate is NOT *"an integral literal of magnitude greater than `2^53`"* but **THE INTEGRAL LITERAL THE `f64` CARRIER CANNOT REPRESENT EXACTLY** — so the shape that falls OUTSIDE is `2^53 + 1` (`9007199254740993` and its negative) while the shapes that fall INSIDE are `2^53 + 2` and `2^53 + 4` (each held exactly by the carrier, the `f64` spacing at `2^53` being `2`) — exactly as `contract.md §1.4` clause 2 and `store-model.md §1.4` item 2 now read (`P: §21 · A60`), and exactly as the crate's `StoreValue::is_admitted` and the e2e battery's neighbour cells already behave.**
     REACH, STATED BECAUSE THIS DIRECTORY'S SURFACE DECIDES IT:** **the domain is decided over the value a
     JSON TEXT denotes AT THE MOMENT OF CONVERSION, and THIS ITEM IS WHERE THIS DIRECTORY PERFORMS THAT
     CONVERSION — the boot of item 6. On a WRITE the carrier has already converted: every
     `StoreValue::Num(f64)` the write arm can be handed is IN range by construction, so no out-of-range
     value reaches the write arm and no clause is left promising a refusal there that no state can
     exhibit.** **AND WHERE THE FILE'S OWN TEXT CARRIES AN INTEGRAL LITERAL OF MAGNITUDE GREATER THAN
     `2^53` — the ONE shape clause (a)'s taxonomy refuses — THE BOOT APPLIES `DD-29`, THE CLAUSE THAT ALREADY
     GOVERNS NON-ADMITTED BOOT CONTENT: that register key lies outside the ADMITTED set as `contract.md
     §1.4` narrows it, so it is DROPPED, the rest of the content loads, the instance IS returned, and NO
     code is produced for the dropped key.** **THE WRITE ARM'S OWN TRIGGER IS NOT WIDENED TO THE BOOT: `§8.1`
     #14's trigger is a WRITE's value, the boot's answer is `DD-29`'s and not this member's, and the two
     states' answers are therefore DIFFERENT AND EACH DECLARED** (`DD-29`'s priced boot-failure alternative
     stands unmoved). **ITS `alt`, PRICED, AND ITS REVERSAL POINT ARE `DD-46`'s** — its `(a)` cell prices the
     spelling alternatives, its `(b)` cell prices the second candidate predicate and the wider-carrier
     alternative, and its reversal cell names the instrument.

### §7.3 The constraint-and-repair evaluation seam

1. **CONSTRAINTS AND REPAIRS ARE EVALUATED NODE-SIDE** (`P: §9 · A6`: *"Constraints/repairs are evaluated
   node-side"*). **THIS MEANS: THE CORE CARRIES NO CONSTRAINT OR REPAIR IMPLEMENTATION, AND THIS CONTRACT
   DECLARES NO CONSTRAINT SURFACE, NO REPAIR SURFACE, NO CONSTRAINT REGISTRATION AND NO CONSTRAINT
   RECORD** (`[P: §9 · A6 | NEGATIVE]`).
2. **THE JOURNAL IS THE WINDOW THE NODE-SIDE EVALUATION RUNS IN** (`P: §8`: the journal is *"needed to
   check constraint violations while preserving the original data in case of failure"*), **and the
   instrument the node uses to reach it is the returned op plus `rollback`** (`§6.2`, `§6.3`).
3. **`A6`'s own printed silences stand and are NOT answered here:** the evaluation's **timing relative to
   the landing**, **what the core must expose for it**, and **whether a repair writes through the
   journaled write path** are `J-20`/`J-21`/`J-22`, **and each is `P-1`'s** (`P: §9`'s `A6` cell;
   `R: §17.4` condition 2). **NO CLAUSE OF THIS CONTRACT STATES AN EVALUATION POINT, AN EXPOSURE OR A
   REPAIR'S ROUTE** (`[R: §8.1 (the `J-20`–`J-22` rows, carried and not asked) | OWED]` — owner the
   architect, positive revisit condition *a ruling recorded as an ACTIVE `docs/decisions.md` row*).
4. **WHAT THE STORE DOES DO, AND ALL IT DOES:** **a write's `before` half is recorded before the install
   lands and the op is returned with it, so a node-side evaluator can instruct a rollback over the state
   that stood** (`§6.2`, `§6.4`).
`[P: §8, §9 · A6; R: §8.1 | CONTRACT + one OWED]`

---

## §8. The closed fail set — the codes, the generated messages, and the error's shape

### §8.1 THE CLOSED CODE SET — `14` members, each with its trigger

**⟶ AMENDED 2026-10-15 — THE SET NOW CARRIES `16` MEMBERS AND THE AS-FILED HEADING ABOVE STANDS BYTE-FOR-BYTE** (`RCA-9` = the change request at `docs/specs/storeroom-native-proposal-review.md §18.1`, its failure member ruled `SETTLED` at that record's `§22.2` and its census moves carried at `§22.4`; `RCA-8(d)` ANNOTATE-BESIDE: **the 2026-10-11 clause below stands BYTE-FOR-BYTE as that pass's own reading and is read THROUGH this clause**). **The sixteenth member is `ConstraintListInvalid`, ranked `16`, ITS TRIGGER BEING A LOAD-SIDE VALIDATION FAILURE OF THE CONSTRAINT LIST — an element of a present `cfg.constraints` that is not a `{ address, id }` pair, or whose `address` lies outside `store-model.md §1.5`'s segment array, OR A VALIDATION FAILURE AT LOAD** (`docs/specs/storeroom-native/contract.md §7.1` step 4 and `§7.2` item 6, AS AMENDED 2026-10-15; `contract.md §8.1` #16). **NO RANK OF `1`…`15` MOVES AND NO EXISTING TRIGGER MOVES: the member is APPENDED as the sixteenth, and the set's own algebra closes as `11 + 2 + 1 + 1 + 1 = 16` ✓ — the five terms summing the ORIGINAL FOUR at the 2026-10-11 clause below AND this one.** **ITS ROW LIVES AT `docs/specs/storeroom-native/contract.md §8.1` #16 AND ITS GENERATED-MESSAGE ROW AT BOTH `§8.2` HOMES, AS THE CLAUSE ABOVE THIS TABLE DECLARES.** **⟶ AND THE MEMBER'S TRIGGER LIST GAINS A THIRD INSTANT, 2026-10-16, AND EVERY FIGURE OF THIS CLAUSE IS UNMOVED** (`RCA-8(d)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this clause; the `16` members, the ranks, the five-term algebra and the two instants it already names all stand exact**). **On the architect's ruling of 2026-10-16 — verbatim: *"run constraints against the store when they are added, otherwise they can result in the rollback state not being valid"*** — **THE MEMBER NOW ALSO ANSWERS THE REGISTRATION-TIME EVALUATION OF AN ADDED CONSTRAINT AGAINST THE STORE'S CURRENT STATE, WHERE IT DOES NOT PASS AND CANNOT BE REPAIRED** (`contract.md §8.1` #16's amended trigger clause of this date and `§7.3`'s registration-instant clause, which are the homes and are cited, not restated). **SO THE INSTANTS ARE THREE — CONSTRUCTION (`§7.1` step 4-bis, above), LOAD (`§7.2` item 6), AND REGISTRATION — WHILE THE MEMBER COUNT IS STILL `16`: NO RANK MOVES, NO `CODES` LENGTH MOVES AND NO MEMBER IS MINTED** (`contract.md §0.4`'s re-affirmation of `[&'static str; 16]`; `contract.md` `:1401`'s *"a NARROWED TRIGGER IS NOT A NEW MEMBER"*, read at both directions). **⟶ AND THE COMMIT'S OWN ACT IS RE-SPELLED BY THE SAME PASS: `contract.md §7.2`'s dated clause of 2026-10-15 moves the `file`-tier commit out of the write verb and onto the terminal arm, so ITEMS 2, 3, 4 AND 5 OF `§7.2` BELOW STAND BYTE-FOR-BYTE AND ARE READ AT THAT INSTANT, while item 1's `M-12` and this part's two sentences that name the WRITE as the file's only toucher are read through that clause** (`docs/specs/storeroom-js/surface.md §2.11`; `docs/specs/storeroom-native-proposal-review.md §22.5` items 2 and 6).

**⟶ AMENDED 2026-10-11 — THE SET NOW CARRIES `15` MEMBERS AND THE AS-FILED HEADING ABOVE STANDS BYTE-FOR-BYTE**
(`A53`: ***"Add new failure code"***; `A54`: ***"Default name"***; `RCA-8(d)` ANNOTATE-BESIDE): **the member is
`FilePathUnreachable`, ranked `13` in the CONSTRUCTION GROUP, its trigger being a PROVIDED path that fails
the two-armed reachability test of `§7.1`'s amended step 3, and `ValueNotAdmitted` / `FileCommitFailed` MOVE
BY ONE RANK EACH with NO TRIGGER MOVING — so the set's own algebra closes as `11 + 2 + 1 + 1 = 15` ✓ and
every printed figure that names the set's size, its members' ranks or its generator's rows is reconciled at
the contract document's `§8.1`/`§8.2` and at this part's `§7.1`.** **NO OTHER BYTE OF THIS SECTION MOVES:
the table below is the as-filed set's own text and is read through this clause, and the amendment's own
`FilePathUnreachable` row lives at `contract.md §8.1` #13.**

**THE SET IS CLOSED.** *"Closed set of codes, with generated messages"* (`P: §11 · A14`). **Its membership
is this contract's to close** (`P: §11 · A14` prints the FORM and names one example; `R: §17.4` condition 5
assigns the membership to the contract; `DD-3`). **A failure whose code is outside this set is a contract
violation, not an extension of the set.**

| # | `code` | `rank` | The triggering state — the ONLY state that produces it |
| --- | --- | --- | --- |
| 1 | **`AddressMalformed`** | `1` | a segment outside `§1.5`'s domain (`L-1`); **an absent required argument** (`write` with no `tier`, `storeCreate` with `cfg.filePath` or `cfg.journalLength` absent, `rollback` with an absent `opId`); **an argument whose SHAPE is not the argument's shape at all — `null` or `undefined` for a `tier`, an `address`, an `opId`, a `filePath` or a `journalLength`** (`PAR-1`–`PAR-4`, `PAR-6`, `PAR-7`, `PAR-10`); **a blank (empty-string) `opId`** (`PAR-10`); a present construction argument outside its domain (`§7.1`) |
| 2 | **`AddressNotFound`** | `2` | the walk found no anchor at the segment's key (`L-3`); an integer segment aimed at the register (`L-INT-REG`); **a sub-floor address reaching the `secure` instance** (`DD-13`, which is `AddressNotFound` and not a floor-specific code) — **whose declared ANSWER SHAPE is stated and drivable at `§8.3`'s blindness clause: the same `status`, the same generated template, no floor-specific member and no distinguishing record** |
| 3 | **`LeafHasNoDownstream`** | `3` | the walk stood on a `leaf` with segments remaining (`L-4`) |
| 4 | **`TierNotFound`** | `4` | the walk found an anchor at the key but **no passed tier matches its tier** (`L-TIER`); a read whose passed tier set matches no version at an existing address (`DD-12`) |
| 5 | **`OutOfDomainTier`** | `5` | a tier argument outside `{file, mem, temp}` (`P: §14 · A29`); a write or delete whose tier is an array (any length); a non-string tier |
| 6 | **`ParentAnchorMonotonicityViolation`** | `6` | a write whose minted child anchor's tier would outrank its parent anchor's (`rank(child) > rank(parent)`; `F-6`) |
| 7 | **`ContainerKindConflict`** | `7` | a write whose value's kind contradicts the target container's kind (`F-4`; `P: §13 · A22`); **AND a write whose LAST SEGMENT's class contradicts the parent container's KEY DOMAIN — a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP`** (`store-model.md §1.3`'s key-domain arm; `store-model.md §1.5` items 2–3's NO-COERCION rule; `F-4`) — **both arms share this ONE member, exactly as the two DIRECTIONS of a value-kind conflict do (`DD-19`)** (`[T: the member's extended trigger, at this contract's third bounded amendment; no new member is minted for it | CONTRACT]`) |
| 8 | **`ReadTargetIsBranch`** | `8` | `readLiteral(address, tier?)` — the literal-only read form — resolves its target to a `branch` (`[T | DECLARED-DEFAULT]`: this contract's `read` returns the assembled JSON of a branch and **never** raises this code; the code exists because `read` also exposes the literal-only form `readLiteral`, which demands a leaf; its alternative — no literal-only form, and therefore one fewer reachable code — is priced at `DD-24`) |
| 9 | **`WriteParentNotLink`** | `9` | the resolved parent cannot hold children — the `leaf`-parent state (`F-5`); a write whose target is the empty address and therefore has no key to install under (`§3.2` item 4) |
| 10 | **`JournalOpUnknown`** | `10` | `rollback` called with an `opId` the instance's journal does not hold (`§6.4` `M-11`) |
| 11 | **`RollbackCompacted`** | `11` | a rollback whose scope includes at least one `compacted` entry (`§6.4` `M-6`) |
| 12 | **`ConstructionArgumentMissing`** | `12` | `storeCreate` called with `cfg.filePath` absent, or with `cfg.journalLength` absent (`§7.1`; `DD-17`) — **the construction-time failure, delivered before any instance exists** |
| 13 | **`ValueNotAdmitted`** | `13` | a write whose `value` is outside `§1.4`'s admitted set (`F-2`) — `null`, `undefined`, a function, a symbol, a `BigInt`, a non-finite number, a cyclic object, or a non-plain collection (`§1.4`) |
| 14 | **`FileCommitFailed`** | `14` | **a `file`-TIER WRITE'S FAILURE PATH** — **whichever of its three parts fails: the serialization of the `file` state, the file write at `cfg.filePath`, or the journal's own append** (`§7.2` item 4, which declares the three parts ONE failure, and `§7.2` item 3, which declares the two-step arm); **the caller receives THIS code after `A16`'s automatic journal rollback has run** (`P: §11 · A16`; `§6.4` `M-11`'s automatic-rollback clause). **A `mem`- or `temp`-tier write never produces it** (`§7.2` item 5: they perform no file I/O). **It is the member `§7.2` items 3–4 and `§5.9`'s interaction map require and that no earlier member carried** (`[T: the member's authoring at this contract's second bounded amendment, so the register's `file`-failure drive has a code to observe | CONTRACT]`) |

**THE COMPLEMENT, STATED SO THE SET'S CLOSURE IS NOT READ AS AN OMISSION** (`[T | NEGATIVE]`): **the
following are NOT failures and produce NO code** — an unoccupied key **on a write** (it mints,
`W-3`/`W-4`); an **empty address** (`§1.5` item 4); a **delete that removes nothing** (`DD-9`); an
**`unwatch` of an unknown handle** (`§6.5` item 6); **an unknown third key on the construction config**
(`§7.1`); a read of an **empty container** (it returns `{}` or `[]`, `DD-1`); a read at the address of a
**`branch`** through the ordinary `read` (it assembles, `R-2`/`R-3`); **a write at an occupied `(key, tier)`
pair** (`DD-11`).
**AND TWO CODES ARE DELIBERATELY ABSENT, NAMED SO THEIR ABSENCE IS A DECLARED RESULT:** there is **no
`BelowSecureFloor`** (`DD-13`: the instance does not see the address, so the answer is `AddressNotFound`),
and there is **no `PairOccupied`** (`DD-11`: the pair is purged and re-minted, `W-1`).
**AND TWO STATES ARE ON THE SET'S SIDE THAT ARE EASY TO READ AS COMPLEMENT MEMBERS, SAID PLAINLY:** **a
`file`-TIER WRITE'S COMMIT FAILURE IS A FAILURE and answers `FileCommitFailed`** (`§8.1` #15 — **RE-POINTED 2026-10-16: this cell's as-filed rank was `#14`; `FileCommitFailed` stands at `15` and `ValueNotAdmitted` holds `14`**; `DD-25`) —
*whether the serialization, the file write or the journal append is the part that failed*; **and a
`mem`/`temp`-tier write cannot produce it** (`§7.2` item 5). **A `file`-tier write that succeeds produces no
code at all** — committing the bytes is the arm's own success.
**ARITHMETIC, PRINTED WITH ITS TERMS:** **the set carries `14` members, ranked `1`…`14` (`14 = 14` ✓)**;
**`11` are reachable from the walk and the three address verbs, `1` (`ConstructionArgumentMissing`) from
construction, `1` (`ValueNotAdmitted`) from the value taxonomy, and `1` (`FileCommitFailed`) from the
`file` tier's commit path — `11 + 1 + 1 + 1 = 14` ✓** — and **every member has a trigger and every named
failure in this contract has a member**
(`[P: §11 · A14, §13 · A22, §14 · A29; T: the set's closure | CONTRACT + 1 CENSUS]`). **⟶ AMENDED
2026-10-11 — THE OPERATIVE ARITHMETIC, PRINTED WITH ITS TERMS (**⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: the `15` and the `11 + 2 + 1 + 1 = 15` below stand BYTE-FOR-BYTE and are read THROUGH this reading; the OPERATIVE ARITHMETIC is `16` members ranked `1`…`16` (`16 = 16` ✓), closing as `11 + 2 + 1 + 1 + 1 = 16` ✓ with `ConstraintListInvalid` the appended fifth term at rank `16` — `contract.md §8.1`'s dated clause of 2026-10-15**): `15` members ranked `1`…`15`
(`15 = 15` ✓), closing as `11 + 2 + 1 + 1 = 15` ✓ — `11` from the walk and the three address verbs
(UNMOVED) + `2` from CONSTRUCTION (`ConstructionArgumentMissing` `12`, `FilePathUnreachable` `13`) + `1`
(`ValueNotAdmitted`, now `14`) from the value taxonomy + `1` (`FileCommitFailed`, now `15`) from the `file`
tier's commit path — and the as-filed figures above stand byte-for-byte and are read through this clause
(`A53`; the contract document's `§8.1` carries the member table and `§8.2` its generator row;
`[T: the arithmetic's restatement, with every moved figure named | CENSUS]`).
**AND THE ONE MEMBER THE FIRST AMENDMENT'S SET DID NOT CARRY, STATED SO THE ADDITION IS NOT READ AS A
SILENT WIDENING:** **`FileCommitFailed` is the member `§7.2` items 3–4 needed and did not have** — a
`file`-tier write's failure path is *"passed back to the caller"* (`P: §11 · A16`) and `§5.9`'s
interaction map assigns *"the `file` commit's failure arm → `P-TP-9` (the `file`-tier failure's code and
message)"*, so **before this amendment the register's `S-FAILSET` drive had a `file`-failure observable
with NO code to carry it** (`[T: the closure's completion | CONTRACT]`). **`FileCommitFailed` is
DELIBERATELY NOT a family:** the serialization, the write and the journal append are **ONE** failure and
answer **ONE** code (`§7.2` item 4), exactly as both directions of a kind conflict answer
`ContainerKindConflict` (`DD-19`).

### §8.2 THE GENERATED-MESSAGE RULE, WITH WORKED EXAMPLES IN THE ARCHITECT'S OWN FORM

**EVERY MESSAGE IS GENERATED FROM ITS CODE AND THE FAILING TRIGGER'S ARGUMENTS — a message is never
hand-authored at a call site** (`P: §11 · A14`). **The architect's own example fixes the FORM:**

> `status: 'AddressNotFound', message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'"`

**THE GENERATOR'S SIGNATURE AND RULE** (`[T: this contract's generator, derived from the example's form | CONTRACT]`):

```
storeErrorMessage(code, args) → string

THE `args` SHAPE, DECLARED (the gate-3 report's own `§5.3` row on `storeErrorMessage(code, args)`, whose subject is *"the generator's `args` shape is undeclared"*): `args` is ONE record, `MessageArgs`, whose five members
are ALL OPTIONAL and each of which is present only when the trigger supplies it:
  MessageArgs = {
    segment:      string?,    // the failing segment's spelling (a string segment prints single-quoted; an
                              //   integer segment prints bare) — or the address's own spelling, joined
                              //   by '/', where the trigger fails on a whole address
    container:    string?,    // the container or node the mismatch was found in: '' for the register,
                              //   a dotted path such as 'window.tabs' otherwise
    keys:         string[]?,  // the container's keys, each printed single-quoted
    tiers:        Tier[]?,    // the tiers present, printed in contract.md §5.1's canonical order
    path:         string?     // the `file` tier's path, where the trigger is a `file`-tier commit
  }
AN ARGUMENT THE TEMPLATE NEEDS IS ALWAYS SUPPLIED BY THE TRIGGER (property (c) below); an argument the
trigger does not supply is ABSENT, never `null` and never the string "undefined".

The generated shape, in general:
  '<SEGMENT>' <mismatch clause> '<CONTAINER>', <available clause>

where
  <SEGMENT>         = `MessageArgs.segment`: a string segment is single-quoted ('a'); an integer
                      segment is bare (0); a non-segment argument is printed as its own value, single-quoted
  <CONTAINER>       = `MessageArgs.container`: the container or node the mismatch was found in, named as the
                      address's own spelling ('' for the register, or a dotted path such as 'window.tabs')
  <mismatch clause> = the code's own phrase (the table below)
  <available clause>= the code's own phrase (the table below), with
                      <CONTAINERSEGMENT> = **the container's OWN segment spelling — the last string-key
                      segment of the address at which the container stands, e.g. `tabs` for the container
                      reached by 'window.tabs'** — used as the SUBJECT of the available-keys clause, and
                      `keys` where the container has no segment spelling of its own (the REGISTER, whose
                      address is empty);
                      <KEYLIST> = the container's keys as single-quoted strings joined by ', ';
                      <TIERLIST> = the tiers present, in contract.md §5.1's canonical order, joined by ', ';
                      <DOMAINLIST> = the code's domain, joined by ', ';
                      <TRAITS> = the target's kind, one of leaf/branch, then the container kind if any
```

| `code` | `<mismatch clause>` | `<available clause>` |
| --- | --- | --- |
| `AddressMalformed` | `is not a legal address segment` (or, for an absent argument, `requires a <argument-name> argument`) | `segments are strings or non-negative integers` (or, for a construction argument, `a <argument-name> is required`) |
| `AddressNotFound` | `does not exist in` | **`<CONTAINERSEGMENT> are <KEYLIST>`** — **and when the container holds no keys, `it holds no keys`** |
| `LeafHasNoDownstream` | `cannot be walked through` | `it is a leaf` |
| `TierNotFound` | `is not a version of` | `versions are at <TIERLIST>` |
| `OutOfDomainTier` | `is not a tier` | `tiers are <DOMAINLIST>` (`file, mem, temp`) |
| `ParentAnchorMonotonicityViolation` | `outranks its parent anchor's tier` | `a child anchor may not be more persistent than its parent` |
| `ContainerKindConflict` | `does not match the container kind of` | `it holds a <map\|vector>` (plus `, keys are <KEYLIST>` when the container is a map) |
| `ReadTargetIsBranch` | `is a branch and not a leaf in` | `it holds a branch` |
| `WriteParentNotLink` | `cannot be written into` | `it holds a leaf and not a link` |
| `JournalOpUnknown` | `is not an operation this store's journal holds` | `ops are reached through the journal op a write returned` |
| `RollbackCompacted` | `is out of scope because it is compacted` | `compacted operations are out of scope` |
| `ConstructionArgumentMissing` | `requires a <argument-name> argument` | `a <argument-name> is required on store creation` |
| `ValueNotAdmitted` | `is not an admitted value` | `admitted values are strings, booleans, finite numbers, plain objects and arrays` |
| `FileCommitFailed` | `could not be committed to` | `the file write failed at '<PATH>'` (`MessageArgs.path`) |
| `ConstraintListInvalid` | `is not a valid constraint entry in` | `a constraint entry is an address and an id, and the address is a segment array` (`MessageArgs.container` prints the list's own name, `constraints`; `MessageArgs.segment` prints the failing ENTRY's `address` spelling, joined by '/' — and, where the failing element carries no address at all, the element's own position, printed bare — `MessageArgs.keys` prints the entry's members present, each single-quoted) |

**⟶ AMENDED 2026-10-15 — THE `RCA-9` PASS CARRIES THE SIXTEENTH MEMBER'S TABLE ROW HERE, ADDED AT THIS PART'S SECOND HOME OF THE GENERATOR'S RULE** (`RCA-8(d)` ANNOTATE-BESIDE: **every row above and every clause below stands BYTE-FOR-BYTE; the row's own text is `contract.md §8.2`'s, carried here because this part carries the generator's rule as well, and the ONE HOME of the row's clause is `docs/specs/storeroom-native/contract.md §8.2`**). **NO SLOT OF `MessageArgs` MOVES AND NO PHRASE OF AN EXISTING ROW MOVES** (`docs/specs/storeroom-native/contract.md §8.2` AS AMENDED 2026-10-15; `docs/specs/storeroom-native-proposal-review.md §22.5` item 6).

**THE `<available clause>`'s SUBJECT, SETTLED SO EXAMPLE (1) IS REPRODUCIBLE FROM THE RULE — the directory
defect the amendment closes:** **the architect's own example prints `tabs are 'doc1', 'searchbar'`, naming
the container's OWN SEGMENT rather than the word `keys`** — and the contract calls that example the one
that fixes the FORM. **The rule above therefore makes `<CONTAINERSEGMENT>` the subject** (`tabs` for the
container at `window.tabs`; `keys` only where the container is the register and has no segment spelling),
so **example (1) is now produced BY the rule and not beside it** — which is what *"each reproducible from
the rule above"* claims ([T: the reconciliation, taken in this contract's second bounded amendment |
CONTRACT]).

**WORKED EXAMPLES — three, in the architect's own form, each reproducible from the rule above** (the first is
the architect's own, printed at `P: §11 · A14`) (`[T: generated from §8.2's rule | CONTRACT]`):

```
// (1) the architect's own example — a key absent from a named container
{ status: 'AddressNotFound',
  message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'" }

// (2) the same code at an empty container — the <available clause>'s degenerate arm
read(['window', 'empty'])
{ status: 'AddressNotFound',
  message: "'empty' does not exist in 'window', it holds no keys" }

// (3) the container kind arm — an array written where a map stands
write(['window', 'tabs'], 'mem', [1, 2])
{ status: 'ContainerKindConflict',
  message: "[1,2] does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'" }
```

**THREE PROPERTIES OF THE GENERATOR, EACH CHECKABLE, AND `P-TP-9` IS THEIR HOME**
(`[T | CONTRACT]`): **(a) DETERMINISM** — the same `(code, args)` yields the same string, always;
**(b) COMPLETENESS** — every code in `§8.1` has a `<mismatch clause>` and an `<available clause>` in the
table above, so **no code can generate an empty or placeholder message**; **(c) NO UNSUBSTITUTED PLACEHOLDER
SURVIVES** — **no UNSUBSTITUTED placeholder token survives into a generated message: every `<…>` slot the
rule above names is SUBSTITUTED by the trigger's argument, so no fragment of the form `<SEGMENT>`,
`<CONTAINER>` or `<TIERLIST>` appears in a message, and no message is the empty string — AND A LEGITIMATE
VALUE THE TRIGGER SUPPLIES IS NOT A PLACEHOLDER: a container KEY legally named `null`, `undefined` or `TBD`,
or a key containing `<` or `>`, appears in the generated text because the trigger supplies it, and a
containment check over the raw characters is therefore NOT this property's rule.** **An argument the
template needs is always supplied by the trigger** (a code whose trigger supplies no keys uses the degenerate
arm, as example (2) shows) (`[T: property (c)'s narrowed form, at this contract's third bounded amendment —
the gate-4 adversarial pass's `S-9`/`CL-8` found the raw-character containment check unpinnable against a
legitimate key, and the claim is narrowed to *"no unsubstituted placeholder"* | CONTRACT]`).
`[P: §11 · A14; T: the generator's rule and its three properties | CONTRACT]`

### §8.3 The error's shape — the closed status-code carrier

**A failure is delivered by THROWING a `StoreError`** (`DD-24(b)`):

```
StoreError = {
  status:  Code,       // one of §8.1's 16 members, as a string token — EXACTLY the architect's own
                       // example's spelling: `status: 'AddressNotFound'`
                       //   ⟶ AMENDED 2026-10-11: the as-filed comment read `14`; the set carries 15
                       //   members (`FilePathUnreachable` at rank 13). The record's membership, its
                       //   spelling rule and its two-member closure are UNCHANGED.
                       //   ⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: the comment above read
                       //   `15`, BYTE-FOR-BYTE and read THROUGH this line; the operative figure is `16`,
                       //   `ConstraintListInvalid` the appended term at rank 16 (contract.md §8.1's
                       //   dated clause of 2026-10-15). The record's membership, its spelling rule and
                       //   its two-member closure REMAIN UNCHANGED by the re-spelling.
  message: string      // the generated message of §8.2
}
```

**`status` is the member's EXACT spelling from `§8.1`'s `code` column** — **not an enum index, not a
numeric id and not a lowercased or prefixed variant** (`P: §11 · A14`'s example prints
`status: 'AddressNotFound'`, and the spelling is the member's own; `[T | CONTRACT]`). **`message` is the
generated string, never a constant, never empty, and never carrying a placeholder** (`§8.2`).
**`status` and `message` are the record's ONLY TWO members** — **no `stack` is declared as a member, no
`cause` and no `data`** (`[T | DECLARED-DEFAULT]`; the alternative — a third member carrying the failing
segment and container structurally — is priced: it would duplicate `message`'s content into an
unruled second channel, and `A14` names a status and a message; reversal point: a bounded amendment).
**THE `secure` INSTANCE'S BLINDNESS IS DELIVERED THROUGH THIS SAME RECORD:** a sub-floor address is
`AddressNotFound` with a message generated exactly as for an absent address — **the record does not
distinguish, and that indistinguishability IS `A36`'s *"Not see it"*** (`DD-13`; `[P: §14 · A32, §15 · A36 |
CONTRACT]`).
`[P: §11 · A14, §14 · A32, §15 · A36; T: the record's closed member set | CONTRACT]`

---

## §10. The scope boundary's own clauses — the parks, the handoff, and the prohibited set

### §10.1 The two parks, stated as boundaries and not as implementations

| Park | What it holds | Its boundary clause, in one line |
| --- | --- | --- |
| **`docs/pending.md` `P-1` — THE JS INTEGRATION SET** | the realm · the builder/ABI and packaging path · the host handoff · the crossing of every value the store produces into JS (the returned op, the watched-address list) · the load path · the boundary's taxonomy crossing · the surface's ownership · the resolver's returned shape across a boundary · the module-supplied functions' crossing · the packaging · the consumer question · the event surface · the parameter rows' arity · the in-flight cycle's disposition · the `secure` instance's mechanism | **the store builds the store: the realm, the builder/ABI path, the packaging, the host handoff and every value's crossing into JS are DEFERRED and are NOT specified by this contract** |
| **`docs/pending.md` `P-3` — THE LISTENER IMPLEMENTATION** | the alerted list's ORDER · the attachment rule (by address or by identity) · the firing mechanism · the callback invocation · the JS-facing listener surface · a throwing body's disposition | **the store TRACKS listener registrations and RETURNS the watched-address list; the listener's order, attachment rule, firing, invocation surface and throw behaviour are NOT specified by this contract** |

**BOTH ARE `OPEN`, NEVER GREEN, owner the architect, positive revisit condition *the store passes its own
test suite*, surfaced for lifting by the supervisor under `P-2`; no integration or listener question is put
while either stands, a park read as a closure is a finding, and a pass that lifts a park fails**
(`R: §17.1`, `R: §17.4` condition 3; `[R: §6 · §17.1 · §17.4 | NEGATIVE]`).

**⟶ AMENDED 2026-10-11 — THE TWO BOUNDARY ROWS ABOVE AND THE CLAUSE UNDER THEM ARE RECONCILED TO THE AMENDMENT'S OPERATIVE STATE, AND NOT ONE OF THEIR SHIPPED SENTENCES IS DELETED** (`RCA-8(d)` ANNOTATE-BESIDE: **the table's two rows and the clause beneath them stand byte-for-byte, and THIS clause is the operative statement of each park's state**; `A44`; `A57`; `A58`; `docs/specs/storeroom-listeners-proposal.md` `§10`, `§18`, `§20`; `docs/pending.md`'s dated state of `P-1`/`P-3`; `[T: the two parks' operative state and the boundary between them | CONTRACT]`). **THE STATE THIS DECIDES, IN THREE PARTS:**

1. **`P-3` IS LIFTED, SO THE `P-3` ROW ABOVE PRINTS A PARK THAT NO LONGER STANDS.** **THE ROW READS** *"the alerted list's ORDER · the attachment rule … · the firing mechanism · the callback invocation · the JS-facing listener surface · a throwing body's disposition"* **with the boundary cell** *"the listener's order, attachment rule, firing, invocation surface and throw behaviour are NOT specified by this contract"*. **THE OPERATIVE STATE: the architect LIFTED `P-3` (`A44` — *"Yes, this is the listener unpark"*, filed at the proposal's `§10`), and the amendment SPECIFIED those subjects — `A57`'s listener record `{ address, handle }` bound BY ADDRESS, `A57`'s firing model (the store RETURNS the triggered handles and INVOKES NOTHING, so a throwing body has no subject inside this unit), `DD-37`'s declared order-insignificance, and `A58`'s supersession of the stopgap `watch` — so the `P-3` row's *"NOT specified by this contract"* is superseded by the amendment's `§6.5` items 8–13** (`write-and-read.md §6.5`; `docs/pending.md`'s `P-3`, whose record stands and is LIFTED, never deleted).
2. **`P-1` STANDS `OPEN` AND UNMOVED, AND THE ONE THING ITS ROW ABOVE NAMES THAT HAS MOVED IS THE WATCHED-ADDRESS SURFACE'S SPELLING: the row lists *"the watched-address list"* among the crossings `P-1` holds — which stands as a CROSSING — while `A58` supersedes the shipped `watch` surface and `WriteResult` now carries `op · watched · triggered` with `DeleteReceipt` gaining `triggered`, so what `P-1` holds is the CROSSING of a returned handle list and never a listener implementation** (`write-and-read.md §3.6`, `§4.4`, `§6.5`; the proposal's `§18` (2)).
3. **AND THE CONSTRAINT BELOW IS READ THROUGH BOTH PARTS, SO NO READING RUNS THE PARKS TOGETHER: *"no integration or listener question is put while either stands"* is DISCHARGED FOR THE LISTENER — the amendment put the listener questions and answered them — and STANDS FOR `P-1`, whose crossing is still deferred by `A8`/`A42`; *"a park read as a closure is a finding"* stands for both; and *"a pass that lifts a park fails"* is unmoved — `P-3`'s lift is the ARCHITECT'S ACT and not a pass's, and no pass may read this clause as a licence to lift `P-1`.** **NO ROW OF THIS SECTION IS DELETED, NO PARK IS LIFTED BY THIS CLAUSE, AND NO `APP`-GREEN IS CLAIMED** (`docs/pending.md` `P-2`; `R: §17.1`).

### §10.2 The handoff rule — the `HO-` rows and the prohibited set

**HOST INTEGRATION IS A HANDOFF AND NOT THIS UNIT'S WORK** (`P: §9 · A2`: *"integration into
Provident-Electron will be delegated to that project's agents"*), **and the client-side `file` floor
enforcement is the consuming project's duty** (`P: §14 · A32`; `DD-15`). **Consequences binding this
unit's later gates, each a prohibition with its citation** (`R: §17.4` condition 2) (`[R: §17.4 condition 2 | NEGATIVE]`):

| # | Prohibited | Its citation |
| --- | --- | --- |
| 1 | **any plan phase, red row, unit row or `crate/**` byte that wires the host** — a host-wiring step FAILS | `R: §17.4` condition 2 with `AR-36`/`AR-42`; `P: §10 · A8` |
| 2 | **any question about the JS integration put to the architect** | `P: §10 · A8`: *"Stop asking questions about the JS integration"* |
| 3 | **any listener question put to the architect while `P-3` stands** | `R: §17.1` constraint (iv) |
| 4 | **any byte under `../Provident-Electron/**` read as authority or written** — a finding against it is a `HO-` row in `docs/defects.md`, never a patch | `P: §11 · A9`; `A: docs/decisions.md`'s ACTIVE row *"DECIDED: THE ADJACENT PROJECT'S CORPUS IS READ-ONLY FOR THIS PROJECT, AND ITS TEXT IS NEVER EDITED FROM HERE"* |
| 5 | **any clause of this contract derived from the adjacent corpus** — a corpus-ground clause is a finding, and a disagreement with that corpus is intentional | `P: §11 · A9`; `R: §17.8`'s closing bound |
| 6 | **any `secure` tier, `secure` family, `secureAccess` gate, tombstone, purge-as-a-verb, `_value`, `listen`/`constrain`/`load` verb or a second register** — none of these names is a member of this unit's declared surface | `P: §9 · A4` (no fourth inbuilt tier); `L: §1` (a name the declaration does not carry is not a row); **`contract.md` §0**'s omitted-part row for `property-register` and `contract.md` §0.1 item 10(a) (no second register is authored for this unit) |
| 7 | **a red set authored against an unruled carrier, realm or boundary** — and this unit's REALM is still `P-1`'s | `R: §17.4` condition 4 with `AR-17`/`AR-30` |

**⟶ RECONCILED 2026-10-11 — ITEM `2` OF THE TABLE ABOVE IS THE RELOCATED TWIN OF THE CONTRACT DOCUMENT'S
`§10.2` ITEM `2`, AND THIS RELOCATED COPY NOW CARRIES THE SAME DATED CLAUSE ITS ORIGINAL CARRIES — IT WAS
THE SECOND COPY** (`RCA-8(d)` ANNOTATE-BESIDE: **every row of the prohibited-set table above, item `2`
included, stands byte-for-byte, and THIS clause is the operative statement of what THIS copy of item `2`
resolves to; the as-filed item's own words are re-emitted inside it, so nothing it read is lost and
`git diff` recovers the pre-pass bytes**; `P: §11 · A66`; `docs/specs/storeroom-js-proposal.md` `§11`, the
ruling's row; `docs/specs/storeroom-native/contract.md §10.2`'s own dated reconciliation clause;
`contract.md §0.1` item 10(a)'s relocation rule and `§3.6`'s cross-document citation form;
`[T: the relocated twin's reconciliation, so the two copies of item `2` agree and neither is left stale |
CROSS-REF]`).

**THE TWO COPIES, NAMED SO THE READING IS NOT TAKEN TWICE OVER:** **this part's `§10.2` IS the contract
document's `§10.2` RELOCATED WHOLE** (this part's scope-boundary table above, its `§10` row: *"`contract.md
§10` (its §10.1–§10.3), WHOLE, each keeping its `§`-numbers, its tables and its authority citations
unchanged"*), **so the prohibition table above and the contract document's table are ONE section's text at
two addresses, and `contract.md §10.2` is the ORIGINAL.** **THE CONTRACT DOCUMENT'S COPY CARRIES A DATED
`⟶ RECONCILED 2026-10-11` CLAUSE THAT SCOPES ITEM `2` TO THIS UNIT'S OWN BUILD AND SUPERSEDES IT FOR THE
SUCCESSOR JS UNIT (`P: §11 · A66` — the architect's own unpark, *"this is the unpark of the
integration"*).** **THE AS-FILED ITEM THIS CLAUSE RECONCILES READS** *"**any question about the JS
integration put to the architect**"*, cited to `P: §10 · A8`: *"Stop asking questions about the JS
integration"*. **THE OPERATIVE READING, CARRIED HERE ITEM FOR ITEM: THAT PROHIBITION IS SCOPED TO THIS
UNIT'S OWN BUILD — the deferral `A8` made (*"This is to build the store. Defer the integration until the
store passes testing"*) — AND IS SUPERSEDED FOR THE SUCCESSOR JS UNIT BY THE ARCHITECT'S OWN UNPARK
(`A66`), so `U-STOREROOM-JS`'s gate MAY PUT INTEGRATION QUESTIONS TO HIM.** **FOR NO OTHER PASS DOES THE
PROHIBITION MOVE: it stands for this unit and for every pass that is not the JS unit's own, the as-filed
cell standing as the store unit's own boundary.** **A READER WHO ARRIVES AT EITHER COPY THEREFORE READS
THE SAME RULE — which is what `contract.md §0.1` item 10(a)'s relocation rule requires: *a relocation is
not a re-derivation*, so a relocated span may not be left stale while its original moves, and a citation
to this copy is written with this part's path.** **NO ROW OF THIS SECTION IS DELETED, ADDED OR RENUMBERED
BY THIS CLAUSE; THE PROHIBITED SET STANDS AT THE `7` ROWS THE TABLE ABOVE PRINTS (`7 = 7` ✓); NO PARK IS
LIFTED BY IT (the `P-1` lift is the architect's act, `A66`, and `P-3`'s stands under `A44`); NO UNIT ROW IS
ADMITTED; AND NO COUNT OF ANY OTHER SURFACE MOVES — the typed register at `8` rows (`8 ≤ 8` ✓), the closed
fail set at `16` members (`11 + 2 + 1 + 1 + 1 = 16` ✓ — **⟶ RE-SPELLED 2026-10-15 BY THE GATE-4 FINDINGS PASS: this clause read `15` and `11 + 2 + 1 + 1 = 15`, BYTE-FOR-BYTE above and read THROUGH this reading; `contract.md §8.1`'s dated clause of 2026-10-15**), the `DD` table at `46` rows
(`24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46` ✓) and the `PAR` set at `14` rows (`12 + 1 + 1 = 14` ✓).**
`[P: §11 · A66; docs/specs/storeroom-js-proposal.md §11; contract.md §10.2's dated clause; T: the
relocated copy's reconciliation, with the as-filed item re-emitted | CROSS-REF]`

### §10.3 The candidate-property dispositions (`AR-9`, `F12`) — stated so none vanishes silently

**The gate's candidate-property sets (`IM-1`…`IM-10` · `SM-1`…`SM-10` · `TP-1`…`TP-7`, raised by gate-1
steps 1 and 2) must each be dispositioned in this contract, carried, rewritten with a ruling cited, or
declared out with a reason** (`R: §17.4` condition 5; `AR-9`; `F12`).
**HONEST BOUNDARY, STATED RATHER THAN PAPERED:** **the step reports' candidate id tables are NOT carried by
the artifacts this pass read** — the gate-1 step reports' candidate sets are named by id and count at
`R: §5.2` and `docs/specs/storeroom-native-implementation-plan.md §P.4` item 6, and **their row texts are
not in this workspace's readable records** (`[R: §7.3 (the eight stated gaps) | OBSERVATION]`).

**Therefore this contract disposes of the candidates in the only two ways available to it:** **each
candidate's SUBJECT is carried by a named property row, and the id-level mapping is OWED.**

| The candidate subject, as the gate records it | Its disposition HERE |
| --- | --- |
| the write→read round trip / isolation | **carried as `P-IM-1`** (`§5.2`) — `A3`'s primary acceptance layer |
| the residue of a failed write | **carried as `P-IM-2`** (`§5.3`) |
| the tier order, the shadow and the purge | **carried as `P-SM-4`** (`§5.4` — its tier-order half; the former `P-TP-5` merged into that surviving row at the contract's first bounded amendment, `contract.md §0.1` item 5) |
| the monotonic clause | **carried as `P-TP-6`** (`§5.6`) |
| the construction/boot property | **carried as `P-TP-7`** (`§5.7`) |
| the resolver's return and the fail set | **carried as `P-TP-9`** (`§5.9`) **with the resolver's non-copy half in `P-IM-1`'s second assertion — the copy discipline, `§4.1`; the reachability half is `P-IM-3`'s own row at `§5.5`** |
| the watcher and the journal's totality | **carried as `P-TP-8`** (`§5.8`) |
| any candidate whose subject is the SHADOW/DELETE interaction | **carried as `P-SM-4` + `P-TP-8`** (the `D-1`/`D-3` delete pair; `P-SM-4` is the surviving row the former `P-TP-5` merged into) — see `§5.9`'s interaction mapping |
| **the id-level mapping of `IM-1`…`IM-10`, `SM-1`…`SM-10`, `TP-1`…`TP-7` onto the eight rows above** | **OWED — owner the supervisor; positive revisit condition: the archival loop recovers the step reports' candidate tables, or gate 10 re-derives them from `archive/gate1/storeroom-native-review/{1-validity,2-critique}.md` and the mapping is landed as an amendment row** — **and no candidate id is invented here** |

`[R: §5.2, §7.3, §17.4 condition 5; T: the subject-level dispositions | CONTRACT + one OWED]`

---

## The parks' boundary block (unnumbered top-level; declared by this part's map row)

**This block's claims are the contract's, stated once and cited; every line below has its home in the
contract document.**

1. **`P-1` — THE JS INTEGRATION SET: the store builds the store; the realm, the builder/ABI path, the
   packaging, the host handoff, the crossing of every value the store produces into JS, the load path and the
   module-supplied functions' crossing are DEFERRED and are NOT specified by this contract**
   (`docs/pending.md` `P-1`; `P: §10 · A8`).
2. **`P-3` — THE LISTENER IMPLEMENTATION: the store TRACKS listener registrations and RETURNS the
   watched-address list; the listener's order, its attachment rule, its firing, the callback invocation, the
   JS-facing listener surface and a throwing body's disposition are NOT specified by this contract**
   (`docs/pending.md` `P-3`; `P: §16 · A38`).
3. **BOTH PARKS ARE `OPEN`, NEVER GREEN, OWNER THE ARCHITECT (the decider who lifts them), POSITIVE REVISIT
   CONDITION *THE STORE PASSES ITS OWN TEST SUITE*, with the supervisor named as the pass that surfaces the
   green under `P-2`; their constraints are: a park closes nothing; the subject may not be dropped silently;
   the store-side duties are NOT parked; no listener or integration question is put while either stands; and
   the lift is the architect's act, not a pass's** (`R: §6`, `R: §17.1`, `R: §17.4` condition 3).
4. **THE STORE-SIDE DUTIES THAT ARE *NOT* PARKED, NAMED SO THE BOUNDARY IS NOT MIS-READ:** **the
   registration surface (`watch`/`unwatch`), the watched-address list's PRODUCTION and its RETURN on a
   successful write, the descendant-inclusive selection rule, and the journal op's return with its content
   duty and its id** — these are this contract's clauses and enter gate 2 as carriage, never as questions
   (`R: §17.1`; `§6.2`, `§6.5`).
`[P: §10 · A8, §16 · A38; R: §6 · §17.1 · §17.4; T: the block's own citation set | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THE TWO PARKS' OPERATIVE STATE, WITH `P-3` LIFTED AND NOTHING DELETED** (`A44`;
`RCA-8(d)` ANNOTATE-BESIDE; **the block above stands byte-for-byte**). **`P-1` — THE JS INTEGRATION SET:
UNMOVED AND STILL `OPEN`**, with its owner, its positive revisit condition (*the store passes its own test
suite*) and its constraints exactly as item 1 and item 3 print them; **nothing in this amendment reaches
it**, and **a listener or integration question put while it stands is still a finding** (`P: §10 · A8`;
`R: §17.4` condition 3). **`P-3` — THE LISTENER IMPLEMENTATION: LIFTED BY THE ARCHITECT'S OWN ACT, `A44`**
(`docs/specs/storeroom-listeners-proposal.md §10`: ***"Yes, this is the listener unpark"***) — **so item 2's
boundary clause and item 4's *"the store-side duties that are NOT parked"* are the historical record of what
the park held, and the four subjects it held are now this directory's OPERATIVE CLAUSES at
`write-and-read.md §6.5`'s listener items: the ORDER (`DD-37`), the ATTACHMENT RULE (item 10 (b): BY
ADDRESS), the FIRING AND THE CALLBACK'S INVOCATION (item 10 (d)), and a THROWING BODY (item 10 (d) (i): NOT
a store state).** **A LIFT IS NOT A CLOSURE: `P-3` is not deleted, the park's record stands with its own
dated lift clause in `docs/pending.md`, and `P-1` remains the ONE park this section's clauses obey.**
**AND ONE CONSEQUENCE FOR THIS BLOCK'S OWN ITEM 4, STATED SO THE STORE-SIDE DUTIES ARE NOT READ AS UNCHANGED
WHERE THEY MOVED:** **the registration surface is now `listen`/`unlisten` (`A58`'s stopgap ruling supersedes
`watch`/`unwatch`), the returned record now carries the triggered HANDLES beside the watched ADDRESSES
(`§3.6`/`§4.4`; `DD-35`), the descendant-inclusive selection rule is UNMOVED (`§6.5` item 3; `DD-18`), and
the journal op's return with its content duty and its id is UNMOVED (`§6.2`)** — **so the item's own list
gains no new subject and loses none.**
`[P: §10 · A8 · A44, §16 · A38, §20 · A58; R: §6 · §17.1 · §17.4; T: the operative state, with the as-filed
block named and nothing deleted | CONTRACT]`

---

**END OF THE `seams-and-lifecycle` PART.** **Its relocated spans are `contract.md §7`, `contract.md §8` and
`contract.md §10`, whole, plus the two unnumbered top-level blocks this part's map row declares.** **This
part adds no claim, no code, no input, no `§`-number, no citation and no cell; the three spans' `§`-numbers
and authority citations are exactly those of the contract document, and a citation to any of them is written
with this part's path** (`docs/specs/storeroom-native/seams-and-lifecycle.md §8.1`, etc.) — *a bare `§n`
across documents is not an edge* (`docs/specs/storeroom-native/contract.md` §3.6, which states the
cross-document citation form; §0.1 item 10(a); `[T: contract.md §3.6 and §0.1 item 10(a) | CROSS-REF]`).
