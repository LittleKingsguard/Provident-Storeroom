# `0.3.0` PUBLISH — PREPARED COMMAND LIST (2026-10-16, supervisor)

**STATUS: PREPARED, NOT EXECUTED.** `release.md §4.1` item 1, verbatim: *"NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTES."* **Every mutating command below is the ARCHITECT'S ACT and is listed for him to run, not run here.** `scripts/publish.sh` is a RUNBOOK, not automation: its `--bump`, `--tag` and `--verify` modes each refuse without `--yes`.

## PREFLIGHT — RUN NOW, READ-ONLY, AND IT REFUSES FOR THREE NAMED REASONS

```
bash scripts/publish.sh --check          # DRY=1; measures, writes nothing — this was RUN
```

**Measured output (supervisor, this pass):**
- `FAIL` **the working tree is dirty — 4 path(s)** — they were the gate-6 staging directories `scratch/g7-*`; **now gitignored and the tree is clean.**
- `FAIL` **HEAD differs from `origin/main`** — **push or pull first; this is an auth-bearing step (see step 0).**
- `FAIL` **the manifest reads `0.2.0`, which is TAGGED AND RELEASED, but HEAD is 93 commits past that tag.** The runbook's own words: *"A build from this tree would be stamped '0.2.0' with bytes the registry's '0.2.0' does not have. The tree claims a released version it is no longer."* — **resolved by the bump in step 1.**
- `ok` `cargo test --offline: 395 pass / 0 fail` · `ok` `cargo build --offline clean` · `ok` `Cargo.lock: 1 package` · `ok` **JS artefact built and staged** · `ok` `node --test (glob form): pass 499 / fail 0`.

## STEP 0 — AUTH AND ENVIRONMENT (THE USER'S STEPS — NO PASS MAY TAKE THESE)

**npm is NOT authenticated: `npm whoami` returns `E401 Unauthorized`.** **AND the npm log/cache directory is unwritable — `/home/ryanr/.npm/_logs` fails to open, so every `npm` command errors on log write after doing its work.** Fix the ownership first, once:

```bash
sudo chown -R 1000:1000 /home/ryanr/.npm         # REQUIRES YOUR SUDO — the EACCES/ENOENT root cause
```

Then authenticate (either one):

```bash
npm login --scope=@auspicion                      # REQUIRES YOUR CREDENTIALS
# — or headless / CI —
export NODE_AUTH_TOKEN=<your npm automation token>   # REQUIRES YOUR TOKEN
```

Confirm the identity and the registry before anything is published:

```bash
npm whoami --registry=https://registry.npmjs.org
npm view provident-storeroom versions --json
npm view @auspicion/provident-storeroom-js-linux-x64-gnu versions --json
```

Push the outstanding commits so HEAD matches `origin/main` (the preflight's second refusal):

```bash
git push origin main                              # REQUIRES YOUR CREDENTIALS
```

## STEP 1 — THE BUMP (ARCHITECT'S ACT — WRITES THE SIX MANIFEST VERSION CELLS)

**The version sites the supervisor verified as reading `0.2.0` are SIX, all line `3`:** `bindings/js/package.json` and the five `bindings/js/platforms/{linux-x64,linux-arm64,darwin-x64,darwin-arm64,win32-x64}/package.json`. **`publish.sh --bump` writes these plus the prose cells in `release.md`'s ELEVEN-cell set, and `§2.5`'s ORDER IS BINDING: (1) the carriage sentence names the version, (2) the ELEVEN version cells move TOGETHER, (3) the tag — cut and pushed ONLY after both.**

```bash
bash scripts/publish.sh --bump 0.3.0 --yes        # ARCHITECT'S ACT
git diff --stat                                   # verify: six manifests + the prose cells
```

**Then re-run the preflight — it must no longer refuse:**

```bash
bash scripts/publish.sh --check
```

## STEP 2 — BUILD AND STAGE THE NATIVE FOR EVERY TARGET — `DEF-2026-10-16-T`'s RELEASE SIDE

**THE NATIVE DOES NOT SHIP IN THE MAIN TARBALL. It ships as FIVE SCOPED PER-TARGET PLATFORM PACKAGES, and the main `5`-file pack is CORRECT BY DESIGN.** **UNTIL THESE ARE BUILT AND PUBLISHED AT `0.3.0`, NO CONSUMER RECEIVES THE REPAIRED NATIVE.** **Measured now: ONLY `bindings/js/build/Release/storeroom_js_binding.node` EXISTS (`973248` bytes, linux-x64); ALL FIVE `bindings/js/platforms/*/` DIRECTORIES HOLD NO STAGED `.node`.**

```bash
cargo build --release --offline --manifest-path bindings/js/Cargo.toml   # this host only
bash scripts/publish.sh --check                                          # its own build+stage step
```

**The other four targets need their own toolchains (or CI): `linux-arm64` (cross or an arm64 host), `darwin-x64` and `darwin-arm64` (macOS), `win32-x64-msvc` (Windows). Stage each artefact into its own `bindings/js/platforms/<target>/` beside that target's manifest.** **A target built by someone else's toolchain is not the same bytes — say which targets you actually built.**

## STEP 3 — PUBLISH (ARCHITECT'S ACT, IN THIS ORDER: PLATFORM PACKAGES FIRST)

**Publish the five platform packages before the main package**, so a consumer resolving the entry finds a matching per-target artefact at the same version:

```bash
cd bindings/js/platforms/linux-x64   && npm publish --access public   # ARCHITECT'S ACT, per target
cd ../linux-arm64                    && npm publish --access public
cd ../darwin-x64                     && npm publish --access public
cd ../darwin-arm64                   && npm publish --access public
cd ../win32-x64                      && npm publish --access public
cd /media/ryanr/Shared\ Files/Projects/Provident-Storeroom/bindings/js && npm publish --access public
```

## STEP 4 — TAG AND PUSH (ARCHITECT'S ACT — ONLY AFTER STEPS 1 AND 2)

```bash
bash scripts/publish.sh --tag 0.3.0 --yes      # commits, tags, pushes the tag
```

## STEP 5 — VERIFY (READ-ONLY POST-PUBLISH CHECKS)

```bash
bash scripts/publish.sh --verify 0.3.0 --yes
npm view provident-storeroom version
npm view @auspicion/provident-storeroom-js-linux-x64-gnu version
```

**Then re-take the installed-bytes verification that `DEF-2026-10-16-T` sets as the acceptance test — the run the gate-6 follow-up proved out, now against the PUBLISHED packages rather than a staged one:**

```bash
mkdir -p /tmp/sr-final && cd /tmp/sr-final
npm init -y >/dev/null && npm install provident-storeroom@0.3.0
node -e "import('provident-storeroom').then(m=>{const a=m.storeCreate({});console.log(Object.keys(a).length, a.read(['a','b','c'],undefined).status)})"
# EXPECT: 12 and AddressMalformed.  Then repeat the five-position address matrix:
# every rendering must carry the value's own words AND 'at the first argument' AND contain 'address' — NEVER `in ''`.
```

## WHAT IS NOT VERIFIED AND MUST NOT BE CLAIMED

- **`npm test` / `npm run typecheck` / `npm run build` DO NOT EXIST in this repository** (`DEF-2026-10-16-R`): **the BUILD and the TYPE-CHECK are unverified.** The validation instruments are the node suite and the three harnesses.
- **`bindings/js/index.d.ts` IS TYPE-CHECKED NOWHERE** (`DEF-2026-10-16-Q`) and it ships: every claim about the types is TEXTUAL.
- **`APP` layer is `NONE`** (`DD-20`): no `APP`-green is claimed on any evidence. **Every in-process instrument measures the CHECKOUT** (`import 'provident-storeroom'` self-references the tree).
- **One of five targets** was verified (linux·x64, Node `24.20.0`, non-root). Nothing speaks for the others, root, Windows, off-`glibc`, or an offline install.
- **`DEF-2026-10-16-S`**: two units declare the same eight property ids; a bare `P-` citation must carry its path until the architect rules.
