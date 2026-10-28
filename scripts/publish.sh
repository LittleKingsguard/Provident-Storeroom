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
#    scripts/publish.sh --figures           # THE GUIDE'S TWO GENERATED FIGURES, ASSERTED ALONE, read-only:
#                                           # generate the version line and the cut-state sentence from the
#                                           # manifest and the tag set, and REFUSE when the shipped guide's
#                                           # text disagrees (DEF-AC (b); the same check the preflight runs)
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
# THE GUIDE'S TWO GENERATED FIGURES, AND THE ASSERTION THAT IS THE DELIVERABLE — `DEF-AC` (b), 2026-10-28
# ==============================================================================
#
# **THE DOWNSTREAM'S DEMAND, AND WHY IT IS AN ASSERTION RATHER THAN A PARAGRAPH.** The shipped guide's VERSION
# LINE and its CUT-STATE SENTENCE were **hand-written**, and that is how the guide came to deny the release it
# travelled in: a figure copied by hand goes stale the moment the manifest or the tag set moves, and nothing
# reddened. **SO THIS SCRIPT GENERATES BOTH FROM THE MANIFEST (`bindings/js/package.json`'s `version`) AND THE TAG
# SET (`git tag --list`) AND REFUSES WHEN THE SHIPPED GUIDE'S TEXT DISAGREES.** The shipped guide is the LANDED
# copy (`bindings/js/README.guide.md`) — the bytes that ride the tarball — and its two figures stand on marked
# lines of their own, exactly one each:
#
#     PUBLISH-GUIDE-VERSION-LINE: THE VERSION THIS GUIDE DESCRIBES IS `<version>`.
#     PUBLISH-GUIDE-CUT-STATE: THE TAGS THIS TREE CARRIES ARE `<tag> · …`; `<vX.Y.Z>` EXISTS|DOES NOT EXIST, SO THE
#     RELEASE THIS GUIDE DESCRIBES IS CUT|NOT CUT.
#
# **THE ASSERTION IS THE DELIVERABLE**: a hand-written line that contradicts the manifest fails the PREFLIGHT and
# cannot travel. `--figures` runs exactly this check, read-only, so it can be driven without the long legs.
guide_figures_expected() {
  local v tags joined cut
  v="$(grep -m1 '"version"' "$MAIN_MANIFEST" | sed 's/.*: *"\(.*\)".*/\1/')"
  [ -n "$v" ] || { bad "the main manifest carries no readable \`version\`"; return 1; }
  tags="$(git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V || true)"
  joined="$(printf '%s\n' "$tags" | sed '/^$/d' | sed 's/.*/`&`/' | paste -sd '|' - | sed 's/|/ · /g')"
  [ -n "$joined" ] || joined="(none)"
  if git rev-parse -q --verify "refs/tags/v$v" >/dev/null 2>&1; then
    cut="\`v$v\` EXISTS, SO THE RELEASE THIS GUIDE DESCRIBES IS CUT."
  else
    cut="\`v$v\` DOES NOT EXIST, SO THE RELEASE THIS GUIDE DESCRIBES IS NOT CUT."
  fi
  printf 'PUBLISH-GUIDE-VERSION-LINE: THE VERSION THIS GUIDE DESCRIBES IS `%s`.\n' "$v"
  printf 'PUBLISH-GUIDE-CUT-STATE: THE TAGS THIS TREE CARRIES ARE %s; %s\n' "$joined" "$cut"
}

preflight_guide_figures() {
  local expected_version expected_cut shipped_version shipped_cut version_count cut_count
  [ -f "$GUIDE_LANDED" ] || {
    bad "the shipped guide '$GUIDE_LANDED' is absent — there is no text to assert the figures against"
    return 1
  }
  local generated
  generated="$(guide_figures_expected)" || return 1
  expected_version="$(printf '%s\n' "$generated" | grep '^PUBLISH-GUIDE-VERSION-LINE:')"
  expected_cut="$(printf '%s\n' "$generated" | grep '^PUBLISH-GUIDE-CUT-STATE:')"
  version_count="$(grep -c '^PUBLISH-GUIDE-VERSION-LINE:' "$GUIDE_LANDED" || true)"
  cut_count="$(grep -c '^PUBLISH-GUIDE-CUT-STATE:' "$GUIDE_LANDED" || true)"
  shipped_version="$(grep -m1 '^PUBLISH-GUIDE-VERSION-LINE:' "$GUIDE_LANDED" || true)"
  shipped_cut="$(grep -m1 '^PUBLISH-GUIDE-CUT-STATE:' "$GUIDE_LANDED" || true)"
  printf '  generated version line  %s\n' "$expected_version"
  printf '  shipped   version line  %s\n' "${shipped_version:-<absent>}"
  printf '  generated cut-state     %s\n' "$expected_cut"
  printf '  shipped   cut-state     %s\n' "${shipped_cut:-<absent>}"
  [ "$version_count" = "1" ] || {
    bad "the shipped guide carries $version_count PUBLISH-GUIDE-VERSION-LINE lines and exactly one is required — the figure is generated, never hand-written in two places"
    return 1
  }
  [ "$cut_count" = "1" ] || {
    bad "the shipped guide carries $cut_count PUBLISH-GUIDE-CUT-STATE lines and exactly one is required — the figure is generated, never hand-written in two places"
    return 1
  }
  [ "$shipped_version" = "$expected_version" ] || {
    bad "THE SHIPPED GUIDE'S VERSION LINE DISAGREES WITH THE MANIFEST — the manifest reads a version this line does not, and a hand-written figure that contradicts it must fail this preflight rather than travel"
    return 1
  }
  [ "$shipped_cut" = "$expected_cut" ] || {
    bad "THE SHIPPED GUIDE'S CUT-STATE SENTENCE DISAGREES WITH THE MANIFEST AND THE TAG SET — the guide denies (or overstates) the release it ships in"
    return 1
  }
  ok "the shipped guide's version line and cut-state sentence are the figures generated from the manifest and the tag set"
  return 0
}

DRY=1; MODE="dry-run"; TARGET=""; DEST=""; CONFIRM=0
while [ $# -gt 0 ]; do
  case "$1" in
    --check)  MODE="check";  DRY=1 ;;
    --figures) MODE="figures"; DRY=1 ;;
    --bump)   MODE="bump";   DRY=0; TARGET="${2:-}"; shift ;;
    --tag)    MODE="tag";    DRY=0; TARGET="${2:-}"; shift ;;
    --verify) MODE="verify"; DRY=0; TARGET="${2:-}"; shift ;;
    --pack)   MODE="pack";   DRY=0; DEST="${2:-}"; shift ;;
    --yes)    CONFIRM=1 ;;
    -h|--help) sed -n '30,66p' "$0"; exit 0 ;;
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
# `--figures` — THE GUIDE'S TWO GENERATED FIGURES, ASSERTED ALONE (`DEF-AC` (b))
# ==============================================================================
#
# Read-only, and it is the SAME check the preflight runs below: this mode exists so the assertion can be driven
# without the long suite legs, and so a reader can SEE the generated pair beside the shipped pair. **IT WRITES
# NOTHING AND REFUSES ON A DISAGREEMENT**, which is the whole of what the row asked for.
if [ "$MODE" = "figures" ]; then
  echo
  say "THE SHIPPED GUIDE'S TWO GENERATED FIGURES — the version line and the cut-state sentence"
  echo "  (generated from $MAIN_MANIFEST's version and the tag set; asserted against $GUIDE_LANDED)"
  if preflight_guide_figures; then
    echo
    ok "the shipped guide's figures AGREE with the manifest and the tag set"
    exit 0
  fi
  echo
  bad "THE SHIPPED GUIDE'S FIGURES DISAGREE — this is the refusal the preflight takes, and it is the deliverable"
  exit 1
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


# 4. THE SHIPPED GUIDE'S TWO GENERATED FIGURES — `DEF-AC` (b), 2026-10-28.
#
#    **A HAND-WRITTEN LINE THAT CONTRADICTS THE MANIFEST MUST FAIL THIS PREFLIGHT, NOT TRAVEL.** The version line
#    and the cut-state sentence are generated from `bindings/js/package.json`'s `version` and `git tag --list`
#    (`preflight_guide_figures`, above) and asserted against the SHIPPED guide's own marked lines. **IT RUNS
#    BEFORE THE LONG SUITE ON PURPOSE**: a stale figure is a one-second refusal and the suite is the expensive
#    step, so the cheapest subject that can deny the release is checked first. **`--figures` runs exactly this.**
say "the shipped guide's generated figures (version line, cut-state sentence)"
preflight_guide_figures || FAILED=1

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
