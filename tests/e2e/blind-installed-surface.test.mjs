// tests/e2e/blind-installed-surface.test.mjs
//
// BLIND INSTANCE No. 12 — **THE INSTALLED LAYER**: the package as BYTES ON A CONSUMER'S DISK, reached BY
// NAME, in a directory with no repository in its ancestry. Every other general-purpose surface already
// carries a blind instance; this one is the layer the preset left to a *leg* and not to a blind battery.
//
// THE INSTRUMENT IS THE ONE `docs/specs/storeroom-publish/contract.md §4.2` item 1 DECLARES, and nothing
// else: **a real package manager operating on a PACKED TARBALL** — never the checkout — **in a directory
// with no repository in its ancestry and no `build/Release` beside the entry, plus one real Node
// process.** The package is reached by the specifier `provident-storeroom`, so every resolution below is
// the consumer's resolution and no cell of this file reads the artefact under test out of the tree it was
// built in.
//
// PROVENANCE — EVERY EXPECTATION IS AUTHORED FROM THE DECLARED SURFACE:
//   · `docs/specs/storeroom-publish/contract.md` §1.1 (the three rungs and their order), §1.2 (the total
//     platform table and the five operative names, `A88`(a)), §1.3 (the closed key set `C-1` and the EXACT
//     pins), §1.4 items 1–3 and 6 (the four states, the single declared arm, its subject, its form, and
//     the two-arm authoring split with `RCA-8(g)`'s three members), §1.5 items 1–2 and 6 (the version read
//     and the both-paths subject's separator, order and one-slot rendering), §2.1 item 1 with its
//     2026-10-25 correction (the five-entry allowlist, the no-binary rule and the `A89`(4) reachability
//     rule), §2.2 (the five artefacts and the no-committed-binary prohibition), §2.3 items 2–5 (the six
//     notices, the refused copy and the appendix's two lines), §2.4 item 2 (the types and the escape arm),
//     §2.5 (the identity and the metadata, incl. the 2026-10-11 metadata reversal), §3.2 item 2 (the
//     eleven version cells, one figure) and §5.7/§5.0a (the main package's own shape; the stamped
//     self-report)
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/distribution.md` §2.1 items 1–6,
//     §3.1 (the artefact set), §3.2 fields 1–9 (one row per field, one value per artefact), §3.3 (the one
//     field REFUSED on a platform artefact), §4.1–§4.3 (the four sites, the six notices, the refused copy)
//     and §6.1–§6.3 (the manifest fields and the six-artefact census)
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md` §1.3 items 1–4 (the ONE
//     arms-bearing entry, the refused wildcard and deep import, the entry's shape and the addon's FIVE
//     internal names) and §1.4 item 1 (the engine floor)
//   · `docs/specs/storeroom-js/surface.md` §2.9 item 1 (`A127`) — the module namespace is ONE named
//     export, `storeCreate`, `11 → 1` ✓ — and `bindings/js/index.d.ts` (the same clause at the published
//     types: one `export function`, the `StoreStatus` union with its explicit `(string | {})` escape)
//   · the artefacts' own manifests — `bindings/js/package.json` and `bindings/js/platforms/*/package.json`
//     — read as PUBLISHED FACTS (`D-7`), which is where the version figure `VERSION` below is read from
//     **AT RUNTIME AND NOT RESTATED HERE**: a version literal written into a cell is a hand-maintained
//     census, and it rots on the bump that moves the eleven sites it is supposed to track
//
// NO CELL OPENS A `docs/**` PATH AT RUNTIME (`D-17`). No byte of `bindings/js/index.mjs`,
// `bindings/js/src/**` or `src/**` was read while authoring this file, and EVERY RUNTIME READ IS OF THE
// TARBALL OR OF THE INSTALLED TREE — the two exceptions being the two inputs of the release's own
// ASSEMBLY STEP (the repository's `LICENSE` and the host's built `.node`), which this file stages and
// whose carriage it then asserts from the tarball.
//
// ★ HELPER DISCLOSURE: `tests/e2e/installed/install-support.mjs` IS NOT IMPORTED AND IS NOT READ. A blind
// instance needs a way to install, and this file writes its own: `packPackage` (the `npm pack` call),
// `listEntries` / `readEntry` (the tarball read), `untar` (the assembly's extraction), `install`
// (the `npm install` call) and `drive` (the one real Node process). NO EXPECTATION CAME FROM ANY HELPER,
// because none was called; every literal below is transcribed from the clauses named at its cell.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(here, '..', '..');
const PACKAGE_DIR = join(REPO_ROOT, 'bindings', 'js');
const REPOSITORY_LICENSE = join(REPO_ROOT, 'LICENSE');
/** `contract.md §1.1` rung two, at its DECLARED module-relative spelling: the checkout-only rung. */
const RUNG_TWO_RELATIVE = ['build', 'Release', 'storeroom_js_binding.node'];
const ADDON_AT_BUILD = join(PACKAGE_DIR, ...RUNG_TWO_RELATIVE);

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS — transcribed from the surface, never computed from the artefact.
// ---------------------------------------------------------------------------------------------

/** `contract.md §1.2`'s table, read at its `A88`(a) column: **the five OPERATIVE names, character for
 *  character** — scope `@auspicion`, the project token `provident-storeroom`, the language marker `js`,
 *  the target, the arch, and the toolchain suffix only where the artefact carries one (`3 + 2 = 5` ✓). */
const FIVE_NAMES = {
  'linux-x64': '@auspicion/provident-storeroom-js-linux-x64-gnu',
  'linux-arm64': '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  'darwin-x64': '@auspicion/provident-storeroom-js-darwin-x64',
  'darwin-arm64': '@auspicion/provident-storeroom-js-darwin-arm64',
  'win32-x64': '@auspicion/provident-storeroom-js-win32-x64-msvc',
};
/** `contract.md §1.2` / `§5.6` item 1: five names, and **no sixth**. */
const FIVE = Object.values(FIVE_NAMES);

/** `contract.md §5.6` items 2–5, **the shapes the five-name table REFUSES BY NAME** — the retired scope
 *  (`A86`), the superseded language-marker-only spelling (`A88`(a) moved it), a third org, and the priced
 *  `A88`(b) alternative that drops the language marker. A name of any of these shapes in the manifest is
 *  a FINDING at that item and not a variant spelling. */
const REFUSED_NAME_SHAPES = [
  /^@provident-storeroom\//,
  /^@auspicion\/js-/,
  /^@auspicion\/provident-storeroom-(linux|darwin|win32)-/,
  /^provident-storeroom-js-/,
];

/** `distribution.md §6.1` field 1 + `contract.md §1.3`'s closing cell: the MAIN package's identity is
 *  UNSCOPED (`A82`) and gains no project token and no scope. */
const MAIN_NAME = 'provident-storeroom';
/** `bindings/js/package.json` — the released figure, read as a published fact (`D-7`); `§3.2` item 2 makes
 *  it ONE figure read eleven times. **DERIVED FROM THE MANIFEST AT RUNTIME RATHER THAN FROZEN AS A LITERAL**
 *  (the reason the header gives at the manifests' own row): the eleven cells move TOGETHER on a bump, and a
 *  literal here would have to be found and moved by hand — a second home for a value the manifest carries
 *  once, and the same defect class as a hand-maintained census. **NO CONJUNCT IS WEAKENED**: every cell below
 *  still compares the PACKED artefact's own fields against this figure by exact equality, so a tarball
 *  assembled from another version is still caught; what the reader no longer does is CLAIM which version the
 *  release is, and that claim is the tag's — `staged-install/publish.test.mjs`'s `declaredReleaseVersion`
 *  reads it at the built artefact's own `version()`, which is the shipped byte that carries it. */
const VERSION = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8')).version;
const LICENCE = 'AGPL-3.0';
/** `package.md §1.4` item 1 / `distribution.md §3.2` field 7: the floor is a DECLARATION, the same floor on
 *  every artefact. */
const ENGINES_NODE = '>=18.0.0';

/** `contract.md §2.1` item 1 as CORRECTED 2026-10-25: the operative allowlist is FIVE entries, `5 = 3 + 2`
 *  ✓, and `src/entry/`'s count is the correction's own figure — *"a directory of thirteen modules"*. */
const ALLOWLIST = ['index.mjs', 'README.md', 'index.d.ts', 'src/entry/', 'src/constraint-kernel.mjs'];
const ENTRY_MODULE_COUNT = 13;
const PACKED_FILE_COUNT = 18; // 1 package.json + 3 root files + 13 entry modules + 1 kernel = 18 ✓

/** `contract.md §1.1` rung three / `§1.4` item 1 / `§1.5` item 6: **the ONE declared refusal's status and
 *  the generator's OWN clause**, at the subject slot the clause fixes. */
const ARMED_STATUS = 'FilePathUnreachable';
const GENERATOR_CLAUSE = 'is not reachable at construction, the path must exist or the application must be able to write it';
/** `contract.md §1.4` item 1 as read through its `RCA-8(g)` pointer: the arm's members are `{status, message,
 *  log}`, `3` members, and `log`'s declared value on every state of THIS unit's arm is `[]`. */
const ARM_MEMBERS = ['status', 'message', 'log'];

/** `contract.md §1.5` item 6 (a): the both-paths separator is `', '` — **a comma and one space, and no
 *  other separator is lawful.** */
const JOIN = "', '";

/** `surface.md §2.9` item 1 (`A127`) + `index.d.ts` item (1): the entry's OWN NAMED EXPORT SET is **ONE
 *  name, `storeCreate`, and NOTHING ELSE** (`11 → 1` ✓). */
const NAMESPACE_NAMES = ['storeCreate'];

/** `distribution.md §6.3` row 6: the MAIN package is LAST and is the one artefact that publishes after the
 *  five — a fact about the release and not this layer, named here only so the census is not half-read. */

const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// ---------------------------------------------------------------------------------------------
// THE SITE — one clean root, two installs, and nothing under a directory that names a repository.
// ---------------------------------------------------------------------------------------------

const site = {
  root: null,
  npmCache: null,
  host: `${process.platform}-${process.arch}`,
  bareTarball: null,
  bareEntries: [],
  assembledTarball: null,
  assembledEntries: [],
  platformTarball: null,
  platformEntries: [],
  platformName: null,
  absentDir: null,
  presentDir: null,
  notDrivable: null,
};

function npmEnv() {
  return {
    ...process.env,
    // The install runs OFFLINE (`D-12`): a tarball needs no registry, and `--omit=optional` keeps the
    // five pins from being fetched. The cache is inside the site so not a byte lands in the user's.
    npm_config_cache: site.npmCache,
    npm_config_offline: 'true',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false',
    npm_config_progress: 'false',
    npm_config_loglevel: 'error',
  };
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', env: npmEnv(), timeout: 120000, ...options });
  if (result.error) throw new Error(`${command} ${args.join(' ')} could not start: ${result.error.message}`);
  return result;
}

function packPackage(directory, destination) {
  mkdirSync(destination, { recursive: true });
  const result = run(NPM, ['pack', '--pack-destination', destination, directory], { cwd: REPO_ROOT });
  if (result.status !== 0) throw new Error(`npm pack failed at ${directory}: ${result.stderr || result.stdout}`);
  const tarballs = readdirSync(destination).filter((name) => name.endsWith('.tgz'));
  if (tarballs.length !== 1) throw new Error(`npm pack wrote ${tarballs.length} tarballs into ${destination}`);
  return join(destination, tarballs[0]);
}

function listEntries(tarball) {
  const result = run('tar', ['-tzf', tarball]);
  if (result.status !== 0) throw new Error(`cannot list ${tarball}: ${result.stderr}`);
  const entries = result.stdout.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
  const rooted = entries.filter((entry) => entry.startsWith('package/'));
  if (rooted.length !== entries.length) throw new Error(`${tarball} carries an entry outside package/`);
  return rooted.map((entry) => entry.slice('package/'.length)).filter((entry) => !entry.endsWith('/')).sort();
}

function readEntry(tarball, entry) {
  const result = run('tar', ['-xzOf', tarball, `package/${entry}`]);
  if (result.status !== 0) throw new Error(`cannot read package/${entry} out of ${tarball}: ${result.stderr}`);
  return result.stdout;
}

function entryManifest(tarball) {
  return JSON.parse(readEntry(tarball, 'package.json'));
}

function untar(tarball, destination) {
  const result = run('tar', ['-xzf', tarball, '-C', destination]);
  if (result.status !== 0) throw new Error(`cannot extract ${tarball}: ${result.stderr}`);
}

function install(directory, tarballs) {
  mkdirSync(directory, { recursive: true });
  const result = run(
    NPM,
    ['install', '--no-save', '--omit=optional', '--no-audit', '--no-fund', ...tarballs],
    { cwd: directory },
  );
  if (result.status !== 0) throw new Error(`npm install failed in ${directory}: ${result.stderr || result.stdout}`);
  return directory;
}

/** ONE REAL NODE PROCESS, its import site inside the installed tree (`contract.md §4.2` item 1). */
function drive(directory, name, source, env = {}) {
  const driver = join(directory, name);
  writeFileSync(driver, source);
  const result = run(process.execPath, [driver], { cwd: directory, env: { ...npmEnv(), ...env }, timeout: 60000 });
  const stdout = (result.stdout || '').trim();
  try {
    return JSON.parse(stdout);
  } catch {
    return {
      __crashed: {
        status: result.status,
        signal: result.signal,
        stdout,
        stderr: (result.stderr || '').trim().split('\n').slice(0, 12).join('\n'),
      },
    };
  }
}

const ABSENT_DRIVER = `
const CFG = { journalLength: 1, listeners: [] };
const report = { moduleKeys: null, entryUrl: null, threw: false, returned: null, form: null };
const namespace = await import('provident-storeroom');
report.moduleKeys = Object.keys(namespace);
report.entryUrl = import.meta.resolve('provident-storeroom');
try {
  const product = namespace.storeCreate(CFG);
  report.threw = false;
  report.returned = Object.getOwnPropertyNames(product);
} catch (caught) {
  report.threw = true;
  report.form = {
    plainObject: Object.getPrototypeOf(caught) === Object.prototype,
    isError: caught instanceof Error,
    own: Object.getOwnPropertyNames(caught),
    enumerable: Object.keys(caught),
    status: caught.status,
    message: caught.message,
    log: caught.log,
    logIsArray: Array.isArray(caught.log),
    hasCode: Object.prototype.hasOwnProperty.call(caught, 'code'),
    constructorName: caught && caught.constructor ? caught.constructor.name : null,
  };
}
process.stdout.write(JSON.stringify(report));
`;

const PRESENT_DRIVER = `
const CFG = { journalLength: 1, listeners: [] };
const namespace = await import('provident-storeroom');
const product = namespace.storeCreate(CFG);
const report = {
  moduleKeys: Object.keys(namespace),
  ownMembers: Object.getOwnPropertyNames(product),
  readBack: null,
  platform: null,
};
product.write(['blind-installed-probe'], 'mem', 7);
report.readBack = product.read(['blind-installed-probe']);
const { createRequire } = await import('node:module');
const requireFromHere = createRequire(import.meta.url);
const platformName = process.env.DRIVER_PLATFORM_NAME;
const platform = requireFromHere(platformName);
report.platform = {
  name: platformName,
  resolved: requireFromHere.resolve(platformName),
  keys: Object.keys(platform),
  version: platform.version(),
};
process.stdout.write(JSON.stringify(report));
`;

const SPECIFIER_DRIVER = `
const specifiers = JSON.parse(process.env.DRIVER_SPECIFIERS);
const answers = {};
for (const specifier of specifiers) {
  try {
    await import(specifier);
    answers[specifier] = 'REACHED';
  } catch (caught) {
    answers[specifier] = caught && caught.code ? caught.code : String(caught);
  }
}
process.stdout.write(JSON.stringify(answers));
`;

before(() => {
  site.root = mkdtempSync(join(tmpdir(), 'sr-blind-installed-'));
  site.npmCache = join(site.root, 'npm-cache');
  mkdirSync(site.npmCache, { recursive: true });

  // (1) THE PACKED TARBALL — `contract.md §4.2` item 1's instrument: the bytes the manifest declares.
  site.bareTarball = packPackage(PACKAGE_DIR, join(site.root, 'pack-bare'));
  site.bareEntries = listEntries(site.bareTarball);

  // (2) THE RELEASE'S OWN ASSEMBLY STEP (`contract.md §2.1`'s carriage clause; `distribution.md §4.3` item 2;
  //     `Q3-5`): the repository's `LICENSE` is copied into the artefact's tarball. It is performed on the
  //     PACKED BYTES and adds no allowlist row, so what is asserted below is the declared mechanism.
  const assembled = join(site.root, 'assembly-main');
  mkdirSync(assembled, { recursive: true });
  untar(site.bareTarball, assembled);
  copyFileSync(REPOSITORY_LICENSE, join(assembled, 'package', 'LICENSE'));
  site.assembledTarball = packPackage(join(assembled, 'package'), join(site.root, 'pack-assembled'));
  site.assembledEntries = listEntries(site.assembledTarball);

  // (3) THE HOST'S OWN PLATFORM ARTEFACT, LOCALLY PACKED — `D-12`'s permitted tarball. `distribution.md
  //     §3.1`'s assembly: the manifest, the `.node` built for the target by CI, and the licence copy.
  site.platformName = FIVE_NAMES[site.host] || null;
  if (site.platformName && existsSync(ADDON_AT_BUILD)) {
    const stage = join(site.root, 'assembly-platform');
    mkdirSync(stage, { recursive: true });
    copyFileSync(join(PACKAGE_DIR, 'platforms', site.host, 'package.json'), join(stage, 'package.json'));
    copyFileSync(join(PACKAGE_DIR, 'platforms', site.host, 'README.md'), join(stage, 'README.md'));
    copyFileSync(ADDON_AT_BUILD, join(stage, 'storeroom_js_binding.node'));
    copyFileSync(REPOSITORY_LICENSE, join(stage, 'LICENSE'));
    site.platformTarball = packPackage(stage, join(site.root, 'pack-platform'));
    site.platformEntries = listEntries(site.platformTarball);
  } else {
    site.notDrivable = site.platformName
      ? `no locally built addon at ${ADDON_AT_BUILD}`
      : `the host pair ${site.host} is not one of the five declared keys`;
  }

  // (4) THE TWO INSTALLS. Both take the ASSEMBLED tarball (the release's bytes, licence copy included);
  //     the first carries NO platform package and the second carries the host's.
  site.absentDir = install(join(site.root, 'install-absent'), [site.assembledTarball]);
  site.presentDir = site.platformTarball
    ? install(join(site.root, 'install-present'), [site.assembledTarball, site.platformTarball])
    : null;
});

after(() => {
  // CLEAN UP `/tmp` ENTIRELY, pass or fail: the site is removed whole, and only if it is the directory this
  // file minted under `tmpdir()`.
  if (!site.root) return;
  const owned = resolve(site.root);
  const parent = resolve(tmpdir()) + sep;
  if (owned.startsWith(parent) && basename(owned).startsWith('sr-blind-installed-')) {
    rmSync(owned, { recursive: true, force: true });
  }
});

function installedPackageRoot(directory) {
  return join(directory, 'node_modules', ...MAIN_NAME.split('/'));
}

function walkModuleFiles(directory) {
  const found = [];
  const pending = [directory];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) pending.push(path);
      else if (entry.isFile() && entry.name.endsWith('.mjs')) found.push(path);
    }
  }
  return found.sort();
}

// =============================================================================================
// §0 — THE INSTRUMENT ITSELF: THE SITE, THE REACH AND THE BYTES (`contract.md §4.2`)
// =============================================================================================

test('installed · contract.md §4.2 item 1 · the install site is a directory with NO REPOSITORY IN ITS ANCESTRY and it is not the tree the bytes were built in', () => {
  // DECLARED: "**INSTRUMENT:** a **real package manager** operating on a **packed or released tarball** in
  // a directory **with no repository in its ancestry and no `build/Release` beside the entry**, plus **one
  // real Node process**" (`contract.md §4.2` item 1).
  assert.equal(typeof site.root, 'string');
  assert.ok(isAbsolute(site.root));

  // No `.git` at the site or at ANY ancestor — walked, not assumed.
  const ancestors = [];
  for (let cursor = resolve(site.root); ; cursor = dirname(cursor)) {
    ancestors.push(cursor);
    assert.equal(
      existsSync(join(cursor, '.git')),
      false,
      `a repository lives at the ancestor ${cursor}, so this install is not the declared site`,
    );
    if (dirname(cursor) === cursor) break;
  }
  assert.ok(ancestors.length >= 2, 'the walk did not reach a filesystem root');

  // And the site is not inside the workspace the bytes were produced at.
  assert.equal(
    resolve(site.root).startsWith(resolve(REPO_ROOT) + sep),
    false,
    `the clean directory ${site.root} stands inside the repository root ${REPO_ROOT}`,
  );
  assert.equal(ancestors.includes(resolve(REPO_ROOT)), false);
});

test('installed · contract.md §4.2 item 1 + §2.1 item 2 · the installed entry has NO `build/Release` BESIDE IT: rung two is the checkout-only rung and its path is a file the tarball does not carry', () => {
  // DECLARED: the site has "no `build/Release` beside the entry" (§4.2 item 1), and "**RUNG TWO BECOMES A
  // CHECKOUT-ONLY RUNG.** In a published install, rung two's module-relative path resolves to a file the
  // tarball does not carry" (§2.1 item 2, `PUB-DD-1`).
  const root = installedPackageRoot(site.absentDir);
  assert.ok(existsSync(root), `${root} is not an installed package root`);
  assert.equal(existsSync(join(root, ...RUNG_TWO_RELATIVE)), false, 'the tarball carries the rung-two addon');
  assert.equal(existsSync(join(root, 'build')), false, 'a `build/` directory reached the installed tree');
  // NON-VACUITY: the entry itself IS there, so the two absences above are about the addon and not about an
  // empty tree.
  assert.ok(statSync(join(root, 'index.mjs')).isFile());
});

test('installed · contract.md §4.2 item 1 + distribution.md §6.1 field 1 · the package is reached BY NAME, and the resolved entry lies inside the installed tree and nowhere else', () => {
  // DECLARED: the package manager operates on the tarball and the consumer reaches the package by its
  // declared identity — `provident-storeroom`, UNSCOPED (`A82`; `distribution.md §6.1` field 1) — never by a
  // path into a checkout.
  const report = drive(site.absentDir, 'driver-name.mjs', ABSENT_DRIVER);
  assert.equal(report.__crashed, undefined, `the entry did not load: ${JSON.stringify(report.__crashed)}`);
  assert.equal(report.entryUrl.startsWith('file:'), true, `the entry did not resolve to a file URL: ${report.entryUrl}`);

  const entryPath = fileURLToPath(report.entryUrl);
  const installedRoot = resolve(installedPackageRoot(site.absentDir));
  assert.equal(
    resolve(entryPath),
    resolve(join(installedRoot, 'index.mjs')),
    'the specifier did not resolve to the installed package\'s own entry',
  );
  assert.equal(basename(installedRoot), MAIN_NAME);
  assert.equal(entryManifest(site.bareTarball).name, MAIN_NAME);
});

test('installed · contract.md §4.2 item 1 (the package manager, not a copy) · the installed manifest IS the packed manifest: every field is the tarball\'s, field for field', () => {
  // The instrument is a REAL package manager on a tarball (`§4.2` item 1): what it places on the consumer's
  // disk is the artefact and not a re-derivation. The observable is a field-by-field equality between the
  // manifest the tarball carries and the manifest that was installed.
  const packed = entryManifest(site.assembledTarball);
  const installed = JSON.parse(readFileSync(join(installedPackageRoot(site.absentDir), 'package.json'), 'utf8'));
  assert.deepEqual(installed, packed);
});

// =============================================================================================
// §1 — THE FIVE NAMES AND THE FIVE PINS, AS THE TARBALL DECLARES THEM (`§1.2`, `§1.3`, `§2.2`,
//      `§3.2` item 2, `P-PUB-2`, `P-PUB-6`, `P-PUB-8`)
// =============================================================================================

test('installed · contract.md §1.2 (the `A88`(a) column) + §5.6 item 1 · `optionalDependencies` names EXACTLY the five operative artefact names, character for character, and no sixth', () => {
  // DECLARED: the five names, character for character, as `§1.2`'s operative column prints them — and
  // "**THE KEY SET IS CLOSED AT EXACTLY THE FIVE**" (`§1.3` item 2), with "a sixth scoped name" a FINDING
  // (`§5.6`'s failure list). The tarball does not carry a binary for a host it was not built for, so what
  // this cell asserts is the DECLARATION — which is exactly what the manifest is.
  const pins = entryManifest(site.bareTarball).optionalDependencies;
  assert.equal(typeof pins, 'object');
  const keys = Object.keys(pins).sort();
  assert.deepEqual(keys, [...FIVE].sort());
  assert.equal(keys.length, 5, `the key set is ${keys.length} and the declared set is 5`);

  // AND THE THREE ARITHMETIC TERMS ARE READ OFF THE NAMES THEMSELVES: `3` carry a toolchain suffix
  // (`-gnu` twice, `-msvc` once), `2` carry none, `3 + 2 = 5` ✓ (`§1.2`'s own arithmetic).
  const suffixed = keys.filter((name) => /-(gnu|msvc)$/.test(name));
  assert.equal(suffixed.length, 3);
  assert.equal(keys.length - suffixed.length, 2);
});

test('installed · contract.md §5.6 items 2–5 · NOT ONE refused name shape reaches the manifest: not the retired scope, not the superseded language-marker spelling, not a third org, not the priced alternative', () => {
  // DECLARED, one member at a time: (item 2) "a name whose scope IS `@provident-storeroom`" — the scope
  // `A86` retired; (item 3) "a name whose spelling is `@auspicion/js-<label>`" — the language-marker-only
  // shape `A88`(a) SUPERSEDES, "so a home that still spells it is caught rather than silently accepted";
  // (item 4) any third org; (item 5) "the alternative literal reading" `@auspicion/provident-storeroom-<label>`,
  // the project token with the language marker DROPPED.
  const keys = Object.keys(entryManifest(site.bareTarball).optionalDependencies);
  for (const key of keys) {
    const refusals = REFUSED_NAME_SHAPES.map((shape, index) => (shape.test(key) ? index : -1)).filter((index) => index >= 0);
    assert.deepEqual(refusals, [], `the manifest names ${key}, a shape §5.6 refuses (member ${refusals.map((i) => i + 2).join(', ')})`);
  }
  // NON-VACUITY: the loop above ran over a five-key set.
  assert.equal(keys.length, 5);
});

test('installed · contract.md §1.3 item 4 + §0.3 `PUB-DD-10` · every pin is EXACT: the released figure character for character, with no caret, tilde, range, wildcard or operator — because a range re-opens npm\'s hoisting window', () => {
  // DECLARED: "**THE PINS ARE LOAD-BEARING CONTRACT, NOT MANIFEST TRIVIA.** The five `optionalDependencies`
  // pins are EXACT … and **NO range, caret, tilde or wildcard is lawful**, because npm's dedupe could
  // otherwise satisfy the loader's `require` with a DIFFERENTLY-VERSIONED copy hoisted into the consumer's
  // tree" (`§1.3` item 4, `W-2`); and "a fifth pin expressed as a range rather than an exact version" is a
  // FINDING at `P-PUB-2`.
  const manifest = entryManifest(site.bareTarball);
  for (const [name, pin] of Object.entries(manifest.optionalDependencies)) {
    assert.equal(typeof pin, 'string');
    assert.equal(pin, VERSION, `${name} is pinned at ${pin} and the released figure is ${VERSION}`);
    assert.match(pin, /^\d+\.\d+\.\d+$/, `${name}'s pin ${pin} is not an exact version`);
    assert.equal(/[\^~><*x|]|\s|-$|latest|workspace:/.test(pin), false, `${name}'s pin ${pin} carries a range operator`);
  }
});

test(`installed · contract.md §3.2 item 2 (the coupling rule, ONE figure read eleven times) · the main package's \`version\` IS the five pins' value and IS \`${VERSION}\`, so no cell of the eleven moved alone`, () => {
  // DECLARED: "**THE FIVE ARTEFACTS' COUPLING RULE IS THIS UNIT'S OWN AND IT IS ONE RULE: the five platform
  // artefacts' `version` equals the MAIN package's `version`, the main package's `optionalDependencies` pins
  // the five at EXACTLY that version**" (`§3.2` item 2; `PUB-DD-10`; `P-PUB-8`), with `10` of the eleven
  // never moving alone.
  const manifest = entryManifest(site.bareTarball);
  assert.equal(manifest.version, VERSION);
  const pinValues = Object.values(manifest.optionalDependencies);
  assert.equal(new Set(pinValues).size, 1, `the five pins are ${JSON.stringify([...new Set(pinValues)])} and the rule admits one figure`);
  assert.equal(pinValues[0], manifest.version, 'a pin and the main package\'s version disagree');
});

// =============================================================================================
// §2 — THE ONE `exports` ARM, AND WHAT A CONSUMER CAN AND CANNOT REACH BY SPECIFIER
//      (`package.md §1.3` items 1–3; `distribution.md §6.1` field 7; `§3.2` field 6; `§2.1` item 6)
// =============================================================================================

test('installed · package.md §1.3 items 1–2 + distribution.md §6.1 field 7 · `exports` publishes EXACTLY ONE arms-bearing entry — the `.` arm with `types` and `import` — and no wildcard, no second subpath and no CJS arm', () => {
  // DECLARED: "**THE `exports` MAP PUBLISHES EXACTLY ONE ARMS-BEARING ENTRY — the ESM one** — and every
  // other subpath a consumer could spell is either absent or an internal file the map does not expose"
  // (`§1.3` item 1); "**A WILDCARD `"./*"` EXPORT IS REFUSED**, because it would expose the `.node` path; **a
  // deep import is refused for the same reason**" (item 2); and the manifest's field row: "**exactly ONE
  // arms-bearing entry, the ESM one**" with "a wildcard, a deep import to the addon and a CJS arm are each
  // refused" (`distribution.md §6.1` field 7).
  const exports = entryManifest(site.bareTarball).exports;
  assert.equal(typeof exports, 'object');
  const keys = Object.keys(exports);
  assert.deepEqual(keys, ['.'], `the map publishes ${JSON.stringify(keys)} and the declared set is one arm`);
  assert.deepEqual(Object.keys(exports['.']).sort(), ['import', 'types']);
  assert.equal(exports['.'].import, './index.mjs');
  assert.equal(exports['.'].types, './index.d.ts');
  assert.equal('require' in exports['.'], false, 'a CJS arm reached the one arm (`HO-1`)');
  assert.equal('default' in exports['.'], false);
});

test('installed · package.md §1.3 item 1 + contract.md §1.1 rung one · the BARE specifier `provident-storeroom` resolves from the consumer, so the one arm is the arm a consumer drives', () => {
  // DECLARED: the claimed entry is the ESM one and it is reached by the package's own name (`§1.3` item 1;
  // `contract.md §1.1`'s rungs are named, not pathed, at rung one). The observable is a successful import
  // from a driver whose own location is inside the consumer's tree.
  const report = drive(site.absentDir, 'driver-bare-specifier.mjs', ABSENT_DRIVER);
  assert.equal(report.__crashed, undefined, `the bare specifier did not import: ${JSON.stringify(report.__crashed)}`);
  assert.deepEqual(report.moduleKeys, NAMESPACE_NAMES);
});

test('installed · distribution.md §3.2 field 6 + §2.1 item 6 · THE ADDON IS NOT A SUBPATH: `provident-storeroom/build/Release/storeroom_js_binding.node` is refused by the map, and not by a missing file', () => {
  // DECLARED: the `.node`'s exposed path "is **INSIDE the platform artefact and is NOT exported as a
  // subpath of the main package**" (`distribution.md §3.2` field 6); the kernel's own clause: "**the
  // `exports` arm set is UNMOVED, the subpath shape is REFUSED BY NAME**" (`§2.1` item 6). The refusal's
  // KIND is asserted, not merely its occurrence: `ERR_PACKAGE_PATH_NOT_EXPORTED` is the map speaking,
  // where `ERR_MODULE_NOT_FOUND` would be a missing file and a weaker fact.
  const report = drive(site.absentDir, 'driver-specifier-addon.mjs', SPECIFIER_DRIVER, {
    DRIVER_SPECIFIERS: JSON.stringify([`${MAIN_NAME}/build/Release/storeroom_js_binding.node`]),
  });
  assert.equal(report.__crashed, undefined, `the specifier probe crashed: ${JSON.stringify(report.__crashed)}`);
  assert.equal(Object.keys(report).length, 1);
  assert.equal(report[`${MAIN_NAME}/build/Release/storeroom_js_binding.node`], 'ERR_PACKAGE_PATH_NOT_EXPORTED');
});

test('installed · distribution.md §2.1 item 6 (`R1` reachability) + package.md §1.3 item 1 · THE KERNEL IS NOT A SUBPATH EITHER: `src/constraint-kernel.mjs` travels in the tarball and is refused by the map', () => {
  // DECLARED, the two halves in one clause: the kernel "is NOT a separately reachable export: the `exports`
  // arm set is UNMOVED, the subpath shape is REFUSED BY NAME, and the kernel's five items (`register`,
  // `commit`, `runAttempt`, `log`, `report`) stay INTERNAL ORCHESTRATION STAGES that no consumer verb
  // exposes" — **and because it is behind the surface, its file MUST travel** (`distribution.md §2.1`
  // item 6; `A122`). So the file's PRESENCE and the specifier's REFUSAL are asserted together.
  assert.ok(site.bareEntries.includes('src/constraint-kernel.mjs'), 'the kernel module did not travel');
  assert.ok(
    existsSync(join(installedPackageRoot(site.absentDir), 'src', 'constraint-kernel.mjs')),
    'the kernel module is not in the installed tree',
  );
  const report = drive(site.absentDir, 'driver-specifier-kernel.mjs', SPECIFIER_DRIVER, {
    DRIVER_SPECIFIERS: JSON.stringify([`${MAIN_NAME}/src/constraint-kernel.mjs`]),
  });
  assert.equal(report.__crashed, undefined, `the specifier probe crashed: ${JSON.stringify(report.__crashed)}`);
  assert.equal(report[`${MAIN_NAME}/src/constraint-kernel.mjs`], 'ERR_PACKAGE_PATH_NOT_EXPORTED');
});

test('installed · package.md §1.3 item 1 · a consumer reaches the ONE arm and NOTHING ELSE by specifier: the entry file\'s own path, a deep module path and `package.json` are each refused', () => {
  // DECLARED: "every other subpath a consumer could spell is either absent or an internal file the map does
  // not expose" (`§1.3` item 1). The three spellings below are the three a consumer would try first: the
  // entry's own file, one deep entry module, and the manifest.
  const specifiers = [
    `${MAIN_NAME}/index.mjs`,
    `${MAIN_NAME}/src/entry/state.mjs`,
    `${MAIN_NAME}/package.json`,
  ];
  assert.equal(specifiers.length, 3);
  const report = drive(site.absentDir, 'driver-specifier-rest.mjs', SPECIFIER_DRIVER, {
    DRIVER_SPECIFIERS: JSON.stringify(specifiers),
  });
  assert.equal(report.__crashed, undefined, `the specifier probe crashed: ${JSON.stringify(report.__crashed)}`);
  assert.deepEqual(Object.keys(report).sort(), [...specifiers].sort());
  for (const specifier of specifiers) {
    assert.equal(report[specifier], 'ERR_PACKAGE_PATH_NOT_EXPORTED', `${specifier} was reachable`);
  }
});

test('installed · surface.md §2.9 item 1 (`A127`) + package.md §1.3 item 3 · the module namespace carries ONE name, `storeCreate`, and no second — and `storeStatus` is NOT a namespace name', () => {
  // DECLARED: "**THE OPERATIVE ENUMERATION IS ONE NAME — `storeCreate` — AND `A127`'s NAMESPACE ARITHMETIC
  // IS `11 → 1` ✓**" (`surface.md §2.9` item 1); "**`import`ing the entry yields a namespace or default
  // whose NAMED EXPORTS are exactly the verbs of `surface.md §2` and the package's own instance handle
  // factory — and NOTHING ELSE**" (`package.md §1.3` item 3, read through the `A127` clause); and the
  // published types declare `StoreStatus` as a TYPE while the namespace carries one name
  // (`bindings/js/index.d.ts` item (1)). **SO THE OWED QUESTION "is `storeStatus` a declared name?" IS
  // ANSWERED BY THIS DECLARATION AND FOLDED HERE**: a runtime `storeStatus` export would be a SECOND module
  // name and this cell would go red on it.
  const report = drive(site.absentDir, 'driver-namespace.mjs', ABSENT_DRIVER);
  assert.equal(report.__crashed, undefined, `the entry did not load: ${JSON.stringify(report.__crashed)}`);
  assert.deepEqual(report.moduleKeys, NAMESPACE_NAMES);
  assert.equal(report.moduleKeys.includes('storeStatus'), false, 'a runtime `storeStatus` name reached the namespace');
});

// =============================================================================================
// §3 — WHAT THE MAIN TARBALL SHIPS, AND WHAT IT MUST NOT (`§2.1` item 1 as corrected 2026-10-25,
//      `PUB-DD-1`, `§2.3`, `§2.4` item 2, `§5.7`)
// =============================================================================================

test('installed · contract.md §2.1 item 1 (CORRECTED 2026-10-25, `5 = 3 + 2` ✓) · the tarball carries the FIVE allowlist entries expanded and nothing beside them: `18` files, `13` of them the entry\'s own modules', () => {
  // DECLARED: "**THE OPERATIVE READING, AT THE SHIPPED BYTES: `bindings/js/package.json`'s `files` array
  // names `index.mjs`, `README.md`, `index.d.ts`, `src/entry/` and `src/constraint-kernel.mjs` — `5`
  // entries … `5 = 3 + 2` ✓, the `3` being the three the item above prints and the `2` the entry's own
  // internal modules**"; and "`src/entry/` a directory of thirteen modules; `src/constraint-kernel.mjs` a
  // file beside it" (`§2.1` item 1's 2026-10-25 clause, items (2) and (4)).
  const entries = site.bareEntries;
  assert.equal(entries.length, PACKED_FILE_COUNT, `the tarball carries ${entries.length} files and the declared expansion is ${PACKED_FILE_COUNT}`);
  assert.deepEqual(entryManifest(site.bareTarball).files, ALLOWLIST);

  const shaped = entries.filter((entry) => {
    if (entry === 'package.json') return false;
    if (entry === 'index.mjs' || entry === 'README.md' || entry === 'index.d.ts') return false;
    if (entry === 'src/constraint-kernel.mjs') return false;
    return !/^src\/entry\/[^/]+\.mjs$/.test(entry);
  });
  assert.deepEqual(shaped, [], 'the tarball carries a path no entry of the allowlist names');

  const entryModules = entries.filter((entry) => /^src\/entry\/[^/]+\.mjs$/.test(entry));
  assert.equal(entryModules.length, ENTRY_MODULE_COUNT, `the entry directory ships ${entryModules.length} modules and the declaration says ${ENTRY_MODULE_COUNT}`);
});

test('installed · contract.md §2.1 item 2 + §5.7 · NO BINARY SHIPS AT ANY KEY ON ANY TARGET: no `.node`, no `build/Release`, no `target/`, no `Cargo.toml`, no `build.rs` and no `.rs` byte is in the tarball', () => {
  // DECLARED: "**NO BINARY SHIPS, AT ANY KEY, ON ANY TARGET.** **A tarball that is byte-identical for every
  // publisher is the property this clause protects**" (§2.1 item 2); and the findings it names:
  // "`build/Release` shipped beside five platform packages"; "any binary in the tarball"; "a `build.rs`, a
  // build-script pin or a link argument reaching the MAIN package's allowlist" (`§5.7`, `P-PUB-7`).
  const forbidden = site.bareEntries.filter(
    (entry) =>
      entry.endsWith('.node') ||
      entry.endsWith('.rs') ||
      entry.startsWith('build/') ||
      entry.startsWith('target/') ||
      entry.includes('build/Release') ||
      entry === 'Cargo.toml' ||
      entry === 'Cargo.lock' ||
      entry === 'build.rs',
  );
  assert.deepEqual(forbidden, [], 'a byte the no-binary rule refuses reached the main package');
});

test('installed · contract.md §2.1\'s carriage clause + distribution.md §2.1 item 5 · `LICENSE` IS NOT AN ALLOWLIST ROW: the manifest\'s `files` names five entries and a `LICENSE` row added to it would be a FINDING', () => {
  // DECLARED: "**`LICENSE` IS NOT AN ALLOWLIST ENTRY** and is not a [fifth] member; the main package's
  // licence copy is landed by **THE RELEASE'S OWN ASSEMBLY STEP**" (`contract.md §2.1`'s carriage clause);
  // "**SO A `LICENSE` ROW ADDED TO THE MAIN PACKAGE'S `files` ARRAY IS A FINDING**, and the copy's absence
  // from that array is not a missing notice" (`distribution.md §2.1` item 5).
  for (const tarball of [site.bareTarball, site.assembledTarball]) {
    const files = entryManifest(tarball).files;
    assert.deepEqual(files, ALLOWLIST);
    assert.equal(files.includes('LICENSE'), false, 'a `LICENSE` row reached the allowlist');
    assert.equal(files.some((row) => /licen[cs]e/i.test(row)), false, 'an allowlist row names a licence byte');
  }
});

test('installed · contract.md §2.3 item 2 + distribution.md §4.3 item 2 (`Q3-5`) · THE LICENCE TRAVELS BY THE ASSEMBLY STEP: a bare pack carries no copy, and the assembled artefact carries the repository\'s own `LICENSE` at its package root', () => {
  // DECLARED: "**THE TARBALL'S OWN COPY IS AN ARTEFACT-LEVEL FACT.** Each of the SIX artefacts — the main
  // package and the five platform artefacts — carries a copy of the repository's own `LICENSE` as the
  // licence TEXT travelling with it" (`§2.3` item 2); "the licence's TEXT reaches an artefact through the
  // release's own assembly step, which copies the repository's `LICENSE` byte-for-byte into each artefact's
  // tarball" (`distribution.md §4.3` item 2).
  //
  // THE TWO READINGS ARE ONE DECLARATION AND BOTH ARE ASSERTED: the bare pack (what the manifest alone
  // declares) carries no copy, and the assembled tarball (what the release's step lands) carries one.
  assert.equal(site.bareEntries.includes('LICENSE'), false, 'a bare `npm pack` already carries the licence, so the assembly step is not the mechanism');
  assert.equal(site.assembledEntries.includes('LICENSE'), true, 'the assembly step landed no licence copy');
  assert.equal(site.assembledEntries.length, site.bareEntries.length + 1);

  // AND THE COPY IS THE REPOSITORY'S OWN TEXT, read at the two lines the appendix declares (`§2.3` item 5 —
  // the programme-name line and the copyright line), never at a re-spelled template.
  const text = readEntry(site.assembledTarball, 'LICENSE');
  assert.ok(text.includes('GNU AFFERO GENERAL PUBLIC LICENSE'), 'the copy is not the AGPL text');
  assert.ok(text.includes('Provident-Storeroom'), 'the copy does not name the programme');
  assert.ok(text.includes('Copyright (C) 2026 Auspicion Innovations LLC'), 'the copy does not carry the declared copyright line');
});

test('installed · contract.md §2.4 item 2 + §5.7 (`P-PUB-7`, `PUB-DD-3`) · the shipped types are AUTHORED and their `status` is a union over a declared-but-OPEN set: the explicit escape arm is present, and a union that admits no unknown member would be a FINDING', () => {
  // DECLARED: "**ITS `status` IS A UNION OVER A DECLARED-BUT-OPEN SET.** **The … members are DISCOVERABLE in
  // the type AND an unknown status is still typed** — the union's members beside an explicit escape — **so
  // the type survives a ruling that moves the store's set**" (`§2.4` item 2); and `§5.7`'s failure list
  // names "a `.d.ts` that enumerates the store's closed set immutably" and "a `status` type that admits no
  // unknown member".
  const types = readEntry(site.bareTarball, 'index.d.ts');
  assert.ok(types.includes('export interface StoreStatus') || types.includes('export type StoreStatus'), 'the shipped types declare no `StoreStatus`');
  assert.ok(types.includes('| (string & {})'), 'the escape arm is absent, so an unknown status is untypeable');
  // AND THE ONE NAME: the published declaration's exported FUNCTIONS are exactly one (`A127`, `11 → 1` ✓).
  const exportedFunctions = types.split('\n').filter((line) => /^export function [A-Za-z]/.test(line));
  assert.equal(exportedFunctions.length, 1, `the types declare ${exportedFunctions.length} exported functions`);
  assert.ok(exportedFunctions[0].startsWith(`export function ${NAMESPACE_NAMES[0]}(`));
});

// =============================================================================================
// §4 — REACHABILITY: EVERY FILE THE ENTRY REQUIRES BY PATH IS IN THE TARBALL
//      (`§2.1` item 1's clause (4) and its `A89`(4) item 2 property; `distribution.md §2.1` item 6 `R1`)
// =============================================================================================

test('installed · contract.md §2.1 item 1 clause (4) (`A89`(4) item 2) · EVERY relative path the packed modules reach resolves inside the tarball — the defect this rule exists for, driven at the installed bytes', () => {
  // DECLARED: "**The entry `require`s its own internal modules by path; a `files` allowlist that omitted
  // them would pack a tarball whose `index.mjs` cannot resolve, and `A89`(4) item `2`'s property — *"npm
  // omits a missing `files` entry SILENTLY"* — means such a tarball packs GREEN and fails at the
  // consumer's first `storeCreate`. So the reachability rule is the operative test**" (`§2.1` item 1's
  // 2026-10-25 clause (4)); and `R1`: "**a member a version claims and the pack does not reach is a DEFECT
  // AND NOT A LIMITATION**" (`distribution.md §2.1` item 6).
  const root = installedPackageRoot(site.absentDir);
  const modules = walkModuleFiles(root);
  assert.equal(modules.length, ENTRY_MODULE_COUNT + 2, `the installed tree carries ${modules.length} modules and the allowlist names ${ENTRY_MODULE_COUNT + 2}`);

  const specifierPattern = /(?:\bfrom\s*|(?:\bimport|\bexport)\s*\(\s*|\bimport\s+)(['"])([^'"\n]+)\1/g;
  const relativeSpecifiers = new Set();
  const unresolved = [];
  for (const module of modules) {
    const source = readFileSync(module, 'utf8');
    let match;
    while ((match = specifierPattern.exec(source)) !== null) {
      const specifier = match[2];
      if (!specifier.startsWith('.')) continue;
      relativeSpecifiers.add(specifier);
      const target = resolve(dirname(module), specifier);
      const inside = relative(resolve(root), target);
      const shipped = !inside.startsWith('..') && site.bareEntries.includes(inside.split(sep).join('/'));
      if (!existsSync(target) || !shipped) unresolved.push(`${relative(root, module)} → ${specifier}`);
    }
  }

  // NON-VACUITY, both ways: the scan FOUND specifiers (so an empty scan cannot pass this cell) and NONE of
  // them is unresolved (the rule above).
  assert.ok(relativeSpecifiers.size > 0, 'the scan found no relative specifier at all, so it proved nothing');
  assert.deepEqual(unresolved, [], 'a module the pack carries reaches a file the tarball does not');

  // AND THE TWO MODULES THE 2026-10-25 CORRECTION ADDED ARE AMONG THE ONES THAT SHIP (`5 = 3 + 2` ✓).
  assert.ok(site.bareEntries.includes('src/constraint-kernel.mjs'));
  assert.equal(site.bareEntries.filter((entry) => /^src\/entry\/[^/]+\.mjs$/.test(entry)).length, ENTRY_MODULE_COUNT);
});

test('installed · contract.md §2.1 item 1 clause (3) · the two added allowlist entries are TRACKED JAVASCRIPT and not a second durability route: neither is a binary and neither carries a platform artefact', () => {
  // DECLARED: "**WHY THE ADDITION IS NOT A LICENCE FOR A BINARY AND NOT A SECOND DURABILITY ROUTE … NEITHER
  // ADDED ENTRY IS A BINARY** … `src/entry/` and `src/constraint-kernel.mjs` are tracked JavaScript modules
  // compiled from the same tree as `index.mjs`; they carry no platform artefact at any key and no
  // machine-dependent byte" (`§2.1` item 1's 2026-10-25 clause (3)).
  const added = site.assembledEntries.filter((entry) => entry === 'src/constraint-kernel.mjs' || entry.startsWith('src/entry/'));
  assert.equal(added.length, ENTRY_MODULE_COUNT + 1, `the two added entries expand to ${added.length} paths`);
  for (const entry of added) {
    assert.ok(entry.endsWith('.mjs'), entry + ' is not a module');
    const bytes = readEntry(site.assembledTarball, entry);
    assert.ok(bytes.length > 0, `${entry} is empty`);
    assert.equal(bytes.includes('\u0000'), false, `${entry} carries a NUL byte and is not a text module`);
  }
});

// =============================================================================================
// §5 — THE DECLARED ABSENT-ADDON ANSWER, WHEN THE PLATFORM PACKAGE IS NOT THERE
//      (`§1.1` rung three; `§1.4` items 1–3 and 6; `§1.5` item 6; `P-PUB-4`; `P-PUB-5`)
// =============================================================================================

test('installed · contract.md §1.1 rung three + §1.4 item 3 · with NO platform package and NO rung-two addon, `storeCreate` answers the declared refusal — NO instance is returned and NO JavaScript store is substituted', () => {
  // DECLARED: "**RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** **Failing rung two, the entry answers the
  // DECLARED ABSENT-ADDON FORM … and NO instance is returned**" (`§1.1` rung three); "**NO FALLBACK EXISTS
  // … The package NEVER falls back to a JavaScript store, NEVER absorbs a state silently, NEVER degrades to
  // a partial instance or a no-op verb**" (`§1.4` item 3).
  const report = drive(site.absentDir, 'driver-absent.mjs', ABSENT_DRIVER);
  assert.equal(report.__crashed, undefined, `the entry did not load: ${JSON.stringify(report.__crashed)}`);
  assert.equal(report.threw, true, 'the absent-addon state returned instead of refusing');
  assert.equal(report.returned, null, `the absent-addon state returned ${JSON.stringify(report.returned)}`);
});

test('installed · contract.md §1.4 item 1 (`RCA-8(g)`: `{status, message, log}`, `3` members, `log: []`) · the refusal is a THROWN PLAIN OBJECT of exactly those three own members, and it is not an `Error`, not a raw host error and not a package-minted shape', () => {
  // DECLARED: "**THE SINGLE DECLARED FAILURE ARM, ITS FORM AND ITS SUBJECT, FIXED ONCE** … its member set is
  // EXACTLY `{status, message}`" as read through the `RCA-8(g)` pointer: "**THE OPERATIVE FORM OF THIS
  // UNIT'S ARM IS `{status, message, log}`, `3` MEMBERS … and its declared value on every state of THIS
  // unit's arm is `[]`, because the load path reaches it BEFORE any attempt exists**" (`§1.4` item 1);
  // "NO verb, no construction and no load-path state of this unit answers ANY other failure shape: not a
  // returned union, not an `Error` subclass, not a `Promise` rejection, not a third member, and not a
  // package-authored status".
  const report = drive(site.absentDir, 'driver-arm-form.mjs', ABSENT_DRIVER);
  assert.equal(report.__crashed, undefined, `the entry did not load: ${JSON.stringify(report.__crashed)}`);
  const form = report.form;
  assert.ok(form, 'the arm did not throw');
  assert.equal(form.plainObject, true, 'the arm is not a plain object');
  assert.equal(form.isError, false, 'the arm is an `Error` (a second failure shape)');
  assert.equal(form.constructorName, 'Object');
  assert.deepEqual([...form.own].sort(), [...ARM_MEMBERS].sort());
  assert.deepEqual([...form.enumerable].sort(), [...ARM_MEMBERS].sort());
  assert.equal(form.logIsArray, true);
  assert.deepEqual(form.log, []);
  // NOT A RAW HOST ERROR: no `MODULE_NOT_FOUND`, no `ERR_DLOPEN_FAILED` and no `code` member at all.
  assert.equal(form.hasCode, false, 'a host error code reached the arm');
});

test('installed · contract.md §1.4 item 1 (`P-PUB-5`) · the `status` is the STORE\'S own `FilePathUnreachable` carried VERBATIM as a string — the package mints no status and answers no second one', () => {
  // DECLARED: "its `status` is the store's own `FilePathUnreachable` member carried VERBATIM as a JS
  // `string`" (`§1.4` item 1); "**THE PACKAGE MINTS NO STATUS**" (`§1.4` item 6's rule (i)); `P-PUB-5`'s
  // failure list: "a minted status".
  const form = drive(site.absentDir, 'driver-arm-status.mjs', ABSENT_DRIVER).form;
  assert.ok(form);
  assert.equal(typeof form.status, 'string');
  assert.equal(form.status, ARMED_STATUS);
});

test('installed · contract.md §1.4 item 2 + §1.5 item 6 (a)(b)(c) (`PUB-DD-26`) · the `message` is the generator\'s clause byte-for-byte with the BOTH-PATHS subject in ONE slot: rung one\'s name first, `\', \'` between, each path inside its OWN apostrophes, the slot inside the clause\'s own pair', () => {
  // DECLARED, the three parts of the join, each once: "(a) **THE SEPARATOR IS `', '`** — a comma and one
  // space — **AND NO OTHER SEPARATOR IS LAWFUL**"; "(b) **THE ORDER IS RUNG ONE FIRST AND RUNG TWO
  // SECOND** — rung one's resolved name, then rung two's module-relative path"; "(c) **EACH PATH IS KEPT
  // INSIDE THE GENERATOR'S OWN `'<subject>'` SLOT … TWO SUBJECTS ARE RENDERED IN THE ONE SLOT BY MAPPING
  // THE GENERATOR'S OWN RENDERING ACROSS THE TWO PATHS AND JOINING THE TWO RENDERINGS BY THE SEPARATOR**",
  // so "**the declared rendering is therefore `''<rung one's resolved name>', '<rung two's module-relative
  // path>'' is not reachable at construction …` — two quoted subjects inside the one slot, which is why
  // the rendering opens with TWO apostrophes and closes with TWO**" (`§1.5` item 6); and `§1.4` item 2:
  // "where BOTH rungs were tried and neither yielded a loadable artefact, the declared absent form's
  // subject is BOTH PATHS, rung one's resolved name and rung two's module-relative path".
  const report = drive(site.absentDir, 'driver-arm-message.mjs', ABSENT_DRIVER);
  const form = report.form;
  assert.ok(form);

  // RUNG ONE's subject is the ONE name the closed key set declares for this runtime's pair (`§1.2`'s
  // operative column, `§1.3` item 1: SELECTED from the table, never built) — and RUNG TWO's is the
  // declared module-relative path BESIDE THE ENTRY MODULE, constructed from the entry's own location
  // (`§1.1` rung two), which is read off the entry URL the same process reported.
  const expectedRungOne = FIVE_NAMES[site.host];
  assert.ok(expectedRungOne, `the host pair ${site.host} is not one of the five declared keys`);
  const entryDirectory = dirname(fileURLToPath(report.entryUrl));
  const expectedRungTwo = join(entryDirectory, ...RUNG_TWO_RELATIVE);
  const expected = `''${expectedRungOne}${JOIN}${expectedRungTwo}'' ${GENERATOR_CLAUSE}`;

  assert.equal(form.message, expected);
  // THE THREE PARTS ARE ALSO READ WHERE THE EQUALITY ABOVE COULD BE MET BY ACCIDENT: one separator and no
  // second, and the two apostrophes at each end of the slot.
  assert.equal(form.message.split(JOIN).length, 2, 'the subject carries more than one separator');
  assert.ok(form.message.startsWith("''"), 'the slot does not open with the clause\'s own pair');
  assert.ok(form.message.includes(`node_modules/${MAIN_NAME}/build/Release/storeroom_js_binding.node`));
  assert.ok(form.message.endsWith(GENERATOR_CLAUSE));
});

test('installed · contract.md §1.4 item 2 (THE SUBJECT) · neither half of the subject is `cfg.filePath`: the subject names the ADDON the load path reached, and a `cfg` whose `filePath` is present changes no byte of it', () => {
  // DECLARED: "**the subject is the ADDON ARTEFACT'S OWN PATH — the file the load path reached** … **AND
  // `cfg.filePath` is NEVER the subject of this unit's arm** — that path is the STORE'S construction
  // argument, and a `cfg.filePath` that fails the store's own construction-time reachability probe is the
  // SEPARATE state the store's contract declares, reached at the store's own construction and never at the
  // load path" (`§1.4` item 2).
  const absentCFG = drive(site.absentDir, 'driver-subject-a.mjs', ABSENT_DRIVER);
  const withFilePath = drive(
    site.absentDir,
    'driver-subject-b.mjs',
    ABSENT_DRIVER.replace(
      'const CFG = { journalLength: 1, listeners: [] };',
      "const CFG = { journalLength: 1, listeners: [], filePath: '/tmp/sr-blind-installed-cfg-probe.json' };",
    ),
  );
  assert.ok(absentCFG.form && withFilePath.form);
  assert.equal(withFilePath.form.message, absentCFG.form.message, 'a `cfg.filePath` reached the load-path arm\'s subject');
  assert.equal(absentCFG.form.message.includes('sr-blind-installed-cfg-probe'), false);
});

// =============================================================================================
// §6 — RUNG ONE FIRES, AND THE VERSION READ DOES NOT REFUSE THE RELEASED ARTEFACT
//      (`§1.1` rung one; `§1.5` items 1–2; `§5.0a`/`P-PUB-9`; `§4.3` item 1)
// =============================================================================================

test('installed · contract.md §4.3 item 1 + §1.4 item 1 (the `present-right-version` row) · with the host\'s platform package installed, the entry loads AT RUNG ONE and returns a product that carries the store — the version read refuses nothing', (t) => {
  // DECLARED, what `LIVE/INSTALL` verifies: "that the claimed ESM entry resolves after install; **that rung
  // one — the platform package — is the rung that fires in a published install, which no in-place battery
  // can reach**; that the version read does not refuse the released artefact" (`§4.3` item 1). The declared
  // answer at that state is SUCCESS: "rung one loads and its `version` matches → **SUCCESS**, and no
  // rung-two attempt is made" (`§1.4` item 1's taxonomy table).
  if (!site.presentDir) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const report = drive(site.presentDir, 'driver-present.mjs', PRESENT_DRIVER, {
    DRIVER_PLATFORM_NAME: site.platformName,
  });
  assert.equal(report.__crashed, undefined, `the entry did not load at rung one: ${JSON.stringify(report.__crashed)}`);
  // THE PRODUCT IS REAL, not a partial instance: the drive writes and reads a value back through the
  // declared verbs (`surface.md §2.2`'s `write`/`read`), and the member set is the declared FOURTEEN own
  // members as the surface's own clause enumerates them (`index.d.ts`'s `StoreInstance` head).
  assert.equal(report.readBack, 7);
  assert.equal(report.ownMembers.length, 14, `the product carries ${report.ownMembers.length} own members and the declaration names 14`);
  for (const name of ['read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten', 'addConstraint', 'constraintOn', 'constraintOff', 'constraints', 'removeListener', 'removeConstraint', 'register']) {
    assert.ok(report.ownMembers.includes(name), 'the product carries no ' + name);
  }
  // AND NO MEMBER OF THE PRODUCT IS A NAME OF THE NAMESPACE (`surface.md §2.1` (e) item 2).
  assert.deepEqual(report.moduleKeys, NAMESPACE_NAMES);
});

test('installed · contract.md §1.5 item 1 + §5.0a (`P-PUB-9`) · the released artefact answers its OWN `version()`, and that self-report equals the main package manifest\'s `version` CHARACTER FOR CHARACTER — the read\'s equality holds before the comparison runs', (t) => {
  // DECLARED: "**THE VERSION IS READ ON THE LOAD PATH, AT RUNG ONE … The addon answers its own version
  // through the ONE name of its export set that exists for this purpose, called as a function and
  // answering a `string`** … **so the artefact can be audited from itself**" (`§1.5` item 1; `package.md
  // §1.3` item 4); "**THE ARTEFACT'S OWN `version` IS STAMPED AT BUILD TIME FROM THE PACKAGE MANIFEST'S
  // `version`** … **so the equality item `1` compares is established BEFORE the comparison runs**"
  // (`§1.5`'s 2026-10-12 clause item 1; `§5.0a`, `P-PUB-9`, `PAR-PUB-35`).
  if (!site.presentDir) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const report = drive(site.presentDir, 'driver-version.mjs', PRESENT_DRIVER, {
    DRIVER_PLATFORM_NAME: site.platformName,
  });
  assert.equal(report.__crashed, undefined, `the artefact could not be audited from itself: ${JSON.stringify(report.__crashed)}`);
  assert.equal(typeof report.platform.version, 'string');
  assert.equal(report.platform.version, VERSION);
  assert.equal(report.platform.version, entryManifest(site.assembledTarball).version);
  // RECORDED AND NOT ASSERTED: the artefact the platform package's `main` resolves to also exposes twelve
  // names beside `version` (`register`, `read`, `write`, `storeCreate`, `delete`, `listen`, `errorMessage`,
  // `rollback`, `unlisten`, `commitFile`, `readLiteral`, `removeListener`) and carries NO `call`.
  // `package.md §1.3` item 4 declares the INTERNAL ADDON's export set to be EXACTLY FIVE NAMES (`version` ·
  // `errorMessage` · `storeCreate` · `call` · `register`), and `surface.md`'s 2026-10-16 counter-pass reads
  // *"the addon's `5` exports"* as UNMOVED. **NO CELL HERE ASSERTS THAT SET EITHER WAY**, because the
  // declaration's own subject is *"the object the entry's own module-private key holds"* — what an `import`
  // of the claimed entry exposes is one name and nothing else, and the identity of that private object is a
  // fact of `bindings/js/index.mjs`, a file this pass did not read. The question is recorded as `OWED`.
  assert.equal(report.platform.keys.includes('version'), true, '`version` is not a name of the artefact\'s export set');
});

test('installed · distribution.md §3.2 field 6 · the platform artefact reaches its `.node` THROUGH ITS OWN `main`, at its own package root, and the main package exports no subpath to it', (t) => {
  // DECLARED: "**the artefact's `.node` at its own package root, carrying the crate's declared target name
  // `storeroom_js_binding` with the `.node` extension** … **the path is INSIDE the platform artefact and is
  // NOT exported as a subpath of the main package**: rung one `require`s the package NAME, and the platform
  // artefact's own `main`/`exports` resolution reaches the `.node`" (`distribution.md §3.2` field 6).
  if (!site.presentDir) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const report = drive(site.presentDir, 'driver-platform-main.mjs', PRESENT_DRIVER, {
    DRIVER_PLATFORM_NAME: site.platformName,
  });
  assert.equal(report.__crashed, undefined, `the artefact did not resolve by name: ${JSON.stringify(report.__crashed)}`);
  const platformRoot = resolve(site.presentDir, 'node_modules', ...site.platformName.split('/'));
  assert.equal(resolve(report.platform.resolved), resolve(join(platformRoot, 'storeroom_js_binding.node')));
  assert.equal((entryManifest(site.platformTarball).main), 'storeroom_js_binding.node');
});

// =============================================================================================
// §7 — THE FIVE PLATFORM MANIFESTS AND THE IDENTITY FIELDS, AND THEIR EQUALITY ACROSS THE
//      ARTEFACTS (`distribution.md §3.1`, `§3.2` fields 1–9, `§3.3`, §6.1; `contract.md §2.3` item 1)
// =============================================================================================

test('installed · distribution.md §3.2 field 1 + contract.md §5.6 item 1 · the locally packed platform artefact\'s `name` is the FIVE-NAME TABLE\'s spelling for its own label, character for character', (t) => {
  // DECLARED: field `1` carries "the artefact's own declared name, spelled EXACTLY as `resolution.md §3.1`'s
  // table prints it", its operative rule reading "**one of the five, and no sixth; its scope is
  // `@auspicion` and its name carries the project token `provident-storeroom`**" (`distribution.md §3.2`
  // field 1 as reconciled; `contract.md §5.6` item 1).
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const manifest = entryManifest(site.platformTarball);
  assert.equal(manifest.name, FIVE_NAMES[site.host]);
  assert.equal(FIVE.includes(manifest.name), true);
});

test('installed · distribution.md §3.2 field 2 + contract.md §3.2 item 2 · the platform `version` and the main package\'s `version` are THE SAME FIGURE, and so is every pin — the coupling rule read across two real artefacts', (t) => {
  // DECLARED: field `2` carries "**`0.1.0` for the first release, and thereafter THE MAIN PACKAGE'S OWN
  // `version`, character for character**", its rule being "**the coupling rule: the five artefacts share
  // ONE version with the main package**" (`distribution.md §3.2` field 2, read at its operative figure);
  // "**the five platform artefacts' `version` equals the MAIN package's `version`**" (`contract.md §3.2`
  // item 2).
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const platform = entryManifest(site.platformTarball);
  const main = entryManifest(site.assembledTarball);
  assert.equal(platform.version, main.version);
  assert.equal(platform.version, VERSION);
  assert.deepEqual([...new Set(Object.values(main.optionalDependencies))], [platform.version]);
});

test('installed · distribution.md §3.2 fields 7–8 + §4.2 item 2 · the floor and the licence FIELD agree across the two artefacts: `>=18.0.0` and `AGPL-3.0` on both sides, and no third spelling', (t) => {
  // DECLARED: field `7` carries "`{ \"node\": \">=18.0.0\" }`, **the same floor the main package declares**";
  // field `8` carries "**the manifest's own `license` field reading `AGPL-3.0`**"; and "**EACH PLATFORM
  // ARTEFACT'S MANIFEST `license` FIELD READS `AGPL-3.0`, so the field and the copy agree within each
  // artefact**" (`§4.2` item 2). `contract.md §2.3` item 1 fixes the FOUR sites and the TWO spellings, so a
  // third spelling anywhere is a FINDING (`distribution.md §4.1`).
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const platform = entryManifest(site.platformTarball);
  const main = entryManifest(site.assembledTarball);
  assert.equal(main.engines.node, ENGINES_NODE);
  assert.equal(platform.engines.node, ENGINES_NODE);
  assert.equal(main.license, LICENCE);
  assert.equal(platform.license, LICENCE);
  assert.equal(platform.license, main.license);
  // THE SECOND SPELLING IS THE CRATE'S AND NOT AN ARTEFACT'S: `AGPL-3.0-or-later` belongs to
  // `bindings/js/Cargo.toml` alone (`§2.3` item 1 site (iv)).
  assert.equal(/or-later/.test(main.license) || /or-later/.test(platform.license), false);
});

test('installed · distribution.md §3.2 fields 3–4 + contract.md §5.7 (`P-PUB-7`) · the artefact\'s `os`×`cpu` pair AGREES with the pair its own name spells — the install-skip filter, never the loader\'s key', (t) => {
  // DECLARED: field `3` carries "the artefact's own operating system, as the field's documented token";
  // field `4`, its architecture; and the pair is "**an INSTALL-SKIP filter and NOT the loader's key**, which
  // is `process.platform` × `process.arch`". `§5.7`'s failure list names "**an artefact whose `os`/`cpu`
  // pair disagrees with the pair its own `name` spells**".
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const manifest = entryManifest(site.platformTarball);
  const [platformToken, archToken] = site.host.split('-');
  assert.deepEqual(manifest.os, [platformToken]);
  assert.deepEqual(manifest.cpu, [archToken]);
  // AND THE `-gnu`/`-msvc` SUFFIX NAMES A TARGET'S TOOLCHAIN AND NEVER A SIXTH KEY (`contract.md §1.2`), so
  // the field that could express a C library carries none: no `libc` token anywhere in the pair.
  assert.equal(JSON.stringify([manifest.os, manifest.cpu]).includes('libc'), false);
});

test('installed · distribution.md §3.2 field 5 + §3.3 · the artefact\'s allowlist NAMES ITS OWN `.node` and the licence copy, both of which the packed artefact carries — and NO `optionalDependencies` and no `exports` arm is declared on it', (t) => {
  // DECLARED: field `5` carries "the artefact's own allowlist: the manifest's sibling `.node` path AND the
  // licence copy", its rule naming "**an artefact whose allowlist omits its `.node` cannot be loaded by
  // rung one**" (`§3.2` field 5; `contract.md §5.7`); and "**NO `optionalDependencies` FIELD IS DECLARED ON
  // ANY PLATFORM ARTEFACT.** A platform artefact carries its own `.node` and nothing else" (`§3.3`).
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const manifest = entryManifest(site.platformTarball);
  assert.ok(Array.isArray(manifest.files));
  assert.equal(manifest.files.includes('storeroom_js_binding.node'), true, 'the allowlist omits the `.node`');
  assert.equal(manifest.files.includes('LICENSE'), true, 'the allowlist omits the licence copy');
  assert.ok(site.platformEntries.includes('storeroom_js_binding.node'));
  assert.ok(site.platformEntries.includes('LICENSE'));
  assert.equal(site.platformEntries.includes('package.json'), true);
  // NON-VACUITY AND THE ONE REFUSED FIELD: the packed set is the allowlist's own expansion, and the two
  // fields this part refuses are absent.
  assert.deepEqual(site.platformEntries, ['LICENSE', 'README.md', 'package.json', 'storeroom_js_binding.node']);
  assert.equal('optionalDependencies' in manifest, false, 'a platform artefact declared `optionalDependencies`, which §3.3 refuses by name');
  assert.equal('exports' in manifest, false, 'a platform artefact declared an `exports` arm');
  assert.deepEqual(manifest.publishConfig, { access: 'public' }); // field `9`
});

test('installed · distribution.md §4.2 item 1 · the platform artefact is INSTALLABLE ON ITS OWN and its tarball carries the licence text, so an install of it alone carries the notice', (t) => {
  // DECLARED: "**EACH OF THE SIX ARTEFACTS CARRIES A COPY OF THE REPOSITORY'S OWN `LICENSE`**: the main
  // package and each of the five platform artefacts alike. **The copy travels with the artefact, so an
  // install of a platform artefact ALONE carries the licence text** — which matters because each target
  // artefact is installable on its own" (`§4.2` item 1).
  if (!site.platformTarball) {
    t.skip(`NOT RUN — D-21: ${site.notDrivable}`);
    return;
  }
  const text = readEntry(site.platformTarball, 'LICENSE');
  assert.ok(text.includes('GNU AFFERO GENERAL PUBLIC LICENSE'));
  assert.ok(text.includes('Provident-Storeroom'));
  // AND "ON ITS OWN" IS DRIVEN, not read: the artefact's own `.node` is what the name resolves to in the
  // install that carried the two tarballs, and the main package contributes no byte of it.
  const report = drive(site.presentDir, 'driver-platform-alone.mjs', PRESENT_DRIVER, {
    DRIVER_PLATFORM_NAME: site.platformName,
  });
  assert.equal(report.__crashed, undefined, JSON.stringify(report.__crashed));
  assert.ok(report.platform.resolved.endsWith(sep + 'storeroom_js_binding.node'));
});

test(`installed · distribution.md §6.1 fields 1, 5, 6, 9, 11, 12 + contract.md §2.3 item 1 site (i) · the MAIN package's identity is exactly as declared: UNSCOPED \`provident-storeroom\`, \`${VERSION}\`, ESM, \`AGPL-3.0\`, the \`>=18.0.0\` floor, \`types\` at \`index.d.ts\`, and a PUBLIC publish configuration`, () => {
  // DECLARED, field by field (`distribution.md §6.1`): field `1` "`provident-storeroom` — the MAIN package's
  // identity, UNSCOPED, as the architect's ruling names it" (`A82`); field `5` "`AGPL-3.0`"; field `6` the
  // floor; field `9` "`index.d.ts`"; field `11` "`{ \"access\": \"public\" }`"; field `12` "`\"module\"`".
  const manifest = entryManifest(site.assembledTarball);
  assert.equal(manifest.name, MAIN_NAME);
  // THE PROJECT TOKEN REACHES THE FIVE PLATFORM NAMES AND NOT THIS ONE: the main package gains no scope and
  // no token (`contract.md §1.3`'s closing cell; `distribution.md §6.1`'s `A88` reconciliation).
  assert.equal(manifest.name.startsWith('@'), false, 'the main package gained a scope');
  assert.equal(manifest.name.includes('provident-storeroom-js'), false, 'the project token reached the main package\'s identity');
  assert.equal(manifest.version, VERSION);
  assert.equal(manifest.type, 'module');
  assert.equal(manifest.license, LICENCE);
  assert.equal(manifest.engines.node, ENGINES_NODE);
  assert.equal(manifest.types, 'index.d.ts');
  assert.deepEqual(manifest.publishConfig, { access: 'public' });
});

test('installed · contract.md §2.5 (the 2026-10-11 metadata reversal) + distribution.md §6.1 fields 2–4 · the three metadata fields are DECLARED WITH THE REMOTE, and the description, the keywords and the author are supplied — none of them a placeholder', () => {
  // DECLARED: `repository` · `homepage` · `bugs` "ARE DECLARED, AND THEY CARRY THE REMOTE THE REGISTRY
  // NAMED", with the values `{ "type": "git", "url": "git+https://github.com/LittleKingsguard/Provident-Storeroom.git" }`,
  // `https://github.com/LittleKingsguard/Provident-Storeroom#readme` and
  // `{ "url": "https://github.com/LittleKingsguard/Provident-Storeroom/issues" }` (`contract.md §2.5`'s
  // 2026-10-11 clause, quoted there verbatim); and fields `2`–`4` — "a LONG description naming the unit, the
  // deliverable and the binding's own route", "`keywords`", "`author`" — are supplied (`distribution.md §6.1`).
  const manifest = entryManifest(site.assembledTarball);
  assert.deepEqual(manifest.repository, { type: 'git', url: 'git+https://github.com/LittleKingsguard/Provident-Storeroom.git' });
  assert.equal(manifest.homepage, 'https://github.com/LittleKingsguard/Provident-Storeroom#readme');
  assert.deepEqual(manifest.bugs, { url: 'https://github.com/LittleKingsguard/Provident-Storeroom/issues' });
  assert.equal(typeof manifest.description, 'string');
  assert.ok(manifest.description.length > 100, 'the description is not the long one the field declares');
  assert.ok(manifest.description.includes('U-STOREROOM-PUBLISH'), 'the description does not name the unit');
  assert.ok(Array.isArray(manifest.keywords) && manifest.keywords.length > 0);
  assert.ok(manifest.keywords.includes('provident-storeroom'));
  assert.equal(typeof manifest.author, 'string');
  assert.ok(manifest.author.length > 0);
});
