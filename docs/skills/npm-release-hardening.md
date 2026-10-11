---
name: "npm-release-hardening"
description: "Hard-won rules for shipping a multi-package npm release from GitHub Actions: the eight falsification classes that a first release meets, the exact fixes, the deprecated-toolchain traps (Node majors, action majors, runner images), and the staged-publish pattern. Load before writing or reviewing any publish workflow."
kind: "procedure"
---

# npm release hardening — a first-release post-mortem, generalised

**Scope.** Anything that must (a) build platform-specific binary artefacts, (b) publish them plus a main package to npm from CI, and (c) be verifiable by a stranger afterwards. Distilled from one project's first release, which took **three CI runs** and produced **eight distinct falsifications**. **Not one of them was a bug in the code being shipped.** Every one was a claim in the *configuration or the verification* that outran the instrument that could falsify it.

**The one sentence.** *A claim that outran the instrument that could falsify it.* Every failure below is an instance. Read this file looking for that shape, not for the specific labels it happened to be spelled with.

---

## 1 · The eight falsifications, in the order a first release meets them

### 1.1 A verification that could not fail

**Symptom.** Green tests, broken behaviour.

**Instances.** Tag-format cells that read a value no instrument computed · a test harness whose error-handling swallowed a correctly-thrown error into a field nobody asserted · negative-generator controls whose mutation never reached the assertion · a matrix row's `target` captured and **never compared** to the package name beside it.

**Rule.** **Every check must be shown to fail on a mutated input before it is trusted.** A control that cannot fail is a finding, not a test. When you add a guard, add at least one control that breaks the thing it guards, **and print the measured verdict.**

**Avoid.** `assert(x !== undefined)` where `x` is a constant. `try { … } catch { report.error = e }` with no assertion on `report.error`. A "census" assertion (`deepEqual` on a field list) that becomes a subset check — **a subset check passes when an undeclared field appears.** Prefer exact two-directional set equality, and **widen the census rather than loosening the assertion** when the declared set grows.

### 1.2 A build matrix declared wider than it was ever built

**Symptom.**
```
ld: symbol(s) not found for architecture arm64
LNK2019 / LNK1120: 23 unresolved externals
```
**Cause.** A `cdylib` linking Node-API symbols. On Linux they resolve at load time by default; **macOS and Windows do not.**

**Fix — `build.rs`.**
- **macOS:** `cargo:rustc-link-arg=-undefined` + `cargo:rustc-link-arg=dynamic_lookup`.
- **Windows:** the import library is *not* supplied by the runner. Fetch the pinned `node.lib` for your Node major/target over HTTPS in `build.rs`, verify its size, and **panic loudly on failure** — a silent skip produces a link error 400 lines later.
- **Linux:** no-op.
- Key the hook on `CARGO_CFG_TARGET_OS`, **not** on arch — it is OS-shaped.

**Avoid.** Declaring five platforms in a matrix and only ever having built one. **Cross-compiling a target the matrix claims was built on that platform is worse than a gap**, because the provenance claim ("built on the platform it targets") becomes false.

### 1.3 A test suite that only ever compiled on one platform

**Symptom.**
```
tests/…: use std::os::unix::fs::PermissionsExt;   // E0433: no `unix` in `os`
std::fs::Permissions::from_mode(0o444)            // E0599
```
**Cause.** Unix mode bits used unconditionally, in a suite the workflow runs on five OSes.

**Fix.** `#[cfg(unix)]` / `#[cfg(not(unix))]` pairs **driving the same property on both sides** — Unix `0o444`; Windows the **read-only attribute**. Scope the probe so the instance drops **before** the unlink: Windows cannot remove an open file. Restore the original mode in a guard.

**Sweep, do not spot-fix.** Grep the whole suite for `std::os::unix`, `cfg(unix)`, hardcoded `/tmp`, path separators in path contexts, `.so`/`.dylib`/`.dll`/`.node`, `chmod`, and `Command::new("sh"|"bash"|"cmd")`. **Use `PathBuf::join` and `env::temp_dir()` everywhere; never assemble a path from a string with a separator in it.**

### 1.4 A publishing client too old for the mechanism you need

**Symptom.** `npm error code ENEEDAUTH` on a runner whose bundled npm predates the feature.

**Cause.** **Trusted publishing (OIDC) requires npm ≥ 11.5.1.** The runner image's bundled npm was older.

**Fix.** An explicit setup step pinning a Node major whose bundled npm is new enough, **plus** `registry-url`. Do not rely on the image's default client.

**See §3 — this is a family, not a bug.**

### 1.5 A registry grant scoped more narrowly than the action taken

**Symptom.**
```
npm notice publish Signed provenance statement with source and build information from GitHub Actions
npm notice publish Provenance statement published to transparency log: …
npm error 403 Forbidden - PUT …/<pkg> - OIDC permission denied for this action
```
**Read the whole log.** The OIDC exchange **succeeded** and the provenance **was signed and logged**. Only the *action* was denied — because the registry's trusted-publisher grant was scoped to **stage publish, not direct publish**.

**Fix.** Move the publish sites to **`npm stage publish`** (§4). **Diagnose by reading what worked before concluding what failed** — "403 at publish" invited a hunt for a credential bug that did not exist.

### 1.6 A manifest field the attestation validator requires and nothing declared

**Symptom.**
```
422 Unprocessable Entity - POST …/-/stage/package/<pkg>
- Error verifying sigstore provenance bundle: Failed to validate repository information:
  package.json: "repository.url" is "", expected to match "<host>/<owner>/<repo>" from provenance
```
**Cause.** The manifest declared the metadata fields **absent** — a reasonable default when no remote is known. **Provenance verification requires `repository.url` to match the attestation's source repository.**

**Fix.** Declare them on **every** manifest, main and platform:
```json
"repository": { "type": "git", "url": "git+https://<host>/<owner>/<repo>.git" },
"homepage": "https://<host>/<owner>/<repo>#readme",
"bugs": { "url": "https://<host>/<owner>/<repo>/issues" }
```
**The `git+…git` form is npm's own canonical spelling** — verify by running `npm pkg fix` on a scratch copy: it rewrites the bare `https://…` form *up* to it and leaves `git+…git` alone.

**Note the shape:** the error named the expected value, so a field that was a *guess* when absent became a *fact* once the registry supplied it.

### 1.7 A step whose permission the workflow never granted

**Symptom.** On the **last** step, after everything else succeeded:
```
Error: Failed to persist attestation: Resource not accessible by integration
- https://docs.github.com/rest/repos/attestations#create-an-attestation
```
**Cause.** `POST /repos/{owner}/{repo}/attestations` needs **`attestations: write`**. The workflow declared `contents: read` and `id-token: write` and never the third.

**Fix.**
```yaml
permissions:            # workflow level — the jobs that don't attest
  contents: read
  id-token: write

jobs:
  main:
    permissions:        # ⚠ A JOB-LEVEL BLOCK *REPLACES* THE WORKFLOW BLOCK — IT DOES NOT MERGE
      contents: read          # redeclare or lose it
      id-token: write         # redeclare or lose it
      attestations: write     # the fix
```
**Grant at the narrowest scope that needs it.** Only the attesting job needs the third key; a workflow-level grant hands it to every job, including a build matrix that never uses it. **Least privilege is a requirement, not a preference.**

**Sweep every action in the file** against the permissions its own documentation names. A declared step with no grant is a claim about a capability the world does not offer.

### 1.8 A runner label naming an image the host retired

**Symptom.**
```
Started 8h 35m 17s ago · Requested labels: macos-13
Waiting for a runner to pick up this job...
```
**This is not congestion.** The image was **retired**; no runner will ever claim the job. Every other leg went green while one leg waited indefinitely.

**Cause.** A label in a config file is a claim about a world the config cannot see. **Zero bytes of yours can retire an image or make one dispatch.**

**Fix.** Check every `runs-on` label against the host's own runner-images tracker **before** cutting a release tag. Move retired or deprecated labels to current ones; **prefer a label with no deprecation badge**, and when a deprecated label has a scheduled retirement date, move it in the same pass as the broken one — a brownout can turn a *green* leg red mid-release.

**Consider, but weigh carefully, collapsing two runner legs into one by cross-compilation.** It removes the whole risk class (macOS's clang and SDK are universal, so an arm64 runner can build the Intel target) — **but it makes the artefact's provenance claim false: an artefact's attestation says it was built *on* the platform it targets, and a cross-compiled one was not.** If that claim matters, keep one runner per target and accept the label churn.

---

## 2 · The meta-lesson: falsifiers that live outside your repo

**Rank your verification by what can falsify it, not by how thorough it looks.**

| Instrument | What it can falsify |
|---|---|
| **A node test suite** | pure logic, data shapes, your own declared census — **and nothing about layout, rendering, or assembly** |
| **A blind test set, written from docs only** | that the docs are sufficient to derive behaviour |
| **A simulated environment (shims, mocks)** | only what the shim models; **a layout-less DOM shim cannot falsify CSS, and a mock registry cannot falsify a real validator** |
| **CI on the real runner images** | linking, toolchain availability, runner labels, client versions |
| **The real registry / host API** | provenance validation, permission grants, name resolution, manifest rules |
| **A real install of the delivered bytes** | the resolution table, the pins, the package contents — **everything the local copies agree about because they are copies of each other** |

**And the corollary that costs the most:** *five names declared in five files will agree with each other no matter how many tests compare them to each other.* **Only a real install can falsify them.** Over-verifying a layer that was never broken while the assembled layer has zero verification is a review finding, not diligence.

---

## 3 · Deprecated toolchain traps — the Node-version family

**This is a whole family of failure with one shape: a pinned version that was current when written and is retired when run.** Check every pin against the vendor's own support table **as a pre-release step**, not after a failure.

### 3.1 Node majors as the *base package* — the highest-risk pin

**The trap in one line:** *a Node major pinned as a build or publish base is a claim about what the runner will still install, and a Node major goes EOL on a published schedule that has nothing to do with your repo.*

- **An EOL Node major does not fail loudly.** The runner may still have it cached, or may fail to install it, or may install an older patch than you asked for. **A green run does not mean the pin is supported.**
- **The client bundled with Node is not the client you asked for.** `npm` ships bundled; **a Node major whose bundled `npm` predates the mechanism you need fails at publish time with an authentication-shaped error.** *Trusted publishing (OIDC) needs npm ≥ 11.5.1.* Pin a Node major **new enough for your publish mechanism**, and assert the client version at the top of the job rather than discovering it in the log.
- **LTS windows are short and dated.** Check the vendor's release schedule for your pinned major: if it is in maintenance or already EOL, **move it before the release**, not after a brownout.
- **A pinned native import library is coupled to the Node major.** If `build.rs` fetches `node.lib` for a specific Node version, that pin is **part of the release contract** — a Node major bump requires re-pinning it and re-verifying its size. Treat the two pins as one unit.
- **Never let the runtime version float implicitly.** `node-version: '24'` is a *major* pin and the runner may satisfy it with any patch; `node-version: '24.11.0'` is exact. Know which you chose and why.

**Pre-release check.** For every pinned Node major: (a) is it **supported** per the vendor's schedule? (b) is the **bundled npm** ≥ the version your publish mechanism needs? (c) does any other pin (import library, target triple) name a Node version, and does it match?

### 3.2 Action majors running on a retired Node runtime

**Every `uses:` line carries an implicit Node runtime, and GitHub retires the runtime beneath old major versions.**

- **Pin a recent major for anything on your critical path** — especially the step that *produces* your provenance or attestation. A deprecated runtime there is a provenance gap, not cosmetic noise.
- **When you touch an action's version, verify its input shape rather than assuming** — read the action's own releases and its `action.yml`. A version bump that silently changes an input's semantics is worse than an old major.
- **Check whether a version bump is even required by the fix.** Often it is not; say so plainly and treat it as debt paid rather than a dependency invented.

### 3.3 Runner image labels

Covered at §1.8. **Rule: a label is a dated claim.** Verify every `runs-on` against the host's runner-images tracker before you tag, and re-verify when the tag is months old.

---

## 4 · The staged-publish pattern (adopt this)

**What it is.** `npm stage publish` puts a version at the registry **staged but not live**. A separate, second-factor-authenticated **promotion** by a human makes it installable. CI stages; **a person promotes.**

**Why adopt it.**
1. **A staged version is not spent until it is promoted.** A bad stage is **discarded** (`npm stage reject`) rather than **deprecated**. The version number survives. **This is strictly safer than publishing and deprecating**, and it is why three failed CI runs in this project cost nothing but time.
2. **The trust model is forced to be honest.** Short-lived CI tokens **cannot** run the promotion subcommands. The stage uses the CI identity; the promotion cannot — it is a human with 2FA, by construction rather than by policy.
3. **It matches "no pass publishes."** With staging, that rule is *enforced by the tooling* instead of promised in a document.
4. **You can inspect before you commit.** `list` / `view` / `download` need no 2FA — **download the tarball and look inside it** before promoting. A "successful publish" that shipped a 1.2 kB tarball with no binary is a real thing that happened.

**The order matters.** For a main package with exact pins on platform packages, **stage and promote the platform artefacts first, the main package last** — the main package's pins must resolve against versions that are already live when it lands.

**Pre-flight for a re-run.** **A staged version occupies its version.** A re-run of an already-staged version is refused by the registry (E409) at the publish step, after the build and guards have already succeeded. **Reject the staged ones first** (`npm stage reject <id>`, 2FA, free) — or accept a noisy run.

**Tag discipline.** The workflow executes **at the triggering ref**. If the workflow file itself must change, **a re-run of the existing tag executes the OLD YAML** — so either re-point the tag (lawful while nothing is promoted) or cut a new version. **Decide which before you start**, and never move a tag whose version has been promoted.

---

## 5 · What to avoid — the checklist

**Publish mechanics**
- ✗ Publishing from CI with no human gate when a mistaken version costs a permanent deprecation.
- ✗ Assuming "403 at publish" means a credential bug. **Read what succeeded first.**
- ✗ Treating a *staged* version as spent, or missing that staged versions occupy their number.
- ✗ Re-running a workflow on an unchanged tag when the workflow file is what changed.
- ✗ Publishing a scoped package without `publishConfig: { access: "public" }` or `--access public`.

**Manifests**
- ✗ Declaring `repository`/`homepage`/`bugs` absent "to be added later" — **provenance validation is not later.**
- ✗ Guessing a version or pin by copying it into several files by hand; **generate or assert the coupling.**
- ✗ Shipping a `files` allowlist that omits the artefact the package exists to deliver — **and then verifying the tarball by its *name* rather than by unpacking it.**
- ✗ Letting a licence notice fall outside the packed set because it lives outside the package directory.

**Toolchain pins**
- ✗ Any Node major pin that is not checked against the vendor's support schedule at release time (§3.1).
- ✗ Relying on the runner image's bundled client for a feature that needs a newer one.
- ✗ A `runs-on` label copied from an old workflow (§1.8).
- ✗ An action major old enough that its Node runtime is retired — **especially the provenance/attestation step.**

**Verification**
- ✗ A check that cannot fail (§1.1).
- ✗ A negative-control generator whose mutation never reaches its assertion.
- ✗ Comparing copies of a declaration to each other and calling it verification.
- ✗ Reporting "the app works" from a test layer that never assembled the app.
- ✗ **A guard written against the spelling of a thing, after the thing's spelling changed.** Search for *every* place the old spelling appears and classify each: an assertion (re-cut), a refusal-list entry (keep, if its subject still holds), or prose (re-cut with a date).

**Process**
- ✗ Fixing a finding inline when the finding is in a file another role owns — **route it, and name the owner.**
- ✗ Silently skipping a platform-specific test instead of pairing it or parking it with a written structural reason.
- ✗ Declaring an exception without recording it where the next reader will look.

---

## 6 · The pre-release checklist

Run this **before** cutting the release tag. Every line is a failure that actually happened.

**Toolchain**
1. Every `runs-on` label current? (Check the host's runner-images tracker — §1.8.)
2. Every pinned Node major supported, with a bundled client ≥ what your publish mechanism needs? (§3.1)
3. Every action on the critical path — especially attestation/provenance — on a recent major? (§3.2)
4. Any native import-library pin coupled to a Node version, and does it match?

**Workflow**
5. Permissions: every action's documented requirement granted, **at the scope that governs it** — remembering that a job-level block **replaces** the workflow-level one?
6. Pre-publish guards present for each artefact, asserting **its own** declared paths?
7. Cleanup steps on `if: always()`?
8. Publish verb staged, not direct? Order correct (platform first, main last)?

**Manifests**
9. Every manifest carries the repository metadata, in the host's canonical spelling?
10. Versions and pins coupled **exactly**, asserted by a test rather than by eye?
11. Every `files` entry resolves, and the artefact is inside the packed set?

**Verification**
12. Every new guard demonstrated to **fail** on a mutated input?
13. Any guard whose subject's spelling changed since it was written? (Grep for the old spelling.)
14. The build matrix's platform claims each **actually built** on that platform?
15. **Is there a layer — rendered, assembled, installed — with zero verification?** Name it, and say so in the record rather than implying coverage.

**Post-release**
16. Install the **delivered bytes** from the registry and exercise them. **This is the only instrument that can falsify name resolution and package contents. Do not skip it because the local tests are green.**
17. Deprecate superseded versions, naming their replacement.

---

## 7 · Reporting discipline that made this survivable

- **State which layer each verification covers** — pure/envelope vs assembled vs installed. A green node suite is not a green app.
- **A green does not retire a red on another layer**, and a live pass is *additive*, not a replacement.
- **Record every exception with its scope, its reason, and its expiry** — and state that an exception is **not** a licence for the next release.
- **Park as `OPEN`, never quietly as green.** A park is structural: only a real obstacle, with the reason written down.
- **Back up before writing; never rewrite a file to add to it.** Append. And take a baseline from version control, **not from your own re-read** — one pass in this project lost eleven lines by trusting a self-measured line count.
- **When a pass discovers it damaged something, say so in its own report.** The one that did became a repaired record; the ones that would have hidden it would have shipped a corrupt document.

---

## 8 · The one-paragraph version

**Pin nothing you have not checked against the vendor's current support table, grant nothing you have not read the action's documentation for, verify nothing with a check you have not seen fail, and never let a local green stand in for a real install.** Nine times out of ten the failure will be a claim in your configuration about a world your configuration cannot see — a retired runner image, an EOL Node major, a permission you never granted, a manifest field a validator you never spoke to requires. **Build the habit of asking, of every line you write: what could falsify this, and have I run it?** When the answer is "nothing I control," say so out loud, and go find the instrument that can.
