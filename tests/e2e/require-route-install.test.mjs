// tests/e2e/require-route-install.test.mjs
//
// **THE REQUEST'S ACCEPTANCE PREDICATE, REPRODUCED UPSTREAM — `NEW-1`** (`strata/envelope.md` §6, §9; `D-129`
// item 1: *"`NEW-1` … is a MEASUREMENT and not a ruling"*). One cell, one route: **a CJS consumer's
// `require('provident-storeroom')`, in a consumer tree that holds the assembled package, must LOAD and must
// BOOT the store** — and the same cell carries `NEW-3`, the synchronous-graph law's sentinel.
//
// PROVENANCE — EVERY EXPECTATION IS AUTHORED FROM THE DECLARED SURFACE AND FROM NOTHING ELSE:
//   · `docs/specs/storeroom-js/contract.md` `§0.2`'s **2026-11-17 foot clause, limb 1** — *"`exports["."]`
//     gains `"require": "./index.mjs"` … a THIRD condition beside `types` and `import`, naming the SAME ESM
//     entry — no `.cjs`, no `main`, no second build"*; **limb 2** — *"`require('provident-storeroom')` NOW
//     RESOLVES AN ARM … the load is supplied by NODE'S OWN `require(esm)` interop … and the package publishes
//     no second module, no second build and no second realm"*
//   · `§3.1`'s 2026-11-17 re-derivation — *"THE CLAIMED REALM IS THE ES MODULE ITSELF … `require` IS A
//     SUPPORTED ROUTE INTO THE CLAIMED REALM AND IS NOT A SECOND CLAIMED REALM"*
//   · `§3.1`'s foot — **THE SYNCHRONOUS-GRAPH LAW** — *"THE ENTRY'S LOAD-TIME MODULE GRAPH IS SYNCHRONOUS: no
//     module the entry reaches at load may carry a top-level `await` … one top-level `await` anywhere in that
//     graph would convert a WORKING `require` into `ERR_REQUIRE_ASYNC_MODULE`"*, whose **instrument is this
//     cell itself** (`D-129` item 5, `Q-G1`)
//   · `§3.2`'s `HO-1` re-derivation — *"the package publishes NO CJS ARM … and it DOES publish a `require`
//     CONDITION on its one ESM entry, so a CJS host's `require` is served BY THE PACKAGE … at or above the
//     declared loader floor"*
//   · `DD-38` as re-derived (`D-127`, `D-129`) — the floor is `">=22.12.0"`; `DD-24` as re-derived — one
//     entry, three conditions
//   · `strata/decisions.md` `D-6` (`O3`: the turnstile is *"whether the package as shipped resolves and
//     runs"*, and *"the `exports` map is therefore asserted where the install shape is assembled"*) and `D-7`
//     (*"the packaged-resolution claim … lives exclusively in the `O3` set"*)
//   · `docs/specs/storeroom-publish/contract.md` `§4.2` item 1 / `acceptance.md §5.2` — the LAYER labels
//     (`APP` layer `NONE`; no `APP`-green claimed)
//
// ★ LAYER: **`LIVE/INSTALL`** — the label the corpus uses for a run that drives an INSTALL SHAPE, and it is
// claimed here at that layer and NO OTHER: **the store this cell boots is the store the declared route
// reaches, in a tree assembled from the shipped allowlist; it is NOT an `APP`-green and none is claimed**
// (`DD-20`; `acceptance.md §4.2` item 2).
//
// ★ WHAT THIS CELL IS NOT: it is not the packed tarball's manifest cell (`NEW-2`, which lives where the
// tarball is read — `blind-installed-surface.test.mjs`), and it is not the `require` of the ENTRY'S OWN PATH
// (that is `live-drive.mjs`'s `LIVE-11.6`, the consumer's side and never the map's). **THIS IS THE ONE
// UPSTREAM CELL THAT SPELLS THE BARE SPECIFIER UNDER `require` AND THEN WRITES TO THE STORE.**
//
// ★ NO REPOSITORY BYTE CHANGES: the tree is a scratch root under `tmpdir()`, the package is staged INTO it
// from the manifest's own allowlist by the `O3` carrier this battery already owns
// (`staged-install/staged-install-support.mjs`), and the sweep at the foot removes the root whether the cell
// passes or fails.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section` (or by the decision id).

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

import {
  mintStageRoot, stagePackageTree,
} from './staged-install/staged-install-support.mjs';

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

/** `surface.md §2.9` item 1 (`A127`) and `package.md §1.3` item 3: the entry's namespace is ONE name. */
const NAMESPACE_NAMES = ['storeCreate'];
/** `§2.1` `PAR-JS-1`–`PAR-JS-4` + `DD-36`: the construction's declared `cfg`, with no key of the package's own. */
const CFG = '{ journalLength: 8, listeners: [] }';
/** The address and value the store's own `mem` tier is asked to hold — small, declared, and read back. */
const ADDRESS = "['require-route']";
const VALUE = '1';

// ---------------------------------------------------------------------------------------------
// THE SITE — ONE scratch root under `tmpdir()`, one staged consumer tree, swept on process exit.
// ---------------------------------------------------------------------------------------------

const STAGE_ROOT = mintStageRoot('storeroom-require-route-');
// THE SWEEP IS THE CARRIER'S: `mintStageRoot` registers an exit hook for the root it minted
// (`staged-install-support.mjs`, `o3_staged_tree.isolation`), so the tree is removed whether this cell passes
// or fails and no second removal is written here.

/**
 * THE CHILD — **the request's own spelling, `node -e "require('provident-storeroom')"`, run from the tree's
 * root** (so the bare specifier resolves through `node_modules/` and then through the `exports` map, which is
 * the claim `D-7` reserves to this set). It prints ONE JSON line, so the cell can assert the load, the
 * namespace, the boot and the round trip as values rather than as prose.
 */
const REQUIRE_ROUTE_DRIVER = `
const report = { loaded: false, keys: null, storeCreate: null, booted: null, readBack: null, error: null };
try {
  // THE SUBJECT: a CJS require of the BARE SPECIFIER — no path, no URL, no dynamic import.
  const namespace = require('provident-storeroom');
  report.loaded = true;
  report.keys = Object.keys(namespace);
  report.storeCreate = typeof namespace.storeCreate;
  const store = namespace.storeCreate(${CFG});
  report.booted = Object.getOwnPropertyNames(store).length;
  store.write(${ADDRESS}, 'mem', ${VALUE});
  report.readBack = store.read(${ADDRESS});
} catch (caught) {
  report.error = caught && caught.code
    ? String(caught.code)
    : (caught && typeof caught.status === 'string' ? caught.status : String(caught));
  report.message = caught && caught.message ? String(caught.message).split('\\n')[0] : null;
}
process.stdout.write(JSON.stringify(report));
`;

function runRequireRoute(root) {
  // `-e` runs in a COMMONJS scope, so `require` is the host's own resolver and not a `createRequire` shim:
  // that is the spelling the downstream's Electron main uses, and the one the request measured.
  const result = spawnSync(process.execPath, ['-e', REQUIRE_ROUTE_DRIVER], {
    cwd: root,
    encoding: 'utf8',
    timeout: 60000,
  });
  let report = null;
  try {
    report = JSON.parse((result.stdout || '').trim());
  } catch {
    report = null;
  }
  return {
    status: result.status,
    stderr: (result.stderr || '').trim(),
    stdout: (result.stdout || '').trim(),
    report,
  };
}

// ---------------------------------------------------------------------------------------------
// THE CELL
// ---------------------------------------------------------------------------------------------

test('require-route · contract.md §0.2\'s 2026-11-17 foot clause, limbs 1–2 + §3.1\'s realm and §3.1\'s foot (the sync-graph law) + §3.2\'s `HO-1` re-derivation (`D-128`, `D-129`) · ⟶ `NEW-1`/`NEW-3`: a CJS consumer\'s `require` of the BARE SPECIFIER in an install-shaped tree LOADS the one entry, and that entry BOOTS the store, writes at `mem` and reads the value back — with no `ERR_REQUIRE_ASYNC_MODULE` anywhere in the process', () => {
  // THE INSTALL SHAPE: the tree's `node_modules/provident-storeroom` is the assembled package — the shipped
  // allowlist expanded by npm's own packing rule, its manifest included — and the host's platform package
  // stands beside it, so the entry reaches the addon at rung one exactly as an install of the published
  // artefacts does (`staged-install-support.mjs`; `D-6`'s `O3` staging).
  const tree = stagePackageTree(STAGE_ROOT);

  const run = runRequireRoute(tree.treeDir);

  // (1) THE PROCESS'S OWN ANSWER. A loader failure, a package-minted refusal or a crash reddens here with its
  // code in the message, so the cell never reports an absence as a pass.
  assert.equal(run.status, 0, `the child exited ${run.status}: ${run.stderr || run.stdout}`);
  assert.notEqual(run.report, null, `the child printed no JSON report: ${run.stderr || run.stdout}`);
  assert.equal(run.report.error, null,
    `the \`require\` route answered ${run.report.error} instead of loading: ${run.report.message}`);

  // (2) THE LOAD — `D-128` limb 2 read at its own subject: the map resolves an arm for `require`, and the
  // load is Node's own `require(esm)` interop over the package's one ESM entry.
  assert.equal(run.report.loaded, true, '`require(\'provident-storeroom\')` loaded the package');
  assert.deepEqual(run.report.keys, NAMESPACE_NAMES,
    'the namespace a CJS consumer receives is the ONE declared name (`surface.md §2.9` item 1, `A127`)');
  assert.equal(run.report.storeCreate, 'function', 'and `storeCreate` is the function it declares');

  // (3) THE BOOT — the request's acceptance predicate: the store the route reached CONSTRUCTS. A load that
  // yielded a namespace but no bootable store would satisfy every manifest cell and none of this one.
  // **THE PRODUCT'S OWN MEMBER CENSUS IS NOT RE-CENSUSED HERE:** that figure has ONE home in this battery —
  // `blind-cjs-interop.test.mjs`'s `REACHED 15` cell, read at the same construction — and a second home
  // would be a hand-kept census (`DD-33`: every figure carries its site). This cell asserts that an instance
  // came back and that the instance WORKS.
  assert.equal(typeof run.report.booted, 'number', '`storeCreate(cfg)` returned an object with own members');
  assert.ok(run.report.booted >= 1, 'the product carries at least the one member the round trip below uses');

  // (4) THE ROUND TRIP — the store WRITES at `mem` and READS the value back, equal to the literal written.
  assert.equal(run.report.readBack, 1,
    'the store wrote 1 at `[\'require-route\']` and read 1 back through the same route (`§2.2`; `PAR-JS-6`)');

  // (5) `NEW-3` — THE SYNCHRONOUS-GRAPH LAW'S SENTINEL, FOLDED HERE (`§3.1`'s foot; `D-129` item 5, `Q-G1`).
  // **THE LAW IS A PROPERTY OF THE ENTRY'S LOAD-TIME MODULE GRAPH AND THIS LOAD IS ITS INSTRUMENT:** one
  // top-level `await` ANYWHERE in that graph converts this working `require` into `ERR_REQUIRE_ASYNC_MODULE`,
  // so the gate is asserted twice — in the child's own output and in the process's stderr — and a future
  // `await` reddens exactly here and nowhere else in the corpus.
  assert.equal(/ERR_REQUIRE_ASYNC_MODULE/.test(run.stdout + run.stderr), false,
    'the entry\'s load-time graph is SYNCHRONOUS: `require(esm)` cannot wait, and one top-level `await` '
    + 'anywhere in the graph would surface at this load as `ERR_REQUIRE_ASYNC_MODULE` (`§3.1`\'s foot)');
  assert.equal(run.report.loaded, true,
    'and the load completed rather than deferring — the law read as the ruling states it');
});
