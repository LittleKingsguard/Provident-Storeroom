// tests/e2e/blind-package-surface.test.mjs
//
// BLIND INSTRUMENT — THE PACKAGE SURFACE: the three resolution rungs in order and the ONE declared
// absent-addon refusal they end in; the five platform package names and their exact pins; the
// allowlist's reachability; and the single `exports` arm.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing
// else:
//   · `docs/specs/storeroom-publish/contract.md` §1.1 (the three rungs, their order and the catch's
//     width) · §1.2 (the closed key set's table) · §1.3 (the five names, the scope `A86` and the
//     project token `A88`(a)) · §1.4 (the four states, the one failure arm, the subject and the
//     no-fallback rule) · §1.5 · §2.1 (the allowlist, as corrected 2026-10-25) · §2.2 · §2.3 ·
//     §2.4 · §2.5 · `PUB-DD-1` · `PUB-DD-9` · `PUB-DD-15` · `PUB-DD-17` · `PUB-DD-18` · `PUB-DD-19` ·
//     `PUB-DD-20` · `PUB-DD-21` · `PUB-DD-29`
//   · `docs/specs/storeroom-native/contract.md` §8.1 (#13) and §8.2's `FilePathUnreachable` row —
//     the generated message's own two clauses and the quoted rendering
//   · `bindings/js/index.d.ts` — `storeCreate`'s own doc block (the three rungs and the declared
//     refusal) and the fourteen own members
//   · the harness manifests — `bindings/js/package.json`, `bindings/js/platforms/*/package.json`
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read to author this file,
// no battery or runner under `tests/**` was read, and NO CELL OPENS A `docs/**` PATH AT RUNTIME
// (`D-17`). The manifests this file reads are THE ARTEFACT UNDER TEST and not documents: they are
// the bytes whose shape the clauses above declare.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as entry from '../../bindings/js/index.mjs';

const { storeCreate } = entry;

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(here, '..', '..', 'bindings', 'js');
const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// §1 — THE FIVE PLATFORM NAMES AND THEIR EXACT PINS
// ---------------------------------------------------------------------------------------------

// `docs/specs/storeroom-publish/contract.md §1.3`'s `A88`(a) clause and `§1.4`'s operative-name
// column, character for character: the scope `@auspicion` (`A86`), the separator `/`, the PROJECT
// TOKEN `provident-storeroom` (`A88`(a)), the LANGUAGE MARKER `js`, and the label; `3` of the five
// carry a toolchain suffix (`-gnu` twice, `-msvc` once) and `2` carry none — `3 + 2 = 5` ✓.
const FIVE_NAMES = [
  '@auspicion/provident-storeroom-js-linux-x64-gnu',
  '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  '@auspicion/provident-storeroom-js-darwin-x64',
  '@auspicion/provident-storeroom-js-darwin-arm64',
  '@auspicion/provident-storeroom-js-win32-x64-msvc',
];

// `§1.2`'s covered key table: the pair → the label the name carries.
const COVERED_KEYS = new Map([
  ['linux\u0000x64', '@auspicion/provident-storeroom-js-linux-x64-gnu'],
  ['linux\u0000arm64', '@auspicion/provident-storeroom-js-linux-arm64-gnu'],
  ['darwin\u0000x64', '@auspicion/provident-storeroom-js-darwin-x64'],
  ['darwin\u0000arm64', '@auspicion/provident-storeroom-js-darwin-arm64'],
  ['win32\u0000x64', '@auspicion/provident-storeroom-js-win32-x64-msvc'],
]);

test('package · §1.3 (`A88`(a)) and `PUB-DD-15` · the five platform names are the five declared spellings, the scope is `@auspicion` and the PROJECT TOKEN `provident-storeroom` stands between it and the language marker — no sixth, and neither superseded shape', () => {
  // DECLARED: "THE OPERATIVE READING IS `A88`(a), THE ADDITIVE ONE — *"the project token is INSERTED
  // before the language marker, so the five become `@auspicion/provident-storeroom-js-linux-x64-gnu` ·
  // `…-js-linux-arm64-gnu` · `…-js-darwin-x64` · `…-js-darwin-arm64` · `…-js-win32-x64-msvc`"*"; and
  // the refused shapes: "**a name whose scope IS `@provident-storeroom` — the scope `A86` retired**;
  // … an unscoped platform name; a sixth name"; and "THE SUPERSEDED FORM, REFUSED BY NAME: a name
  // whose spelling is `@auspicion/js-<label>`".
  const keys = Object.keys(manifest.optionalDependencies ?? {});
  assert.equal(keys.length, 5, 'the manifest declares a number of platform dependencies other than five');
  assert.deepEqual([...keys].sort(), [...FIVE_NAMES].sort());

  for (const name of keys) {
    assert.equal(name.startsWith('@auspicion/'), true, `${name} is not in the A86 scope`);
    assert.equal(name.startsWith('@auspicion/provident-storeroom-js-'), true, `${name} lacks the project token`);
    assert.equal(name.startsWith('@auspicion/js-'), false, `${name} is the superseded language-marker-only shape`);
    assert.equal(name.startsWith('@provident-storeroom/'), false, `${name} is at the retired scope`);
  }
  // AND THE ARITHMETIC IS PRINTED WITH ITS TERMS: `5` names = `3` with a toolchain suffix + `2`
  // without.
  assert.equal(FIVE_NAMES.filter((name) => /-(gnu|msvc)$/.test(name)).length, 3);
  assert.equal(FIVE_NAMES.filter((name) => !/-(gnu|msvc)$/.test(name)).length, 2);
});

test('package · `PUB-DD-9` (its 2026-10-15 coupling clause) and `PUB-DD-19` · every pin is EXACT: five pins, no range, no caret, no tilde and no wildcard, and both the pin and the platform `version` equal the main package\'s own `version`', () => {
  // DECLARED: "**EVERY PLATFORM `version` EQUALS ITS EXACT PIN IN THE MAIN PACKAGE, AND BOTH EQUAL
  // THE RELEASED VERSION — WHICH IS WHY THE BUMP MOVES SIX MANIFESTS TOGETHER.**" naming "the eleven
  // cells it lands in: five pin VALUES · one main `version` · five platform `version` fields"; and
  // "five EXACT pins, NO range, NO caret, NO tilde and NO wildcard, FIVE TIMES".
  const mainVersion = manifest.version;
  assert.equal(typeof mainVersion, 'string');
  assert.match(mainVersion, /^\d+\.\d+\.\d+$/, 'the main version is not an exact release version');

  for (const [name, pin] of Object.entries(manifest.optionalDependencies)) {
    // THE PIN IS THE EXACT STRING — anything a range operator would add is a finding.
    assert.equal(pin, mainVersion, `${name} is pinned ${pin}, the package is ${mainVersion}`);
    assert.equal(/[~^><=*xX|\s]/.test(pin), false, `${name}'s pin carries range syntax`);
  }

  // THE FIVE PLATFORM MANIFESTS' OWN `version` FIELDS — the second half of the eleven cells.
  const labels = ['linux-x64', 'linux-arm64', 'darwin-x64', 'darwin-arm64', 'win32-x64'];
  for (const label of labels) {
    const platformManifest = JSON.parse(
      readFileSync(join(PACKAGE_DIR, 'platforms', label, 'package.json'), 'utf8'),
    );
    assert.equal(platformManifest.version, mainVersion, `platforms/${label} carries ${platformManifest.version}`);
  }
  // `11 = 5 + 1 + 5` ✓
  assert.equal(5 + 1 + 5, 11);
});

test('package · `§1.2` (the covered key table) and `§2.2` item 5 (`PAR-PUB-21`) · each platform manifest agrees with its OWN name, its `os`/`cpu` pair and its own sibling `.node` — "the one member that could falsify … a manifest\'s `files` array that does not name the artefact\'s own sibling `.node`"', () => {
  // DECLARED: each artefact's manifest is read against its own name — "**an artefact whose
  // `os`/`cpu` pair disagrees with the pair its own `name` spells**" and "**a platform artefact whose
  // allowlist omits its `.node`**" are both named failure members of `P-PUB-7`; and the platform
  // artefact's declared shape is one `.node` under its own `main` field.
  const expected = [
    { label: 'linux-x64', name: FIVE_NAMES[0], os: 'linux', cpu: 'x64' },
    { label: 'linux-arm64', name: FIVE_NAMES[1], os: 'linux', cpu: 'arm64' },
    { label: 'darwin-x64', name: FIVE_NAMES[2], os: 'darwin', cpu: 'x64' },
    { label: 'darwin-arm64', name: FIVE_NAMES[3], os: 'darwin', cpu: 'arm64' },
    { label: 'win32-x64', name: FIVE_NAMES[4], os: 'win32', cpu: 'x64' },
  ];
  for (const { label, name, os, cpu } of expected) {
    const own = JSON.parse(readFileSync(join(PACKAGE_DIR, 'platforms', label, 'package.json'), 'utf8'));
    assert.equal(own.name, name, `platforms/${label}'s name is ${own.name}`);
    assert.deepEqual(own.cpu, [cpu], `platforms/${label}'s cpu does not spell ${cpu}`);
    assert.deepEqual(own.os, [os], `platforms/${label}'s os does not spell ${os}`);
    // THE ARTEFACT'S OWN SIBLING `.node`, NAMED ONCE AS `main` AND ONCE IN `files`.
    assert.equal(typeof own.main, 'string');
    assert.equal(own.main.endsWith('.node'), true, `platforms/${label}'s main is not a .node`);
    assert.equal(
      own.files.includes(own.main),
      true,
      `platforms/${label}'s files array does not name its own ${own.main}`,
    );
  }
});

// ---------------------------------------------------------------------------------------------
// §2 — THE SINGLE `exports` ARM
// ---------------------------------------------------------------------------------------------

test("package · `distribution.md §5` (`PUB-DD-3` · `PUB-DD-21` · `A127`) · the manifest carries ONE `exports` arm and ONE name: the arm key is `.`, its two conditions are `types` and `import`, and the top-level `types` field agrees at the same path", () => {
  // DECLARED: the entry's own named export set is "**ONE NAME, `storeCreate`, AND NOTHING ELSE**"
  // and `package.md §1.3` item 3's one-name rule reaches the module namespace; the types are "at
  // `bindings/js/index.d.ts`, ARE LISTED IN THE MAIN PACKAGE'S `files`, AND ARE REACHED THROUGH THE
  // MAIN PACKAGE'S `types` FIELD; no `typesVersions`, no separate `@types` package and no second
  // declaration file is shipped" (`PUB-DD-21`).
  assert.deepEqual(Object.keys(manifest.exports), ['.']);

  const arm = manifest.exports['.'];
  assert.deepEqual(Object.keys(arm).sort(), ['import', 'types']);
  assert.equal(arm.types, './index.d.ts');
  assert.equal(arm.import, './index.mjs');

  // THE TOP-LEVEL `types` FIELD AGREES, and it is the path the arm's own condition names.
  assert.equal(manifest.types, 'index.d.ts');
  assert.equal('./' + manifest.types, arm.types);

  // AND THE DECLARATION THE ARM REACHES IS THE AUTHORED ONE — tracked, hand-authored, and shipping.
  const declarations = join(PACKAGE_DIR, 'index.d.ts');
  assert.equal(existsSync(declarations), true, 'the types path does not exist');
  assert.equal(statSync(declarations).isFile(), true);
});

// ---------------------------------------------------------------------------------------------
// §3 — THE ALLOWLIST AND ITS REACHABILITY
// ---------------------------------------------------------------------------------------------

test('package · `§2.1` item 1 (as corrected 2026-10-25) and `A89`(4) item `2` · the allowlist is FIVE entries, every one of them exists in the tracked tree, and NEITHER added entry is a binary — `build/Release` is in `files` at no key', () => {
  // THE OPERATIVE FIGURE, with its superseded reading named: "**THE OPERATIVE ALLOWLIST IS FIVE
  // ENTRIES — `index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs`**",
  // the superseded one being "`index.mjs` · `README.md` · `index.d.ts` and NOTHING ELSE"; and the
  // refused set: "a shipped binary from the publisher's machine; `build/Release` in `files`".
  const files = manifest.files;
  assert.ok(Array.isArray(files));
  assert.deepEqual(
    [...files].sort(),
    ['README.md', 'index.d.ts', 'index.mjs', 'src/constraint-kernel.mjs', 'src/entry/'].sort(),
  );
  assert.equal(files.length, 5);

  // EVERY NAMED PATH EXISTS — a `files` entry naming an absent path packs GREEN and fails at the
  // consumer (`A89`(4) item `2`: "npm omits a missing `files` entry SILENTLY").
  for (const entry of files) {
    const onDisk = join(PACKAGE_DIR, entry.replace(/\/$/, ''));
    assert.equal(existsSync(onDisk), true, `\`${entry}\` is named in files and absent from the tree`);
  }
  // AND THE DIRECTORY ENTRY IS A DIRECTORY AND IS NOT EMPTY — a `files` entry naming an empty
  // directory packs nothing at all.
  assert.equal(statSync(join(PACKAGE_DIR, 'src', 'entry')).isDirectory(), true);
  assert.ok(readdirSync(join(PACKAGE_DIR, 'src', 'entry')).length > 0, 'the shipped module directory is empty');

  // NO BINARY AND NO STORE SOURCE: the refusal set `PUB-DD-1` reserves.
  assert.equal(files.includes('build/Release'), false);
  for (const entry of files) {
    assert.equal(entry.endsWith('.node'), false, `${entry} is a shipped binary`);
    assert.equal(entry.endsWith('.rs'), false, `${entry} is store source`);
    assert.equal(entry.startsWith('build'), false, `${entry} reaches the build output`);
  }
});

test('package · `§2.1` item 1 (its reachability ground) · REACHABILITY: every path the manifest itself reaches is IN the allowlist — the `exports` arm\'s `import` and the `types` field both name a shipped file, and the two internal modules the entry carries ship beside them', () => {
  // DECLARED: the item's own citation reads "**the one arms-bearing entry the allowlist must carry**",
  // and the corrected clause's ground: "**a `files` allowlist that omitted them would pack a tarball
  // whose `index.mjs` cannot resolve**". THE TEST IS DERIVED FROM THE MANIFEST'S OWN FIELDS AND FROM
  // THE TREE, never from a read of the entry's source: every path the package DECLARES it reaches is
  // covered by the allowlist that ships it.
  const shipped = new Set(manifest.files.map((entry) => entry.replace(/^\.\//, '')));

  const reaches = [manifest.exports['.'].import, manifest.exports['.'].types, manifest.types];
  for (const path of reaches) {
    const normalised = path.replace(/^\.\//, '');
    assert.equal(shipped.has(normalised), true, `${path} is reached by the manifest and not shipped`);
  }

  // THE ENTRY'S OWN INTERNAL MODULES, named as `files` entries: the directory and the module beside
  // it. The REACHABILITY property is that the allowlist covers the subtree the entry resolves
  // through — so the directory entry is present and non-empty, and the module is present.
  assert.equal(shipped.has('src/entry/'), true, 'the entry\'s own module directory is not shipped');
  assert.equal(shipped.has('src/constraint-kernel.mjs'), true, 'the kernel module is not shipped');
  const modules = readFileSync(join(PACKAGE_DIR, 'src', 'constraint-kernel.mjs'), 'utf8');
  assert.ok(modules.length > 0);

  // AND `build/Release` IS NOT SHIPPED, which is what makes rung two the checkout-only rung
  // (`§2.1` item 2): in a published install the module-relative path a `files`-restricted tarball
  // does not carry.
  assert.equal(
    manifest.files.some((entry) => entry.startsWith('build')),
    false,
    'the build output is shipped',
  );
  assert.equal(existsSync(join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node')), true, 'rung two\'s own artefact is absent from this checkout');
});

// ---------------------------------------------------------------------------------------------
// §4 — THE THREE RUNGS, IN ORDER, AND THE ONE DECLARED ABSENCE
// ---------------------------------------------------------------------------------------------

test('package · `§1.1` (the three rungs, in order) and `PUB-DD-20` · RUNG ONE IS A MISS HERE AND NOT A FAILURE, RUNG TWO CARRIES THIS CHECKOUT, and a `require` of the absent platform package answers `MODULE_NOT_FOUND` rather than a thrown package failure', () => {
  // DECLARED: "**RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** The entry `require`s
  // THE ONE NAME THE CLOSED KEY SET DECLARES … **RUNG TWO — THE MODULE-RELATIVE ADDON.** Failing rung
  // one, the entry `require`s the module-relative path `build/Release/storeroom_js_binding.node`
  // beside the entry module, constructed from the entry module's own location and from no other
  // source"; and "**RUNG ONE'S OWN FAILURE IS A MISS, NOT A DECLARED FAILURE** … **SO A `require` OF AN
  // ABSENT PLATFORM PACKAGE ANSWERS `MODULE_NOT_FOUND` AND THE LOADER MOVES TO RUNG TWO**".
  const key = `${process.platform}\u0000${process.arch}`;
  const rungOneName = COVERED_KEYS.get(key);

  if (rungOneName === undefined) {
    // UNCOVERED KEY: "**RUNG ONE IS NOT ATTEMPTED** (no name exists for the pair, by `C-1`)", so
    // there is no name to require and the rung-two assertion below is the whole of this cell.
    assert.equal(COVERED_KEYS.size, 5);
  } else {
    // A COVERED KEY IN THIS CHECKOUT: rung one is a MISS — the artefact is not installed here — and
    // the miss is `MODULE_NOT_FOUND`, "never a thrown package failure".
    let miss = null;
    try {
      require.resolve(rungOneName);
    } catch (thrown) {
      miss = thrown;
    }
    assert.ok(miss, `rung one resolved ${rungOneName}; this cell asserts the MISS arm of a checkout`);
    assert.equal(miss.code, 'MODULE_NOT_FOUND');
  }

  // RUNG TWO CARRIES THIS CHECKOUT: the path is the entry module's own directory joined with
  // `build`, `Release` and the crate's declared target name with the `.node` extension — and its
  // load is what `storeCreate` below proves. The path is CONSTRUCTED HERE the way the clause
  // constructs it, from the entry's own location and from no other source.
  const rungTwoPath = join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node');
  assert.equal(existsSync(rungTwoPath), true, 'rung two names an absent artefact');

  // AND THE LOAD PATH'S OUTCOME IS `SUCCESS` — not the absent form and not the failure arm.
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  assert.equal(Object.getOwnPropertyNames(instance).length, 14);
});

test("package · `§1.4` items 1, 2 and 6 (`PUB-DD-17`) · THE ONE DECLARED ABSENT-ADDON REFUSAL CARRIES THE STORE'S OWN `FilePathUnreachable` VERBATIM, with the generator's message rendered at its declared subject — the subject QUOTED and the two clauses separated by a comma", () => {
  // DECLARED: "**RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** Failing rung two, the entry answers the
  // DECLARED ABSENT-ADDON FORM — the store's own `FilePathUnreachable` member carried VERBATIM, with
  // the store's generator's string for that code at the SUBJECT OF THE TWO PATHS THAT WERE TRIED —
  // and NO instance is returned"; `PUB-DD-17`: "THE MISMATCH IS ANSWERED BY THE UNIT'S SINGLE DECLARED
  // FAILURE ARM, whose status is `FilePathUnreachable` … and NOT minted here"; and the rendering
  // clause: "**The declared rendering is `'<subject>' is not reachable at construction, the path must
  // exist or the application must be able to write it`** — the apostrophes around the subject are the
  // GENERATOR'S OWN … **a message without the apostrophes is a FINDING**".
  //
  // THE ARM IS DRIVEN AT THE ONE `FilePathUnreachable` THIS TREE CAN REACH WITHOUT MOVING THE
  // ADDON — the store's own construction-time reachability arm (`native contract.md §8.1` #13),
  // which is the SAME member the absent-addon form carries. THE ABSENT-ADDON STATE ITSELF (rung
  // three) is recorded as OWED below: reaching it requires the checkout's addon to be absent, which
  // this pass's write scope forbids it to arrange.
  const missingParent = join(here, 'no-such-directory-blind', 'store.json');
  let caught = null;
  try {
    storeCreate({ journalLength: 8, listeners: [], filePath: missingParent });
  } catch (thrown) {
    caught = thrown;
  }
  assert.ok(caught, 'a construction at an unreachable path returned an instance');
  assert.equal(caught.status, 'FilePathUnreachable');
  assert.equal(caught.message, `'${missingParent}' is not reachable at construction, the path must exist or the application must be able to write it`);
  assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status']);
  assert.deepEqual(caught.log, []);

  // AND THE TWO ARMS OF `§1.4` ITEM 6 ARE ONE STRING: the reproduction the entry makes where no
  // artefact loaded must equal the generator's own return where one did — which is why the equality
  // is asserted against the ARTEFACT's rendering above and not against the clause's prose spelling.
  //
  // OWED (recorded, not guessed): rung three's own reachability. "rung three is REACHED ONLY WHEN BOTH
  // rung one and rung two have been tried and neither yielded a loadable artefact" — and both
  // cannot be made to fail from inside this battery without moving `build/Release` out of the tree,
  // which is outside this pass's write scope. The state is therefore DECLARED here and not driven,
  // and no cell asserts a value only that state produces.
});

test('package · `§1.4` item 3 and `PUB-DD-18` · NO FALLBACK EXISTS and NO SIXTH OUTCOME: the load path is `success`, the declared absent form or the single failure arm — and the version read guards RUNG ONE ALONE, so a rung-two load performs no version comparison', () => {
  // DECLARED: "**The package NEVER falls back to a JavaScript store, NEVER absorbs a state silently,
  // NEVER degrades to a partial instance or a no-op verb** … **AND NO SIXTH OUTCOME EXISTS: the load
  // path is `success`, `the declared absent form`, or `the single failure arm` — three outcomes and no
  // fourth.**" And `PUB-DD-18`: "**THE VERSION READ GUARDS RUNG ONE ALONE. A rung-two load — the
  // module-relative `build/Release/storeroom_js_binding.node` — performs NO version comparison**,
  // because that artefact is the CHECKOUT'S OWN".
  //
  // THE OBSERVABLE OF THE RUNG-TWO HALF IS NEGATIVE AND DECIDABLE: this checkout resolves at rung two
  // and constructs, whatever the crate's own version string is — so no version comparison refused it.
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  assert.equal(typeof instance.write, 'function');

  // AND THE VERSION READ'S SUBJECT IS NOT A MODULE EXPORT — the namespace carries ONE name
  // (`A127`: "the module-level count is `11 -> 1`"), so the version the read compares is the
  // ARTEFACT'S OWN `addon.version` and there is no second module name through which a consumer could
  // reach it (`PUB-DD-19`: "THE VERSION READ COMPARES FOR EXACT STRING INEQUALITY").
  assert.deepEqual(Object.keys(entry), ['storeCreate']);
  assert.equal(Object.prototype.hasOwnProperty.call(entry, 'version'), false, 'the namespace carries a second name');

  // AND THE INSTANCE IS TOTAL AT EVERY DECLARED MEMBER — never a partial instance or a no-op verb.
  for (const member of [
    'read',
    'readLiteral',
    'write',
    'delete',
    'rollback',
    'listen',
    'unlisten',
    'addConstraint',
    'constraintOn',
    'constraintOff',
    'register',
    'constraints',
    'removeListener',
    'removeConstraint',
  ]) {
    assert.equal(typeof instance[member], 'function', `${member} is not a function on the product`);
  }
});
