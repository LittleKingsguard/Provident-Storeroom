// tests/e2e/staged-install/staged-install-support.mjs
// **RUN A'S OWN HELPER — THE LABEL'S SINGLE CARRIER AND THE IMPORT/INSTALL MECHANISM** for the four `O3`
// cells of `tests/e2e/staged-install/` (`strata/decisions.md` `D-6`, `D-7`, `D-9`;
// `docs/L1/test-stratification.json`'s `o3_staged_tree`).
//
// ---------------------------------------------------------------------------------------------
// WHY THIS FILE EXISTS, IN THE RULINGS' OWN WORDS
// ---------------------------------------------------------------------------------------------
//
// **`D-6`** (*"Use O3 for e2e publish-readiness, O4 for earlier tests"*): an `O3` cell *"assembles a package
// tree into a scratch `node_modules` … and imports the package **by its name from inside that tree**. It
// passes through the package's **`exports` map** *and* through an **install-shaped** tree."*
//
// **`D-7`** (*"O3 is for surface-facing/install tests only and will have/need its own test helpers for the
// import/install regardless"*): **an `O3` cell must NOT consume an `O4` helper**, because *"one `import`
// statement cannot be both a name reach and a path reach."* **THE NAME REACH AND THE STAGING ARE THIS
// FILE'S, AND NO CELL OF THE `O3` SET SPELLS EITHER ITSELF.**
//
// **`D-9`** (the structural move, (b)): the four `O3` cells *"form RUN A, under `tests/e2e/staged-install/`,
// with its own glob … and its own label (`LIVE / ASSEMBLED PACKAGE`) carried by
// `tests/e2e/staged-install/staged-install-support.mjs`"*. **`LAYER` BELOW IS THAT CARRIER — the label's one
// home for run A, so no cell re-types it** (`package-entry.test.mjs`'s `S-LAYER` cell reads it here rather
// than comparing a literal to itself, which is finding `F13`'s second edit).
//
// ---------------------------------------------------------------------------------------------
// WHAT THE TREE CARRIES, AND WHAT IT DELIBERATELY DOES NOT
// ---------------------------------------------------------------------------------------------
//
// **THE CONTENTS ARE THE MANIFEST'S ALLOWLIST AS NPM EXPANDS IT** (`o3_staged_tree.contents`: *"the files
// allowlist as the manifest carries it … staged under `node_modules/provident-storeroom/`, with the tree's
// own `package.json` carrying name, version, type, exports and optionalDependencies as the shipped manifest
// carries them"*). The expansion is `packedMembers` from `../pack-reachability.mjs` — the SAME instrument the
// `D-4` invariant is measured with — because a second hand-rolled copy of npm's rule would be a second
// unowned spelling of the allowlist, and the one that drifted would be the tree's own subject.
//
// **⟶ AND THAT SINGLE IMPORT IS NOT THE `D-7` PROHIBITION, WHICH IS STATED HERE SO IT IS NOT MISREAD AS ONE.**
// `D-7` forbids an `O3` cell consuming an `O4` helper *because the two routes need OPPOSITE SPECIFIER
// SPELLINGS in one import statement*. `pack-reachability.mjs` and `module-set.mjs` carry **no package
// specifier at all** — neither a name nor a path: they are handed a directory and read bytes. They are the
// module-set and allowlist instruments `D-14` and `D-4` declare once for every drive, they are consumed by
// cells of BOTH routes, and they stay route-neutral. **THE IMPORT/INSTALL MECHANISM — the tree, the driver,
// the name — IS THIS FILE'S ALONE.**
//
// **THE ADDON IS STAGED AS A PLATFORM PACKAGE, NEVER AS THE CHECKOUT'S `build/Release` BESIDE THE ENTRY**
// (`o3_staged_tree.addon_staging`): `node_modules/@auspicion/<the host row's declared name>/` carries the
// built artefact as **that package's own `main`**, exactly as an install of the published platform package
// would place it. **THE CHECKOUT'S `build/Release` IS NOT COPIED INTO THE ENTRY'S DIRECTORY**, because rung
// two is the rung an install shape must not lean on (`P-PUB-7`, `JSG-12.18`), so a cell that needs a real
// store reaches it through **rung one or not at all**.
//
// **ISOLATION** (`o3_staged_tree.isolation`): one root per caller under the operating system's temporary
// area, one `mkdtemp` tree beneath it, nothing of the repository written, renamed or removed, and every root
// swept on process exit.
//
// ---------------------------------------------------------------------------------------------
// THE NAME REACH — WHERE THE SPECIFIER STANDS
// ---------------------------------------------------------------------------------------------
//
// **`strata/decisions.md`'s `respelling.o3_mechanism` is obeyed literally:** *"The specifier does NOT move
// within the test file; it moves INTO the tree, spelled in a driver staged inside the staged tree … It must
// NOT be 'fixed' to a path inside the tree: a path there bypasses exports and voids the route."*
//
// So `writeNameDriver` writes `name-driver.mjs` **at the tree's root** — with `node_modules/provident-storeroom`
// beside it — and that driver's ONE static import spells the package by **NAME**. The test file imports the
// DRIVER by path, which is not the package's reach at all: the package's reach is the driver's, and it
// resolves through `node_modules/` and then through the `exports` map, which is the claim `D-7` reserves to
// this set.
//
// **AND THE REACH IS IN-PROCESS ON PURPOSE.** Two cells of run A count `process.dlopen` calls and construct
// stores from the reached namespace, so the tree's module graph must be loaded in the drive's own process and
// not in a child. The driver carries its own `createRequire` as well, so a cell that probes RESOLUTION
// (`require.resolve`) probes it **from inside the tree** — which is what makes a deep-import refusal an
// `ERR_PACKAGE_PATH_NOT_EXPORTED` from this package's own map rather than a `MODULE_NOT_FOUND` from a
// checkout that is not the package.

import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

import { packedMembers } from '../pack-reachability.mjs';

// ---------------------------------------------------------------------------------------------
// the run's declaration — `D-9`'s label, its preset layer and its own command
// ---------------------------------------------------------------------------------------------

/** **THE LABEL `D-9` MOVED `run A` TO** — one home, read by every cell of the run and never re-typed. */
export const LAYER = 'LIVE / ASSEMBLED PACKAGE';
/** `D-9`: the preset layer the run reports against (`assembled`, moved from `envelope`). */
export const PRESET = 'assembled';
/** `contract.md §4.2` item 2: there is no assembled application to be green, so `APP` is declared NONE. */
export const APP_LAYER = 'NONE';
/** The run's own command (`test-stratification.json` `o3_staged_tree.run_and_directory`): its OWN glob. */
export const COMMAND = 'node --test tests/e2e/staged-install/*.test.mjs';
/** The run's own directory, relative to the repository root — the `site` a figure of this run reports. */
export const RUN_RELATIVE_PATH = 'tests/e2e/staged-install/';
/** This carrier's own path, so a cell can read the label at its bytes and not only through the import. */
export const HELPER_RELATIVE_PATH = 'tests/e2e/staged-install/staged-install-support.mjs';

// ---------------------------------------------------------------------------------------------
// the repository, the package and the five declared platform names
// ---------------------------------------------------------------------------------------------

/** `tests/e2e/staged-install/` → the repository root: three levels, re-derived by this file and no other. */
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
/** The package under test — reached by PATH as a directory, never as a module: the tree is what loads. */
export const PACKAGE_DIR = join(REPO_ROOT, 'bindings', 'js');
/** The package's own registry identity, which is also the spelling the tree's `node_modules` entry carries. */
export const PACKAGE_NAME = 'provident-storeroom';
/** `resolution.md §3.1` — the five declared platform names, at the scope `A88`(a) fixes. */
export const FIVE_PLATFORM_NAMES = [
  '@auspicion/provident-storeroom-js-linux-x64-gnu',
  '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  '@auspicion/provident-storeroom-js-darwin-x64',
  '@auspicion/provident-storeroom-js-darwin-arm64',
  '@auspicion/provident-storeroom-js-win32-x64-msvc',
];
/** The checkout's one built artefact — the bytes the staged platform package publishes as its `main`. */
export const BUILT_ADDON = join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node');
/** The artefact's file name: the platform packages' declared `main` (`PAR-PUB-30`). */
export const ARTEFACT_NAME = 'storeroom_js_binding.node';

/** The host's row of the five-name table, or `undefined` where the table covers no name for this pair. */
export function hostPlatformName() {
  const rows = {
    'linux·x64': FIVE_PLATFORM_NAMES[0],
    'linux·arm64': FIVE_PLATFORM_NAMES[1],
    'darwin·x64': FIVE_PLATFORM_NAMES[2],
    'darwin·arm64': FIVE_PLATFORM_NAMES[3],
    'win32·x64': FIVE_PLATFORM_NAMES[4],
  };
  return rows[`${process.platform}·${process.arch}`];
}

// ---------------------------------------------------------------------------------------------
// the scratch root — one per caller, swept on exit
// ---------------------------------------------------------------------------------------------

const ROOTS = [];
let sweeperArmed = false;

/** **ONE SCRATCH ROOT PER CALLER, under the operating system's temporary area** (`o3_staged_tree.isolation`). */
export function mintStageRoot(prefix = 'storeroom-staged-') {
  const root = mkdtempSync(join(tmpdir(), prefix));
  ROOTS.push(root);
  if (!sweeperArmed) {
    sweeperArmed = true;
    process.on('exit', () => {
      for (const swept of ROOTS) {
        try { rmSync(swept, { recursive: true, force: true }); } catch { /* the sweep is best-effort */ }
      }
    });
  }
  return root;
}

// ---------------------------------------------------------------------------------------------
// the tree
// ---------------------------------------------------------------------------------------------

/**
 * **ASSEMBLE THE STAGED PACKAGE TREE UNDER `treeDir`** and answer what was staged, so a cell can read the
 * tree's own bytes rather than the checkout's.
 *
 * The members are the manifest's `files` expanded by npm's rule (`packedMembers`), which **includes
 * `package.json`** — npm packs it whatever the allowlist says — so the tree's own manifest is the SHIPPED
 * manifest byte-for-byte and carries `name`, `version`, `type`, `exports` and `optionalDependencies` as
 * `o3_staged_tree.contents` requires. **Nothing is authored here and nothing is filtered**: a tree staged by a
 * second opinion of the allowlist would measure that opinion and not the package.
 *
 * `withArtefact` stages the host platform package beside it (the default). A cell whose subject is the
 * ABSENT-addon arm passes `false` and gets a tree whose rung one cannot fire — the same tree the battery's
 * other drives build, with the artefact as the only difference.
 */
export function stagePackageTree(treeDir, { withArtefact = true } = {}) {
  const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
  const members = packedMembers(PACKAGE_DIR, manifest.files);
  const packageDir = join(treeDir, 'node_modules', PACKAGE_NAME);
  for (const member of members) {
    const from = join(PACKAGE_DIR, ...member.split('/'));
    const to = join(packageDir, ...member.split('/'));
    if (!existsSync(from) || !statSync(from).isFile()) {
      // a `files` row that names nothing is a manifest defect, and it is reported in the vocabulary of files
      throw new Error(`staged-install (D-6): the allowlist packs '${member}', which is not a file at ${from} — the `
        + 'tree cannot be staged from a manifest that names what the checkout does not carry');
    }
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
  }

  let artefact = null;
  let platformPackageDir = null;
  const host = hostPlatformName();
  if (withArtefact) {
    if (host === undefined) {
      throw new Error(`staged-install (D-6): the host pair ${process.platform}·${process.arch} is NOT COVERED by the `
        + 'five-name table, so no platform package can be staged for it (`resolution.md §4.1` answers NOT COVERED)');
    }
    if (!existsSync(BUILT_ADDON)) {
      throw new Error(`staged-install (D-6): the built artefact is ABSENT at ${BUILT_ADDON} — a run of this set needs `
        + '`cargo build --release --manifest-path bindings/js/Cargo.toml` first, and a tree without it can only '
        + 'measure the absent-addon arm');
    }
    platformPackageDir = join(treeDir, 'node_modules', ...host.split('/'));
    mkdirSync(platformPackageDir, { recursive: true });
    artefact = join(platformPackageDir, ARTEFACT_NAME);
    copyFileSync(BUILT_ADDON, artefact);
    writeFileSync(join(platformPackageDir, 'package.json'), JSON.stringify({
      name: host,
      version: manifest.version,
      // `PAR-PUB-30` / the platform packages' own `main`: the artefact is the package's entry
      main: ARTEFACT_NAME,
    }, null, 2));
  }

  return { treeDir, packageDir, manifest, members, artefact, platformPackageDir, host };
}

// ---------------------------------------------------------------------------------------------
// the name reach
// ---------------------------------------------------------------------------------------------

/**
 * **THE DRIVER'S SOURCE — THE ONE IMPORT STATEMENT IN THIS SET THAT SPELLS THE PACKAGE BY NAME.** It stands
 * at the tree's root, so `node_modules/provident-storeroom` is resolved from the tree and the `exports` map is
 * applied. **It is NOT a path to the entry**: a path inside the tree would bypass the map and void the route
 * (`respelling.o3_mechanism`).
 */
export const NAME_DRIVER_SOURCE = `// staged-install-support.mjs — THE NAME REACH, WRITTEN INSIDE THE STAGED TREE (D-6, D-7)
import { createRequire } from 'node:module';
import * as api from '${PACKAGE_NAME}';
export { api };
/// The tree's own CJS resolver, so a cell probes RESOLUTION from where the package was installed.
export const req = createRequire(import.meta.url);
`;

/** Write the driver at the tree's root and answer its absolute path. */
export function writeNameDriver(treeDir) {
  const driver = join(treeDir, 'name-driver.mjs');
  writeFileSync(driver, NAME_DRIVER_SOURCE);
  return driver;
}

/**
 * **REACH THE PACKAGE BY NAME FROM INSIDE THE TREE**, in the caller's own process, and answer the module's
 * namespace together with the tree's `require` — so a cell may both construct stores and probe resolution
 * from the staged install. Nothing of the repository is touched.
 */
export async function nameReach(treeDir) {
  const driver = writeNameDriver(treeDir);
  const mod = await import(pathToFileURL(driver).href);
  return { api: mod.api, req: mod.req, driver, treeDir };
}

/** **MINT A ROOT, STAGE THE TREE AND REACH THE NAME** — the whole route in one call, for a cell that needs it. */
export async function stageAndReach(prefix = 'storeroom-staged-', options = {}) {
  const root = options.root ?? mintStageRoot(prefix);
  const tree = stagePackageTree(root, options);
  const reach = await nameReach(root);
  return { ...tree, ...reach, root };
}
