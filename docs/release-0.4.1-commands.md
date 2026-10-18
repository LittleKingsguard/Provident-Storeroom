# `0.4.1` RELEASE — PREPARED COMMAND LIST (2026-10-17, supervisor)

**STATUS: PREPARED, NOT EXECUTED.** `release.md §4.1` item 1, verbatim: *"NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTES."* **Every mutating command below is the ARCHITECT'S ACT.** `scripts/publish.sh` is a RUNBOOK: `--bump`/`--tag`/`--verify` each refuse without `--yes`, and `--tag` PRINTS its three commands rather than running them.

## MEASURED STATE — SUPERVISOR'S OWN SHELL, REPEATED, EVERY SUITE STEP GREEN

```
tree                 CLEAN (0 modified paths)
HEAD                 17 commits AHEAD of origin/main
version              0.4.0 at all six sites;  tags: v0.4.0 ONLY, locally and remotely
cargo test --release root 395 pass / 0 fail — ALL exit 0 (was 1 FAILED before the last re-derivation)
npm test             499 tests / 499 pass / 0 fail        exit 0
npm run greens       all three harnesses                  exit 0
npm run typecheck    2 legs                               exit 0
npm run build                                             exit 0
publish.sh --check   REFUSED for its two pre-bump reasons ONLY; every suite step ok:
                       ok  tree clean
                       FAIL HEAD differs from origin/main            -> step 0
                       FAIL 0.4.0 is TAGGED AND RELEASED, HEAD 17 past it -> step 1
                       ok  cargo 395/0 · cargo build clean · Cargo.lock 1 package
                       ok  JS artefact built and staged · node --test 499 pass / 0 fail
```
**AND THE FOUR INSTRUMENTS RUN INDIVIDUALLY: `node --test` `499/499/0` · `greens.mjs` `256/256/0` · `live-drive.mjs` `100/100/0` · file-tier `96` cells / `90` pass / `0` fail / `6` observed, ALL TWELVE SCENARIOS PASS, exit `0`.**

## WHY `0.4.1` — THE CLASS, APART FROM THE FIAT

**`release.md`'s table reads `PATCH` as *"a fix inside the declared surface"*.** **THIS CYCLE `constraints()` WAS ADDED AS A THIRTEENTH MEMBER — A MEMBER ADDED — SO BY THAT TABLE THE CLASS IS `MINOR` AND THE NUMBER WOULD BE `0.5.0`.** **⟶ BUT THE ARCHITECT'S VERSION IS THE FIAT, AS IT WAS FOR `0.3.0` AND `0.4.0`: the member addition is real and should be weighed when choosing the number rather than assumed away.** **THE SUPERVISOR'S READ: `0.5.0`, because `constraints()` is a member a consumer can call that did not exist in `0.4.0` — the same test that made `0.4.0` a minor when the failure form gained a member.**

## WHAT THIS RELEASE CARRIES — NONE OF IT IN `0.4.0`

| # | Item | Evidence it is landed |
|---|---|---|
| 1 | **THE ROLLBACK'S TEMPORAL STOP** — the scope gains `E.seq >= the named op's seq`; a value written BEFORE the named op, at or under its address, **now STANDS** | `src/store.rs`'s filter; **three executed probes, one of which DISCRIMINATES the two limbs**; the Rust suite `1 FAILED -> 0`; the root cargo run is the preflight's own `395/0` |
| 2 | **THE OVERSHOOT IS A DEFECT** — the clause that had called it a *"standing limit … not a defect any later pass undoes"* is **WITHDRAWN at its own cell**, one limb with its three warrants each disposed separately, the reproduction retained as evidence rather than warrant | `composition-and-states.md §2.6` item 8 (iii) |
| 3 | **`constraints()` — A THIRTEENTH MEMBER** — reads back the registered pairs: arity `0`, throwing nothing, the identity NOT exposed, the function NOT returned, order undeclared, **a disabled pair DOES appear** | 13 members verified on the tree; `PAR-JS-27` authored; the four exclusions are STRUCTURAL rather than tested |
| 4 | **`R3` MET AS NARROWED** — a consumer reads WHICH constraints failed from the thrown log's `constraint-check` entry | `surface.md §2.5`; the identity crosses in the log, not the status |
| 5 | **THE OBSERVABLE IS DECLARED** — a combination, with a plain `read` REFUSED as the test because on the floor-meeting window the value agrees with the property's NEGATION | `write-and-read.md §6.4` item `1A` at both homes |
| 6 | **THE GUIDE NOW SAYS A TOGGLE IS NOT A REMOVAL** — *"there is no removal route, and neither toggle is one"*, with notes at the table rows and the disabled pair's appearance in `constraints()` stated | `package-use.md:150`, `:138`/`:139`, `:151`–`:153` |

## STEP 0 — AUTH AND ENVIRONMENT (YOURS; NO PASS MAY TAKE THESE)

```bash
npm whoami                                        # expect: E401 Unauthorized today
sudo chown -R 1000:1000 /home/ryanr/.npm          # REQUIRES YOUR SUDO — the EACCES root cause
npm login --scope=@auspicion                      # REQUIRES YOUR CREDENTIALS
# — or headless —
export NODE_AUTH_TOKEN=<your npm automation token>   # REQUIRES YOUR TOKEN
npm whoami --registry=https://registry.npmjs.org
git push origin main                              # REQUIRES YOUR CREDENTIALS — HEAD is 17 ahead
```

## STEP 1 — THE BUMP (YOUR ACT)

```bash
bash scripts/publish.sh --bump 0.5.0 --yes        # or 0.4.1 if you rule the member addition a patch
bash scripts/publish.sh --check                   # must stop refusing
```

## STEP 2 — COMMIT, THEN TAG (YOUR ACT)

**⟶ `--tag` REFUSES A DIRTY TREE, SO THE BUMP MUST BE COMMITTED FIRST. AND EXPECT A COUPLING-CELL FAILURE IF `v0.4.0` REMAINS: `assertTagCoupling` loops over the UNFILTERED tag list and REFUSES any tag whose version differs from the manifest — its own helper says a name filter *"would hide exactly the tag the coupling refuses."***

```bash
bash scripts/publish.sh --tag 0.5.0 --yes         # prints the three lines below
git commit -am 'release v0.5.0'
git tag -a v0.5.0 -m 'v0.5.0'
git push origin main && git push origin v0.5.0    # REQUIRES YOUR CREDENTIALS — FIRES THE WORKFLOW

# AND ONE OF THE TWO, OR THE COUPLING STAYS RED:
git tag -d v0.4.0                                 # (a) retire the previous tag
git push origin :refs/tags/v0.4.0                 #     REQUIRES YOUR CREDENTIALS
# — or —
# (b) RULE THAT THE COUPLING ASSERTS ONLY THE CURRENT RELEASE'S OWN TAG, and have the
#     tag-reading cells re-derived once. THIS IS THE FIFTH CUT THE SAME CHOICE IS OWED AT.
#     The rule as written makes the repository's HISTORY an obstacle to its own next
#     release, and retiring a tag deletes the record of a SHIPPED version while the
#     registry keeps the release. (b) stops it recurring for one test-writer pass.
```

## STEP 3 — THE WORKFLOW PUBLISHES (FIVE PLATFORM ARTEFACTS FIRST, THEN THE MAIN PACKAGE)

**The tag's push triggers `.github/workflows/publish.yml`, which publishes through OIDC federation with no stored secrets — the five platform artefacts first, then the main package (`needs: platform`).** **NOTHING BUILDS THEM LOCALLY.**

```bash
gh run watch        # or the repository's Actions tab
```

## STEP 4 — VERIFY (READ-ONLY)

```bash
bash scripts/publish.sh --verify 0.5.0 --yes
for p in linux-x64-gnu linux-arm64-gnu darwin-x64 darwin-arm64 win32-x64-msvc; do
  printf '%-16s ' "$p"
  curl -s "https://registry.npmjs.org/@auspicion/provident-storeroom-js-$p" \
    | python3 -c "import sys,json;d=json.load(sys.stdin);print('latest:',d.get('dist-tags',{}).get('latest'),'| has 0.5.0:', '0.5.0' in d.get('versions',{}))"
done
curl -s https://registry.npmjs.org/provident-storeroom \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('main latest:',d.get('dist-tags',{}).get('latest'))"
```
**⟶ PARSE THE WHOLE BODY BEFORE READING A FIELD — a truncated-read pipeline reported three PUBLISHED packages as missing earlier today; the truncation was the instrument, not the registry.**

## STEP 5 — THE ACCEPTANCE TEST ONLY A CONSUMER PATH CAN TAKE

```bash
rm -rf /tmp/sr-050 && mkdir -p /tmp/sr-050 && cd /tmp/sr-050
npm init -y >/dev/null && npm install provident-storeroom@0.5.0
node -e "
import('provident-storeroom').then(m=>{
  const a=m.storeCreate({journalLength:64,listeners:[]});
  console.log('members:', Object.getOwnPropertyNames(a).length);              // EXPECT 13
  console.log('module names:', Object.keys(m));                              // EXPECT ['storeCreate']
  a.write(['k'],'mem',{v:'good'});
  let armed=false;
  a.addConstraint({address:['k'],id:'c1'},(ctx)=>!armed?true:(ctx.value&&ctx.value.v==='good'?true:{message:'only good'}));
  armed=true;
  try{ a.write(['k'],'mem',{v:'bad'}); }
  catch(e){ console.log('write:',e.status,'| log ids:', JSON.stringify((e.log||[]).map(x=>x.id))); }
  console.log('pairs:', JSON.stringify(a.constraints()));                    // EXPECT the pair listed
  try{ console.log('SEED AFTER:', JSON.stringify(a.read(['k'],'mem'))); }    // THE TEMPORAL STOP
  catch(e){ console.log('SEED GONE:', e.status); }
});"
# EXPECT: 13 members; the write REFUSED with its log naming the constraint; the pair listed by
# constraints(); AND THE SEED STILL READING good -- the overshoot that was a defect.
```

**THEN THE FLAT LOG CENSUS AND THE FORGERY SHAPES, both of which are declared behaviour a consumer meets:** every surface failure carrying `log` as an array, the constraint methods' `TypeError` carrying `log` with NO `status`, and a caller's own throw surfacing AS ITSELF (forged two-member, forged three-member, `TypeError`, bare string, `undefined`).

## WHAT IS NOT VERIFIED AND MUST NOT BE CLAIMED

- **`APP` layer is `NONE` (`DD-20`).** **Every green above is CHECKOUT evidence** (`import 'provident-storeroom'` self-references this tree); **the installed-bytes run is the only one that speaks for a consumer.**
- **`DEF-2026-10-16-O` remains open** — the retired-spelling conversion (`storeroom-publish/contract.md`'s `65`, `release.md`'s `39` live sites, the four trackers' `88`). **It does NOT gate the release: it moves bytes between spec documents and their own backups and touches no shipped artefact.**
- **`D-1` is now satisfiable BY DECLARATION ALONE** — the temporal stop removed the reversal's dependence on the log's `opId`, so declaring that id a RECORD is owed and no mechanism work remains.
- **`R16` and the `CLOSED` retention gap are unscoped** — one ruling, minor-shaped, not commissioned.
- **A LAWFUL BODY-LESS `cfg.constraints` ELEMENT GETS SILENCE BY DECLARATION** (`§2.12` clause (d), three clauses). **A clause declaring a SIGNAL is owed; if the remedy is a refusal it needs a code, colliding with the closed `16`.**
- **`typecheck/consumer-fixture.ts` does not exercise `log` or `constraints()`** — owed to its owner.
- **One of five targets** was exercised locally (linux·x64, Node `24.20.0`, non-root).
- **AND THE DOWNSTREAM PROJECT SHOULD RE-DRIVE `R6`/`R7`/`R13` BEFORE ANY WORK IS COMMISSIONED** — the failing constraint's NAME and the op id both cross in the thrown log, so those catalogue entries predate the facility.
