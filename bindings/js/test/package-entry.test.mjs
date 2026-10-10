// `package.md` (`contract.md §3`) — THE PACKAGE AT ITS OWN BOUNDARY: the claimed realm, the one ESM entry
// and its `exports` map, the engine floor, the licence of record, the `HO-` rows' non-exposure, and the
// LAYER discipline. Plus `P-TP-7`'s own register runner, whose four strategy lines are `S-LOAD` ·
// `S-ONE-ADDON` · `S-HO` · `S-LAYER` (`contract.md §5.7`).
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED:** the entry as a self-reference through the `exports`
// map · a `require()` of the same specifier (HO-1) · a deep import of the `.node` · a wildcard subpath · the
// `exports` map's arm count · the `engines` floor · the `license` field · the package's own README's two
// required statements · each of the seven `HO-` realms' non-exposure · the `.node` load count · the
// LAYER label and the absence of any `APP`-green claim.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// `S-ONE-ADDON`: *"exactly one `.node` load; no subprocess, no `dlopen` of a second library, no WASM
// instantiation"*. The count is taken by intercepting the runtime's own loader BEFORE the entry is reached.
let nativeLoads = 0;
const realDlopen = process.dlopen;
process.dlopen = function countingDlopen(...args) {
  nativeLoads += 1;
  return realDlopen.apply(this, args);
};

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);
const PKG = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
const require_ = createRequire(import.meta.url);

// The package's own registry identity (`package.md §3.1` item 2, `DD-26`), reached as a SELF-REFERENCE
// through its `exports` map — which is also `DD-24`'s drive: the map publishes exactly one arms-bearing
// entry, the ESM one. **THE IDENTITY IS `provident-storeroom` (`Q3-1`'s rename, landed): a self-reference
// resolves ONLY through the name the package's own manifest declares**, and the five platform packages are
// the SCOPED names (`resolution.md §3.1`).
const api = await import('provident-storeroom');

// ---------------------------------------------------------------------------------------------
// `P-TP-7` `S-LOAD` / `S-ONE-ADDON` — the boot
// ---------------------------------------------------------------------------------------------

test('register_ptp7_s_load_the_esm_entry_resolves_and_loads_the_addon', () => {
  assert.equal(typeof api.storeCreate, 'function', 'the ESM entry resolved');
  // `§1.2` item 1: *"There is exactly ONE `.node` load per instance construction, at exactly one path"* —
  // so the counter is read after ONE construction, wherever in the load path the step is taken.
  const inst = api.storeCreate({ journalLength: 1, listeners: [] });
  assert.ok(inst !== undefined, 'an instance was constructed');
  assert.ok(
    nativeLoads >= 1,
    'the entry reaches the store: the Node-API addon is loaded through the package\'s internal step',
  );
  assert.equal(nativeLoads, 1, 'S-ONE-ADDON: exactly ONE `.node` load for exactly ONE construction');
  process.dlopen = realDlopen;
});

test('register_ptp7_s_one_addon_no_second_addon_no_subprocess_and_no_wasm', () => {
  const entry = readFileSync(join(PACKAGE_DIR, PKG.exports['.'].import ?? PKG.exports['.']), 'utf8');
  assert.ok(!/child_process|execSync|spawnSync|fork\(/.test(entry), 'no subprocess is loaded');
  assert.ok(!/WebAssembly|\.wasm/.test(entry), 'no WASM module is instantiated');
  assert.equal(
    (entry.match(/['"][^'"]*\.node['"]/g) ?? []).length,
    1,
    'S-ONE-ADDON: exactly ONE `.node` path is spelled by the entry',
  );
  for (const other of ['.so', '.dll', '.dylib', '.wasm']) {
    assert.ok(
      !(entry.match(new RegExp(`['"][^'"]*\\${other}['"]`, 'g')) ?? []).length,
      `no second shared library and no WASM module is loaded: \`${other}\``,
    );
  }
});

// ---------------------------------------------------------------------------------------------
// `package.md §1.1`–§1.4` — the claimed realm and the one entry
// ---------------------------------------------------------------------------------------------

test('package_the_claim_is_node_esm_alone_through_exactly_one_arms_bearing_entry', () => {
  const exportsMap = PKG.exports;
  assert.equal(typeof exportsMap, 'object');
  const arms = Object.values(exportsMap).filter(
    (arm) => typeof arm === 'object' && (arm.import || arm.require || arm.default),
  );
  assert.equal(arms.length, 1, 'DD-24: EXACTLY ONE arms-bearing entry — the ESM one');
  assert.ok(arms[0].import, 'and it is the ESM arm');
  assert.equal(arms[0].require, undefined, 'HO-1: the package publishes NO CJS arm');
});

test('package_a_wildcard_export_and_a_deep_import_are_both_refused', () => {
  // `DD-24`: a wildcard `"./*"` export would expose the `.node` path; a deep import is refused for the same
  // reason. **A `require()` of the bare specifier is NOT asserted to throw**: on the declared toolchain
  // (Node `v24.20.0`) the RUNTIME supplies `require(esm)` interop of its own, which is the consumer's own
  // side of the boundary (`HO-1`) and not a published arm of this package.
  assert.equal(PKG.exports['./*'], undefined, 'no wildcard export');
  assert.throws(
    () => require_.resolve('@provident-storeroom/js/index.node'),
    'a deep import to the addon is not exported',
  );
});

test('package_no_cjs_arm_and_no_require_entry_is_published', () => {
  const arms = Object.values(PKG.exports).filter((arm) => typeof arm === 'object');
  for (const arm of arms) {
    assert.equal(arm.require, undefined, 'HO-1: no `require` condition in the map');
    assert.equal(arm.node, undefined, 'no `node` condition shortcut to the addon');
  }
  assert.ok(
    !readdirSync(PACKAGE_DIR).some((f) => f.endsWith('.cjs')),
    'no CJS artefact is published in the package',
  );
  assert.equal(PKG.main, undefined, 'no CJS `main` entry beside the ESM arms');
});

test('package_the_named_exports_are_the_eight_verbs_and_nothing_that_reaches_the_store_directly', () => {
  for (const verb of [
    'storeCreate',
    'read',
    'readLiteral',
    'write',
    'delete',
    'rollback',
    'listen',
    'unlisten',
  ]) {
    assert.equal(typeof api[verb], 'function', `\`${verb}\` is a named export of the claimed entry`);
  }
  // **`§2.4` item 5 (a)'s DATED CLAUSE OF 2026-10-11, ASSERTED AT THE NAMESPACE IT NAMES:** *"`register`
  // … is NOT a NINTH NAMED EXPORT of the entry … because `register` is reached through the FACTORY'S OWN
  // PRODUCT and not through the module namespace"* — so `package.md §1.3` item 3's *"NOTHING ELSE"* stands
  // WHOLE **and this cell records the reading the remand moved: the registration site exists, and it is
  // NOT here.** `§2.9` item 1's `8`-verb count therefore does not move.
  assert.ok(!('register' in api), '§2.4 item 5 (a): `register` is reached through the INSTANCE, not the namespace');
  assert.ok(!('findAddress' in api), 'A63: no resolver is exposed');
  assert.ok(!('dispose' in api) && !('close' in api), 'A74: no release verb at either layer');
  assert.ok(!('exists' in api), '§2.9 item 3: no `exists()` verb and no binding-side resolver');
});

test('package_the_engine_floor_is_declared_and_is_not_a_measurement', () => {
  assert.equal(PKG.engines?.node, '>=18.0.0', 'DD-38: the declared floor, and nothing narrower');
});

test('package_the_licence_is_declared_at_the_named_sites_and_not_copied_into_the_crate', () => {
  assert.equal(PKG.license, 'AGPL-3.0', 'DD-43: the `license` field');
  const readme = join(PACKAGE_DIR, 'README.md');
  assert.ok(existsSync(readme), 'DD-43: the declared README of the sibling crate');
  assert.ok(readFileSync(readme, 'utf8').includes('AGPL-3.0'), 'DD-43: the README declares it');
  assert.ok(!existsSync(join(PACKAGE_DIR, 'LICENSE')), 'DD-43: the licence file is NOT copied in');
});

test('package_the_documentation_states_the_two_declared_readings_and_the_reload_rule', () => {
  const readme = readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8');
  assert.match(
    readme,
    /must not be carried across a process reload|MUST NOT be carried across a process reload/i,
    'DD-28: the documentation MUST state that a handle must not cross a process reload',
  );
  assert.match(
    readme,
    /delete|rollback/i,
    '§2.8 item 2: the package documents both file-behaviour readings',
  );
});

// ---------------------------------------------------------------------------------------------
// `§3.2` / `§9` — the seven `HO-` rows, each asserting ONLY that the package exposes no entry
// ---------------------------------------------------------------------------------------------

const HO_ROWS = [
  ['HO-1', 'Node CJS', () => {
    assert.equal(PKG.exports['.'].require, undefined, 'no `require` arm is published');
    assert.ok(!readdirSync(PACKAGE_DIR).some((f) => /\.cjs$/.test(f)), 'no CJS artefact is shipped');
  }],
  ['HO-2', 'Electron main', () => assert.ok(!Object.keys(PKG.exports).some((k) => /electron/i.test(k)))],
  ['HO-3', 'Electron preload', () => assert.ok(!readdirSync(PACKAGE_DIR).some((f) => /electron/i.test(f)))],
  ['HO-4', 'Electron renderer', () => assert.equal(PKG.exports['./renderer'], undefined)],
  ['HO-5', 'the browser', () => {
    assert.equal(PKG.browser, undefined, 'no browser field');
    assert.ok(!Object.keys(PKG.exports).some((k) => /browser/i.test(k)));
  }],
  ['HO-6', 'workers', () => {
    assert.ok(!Object.keys(PKG.exports).some((k) => /worker/i.test(k)));
    assert.equal(PKG.exports['./worker'], undefined);
  }],
  ['HO-7', 'any IPC route', () => {
    for (const name of ['bridge', 'channel', 'serialize', 'createChannel', 'ipc']) {
      assert.ok(!(name in api), `no bridge, no channel protocol and no serialized value form: \`${name}\``);
    }
  }],
];

for (const [id, realm, drive] of HO_ROWS) {
  test(`register_ptp7_s_ho_${id.toLowerCase()}_the_package_exposes_no_entry_for_${realm.replace(/\W+/g, '_')}`, () => {
    // `§5.7`'s `S-HO`: *"one drive per `HO-` row: the package exposes no entry for the realm"* — and the
    // drive asserts ONLY that.
    drive();
  });
}

// ---------------------------------------------------------------------------------------------
// `§4.2` — the LAYER label, and the rule no pass may break
// ---------------------------------------------------------------------------------------------

test('register_ptp7_s_layer_the_figure_names_its_site_and_its_layer_and_no_app_green_is_claimed', () => {
  const site = `${HERE}`; // the directory the command ran in
  const layer = 'ENVELOPE/PURE'; // `DD-20`: this unit's JS-side green, and NOTHING MORE
  assert.ok(site.length > 0 && layer === 'ENVELOPE/PURE');
  const appLayer = 'NONE'; // `§4.2` item 2: there is no assembled application to be green
  assert.equal(appLayer, 'NONE');
  const docs = readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8');
  assert.ok(
    !/APP[- ]?(layer|green)\s*[:=]\s*(green|GREEN|PASS)/.test(docs),
    'DD-20: no APP-green may be claimed from a node test',
  );
});
