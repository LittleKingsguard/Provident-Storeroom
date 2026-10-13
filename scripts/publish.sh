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
#    scripts/publish.sh --bump 0.1.3        # writes the version and prose cells
#    scripts/publish.sh --tag   0.1.3       # commits, tags, pushes the tag
#    scripts/publish.sh --verify 0.1.3      # post-publish checks, read-only
#
#  `--bump`, `--tag` and `--verify` each require `--yes` as well:
#
#    scripts/publish.sh --bump 0.1.3 --yes
#
# ==============================================================================

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

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

R='\033[0;31m'; G='\033[0;32m'; Y='\033[0;33m'; B='\033[0;34m'; N='\033[0m'
say()  { printf "${B}==>${N} %s\n" "$*"; }
ok()   { printf "${G} ok ${N} %s\n" "$*"; }
warn() { printf "${Y}  ! ${N} %s\n" "$*"; }
bad()  { printf "${R}FAIL${N} %s\n" "$*"; }
act()  { printf "\n${B}── ACT %s ──${N} %s ${Y}(actor: %s)${N}\n" "$1" "$2" "$3"; }

DRY=1; MODE="dry-run"; TARGET=""; CONFIRM=0
while [ $# -gt 0 ]; do
  case "$1" in
    --check)  MODE="check";  DRY=1 ;;
    --bump)   MODE="bump";   DRY=0; TARGET="${2:-}"; shift ;;
    --tag)    MODE="tag";    DRY=0; TARGET="${2:-}"; shift ;;
    --verify) MODE="verify"; DRY=0; TARGET="${2:-}"; shift ;;
    --yes)    CONFIRM=1 ;;
    -h|--help) sed -n '30,60p' "$0"; exit 0 ;;
    *) bad "unknown argument: $1"; exit 2 ;;
  esac
  shift
done

if [ "$DRY" -eq 0 ] && [ "$CONFIRM" -ne 1 ]; then
  bad "mode '--$MODE' mutates the tree and requires '--yes'."
  warn "Re-run as:  scripts/publish.sh --$MODE ${TARGET:-X.Y.Z} --yes"
  warn "And read §4.1 first: NO PASS PUBLISHES. This act is the architect's."
  exit 2
fi

# ------------------------------------------------------------------------------
say "repository: $REPO"
say "mode: $MODE${TARGET:+  target: $TARGET}"
[ "$DRY" -eq 1 ] && warn "DRY RUN — nothing below will be written."

# ==============================================================================
# PREFLIGHT — every one of these is a refusal, not a warning.
# ==============================================================================
say "PREFLIGHT"
FAILED=0
refuse() { bad "$*"; FAILED=1; }

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
    refuse "the manifest reads $MANIFEST_V, which is TAGGED AND RELEASED, but HEAD is $AHEAD commit(s) past that tag."
    warn "    A build from this tree would be stamped '$MANIFEST_V' with bytes the registry's '$MANIFEST_V' does not have."
    warn "    The tree claims a released version it is no longer. Resolve it by cutting the next PATCH:"
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

# 4. The suite. A release is cut from a green tree or it is not cut.
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

  # The declared offline property, checked rather than assumed.
  # `Cargo.toml` declares that the crate builds and tests with no registry.
  PKGS=$(grep -c '^\[\[package\]\]' Cargo.lock)
  [ "$PKGS" = "1" ] && ok "Cargo.lock: $PKGS package (the declared dependency-free property holds)" \
                    || refuse "Cargo.lock carries $PKGS packages — the offline property is SPENT"

  # The JS artefact + the node suite. NOTE: there is NO `npm test` in this
  # repository — neither manifest carries a `scripts` key. The trio's real
  # commands are the cargo ones plus the glob-form node invocation below.
  # The DIRECTORY form of --test FAILS under Node v24 and is not a defect.
  if cargo build --release --offline --manifest-path bindings/js/Cargo.toml >/dev/null 2>&1; then
    cp -f bindings/js/target/release/libstoreroom_js_binding.so \
          bindings/js/build/Release/storeroom_js_binding.node 2>/dev/null || true
    ok "JS artefact built and staged"
  else refuse "the JS artefact build FAILED"; fi
  if node --test bindings/js/test/*.test.mjs >/tmp/pub-node.log 2>&1; then
    ok "node --test (glob form): $(grep -E '^. (pass|fail) ' /tmp/pub-node.log | tr -d '\n')"
  else refuse "the node suite FAILED — see /tmp/pub-node.log"; fi
fi

# 5. The target version, when one is named.
if [ -n "$TARGET" ]; then
  [[ "$TARGET" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || refuse "'$TARGET' is not X.Y.Z"
  if git rev-parse -q --verify "refs/tags/v$TARGET" >/dev/null; then
    refuse "tag v$TARGET already exists locally"
  fi
  if git ls-remote --tags origin "v$TARGET" 2>/dev/null | grep -q "v$TARGET"; then
    refuse "tag v$TARGET already exists on origin — a version is cut once"
  fi
  ok "v$TARGET is unclaimed locally and remotely"
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
  say "BUMPING $CUR -> $TARGET  (PATCH; §2.5's order is binding)"

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
    [ "$DRY" -eq 0 ] && perl -pi -e "s/(\"\Q$n\E\"\s*:\s*\")[^\"]+(\")/\${1}$TARGET\${2}/" "$MAIN_MANIFEST"
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
