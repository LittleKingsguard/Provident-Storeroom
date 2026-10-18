# `0.4.1` RELEASE — PREPARED COMMAND LIST (2026-10-17, supervisor)

**STATUS: PREPARED, NOT EXECUTED.** `release.md §4.1` item 1: *"NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTES."* **Every mutating command below is the ARCHITECT'S ACT.** `scripts/publish.sh` is a RUNBOOK: `--bump`/`--tag`/`--verify` each refuse without `--yes`, and `--tag` PRINTS its three commands rather than running them.

## MEASURED STATE — SUPERVISOR'S OWN SHELL, EVERY SUITE STEP GREEN

```
tree                 CLEAN (0 modified paths)
HEAD                 13 commits AHEAD of origin/main
version              0.4.0 at all six sites;  tags: v0.4.0 ONLY, locally and remotely
cargo test --release root 395 pass / 0 fail · bindings/js 224 pass / 0 fail — ALL exit 0
npm test             499 tests / 499 pass / 0 fail        exit 0
greens.mjs           256 / 256 / 0                        exit 0
live-drive.mjs       100 / 100 / 0                        exit 0
file-tier            96 cells / 90 pass / 0 fail / 6 observed — ALL 12 SCENARIOS PASS   exit 0
npm run typecheck (2 legs) · npm run build                exit 0
publish.sh --check   REFUSED for its three pre-bump reasons ONLY, every suite step ok:
                       FAIL the working tree is dirty — 2 paths   [NOW COMMITTED]
                       FAIL HEAD differs from origin/main           [step 0]
                       FAIL 0.4.0 is TAGGED AND RELEASED while HEAD is 13 past it   [step 1]
                       ok  cargo 395/0 · cargo build clean · Cargo.lock 1 package
                       ok  JS artefact built and staged · node --test 499 pass / 0 fail
```

## WHY `0.4.1` AND NOT `0.5.0` — THE CLASS, APART FROM THE FIAT

**`release.md`'s table reads `PATCH` as *"a fix inside the declared surface"* and `MINOR` as *"a member ADDED."*** **THIS RELEASE ADDS NO MEMBER AND NO POSITION: it is the temporal-stop repair at the store, its consumers' re-derivations, the spec closes, and the two rulings already shipped in `0.4.0`.** **`0.4.1` is the declared `PATCH` class — but the VERSION IS THE ARCHITECT'S FIAT, as `0.3.0`'s and `0.4.0`'s were.**

## WHAT CARRIES — THE TWO RULINGS SHIPPED IN `0.4.0`, PLUS THIS CYCLE'S FIXES

**ALREADY IN `0.4.0` (published and verified on consumer bytes, `§90`):** the message log on every failure · the caller's throw surfacing as itself · the registration-time evaluation · the exports `types` condition · the type-check instrument and the four validation scripts.

**THIS CYCLE (on the tree, every instrument green):**
| # | Item | Evidence |
|---|---|---|
| 1 | **THE ROLLBACK'S TEMPORAL STOP** — the scope gains `E.seq >= the named op's seq`; a value written BEFORE the named op, at or under its address, **now stands** | `src/store.rs`'s filter; **three executed probes including one that DISCRIMINATES the two limbs**; the Rust suite went `1 FAILED → 0` |
| 2 | **THE OVERSHOOT IS A DEFECT** — the clause that had called it a *"standing limit … not a defect any later pass undoes"* is **withdrawn at its own cell**, and the greens assertions that PASSED on the defect are re-classed | `composition-and-states.md §2.6` item 8 (iii); `storeroom-native-greens.md` |
| 3 | **`constraints()` — A THIRTEENTH MEMBER** — reads back the registered pairs, arity `0`, throwing nothing, the identity not exposed, the function not returned, disabled pairs included | 13 members; `PAR-JS-27` authored; the read touches no kernel structure |
| 4 | **`R3` MET AS NARROWED** — a consumer reads WHICH constraints failed from the thrown log's entries | `surface.md §2.5`'s new clause; the identity crosses in the log, not the status |
| 5 | **THE OBSERVABLE IS DECLARED** — a combination on the floor-meeting window, with a plain `read` REFUSED as the test because the value there agrees with the property's NEGATION | `write-and-read.md §6.4` item `1A` at both homes |

## STEP 0 — AUTH AND ENVIRONMENT (YOURS; NO PASS MAY TAKE THESE)

```bash
npm whoami                                        # expect: E401 Unauthorized today
sudo chown -R 1000:1000 /home/ryanr/.npm          # REQUIRES YOUR SUDO — the EACCES root cause
npm login --scope=@auspicion                      # REQUIRES YOUR CREDENTIALS
# — or headless —
export NODE_AUTH_TOKEN=<your npm automation token>   # REQUIRES YOUR TOKEN
npm whoami --registry=https://registry.npmjs.org
git push origin main                              # REQUIRES YOUR CREDENTIALS — HEAD is 13 ahead
```

## STEP 1 — THE BUMP (YOUR ACT)

```bash
bash scripts/publish.sh --bump 0.4.1 --yes
bash scripts/publish.sh --check                   # must stop refusing
```

## STEP 2 — COMMIT, THEN TAG (YOUR ACT — `--tag` PRINTS THESE)

**⟶ `--tag` REFUSES A DIRTY TREE, SO THE BUMP MUST BE COMMITTED FIRST. AND EXPECT THE COUPLING CELLS TO REDDEN IF `v0.4.0` REMAINS: the coupling asserts, FOR EVERY TAG THE REPOSITORY CARRIES, that the tag's version equals the manifest's — AND ITS OWN HELPER READS THE UNFILTERED TAG LIST *deliberately*, because *"a name filter would hide exactly the tag the coupling refuses."***

```bash
bash scripts/publish.sh --tag 0.4.1 --yes         # prints the three lines below
git commit -am 'release v0.4.1'
git tag -a v0.4.1 -m 'v0.4.1'
git push origin main && git push origin v0.4.1    # REQUIRES YOUR CREDENTIALS — FIRES THE WORKFLOW

# AND ONE OF THE TWO, OR THE COUPLING STAYS RED:
git tag -d v0.4.0                                 # (a) retire the previous tag
git push origin :refs/tags/v0.4.0                 #     REQUIRES YOUR CREDENTIALS
# — or —
# (b) RULE THAT THE COUPLING ASSERTS ONLY THE CURRENT RELEASE'S OWN TAG, and have the
#     tag-reading cells re-derived once. THIS IS THE FOURTH CUT THE SAME CHOICE IS OWED AT,
#     and (b) stops it recurring: the rule as written makes the repository's HISTORY an
#     obstacle to its own next release, and retiring a tag deletes the record of a
#     SHIPPED version while the registry keeps the release.
```

## STEP 3 — THE WORKFLOW PUBLISHES (FIVE PLATFORM ARTEFACTS FIRST, THEN THE MAIN PACKAGE)

**`v0.4.1`'s push triggers `.github/workflows/publish.yml`, which publishes through OIDC federation with no stored secrets — the five platform artefacts first, then the main package (`needs: platform`).** **NOTHING BUILDS THEM LOCALLY.**

```bash
gh run watch        # or the repository's Actions tab — note gh may be unavailable here
```

## STEP 4 — VERIFY (READ-ONLY)

```bash
bash scripts/publish.sh --verify 0.4.1 --yes
for p in linux-x64-gnu linux-arm64-gnu darwin-x64 darwin-arm64 win32-x64-msvc; do
  printf '%-16s ' "$p"
  curl -s "https://registry.npmjs.org/@auspicion/provident-storeroom-js-$p" \
    | python3 -c "import sys,json;d=json.load(sys.stdin);print('latest:',d.get('dist-tags',{}).get('latest'),'| has 0.4.1:', '0.4.1' in d.get('versions',{}))"
done
curl -s https://registry.npmjs.org/provident-storeroom \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('main latest:',d.get('dist-tags',{}).get('latest'))"
```
**⟶ PARSE THE WHOLE BODY BEFORE READING A FIELD — a truncated-read pipeline reported three PUBLISHED packages as missing earlier this session, and the truncation was the instrument.**

## STEP 5 — THE ACCEPTANCE TEST ONLY A CONSUMER PATH CAN TAKE

```bash
rm -rf /tmp/sr-041 && mkdir -p /tmp/sr-041 && cd /tmp/sr-041
npm init -y >/dev/null && npm install provident-storeroom@0.4.1
node -e "
import('provident-storeroom').then(m=>{
  const a=m.storeCreate({journalLength:64,listeners:[]});
  console.log('members:', Object.getOwnPropertyNames(a).length);          // EXPECT 13
  console.log('module names:', Object.keys(m));                           // EXPECT ['storeCreate']
  a.write(['k'],'mem',{v:'good'});
  let armed=false;
  a.addConstraint({address:['k'],id:'c1'},(ctx)=>!armed?true:(ctx.value&&ctx.value.v==='good'?true:{message:'only good'}));
  armed=true;
  try{ a.write(['k'],'mem',{v:'bad'}); }catch(e){ console.log('write:',e.status,'|',e.message); }
  console.log('pairs:', JSON.stringify(a.constraints()));                 // EXPECT the pair
  try{ console.log('seed after:', JSON.stringify(a.read(['k'],'mem'))); }  // THE TEMPORAL STOP
  catch(e){ console.log('READ AFTER:', e.status, ' <- the seed is GONE'); }
});"
# EXPECT: 13 members; the write refused; the pair listed; AND THE SEED STILL READING good.
# THEN the flat log census: every failure carrying log as an array, the constraint TypeError carrying log with NO status.
```

## WHAT IS NOT VERIFIED AND MUST NOT BE CLAIMED

- **`APP` layer is `NONE` (`DD-20`). Every green above is CHECKOUT evidence** (`import 'provident-storeroom'` self-references this tree). **The installed-bytes run is the only one that speaks for a consumer, and it must be RE-TAKEN against the published bytes.**
- **`DEF-2026-10-16-O`** remains open — the retired-spelling conversion: `storeroom-publish/contract.md`'s `65` occurrences, `release.md`'s `39` live sites, and the four trackers' `88`. **NONE of it gates the release: it moves bytes between spec documents and their own backups and touches no shipped artefact.**
- **`DEF-2026-10-17-G`** (silent non-repair) — may be subsumed by ruling 3's attempted-repair path; **VERIFY rather than assume.**
- **A lawful body-less `cfg.constraints` element gets SILENCE BY DECLARATION** (`§2.12` clause (d)): a caller who type-checks a pair and gets no signal receives none. **The remedy is spec-side and unrouted.**
- **The `<mismatch clause>` per-instant message** for `#16` remains owed to the architect; **the route's ceiling** likewise.
- **`typecheck/consumer-fixture.ts` does not exercise the new `log` member or `constraints()`** — owed to its owner.
- **One of five targets** was exercised locally (linux·x64, Node `24.20.0`, non-root).
