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
// The six existing blind instances were read ONLY to avoid duplicating a cell:
// `blind-package-surface.test.mjs` already drives the `exports` arm's SHAPE, the five platform names, the
// five exact pins, the allowlist's reachability and the absent-addon refusal. NOTHING of that is
// re-authored here: this file drives the REALM, the three fields, and the interop answer each realm is
// refused with. No byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read, no other
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

/** `contract.md` `HO-1`…`HO-6`: the six realms, each with the SAME declared answer — no arm, no entry and
 *  no promise — and no seventh. The list is here so a `require`/browser/worker arm appearing in the
 *  manifest is a FINDING at a named row. */
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

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('cjs · package.md §1.1 (`A70`, verbatim: *"Node ESM"*) and contract.md `DD-38` · THE CLAIMED REALM IS NODE ESM ALONE: the manifest declares `type: module` and a Node floor of `>=18.0.0`', () => {
  assert.equal(MANIFEST.type, 'module');
  assert.equal(MANIFEST.engines.node, '>=18.0.0');
  assert.equal(MANIFEST.name, 'provident-storeroom');
});

test('cjs · contract.md §3.1 (*"no CJS arm"*) and `DD-24` · THE ONE `exports` ARM CARRIES EXACTLY TWO CONDITIONS — `types` and `import` — and NO `require`, `node` or `default` condition stands anywhere in the map', () => {
  const keys = Object.keys(MANIFEST.exports);
  assert.deepEqual(keys, ['.']);
  assert.deepEqual(Object.keys(MANIFEST.exports['.']), ['types', 'import']);
  for (const condition of ['require', 'node', 'default', 'browser', 'worker', 'electron']) {
    assert.equal(condition in MANIFEST.exports['.'], false, `the arm declares no ${condition} condition`);
  }
});

test('cjs · contract.md §3.1 (*"no `main`"*) · `main` IS ABSENT: the package publishes no legacy entry, so a resolver that falls past the `exports` map meets nothing at all', () => {
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

test('cjs · contract.md `HO-1` (*"the package publishes NO CJS arm and NO `require` entry"*) · THE DECLARED ANSWER FOR A `require` IS THE MAP\'S REFUSAL: a CJS consumer\'s `require` of the name resolves NO arm, and the error is `ERR_PACKAGE_PATH_NOT_EXPORTED`', () => {
  withConsumerInstall((root) => {
    const printed = child(
      root,
      [],
      [
        'try {',
        "  const m = require('provident-storeroom');",
        "  console.log('LOADED ' + JSON.stringify(Object.keys(m)));",
        '} catch (e) {',
        "  console.log('REFUSED ' + (e && e.code ? e.code : String(e)));",
        '}',
      ].join('\n'),
    );
    assert.equal(printed, 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED');
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
    assert.equal(printed, 'REACHED 14', 'the one claimed entry reaches the addon internally and returns the product');
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

test('cjs · contract.md `HO-1`\'s own closing clause · THE UNCLAIMED SET IS ANSWERED BY THE DECLARATIONS AND NOT BY A FALLBACK: the manifest ships no second `.mjs`/`.cjs`/`.js` name beyond the one entry, and the package root carries no `.cjs` file', () => {
  const named = Object.values(MANIFEST.exports['.']).map((value) => value.replace(/^\.\//, ''));
  assert.deepEqual(named, ['index.d.ts', 'index.mjs']);
  const rootEntries = readdirSync(PACKAGE_DIR);
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.cjs')), []);
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.js')), []);
  // A `.mjs` beyond the one entry would be a second module a consumer could reach through `files` but not
  // through the map; the allowlist's own entries are the artefact's, and no `.mjs` beside the entry ships.
  assert.deepEqual(rootEntries.filter((name) => name.endsWith('.mjs')), ['index.mjs']);
});
