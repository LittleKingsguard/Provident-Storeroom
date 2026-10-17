# `0.3.1` PUBLISH — PREPARED COMMAND LIST (2026-10-17, supervisor)

**STATUS: PREPARED, NOT EXECUTED.** `release.md §4.1` item 1, verbatim: *"NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTES."* **Every mutating command below is the ARCHITECT'S ACT.** `scripts/publish.sh` is a RUNBOOK: `--bump`, `--tag` and `--verify` each refuse without `--yes`.

## WHAT `0.3.1` CARRIES (all on the working tree, all supervisor-verified)

| # | Item | Defect | Evidence |
|---|---|---|---|
| 1 | **A `null` tier carries the argument's container** (was: empty container + the wrong argument named) | `DEF-2026-10-17-E` | clause `crossing.md`'s dated rule + `TierArg` row 4; same path as the `undefined` repair |
| 2 | **The register-case not-found rendering** (the wide not-found fix was tried, broke two greens, and was narrowed) | `DEF-2026-10-17-E` | repair is narrow: the store's rendering was already correct where a node resolves |
| 3 | **`DEF-2026-10-17-A`** — a tier-side refusal no longer borrows the empty container; the config key answers in its sibling's shape | `DEF-A` | `30`/`179` cells moved, `149` byte-identical |
| 4 | **The shipped `README.md` rebuilt to the operative surface** — 13 rows, all twelve members named, `on`/`off` withdrawn not counted | `DEF-B` | it is `files`-allowlisted, so it IS the package's front page |
| 5 | **The exports map carries a `types` condition FIRST** — a modern-resolution consumer was silently getting `any` | `DEF-D` | `TS2307` reproduced → fixed → both legs exit `0` |
| 6 | **Two over-strength pins re-derived** to `['types','import']` with order asserted | `DEF-D` | `13` falsifiers turn the suite red |
| 7 | **The type-check instrument** (two legs: `node10` + `nodenext`, `28` refusals) | `DEF-Q` | falsifiers run: drift → `2`, mutation → `2`, lying build → `1` |
| 8 | **The validation scripts** — `test` / `typecheck` / `build` / `greens` | `DEF-R` | all exit `0`; `build` copies the runbook's own preflight invocations |
| 9 | **The live battery extended** — `LIVE-13.21`–`.25`, container PRESENCE asserted beside the empty form's absence | `DEF-A` | `+252` lines, `0` deletions, three red falsifications restored |

**SEMVER CLASS — READ BEFORE CHOOSING THE NUMBER.** `release.md`'s table classes `PATCH` as *"a fix inside the declared surface"* and `MINOR` as *"a member ADDED"*. **Every item above is a fix inside the declared surface — no member is added, none is removed, and no resolution rule's order changes.** **`0.3.1` is the declared `PATCH` class; `0.3.0` was `MINOR` by fiat (`A128`).** **BUT item 5 CHANGES THE `exports` MAP, which is the ENTRY's declared shape (`PAR-PUB-5`) — the architect should confirm `PATCH` rather than assume it.**

## MEASURED STATE (supervisor's own shell, this pass)

```
tree                                        CLEAN
HEAD                                        b92d85b, 8 commits AHEAD of origin/main
tags                                        v0.3.0 (v0.2.0 retired locally and remotely)
version sites                               6, ALL reading 0.3.0
root package.json                           private: true, NO version, scripts: test/typecheck*/build/greens
scripts/publish.sh --check                  REFUSED for its own two pre-bump reasons ONLY
  ok  tree clean
  FAIL HEAD differs from origin/main — push or pull first
  FAIL the manifest reads 0.3.0, which is TAGGED AND RELEASED, but HEAD is 8 commits past that tag
  ok  cargo test --offline: 395 pass / 0 fail
  ok  cargo build --offline clean
  ok  Cargo.lock: 1 package (the declared dependency-free property holds)
  ok  JS artefact built and staged
  ok  node --test: pass 499 / fail 0
npm test / typecheck / build / greens        exit 0 · 499/499/0 · both legs · both crates · 255/100/96
```

## STEP 0 — AUTH AND ENVIRONMENT (YOURS; NO PASS MAY TAKE THESE)

```bash
# npm is UNAUTHENTICATED and its log/cache dir has root-owned files (EACCES).
npm whoami                       # expect: E401 Unauthorized today
sudo chown -R 1000:1000 /home/ryanr/.npm          # REQUIRES YOUR SUDO — the EACCES root cause
npm login --scope=@auspicion                      # REQUIRES YOUR CREDENTIALS
# — or headless —
export NODE_AUTH_TOKEN=<your npm automation token>   # REQUIRES YOUR TOKEN
npm whoami --registry=https://registry.npmjs.org
```

```bash
# HEAD is 8 commits ahead of origin/main — the preflight's own refusal.
git push origin main                              # REQUIRES YOUR CREDENTIALS
```

## STEP 1 — THE BUMP (YOUR ACT; WRITES THE SIX MANIFEST VERSION CELLS + THE PROSE CELLS)

```bash
bash scripts/publish.sh --bump 0.3.1 --yes        # ARCHITECT'S ACT
# It will tell you the prose cells §2.5 item 3 owes. The suite names the ones that redden.
bash scripts/publish.sh --check                   # must stop refusing
```

## STEP 2 — COMMIT, THEN TAG (YOUR ACT — THE RUNBOOK PRINTS THESE; IT DOES NOT RUN THEM)

**`--tag` refuses a dirty tree, so the bump must be COMMITTED first. The tag's push is what fires the publish workflow.**

```bash
bash scripts/publish.sh --tag 0.3.1 --yes         # prints the three lines below
git commit -am 'release v0.3.1'
git tag -a v0.3.1 -m 'v0.3.1'
git push origin main && git push origin v0.3.1    # REQUIRES YOUR CREDENTIALS — FIRES THE WORKFLOW
```

**⟶ EXPECT THE TAG-COUPLING CELLS TO REDDEN IF `v0.3.0` REMAINS: the coupling asserts, FOR EVERY TAG THE REPO CARRIES, that the tag's version equals the manifest's.** (`--tag` warns: *"Decide before tagging: delete it, or accept it red. This script will NOT delete a tag."*) **At `0.3.0` the resolution was to retire the previous tag locally AND remotely. The same decision is owed at `0.3.1`.**

## STEP 3 — THE WORKFLOW PUBLISHES (YOUR ACT'S CONSEQUENCE): FIVE PLATFORM ARTEFACTS FIRST, THEN THE MAIN PACKAGE

**`v0.3.1`'s push triggers `.github/workflows/publish.yml`, which publishes through OIDC federation with no stored secrets — the five platform artefacts first, then the main package (`needs: platform`).** **Nothing builds them locally; only the linux-x64 artefact exists in this tree.**

```bash
gh run watch                                      # watch it
# if gh is unavailable in this environment, the run is visible in the repository's Actions tab
```

## STEP 4 — VERIFY (READ-ONLY)

```bash
bash scripts/publish.sh --verify 0.3.1 --yes
for p in linux-x64-gnu linux-arm64-gnu darwin-x64 darwin-arm64 win32-x64-msvc; do
  printf '%-16s ' "$p"
  curl -s "https://registry.npmjs.org/@auspicion/provident-storeroom-js-$p" \
    | python3 -c "import sys,json;d=json.load(sys.stdin);print('latest:',d.get('dist-tags',{}).get('latest'),'| has 0.3.1:', '0.3.1' in d.get('versions',{}))"
done
curl -s https://registry.npmjs.org/provident-storeroom \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('main latest:',d.get('dist-tags',{}).get('latest'))"
```

**⟶ PARSE THE WHOLE BODY BEFORE READING A FIELD. A `curl | head -c N | python -c json.load` PIPELINE REPORTED THREE PUBLISHED PACKAGES AS *"Not found"* EARLIER TODAY; the truncation was the supervisor's instrument, not the registry's state.**

## STEP 5 — THE ACCEPTANCE TEST THAT ONLY A CONSUMER PATH CAN TAKE

**Every green above is CHECKOUT evidence (`APP` layer is `NONE`). The defect that started this pass was found by installing the PUBLISHED package and driving it, and by NO gate. Run this against the released bytes:**

```bash
rm -rf /tmp/sr-031 && mkdir -p /tmp/sr-031 && cd /tmp/sr-031
npm init -y >/dev/null && npm install provident-storeroom@0.3.1
node -e "
import('provident-storeroom').then(m=>{
  const a=m.storeCreate({journalLength:64,listeners:[]});
  console.log('members:', Object.getOwnPropertyNames(a).length);        // EXPECT 12
  for (const [label,v,t] of [['null tier',['a','b','c'],null],
                             ['undef tier',['a','b','c'],undefined],
                             ['missing key',['a','b','c'],'mem']]) {
    let r; try{ r=t===undefined?a.read(v):a.read(v,t); }catch(e){ r={status:e.status,message:e.message}; }
    const msg=r.message||'';
    console.log(label, r.status, "| names 'address':", msg.includes("'address'"), "| empty container:", msg.includes(\"in ''\"));
  }
});"
# EXPECT: 12 members; the null tier AddressMalformed naming 'address' with NO empty container;
#         the undefined tier and the missing key answering from the store's own rendering.
```

**Then run the extended live battery against the installed bytes** (the `LIVE-13.21`–`.25` shapes), and confirm the legacy-resolution consumer still gets types (`tsc` against `typescript` 5-format, `moduleResolution: node10`) **and a modern-resolution consumer now does too** — that pair is the whole point of item 5.

## WHAT IS NOT VERIFIED AND MUST NOT BE CLAIMED AT THE RELEASE

- **`APP` layer is `NONE` (`DD-20`).** No `APP`-green exists on any evidence. **Every in-process instrument measures the CHECKOUT** (`import 'provident-storeroom'` self-references this tree).
- **The build and the type-check now EXIST as scripts but were never run by a release act**; the workflow's own build is the first real one.
- **One of five targets** was exercised locally (linux·x64, Node `24.20.0`, non-root). Nothing here speaks for the other four, root, Windows, off-`glibc`, or an offline install.
- **`DEF-2026-10-16-O` is OPEN** — the retired-spelling re-close needs an UNCAPPED enumeration (`516` sites in four paths; `1,088` across `docs/`).
- **`DEF-2026-10-16-S` is a DECISION AWAITING A RULING** — two units declare the same eight property ids; the contract itself asks for *"a fresh ruling on the row-id family"*.
- **`listeners: {}` still renders the address-segment form BY DESIGN** (pinned by `tests/gate4_red_set_fix.rs`), and the register's `''` remains the store's own declared spelling for the register.
