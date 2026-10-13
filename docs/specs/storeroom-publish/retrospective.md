# Retrospective — the `0.1.1` → `0.1.2` release of `provident-storeroom`

**Filed 2026-10-13 by the supervisor, for the next person who cuts a release of this package.**
**Status:** the release is SHIPPED as `provident-storeroom@0.1.2`. **What follows is the record of how it got there** — each finding stated as WHAT WAS BELIEVED, WHAT WAS TRUE, and THE INSTRUMENT THAT CAUGHT IT, so the next release can check the same things in the same places.
**Unit:** `U-STOREROOM-PUBLISH` and `U-STOREROOM-CONSUMER-FIX`. **Layers touched:** `LIVE/ASSEMBLED PACKAGE` (the driven artefact), `LIVE/INSTALL` (the published tarball), and the spec corpus.

**THIS DOCUMENT RECORDS AND AMENDS NOTHING.** Where a finding needs a clause moved, the clause is NAMED and the act stops there (`§4`).

## 1. WHAT SHIPPED, AND HOW TO CHECK IT

| what | the figure | where it is read |
| --- | --- | --- |
| the released version | **`0.1.2`** | `bindings/js/package.json` `"version"` (the main manifest) |
| the five platform manifests | **`0.1.2`, five times** | `bindings/js/platforms/<label>/package.json` `"version"` (`darwin-arm64`, `darwin-x64`, `linux-arm64`, `linux-x64`, `win32-x64`) |
| the five exact pins | **`0.1.2`, five times** | `bindings/js/package.json` `optionalDependencies` — the five `@auspicion/provident-storeroom-js-<label>` keys |
| the sibling crate | **`0.1.0`, DELIBERATELY** | `bindings/js/Cargo.toml` `version`, with the independence declared at `release.md §2.2`'s crate-version clause |
| the JS suite at the released commit | **`216` tests · `216` pass · `0` fail · `0` skipped · `0` todo** | `node --test bindings/js/test/*.test.mjs`, printed by the correction block at `bindings/js/test/version-stamp-r2.test.mjs` |
| the crate's suite | **`223` pass · `0` fail** | `cargo test --manifest-path bindings/js/Cargo.toml` — **the figure the tracker carries is the `0.1.1`-era re-measurement, whose five-part arithmetic it prints; that it is unmoved at the released commit is carried, not re-measured** (`docs/next-steps.md`) |

**ELEVEN VERSION CELLS, ONE RULE, AND THE RULE IS NOT "THE MANIFESTS".** The arithmetic that matters, from `docs/specs/storeroom-publish/resolution.md §3.1` item `4`: `5` platform `version`s `+` `1` main `version` `+` `5` exact pins `= 11`, and **not one of the eleven may move alone** (`PUB-DD-10`, `contract.md §0.3`; `release.md §2.2` items `1`–`3`). **That count is the first finding below, and it cost the release one workflow run.**

## 2. THE FINDINGS, EACH WITH THE INSTRUMENT THAT CAUGHT IT

### 2.1 THE `+1` TOKEN — a fix that made the carrier WORSE THAN THE DEFECT IT REMOVED

**WHAT WAS BELIEVED.** The defect was that `bindings/js/build.rs`'s version locator, on a manifest whose `"version"` key had lost its colon, took the **first colon after the key** — and that colon belonged to the **NEXT** key. The declared repair was to require the byte at the key's own first non-whitespace position to be `:`, else abort with state `(N2)`.
**WHAT WAS TRUE.** The first attempt at that repair **tested the colon correctly and then CONSUMED it** — it sliced at `first_non_whitespace + 1` instead of at `first_non_whitespace`, so the `rest` text began at the byte AFTER the colon and the split below it reached for a **SECOND** colon. **`bindings/js/build.rs` now records the consequence at its own site, and the bytes agree:** while it sliced at `first_non_whitespace + 1` *"the colon was spent, `rest` began at the byte AFTER it, and the split below therefore reached for a SECOND colon — over the real `bindings/js/package.json` that is `description`'s, and the stamp carried a NEIGHBOURING KEY'S VALUE on a well-formed manifest."*
**SO THE TRADE WAS THE WRONG WAY ROUND: the defect it replaced needed a MALFORMED manifest; the regression needed NONE.** **On a well-formed manifest the build proceeded and stamped the wrong value.**
**HOW THE DIFFERENCE WAS FOUND, TWO INSTRUMENTS INDEPENDENTLY.**
1. **The two cells written for the ORIGINAL defect failed by name** — `R2-11` and `R2-10` in `bindings/js/test/version-stamp-r2.test.mjs`, whose messages read *"the carrier does not reach the state and does not abort — it answers a value"* and *"a neighbouring key's value is stamped"*.
2. **And by BUILDING the artefact and driving its own `version()`** — the value, not the source.

**THE LESSON, AND IT IS THE ONE TO CARRY INTO EVERY RELEASE: THE CELLS READ SOURCE SPANS; THE DIRECTIVE READS THE EMITTED VALUE.** **A span can be satisfied while the value is wrong.** **A build-script fix must be verified by DRIVING it — build the artefact, call `version()`, compare it character for character against the manifest — and never by the suite alone.** **The corrected gate stands in the same file and the correction is stated at its own site:** the gate now reads `tail.trim_start().as_bytes().first() == Some(&b':')` and slices WITHOUT the consuming `+ 1`, so *"the gate no longer consumes the byte it consulted"* and *"the first `:` in `rest` is the key's own by itself."*

### 2.2 TWO CELLS THAT WERE THEMSELVES WRONG, AND THE CONTROLLED EXPERIMENT THAT PROVED IT

**NOT EVERY RED IS THE CODE'S, AND THE WAY TO TELL IS AN EXPERIMENT THAT MOVES ONE VARIABLE — not an argument.**
- **`R2-11` ASSERTED AN IMPOSSIBLE STATE AND COULD NOT HOLD ON ANY CARRIER.** It asserted `underRepair.state === 'N2' && before.state === null`, but its unrepaired run *"DERIVES ONLY THE KEY, THE SEPARATOR, THE SHAPE AND THE CLOSER — IT DOES NOT READ THE ADJACENCY GATE AT ALL"*: the gate is supplied by the harness. **So both halves hold only where the tail carries no colon — exactly where the repaired run also returns `(N2)`, making the two halves MUTUALLY EXCLUSIVE for any manifest containing a colon.**
- **`R2-10`'s ONLY FAILING CHECK RAN AGAINST A SYNTHETIC CARRIER WHOSE SPELLING ITS OWN RECOGNITION PATTERN DID NOT MATCH.** `KEY_COLON_ADJACENCY` carried three alternations written as **spellings**, and none matched the synthetic's `starts_with("\"version\":")` form.
- **THE PROOF WAS A CONTROLLED EXPERIMENT:** substituting the synthetic's gate with `tail.as_bytes()[0] == b':'` took that cell to **`11/11` fully green WITH THE CARRIER UNTOUCHED**. **That is what makes it a proof rather than an opinion.**

**THE DISPOSITION WAS THE ONE THE PROCESS REQUIRES FOR A MALFORMED TEST: recorded, corrected by the test's own author role, NO RE-FREEZE, and the module keeps its hash.** **AND THE IMPLEMENTER'S TWO REFUSALS ARE AS MUCH OF THE RECORD AS THE REPAIR: it REFUSED to edit a red test, and it REFUSED to loop on a cell that no change to its own wall could green.** **Both refusals were correct, and both are why the experiment got run instead of the carrier getting "fixed".**
**THE LESSON: A RED SET IS EVIDENCE, NOT AUTHORITY.** **When a cell cannot be satisfied by ANY carrier, the finding is about the CELL.**

### 2.3 THE VERSION HOMES WERE MISCOUNTED — SIX WERE NAMED, SEVEN CLASSES EXISTED, ELEVEN CELLS STAND

**WHAT WAS BELIEVED.** The release instructions said **six** version cells: the main manifest and the five platform manifests.
**WHAT WAS TRUE.** **`PUB-DD-10` ALSO requires the five `optionalDependencies` PINS in the main manifest to equal the package version, and they MAY NOT LAG** (`docs/specs/storeroom-publish/contract.md §0.3`, the `PUB-DD-10` cell; `release.md §2.2` item `2`). **The brief said they could. The workflow failed at the pin guard naming the divergence exactly** — `.github/workflows/publish.yml`, the step whose assertion reads *"`PUB-DD-10`: five exact pins are required, found …"* and, per pin, *"… is pinned … and the package is …"*. **So the honest count is six manifests' `version` fields plus five pins = ELEVEN CELLS, which is the figure `resolution.md §3.1` item `4` already carried and which the instructions understated by five.** *A reader who enumerates "six version homes" will move six cells and fail the same guard.*
**THE LESSON: A VERSION LIVES IN MORE PLACES THAN THE MANIFESTS — ENUMERATE EVERY PLACE A VERSION IS COUPLED, NOT EVERY FILE THAT SPELLS IT.** **Check it at `PUB-DD-10` and at the pin guard's own assertion, in that order, before the first commit.**

**AND THE SAME CLASS RECURRED A SECOND TIME, ON THE CLAUSE RATHER THAN THE MANIFEST.** The clause declaring **WHICH** version is the release still named the superseded one, and the cells that read it went red — `P-PUB-2::S-KEYSET`, `P-PUB-6::S-SCOPE`, `P-PUB-7::S-MANIFEST` and `NG-PUB-J`. **Those cells were written to assert the COUPLING rather than a frozen string, which is why they go green on their own once the clause moves** — and the clause was moved by a bounded pass: `docs/specs/storeroom-publish-proposal.md §15`'s `2026-10-13` re-cut now declares **`0.1.2`** and records `0.1.1` as **spent and superseded rather than erased**. **The cells were right and were not touched.**

### 2.4 STAGING IS NOT PUBLISHING, AND THAT IS WHY NOTHING WAS SPENT

**WHAT WAS BELIEVED.** A red release workflow means a lost version.
**WHAT WAS TRUE.** **`npm stage publish` STAGES a tarball for later approval; it does not publish.** **AND the failing guard sits in the second job — `main`, which declares `needs: platform` and runs after the platform job — so the platform legs had already staged and the guard refused before anything at the second job's publish site ran** (`.github/workflows/publish.yml`, the `main` job's `needs:` line and its two pre-publish guards).
**SO THE REPAIR WAS A PIN-ONLY COMMIT, `0.1.2` WAS NEVER SPENT, AND THE TAG SIMPLY MOVED ONTO THE FIX.**
**THE LESSON: KNOW WHICH JOB SPENDS A VERSION BEFORE TREATING A RED WORKFLOW AS A LOST RELEASE.** **Read the workflow's job graph — which job is `needs:`-gated behind which, and which job carries the publish verb — before deciding whether a failure cost money, a version number, or nothing.** **The staged model exists for exactly this, and it worked.**

### 2.5 THE TAG SET MOVES WITH THE BUMP — PREDICTED IN ADVANCE, AND STILL WORTH READING

**WHAT WAS TRUE.** After the bump, `v0.1.1` was still standing, carrying a version the manifest no longer declared. **The every-tag coupling cell refused it** — `bindings/js/test/publish.test.mjs` asserts, for every tag the repository carries, that the tag's version equals the main manifest's, with the message *"THE TAG'S VERSION AND THE MAIN MANIFEST'S `version` DIVERGE … A tag whose version differs from the six manifests' is REFUSED, so this is a FINDING and not a relaxation."*
**AND ONE FINDING PRESENTED AS TWO, WHICH IS THE PART WORTH KEEPING: the SAME refusal surfaced as the failure of an unrelated-looking publish verb cell.** **Two red cells, one cause** — so when two cells go red in one pass, check whether they name the same clause before treating them as two findings.
**AND THE CLAUSE HAD SAID SO IN ADVANCE.** `release.md §2.5` item `4` states that the tag-coupling cell reddens every tag the repository already carries, *"the released `v0.1.1` among them"*, and reserves the remedy to the architect: **a tag that no longer names the manifest's version is DELETED OR RE-POINTED BY HIM, and NO PASS of the unit tags, re-points, deletes, publishes or deprecates anything** (`release.md §2.5` item `4`; `§4.1` item `1`; `§4.2`). **A bump that leaves the old tag standing is a finding against the ORDER of that clause and not against the spec** — and it was, correctly, treated as one.
**AND ONE THING DELETING THE TAG DID NOT UNDO: the registry's tarball is IMMUTABLE and STAYS.** **So the superseded version is DEPRECATED, not deleted** (`release.md §3`'s immutability clause; `§1.6`). **The remedy for a spent-but-unusable version is a deprecation naming its replacement.**

### 2.6 THE LOCAL ARTEFACT IS A BUILD OUTPUT, NOT A TRACKED FILE

**`bindings/js/build/Release/storeroom_js_binding.node` IS IGNORED BY `bindings/js/.gitignore`** (the `/build/` entry; the file's own header states *"NO BINARY IS EVER COMMITTED TO THE TRACKED TREE"*, `package.md §3.2`).
**SO AFTER ANY MANIFEST MOVE IT MUST BE REBUILT, OR EVERY DRIVEN CELL READS A STALE STAMP.** **That is what happened here: it presented as a red set against a `0.1.2` manifest while the artefact on disk still answered `0.1.1`.**
**AND A CELL THAT DRIVES A REAL ARTEFACT MUST NOT SKIP WHEN ONE IS ABSENT.** The adversarial pass found exactly that gap: the cell driving the unit's actual invariant *"RETURNS EARLY AND SKIPS WHEN THE ARTEFACT IS ABSENT"*, so **on a clean clone the property layer printed `HELD` while no artefact subject was exercised at all — the figure right, its composition wrong.**
**THE RELEASE ITSELF IS UNAFFECTED: the workflow builds its own artefacts from the tagged commit.**
**THE LESSON: A GREEN SUITE ON A DEVELOPER MACHINE AND A GREEN RELEASE ARE NOT THE SAME CLAIM, AND THE DIFFERENCE HERE WAS ONE IGNORED FILE.** **Before reading any driven cell's verdict, rebuild the artefact and confirm its `version()` against the manifest.**

### 2.7 MEASUREMENT BEAT INFERENCE, REPEATEDLY — AND EACH TIME THE INFERENCE HAD LOOKED SOUND

**Five instances, each one an instrument that could not express the failure it was meant to catch.**
1. **An artefact's freshness was raised as a problem FROM AN MTIME; the HASH settled it as byte-identical to a cold rebuild.**
2. **A duplicated clause set was reported *"identical in substance; no divergence"* by a LIST-MEMBERSHIP check; a LENGTH-AND-TAIL comparison showed one copy carried a limb the other did not** — copy A `2014` bytes, copy B `1662`, the `352`-byte gap a whole `(D)` limb. **The membership check CANNOT see a term present in ONE and absent from the OTHER.**
3. **A line-citation drift across six files traced to readers counting in a view that COLLAPSES `\`-CONTINUATIONS** — one line lost per continuation, measured at `33` continuations in `bindings/js/build.rs`. **So cite a construct BY NAME, or measure in a view the file was written in, and never count lines in a collapsing view.**
4. **An unresolved-citation finding was filed against a section that EXISTS, because the sweep's header pattern did not match this corpus's `§`-bearing sub-headings.** **A zero from a phrase search means the SPELLING is absent, never that the CONTENT is absent.**
5. **Two hypotheses about the final two red cells — an annotated tag read as a commit, and a scan matching its own test file — were each REFUTED by measurement, in the same pass, by the role tasked to TEST them rather than to adopt them.** **Tasking a role to test a hypothesis rather than carry it is what made the refutation happen.**

**THE LESSON WORTH THE MOST: THE INSTRUMENTS WORK BECAUSE THEY DISAGREE.** **PRESERVE THE DISAGREEMENT — never let one instrument's green retire another's row.** **Where two instruments report different things, the disagreement is the finding, and the next act is a measurement that can settle it, not the choice of the more convenient reading.**

### 2.8 A CONSUMER-VISIBLE SURPRISE, FOUND BY A SCRATCH DEMO AGAINST THE PUBLISHED TARBALL

**The demo is `archive/demo/`, pinned to the published `provident-storeroom@0.1.2` and driving ONLY the published surface**, whose own manifest states its purpose: *"It installs the tarball from the registry and drives only the published surface, so it tests what a consumer actually receives rather than what the checkout builds."*
1. **WRITING A HIGHER TIER DOES NOT LEAVE THE LOWER VERSIONS STANDING.** After `write(…, 'temp')` then `write(…, 'mem')` then `write(…, 'file')`, only `file` holds the version; the demo records it as *"MEASURED, AND THE OPPOSITE OF WHAT I ASSUMED."*
2. **A READ NARROWED TO `temp` REFUSES, AND SAYS WHERE THE VERSION ACTUALLY IS** (`archive/demo/demo.mjs`, the narrowed-read pair after the three writes).
3. **A NESTED WRITE DOES NOT CREATE ITS PARENT — AN ANCHOR IS MADE, NOT IMPLIED.** The demo records it as *"Measured, because…"* against a parent written first and a child written after.
4. **The remainder of the demo's findings are driven the same way** — `rollback` undoing the named op and every op after it, the single-tier-token rule, and the refusal of a tier outside the domain.
**THE LESSON: THE ENVELOPE'S SUITE CANNOT SEE A CONSUMER'S FIRST SURPRISE.** **A scratch consumer against the REGISTRY is cheap — this one found four — and it is a DIFFERENT LAYER from everything verified before it: the checkout's suite, the assembled artefact, and the published tarball are three claims, and only the third is the consumer's.**

## 3. THE EXONERATION — what is NOT a hazard, stated so no reader re-derives it

**THE PARSER-VERSUS-BUMP HAZARD IS CHECKED THREE WAYS AND IS SAFE.** The hazard is that a bump could move the value the `version` locator reads, because the locator works on the RIGHTMOST occurrence of the `"version"` byte-sequence in the manifest text.
1. **THE PINS CARRY NO `"version"` LITERAL.** In `bindings/js/package.json` the five `optionalDependencies` keys are package NAMES carrying the word `storeroom`, and their values are version numerals — **no key in that block is spelled `"version"`**, which is the premise `bindings/js/build.rs` states for choosing the rightmost occurrence at all.
2. **THE KEY OCCURS EXACTLY ONCE IN THE MAIN MANIFEST** — in this check the occurrence's neighbourhood is what the reader searched, **so the rightmost-occurrence rule reads the right line.**
3. **AND A BUMP MOVES VALUES ONLY.** The five pins' VALUES change and the main `version` field's VALUE changes; **the COUNT of occurrences and the identity of the rightmost occurrence both stay put.** **So a bump cannot move the locator, and no `+1`-class repair reintroduces it.**

**State it, and do not re-derive it: `"version"` pins are not a version home, and the rightmost rule is stable across a bump.** **What WOULD break it is a FUTURE manifest edit that spells a `"version"` key anywhere after the real one** — the pins do not, which is why the rule is safe today rather than safe forever.

## 4. WHAT NEEDS A CLAUSE MOVED — NAMED, AND NOT MOVED

**This section names and stops. No clause here is re-opened, re-cut or amended by this document.**
1. **`docs/decisions.md` · the ACTIVE `A89` row** still carries *"THE SIX MANIFESTS MOVE TO `0.1.1` TOGETHER"* as the corrective sequence — the superseded version.
2. **And five further homes that declare `0.1.1` as the operative release were named by the `2026-10-13` re-cut pass and left standing:** `contract.md §3.2`'s version clause · `distribution.md §3.2` field `2` · `resolution.md §3.2` item `4` · `parameter-semantics.md §2.2` `PAR-PUB-2` · `release.md §2.5` item `3`'s stale-site list's first member.
3. **THE RE-CUT PASS'S OWN DISPOSITION WAS CORRECT AND IS RESTATED RATHER THAN RELAXED: it moved the ONE clause the suite reads and declared the remaining divergence *"A STOP FOR THE SUPERVISOR rather than something this pass settles by half."*** **A half-moved version figure is worse than a named one, because the two voices then disagree in the corpus a deriving pass reads.**

## 5. WHAT IS STILL OPEN

**`npm deprecate provident-storeroom@0.1.1 "…use 0.1.2"` HAS NOT TAKEN.** **The tracker records the check at `2026-10-13`: `npm view provident-storeroom@0.1.1 deprecated` answers EMPTY, as does `@0.1.2`, so the field is UNSET — the superseded version is still installable with no warning** (`docs/next-steps.md`). **THIS CLAUSE IS NAMED HERE AND NOT MOVED: the deprecation is the ARCHITECT'S act, not a pass's** (`release.md §4.1` item `1`; `§4.2`). **`0.1.1`'s four arms silently answer the empty string and its locator can take the next key's colon, so a consumer installing it receives those bytes. The deprecation is the last open item of this release.**

## 6. THE NEXT RELEASE, IN ORDER

**The sequence the release already declares, restated with the one thing missing from each step. It is `release.md §2.5`'s order — do not invent a second one.**
1. **THE CARRIER.** A build-script change is verified by BUILDING and DRIVING its emitted value, not by the suite (`§2.1`).
2. **THE GUARD.** The pre-publish guard compares the assembled artefact's own `version()` against its leg's own platform manifest, per leg, character for character (`release.md §1.4a`).
3. **THE ELEVEN CELLS.** Six manifests plus five exact pins, checked at `PUB-DD-10` and at the pin guard (`§2.3`).
4. **THE TAG.** The bump and the tag set move together, and the tag act is the architect's (`§2.5`).
5. **AND A SCRATCH CONSUMER AGAINST THE REGISTRY** before calling the release done (`§2.8`).

## 7. WHAT THIS DOCUMENT DID NOT DO

**Every claim above traces to a file and a construct, to a clause by `path §section`, or to a figure the cited file prints.** **AND THE CLAIMS THIS PASS DID NOT ITSELF VERIFY ARE STATED AS SUCH AT THEIR SITES AND ARE COLLECTED HERE SO NONE IS READ AS MEASURED:**
- **The commit SHA `v0.1.2` → `6c29a9f`, and the git-level facts about the tag set.** **No `git` command was run by this pass.** The tag acts are carried from this brief and from `release.md §2.5` item `4`'s prediction.
- **The registry-side facts: that `npm stage publish` staged rather than published in that run, and the deprecation's current unset state.** These are carried from the brief and from `docs/next-steps.md`'s `2026-10-13` check; **this pass queried neither the registry nor npm.**
- **The `216 / 216 / 0` and `223 / 0` figures as RUN, this pass.** Both are carried from the files that print them; **no `node --test` and no `cargo test` was run here.** **And the `223` is a `0.1.1`-era figure carried forward — only the `216 / 216 / 0` is quoted at the post-correction tree.**
- **The eight red cells against the `0.1.2` manifest while the artefact answered `0.1.1`.** **The count of `eight` was NOT FOUND in the repository by this pass** — the artefact's staleness and its cause are recorded, at `§2.6`'s sites and in `docs/next-steps.md`, but **the figure `eight` is carried from the brief alone and is stated here as unverified.** **Also unverified by this pass, and relevant to the same item: the local artefact does not exist in this checkout, so its stamp could not be read.**
- **The controlled experiment's `11/11`** is carried from the cell's own header and the tracker, not re-run.
- **This pass wrote no byte outside `docs/specs/storeroom-publish/retrospective.md`.** It ran no `cargo`, no `npm`, no `node`, no `git`, and touched no other spec, part, tracker, workflow, source, test or archive file and nothing under `../Provident-Electron/**`.

**END OF THIS RETROSPECTIVE.**
