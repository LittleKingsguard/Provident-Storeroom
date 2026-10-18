# RETIRING `v0.3.0` — PREPARED COMMANDS (2026-10-17, supervisor)

**WHY IT IS ASKED FOR.** `bindings/js/package.json` declares **`0.3.1`**, and the tag-coupling cells assert — **for EVERY tag the repository carries** — that the tag's version equals the main manifest's. **`v0.3.0` carries `0.3.0`, so two cells fail: `NG-PUB-J::the version equals a resolved tag…` and `P-PUB-8::S-TAG`.** **This is `DEF-2026-10-17-F`. At `0.3.0`'s own cut the preceding tag was retired LOCALLY AND REMOTELY for exactly this reason; at `0.3.1` that step was not taken.**

**MEASURED STATE, SUPERVISOR'S OWN SHELL:**
```
local tags      v0.3.0, v0.3.1
remote tags     v0.1.2, v0.3.0, v0.3.1
manifest        0.3.1
registry        dist-tags.latest = 0.3.1; versions = 0.0.0-stage, 0.1.0, 0.1.1, 0.1.2, 0.1.3, 0.2.0, 0.3.0, 0.3.1
HEAD            18 commits AHEAD of origin/main
suite           499 tests / 497 pass / 2 fail — the two are these tag cells
```

**⟶ THE FACT THAT SHOULD DECIDE IT: `0.3.0` IS A PUBLISHED RELEASE.** **The registry carries it.** **So `v0.3.0`'s tag is the historical record of a version that genuinely shipped — and the same was true of `v0.2.0`'s when it was retired.** **The coupling rule makes every published tag an obstacle to the next release, so this recurs at every cut; retiring the previous tag each time is the established practice here, and it deletes the record of a shipped release from the repository while leaving the registry untouched.**

## OPTION A — RETIRE `v0.3.0` LOCALLY AND REMOTELY (the established practice; clears both cells)

```bash
git tag -d v0.3.0                                  # local — no auth needed
git push origin :refs/tags/v0.3.0                  # REMOTE — REQUIRES YOUR CREDENTIALS
git fetch --prune --tags
git tag --list                                     # expect: v0.3.1 only
cd bindings/js && node --test test/*.test.mjs 2>&1 | grep -E '^. (tests|pass|fail)'
# EXPECT: 499 / 499 / 0
```

**⟶ AND NOTE `v0.1.2` CARRIES THE SAME PROBLEM AND WAS NEVER RETIRED — it is on the remote and NOT in the local tag list, so a `git fetch --tags` brings it back and re-reddens the coupling.** **Check after the prune; if it returns, either retire it too or take Option B.**

## OPTION B — RULE THAT TRAILING TAGS ARE ACCEPTABLE, AND RE-DERIVE THE COUPLING CELLS (recommended)

**The rule as written asserts the coupling *for every tag the repository carries* — which makes the repository's history an obstacle to its own next release, and requires deleting the record of each shipped version as the price of shipping the next.** **That is a rule about the repository's PRESENT TENURE masquerading as a rule about the coupling.**

**Ruling it: the coupling asserts the manifest's version against THE CURRENT RELEASE'S OWN TAG (`v<version>`) — present, its version matching, its commit reachable — and does NOT require the absence of older tags.** **That is a smaller, truer rule: it still fails a missing tag, a mismatched tag, and a tag off this branch's history; it stops failing HISTORY.**

**If ruled, the re-derivation is the test writer's:** `bindings/js/test/publish.test.mjs`'s `assertTagCoupling` (`:897`-area), its `NG-PUB-J` cell (`:138`), and `P-PUB-8`'s `S-TAG` cell — **and `bindings/js/test/publish-generators.test.mjs`'s `NG-PUB-J` generator, whose `control-no-tag-at-all` and tag-set logic read `git tag --list`.** **A supervisor grep should be run over the test tree for every reader of `git tag` before the pass is briefed.**

## WHAT I RECOMMEND

**Option B.** **Option A works and is the established practice, but it deletes a shipped release's record from the repository every time a release is cut — and `v0.1.2` shows the practice was already applied unevenly.** **Option B makes the rule say what it means, keeps the history, and fixes the recurrence rather than the instance.** **It costs one test-writer pass; Option A costs a remote tag deletion that no pass may take.**

**EITHER WAY, THE SUITE GOES GREEN AND NOTHING ELSE IS RED: `greens.mjs` `256/256/0` · `file-tier-save` all 12 scenarios PASS · `live-drive.mjs` `100/100/0` · node suite `497/499` held back only by these two cells.**
