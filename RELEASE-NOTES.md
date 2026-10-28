# Release notes — `provident-storeroom` `1.1.0`

**⟶ THE FILE'S OPERATIVE READING, 2026-10-28 — THE HEAD IS CORRECTED HERE, AND THE DEFECT WAS ONE LEVEL IN: A DOCUMENT
DENYING THE STATE IT DESCRIBED.** `RCA-8(g)` ANNOTATE-BESIDE: **the title line above and every dated paragraph below
stand BYTE-FOR-BYTE as the reading of their own date; THIS clause and the `§MAIN` section beneath it are the operative
readings of the two things the head got wrong.** **(i) `1.2.0` IS NOT UNRELEASED.** `git tag --list` answers `v1.0.0` ·
`v1.0.1` · `v1.1.0` · `v1.2.0`; the tag `v1.2.0` names a tree whose `bindings/js/package.json` reads `"version": "1.2.0"`
at its own bytes; and the registry carries `1.2.0`. **So the section that stood under *"UNRELEASED"* is the change list
of a CUT release, its *"no `v1.2.0` tag exists"* sentence and its *"what is installed today is still `1.1.0`"* sentence
are the reading of the date they were written, and its heading is corrected at its own line** — the withdrawn bytes are
recorded there, because a heading that denies its own tag is exactly the class of defect this project calls `DEF-AC`.
**(ii) THE PUBLISHED FIGURE IS `1.2.0`, NOT `1.1.0`, AND THE TREE READ HERE IS NINE COMMITS PAST THAT RELEASE WITH NO
TAG ON IT.** **So this file now carries a section for the tree that is not cut (`§MAIN`, prepared and marked so) beside
the section for the release that is (`§1.2.0`).** **No version is bumped, no manifest moves, and nothing in `§MAIN`
claims to be installable.**

**⟶ AND THE CUT-STATE IS DROPPED FROM THIS FILE, 2026-10-28 — `D-57`, THE ARCHITECT VERBATIM: *"Drop the cut-state."*** `RCA-8(g)` ANNOTATE-BESIDE: **the title line and every dated paragraph of this file stand BYTE-FOR-BYTE as the reading of their own date, THIS clause is the one that reads them, and not one byte is deleted.** **THE REASON IS STRUCTURAL AND IT WAS MEASURED THREE TIMES: A SHIPPED DOCUMENT IS SEALED BEFORE THE TAG THAT MAKES ITS CUT-STATE TRUE**, so every release packed before its tag ships a document denying itself, and a guard running in that release's own preflight can only ever confirm *"not cut"* — `1.2.0` shipped *"NOT CUT"*, `1.3.0` shipped *"`v1.3.0` DOES NOT EXIST"*, and this file's own head was stale within minutes of the tag that falsified it. **SO EVERY SENTENCE BELOW THAT CLAIMS WHETHER SOME VERSION IS OR IS NOT CUT — *"PREPARED — NOT CUT"*, *"no `v1.3.0`"*, *"nothing in this section is cut"*, *"the release is not cut"*, *"what is installed today is still `1.1.0`"*, and each reading printed beside them — IS READ THROUGH THIS CLAUSE: the cut-state is not a document's to state.** **WHAT SURVIVES IS THE ONE FIGURE A SHIPPED DOCUMENT CAN BE RIGHT ABOUT, AND IT IS GENERATED FROM THE MANIFEST AND ASSERTED BY THE PREFLIGHT:**

PUBLISH-NOTES-VERSION-LINE: THE VERSION THIS CHANGE LIST DESCRIBES IS `1.5.0`.

**AND THE TAG SET SURVIVES AS A RECORD OF RELEASES — PAST TENSE, A LIST OF WHAT HAS BEEN CUT, NEVER A CLAIM ABOUT THE CURRENT ONE** (the record stands in `§1.4.0` below — the section this file's head called `§main` until it was re-cut to name the version it prepares, 2026-10-28 — beside the section for the tree this file describes). (`D-57`; `DEF-AC` (b) — `scripts/publish.sh --figures` generates that line from `bindings/js/package.json`'s `version` and refuses on any disagreement, in this file, in `bindings/js/README.md` and in the shipped guide: three documents, three version lines, one generator, one assertion.)

**THE ONE THING THIS DOCUMENT IS FOR: `1.1.0` IS A MINOR, AND THIS IS WHERE ITS BREAKING CHANGES ARE
DECLARED.** `1.0.1` was published as a PATCH and it carried behaviour changes a patch may not carry. The
architect ruled the remedy a MINOR — *"the next release is `1.1.0`"* (`strata/decisions.md` · `D-42` item `1`)
— so **`1.0.1` stands as published with a disclosed breach, and `1.1.0` carries the declaration.** This file
is that declaration. **It is not a changelog of everything that happened; it is the list of things that can
break you, each with what it did before and what it does now.**

**WHERE IT BELONGS, AND WHY IT IS AT THE REPOSITORY ROOT.** This note is at the packaging root's PARENT, not
inside `bindings/js/`: the main manifest's `files` allowlist does not name it and must not, so **it ships in NO
tarball.** It addresses a consumer deciding whether to move off `1.0.1`, so it must be readable BEFORE an
install and must cover the six packages at once — the main package and the five platform packages share one
version and one decision.

**⟶ AND THE PARAGRAPH ABOVE IS SUPERSEDED BY MEASUREMENT, 2026-10-28 — `DEF-AC`, AND THIS FILE NOW SHIPS.** `RCA-8(g)`
ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is the reading of its own date (the `1.1.0` cut, when
it did ship nowhere); it is read THROUGH this clause.** **THE DEFECT THE DOWNSTREAM FILED: the ONE behaviour change
`1.2.0` makes — a refused reversal's restore to the commit's OPENING mark — was declared in THIS FILE and in no
shipped document, so a consumer installing `1.2.0` received a behaviour change with no shipped declaration of it.**
**SO THE FILE IS LANDED THE WAY THE GUIDE IS LANDED**: `RELEASE-NOTES.md` at the repository root is the ONE authored
home, the release's assembly stages it **BYTE-FOR-BYTE** at the packaging root as `bindings/js/RELEASE-NOTES.md`,
and the main manifest's `files` allowlist **names it** — one additive documentation row beside `README.guide.md`,
staged by the same assembly step and admitted by the reachability rule's own declared non-code class. **A BARE
`npm pack` STILL WORKS** because the landed copy is a TRACKED, GENERATED file like `README.guide.md`: it is present
whether or not the assembly has run. **AND WHAT SHIPS IS THE CHANGE LIST, at `node_modules/provident-storeroom/
RELEASE-NOTES.md`.**

**THE VERSION THIS RELEASE DECLARES IS `1.1.0` AT ELEVEN SITES, MOVING TOGETHER** — the main manifest's
`version`, its FIVE exact `optionalDependencies` pins, and the FIVE `platforms/*/package.json` versions. **The
artefact is stamped from the manifest by `bindings/js/build.rs`, so `version()` answers `1.1.0`** and that is
the value to assert against, not the crate's own `Cargo.toml` version.

---

## §1.4.0 · **CUT AND PUBLISHED — tag `v1.4.0`** — what that release carries: the seven commits on `main` past `v1.3.0`, and the one figure this section states

**⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.4.0 · **PREPARED** — what `1.4.0` carries: the seven commits on `main` past `v1.3.0`, and the one figure this section states`"*, AND IT IS CORRECTED AT ITS OWN LINE, 2026-10-28.** `RCA-8(g)` ANNOTATE-BESIDE: **the withdrawn bytes are quoted above, every paragraph of this section below stands BYTE-FOR-BYTE as the reading of its own date, and nothing is deleted.** **THE DEFECT IS THE `DEF-AC` CLASS AT ITS THIRD ITERATION AND AT ITS SHARPEST: A HEADING THAT DENIED THE RELEASE ITS OWN TAG NAMES.** The tag set at this date reads `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0` · `v1.4.0`; **the tag `v1.4.0` names a tree whose `bindings/js/package.json` reads `"version": "1.4.0"` at its own bytes**, its five `optionalDependencies` pins read `1.4.0` with it, and the five platform manifests' `version` fields read `1.4.0` with them; and **a reader opening this file met *"PREPARED"* over a version the registry carries.** **SO THE HEADING NOW READS `CUT AND PUBLISHED — tag `v1.4.0``, which is a PAST-TENSE RECORD OF A RELEASE AND NOT A CLAIM ABOUT THE TREE YOU ARE READING** — the tag set is the record of what has been cut, and the state of the current tree's version is not a document's to state (`D-57`, and the head clause of this file, which stands). **AND WHAT THE SECTION BELOW DECLARES IS UNMOVED BY THE CORRECTION: the ancestor set (`D-56`), the `delete`'s own attempt and its `CommitRecord` (`D-57`), the five smaller items of `D-55`, and the one shipped sentence that all of it falsified — those are `1.4.0`'s content, they travelled in its tarball, and a consumer who installed `1.4.0` has them.** (`D-57`; the head clause of 2026-10-28 above; `git tag --list` and `bindings/js/package.json` read at their own bytes this date.)

**⟶ THIS SECTION IS RE-CUT FROM THE HEADING IT STOOD UNDER, 2026-10-28, AND ITS FIGURES MOVED WITH THE ELEVEN CELLS.** `RCA-8(g)` ANNOTATE-BESIDE: **the heading that stood here was *"`## §main · **PREPARED** — the seven commits on `main` past `v1.3.0`, and the one figure this section states`"*, the withdrawn bytes are quoted there, and the four numbered items below stand BYTE-FOR-BYTE as the reading of their own date and are read THROUGH this clause.** **THE HEADING NOW NAMES THE VERSION THIS SECTION PREPARES — `1.4.0` — because the section below it, `§1.3.0`, is the change list of a release that IS cut, and a prepared section must say which version it prepares.** **AND IT STILL STATES THE VERSION AND NOT THE CUT-STATE, BECAUSE THE SECOND IS NOT A DOCUMENT'S TO STATE (`D-57`).**

**THE VERSION THIS TREE CARRIES IS `1.3.0` AT ELEVEN SITES** — `bindings/js/package.json`'s `version`, its five `optionalDependencies` pins, and the five `bindings/js/platforms/*/package.json` `version` fields — **the artefact is stamped from that manifest by `bindings/js/build.rs`, so `version()` answers `1.3.0`, and no version bump is in any of the commits listed here.** **THE RECORD OF RELEASES, PAST TENSE — the tags this repository has cut, and nothing about the tree you are reading:** `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0`.

**⟶ AND THE PARAGRAPH ABOVE IS CORRECTED AT THIS LINE, 2026-10-28 — ITS FIGURE WAS `1.3.0` AND IS NOW `1.4.0`.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date (`v1.3.0`'s tag) and is read THROUGH this clause; not one byte of it is deleted.** **`bindings/js/package.json`'s `version` now reads `1.4.0`, its five `optionalDependencies` pins read `1.4.0` five times, and the five `bindings/js/platforms/*/package.json` `version` fields read `1.4.0` — ELEVEN CELLS, ONE VERSION, moved TOGETHER in this act — and `npm run build` stamps the artefact from that manifest, so `version()` answers `1.4.0` at the built artefact and at a package installed from it.** **AND THE TREE NOW STANDS NINE COMMITS PAST `v1.3.0`** — `git describe` reads `v1.3.0-9-gf579a5a` — **of which the two beyond the seven below change no behaviour**: `23ac519` regenerates the guide's cut-state sentence and `f579a5a` DROPS the cut-state from the shipped face, because `D-57` drops it. **THE TAG SET IS NOT TOUCHED BY THIS ACT AND REMAINS A RECORD OF RELEASES, PAST TENSE:** `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0`. **AND NOTHING IN THIS SECTION CLAIMS WHETHER `1.4.0` IS CUT: the cut-state is not a document's to state, and `D-57` is why.** **AND THE PARAGRAPH BELOW — *"THE TREE STANDS EIGHT COMMITS PAST THAT TAG"* — STANDS AS THE READING OF ITS OWN DATE AND IS READ THROUGH THIS CLAUSE TOO: the count is NINE, and the two beyond the seven are `23ac519` and `f579a5a`.**

**THE TREE STANDS EIGHT COMMITS PAST THAT TAG** — `git describe` reads `v1.3.0-8-g8c0e671` — **and SEVEN of them change what this package does or what it declares.** **The eighth is `23ac519`'s regeneration of the guide's cut-state sentence, which is the sentence `D-57` drops and the reason it is dropped.** **THE SEVEN, DERIVED FROM THE TREE THEY LANDED ON, EACH STATED FOR A CONSUMER:**

**1 · ★ A PAIR IS ASKED FOR ACTS BELOW IT — THE PASS'S SET WIDENED TO THE ACT'S ANCESTORS (`D-56`), BECAUSE THE VALUE READ AT A PREFIX CONTAINS ITS SUBTREE.** **The architect, verbatim: *"A listener/constraint should fire when the descendants of its targeted address node change, because the descendants become part of the object that is read from that address."*** **WHAT A CONSUMER SEES: a pair standing at `['tabs']` is now asked for a `delete` at `['tabs','landingPage']`** — it is handed the ACT's `address`, `tier` and `value`, so a refusal crosses as it would at its own address and the commit rolls back — **and the membership rule reads once: your pair is asked when THE ACT'S ADDRESS IS AT OR BELOW YOUR PAIR'S ADDRESS.** **A pair at a DESCENDANT of the act is still NOT asked, and its address then reads as absent.** **AND THE CONSEQUENCE THAT IS UNMISTAKABLE: a passing write now EMPTIES `pending`** — the pass's set now EQUALS the store's `triggered` set, which is exactly what the earlier exact-address rule refused to allow — **measured `1` → `0` on a passing write.** (`D-56`; `HL-8` item 1 and attempt-lifecycle `§2.4` item 5 (iv) are annotated beside in the guide, not rewritten.)

**2 · A `delete` IS AN EDITING VERB — ITS OWN ATTEMPT KIND, ITS OWN PASS, AND A DELIVERY AFTER THE JUDGEMENT.** **WHAT A CONSUMER SEES:** the `delete`'s receipt now carries a **non-enumerable `commit` member** — the same four-member `CommitRecord` a write's `K-2` mints (`attempt`, `op`, `triggered`, `pending`) — **so a delete can be read back through `K-4` and `K-5`, which now answer BY REFERENCE where they refused `NO-REF` before**; the record is **ADOPTED** by the entry, which stands the delete's own receipt in the leg slot for the pass and restores the enclosing leg in a `finally`; the **`pending` residue is one entry** (the returned set minus the handles the delete's own pass checked off), and the delivery fires **THE RESIDUE** rather than the whole returned set; and a `file`-tier delete **SAVES** — the terminal arm saves the delete's own op, so a fresh boot answers `AddressNotFound` where the bytes used to stand. **A DELETE THAT REMOVES NOTHING MINTS NOTHING** (`D-3`), **and a `rollback` keeps no attempt**, because a reversal appends no journal op and a fabricated ref would be a lie. **THE COMMIT IS A SCOPE, A LOG'S HOME, A SAFE-STATE UNIT AND A RECORD — NOT A KERNEL ITEM** (`D-57`'s second half: the kernel's surface stays `K-1`…`K-6`, and `K-7` `commitRemoval` is owed only if a consumer must drive a delete's attempt directly, which none can). (`D-57`; `D-3`; `D-44`; `D-53`; `DEF-AN`.)

**3 · FIVE SMALLER ITEMS, EACH A THING A CONSUMER SEES.** **A THROWN MESSAGE'S FORM IS IN THE LOG** (`D-55` item 1 · `DEF-AK`): the value a pair threw is PRINTED in the attempt's one `outcome` entry, named rather than silently stringified, and the crossed `message` stops claiming the value crosses. **AN ENTRY IS NEVER SHIPPED WITH AN EMPTY ADDRESS LIST** (`D-55` item 2 · `DEF-AH`). **A CLOSED RECORD IS SEALED AT HANDOFF** (`D-55` item 6 · `DEF-AO`): what a consumer holds is final. **THE DRAIN JUDGES THE STANDING STATE** (`D-55` item 6 · `DEF-AP`, and `D-54`'s withdrawn sentence): where two of your listeners each reverse inside one commit, the check judges the state the commit STANDS AT — both raises — and a pass that ends by throwing reaches the same judgement at the state the pass left. **AND A REFUSED EDIT UNDOES THE WHOLE COMMIT** (`D-55` · `DEF-AN`): a constraint-refused edit rolls back to the previous safe state with ALL edits in the commit undone — including a delete's. (`D-55`'s six clarifications; the four rows `dfa9fc7` settled; `strata/decisions.md` `D-55`.)

**4 · AND A SHIPPED SENTENCE WAS FALSIFIED BY ALL OF IT, AND IS CORRECTED AT ITS OWN HOME.** **The package's `README.md` said a `delete` and a `rollback` both perform no file I/O at any tier scope.** **A `delete` SAVES NOW** — a `file`-tier delete left the bytes standing and a fresh boot read the old value; the terminal arm saves the delete's own op, and a failed save is the write's arm with `KC-9`. **A `rollback` still performs no file I/O, because it has no op of its own to save at** — and that half of the sentence was never in doubt. (`1090e1e`; `bindings/js/README.md`'s own 2026-10-28 clause.)

## §1.6.0 · **PREPARED** — what `1.6.0` carries: the six commits on `main` past `v1.5.0`, derived from the tree

**⟶ THIS SECTION IS NEW, 2026-10-29, AND IT STATES THE VERSION AND NOT THE CUT-STATE.** `RCA-8(g)` ANNOTATE-BESIDE: **no byte above or below moves; this section is added beside `§1.5.0`, and every sentence of it is derived from the tree it names.** **AND ITS POSITION IS THIS FILE'S ARRANGEMENT AND NOT A CHRONOLOGY: it stands ABOVE `§1.5.0`, which is the change list of a release that IS cut, because the section for the tree that is not cut belongs at the head of the two.** (`D-57`; the head clause of 2026-10-28 above, which governs every sentence here.)

**THE FIGURE THIS SECTION MAY BE RIGHT ABOUT, AND ITS GENERATOR.** the version line at this file's head is generated from `bindings/js/package.json`'s `version` and asserted by `scripts/publish.sh --figures` in three shipped documents — **`1.5.0`, at eleven cells that move together and never singly**: the main manifest's `version`, its five exact `optionalDependencies` pins, and the five `bindings/js/platforms/*/package.json` `version` fields; and `bindings/js/build.rs` stamps the artefact from that manifest, so the built artefact's `version()` answers `1.5.0`. **NO VERSION BUMP IS MADE BY THIS PREPARATION AND NO MANIFEST MOVES: the section PREPARES `1.6.0` and the cells that would carry it read `1.5.0` at their own bytes.** **AND NOTHING IN THIS SECTION CLAIMS WHETHER `1.6.0` IS CUT: the cut-state is not a document's to state** (`D-57`).

**THE TREE STANDS SIX COMMITS PAST `v1.5.0`** — `git rev-list --count v1.5.0..HEAD` reads `6` and `git describe` reads `v1.5.0-6-g9e7a766` — **and the honest shape of the six is `2 + 3 + 1`.** **TWO MOVE THE PACKAGE**, a line under `bindings/js/src/` or `bindings/js/index.mjs`/`index.d.ts` changing so a consumer can observe it: `96eddfc` (`D-74`, the bounded entry) and `9933405` (`D-75`, the witness on every path). **THREE ARE RECORD RULINGS AND MOVE NO BEHAVIOUR** — each writes `strata/decisions.md` and no other path: `9e0a56f` (`D-74`), `aa5d36b` (`D-75`) and `9e7a766` (`D-76`). **AND ONE IS A MEASUREMENT WHOSE CODE CHANGE IS A COMMENT AND NOT AN ARM** — `8d31995`, whose fourteen added lines under `bindings/js/src/entry/constraints.mjs` are a doc block stating what the code already did; its substance is the seven-host table in item `3` below. **`2 + 3 + 1 = 6` ✓ — the whole of the six past `v1.5.0`, and no commit is counted twice.** **AND THIS PASS'S OWN DECLARATIONS — `D-76`'s three items at the guide and in the four contracts, and the two passages moved out — are on the working tree and in no commit yet, so they are stated here and counted nowhere.**

**1 · ★ THE LOG ENTRY IS BOUNDED, AND WHEN THE VALUE A BODY THREW IS ITSELF A REFUSAL THE ENTRY IS A SUMMARY OF IT AND NEVER ITS SERIALISATION (`D-74` · `DEF-AR`).** **WHAT `1.5.0` DID, MEASURED:** a lawful chain of inner refusals — each level's body throwing the last level's refusal — **wrote the previous level's whole form into the next level's `outcome` entry, so the entry doubled per level: `134,228,754` characters at depth `26` and `268,446,544` as JSON text, and at depth `28` the composition passed V8's maximum string length and the package answered `RangeError: Invalid string length` inside the caller's own frame — with no refusal at all.** **WHAT A CONSUMER GETS NOW: a SUMMARY carrying THREE facts and nothing else** — the inner refusal's own `status`, its entry count, and its first entry's message — **and never its log**, so **a refusal whose log holds fifty thousand entries costs your caller one number**; **the bound is ONE NUMBER, `307` characters** (`MESSAGE_CEILING` at `bindings/js/src/entry/kernel-foundations.mjs`), **applied to the entry's total and not to a level**, **and the crossed `message` is bounded the same way at the one place it quotes an inner sentence** (`753` at every depth after, where it was `134,229,071` at `26` and `268,447,241` at `27`). **`LogEntry` GAINED NO MEMBER: the bound is on the form's content and not a new column** — every entry still carries exactly `id` · `kind` · `message` · `opId` · `state`. **AND THE THREE LAWFUL ARMS ARE UNCHANGED WHERE THEY FIT** — a plain `Error`, a string and an object with no `message` answer the very words they always did. (`D-74`; `96eddfc`; `tests/e2e/discard-witness.mjs`'s `DW-17.1`–`DW-17.5`, before → after.)

**2 · ★ EVERY DISCARDED RAISE IS REPORTED, AT ANY COUNT, ON EVERY PATH (`D-75` · `DEF-AH` re-filed).** **WHAT WAS BROKEN, MEASURED:** two raises in one delete answered `[]`, because the machinery keeps ONE request and merges the second into it; **a raise inside a constraint body was absent from BOTH answers** — the raise's own and the triggering write's; **and `discarded.length === 0` therefore meant two things**, *"nothing was discarded"* and *"I wasn't told."* **WHAT A CONSUMER GETS NOW:** **`discarded` is ONE ENTRY PER RAISE the act's delivery threw away, in raise order, at any count**, each `{opId, addresses}`, **and it is present wherever an act can discard, `0` included — on a `delete`'s receipt (as it was), on a `write`'s record and on a `rollback`'s record, which carried none before** — so **`discarded.length === 0` now reads on every one of them: NOTHING WAS DISCARDED, and the member is present to say so.** **IT IS STILL A NON-ENUMERABLE OWN MEMBER and `Object.keys` still prints the record's own members only; a `rollback`'s is a LIVE VIEW, settled once the act whose window the raise stands in has returned.** **AND ONE THING IS STILL UNCARRIED: a registration's answer is an opaque identity with no witness** — the store's next at-rest act proves that window has ended, the raise settles as discarded, and the `rollback` record you already hold names it then. (`D-75`; `9933405`; `tests/e2e/discard-witness.mjs`'s `W18`, every one of its five cells RED under its own `/tmp` revert.)

**3 · AND THE SEVEN HOSTS ARE A MEASURED TABLE RATHER THAN AN ARGUED ONE (`D-42` · `D-54` · `D-55` ITEM 3).** **WHAT THIS SETTLES, SAID IN A CONSUMER'S TERMS: a `rollback` you raise inside a pass is CARRIED TO THAT PASS'S TERMINAL CHECK AND JUDGED THERE — five of the seven hosts — and the two that are not judged are exactly the two windows the guide declares, both of which run no pass at all.** **The seven: `H1` a constraint body in a write's pass — judged `[9, 7, 5]`; `H2` a repair body — judged `[9, 7, 5]`; `H3` a listener body in a write's delivery — judged `[9, 5]`; `H4` a REGISTRATION's own evaluation — NOT judged `[9]`, a declared window; `H5` a `delete`'s listener delivery — NOT judged `[9]`, a declared window, and `discarded` reports it; `H6` a constraint body during a DELETE'S OWN PASS — judged `[9, undefined, 5]`; `H7` a reentrant reversal-then-write — judged `[9, 5]`.** **SO THE MEASURED SET AND THE DECLARED SET ARE THE SAME SET.** (`D-42`; `D-54`; `D-55` item `3`; `8d31995`; the guide's `§12.6` table of the same date; cells `DW-16.1`–`DW-16.4`, three of them RED under a `/tmp` revert that removes the `delete`'s pass.)

**4 · ★ A LISTENER'S REFUSAL IS CONTAINED AND ITS THROW IS THE CHANNEL — THE SENTENCE THAT SAID OTHERWISE IS CORRECTED, AND THE ONE THING THE ANSWER CANNOT SAY IS DECLARED (`D-76` · `DEF-AU`).** **THE SENTENCE, AND WHY IT WAS FALSE:** *"the caller learns nothing of the outcome of the listeners"* **is L0's paraphrase of the architect's PERMISSION** — *"the caller does not need to know about the outcome of the listeners"* — **and `D-73` then kept the throw in the very next ruling precisely so the client can log errors cleanly, which is the caller learning the outcome.** **THE TRUE PAIR, WHICH IS WHAT THE GUIDE AND THE SPECS PRINT FROM THIS DATE:** **a listener's REFUSAL is CONTAINED** — its own commit's, invisible upward; **a listener's THROW is the CHANNEL** — **and the caller is the only party positioned to log the violation, because the listener's act is in the listener's own commit**; **and *"does not need to know"* is a permission, never a claim that it cannot.** **AND THE SECOND HALF, MEASURED IN BOTH ARMS ON THIS CHECKOUT AND DECLARED RATHER THAN LEFT TO BE DISCOVERED: `ConstraintPassRefused` DOES NOT SAY WHOSE ACT IT REFUSED.** **The same pair, the same message, one store:** the caller's own refused write answers `{status, message, log, address}` with two entries and the value never lands; **the same pair refusing an act made inside a listener that does not catch it answers the same status, the same message, the same three own members, the same entry count and entries equal in `kind` · `id` · `message` · `state` — the log's `opId` the only differing byte, and a byte the caller can never key against anything, because a refused act answers no `op`** — **while the caller's data is IN THE STORE.** **SO THE RULE, AND IT IS THE ONE TO WRITE INTO YOUR ERROR HANDLER: DO NOT RETRY ON THE ANSWER — READ THE ADDRESS YOU WROTE.** **Your value stands ⇒ the refusal was a listener's, YOUR WRITE LANDED, and a retry re-applies it (`D-73`'s hazard in its sharpest form). Your value does not stand ⇒ the refusal was your own act's, and the write did not happen.** **THE TWO LIMITS OF THAT READ, SAID PLAINLY: it answers *"did my value land"* and not *"whose act was refused"*; and a write whose value equalled what already stood cannot be told apart by it.** **NO CODE, NO STATUS AND NO MEMBER MOVED FOR ANY OF THIS: a new status or a member naming the act is a change to a closed set (`D-38`) and the architect's call, so it stands `OWED`.** (`D-76`; `D-73`; `D-71`; `9e7a766`; the guide's `§6.5a`, `§8.1` row `20`'s clause and the four contracts' clauses of the same date.)


**5 · AND THE TWO PASSAGES THE GUIDE STILL PRINTED ARE MOVED OUT, NOT LEFT STANDING (`D-76` ITEM 3 · `DEF-AT`).** **WHAT WAS WRONG, SAID AS THE CLASS IT IS — a correction applied at one site and not at the others:** the guide printed, in `§7.8`, *"a pair at an ANCESTOR address is not asked by the delete's pass"* **two paragraphs above its own corrected rule and `D-56`'s ruling and the measurement of it**, and printed, at its close, *"your `delete`'s own pass is still a measurement and not a behaviour … IT NEVER CALLS THE KERNEL"*, **which `§7.8` and the measurement both falsify.** **SO BOTH ARE MOVED OUT BYTE-EXACTLY, EACH WITH A ONE-LINE POINTER WHERE IT STOOD, into `docs/guides/backup/D76-2026-10-29-guide-move-out.md`, whose head names the source path, the pre-move line ranges and the `sha256` of each region.** **NO BEHAVIOUR AND NO PROMISE MOVES: what a consumer relied on was the corrected rule, and it is the rule that stands.** (`D-76`; `D-56`; `D-55` item `3`; `RCA-8(g)`.)

**6 · ★ WHAT YOU MUST CHANGE IN YOUR CODE — THE MIGRATION NOTE THIS RELEASE OWES, DERIVED FROM THE TWO BEHAVIOUR CHANGES ABOVE AND WRITTEN AS SUCH.** **A guide normally carries this; this one carries no "migration note" item and none is hidden anywhere in it** — the only migration subject in its own text is `§9.1`'s rule for the STORE'S FILE (*"read the old value through `read` and write the new one through `write`"*), **which is written, standing, and owes nothing** — **so the note below is derived from the tree and is offered as the note this change list owes, not as a document's claim to be the one that was asked for.**

- **IF YOU READ A THROWING BODY'S INNER REFUSAL OUT OF A LOG ENTRY, YOU NOW READ A SUMMARY** (`D-74`). **The entry names the inner refusal's `status`, its entry count and its first message, and NOT its log** — a consumer that walked `entry.message` for the inner form must stop; **where the host is a constraint body, the value the body threw is STILL carried as itself under `Symbol.for('provident-storeroom.inner-refusal')`** (`D-55` item `1`, unmoved), **and a listener's throw has always crossed as itself.**
- **IF YOU INFERRED "NOTHING WAS DISCARDED" FROM AN ABSENT `discarded` OR FROM `[]` ON A WRITE, RE-READ IT** (`D-75`). **The member is now on `write` and `rollback` records as well as a `delete`'s receipt, its entries are one per raise at any count, and `[]` now means exactly what it says on every one of them.**
- **AND IF YOU RETRY ON A CAUGHT `ConstraintPassRefused`, YOUR RETRY POLICY IS THE THING THAT MUST CHANGE, NOT THE LIBRARY** (`D-76` item `2`). **The status can arrive from a listener's refused act with your own write already landed; do not retry on the answer — read the address you wrote** (item `4` above; the guide's `§6.5a`).
- **AND ONE THING NO CONSUMER MUST CHANGE: NOTHING ELSE ON `main` SINCE `v1.5.0` MOVES A SHAPE, A MEMBER, A STATUS, A RANK OR A BOUND.** **The eleven version cells read `1.5.0`, `LogEntry` keeps its five members, the closed set keeps its twenty, and the kernel's `KC` set keeps its nine.** (`D-74`; `D-75`; `D-76`; `D-57`.)

**7 · ★ THE FAILURE FORM IS FOUR MEMBERS — `address`, THE ACT THAT WAS REFUSED — AND THAT IS A BREAKING CHANGE THIS RULING ACCEPTS (`D-77`).** **WHAT WAS WRONG, MEASURED:** a caller's OWN act refused and a caller's act that PASSED while a LISTENER's act was refused **cross with the same `status`, the same `message`, the same keys and the same two log entries** — only the `opId` differs, **and a refused act answers no `op` for you to key against** — so **you read `ConstraintPassRefused` and concluded your write did not happen, while the store says it did.** **WHAT YOU GET NOW: the fourth member, `address`, the ADDRESS the refusal is about** — a segment array in the domain you write with, or `null` where the refusal names no act at an address. **COMPARE IT WITH THE ADDRESS YOU WROTE: equal means YOUR OWN act was refused (your write did not happen — a retry is yours to make); different means a LISTENER's act was (your own write STANDS, and a retry would apply it twice).** **THE FORM IS `{status, message, log, address}`, `Object.keys(caught)` reads `["status","message","log","address"]` and its length is `4` on EVERY arm** — on the `cfg`-side refusals and the load-path arm as much as on a refused write, with `address` `null` where nothing is nameable. **NOT A FIFTH STATUS**: the closed set stays twenty and the member carries an address, never a code. **NOT A HEURISTIC**: the package authors it at the refusal's own crossing. **AND THE MEMBER IS NEVER ABSENT** — *"a member absent on some arm is the `DEF-AH` defect wearing a new name"* — which is why the flatness reading of `1.5.0`'s form holds at four exactly as it held at three. (`D-77`; the cells `tests/e2e/discard-witness.mjs`'s `DW-19.1`–`DW-19.3`.)

- **IF YOU COMPARE `Object.keys(caught)` WITH THREE NAMES, IT NOW READS FOUR** (`D-77`): a census pinned to `["status","message","log"]` or to a length of `3` is a census of `1.5.0`'s form and must re-derive. **A consumer that reads `caught.status` and nothing else is unaffected — and is exactly the consumer this member exists for.**

---

## §1.5.0 · **CUT AND PUBLISHED — tag `v1.5.0`** — what that release carries: the twenty-seven commits on `main` past `v1.4.0`, derived from the tree

**⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.5.0 · **PREPARED** — what `1.5.0` carries: the twenty-seven commits on `main` past `v1.4.0`, derived from the tree`"*, AND IT IS CORRECTED AT ITS OWN LINE, 2026-10-29.** `RCA-8(g)` ANNOTATE-BESIDE: **the withdrawn bytes are quoted above, every paragraph of this section below stands BYTE-FOR-BYTE as the reading of its own date, and nothing is deleted.** **THE DEFECT IS THE `DEF-AC` CLASS AT ITS FOURTH ITERATION: A HEADING THAT DENIED THE RELEASE ITS OWN TAG NAMES.** **The tag set at this date reads `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0` · `v1.4.0` · `v1.5.0`; the tag `v1.5.0` names the tree `43c8442`, whose `bindings/js/package.json` reads `"version": "1.5.0"` at its own bytes** (`git show v1.5.0:bindings/js/package.json`), **whose five `optionalDependencies` pins read `1.5.0` with it, and whose five platform manifests' `version` fields read `1.5.0` with them — eleven cells, one version.** **SO THE HEADING NOW READS `CUT AND PUBLISHED — tag `v1.5.0``, which is a PAST-TENSE RECORD OF A RELEASE AND NOT A CLAIM ABOUT THE TREE YOU ARE READING** — the tag set is the record of what has been cut, and the state of the current tree's version is not a document's to state (`D-57`, and this file's head clause, which stands). **AND THE COUNT BELOW IS ONE SHORT OF THE TAG'S OWN: `git rev-list --count v1.4.0..v1.5.0` reads `28`, and the twenty-eighth is `43c8442` itself — the preparation commit the tag carries, which writes the guide, this change list and the manifest and declares nothing a consumer meets.** **AND WHAT THE SECTION BELOW DECLARES IS UNMOVED BY THE CORRECTION: the restore mark's bump (`D-63`), `seq`'s retirement (`D-65`), the drop (`D-58`), one registration and one reach (`D-66`–`D-69`), `pending`'s emptying, the derived index (`D-70`) and the listener's independence with its nesting (`D-71`–`D-73`) — those are `1.5.0`'s content, they travelled in its tarball, and a consumer who installed `1.5.0` has them.** (`D-57`; `git tag --list`, `git show v1.5.0:bindings/js/package.json` and `bindings/js/package.json` read at their own bytes this date.)

**⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.5.0 · **PREPARED** — what `1.5.0` carries: the eleven commits on `main` past `v1.4.0`, derived from the tree`"*, AND ITS COUNT IS CORRECTED AT ITS OWN LINE, 2026-10-29.** `RCA-8(g)` ANNOTATE-BESIDE: **the withdrawn bytes are quoted above, every paragraph of this section below stands BYTE-FOR-BYTE as the reading of its own date, and nothing is deleted.** **THE COUNT MOVED BECAUSE THE TREE DID**: the section was written when `git describe` read `v1.4.0-11-g90f810c`, and **the sixteen commits after that reading — `c3c61ab` through `a3312b7` — carry the rulings and the code changes this section's items `5` through `8` declare.** **A HEADING THAT UNDERCOUNTS THE COMMITS IT PREPARES IS THE `DEF-AC` CLASS AT ITS MILDLEST AND IS CORRECTED RATHER THAN ANNOTATED AROUND, because the count is the one figure this section's own arithmetic prints.** (`D-57`; `git describe` at `v1.4.0-27-ga3312b7`.)

**⟶ THIS SECTION IS NEW, 2026-10-28, AND IT STATES THE VERSION AND NOT THE CUT-STATE.** `RCA-8(g)` ANNOTATE-BESIDE: **no byte above moves and no byte of the sections below moves; this section is added beside them and is read through the same head clause as the rest of this file.** **THE FIGURE THIS SECTION MAY BE RIGHT ABOUT, AND ITS GENERATOR:** the version line at this file's head is generated from `bindings/js/package.json`'s `version` and asserted by `scripts/publish.sh --figures` in three shipped documents — **`1.4.0`, at eleven cells that move together and never singly**: the main manifest's `version`, its five exact `optionalDependencies` pins, and the five `bindings/js/platforms/*/package.json` `version` fields; and `bindings/js/build.rs` stamps the artefact from that manifest, so the built artefact's `version()` answers `1.4.0`. **AND THE TREE IS ELEVEN COMMITS PAST THE TAG THAT NAMES THOSE CELLS:** `git describe` reads `v1.4.0-11-g90f810c`, `git rev-list --count v1.4.0..HEAD` reads `11`, and **no version bump is in any of the eleven** — the manifest still reads `1.4.0` after all of them. **THE TAG SET IS A RECORD OF RELEASES, PAST TENSE, AND NOT A CLAIM ABOUT THIS TREE:** `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0` · `v1.4.0`. **AND NOTHING IN THIS SECTION CLAIMS WHETHER `1.5.0` IS CUT: the cut-state is not a document's to state** (`D-57`; the head clause of this file; the `§1.4.0` correction above, which is the same defect met one section higher).

**⟶ AND THAT PARAGRAPH'S TWO FIGURES ARE RE-READ AT THE TREE THIS SECTION PREPARES, 2026-10-29 — THE TREE IS TWENTY-SEVEN COMMITS PAST `v1.4.0`, AND THE ELEVEN CELLS READ `1.5.0`.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date (`v1.4.0-11-g90f810c`) and is read THROUGH this clause; not one byte of it is deleted.** **THE COUNT:** `git rev-list --count v1.4.0..HEAD` reads `27` and `git describe` reads `v1.4.0-27-ga3312b7`, so its *"ELEVEN COMMITS"* is read as TWENTY-SEVEN. **THE VERSION: `bindings/js/package.json`'s `version` now reads `"1.5.0"`, its five exact `optionalDependencies` pins read `1.5.0` five times, and the five `bindings/js/platforms/*/package.json` `version` fields read `1.5.0` — ELEVEN CELLS, ONE VERSION, moved TOGETHER in this act — and `npm run build` stamps the artefact from that manifest, so `version()` answers `1.5.0` at the built artefact AND at a package installed from it.** **SO ITS SENTENCE *"no version bump is in any of the eleven — the manifest still reads `1.4.0` after all of them"* IS THE READING OF ITS OWN DATE, and the bump is THIS preparation's.** **AND THE TAG SET IS UNMOVED BY THE BUMP AND STILL A RECORD OF RELEASES, PAST TENSE:** `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0` · `v1.4.0` — **no `v1.5.0` among them** — **and nothing in this section claims whether `1.5.0` is cut** (`D-57`; the head clause of this file).

**THE ELEVEN, DERIVED FROM THE TREE THEY LANDED ON, EACH STATED FOR A CONSUMER — AND THE HONEST SHAPE OF THE ELEVEN IS `3 + 8`.** **THREE OF THEM MOVE THE PACKAGE**: `d862448` carries `D-58` (*"No insight into a running commit, and nothing retained after the handoff"*), `85b0174` carries `D-63` (*"Bump the mark when a sweep ends valid: the restore target is the last validated state"*), and `90f810c` carries `D-65` (*"Drop seq from the log entry: the array index is the position"*). **THE OTHER EIGHT RECORD RULINGS AND MOVE NO BEHAVIOUR** — `e5acd49` (`D-58`), `9b58c4a` (`D-59`), `0f113bf` (`D-60`), `e152c0b` (`D-61`), `15444fd` (`D-62`), `8dd2593` (`D-63`), `47ec840` (`D-64`), `b9936ac` (`D-65`) — each of which is a ruling written down beside the code that implements it, and none of which a consumer can observe except by reading them.

**⟶ AND THE SAME ARITHMETIC IS DONE AGAIN FOR THE WHOLE TWENTY-SEVEN, 2026-10-29 — THE HONEST SHAPE IS `6 + 16 + 5`.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this clause; its `3 + 8` is kept and its METHOD is reused rather than replaced — each of the twenty-seven is read at the paths it touched and sorted by what those paths are.** **SIX OF THE TWENTY-SEVEN MOVE THE PACKAGE** — a line under `bindings/js/src/` or `src/store.rs` changes, so a consumer can observe it: `d862448` (`D-58`: the log reader's live arm refuses, and the closed record is dropped to its four members), `85b0174` (`D-63`: the restore mark bumps when a sweep ends valid), `90f810c` (`D-65`: `seq` leaves `LogEntry`), `c3c61ab` (`D-66`: the pass asks a descendant the act touched), `3384d2e` (the touched set made symmetric: a path that disappears changed as surely as one that appears), and `6fd15a7` (`D-69`: the registration is restored, so the store's `triggered` names both kinds and the pass FILTERS it instead of walking its own registry). **SIXTEEN ARE RECORD RULINGS AND MOVE NO BEHAVIOUR** — each writes `strata/decisions.md` and no other path: `e5acd49` (`D-58`), `9b58c4a` (`D-59`), `0f113bf` (`D-60`), `e152c0b` (`D-61`), `15444fd` (`D-62`), `8dd2593` (`D-63`), `47ec840` (`D-64`), `b9936ac` (`D-65`), `535b56a` (`D-66`), `948dcde` (`D-67`), `5fa84e6` (`D-68`), `c37adae` (`D-69`), `2ba405e` (`D-70`), `aaedc73` (`D-71`), `5331993` (`D-72`) and `92d2ec6` (`D-73`). **AND FIVE CARRY DOCUMENTS AND MOVE NO CODE** — the guide, this change list and the `docs/L1` records: `7e81e7f` (this change list, the guide and the L1 declarations regenerated to the tree), `a1c65d9` (`D-70`'s rule of use declared), `80c2ca7` (the reach's two readings reconciled and the three asymmetries declared), `fc81fd3` (`D-71`'s independence and `D-72`'s nesting declared) and `a3312b7` (`D-73`'s throw and its consequence declared). **`6 + 16 + 5 = 27` ✓ — the count is the whole of the twenty-seven past `v1.4.0`, and no commit is counted twice.**

**1 · ★ THE RESTORE MARK BUMPS WHEN A SWEEP ENDS VALID — THE RESTORE TARGET IS THE LAST VALIDATED STATE, NOT THE STATE THE COMMIT OPENED AT (`D-63`).** **THE ARCHITECT, VERBATIM: *"After the constraint sweep ends in a valid state, bump the restore mark. The passing constraint state marks the new next valid state."*** **`AT `1.4.0`:** a refused edit rolled the commit back to the state it OPENED at — every edit the commit made was undone, a successful write's included. **NOW:** the restore is told a POSITION and the position MOVES FORWARD — it starts where the commit opened and it moves to the store's own journal position at every constraint sweep that ends valid, **before the listeners are delivered.** **WHAT A CONSUMER SEES, IN THE THREE ARMS THE RULING'S TERM OF ART MAKES DIFFERENT: a VALIDATED EDIT STANDS against a later refusal; a REPAIR'S WRITE does not stand**, because a repair's write is atomic with the write that asked for it and the sweep that follows judges the pair together — **and a LISTENER'S WRITE SURVIVES**, because the delivery runs after the bump and the sweep that validated it is the sweep the mark now names. **So *"the state it opened at"* is now the answer to exactly one case — a commit whose constraint sweep never passed — and it is `1.4.0`'s behaviour there and stays.** (`D-63`; `D-38`'s restore; the `DEF-AN` measurement, whose pair refuses on the FIRST check so nothing moves the mark and its reading is unchanged; `tests/e2e/discard-witness.mjs`'s `W12` arms `DW-12.1`–`DW-12.4`, with the re-derived readings in `tests/e2e/in-commit-restart.test.mjs`, `tests/e2e/direct-pass-restart.test.mjs`, `tests/e2e/downstream-claims.test.mjs` and `tests/e2e/def-ae-restore-mark.test.mjs`.)

**2 · ★ `seq` IS DROPPED FROM `LogEntry` — SIX MEMBERS TO FIVE, `kind` · `id` · `opId` · `message` · `state`, AND THAT IS A BREAKING SHAPE CHANGE FOR A TYPED CONSUMER.** **THE RULING, THE ARCHITECT, ONE WORD: *"Drop it"*** (`D-65`) — and `DEF-AI`'s own demand had offered the route: *"mint `seq` from the attempt's counter, **or omit the member**."* **THE REASON IS THE ONE THIS FILE KEEPS MEETING AT A SMALLER SCALE: `seq: log.length + 1` IS THE INDEX OF THE ENTRY BEING APPENDED, a second copy of a fact the array already carries** — the same class as a hand-maintained allowlist, a hand-named runner chain or a hand-transcribed census. **WHAT A CONSUMER SEES:** a log entry carries **five** own members and **`entry.seq` is `undefined`**; **the position survives as the index and is asserted rather than assumed** — `log[0]` is the entry, `log.indexOf(entry)` answers its position, and a commit's entries run `0..n-1` continuously across its attempts. **A TYPED CONSUMER READING `entry.seq` MEETS A COMPILE ERROR, WHICH IS THE HONEST FORM OF THIS CHANGE**; a JavaScript consumer reading it meets `undefined`, and **`JournalOp.seq` IS UNMOVED** — the store's own append ordinal is a different subject and is now impossible to confuse with the commit's, because the commit's no longer has a member to be confused with. (`D-65`; `index.d.ts`'s `LogEntry`; `bindings/js/README.md` and the shipped guide each carry the retirement at their own home.)

**3 · NO INSIGHT INTO A RUNNING COMMIT, AND NOTHING RETAINED AFTER THE HANDOFF (`D-58`).** **THE ARCHITECT, VERBATIM: *"The client does not need any insight into the current state of a commit/attempt before it completes. Don't expose any of it. After a commit/attempt resolves/rejects, the store does not need to retain the message log or other client-returned data. Don't retain it."*** **WHAT A CONSUMER SEES, IN TWO PARTS. (i) `K-4` REFUSES A LIVE ATTEMPT WITH `KC-7`**, the same member `K-5` already used, in the same shape and the same message family — so an in-flight list is no longer a thing you can read at all. **(ii) THE CLOSED RECORD IS `{attempt, ops, outcome, rollback}` AND THE LOG IS LET GO**: the record a commit resolves or rejects with carries those four and no message list, and the entries on the refusal you caught (or on `report`'s return) are **the only copy** — sealed at the handoff. **WHAT THAT COSTS, SAID PLAINLY:** on an arm whose handoff carries no list at all — a repair body that throws, and a PASSING `write`, whose answer is `{op, watched, triggered}` and has never carried one — the entries are no longer readable after the call. **That is the ruling's price and not a defect.** (`D-58`; `d862448`; `tests/e2e/discard-witness.mjs`'s `DW-11.1`–`DW-11.4`, each RED under its own revert.)

**4 · AND THE TWO HEADLINES A CONSUMER MEETS THAT ARE NOT THE ELEVEN'S, NAMED SO NOBODY ATTRIBUTES THEM TO `1.5.0`.** **`D-56`'s ancestor set and the `delete`'s own attempt with its `CommitRecord` are `§1.4.0`'s content and travelled in the `1.4.0` tarball** — `4449a93`, `1d23abc` and `1090e1e` are all ancestors of the tag `v1.4.0`, and the section above declares them in full. **THEY ARE RESTATED HERE ONLY AS THE FACTS A `1.5.0` READER STILL MEETS, WITH THEIR TWO CONSEQUENCES NAMED BECAUSE THEY ARE THE ONES A CONSUMER TRIPS OVER:** **① a pair is asked for acts at or below its own address — so a pair at `['window','tabs']` IS asked for a `delete` at `['window','tabs','landingPage']`**, because the value read at a prefix contains its subtree; **and because the pass's set now EQUALS the store's `triggered` set, a passing write now EMPTIES `pending`** (measured `1` → `0`) — the handles the pass checked off are exactly the handles the record carried. **② a `delete` is an editing verb with its own attempt, its own pass and its own `CommitRecord`**, whose four follow-ons are the record's ADOPTION by the entry, the `pending` residue, the `file`-tier SAVE, and `K-4`/`K-5` answering a delete's record BY REFERENCE where they refused `NO-REF` before. **AND NO KERNEL ITEM IS OWED FOR IT: `K-7` `commitRemoval` is owed only if a consumer must drive a delete's attempt directly, and none can — the verb is the surface** (`D-57`'s second half; the kernel's surface stays `K-1`…`K-6`). (`D-56`; `D-57`; `D-3`; `D-44`; `D-53`; `§1.4.0`'s items 1 and 2, which declare both in full.)

**5 · ★ ONE REGISTRATION, ONE REACH — A CONSTRAINT AND A LISTENER ARE THE SAME MECHANICAL THING TO THE STORE, `triggered` NAMES BOTH KINDS IN ONE LIST, AND THE PASS FILTERS IT RATHER THAN WALKING A REGISTRY OF ITS OWN (`D-56` · `D-66` · `D-67` · `D-68` · `D-69`).** **THE ARCHITECT, VERBATIM** (`D-68`): *"a constraint is mechanically the same as a listener from the perspective of the rust store triggers. The distinction is whether it is registered as a constraint (and thus run in the constraint loop and expecting the constraint signature format) or as a listener (and thus running after constraints and not being confined to the constraint signature)"*. **WHAT A CONSUMER SEES, IN FOUR SENTENCES.** **(i) ONE PREDICATE, COMPUTED WHERE THE VERSIONS LIVE:** a registration fires when **its address is a PREFIX of the act's OR the act TOUCHED it** — the touched set being the written value's paths unioned with what it replaced, and, for a `delete`, the whole subtree it removed — so **a listener bound at a strict descendant of a deleted address FIRES** where the prefix-only rule never reached it, and a pair standing there is ASKED. **(ii) ★ A PAIR AT AN ANCESTOR IS ASKED FOR A DESCENDANT'S ACT, AND SO IS A LISTENER:** a pair at `['window','tabs']` is asked for a `delete` at `['window','tabs','landingPage']`, and its refusal crosses and rolls the delete back — because the value read at a prefix contains its subtree (`D-56`, whose `1.4.0` half is `§1.4.0` item 1) — **while a LISTENER bound at that ancestor fires for the same act, which the prefix rule never had to be taught.** **WHAT THIS RELEASE ADDS TO THAT DIRECTION IS THE REVERSE ONE**: `D-67` measured the listener SILENT on a touched descendant while the pass asked the pair standing there, and `D-69`'s restored registration closed it — **so the two kinds now share ONE reach, computed in Rust where the per-tier versions live.** **(iii) A PAIR AT A DESCENDANT IS ASKED ONLY WHEN THE ACT TOUCHED IT:** `write(['a','b'], {c,d})` asks `['a','b','c']` and `['a','b','d']` and **not** `['a','b','e']` — the criterion is TOUCHED and not "descendant" (`D-66`). **(iv) AND THE ELEMENT CARRIES NO KIND**, because **a registration is a HANDLE AND A BODY and a constraint already has both** — its `id` is the handle (`D-29`) and its `constraint` is the body (`D-26`), so the inert listener body the old `store.register(home, noopListener)` fabricated does not return (`D-69`). **WHAT THAT MEANS FOR YOU: `triggered` and `pending` name listener handles AND constraint `id`s in ONE list, and which is which is your own registry's answer.** (`D-56`; `D-66`; `D-67`; `D-68`; `D-69`; `6fd15a7`; `c3c61ab`; `3384d2e`; the guide's `§6.3` item 2, `§6.4` and `§7.6`–`§7.9` clauses of the same date; `tests/e2e/discard-witness.mjs`'s `DW-13`/`DW-14` cells.)

**6 · ★ `pending` EMPTIES ON A PASSING WRITE — BECAUSE THE PASS'S SET NOW EQUALS THE STORE'S FIRED SET.** **WHAT MOVES:** `record.pending` is seeded whole from the store's `triggered` set and every handle the pass EVALUATES is checked off by identity, so **the CONSTRAINTS the store named leave `pending` as the pass passes them and the member reads `[]` on an arm whose fired set is constraints only** — *measured `1` → `0`* — **and a LISTENER's handle is the one element that STAYS, because the pass evaluates constraint rows and a listener is the DELIVERY's work (measured at `K-2` `['anc-pair','watch-child']` → after the pass `['watch-child']`).** **WHAT IT MEANS, SAID PLAINLY: `pending` IS NO LONGER A LIST OF "WHAT I STILL OWE A DELIVERY TO" — IT IS THE LIST OF HANDLES THE PASS DID NOT EVALUATE.** A non-empty `pending` therefore means one of two things and only two: **the write FAILED** (the record's `pending` is the whole returned set, because a failing arm checks nothing off), **or a handle stands in `triggered` that the pass holds no row for** — the one reachable state being a registration whose own body refused it at the registration instant (`ConstraintRefusedAtRegistration`, state `2`), which leaves the store-side entry standing, fires nothing, silently. **AND AT `K-2` THE MEMBER NOW CARRIES BOTH KINDS**: a write whose pair stands at a TOUCHED descendant and whose listener stands at an ancestor carries **`2`** elements at `K-2` where the prefix-only composition carried **`1`**, and **`1`** after the pass (the listener's handle, which is the delivery's work and never the pass's). (`D-56`; `D-69`; `6fd15a7`; the guide's `§6.4` clauses of the same date; `tests/e2e/discard-witness.mjs`'s `DW-14.3`/`DW-14.4`.)

**7 · ★ A DERIVED ADDRESS IS NOT AN ADDRESS — AN INDEX INSIDE A COLLECTION IS DERIVED, AND A REGISTRATION THERE IS A REGISTRATION ON A VALUE THE STORE NEVER WROTE (`D-70`).** **THE ARCHITECT, VERBATIM:** *"A constraint/listener that cares about a derived value like the vec index should listen to the vec, not the contained node"*. **WHAT A CONSUMER SEES:** `delete(['v',0])` moves `{b:2}` from `['v',1]` to `['v',0]`, **and a listener at `['v',1]` does not fire** — correctly, because **the store wrote `['v',0]` and replaced nothing at `['v',1]`**, and the `triggered` list is right to be empty. **THE RULE: register at the CONTAINER (`['v']`) and READ what you care about** — a container listener fires once, is handed the ACT's address `['v',0]`, and its body's read at `['v']` answers the renumbered collection. **AND THE TWO KINDS HAVE DIFFERENT JOBS, WHICH IS THE SENTENCE TO CARRY AWAY: IF YOUR CALLBACK CHANGES THE STORE IT IS A CONSTRAINT OR A REPAIR; IF IT TELLS THE WORLD IT IS A LISTENER** — *"Functions that automatically produce changes in the stored data should be written as constraint/repair, not as listeners, because constraint/repair has loop guards while listeners don't"*, and *"The use case for listeners is for updating external code with new data"*. **NO MEMBER, STATUS, KERNEL ITEM OR BOUND MOVES: this is a rule of USE over a surface already measured.** (`D-70`; `a1c65d9`; `80c2ca7`; the guide's `§7.9` of the same date; `tests/e2e/discard-witness.mjs`'s `DW-15.1`–`DW-15.3`.)

**8 · ★ A LISTENER IS INDEPENDENT OF YOUR COMMIT, AND DELIVERY NESTS — its refusal is CONTAINED, its THROW is NOT, and the windows are nested synchronous calls on one thread (`D-71` · `D-72` · `D-73`).** **THE INDEPENDENCE, VERBATIM** (`D-71`): *"A listener is independent of the commit record of the triggering caller. The caller does not need to know about the outcome of the listeners."* **SO: a listener runs in its own commit, its OUTCOME IS THAT COMMIT'S, and a listener's refusal does NOT fail the write that fired it** — your write already passed every constraint and already answered before the delivery ran. **AND THE THROW IS THE EXCEPTION, BY RULING** (`D-73`, verbatim: *"Keep the throw so that the client can log errors cleanly"*): **a listener that throws makes YOUR write throw the listener's own error, identity equal, and ANSWER NOTHING — while its DATA HAS ALREADY LANDED** (the commit resolved before its delivery ran; what the throw takes away is the answer, not the write). **THE PRACTICAL HAZARD, WRITTEN: a client that retries on error RE-APPLIES A WRITE THAT ALREADY SUCCEEDED**, and the error carries no depth, handle or address — *"A contained throw is an error nobody can log"* is the ruling's reason, and **a listener body's own `catch` is the only containment arm there is.** **AND THE NESTING** (`D-72`): `outer write → its commit → its pass → its delivery → listener A → A's write (a NEW commit) → A's pass → A's delivery → listener B → …` — **windows live at once, NESTED, every level a synchronous call**, so *"interleaving"* is **nested suspension**: A's whole chain runs to completion before the window that fired it invokes its next listener. **FOUR PROPERTIES, NONE DECLARED ANYWHERE UP THE STACK:** **depth is UNBOUNDED** (no counter, no cap, no instrument); **the CROSS-WINDOW ORDER is real and undeclared** (a nested chain precedes the window's next listener — the machine provides it and no clause promises it); **RE-ENTRANCY IS UNAVOIDABLY OPEN** (a listener that writes at the address it was delivered for fires itself again); **and NOTHING ABOVE SEES BELOW** — a chain that fails at depth three is indistinguishable, to the original caller, from one that never ran, **except by the throw, which crosses every hop as the same error object.** **MEASURED 2026-10-29 ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY, ALL THREE WAYS:** the throw (`write(['a'])` threw the listener's `Error`, `===` true, and answered `undefined`, with `['a']` reading `1`); the containment beside it (a listener's refused write crossed nothing, the caller's record carried no status and no `log`, and `['b']` read ABSENT, while the same caller writing `['b']` directly WAS refused); and the depth-two throw (surfacing first at the inner write, then reaching the original caller with identity preserved, and the original write unanswered — while a listener body that catches instead leaves the original write ANSWERING ITS OWN RECORD). (`D-71`; `D-72`; `D-73`; `fc81fd3`; `a3312b7`; the guide's `§6.5`, `§6.5a` and `§6.6` of the same date.)

**NO VERSION BUMP IS PROPOSED BY THIS SECTION AND THE ELEVEN VERSION CELLS STAY AT `1.4.0` — AND WHETHER `1.5.0` IS CUT IS NOT WRITTEN HERE, BECAUSE IT IS NOT A DOCUMENT'S TO WRITE.**

**⟶ AND THE FIRST OF THOSE TWO CLAUSES IS SUPERSEDED BY THIS PREPARATION, 2026-10-29 — THE BUMP IS MADE, THE SECOND CLAUSE IS NOT, AND THE THREE ARE NOW SIX.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this clause; its second half — *"whether `1.5.0` is cut is not written here, because it is not a document's to write"* — is UNMOVED and governs every clause of this section.** **SUPERSEDED: *"NO VERSION BUMP IS PROPOSED BY THIS SECTION AND THE ELEVEN VERSION CELLS STAY AT `1.4.0`"* — the bump IS this preparation's, and the eleven cells read `1.5.0`** (the clause at this section's head states the manifest, the pins, the five platform manifests and the rebuilt artefact's `version()`; `scripts/publish.sh --figures` asserts the one generated line in three shipped documents). **AND ITS LAST SENTENCE IS RE-READ TOO: *"THE THREE COMMITS THAT MOVE THE PACKAGE"* reads SIX** — `d862448`, `85b0174`, `90f810c`, `c3c61ab`, `3384d2e` and `6fd15a7` — **because the arithmetic above re-sorts all twenty-seven and six of them change a line the package ships.** **The honesty the paragraph declares is unmoved: a consumer can read every commit that moves the package before installing a release that carries them.** **The three commits that move the package are declared here so that a consumer can read them before installing a release that carries them, and so that no reader has to infer them from a tarball's contents** — the `DEF-AC` honesty this whole file has been corrected toward, and the same honesty the corrected heads above owe.

---

## §1.3.0 · **CUT AND PUBLISHED — tag `v1.3.0`** — what that release carries, ten commits past `v1.2.0`

**⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.3.0 · **PREPARED — NOT CUT** — what `1.3.0` carries, ten commits past `v1.2.0``"*, AND IT IS CORRECTED AT ITS OWN LINE RATHER THAN ANNOTATED AROUND, 2026-10-28.** `RCA-8(g)` ANNOTATE-BESIDE: **the withdrawn bytes are quoted above, the section's body below stands BYTE-FOR-BYTE as the reading of its own date, and every reading in it that says the release is not cut is read THROUGH the head clause.** **THE DEFECT: the heading denied the release the tag names — `git tag --list` answers `v1.3.0`, the tag names a tree whose `bindings/js/package.json` reads `"version": "1.3.0"` at its own bytes, and the registry carries `1.3.0` — so a reader opening this file met *"PREPARED — NOT CUT"* over a published version.** **That is the `DEF-AC` class one level in, and it is the third iteration of the same class; `D-57` is the ruling that ends the recurrence.** (`D-57`; the head clause above.)

**★ THIS SECTION DESCRIBES A TREE NOTHING CAN INSTALL, AND IT IS MARKED BEFORE IT SAYS ANYTHING ELSE, BECAUSE A MARK
ADDED AFTERWARDS IS THE DEFECT THIS FILE JUST CORRECTED ONE SECTION DOWN.** **THE PUBLISHED RELEASE IS `1.2.0`**: `git
tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0`, the tag `v1.2.0` names a tree whose
`bindings/js/package.json` reads `"version": "1.2.0"` at its own bytes, and the registry carries that release. **THE TREE
THIS SECTION IS DERIVED FROM IS NINE COMMITS PAST IT** — `git describe` reads `v1.2.0-9-g989c216`, `git rev-list --count
v1.2.0..HEAD` reads `9`, and **no version bump is in any of those nine commits: the manifest still reads `1.2.0` at
eleven sites and no tag names this tree.** **SO THE HONEST READING IS THIS: A CONSUMER INSTALLING `1.2.0` GETS `1.2.0`'S
BYTES AND `1.2.0`'S CHANGE LIST (the section below); WHAT THIS SECTION DECLARES IS PREPARED AND NOT CUT, and a prepared
change is not a shipped one.** **No consumer can install any of it yet, and every figure this section prints is a
figure of the TREE and not of a tarball.**

**⟶ AND THE VERSION THIS SECTION DECLARES IS `1.3.0` AT ELEVEN SITES, PREPARED AND NOT CUT, 2026-10-28.** `RCA-8(g)` ANNOTATE-BESIDE: **the ★ paragraph above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this clause; the two sentences of it that the bump supersedes are named here rather than overwritten.** **THE MANIFEST AT ITS OWN BYTES THIS DATE: `bindings/js/package.json`'s `version` is `"1.3.0"`, all five `optionalDependencies` pins are `1.3.0` with it, and the five `bindings/js/platforms/*/package.json` `version` fields read `1.3.0` with them — ELEVEN SITES, ONE REBUILD — and the rebuilt artefact is stamped from that manifest, so `version()` answers `1.3.0`.** **SO *"no version bump is in any of those nine commits: the manifest still reads `1.2.0` at eleven sites"* IS THE READING OF ITS OWN DATE, AND THE BUMP IS THIS PREPARATION'S (a working-tree change, not a commit): the tree is `10` commits past `v1.2.0` — `git describe` reads `v1.2.0-10-g14787b5` and `git rev-list --count v1.2.0..HEAD` reads `10` — and the eleven sites read `1.3.0`.** **AND WHAT THIS SECTION IS AND IS NOT, SAID PLAINLY BECAUSE THE EASIER THING TO GET WRONG IS THAT A BUMP IS A RELEASE: `1.3.0` IS THE PREPARED VERSION — at the eleven sites and in the rebuilt artefact — and it is NOT A RELEASE. `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` and no `v1.3.0`, the registry carries no `1.3.0`, and no consumer can install any of this until the architect cuts the tag.** **The published release remains `1.2.0`, and the section below remains its change list, unchanged and still marked CUT AND PUBLISHED.** (The shipped guide's two generated figures — `scripts/publish.sh --figures` — agree with this clause: the version line reads `1.3.0` and the cut-state sentence reads *"`v1.3.0` DOES NOT EXIST, SO THE RELEASE THIS GUIDE DESCRIBES IS NOT CUT"*.)

**IT DECLARES TWO BEHAVIOUR CHANGES A CONSUMER WILL FEEL, AND THEN FOUR SMALLER ITEMS. THE TWO COME FIRST BECAUSE THEY
ARE THE CONTENT.**

**1 · ★ THE MESSAGE LOG BELONGS TO THE COMMIT NOW — SO A CROSSED REPORT CARRIES MORE ENTRIES THAN `1.2.0`'S DID.**
**`AT `1.2.0`:** the `log` was the **ATTEMPT's** own list — the constraint-judged write inside a commit carried the
entries its own pass appended, and where an attempt was **nested** inside another (a write a constraint body makes, a
repair's own write) the enclosing report carried the **enclosing** attempt's list: the nested refusal's entries were not
in it, and on the arm the downstream filed (`DEF-AK`) the inner refusal's own entry was **REPLACED** rather than joined.
**NOW:** the list belongs to the **COMMIT** — it is taken once per commit off the kernel's frame stack, defined on the
`CommitRecord` under a symbol, and **every attempt in that commit holds a reference to it** — so **a crossed report
carries the entries of EVERY attempt in the commit**, including a nested write made by a constraint body, whose refusal
now shows its own `constraint-check` and `outcome` entries verbatim before the enclosing `outcome` entry. **A CONSUMER
DIFFING `1.2.0` AGAINST THIS RELEASE SEES A REPORT CARRY MORE ENTRIES** — and that is the whole change: what is refused,
what is restored, and which status crosses have not moved with it. **The one declared reach that is still a new list: a
listener's write opens a commit of its own** (*"the triggering commit already passed constraints"*), so its entries are
not in the triggering commit's list; and a pair body asked at a reversal's judgement names no commit, so a write that
body makes opens one.
**AND THE ENTRY'S `seq` IS THE POSITION IN THAT LIST — NOT THE STORE'S JOURNAL ORDINAL.** **`1.2.0`'s declaration said
*"the ordinal of the list it stands in"* and that sentence was read as the journal's** (`DEF-AI`, measured): a refusal's
entry carried `seq` `1` while the store's own journal counter read `41`. **They are two ordinals with two homes:
`JournalOp.seq` is the store's append ordinal that orders the store's record, and this `seq` orders the COMMIT's message
log and nothing else; neither equals the other by design.** **One repair write appends five entries in one list at `seq`
`1..5`, strictly increasing in array order** — the pass's `constraint-check`, the repair's `repair-run`, the repair's
`commit`, the re-run's `constraint-check`, and the terminal `commit`/`outcome` — **and no entry is ever minted from the
store's journal counter.** **Say it to yourself before you count: `log.length` is every entry of the COMMIT, not "how
many constraints were evaluated" and not "how many attempts this write made".**

**2 · ★ A REVERSAL RAISED INSIDE A PASS IS NOW JUDGED — THREE HOSTS CHANGED FROM "A PASS RAN AND THE REVERSAL'S EFFECT
STOOD" TO "REFUSED AND RESTORED".** **`AT `1.2.0`:** a reversal raised where a pass was running could be **left unjudged
with its effect standing**, and the shipped guide said so falsely: *"And every pass that DOES run drains its own restart
request — so the fail-state is bounded by the two acts that run none."* **That sentence is WITHDRAWN AS FALSE** (`D-54`;
measured by the downstream): **a pass no longer consumes a request it did not raise, and the request is carried to the
pass's own terminal state.** **The rule, quoted from the shipped guide:** ***"no pass consumes a restart request it did
not raise, and a request raised inside a pass is carried to that pass's own terminal state and judged there — once,
never per step."*** **THE THREE HOSTS, EACH MEASURED, BEFORE → AFTER:**
- **A REPAIR BODY'S REVERSAL** — the judge was asked the pairs `[9,7]` and never `[5]`, with `0` judge invocations and the
  refused `5` standing; **now the pairs asked are `[9,7,5]`, the invocation count is `1`, the write crosses
  `ConstraintPassRefused`, and the store reads `9`** — the refused value does not stand.
- **A REVERSAL INSIDE A `delete`'S CONSTRAINT PASS** — the same `[9,7]`/`0`/standing-`5` reading, and **now the same
  `[9,7,5]`/`1`/`9`**, with the delete's own `discarded` witness reading `[]` because nothing was discarded.
- **A REENTRANT REVERSAL-THEN-WRITE** — the write used to answer with the reversal's effect standing at `5`; **now it
  REFUSES and the store reads `9`.**
**AND THE TWO DECLARED PASSLESS WINDOWS STILL RUN NO PASS, WITH THEIR EXITS UNCHANGED: a `delete`'s LISTENER DELIVERY
(a listener invoked by a delete's delivery runs no constraint pass, so a reversal raised inside it is unjudged and its
effect stands, and the `discarded` witness reports the discard) and a REGISTRATION'S OWN EVALUATION (`addConstraint`'s
and `constraintRegister`'s evaluation of a supplied body runs no pass, so an action raised there is unjudged and its
effect stands).** **Their exits are the two the guide declares and they are unchanged: RELOAD THE FILE — a restore that
moved a `file`-tier version saves the restored image, so a fresh boot over that path returns to judged bytes — or
REGENERATE THE STORE, replaying your writes.** **A reversal raised by the listener a `delete`'s delivery fires INSIDE a
pass is a THIRD case and not the declared window: that pass's terminal check now asks the pairs at the state the
reversal left.** `D-42`, `D-38`'s once-per-terminal-state rule, the restart budget (`3`), its spend-and-never-reset rule
and its failing-closed arm are **untouched**; what changed is where the request is carried and who may consume it.

**3 · THE RESTORE NO LONGER REPORTS A SUCCEEDED WHOLE-COMMIT UNDO AS A FAILURE (`DEF-AJ`).** **`AT `1.2.0`:** a message
could say *"0 of the 1 address it moved stand again"* when **every** address stood: the restore verified each moved
address against the watch's **pre-reversal capture** while the store returned it to the **journal mark the commit cached
at its OPENING**, and on the restart arm the commit had already landed `7` before the reversal ran, so the mark's `9`
did not equal the capture's `7` and a complete whole-commit undo read as a failure. **NOW:** a successful restore counts
every measured address restored to the mark, a standing **past** the capture is recorded as a `wholeCommit` and spoken as
such with the baseline named, and **only a refused mark, a cacheless window or an unrestored address say NOT undone.**
The message's meaning is the thing that moved; nothing about what a refusal restores moved with it.

**4 · THE `discarded` WITNESS NAMES WHAT MOVED, NOT THE WHOLE WATCHED REGISTRY (`DEF-AM`).** A delete's `discarded`
carries `addresses` — the addresses the discarded check would have been asked at — and **those are now the addresses the
reversal actually MOVED, measured once against the standing the store holds, and not every address the registry
watches.** **Measured: two pairs in the registry, one moved, and the witness names one.** **The witness is still a
WITNESS and not a repair** — the delete answers what it answered, throws nothing, and the reversal's effect still
stands in that declared window — and it is still **non-enumerable** (`Object.keys` never shows it; a spread copy loses
it).

**5 · THE CHANGE LIST ITSELF NOW SHIPS IN THE TARBALL (`DEF-AC` (a)).** **`RELEASE-NOTES.md` is the SEVENTH row of the
main manifest's `files` allowlist**, staged **byte-for-byte** from this repository-root home to the packaging root as
`bindings/js/RELEASE-NOTES.md` by the release's assembly — the same mechanism that lands `README.guide.md` and the
`LICENSE` copy — and the preflight REFUSES a drifted landing. **So a consumer installing the next release has this
change list at `node_modules/provident-storeroom/RELEASE-NOTES.md`**, and the packed member set reads **`20` bare / `21`
assembled** (`1` manifest + `5` root files + `13` entry modules + `1` kernel = `20`, plus the licence at assembly).
**This is the half of `DEF-AC` that is already cut in `1.2.0` and it stays cut in this tree.**

**6 · THE PREFLIGHT GENERATES AND ASSERTS THE SHIPPED GUIDE'S VERSION LINE AND CUT-STATE (`DEF-AC` (b)).** **The
guide's version line and cut-state sentence used to be HAND-WRITTEN, which is how the guide came to deny the release it
travelled in.** **Now `scripts/publish.sh` GENERATES both from `bindings/js/package.json`'s `version` and `git tag
--list`, and its preflight REFUSES when the shipped guide's two marked lines disagree** — a hand-written *"IS NOT CUT"*
beside a generated *"IS CUT"* fails, and the generated line passes; `--figures` runs that one check read-only. **A
hand-written line that contradicts the manifest can no longer travel.**

**NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT, NO VERSION BUMP IS PROPOSED, AND THE ELEVEN VERSION SITES STAY AT
`1.2.0`.** **The two behaviour changes are declared here because a consumer must be able to read them BEFORE the cut and
must not be told they are in a tarball that does not carry them** — the same honesty the corrected head above owes.

**⟶ AND WHAT THE PARAGRAPH ABOVE SAYS ABOUT THE FIGURES IS SUPERSEDED BY THIS PREPARATION, 2026-10-28 — WHAT IT SAYS ABOUT THE CUT IS NOT.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this clause.** **UNMOVED: *"NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT"* — `git tag --list` carries no `v1.3.0`, the registry carries no `1.3.0`, and a consumer cannot install any of this.** **SUPERSEDED: *"NO VERSION BUMP IS PROPOSED, AND THE ELEVEN VERSION SITES STAY AT `1.2.0`"* — the bump IS this preparation's, and the eleven sites read `1.3.0`** (the clause at this section's head states the manifest, the pins, the five platform manifests and the rebuilt artefact's `version()`). **The two behaviour changes are unchanged, and they are `1.3.0`'s content: what a consumer installing `1.2.0` gets is `1.2.0`'s bytes, and this section is the change list of the version being prepared, not of a released one.**

---

## §1.2.0 · **CUT AND PUBLISHED — tag `v1.2.0`** — what that release adds, derived from the tree

**⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.2.0 · **UNRELEASED** — what the release in preparation adds, derived from
the tree`"*, AND IT IS CORRECTED RATHER THAN ANNOTATED AROUND, 2026-10-28.** `RCA-8(g)` ANNOTATE-BESIDE: **the withdrawn
bytes are quoted above and the section's body below stands BYTE-FOR-BYTE as the reading of its own date; every reading
in it that says the release is not cut is read THROUGH the head clause and the clause of 2026-10-28 at the end of this
section's opening paragraphs.** **THE DEFECT: a heading denying the release it describes is the `DEF-AC` class one level
in, and a reader opening this file met *"UNRELEASED"* over a version the registry carries.** **The tag is cut — `git tag
--list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` — and the release this section describes is published.**

**★ THIS SECTION DESCRIBES A RELEASE THAT HAS NOT BEEN CUT, AND IT IS MARKED SO IT CAN NEVER BE MISTAKEN FOR A
DECLARATION OF SHIPPED BYTES.** `bindings/js/package.json`'s `version` reads **`1.2.0`** at its own bytes this
date, all five `optionalDependencies` pins read `1.2.0` with it, the five platform manifests' `version` fields read
`1.2.0` with them — **eleven sites, one rebuild, and the artefact the manifest stamps answers `version()` =
`1.2.0`** — **and no `v1.2.0` tag exists: `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` and nothing else.**
**SO THE HONEST READING IS THIS: THE MANIFEST IS PREPARED AT `1.2.0` AND THE RELEASE IS NOT CUT — a prepared version
is not a released one, the tag is not cut until the architect cuts it, and no consumer can install any of this
yet.** **What `1.1.0` describes is still what is cut and published; what this section describes is the preparation,
derived from the tree on 2026-10-28, and the figure a reader checks against the registry today is still `1.1.0`.**

**AND WHAT SHIPS NOWHERE, SAID FIRST BECAUSE IT IS THE EASIEST THING TO GET WRONG: THIS FILE IS AT THE
REPOSITORY ROOT AND NO TARBALL CARRIES IT.** The main manifest's `files` allowlist names six rows — `index.mjs` ·
`README.md` · `README.guide.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` — **and this document
is not one of them and must not be.** So a `npm install provident-storeroom` puts **no `RELEASE-NOTES.md`** on
disk: a consumer holding only `node_modules` has the package's own bytes and the shipped guide
(`README.guide.md`), and reaches this file only by reading the repository. **The same was already true of the
`1.1.0` declaration above and it is true of the `1.2.0` list below.**

**⟶ AND BOTH PARAGRAPHS ABOVE ARE RE-READ, 2026-10-28 — `DEF-AC`: THIS FILE SHIPS, AND IT IS THE CHANGE LIST A
CONSUMER OF `1.2.0` RECEIVES.** `RCA-8(g)` ANNOTATE-BESIDE: **the two paragraphs stand BYTE-FOR-BYTE as the reading
of their own date; THIS clause is the operative reading of BOTH the heading and the allowlist.** **(i) THE TAG IS
CUT:** `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0`, so **the `1.2.0` section's *"UNRELEASED"*
heading and its *"no `v1.2.0` tag exists"* sentence are the reading of the date they were written and are read
THROUGH this clause; the release is CUT, and this text travels in its tarball.** **(ii) THE ALLOWLIST NAMES SEVEN
ROWS, THIS FILE AMONG THEM:** `index.mjs` · `README.md` · `README.guide.md` · `RELEASE-NOTES.md` · `index.d.ts` ·
`src/entry/` · `src/constraint-kernel.mjs` — **the landed copy of this document is a TRACKED, GENERATED file at
`bindings/js/RELEASE-NOTES.md`, staged byte-for-byte from this authored home by the release's assembly, exactly as
`README.guide.md` is staged from `docs/guides/package-use.md`** (`scripts/publish.sh`'s notes stage; the preflight
REFUSES a drifted landing). **SO THE SENTENCE *"NO TARBALL CARRIES IT"* IS UNTRUE FROM THIS DATE AND IS READ THROUGH
THIS CLAUSE: a consumer installing `1.2.0` has this change list at `node_modules/provident-storeroom/
RELEASE-NOTES.md`.**

**WHAT HAS CHANGED SINCE `1.1.0`, IN FOUR ITEMS — ONE OF THEM A BEHAVIOUR CHANGE AND THREE OF THEM NOT.**

1. **`DeleteRecord` GAINED `discarded` (ADDITIVE).** A delete's record carries a fifth own member beside
   `address`, `op`, `tiers` and `triggered`: **`discarded`**, a list `0` or `1` long of `{ opId, addresses }` —
   the reversal a delivery raised and the engine threw away, with the addresses the discarded check owed.
   `discarded.length === 0` means the delivery discarded nothing. **It is a WITNESS and not a repair:** the
   delete still answers everything it answered, throws nothing, mints no status, and the reversal's effect still
   stands. **AND ITS ENUMERABILITY CONSEQUENCE IS PART OF THE DECLARATION, NOT A FOOTNOTE: `discarded` is
   DECLARED as a member in `index.d.ts` and is NON-ENUMERABLE at runtime.** Measured on this checkout
   2026-10-28: a delete's record answers `Object.keys` as `['address','op','tiers','triggered']` — **four** —
   while `Object.getOwnPropertyNames` answers **five**, `discarded`'s own descriptor being
   `{enumerable: false, configurable: true, writable: false}`. **So `Object.keys` never shows it, and a spread or
   `Object.assign` copy of a receipt LOSES it:** both were driven and neither copy carried the member. **Read the
   witness off the record itself** — a consumer that copies a receipt loses the witness, and nothing throws when
   it does.

2. **THE ONE BEHAVIOUR CHANGE: A REFUSED REVERSAL NOW RESTORES TO THE COMMIT'S OPENING MARK, NOT THE JOURNAL'S
   HEAD.** `restoreReversal` used to restore the journal's head, on the reasoning that *"a reversal appends no
   journal entry, so that head describes the state that stood BEFORE the action"*. **That reasoning fails on the
   restart arm**: the enclosing write's own op stands at the head when a listener's reversal runs, so the
   compensation restored the write's LANDING and **a write that reported a refusal had left its own value
   standing** (`DEF-AE`: `9` stayed `9` where the refused write should have restored `7`). **Now the opening
   caches its mark — the journal's last valid op id, or the floor where the journal holds no entry — and the
   restore hands that cached mark back.** Measured: the refusing arm leaves the store where the ATTEMPT found it
   (`tests/e2e/def-ae-restore-mark.test.mjs`, cells `1`–`2`, and the seven refusing arms swept around them).
   **A lawful reversal is unchanged**, and a lawful write still answers its record with its value standing.

3. **`context.value`'S RESPONSIBILITY IS NOW DECLARED (NO BEHAVIOUR CHANGE).** `D-50`, the architect, verbatim:
   *"If a constraint needs to look for the data at a given location, it can read()"*. **`context.value` is the
   value the write verb returned** — a repair that lands elsewhere hands your body the value that op landed — **so
   a constraint that cares about any other location reads it itself.** Nothing about the machinery moved; the
   guide's `§7.6` now says it, and the same section now names the exact-address consequence beside it: **a pass
   judges the pairs standing at the address it writes, so a pair at another address is not asked** (measured: a
   pair at `['b']` asked `0` times by a write at `['a']`).

4. **THE PASS'S STATE MACHINE IS PINNED BY CELLS (NO BEHAVIOUR CHANGE).** The architect's state machine — one
   action, the checks in order, **a repair restarting the checks from `#1` because a repair can break a check
   already passed**, and termination being structural rather than counted — is now measured property by property
   through the entry (`tests/e2e/repair-restart-state-machine.test.mjs`, whose cells also print that a pass
   evaluates exactly the pairs at the attempt's own address). **The behaviour is the behaviour `1.1.0` already
   ships; what is new is that it is pinned, so a later move meets a red instead of a reader.**

**AND ONE NUMBER A CONSUMER MIGHT WANT, WITH ITS WARNING: THE RESTART BUDGET IS `3` AND IT NOW SAYS SO IN THE
GUIDE.** `RESTART_LIMIT = 3` at `bindings/js/src/entry/constraints.mjs:1366` has been the behaviour since
`1.1.0`; the shipped guide declared it nowhere, and the guide's `§7.7` now does. **This is a DECLARATION and not
a change** — the bound, its spend-and-never-reset rule and its fail-closed arm stand exactly as they shipped.

**NOTHING ELSE IN THIS LIST IS A BREAKING CHANGE, AND NOTHING IN IT IS CUT.** Items `1` and `2` are the two a
consumer can feel; `3` and `4` are declarations and pins. **When `1.2.0` is cut, this section is the declaration
it carries — and until then the six figures a reader checks are PREPARED at `1.2.0` and the tag is NOT CUT, so what
is installed today is still `1.1.0`.**

---

## §0 · What to do if you are on `1.0.1`

1. **Re-read your refusal mapper.** Read §2 items `B-1`, `B-2` and `B-5` before you upgrade. **A status you
   branch on has changed meaning and one has changed value.** If your mapper treats `FileCommitFailed` as "a
   constraint refused my write", it is now WRONG: that code is the SAVE's alone.
2. **Wrap `rollback` in your throw path.** It throws now (§2 `B-3`) where a total function was declared.
3. **Stop assuming a refused attempt leaves the refused value.** It leaves the state before the attempt
   (§2 `B-4`).
4. **Add `op` to anything that reads a delete's record** (§2 `B-7`). The record grew a fourth member; a
   delete's reversal is now reachable by that member's id.
5. **Do not carry a handle, an address object or a store instance across the recovery exits in §3.** Those
   exits are the consumer's act, and the package does not perform them.
6. **If you pinned `<1.0.1`** — the answer to `1.0.1`'s breach — **`1.1.0` is the version that supersedes it.**
   Pin `1.1.0`, not `1.0.1`: the four items `B-1`…`B-4` reached `1.0.1`'s bytes UNDECLARED, and you get them
   either way.

**A NOTE ON `B-1`…`B-4` AND THE WORD "AT `1.0.1`".** Those four were already in `1.0.1`'s shipped bytes —
`src/error.rs`'s `CODES` reads `[&str; 20]` at the `v1.0.1` tag, not `17`. **So for each of them this file
gives the reading at `1.0.0` (what moved), the fact that `1.0.1` shipped the move UNDECLARED, and the
reading at `1.1.0` (which is the same behaviour, now declared).** A consumer already on `1.0.1` has absorbed
them; **`B-5` onward are what `1.1.0` changes under them.**

---

## §1 · The shape of the list, and where it exceeded the ruling's count

`D-42` item `1` named **FOUR** breaking changes. **Derived from the tree rather than from the ruling's count,
the list is ELEVEN.** Four were shipped in `1.0.1` (`B-1`…`B-4`); seven more land in `1.1.0` (`B-5`…`B-11`).
**The list exceeded `D-42`'s four at `B-5`**, and every addition below was measured at its own site — the
commits named beside each item are the ones that made the change.

| # | the change | shipped in |
|---|---|---|
| `B-1` | the emitted vocabulary `17 → 20` | `1.0.1` (undeclared) |
| `B-2` | a constraint-refused write's status is no longer `FileCommitFailed` | `1.0.1` (undeclared) |
| `B-3` | `rollback` went from total to partial: **it throws** | `1.0.1` (undeclared) |
| `B-4` | a failing attempt leaves the pre-attempt state (`9 → 5`) | `1.0.1` (undeclared) |
| `B-5` | a refused reversal is RESTORED, and its restore WRITES the file | `1.1.0` |
| `B-6` | a constraint check always runs inside an open commit | `1.1.0` |
| `B-7` | `DeleteRecord` gained `op` — a record's shape grew | `1.1.0` |
| `B-8` | a delete's journal before-state was captured at the wrong home | `1.1.0` |
| `B-9` | an external callback's call opens its OWN commit | `1.1.0` |
| `B-10` | an action inside an open commit RESTARTS the constraint check | `1.1.0` |
| `B-11` | a directly driven pass reports a restart as a REPORT, not a throw | `1.1.0` |

---

## §2 · The breaking changes, one line of "before" and one of "now"

### `B-1` · The emitted status vocabulary grew `17 → 20`

**AT `1.0.0`:** `CODES` was `[&str; 17]` — ranks `1`…`17`, the last being `ValueRefusedAtBoundary`.
**`1.0.1` SHIPPED THREE MEMBERS UNDER A PATCH WITHOUT SAYING SO.**
**AT `1.1.0`:** the set is **`[&str; 20]`**, ranks `1`…`20`, and the three appended members are:

- **rank `18` `ConstraintBodyThrew`** — a constraint BODY threw, where the package's crossing used to answer
  the store's own code for a body that failed;
- **rank `19` `ConstraintRefusedAtRegistration`** — the store refused a pair AT REGISTRATION;
- **rank `20` `ConstraintPassRefused`** — the ONE status a constraint's refusal of a `write` answers, and of
  a `rollback` whose terminal state a pair refuses.

**WHAT BREAKS YOU:** a mapper with a closed `switch` over the seventeen old members now meets three values it
has no arm for, and `errorMessage(code, args)` resolves a clause for each. **NO RANK OF `1`…`17` MOVED**, so
an ordinal you already stored is still that member (`FileCommitFailed` is still rank `15`).
**ONE MEMBER IS NOT A CONSUMER'S TO SEE:** `ConstraintRefusedAtRegistration` is the store's and crosses only
where the store mints it.

### `B-2` · A constraint-refused write's status is `ConstraintPassRefused`, not `FileCommitFailed`

**AT `1.0.0` (and under `1.0.1`'s undeclared change, before it):** a write a constraint refused crossed as
`FileCommitFailed` — **which is the STORE'S SAVE CODE, rank `15`** — so the status named a layer the failure
did not happen at.
**AT `1.1.0`:** the refusal crosses as **`ConstraintPassRefused`, rank `20`**, the pass's own member.
**`FileCommitFailed` STAYS the save's code and is produced by save failures ONLY.**
**WHAT BREAKS YOU:** the most likely break in this release. **A consumer who treated `FileCommitFailed` as
"a constraint said no" now reads a save failure as a constraint refusal.** The refusal's own `KC` token still
rides `log[].state`; it is one status for all eight tokens, not one per token.

### `B-3` · `rollback` went from total to partial, and it THROWS

**AT `1.0.1`'s DECLARATION:** `rollback(opId): RollbackRecord` — **a total function that answers a record and
fails never.** It was already untrue of `1.0.1`'s code; **this file declares it against the code, which is
where the truth is.**
**AT `1.1.0`:** a reversal is JUDGED. **A `rollback` whose TERMINAL state a registered pair refuses THROWS
`{status: 'ConstraintPassRefused', message, log}` at rank `20`.** A LAWFUL reversal is unchanged — same
`{opId, undoneOps, restoredTo}`, three members, no throw, no new member. **The judgement is of the state the
reversal LEFT, never a per-step approval** — an unwinding composition passes through intermediate states no
constraint would approve.
**WHAT BREAKS YOU:** a call you could not fail now throws a plain object literal (never an `Error` subclass).
**AND THE THROW IS NOT THE WHOLE OF IT — SEE `B-5`: THE REVERSAL IS ALSO UNDONE.**
**THE JUDGEMENT IS NOT A WALK AND NOT FREE:** it takes a pre-reversal standing of every enabled pair's every
address before the store call and asks the terminal state after it. A store that registered no constraint
reaches no read at all, and the member is what it was.

### `B-4` · A failing attempt leaves the PRE-ATTEMPT state, not the refused value

**AT `1.0.0`:** seed `5`, refused write `9`, repair `1` — **the store was left holding `9`, the value the
constraint REFUSED.** A per-op walk over the repair's op reversed it AND marked it compacted, so the second
call over the write's op was answered `RollbackCompacted` and undid nothing. **The floor law made the walk
unsound and the violation stood.**
**AT `1.1.0`:** the failing arm leaves **`5`** — the state before the attempt. **A plain rejection still
leaves it, a repair answering `{ok: false}` still leaves it, and a PASSING repaired write still lands its
repaired value and composes nothing.**
**WHAT BREAKS YOU:** if you compensated for the old residue in your own layer, **your compensation now
unwinds a state that is already unwound.** The composition reports one step per address it issued a call at,
and `report.rollback` carries what actually happened.

### `B-5` · A refused reversal is RESTORED, and its restore WRITES THE FILE

**AT `1.0.1`:** the compensating undo cleared every tier and rewrote at `mem` — **so a `file`-tier value was
DESTROYED by a refusal that then told you every address stood again at its pre-reversal state** (measured by
the downstream at 200 of 200), **and the restore was in memory only, so a re-boot read bytes describing the
PRE-restore state.** *(Commits `00f90df`, `9e16c0e`, `bd0fd8c`.)*
**AT `1.1.0`:** the restore puts back **exactly the per-tier standing it captured** — a present capture writes
each tier at its own tier, most persistent first, so a shadow reconstructs; an absent capture becomes ONE
untiered delete, where `AddressNotFound` **is** the owed state; **no tier that stood is ever cleared.** It
**verifies the result and counts an address restored only if it is exact**, so the message cannot claim what
did not happen — where it fails it names the address, what stands, what was owed, and how many of the
addresses it moved stand again. It restores **from the store's own journal** (`restoreMark`), not from a JS
capture, so a mixed-depth shadow and a higher tier whose parent the reversal moved below it are now reachable.
**AND `bd0fd8c` MAKES THE FILE AGREEMENT REAL:** the restore takes a `file`-tier snapshot before and after the
replay, and **where a version standing at `Tier::File` moved it SAVES the restored image** with the store's one
writer — so a re-boot returns to JUDGED bytes.
**WHAT BREAKS YOU — TWO THINGS, BOTH NEW BEHAVIOUR:**
- **THE BYTES AT `cfg.filePath` ARE NO LONGER "the last successful `file`-tier write's and no other state".**
  A refused reversal's restore is now a SECOND producer of them. **A consumer who diffs those bytes, hashes the
  file, or watches its inode/mtime will see it move on a path that used to write nothing** — and where no
  file-tier version moved, **no byte is touched and the inode and mtime stay put.**
- **THE ASYMMETRY, SAID PLAINLY RATHER THAN LEFT TO BE DISCOVERED: a SUCCESSFUL `rollback` persists NOTHING.**
  Measured: `file` `a=1`, `file` `a=2`, rollback the second — memory reads `1`, the bytes still say `{"a":2}`,
  and a fresh boot reads `2`. **A reversal writes no bytes; a restore now does.**
**AND A SAVE THAT CANNOT LAND IS REPORTED, NOT SWALLOWED.** `FileCommitFailed` propagates after the replay and
the refusal says the store restored its state IN MEMORY while its FILE WAS NOT UPDATED. **The status stays
`ConstraintPassRefused`; nothing is minted for it.** **A constraint BODY that throws at the judgement now fails
closed**: the reversal is restored and the log names the throwing pair, with the body's own rank-`18` status
crossing — the code says what happened, the treatment is the violation's.
**STILL NOT RESTORABLE, NAMED SO IT IS NOT ASSUMED:** mixed-depth shadows *(reached by `restoreMark` now)*; an
address whose parent the journal never resolved *(reported as residue rather than guessed)*; state changed by
an act the store does not journal; an entry a failed file-save removed.

### `B-6` · No constraint check without an open commit — a check always runs inside one

**AT `1.0.1`:** a CHECK could run where NO commit was open. That one state was every remaining window on this
branch's list — a listener body's write at a descendant, a pass driven by hand (`open=0`/`live=1`), and the
restart's dependence on the write path being the consumer. *(Commit `846f5ea`.)*
**AT `1.1.0`:** **an open commit is the PRECONDITION of the check**, enforced **where the check runs, not where
it is called from** — a seam a driver can bypass is not an invariant. `runAttempt` wraps its whole pass in the
store's own commit scope: **the scope opens one if none is open, joins the one that is, and closes only what it
opened.**
**WHAT BREAKS YOU:** **a store that carries no such channel is REFUSED, not run uncommitted** — the invariant
fails closed before status moves, before an entry, before any body, and without minting a token. **So a
consumer or a harness that hand-drives a pass over a store lacking that seam now gets a refusal where it used
to run.** **MEASURED: the production write's nesting is UNCHANGED** — the count during the pass is one at the
body's ask and one after its nested write. **A pass you drive directly now carries `open 1` where it carried
`0`**, opening exactly one commit itself and returning to zero.

### `B-7` · `DeleteRecord` gained `op` — a record's shape grew

**AT `1.0.1`:** `delete` answered **`{address, tiers, triggered}`** — three members, **and no identity.** The
act was already journalled and `rollback` already accepted its id, **but no caller could NAME the act, so no
caller could reverse it**: an act that cannot be named cannot be reversed. *(Commit `c25765c`.)*
**AT `1.1.0`:** `delete` answers **`{address, tiers, triggered, op}`** — `op` is the store's own `JournalOp`,
**the same member, at the same name and the same type, that `WriteRecord` carries**, so `rollback(record.op.opId)`
is the one route to reversing a delete.
**`op` IS `null` ON THE ARM THAT REMOVED NOTHING** (`tiers: []`): that arm appends no journal entry, so it names
no op — **`null` is the truth rather than a minted id no reversal could find.**
**WHAT BREAKS YOU:** an object-shape assertion (`Object.keys(...).length === 3`, a strict deep-equal, a
serializer with a closed schema) breaks. **And `null` does not fold to `undefined`** — it crosses as `null`
unchanged.

### `B-8` · A delete's journal before-state was captured at the wrong home

**AT `1.0.1`:** the entry's before-state was captured at the WRONG HOME — `pair_home` resolved the first
standing version's link — **so a STRUCTURED target journalled an EMPTY before-state and its reversal restored
NOTHING AT ALL.** Scalars looked healthy, which is why it went unseen; an EMPTY-ADDRESS delete had the same
fate. *(Commit `c25765c`, the defect the `B-7` exposure had been hiding.)*
**AT `1.1.0`:** the capture is at the correct home, and **an empty-address delete captures the register and
reverses too.**
**WHAT BREAKS YOU:** **code that worked around the old behaviour** — a manual re-write after reversing a
subtree delete — now restores over a correction that already happened. The reversal restores the values AND
their tiers, scalar and subtree alike. **A SECOND reversal of the same op answers `RollbackCompacted`**, which
is the existing floor and not a new rule.

### `B-9` · An external callback's call opens its OWN commit

**AT `1.0.1`:** the join rule said a nested call *"JOINS the extant commit rather than opening a second"* — it
was written to keep ONE ACT's machinery from double-counting itself, **and it conflated INTERNAL NESTING (the
package's machinery inside its own verb) with EXTERNAL RE-ENTRY (your function, which the package invoked,
calling back in).** A listener body's write reused the outer verb's commit, so a listener's write at a
DESCENDANT address left the ancestor pair unasked and the violating effect stood. *(Commits `98cb3ac`,
`835f09f`; rulings `D-45`, `D-46`.)*
**AT `1.1.0`:** **a listener body — and every one of the caller-code invocation sites — OPENS A NEW COMMIT**,
because that is what entering at the package surface means. **The discriminator is the COMMIT ID a call NAMES,
not an authorship the package infers:** a call that supplies a commit id **JOINS** that commit; **a call that
supplies none OPENS a new one.** `write`'s FOURTH position already carries the commit, so **the surface did not
grow a member — it grew a rule about one it has.**
**A REPAIR JOINS** — a repair is not a separate act at the surface, it is PART OF THE ATTEMPT BEING TRACKED, so
it stays inside the attempt's own commit and the commit's record still describes the repair it performed.
**WHAT BREAKS YOU — THE OBSERVABLE COUNTS MOVE:** a listener body's write now **opens a second commit**, so an
attempt-opened observer **fires TWICE where it fired once**, and the descendant address is now asked by the
listener's OWN attempt rather than the outer write's. **The outer commit's count is unchanged across the call
and the outer write's record is untouched.** An ordinary write with a pair body and a listener body inside it
still opens ONE commit. **ONE EXTERNAL FUNCTION STILL INHERITS, named rather than hidden: the attempt-opened
observer itself**, which is called inside the opening before it returns — marking it would let a self-writing
observer open a commit at every notification, unbounded.

### `B-10` · An action inside an open commit RESTARTS the constraint check

**AT `1.0.1`:** a reversal issued INSIDE an open commit — from a listener body, from a constraint body — was
**UNJUDGED**, so its violating effect STOOD, **while the identical call one frame out was refused and
restored.** The conservative direction had become the permissive one. *(Commit `fd11eff`.)*
**AT `1.1.0`:** **an action performed inside an open commit STARTS THE CONSTRAINT CHECK OVER AGAIN** — the
check the action invalidated is **re-run from its FIRST pair against the state the action left**, so no
violating effect can stand unjudged and no body is invoked mid-unwind either, because the restart is a fresh
pass and not a judgement of a partial composition. **The step itself is still not judged at its instant**
(`D-40`'s gate stands: the watch keeps answering empty and no body runs there).
**WHAT BREAKS YOU:** **a violating reversal inside an open commit is now REFUSED and restored, where it used to
stand.** Measured: a listener body asked `[9,7,5]` and the write was REFUSED, store at `7`; a constraint body
the same; a LAWFUL act asked `[9,7,5]` with NO refusal and its effect stands. **TERMINATION IS BOUNDED RATHER
THAN ASSUMED: three restarts per terminal act**, the budget spent and not reset by actions raised inside a
restart, **and past it the check FAILS CLOSED in the same form.** **So a consumer whose body writes and
reverses in a loop now meets a refusal at the third restart instead of an unbounded pass.**

### `B-11` · A directly driven pass LEARNS a restart from the REPORT, not from a throw

**AT `1.0.1`:** the restart's request was consumed by the WRITE's frame, **so a body's `rollback` inside a
directly driven pass was neither judged at its instant nor restarted, and the request died with its window.**
*(Commit `0ade6b3`.)*
**AT `1.1.0`:** the request is a store-side fact and **its consumer is the store's own commit scope** — one
mechanism, not two. `runAttempt` drains it after its pass answers, inside the same scope. **And a directly
driven pass learns it from the REPORT rather than a throw: the outcome becomes `failed` and the refusal's own
constraint-check entry joins the attempt's log with its REAL ordinal**, so `K-3` does not throw while `K-5`
answers the same object.
**WHAT BREAKS YOU:** **a harness that drove a pass by hand and expected a THROW now gets none** — it must read
`report.outcome` and `report.log`. **The refusal's compensating restore runs before the report is amended**, so
your store stands restored; what you must READ is the report, never a throw.

---

## §3 · The two known fail-states, and their exits

**These are DECLARED, not fixed.** `D-43` item `2`, the architect, verbatim: *"Known fail-state, file reloads /
client regenerates store to return to valid state."* **A known fail-state with a documented recovery is a
specification; an unreachable window with no exit is a defect.** **The declaration of record is
`docs/specs/storeroom-js/contract.md`'s clause of 2026-10-27 and it is restated here because a consumer of the
tarball reads this file.**

**THE TWO WINDOWS.** Each holds a commit and **runs NO PASS**, so a request raised inside it has no consumer
and dies with that window:
1. **A `delete`'s listener delivery** — a delete consults no constraint, so the delivery runs with an open
   commit and no check; a `rollback` a listener body issues there is a step whose check never runs.
2. **A REGISTRATION's own evaluation** — `addConstraint`/`register` asks a pair's body inside the registering
   verb's own commit window, at an instant no `K-2`/`K-3` attempt stands at, so a `rollback` a registration
   body issues dies the same way.

**NEITHER WINDOW IS NEW, NEITHER IS A DEFECT, AND NEITHER IS AN UNREACHED CASE OF THE RESTART.**
**WHAT IS TRUE OF BOTH, SAID BEFORE THE EXIT: the reversal's own effect STANDS in the live instance — so the
absence of a refusal there is NOT an approval and must not be read as one.**

**EXIT 1 — RELOAD THE FILE.** **Construct a fresh instance over the same `cfg.filePath`.** The boot reads the
bytes at the path and nothing else. **AND SINCE `1.1.0` THIS RETURNS TO JUDGED BYTES RATHER THAN TO BYTES
DESCRIBING AN UNJUDGED STATE**: a restore that moved a version standing at `Tier::File` now SAVES the restored
image (§2 `B-5`). **What it does not carry:** the boot reads the last successful save and no other state — no
journal, no registration, no `mem` or `temp` version — and a reversal that moved only `mem`/`temp` nodes does
not save, so a reload does not carry it. **This exit is the store's declared boot semantics, not a general
undo.**

**EXIT 2 — REGENERATE THE STORE.** **Discard the instance and construct the store again from the same
configuration** — a `mem` register with no `filePath`, or a `file` register over the same path, which is exit
`1` as well. **The new instance is a judged state by construction**: no attempt, no open commit, no window
carried over.

**THE CONSUMER'S OBLIGATION IS THE SAME ON BOTH EXITS, AND IT IS THE POINT: the recovery is YOUR act; the
package neither performs it nor pretends to.**

---

## §4 · What did NOT break — so the reading is not taken wider than it is

- **THE FOURTEEN OWN MEMBERS ARE UNMOVED** — `{ read, readLiteral, write, delete, rollback, listen, unlisten,
  addConstraint, constraintOn, constraintOff, register, constraints, removeListener, removeConstraint }`.
  **No member was added and none was removed.** The module namespace keeps its ONE name, `storeCreate`.
- **NO POSITION, ARITY OR CLASS TEST MOVED.** `write`'s fourth position was READ for a new purpose and its
  class domain is unmoved: it accepts the commit RECORD and refuses everything else in the one `TypeError`.
- **THE THROWN FORM IS THE SAME ONE FORM** — a plain object literal `{status, message, log, address}`, never an `Error`
  subclass — and `ConstraintPassRefused` is a member of the SAME set, not a new shape.
- **REGISTRATION ORDER IS A GUARANTEE, NOT A LUCK.** `constraints()` emits by a MONOTONE REGISTRATION
  SEQUENCE, kept through overwrite, toggle and restore, so five snapshots are element-wise equal and equal to
  registration order. **This is new in `1.0.1` and it is a GUARANTEE, NOT A BREAK** — before it, *"no order is
  promised"* and a toggle could perturb it. It is declared here because a consumer diffing snapshots relies on
  it and because a later change would be a break.
- **NO TABLE ROW, RANK OR TRIGGER MOVED** inside ranks `1`…`17`.
- **THE CRATE'S VERSION IS NOT THE RELEASE VERSION.** `bindings/js/Cargo.toml` reads the crate's own `0.1.0`
  and `version()` answers the RELEASE's. They are deliberately distinct.

---

## §5 · Where the authority lives

- **The declaration of record** is the tree under `docs/specs/` — chiefly `storeroom-js/contract.md` (the
  package surface), `storeroom-native/contract.md` (the store), and `storeroom-publish/contract.md` (the six
  packages' coupling). **This note is a CONSUMER SUMMARY of them and yields to them.**
- **The rulings** are `strata/decisions.md` — `D-42` (the minor, the four, the restart), `D-43` (a listener's
  own commit, the known fail-state, a journaled and reversible delete), `D-44` (no check without an open
  commit), `D-45`/`D-46` (a callback opens, a repair joins, the commit id decides), `D-41`/`D-40` (the
  attempt's footprint and the step's gate).
- **The shipped guide** is `README.guide.md` INSIDE the main package — the assembly stages
  `docs/guides/package-use.md` there BYTE-FOR-BYTE, so when you read it from `node_modules/provident-storeroom/`
  it IS that document.

**THE SIX PACKAGES, ONE VERSION, ONE DECISION:** `provident-storeroom` and the five
`@auspicion/provident-storeroom-js-{linux-x64-gnu, linux-arm64-gnu, darwin-x64, darwin-arm64, win32-x64-msvc}`
all read **`1.1.0`**, and the main manifest's five `optionalDependencies` pins are EXACT `1.1.0` — no caret, no
tilde, no range. **A manifest that reads anything else anywhere is the wrong package.**

**STATUS OF THIS RELEASE'S OWN REHEARSAL:** the six tarballs were packed, a `1.1.0` install was driven in a
`/tmp` consumer with no repository in its ancestry, and `version()` answered `1.1.0` at the rebuilt artefact and
at the installed package. **No tag was cut, nothing was pushed, nothing was published, and no registry install
was witnessed** — a registry-installed `1.1.0` is described here from the manifest and from a locally packed,
installed artefact, and is still not witnessed as a registry download.

**⟶ AND THE TWO PARAGRAPHS ABOVE ARE `1.1.0`'S OWN READING AND ARE READ THROUGH THIS CLAUSE, 2026-10-28: AT THIS
TREE THE SIX FIGURES READ `1.2.0`, AND `1.2.0` IS PREPARED AND NOT CUT.** `RCA-8(g)` ANNOTATE-BESIDE: **both stand
BYTE-FOR-BYTE; what each says of `1.1.0` was true of the tree it was read on.** **THE SIX FIGURES, RE-READ AT THEIR
OWN BYTES THIS DATE: the main manifest's `version` is `"1.2.0"`, its five `optionalDependencies` pins are exact
`1.2.0` with it, and the five platform manifests' `version` fields are `1.2.0` with them — eleven sites, moving
together and never singly** (`PUB-DD-10`) — **so the rule the paragraph above teaches is UNMOVED and its figure is
`1.2.0`: a manifest that reads anything else anywhere is the wrong package.** **THE CUT, AND WHAT THIS FILE STILL
DOES NOT CLAIM:** `git tag --list` carries `v1.0.0` · `v1.0.1` · `v1.1.0` and no `v1.2.0`, so **`1.2.0` is PREPARED
at those eleven figures and the tag is not cut until the architect cuts it**; the bytes a registry install yields
today are `1.1.0`'s, and nothing here says otherwise.
