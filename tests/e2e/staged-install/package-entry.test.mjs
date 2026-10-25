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
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// **⟶ ROUTED `O3` AND RE-HOMED 2026-10-25 BY THE BATTERY'S STRATIFICATION MOVE (`D-5`, `D-6`, `D-7`,
// `D-9`; `docs/L1/test-stratification.json`'s `o3_staged_tree`).** This file's SUBJECT is the packaged
// resolution — the identity reached as a SELF-REFERENCE through the `exports` map, one arms-bearing arm, the
// refused wildcard and deep import, one `.node` load — so a path route would delete the very claim the file
// exists to make. **IT NOW STAGES THE TREE ITS OWN RUN DECLARES AND REACHES THE NAME FROM INSIDE IT**: the
// specifier does not move in this file, it moves into `name-driver.mjs`, written at the tree's root by
// `staged-install-support.mjs` (`D-7`'s own helper; `respelling.o3_mechanism`). **AND THE BYTES THIS FILE
// READS ARE THE STAGED TREE'S**, so `package.json`, `README.md` and the entry are read where an install would
// place them — which is the same bytes, at the shape the claim is about.
import {
  APP_LAYER, LAYER, RUN_RELATIVE_PATH, mintStageRoot, nameReach, stagePackageTree,
} from './staged-install-support.mjs';

// `S-ONE-ADDON`: *"exactly one `.node` load; no subprocess, no `dlopen` of a second library, no WASM
// instantiation"*. The count is taken by intercepting the runtime's own loader BEFORE the entry is reached.
let nativeLoads = 0;
const realDlopen = process.dlopen;
process.dlopen = function countingDlopen(...args) {
  nativeLoads += 1;
  return realDlopen.apply(this, args);
};

/// **THE STAGED TREE** — one scratch root for this file, one tree beneath it, swept on process exit
/// (`o3_staged_tree.isolation`). `PACKAGE_DIR` is the tree's `node_modules/provident-storeroom`, so every
/// `readFileSync` and every `readdirSync` below reads the SHIPPED allowlist placed where an install places it.
const STAGE_ROOT = mintStageRoot('storeroom-staged-package-entry-');
const STAGED = stagePackageTree(STAGE_ROOT);
const PACKAGE_DIR = STAGED.packageDir;
const PKG = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
// **THE NAME REACH, AND IT IS THE DRIVER'S**: this line imports the DRIVER by path; the package's own reach is
// the driver's static `import * as api from 'provident-storeroom'`, resolved from inside the tree. `require_`
// is the TREE's resolver, so the two probes below are taken from where the package was installed.
const { api, req: require_ } = await nameReach(STAGE_ROOT);

// The package's own registry identity (`package.md §3.1` item 2, `DD-26`), reached BY NAME through its
// `exports` map — which is also `DD-24`'s drive: the map publishes exactly one arms-bearing entry, the ESM
// one. **THE IDENTITY IS `provident-storeroom` (`Q3-1`'s rename, landed): the name resolves ONLY through a
// manifest that declares it**, which in this run is the staged tree's own `package.json` carried byte-for-byte
// from the shipped allowlist — the same resolution a consumer's install performs, and the one `D-7` reserves
// to this set. The five platform packages are the SCOPED names (`resolution.md §3.1`).
// **⟶ THE REACH ITSELF IS `nameReach`'s, ABOVE** (`staged-install-support.mjs`); this block names what it is.

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
  // **⟶ RE-READ 2026-10-16 BY THE `A122` PASS, AND THE EXPECTATION ABOVE DOES NOT MOVE BECAUSE THE RULING
  // KEEPS THE ARM: *"the engine is BEHIND the package surface … THE KERNEL'S FIVE ITEMS ARE INTERNAL, not
  // consumer API. There is NO second `exports` arm."*** **THE CONSTRAINT KERNEL'S MODULE ARRIVES IN `files`
  // AND NOT IN THIS MAP** — it is not a separately reachable export and the subpath shape is REFUSED BY NAME
  // (`docs/specs/storeroom-publish/distribution.md §2.1` item 6; `A122`) — **SO THE ONE-ARM EQUALITY IS THIS
  // CELL'S OWN READING FROM THIS DATE AS IT WAS BEFORE IT, AND WHAT THE CELL GAINS IS THE PROHIBITION
  // BESIDE IT: the kernel's own two spellings reach NO arm of this map, and a drive that found one there
  // would have found the second entry `A122` refuses.** The count and the two subpath probes below are read
  // together, so neither can be satisfied by moving the kernel from one home to the other.
  for (const subpath of ['./src/constraint-kernel.mjs', './kernel', './constraint-kernel']) {
    assert.equal(exportsMap[subpath], undefined,
      `the subpath shape \`${subpath}\` is REFUSED BY NAME: the kernel is BEHIND the surface, not beside it`);
  }
  // **⟶ RE-DERIVED 2026-10-16 BY THE `A126` PASS (`role_test_writer`): THE POST-CREATION ROUTE'S NAME IS
  // DISPLACED — ONE NAME WITH AN `operation` POSITION → THREE SURFACE FUNCTIONS — WHILE THE `exports` HALF
  // OF THIS CELL STANDS WHOLE.** `A122` keeps the one arms-bearing arm and the kernel behind the surface;
  // the namespace's figure moves `9 → 11` at its own home (`surface.md §2.9` item 1's dated clause of this
  // date, `8 + 3 = 11`), and `manageConstraints` is displaced by that clause and by no other.
  // **⟶ RE-DERIVED AGAIN 2026-10-16 (`surface.md §2.9` item 1's `A127` CLAUSE; `§2.12` item 2 (a)'s clause
  // of that date).** **THE NAMESPACE IS AT ONE NAME AND EVERY STORE-REACHING ROUTE IS A METHOD OF THE
  // OBJECT `storeCreate` RETURNS, so the constraint functions are reached through the ENTRY'S OWN PRODUCT
  // and not through an arm — which is the `A122` half this cell guards — and no name of the displaced
  // readings (`manageConstraints`, `addConstraint`, …) stands in the namespace.** `[A2 docs/decisions.md ·
  // `A122` · `A127` | requirement]`
  const probe = api.storeCreate({ journalLength: 8, listeners: [] });
  for (const route of ['addConstraint', 'constraintOn', 'constraintOff']) {
    assert.equal(typeof probe[route], 'function',
      `and the kernel is reached by NOTHING at this map: the surface's own post-creation constraint `
      + `function \`${route}\` is reached through the entry's OWN PRODUCT and not through an arm `
      + '(`surface.md §2.12` item 2; `docs/decisions.md` · `A126` · `A127`)');
    assert.equal(route in api, false,
      `and \`${route}\` is NOT a name of the namespace (\`10 → 0\` named, \`11 → 1\` total; §2.9 item 1's `
      + '`A127` clause of 2026-10-16)');
  }
  for (const superseded of ['manageConstraints', 'on', 'off', 'read', 'write', 'listen', 'unlisten']) {
    assert.equal(superseded in api, false,
      `and the superseded name \`${superseded}\` is NOT a name of this namespace — "the \`+1\` of `
      + '`manageConstraints` is displaced by this clause and by no other, so the count does not accumulate '
      + 'two readings of one route" and the merged pair is displaced by the `A127` clause '
      + '(`surface.md §2.9` item 1\'s `A127` clause of 2026-10-16)');
  }
});

test('package_a_wildcard_export_and_a_deep_import_are_both_refused', (t) => {
  // `DD-24`: a wildcard `"./*"` export would expose the `.node` path; a deep import is refused for the same
  // reason. **A `require()` of the bare specifier is NOT asserted to throw**: on the declared toolchain
  // (Node `v24.20.0`) the RUNTIME supplies `require(esm)` interop of its own, which is the consumer's own
  // side of the boundary (`HO-1`) and not a published arm of this package.
  assert.equal(PKG.exports['./*'], undefined, 'no wildcard export');

  // **⟶ REPAIRED (`F-1`, `§10`): THE DEEP-IMPORT PROBE IS RE-CUT AT THE CURRENT DECLARED PLATFORM SPECIFIER
  // AND ITS OUTCOME IS NOW ASSERTED SPECIFICALLY.** THE AS-FILED CELL PROBED
  // `require_.resolve('@provident-storeroom/js/index.node')` — the scope `A86` RETIRED — and
  // `require_.resolve` **THROWS FOR ANY SPECIFIER**, so that assertion was satisfied by a typo, by a stale
  // scope and by an empty string alike: it asserted nothing about the deep import at all. **THE SUBJECT IS
  // NOW THE CONTRACT'S OWN FIVE-NAME TABLE'S HOST-APPROPRIATE NAME (`resolution.md §3.1`, the `OPERATIVE`
  // column of `A86`(a)) AND THE DEEP PATH IS THE ONE THE LOADER'S OWN `require` LANDS ON — the platform
  // package's own `main` (`<name>/storeroom_js_binding.node`)** — and the outcome is asserted in whichever
  // of the TWO states the tree is in, each outcome PINNED so the cell distinguishes them:
  //   (1) the artefact IS installed where this file resolves from: the loader's own rung-one specifier
  //       resolves, and the deep import reaches **THE SAME FILE** — asserted equal, so the two spellings
  //       cannot diverge;
  //   (2) it is NOT installed in this checkout (`bindings/js/node_modules` does not exist — the platform
  //       packages are PUBLISHED and never vendored, `package.md §3.2`): the deep import fails with **THE
  //       SPECIFIC ERROR A NON-SHIPPED ARTEFACT YIELDS**, `MODULE_NOT_FOUND`, **AND ITS MESSAGE NAMES THE
  //       SPECIFIER ASKED FOR** — that naming is what makes the cell falsifiable, because a stale or
  //       misspelled probe reports ITSELF rather than passing silently.
  // **⟶ REPAIRED (`F-16`, `§13`): THE PROBE'S OWN FIVE-NAME FIXTURE IS MOVED TO THE DECLARED FIVE, CHARACTER
  // FOR CHARACTER.** THE AS-FILED LIST WAS SPELLED AT `A86`(a) — `@auspicion/js-<label>` — WHICH `A88`(a)
  // SUPERSEDES BY NAME (`docs/specs/storeroom-publish-proposal.md §14`; `docs/specs/storeroom-js-greens.md`
  // `JSG-12.12`, whose own clause REFUSES that spelling explicitly), so the probe's subject was a name the
  // shipped manifest does not pin and the guard below — *"the probe's subject is one of the five declared
  // names the manifest pins"* — was RED at ITS OWN GUARD: the probe reported ITSELF and not the deep import.
  // **THE TEXT MATCHED, RE-EMITTED VERBATIM:**
  //     const PLATFORM_NAMES = { // `resolution.md §3.1` — the five declared names, at the scope `A86`(a) sets
  //       'linux·x64': '@auspicion/js-linux-x64-gnu',
  //       'linux·arm64': '@auspicion/js-linux-arm64-gnu',
  //       'darwin·x64': '@auspicion/js-darwin-x64',
  //       'darwin·arm64': '@auspicion/js-darwin-arm64',
  //       'win32·x64': '@auspicion/js-win32-x64-msvc',
  //     };
  // **THE FIVE ARE READ FROM THE CONTRACT'S OWN FIVE-NAME CLAUSE AND NOT FROM THE IMPLEMENTATION**: the
  // `A88`(a) reading of `JSG-12.12`, carried into `docs/specs/storeroom-publish-proposal.md §14` — the scope
  // `@auspicion` UNMOVED, the project token `provident-storeroom-` INSERTED before the language marker, and
  // the five labels, their second segments and their toolchain suffixes UNMOVED (`3` with a suffix + `2`
  // without). **EVERY ASSERTION IN THIS CELL STANDS EXACTLY AS STRONG AS IT WAS**: the outcome of whichever
  // of the two states the tree is in is still PINNED (state (1): the loader's bare require and the deep
  // import reach ONE file, asserted equal; state (2): `MODULE_NOT_FOUND` AND the message NAMES the specifier
  // asked for), so a stale or misspelled fixture still reports itself at `:152` and not silently.
  const PLATFORM_NAMES = { // `JSG-12.12` (`A88`(a); `docs/specs/storeroom-publish-proposal.md §14`) — the five declared names
    'linux·x64': '@auspicion/provident-storeroom-js-linux-x64-gnu',
    'linux·arm64': '@auspicion/provident-storeroom-js-linux-arm64-gnu',
    'darwin·x64': '@auspicion/provident-storeroom-js-darwin-x64',
    'darwin·arm64': '@auspicion/provident-storeroom-js-darwin-arm64',
    'win32·x64': '@auspicion/provident-storeroom-js-win32-x64-msvc',
  };
  const host = PLATFORM_NAMES[`${process.platform}·${process.arch}`];
  if (host === undefined) {
    // the contract's table answers `NOT COVERED` for this pair (`resolution.md §4.1`), so rung one has no
    // name and this probe has no subject: PARKED with its structural reason rather than asserted vacuously.
    t.skip(`the host pair ${process.platform}·${process.arch} is NOT COVERED by the five-name table, so the deep import of the declared platform specifier has no subject here`);
    return;
  }
  // the probe's subject is DECLARED, not invented: it is one of the five keys the shipped manifest pins.
  assert.ok(Object.keys(PKG.optionalDependencies ?? {}).includes(host),
    `the probe's subject is one of the five declared names the manifest pins: ${host}`);
  const ARTIFACT = 'storeroom_js_binding.node'; // `PAR-PUB-30` / the platform packages' own `main`
  const hostLabel = `${process.platform}-${process.arch}`;
  // **⟶ RE-POINTED 2026-10-25: THE PLATFORM MANIFEST THIS CELL READS IS THE STAGED ONE.** The tree carries the
  // host row's platform package (`addon_staging`: as a PLATFORM PACKAGE, never the checkout's `build/Release`
  // beside the entry), so the guarded limb below now RUNS instead of being skipped: it asserts the tree's own
  // `main` is the artefact the deep import lands on.
  const platformManifest = join(STAGED.platformPackageDir, 'package.json');
  if (existsSync(platformManifest)) {
    assert.equal(JSON.parse(readFileSync(platformManifest, 'utf8')).main, ARTIFACT,
      `the platform package publishes the artefact as its own \`main\`, so the deep import below is the path a bare require lands on (${hostLabel})`);
  }
  const probe = (specifier) => {
    try { return { ok: true, path: require_.resolve(specifier), code: null, message: null }; }
    catch (err) { return { ok: false, path: null, code: err.code ?? null, message: String(err.message ?? err) }; }
  };
  const bare = probe(host);
  const deep = probe(`${host}/${ARTIFACT}`);
  if (bare.ok) {
    assert.ok(deep.ok,
      `state (1): the artefact IS installed, so its own subpath resolves: ${host}/${ARTIFACT}`);
    assert.equal(deep.path, bare.path,
      'state (1): the deep import and the loader\'s bare require reach ONE file');
  } else {
    assert.equal(deep.code, 'MODULE_NOT_FOUND',
      `state (2): a NON-SHIPPED artefact yields its own specific error, and not the export map's refusal: ${host}/${ARTIFACT}`);
    assert.ok(deep.message.includes(`${host}/${ARTIFACT}`),
      `state (2): the error NAMES the specifier it was asked for, so a stale or misspelled probe reports itself: ${host}/${ARTIFACT}`);
    assert.ok(!deep.message.includes('@provident-storeroom'),
      'state (2): and the scope `A86` retired is not the subject of this probe');
  }
  // **AND THE DEEP IMPORT AT THE PACKAGE'S OWN SHIPPED IDENTITY IS REFUSED BY ITS OWN `exports` MAP** — the
  // clause's own named failure (*"a deep-import path to the `.node`"*, `DD-24`), measured at bytes that exist
  // and not inferred from an absence: this package IS that identity, it carries NO wildcard and NO
  // `./index.node` subpath, so the map itself refuses the deep path.
  const ownDeep = probe(`${PKG.name}/index.node`);
  assert.equal(ownDeep.code, 'ERR_PACKAGE_PATH_NOT_EXPORTED',
    `\`${PKG.name}\` is present and its own \`exports\` map refuses the deep import to the \`.node\``);
  assert.ok(ownDeep.message.includes('./index.node'),
    `and the refusal names the subpath the map does not define: ${String(ownDeep.message).split('\n')[0]}`);
  // **AND THE AS-FILED SPELLING IS KEPT BESIDE IT AS A MEASURED REFUSAL RATHER THAN AS DECORATION**: the
  // retired identity resolves nowhere, its error names it, and this — and not the vacuous `assert.throws`
  // — is what the as-filed probe was actually reading.
  const retired = probe('@provident-storeroom/js/index.node');
  assert.equal(retired.code, 'MODULE_NOT_FOUND',
    'the retired identity resolves nowhere (`A86` retires the spelling and the main package is `provident-storeroom`)');
  assert.ok(retired.message.includes('@provident-storeroom/js/index.node'),
    'and that error names the retired spelling too, so the two spellings are told apart by the instrument');
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
  // **⟶ RE-DERIVED 2026-10-16 (`surface.md §2.9` item 1's `A127` CLAUSE).** **THE NAMESPACE IS AT ITS ONE
  // DECLARED NAME (`11 → 1`): THE EIGHT VERBS ARE METHODS OF THE OBJECT `storeCreate` RETURNS, and the
  // cell's own subject — NOTHING THAT REACHES THE STORE DIRECTLY IS A NAME OF THE ENTRY — is read at the
  // namespace AND at the product, so the reading is strengthened rather than moved.** `[A2
  // docs/decisions.md · `A122` · `A127` | requirement]`
  assert.equal(Object.keys(api).length, 1, 'the namespace is at ONE name');
  assert.equal(typeof api.storeCreate, 'function', '`storeCreate` is a named export of the claimed entry');
  const probe = api.storeCreate({ journalLength: 8, listeners: [] });
  for (const verb of ['read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten']) {
    assert.equal(typeof probe[verb], 'function', `\`${verb}\` is a METHOD of the product \`storeCreate\` returns`);
    assert.equal(verb in api, false, `and \`${verb}\` is NOT a named export of the claimed entry`);
  }
  // **`§2.4` item 5 (a)'s DATED CLAUSE OF 2026-10-11, ASSERTED AT THE NAMESPACE IT NAMES:** *"`register`
  // … is NOT a NINTH NAMED EXPORT of the entry … because `register` is reached through the FACTORY'S OWN
  // PRODUCT and not through the module namespace"* — so `package.md §1.3` item 3's *"NOTHING ELSE"* stands
  // WHOLE **and this cell records the reading the remand moved: the registration site exists, and it is
  // NOT here.** `§2.9` item 1's `8`-verb count therefore does not move.
  assert.ok(!('register' in api), '§2.4 item 5 (a): `register` is reached through the INSTANCE, not the namespace');
  assert.equal(typeof probe.register, 'function',
    'and it IS reached through the instance — the member the clause names (`§2.4` item 9 (f)\'s `A127` clause)');
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
  // **⟶ RE-DERIVED 2026-10-25 BY `D-9`'s STRUCTURAL MOVE, AND THE TWO EDITS ARE THE RULING'S OWN** (finding
  // `F13`, question `Q14`): *"the typed literal becomes a READING and the assertion (`:346`, a literal compared
  // to itself) is re-derived so it can fail."* The label this cell reports is now RUN A's, carried once by
  // `staged-install-support.mjs`, so it is READ here instead of typed — and the reading is proved against the
  // carrier's OWN BYTES, so a carrier that stopped declaring it, or declared a label outside the run's
  // vocabulary, fails this cell rather than passing over a constant.
  const site = `${RUN_RELATIVE_PATH}`; // the site the run's figures carry — this run's own directory
  const layer = LAYER; // READ: run A's label, off the carrier (`D-9`; `d9_relabel.the_five_sites_read`)
  const carrierBytes = readFileSync(new URL('./staged-install-support.mjs', import.meta.url), 'utf8');
  const declared = /^export const LAYER = '([^']*)';$/m.exec(carrierBytes);
  assert.ok(declared !== null,
    'the run\'s carrier declares its label as `const LAYER` — the import above and its bytes must agree, '
    + 'or this cell is reading a constant no carrier carries');
  assert.equal(layer, declared[1],
    'the label this figure reports IS the label the carrier declares, read at the carrier\'s own bytes');
  // the run's vocabulary, as `d9_relabel.vocabulary` fixes it: the label is a MEMBER of the set, never minted
  assert.ok(['ENVELOPE/PURE', 'LIVE / ASSEMBLED PACKAGE', 'LIVE/INSTALL'].includes(layer),
    `the label ${JSON.stringify(layer)} is a member of the declared set and not a spelling minted here`);
  // and the SITE is this run's: a figure that named a directory the run does not stand in would be a figure
  // about another run, which is exactly the {site, layer} pair `F2` records as not a rename
  assert.equal(site, RUN_RELATIVE_PATH,
    'the site a figure of this run carries is the run\'s own directory');
  assert.ok(existsSync(new URL('./staged-install-support.mjs', import.meta.url)),
    'and the site names the directory that carries the run\'s label');
  assert.equal(APP_LAYER, 'NONE', '`§4.2` item 2: there is no assembled application to be green');
  const docs = readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8');
  assert.ok(
    !/APP[- ]?(layer|green)\s*[:=]\s*(green|GREEN|PASS)/.test(docs),
    'DD-20: no APP-green may be claimed from a node test',
  );
});
