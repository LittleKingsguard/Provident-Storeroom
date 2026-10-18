# `v0.4.0` — THE EXACT TAG SEQUENCE, READ FROM THE COUPLING'S OWN CODE

**MEASURED STATE (supervisor, after the architect's `--bump 0.4.0`):**
```
manifest          0.4.0 at ALL SIX sites (bindings/js/package.json + the five platforms/*/package.json)
                   plus the carriage-sentence doc docs/specs/storeroom-publish-proposal.md
dirty paths       7 (the bump's own writes) — the tag refuses a dirty tree, so the bump must be COMMITTED first
tags              v0.3.1 ONLY
suite             499 tests / 497 pass / 2 FAIL
```
**THE TWO FAILURES, READ AT THEIR OWN ASSERTIONS:**
```
NG-PUB-J  "the manifest declares `0.4.0`, so `v0.4.0` IS the tag the coupling fixes and it must EXIST"
P-PUB-8  same rule from the S-TAG side
```

## ⟶ CUTTING `v0.4.0` ALONE IS NOT ENOUGH — THE COUPLING ASSERTS TWO THINGS, AND THE SECOND READS THE UNFILTERED TAG LIST

**`assertTagCoupling` (`bindings/js/test/publish.test.mjs:920`) asserts:**
1. **`v0.4.0` EXISTS** (`:927`–`:930`) — failing now.
2. **`for (const tag of listed)` … `assert.equal(tag.slice(1), version)`** (`:932`–`:938`) — **EVERY TAG THE REPOSITORY CARRIES MUST EQUAL THE MANIFEST'S VERSION.** **AND THE LIST IS READ UNFILTERED ON PURPOSE — `repoTagList`'s own comment: *"the coupling is a statement about the tags the repository CARRIES, so the drive reads the whole list rather than the one name it hopes to find — a name filter would hide exactly the tag `PAR-PUB-29`'s second outside value refuses."***

**SO ONCE `v0.4.0` IS CUT, THE LOOP REACHES `v0.3.1`, FINDS `0.3.1 ≠ 0.4.0`, AND REFUSES IT.** **BOTH CELLS CLEAR ONLY WHEN THE TAG SET IS EXACTLY `{v0.4.0}`.**

**THE ORDER, AND EVERY STEP IS THE ARCHITECT'S EXCEPT THE LAST VERIFY:**
```bash
# 1. COMMIT THE BUMP — the tag's own precondition (§2.5(3): the tag follows the COMMIT)
git add -A && git commit -m 'release v0.4.0'

# 2. CUT AND PUSH THE TAG — the push fires .github/workflows/publish.yml (OIDC, no stored secrets)
git tag -a v0.4.0 -m 'v0.4.0'
git push origin main && git push origin v0.4.0      # REQUIRES YOUR CREDENTIALS

# 3. RETIRE v0.3.1 — LOCAL AND REMOTE — or both cells stay red on the loop
git tag -d v0.3.1
git push origin :refs/tags/v0.3.1                   # REQUIRES YOUR CREDENTIALS
git fetch --prune --tags && git tag --list          # EXPECT: v0.4.0 only

# 4. VERIFY THE COUPLING CLEARS
cd bindings/js && node --test test/*.test.mjs 2>&1 | grep -E '^. (tests|pass|fail)'
# EXPECT: 499 / 499 / 0

# 5. THE RELEASE-SIDE CHECK
bash scripts/publish.sh --check
```

## THE STANDING ALTERNATIVE, REPEATED BECAUSE THIS IS THE FOURTH CUT IT APPLIES TO

**`v0.3.1` IS A PUBLISHED RELEASE. Retiring it deletes the repository's record of a shipped version while the registry keeps it — and the same was done to `v0.2.0` and `v0.1.2` at the two previous cuts.** **The coupling's rule makes the repository's HISTORY an obstacle to its own next release, so this recurs every time.**

**The alternative: rule that the coupling asserts the manifest against THE CURRENT RELEASE'S OWN TAG — present, matching, its commit on this branch's history — and does NOT require the absence of older tags.** **That keeps every real failure it catches (a missing tag, a mismatched tag, a tag off-history) and stops failing the past.** **It costs one test-writer pass over `assertTagCoupling` and its cells; it saves deleting a shipped release's record at every future cut.**

## AND WHAT IS NOT VERIFIED, UNCHANGED

**`APP` layer is `NONE`. Every green above is CHECKOUT evidence.** **After the publish lands, the acceptance test must run against PUBLISHED bytes — a clean install, the twelve members, the single module name, and the flat reading's own census (every failure carrying `log` as an array) — because that consumer-path drive is the one that found the last release's defect and the only one that speaks for a consumer.**
