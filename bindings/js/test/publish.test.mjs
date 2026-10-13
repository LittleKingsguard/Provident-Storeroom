// `bindings/js/test/publish.test.mjs` — **THE RED SET OF `U-STOREROOM-PUBLISH` (`D-GP-SRPUB`), GATE 3
// (`Q2`), AUTHORED FROM THE CONTRACT ALONE AND RUN BEFORE ANY IMPLEMENTATION.**
//
// AUTHORITY: `docs/specs/storeroom-publish/contract.md` (its status line, its single `derivation:` clause,
// its index region and part map, its scope boundary, its `§0.3` `DECLARED-DEFAULT` table `PUB-DD-1`…
// `PUB-DD-24`) and its parts — `resolution.md` · `distribution.md` · `release.md` · `acceptance.md` ·
// `parameter-semantics.md` · `implementation-plan.md` — read with the gate-1 record
// `docs/specs/storeroom-publish-proposal-review.md` (`AV-1`…`AV-25`) and `archive/gate1/storeroom-publish-review/
// 3-architecture.md`. **NO BYTE OF `bindings/js/src/**`, `bindings/js/index.mjs`, `bindings/js/package.json`
// OR ANY OTHER FILE WAS WRITTEN BY THE PASS THAT AUTHORED THIS ONE: this file is the whole of that pass's
// artefact, beside `archive/gate3/storeroom-publish-red-set.md`.**
//
// **THE HOME IS `PUB-DD-24`'s AND IT IS NOT NEGOTIABLE:** the red set is `bindings/js/test/publish.test.mjs`,
// INSIDE the directory the landed JS leg's command globs (`node --test bindings/js/test/*.test.mjs`, taken at
// the repository root), at `ENVELOPE/PURE` (`acceptance.md §5.2` row 1; `implementation-plan.md §2` `Q2`).
//
// **EVERY DRIVE BELOW IS WRITTEN FROM THE CONTRACT ALONE AND CARRIES THE CLAUSE IT DRIVES IN A COMMENT.**
// One block per register row (`contract.md §5.1`–`§5.8`), each block printing its row id, its strategy id(s)
// and its verdict; `un-run` is a FAILURE (`contract.md §5.0`).
//
// ---------------------------------------------------------------------------------------------
// HOW EVERY BLOCK OBSERVES ITS STATE WITHOUT THE IMPLEMENTATION EXISTING
// ---------------------------------------------------------------------------------------------
// **NEVER A REPO MUTATION.** No drive writes, creates or removes a byte under the repository. The
// observation instrument is a SCRATCH TREE under the operating system's temporary area, assembled by
// `makeScratch()` before the first drive:
//
//   /tmp/storeroom-pubred-<pid>-<n>/
//     package.json                    a manifest standing where the entry stands (version 0.1.0, name
//                                     `provident-storeroom`) — `§1.5` item 1: the package's own version is
//                                     READ FROM THE PACKAGE'S OWN MANIFEST
//     index.mjs                       a byte-for-byte COPY of the real entry (`bindings/js/index.mjs`),
//                                     staged so the loader can be observed without touching the repo
//     node_modules/<name>/…           a FAKE PLATFORM ARTEFACT per drive — the candidate rung one
//     build/Release/storeroom_js_binding.node
//                                     the candidate rung two — absent, or a broken artefact
//     preload.cjs / driver.mjs        the observer and the driver (below)
//
// The driver runs under `node --require preload.cjs` and does three things, none of which needs the new
// implementation to exist: **(1)** it FIXES the runtime key by defining `process.platform` / `process.arch`
// before the entry is evaluated (the pair is the runtime's, `resolution.md §4.1`); **(2)** it RECORDS every
// module load attempt through `Module._load` — so the attempt SET is observable rather than the outcome
// alone (`P-PUB-1`'s `S-RESOLVE`, `P-PUB-2`'s `S-KEYSET`); **(3)** it dynamically imports the staged entry
// and REPORTS what happened: whether an instance was returned, or the thrown value's own members, whether
// the fake artefact's `version` was called, and the attempts in order. **AND IT REPORTS THE TWO DECLARED
// THROW SITES THE LOAD PATH HAS — the IMPORT's own throw and the arm thrown by the CONSTRUCTION the
// artefact's own `storeCreate` performs — BOTH AS `arm`, keeping `error` for every throw that is not the
// declared form** (`§1.4` item 3: a state whose answer is the arm returns NO instance, so a
// construction-time arm is a DECLARED ANSWER and never an absorbed failure).
//
// The parent process then asserts the CONTRACT's answer for that state. **A drive is therefore capable of
// FAILING even while nothing of the new load path exists: the loader's own attempts, its own outcome and
// its own arm are read from outside, and every clause is checked as an OBSERVABLE, never as a source
// token.** The in-place guard (`S-INPLACE`) drives the REAL package at its REAL location instead — no
// scratch copy, no fake artefact — which is why it is falsifiable TODAY.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';
import { tmpdir } from 'node:os';

// ---------------------------------------------------------------------------------------------
// the contract's own constants, at the contract's own bytes
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = dirname(dirname(PKG_DIR));

// `resolution.md §3.1` — the five declared names, decided once, in the table's own order. **AND `A86` MOVES
// THEIR SCOPE SEGMENT ALONE** — the five are `@auspicion/js-<label>`, the label, the second segment and the
// suffix UNMOVED (`docs/specs/storeroom-publish-proposal.md` `§12`; `contract.md §0.3` · `PUB-DD-6`,
// `PUB-DD-15`; `resolution.md §3.1`). **⟶ SUPERSEDED BY `A88`, WHOSE OPERATIVE READING IS `A88`(a), THE
// ADDITIVE ONE** (`docs/specs/storeroom-publish-proposal.md` `§14`, the architect's ruling of 2026-10-11
// transcribed verbatim there): **THE PROJECT TOKEN IS INSERTED BEFORE THE LANGUAGE MARKER, so the five are
// `@auspicion/provident-storeroom-js-linux-x64-gnu` · `…-js-linux-arm64-gnu` · `…-js-darwin-x64` ·
// `…-js-darwin-arm64` · `…-js-win32-x64-msvc` — the scope `@auspicion` and the language marker BOTH KEPT and
// the project NAMED, because `@auspicion` is a MULTI-PROJECT org and a name carrying only a language marker
// is ambiguous inside it.** **THE MAIN PACKAGE'S OWN IDENTITY IS UNTOUCHED**: `provident-storeroom`,
// UNSCOPED (`A82`), and every cell that reads it stands.
const FIVE_NAMES = [
  '@auspicion/provident-storeroom-js-linux-x64-gnu',
  '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  '@auspicion/provident-storeroom-js-darwin-x64',
  '@auspicion/provident-storeroom-js-darwin-arm64',
  '@auspicion/provident-storeroom-js-win32-x64-msvc',
];
// `resolution.md §4.1` — the five covered keys, and the label each carries.
const COVERED = [
  { platform: 'linux', arch: 'x64', label: 'linux-x64', name: FIVE_NAMES[0] },
  { platform: 'linux', arch: 'arm64', label: 'linux-arm64', name: FIVE_NAMES[1] },
  { platform: 'darwin', arch: 'x64', label: 'darwin-x64', name: FIVE_NAMES[2] },
  { platform: 'darwin', arch: 'arm64', label: 'darwin-arm64', name: FIVE_NAMES[3] },
  { platform: 'win32', arch: 'x64', label: 'win32-x64', name: FIVE_NAMES[4] },
];
// **`release.md §1.2` — THE FIVE-RUNNER TABLE, ROW FOR ROW: ONE RUNNER PER TARGET, AND NO RUNNER SERVING
// TWO.** **⟶ RE-CUT 2026-10-11 BY THE RUNNER-LABEL PASS (`role_test_writer`), ON THE CLAUSE'S OWN CLOSING
// RULE** — *"a runner renamed or retired by its host is a one-line change to this table and to the workflow
// file, and the change is a bounded amendment rather than a finding"* — **BECAUSE THAT CLAUSE FIRED: the
// `darwin-x64` leg requested `macos-13`, WHICH ITS HOST HAS RETIRED, and the tagged run stood `8h 35m`
// waiting for a runner that will never be served, *"fully unsupported by December 8th, 2025"*
// (`actions/runner-images#13046`), while every other leg went green; and the `darwin-arm64` leg's `macos-14`
// carries a DEPRECATION badge, with host brownouts scheduled and retirement announced for `2026-11-02`
// (`actions/runner-images#13518`).**
//
// **AS FILED, AND RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER, THE CELL'S OWN TABLE READ:**
// *"`assert.deepEqual(rows.map((r) => [r.label, r.runner]), [['linux-x64', 'ubuntu-24.04'], ['linux-arm64',
// 'ubuntu-24.04-arm'], ['darwin-x64', 'macos-13'], ['darwin-arm64', 'macos-14'], ['win32-x64',
// 'windows-2022']], …)`"*.
//
// **THE TABLE BELOW IS THE SAME FIVE TARGETS WITH TWO LABELS MOVED AND THREE UNTOUCHED**: `linux-x64` ·
// `linux-arm64` · `win32-x64` DO NOT MOVE, and only `darwin-x64` and `darwin-arm64` change image —
// `macos-15-intel` (Intel x64, macOS 15, a STANDARD hosted runner, no plan change) and `macos-15` (Apple
// Silicon arm64, current, no deprecation badge).
// **AND THE RULE THE TABLE CARRIES IS SUBSTANTIVE RATHER THAN A FORMALITY: `parameter-semantics.md §4.4`'s
// `PAR-PUB-28` REFUSES a cross-compiled artefact AS *"a build this matrix did not perform"*, SO THE FIVE
// LABELS REMAIN FIVE DISTINCT IMAGES** — `macos-15-intel` and `macos-15` are DIFFERENT IMAGES SERVING
// DIFFERENT ARCHITECTURES, and the cells below PROVE that rather than assume it: the five-runner
// assertion and its message stand in the workflow cell, and the census guard beside them reads the
// file's own label set in both directions.
// **AND THE ONE TRAP THIS TABLE SETS IS STATED WHERE IT IS SET: `macos-15` IS A SUBSTRING OF
// `macos-15-intel`, so NO assertion over these labels may be an `includes` or a bare `test`** — every
// comparison of a label below is an EXACT-TOKEN comparison, in the cell and in the census guard alike.
// **THE FIVE TARGET TRIPLES ARE `distribution.md §3`'s OWN TABLE, CARRIED HERE SO EACH ROW'S `target` IS
// READ AGAINST THE LABEL THAT NAMES IT RATHER THAN AGAINST ANOTHER ROW'S.**
const FIVE_RUNNERS = [
  { label: 'linux-x64', runner: 'ubuntu-24.04', target: 'x86_64-unknown-linux-gnu' },
  { label: 'linux-arm64', runner: 'ubuntu-24.04-arm', target: 'aarch64-unknown-linux-gnu' },
  { label: 'darwin-x64', runner: 'macos-15-intel', target: 'x86_64-apple-darwin' }, // ⟶ MOVED: was `macos-13`
  { label: 'darwin-arm64', runner: 'macos-15', target: 'aarch64-apple-darwin' }, // ⟶ MOVED: was `macos-14`
  { label: 'win32-x64', runner: 'windows-2022', target: 'x86_64-pc-windows-msvc' },
];
// `resolution.md §4.1`'s `NOT COVERED` row — a sample of the pairs it enumerates by name.
const UNCOVERED = [
  { platform: 'linux', arch: 'ia32' },
  { platform: 'linux', arch: 'ppc64le' },
  { platform: 'linux', arch: 's390x' },
  { platform: 'freebsd', arch: 'x64' },
  { platform: 'win32', arch: 'ia32' },
  { platform: 'sunos', arch: 'x64' },
  { platform: 'android', arch: 'arm64' },
];
// `PUB-DD-8` / `resolution.md §4.2` — the musl STATE, never a sixth key.
const MUSL_PAIRS = [
  { platform: 'linux', arch: 'x64' },
  { platform: 'linux', arch: 'arm64' },
];
// `§1.1` item 2 / `resolution.md §2.1` item 2 / `PAR-PUB-30` — rung two's declared path.
const RUNG_TWO_TAIL = ['build', 'Release', 'storeroom_js_binding.node'].join(sep);
// `docs/specs/storeroom-native/contract.md §8.1` — the closed set, carried and never minted (`§0.1` item 7).
const CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed',
];
// `§1.4` item 1 — the arm's status, carried VERBATIM, and the ONE member this unit's arm may carry.
const ARM_STATUS = 'FilePathUnreachable';
// `§1.4` item 2 / `§5.3` item 2 — the store's own generator's string for that code at a subject.
const GEN_TAIL = 'is not reachable at construction, the path must exist or the application must be able to write it';
const gen = (subject) => `'${subject}' ${GEN_TAIL}`;

// ---------------------------------------------------------------------------------------------
// **⟶ RE-CUT 2026-10-11 BY THE METADATA-CELL PASS (`role_test_writer`, BOUNDED THREE-CELL PASS):
// `PUB-DD-7`'s REVERSAL COLUMN IS NOW OPERATIVE, AND THE THREE METADATA FIELDS ARE ASSERTED WHERE THEY
// STAND RATHER THAN WHERE THEY WERE DECLARED ABSENT.**
//
// THE CELL THAT CARRIED THE OLD READING IS RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER:
// `contract.md §2.5` item 1 reads *"`repository` · `homepage` · `bugs` ARE DECLARED ABSENT. `[M]` this
// repository carries no remote this project's own records name, so an immutable manifest field naming a path
// that does not resolve is forbidden by the project's own citation rule; the three fields are therefore ABSENT
// from the manifest and their absence is the declaration (`PUB-DD-7`)"*, and `PUB-DD-7`'s own `DECLARED
// DEFAULT` cell reads *"`repository`/`homepage`/`bugs` are DECLARED ABSENT rather than guessed"*.
//
// **THE AUTHORITY IS THAT ROW'S OWN REVERSAL CELL, READ AT ITS BYTES: *"the three metadata fields are written
// the moment a remote exists"*** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-7`, the reversal
// column, whose `alt` price is *"any host, one line"*). **AND THE FACT THAT REVERSAL WAITED FOR ARRIVED AS A
// REFUSAL RATHER THAN AS A REMOTE: THE STAGED RUN WAS REFUSED `422` — *"Failed to validate repository
// information: package.json: `repository.url` is `""`, expected to match
// `https://github.com/LittleKingsguard/Provident-Storeroom` from provenance"* — SO THE REGISTRY'S PROVENANCE
// VERIFICATION **REQUIRES** `repository.url` TO MATCH THE PROVENANCE'S SOURCE REPOSITORY, and the remote the
// reversal names is thereby a MEASURED fact rather than a guess** (`release.md §6.7`; `PUB-DD-30`). **THE
// ABSENCE WAS NEVER THE RULE; IT WAS A PRICED DEFAULT WAITING FOR EXACTLY THIS FACT** — which is why the
// cells below assert the three fields PRESENT and RESOLVING, and why `§5.7`'s refusal (*"a
// `repository`/`homepage`/`bugs` field naming a path that does not resolve"*) is KEPT rather than deleted:
// it is still true, and it is now MET by the shipped values rather than by their absence.
// ---------------------------------------------------------------------------------------------

/** The provenance's own source repository, pinned ONCE and as a LITERAL, not read from the tree. */
const PROVENANCE_SOURCE = 'https://github.com/LittleKingsguard/Provident-Storeroom';

/**
 * Canonicalise a manifest repository URL to the provenance's own spelling, or answer `null` when the value
 * names no repository at all. **A URL THAT DOES NOT RESOLVE — `undefined`, an empty string, a bare path, a
 * placeholder — CANONICALISES TO A VALUE THAT IS NOT `PROVENANCE_SOURCE`, so the predicate below is what
 * makes `§5.7`'s refusal and `PAR-PUB-13`'s placeholder refusal MEASURABLE rather than argued.**
 */
function canonicalRepositoryUrl(url) {
  if (typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (trimmed === '') return null;
  const stripped = trimmed.replace(/^git\+/, '').replace(/\.git$/, '');
  const scp = /^(?:git@|ssh:\/\/git@)[^/:]+[:/]([^/]+\/[^/]+)$/.exec(stripped);
  if (scp) return `https://github.com/${scp[1]}`;
  return stripped;
}

/**
 * THE PROPERTY, APPLIED TO A SET OF MANIFESTS — the six shipped manifests and any scratch control alike, so
 * the drive and its controls cannot drift apart. **BOTH HALVES ARE ASSERTED: THE CENSUS (the declared field
 * set, exactly) IS DRIVEN BY THE CALLER `Object.keys`-by-`Object.keys`, AND THE VALUES (the three metadata
 * fields resolving to the provenance's own source repository) ARE DRIVEN HERE.**
 */
function assertMetadataResolvesToProvenance(manifests, declaredFields) {
  for (const { label, manifest } of manifests) {
    // (1) THE CENSUS — the declared set, now TWELVE, EXACTLY, and no field not declared.
    assert.deepEqual(Object.keys(manifest).sort(), [...declaredFields].sort(),
      `${label}: the TWELVE declared fields (the nine the platform artefact always carried, PLUS \`homepage\` · `
      + '`repository` · `bugs`, which `PUB-DD-7`\'s reversal column writes "the moment a remote exists" and '
      + 'which the registry\'s own provenance verification at `422` requires to match the provenance source) '
      + 'and no field not declared');
    // (2) THE VALUES — `PUB-DD-7` / `distribution.md §5`: the three fields resolve to the provenance's own
    // source repository. A placeholder, a bare path or an absent field does NOT (PAR-PUB-13/14/15).
    assert.equal(canonicalRepositoryUrl(manifest.repository?.url), PROVENANCE_SOURCE,
      `${label}: \`repository.url\` resolves to the provenance's own source repository — the registry's `
      + '`422` reads `repository.url` against the provenance, and `PUB-DD-7` writes the field the moment a '
      + 'remote exists');
    assert.equal(manifest.repository?.type, 'git',
      `${label}: \`repository.type\` reads \`git\`, the transport the URL above is spelled in`);
    assert.equal(canonicalRepositoryUrl(manifest.homepage), `${PROVENANCE_SOURCE}#readme`,
      `${label}: \`homepage\` resolves to the same repository's own entry point (PUB-DD-7)`);
    assert.equal(canonicalRepositoryUrl(manifest.bugs?.url), `${PROVENANCE_SOURCE}/issues`,
      `${label}: \`bugs.url\` resolves to the same repository's own issue tracker (PUB-DD-7)`);
    assert.ok(!/example\.(com|org|net)|localhost|\bTODO\b|https?:\/\/\s*$/i.test(JSON.stringify([
      manifest.repository?.url, manifest.homepage, manifest.bugs?.url,
    ])), `${label}: PAR-PUB-13/14/15 — none of the three is a PLACEHOLDER: a placeholder URL is refused, and `
      + 'these three are measured against the provenance source rather than trusted for being present');
  }
}

/** The three fields' declaration, ONCE, so the cell and its controls read one spelling of it. */
const SCRATCH_UNRESOLVING_METADATA = {
  repository: { type: 'git', url: 'https://example.com/not-this-repository' },
  homepage: 'https://example.com/not-this-repository#readme',
  bugs: { url: 'https://example.com/not-this-repository/issues' },
};

/**
 * **THE PLATFORM MANIFESTS' DECLARED SET, ONCE: NINE → TWELVE** (`§3.2`; `PUB-DD-7`; `PUB-DD-11`;
 * `PUB-DD-24`). The nine are the fields a platform artefact has always declared — `cpu` · `engines` ·
 * `files` · `license` · `main` · `name` · `os` · `publishConfig` · `version` — and the extension is
 * `homepage` · `repository` · `bugs`: **the same three `PUB-DD-7` writes *"the moment a remote exists"*, at
 * the five platform manifests and not only at the main package's**, because the registry reads
 * `repository.url` against the provenance FOR EVERY ARTEFACT IT ACCEPTS. **THE CENSUS GROWS RATHER THAN THE
 * ASSERTION LOOSENING: the assertion is still an EXACT SET EQUALITY (`deepEqual` over sorted keys, BOTH
 * DIRECTIONS), so a manifest carrying a thirteenth field, or dropping one of the twelve, goes red here
 * exactly as it did before the extension.**
 */
const PLATFORM_MANIFEST_FIELDS = [
  'bugs', 'cpu', 'engines', 'files', 'homepage', 'license', 'main', 'name', 'os', 'publishConfig',
  'repository', 'version',
];

/**
 * **THE MAIN PACKAGE'S DECLARED SET — SIXTEEN FIELDS, and the three `PUB-DD-7` fields are among them**
 * (`§2.1`–`§2.5`; `PUB-DD-1`, `PUB-DD-3`, `PUB-DD-7`, `PUB-DD-21`; `distribution.md §6`). **READ AT THE TREE
 * AND PRINTED HERE SO THE CENSUS IS A DECLARED SET RATHER THAN A COUNT**: `author` · `bugs` · `description` ·
 * `engines` · `exports` · `files` · `homepage` · `keywords` · `license` · `name` · `optionalDependencies` ·
 * `publishConfig` · `repository` · `type` · `types` · `version`.
 *
 * **AND THE ARITHMETIC, AT `parameter-semantics.md`'s OWN CELLS AND AT THIS PASS'S OWN COUNT:
 * `12` manifest fields (`PAR-PUB-1`…`PAR-PUB-12` — `name` · `version` · `files` · `types` · `exports` ·
 * `engines` · `license` · `optionalDependencies` · `publishConfig` · `description` · `keywords` ·
 * `author`) + `3` metadata fields (`PAR-PUB-13`…`PAR-PUB-15`) + `1` realm field (`PAR-PUB-16`, `type`) =
 * `16`, and the manifest's own sixth key is `optionalDependencies` — the five exact pins, read at the
 * coupling's own cell — so the manifest carries `12 + 3 + 1 = 16` ✓ and the census here is the sixteen the
 * declaration names and no more.** **THE THREE ARE NO LONGER A DECLARED ABSENCE: that part's OWN table now
 * reads `PAR-PUB-13` *"`repository` — DECLARED, WITH THE REMOTE THE REGISTRY NAMED (as-filed: `DECLARED
 * ABSENT`)"*, and the same for `PAR-PUB-14` and `PAR-PUB-15` — the reversal is written in the parameter
 * table as well as in `PUB-DD-7`'s reversal column, and `§2.5`'s own reconciliation clause writes it in the
 * contract at `15` supplied + `0` absent (`15 + 0 = 15` ✓, where the as-filed terms were `12 + 3`).**
 */
const MAIN_MANIFEST_FIELDS = [
  'author', 'bugs', 'description', 'engines', 'exports', 'files', 'homepage', 'keywords', 'license', 'name',
  'optionalDependencies', 'publishConfig', 'repository', 'type', 'types', 'version',
];

// ---------------------------------------------------------------------------------------------
// **⟶ WIDENED 2026-10-11 BY THE PROHIBITION-GAP PASS (`role_test_writer`, BOUNDED ONE-INSTRUMENT PASS): THE
// REFUSAL LIST WAS WRITTEN AGAINST THE VERB THE PACKAGE USED TO REACH FOR, THE RELEASE MOVED TO A STAGED
// VERB, AND THE PROHIBITION DID NOT FOLLOW IT.** **AS FILED, AT ITS THREE SITES (`2310`, `2744`, `2792`), THE
// LIST READ** *"`/npm publish|pnpm publish|yarn publish|npm pack|git tag|npm install -g/`"* — **A HAND-LIST OF
// SPELLINGS, AND MEASURED NON-MATCHING AGAINST `npm stage publish`, BECAUSE `stage ` SITS BETWEEN `npm` AND
// `publish`.** **SO A PACKAGE `scripts` ENTRY CARRYING `"npm stage publish --access public"` PASSED ALL
// THREE REFUSAL DRIVES** — **the same reach for a registry that `release.md §1.5` item `1` moved the
// WORKFLOW's own two sites away from, and therefore exactly the act `§4.1` item `1` / `§3.3` forbid a PACKAGE
// to author: *"a package-authored verb makes a script the release's trigger, and the release's trigger is the
// TAG"*** (`§2.1` item `1`; `§4.2` act `2`; the gap was REPORTED and left open by the staged-verb pass at
// the red set's `§16.6` finding `6`).
//
// **THE SHAPE BELOW IS A VERB FAMILY AND NOT A HAND-LIST, SO THE NEXT VERB CHANGE CANNOT ESCAPE IT BY
// INSERTING A WORD BETWEEN THE CLIENT AND THE VERB.** It refuses, in a package `scripts` body:
//   (1) `(npm|pnpm|yarn)` + an OPTIONAL `stage` + `publish|approve|pack` — the DIRECT form (`npm publish`),
//       the STAGED form (`npm stage publish`) and the PROMOTION form (`npm stage approve`, the verb
//       `PUB-DD-31` names), each of which puts THIS package's own content in front of a registry. A bare
//       client name is enough for `yarn npm publish` and `npx npm pack`, whose inner `npm …` is matched at
//       its own position, so the client's own second-position spelling is covered too;
//   (2) `(npm|pnpm|yarn)` + `dist-tag|tag` — the REGISTRY's own tagging surface, which `§4.1` item `1`'s
//       *"TAGS"* reaches beside the git tag: `npm dist-tag add …` moves the tag a staged version publishes
//       under;
//   (3) `git tag`, in any whitespace — the TAG IS THE RELEASE'S TRIGGER (`§2.1` item `1`), so a script that
//       mints one takes the trigger off the architect (`§4.2` act `2`);
//   (4) a GLOBAL INSTALL in either verb order the three clients accept — `npm i -g` · `pnpm add --global` ·
//       `yarn global add` — the as-filed entry widened to the two orders it did not spell.
//
// **WHAT IT DOES NOT MATCH, EACH WITH ITS REASON; THE FULL TABLE IS PRINTED BY THE CELL THAT DRIVES IT
// (`P-PUB-8` · `S-TAG`), WHERE EVERY ROW IS AN ASSERTION AND NOT A CLAIM:** `npm run publish` (a
// DELEGATION — the script that reaches a registry is refused at its OWN body and the `publish` SCRIPT NAME is
// refused by the clause beside this one, so delegation is covered transitively and a `npm run <x>` chain
// cannot be a route around this list) · `npm ci` and a bare `npm install` (no global flag, no registry write
// of this package's content) · `npm view` (a READ of the registry, which puts nothing of ours up) · the word
// `publish` in prose, a path or a filename (`bindings/js/test/publish.test.mjs` itself) · a `run:` step of any
// workflow — **BECAUSE THE INSTRUMENT'S SUBJECT IS THE PACKAGE'S OWN `scripts` OBJECT AND NEVER A WORKFLOW'S
// STEPS, ITS README OR ITS COMMENTARY** (`§4.1` item `1` forbids a PASS EXECUTING a publish, not the release
// workflow DECLARING one; the boundary is measured at the cell, in both directions).
// **AND TWO THINGS THE AS-FILED LIST MATCHED THAT THIS ONE DOES NOT, NAMED SO THE DIFFERENCE IS NOT
// DISCOVERED LATER: the NOUN `npm package`, and a client name immediately preceded by a word character.** Both
// are FALSE POSITIVES of the as-filed literal — neither is a verb any package used to reach a registry — and
// **NO MEMBER OF THE AS-FILED LIST IS LOST: ALL SIX ARE REFUSED HERE TOO, MEASURED MEMBER BY MEMBER AT THE
// CELL, WHICH KEEPS THE AS-FILED LIST VERBATIM AS THE YARDSTICK.** **`git tag --list`, the READ-ONLY listing
// the tests themselves perform, IS STILL MATCHED — it was matched by the as-filed list as well (`git tag` is
// a substring of it), this pass NARROWS NOTHING, and no cell applies this pattern to anything but a package
// script body, where a tag listing has no business being.**
const REFUSED_REGISTRY_VERB = new RegExp([
  '\\b(?:npm|pnpm|yarn)\\s+(?:stage\\s+)?(?:publish|approve|pack)\\b',
  '\\b(?:npm|pnpm|yarn)\\s+(?:dist-tag|tag)\\b',
  '\\bgit\\s+tag\\b',
  '\\b(?:npm|pnpm|yarn)\\s+(?:global\\s+)?(?:install|add|i)\\s+(?:-g|--global)\\b',
  '\\b(?:npm|pnpm|yarn)\\s+global\\s+(?:install|add|i)\\b',
].join('|'));

const require_ = createRequire(import.meta.url);

// ---------------------------------------------------------------------------------------------
// THE BLOCK REGISTRY — one entry per register row, printing its id, its strategy ids and its verdict
// ---------------------------------------------------------------------------------------------
const BLOCKS = {
  'P-PUB-1': { strategy: 'S-RESOLVE · S-INPLACE', ran: 0, failed: 0 },
  'P-PUB-2': { strategy: 'S-KEYSET', ran: 0, failed: 0 },
  'P-PUB-3': { strategy: 'S-PLATFORM · S-MUSL', ran: 0, failed: 0 },
  'P-PUB-4': { strategy: 'S-VERSION · S-INPLACE', ran: 0, failed: 0 },
  'P-PUB-5': { strategy: 'S-TAXONOMY · S-ONEARM', ran: 0, failed: 0 },
  'P-PUB-6': { strategy: 'S-SCOPE', ran: 0, failed: 0 },
  'P-PUB-7': { strategy: 'S-MANIFEST · S-TYPES · S-LICENCE', ran: 0, failed: 0 },
  'P-PUB-8': { strategy: 'S-TAG · S-LAYER', ran: 0, failed: 0 },
  'GUARD': { strategy: 'S-INPLACE (the JS unit\'s 113-cell leg, in place)', ran: 0, failed: 0 },
};
const VERDICTS = new Map();

/** Run one cell under its register row, and RECORD its verdict so `un-run` can never pass silently. */
function cell(row, name, fn) {
  const key = `${row}::${name}`;
  VERDICTS.set(key, 'un-run');
  test(`${row}::${name}`, async () => {
    try {
      await fn();
      BLOCKS[row].ran += 1;
      VERDICTS.set(key, 'PASS');
    } catch (err) {
      BLOCKS[row].ran += 1;
      BLOCKS[row].failed += 1;
      VERDICTS.set(key, 'FAIL');
      throw err;
    }
  });
}

test.after(() => {
  const rows = [];
  for (const [row, b] of Object.entries(BLOCKS)) {
    for (const [key, verdict] of VERDICTS) {
      if (!key.startsWith(`${row}::`)) continue;
      rows.push(`  ${key.padEnd(78)} ${verdict}`);
    }
    const verdict = b.ran === 0 ? 'UN-RUN (a FAILURE, `contract.md §5.0`)'
      : b.failed === 0 ? `PASS (${b.ran} cells)` : `FAIL (${b.failed} of ${b.ran} cells)`;
    console.log(`\n[${row}] strategies: ${b.strategy}\n[${row}] VERDICT: ${verdict}`);
  }
  console.log(`\n--- per-cell verdicts ---\n${rows.join('\n')}\n`);
});

// ---------------------------------------------------------------------------------------------
// the scratch tree and the observer
// ---------------------------------------------------------------------------------------------
const SCRATCH_ROOT = mkdtempSync(join(tmpdir(), 'storeroom-pubred-'));
process.on('exit', () => { try { rmSync(SCRATCH_ROOT, { recursive: true, force: true }); } catch { /* the sweep is best-effort */ } });

const DRIVER = `
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
const MARK = '__PUBRED__';
const STUB = process.env.PUBRED_STUB;
const req = createRequire(import.meta.url);
const say = (o) => { process.stdout.write(MARK + JSON.stringify(o) + '\\n'); };
// \`§0.1\` item 7 — the store's CLOSED 15, carried into the observer so "a declared arm" is a decidable
// question rather than a shape guess, and re-listed here because the observer is a separate process.
const CLOSED_SET = ${JSON.stringify(CLOSED_SET)};
// ONE SOURCE IS DECLARED BY A THROW AND ONE IS DECLARED BY A RETURN, AND THE DRIVER MUST NOT CONFLATE THEM:
// the load path's DECLARED answers are (a) the arm thrown by the IMPORT itself (\`§1.1\`/\`§1.4\`) and (b) the
// arm thrown by the CONSTRUCTION the entry performs on the artefact's own \`storeCreate\` (\`§1.4\` item 3:
// where the state's answer is that arm, the package "NEVER returns an instance"), while an instance RETURNED
// by that construction is the \`success\` outcome. \`ok\` records the IMPORT's own outcome (\`true\` where the
// module was evaluated); \`returned\` records whether an INSTANCE came back; and BOTH throws are recorded as
// \`arm\` where they are the declared form.
function recordArm(err) {
  if (err !== null && typeof err === 'object') {
    const own = Object.keys(err);
    if (own.length === 2 && own.includes('status') && own.includes('message') && !(err instanceof Error)
        && CLOSED_SET.includes(err.status)) {
      report.arm = { status: err.status, message: err.message };
      return true; // THE DECLARED ARM — the answer, and NOT an absorbed state
    }
    report.arm = { notTheArm: true, name: err.constructor ? err.constructor.name : 'unknown', code: err.code ?? null, message: String(err.message ?? err).slice(0, 200) };
    return false;
  }
  report.arm = { notTheArm: true, thrownClass: typeof err, message: String(err).slice(0, 200) };
  return false;
}
const report = {
  platform: process.platform, arch: process.arch,
  attempts: globalThis.__PUBRED_ATTEMPTS__,
  ok: null, error: null, arm: null, stub: null,
};
try {
  const mod = await import(process.argv[2]);
  let instance = null;
  if (typeof mod.storeCreate === 'function') {
    // THE CONSTRUCTION: a THROWN DECLARED ARM is the entry's own declared answer for a state that
    // constructs nothing, so it must be RECORDED AS THE ARM and NOT absorbed into \`error\` — the cells that
    // assert the arm, its form and its taxonomy answer for exactly these states. Every OTHER throw (a host
    // Error, an unhandled failure inside the entry) stays in \`error\`, which is where an absorbed state
    // shows up. **THE OBSERVER REPORTS; IT DOES NOT DECIDE**: the shape is tested here so that \`arm\` carries
    // the declared form and \`error\` carries everything else, and the cells decide what that means.
    // **AND THE \`cfg\` IS ONE THE STORE'S OWN \`storeCreate\` ACCEPTS**: the drive observes the LOAD PATH, so
    // its construction must reach the DECLARED SUCCESS state rather than an artefact-specific refusal of its
    // own cfg — the three declared keys, with \`listeners\` written as the empty list the cells that
    // construct the REAL artefact in place use — so \`returned\` is the LOAD PATH's outcome and not the
    // driver's cfg speaking.
    try { instance = mod.storeCreate({ journalLength: 4, listeners: [] }); } catch (e) { recordArm(e); }
  }
  report.ok = true;
  report.returned = instance !== null;
  report.verbs = Object.keys(mod).sort();
} catch (err) {
  report.ok = false;
  // **⟶ ASSIGNED BY THE RED-SET REPAIR PASS (\`PUB-RED-2\`, \`PUB-R-6\`): \`report.error\` WAS READ BY FOUR CELLS
  // AND ASSIGNED NOWHERE, SO THE THREE *"no state is absorbed silently"* ASSERTIONS COULD NOT FAIL FOR ANY
  // STATE OF THE TREE.** The reading is now what the field's own name and \`§1.4\` item 3 declare: **EVERY
  // THROW THAT IS NOT THE DECLARED ARM IS AN ABSORBED STATE** — a host \`Error\`, an unhandled failure inside
  // the entry — and it is recorded HERE, with its class and its message, while the declared arm is recorded
  // as the arm and leaves this field \`null\`, because a state ANSWERED by the declared form was never
  // absorbed. \`recordArm\` therefore reports WHICH of the two it saw, and its verdict is what decides.
  const wasTheArm = recordArm(err);
  if (!wasTheArm) {
    report.error = {
      name: err && err.constructor ? err.constructor.name : 'unknown',
      message: String(err && err.message ? err.message : err).slice(0, 200),
    };
  }
}
if (STUB) {
  // \`report.stub\` IS THE FAKE CANDIDATE'S OWN REPORT, **AND IT IS READ ONLY WHERE THE ATTEMPT SET SHOWS THE
  // LOAD PATH REACHED THE RUNG-ONE NAME** (\`§1.1\` item 1) — the observer's own question would otherwise
  // MINT the load it is asking about, because \`req(STUB)\` evaluates the file. The cells that assert
  // NOTHING WAS LOADED at a state rung one never reaches ("nothing was loaded at an uncovered key", "the
  // read is not attempted where no rung-one load occurs") read exactly this: \`resolution.md §2.1\`'s
  // \`NOT COVERED\` row attempts NO name, so the attempt set carries none and the report is \`null\`.
  const FIVE = ${JSON.stringify(FIVE_NAMES)};
  const reachedRungOne = report.attempts.some((a) => FIVE.includes(String(a)));
  // **AND THE CANDIDATE'S OWN FILE IS CHECKED FOR BEFORE THE READ IS ATTEMPTED, WHICH IS WHAT MAKES THE
  // SURFACING BELOW A FACT AND NOT AN ALARM.** \`PUBRED_STUB\` names the file the DRIVE installed; the cells
  // that REMOVE a fake to drive a rung-one miss (\`publish.test.mjs\`'s rung-three and covered-absent cells)
  // remove the file with it, and the name is still in the attempt set because rung one WAS tried. A read of a
  // file a cell deliberately removed is not a state to report: the entry's own arm is. **SO A MISSING FILE
  // MEANS "there was nothing to read" and the report is \`null\`, exactly as it is where rung one was never
  // tried at all** — while ANY OTHER failure of the read is genuinely unreadable and is surfaced in
  // \`report.error\` rather than swallowed (see the block below).
  const readAttempted = reachedRungOne && STUB && existsSync(STUB);
  if (readAttempted) {
    // **⟶ REPAIRED BY THE RED-SET REPAIR PASS (\`PUB-RED-2\`, \`PUB-R-12\`): THE OBSERVER'S OWN RE-REQUIRE
    // FAILURE IS NOW SURFACED WHERE A CELL READS IT.** The shipped form wrote it to \`report.stub.reportError\`
    // — a member NO CELL OF THIS SET INSPECTS — so the load path reached the rung-one name, the observer's own
    // \`req(STUB)\` failed, and the only record of it was a field nothing read: a cell doing \`r.stub.calls.version\`
    // then read \`undefined\` against \`1\` and reported **a version failure at the wrong site**. **\`report.error\`
    // IS THE FIELD THIS SET READS AS "an absorbed state", AND AN OBSERVER THAT COULD NOT READ THE ARTEFACT IT
    // WAS ASKED TO REPORT IS EXACTLY THAT**: the failure is recorded there with its own name, so it surfaces at
    // \`assertRefusedOutcome\` and at the \`S-ONEARM\` loop instead of being mis-attributed to the read.
    try {
      report.stub = req(STUB).report;
    } catch (e) {
      report.stub = null;
      report.error = {
        name: 'StubReportUnreadable',
        message: String(e && e.message ? e.message : e).slice(0, 200),
      };
    }
  } else {
    report.stub = null;
  }
}
say(report);
`;

const PRELOAD = `
'use strict';
const Module = require('node:module');
const attempts = [];
globalThis.__PUBRED_ATTEMPTS__ = attempts;
const orig = Module._load;
Module._load = function (request, parent, isMain) {
  attempts.push(String(request));
  return orig.apply(this, arguments);
};
const plat = process.env.PUBRED_PLATFORM;
const arch = process.env.PUBRED_ARCH;
if (plat) Object.defineProperty(process, 'platform', { value: plat, configurable: true });
if (arch) Object.defineProperty(process, 'arch', { value: arch, configurable: true });
`;

/**
 * ONE FAKE PLATFORM ARTEFACT, faithful to the four export names the real addon carries
 * (`version` · `errorMessage` · `storeCreate` · `call` · `register` — `package.md §1.3 item 4` at the
 * sibling home, read only for the artefact's SHAPE). **The generator inside it is the STORE'S OWN
 * GENERATOR'S RENDERING of `FilePathUnreachable` at a subject (`contract.md §1.4` item 1 reads *"the
 * store's own GENERATOR'S STRING for that code at the SUBJECT the clause fixes"*), reproduced so a drive
 * can reach the arm's message without the implementation existing.**
 *
 * **AND ITS OWN `storeCreate` CONSTRUCTS A FAITHFUL MINIMAL INSTANCE** (`§1.4` item 3: the
 * `present-right-version` state is `SUCCESS`, and `success` means AN INSTANCE IS RETURNED). The artefact
 * under a fake platform package IS the store for these drives — the contract's own `§1.4` item 3 forbids a
 * JS-side store, so the construction the entry performs has NO other source of an instance — and a fake
 * whose `storeCreate` could only throw made every `returned === true` / `error === null` cell
 * UNSATISFIABLE BY ANY IMPLEMENTATION. **SO THE FAKE CONSTRUCTS FOR THE STATES THAT DECLARE SUCCESS
 * (PUB-CF-9) AND KEEPS ITS THROW FOR `call` AND `register`, which no cell of this set reaches.**
 */
function stubSource(variant, opts = {}) {
  const VARIANT_VERSION = {
    right: "'0.1.0'",
    wrong: "'9.9.9'", // `PUB-DD-19`: a different string is the mismatch arm
    empty: "''", // and an empty string alike
    notstring: '0.1', // and a value that is not a string alike
    notcallable: '42', // and an `addon.version` that is not callable alike
  };
  const callable = variant !== 'notcallable';
  // **`fromOwnManifest` (`PUB-R-8` / `NG-PUB-D`'s sibling): THE FAKE ANSWERS THE `version` ITS OWN
  // `package.json` DECLARES, READ AT CALL TIME** — so a scratch manifest whose `version` DIFFERS from the
  // literal this file would otherwise hardcode forces the ENTRY'S READ SOURCE apart from the artefact's
  // answer. Without it the scratch manifest and the fake carried the SAME literal `0.1.0` in every drive, so
  // a load that read the version from the platform package's own manifest, from a constant, or from the
  // environment passed all six `P-PUB-4` cells: the clause's own *"never passed in, configured or defaulted"*
  // half had no drive at all. **THE ARTEFACT'S OWN MANIFEST IS THE ONE HOME A CANDIDATE MAY LAWFULLY READ ITS
  // OWN VERSION FROM**, so this is a faithful artefact and not a doctored one.
  const versionValue = opts.fromOwnManifest
    ? "JSON.parse(require('node:fs').readFileSync(require('node:path').join(__dirname, 'package.json'), 'utf8')).version"
    : VARIANT_VERSION[variant];
  // **⟶ ADDED BY THE PRE-TAG PASS (`PUB-R-13`): THE FAKE'S `errorMessage` IS NOW A LEVER, BECAUSE
  // `contract.md §1.4` ITEM 7 DECLARES A STATE IN WHICH THE ARTEFACT LOADED AND CARRIES NO USABLE
  // GENERATOR.** `opts.errorMessage` names the THREE TRIGGER CONDITIONS that clause enumerates —
  // `'absent'` (the member is not there at all), `'throws'` (its own generator throws), and `'notstring'`
  // (it answers a value that is not a `string`) — and the DEFAULT IS UNCHANGED: a callable generator
  // rendering the store's own clause, which is the artefact every other drive in this set loads. **NO
  // DRIVE THAT DOES NOT ASK FOR A BROKEN GENERATOR SEES ONE, and the counter `calls.errorMessage` makes
  // the difference measurable from outside.**
  const generatorMember = {
    absent: '',
    throws: `  errorMessage() {
    calls.errorMessage += 1;
    throw new Error("the loaded artefact's own generator failed in turn");
  },`,
    notstring: `  errorMessage() {
    calls.errorMessage += 1;
    return 42; // not a \`string\`: arm (a) has nothing to reach
  },`,
  }[opts.errorMessage] ?? `  errorMessage(code, subject) {
    // the store's own generator's rendering, for the one code this unit's arm carries
    calls.errorMessage += 1;
    return "'" + subject + "' " + GEN_TAIL;
  },`;
  return `'use strict';
// THE FAKE CANDIDATE: this stands where a platform package's resolution would land. Variant: ${variant}.
const calls = { version: 0, storeCreate: 0, errorMessage: 0 };
const GEN_TAIL = ${JSON.stringify(GEN_TAIL)};
const report = { variant: ${JSON.stringify(variant)}, calls, loadError: null };
function versionValue() { return ${versionValue}; }
const versionMember = ${callable}
  ? function () { calls.version += 1; return versionValue(); }
  : versionValue(); // PUB-DD-19's non-callable arm: 42 is not a function
const api = {
  /// **WHETHER THE LOAD PATH REALLY LOADED THIS CANDIDATE, READ FROM THE ATTEMPT SET THE OBSERVER ALREADY
  /// KEEPS.** The observer records every module load through its \`Module._load\` hook, and reading this file
  /// to ask it what it counted is ITSELF such a load — so a counter inside this module answers "the observer
  /// asked" and not "the entry required". The driver therefore reads the fake's report ONLY where the
  /// attempt set carries this file's own resolved path (below); this member stays the fake's own honest,
  /// zero-initialised count rather than a signal the observer's own question would forge.
  loads: 0,
  version: versionMember,
${generatorMember}
  /// **THE CONSTRUCTION THE ENTRY PERFORMS ON THE ARTEFACT IT RESOLVED** — the ONE source of an instance
  /// (the contract's own §1.4 item 3 refutes every JS-side fallback, a partial instance and a no-op verb).
  /// It records its OWN invocation (the cells that assert the loaded candidate is what constructs the store
  /// count it) and answers an instance of the DECLARED SHAPE: the THREE own members 'surface.md §2.4' item
  /// 5 declares — 'on(address, listener)' the combined registration, 'off(handle)' the store-side
  /// withdrawal together with this instance's own registry removal, and 'register(handle, listener)' the
  /// opaque-handle registration — in the order the real factory builds them, and NOTHING else. It performs
  /// NO core work, because this drive observes the LOAD PATH's outcome and never the store's behaviour: the
  /// store's own arms belong to the sibling unit's battery and to the live drive, each of which runs
  /// against the REAL artefact.
  storeCreate(encodedCfg) {
    calls.storeCreate += 1;
    const instance = {
      on(address, listener) { return registerOn(instance, listener); },
      off(handle) { return undefined; },
      register(handle, listener) { return registerOn(instance, listener, handle); },
    };
    return instance;
  },
  call() { throw { status: 'AddressMalformed', message: 'the fake candidate does not call a store' }; },
  register() { throw { status: 'AddressMalformed', message: 'the fake candidate does not register' }; },
  report,
};
/// \`surface.md §2.4\` item 5 (b): \`register\` takes the OPAQUE handle a verb returned or the construction
/// adopted, and ANY JS function. A non-function listener is refused with the store's own \`AddressMalformed\`
/// member and its generator's rendering — the form the real artefact answers with — so the fake's refusal
/// and the real one agree in SHAPE.
function registerOn(instance, listener, handle) {
  if (typeof listener !== 'function') {
    throw { status: 'AddressMalformed', message: "'" + String(listener) + "' is not a listener" };
  }
  return handle === undefined ? {} : handle;
}
module.exports = api;
`;
}

function writeStub(dir, variant, opts = {}) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.js'), stubSource(variant, opts));
  // **THE FAKE'S OWN `version` IS THE ONE ITS OWN MANIFEST DECLARES, AND `PUB-R-8`'s DRIVE MAKES IT DIFFER
  // FROM THE SCRATCH PACKAGE'S**: where `opts.manifestVersion` is given, the artefact's manifest carries it
  // and the fake answers THAT string at call time, so the entry's read source is forced apart from it.
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'stub', version: opts.manifestVersion ?? '0.1.0', main: 'index.js',
  }, null, 2));
  return join(dir, 'index.js');
}

/**
 * ASSEMBLE ONE SCRATCH TREE for a drive. `rungOne` installs a fake platform artefact (by name), `rungTwo`
 * writes the candidate rung two, `rungTwoDecoy` marks the `PAR-PUB-30` outside-value drive, and
 * `manifestVersion` fixes the version the SCRATCH PACKAGE'S OWN MANIFEST declares — which `§1.5` item 1
 * makes the ONE source the read may take it from.
 */
function makeScratch({ label, rungOne, rungTwo = 'absent', rungTwoDecoy = null, parentDecoy = false, env = {}, manifestVersion = '0.1.0', entrySource = null }) {
  const dir = mkdtempSync(join(SCRATCH_ROOT, `${label.replace(/[^a-zA-Z0-9-]/g, '_')}-`));
  // **`entrySource` IS THE CONTROL'S ONE LEVER** and it is `null` for every drive that observes the SHIPPED
  // entry: a scratch copy of `bindings/js/index.mjs` carrying a deliberate fault — the `§1.4` item 7
  // finding, or the second failure shape — is staged in its place, so a cell's own assertion is MEASURED
  // against bytes that must fail it. **NOTHING OF THE REPOSITORY IS WRITTEN BY A CONTROL**: the mutant
  // stands under the operating system's temporary area, beside the scratch manifest and the fake artefact.
  writeFileSync(join(dir, 'index.mjs'), entrySource ?? readFileSync(join(PKG_DIR, 'index.mjs')));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'provident-storeroom', version: manifestVersion, type: 'module',
    exports: { '.': { import: './index.mjs' } },
  }, null, 2));
  writeFileSync(join(dir, 'preload.cjs'), PRELOAD);
  writeFileSync(join(dir, 'driver.mjs'), DRIVER);
  let stubFile = null;
  if (rungOne) {
    const parts = rungOne.name.split('/');
    stubFile = writeStub(join(dir, 'node_modules', ...parts), rungOne.variant, rungOne);
  }
  if (rungTwo === 'valid') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x00, 0x01]));
  } else if (rungTwo === 'broken') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), 'not a node addon at all\n');
  } else if (rungTwo === 'directory') {
    mkdirSync(join(dir, RUNG_TWO_TAIL), { recursive: true });
  }
  if (rungTwoDecoy) {
    mkdirSync(join(dir, 'decoy', 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, 'decoy', RUNG_TWO_TAIL), 'decoy\n');
  }
  if (parentDecoy) {
    const parent = dirname(dir);
    writeFileSync(join(parent, 'storeroom_js_binding.node'), 'parent decoy\n');
  }
  return { dir, stubFile, entry: join(dir, 'index.mjs'), preload: join(dir, 'preload.cjs'), driver: join(dir, 'driver.mjs'), env };
}

/** Run one drive: the subprocess is the observer, and nothing of the repository is touched. */
function drive(env, { platform, arch, cwd = env.dir, extraEnv = {} }) {
  const out = execFileSync(process.execPath, ['--require', env.preload, env.driver, env.entry], {
    cwd,
    encoding: 'utf8',
    timeout: 60000,
    env: {
      ...process.env,
      NODE_PATH: join(env.dir, 'node_modules'),
      PUBRED_STUB: env.stubFile ?? '',
      PUBRED_PLATFORM: platform,
      PUBRED_ARCH: arch,
      ...env.env,
      ...extraEnv,
    },
  });
  const line = out.split('\n').find((l) => l.startsWith('__PUBRED__'));
  assert.ok(line, `the drive produced no report (stdout was: ${out.slice(0, 400)})`);
  const report = JSON.parse(line.slice('__PUBRED__'.length));
  report.requests = report.attempts.map((a) => String(a).split('\\').join('/'));
  return report;
}

/** Build a scratch environment carrying ONE fake artefact for ONE covered key. */
function coveredEnv(key, variant, opts = {}) {
  return makeScratch({
    label: `cov-${key.label}-${variant}`,
    rungOne: { name: key.name, variant, ...(opts.rungOne ?? {}) },
    rungTwo: opts.rungTwo ?? 'broken',
    manifestVersion: opts.manifestVersion ?? '0.1.0',
    entrySource: opts.entrySource,
  });
}

// ---------------------------------------------------------------------------------------------
// the contract's own assertions, applied to a drive's report
// ---------------------------------------------------------------------------------------------
const isRungTwo = (r) => String(r).includes('storeroom_js_binding.node');

/** `§1.4` item 1 / `resolution.md §5.3` item 1 — the arm's form, exactly. */
function assertArm(report, { subject }) {
  const A = report.arm;
  assert.ok(A && A.notTheArm !== true, `no arm was thrown: ${JSON.stringify(report).slice(0, 600)}`);
  assert.deepEqual(Object.keys(A), ['status', 'message'],
    '`§1.4` item 1: the member set is EXACTLY `{status, message}`');
  assert.equal(A.status, ARM_STATUS,
    '`PUB-DD-17`: the status is the store\'s own `FilePathUnreachable`, carried and never minted');
  assert.ok(CLOSED_SET.includes(A.status), '`§0.1` item 7: no status outside the store\'s closed 15');
  if (subject !== undefined) {
    assert.ok(A.message.includes(gen(subject)) || A.message === gen(subject),
      `the message is the store's generator's string at the subject; got ${JSON.stringify(A.message)}`);
  }
  return A;
}

/**
 * `§1.4` item 3 — **THE OUTCOME OF A STATE WHOSE DECLARED ANSWER IS THE ARM**: *"the package NEVER falls
 * back to a JavaScript store, NEVER absorbs a state silently, NEVER degrades to a partial instance or a
 * no-op verb"*, so the drive `returned` NO instance — the arm IS the answer — and `error` carries nothing,
 * because a state that was answered by the declared arm was not absorbed. **THIS IS THE ARM'S OWN OUTCOME
 * AND NOT THE SUCCESS ONE**: asserting `returned === true` beside an assertion that the arm was thrown
 * would assert a contradiction in the driver's own terms (`success` and the arm are the two DIFFERENT
 * answers of the taxonomy, `resolution.md §5.2`), and the earlier form of this helper did exactly that —
 * see `PUB-CF-10` at `archive/gate3/storeroom-publish-red-set.md`.
 */
function assertRefusedOutcome(report) {
  assert.equal(report.returned, false,
    '`§1.4` item 3: the state\'s declared answer is the ARM, so the package returns NO instance — never a '
    + 'fallback to a JS store, a partial instance or a no-op verb');
  assert.equal(report.error, null,
    'no state is absorbed silently: a non-declared throw would be reported in `error`, not as the arm');
}

/**
 * `P-PUB-5`'s failure list: no fallback, no partial instance, no no-op verb, no fourth outcome. **The
 * OBSERVABLE OF A "FOURTH OUTCOME" IS THAT THE DRIVE NEITHER RETURNED AN INSTANCE NOR ANSWERED THE ONE
 * ARM** — which is exactly what a load path with no rung one yet produces (the entry never reaches the
 * declared answer, because the state the arm answers for is never reached). `report.error` is not asserted
 * here: a state that reaches neither the declared answer nor an instance has already failed this cell, and
 * asserting the same fact twice would hide WHICH requirement moved.
 */
function assertNoFallback(report) {
  assert.ok(!(report.returned === true && report.arm !== null),
    'no drive may both return an instance and answer the arm');
  assert.ok(report.returned === true || report.arm !== null,
    'the outcome is `success` or the one arm — never a fourth outcome (`§1.4` item 3)');
}

/**
 * **`PAR-PUB-29` (`S-TAG`) — THE TAG, RESOLVED IN THE REPOSITORY RATHER THAN COMPUTED IN THE TEST.**
 * `contract.md §3.2` item 1: *"The tag's form is `v<major>.<minor>.<patch>`, the MAIN package's `version` is
 * that tag's version, and NO publication happens from an untagged commit"*; `parameter-semantics.md §4.5`
 * (`PAR-PUB-29`): the tag's domain is *"`v<major>.<minor>.<patch>`, whose version is the MAIN package's
 * `version`"*, and its first outside value is *"an untagged commit's head → REFUSED"*.
 *
 * **THE INSTRUMENT IS `git`'s OWN RESOLUTION AND IT IS NOT A STRING THIS FILE BUILT** (`PUB-R-9`): the
 * shipped cell asserted `tagRule.test('v' + manifest.version)`, a regex applied to a string the test
 * composed from the version itself — a predicate that holds for every three-component version there could
 * ever be, and therefore asserts nothing about the tree. `git tag --list` is asked for the ONE name the
 * coupling fixes, and its answer is the fact. **ITS RESOLUTION IS NOT VACUOUS, AND THE GENERATOR
 * `NG-PUB-J` PROVES THAT WITH A CONTROL**: the same call finds a tag in a scratch repository that has one.
 */
function resolveTagVersion(repo, version) {
  const listed = execFileSync('git', ['-C', repo, 'tag', '--list', `v${version}`], {
    encoding: 'utf8', timeout: 30000,
  }).trim();
  return { listed, present: listed === `v${version}` };
}

/** **`§2.1` item 1 — THE TAG'S DECLARED FORM AT ONE HOME**, so the instrument below and every cell that
 *  prints it read the SAME rule: *"THE TAG'S FORM IS `v<major>.<minor>.<patch>`"* (`PAR-PUB-29`). */
const TAG_FORM = /^v\d+\.\d+\.\d+$/;

/** **THE REPOSITORY'S OWN TAG LIST, READ MECHANICALLY AND WITHOUT A FILTER** (`git tag --list`, EVERY tag):
 *  the coupling is a statement about the tags the repository CARRIES, so the drive reads the whole list
 *  rather than the one name it hopes to find — a name filter would hide exactly the tag `PAR-PUB-29`'s
 *  second outside value refuses (*"a tag whose version differs from the six manifests' → REFUSED"*). */
function repoTagList(repo) {
  return execFileSync('git', ['-C', repo, 'tag', '--list'], { encoding: 'utf8', timeout: 30000 })
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');
}

/** **THE MAIN MANIFEST'S OWN PATH, RELATIVE TO THE REPOSITORY ROOT** — derived from `PKG_DIR` and
 *  `REPO_ROOT` rather than written a third time, because `git show <tag>:<path>` reads a path relative to
 *  the repository root and a literal here would be a second home for a fact the two constants already fix. */
const MAIN_MANIFEST_REL = join(PKG_DIR, 'package.json').slice(REPO_ROOT.length + 1).split(sep).join('/');

/** **THE TAG'S COMMIT, NAMED AND PLACED**: which commit `refs/tags/v<version>` points at, and whether that
 *  commit lies on `HEAD`'s own history. **A TAG WHOSE COMMIT IS OUTSIDE THIS BRANCH'S HISTORY IS NOT THIS
 *  TREE'S RELEASE** — `release.md §1.3` item `2` makes the provenance subject *"the TAGGED COMMIT OF THIS
 *  REPOSITORY"*, so a tag naming a commit this branch does not carry names bytes no reader of this tree can
 *  reach, and the coupling would be a coincidence of two strings rather than a statement about this tree. */
function tagCommit(repo, version) {
  const named = execFileSync('git', ['-C', repo, 'rev-parse', '--verify', `refs/tags/v${version}^{commit}`], {
    encoding: 'utf8', timeout: 30000,
  }).trim();
  let onHeadHistory = false;
  try {
    execFileSync('git', ['-C', repo, 'merge-base', '--is-ancestor', named, 'HEAD'], {
      encoding: 'utf8', timeout: 30000,
    });
    onHeadHistory = true;
  } catch {
    onHeadHistory = false;
  }
  return { named, onHeadHistory };
}

/**
 * **`PAR-PUB-29` (`S-TAG`) — THE COUPLING RULE, DRIVEN AS AN EQUALITY RATHER THAN AS AN ABSENCE, AND DRIVEN
 * AGAINST ANY REPOSITORY SO THAT ONE CLAUSE OF IT MAY BE BROKEN AT A TIME.**
 *
 * `release.md §2.1` item `2` pins the equality — *"THE MAIN PACKAGE'S `version` IS THAT TAG'S VERSION"* —
 * beside item `1`'s form and item `3`'s *"NO PUBLICATION HAPPENS FROM AN UNTAGGED COMMIT"*; and
 * `parameter-semantics.md §4.5` (`PAR-PUB-29`) states the same rule as a DOMAIN with an outside value:
 * *"a tag whose version differs from the six manifests' → REFUSED"*. **THE PROPERTY IS THEREFORE COUPLING,
 * AND IT IS READ AT FOUR SITES, EACH MECHANICAL AND NONE OF THEM A STRING THIS FILE COMPOSED:**
 *   **(a)** the repository's OWN tag list (`git tag --list`, unfiltered) — EVERY tag the repository carries
 *     has the declared form, and its version EQUALS the main manifest's `version`;
 *   **(b)** the coupling's own tag `v<version>` RESOLVES in that list (`resolveTagVersion`, git's answer);
 *   **(c)** the manifest AT that tag (`git show <tag>:<path>`, the file's own home) declares the same version;
 *   **(d)** the tag's commit EXISTS as a commit object and lies on `HEAD`'s own history.
 * **A CONTROL DRIVES THIS SAME FUNCTION** against a scratch repository outside this one, so a clause that
 * cannot fail is a clause this cell reports as a finding rather than as a reading.
 */
function assertTagCoupling(repo, { version, label }) {
  assert.ok(TAG_FORM.test(`v${version}`),
    `\`§2.1\` item 1 / \`PAR-PUB-29\`: the tag's form is the version's (${label})`);
  assert.ok(!TAG_FORM.test('main') && !TAG_FORM.test('HEAD'),
    `\`§2.1\` item 3 (${label}): NO PUBLICATION HAPPENS FROM AN UNTAGGED COMMIT`);
  const listed = repoTagList(repo);
  const resolution = resolveTagVersion(repo, version);
  assert.equal(resolution.present, true,
    `\`PAR-PUB-29\` / \`release.md §2.1\` item 2 (${label}): the manifest declares \`${version}\`, so `
    + `\`v${version}\` IS the tag the coupling fixes, and it must EXIST in this repository. Its own `
    + `\`git tag --list\` answers ${JSON.stringify(listed)}`);
  assert.equal(resolution.listed, `v${version}`,
    `(${label}) the resolution's own return value is read rather than a boolean`);
  for (const tag of listed) {
    assert.ok(TAG_FORM.test(tag),
      `(${label}) \`§2.1\` item 1: every tag this repository carries has the declared form; got \`${tag}\``);
    assert.equal(tag.slice(1), version,
      `(${label}) \`§2.1\` item 2 / \`PAR-PUB-29\`: THE TAG'S VERSION AND THE MAIN MANIFEST'S \`version\` DIVERGE `
      + `— \`${tag}\` carries \`${tag.slice(1)}\` where the manifest declares \`${version}\`. A tag whose version `
      + 'differs from the six manifests\' is REFUSED, so this is a FINDING and not a relaxation');
  }
  const atTag = JSON.parse(execFileSync('git', ['-C', repo, 'show', `${resolution.listed}:${MAIN_MANIFEST_REL}`], {
    encoding: 'utf8', timeout: 30000,
  })).version;
  assert.equal(atTag, version,
    `(${label}) \`PAR-PUB-18\`: THE MANIFEST AT THE TAG (\`${resolution.listed}:${MAIN_MANIFEST_REL}\`) declares `
    + `\`${atTag}\` WHERE THE COUPLING FIXES \`${version}\` — the tag and the manifest DIVERGE, which the `
    + 'coupling rule REFUSES and which no other drive of this unit compares');
  const { named, onHeadHistory } = tagCommit(repo, version);
  assert.match(named, /^[0-9a-f]{40}$/,
    `(${label}) the tag names a commit object in this repository: ${JSON.stringify(named)}`);
  assert.equal(onHeadHistory, true,
    `(${label}) \`release.md §1.3\` item 2: the tag's commit \`${named}\` must be REACHABLE — it must lie on `
    + 'THIS branch\'s own history — so the bytes the tag names are the bytes this tree carries');
  return { version, tags: listed, tag: resolution.listed, commit: named };
}

/**
 * **`A89` (`docs/specs/storeroom-publish-proposal.md §15`) — THE DECLARED RELEASE VERSION, READ FROM THE
 * RULING THAT DECLARES IT RATHER THAN FROZEN AT A SITE THAT DOES NOT.**
 *
 * `§15`'s sequence, item 1: *"the six manifests move to **`X.Y.Z` TOGETHER — the five platform
 * `version`s AND the main's five `optionalDependencies` PINS, which are EXACT"* — quoted in the ruling's OWN
 * schematic form, because the operative figure is read FROM THE RULING by `declaredReleaseVersion` below and is NOT FROZEN HERE (`DEF-2026-10-13-C`) — and `§15`'s own row 4 declares the state this replaces: *"`0.1.0` IS THE BOOTSTRAP VERSION: DECLARED, not a release"*.
 * `parameter-semantics.md §2.2` (`PAR-PUB-2`) states the domain the same way (*"the tag's own version …
 * and thereafter exactly the tag's `v<major>.<minor>.<patch>` value"*), and its first outside value is
 * *"a version differing from the five platform artefacts' → REFUSED by the coupling rule"*.
 *
 * **WHY THE READER AND NOT A LITERAL.** The operative value is a fact about the CONTRACT — which version
 * is released — so the cells assert it against the ruling's own bytes: a literal here would be a THIRD
 * home for a value the contract already carries once, and the next declared release would rot it. The
 * reader is deliberately NARROW: it anchors on the ONE phrase the ruling uses for the release act, so a
 * clause naming some other version of some other thing cannot be mistaken for it.
 */
function declaredReleaseVersion(repo) {
  const proposal = readFileSync(join(repo, 'docs', 'specs', 'storeroom-publish-proposal.md'), 'utf8');
  const clause = /the six manifests move to \*\*`(\d+\.\d+\.\d+)` TOGETHER/.exec(proposal);
  assert.ok(clause !== null,
    '`A89` / `docs/specs/storeroom-publish-proposal.md §15` item 1 must declare the release version at its '
    + 'own phrase ("the six manifests move to `X.Y.Z` TOGETHER"); an absent clause is a finding, not a skip');
  return clause[1];
}

/**
 * **THE COUPLING RULE, ENUMERATED BY NAME AND NOT BY POSITION** (`contract.md §3.2` item 2, `PUB-DD-10`;
 * `distribution.md §6.3`; `release.md §2.2`; `parameter-semantics.md §2.2` `PAR-PUB-2` and `§2.8`
 * `PAR-PUB-8`): **every platform artefact's `version` EQUALS its exact pin in the main package, and the
 * main's `version` is the released version.** The five names are read from the five platform manifests
 * THEMSELVES, which is why a substitution — a pin pointing at a name whose manifest says another version —
 * is caught here rather than by five comparisons of one string.
 */
function mainVersionCoupling() {
  const main = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const pins = main.optionalDependencies ?? {};
  const platformsDir = join(PKG_DIR, 'platforms');
  const platformVersions = new Map();
  for (const label of readdirSync(platformsDir).sort()) {
    const path = join(platformsDir, label, 'package.json');
    if (!existsSync(path)) continue;
    const m = JSON.parse(readFileSync(path, 'utf8'));
    platformVersions.set(m.name, { version: m.version, path });
  }
  return { main, pins, platformVersions, platformsDir };
}

// ---------------------------------------------------------------------------------------------
// §5.1 P-PUB-1 — THE RESOLUTION ORDER IS THE DECLARED ORDER (`§1.1`, `resolution.md §2`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED (three rungs × the outcome at each):
//   rung one: a covered key whose platform artefact is present and loadable · present and unloadable ·
//     absent (a miss) — and at an uncovered key, NOT ATTEMPTED AT ALL (`resolution.md §2.2`)
//   rung two: the module-relative addon present and loadable · present and unloadable · absent
//   rung three: reached only when BOTH rungs were tried and neither yielded a loadable artefact;
//     its subject is one path where one rung was tried, both paths where both were tried
// FAIL-STATES: a rung-one success reported as rung two · a rung-two load that never attempts rung one ·
//   a rung-three answer reached while a rung is untried · a candidate list resolved out of order ·
//   a rung-two path derived from anything but the entry module's own location · a rung-two attempt AFTER
//   rung one succeeded (`contract.md §5.1`)

cell('P-PUB-1', 'S-RESOLVE rung one resolves and is reported as rung one', async () => {
  // `§1.1` item 1 — rung one `require`s THE ONE NAME the closed key set declares for the pair, and no
  // other name; on success NO rung-two attempt is made (`§1.4`, present-right-version cell).
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.returned, true, `rung one must resolve; the report was ${JSON.stringify(r).slice(0, 500)}`);
  assert.equal(r.stub.calls.version, 1, '`§1.5` item 1: the addon\'s own version is read at load');
  assert.equal(r.stub.calls.storeCreate, 1, 'the loaded candidate is the artefact that constructs the store');
  assert.equal(r.returned, true, 'a successful rung one returns an instance');
  assert.equal(r.requests.filter(isRungTwo).length, 0,
    '`§1.4` item 2: NO rung-two attempt is made where rung one succeeded');
});

cell('P-PUB-1', 'S-RESOLVE rung one misses and rung two then resolves', async () => {
  // `§1.1` item 2 with item 1: failing rung one the entry requires the module-relative addon. The
  // candidate rung two is a real artefact copied from the repository's own build directory, so the
  // LOAD is real and only its LOCATION is staged.
  const env = makeScratch({ label: 'res-two', rungTwo: 'absent' });
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  assert.ok(existsSync(realAddon), 'the drive\'s precondition: the repository\'s own built artefact exists');
  {
    mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  }
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(r.requests.includes(COVERED[0].name),
    '`§1.1` item 1: rung one is ATTEMPTED first, before any other candidate');
  assert.ok(r.requests.some(isRungTwo), '`§1.1` item 2: failing rung one, rung two is attempted');
  const order = r.requests.filter((x) => x === COVERED[0].name || isRungTwo(x));
  assert.deepEqual(order, [COVERED[0].name, r.requests.find(isRungTwo)],
    'the order is rung one then rung two, and never the reverse');
  assert.equal(r.ok, true, 'the staged real artefact loads at rung two');
  assert.equal(r.error, null, '`§1.4` item 3: a rung-two load is a SUCCESS, with no version comparison');
  assert.equal(r.returned, true, 'rung two returns an instance');
});

cell('P-PUB-1', 'S-RESOLVE rung three is reached only after both rungs were tried', async () => {
  // `§1.1` item 3 with `§1.4`: rung three is the declared absent-addon form, reached ONLY when both rung
  // one and rung two have been tried and neither yielded a loadable artefact — and its subject is BOTH
  // paths (`resolution.md §5.3` item 2).
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' });
  // the fake rung one is REMOVED for this drive: both rungs must miss.
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(r.requests.includes(COVERED[0].name), 'rung one was TRIED (`§1.1` item 1)');
  assert.ok(r.requests.some(isRungTwo), 'rung two was TRIED (`§1.1` item 2)');
  // **\`ok\` REPORTS WHETHER THE STAGED ENTRY WAS EVALUATED AT ALL, AND THIS STATE'S ANSWER IS THE ARM THE
  // ENTRY THROWS DURING THAT EVALUATION** (\`§1.1\` item 3: rung three is the declared absent form, thrown by
  // the load path itself) — so the entry IS evaluated and the refusal is read from the ARM. The earlier form
  // of this assertion demanded \`ok === false\` while ALSO reading the arm, i.e. it demanded a state in which
  // no arm is visible (\`PUB-CF-10\`); the declared answer is asserted here INSTEAD of being assumed.
  assert.equal(r.ok, true, 'the staged entry was evaluated: the declared absent form is the ARM it throws');
  assertRefusedOutcome(r);
  const A = assertArm(r, {});
  // `§1.4` item 2 — the subject where BOTH rungs were tried is BOTH PATHS, so a consumer on an uncovered
  // key reads exactly which two things were tried. **THE JOIN BETWEEN THEM IS NOT DECLARED BY ANY CLAUSE,
  // so this drive asserts the CONSUMER'S PROPERTY — both paths are present, each in the generator's own
  // `'<subject>'` slot, and the generated clause stands — and does NOT pin a separator the contract leaves
  // undecided** (reported as a CONTRACT FINDING at `archive/gate3/storeroom-publish-red-set.md`).
  assert.ok(A.message.includes(`'${COVERED[0].name}'`),
    'the subject is BOTH paths: rung one\'s resolved name is reported too');
  assert.ok(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    'the subject is BOTH paths: rung two\'s module-relative path is reported too');
  assert.ok(A.message.endsWith(GEN_TAIL), 'the generator\'s own clause stands beside both subjects');
  assertNoFallback(r);
});

cell('P-PUB-1', 'S-RESOLVE a rung-two load is never reported as rung one', async () => {
  // `§5.1` FAILURE LIST item 1: "a rung-one success reported as rung two" and its converse. The
  // observable is the ATTEMPT SET: where rung one resolved, rung one's name is in it and no rung-two path
  // is; where rung one missed, its name is in the set BEFORE rung two's path.
  const one = drive(coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(one.requests.includes(COVERED[0].name), 'a rung-one resolution names rung one');
  assert.equal(one.requests.filter(isRungTwo).length, 0, 'and never reaches rung two');
  const two = drive(makeScratch({ label: 'two-only', rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const rungOneAt = two.requests.indexOf(COVERED[0].name);
  const rungTwoAt = two.requests.findIndex(isRungTwo);
  assert.ok(rungOneAt >= 0, '`§1.1` item 1: rung one IS attempted at a covered key');
  assert.ok(rungTwoAt >= 0, '`§1.1` item 2: rung two is attempted after the miss');
  assert.ok(rungOneAt < rungTwoAt,
    'where both are attempted, rung one\'s attempt precedes rung two\'s — and never the reverse');
});

cell('P-PUB-1', 'S-RESOLVE rung two is derived from the entry module\'s own location', async () => {
  // `PUB-DD-20` / `PAR-PUB-30`: rung two's path is constructed from the ENTRY MODULE'S OWN LOCATION and
  // from NO other source — no environment variable, no configuration key, no path relative to the
  // process's working directory, and no search of a parent directory. Three drives: the same tree from two
  // different working directories, an environment-variable decoy, and a parent-directory decoy.
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  // **THE SECOND DRIVE MUST MISS AT RUNG ONE, SINCE RUNG TWO IS THE RUNG ONLY A MISS REACHES** (`§1.1` item
  // 2: *"FAILING RUNG ONE"*). The rung-one fake is REMOVED from this tree for that drive, so its rung one is
  // an ordinary `MODULE_NOT_FOUND` miss — the very state whose rung-two derivation this cell is about — and
  // the broken `.node` beside the entry is then required and its failure recorded (`§1.4`: a throw at rung
  // two is the declared absent form). The earlier form drove the SAME tree twice with rung one succeeding and
  // then asked where rung two's path was, which no success state can answer (`PUB-CF-10`).
  const missEnv = makeScratch({ label: 'rungtwo-miss', rungTwo: 'broken' });
  const decoyCwd = mkdtempSync(join(SCRATCH_ROOT, 'decoy-cwd-'));
  const a = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch, cwd: env.dir });
  const b = drive(missEnv, { platform: COVERED[0].platform, arch: COVERED[0].arch, cwd: decoyCwd },
    { extraEnv: { STOREROOM_ADDON_PATH: join(decoyCwd, 'decoy.node') } });
  // **THE FIRST DRIVE'S STATE IS `present-right-version` AT RUNG ONE — THE SUCCESS STATE, AND ITS DECLARED
  // ANSWER PERFORMS NO RUNG-TWO ATTEMPT AT ALL** (`§1.4`'s `present-right-version` row: *"SUCCESS, and NO
  // rung-two attempt is made where rung one succeeded"*).
  assert.ok(a.requests.includes(COVERED[0].name), '`§1.1` item 1: rung one IS attempted at a covered key');
  assert.equal(a.returned, true, 'and this state\'s declared answer is `SUCCESS`: rung one loaded and matched');
  assert.equal(a.requests.filter(isRungTwo).length, 0,
    '`§1.4`: where rung one succeeded NO rung-two attempt is made — so this drive can observe rung two\'s path nowhere');
  const pa = b.requests.find(isRungTwo);
  assert.ok(pa, 'rung two is derived at all — measured at the drive whose rung one MISSED (the decoy cwd)');
  assert.equal(pa, join(missEnv.dir, RUNG_TWO_TAIL),
    'rung two is `build/Release/storeroom_js_binding.node` BESIDE THE ENTRY MODULE');
  assert.ok(pa.startsWith(missEnv.dir + sep),
    '`PAR-PUB-30`: the working directory moves it nowhere — the path is the entry module\'s own tree\'s');
  assert.ok(!b.requests.some((x) => x.includes('decoy.node')), 'no environment-variable override exists');
  const parentEnv = coveredEnv(COVERED[1], 'right', { rungTwo: 'absent', parentDecoy: true });
  const c = drive(parentEnv, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  assert.ok(!c.requests.some((x) => x.includes(`..${sep}`)), 'no search of a parent directory');
  for (const req of c.requests) {
    if (!isRungTwo(req) || !req.startsWith(sep)) continue;
    assert.ok(req.startsWith(parentEnv.dir + sep), 'no `.node` path outside the entry module\'s own tree');
  }
});

// ---------------------------------------------------------------------------------------------
// §5.2 P-PUB-2 — THE KEY SET IS CLOSED AT THE FIVE DECLARED NAMES (`§1.3`, `resolution.md §3.2`)
// ---------------------------------------------------------------------------------------------
// STATES: a covered key whose name is one of the five · a covered key whose artefact is ABSENT · an
//   uncovered pair (rung one must NOT be attempted) · a musl state on a covered pair · a declared key the
//   table must answer · the five pins' shape in the manifest
// FAIL-STATES: any computed name outside the five · a name assembled from tokens · a guessed fallback on
//   an uncovered pair · the converse, a declared key the table cannot answer · a fifth pin expressed as a
//   range · **AND A WRONG SCOPE IN EITHER DIRECTION**: one of the five AT THE OLD SCOPE, or at a third org,
//   is a name outside the five (`contract.md §5.2`; `resolution.md §3.1`; `parameter-semantics.md`
//   `PAR-PUB-17`'s outside values, re-read at `@auspicion`)
const FORBIDDEN_NAME_SHAPES = [
  '@auspicion/provident-storeroom-js-linux-x64-musl', // a SIXTH NAME (`resolution.md §4.3`)
  '@auspicion/provident-storeroom-js-linux-ia32', '@auspicion/provident-storeroom-js-linux-ppc64le',
  '@auspicion/provident-storeroom-js-freebsd-x64', '@auspicion/provident-storeroom-js-win32-x64-gnu',
  '@auspicion/linux-x64-gnu', // the alternative literal reading (`PUB-DD-15`)
  // **⟶ ADDED BESIDE IT BY THE `A88` PROJECT-TOKEN PASS (`docs/specs/storeroom-publish-proposal.md` `§14`):
  // `A88`(b)'s PRICED READING — THE PROJECT TOKEN WITH THE LANGUAGE MARKER DROPPED — is refused WHERE IT
  // STANDS, so the priced alternative of the operative ruling is refused at its own spelling and not only
  // through the `A86`-era form the `PUB-DD-15` row already carried.**
  '@auspicion/provident-storeroom-linux-x64-gnu',
  '@auspicion/provident-storeroom-js-linux-x64', // a dropped `-gnu` suffix (`PUB-DD-15`)
  // **⟶ ADDED BY THE `A88` PROJECT-TOKEN PASS: THE SUPERSEDED `A86` SPELLING OF ALL FIVE JOINS THE RETIRED
  // `A82` SCOPE AND THE THIRD ORG IN THIS LIST** (`P-PUB-6`'s failure list, read with `§14`'s blast-radius
  // item `7`): a manifest, an entry or an attempt set that still spells `@auspicion/js-<label>` carries the
  // SUPERSEDED identity rather than a lawful one, and each of the three spellings is a FINDING.
  '@auspicion/js-linux-x64-gnu', '@auspicion/js-linux-arm64-gnu',
  '@auspicion/js-darwin-x64', '@auspicion/js-darwin-arm64',
  '@auspicion/js-win32-x64-msvc',
  // **THE OLD SCOPE IS KEPT IN THE FAILURE LIST AND THE NEW SCOPE IS ADDED BESIDE IT** (`A86`(a);
  // `resolution.md §3.1`: *"OR ONE OF THE FIVE AT THE OLD SCOPE, is a FINDING"*): a manifest that still
  // spells `@provident-storeroom/…` carries the STALE identity rather than a lawful one, and a third org
  // is lawful at no home at all — so the row refuses a wrong scope in BOTH directions.
  '@provident-storeroom/js-linux-x64-gnu', '@provident-storeroom/js-linux-arm64-gnu',
  '@provident-storeroom/js-darwin-x64', '@provident-storeroom/js-darwin-arm64',
  '@provident-storeroom/js-win32-x64-msvc',
  // and the third org at BOTH the operative shape and the `A86`-era one, so neither is read as one of the five
  '@provident/provident-storeroom-js-linux-x64-gnu', '@provident/provident-storeroom-js-linux-arm64-gnu',
  '@provident/js-linux-x64-gnu', '@provident/js-linux-arm64-gnu', // a THIRD org
  'js-linux-x64-gnu', 'provident-storeroom-js-linux-x64-gnu', // unscoped / concatenated shapes
];

cell('P-PUB-2', 'S-KEYSET no computed name outside the five is ever required', async () => {
  // `§1.3` item 1: the entry NEVER COMPUTES A NAME OUTSIDE THE FIVE — the name is SELECTED from the closed
  // table. Observing the ATTEMPT SET (not the outcome alone) at every pair of the sample.
  const pairs = [...UNCOVERED, ...MUSL_PAIRS];
  for (const pair of pairs) {
    const env = makeScratch({ label: `keyset-${pair.platform}-${pair.arch}`, rungTwo: 'broken' });
    const r = drive(env, { platform: pair.platform, arch: pair.arch });
    const offending = r.requests.filter((x) => FORBIDDEN_NAME_SHAPES.includes(x) || /^[a-z@][^/]*js-[a-z0-9]+-[a-z0-9]+/.test(x) && !FIVE_NAMES.includes(x));
    assert.deepEqual(offending, [],
      `no name outside the five may be required (pair ${pair.platform}/${pair.arch}); the attempt set was ${JSON.stringify(r.requests)}`);
    assert.ok(!r.requests.includes('build/Release/storeroom_js_binding.node'),
      'the name selected is never assembled from a relative token');
  }
});

cell('P-PUB-2', 'S-KEYSET a name assembled from tokens is never required at any depth', async () => {
  // `§1.3` item 1 (the same clause, its second half): a name ASSEMBLED FROM PARTS is a FINDING. The
  // observable is the shape of every required specifier: never a concatenation of platform, architecture
  // and toolchain tokens, never a template of the runtime's own values.
  const env = makeScratch({ label: 'tokens', rungTwo: 'broken' });
  const platform = 'linux';
  const arch = 'riscv64';
  const r = drive(env, { platform, arch });
  for (const req of r.requests) {
    if (req.startsWith('node:') || req.startsWith(sep) || req.startsWith('./') || req.startsWith('../')) continue;
    assert.ok(FIVE_NAMES.includes(req),
      `every required package name is ONE OF THE FIVE SELECTED names; got ${JSON.stringify(req)} for ${platform}/${arch}`);
  }
  assert.ok(r.requests.some(isRungTwo),
    'the drive reached the load path at all: an attempt set with no rung in it observes nothing');
  assert.equal(r.requests.filter((x) => x.includes('-riscv64')).length, 0,
    'no architecture token is ever concatenated into a name');
});

cell('P-PUB-2', 'S-KEYSET a guessed fallback on an uncovered pair is refused', async () => {
  // `§1.3` item 3: a table that falls back to a GUESSED name when the pair is uncovered is a FINDING, and
  // an uncovered pair's declared answer never includes rung one. So at an uncovered pair the attempt set
  // carries rung two's path and NO platform name at all.
  const env = makeScratch({ label: 'nofallback', rungTwo: 'broken' });
  const r = drive(env, { platform: 'freebsd', arch: 'x64', });
  const packageNames = r.requests.filter((x) => !x.startsWith('node:') && !x.startsWith(sep) && !x.startsWith('./'));
  assert.deepEqual(packageNames, [], 'rung one is NOT ATTEMPTED at an uncovered pair, so no name is guessed');
  assert.ok(r.requests.some(isRungTwo), 'rung two is attempted instead');
  assert.ok(r.arm !== null, 'and the declared absence is what answers');
  const A = assertArm(r, {});
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), true,
    'an uncovered key\'s subject is rung two\'s path, because rung one was never attempted and has no path to report (`resolution.md §2.2`)');
});

cell('P-PUB-2', 'S-KEYSET the converse: each declared key IS answered by the table', async () => {
  // `§5.2` FAILURE LIST: "its converse: a declared key the table cannot answer". One drive per covered
  // key, each landing on its own declared name.
  for (const key of COVERED) {
    const env = coveredEnv(key, 'right', { rungTwo: 'broken' });
    const r = drive(env, { platform: key.platform, arch: key.arch });
    assert.ok(r.requests.includes(key.name),
      `the declared key ${key.platform}/${key.arch} is answered by the table with ${key.name}; the attempt set was ${JSON.stringify(r.requests)}`);
    assert.equal(r.ok, true, `the declared key ${key.label} resolves at rung one`);
  }
});

cell('P-PUB-2', 'S-KEYSET the five pins are exact and no sixth pin exists', async () => {
  // `§1.3` item 4 / `PUB-DD-10` / `PAR-PUB-8`: the five `optionalDependencies` pins are EXACT, five times,
  // and NO range, caret, tilde or wildcard is lawful; a sixth name is refused (`distribution.md §3.3`).
  //
  // **⟶ RE-CUT BY THE `0.1.1` PASS: THE PIN IS ASSERTED AS THE COUPLING RATHER THAN AS A FROZEN STRING,
  // AND THE EXACT VALUE IS ASSERTED BESIDE IT AS THE DECLARED RELEASE.** The shipped form compared all five
  // pins to the single literal `'0.1.0'`, which was true of the bootstrap and rots at every bump; the
  // property the clause states is `parameter-semantics.md §2.2`'s coupling rule — *"a version differing
  // from the five platform artefacts' → REFUSED by the coupling rule"* — so each pin is read against **its
  // OWN platform manifest's `version`**, enumerated by NAME from the five manifests, and the five are read
  // together against the main package's own `version`, which is read against `A89` (`§15` item 1), the
  // clause that declares which version is the release (`0.1.1`; `0.1.0` is the bootstrap, *"DECLARED, not a
  // release"*, `§15` row 4). **NO ASSERTION WAS WEAKENED: the exact-equality comparison survives, its
  // right-hand side is the contract's own declared release instead of a literal at this site.**
  const { main, pins, platformVersions } = mainVersionCoupling();
  assert.deepEqual(Object.keys(pins).sort(), [...FIVE_NAMES].sort(),
    '`PAR-PUB-8`: exactly the five declared names, name for name');
  const release = declaredReleaseVersion(REPO_ROOT);
  assert.equal(main.version, release,
    '`PAR-PUB-2` / `A89` (`§15` item 1): the main package\'s `version` IS the declared release version');
  for (const [name, pin] of Object.entries(pins)) {
    const platform = platformVersions.get(name);
    assert.ok(platform !== undefined,
      `\`PAR-PUB-26\` / \`distribution.md §3.1\`: the pin for ${name} must have a platform manifest at `
      + `\`platforms/<label>/package.json\`; the five read were ${JSON.stringify([...platformVersions.keys()])}`);
    assert.equal(pin, platform.version,
      `the pin for ${name} is EXACT and EQUALS its own platform manifest's \`version\` — the coupling rule `
      + '(`PAR-PUB-2` · `PAR-PUB-8` · `W-2`\'s hoisting window), read against '
      + `\`${platform.path}\``);
    assert.equal(pin, main.version,
      `${name}'s pin equals the MAIN package's own \`version\`, so the five resolve together or none does`);
    assert.equal(pin, release,
      `the pin for ${name} is the CONTRACT'S DECLARED RELEASE VERSION (\`A89\` · \`§15\` item 1: \`${release}\`)`);
    assert.ok(!/[~^*><]|\bx\b|\|\|/.test(pin), `no range, caret, tilde or wildcard in ${name}'s pin`);
  }
  assert.equal(main.dependencies?.[FIVE_NAMES[0]], undefined,
    '`PAR-PUB-8`: the five are OPTIONAL by design, never `dependencies`');
});

// ---------------------------------------------------------------------------------------------
// §5.3 P-PUB-3 — THE PLATFORM KEY IS TOTAL AND DETERMINISTIC (`§1.2`, `resolution.md §4`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED: each of the five covered keys · each uncovered pair of the sample (`linux ia32`,
//   `linux ppc64le`, `linux s390x`, `freebsd`, `win32 ia32`, `sunos`, `android`) · the musl state on both
//   `linux` keys · a musl runtime whose `-gnu` artefact is unloadable · a musl runtime whose `-gnu`
//   artefact LOADS
// FAIL-STATES: a speculative sixth key · a musl runtime that loads a `-gnu` artefact where its `dlopen`
//   should have failed and the answer therefore differed from the declared one · an uncovered pair whose
//   answer is unstated · a `libc` detection mechanism, value set or measured domain in any clause · a pair
//   answered by two rungs · a table entry depending on the working directory or an environment variable

cell('P-PUB-3', 'S-PLATFORM one drive per covered key, each landing on its declared name', async () => {
  // `resolution.md §4.1`: each covered pair's value is ONE declared name and the rung it reaches is rung
  // one then rung two.
  for (const key of COVERED) {
    const env = makeScratch({ label: `plat-${key.label}`, rungOne: { name: key.name, variant: 'right' }, rungTwo: 'absent' });
    const r = drive(env, { platform: key.platform, arch: key.arch });
    assert.ok(r.requests.includes(key.name), `${key.platform}/${key.arch} → ${key.name}`);
    assert.equal(r.ok, true, `${key.platform}/${key.arch} lands on rung one and succeeds`);
    const otherNames = FIVE_NAMES.filter((n) => n !== key.name);
    for (const other of otherNames) {
      assert.ok(!r.requests.includes(other),
        `at most ONE of the five keys may be selected; ${key.label} also reached ${other}`);
    }
  }
});

for (const pair of UNCOVERED) {
  cell('P-PUB-3', `S-PLATFORM ${pair.platform}/${pair.arch} is NOT COVERED and reaches rung two only`, async () => {
    // `resolution.md §4.1`'s LAST row: EVERY OTHER PAIR's value is the token `NOT COVERED` and the rung it
    // reaches is rung two then the single declared absence — RUNG ONE IS NOT ATTEMPTED.
    const env = makeScratch({ label: `unc-${pair.platform}-${pair.arch}`, rungTwo: 'broken' });
    const r = drive(env, { platform: pair.platform, arch: pair.arch });
    const packageNames = r.requests.filter((x) => !x.startsWith('node:') && !x.startsWith(sep) && !x.startsWith('./') && !x.startsWith('../'));
    assert.deepEqual(packageNames, [], `rung one is not attempted at ${pair.platform}/${pair.arch}`);
    assert.ok(r.requests.some(isRungTwo), 'rung two IS attempted');
    assert.ok(r.arm !== null, 'and the answer is the single declared absence — never a sixth key');
    assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the one arm answers the uncovered class too');
  });
}

cell('P-PUB-3', 'S-MUSL the musl state reaches the declared answer, not a sixth key', async () => {
  // `§1.2` / `PUB-DD-8` / `resolution.md §4.2`: a musl runtime's declared answer is RUNG TWO and then the
  // single declared absence; the pair is COVERED, so the `-gnu` name IS attempted, `libc` is read by no
  // clause, and no sixth name exists. Two drives: the `-gnu` artefact ABSENT (a miss) and the `-gnu`
  // artefact PRESENT BUT UNLOADABLE (its `dlopen` fails; `§1.4`'s present-unloadable cell).
  for (const pair of MUSL_PAIRS) {
    const key = COVERED.find((k) => k.platform === pair.platform && k.arch === pair.arch);
    const absentEnv = makeScratch({ label: `musl-absent-${pair.arch}`, rungTwo: 'broken' });
    const a = drive(absentEnv, { platform: pair.platform, arch: pair.arch });
    assert.ok(a.requests.includes(key.name), 'the `-gnu` name is attempted: `libc` is not readable from the pair');
    assert.ok(a.requests.some(isRungTwo), 'rung two is attempted after the miss');
    assert.ok(a.arm !== null, 'the declared answer is the single declared absence');
    assert.equal(assertArm(a, {}).status, ARM_STATUS, 'and it is THE ONE ARM');
    // the present-but-unloadable arm: the `-gnu` artefact exists and its `require` throws
    const unloadableEnv = makeScratch({ label: `musl-unloadable-${pair.arch}`, rungTwo: 'broken' });
    mkdirSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/')), { recursive: true });
    writeFileSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/'), 'storeroom_js_binding.node'),
      'a `-gnu` artefact a musl host cannot `dlopen`\n');
    writeFileSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/'), 'package.json'),
      JSON.stringify({ name: key.name, version: '0.1.0', main: 'storeroom_js_binding.node' }, null, 2));
    const b = drive(unloadableEnv, { platform: pair.platform, arch: pair.arch });
    assert.ok(b.requests.includes(key.name), 'rung one is still ATTEMPTED');
    assert.ok(b.requests.some(isRungTwo), 'a throw at rung one is a MISS, so rung two is still attempted');
    assert.ok(b.arm !== null, 'the answer is the declared absent form');
    const B = assertArm(b, {});
    assert.equal(B.status, ARM_STATUS,
      '`§1.4`: a `-gnu` artefact whose `dlopen` fails is answered by the ONE arm, never by a libc test');
    assert.ok(B.message.includes(`'${key.name}'`) && B.message.includes(`'${b.requests.find(isRungTwo)}'`),
      'both rungs were tried, so BOTH paths are the declared absent form\'s subject');
  }
});

cell('P-PUB-3', 'S-MUSL a `-gnu` artefact that LOADS is answered by the read, not by a libc test', async () => {
  // `§1.4` MUSL row, `present-right-version` cell: *"where a `-gnu` artefact loads at rung one under a
  // musl runtime its version read applies as at any covered key — the declared answer is the read's, not a
  // libc test's"*. And the `present-wrong-version` cell: the single failure arm.
  const key = COVERED[0];
  const matchEnv = coveredEnv(key, 'right', { rungTwo: 'broken' });
  const m = drive(matchEnv, { platform: key.platform, arch: key.arch });
  assert.equal(m.ok, true, 'a `-gnu` artefact that loads with a MATCHING version succeeds');
  assert.equal(m.stub.calls.version, 1, 'the read applies as at any covered key');
  assert.equal(m.arm, null, 'and no arm answers the load');
  const wrongEnv = coveredEnv(key, 'wrong', { rungTwo: 'broken' });
  const w = drive(wrongEnv, { platform: key.platform, arch: key.arch });
  // **THE MISMATCH STATE IS THE ARM, AND THE ARM IS THROWN BY THE ENTRY'S OWN EVALUATION OF THE IMPORTED
  // MODULE** (`§1.5` item 2: the load path STOPS at the mismatch and loads nothing from the substituted
  // artefact) — so `ok`, which reports whether the staged entry was evaluated at all, is `true` here and
  // the refusal is read from the ARM. The earlier form of this assertion demanded `ok === false` BESIDE
  // `assertArm`, i.e. it demanded a state in which no arm could have been thrown (`PUB-CF-10`); the read
  // is still asserted to have HAPPENED, which is what this cell is about.
  assert.equal(w.ok, true, 'the staged entry was evaluated: the refusal is the ARM and not an absent entry');
  assert.equal(w.stub.calls.version, 1, 'the read was performed before the refusal');
  assert.equal(w.returned, false, 'and the mismatch state returns NO instance');
  assert.equal(assertArm(w, { subject: key.name }).status, ARM_STATUS,
    'the declared answer is the read\'s, not a libc test\'s');
});

cell('P-PUB-3', 'S-PLATFORM no `libc` mechanism, value set or measured domain is declared', async () => {
  // `§1.2` / `§0` (`A4`'s watch item): NO clause of this unit DEFINES `libc` or `musl` — no detection
  // mechanism, no value set and no measured domain — so the musl answer is a STATE the load path reaches
  // and NEVER a sixth key. The observables: the ENTRY carries no libc/musl token at all (a mechanism there
  // would be the detection the clause forbids), no sixth name exists anywhere, and the musl state's own
  // answer is the one arm rather than a distinct libc answer.
  const entry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  for (const token of ['musl', 'libc', 'glibc', 'getconf', 'process.report', 'ldd']) {
    assert.ok(!entry.includes(token), `the entry declares no \`${token}\` mechanism`);
  }
  assert.ok(!/js-[a-z0-9]+-[a-z0-9]+-musl/.test(entry), 'no musl name is computed in the entry');
  for (const name of FIVE_NAMES) {
    assert.ok(!/musl/.test(name), '`resolution.md §4.2` (i): no sixth name, and no musl name at all');
  }
  const resolution = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'resolution.md'), 'utf8');
  assert.ok(!/js-linux-(x64|arm64)-musl/.test(resolution), 'the part names no musl artefact');
  // and a `libc`-derived value in the key is refused (`PAR-PUB-31`): a `libc` token in the pair's selection
  // would show up as an attempt the pair cannot produce
  const key = COVERED[0];
  const r = drive(coveredEnv(key, 'right', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.ok(r.requests.includes(key.name),
    'the key is the PAIR and nothing else: `libc` is not readable from it, so the covered name is what is selected');
  assert.ok(!r.requests.some((x) => /musl|libc|gnu$/.test(x) && !FIVE_NAMES.includes(x)),
    'no `libc`-derived value reaches the key or the attempt set');
});

// ---------------------------------------------------------------------------------------------
// §5.4 P-PUB-4 — THE VERSION READ HOLDS (`§1.5`, `PUB-DD-17`–`PUB-DD-19`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED: the addon's version MATCHES the package's · it DIFFERS · it is the EMPTY STRING · it
//   is NOT A STRING · `addon.version` is NOT CALLABLE · the read at rung TWO (where it does not apply) ·
//   a rung-two artefact with no version at all · a version read with no rung-one load
// FAIL-STATES: a load that performs no version read · a read answering a second failure SHAPE, or minting
//   a status, or falling back · a mismatch accepted · a comparison by range rather than exact equality · a
//   non-string coerced into a match · a version read attempted at rung two · a version read where no
//   platform package was resolved (`contract.md §5.4`)

cell('P-PUB-4', 'S-VERSION a matching artefact loads', async () => {
  // `§1.5` item 1: the version is read at rung one, called as a function, and answers a `string`; the
  // package's own version is read from the package's own manifest. Equality is exact.
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.stub.calls.version, 1, 'the read is PERFORMED (`§5.4` FAILURE LIST item 1)');
  assert.equal(r.returned, true, 'a matching artefact loads and an instance is returned');
  assert.equal(r.arm, null, 'no arm answers a match');
});

cell('P-PUB-4', 'S-VERSION a substituted artefact is answered by the SINGLE declared arm', async () => {
  // `PUB-DD-17` / `§1.5` item 2: a mismatch is answered by `§1.4`'s single arm, whose status is
  // `FilePathUnreachable` and whose subject is the RUNG-ONE ARTEFACT'S OWN PATH — never by a fallback.
  const env = coveredEnv(COVERED[0], 'wrong', { rungTwo: 'absent' });
  // a decoy: the rung-two candidate is PRESENT and REAL, so a fallback would have something to fall back to
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  if (existsSync(realAddon)) {
    mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  }
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.stub.calls.version, 1, 'the read is performed');
  assert.ok(r.arm !== null, 'a mismatched artefact is REFUSED');
  const A = assertArm(r, { subject: COVERED[0].name });
  assert.ok(!r.requests.slice(r.requests.indexOf(COVERED[0].name) + 1).some(isRungTwo),
    '`§1.5` item 2: NO fallback to the other rung\'s artefact on a mismatch');
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), false,
    'the subject is the RUNG-ONE artefact\'s own path, not rung two\'s');
  assertNoFallback(r);
});

cell('P-PUB-4', 'S-VERSION no read performed fails (the read is wired, not merely declared)', async () => {
  // `§5.4` FAILURE LIST item 1: "a load that performs no version read". The observable is the call itself:
  // the fake artefact counts its own `version` invocations, so a load that never calls it is visible as a
  // ZERO count even where the load would otherwise have succeeded.
  const env = coveredEnv(COVERED[1], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  assert.ok(r.stub, 'the fake artefact was reached at all');
  assert.equal(r.stub.calls.version, 1,
    '`§1.5` item 5: the instrument EXISTS and this clause WIRES it — a load that reads nothing is a failure');
  assert.equal(r.ok, true, 'and the load proceeds on that one read');
});

cell('P-PUB-4', 'S-VERSION a second failure shape fails; the arm\'s form is fixed once', async () => {
  // `PUB-DD-17` / `§1.4` item 1: NO second failure shape exists — not a returned union, not an `Error`
  // subclass, not a `Promise` rejection, not a third member, and not a package-authored status. The
  // mismatch arm and the absent arm are the SAME shape, and the member set is exactly two.
  const absent = drive(makeScratch({ label: 'shape-absent', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const mismatch = drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  for (const [label, r, subject] of [
    ['the declared absent form', absent, undefined],
    ['the mismatch', mismatch, COVERED[0].name],
  ]) {
    const A = assertArm(r, subject === undefined ? {} : { subject });
    assert.deepEqual(Object.keys(A), ['status', 'message'], `${label}: exactly two members, no third`);
    assert.equal(typeof A.status, 'string', `${label}: the status is a JS string, carried verbatim`);
    assert.equal(typeof A.message, 'string', `${label}: the message is a string`);
    assert.equal(A.name, undefined, `${label}: no \`Error\` name member`);
  }
  assert.ok(absent.arm && mismatch.arm && absent.arm.notTheArm !== true && mismatch.arm.notTheArm !== true,
    'both states answer the one arm, so both reports carry it');
  assert.deepEqual(Object.keys(mismatch.arm), Object.keys(absent.arm),
    'ONE shape answers both states (`§1.4` item 1: the only failure shape this unit declares)');
});

cell('P-PUB-4', 'S-VERSION the mismatch predicate is exact equality, not a range', async () => {
  // `PUB-DD-19` / `PAR-PUB-32`: EXACT STRING INEQUALITY. Any other outcome is the mismatch arm — a
  // different string, an empty string, a value that is not a string, and an `addon.version` that is not
  // callable. Four drives, and each must land on the ONE arm: `9.9.9` is not a match for `0.1.0`.
  const variants = ['wrong', 'empty', 'notstring', 'notcallable'];
  for (const variant of variants) {
    const env = coveredEnv(COVERED[0], variant, { rungTwo: 'broken' });
    const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    assert.ok(r.arm !== null && r.arm.notTheArm !== true,
      `the \`${variant}\` outcome is the mismatch arm (\`PUB-DD-19\`), never a match`);
    const A = assertArm(r, { subject: COVERED[0].name });
    assert.equal(A.status, ARM_STATUS, 'and its status is the store\'s member, never a package token');
    assert.ok(!CLOSED_SET.filter((c) => !c.includes('FilePath')).includes(A.status));
  }
  const matchEnv = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const ok = drive(matchEnv, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(ok.ok, true, 'the converse: the SAME character sequence loads');
  assert.equal(ok.stub.calls.version, 1, 'and it was read');
});

cell('P-PUB-4', 'S-VERSION the version is read from the PACKAGE\'S OWN MANIFEST, not passed in', async () => {
  // **⟶ ADDED BY THE RED-SET REPAIR PASS (`PUB-RED-2`, `PUB-R-8`): THE READ'S SOURCE HAD NO DRIVE.**
  // `§1.5` item 1: *"The package's own version is READ FROM THE PACKAGE'S OWN MANIFEST — the same artefact
  // whose `version` the release's tag fixes — and NEVER PASSED IN, CONFIGURED OR DEFAULTED."* Before this
  // cell, `makeScratch` wrote its scratch manifest with the literal `0.1.0` and the fake artefact answered
  // the SAME literal in every drive, so a load that read the version from the PLATFORM PACKAGE'S OWN MANIFEST,
  // from a constant, or from the environment passed ALL SIX `P-PUB-4` cells: the clause's second half had no
  // observable at all. **THE TWO HOMES ARE FORCED APART HERE**: the scratch PACKAGE's manifest declares
  // `0.9.0` while the SUBSTITUTED ARTEFACT answers the version ITS OWN manifest declares — `0.1.0` — so
  // nothing but a read of the package's own manifest can produce the match asserted below.
  const key = COVERED[0];
  const differ = coveredEnv(key, 'right', {
    rungTwo: 'broken', manifestVersion: '0.9.0', rungOne: { fromOwnManifest: true, manifestVersion: '0.1.0' },
  });
  const r = drive(differ, { platform: key.platform, arch: key.arch });
  assert.equal(r.stub?.calls?.version, 1, 'the read is still PERFORMED — the instrument is wired');
  assert.ok(r.arm !== null && r.arm.notTheArm !== true,
    'the artefact answers `0.1.0` while the package\'s own manifest declares `0.9.0`, so the EXACT-INEQUALITY '
    + 'predicate of `PUB-DD-19` refuses it: a load that read the PLATFORM package\'s manifest, or a constant, '
    + `or the environment, would have matched and returned an instance; got ${JSON.stringify(r).slice(0, 400)}`);
  assert.equal(assertArm(r, { subject: key.name }).status, ARM_STATUS, 'and the refusal is the one declared arm');
  assert.equal(r.returned, false, 'the mismatch state returns NO instance');
  // AND THE CONVERSE, ON THE SAME LEVER: when the package's own manifest declares the SAME version the
  // artefact answers, the same two homes AGREE and the load succeeds — so the cell above fails for the
  // difference and not for the mechanism.
  const agree = coveredEnv(key, 'right', {
    rungTwo: 'broken', manifestVersion: '0.9.0', rungOne: { fromOwnManifest: true, manifestVersion: '0.9.0' },
  });
  const a = drive(agree, { platform: key.platform, arch: key.arch });
  assert.equal(a.stub?.calls?.version, 1, 'the artefact answered its own manifest\'s version');
  assert.equal(a.returned, true,
    'the SAME lever with the two homes in agreement loads: the read\'s source is what the drive above moved');
  assert.equal(a.arm, null, 'and no arm answers the match');
  assert.equal(a.error, null, 'and nothing was absorbed');
});

cell('P-PUB-4', 'S-INPLACE a rung-two load performs NO version comparison', async () => {
  // `PUB-DD-18` / `resolution.md §5.1` item 3: the read applies at RUNG ONE ALONE. A rung-two load — the
  // checkout's own artefact — performs no version comparison. Driven with a real artefact at rung two and
  // NO rung-one candidate, so the only possible read would be rung two's.
  const env = makeScratch({ label: 'rungtwo-noread', rungTwo: 'absent' });
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  assert.ok(existsSync(realAddon), 'the repository\'s own built artefact exists (the README\'s declared build step)');
  mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
  writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.returned, true, 'rung two resolves and an instance is returned');
  assert.equal(r.error, null, '`PUB-DD-18`: no version comparison at rung two, so no refusal');
  assert.equal(r.arm, null, 'no arm at a rung-two load');
  // and the read is never attempted where NO platform package was resolved: an uncovered key
  const unc = drive(makeScratch({ label: 'noread-uncovered', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  assert.equal(unc.stub, null, 'nothing was loaded to read at an uncovered key');
  assert.equal(assertArm(unc, {}).status, ARM_STATUS, '`§5.4` FAILURE LIST item 7: no read where no package resolved');
});

// ---------------------------------------------------------------------------------------------
// §5.5 P-PUB-5 — THE TAXONOMY IS TOTAL AND THE ARM IS ONE (`§1.4`, `resolution.md §5`)
// ---------------------------------------------------------------------------------------------
// THE `4 × 3` TABLE, CELL BY CELL (`§1.4`'s table). `11` cells carry a declared answer; `1` — the
// uncovered `present-wrong-version` cell — is DECLARED UNREACHABLE and is ASSERTED UNREACHABLE rather
// than driven blind.
//   COVERED    · absent → the declared absent form (both paths) · present-unloadable → the same
//              · present-wrong-version → the single arm (rung one's path) · present-right-version → SUCCESS
//   UNCOVERED  · absent → the declared absent form (rung two's path alone) · present-unloadable → the
//              same · present-wrong-version → UNREACHABLE · present-right-version → SUCCESS, no read
//   MUSL       · absent → the declared absent form · present-unloadable → the same (the `dlopen` failure)
//              · present-wrong-version → the single arm · present-right-version → SUCCESS
// FAIL-STATES: a state with no answer · two states with different answers under one name · a rung-one
//   `catch` that classifies the throw and absorbs a broken prebuild into a second shape · a second failure
//   shape · a minted status · a subject that is `cfg.filePath` · a fallback to a JS store, a partial
//   instance or a no-op verb · an unreachable cell driven as though it were reachable · a fourth outcome

cell('P-PUB-5', 'S-TAXONOMY covered × absent — the declared absent form, both paths', async () => {
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' });
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const A = assertArm(r, {});
  assert.ok(A.message.includes(`'${COVERED[0].name}'`) && A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    '`§1.4` COVERED/absent: the subject is BOTH paths, each in the generator\'s own subject slot');
  assertRefusedOutcome(r);
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-unloadable — the same declared absent form', async () => {
  // `§1.4`: rung one throws (`ERR_DLOPEN_FAILED` and every other throw count as a miss), rung two misses
  // → the declared absent form; where rung two's own artefact is found and throws, the declared absent
  // form still stands and its subject is still both paths. Two drives, one per subject shape.
  const a = drive(makeScratch({ label: 'cov-unload', rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const A = assertArm(a, {});
  assert.ok(A.message.includes(`'${COVERED[0].name}'`) && A.message.includes(`'${a.requests.find(isRungTwo)}'`),
    'both paths are the subject where both rungs were tried');
  const env = coveredEnv(COVERED[1], 'right', { rungTwo: 'absent' });
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
  writeFileSync(join(env.dir, RUNG_TWO_TAIL), 'rung two exists and cannot be loaded\n');
  const b = drive(env, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  const B = assertArm(b, {});
  assert.ok(B.message.includes(`'${COVERED[1].name}'`) && B.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    'a throw at rung two leaves the subject as both paths');
  assertNoFallback(b);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-wrong-version — the single arm, rung one\'s path', async () => {
  const env = coveredEnv(COVERED[2], 'wrong', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[2].platform, arch: COVERED[2].arch });
  const A = assertArm(r, { subject: COVERED[2].name });
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), false, 'the subject is rung one\'s path');
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-right-version — SUCCESS, no rung-two attempt', async () => {
  const env = coveredEnv(COVERED[3], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[3].platform, arch: COVERED[3].arch });
  assert.equal(r.returned, true, 'the covered/right-version cell is SUCCESS');
  assert.equal(r.requests.filter(isRungTwo).length, 0, 'and NO rung-two attempt is made');
  assert.equal(r.arm, null, 'no arm in this cell');
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × absent — the declared absent form, rung two\'s path alone', async () => {
  const env = makeScratch({ label: 'unc-absent', rungTwo: 'absent' });
  const r = drive(env, { platform: 'android', arch: 'x64' });
  const A = assertArm(r, { subject: join(env.dir, RUNG_TWO_TAIL) });
  assert.ok(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), 'rung two\'s path is the subject');
  assertRefusedOutcome(r);
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × present-unloadable — the declared absent form', async () => {
  const env = makeScratch({ label: 'unc-unload', rungTwo: 'broken' });
  const r = drive(env, { platform: 'linux', arch: 's390x' });
  assert.equal(assertArm(r, { subject: join(env.dir, RUNG_TWO_TAIL) }).status, ARM_STATUS,
    'the same form answers: rung one is not attempted at all');
  assertRefusedOutcome(r);
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × present-wrong-version is DECLARED UNREACHABLE', async () => {
  // `§1.4`: *"UNREACHABLE: the version read applies to rung one ALONE (`PUB-DD-18`), so this cell has no
  // state and a drive that asserts one asserts a state the tree cannot reach."* This cell is therefore
  // ASSERTED UNREACHABLE rather than driven blind: the observable is that no read is performed where no
  // rung-one load occurs, so no mismatch can be answered at an uncovered key.
  const env = makeScratch({ label: 'unc-wrong', rungOne: { name: COVERED[0].name, variant: 'wrong' }, rungTwo: 'broken' });
  const r = drive(env, { platform: 'freebsd', arch: 'x64' });
  assert.equal(r.stub, null, 'nothing was loaded at an uncovered key, so nothing can report a version');
  assert.equal(r.stub?.calls?.version ?? 0, 0, 'the read is not attempted where no rung-one load occurs');
  assert.ok(!r.requests.includes(COVERED[0].name), 'and no rung-one name is attempted, so the mismatch state is unreachable');
  assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the cell\'s answer is the absent form and not a wrong-version arm');
});

cell('P-PUB-5', 'S-TAXONOMY musl × absent and musl × present-unloadable', async () => {
  const absent = drive(makeScratch({ label: 'musl-tax-absent', rungTwo: 'broken' }), { platform: 'linux', arch: 'arm64' });
  assert.ok(absent.requests.includes(FIVE_NAMES[1]), 'the musl state attempts the `-gnu` name');
  assert.equal(assertArm(absent, {}).status, ARM_STATUS, 'and the one arm answers');
  const unloadable = makeScratch({ label: 'musl-tax-unload', rungTwo: 'broken' });
  mkdirSync(join(unloadable.dir, 'node_modules', '@auspicion', 'provident-storeroom-js-linux-arm64-gnu'), { recursive: true });
  writeFileSync(join(unloadable.dir, 'node_modules', '@auspicion', 'provident-storeroom-js-linux-arm64-gnu', 'package.json'),
    JSON.stringify({ name: FIVE_NAMES[1], version: '0.1.0', main: 'storeroom_js_binding.node' }, null, 2));
  writeFileSync(join(unloadable.dir, 'node_modules', '@auspicion', 'provident-storeroom-js-linux-arm64-gnu', 'storeroom_js_binding.node'),
    'a `-gnu` artefact a musl host cannot `dlopen`\n');
  const r = drive(unloadable, { platform: 'linux', arch: 'arm64' });
  assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the `dlopen` failure lands on the one arm');
});

cell('P-PUB-5', 'S-TAXONOMY musl × present-wrong-version and musl × present-right-version', async () => {
  const key = COVERED[0];
  const wrong = drive(coveredEnv(key, 'wrong', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.equal(assertArm(wrong, { subject: key.name }).status, ARM_STATUS, 'musl × wrong-version → the single arm');
  const right = drive(coveredEnv(key, 'right', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.equal(right.returned, true, 'musl × right-version → SUCCESS, the read applying as at any covered key');
});

cell('P-PUB-5', 'S-ONEARM the arm is a plain object of exactly two members', async () => {
  // `§1.4` item 1 / `resolution.md §5.3` item 1: a THROWN PLAIN OBJECT whose member set is EXACTLY
  // `{status, message}` — and its prototype is the caller's own realm's object prototype, in the order
  // the clause prints.
  const r = drive(makeScratch({ label: 'onearm-shape', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const A = assertArm(r, {});
  assert.deepEqual(Object.keys(A), ['status', 'message'], 'exactly two own enumerable members');
  assert.equal(Object.getPrototypeOf(A), Object.prototype, 'a PLAIN object, not an `Error` and not a subclass');
  assert.equal(typeof A.status, 'string', 'the status is the member token, carried verbatim');
  assert.equal(typeof A.message, 'string', 'the message is a string');
  assert.equal(Object.keys(A).length, 2, 'no third member');
});

cell('P-PUB-5', 'S-ONEARM the status is carried from the store\'s closed set, never minted', async () => {
  // `§0.1` item 7 / `§1.4` item 1: the store's failure channel is a CLOSED SET of `15` codes and this unit
  // MINTS NO CODE, WIDENS NO SET and renames no member (`PUB-DD-17`).
  const drives = [
    drive(makeScratch({ label: 'mint-1', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' }),
    drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
  ];
  for (const r of drives) {
    const A = assertArm(r, {});
    assert.ok(CLOSED_SET.includes(A.status), `the status ${JSON.stringify(A.status)} is a member of the store's closed 15`);
    assert.equal(A.status, ARM_STATUS, 'and it is the same member in each direction');
    assert.ok(!/Mismatch|Version|Addon|Unreachable$|NotFound$/.test(A.status.replace('FilePathUnreachable', '')),
      'no package-minted token such as `AddonVersionMismatch` exists (`PUB-DD-17`\'s priced alternative, refused)');
  }
});

cell('P-PUB-5', 'S-ONEARM the message is the store\'s generated string at the subject', async () => {
  // `§1.4` item 1: the message is the STORE'S OWN GENERATOR'S STRING for that code at the subject the
  // clause fixes — never a package-authored message. The expected string is the generator's own rendering
  // (`docs/specs/storeroom-native/contract.md §8.2`'s row: `'<subject>' is not reachable at construction,
  // the path must exist or the application must be able to write it`), and the REAL addon's own generator
  // is used as the independent check that the expected rendering is the store's.
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  if (existsSync(realAddon)) {
    const addon = require_(realAddon);
    if (typeof addon.errorMessage === 'function') {
      for (const subject of ['/tmp/x/p.node', FIVE_NAMES[0]]) {
        assert.equal(addon.errorMessage('FilePathUnreachable', subject), gen(subject),
          'the expected rendering IS the store\'s own generator\'s string');
      }
    }
  }
  const r = drive(makeScratch({ label: 'onearm-msg', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const A = assertArm(r, {});
  assert.ok(A.message.endsWith(GEN_TAIL), 'the generated string\'s own clause, verbatim');
  assert.ok(A.message.startsWith(`'`), 'and its subject slot is filled with the artefact\'s path');
});

// **⟶ ADDED BY THE PRE-TAG PASS (`PUB-R-13`): `contract.md §1.4` ITEM 7'S STATE — THE LOADED ARTEFACT THAT
// CARRIES NO USABLE GENERATOR — HAD NO CELL OF THIS RED SET.** The state was driven by the generator
// `NG-PUB-F` with `3` measured controls (`bindings/js/test/publish-generators.test.mjs`) and by no cell of
// the red set, so `P-PUB-5`'s stated coverage was wider than the red set that stands
// (`archive/gate3/storeroom-publish-red-set.md` `§8.12`; `docs/next-steps.md` `§126`'s item `(iv)`).
// **THE ROW AND THE STRATEGY ARE THE CONTRACT'S OWN MAP, NOT THIS PASS'S CHOICE**: `§1.4` item 7 cites
// `P-PUB-5` and files the state as the `present-wrong-version` column's sub-case, and `§5.5`'s FAILURE LIST
// carries *"a `message` … not the generator's own clause reproduced byte-for-byte in the arm where it
// was not"* (`§1.4` item 6; `PUB-DD-25`) — `P-PUB-4`'s list carries the mismatch-arm half
// (*"a mismatch arm whose `message` the ENTRY authored rather than the artefact's own generator"*), which
// is why arm (a) is read beside it below. **THE STATE IS DRIVEN AT ALL THREE TRIGGER CONDITIONS THE CLAUSE
// ENUMERATES**, and the cell's own count of subprocess drives is `6`.
// STATES: a covered key whose rung one LOADED and its own `version` DID NOT MATCH, and the same artefact's
//   `errorMessage` is ABSENT · ITS OWN GENERATOR THROWS · IT ANSWERS A VALUE THAT IS NOT A `string` (the
//   three trigger conditions `§1.4` item 7 names) · and, beside them, the SAME state with a usable
//   generator, which is arm (a) at the same subject (`§1.4` item 6's closing paragraph)
// FAIL-STATES: a `message` at this state that APPENDS the rung-two path · a `message` that names the
//   module-relative addon path in place of the rung-one artefact's own (`§1.4` item 7's FINDING) · the
//   both-paths JOIN at a state where ONLY RUNG ONE WAS TRIED (`§1.5` item 6; `PUB-DD-26`) · a rung-two
//   `require` reached on some evaluation · an instance returned beside the arm · a second failure shape, a
//   third member or a package-minted status (`§1.4` item 1; `PUB-DD-25`) · a message that is the entry's own
//   template rather than the generator's clause byte-for-byte (`§5.5`; `P-PUB-5`)
cell('P-PUB-5', 'S-ONEARM the artefact that LOADED and carries no usable generator is arm (b) at rung one\'s path ALONE', async () => {
  const key = COVERED[0];
  // **THE ONE SITE THE TWO CONTROLS ARE CUT AT, ANCHORED ONCE** — the mismatch arm of the entry's own walk.
  const MUTATION_SITE = `        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) };`;
  /** `§1.4` item 7's state, assembled once: a covered key, rung one LOADED at the declared name, its own
   *  `version` answering a string that is NOT the package's, and a generator in the shape the clause names. */
  const thirdConditionEnv = (label, generatorShape, entrySource = null) => coveredEnv(key, 'wrong', {
    rungTwo: 'broken',
    rungOne: { errorMessage: generatorShape },
    entrySource,
  });
  /** **THE INSTRUMENT — ONE SET OF ASSERTIONS, RUN ON THE SHIPPED ENTRY AND ON EVERY CONTROL ALIKE**, so a
   *  control measures the assertion that actually guards the tree and never a copy of it: the shape, the
   *  status, the EXACT rendering at the rung-one subject ALONE, the absence of the both-paths join, the
   *  absence of any rung-two attempt, and the absence of a returned instance all stand inside it. */
  const driveThirdCondition = ({ env, generatorShape }) => {
    const r = drive(env, { platform: key.platform, arch: key.arch });
    // **THE LEVER, MEASURED WHERE IT LIVES AND NOT WHERE THE CELL HOPES**: the artefact the walk LOADED is
    // read in THIS process, and its own generator is asked what it answers — so "this artefact carries no
    // usable generator" is a fact about the staged artefact and not about the drive's intention.
    const loadedApi = require_(env.stubFile);
    const shape = (() => {
      if (typeof loadedApi.errorMessage !== 'function') return 'absent';
      try { return typeof loadedApi.errorMessage(ARM_STATUS, 'probe') === 'string' ? 'usable' : 'notstring'; }
      catch { return 'throws'; }
    })();
    assert.equal(shape, generatorShape,
      `the artefact the walk LOADED carries no USABLE generator: its own \`errorMessage\` is ${generatorShape}`
      + ` (\`§1.4\` item 7's three trigger conditions), and this drive really staged that shape`);
    assert.equal(r.stub?.calls?.version, 1,
      '`§1.5` item 1: the read REACHED it — the artefact loaded far enough to answer `version`, which is what '
      + 'makes this state arm (b)\'s third condition rather than `present-unloadable`');
    assert.equal(r.stub?.calls?.storeCreate ?? 0, 0, 'and it did NOT construct: the version refused it');
    const A = assertArm(r, {});
    assert.deepEqual(Object.keys(A), ['status', 'message'],
      '`§1.4` item 1: the arm\'s member set is EXACTLY `{status, message}` — a third member is a second shape');
    // **THE SUBJECT, AS AN EXACT RENDERING AND NEVER AS AN INCLUSION**: an inclusion test is satisfied by a
    // message that names rung one AND appends rung two — which is precisely the FINDING `§1.4` item 7 names.
    assert.equal(A.message, gen(key.name),
      `\`§1.4\` item 7 / \`resolution.md §5.3a\`: at ${generatorShape} the arm reproduces the store's own clause `
      + `BYTE-FOR-BYTE at THE RUNG-ONE ARTEFACT'S OWN PATH ALONE (${key.name}) — the path the walk reached and the `
      + `path this arm's state is defined at — and never the both-paths join; got ${JSON.stringify(A.message)}`);
    const thisRungTwo = join(env.dir, RUNG_TWO_TAIL);
    assert.equal(A.message.includes(thisRungTwo), false,
      `${thisRungTwo} appears NOWHERE in the message: at this state rung two's \`require\` is reached on NO evaluation`);
    assert.equal(A.message.includes(`'${thisRungTwo}'`), false,
      'and it is not reported inside the generator\'s own subject slot either — a message naming the '
      + 'module-relative addon path in place of the rung-one artefact\'s own is a FINDING (`§1.4` item 7)');
    assert.equal(A.message.includes("', '"), false,
      'and the BOTH-PATHS JOIN is ABSENT: the separator `\', \'` between two quoted subjects would report a walk '
      + 'the loader did not take (`§1.5` item 6; `PUB-DD-26`) — at this state ONLY RUNG ONE WAS TRIED');
    assert.equal(r.requests.filter(isRungTwo).length, 0,
      'NO rung-two attempt: the walk RETURNS at the arm (`§1.4` item 7)');
    assert.equal(r.returned, false, 'and NO instance came back beside the arm — no fallback, no partial store');
    assert.equal(r.error, null, 'and nothing was absorbed silently');
    return { r, A };
  };
  // ---- (1) THE SHIPPED ENTRY, AT EACH OF THE CLAUSE'S THREE TRIGGER CONDITIONS ----
  assert.ok(!join(thirdConditionEnv('third-condition-rungtwo-path', 'absent').dir, RUNG_TWO_TAIL).includes(key.name),
    'the join this cell refuses to see is a path the rung-one subject does not contain, so the two are separable');
  const shippedMessages = new Map();
  for (const generatorShape of ['absent', 'throws', 'notstring']) {
    shippedMessages.set(generatorShape,
      driveThirdCondition({ env: thirdConditionEnv(`third-condition-${generatorShape}`, generatorShape), generatorShape }).A.message);
  }
  assert.equal(new Set(shippedMessages.values()).size, 1,
    'the three trigger conditions reach ONE string: the sub-case is a sub-case of arm (b) and not a third arm');
  // ---- (2) THE BYTE-FOR-BYTE CLAIM, MEASURED AGAINST THE STORE'S OWN GENERATOR AND NOT AGAINST A CONSTANT ----
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  assert.ok(existsSync(realAddon), 'the repository\'s own built artefact exists (the README\'s declared build step)');
  const storeAddon = require_(realAddon);
  assert.equal(typeof storeAddon.errorMessage, 'function',
    'the generator is reachable through the artefact that CARRIES it, which is arm (a)\'s home');
  const authored = storeAddon.errorMessage(ARM_STATUS, key.name);
  assert.equal(authored, gen(key.name), 'and the expected rendering IS that generator\'s own string at that subject');
  // arm (a) BESIDE arm (b), at the SAME subject and the SAME state: ONE AUTHOR SPEAKS IN BOTH ARMS.
  const armedGenerator = drive(coveredEnv(key, 'wrong', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  const Aa = assertArm(armedGenerator, {});
  assert.equal(armedGenerator.stub.calls.errorMessage, 1,
    'arm (a): the artefact that loaded and answered `version` is the artefact whose own generator authored the string');
  assert.equal(Aa.message, authored,
    'THE TWO ARMS AGREE BYTE-FOR-BYTE AT THE SAME SUBJECT: the reproduction this cell drives (arm (b), where the '
    + 'generator is unreachable through a function) is the generator\'s own rendering, so a third spelling, an '
    + `added word or a second sentence beside it fails here (\`§1.4\` item 6 (ii); \`PUB-DD-25\`); got ${JSON.stringify(Aa.message)}`);
  assert.equal(driveThirdCondition({ env: thirdConditionEnv('third-condition-agreement', 'absent'), generatorShape: 'absent' }).A.message, authored,
    'and the state this cell was added for reaches that same string: arm (b)\'s message IS arm (a)\'s, byte for byte');
  // ---- (3) THE TWO CONTROLS, EACH DISABLING ONE HALF OF THE CLAUSE AND EACH REQUIRED TO FAIL THE INSTRUMENT ----
  const shippedEntry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  assert.ok(shippedEntry.includes(MUTATION_SITE),
    'the entry\'s mismatch-arm site is present, so both controls are cut at the shipped bytes and not at a guess');
  const controlVerdict = (entrySource) => {
    const env = thirdConditionEnv('third-condition-control', 'absent', entrySource);
    try { driveThirdCondition({ env, generatorShape: 'absent' }); return null; } catch (err) { return err; }
  };
  const joinedEntry = shippedEntry.replace(MUTATION_SITE,
    `        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) + "', '" + join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node') + "'" };`);
  assert.ok(joinedEntry !== shippedEntry && joinedEntry.includes("', '\""),
    'THE FIRST CONTROL really appends the BOTH-PATHS JOIN at this state — the `§1.4` item 7 finding verbatim');
  assert.equal(shippedEntry.includes("', '\" + join(dirOf"), false, 'and the shipped entry carries no such append');
  const joinVerdict = controlVerdict(joinedEntry);
  assert.ok(joinVerdict !== null,
    'THE FIRST CONTROL MUST FAIL: a message that appends the rung-two path at a state where only rung one was tried is caught');
  assert.ok(joinVerdict.message.includes(RUNG_TWO_TAIL),
    `and the verdict names the joined path it caught: ${String(joinVerdict.message).slice(0, 240)}`);
  // **AND THE SECOND CONTROL IS CUT WHERE THE ARM IS REALLY BUILT.** The shipped `fail()` **reconstructs
  // the two members out of the refusal it is handed** (`throw { status: refusal.status, message:
  // refusal.message }` — *"mints no code of its own … and adds no third member"*), so a third member added
  // at the `addonArm` assignment alone would be DROPPED before it reached a consumer and the control would
  // measure nothing. **The `fail()` SITE IS THEREFORE THE ONE THE CONTROL IS CUT AT**: it is the single place
  // this unit's arm acquires its member set, and a third member minted there is the `§1.4` item 7 `alt`
  // verbatim — an `Error`-shaped or package-tokened second shape for a state whose declared answer is the
  // one form.
  const FAIL_SITE = `  throw { status: refusal.status, message: refusal.message };`;
  assert.ok(shippedEntry.includes(FAIL_SITE), 'the entry\'s one arm-building site is present');
  const secondShapeEntry = shippedEntry.replace(FAIL_SITE,
    `  throw { status: refusal.status, message: refusal.message, code: 'AddonVersionMismatch' };`);
  assert.ok(secondShapeEntry !== shippedEntry && secondShapeEntry.includes('AddonVersionMismatch'),
    'THE SECOND CONTROL really MINTS A SECOND FAILURE SHAPE — the `alt` `§1.4` item 7 prices and REFUSES');
  assert.equal(shippedEntry.includes('AddonVersionMismatch'), false,
    'and the shipped entry mints no code of its own: the status stays the store\'s closed member, carried verbatim');
  const shapeVerdict = controlVerdict(secondShapeEntry);
  assert.ok(shapeVerdict !== null,
    'THE SECOND CONTROL MUST FAIL: a third member — or any shape but `{status, message}` — is caught at this state too');
  assert.ok(shapeVerdict.message.includes('no arm was thrown') && shapeVerdict.message.includes('notTheArm'),
    'and the verdict names what it refused: the thrown value is NOT the one arm, and the state surfaces as an '
    + `absorbed state rather than being read as the arm (${String(shapeVerdict.message).slice(0, 240)})`);
  // **THE CONTROLS' MEASURED RESULTS, PRINTED SO THE RECORD CAN CITE THEM RATHER THAN THIS CELL'S INTENTION**
  // — `PUB-R-13` was routed as *"driven by no cell of the red set"*, and a cell whose controls are not
  // measured is the same defect one pass later.
  console.log(`\n[P-PUB-5/S-ONEARM · \`PUB-R-13\` · \`contract.md §1.4\` item 7] the third-condition controls, MEASURED `
    + `AGAINST THE SHIPPED INSTRUMENT:\n  `
    + `${'the both-paths join appended at this state'.padEnd(52)} → ${String(joinVerdict.message).split('\n')[0].slice(0, 140)}\n  `
    + `${'a second failure shape minted at the arm'.padEnd(52)} → ${String(shapeVerdict.message).split('\n')[0].slice(0, 140)}`);
});

cell('P-PUB-5', 'S-ONEARM no fallback, no partial instance, no no-op verb, no fourth outcome', async () => {
  // `§1.4` item 3: the package NEVER falls back to a JavaScript store, NEVER absorbs a state silently,
  // NEVER degrades to a partial instance or a no-op verb, and NEVER substitutes a package-authored
  // message, status or instance. THE LOAD PATH HAS THREE OUTCOMES AND NO FOURTH.
  const reports = [
    drive(coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
    drive(makeScratch({ label: 'fall-1', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' }),
    drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
  ];
  for (const r of reports) {
    // **THE TWO DECLARED ANSWERS, IN THE DRIVER'S OWN TERMS.** `success` is an instance with NO arm; the
    // OTHER TWO answers — the declared absent form AND the single failure arm — are both THE ONE THROW, and
    // it reaches the observer from the IMPORT when the entry's own evaluation throws it (a state whose
    // answer is the arm on a path with no candidate) and from the CONSTRUCTION when the artefact loaded and
    // the state refuses to construct. **A state in which an arm was answered is therefore an arm OUTCOME —
    // never a "third shape" — and `ok`, which reports only WHERE the throw came from, is not what decides
    // it.** The earlier form of this assertion read `ok === false` as the arm's signature, which both
    // contradicted the cells that see the arm from a rung-one load (`PUB-CF-10`) and made `armOutcome` a
    // dead branch that could never fail.
    const instanceOutcome = r.ok === true && r.arm === null && r.returned === true;
    const armOutcome = r.arm !== null;
    assert.ok(instanceOutcome || armOutcome,
      'the outcome is `success` or the one arm — never a third shape (`§1.4` item 3)');
    assert.equal(r.error, null, 'no state is absorbed silently');
    if (armOutcome) {
      assert.ok(!r.returned, 'and NO instance is returned beside the arm — no partial instance, no fallback');
      assertArm(r, {});
    }
  }
});

// ---------------------------------------------------------------------------------------------
// §5.6 P-PUB-6 — THE SCOPE IS STRUCTURAL (`§1.3`, `resolution.md §3.1`, `PUB-DD-15`)
// ---------------------------------------------------------------------------------------------
// STATES: the five names, name for name · the scope of each · a name dropping a suffix · the alternative
//   literal reading · a sixth name · an unscoped name · the five spellings across every home the contract
//   names, with the `Q3` homes asserted AS THE DECLARED SET
// FAIL-STATES: an unscoped platform name anywhere · a sixth scoped name · a name whose scope is not
//   `@auspicion` — **AND ITS CONVERSE, KEPT BESIDE IT: a name whose scope IS the old `@provident-storeroom`,
//   the scope `A86` moves the five away from** · a name that drops a suffix · the alternative literal
//   reading written anywhere — **AND THAT READING IS NOW SWEPT IN BOTH OF ITS DECLARED FORMS: `PUB-DD-15`'s
//   as-filed alternative `@auspicion/<label>[-<toolchain>]` (no `js-` second segment) AND `A86`(b)'s PRICED
//   alternative `@auspicion/storeroom-js-<label>[-<toolchain>]` (`F-2`, `§10`)** — · the five spellings
//   disagreeing across the homes (`contract.md §5.6`;
//   `resolution.md §3.1`; `parameter-semantics.md` `PAR-PUB-17`'s outside values)
// **⟶ AND `A88`(a) MOVES THE SECOND SEGMENT AND NOT THE SCOPE, SO TWO MORE MEMBERS JOIN THE FAILURE LIST
// BESIDE THE ONES ABOVE, RE-EMITTED: *"the SUPERSEDED spelling `@auspicion/js-<label>` written anywhere"*
// — the five as `A86`(a) spelled them, which `A88` retires — **AND `A88`(b)'s PRICED READING
// `@auspicion/provident-storeroom-<label>[-<toolchain>]`, THE PROJECT TOKEN WITH THE LANGUAGE MARKER
// DROPPED, WHICH `§14` PRICES AND `A88`(a) DISPLACES** (`docs/specs/storeroom-publish-proposal.md` `§14`
// item `7`). **THE SCOPE ITSELF IS UNMOVED AT `@auspicion`, so every clause above that reads the scope
// stands byte-for-byte; what moved is the PROJECT TOKEN the name now carries.**
const SUFFIXED = {
  '@auspicion/provident-storeroom-js-linux-x64-gnu': '-gnu',
  '@auspicion/provident-storeroom-js-linux-arm64-gnu': '-gnu',
  '@auspicion/provident-storeroom-js-win32-x64-msvc': '-msvc',
};

cell('P-PUB-6', 'S-SCOPE the five names, name for name, in the manifest and the entry', async () => {
  // **⟶ RE-CUT BY THE `0.1.1` PASS, THE SAME WAY AS `P-PUB-2`'s PIN CELL AND FOR THE SAME REASON:** the
  // shipped form compared each pin to the literal `'0.1.0'`, which read the SHIPPED version through a
  // frozen string. The property this cell drives is the five names being the five names — the pins' VALUES
  // are `PAR-PUB-8`'s coupling, so each is read against its OWN platform manifest's `version` and against
  // the main's, which is read against the declared release (`A89` · `§15` item 1). **NO CONJUNCT OF THE
  // SHIPPED CELL WAS DROPPED:** the pin is still asserted present, still asserted exact (never a range),
  // and the entry's five spellings are still read name for name.
  const { main, pins, platformVersions } = mainVersionCoupling();
  const entry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  assert.deepEqual(Object.keys(pins).sort(), [...FIVE_NAMES].sort(),
    '`§1.3` item 4 / `PAR-PUB-8`: the manifest\'s five keys ARE the five declared names');
  const release = declaredReleaseVersion(REPO_ROOT);
  assert.equal(main.version, release,
    '`PAR-PUB-2` / `A89` (`§15` item 1): the main package\'s `version` IS the declared release version');
  for (const name of FIVE_NAMES) {
    assert.ok(pins[name] !== undefined, `${name} is a declared key`);
    assert.equal(pins[name], platformVersions.get(name)?.version,
      `${name}'s pin is exact — it equals the version at its OWN platform manifest, so the name and the `
      + 'version cannot disagree (`PAR-PUB-8` · the coupling rule)');
    assert.equal(pins[name], main.version, `${name}'s pin is the main package's own version`);
    assert.equal(pins[name], release, `${name}'s pin is the declared release version \`${release}\` (\`§15\`)`);
  }
  // the entry's own construction is `Q3`'s (`§9` · `Q3-1`), so the drive asserts the DECLARED SET: the
  // five names are what the entry must select from, and no sixth spelling may appear in it.
  const spelledInEntry = FIVE_NAMES.filter((n) => entry.includes(n));
  assert.deepEqual(spelledInEntry, FIVE_NAMES,
    'the entry\'s own construction must read the same five spellings (`AV-2`: the five homes read together)');
});

cell('P-PUB-6', 'S-SCOPE every name is scoped, and the scope is `@auspicion`', async () => {
  // `§1.3`'s closing clause / `PUB-DD-6` / **`A86`**: each of the five is claimable only by the scope's
  // owner, so the names cannot be filled by a third party. An UNSCOPED platform name anywhere fails.
  const names = [...FIVE_NAMES, ...(readdirSync(join(PKG_DIR, 'test'))).map(() => null)];
  for (const name of FIVE_NAMES) {
    assert.ok(name.startsWith('@auspicion/'), `${name} is scoped`);
    const [scope, ...rest] = name.split('/');
    assert.equal(scope, '@auspicion', 'the scope is `@auspicion` and no other');
    assert.equal(rest.length, 1, 'one separator `/` and one second segment');
    assert.ok(rest[0].startsWith('provident-storeroom-js-'), 'the second segment NAMES THE PROJECT and the language, `provident-storeroom-js-<target>-<arch>[-<toolchain>]` (`A88`(a))');
    for (const [suffixed, suffix] of Object.entries(SUFFIXED)) {
      if (suffixed === name) assert.ok(name.endsWith(suffix), `a name does not drop a suffix its artefact carries: ${name}`);
    }
  }
  assert.equal(names.length > 0, true);
  // the sibling directory's own declaration of an unscoped set is NOT a home of the five (`PUB-DD-15`): the
  // entry and the manifest must carry no unscoped name, and the main package's own identity is unscoped
  // because it is a DIFFERENT identity (`PAR-PUB-1`) — **`A86` CHANGES AN ORG AND NOT THAT IDENTITY**.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const entry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  for (const name of Object.keys(manifest.optionalDependencies ?? {})) {
    assert.ok(name.includes('/'), `${name} must be scoped`);
  }
  // **AND THE REFUSAL RUNS IN BOTH DIRECTIONS, MEASURED AND NOT ASSERTED** (`P-PUB-6`'s failure list;
  // `resolution.md §3.1`: the old scope is a FINDING; `parameter-semantics.md` `PAR-PUB-17`'s outside
  // values, re-read at the new org).
  // STATES: a covered key whose rung one resolves · the five spelled at the SCOPE `A86` MOVES THEM AWAY
  //   FROM · **⟶ AND, ADDED BY THE `A88` PASS: THE FIVE SPELLED IN `A86`(a)'s SUPERSEDED FORM, WHICH `A88`
  //   RETIRES EVEN THOUGH ITS SCOPE IS THE OPERATIVE ONE** · the same five spelled at a THIRD org · the main
  //   package's own unscoped identity.
  // FAIL-STATES: a name whose scope is NOT `@auspicion` required anywhere · a name whose scope IS
  //   `@provident-storeroom` required anywhere (the converse the ruling ADDS BESIDE the refusal it keeps)
  //   · **a name in the SUPERSEDED `@auspicion/js-…` form required anywhere** · a third org's spelling read
  //   as one of the five · the main package's own identity `provident-storeroom`
  //   read as a sixth PLATFORM name.
  // **THE THREE SETS ARE DERIVED FROM THE DECLARED FIVE, NOT TYPED, so each set moves WITH the declared
  // values and none of the three can drift behind them** (`A88`(a); `docs/specs/storeroom-publish-proposal.md`
  // `§14` item `7`). **AND EACH SET IS DRIVEN AT ALL THREE HOMES `P-PUB-6` NAMES: the manifest's keys, the
  // entry's own bytes, and the ATTEMPT SET of a drive that DOES reach the new scope.**
  const SUPERSEDED_ORG_NAMES = FIVE_NAMES.map((n) => n.replace('@auspicion/provident-storeroom-js-', '@auspicion/js-'));
  const OLD_SCOPE_NAMES = FIVE_NAMES.map((n) => n.replace('@auspicion/provident-storeroom-js-', '@provident-storeroom/js-'));
  const THIRD_ORG_NAMES = FIVE_NAMES.map((n) => n.replace('@auspicion/', '@provident/'));
  const WRONG_IDENTITY_NAMES = [...SUPERSEDED_ORG_NAMES, ...OLD_SCOPE_NAMES, ...THIRD_ORG_NAMES];
  for (const wrong of WRONG_IDENTITY_NAMES) {
    assert.equal(manifest.optionalDependencies[wrong], undefined,
      `${wrong} is REFUSED: the manifest's five keys ARE the declared five (${manifest.optionalDependencies[wrong] === undefined ? 'and this spelling is not one of them' : 'so this spelling must not be'})`);
    assert.ok(!entry.includes(wrong),
      `${wrong} is written nowhere in the entry's own construction: a name whose scope is neither the new one nor the main package's identity is refused`);
  }
  // the refusal at the LOAD PATH rather than at the bytes: at a COVERED key the entry requires THE one
  // declared name and never a wrong-scope sibling of it — which is exactly what a stale entry fails.
  const key = COVERED[0];
  const r = drive(coveredEnv(key, 'right'), { platform: key.platform, arch: key.arch });
  assert.ok(r.requests.includes(key.name),
    `the drive reached rung one's own DECLARED name, so the refusal above is measured and not vacuous (${key.name}); the attempt set was ${JSON.stringify(r.requests)}`);
  for (const wrong of WRONG_IDENTITY_NAMES) {
    assert.ok(!r.requests.includes(wrong),
      `${wrong} is REFUSED at the load path: neither the superseded form, nor the old scope, nor a third org is ever required`);
  }
  assert.ok(!r.requests.includes('provident-storeroom'),
    'the main package\'s own unscoped identity is NOT a sixth PLATFORM name: it is a different identity (`PAR-PUB-1`)');
});

cell('P-PUB-6', 'S-SCOPE the alternative literal reading is written nowhere', async () => {
  // `PUB-DD-15`: the alternative literal reading `@auspicion/<label>[-<toolchain>]` is REFUSED — **`A86`(a)
  // replaces the SCOPE SEGMENT ALONE, so the second segment `js-…` is UNMOVED and the alternative reading
  // is the reading WITHOUT it** — and it must be written ANYWHERE in the shipped homes. (The contract's own
  // `PUB-DD-15` cell PRINTS it as the refusal it is, so the contract documents are the one home the token is
  // lawful in, and they are not swept here: the sweep is over the SHIPPED bytes, where a second spelling
  // would be a finding.)
  //
  // **⟶ REPAIRED (`F-2`, `§10`): THE SIBLING-SPELLING CLAUSE OF THIS CELL COULD NOT FAIL, AND A MEASURED
  // CONTROL NOW PROVES IT CAN.** The as-filed form's second assertion was `!A || B` with `B` =
  // `text.includes(FIVE_NAMES[0])`, **and `B` IS TRUE BY CONSTRUCTION AT ALL THREE HOMES** — the manifest
  // and the entry DECLARE `@auspicion/js-linux-x64-gnu` and the shipped README PRINTS it — so the clause was
  // satisfied by every byte of the tree, an injected alternative included, at every home; and its `["']`
  // boundary missed a backtick-delimited spelling (the shipped README spells the name inside backticks).
  // **⟶ (`F-2`'s MEASUREMENT STANDS AND ITS SPELLING IS READ AT THE `A86` ERA IT WAS TAKEN IN: under `A88`
  // the three homes DECLARE and PRINT `@auspicion/provident-storeroom-js-linux-x64-gnu`, AND ALL THREE STILL
  // CARRY THE DECLARED FIRST NAME, so the unfalsifiability `F-2` measured is UNCHANGED BY THE PROJECT-TOKEN
  // MOVE.** **NO BYTE OF THE ANNOTATION ABOVE IS DELETED AND NO CLAIM OF IT IS WITHDRAWN.**)
  // **THE PROPERTY THE CELL MEANS IS NOW ASSERTED DIRECTLY, IN A FORM THAT CAN FAIL, AND THE INSTRUMENT
  // ITSELF IS MEASURED AGAINST SCRATCH COPIES CARRYING THE LITERALS:**
  //   (a) NO SPELLING OF EITHER ALTERNATIVE READING APPEARS IN THE SHIPPED BYTES — the `PUB-DD-15` reading
  //       `@auspicion/<label>[-<toolchain>]` (second segment `linux-…`) **AND** the `A86`(b) PRICED
  //       alternative `@auspicion/storeroom-js-<label>[-<toolchain>]` — each at the bare label AND at the
  //       artefact's own toolchain suffix, in EVERY shipped home;
  //   (b) NO TRUNCATED SIBLING OF A DECLARED SPELLING: `@auspicion/provident-storeroom-js-linux-x64` is
  //       never written without its own `-gnu`.
  // **⟶ AND THE `A88` PROJECT-TOKEN PASS ADDS THE PRICED READING OF THE OPERATIVE RULING BESIDE THE TWO
  // ABOVE, RE-EMITTED HERE SO THE THREE FAMILIES ARE NAMED IN ONE PLACE:** under `A88` the operative name
  // carries the project token AND the language marker, so **(iii)** `A88`(b)'s PRICED alternative
  // `@auspicion/provident-storeroom-<label>[-<toolchain>]` — the project token with the `js-` marker
  // DROPPED — joins the `PUB-DD-15` row and `A86`(b)'s retired form, **each at the bare label AND at the
  // artefact's own toolchain suffix, in EVERY shipped home** (`docs/specs/storeroom-publish-proposal.md`
  // `§14` item `7`; `A88`(b)). **NOTHING IS REMOVED FROM THE SWEPT SET: the `A86`-era and `PUB-DD-15`-era
  // spellings stay swept, so the instrument is strictly wider than before and no assertion is weakened.**
  // **THE CONTROLS ARE SCRATCH COPIES UNDER THE OPERATING SYSTEM'S TEMPORARY AREA AND NOT ONE BYTE OF THE
  // REPOSITORY IS WRITTEN.**
  const reEscape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // the artefact's own toolchain suffix for a covered label, read off the DECLARED name — `''` for the two
  // Apple rows, `-gnu` twice and `-msvc` once (`package.md §3.2`'s map, whose `3 + 2 = 5` does not move).
  const suffixOf = (label) => FIVE_NAMES.find((n) => n.startsWith(`@auspicion/provident-storeroom-js-${label}`)).slice(`@auspicion/provident-storeroom-js-${label}`.length);
  // **THE THREE ALTERNATIVE-READING FAMILIES, EACH AT EVERY TOOLCHAIN STATE THE DECLARED TABLE CARRIES.**
  const alternativeReadings = [...new Set(COVERED.flatMap((k) => {
    const suffix = suffixOf(k.label);
    return [`@auspicion/${k.label}`, `@auspicion/${k.label}${suffix}`,
      `@auspicion/storeroom-js-${k.label}`, `@auspicion/storeroom-js-${k.label}${suffix}`,
      `@auspicion/provident-storeroom-${k.label}`, `@auspicion/provident-storeroom-${k.label}${suffix}`];
  }))];
  /** **THE SWEEP — ONE INSTRUMENT, DRIVING THE SHIPPED BYTES AND THE CONTROLS BOTH**, so that a control
   *  measures the assertion that actually guards the tree and never a copy of it. It throws at the first
   *  home whose bytes carry a refused spelling, naming the home and the literal. */
  const sweepAlternativeReadings = (homes) => {
    let checks = 0;
    for (const [label, text] of homes) {
      for (const alternative of alternativeReadings) {
        assert.ok(!text.includes(alternative),
          `${label} must not spell the alternative reading ${alternative} (\`PUB-DD-15\`; \`A86\`(b); \`A88\`(b))`);
        checks += 1;
      }
      for (const [spelled, suffix] of Object.entries(SUFFIXED)) {
        const stem = spelled.slice(0, spelled.length - suffix.length);
        assert.deepEqual(text.match(new RegExp(`${reEscape(stem)}(?!${reEscape(suffix)})`, 'g')) ?? [], [],
          `${label} spells ${stem} with its own suffix ${suffix} and no truncated sibling of it`);
        checks += 1;
      }
    }
    return checks;
  };
  const shipped = [
    ['the main manifest', readFileSync(join(PKG_DIR, 'package.json'), 'utf8')],
    ['the entry', readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8')],
    ['the shipped README', readFileSync(join(PKG_DIR, 'README.md'), 'utf8')],
  ];
  const checks = sweepAlternativeReadings(shipped);
  assert.equal(checks, shipped.length * (alternativeReadings.length + Object.keys(SUFFIXED).length),
    `the sweep really ran over every home, every alternative reading and every declared suffix (${checks} checks)`);
  // **THE TWO CONTROLS, MEASURED AND REQUIRED TO FAIL.** Each is a SCRATCH COPY of the shipped manifest
  // carrying ONE refused literal in place of a declared key. If the sweep above were decoration rather than
  // an instrument, **the `sweepCaught` assertions below are what goes red** — which is the falsifier the
  // as-filed clause had none of.
  const controlDir = mkdtempSync(join(SCRATCH_ROOT, 'altsweep-'));
  const sweepCaught = (index, bytes) => {
    const copy = join(controlDir, `manifest-${index}.json`);
    writeFileSync(copy, bytes);
    try { sweepAlternativeReadings([['the main manifest', readFileSync(copy, 'utf8')]]); return null; }
    catch (err) { return err; }
  };
  const pricedLiteral = `@auspicion/provident-storeroom-${COVERED[0].label}${suffixOf(COVERED[0].label)}`;
  const pricedStem = `@auspicion/provident-storeroom-${COVERED[0].label}`;
  const pricedControl = readFileSync(join(PKG_DIR, 'package.json'), 'utf8')
    .replace(`"${FIVE_NAMES[0]}"`, `"${pricedLiteral}"`);
  assert.ok(pricedControl.includes(pricedLiteral) && !pricedControl.includes(`"${FIVE_NAMES[0]}"`),
    `the first control really carries \`A88\`(b)'s priced literal — \`A86\`(b)'s form, re-read at the project token — in place of the declared key (${pricedLiteral})`);
  const pricedVerdict = sweepCaught(1, pricedControl);
  assert.ok(pricedVerdict !== null,
    `THE FIRST CONTROL MUST FAIL: the sweep catches the priced alternative reading ${pricedLiteral} where it stands`);
  // the sweep reports the FIRST refused spelling it meets in the injected key — the bare label form, which
  // the toolchain-suffixed one contains — so the clause checked is the injected literal's own STEM.
  assert.ok(pricedVerdict.message.includes(pricedStem) && pricedVerdict.message.includes('the main manifest'),
    `and it names the injected literal and the home it caught: ${String(pricedVerdict.message).slice(0, 200)}`);
  // and the literal the sweep actually READ is one the CONTROL carries and the SHIPPED manifest carries
  // nowhere — so the failure came from the control's own bytes and not from the tree under test.
  const caughtLiteral = (pricedVerdict.message.match(/@auspicion\/[A-Za-z0-9/._-]+/) ?? [null])[0];
  assert.ok(caughtLiteral !== null && pricedControl.includes(caughtLiteral)
    && !readFileSync(join(PKG_DIR, 'package.json'), 'utf8').includes(caughtLiteral),
    `the literal the sweep caught is CARRIED BY THE CONTROL AND BY THE SHIPPED MANIFEST NOWHERE: ${caughtLiteral}`);
  const truncatedLiteral = FIVE_NAMES[0].slice(0, FIVE_NAMES[0].length - suffixOf(COVERED[0].label).length);
  const truncatedControl = readFileSync(join(PKG_DIR, 'package.json'), 'utf8')
    .replace(`"${FIVE_NAMES[0]}"`, `"${truncatedLiteral}"`);
  assert.ok(truncatedControl.includes(`"${truncatedLiteral}"`) && !truncatedControl.includes(`"${FIVE_NAMES[0]}"`),
    `the second control really drops the declared suffix (${truncatedLiteral})`);
  const truncatedVerdict = sweepCaught(2, truncatedControl);
  assert.ok(truncatedVerdict !== null,
    `THE SECOND CONTROL MUST FAIL: the sweep catches the truncated sibling ${truncatedLiteral}`);
  assert.ok(truncatedVerdict.message.includes(truncatedLiteral) && truncatedVerdict.message.includes('with its own suffix'),
    `and it names the truncated spelling and the clause it broke: ${String(truncatedVerdict.message).slice(0, 200)}`);
  // and the five spellings agree ACROSS THE HOMES the contract names: the sibling directory's two cells are
  // `Q3`'s (`§9` · `Q3-1`), so they are asserted as the DECLARED SET rather than as the shipped tree.
  // **AND THE SET PROPERTY THE AS-FILED CLOSING LINE ONLY APPEARED TO ASSERT IS NOW ASSERTED**: that line
  // compared the declared set WITH ITSELF (`deepEqual([...FIVE_NAMES], [...FIVE_NAMES])`), so it held for
  // every state of the tree; the declared set's own census and its DISJOINTNESS from every alternative
  // reading are what the clause means, and either can fail.
  assert.equal(FIVE_NAMES.length, 5, 'the declared set is the five, name for name');
  assert.deepEqual(FIVE_NAMES.filter((n) => alternativeReadings.includes(n)), [],
    'and NOT ONE of the five declared names IS an alternative reading of itself');
});

cell('P-PUB-6', 'S-SCOPE the five spellings agree across every home the contract names', async () => {
  // `§1.3`'s observable: a name-for-name comparison of the five spellings across this contract, the entry's
  // construction, `bindings/js/package.json`'s five keys, `docs/specs/storeroom-js/package.md §3.2`'s table
  // and that unit's `contract.md` `DD-25`/`DD-26`. THE LAST TWO ARE `Q3` DUTIES: they are read from the
  // DECLARED SET (`PUB-DD-15`) and asserted as that set, so this drive never asserts a byte `Q3` has not
  // written and never anticipates the amendment.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  // **⟶ ADDED BY THE PRE-TAG PASS (`role_test_writer`): THE WORKFLOW IS NOW A HOME AND IT WAS NOT SWEPT.**
  // `release.md §1.2`'s own table carries the five names, and the file that carries them EXISTS
  // (`§1.1` item `1`'s reconciliation), so it is a sixth shipped home beside the manifest, the entry and the
  // README — and the one whose bytes are read by the host that publishes. **ITS FIVE MATRIX NAMES ARE READ
  // AGAINST THE DECLARED SET, NAME FOR NAME, and the retired scope is driven absent from it in the `S-TAG`
  // cell's own instrument; a home that carries four of the five, or a stale scope, now fails HERE.**
  const workflowBytes = readFileSync(join(REPO_ROOT, '.github', 'workflows', 'publish.yml'), 'utf8');
  const homes = {
    'the manifest\'s five keys': Object.keys(manifest.optionalDependencies ?? {}),
    'the contract\'s own table (`resolution.md §3.1`)': FIVE_NAMES.filter((n) =>
      readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'resolution.md'), 'utf8').includes(n)),
    'the declared set (`PUB-DD-15`)': [...FIVE_NAMES],
    'the release workflow\'s own matrix (`release.md §1.2`)': FIVE_NAMES.filter((n) => workflowBytes.includes(n)),
  };
  for (const [home, names] of Object.entries(homes)) {
    assert.deepEqual([...names].sort(), [...FIVE_NAMES].sort(), `${home} reads the same five spellings`);
  }
});

// ---------------------------------------------------------------------------------------------
// §5.7 P-PUB-7 — THE MAIN PACKAGE'S OWN SHAPE (`§2.1`–`§2.5`, `distribution.md §2`–`§5`)
// ---------------------------------------------------------------------------------------------
// STATES: `files` with and without `build/Release` · a binary shipped or not · the `types` field and the
//   `.d.ts`'s presence · the `status` union's carriage · the licence field and its four sites · the six
//   artefacts' notices · **the THREE metadata fields PRESENT and each resolving to the provenance's own
//   source repository** · a secret in a tracked byte
// FAIL-STATES: `build/Release` shipped · any binary in the tarball · a `.d.ts` enumerating the store's
//   closed set immutably · a generated `.d.ts` · a `status` type admitting no unknown member · a licence
//   field disagreeing with the four sites · a third spelling · a fifth declaration SITE · a `LICENSE` byte
//   under `bindings/js/` · a platform artefact with no notice · **an unresolving `repository`/`homepage`/
//   `bugs` — STILL TRUE, STILL UNMET, and now MET BY THE SHIPPED VALUES rather than by their absence** ·
//   **a PLACEHOLDER URL (`PAR-PUB-13`–`15`, refused and driven below) — STILL UNMET** · a secret written
//   into a tracked byte (`contract.md §5.7`)
// **THE AS-FILED STATE LINE READ** *"the three declared-absent metadata fields"* **AND ITS FAIL-STATE READ**
// *"an unresolving `repository`/`homepage`/`bugs`"* — **BOTH RE-EMITTED HERE VERBATIM SO `git diff` HAS
// NOTHING TO RECOVER. THE FIRST IS DISPOSED OF: `PUB-DD-7`'s reversal column writes the three fields *"the
// moment a remote exists"*, and the registry's own `422` supplies the remote. THE SECOND STANDS UNCHANGED
// AND IS NOW THE CELL'S OWN BITE** — see the scratch control inside the `S-MANIFEST` cell below.

cell('P-PUB-7', 'S-MANIFEST `build/Release` leaves `files`, and no binary ships', async () => {
  // `§2.1` item 1 / `PUB-DD-1` / `PAR-PUB-3`: the allowlist is `index.mjs` · `README.md` · `index.d.ts` and
  // NOTHING ELSE; NO binary ships, at any key, on any target.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.deepEqual([...(manifest.files ?? [])].sort(), ['README.md', 'index.d.ts', 'index.mjs'],
    '`§2.1` item 1: exactly three entries');
  assert.ok(!(manifest.files ?? []).includes('build/Release'), '`build/Release` LEAVES `files`');
  assert.ok(!(manifest.files ?? []).some((f) => f.endsWith('.node')), 'no `.node` is published');
  assert.equal(manifest.scripts?.postinstall, undefined, '`PUB-DD-1`: no `postinstall` build-on-install route');
  // a shipped binary would also be visible in the tracked tree
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (entry.name.endsWith('.node')) acc.push(full);
    }
    return acc;
  };
  assert.deepEqual(walk(PKG_DIR), [], 'NO binary is committed to the tracked tree');
});

cell('P-PUB-7', 'S-TYPES `index.d.ts` is present, authored, and listed', async () => {
  // `§2.4` item 1 / `PUB-DD-21` / `PAR-PUB-4`: the types sit at `bindings/js/index.d.ts`, ARE AUTHORED NOT
  // GENERATED, are listed in `files`, and are reached through the `types` field. No `typesVersions`, no
  // second declaration file, no `@types/…` package.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.equal(manifest.types, 'index.d.ts', 'the `types` field is `index.d.ts`');
  assert.ok((manifest.files ?? []).includes('index.d.ts'), 'and the same file is listed in `files`');
  assert.equal(manifest.typesVersions, undefined, 'no `typesVersions` map');
  assert.ok(existsSync(join(PKG_DIR, 'index.d.ts')), '`Q3-4`: the authored `bindings/js/index.d.ts` is shipped');
  const dts = readFileSync(join(PKG_DIR, 'index.d.ts'), 'utf8');
  assert.ok(dts.length > 0, 'the declaration file carries content');
  assert.ok(!/@generated|autogenerated|DO NOT EDIT|generated by/i.test(dts),
    '`PUB-DD-3`: AUTHORED, not generated — the file carries no generation banner');
});

cell('P-PUB-7', 'S-TYPES the `status` union is over a declared-but-open set', async () => {
  // `§2.4` item 2 / `PUB-DD-3` / `distribution.md §5.3`: the fifteen members are DISCOVERABLE in the type
  // AND AN UNKNOWN STATUS IS STILL TYPED — the union's members beside an explicit escape — and the set's
  // MEMBERSHIP is declared in the type's own prose as THE STORE'S and not the package's. An immutably
  // enumerated union is REFUSED.
  const path = join(PKG_DIR, 'index.d.ts');
  assert.ok(existsSync(path), 'the declaration file exists');
  const dts = readFileSync(path, 'utf8');
  assert.ok(/string\s*&\s*\{\s*\}/.test(dts) || /\|\s*string\b/.test(dts) || /\(string\s*&\s*\{\}\)/.test(dts),
    'the union carries an ESCAPE so an unknown status is still typed; an immutable union of fifteen is REFUSED');
  const discoverable = CLOSED_SET.filter((member) => dts.includes(member));
  assert.ok(discoverable.length >= 11,
    `the set's members are DISCOVERABLE in the type (found ${discoverable.length} of 15)`);
  assert.ok(/store('s)?\b/i.test(dts), 'the set\'s membership is declared in the type\'s own prose as THE STORE\'S');
  for (const verb of ['storeCreate', 'readLiteral', 'unlisten']) {
    assert.ok(dts.includes(verb), `the declaration carries the entry's surface (${verb} missing)`);
  }
});

cell('P-PUB-7', 'S-LICENCE the licence field agrees with the declared four sites', async () => {
  // `§2.3` item 1 / `distribution.md §4.1`: the declared fact is `AGPL-3.0` at `(i)` the main package's
  // manifest `license` field, `(ii)` `bindings/js/README.md`, `(iii)` `docs/specs/storeroom-js/package.md
  // §3.4`; and `(iv)` the sibling crate's `Cargo.toml` field is `AGPL-3.0-or-later`. THE DIVERGENCE IS
  // DECLARED AND NOT REPAIRED; a THIRD SPELLING is a finding.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.equal(manifest.license, 'AGPL-3.0', 'site (i): `AGPL-3.0`, exactly');
  assert.ok(readFileSync(join(PKG_DIR, 'README.md'), 'utf8').includes('AGPL-3.0'), 'site (ii) declares the licence');
  const crate = readFileSync(join(PKG_DIR, 'Cargo.toml'), 'utf8');
  assert.match(crate, /^license\s*=\s*"AGPL-3\.0-or-later"$/m, 'site (iv): the SPDX expression carries `-or-later`');
  const third = ['MIT', 'Apache-2.0', 'GPL-3.0-only', 'BSD-3-Clause', 'AGPL-3.0-only'];
  for (const token of third) {
    assert.ok(!new RegExp(`["']${token.replace('.', '\\.')}["']`).test(crate + JSON.stringify(manifest)),
      `no third spelling (${token})`);
  }
});

cell('P-PUB-7', 'S-LICENCE no fifth declaration site, and `bindings/js/LICENSE` is refused', async () => {
  // `§2.3` item 4 / `PUB-DD-12`: `bindings/js/LICENSE` IS REFUSED — no such file exists in the tree and
  // none is written by any pass. A FIFTH DECLARATION SITE (an authored statement about the licence at a new
  // home) is a finding, and so is a third spelling.
  //
  // **A SITE IS A PATH, AND THIS SWEEP TESTS SITES.** `distribution.md §4.1` ENUMERATES the declaration
  // sites by name — `(i)` the MAIN package's manifest `license` field · `(ii)` `bindings/js/README.md` ·
  // `(iii)` `docs/specs/storeroom-js/package.md §3.4` · `(iv)` `bindings/js/Cargo.toml`'s `license` field —
  // and the contract answers for a FIFTH one. **WHAT IS *NOT* A SITE IS THEREFORE DECIDED BY A CLAUSE AND
  // NOT BY A STRING'S PRESENCE**: `distribution.md §3.2` field 8 declares that each platform artefact's
  // manifest carries the SAME field and that *"the per-artefact copy is NOT a fifth declaration SITE"*
  // (`§4.2` item 3), and a test's or a battery's ASSERTION about the licence is not a site either. **THE
  // EARLIER FORM OF THIS SWEEP MATCHED BY PATTERN INSTEAD — any `license`-shaped token — and so flagged the
  // FIVE REQUIRED PLATFORM MANIFESTS and a pre-existing assertion line in `greens/greens.mjs`: cells that
  // cannot pass while the contract is satisfied (`PUB-CF-11`). The refusal's own content is asserted
  // FIRST below, so that a bare path set can never be satisfied vacuously.**
  assert.equal(existsSync(join(PKG_DIR, 'LICENSE')), false, '`bindings/js/LICENSE` is refused');
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (/\.(md|json|toml|js|mjs|ts|rs)$/.test(entry.name) && entry.name !== 'publish.test.mjs') acc.push(full);
    }
    return acc;
  };
  const allowed = new Set([
    join(PKG_DIR, 'package.json'), // site (i)
    join(PKG_DIR, 'README.md'), // site (ii)
    join(PKG_DIR, 'Cargo.toml'), // site (iv)
  ]);
  // A declaration SITE is an AUTHORED DECLARATION ABOUT the licence — a manifest's or a manifest-shaped
  // KEY (`"license"` followed by its value, as a JSON manifest and as the TOML field write it), or a
  // documented statement NAMING the licence with its spelling beside it — while a drive's or a battery's
  // ASSERTION about the licence is not a site (`distribution.md §4.2` item 3's own reading of the same
  // distinction at the artefact level). **THE TWO FORMS ARE DISCRIMINATED BY SHAPE ALONE**: the battery's
  // own line spells `"license is 'AGPL-3.0'"` inside an assertion's arguments and answers NEITHER form.
  const declares = (text) =>
    /["']license["']\s*[:=]/i.test(text)
    || /^\s*license\s*=/im.test(text)
    || /^[^\n]*\blicen[cs]e\b(?:[^\n]*\n){0,3}[^\n]*AGPL-3\.0/im.test(text);
  // (a) THE REFUSAL HAS CONTENT AND THE MATCHER IS NOT VACUOUS: each enumerated site READS as a
  // declaration, the refused copy's own home is tested, and a manifest-shaped declaration IS recognised
  // (the matcher would otherwise answer every question `false` and pass this cell for free).
  for (const site of allowed) {
    assert.equal(existsSync(site), true, `the enumerated site ${site} exists`);
    assert.equal(declares(readFileSync(site, 'utf8')), true,
      `the enumerated site ${site} carries its declaration (so the matcher discriminates rather than passes blindly)`);
  }
  for (const other of ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'COPYING']) {
    assert.equal(existsSync(join(PKG_DIR, other)), false, `no licence copy is written in the package: ${other}`);
  }
  // (b) NO SITE AT ANY OTHER PATH THE CONTRACT NAMES. **`distribution.md §3.2` field 8 declares that each
  // platform artefact's manifest CARRIES the same field, and `§4.2` item 3 declares that this field — and the
  // copy that travels with the artefact — is NOT a fifth declaration SITE**, while a battery's ASSERTION
  // about the licence is not one either. Those homes are named EXCLUDED below with the clause that excludes
  // them, so the sweep answers "is there a site HERE?" at each of them rather than "does the tree contain a
  // string?" — and (c) asserts the excluded per-artefact fields really are present, so the exclusion can
  // never be read as five missing declarations.
  const excludedNonSites = new Map([
    ...readdirSync(join(PKG_DIR, 'platforms')).sort().map((d) => [
      join(PKG_DIR, 'platforms', d, 'package.json'),
      '`§3.2` field 8 / `§4.2` item 3: the artefact\'s own required field, and the per-artefact copy, are NOT a fifth site',
    ]),
    [join(PKG_DIR, 'greens', 'greens.mjs'),
      'a battery\'s ASSERTION about the field (`A(\'JSG-12.9\', …)`) is not an authored declaration about the licence'],
    [join(PKG_DIR, 'test', 'package-entry.test.mjs'),
      'a test\'s ASSERTION about the field is not an authored declaration about the licence'],
    // **⟶ ADDED BY THE RED-SET REPAIR PASS (`PUB-RED-2`): THE NEGATIVE GENERATORS' OWN FILE IS A THIRD
    // ASSERTION HOME, AND IT IS EXCLUDED FOR THE SAME REASON AS THE TWO ABOVE.** `NG-PUB-I`'s declaration
    // matcher is written out in that file as the regex literal `/["']license["']\s*[:=]/i` — the SHAPE of a
    // declaration, quoted as an instrument and asserted AGAINST the shipped bytes rather than made about
    // them. The cell below asserts the file carries no `"license":` KEY, so the exclusion is a named,
    // contract-sourced home and not a silent hole.
    [join(PKG_DIR, 'test', 'publish-generators.test.mjs'),
      'the negative generators\' declaration MATCHER (`/["\']license["\']\\s*[:=]/i`) is an assertion instrument, not an authored declaration about the licence'],
  ]);
  const candidates = new Set([
    ...walk(PKG_DIR),
    ...readdirSync(join(PKG_DIR, 'platforms')).sort().flatMap((d) => [
      join(PKG_DIR, 'platforms', d, 'package.json'),
      join(PKG_DIR, 'platforms', d, 'README.md'),
    ]),
    join(PKG_DIR, 'greens', 'greens.mjs'),
    join(PKG_DIR, 'index.mjs'),
    join(PKG_DIR, 'index.d.ts'),
    join(PKG_DIR, 'package-lock.json'),
  ]);
  const extra = [];
  for (const file of candidates) {
    if (allowed.has(file)) continue;
    if (!existsSync(file) || !statSync(file).isFile()) continue;
    const text = readFileSync(file, 'utf8');
    if (!/AGPL-3\.0/.test(text)) continue;
    if (excludedNonSites.has(file)) continue;
    if (declares(text)) extra.push(file);
  }
  assert.deepEqual(extra, [], `no fifth declaration site: ${JSON.stringify(extra)}`);
  // **AND THE EXCLUSION IS NOT A SILENT HOLE**: every excluded path is asserted to CARRY what the contract
  // says it carries, so a file added to the exclusion list can never hide a real declaration site — the
  // platform manifests' fields are asserted in (c), and the battery and the test file are asserted to be
  // the ASSERTIONS they are (a `license` token inside an argument list, and no `"license":` KEY anywhere).
  for (const [file, why] of excludedNonSites) {
    if (!existsSync(file)) continue; // a path this pass's own tree does not carry is not an exclusion
    const text = readFileSync(file, 'utf8');
    const isRequiredPlatformField = file.includes(`${sep}platforms${sep}`);
    if (isRequiredPlatformField) {
      assert.equal(typeof JSON.parse(text).license, 'string',
        `the excluded home still carries the field §3.2 field 8 requires (${why})`);
    } else {
      assert.ok(!/["']license["']\s*:/i.test(text),
        `the excluded home carries no \`"license":\` KEY — its occurrence is an assertion, not a site (${why})`);
    }
  }
  // (c) AND THE FIVE REQUIRED PER-ARTEFACT FIELDS ARE PRESENT — the sites excluded in (b) are REAL, so the
  // exclusion cannot be read as five missing declarations (`distribution.md §3.2` field 8; `§4.2` item 2).
  const platformManifests = readdirSync(join(PKG_DIR, 'platforms')).sort()
    .map((d) => join(PKG_DIR, 'platforms', d, 'package.json'));
  assert.equal(platformManifests.length, FIVE_NAMES.length,
    'the five platform artefacts\' manifests are the five homes the contract enumerates');
  for (const manifestPath of platformManifests) {
    assert.equal(existsSync(manifestPath), true, `the platform manifest ${manifestPath} exists`);
    const platformManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert.equal(platformManifest.license, 'AGPL-3.0',
      '`§3.2` field 8: the artefact\'s own `license` field reads the declared spelling — and it is not a SITE');
    assert.ok(FIVE_NAMES.includes(platformManifest.name),
      'and that manifest is one of the five declared names, so the exclusion in (b) is the contract\'s own');
  }
});

cell('P-PUB-7', 'S-MANIFEST the licence notice travels with all six artefacts', async () => {
  // `§2.3` item 2 / `PUB-DD-11` / `distribution.md §4.2` item 1: EACH OF THE SIX ARTEFACTS carries a copy of
  // the repository's own `LICENSE`. **AND THE MECHANISM IS THE RELEASE'S OWN ASSEMBLY STEP, NOT A `files`
  // ENTRY** (`§4.3` item 2: *"the licence's TEXT reaches an artefact through the release's own assembly step,
  // which copies the repository's `LICENSE` byte-for-byte into each artefact's tarball"*; `Q3-5`) — because
  // `§2.1` item 1 fixes the MAIN package's allowlist as `index.mjs` · `README.md` · `index.d.ts` and NOTHING
  // ELSE, so a `LICENSE` entry there would contradict the clause rather than satisfy this one. The five
  // platform artefacts' allowlists DO carry the copy, because `§3.2` field 5 requires it of them (`PUB-R-1`).
  // The per-artefact copy is NOT a fifth declaration site, and the count of artefacts carrying a notice is SIX.
  const mainManifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const repositoryLicence = readFileSync(join(REPO_ROOT, 'LICENSE'), 'utf8');
  assert.ok(repositoryLicence.includes('Provident-Storeroom'), 'the repository\'s own `LICENSE` names the programme');
  assert.ok(repositoryLicence.includes('Copyright (C) 2026 Auspicion Innovations LLC'),
    'and carries the architect\'s own copyright line (`PUB-DD-12`)');
  // **THE SIX HOMES ARE DERIVED FROM THE DECLARED SET AND ARE NOT TYPED, so the `A88` project-token move
  // lands in this sweep with no byte of it changed** (`A88`(a); `docs/specs/storeroom-publish-proposal.md`
  // `§14` item `7`): the main package's own unscoped identity stands (`A82`) and the five platform homes are
  // the five declared names, whatever they are spelled — which is why this line is re-emitted UNMOVED.
  const noticeBearing = ['provident-storeroom', ...FIVE_NAMES];
  assert.equal(noticeBearing.length, 6, '`distribution.md §6.3`: SIX artefacts carry a notice');
  // **(1) THE MAIN PACKAGE'S OWN HALF, ASSERTED AS THE CONTRADICTION-FREE PAIR IT IS.** `§2.1` item 1 forbids
  // a fourth allowlist entry, so the copy is an ARTEFACT-LEVEL fact and no `files` entry may carry it.
  assert.deepEqual([...(mainManifest.files ?? [])].sort(), ['README.md', 'index.d.ts', 'index.mjs'],
    '`§2.1` item 1: the main package\'s allowlist is `index.mjs` · `README.md` · `index.d.ts` and NOTHING ELSE');
  assert.equal((mainManifest.files ?? []).includes('LICENSE'), false,
    'and therefore no `LICENSE` `files` entry exists — the copy is the assembly step\'s, not the allowlist\'s');
  assert.equal(mainManifest.license, 'AGPL-3.0', '`§2.3` item 1 site (i): the manifest\'s own field reads the declared spelling');
  // **(2) THE DECLARED MECHANISM, READ AT THE HOME THAT CARRIES IT** — the shipped `README.md`, which `§2.1`
  // item 3 makes the consumer-facing home of the distribution's answers, asserts the six-artefact claim AND
  // names the assembly step that lands the copy. **THE SHIPPED FORM OF THIS CELL READ
  // `declaredFiles.includes('LICENSE') || true`, WHICH IS UNFALSIFIABLE FOR EVERY VALUE OF THE TREE**
  // (`PUB-R-5`): it is replaced here by the two claims the clause actually declares, each of them falsifiable.
  const readme = readFileSync(join(PKG_DIR, 'README.md'), 'utf8').replace(/\n\s*/g, ' ');
  assert.ok(/SIX artefacts/.test(readme) && /carries a copy of the repository's own `LICENSE`/.test(readme),
    '`§2.3` item 2 / `distribution.md §4.2` item 1: the shipped `README.md` declares that EACH OF THE SIX '
    + 'artefacts carries a copy — and a README that stated the opposite would fail HERE');
  assert.ok(/assembly step/.test(readme),
    '`§4.3` item 2 / `Q3-5`: and it names the release\'s own assembly step as the mechanism that lands the copy');
  // **(3) THE FIVE PLATFORM ARTEFACTS' OWN HALF IS NOT ASSUMED HERE EITHER** — `§3.2` field 5 requires each
  // allowlist to carry its `LICENSE` copy, and that is read at each manifest rather than inferred from the
  // README or from a count.
  const platformCopies = readdirSync(join(PKG_DIR, 'platforms')).sort().map((label) => {
    const m = JSON.parse(readFileSync(join(PKG_DIR, 'platforms', label, 'package.json'), 'utf8'));
    return { label, carries: (m.files ?? []).includes('LICENSE') };
  });
  assert.equal(platformCopies.length, 5, 'the five platform artefacts are the five homes the contract enumerates');
  for (const { label, carries } of platformCopies) {
    assert.equal(carries, true,
      `\`§3.2\` field 5 / \`distribution.md §4.2\` item 1: ${label}'s allowlist carries the licence copy, because an `
      + 'artefact that ships no copy ships no notice');
  }
});

cell('P-PUB-7', 'S-MANIFEST the main package\'s identity, realm and one ESM entry', async () => {
  // `§2.1` / `distribution.md §6.1` / `PAR-PUB-1`, `PAR-PUB-2`, `PAR-PUB-5`, `PAR-PUB-16`: `name` is
  // exactly `provident-storeroom`, `version` is the tag's own, `type` is `"module"`, and the `exports` map
  // publishes exactly ONE arms-bearing entry — the ESM one.
  // **⟶ RE-CUT BY THE `0.1.1` PASS: THE IDENTITY IS ASSERTED AS THE COUPLING *AND* AS THE EXACT DECLARED
  // RELEASE, AND THE EXACT HALF IS KEPT DELIBERATELY.** This cell is the main package's IDENTITY, so
  // "which version is this package" is what it means — and the coupling alone would be satisfied by six
  // manifests agreeing on the WRONG version. The value is therefore read from `A89`
  // (`docs/specs/storeroom-publish-proposal.md §15` item 1, *"the six manifests move to `0.1.1`
  // TOGETHER"*, with `0.1.0` declared *"the BOOTSTRAP … not a release"* at `§15` row 4) rather than written
  // as a literal here; the coupling is asserted beside it, so this cell states BOTH that the version is the
  // released one and that the six artefacts carry ONE version. **NO ASSERTION WAS WEAKENED OR DROPPED.**
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const { pins, platformVersions } = mainVersionCoupling();
  assert.equal(manifest.name, 'provident-storeroom',
    '`PAR-PUB-1` / `§9` `Q3-1`: the main package\'s identity is the unscoped `provident-storeroom`');
  const release = declaredReleaseVersion(REPO_ROOT);
  assert.equal(manifest.version, release,
    '`PAR-PUB-2`: the tag\'s own version for this release — the version `A89` (`§15` item 1) declares the '
    + 'six manifests moved to TOGETHER');
  for (const name of FIVE_NAMES) {
    assert.equal(pins[name], manifest.version,
      `the coupling rule (\`PAR-PUB-2\` · \`§15\` item 1): ${name}'s pin equals the main package's \`version\``);
    assert.equal(platformVersions.get(name)?.version, manifest.version,
      `the coupling rule: ${name}'s OWN platform manifest carries the main package's \`version\`, so the `
      + 'six artefacts are one release rather than six versions of it');
  }
  assert.equal(manifest.type, 'module', '`PAR-PUB-16`: the claimed realm is Node ESM alone');
  const exports_ = manifest.exports ?? {};
  assert.deepEqual(Object.keys(exports_), ['.'], '`PAR-PUB-5`: exactly ONE arms-bearing entry, the ESM one');
  assert.deepEqual(Object.keys(exports_['.'] ?? {}), ['import'], 'no CJS arm, no wildcard, no deep import');
});

cell('P-PUB-7', 'S-MANIFEST the publish configuration, the supplied fields and the three metadata fields that RESOLVE to the provenance source', async () => {
  // `§2.5` / `distribution.md §6.1`–`§6.2` / `PAR-PUB-6`, `PAR-PUB-9`–`PAR-PUB-15`: `publishConfig` is
  // `{ "access": "public" }`; **`repository` · `homepage` · `bugs` are PRESENT AND EACH RESOLVES TO THE
  // PROVENANCE'S OWN SOURCE REPOSITORY** — the `PUB-DD-7` reversal column's own clause, *"the three metadata
  // fields are written the moment a remote exists"*, read with the registry's `422` that supplies the
  // remote; `description` · `keywords` · `author` are SUPPLIED beside them.
  //
  // **⟶ RE-CUT 2026-10-11 BY THE METADATA-CELL PASS (`role_test_writer`): THE AS-FILED TITLE IS RE-EMITTED
  // HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER — *"`S-MANIFEST` the publish configuration, the
  // declared absent metadata and the supplied fields"* — TOGETHER WITH THE PROSE THAT STOOD BESIDE IT,
  // *"`repository` · `homepage` · `bugs` are DECLARED ABSENT rather than guessed"* AND THE THREE-LINE
  // ABSENCE LOOP THAT DRIVES IT BELOW.** **WHAT REPLACES THEM IS NOT A WIDENING OF THE CELL BUT THE SAME
  // PROPERTY READ AT THE TREE THE REGISTRY MADE NECESSARY: the census is the declared set and the values are
  // the resolved URLs, and BOTH are driven at the MAIN package AND at all FIVE platform manifests** —
  // because `PUB-DD-7`'s clause is a clause about the manifests rather than about one of them, and because
  // the `S-TAG` cell's own census (now twelve) is read against the same five.
  //
  // **AND `§5.7`'s REFUSAL IS KEPT AND MADE MEASURABLE RATHER THAN DELETED**: *"a
  // `repository`/`homepage`/`bugs` field naming a path that does not resolve"* is STILL a failure-list
  // member, and `PAR-PUB-13`–`15`'s *"a placeholder URL"* is STILL unmet by these values. **THE SCRATCH
  // CONTROL AT THE FOOT OF THIS CELL DRIVES THE SAME PREDICATE AGAINST A PLACEHOLDER SET AND REQUIRES IT TO
  // THROW**, so the good values above are asserted as RESOLVING rather than merely as PRESENT.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.deepEqual(manifest.publishConfig ?? null, { access: 'public' },
    '`PAR-PUB-9` / `A82`: the release is PUBLIC, and the field is what declares it');
  assert.equal(manifest.publishConfig?.registry, undefined, 'no registry override is declared');
  assert.equal(manifest.engines?.node, '>=18.0.0', '`PAR-PUB-6`: the declared floor, and no ABI floor');
  // **THE THREE FIELDS, PRESENT AND RESOLVING — the main package and the five platform artefacts, read
  // through ONE predicate so the six cannot be right five times and wrong once.** The platform manifests'
  // declared set is the twelve the `S-TAG` cell asserts; the main package's is its own and is read at its own
  // keys below.
  assertMetadataResolvesToProvenance(
    [{ label: 'the main package (`bindings/js/package.json`)', manifest }],
    MAIN_MANIFEST_FIELDS,
  );
  const platformManifests = readdirSync(join(PKG_DIR, 'platforms')).sort().map((label) => ({
    label,
    manifest: JSON.parse(readFileSync(join(PKG_DIR, 'platforms', label, 'package.json'), 'utf8')),
  }));
  assert.equal(platformManifests.length, 5, 'the five platform artefacts are the five manifests read here');
  assertMetadataResolvesToProvenance(platformManifests, PLATFORM_MANIFEST_FIELDS);
  // **THE REFUSAL, DRIVEN — `§5.7` / `PAR-PUB-13`–`15`: a field naming a path that does not resolve is a
  // FINDING, and this is what makes the assertions above non-vacuous.** The control is a SCRATCH manifest
  // object and never a byte under the repository.
  assert.throws(
    () => assertMetadataResolvesToProvenance(
      [{ label: 'a scratch manifest whose three fields name a path that does not resolve', manifest: SCRATCH_UNRESOLVING_METADATA }],
      Object.keys(SCRATCH_UNRESOLVING_METADATA).sort(),
    ),
    /repository\.url.*resolves to the provenance's own source repository/s,
    '`§5.7` / `PAR-PUB-13`–`15`: an unresolving `repository.url` — and a PLACEHOLDER URL — IS REFUSED, so the '
    + 'shipped values above are read as resolving rather than as present',
  );
  assert.equal(typeof manifest.description, 'string', '`PAR-PUB-10`: a description is supplied');
  assert.ok((manifest.description ?? '').length > 40, 'a LONG description, naming the unit and the deliverable');
  assert.ok(Array.isArray(manifest.keywords) && manifest.keywords.length > 0, '`PAR-PUB-11`: keywords are supplied');
  assert.ok(typeof manifest.author === 'string' && manifest.author.length > 0, '`PAR-PUB-12`: an author is supplied');
});

cell('P-PUB-7', 'S-MANIFEST no secret, token or credential is written into a tracked byte', async () => {
  // `§2.5` item 4 / `PUB-DD-7`: NO SECRET, TOKEN, CREDENTIAL OR REGISTRY AUTH MATERIAL is written into any
  // tracked byte of this unit. A conservative sweep over the package's own authored bytes.
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (entry.name !== 'publish.test.mjs') acc.push(full);
    }
    return acc;
  };
  const patterns = [/_authToken/i, /npm_[A-Za-z0-9]{20,}/, /gh[pousr]_[A-Za-z0-9]{20,}/, /BEGIN [A-Z ]*PRIVATE KEY/];
  for (const file of walk(PKG_DIR)) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of patterns) {
      assert.ok(!pattern.test(text), `no secret material in ${file} (matched ${pattern})`);
    }
  }
});

// ---------------------------------------------------------------------------------------------
// §5.8 P-PUB-8 — THE TAGGED ARTEFACT AND ITS EVIDENCE (`§3.1`–`§3.4`, `release.md`, `§4.2`–`§4.4`)
// ---------------------------------------------------------------------------------------------
// STATES: a publish from a tag · a publish from a branch HEAD · a figure with its site and its layer · a
//   figure without them · a partial publish with a declared arm · a partial publish with none · the
//   six-artefact order · the version coupling · the workflow file and the five manifests
// FAIL-STATES: a publish from a branch · a figure without its site or its layer · an install-time figure
//   claimed as an `APP`-green · a partial publish with no declared arm · a platform artefact published
//   after the main package · a platform artefact at a version other than the main package's · a
//   released-bytes digest claimed as measured by a pre-release pass · a pass publishing, packing, tagging
//   or installing (`contract.md §5.8`)

cell('P-PUB-8', 'S-TAG no publish verb is declared by any tracked byte of the package', async () => {
  // `§3.4` item 1 / `§3.3` / `PAR-PUB-27`: NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS, and a
  // publish step driven by a script no tracked file declares is refused. The observable is the ABSENCE of
  // a publish verb today, which the `Q3` workflow file must also satisfy.
  //
  // **⟶ RECONCILED BY THE PRE-TAG PASS (`role_test_writer`): THE AS-FILED CLAUSE OF THAT SENTENCE IS
  // RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER — *"The observable is the ABSENCE of a
  // publish verb today, which the `Q3` workflow file must also satisfy"*.** **IT IS STALE, AND THE DIRECTION
  // IT IS STALE IN MATTERS: the workflow file now EXISTS (`release.md §1.1` item `1`'s own reconciliation)
  // and it CARRIES the release's publish steps — `npm publish` at step `4` for each platform artefact and
  // at step `5` for the main package — because publishing is what a release workflow is for.** **WHAT
  // `§4.1` ITEM `1` FORBIDS IS A PASS EXECUTING ONE, NOT THE FILE'S DECLARATION OF IT** (*"NO PASS OF THIS
  // UNIT PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS"* — the workflow's own header prints the same reading),
  // **and what `§3.3` forbids is a PUBLISH VERB THE PACKAGE ITSELF AUTHORS**, which is what this cell drives
  // and what its own subject — *"any tracked byte of the package"* — means: the package is `bindings/js`,
  // the workflow is not one of its bytes, and `files` does not carry it. **THE VERB'S HOME IS THE DRIVE
  // BELOW AND NOT THE FILE'S EXISTENCE**, and the same prohibition is driven with a measured control in the
  // `S-TAG` cell that reads the workflow's own bytes (`drivePackagePublishVerbs`).
  //
  // **⟶ RE-CUT 2026-10-11 BY THE STAGED-VERB RE-CUT PASS (`role_test_writer`): THE SENTENCE ABOVE THAT NAMES
  // THE PUBLISH VERB IS RE-EMITTED HERE VERBATIM, SO `git diff` HAS NOTHING TO RECOVER, AND THEN RE-READ.**
  // **AS FILED IT READ** *"and it CARRIES the release's publish steps — `npm publish` at step `4` for each
  // platform artefact and at step `5` for the main package — because publishing is what a release workflow is
  // for"*. **THE SAME VERB, AND THEREFORE THE SAME STALENESS: BOTH SITES NOW READ `npm stage publish`, at each
  // of the two steps, and the reason is again the registry's rather than ours** — **the trusted-publisher grant
  // configured for these names is scoped to STAGE PUBLISH, so a direct `npm publish` is refused at
  // `403 · OIDC permission denied for this action` while the OIDC exchange and the provenance attestation both
  // succeed** (`release.md §1.5` item `1`; `§6.7`). **AND NOTHING ELSE IN THAT SENTENCE MOVES, STATED SO THE
  // RE-CUT IS NOT READ AS A WIDENING: the file still CARRIES the release's publish steps, at step `4` and at
  // step `5`, in that order — and the prohibition THIS CELL drives is the one on a PASS EXECUTING ONE, which
  // the staged verb does not touch** (`§4.1` item `1`; the `S-TAG` cell below drives both sites at their own
  // bytes, and drives the ORDER of the two sites independently of either verb).
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const scripts = manifest.scripts ?? {};
  for (const [name, body] of Object.entries(scripts)) {
    // **⟶ WIDENED 2026-10-11 BY THE PROHIBITION-GAP PASS (`role_test_writer`): THE ASSERTION THAT STOOD HERE
    // IS RE-EMITTED VERBATIM, SO `git diff` HAS NOTHING TO RECOVER, AND THEN WIDENED.** **AS FILED IT READ**
    // *"`assert.ok(!/npm publish|pnpm publish|yarn publish|npm pack|git tag|npm install -g/.test(String(body)),`
    // **`` `the script \`${name}\` carries no publish, pack, tag or install verb` `` `)`"* — **AND IT DID NOT
    // MATCH `npm stage publish`, because `stage ` sits between `npm` and `publish`, so a package `scripts`
    // entry carrying the STAGED verb passed this drive.** **THE SHAPE IS NOW THE MODULE-LEVEL
    // `REFUSED_REGISTRY_VERB`, ONE SUBJECT WITH ONE HOME, SO NO OCCURRENCE OF THIS LIST CAN DRIFT FROM
    // ANOTHER AND THE NEXT VERB CHANGE IS WIDENED ONCE AND NOT THREE TIMES.** **THE MESSAGE NAMES THE STAGED
    // FORM BESIDE THE DIRECT ONE AND LOSES NO BYTE OF THE AS-FILED SENTENCE** (`release.md §4.1` item `1`;
    // `§1.5` item `1`; `§2.1` item `1`).
    assert.ok(!REFUSED_REGISTRY_VERB.test(String(body)),
      `the script \`${name}\` carries no publish, pack, tag or install verb — DIRECT or STAGED, and any `
      + 'spelling that reaches a registry with this package\'s own content');
  }
  assert.equal(scripts.publish, undefined, 'no `publish` script exists');
  // **THE `publishConfig` FIELD'S OWN CLAIM, STATED NO WIDER THAN THE FIELD CARRIES** (`PUB-R-9`): the field
  // declares the release's ACCESS — a scoped platform name defaults to private, so `{ "access": "public" }`
  // is what makes the five resolvable by the main package's install (`distribution.md §3.2` item 9;
  // `PAR-PUB-9`). **IT DOES NOT DECLARE A REGISTRY AND IT DOES NOT CARRY THE TAG COUPLING**: the coupling's
  // drive is `resolveTagVersion` below, and the field's absence here is read as *"no registry override"* and
  // as nothing more. The earlier comment claimed this field asserted the release's publicness *and* the
  // coupling; the field carries the first and cannot carry the second.
  assert.equal(manifest.publishConfig?.registry, undefined,
    '`PAR-PUB-9`: no registry override is declared — the field carries the access, not a registry');
  assert.equal(manifest.publishConfig?.access, 'public',
    '`PAR-PUB-9` / `A82`: what the field DOES declare is the release\'s public access');
  // **⟶ REPAIRED BY THE RED-SET REPAIR PASS (`PUB-RED-2`, `PUB-R-9`): THE TAG IS NOW RESOLVED, NOT COMPUTED.**
  // The shipped form asserted `tagRule.test(\`v${manifest.version}\`)` — a string BUILT IN THE TEST from the
  // manifest's own version — which holds for `0.1.0` because `0.1.0` is three dot-separated numbers and
  // therefore holds for EVERY version the manifest could carry. `§3.2` item 1 / `PAR-PUB-29` (*"version
  // EQUALS tag; no publication happens from an untagged commit"*) was asserted by nothing. The resolution
  // below reads `refs/tags/v<version>` IN THE REPOSITORY, so the coupling is a fact about this tree rather
  // than a fact about the regex, and the tag's own FORM is still asserted beside it.
  const resolution = resolveTagVersion(REPO_ROOT, manifest.version);
  const tagRule = /^v\d+\.\d+\.\d+$/;
  assert.ok(tagRule.test(`v${manifest.version}`), '`§3.2` item 1 / `PAR-PUB-29`: the tag\'s form is the version\'s');
  assert.ok(!tagRule.test('main') && !tagRule.test('HEAD'), '`§3.2` item 1: no publication from an untagged commit');
  // **⟶ RE-CUT 2026-10-11 BY THE TAG-STATE PASS (`role_test_writer`): THE TWO ASSERTIONS THAT STOOD BELOW
  // THIS LINE ARE RE-EMITTED HERE VERBATIM, SO `git diff` HAS NOTHING TO RECOVER, AND THEN REPLACED.** **AS
  // FILED THEY READ** *"`assert.equal(resolution.present, false, ...)` — `PAR-PUB-29` / `release.md §2.1`: this
  // tree is PRE-RELEASE, so `v${manifest.version}` resolves to NO tag — and that absence is the declared state
  // which makes 'no publication from an untagged commit' true of this CHECKOUT. A tag here would be a release
  // act, and no pass of this unit may perform one"*, **and** *"`assert.equal(resolution.listed, '', 'and no tag
  // of that name exists at all — the resolution's own return value is read rather than a boolean')`"*. **THE
  // STATE THEY DENIED IS THE STATE THE RELEASE ACT CREATED**: the tag exists, cut at the run's own trigger, and
  // the reading that denied it was a reading of the TREE'S DATE rather than of the CLAUSE the cell serves.
  // **THE PROPERTY IS COUPLING, NOT ABSENCE** — `release.md §2.1` item `2` reads *"THE MAIN PACKAGE'S `version`
  // IS THAT TAG'S VERSION"*, an EQUALITY between a tag and a manifest, and `parameter-semantics.md §4.5`
  // (`PAR-PUB-29`) states its second outside value as *"a tag whose version differs from the six manifests' →
  // REFUSED"*. **WHAT THIS CELL ASSERTS NOW, AT FOUR SITES AND ALL OF THEM MECHANICAL** (the drive is
  // `assertTagCoupling`, above): the repository's OWN `git tag --list` carries the tag `v${manifest.version}`;
  // every tag it carries has the declared form and a version EQUAL to the manifest's; the manifest AT that tag
  // declares the same version, character for character; and the tag's commit is a commit object lying on THIS
  // branch's own history. **AND THE MOVEMENT IS STRICTLY STRONGER THAN WHAT IT REPLACES, STATED SO IT IS NOT
  // READ AS A RELAXATION:** the as-filed reading holds for EVERY tree that carries no tag — a manifest naming
  // a version no tag could ever carry satisfied it — while this reading FAILS on that tree AND on a tree whose
  // tag and manifest DIVERGE. **AND THE PRE-RELEASE STATE IS NOT LOST: it is driven BY NAME as a fail-state in
  // the first control below**, where a scratch repository carrying no tag fails this same instrument.
  assert.equal(resolution.present, true,
    `\`PAR-PUB-29\` / \`release.md §2.1\` item 2: the manifest declares \`${manifest.version}\`, so `
    + `\`v${manifest.version}\` IS the tag the coupling fixes and it EXISTS in this repository — read from `
    + `\`git tag --list\` rather than composed in this file. (\`git tag --list\`: ${JSON.stringify(resolution.listed)})`);
  assert.equal(resolution.listed, `v${manifest.version}`,
    'and the resolution\'s own return value is read rather than a boolean');
  const coupling = assertTagCoupling(REPO_ROOT, { version: manifest.version, label: 'the shipped tree' });
  // ---------------------------------------------------------------------------------------------
  // THE MEASURED CONTROLS — ONE SCRATCH REPOSITORY PER CONTROL, OUTSIDE THIS ONE (`SCRATCH_ROOT`, the
  // harness's own temporary area; `PUB-R-5`: a drive that cannot fail is worse than none)
  // ---------------------------------------------------------------------------------------------
  /** **ONE SCRATCH GIT REPOSITORY, CARRYING THE MAIN MANIFEST AT `MAIN_MANIFEST_REL`'S OWN PATH**, one commit
   *  and the tag the caller names — so the SAME instrument above is driven against it, clause by clause. */
  const scratchRepo = (name, { manifestVersion, tagName }) => {
    const dir = mkdtempSync(join(SCRATCH_ROOT, `tagcoupling-${name}-`));
    mkdirSync(dirname(join(dir, MAIN_MANIFEST_REL)), { recursive: true });
    execFileSync('git', ['init', '--quiet', dir], { timeout: 30000 });
    execFileSync('git', ['-C', dir, 'config', 'user.email', 'redset@pubred.invalid'], { timeout: 30000 });
    execFileSync('git', ['-C', dir, 'config', 'user.name', 'pubred red set'], { timeout: 30000 });
    writeFileSync(join(dir, MAIN_MANIFEST_REL),
      JSON.stringify({ name: manifest.name, version: manifestVersion }, null, 2));
    execFileSync('git', ['-C', dir, 'add', MAIN_MANIFEST_REL], { timeout: 30000 });
    execFileSync('git', ['-C', dir, 'commit', '--quiet', '-m', 'the control\'s own manifest'], { timeout: 30000 });
    if (tagName !== null) execFileSync('git', ['-C', dir, 'tag', tagName], { timeout: 30000 });
    return dir;
  };
  const controlVerdict = (fn) => { try { fn(); return null; } catch (err) { return err; } };
  const controls = [
    // **THE STATE THE AS-FILED READING ASSERTED — AND IT IS A FAIL-STATE OF THE COUPLING, NOT A PASS.** A
    // repository carrying NO tag names no version at all, so nothing could be published from it (`§2.1` item 3).
    ['no tag at all (the as-filed pre-release state)',
      scratchRepo('untagged', { manifestVersion: manifest.version, tagName: null })],
    // **THE REQUIRED NON-VACUITY CONTROL: A TAG WHOSE VERSION DIFFERS FROM THE MANIFEST'S.** The tag's own name
    // IS the coupling's (`v${manifest.version}`), and the manifest AT that tag declares `9.9.9` — so the equality
    // the clause pins is broken by DIVERGENCE and by nothing else.
    ['a tag whose version differs from the manifest\'s',
      scratchRepo('divergent', { manifestVersion: '9.9.9', tagName: `v${manifest.version}` })],
    // **AND THE SAME DIVERGENCE READ AT THE OTHER SITE**: a tag whose NAME carries another version, beside a
    // manifest at the coupling's own version — the tag list is where `PAR-PUB-29` reads it.
    ['a tag naming another version',
      scratchRepo('othername', { manifestVersion: manifest.version, tagName: 'v9.9.9' })],
  ];
  // **AND ONE CONTROL FOR THE REACHABILITY CLAUSE: THE TAG'S COMMIT IS NOT ON THIS BRANCH'S OWN HISTORY.** The
  // tag is cut at the control's own commit and the scratch repository's `HEAD` then moves to an ORPHAN root, so
  // the tag still resolves — and names a commit this branch does not carry.
  const orphan = scratchRepo('orphan', { manifestVersion: manifest.version, tagName: `v${manifest.version}` });
  execFileSync('git', ['-C', orphan, 'checkout', '--quiet', '--orphan', 'elsewhere'], { timeout: 30000 });
  execFileSync('git', ['-C', orphan, 'commit', '--quiet', '--allow-empty', '-m',
    'a history the tag is not part of'], { timeout: 30000 });
  controls.push(['a tag outside this branch\'s history', orphan]);
  const measured = [];
  for (const [what, repo] of controls) {
    const verdict = controlVerdict(() => assertTagCoupling(repo, { version: manifest.version, label: `the control for ${what}` }));
    assert.ok(verdict !== null,
      `THE CONTROL MUST FAIL (${what}): the coupling instrument catches it, because a control that PASSES a `
      + 'property it disabled is a cell that cannot fail (`PUB-R-5`)');
    measured.push(`${what.padEnd(46)} → ${String(verdict.message).split('\n')[0].slice(0, 132)}`);
  }
  // **AND THE INSTRUMENT IS NOT A BLANKET THROWER: A SCRATCH REPOSITORY WHOSE TAG AND MANIFEST AGREE PASSES IT**,
  // so every failure above is attributable to the clause that control broke and not to the scratch tree itself.
  const agreeing = scratchRepo('agreeing', { manifestVersion: manifest.version, tagName: `v${manifest.version}` });
  const agreed = controlVerdict(() => assertTagCoupling(agreeing, { version: manifest.version, label: 'the agreeing control' }));
  assert.equal(agreed, null,
    'the same instrument PASSES a repository whose tag and manifest AGREE — so the four failures above name '
    + `the clauses they broke rather than the instrument's own strictness (${agreed === null ? '' : String(agreed.message).split('\n')[0]})`);
  assert.notEqual(assertTagCoupling(agreeing, { version: manifest.version, label: 'the agreeing control' }).commit, coupling.commit,
    'and the agreeing repository is a DIFFERENT repository: the tag the shipped tree carries is this tree\'s own');
  // **THE CONTROLS' MEASURED RESULTS, PRINTED SO THE RECORD CAN CITE THEM RATHER THAN THIS CELL'S INTENTION.**
  console.log(`\n[P-PUB-8/S-TAG] THE TAG COUPLING (\`release.md §2.1\` items 1–3; \`PAR-PUB-29\`), MEASURED AGAINST `
    + 'THE SHIPPED INSTRUMENT:\n  '
    + `${'the real tree'.padEnd(46)} → PASS (required): ${coupling.tag} at ${coupling.commit}, on this branch's `
    + `own history, the manifest at the tag declaring ${coupling.version}\n  ` + measured.join('\n  '));
});

cell('P-PUB-8', 'S-TAG the workflow file and the five platform manifests ARE the declared shapes, and the forbidden ones are absent', async () => {
  // `§3.1` item 1 / `PUB-DD-23` / `PAR-PUB-26`/`PAR-PUB-27`: the workflow file is
  // `/.github/workflows/publish.yml` and the five platform manifests' source paths are
  // `bindings/js/platforms/<label>/`, each carrying its own tracked `package.json` and NO binary. **THE
  // FILES ARE `Q3` DUTIES** (`§9` · `Q3-5`), so this drive asserts the DECLARED SHAPES and the ABSENCE of
  // the forbidden ones rather than a file that does not exist yet.
  //
  // **⟶ RECONCILED BY THE PRE-TAG PASS (`role_test_writer`): THIS CELL'S SUBJECT HAD MOVED, AND ITS
  // AS-FILED TITLE IS RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER — *"`S-TAG` the workflow
  // file and the five platform manifests are absent today"*.** **WHAT THE FORCE OF THAT TITLE WAS: the
  // workflow file and the five manifests were `Q3`'s DUTIES at this set's authorship, so the cell drove
  // their DECLARED SHAPES behind an `existsSync` guard and asserted, in its `else` arm, *"the workflow file
  // and the five manifests arrive together at `Q3-5`; neither exists yet in the shipped tree"*.** **WHAT THE
  // TREE NOW IS, AT ITS OWN BYTES: THE FILE EXISTS AND `.github/` EXISTS WITH IT — `.github/workflows/
  // publish.yml`, `208` lines** (`docs/specs/storeroom-publish/release.md` `§1.1` item `1`'s own
  // reconciliation at the foot of that part: *"THE OPERATIVE STATE … THE FILE EXISTS"*), **so that `else`
  // arm could no longer be reached and would have asserted the opposite of the tree had it been.** **THE
  // EXISTENCE OF THE FILE MAKES NO STEP OF IT A PASS'S ACT — no pass and no runner of this repository
  // executes it, which is `§4.1` item `1`'s own property, and the tag that would trigger it is the
  // ARCHITECT'S (`release.md §1.3` item `1`) — and this cell therefore RUNS NOTHING of it**: it reads the
  // file's own bytes and drives the clauses `release.md §1.1`–`§1.4` declares, together with the ABSENCE of
  // the four shapes `§1.4`'s closing prohibition, `§2.1` item `3` and `§2.2` item `4` FORBID. **THE DRIVE IS
  // AN INSTRUMENT AND IT IS MEASURED AGAINST CONTROLS**: `4` scratch copies of the file, each breaking one
  // declared clause, together with one scratch copy of the package manifest carrying a publish script.
  const workflow = join(REPO_ROOT, '.github', 'workflows', 'publish.yml');
  const platformsDir = join(PKG_DIR, 'platforms');
  const declaredLabels = COVERED.map((k) => k.label);
  assert.equal(declaredLabels.length, 5, '`distribution.md §3.1`: five platform manifests, one per label');
  assert.deepEqual(declaredLabels, ['linux-x64', 'linux-arm64', 'darwin-x64', 'darwin-arm64', 'win32-x64'],
    'the declared labels, name for name');
  // **THE DECLARED SHAPES ARE LANDED TEXT, AND THEIR ABSENCE IS NOW THE FINDING** (`release.md §1.1`
  // item `1`'s reconciliation; `§9`'s `Q3-5`, whose `DONE` row records the landing). **THE TWO GUARDS THIS
  // CELL CARRIED ARE RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER — `if
  // (existsSync(platformsDir)) {` around the manifest walk, and `if (existsSync(workflow)) {` around the
  // read of the file's own bytes — AND BOTH ARE REMOVED, BECAUSE A GUARD THAT SILENTLY SKIPS IS A CELL THAT
  // CANNOT FAIL**: deleting the workflow file or a platform directory must go red here rather than make
  // this drive vacuous. **THE ASSERTIONS EACH GUARD WRAPPED STAND INSIDE THEM, UNCHANGED AND UNGUARDED.**
  assert.equal(existsSync(workflow), true,
    '`release.md §1.1` item 1: the workflow file is landed text at `/.github/workflows/publish.yml` — its '
    + 'ABSENCE was `Q3`\'s state and is no longer the tree\'s');
  assert.equal(existsSync(platformsDir), true,
    '`release.md §1.4` step 2 / `distribution.md §3.1`: the five platform manifests\' source directory exists');
  {
    const present = readdirSync(platformsDir).filter((n) => statSync(join(platformsDir, n)).isDirectory());
    for (const label of present) {
      assert.ok(declaredLabels.includes(label), `a sixth platform directory is a FINDING: ${label}`);
      const manifestPath = join(platformsDir, label, 'package.json');
      assert.ok(existsSync(manifestPath), `${label} carries its own tracked package.json`);
      const m = JSON.parse(readFileSync(manifestPath, 'utf8'));
      // **⟶ RE-CUT 2026-10-11 BY THE METADATA-CELL PASS (`role_test_writer`): THE DECLARED SET IS TWELVE,
      // NOT NINE, AND THE CENSUS GROWS RATHER THAN THE ASSERTION LOOSENING.**
      //
      // **AS FILED, AND RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER, THE ASSERTION READ:**
      // *"`assert.deepEqual(Object.keys(m).sort(), ['cpu', 'engines', 'files', 'license', 'main', 'name',
      // 'os', 'publishConfig', 'version'].sort(), \`${label}: the nine declared fields and no field not
      // declared\`)`"*.
      //
      // **WHAT THE EXTENSION IS FOR, NAMED FIELD BY FIELD: `homepage`, `repository` and `bugs`** — the three
      // `PUB-DD-7` writes, at that row's OWN REVERSAL COLUMN: *"the three metadata fields are written the
      // moment a remote exists"*. **THE FIVE PLATFORM ARTEFACTS ARE ACCEPTED BY THE SAME REGISTRY AS THE MAIN
      // PACKAGE, SO THE SAME VERIFICATION READS THEIR `repository.url` AGAINST THE PROVENANCE: the staged run
      // was refused `422` — *"Failed to validate repository information: package.json: `repository.url` is
      // `""`, expected to match `https://github.com/LittleKingsguard/Provident-Storeroom` from provenance"* —
      // and that refusal is a fact about THE MANIFEST THE REGISTRY READS, whichever of the six it is** (`§0.3`
      // · `PUB-DD-7`; `release.md §6.7`; `PUB-DD-30`).
      //
      // **AND WHY THE CENSUS MUST GROW RATHER THAN THE ASSERTION LOOSEN: THIS CELL'S PROPERTY IS *"the
      // manifests carry EXACTLY the declared field set and NO MORE"*, which is a TWO-DIRECTIONAL equality.**
      // A `deepEqual` against a set that OMITS the three would have to become a `subset`-shaped or
      // `includes`-shaped check — and then a manifest could carry the three fields, carry a SEVENTH field no
      // clause declares, or carry a field spelled to look declared, and this cell would answer PASS. **THE
      // CENSUS IS THEREFORE RE-MEASURED AT THE DECLARED SET'S NEW SIZE, AND THE VALUES ARE ASSERTED BESIDE IT
      // (`assertMetadataResolvesToProvenance`) SO THAT "declared" MEANS "DECLARED WITH THE REMOTE THE
      // REGISTRY NAMED" AND NOT MERELY "PRESENT".**
      assert.deepEqual(Object.keys(m).sort(), [...PLATFORM_MANIFEST_FIELDS].sort(),
        `${label}: the TWELVE declared fields and no field not declared — the nine the platform artefact `
        + 'always carried, PLUS `homepage` · `repository` · `bugs`, the three `PUB-DD-7` writes "the moment a '
        + 'remote exists" (the registry\'s `422` is the remote), asserted as an EXACT set equality in both '
        + 'directions so the census grows rather than the assertion loosening');
      assertMetadataResolvesToProvenance([{ label, manifest: m }], PLATFORM_MANIFEST_FIELDS);
      assert.equal(m.license, 'AGPL-3.0', '`PAR-PUB-22`: the platform manifest\'s own field reads `AGPL-3.0`');
      assert.deepEqual(m.publishConfig, { access: 'public' }, '`PAR-PUB-24`: a scoped name is private by default');
      // **⟶ REPAIRED BY THE RED-SET REPAIR PASS (`PUB-RED-2`, `PUB-R-1`): THIS CELL REQUIRED THE OMISSION
      // THE CONTRACT REFUSES, AND THEREBY ASSERTED THE OPPOSITE OF THE CLAUSE IT SERVES.** The shipped form
      // read `assert.ok(!(m.files ?? []).some((f) => f.endsWith('.node')), 'no binary is committed inside a
      // platform directory')` — it took the `.node`'s ABSENCE FROM THE MANIFEST'S `files` as the observable
      // of *"no binary is committed"*, while `PAR-PUB-21` and `distribution.md §3.2` item 5 carry the exact
      // opposite requirement (*"the artefact's own allowlist carries ITS `.node` … an allowlist omitting the
      // `.node` → REFUSED: rung one could not load it"*). **THE TWO CLAIMS ARE DIFFERENT AND BOTH ARE TRUE,
      // AND THEY LIVE AT DIFFERENT HOMES**: what `files` must CARRY is the artefact's own published content
      // (`§3.2` field 5 — the manifest that travels in the tarball), while what must NOT be committed is a
      // BINARY IN THE TRACKED TREE (`§3.1`'s prohibition; `PAR-PUB-26`). The cell therefore asserts each at
      // its own home: the allowlist CARRIES the `.node` at the one path its own `main` names, the licence
      // copy travels beside it, and no tracked byte under `platforms/` is a `.node` at all.
      assert.deepEqual(m.files, ['storeroom_js_binding.node', 'LICENSE', 'README.md'],
        '`PAR-PUB-21` / `distribution.md §3.2` item 5: the artefact\'s allowlist CARRIES its own `.node` and '
        + 'its licence copy — an allowlist omitting the `.node` cannot be loaded by rung one');
      assert.equal(m.main, 'storeroom_js_binding.node',
        '`§3.2` item 6: the `.node`\'s exposed path is the artefact\'s own package root, and `main` names it');
      assert.ok(m.files.some((f) => f.endsWith('.node')), 'the allowlist carries a `.node`');
      assert.equal(m.files.includes('LICENSE'), true,
        '`§3.2` item 5 / `§4.2` item 1: the artefact ships no notice without its licence copy');
      assert.equal(m.optionalDependencies, undefined,
        '`distribution.md §3.3`: NO `optionalDependencies` field is declared on any platform artefact');
      assert.ok(!/musl/.test(JSON.stringify(m)), '`PAR-PUB-19`/`20`: no `libc` token in `os` or `cpu`');
      // **⟶ ADDED BY THE RED-SET REPAIR PASS (`PUB-RED-2`, `PUB-R-10`, `NG-PUB-H`): THE FIVE MANIFESTS'
      // `os`/`cpu` ARE READ AGAINST THE PAIR EACH ONE'S OWN `name` SPELLS.** No drive in the `61` or in the
      // `241` compared the two halves of one artefact before this cell existed, so a copy-paste of
      // `linux-x64`'s `os` into `darwin-arm64` — or a `cpu` that names the architecture the artefact was NOT
      // built for — was invisible to every cell of the unit. **THE PROPERTY IS THE `§3.2` FIELD PAIR AGAINST
      // THE NAME, AND IT IS NOT THE LOADER'S KEY** (`PAR-PUB-19`/`PAR-PUB-20`: *"the pair is an INSTALL-SKIP
      // FILTER and NOT the loader's key"*; `resolution.md §4.1`), which is why it is read HERE, at the
      // manifest, and never through `process.platform`.
      const [spelledTarget, spelledArch] = label.split('-');
      assert.deepEqual(m.os, [spelledTarget],
        `\`PAR-PUB-19\`: ${label}'s \`os\` must be the operating system its own \`name\` SPELLS, and not another target's`);
      assert.deepEqual(m.cpu, [spelledArch],
        `\`PAR-PUB-20\`: ${label}'s \`cpu\` must be the architecture its own \`name\` SPELLS`);
      assert.equal(m.name, FIVE_NAMES[COVERED.findIndex((k) => k.label === label)],
        `${label}: \`§3.2\` item 1 — the manifest's own \`name\` is the declared spelling, so the pair read above `
        + 'belongs to THIS artefact and to no other');
    }
    for (const label of declaredLabels) {
      assert.ok(present.includes(label), `the declared label ${label} has its own manifest`);
    }
    // **AND THE CLAIM THE SHIPPED CELL WAS REACHING FOR IS STILL ASSERTED — AT THE HOME WHERE IT IS TRUE.**
    // `distribution.md §3.1`: *"NO BINARY IS EVER COMMITTED TO THE TRACKED TREE, so each platform directory
    // carries its manifest and nothing that a build produces"*. The observable of THAT claim is the tracked
    // tree, not the manifest's `files`: a `.node` the tree carries is what `§3.1` forbids, and this walk reads
    // the tree itself rather than a field that declares what a tarball will contain.
    const committedBinaries = (() => {
      const walk = (dir, acc = []) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
          if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
          const full = join(dir, entry.name);
          if (entry.isDirectory()) walk(full, acc);
          else if (entry.name.endsWith('.node')) acc.push(full);
        }
        return acc;
      };
      return walk(platformsDir);
    })();
    assert.deepEqual(committedBinaries, [],
      '`distribution.md §3.1` / `PAR-PUB-26`: NO BINARY IS EVER COMMITTED to the tracked tree — the five '
      + 'platform directories carry their manifests and the licence copies `Q3-5` assembles, and no `.node`');
  }
  // **THE AS-FILED `else` ARM IS RE-EMITTED HERE VERBATIM AND DISPOSED OF — *"the workflow file and the five
  // manifests arrive together at `Q3-5`; neither exists yet in the shipped tree"*.** **IT IS DELETED AS AN
  // ASSERTION AND KEPT AS A READING**, because its operands now exist and an `existsSync`-conjunction would
  // hold for two absences and for two presences alike: it asserted nothing about the file, and today it
  // would assert the opposite of the tree. **THE CLAIM IT REACHED FOR — that the CI's duty is landed and
  // coupled to the five manifests — IS DRIVEN BELOW AT THE FILE'S OWN BYTES.**
  // the forbidden shapes, in the package's own bytes whatever `Q3` lands
  assert.ok(!existsSync(join(PKG_DIR, 'platforms', '.node')), 'no binary in the platforms directory');

  // ---------------------------------------------------------------------------------------------
  // THE WORKFLOW'S OWN DRIVE — `release.md §1.1`–`§1.4` DECLARED, AND THE FORBIDDEN SHAPES ABSENT
  // ---------------------------------------------------------------------------------------------
  const wfBytes = readFileSync(workflow, 'utf8');
  /** **THE NON-COMMENT BYTES OF ONE TOP-LEVEL YAML KEY, TO THE NEXT TOP-LEVEL KEY.** A commented-out
   *  trigger is not a trigger: the file's own prose prints `branches:`, `pull_request:` and
   *  `workflow_dispatch:` as the forms it REFUSES, so every drive below reads the code and never the
   *  commentary — otherwise the prohibition would fire on the file's own declaration of it. */
  const blockOf = (text, key) => {
    const lines = text.split('\n');
    const at = lines.findIndex((l) => l === `${key}:`);
    assert.ok(at !== -1, `\`release.md §1\`: the workflow declares \`${key}:\` at its own top level`);
    let end = lines.length;
    for (let i = at + 1; i < lines.length; i += 1) {
      if (/^[A-Za-z_][A-Za-z0-9_-]*:/.test(lines[i])) { end = i; break; }
    }
    return lines.slice(at + 1, end);
  };
  // ===============================================================================================
  // **⟶ THE RUNNER-LABEL GUARD, ADDED 2026-10-11 BY THE RUNNER-LABEL PASS (`role_test_writer`), BECAUSE
  // THIS CLASS HAS NOW BITTEN TWICE.** The first run's **build matrix declared links it never could
  // build**; this run's **runner label named an image its host had retired**, and the `darwin-x64` leg
  // stood `8h 35m` in a queue that will never be served while every other leg went green. **BOTH ARE *A
  // CONFIGURATION CLAIMING A PLATFORM THE WORLD NO LONGER OFFERS*, AND NEITHER WAS A RED CELL — one
  // printed nothing and the other printed a queue. THE NEXT DRIFT IS A RED CELL.**
  // **THE SUBJECT IS THE FILE'S OWN LABEL SET AT EVERY `runs-on:` SITE** — the matrix job's
  // `runs-on: ${{ matrix.runner }}`, which resolves to the row's own `runner:`, AND every literal
  // `runs-on:` beside it, the main package's job among them — **READ AGAINST THE CONTRACT'S FIVE IN BOTH
  // DIRECTIONS: NO LABEL THE TABLE DOES NOT NAME (no more), AND NO MEMBER OF THE FIVE LEFT UNNAMED (no
  // fewer).** **AND THE ORDER OF THE CLAUSES IS DELIBERATE: the row-set's DISTINCTNESS is read before the
  // row table, so a leg served by ANOTHER leg's image is credited to *"NO RUNNER SERVES TWO"* while a
  // single drifted label is credited to the row-for-row table — two defences told apart rather than one
  // credited with the other's catch** (`release.md §1.2`; `parameter-semantics.md §4.4` · `PAR-PUB-28`:
  // a cross-compiled artefact is *"a build this matrix did not perform"*).
  const driveRunnerCensus = (text, { label }) => {
    const declaredImages = FIVE_RUNNERS.map((r) => r.runner);
    const declaredRows = FIVE_RUNNERS.map((r) => [r.label, r.target]);
    assert.equal(new Set(declaredImages).size, 5,
      `${label}: \`§1.2\`'s table is FIVE DISTINCT RUNNERS, so the guard below has a five-member yardstick `
      + `to read the file against: ${JSON.stringify(declaredImages)}`);
    // (·) THE MATRIX JOB'S OWN `runs-on:`, WHICH IS THE ROW'S OWN `runner:` — one site, and the matrix is why.
    const matrixSites = (text.match(/^[ \t]*runs-on:[ \t]*\$\{\{[ \t]*matrix\.runner[ \t]*\}\}[ \t]*$/gm) ?? []).length;
    assert.equal(matrixSites, 1,
      `${label}: exactly ONE \`runs-on: \${{ matrix.runner }}\` is declared, so the five \`runner:\` values `
      + `read below are what the five legs ask their host for (${matrixSites} found)`);
    // (·) THE FILE'S OWN FIVE MATRIX ROWS — label, runner and target, read from its own bytes.
    const rowsRead = [...text.matchAll(/-\s*label:\s*(\S+)\s*\n\s*name:\s*'([^']+)'\s*\n\s*runner:\s*(\S+)\s*\n\s*target:\s*(\S+)/g)]
      .map((m) => ({ label: m[1], name: m[2], runner: m[3], target: m[4] }));
    assert.equal(rowsRead.length, 5,
      `${label}: the file's own five matrix rows were really read (${rowsRead.length}), so no clause below `
      + 'is vacuous');
    // (·) **NO RUNNER SERVES TWO** — read FIRST, so the distinctness rule has its own verdict.
    const rowImages = rowsRead.map((r) => r.runner);
    const doubled = [...new Set(rowImages.filter((v, i) => rowImages.indexOf(v) !== i))];
    assert.equal(doubled.length, 0,
      `${label}: \`§1.2\` / \`PAR-PUB-28\` — NO RUNNER SERVES TWO: the five rows are FIVE DISTINCT IMAGES, and `
      + `this file serves a target with another target's image: ${JSON.stringify(doubled)}. \`macos-15\` and `
      + '`macos-15-intel` are DIFFERENT images serving DIFFERENT architectures, and a cross-compiled artefact '
      + 'would be "a build this matrix did not perform"');
    // (·) **AND THE FIVE ROWS' RUNNERS ARE THE CONTRACT'S FIVE, ROW FOR ROW** — exact tokens, never substrings.
    assert.deepEqual(rowImages, declaredImages,
      `${label}: \`§1.2\`'s five-runner table, row for row — the file's own rows being ${JSON.stringify(rowImages)} `
      + `against the contract's ${JSON.stringify(declaredImages)}`);
    // (·) **AND EACH ROW'S `target` IS THE TARGET ITS OWN LABEL NAMES**, so the image that builds a leg and
    // the artefact that leg publishes are one target and not two (`distribution.md §3`'s own table).
    const rowsTargets = rowsRead.map((r) => [r.label, r.target]);
    assert.deepEqual(rowsTargets, declaredRows,
      `${label}: each row's \`target\` is the target its own label names — read as ${JSON.stringify(rowsTargets)} `
      + `against ${JSON.stringify(declaredRows)}, so no row carries one target's runner beside another target's build`);
    // (·) **NO MORE** — every literal `runs-on:` site in the file, the main package's job among them.
    const literalSites = [...text.matchAll(/^[ \t]*runs-on:[ \t]*(\S+)[ \t]*$/gm)]
      .map((m) => m[1]).filter((v) => !v.startsWith('${{'));
    assert.ok(literalSites.length >= 1,
      `${label}: the literal \`runs-on:\` sites beside the matrix exist and are read (${literalSites.length})`);
    const strangers = [...new Set(literalSites)].filter((v) => !declaredImages.includes(v));
    assert.equal(strangers.length, 0,
      `${label}: \`§1.2\` / \`PAR-PUB-28\` — NO \`runs-on:\` SITE NAMES AN IMAGE THE CONTRACT'S TABLE DOES NOT: `
      + `no more than the five. Strangers found: ${JSON.stringify(strangers)}`);
    // (·) **NO FEWER** — the file's own label set, matrix rows and literal sites together, is the five.
    const namedImages = [...new Set([...rowImages, ...literalSites])];
    const missing = declaredImages.filter((v) => !namedImages.includes(v));
    assert.equal(missing.length, 0,
      `${label}: AND NO MEMBER OF THE FIVE IS LEFT UNNAMED BY THE FILE — no fewer: ${JSON.stringify(missing)}`);
    assert.equal(namedImages.length, 5,
      `${label}: and the label set is EXACTLY FIVE IMAGES, not four and not six: ${JSON.stringify([...namedImages].sort())}`);
    return { matrixSites, literalSites, namedImages: [...namedImages].sort() };
  };
  /** **ONE INSTRUMENT, DRIVING THE SHIPPED FILE AND EVERY CONTROL ALIKE**, so a control measures the
   *  assertion that actually guards the tree and never a copy of it: it throws at the first clause broken. */
  const driveWorkflow = (text, { label }) => {
    const code = text.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n');
    // --- `§1.1` · `§2.1` items 1–3: THE TAG IS THE ONLY ROUTE, AND ITS FORM IS THE DECLARED ONE ---
    const onCode = blockOf(code, 'on').join('\n');
    // **THE TRIGGER'S OWN KEYS, READ AT THE TRIGGER BLOCK'S FIRST INDENT AND NOT AT EVERY DEPTH**: the tag
    // filter nests inside `push:` and is not itself a second trigger, so the census below is the set of
    // ROUTES to the registry and nothing else.
    const onKeys = onCode.match(/^\s+[A-Za-z_]+:/gm) ?? [];
    const onIndent = Math.min(...onKeys.map((k) => k.search(/\S/)));
    assert.deepEqual(onKeys.filter((k) => k.search(/\S/) === onIndent).map((k) => k.trim()),
      ['push:'],
      `${label}: \`release.md §2.1\` item 3 — the tag's own push is THE ONLY TRIGGER: a branch head, a pull `
      + 'request and a manual dispatch publish nothing because no such trigger is declared');
    assert.equal(/^\s+tags:\s*$/m.test(onCode), true, `${label}: the filter is the TAG's, not a branch's`);
    const tagPattern = (onCode.match(/-\s*'([^']*)'/) ?? [])[1];
    assert.equal(tagPattern, 'v[0-9]+.[0-9]+.[0-9]+',
      `${label}: \`§2.1\` item 1 — the tag's declared form is \`v<major>.<minor>.<patch>\``);
    const tagDomain = new RegExp(`^${tagPattern.replace(/\./g, '\\.')}$`);
    for (const lawful of ['v0.1.0', 'v1.22.333']) assert.ok(tagDomain.test(lawful), `${label}: ${lawful} triggers`);
    for (const untagged of ['main', 'HEAD', '0.1.0', 'v0.1', 'release/0.1.0']) {
      assert.ok(!tagDomain.test(untagged),
        `${label}: \`§2.1\` item 3 / \`PAR-PUB-29\` — \`${untagged}\` is NOT the tag's form, and NO PUBLICATION `
        + 'HAPPENS FROM AN UNTAGGED COMMIT');
    }
    for (const forbidden of ['branches', 'pull_request', 'workflow_dispatch', 'schedule']) {
      assert.equal(new RegExp(`^\\s*${forbidden}:`, 'm').test(onCode), false,
        `${label}: \`release.md §2.1\` item 3 — no \`${forbidden}\` trigger exists: publishing from the branch `
        + 'head on every merge is `§2.1` item 4\'s PRICED `alt` and is NOT taken');
    }
    // --- `§1.2`: ONE RUNNER PER TARGET, AND NO RUNNER SERVES TWO ---
    const jobs = blockOf(code, 'jobs').join('\n');
    const rows = [...jobs.matchAll(/-\s*label:\s*(\S+)\s*\n\s*name:\s*'([^']+)'\s*\n\s*runner:\s*(\S+)\s*\n\s*target:\s*(\S+)/g)]
      .map((m) => ({ label: m[1], name: m[2], runner: m[3], target: m[4] }));
    // **⟶ THE RUNNER-LABEL GUARD, DRIVEN AT THE HEAD OF THIS SECTION ON PURPOSE: a label the contract's
    // table does not name is caught FIRST by the census and only then by the row-for-row table below, so
    // the two defences are told apart rather than one being credited with the other's catch** (`§1.2`;
    // its own instrument is measured in both directions at the controls below).
    driveRunnerCensus(code, { label });
    // **⟶ RE-CUT 2026-10-11 BY THE RUNNER-LABEL PASS (`role_test_writer`): TWO RUNNER STRINGS MOVED AND
    // NOTHING ELSE DID.** **AS FILED, AND RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER,
    // THIS COMPARISON'S SECOND OPERAND WAS THE INLINE LITERAL** *"`[['linux-x64', 'ubuntu-24.04'],
    // ['linux-arm64', 'ubuntu-24.04-arm'], ['darwin-x64', 'macos-13'], ['darwin-arm64', 'macos-14'],
    // ['win32-x64', 'windows-2022']]`"* — **the whole of what moves is the two macOS entries, and the
    // table now stands ONCE, at `FIVE_RUNNERS` above, so the next one-line amendment is one line and not
    // three copies.** **THE ASSERTION IS THE SAME ASSERTION: same operator, same row order, same message,
    // byte for byte** — **only `darwin-x64`'s image (`macos-13` → `macos-15-intel`, the retired one moved
    // off) and `darwin-arm64`'s (`macos-14` → `macos-15`, the deprecated one moved off) are different;
    // `linux-x64`, `linux-arm64` and `win32-x64` DO NOT MOVE.** **AND THE TWO NEW IMAGES ARE STILL TWO
    // IMAGES: `macos-15-intel` is Intel x64 on macOS 15 and `macos-15` is Apple Silicon, so the five-leg
    // rule `PAR-PUB-28` states is untouched — the assertion above this one proves it, and so does the
    // census.** (`release.md §1.2` and its closing rule; `PUB-DD-7`.)
    assert.deepEqual(rows.map((r) => [r.label, r.runner]), FIVE_RUNNERS.map((r) => [r.label, r.runner]),
      `${label}: \`§1.2\`'s five-runner table, row for row — each runner builds ITS OWN target and no other, `
    + 'and `PAR-PUB-28`\'s runner names are the declared ones and not a token that merely contains one');
    assert.equal(new Set(rows.map((r) => r.runner)).size, 5,
      `${label}: \`§1.2\`: each runner builds its own target AND NO RUNNER SERVES TWO`);
    assert.deepEqual(rows.map((r) => r.name), FIVE_NAMES,
      `${label}: the five declared names, name for name — and neither the AS-FILED spelling \`@provident-storeroom\` nor the SUPERSEDED \`@auspicion/js-…\` form is among them`);
    // --- `§1.3` items 2–3 · `§1.4` step 6: THE HOST'S OIDC FEDERATION AND THE PROVENANCE SUBJECT ---
    const permissions = blockOf(code, 'permissions').join('\n');
    assert.equal(/^\s+contents:\s*read\s*$/m.test(permissions), true,
      `${label}: \`contents: read\` is the whole of the rest of the access`);
    assert.equal(/^\s+id-token:\s*write\s*$/m.test(permissions), true,
      `${label}: the host's OIDC federation — and NOT a credential written into this file`);
    // --- `§1.4`: THE SIX STEPS IN THE DECLARED ORDER, WITH STEP 5 LAST, ALWAYS ---
    const platformAt = jobs.search(/^\s+platform:\s*$/m);
    const mainAt = jobs.search(/^\s+main:\s*$/m);
    assert.ok(platformAt !== -1 && mainAt !== -1 && platformAt < mainAt,
      `${label}: the platform job and the main job are both declared, in the order the six steps declare`);
    const platformJob = jobs.slice(platformAt, mainAt);
    const mainJob = jobs.slice(mainAt);
    assert.equal(/needs:/.test(platformJob), false,
      `${label}: \`§1.4\` steps 1–2 — the platform job waits on NOTHING: it IS the matrix every other step `
      + 'depends on');
    assert.equal(/^\s+needs:\s*platform\s*$/m.test(mainJob), true,
      `${label}: \`§1.4\` step 5 — the main package carries \`needs: platform\`, so THE MAIN PACKAGE IS `
      + 'PUBLISHED LAST, ALWAYS, and its five exact pins are resolved before it lands');
    assert.equal(/^\s+needs:\s*main\s*$/m.test(jobs), false,
      `${label}: \`§2.2\` item 4 — A PLATFORM ARTEFACT PUBLISHED AFTER THE MAIN PACKAGE IS A FINDING: no job `
      + 'waits on the main package');
    const step4 = code.indexOf(`'4. publish the platform artefact'`);
    const step5 = code.indexOf(`'5. publish the main package'`);
    assert.ok(step4 !== -1 && step5 !== -1 && step4 < step5,
      `${label}: the declared order, step 4 before step 5 — the five platform artefacts land BEFORE the main package`);
    // **⟶ RE-CUT 2026-10-11 BY THE STAGED-VERB RE-CUT PASS (`role_test_writer`): THE TWO ASSERTIONS THAT STOOD
    // HERE ARE RE-EMITTED VERBATIM, SO `git diff` HAS NOTHING TO RECOVER, AND THEN REPLACED.** **AS FILED THEY
    // READ** *"`assert.equal(platformJob.includes('npm publish'), true, …)` — *"step 4 PUBLISHES THE FIVE
    // PLATFORM ARTEFACTS, at the tag's own version"*"* **and** *"`assert.equal(mainJob.includes('npm publish'),
    // true, …)` — *"step 5 publishes the main package, AFTER them and never before"*"*. **THEY AND THE STAGED
    // SITE ARE MUTUALLY EXCLUSIVE, AND NO WORKFLOW BYTE CAN SATISFY BOTH: `'npm publish'` IS NOT A SUBSTRING OF
    // `'npm stage publish'` — measured on THIS DRIVE'S OWN comment-stripped `code`, `indexOf` → `-1`,
    // `includes` → `false`, `/npm publish/` → `null` — so the cell was the stale half and not the file.**
    // **THE AUTHORITY IS `release.md §1.5` item `1`, landed in flight: *"`npm publish` IS REPLACED BY `npm stage
    // publish` AT BOTH SITES — the platform site and the main site — with `--access public` and `--provenance`
    // UNCHANGED beside it."*** **AND THE REPLACEMENT IS THE REGISTRY'S OWN SCOPE RATHER THAN A PREFERENCE: the
    // trusted-publisher grant configured for these names is scoped to STAGE PUBLISH, so a direct `npm publish`
    // is refused at `403 · OIDC permission denied for this action` WHILE the OIDC exchange and the provenance
    // attestation both succeed** (`§1.5` item `1`; `§1.5` item `2`: the promotion is the ARCHITECT'S act).
    //
    // **THE TWO HALVES OF THIS CELL ARE SEPARATED HERE, SO THAT THE NEXT VERB CHANGE ROTS ONE OF THEM AND NOT
    // THE PROPERTY:**
    //   · **THE COUPLING — VERB-FREE, AND THE HALF THAT CARRIES THIS CELL'S OWN SUBJECT** (*"the five platform
    //     artefacts are published before the main package, and the main package last"*). **Order is a fact about
    //     POSITION, so it is read at the two SITES' OFFSETS, at the JOB boundaries and at `needs: platform`
    //     above — never at a verb** (`release.md §1.5` item `4`; `§1.4` step `5`). **THIS HALF SURVIVES ANY VERB
    //     — direct, staged or promoted — because it names no verb at all.**
    //   · **THE LITERAL — the STAGED VERB ITSELF, at each site, with `--access public` and `--provenance` beside
    //     it.** **IT IS ASSERTED TOO, because the staged form is a DECLARED CHOICE and not a detail**: the
    //     registry's grant is scoped to it (`release.md §1.5` item `1`; `PUB-DD-31`). **IT IS THE HALF THAT
    //     WOULD HAVE TO BE RE-CUT IF THE VERB MOVES AGAIN, and nothing else here would.**
    const sites = [...code.matchAll(/npm stage publish/g)].map((m) => m.index);
    assert.equal(sites.length, 2,
      `${label}: \`release.md §1.5\` item 1 — EXACTLY TWO publish sites exist, the platform's and the main's, `
      + 'and no third route to the registry is declared');
    // (·) THE COUPLING, READ WITHOUT A VERB: the platform's site lies inside the platform job, the main's inside
    // the main job, and the platform job opens before the main job does — so the five land first and the main
    // package LAST, whatever the sites are told to run.
    const platformJobAt = code.search(/^\s+platform:\s*$/m);
    const mainJobAt = code.search(/^\s+main:\s*$/m);
    assert.ok(platformJobAt !== -1 && platformJobAt < sites[0] && sites[0] < mainJobAt && mainJobAt < sites[1],
      `${label}: \`release.md §1.5\` item 4 / \`§1.4\` step 5 — THE ORDER, READ WITHOUT A VERB: step 4's site is `
      + 'inside the platform job and step 5\'s inside the main job, so THE FIVE PLATFORM ARTEFACTS ARE '
      + 'PUBLISHED BEFORE THE MAIN PACKAGE AND THE MAIN PACKAGE IS PUBLISHED LAST, ALWAYS');
    // (·) THE LITERAL: the staged verb at each site, with the two declared flags unchanged beside it.
    const siteLine = (at) => code.slice(code.lastIndexOf('\n', at) + 1, code.indexOf('\n', at));
    for (const [who, at] of [['step 4', sites[0]], ['step 5', sites[1]]]) {
      const line = siteLine(at);
      assert.equal(line.includes('npm stage publish'), true,
        `${label}: ${who} carries the STAGED verb — \`release.md §1.5\` item 1's declared choice, and the one `
        + 'action the registry\'s trusted-publisher grant carries for these names');
      for (const flag of ['--access public', '--provenance']) {
        assert.equal(line.includes(flag), true,
          `${label}: ${who} carries \`${flag}\` UNCHANGED beside the staged verb (\`release.md §1.5\` item 1)`);
      }
    }
    // **AND THE DIRECT VERB IS DRIVEN ABSENT FROM THIS DRIVE'S OWN `code`** — the one byte sequence that would
    // mean a site had reverted to the action the grant refuses. **THE SUBJECT IS A DIFFERENT ONE FROM THE ORDER
    // AND IT IS KEPT BESIDE IT RATHER THAN FOLDED INTO IT.** **AND IT READS THE COMMENT-STRIPPED `code` AND NOT
    // THE RAW BYTES ON PURPOSE**: the file's own commentary NAMES the refused verb in order to refuse it, which
    // is a legitimate use of the word and not a publish site.
    assert.equal(code.includes('npm publish'), false,
      `${label}: NEITHER site carries the DIRECT verb — \`npm publish\` is not a substring of \`npm stage `
      + 'publish\', so a site reverted to the action the registry refuses is caught here');
    // **AND THE TWO CLEANUPS' OWN `if: always()`, WHICH THIS PASS FOUND UNASSERTED AND GUARDS RATHER THAN MERELY
    // NAMES** (`release.md §1.4` step 4's and step 5's closing halves; `distribution.md §3.1` item 2): the
    // assembled licence copy and `.node` leave the tracked tree after the publish WHATEVER ITS OUTCOME, and the
    // pack-time `LICENSE` copy leaves `bindings/js` likewise. **A CLEANUP THAT ONLY RAN ON SUCCESS WOULD LEAVE
    // A BUILT BYTE IN THE TRACKED TREE ON EXACTLY THE RUNS THAT NEEDED IT MOST.**
    assert.equal((code.match(/^\s+if:\s*always\(\)\s*$/gm) ?? []).length, 2,
      `${label}: \`§1.4\` steps 4-5's closing halves — BOTH cleanups carry \`if: always()\`, so they run whatever `
      + 'the publish\'s outcome, and a third would be a step this cell has not read');
    assert.equal(/uses:\s*actions\/attest-build-provenance@/.test(mainJob), true,
      `${label}: \`§1.4\` step 6 — ATTEST the provenance of the tagged commit's bytes`);
    assert.equal(/subject-path:\s*'bindings\/js\/index\.mjs'/.test(mainJob), true,
      `${label}: \`§1.3\` item 2 — the provenance subject is the TAGGED COMMIT OF THIS REPOSITORY, at the entry `
      + 'this package actually ships');
    // --- THE FORBIDDEN BYTES: NO SECRET, NO CREDENTIAL, AND THE SCOPE `A86` MOVED THE FIVE AWAY FROM ---
    for (const pattern of [/npm_[A-Za-z0-9]{20,}/, /secrets\.[A-Z_]+/, /BEGIN [A-Z ]*PRIVATE KEY/]) {
      assert.equal(pattern.test(code), false,
        `${label}: \`§3.1\` item 5 / \`release.md §1.4\`'s closing prohibition — no secret, token, credential `
        + `or OIDC subject claim is written into a tracked byte (${pattern})`);
    }
    assert.equal(code.includes('@provident-storeroom'), false,
      `${label}: the retired scope is written NOWHERE in the workflow, and the five matrix names carry \`@auspicion\``);
    // **⟶ ADDED BY THE `A88` PROJECT-TOKEN PASS: THE SUPERSEDED `@auspicion/js-…` SHAPE IS DRIVEN ABSENT
    // BESIDE THE RETIRED SCOPE.** `§14` item `9` moves the workflow's five `matrix.include[].name` fields
    // AND the comment naming the scope, so a stale matrix row or a stale comment fails at this home too and
    // not only at the name-for-name comparison above — **the substring is absent from the new spelling, whose
    // project token stands between the scope and the language marker** (`docs/specs/storeroom-publish-proposal.md`
    // `§14`; `A88`(a)).
    assert.equal(code.includes('@auspicion/js-'), false,
      `${label}: the SUPERSEDED \`@auspicion/js-…\` spelling is written NOWHERE in the workflow's own code, and `
      + 'the five matrix names carry the project token the ruling requires');
    return rows.length;
  };
  /** **THE PACKAGE'S OWN FORBIDDEN VERBS** (`§4.1` item 1; `§3.3`): a `publish` script, or any script whose
   *  body runs an `npm`/`pnpm`/`yarn` verb or `git tag`, would make the package — rather than the
   *  ARCHITECT'S tag — the release's trigger. */
  // **⟶ AND WIDENED 2026-10-11 BY THE PROHIBITION-GAP PASS (`role_test_writer`): THE VERB FAMILY THIS
  // DOCSTRING NAMES IS NOW THE PATTERN'S OWN SUBJECT.** **THE ASSERTION THAT STOOD IN THE WALK BELOW IS
  // RE-EMITTED VERBATIM IN ITS OWN COMMENT THERE AND THEN WIDENED; the docstring's own bytes stand unmoved
  // and are READ THROUGH the widening, which is why the walk now refuses the staged form of the same family
  // the docstring has always named** (`release.md §4.1` item `1`).
  const drivePackagePublishVerbs = (bytes, { label }) => {
    const manifest = JSON.parse(bytes);
    const scripts = manifest.scripts ?? {};
    assert.equal(scripts.publish, undefined, `${label}: no \`publish\` script exists`);
    for (const [name, body] of Object.entries(scripts)) {
      // **AS FILED THIS LINE READ** *"`assert.ok(!/npm publish|pnpm publish|yarn publish|npm pack|git tag|npm
      // install -g/.test(String(body)),` **`` `the script \`${name}\` carries no publish, pack, tag or
      // install verb` `` `)`"* — **THE SECOND OF THE TWO HOMES OF THE SAME LIST, AND THE ONE EVERY CONTROL
      // BELOW IS MEASURED AGAINST.** **IT IS THE SUBJECT MOVED ONCE MORE AND NOT A SECOND RULE.**
      assert.ok(!REFUSED_REGISTRY_VERB.test(String(body)),
        `${label}: the script \`${name}\` carries no publish, pack, tag or install verb — DIRECT or `
        + 'STAGED, and any spelling that reaches a registry with this package\'s own content');
    }
    return Object.keys(scripts).length;
  };
  // ---- (1) THE SHIPPED BYTES, WHICH THE DRIVES ABOVE MUST PASS ----
  assert.equal(driveWorkflow(wfBytes, { label: 'the shipped workflow' }), 5,
    'the five-runner matrix really was read, so the trigger, order, permissions and attestation drives above '
    + 'are not vacuous');
  drivePackagePublishVerbs(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'), { label: 'the package manifest' });
  // ---- (2) THE CONTROLS, EACH BREAKING ONE DECLARED CLAUSE AND EACH REQUIRED TO FAIL THE SAME INSTRUMENT ----
  const controlVerdict = (fn) => { try { fn(); return null; } catch (err) { return err; } };
  const wfControls = [
    // `§2.1` items 3–4: A PUBLISH FROM A NON-TAG TRIGGER — the branch head on every merge, priced and refused.
    ['a publish from a non-tag trigger', '    branches: [main]\n', (t) => t.replace(`    tags:\n`, `    tags:\n    branches: [main]\n`), 'branches'],
    // `§2.2` item 4: A PLATFORM ARTEFACT PUBLISHED AFTER THE MAIN PACKAGE.
    ['a platform artefact published after the main', '    needs: main\n', (t) => t.replace(`    name: \${{ matrix.label }}\n`, `    name: \${{ matrix.label }}\n    needs: main\n`), 'needs'],
    // `§1.4` step 5: THE MAIN PACKAGE PUBLISHED LAST — its `needs` is what makes the order the arm's precondition.
    // The control REMOVES the declaration; the marker is the adjacency the removal leaves behind, so it is a
    // byte sequence the shipped file does not carry.
    ['the main package published NOT last', '    name: provident-storeroom (last, always)\n    runs-on: ubuntu-24.04\n', (t) => t.replace(`    needs: platform\n`, ``), 'needs'],
    // `§1.4`'s closing prohibition: A CREDENTIAL WRITTEN INTO A TRACKED BYTE.
    ['a credential in a tracked byte', 'NPM_TOKEN', (t) => t.replace(`          ref: \${{ github.ref }}\n`, `          ref: \${{ github.ref }}\n          token: \${{ secrets.NPM_TOKEN }}\n`), 'secrets'],
    // **⟶ ADDED BY THE `A88` PROJECT-TOKEN PASS: A MATRIX ROW LEFT IN THE SUPERSEDED `@auspicion/js-…`
    // FORM** — the shape `§14` item `9` moves, and the clause this pass added above refuses. The control
    // rewrites ONE matrix `name:` back to the superseded spelling, so that clause is **MEASURED rather than
    // asserted**: the same instrument catches it, at the same home, and its verdict names the shape.
    ['a platform name left in the superseded form', "@auspicion/js-linux-x64-gnu",
      (t) => t.replace(`'@auspicion/provident-storeroom-js-linux-x64-gnu'`, `'@auspicion/js-linux-x64-gnu'`), '@auspicion/js-'],
    // **⟶ ADDED 2026-10-11 BY THE RUNNER-LABEL PASS: A RUNNER LABEL LEFT ON AN IMAGE THE CONTRACT'S TABLE
    // NO LONGER NAMES** — the drift `release.md §1.2`'s closing rule pre-authorizes the AMENDMENT for, and
    // the drift the census guard this pass added REFUSES. **THE CONTROL PUTS `darwin-x64` BACK ONTO
    // `macos-14`** (the image the previous pass left to the arm64 leg): ONE label changed, the five rows
    // still FIVE DISTINCT IMAGES, so nothing in the distinctness clause can catch it — **it is the census's
    // row-for-row table that must, and its verdict must NAME the label, which is how the guard is measured
    // rather than asserted.**
    ['a runner label the contract\'s table does not name', 'runner: macos-14',
      (t) => t.replace(`runner: macos-15-intel`, `runner: macos-14`), 'macos-14'],
  ];
  const wfVerdicts = [];
  for (const [what, injected, mutate, named] of wfControls) {
    const control = mutate(wfBytes);
    assert.ok(control !== wfBytes && control.includes(injected),
      `THE CONTROL REALLY BREAKS THE CLAUSE IT NAMES (${what}): \`${injected.trim()}\` is injected at the file's own bytes`);
    assert.equal(wfBytes.includes(injected), false,
      `and the shipped workflow carries no such byte, so the verdict below comes from the control and not from the tree`);
    const verdict = controlVerdict(() => driveWorkflow(control, { label: `the control for ${what}` }));
    assert.ok(verdict !== null, `THE CONTROL MUST FAIL (${what}): the instrument catches it`);
    assert.ok(verdict.message.includes(named) || verdict.message.includes(what),
      `and its verdict names what it caught: ${String(verdict.message).slice(0, 200)}`);
    wfVerdicts.push(`${what.padEnd(44)} → ${String(verdict.message).split('\n')[0].slice(0, 130)}`);
  }
  // ===============================================================================================
  // **⟶ THE RUNNER-LABEL GUARD'S OWN TWO DIRECTIONS, MEASURED — ADDED 2026-10-11 BY THE RUNNER-LABEL PASS**
  // (`release.md §1.2` AND ITS CLOSING RULE; `parameter-semantics.md §4.4` · `PAR-PUB-28`; `PUB-DD-7`).
  // **THE PROPERTY IS THE ONE THE TWO FAILED RUNS WERE MISSING: *A CONFIGURATION CLAIMING A PLATFORM THE
  // WORLD NO LONGER OFFERS* MUST BE A RED CELL AND NOT A QUEUE.** The first run's build matrix declared
  // links it never could build and printed nothing; this run's `darwin-x64` leg asked for `macos-13`, which
  // its host had RETIRED, and stood `8h 35m` waiting while every other leg went green
  // (`actions/runner-images#13046`); `macos-14` carries a deprecation badge with brownouts live and
  // retirement announced for `2026-11-02` (`actions/runner-images#13518`). **A control that cannot fail is
  // worse than none** (`PUB-R-5`), so the guard is driven in BOTH directions here and in the controls list
  // above, and the direction that must PASS is measured as well as the directions that must FAIL.
  const stripComments = (text) => text.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n');
  // ---- (A) THE SHIPPED FIVE PASS, AND IT IS THE CENSUS ITSELF THAT SAYS SO ----
  const shippedCensus = driveRunnerCensus(stripComments(wfBytes), { label: 'the shipped workflow, at the runner census' });
  assert.deepEqual(shippedCensus.namedImages, [...FIVE_RUNNERS.map((r) => r.runner)].sort(),
    `(A) THE SHIPPED WORKFLOW'S RUNNER LABELS ARE EXACTLY THE CONTRACT'S FIVE — no more and no fewer — and the `
    + `census really read them: ${JSON.stringify(shippedCensus.namedImages)}`);
  assert.equal(shippedCensus.matrixSites, 1,
    '(A) and the one matrix site is where the five row runners are asked for, so the five legs carry the table above');
  assert.deepEqual(shippedCensus.literalSites, ['ubuntu-24.04'],
    '(A) AND THE ONE LITERAL SITE BESIDE THE MATRIX IS THE MAIN PACKAGE\'S OWN JOB, WHICH NAMES `linux-x64`\'s '
    + 'image and therefore a member of the five: a sixth image there, or a label outside the table, is the drift below');
  // ---- (B) A SCRATCH COPY WITH ONE LABEL CHANGED FAILS ----
  const driftedBytes = wfBytes.replace('runner: macos-15-intel', 'runner: macos-14');
  assert.ok(driftedBytes !== wfBytes && driftedBytes.includes('runner: macos-14') && !driftedBytes.includes('runner: macos-15-intel'),
    '(B) THE CONTROL REALLY CHANGES ONE LABEL AND ONLY ONE: `darwin-x64` asks for `macos-14`, which the '
    + 'contract\'s table does not name, and the five rows remain five DISTINCT images — so the distinctness '
    + 'clause cannot be the one that catches it');
  assert.equal(wfBytes.includes('runner: macos-14'), false,
    'and the shipped file carries no such byte, so the verdict below comes from the control and not from the tree');
  const driftedVerdict = controlVerdict(() => driveRunnerCensus(stripComments(driftedBytes),
    { label: 'the control of one changed runner label' }));
  assert.ok(driftedVerdict !== null,
    '(B) THE ONE-CHANGED-LABEL CONTROL MUST FAIL: a cell that cannot fail is worse than none (`PUB-R-5`)');
  assert.ok(driftedVerdict.message.includes('macos-14'),
    `(B) AND ITS VERDICT NAMES THE DRIFTED LABEL, so the red cell says WHICH image drifted: ${String(driftedVerdict.message).split('\n')[0].slice(0, 200)}`);
  assert.ok(driftedVerdict.message.includes('five-runner table'),
    '(B) and it names the clause it read the file against, rather than the census having caught it by accident');
  const driftedInstrument = controlVerdict(() => driveWorkflow(driftedBytes, { label: 'the control of one changed runner label, at the shipped instrument' }));
  assert.ok(driftedInstrument !== null && driftedInstrument.message.includes('macos-14'),
    `(B) AND THE SHIPPED INSTRUMENT FAILS ON THE SAME COPY, naming the same label — the guard stands inside `
    + `\`driveWorkflow\` and not beside it: ${String(driftedInstrument?.message).split('\n')[0].slice(0, 200)}`);
  // ---- (C) AND THE OTHER SIDE OF "NO MORE": A SIXTH IMAGE AT A LITERAL SITE FAILS ----
  const sixthBytes = wfBytes.replace('    runs-on: ubuntu-24.04\n', '    runs-on: ubuntu-24.04\n    runs-on: ubuntu-22.04\n');
  assert.ok(sixthBytes !== wfBytes && sixthBytes.includes('runs-on: ubuntu-22.04'),
    '(C) THE SIXTH-IMAGE CONTROL really declares a second `runs-on:` at the main package\'s own job');
  assert.equal(wfBytes.includes('ubuntu-22.04'), false,
    '(C) and the shipped file names no such image anywhere, so a sixth image is a byte this tree does not carry');
  const sixthVerdict = controlVerdict(() => driveRunnerCensus(stripComments(sixthBytes),
    { label: 'the control of a sixth runner label' }));
  assert.ok(sixthVerdict !== null && sixthVerdict.message.includes('ubuntu-22.04'),
    `(C) AND A LABEL OUTSIDE THE TABLE IS REFUSED AT A LITERAL SITE TOO — no more than the five: ${String(sixthVerdict?.message).split('\n')[0].slice(0, 200)}`);
  // ---- (D) AND "NO RUNNER SERVES TWO", DRIVEN NEGATIVE: ONE LEG ASKING FOR ANOTHER LEG'S IMAGE ----
  const doubledBytes = wfBytes.replace('runner: macos-15\n', 'runner: macos-15-intel\n');
  assert.ok(doubledBytes !== wfBytes && doubledBytes.includes('runner: macos-15-intel')
    && !doubledBytes.includes('runner: macos-15\n'),
    '(D) THE DOUBLED-IMAGE CONTROL really puts `darwin-arm64` on the Intel image, leaving FOUR distinct '
    + 'images where the contract declares five');
  const doubledVerdict = controlVerdict(() => driveRunnerCensus(stripComments(doubledBytes),
    { label: 'the control of one leg served by another leg\'s image' }));
  assert.ok(doubledVerdict !== null && doubledVerdict.message.includes('NO RUNNER SERVES TWO'),
    `(D) AND IT IS THE DISTINCTNESS CLAUSE THAT CATCHES THIS ONE — \`§1.2\`'s own rule, in \`PAR-PUB-28\`'s `
    + `terms: a cross-compiled artefact is "a build this matrix did not perform": ${String(doubledVerdict?.message).split('\n')[0].slice(0, 200)}`);
  assert.ok(doubledVerdict.message.includes('macos-15-intel'),
    '(D) and the verdict names the image that was doubled, so the red cell names the collision and not merely its kind');
  // **THE MEASURED RESULTS, PRINTED SO THE RECORD CAN CITE THEM RATHER THAN THIS CELL'S INTENTION.**
  console.log(`\n[P-PUB-8/S-TAG] THE RUNNER-LABEL GUARD, BOTH DIRECTIONS MEASURED (\`release.md §1.2\` and its `
    + `closing rule; \`PAR-PUB-28\`):\n`
    + `  the shipped five  → PASS  ${JSON.stringify(shippedCensus.namedImages)}\n`
    + `                      matrix \`runs-on:\` sites ${shippedCensus.matrixSites} · literal sites ${JSON.stringify(shippedCensus.literalSites)}\n`
    + `  (B) one label changed  (\`macos-15-intel\` → \`macos-14\`) → ${String(driftedVerdict.message).split('\n')[0].slice(0, 150)}\n`
    + `  (C) a sixth image injected (\`ubuntu-22.04\`)         → ${String(sixthVerdict.message).split('\n')[0].slice(0, 150)}\n`
    + `  (D) one leg on another leg's image (\`darwin-arm64\` → \`macos-15-intel\`) → ${String(doubledVerdict.message).split('\n')[0].slice(0, 150)}`);
  // the fifth control: A PUBLISH SCRIPT IN THE PACKAGE, which no control of this set had ever driven.
  const manifestBytes = readFileSync(join(PKG_DIR, 'package.json'), 'utf8');
  const publishScript = manifestBytes.replace(`  "optionalDependencies": {`, `  "scripts": { "publish": "npm publish --access public" },\n  "optionalDependencies": {`);
  assert.ok(publishScript !== manifestBytes && publishScript.includes('npm publish'),
    'THE FIFTH CONTROL really declares a publish script in the package\'s own manifest');
  assert.equal(manifestBytes.includes('npm publish'), false,
    'and the shipped manifest carries no publish verb — the release\'s trigger is the ARCHITECT\'S tag and never a script');
  const scriptVerdict = controlVerdict(() => drivePackagePublishVerbs(publishScript, { label: 'the control publish script' }));
  assert.ok(scriptVerdict !== null,
    'THE FIFTH CONTROL MUST FAIL: a publish script in the package is caught, so `§4.1` item 1 is driven here and not merely cited');
  assert.ok(scriptVerdict.message.includes('publish'),
    `and its verdict names the clause it broke: ${String(scriptVerdict.message).slice(0, 200)}`);
  // **⟶ AND THE THIRD SITE OF THE SAME LIST, WIDENED 2026-10-11 BY THE PROHIBITION-GAP PASS
  // (`role_test_writer`): THE ASSERTION ON THE SHIPPED MANIFEST'S OWN BYTES.** **THE AS-FILED LITERAL STANDS
  // ABOVE, BYTE-FOR-BYTE; WHAT IS ADDED BESIDE IT IS THE WIDENED SHAPE, BECAUSE THE AS-FILED ONE IS BLIND TO
  // THE STAGED FORM.** **AS FILED IT READ** *"`assert.equal(manifestBytes.includes('npm publish'), false, 'and the
  // shipped manifest carries no publish verb — the release\'s trigger is the ARCHITECT\'S tag and never a
  // script')`"* — **and `includes('npm publish')` is `false` of a manifest whose `scripts` carried `npm stage
  // publish` exactly as it is of one carrying nothing at all: the same drift, at the third home, and the one
  // the previous pass's census classified `KEEP`** (red set `§16.4` row `9`). **THE WIDENED SHAPE IS A STRICT
  // SUPERSET OF THE AS-FILED LITERAL** — every string `'npm publish'` occurs in is matched by it, and the six
  // as-filed members are driven member by member below — **so no manifest byte that was refused before is
  // admitted now** (`release.md §4.1` item `1`).
  assert.equal(REFUSED_REGISTRY_VERB.test(manifestBytes), false,
    'and the shipped manifest carries no publish verb — DIRECT or STAGED, and no spelling that reaches a registry '
    + 'with this package\'s own content: the release\'s trigger is the ARCHITECT\'S tag and never a script');
  // ===============================================================================================
  // **THE PROHIBITION-GAP PASS'S OWN DRIVES — THE WIDENED SHAPE, BOTH DIRECTIONS, WITH CONTROLS THAT CAN FAIL**
  // (`§4.1` item `1`; `§3.3`; `§1.5` item `1`; `§2.1` item `1`; `PUB-R-5`: a control that cannot fail is worse
  // than none). **FOUR CONTROLS AND ONE CENSUS: (a) the STAGED verb in a package `scripts` entry FAILS — the
  // hole, closed; (b) the DIRECT verb in the same position FAILS — the original case, still held; (c) a `test`
  // verb, a `build` verb and an `npm run` delegation PASS, and so does the package's own absent-`scripts`
  // state, so the widened shape is not vacuous; (d) the WORKFLOW'S OWN TEXT is refused by NEITHER drive, and
  // HOW that boundary is kept is measured rather than asserted.** **THE CENSUS BELOW IS A TABLE OF ASSERTIONS
  // AND NOT A COMMENT: every row of what the shape matches and what it does not is driven here.**
  const AS_FILED_REFUSAL_LIST = /npm publish|pnpm publish|yarn publish|npm pack|git tag|npm install -g/;
  const AS_FILED_MEMBERS = ['npm publish', 'pnpm publish', 'yarn publish', 'npm pack', 'git tag', 'npm install -g'];
  for (const asFiled of AS_FILED_MEMBERS) {
    assert.equal(AS_FILED_REFUSAL_LIST.test(asFiled), true,
      `the as-filed list refused \`${asFiled}\`, so it is a member the widened shape must hold`);
    assert.equal(REFUSED_REGISTRY_VERB.test(asFiled), true,
      `AND THE WIDENED SHAPE REFUSES \`${asFiled}\` TOO — the widening adds coverage and drops no member of `
      + 'the list it replaces, measured member by member rather than claimed');
  }
  /** one scratch copy of the shipped manifest carrying ONE `scripts` entry, so every control below is
   *  measured against the SAME instrument that guards the tree and never against a copy of it. */
  const withScript = (body, name = 'release') => manifestBytes.replace(`  "optionalDependencies": {`,
    `  "scripts": { "${name}": "${body}" },\n  "optionalDependencies": {`);
  // ---- (a) THE HOLE, CLOSED: A PACKAGE SCRIPT THAT REACHES A REGISTRY WITH ITS OWN CONTENT, STAGED ----
  assert.equal(AS_FILED_REFUSAL_LIST.test('npm stage publish --access public'), false,
    '(a) THE HOLE, MEASURED AT ITS OWN BYTES RATHER THAN REMEMBERED: `stage ` sits between `npm` and '
    + '`publish`, so the as-filed list did not match the staged verb — this is the input that passed all three drives');
  assert.equal(REFUSED_REGISTRY_VERB.test('npm stage publish --access public'), true,
    '(a) and the widened shape refuses it, verb-order-robustly');
  const stagedScriptBytes = withScript('npm stage publish --access public');
  assert.ok(stagedScriptBytes !== manifestBytes
    && stagedScriptBytes.includes('"release": "npm stage publish --access public"'),
    '(a) THE CONTROL REALLY DECLARES THE STAGED VERB IN THE PACKAGE\'S OWN `scripts`, under a name that is NOT '
    + '`publish` — so it is the VERB LIST that must catch it and not the `publish`-script clause beside it');
  assert.equal(manifestBytes.includes('npm stage publish'), false,
    '(a) and the shipped manifest carries no staged verb either, so the verdict below comes from the control');
  const stagedVerdict = controlVerdict(() => drivePackagePublishVerbs(stagedScriptBytes, { label: 'the control staged publish script' }));
  assert.ok(stagedVerdict !== null,
    '(a) THE STAGED-VERB CONTROL MUST FAIL: a script that reaches a registry with this package\'s own content, '
    + 'STAGED, is refused — the hole this pass closes');
  assert.ok(stagedVerdict.message.includes('`release`') && stagedVerdict.message.includes('no publish, pack, tag or install verb'),
    `(a) AND ITS VERDICT IS THE VERB LIST'S and not the \`publish\`-script clause's, so the closure is the `
    + `PATTERN'S and not a neighbour's: ${String(stagedVerdict.message).split('\n')[0].slice(0, 160)}`);
  const stagedNamedVerdict = controlVerdict(() => drivePackagePublishVerbs(
    withScript('npm stage publish --access public', 'publish'),
    { label: 'the control staged publish script, named `publish`' }));
  assert.ok(stagedNamedVerdict !== null && stagedNamedVerdict.message.includes('no `publish` script exists'),
    `(a′) AND THE SAME STAGED BODY UNDER THE NAME \`publish\` IS REFUSED BY THE CLAUSE BESIDE IT — measured, so `
    + `the two defences are told apart and neither is credited with the other's catch: ${String(stagedNamedVerdict?.message).split('\n')[0].slice(0, 160)}`);
  // ---- (b) THE ORIGINAL CASE, STILL HELD AT THE SAME HOME ----
  assert.equal(AS_FILED_REFUSAL_LIST.test('npm publish --access public'), true,
    '(b) the direct verb was never in doubt: the as-filed list refused it');
  const directVerdict = controlVerdict(() => drivePackagePublishVerbs(withScript('npm publish --access public'),
    { label: 'the control direct publish script' }));
  assert.ok(directVerdict !== null && directVerdict.message.includes('`release`'),
    `(b) AND THE DIRECT VERB IS STILL REFUSED AT THE SAME HOME after the widening, under a name that is not `
    + `\`publish\`: ${String(directVerdict?.message).split('\n')[0].slice(0, 160)}`);
  // ---- (c) THE NON-VACUITY CONTROL: LEGITIMATE SCRIPTS PASS, AND SO DOES THE TREE'S OWN STATE ----
  const legitBytes = manifestBytes.replace(`  "optionalDependencies": {`,
    `  "scripts": { "test": "node --test test/*.test.mjs", "build": "cargo build --release --offline", "prepare": "npm run build" },\n  "optionalDependencies": {`);
  const legitVerdict = controlVerdict(() => drivePackagePublishVerbs(legitBytes, { label: 'the control of three legitimate scripts' }));
  assert.equal(legitVerdict, null,
    '(c) THE LEGITIMATE CONTROL MUST PASS — a `test` verb, a `build` verb and an `npm run` DELEGATION reach no '
    + 'registry with this package\'s own content, so the widened shape is not vacuous: ' + String(legitVerdict?.message).slice(0, 160));
  assert.equal(drivePackagePublishVerbs(legitBytes, { label: 'the legitimate control, counted' }), 3,
    '(c) and the three scripts were really READ — the count is the instrument\'s own return value, so a pattern '
    + 'that refused nothing by iterating nothing would be caught here');
  assert.equal(drivePackagePublishVerbs(manifestBytes, { label: 'the shipped package manifest, counted' }), 0,
    '(c) AND THE PACKAGE\'S OWN ABSENT-`scripts` STATE PASSES: the shipped manifest declares no script at all, '
    + 'measured as the instrument\'s own count `0` — so the refusal list\'s non-vacuity rests on the controls above and not on the tree');
  // ---- (d) THE BOUNDARY: THE WORKFLOW'S OWN TEXT, WHICH LEGITIMATELY CARRIES THE STAGED VERB ----
  const wfCode = wfBytes.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n');
  const wfVerbSites = [...wfCode.matchAll(new RegExp(REFUSED_REGISTRY_VERB.source, 'g'))].map((m) => m[0]);
  assert.deepEqual(wfVerbSites, ['npm stage publish', 'npm stage publish'],
    '(d) MEASURED IN BOTH DIRECTIONS, SO THE BOUNDARY IS NOT MISREAD: pointed at the WORKFLOW\'S OWN BYTES the '
    + 'widened shape DOES match its two staged sites — THE BOUNDARY IS THE INSTRUMENT\'S SUBJECT AND NOT THE '
    + 'PATTERN BEING NARROW, and no reader may take this cell as a claim that the pattern cannot see a workflow');
  const wfAsManifest = controlVerdict(() => drivePackagePublishVerbs(wfBytes, { label: 'the workflow, misread as a package manifest' }));
  assert.ok(wfAsManifest instanceof SyntaxError,
    '(d) HOW THE BOUNDARY IS KEPT: the refusal instrument\'s FIRST operation parses a JSON manifest, so a '
    + 'workflow\'s YAML is refused by the SUBJECT READER before any `scripts` body is read, and the workflow\'s '
    + 'legitimate staged verb is never reached by the verb list');
  assert.equal(driveWorkflow(wfBytes, { label: 'the shipped workflow, at the boundary' }), 5,
    '(d) AND THE WORKFLOW\'S OWN INSTRUMENT PASSES IT, all five matrix rows read: the two staged sites are '
    + '`release.md §1.5` item 1\'s own declaration, and what `§4.1` item 1 forbids is a PASS EXECUTING a publish '
    + 'and not the release workflow DECLARING one — so the workflow\'s own text is refused by NEITHER drive of this cell');
  // ---- THE CENSUS: WHAT THE WIDENED SHAPE MATCHES AND WHAT IT DOES NOT, EVERY ROW AN ASSERTION ----
  const census = [
    ['the STAGED verb in a package script', 'npm stage publish --access public', true],
    ['the STAGED verb under another client', 'pnpm stage publish --access public', true],
    ['the STAGED verb in the client\'s second position', 'yarn npm publish --access public', true],
    ['the DIRECT verb, the case the list was written against', 'npm publish --access public', true],
    ['the PROMOTION verb of a staged version (`PUB-DD-31`)', 'npm stage approve provident-storeroom@0.1.1', true],
    ['the packer', 'npm pack --dry-run', true],
    ['the registry\'s own tagging surface', 'npm dist-tag add provident-storeroom@0.1.1 latest', true],
    ['the release\'s trigger, minted by a script', 'git tag v0.1.1', true],
    ['a global install, the short flag', 'npm i -g provident-storeroom', true],
    ['a global install, the long flag', 'pnpm add --global provident-storeroom', true],
    ['a global install, the client\'s own order', 'yarn global add provident-storeroom', true],
    ['the READ-ONLY tag listing the tests themselves perform — refused here too, as the as-filed list refused it',
      'git tag --list', true],
    ['a `test` script', 'node --test test/*.test.mjs', false],
    ['a `build` script', 'cargo build --release --offline', false],
    ['a delegation to a script of this package', 'npm run build', false],
    ['the release\'s own red-set leg, whose FILENAME carries the word', 'node --test bindings/js/test/publish.test.mjs', false],
    ['a clean install with no global flag', 'npm ci', false],
    ['a bare dependency install', 'npm install', false],
    ['a READ of the registry, which puts nothing of ours up', 'npm view provident-storeroom', false],
    ['the word `publish` in a sentence', 'the published Node ESM binding', false],
  ];
  const censusRows = [];
  for (const [what, subject, expected] of census) {
    assert.equal(REFUSED_REGISTRY_VERB.test(subject), expected,
      `\`${what}\`: the widened shape ${expected ? 'REFUSES' : 'DOES NOT MATCH'} \`${subject}\``);
    censusRows.push(`${(expected ? 'REFUSED ' : 'no match')} ${what.padEnd(96)} ${subject}`);
  }
  // **THE CONTROLS' MEASURED RESULTS, PRINTED SO THE RECORD CAN CITE THEM RATHER THAN THIS CELL'S INTENTION.**
  console.log(`\n[P-PUB-8/S-TAG] the workflow's declared shapes and the forbidden ones, MEASURED AGAINST THE `
    + `SHIPPED INSTRUMENT (\`release.md §1.1\`–\`§1.4\`; the file is EXECUTED BY NOTHING here — \`§4.1\` item 1):\n  `
    + wfVerdicts.join('\n  ')
    + `\n  ${'a publish script in the package'.padEnd(44)} → ${String(scriptVerdict.message).split('\n')[0].slice(0, 130)}`
    + `\n\n[P-PUB-8/S-TAG] THE REFUSAL LIST, WIDENED AND DRIVEN BOTH DIRECTIONS (\`release.md §4.1\` item 1; `
    + `\`§1.5\` item 1), WITH THE AS-FILED LIST PRINTED BESIDE ITS REPLACEMENT:\n`
    + `  as filed : ${AS_FILED_REFUSAL_LIST.source}\n`
    + `  widened  : ${REFUSED_REGISTRY_VERB.source}\n`
    + `  \`npm stage publish --access public\` → as filed ${AS_FILED_REFUSAL_LIST.test('npm stage publish --access public') ? 'REFUSED' : 'NOT REFUSED (THE HOLE, MEASURED)'} · widened ${REFUSED_REGISTRY_VERB.test('npm stage publish --access public') ? 'REFUSED (CLOSED)' : 'NOT REFUSED'}\n`
    + `  the six as-filed members, each still refused: ${AS_FILED_MEMBERS.map((s) => `${s} → ${REFUSED_REGISTRY_VERB.test(s) ? 'REFUSED' : 'MISSED'}`).join(' · ')}\n`
    + `  ---- what it matches and what it does not, EVERY ROW AN ASSERTION ----\n  `
    + censusRows.join('\n  ')
    + `\n  ---- the four controls, measured ----\n`
    + `  (a) a package script \`"npm stage publish --access public"\` → ${String(stagedVerdict.message).split('\n')[0].slice(0, 130)}\n`
    + `  (a′) the same body under the name \`publish\` → ${String(stagedNamedVerdict.message).split('\n')[0].slice(0, 130)}\n`
    + `  (b) a package script \`"npm publish --access public"\` → ${String(directVerdict.message).split('\n')[0].slice(0, 130)}\n`
    + `  (c) the legitimate control (\`test\` · \`build\` · \`npm run build\`) → ${legitVerdict === null ? 'PASSES (no verdict)' : String(legitVerdict.message).split('\n')[0].slice(0, 130)}\n`
    + `  (c) the shipped manifest's absent-\`scripts\` state → PASSES (0 scripts read)\n`
    + `  (d) the workflow's own bytes, at the widened shape → ${wfVerbSites.length} matches (${wfVerbSites.join(' · ')}) — legitimately, AND THE BOUNDARY IS THE SUBJECT: the instrument parses a JSON manifest FIRST, so the workflow's text is refused by that reader (${String(wfAsManifest.message).split('\n')[0].slice(0, 90)}) while \`driveWorkflow\` PASSES it with all five matrix rows read`);
});

// ===============================================================================================
// **⟶ ADDED 2026-10-11 BY THE GRANT-GUARD PASS (`role_test_writer`) — THE EIGHTH INSTANCE OF THIS
// UNIT'S SIGNATURE CLASS: *AN ACTION WHOSE GRANT THE CONFIGURATION NEVER MAKES*.**
//
// **THE FINDING, MEASURED BY THE PASS THAT FIXED THE DEFECT:** the tagged run died at its final step
// with `Error: Failed to persist attestation: Resource not accessible by integration`, because the
// `main` job's token carried `contents: read` and `id-token: write` and NOT `attestations: write`,
// which is the grant `POST /repos/{owner}/{repo}/attestations` is reached under (`release.md §1.4`
// step `6`; `§1.3` item `2`). **AND THE TWO PERMISSION CELLS THAT STOOD ABOVE ASSERTED ONLY
// `contents` AND `id-token`, SO THE EXACT OMISSION THAT KILLED THE RUN WAS UNFALSIFIABLE BY THE SUITE
// THAT EXISTS TO PIN THIS WORKFLOW.** **THE CELL BELOW IS THAT FALSIFIER, AND IT ASSERTS THE
// PROPERTY RATHER THAN THE SPELLING.**
//
// **THE PROPERTY IS NOT A KEY NAME, IT IS THE EFFECT:** *every action and every run site in this file
// that its own documentation says needs a permission HAS THAT PERMISSION AT THE SCOPE THAT GOVERNS
// IT.*
//
// **THE EFFECTIVE-PERMISSION RESOLUTION RULE, STATED ONCE AND OBEYED BY EVERY CLAUSE BELOW:**
//   (1) the WORKFLOW-LEVEL `permissions:` block is the file's only top-level one;
//   (2) **A JOB THAT DECLARES ITS OWN `permissions:` BLOCK REPLACES THAT BLOCK FOR THAT JOB RATHER
//       THAN MERGING WITH IT** — the host's own semantics, printed in the file's own commentary at the
//       `main` job — so a job's own block, where present, IS the effective set, WHOLE;
//   (3) otherwise the workflow-level block IS the effective set;
//   (4) every `uses:` and `run:` site is read against the effective set of THE JOB IT RUNS IN.
// **THE THREE KEYS THE `main` JOB CARRIES ARE THEREFORE ALL LOAD-BEARING:** `attestations: write` is
// the grant the run was missing, and `contents: read` · `id-token: write` are REDECLARATIONS THE
// REPLACEMENT SEMANTICS FORCES — the same semantics that make dropping either of them a failure, so
// this cell refuses a job block reduced to the one new key as surely as it refuses its absence.
//
// **THE CENSUS IS GENERALISED RATHER THAN THE INSTANCE PATCHED:** the table below enumerates every
// `uses:` site in the file and carries each one's documented requirement, EACH ENTRY NAMING ITS
// SOURCE, beside the `run:` sites that document a permission need (the OIDC federation is not an
// action and would otherwise be uncovered). **A `uses:` SITE ABSENT FROM THE TABLE IS A FINDING, AND
// A TABLE ROW NO SITE USES IS A FINDING TOO — so the NEXT action added to this file is covered by
// THIS cell rather than by a new one.**
//
// **AND THE PLACEMENT RULING, MADE HERE BECAUSE NO SPEC CLAUSE MAKES IT: NO CLAUSE OF
// `docs/specs/storeroom-publish/**` DECIDES JOB-LEVEL VERSUS WORKFLOW-LEVEL — that part's own
// permission cell is STALE (it prints the workflow-level pair alone), it is the SpecWriter's, and
// this pass touches no spec byte. SO THIS PASS SAYS SO PLAINLY AND RULES: LEAST PRIVILEGE IS HELD AS
// A REQUIREMENT AND NOT AS A PREFERENCE.** **THE CLAUSE THAT DECIDES IT IS `release.md §1.4` STEP `6`
// READ WITH THE FILE'S OWN PLACEMENT: THE ATTESTING ACTION IS A STEP OF `main`, NO SITE OF THE
// FIVE-LEG `platform` MATRIX DOCUMENTS ANY NEED FOR `attestations: write`, AND A GRANT DECLARED AT
// THE WORKFLOW LEVEL IS HELD BY EVERY JOB THE FILE DECLARES — so it would hand the matrix a
// repository write it never uses. CONTROL (B) MEASURES THAT REFUSAL, AND (B′) MEASURES THE SAME MOVE
// WITH THE JOB'S OWN BLOCK REMOVED, where sufficiency is satisfied and the least-privilege clause
// ALONE is what fails it.**
cell('P-PUB-8', 'S-TAG every documented grant is effective at the job that needs it — the `uses:` census, the resolution rule, and least privilege held as a requirement', async () => {
  // `release.md §1.3` item 3 / `§1.4` step 6 / `§5.3` item 1; `PUB-R-5`: a control that cannot fail is
  // worse than none. **THE FILE IS READ AND NEVER RUN** — no step of it is a pass's act (`§4.1` item 1).
  const grantWorkflow = join(REPO_ROOT, '.github', 'workflows', 'publish.yml');
  const grantBytes = readFileSync(grantWorkflow, 'utf8');
  /** the file's own code, with the prose it prints beside it removed: a `uses:` or a `--provenance` in
   *  a comment is a sentence about a site and not a site. */
  const grantCodeOf = (text) => text.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n');

  // ---------------------------------------------------------------------------------------------
  // THE TABLE THIS CELL OWNS — DATA, NOT PROSE: EVERY `uses:` SITE'S DOCUMENTED REQUIREMENT, EACH
  // ENTRY NAMING ITS SOURCE, TOGETHER WITH THE RUN SITES THAT DOCUMENT A PERMISSION NEED
  // ---------------------------------------------------------------------------------------------
  const ACTION_GRANTS = [
    {
      uses: 'actions/checkout@v4',
      requires: { contents: 'read' },
      declined: {},
      source: 'the action\'s own README, whose recommended workflow declares `permissions: contents: read`; read '
        + 'with the file\'s own commentary at the `main` job, which names `contents: read` for "its two '
        + '`actions/checkout@v4` sites"',
    },
    {
      uses: 'dtolnay/rust-toolchain@stable',
      requires: {},
      declined: {},
      source: 'the action\'s own README declares no `permissions:` block and reads no repository scope: it fetches a '
        + 'toolchain from `static.rust-lang.org` with the one input this file passes (`toolchain`)',
    },
    {
      uses: 'actions/setup-node@v6',
      requires: {},
      declined: {},
      source: 'the action\'s own README declares no `permissions:` requirement for the inputs this file passes '
        + '(`node-version` only — no `cache:`, no `registry-url`): the client is downloaded from `nodejs.org` and no '
        + 'repository scope is read (`release.md §1.4`\'s CI-inputs clause)',
    },
    {
      uses: 'actions/attest-build-provenance@v4',
      requires: { 'id-token': 'write', attestations: 'write' },
      declined: { 'artifact-metadata': 'to create the artifact storage record' },
      source: 'the action\'s own READMEs, quoted at this file\'s own attestation-grant commentary: `v1` reads '
        + '`id-token: write` · `attestations: write` and `v4` reads the same two beside `artifact-metadata: write`, '
        + 'required only "to create the artifact storage record" — a record this step does not take, '
        + '`push-to-registry` standing at its default `false`',
    },
  ];
  /** **THE RUN SITES THAT DOCUMENT A PERMISSION NEED** — the other half of the same property, because the
   *  OIDC federation is not an action and an action-only census would leave it unpinned. */
  const RUN_GRANTS = [
    {
      what: 'the `--provenance` publish site',
      test: (line) => line.includes('--provenance'),
      requires: { 'id-token': 'write' },
      source: '`release.md §5.3` item 1 — "`--provenance` IS AN OIDC CAPABILITY … minted by the host\'s own OIDC '
        + 'federation, through the workflow\'s `id-token: write`" (`acceptance.md`\'s bootstrap clause item 1 reads '
        + 'it the same way)',
    },
  ];
  /** **THE KEYS THE HOST'S `permissions` DOMAIN CARRIES.** A KEY OUTSIDE THIS SET IS A SPELLING THE PLATFORM DOES
   *  NOT HAVE — the file is refused before any step of the job runs — so it is named as a spelling and not read as
   *  a grant short of its value. */
  const PERMISSION_DOMAIN = [
    'actions', 'artifact-metadata', 'attestations', 'checks', 'contents', 'deployments', 'discussions', 'id-token',
    'issues', 'metadata', 'models', 'packages', 'pages', 'pull-requests', 'repository-projects', 'security-events',
    'statuses',
  ];
  // ---------------------------------------------------------------------------------------------
  // THE RESOLUTION RULE, AS CODE: WORKFLOW BLOCK → EACH JOB'S OWN BLOCK IF IT DECLARES ONE (WHICH
  // REPLACES IT) → EVERY SITE READ AGAINST THE EFFECTIVE SET OF ITS OWN JOB
  // ---------------------------------------------------------------------------------------------
  const resolveGrants = (text, { label }) => {
    const lines = text.split('\n');
    const mapAt = (at, indent) => {
      const rest = lines[at].slice(indent + 'permissions:'.length).trim();
      assert.equal(rest, '',
        `${label}: the \`permissions:\` block at line ${at + 1} is a MAPPING of keys to values; the scalar form `
        + `\`${rest}\` is outside this rule's resolution and is therefore a FINDING rather than a grant`);
      const out = {};
      for (let i = at + 1; i < lines.length; i += 1) {
        if (lines[i].trim() === '') continue;
        if (lines[i].search(/\S/) <= indent) break;
        const m = /^\s*([A-Za-z0-9_-]+):\s*(\S+)\s*$/.exec(lines[i]);
        assert.ok(m, `${label}: every entry of a \`permissions:\` block is a \`key: value\` pair (line ${i + 1}: `
          + `\`${lines[i].trim()}\`)`);
        out[m[1]] = m[2];
      }
      return out;
    };
    const wfAt = lines.findIndex((l) => l === 'permissions:');
    assert.ok(wfAt !== -1,
      `${label}: the file declares its WORKFLOW-LEVEL \`permissions:\` block (\`release.md §1.3\` item 3; \`§1.4\` step 6)`);
    const workflowPermissions = mapAt(wfAt, 0);
    const jobsAt = lines.findIndex((l) => l === 'jobs:');
    assert.ok(jobsAt !== -1, `${label}: the file declares \`jobs:\``);
    const starts = [];
    for (let i = jobsAt + 1; i < lines.length; i += 1) {
      if (/^[A-Za-z_][A-Za-z0-9_-]*:/.test(lines[i])) break;
      if (/^  [A-Za-z0-9_-]+:\s*$/.test(lines[i])) starts.push(i);
    }
    assert.ok(starts.length >= 1, `${label}: the file's jobs are declared at the second indent (${starts.length} read)`);
    const jobs = starts.map((start, k) => {
      const end = k + 1 < starts.length ? starts[k + 1] : lines.length;
      const ownAt = lines.findIndex((l, i) => i > start && i < end && /^    permissions:/.test(l));
      const own = ownAt === -1 ? null : mapAt(ownAt, 4);
      return {
        name: /^  ([A-Za-z0-9_-]+):/.exec(lines[start])[1],
        start, end, ownAt, own,
        effective: own === null ? workflowPermissions : own,
        from: own === null
          ? 'the WORKFLOW-LEVEL block, which no job block replaces for this job'
          : `its OWN job block at line ${ownAt + 1}, WHICH REPLACES the workflow-level block rather than merging with it`,
        sites: [],
      };
    });
    const sites = [];
    lines.forEach((line, i) => {
      const m = /^\s+uses:\s*(\S+)\s*$/.exec(line);
      if (!m) return;
      const job = jobs.find((j) => i > j.start && i < j.end);
      assert.ok(job, `${label}: the \`uses:\` site \`${m[1]}\` at line ${i + 1} lies inside a declared job`);
      const site = { at: i, kind: 'uses', subject: m[1], job: job.name };
      job.sites.push(site);
      sites.push(site);
    });
    const runs = [];
    lines.forEach((line, i) => {
      const rows = RUN_GRANTS.filter((r) => r.test(line));
      if (rows.length === 0) return;
      const job = jobs.find((j) => i > j.start && i < j.end);
      assert.ok(job, `${label}: the \`run:\` site at line ${i + 1} lies inside a declared job`);
      assert.equal(rows.length, 1,
        `${label}: the \`run:\` site at line ${i + 1} is covered by EXACTLY ONE documented-requirement row, not two `
        + 'and not none');
      const site = { at: i, kind: 'run', subject: line.trim().replace(/^run:[ \t]*/, ''), requirement: rows[0], job: job.name };
      job.sites.push(site);
      runs.push(site);
    });
    assert.ok(runs.length >= 1,
      `${label}: the file's own \`--provenance\` sites are enumerated and covered (${runs.length} read), so the OIDC `
      + 'grant is pinned by this census and not only by the action table');
    const uncovered = lines.map((line, i) => ({ line, i }))
      .filter(({ line, i }) => line.includes('--provenance') && !runs.some((s) => s.at === i));
    assert.equal(uncovered.length, 0,
      `${label}: EVERY SITE THAT DOCUMENTS A PERMISSION NEED IS COVERED BY THIS CELL'S TABLE — a \`--provenance\` site `
      + `matching no documented-requirement row would leave its OIDC grant unpinned: ${JSON.stringify(uncovered.map((u) => u.line.trim()))}`);
    return { wfAt, workflowPermissions, jobs, sites, runs };
  };
  /** **ONE INSTRUMENT, DRIVING THE SHIPPED FILE AND EVERY CONTROL ALIKE**, so a control measures the assertion
   *  that actually guards the tree and never a copy of it: it throws at the first clause broken. */
  const driveGrants = (text, { label }) => {
    const r = resolveGrants(text, { label });
    const rows = [];
    const censusRows = [];
    rows.push(`workflow-level \`permissions:\` at line ${r.wfAt + 1} → ${JSON.stringify(r.workflowPermissions)}`);
    for (const job of r.jobs) {
      // (·) THE DOMAIN CENSUS FIRST, so a misspelled key is credited to the SPELLING and not to a missing grant.
      for (const key of Object.keys(job.effective)) {
        assert.ok(PERMISSION_DOMAIN.includes(key),
          `${label}: job \`${job.name}\`'s effective \`permissions:\` carries the key \`${key}\`, AND \`${key}\` IS NOT A `
          + 'KEY THE HOST\'S `permissions` DOMAIN CARRIES: the file is refused before any step of that job runs, so a '
          + 'misspelling is not a grant short of its value — it is not a grant at all. The declared key is '
          + '`attestations`, and the value the attesting action documents is `write`');
      }
      rows.push(`job \`${job.name}\` → effective ${JSON.stringify(job.effective)} FROM ${job.from}`);
      // (·) SUFFICIENCY: every documented requirement of every site of this job is present, IN FULL.
      const missing = [];
      for (const site of job.sites) {
        const req = site.kind === 'uses' ? ACTION_GRANTS.find((a) => a.uses === site.subject) : site.requirement;
        if (site.kind === 'uses') {
          assert.ok(req,
            `${label}: THE CENSUS COVERS EVERY \`uses:\` SITE — \`${site.subject}\` (line ${site.at + 1}, job `
            + `\`${job.name}\`) IS ABSENT FROM THIS CELL'S DOCUMENTED-REQUIREMENT TABLE, each entry of which names its `
            + 'own source. A NEWLY ADDED ACTION IS CARRIED INTO THAT TABLE AND NOT INTO A NEW CELL, so this is a '
            + 'FINDING and not an unknown');
        }
        censusRows.push(`  ${(site.kind === 'uses' ? 'uses' : 'run ')}  ${site.subject.padEnd(40)} job \`${job.name}\``
          + ` · documents ${JSON.stringify(req.requires)} · source: ${req.source}`);
        for (const [key, value] of Object.entries(req.requires)) {
          if (job.effective[key] === value) continue;
          missing.push({ site, key, value, got: job.effective[key] });
        }
      }
      assert.equal(missing.length, 0,
        `${label}: THE EFFECTIVE \`permissions:\` FOR JOB \`${job.name}\` DO NOT SATISFY EVERY DOCUMENTED REQUIREMENT: `
        + `${missing.map((m) => `\`${m.site.subject}\` (line ${m.site.at + 1}) documents \`${m.key}: ${m.value}\` and the `
          + `effective set carries ${m.got === undefined ? 'NOTHING AT THAT KEY' : `\`${m.key}: ${m.got}\``}`).join('; ')}. `
        + `THE EFFECTIVE SET IS ${JSON.stringify(job.effective)}, RESOLVED FROM ${job.from} — `
        + '**A JOB-LEVEL `permissions:` BLOCK REPLACES THE WORKFLOW-LEVEL ONE RATHER THAN MERGING WITH IT, SO A KEY '
        + 'THE WORKFLOW BLOCK GRANTS MUST BE REDECLARED AT THE JOB THAT NEEDS IT.** '
        + (missing.some((m) => Object.prototype.hasOwnProperty.call(r.workflowPermissions, m.key))
          ? `AND THE KEY IS NOT ABSENT FROM THE FILE: THE WORKFLOW-LEVEL BLOCK GRANTS `
            + `${JSON.stringify(r.workflowPermissions)}, WHICH THIS JOB'S OWN BLOCK REPLACES — a grant declared there is `
            + 'a grant this job\'s actions never receive. '
          : missing.some((m) => m.got !== undefined)
            ? 'AND THE KEY IS NOT MERELY ABSENT: this job\'s own block declares it AT A SHORTER VALUE THAN THE ACTION '
              + 'DOCUMENTS, and the host refuses a grant short of its value exactly as it refuses one that is absent. '
            : 'AND THE KEY IS DECLARED NOWHERE IN THE FILE: '
              + `${JSON.stringify(r.workflowPermissions)} is the whole of the workflow-level grant. `)
        + 'THE RUN THAT DIED ON THIS SHAPE IS THE ONE THIS CELL EXISTS FOR: `Error: Failed to persist attestation: '
        + 'Resource not accessible by integration` (`release.md §1.4` step 6; `§1.3` item 2)');
    }
    // ---------------------------------------------------------------------------------------------
    // **CLAUSE 2 — LEAST PRIVILEGE, DRIVEN ACROSS EVERY JOB *AFTER* CLAUSE 1 HAS BEEN DRIVEN ACROSS EVERY
    // JOB**: a shape that breaks BOTH clauses is credited to the sufficiency clause that killed the run and
    // only then to the width ruling — control (B) breaks both, and (B′) breaks this one alone, so the two
    // are told apart rather than one being credited with the other's catch.
    // ---------------------------------------------------------------------------------------------
    for (const job of r.jobs) {
      const documented = new Set();
      const declined = new Map();
      for (const site of job.sites) {
        const req = site.kind === 'uses' ? ACTION_GRANTS.find((a) => a.uses === site.subject) : site.requirement;
        if (!req) continue;
        for (const key of Object.keys(req.requires)) documented.add(key);
        for (const [key, why] of Object.entries(req.declined ?? {})) declined.set(key, why);
      }
      for (const key of Object.keys(job.effective)) {
        assert.ok(documented.has(key),
          declined.has(key)
            ? `${label}: job \`${job.name}\` holds \`${key}: ${job.effective[key]}\`, WHICH THE ACTION IT RUNS `
              + `EXPLICITLY DECLINES: that action's own documentation names \`${key}\` as required only `
              + `${declined.get(key)}, and prints that the action CONTINUES WITHOUT IT — the narrowest grant is the `
              + 'one the step needs'
            : `${label}: LEAST PRIVILEGE IS HELD AS A REQUIREMENT AND NOT AS A PREFERENCE — job \`${job.name}\` holds `
              + `\`${key}: ${job.effective[key]}\` AND NO SITE OF THAT JOB DOCUMENTS ANY NEED FOR IT (effective set `
              + `${JSON.stringify(job.effective)}, resolved from ${job.from}). A grant declared at the WORKFLOW level `
              + 'is held by EVERY job the file declares, so `attestations: write` declared there would hand a job '
              + 'that attests nothing a repository write it never uses');
      }
    }
    // (·) THE TABLE'S OWN TWO DIRECTIONS: no row is unused, so no row is a stale requirement left to drift.
    for (const a of ACTION_GRANTS) {
      assert.ok(r.sites.some((s) => s.kind === 'uses' && s.subject === a.uses),
        `${label}: the requirement table's row for \`${a.uses}\` matches NO \`uses:\` site in the file — a row no site `
        + 'uses is a stale requirement, and the table is AMENDED rather than left to drift');
    }
    for (const g of RUN_GRANTS) {
      assert.ok(r.runs.some((s) => s.requirement === g),
        `${label}: the requirement table's row \`${g.what}\` matches no site in the file`);
    }
    return { ...r, rows, censusRows };
  };
  // ---- (1) THE SHIPPED FILE, WHICH THE INSTRUMENT MUST PASS ----
  const shipped = driveGrants(grantCodeOf(grantBytes), { label: 'the shipped workflow, at the grant guard' });
  const usesSites = shipped.sites.filter((s) => s.kind === 'uses');
  const rawUses = grantCodeOf(grantBytes).split('\n').filter((l) => /^\s+uses:\s*\S+\s*$/.test(l)).length;
  assert.ok(rawUses >= 1, `the file's own \`uses:\` sites are really read (${rawUses})`);
  assert.equal(usesSites.length, rawUses,
    `THE CENSUS ENUMERATES EVERY \`uses:\` SITE IN THE FILE and invents none: ${usesSites.length} against the file's `
    + `own ${rawUses}`);
  const mainGrant = shipped.jobs.find((j) => j.name === 'main');
  const platformGrant = shipped.jobs.find((j) => j.name === 'platform');
  assert.ok(mainGrant && platformGrant,
    '`release.md §1.4`: the `platform` job and the `main` job are both declared, and both were resolved');
  assert.ok(mainGrant.own !== null,
    'THE `main` JOB DECLARES ITS OWN `permissions:` BLOCK — WHICH REPLACES THE WORKFLOW-LEVEL ONE FOR THAT JOB '
    + 'RATHER THAN MERGING WITH IT, so its effective set is its own block, WHOLE, and the workflow block above it '
    + 'is not read beside it');
  assert.deepEqual(mainGrant.effective, { contents: 'read', 'id-token': 'write', attestations: 'write' },
    '`release.md §1.4` step 6 / `§1.3` item 2 — THE THREE KEYS THE `main` JOB CARRIES: `attestations: write` IS THE '
    + 'GRANT THE TAGGED RUN WAS MISSING (`POST /repos/{owner}/{repo}/attestations`; `Error: Failed to persist '
    + 'attestation: Resource not accessible by integration`), AND `contents: read` · `id-token: write` ARE '
    + 'REDECLARED BESIDE IT because the job block replaces the workflow one rather than merging with it — drop '
    + 'either and the job loses a permission the workflow block grants');
  assert.deepEqual(platformGrant.effective, { contents: 'read', 'id-token': 'write' },
    'AND THE FIVE-LEG `platform` MATRIX HOLDS NO `attestations: write`: it attests nothing, so no repository write '
    + 'is granted to it — the placement ruling above, asserted at the shipped file');
  assert.ok(mainGrant.sites.some((s) => s.kind === 'uses' && s.subject.startsWith('actions/attest-build-provenance@')),
    'the attesting action really runs in `main` (and nowhere else), which is WHY the third grant belongs at that job');
  // ---- (2) THE CONTROLS, EACH BROKEN IN ONE PLACE AND EACH REQUIRED TO FAIL THE SAME INSTRUMENT ----
  const grantVerdict = (fn) => { try { fn(); return null; } catch (err) { return err; } };
  /** the move (B) and (B′) share: the grant LEAVES the job and LANDS at the workflow level. */
  const moveToWorkflow = (t) => t
    .replace('\n      attestations: write\n', '\n')
    .replace('\n  id-token: write\n', '\n  id-token: write\n  attestations: write\n');
  const movedBytes = moveToWorkflow(grantBytes);
  /** (B′) the charitable shape of the same move: the `main` job's own block is REMOVED, so the workflow-level
   *  grant is the only one and it really does reach the attesting action. */
  const movedWholeBytes = movedBytes.replace('\n    permissions:\n      contents: read\n      id-token: write\n', '\n');
  const grantControls = [
    // (A) THE RUN THAT HAPPENED, DRIVEN AS A RED CELL: the grant is absent from the job entirely.
    { what: '(A) `attestations: write` removed from the `main` job — THE RUN THAT HAPPENED',
      mutate: (t) => t.replace('\n      attestations: write\n', '\n'),
      injected: [], kept: ['\n    permissions:\n      contents: read\n      id-token: write\n'],
      gone: ['\n      attestations: write\n'],
      names: ['attestations: write', 'attest-build-provenance', 'main', 'REPLACES', 'DECLARED NOWHERE IN THE FILE'] },
    // (B) THE SAME GRANT, DECLARED ONE SCOPE TOO WIDE, THE JOB'S OWN BLOCK LEFT IN PLACE — and the job block
    // REPLACES the workflow block, so the grant never reaches the action that needs it.
    { what: '(B) `attestations: write` MOVED TO THE WORKFLOW LEVEL, the `main` job\'s own block left in place',
      mutate: moveToWorkflow,
      injected: ['\n  attestations: write\n'], gone: ['\n      attestations: write\n'],
      names: ['attestations: write', 'main', 'REPLACES', 'WORKFLOW-LEVEL BLOCK GRANTS'] },
    // (B′) THE SAME MOVE MADE TO WORK: the job's own block removed, so sufficiency IS satisfied and the
    // least-privilege clause ALONE is what fails it.
    { what: '(B′) THE SAME MOVE WITH THE JOB\'S OWN BLOCK REMOVED, so the workflow grant is the only one',
      mutate: () => movedWholeBytes,
      injected: ['\n  attestations: write\n'], gone: ['\n    permissions:\n'],
      names: ['LEAST PRIVILEGE', 'platform', 'attestations: write',
        'the WORKFLOW-LEVEL block, which no job block replaces for this job'],
      notNames: ['DO NOT SATISFY EVERY DOCUMENTED REQUIREMENT'] },
    // (C) THE REPLACEMENT SEMANTICS' OWN TRAP: the block kept, reduced to the one new key.
    { what: '(C) the `main` job\'s block REDUCED TO `attestations: write` ALONE',
      mutate: (t) => t.replace('\n    permissions:\n      contents: read\n      id-token: write\n      attestations: write\n',
        '\n    permissions:\n      attestations: write\n'),
      injected: ['\n    permissions:\n      attestations: write\n'], gone: ['\n      id-token: write\n'],
      names: ['contents: read', 'id-token: write', 'REPLACES', 'main'] },
    // (D1) THE GRANT MISSPELLED — a key the host's domain does not carry, refused before any step runs.
    { what: '(D1) `attestations: write` MISSPELLED as `attestation: write`',
      mutate: (t) => t.replace('\n      attestations: write\n', '\n      attestation: write\n'),
      injected: ['\n      attestation: write\n'], gone: ['\n      attestations: write\n'],
      names: ['attestation', 'attestations', 'DOMAIN CARRIES'] },
    // (D2) THE GRANT PRESENT BY NAME AND SHORT OF ITS VALUE.
    { what: '(D2) `attestations: write` declared as `attestations: read`',
      mutate: (t) => t.replace('\n      attestations: write\n', '\n      attestations: read\n'),
      injected: ['\n      attestations: read\n'], gone: ['\n      attestations: write\n'],
      names: ['attestations: read', 'attestations: write', 'main'] },
    // (E) THE OTHER SIDE OF THE SAME PROPERTY, DRIVEN BECAUSE A `declined` ENTRY THAT IS NEVER MEASURED IS A CLAIM:
    // the key the attesting action's own documentation declines.
    { what: '(E) `artifact-metadata: write` ADDED beside the three — the key the attesting action declines',
      mutate: (t) => t.replace('\n      attestations: write\n', '\n      attestations: write\n      artifact-metadata: write\n'),
      injected: ['\n      artifact-metadata: write\n'], gone: [],
      names: ['artifact-metadata', 'DECLINES', 'main'] },
  ];
  const grantVerdicts = [];
  for (const { what, mutate, injected = [], kept = [], gone, names, notNames = [] } of grantControls) {
    const control = mutate(grantBytes);
    assert.ok(control !== grantBytes,
      `THE CONTROL REALLY BREAKS THE CLAUSE IT NAMES (${what}): the file's own bytes moved`);
    for (const lit of injected) {
      assert.ok(control.includes(lit), `(${what}) the control really carries \`${lit.trim()}\``);
      assert.equal(grantBytes.includes(lit), false,
        `(${what}) and the shipped file carries no such byte, so the verdict below comes from the control and not from `
        + 'the tree');
    }
    for (const lit of kept) {
      assert.ok(control.includes(lit), `(${what}) the control really KEEPS the fragment it breaks around: `
        + `\`${lit.trim()}\``);
    }
    for (const lit of gone) {
      assert.equal(control.includes(lit), false, `(${what}) the control no longer carries \`${lit.trim()}\``);
      assert.equal(grantBytes.includes(lit), true,
        `(${what}) which the shipped file DOES carry, so the removal is a real removal`);
    }
    const verdict = grantVerdict(() => driveGrants(grantCodeOf(control), { label: `the control for ${what}` }));
    assert.ok(verdict !== null, `THE CONTROL MUST FAIL (${what}): the instrument catches it — a control that cannot `
      + 'fail is worse than none (`PUB-R-5`)');
    for (const named of names) {
      assert.ok(verdict.message.includes(named),
        `(${what}) AND ITS VERDICT NAMES WHAT IT CAUGHT — \`${named}\` must stand in: ${String(verdict.message).slice(0, 320)}`);
    }
    for (const notNamed of notNames) {
      assert.equal(verdict.message.includes(notNamed), false,
        `(${what}) AND IT FAILS ON THE CLAUSE THAT OWNS THIS SHAPE AND NOT ON ANOTHER: \`${notNamed}\` is absent from `
        + `its verdict, so the failure is measured at its own home (${String(verdict.message).slice(0, 320)})`);
    }
    grantVerdicts.push(`${what.padEnd(104)} → FAIL: `
      + `${String(verdict.message).replace(`the control for ${what}: `, '').split('\n')[0].slice(0, 190)}`);
  }
  // **THE MEASURED RESULTS, PRINTED SO THE RECORD CAN CITE THEM RATHER THAN THIS CELL'S INTENTION.**
  console.log(`\n[P-PUB-8/S-TAG] THE GRANT GUARD — THE EFFECTIVE-PERMISSION RESOLUTION RULE, THE \`uses:\` CENSUS AND THE `
    + `PLACEMENT RULING (\`release.md §1.4\` step 6; \`§1.3\` item 2; \`§5.3\` item 1):\n`
    + '  the rule  : (1) the workflow-level `permissions:` block is the only top-level one; (2) A JOB THAT\n'
    + '               DECLARES ITS OWN BLOCK REPLACES IT FOR THAT JOB RATHER THAN MERGING WITH IT, so the\n'
    + '               job block IS the effective set, whole; (3) otherwise the workflow block IS; (4) every\n'
    + '               `uses:` and `run:` site is read against the effective set of THE JOB IT RUNS IN.\n'
    + '               (Every line number printed here is an offset in the COMMENT-STRIPPED code, not a line of\n'
    + '               the raw file: the file\'s own prose names the refused forms in order to refuse them.)\n  '
    + shipped.rows.join('\n  ')
    + `\n  the census: ${usesSites.length} \`uses:\` sites in the file, EVERY ONE carried in this cell's own `
    + `documented-requirement table with its source; ${shipped.runs.length} \`run:\` site(s) that document a permission `
    + 'need (the OIDC federation, which no action carries)\n'
    + `  ---- the census, every site, its job, its documented requirement and that requirement's source ----\n`
    + shipped.censusRows.join('\n')
    + `\n  ---- the controls, each measured against the shipped instrument ----\n  `
    + grantVerdicts.join('\n  ')
    + '\n  ---- the ruling, stated because no spec clause makes it ----\n'
    + '  NO CLAUSE OF `docs/specs/storeroom-publish/**` DECIDES JOB-LEVEL VERSUS WORKFLOW-LEVEL (that part\'s own\n'
    + '  permission cell is stale and is the SpecWriter\'s, and no spec byte was touched here), SO THIS PASS RULES\n'
    + '  PLAINLY: LEAST PRIVILEGE IS A REQUIREMENT AND NOT A PREFERENCE. The deciding reading is `release.md §1.4`\n'
    + '  step 6 — THE ATTESTING ACTION IS A STEP OF `main` — read with the file\'s own placement: a workflow-level\n'
    + '  grant is held by EVERY job the file declares, so (B) would hand the five-leg `platform` matrix a\n'
    + '  repository write it never uses. (B) FAILS, (B′) FAILS ON LEAST PRIVILEGE ALONE.\n'
    + '  ---- THE CLASS, NAMED AT ITS EIGHTH INSTANCE ----\n'
    + '  A DECLARED STEP WHOSE GRANT THE CONFIGURATION NEVER MAKES IS A CLAIM ABOUT A CAPABILITY THE WORLD DOES\n'
    + '  NOT OFFER IT, AND ITS ONLY FALSIFIER WAS A RUN — the same shape as the retired runner label whose only\n'
    + '  falsifier was a dispatch, and the unbuilt link matrix whose only falsifier was a linker.');
});

cell('P-PUB-8', 'S-TAG the six artefacts\' order and the one version they share', async () => {
  // `§3.2` item 2 / `PUB-DD-10` / `distribution.md §6.3` / `release.md §2.2`: the five platform artefacts'
  // `version` equals the MAIN package's, the main package's `optionalDependencies` pins the five at EXACTLY
  // that version, and the five are published BEFORE the main package — which is published LAST, ALWAYS.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const order = [...FIVE_NAMES, 'provident-storeroom'];
  assert.equal(order.length, 6, '`distribution.md §6.3`: SIX artefacts = 5 platform + 1 main');
  assert.equal(order[order.length - 1], 'provident-storeroom', 'the MAIN package publishes LAST, ALWAYS');
  for (const name of FIVE_NAMES) {
    assert.equal(manifest.optionalDependencies[name], manifest.version,
      `the coupling rule: ${name}'s pin equals the main package's own \`version\``);
    assert.ok(!/[~^*><]/.test(manifest.optionalDependencies[name]), 'five exact pins, no range');
  }
  const platformsDir = join(PKG_DIR, 'platforms');
  if (existsSync(platformsDir)) {
    for (const label of readdirSync(platformsDir)) {
      const manifestPath = join(platformsDir, label, 'package.json');
      if (!existsSync(manifestPath)) continue;
      const m = JSON.parse(readFileSync(manifestPath, 'utf8'));
      assert.equal(m.version, manifest.version,
        `\`PAR-PUB-18\`: ${label}'s version equals the main package's, character for character`);
    }
  }
});

cell('P-PUB-8', 'S-TAG the partial-publish arm is declared, both windows', async () => {
  // `§3.3` / `PUB-DD-5` / `release.md §3`: ONE clause covering BOTH windows — a failure BEFORE the main
  // package is recovered IN PLACE on the same version, a failure AFTER it is DEPRECATE-AND-RE-PUBLISH at
  // the next patch; a release attempted with NO declared arm is a STOP CONDITION (`J`).
  const release = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'release.md'), 'utf8');
  assert.ok(/RECOVER IN PLACE ON THE SAME VERSION/.test(release), 'the before-window arm is declared');
  assert.ok(/DEPRECATE-AND-RE-PUBLISH AT THE NEXT PATCH/.test(release), 'the after-window arm is declared');
  assert.ok(/A RELEASE ATTEMPTED WITH NO DECLARED ARM/.test(release), 'the no-arm STOP CONDITION is declared');
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  // the order that MAKES the arm safe is the main package's LAST place, and it is a property of the
  // release, so no manifest byte may contradict it: the five pins resolve only once the five are published.
  assert.equal(Object.keys(manifest.optionalDependencies ?? {}).length, 5,
    'a publish with `k` of five landed is refused by the order\'s own rule');
});

cell('P-PUB-8', 'S-LAYER every figure this unit reports carries its SITE and its LAYER', async () => {
  // `§4.5` item 4 / `AV-16` / `§6`: the ONE figure this unit's gates owe is the red set's reported failing
  // set, printed with its SITE and its LAYER BEFORE ANY IMPLEMENTATION, and every figure the unit reports
  // carries both. **NO `APP`-GREEN IS CLAIMED FROM ANY NODE GREEN OR ANY `cargo` LEG** (`§4.5` item 3).
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const figure = {
    value: 'the red set\'s reported failing set',
    site: join('bindings', 'js', 'test', 'publish.test.mjs'),
    layer: 'ENVELOPE/PURE',
    app: 'NONE',
  };
  assert.equal(figure.layer, 'ENVELOPE/PURE', '`acceptance.md §5.2` row 1: this unit\'s red set is `ENVELOPE/PURE`');
  assert.equal(figure.app, 'NONE', '`acceptance.md §5.3` item 1: a node-suite green is never `APP`-green');
  assert.ok(existsSync(join(REPO_ROOT, figure.site)), 'the figure\'s SITE is this file, at `PUB-DD-24`\'s path');
  assert.equal(manifest.name !== undefined, true, 'the figure\'s site is a real home');
  // an install-time figure is NOT this layer\'s, and `LIVE/INSTALL` may not be reported at gates 1–4
  const acceptance = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'acceptance.md'), 'utf8');
  assert.ok(/CANNOT RUN BEFORE THE RELEASE ACT/.test(acceptance),
    '`§4.4`: running it early is a STOP CONDITION (`I`), so no install-time figure is claimed here');
  assert.ok(/NOT AN `APP` FIGURE/.test(acceptance), 'and an install-time figure is never an `APP`-green');
});

cell('P-PUB-8', 'S-LAYER no released-bytes digest is claimed by this pass', async () => {
  // `PUB-DD-13` / `§6`\'s `RECORDED-GAP`: THE PUBLISHED BYTES ARE TIED TO NO FIGURE AT THIS UNIT\'S GATES,
  // and the absence of the tie is DECLARED. A digest invented here, or a released-bytes digest claimed as
  // measured by a pre-release pass, is a failure.
  const contract = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'contract.md'), 'utf8');
  assert.ok(/RECORDED-GAP/.test(contract), 'the absence is DECLARED as a `RECORDED-GAP`');
  assert.ok(/a digest invented here/.test(contract), 'and an invented digest is named as a failure');
  const packageBytes = readFileSync(join(PKG_DIR, 'package.json'), 'utf8');
  assert.ok(!/sha512|integrity/.test(packageBytes), 'no integrity field is invented in a tracked byte');
});

// ---------------------------------------------------------------------------------------------
// THE GUARD BLOCK — the JS unit's `113`-cell leg must STILL resolve in place (rung two) and stay green,
// because the rename (`Q3-1`) has not landed and the move is the implementer's; this set must not
// anticipate it (`acceptance.md §5.4` item 4; `PUB-CF-6`).
//
// **⟶ RECONCILED BY THE PRE-TAG PASS (`role_test_writer`): THAT CLAUSE'S PREMISE HAS MOVED, AND IT IS
// RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER — *"because the rename (`Q3-1`) has not
// landed and the move is the implementer's; this set must not anticipate it"*.** **THE RENAME HAS LANDED:
// `bindings/js/package.json`'s `name` is the unscoped `provident-storeroom` (`A82`), the entry's own
// self-reference resolves through that same spelling, and the five platform names stay SCOPED — which is
// what the second cell of this very block asserts at its own bytes.** **SO THE GUARD IS NO LONGER A GUARD
// AGAINST ANTICIPATION BUT THE IN-PLACE LEG'S STANDING GREEN** (`§1.1` item `2`; `PUB-DD-18`): rung two is the
// checkout's own artefact and every battery that exists today resolves through it. **NO ASSERTION MOVES BY
// THIS ANNOTATION** — the two cells below are unedited, and the sentence above is kept as the reading it was.
// ---------------------------------------------------------------------------------------------
cell('GUARD', 'the real entry still resolves IN PLACE at rung two', async () => {
  // `§1.1` item 2 / `P-PUB-1`'s `S-INPLACE` / `PUB-DD-18`: the in-place developer loop and every battery
  // that exists today resolve at rung two. Driven against the REAL package AT ITS REAL LOCATION — no
  // scratch copy, no fake artefact — in a FRESH PROCESS, so the rung-two load is observed rather than
  // assumed (a module already loaded in this process's cache would show no load at all).
  const out = execFileSync(process.execPath, ['-e', `
    const loads = [];
    const real = process.dlopen;
    process.dlopen = function counting(...args) { loads.push(String(args[1])); return real.apply(this, args); };
    import(${JSON.stringify('file://' + join(PKG_DIR, 'index.mjs'))}).then(async (mod) => {
      const store = mod.storeCreate({ journalLength: 8, listeners: [] });
      mod.write(store, ['k'], 'mem', 'v');
      const value = mod.read(store, ['k']);
      process.stdout.write('__PUBRED__' + JSON.stringify({
        loads, value, members: Object.keys(store).sort(),
        verbs: Object.keys(mod).sort(),
      }) + '\\n');
    }).catch((e) => { process.stdout.write('__PUBRED__' + JSON.stringify({ loads, error: String(e && e.message ? e.message : e) }) + '\\n'); });
  `], { encoding: 'utf8', cwd: REPO_ROOT, timeout: 60000 });
  const line = out.split('\n').find((l) => l.startsWith('__PUBRED__'));
  assert.ok(line, `the in-place drive produced no report (stdout: ${out.slice(0, 300)})`);
  const r = JSON.parse(line.slice('__PUBRED__'.length));
  assert.equal(r.error, undefined, `the in-place resolution still works: ${r.error}`);
  assert.equal(r.loads.length, 1, 'exactly ONE `.node` load, reached through the entry (`S-ONE-ADDON`)');
  assert.ok(r.loads[0].endsWith(RUNG_TWO_TAIL), `the in-place load is rung two's path (${r.loads[0]})`);
  assert.ok(r.loads[0].startsWith(PKG_DIR + sep), 'and it is INSIDE the package, beside the entry module');
  assert.equal(r.value, 'v', 'the store works through that load');
  assert.deepEqual(r.members, ['off', 'on', 'register'], 'the instance\'s own member set is unmoved');
  assert.deepEqual(r.verbs,
    ['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write'],
    'the entry carries the EIGHT verbs and NOTHING else');
});

cell('GUARD', 'the in-place loop still resolves and works at rung two', async () => {
  // `acceptance.md §5.4` item 4 / `PUB-CF-6`: the `A82`+`A84` two-home amendment is a PRE-CONDITION of the
  // green rather than a follow-on. **AND `Q3-1`'s RENAME HAS LANDED: the entry's own identity is
  // `provident-storeroom`, so the self-reference this cell resolves through names THE SAME SPELLING the
  // manifest declares** — the five platform packages keep their SCOPED names (`resolution.md §3.1`).
  const api = await import('provident-storeroom');
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const store = api.storeCreate({ journalLength: 8, listeners: [] });
  assert.deepEqual(Object.keys(store).sort(), ['off', 'on', 'register'], 'the instance\'s own member set is unmoved');
  api.write(store, ['k'], 'mem', 'v');
  assert.equal(api.read(store, ['k']), 'v', 'the store works in place at rung two');
  assert.equal(manifest.name, 'provident-storeroom',
    '`Q3-1`: the package\'s identity is the unscoped `provident-storeroom`, which is the spelling the '
    + 'self-reference above resolves through — and the five platform names stay SCOPED');
  assert.ok(!FIVE_NAMES.some((n) => n === manifest.name),
    'the main package is NOT one of the five scoped platform names (`resolution.md §3.1`)');
});
