// tests/e2e/installed/install-support.mjs
// **THE `LIVE/INSTALL` BATTERY'S OWN HELPER** — `docs/L1/test-stratification.md §2.8` declares it: *"Its
// helpers, under `D-7`: `tests/e2e/installed/install-support.mjs` — the clean-directory minting, the
// `npm pack` + `npm install` calls, the driver/preload staging that puts the import site inside the
// installed tree, and the label constant. It consumes no `O4` helper, and neither does run A's."*
//
// **SO NOTHING IN THIS FILE IS IMPORTED FROM `bindings/js/test/`, AND THAT IS A RULE RATHER THAN AN
// ACCIDENT** (`D-7`: each run carries its own helpers). In particular the reachability walk below is THIS
// battery's own: `bindings/js/test/pack-reachability.mjs` is an `O4` helper and is not consumed here, even
// though the invariant it measures is the same one (`D-4`). The two implementations may disagree and the
// disagreement is a FINDING; neither is read as the other's authority.
//
// ---------------------------------------------------------------------------------------------
// WHAT THE INSTRUMENT IS (`docs/specs/storeroom-publish/contract.md §4.2` item 1, quoted at `§2.8`)
// ---------------------------------------------------------------------------------------------
//
//   "a **real package manager** operating on a **packed or released tarball** in a directory with **no
//    repository in its ancestry and no `build/Release` beside the entry**, plus **one real Node process**"
//
// **EVERY PIECE OF THAT SENTENCE IS A FUNCTION HERE:**
//   * `runNpm` is the real package manager — `npm pack` and `npm install`, never a hand-rolled copy of what
//     a packer would have done, because the defect this battery exists to see (`strata/decisions.md`'s
//     FINDING *"the subdivision broke the PACKAGE, and every test is green anyway"*) is a defect of WHAT
//     THE MANIFEST ACTUALLY PACKS. A copy made by this file would be this file's opinion of the allowlist.
//   * `mintWorkRoot` + `mintCleanDirectory` are the clean directory, minted under the operating system's
//     temporary area (`/tmp`'s class of path), and `repositoryInAncestry` proves the ancestry names no
//     repository. Everything minted there is deleted by the caller at the end, pass or fail.
//   * `packDirectory` stages a byte-for-byte COPY of a package directory and packs the copy, because the
//     pack must not write a tarball into the tracked tree, and because two of the composition's own acts —
//     the release's `LICENSE` copy (`PUB-DD-11`; `contract.md §2.3` item 2) and the host platform
//     artefact's staging (`D-12`) — are acts ON THE STAGE.
//   * `writeDriver` + `PROBE_SOURCE` are the one real Node process: a driver staged INSIDE the clean
//     directory, importing the packaged name BY NAME so the resolution is the installed tree's, under a
//     preload that records every module resolution the entry performs. That last part is what turns "rung
//     one fired" from an inference into an observation (`INSTALL-08`).
//
// ---------------------------------------------------------------------------------------------
// THE INSTALL ROUTE, DECLARED HERE BECAUSE `D-12` RECORDS IT AS THE RISK (`D-12`, verbatim)
// ---------------------------------------------------------------------------------------------
//
//   "The main package's five `optionalDependencies` are **pinned exactly**, so a plain `npm install` of the
//    packed main tarball will attempt to **resolve the platform package from the registry** unless the pin
//    is satisfied locally. **Which route solves that — install order, `--omit=optional` then a manual
//    placement, a local resolution route, or a rewritten dependency — is L1's and L2's to declare; the
//    permission this ruling gives is to pack and install locally, not a mechanism.**"
//
// **THE ROUTE TAKEN IS INSTALL ORDER PLUS A LOCAL RESOLUTION, AND IT CONTACTS NO REGISTRY:**
//
//   1. `npm install <main tarball>` — the command `INSTALL-03` drives — run with `--offline` and with a
//      battery-local `--cache`, so npm has no cache to satisfy a registry lookup with and no permission to
//      make one. Measured: it installs THE ONE PACKAGE and exits `0`; the five exact pins are recorded in
//      the clean project's lock as `optionalDependencies` of the installed manifest and nothing tries to
//      fetch them.
//   2. `npm install <host platform tarball> --no-save` — a SECOND real `npm install`, of the locally packed
//      tarball `D-12` permits, into the same clean directory. `--no-save` keeps the clean project's own
//      manifest a plain one-dependency consumer while the platform package lands exactly where npm hoists an
//      optional dependency for its platform: `node_modules/@auspicion/<host name>/`. The pin is therefore
//      satisfied LOCALLY — by a package manager, from a tarball this battery packed — and no dependency
//      string is rewritten and no file is copied by hand.
//   3. The four non-host names are packed too (`INSTALL-09`'s one arm each) and each is refused by the same
//      package manager with `EBADPLATFORM`, which is the driven evidence that THIS host cannot install —
//      let alone load — any of them.
//
// **WHY NO REGISTRY IS REACHABLE, STATED AS THE MECHANISM AND NOT AS A HOPE:** every npm call carries
// `--offline` (npm answers from its cache or errors; it does not open a socket), `--no-audit` and
// `--no-update-notifier` (the two features that would), and `--cache` pointed inside the battery's own
// work root, which is minted empty and deleted at the end. No step names a registry, a version range or a
// remote URL; the two install subjects are absolute paths to locally packed `.tgz` files.

import { spawnSync } from 'node:child_process';
import {
  cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// =====================================================================================================
// THE LABEL, THE PLACEMENT AND THE COMMAND — `§2.8`'s own three, spelled once
// =====================================================================================================

/** `§2.8`: **Label string `LIVE/INSTALL`** (preset: `installed`), **`APP` LAYER `NONE`**. */
export const LAYER = 'LIVE/INSTALL';
export const PRESET = 'installed';
export const APP_LAYER = 'NONE';

/** `§2.8`: **Command `node tests/e2e/installed/live-install.mjs`, taken at the repository root**; it is a
 *  **runner, not a `node --test` file**. */
export const COMMAND = 'node tests/e2e/installed/live-install.mjs';
export const RUNNER_RELATIVE_PATH = 'tests/e2e/installed/live-install.mjs';
export const HELPER_RELATIVE_PATH = 'tests/e2e/installed/install-support.mjs';
export const SCOPE_RELATIVE_PATH = 'tests/e2e/installed/';

/** The battery's own record home — the place `D-8` (iii)'s antecedent can be recorded (`§2.9`, `Q18`). */
export const EVIDENCE_RELATIVE_PATH = 'tests/e2e/installed/license-row-evidence.json';

/** The repository root, from this file's own URL: `tests/e2e/installed/` is three levels down. */
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const PACKAGE_DIR = join(REPO_ROOT, 'bindings', 'js');
export const PLATFORMS_DIR = join(PACKAGE_DIR, 'platforms');

/** `INSTALL-08`'s second subject: the artefact the checkout has built, which is what a platform package
 *  carries once the release's assembly step has copied it (`D-12`). */
export const BUILT_ADDON = join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/** The licence text the release's assembly step copies byte-for-byte into each of the six artefacts
 *  (`contract.md §2.3` item 2; `PUB-DD-11`). Its home in the repository is the root, never `bindings/js/`
 *  — a `LICENSE` file copied into `bindings/js/` is `DD-43`'s REFUSED arm. */
export const REPO_LICENSE = join(REPO_ROOT, 'LICENSE');

/** **THE FIVE DECLARED NAMES, WITH THE PAIR EACH ONE ANSWERS** (`contract.md §1.2`'s operative column,
 *  `§1.3`; `resolution.md §4.1`). The name is what rung one `require`s; the pair is the runtime key that
 *  selects it. `INSTALL-07` compares these spellings against the manifest's and the entry's table's;
 *  `INSTALL-09` uses the pair to prove a non-host name cannot be installed here. */
export const PLATFORM_NAMES = [
  { label: 'linux-x64', platform: 'linux', arch: 'x64', name: '@auspicion/provident-storeroom-js-linux-x64-gnu' },
  { label: 'linux-arm64', platform: 'linux', arch: 'arm64', name: '@auspicion/provident-storeroom-js-linux-arm64-gnu' },
  { label: 'darwin-x64', platform: 'darwin', arch: 'x64', name: '@auspicion/provident-storeroom-js-darwin-x64' },
  { label: 'darwin-arm64', platform: 'darwin', arch: 'arm64', name: '@auspicion/provident-storeroom-js-darwin-arm64' },
  { label: 'win32-x64', platform: 'win32', arch: 'x64', name: '@auspicion/provident-storeroom-js-win32-x64-msvc' },
];

/** The host's own key — read from the process that runs the battery, because the battery's own process is a
 *  real runtime and `INSTALL-08`'s subject is *this* host's name. */
export const HOST_PLATFORM = process.platform;
export const HOST_ARCH = process.arch;

/** The host's declared row, or `null` where the host's pair is not one of the five. **A `null` here is not
 *  an error and never a red: it is the uncovered-key state, and the cells that need a covered host report
 *  `NONRUN` with that reason rather than a verdict** (`§2.8`'s cell set presumes a covered host for
 *  `INSTALL-08`; `resolution.md §2.2` is the state an uncovered host reaches instead). */
export function hostRow() {
  return PLATFORM_NAMES.find((row) => row.platform === HOST_PLATFORM && row.arch === HOST_ARCH) ?? null;
}

/** The four names that are NOT this host's — `INSTALL-09`'s one arm each. */
export function nonHostRows() {
  const host = hostRow();
  return PLATFORM_NAMES.filter((row) => row !== host);
}

// =====================================================================================================
// THE MESSAGES THE LOAD PATH'S ARM CARRIES — reproduced here so a cell can compare STRINGS
// =====================================================================================================
//
// **`contract.md §1.4` item 6, arm (b), and `§1.5` item 6's governing reading** (read with `PUB-DD-26`):
// the clause is the store's generator's own, byte-for-byte; a single subject is rendered into its
// `'<subject>'` slot; where BOTH rungs were tried the TWO subjects are rendered by mapping the generator's
// own slot across them and joining the two renderings by `', '` — rung one first, rung two second — with
// the clause's own slot then standing around the join, which is why the two-subject rendering opens and
// closes with two apostrophes.

export const ABSENT_CLAUSE = 'is not reachable at construction, the path must exist or the application must be able to write it';

/** The declared absent form's `message` for ONE subject (`§1.4` item 2; the uncovered-key reading). */
export function singleSubjectMessage(subject) {
  return `'${subject}' ${ABSENT_CLAUSE}`;
}

/** The declared absent form's `message` for BOTH subjects (`§1.5` item 6; `PUB-DD-26`'s three parts). */
export function twoSubjectMessage(first, second) {
  return `'${[first, second].map((subject) => `'${subject}'`).join(', ')}' ${ABSENT_CLAUSE}`;
}

// =====================================================================================================
// THE CLEAN DIRECTORY — minted under the operating system's temporary area, and its ancestry PROVEN
// =====================================================================================================

/** **THE WORK ROOT.** `mkdtempSync` under `os.tmpdir()`, so the path's class is the one `contract.md §4.2`
 *  item 1 names and the battery never mints inside the repository. **The caller deletes it at the end,
 *  pass or fail** — the runner does, in a `finally`. */
export function mintWorkRoot(prefix = 'storeroom-installed-') {
  return mkdtempSync(join(tmpdir(), prefix));
}

/** **THE CLEAN DIRECTORY.** A directory that npm will install INTO; its ancestry is asserted separately by
 *  `repositoryInAncestry`, because minting it beside a repository would silently retire the instrument's
 *  own premise. */
export function mintCleanDirectory(workRoot, name) {
  const directory = join(workRoot, name);
  mkdirSync(directory, { recursive: true });
  return directory;
}

/** The clean project's own manifest: a plain one-dependency consumer, and nothing else. */
export function writeCleanManifest(cleanDirectory) {
  writeFileSync(
    join(cleanDirectory, 'package.json'),
    `${JSON.stringify({ name: 'storeroom-live-install-clean', version: '0.0.0', private: true }, null, 2)}\n`,
    'utf8',
  );
}

/** Every ancestor of a directory, nearest first, up to and including the filesystem root. */
export function ancestryOf(directory) {
  const chain = [];
  let current = resolve(directory);
  for (;;) {
    chain.push(current);
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return chain;
}

/** **THE ANCESTRY TEST `contract.md §4.2` ITEM 1 REQUIRES: does any ancestor name a repository?** A `.git`
 *  directory or file at any ancestor makes the directory a member of a working tree, which is the premise
 *  the instrument must not have. The repository's own root is refused by name too, so a checkout that is
 *  not a git working tree cannot slip past the test either. */
export function repositoryInAncestry(directory) {
  const findings = [];
  for (const ancestor of ancestryOf(directory)) {
    if (ancestor === resolve(REPO_ROOT)) findings.push(`ancestor-is-the-repository-root:${ancestor}`);
    for (const entry of ['.git', '.hg', '.svn']) {
      if (existsSync(join(ancestor, entry))) findings.push(`vcs-entry:${join(ancestor, entry)}`);
    }
  }
  return findings;
}

// =====================================================================================================
// THE REAL PACKAGE MANAGER — `npm pack` and `npm install`, and the flags that keep the network out
// =====================================================================================================

/** **THE FLAGS EVERY npm CALL CARRIES, AND EACH ONE IS A REASON THE BATTERY CANNOT REACH A REGISTRY:**
 *  `--offline` (answer from the cache or fail; never open a socket), `--no-audit` and
 *  `--no-update-notifier` (the two npm features that would), `--cache` pointed inside the work root
 *  (minted empty by this run), `--loglevel=error` (so a refusal's own line is the line a cell quotes). */
function npmArguments(workRoot, args) {
  return [
    ...args,
    '--offline',
    '--no-audit',
    '--no-fund',
    '--no-update-notifier',
    '--cache', join(workRoot, 'npm-cache'),
    '--loglevel=error',
  ];
}

/** Run npm and return its own record — status, stdout, stderr, and the exact command line, which the report
 *  prints (`contract.md §4.2` item 2: the site names the pack/install command). */
export function runNpm(args, { cwd, workRoot, env = {} }) {
  const commandArguments = npmArguments(workRoot, args);
  const result = spawnSync('npm', commandArguments, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, npm_config_offline: 'true', ...env },
  });
  return {
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    command: `npm ${commandArguments.join(' ')}`,
    cwd,
  };
}

/** The first `npm error` line of a refusal, or the first non-empty line: a cell quotes the package manager's
 *  own words rather than this battery's summary of them. */
export function firstErrorLine(result) {
  const lines = `${result.stderr}\n${result.stdout}`.split('\n').map((line) => line.trim()).filter(Boolean);
  return lines.find((line) => line.startsWith('npm error')) ?? lines[0] ?? '(no output)';
}

/** Whether npm's own output records a network failure. A battery that reached for a socket would print one
 *  of these, and the runner reports the count so the no-network claim is measured rather than asserted. */
export function networkFailures(result) {
  const text = `${result.stderr}\n${result.stdout}`;
  return ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET', 'network']
    .filter((token) => new RegExp(token, 'i').test(text));
}

/** **`npm pack` OF A STAGED DIRECTORY.** `--pack-destination` is the destination, so the tarball never
 *  lands in the package directory being packed. **The returned member set carries PATHS ONLY**: npm's
 *  `--json` report also carries `shasum` and `integrity`, and **this helper drops both before the runner
 *  can print them, because `PUB-DD-13` forbids the battery minting a digest figure** (`INSTALL-13`). */
export function packDirectory(directory, destination, workRoot) {
  mkdirSync(destination, { recursive: true });
  const result = runNpm(['pack', '--json', '--pack-destination', destination], { cwd: directory, workRoot });
  if (result.status !== 0) {
    throw new Error(`npm pack failed in '${directory}': ${firstErrorLine(result)}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(`npm pack answered no JSON report in '${directory}' (stdout began '${result.stdout.slice(0, 120)}')`);
  }
  const entries = Array.isArray(parsed) ? parsed : Object.values(parsed);
  const entry = entries[0];
  if (!entry || typeof entry.filename !== 'string') {
    throw new Error(`npm pack answered a report with no \`filename\` in '${directory}'`);
  }
  const tarballPath = join(destination, entry.filename);
  if (!existsSync(tarballPath)) {
    throw new Error(`npm pack reported '${entry.filename}' and no such file exists at '${tarballPath}'`);
  }
  return {
    directory,
    destination,
    tarballPath,
    filename: entry.filename,
    name: typeof entry.name === 'string' ? entry.name : null,
    version: typeof entry.version === 'string' ? entry.version : null,
    members: (Array.isArray(entry.files) ? entry.files : [])
      .map((file) => file.path)
      .filter((path) => typeof path === 'string')
      .sort(),
    command: result.command,
  };
}

/** **THE TARBALL'S OWN MEMBER SET, READ OFF ITS BYTES.** `npm pack`'s report is npm's claim about what it
 *  wrote; this is the archive's own index. `INSTALL-01` reads both and requires them to agree, which is why
 *  the member set is called *"the installed shape's own bytes"* rather than *"what npm said"*. */
export function tarMemberSet(tarballPath) {
  const result = spawnSync('tar', ['-tzf', tarballPath], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) {
    throw new Error(`tar could not list '${tarballPath}': ${(result.stderr ?? '').split('\n')[0]}`);
  }
  const lines = (result.stdout ?? '').split('\n').map((line) => line.trim()).filter(Boolean);
  const entries = lines.map((line) => line.replace(/\/+$/, '')).filter(Boolean);
  const prefixed = entries.length > 0 && entries.every((entry) => entry.startsWith('package/'));
  return entries
    .map((entry) => (prefixed ? entry.slice('package/'.length) : entry))
    .filter((entry) => entry !== '')
    .sort();
}

/** One member of a tarball, as a Buffer — the bytes a consumer receives, never a re-read of the checkout. */
export function tarballMemberBytes(tarballPath, member) {
  const result = spawnSync('tar', ['-xzOf', tarballPath, `package/${member}`], { maxBuffer: 128 * 1024 * 1024 });
  if (result.status !== 0) return null;
  return result.stdout;
}

/** The manifest INSIDE the tarball — *"the packed version"* of every cell that compares versions. */
export function packedManifest(tarballPath) {
  const bytes = tarballMemberBytes(tarballPath, 'package.json');
  if (bytes === null) throw new Error(`'${tarballPath}' carries no package.json`);
  return JSON.parse(bytes.toString('utf8'));
}

/** **`npm install <tarball>` — the declared command `INSTALL-03` drives, and the placement `D-12` allows.**
 *  The caller supplies `--no-save` for the platform placement so the clean project's own manifest stays the
 *  plain consumer it was minted as. */
export function installTarball(cleanDirectory, tarballPath, workRoot, extraArguments = []) {
  return runNpm(['install', tarballPath, ...extraArguments], { cwd: cleanDirectory, workRoot });
}

// =====================================================================================================
// THE STAGE — a byte-for-byte copy of a package directory, plus the release's own acts ON THE STAGE
// =====================================================================================================
//
// **WHY A COPY AND NOT THE CHECKOUT ITSELF.** Two of the composition's acts write into the package
// directory and neither is lawful inside the tracked tree: the release's `LICENSE` copy (`PUB-DD-11`) and
// the host platform artefact's staging (`D-12`). A copy is also what makes the falsifier possible: the
// manifest can be mutated on the stage without one byte of `bindings/js/**` moving.

/** Directories a package's `files` rows cannot name and a pack therefore never needs; copied past so the
 *  stage stays small and the walk stays inside the package. */
const STAGE_SKIPPED_DIRECTORIES = new Set(['build', 'target', 'node_modules', '.git']);

/** Copy a directory tree, skipping the build outputs and installed trees. Returns the list of skipped
 *  entries so the report can name what the stage deliberately does not carry. */
export function stageCopy(from, to) {
  const skipped = [];
  mkdirSync(to, { recursive: true });
  cpSync(from, to, {
    recursive: true,
    filter: (source) => {
      const name = posix.basename(source.split(sep).join('/'));
      if (STAGE_SKIPPED_DIRECTORIES.has(name) && resolve(source) !== resolve(from)) {
        skipped.push(name);
        return false;
      }
      return true;
    },
  });
  return { directory: to, skipped: [...new Set(skipped)].sort() };
}

/** **THE OTHER HALF OF THE RELEASE'S ASSEMBLY STEP, PERFORMED ON THE STAGE (`D-12`):** copy the checkout's
 *  built artefact into a platform package's own root, where its manifest's `main` and its `files` row both
 *  name it. **This is the act that makes rung one fire without a registry** — the release performs it once
 *  per target, and this battery performs it for THIS host so the walk can reach a real `.node`. */
export function stageBuiltAddon(intoDirectory) {
  const target = join(intoDirectory, 'storeroom_js_binding.node');
  cpSync(BUILT_ADDON, target);
  return target;
}

/** The release's own assembly act, performed on the stage: copy the repository's `LICENSE` byte-for-byte
 *  into the package directory, so the tarball carries the licence text although the manifest names no
 *  `LICENSE` row (`contract.md §2.3` item 2; `PUB-DD-11`; `distribution.md §4.3` item 2). */
export function copyRepositoryLicence(intoDirectory) {
  const target = join(intoDirectory, 'LICENSE');
  cpSync(REPO_LICENSE, target);
  return target;
}

/** Rewrite a staged manifest — the lever the falsifier needs (`INSTALL-02`'s control) and the only write
 *  any cell performs on a stage. */
export function writeStagedManifest(stageDirectory, manifest) {
  writeFileSync(join(stageDirectory, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

// =====================================================================================================
// THE REACHABILITY WALK — this battery's OWN instrument (`D-7`: no `O4` helper is consumed)
// =====================================================================================================

/** The two roots declared once for this battery (`D-14`'s pairing, at this battery's own home): the HUB —
 *  the one path the package's `exports` arm publishes — and the BARREL, one level up from the parts. */
export const HUB_RELATIVE_PATH = 'index.mjs';
export const BARREL_RELATIVE_PATH = 'src/constraint-kernel.mjs';

/** The one specifier form this walk follows: a RELATIVE `from '…'`, `import '…'`, `import('…')` or
 *  `require_('…')`. A bare specifier is the platform package's name and is not this package's bytes. */
const RELATIVE_SPECIFIER = /(?:^|[^\w$.])(from|import|require_?)\s*\(?\s*(['"])(\.\.?\/[^'"\n]+)\2/g;

/** Every non-dot file under a directory, as `/`-separated paths relative to it. */
export function filesUnder(root, current = '', accumulated = []) {
  const absolute = current === '' ? root : join(root, ...current.split('/'));
  for (const entry of readdirSync(absolute, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (entry.name.startsWith('.')) continue;
    const memberPath = current === '' ? entry.name : `${current}/${entry.name}`;
    if (entry.isDirectory()) filesUnder(root, memberPath, accumulated);
    else accumulated.push(memberPath);
  }
  return accumulated;
}

/**
 * **THE REACHABLE SET — the transitive closure of the relative specifiers carried by the two roots**, each
 * resolved from the file that carries it, with **the one declared exception the code itself makes**:
 * `require_` is the hub's own `createRequire(import.meta.url)`, handed to the parts by
 * `adoptModuleContext`, so `require_('./src/constraint-kernel.mjs')` inside `src/entry/constraints.mjs`
 * resolves against the HUB's directory. Resolving it against the importing part would demand
 * `src/entry/src/constraint-kernel.mjs` and report the kernel MISSING — the one false red that would make
 * this instrument untrustworthy at the exact place the kernel's lazy reach lives.
 *
 * **A specifier that does not resolve ON DISK throws**, and the throw is a staging fault rather than a
 * verdict: a graph that is not closed in the stage cannot answer a question about what the tarball carries.
 */
export function reachableClosure(stageDirectory, roots = [HUB_RELATIVE_PATH, BARREL_RELATIVE_PATH]) {
  const queue = roots.map((root) => posix.normalize(root.replace(/^\.\//, '')));
  const members = new Set();
  const edges = [];
  while (queue.length > 0) {
    const relativePath = queue.shift();
    if (members.has(relativePath)) continue;
    members.add(relativePath);
    const absolute = join(stageDirectory, ...relativePath.split('/'));
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      throw new Error(`the reachable file '${relativePath}' does not exist at '${absolute}' — the module graph is not closed in the STAGE, which is a staging fault and never a publish verdict`);
    }
    const bytes = readFileSync(absolute, 'utf8');
    RELATIVE_SPECIFIER.lastIndex = 0;
    let match = null;
    while ((match = RELATIVE_SPECIFIER.exec(bytes)) !== null) {
      const keyword = match[1];
      const specifier = match[3];
      const base = keyword.startsWith('require') ? posix.dirname(HUB_RELATIVE_PATH) : posix.dirname(relativePath);
      const target = posix.normalize(posix.join(base, specifier));
      if (target.startsWith('..') || posix.isAbsolute(target)) {
        throw new Error(`'${relativePath}' carries ${keyword} '${specifier}', which resolves OUTSIDE the package root ('${target}')`);
      }
      if (!existsSync(join(stageDirectory, ...target.split('/')))) {
        throw new Error(`'${relativePath}' carries ${keyword} '${specifier}', resolving to '${target}', and that file does not exist in the stage`);
      }
      edges.push({ from: relativePath, keyword, specifier, target });
      if (!members.has(target)) queue.push(target);
    }
  }
  return { members: [...members].sort(), edges };
}

/** npm's always-included ROOT names, whatever `files` says — `README*` and `LICEN[CS]E*`. */
const ALWAYS_INCLUDED = [/^readme(\..*)?$/i, /^licen[cs]e(\..*)?$/i];

/** **THE DECLARED NON-CODE ARTEFACTS** — the members that may lawfully be packed while nothing imports
 *  them: `package.json` (npm always packs it), `README*` / `LICEN[CS]E*` at the root (npm's own always-
 *  included set), and the paths the manifest's own resolution fields name. Derived from the manifest and
 *  never hand-typed. */
export function declaredNonCodeMembers(stageDirectory, manifest) {
  const allowed = new Set(['package.json']);
  for (const entry of readdirSync(stageDirectory, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    if (ALWAYS_INCLUDED.some((pattern) => pattern.test(entry.name))) allowed.add(entry.name);
  }
  for (const field of ['main', 'types', 'typings']) {
    const value = manifest?.[field];
    if (typeof value === 'string' && value !== '') allowed.add(value.replace(/^\.\//, ''));
  }
  for (const arm of Object.values(manifest?.exports ?? {})) {
    if (typeof arm === 'string') allowed.add(arm.replace(/^\.\//, ''));
    else if (arm && typeof arm === 'object') {
      for (const target of Object.values(arm)) {
        if (typeof target === 'string') allowed.add(target.replace(/^\.\//, ''));
      }
    }
  }
  return [...allowed].sort();
}

/** The entry's own five-name table, parsed from the packed `src/entry/artefact.mjs` bytes — the spelling
 *  `INSTALL-07` compares the manifest's five keys against. The table's rows are `'<platform>·<arch>':
 *  '<name>'`, the `·` being U+00B7 as the entry writes it. */
export function entryPlatformTable(entrySourceBytes) {
  const table = new Map();
  const rowPattern = /'([a-z0-9]+)·([a-z0-9]+)'\s*:\s*'([^']+)'/g;
  let match = null;
  while ((match = rowPattern.exec(entrySourceBytes)) !== null) {
    table.set(`${match[1]}·${match[2]}`, match[3]);
  }
  return table;
}

// =====================================================================================================
// THE ONE REAL NODE PROCESS — the driver staged INSIDE the installed tree, and the preload that records
// every resolution the entry performs
// =====================================================================================================
//
// **WHY THE DRIVER IS STAGED INTO THE CLEAN DIRECTORY.** `INSTALL-05`'s subject is *"the packaged name
// resolves through `exports` from inside the installed tree — by name, one real Node process"*. A driver
// living in the battery's own directory would import the CHECKOUT's package (the battery's directory sits
// inside the repository, so `provident-storeroom` would not even resolve from it); a driver inside the
// clean directory resolves the INSTALLED bytes, which is the whole difference this battery exists to see.

/** The preload. It records every `Module._resolveFilename` the process performs — the ONLY place the
 *  entry's rung-one `require` can be observed from outside — and, where a cell fixes the runtime pair, it
 *  defines `process.platform` / `process.arch` BEFORE the entry is evaluated, which is the declared way a
 *  drive fixes the key (`resolution.md §4.1`: the pair is read on the load path and not at module
 *  evaluation). **It classifies no throw and changes no behaviour: the resolved value or the original
 *  error is returned unchanged.** */
export const PROBE_SOURCE = `'use strict';
const Module = require('node:module');
const fs = require('node:fs');
const original = Module._resolveFilename;
const logPath = process.env.INSTALL_PROBE_LOG || '';
Module._resolveFilename = function resolveAndRecord(request, parent, isMain, options) {
  let resolved = null;
  let failure = null;
  try {
    resolved = original.call(this, request, parent, isMain, options);
  } catch (error) {
    failure = error;
  }
  if (logPath !== '') {
    fs.appendFileSync(logPath, JSON.stringify({
      request,
      from: parent && parent.filename ? parent.filename : null,
      outcome: failure === null ? 'resolved' : 'threw',
      code: failure === null ? null : (failure && failure.code ? failure.code : String(failure)),
      resolved,
    }) + '\\n');
  }
  if (failure !== null) throw failure;
  return resolved;
};
if (process.env.INSTALL_FAKE_PLATFORM) {
  Object.defineProperty(process, 'platform', { value: process.env.INSTALL_FAKE_PLATFORM, configurable: true });
}
if (process.env.INSTALL_FAKE_ARCH) {
  Object.defineProperty(process, 'arch', { value: process.env.INSTALL_FAKE_ARCH, configurable: true });
}
`;

/** `INSTALL-05`'s driver: import by name, and record what the resolution actually was. */
export const IMPORT_BY_NAME_SOURCE = `import { createRequire } from 'node:module';
const report = {};
const describe = (error) => ({
  name: error && error.name ? error.name : null,
  code: error && error.code ? error.code : null,
  status: error && typeof error.status === 'string' ? error.status : null,
  message: error && typeof error.message === 'string' ? error.message : String(error),
  isError: error instanceof Error,
  members: error && typeof error === 'object' && !(error instanceof Error) ? Object.keys(error).sort() : null,
});
let namespace = null;
try {
  namespace = await import('provident-storeroom');
  report.imported = true;
} catch (error) {
  report.imported = false;
  report.thrown = describe(error);
}
report.exportNames = namespace === null ? null : Object.keys(namespace).sort();
try {
  report.resolvedByImportMeta = import.meta.resolve('provident-storeroom');
} catch (error) {
  report.resolvedByImportMeta = null;
  report.resolveThrew = describe(error);
}
report.deepImport = await import('provident-storeroom/index.mjs').then(
  () => ({ ok: true, code: null }),
  (error) => ({ ok: false, code: error && error.code ? error.code : String(error) }),
);
report.manifestSubpath = await import('provident-storeroom/package.json').then(
  () => ({ ok: true, code: null }),
  (error) => ({ ok: false, code: error && error.code ? error.code : String(error) }),
);
const require_ = createRequire(import.meta.url);
try {
  report.requireResolve = require_.resolve('provident-storeroom');
} catch (error) {
  report.requireResolve = null;
  report.requireResolveCode = error && error.code ? error.code : String(error);
}
console.log('#DRILL ' + JSON.stringify(report));
`;

/** `INSTALL-06`'s driver: the version read's own compare, observed as the construction's answer. */
export const VERSION_READ_SOURCE = `import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const require_ = createRequire(import.meta.url);
const report = {};
const describe = (error) => ({
  name: error && error.name ? error.name : null,
  code: error && error.code ? error.code : null,
  status: error && typeof error.status === 'string' ? error.status : null,
  message: error && typeof error.message === 'string' ? error.message : String(error),
  isError: error instanceof Error,
  members: error && typeof error === 'object' && !(error instanceof Error) ? Object.keys(error).sort() : null,
});
let namespace = null;
try {
  namespace = await import('provident-storeroom');
} catch (error) {
  report.thrown = describe(error);
}
if (namespace !== null) {
  try {
    const entryUrl = import.meta.resolve('provident-storeroom');
    report.manifestBesideEntry = join(dirname(fileURLToPath(entryUrl)), 'package.json');
    report.manifestVersion = JSON.parse(readFileSync(report.manifestBesideEntry, 'utf8')).version;
  } catch (error) {
    report.manifestThrew = describe(error);
  }
  try {
    const instance = namespace.storeCreate({ journalLength: 8, listeners: [] });
    report.instance = true;
    report.instanceMembers = Object.keys(instance).sort();
  } catch (error) {
    report.instance = false;
    report.thrown = describe(error);
  }
}
if (process.env.INSTALL_HOST_NAME) {
  try {
    const artefact = require_(process.env.INSTALL_HOST_NAME);
    report.artefactVersion = typeof artefact.version === 'function' ? artefact.version() : null;
  } catch (error) {
    report.artefactThrew = describe(error);
  }
}
console.log('#DRILL ' + JSON.stringify(report));
`;

/** `INSTALL-08`'s driver: the load itself, with the artefact's identity and its own stamp. */
export const RUNG_ONE_SOURCE = `import { createRequire } from 'node:module';
const require_ = createRequire(import.meta.url);
const report = {};
const describe = (error) => ({
  name: error && error.name ? error.name : null,
  code: error && error.code ? error.code : null,
  status: error && typeof error.status === 'string' ? error.status : null,
  message: error && typeof error.message === 'string' ? error.message : String(error),
  isError: error instanceof Error,
  members: error && typeof error === 'object' && !(error instanceof Error) ? Object.keys(error).sort() : null,
});
let namespace = null;
try {
  namespace = await import('provident-storeroom');
  report.imported = true;
} catch (error) {
  report.imported = false;
  report.thrown = describe(error);
}
if (namespace !== null) {
  try {
    const instance = namespace.storeCreate({ journalLength: 8, listeners: [] });
    report.instance = true;
    report.instanceMembers = Object.keys(instance).sort();
  } catch (error) {
    report.instance = false;
    report.thrown = describe(error);
  }
}
report.hostName = process.env.INSTALL_HOST_NAME || null;
try {
  report.artefactPath = require_.resolve(report.hostName);
} catch (error) {
  report.artefactPath = null;
  report.artefactResolveThrew = describe(error);
}
if (report.artefactPath !== null) {
  try {
    const artefact = require_(report.hostName);
    report.artefactVersion = typeof artefact.version === 'function' ? artefact.version() : null;
    report.artefactMembers = Object.keys(artefact).sort();
  } catch (error) {
    report.artefactThrew = describe(error);
  }
}
console.log('#DRILL ' + JSON.stringify(report));
`;

/** `INSTALL-10`'s driver: the refusal a drive meets, reported as the arm's own members and message. */
export const REFUSAL_ARM_SOURCE = `const report = { platform: process.platform, arch: process.arch };
const describe = (error) => ({
  name: error && error.name ? error.name : null,
  code: error && error.code ? error.code : null,
  status: error && typeof error.status === 'string' ? error.status : null,
  message: error && typeof error.message === 'string' ? error.message : String(error),
  isError: error instanceof Error,
  members: error && typeof error === 'object' && !(error instanceof Error) ? Object.keys(error).sort() : null,
});
let namespace = null;
try {
  namespace = await import('provident-storeroom');
  report.imported = true;
} catch (error) {
  report.imported = false;
  report.thrown = describe(error);
}
if (namespace !== null) {
  try {
    const instance = namespace.storeCreate({ journalLength: 8, listeners: [] });
    report.instance = true;
    report.instanceMembers = Object.keys(instance).sort();
  } catch (error) {
    report.instance = false;
    report.thrown = describe(error);
  }
}
console.log('#DRILL ' + JSON.stringify(report));
`;

/** Write a staged source file into the clean directory's own `_driver/` directory. */
export function writeDriver(cleanDirectory, filename, source) {
  const driverDirectory = join(cleanDirectory, '_driver');
  mkdirSync(driverDirectory, { recursive: true });
  const target = join(driverDirectory, filename);
  writeFileSync(target, source, 'utf8');
  return target;
}

/** Run one staged driver as ONE REAL NODE PROCESS, with the preload where a cell needs the resolution log
 *  and/or a fixed runtime pair, and return its record plus the parsed `#DRILL` report. */
export function runDriver(driverPath, { cwd, env = {}, preload = null } = {}) {
  const argumentsList = preload === null ? [driverPath] : ['--require', preload, driverPath];
  const result = spawnSync(process.execPath, argumentsList, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, ...env },
  });
  const drillLine = (result.stdout ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('#DRILL '))
    .pop();
  let report = null;
  if (drillLine !== undefined) {
    try {
      report = JSON.parse(drillLine.slice('#DRILL '.length));
    } catch {
      report = null;
    }
  }
  return {
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    report,
    command: `node ${argumentsList.join(' ')}`,
  };
}

/** The probe log, as records. A missing file is an empty list rather than an error: a process that resolved
 *  nothing is a measurement, and the cell that cares says so. */
export function readProbeLog(logPath) {
  if (!existsSync(logPath)) return [];
  return readFileSync(logPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter((record) => record !== null);
}

// =====================================================================================================
// THE REPORT'S OWN PROHIBITIONS, AS PREDICATES A CELL CAN DRIVE (`INSTALL-13`, `INSTALL-14`, `INSTALL-15`)
// =====================================================================================================
//
// **A NEGATIVE CELL THAT CANNOT FAIL IS DECORATION.** Each predicate below is applied TWICE by its cell: to
// the report the battery actually printed, where no violation may appear, and to a SYNTHETIC subject that
// carries the violation, where one must. **A predicate that misses the synthetic subject FAILS ITS OWN
// CELL**, because an instrument that cannot see the defect it was written for is not evidence of anything.

/** Digest figures: the shapes a minted digest would take (`PUB-DD-13`; `INSTALL-13`). */
export const DIGEST_FIGURES = [
  /sha(?:1|256|384|512)-[A-Za-z0-9+/=]{16,}/,
  /\b[0-9a-f]{32,}\b/i,
  /\b(?:shasum|integrity|digest)\b\s*[:=]\s*["']?[A-Za-z0-9+/=]{16,}/i,
];

/** A consumer-loading claim (`PUB-DD-14`; `INSTALL-14`). **The report names the prohibition BY ITS ID and
 *  never spells the claimed sentence**, so these patterns can be strict: if the report ever printed the
 *  claim, the cell would see it rather than the cell's own prose. */
export const CONSUMER_CLAIM_FIGURES = [
  /consumer[- ]loaded/i,
  /a consumer has loaded/i,
  /loaded by a consumer/i,
  /consumer[- ]loading\s+(?:figure|count|number)\s*[:=]\s*\d/i,
];

/** Another unit's figures, which this battery may not re-measure (`contract.md §4.3` item 2; `INSTALL-15`). */
export const FOREIGN_FIGURES = [
  /113 JS cells/i,
  /240 blind/i,
  /91 live/i,
  /\b379\b/,
];

/** Apply a predicate set to a subject and return the violations. */
export function violationsOf(subject, predicates) {
  return predicates
    .map((pattern) => ({ pattern: String(pattern), matched: pattern.test(subject) }))
    .filter((result) => result.matched);
}

// =====================================================================================================
// `D-8` (iii)'s CONDITIONAL, AS A PREDICATE (`INSTALL-12`)
// =====================================================================================================
//
// **`D-8`: the `LICENSE` row is lawful only if evidence requires it**, and its antecedent — *"does a
// consumer or a scanner need the row?"* — is an INSTALL observation, not a documentary fact (`§2.9`). The
// evidence's home is this battery's own record (`§2.9`, `Q18`): `tests/e2e/installed/license-row-evidence.json`.
// **A row WITHOUT its evidence fails; a row WITH it passes; NO row passes.** The `files` rows are the
// subject, because `JSG-12.18`'s retired limb read the allowlist's rows and nothing else.

/** The allowlist rows that name a `LICENSE` file (the retired limb's own regex). */
export function licenceRows(files) {
  if (!Array.isArray(files)) return [];
  return files.filter((row) => typeof row === 'string' && /(^|\/)licen[cs]e$/i.test(row.trim()));
}

/** Read this battery's evidence record, or `null` where none exists. */
export function readLicenceEvidence() {
  const path = join(REPO_ROOT, EVIDENCE_RELATIVE_PATH);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    return { invalid: `${path}: ${error.message}` };
  }
}

/** The predicate. `verdict` is `PASS` for no row and for a row with evidence; `FAIL` for a row without it. */
export function licenceRowVerdict(files, evidenceRecord) {
  const rows = licenceRows(files);
  if (rows.length === 0) {
    return {
      verdict: 'PASS',
      rows,
      detail: 'the manifest names no `LICENSE` row, so (iii)\'s conditional has no antecedent — the licence text travels by the assembly step instead (`INSTALL-11`)',
    };
  }
  const items = Array.isArray(evidenceRecord?.evidence) ? evidenceRecord.evidence : [];
  const covering = items.filter((item) => {
    const requirement = typeof item?.requirement === 'string' ? item.requirement.trim() : '';
    const kind = typeof item?.kind === 'string' ? item.kind.toLowerCase() : '';
    const namesRow = typeof item?.row === 'string' && rows.includes(item.row);
    return requirement !== '' && (kind === 'consumer' || kind === 'scanner') && (item?.row === undefined || namesRow);
  });
  if (covering.length === 0) {
    return {
      verdict: 'FAIL',
      rows,
      detail: `the manifest names the row(s) ${JSON.stringify(rows)} and no recorded evidence item in '${EVIDENCE_RELATIVE_PATH}' names a consumer or scanner requirement for it — \`D-8\` (iii) makes that row unlawful`,
    };
  }
  return {
    verdict: 'PASS',
    rows,
    detail: `the row(s) ${JSON.stringify(rows)} are cited by ${covering.length} recorded evidence item(s) naming a consumer or scanner requirement`,
  };
}

// =====================================================================================================
// SMALL SHARED FORMS
// =====================================================================================================

/** A path's class, for the site line (`contract.md §4.2` item 2 names the path CLASS, not a digest of it). */
export function pathClass(directory) {
  const absolute = resolve(directory);
  const temporary = resolve(tmpdir());
  return absolute === temporary || absolute.startsWith(`${temporary}${sep}`) ? 'os-temporary-area' : 'other';
}

/** Whether `child` is a descendant of `parent`. */
export function isWithin(parent, child) {
  const base = resolve(parent);
  const target = resolve(child);
  return target === base || target.startsWith(`${base}${sep}`);
}

/** A path as the report should print it: relative to the work root, so the site line is stable and the
 *  report carries no absolute temporary path that a later run could mistake for a figure. */
export function relativeTo(root, target) {
  const value = relative(root, target);
  return value === '' ? '.' : value;
}

/** Delete a directory tree and report whether it is gone. The caller prints the result, so a failed cleanup
 *  is visible rather than assumed. */
export function removeTree(directory) {
  rmSync(directory, { recursive: true, force: true });
  return !existsSync(directory);
}
