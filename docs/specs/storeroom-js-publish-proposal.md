# PROPOSAL — publishing the current Node-API build for downstream user access

**Filed 2026-10-11 by the supervisor, on the architect's instruction: *"proceed with package planning on current build."*** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, licenses no code task, admits no unit row. **Gate state: GATE 1 OPENED, NOT PASSED** — the four steps run on THIS FILE, then the architect's go-ahead. **Scope: the Node-API build that exists today; the WASM/browser carrier is `P-4`, parked, and is NOT this plan's subject.**

## §1. THE INSTRUCTION, VERBATIM

> File as a pending feature then proceed with package planning on current build

## §2. WHAT EXISTS, MEASURED (so the plan starts from facts, not intentions)

**`bindings/js/package.json`** — name `@provident-storeroom/js`, version `0.1.0`, `"type": "module"`, `license: AGPL-3.0`, `engines: { node: ">=18.0.0" }`, one ESM `exports` arm (`"." → import: "./index.mjs"`), a `files` allowlist (`index.mjs`, `README.md`, `build/Release`), and **five `optionalDependencies` slots at `0.1.0`** (`js-linux-x64-gnu` · `js-linux-arm64-gnu` · `js-darwin-x64` · `js-darwin-arm64` · `js-win32-x64-msvc`).
**The loader** (`index.mjs:69–75, 117`) — `createRequire(import.meta.url)` and **one hard-coded module-relative path**: `join(dirname(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node')`. **No fallback**: `A75`'s declared absent-addon form (`FilePathUnreachable`, no instance) is the only answer when the artefact is missing.
**The artefact** — `build/Release/storeroom_js_binding.node`, **`sha256:cf088d91…`, `957,904` bytes**, gitignored/untracked by the project's own convention (the digest is the only durable tie, and it is on file in both run records).
**The verification** — store root `379` · sibling crate `223` · JS leg `113` · blind set `240/240` · live battery `91/91` (layer `LIVE/ASSEMBLED PACKAGE`, `APP` `NONE`) · both narrowed correctness gates exit `0` · `clippy --lib` clean · `rustfmt` clean · root manifest byte-identical.
**What does NOT exist:** any CI (no `.github/`, no Makefile, no `.npmrc`); any platform package; any resolution rule; any `LICENSE` inside the package directory; any `.d.ts`; any `repository`/`homepage`/`bugs`/`keywords`; any tarball smoke test. **NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE — and the live battery loads it IN PLACE from the repository.**

## §3. THE FILING'S BOUNDS

1. **It licenses no code task and admits no unit row.** Nothing is built, published, or versioned by this filing.
2. **It is not the contract.** Every clause the work needs is owed at gate 2 by `role_spec_writer`, in the unit's own directory.
3. **The store does not move.** This is the sibling crate's and the package's distribution surface; `src/**`, `tests/**` and the store's `379` are untouched by the plan.
4. **The WASM/browser carrier is out of scope** (`P-4`, parked) — this plan publishes the Node-API build that exists.
5. **Nothing was run by this filing beyond read-only inspection** — no `npm`, no `cargo`, no `node`, no publish, no pack.

## §4. THE GAPS, EACH WITH ITS DISPOSITION — and the ONE SEMANTIC DECISION

| # | The gap | Kind | Disposition |
| --- | --- | --- | --- |
| **1** | **HOW THE ENTRY FINDS THE RIGHT BINARY IN A PUBLISHED INSTALL** — the loader uses a module-relative path and nothing resolves the five platform packages | **SEMANTIC — THE ONE DECISION** | **A contract clause.** The candidates: **(i) platform-package-first, local-path fallback** — `require('@provident-storeroom/js-' + platformKey)` where the package exists, else the local path, else the declared absence; **(ii) platform-package-STRICT** — no local path in a published install, so the absence arm is the only answer elsewhere; **(iii) one package, no matrix** — ship per-platform tarballs (a different distribution shape). **SUPERVISOR'S RECOMMENDATION: (i)**, because it keeps the in-place developer loop working while making the published path real, **and it names ONE failure arm** (the platform's package missing ⇒ the declared absent-addon form). **The clause must also fix the platform→package mapping** (`process.platform` + `process.arch` + glibc-vs-musl detection, with the musl case's answer declared rather than guessed). |
| **2** | **THE FIVE PLATFORM PACKAGES DO NOT EXIST** | mechanics | **BUILD AND PUBLISH THEM.** Each carries its own `.node`, its own `package.json` with **`os`/`cpu` fields** (so npm installs exactly one), the **licence text**, and a version that tracks the main package. |
| **3** | **CI: THE MATRIX** | mechanics | **A tag-triggered workflow** building the five targets and publishing them **before** the main package, with **npm provenance** (OIDC). The repository has **no CI at all** today, so this is the plan's first new artifact. |
| **4** | **`files` SHIPS `build/Release`** | mechanics | **DROP IT FROM THE MAIN PACKAGE** once the matrix exists — otherwise a publish from one machine ships ONE platform's binary into a package that claims five. |
| **5** | **NO `LICENSE` IN THE PACKAGE DIRECTORY** | mechanics + licence | **ADD IT**, and **reconcile the spelling** (`AGPL-3.0` in `package.json` vs `AGPL-3.0-or-later` in the crate) in one pass. |
| **6** | **NO TYPES** | mechanics | **A `.d.ts`** + a `types` field. The surface is eight verbs, an instance member set of `{ register, on, off }`, and a closed fifteen-member failure set — small enough that a hand-authored declaration is the honest option. |
| **7** | **NO PACKAGE METADATA** | mechanics | `repository` · `homepage` · `bugs` · `keywords` · a long `description`. |
| **8** | **SCOPE OWNERSHIP** | **DECISION** | Publishing `@provident-storeroom/js` needs **that npm org/scope** — or a rename. **The architect's call.** |
| **9** | **VERSION + VISIBILITY OF THE FIRST RELEASE** | **DECISION** | `0.1.0` as filed; public or restricted; and **the semver policy for a store whose surface is governed by rulings.** The architect's call. |
| **10** | **NO INSTALL-TIME PROOF** | **EVIDENCE GAP — THE PUBLISH'S OWN ACCEPTANCE** | **A TARBALL SMOKE TEST**: `npm pack` → install into a **clean directory** → import through a real `node_modules` → run one real flow (construct, write, read, a boot on the same path, a listener firing, `off`) → **and assert the DECLARED absent-addon failure on a platform with no prebuild**. **This is the first evidence the package works AS SHIPPED rather than in place — and it is still NOT an `APP`-green, because no consuming application is involved.** |
| **11** | **THE OPEN CONTENT ITEMS** (the `AddressArg` row 8 reading · `package.md`'s README-side member sentence · `DEF-17`'s tracker row) | content | **Do NOT block a publish**; each is named in the trackers with its owner. |

## §5. THE PLAN — the project's own topology

| # | Phase | What it does | Owner |
| --- | --- | --- | --- |
| **Q0** | **THIS FILING** | gate 1's four steps on this file; the architect's go-ahead plus gaps 8 and 9's lines | the roles, then the architect |
| **Q1** | **THE CONTRACT** | the resolution clause (gap 1's decision), the platform→package mapping, the absence arm's per-platform reading, the version/distribution policy, and the smoke test as the acceptance criterion — in the unit's own directory, dated | `role_spec_writer` |
| **Q2** | **THE PLATFORM PACKAGES** | five manifests + a build script's declaration; **their code is the SAME crate built per target** — no new Rust | `role_implementer` |
| **Q3** | **THE ENTRY'S RESOLUTION** | the platform-package-first rule implemented, with the local path kept for the in-place loop | `role_implementer` |
| **Q4** | **THE MAIN PACKAGE'S SURFACE** | `files` (minus `build/Release`), `LICENSE`, `.d.ts`, metadata | `role_implementer` |
| **Q5** | **THE RED SET** | the resolution rule's drives: each platform key mapping to its package; the absence arm per platform; **and the tarball smoke test as a cell** | `role_test_writer` |
| **Q6** | **CI** | the tag-triggered matrix + provenance | `role_implementer` |
| **Q7** | **THE BLIND GREENS + THE LIVE BATTERY** | the set re-run against the packed tarball, and a new live scenario installing the **packed** artifact into a clean directory — **a new instrument: an install, not an in-place load** | `role_blind_test_writer`, `role_live_scenario_runner` |
| **Q8** | **THE DOC GATES + THE TRIO** | proofread, per-unit review, and the four legs over the packed tree | the doc roles, the supervisor |
| **Q9** | **THE FIRST PUBLISH — THE ARCHITECT'S OWN ACT** | no pass publishes; the publication itself is his act, with the version and visibility he names | the architect |

## §6. THE BLAST RADIUS

**Moves:** the package's `package.json` (files, licence, types, metadata, the optional deps' new versions) · the entry's resolution code · **five new package directories** · **a CI workflow** · the unit's contract (the resolution clause and the distribution policy) · the acceptance layer (the smoke test as its criterion) · the records. **Does NOT move:** the store, its crate, its `379`, its contract · the crossing core · the eight-verb surface and the instance's member set · the ledger (**a distribution change to an existing row adds no unit**).

## §7. PROVENANCE

**READ AT ITS OWN BYTES (this pass):** `bindings/js/package.json` · `bindings/js/index.mjs`'s loader (`:69–75`, `:117`) and its export list · `bindings/js/README.md`'s declared build step · `docs/specs/storeroom-js/package.md` (`§1`–`§4`, the realm claim, the handoffs, the prebuild/publish clauses) · `docs/specs/storeroom-js/acceptance.md` · the JS unit's `DONE` row and the trackers · `docs/pending.md`'s new `P-4` (the WASM/browser park) · and the runs' recorded figures and artefact digest. **NOTHING WAS PUBLISHED, PACKED, BUILT OR RUN BEYOND READ-ONLY INSPECTION.**

## §8. THE ARCHITECT'S RELEASE RULING OF 2026-10-11 — public, `provident-storeroom`, `0.1.0`

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> public at provident-storeroom:0.1.0

**THE RULING, TRANSCRIBED AS `A82` — and it answers `§4`'s gaps 8 and 9, with a RENAME the filing did not propose.**

| # | The question | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A82`** | **`§4` gap 8 (the npm scope/name) and gap 9 (the first release's version and visibility)** | ***"public at provident-storeroom:0.1.0"*** | **(1) VISIBILITY: PUBLIC** — a public registry release, not a restricted one. **(2) THE NAME: `provident-storeroom` — UNSCOPED.** That is **NOT** the `package.json`'s filed `@provident-storeroom/js`, so **the ruling carries a RENAME**, and it **removes the scope-ownership problem** the filing listed as a decision: an unscoped name needs only to be unclaimed on the registry. **(3) THE VERSION: `0.1.0`** — the filed version stands as the first release. |

**ITS DERIVED CONSEQUENCES, EACH NAMED SO IT IS NOT DISCOVERED LATER:**
1. **THE RENAME'S BLAST RADIUS.** `bindings/js/package.json`'s **`name`** and **the five `optionalDependencies` KEYS** · every cell and record that prints the old scoped name (`docs/specs/storeroom-js/**`'s package cells, the proposal's `§2`/`§4` tables, the run records) · **and nothing else**: the artefact and its digest are name-independent, and the store is untouched.
2. **THE PLATFORM PACKAGES' NAMES ARE DERIVED, NOT RULED** — under an unscoped main name the convention gives **`provident-storeroom-linux-x64-gnu` · `-linux-arm64-gnu` · `-darwin-x64` · `-darwin-arm64` · `-win32-x64-msvc`** (the same five targets, the scope simply dropped). **THIS IS THE SUPERVISOR'S READING, CARRIED AS A PRICED `DECLARED-DEFAULT`** whose reversal is one line; the ruling names the main package's identity and does not name theirs.
3. **`--access public` IS MOOT FOR AN UNSCOPED NAME** (publicity is the default for an unscoped package), so the publish command needs no access flag — worth stating so a later pass does not add one as if it were required.
4. **THE SEMVER POLICY REMAINS OPEN** by the ruling's silence: `0.1.0` is fixed as the FIRST release, and what a **breaking change** means for a surface governed by rulings (a major bump per ruling that changes an admitted class? a minor per added member?) is **a priced `DECLARED-DEFAULT`**: **minor for an added member or a new clause that does not change an admitted value's answer; major for a change to the admitted taxonomy, the closed fail set, or any clause that makes a previously valid call refuse.** Reversal: one line, and it is the distribution's own policy rather than the store's semantics.
5. **AND ONE THING THIS RULING DOES NOT ANSWER — `§4` GAP 1, THE ONE SEMANTIC DECISION: how the entry finds the right binary in a published install.** The filing's recommendation stands unchallenged (**platform-package-first, local-path fallback, ONE failure arm**), and **it is carried as the gate's input**; a different choice in one line replaces it.
## §9. THE ARCHITECT'S RESOLUTION RULING OF 2026-10-11 — platform package first, local path as the developer fallback

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Proceed with recommendation

**THE RULING, TRANSCRIBED AS `A83` — it closes `§4` gap 1, the filing's ONE semantic decision.**

| # | The question | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A83`** | **`§4` gap 1 — HOW THE ENTRY FINDS THE RIGHT BINARY IN A PUBLISHED INSTALL** (candidates: platform-package-first with a local-path fallback · platform-package-strict · per-platform tarballs) | ***"Proceed with recommendation"*** | **PLATFORM-PACKAGE-FIRST, LOCAL-PATH FALLBACK, ONE FAILURE ARM.** The entry resolves **the platform package for this runtime first** (`provident-storeroom-<platform>-<arch>[-<libc>]`, per `A82`'s derived naming); **failing that, the module-relative `build/Release/storeroom_js_binding.node`** (so the in-place developer loop is unchanged); **failing both, the DECLARED ABSENT-ADDON FORM** (`FilePathUnreachable`, no instance, no fallback) — **exactly one arm, so the failure surface does not widen.** **AND THE MAPPING IS FIXED BY THE SAME RULING: `process.platform` × `process.arch` selects the key, and the MUSL case's answer is DECLARED rather than guessed** — a runtime whose libc is musl and for which no package exists falls to the local path and then to the same declared absence, **never to a guessed binary**. |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE RESOLUTION RULE IS A CONTRACT CLAUSE, NOT A CODE DETAIL:** the order (platform package → local path → declared absence), the key's composition, the musl answer, and the statement that **the absence arm is the ONLY failure arm** — all owed at gate 2, with the drives that make each rung fail-able at `Q5`. **(2) THE IN-PLACE LOOP IS PRESERVED BY CONSTRUCTION:** the local path stays the second rung, so every existing battery (the `113` JS cells, the `240` blind assertions, the `91` live assertions) keeps loading the artefact it loads today, **and the tarball smoke test is what exercises rung one**. **(3) THE `HO-1`…`HO-7` HANDOFFS ARE UNTOUCHED: this ruling resolves HOW A BINARY IS FOUND, not WHICH REALMS ARE CLAIMED** — the realm claim stays `A70`'s Node ESM alone.
## §10. THE FORM QUESTION ELABORATED — amendment, new unit, or release operation

**<⟶ APPENDED, DATED. This section ELABORATES the form question the gate's step 1 framed (`F-22`'s limbs) and step 2 named as *"the sharpest expected disagreement"* with step 3. It takes NO ruling.**

**WHAT THE FORM CONTROLS, IN THIS PROJECT'S OWN TERMS — six things, and each is a different answer under the three limbs:**
1. **WHICH GATES RUN.** An **amendment** runs the unit's gates *for the amendment* — the shape the listener amendment took: its own proposal, the four review steps, contract cells amended annotate-beside, its own red set, green, adversarial, blind, live, the doc gates, the trio — landing a **`DONE` row** (a row, not a unit). A **new unit** runs the **full topology from gate 1**, on a filing of its own, with its own directory and its own `DONE` row.
2. **THE REGISTER — THE SHARPEST CONCRETE DIFFERENCE.** The JS unit's register is at its cap (`8 ≤ 8`), so **an amendment must RE-DERIVE a row** (`P-TP-7`'s `S-LOAD`/`S-ONE-ADDON`) and may not mint a ninth. **A new unit starts with its own `≤ 8` budget**, so the resolution rule could live as **its own failable row** — which is what the resolution rule wants, since it is a *new state machine* over the load path.
3. **THE RED SET'S OWNERSHIP AND LOCATION.** The JS unit's lives under `bindings/js/**` and is authored from the contract alone (`DD-19`); a new unit's is its own.
4. **THE LEDGER.** An amendment is a **row** — the census is unchanged (`2 DONE / 0 open`). A new unit **moves it**.
5. **THE ACCEPTANCE LAYER.** An amendment **inherits** the unit's two declared layers (`ENVELOPE/PURE`, `LIVE/ASSEMBLED PACKAGE`). A new unit may **declare a new one** — and **the install-time verification the plan owes has NO layer label today** (`K11`: by `DD-20`/`DD-33`/`AR-10` its figure is VOID as authored). **SO IF AN INSTALL-TIME LAYER IS WANTED, THE FORM THAT CAN DECLARE IT CLEANLY IS THE NEW UNIT** (or an amendment that adds a layer to a landed layer vocabulary — a bigger change than any clause here).
6. **THE `DONE` ROW'S SHAPE.** An amendment's row sits in `## DONE` labelled as an amendment's; a unit's row is a unit's.

**THE THREE LIMBS, EACH ELABORATED WITH ITS PRICED COST.**

**(i) A BOUNDED AMENDMENT OF `U-STOREROOM-JS` — the limb `DD-26`'s own cell points at** (*"a rename with a `package.json` edit and a citation sweep and no behaviour change"*, *"available with a bounded amendment of `docs/specs/storeroom-js/`"*). **WHAT IT FITS BEAUTIFULLY: `F1`, THE RESOLUTION RULE — a rule about the package's OWN DECLARED BEHAVIOUR (how the entry finds a binary, which states it can reach, which arm answers a failure), owned by cells the unit already has (`surface.md §2.5` item 5, `package.md §1.2`/`§1.4`, `contract.md`'s `P-TP-7`/`S-LOAD`), and verifiable IN PLACE with the battery that already exists.** **WHAT IT FITS BADLY: `F2`'s distribution facts and `F3`/`F4`'s machinery and evidence** — those are not the unit's *behaviour*. **ITS COST, PRICED: the register row must be RE-DERIVED (never a ninth); the rename's two-home relocation discipline applies** (`DD-26`, `§3.1`/`§3.2`, with a same-pass backup per `DEF-14`); **the two blind assertions falsified by the rename must be re-issued by their own author role** (`K5`); **and it cannot declare an install-time layer** without amending a landed layer vocabulary.

**(ii) A NEW UNIT.** **PRECEDENT: `U-STOREROOM-JS` ITSELF WAS MADE A NEW UNIT by step 3 of its own gate** — over an amendment of the store's contract — **for exactly the reasons that would apply here: a new CARRIER, a new DIRECTORY, a REGISTER BUDGET of its own, and its own RED SET.** **WHAT IT FITS: `F2`+`F3` as a governed surface — "a published, installable package with five platform artefacts" is a genuine ARTIFACT with its own contract (the resolution order, the key set, the five manifests, the `files`/licence/`.d.ts`/metadata decisions, the CI's inputs, the tag and provenance rules) — AND `F4`, because a new unit may DECLARE ITS OWN ACCEPTANCE LAYER, which is the one thing `K11` says is missing.** **ITS COST, PRICED: a FULL GATE 1 on a new filing (four steps and the architect's go-ahead), a new pattern-C directory whose contract must be exhaustive enough for a TestWriter to derive every state and fail-state — i.e. THE RESOLUTION TAXONOMY, THE KEY SET, THE MANIFEST CONTENTS, THE CI INPUTS, THE `.d.ts` SHAPE AND THE SMOKE TEST ALL BECOME CONTRACT CLAUSES, MUCH OF IT MACHINERY RATHER THAN SEMANTICS — plus its own red set, its own gates, and A LEDGER MOVE.** **And one honest risk: a unit whose contract is mostly build-and-publish mechanics is a unit that will be amended by every toolchain change.**

**(iii) A NON-UNIT OPERATION — a release act with a checklist.** **PRECEDENT AND AUTHORITY: `Q9` says *"no pass publishes; the publication itself is his act"*, and this project's rulings already treat releases as the architect's** (`DD-42`: *"no publication happens from an untagged commit"*; `A82` names the release's identity). **WHAT IT FITS: `F4` and the release acts themselves — claiming six names, creating a tag, publishing six artefacts, verifying the published shape — WHICH ARE OPERATIONS, AND THE TOPOLOGY HAS NO GATE FOR THEM (NOR SHOULD IT: A PASS CANNOT AND MUST NOT PUBLISH).** **WHAT IT DOES NOT FIT: `F1`'s RULES, WHICH ARE CONTRACT AND NOT OPERATION.** **ITS COST, PRICED: NO PASS OWNS THE VERIFICATION** — so unless `F4`'s evidence is given a declared layer and instrument, the release operation would end with **an unverified published artifact**, which is the state `K11`, `K12` and `K10` already describe.

**SO THE HONEST STRUCTURE IS A SPLIT, AND IT IS NOT A COP-OUT — THE THREE PARTS HAVE DIFFERENT OWNERS BY THIS PROJECT'S OWN RULES:**

| The part | Its nature | The form that owns it | Why |
| --- | --- | --- | --- |
| **`F1` the resolution rule** | **CONTRACT — the package's declared behaviour** | **a bounded amendment of `U-STOREROOM-JS`** (row re-derived; no ninth) | it changes cells the unit already owns, is falsifiable **in place**, and needs **no registry, name, version, CI or publish** |
| **`F2` the identity and distribution facts** | **CONTRACT about what is published** | **an amendment of the same directory** — or **the content of a new unit's contract** | `DD-26`/`§3.1`/`§3.2` own the cells; the two-home relocation discipline applies either way |
| **`F3` the machinery, `F4` the evidence, and the release** | **OPERATION** | **the architect's**, with a checklist and a **declared verification layer** | no pass publishes; and an install-time layer can only be declared by a form that owns an acceptance layer |

**THE SUPERVISOR'S RECOMMENDATION, PRICED AND REVERSIBLE:** **(1) RUN STEP 3 ON `F1` ALONE — the resolution rule as a BOUNDED AMENDMENT of the JS unit's directory** — because it is the separable core, `DD-26`'s own cell points at the amendment form, it needs no registry state or name, and it is the only part the existing instruments can falsify. **(2) HOLD `F2`–`F4` FOR A NEW UNIT IF AND WHEN THE ARCHITECT WANTS THE PUBLISHED SURFACE TO BE A GOVERNED ARTIFACT** — with its own contract, its own register row for the resolution rule, and its own declared install-time layer — **and treat the release acts as his in every reading.** **(3) CORRECT THE FILING'S FOUR REFUTED CELLS FIRST** (`F-1`/`F-2`'s licence dispositions against `DD-43`/`§3.4`, `F-3`'s rename radius, `F-6`'s CI-as-new), **since step 3 will read whichever artifact it is given and those cells are wrong in all three limbs.**

**AND THE ONE QUESTION THAT DECIDES BETWEEN (i)-AMENDMENT AND (ii)-NEW-UNIT, PUT PLAINLY SO IT CAN BE ANSWERED IN ONE LINE: *is a published package a governed ARTIFACT of this project, or a delivered ACT of it?*** **If it is an artifact, the new unit is its honest home — and its register can hold the resolution rule rather than re-deriving the JS unit's full row.** **If it is an act, the amendment carries the rules and the architect carries the release.**
## §11. THE ARCHITECT'S LICENCE ACT OF 2026-10-11 — the copyright line signed, and one placeholder that remains

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**HIS OWN ACT, RECORDED: commit `e0704e7` (*"License signing"*) sets the repository `LICENSE`'s AGPL appendix to `Copyright (C) 2026 Auspicion Innovations LLC` — ONE LINE, ONE FILE, HIS HAND.** **That CLOSES `K7`(c)'s COPYRIGHT HALF: the template's `<name of author>` placeholder is gone, so a public release no longer ships an unnamed copyright holder.** **AND IT ANSWERS `§4`'s gap 5's third limb and the third question put to him at `§10`'s close: THE COPYRIGHT-HOLDER LINE IS HIS ACT, AND IT IS TAKEN.**

**AND ONE PLACEHOLDER REMAINS, NAMED SO A PUBLIC RELEASE DOES NOT SHIP IT: `LICENSE:632` still reads `<one line to give the program's name and a brief idea of what it does.>` — the AGPL appendix's OWN programme-name-and-purpose line, which the same commit did not fill (it signed line 633, the copyright line, and left 632 as the template's).** **The licence's own text makes it a required completion of the notice any interactive program is asked to carry; a released artefact with it unfilled would be shipped half-noticed.** **IT IS FLAGGED, NOT FILLED: the line names the program, which is a distribution identity (`A82` names the package `provident-storeroom`), so filling it is the same class of act as the copyright line — the architect's, or one he authorises.** **AND THE OTHER TWO LIMBS OF `K7` ARE UNTOUCHED BY THIS COMMIT: whether each of the FIVE PLATFORM PACKAGES carries a licence of its own, and whether `bindings/js/LICENSE` is added — which is `DD-43`'s REFUSED arm and would be the FIFTH declaration site `package.md §3.4` item 3 makes a finding.**
**END OF THE PROPOSAL. §1 is the instruction. §2 is what exists. §3 bounds the filing. §4 enumerates the gaps with the one semantic decision priced. §5 is the phase plan. §6 is the blast radius. §7 is the provenance.**
