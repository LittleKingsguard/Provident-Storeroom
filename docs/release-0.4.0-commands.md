# `0.4.0` RELEASE — PREPARED COMMAND LIST (2026-10-17, supervisor)

**STATUS: PREPARED, NOT EXECUTED.** `release.md §4.1` item 1: *"NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTES."* **Every mutating command below is the ARCHITECT'S ACT.** `scripts/publish.sh` is a RUNBOOK — `--bump`/`--tag`/`--verify` each refuse without `--yes`, and `--tag` PRINTS the three tag commands rather than running them.

## WHERE THE TREE STANDS — SUPERVISOR-MEASURED THIS PASS

```
tree                 CLEAN (18 untracked scratch probes removed)
HEAD                 31 commits AHEAD of origin/main (all conversion parts landed and committed)
conversion           publish: contract.md 65 occurrences + release.md 39 live sites remain; trackers 88 (per-row judgement pass owed)
                     NONE of it gates the release: no shipped artefact is touched, and all four instruments held 499/256/100/12 after every part
version sites        6, ALL reading 0.3.1
tags                 v0.3.1 ONLY — locally and remotely (v0.3.0 and v0.1.2 retired)
node suite           499 tests / 499 pass / 0 fail        exit 0
greens.mjs           256 / 256 / 0                        exit 0
live-drive.mjs       100 / 100 / 0                        exit 0
file-tier            12 / 12 scenarios PASS               exit 0
npm test / typecheck / build / greens                     all exit 0
publish.sh --check   REFUSED for its own two pre-bump reasons ONLY:
                       FAIL the working tree is dirty — 18 paths   [NOW CLEANED]
                       FAIL HEAD differs from origin/main           [step 0]
                       FAIL 0.3.1 is TAGGED AND RELEASED while HEAD is 20 past it  [step 1]
                       ok  cargo 395/0 · cargo build clean · Cargo.lock 1 package
                       ok  JS artefact built and staged · node --test 499 pass / 0 fail
```

## WHY `0.4.0` AND NOT `0.3.2` — NEEDS YOUR FIAT

**`release.md`'s class table reads `PATCH` as *"a fix inside the declared surface"* and `MINOR` as *"a member ADDED".* THIS WORK ADDS SURFACE:**
- **the failure form gains a THIRD MEMBER (`{status, message, log}`) on every failure the surface throws** — and the architect has overridden the clauses that declared it *"EXACTLY two members, no third"* (`DD-12`, the `Refusal` struct);
- **a registration can now MUTATE the store** (`A135` (3): a constraint registered against an already-violating state has its repair ATTEMPTED, and the repair's op LANDS as a durable edit).

**BOTH ARE MEMBERS ADDED TO THE DECLARED SURFACE ⇒ `MINOR` ⇒ `0.4.0`.** **Declared by fiat as `0.3.0` was (`A128`).**

## WHAT `0.4.0` CARRIES

| # | Item | Defect / ruling | State |
|---|---|---|---|
| 1 | **The message log crosses on EVERY failure** — `{status, message, log}`, flat across arms, `[]` where no attempt exists, an ordinary own enumerable member | Ruling 1; `DEF-2026-10-17-D`'s line | **IMPLEMENTED, all four instruments green** |
| 2 | **A caller's own throw surfaces as itself** — the forged-status path closed; the discriminator is now a symbol-branded identity mark, because the log's mere presence became forgeable | Ruling 2 | **IMPLEMENTED (earlier)** |
| 3 | **The exports map carries a `types` condition FIRST** — modern-resolution consumers were silently getting `any` | `DEF-D` | **IMPLEMENTED, both typecheck legs green** |
| 4 | **The type-check instrument** (two legs, `28` refusals) and **the validation scripts** (`test`/`typecheck`/`build`/`greens`) | `DEF-Q`, `DEF-R` | **EXIST AND RUN, all exit 0** |
| 5 | **The boundary repairs** — a tier-side refusal no longer borrows the empty container; `null` and the register case covered | `DEF-A`, `DEF-E` | **SHIPPED IN `0.3.1`** |
| 6 | **The shipped README rebuilt** to the operative twelve-member surface | `DEF-B` | **SHIPPED IN `0.3.1`** |
| 7 | **The registration instant** — a constraint registered against a violating state is evaluated; with a repair registered, the repair is ATTEMPTED and its op LANDS | Ruling 3, `A135` | **SPEC LANDED; IMPLEMENTATION BLOCKED — SEE BELOW** |

## ⟶ THE ONE ITEM THAT IS NOT IN THIS RELEASE, AND WHY

**RULING 3 IS IMPLEMENTED NOWHERE. Its spec side is landed (`contract.md §7.3` (b) states 1/2/`3-bis`; the synthetic attempt; `A135` recorded), BUT THE IMPLEMENTATION IS BLOCKED ON THE MESSAGE ROUTE:** **the registration refusal's text must come from the ONE generator (`DD-52`), which is reachable only through the surface's addon — while the kernel is DELIBERATELY IMPORT-FREE with a closed five-item set.** **So the refusal is DECLARED-BUT-UNRENDERABLE.** **The architect's decision is owed: a declared kernel↔entry channel (which opens the five-item closure, as the log ruling opened the twelve-member one), or a phrase amended for this instant (a bounded row change).** **UNTIL THAT LANDS, `0.4.0` SHIPS RULINGS 1 AND 2 AND NOT 3.**

**AND `0.4.0`'S RELEASE NOTES MUST SAY SO PLAINLY: the release carries the log and the forgery fix; the registration-time evaluation is declared and not implemented.**

## STEP 0 — AUTH AND ENVIRONMENT (YOURS; NO PASS MAY TAKE THESE)

```bash
# npm is UNAUTHENTICATED today; the shared cache has root-owned files and fails EACCES.
npm whoami                                        # expect: E401 Unauthorized
sudo chown -R 1000:1000 /home/ryanr/.npm          # REQUIRES YOUR SUDO — the EACCES root cause
npm login --scope=@auspicion                      # REQUIRES YOUR CREDENTIALS
# — or headless —
export NODE_AUTH_TOKEN=<your npm automation token>   # REQUIRES YOUR TOKEN
npm whoami --registry=https://registry.npmjs.org
```

```bash
# HEAD is 20 commits ahead — the preflight's own second refusal.
git push origin main                              # REQUIRES YOUR CREDENTIALS
```

## STEP 1 — THE BUMP (YOUR ACT — THE SIX MANIFEST VERSION CELLS PLUS THE PROSE CELLS)

```bash
bash scripts/publish.sh --bump 0.4.0 --yes        # ARCHITECT'S ACT
# It will name the prose cells §2.5 item 3 owes; the suite names the ones that redden.
bash scripts/publish.sh --check                   # must stop refusing
```

## STEP 2 — COMMIT, THEN TAG (YOUR ACT — `--tag` PRINTS THESE; IT DOES NOT RUN THEM)

**`--tag` refuses a dirty tree, so the bump must be COMMITTED first. The tag's PUSH is what fires the publish workflow.**

```bash
bash scripts/publish.sh --tag 0.4.0 --yes         # prints the three lines below
git commit -am 'release v0.4.0'
git tag -a v0.4.0 -m 'v0.4.0'
git push origin main && git push origin v0.4.0    # REQUIRES YOUR CREDENTIALS — FIRES THE WORKFLOW
```

**⟶ EXPECT A COUPLING-CELL FAILURE IF `v0.3.1` REMAINS: the coupling reads EVERY tag the repository carries, so `v0.3.1`'s `0.3.1` against the manifest's `0.4.0` reddens both cells.** **The practice used twice now is to retire the previous tag locally AND remotely — and note that `v0.3.1` is a PUBLISHED release, so retiring it deletes the repository's record of it while leaving the registry untouched.** **The alternative is Option B from `docs/retire-v0.3.0-commands.md`: rule that the coupling asserts only the CURRENT release's own tag, and have the test writer re-derive the tag-reading cells — which stops this recurring at every cut.**

```bash
# if retiring, as at the last two cuts:
git tag -d v0.3.1                                 # local
git push origin :refs/tags/v0.3.1                 # REMOTE — REQUIRES YOUR CREDENTIALS
git fetch --prune --tags && git tag --list        # expect: v0.4.0 only
```

## STEP 3 — THE WORKFLOW PUBLISHES (FIVE PLATFORM ARTEFACTS FIRST, THEN THE MAIN PACKAGE)

**`v0.4.0`'s push triggers `.github/workflows/publish.yml`, which publishes through OIDC federation with no stored secrets — the five platform artefacts first, then the main package (`needs: platform`).** **NOTHING BUILDS THEM LOCALLY; only the linux-x64 artefact exists in this tree.**

```bash
gh run watch        # or the repository's Actions tab
```

## STEP 4 — VERIFY (READ-ONLY)

```bash
bash scripts/publish.sh --verify 0.4.0 --yes
for p in linux-x64-gnu linux-arm64-gnu darwin-x64 darwin-arm64 win32-x64-msvc; do
  printf '%-16s ' "$p"
  curl -s "https://registry.npmjs.org/@auspicion/provident-storeroom-js-$p" \
    | python3 -c "import sys,json;d=json.load(sys.stdin);print('latest:',d.get('dist-tags',{}).get('latest'),'| has 0.4.0:', '0.4.0' in d.get('versions',{}))"
done
curl -s https://registry.npmjs.org/provident-storeroom \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('main latest:',d.get('dist-tags',{}).get('latest'))"
```

**⟶ PARSE THE WHOLE BODY BEFORE READING A FIELD — a `curl | head -c N | python -c json.load` pipeline reported three PUBLISHED packages as *"Not found"* earlier today; the truncation was the instrument, not the registry.**

## STEP 5 — THE ACCEPTANCE TEST ONLY A CONSUMER PATH CAN TAKE

```bash
rm -rf /tmp/sr-040 && mkdir -p /tmp/sr-040 && cd /tmp/sr-040
npm init -y >/dev/null && npm install provident-storeroom@0.4.0
node -e "
import('provident-storeroom').then(m=>{
  const a=m.storeCreate({journalLength:64,listeners:[]});
  console.log('members:', Object.getOwnPropertyNames(a).length);           // EXPECT 12
  console.log('module names:', Object.keys(m));                            // EXPECT ['storeCreate']
  a.write(['a'],'mem',{v:1});
  for (const [label,v,t] of [['null tier',['a','b','c'],null],
                             ['undef tier',['a','b','c'],undefined],
                             ['missing key',['a','b','c'],'mem']]) {
    let r; try{ r=(t===undefined)?a.read(v):a.read(v,t); }catch(e){ r={status:e.status,message:e.message,log:e.log}; }
    console.log(label, r.status,
      '| names address:', (r.message||'').includes(\"'address'\"),
      '| empty container:', (r.message||'').includes(\"in ''\"),
      '| log is array:', Array.isArray(r.log));                             // EXPECT true everywhere
  }
});"
# THEN THE FLAT READING'S OWN CENSUS — every failure the surface throws must carry three members:
node -e "
import('provident-storeroom').then(m=>{
  const a=m.storeCreate({journalLength:64,listeners:[]});
  const shapes=[['store refusal',()=>a.read(7)],['absent addr',()=>a.read(['nope'])],
                ['cfg refusal',()=>m.storeCreate({journalLength:64,listeners:{}})],
                ['register TypeError',()=>a.register('x',()=>{})],
                ['constraint TypeError',()=>a.addConstraint({address:['k'],id:'i'},5)]];
  for (const [l,f] of shapes){ try{ f(); }catch(e){ console.log(l, JSON.stringify(Object.keys(e).sort())); } }
});"
```

**AND RE-RUN THE EXTENDED LIVE BATTERY AGAINST THE INSTALLED BYTES** — the shapes the boundary and log rulings touched — **since every green above is CHECKOUT evidence and `APP` layer is `NONE`.**

## WHAT IS NOT VERIFIED AND MUST NOT BE CLAIMED AT THE RELEASE

- **`APP` layer is `NONE` (`DD-20`). NO `APP`-GREEN EXISTS ON ANY EVIDENCE.** **Every in-process instrument measures the CHECKOUT** (`import 'provident-storeroom'` self-references this tree).
- **RULING 3 IS NOT IN THIS RELEASE** — declared law, blocked implementation.
- **`DEF-2026-10-16-O`** remains open — the retired-spelling re-close needs an UNCAPPED enumeration (`516` sites in four paths; `1,088` across `docs/`).
- **`DEF-2026-10-16-S`** remains a DECISION AWAITING A RULING — two units declare the same eight property ids; the contract itself asks for *"a fresh ruling on the row-id family"*.
- **`DEF-2026-10-17-G`** (silent non-repair) — may be subsumed by ruling 3's attempted-repair path; **VERIFY rather than assume, and it cannot be settled until ruling 3 is implemented.**
- **The build and the type-check now EXIST as scripts** but no release act has run them; the workflow's own build is the first real one.
- **One of five targets** was exercised locally (linux·x64, Node `24.20.0`, non-root).
- **The `<mismatch clause>` per-instant message** for `#16` remains `OWED` to the architect; **the route's ceiling** (a nested repair attempt's own log) likewise.
- **`typecheck/consumer-fixture.ts` does not exercise the new `log` member** — a `.log: LogEntry[]` read plus a seventh-member refusal is owed to its owner.
