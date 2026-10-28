# Using `provident-storeroom` — the installed package

**This guide is for someone who has just run `npm install provident-storeroom` and has never seen the repository
it comes from.** It describes the package you now have in `node_modules`: how it is reached, what its surface
does, how an address is shaped, how the tiers behave, what each refusal means, and — the part most worth your
time — **§12, which lists the behaviours you can break and tells you exactly where this package's promises stop.**

**The two guides that used to describe this package are archived and wrong.** They are
`package-use.md` and `electron-integration.md` under `archive/pre-strata-docs-2026-10-24/docs/guides/`, and they
describe the `0.2.0`/`0.3.0`-era surface; the surface has moved under them twice more since. **Nothing in this file
is copied from them.** Where a figure here is a declaration, it is cited; where it is a measurement, the
measurement is named.

---

## §0 · What this guide describes, and where its figures come from

**THE VERSION THIS GUIDE DESCRIBES IS `0.5.0`** (`bindings/js/package.json`'s `version` field). **AND NOTHING HERE
WAS DRIVEN AGAINST A PUBLISHED TARBALL:** every behavioural claim below is either read from the package's own
**declaration of record** (`bindings/js/index.d.ts`), from a **kept contract** under `docs/specs/`, or from a
measurement taken on this repository's checkout and named as one. **No `npm install` was run by the pass that
wrote this file against the registry, so a registry-installed `0.5.0` is described here and not witnessed.**

**⟶ AND THE TWO FIGURES THIS GUIDE CANNOT AFFORD TO HAND-WRITE ARE GENERATED AND ASSERTED FROM 2026-10-28 — `DEF-AC` (b), AND THE ASSERTION IS THE DELIVERABLE.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands
BYTE-FOR-BYTE and is read THROUGH this clause.** **THE DEFECT: the version line and the cut-state sentence below
were written BY HAND, which is how this guide came to deny the release it travels in** — a figure copied by hand
goes stale the moment the manifest or the tag set moves, and for eight dated paragraphs nothing reddened. **SO
`scripts/publish.sh` GENERATES BOTH from `bindings/js/package.json`'s `version` and `git tag --list`, and its
preflight REFUSES when these two lines do not read what it computed** (`scripts/publish.sh --figures` runs that
one check, read-only). **THE TWO LINES ARE THIS GUIDE'S OPERATIVE FIGURES; every dated paragraph below is the
reading of its own date and is read through them.**

PUBLISH-GUIDE-VERSION-LINE: THE VERSION THIS GUIDE DESCRIBES IS `1.5.0`.
PUBLISH-GUIDE-CUT-STATE: NOT STATED -- this document describes the behaviour at the version line above, and the cut-state is the release's to state, not a shipped document's (`D-57`).

**⟶ AND THE CUT-STATE SENTENCE ABOVE IS WITHDRAWN, 2026-10-28 — THE CUT-STATE IS NOT A DOCUMENT'S TO STATE.** `RCA-8(g)` ANNOTATE-BESIDE, and the architect's ruling verbatim (`strata/decisions.md` · `D-57`): *"Drop the cut-state."* **The two marked lines above stand BYTE-FOR-BYTE as the reading of their own date and are read THROUGH this clause — not one byte of either is deleted — and the sentence this clause withdraws is the SECOND of them, the one that claims to say whether the release this guide travels in is cut.** **THE REASON IS MEASURED, THREE TIMES OVER, AND IT IS STRUCTURAL RATHER THAN A MISTAKE: A SHIPPED DOCUMENT IS SEALED BEFORE THE TAG THAT MAKES ITS CUT-STATE TRUE**, so every release packed before its tag ships a document denying itself, and a guard running in that release's own preflight can only ever confirm *"not cut"* — `1.2.0` shipped *"NOT CUT"*, `1.3.0` shipped *"`v1.3.0` DOES NOT EXIST"*, and the change list's head was stale within minutes of the tag that falsified it. **SO THE CUT-STATE SENTENCE IS DROPPED AS A CLAIM AND THE VERSION LINE STAYS**, because the version line is the ONE figure a tarball can be right about: the manifest knows it and travels beside it. **`scripts/publish.sh --figures` GENERATES AND ASSERTS THE VERSION LINE AND NOTHING ELSE** — the cut-state generation and its assertion are removed in the same act, so a tag set that moves can no longer redden this guide — **and the same one line is asserted in THREE shipped documents: this guide, `README.md` beside it, and the change list** (`DEF-AC`'s remaining demand, *"guard the release notes too"* and *"`README.md` still declares no version at all"*). **THE TAG SET IS NOT DELETED AND NOT DENIED: it is a RECORD OF RELEASES held in the change list, PAST TENSE — a list of what has been cut — and never a claim about the current one.** **AND WHAT THIS CLAUSE DOES NOT SAY, SAID PLAINLY BECAUSE A READER WILL LOOK FOR IT: it does not say whether the version this guide prints is cut.** That is not a document's to state; the record of what has been cut is in `RELEASE-NOTES.md`, and the registry is the registry.

**⟶ CORRECTED 2026-10-26 — THE VERSION THIS GUIDE DESCRIBES IS `1.0.0`, NOT `0.5.0`, AND THE SENTENCE ABOVE STANDS
BYTE-FOR-BYTE AS THE READING OF THE DAY THIS FILE WAS WRITTEN AND IS READ THROUGH THIS CLAUSE** (`RCA-8(g)`
ANNOTATE-BESIDE; `DEF-2026-10-02`: no whole-file rewrite). **`bindings/js/package.json`'s `version` field read at its
own bytes this date is `"version": "1.0.0"`, and all five `optionalDependencies` pins are `1.0.0` with it** — **so
every `0.5.0` this guide prints is the figure of its writing date and reads `1.0.0` from here on: `§2.2`'s five exact
pins, `§8.1`'s *"an installed `0.5.0`"*, and `§11`'s manifest table.** **AND THE ONE THING THIS PASS DID NOT WITNESS
IS UNMOVED: no `npm install` was run against the registry, so a registry-installed `1.0.0` is described here from
the manifest and from measurements on this checkout, and is still not witnessed.**

**⟶ AND THE FIGURE THAT CORRECTION CARRIES IS ITSELF ONE RELEASE BEHIND, 2026-10-27 — THE VERSION THIS GUIDE
DESCRIBES IS `1.0.1`, AND EVERY `1.0.0` THIS GUIDE PRINTS READS `1.0.1` FROM HERE ON.** `RCA-8(g)`
ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause — so do its reading of
`0.5.0` and its reading of `1.0.0`; each was true of the tree it was read on and each is one release behind the
shipped tree from this date.** **THE MANIFEST AT ITS OWN BYTES: `bindings/js/package.json`'s `version` is
`"1.0.1"`, and all five `optionalDependencies` pins are `1.0.1` with it** — the six figures move together and never
singly (§0 item 1; `PUB-DD-10`) — **and the tags the tree carries are `v1.0.0` and `v1.0.1`, with `main` sixteen
commits past `v1.0.1` and no version bump in any of them** (`git describe` at this date reads `v1.0.1-16-gdf3ef88`;
`D-41` item `1`'s semver ruling names the next release `1.1.0`, and that release has not been cut). **SO THE SITES
ARE RE-READ, NOT RE-SPELLED:** §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* — itself already corrected to
`1.0.0` — and §11's manifest table all read `1.0.1`; **every `0.5.0` this guide prints is the figure of its writing
date and reads `1.0.1` from here on.** **AND THE ONE THING NO PASS WITNESSED IS STILL UNMOVED: no `npm install` was
run against the registry, so a registry-installed `1.0.1` is described here from the manifest and from
measurements on a locally packed, installed artefact, and is still not witnessed as a registry download.**

**⟶ AND THE FIGURE THE PARAGRAPH ABOVE CARRIES IS ITSELF ONE RELEASE BEHIND THE TARBALL IT DESCRIBES, 2026-10-28 — THE VERSION THIS GUIDE DESCRIBES IS `1.1.0`, `1.1.0` HAS BEEN CUT, AND EVERY `1.0.1` THIS GUIDE PRINTS READS `1.1.0` FROM HERE ON.** `RCA-8(g)` ANNOTATE-BESIDE: **the three dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause — so do their readings of `0.5.0`, of `1.0.0` and of `1.0.1`; each was true of the tree it was read on and each is one release behind the shipped tree from this date.** **THE PARAGRAPH THAT OWES THIS IS QUOTED AT ITS OWN BYTES, because a guide that denies its own tarball is the defect this clause closes — `D-48` · `DEF-AC`: *"THE VERSION THIS GUIDE DESCRIBES IS `1.0.1`, AND EVERY `1.0.0` THIS GUIDE PRINTS READS `1.0.1` FROM HERE ON … the tags the tree carries are `v1.0.0` and `v1.0.1`, with `main` sixteen commits past `v1.0.1` and no version bump in any of them (`git describe` at this date reads `v1.0.1-16-gdf3ef88`; `D-41` item `1`'s semver ruling names the next release `1.1.0`, and that release has not been cut)."*** **THE TARBALL DENIES EVERY FIGURE OF THAT SENTENCE, AND IT IS THE FILE THE GUIDE TELLS YOU TO READ: `bindings/js/package.json`'s `version` is `"1.1.0"` at its own bytes, all five `optionalDependencies` pins are `1.1.0` with it, the tags the tree carries are `v1.0.0` · `v1.0.1` and `v1.1.0`, `git describe` reads `v1.1.0-1-gcbc3f8a`, and `D-41` item `1`'s minor has been RELEASED rather than awaited.** **SO THE SITES ARE RE-READ, NOT RE-SPELLED:** §0's two paragraphs above, §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* — itself already corrected to `1.0.0` and then to `1.0.1` — and §11's manifest table all read `1.1.0`; **every `0.5.0`, `1.0.0` and `1.0.1` this guide prints is the figure of its writing date and reads `1.1.0` from here on**, and the six figures — the main `version` and the five pins — move together and never singly (§0 item 1; `PUB-DD-10`). **THE ONE THING THAT IS STILL UNMOVED IS THE ONE THING NO PASS WITNESSED, AND IT IS NOT A FIGURE:** no `npm install` was run against the registry, so a registry-installed `1.1.0` is described here from the manifest and from measurements on a locally packed, installed artefact, and is still not witnessed as a registry download. **NO OTHER CLAIM OF THIS GUIDE MOVES: the `files` allowlist's six rows (§11's dated re-read clause (i)), the packed set's nineteen-bare/twenty-assembled (§11's clause (ii)), the twenty-status set (§11's clause (iv)), the fourteen own members and every API clause stand exactly as they stood.** (`strata/decisions.md` · `D-48` · `DEF-AC`; `D-41` item `1`; `D-42` item `1`; `D-38`; `docs/specs/storeroom-publish/contract.md §2.3` item `3` — the byte-for-byte guide stage this correction travels by.)

**⟶ AND THE RELEASE IN PREPARATION IS NOT THIS GUIDE'S VERSION, 2026-10-28 — THE MANIFEST IS `1.1.0`, AND THIS GUIDE CLAIMS NO `1.2.0`.** `RCA-8(g)` ANNOTATE-BESIDE: **the four dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause; this clause re-reads one figure and adds one pointer, and moves no other claim of this file.** **THE FIGURE, AT ITS OWN BYTES, READ THIS DATE: `bindings/js/package.json`'s `version` is `"1.1.0"` and all five `optionalDependencies` pins are `1.1.0` with it** — the six figures move together and never singly (§0 item 1; `PUB-DD-10`) — **so `1.1.0` is the version this guide DESCRIBES, and it is the version an installed tree answers to.** **A RELEASE IS IN PREPARATION AND IT HAS NOT BEEN CUT: what it adds is listed in `RELEASE-NOTES.md` at the repository root, under a `1.2.0` heading MARKED UNRELEASED, and nothing in that section is a version this guide claims or a behaviour this guide measured as shipped.** **AND THAT FILE SHIPS NOWHERE:** it stands at the repository root and no tarball carries it (§11's `files` allowlist, six rows), so a consumer reading `node_modules/provident-storeroom` has this guide and the six figures of `1.1.0`, and the `1.2.0` list is a CHECKOUT reader's document. **The rule, in one line: this guide describes what was cut (`1.1.0`); `RELEASE-NOTES.md` describes what is being prepared (`1.2.0`, UNRELEASED); neither claims the other's figure.** (`D-41` item `1`; §11's manifest table reads the same six figures; `docs/specs/storeroom-publish/contract.md §2.3` item `3`.)

**⟶ AND THE FIGURES MOVE TO THE PREPARED RELEASE, 2026-10-28 — THE SIX FIGURES THIS GUIDE POINTS AT READ `1.2.0`, AND `1.2.0` IS PREPARED, NOT CUT.** `RCA-8(g)` ANNOTATE-BESIDE: **the five dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause — so do their readings of `0.5.0`, `1.0.0`, `1.0.1` and `1.1.0`; each was true of the tree it was read on.** **THE MANIFEST AT ITS OWN BYTES THIS DATE: `bindings/js/package.json`'s `version` is `"1.2.0"` and all five `optionalDependencies` pins are `1.2.0` with it** — the six figures move together and never singly (§0 item 1; `PUB-DD-10`) — **and the five platform manifests' own `version` fields read `1.2.0` with them, which is eleven sites and one rebuild.** **SO THE SITES ARE RE-READ, NOT RE-SPELLED:** this section's version line, §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* and §11's manifest table all read `1.2.0`; **every `0.5.0`, `1.0.0`, `1.0.1` and `1.1.0` this guide prints is the figure of its writing date and reads `1.2.0` from here on.** **AND WHAT THIS CLAUSE DOES NOT CLAIM, SAID FIRST BECAUSE IT IS THE EASIER THING TO GET WRONG: `1.2.0` IS PREPARED AT THOSE SIX FIGURES AND THE TAG IS NOT CUT — `git tag --list` carries `v1.0.0` · `v1.0.1` · `v1.1.0` and no `v1.2.0`, so nothing here says the release is cut, and the tag is not cut until the architect cuts it.**

**⟶ AND THE TAG THAT CLAUSE SAID WAS ABSENT IS CUT, 2026-10-28 — `v1.2.0` EXISTS, AND IT IS THE RELEASE THIS GUIDE TRAVELS IN.** `RCA-8(g)` ANNOTATE-BESIDE: **the six dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause — so does the sentence *"`1.2.0` IS PREPARED AT THOSE SIX FIGURES AND THE TAG IS NOT CUT … the tag is not cut until the architect cuts it"*; it was true of the tree it was written on.** **THE TAG AT ITS OWN NAME THIS DATE: `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0`; the tag `v1.2.0` names a tree whose `bindings/js/package.json` reads `"version": "1.2.0"` at its own bytes and whose five `optionalDependencies` pins read `1.2.0` with it; and `git describe` reads `v1.2.0-1-ge7c211f`.** **SO `1.2.0` IS CUT AND THIS GUIDE DESCRIBES IT — the text you are reading travels inside the `1.2.0` tarball, and a guide that told you its own release did not exist would be the denial this clause closes.** **`RELEASE-NOTES.md` at the repository root still heads its `1.2.0` section `UNRELEASED` and still says no `v1.2.0` tag exists; that file ships nowhere (§11's `files` allowlist, six rows) and its heading is behind the tag — this guide states what was cut, and what was cut is `1.2.0`.** **NO OTHER CLAIM OF THIS GUIDE MOVES: the `files` allowlist's six rows (§11), the packed set's nineteen-bare/twenty-assembled (§11), the twenty-status set (§11) and the fourteen own members all stand exactly as they stood.** (§0's figure rule; `docs/specs/storeroom-publish/contract.md §2.3` item `3` — the byte-for-byte guide stage this correction travels by.) **THE ONE THING THAT IS STILL UNMOVED IS THE ONE THING NO PASS WITNESSED, AND IT IS NOT A FIGURE:** no `npm install` was run against the registry, so a registry-installed `1.2.0` is described here from the manifest and from measurements on a locally packed, installed artefact, and is still not witnessed as a registry download. **NO OTHER CLAIM OF THIS GUIDE MOVES: the `files` allowlist's six rows (§11's dated re-read clause (i)), the packed set's nineteen-bare/twenty-assembled (§11's clause (ii)), the twenty-status set (§11's clause (iv)), the fourteen own members and every API clause stand exactly as they stood.** (`D-41` item `1`; `D-48` · `DEF-AC`; `docs/specs/storeroom-publish/contract.md §2.3` item `3` — the byte-for-byte guide stage this correction travels by; `scripts/publish.sh`'s eleven cells, and the tag coupling `release.md §2.5` puts AFTER them.)

**⟶ AND THE TREE THIS TEXT DESCRIBES IS NINE COMMITS PAST THE TARBALL IT TRAVELS IN, 2026-10-28 — THE MANIFEST IS `1.2.0`, `1.2.0` IS CUT AND PUBLISHED, AND `main` CARRIES BEHAVIOUR THAT IS NOT IN THAT TARBALL.** `RCA-8(g)` ANNOTATE-BESIDE: **the seven dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause; this clause adds the one distinction none of them draws and corrects two sentences of the paragraph immediately above, and it moves no figure and no other claim of theirs.** **THE SIX FIGURES AND THE TAG, AT THEIR OWN BYTES THIS DATE:** `bindings/js/package.json`'s `version` is `"1.2.0"`, all five `optionalDependencies` pins are `1.2.0` with it, the five platform manifests' `version` fields read `1.2.0` with them — eleven sites, one rebuild — and `git tag --list` carries `v1.2.0`, **so the version line above is generated from exactly those two facts and it states that the release this guide travels in is CUT.** **AND THE TREE IS NINE COMMITS PAST THAT TAG:** `git describe` reads `v1.2.0-9-g989c216`, no version bump is in any of the nine commits, and **two of them change behaviour: `§8.0a`'s claim that the `log` belongs to the COMMIT — and that `seq` is the position in that list and not the store's journal ordinal — and `§12.6b`'s carry rule, that a reversal raised inside a pass is judged at that pass's terminal state, describe THIS TREE'S BEHAVIOUR AND NOT THE BEHAVIOUR OF THE `1.2.0` TARBALL** — `1.2.0` ships the per-attempt list and the sentence the carry rule withdraws. **So read this guide for what it is: it is the tree's text, and where it describes the two changes that are not in `1.2.0`, the change list at `node_modules/provident-storeroom/RELEASE-NOTES.md` is what tells you which release carries them — and until the next release is cut, nothing a consumer installs has them.** **AND THE TWO SENTENCES OF THE PARAGRAPH ABOVE THIS ONE THAT THIS CLAUSE CORRECTS:** *"that file ships nowhere (§11's `files` allowlist, six rows)"* is **false from 2026-10-28** — the change list is the allowlist's SEVENTH row and the release's assembly stages it byte-for-byte at the packaging root, so it ships (§11's `2026-10-28` clause (i)) — and *"its heading is behind the tag"* is **withdrawn at that file's own head**, where the `1.2.0` section is now marked **CUT AND PUBLISHED**. **THE VERSION LINE ABOVE IS NOT MOVED BY THIS CLAUSE AND MUST NOT BE: the manifest is `1.2.0` and `v1.2.0` exists, so the figure the preflight generates is the figure written there.** (`D-53`; `D-54`; `DEF-AI`; `DEF-AM`; `DEF-AJ`; the change list's `§MAIN`.)

**⟶ AND THE FIGURES MOVE TO THE PREPARED RELEASE, 2026-10-28 — THE ELEVEN SITES READ `1.3.0`, AND `1.3.0` IS PREPARED, NOT CUT.** `RCA-8(g)` ANNOTATE-BESIDE: **the eight dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause — so do their readings of `0.5.0`, `1.0.0`, `1.0.1`, `1.1.0` and `1.2.0`; each was true of the tree it was read on.** **THE MANIFEST AT ITS OWN BYTES THIS DATE: `bindings/js/package.json`'s `version` is `"1.3.0"` and all five `optionalDependencies` pins are `1.3.0` with it** — the six figures move together and never singly (§0 item 1; `PUB-DD-10`) — **and the five platform manifests' own `version` fields read `1.3.0` with them, which is eleven sites and one rebuild; the rebuilt artefact is stamped from that manifest, so `version()` answers `1.3.0`.** **SO THE SITES ARE RE-READ, NOT RE-SPELLED:** this section's version line, §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* and §11's manifest table all read `1.3.0`; **every `0.5.0`, `1.0.0`, `1.0.1`, `1.1.0` and `1.2.0` this guide prints is the figure of its writing date and reads `1.3.0` from here on.** **AND WHAT THIS CLAUSE DOES NOT CLAIM, SAID FIRST BECAUSE IT IS THE EASIER THING TO GET WRONG: `1.3.0` IS PREPARED AT THOSE ELEVEN FIGURES AND THE TAG IS NOT CUT — `git tag --list` carries `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` and no `v1.3.0`, and the registry carries no `1.3.0`; so nothing here says the release is cut, and the tag is not cut until the architect cuts it.** **AND THE TREE THIS GUIDE DESCRIBES IS TEN COMMITS PAST `v1.2.0`** — `git describe` reads `v1.2.0-10-g14787b5` and `git rev-list --count v1.2.0..HEAD` reads `10`, one commit past the nine the paragraph above reads — **so the two behaviour changes and the four smaller items `§1.3.0` of the change list declares are the CONTENT of `1.3.0`, and `1.3.0` is the version that carries them once it is cut; the `1.2.0` tarball carries neither, and `1.3.0` is the version this guide describes from here on.** **THE ONE THING THAT IS STILL UNMOVED IS THE ONE THING NO PASS WITNESSED, AND IT IS NOT A FIGURE:** no `npm install` was run against the registry, so a registry-installed `1.3.0` is described here from the manifest and from measurements on a locally packed, installed artefact, and is still not witnessed as a registry download. **NO OTHER CLAIM OF THIS GUIDE MOVES: the `files` allowlist's seven rows (§11's `2026-10-28` clause (i)), the packed set's `20` bare / `21` assembled (§11's clause (ii)), the twenty-status set (§11's clause (iv)), the fourteen own members and every API clause stand exactly as they stood.** (`D-41` item `1`; the change list's `§1.3.0`; `docs/specs/storeroom-publish/contract.md §2.3` item `3` — the byte-for-byte guide stage this correction travels by; `scripts/publish.sh`'s eleven cells and its two generated figures.)

**⟶ AND THE ELEVEN VERSION SITES READ `1.5.0`, 2026-10-29 — THE PREPARED FIGURE, AND EVERY `1.3.0` THIS GUIDE PRINTS READS `1.5.0` FROM HERE ON.** `RCA-8(g)` ANNOTATE-BESIDE: **the nine dated paragraphs above stand BYTE-FOR-BYTE and are read THROUGH this clause — so do their readings of `0.5.0`, `1.0.0`, `1.0.1`, `1.1.0`, `1.2.0` and `1.3.0`; each was true of the tree it was read on.** **THE MANIFEST AT ITS OWN BYTES THIS DATE: `bindings/js/package.json`'s `version` is `"1.5.0"`, all five `optionalDependencies` pins are `1.5.0` with it, and the five `bindings/js/platforms/*/package.json` `version` fields read `1.5.0` with them — ELEVEN CELLS, ONE VERSION, moved TOGETHER in this act and never singly (§0 item 1; `PUB-DD-10`) — and `npm run build` stamps the artefact from that manifest, so `version()` answers `1.5.0` at the built artefact and at a package installed from it.** **AND THE RELEASE THIS CHAIN SKIPPED IS NAMED RATHER THAN SILENTLY ABSORBED: `1.4.0` read `1.4.0` at those same eleven cells and was cut from them — the tag `v1.4.0` names a tree whose `bindings/js/package.json` reads `"version": "1.4.0"` at its own bytes.** **SO THE SITES ARE RE-READ, NOT RE-SPELLED:** this section's version line, §2.2's five exact pins, §8.1's *"an installed `0.5.0`"* — itself already corrected to `1.0.0`, `1.0.1`, `1.1.0`, `1.2.0` and `1.3.0` — and §11's manifest table all read `1.5.0`. **AND THE TAG SET IS A RECORD OF RELEASES AND NOT A CLAIM ABOUT THIS TREE:** `git tag --list` answers `v1.0.0` · `v1.0.1` · `v1.1.0` · `v1.2.0` · `v1.3.0` · `v1.4.0`, and `git describe` reads `v1.4.0-27-ga3312b7` — **so this clause states the version and NOT whether it is cut, because the cut-state is not a document's to state** (`D-57`; the clause above).

**AND ONE THING A READER OF THE INSTALLED PACKAGE SHOULD KNOW BEFORE THE CITATIONS: WHEN THIS DOCUMENT IS AT
`node_modules/provident-storeroom/README.guide.md`, IT IS THIS GUIDE.** **Its ONE authored home is
`docs/guides/package-use.md` in the repository, and the release's assembly stages it byte-for-byte at the packaging
root as `README.guide.md`, beside `README.md`, where the manifest's `files` row ships it** (`PUB-DD-11`;
`docs/specs/storeroom-publish/contract.md §2.3` item `3`; `scripts/publish.sh`'s guide stage). **The paths this guide
cites — `bindings/js/…`, `docs/specs/…`, `tests/…` — are the CHECKOUT's, and they do not travel in the tarball; a
consumer reading from `node_modules` has this guide's text and the package's own shipped bytes (`index.mjs`,
`index.d.ts`, `README.md`, `src/`), and every declaration a citation names is answered first by those bytes.** **So
nothing here is addressed to a checkout reader alone: the installed tree carries this text unaltered, and a clause
that names a repository path says where its authority lives, not where you must stand to use it.**

**Every figure carries one of four marks, and the four are not the same thing:**

| the mark | what it means |
|---|---|
| **`path §section`** | **declared** — the clause says it, and it is the authority for that subject |
| **`path` alone, or a row id such as `DD-28`** | **declared** at a contract's own named row |
| **`archive/…`** | declared in a file that has been **archived** by this branch's documentation pass; cited so the reference resolves, not as the current home of anything |
| **`measured 2026-10-26`** | **taken on this checkout** — either read at a file's own bytes, or driven against the checkout's own built addon through the published entry, and reported raw |

**AND ONE RESOLUTION RULE, SO NO CITATION HERE DANGLES: a bare `write-and-read.md`, `crossing.md`,
`store-model.md`, `seams-and-lifecycle.md`, `parameter-semantics.md`, `resolution.md`, `kernel-surface.md` or
`package.md` in a citation is one of this project's ARCHIVED `docs/specs/` parts, and resolves under
`archive/pre-strata-docs-2026-10-24/docs/specs/<unit>/` — the archive prefix is printed where each is first cited
and is elided afterwards only to keep the prose readable.**

**AND THE SHORT NAMES THIS FILE USES, so every citation resolves from any line:**

| the short name | the file it is |
|---|---|
| **`index.d.ts`** | `bindings/js/index.d.ts` — **the declaration of record** |
| **`README.md`** | `bindings/js/README.md` — the readme that ships in the package |
| **`surface.md`** | `docs/specs/storeroom-js/surface.md` |
| **`js/contract.md`** | `docs/specs/storeroom-js/contract.md` |
| **`native/contract.md`** | `docs/specs/storeroom-native/contract.md` |
| **`json-crossing/contract.md`** | `docs/specs/storeroom-json-crossing/contract.md` |
| **`held-listener/contract.md`** | `docs/specs/storeroom-held-listener-identity/contract.md` |
| **`publish/contract.md`** | `docs/specs/storeroom-publish/contract.md` |

**AND THE ROW IDS, WHICH ARE STABLE NAMES AND ARE CITED INSTEAD OF A LINE NUMBER ON PURPOSE:** **`DD-n`, `PAR-…`
and `P-…` are the contracts' own named rows** (each contract ids its own families at its `§0.2` or `§0.3`);
**`A…` ids are the ARCHIVED authority log's rows** (`archive/pre-strata-docs-2026-10-24/docs/decisions.md`); and
**`D-…` ids are `strata/decisions.md`'s own rulings**, which outrank every other document in this tree.

**HOW TO CHECK WHICH VERSION YOU ACTUALLY HAVE, at your own install — because a guide's claim about a version is
worth nothing to you if you cannot falsify it:**

1. **What you have:** read `node_modules/provident-storeroom/package.json` and check `"version"`, then read its
   five `optionalDependencies` values. **All six figures must be the SAME version** — the main `version` and the
   five exact pins move together and never singly (`bindings/js/package.json`, measured 2026-10-26; the coupling
   rule is `PUB-DD-10` at `docs/specs/storeroom-publish/contract.md §0.3`).
2. **Which realm you are in:** you must be in **Node ESM**. **No other realm is claimed** (§1).
3. **What is actually loaded:** construct a store and read the empty address. If the loader resolved a
   differently-versioned platform package, that is where it shows.

**THE SHAPE OF THIS GUIDE, IN ONE LINE: one module name, one instance with fourteen own members, one thrown
refusal form, three tiers, two population routes for constraints, and a value domain narrower than JSON's.** The
rest is the consequences.

---

## §1 · What you get

`provident-storeroom` is **a native Rust register, reached through a Node-API addon, behind a thin ES-module
facade.** The package itself is small — an ESM entry, its own parts, a readme and a hand-authored type declaration
— and **the binary does not travel in it**: it arrives in a separate per-platform package (§2).

**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`bindings/js/README.md`, opening clause; `A70`; and
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md §1`–`§2`, archived). **Node CJS, Electron's
`main`/`preload`/`renderer`, the browser, `worker_threads` and any IPC route are each UNCLAIMED** — the package's
own readme enumerates them one by one and describes no other realm as supported.

**The licence of record is `AGPL-3.0`** (`bindings/js/package.json`'s `license` field, measured 2026-10-26), and a
copy of the repository's `LICENSE` travels with every published artefact, landed byte-for-byte by the release's
own assembly step (`docs/specs/storeroom-publish/contract.md §2.3` item 2; `PUB-DD-11`). **Three spellings of the
licence stand in this repository and they are not identical:** the root `Cargo.toml` says `GPL-3.0-or-later`, the
binding's `Cargo.toml` says `AGPL-3.0-or-later`, and the published manifest says `AGPL-3.0`. **Do not assume the
root crate's spelling is a typo** — no clause of the tree says so, and the packaging decision it reflects is not
yours to reverse. **The manifest's field is the one that governs your use of what you installed.**

**AND ONE THING THAT IS ABSENT ON PURPOSE, SAID FIRST BECAUSE YOU WILL LOOK FOR IT: there is no release verb.**
No `dispose()`, no `close()` and no finalizer is a member (`bindings/js/index.d.ts`, the `StoreInstance`
declaration; `A74`). **The instance's state is released with the instance and by nothing else — construct one store
and keep it for the process's life.**

**The five decisions this guide exists to inform** — the checklist the archived guide carried and that is still
true of this surface:

- **Decide the address scheme before you write code.** `['domain', id, 'field']` — pick it once, write it down, and
  never let two subsystems invent two schemes. **The addresses are your schema** (§4).
- **Decide the tiers per data class** — what must survive a reboot (`file`), what may survive a reload (`mem`),
  what may vanish (`temp`) (§5).
- **Set `journalLength` against your undo promise**, not against a guess: it bounds the journal, which is the
  whole undo window (§5.4).
- **Decide the value shapes.** They must be crossing-compatible, so they are shapes you would send over an IPC
  boundary. Serialize once, at the boundary (§10).
- **Wrap every verb in one refusal→data mapper.** Refusals are thrown plain objects, and one place to branch on
  `status` is the whole design (§8).

---

## §2 · How you reach it: install, and the three rungs

### §2.1 One name to install

```sh
npm install provident-storeroom
```

**That installs the package and — if your platform is covered — its binary, as a dependency of its own.** You do
not install five packages; you install one and npm resolves the one your runtime needs.

### §2.2 The five platform packages, named and pinned

**The entry resolves its artefact in a declared order, and the first rung is the scoped per-platform package**
(`docs/specs/storeroom-publish/contract.md §1.1`; `bindings/js/README.md`, *How the addon is resolved*). **The
names are a closed set of five and are never built by concatenating tokens** (`P-PUB-2`; `publish/contract.md §1.3`):

- `@auspicion/provident-storeroom-js-linux-x64-gnu`
- `@auspicion/provident-storeroom-js-linux-arm64-gnu`
- `@auspicion/provident-storeroom-js-darwin-x64`
- `@auspicion/provident-storeroom-js-darwin-arm64`
- `@auspicion/provident-storeroom-js-win32-x64-msvc`

**Measured 2026-10-26 at `bindings/js/package.json`: all five stand in `optionalDependencies`, each pinned to
`0.5.0` — an exact version, five times, with no caret, no tilde and no range.** **THE PINS ARE EXACT ON PURPOSE AND
YOU SHOULD NOT "RELAX" THEM:** npm's dedupe could otherwise satisfy the loader with a differently-versioned copy
hoisted into your tree, and the exact pins are what closes that window (`PUB-DD-10`'s `alt` cell, which prices a
range and refuses it).

**⟶ AND THE FIGURE IS CORRECTED AT THIS DATE: each of the five is pinned to `1.0.0`, not `0.5.0`** (`bindings/js/
package.json`, read at its own bytes 2026-10-26; `RCA-8(g)` ANNOTATE-BESIDE — the sentence above stands and is read
THROUGH this one). **THE READING IT TEACHES IS UNMOVED AND IS THE POINT: five EXACT pins, no caret, no tilde and no
range, all six figures moving together (§0 item 1; `PUB-DD-10`).** **`1.0.0` is the package's own version (§0 and
§11), so the main `version` and the five pins are one figure and a consumer who reads a `0.5.0` anywhere in a
manifest has the wrong package.**

**⟶ AND THE FIGURE MOVES AGAIN, 2026-10-27: each of the five is pinned to `1.0.1`, not `1.0.0`**
(`bindings/js/package.json`, read at its own bytes; §0's correction of this date; `RCA-8(g)` ANNOTATE-BESIDE — the
two clauses above stand and are read THROUGH this one). **THE READING THEY TEACH IS UNMOVED AND IS THE POINT: five
EXACT pins, no caret, no tilde and no range, all six figures moving together (§0 item 1; `PUB-DD-10`) — so `1.0.1`
is the package's own version and the five pins' one figure, and a consumer who reads anything else in a manifest
has the wrong package.**

### §2.3 The three rungs

1. **RUNG ONE — the scoped platform package for this runtime's `process.platform` × `process.arch` key.** This is
   the rung that fires in a published install. **Every throw at this rung is a MISS and not an error** — it falls
   through rather than reporting (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/resolution.md
   §2.1`–`§2.2`, archived).
2. **RUNG TWO — the module-relative addon beside the entry** (`build/Release/storeroom_js_binding.node`), computed
   from the entry module's own location and from no other source: **no environment variable, no configuration
   key, no path relative to the working directory and no search of a parent directory.** **This is the
   checkout-only rung** — a `files`-restricted tarball does not carry it — and no version is compared here
   (`bindings/js/README.md`; `resolution.md §3.2`, archived).
3. **RUNG THREE — the declared absent-addon form.** Failing both, `storeCreate` throws the one refusal carrying
   the store's `FilePathUnreachable`, **and no instance is returned.**

**THERE IS NO FALLBACK AND NO JS-SIDE STORE.** An absent or failed addon refuses; it never degrades to a JavaScript
store, never absorbs state silently and never returns a partial instance (`bindings/js/README.md`; `PUB-DD-1`,
`PUB-DD-2`; `resolution.md §5.3`, archived).

**AND THE UNCOVERED-TARGET ANSWER IS A DECLARED LIMITATION, NOT AN ERROR YOU CAN FIX AT THE INSTALL:** a
`process.platform` × `process.arch` pair outside the five covered keys gets **no binary** — rung one is not
attempted at all, because no name exists for that pair — and a published install carries no `build.rs`, no
`Cargo.toml`, no `src/**` and **no `postinstall` build-on-install step.** **Your only route is to build the store
crate from its source yourself; a covered consumer needs no Rust toolchain, an uncovered one does**
(`publish/contract.md §2.1` item 3; `PUB-DD-1`).

---

## §3 · The surface: one module name and fourteen members

```js
import { storeCreate } from 'provident-storeroom';
```

**That is the whole module namespace — ONE name, `storeCreate`, and nothing else.** There is **no** module-level
`read`, `write`, `listen` or any other verb (`bindings/js/index.d.ts`'s preamble; `surface.md §2.9` item 1's `A127`
clause, the module count `11 → 1` ✓; measured 2026-10-26: the imported namespace's keys are `["storeCreate"]`).

### §3.1 The instance, and its fourteen own members

```js
const store = storeCreate({
  journalLength: 256,       // REQUIRED — a positive integer, bounds the journal and so the undo window
  listeners: [],            // REQUIRED, even when empty — an absent `listeners` is refused
  filePath: '/…',           // OPTIONAL — what makes the `file` tier real, and what construction occupies
  constraints: [],          // OPTIONAL — your own list; NEVER persisted (§7.2)
});
```

**`storeCreate` answers an instance carrying exactly FOURTEEN own members** — `10 + 1 + 1 + 2 = 14` ✓ — and they
are these fourteen and no others (`bindings/js/index.d.ts`, `StoreInstance`;
`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9):

| member | its declared shape | one line |
|---|---|---|
| `read` | `(address, tier?) => unknown` | a leaf's literal, a branch's assembled value, or the whole register |
| `readLiteral` | `(address, tier?) => unknown` | the same, narrowed to a leaf — **a branch refuses** |
| `write` | `(address, tier, value, commit?) => WriteRecord` | `commit` is the kernel's own position; leaving it out is the supported form |
| `delete` | `(address, tier?) => DeleteRecord` | **a method name, not an identifier binding** — `store.delete(…)` |
| `rollback` | `(opId) => RollbackRecord` | walks backward and undoes **that op and everything after it** in scope |
| `listen` | `(handle, addresses) => Handle` | **you spell the handle**; the address position is a **SET**; answers the standing handle |
| `unlisten` | `(handle) => void` | withdraws the store-side entry, and the registry entry where the identity stands nowhere |
| `register` | `(handle, listener) => void` | one handle, one function — a second registration replaces the first |
| `removeListener` | `(handle) => void` | the entry removed whole and its store entries withdrawn |
| `addConstraint` | `(pair, constraint) => ConstraintIdentity` | the ADD route; **overwrites at a held pair and throws nothing for it** |
| `constraintOn` | `(pair, constraint) => void` | enable — idempotent; throws at a pair the store does not carry |
| `constraintOff` | `(pair, constraint) => void` | disable — idempotent; **not a removal** |
| `removeConstraint` | `(pair) => void` | **the one act that deletes an identity** |
| `constraints` | `() => ConstraintPair[]` | the registered pairs, `{address, id}` only — **no function, no identity, no order, no `enabled`** |

**Measured 2026-10-26, on an instance built in memory: `Object.keys(store)` and
`Object.getOwnPropertyNames(store)` are both this same fourteen-name list, and the `read` member's own descriptor
reads `writable: true, enumerable: true, configurable: true`.** **THERE IS NO `on`, NO `off` AND NO `settle`.** `on` and
`off` were merged away — registration is `listen` then `register`, and withdrawal is `unlisten` — and `settle`
was removed whole when the kernel became the only write path (`index.d.ts`, the member-set clauses of 2026-10-18
and 2026-10-19; `A127`). **A guide or a README that declares a `settle` member is describing a surface that no
longer exists.**

### §3.2 The private-state rule

**The instance is the handle you act through, and no own member is a data member.** There is no `store.data`, no
`state` field and no getter over the register; **`read(address)` is the route.** A consumer that expects
`store.data`, `store.store` or a `state` property is reading an object that does not exist
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/surface.md §2.1` (e) item 1, archived at its
operative clause; `A117` (D6)).

### §3.3 The `commit` position, and why you should leave it out

**`write`'s fourth position is the optional `commit`** — `write(address, tier, value, commit?)` — and **an absent
`commit` is in domain**: the write opens or joins a commit all the same (`surface.md §2.2` clause 3;
`index.d.ts`, the `write` member). **Passing one is the kernel's own route into a write, and a caller leaving the
position out is the supported form.** **Every form at that position other than an object carrying a `pending`
member present and not `undefined` throws the class test's own `TypeError`, whose `status` member is ABSENT** — and
**a refused position stops the write: no verb is reached and no byte moves** (`surface.md §2.4` item 9 (g) item 1).

**And one reading that catches people: a SUPPLIED `undefined` at a `tier` position is not the same call as no
position at all.** It is a PRESENT value, and the store answers `AddressMalformed` for it; only the call that
supplies nothing there folds to the absent tier (`parameter-semantics.md §2.6`, `PAR-JS-6`, archived; `index.d.ts`,
`TierSet`).

---

## §4 · Addresses

```ts
type Address = readonly (string | number)[];
```

**An address is a path from the register, walked one segment at a time.** A segment is either a `string` key or a
**non-negative integer index** (`bindings/js/index.d.ts`, the `Address` declaration; `PAR-JS-5`).

```js
store.read([])                     // THE WHOLE REGISTER — measured 2026-10-26: `{}` on a fresh store
store.read(['users'])              // a branch: its assembled value
store.read(['users', 0, 'name'])   // a leaf's literal
store.readLiteral(['users', 0])    // a leaf only — a branch refuses with `ReadTargetIsBranch`
```

**Five rules, each of which a reader guesses wrong at least once:**

1. **The empty address resolves to the register, and the register is itself a branch** — so read it with `read`,
   never `readLiteral`.
2. **The empty string `''` is a legal key, and there is no delimited address form.** `'a.b'` is not an address; it
   is a single string key that happens to carry a dot, and an address is an ARRAY of segments
   (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/crossing.md §1.3`, `AddressArg` rows 2 and 6,
   archived).
3. **An integral segment is in domain up to `Number.MAX_SAFE_INTEGER`.** Anything integral above `2^53 − 1` is
   `AddressMalformed` — refused, never folded onto a nearby address (`crossing.md §1.3`, the `AddressArg` row 3
   range clause).
4. **An index aimed at the register is `AddressNotFound`** — the register is keyed by names and holds no index
   semantics (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/store-model.md §2.2`, arm
   `L-INT-REG`).
5. **An array with a hole is not an address.** A sparse address array is `AddressMalformed`, because the two
   readings of a hole disagree and neither may be chosen silently (`crossing.md §1.4` item 2).

**And the sentence that saves the most time: a nested write does not create its parent.** Writing beneath a path
does not bring the path into being; the parent must already stand, and the failure is the write's own
`AddressNotFound` naming the container it looked in (`archive/pre-strata-docs-2026-10-24` — the archived
`write-and-read.md` `§3.2`, items 1–2, arm `F-3`). **So create the shape you mean, then fill it** —
either write the parent first, or **write a whole structured value at the key, which mints the branch tree beneath
it in one call** (`write-and-read.md §3.4`, arm `W-4`).

**A branch assembles one member per child key**, a branch whose container is an array assembles a **dense array**,
and **an empty container reads `{}` or `[]` — the two are distinct, and that distinctness is what makes the
container's kind observable at a read** (`write-and-read.md §4.2`, arms `R-2`/`R-3`). **A write whose value kind
contradicts the container's answers `ContainerKindConflict` rather than converting** (`write-and-read.md §3.4`,
arm `F-4`). **That is a design decision you make once per key, not something the store repairs for you.**

---

## §5 · Tiers

**The tier order is `file` > `mem` > `temp` in persistence**, and what each means for you is lifetime: `temp` is
shadowed by writes to `mem`, `mem` lives for the session, `file` is for anything that must be there on the next
boot (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md §3.1.1`).

### §5.1 The tier order decides which version a read lands on — it is not a layered stack

**Writing at a tier does not add a version beside the old one: the write purges the versions it outranks, and one
version is left holding the key** (`write-and-read.md §3.4`, arms `W-6` and `W-1`; §3.2 item 3). **A read narrowed
to a tier the key no longer holds refuses `TierNotFound`, and the message names the tiers that ARE present**
(`write-and-read.md §4.2`, arm `R-4`'s message obligation).

**There is one state in which two versions DO stand at one key, and it is the exception that makes the rule
readable: a SHADOW.** When the key holds a version at a tier MORE persistent than the write's, the newer version
is added alongside and the more persistent one wins the unqualified read. **So "one version per key" is not the
invariant; "the write's own tier decides which versions survive it" is** (`write-and-read.md §3.4`, arm `W-5`).

**Whether declared semantics and shipped behaviour agree at every arm and every tier combination is not a
consumer guide's question, and this guide does not turn the rule above into a promise about any particular
pair — it states what to rely on: the order `file` > `mem` > `temp`, the `TierNotFound` refusal with its named
tiers, and the arity rule immediately below.**

### §5.2 The tier argument's arity differs by verb

**READERS take absent, ONE token, or an ARRAY of tokens read as an ANY-MATCH set. WRITERS AND DELETES TAKE EXACTLY
ONE TOKEN** — an array at `write` or `delete` is `OutOfDomainTier` (`bindings/js/index.d.ts`, the `TierSet`
declaration, which says so directly; `crossing.md §1.3`, `TierArg` rows 2 and 3).

| verb | `tier` absent | one token | an array | `null` / `undefined` |
|---|---|---|---|---|
| `read` · `readLiteral` | legal — the lowest persistence present | legal | **legal — an any-match set** | `AddressMalformed` |
| `write` | `AddressMalformed` | legal | **`OutOfDomainTier`** | `AddressMalformed` |
| `delete` | legal — every tier at the target | legal | **`OutOfDomainTier`** | `AddressMalformed` |

**Asking "do I have this anywhere durable or in memory?" is a legitimate question — `store.read(addr, ['file',
'mem'])` answers a node matching ANY of them. A write is going somewhere, and an array there would be a choice you
did not make.**

**And the tier's domain is three lowercase tokens: `file` · `mem` · `temp`.** `'secure'`, `'FILE'`, `'disk'`,
`'session'` and `''` are each outside it and each answers `OutOfDomainTier`; **`null` and `undefined` are not
tier-shaped values at all, so they answer `AddressMalformed` rather than `OutOfDomainTier`**
(`write-and-read.md §3.1.1`, and its `null`/`undefined` column clause).

**★ AND `listen` HAS NO TIER AT ALL** — it takes a handle and an address SET, and nothing else (`index.d.ts`, the
`listen` member; `held-listener/contract.md §2.2` item 1's arity `2`). **The archived guide's tier table carries a `listen` row
and it is superseded: the verb's positions are `(handle, addresses)` and a tier-shaped argument at position two
is a set-position class refusal, not a tier.**

### §5.3 `write` and `delete` do not treat one tier alike

**A `write` at a tier purges the versions it outranks; a `delete` at a tier removes THAT tier's version and
leaves every other tier's version at that key untouched** (`write-and-read.md §4.4`, arm `D-1`). **A `delete` with
no tier removes every version at the target and all downstream of each; a delete of the empty address empties the
register; and a delete that removes nothing is a SUCCESS — it answers `tiers: []` rather than throwing**
(`write-and-read.md §4.3`, `§4.4` arms `D-2`, `D-3` and `D-5`). **⟶ AND A `delete` THAT REMOVES SOMETHING NOW PASSES CONSTRAINTS** — see §7.8; a delete that removes
nothing is not an edit and runs no pass.

### §5.4 Undo is bounded by the journal, and `rollback` is not a single-op undo

**`rollback` walks backward through the journal, from the newest in-scope entry to the oldest, and the scope is
every operation touching the same subtree as the named op — not the last op alone. There is no partial or subset
rollback** (`write-and-read.md §6.4`, arms `M-5` and `M-8`). **Its answer's `undoneOps` is the LIST of the ids the
reversal actually undid — a report of reversals PERFORMED, newest first, and never a census of in-scope entries**
(`index.d.ts`, the `RollbackRecord` declaration; `write-and-read.md §6.4` item 3 (i)). **`restoredTo` is the base
state the addressed subtree now stands at, `{ present, value }`.**

**Three more things about the journal, each of which changes how you use it:**

- **The journal is not readable, enumerable, addressable or deletable by any other call.** There is no
  `journalEntries()`, no `journalLength()` and no `clearJournal()`; **`rollback` is its only consumer, and the op
  crosses to you as a returned value on every write** (`write-and-read.md §6.3`).
- **`journalLength` is your whole undo window.** The store compacts entries into a base state as the journal
  fills, and **a rollback whose candidate set includes at least one compacted entry fails `RollbackCompacted` AND
  UNDOES NOTHING — the floor is all-or-nothing** (`write-and-read.md §6.1` `M-4`; `§6.4` `M-6`).
- **A rollback appends no journal entry, and an undone entry is marked `compacted: true`.** **The `compacted` flag
  is ONE predicate with TWO grounds** — compressed into the base state, or undone by a rollback — **and the record
  carries no member to tell them apart** (`write-and-read.md §6.4` `M-9`).

**★ A REVERSAL IS ALSO JUDGED BY YOUR CONSTRAINTS — AT THE STATE IT LEAVES, AND THAT ARM IS DECLARED BUT NOT
YET CARRIED, WHICH THIS GUIDE SAYS PLAINLY RATHER THAN LETTING YOU DISCOVER IT.** **The ruling** (`D-38`,
verbatim: *"Assert the constraints on rollback"*) **makes a `rollback` whose TERMINAL state violates a registered
constraint FAIL, answering `{status: 'ConstraintPassRefused', message, log}` at rank `20` — the same member a
constraint-refused `write` answers (`§8.1`).** **IT IS JUDGED AT THE TERMINAL STATE AND NEVER PER UNWINDING
STEP**, because a per-step check is unsound: a reversal passes through intermediate states no constraint would
approve, and only the state you are left standing in is a state a constraint can be asked about. **A LAWFUL
REVERSAL IS UNCHANGED** — same `{opId, undoneOps, restoredTo}`, no status and no throw. **MEASURED 2026-10-26:
the shipped `rollback` still consults no constraint** — a refusal registered over the address a reversal
restores is not evaluated, and the reversal succeeds — **so treat this paragraph as the ruling's declaration
and NOT as today's behaviour**; the arm's carrier is owed at the `rollback` member and is the only part of this
guide's constraint story that is not yet observable.

**⟶ AND THE CARRIER THAT PARAGRAPH SAYS IS OWED HAS LANDED (2026-10-26), SO THE RULING IS NOW TODAY'S BEHAVIOUR — WITH FOUR NARROWINGS YOU SHOULD MEET BEFORE YOU RELY ON IT.** `RCA-8(g)` ANNOTATE-BESIDE: **the ★ paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause — so do its two measured readings, *"the shipped `rollback` still consults no constraint"* and *"the arm's carrier is owed at the `rollback` member"*: each was true of the tree it was measured on and each is FALSE of the shipped tree from this date.** **WHAT YOU NOW GET: a `rollback` whose terminal state a registered constraint refuses throws `{status: 'ConstraintPassRefused', message, log}` at rank `20`, and a lawful reversal answers its unchanged record** — same `{opId, undoneOps, restoredTo}`, no throw, no new member. **WHAT THAT PROMISE DOES NOT COVER — FOUR LINES, EACH WITH ITS REASON:**
1. **A reversal INSIDE an open commit is NOT judged.** If you reverse from inside a constraint body, a repair, a listener, or the kernel's own failing-attempt floor call, the state the reversal leaves is not the state that stands (the open window moves it again, and the caller sees nothing yet) — **and judging it would invoke your constraint bodies MID-ATTEMPT and break `D-40`'s promise that a failed attempt leaves the store as it found it.** **The judgement is the AT-REST reversal's: your own `rollback` at the surface, where the state it leaves is the state you then read.**
2. **A DISABLED pair is NOT judged.** A pair you `constraintOff`'d still appears in `constraints()`, but the judgement asks only pairs that are enabled — **because a disabled pair cannot fire, so nothing it would refuse can have run.** Re-enable it and it is asked again at the next reversal.
3. **A pair registered STRAIGHT THROUGH THE KERNEL'S `K-1` is NOT judged at a reversal.** The judgement reads the package's own registry, which the package's declared registration routes write — `cfg.constraints` at construction and `addConstraint` after it — while a pair placed by a kernel-direct call is evaluated at writes but is **not** in the state the judgement reads (and `constraints()` does not list it either). **Register through the package's routes and the promise covers you.**
4. **WHEN IT REFUSES AND NO ATTEMPT STANDS, `log` IS ONE `constraint-check` ENTRY — NOT `[]`.** The `log` member is normally *"the attempt's own message log"*, and `[]` is its value where a failure's cause has no attempt; **a reversal's judgement is one of those causes, and here the refusal AUTHORS ITS OWN RECORD instead of reporting an absence:** `log.length === 1`, `log[0].kind === 'constraint-check'`, `log[0].id` the refusing pair's own id, `log[0].state` `null`, `log[0].opId` the reversal's own op id or `null`. **So do not read an empty array as *"nothing failed"* at this arm, and do not read this one entry as an attempt's history — it is the refusal's.** **⟶ AND FROM 2026-10-28 *"the attempt's own message log"* IS READ THROUGH `D-53` AS THE COMMIT'S OWN LIST** (§8.0a above): at this arm no attempt and no commit stands, which is what makes `[]` the wrong value here and one authored entry the right one.
**AND ONE THING ABOUT A FAILING REPAIR, WHICH IS THE SAME SHAPE AND IS DECLARED RATHER THAN DISCOVERED: THE FLOOR CALL RESTORES THE ADDRESS THE ATTEMPT WROTE; AN ADDRESS A REPAIR LANDED AT BESIDE IT IS NOT RESTORED.** `D-40`'s sentence — *"a failed attempt leaves the store exactly as it found it"* — is measured true of the attempt's own address and false of a beside address: the store's rollback scope is the addressed subtree at or after the named op's own position, so a repair that writes elsewhere leaves THAT value standing after the failed attempt. **If you need the beside address's pre-attempt value, keep it yourself: the store's own floor call does not put it back** (`docs/specs/storeroom-js/contract.md §2.6`'s clause of 2026-10-26, which is where the four narrowings, the `log` arm and this spatial scope are declared; `E2E-C-9` cell 6 in `tests/e2e/blind-constraints-v2.mjs` is the measured reach).

**⟶ AND THE ONE SENTENCE THAT WAS MISSING, DECLARED HERE IN THE TERMS YOUR OWN REVIEW ASKED FOR, 2026-10-28 — `D-55` · `DEF-AN`, THE ARCHITECT, VERBATIM: *"A constraint-refused edit rolls back to the previous safe state, with all edits in the commit undone. Specify this."*** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §5.4 above and below stands BYTE-FOR-BYTE and is read THROUGH this one; no rank, no status, no member and no promise moves — what this clause adds is the statement of WHAT THE ROLLBACK COVERS.** **THE RULE, IN ONE SENTENCE: a refused edit rolls the commit back to the state it opened at — every edit the commit made is undone, including writes that succeeded before the refusal.** **THE REASON, STATED SO YOU CAN REASON WITH IT: the restore names the mark the commit cached at its OUTERMOST OPENING** (§5.4's closing clause above), **and a commit is one unit of work, so the mark is not the refused op's own — it is where the WHOLE commit began.** **A write, a repair or a delete that landed EARLIER IN THE SAME COMMIT is undone WITH the refusal**, because the commit that carried it is undone; **that is WHY the mark is the outermost opening's and not the nearest one.** **WHAT STILL STANDS: a refused edit moves no state and mints no code beyond the one declared refusal; an edit in a DIFFERENT commit is not touched** — a listener body's own write opens its own commit (`D-53`), so it is a unit of its own and is not undone by yours. **MEASURED ON THIS CHECKOUT, 2026-10-28:** a write that succeeds inside a commit whose listener then reverses and is refused leaves the store at the state the commit opened at — the successful landing gone with the reversal — and the pair is asked at that state (`tests/e2e/discard-witness.mjs`'s `DW-10.5`).

**⟶ AND THAT ONE SENTENCE IS CORRECTED, 2026-10-28 — `D-63`: A REFUSED EDIT ROLLS BACK TO THE LAST VALIDATED STATE, NOT TO THE STATE THE COMMIT OPENED AT.** `RCA-8(g)` ANNOTATE-BESIDE: **the whole paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause; no rank, no status, no member and no promise moves — what moves is the STATE a refusal restores, and the sentence that names it.** **THE RULING, THE ARCHITECT, VERBATIM:** *"After the constraint sweep ends in a valid state, bump the restore mark. The passing constraint state marks the new next valid state."*

- **OLD → NEW, SO YOU CAN TELL WHICH BEHAVIOUR YOUR VERSION HAS.** **OLD:** *"a refused edit rolls the commit back to the state it opened at — every edit the commit made is undone, including writes that succeeded before the refusal."* **NEW:** *"a refused edit rolls the commit back to THE LAST VALIDATED STATE — every edit the commit made AFTER the last constraint sweep that passed is undone, and every edit that sweep APPROVED stands."* **THE RESTORE IS TOLD A POSITION AND THE POSITION MOVES FORWARD**: it starts where the commit opened and it moves to the store's own journal position at every constraint sweep that ends valid, **before the listeners are delivered.** **So `"the state it opened at"` is now the answer to exactly one case — a commit whose constraint sweep never passed — and it is today's behaviour there and stays.**
- **WHAT YOU WILL SEE, IN THE THREE SHAPES THAT MATTER TO A CONSUMER.** **(1) An edit that PASSED its checks STANDS even if a later step in the same commit is refused** — you asked for it, the constraints approved it, and the refusal is about what came after. **(2) A REPAIR'S WRITE GOES WITH THE WRITE**: a repair runs *during* the check, so if the check then refuses, the repair's edit is undone with yours. **(3) A LISTENER'S WRITE SURVIVES YOUR REFUSAL**: a listener is delivered *after* every constraint has passed, so its write is a later, discrete act and the restore of yours does not reach it — it is still there afterwards, and you should not treat a refusal as having undone it.
- **AND THE `DEF-AN` MEASUREMENT ABOVE STILL STANDS, FOR THE REASON IT STANDS.** That drive's pair refuses on the FIRST check, so that commit never reaches a passing sweep, nothing moves the mark, and the store returns to the state the commit opened at — **which is why the reading is unchanged and the rule that produced it is not.** The `D-63` arms are driven beside it in `tests/e2e/discard-witness.mjs` section `W12` (`DW-12.1`–`DW-12.4`), and `tests/e2e/in-commit-restart.test.mjs`, `tests/e2e/direct-pass-restart.test.mjs`, `tests/e2e/downstream-claims.test.mjs` and `tests/e2e/def-ae-restore-mark.test.mjs` carry the re-derived readings.

**⟶ AND WHAT THE STORE HOLDS AFTER A REFUSED REVERSAL, DECLARED HERE BECAUSE `1.2.0`'s ONE BEHAVIOUR CHANGE IS THIS AND NO SHIPPED DOCUMENT SAID IT UNTIL NOW.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §5.4 above stands BYTE-FOR-BYTE and is read THROUGH this one; this clause adds the declaration the release owed and moves no promise it prints.**

- **THE FACT: WHEN A REVERSAL IS REFUSED, THE COMPENSATING ACT PUTS THE STORE BACK AT THE MARK THE COMMIT CACHED WHEN IT OPENED — the journal's LAST VALID POSITION as it stood when that commit began (an op id, or the FLOOR where the journal held no entry then) — and never at whatever the journal's head happens to be when the refusal is built.** **Every address the reversal MOVED is read again afterwards and counted as restored only where it stands exactly as it stood before the reversal — the same value at the same tier, or absent where it was absent — and the refusal's one log entry says so address by address**, naming each address that could not be put back with what stands there instead and what it was owed (§8.1 row `20`; `js/contract.md §2.6`'s clause of 2026-10-27). **A reversal taken AT REST makes the two marks describe the same state** — it appends no journal entry — **so this is where the store stands either way at the surface.**
- **WHAT `1.2.0` CHANGED, IN ONE SENTENCE, SO YOU KNOW WHICH BEHAVIOUR YOUR VERSION HAS: BEFORE `1.2.0` THE RESTORE NAMED THE JOURNAL'S HEAD; FROM `1.2.0` IT NAMES THE OPENING MARK.** **Why the head was wrong is the measurement the ruling was taken on (`DEF-AE`):** *"a reversal appends no journal entry, so the head describes the state that stood before the action"* is true of a reversal **you** take at rest and **false of one taken inside a write's own commit** — there the ENCLOSING WRITE'S OWN OP stands at the head when a listener body's reversal runs, so the old compensation restored the write's LANDING and **a write that reported a refusal had left its own value standing** (measured: `9` stayed `9` where the refused write should have restored `7`). **In `1.2.0` a write that reports a refusal leaves the store where the ATTEMPT found it, not where the refusal's own op landed.** **A LAWFUL reversal is unchanged** (same `{opId, undoneOps, restoredTo}`, no throw), **and a lawful write still answers its record with its value standing.** **MEASURED ON THIS CHECKOUT, 2026-10-28:** a refused write restores the pre-attempt value at its own tier, and the reversal's own refusal restores the pre-reversal standing tier for tier (`tests/e2e/def-ae-restore-mark.test.mjs` cells `1`–`2`; `tests/e2e/refused-reversal-restore.test.mjs`'s shadow, higher-tier/parent and absent arms). **So the store after a refused reversal holds exactly the state the act FOUND — not a later landing that the refusal's own sentence has already told you was undone.**

---

## §6 · Watching for changes: the listener surface

**Listeners fire on `write` and `delete`, and never on a read.** A read is not a change, and a store that fired on
reads would fire on every render; **nor does a boot or any read-driven traversal fire a listener**
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md §6.5`).

```js
const handle = store.listen('greeting-watch', [['greeting']]);   // YOU spell the handle; the addresses are a SET
store.register(handle, (address) => {                            // handle + your function
  console.log('changed at', address);                            // the ONE argument is the write's address
});

store.write(['greeting'], 'mem', 'hello');

store.unlisten(handle);                                          // withdraw the registration
```

**Measured 2026-10-26: `store.listen('h1', [['b']])` answered the string `'h1'`, and `store.register('h1', () =>
{})` answered `undefined`.** **Each address in the set is itself an array of segments — `[['b']]` is a set of one
address — and `[]` (the empty set) is in the domain.**

### §6.1 `listen` takes an address SET and answers the handle

**THE SIGNATURE IS `listen(handle: Handle, addresses: readonly Address[]): Handle`** — arity `2`, position `1` a
non-empty `string` you spell, position `2` an ARRAY of addresses
(`docs/specs/storeroom-held-listener-identity/contract.md §2.2` items 1 and 2; `bindings/js/index.d.ts`'s `listen`
member, amended 2026-10-24).

**Four rules about that second position, and they are the ones a reader gets wrong:**

1. **A SINGLE address supplied as a bare array-of-segments is NOT an address set.** `listen('h', ['a'])` puts the
   STRING `'a'` where an address belongs — a string is not a segment list — so that call is a set-position class
   refusal, not a registration. **You mean `listen('h', [['a']])`** (`held-listener/contract.md §2.2` item 2: *"the
   position is a set and a segment list is a different shape"*). **The outside-value set of the set position is: ABSENT · `null` · `undefined` · a non-array · an
   array carrying a member outside the address domain · an array carrying a nested array-of-arrays that is not
   itself an address — and the declared answer for each is the one thrown form carrying the store's
   `AddressMalformed`.**
2. **THE EMPTY ARRAY IS IN DOMAIN.** `listen('h', [])` is a lawful call.
3. **THE SET IS AN ASSIGNMENT, NOT A UNION.** `listen(h, S2)` after `listen(h, S1)` **destroys `S1` wholly and
   installs `S2`**, with no intermediate state observable. **You cannot narrow a live handle's standing by
   omitting an address you previously named** (`held-listener/contract.md §2.2` items 3 and 4; `(R1)`).
4. **THE CALL ANSWERS THE HANDLE.** On success `listen` returns the handle it watches under — your own spelling,
   returned as the identity the store holds for that entry — and **every failure remains the one thrown form**
   (`D-22`, verbatim: *"Listen should return the handle on success, or error message on fail. Discard the noop
   prefix"*; `held-listener/contract.md §2.2`'s 2026-10-25 clause). **A caller that ignores the return is unaffected by the
   return's existence.**

### §6.2 `register`, `unlisten`, `removeListener`

**`register(handle, listener)` installs the function under a handle this instance holds an entry for; a second
`register` for one handle REPLACES the first, and the replaced function is dropped without notice**
(`surface.md §2.4` rule 2). **Measured 2026-10-26: `store.register('h9', () => {})` at a handle no `listen` wrote
and no `cfg.listeners` adopted threw the ONE PLAIN FORM — `{status: 'AddressMalformed', message, log}`, whose
message says *"this instance holds no listener entry for it — a registration names a handle `listen` wrote or
`cfg.listeners` adopted"*.** **That is the declared reading and not a `TypeError`:** the registration site's
refusal *"is a rejection under `A76` and travels in this section's single form, with its `status` drawn from the
store's closed set"* (`surface.md §2.5` item 5 (g)'s operative reading of 2026-10-17; `index.d.ts`'s `register`
block). **A `TypeError` from a store-reaching verb is itself treated as a finding at that site, which is how you
can tell the two apart.**

**`unlisten(handle)` withdraws the registration and performs the package's own half too:** the store-side entry
named by the call is withdrawn, and the registry's entry for the identity is removed **where the identity no
longer stands anywhere** (`surface.md §2.4` item 7 (b)'s step list, merged into this one member;
`held-listener/contract.md §5.5`'s fourth added entry). **Over a value outside the domain it is a PLAIN NO-OP SUCCESS** — a
fabricated handle, a blank token, a prior session's token — producing no code and removing no other registration.

**`removeListener(handle)` is the stronger member and it is not the same act: the listener entry is removed WHOLE
and its store entries are withdrawn, and every arm that is not a REAL removal THROWS** (`held-listener/contract.md §2.7` item 2;
`PAR-HL-14`, `PAR-HL-15`; `index.d.ts`). **Measured 2026-10-26: `removeListener` at a handle the instance holds no
entry for threw the one plain form with `AddressMalformed` and the message *"…removeListener's first argument is
'h9', and this instance holds no listener entry for it"*.** **So `unlisten` is a no-op and `removeListener` is not:
choose the one whose answer you want when the handle is stale.**

### §6.3 The store invokes nothing

**The store returns the triggered set and invokes no callback.** The invocation is the CLIENT's act, and the
package's per-instance registry is the handle→function map (`write-and-read.md §3.5`'s amended record and the
store-side clause it cites; `surface.md §2.4` items 5–6). **That is why a registration is a member of the
instance and not a function you hand to the store.**

**Four rules, and they are the package's rather than yours to reimplement:**

1. **An unregistered handle fires nothing, silently** — no warning, no log, no code. **The silence is an
   assertable observable** (`surface.md §2.4` rule 1).
2. **`triggered` membership is decided by address and by nothing else:** a handle appears exactly where **its
   listener's address is a PREFIX of the triggering address** (`surface.md §2.3` item 5). **So a listener bound at
   a strict descendant of a deleted address does NOT fire.**

   **⟶ AND THE SECOND ARM IS `TOUCHED`, 2026-10-29 — `D-66` AND `D-67`, AND THE SENTENCE ABOVE IS READ THROUGH
   THIS ONE.** `RCA-8(g)` ANNOTATE-BESIDE: **that sentence was the build's rule until this date, and the
   architect measured what it costs** — verbatim: *"Does the listener get fired when the value is purged by a
   higher-persistence write that doesn't include it? Because that's the actual problem"* (`strata/decisions.md`
   · `D-67`). **THE ANSWER WAS NO, AND THAT WAS THE DEFECT.** **So a handle now appears where its address is a
   PREFIX of the triggering address (`D-56`, unmoved) OR WHERE THE ACT TOUCHED IT (`D-66`)** — the touched set
   being the paths the act's value contains together with the whole subtree of every version that act PURGED,
   **a purge at a higher persistence included, which is the case the prefix rule could not reach.** **A LISTENER
   BOUND AT A STRICT DESCENDANT OF A DELETED ADDRESS DOES FIRE**: the cascade removed its node, so the value a
   read there returns changed. **AND A CONSTRAINT IS REACHED BY THE SAME ONE PREDICATE** (`D-69`: a registration
   is a handle and a body, and a pair has both), **so `triggered` names both kinds in one list and the kernel
   filters it — an element that is a constraint's `id` is ASKED, a listener's is DELIVERED.** **MEASURED
   2026-10-29 on this checkout** (`tests/e2e/discard-witness.mjs`'s `DW-14.1`/`DW-14.2`/`DW-14.3`): a listener at
   `['a','b','c']` fires once for a write at `['a','b']` that writes `c`; a `file`-tier write that purges a node
   with a `mem` shadow fires the listener bound at the purged path **and** asks the constraint bound there, while
   the pair at an address neither value names is asked nothing.
3. **A registration made during a firing window is not invoked during that window.** A delivery's recipient set
   is read from the array as it stands when the window opens (`surface.md §2.4`, the delivery-window clause).
4. **One invocation per distinct handle.** A handle bound at two addresses that both match fires ONCE
   (`held-listener/contract.md §2.4` item 6; `surface.md`, *"a lawful duplicate fires once per distinct handle"*).

### §6.4 What a record's `triggered` and `watched` carry

**A trigger is a PAIR, `{handle, address}` — not a bare handle.** **`address` is the address the listener was
BOUND at, never the address the write targeted**, and the two are told apart: **the invocation's one argument is
the write's address** (`index.d.ts`, `TriggerPair`; `held-listener/contract.md §2.4` items 1 and 7; `PAR-HL-19`–`PAR-HL-21`).
**There is no parallel `triggeredAddresses` array and none may be added.**

**★ ⟶ AND WHAT THAT ONE ARGUMENT DOES NOT CARRY, STATED BESIDE IT 2026-10-29: it names the ACT's address and
never what MOVED under it — so a container listener that must know which position moved diffs the collection
itself** (§7.9's item 4, where the reason is given: the act's address is the store's own datum, and which
position moved is the caller's question).

- **`write` answers `{op, watched, triggered}`** (`index.d.ts`, `WriteRecord`). **`op` is the store's own journal
  record and not a number** — `{opId, kind, address, tier, before, after, seq, compacted}` — and **the op's
  `opId` is a string** and is the token `rollback` accepts (`index.d.ts`, `JournalOp`). **`watched` carries
  ADDRESSES where `triggered` carries pairs — two types on purpose, so a call site cannot confuse the two lists**
  (`index.d.ts`, `WriteRecord`; `write-and-read.md §3.5`).
- **`delete` answers `{address, tiers, triggered}`** — `tiers` naming the tiers whose versions were REMOVED, and
  `address` being your own array (`index.d.ts`, `DeleteRecord`).
- **`rollback` answers `{opId, undoneOps, restoredTo}`** (`index.d.ts`, `RollbackRecord`).
- **Neither list's ORDER is declared.** Compare them as SETS, never as sequences (`DD-22`, `DD-37`;
  `held-listener/contract.md §2.4` item 6's no-order rule).
- **`triggered` is always a list and may be empty; it is never absent.** A delete that removes nothing is a
  SUCCESS carrying `tiers: []` and `triggered: []` (`write-and-read.md §4.4`, arm `D-3`).
- **The kernel's own `pending` list carries the same pair element as `triggered`**, because `pending` is seeded as
  a clone of the store's returned set (`index.d.ts`, `CommitRecord`; `held-listener/contract.md §2.4` item 3).

**⟶ AND THAT BULLET IS THE ONE THAT MOVED, 2026-10-29 — `D-56`: A PASSING WRITE NOW EMPTIES `pending`.** `RCA-8(g)`
ANNOTATE-BESIDE: **every clause above stands BYTE-FOR-BYTE and is read THROUGH this one; the record's four members,
the seeding rule and the by-identity check-off do not move — what moves is HOW MUCH of the seeded set the pass takes
out of it.** **THE MECHANISM, IN ONE SENTENCE: `pending` is seeded whole from the store's `triggered` set and every
handle the pass EVALUATES is checked off by identity, so when the pass's set and the store's set are the SAME SET the
residue is EMPTY.** **`AT `1.4.0`'s PREDECESSOR** the pass selected only the pairs standing at the act's EXACT
address, the store's `triggered` set was already the wider PREFIX set, and the difference was the residue you saw: a
pair at `['window','tabs']` fired for a write at `['window','tabs','landingPage']` (a listener, `§6.4`) and was
never asked by the pass — so its handle stayed in `pending` and the delivery ran it. **NOW the pass's set IS the
`triggered` set** (`§7.6`'s clause of 2026-10-29, `D-56`), **so on a PASSING write every handle in the returned set is
checked off, `record.pending` reads `[]`, and the delivery's residue is empty.** **MEASURED `1` → `0` on a passing
write.** **WHAT THAT MEANS FOR YOU, SAID PLAINLY: `pending` IS NO LONGER A LIST OF "WHAT I STILL OWE A DELIVERY TO" —
IT IS THE LIST OF HANDLES THE PASS DID NOT EVALUATE, and on a passing write there are none.** **A non-empty `pending`
therefore means one of two things and only two**: the write FAILED (the record's `pending` is then the whole returned
set, because a failing arm checks nothing off), or a handle stands in `triggered` that stands at none of the pass's
addresses — **which, from this date, is the DESCENDANT direction `D-56` does not cover.** **Read `triggered` for what
fired and `pending` for what the pass left; on a passing write they are no longer the same list, and `pending` is the
shorter one.** (`D-56`; `index.d.ts`'s `CommitRecord`; §7.6's prefix-set clause; §7.8's ancestor clause.)

**⟶ AND THE SENTENCE THAT SAYS A PASSING WRITE EMPTIES `pending` IS RE-MEASURED ONE ARM FURTHER, 2026-10-29 — THE PASS CHECKS OFF WHAT IT ASKED, AND A LISTENER'S HANDLE IS THE DELIVERY'S.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one — so does its *"on a PASSING write every handle in the returned set is checked off, `record.pending` reads `[]`"*, which is exactly true of a fired set made of CONSTRAINTS and is not true of a fired set that also carries a LISTENER.** **MEASURED 2026-10-29 ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY, BOTH ARMS PRINTED:** a pair at `['anc']` with a passing write at `['anc','child']` — `K-2`'s record carries `['anc-pair']` and after the pass it carries `[]` ✓ **the `1 → 0` the clause above measured**; the same write with a listener also bound at `['anc','child']` — `K-2`'s record carries `['anc-pair','watch-child']` and **after the pass it carries `['watch-child']`**, because **the pass evaluates CONSTRAINT ROWS and a listener's handle is the DELIVERY's work and never the pass's.** **SO READ IT PRECISELY: ON A PASSING WRITE `pending` HOLDS EXACTLY THE HANDLES THE PASS DID NOT EVALUATE — NO CONSTRAINT AT AN ADDRESS IT ASKED, AND EVERY LISTENER THE DELIVERY WILL FIRE** — **and `[]` is that member's value when nothing but constraints was fired.** **NO MEMBER MOVES AND NO FIGURE OF THE CLAUSE ABOVE IS WITHDRAWN: this is its reading, one arm wider.** (`D-56`; `D-69`; `tests/e2e/discard-witness.mjs`'s `DW-14.4`; §7.6's prefix-set clause.)

**⟶ AND THE COMPOSITION IS NOW MEASURED, 2026-10-29 — `D-69`, AND EVERY SENTENCE ABOVE STANDS BYTE-FOR-BYTE.**
`RCA-8(g)` ANNOTATE-BESIDE: **the clause above reasons about the member's SIZE; this one states what the member now
CARRIES, because `D-69` moved the store's set as well as the pass's.** **THE STORE NOW NAMES A CONSTRAINT STANDING AT
A TOUCHED DESCENDANT** — `D-66`'s criterion, computed where the per-tier versions live (`D-67`) — **so `pending` is
seeded with that `id` where it was not before, and the pass then ASKS it and CHECKS IT OFF like any other element.**
**MEASURED, BEFORE → AFTER, on one drive** (`tests/e2e/discard-witness.mjs`'s `DW-14.4`): a write whose pair stands at a
TOUCHED DESCENDANT and whose listener stands at an ancestor — at `K-2`'s return the member carries **2** elements
(the constraint's `id` AND the listener's handle) where the prefix-only composition carried **1**, and after the pass
it carries **1** (the listener's handle, which is the DELIVERY's work and never the pass's) — **so the composition
moves AT `K-2` and the delivered residue is unmoved.** **WHAT THAT MEANS FOR YOU, SAID PLAINLY: a `pending` entry is
either a listener the delivery still owes (the residue) or a constraint the pass has not reached (the failing arm's
whole set) — and on a passing write the pass asks EVERY element the store named that IT HOLDS A ROW FOR, so the
residue's only remaining constraint is one it holds no row for.** **THAT ONE STATE IS REACHABLE AND MEASURED**
(`tests/e2e/discard-witness.mjs`'s `DW-14.3`): **a registration whose own constraint REFUSED it at the registration
instant** — `ConstraintRefusedAtRegistration`, state `2` of `contract.md §7.3` (b) — **leaves the store-side entry
standing and NO row in the kernel's registry**, so the store's `triggered` names that handle, the pass asks nothing
for it, and it stays in the residue; **it fires NOTHING, silently, and its body's one run is the registration's own
evaluation** (`surface.md §2.4` rule 1). (`D-69`; `D-66`; `D-67`; `kernel-surface.md §2.1` item 2's `A112` reading.)

**And one store behaviour that shows up in the records if you use integer addresses: a delete of an indexed
version of an array container RENUMBERS the surviving anchors in container order from `0`, each keeping its tier
and its node** (`write-and-read.md §4.4`'s renumbering clause).

**★ AND WHICH KIND YOU ARE IS THE QUESTION THIS SURFACE LEAVES YOU, 2026-10-29 — `D-70`: IF YOUR CALLBACK CHANGES
THE STORE IT IS A CONSTRAINT OR A REPAIR (§7), AND IF IT TELLS THE WORLD IT IS A LISTENER.** **§7.9 states the three
rules, each with its reason, and they govern what you register and where — because this surface's other kind is one
section away and the two are NOT interchangeable: a listener at a derived index is a registration on a value the
store never wrote, and a listener that writes has no loop guard to bound it.** (`D-70`; §7.9.)

### §6.5 ★ A LISTENER'S OUTCOME IS NOT YOURS — its own commit, and its refusal cannot fail your write

**★ THE RULING, IN THE ARCHITECT'S OWN SENTENCE** (`strata/decisions.md` · `D-71`, verbatim): *"A listener is
independent of the commit record of the triggering caller. The caller does not need to know about the outcome of
the listeners."* **AND THE CONSEQUENCES, STATED BECAUSE EACH IS SOMETHING YOU WILL OTHERWISE GUESS AT:**

1. **A LISTENER RUNS IN ITS OWN COMMIT** (`D-45`), **AND ITS OUTCOME — PASSED OR REFUSED — IS THAT COMMIT'S**, not
   yours.
2. **THE TRIGGERING CALLER RECEIVES ITS OWN OUTCOME AND NOTHING ABOUT THE LISTENER'S.** **Your record is your
   write's** — `op`, `watched`, `triggered` (`§6.4`) — **and it carries no member for what a listener's own
   commit did.**
3. **A LISTENER'S REFUSAL DOES NOT FAIL THE WRITE THAT FIRED IT.** **A listener is a SIDE EFFECT for external
   code, and a side effect's failure is the side effect's** — your write already passed every constraint and
   already answered before the delivery ran.
4. **AND BECAUSE OF THAT, THE ONLY THING A CHAIN OF LISTENER WRITES EXPOSES UPWARD IS ITS COST** — depth, and
   whatever the listener itself does with what its own call returns. **Which is why the missing loop guard is the
   asymmetry that matters** (`§7.9` item 2): **nothing else about the chain is observable, so nothing else can be
   bounded.**

**MEASURED 2026-10-29 ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY — AND THE MEASUREMENT IS THE POINT, BECAUSE
THIS IS A CLAIM ABOUT WHAT CROSSES AND IT MUST BE PRINTED RATHER THAN ASSUMED.** One store: a listener at `['a']`
whose body writes `['b'] = 'bad'`, and a constraint at `['b']` that refuses `'bad'` with
`{message: 'b may not be bad'}`. **WHAT THE DRIVE PRINTED, RAW:**

- **THE CALLER'S `store.write(['a'], 'mem', 1)` ANSWERED NORMALLY** — `{op: {opId: 'op-1', kind: 'write', address:
  ['a'], tier: 'mem', before: {present: false}, after: {present: true, value: 1}, seq: 1, compacted: false},
  watched: [['a']], triggered: [{handle: 'watch-a', address: ['a']}]}` — **no refusal, no status and no `log`
  member: nothing of the listener's outcome crossed.**
- **THE LISTENER'S OWN WRITE WAS REFUSED, INSIDE THE LISTENER** — caught there as
  `status: 'ConstraintPassRefused'`, `message: 'b may not be bad'`, own members `['status', 'message', 'log']`
  — **and that refusal was the listener's to catch; the call above never saw it.**
- **THE STORE AFTER THE CALL: `['a']` reads `1`, AND `['b']` READS ABSENT (`AddressNotFound`)** — the listener's
  own commit restored itself to where it opened (`§5.4`), and the caller's landing stands.
- **THE CONTROL, WHICH IS WHAT MAKES THE MEASUREMENT MEAN ANYTHING: the same caller writing `['b'] = 'bad'
  DIRECTLY is REFUSED, same `ConstraintPassRefused`, same message.** **So the constraint was armed throughout,
  and what differs is only WHAT CROSSES — a caller's own refusal crosses, and a listener's does not.**

**WHAT THAT MEANS FOR YOU, SAID PLAINLY: YOU CANNOT READ A LISTENER'S SUCCESS FROM ANY RETURN VALUE.** **No
member, no log entry and no status on your record says a listener's own write landed; the only way your code
learns it is if the listener body tells you out of band.** **That is the design and not a gap, and it is the
reason the next subsection's chain is bounded by cost alone.** (`D-71`; `D-45`; `§6.4`'s record members; `§7.9`.)

**AND THE ONE THING INDEPENDENCE DOES NOT COVER, MEASURED SO IT IS NOT INFERRED: A LISTENER THAT THROWS IS NOT A
LISTENER THAT IS REFUSED, AND ITS THROW CROSSES ALL THE WAY UP.** **MEASURED 2026-10-29, on this checkout, through
the published entry:** with `hA` at `['a']` writing `['x']` and `hN` at `['x']` throwing
`new Error('boom-in-nested-listener')`, the run printed `["A", "nested throws", "A caught Error"]` **and the OUTER
`store.write(['a'], 'mem', 1)` THREW that `Error`** — the delivery's own rule that *"a throwing listener body is
not caught, not retried and not reported"* (`docs/specs/storeroom-js/contract.md §2.7` item 4) **read through the
nesting's synchronous stack.** **SO THE INDEPENDENCE IS THE COMMIT'S: a refusal is the nested commit's and cannot
cross, while a raw throw is not a commit outcome and does cross, because the call is on the same stack and nothing
catches it on the way up — and the caller's write is then never answered at all.** **If you want a listener's
failure to stay the listener's, catch it in the listener's own body.**

### §6.5a ★ THE ASYMMETRY IS THE DESIGN — a refusal is CONTAINED, a throw is NOT, and the reason is whose code failed

**★ THE RULING, THE ARCHITECT, VERBATIM** (`strata/decisions.md` · `D-73`): *"Keep the throw so that the client can
log errors cleanly"* — **and it completes `§6.5`: the independence stands, and the THROW is the one thing it does not
cover.** **STATE THE TWO HALVES AS A PAIR, BECAUSE THE ASYMMETRY IS THE POINT:**

- **A LISTENER'S REFUSAL IS CONTAINED.** **Its own commit is refused, YOUR write answers its own record, and the
  refused value never lands** — **because a refusal is a JUDGEMENT ABOUT DATA, and the data had its chance.**
- **★ A LISTENER'S THROW PROPAGATES TO YOU.** **YOUR write throws the listener's error** — **because a throw is an
  ERROR IN THE CLIENT'S CODE, and code that swallows errors cannot be debugged.** **A CONTAINED THROW IS AN ERROR
  NOBODY CAN LOG.**

**AND THE REASON IS WHERE THE CODE RUNS: a listener is where YOUR handler runs** — **the screen update, the render,
the external call** — **so when that code fails, the failure belongs to you, at the point you can see it.**
**CONTAINMENT WOULD PRODUCE THE OPPOSITE: "your write succeeded and nothing happened" — the least debuggable outcome
a library can produce.**

**★ AND THE CONSEQUENCE, STATED SO IT IS NOT A SURPRISE: A LISTENER THAT THROWS LEAVES YOUR WRITE UNANSWERED.** **You
see the listener's error instead of your own record, and that is your signal to log and decide.** **MEASURED
2026-10-29 ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY, BOTH HALVES PRINTED RAW:**

- **THE THROW.** One listener at `['a']` throwing `new Error('boom-in-listener')`. **`store.write(['a'], 'mem', 1)`
  THREW**, and what it threw **IS the listener's own `Error` — identity `===` true**, `{name: 'Error', message:
  'boom-in-listener'}` — **and the write ANSWERED NOTHING** (`undefined`; no record was produced). **The data had
  already landed (`read(['a'])` answered `1`), because the commit resolved before its delivery ran; what the throw
  takes away is the ANSWER, not the write.**
- **THE REFUSAL, as the control.** One listener at `['a']` whose body writes `['b'] = 'bad'`, against a constraint
  at `['b']` refusing `'bad'`. **The listener's own write was refused INSIDE the listener** — `{status:
  'ConstraintPassRefused', message: 'b may not be bad', log: […] }`, own members `["status","message","log"]` —
  **`store.write(['a'], 'mem', 1)` RETURNED ITS OWN RECORD** with **no status and no `log`**, and `['b']` read
  **ABSENT**. **The same caller writing `['b'] = 'bad'` directly WAS refused with the same status — so the
  constraint was armed throughout, and the difference is only WHAT CROSSES.**

**WHAT THAT MEANS FOR YOU, AND IT IS THE SHAPE TO WRITE: A LISTENER BODY LOGS ITS OWN ERRORS AND DECIDES WHETHER TO
RETHROW.** **YOUR WRITE IS THE ONE PLACE THE LISTENER'S FAILURE SURFACES.** **Catch in the body to keep a failure
inside the listener** (`§6.5`'s closing sentence) **— and let it out to hand the error to the caller that can log
it.** **There is no middle arm: nothing in your record reports a listener's throw afterwards, because after a throw
there is no record — only the error.** (`D-73`; `D-71`; `D-45`; `docs/specs/storeroom-js/contract.md §2.7`'s clause
of the same date; `§6.6`'s item 5, where a DEPTH-TWO throw's destination is measured.)

**★ AND THE PRACTICAL HAZARD THIS ASYMMETRY MAKES REAL, WRITTEN HERE SO YOU MEET IT IN A TEST RATHER THAN IN PRODUCTION: THE WRITE'S DATA LANDED AND ITS ANSWER DID NOT — SO A BLIND RETRY RE-APPLIES A WRITE THAT ALREADY SUCCEEDED.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §6.5a above stands BYTE-FOR-BYTE and is read THROUGH this one; no ruling, no measurement and no member moves — what this clause adds is the one consequence of the measured arm that a caller's ERROR HANDLER will otherwise get wrong.** **IT FOLLOWS FROM THE MEASUREMENT ABOVE AND NEEDS NO NEW ONE:** *"the data had already landed (`read(['a'])` answered `1`), because the commit resolved before its delivery ran; what the throw takes away is the ANSWER, not the write"* — **so `try { store.write(...) } catch { retry() }` runs that write a SECOND time, and the store has no way to tell the two apart: there is no commit identity on your side, no idempotency key and no record, because after a throw there is no record** (`§6.5a`'s closing sentence). **AND THE ERROR IS YOURS AND NOT THE PACKAGE'S SHAPE:** it carries **no depth, no handle, no address** (`§6.6` item 5) — a throw at depth two arrives as the same `Error` object a depth-one throw would — **so a retry policy cannot key on where the chain broke, and a listener body's own `catch` is the only containment arm there is.** **WHAT TO WRITE INSTEAD: catch in the body, decide whether to rethrow, and make the write your retry re-issues one whose landing you can recognise** — an `op` you kept from an earlier answer, a value you wrote, or a read before you write. (`D-73`; `D-71`; the `§6.5a` measurement; `§6.6` item 5; `docs/specs/storeroom-js/contract.md §2.7` item 4.)

### §6.6 ★ DELIVERY NESTS — every window is a synchronous call on one thread, and the stack is the only place its order exists

**★ THE SHAPE, IN ONE STACK** (`strata/decisions.md` · `D-72`). **A commit resolves and its delivery begins; a
listener that writes opens a commit of its own (`D-45`), which runs its own pass and then ITS delivery — so
windows are live at once, NESTED, every level a synchronous call on one thread:**

```text
outer write → its commit → its pass → its delivery → listener A → A's write (a NEW commit) → A's pass → A's delivery → listener B → …
```

**SO "INTERLEAVING" IS NOT CONCURRENCY — IT IS NESTED SUSPENSION: `A`'s entire chain runs to completion before the
window that fired it invokes its next listener.** **The outer loop is suspended, not interleaved.**

**FOUR PROPERTIES ARE REAL, AND NOT ONE OF THEM IS DECLARED ANYWHERE UP THE STACK — so each is stated here:**

1. **DEPTH IS UNBOUNDED** — no counter, no cap and no instrument (`D-70`'s absence; `§7.9` item 2). **The stack
   grows until your code stops calling.**
2. **★ THE CROSS-WINDOW ORDER IS REAL AND UNDECLARED.** **Within one window the order is unspecified and the list
   is a set** (`DD-37`; `§6.4`) — **but across windows the nesting imposes one: a nested chain precedes the
   window's next listener.** **The machine provides that guarantee and no clause promises it — so a consumer
   relying on the opposite relies on nothing.** **MEASURED 2026-10-29, on this checkout, through the published
   entry:** listeners `hA` and `hB` at `['a']` and `hC` at `['x']`, where `hA`'s body writes `['x']`, printed
   `["A", "C (nested commit)", "A-end", "B"]` — **the whole nested chain ran inside `A`'s own call, before `B` was
   invoked, and `A`'s code resumed after it.**
3. **★ RE-ENTRANCY IS UNAVOIDABLY OPEN.** **A listener that writes at the address it was delivered for fires
   itself again**, because the store's trigger set is computed per act. **Nothing detects it, and nothing is
   meant to** — that is the loop the missing guard leaves open, and the concrete shape of *"no instrument you can
   read"* (`D-70`).
4. **AND NOTHING ABOVE SEES BELOW** (`D-71`; `§6.5`). **A chain that fails at depth three is indistinguishable, to
   the original caller, from one that never ran:** the original record is its own, and the depth-three refusal is
   that nested commit's.

5. **★ AND A THROW AT DEPTH TWO REACHES THE ORIGINAL CALLER — THE PROPERTY THIS NESTING LEFT UNDECLARED, NOW MEASURED
   AND DECIDED.** **A FIFTH PROPERTY JOINS THE FOUR ABOVE.** (`RCA-8(g)` ANNOTATE-BESIDE: **the four stand
   BYTE-FOR-BYTE as the reading of their own date, and item 4's *"nothing above sees below"* is unmoved for
   OUTCOMES; what this item decides is the THROW's destination, which `D-73` alone rules.**) **THE REASON IS THE
   STACK'S: a throw is not a commit outcome, so no nested commit contains it, and every level of this chain is a
   synchronous call with nothing catching in between** (`§6.5a`). **MEASURED 2026-10-29 ON THIS CHECKOUT, THROUGH
   THE PUBLISHED ENTRY:** `hA` at `['a']` whose body writes `['x']`, and `hN` at `['x']` throwing
   `new Error('boom-in-nested-listener')`. **THE TRACE WAS `["A enters", "N throws", "A: its own write THREW
   Error{name:'Error',message:'boom-in-nested-listener'} (=== nested error: true)", "A leaves"]`, AND THE ORIGINAL
   `store.write(['a'], 'mem', 1)` THREW THE SAME `Error` — identity `===` true — AND ANSWERED NOTHING.** **SO WHERE
   IT SURFACES IS: FIRST AT `A`'s OWN `write(['x'], …)` INSIDE THE LISTENER, THEN — `A` NOT HAVING CAUGHT IT — OUT
   THROUGH THE OUTER DELIVERY INTO THE ORIGINAL CALLER.** **YES: A DEPTH-TWO THROW REACHES THE ORIGINAL CALLER, AS
   THE SAME ERROR OBJECT AT EVERY HOP, AND LEAVES THE ORIGINAL WRITE UNANSWERED.** **AND THE STOP IS YOURS TO PLACE:
   with `A`'s body catching instead, the measured trace was `["A enters", "N throws", "A caught Error{…} (===
   nested error: true)", "A leaves"]` and the original write ANSWERED ITS OWN RECORD with `threw: false`** — **so
   the DEPTH is invisible in the error unless the listener adds it, and a caller that must know where a chain failed
   annotates the throw itself.** (`D-73`; `D-72`; `§6.5a`; `docs/specs/storeroom-js/contract.md §2.7`'s clause of
   the same date.)

**WHAT THAT MEANS FOR YOU, IN ONE SENTENCE: if you write a listener that writes, you have moved the order of your
own effects out of the record and into the call stack, and the only thing you can still hold is the depth you
yourself refuse to exceed.** (`D-72`; `D-71`; `D-70`; `D-45`; `DD-37`; `§7.9`.)

---

## §7 · Constraining: the pair, the handle, and the two routes

### §7.1 A pair is `{address, id}`, and the `id` IS its handle

**A constraint is addressed by a PAIR — `{ address, id }` — where `address` is an address in §4's domain and `id`
is a NON-EMPTY `string`** (`bindings/js/index.d.ts`, `ConstraintPair`; `PAR-JS-24`).

**★ AND THE PAIR'S `id` IS ITS HANDLE, INSTANCE-SCOPED AND UNIQUE. YOU NAME IT.** `D-23`: *"Setting a constraint
should expect a handle name to be used for handle and process/error logging purposes"*; `D-24`: *"The handle
becomes the id — the handle needs to be unique regardless, and setting a duplicate handle is an overwrite"*;
`D-29`: *"Handle becomes the internal ID"*. **One `id` names one pair, one identity and one handle** — the older
`(id, address-set)` keying is superseded, and **there is only ever one pair per `id`.**

**AND THE `address` MEMBER'S TYPE MOVES BY ACT, which is a fact worth knowing before you write a helper:** at the
REGISTRATION act the pair names a single address; on the `constraints()` read and at `removeConstraint` it is the
pair's own SET of addresses (`index.d.ts`, `ConstraintPair`; `held-listener/contract.md §2.6` items 4–5). **Measured 2026-10-26:
after `store.addConstraint({address: ['a'], id: 'c1'}, () => true)`, `store.constraints()` answered
`[{address: [['a']], id: 'c1'}]` — the element's `address` is a one-member set, and the element carries exactly
`address` and `id`.**

### §7.2 The two population routes, and the function

**There are exactly TWO ways to populate constraints, and neither substitutes for the other**
(`surface.md §2.12` item 1; `index.d.ts`).

**ROUTE ONE — the batch at construction, `cfg.constraints`.** **The element is THREE members —
`{ address, id, constraint }` — AND THE FUNCTION IS REQUIRED** (`D-26`, verbatim: *"The batch in cfg.constraints
must supply functions"*). **The pair is the element's addressing and the function is its substance**, and **the
batch ARMS the function at construction** — not merely validates it and defers (`D-27`, verbatim: *"Functions are
armed"*) — through the same act the add route performs. **The store never sees the function**: a JavaScript
function cannot cross into Rust, so the crossing carries the pair and **the package arms the substance**.

**A batch element that carries no function — absent, `undefined` or a non-function — is REFUSED at construction,
under the store's existing `ConstraintListInvalid`, in the one thrown form, BEFORE ANY FILESYSTEM ACT**
(`D-26` item 5; `D-27`'s closing clause; `bindings/js/src/entry/frame.mjs`, whose `constraintEntry` validates the
member and whose construction walk refuses the element — read 2026-10-26). **So the state the older prose called
*"a pair with no function"* HAS NO PRODUCER ON THIS ROUTE:** a batch element is always carried.

**ROUTE TWO — the add route after creation, `addConstraint(pair, constraint)`.** **It CARRIES the function as its
own argument, and at a pair already held the supplied constraint OVERWRITES the held one under the SAME identity
the pair was already added under — the call throws nothing for the mere fact that the pair was held** (`D-24`;
`index.d.ts`, `addConstraint`).

**★ AND THE LIST IS NEVER PERSISTED — not in the file, not as a register key and not in any journal entry.**
**The importing application supplies it at EVERY startup from its own information, and the store holds the pair's
`address` and `id` for the instance's life only** (`A118`; `native/contract.md §7.2` item 6; `index.d.ts`,
`StoreConfig.constraints`). **It is validated at TWO instants, both answering `ConstraintListInvalid` with no
instance: at CONSTRUCTION, and at a boot over an existing `filePath`, where the LOADED state is validated against
the list you supplied** (`native/contract.md §8.1` #16's amended trigger clause). **So a constraint list is code
your application carries, not state your store stores.**

**★ AND A REPEATED HANDLE ANSWERS DIFFERENTLY AT THE TWO ROUTES, WHICH IS A DIFFERENCE OF ACT AND NOT AN
INCONSISTENCY** (`D-27`'s own table):

| the act | a repeated handle |
|---|---|
| **`cfg.constraints`, the batch** | **REJECTED** — the list is ONE supplied act, so an internal ambiguity is malformed input and not a second write |
| **`addConstraint(pair, constraint)`** | **OVERWRITE** — acts are separate in time, so a later one replaces the earlier |

**At construction that means TWO refusals the store cannot take and the package owns:** no two elements of one
`cfg.constraints` may name one `id`, **and no element's `id` may equal a `handle` this construction's `listeners`
adopts — a cross-KIND collision, rejected regardless of kind** (`D-27`, verbatim: *"Reject duplicate handles in
batch - regardless of listener/constraint type"*; `index.d.ts`, `StoreConfig.constraints`). **Both are refused
before any filesystem act, under `ConstraintListInvalid`; the package mints no code.**

### §7.3 A cross-kind duplicate is REJECTED, in both directions

**A duplicate handle of the SAME kind is an overwrite. A duplicate handle ACROSS KINDS — a listener where a
constraint stands, or a constraint where a listener stands — is REJECTED** (`D-25`, verbatim: *"Attempting to
overwrite a listener with a constraint or vice versa is rejected"*; `D-29`: *"Listen cannot overwrite constraint,
only other listeners"*).

**Measured 2026-10-26, from the constraint-then-listener direction:** with `c1` armed at `['a']`,
`store.listen('h1', [['a']])` threw the **one plain form** — `Object.keys` `["status","message","log"]`, `status`
`'AddressMalformed'`, `log` `[]` — whose message names BOTH sides and carries the shared rule sentence **"a
listener and a constraint do not share one"**. **The form is the surface's one thrown form and NOT a `TypeError`**
(`index.d.ts`, `addConstraint`'s and `register`'s cross-kind clauses). **No state moves: the rejection is taken
after the positions' class tests and before any store call.**

### §7.4 The toggles, and the read

**`constraintOn(pair, constraint)` ENABLES and `constraintOff(pair, constraint)` DISABLES. Both are IDEMPOTENT,
both take the `constraint` position REQUIRED (it is a no-op on every success — the caller supplies as a function
the identity it holds at that pair, and the entry never substitutes one), and both THROW at a pair the entry does
not carry** (`index.d.ts`, the two toggle members; `surface.md §2.12` items 2–3).

**A toggle is NOT a removal.** A disabled pair is still registered and still carried; a write the disabled
constraint would have refused is ACCEPTED. **`removeConstraint(pair)` is the ONE act that deletes an identity:
the pair, its N address rows, the kernel's registration and the store's home entry all go, and a fresh
`addConstraint` at that pair afterwards answers a NEW identity** (`held-listener/contract.md §2.6` item 3; `§2.7` item 3;
`index.d.ts`).

**`constraints()` is the registered-pair read, and it reports PAIRS with four declared exclusions**
(`index.d.ts`, the `constraints` member, items 1–4; `surface.md §2.4` item 9 (f)'s `constraints` clause):

1. **NO constraint function is returned** — a disabled pair makes the hazard sharp, since the caller's function is
   kept in the entry while the kernel holds a stub.
2. **NO opaque identity is exposed** — the pair is your own datum; `ConstraintIdentity` is the package's opaque
   handle for it, and the two are not the same datum. **Compare identities, never contents.**
3. **NO ORDER is promised** — compare the returned pairs **as a SET and never as a sequence.**
4. **A DISABLED PAIR DOES APPEAR, and there is therefore NO `enabled` member on an element and NO way to read a
   pair's state off this return.** `constraintOff` is a toggle and not a removal; **an absence here means nothing
   was ever registered.**

**The read takes no argument, makes no store call, appends no journal entry and changes no node**
(`index.d.ts`).

**⟶ AND EXCLUSION 3 ABOVE IS RETIRED, 2026-10-26, ON `D-39`'S `DEF-R` RULING — VERBATIM *"add deterministic
ordering"* — WHICH RULES THAT *"that exclusion is superseded and the order becomes part of what the method
promises"*** (`strata/decisions.md`; `RCA-8(g)` ANNOTATE-BESIDE — the four exclusions above stand BYTE-FOR-BYTE and
are read THROUGH this clause). **`constraints()` EMITS IN REGISTRATION SEQUENCE — THE ORDER THE PAIRS WERE
REGISTERED — DETERMINISTICALLY AND STABLY ACROSS EVERY CALL AND EVERY INTERVENING ACT; THE ORDER IS PART OF WHAT
THE METHOD PROMISES.** **So you MAY now compare the returned array element by element, and the sequence you read
is the sequence your own calls stood in: a pair from `cfg.constraints` in its list position, then each
`addConstraint` in the order you made it; a pass, a refusal, a toggle and a `rollback` move none of it.** **THE
OTHER THREE EXCLUSIONS STAND UNCHANGED: no function, no opaque identity, and a disabled pair still appears with no
`enabled` member beside it.**

### §7.5 ★ Reads check NO constraint

**The constraint mechanism is unconditional on the WRITE/COMMIT path, over the triggered handle set — and
`read`, `readLiteral` and a branch's assembly CONSULT NO CONSTRAINT, refuse nothing on a constraint's verdict, and
filter nothing on one.** **There is no read-side enforcement arm, none is declared, and none is owed**
(`strata/decisions.md` `D-1-bis`, where the architect refused the read-side reading by name, reading (a)):
*"a is correct"*.

**So a constraint cannot be used as a read filter, a field-level permission, or a projection. It is a gate on
writes and on nothing else** — and **reads consult no constraint's verdict, filter nothing on one, and refuse
nothing because of one.**

### §7.6 ★ `context.value` is what the write verb returned — read anything else yourself

**★ THE ONE SENTENCE TO CARRY AWAY: `context.value` is the value the write verb returned; a constraint that
cares about another location reads it.** (`D-50`, the architect, verbatim: *"If a constraint needs to look for
the data at a given location, it can read()"*.)

**AND THE CASE THAT MAKES IT MATTER IS A REPAIR THAT LANDS SOMEWHERE ELSE.** A constraint that refuses `2` at
its own address `['a']` returns a repair that writes `11` at a *different* address `['b']`. **The repair's op is
the attempt's last op, so the re-run hands your body the value that op landed — `11` — while the address your
pair judges still stands at `2`.** **That is not a machinery defect: it is the value the write verb returned, and
the package cannot be wrong about a value it was told to hand over — it can only be wrong about what it stored.**
**If your constraint cares about the state at any other location — the address it judges, the address its repair
landed at, or anywhere else — IT READS THAT LOCATION.** The body is your code, it closes over the store handle
you already hold, and `store.read(address)` is a published verb. **Measured 2026-10-28**
(`tests/e2e/discard-witness.mjs`, the `W8` cell): the re-run handed the pair `11` while its own address read
`2`; **the same body with `store.read(['b'])` refused on what it read** — the write failed and the store was
restored — **and the same body without the read passed, answering its record with its own value still standing at
its address.** **The read is the whole difference.**

**★ AND THE CONSEQUENCE A READER GETS WRONG, IN `D-50`'S OWN WORDS: *"a constraint that reads inside its body is
caller code entering the surface, so by `D-45` that read opens its own commit"* — **⟶ MEASURED 2026-10-28, AND THAT CLAUSE IS WRONG: A READ BRACKETS NO COMMIT AT ALL.** `read`, `readLiteral` and `constraints` are the surface's **NON-BRACKETING** calls — the count during a constraint body's read is the attempt's own and is left undisturbed, `attempt-opened` does not fire for it, and the same `attempt` is in force. **So the accurate consequence is the shorter one: a read inside a body runs INSIDE the attempt's window, opens nothing, and disturbs nothing.** (The `D-45` quote above is kept as the reading of its own date; this sentence governs.) — AND A READ RUNS NO CHECK, SO
NOTHING IS JUDGED BY IT.** **No constraint is asked on the value it returns, no pass runs, and the value you
read back is never a verdict.** **AND THE COUNT'S OWN RULE IS WHERE THE ACT'S SHAPE IS VISIBLE — MEASURED
2026-10-28 AT THE `W8` CELL, ON BOTH SIDES OF THE READ: `read`, `readLiteral` and `constraints` are the surface's
NON-BRACKETING calls — no commit is bracketed for them — so the count during your read is the attempt's own
(`open` `1`, `live` `1`) and it is left undisturbed (`open` `1`, the same attempt).** **THE DECLARED SENTENCE IS
THE AUTHORSHIP — the read is not the write's act — and the count shows what that authorship costs: nothing is
opened and nothing is judged for it.** **So the load-bearing half for you is the authorship and the absence of a
check: your read is your own act at the surface, it carries no judgement, and it neither re-asks a constraint nor
re-runs the pass. A read is data, never a verdict — if you want a state judged, read it and judge it in your
body.**

**⟶ AND THE PASS ASKS EXACTLY THE PAIRS STANDING AT THE ADDRESS IT WRITES, 2026-10-28 — `D-50`'S CONSEQUENCE, WHICH NO CLAUSE ABOVE SPELLS OUT.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §7.6 above stands BYTE-FOR-BYTE and is read THROUGH this one; this clause adds one declaration and moves nothing it prints.** **THE RULE: A WRITE'S CONSTRAINT PASS JUDGES THE PAIRS STANDING AT THE ADDRESS IT WRITES — the kernel's own `pairsAtAddress` reads the pair record at that one address — SO A PAIR AT A DIFFERENT ADDRESS IS NOT ASKED.** **If a constraint cares about another location it READS it** (`D-50`, the architect, verbatim: *"If a constraint needs to look for the data at a given location, it can read()"*). **MEASURED 2026-10-28, on this checkout, through the published entry, in a two-address drive:** a pair `b1` registered at `['b']`; **a write at `['a']` asked `b1` `0` times**; **the same write at `['b']` asked it once**, and the value the body was handed was the one that write returned. **So an action one address away is INVISIBLE to your pair** — it was never asked at the address the action moved — **and the body's own `store.read` is the only thing that makes it visible.** **That is the whole reason this section tells you to read what you care about: the pass will not ask a pair that does not stand where you wrote.** (`held-listener/contract.md §2.8` item `1`, `HL-8`: *"the pass selects the rows whose address IS the triggering address"*, preserving the EXACT-ADDRESS rule rather than widening it; `D-50`; §7.1–§7.5's declarations; the pass's own scan at `bindings/js/src/entry/kernel-foundations.mjs:782`.)

**⟶ AND THE PASS'S SET IS NOW A PREFIX SET, 2026-10-29 — `D-56`, WHICH SUPERSEDES THE CLAUSE ABOVE.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the rule of the build that printed it, and it is READ THROUGH this one.** **THE ARCHITECT, VERBATIM** (`strata/decisions.md` · `D-56`): *"A listener/constraint should fire when the descendants of its targeted address node change, because the descendants become part of the object that is read from that address"*. **SO A PAIR AT `['tabs']` IS ASKED FOR A DELETE AT `['tabs','landingPage']`** — the value read at `['tabs']` CONTAINS the subtree the delete moved, so your pair judges an object that moved — **and a pair at `['tabs','landingPage']` is still asked for that same delete.** **WHAT IS STILL NOT ASKED IS THE OTHER DIRECTION**, which the ruling does not cover: a delete at `['tabs']` does not ask the pair at `['tabs','landingPage']`, and the object that pair judges then reads as ABSENT. **THE MEMBERSHIP RULE, STATED ONCE: your pair is asked when THE ACT'S ADDRESS IS AT OR BELOW YOUR PAIR'S ADDRESS.** **AND WHAT YOUR PAIR IS HANDED DID NOT MOVE**: the context carries THE ACT'S `address`, `tier` and `value` — so a pair standing at an ancestor is handed the value that landed AT THE ACT'S ADDRESS (absence, for a delete), **not** the object at its own. **A PAIR THAT JUDGES ITS OWN ADDRESS READS IT** (`§7.6`'s `read()` rule, which `D-56` leaves standing — it is no longer NECESSARY for an ancestor's interest in a descendant, and it is still correct for the pair's own object). **MEASURED 2026-10-29, on this checkout, through the published entry** (`tests/e2e/discard-witness.mjs`'s `DW-10.13`/`DW-10.15`/`DW-10.16`): a pair at `['window','tabs']` and a delete at `['window','tabs','landingPage']` — **the pair IS asked (2 asks: its registration's and the pass's), its refusal crosses, and the delete rolls back** (`window.tabs` reads `{"landingPage":{"active":true},"settings":{"active":false}}` again); a pair AT the act's own address is asked once by the pass, unchanged; a pair at the act's DESCENDANT is asked `0` times and its address reads ABSENT afterwards.

**⟶ AND THE DESCENDANT DIRECTION IS RULED TOO, 2026-10-29 — `D-66`, AND THE TWO CLAUSES ABOVE STAND BYTE-FOR-BYTE AND ARE READ THROUGH THIS ONE.** `RCA-8(g)` ANNOTATE-BESIDE: **this clause completes the membership rule; it moves no clause above it and no figure of this section.** **THE ARCHITECT, VERBATIM** (`strata/decisions.md` · `D-66`): *"A pair at a descendant should only be asked if the change also affects that descendant, ex. write(['a', 'b'], {'c': "foo", 'd': "bar"} should trigger at ['a'], ['a', 'b'], ['a', 'b', 'c'], and ['a', 'b', 'd'], but not ['a', 'b', 'e']"*. **SO THE MEMBERSHIP RULE IS NOW: your pair is asked when THE ACT CHANGES THE VALUE AT YOUR PAIR'S ADDRESS — which means the act's address is at or below yours (`D-56`, unmoved), OR your pair's address is one the act TOUCHED.** **WHAT "TOUCHED" MEANS, IN THE TWO VERBS YOU DRIVE:** **a `write` touches exactly the paths its value contains** — write `{c:'foo', d:'bar'}` at `['a','b']` and the pairs at `['a','b','c']` and `['a','b','d']` ARE asked, while the pair at `['a','b','e']` is NOT, **because the write did not touch `e`** (it stands neither before nor after the act) — and a value with a nested object touches its own sub-paths by the same rule one level down, an array its own indices, a scalar nothing below itself; **a `delete` touches the WHOLE SUBTREE at its address**, because a descendant of a deleted node is ABSENT after the act and was not before, **which is a change to what a read there returns** — so a delete at `['window','tabs']` DOES ask a pair standing at `['window','tabs','settings']`. **AND WHAT YOUR PAIR IS STILL NOT ASKED FOR IS A DESCENDANT THE ACT DID NOT TOUCH**, which is the whole of the distinction: it is not "descendant", it is "touched". **ONE THING YOUR PAIR IS HANDED, ON EVERY ARM**: the context carries THE ACT'S `address`, `tier` and `value` — so a pair standing at a touched descendant is handed the value the act landed AT THE ACT'S ADDRESS (absence, for a delete), **not** the object at its own; **a pair that judges its own address READS it** (`§7.6`'s own rule, which stands). **MEASURED 2026-10-29, on this checkout, through the published entry** (`tests/e2e/discard-witness.mjs`'s `DW-13.1`/`DW-13.2`/`DW-13.3` and `DW-10.16`): the ruling's own drive asks `['a']`, `['a','b']`, `['a','b','c']` and `['a','b','d']` and NOT `['a','b','e']`; a nested value asks its own sub-paths and not a sibling it did not write; a delete at `['window','tabs']` asks the pair at `['window','tabs','settings']`; **and the pass's set is still ONE snapshot, FIXED WHEN THE PASS BEGINS and in ONE registration order across the ancestors, the act's own address and the touched descendants** (a pair registered during a pass enters the next one and no earlier one).

**⟶ AND A WRITE'S TOUCHED SET IS NOW BOTH VALUES', 2026-10-29 — `D-66` READ SYMMETRICALLY, AND THE CLAUSE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS ONE.** `RCA-8(g)` ANNOTATE-BESIDE: **the one sentence this clause supersedes is that clause's bullet *"a `write` touches exactly the paths its value contains"*, named here rather than overwritten; the `delete` bullet and every other figure of this section are unmoved.** **THE GAP, MEASURED BEFORE IT WAS CLOSED: A WRITE THAT REPLACES A NODE DROPS THE SUB-PATHS THE OLD VALUE CARRIED.** Write `{c: 1}` over `{c:{x:1}}` and the path `['a','b','c','x']` stands PRESENT before the act and ABSENT after it — **a change to what a read there returns** — **and `x` is in neither the written value's path set nor the word "descendant", so the pair standing there went unasked.** **THE CRITERION THAT CLAUSE ALREADY NAMES DECIDES IT WITHOUT A NEW RULE** — *"your pair is asked when the act changes the value at your pair's address"* — **and a path that DISAPPEARS changed as surely as a path that APPEARS.** **SO THE WRITE ARM IS SYMMETRIC: your pair is asked when the act touched the value it WROTE *or* the value it REPLACED** (`op.before.value`, the state the store's own journal carries), **and the touched set is the union of the two path sets** — a path in both being yours once, not twice. **THE `delete` ARM DOES NOT MOVE**: the whole subtree it removed, exactly as the clause above states it. **AND A FIRST WRITE AT AN ADDRESS HAS NO BEFORE VALUE AND NEEDS NONE**: `op.before` is present on every op and answers `present: false` where nothing stood, so that write's union is the written value's path set exactly and nothing throws. **`['a','b','e']` IS STILL NOT ASKED**, for the reason the clause above gives: `e` stands in neither value, so neither half of the union touches it. **MEASURED 2026-10-29, ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY** (`tests/e2e/discard-witness.mjs`'s `DW-13.5` and `DW-13.6`, with `DW-13.1`–`DW-13.4` still green): a write of `{c:1}` over `{c:{x:1}}` at `['a','b']` now ASKS the pair at `['a','b','c','x']` and does NOT ask `['a','b','c','z']` or `['a','b','y']`, which stand in neither value; the first write at an empty `['f']` asks `['f','g']` and `['f','g','q']` and not `['f','h']`; **and the pass's set is still ONE snapshot, FIXED WHEN THE PASS BEGINS, in ONE registration order.** (`D-66`; `D-56`; §7.6's touched-set clause of the same date; `bindings/js/src/entry/kernel-foundations.mjs`'s `touchedAddresses`.)

### §7.7 ★ The check is BOUNDED — THREE restarts per terminal act, and past the budget it fails closed

**★ THE LIMIT, DECLARED HERE BECAUSE NO CLAUSE OF THIS GUIDE SAID IT: A CONSTRAINT CHECK RESTARTS AT MOST THREE TIMES PER TERMINAL ACT.** The bound is **`RESTART_LIMIT` = `3`**, one exported constant at **`bindings/js/src/entry/constraints.mjs:1366`**. **THE BUDGET IS SPENT AND NOT RESET by an action raised inside a restart** — a body that reverses again inside a restart's own ask spends the SAME budget and not a fresh one — **AND PAST IT THE CHECK FAILS CLOSED IN THE ONE FORM:** the write throws the same plain `{status, message, log}` it throws for a refused pass (§8), with `status` **`'ConstraintPassRefused'`** and **ONE log entry** whose message says the budget was spent rather than that a pair refused a state it never judged. **The store is restored** — the request's own watch records what is owed — so the terminal act leaves no unjudged effect standing (`D-42` item `3`; `D-41` item `4`).

**⟶ AND THE ARM PAST THE BUDGET NAMES THE PAIR THAT WAS BEING ASKED, AND SAYS WHAT IT IS, 2026-10-28 — `DEF-AL`, MEASURED AND CLOSED HERE.** `RCA-8(g)` ANNOTATE-BESIDE: **the two clauses above stand BYTE-FOR-BYTE and are read THROUGH this one; this clause re-reads what the refusal NAMES and what its `message` SAYS, and moves no status, no form and no bound.** **WHAT WAS MEASURED:** the arm named the FIRST WATCHED ADDRESS rather than the one the budget was spent at, **so registration order decided the accusation — the pair it named had answered `true` on every ask it received**, and the crossed `message` was **byte-identical to a genuine refusal's**, so a consumer reading only the message could not tell a pair refusing from a budget running out. **WHAT IT DOES NOW:**
- **the one `log` entry names the pair that was BEING ASKED when the budget ran out, and the address it was being asked at** — not the first watched address — **and its sentence says that pair refused nothing and that the check could not settle**;
- **the crossed `message` keeps the store's generated sentence for `ConstraintPassRefused` and then says, in its own words, that this is a RESTART BUDGET EXHAUSTION and NOT a constraint pair refusing a state** — no pair refused the state the check was asking it for, a pair body acted inside the check at every restart, and the budget is spent. **A GENUINE refusal never carries that clause**, so the two are distinguishable by the message alone.
**`status` stays `ConstraintPassRefused`, the form stays `{status, message, log}`, ONE log entry stands, and the store is still restored by the refusal's own compensating act.** (`D-42`; `D-41` item `4`; §7.7's bound above.) **MEASURED 2026-10-28, on this checkout, with a passing pair registered FIRST: the entry named the passing pair and the passing pair's address before this clause, and names the pair the check was asking and its own address after it; the crossed message said `'t5' was refused by a constraint pass, the state this act would leave is not one the registered constraints admit` before and carries the budget's own clause after — beside a control in which a genuine refusal still reads as its refusing pair's own sentence.**

**MEASURED 2026-10-28, ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY — AND THE MEASUREMENT IS THE POINT: THE RESIDUAL IS THE BUDGET, NOT THE STATE AND NOT THE JOURNAL.** A pair whose body raises ONE FRESH REVERSAL on every ask the restart makes, **with every ask passing**, was driven twice: **with `60` fresh reversals available it rests at exactly `3` restart asks** (the listener's own action plus one per ask — `4` actions in all), **and with `40` available it answers identically, `3`.** **The body had `57` and `37` reversals it never got to spend, and nothing structural stopped it: every ask it made passed.** The terminal write then refused `ConstraintPassRefused` with its log entry saying the budget was spent.

**AND WHY THE BOUND EXISTS, SAID PLAINLY: NO STRUCTURAL STATE DISTINGUISHES A BODY THAT KEEPS REVERSING FROM ONE THAT MEANS TO.** The machinery cannot tell a loop from a caller with more work to do, so the restarts are COUNTED and the check fails closed instead of spinning.

**WHAT DOES NOT SPEND THE BUDGET**, so a lawful in-commit action costs at most one round and no more: **a request whose watch shows no moved address is consumed and asks nothing** — it can neither loop nor exhaust the budget — and **the count belongs to the PASS's own scope**, so a nested pass (a listener body's own write) has a scope and a budget of its own, exactly as it has its own commit (`js/contract.md §2.6`'s clause of 2026-10-27, item `4`).

**⟶ AND WHEN TWO OF YOUR LISTENERS EACH REVERSE IN ONE COMMIT, THE CHECK JUDGES THE STATE THE COMMIT STANDS AT — BOTH RAISES, NOT THE LAST ONE, 2026-10-28 — `D-55` ITEM 6 · `DEF-AP`, MEASURED.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §7.7 above stands BYTE-FOR-BYTE and is read THROUGH this one; the bound, the budget's own arm and `D-42`'s window rule do not move.** **WHAT WAS MEASURED ON `1.3.0`:** two listeners each reversing inside ONE commit left **only the LAST raise judged** — the earlier listener's violation was asked **zero** times, **registration order decided which raise was lost**, and when the survivor's judgement passed **the write returned normally with the violation standing**. **THE ROW'S OWN ESCAPE — declare that an overwritten raise may leave a violation unjudged — IS UNAVAILABLE**, because §5.4's safe-state rule is the promise. **WHAT THE PACKAGE DOES: the request's watch is MERGED to the EARLIEST reading of each address** — the state the commit opened at — **so the restarted check sees every address the WHOLE commit moved, whichever raise named it, and asks the pairs at the state the commit STANDS at.** **A raise is therefore never lost to a later one in the same commit**, and the write that used to answer normally now refuses. (`tests/e2e/discard-witness.mjs`'s `DW-10.7`: both pairs are asked at the drain, the write refuses `ConstraintPassRefused`, the whole commit is undone; under a revert of the merge the earlier pair is asked ZERO times and the write ANSWERS.)

### §7.8 ★ A `delete` IS AN EDITING VERB — it passes constraints, and its listeners run AFTER them

**★ FROM 2026-10-29 A `delete` RUNS A CONSTRAINT PASS OF ITS OWN** (`D-55` item `3`, verbatim: *"A delete is an
editing verb and must pass constraints. This includes all of the relevant commit and message logic."*). **`D-38`
said the same for `rollback`** (item `4`: *"A reverse is an editing verb and must be treated as above"*). **So the
three editing verbs — `write`, `delete`, `rollback` — all ask the pairs, and only a `read` does not (§7.5).**

**What you see, in order, when you call `store.delete(addr, tier?)`:**

1. **the delete lands** — the versions are removed exactly as they always were (`§5.3`);
2. **the pairs standing AT THE DELETED ADDRESS are asked against THE STATE THE DELETE LEFT** — the address's
   absence, with the delete's own journal op handed to the pair as `context.op`, so a constraint can tell a
   delete from a write and refuse one;
3. **every one of them passes ⇒ you get the record** — `{ address, tiers, triggered, op }` (`§3.3`), unchanged;
   **one refuses ⇒ you get the ordinary refusal**: the same `{status, message, log}` every constraint refusal
   throws (§8), `status: 'ConstraintPassRefused'`, its `log` naming the pair and carrying the kernel's token in
   the terminal entry's `state`, **and the delete is UNDONE together with every edit the delete's own attempt made** (a repair's write included)
   — the store stands at the state the commit opened at;
4. **and the listeners fire AFTER step 2** — so a listener fired by a delete observes a JUDGED state, never one a
   constraint is about to refuse. **A refused delete fires no listener at all.**

```js
store.write(['window','tabs'], 'mem', { landingPage: { active: true } });
store.addConstraint({ address: ['window','tabs','landingPage'], id: 'landing-page-must-stand' },
  (ctx) => (ctx.op !== null && ctx.op.kind === 'delete'
    ? { message: 'the landing page is not removable' }
    : true));

store.delete(['window','tabs','landingPage']);
// throws { status: 'ConstraintPassRefused', message: 'the landing page is not removable', log: [ … ] }
// log[0] = { kind: 'constraint-check', id: 'landing-page-must-stand', opId: 'op-3', state: null, … }
// log[1] = { kind: 'outcome',         id: null,                 opId: 'op-3', state: 'KC-3', … }
store.read(['window','tabs','landingPage']);   // { active: true } — the delete was undone
```

**The pair is asked with `context.value` = the AFTER-state (absence), `context.tier` = the delete's tier or `null`,
and `context.attempt` = the attempt's own identity.** **A pair at an ANCESTOR address is not asked by the delete's
pass** — the pass keeps the write's exact-address rule and not the trigger set's prefix widening — even though
such a listener DOES fire for the delete (`§6.4`). **And a delete that removes nothing is not an edit**: `tiers: []`,
no pass, no refusal, no delivery (`§5.3`).

**⟶ AND THE SECOND OF THOSE THREE SENTENCES IS CORRECTED, 2026-10-29 — `D-56`: THE PAIR AT AN ANCESTOR IS ASKED, AND
THE DELETE AT `['window','tabs','landingPage']` IS ASKED OF THE PAIR AT `['window','tabs']`.** `RCA-8(g)`
ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE as the rule of the build that printed it and is read
THROUGH this clause; the AFTER-state, the `tier`, the attempt identity, the `discarded` witness, the "removes nothing
mints nothing" rule and the four steps above are all unmoved.** **THE ARCHITECT, VERBATIM: *"A listener/constraint
should fire when the descendants of their targeted address node change, because the descendants become part of the
object that is read from that address"*** (`D-56`) — **so the delete's pass asks the pairs standing at the deleted
address AND the pairs standing at every ANCESTOR of it, because the value read at an ancestor CONTAINS the subtree the
delete moved.** **WHAT YOU SEE, ON THE EXACT TREE `§6.4` USES:** with a pair registered at `['window','tabs']` and a
**`delete(['window','tabs','landingPage'])`**, **the pair IS asked** — and **its refusal CROSSES and the delete ROLLS
BACK**, so `window.tabs` reads `{"landingPage":{"active":true},"settings":{"active":false}}` again. **MEASURED
2026-10-29 on this checkout through the published entry** (`tests/e2e/discard-witness.mjs`'s
`DW-10.13`/`DW-10.15`/`DW-10.16`): the ancestor pair is asked **2** times (its registration's evaluation and the
pass's), a pair AT the deleted address is asked **once** by the pass and unchanged, **and a pair at a DESCENDANT of
the deleted address is asked `0` times and its address reads ABSENT afterwards** — that last direction is the one
`D-56` does not cover and this guide does not claim. **THE MEMBERSHIP RULE, ONCE: your pair is asked when THE ACT'S
ADDRESS IS AT OR BELOW YOUR PAIR'S ADDRESS.** **AND WHAT YOUR PAIR IS HANDED DID NOT MOVE**: the ACT's `address`, the
ACT's `tier` and the value that landed at the ACT's address (absence, for a delete) — **not** the object standing at
its own address — so **a pair that wants its OWN object reads it** (`§7.6`'s `read()` rule, which `D-56` leaves
standing and which is no longer NECESSARY for an ancestor's interest in a descendant). **So the "exactly one tab is
active" constraint `§6.4` writes now judges the delete as well as the write — and a delete that would leave a state
your pair refuses is refused at the delete.** (`D-56`; §7.6's prefix-set clause of the same date; `HL-8` item 1 and
attempt-lifecycle `§2.4` item 5 (iv), annotated at their own homes and not rewritten.)

**Why you care: a delete cannot be used to slip a state past a constraint you registered, and a listener you write
for the use case in `§6.4` — "exactly one tab is active" — now runs on a state the pass has already approved.**
**WHAT THE WITNESS STILL SPEAKS FOR** (§8's `record.discarded`): a `rollback` your listener raises inside the
DELIVERY is still after every check, so it is reported and its effect stands — but a `rollback` a PAIR BODY raises
inside the delete's own pass is now drained and judged at the state the delete left (`§7.7`).

**MEASURED, ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY:** a pair at the deleted address is asked **twice** —
its registration and the delete's pass — where before this clause it was asked **once**; a listener fired by a
delete reads the pass's ask already taken (`1`, where it read `0`) and the after-state the pass approved; a
refused delete leaves the store at the state it opened at; and the delete's log is the commit's ONE list with
`seq` `1..2` (`tests/e2e/discard-witness.mjs`'s `DW-10.8`–`DW-10.13`).

**⟶ AND TWO READINGS OF THAT MEASUREMENT SENTENCE ARE THE READINGS OF THEIR OWN DATE, 2026-10-29 — THE POSITION IS
THE ARRAY INDEX (`D-65`) AND A REFUSED DELETE RESTS AT THE LAST VALIDATED STATE (`D-63`).** `RCA-8(g)`
ANNOTATE-BESIDE: **every clause of §7.8 above stands BYTE-FOR-BYTE and is read THROUGH this one; the asks, the
after-state, the witness and the four steps are unmoved — two figures and one noun move.** **(i) *"the delete's log is
the commit's ONE list with `seq` `1..2`"* IS READ AS: the commit's ONE list, TWO entries, standing at INDEX `0` and
`1`** — the `seq` member is gone from `LogEntry` (`D-65`; §8.0a's retirement clause below), so `log[0]` is the
`constraint-check` entry and `log[1]` the `outcome` entry, and the position is where an entry stands in the array.
**(ii) *"a refused delete leaves the store at the state it opened at"* IS READ AS: at THE LAST VALIDATED STATE** —
which is the state it opened at whenever the delete's sweep never passed, and the state a passing sweep approved
otherwise (`D-63`; §5.4's `D-63` clause). **AND THE THIRD THING THIS CLAUSE OWES, WHICH NO EARLIER CLAUSE OF §7.8
NAMES: WHAT THE DELETE'S RECEIPT CARRIES AND WHAT FOLLOWS FROM IT.**
- **THE RECEIPT.** `delete` still ANSWERS `{address, op, tiers, triggered}` (`index.d.ts`, `DeleteRecord`), and the
  **non-enumerable `discarded` witness** still rides it unlisted (`§8`). **⟶ AND BESIDE BOTH, FROM THIS DATE, A
  NON-ENUMERABLE `commit` MEMBER** — **the same four-member `CommitRecord` a write's `K-2` mints** (`attempt`, `op`,
  `triggered`, `pending`). **`Object.keys(receipt)` still shows the record's own members and not this one**, so a
  consumer that copies a receipt loses the commit as it loses the witness — **read it off the receipt itself.**
- **ADOPTION.** The entry **ADOPTS** that record: it stands the delete's own receipt in the leg slot for the pass and
  **restores the enclosing leg in a `finally`**, so a refusal raised inside the delete's pass reports the DELETE's
  record and not an enclosing write's.
- **THE `pending` RESIDUE.** The delete's `pending` is **the returned set MINUS the handles the delete's own pass
  checked off** — on a passing delete, empty (`D-56`; §6.2's clause) — **and the delivery fires THE RESIDUE**, not the
  whole returned set.
- **`K-4` AND `K-5` BY REFERENCE.** Both readers now answer a delete's attempt **BY REFERENCE** where they refused
  `NO-REF` before — so `K.log(store, receipt.commit.attempt)` and `K.report(store, receipt.commit.attempt)`
  reach the delete's own attempt once it has passed, and not only through a refusal's `log` — and **both still
  refuse a LIVE attempt with `KC-7`** (`D-58`; §8.6's clause). **`receipt.commit` is `null` on the arm that removed
  nothing** (`D-3`), so guard it before you reach through it.
- **THE SAVE.** The `file`-tier save is the delete's own op, on the passing arm — **§9.3's clause below is its home
  and this bullet does not restate its scope.**
**AND NO KERNEL ITEM IS OWED FOR ANY OF IT: the verb is the surface, the kernel's set stays `K-1`…`K-6`, and a `K-7`
`commitRemoval` would be owed only if you could drive a delete's attempt directly — you cannot** (`D-57`'s second
half; `D-3`; `D-44`; `D-53`).

### §7.9 ★ WHICH KIND — two different jobs, and why a derived value is not an address

**★ THIS IS WHERE THE TWO SURFACES MEET, AND IT IS THE SECTION TO READ BEFORE YOU REGISTER ANYTHING.** `§6`'s
listener and this section's constraint stand over the SAME address domain and are named in the SAME `triggered`
list (`§6.2`'s `D-69` clause: *an element that is a constraint's `id` is ASKED, a listener's is DELIVERED*), and
**they are not interchangeable.** **Three rules, each with its reason.**

1. **★ WHICH KIND. IF YOUR CALLBACK CHANGES THE STORE, IT IS A CONSTRAINT OR A REPAIR; IF IT TELLS THE WORLD, IT IS
   A LISTENER** — **updating external code with new data, changing the rendered information on screen.**
   **THE REASON, STATED: a constraint runs INSIDE the pass, its answer is JUDGED — a `{message}` is a refusal that
   rolls the commit back (`§5.4`) — and it HAS LOOP GUARDS**: the restart budget (`RESTART_LIMIT` `3`, `§7.7`), the
   applied-repair marker (an applied repair never runs twice, `P-SM-6`), and the per-op floor. **A listener runs
   AFTER every constraint, opens its OWN commit when it writes, and HAS NO LOOP GUARD** — nothing counts its
   writes, nothing marks its repair, and its write is a unit of its own (`D-53`) — **so a listener that writes as a
   matter of course drives a chain the machinery does not bound.** **The loop guard exists only inside the pass;
   that is the whole reason a data-changing callback belongs there.** (`D-70`, the architect, verbatim: *"Functions
   that automatically produce changes in the stored data should be written as constraint/repair, not as listeners,
   because constraint/repair has loop guards while listeners don't"* — and *"The use case for listeners is for
   updating external code with new data, ex. changing the rendered information on screen"*.)
2. **★ A DERIVED VALUE IS NOT AN ADDRESS. AN INDEX INSIDE A COLLECTION IS DERIVED.** **`delete(['v',0])` RENUMBERS
   the survivors in container order from `0` (`§6.4`'s closing clause), so `['v',1]` stops meaning what it meant:
   the node that stood there stands at `['v',0]` afterwards and a DIFFERENT node stands at `['v',1]`.** **So a
   registration at an index is a registration on a value the store never wrote** — it names a POSITION, and the
   store writes LOCATIONS. **THE RULE: a constraint or a listener that cares about positional membership REGISTERS
   AT THE CONTAINER — `['v']` — AND READS WHAT IT CARES ABOUT** (`D-50`'s `read()` rule, `§7.6`; `D-70`, verbatim:
   *"A constraint/listener that cares about a derived value like the vec index should listen to the vec, not the
   contained node"*).
3. **AND THE CONSEQUENCE A CONSUMER WILL OTHERWISE DISCOVER: A REGISTRATION AT AN INDEX WILL NOT FIRE WHEN ITS
   NEIGHBOURS MOVE — AND THAT IS NOT A DEFECT, BECAUSE NOTHING WAS WRITTEN AT THAT ADDRESS.** **`D-70`, verbatim:
   *"a listener at `['v','1']` does not hear it — correctly … A registration at a DERIVED address is a
   registration on a value the store never wrote … the `triggered` list is right to be empty, because nothing at
   `['v','1']` was written."*** **The act's address was `['v',0]`, the anchor it removed was at `['v',0]`, and no
   op of the store carries `['v',1]` as its address** — so there is no firing to owe. **The store owes you the
   CONTAINER's firing; it does not owe you a firing for a renumbering.** **And a registration at an index is not
   the only way to get this wrong — a listener whose job is to change data is the other half of rule 1.**

**MEASURED 2026-10-29, ON THIS CHECKOUT, THROUGH THE PUBLISHED ENTRY** (`tests/e2e/discard-witness.mjs`'s
`DW-15.1`/`DW-15.2`/`DW-15.3`; the drive is `store.write(['v'], 'mem', [{b:1}, {b:2}, {b:3}])` and then
`store.delete(['v',0])`, so `{b:2}` moves from `['v',1]` to `['v',0]` and `{b:3}` from `['v',2]` to `['v',1]`):

- **THE LISTENER AT `['v']` FIRES, ONCE**, is handed the ACT's address `['v',0]`, and **the collection it reads
  inside its body is the RENUMBERED one** — `[{"b":2},{"b":3}]`, the value it cares about, read at the address that
  is not derived; **and the record's `triggered` names its handle at `['v']`, the address it was bound at.**
- **THE LISTENER AT `['v',1]` DOES NOT FIRE** — `0` invocations, its handle nowhere in `triggered` — **and the
  cell asserts `0` as CORRECT, citing `D-70`, not as a defect**: `['v',1]` named `{"b":2}` before the act and
  names `{"b":3}` after it, so the renumber moved a DIFFERENT node under the position it registered.
- **THE CONSTRAINT AT `['v']` IS ASKED FOR THE SAME DELETE** — once by the pass — and it is handed **THE ACT's
  `address` (`['v',0]`), `tier` and `value`**: the value the delete left AT THE ACT'S ADDRESS, which under a
  renumbering is **the survivor that moved into index `0`, `{"b":2}`, and NOT the collection.** **The collection it
  JUDGES is the one its body reads at `['v']`** (`D-50`): the renumbered `[{"b":2},{"b":3}]`. **Its registration's
  own ask is the one with no attempt, and that ask's `value` IS the collection at `['v']`** — so a container pair
  is asked at the container and reads at the container, whichever ask it is answering. **Its `id` stands in the
  same `triggered` list as the two listener handles.**

**EACH CELL BITES UNDER A `/tmp` REVERT, AND THE REVERT IS THE ONE THIS RULE NAMES — THE CONTAINER REGISTRATION
REPLACED BY AN INDEX ONE:** `['v']` → `['v',1]` at the listener turns `DW-15.1` RED (no firing, no collection read)
and at the pair turns `DW-15.3` RED (the pass asks it `0` times); the mirror move — the index listener's `['v',1]`
→ `['v']` — turns `DW-15.2` RED (the `0` becomes a `1`). **So each arm is held by the registration's ADDRESS and by
nothing else in the drive.**

**AND WHAT `D-70` DOES NOT CHANGE, SAID PLAINLY: no member, status, kernel item or bound moves.** **This section
declares a rule of USE over a surface that was already measured — the seventh residual closes by DECLARATION, not by
machinery** (`D-70`'s own terms; `§3.1`'s fourteen members; `§8.1`'s twenty statuses; `§7.7`'s budget).

**★ AND THE FOUR THINGS THIS SECTION STILL LEFT A CONSUMER TO DISCOVER, WRITTEN DOWN 2026-10-29 — `D-66` READ
BESIDE `D-70`, AND EVERY SENTENCE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE.** `RCA-8(g)`
ANNOTATE-BESIDE: **this clause declares no member, no status, no kernel item and no bound, and it moves no figure
of `§3.1`, `§8.1` or `§7.7`. Each of the four is a reading this surface leaves you to DERIVE unless it is
stated — none of them is a rule the surface lacks, and that is exactly why they have to be written.**

1. **★ THE RECONCILIATION, IN ONE CLAUSE: THE REACH IS PER ADDRESS THE STORE WROTE, NOT PER POSITION.** **`D-66`'s
   sentence — *"a pair is asked when the act changes the value at its address"* — is a criterion over the
   addresses the act WROTE and the addresses it REPLACED, and `D-70`'s — *"nothing was written at `['v',1]`"* —
   is that same criterion read at an address the act never wrote.** **The two collide only ON THEIR FACE, and the
   noun reconciles them: a `VEC` renumber DOES change what a read at an index returns, but AN INDEX'S *MEANING*
   CHANGING IS NOT THE STORE *WRITING* IT.** **The store wrote `['v',0]` and replaced nothing at `['v',1]`, so it
   owes you a firing at the one address it wrote and none at the other** — which is rule 3 above, measured at
   `DW-15.1`/`DW-15.2`.
2. **★ THE MISSING LOOP GUARD IS AN ABSENCE, AND THIS IS WHAT IT MEANS.** **Nothing observably bounds a chain of
   listener writes: no budget, no depth, no counter and NO INSTRUMENT YOU CAN READ.** **The constraint side is
   different for one reason and not for a better one: THE GUARDS ARE THE PASS'S, and a listener does not run in a
   pass** — the restart budget (`RESTART_LIMIT` `3`), the applied-repair marker and the per-op floor all belong to
   the pass, and a listener is delivered after it. **SO YOU BOUND YOUR OWN CHAIN, in your own code, with your own
   count, because the package will not.** **And the practical shape is a sequence rather than a defect: a listener
   that writes is a listener whose writes OPEN COMMITS, whose commits RUN CONSTRAINTS, whose constraints FIRE
   LISTENERS — the machine follows that as far as your code takes it and stops only when your code stops.**
3. **★ A CALLBACK THAT BOTH WRITES AND RENDERS IS NOT REFUSED.** **The two kinds are A RULE OF USE, not an enforced
   classification.** **The package registers such a function, delivers it as a listener, and lets its write go
   UNGUARDED — nothing inspects a listener's body for a store call, and no refusal names the mix.** **So a consumer
   who assumes the package enforces the split will build the chain of item 2 believing it cannot happen.**
4. **WHAT MOVED IS NOT REPORTED.** **The delivery's one argument is the ACT's address** — `['v',0]`, the address the
   store wrote — **and not what shifted under it.** **So a container listener that must know which position moved
   DIFFS THE COLLECTION ITSELF**, inside its own body, at the container (`D-50`'s `read()` rule). **The reason is
   not an omission: the act's address is THE STORE'S OWN DATUM** — it stands on every op and on every record
   `§6.4` declares — **whereas WHICH POSITION MOVED IS THE CALLER'S QUESTION, asked against state the caller chose
   to keep.**

---

## §8 · Refusals

**One failure surface, everywhere, and it is THROWN:**

```js
try {
  const v = store.read(['users', 0, 'name']);
} catch (e) {
  // e is a PLAIN OBJECT — never an Error subclass, never a rejected promise, never a tagged union
  const { status, message, log } = e;
}
```

**A refusal is a thrown object literal carrying exactly `{status, message, log}`** — **never an `Error` subclass,
never a returned tagged union, never a `Promise` rejection**, so `try/catch` is the whole error model
(`bindings/js/index.d.ts`, `StoreRefusal`; `surface.md §2.5`'s clause of 2026-10-16, the crossing form's one home;
`js/contract.md §1.4`).

**★ AND THE `log` MEMBER IS ALWAYS PRESENT, and it is a plain own enumerable data member of that same object** —
written with an object literal, not `defineProperty`, not a getter, not on a prototype and not behind a `Symbol`.
**So `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on EVERY arm. It is
never absent, never `null` and never a non-array; `[]` is its declared value where the failure's cause has no
attempt at all, and every failure whose attempt exists carries that attempt's own entries**
(`index.d.ts`, `StoreRefusal` items 4, 9 and 10; `surface.md §2.5`).

**Measured 2026-10-26, on refusals from `read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`,
`unlisten`, `register` and `removeListener`: every one was an `Object` whose `Object.keys` was
`["status","message","log"]`, whose `log` was `[]`, and which was not an `Error` instance.**

### §8.0a What the `log` IS: one list per COMMIT — and what that buys you

**⟶ ADDED 2026-10-28. THIS SUBSECTION IS THE ONE THING TO KNOW ABOUT `log`, AND IT CHANGES WHAT YOU WILL SEE
IN IT.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this
subsection.** **The architect, verbatim: *"If it's part of the same commit, then it uses the same message log.
If it opens a new commit, it uses the new commit's message log. Constraints/Repairs should always use the same
commit. Listeners should open a new commit, because the triggering commit already passed constraints"***
(`strata/decisions.md` · `D-53`).

**SO THE LIST BELONGS TO THE COMMIT AND NOT TO THE ATTEMPT.** One write is one commit, and everything that
commit does — the constraint passes that judged its value, a repair's own write, the re-run after that repair,
and the terminal arm's `outcome` entry — **appends to ONE array**. Consequences you can rely on, each measured
on this checkout:

- **the entries run `0..n-1` CONTINUOUSLY across those steps**, because the position of an entry in the list
  **IS the array index** and there is one list (`D-65`; the `seq` member that used to restate it is gone). A
  repair's `commit` entry can stand in the middle of the list, between the refused pass's entries and the
  re-run's: **it is a real entry of the same commit, not a second log.**

**⟶ AND WHAT `seq` IS TRUE OF, SAID PLAINLY, 2026-10-28 — `DEF-AI`, MEASURED.** **`seq` is the position of the
entry in the commit's own message log; it is not the store's journal ordinal, and the two differ by design.**
`RCA-8(g)` ANNOTATE-BESIDE: **the bullets above stand BYTE-FOR-BYTE and are read THROUGH this paragraph.** **THE
MEASUREMENT THAT OWES IT: a refusal's entry carried `seq` `1` while the store's own journal counter read `41`, and a
consumer read the two as one ordinal.** They are two ordinals with two homes — **`JournalOp.seq`, the store's
append ordinal that orders the store's record, and this `seq`, the kernel's append ordinal on the COMMIT's one
list** — and neither equals the other by construction. **AND THE ORDER ACROSS A COMMIT'S ATTEMPTS IS MEASURED, NOT
CLAIMED: one repair write appends the five entries `constraint-check` `1` · `repair-run` `2` · `commit` `3` ·
`constraint-check` `4` · `commit` `5` — strictly increasing in array order, continuous from `1`, across the pass,
the repair's own joined write and the re-run** (`tests/e2e/repair-in-commit.test.mjs`'s `D-46` (1) cell, printed).
**No entry is ever minted from the store's journal counter**: that would be a second ordinal with no consumer.
(`D-53`; `D-48` · `DEF-AI`; `index.d.ts`'s `LogEntry` carries the same sentence.)

**⟶ AND THE MEMBER THAT SENTENCE WAS ABOUT IS GONE, 2026-10-28 — `D-65`: THE ARRAY INDEX IS THE POSITION.**
`RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this paragraph; what it says
of `seq` is RETIRED, not rewritten.** **THE RULING, THE ARCHITECT, ONE WORD: *"Drop it"*** (`strata/decisions.md` ·
`D-65`) — `seq: log.length + 1` IS the index of the entry being appended, a second copy of a fact the array already
carries, so **the entry carries FIVE members — `kind` · `id` · `message` · `opId` · `state` — and NO `seq`.**
**WHAT THAT MEANS FOR YOU, WITHOUT A MEMBER TO READ:** the position of an entry is **`log.indexOf(entry)`**, or
the index of the loop you are already in; the order across a commit's attempts is the same order those bullets
measured, read off the array; and **`JournalOp.seq` IS UNMOVED** — the store's append ordinal is a different subject
and is now impossible to confuse with the commit's, because the commit's no longer has a member to be confused
with. **NO OTHER MEMBER, KIND, STATUS, COUNT OR SENTENCE OF THIS GUIDE MOVES** (`bindings/js/index.d.ts`'s
`LogEntry` carries the same retirement).
- **A nested write a CONSTRAINT body makes is part of the same commit**, so **its entries are in YOUR list** —
  which is why a constraint body that performs a refused write now shows you that refusal's own
  `constraint-check` and `outcome` entries, verbatim, before the enclosing `outcome` entry. **That is `DEF-AK`'s
  `constraint` host.** (Its `listener` host is unchanged, and the difference is the next bullet.)
- **A LISTENER's write OPENS A COMMIT OF ITS OWN**, so **its entries are NOT in the list of the commit that
  triggered it**: *the triggering commit already passed constraints, so what the listener does is a new
  question.* If you need to know what the listener's own write decided, catch the refusal the listener body
  lets out — it carries **its own** `log`, and so does a refusal you throw out of a listener.
- **A failed `file`-tier SAVE now crosses WITH THE COMMIT'S ENTRIES — its `log` is no longer `[]`.** The save is
  the write's LAST constraint: when it fails, the one `outcome` entry that ends your list carries **`KC-9`**,
  and the entries before it are everything the commit did. **So a consumer can tell the two failing arms apart
  from the log alone: `ConstraintPassRefused` ends at `KC-3`/`KC-5`/`KC-6`/`KC-8`, `FileCommitFailed` ends at
  `KC-9`.** (See `§8.1`'s token line below — the kernel's set is `KC-1`…`KC-9` from this date, and the store's
  closed status set has not moved.)
- **A refusal that names no attempt still carries `[]`** — a `listen` refusal, a construction refusal, a
  detached member's — and a `TypeError` from a constraint method carries `[]` too. **The list is the COMMIT's
  and there is no commit there.**

**READ THIS BEFORE YOU LOG-COUNT.** `log.length` is **not** *"how many constraints were evaluated"* and not
*"how many attempts this write made"*: it is **every entry of the commit**, in append order, from every attempt
the commit held. Count entries by `kind` and `id` (and by `opId` where you need the iteration) rather than
assuming a shape, because **a repair or a body's own write legitimately adds entries to the list you caught.**

**AND THE ONE PLACE THE INVARIANT IS NOT REACHED, SAID PLAINLY RATHER THAN LEFT TO A MEASUREMENT: a pair body
invoked at a REVERSAL's judgement has no commit record standing beside it to name**, so a write such a body
makes still opens a commit of its own and its entries land in that commit's list and not in the reversal's
refusal (`js/contract.md §2.6`'s `D-53` clause, item `6`).

**⟶ AND A THROWN MESSAGE STANDS IN THAT LOG, 2026-10-28 — `D-55` ITEM 1 · `DEF-AK`, MEASURED.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of §8.0a above stands BYTE-FOR-BYTE and is read THROUGH this one; the list's home, its one-`kind`-per-entry rule and its `seq` ordinal do not move — ⟶ and from 2026-10-28 the ordinal is the ARRAY INDEX and the member is gone (`D-65`), so *"its six members"* above is read as the FIVE-member shape this guide declares at `LogEntry`.** **THE RULING, THE ARCHITECT, VERBATIM: *"Include a thrown message in the message log. Obviously."*** **WHAT `1.3.0` DID, MEASURED: a constraint body that threw its own `Error` crossed `ConstraintBodyThrew` whose `log` carried only the attempt's `outcome` entry — the thrown value's own literal occurred ZERO TIMES in it — while the crossed sentence said *"a constraint body's throwable crosses as this refusal"*, a carriage the log did not make.** **WHAT YOU GET NOW:**
- **the value the body threw is PRINTED IN THE LOG**, in the ONE entry the attempt's terminal act appends (the `outcome` entry): *"the constraint `c1` threw; the attempt is closed — the value it threw was …"*. **THE FORM IS NAMED AND NOT SILENTLY STRINGIFIED**: an `Error` (or any object) reads *"an object whose own `message` member is the string "…""*, a thrown string reads *"a string whose text is "…""*, a thrown number *"a number whose value is 42"*, a thrown `void 0` *"no value at all"*, and an object with no `message` *"an object carrying no own string `message` member"*. **Nothing is read off a prototype and no caller code runs to spell it**;
- **and the crossed `message` stops claiming the value crosses**: after the store's generated sentence it says, in its own words, that the value the body threw does **NOT** cross as this refusal — and it names where the form it threw stands, which is that `log` entry. **THE CALLER'S OWN TEXT IS QUOTED IN THE LOG AND NEVER IN THE SENTENCE**, so a forged `{status, message}` cannot make the package speak a refusal it did not find (`DEF-A`'s protection, unmoved);
- **where no attempt stands there is no commit log to carry it** — a registration-time body's throw crosses with `log: []`, which is `surface.md §2.5` item 4's declared arm — **and the crossed sentence says exactly that instead of pointing at a list that would not hold the form**. (`tests/e2e/discard-witness.mjs`'s `DW-10.3`/`DW-10.4` print the readings for an `Error`, a string and an object with no `message`; both cells are RED under a revert of the terminal sentence.)

**⟶ AND THE RECORD YOU ARE HANDED IS FINAL, 2026-10-28 — `D-55` ITEM 6 · `DEF-AO`, MEASURED.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause above stands BYTE-FOR-BYTE and is read THROUGH this one; the log's home on the commit, its entries and its identity are unmoved.** **THE RULING, THE ARCHITECT, VERBATIM: *"Attempts don't log. This is what the commits are for. The commits have their log handed off to the client and are dropped after closing out."*** **SO: a closed attempt's report and its log DO NOT MUTATE AFTER THE HANDOFF — a consumer holding a refusal is holding the record, and a record that changes after it is given out is not a record.** **WHAT THE PACKAGE DOES: at the end of the commit's own processing — the restarted check's amendment included, which is part of closing out — the report and the log it carries are `Object.freeze`d**, so a later act can neither append an entry nor re-member the report. **THE LIST IS THE SAME LIST** (`D-53`: *"the crossed report IS that list"*) — the refusal you caught and `report(store, ref)`'s `log` are ONE array, now sealed. **AND THE LIST IS SEALED WITH ITS COMMIT**, never at a nested attempt's own handoff: a constraint body's nested write is part of your commit (`D-53`), so freezing the list from inside it would stop the enclosing attempt's own `append`. (`tests/e2e/discard-witness.mjs`'s `DW-10.6` holds the crossed refusal and the closed report, drives four further acts, and prints the bytes before → after beside `Object.isFrozen` on both; RED under a revert of the seal.)
**⟶ AND ITS SECOND HALF IS NOW DELIVERED, 2026-10-28 — `D-58` · THE DROP, AND NOTHING OF A RUNNING COMMIT.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause above stands BYTE-FOR-BYTE and is read THROUGH this one; the seal, the list's identity and the log's home on the commit are unmoved.** **THE RULING, THE ARCHITECT, VERBATIM: *"The client does not need any insight into the current state of a commit/attempt before it completes. Don't expose any of it. After a commit/attempt resolves/rejects, the store does not need to retain the message log or other client-returned data. Don't retain it."*** **WHAT THAT MEANS FOR YOU, IN TWO SENTENCES. (1) A RUNNING COMMIT HANDS YOU NOTHING**: the log reader refuses a live attempt with `KC-7` — the same refusal the report reader already answered — so an in-flight `seq` list is no longer a thing you can read; **and (2) ONCE THE COMMIT RESOLVES OR REJECTS, THE STORE KEEPS NO MESSAGE LOG**: what it goes on holding is the outcome, the ops and the reversal's record, and the list it handed you — the entries on the refusal you caught, or on `report`'s return — is the ONLY copy, sealed at the handoff. **WHAT THIS COSTS, SAID PLAINLY**: on an arm whose handoff carries no list at all — a repair body that throws, and a PASSING `write` (whose answer is `{op, watched, triggered}` and has never carried one) — the entries are no longer readable after the call. **THAT IS THE RULING'S PRICE AND NOT A DEFECT**, and it is why the seal mattered: a record you hold is the record. (`tests/e2e/discard-witness.mjs`'s `DW-11.1`–`DW-11.4` print both readers, the pass's own instant, the retained shape before → after and the single-copy proof; each RED under its own `/tmp` revert.)

**AND THE RECORD THAT SURVIVES THE HANDOFF HAS FOUR MEMBERS, NAMED HERE BECAUSE THE CLAUSE ABOVE SAYS WHAT IT HOLDS WITHOUT SPELLING ITS SHAPE: `{attempt, ops, outcome, rollback}`** — the attempt's identity, the ops the commit appended, the outcome it reached, and the reversal's record where one ran — **and NO message list.** **A log entry's position is its ARRAY INDEX (`D-65`), so *"an in-flight `seq` list"* above is read as an in-flight ENTRY list**: there is no `seq` member in it and no list to read while the attempt runs. (`D-58`; `D-65`; `bindings/js/src/entry/kernel-terminal.mjs`'s `dropHandoff`, which is where the closed record's four members are written; `D-55` item `6` is the seal they are frozen under.)


**EVERY REFUSAL NAMES ITSELF** — by a `status` from the store's own closed set, and by a **human `message` that
carries the address, the domain, and what was found instead.** The message is generated from the code and the
failing trigger's arguments and never hand-authored at a call site
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/seams-and-lifecycle.md §8.2`, archived);
**`index.d.ts` carries both, verbatim from the store.**

### §8.1 The set is TWENTY and open by design

**⟶ RE-DERIVED AGAIN 2026-10-26 — THE SET IS TWENTY, ON THE ARCHITECT'S TWO RULINGS, VERBATIM: *"Expand the
returned fail-state list to include the refusal"* and *"Assert the constraints on rollback"*.** **`StoreStatus`
carries TWENTY members, plus the open escape arm `(string & {})`** — ranks `1`…`19` stand exactly as the two
paragraphs below print them, and **the appended term is `ConstraintPassRefused` at rank `20`: THE ONE STATUS A
CONSTRAINT REFUSAL ANSWERS WITH.** **Two arms and one member:** a `write` whose registered constraint refuses it
(`{status: 'ConstraintPassRefused', message, log}`, with the kernel's own token still riding the attempt's
`log[].state` — `KC-3`, `KC-5`, `KC-6`, `KC-8` as the case is), **and** a `rollback` whose terminal state a
registered constraint refuses (`§5.4`). **`FileCommitFailed` KEEPS rank `15` AND IS NOW THE **SAVE'S** CODE
ALONE** — it is produced by a failing `file`-tier save and by nothing else — **so a constraint refusal never
answers it again**, and the status stops naming a layer that did not fail. The algebra reads
`11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓. **Every paragraph and every table row below is the reading of its
own date and is read THROUGH this clause** (the guide's figures move with the set's own membership, which is
this section's own rule).

**★ AND THE KERNEL'S OWN TOKEN SET — the one that rides `log[].state` — GREW BY ONE ON 2026-10-28, WHILE THIS
SECTION'S SET DID NOT MOVE AT ALL.** **The architect, verbatim: *"Open the token set"*** (`strata/decisions.md` ·
`D-53`). **The kernel's states are `KC-1`…`KC-9` from this date; the appended member is the SAVE ARM's own,
`KC-9`, and `KC-8` keeps its declared meaning (the composition's floor) unmoved.** **WHY IT WAS OWED: a save
failure and a constraint refusal both ended at `KC-8` on the arm where the failed save's compensation met a
floor code, so `KC-8` crossed as two statuses and neither arm was derivable from the log's terminal state.** **So
now: a constraint's refusal ends at `KC-3`/`KC-5`/`KC-6`/`KC-8`, a failed save ends at `KC-9`, and the two are
told apart by the list you caught.** **NO MEMBER OF THE STORE'S CLOSED STATUS SET MOVES AND NO RANK OF IT
MOVES**: `KC-9` rides `log[].state` exactly as every other token does, and `status` still never carries a `KC`
spelling at all — the paragraph above's own law (`A120` (2)), unmoved.

**⟶ RE-DERIVED 2026-10-26 TO THE ARCHITECT'S RULING AND NOT TO THE BYTES** (`DEF-S` and `DEF-N`; the architect,
verbatim: *"Expand the returned error set for both S/N"*). **`StoreStatus` carries NINETEEN members, plus the open
escape arm `(string & {})`** — ranks `1`…`17` stand exactly as the paragraph below prints them, and the two
appended terms are `ConstraintBodyThrew` at rank `18` (a constraint BODY's throw, which the package's crossing
converts into the one failure form from a value the KERNEL marked as a body's own) and
`ConstraintRefusedAtRegistration` at rank `19` (the REGISTRATION VERDICT: a well-formed pair whose body answered
non-`true` at registration or at a re-enable). **`ConstraintListInvalid` stays at rank `16` and names the SHAPE
arm alone — a malformed entry — so a pair that is `{address: ['a'], id: 'c1'}` is never refused with it.** The
algebra reads `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓. The paragraph and the table below are the 2026-10-23
reading and stand as their own date's (the guide's figures move with the set's own membership, which is the
`§8.1` rule the same paragraph states two sentences later).

**`StoreStatus` carries SEVENTEEN members, plus an open escape arm `(string & {})`**
(`bindings/js/index.d.ts`, the `StoreStatus` declaration; `docs/specs/storeroom-native/contract.md §8.1`'s
2026-10-23 amendment, whose own words are *"the operative set is `17` members ranked `1`…`17`"*; the algebra
`11 + 2 + 1 + 1 + 1 + 1 = 17` ✓). **`ValueRefusedAtBoundary` is written at rank `17`, LAST of the seventeen and
BEFORE the escape arm**, and `ConstraintListInvalid` stands at rank `16`. **The store implements seventeen
(`src/error.rs`'s `CODES`).**

| rank | status |
|---|---|
| 1–11 | `AddressMalformed` · `AddressNotFound` · `LeafHasNoDownstream` · `TierNotFound` · `OutOfDomainTier` · `ParentAnchorMonotonicityViolation` · `ContainerKindConflict` · `ReadTargetIsBranch` · `WriteParentNotLink` · `JournalOpUnknown` · `RollbackCompacted` |
| 12–16 | `ConstructionArgumentMissing` · `FilePathUnreachable` · `ValueNotAdmitted` · `FileCommitFailed` · `ConstraintListInvalid` |
| 17 | `ValueRefusedAtBoundary` |
| 18–19 | `ConstraintBodyThrew` · `ConstraintRefusedAtRegistration` (`DEF-S`, `DEF-N`, 2026-10-26) |
| 20 | `ConstraintPassRefused` (`DEF-H`, `DEF-W`, 2026-10-26) — a constraint's refusal of a `write`, and of a `rollback` whose terminal state it refuses |
| escape | `(string & {})` |

**THE ESCAPE ARM IS LOAD-BEARING RATHER THAN LOOSENESS.** The store's set has already moved three times — fourteen
to fifteen, fifteen to sixteen, and sixteen to seventeen — and an immutably-enumerated union would mis-type a LAWFUL
refusal the moment the set moves again; **the arm is what keeps a member the store has added typeable in an
installed `0.5.0`** (`index.d.ts`, `StoreStatus`; `PUB-DD-3`). **It has just done so: the 2026-10-26 ruling
added `ConstraintBodyThrew` and `ConstraintRefusedAtRegistration` at ranks `18` and `19`, and an installed copy
whose union stopped at `17` would mistype both.** **So: do
not `switch` on these without a `default`, and NEVER treat an unknown `status` as success.** The set is the
store's to close; **the package mints no member, widens no set and renames none.**

**⟶ AND AN INNER REFUSAL A CONSTRAINT BODY THREW NOW CROSSES BESIDE THE CROSSED ONE, 2026-10-28 — `DEF-AK`, MEASURED AND DECLARED.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this one; no rank moves and no member is minted.** **WHAT WAS MEASURED: a LISTENER body propagates an inner refusal VERBATIM — same `status`, same `message`, same two-entry `log` — while a CONSTRAINT body making the IDENTICAL write had it REPLACED by a generated `ConstraintBodyThrew` whose single log entry was the OUTER attempt's, with the inner refusal's own literal occurring ZERO TIMES anywhere. WHICH HOST YOU WERE INSIDE DECIDED WHAT YOU WERE TOLD.**
- **`ConstraintBodyThrew` is still the `status` that crosses** — the body did throw, and rank `18` says so — **but the inner refusal is now REACHABLE from what you catch, under `Symbol.for('provident-storeroom.inner-refusal')`:** a non-enumerable own member carrying the value the body threw, so **its own `status`, its own `message` and its own `log` are all there to read.** `Object.keys(caught)` still reads `["status","message","log"]` — three members in the form's own order — and the form is unmoved.
- **AND THE CROSSED SENTENCE STOPS CLAIMING MORE THAN IT DELIVERS.** Its own bytes — *"a constraint body's throwable crosses as this refusal"* — now stand followed by **the package's own clause saying the value the body threw does NOT cross as this refusal, naming the inner `status` and quoting the inner `message`, and saying where the inner refusal crosses instead.** A body that threw something that is **not** a refusal (**a `TypeError`, a string**) has **nothing carried beside the crossed form**; there is no inner refusal to name, and the generated sentence names the CODE rather than promising a value.
- **A FORGED THREE-MEMBER OBJECT IS STILL NOT QUOTED.** The inner refusal is recognised by **a mark this package sets on the forms IT builds** — never by the shape a caller can spell — so a body throwing `{status, message, log}` of its own gets the generated sentence and nothing of its text is repeated back as though the package had found a refusal there (`DEF-A`'s protection, extended one layer in).
- **THE LISTENER ARM IS UNCHANGED, AND THAT IS THE CONTROL:** nothing marks a listener's throw, so it still crosses **as itself**, by identity — `caught === thrown`, its own `status`, `message` and `log`. **A `rollback` whose judgement a pair's body threw** crosses `ConstraintBodyThrew` at rank `18` and carries any inner refusal the same way (`§5.4`).
- **⟶ AND THE CONSTRAINT HOST'S LIST IS NOW THE COMMIT'S, WHICH IS THE DEEPER HALF OF THE SAME RULING (2026-10-28, `D-53`).** The inner refusal's own two entries are **IN the crossed report** — the `constraint-check` entry naming the inner pair and the `outcome` entry carrying `KC-3` — on the same array the enclosing attempt appends to, at a continuous `seq`; **`carriedInner.log` and `caught.log` are ONE array, not two.** **READ §8.0a ABOVE BEFORE COUNTING ENTRIES**: the listener's list is still its own, because the listener's write opens its own commit, and that difference between the two hosts is now the difference the ruling draws rather than an asymmetry nobody declared.

**AND `ValueRefusedAtBoundary` IS THE ONE YOU WILL MEET ON THE VALUE ROUTE:** the package's own walk decides a
value's class **before any store verb is called** and answers this member with the failing target's spelling
(§10). **`ValueNotAdmitted` stays at rank `14` and is the STORE's own answer on the native route — a pass that
reads rank `17` as a rename of rank `14` has destroyed a member.**

**⟶ AND THREE FIGURES OF THIS SECTION ARE CORRECTED AT THIS DATE, EACH AT ITS OWN SITE, SO THE NINETEEN ABOVE IS
NOT LEFT DISAGREEING WITH ITS OWN NEIGHBOURS** (`RCA-8(g)` ANNOTATE-BESIDE: every sentence above stands BYTE-FOR-
BYTE and is read THROUGH this clause). **(i) *"The store implements seventeen (`src/error.rs`'s `CODES`)"* READS
NINETEEN**: `src/error.rs`'s `CODES` is `[&str; 19]`, ranks `18` and `19` being the two this set's 2026-10-26 ruling
appended — **so the declaration of record and the crate agree at nineteen, which is the row above.** **(ii)
*"installed `0.5.0`"* READS `1.0.0`** (`bindings/js/package.json`, read at its own bytes; §0's correction clause).

**⟶ AND THAT CORRECTED FIGURE IS ITSELF ONE RELEASE BEHIND, 2026-10-27: *"installed `0.5.0`"* READS `1.0.1`**
(`bindings/js/package.json` at its own bytes; §0's correction of this date; `RCA-8(g)` ANNOTATE-BESIDE — the
sentence above stands and is read THROUGH this one). **THE SENTENCE'S OWN POINT IS UNMOVED: the escape arm is what
keeps a member the set has since gained typeable in an installed copy, and the set is the store's to close.**
**(iii) THE SET HAS NOW MOVED FOUR TIMES, NOT THREE**: fourteen to fifteen, fifteen to sixteen, sixteen to
seventeen, **and seventeen to nineteen** — **the escape arm's argument is strengthened rather than weakened by the
fourth move, which is exactly the arm's own evidence.** **NO TABLE ROW, NO RANK AND NO TRIGGER MOVES, and the two
appended members are the ones the table's `18–19` row already prints.**

**⟶ AND TWO FIGURES OF THAT CORRECTION ARE THEMSELVES RE-READ AT THE SHIPPED TREE, 2026-10-26, BECAUSE THE SET MOVED AGAIN AFTER THE CORRECTION WAS FILED AND ITS OWN ALGEBRA MOVED WITH IT.** `RCA-8(g)` ANNOTATE-BESIDE: **the correction's sentences — including its *"READS NINETEEN"* and its *"FOUR TIMES, NOT THREE"* — stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause re-reads two figures and moves no site, no rank and no trigger.** **(i) *"`src/error.rs`'s `CODES` is `[&str; 19]`"* READS `[&str; 20]`** — read at the crate's own bytes — **ranks `18`, `19` and `20` being the three the 2026-10-26 rulings appended, so the declaration of record and the crate agree at TWENTY, which is this section's own heading and its table's own `20` row.** **(ii) THE SET HAS NOW MOVED FIVE TIMES, NOT FOUR:** fourteen to fifteen, fifteen to sixteen, sixteen to seventeen, **seventeen to nineteen, and nineteen to twenty** — **the fifth move being `ConstraintPassRefused` at rank `20`, appended on the architect's ruling *"Assert the constraints on rollback"* — and the escape arm's argument is strengthened rather than weakened by the fifth move, exactly as it was by the fourth.** **NO TABLE ROW, NO RANK AND NO TRIGGER MOVES BY THIS CLAUSE: the heading's algebra `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓ is the one figure of this section that stood right before it and stands right after it.**

### §8.2 The two states that share `FilePathUnreachable`, and what each means for you

**`FilePathUnreachable` is the one member that answers for two unrelated failures, and a handler that treats them
as one "file problem" will retry a construction that cannot succeed, or discard a running store.**

| the state | when you meet it | what it means |
|---|---|---|
| **`FilePathUnreachable`** | **at `storeCreate`** — no addon loaded at either rung (§2.3), or a provided `filePath` that failed the construction-time reachability test | **NO INSTANCE WAS RETURNED AND NOTHING WAS CREATED.** There is no store to retry against |
| **`FileCommitFailed`** | **on a `file`-tier write's save, on an instance that is running** | **THE INSTANCE IS FINE AND THE WRITE FAILED — AFTER THE STORE'S OWN JOURNAL ROLLBACK ALREADY RAN** (§9.2) |

**The refused `filePath` forms, each answering `FilePathUnreachable` with nothing created:** an absent parent
directory; a path that is a directory; an existing file that is not writable; a name occupied by a DANGLING
SYMLINK; a parent on a read-only mount (`EROFS`); and a create the process is denied (`EACCES`)
(`docs/specs/storeroom-native/contract.md §8.1` #13's amended trigger clause; `§10.4` part 5).

### §8.3 The refusal that is not `{status, message, log}` — declared, and narrow

**Two positions throw a `TypeError` instead of the one form, and both are DECLARED rather than accidental:**

1. **`write`'s `commit` position.** Every form at that position outside the admitted one throws **the class
   test's own `TypeError`, whose `status` member is ABSENT and whose STRING `message` member is REQUIRED**
   (`surface.md §2.4` item 9 (g) item 1; `index.d.ts`, the `write` member). **A refused position stops the write:
   no verb is reached and no byte moves.**
2. **The three constraint methods' argument positions.** **Every outside form of either position throws ONE
   `TypeError`, whose `status` member is ABSENT, and nothing is added, enabled, disabled or otherwise changed**
   (`index.d.ts`, `addConstraint`; `surface.md §2.4` item 5's constraint-argument rule (ii);
   `parameter-semantics.md §2.25`, archived).

**Measured 2026-10-26, and it is the sharpest of these:** `store.constraintOn({address: ['a'], id: 'c1'}, () =>
true)` at a pair this entry does not carry threw a **`TypeError`** whose `Object.keys` was `["log"]`, whose
`status` was **absent**, and whose message read *"the pair at the first argument of `constraintOn` carries no
constraint in this instance, and a toggle names a pair the entry carries"*. **So the `TypeError` carries `log` and
no `status`, and no clause declares that member set** (`docs/L1/open-items-2026-10-25.md §2`'s item (d) records
the residue and its owner, `role_spec_writer`).

**THE PRACTICAL RULE, AND IT IS THE WHOLE OF WHAT YOU NEED: catch broad, branch on `status` when it is present,
and never assume a caught value has one.** **A `TypeError` whose `status` is absent is either a declared
class-test site above or your own bug — and it is never a store refusal.**

---

## §9 · The `file` tier

### §9.1 Construction, `filePath`, and the file the store leaves behind

**`filePath` is OPTIONAL and its absence is in domain: the register is created at `mem`.** **The register's own
tier is fixed at creation and never moves** — `file` where a `filePath` was provided and passed the probe, `mem`
otherwise (`docs/specs/storeroom-native/contract.md §10.4`; the archived `write-and-read.md` `§3.2`'s register-tier
clauses). **That matters because it is the parent anchor
the monotonic clause is evaluated against at a register key: in a `mem`-register store the `file` tier is
unreachable at register keys, and through the chain below them.**

**★ AND A PROVIDED, ABSENT PATH IS CREATED AT CONSTRUCTION — EXCLUSIVELY, ZERO-LENGTH AND EMPTY, with no register
key, no journal entry and no registration committed** (`native/contract.md §10.4` part 3; `DD-28`'s amended cell). **So
`storeCreate` is itself a filesystem act: if your own arrangement of the path depends on its absence, the store
will have occupied it before you look.**

**AN EXISTING FILE IS NEVER TRUNCATED, AND THAT IS DELIBERATE:** the primitive is an exclusive create, and its
`AlreadyExists` falls through to a write-mode open that writes no byte — **so `storeCreate` over an existing
store's file is safe, and it is not a reset** (`native/contract.md §10.4` parts 2 and 6).

**AND EVERY CONSTRUCTION ARGUMENT IS VALIDATED BEFORE ANY FILESYSTEM ACT**, so a refused construction leaves
**no instance, no file, no directory and no byte** — which holds for the later-argument failures too, and is what
the ordering buys (`native/contract.md §10.4` part 4; `§8.1` #1 and #12).

**THE FILE IS THE STORE'S, NOT YOURS.** Do not read, edit, parse or migrate it by hand; its shape is the store's
own and a hand-migration is a corruption waiting to happen. **If you need a migration, read the old value through
`read` and write the new one through `write`** (`A117`/`A127`'s private-state rule; `write-and-read.md §7.2`).

**★ AND ONE NAMED LIMITATION WITH NO RULE, so you do not discover it as a mystery: a `filePath` naming a SYMLINK to
a real writable file is ACCEPTED at construction, and the first `file`-tier write's save replaces the link with a
regular file.** **Three remedies exist and all are priced; the choice is the architect's and no clause declares
one** (`archive/pre-strata-docs-2026-10-24/docs/defects.md`, `DEF-2026-10-13-D`; `strata/brief.md §6`). **If you
point `filePath` at a symlink deliberately, know that the store will end up holding a regular file at that name
and the link will be gone.**

### §9.2 Durability is a `file`-tier WRITE's act — and the terminal arm's save is a different save

**`DD-28`'s sentence is law: *"`file`-TIER DURABILITY IS PRODUCED BY A SUCCESSFUL `file`-TIER `write` ONLY"***
(`docs/specs/storeroom-native/contract.md` `DD-28`). **So `store.write(addr, 'file', value)` COMMITS, with no
kernel attempt and no terminal arm in the path, and a fresh `storeCreate` over the same `filePath` resolves the
address** (`strata/decisions.md` `D-32`, where the architect chose the native reading, `"a"`). **That correction is
the single largest of the archived guide's errors: it taught that the write verb performs no file I/O on any of
its arms, and that a bare `file`-tier write therefore does not persist.**

**AND `surface.md §2.11` clause 1 IS READ THROUGH THAT RULING RATHER THAN REPEALED:** *"the verb performs no file
I/O on any of its arms"* becomes **"the write verb performs no file I/O OF ITS OWN beyond the store's declared
write"**. **The clause still governs the PACKAGE's layer — it adds no second write path, no scratch copy and no
package-authored image — and it no longer denies the store's own declared act** (`D-32`, which also supersedes
nothing of clause 2).

**★ AND CLAUSE 2 IS UNTOUCHED AND STILL BINDS, which is why BOTH saves stand:** on the **kernel path**, the
terminal arm performs the store's `commit_file` **as its first act on the PASSING arm, before any delivered
listener body runs, keyed by the settled record's own `op`** — and **that is the KERNEL path's save of a whole
attempt, not a second spelling of the bare write's.** **Both acts stand; the bare write's and the terminal arm's
are different saves of different scopes, and the same bytes may lawfully be committed by both** (`surface.md
§2.11` clauses 2–4; `D-32`).

**So: no listener body runs before the pass, and none runs before the save on the passing arm.** **A failing pass
performs NO save at all** — the bytes at `filePath` after it are byte-identical to the bytes that stood there
before the write (`surface.md §2.11` clause 4 (i)).

### §9.3 A `delete` and a `rollback` perform no file I/O

**A `delete` — at ANY tier scope, INCLUDING one that removes `file`-tier versions — performs no file I/O, and a
`rollback` performs none either.** **The bytes at `filePath` remain the bytes of the last successful `file`-tier
write, and a fresh construction at the same `filePath` re-boots from those bytes — so the version the delete
removed in memory STANDS AGAIN after the re-boot.** **That re-boot is the store's own declared boot and not a
defect** (`DD-28`; `native/contract.md §7.2` item 6; `write-and-read.md §4.3`'s closing clause; `§6.4` `M-9`).

**What this means for you, in one line: durability is a property of `file`-tier WRITES. If you delete something
durable and the process then restarts, expect it back — and delete it again after the boot, or write over it.**

**⟶ AND THE SENTENCE ABOUT THE BYTES IS ONE PRODUCER SHORT, 2026-10-27 — A REFUSED REVERSAL'S RESTORE NOW WRITES
THEM WHERE IT MOVED A `file`-TIER NODE (`bd0fd8c`).** `RCA-8(g)` ANNOTATE-BESIDE: **the section above stands
BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION and moves no verb, no tier, no status
and no record.** **WHAT MOVED: the restore a REFUSED `rollback` performs — the compensating act that puts the state
back before the reversal — takes the `file` tier's projection before it and again after it, and where a version
standing at `Tier::File` moved it SAVES the restored image with the store's one writer.** **SO THE BYTES AT
`filePath` ARE THE LAST SUCCESSFUL SAVE'S, whose producers are a `file`-tier `write`'s commit AND a restore that moved
a file-tier node** — and **`and no other state` stands whole: the boot reads the register image at the file tier and
nothing else** (`native/contract.md §6.6` item `5`'s clause of 2026-10-27, the declaration's one home; `DD-28`'s
amended cell). **WHAT DOES NOT MOVE, SAID SO THE READING IS NOT TAKEN WIDER THAN IT IS:** **a `delete` still performs
no file I/O and a SUCCESSFUL `rollback` still performs none either**, so the paragraph above holds for both — the
removed version still stands again after the re-boot; **the save is the REFUSED arm's alone, it appends no journal
entry (a save is an effect and not an op), and a save that cannot land is reported (`FileCommitFailed`, the
in-memory state restored and the bytes not updated) rather than swallowed.**

**⟶ AND A `file`-TIER `DELETE` NOW SAVES ITS OWN OP, 2026-10-29 — THE SECTION HEADING ABOVE IS READ THROUGH THIS
CLAUSE AND SO IS EVERY SENTENCE OF IT THAT NAMES A `delete`.** `RCA-8(g)` ANNOTATE-BESIDE: **THE READING ABOVE WAS TAKEN ON A TREE WHERE A `delete` MINTED NO
`CommitRecord`, so nothing ever named its journal op to the save — and a
consumer was told to expect a durable deletion back after a restart.** **WHAT MOVED:** the delete now mints the
same four-member record a write's `K-2` mints, the entry adopts it, and **the terminal arm saves the DELETE's own
op on its passing arm** — the same `commit_file` a `file`-tier write's save is. **MEASURED, ON THIS TREE:**
`store.write(['a'], 'file', 1)` then `store.delete(['a'], 'file')` leaves the bytes at `filePath` reading `{}`
where they read `{"a":1}`, and a fresh `storeCreate` over that path answers `AddressNotFound` where it answered
`1`. **WHAT STILL READS AS THE SECTION SAYS, SAID SO THE CORRECTION IS NOT TAKEN WIDER THAN IT IS:** **the `delete`
VERB still commits nothing of its own** (`DD-28`; the save is the ARM's), **a `rollback` still performs no file
I/O** (its control reading is unmoved), **a WHOLE-TARGET delete — no tier named — names an op standing at no
tier, so nothing is saved and the version still comes back after a re-boot**, and **a save that cannot land is
reported the write's way** (`FileCommitFailed`, the store's journal rollback first, the message second, the
commit's log carrying the one `outcome` entry at `KC-9`) rather than swallowed. **So the one-line advice above is
now: a `file`-tier deletion is durable; a whole-target deletion is not.**

### §9.4 When the save itself fails

**On a `file`-tier write's save that fails — the act itself failing, not a constraint — the store rolls the write
back in the journal AUTOMATICALLY, and the caller receives `FileCommitFailed` AFTER that rollback has run and
never the rolled-back state.** **The package compensates for nothing** (`surface.md §2.11` clause 5;
`write-and-read.md §6.4` item 8; `native/contract.md §8.1` rank #15).

**So `FileCommitFailed` is the one refusal to take seriously: surface it to the user rather than retrying blindly,
because the store's own recovery has already happened by the time you see it.**

---

## §10 · The value domain

**THE CROSSING IS A DEEP COPY IN BOTH DIRECTIONS.** When you write, the store copies your value into itself; when
you read, it copies out. **Neither side holds a reference to the other's data, at any verb, at any argument
position, at any return position** — so you may drop your reference immediately after a write, and a value you
read is yours to mutate (`docs/specs/storeroom-json-crossing/contract.md §4`'s copy discipline, and `§5`'s
copy-out form).

### §10.1 The admitted tree

**The admitted tree is the bare JSON tree and nothing else** — a **string** that is a sequence of Unicode scalar
values (no lone surrogate), a **finite** number (`-0` normalizes to `0`), a **boolean**, a **dense, genuine
`Array`** whose elements are admitted values, and a **plain object** whose own enumerable string-keyed members
carry admitted values (`json-crossing/contract.md §1`, its bullets).

**★ AND THE ONE MEMBER JSON CAN SPELL AND THIS STORE CANNOT: `null` IS NOT ADMITTED.** *"`null` is not admitted,
although JSON can spell it, because the store's own taxonomy makes `StoreValue::Null` an outside class"* — and
`undefined` is not admitted either (`json-crossing/contract.md §1`'s closing bullet of that list; `A140`, `A147`,
`A148`; `src/value.rs`'s admitted/outside taxonomy). **So a JSON payload carrying `null` anywhere in it refuses as
a WHOLE value — and there is no envelope, no marker and no `{"v":…}`/`{"e":…}` spelling that rescues it** (the
envelope is retired: `A148` Q1). **And a plain object from ANY realm is admitted** — a `vm` object, a
worker's object, a `structuredClone`d one (`json-crossing/contract.md §1`'s 2026-10-24 clause, item (1)(a); `§3`'s
`p` classification `plain`/`foreign`/`null`).

**A value is a PLAIN OBJECT when its own prototype is ONE LINK from the value and ends the chain, and that
prototype carries the standard `Object.prototype` member set** (`json-crossing/contract.md §1`'s 2026-10-24 clause, items
(1)(a)–(c)). **That is why `Object.create({ a: 1 })` is REFUSED:** its prototype's own prototype is an
`Object.prototype`, so the value's prototype is not terminal, and it is classified as **`a class instance or
another prototype-carrying non-plain object`** — the same row a class instance answers (`json-crossing/contract.md §2` row 14;
`§1` clause's item (1)(b)). **The two refusals are ONE row because they are one shape condition, not because the
package is being blunt.** A `Object.create(null)` tree, by contrast, is ADMITTED.

**An ARRAY is admitted by the same three conditions on its own chain — `value → Array.prototype →
Object.prototype → null` — and `Array.isArray` alone may not stand as the test** (`json-crossing/contract.md §1` clause of
2026-10-24, item (2)). **So a `vm` array, a worker's array and a `structuredClone`d array are admitted by the same
rule as this realm's own.**

### §10.2 What refuses, and with which status

**Every refusal on this route is `ValueRefusedAtBoundary`, decided by the package's own walk BEFORE ANY STORE
VERB IS CALLED, and it carries the failing target's spelling at its own value position**
(`json-crossing/contract.md §2`'s class table, whose rows all answer that one status; `§4`'s 2026-10-23 clause, item (4)).

**The classes, from `json-crossing/contract.md §2`'s rows — SEVENTEEN rows, and the contract's own 2026-10-24 clause
makes every one of its census sites read `seventeen`/`17` (read at their own bytes 2026-10-26; no cell of this guide
drove one):**

- **`null` and `undefined`** (rows 1–2) are refused as VALUES, always and everywhere — **and an object member
  whose value is `undefined` refuses the WHOLE value.** The member is not dropped and its key is not skipped,
  because any other answer would drop a member silently (`json-crossing/contract.md §1`'s admitted tree; `DD-8`).
- **a function** (row 3) · **a symbol** (row 4) · **a `bigint`** (row 6) · **a non-finite number** —
  `NaN`, `Infinity`, `-Infinity` (row 7).
- **a string carrying a LONE SURROGATE** (rows 9 and 10) — **at a value, and at an object member's KEY**, which
  is why a key you built from a truncated astral character refuses the value around it.
- **cyclic values** (row 11) — refused on the walk's own ancestor stack.
- **anything that is not a plain collection** (rows 12–14): a `Map`, a `Set`, a weak collection, a typed array, an
  `ArrayBuffer`, a `DataView`, a `Date`, a `RegExp`, a `Promise`, an `Error`, **a `Proxy`**, a class instance, an
  object wrapper around a primitive (`new String('a')`, `new Number(1)`).
- **a SPARSE ARRAY** (row 16) — **an array is dense if and only if every index in `0…length − 1` is an OWN
  property; an index whose only carrier is the prototype is a HOLE, and a prototype-carried index is never read**
  (`json-crossing/contract.md §2`'s 2026-10-24 clause, item (5)).
- **an object or array carrying an own ACCESSOR** (row 15) — **and note the consequence: a getter cannot occur on
  an admitted value, so the copy reads each member exactly once as a structural property rather than as a promise
  about your getter** (`json-crossing/contract.md §4`'s read-once clause).
- **an object or array carrying an own SYMBOL-keyed member** (row 5).
- **a class instance, and any other prototype-carrying non-plain object** (row 14) — `Object.create({a: 1})`
  included, for the reason §10.1 gives.
- **a class extending `Array`** (row 13).
- **★ an ARRAY CARRYING A NON-INDEX OWN MEMBER** (row 17) — **`const a = [1]; a.foo = 3` is REFUSED, not stored
  without its member.** **The predicate is exact: every string in `Object.keys(a)` must be a canonical index in
  `0…length − 1`**, so a named member on an array has no JSON spelling and the package will not drop it for you
  (`json-crossing/contract.md §2`'s 2026-10-24 clause, items (1)–(8); the arm is decided in the walk —
  `bindings/js/src/entry/carrier.mjs`, read 2026-10-26).

### §10.3 The two ceilings, and there is no knob for either

**The walk refuses a value whose nesting depth exceeds `126`, and it refuses one whose node count exceeds
`1,000,000`.** **BOTH FIGURES ARE THE OPERATIVE ADMISSION CEILING ON BOTH ROUTES, AND DEPTH `127` AND BEYOND IS
REFUSED AT THE PACKAGE'S WALK, BEFORE ANY STORE VERB, as the depth class `a value over the walk ceiling` with the
status `ValueRefusedAtBoundary`** (`json-crossing/contract.md §4`'s 2026-10-23 clause, item (2); `§8` row 7's type `integer,
0…126`).

**AND THE NODE FIGURE IS A VISIT COUNT, WHICH IS THE ONE THING ABOUT IT THAT SURPRISES PEOPLE:** the walk counts
its root as its first node, so **a value of `n` own nodes counts `n + 1`, the declared admitted own-node range is
`0…999,999`, and a value of `1,000,000` own nodes is REFUSED** (`json-crossing/contract.md §8` row 8; `§4`'s clause of
2026-10-24 on `F-RA-4`). **A shared sub-value is counted ONCE PER POSITION it occupies, not once in the caller's
graph: a dense root array of `1,000,000` elements is `1,000,000` own nodes and is REFUSED, while an acyclic diamond
carrying two distinct objects counts three visits and is ADMITTED.** **The ceiling's subject is the crossing's own
work — the visits the walk performs and the nodes the copy allocates — and a census of your graph would bound
neither.**

**THE PACKAGE SHIPS NO CONFIGURATION KNOB FOR EITHER BOUND** — *"the package ships no configuration knob for
either bound"* is `DD-10`'s own sentence (`js/contract.md` `DD-10`). **AND TWO OF THAT ROW'S OTHER TERMS ARE
SUPERSEDED, NAMED SO YOU DO NOT READ THEM OFF IT:** the depth figure it prints is `64`, re-derived to the operative
`126` by `json-crossing/contract.md §4`'s 2026-10-23 clause, **and the status it prints is `ValueNotAdmitted`, where
the package's walk now answers `ValueRefusedAtBoundary`** (§8.1's rank `17`). **The row's SUBJECT — one bound per
call, neither configurable — is what this guide relies on, and it is unmoved.**

### §10.4 The practical rule

**If you are storing something that came from a form, a JSON payload or an IPC message, you are already inside
the domain.** The failures come from storing *live* things — a class instance, a `Date` you meant to serialize, a
DOM node, a `Buffer`. **Serialize at the boundary, once, consciously** — **and if it cannot cross IPC, it cannot
be stored, which is one rule for both boundaries** (`strata/brief.md §5` item 2).

---

## §11 · The installed package, exactly

**These are the manifest's own facts, measured 2026-10-26 at `bindings/js/package.json` — not a summary of a
contract.**

| the field | its value |
|---|---|
| `name` / `version` | `provident-storeroom` / `0.5.0` |
| `type` | `module` — **the entry is ESM and there is no CJS arm** |
| `license` | `AGPL-3.0` |
| `engines` | `{ "node": ">=18.0.0" }` |
| `exports` | **ONE arm** — `"."` → `{ "types": "./index.d.ts", "import": "./index.mjs" }` |
| `optionalDependencies` | **five names, each pinned exactly to `0.5.0`** (§2.2) |
| `files` | **five rows**: `index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` |

**⟶ AND TWO OF THOSE ROWS ARE CORRECTED AT THIS DATE: `version` is `1.0.0` and each of the five
`optionalDependencies` is pinned to `1.0.0`** (`bindings/js/package.json`, read at its own bytes 2026-10-26;
`RCA-8(g)` ANNOTATE-BESIDE — the table above stands as the reading of its own date and is read THROUGH this
clause). **`name`, `type`, `license`, `engines`, `exports` and `files` are UNMOVED and were re-read at the same
bytes; the five `files` rows are still a fact of this tree and not a rule (the ★ paragraph below).**

**⟶ AND THE TWO FIGURES THAT CLAUSE CORRECTS MOVE AGAIN, 2026-10-27: `version` is `1.0.1` and each of the five
`optionalDependencies` is pinned to `1.0.1`** (`bindings/js/package.json`, read at its own bytes; §0's correction of
this date; `RCA-8(g)` ANNOTATE-BESIDE — the table and the correction above stand and are read THROUGH this clause).
**AND THE `files` ROW'S OWN FIGURE IS RE-READ AT ITS OWN SITE IN THE CLAUSE BELOW: it reads SIX rows, the sixth
being the consumer guide's landed copy, `README.guide.md`.**

**⟶ AND THE FIVE FIGURES THIS GUIDE PRINTS ABOUT THE SHIPPED TREE ARE RE-MEASURED AT IT ON ONE DATE, 2026-10-27, SO
THE GUIDE IS NOT LEFT ONE TREE BEHIND ANY OF THEM.** `RCA-8(g)` ANNOTATE-BESIDE: **every table row, every ★
paragraph and every figure above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause adds no rule and
moves no figure — it records, at one date, the reading of each figure the guide states about the shipped tree, and
each is the figure its own clause already prints.** **THE FIVE, EACH WITH ITS MEASUREMENT:**
1. **THE STATUS SET IS TWENTY** — `src/error.rs`'s `CODES` is `[&str; 20]`, ranks `1`…`20`, and the declaration of record (`index.d.ts`, `StoreStatus`) agrees with the crate at twenty (§8.1's heading, its table's `20` row and its dated clauses).
2. **THE PACKED MEMBER SET IS NINETEEN BARE AND TWENTY ASSEMBLED** — measured with `npm pack --json` at `bindings/js`: the BARE tarball carries `19` paths (`1` `package.json` + `4` root files — `README.guide.md` among them + `13` entry modules + `1` kernel: `1 + 4 + 13 + 1 = 19` ✓), and the ASSEMBLED tarball — the same stage with the release's `LICENSE` copy — carries `20`, the nineteen plus the licence (the ★ re-read clause (ii) below; the installed battery's `INSTALL-01` prints `members=20` on every run).
3. **THE ALLOWLIST IS SIX ROWS** — `bindings/js/package.json`'s `files` reads `index.mjs` · `README.md` · `README.guide.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` (`6 = 4 + 2` ✓) — **and `README.guide.md` is THIS document's landed copy** (§0's clause on the landing; the ★ re-read clause (i) below).
4. **THE INSTANCE CARRIES FOURTEEN OWN MEMBERS** — measured on an instance built in memory from the shipped artefact: `Object.keys` and `Object.getOwnPropertyNames` are both the same fourteen-name list, and `read`'s own descriptor reads `writable: true, enumerable: true, configurable: true` (§3's table; §3.1).
5. **THE DEPTH CEILING IS `126`** — the crossing's guard reads `depth > 126` (`bindings/js/src/crossing.rs`), so a value of depth `126` is admitted and one of depth `127` is refused; the node ceiling stands at `1,000,000` beside it (`json-crossing/contract.md §4`'s clause; §10.4).
**NO FIGURE MOVES BY THIS CLAUSE, AND THE ONE THING IT ADDS IS THE DATE ON WHICH ALL FIVE WERE READ AT THE SAME TREE.**

**⟶ AND THE SIX FIGURES THIS GUIDE STATES ABOUT THE SHIPPED TREE ARE RE-MEASURED AGAIN AT THE `1.5.0` PREPARATION, 2026-10-29 — EVERY ONE OF THEM UNMOVED, AND THE PACKED SET MEASURED RATHER THAN CARRIED.** `RCA-8(g)` ANNOTATE-BESIDE: **every row, every ★ paragraph and every dated clause above stands BYTE-FOR-BYTE and is read THROUGH this one; this clause adds no rule, moves no figure and re-reads all six at one tree.** **THE SIX, EACH WITH THE READING ITS OWN BYTES GIVE THIS DATE:** **(1) THE STATUS SET IS TWENTY** — `src/error.rs`'s `CODES` is `[&str; 20]`, ranks `1`…`20` (`§8.1`'s heading, its table's `20` row). **(2) THE KERNEL'S TOKEN SET IS NINE** — `bindings/js/src/entry/kernel-foundations.mjs`'s `KC` carries `KC-1`…`KC-9` and no tenth (§8.0a's `KC-9` clause). **(3) THE INSTANCE CARRIES FOURTEEN OWN MEMBERS** (§3.1's table; `index.d.ts`'s `StoreInstance`). **(4) THE DEPTH CEILING IS `126`** — `bindings/js/src/entry/carrier.mjs`'s `ENCODER_CEILING = 126` and `bindings/js/src/crossing.rs`'s `depth > 126` are ONE figure, with `127` and beyond refused at the walk and the node ceiling at `1,000,000` beside it (`§10.3`). **(5) THE ALLOWLIST IS SEVEN ROWS** — `index.mjs` · `README.md` · `README.guide.md` · `RELEASE-NOTES.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs`, `7 = 5 + 2` ✓ (the clause of 2026-10-28 above). **(6) THE PACKED MEMBER SET IS `20` BARE AND `21` ASSEMBLED** — measured with `npm pack --dry-run --json` at `bindings/js` this date: `1` `package.json` + `5` root files + `13` entry modules + `1` kernel `= 20` ✓, and the assembled artefact adds the release's `LICENSE` for `21` (the clause above). **AND THE VERSION IS `1.5.0` AT ELEVEN CELLS** (§0's clause of this date). **NO FIGURE MOVED BETWEEN THE `1.4.0` PREPARATION AND THIS ONE**, and the reason is named rather than left to inference: **the twenty-seven commits past `v1.4.0` add no member, no status, no token, no ceiling, no packed byte and no allowlist row** — they declare the reach, the two kinds, the derived address, the listener's independence, the delivery's nesting and the throw (`D-66` … `D-73`), and those are clauses of use rather than rows of this section. (`D-66`–`D-73`; §0's clause of this date; `scripts/publish.sh --figures`.)

**★ THE `exports` MAP HAS ONE ARM, AND THAT IS A PROMISE ABOUT WHAT IS REACHABLE:** **the addon is NOT reachable
as a subpath and neither is the constraint kernel.** **There is no wildcard export, no deep import to the addon
and no CJS arm** (`bindings/js/README.md`; `docs/specs/storeroom-publish/contract.md §1.3`;
`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md §1.3`, archived). **The addon is reached
INTERNALLY by the package's own `createRequire`-style step and is not an entry point: a consumer that spells the
addon's path directly is outside every clause of the contract** — the load succeeds or it does not, and nothing
about it is yours to configure.

**★ AND THE `files` ALLOWLIST IS A CONSEQUENCE OF REACHABILITY, NOT A DECLARED COUNT.** **The rule that binds is:
whatever the entry requires by path must ship in the tarball.** **The strict count is lifted and no hand-maintained
arity replaces it** (`strata/decisions.md` `D-3` and `D-4`; `D-4`'s own words: *"The strict count is lifted, the
delivery module and the e2e/blind scenario testing will determine the required publish shape"*). **THE FIVE ROWS
ABOVE ARE THEREFORE A FACT OF THIS TREE AND NOT A RULE:** the hub imports its parts from `src/entry/` and the
barrel, so those paths must ship; **when the entry requires nothing by path, nothing is owed — and neither you
nor a later release should read "five" as a contract.**

**What else no published tarball carries, each for a declared reason** (`publish/contract.md §2.1`; `P-PUB-7`'s surviving
prohibitions, which the lifted count did NOT touch):

- **no `.node` binary, at any key, on any target** — the binary travels in the platform packages;
- **no `build/Release` path**;
- **no `postinstall` build-on-install step.**

**AND THE LICENCE ROW IS A SEPARATE QUESTION, ANSWERED SEPARATELY:** **measured 2026-10-26, the five allowlist rows
carry no `LICENSE` row, and that is right — the licence TEXT travels at assembly time instead, into all six
artefacts, and a `files` row changes no byte of the tarball** (`publish/contract.md §2.3`; `PUB-DD-11`; and the fact that
makes the choice cheap). **Whether a row is ever added is EVIDENCE-CONDITIONAL and not rule-bound:** `delivery`
adds it **only if an e2e/install scenario shows a consumer or a scanner needs the row** (`strata/decisions.md`
`D-8`, reading (iii)). **So do not read the row's absence as a prohibition and do not read its future presence as
a change of licence.**

**⟶ AND FOUR FIGURES OF THIS SECTION ARE RE-READ AT THE SHIPPED TREE, 2026-10-26, EACH AT ITS OWN SITE, SO THE ALLOWLIST IS NOT LEFT AT A COUNT THE MANIFEST NO LONGER CARRIES.** `RCA-8(g)` ANNOTATE-BESIDE: **every table row, every ★ paragraph and every figure above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause re-reads four figures and moves no rule of theirs — the reachability rule, the licence reading's ground and the `engines` floor all stand whole.** **(i) THE `files` ROW READS SIX ROWS, NOT FIVE** — `bindings/js/package.json`'s `files` array, read at its own bytes: `index.mjs` · `README.md` · `README.guide.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` — **`6 = 4 + 2` ✓, the four root files plus the entry directory and the kernel** — and **the sixth row is the consumer guide's landed copy, `README.guide.md`, staged byte-for-byte from `docs/guides/package-use.md` by the release's assembly and imported by nothing** (`scripts/publish.sh`'s guide stage; `distribution.md §4.2` item 3's documented-text class). **THE TWO *"FIVE"* READINGS ABOVE — the table's own *"five rows"* and the ★ paragraph's *"THE FIVE ROWS ABOVE"* — are the reading of their own date and are read THROUGH this clause; and so is the licence paragraph's *"the five allowlist rows"*, whose subject is UNMOVED: NONE of the SIX rows is a `LICENSE` row, and none will be unless `D-8`'s evidence condition is met.** **THE RULE THE COUNT CARRIES IS UNMOVED EITHER WAY: whatever the entry requires by path must ship, and the count is a fact of this tree and not a contract.** **(ii) THE PACKED SET READS NINETEEN MEMBERS BARE AND TWENTY ASSEMBLED** — measured at the shipped packers: **the bare tarball carries `19` files** (`1` `package.json` + `4` root files + `13` entry modules + `1` kernel, `1 + 4 + 13 + 1 = 19` ✓, the guide standing among the four root files), **and the assembled artefact carries `20`, the nineteen plus `LICENSE`, which lands only in the assembled tree** — so a consumer comparing a bare `npm pack` tree with the release's artefact should expect exactly one member's difference and it is the licence. **(iii) AND THE GUIDE ITSELF NOW SHIPS:** **this document's canonical text reaches `node_modules/provident-storeroom/README.guide.md` in an installed package, beside `README.md`** — so a reader of the installed tree holds the document this file is, at that one path, and the landing adds no code, no export and no import. **(iv) THE STATUS SET IS TWENTY** — the figure `§8.1`'s heading and table print, and the one `§8.1`'s own dated clause and `§12.3`'s entry still spell `nineteen`: **each is read through the correction of this date at its own site, and the crate's own `CODES` is `[&str; 20]` at its bytes**, so the declaration of record and the crate agree at twenty.**

**⟶ AND THE CHANGE LIST NOW SHIPS AND THE ALLOWLIST NAMES SEVEN ROWS, 2026-10-28 — `DEF-AC` (a), MEASURED.** `RCA-8(g)` ANNOTATE-BESIDE: **every row and every dated clause above stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause re-reads three figures of this section and adds one document, and it moves no rule of theirs.** **(i) THE `files` ROW READS SEVEN ROWS, NOT SIX** — `bindings/js/package.json`'s `files` array, read at its own bytes: `index.mjs` · `README.md` · `README.guide.md` · `RELEASE-NOTES.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` — **`7 = 5 + 2` ✓, the five root files plus the entry directory and the kernel** — and **the seventh row is the CHANGE LIST's landed copy, `RELEASE-NOTES.md`, staged byte-for-byte from the repository root by the release's assembly and imported by nothing**, the same mechanism and the same declared non-code class as `README.guide.md`. **NONE OF THE SEVEN IS A `LICENSE` ROW**, and none will be unless `D-8`'s evidence condition is met. **(ii) THE PACKED SET READS TWENTY MEMBERS BARE AND TWENTY-ONE ASSEMBLED** — **the bare tarball carries `20` files** (`1` `package.json` + `5` root files + `13` entry modules + `1` kernel, `1 + 5 + 13 + 1 = 20` ✓, the guide and the change list standing among the five root files), **and the assembled artefact carries `21`, the twenty plus `LICENSE`** — so a consumer comparing a bare `npm pack` tree with the release's artefact still expects exactly one member's difference and it is still the licence. **(iii) AND THE CHANGE LIST IS ON DISK IN AN INSTALLED PACKAGE**: `node_modules/provident-storeroom/RELEASE-NOTES.md` is **the declaration of `1.2.0`'s one behaviour change** — *"a refused reversal now restores to the commit's opening mark, not the journal's head"* — and **that is the row's own subject: a consumer receives the behaviour change WITH a shipped declaration of it, not a root document it can only reach by reading the repository** (`scripts/publish.sh`'s notes stage; the preflight REFUSES a drifted landing and refuses an allowlist that does not name it). **THE RULE THE COUNT CARRIES IS UNMOVED EITHER WAY: whatever the entry requires by path must ship, and the count is a fact of this tree and not a contract.**

**AND THE `engines` FLOOR IS ONE DECLARATION WITH ONE READER — YOURS.** `>=18.0.0` is what the artefact loads on
and it is honest rather than provisional: the addon's highest-referenced Node-API class is the `napi_*` pair at
**Node-API version 6** (`Node 12.17.0` / `10.20.0`), read at `bindings/js/build.rs:35`–`:36`, and the ESM entry uses
only `node:` builtins — so **raising the floor would be a false restriction rather than a correction**
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/parameter-semantics.md §2.6`, `PAR-PUB-6`,
archived). **And the one other version number in that file is not a runtime floor at all:** `bindings/js/build.rs`
pins `24.11.0` as **the Windows import library's fixed, reproducible byte** — a build input for one platform's
linker, exporting the `napi_*` symbols and needing to equal no consumer's runtime (`build.rs:41`). **Every other
Node version number in this package's repository is addressed to its publisher or to that linker and not to you.**

---

## §12 · ★ Behaviours a client can BREAK — declared OUT OF SCOPE

**This chapter is the most valuable part of this guide, and it is not a list of bugs. It is the list of places
where the package's promises STOP — where a client who does something unusual gets a raw host error, a silent
wrong answer, or their own code back, and where the project has RULED that this is acceptable rather than
defended.**

**THE RULING BEHIND ALMOST ALL OF IT IS ONE SENTENCE, AND IT IS THE ARCHITECT'S** (`strata/decisions.md` `D-35`,
verbatim): *"The client will be able to break the JS code if they want to, the node_modules import is still in
client scope. Guard against parameter access and at the Rust boundary."* **So the package defends exactly two
things — what it reads off a value YOU supplied, and everything crossing into Rust — and nothing else about your
own realm is defended.** **Each entry below says what breaks, why it is out of scope with its ruling, and what to
do instead.**

### §12.1 Deleting or redefining `Array.prototype` members

**WHAT BREAKS:** the package reads arrays IT MINTED with the realm's own prototype methods, so **`delete
Array.prototype.slice` makes a LAWFUL `write` throw a RAW HOST `TypeError`** — **measured, and the measurement is
the ruling's: this guide did not re-take it** — and `Array.prototype.map`/`filter`/`includes` deletions do the same
at other sites. **The most exposed site is `written.triggered`**, the copy of the store's returned trigger set that
the commit path takes.
**WHY IT IS OUT OF SCOPE:** `D-36`, verbatim: *"Presume the client isn't going to vandalize Array.prototype"* —
the ~8 such sites are **not debts and are not fixed**, and the premise is the realm's: **the client will not
delete or redefine `Array.prototype`'s members.** **WHAT TO DO INSTEAD:** do not patch `Array.prototype` in a
process that holds a store. **The distinction the ruling draws is provenance — a value YOU supplied is read by
own-property forms and crossed as a null-prototype node; a value the package minted is read with the realm's
methods, which is ordinary JavaScript** (`D-36`; `bindings/js/src/entry/kernel-commit.mjs`, the `written.triggered`
copy).

### §12.2 Detaching or rebinding a store member

**⟶ CORRECTED 2026-10-26, AND THIS IS THE ONE ENTRY OF THIS CHAPTER WHOSE READING NO LONGER BINDS AT THE
DETACHMENT HALF: a detached call is now REFUSED. THE AS-FILED TEXT BELOW STANDS BYTE FOR BYTE AND IS READ
THROUGH THIS CLAUSE — `RCA-8(g)` ANNOTATE-BESIDE — so a client who quoted it is not left with a silent
reversal.**

**WHAT REPLACED IT, MEASURED ON THE FIXED TREE:** **every one of the fourteen members that CAN refuse a
detached call now refuses it in the ONE plain form** — `{status: 'AddressMalformed', message: "the receiver
position is not the store object this addon's storeCreate returned", log: []}` — **and moves no state**.
**The twelve that carry the receiver arm answer those exact bytes**: the seven store-reaching verbs (`read`,
`readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`), the four constraint members
(`addConstraint`, `removeConstraint`, `constraintOn`, `constraintOff`, which until this date ANSWERED — two
of them editing the store's pair registry — or threw the constraint methods' `TypeError`) and
`removeListener`. **`register` keeps its own domain refusal** (the handle-domain arm, `AddressMalformed`, its
own message) where the handle is not one the instance holds, **which is the arm the ruling keeps rather than
replaces**; a detached `register` whose handle the entry DOES hold still answers and still moves that entry,
because that member's re-install path hands the entry's own published receiver rather than the call's.
**`constraints()` still answers a detached read** — its arity is `0`, its own clause declares it *"THROWS
NOTHING"* (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)), and it performs no store call and changes
no node, so the state half of the promise holds at it and the refusal half has nothing to refuse.

**WHY IT IS NO LONGER OUT OF SCOPE:** the architect *"Run the fix by rejecting the detached functions."*
**The detached call is not defended because your realm is yours — it is refused because the ANSWER it was
giving was a state edit against a store the call had already lost: `constraints()` read what a detached
`addConstraint` had carried, and a bound write at that address evaluated a function nobody had lawfully
registered. A refusal is what the seven verbs had always answered; the four outliers were the defect.**

**WHAT BREAKS:** **`const { read } = store; read(['x'])` resolves NO receiver.** **Measured 2026-10-26:** the seven
store-reaching verbs (`read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`) answer the one
declared refusal — `{status: 'AddressMalformed', message: "the receiver position is not the store object this
addon's storeCreate returned", log: []}`; `register` and `removeListener` answer their own domain refusals in the
same form; **and three members do NOT refuse for the detachment at all** — detached `addConstraint` and
`removeConstraint` **ANSWERED and edited the real store's pair registry**, detached `constraints()` **answered it**,
and the detached toggles threw the constraint methods' `TypeError`. **A REBOUND member is worse: `store.read = fn`
succeeds — the `read` member's own descriptor reads `writable: true, enumerable: true, configurable: true` — the
call answers your own function, and the package raises nothing and prints nothing** (measured 2026-10-26:
descriptor, call and console all read).
**WHY IT IS OUT OF SCOPE:** `D-35` — a member is an own property of an object in your own realm, and the package
defends parameter access and the Rust boundary, not the mutability of its own product. **WHAT TO DO INSTEAD:**
**always call a member on the receiver — never destructure one, never pass one as a callback, and never assign to
one.** **And do not rely on the detachment being detected:** for three of the fourteen it is not detected at all,
and for two more the answer is the constraint methods' `TypeError` rather than the one form.
**⟶ AND THE REBOUND HALF IS UNMOVED AND IS STILL OUT OF SCOPE** (`D-35`, `D-36`): `store.read = fn` still succeeds,
still answers your own function, and the package still raises nothing — **rebinding is client scope and is not
detected, before this correction and after it.** **The detachment half is what moved: do not rely on a detached
call being DETECTED as a call at all — it is refused before it reads or edits anything, which is the answer that
keeps `constraints()` and the store's own home entry exactly as they stood.**

**⟶ AND WHAT IS TRUE AFTER THE DETACHED-CALL REJECTION, IN ONE QUOTABLE LINE — THE ENTRY'S OWN SUMMARY, ADDED
BECAUSE THE AS-FILED TEXT BESIDE IT STILL READS AS THE OLD WORLD** (`RCA-8(g)` ANNOTATE-BESIDE; nothing above is
withdrawn): **DETACHING IS REFUSED; REBINDING IS THE CLIENT'S OWN FUNCTION AND IS STILL UNDETECTED.** **Detaching —
`const { read } = store; read(['x'])` — answers `{status: 'AddressMalformed', message: "the receiver position is not
the store object this addon's storeCreate returned", log: []}` at every member that can refuse it, and moves no
state; `register` keeps its own domain refusal and `constraints()` answers, because it takes no argument, makes no
store call and changes no node.** **Rebinding — `store.read = fn` — succeeds, answers YOUR function, and is still
undetected: it is client scope by `D-35`, and it is the half of this entry that remains OUT OF SCOPE.**

### §12.3 Freezing or sealing a store

**WHAT BREAKS:** `Object.freeze(store)` **before** the store's first kernel act, then a lawful `write` or
`addConstraint`, throws a **raw host `TypeError`** — *"Cannot define property `Symbol(provident-storeroom.kernel)`,
object is not extensible"* — **with `status` absent, not one of the seventeen, and not the one form.** **It is
ORDER-DEPENDENT:** freeze *after* any kernel act and the same write succeeds. **WHY IT IS OUT OF SCOPE:** `D-35`
classifies it as client-scope breakage, not a defect — **the ruling declines the fix and accepts the form**:
*"a raw host `TypeError` where a lawful call used to answer is still worth a note, not a fix."* **WHAT TO DO
INSTEAD:** **do not freeze or seal a store.** If you need an immutable handle, wrap it — a plain object holding
the instance and closing over it, never the instance itself.

**⟶ AND THE SET SIZE THIS ENTRY PRINTS IS CORRECTED AT THIS DATE: it is NINETEEN, not seventeen** (§8.1; the algebra
`11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓; `RCA-8(g)` ANNOTATE-BESIDE — the sentence above stands and is read THROUGH
this one). **THE ENTRY'S OWN POINT IS UNMOVED AND IS SHARPER AT NINETEEN: a raw host `TypeError` carries NO `status`
member at all, so it is not any member of the closed set, whatever the set's size — and a consumer who reads a
caught value by its `status` will find none here (§8.3).**

**⟶ AND THAT CORRECTED SIZE IS ITSELF RE-READ: the set is TWENTY, not nineteen** (§8.1's heading and its table's `20` row; the algebra `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓; `RCA-8(g)` ANNOTATE-BESIDE — the correction above stands and is read THROUGH this one). **THE ENTRY'S OWN POINT IS UNMOVED AND SHARPER AT TWENTY: a raw host `TypeError` carries NO `status` member at all, so it is not any member of the closed set, WHATEVER THE SET'S SIZE — and a consumer who reads a caught value by its `status` will find none here (§8.3).**

### §12.4 Reaching the kernel record on the store

**WHAT BREAKS:** **the kernel's record is an own symbol-keyed property of the store and it is MUTABLE.**
`Object.getOwnPropertySymbols(store)` yields the slot, and the record carries `pairs`, `handles`, `live`, `closed`
and `store`. **`store[SYM].pairs.clear()` makes an ARMED constraint stop refusing — the value lands — while
`constraints()` still reports the pair.** **WHY IT IS OUT OF SCOPE:** `D-35` — it is your own realm and your own
object; the ruling stands `cdd2467` and declines the revert that would have re-privatised the record. **WHAT TO DO
INSTEAD:** **treat the symbol slot as private.** Do not enumerate a store's symbols, do not write to one, and do
not read a store's internals to reconstruct state — **`read(address)` and `constraints()` are the routes, and a
constraint's enforcement is not yours to toggle by hand.**

### §12.5 Prototype forgery on a registered symbol

**WHAT BREAKS:** **a getter at `Object.prototype[Symbol.for('provident-storeroom.kernel')]` supplies ONE record to
EVERY store in the process** — measured in the record at `D-35`: `a[SYM] === b[SYM]` with a shared `attempts`
counter of `2` after one write each. **The key is guessable because `Symbol.for` is a REGISTERED symbol, and the
store's own read of the slot walks the prototype chain.** **WHY IT IS OUT OF SCOPE:** `D-35`'s third vector of the
same client-scope class — **a getter you install on a prototype in your own realm is your own act, and own-property
discipline cannot help a READ.** **WHAT TO DO INSTEAD:** **do not install anything on `Object.prototype` or
`Array.prototype` in a process that holds a store** — and if a dependency does, that is the dependency's defect
reaching your store, not the store's.

### §12.6 Values you read back inherit your realm's prototypes

**WHAT BREAKS:** **the values the crate mints on the way out carry the realm's `Object.prototype`** (and
`Array.prototype` for arrays), so **a client's own prototype pollution APPEARS on what it reads back** — a
`store.read()` answer inherits any member you have added to `Object.prototype`. **WHY IT IS OUT OF SCOPE:** the
contract **does not pin the copy-out's prototype at all**: *"the contract pins the tree and not the allocation"*,
and **no cell may assert a prototype identity on the copy-out, in either direction**
(`docs/specs/storeroom-json-crossing/contract.md §5`'s 2026-10-24 clause, on `F-RA-15`; the same clause's ground is
`D-35`'s client-scope line). **WHAT TO DO INSTEAD:** **do not pollute `Object.prototype`** — and **do not assert
that a read-back's prototype is or is not a particular object.** **What IS declared is that the answer is a FRESH
tree sharing no mutable member with the store or with another crossing**, which is the guarantee worth relying on
(`json-crossing/contract.md §5`, item (3)(c)).

### §12.6b The two known fail-states, and how you leave them

**⟶ ADDED `1.1.0` — THIS IS THE ONE PART OF THE PROMISE A CONSUMER READING ONLY `node_modules` HAD NOWHERE TO FIND, AND IT SHIPS HERE BECAUSE THIS DOCUMENT SHIPS.**

**Two windows in the constraint machinery are known and are NOT defects. Each is a state you can leave.**

1. **A `delete`'s listener delivery** — **AND FROM 2026-10-29 THE DELETE ITSELF RUNS ONE, WHICH IS WHY THIS WINDOW IS DEFINED BY THE DELIVERY AND NOT BY THE VERB (§7.8: the delivery sits AFTER the pass, so a listener fired by a delete sees a JUDGED state).** A listener invoked by a delete's delivery runs **no constraint pass** — there is no attempt for a pass to run over. **A `rollback` issued from inside it is unjudged, and its effect stands.**
2. **A registration's own evaluation.** `addConstraint`'s and `constraintRegister`'s evaluation of a supplied body runs **no pass** for the same reason — **an action raised there is unjudged and its effect stands.**

**THE FIRST EXIT — RELOAD THE FILE.** Since `1.1.0`, **a restore that moved a version standing at the `file` tier SAVES the restored image**, so **the file records the state the store was restored to, and a fresh boot over that path returns to judged bytes.**

**THE SECOND EXIT — REGENERATE THE STORE.** Construct a new instance and replay your writes; **a judged state by construction.**

**Neither window is new and neither is a defect**: both are places **a pass does not begin**, not places a judgement was skipped mid-flight.

**⟶ AND ONE CLAUSE OF ITEM 1 ABOVE IS CORRECTED AT ITS OWN SITE, 2026-10-29 — `D-55` ITEM 3 AND `D-57`: A `delete` DOES MINT AN ATTEMPT NOW, AND THE WINDOW'S REAL REASON IS THE DELIVERY'S POSITION.** `RCA-8(g)` ANNOTATE-BESIDE: **item 1's operative claim — a listener invoked by a `delete`'s delivery runs no constraint pass, and a `rollback` raised there is unjudged and its effect stands — is UNMOVED; what is false of this tree is its given reason, *"there is no attempt for a pass to run over."*** **THE TREE AT `1.4.0`: a `delete` opens its own commit, its own attempt and its own pass, and its receipt carries the four-member `CommitRecord`** (`§7.8`'s clause; `D-57`'s second half; `D-55` item 3). **SO THE ATTEMPT EXISTS — IT HAS ALREADY CLOSED** — **and the window stays passless for the ruling's own reason: the delivery runs AFTER the pass, and after a pass nothing re-enters on that work** (`D-64`; `§7.8`'s four steps). **NOTHING ELSE OF ITEM 1, OF ITEM 2, OF THE EXITS OR OF THE WITNESS MOVES.** (`D-55` item 3; `D-57`; `D-64`; §7.8; §12.6's clause above.)

**⟶ AND THE ONE RAISE THIS SECTION'S LIST DOES NOT NAME IS JUDGED, 2026-10-29 — `D-42` · `D-54`, MEASURED, AND THE LIST STAYS TWO.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte of the two items, of the two exits and of the three clauses above stands BYTE-FOR-BYTE and is read THROUGH this clause; this clause adds no window and takes none away.** **THE QUESTION A CONSUMER ASKED, IN THEIR OWN WORDS:** *"host 6 — a raise from a constraint body DURING A DELETE'S CONSTRAINT PASS — does not judge, its effect stands, and it is not among the guide's declared windows."* **IT IS NOT JUDGED — IT IS JUDGED, AND THE LIST OF TWO IS COMPLETE.**

**1. WHAT WAS MEASURED, ON THIS TREE, BEFORE AND AFTER THE MECHANISM WAS FOLLOWED.** The drive is one pair standing at `['a']`: `write(['a'], 'mem', 5)`, `write(['a'], 'mem', 9)` (the reversal's target), then `delete(['a'], 'mem')` with the pair's body issuing `rollback(<the 9 write's op>)` the first time a pass asks it. **THE PAIR'S ASKS, IN ORDER: `[9, undefined, 5]`** — at its REGISTRATION (`9`), by the DELETE'S OWN PASS at the state the delete left (absence), and **by the RESTARTED CHECK AT THE STATE THE REVERSAL LEFT (`5`)**. The delete answers **`ConstraintPassRefused`** with **ONE `constraint-check` entry naming the pair** and `opId` the reversal's own echo, the store is restored by that refusal's compensating act, **and `5` — the state the reversal left — is nowhere in the store afterwards.** The raise is taken with the delete's own window open (`open 1`, `live 1`), the reversal still answers its declared record (`{opId, undoneOps, restoredTo}`), and **the pair is asked at `5` ONCE, never per step** (`D-38`).

**2. WHY THE RESTART REACHES THERE — THE SITE, NAMED, BECAUSE "IT JUST DOES" IS NOT AN ANSWER.** A `delete` runs **the same pass function a write's attempt runs**: its commit act opens the attempt (`kernel-commit.mjs`'s `commitRemoval`, no probe write landed), the entry runs the pass through `kernel-attempt.mjs`'s `runAttempt` **inside the `delete`'s own commit window**, and that scope **JOINS** the window rather than opening a second one — so **the request a body raises is stamped with the window the `delete` opened, and the drain at the pass's terminal is stamped with that same identity.** `constraints.mjs`'s `drainRestartRequests` therefore **consumes it, asks the pairs at the state the reversal left, and carries any refusal into the pass's report** (`D-54` (b) — the drain runs on **both** arms, the passing and the throwing one). **NOT ONE OF THE THREE CAUSES A MISSED JUDGEMENT WOULD NEED IS PRESENT**: the window identity matches, `reversalAtRest` answers "step" for a commit that is still open (`open 1`/`live 1` — which is why no per-step judgement is taken at the raise's own instant), and the delete's attempt does not close on a path that skips the drain. **THE EMPTY WITNESS AGREES RATHER THAN CONTRADICTING**: a delete whose pass raised and judged a request answers **`discarded: []`**, because the pass's drain consumed the request **before** the delivery ran (`§7.8`: the delivery sits after the pass) — **`[]` there is the reading of a JUDGED raise, and the same `[]` on a delivery's raise is the reading of an IGNORED one. The witness is not the judge; the ask is.**

**3. AND THE SEVEN HOSTS THIS MACHINERY HAS, EACH LABELLED ON THIS TREE — THE TABLE TO KEEP THE COUNT IN.** Each row is the same drive: a pair whose body reverses, and the one readable evidence is **the pair being asked again at the state the reversal left**.

| host | where the raise is taken | judged? |
|---|---|---|
| `H1` | a constraint body, during a **write's pass** | **JUDGED** — the pairs asked `[9, 7, 5]` |
| `H2` | a repair body, during a **write's pass** | **JUDGED** — `[9, 7, 5]` |
| `H3` | a listener body, in a **write's delivery** | **JUDGED** — `[9, 5]` |
| `H4` | a **registration's own evaluation** | **NOT JUDGED** — `[9]`; the DECLARED window (item 2 above) |
| `H5` | a **`delete`'s listener delivery** | **NOT JUDGED** — `[9]`, and `discarded` reports it; the DECLARED window (item 1 above) |
| `H6` | a constraint body, during a **`delete`'s own pass** | **JUDGED** — `[9, undefined, 5]` |
| `H7` | a **reentrant reversal-then-write** (a listener reverses, then writes) | **JUDGED** — `[9, 5]` |

**SO THE MEASURED SET IS FIVE JUDGED AND TWO NOT, AND THE TWO ARE EXACTLY THE TWO WINDOWS DECLARED IN THE LIST ABOVE.** **A raise taken inside a pass is judged by that pass's own terminal check whichever verb opened the pass; a raise taken where NO PASS RUNS AT ALL — a registration's evaluation, a `delete`'s listener delivery — is not, and its effect stands, with the two exits intact.** (`D-42`; `D-54`'s three hosts, its item (a) and (b); `D-55` item 3; `D-64`; `tests/e2e/discard-witness.mjs` section `W16`, cells `DW-16.1`–`DW-16.4`: `DW-16.1` — `H6` judged, the asks, the refusal and the store printed — is **RED under a `/tmp` revert that removes the `delete`'s pass**, and `DW-16.3` — the seven-row table — is RED with it.)

**⟶ AND THE SENTENCE THAT STOOD HERE IS WITHDRAWN AS FALSE, 2026-10-28 — `D-54`, MEASURED, AND IT IS WITHDRAWN RATHER THAN NARROWED. THE BYTES WERE: *"And every pass that DOES run drains its own restart request — so the fail-state is bounded by the two acts that run none."* THE CONSUMER MEASURED THREE HOSTS WHERE NEITHER HALF HOLDS — a repair body, a delete's pass, and a reentrant reversal-then-write — AND IN EACH ONE A PASS RAN, THE REVERSAL WAS LEFT UNJUDGED, AND ITS EFFECT STOOD (zero judge invocations; the refused `5` still there). What follows replaces them and is true of the code after that fix.**

**THE RULE NOW, IN ONE SENTENCE: NO PASS CONSUMES A RESTART REQUEST IT DID NOT RAISE, AND A REQUEST RAISED INSIDE A PASS IS CARRIED TO THAT PASS'S OWN TERMINAL STATE AND JUDGED THERE — ONCE, AS `D-38` DECLARES, AND NEVER PER STEP.** The budget, its three asks, the failing-closed arm and `D-42` are exactly as they were; what changed is where the request is carried.

- **A PASS THAT RUNS TO ITS PASSING ARM** drains the request its bodies raised after the pass and before its commit closes — unchanged, and the arm this section always described.
- **A PASS THAT ENDS BY THROWING** reaches the SAME judgement: a repair body that reversed and then broke the attempt's re-run, or a pair that refused after its delivery's act, is judged at the TERMINAL state the pass left, inside the same window, before you meet the pass's answer. **A pass's own refusal is superseded by the verdict of the check it invalidated — the state that pass left**; a constraint body's own throwable and a store's own refusal still cross as themselves, so no caller's value is re-shaped.
- **A NESTED PASS NO LONGER DROPS AN ENCLOSING WINDOW'S REQUEST.** The restart's consumer compares window identities; where they differ it ASKS NOTHING AND TAKES NOTHING. The request stands for the act that raised it (`D-42` item `3`), and the enclosing pass's own check is the one that judges it. **A request no pass ever matches still dies with its window**, and the two passless windows below have their own answers.
- **AND THE PACKAGE'S OWN COMPENSATING ROLLBACK IS NOT AN ACTION OF YOURS.** The kernel's terminal act composes the attempt's rollback through the `rollback` member; while it does, it carries a flag and neither raises a request nor is judged as a step — `D-42`: *"a restart is only ever raised by a consumer's own `rollback` member call."*

**SO THE FAIL-STATE OF PASS-HOSTED REVERSALS IS EMPTY, AND WHAT GUARANTEES IT IS ONE CONSUMER: the drain in the pass's own commit scope, reached on BOTH arms, matching the window that raised the request, and judging at the pass's terminal state.** The exits below are now owed to the two passless windows alone.

**YOUR `delete` QUESTION, ANSWERED HERE, AND IT IS A THIRD CASE AND NOT THE DECLARED ONE.** **⟶ AND ITS FIRST CLAUSE IS SUPERSEDED FROM 2026-10-29 — `D-55` ITEM `3` BUILT THE PASS THIS SENTENCE SAID DID NOT EXIST: a `delete` now runs a constraint pass of its own kind, at the delete's own journal op, with the delivery after it (§7.8 below); the sentence is kept so the ruling it recorded is legible.** `RCA-8(g)` ANNOTATE-BESIDE: **every other byte of this paragraph stands — the declared window is still the LISTENER DELIVERY, which still runs no pass, the `discarded` witness still reports what that delivery discarded and the reversal's effect still stands, and the third case the consumer measured (a `delete` performed INSIDE a pass) is still judged by that pass.** **WHAT MOVED IS ONLY THE PREMISE: `D-1-bis` (`a delete consults no constraint`) is superseded by `D-55` item `3` (`A delete is an editing verb and must pass constraints`) for the delete's OWN act; it remains the ground of the DELIVERY window, which runs after that act's pass has closed.** The original bytes read: A `delete` runs **no constraint pass of its own** (`D-1-bis`); the window declared above is its LISTENER DELIVERY, which runs no pass and is UNCHANGED — the `discarded` witness still reports the discard and the reversal's effect still stands. **Where a `delete` is performed INSIDE a pass — the case the consumer measured — the delete's window IS that pass's window**, and a reversal raised by the listener its delivery fires is a DIFFERENT ACT AT A DIFFERENT INSTANT from the declared window: **a THIRD case, and it is now judged** — the request lands in the pass's window and that pass's terminal check asks the pairs at the state the reversal left. **A registration's own evaluation remains the second passless window, silent and identity-only** (`D-49`), and both exits below still leave it honestly.

**⟶ ADDED 2026-10-28 — `D-49`: THE DISCARD IS NOW OBSERVABLE ON THE `delete`'S OWN ANSWER, AND THE OTHER
WINDOW STILL CARRIES NOTHING. READ THIS BEFORE YOU RELY ON EITHER FAIL-STATE.**

**THE USE CASE THAT MADE IT A DEFECT, IN YOUR TERMS.** Your `window.tabs` is one object; **a listener you
installed at `window.tabs` DOES fire when you delete `window.tabs.landingPage`** — the triggered set's rule is the
address prefix, and the invocation's one argument is the deleted address. That is exactly where you would check
your own invariant — *"exactly one tab is active"* — **and that check IS the kind of act the delete-delivery
window throws away**: if it fails and you raise a `rollback`, **the request dies with the window** (`DEF-AH`).

- **WHAT YOU CAN NOW SEE.** **A `delete`'s record carries `discarded` beside its four members** — a list, `0` or
  `1` long, of `{ opId, addresses }`: **`opId` is the id the reversal you raised named**, and **`addresses` are
  the addresses the discarded check would have been asked at**. **`record.discarded.length === 0` means this
  act's delivery discarded nothing.** **This is a WITNESS, not a repair** — the delete still answers everything
  it answered, **throws nothing**, mints no new status, and the reversal's effect **still stands**; the
  fail-state, the exits below and the behaviour of both windows are unchanged.
- **READ IT BY ITS NAME, AND EXPECT IT NOT TO BE ENUMERABLE.** `record.discarded` works; **`Object.keys(record)`
  still prints the four members you already know**, and **a spread or `Object.assign` copy of a receipt does not
  carry the witness** — read `discarded` off the record itself.
- **WHAT IT CANNOT SHOW, SAID PLAINLY.** **A registration's answer (`addConstraint`) is an opaque identity and
  carries NO witness** — an action raised inside that evaluation is still unobservable, and no member was
  invented for it. **And the machinery holds ONE pending request per instance**: a second in-flight action
  overwrites the first, so the witness reports the **last** request a delivery raised, and earlier ones were
  never recorded. **Neither limit is a defect; both are the declared shape.**

**THE EXITS ARE STILL YOURS AND ARE UNCHANGED: reload the file, or regenerate the store.** What changed is that
**the `delete` now tells you the discard happened** — *"a fail-state is honest only if the consumer learns it
happened"* (`D-49`).
**⟶ AND AN ENTRY IS NEVER SHIPPED WITH AN EMPTY ADDRESS LIST, 2026-10-28 — `D-55` ITEM 2 · `DEF-AH`, MEASURED.** `RCA-8(g)` ANNOTATE-BESIDE: **every bullet above stands BYTE-FOR-BYTE and is read THROUGH this clause; the member's name, its non-enumerability, its `{ opId, addresses }` shape and the two limits stay exactly as they were.** **THE RULING, THE ARCHITECT, VERBATIM: *"A witness address of `[]` corresponds to the register itself. This is not a legal response for any other watched address."*** **SO THE TWO EMPTY THINGS ARE NOT THE SAME THING, AND THE SHIPPED `1.3.0` CONFLATED THEM: an ADDRESS of `[]` is THE REGISTER (the root) and is lawful; an entry whose address LIST is `[]` is never lawful.** **WHAT `1.3.0` DID, MEASURED: a delivery whose reversal moved NOTHING — a nested write, then a reversal of an op the watched address never held — reported `addresses: []`**, a list with no address in it. **WHAT YOU GET NOW:** **`record.discarded` is `[]` where nothing moved** — *if nothing moved there is no discard to report, so the entry is ABSENT and not empty* — **and a reversal that moves the ROOT reports `addresses: [[]]`**: one element, whose segment list is empty. **THE TWO READINGS BESIDE EACH OTHER, so a consumer can tell them apart: `[]` is "nothing was discarded"; `[[]]` is "the register itself is what moved".** **NO OTHER MEMBER MOVES:** `opId` is still the id the reversal named, the list is still `0` or `1` long, and nothing is minted into the status set. (`tests/e2e/discard-witness.mjs`'s `DW-10.1`/`DW-10.2` measure both arms; the empty-list arm is RED under a revert of the one line.)

**⟶ AND YOUR `delete`'S OWN PASS IS STILL A MEASUREMENT AND NOT A BEHAVIOUR, 2026-10-28 — `D-55` ITEM 3 · `DEF-X`.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of this section and of §12.6 above stands BYTE-FOR-BYTE; this clause answers the question a consumer asked about `1.2.0` by measuring `1.3.0`.** **THE RULING, THE ARCHITECT, VERBATIM: *"A delete is an editing verb and must pass constraints. This includes all of the relevant commit and message logic."*** **SO IT MUST — AND NO SHAPE AT THIS VERSION ADMITS ONE, WHICH IS WHAT THE MEASUREMENT SAYS RATHER THAN WHAT AN INTENTION SAYS.** **A `delete`'s path, verb by verb:** the entry's `delete` opens a commit window of its own (`openCommits` is `1` inside its delivery), calls the addon's `delete` entry, builds the record `{address, tiers, triggered, op}`, delivers the triggering set, reads the witness and closes the window. **IT NEVER CALLS THE KERNEL**: no `K-2` opens an attempt, no `K-3` runs a pass, no message log is minted and no terminal entry is appended — so the pair standing at the deleted address is asked exactly as often as its registration asked it, and NOT ONCE FOR THE DELETE. **AND THE ONE PASS SHAPE THE ARTEFACT HAS CANNOT STAND IN**: `K-2` **LANDS A WRITE OF ITS OWN BEFORE `K-3` JUDGES**, so a pass driven at the deleted address judges a state the delete is not in (measured: the store after it holds the value `K-2` wrote). **WHAT WOULD HAVE TO BE BUILT, SAID PLAINLY AND NOT BUILT HERE:** **a delete would have to be GIVEN a commit and an attempt of its own** — a `K-2`-shaped opening that takes the delete's own op instead of a write's, a commit list minted for it, a pass over the pairs standing at the deleted address against the state the delete leaves, a terminal arm that appends that log's `outcome` entry, and the delivery moved AFTER the pass so its listeners see a judged state — **and the current `delete` verb has none of those.** **A delete performed INSIDE a pass IS judged**, and that is the third case §12.6 above declares — but that is the pass's check, not the delete's. (`tests/e2e/discard-witness.mjs`'s `DW-10.8` prints the path, the counts and the pass shape it drove.)

### §12.7 A skip is not a green, and your own throws are not refusals

**WHAT BREAKS:** **a `skipped` cell is a cell that DID NOT RUN** — *"a skip is not a green"*, in the authority
log's own words: *"`skipped 1` is a cell that did not run"* (`strata/decisions.md`, the examiner's findings) —
**and a client's own throw is not the package's form.** **A listener body that throws is NOT CAUGHT, NOT RETRIED
AND NOT REPORTED:** the package does not wrap your callback, and what escapes is your own throwable, not
`{status, message, log}` (`docs/specs/storeroom-js/surface.md §2.7` item 4). **WHY IT IS OUT OF SCOPE:** `D-35` —
**anything that enters the package from your side and leaves it is your shape, and the one thrown form is the
package's answer to its OWN refusals.** **WHAT TO DO INSTEAD:** **catch inside your listener if you want a
listener's failure to be yours**, and **never count a skipped test as a passed one** — and never treat a caught
value with no `status` as a store refusal (§8.3).

---

## §13 · What this guide does not cover

**Stated rather than left to be inferred, because a guide that hides its own edges is the next thing to fail
quietly.**

- **IT DOES NOT COVER ELECTRON, AND THE STORY IT DOES NOT TELL IS NOT ABSENT FROM THE REPOSITORY.** The Electron
  integration story — main-process-only execution, a data-only preload bridge, `asarUnpack` for `**/*.node`, code
  signing, a `filePath` under `app.getPath('userData')`, and the verification ladder *envelope* → *loaded in dev*
  → *loaded in the packaged app* → *installed from the registry* — lives in the archived
  `archive/pre-strata-docs-2026-10-24/docs/guides/electron-integration.md`. **It describes a superseded surface
  exactly as this guide's predecessor does, and §2.3's rungs and §11's manifest facts are what it predates.** **A
  consumer who has not measured their own Electron packaging has measured nothing about it** — `LIVE / INSTALL` is
  open in this project and the `APP` layer is `NONE` (`strata/brief.md §6`).
- **IT DOES NOT COVER THE RELEASED-BYTES LAYER.** Nothing here was driven against a published tarball, and the
  layer that would do it — an install-shaped battery — is declared and not the thing this file reports on.
  **`D-4`'s publish shape is evidence-derived, and the evidence is not this guide's.**
- **IT DOES NOT DESCRIBE AN APPLICATION.** It says nothing about how you should structure a store, what your
  schema should be, or whether any program works. It describes the package a consumer installs and what it
  answers.
- **IT DOES NOT SETTLE THE TIER-EVICTION QUESTION AS A SEMANTIC CLAIM.** §5.1 states the rule and what to rely on;
  whether declared semantics and shipped behaviour agree at every arm and every tier combination is a question
  for the clauses and not a consumer guide's.
- **IT DOES NOT REPORT THE `A112` ORDERING MEASUREMENT.** The law is that the surface runs the triggered
  constraints first and the other listeners only once every constraint has passed, and §9.2 states it as the law
  (`surface.md §2.11`). **Whether delivery now follows the pass is `OWED` a measurement on this branch and is not
  claimed here either way** (`strata/decisions.md` `D-1-bis`'s closing clause; `strata/brief.md §6`).
- **IT DOES NOT RE-DERIVE ANY FIGURE IT CITES.** Where a contract's own text and its later annotate-beside clauses
  print two readings, this guide cites the operative one and names the superseded one where a consumer would
  otherwise be misled — **and where it cites an archived file, it says so.**
- **AND IT STATES NO MEASUREMENT OF ITS OWN beyond the two of 2026-10-26 this file names.** **It is a consumer
  document, not a test report:** the declared documents are the instrument for questions of semantics, and a
  driven run is the instrument for questions of behaviour. **This guide tries to say which is which, and it is not
  the instrument that decides between them.**

**⟶ CORRECTED 2026-10-28 — THE BULLET ABOVE'S *"the two of 2026-10-26"* NO LONGER COUNTS THIS FILE, AND THE FIGURE IS MOVED RATHER THAN THE RULE.** `RCA-8(g)` ANNOTATE-BESIDE: **the bullet above stands BYTE-FOR-BYTE and is read THROUGH this clause.** **This file now names FOUR measurements of its own — the two of 2026-10-26 the bullet carries, §7.6's two-address `b1` drive and §7.7's 60/40-reversal restart-budget drive, both taken 2026-10-28 on this checkout through the published entry — and each is named where it stands rather than gathered here.** **WHAT DOES NOT MOVE IS THE BULLET'S RULE AND THE DOCUMENT'S OWN STANDING: this guide is a consumer document and not a test report; a figure it states is either declared and cited or measured and marked; and the declared documents and the driven batteries remain the instruments for questions of semantics and of behaviour respectively.** **A reader who wants the measurements re-run finds their drives named at their sites, and no figure of this file is offered as a green.**
