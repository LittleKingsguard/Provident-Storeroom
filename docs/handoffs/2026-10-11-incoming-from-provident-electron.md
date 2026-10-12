# HANDOFF TO THE SIBLING PROJECT — `Provident-Storeroom`

## The published `provident-storeroom@0.1.1` refuses its own platform artefact at load, and the construction-time file probe can pass over a path the application cannot write

| | |
| --- | --- |
| **From** | `Provident-Electron` (the consumer), the `U-STOREROOM-BINDING` gate-1 pass |
| **To** | the `Provident-Storeroom` repository (the package's own home) — `bindings/js/` (the JS package + load path) and `src/` (the store's construction probe) |
| **Dated** | `2026-10-11` |
| **Sibling revision examined** | `4143be8` (`docs: an Electron integration guide for the store, written to carry past the demo case`) |
| **Published artefact under test** | `provident-storeroom@0.1.1` + `@auspicion/provident-storeroom-js-linux-x64-gnu@0.1.1`, installed from the registry on `linux-x64-gnu` |
| **Severity** | **ITEM 1 — BLOCKING: the package cannot be used by any consumer.** ITEM 2 — MEDIUM (a contract violation with a late-surfacing failure). ITEM 3 — LOW (diagnosability). |
| **Status here** | **filed, not patched.** This repo does not modify the package (`AGENTS.md` item 7). **The finding was REPAIRED NOWHERE: no patch, no stub, no monkey-patch, no vendored copy — in this repo or in the sibling's.** |
| **Delivery** | This file is the canonical copy (version-controlled here). A byte-identical delivery copy was placed in the sibling tree at **`Provident-Storeroom/docs/handoffs/2026-10-11-incoming-from-provident-electron.md`** — **untracked at the sibling's `4143be8`**, so the sibling's own pass owns its commit and its filing (no sibling spec, tracker or source file was touched by this delivery). |

**THE ONE-LINE ANSWER: the five platform packages shipped at `0.1.1` carry an addon whose `version()` answers `"0.1.0"`, and the load path's version read compares that self-report against the package's own declared `0.1.1` for exact string equality at rung one, where a mismatch is the single declared failure arm **with no fallback to rung two** — so `require`s succeed, the entry resolves, every verb is exported, and every call throws `FilePathUnreachable`.**

---

## §0. WHAT WE ASK OF YOU

1. **Rule the contradiction in §1.5** — your own `docs/specs/storeroom-publish/release.md` §2.2 declares the crate's version **deliberately independent** of the package version, while `docs/specs/storeroom-publish/acceptance.md` §3.1 row `4` asserts that **the version read does not refuse the released artefact**. Both cannot hold for the bytes you published. Pick one side and land it (§2 prices both).
2. **Repair ITEM 2** (§3) — `src/store.rs`'s `path_is_reachable` inspects the **parent's metadata mode bits** on the absent-file arm, so a directory the process cannot write (measured: `/usr/bin`, root-owned `0755`, uid `1000`) **passes the dry run**, contradicting `A52`/`A55`/`DD-40`'s own rule that write access is *required* and that reachability means *the application can write it successfully*.
3. **Consider ITEM 3** (§4) — one clause is emitted for two unrelated failures (the addon's load path and the store's file path), so a consumer cannot tell a packaging blocker from a bad `filePath`.

**A minimal acceptance battery that would close all three is §6.**

---

## §1. ITEM 1 — THE RELEASED ARTEFACT IS REFUSED BY THE LOAD PATH (BLOCKING)

### §1.1 The observed state

On a clean `npm install provident-storeroom` in an empty directory (`0.1.1`, `linux-x64-gnu`):

- `import('provident-storeroom')` **succeeds** and exports exactly the eight declared verbs — `storeCreate`, `read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`;
- **every call to `storeCreate(...)` throws**, whatever its configuration:

```
{ status: 'FilePathUnreachable',
  message: "'@auspicion/provident-storeroom-js-linux-x64-gnu' is not reachable at construction, the path must exist or the application must be able to write it" }
```

**The five configurations probed, all identical** — the failure is at **load**, not at the file probe, and the message's subject (a **package name**, not a filesystem path) is the discriminator:

| `storeCreate` configuration | Outcome |
| --- | --- |
| `{ journalLength: 8, listeners: [] }` — **no `filePath` at all** | throws `FilePathUnreachable`, subject `@auspicion/provident-storeroom-js-linux-x64-gnu` |
| `filePath: '/tmp/nope-dir-xyz/store.json'` (absent parent) | identical throw |
| `filePath: '/tmp/psr-store-new.json'` (writable parent, file absent) | identical throw |
| `filePath: '/usr/bin/psr-probe.json'` (root-owned directory) | identical throw |
| `filePath: '/tmp'` (a directory) | identical throw |

### §1.2 The reproduction

```js
// in an empty directory
// npm install provident-storeroom
const m = await import('provident-storeroom');
m.storeCreate({ journalLength: 8, listeners: [] });   // throws the object above
```

Two control reads, both successful:

```js
const { createRequire } = require('node:module');
const require_ = createRequire(__filename);
require_('@auspicion/provident-storeroom-js-linux-x64-gnu').version();   // "0.1.0"
JSON.parse(require('node:fs').readFileSync(
  require.resolve('provident-storeroom') /* …/node_modules/provident-storeroom/package.json */)).version;  // "0.1.1"
```

*(`require('provident-storeroom/package.json')` answers `ERR_PACKAGE_PATH_NOT_EXPORTED` — no wildcard export — so read the manifest from disk; that is a shape choice, not a defect, and it is noted only so the repro is copy-pasteable.)*

### §1.3 What is **not** wrong — four things verified before filing this

1. **The install is correct.** The wrapper's `optionalDependencies` pin all five platform packages at exactly `0.1.1` (`"@auspicion/provident-storeroom-js-linux-x64-gnu": "0.1.1"` …), and `node_modules/@auspicion/provident-storeroom-js-linux-x64-gnu/` contains `storeroom_js_binding.node`. **No substituted copy, no range, no missing pin.**
2. **Rung one fires** — your own `acceptance.md` §3.1 row `3`'s observable holds.
3. **The artefact is healthy otherwise.** `require_('@auspicion/provident-storeroom-js-linux-x64-gnu')` returns the addon, `version()` answers, and its own generator works: `errorMessage('/tmp/x')` answers the declared string. The addon's own `storeCreate` constructs stores correctly when called directly (`addon.storeCreate({journalLength: 8, listeners: []})` → instance; `filePath: '/tmp/x.json'` → instance; `filePath: '/tmp'` → `FilePathUnreachable` on the **path**, as declared). **The native code is fine; the load path refuses it.**
4. **The version divergence is not install-specific.** The sibling checkout's own built artefact (`bindings/js/build/Release/storeroom_js_binding.node`) answers `"0.1.0"` as well, because that string is the crate's own `CARGO_PKG_VERSION`.

### §1.4 The root cause, in your own call path

| Site (sibling revision `4143be8`) | What it does |
| --- | --- |
| `bindings/js/index.mjs` :134 `packageVersion()` / the read at :228–236 | takes the **package's own manifest** `version` (`0.1.1`) as `declared`, calls the loaded artefact's `version()` as `answered`, and tests `typeof answered !== 'string' \|\| answered !== declared` — **exact string equality** |
| `bindings/js/index.mjs` :258 | the mismatch arm: `addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) }` — **the subject is rung one's own path**, and the walk **returns**, so rung two's `require_(ADDON_PATH)` is never reached on that evaluation (`PUB-R-3`) |
| `bindings/js/index.mjs` :301 `generatorFilePathUnreachable()` | the arm's `message`, reproduced from `src/error.rs` — **which is why the message speaks of a path that "must exist or the application must be able to write it" while naming a package** |
| `bindings/js/src/facade.rs` :1414 | the artefact's self-report: `env!("CARGO_PKG_VERSION")` |
| `bindings/js/Cargo.toml` :3 `version = "0.1.0"` and the root `Cargo.toml` :3 `version = "0.1.0"` | **the value that string takes** |
| `bindings/js/package.json` :3 `"version": "0.1.1"` | **the value it is compared against** |

**The state is `present-wrong-version` in your own taxonomy** (`docs/specs/storeroom-publish/resolution.md` §5.2), whose declared answer is: *"THE SINGLE FAILURE ARM, with the rung-one artefact's own path as its subject, and **NO fallback to rung two**."* The implementation matches the declaration exactly. **The defect is not in the load path's mechanics — it is that the released artefact enters that state at all.**

### §1.5 The contradiction inside your own published spec set

Three of your own rows cannot all be true of the bytes you published:

| Row | What it says | Status against `0.1.1` |
| --- | --- | --- |
| `docs/specs/storeroom-publish/release.md` §2.2 (the row added `2026-10-11` by the staged-release pass) | *"THE CRATE'S VERSION IS DELIBERATELY INDEPENDENT OF THE PACKAGE VERSION, AND IT IS SAFE BECAUSE THE ATTESTATION'S SUBJECT IS THE TAGGED COMMIT RATHER THAN THE CRATE'S VERSION"* — with the consequence declared in the same row: *"THE LOAD PATH'S VERSION READ COMPARES THE ADDON'S OWN SELF-REPORT AGAINST THE PACKAGE'S OWN DECLARED VERSION"* | **holds** — and is the direct cause of the refusal |
| `docs/specs/storeroom-publish/acceptance.md` §3.1 row `4` | *"THE VERSION READ DOES NOT REFUSE THE RELEASED ARTEFACT"* — because *"their agreement is a fact of the published bytes"* | **FALSIFIED by the published bytes.** The agreement is not a fact of the release; it is a coincidence the release did not establish |
| `docs/specs/storeroom-publish/parameter-semantics.md` `PAR-PUB-32` (its outside-values clause) | *"a different string → THE SINGLE DECLARED FAILURE ARM (`FilePathUnreachable`, the rung-one artefact's own path as its subject), and NO fallback"* | **holds** — and makes the divergence terminal |

**`release.md`'s row declares the cause and `acceptance.md`'s row asserts the absence of the effect.** The independence decision was taken on `2026-10-11`; the acceptance criterion that would have caught it was written as a *fact of the release* rather than as a check the release must pass, so no gate between them compared the two.

### §1.6 Why this is not a consumer-side error

- The consumer does nothing but `npm install` and `import` — the two acceptances `§3.1` rows `1` and `2`.
- No `filePath` is involved: the throw is identical with `filePath` absent, which your own `§7.1` step 3 makes **legal** (`FilePathArg::Absent` → tier fixed at `mem`).
- The message's subject is the **rung-one artefact's path**, which your `PAR-PUB-32` and `resolution.md` §5.2 both require — so the message is correct and the state it reports is real.

---

## §2. THE TWO REMEDIES, PRICED

**REMEDY (a) — MAKE THE ARTEFACT'S SELF-REPORT EQUAL THE PACKAGE VERSION AT RELEASE.** One version constant becomes release-stamped: the crate's `version` tracks the package's, so the published addon answers `0.1.1` and the version read passes.
**Price, printed: seven manifests move per release rather than six** — exactly the price your own `release.md` §2.2 row already prints for its alternative — plus a re-cut tag, a rebuild of all five platform artefacts, and a republish (the semver table's `PATCH` row: *"re-cut the tag and re-publish the SIX artefacts; the previous version is deprecated if it was half-published"*). **`0.1.1` is unrecoverable by patch: the five platform tarballs are immutable, so a new version is owed regardless.**
**What it does NOT cost:** the crate's version stays independent in the *source* if the build stamps the artefact's self-report at pack time — the stamp is a build step, not a coupling of `Cargo.toml`. **This is the cheaper form of (a) and it is the one we recommend if the independence is meant to stand.**

**REMEDY (b) — KEEP THE INDEPENDENCE AND CHANGE THE DIVERGENCE'S DECLARED ANSWER.** Narrow the read's subject: instead of exact string equality, the arm admits a same-`major.minor` artefact (or compares a declared *build* stamp rather than the crate's version).
**Price, printed: a BOUNDED AMENDMENT of three homes** — `resolution.md` §5.1/§5.2 (the read's clause and the `present-wrong-version` row), `parameter-semantics.md` `PAR-PUB-32`'s outside-values clause, and `acceptance.md` §3.1 row `4` — plus the JS unit's contract where the read is described (`docs/specs/storeroom-js/contract.md:1508`), and the risk that a *substituted* artefact becomes admissible where today it is refused. **That last consequence is the one `PAR-PUB-32` exists to prevent, so (b) trades the packaging failure for a weaker substitution guard — it must be an architect's ruling, not a pass's.**

**WE RECOMMEND (a), in its build-stamp form.** It preserves the substitution guard `PAR-PUB-32` declares, costs one build step rather than a semantic narrowing, and makes `acceptance.md` row `4` a fact of the release again — which is what that row was written to be.

---

## §3. ITEM 2 — THE FILE-PATH DRY-RUN PROBE PASSES OVER A PATH THE APPLICATION CANNOT WRITE

**THE DECLARED RULE** (`src/store.rs` :546–:600, on `A52`/`A55`/`DD-40`):
> *"(3) the `filePath` DRY RUN — writes nothing, **WRITE ACCESS REQUIRED**, reachable iff the file exists **or the application can write it** successfully … the probe creates NO file, NO directory and NO byte, and WRITE ACCESS IS REQUIRED (so an EXISTING BUT READ-ONLY file fails, and `A52`'s "the application can write it successfully" arm governs wherever it and "the file exists" disagree)."*

**THE IMPLEMENTATION** (`src/store.rs` :602–:621, `path_is_reachable`):

| The path's state | What the code tests | What the rule requires |
| --- | --- | --- |
| exists, is a directory | `false` — correct (`DD-40` (b)) | unreachable |
| exists, is a file | `OpenOptions::new().write(true).open(…)` — **a true dry run, correct** | reachable iff writable |
| **does not exist, parent exists** | **`parent.metadata().permissions().readonly()`** — a POSIX **mode-bit** test | **reachable iff the application can write it successfully** |
| does not exist, parent absent | `false` — correct (`DD-40` (a)) | unreachable |

**`Permissions::readonly()` is true only when NO write bit is set for ANYONE (`mode & 0o222 == 0`). It is not a test of whether the calling process may write the directory.** So a directory that is writable *by somebody else* passes, and a directory the process cannot write at all passes with it.

**THE MEASUREMENT** (this repo's pass, `linux-x64-gnu`, uid `1000`, calling the addon directly so the load-path blocker of §1 does not mask the probe):

| Construction | Declared answer | **Measured** |
| --- | --- | --- |
| `filePath: '/usr/bin/psr-probe.json'` — `/usr/bin` is root-owned, `0755`, and uid `1000` cannot create a file in it | `FilePathUnreachable` | **`storeCreate` returns an INSTANCE** — the register's tier is FIXED AT CREATION to `file` over a path this application can never commit to |
| `filePath: '/tmp'` (a directory) | `FilePathUnreachable` | `FilePathUnreachable`, subject `/tmp` ✓ |
| `filePath: '/tmp/nope-dir-xyz/store.json'` (absent parent) | `FilePathUnreachable` | `FilePathUnreachable`, subject the path ✓ |
| `filePath: '/tmp/psr-store-new.json'` (writable parent, file absent) | construct, tier `file`, create nothing | constructs, **and the file is not created** ✓ |

**THE CONSEQUENCE, WITH ITS LABEL: derived, not measured** — the store is constructed in the `file` tier over an unwritable path, so the misconfiguration surfaces **at the first write's commit rather than at construction**, and `§7.1` step 3's stated purpose (a construction-time dry run that catches an unreachable path before anything is built) is not discharged. We did not drive the commit failure to a captured status, because the addon's `call` argument encoding is the package's own; the sibling can capture it in one line.

**REMEDY SHAPES.** (i) Query **effective** write access for the process — `libc::access(path, W_OK)` / `faccessat(AT_EACCESS)` on the parent — which no new crate is needed for and creates nothing, honouring `A55`'s *"creates NO file, NO directory and NO byte"*; (ii) declare the mode-bit reading as the intended one and amend `A52`/`A55`/`DD-40` to say so, which would also require amending the rule's own wording (*"the application can write it successfully"*). **A create-then-unlink dry run is NOT available** without breaking `A55`. **Either way a TOCTOU residue remains and should be declared** — the probe cannot close the window between the check and the first commit.

---

## §4. ITEM 3 — ONE CLAUSE, TWO FAILURES

The string `'<subject>' is not reachable at construction, the path must exist or the application must be able to write it` is emitted in **two unrelated states**:

1. **the artefact could not be reached or did not match** — the subject is a **package name** or an addon path (§1);
2. **the store's `filePath` failed its dry run** — the subject is a **filesystem path** (§3).

The wording is written for (2) and is used for (1), where it is materially misleading: it sends a consumer looking for a filesystem problem in a packaging failure. **The only in-band discriminator today is whether the subject parses as a path.** Because `PAR-PUB-32` fixes the subject to the rung-one artefact's own path, a clause change would be an amendment of `PAR-PUB-32` and `src/error.rs`'s `FilePathUnreachable` arm **together** — the arm is deliberately ONE (`§5.3`'s single declared failure arm), so this is a naming/wording finding, not a case for a sixteenth status.

---

## §5. WHAT THIS REPO HAS DONE WITH THE FINDINGS

- **`docs/defects.md`** — row **`STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`** (OPEN, upstream-owned; symptom, reproduction, root cause and fix shape, in the form your own catalogue uses).
- **`docs/HANDOFF.md`** — **Round 10**, the first round in that file addressed to the sibling repository rather than to `provident-ssr`.
- **`docs/specs/storeroom-binding-review.md`** — the gate-1 record for the consumer's proposal to adopt the package, verdict **`BLOCKED-ON-SEMANTICS`**; the package's unconstructibility is residual **`R-3`** there, and its `§2A` carries the architect's answers.
- **THE HARD STOP WE HOLD OURSELVES TO:** the consumer will not start its own binding unit (`F4`, `U-STOREROOM-BINDING`) until (a) the artefact's `version()` equals the wrapper manifest's — i.e. this handoff is discharged by a release — and (b) the consumer's own collision clause `P-9` is granted. **No pass in this repo has patched, stubbed, monkey-patched or vendored the package**, and none will.

---

## §6. THE BATTERY THAT WOULD CLOSE ITEMS 1, 2 AND 3

Each assertion is one line in a live install-and-load battery; the first three are exactly your `acceptance.md` §3.1 rows `1`–`4`, made executable:

1. **Install, then import by name** — `import('provident-storeroom')` resolves; the eight verbs are exported. *(rows 1–2)*
2. **The version read does not refuse the released artefact** — `require(platformName).version() === require('provident-storeroom/package.json').version`, read from the **published tarballs**, not from the checkout. *(row 4 — **the assertion that would have caught this**)*
3. **A store can be constructed at all, in the released install** — `storeCreate({ journalLength: 8, listeners: [] })` returns an instance carrying `{register, on, write… }`'s declared shape, i.e. **no throw**, in the tier `mem`. *(`§7.1` steps 2–7; today this throws at load)*
4. **The probe's own matrix, asserted for effective access** — a path whose parent is a directory the **process cannot write** is refused at construction (the §3 measurement, inverted); a path whose parent is writable and whose file is absent is accepted **and creates nothing**; a directory is refused; an absent parent is refused; an existing read-only file is refused.
5. **The two failure subjects are distinguishable** — a consumer can tell a load-path refusal from a `filePath` refusal without parsing the subject.

**A note on why this bit here and not in your own gates:** your `LIVE/INSTALL` layer verified the **registry's** side (the tarball's content, the pins, the resolved count) and reported its figures with their site and label; neither it nor the in-place batteries compare the **shipped artefact's self-report** against the manifest, because in the checkout the artefact is rung two, where `resolution.md` §5.1 item 3 declares that **no comparison applies**. The one state that matters is reachable only from a published install — which is precisely what your `acceptance.md` §3.1 row `3` says about rung one.

---

## §7. EVIDENCE AND PROVENANCE

| What | Where |
| --- | --- |
| This repo's gate-1 record (the consumer's use of the package, the verdict, the residual conditions) | `docs/specs/storeroom-binding-review.md` |
| The adoption dossier (the package's declared surface as measured) | `docs/specs/storeroom-binding-adoption-dossier.md` |
| Step-1 validity report — `BF-1`, the unconstructibility finding | `archive/gate1/2026-10-11-U-STOREROOM-BINDING-gate1-step1-validity.md` |
| Step-2 critique — `C-09` | `archive/gate1/2026-10-11-U-STOREROOM-BINDING-gate1-step2-critique.md` |
| The consumer's defect row and handoff round | `docs/defects.md` `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` · `docs/HANDOFF.md` Round 10 |
| The sibling rows this document cites | `docs/specs/storeroom-publish/release.md` §2.2 · `acceptance.md` §3.1 · `resolution.md` §5.1/§5.2 · `parameter-semantics.md` `PAR-PUB-32`; `docs/specs/storeroom-js/contract.md:1508`; `src/store.rs` :546–:621; `src/error.rs` :176–:181; `bindings/js/index.mjs` :134/:228–:258/:301; `bindings/js/src/facade.rs` :1414; `bindings/js/Cargo.toml` :3; `bindings/js/package.json` :3 |

**Measurements in this document were taken on `2026-10-11` on `linux-x64-gnu` against the published `0.1.1` tarballs in a scratch directory, by this repo's supervisor. Every claim is labelled measured (a command's own output) or derived (a consequence reasoned from a citation). Nothing here was patched, stubbed or vendored.**
