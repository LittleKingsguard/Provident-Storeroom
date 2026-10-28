#!/usr/bin/env node
// ============================================================================
// tests/e2e/installed/live-install.mjs — **THE `LIVE/INSTALL` BATTERY**
//
//   the declaration:  docs/L1/test-stratification.md §2.8 (`D-10`'s commission, fifteen cells)
//   the commission:   strata/decisions.md · `D-10` (`F4`, in scope), `D-12` (a local platform tarball is
//                     lawful), `D-21` (a reporting runner's exit code MUST carry its red)
//   the layer:        docs/specs/storeroom-publish/contract.md §4 — the instrument is *"a real package
//                     manager operating on a packed or released tarball in a directory with NO repository
//                     in its ancestry and NO build/Release beside the entry, plus one real Node process"*
//                     (§4.2 item 1), and §4.3/§4.4 are what it must NOT claim
//   this runner:      tests/e2e/installed/live-install.mjs   (`node tests/e2e/installed/live-install.mjs`,
//                     taken at the repository root — §2.8's declared command)
//   its helper:       tests/e2e/installed/install-support.mjs (its own, under `D-7`; NO `O4` helper is
//                     consumed by this run)
//
// ---------------------------------------------------------------------------------------------
// WHY THIS FILE EXISTS — THE INSTRUMENT THE PROJECT DID NOT HAVE, AND WHAT ITS ABSENCE COST
// ---------------------------------------------------------------------------------------------
//
// `strata/decisions.md`'s FINDING *"the subdivision broke the PACKAGE, and every test is green anyway"*
// records it at the bytes: the entry was partitioned into a hub plus thirteen parts under
// `bindings/js/src/entry/`, the package's `files` allowlist still named four entries, **and a tarball built
// from that manifest could not load at all** — `ERR_MODULE_NOT_FOUND` on the first `import`, on every
// platform, for every consumer. **Every one of the 851 tests stayed green while the published package was
// unloadable**, because every battery drove the CHECKOUT, where all thirteen parts sit on disk beside the
// hub. **The only instrument that sees this is one that installs what the manifest actually packs.** That
// is this file. Its job is to be able to go red, not to be green.
//
// ---------------------------------------------------------------------------------------------
// WHAT THIS RUNNER IS, AND THE THREE WAYS IT IS NOT A `node --test` FILE (§2.8's own three reasons)
// ---------------------------------------------------------------------------------------------
//
//   1. every drive imports **by name from inside the installed tree**, so each drive is a SUBPROCESS;
//   2. its verdict vocabulary needs `LAYER-LIMIT`, which `node --test` has no form for;
//   3. the tree's precedent for a layer that presumes external state is a runner with its own exit rule
//      (`tests/e2e/json-crossing-live.mjs` — that path read `bindings/js/greens/json-crossing-live.mjs` until `D-5`'s stratification, 2026-10-25).
//
// **THE EXIT CONTRACT (`D-21`, §2.8): the runner exits NON-ZERO on any `FAIL` or `FINDING`; `LAYER-LIMIT` is
// neither.** **AND A CELL THAT DID NOT RUN HAS ITS OWN STATE — `NONRUN`, never `PASS` and never silently
// absent (`D-21`: *"the 'cell never ran' case is owed an explicit third state"*).** `NONRUN` is carried by
// the exit code too, because a run in which a cell did not execute is not a run whose evidence can be read
// as complete; that is `D-21`'s one direction a red cannot be seen from, read at the third state it names.
//
// ---------------------------------------------------------------------------------------------
// WHAT THIS BATTERY MUST NOT CLAIM (`contract.md §4.3` item 2; §4.4) — CARRIED BY CELLS, NOT BY PROSE
// ---------------------------------------------------------------------------------------------
//
//   * **no `APP` figure** — `APP LAYER: NONE`, asserted by `INSTALL-15`;
//   * **no re-measurement of another unit's figures** — asserted by `INSTALL-15`;
//   * **no proof that no consumer has ever loaded the package** — `PUB-DD-14`, asserted by `INSTALL-14`;
//   * **no digest figure** — `PUB-DD-13`, asserted by `INSTALL-13`;
//   * **and `LIVE/INSTALL` presumes a REGISTRY release only where the RELEASED bytes are the subject**
//     (§4.4). This run packs locally (`D-10`, `D-12`), so it takes **shape** evidence and reports its own
//     ceiling: it does not observe a registry artefact, and no cell here claims one.
//
// ---------------------------------------------------------------------------------------------
// HOUSE FORM
// ---------------------------------------------------------------------------------------------
//
//   CELL <id> <STATE> :: <subject> :: <detail>
//   STATE: PASS | FAIL | FINDING | LAYER-LIMIT | NONRUN | OBSERVED
//     PASS         — the cell's declared subject was driven and holds.
//     FAIL         — the cell's declared subject was driven and does NOT hold.
//     FINDING      — the subject held where it was driven and the instrument's own control did not: an
//                    observation that contradicts a declaration, reported and never repaired here.
//     LAYER-LIMIT  — the arm cannot be observed on this host, by declaration; DRIVEN, REPORTED, and
//                    NEVER a pass. `INSTALL-09` is this state by construction.
//     NONRUN       — the cell did not execute (a missing prerequisite or a staging fault). Never `PASS`.
//     OBSERVED     — a measurement of this runner's own, recorded rather than asserted.
//
// ============================================================================

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  APP_LAYER, BARREL_RELATIVE_PATH, BUILT_ADDON, COMMAND, CONSUMER_CLAIM_FIGURES,
  DIGEST_FIGURES, EVIDENCE_RELATIVE_PATH, FOREIGN_FIGURES, HELPER_RELATIVE_PATH, HOST_ARCH,
  HOST_PLATFORM, HUB_RELATIVE_PATH, IMPORT_BY_NAME_SOURCE, LAYER, PACKAGE_DIR, PLATFORM_NAMES,
  PLATFORMS_DIR, PRESET, PROBE_SOURCE, REFUSAL_ARM_SOURCE, REPO_LICENSE, REPO_ROOT, RUNNER_RELATIVE_PATH,
  RUNG_ONE_SOURCE, SCOPE_RELATIVE_PATH, VERSION_READ_SOURCE, ancestryOf, copyRepositoryLicence,
  declaredNonCodeMembers, entryPlatformTable, filesUnder, firstErrorLine, hostRow, installTarball,
  isWithin, licenceRowVerdict, mintCleanDirectory, mintWorkRoot, networkFailures, nonHostRows, packDirectory,
  packedManifest, pathClass, readLicenceEvidence, readProbeLog, reachableClosure, relativeTo, removeTree,
  repositoryInAncestry, runDriver, singleSubjectMessage, stageBuiltAddon, stageCopy, tarMemberSet, tarballMemberBytes,
  twoSubjectMessage, violationsOf, writeCleanManifest, writeDriver, writeStagedManifest,
} from './install-support.mjs';

// =====================================================================================================
// THE DECLARED CELL TABLE — `§2.8`'s fifteen, each with the subject the declaration gives it
// =====================================================================================================
//
// The table is declared ONCE and the report's census is read off it: a cell that never recorded a state is
// reported `NONRUN` by the census, so a cell cannot go silently absent (`D-21`).

const DECLARED_CELLS = [
  { id: 'INSTALL-01', subject: '`npm pack` of `bindings/js` produces a tarball, and its member set is read (the installed shape\'s own bytes)' },
  { id: 'INSTALL-02', subject: 'THE ALLOWLIST FALSIFIER: every path the entry requires by path is present in the tarball\'s member set (reachability, not arity — `D-3`/`D-4`)' },
  { id: 'INSTALL-03', subject: '`npm install <tarball>` succeeds in a clean directory whose ancestry names no repository' },
  { id: 'INSTALL-04', subject: 'the instrument\'s own topology: no `build/Release` beside the entry, none in the tarball, and no `.node` in the main package\'s member set' },
  { id: 'INSTALL-05', subject: 'the packaged name resolves through `exports` from inside the installed tree — by name, one real Node process' },
  { id: 'INSTALL-06', subject: 'the version read does not refuse the packed version (rung one\'s compare)' },
  { id: 'INSTALL-07', subject: 'the five declared names as declarations: exactly five `optionalDependencies`, each pinned exactly, each spelled as the entry\'s table spells it' },
  { id: 'INSTALL-08', subject: 'the host\'s own name is the rung-one subject: rung one FIRES, the artefact loaded is the one the host platform package carries, its stamp equals the packed version' },
  { id: 'INSTALL-09', subject: 'the four non-host declared names, one arm each: LAYER-LIMIT — driven, reported, NEVER a pass (fails if any of the four is claimed green)' },
  { id: 'INSTALL-10', subject: 'an uncovered target meets the declared absent-addon refusal, with `PUB-DD-26`\'s two-subject join' },
  { id: 'INSTALL-11', subject: 'the licence text travels although the manifest names no `LICENSE` row (`PUB-DD-11`: the carriage mechanism)' },
  { id: 'INSTALL-12', subject: 'a `LICENSE` row, if present, cites its evidence (`D-8` (iii)\'s conditional, read where its evidence lives)' },
  { id: 'INSTALL-13', subject: 'no digest figure is minted (`PUB-DD-13`)' },
  { id: 'INSTALL-14', subject: 'no consumer-loading claim (`PUB-DD-14`)' },
  { id: 'INSTALL-15', subject: '`APP` stays `NONE` in the label and in the report, and it re-measures none of another unit\'s figures (`contract.md §4.3` item 2)' },
];

// =====================================================================================================
// THE REPORT'S OWN STATE
// =====================================================================================================

/** The head lines — printed before any cell, and the subject of `INSTALL-13`/`INSTALL-15`'s scans. */
const head = [];
/** One record per cell, in declaration order. */
const cells = [];
/** The evidence gathered by the stage; a step that faulted is recorded in `faults` and never guessed at. */
const evidence = {};
const faults = new Map();
/** Whether the whole run met a fault outside the per-step guards. */
let fatal = null;

function emit(line) {
  head.push(line);
}

function record(id, state, detail) {
  const declared = DECLARED_CELLS.find((cell) => cell.id === id);
  cells.push({ id, subject: declared ? declared.subject : '(no declared subject)', state, detail });
}

/** Run one staging step; a throw is recorded against the step's own name and never converted into a verdict. */
function step(name, action) {
  try {
    evidence[name] = action();
  } catch (error) {
    faults.set(name, error && error.message ? error.message : String(error));
  }
}

/** A cell that needs a step which faulted does not get a verdict: it did not run. */
function faultOf(requiredSteps) {
  for (const name of requiredSteps) {
    if (faults.has(name)) return `the staging step '${name}' faulted: ${faults.get(name)}`;
    if (!(name in evidence)) return `the staging step '${name}' did not run`;
  }
  return null;
}

const cell = (id, evaluate) => {
  if (fatal !== null) return record(id, 'NONRUN', `the run stopped before this cell: ${fatal}`);
  if (cells.some((recorded) => recorded.id === id)) return undefined;
  try {
    const outcome = evaluate();
    return record(id, outcome.state, outcome.detail);
  } catch (error) {
    return record(id, 'FAIL', `the cell threw instead of producing a verdict: ${error && error.message ? error.message : String(error)}`);
  }
};

// =====================================================================================================
// PREREQUISITES — a battery that cannot run says so, and says which piece is missing
// =====================================================================================================

const tools = {};
step('tools', () => {
  const nodeVersion = process.version;
  const npm = spawnSync('npm', ['--version'], { encoding: 'utf8' });
  const tar = spawnSync('tar', ['--version'], { encoding: 'utf8' });
  Object.assign(tools, {
    node: nodeVersion,
    npm: npm.status === 0 ? (npm.stdout ?? '').trim() : null,
    tar: tar.status === 0 ? (tar.stdout ?? '').split('\n')[0].trim() : null,
  });
  return tools;
});

if (!existsSync(BUILT_ADDON)) {
  fatal = `the checkout carries no built addon at '${relativeTo(REPO_ROOT, BUILT_ADDON)}' — this battery packs the artefact a platform package carries (\`D-12\`) and cannot mint one; run \`npm run build\` first`;
} else if (tools.npm === null || tools.npm === undefined) {
  fatal = 'no `npm` on PATH — the instrument is a real package manager (`contract.md §4.2` item 1) and there is none';
} else if (tools.tar === null || tools.tar === undefined) {
  fatal = 'no `tar` on PATH — a tarball\'s own member set cannot be read off its bytes without one';
}

// =====================================================================================================
// HEAD — the label, the site, and the declaration this run answers to
// =====================================================================================================

emit(`LIVE/INSTALL BATTERY  ·  LAYER: ${LAYER}  ·  PRESET: ${PRESET}  ·  APP LAYER: ${APP_LAYER}`);
emit(`DECLARED BY docs/L1/test-stratification.md §2.8 (D-10); layer declared by docs/specs/storeroom-publish/contract.md §4.2 item 1`);
emit(`COMMAND: ${COMMAND}   (taken at the repository root)`);
emit(`RUNNER: ${RUNNER_RELATIVE_PATH}  ·  HELPER: ${HELPER_RELATIVE_PATH}  (this battery's own, D-7 — no O4 helper is consumed)`);
emit(`RUNTIME: node ${tools.node ?? process.version}  ·  npm ${tools.npm ?? '(absent)'}  ·  tar ${tools.tar ?? '(absent)'}  ·  host pair ${HOST_PLATFORM}·${HOST_ARCH}`);
emit(`SITE repository-root=${REPO_ROOT}`);
emit(`NOTE: this run packs LOCALLY (D-10, D-12): the subject is a locally packed tarball, never a registry release. No cell here claims a released artefact, a released digest or an APP-green.`);

// =====================================================================================================
// THE STAGE
// =====================================================================================================
//
// Every piece below is one declared composition, and each names the clause it composes:
//
//   stage            a byte-for-byte copy of `bindings/js`, so the pack and the release's acts happen OFF the
//                    tracked tree (`PUB-DD-11`'s `LICENSE` copy; `D-12`'s platform artefact)
//   unassembled      `npm pack` of the copy BEFORE the assembly step — the control that shows the carriage
//                    of the licence is the step's and not an allowlist row's (`INSTALL-11`)
//   main             the release's assembly act performed (`LICENSE` copied in), then `npm pack` — THE
//                    tarball every install below uses
//   falsified        `npm pack` of a copy whose `files` no longer names `src/entry/` — the control that shows
//                    `INSTALL-02`'s instrument can see the defect it was written for
//   host             a copy of `bindings/js/platforms/<host>/` + the checkout's built addon + the repository's
//                    `LICENSE`, packed — the second tarball `D-12` permits, without which rung one cannot fire
//   nonHost          the other four platform packages packed, for `INSTALL-09`'s one arm each
//   clean            the clean directory, `npm install <main tarball>` (INSTALL-03's declared command)
//   placement        `npm install <host platform tarball> --no-save` — the local resolution of the exact pin
//   drivers          the drivers staged INSIDE the installed tree and run as real Node processes
//   armInstalls      the four non-host tarballs offered to the same package manager, which refuses each

let workRoot = null;

try {
  step('workRoot', () => {
    workRoot = mintWorkRoot();
    return workRoot;
  });
  const root = evidence.workRoot;

  if (root !== undefined) {
    step('stage', () => stageCopy(PACKAGE_DIR, join(root, 'stage', 'package')));

    step('reachable', () => reachableClosure(join(root, 'stage', 'package')));

    step('unassembled', () => packDirectory(join(root, 'stage', 'package'), join(root, 'tarballs', 'unassembled'), root));

    step('assembly', () => copyRepositoryLicence(join(root, 'stage', 'package')));

    step('main', () => packDirectory(join(root, 'stage', 'package'), join(root, 'tarballs', 'main'), root));

    step('falsified', () => {
      const stageDirectory = join(root, 'stage', 'package');
      const manifest = JSON.parse(readFileSync(join(stageDirectory, 'package.json'), 'utf8'));
      const mutated = { ...manifest, files: (manifest.files ?? []).filter((row) => row !== 'src/entry/') };
      writeStagedManifest(stageDirectory, mutated);
      try {
        const packed = packDirectory(stageDirectory, join(root, 'tarballs', 'falsified'), root);
        return { ...packed, removedRow: 'src/entry/', remainingFiles: mutated.files };
      } finally {
        writeStagedManifest(stageDirectory, manifest);
      }
    });

    step('host', () => {
      const row = hostRow();
      if (row === null) return null;
      const platformRoot = join(root, 'stage', 'platforms', row.label);
      stageCopy(join(PLATFORMS_DIR, row.label), platformRoot);
      // **THE RELEASE'S OWN ACT PERFORMED LOCALLY (`D-12`):** the assembly step is what copies the built
      // artefact into each platform package, and this is that step, at the artefact rather than at a
      // registry.
      stageBuiltAddon(platformRoot);
      if (!existsSync(join(platformRoot, 'storeroom_js_binding.node'))) {
        throw new Error(`the host platform stage carries no 'storeroom_js_binding.node' at '${relativeTo(root, platformRoot)}'`);
      }
      copyRepositoryLicence(platformRoot);
      const packed = packDirectory(platformRoot, join(root, 'tarballs', 'platforms'), root);
      return { row, platformRoot, ...packed };
    });

    step('nonHost', () => nonHostRows().map((row) => {
      const platformRoot = join(root, 'stage', 'platforms', row.label);
      stageCopy(join(PLATFORMS_DIR, row.label), platformRoot);
      copyRepositoryLicence(platformRoot);
      const packed = packDirectory(platformRoot, join(root, 'tarballs', 'platforms'), root);
      return { row, platformRoot, ...packed };
    }));

    step('clean', () => {
      const directory = mintCleanDirectory(root, 'clean');
      writeCleanManifest(directory);
      const install = installTarball(directory, evidence.main.tarballPath, root);
      return { directory, install, installedDirectory: join(directory, 'node_modules', 'provident-storeroom') };
    });

    step('placement', () => {
      const host = evidence.host;
      if (host === null || host === undefined) return null;
      const install = installTarball(evidence.clean.directory, host.tarballPath, root, ['--no-save']);
      return { install, platformDirectory: join(evidence.clean.directory, 'node_modules', ...host.row.name.split('/')) };
    });

    step('drivers', () => {
      const cleanDirectory = evidence.clean.directory;
      const probe = writeDriver(cleanDirectory, 'probe.cjs', PROBE_SOURCE);
      const importByName = runDriver(writeDriver(cleanDirectory, 'import-by-name.mjs', IMPORT_BY_NAME_SOURCE), { cwd: cleanDirectory });
      const versionRead = runDriver(writeDriver(cleanDirectory, 'version-read.mjs', VERSION_READ_SOURCE), {
        cwd: cleanDirectory,
        env: evidence.host ? { INSTALL_HOST_NAME: evidence.host.row.name } : {},
      });
      let rungOne = null;
      if (evidence.host) {
        const logPath = join(cleanDirectory, '_driver', 'probe-rung-one.log');
        const run = runDriver(writeDriver(cleanDirectory, 'rung-one.mjs', RUNG_ONE_SOURCE), {
          cwd: cleanDirectory,
          preload: probe,
          env: { INSTALL_HOST_NAME: evidence.host.row.name, INSTALL_PROBE_LOG: logPath },
        });
        rungOne = { ...run, probe: readProbeLog(logPath) };
      }
      return { probe, importByName, versionRead, rungOne };
    });

    step('armInstalls', () => (evidence.nonHost ?? []).map((platform) => {
      const directory = mintCleanDirectory(root, `arm-${platform.row.label}`);
      writeCleanManifest(directory);
      const install = installTarball(directory, platform.tarballPath, root);
      return { row: platform.row, install, members: platform.members };
    }));
  }

  // ===================================================================================================
  // THE FIFTEEN CELLS
  // ===================================================================================================

  // -------------------------------------------------------------------------------------------------
  // INSTALL-01 · `npm pack` produced a tarball, and its member set was READ off its own bytes
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-01', () => {
    const fault = faultOf(['main']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const packed = evidence.main;
    const fromTar = tarMemberSet(packed.tarballPath);
    const agree = fromTar.length === packed.members.length
      && fromTar.every((member, index) => member === packed.members[index]);
    const state = agree && fromTar.length > 0 ? 'PASS' : 'FAIL';
    const detail = [
      `tarball=${packed.filename} (${relativeTo(evidence.workRoot, packed.tarballPath)})`,
      `members=${fromTar.length} read from the archive's own index and from \`npm pack --json\``,
      agree ? 'the two readings AGREE member for member' : `the two readings DISAGREE (npm reported ${packed.members.length})`,
      `member set: ${JSON.stringify(fromTar)}`,
    ].join(' :: ');
    return { state, detail };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-02 · THE ALLOWLIST FALSIFIER — reachability, and the control that proves it can fail
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-02', () => {
    const fault = faultOf(['main', 'reachable', 'falsified']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const reachable = evidence.reachable.members;
    const packed = new Set(evidence.main.members);
    const missing = reachable.filter((member) => !packed.has(member));
    const packedManifestObject = packedManifest(evidence.main.tarballPath);
    const nonCode = new Set(declaredNonCodeMembers(join(evidence.workRoot, 'stage', 'package'), packedManifestObject));
    const reachableSet = new Set(reachable);
    const overPacked = evidence.main.members.filter((member) => !reachableSet.has(member) && !nonCode.has(member));
    // **THE CONTROL: the same measurement against a manifest whose `files` no longer names `src/entry/`.**
    // This is the defect of 2026-10-24, packed again in the work root on purpose. **If this arm finds
    // nothing, the instrument cannot see the defect it was written for and the cell FAILS** — an
    // instrument that cannot fail is decoration.
    const falsifiedPacked = new Set(evidence.falsified.members);
    const controlMissing = reachable.filter((member) => !falsifiedPacked.has(member));
    const controlDetected = controlMissing.length > 0;
    const state = missing.length === 0 && controlDetected ? 'PASS' : 'FAIL';
    const detail = [
      `reachable from the hub ('${HUB_RELATIVE_PATH}') and the barrel ('${BARREL_RELATIVE_PATH}'): ${reachable.length} members, 0 MISSING from the packed set`,
      `packed=${evidence.main.members.length} · MISSING=${JSON.stringify(missing)} · packed-but-unreachable=${JSON.stringify(overPacked)}`,
      `CONTROL — \`npm pack\` of a manifest copy in the work root with the '${evidence.falsified.removedRow}' row REMOVED: ${controlMissing.length} members MISSING ${JSON.stringify(controlMissing)} => ${controlDetected ? 'the instrument SEES the defect' : 'THE INSTRUMENT IS BLIND — this cell cannot fail and is therefore worthless'}`,
    ].join(' :: ');
    return { state, detail };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-03 · the install succeeds in a clean directory with no repository in its ancestry
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-03', () => {
    const fault = faultOf(['clean', 'main']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const { directory, install, installedDirectory } = evidence.clean;
    const ancestryFindings = repositoryInAncestry(directory);
    const installedManifestPath = join(installedDirectory, 'package.json');
    const installed = existsSync(installedManifestPath)
      ? JSON.parse(readFileSync(installedManifestPath, 'utf8'))
      : null;
    const packed = packedManifest(evidence.main.tarballPath);
    const network = networkFailures(install);
    const holds = install.status === 0
      && ancestryFindings.length === 0
      && installed !== null
      && installed.version === packed.version;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `clean directory: ${relativeTo(evidence.workRoot, directory)} (path class: os-temporary-area=${pathClass(directory) === 'os-temporary-area'}; ancestry entries: ${ancestryOf(directory).length})`,
        `ancestry names no repository: ${ancestryFindings.length === 0 ? 'yes' : JSON.stringify(ancestryFindings)}`,
        `install: \`${install.command}\` => exit ${install.status}`,
        `installed manifest version=${installed ? installed.version : '(absent)'} · packed version=${packed.version}`,
        `network failures in the package manager's own output: ${network.length}`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-04 · the instrument's own topology — the three prohibitions, carried to the installed layer
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-04', () => {
    const fault = faultOf(['clean', 'main']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const installedDirectory = evidence.clean.installedDirectory;
    const rungTwoPath = join(installedDirectory, 'build', 'Release', 'storeroom_js_binding.node');
    const installedFiles = existsSync(installedDirectory) ? filesUnder(installedDirectory) : [];
    const installedAddons = installedFiles.filter((member) => member.endsWith('.node'));
    const buildRelease = installedFiles.filter((member) => /(^|\/)build\/Release(\/|$)/.test(member));
    const tarballBuildRelease = evidence.main.members.filter((member) => /(^|\/)build\/Release(\/|$)/.test(member));
    const tarballAddons = evidence.main.members.filter((member) => member.endsWith('.node'));
    const rungTwoPresent = existsSync(rungTwoPath);
    const holds = !rungTwoPresent && installedAddons.length === 0 && buildRelease.length === 0
      && tarballBuildRelease.length === 0 && tarballAddons.length === 0;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `no \`build/Release\` beside the entry: rung two's own path '${relativeTo(installedDirectory, rungTwoPath)}' ${rungTwoPresent ? 'EXISTS' : 'does not exist'}`,
        `no \`.node\` in the installed main package: ${JSON.stringify(installedAddons)}`,
        `no \`build/Release\` path among its ${installedFiles.length} files: ${JSON.stringify(buildRelease)}`,
        `no \`build/Release\` and no \`.node\` in the tarball's ${evidence.main.members.length} members: ${JSON.stringify([...tarballBuildRelease, ...tarballAddons])}`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-05 · the packaged name resolves through `exports`, from inside the installed tree
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-05', () => {
    const fault = faultOf(['clean', 'drivers']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const drill = evidence.drivers.importByName;
    const report = drill.report;
    if (report === null) return { state: 'FAIL', detail: `the driver produced no report (exit ${drill.status}): ${firstErrorLine(drill)}` };
    const installedDirectory = evidence.clean.installedDirectory;
    const manifest = JSON.parse(readFileSync(join(installedDirectory, 'package.json'), 'utf8'));
    const exportsImportTarget = manifest?.exports?.['.']?.import ?? null;
    const expectedPath = join(installedDirectory, String(exportsImportTarget ?? '').replace(/^\.\//, ''));
    const resolved = typeof report.resolvedByImportMeta === 'string' ? fileURLToPath(report.resolvedByImportMeta) : null;
    const exportNames = Array.isArray(report.exportNames) ? report.exportNames : [];
    const deepRefused = report.deepImport?.ok === false && report.deepImport?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED';
    const manifestSubpathRefused = report.manifestSubpath?.ok === false && report.manifestSubpath?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED';
    const holds = report.imported === true
      && exportNames.length === 1 && exportNames[0] === 'storeCreate'
      && exportsImportTarget === './index.mjs'
      && resolved === expectedPath
      && deepRefused
      && manifestSubpathRefused
      && manifest.main === undefined;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `one Node process (exit ${drill.status}) imported 'provident-storeroom' BY NAME from inside the installed tree`,
        `namespace export set: ${JSON.stringify(exportNames)}`,
        `resolved: ${resolved === null ? '(nothing)' : relativeTo(evidence.workRoot, resolved)} — the manifest's \`exports['.'].import\` target is '${exportsImportTarget}', and the manifest declares no \`main\``,
        `deep import 'provident-storeroom/index.mjs' => ${report.deepImport?.code ?? 'LOADED'}; 'provident-storeroom/package.json' => ${report.manifestSubpath?.code ?? 'LOADED'}`,
        `resolution is through \`exports\`: the bare name resolves and every deep path is refused by the same map`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-06 · the version read does not refuse the packed version
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-06', () => {
    if (hostRow() === null) {
      return {
        state: 'NONRUN',
        detail: `the version read applies to rung one ALONE (\`PUB-DD-18\`) and this host's pair is ${HOST_PLATFORM}·${HOST_ARCH}, which is not one of the five declared keys — rung one is not attempted here, so there is no compare to observe`,
      };
    }
    const fault = faultOf(['main', 'drivers', 'host']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const drill = evidence.drivers.versionRead;
    const report = drill.report;
    if (report === null) return { state: 'FAIL', detail: `the driver produced no report (exit ${drill.status}): ${firstErrorLine(drill)}` };
    const packed = packedManifest(evidence.main.tarballPath);
    const holds = report.instance === true
      && report.thrown === undefined
      && report.manifestVersion === packed.version
      && report.artefactVersion === packed.version;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `the manifest beside the ENTRY reads version=${report.manifestVersion ?? '(unread)'}; the packed manifest reads version=${packed.version}`,
        `rung one's artefact answered its own \`version()\` as ${JSON.stringify(report.artefactVersion ?? null)}`,
        `\`storeCreate\` answered ${report.instance === true ? 'an INSTANCE (no mismatch arm)' : `the arm ${JSON.stringify(report.thrown ?? null)}`}`,
        `the compare did not refuse the packed version: ${holds ? 'yes' : 'NO'}`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-07 · the five declared names, as declarations
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-07', () => {
    const fault = faultOf(['clean', 'main']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const installedDirectory = evidence.clean.installedDirectory;
    const manifest = JSON.parse(readFileSync(join(installedDirectory, 'package.json'), 'utf8'));
    const packed = packedManifest(evidence.main.tarballPath);
    const declared = manifest.optionalDependencies ?? {};
    const declaredNames = Object.keys(declared).sort();
    const expectedNames = PLATFORM_NAMES.map((row) => row.name).sort();
    const exactPins = PLATFORM_NAMES.filter((row) => declared[row.name] === packed.version);
    const floaters = Object.entries(declared).filter(([, pin]) => typeof pin !== 'string' || pin !== packed.version);
    const entryTable = entryPlatformTable(readFileSync(join(installedDirectory, 'src', 'entry', 'artefact.mjs'), 'utf8'));
    const tableRows = PLATFORM_NAMES.filter((row) => entryTable.get(`${row.platform}·${row.arch}`) === row.name);
    const tableExtra = [...entryTable.entries()].filter(([pair, name]) => !PLATFORM_NAMES.some((row) => `${row.platform}·${row.arch}` === pair && row.name === name));
    const platformManifests = PLATFORM_NAMES.map((row) => {
      const path = join(evidence.workRoot, 'stage', 'package', 'platforms', row.label, 'package.json');
      const bytes = JSON.parse(readFileSync(path, 'utf8'));
      return { row, name: bytes.name, version: bytes.version };
    });
    const manifestMismatch = platformManifests.filter((entry) => entry.name !== entry.row.name || entry.version !== packed.version);
    const holds = declaredNames.length === 5
      && JSON.stringify(declaredNames) === JSON.stringify(expectedNames)
      && exactPins.length === 5
      && floaters.length === 0
      && tableRows.length === 5
      && tableExtra.length === 0
      && manifestMismatch.length === 0;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `\`optionalDependencies\` carries ${declaredNames.length} names (expected 5): ${JSON.stringify(declaredNames)}`,
        `each pinned EXACTLY to the packed version ${packed.version}: ${exactPins.length}/5${floaters.length === 0 ? '' : ` — floats ${JSON.stringify(floaters)}`}`,
        `the entry's own table (\`src/entry/artefact.mjs\`, read from the INSTALLED bytes) agrees on ${tableRows.length}/5 pairs${tableExtra.length === 0 ? '' : ` — extra rows ${JSON.stringify(tableExtra)}`}`,
        `each \`platforms/<label>/package.json\` names its declared name at the packed version: ${platformManifests.length - manifestMismatch.length}/5`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-08 · THE HOST'S NAME AS A LOAD — rung one fires, and the artefact is the platform's own
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-08', () => {
    if (hostRow() === null) {
      return {
        state: 'NONRUN',
        detail: `this host's pair is ${HOST_PLATFORM}·${HOST_ARCH}, which is NOT one of the five declared keys, so rung one is not attempted at all (\`resolution.md §2.2\`; the entry returns \`NOT COVERED\`) — this cell's subject does not exist on this host`,
      };
    }
    const fault = faultOf(['main', 'host', 'clean', 'placement', 'drivers']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const run = evidence.drivers.rungOne;
    const report = run.report;
    if (report === null) return { state: 'FAIL', detail: `the driver produced no report (exit ${run.status}): ${firstErrorLine(run)}` };
    const host = evidence.host;
    const packed = packedManifest(evidence.main.tarballPath);
    const installedDirectory = evidence.clean.installedDirectory;
    const rungTwoPath = join(installedDirectory, 'build', 'Release', 'storeroom_js_binding.node');
    // **THE ATTEMPT THE ENTRY ITSELF MADE** — a resolution record whose parent is the installed entry
    // module and whose request is the host's declared name. This is rung one FIRING, observed and not
    // inferred: it is the entry's own `require`, recorded before it returned.
    const entryAttempts = run.probe.filter((record) => typeof record.from === 'string'
      && isWithin(installedDirectory, record.from)
      && posix.basename(record.from.split('\\').join('/')) === 'index.mjs');
    const rungOneAttempts = entryAttempts.filter((record) => record.request === host.row.name);
    const rungTwoAttempts = run.probe.filter((record) => typeof record.request === 'string'
      && record.request.split('\\').join('/').endsWith('/build/Release/storeroom_js_binding.node'));
    const rungOneResolved = rungOneAttempts.length === 1 && rungOneAttempts[0].outcome === 'resolved';
    const loadedPath = rungOneResolved ? rungOneAttempts[0].resolved : null;
    const expectedArtefact = join(evidence.clean.directory, 'node_modules', ...host.row.name.split('/'), 'storeroom_js_binding.node');
    const platformBytes = tarballMemberBytes(host.tarballPath, 'storeroom_js_binding.node');
    const packedArtefactIsTheOne = loadedPath !== null
      && existsSync(loadedPath)
      && platformBytes !== null
      && platformBytes.equals(readFileSync(loadedPath));
    const holds = report.instance === true
      && rungOneResolved
      && loadedPath === expectedArtefact
      && packedArtefactIsTheOne
      && rungTwoAttempts.length === 0
      && report.artefactVersion === packed.version;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `host name '${host.row.name}' packed locally (\`D-12\`) into ${host.filename}, installed beside the main tarball`,
        `the ENTRY's own require of that name: ${rungOneResolved ? `FIRED and resolved to ${relativeTo(evidence.workRoot, loadedPath)}` : `no resolving attempt (${rungOneAttempts.length} recorded: ${JSON.stringify(rungOneAttempts)})`}`,
        `rung two's path was tried ${rungTwoAttempts.length} time(s) — 0 is the claim (rung one never falls through on success)`,
        `the loaded artefact's bytes equal the \`.node\` the host platform TARBALL carries: ${packedArtefactIsTheOne ? 'yes' : 'no'}`,
        `its own stamp \`version()\` = ${JSON.stringify(report.artefactVersion ?? null)} vs the packed version ${packed.version}`,
        `\`storeCreate\` answered ${report.instance === true ? 'an INSTANCE' : `the arm ${JSON.stringify(report.thrown ?? null)}`}`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-09 · the four non-host names, one arm each: LAYER-LIMIT, driven, NEVER a pass
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-09', () => {
    const fault = faultOf(['nonHost', 'armInstalls']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const arms = evidence.armInstalls.map((arm) => {
      const refusal = arm.install.status !== 0;
      const badPlatform = /EBADPLATFORM/.test(`${arm.install.stderr}\n${arm.install.stdout}`);
      const namesItself = `${arm.install.stderr}`.includes(arm.row.name);
      const carriesAddon = arm.members.includes('storeroom_js_binding.node');
      return {
        name: arm.row.name,
        pair: `${arm.row.platform}·${arm.row.arch}`,
        // **THE STATE THIS ARM IS, BY DECLARATION (`§2.8`): the four non-host names are LAYER-LIMIT —
        // driven, reported, never a pass.** A host can neither install nor load another target's artefact,
        // so no green is available here and any green would be a claim on evidence that cannot be taken.
        state: 'LAYER-LIMIT',
        green: false,
        evidence: refusal
          ? `\`npm install\` refused it (${badPlatform ? 'EBADPLATFORM' : 'exit ' + arm.install.status}${namesItself ? ', naming the package' : ''})`
          : `the package manager DID install it on this host (exit 0)`,
        carriesAddon,
      };
    });
    // **THE CONTROL: the cell's own predicate must see a green claim.** A `LAYER-LIMIT` cell that cannot
    // notice one of its arms being reported green is decoration, so the predicate is applied to a seeded
    // arm list that carries a green claim and must report it.
    const greenClaims = (list) => list.filter((arm) => arm.state !== 'LAYER-LIMIT' || arm.green === true);
    const controlDetected = greenClaims([...arms, { name: '@seeded/control', pair: 'control·control', state: 'PASS', green: true }]).length > 0;
    const claimedGreen = greenClaims(arms);
    const state = controlDetected && claimedGreen.length === 0 ? 'LAYER-LIMIT' : 'FAIL';
    return {
      state,
      detail: [
        `${arms.length} arms, each DRIVEN: ${arms.map((arm) => `${arm.name} [${arm.pair}] state=${arm.state} — ${arm.evidence}${arm.carriesAddon ? '' : '; its tarball carries no .node (this checkout built one target)'}`).join(' | ')}`,
        `any arm claimed green: ${claimedGreen.length === 0 ? 'none' : JSON.stringify(claimedGreen)}`,
        `CONTROL — a seeded arm list carrying a green claim => ${controlDetected ? 'the predicate SEES it' : 'THE PREDICATE IS BLIND — this cell cannot fail and is therefore worthless'}`,
        `NOTE: LAYER-LIMIT is neither PASS nor FAIL and does not move the exit code (\`§2.8\`; \`D-21\`); what it records is that no load evidence exists on this host for these four names, so none is claimed.`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-10 · an uncovered target meets the declared absent-addon refusal, with the two-subject join
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-10', () => {
    const fault = faultOf(['clean', 'drivers', 'host']);
    if (fault) return { state: 'NONRUN', detail: fault };

    const root = evidence.workRoot;
    const cleanDirectory = evidence.clean.directory;
    const installedDirectory = evidence.clean.installedDirectory;
    const probe = evidence.drivers.probe;
    const rungTwoPath = join(installedDirectory, 'build', 'Release', 'storeroom_js_binding.node');
    const driverPath = writeDriver(cleanDirectory, 'refusal-arm.mjs', REFUSAL_ARM_SOURCE);

    // ---- ARM J: BOTH RUNGS TRIED — the two-subject join, `PUB-DD-26`'s three parts ----
    // A COVERED key whose rung-one name is absent from this install: the runtime pair is fixed before the
    // entry is imported (`resolution.md §4.1`: the pair is read on the load path, not at module
    // evaluation), so the walk attempts that name, misses, and falls to rung two — which also misses.
    const host = hostRow();
    const alternative = PLATFORM_NAMES
      .filter((row) => row.platform === HOST_PLATFORM && row !== host)
      .pop() ?? null;
    let joinArm = null;
    if (alternative !== null) {
      const logPath = join(cleanDirectory, '_driver', 'probe-refusal-join.log');
      const run = runDriver(driverPath, {
        cwd: cleanDirectory,
        preload: probe,
        env: { INSTALL_FAKE_ARCH: alternative.arch, INSTALL_PROBE_LOG: logPath },
      });
      const records = readProbeLog(logPath);
      const entryRecords = records.filter((record) => typeof record.from === 'string' && isWithin(installedDirectory, record.from));
      const expected = twoSubjectMessage(alternative.name, rungTwoPath);
      joinArm = {
        key: `${alternative.platform}·${alternative.arch}`,
        name: alternative.name,
        expected,
        received: run.report?.thrown?.message ?? null,
        status: run.report?.thrown?.status ?? null,
        members: run.report?.thrown?.members ?? null,
        instance: run.report?.instance ?? null,
        attempts: entryRecords.map((record) => record.request),
        run,
      };
    } else if (host === null) {
      return {
        state: 'NONRUN',
        detail: `this host's pair is ${HOST_PLATFORM}·${HOST_ARCH}: it is not one of the five declared keys AND no covered pair exists on this platform, so neither the uncovered arm's covered counterpart nor the both-rungs join can be staged`,
      };
    } else {
      // **THE FALLBACK WHERE NO SECOND COVERED PAIR EXISTS** (a `win32·x64` host): a second clean directory
      // holding the main tarball ALONE, so the host's own rung-one name is attempted and absent.
      const directory = mintCleanDirectory(root, 'clean-no-platform');
      writeCleanManifest(directory);
      const install = installTarball(directory, evidence.main.tarballPath, root);
      const installedAlone = join(directory, 'node_modules', 'provident-storeroom');
      const logPath = join(directory, '_driver', 'probe-refusal-join.log');
      writeDriver(directory, 'refusal-arm.mjs', REFUSAL_ARM_SOURCE);
      const run = runDriver(join(directory, '_driver', 'refusal-arm.mjs'), {
        cwd: directory,
        preload: writeDriver(directory, 'probe.cjs', PROBE_SOURCE),
        env: { INSTALL_PROBE_LOG: logPath },
      });
      const records = readProbeLog(logPath);
      const entryRecords = records.filter((record) => typeof record.from === 'string' && isWithin(installedAlone, record.from));
      const aloneRungTwo = join(installedAlone, 'build', 'Release', 'storeroom_js_binding.node');
      joinArm = {
        key: `${HOST_PLATFORM}·${HOST_ARCH}`,
        name: host.name,
        expected: twoSubjectMessage(host.name, aloneRungTwo),
        received: run.report?.thrown?.message ?? null,
        status: run.report?.thrown?.status ?? null,
        members: run.report?.thrown?.members ?? null,
        instance: run.report?.instance ?? null,
        attempts: entryRecords.map((record) => record.request),
        run,
        install,
      };
    }
    const joinHolds = joinArm.received === joinArm.expected
      && joinArm.status === 'FilePathUnreachable'
      && JSON.stringify(joinArm.members) === JSON.stringify(['address', 'log', 'message', 'status'])
      && joinArm.instance === false;

    // ---- ARM U: THE UNCOVERED TARGET — rung one is NOT attempted, and the subject is rung two's path alone
    // (`resolution.md §2.2`, which `contract.md §1.5` item 6's governing clause keeps standing: the subject
    // names every subject the load path TRIED, and an uncovered key's rung one has no path to report).
    const uncoveredPlatform = 'sunos';
    const uncoveredLogPath = join(cleanDirectory, '_driver', 'probe-refusal-uncovered.log');
    const uncoveredRun = runDriver(driverPath, {
      cwd: cleanDirectory,
      preload: probe,
      env: { INSTALL_FAKE_PLATFORM: uncoveredPlatform, INSTALL_PROBE_LOG: uncoveredLogPath },
    });
    const uncoveredRecords = readProbeLog(uncoveredLogPath)
      .filter((record) => typeof record.from === 'string' && isWithin(installedDirectory, record.from));
    const uncoveredExpected = singleSubjectMessage(rungTwoPath);
    const uncoveredArm = {
      key: `${uncoveredPlatform}·${HOST_ARCH}`,
      expected: uncoveredExpected,
      received: uncoveredRun.report?.thrown?.message ?? null,
      status: uncoveredRun.report?.thrown?.status ?? null,
      members: uncoveredRun.report?.thrown?.members ?? null,
      instance: uncoveredRun.report?.instance ?? null,
      attempts: uncoveredRecords.map((record) => record.request),
      platformSeen: uncoveredRun.report?.platform ?? null,
    };
    const rungOneNeverAttempted = !uncoveredArm.attempts.some((request) => PLATFORM_NAMES.some((row) => row.name === request));
    const rungTwoAttemptedOnce = uncoveredArm.attempts.filter((request) => request === rungTwoPath).length === 1;
    const uncoveredHolds = uncoveredArm.received === uncoveredArm.expected
      && uncoveredArm.status === 'FilePathUnreachable'
      && uncoveredArm.instance === false
      && uncoveredArm.platformSeen === uncoveredPlatform
      && rungOneNeverAttempted
      && rungTwoAttemptedOnce;

    if (joinArm === null) {
      return { state: 'NONRUN', detail: `no covered pair other than the host's exists and the fallback produced no arm: ${JSON.stringify(faults.get('drivers') ?? null)}` };
    }
    const state = joinHolds && uncoveredHolds ? 'PASS' : 'FAIL';
    return {
      state,
      detail: [
        `UNCOVERED target ${uncoveredArm.key}: status=${JSON.stringify(uncoveredArm.status)} · instance=${uncoveredArm.instance === true} · subject = rung two's path ALONE (rung one is NOT attempted at an uncovered key — attempts recorded: ${JSON.stringify(uncoveredArm.attempts)})`,
        `the subject string equals the generator's own clause at that path: ${uncoveredArm.received === uncoveredArm.expected ? 'yes' : `NO — received ${JSON.stringify(uncoveredArm.received)}`}`,
        `BOTH-RUNG JOIN at ${joinArm.key} ('${joinArm.name}', absent from this install): status=${JSON.stringify(joinArm.status)} · arm members=${JSON.stringify(joinArm.members)} · attempts in order ${JSON.stringify(joinArm.attempts)}`,
        `the join equals \`PUB-DD-26\`'s declared rendering — separator ', ', order rung one then rung two, each path in its own apostrophes: ${joinArm.received === joinArm.expected ? 'yes' : `NO — received ${JSON.stringify(joinArm.received)}`}`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-11 · the licence text travels although the manifest names no `LICENSE` row
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-11', () => {
    const fault = faultOf(['main', 'unassembled', 'clean']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const packed = packedManifest(evidence.main.tarballPath);
    const rows = Array.isArray(packed.files) ? packed.files : [];
    const licenceRowNamed = rows.filter((row) => typeof row === 'string' && /(^|\/)licen[cs]e$/i.test(row.trim()));
    const carriedByTarball = evidence.main.members.includes('LICENSE');
    const installedLicence = join(evidence.clean.installedDirectory, 'LICENSE');
    const installedCarried = existsSync(installedLicence);
    const bytesEqual = installedCarried && readFileSync(installedLicence).equals(readFileSync(REPO_LICENSE));
    // **THE CONTROL THAT SHOWS THE MECHANISM IS THE ASSEMBLY STEP AND NOT THE ALLOWLIST:** the same copy
    // packed BEFORE the assembly step carries no `LICENSE` at all.
    const unassembledCarried = evidence.unassembled.members.includes('LICENSE');
    const holds = licenceRowNamed.length === 0 && carriedByTarball && installedCarried && bytesEqual && !unassembledCarried;
    return {
      state: holds ? 'PASS' : 'FAIL',
      detail: [
        `the packed manifest's \`files\` = ${JSON.stringify(rows)} — \`LICENSE\` rows among them: ${licenceRowNamed.length}`,
        `the tarball carries LICENSE: ${carriedByTarball} · the installed tree carries it: ${installedCarried} · its bytes equal the repository's LICENSE byte-for-byte: ${bytesEqual}`,
        `CONTROL — the same copy packed BEFORE the release's assembly step carries LICENSE: ${unassembledCarried} => ${unassembledCarried ? 'the row would not be the mechanism' : 'the carriage IS the assembly step (PUB-DD-11), which is what makes this a positive observable rather than a defect'}`,
        `the release's act performed: 'LICENSE' copied byte-for-byte into the stage from the repository root (never into bindings/js/ — DD-43's refused arm)`,
      ].join(' :: '),
    };
  });

  // -------------------------------------------------------------------------------------------------
  // INSTALL-12 · a `LICENSE` row, if present, cites its evidence (`D-8` (iii), the conditional)
  // -------------------------------------------------------------------------------------------------
  cell('INSTALL-12', () => {
    const fault = faultOf(['main']);
    if (fault) return { state: 'NONRUN', detail: fault };
    const packed = packedManifest(evidence.main.tarballPath);
    const rows = Array.isArray(packed.files) ? packed.files : [];
    const evidenceRecord = readLicenceEvidence();
    const verdict = licenceRowVerdict(rows, evidenceRecord);
    // **THE TWO CONTROLS THE CONDITIONAL OWES — a row WITHOUT its evidence must FAIL, and a row WITH it
    // must PASS.** Without both, "a row without evidence fails" is a sentence and not an assertion.
    const withoutEvidence = licenceRowVerdict(['LICENSE'], { evidence: [] });
    const withEvidence = licenceRowVerdict(
      ['LICENSE'],
      { evidence: [{ row: 'LICENSE', kind: 'consumer', requirement: 'seeded control: a consumer requires the text beside the artefact' }] },
    );
    const controlsHold = withoutEvidence.verdict === 'FAIL' && withEvidence.verdict === 'PASS';
    const state = verdict.verdict === 'PASS' && controlsHold ? 'PASS' : 'FAIL';
    return {
      state,
      detail: [
        verdict.detail,
        `the record this battery reads: ${evidenceRecord === null ? `(absent at '${EVIDENCE_RELATIVE_PATH}')` : `'${EVIDENCE_RELATIVE_PATH}' with ${Array.isArray(evidenceRecord.evidence) ? evidenceRecord.evidence.length : 0} evidence item(s)`}`,
        `CONTROL — a row WITHOUT recorded evidence => ${withoutEvidence.verdict}; a row WITH a consumer requirement => ${withEvidence.verdict} (both required)`,
        `\`D-8\` (iii) is read as a FAILABLE assertion here: a later pass that adds the row silently meets a red, and a row with its evidence passes.`,
      ].join(' :: '),
    };
  });

  // ===================================================================================================
  // THE THREE NEGATIVE CELLS — over the report as printed by the TWELVE CELLS ABOVE
  // ===================================================================================================
  //
  // **They are computed over the report text rather than over their own subject, so they must run before
  // their own lines are added**; the detail says so. Each is applied twice — to the report, where nothing
  // may appear, and to a synthetic subject, where the violation must. A predicate that misses the synthetic
  // subject FAILS its own cell.

  const cellsSoFar = () => head.concat(cells.map((entry) => `CELL ${entry.id} ${entry.state} :: ${entry.subject} :: ${entry.detail}`)).join('\n');

  cell('INSTALL-13', () => {
    const reportText = cellsSoFar();
    const found = violationsOf(reportText, DIGEST_FIGURES);
    const syntheticDigest = 'sha512-' + 'A'.repeat(56) + ' ' + '0123456789abcdef'.repeat(4);
    const control = violationsOf(syntheticDigest, DIGEST_FIGURES);
    const state = found.length === 0 && control.length > 0 ? 'PASS' : 'FAIL';
    return {
      state,
      detail: [
        `digest figures in the report as printed before this cell (the head and the twelve cells above): ${found.length} (${found.map((violation) => violation.pattern).join(' | ') || 'none'})`,
        `the two figures \`npm pack --json\` reports were DROPPED at extraction and never reached the report: the member sets this battery prints carry PATHS ONLY`,
        `CONTROL — a synthetic digest token (both shapes) => ${control.length} match(es) ${control.length > 0 ? '(the predicate SEES a minted digest)' : '(THE PREDICATE IS BLIND)'}`,
        `no cell here claims a released digest, a registry integrity figure or a provenance tie: the tarball is locally packed and ties nothing a registry ever held (PUB-DD-13)`,
      ].join(' :: '),
    };
  });

  cell('INSTALL-14', () => {
    const reportText = cellsSoFar();
    const found = violationsOf(reportText, CONSUMER_CLAIM_FIGURES);
    const syntheticClaim = 'a consumer has loaded this package, so the package is proven in an application';
    const control = violationsOf(syntheticClaim, CONSUMER_CLAIM_FIGURES);
    const state = found.length === 0 && control.length > 0 ? 'PASS' : 'FAIL';
    return {
      state,
      detail: [
        `consumer-loading claim figures in the report as printed before this cell (the head and the twelve cells above): ${found.length} (${found.map((violation) => violation.pattern).join(' | ') || 'none'})`,
        `the prohibition is named by its ID (PUB-DD-14) and never spelled in the report, so this cell's scan can stay strict rather than exempting the battery's own prose`,
        `CONTROL — a synthetic loaded-by-a-consumer sentence => ${control.length} match(es) ${control.length > 0 ? '(the predicate SEES a claim)' : '(THE PREDICATE IS BLIND)'}`,
        `what this run drives is a CLEAN DIRECTORY's install and ONE Node process, which is not a consumer application: the universal negative stays a STATEMENT and no figure of it is reported`,
      ].join(' :: '),
    };
  });

  cell('INSTALL-15', () => {
    const reportText = cellsSoFar();
    const found = violationsOf(reportText, FOREIGN_FIGURES);
    const syntheticForeign = 'the sibling battery reports 113 JS cells and 240 blind assertions and 91 live assertions';
    const control = violationsOf(syntheticForeign, FOREIGN_FIGURES);
    const appLinePresent = head.some((line) => line.includes(`APP LAYER: ${APP_LAYER}`));
    const layerLinePresent = head.some((line) => line.includes(`LAYER: ${LAYER}`));
    const state = found.length === 0 && control.length > 0 && appLinePresent && layerLinePresent ? 'PASS' : 'FAIL';
    return {
      state,
      detail: [
        `the label line carries \`LAYER: ${LAYER}\` and \`APP LAYER: ${APP_LAYER}\`: ${layerLinePresent && appLinePresent ? 'both present' : 'MISSING'}`,
        `this run's own figures are its own census (${DECLARED_CELLS.length} cells declared) and are reported at this scope and this layer only (\`${SCOPE_RELATIVE_PATH}\`, \`${LAYER}\`)`,
        `another unit's figures in the report as printed before this cell (the head and the twelve cells above): ${found.length} (${found.map((violation) => violation.pattern).join(' | ') || 'none'})`,
        `CONTROL — a synthetic foreign-figures sentence => ${control.length} match(es) ${control.length > 0 ? '(the predicate SEES a re-measurement)' : '(THE PREDICATE IS BLIND)'}`,
        `an installed green is not an APP-green: \`APP\` stays \`NONE\` (contract.md §4.3 item 2; §4.5 item 3)`,
      ].join(' :: '),
    };
  });
} catch (error) {
  fatal = `${error && error.message ? error.message : String(error)}${error && error.stack ? `\n${error.stack}` : ''}`;
} finally {
  // **EVERYTHING MINTED IN THE TEMPORARY AREA IS DELETED, PASS OR FAIL** (`§2.8`; `contract.md §4.2`
  // item 1's clean directory is the instrument, not a residue).
  let removed = null;
  if (evidence.workRoot !== undefined) {
    removed = removeTree(evidence.workRoot);
  }
  evidence.cleanup = { root: evidence.workRoot ?? null, removed };
}

// =====================================================================================================
// THE CENSUS AND THE REPORT — a cell that did not record a state is `NONRUN`, never absent
// =====================================================================================================

for (const declared of DECLARED_CELLS) {
  if (!cells.some((recorded) => recorded.id === declared.id)) {
    record(declared.id, 'NONRUN', `the cell did not execute${fatal === null ? '' : `: ${fatal.split('\n')[0]}`}`);
  }
}
// the declaration's order, and no other
cells.sort((left, right) => DECLARED_CELLS.findIndex((entry) => entry.id === left.id) - DECLARED_CELLS.findIndex((entry) => entry.id === right.id));

for (const line of head) console.log(line);
for (const entry of cells) console.log(`CELL ${entry.id} ${entry.state} :: ${entry.subject} :: ${entry.detail}`);

const tally = (state) => cells.filter((entry) => entry.state === state).length;
const counts = {
  declared: DECLARED_CELLS.length,
  recorded: cells.length,
  PASS: tally('PASS'),
  FAIL: tally('FAIL'),
  FINDING: tally('FINDING'),
  'LAYER-LIMIT': tally('LAYER-LIMIT'),
  NONRUN: tally('NONRUN'),
  OBSERVED: tally('OBSERVED'),
};
const cleanup = evidence.cleanup ?? { root: null, removed: null };
console.log(`CLEANUP root=${cleanup.root === null ? '(none minted)' : cleanup.root} removed=${cleanup.removed}`);
console.log(`COVERAGE ${JSON.stringify({
  layer: LAYER,
  preset: PRESET,
  app: APP_LAYER,
  site: { scope: SCOPE_RELATIVE_PATH, repositoryRoot: REPO_ROOT, command: COMMAND, cleanDirectoryClass: 'os-temporary-area' },
  cells: DECLARED_CELLS.length,
  states: counts,
  claims: {
    app: APP_LAYER,
    digestFigure: null,
    registryRelease: null,
    consumerLoadingFigure: null,
    foreignFigures: [],
  },
})}`);

const red = counts.FAIL + counts.FINDING + counts.NONRUN;
console.log(`EXIT ${red === 0 ? 0 : 1} (exit 0 iff no cell FAILed, no cell was a FINDING and every cell RAN; LAYER-LIMIT is neither)`);
process.exitCode = red === 0 ? 0 : 1;
