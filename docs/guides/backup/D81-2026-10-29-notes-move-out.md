# Archive — the two cut-state passages moved out of the change list on `2026-10-29`

**This file is the ONE HOME of the two passages moved out below, under `RCA-8(g)`: the superseded bytes are MOVED OUT BYTE-EXACTLY and the source leaves a ONE-LINE POINTER, never the displaced text beside its replacement.** **No rule lives here: this is the record of what WAS, and a drive may assert nothing from it.** **The move is `D-81` ITEM 1, on `D-79`'s item 1 and its `DEF-AC` contradiction, and it is the discipline this change list's own consumers apply to their own documents.**

**WHY THESE TWO AND NOT A THIRD.** **Both are the same defect read twice**: **the first is a paragraph of `§1.3.0` that asserts a cut-state in the present tense and denies the tag set beside it**; **the second is the annotate-beside clause that preserved exactly that claim while superseding the figures printed with it** — **so a reader met a preserved cut-state claim inside a clause whose stated work was to retire one.** **`D-80` measured that the `⟶ … <date>` marker marks AUTHORSHIP and not TENSE, and `D-81` ruled the guard's subject changes with it: a CUT-CLAIM SCANNER, not a version scanner.**

**THE SOURCE PATH AND PRE-MOVE POSITIONS.** **Both regions stood in the CANONICAL change list, `RELEASE-NOTES.md` at the repository root, whose bytes are the authored home. `bindings/js/RELEASE-NOTES.md` is its generated landing and carried the same bytes until this move; both copies were edited in ONE act and `cmp` answers identical after it.** **The line numbers are those of `RELEASE-NOTES.md` as committed at `HEAD` immediately before this pass (`93682f3`), and the byte ranges are 0-based, half-open, and read from that same file's own bytes.**

| § | Source path | Pre-move lines | Bytes (0-based, half-open) | Length | `sha256` of the region as moved |
| --- | --- | --- | --- | --- | --- |
| `§1` | `RELEASE-NOTES.md` | `265`–`267`, the whole of the three lines and the newline that ends the last | `81423`–`81779` | `356` | `06b75604080d85ee29537057ba440518a02059ec751cf141a549b2b95d6827ad` |
| `§2` | `RELEASE-NOTES.md` | `269`, the whole of the one line and the newline that ends it | `81780`–`82771` | `991` | `ea46cae5050056bb732ee87704539b3764d4e1b1ade874a67dc78641ec01fe65` |

**AND THE ONE FIGURE THAT IS NOT THE QUOTATION'S: a blockquote carries the two-byte prefix `> ` on each of its lines, so the quoted text below is the hashed region with those prefixes added and nothing else changed.** **The check is mechanical, and it is the one this archive is worth:** `git show 93682f3:RELEASE-NOTES.md | dd bs=1 skip=81423 count=356 | sha256sum` answers `§1`'s hash, and the same skip and count `991` at `81780` answers `§2`'s. **Both were taken from `HEAD` BEFORE the move, so they fix the pre-move bytes and not the post-move tree.**

**PARITY LIMBS `A133` REQUIRES:** **limb (i)** — each moved region is ABSENT from its source and the source prints a one-line pointer in its place: **HOLDS**, checked by `grep` in this pass and by `cmp` across the two copies. **limb (ii)** — the content below is the content hashed above, taken at the move: **HOLDS**, under the prefix rule stated in the paragraph above.

---

## §1. MOVED OUT OF `RELEASE-NOTES.md` — *"NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT …"* (`§1.3.0`, pre-move lines `265`–`267`)

**Where it stood:** `§1.3.0`'s closing paragraph, the three lines that followed item `6` of that change list.

**Why it moved:** **it asserts the cut-state of the version its section prepares, in the present tense, and it denies the tag set beside it** — *"NO TAG NAMES IT"*, *"THE ELEVEN VERSION SITES STAY AT `1.2.0`"* — **while the same section's own annotate-beside clause below stated the opposite about the figures.** **And the class is `D-79`'s: a paragraph asserting a cut-state is not a figure that can go stale, it is a claim a document is not entitled to make.** **What stands at the source now: a one-line pointer to this file's `§1` in the paragraph's place; the section's numbered items above it are unmoved.** **The bytes, byte-exactly as they stood at the source:**

> **NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT, NO VERSION BUMP IS PROPOSED, AND THE ELEVEN VERSION SITES STAY AT
> `1.2.0`.** **The two behaviour changes are declared here because a consumer must be able to read them BEFORE the cut and
> must not be told they are in a tarball that does not carry them** — the same honesty the corrected head above owes.

---

## §2. MOVED OUT OF `RELEASE-NOTES.md` — the clause that preserved the paragraph above's cut-state while superseding its figures (pre-move line `269`)

**Where it stood:** one line, line `269`, the whole of it, closing `§1.3.0`'s opening block.

**Why it moved:** **`D-80`'s finding, printed as bytes**: **a `⟶ … 2026-10-28` clause whose own content is *"what it says about the cut is NOT superseded"* — so the marker, which the tree runs to retire a superseded claim, was used to PRESERVE one.** **`D-81` rules that no marker-shaped rule can separate the two, and that the preserved half had to leave with the paragraph it preserved.** **What stands at the source now: a one-line pointer to this file's `§2` at that line.** **The bytes, byte-exactly as they stood at the source:**

> **⟶ AND WHAT THE PARAGRAPH ABOVE SAYS ABOUT THE FIGURES IS SUPERSEDED BY THIS PREPARATION, 2026-10-28 — WHAT IT SAYS ABOUT THE CUT IS NOT.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the reading of its own date and is read THROUGH this clause.** **UNMOVED: *"NOTHING IN THIS SECTION IS CUT, NO TAG NAMES IT"* — `git tag --list` carries no `v1.3.0`, the registry carries no `1.3.0`, and a consumer cannot install any of this.** **SUPERSEDED: *"NO VERSION BUMP IS PROPOSED, AND THE ELEVEN VERSION SITES STAY AT `1.2.0`"* — the bump IS this preparation's, and the eleven sites read `1.3.0`** (the clause at this section's head states the manifest, the pins, the five platform manifests and the rebuilt artefact's `version()`). **The two behaviour changes are unchanged, and they are `1.3.0`'s content: what a consumer installing `1.2.0` gets is `1.2.0`'s bytes, and this section is the change list of the version being prepared, not of a released one.**

---

## §3. THE CATALOGUE — every site a cut-claim phrase stood at or stands, so a scan can be checked by eye

**WHAT THIS SECTION IS, AND WHAT IT IS NOT.** **`D-81` item `3` adds a scanner to `scripts/publish.sh` that REFUSES any cut-claim phrase in the three shipped documents outside a line whose pointer marks it archived** (`scripts/publish.sh --cut-claims` drives it read-only, and prints its phrase set and its pointer definition). **The scanner is NOT green on this tree, and this section is the honest reading of why: `D-81` states that after these two passages leave, the three documents hold no other such phrase, and MEASUREMENT FALSIFIES THAT — `31` DISTINCT SITES outside the two pointers still carry one, printed by the scan as `56` refused lines because the change list is read at both of its homes.** **The site list below is the whole of the measurement, taken with the four literal, case-insensitive phrases that are the tree's cut-state vocabulary (`IS CUT` · `IS NOT CUT` · `NO TAG NAMES IT` · `SITES STAY AT`); the fifth phrase `D-81` names, `NOTHING … IS CUT`, is covered by `IS CUT` and is reported redundant by the scanner's own output.** **No byte of any entry marked `current` was edited: every one is a dated reading this tree's law protects byte-for-byte, and this pass moved the two it could move and left the rest standing.**

**AND EVERY ENTRY MARKED `current` BELOW IS READ THROUGH ONE SENTENCE, WHICH IS WHERE THE CUT-STATE IS DISCUSSED FROM THIS DATE: the authority clause at `RELEASE-NOTES.md:23` (and at the same line of its landed copy) — *"THE AUTHORITY IS `git tag --list` AND IT IS THE WHOLE OF IT … NO PROSE PARAGRAPH OF THIS FILE — or of the consumer guide, or of `bindings/js/README.md`, or of either landed copy — MAY ASSERT OR DENY THAT IN THE PRESENT TENSE"*.** **That clause is the one this sweep points each site at: it corrects none of them and deletes no byte, and it is the sentence a reader is meant to read before any of them.**

**STATUSES, DEFINED.** **`archived`** — the bytes left the document in this pass and a one-line pointer naming this file stands in their place. **`current`** — the phrase still stands at the line named, unedited, and the scanner refuses it. **`none-remaining`** — a document in which the phrase stood at no line in this pass's measurement.

### §3.1 `RELEASE-NOTES.md` (canonical) and `bindings/js/RELEASE-NOTES.md` (landed — identical bytes, `cmp` verified): the two sites this pass ARCHIVED, and the pointer each left

| § of this file | Source path | Pre-move lines | Bytes (0-based, half-open) | `sha256` | Status |
| --- | --- | --- | --- | --- | --- |
| `§1` | `RELEASE-NOTES.md` (and its landed copy) | `265`–`267` | `81423`–`81779`, `356` bytes | `06b75604080d85ee29537057ba440518a02059ec751cf141a549b2b95d6827ad` | `archived` |
| `§2` | `RELEASE-NOTES.md` (and its landed copy) | `269` | `81780`–`82771`, `991` bytes | `ea46cae5050056bb732ee87704539b3764d4e1b1ade874a67dc78641ec01fe65` | `archived` |

**THE POINTER LINES THEMSELVES, at `RELEASE-NOTES.md` `267` and `269` in this tree** — **each names this archive, each carries the tree's `MOVE-OUT` pointer shape, and each carries NONE of the five phrases**, which is why the scanner prints them as accepted carriers and not as hits:

- `267` — *"`RCA-8(g)` MOVE-OUT, AUTHORED 2026-10-29 BY `D-81` ITEM 1 … IS NO LONGER AT THESE LINES … its byte-exact text stands at `docs/guides/backup/D81-2026-10-29-notes-move-out.md §1` …"*
- `269` — *"`RCA-8(g)` MOVE-OUT, AUTHORED 2026-10-29 BY `D-81` ITEM 1 … IS NO LONGER AT THIS LINE … its byte-exact text stands at `docs/guides/backup/D81-2026-10-29-notes-move-out.md §2` …"*

### §3.2 `RELEASE-NOTES.md` — `25` lines still `current`, unedited, each one a dated reading this tree's law protects byte-for-byte

| Line | Phrases matched (literal, case-insensitive) | The site, as it opens |
| --- | --- | --- |
| `13` | `IS NOT CUT` | TAG ON IT.** **So this file now carries a section for the tree that is not cut (`§MAIN`, prepared and ma |
| `17` | `IS CUT` · `IS NOT CUT` | **⟶ AND THE CUT-STATE IS DROPPED FROM THIS FILE, 2026-10-28 — `D-57`, THE ARCHITECT VERBATIM: *"Drop the |
| `62` | `IS CUT` | **⟶ THIS SECTION IS RE-CUT FROM THE HEADING IT STOOD UNDER, 2026-10-28, AND ITS FIGURES MOVED WITH THE E |
| `66` | `IS CUT` | **⟶ AND THE PARAGRAPH ABOVE IS CORRECTED AT THIS LINE, 2026-10-28 — ITS FIGURE WAS `1.3.0` AND IS NOW `1 |
| `82` | `IS CUT` · `IS NOT CUT` | **⟶ THIS SECTION IS NEW, 2026-10-29, AND IT STATES THE VERSION AND NOT THE CUT-STATE.** `RCA-8(g)` ANNOT |
| `84` | `IS CUT` | **THE FIGURE THIS SECTION MAY BE RIGHT ABOUT, AND ITS GENERATOR.** the version line at this file's head  |
| `86` | `IS CUT` | **⟶ AND THE BUMP IS THIS PREPARATION'S, 2026-10-29 — THE ELEVEN CELLS READ `1.6.0`, MOVED TOGETHER IN ON |
| `135` | `IS CUT` | **⟶ THIS SECTION IS NEW, 2026-10-28, AND IT STATES THE VERSION AND NOT THE CUT-STATE.** `RCA-8(g)` ANNOT |
| `137` | `IS CUT` | **⟶ AND THAT PARAGRAPH'S TWO FIGURES ARE RE-READ AT THE TREE THIS SECTION PREPARES, 2026-10-29 — THE TRE |
| `159` | `IS CUT` | **NO VERSION BUMP IS PROPOSED BY THIS SECTION AND THE ELEVEN VERSION CELLS STAY AT `1.4.0` — AND WHETHER |
| `161` | `IS CUT` | **⟶ AND THE FIRST OF THOSE TWO CLAUSES IS SUPERSEDED BY THIS PREPARATION, 2026-10-29 — THE BUMP IS MADE, |
| `167` | `IS NOT CUT` | **⟶ THE HEADING THAT STOOD HERE WAS *"`## §1.3.0 · **PREPARED — NOT CUT** — what `1.3.0` carries, ten co |
| `180` | `IS NOT CUT` | **⟶ AND THE VERSION THIS SECTION DECLARES IS `1.3.0` AT ELEVEN SITES, PREPARED AND NOT CUT, 2026-10-28.* |
| `263` | `IS NOT CUT` | --list`, and its preflight REFUSES when the shipped guide's two marked lines disagree** — a hand-written |
| `264` | `IS CUT` | beside a generated *"IS CUT"* fails, and the generated line passes; `--figures` runs that one check read |
| `278` | `IS NOT CUT` | in it that says the release is not cut is read THROUGH the head clause and the clause of 2026-10-28 at t |
| `280` | `IS CUT` | in, and a reader opening this file met *"UNRELEASED"* over a version the registry carries.** **The tag i |
| `288` | `IS NOT CUT` | **SO THE HONEST READING IS THIS: THE MANIFEST IS PREPARED AT `1.2.0` AND THE RELEASE IS NOT CUT — a prep |
| `289` | `IS NOT CUT` | is not a released one, the tag is not cut until the architect cuts it, and no consumer can install any o |
| `290` | `IS CUT` | yet.** **What `1.1.0` describes is still what is cut and published; what this section describes is the p |
| `306` | `IS CUT` | THROUGH this clause; the release is CUT, and this text travels in its tarball.** **(ii) THE ALLOWLIST NA |
| `362` | `IS CUT` | **NOTHING ELSE IN THIS LIST IS A BREAKING CHANGE, AND NOTHING IN IT IS CUT.** Items `1` and `2` are the  |
| `363` | `IS CUT` | consumer can feel; `3` and `4` are declarations and pins. **When `1.2.0` is cut, this section is the dec |
| `364` | `IS NOT CUT` | it carries — and until then the six figures a reader checks are PREPARED at `1.2.0` and the tag is NOT C |
| `698` | `IS NOT CUT` | at those eleven figures and the tag is not cut until the architect cuts it**; the bytes a registry insta |

### §3.3 `bindings/js/README.guide.md` (and its canonical text `docs/guides/package-use.md`, identical bytes) — `6` lines still `current`, unedited

| Line | Phrases matched (literal, case-insensitive) | The site, as it opens |
| --- | --- | --- |
| `36` | `IS CUT` | **⟶ AND THE CUT-STATE SENTENCE ABOVE IS WITHDRAWN, 2026-10-28 — THE CUT-STATE IS NOT A DOCUMENT'S TO STA |
| `66` | `IS CUT` · `IS NOT CUT` | **⟶ AND THE FIGURES MOVE TO THE PREPARED RELEASE, 2026-10-28 — THE SIX FIGURES THIS GUIDE POINTS AT READ |
| `68` | `IS CUT` · `IS NOT CUT` | **⟶ AND THE TAG THAT CLAUSE SAID WAS ABSENT IS CUT, 2026-10-28 — `v1.2.0` EXISTS, AND IT IS THE RELEASE  |
| `70` | `IS CUT` | **⟶ AND THE TREE THIS TEXT DESCRIBES IS NINE COMMITS PAST THE TARBALL IT TRAVELS IN, 2026-10-28 — THE MA |
| `72` | `IS CUT` · `IS NOT CUT` | **⟶ AND THE FIGURES MOVE TO THE PREPARED RELEASE, 2026-10-28 — THE ELEVEN SITES READ `1.3.0`, AND `1.3.0 |
| `76` | `IS CUT` | **⟶ AND THE ELEVEN SITES READ `1.6.0` FROM THIS PREPARATION, 2026-10-29 — THE BUMP IS MADE HERE AND EVER |

### §3.4 `bindings/js/README.md` (and the repository-root `README.md`) — `none-remaining`

**MEASURED, NOT ASSUMED: neither file carries any of the five phrases at any line, case-insensitively.** **So the third shipped document of `D-81` is `none-remaining` in this tree, and the scanner's two refusals are the two documents above.**

### §3.5 THE SCANNER'S VERDICT, AS MEASURED — and why this pass STOPPED at `D-81` item `4`

**`scripts/publish.sh --cut-claims` prints the phrase set, the pointer definition and every hit; on this tree it FAILS, and it must.** **The four runs this pass drove are:**

- **BEFORE the move** (the pre-move bytes of `93682f3`, scanned in `/tmp`): the two regions this file holds are refused, at `RELEASE-NOTES.md:265` and `:269`.
- **AFTER the move** (this tree): **NOT green — `56` refused lines carrying one of the four operative phrases, which is `31` distinct sites (`25` in the change list at each of its two homes, `6` in the landed guide), plus `235` lines carried by bare `NOTHING` alone; `1` line ACCEPTED, the guide's own `D-76` move-out pointer.**
- **A `/tmp` revert restoring `§1` into the post-move file**: refused at that site, so the scanner is not reading a tree it does not measure.
- **A control**: a line carrying a phrase AND this file's pointer shape is printed as ACCEPTED, so the acceptance path is exercised rather than asserted.

**AND THE FINDING THIS ARCHIVE OWES THE NEXT PASS, STATED PLAINLY BECAUSE IT CONTRADICTS `D-81`'s OWN PREMISE:** **`D-81` states that after these two passages leave, the three documents hold no other such phrase — *"because they are the only such phrases in the three documents"* — and the measurement above is `31` distinct sites of counter-example (`56` refused lines), every one of them a lawful historical reading.** **The vocabulary is small and closed, as the ruling says; the class is not.** **A phrase-shaped rule cannot separate *"the release is not cut"* written in 2026-10-28 from the same words written as a claim about this tree, and that is the measurement `D-80` made about literals one design earlier.** **So the guard REFUSES on a clean tree until the architect rules what the `current` entries below are to become, and NO PASS MAY EDIT THEM TO PASS THIS GUARD** (`D-31`; `D-35`: an instrument may not be made to report what it did not measure).

---

## §4. THE BASELINE — the exemption set the preflight reads, keyed by the line's own text digest (`D-82`)

**WHAT THIS SECTION IS, AND WHY IT IS MACHINE-READ.** **`D-82` makes the catalogue the exemption set**: `scripts/publish.sh` accepts a cut-claim hit when it is (a) an archived pointer, or (b) A SITE THIS BLOCK LISTS, and **refuses everything else**. **So the block below is load-bearing, and it is a MEASUREMENT rather than a hand-transcribed census** — the shape this project has rotted on three times (the allowlist count, the hand-named runner chain, the hand-written status census). `scripts/publish.sh --cut-baseline` prints exactly this block from the tree, read-only; **the pass that removes a catalogued claim regenerates the block with that entry gone, and that is the SHRINK.**

**THE KEY IS `<path>` + THE `sha256` OF THE LINE'S OWN BYTES, AND NOT THE LINE NUMBER — AND THAT CHOICE IS THE WHOLE OF WHY THE SET SURVIVES AN INSERTION ABOVE IT.** A line number is a POSITION, and positions drift: the `1.6.1` pass inserted eleven lines above this file's change-list sites and every number below moved, while the set still names the same readings. **A digest is a statement about the LINE**: inserting, deleting or moving lines above a catalogued site changes its number and not its content, so the key still names the same claim, and **a line whose own bytes change is a line nobody catalogued — which is exactly the fact the ratchet must notice.** **THE ALTERNATIVE `D-82` ALLOWED — an explicit marker added beside each catalogued line — WAS REJECTED HERE FOR A MEASURED REASON: it edits the catalogued sites' own bytes, and this tree may not edit a protected historical reading to make a guard green.**
**AND THE THIRD FIELD (`000036` etc.) IS THE LINE IN THIS FILE THAT CARRIED THE HIT AT THE DATE OF MEASUREMENT — it is printed for a reader's eye and the matcher never reads it, so a later drift changes a number in this block and never a verdict.** The fourth field is the phrase list, in the scanner's own words, with each blind spelling's condition resolved.

**AND THE STALE ENTRY IS REFUSED, WHICH IS THE POLICY CHOSEN AND PRINTED WITH EVERY RUN.** An entry whose site no longer carries a hit is a STALE ENTRY; `scan_cut_claims` prints it and the scan FAILS. **REFUSING was chosen over warning loudly because a warning inside a preflight that still exits `0` is the shape `D-79` named — *"a green light wearing the word check"* — and because refusing is what makes the set SHRINKABLE: a pass that removes a claim must remove its entry in the same act, and the next run reddens until it does. THE TWO HALVES TOGETHER ARE THE RATCHET: a hit at a site the block does not list is REFUSED (the set can never grow silently) and an entry whose site carries no hit is REFUSED (the set can never rot open). THE LIST MAY ONLY SHRINK.**

**MEASURED ON THIS TREE, 2026-10-30, AT THE `1.6.1` PASS:** **`83` entries — `37` in the change list at EACH of its two homes and `9` in the landed guide, which is `46` distinct sites and `83` scanned lines, because the change list is read at both of its homes.** **THE `56` (`31` sites) OF §3.2/§3.3 ARE ALL STILL HERE AND THE OTHER `27` ARE THE FOUR BLIND SPELLINGS `D-82` NAMED, MEASURED ONE BY ONE:** `PREPARED` over a tagged version — **`16` lines (`14` across the change list's two homes, `2` in the guide)**; `UNRELEASED` — **`9` lines (`8` across the change list's two homes, `1` in the guide)**; `CUT AND PUBLISHED` — **`0` lines**, because every such heading on this tree names a tag that exists, **which is the condition working exactly as `D-82` wrote it**; `DOES NOT EXIST` / `no consumer can install` — **`3` lines (`2` across the change list's two homes, `1` in the guide)** — **and `16 + 9 + 3 = 28`, one line carries two of them, so the blind-only entries are `27` and `56 + 27 = 83` ✓**. **NO NEW SITE WAS ADDED BY THIS PASS: every entry above stood on the tree before the `1.6.1` edits, and the pass's own new lines were written to carry no phrase of the set — the one line it removed from the set is §1.6.0's withdrawn heading, which this pass corrected (see §5).**

```text
# CUT-CLAIM-BASELINE-BEGIN
bindings/js/README.guide.md b4813203a2201020b8611ba3b598860f74e2838dce2bf7d8bec364b9a8deba49 000036 IS CUT · NOTHING · DOES NOT EXIST
bindings/js/README.guide.md f5289c7a696ccfc280556ce666d1d95ce35d0bbc73ed776109be64b6e799e202 000064 NOTHING · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · UNRELEASED
bindings/js/README.guide.md 4fe50b0f36e06d10cbffe837c77b82ba3f89c53c76cee8c17b87dcad830d49d1 000066 IS CUT · IS NOT CUT · NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0
bindings/js/README.guide.md 27576b061eb551d4c70718d0e8a7213e0707e85a1008dfef05c6375927de43a0 000068 IS CUT · IS NOT CUT · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · UNRELEASED
bindings/js/README.guide.md d2015cc75017baf369ff0454e6346af2a24f70ac51de50b78bc5c0f8bf0a4c1e 000070 IS CUT · NOTHING
bindings/js/README.guide.md 50a42f3f3d76256ebbae1c37d02350d9b51f4e85723dd42ddda4b8b1b7fb6c87 000072 IS CUT · IS NOT CUT · NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0
bindings/js/README.guide.md ee83d284b305157f482870fcc1031e79f954c2c3e48f8cf2d6a2b5d091531c85 000074 PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0 · PREPARED over tagged v1.5.0
bindings/js/README.guide.md 93ac5e6d81de0bfef1823e50c231ccd8ee0ebef8a8c0cc80a0eb31ad5b6a8219 000076 IS CUT
bindings/js/README.guide.md dc37c3e26f8dd9aa4fe1f5b941259c761c8967d6a0c0d9355e2386a41c22b50c 000304 DOES NOT EXIST
bindings/js/RELEASE-NOTES.md 71ea7732e72b7f8207866c1da0ebd4ac1df1f76d52a1fc6b722ed525a94173c3 000006 UNRELEASED
bindings/js/RELEASE-NOTES.md 8871256dfcfc5dc24e1252387076929c2799908867c131090d6cd57f5445b1d2 000008 UNRELEASED
bindings/js/RELEASE-NOTES.md 42d365798bc9fadc75209770af8c2b3030ec8a7bb33c6cf8eea807b530d16e64 000013 IS NOT CUT
bindings/js/RELEASE-NOTES.md b5a88aa0ae7293d9efd56bffea409a292476e16cb4bf63a7033cba3ce20a5990 000017 IS CUT · IS NOT CUT · NOTHING · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · DOES NOT EXIST
bindings/js/RELEASE-NOTES.md ada14854a9ae7cb48fbdb3878ef879aac89ae38cfe75577b38511489976ac349 000060 NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0
bindings/js/RELEASE-NOTES.md 520bb1531077fc6e1730155794a695ac6ff005f51ab30a4edbebe65549349772 000062 IS CUT · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0
bindings/js/RELEASE-NOTES.md 043ecdcf2cb07d9e5e0a61bc84e396ca6f7db76d79decd56095636b60b6e5bd5 000066 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md c38843d9f688bf70979a7edbf5d8e4c9c37153c629db5449dadda7102717410f 000093 NOTHING · PREPARED over tagged v1.5.0 · PREPARED over tagged v1.6.0
bindings/js/RELEASE-NOTES.md d7b51e11bd80ec33bcd4b8ad4bd792f3c7985fb32d89b4b257ead756cad19ba1 000095 IS CUT · IS NOT CUT
bindings/js/RELEASE-NOTES.md 968aa8848c5198c488c6e60198c4dbf260a2f80f42e35b5899fbc2651ea3924f 000097 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md 5d9ec56331269614078ddc66d409b243ca9984c86e6088fe1520a230e3a9e2b5 000099 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md ee564d91d71603efaa2fe0f0a2514f75cccfee2444032c111e82b3b20e656f77 000144 NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0 · PREPARED over tagged v1.5.0
bindings/js/RELEASE-NOTES.md ae8550aa6aa5a49a0a8746e39f379b1b422589ca722bd7b75c8ff27519083b73 000146 NOTHING · PREPARED over tagged v1.4.0 · PREPARED over tagged v1.5.0
bindings/js/RELEASE-NOTES.md 3d0970cdaffb9f37ee0b74b3eb7ade0df19c3603c151e6d58b62a3daa11add20 000148 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md f9d2c5ed6b2185a4bfbcf28c260149da149462dee588e4beb7b84152800c65e5 000150 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md 7a317fde846ec18123ac88769fc41c7be689fc712b5c3357ebd3c9abef22292f 000172 IS CUT
bindings/js/RELEASE-NOTES.md 7ed4c451db1629f8977e3d7fa7ee5cd2b4eba03831eabe365dd302509ed410e1 000174 IS CUT
bindings/js/RELEASE-NOTES.md ccc28583004f096a3cfcbc0796862f8481d534d7896d1f96b1b96891c1a11b12 000180 IS NOT CUT · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0
bindings/js/RELEASE-NOTES.md 94b9f7ff86531248a5d783ae56cc2abe86b7cdb38c6b5f524e1476798c7d8c22 000189 PREPARED over tagged v1.2.0
bindings/js/RELEASE-NOTES.md e6074ce4cddead91b7e4a962fbe53b84c79a64f5f5dc156bc6c555f746b91d4d 000190 NO CONSUMER CAN INSTALL
bindings/js/RELEASE-NOTES.md e3541e2e12aa0f210923f7bb4990959f319b922d5447314a3c7b8105c16e4eec 000193 IS NOT CUT · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · DOES NOT EXIST · NO CONSUMER CAN INSTALL
bindings/js/RELEASE-NOTES.md 1791a8b2c4d8639b8394024a29a449e12463ca3027e1e3335a9c7b9d7697b32a 000276 IS NOT CUT
bindings/js/RELEASE-NOTES.md 1354024cba5b2b7e724624e68bf2fb74bd5bbd7cc366bb6513dde437e0571eff 000277 IS CUT
bindings/js/RELEASE-NOTES.md 7aee25a85cc6d0d91c0878a914846ac291f1bf7aaf41b0c7b7057078cd527ee2 000288 UNRELEASED
bindings/js/RELEASE-NOTES.md a6bdc8c70f861767e3fba2bdffef6452f9b9349f9b5ab01474887546abd10372 000291 IS NOT CUT
bindings/js/RELEASE-NOTES.md c4801ecf7440b4f245695a5c4f78d68fc5ba2a8c4dbc9561f22bd4c37affd229 000293 IS CUT · UNRELEASED
bindings/js/RELEASE-NOTES.md 6541c3fbb4f926830e12e9b842bfccf280be1cc0b725a6b5f0c20abbf5a62bdd 000301 IS NOT CUT · PREPARED over tagged v1.2.0
bindings/js/RELEASE-NOTES.md 9be2f8dfc372e35ba5fa437f93f3743e872602ebf30a65026401585e3fd0b249 000302 IS NOT CUT · NO CONSUMER CAN INSTALL
bindings/js/RELEASE-NOTES.md af7a056d31e2b32ce7122991f4d5cf3a440bd0a259dd76828180019c28b41d85 000303 IS CUT
bindings/js/RELEASE-NOTES.md 583eba7653005b4ed1f3240c67a8d14ba2d7bc6dc9d794e9242bcfb4225edde9 000317 UNRELEASED
bindings/js/RELEASE-NOTES.md f274fbcb1767be39c56a0b35a4d42a7b91e57a085b6e548955d74ad7330f6bb7 000319 IS CUT
bindings/js/RELEASE-NOTES.md 50ccb887619251e4732fbfd83026542f94d4bf8c59351e1366cd26f3bd94972c 000375 IS CUT · NOTHING
bindings/js/RELEASE-NOTES.md fea971be545532f3244c356f91fb7474660451c305fd84f39ea0f8de21b0dd22 000376 IS CUT
bindings/js/RELEASE-NOTES.md 53a80edbf4cc708dfcd894b063331194b441a5f46aed101a71956b01d28bafa5 000377 IS NOT CUT · PREPARED over tagged v1.2.0
bindings/js/RELEASE-NOTES.md f6e7147d2990b0bbe746fb159299e505545bb1b33c915ef3630af7f444b5d322 000704 PREPARED over tagged v1.2.0
bindings/js/RELEASE-NOTES.md 209c235ee8afe7a6b52cd62d659d884fb898085a2bac621496b730d2e308d772 000710 PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0
bindings/js/RELEASE-NOTES.md e319f6e922b01fffd60189d87c461b05c428889097ac1fe0f4306047ffab70b6 000711 IS NOT CUT
RELEASE-NOTES.md 71ea7732e72b7f8207866c1da0ebd4ac1df1f76d52a1fc6b722ed525a94173c3 000006 UNRELEASED
RELEASE-NOTES.md 8871256dfcfc5dc24e1252387076929c2799908867c131090d6cd57f5445b1d2 000008 UNRELEASED
RELEASE-NOTES.md 42d365798bc9fadc75209770af8c2b3030ec8a7bb33c6cf8eea807b530d16e64 000013 IS NOT CUT
RELEASE-NOTES.md b5a88aa0ae7293d9efd56bffea409a292476e16cb4bf63a7033cba3ce20a5990 000017 IS CUT · IS NOT CUT · NOTHING · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · DOES NOT EXIST
RELEASE-NOTES.md ada14854a9ae7cb48fbdb3878ef879aac89ae38cfe75577b38511489976ac349 000060 NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0
RELEASE-NOTES.md 520bb1531077fc6e1730155794a695ac6ff005f51ab30a4edbebe65549349772 000062 IS CUT · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0
RELEASE-NOTES.md 043ecdcf2cb07d9e5e0a61bc84e396ca6f7db76d79decd56095636b60b6e5bd5 000066 IS CUT · NOTHING
RELEASE-NOTES.md c38843d9f688bf70979a7edbf5d8e4c9c37153c629db5449dadda7102717410f 000093 NOTHING · PREPARED over tagged v1.5.0 · PREPARED over tagged v1.6.0
RELEASE-NOTES.md d7b51e11bd80ec33bcd4b8ad4bd792f3c7985fb32d89b4b257ead756cad19ba1 000095 IS CUT · IS NOT CUT
RELEASE-NOTES.md 968aa8848c5198c488c6e60198c4dbf260a2f80f42e35b5899fbc2651ea3924f 000097 IS CUT · NOTHING
RELEASE-NOTES.md 5d9ec56331269614078ddc66d409b243ca9984c86e6088fe1520a230e3a9e2b5 000099 IS CUT · NOTHING
RELEASE-NOTES.md ee564d91d71603efaa2fe0f0a2514f75cccfee2444032c111e82b3b20e656f77 000144 NOTHING · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · PREPARED over tagged v1.4.0 · PREPARED over tagged v1.5.0
RELEASE-NOTES.md ae8550aa6aa5a49a0a8746e39f379b1b422589ca722bd7b75c8ff27519083b73 000146 NOTHING · PREPARED over tagged v1.4.0 · PREPARED over tagged v1.5.0
RELEASE-NOTES.md 3d0970cdaffb9f37ee0b74b3eb7ade0df19c3603c151e6d58b62a3daa11add20 000148 IS CUT · NOTHING
RELEASE-NOTES.md f9d2c5ed6b2185a4bfbcf28c260149da149462dee588e4beb7b84152800c65e5 000150 IS CUT · NOTHING
RELEASE-NOTES.md 7a317fde846ec18123ac88769fc41c7be689fc712b5c3357ebd3c9abef22292f 000172 IS CUT
RELEASE-NOTES.md 7ed4c451db1629f8977e3d7fa7ee5cd2b4eba03831eabe365dd302509ed410e1 000174 IS CUT
RELEASE-NOTES.md ccc28583004f096a3cfcbc0796862f8481d534d7896d1f96b1b96891c1a11b12 000180 IS NOT CUT · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0
RELEASE-NOTES.md 94b9f7ff86531248a5d783ae56cc2abe86b7cdb38c6b5f524e1476798c7d8c22 000189 PREPARED over tagged v1.2.0
RELEASE-NOTES.md e6074ce4cddead91b7e4a962fbe53b84c79a64f5f5dc156bc6c555f746b91d4d 000190 NO CONSUMER CAN INSTALL
RELEASE-NOTES.md e3541e2e12aa0f210923f7bb4990959f319b922d5447314a3c7b8105c16e4eec 000193 IS NOT CUT · PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0 · PREPARED over tagged v1.3.0 · DOES NOT EXIST · NO CONSUMER CAN INSTALL
RELEASE-NOTES.md 1791a8b2c4d8639b8394024a29a449e12463ca3027e1e3335a9c7b9d7697b32a 000276 IS NOT CUT
RELEASE-NOTES.md 1354024cba5b2b7e724624e68bf2fb74bd5bbd7cc366bb6513dde437e0571eff 000277 IS CUT
RELEASE-NOTES.md 7aee25a85cc6d0d91c0878a914846ac291f1bf7aaf41b0c7b7057078cd527ee2 000288 UNRELEASED
RELEASE-NOTES.md a6bdc8c70f861767e3fba2bdffef6452f9b9349f9b5ab01474887546abd10372 000291 IS NOT CUT
RELEASE-NOTES.md c4801ecf7440b4f245695a5c4f78d68fc5ba2a8c4dbc9561f22bd4c37affd229 000293 IS CUT · UNRELEASED
RELEASE-NOTES.md 6541c3fbb4f926830e12e9b842bfccf280be1cc0b725a6b5f0c20abbf5a62bdd 000301 IS NOT CUT · PREPARED over tagged v1.2.0
RELEASE-NOTES.md 9be2f8dfc372e35ba5fa437f93f3743e872602ebf30a65026401585e3fd0b249 000302 IS NOT CUT · NO CONSUMER CAN INSTALL
RELEASE-NOTES.md af7a056d31e2b32ce7122991f4d5cf3a440bd0a259dd76828180019c28b41d85 000303 IS CUT
RELEASE-NOTES.md 583eba7653005b4ed1f3240c67a8d14ba2d7bc6dc9d794e9242bcfb4225edde9 000317 UNRELEASED
RELEASE-NOTES.md f274fbcb1767be39c56a0b35a4d42a7b91e57a085b6e548955d74ad7330f6bb7 000319 IS CUT
RELEASE-NOTES.md 50ccb887619251e4732fbfd83026542f94d4bf8c59351e1366cd26f3bd94972c 000375 IS CUT · NOTHING
RELEASE-NOTES.md fea971be545532f3244c356f91fb7474660451c305fd84f39ea0f8de21b0dd22 000376 IS CUT
RELEASE-NOTES.md 53a80edbf4cc708dfcd894b063331194b441a5f46aed101a71956b01d28bafa5 000377 IS NOT CUT · PREPARED over tagged v1.2.0
RELEASE-NOTES.md f6e7147d2990b0bbe746fb159299e505545bb1b33c915ef3630af7f444b5d322 000704 PREPARED over tagged v1.2.0
RELEASE-NOTES.md 209c235ee8afe7a6b52cd62d659d884fb898085a2bac621496b730d2e308d772 000710 PREPARED over tagged v1.0.0 · PREPARED over tagged v1.0.1 · PREPARED over tagged v1.1.0 · PREPARED over tagged v1.2.0
RELEASE-NOTES.md e319f6e922b01fffd60189d87c461b05c428889097ac1fe0f4306047ffab70b6 000711 IS NOT CUT
# CUT-CLAIM-BASELINE-END
```


---

## §5. THE `§1.6.0` HEADING THIS PASS CORRECTED — withdrawn byte-exactly, with the `sha256` of its one line

**WHAT STOOD, AND WHERE.** The heading of the change list's `§1.6.0` read, at `HEAD` (`674b79e`) line `76` and at the same reading on this pass's opening working tree line `78`, the one line below — **`118` bytes, no trailing newline counted, `sha256 59f7f0956a5d6f82d898c6cf487425ea1ae07645d3beef95ce973eff152ea372`.** **The check is mechanical:** `git show HEAD:RELEASE-NOTES.md | sed -n '76p' | tr -d '\n' | sha256sum` answers that digest.

> ## §1.6.0 · **PREPARED** — what `1.6.0` carries: the eleven commits on `main` past `v1.5.0`, derived from the tree

**WHY IT MOVED, AND WHAT STANDS IN ITS PLACE.** **The heading claimed a preparation state over `1.6.0`, and `git tag --list` answers `v1.6.0`** — so a reader met a preparation claim over a version the tag set already carries, which is `DEF-AC`'s fifth iteration and the class `D-82`'s fourth blind spelling names. **The heading now reads `## §1.6.0 · **CUT AND PUBLISHED — tag `v1.6.0`** — what that release carries: the eleven commits on `main` past `v1.5.0`, derived from the tree`, and a one-line `RCA-8(g)` MOVE-OUT pointer stands below it naming this section.** **AND THE RULE THAT ACCEPTS THE REPLACEMENT IS `D-82`'s PAST-TENSE CONDITION, SHOWN RATHER THAN ASSUMED: `CUT AND PUBLISHED` is refused only when the tag it names does NOT exist, and `v1.6.0` exists — so the corrected heading is ACCEPTED BY THE RULE THE OLD ONE BROKE.** **No other byte of `§1.6.0` moved, and its body and items stand BYTE-FOR-BYTE.**
