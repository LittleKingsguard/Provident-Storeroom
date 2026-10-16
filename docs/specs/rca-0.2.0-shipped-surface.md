# RCA — how `provident-storeroom@0.2.0` was ruled a `MINOR` on declarations whose engine the pack does not carry

**Filed 2026-10-16 by `role_spec_writer`, on the architect's question, put bluntly:** *how was a package allowed
to ship as a `MINOR` without the feature that was the point of the minor?*
**Status: ROOT CAUSE FOUND and named link by link, each link at its own evidence path and line.** **This file
ADMITS NOTHING, MOVES NO CLAUSE, MINTS NO ROW, LIFTS NO PARK, CLOSES NO DEFECT AND CLAIMS NO GREEN.** **Its
`§7` proposals are PROPOSALS and are not law until an architect's ruling lands them as ACTIVE rows.**
**Unit:** the release act `0.2.0` — `U-STOREROOM-PUBLISH`'s release discipline, read at the amendment that unit
never landed (`RCA-9`, the file-tier save) and at `U-STOREROOM-CONSTRAINTS`'s filing.
**Layers:** `LIVE/INSTALL` (the published bytes), `ENVELOPE/PURE` (the declaration corpus), and the release act
itself. **`APP` layer `NONE`; no `APP`-green exists, is claimed or becomes available.**

**This document is written against this project's own release discipline and it flatters no pass.** **Where a
gate did its job it says so; where a gate reported a green it could not earn, it names the gate and the
sentence.** **It writes no byte outside itself:** `docs/decisions.md`, its parts, `docs/defects.md`,
`docs/next-steps.md`, `docs/pending.md`, every other `docs/specs/**` file, `bindings/**`, `src/**` and
`scripts/**` are READ-ONLY to this pass. **Where this file finds something that needs changing elsewhere it
NAMES it at `§8` and changes nothing** — `RCA-13`'s one-delta discipline and this pass's own wall.

---

## §1. WHAT THE QUESTION ASKS, AND WHAT THE ANSWER IS

### §1.1 The question, restated so it is answerable

**The version `0.2.0` was ruled `MINOR` on 2026-10-15.** **A `MINOR` promises a consumer that the declared
surface GREW.** **The architect asks how that ruling was available when the feature the minor was about — the
constraint engine — does not travel with the pack.** **The question is therefore not "why is the kernel
missing" and it is not "who is at fault": it is WHAT MECHANISM PERMITTED A CLASS RULING TO COUNT A SURFACE THE
RELEASE COULD NOT REACH, AND WHICH GATE WOULD HAVE HAD TO ASK.**

### §1.2 The verdict, in one paragraph

**THE CLASS WAS RULED ON DECLARATIONS, AND THREE OF THE FOUR DECLARATIONS IT COUNTED ARE DECLARATIONS OF A
CONSTRAINT SURFACE WHOSE ENGINE IS NOT IN THE PUBLISHED PACK — AND NO GATE OF THIS PROJECT ASKS WHETHER A
SURFACE THE VERSION CLAIMS IS REACHABLE FROM THE PACK.** **That is the root cause, and it is one sentence: a
release class was decided by counting members of a DECLARATION, and no gate converts a declaration into a
question about an INSTALL.** **Every link below is a link in THAT chain, and no link is a mistake of
arithmetic, of citation or of intent.**

### §1.3 What this is NOT, said first because it governs every clause after it

1. **IT IS NOT A `0.2.0` REGRESSION, AND THE RCA SAYS SO BEFORE IT CRITICISES ANYTHING.** **No version on the
   registry ships the kernel.** `0.0.0-stage` and `0.1.0`–`0.1.3` carry the same main-package pack as `0.2.0`,
   and the pack's allowlist predates the constraint work (`docs/specs/storeroom-publish/distribution.md §2.1`
   item 1 — the allowlist; `docs/pending.md`'s `G-13`, 2026-10-15, whose revisiting condition is unmoved).
   **The kernel has never been a published byte on any version, so the `0.2.0` release neither removed it nor
   degraded anything.**
2. **IT IS NOT A CLAIM THAT ANYTHING WAS HIDDEN AND NOT A CLAIM THAT ANY PUBLISHED BYTE IS CORRUPT.** **The
   released bytes load, resolve and answer.** The installed main package's entry resolved, its version guard
   passed character for character, and a `storeCreate` returned an instance
   (`scratch/live/install-0.2.0/0.2.0-live-install-report.md` `§1.2`–`§2.4`).
3. **IT IS NOT A CLAIM THAT THE DECLARATIONS SHOULD NOT HAVE SHIPPED.** **`constraints` and the `settle` seam
   are DECLARATIONS THIS PROJECT MEANT TO MAKE, and `settle` is the seam the kernel's own contract names as the
   one member it calls and the entry implements** (`docs/specs/storeroom-js/surface.md §2.4` item 9, 2026-10-15;
   `docs/decisions.md` `A116` (D1)/(D2)). **A declaration the pack carries and an engine the pack does not are
   two facts, and this release made both lawful; what was never asked is the THIRD fact between them — whether
   the pack can reach the surface the version claims.**
4. **IT IS NOT A CLAIM THAT THE ENGINE SHOULD HAVE SHIPPED NOW.** `U-STOREROOM-CONSTRAINTS` is FILED and its
   contract is the only specification of the behaviour (`docs/specs/storeroom-constraints/contract.md`); its
   publish status was parked by the architect's own act and that park is not lifted by this file
   (`docs/pending.md` `G-13`).

---

## §2. THE FACTS, VERIFIED AT THE BYTES BY THIS PASS

**Every row below was re-read by this pass at the path printed; a row marked `[re-verified]` is one this wall
could reach and did reach.** **A row marked `[carried]` is a fact stated at a path this wall could reach but
whose bytes lie outside it (a registry response, a scratch artefact of another pass) — it is cited at its
recorded home and is NOT re-measured here.**

| # | The fact | The evidence, at its own path and line | status |
| --- | --- | --- | --- |
| 1 | **The installed main package ships `5` paths** — `index.mjs` · `index.d.ts` · `README.md` · `LICENSE` · `package.json` | `scratch/live/install-0.2.0/node_modules/provident-storeroom/**` (directory walk) | `[re-verified]` |
| 2 | **The installed platform package ships `4`** — `LICENSE` · `package.json` · `README.md` · `storeroom_js_binding.node` | `scratch/live/install-0.2.0/node_modules/@auspicion/provident-storeroom-js-linux-x64-gnu/**` | `[re-verified]` |
| 3 | **The module namespace is exactly `8` exports** — `delete` · `listen` · `read` · `readLiteral` · `rollback` · `storeCreate` · `unlisten` · `write` | installed `index.mjs`, its eight `export` sites (`:1456` `storeCreate` · `:1516` `read` · `:1527` `readLiteral` · `:1571` `write` · `:1788` `rollback` · `:1801` `listen` · `:1812` `unlisten` · `:2350` the `deleteOp as delete` re-export) | `[re-verified]` |
| 4 | **No file matching `*kernel*` is anywhere in the installed tree** — main package, platform package or either manifest | the same two directory walks, plus the installed `package.json`'s `files` and `exports` blocks | `[re-verified]` |
| 5 | **The installed `index.mjs` DOES carry `settle`** — `21` occurrences: the member's own definition, the seam's own clause, the adoption marker and the `Symbol` it sets | installed `index.mjs` `:32`, `:97`, `:125`, `:1451`–`1452`, `:1503`–`1512`, `:1632`, `:1640`, `:1873`, `:1896`–`1961` | `[re-verified]` |
| 5-bis | **The installed `index.mjs` DOES carry `constraints`** — `14` occurrences: the fourth `cfg` key, its class walk, its element walk, and the doc comments that name them | installed `index.mjs` `:1155`, `:1164`–`1170`, `:1173`, `:1234`, `:1256`, `:1265`, `:1270` | `[re-verified]` |
| 6 | **The installed `index.d.ts` declares the four-member instance and the `settle` member with its argument types** (`AttemptRef`, `CommitRecord`), and the `constraints` key beside the other three `cfg` keys | installed `index.d.ts` `:11`, `:14`, `:30`, `:72`, `:104`–`109`, `:254`–`290`, `:297`–`343` | `[re-verified]` |
| 7 | **The declared allowlist is three entries and the artefact carries a fourth and a fifth** — the manifest declares `index.mjs` · `README.md` · `index.d.ts`; npm adds `package.json` always and the assembly step copies `LICENSE` | `bindings/js/package.json` `files` (`:33`–`37`); `docs/specs/storeroom-publish/distribution.md §2.1` item 1 (the allowlist) and item 5 (the licence copy is NOT an allowlist entry, and IS carried) | `[re-verified]` |
| 8 | **THE ENGINE IS SOURCE-ONLY AND OUTSIDE THE PACK.** `bindings/js/src/constraint-kernel.mjs` is `1,311` lines and exports exactly five items — `register` · `commit` · `runAttempt` · `log` · `report` | the file (`:331`, `:376`, `:511`, `:1285`, `:1297`; total `1311`) | `[re-verified]` |
| 9 | **The list the shipped key declares is never persisted.** `src/store.rs:623` builds the pairs; `:689`–`695` consumes them **inside `if loaded.is_some()`** — a load-instant validation of each address against the image that was loaded, before returning the instance | `src/store.rs` `:615`–`696` | `[re-verified]` |
| 10 | **The shipped entry's own `constraints` walk is a SHAPE walk** — the list's outside forms and each element's `{ address, id }` shape — and nothing else; the code and the message stay the store's | installed `index.mjs` `:1155`–`1184` | `[re-verified]` |
| 11 | **The guide states the release's own model in its own words:** *"it declares a list, not an engine … the evaluation the key feeds is a caller-side concern"* | `docs/guides/package-use.md` `:855`, naming `docs/specs/storeroom-js/surface.md §2.11` and `§2.4` item 9 | `[re-verified]` |
| 12 | **The `MINOR` row's own words, and the four declarations the amendment's reading counts** | `docs/specs/storeroom-publish/release.md` `:222` (the row) and `:228`–`:231` (the amendment's reading) | `[re-verified]` |
| 13 | **The filed row that reclassified the reachability question, and the `A112` text it quotes** | `docs/specs/storeroom-native-proposal-review.md` `:549` (row `3`, *"WHERE THE KERNEL SITS, AND WHETHER THE PACKAGE CAN REACH IT"*, *"A CLAUSE COLLISION, NOT A GAP"*, `RULING: OPEN → §19.5 Q4`); `docs/decisions.md` `A112` (2) and `A113` (D4) | `[re-verified]` |
| 14 | **The battery's own record of what it reached and what its green covers** | `scratch/live/install-0.2.0/0.2.0-live-install-report.md` `:108` (the runner unedited), `:113` (the kernel side a symlink), `:123` (the kernel is not a published artefact; reached unedited from the checkout so the driver's API is available), `:124` (`RCA-12` layer `ADDITIVE / LIVE ASSEMBLED PACKAGE`), `:353` (the kernel side is not an installed byte) | `[carried]` |
| 15 | **The doc-review gate's reconciliation, and the downstream review it fed** | `docs/defects.md` `DEF-2026-10-16-J` (the row, `FIXED 2026-10-16`); `docs/guides/package-use.md` `:908` (the two-layer clause, `★ ADDED 2026-10-16`) and `:855`; the corrected pins clause at `:162` | `[re-verified]` |
| 16 | **The park whose revisit condition this release moved past without lifting it** | `docs/pending.md` `G-13` (`:194`–`:202`), re-scoped by `docs/specs/storeroom-publish/release.md` `:232` | `[re-verified]` |

**A CENSUS NOTE, PRINTED SO NO FIGURE IS READ AS MORE THAN IT IS.** **The `21` and `14` of rows `5` and
`5-bis` are
OCCURRENCE COUNTS OF A TOKEN IN ONE FILE, not members, not clauses and not declarations.** **They are printed
because they measure one thing exactly: THE PACK'S ENTRY KNOWS THE WORD `settle` AND THE WORD `constraints`
WITHOUT EITHER WORD'S ENGINE BEING PRESENT.** **No figure in this table is a member count, a clause count or a
census of this project's register.**

---

## §3. THE CAUSAL CHAIN, LINK BY LINK, EACH WITH ITS GATE

**FOUR LINKS, EACH WITH THE GATE THAT OWNED IT AND WHAT THAT GATE DID WITH IT.** **The gates are read in the
project's own numbering, at their own records; where a link was owned by no gate at all, the clause says so in
those words.**

### §3.1 Link one — the class table's wording, which the amendment then applied correctly — `publish` unit, gate 2/3

1. **WHAT THE TABLE SAYS.** `docs/specs/storeroom-publish/release.md` `:222`: the `MINOR` row reads *"a member
   ADDED to the declared surface, or a target ADDED to the matrix"*, and it requires *"a BOUNDED AMENDMENT of
   `docs/specs/storeroom-publish/` FIRST"*. **THE ROW IS THIS UNIT'S OWN DECLARED AND REVERSIBLE DEFAULT**
   (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-9`).
2. **WHAT THE AMENDMENT ADDED, NAMED ONE BY ONE** (`release.md` `:228`–`:231`): **`write`'s FIFTH ARGUMENT**,
   the optional `commit`, declared last (`docs/specs/storeroom-js/surface.md §2.2`); **`storeCreate(cfg)`'s
   FOURTH DECLARED KEY**, the constraint list (`docs/specs/storeroom-js/surface.md §2.1`'s dated clause and its
   `cfg` block); **the closed set's SIXTEENTH MEMBER** (`ConstraintListInvalid`, `docs/specs/storeroom-native/contract.md §8.1` rank `#16` — the set's five-term algebra reading
`11 + 2 + 1 + 1 + 1 = 16` ✓, `FileCommitFailed` at `#15` and `FilePathUnreachable` at `#13` unmoved); and **the instance's FOURTH MEMBER, `settle`** (`docs/specs/storeroom-js/surface.md §2.4`
   item 9).
3. **THE READING IS CORRECT AT ITS OWN TERMS, AND IT SAYS SO ITSELF.** **Three of the four are
   constraint-surface declarations, and the fourth is the seam the engine would call.** **The amendment's own
   clause separates them properly: the sixteenth member is NOT a package bump — *"a change to the STORE'S OWN
   CLOSED SET'S MEMBERSHIP"* is the table's fourth row and *"NOT A PACKAGE BUMP BY ITSELF"* — while the two
   surface additions ARE members of the declared surface** (`release.md` `:229`). **THE ARITHMETIC IS SOUND.**
4. **WHAT THE GATE DID WITH IT.** **The publish unit's gate consumed the change, applied the row as written,
   landed the required bounded amendment of its own directory, and recorded `B2a` re-entered**
   (`release.md` `:231`; `docs/specs/storeroom-constraints/implementation-plan.md`'s declared edit-scope row
   `8`, whose cell read *"ONLY IF a pass reads a kernel member as a declared-surface member under `PUB-DD-9`'s
   `MINOR` row"* and *"is `NOT taken here`"*). **AND IT RECORDED THE ONE THING THAT MATTERS HERE, IN ITS OWN
   WORDS: the reading is taken *"at a DIFFERENT COORDINATE than that cell anticipated — the members this
   amendment adds to the declared surface are the STORE BINDING'S (`commit` on `write`, `constraints` on
   `storeCreate`) and NOT a KERNEL member — so the cell's premise is met at the store's side"*, and the same
   clause's closing sentence reads *"the kernel remains a library member and NOT a published surface member"*.** **So the gate SAW the distinction and
   wrote it down.**
5. **WHAT NO GATE DID AT THIS LINK.** **IT NEVER ASKED WHETHER THE SURFACE IT WAS COUNTING COULD BE REACHED
   FROM THE PACK.** **`B2a` is an edit pass over a spec directory; the class table's own criterion is
   membership of *"the declared surface"*; and no clause of `docs/specs/storeroom-publish/**` defines that
   surface as *the set a consumer's install can reach*.** **THE ROW'S WORD *"DECLARED"* IS THE HOLE: what is
   declared is what a document says, and what a pack carries is what `files` names — and the two were never
   required to agree.** **AND THE CLAUSE ABOVE IS ITS OWN PROOF THAT THE DISTINCTION WAS AVAILABLE TO THE PASS:
   it separates the STORE BINDING'S members from the KERNEL'S membership in one sentence, and then counts the
   binding's members as growth — which is right — WITHOUT ASKING WHAT IMPLEMENTS THEM.**

### §3.2 Link two — the amendment added declarations rather than a machine — `RCA-9`, gate 2

1. **WHAT SHIPPED, AND WHAT DID NOT.** **The package ships the KEY and the SEAM: `constraints` on
   `storeCreate`, `settle` on the instance.** **The package does not ship the list's persistence, and it does
   not ship an engine.** **The list is validated at two instants and both answers are the store's own code**
   (`src/store.rs:623`, `:689`–`:695`; `docs/specs/storeroom-js/surface.md §2.1`'s dated clause;
   `docs/decisions.md` `A118`, corrected by the architect's own sentence: *"The list is not persisted, the
   importing application will provide the constraints on startup from its own information."*). **And the
   engine — `register`, `commit`, `runAttempt`, `log`, `report` — lives at `bindings/js/src/constraint-kernel.mjs`,
   a file of `1,311` lines that is outside the pack's `files` list and is not a package of its own**
   (`bindings/js/package.json` `:33`–`37`; the live report's own `:123`).
2. **THE AMENDMENT WAS HONEST ABOUT THIS AND THE HONESTY IS ON THE RECORD.** **`release.md` `:232` re-scopes
   one cell of `G-13` and says, in terms, that the TERMINAL ARM is the published binding's `settle` seam and
   now has its own act — *"so a published install's `settle` seam DOES perform a `file`-tier commit, WHILE THE
   CONSTRAINTS THAT FIRE IT STILL DO NOT TRAVEL WITH THE ARTEFACT"*.** **AND IT STATES ITS CONSEQUENCE: *"no
   pass may report a published-install green for any constraint limb"*.**
3. **SO WHAT WENT WRONG AT THIS LINK IS NOT THE AMENDMENT.** **The amendment declared a seam in the one place
   its own contract said the seam belonged, moved no allowlist cell, and printed the limitation.
   `A116` (D3) refused by name every widening that would have made the engine a surface member** (a sixth
   kernel item, a second package, a ninth store-namespace member, a store value the kernel holds, a
   discriminator on the handle; **the published `files` allowlist UNMOVED**).
4. **WHAT WENT WRONG IS THE CLASS READ ACROSS IT.** **Three separate declarations of ONE constraint surface
   were counted as a MINOR's growth, and the fact that the surface's engine was outside the pack — the
   limitation the same amendment printed — was not read back into the class rationale.** **A class criterion
   that counts members of a declaration will always count a member whose implementer is on the other side of
   a wall the release cannot cross.**

### §3.3 Link three — the gap was filed, measured, and reclassified as a clause collision — `constraints` unit, gate 1 record; decision landed by `RCA-9`'s pass

1. **THE ROW, WHOLE.** `docs/specs/storeroom-native-proposal-review.md` `:549` is a filed table row headed
   *"WHERE THE KERNEL SITS, AND WHETHER THE PACKAGE CAN REACH IT"*. **Its answer opens: *"THE `A112` BLOCKER
   IS UNTOUCHED BY `A-4`, AND IT IS A CLAUSE COLLISION, NOT A GAP"*.** **It then quotes `A112`'s own
   measurement, verbatim: *"the entry cannot learn whether a constraint stands owed (the kernel's five
   exports carry no such read) and importing the kern…"*** — **and its own words complete the clause:
   importing the kernel *"collides with `P-PUB-7`'s three-entry publish allowlist and the `26` publish drives
   that stage `index.mjs` alone"*.** **Its ruling cell reads `OPEN → §19.5 Q4`, and the row's own last sentence
   keeps alive a path it does NOT claim: *"a declared seam by which the kernel reaches the package WITHOUT an
   entry-side import of the kernel module."***
2. **WHAT THE RECLASSIFICATION DID.** **It took a question of REACHABILITY — can the package get to the
   engine, and if not, what does that mean for a release? — and re-read it as a TENSION BETWEEN TWO CLAUSES:
   the entry cannot learn whether a constraint stands owed, and importing the kernel collides with the
   publish allowlist.** **Both halves are true.** **But a clause collision is a question about what a
   DOCUMENT should say; a reachability gap is a question about what a RELEASE may claim.** **By moving the
   question into the first class, the row made it a spec-side question — and the spec side answered it
   correctly, at `A115`/`A116`, by naming the seam.** **THE RELEASE QUESTION WAS ANSWERED BY NOBODY, because by
   then there was no longer a release question on the table.**
3. **WHY THAT WAS REASONABLE TO THE PASS THAT MADE IT, AND THE RCA SAYS SO.** **Three reasons, each real:**
   **(a) THE ARCHITECT HAD ALREADY PARKED THE PUBLISH STATUS, on his own information.** `docs/pending.md`
   `G-13` records the park as *"the architect's decision"* and *"the decided model and not a defect"* — the
   kernel *"travels with the app's own source"*, and the park's revisit condition (a) is *"the architect rules
   that the constraint engine is to be a published surface member"*. **A pass reading that park is reading a
   settled question and is right to treat it as settled.** **(b) THE QUESTION THAT WAS LIVE WAS A SEMANTIC
   ONE, and the live one really was the ordering instant**: *"the entry cannot learn whether a constraint
   stands owed … so the channel is `BLOCKED-ON-SEMANTICS` until the architect names it"* (`A112` (2)). **That
   is a question about an instant, and it was answered as an instant** (`A116`; `surface.md §2.4` item 9).
   **(c) THE PACK HAD BEEN DECLARED BINARY-FREE BY DESIGN** — *"NO BINARY SHIPS, AT ANY KEY, ON ANY TARGET"*
   (`docs/specs/storeroom-publish/distribution.md §2.1` item 2) — **so a pass could read the engine's absence
   as the same declared limitation as the excluded `build/Release` path, and not as a second thing.**
4. **WHAT IT COST, AND THE COST IS EXACTLY STATED.** **The reachability question was answered as a tension
   between two clauses and WAS NEVER WIRED TO A GATE'S BLOCKING CONDITION.** **There is no gate in this
   project whose failure arm reads *"a declared surface is unreachable from the pack"*.** **So the same
   question that would have caught the class ruling was, at the moment the class was ruled, filed as a
   `§19.5` question with an `OPEN` ruling and a hand-off row (`docs/next-steps.md` `N7`) — a document, not a
   blocker.**
5. **AND `N7` STILL STANDS `OPEN`, AND IT CARRIED THE FINDING WITHOUT CARRYING IT INTO A GATE.**
   **`docs/next-steps.md` `N7` reads `OPEN — SPEC-FIX-FIRST`; the seam's landing (`A116`;
   `docs/specs/storeroom-js/surface.md §2.4` item 9) discharged the ORDERING half of that row, and the `SEAM
   POINTER` at `docs/specs/storeroom-constraints/live-greens-a112.md` reads the cells that named `N7` through
   that ruling.** **The reachability half did not close with it, and it was never re-entered at a release act.**
   **The row is explicit, and this file quotes it because the quotes are the evidence:**
   - **`N7`'s `THE PUBLISH PIN IS REAL IN SUBSTANCE, OVERSTATED IN FIGURE` bullet: the pin is
     `bindings/js/package.json`'s `files`, *"three entries"*, asserted in `publish.test.mjs`, with
     `docs/specs/storeroom-publish/contract.md §2.1` item 1 (*"and NOTHING ELSE"*) and the one-entry
     `exports` — and *"`src/**` reaches no consumer today"*.** **THE BLOCKER WAS STATED AS A PUBLISH FACT IN A
     `next-steps` ROW, IN THE SAME PASS THAT RE-SCOPED IT AND BEFORE THE CLASS WAS RULED.**
   - **`N7`'s `MINIMUM LAWFUL CHANGE SET`: the publish work — `files` · `§2.1` item 1 · `PUB-DD-1` · the
     staging fixtures — is *"only if the ordering must hold in a published install"*, *"without which the law
     and its cells cannot be exercised outside the checkout"*; and its `DECOMPOSITION` names that work *"the
     genuinely separable remainder"*, belonging to *"a publish-owned unit"*.**
   - **`N7`'s closing line: *"What must not happen: the row closing green on a code change while the published
     package still cannot run the ordering — `N7` is the row where this project would first claim an
     `APP`-green, and none exists."***
6. **SO THE HONEST ACCOUNTING OF THIS LINK IS NOT THAT THE FINDING WAS LOST. IT IS THAT THE FINDING WAS
   PRESERVED IN THE ONE PLACE A RELEASE ACT DOES NOT READ.** **No rule wires a `next-steps` row's
   publish-shaped remainder to the publish gate's own condition list, and no rule makes a version class wait on
   an open row that names the artefact.** **`N7` says in terms that the published package cannot run the
   ordering and that the publish work is separable; the class ruling of 2026-10-15 read the surface's
   declarations and did not read `N7`.**

### §3.4 Link four — the battery that could have caught it recorded the split and went green — gate 6

1. **THE GATE.** **The `LIVE/INSTALL` battery for the published `0.2.0` bytes is `§4.2` act 5 of the publish
   unit's plan** (`scratch/live/install-0.2.0/0.2.0-live-install-report.md` `:1`–`:8`: role
   `role_live_scenario_runner`, act *"install the published bytes and exercise the unit's scenarios against
   what a consumer actually gets"*). **In the gate sequence of the file-tier-save amendment this is the
   live-battery gate — gate 6 — and the supervisor's own failure belongs here.**
2. **WHAT IT RESOLVED, IN ITS OWN WORDS, AND THE SENTENCE IS A DISCLOSURE RATHER THAN AN OVERSIGHT.** **The
   battery's drive directory symlinks the kernel side to the checkout** (`:113`: `src/ -> ../../../../../bindings/js/src [ the kernel side, symlink, unedited ]`), **and it says why** (`:123`): *"The kernel … is not a published artefact — it is not in the main package's tarball and not a package of its own. The scenarios' `register`/`commit`/`runAttempt`/`log`/`report` calls go through it, so the run needs it. It is taken unedited; and its own `import … from 'provident-storeroom'` is made to resolve to the installed package."* **And it bounds its own claim** (`:124`): *"This battery is `ADDITIVE / LIVE ASSEMBLED PACKAGE`. The kernel side is carried for reachability of the driver's own API; everything the unit's change touches … is exercised through the installed main package's `index.mjs` and the installed platform artefact."* **And `:353` lists it plainly among the things that are not installed bytes.**
3. **WHAT ITS GREEN COVERS, AND WHAT IT DOES NOT.** **Covered, and covered properly: the INSTALLED main
   package's rung-one resolution, its versions, its integrity against the registry, the entry's version guard
   at every boot, and the greens set's cells as driven — including `FTS-12.1`'s member set
   `["off","on","register","settle"]` and `FTS-12.3`'s *"the kernel entry carries exactly its five declared
   items"*** (`:47`–`:51`, `:98`–`:100`, `:162`, `:301`). **NOT covered: any cell that would have asked whether
   a CONSUMER'S INSTALL — main package plus platform artefact, no checkout, no symlink — can reach the
   constraint surface at all.** **The battery never ran that question, because the question was not one of
   its cells, and its resolution had already decided the answer by supplying the missing module.**
4. **THE PRECISE FAILURE, AND IT IS THE SUPERVISOR'S.** **GATE 6 RAN AND REPORTED GREEN WITH A RESOLUTION
   THAT COULD NOT TEST THE CLAIM, AND NO RULE FORBADE IT.** **There was no rule that a battery asserting
   anything about the package must run on installed bytes alone; there was no rule that reaching the checkout
   makes a battery a different layer; and there was no column, in any index, that would have let the gate read
   at a glance that two of the four members the release was counting are implemented by a file the install
   does not contain.** **A battery is evidence for what it drove and for nothing else — and this one's own
   record is scrupulous about that, which is exactly why its green was never disowned afterwards.**
5. **AND THE ONE THING THIS LINK PROVES, STATED FOR THE RULE THAT FOLLOWS FROM IT.** **A green that resolves a
   claim by adding an unpublished module to its own resolution can still read `PASS`, and every downstream
   reader will read the `PASS` and not the parenthetical.** **The disclosure is not a control.**

### §3.5 Link five — the doc-review gate amplified it — gate 8

1. **WHAT GATE 8 DID, AND IT DID ITS OWN JOB CORRECTLY.** **The gate-8 documentation review reconciled the
   guide's prose to `0.2.0`.** **That act is the act that made a reader believe the release does what the
   version implies**, and it is the correct act: a consumer guide for `0.2.0` must speak about `0.2.0`.
2. **AND ITS OWN REVIEW ROW WAS STILL STALE AT THIS RELEASE.** **The downstream review caught
   `docs/guides/package-use.md` `:162`'s pins clause still reading `0.1.3` at this release; it was corrected
   and the whole episode filed as `DEF-2026-10-16-J`** — whose own lesson is printed at the row's foot: *"the
   historical/live discriminator is THE TENSE OF THE CLAIM, not the version figure inside it."*
3. **AND THAT REVIEW READ THE TWO CLAUSES AS A CONTRADICTION.** **`docs/guides/package-use.md` `:855`'s
   denial — *"it declares a list, not an engine"* — sitting beside `:908`'s two-layer clause**, which
   declares that every constraint of a write's triggered set is evaluated before the durable save and every
   listener after it (`★ ADDED 2026-10-16`). **Filed as `DEF-2026-10-16-J`'s family and NOT sustained: `:855`
   denies an ENGINE and `:908` declares an EVALUATION — and `:855`'s own last sentence prints the scope, *"THIS
   DENIES AN ENGINE AND NOT AN EVALUATION"*, pointing at `§9`'s two-layer clause.** **Two clauses read as one
   declaration are not a contradiction; the guide is correct on both.**
4. **THE AMPLIFICATION, WHICH IS THE ONLY THING THIS LINK IS CHARGED WITH.** **Before gate 8, the release's
   documents did not yet say in one voice that `0.2.0` is what a `0.2.0` reader gets.** **After it, they did —
   and the one sentence that carries the limitation (`:855`) now stands inside a guide whose every other line
   is a coherent account of a release that works.** **SO THE DOCUMENTATION WAS MADE COHERENT AND THE DEFECT WAS
   MADE INVISIBLE, AND THOSE ARE THE SAME ACT.** **The gate reconciled prose to a version; no gate of this
   project reconciles a version to a pack.**

---

## §4. THE COUNTERFACTUAL, IN ONE LINE

**FOR THIS NOT TO HAVE HAPPENED, THE VERSION CLASS WOULD HAVE HAD TO BE RULED ON WHAT THE PACK REACHES RATHER
THAN ON WHAT THE SURFACE DECLARES — OR THE BATTERY WOULD HAVE HAD TO ASSERT WITHOUT REACHING THE CHECKOUT —
OR THE CONTRACT'S INDEX WOULD HAVE HAD TO NAME, PER DECLARATION, THE LAYER THAT IMPLEMENTS IT.** **OR THE OPEN ROW THAT NAMED THE ARTEFACT WOULD HAVE HAD TO BE READ AT THE RELEASE ACT.**

**AND THE FIX IS NOT ONE OF THE THREE.** **The honest answer is ALL THREE, because each closes a different
door and each leaves the others open:**

| # | The family | What it alone would have caught | What it alone would NOT have caught | Its cost |
| --- | --- | --- | --- | --- |
| 1 | **A RELEASE-CONTENT rule** — the pack must be shown to reach every surface the version claims | The class ruling itself: three of the four counted declarations are not reachable from the pack, so they would not have counted as growth | The battery's green, which would still have read `PASS` on a resolution that supplied the missing module | A publish-gate step per claimed surface, and a real decision the first time a surface cannot be reached — widen the pack or exclude the surface, both priced at `§7` `R1` |
| 2 | **A BATTERY-RESOLUTION rule** — a battery asserting anything about the package drives installed bytes only | The green's coverage: the constraint limb would have been reported `NOT EXERCISABLE FROM THE PACK` at `0.2.0`, and the release would have had to answer for it | The class ruling, which was taken before and independently of any battery | A narrowed battery: several of this project's existing live cells reach the checkout and would be re-labelled, so the re-labelling is a corpus-wide edit (`§7` `R2`) |
| 3 | **A VERSION-CLASS rule** — the contract's index carries a layer column | The class ruling at its own site, in one line a gate could read: the key and the member are `caller/kernel`, not `package` | The green: a battery may still mis-resolve, though the index would make the mis-resolution visible | Every contract directory's index region gains a column, and the column must be re-derived whenever a layer moves (`§7` `R3`) |
| 4 | **A FILED-GAP rule** — a gap naming the artefact may not be reclassified without a recorded release decision | The `A112` reclassification: the artefact-facing half and `N7`'s *"`src/**` reaches no consumer today"* would have entered the release act as a disposition instead of standing in a `next-steps` row | The other three: it preserves the question, it does not answer it | A release act gains a disposition step, and reclassification and hand-off stop being cheap spec-side moves (`§7` `R4`) |

---

## §5. WHAT THIS RCA DOES NOT CLAIM

1. **IT DOES NOT CLAIM THE ENGINE SHOULD HAVE SHIPPED.** **`U-STOREROOM-CONSTRAINTS` is unlanded and its
   contract is the only specification of the behaviour** (`docs/specs/storeroom-constraints/contract.md`); its
   publish status is the architect's parked question, not this file's (`docs/pending.md` `G-13`).
2. **IT DOES NOT CLAIM THAT ANYTHING WAS HIDDEN.** **Every fact in `§2` is printed at its own path in this
   project's own records — by the battery, by the amendment, by the guide and by the park** — and the battery's
   record states the split more directly than this file could.
3. **IT DOES NOT CLAIM THAT ANY PUBLISHED BYTE IS CORRUPT.** **The released bytes install, load, resolve,
   pass their own version guard and return instances** (`scratch/live/install-0.2.0/0.2.0-live-install-report.md`
   `§1.2`–`§2.4`).
4. **IT DOES NOT CLAIM ANY GATE READ A DOCUMENT INCORRECTLY.** **The class table was applied as written, the
   amendment moved no allowlist cell, the battery declared its own split, and the documentation review
   reconciled a guide to a version.** **THE DEFECT IS THAT NO RULE ANYWHERE ASKED WHETHER A CLAIMED SURFACE IS
   REACHABLE FROM THE PACK, AND A DEFECT OF THAT KIND IS A RELEASE-DISCIPLINE DEFECT AND NOT ANY PASS'S
   ERROR.**
5. **AND IT DOES NOT CLAIM THIS RCA IS A CURE.** **It files a diagnosis and four proposals.**
   **`docs/specs/rca-0.2.0-shipped-surface.md` changes no shipped byte, no clause and no row until an
   architect's ruling lands one of its proposals as an ACTIVE `docs/decisions.md` row.**

---

## §6. THE DOWNSTREAM CONSUMER'S OWN REVIEW, AS AN INPUT, QUOTED AT ITS CLAIMS AND RULED ON CORRECTNESS

**THE REVIEW'S FINDINGS REACH THIS FILE AS AN INPUT AND ARE DISPOSED OF ONE BY ONE.** **One is SUSTAINED, one
is CONFIRMED AS DESIGN, and one is NOT SUSTAINED.**

| # | Its claim | Disposition | Why, at the evidence |
| --- | --- | --- | --- |
| **1** | **The guide's pins clause read `0.1.3` at a `0.2.0` release** (`docs/guides/package-use.md` `:162`) | **SUSTAINED, and FIXED** | **A LIVE version claim was ruled historical by a reconciliation pass.** The site now reads `0.2.0`, five times; filed as `DEF-2026-10-16-J`, whose lesson is that the discriminator is the CLAIM'S TENSE and not the version figure inside it. **This pass re-read `:162` and confirms the correction is landed** |
| **2** | **The `constraints` list is declared and not backed by an engine — a shipped key whose engine is absent** | **CONFIRMED AS DESIGN, and NOT a defect at the package** | **The store validates the list at two instants and persists nothing** (`src/store.rs:623`, `:689`–`:695`; `docs/decisions.md` `A118`, as corrected by the architect); **the evaluation the key feeds is a caller-side concern** (`docs/specs/storeroom-js/surface.md §2.11`; `§2.4` item 9). **The list is accepted and dropped, by declaration and by the architect's own ruling** |
| **3** | **`:855`'s denial and `:908`'s two-layer clause are a contradiction** | **NOT SUSTAINED** | **`:855` denies an ENGINE; `:908` declares an EVALUATION.** `:855`'s own last sentence states the scope in terms — *"THIS DENIES AN ENGINE AND NOT AN EVALUATION"* — and points at `§9`'s two-layer clause. **Two clauses that do not have the same subject are not a contradiction** (`surface.md §2.11` clauses 2, 3 and 5; `composition-and-states.md §2.7` items 5–7) |

**AND THE ONE THING THIS TABLE IS HERE TO RECORD: A DOWNSTREAM CONSUMER'S REVIEW FOUND THE THING THIS
PROJECT'S OWN GATES DID NOT — AND IT FOUND IT BY DOING THE ONE THING NO GATE HERE DOES: READING THE RELEASE
AS A CONSUMER RATHER THAN AS ITS AUTHOR.** **Findings `1` and `3` are both about the GUIDE AS A READER MEETS
IT.** **The guide is the only document in this project that is written for a consumer, and it was reviewed by
a consumer's reader for the first time after the release.** **That is the same hole `§3.1` and `§3.4` name from
the other side: this project reviews declarations against declarations, and installs against their own drive
directories, and it does not review a release against what its pack can do.**

---

## §7. THE RULE CHANGES — FOUR PROPOSALS, EACH WITH WHAT IT WOULD HAVE CAUGHT HERE AND WHAT IT COSTS

**FOUR PROPOSALS, NUMBERED `R1`–`R4`.** **NONE IS LAW.** **Each is written as a candidate clause, each names
the gate that would carry it, each prices itself, and each states separately what it would have caught here
and what it would not have caught.** **An architect's ruling lands one, several or none; until then no pass
may cite this section as a rule.**

### `R1` — SHIPPED-SURFACE REACHABILITY IS A PUBLISH-GATE CONDITION

**THE RULE, AS A CANDIDATE CLAUSE.** **FOR EVERY SURFACE A VERSION CLAIMS, THE PACK MUST BE SHOWN TO REACH
IT — OR THE SURFACE IS EXCLUDED FROM THE CLASS RATIONALE AND MARKED `DECLARED, NOT SHIPPED`.** **A surface
marked `DECLARED, NOT SHIPPED` may not contribute to a version class's rationale, may not appear in a
release's notes as a capability, and may not be counted as growth by the semver table's `MINOR` row.**
**The demonstration is a pack-reachability step at the publish gate, per declared surface, and its instrument
is the artefact as assembled — never the checkout.**

- **What it would have caught here:** **the class ruling itself.** `constraints` on `storeCreate` and `settle`
  on the instance are reachable only through `bindings/js/src/constraint-kernel.mjs`, a file the pack does not
  carry; marked `DECLARED, NOT SHIPPED`, they would not have counted as `MINOR` growth, and the release's
  rationale would have had to name what actually grew. **AND THE FACT WAS ALREADY ON THE RECORD, IN THE RIGHT
  WORDS, IN AN OPEN ROW: `docs/next-steps.md` `N7` states that the pin is the manifest's `files` *"three
  entries"* and that *"`src/**` reaches no consumer today"*.** **`R1` would have moved that sentence from a
  `next-steps` row into the gate that needed it.**
- **What it would NOT have caught:** **the battery's green.** The battery's resolution supplied the missing
  module, so a reachability step performed from a checkout would have passed. **`R1` needs `R2` to be
  unfoolable.**
- **Its cost:** **one new publish-gate step per claimed surface, and a real decision the first time a surface
  cannot be reached** — widen the pack (which costs the binary-free property, `docs/specs/storeroom-publish/distribution.md §2.1`
  item 2, or a second package) or exclude the surface (which costs the declaration's reader-facing meaning).
  **This release made that decision by inaction; `R1` makes it an act, and an act has an author.**
- **Its home:** `docs/specs/storeroom-publish/release.md §2.3`'s class table region and the publish gate's own
  condition list; `docs/specs/storeroom-publish/distribution.md §2.1`'s allowlist clause.

### `R2` — A BATTERY'S CLAIM FIXES ITS RESOLUTION

**THE RULE, AS A CANDIDATE CLAUSE.** **A BATTERY ASSERTING ANYTHING ABOUT THE PACKAGE DRIVES INSTALLED BYTES
ONLY.** **Reaching the checkout, or any module the pack does not carry, makes the battery `LIVE/CHECKOUT`,
and a `LIVE/CHECKOUT` green MAY NEVER BE CITED AS EVIDENCE ABOUT THE PACKAGE.** **The layer token is part of
the battery's result and travels with every citation of it.**

- **What it would have caught here:** **the green's coverage.** `gate 6`'s battery would read `LIVE/CHECKOUT`
  for every cell whose drive reached `bindings/js/src/**`, and its result for the constraint limb would have
  been `NOT EXERCISABLE FROM THE PACK` — which is a fact the release would have had to answer for at the
  publish gate. **It is also the rule that makes `R1`'s demonstration meaningful, because it fixes where a
  demonstration may be performed.**
- **What it would NOT have caught:** **the class ruling**, which was taken before and independently of any
  battery. **It also does not catch a battery that drives installed bytes and asks the wrong question** — a
  resolution rule bounds a battery's SCOPE, not its CENSUS.
- **Its cost, which includes the retro-label, stated plainly:** **THIS ONE RETRO-LABELS THE BATTERY THAT
  ALREADY RAN.** **`scratch/live/install-0.2.0/0.2.0-live-install-report.md` becomes a `LIVE/CHECKOUT` record
  for its kernel-reaching cells, its `ADDITIVE / LIVE ASSEMBLED PACKAGE` self-description is read through the
  new token, and **this release's `LIVE/INSTALL` acceptance claim is qualified with its layer wherever it is
  cited** — the report itself says the kernel side is not an installed byte, so the re-label is a re-spelling
  of a stated fact and not a retraction of one. **And the corpus cost is real: several existing live cells
  reach the checkout and would each carry the new token.**
- **Its home:** `docs/specs/storeroom-publish/acceptance.md §2` (`LIVE/INSTALL` defined — instrument, site,
  label) and the `RCA-12` layering clause; `docs/specs/storeroom-publish/contract.md §4`.

### `R3` — THE CONTRACT'S INDEX CARRIES A LAYER COLUMN

**THE RULE, AS A CANDIDATE CLAUSE.** **EVERY DECLARED KEY, VERB AND MEMBER NAMES THE LAYER THAT IMPLEMENTS
IT: `package` · `caller/kernel` · `host`.** **The column is part of the index region, is derived per
declaration, and is re-derived when a layer moves.**

- **What it would have caught here:** **the class ruling at its own site, in one line a gate could read.**
  `constraints` on `storeCreate` and `settle` on the instance would read `caller/kernel`; the four members the
  amendment counted would have shown three `caller/kernel` and one `package`-side argument, and the class
  rationale could not have been written as it was without noticing. **It is the rule that makes `R1`
  checkable rather than archaeological: a gate reads a column instead of assembling an instrument.**
- **What it would NOT have caught:** **the green and the guide.** A layer column is a fact about a
  declaration; it does not stop a battery mis-resolving or a guide reading coherent.
- **Its cost:** **every contract directory's index region gains a column, and the column owes a derivation per
  declaration** — for `docs/specs/storeroom-js/`, `docs/specs/storeroom-native/` and
  `docs/specs/storeroom-constraints/` at least, and every later amendment that moves a layer owes a
  re-derivation. **And the column's three values are themselves a closed set that must not grow by
  convenience: `package` is what the tarball carries, `caller/kernel` is the consuming project's own code, and
  `host` is the runtime's.**
- **Its home:** each contract directory's index region (`docs/specs/storeroom-js/contract.md §0`,
  `docs/specs/storeroom-native/contract.md §0`, `docs/specs/storeroom-constraints/contract.md §0`), read with
  `docs/specs/storeroom-publish/contract.md`'s own index region.

### `R4` — A FILED GAP THAT NAMES THE ARTEFACT MAY NOT BE RECLASSIFIED WITHOUT A RECORDED RELEASE DECISION

**THE RULE, AS A CANDIDATE CLAUSE.** **A finding that names THE ARTEFACT — the pack, the entries, the
installed bytes, the release — is NOT reclassified into another class by a pass.** **It receives a DISPOSITION
in the release act's own record, where the release act reads it.** **A reclassification is available only
where that disposition stands beside it.**

- **What it would have caught here:** **the `A112` reclassification.** `A112` (2) names the artefact by
  implication — the entry cannot import the kernel without colliding with the publish allowlist the manifest's
  `files` fixes, and `P-PUB-7` is the publish unit's own register row for *"the main package's own shape"*,
  whose claim cell reads *"the main package's `files` is the three entries"*
  (`docs/specs/storeroom-publish/contract.md §5.7`) — **and its hand-off row `N7` states the allowlist fact in
  the open: the pin is `files` as `"three entries"` and `"`src/**` reaches no consumer today"`, with the
  publish work named as the separable remainder and the closing warning that the row must not *"clos[e] green
  on a code change while the published package still cannot run the ordering"*.** **Under `R4`, `N7`'s
  artefact-facing half could not have stood as a `next-steps` row alone: the release act would have met a
  disposition reading *"a declared surface whose engine the pack does not carry"* at the moment it was ruling a
  version class.**
- **What it would NOT have caught:** **the class table's own criterion, the battery's resolution and the
  guide's coherence.** `R4` preserves the question; it does not answer it, and it does not tell a gate what to
  do with an answer once it has one. **And it does not catch the case where no finding is filed at all — a
  surface whose unreachability nobody has yet written down.**
- **Its cost:** **the release act gains a disposition step, and reclassification stops being a cheap
  spec-side move.** A pass that today may re-read a filed row as a clause collision would have to route the
  artefact-facing half to the release record and wait for a disposition. **The step is cheap per item and the
  discipline is not: it removes this project's ability to close a finding by re-reading it, which is a
  capacity that has served it well everywhere except here.**
- **Its home:** `docs/decisions.md`'s ACTIVE table as the disposition's home, read with `docs/next-steps.md`'s
  open-row ledger; the reclassification act itself is the `docs/specs/storeroom-native-proposal-review.md §19.5`
  row's own class.

---

## §8. WHAT NEEDS CHANGING ELSEWHERE — NAMED, NOT CHANGED

**This pass's wall is documentation and this file; every item below is another file's, and each is named here
because a reader who needs it should not have to find it twice.**

1. **`docs/pending.md` `G-13`'s park is now self-defeating in one limb and it is `docs/pending.md`'s to fix.**
   The park's revisit condition (a) reads *"the architect rules that the constraint engine is to be a published
   surface member"*, and `release.md` `:232` has since re-scoped the row while stating the park is not lifted.
   **`G-13`'s own text still describes the terminal arm as absent, because the re-scope is recorded at
   `release.md` and NOT at the park.** **The park and its re-scope should agree in one place.**
1-bis. **AND ONE THING `docs/pending.md` SHOULD CARRY THAT NO OTHER FILE DOES: `G-13` and `docs/next-steps.md`
   `N7` are two open rows about the same unreachability, and neither names the other.** **`G-13` is the park on
   the kernel's publish status; `N7` is the spec row that carries the *"`src/**` reaches no consumer today"*
   fact, the separable publish remainder and the closing warning about a published-install green.** **A reader
   who needs the reachability record must find both, and no cross-reference sends them from one to the
   other.** **This file does not amend either; it enters the edge here so the pair is discoverable.**
2. **`bindings/js/src/constraint-kernel.mjs`'s own header cites `kernel-surface.md §1` item 1's fixture clause
   for the `cfg` key's home, and the gate-8 documentation review has reported that pointer as wrong — the
   key's home is `docs/specs/storeroom-js/parameter-semantics.md §2.21` (`PAR-JS-21`), with `§2.20` being the
   write's fifth argument.** **The review record names it as owed to the spec writer; it is outside this
   pass's wall and is repeated here so it is not lost.**
3. **`docs/specs/storeroom-js/surface.md §2.6` still declares constraint evaluation client-side after `write`
   returns, which `§2.11`'s terminal-arm pass reads past.** **`docs/defects.md` names it explicitly as NOT
   adjudicated there and NOT edited there — it is a spec-side supersession-or-divergence question for that
   directory's owner.** **This file does not adjudicate it and does not touch it.**
4. **`docs/defects.md` `DEF-2026-10-16-J`'s own foot names a second unresolved item in the same family** — the
   `§2.6` / `§2.11` reading above — **and its disposition is `FIXED` for the pins clause alone.**
   **No new `DEF-` row is minted by this file; whether this RCA's four proposals want one is the
   supervisor's call and not this pass's.**

---

**FILED 2026-10-16 — `role_spec_writer`, on the architect's question.** **This document writes one file and
reads many; it changes no shipped byte, no clause, no row, no park and no defect, and it claims no green on
any layer.** **Its proposals are proposals; its citation of any ruling, clause or record is a citation and
never a restatement of authority this file does not hold.**
