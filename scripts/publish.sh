#!/usr/bin/env bash
# ==============================================================================
#  scripts/publish.sh — THE RELEASE RUNBOOK FOR `provident-storeroom`
#  (the package `@auspicion/provident-storeroom-js`)
# ==============================================================================
#
#  WHY THIS FILE EXISTS, AND THE ONE RULE IT OBEYS
#  ---------------------------------------------------------------------------
#  `docs/specs/storeroom-publish/release.md §4.1` item 1 reads, verbatim:
#
#      "NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS."
#
#  and item 2 fixes a pass's ceiling at "THE CONTRACT, THE RED SET, THE GREEN,
#  THE ADVERSARIAL PASS, THE BLIND GREENS, THE DOC GATES, THE TRIO, AND THE
#  RECORD THAT ASKS FOR HIS ACT — AND THE RELEASE ACT ITSELF IS NOT IN THAT
#  LIST."
#
#  So this script is a RUNBOOK, NOT AN AUTOMATION. It exists so that the
#  architect's release act is CHECKABLE and REPEATABLE rather than remembered.
#  It refuses to do anything mutating unless it is told to, twice, by name.
#  The acts it performs are the architect's; the script only removes the
#  transcription risk from the mechanical parts.
#
#  `§4.2` enumerates EIGHT acts with their actors (7 release acts + 1
#  admission; one of the eight is a role's, performed ON his act's own
#  occurrence). Every step below is labelled with the act it serves, so a
#  reader can check this script against that table.
#
#  THE ORDER IS NOT MINE — IT IS `§2.5`'s (`release.md`), and it is BINDING:
#
#      (1) the carrier   — the sequence sentence names the new version
#      (2) the cells     — the ELEVEN version cells move TOGETHER
#      (3) the tag       — cut and pushed ONLY after (1) and (2)
#
#  "NO STEP BELOW MAY BE TAKEN BEFORE ITS PREDECESSOR." The reason is
#  `§2.5` item 4(i): the tag-coupling cell asserts tag version == main
#  manifest version, so a bump to a NEW version REDDENS EVERY TAG THE REPO
#  ALREADY CARRIES — including a tag left behind at the old version.
#
#  AND THE ONE THING THAT MAKES THIS A PATCH AND NOT A MAJOR: the semver
#  policy is this project's OWN `DD`-shaped row (`PUB-DD-9`), a reversible
#  default and not inherited semver law. PATCH was ruled for the
#  access-probe amendment: "a fix inside the declared surface."
#
# ==============================================================================
#  USAGE
# ==============================================================================
#
#    scripts/publish.sh                     # DRY RUN — measures, changes nothing
#    scripts/publish.sh --check             # the preflight + the guard only
#    scripts/publish.sh --figures           # THE SHIPPED DOCUMENTS' ONE GENERATED FIGURE, ASSERTED ALONE, read-only:
#                                           # generate the VERSION LINE from the manifest and REFUSE when any of
#                                           # the three shipped documents' marked line disagrees (DEF-AC (b);
#                                           # D-57; the same check the preflight runs)
#    scripts/publish.sh --cut-claims [FILE…] [--tree DIR] [--baseline FILE]
#                                           # THE CUT-CLAIM RATCHET (D-82), read-only, NOT section-scoped: print the
#                                           # nine phrase spellings with their conditions, the two acceptances (an
#                                           # archived pointer; a BASELINE site keyed by path + the line's own
#                                           # sha256), the stale policy and every hit, and FAIL on any line refused
#                                           # or any baseline entry whose site carries no hit. `--tree DIR` reads the
#                                           # four documents at their relative paths under DIR and keys them the same
#                                           # way; `--baseline FILE` reads the exemption set from FILE — the way a
#                                           # /tmp revert, a /tmp new claim and a /tmp STALE probe are driven
#    scripts/publish.sh --cut-baseline [FILE…] [--tree DIR]
#                                           # print the baseline block the catalogue's §4 carries, measured on this
#                                           # tree: the SHRINK operation, read-only, never a grant (D-82)
#    scripts/publish.sh --bump X.Y.Z        # writes the version and prose cells
#    scripts/publish.sh --tag   X.Y.Z       # commits, tags, pushes the tag
#    scripts/publish.sh --verify X.Y.Z      # post-publish checks, read-only
#    scripts/publish.sh --pack  [DEST]      # THE ASSEMBLY'S PACKING PATH — a MEASUREMENT: assemble the main
#                                           # package (licence copy + consumer guide + change list), pack it
#                                           # into DEST (default: a fresh temp dir), print the member set, then
#                                           # pack it AGAIN with no assembly; publishes, tags, pushes and
#                                           # installs nothing (release.md §4.1)
#
#  `--bump`, `--tag`, `--verify` and `--pack` each require `--yes` as well:
#
#    scripts/publish.sh --bump X.Y.Z --yes
#
# ==============================================================================

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

# The registry mirror this project keeps in-tree at `.cargo-home/` (gitignored, `.gitignore:177`) is
# where the `--offline` legs can resolve every dependency. Cargo otherwise reads `~/.cargo`, which
# carries no `napi`, and `--offline` then refuses a tree that is in fact fully resolved. Point
# `CARGO_HOME` at the mirror ONLY where that directory exists: on a CI runner or an ordinary
# developer's machine there is none, nothing here changes, and `--offline` keeps its present meaning.
if [ -d "$REPO/.cargo-home" ]; then
  export CARGO_HOME="$REPO/.cargo-home"
fi

# The eleven cells, by path. 1 (main `version`) + 5 (pins) + 5 (platforms) = 11.
MAIN_MANIFEST="bindings/js/package.json"
PLATFORM_DIR="bindings/js/platforms"
PIN_NAMES=(
  "@auspicion/provident-storeroom-js-linux-x64-gnu"
  "@auspicion/provident-storeroom-js-linux-arm64-gnu"
  "@auspicion/provident-storeroom-js-darwin-x64"
  "@auspicion/provident-storeroom-js-darwin-arm64"
  "@auspicion/provident-storeroom-js-win32-x64-msvc"
)
# The carrier's phrase. The suite's `declaredReleaseVersion` helper REGEXES
# this literal, so it must move in the same pass as the cells.
CARRIER="docs/specs/storeroom-publish-proposal.md"
CARRIER_PHRASE='the six manifests move to'

# **THE CONSUMER GUIDE'S ONE AUTHORED HOME AND ITS LANDED COPY — THE INVARIANT, STATED HERE BECAUSE IT IS THE
# WHOLE MECHANISM: `docs/guides/package-use.md` IS THE CANONICAL TEXT AND IS NEVER EDITED IN TWO PLACES.** The
# assembly copies it BYTE-FOR-BYTE to the main package's own root as `README.guide.md`, where the manifest's
# `files` row ships it — **THE SAME MECHANISM THAT LANDS `LICENSE`** (a file staged at the packaging root by the
# release's assembly), and NOT a `files` row pointing outside the package root: measured 2026-10-26, npm packs
# NOTHING for such a row and omits it SILENTLY, so `../docs/guides/package-use.md` in `files` would ship a
# README that pointed at a document the tarball does not carry. `README.guide.md` is a GENERATED landing: an
# edit belongs in the canonical file, and this script REFUSES when the two differ.
GUIDE_CANONICAL="docs/guides/package-use.md"
GUIDE_LANDED="bindings/js/README.guide.md"

# **⟶ AND THE CHANGE LIST LANDS BY THE SAME MECHANISM, 2026-10-28 — `DEF-AC` (a).** `RELEASE-NOTES.md` at the
# repository root is the ONE authored home; the release's assembly stages it BYTE-FOR-BYTE at the packaging root
# as `bindings/js/RELEASE-NOTES.md`, exactly as the guide is staged, and the main manifest's `files` row names the
# landed copy so the tarball carries it. **THE DEFECT IT CLOSES: `1.2.0`'s ONE behaviour change — a refused
# reversal's restore to the commit's opening mark — was declared in that root file and in no shipped document**,
# so a consumer installing the release received a behaviour change with no shipped declaration of it. **THE SAME
# TWO PROBLEMS THE GUIDE'S OWN LANDING SOLVED ARE SOLVED THE SAME WAY**: the landing is a TRACKED, GENERATED file
# (so a bare `npm pack` carries it with no assembly step having run) and the row names the LANDED copy, never the
# canonical path (npm packs NOTHING for a `files` row that points outside the package root, and omits it
# SILENTLY). This script REFUSES when the landed copy differs from the canonical text.
NOTES_CANONICAL="RELEASE-NOTES.md"
NOTES_LANDED="bindings/js/RELEASE-NOTES.md"

# **⟶ AND THE THIRD SHIPPED DOCUMENT CARRIES THE SAME FIGURE, 2026-10-28 — `DEF-AC`'s third part, and `D-57`'s one
# surviving figure.** `bindings/js/README.md` is the package's own front page: the main manifest's `files` row names
# it, npm packs it, and until this act it declared NO VERSION AT ALL — a shipped document a consumer reads first
# saying nothing about which release it describes. **IT IS A TRACKED, AUTHORED FILE AND NOT A GENERATED LANDING**
# (there is no canonical text elsewhere to stage from), so the ONE thing asserted at it is the ONE figure a shipped
# document can be right about: its marked version line, generated from the manifest like the guide's and the change
# list's. **THREE SHIPPED DOCUMENTS, THREE VERSION LINES, ONE GENERATOR, ONE ASSERTION.**
README_SHIPPED="bindings/js/README.md"

# THE THREE SUBJECTS OF THE ONE ASSERTION (`D-57`), as `path|marker token|the noun the sentence names`. The marker is
# the document's own, so a reader knows which document a line belongs to; **THE FIGURE INSIDE IT IS THE MANIFEST'S
# VERSION AND NOTHING ELSE.** The cut-state sentence is NOT here: **it was dropped from this script in the same act
# that dropped it from the documents** (`D-57`, verbatim: *"Drop the cut-state"*), because a document is sealed
# before the tag that would make its cut-state true, so the guard could only ever confirm what the previous release
# said — measured three times over (`1.2.0` shipped *"NOT CUT"*, `1.3.0` shipped *"`v1.3.0` DOES NOT EXIST"*).
VERSION_LINE_TARGETS=(
  "$README_SHIPPED|README|README"
  "$GUIDE_LANDED|GUIDE|GUIDE"
  "$NOTES_LANDED|NOTES|CHANGE LIST"
)

R='\033[0;31m'; G='\033[0;32m'; Y='\033[0;33m'; B='\033[0;34m'; N='\033[0m'
say()  { printf "${B}==>${N} %s\n" "$*"; }
ok()   { printf "${G} ok ${N} %s\n" "$*"; }
warn() { printf "${Y}  ! ${N} %s\n" "$*"; }
bad()  { printf "${R}FAIL${N} %s\n" "$*"; }
act()  { printf "\n${B}── ACT %s ──${N} %s ${Y}(actor: %s)${N}\n" "$1" "$2" "$3"; }

# THE ASSEMBLY'S GUIDE STAGE (`release.md §1.4` step 3's assembly half, applied to the document that is not
# code): stage the canonical text at the packaging root, byte-for-byte. **IDEMPOTENT BY CONSTRUCTION** — the
# landed copy is committed, so a clean release tree copies a file over itself and changes no byte; a DRIFTED
# tree is REFUSED by the preflight below rather than silently repaired there.
assemble_guide() {
  [ -f "$GUIDE_CANONICAL" ] || {
    bad "the canonical consumer guide '$GUIDE_CANONICAL' is absent — the guide has one authored home and this is it"
    return 1
  }
  cp -f "$GUIDE_CANONICAL" "$GUIDE_LANDED" || {
    bad "the consumer guide could not be staged to '$GUIDE_LANDED'"
    return 1
  }
  if cmp -s "$GUIDE_CANONICAL" "$GUIDE_LANDED"; then
    ok "the consumer guide staged BYTE-FOR-BYTE: $GUIDE_CANONICAL -> $GUIDE_LANDED ($(wc -c < "$GUIDE_LANDED" | tr -d ' ') bytes)"
  else
    bad "the staged consumer guide is not byte-for-byte its canonical text"
    return 1
  fi
}

# THE ASSEMBLY'S CHANGE-LIST STAGE — the guide's stage, one document over (`DEF-AC` (a)). Byte-for-byte from the
# one authored home at the repository root to the packaging root, IDEMPOTENT for a clean tree, and REFUSED when
# the two differ rather than silently repaired.
assemble_release_notes() {
  [ -f "$NOTES_CANONICAL" ] || {
    bad "the canonical change list '$NOTES_CANONICAL' is absent — it has one authored home and this is it"
    return 1
  }
  cp -f "$NOTES_CANONICAL" "$NOTES_LANDED" || {
    bad "the change list could not be staged to '$NOTES_LANDED'"
    return 1
  }
  if cmp -s "$NOTES_CANONICAL" "$NOTES_LANDED"; then
    ok "the change list staged BYTE-FOR-BYTE: $NOTES_CANONICAL -> $NOTES_LANDED ($(wc -c < "$NOTES_LANDED" | tr -d ' ') bytes)"
  else
    bad "the staged change list is not byte-for-byte its canonical text"
    return 1
  fi
}

# ==============================================================================
# THE SHIPPED DOCUMENTS' ONE GENERATED FIGURE, AND THE ASSERTION THAT IS THE DELIVERABLE — `DEF-AC` (b), `D-57`
# ==============================================================================
#
# **THE DOWNSTREAM'S DEMAND, AND WHY IT IS AN ASSERTION RATHER THAN A PARAGRAPH.** The shipped guide's VERSION LINE
# and its CUT-STATE SENTENCE were **hand-written**, and that is how the guide came to deny the release it travelled
# in: a figure copied by hand goes stale the moment the manifest moves and nothing reddened. **SO THIS SCRIPT
# GENERATES THE VERSION LINE FROM THE MANIFEST (`bindings/js/package.json`'s `version`) AND REFUSES WHEN ANY SHIPPED
# DOCUMENT'S MARKED LINE DISAGREES.**
#
# **⟶ AND THE CUT-STATE IS GONE FROM THIS SCRIPT, 2026-10-28 — `D-57`, the architect verbatim: *"Drop the
# cut-state."*** **A SHIPPED DOCUMENT IS SEALED BEFORE THE TAG THAT MAKES ITS CUT-STATE TRUE**, so every release
# packed before its tag ships a document denying itself, and a guard running in that release's preflight can only
# ever confirm *"not cut"* — **measured three times over: `1.2.0` shipped *"NOT CUT"*, `1.3.0` shipped *"`v1.3.0`
# DOES NOT EXIST"*, and the notes' head was stale within minutes.** **SO THE CUT-STATE GENERATION AND ITS ASSERTION
# ARE REMOVED ENTIRELY, AND THE VERSION LINE — THE ONLY FIGURE A TARBALL CAN BE RIGHT ABOUT — IS THE WHOLE OF WHAT
# IS ASSERTED.** **NO TAG LOOKUP REMAINS IN THIS CHECK, AND A TAG THAT MOVES CANNOT REDDEN IT.**
#
# **AND THE ONE ASSERTION NOW COVERS THREE SHIPPED DOCUMENTS, AND THE THIRD IS `DEF-AC`'s OWN REMAINING DEMAND**
# (*"guard the release notes too"*; *"README.md still declares no version at all"*). Each carries its marked version
# line on a line of its own, exactly one:
#
#     bindings/js/README.md          PUBLISH-README-VERSION-LINE: THE VERSION THIS README DESCRIBES IS `<version>`.
#     bindings/js/README.guide.md    PUBLISH-GUIDE-VERSION-LINE:  THE VERSION THIS GUIDE DESCRIBES IS `<version>`.
#     bindings/js/RELEASE-NOTES.md   PUBLISH-NOTES-VERSION-LINE:  THE VERSION THIS CHANGE LIST DESCRIBES IS `<version>`.
#
# **THE ASSERTION IS THE DELIVERABLE**: a hand-written line that contradicts the manifest fails the PREFLIGHT and
# cannot travel. `--figures` runs exactly this check, read-only, so it can be driven without the long legs.
manifest_version() {
  local v
  v="$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
  [ -n "$v" ] || { bad "the main manifest carries no readable \`version\`"; return 1; }
  printf '%s\n' "$v"
}

# THE ONE GENERATOR. `$1` is the marker's token (`README` · `GUIDE` · `NOTES`) and `$2` the noun the sentence names,
# so the three documents' lines are three spellings of ONE figure read from ONE place.
version_line_expected() {
  local v
  v="$(manifest_version)" || return 1
  printf 'PUBLISH-%s-VERSION-LINE: THE VERSION THIS %s DESCRIBES IS `%s`.\n' "$1" "$2" "$v"
}

# THE ONE ASSERTION, over the three documents `VERSION_LINE_TARGETS` names — each generated line beside the shipped
# one, and a refusal on absence, on a second marked line, or on any disagreement. **IT DOES NOT REPAIR ANYTHING**: a
# drifted line is reported at the file that carries it and the run stops.
preflight_version_lines() {
  local row path token noun generated shipped count failed
  [ -f "$MAIN_MANIFEST" ] || {
    bad "the main manifest '$MAIN_MANIFEST' is absent — there is no figure to generate"
    return 1
  }
  failed=0
  for row in "${VERSION_LINE_TARGETS[@]}"; do
    IFS='|' read -r path token noun <<< "$row"
    generated="$(version_line_expected "$token" "$noun")" || return 1
    if [ ! -f "$path" ]; then
      bad "the shipped document '$path' is absent — there is no text to assert its version line against"
      failed=1
      continue
    fi
    count="$(grep -c "^PUBLISH-$token-VERSION-LINE:" "$path" || true)"
    shipped="$(grep -m1 "^PUBLISH-$token-VERSION-LINE:" "$path" || true)"
    printf '  %s\n' "$path"
    printf '    generated  %s\n' "$generated"
    printf '    shipped    %s\n' "${shipped:-<absent>}"
    if [ "$count" != "1" ]; then
      bad "'$path' carries $count PUBLISH-$token-VERSION-LINE lines and exactly one is required — the figure is generated, never hand-written in two places"
      failed=1
      continue
    fi
    if [ "$shipped" != "$generated" ]; then
      bad "THE SHIPPED DOCUMENT'S VERSION LINE DISAGREES WITH THE MANIFEST — '$path' prints a version the manifest does not read, and a stale figure in a shipped document must fail this preflight rather than travel"
      failed=1
      continue
    fi
  done
  [ "$failed" -eq 0 ] || return 1
  ok "three shipped documents, three version lines, one generator: each reads the version generated from the manifest"
  return 0
}

# ==============================================================================
# ==============================================================================
# THE CUT-CLAIM RATCHET — `D-82`: the catalogue is the exemption set, and the set turns ONE WAY
# ==============================================================================
#
# **THE CLASS, AND THE THREE DESIGNS THAT FAILED TO MEASURE IT.** `D-79` widened this preflight to *"no version
# literal outside a dated section may differ from the manifest"*; `D-80` measured that rule UNSOUND — the one site
# it was built for (`RELEASE-NOTES.md:265`) sits INSIDE the dated span it exempts, and the rule reddens `355` lawful
# historical literals — and the marker-shaped and figure-shaped directions failed the same way. **`D-81` changes the
# SUBJECT: the class is not *"a version literal is wrong"*; it is *"a paragraph asserts a CUT-STATE in the present
# tense"*, and the tree's vocabulary for that is small and closed.**
#
# **SO THIS SCANNER IS NOT SECTION-SCOPED, AND THAT IS THE WHOLE OF THE RULING.** `RELEASE-NOTES.md:165` declares
# `§1.3.0`'s body to stand *"BYTE-FOR-BYTE as the reading of its own date"* — a section-scoped rule greens `:265`
# THROUGH that declaration, which is exactly how the marker rule came to ACCEPT Passage B. **Every line of every
# shipped document is scanned; a line is exempt ONLY when its own text is a move-out pointer naming the archive, or
# when the line itself is a CATALOGUED BASELINE SITE (`D-82`, below).**
#
# **AN ARCHIVED POINTER LINE IS THE FIRST ACCEPTANCE, AND IT IS DEFINED MECHANICALLY** (`cut_claim_pointer`, below):
# a line is accepted when it carries ALL THREE of — the tree's `⟶` annotate-beside marker, the token `MOVE-OUT`, and
# a path under this tree's move-out archive home `docs/guides/backup/`. **That is the shape `D-76` item 3 left in the
# guide and the shape `D-81` item 1 left in the change list**, and nothing else is accepted by it: **not a dated
# section, not a `⟶ … <date>` marker on its own, and not a quotation.** `D-80` measured why: **the marker marks
# AUTHORSHIP and not TENSE, so one marker can affirm a stale claim as easily as retire one.**
#
# **AND `D-82` TURNS THE CATALOGUE INTO THE EXEMPTION SET, BECAUSE `D-81`'s PREMISE WAS FALSE.** `D-81` states that
# after the two moved-out passages leave, the three documents hold no other such phrase. **MEASURED: `56` refused
# lines across `31` distinct sites still carry one — `25` in the change list at EACH of its two homes and `6` in the
# landed guide — every one of them a dated reading this tree's law protects byte-for-byte.** So the guard becomes a
# RATCHET instead of a clean sweep: **the sites `docs/guides/backup/D81-2026-10-29-notes-move-out.md` §3.2 and §3.3
# enumerate are the BASELINE, a hit at one of them is ACCEPTED, a hit anywhere else is REFUSED, and the baseline may
# only ever SHRINK.**
#
# **THE BASELINE'S KEY IS THE LINE'S OWN TEXT DIGEST, AND NOT ITS LINE NUMBER — AND THE CHOICE IS PRINTED BECAUSE
# IT IS THE ONE THING THAT MAKES THE RATCHET SURVIVE AN EDIT ABOVE IT.** An entry is `<path> <sha256 of the line's
# own bytes> <the line number at measure> <the phrases it matched>`. **A line number is a POSITION and positions
# drift: one paragraph inserted above a catalogued site renames every entry below it, and a guard keyed on numbers
# would then either refuse lawful history or accept a stranger standing where a catalogued line used to be.** **A
# digest of the line's own text is a statement about the LINE: inserting, deleting or moving lines above it changes
# its number and not its content, so the key still names the same reading — and a line whose own bytes DO change is a
# line nobody catalogued, which is exactly the fact the ratchet must notice.** (The alternative `D-82` allows — an
# explicit marker added beside each catalogued line — was REJECTED here for a measured reason: it edits the `31`
# sites' own bytes, and this tree may not edit a protected historical reading to make a guard green.)
#
# **AND THE STALE ENTRY IS REFUSED, NOT WARNED ABOUT — THE POLICY IS CHOSEN HERE AND PRINTED WITH EVERY RUN.** **A
# baseline entry whose site no longer carries a hit is a STALE ENTRY: the claim it exempted has gone, so the
# exemption is now an unused hole in the guard.** *Warn loudly* was the alternative; **REFUSED** is chosen because a
# warning inside a preflight that still exits `0` is the shape `D-79` named — *"a green light wearing the word
# check"* — and because refusing is what makes the list SHRINKABLE: the pass that removes a claim must remove its
# entry in the SAME act, or the next run reddens. **THE RATCHET'S TWO HALVES ARE THEREFORE: a hit at a site the
# baseline does not list is REFUSED (so the list can never grow silently), and an entry whose site carries no hit is
# REFUSED (so the list can never rot open). THE LIST MAY ONLY SHRINK, AND ONLY A PASS THAT SAYS SO MAY SHRINK IT.**
#
# **AND THE FOUR BLIND SPELLINGS `D-82` NAMED NOW STAND IN THE SET — EACH WITH ITS OWN CONDITION, AND THE CONDITION
# IS THE POINT.** Three of the four are the same defect in a different coat as `IS CUT`/`IS NOT CUT`, and the fourth
# is a PAST-TENSE heading that is lawful exactly when its tag exists:
#
#     [6] PREPARED             — a hit ONLY when the line also carries a version `X.Y.Z` whose tag `vX.Y.Z` EXISTS.
#                                (An untagged version's preparation state is not a claim about a release, and it is
#                                the state a change list is entitled to describe; a PREPARED paragraph over a version
#                                the tag set already carries is `DEF-AC`'s fifth iteration.)
#     [7] UNRELEASED           — unconditional. A version the registry carries cannot be called unreleased.
#     [8] CUT AND PUBLISHED    — a hit ONLY when the tag the line names does NOT exist, or when it names no tag at
#                                all. A past-tense heading over an existing tag is a RECORD OF A RELEASE, which is
#                                the spelling this file's own `§1.4.0`/`§1.5.0` headings use and must keep using.
#     [9] DOES NOT EXIST       — unconditional (the spelling `1.3.0` shipped: *"`v1.3.0` DOES NOT EXIST"*).
#     [9] NO CONSUMER CAN INSTALL — unconditional, the same blind spelling's other half.
#
# **AND THE FIFTH PHRASE IS REDUNDANT, WHICH THE DEFINITION PRINTS RATHER THAN HIDES.** `NOTHING … IS CUT` is
# subsumed by `IS CUT` on every line that carries both; implemented literally as the bare substring `NOTHING` it
# also matches ordinary English (`"throws nothing"`, `"nothing was discarded"`) on `235` lines of the four scanned
# files, **so its verdict adds no cut-claim reading to the scan** — and a line whose ONLY match is that bare
# `NOTHING` is counted as IGNORED rather than refused, with the count printed. **It is not that the phrase is
# dropped: a line carrying `NOTHING` beside any operative phrase is refused on the operative phrase, and a line
# carrying `NOTHING … IS CUT` is refused on `IS CUT`.**
#
# **NO PASS MAY EDIT ONE OF THE CATALOGUED SITES' BYTES TO MAKE THIS SCAN GREEN**: an instrument made to report what
# it did not measure is the defect it exists to catch (`D-31`; `D-35`; `D-80`). **THE SHRINK IS A SEPARATE, NAMED
# ACT**: a pass that removes a claim removes its entry, and the next run prints the smaller baseline.
CUT_CLAIM_PHRASES=(
  'IS CUT'
  'IS NOT CUT'
  'NOTHING'
  'NO TAG NAMES IT'
  'SITES STAY AT'
)
# The four documents scanned — the three shipped, with the change list read at BOTH of its homes (the canonical text
# and its landed copy), because `D-79`'s contradiction was measured in the canonical file and a landing can drift.
CUT_CLAIM_TARGETS=(
  "$README_SHIPPED"
  "$GUIDE_LANDED"
  "$NOTES_LANDED"
  "$NOTES_CANONICAL"
)
CUT_CLAIM_PATHS=()
# The move-out archive home the acceptance rule names, and the one archive this act fills.
CUT_CLAIM_ARCHIVE_HOME="docs/guides/backup/"
# **THE CATALOGUE IS THE BASELINE** (`D-82`): §3.2 and §3.3 are the human site list, and §4 carries the same set in
# the form this script reads — `<path> <sha256> <line at measure> <phrases>`, between two marker lines. The default
# baseline file is the catalogue; `--baseline FILE` points the same scan at another copy, which is how a `/tmp`
# probe drives the ratchet's stale arm without a write to the tree.
CUT_CLAIM_CATALOGUE="docs/guides/backup/D81-2026-10-29-notes-move-out.md"
CUT_CLAIM_BASELINE=""
# **A read-only ROOT for the four documents, so a `/tmp` copy can be scanned at the SAME relative paths the baseline
# keys on** — the path a baseline entry names is the path this script reports, so a probe that copies the documents
# into `/tmp/tree/<same-relative-path>` is measured against the same exemption set and not against a stranger's.
CUT_CLAIM_TREE=""
CUT_CLAIM_BASELINE_BEGIN='# CUT-CLAIM-BASELINE-BEGIN'
CUT_CLAIM_BASELINE_END='# CUT-CLAIM-BASELINE-END'
declare -A CUT_CLAIM_TAG_CACHE=()
declare -A CUT_CLAIM_BASELINE_KEY=()
declare -A CUT_CLAIM_USED=()
declare -A CUT_CLAIM_SCANNED=()
CUT_CLAIM_BASELINE_ORDER=()

# THE FIRST ACCEPTANCE RULE, MECHANICAL AND PRINTED: all three facts on ONE line, or the line is not accepted by it.
cut_claim_pointer() {
  case "$1" in *"$CUT_CLAIM_ARCHIVE_HOME"*) ;; *) return 1 ;; esac
  case "$1" in *MOVE-OUT*) ;; *) return 1 ;; esac
  case "$1" in *'⟶'*) return 0 ;; esac
  return 1
}

# THE BASELINE'S KEY: a digest of the line's OWN BYTES. This is the choice, and `cut_claim_definition` prints the
# reason with every run: a digest is a fact about the line, a line number is a fact about the file's current layout.
cut_claim_digest() {
  printf '%s' "$1" | sha256sum | cut -d' ' -f1
}

# A tag's existence, asked ONCE per version (`D-21`: an ask that failed is not an answer — `rev-parse` exits non-zero
# for both "absent" and "unreadable", so the refusal it feeds is on the SAFE side: a version whose tag cannot be read
# is treated as TAGGED for `PREPARED` and as absent for `CUT AND PUBLISHED`, which refuses rather than accepts).
cut_claim_tag_exists() {
  local v="$1"
  if [ -z "${CUT_CLAIM_TAG_CACHE[$v]:-}" ]; then
    if git rev-parse -q --verify "refs/tags/v$v" >/dev/null 2>&1; then
      CUT_CLAIM_TAG_CACHE[$v]=yes
    else
      CUT_CLAIM_TAG_CACHE[$v]=no
    fi
  fi
  [ "${CUT_CLAIM_TAG_CACHE[$v]}" = yes ]
}

# THE DEFINITION, PRINTED WITH EVERY RUN so a reader can check the verdict against the rule it claims to apply.
cut_claim_definition() {
  printf '  phrase set (literal, case-insensitive substrings — the tree\x27s own vocabulary, D-81 + D-82):\n'
  printf '    [1] IS CUT\n'
  printf '    [2] IS NOT CUT\n'
  printf '    [3] NOTHING            (REDUNDANT with [1]; a line whose ONLY match is bare NOTHING is IGNORED, not refused)\n'
  printf '    [4] NO TAG NAMES IT\n'
  printf '    [5] SITES STAY AT\n'
  printf '  the four blind spellings (D-82), each with its condition printed:\n'
  printf '    [6] PREPARED             hit ONLY when the line names a version X.Y.Z whose tag vX.Y.Z EXISTS\n'
  printf '    [7] UNRELEASED           unconditional\n'
  printf '    [8] CUT AND PUBLISHED    hit ONLY when the tag it names does NOT exist, or when it names no tag at all\n'
  printf '    [9] DOES NOT EXIST       unconditional\n'
  printf '    [9] NO CONSUMER CAN INSTALL  unconditional\n'
  printf '  acceptance (a) — an archived pointer: a line carrying ALL THREE of `⟶` · `MOVE-OUT` · a path under `%s`\n' "$CUT_CLAIM_ARCHIVE_HOME"
  printf '    (a dated section is NOT an exemption; a `⟶ … <date>` marker on its own is NOT an exemption; a quotation is NOT one)\n'
  printf '  acceptance (b) — a BASELINE site: <path> + the sha256 of the line\x27s OWN BYTES, listed between\n'
  printf '    `%s` and `%s` in %s\n' "$CUT_CLAIM_BASELINE_BEGIN" "$CUT_CLAIM_BASELINE_END" "$(cut_claim_baseline_file)"
  printf '    WHY THE DIGEST AND NOT THE LINE NUMBER: line numbers drift, so a number-keyed set breaks the moment a paragraph\n'
  printf '    is inserted above a catalogued site — the digest is a fact about the line\x27s own text and is unmoved by any edit\n'
  printf '    above it, while an edit to the line itself is a line nobody catalogued.\n'
  printf '  everything else is REFUSED. A STALE ENTRY — a baseline entry whose site no longer carries a hit — is REFUSED\n'
  printf '    too: the policy is REFUSE (not warn), because a warning in a preflight that still exits 0 is the shape D-79\n'
  printf '    named, and because refusing is what makes the list shrinkable. THE LIST MAY ONLY SHRINK.\n'
}

# THE BASELINE FILE IN FORCE — `--baseline` when given, the catalogue otherwise.
cut_claim_baseline_file() {
  if [ -n "$CUT_CLAIM_BASELINE" ]; then printf '%s\n' "$CUT_CLAIM_BASELINE"; else printf '%s\n' "$CUT_CLAIM_CATALOGUE"; fi
}

# READ THE BASELINE. The marker lines must BOTH be present — an absent baseline is refused rather than read as "no
# sites", because an empty exemption set under a strict refusal is a tree with 56 reds, not a clean one.
cut_claim_load_baseline() {
  local file block bpath bdigest bline brest
  file="$(cut_claim_baseline_file)"
  CUT_CLAIM_BASELINE_KEY=(); CUT_CLAIM_BASELINE_ORDER=(); CUT_CLAIM_USED=(); CUT_CLAIM_SCANNED=()
  if [ ! -f "$file" ]; then
    bad "the cut-claim baseline '$file' is absent — the catalogue IS the exemption set (D-82), and an absent set is not an empty one"
    return 1
  fi
  if ! block="$(awk -v b="$CUT_CLAIM_BASELINE_BEGIN" -v e="$CUT_CLAIM_BASELINE_END" '
      $0 == b { inside = 1; seenb = 1; next }
      $0 == e { inside = 0; seene = 1; next }
      inside  { print }
      END     { if (!seenb || !seene) exit 3 }
    ' "$file")"; then
    bad "'$file' carries no complete baseline block — both '$CUT_CLAIM_BASELINE_BEGIN' and '$CUT_CLAIM_BASELINE_END' are required, and a baseline that cannot be read is not an empty one"
    return 1
  fi
  while IFS=' ' read -r bpath bdigest bline brest; do
    case "$bpath" in ''|'#'*) continue ;; esac
    [ -n "$bdigest" ] || continue
    CUT_CLAIM_BASELINE_KEY["$bpath|$bdigest"]="$bline"
    CUT_CLAIM_BASELINE_ORDER+=("$bpath|$bdigest")
  done <<< "$block"
  printf '  baseline in force: %s — %d entries keyed by path + the line\x27s own sha256\n' "$file" "${#CUT_CLAIM_BASELINE_ORDER[@]}"
  return 0
}

# THE LINE'S MATCHES, with every condition resolved. Sets `CC_MATCHES` (the phrase list this line matched, with the
# condition printed) and `CC_OPERATIVE` (1 when at least one match is a cut CLAIM, 0 when the only match is the
# redundant bare `NOTHING`).
cut_claim_line_matches() {
  local line="$1" low phrase phrase_low v vs out="" had_claim=0
  low="$(printf '%s' "$line" | tr '[:upper:]' '[:lower:]')"
  for phrase in "${CUT_CLAIM_PHRASES[@]}"; do
    phrase_low="$(printf '%s' "$phrase" | tr '[:upper:]' '[:lower:]')"
    case "$low" in
      *"$phrase_low"*)
        case "$phrase" in
          NOTHING) out="${out}${out:+ · }NOTHING" ;;
          *)       had_claim=1; out="${out}${out:+ · }$phrase" ;;
        esac ;;
    esac
  done
  # [6] PREPARED — only over a version the tag set already carries.
  case "$low" in
    *prepared*)
      for v in $(printf '%s' "$line" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -u || true); do
        if cut_claim_tag_exists "$v"; then
          had_claim=1
          out="${out}${out:+ · }PREPARED over tagged v$v"
        fi
      done ;;
  esac
  # [7] UNRELEASED — unconditional.
  case "$low" in *unreleased*) had_claim=1; out="${out}${out:+ · }UNRELEASED" ;; esac
  # [8] CUT AND PUBLISHED — a past-tense record, refused ONLY when the tag it names is absent (or unnamed).
  case "$low" in
    *"cut and published"*)
      vs="$(printf '%s' "$line" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -u || true)"
      if [ -z "$vs" ]; then
        had_claim=1
        out="${out}${out:+ · }CUT AND PUBLISHED (names no tag)"
      else
        for v in $vs; do
          if ! cut_claim_tag_exists "$v"; then
            had_claim=1
            out="${out}${out:+ · }CUT AND PUBLISHED over absent v$v"
          fi
        done
      fi ;;
  esac
  # [9] DOES NOT EXIST / NO CONSUMER CAN INSTALL — unconditional.
  case "$low" in *"does not exist"*) had_claim=1; out="${out}${out:+ · }DOES NOT EXIST" ;; esac
  case "$low" in *"no consumer can install"*) had_claim=1; out="${out}${out:+ · }NO CONSUMER CAN INSTALL" ;; esac
  CC_MATCHES="$out"
  CC_OPERATIVE="$had_claim"
}

# THE SCAN. `$@` = the files to read. Every hit is printed with its file, line and phrase list, and classified:
# ACCEPTED (archived pointer) · ACCEPTED (baseline) · IGNORED (bare NOTHING only) · REFUSED. Then every baseline entry
# whose file was scanned and whose site carried no hit is printed as a STALE ENTRY. Returns 1 if ANY line is refused
# or ANY entry is stale.
scan_cut_claims() {
  local path key line n digest failed file_count entry epath
  local accepted_archived=0 accepted_baseline=0 refused=0 ignored=0 stale=0
  failed=0; file_count=0
  cut_claim_definition
  cut_claim_load_baseline || return 1
  for path in "$@"; do
    if [ ! -f "$path" ]; then
      bad "the cut-claim scanner has no file at '$path' — an absent subject is not a clean one"
      failed=1
      continue
    fi
    file_count=$((file_count + 1))
    key="$path"
    if [ -n "$CUT_CLAIM_TREE" ]; then key="${path#"$CUT_CLAIM_TREE"/}"; fi
    CUT_CLAIM_SCANNED["$key"]=1
    printf '  %s\n' "$key"
    n=0
    while IFS= read -r line || [ -n "$line" ]; do
      n=$((n + 1))
      cut_claim_line_matches "$line"
      [ -n "$CC_MATCHES" ] || continue
      if cut_claim_pointer "$line"; then
        accepted_archived=$((accepted_archived + 1))
        printf '    %s:%d  ACCEPTED (archived pointer)  %s\n' "$key" "$n" "$CC_MATCHES"
        continue
      fi
      if [ "$CC_OPERATIVE" -eq 0 ]; then
        ignored=$((ignored + 1))
        printf '    %s:%d  IGNORED (bare NOTHING only)  %s\n' "$key" "$n" "$CC_MATCHES"
        continue
      fi
      digest="$(cut_claim_digest "$line")"
      if [ -n "${CUT_CLAIM_BASELINE_KEY["$key|$digest"]:-}" ]; then
        accepted_baseline=$((accepted_baseline + 1))
        CUT_CLAIM_USED["$key|$digest"]=1
        printf '    %s:%d  ACCEPTED (baseline, line %s at measure)  %s  [sha256 %s]\n' \
          "$key" "$n" "${CUT_CLAIM_BASELINE_KEY["$key|$digest"]}" "$CC_MATCHES" "$digest"
        continue
      fi
      refused=$((refused + 1))
      printf '    %s:%d  REFUSED  %s  [sha256 %s]\n' "$key" "$n" "$CC_MATCHES" "$digest"
      failed=1
    done < "$path"
  done
  if [ "$file_count" -eq 0 ]; then
    bad "the cut-claim scanner was given no readable file — nothing was measured"
    return 1
  fi
  for entry in "${CUT_CLAIM_BASELINE_ORDER[@]}"; do
    epath="${entry%%|*}"
    [ -n "${CUT_CLAIM_SCANNED["$epath"]:-}" ] || continue
    [ -n "${CUT_CLAIM_USED["$entry"]:-}" ] && continue
    stale=$((stale + 1))
    printf '    %s  STALE ENTRY (line %s at measure, sha256 %s) — no line of this file carries this digest any more\n' \
      "$epath" "${CUT_CLAIM_BASELINE_KEY["$entry"]}" "${entry##*|}"
    failed=1
  done
  printf '  counts: accepted(archived) %d · accepted(baseline) %d · refused %d · ignored %d · stale %d · baseline entries %d · files %d\n' \
    "$accepted_archived" "$accepted_baseline" "$refused" "$ignored" "$stale" "${#CUT_CLAIM_BASELINE_ORDER[@]}" "$file_count"
  if [ "$refused" -ne 0 ]; then
    bad "A CUT-CLAIM PHRASE STANDS AT A SITE THE BASELINE DOES NOT LIST — a cut-state is the tag set's to answer and not a paragraph's to assert or deny, and D-82 makes a NEW site a refusal by construction"
  fi
  if [ "$stale" -ne 0 ]; then
    bad "THE BASELINE CARRIES A STALE ENTRY — the claim it exempted has gone, and an unused exemption is a hole in the guard; the pass that removed the claim must remove the entry in the same act (D-82: the list may only shrink)"
  fi
  [ "$failed" -eq 0 ] || return 1
  ok "the cut claims are exactly the baseline's: every hit is an archived pointer or a catalogued site, and every catalogued site still carries its hit ($file_count file(s) read)"
  return 0
}

# THE BASELINE'S OWN GENERATOR — read-only, and the block it prints is the SHRINK OPERATION and never a grant: a pass
# that removes a claim regenerates this block with that entry gone, and the guard's refusal of a NEW site is what
# stops the regeneration from being used to bless one.
emit_cut_claim_baseline() {
  local path key line n digest count=0
  printf '%s\n' "$CUT_CLAIM_BASELINE_BEGIN"
  for path in "$@"; do
    [ -f "$path" ] || { bad "no file at '$path'"; return 1; }
    key="$path"
    if [ -n "$CUT_CLAIM_TREE" ]; then key="${path#"$CUT_CLAIM_TREE"/}"; fi
    n=0
    while IFS= read -r line || [ -n "$line" ]; do
      n=$((n + 1))
      cut_claim_line_matches "$line"
      [ -n "$CC_MATCHES" ] || continue
      [ "$CC_OPERATIVE" -eq 1 ] || continue
      cut_claim_pointer "$line" && continue
      digest="$(cut_claim_digest "$line")"
      printf '%s %s %06d %s\n' "$key" "$digest" "$n" "$CC_MATCHES"
      count=$((count + 1))
    done < "$path"
  done
  printf '%s\n' "$CUT_CLAIM_BASELINE_END"
  printf '  %d site(s) measured\n' "$count" >&2
  return 0
}

# THE PREFLIGHT'S CALL — beside `preflight_version_lines`, at the same step, and NOT section-scoped.
preflight_cut_claims() {
  say "the shipped documents' cut claims (D-82's ratchet: four documents, nine phrase spellings, two acceptances, one STALE refusal)"
  scan_cut_claims "${CUT_CLAIM_TARGETS[@]}"
}

DRY=1; MODE="dry-run"; TARGET=""; DEST=""; CONFIRM=0
while [ $# -gt 0 ]; do
  case "$1" in
    --check)  MODE="check";  DRY=1 ;;
    --figures) MODE="figures"; DRY=1 ;;
    --cut-claims)
      # READ-ONLY, and it takes optional paths and two optional flags: with no path it scans the four documents;
      # with paths it scans exactly those; `--tree DIR` reads the four under DIR and keys them at their relative
      # paths (so a `/tmp` copy is measured against the same baseline); `--baseline FILE` reads the exemption set
      # from FILE. That is how a `/tmp` revert, a `/tmp` new claim and a `/tmp` STALE probe are driven without a
      # write to the tree.
      MODE="cut-claims"; DRY=1; shift
      while [ $# -gt 0 ]; do
        case "$1" in
          --baseline) CUT_CLAIM_BASELINE="${2:-}"; shift 2 ;;
          --tree)     CUT_CLAIM_TREE="${2:-}";     shift 2 ;;
          -*)         break ;;
          *)          CUT_CLAIM_PATHS+=("$1"); shift ;;
        esac
      done
      continue ;;
    --cut-baseline)
      # READ-ONLY, and it prints the block §4 of the catalogue carries — the SHRINK OPERATION, never a grant.
      MODE="cut-baseline"; DRY=1; shift
      while [ $# -gt 0 ]; do
        case "$1" in
          --tree) CUT_CLAIM_TREE="${2:-}"; shift 2 ;;
          -*)     break ;;
          *)      CUT_CLAIM_PATHS+=("$1"); shift ;;
        esac
      done
      continue ;;
    --bump)   MODE="bump";   DRY=0; TARGET="${2:-}"; shift ;;
    --tag)    MODE="tag";    DRY=0; TARGET="${2:-}"; shift ;;
    --verify) MODE="verify"; DRY=0; TARGET="${2:-}"; shift ;;
    --pack)   MODE="pack";   DRY=0; DEST="${2:-}"; shift ;;
    --yes)    CONFIRM=1 ;;
    -h|--help) sed -n '30,78p' "$0"; exit 0 ;;
    *) bad "unknown argument: $1"; exit 2 ;;
  esac
  shift
done

if [ "$DRY" -eq 0 ] && [ "$CONFIRM" -ne 1 ]; then
  bad "mode '--$MODE' mutates the tree and requires '--yes'."
  if [ "$MODE" = "pack" ]; then
    warn "Re-run as:  scripts/publish.sh --pack ${DEST:-<destination>} --yes"
  else
    warn "Re-run as:  scripts/publish.sh --$MODE ${TARGET:-X.Y.Z} --yes"
  fi
  warn "And read §4.1 first: NO PASS PUBLISHES. This act is the architect's."
  exit 2
fi

# ------------------------------------------------------------------------------
say "repository: $REPO"
say "mode: $MODE${TARGET:+  target: $TARGET}${DEST:+  destination: $DEST}"
[ "$DRY" -eq 1 ] && warn "DRY RUN — nothing below will be written."

# ==============================================================================
# `--figures` — THE SHIPPED DOCUMENTS' ONE GENERATED FIGURE, ASSERTED ALONE (`DEF-AC` (b); `D-57`)
# ==============================================================================
#
# Read-only, and it is the SAME check the preflight runs below: this mode exists so the assertion can be driven
# without the long suite legs, and so a reader can SEE the generated line beside the shipped one in EACH of the
# three documents. **IT WRITES NOTHING AND REFUSES ON A DISAGREEMENT**, which is the whole of what the row asked
# for. **THE CUT-STATE IS NOT AMONG THE SUBJECTS AND ITS GENERATION IS NOT IN THIS FILE AT ALL** (`D-57`).
if [ "$MODE" = "figures" ]; then
  echo
  say "THE SHIPPED DOCUMENTS' ONE GENERATED FIGURE — the version line, in each of the three"
  echo "  (generated from $MAIN_MANIFEST's version; asserted against README.md, README.guide.md and RELEASE-NOTES.md)"
  if preflight_version_lines; then
    echo
    ok "all three shipped documents' version lines AGREE with the manifest"
    exit 0
  fi
  echo
  bad "A SHIPPED DOCUMENT'S VERSION LINE DISAGREES — this is the refusal the preflight takes, and it is the deliverable"
  exit 1
fi

# ==============================================================================
# `--cut-claims` — THE CUT-CLAIM RATCHET, DRIVEN ALONE (`D-82`; the same check the preflight takes)
# ==============================================================================
#
# Read-only, and it is the SAME call the preflight makes below: this mode exists so the ratchet can be driven over
# the four shipped documents — or over paths named on its command line, or over a `/tmp` tree at their relative
# paths — without the long suite legs, and so a reader can SEE the phrase set, the two acceptances, the stale policy
# and every hit. **IT WRITES NOTHING, AND ITS RED IS THE DELIVERABLE**: a scanner that cannot redden is a green light
# wearing the word "check" (`D-79` item 4).
cut_claim_scan_list() {
  local p
  CUT_CLAIM_SCAN_LIST=()
  if [ "${#CUT_CLAIM_PATHS[@]}" -gt 0 ]; then
    CUT_CLAIM_SCAN_LIST=("${CUT_CLAIM_PATHS[@]}")
    return 0
  fi
  for p in "${CUT_CLAIM_TARGETS[@]}"; do
    if [ -n "$CUT_CLAIM_TREE" ]; then CUT_CLAIM_SCAN_LIST+=("$CUT_CLAIM_TREE/$p"); else CUT_CLAIM_SCAN_LIST+=("$p"); fi
  done
}
CUT_CLAIM_SCAN_LIST=()

if [ "$MODE" = "cut-claims" ]; then
  echo
  say "THE CUT-CLAIM RATCHET — D-82: the catalogue is the exemption set, and the set may only shrink"
  cut_claim_scan_list
  if scan_cut_claims "${CUT_CLAIM_SCAN_LIST[@]}"; then exit 0; fi
  echo
  bad "THE RATCHET REFUSES — a cut-claim phrase stands at a site the baseline does not list, or the baseline carries a stale entry, and this is the refusal the preflight takes"
  exit 1
fi

# ==============================================================================
# `--cut-baseline` — THE BASELINE BLOCK, MEASURED AND PRINTED (`D-82`)
# ==============================================================================
#
# Read-only. It prints the `<path> <sha256> <line at measure> <phrases>` block that `§4` of the catalogue carries, so
# the exemption set is a MEASUREMENT and never a hand-transcribed census — the shape this project has rotted on
# three times. **AND WHAT IT IS NOT: A GRANT.** It regenerates the block for the tree it is run on; the SHRINK is a
# pass removing an entry whose site it removed, and the ratchet's refusal of any site the block does not name is what
# stops a regeneration from blessing a new claim — a reader checks the block's entry count against this pass's
# arithmetic, and a count that GREW is a claim someone added.
if [ "$MODE" = "cut-baseline" ]; then
  echo
  say "THE BASELINE BLOCK, AS THIS TREE MEASURES IT (D-82) — the shrink operation, never a grant"
  cut_claim_scan_list
  emit_cut_claim_baseline "${CUT_CLAIM_SCAN_LIST[@]}" || exit 1
  exit 0
fi

# ==============================================================================
# THE ASSEMBLY'S PACKING PATH — A MEASUREMENT LEG, NOT THE RELEASE ACT
# ==============================================================================
#
# `release.md §4.1` is this script's law: **NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS.** This leg is
# the narrow estate that reading leaves open and it is NAMED SO IT CANNOT BE READ AS WIDER: **it assembles the
# MAIN PACKAGE's content and packs it into a directory the caller names** — the bytes the release's own assembly
# produces, so that a reader can SEE them — **and it publishes nothing, tags nothing, pushes nothing, installs
# nothing and touches no registry.** A locally packed tarball is the instrument `D-10`/`D-12` already name; this
# leg points that instrument at the ASSEMBLY rather than at an install.
#
# **WHY IT EXISTS AT ALL: THE GUIDE AND THE LICENCE ARE LANDED BY AN ASSEMBLY, AND AN ASSEMBLY THAT NOTHING
# DRIVES IS A CLAIM.** `LICENSE` is carried by the same mechanism and was, until this leg, visible only in CI's
# own steps; the guide's row makes the same demand one step earlier — a `files` row is only worth what the
# packed bytes show — so the packing path is a first-class reading here and not a note.
if [ "$MODE" = "pack" ]; then
  echo
  say "THE ASSEMBLY'S PACKING PATH — the main package, assembled and packed, into a directory it names"
  DEST="${DEST:-$(mktemp -d "${TMPDIR:-/tmp}/storeroom-assembly-XXXXXX")}"
  mkdir -p "$DEST"
  say "destination: $DEST"

  # THE ASSEMBLY'S OWN TWO PRECONDITIONS, opened the way the release's steps open them: the packaging root
  # carries NO `LICENSE` byte (the copy is transient and never a tracked byte — `PUB-DD-12`), and the two
  # sources are there to stage.
  echo
  [ ! -e bindings/js/LICENSE ] || {
    bad "bindings/js/LICENSE already exists — the licence copy is TRANSIENT at the packaging root and no LICENSE byte persists there (PUB-DD-12)"
    exit 1
  }
  [ -f LICENSE ] || { bad "the repository's LICENSE is absent"; exit 1; }
  [ -f "$GUIDE_CANONICAL" ] || { bad "the canonical consumer guide '$GUIDE_CANONICAL' is absent"; exit 1; }
  [ -f "$NOTES_CANONICAL" ] || { bad "the canonical change list '$NOTES_CANONICAL' is absent"; exit 1; }

  # `if: always()`-shaped: the licence copy never outlives this leg, whatever happens below.
  cleanup_pack() { rm -f bindings/js/LICENSE; }
  trap cleanup_pack EXIT

  say "assembly, stage 1 of 3: the licence copy — byte-for-byte, at the packaging root"
  cp LICENSE bindings/js/LICENSE
  cmp -s LICENSE bindings/js/LICENSE || { bad "the licence copy is not byte-for-byte the repository's LICENSE"; exit 1; }
  ok "licence staged"

  say "assembly, stage 2 of 3: the consumer guide — byte-for-byte, from its one authored home"
  assemble_guide || exit 1

  # **⟶ AND STAGE 3 IS THE CHANGE LIST — `DEF-AC` (a).** The guide's own stage, one document over: the release's
  # assembly copies the root `RELEASE-NOTES.md` to the packaging root byte-for-byte, and the manifest's `files` row
  # ships the landed copy. **THE PACKED SET BELOW MUST LIST IT IN BOTH PACKS**: the landed copy is TRACKED, so a
  # bare `npm pack` carries it too — which is the second thing the guide's landing solved and the reason a bare
  # pack still works.
  say "assembly, stage 3 of 3: the change list — byte-for-byte, from its one authored home"
  assemble_release_notes || exit 1

  # THE READBACK, PRINTED FROM THE ARCHIVE'S OWN REPORT, never re-spelled here.
  readback() {
    PACK_JSON="$1" LABEL="$2" node -e '
const fs = require("node:fs");
const raw = JSON.parse(fs.readFileSync(process.env.PACK_JSON, "utf8"));
const entry = (Array.isArray(raw) ? raw : Object.values(raw))[0];
const files = (entry.files || []).map((file) => file.path).sort();
const guide = (entry.files || []).find((file) => file.path === "README.guide.md");
const notes = (entry.files || []).find((file) => file.path === "RELEASE-NOTES.md");
const line = (label, value) => console.log("  " + label.padEnd(22) + " " + value);
line("reading", process.env.LABEL);
line("tarball", entry.filename);
line("members", files.length);
line("README.guide.md", guide ? "PRESENT, " + guide.size + " bytes, at the package root" : "ABSENT");
line("RELEASE-NOTES.md", notes ? "PRESENT, " + notes.size + " bytes, at the package root" : "ABSENT");
line("LICENSE", files.includes("LICENSE") ? "PRESENT (the assembly copy)" : "ABSENT (no assembly)");
line("member set", JSON.stringify(files));
'
  }

  echo
  say "packing, reading 1 of 2: THE ASSEMBLED CONTENT (what the release publishes)"
  PACK_JSON="$DEST/.npm-pack-assembled.json"
  if ! ( cd bindings/js && npm pack --json --pack-destination "$DEST" ) >"$PACK_JSON" 2>"$DEST/.npm-pack-assembled.err"; then
    bad "npm pack FAILED — $(tail -1 "$DEST/.npm-pack-assembled.err" 2>/dev/null)"
    exit 1
  fi
  readback "$PACK_JSON" "ASSEMBLED"

  # THE SAME PACKAGE WITH **NO ASSEMBLY** — the reading a consumer of this repository's own commands gets, so
  # the two are compared rather than assumed. The licence copy is removed first, exactly as the release's own
  # `if: always()` step removes it.
  rm -f bindings/js/LICENSE
  echo
  say "packing, reading 2 of 2: the SAME manifest with NO assembly (a bare \`npm pack\`)"
  BARE_JSON="$DEST/.npm-pack-bare.json"
  mkdir -p "$DEST/bare"
  if ! ( cd bindings/js && npm pack --json --pack-destination "$DEST/bare" ) >"$BARE_JSON" 2>"$DEST/.npm-pack-bare.err"; then
    bad "npm pack FAILED — $(tail -1 "$DEST/.npm-pack-bare.err" 2>/dev/null)"
    exit 1
  fi
  readback "$BARE_JSON" "BARE PACK"

  echo
  warn "NOTHING WAS PUBLISHED, TAGGED, PUSHED OR INSTALLED. The licence copy is removed on exit; the guide's and"
  warn "the change list's landed copies are TRACKED, generated files and this leg leaves them byte-for-byte the"
  warn "canonical text (the release preflight REFUSES a drifted landing rather than repairing it). The tarballs"
  warn "and the two reports stand in: $DEST"
  exit 0
fi

# ==============================================================================
# PREFLIGHT — every one of these is a refusal, not a warning.
# ==============================================================================
say "PREFLIGHT"
FAILED=0
refuse() { bad "$*"; FAILED=1; }

# **THE `PKGS` PREFLIGHT — REWRITTEN, NOT BYPASSED** (`command-sites-and-residue.md §4`). Its subject
# changed: the old form counted `[[package]]` rows and refused unless the count was `1`, which proved "no
# smuggled dependency" only while nothing in the tree had one — and the binding crate now adopts a registry
# library, so a count of `1` would refuse the very tree this unit builds. **THE REPLACEMENT PROVES THE SAME
# PROPERTY: each lock's package set EXACTLY MATCHES its manifests' declarations** — nothing in a lock that
# no manifest requires, nothing required that a lock omits. `cargo metadata --locked` is cargo's own
# exact-set check and catches a STALE lock (measured: a lock omitting a required package is refused by
# `--locked` and silently rewritten without it); its `packages` array is the resolved reachable set, read
# from the resolver's own JSON. **It passes the tree this unit built: `1 = 1` and `28 = 28`.**
preflight_pkgs() {
  fail=""
  # **⟶ RE-DERIVED 2026-10-25 (`D-34`, `D-5`, `★ C`): THERE IS ONE LOCK NOW, AND THIS LOOP READ TWO.**
  # It iterated `Cargo.toml bindings/js/Cargo.toml`, each with "its own" lock beside it; a workspace member
  # has no lock of its own, so the second iteration now refuses whether or not that file exists (absent:
  # *"has no lock"*; present and stale: *"omits … that the manifests require"* — measured, the old crate lock
  # carried `40` packages and the workspace resolver requires `41`). **`cargo metadata --locked` at the
  # workspace root resolves EVERY member**, so the one exact-set check below covers all three manifests —
  # the property is the same and its subject has moved, which is the whole of `★ C`.
  for m in Cargo.toml; do
    [ -f "$m" ] || continue
    l="$(dirname "$m")/Cargo.lock"
    [ -f "$l" ] || { fail="$fail $m has no lock;"; continue; }
    cargo metadata --format-version 1 --locked --manifest-path "$m" >/dev/null 2>&1 \
      || { fail="$fail $l DISAGREES with $m (--locked refuses it);"; continue; }
    have=$(cargo metadata --format-version 1 --locked --manifest-path "$m" 2>/dev/null \
      | python3 -c 'import json,sys; print("\n".join(sorted({p["name"] for p in json.load(sys.stdin)["packages"]})))' 2>/dev/null)
    [ -n "$have" ] || { fail="$fail $m could not be resolved;"; continue; }
    got=$(awk -F'"' '/^name *=/ { print $2 }' "$l" | sort -u)
    s1=$(comm -13 <(printf '%s\n' "$have") <(printf '%s\n' "$got"))
    s2=$(comm -23 <(printf '%s\n' "$have") <(printf '%s\n' "$got"))
    [ -n "$s1" ] && fail="$fail $l carries [$(printf '%s' "$s1" | tr '\n' ' ')] that no manifest requires;"
    [ -n "$s2" ] && fail="$fail $l omits [$(printf '%s' "$s2" | tr '\n' ' ')] that the manifests require;"
  done
  [ -z "$fail" ] && ok "each lock's package set exactly matches its manifests' declarations" \
                 || refuse "the lock/manifest sets DISAGREE:$fail"
}



# 1. Clean tree. A release cut from a dirty tree ships bytes nobody reviewed.
if [ -n "$(git status --porcelain)" ]; then
  refuse "the working tree is dirty — $(git status --porcelain | wc -l | tr -d ' ') path(s). Commit or stash first."
else
  ok "tree clean"
fi

# 2. On the default branch and level with its remote.
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
[ "$BRANCH" = "main" ] || refuse "on '$BRANCH', not 'main'"
if git rev-parse --verify -q "origin/$BRANCH" >/dev/null; then
  [ "$(git rev-parse HEAD)" = "$(git rev-parse "origin/$BRANCH")" ] \
    || refuse "HEAD differs from origin/$BRANCH — push or pull first"
else
  warn "no origin/$BRANCH ref locally (a fetch will happen at tag time)"
fi

# 3. VERSION HONESTY — the check that matters most, and it is not obvious.
#    If a manifest version is ALREADY TAGGED AND RELEASED, the code must still
#    BE that version. The moment the code moves past the tag while the manifest
#    keeps naming it, a build from this tree is stamped with a version the
#    registry already carries -- with DIFFERENT content. That is §2.1's
#    version-equals-tag rule broken from the other side, and it is silent:
#    nothing reddens, and the stamped value lies.
MANIFEST_V="$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
if git rev-parse -q --verify "refs/tags/v$MANIFEST_V" >/dev/null 2>&1; then
  TAG_SHA="$(git rev-parse "v$MANIFEST_V^{commit}")"
  AHEAD="$(git rev-list --count "$TAG_SHA..HEAD" 2>/dev/null || echo 0)"
  if [ "$AHEAD" -gt 0 ]; then
    if [ "$MODE" = "bump" ]; then
      warn "the manifest reads $MANIFEST_V, which is TAGGED AND RELEASED, but HEAD is $AHEAD commit(s) past that tag."
    else
      refuse "the manifest reads $MANIFEST_V, which is TAGGED AND RELEASED, but HEAD is $AHEAD commit(s) past that tag."
    fi
    warn "    A build from this tree would be stamped '$MANIFEST_V' with bytes the registry's '$MANIFEST_V' does not have."
    warn "    The tree claims a released version it is no longer. Resolve it by cutting the next release:"
    warn "        scripts/publish.sh --bump X.Y.Z --yes"
  else
    ok "the manifest's $MANIFEST_V matches its tag exactly, and the code has not moved since"
  fi
else
  if [ -n "$TARGET" ]; then
    ok "the manifest's $MANIFEST_V is untagged; '$TARGET' is the release being prepared"
  else
    warn "the manifest's $MANIFEST_V is not tagged — this tree stands between releases"
  fi
fi


# 4. THE THREE SHIPPED DOCUMENTS' ONE GENERATED FIGURE — `DEF-AC` (b), `D-57`, 2026-10-28.
#
#    **A HAND-WRITTEN LINE THAT CONTRADICTS THE MANIFEST MUST FAIL THIS PREFLIGHT, NOT TRAVEL.** The version line
#    is generated from `bindings/js/package.json`'s `version` (`preflight_version_lines`, above) and asserted
#    against EACH shipped document's own marked line — `bindings/js/README.md`, the landed guide
#    `bindings/js/README.guide.md` and the landed change list `bindings/js/RELEASE-NOTES.md`. **IT RUNS BEFORE THE
#    LONG SUITE ON PURPOSE**: a stale figure is a one-second refusal and the suite is the expensive step, so the
#    cheapest subject that can deny the release is checked first. **`--figures` runs exactly this.** **AND THE
#    CUT-STATE IS NOT ASSERTED HERE, OR ANYWHERE: a document is sealed before the tag that would make its
#    cut-state true, so that sentence was dropped by `D-57` and its generation with it.**
say "the shipped documents' generated figure (the version line, in each of the three)"
preflight_version_lines || FAILED=1

# 4b. THE CUT-CLAIM SCANNER — `D-81`, 2026-10-29.
#
#    **THE SUBJECT IS A CLAIM, NOT A LITERAL, AND THE SCAN IS NOT SECTION-SCOPED** (`scan_cut_claims`, above): the
#    three shipped documents — `bindings/js/README.md`, the landed guide and the change list at BOTH of its homes —
#    may contain NO cut-claim phrase outside a line whose own text is a move-out pointer naming
#    `docs/guides/backup/`. **IT RUNS BESIDE THE FIGURE CHECK AND BEFORE THE SUITE**, for the figure check's reason:
#    a paragraph asserting a cut-state is a one-second refusal and the suite is the expensive step.
preflight_cut_claims || FAILED=1

# 5. The suite. A release is cut from a green tree or it is not cut.
if [ "$MODE" != "tag" ]; then
  say "running the suite (this is the long step)"
  if cargo test --offline --no-fail-fast >/tmp/pub-test.log 2>&1; then
    TOT=$(grep -E '^test result' /tmp/pub-test.log | awk '{p+=$4; f+=$6} END{printf "%d pass / %d fail", p, f}')
    ok "cargo test --offline: $TOT"
    grep -qE 'FAILED|[1-9][0-9]* failed' /tmp/pub-test.log && refuse "the suite reports failures"
  else
    refuse "cargo test --offline FAILED — see /tmp/pub-test.log"
  fi
  if cargo build --offline --release >/dev/null 2>&1; then ok "cargo build --offline clean"
  else refuse "cargo build --offline FAILED"; fi

  # The declared dependency property, checked rather than assumed (`§4`; defined above, beside `refuse`).
  preflight_pkgs

  # The JS artefact + the node suite. The suite's site is the ROOT MANIFEST's own
  # `test` script — `node --test "tests/**/*.test.mjs"` — the one spelling of the
  # command this repository uses: the release leg asks the project rather than
  # keeping a second copy. (`bindings/js/test/*.test.mjs` was the pre-move home.)
  if cargo build --release --manifest-path bindings/js/Cargo.toml >/dev/null 2>&1; then
    # **⟶ REPOINTED 2026-10-25 (`D-34`, `D-5`): A WORKSPACE MEMBER'S TARGET DIRECTORY IS THE WORKSPACE
    # ROOT'S**, so the sibling crate's library now lands at `target/release/`, NOT at
    # `bindings/js/target/release/`. **AND THE `|| true` THAT STOOD HERE IS GONE, WITH ITS `2>/dev/null`:**
    # it was what made a stale SOURCE silent — the copy failed, the failure was swallowed, and the next line
    # printed `ok` over an artefact that had not been restaged, which is the same silent-loss shape the `D-5`
    # move was caught by. The step is a refusal now, like every other refusal in this preflight.
    if cp -f target/release/libstoreroom_js_binding.so \
             bindings/js/build/Release/storeroom_js_binding.node; then
      ok "JS artefact built and staged"
    else
      refuse "the JS artefact could not be staged: target/release/libstoreroom_js_binding.so is not on the tree"
    fi
  else refuse "the JS artefact build FAILED"; fi
  if npm test >/tmp/pub-node.log 2>&1; then
    ok "npm test (the manifest's own battery): $(grep -E '^. (pass|fail) ' /tmp/pub-node.log | tr -d '\n')"
  else refuse "the node suite FAILED — see /tmp/pub-node.log"; fi
fi

# 6. THE CONSUMER GUIDE'S AND THE CHANGE LIST'S LANDINGS — the assembly's own subjects, verified at the tree
#    the release packs.
#
#    **THE GUIDE REACHES THE TARBALL BY THE RELEASE'S ASSEMBLY STEP, AND THESE ARE THE THREE FACTS THAT MAKE
#    THAT TRUE:** the canonical text is where the guide has its ONE authored home; the landed copy at the
#    packaging root IS that text, byte-for-byte (a drift here is a SECOND PLACE the document was edited, which
#    the ruling forbids); and the manifest's `files` row NAMES the landed copy, so npm ships it. **EVERY ONE IS
#    A REFUSAL.** A missing row is not cosmetic: measured 2026-10-26, a `files` row naming an absent file is
#    omitted by npm SILENTLY, so the tarball would publish green with a README that points at a guide it does
#    not carry — the one hazard the ruling names. **THE STAGE ITSELF IS `assemble_guide`'s, above; this step
#    VERIFIES rather than repairs, so a drifted tree is caught here instead of being silently overwritten.**
#    **⟶ AND FROM 2026-10-28 THE CHANGE LIST IS THE SECOND SUBJECT OF THE SAME THREE FACTS — `DEF-AC` (a):** its
#    one authored home is the repository root, its landed copy is `bindings/js/RELEASE-NOTES.md` at those bytes,
#    and the manifest's `files` row names it. **THE ROW IS WHAT MAKES THE CHANGE LIST SHIP**, and its absence
#    would leave `1.2.0`'s one behaviour change declared in no document the tarball carries.
if [ ! -f "$GUIDE_CANONICAL" ]; then
  refuse "the canonical consumer guide '$GUIDE_CANONICAL' is absent — the guide's one authored home is missing"
elif [ ! -f "$GUIDE_LANDED" ]; then
  refuse "the landed consumer guide '$GUIDE_LANDED' is absent at the packaging root — the assembly's stage has no subject and the tarball would carry none"
elif ! cmp -s "$GUIDE_CANONICAL" "$GUIDE_LANDED"; then
  refuse "the landed consumer guide '$GUIDE_LANDED' has DRIFTED from '$GUIDE_CANONICAL' — the canonical text is never edited in two places; re-stage it with: scripts/publish.sh --pack --yes"
elif ! grep -q '"README.guide.md"' "$MAIN_MANIFEST"; then
  refuse "the main manifest's \`files\` allowlist does not name 'README.guide.md' — the landed copy would not ship, and npm omits a missing row SILENTLY"
elif [ ! -f "$NOTES_CANONICAL" ]; then
  refuse "the canonical change list '$NOTES_CANONICAL' is absent — it has one authored home and this is it"
elif [ ! -f "$NOTES_LANDED" ]; then
  refuse "the landed change list '$NOTES_LANDED' is absent at the packaging root — the tarball would carry no change list at all"
elif ! cmp -s "$NOTES_CANONICAL" "$NOTES_LANDED"; then
  refuse "the landed change list '$NOTES_LANDED' has DRIFTED from '$NOTES_CANONICAL' — the canonical text is never edited in two places; re-stage it with: scripts/publish.sh --pack --yes"
elif ! grep -q '"RELEASE-NOTES.md"' "$MAIN_MANIFEST"; then
  refuse "the main manifest's \`files\` allowlist does not name 'RELEASE-NOTES.md' — the change list would not ship, and npm omits a missing row SILENTLY (\`DEF-AC\`)"
else
  ok "the consumer guide and the change list are landed byte-for-byte at the packaging root and named by \`files\`"
fi

# 6. The target version, when one is named — READ ON WHICHEVER SIDE OF THE RELEASE ACT THIS RUN STANDS ON.
#
#    **THE SAME FACT, TWO TRUE READINGS, AND THE READING IS `$MODE`'s.** A version's tag has one lifetime: it
#    does NOT exist before the release and it DOES exist after it. `--bump`/`--tag` name a version ABOUT TO BE
#    CUT, so its tag must not exist — locally or on the origin. `--verify` reads a version ALREADY RELEASED,
#    so its tag MUST exist — on BOTH — and the manifest must still equal it, which is the honest spelling of
#    *"the code has not moved since"*. **ONE UNCONDITIONAL READING CANNOT BE TRUE OF BOTH:** the old form
#    refused *"the tag already exists"* for `--verify` — a check NO RELEASED VERSION CAN EVER PASS, so the
#    post-release mode was unsatisfiable by construction — and then printed
#    `ok v… is unclaimed locally and remotely` from a line that was not the `else` of anything.
#    **SO EVERY `ok` BELOW IS THE `else` OF THE SAME `if` AS ITS `refuse`** — one check, two outcomes, never
#    one check's refusal printed beside another check's claim.
if [ -n "$TARGET" ]; then
  [[ "$TARGET" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || refuse "'$TARGET' is not X.Y.Z"
  # The tag is looked up ONCE, locally and on the origin, and **AN ASK THAT FAILED IS NOT AN ANSWER** (`D-21`):
  # a `ls-remote` that could not reach the origin must refuse rather than read as "the tag is not there".
  LOCAL_HAS=0; REMOTE_OK=1; REMOTE_LS=""
  if git rev-parse -q --verify "refs/tags/v$TARGET" >/dev/null 2>&1; then LOCAL_HAS=1; fi
  if ! REMOTE_LS="$(git ls-remote --tags origin "refs/tags/v$TARGET" 2>/dev/null)"; then REMOTE_OK=0; fi
  if [ "$MODE" = "verify" ]; then
    # ---- `--verify`: a released version's tag MUST exist, on both sides, and the manifest must equal it ----
    if [ "$LOCAL_HAS" -eq 1 ]; then
      ok "tag v$TARGET exists locally — this run reads a version that WAS released, and a released version carries its tag"
    else
      refuse "tag v$TARGET does NOT exist locally — '--verify' is a POST-RELEASE reading: a version that was released MUST carry its tag here"
    fi
    if [ "$REMOTE_OK" -ne 1 ]; then
      refuse "the origin could not be asked about tag v$TARGET — 'no answer' is not 'absent'"
    elif printf '%s\n' "$REMOTE_LS" | grep -q "refs/tags/v$TARGET$"; then
      ok "tag v$TARGET exists on origin — the pushed tag is what fired the release workflow"
    else
      refuse "tag v$TARGET does NOT exist on origin — a version cannot have been released from a tag the origin has never seen"
    fi
    if [ "$MANIFEST_V" = "$TARGET" ]; then
      ok "the manifest reads $TARGET, the version this run verifies — the code has not moved since its release"
    else
      refuse "the manifest reads $MANIFEST_V, not '$TARGET' — '--verify' reads a RELEASED version, and a tree that no longer carries it cannot be verified as that release"
    fi
  else
    # ---- `--bump` / `--tag`: the version is ABOUT TO BE CUT, so the tag must NOT exist yet ----
    if [ "$LOCAL_HAS" -eq 1 ]; then
      refuse "tag v$TARGET already exists locally"
    elif [ "$REMOTE_OK" -ne 1 ]; then
      refuse "the origin could not be asked about tag v$TARGET — 'no answer' is not 'unclaimed'"
    elif printf '%s\n' "$REMOTE_LS" | grep -q "refs/tags/v$TARGET$"; then
      refuse "tag v$TARGET already exists on origin — a version is cut once"
    else
      ok "v$TARGET is unclaimed locally and remotely"
    fi
  fi
fi

[ "$FAILED" -eq 0 ] || { echo; bad "PREFLIGHT REFUSED. Nothing was changed."; exit 1; }
ok "preflight passed"

# ==============================================================================
# STATE — what the eleven cells read right now.
# ==============================================================================
echo
say "THE ELEVEN CELLS, AS THEY STAND"
CUR="$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
printf "  main version  %s\n" "$CUR"
for n in "${PIN_NAMES[@]}"; do
  printf "  pin           %-52s %s\n" "$n" \
    "$(grep -m1 "\"$n\"" "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
done
for d in "$PLATFORM_DIR"/*/; do
  printf "  platform      %-52s %s\n" "$(basename "$d")" \
    "$(grep -m1 '"version"' "$d/package.json" | sed 's/.*: *"\(.*\)".*/\1/')"
done
ok "eleven cells read above; they must ALL equal the released version"

echo
say "THE TAG SET (a bump reddens every tag left behind — §2.5 item 4(i))"
git tag --list | sed 's/^/  /'
[ -z "$(git tag --list)" ] && warn "no tags"

echo
say "THE CARRIER'S ANCHOR PHRASE (the suite regexes this literal)"
grep -n "$CARRIER_PHRASE" "$CARRIER" 2>/dev/null | tail -3 | cut -c1-170 | sed 's/^/  /' \
  || warn "phrase not found — the helper's anchor has moved; read §2.5 item 1"

if [ "$MODE" = "check" ] || [ "$MODE" = "dry-run" ] && [ -z "$TARGET" ]; then
  echo
  if git tag --list | grep -qv "v$CUR"; then
    warn "tag(s) above do not match the manifest version '$CUR' — the coupling cell will redden"
  fi
  say "DRY RUN COMPLETE. No byte was written."
  echo "  To cut a release:  scripts/publish.sh --bump X.Y.Z --yes"
  exit 0
fi

# ==============================================================================
# THE BUMP — §2.5's order, step by step.
# ==============================================================================
if [ "$MODE" = "bump" ]; then
  echo
  say "BUMPING $CUR -> $TARGET  (§2.5's order is binding)"

  # ---- carrier FIRST -------------------------------------------------------
  act "§2.5(1)" "the carrier: the proposal's sequence sentence names $TARGET" "the architect's, by this script"
  if [ "$DRY" -eq 0 ]; then
    # The phrase is "the six manifests move to **`X.Y.Z` TOGETHER". Only the
    # version inside it moves; the shape is the suite helper's anchor.
    perl -0pi -e "s/(\Q$CARRIER_PHRASE\E\s+\*\*\`)[0-9]+\.[0-9]+\.[0-9]+(\`)/\${1}$TARGET\${2}/g" "$CARRIER"
    ok "carrier moved — verify: grep -n '$CARRIER_PHRASE' '$CARRIER' | tail -1"
  fi

  # ---- the eleven cells TOGETHER -------------------------------------------
  act "§2.5(2)" "the eleven version cells move TOGETHER" "the architect's, by this script"
  printf "  1/11  main version\n"
  [ "$DRY" -eq 0 ] && perl -pi -e "s/(\"version\"\s*:\s*\")[^\"]+(\")/\${1}$TARGET\${2}/" "$MAIN_MANIFEST"
  i=1
  for n in "${PIN_NAMES[@]}"; do
    i=$((i+1)); printf "  %2d/11  pin %s\n" "$i" "$n"
    [ "$DRY" -eq 0 ] && PIN="$n" TARGET="$TARGET" perl -pi -e \
      'my ($p,$t)=@ENV{qw(PIN TARGET)}; s{("\Q$p\E"\s*:\s*")[^"]+(")}{$1.$t.$2}ge' "$MAIN_MANIFEST"
  done
  for d in "$PLATFORM_DIR"/*/; do
    i=$((i+1)); printf "  %2d/11  platform %s\n" "$i" "$(basename "$d")"
    [ "$DRY" -eq 0 ] && perl -pi -e "s/(\"version\"\s*:\s*\")[^\"]+(\")/\${1}$TARGET\${2}/" "$d/package.json"
  done

  echo
  say "POST-BUMP CHECK"
  BAD=0
  [ "$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')" = "$TARGET" ] || { bad "main version did not move"; BAD=1; }
  for n in "${PIN_NAMES[@]}"; do
    v="$(grep -m1 "\"$n\"" "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
    [ "$v" = "$TARGET" ] || { bad "pin $n reads $v"; BAD=1; }
  done
  for d in "$PLATFORM_DIR"/*/; do
    v="$(grep -m1 '"version"' "$d/package.json" | sed 's/.*: *"\(.*\)".*/\1/')"
    [ "$v" = "$TARGET" ] || { bad "$(basename "$d") reads $v"; BAD=1; }
  done
  # The single-occurrence rule: `build.rs` reads the RIGHTMOST `"version"`
  # occurrence, so a second one silently changes which value the artefact is
  # stamped with. This is an abort condition, not a style note.
  OCC=$(grep -o '"version"' "$MAIN_MANIFEST" | wc -l | tr -d ' ')
  if [ "$OCC" = "1" ]; then ok "the main manifest carries \"version\" exactly once (the carrier's own precondition)"
  else bad "the main manifest carries \"version\" $OCC times — the carrier reads the RIGHTMOST; a release build must not be cut"; BAD=1; fi
  [ "$BAD" -eq 0 ] || { echo; bad "the bump is inconsistent. Do NOT tag. Fix, re-run the suite, then re-check."; exit 1; }

  echo
  warn "STILL OWED BEFORE THE TAG — the prose cells §2.5 item 3 enumerates as a"
  warn "requirement list (the sequence sentence, the tag/version clauses, the"
  warn "ledger's figures, the acceptance and distribution clauses, the tag-"
  warn "coupling cell's own fixtures, and the stamp test's stale version)."
  warn "These are DOCUMENT edits and are NOT mechanical. Run the suite; it will"
  warn "name the ones that redden."
  echo
  ok "bump complete. Next: run the suite, fix the prose cells it names, then"
  ok "  scripts/publish.sh --tag $TARGET --yes"
  exit 0
fi

# ==============================================================================
# THE TAG — the last act before the workflow publishes.
# ==============================================================================
if [ "$MODE" = "tag" ]; then
  echo
  say "TAGGING v$TARGET"
  [ "$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')" = "$TARGET" ] \
    || { bad "the manifold reads a different version than '$TARGET'"; exit 1; }
  [ -z "$(git status --porcelain)" ] || { bad "the tree is dirty — §2.5(3): the tag follows the COMMIT"; exit 1; }

  # The tag-coupling cell asserts tag version == manifest version for EVERY
  # tag the repo carries. A tag left behind at the old version reddens it.
  OLD="$(git tag --list | grep -v "v$TARGET" || true)"
  if [ -n "$OLD" ]; then
    warn "existing tag(s) that will redden the coupling cell: $(echo $OLD | tr '\n' ' ')"
    warn "§2.5 item 4(i): the bump and the tag set move WITH each other."
    warn "Decide before tagging: delete it, or accept it red. This script will NOT delete a tag."
  fi

  act "§4.2(2)" "creating the tag" "the architect"
  echo "  git commit -am 'release v$TARGET'"
  echo "  git tag -a v$TARGET -m 'v$TARGET'"
  echo "  git push origin main && git push origin v$TARGET"
  echo
  warn "These three lines are PRINTED, NOT RUN. §4.1: no pass tags."
  warn "The tag's push is what fires .github/workflows/publish.yml, which"
  warn "publishes through the host's OIDC federation with no secrets.* — the"
  warn "five platform artefacts first, then the main package, IN THAT ORDER"
  warn "(§4.2 act 3; the order is the partial-publish arm's own precondition)."
  echo
  ok "Then: gh run watch"
  ok "Then: scripts/publish.sh --verify $TARGET --yes"
  exit 0
fi

# ==============================================================================
# VERIFY — read-only, after the release.
# ==============================================================================
if [ "$MODE" = "verify" ]; then
  echo
  say "POST-RELEASE VERIFICATION for $TARGET"
  echo "  1. the registry answers $TARGET for all six names:"
  echo "       npm view @auspicion/provident-storeroom-js@$TARGET version"
  for d in "$PLATFORM_DIR"/*/; do
    n="$(grep -m1 '"name"' "$d/package.json" | sed 's/.*: *"\(.*\)".*/\1/')"
    printf "       npm view %s@%s version\n" "$n" "$TARGET"
  done
  echo "  2. the provenance attestation is present on the main package (§4.2 act 4)"
  echo "  3. the superseded version is deprecated:  npm deprecate <name>@<old> \"Use $TARGET\""
  echo "  4. §4.2 act 5 — run the LIVE/INSTALL battery against the RELEASED"
  echo "     bytes, by the live-scenario role, ON the release act's occurrence."
  echo "  5. §4.2 act 6 — if k of six landed, decide the partial-publish arm (§3.1)."
  echo "  6. §4.2 act 7 — the licence line's final reading (distribution.md §4.1)."
  echo "  7. §4.2 act 8 — admit the DONE row and move the ledger."
  echo
  warn "TWO THINGS THIS SCRIPT CANNOT CHECK, AND THAT ARE OWED BY NAME:"
  warn "  · a fresh clone CANNOT run green until the artefact is built — the"
  warn "    .node is untracked and gitignored. A consumer must build it."
  warn "  · the released bytes' own digest is the REGISTRY's post-release"
  warn "    integrity field and is a RECORDED-GAP at this unit's gates"
  warn "    (contract.md §6, figure 13). Read it from the registry, not from here."
  exit 0
fi
