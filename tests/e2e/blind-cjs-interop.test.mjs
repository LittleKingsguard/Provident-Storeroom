// tests/e2e/blind-cjs-interop.test.mjs
//
// BLIND INSTRUMENT — THE DECLARED REALM AND ITS INTEROP ANSWERS: Node ESM claimed and CJS / Electron /
// browser / worker UNCLAIMED; the manifest's `main` / `browser` / `types` fields AS DECLARED; the declared
// answer for a `require` of the entry rather than an `import` of it; and the addon's own entry points not
// being reachable as subpaths.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md` §1.1 (the claimed realm, the
//     architect's ruling *"Node ESM"*, `A70`), §1.2 (the internal reach and that it is NOT a second claimed
//     realm, `DD-4`; and that the artefact's path is NOT a documented entry point), §1.3 items 1–4 (the ONE
//     arms-bearing entry, the refused wildcard, the entry's shape, and the addon's FIVE INTERNAL names)
//   · `docs/specs/storeroom-js/contract.md` §3.1 (the package's declared manifest, read at
//     *"ONE arms-bearing `exports` arm (the ESM one), no wildcard, no CJS arm, no `main`, no `.cjs`"*),
//     its `HO-1`…`HO-6` rows (the six unclaimed realms, each with its own refusal), `DD-24` (the one
//     entry's shape), `DD-4` (the realm claim's residual) and `DD-38` (the `>=18.0.0` runtime floor)
//   · `docs/specs/storeroom-publish/contract.md` §2.4 (the authored types and the `types` field) and §2.1
//     (the allowlist) · `§1.1` (the three resolution rungs) · `PUB-DD-3`, `PUB-DD-21`
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-publish/distribution.md` §5.1 item 1 and
//     its field table (`types` → `index.d.ts`) · §3 (the platform artefact's `.node` at its own package
//     root, *"NOT exported as a subpath of the main package"*)
//   · the harness manifests — `bindings/js/package.json`, `bindings/js/platforms/*/package.json`
//
// ⟶ **RE-DERIVED 2026-11-17 ON `D-127`, `D-128` AND `D-129`** (`strata/decisions.md`; the bounded amendment
// at `docs/specs/storeroom-js/contract.md`, nine insertions dated this day, `role_l1_architect`). THE FOUR
// CELLS WHOSE SUBJECT THE AMENDMENT MOVES ARE RE-DERIVED AT THEIR OWN SITES AND EACH NAMES ITS CLAUSE THERE:
// **`D-128` — *"Proceed with arm 1"* — `exports["."]` gains `"require": "./index.mjs"`, a THIRD condition
// beside `types` and `import`, naming the SAME ESM entry** (`contract.md §0.2`'s 2026-11-17 foot clause,
// limb 1: **no `main`, no `default`, no `node`, no `.cjs`**), so the map's cell becomes a THREE-CONDITION
// equality and the `require`-refusal cell becomes a **LOAD** cell; **`D-127`** retires `DD-38`'s `">=18.0.0"`
// and **`D-129`** fixes the floor at **`">=22.12.0"`**; and **`§3.2`'s `HO-1` re-derivation** re-says the
// declared answer — *"the package publishes NO CJS ARM — no `.cjs`, no `main`, no second build — and it DOES
// publish a `require` CONDITION on its one ESM entry, so a CJS host's `require` is served BY THE PACKAGE
// through Node's own `require(esm)` interop, at or above the declared loader floor"* — while **`§3.1`'s**
// re-derivation declares *"`require` IS A SUPPORTED ROUTE INTO THE CLAIMED REALM AND IS NOT A SECOND CLAIMED
// REALM"*. **NO REFUSAL IS DROPPED: every `.cjs`, `main`, `default`, `node`, browser, worker and Electron
// refusal below stays a refusal, and the one-arms-bearing-entry equality becomes a three-condition
// equality.** The cells' own text carries the dated re-derivation where each one moved.
//
// The six existing blind instances were read ONLY to avoid duplicating a cell:
// `blind-package-surface.test.mjs` already drives the `exports` arm's SHAPE, the five platform names, the
// five exact pins, the allowlist's reachability and the absent-addon refusal. NOTHING of that is
// re-authored here: this file drives the REALM, the four fields, and the interop answer each realm is
// answered with. No byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read, no other
// battery or runner under `tests/**` was read, and NO CELL OPENS A `docs/**` PATH AT RUNTIME (`D-17`).
// The manifests this file reads ARE THE ARTEFACT UNDER TEST and not documents.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, symlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(here, '..', '..', 'bindings', 'js');
const MANIFEST = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

/** `package.md §1.3` item 4: the internal addon's export set is EXACTLY FIVE NAMES AND NO SIXTH. */
const ADDON_NAMES = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];

/** `contract.md` `HO-1`…`HO-6`: the six realms, each with the SAME declared answer — no CJS arm, no entry
 *  and no promise — and no seventh. The list is here so a browser/worker/Electron arm appearing in the
 *  manifest is a FINDING at a named row. **AND ONE REALM'S ANSWER MOVED 2026-11-17:** `HO-1`'s row is
 *  re-derived by `D-128`/`D-129` (`contract.md §3.2`), and what the package now serves is a `require`
 *  **CONDITION** on its one ESM entry — a supported ROUTE into the claimed realm, not a second claimed realm
 *  — while a CJS **ARM** (a `.cjs`, a `main`, a second build) stays refused. So this list is read at the
 *  BUILD and the FALLBACK, never at the condition (`§0.2`'s 2026-11-17 foot clause, limb 1). */
const UNCLAIMED_REALMS = ['CJS (HO-1)', 'Electron main (HO-2)', 'Electron preload (HO-3)', 'Electron renderer (HO-4)', 'the browser (HO-5)', 'workers (HO-6)'];

// ---------------------------------------------------------------------------------------------
// A CONSUMER'S INSTALL, so a specifier is resolved by the manifest and by nothing else.
// ---------------------------------------------------------------------------------------------

const withConsumerInstall = (run) => {
  const root = mkdtempSync(join(tmpdir(), 'cjs-interop-'));
  mkdirSync(join(root, 'node_modules'));
  symlinkSync(PACKAGE_DIR, join(root, 'node_modules', 'provident-storeroom'), 'dir');
  return run(root);
};

const child = (root, args, code) => {
  const result = spawnSync(process.execPath, [...args, '-e', code], { cwd: root, encoding: 'utf8' });
  return result.stdout.trim();
};

/** The same child, WITH its exit status and its stderr — a LOAD cell asserts the process's own answer and
 *  not only its stdout (`D-128`; `contract.md §0.2`'s 2026-11-17 foot clause, limb 2). */
const childFull = (root, args, code) => {
  const result = spawnSync(process.execPath, [...args, '-e', code], { cwd: root, encoding: 'utf8' });
  return {
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
};

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('cjs · package.md §1.1 (`A70`, verbatim: *"Node ESM"*) and contract.md `DD-38` as re-derived 2026-11-17 (`D-127`, `D-129`) · THE CLAIMED REALM IS NODE ESM ALONE: the manifest declares `type: module` and a Node floor of `>=22.12.0`', () => {
  // ⟶ RE-DERIVED 2026-11-17. **`D-127` (*"Bump the floor, there's no backwards compatibility concerns"*)
  // SUPERSEDES `DD-38`'s `">=18.0.0"`, and `D-129` fixes the figure at `">=22.12.0"`** — the one single
  // comparator set under which the declared route is true at EVERY admitted version, because `require(esm)`
  // is unflagged only from `Node 20.19.0` / `Node 22.12.0` and still flagged on `21.x` and `22.0`–`22.11`
  // (`contract.md §0.2`'s 2026-11-17 foot clause, limb 3; `DD-38` as re-derived at its own cell: the anchor
  // moves from the CARRIER to the LOADER). The literal is TRANSCRIBED from the ruling, never computed.
  assert.equal(MANIFEST.type, 'module');
  assert.equal(MANIFEST.engines.node, '>=22.12.0');
  assert.equal(MANIFEST.name, 'provident-storeroom');
});

test('cjs · contract.md §3.1 and `DD-24` as re-derived 2026-11-17 (`D-128`; `§0.2`\'s foot clause, limb 1) · THE ONE `exports` ARM CARRIES EXACTLY THREE CONDITIONS — `types`, `import`, `require` IN THAT DECLARED ORDER — and NO `node`, `default`, `browser`, `worker` or `electron` condition stands anywhere in the map', () => {
  const keys = Object.keys(MANIFEST.exports);
  assert.deepEqual(keys, ['.']);
  // **THE ONE-ARM EQUALITY BECOMES A THREE-CONDITION EQUALITY, AND THE ORDER IS PART OF IT:** `types` FIRST
  // (a `types` placed after `import` is never consulted by a resolver that takes `import` first —
  // `DEF-2026-10-17-D`), `import` SECOND and UNMOVED, `require` THIRD and ADDED — the order the amendment
  // DECLARES rather than leaving to the editor (`§0.2`'s 2026-11-17 foot clause, limb 1; asserted positionally
  // at `staged-install/publish.test.mjs`'s `P-PUB-7` manifest cell and at
  // `constraints-publication.test.mjs`'s allowlist cell, which read the same three positions).
  assert.deepEqual(Object.keys(MANIFEST.exports['.']), ['types', 'import', 'require']);
  // AND THE CONDITION IS NOT A SECOND ENTRY: `require` names the SAME file `import` names (`DD-24` as
  // re-derived — *"one entry, three conditions; `import` and `require` name the same `./index.mjs`; the
  // `require` condition is NOT a co-equal CJS arm"*).
  assert.equal(MANIFEST.exports['.'].import, './index.mjs');
  assert.equal(MANIFEST.exports['.'].require, './index.mjs');
  assert.equal(MANIFEST.exports['.'].require, MANIFEST.exports['.'].import);
  // THE FORBIDDEN SET LOSES `require` AND KEEPS THE OTHER FIVE — no condition of the map carries one of them.
  for (const condition of ['node', 'default', 'browser', 'worker', 'electron']) {
    assert.equal(condition in MANIFEST.exports['.'], false, `the arm declares no ${condition} condition`);
  }
});

test('cjs · contract.md §3.1 (*"no `main`"*) and `§0.2`\'s 2026-11-17 foot clause, limb 1 (*"no `main`, no `.cjs`"*) · `main` IS ABSENT: the package publishes no legacy entry, so a resolver that falls past the `exports` map meets nothing at all — and the `require` condition adds no second file to the absence', () => {
  // **UNMOVED BY THE AMENDMENT AND STILL ASSERTED AS FILED:** `D-128` refuses the CJS BUILD (arm 2) and the
  // amendment's own words are *"no `main` … and no `.cjs` artefact exists anywhere in the package"*.
  assert.equal('main' in MANIFEST, false);
  assert.equal('module' in MANIFEST, false);
  assert.equal('browser' in MANIFEST, false);
  // And no `.cjs` artifact is named anywhere in the published field set.
  assert.equal(JSON.stringify(MANIFEST.exports).includes('.cjs'), false);
});

test('cjs · contract.md `HO-5` (*"nothing is shipped and nothing is promised; the promise would be false by construction"*) · `browser` IS ABSENT and the manifest carries no browser, renderer or bundle field', () => {
  assert.equal('browser' in MANIFEST, false);
  for (const field of ['renderer', 'web', 'browserify', 'unpkg', 'jsdelivr']) {
    assert.equal(field in MANIFEST, false, `the manifest carries no ${field} field`);
  }
  assert.deepEqual(Object.keys(MANIFEST.exports['.']).filter((key) => key === 'browser'), []);
});

test('cjs · contract.md `HO-2`…`HO-4` (the ABI question is *"the CONSUMER\'s host-configuration duty"*) · NOTHING ELECTRON-SPECIFIC IS SHIPPED: no `electron` field, no `gypfile`, and no build key at the manifest', () => {
  for (const field of ['electron', 'gypfile', 'binary', 'build', 'install', 'postinstall']) {
    assert.equal(field in MANIFEST, false, `the manifest carries no ${field}`);
  }
  // The realms the contract refuses by name are six and the manifest answers none of them.
  assert.equal(UNCLAIMED_REALMS.length, 6);
});

test('cjs · contract.md `HO-6` (*"no worker-specific entry, no transferable-value plan and no shared-memory clause is declared"*) · NOTHING WORKER-SPECIFIC IS SHIPPED: no worker entry, no `worker_threads` subpath and no shared-memory field', () => {
  assert.equal(JSON.stringify(MANIFEST.exports).includes('worker'), false);
  for (const field of ['worker', 'worker_threads', 'sharedMemory', 'transferables']) {
    assert.equal(field in MANIFEST, false, `the manifest carries no ${field} field`);
  }
});

test('cjs · contract.md §2.4 and distribution.md §5.1 item 1 + its field table · `types` IS DECLARED and reaches the AUTHORED `index.d.ts` the allowlist ships — the one field of the three that is present', () => {
  assert.equal(MANIFEST.types, 'index.d.ts');
  assert.equal(MANIFEST.exports['.'].types, './index.d.ts');
  assert.ok(existsSync(join(PACKAGE_DIR, MANIFEST.types)));
  const declaration = readFileSync(join(PACKAGE_DIR, MANIFEST.types), 'utf8');
  // `§2.4` item 1 / `PUB-DD-21`: the file is HAND-AUTHORED and not generated, and it says so in its own
  // bytes rather than in a banner a generator would write.
  assert.match(declaration, /HAND-AUTHORED AND NOT GENERATED/);
});

test('cjs · contract.md `HO-1` as re-derived 2026-11-17 (`D-128`, `D-129`) · THE DECLARED ANSWER FOR A `require` IS A LOAD: a CJS consumer\'s `require` of the bare name resolves the ONE arm and loads the SAME ESM entry, printing the one-name namespace `["storeCreate"]` and exiting 0', () => {
  // ⟶ **THE AS-FILED CELL IS REPLACED AND NOT SOFTENED (2026-11-17).** It asserted the map's refusal —
  // `'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED'` — and that expected string is **GONE**: `D-128` publishes
  // `"require": "./index.mjs"`, so a `require` of the name now resolves an arm and **NODE'S OWN
  // `require(esm)` interop** supplies the load (`contract.md §0.2`'s 2026-11-17 foot clause, limb 2: *"the
  // load is supplied by NODE'S OWN `require(esm)` interop, at or above the loader floor this contract
  // declares, and the package publishes no second module, no second build and no second realm"*). **WHAT IS
  // STILL ASSERTED, AND TIGHTER THAN BEFORE:** the child is a real CJS consumer in a real consumer tree, the
  // load must SUCCEED, the namespace must be the ONE declared name, the process must exit `0`, and the
  // stderr must carry no loader refusal — a regression to the refusal, or a load of a second module, reddens
  // this cell either way. **THE PATH-ROUTE CONTROL STAYS GREEN ELSEWHERE:** `live-drive.mjs`'s `LIVE-11.6`
  // (a `require` of the entry's own PATH, which never consulted the map) is this cell's neighbour and its
  // subject is the consumer's side, not the arm.
  withConsumerInstall((root) => {
    const run = childFull(
      root,
      [],
      [
        'try {',
        "  const m = require('provident-storeroom');",
        "  console.log('LOADED ' + JSON.stringify(Object.keys(m).sort()));",
        '} catch (e) {',
        "  console.log('REFUSED ' + (e && e.code ? e.code : String(e)));",
        '  process.exitCode = 1;',
        '}',
      ].join('\n'),
    );
    assert.equal(run.status, 0, `the CJS consumer's process exited ${run.status}: ${run.stderr}`);
    assert.equal(run.stdout, 'LOADED ["storeCreate"]', 'the `require` route loads the ONE entry and yields its one name (`D-128`; `DD-24` re-derived)');
    assert.doesNotMatch(run.stderr, /ERR_PACKAGE_PATH_NOT_EXPORTED/, 'the map no longer refuses the `require` specifier');
    assert.doesNotMatch(run.stderr, /ERR_REQUIRE_ASYNC_MODULE/, 'the entry\'s load-time graph is synchronous (§3.1\'s foot: the sync-graph law)');
  });
});

test('cjs · package.md §1.2 items 1–3 and `DD-4` · THE INTERNAL REACH IS NOT A SECOND CLAIMED REALM: the ONE claimed entry constructs a store (so the addon was reached) while no addon name and no second entry point is reachable', () => {
  withConsumerInstall((root) => {
    const printed = child(
      root,
      ['--input-type=module'],
      [
        "import { storeCreate } from 'provident-storeroom';",
        'const instance = storeCreate({ journalLength: 8, listeners: [] });',
        "console.log('REACHED ' + Object.getOwnPropertyNames(instance).length);",
      ].join('\n'),
    );
    assert.equal(printed, 'REACHED 15', 'the one claimed entry reaches the addon internally and returns the product');
  });
});

test('cjs · package.md §1.3 item 4 · THE ADDON\'S OWN FIVE NAMES ARE NOT SUBPATHS: `version`, `errorMessage`, `storeCreate`, `call` and `register` are each refused by the `exports` map as a specifier', () => {
  withConsumerInstall((root) => {
    const lines = ADDON_NAMES.map((name) => `tryImport(${JSON.stringify(`provident-storeroom/${name}`)});`);
    const printed = child(
      root,
      ['--input-type=module'],
      [
        'const tryImport = async (specifier) => {',
        '  try {',
        '    await import(specifier);',
        "    console.log('REACHABLE ' + specifier);",
        '  } catch (e) {',
        "    console.log('REFUSED ' + (e && e.code ? e.code : String(e)));",
        '  }',
        '};',
        ...lines,
      ].join('\n'),
    );
    assert.deepEqual(
      printed.split('\n'),
      ADDON_NAMES.map(() => 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED'),
      'not one of the addon\u2019s five internal names is a subpath a consumer can spell',
    );
  });
});

test('cjs · distribution.md §3 (the platform artefact) · THE PLATFORM ARTEFACT IS NOT A SUBPATH OF THE MAIN PACKAGE: neither `build/Release`, nor `platforms`, nor a `*.node` path resolves through the one arm', () => {
  withConsumerInstall((root) => {
    const specifiers = [
      'provident-storeroom/build/Release/storeroom_js_binding.node',
      'provident-storeroom/platforms',
      'provident-storeroom/platforms/linux-x64-gnu/package.json',
      'provident-storeroom/src/constraint-kernel.mjs',
    ];
    const printed = child(
      root,
      ['--input-type=module'],
      [
        'const tryImport = async (specifier) => {',
        '  try {',
        '    await import(specifier);',
        "    console.log('REACHABLE ' + specifier);",
        '  } catch (e) {',
        "    console.log('REFUSED ' + (e && e.code ? e.code : String(e)));",
        '  }',
        '};',
        ...specifiers.map((specifier) => `tryImport(${JSON.stringify(specifier)});`),
      ].join('\n'),
    );
    assert.deepEqual(
      printed.split('\n'),
      specifiers.map(() => 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED'),
      'the artefact and the kernel module travel without becoming entry points',
    );
  });
});

test('cjs · contract.md `HO-1`\'s own closing clause, read with `§0.2`\'s 2026-11-17 foot clause · THE UNCLAIMED SET IS ANSWERED BY THE DECLARATIONS AND NOT BY A FALLBACK: the manifest names no second module beyond the one entry and the one declaration, and the package root carries no `.cjs` file', () => {
  // ⟶ RE-DERIVED 2026-11-17. The as-filed cell asserted `Object.values(exports['.'])` equalled
  // `['index.d.ts', 'index.mjs']` — a VALUES list that grows a THIRD member when `D-128`'s condition names
  // the same file a second time, and that would have been satisfied by a `require` pointing at a second
  // module the moment the list was merely relaxed. **THE PROPERTY IS THE FILE SET, NOT THE CONDITION LIST:**
  // the manifest names exactly TWO FILES — the authored declaration and the one entry — however many
  // conditions route to them, so the equality is taken over the SET and the second module a consumer could
  // spell stays refused. Every refusal below is unmoved.
  const named = Object.values(MANIFEST.exports['.']).map((value) => value.replace(/^\.\//, ''));
  assert.deepEqual([...new Set(named)].sort(), ['index.d.ts', 'index.mjs'], 'the map names TWO FILES and no third');
  assert.equal(named.filter((name) => name === 'index.mjs').length, 2, '`import` and `require` name the SAME one entry (`D-128`)');
  const rootEntries = readdirSync(PACKAGE_DIR);
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.cjs')), []);
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.js')), []);
  // A `.mjs` beyond the one entry would be a second module a consumer could reach through `files` but not
  // through the map; the allowlist's own entries are the artefact's, and no `.mjs` beside the entry ships.
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.mjs')), ['index.mjs']);
});
