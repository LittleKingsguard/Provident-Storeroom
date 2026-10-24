// `bindings/js/test/publish-generators.test.mjs` — **THE NEGATIVE GENERATORS `NG-PUB-A` … `NG-PUB-J` OF
// `U-STOREROOM-PUBLISH` (`D-GP-SRPUB`), AUTHORED BY THE RED-SET REPAIR PASS (`PUB-RED-2`) FROM
// `archive/gate4/storeroom-publish-adversarial.md` `§D`'s TASK TABLE AND ITS `§E` TRIAGE.**
//
// AUTHORITY: `docs/specs/storeroom-publish/contract.md` (its `§1.1`–`§1.5`, `§2`–`§6` and its `§5.1`–`§5.8`
// register) and its parts — `resolution.md` · `distribution.md` · `release.md` · `acceptance.md` ·
// `parameter-semantics.md` — read with the adversarial pass's `§D`, which tasks each generator by id, by
// the row it serves and by **what failing looks like**.
//
// ---------------------------------------------------------------------------------------------
// WHAT MAKES THIS FILE DIFFERENT FROM THE RED SET BESIDE IT
// ---------------------------------------------------------------------------------------------
// **EVERY CELL HERE CARRIES A CONTROL.** A generator that cannot fail is worse than none
// (`archive/gate4/storeroom-publish-adversarial.md` `§E`; `PUB-R-5`), so each generator is a PAIR:
//
//   (1) **THE DRIVE** — the property is measured against the SHIPPED bytes at its real home
//       (`bindings/js/index.mjs`, `bindings/js/package.json`, `bindings/js/platforms/<label>/…`) and the
//       drive ASSERTS the contract's declared answer for the state it reaches.
//   (2) **THE MEASURED CONTROLS** — one or more **scratch copies of the entry, STAGED OUTSIDE THE
//       REPOSITORY** (`CONTROL_ROOT`, a temporary area), each carrying ONE mutation that disables the
//       property under test. **THE GENERATOR IS RUN AGAINST EACH CONTROL AND THE CONTROL IS REQUIRED TO
//       FAIL IT.** A control that PASSES the generator is a cell that cannot fail, and this file FAILS on
//       it — which is what makes every generator's teeth measured rather than asserted.
//
// **NOTHING UNDER THE REPOSITORY IS WRITTEN BY THIS FILE.** Every scratch tree — the drives' and the
// controls' alike — lives under the operating system's temporary area and is swept on exit, exactly as
// the red set's own harness declares. **NO CONTROL MUTATION IS EVER A PROPOSED IMPLEMENTATION CHANGE**: a
// control is an INSTRUMENT, it lives nowhere the release reads, and it is destroyed with its scratch root.
//
// **AND ONE CONSEQUENCE OF THE CONTROL MECHANISM, STATED SO IT IS NOT READ AS A LOOPHOLE: the controls
// are MUTATIONS OF THE ENTRY'S OWN BYTES, applied to a scratch copy.** `NG-PUB-H`'s and `NG-PUB-J`'s
// controls are not entry mutations at all — theirs are a scratch PLATFORM MANIFEST and a scratch GIT
// REPOSITORY — and each generator's own section says which home its control lives in.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, cpSync, rmSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';
import { tmpdir } from 'node:os';

// ---------------------------------------------------------------------------------------------
// the contract's own constants, at the contract's own bytes (the red set's, read again here)
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = dirname(dirname(PKG_DIR));
const ENTRY = join(PKG_DIR, 'index.mjs');
const MAIN_MANIFEST = join(PKG_DIR, 'package.json');
const PLATFORMS = join(PKG_DIR, 'platforms');

// **`A86` — THE FIVE PLATFORM PACKAGES MOVE TO THE ORG `@auspicion`, and the MAIN package's identity is
// UNTOUCHED at the unscoped `provident-storeroom`** (`docs/specs/storeroom-publish-proposal.md` `§12`;
// `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`; `docs/specs/storeroom-publish/resolution.md
// §3.1`; `docs/specs/storeroom-js/package.md §3.2`). The five names below are the operative five, taken at
// the contract cells' own bytes.
// **⟶ SUPERSEDED BY `A88` — THE ARCHITECT'S PROJECT-TOKEN RULING OF 2026-10-11 — WHOSE OPERATIVE READING IS
// `A88`(a), THE ADDITIVE ONE** (`docs/specs/storeroom-publish-proposal.md` `§14`, where the ruling is
// transcribed verbatim): **`@auspicion` is a MULTI-PROJECT org, so the PROJECT TOKEN IS INSERTED BEFORE THE
// LANGUAGE MARKER and the five become `@auspicion/provident-storeroom-js-<label>` — every token that was
// there is still there, the project is named, and the language marker survives for a reader who meets the
// name without the main package beside it.** **THE MAIN PACKAGE'S IDENTITY IS UNMOVED: `provident-storeroom`,
// unscoped (`A82`).**
const FIVE_NAMES = [
  '@auspicion/provident-storeroom-js-linux-x64-gnu',
  '@auspicion/provident-storeroom-js-linux-arm64-gnu',
  '@auspicion/provident-storeroom-js-darwin-x64',
  '@auspicion/provident-storeroom-js-darwin-arm64',
  '@auspicion/provident-storeroom-js-win32-x64-msvc',
];
const COVERED = [
  { platform: 'linux', arch: 'x64', label: 'linux-x64', name: FIVE_NAMES[0] },
  { platform: 'linux', arch: 'arm64', label: 'linux-arm64', name: FIVE_NAMES[1] },
  { platform: 'darwin', arch: 'x64', label: 'darwin-x64', name: FIVE_NAMES[2] },
  { platform: 'darwin', arch: 'arm64', label: 'darwin-arm64', name: FIVE_NAMES[3] },
  { platform: 'win32', arch: 'x64', label: 'win32-x64', name: FIVE_NAMES[4] },
];
// `resolution.md §4.1` — the LABEL→`os`/`cpu` pair each artefact's own `name` SPELLS, which is the pair
// `PAR-PUB-19`/`PAR-PUB-20` require the manifest's fields to carry (`PUB-R-10`).
const LABEL_TO_PAIR = new Map(COVERED.map((k) => [k.label, { os: k.platform, cpu: k.arch }]));
const RUNG_TWO_TAIL = ['build', 'Release', 'storeroom_js_binding.node'].join(sep);
const CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
];
const ARM_STATUS = 'FilePathUnreachable';
const GEN_TAIL = 'is not reachable at construction, the path must exist or the application must be able to write it';
/** The store's own generator's rendering of `FilePathUnreachable` at a subject (`§1.4` item 1). */
const gen = (subject) => `'${subject}' ${GEN_TAIL}`;
const RUNG_ONE_TAIL = FIVE_NAMES[0];

/** `§1.4` item 1 read with `surface.md §2.5` items 4 and 9 — the arm's form, exactly, as the observer reports it. */
function assertArmHere(report) {
  const A = report.arm;
  assert.ok(A && A.notTheArm !== true,
    `no declared arm was thrown; the report was ${JSON.stringify(report).slice(0, 500)}`);
  // **⟶ RE-DERIVED TO THE THREE-MEMBER FORM: the member-count limb moves from two to three.** The count was
  // `§1.4` item 1's *"no third member"*, the two-member `Refusal` struct and `DD-12` — **SUPERSEDED BY THE
  // ARCHITECT: `surface.md` `§2.5` ITEM 4 (*"\`log\` IS PRESENT ON EVERY FAILURE THIS SURFACE THROWS … FLAT
  // ACROSS ARMS and not conditional"\*) read with ITEM 9 (*"\`Object.keys(caught)\` reads exactly
  // \`[\"log\",\"message\",\"status\"]\` and \`Object.keys(caught).length\` is \`3\` on EVERY arm"\*).** **THE THREE
  // LIMBS BELOW IT ARE UNMOVED**: the store-member status (\`PUB-DD-17\`), its CLOSED-set membership (\`§0.1\`
  // item 7) and the \`string\` message.
  assert.deepEqual(Object.keys(A).sort(), ['log', 'message', 'status'],
    '`surface.md §2.5` items 4 and 9: the member set is EXACTLY `{log, message, status}` — FLAT across arms '
    + 'and not conditional; no minted code and no member outside the declared set');
  assert.equal(Object.keys(A).length, 3,
    '`surface.md §2.5` item 9: `Object.keys(caught).length` is `3` on every arm');
  assert.equal(Array.isArray(A.log), true,
    '`surface.md §2.5` item 9: `log` is an ARRAY — never absent, never `null`, never a non-array');
  assert.equal(A.log.length, 0,
    '`surface.md §2.5` item 4: `[]` is the declared value where the cause has NO ATTEMPT AT ALL');
  assert.equal(A.status, ARM_STATUS, '`PUB-DD-17`: the status is the store\'s own member, carried verbatim');
  assert.ok(CLOSED_SET.includes(A.status), '`§0.1` item 7: no status outside the store\'s closed set');
  assert.equal(typeof A.message, 'string', 'the message is a JS string');
  return A;
}

// ---------------------------------------------------------------------------------------------
// THE GENERATOR REGISTRY — one entry per `§D` row, printing its id, the row it serves, its STRATEGY and
// its verdict. `un-run` is a FAILURE, exactly as the red set's own registry reads it (`contract.md §5.0`).
// ---------------------------------------------------------------------------------------------
const GENERATORS = {
  'NG-PUB-A': { serves: 'P-PUB-1', strategy: 'S-RESOLVE', ran: 0, failed: 0, controls: [] },
  'NG-PUB-B': { serves: 'P-PUB-2', strategy: 'S-KEYSET', ran: 0, failed: 0, controls: [] },
  'NG-PUB-C': { serves: 'P-PUB-4', strategy: 'S-VERSION', ran: 0, failed: 0, controls: [] },
  'NG-PUB-D': { serves: 'P-PUB-4', strategy: 'S-ONEARM', ran: 0, failed: 0, controls: [] },
  'NG-PUB-E': { serves: 'P-PUB-3', strategy: 'S-MUSL', ran: 0, failed: 0, controls: [] },
  'NG-PUB-F': { serves: 'P-PUB-5', strategy: 'S-TAXONOMY', ran: 0, failed: 0, controls: [] },
  'NG-PUB-G': { serves: 'P-PUB-5', strategy: 'S-TAXONOMY', ran: 0, failed: 0, controls: [] },
  'NG-PUB-H': { serves: 'P-PUB-6', strategy: 'S-SCOPE · S-MANIFEST', ran: 0, failed: 0, controls: [] },
  'NG-PUB-I': { serves: 'P-PUB-7', strategy: 'S-TYPES · S-LICENCE', ran: 0, failed: 0, controls: [] },
  'NG-PUB-J': { serves: 'P-PUB-8', strategy: 'S-TAG · S-LAYER', ran: 0, failed: 0, controls: [] },
};
const VERDICTS = new Map();

/**
 * One generator, run under its own id, with its control ledger. **THE GENERATOR'S `fn` RECEIVES A
 * `recordControl(name, verdict)` CALLBACK AND MUST CALL IT FOR EVERY CONTROL IT MEASURED**, so a
 * generator whose controls were never run cannot read as green: the ledger is asserted non-empty below
 * and each control's verdict is printed in the after-hook.
 */
function generator(id, name, fn) {
  const key = `${id}::${name}`;
  VERDICTS.set(key, 'un-run');
  test(`${id}::${name}`, async () => {
    const ledger = [];
    const recordControl = (control, verdict) => ledger.push(`${control}=${verdict}`);
    try {
      await fn(recordControl);
      assert.ok(ledger.length > 0,
        `${id} measured NO control: a generator with no control cannot be told from a cell that cannot fail (PUB-R-5)`);
      GENERATORS[id].controls.push(...ledger);
      GENERATORS[id].ran += 1;
      VERDICTS.set(key, `PASS [${ledger.join(' · ')}]`);
    } catch (err) {
      GENERATORS[id].ran += 1;
      GENERATORS[id].failed += 1;
      VERDICTS.set(key, 'FAIL');
      throw err;
    }
  });
}

test.after(() => {
  const rows = [];
  for (const [row, b] of Object.entries(GENERATORS)) {
    for (const [key, verdict] of VERDICTS) {
      if (!key.startsWith(`${row}::`)) continue;
      rows.push(`  ${key.padEnd(64)} ${verdict}`);
    }
    const verdict = b.ran === 0 ? 'UN-RUN (a FAILURE, `contract.md §5.0`)'
      : b.failed === 0 ? `PASS (${b.ran} generator) · controls measured: ${b.controls.length}` : `FAIL (${b.failed} of ${b.ran})`;
    console.log(`\n[${row}] serves ${b.serves} · strategies: ${b.strategy}\n[${row}] VERDICT: ${verdict}`);
  }
  console.log(`\n--- per-generator verdicts ---\n${rows.join('\n')}\n`);
});

// ---------------------------------------------------------------------------------------------
// THE SCRATCH TREES: the drives' (under the OS temporary area) and the CONTROLS' (beside them)
// ---------------------------------------------------------------------------------------------
const SCRATCH_ROOT = mkdtempSync(join(tmpdir(), 'storeroom-pubgen-'));
const CONTROL_ROOT = mkdtempSync(join(tmpdir(), 'storeroom-pubgen-controls-'));
process.on('exit', () => {
  for (const root of [SCRATCH_ROOT, CONTROL_ROOT]) {
    try { rmSync(root, { recursive: true, force: true }); } catch { /* the sweep is best-effort */ }
  }
});

const DRIVER = `
import { createRequire } from 'node:module';
const MARK = '__PUBGEN__';
const STUB = process.env.PUBGEN_STUB;
const req = createRequire(import.meta.url);
const say = (o) => { process.stdout.write(MARK + JSON.stringify(o) + '\\n'); };
const CLOSED_SET = ${JSON.stringify(CLOSED_SET)};
// **⟶ RE-DERIVED TO THE DECLARED THREE-MEMBER FORM: THE MEMBER-COUNT LIMB MOVES FROM TWO TO THREE, AND
// EVERY OTHER LIMB THIS OBSERVER ASSERTS IS KEPT WORD FOR WORD.** The count came from \`§1.4\` item 1 and the
// two-member \`Refusal\` struct (\`DD-12\`'s *"EXACTLY two members, no third"*) — **BOTH SUPERSEDED BY THE
// ARCHITECT, whose active clause is \`surface.md\` \`§2.5\` ITEM 4 (*"\`log\` IS PRESENT ON EVERY FAILURE THIS
// SURFACE THROWS … The three-member member set is therefore FLAT ACROSS ARMS and not conditional"*) read with
// ITEM 9 (*"\`Object.keys(caught)\` reads exactly \`[\"log\",\"message\",\"status\"]\` and
// \`Object.keys(caught).length\` is \`3\` on EVERY arm of this surface"*).** **UNMOVED**: the plain-object test
// (\`!(err instanceof Error)\`), the CLOSED-set membership of \`status\` (\`§0.1\` item 7; \`PUB-DD-17\`), and the
// two store members recorded onto \`report.arm\` for the generators to read.
function recordArm(err) {
  if (err !== null && typeof err === 'object') {
    const own = Object.keys(err);
    if (own.length === 3 && own.includes('log') && own.includes('status') && own.includes('message')
        && !(err instanceof Error) && CLOSED_SET.includes(err.status)
        && Array.isArray(err.log) && err.log.length === 0) {
      report.arm = { status: err.status, message: err.message, log: err.log };
    } else {
      report.arm = { notTheArm: true, name: err.constructor ? err.constructor.name : 'unknown', code: err.code ?? null, message: String(err.message ?? err).slice(0, 200) };
    }
  } else {
    report.arm = { notTheArm: true, thrownClass: typeof err, message: String(err).slice(0, 200) };
  }
}
const report = {
  platform: process.platform, arch: process.arch,
  attempts: globalThis.__PUBGEN_ATTEMPTS__,
  ok: null, error: null, arm: null, stub: null,
};
try {
  const mod = await import(process.argv[2]);
  let instance = null;
  if (typeof mod.storeCreate === 'function') {
    try { instance = mod.storeCreate({ journalLength: 4, listeners: [] }); } catch (e) { recordArm(e); }
  }
  report.ok = true;
  report.returned = instance !== null;
  report.verbs = Object.keys(mod).sort();
} catch (err) {
  report.ok = false;
  recordArm(err);
}
if (STUB) {
  const FIVE = ${JSON.stringify(FIVE_NAMES)};
  const reachedRungOne = report.attempts.some((a) => FIVE.includes(String(a)));
  if (reachedRungOne) {
    try { report.stub = req(STUB).report; } catch (e) { report.stub = { reportError: String(e) }; }
  } else {
    report.stub = null;
  }
}
say(report);
`;

const preloadFor = (override) => override ?? `
'use strict';
const Module = require('node:module');
const attempts = [];
globalThis.__PUBGEN_ATTEMPTS__ = attempts;
const orig = Module._load;
Module._load = function (request, parent, isMain) {
  attempts.push(String(request));
  return orig.apply(this, arguments);
};
const plat = process.env.PUBGEN_PLATFORM;
const arch = process.env.PUBGEN_ARCH;
if (plat) Object.defineProperty(process, 'platform', { value: plat, configurable: true });
if (arch) Object.defineProperty(process, 'arch', { value: arch, configurable: true });
`;

/**
 * ONE FAKE PLATFORM ARTEFACT, faithful to the artefact's declared export shape. **THE OPTIONS ARE THE
 * GENERATORS' LEVERS AND NOTHING ELSE**: `variant` fixes the `version` the artefact answers;
 * `errorMessage` chooses whether the artefact carries the store's generator, carries a MUTATED one, or
 * carries none; `storeCreate` chooses whether the artefact constructs; `throwRungOne` makes the rung-one
 * `require` throw a value the generator names (never an `Error` unless asked for).
 */
function artefactSource(opts = {}) {
  const {
    variant = 'right', versionLiteral = null, errorMessage = 'faithful', storeCreate = 'constructs',
    throwRungOne = null, versionThrows = false,
  } = opts;
  const VALUE = {
    right: versionLiteral === null ? "'0.1.0'" : JSON.stringify(versionLiteral),
    wrong: "'9.9.9'",
    empty: "''",
    notstring: '0.1',
    notcallable: '42',
  };
  const callable = variant !== 'notcallable';
  if (throwRungOne !== null) {
    return `'use strict';
// THE FAKE CANDIDATE WHOSE RUNG-ONE \`require\` THROWS A VALUE THE GENERATOR NAMES (\`NG-PUB-E\`).
// \`{ kind: 'object' }\` throws a plain object, \`{ kind: 'string' }\` a primitive string, and
// \`{ kind: 'undefined' }\` the value \`undefined\` itself.
const thrown = ${JSON.stringify(throwRungOne.value)};
module.exports = undefined;
throw (${throwRungOne.kind === 'undefined' ? 'undefined' : 'thrown'});
`;
  }
  const versionBody = versionThrows
    ? `function () { calls.version += 1; throw new Error('the artefact\\'s own version read fails'); }`
    : (callable ? `function () { calls.version += 1; return versionValue(); }` : 'versionValue()');
  const errorMessageBody = errorMessage === 'absent'
    ? '/* THIS ARTEFACT CARRIES NO GENERATOR AT ALL (`NG-PUB-F`) */'
    : (errorMessage === 'mutated'
      ? `errorMessage(code, subject) { calls.errorMessage += 1; return "'" + subject + "' " + GEN_TAIL + ' [MUTATED BY THE LOADED ARTEFACT]'; },`
      : `errorMessage(code, subject) { calls.errorMessage += 1; return "'" + subject + "' " + GEN_TAIL; },`);
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): 'settle(record)' IS REPLACED BY 'constraints()' IN THIS
  // GENERATED STUB** (`surface.md §2.4` item 9 (f)'s clause of that date: the twelve members are the ten
  // methods plus the TWO SINGLES `register` and `constraints`, `13 → 12`). The generator's own subject — a
  // candidate answering an instance of the DECLARED member shape — is unmoved, and the generated stub now
  // matches the declaration it stands in for.
  const storeCreateBody = storeCreate === 'constructs'
    ? `storeCreate(encodedCfg) {
    calls.storeCreate += 1;
    const instance = {
      listen(address) { return minted; },
      register(handle, listener) { return registerOn(instance, listener, handle); },
      unlisten(handle) { return undefined; },
      constraints() { return []; },
    };
    return instance;
  },`
    : `storeCreate() { calls.storeCreate += 1; throw { status: 'FilePathUnreachable', message: 'the fake does not construct' }; },`;
  return `'use strict';
// THE FAKE CANDIDATE. Variant: ${variant}. errorMessage: ${errorMessage}. storeCreate: ${storeCreate}.
const calls = { version: 0, storeCreate: 0, errorMessage: 0 };
const minted = { opaque: 'the fake candidate handle' };
const GEN_TAIL = ${JSON.stringify(GEN_TAIL)};
const report = { variant: ${JSON.stringify(variant)}, calls, loadError: null };
function versionValue() { return ${VALUE[variant]}; }
const versionMember = ${versionBody};
const api = {
  loads: 0,
  version: versionMember,
  ${errorMessageBody}
  ${storeCreateBody}
  call() { throw { status: 'AddressMalformed', message: 'the fake candidate does not call a store' }; },
  register() { throw { status: 'AddressMalformed', message: 'the fake candidate does not register' }; },
  report,
};
function registerOn(instance, listener, handle) {
  if (typeof listener !== 'function') {
    throw { status: 'AddressMalformed', message: "'" + String(listener) + "' is not a listener" };
  }
  return handle === undefined ? {} : handle;
}
module.exports = api;
`;
}

function writeArtefact(dir, opts = {}) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.js'), artefactSource(opts));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'stub', version: '0.1.0', main: 'index.js' }, null, 2));
  return join(dir, 'index.js');
}

/** **THE CONTROL LEVER'S OWN CONTRACT (`F-14`)**: a control record is the STAGED CONTROL'S PATH beside the
 *  BYTES that were staged there, and nothing else is ever read as one. */
function isControlLever(entrySource) {
  return entrySource !== null && typeof entrySource === 'object'
    && typeof entrySource.controlPath === 'string' && typeof entrySource.controlSource === 'string';
}

/**
 * **THE LEVER'S READER — THE `F-14` REPAIR.** `null` is the SHIPPED entry's bytes (what a drive measures);
 * a CONTROL RECORD is read at the staged file's own bytes, and the file is asserted to BE those bytes, so a
 * control can never be measured against a copy, a path or a stale image of itself; a bare string is a drive's
 * own source text. **THE READ IS ASSERTED AND NOT ASSUMED**: before the repair the path string was written
 * into the scratch entry as if it were source, and the failure that produced was attributed to the control's
 * mutation for a whole pass.
 */
function entryText(entrySource) {
  if (entrySource === null || entrySource === undefined) return readFileSync(ENTRY);
  if (isControlLever(entrySource)) {
    assert.equal(readFileSync(entrySource.controlPath, 'utf8'), entrySource.controlSource,
      'F-14: the control\'s staged entry IS the bytes the lever hands on, so no control is measured against a '
      + `copy of itself (\`${entrySource.controlPath}\`)`);
    return entrySource.controlSource;
  }
  assert.equal(typeof entrySource, 'string',
    'F-14: the lever carries the shipped bytes (`null`), a control record, or a source string — and nothing else');
  return entrySource;
}

/** **THE STAGED TREES OF THE CONTROLS** (`F-14`), so a drive can be attributed to the control that staged it. */
const CONTROL_DIRS = new Set();
/** **EVERY DRIVE THAT RAN AGAINST A CONTROL'S OWN TREE**, with the report it produced — the evidence the
 *  audit in `withControls` reads: the control's bytes REACHED a drive and the entry WALKED there. */
const CONTROL_STAGE_LEDGER = [];
function noteControlDrive(env, report) {
  if (CONTROL_DIRS.has(env.dir)) CONTROL_STAGE_LEDGER.push({ dir: env.dir, report });
}

/**
 * ASSEMBLE ONE SCRATCH TREE for a drive. **`entrySource` IS THE CONTROL LEVER**: where it is `null` the
 * SHIPPED entry is copied byte-for-byte; where it is a string, that is the CONTROL's mutated entry.
 *
 * **⟶ REPAIRED (`F-14`, `§13`): THE LEVER NOW ANSWERS ITS OWN SUBJECT, AND THE TWO SHAPES IT CARRIES ARE
 * TOLD APART BY CONSTRUCTION AND NOT BY A GUESS.** The as-filed lever was written for ONE shape (a drive's
 * own source TEXT) while `controlEntry` handed it the OTHER (the STAGED CONTROL FILE'S PATH), and the two
 * were never reconciled: **THE TEXT MATCHED, RE-EMITTED VERBATIM** —
 * `writeFileSync(join(dir, 'index.mjs'), entrySource ?? readFileSync(ENTRY));` — **WROTE THE PATH STRING
 * ITSELF into the scratch entry, so the drive imported a module whose whole content was a
 * path, the import died at the parse, the report came back with an EMPTY attempt set, and the control failed
 * at its own probe's FIRST "the state was reached" assertion rather than at the clause it had mutated. **THE
 * READER `entryText` BELOW IS THE REPAIR: a `null` lever is the shipped bytes, a CONTROL RECORD is read at
 * its own bytes, and a bare string is a drive's source text — so `entrySource` can no longer be misread, and
 * `withControls` additionally requires every entry control's bytes to have REACHED a drive AND WALKED.**
 */
function makeScratch({
  label, rungOne = null, rungTwo = 'absent', entrySource = null, manifestVersion = '0.1.0',
  preloadBody = null, driverTail = '',
}) {
  const dir = mkdtempSync(join(SCRATCH_ROOT, `${label.replace(/[^a-zA-Z0-9-]/g, '_')}-`));
  writeFileSync(join(dir, 'index.mjs'), entryText(entrySource));
  // **THE STAGED TREE OF A CONTROL IS RECORDED WHERE THE AUDIT CAN SEE IT** (`F-14`): only a tree built from
  // a control record is a control's tree, so a drive that ran elsewhere can never be counted as evidence.
  if (isControlLever(entrySource)) CONTROL_DIRS.add(dir);
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'provident-storeroom', version: manifestVersion, type: 'module',
    exports: { '.': { import: './index.mjs' } },
  }, null, 2));
  writeFileSync(join(dir, 'preload.cjs'), preloadFor(preloadBody));
  writeFileSync(join(dir, 'driver.mjs'), DRIVER + driverTail);
  let stubFile = null;
  let stubOpts = null;
  if (rungOne) {
    stubOpts = rungOne.opts ?? {};
    stubFile = writeArtefact(join(dir, 'node_modules', ...rungOne.name.split('/')), stubOpts);
  }
  if (rungTwo === 'valid') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x00, 0x01]));
  } else if (rungTwo === 'broken') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), 'not a node addon at all\n');
  } else if (rungTwo === 'real') {
    const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
    assert.ok(existsSync(realAddon), 'the drive\'s precondition: the repository\'s own built artefact exists');
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  }
  return { dir, stubFile, stubOpts, entry: join(dir, 'index.mjs'), preload: join(dir, 'preload.cjs'), driver: join(dir, 'driver.mjs') };
}

/** Run one drive; the subprocess is the observer and nothing of the repository is touched. */
function drive(env, { platform, arch, cwd = env.dir, extraEnv = {} } = {}) {
  const out = execFileSync(process.execPath, ['--require', env.preload, env.driver, env.entry], {
    cwd, encoding: 'utf8', timeout: 60000,
    env: {
      ...process.env,
      NODE_PATH: join(env.dir, 'node_modules'),
      PUBGEN_STUB: env.stubFile ?? '',
      PUBGEN_PLATFORM: platform, PUBGEN_ARCH: arch,
      ...extraEnv,
    },
  });
  const line = out.split('\n').find((l) => l.startsWith('__PUBGEN__'));
  assert.ok(line, `the drive produced no report (stdout was: ${out.slice(0, 400)})`);
  const report = JSON.parse(line.slice('__PUBGEN__'.length));
  report.requests = report.attempts.map((a) => String(a).split('\\').join('/'));
  noteControlDrive(env, report);
  return report;
}

/**
 * **RUN ONE DRIVE THAT IS ALLOWED TO DIE.** The generators that fix a hostile `process.platform`
 * (`NG-PUB-B`) or that force a `cfg.filePath` (`NG-PUB-G`) must observe a process that CAN die from the
 * lever itself — a `TypeError` out of a template interpolation terminates the process before any report
 * is printed, and a harness that used `execFileSync` alone would report that as a harness crash rather
 * than as the state under test. **THIS IS NOT A WEAKER DRIVE: it returns the SAME parsed report where one
 * exists and the exit code, the signal and the thrown-value class where one does not**, so the generator
 * can assert on the state it caused rather than on the harness's own tolerance.
 */
function driveRaw(env, { platform, arch, cwd = env.dir, extraEnv = {} } = {}) {
  const file = process.execPath;
  const args = ['--require', env.preload, env.driver, env.entry];
  const options = {
    cwd, encoding: 'utf8', timeout: 60000,
    env: {
      ...process.env,
      NODE_PATH: join(env.dir, 'node_modules'),
      PUBGEN_STUB: env.stubFile ?? '',
      PUBGEN_PLATFORM: platform, PUBGEN_ARCH: arch,
      ...extraEnv,
    },
  };
  try {
    const out = execFileSync(file, args, options);
    const line = out.split('\n').find((l) => l.startsWith('__PUBGEN__'));
    if (!line) { noteControlDrive(env, null); return { exited: true, code: 0, report: null, stdout: out, stderr: '' }; }
    const report = JSON.parse(line.slice('__PUBGEN__'.length));
    report.requests = report.attempts.map((a) => String(a).split('\\').join('/'));
    noteControlDrive(env, report);
    return { exited: true, code: 0, report, stdout: out, stderr: '' };
  } catch (err) {
    const stdout = String(err.stdout ?? '');
    const line = stdout.split('\n').find((l) => l.startsWith('__PUBGEN__'));
    let report = null;
    if (line) {
      report = JSON.parse(line.slice('__PUBGEN__'.length));
      report.requests = report.attempts.map((a) => String(a).split('\\').join('/'));
    }
    noteControlDrive(env, report);
    return {
      exited: false, code: err.status ?? null, signal: err.signal ?? null, report,
      stdout, stderr: String(err.stderr ?? ''),
      thrownClass: (String(err.stderr ?? '').match(/TypeError|ReferenceError|SyntaxError|Symbol/g) ?? [])[0] ?? null,
    };
  }
}

function coveredEnv(key, opts = {}) {
  const { variant = 'right', rungTwo = 'broken', ...artefact } = opts;
  return makeScratch({
    label: `cov-${key.label}-${variant}`,
    rungOne: { name: key.name, opts: { variant, ...artefact } },
    rungTwo,
  });
}

const isRungTwo = (r) => String(r).includes('storeroom_js_binding.node');

/**
 * **A CONTROL: THE SHIPPED ENTRY'S OWN BYTES, MUTATED AT ONE SITE, STAGED OUTSIDE THE REPOSITORY.**
 * `mutate` is a function from the entry's text to the mutated text and it MUST change the text — a
 * control that mutates nothing is a second copy of the shipped bytes and would "pass" the generator for
 * the wrong reason, so the no-op is refused here rather than measured later.
 *
 * **⟶ REPAIRED (`F-14`, `§13`): THE CONTROL NOW HANDS ON BOTH HALVES OF ITSELF — THE STAGED PATH **AND**
 * THE BYTES STAGED THERE.** The as-filed form returned the PATH ALONE while `makeScratch` wrote whatever it
 * was handed as the scratch entry's CONTENT, so the scratch entry was a FILE CONTAINING A PATH STRING: the
 * drive's `import` died at the parse, the report carried `attempts: []`, and the control was scored as
 * failing at its own probe's "the state was reached" guard — a verdict attributable to the LEVER and not to
 * the mutation. **NOTHING IS WEAKENED**: the control is still the shipped entry's bytes mutated at one site,
 * the mutation is still required to have changed a byte, the tree is still staged OUTSIDE the repository,
 * and the audit in `withControls` now REQUIRES the staged bytes to have reached a drive and walked there.
 */
function controlEntry(id, mutate) {
  const shipped = readFileSync(ENTRY, 'utf8');
  const mutated = mutate(shipped);
  assert.notEqual(mutated, shipped,
    `${id}: the control's mutation changed no byte of the entry — a control that mutates nothing is not a control`);
  const dir = mkdtempSync(join(CONTROL_ROOT, `${id}-`));
  const file = join(dir, 'index.mjs');
  writeFileSync(file, mutated);
  return { controlPath: file, controlSource: mutated };
}

/**
 * **RUN A GENERATOR'S OWN PROPERTY AGAINST ONE ENTRY SOURCE AND REPORT `PASS` OR `FAIL`.** The generator's
 * drive body is passed in as `probe`, so the SAME property is measured against the shipped bytes and
 * against each control — which is the whole point of the control: a property that answers `PASS` for a
 * control that disabled it was never measuring that property.
 */
function measureAgainst(id, entrySource, probe) {
  try {
    probe(entrySource);
    return { verdict: 'PASS', why: null };
  } catch (err) {
    return { verdict: 'FAIL', why: String(err && err.message ? err.message : err).split('\n')[0].slice(0, 240) };
  }
}

/**
 * THE ONE HELPER EVERY GENERATOR USES, AND THE ORDER OF ITS TWO HALVES IS THE WHOLE DISCIPLINE:
 * **(1) THE DRIVE FIRST** — the property is asserted against the SHIPPED bytes and a failure there is a
 * FINDING rather than a control result; **(2) THE CONTROLS SECOND** — each is required to FAIL the same
 * property, and a control that passes it FAILS this generator by name.
 *
 * **⟶ AND A THIRD REQUIREMENT, ADDED BY THE `F-14` REPAIR (`§13`): A CONTROL'S FAILURE MUST BE ATTRIBUTABLE
 * TO ITS OWN MUTATION.** An entry control is required to have (a) staged its own bytes into a scratch tree
 * that a drive really ran against, (b) had those bytes LOAD — the report's attempt set non-empty, which is
 * the measurement that separates a mutated entry that WALKED from the path-string corpse the mis-wired lever
 * produced — and only then (c) failed the property. **(c) is the ledger's own `why`; (a) and (b) are asserted
 * here**, so a control that fails at its probe's "the state was reached" guard — the `F-14` signature — makes
 * its generator RED by name instead of reading as a control with teeth.
 */
function withControls(id, { controls, probe }) {
  return (recordControl) => {
    const shipped = measureAgainst(id, null, probe);
    assert.equal(shipped.verdict, 'PASS',
      `${id}: THE PROPERTY DOES NOT HOLD AT THE SHIPPED BYTES — ${shipped.why}`);
    recordControl('SHIPPED-BYTES', 'PASS (required)');
    for (const [name, entrySource] of Object.entries(controls)) {
      const drivesBefore = CONTROL_STAGE_LEDGER.length;
      const result = measureAgainst(id, entrySource, probe);
      const drives = isControlLever(entrySource) ? CONTROL_STAGE_LEDGER.slice(drivesBefore) : [];
      // **THE AUDIT LINE (`F-14`, `§13`) IS PRINTED BEFORE THE VERDICT IS JUDGED, SO THE CENSUS SURVIVES A
      // GENERATOR THAT FAILS**: (a) whether the control's own bytes REACHED a drive and WALKED there — the
      // attempt sets, whose emptiness was the mis-wired lever's signature — and (b) the assertion it failed at.
      console.log(`[F-14 audit] ${id} :: ${name} → verdict ${result.verdict} · state reached: `
        + (isControlLever(entrySource)
          ? `${drives.length} drive(s) against the staged bytes · attempt sets ${JSON.stringify(drives.map((d) => (d.report?.attempts ?? []).length))}`
          : 'n/a (a manifest/declaration/text control carries no entry drive)')
        + ` · failed at: ${result.why === null ? 'NOTHING — it PASSED the property' : result.why}`);
      assert.equal(result.verdict, 'FAIL',
        `${id}: THE CONTROL \`${name}\` DOES NOT FAIL THIS GENERATOR — it disabled the property and the `
        + 'generator answered PASS, so the cell cannot fail and is a FINDING (PUB-R-5)');
      if (isControlLever(entrySource)) {
        assert.ok(drives.length > 0,
          `${id}: \`${name}\` STAGED ITS BYTES AND NO DRIVE EVER RAN AGAINST THEM — a control whose mutation `
          + 'reaches no drive fails for a reason that is not its mutation (F-14)');
        assert.ok(drives.some((d) => (d.report?.attempts ?? []).length > 0),
          `${id}: \`${name}\`'s scratch entry NEVER LOADED — every drive it reached reported an EMPTY attempt `
          + 'set, which is the F-14 signature: the control failed at its probe\'s "the state was reached" '
          + `guard and not at the clause it mutated (attempt sets: ${JSON.stringify(drives.map((d) => (d.report?.attempts ?? []).length))})`);
      }
      recordControl(name, `FAIL (required) → ${result.why}`);
    }
  };
}

// =============================================================================================
// `NG-PUB-A` · `P-PUB-1` (`S-RESOLVE`) — BOTH CANDIDATES PRESENT AND LOADABLE AT ONCE
// =============================================================================================
// **THE STATE NO DRIVE IN THE TREE EVER PUT ON A TREE** (`archive/gate4/storeroom-publish-adversarial.md`
// `§B`, `P-PUB-1`'s "not covered"): `:499` drives rung two `broken`, `:536`/`:567` drive it `absent`, and
// `:584`'s decoy tree has rung one REMOVED. **THE DECLARED PROPERTY IS THAT A RUNG-TWO ATTEMPT MADE AFTER
// RUNG ONE SUCCEEDED IS A FAILURE** (`contract.md §5.1`'s failure list) — and that member is observable
// exactly and only where BOTH candidates are present AND loadable, because only then can a walk that
// does not stop at rung one reach a rung two that answers.
// FAILING LOOKS LIKE: the attempt set carries rung two's path after rung one's name, or `loadedFrom` is
// two while rung one resolved, or the loaded artefact is not the one that constructed the store.

generator('NG-PUB-A', 'both candidates present and loadable at once — rung one alone answers', withControls('NG-PUB-A', {
  probe: (entrySource) => {
    const env = makeScratch({
      label: 'both-loadable',
      rungOne: { name: RUNG_ONE_TAIL, opts: { variant: 'right' } },
      rungTwo: 'real', // THE SECOND CANDIDATE IS THE REPOSITORY'S OWN REAL `.node`, LOADABLE
      entrySource,
    });
    const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    assert.equal(r.returned, true, 'rung one resolved and an instance came back');
    assert.equal(r.stub?.calls?.version, 1, 'the rung-one artefact\'s own version was read once');
    assert.equal(r.stub?.calls?.storeCreate, 1, 'the artefact that loaded is the artefact that constructed');
    assert.equal(r.requests.filter(isRungTwo).length, 0,
      '§1.4\'s present-right-version row: where rung one succeeded NO rung-two attempt is made — and here '
      + 'rung two is PRESENT AND LOADABLE, so an attempt is a real load of the checkout\'s artefact');
    assert.equal(r.arm, null, 'no arm answers a resolved rung one');
    assert.equal(r.error, null, 'and nothing was absorbed');
  },
  controls: {
    // THE CONTROL: the walk is allowed to continue past a successful rung one — the exact member
    // `contract.md §5.1` names. The shipped `return` after a rung-one success is removed.
    'control-rung-one-does-not-stop-the-walk': controlEntry('NG-PUB-A', (text) => {
      const before = `      addon = candidate;
      loadedFrom = 'one';
      return;
    }
  }
  tried.push(ADDON_PATH);`;
      assert.ok(text.includes(before), 'NG-PUB-A: the rung-one success site moved; the control must be re-cut');
      return text.replace(before, `      addon = candidate;
      loadedFrom = 'one';
    }
  }
  tried.push(ADDON_PATH);`);
    }),
  },
}));

// =============================================================================================
// `NG-PUB-B` · `P-PUB-2` (`S-KEYSET`) — NON-STRING `process.platform` / `arch` TOKENS
// =============================================================================================
// `platformNameFor` builds its key by TEMPLATE INTERPOLATION (`index.mjs:120`: `` `${platform}·${arch}` ``),
// which invokes a coercion the file forbids nowhere and declares nowhere. **`PRELOAD:263-264` CAN ONLY
// INSTALL STRINGS**, so (a)–(c) below are undriven today and (d) is the only one the sample touches.
// FAILING LOOKS LIKE: a name outside the five is required, or a coercion inside the entry terminates the
// process instead of the table answering `NOT COVERED` for a key it does not carry.

const HOSTILE_TOKENS = [
  // (a) a `String` OBJECT — `typeof` is `object`, and interpolation reaches its `toString`
  { name: '(a) a String object', value: () => "new String('linux')", arch: () => "new String('x64')", expect: 'answered' },
  // (b) an object with a `Symbol.toPrimitive` trap answering a NON-STRING for `linux·x64`
  { name: '(b) a Symbol.toPrimitive object', value: () => "({ [Symbol.toPrimitive]() { return 'linux'; } })", arch: () => "({ [Symbol.toPrimitive]() { return 'x64'; } })", expect: 'answered' },
  // (b2) the same trap answering a value that is NOT a string: `Symbol.toPrimitive` must answer a primitive
  { name: '(b2) a Symbol.toPrimitive object answering an object', value: () => "({ [Symbol.toPrimitive]() { return {}; } })", arch: () => "'x64'", expect: 'may-die' },
  // (c) a `Symbol` — interpolation of a symbol throws a `TypeError`
  { name: '(c) a Symbol', value: () => 'Symbol("linux")', arch: () => "'x64'", expect: 'may-die' },
  // (d) the empty string — the one hostile token the covered sample already reaches
  { name: '(d) the empty string', value: () => "''", arch: () => "''", expect: 'answered' },
];

generator('NG-PUB-B', 'non-string platform/arch tokens never reach a sixth name', withControls('NG-PUB-B', {
  probe: (entrySource) => {
    const seen = [];
    for (const token of HOSTILE_TOKENS) {
      const preloadBody = `
'use strict';
const Module = require('node:module');
const attempts = [];
globalThis.__PUBGEN_ATTEMPTS__ = attempts;
const orig = Module._load;
Module._load = function (request, parent, isMain) {
  attempts.push(String(request));
  return orig.apply(this, arguments);
};
Object.defineProperty(process, 'platform', { value: ${token.value()}, configurable: true });
Object.defineProperty(process, 'arch', { value: ${token.arch()}, configurable: true });
`;
      const env = makeScratch({
        label: `hostile-${seen.length}`, rungTwo: 'broken', preloadBody, entrySource,
      });
      const out = driveRaw(env, { platform: 'linux', arch: 'x64' });
      if (!out.report) {
        // THE ENTRY TERMINATED ON THE TOKEN ITSELF. That is a state the table does not answer, and it is
        // recorded as such rather than swallowed: the generator's own verdict list names it.
        assert.equal(token.expect, 'may-die',
          `${token.name}: the entry terminated on a token whose coercion is declared legal — ${out.stderr.split('\n')[0]}`);
        seen.push(`${token.name}=process-terminated(${out.thrownClass ?? 'no class'})`);
        continue;
      }
      const r = out.report;
      // THE PROPERTY, AT EVERY HOSTILE TOKEN ALIKE: no name outside the five is ever required.
      const offending = r.requests.filter((x) => /^[a-z@]/.test(x) && /js-/.test(x) && !FIVE_NAMES.includes(x));
      assert.deepEqual(offending, [],
        `${token.name}: no computed name outside the five may be required; the attempt set was ${JSON.stringify(r.requests)}`);
      if (token.name === '(d) the empty string') {
        assert.ok(!r.requests.some((x) => FIVE_NAMES.includes(String(x))),
          `${token.name}: a token that spells no covered pair reaches NO rung-one name`);
      }
      if (token.name === '(a) a String object') {
        assert.ok(r.requests.includes(FIVE_NAMES[0]),
          `${token.name}: a token whose coercion SPELLS a covered pair reaches exactly that pair's name — the `
          + 'table\'s own answer, reached through the interpolation and never through a sixth name');
      }
      seen.push(`${token.name}=${JSON.stringify(r.requests.filter((x) => !x.startsWith('node:') && !x.startsWith('/')))}`);
    }
    assert.equal(seen.length, HOSTILE_TOKENS.length, 'every hostile token was driven and recorded');
  },
  controls: {
    // THE CONTROL: the closed table is left and a name is ASSEMBLED from the runtime's own tokens — the
    // clause `§1.3` item 1 refuses by name. `NG-PUB-B` must see the sixth name. **⟶ AND THE FIXTURE'S OWN
    // CONCATENATION IS BUILT FROM THE OPERATIVE SHAPE** (`A88`(a); `docs/specs/storeroom-publish-proposal.md`
    // `§14` item `7`): the tokens it concatenates are the RUNTIME's, and the stem it prefixes them with is the
    // DECLARED stem `@auspicion/provident-storeroom-js-`, **so the assembled name stands INSIDE the declared
    // project and scope and outside the declared five — which is the sixth name `P-PUB-2` refuses and the
    // state a stale fixture, keyed to the superseded `@auspicion/js-` stem, could no longer reach.**
    'control-a-name-assembled-from-the-runtime-tokens': controlEntry('NG-PUB-B', (text) => {
      // THE ANCHOR IS REGEX-BUILT BECAUSE THE SITE ITSELF CONTAINS A TEMPLATE LITERAL, so a literal anchor
      // would have to re-escape it and a wrong escape would silently mutate nothing.
      const anchor = /function platformNameFor\(platform, arch\) \{\n/;
      assert.equal(anchor.test(text), true, 'NG-PUB-B: the table site moved; the control must be re-cut');
      return text.replace(anchor,
        "function platformNameFor(platform, arch) {\n"
        + "  if (arch !== 'arm64' || platform !== 'darwin') return '@auspicion/provident-storeroom-js-' + platform + '-' + arch + '-gnu';\n");
    }),
  },
}));

// =============================================================================================
// `NG-PUB-C` · `P-PUB-4` — A `version()` THAT THROWS, WITH A LOADABLE RUNG TWO
// =============================================================================================
// `§5.4`'s failure list carries *"a version read that mints a status, or falls back"*. The shipped entry
// catches the throw into `answered` and answers the mismatch arm; **THE RUNG TWO IN THIS DRIVE IS THE
// REPOSITORY'S OWN REAL `.node` AND IS LOADABLE**, so a fallback would be a REAL load rather than a
// hypothetical one.
// FAILING LOOKS LIKE: the attempt set shows rung two loaded after a mismatch arm — the silent fallback.

generator('NG-PUB-C', 'a throwing version() is the arm, never a fallback to a loadable rung two', withControls('NG-PUB-C', {
  probe: (entrySource) => {
    const env = makeScratch({
      label: 'version-throws',
      rungOne: { name: RUNG_ONE_TAIL, opts: { variant: 'right', versionThrows: true } },
      rungTwo: 'real',
      entrySource,
    });
    const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    assert.equal(r.stub?.calls?.version, 1, 'the read WAS attempted — the throw is the read\'s own outcome');
    assert.ok(r.arm !== null && r.arm.notTheArm !== true, 'a throwing read is the single declared arm');
    // **⟶ RE-DERIVED TO THE THREE-MEMBER FORM** (`surface.md` `§2.5` items 4 and 9; the `§1.4` item 1
    // *"no third member"* half and `DD-12`'s two-member `Refusal` are SUPERSEDED by the Architect). The
    // generator's own claim is kept: ONE arm, its declared member set, nothing minted.
    assert.deepEqual(Object.keys(r.arm).sort(), ['log', 'message', 'status'],
      '`surface.md §2.5` items 4 and 9: the member set is EXACTLY `{log, message, status}`');
    assert.equal(Object.keys(r.arm).length, 3, '`surface.md §2.5` item 9: and its length is `3`');
    assert.equal(Array.isArray(r.arm.log) && r.arm.log.length === 0, true,
      '`surface.md §2.5` item 4: `log` is the EMPTY ARRAY where the cause has no attempt at all');
    assert.equal(r.arm.status, ARM_STATUS, 'and the status is the store\'s own member, never a minted one');
    assert.equal(r.returned, false, 'and NO instance is returned beside the arm');
    assert.equal(r.requests.filter(isRungTwo).length, 0,
      '§1.5 item 2: NO rung-two attempt follows the read\'s own failure — and here rung two is loadable');
    assert.equal(r.error, null, 'nothing was absorbed silently');
  },
  controls: {
    // THE CONTROL: the mismatch arm is removed, so the walk falls through to the rung-two `require`
    // exactly as `PUB-R-3` describes the pre-repair state. The rung-two load is REAL here.
    'control-the-arm-falls-through-to-rung-two': controlEntry('NG-PUB-C', (text) => {
      const before = `        addon = null;
        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) };
        return;`;
      assert.ok(text.includes(before), 'NG-PUB-C: the mismatch arm site moved; the control must be re-cut');
      return text.replace(before, '        addon = null;');
    }),
  },
}));

// =============================================================================================
// `NG-PUB-D` · `P-PUB-4` — **THE DECISIVE ONE**: THE ARM'S MESSAGE IS AUTHORED BY THE LOADED ARTEFACT
// =============================================================================================
// `§1.4` item 6 arm (a) / `PUB-DD-25`: *"THE STORE'S OWN GENERATOR AUTHORS THE STRING"*, reached through
// the loaded artefact's `errorMessage`. **THE FAKE HERE RETURNS A DELIBERATELY MUTATED STRING**, so the
// arm cannot be satisfied by a message the entry renders for itself: if the entry reproduces the clause
// in its own frame, the observed message lacks the artefact's own `[MUTATED …]` suffix and this generator
// fails by name. **`S-ONEARM`'s `:1108` assertion proves the GENERATOR's rendering and never requires the
// ARM to use it** (`archive/gate4/storeroom-publish-adversarial.md` `§B`, `P-PUB-4`'s (ii)).

generator('NG-PUB-D', 'the mismatch arm\'s message is authored by the LOADED artefact', withControls('NG-PUB-D', {
  probe: (entrySource) => {
    const env = coveredEnv(COVERED[0], { variant: 'wrong', errorMessage: 'mutated', rungTwo: 'broken' });
    if (entrySource !== null) {
      // THE CONTROL'S TREE IS REBUILT FROM THE SAME FAKE, so the only thing that differs is the entry.
      const control = makeScratch({
        label: 'mismatch-author', rungOne: { name: COVERED[0].name, opts: { variant: 'wrong' } },
        rungTwo: 'broken', entrySource,
      });
      const rc = drive(control, { platform: COVERED[0].platform, arch: COVERED[0].arch });
      const A = rc.arm;
      assert.ok(A && A.notTheArm !== true, 'the control still reaches the arm');
      assert.ok(A.message.includes('[MUTATED BY THE LOADED ARTEFACT]'),
        'the arm\'s message is the LOADED artefact\'s own generator\'s string, carrying the artefact\'s own mutation');
      assert.equal(rc.stub?.calls?.errorMessage >= 1, true,
        'the entry reached the loaded artefact\'s generator to author the string');
      return;
    }
    const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    const A = r.arm;
    assert.ok(A && A.notTheArm !== true, `the substituted artefact is refused by the single arm: ${JSON.stringify(r).slice(0, 400)}`);
    assert.ok(A.message.includes('[MUTATED BY THE LOADED ARTEFACT]'),
      'PUB-DD-25 arm (a): the string is the artefact\'s own generator\'s — the artefact was given a MUTATED '
      + `generator and the arm must carry its mutation, not the clause reproduced in the entry's frame; got ${JSON.stringify(A.message)}`);
    assert.equal(r.stub?.calls?.errorMessage, 1, 'the loaded artefact\'s generator was called exactly once');
    assert.ok(!A.message.includes(RUNG_TWO_TAIL.replace(/\\/g, '/')),
      'and the subject is rung one\'s own path, never rung two\'s');
  },
  controls: {
    // THE CONTROL: the entry authors the mismatch arm's message in its OWN frame, reproducing the clause
    // byte-for-byte — the shipped pre-repair reading, and the reading `P-PUB-4`'s own cells cannot see.
    'control-the-entry-authors-the-arm-itself': controlEntry('NG-PUB-D', (text) => {
      const before = `message: mismatchArmMessage(candidate, name) };`;
      assert.ok(text.includes(before), 'NG-PUB-D: the mismatch arm\'s message site moved; the control must be re-cut');
      return text.replace(before, 'message: generatorFilePathUnreachable(name) };');
    }),
  },
}));

// =============================================================================================
// `NG-PUB-E` · `P-PUB-3` (`S-MUSL`) — A NON-`Error` RUNG-ONE THROW, WITH A RUNG TWO THAT RESOLVES
// =============================================================================================
// `§1.1` item 2 / `resolution.md §2.3`: EVERY throw of rung one is a MISS — *"a `MODULE_NOT_FOUND`, an
// `ERR_DLOPEN_FAILED` and ANY OTHER THROW ALIKE"* — and no second failure shape is produced on that path.
// The throws here are a plain `{status:…}` object, a primitive string, `0` and `undefined`.
// FAILING LOOKS LIKE: the loader reports a second failure shape instead of treating every throw as a miss.

const NON_ERROR_THROWS = [
  { name: '(a) a plain {status}', kind: 'object', value: { status: 'AddressMalformed', message: 'not the arm' } },
  { name: '(b) a primitive string', kind: 'string', value: 'the rung-one require failed with a string' },
  { name: '(c) zero', kind: 'number', value: 0 },
  { name: '(d) undefined', kind: 'undefined', value: null },
];

generator('NG-PUB-E', 'every non-Error rung-one throw is a miss, and rung two answers', withControls('NG-PUB-E', {
  probe: (entrySource) => {
    for (const thrown of NON_ERROR_THROWS) {
      const env = makeScratch({
        label: `nonerror-${NON_ERROR_THROWS.indexOf(thrown)}`,
        rungOne: { name: RUNG_ONE_TAIL, opts: { throwRungOne: { kind: thrown.kind, value: thrown.value } } },
        rungTwo: 'real',
        entrySource,
      });
      const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
      assert.equal(r.returned, true,
        `${thrown.name}: a throw at rung one is a MISS, so the loadable rung two carries the load`);
      assert.equal(r.arm, null, `${thrown.name}: and no arm answers — the walk continued to a loadable rung`);
      assert.equal(r.error, null, `${thrown.name}: and nothing was absorbed as a second failure shape`);
      assert.ok(r.requests.some(isRungTwo), `${thrown.name}: rung two WAS attempted`);
    }
  },
  controls: {
    // THE CONTROL: rung one's catch CLASSIFIES the throw and answers a second shape — the exact thing
    // `resolution.md §2.3` forbids. A non-`Error` throw is rethrown as the arm.
    'control-the-catch-classifies-the-throw': controlEntry('NG-PUB-E', (text) => {
      const before = `      candidate = require_(name);
    } catch {`;
      assert.ok(text.includes(before), 'NG-PUB-E: the rung-one catch site moved; the control must be re-cut');
      return text.replace(before, `      candidate = require_(name);
    } catch (err) {
      if (!(err instanceof Error)) throw { status: 'FilePathUnreachable', message: generatorFilePathUnreachable(name) };`);
    }),
  },
}));

// =============================================================================================
// `NG-PUB-F` · `P-PUB-5` (`S-ONEARM`) — AN ARTEFACT THAT LOADS, MATCHES, AND CARRIES NO `errorMessage`
// =============================================================================================
// `mismatchArmMessage`'s arm (b) — `generatorFilePathUnreachable(subject)` — is the ONE arm `§1.4` item 6
// declares where no generator can be reached, and `contract.md §1.4` item 7 (the SpecWriter's close pass,
// `f792f18`) declares THE THIRD TRIGGER CONDITION of that arm: **AN ARTEFACT THAT LOADED AND CARRIES NO
// USABLE GENERATOR — ITS `errorMessage` ABSENT, ITS OWN GENERATOR THROWING, OR IT ANSWERING A VALUE THAT IS
// NOT A `string` — IS A SUB-CASE OF ARM (b) AND NOT A THIRD ARM, AND ITS SUBJECT IS THE RUNG-ONE ARTEFACT'S
// OWN PATH ALONE AND NEVER THE BOTH-PATHS JOIN, BECAUSE AT THAT STATE ONLY RUNG ONE WAS TRIED.**
// FAILING LOOKS LIKE: a `message` at this state that APPENDS the rung-two path, or that names the
// module-relative addon path in place of the rung-one artefact's own (`§1.4` item 7; `resolution.md §5.3a`).

generator('NG-PUB-F', 'an artefact with no usable generator names rung one\'s path ALONE', withControls('NG-PUB-F', {
  probe: (entrySource) => {
    // **THE STATE `§1.4` ITEM 7 DECLARES, DRIVEN EXACTLY: THE ARTEFACT LOADED, ITS OWN `version` DID NOT
    // MATCH, AND ITS `errorMessage` IS ABSENT.** The fake's own `storeCreate` CONSTRUCTS, so the drive
    // distinguishes "the artefact loaded but the version refused it" from "the artefact could not load".
    const loaded = makeScratch({
      label: 'no-generator-loaded-mismatch',
      rungOne: { name: RUNG_ONE_TAIL, opts: { variant: 'wrong', errorMessage: 'absent', storeCreate: 'constructs' } },
      rungTwo: 'broken', entrySource,
    });
    const r = drive(loaded, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    assert.equal(r.stub?.calls?.version, 1, 'the artefact\'s own version WAS read — it loaded far enough to answer');
    assert.equal(r.stub?.calls?.storeCreate ?? 0, 0,
      'and it DID NOT construct: the version refused it, which is what makes this arm (b)\'s third condition');
    assert.equal(r.stub?.calls?.errorMessage ?? 0, 0, 'the artefact carries no generator, so nothing could be rendered');
    const A = assertArmHere(r);
    // **THE SUBJECT, ASSERTED AS AN EXACT RENDERING AND NOT AS AN INCLUSION** — an inclusion test is satisfied
    // by a message that names rung one AND appends rung two, which is precisely the FINDING this clause names.
    assert.equal(A.message, gen(RUNG_ONE_TAIL),
      '`§1.4` item 7: the subject is the RUNG-ONE ARTEFACT\'S OWN PATH ALONE, rendered by the generator\'s own '
      + `\'<subject>\' slot, and NEVER the both-paths join — at this state only rung one was tried; got ${JSON.stringify(A.message)}`);
    assert.equal(A.message.includes(RUNG_TWO_TAIL), false,
      'and the module-relative addon path appears nowhere in it: this walk reached rung two on NO evaluation');
    assert.equal(r.requests.filter(isRungTwo).length, 0,
      'the walk RETURNS at the arm: rung two\'s `require` is reached on no evaluation (`§1.4` item 7)');
    assert.equal(r.returned, false, 'and no instance came back beside the arm');
  },
  controls: {
    // **THE CONTROLS, EACH DISABLING ONE HALF OF THE CLAUSE, AND EACH REQUIRED TO FAIL THE GENERATOR.**
    // (1) THE SUB-CASE IS ANSWERED BY ARM (b)'s CLAUSE WITH THE BOTH-PATHS JOIN APPENDED — the `§1.4` item 7
    // FINDING verbatim: a message that names a path the loader did not try at this state. **THE ANCHOR IS
    // MATCHED AT THE ONE SITE AND REWRITTEN WITH THE SAME `name` THE SHIPPED ARM HAS IN HAND.**
    'control-the-mismatch-arm-appends-the-both-paths-join': controlEntry('NG-PUB-F', (text) => {
      const before = `        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) };`;
      assert.ok(text.includes(before), 'NG-PUB-F: the mismatch arm site moved; the control must be re-cut');
      return text.replace(before,
        "        addonArm = { status: 'FilePathUnreachable', message: generatorFilePathUnreachable(name + \"', '\" + join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node')) };");
    }),
    // (2) THE SUB-CASE IS ANSWERED BY A SECOND FAILURE SHAPE — the `alt` `§1.4` item 7 prices and REFUSES.
    // **⟶ RE-CUT BY THE `F-14` PASS (`§13`): THE AS-FILED FORM MUTATED THE `addonArm` ASSIGNMENT ALONE, AND
    // THE SHIPPED `fail()` RECONSTRUCTS THE ARM OUT OF THE REFUSAL IT IS HANDED**
    // (`throw { status: refusal.status, message: refusal.message, log: refusalLog(log) }`,
    // `index.mjs:462` — *"mints no code of its own"*), **so a `code` minted at that site was DROPPED before it
    // reached any consumer and the control was INERT — it PASSED the generator, which is the `F-14` class
    // exactly: a check that appeared to fail for the right reason and did not.** **THE AS-FILED SUBSTITUTION,
    // RE-EMITTED VERBATIM** — `return text.replace(before, "        addonArm = { status:
    // 'FilePathUnreachable', message: mismatchArmMessage(candidate, name), code: 'AddonVersionMismatch' };");`
    // — **IS KEPT, AND THE MUTANT IS ALSO MINTED at the ONE place this unit's arm acquires its member set, so
    // the second shape really REACHES the consumer. THE PROPERTY AND THE ASSERTIONS ARE UNTOUCHED: only the
    // control's site set moved, and it now fails the generator at the shape clause it is cut for.**
    //
    // **⟶ AND THE SECOND SITE IS RE-CUT AGAIN, BECAUSE THE `F-14` CUT WAS ANCHORED ON THE SUPERSEDED TWO-MEMBER
    // THROW.** The anchor read `  throw { status: refusal.status, message: refusal.message };` — the form the
    // TWO-MEMBER `Refusal` struct and `DD-12` licensed. **THE ARCHITECT HAS OVERRIDDEN THAT FORM AND THE
    // IMPLEMENTATION NOW THROWS THREE MEMBERS** (`surface.md` `§2.5` items 4 and 9; `index.mjs:462` above), so
    // the old anchor matched NO byte of the shipped entry and this control FAILED AT ITS OWN `assert.ok`,
    // reporting *"the entry's one arm-building site moved"* rather than measuring the shape it is cut for.
    // **THE ANCHOR MOVES TO THE SHIPPED THREE-MEMBER THROW AND `code` IS STILL THE MEMBER MINTED OUTSIDE THE
    // DECLARED SET — the `alt` second shape `§1.4` item 7 prices and refuses — so the control measures exactly
    // what it measured before: a member outside `{log, message, status}` must not reach a consumer.**
    'control-the-sub-case-mints-a-second-shape': controlEntry('NG-PUB-F', (text) => {
      const before = `        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name) };`;
      assert.ok(text.includes(before), 'NG-PUB-F: the mismatch arm site moved; the control must be re-cut');
      const memberSite = `  throw { status: refusal.status, message: refusal.message, log: refusalLog(log) };`;
      assert.ok(text.includes(memberSite),
        'NG-PUB-F: the entry\'s one arm-building site moved; the control must be re-cut where the member set is built');
      return text
        .replace(before,
          "        addonArm = { status: 'FilePathUnreachable', message: mismatchArmMessage(candidate, name), code: 'AddonVersionMismatch' };")
        .replace(memberSite,
          "  throw { status: refusal.status, message: refusal.message, log: refusalLog(log), code: 'AddonVersionMismatch' };");
    }),
    // (3) THE ARM (b) FALLBACK ITSELF NAMES A PATH THE WALK NEVER TRIED.
    // **⟶ RE-CUT BY THE `F-14` PASS (`§13`), AND THE AS-FILED SITE IS KEPT BESIDE THE NEW ONE.** `absentSubject()`
    // is reached through `addonLoadMessage()`, which is the `addon === null && addonArm === null` state — the
    // walk that reached NO artefact at all (`index.mjs:332`–`:340`). **THE STATE THIS GENERATOR DRIVES IS THE
    // MISMATCH STATE, WHERE ARM (b) IS `mismatchArmMessage`'s OWN FALLBACK (`index.mjs:322`) AND
    // `absentSubject()` IS NEVER CALLED** — so the as-filed mutation reached no evaluation of the probe's state,
    // the property still held, and the control PASSED this generator: the `F-14` class again, measured rather
    // than assumed. **THE AS-FILED SUBSTITUTION, RE-EMITTED VERBATIM** — `return text.replace(before, "  const
    // subject = absentSubject() + \", '\" + join(dirOf(fileURLToPath(import.meta.url)), 'never', 'tried',
    // 'x.node');");` — **STANDS UNMOVED BESIDE THE NEW ONE, AND THE FALLBACK SITE IS THEREFORE MUTATED TOO, at
    // the SAME clause the control names** — an
    // arm (b) subject that names a path the walk never tried — **and the as-filed substitution stands unmoved
    // beside it**, so the control measures the clause it was written for at the state it is written about.
    'control-the-fallback-names-an-untried-path': controlEntry('NG-PUB-F', (text) => {
      const before = `  const subject = absentSubject();`;
      assert.ok(text.includes(before), 'NG-PUB-F: the absent subject site moved; the control must be re-cut');
      const fallbackSite = `  return generatorFilePathUnreachable(name);`;
      assert.ok(text.includes(fallbackSite),
        'NG-PUB-F: arm (b)\'s own fallback site moved; the control must be re-cut where the state it drives reaches it');
      return text
        .replace(before,
          "  const subject = absentSubject() + \", '\" + join(dirOf(fileURLToPath(import.meta.url)), 'never', 'tried', 'x.node');")
        .replace(fallbackSite,
          "  return generatorFilePathUnreachable(name + \"', '\" + join(dirOf(fileURLToPath(import.meta.url)), 'never', 'tried', 'x.node'));");
    }),
  },
}));

// =============================================================================================
// `NG-PUB-G` · `P-PUB-5` — A `cfg.filePath` FORCED DIFFERENT FROM THE ADDON PATH
// =============================================================================================
// `P-PUB-5`'s failure list carries *"a subject that is `cfg.filePath`"*. **NO DRIVE PASSES A `cfg.filePath`
// THAT DIFFERS FROM THE ADDON PATH**, so the two spellings are never forced apart and the prohibition is
// asserted by no drive. The observer's own `cfg` is extended with a `filePath` token that no clause of
// this unit owns, and the mismatch arm's subject is read against it.
// FAILING LOOKS LIKE: the message names `cfg.filePath`.

generator('NG-PUB-G', 'the arm\'s subject is the artefact\'s path, never cfg.filePath', withControls('NG-PUB-G', {
  probe: (entrySource) => {
    // **THE DECOY IS NAMED BY THE ENVIRONMENT, WHICH IS WHERE THE OBSERVER'S OWN CFG TAKES IT FROM**: the
    // observer's `storeCreate` is rewritten to carry a `filePath` the store's own three declared keys do not
    // include, and the report carries that same string so the generator can assert the cfg really held it.
    const env = makeScratch({
      label: 'cfg-filepath', rungOne: { name: RUNG_ONE_TAIL, opts: { variant: 'wrong' } },
      rungTwo: 'broken', entrySource,
    });
    const patched = readFileSync(env.driver, 'utf8')
      .replace('mod.storeCreate({ journalLength: 4, listeners: [] })',
        'mod.storeCreate({ journalLength: 4, listeners: [], filePath: process.env.PUBGEN_CFG_FILE_PATH })')
      .replace("ok: null, error: null, arm: null, stub: null,",
        "ok: null, error: null, arm: null, stub: null, decoy: process.env.PUBGEN_CFG_FILE_PATH,");
    assert.ok(patched.includes('PUBGEN_CFG_FILE_PATH'), 'NG-PUB-G: the decoy was wired into the construction');
    assert.ok(patched.includes('decoy: process.env.PUBGEN_CFG_FILE_PATH'), 'NG-PUB-G: the report carries the decoy it used');
    writeFileSync(env.driver, patched);
    const r = drive(env, {
      platform: COVERED[0].platform, arch: COVERED[0].arch,
      extraEnv: { PUBGEN_CFG_FILE_PATH: 'the-cfg-filePath-decoy.node' },
    });
    assert.equal(r.decoy, 'the-cfg-filePath-decoy.node', 'the decoy really WAS the cfg\'s own filePath');
    assert.equal(r.requests.filter((x) => x.includes('the-cfg-filePath-decoy')).length, 0,
      'the decoy is a path the load path never tried, so it can reach the subject only if the entry reads the cfg');
    const A = r.arm;
    assert.ok(A && A.notTheArm !== true, 'the mismatch is answered by the one arm');
    assert.equal(A.message.includes('the-cfg-filePath-decoy'), false,
      `P-PUB-5: the subject is the artefact's own path and NEVER \`cfg.filePath\`; got ${JSON.stringify(A.message)}`);
    assert.ok(A.message.includes(`'${RUNG_ONE_TAIL}'`), 'the subject is rung one\'s own resolved name');
  },
  controls: {
    // THE CONTROL: the mismatch arm's subject is the CALLER'S `cfg.filePath` — the prohibited subject.
    'control-the-subject-is-cfg-filePath': controlEntry('NG-PUB-G', (text) => {
      const before = `message: mismatchArmMessage(candidate, name) };`;
      assert.ok(text.includes(before), 'NG-PUB-G: the mismatch arm site moved; the control must be re-cut');
      return text.replace(before,
        'message: generatorFilePathUnreachable(process.env.PUBGEN_CFG_FILE_PATH ?? name) };');
    }),
  },
}));

// =============================================================================================
// `NG-PUB-H` · `P-PUB-6` (`S-SCOPE`) AND `PUB-R-1` — A MANIFEST WHOSE `os`/`cpu` CONTRADICT ITS NAME,
// AND ONE WHOSE `files` OMITS THE `.node`
// =============================================================================================
// **TWO PROPERTIES, ONE GENERATOR, AND THE SECOND IS THE COUNTER-CELL'S OWN READING CORRECTED**
// (`PUB-R-1`; `PAR-PUB-21`; `distribution.md §3.2` item 5). **(1)** Each platform manifest's `os`/`cpu`
// must be the pair its own `name` SPELLS — no drive in the `61` or the `241` reads them against the name
// (`PUB-R-10`). **(2)** Each platform manifest's `files` must CARRY its `.node`, because an allowlist that
// omits it *"cannot be loaded by rung one"* — while `publish.test.mjs:1574` REQUIRED the omission.
// **THE CONTROLS LIVE IN A SCRATCH PLATFORM DIRECTORY AND NOT IN AN ENTRY MUTATION.**
//
// **⟶ AND A THIRD PROPERTY THIS PASS WIDENED RATHER THAN ADDED: THE CENSUS.** The property already read
// every scratch manifest's key set against a declared nine; **`PUB-DD-7`'s reversal column makes that set
// twelve** (*"the three metadata fields are written the moment a remote exists"*), so the nine is re-cut to
// twelve with ONE MEASURED CONTROL PER ADDED FIELD — a census that grew while its teeth did not would be a
// list, not an assertion.

// **⟶ WIDENED 2026-10-11 BY THE METADATA-CELL PASS (`role_test_writer`, BOUNDED THREE-CELL PASS): THE
// DECLARED SET IS TWELVE, NOT NINE — `PUB-DD-7`'s REVERSAL COLUMN IS OPERATIVE.** **AS FILED, AND
// RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER, THE CONSTANT READ**
// *"`const PLATFORM_FIELDS = ['cpu', 'engines', 'files', 'license', 'main', 'name', 'os', 'publishConfig',
// 'version'];`"*. **THE THREE ADDED ARE `homepage` · `repository` · `bugs`** — the fields `PUB-DD-7`'s own
// reversal column writes *"the moment a remote exists"* (`docs/specs/storeroom-publish/contract.md §0.3`),
// **and the remote is the registry's own `422`: *"`repository.url` is `""`, expected to match
// `https://github.com/LittleKingsguard/Provident-Storeroom` from provenance"*.** **THE CENSUS GROWS RATHER
// THAN THE ASSERTION LOOSENING** — the assertion below stays a TWO-DIRECTIONAL exact set equality — **AND THE
// WIDENING IS NOT VACUOUS: three further controls, one per added field, each dropping ONE of them from ONE
// scratch manifest, are measured and each MUST FAIL** (`§18` of the red set's record).
const PLATFORM_FIELDS = [
  'bugs', 'cpu', 'engines', 'files', 'homepage', 'license', 'main', 'name', 'os', 'publishConfig',
  'repository', 'version',
];

/** Every tracked platform manifest, read at its own bytes. */
function readPlatformManifests() {
  return readdirSync(PLATFORMS).sort().map((label) => ({
    label, path: join(PLATFORMS, label, 'package.json'), manifest: JSON.parse(readFileSync(join(PLATFORMS, label, 'package.json'), 'utf8')),
  }));
}

/** The pair a label's own `name` spells, from the label itself: `<target>-<arch>[-<toolchain>]`. */
function pairSpelledByName(label) {
  const [target, arch] = label.split('-');
  return { os: target, cpu: arch };
}

/** The property, applied to a SET of manifests — so the shipped five and each scratch control run alike. */
function assertPlatformPairingAndNotice(manifests) {
  for (const { label, manifest } of manifests) {
    const spelled = pairSpelledByName(label);
    assert.equal(manifest.name.endsWith(`/${label}`) || manifest.name.endsWith(label) || manifest.name.includes(label), true,
      `${label}: the directory's own label is a segment of the artefact's name (${manifest.name})`);
    assert.deepEqual(manifest.os, [spelled.os],
      `${label} (${manifest.name}): PAR-PUB-19 — the manifest's \`os\` must be the target its own name SPELLS, and not another's`);
    assert.deepEqual(manifest.cpu, [spelled.cpu],
      `${label}: PAR-PUB-20 — the manifest's \`cpu\` must be the architecture its own name SPELLS`);
    const fields = manifest.files ?? [];
    assert.ok(fields.some((f) => f === 'storeroom_js_binding.node'),
      `${label}: PAR-PUB-21 / distribution.md §3.2 item 5 — the artefact's allowlist CARRIES its own \`.node\`, `
      + 'because an allowlist that omits it cannot be loaded by rung one');
    assert.equal(manifest.main, 'storeroom_js_binding.node',
      `${label}: §3.2 item 6 — the manifest's own \`main\` names the same path the allowlist carries`);
    assert.ok(fields.includes('LICENSE') || fields.includes('LICENSE.txt'),
      `${label}: distribution.md §3.2 item 5 — the allowlist carries the licence copy, or the artefact ships no notice`);
    assert.deepEqual(Object.keys(manifest).sort(), [...PLATFORM_FIELDS].sort(),
      `${label}: the TWELVE declared fields and no field not declared — the nine the platform artefact `
      + 'always carried, PLUS `homepage` · `repository` · `bugs`, the three `PUB-DD-7` writes "the moment a '
      + 'remote exists"; a manifest MISSING ONE OF THE THREE still FAILS this assertion');
  }
}

generator('NG-PUB-H', 'a platform manifest\'s os/cpu match its name, and its files carry its .node', (recordControl) => {
  // (1) THE PROPERTY AT THE SHIPPED FIVE
  const shipped = measureAgainst('NG-PUB-H', null, () => {
    assertPlatformPairingAndNotice(readPlatformManifests());
    // and the tracked tree carries no binary (`distribution.md §3.1`: NO BINARY IS EVER COMMITTED)
    const walk = (dir, acc = []) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full, acc);
        else if (entry.name.endsWith('.node')) acc.push(full);
      }
      return acc;
    };
    assert.deepEqual(walk(PLATFORMS), [], 'no binary is committed inside a platform directory');
  });
  assert.equal(shipped.verdict, 'PASS', `NG-PUB-H: THE PROPERTY DOES NOT HOLD AT THE SHIPPED FIVE — ${shipped.why}`);
  recordControl('SHIPPED-FIVE', 'PASS (required)');
  // (2) THE CONTROLS — scratch manifest SETS, each read through the SAME property.
  const base = readPlatformManifests();
  const wrongPair = base.map((m) => (m.label === 'darwin-arm64'
    ? { ...m, manifest: { ...m.manifest, os: ['linux'], cpu: ['x64'] } }
    : m));
  const omittedNode = base.map((m) => (m.label === 'linux-x64'
    ? { ...m, manifest: { ...m.manifest, files: (m.manifest.files ?? []).filter((f) => f !== 'storeroom_js_binding.node') } }
    : m));
  // **⟶ THE WIDENED CENSUS'S OWN CONTROLS, ONE PER FIELD THE EXTENSION ADDED** (`§18`; `PUB-DD-7`'s
  // reversal column). **EACH DROPS EXACTLY ONE OF THE THREE FROM EXACTLY ONE SCRATCH MANIFEST AND MUST
  // FAIL THE SAME PROPERTY**: without them the widened census would be a list that grew while its teeth
  // did not, because a `deepEqual` at twelve is only worth the twelve it can refuse.
  const droppedMetadata = (label, field) => base.map((m) => {
    if (m.label !== label) return m;
    const { [field]: _dropped, ...rest } = m.manifest;
    return { ...m, manifest: rest };
  });
  const controls = {
    'control-os-cpu-contradict-the-name': () => assertPlatformPairingAndNotice(wrongPair),
    'control-files-omit-the-.node': () => assertPlatformPairingAndNotice(omittedNode),
    'control-drops-repository': () => assertPlatformPairingAndNotice(droppedMetadata('linux-x64', 'repository')),
    'control-drops-homepage': () => assertPlatformPairingAndNotice(droppedMetadata('darwin-x64', 'homepage')),
    'control-drops-bugs': () => assertPlatformPairingAndNotice(droppedMetadata('win32-x64', 'bugs')),
  };
  for (const [name, control] of Object.entries(controls)) {
    const result = measureAgainst('NG-PUB-H', name, control);
    assert.equal(result.verdict, 'FAIL',
      `${name} DOES NOT FAIL THIS GENERATOR — it contradicts the name, drops the \`.node\`, or drops one of `
      + 'the three metadata fields the census declares, and the generator answered PASS, so the cell cannot '
      + 'fail (PUB-R-5)');
    recordControl(name, `FAIL (required) → ${result.why}`);
  }
});

// =============================================================================================
// `NG-PUB-I` · `P-PUB-7` (`S-TYPES`, `S-LICENCE`) — A CONSUMER-SIDE TYPE PROBE, AND THE SIX-ARTEFACT
// NOTICE CLAIM MADE FALSIFIABLE
// =============================================================================================
// **(1)** `index.d.ts`'s `WriteRecord` must declare `op` as the store's OWN eight-member journal record
// (`DD-39`), so a TypeScript consumer compiling `write(i, a, 'mem', v).op.opId` — and `.op.kind`, `.op.seq`
// — type-checks against a SHIPPED value. **No `tsc` is installed in this tree and the generator does not
// invent one**: the probe is a READER-SIDE walk of the declaration's own text, and it is asserted
// FALSIFIABLE by a control declaration whose `op` is `number` (`PUB-R-4`'s own defect).
// **(2)** The six-artefact notice claim (`§2.3` item 2; `distribution.md §4.2` item 1) is asserted as the
// ASSEMBLY STEP the README declares — `PUB-R-5`'s `|| true` is gone, and the claim is falsifiable by a
// README that states the copy is not carried (`PUB-R-2`'s own contradiction).

/** The `WriteRecord` interface's own body, read from the shipped declaration's text. */
function writeRecordBody(dts) {
  const match = /interface WriteRecord \{([\s\S]*?)\n\}/.exec(dts);
  assert.ok(match, 'index.d.ts declares an `interface WriteRecord`');
  return match[1];
}

function assertOpIsTheJournalRecord(dts) {
  const body = writeRecordBody(dts);
  assert.ok(/readonly\s+op\s*:\s*[^;]+;/.test(body), 'WriteRecord declares a readonly `op` member');
  const opType = /readonly\s+op\s*:\s*([^;]+);/.exec(body)[1].trim();
  assert.notEqual(opType, 'number',
    'PUB-R-4 / DD-39: `op` is NOT a number — every value the entry returns is the store\'s own journal record');
  for (const member of ['opId', 'kind', 'seq']) {
    assert.ok(new RegExp(`readonly\\s+${member}\\s*:`).test(dts),
      `the declaration carries the journal record's own \`${member}\` member, so a consumer reading `
      + `\`write(...).op.${member}\` type-checks`);
  }
  assert.ok(/export\s+(interface|type)\s+JournalOp\b/.test(dts),
    'the eight-member record is declared by name (`JournalOp`) and `op` refers to it');
  assert.equal(opType, 'JournalOp',
    `WriteRecord.op's own type IS the declared record; got ${JSON.stringify(opType)}`);
  // and the record's own member set is the store's eight (`DD-39`), declared in the type's own text
  const record = /interface JournalOp \{([\s\S]*?)\n\}/.exec(dts);
  assert.ok(record, 'the `JournalOp` interface carries its own body');
  for (const member of ['opId', 'kind', 'address', 'tier', 'before', 'after', 'seq', 'compacted']) {
    assert.ok(new RegExp(`readonly\\s+${member}\\s*:`).test(record[1]),
      `\`JournalOp\` declares the store's own \`${member}\` member (DD-39: { opId, kind, address, tier, before, after, seq, compacted })`);
  }
  return opType;
}

generator('NG-PUB-I', 'the shipped value type-checks against the declaration, and six notices are falsifiable', (recordControl) => {
  const dts = readFileSync(join(PKG_DIR, 'index.d.ts'), 'utf8');
  const readme = readFileSync(join(PKG_DIR, 'README.md'), 'utf8');
  const mainManifest = JSON.parse(readFileSync(MAIN_MANIFEST, 'utf8'));
  const shipped = measureAgainst('NG-PUB-I', null, () => {
    assertOpIsTheJournalRecord(dts);
    // THE SIX-ARTEFACT NOTICE CLAIM, AS THE DECLARED MECHANISM — the assembly step — NOT as a `files`
    // entry: `§2.1` item 6 fixes the main package's `files` array as FOUR entries and NOTHING ELSE, so the
    // copy cannot be a `files` entry and the claim is about the release's own assembly step (`§4.3` item 2).
    assertSixNotices(readme);
    assertAllowlistIsFour(mainManifest.files ?? []);
    assert.equal((mainManifest.files ?? []).includes('LICENSE'), false,
      'and the copy is NOT a `files` entry — the four-entry allowlist refuses the notice copy '
      + '(`§2.1` item 6, read with item 5\'s prohibition)');
    assert.equal(mainManifest.license, 'AGPL-3.0', 'site (i) reads the declared spelling');
  });
  assert.equal(shipped.verdict, 'PASS', `NG-PUB-I: THE PROPERTY DOES NOT HOLD AT THE SHIPPED BYTES — ${shipped.why}`);
  recordControl('SHIPPED-BYTES', 'PASS (required)');
  const controls = {
    'control-op-declared-as-a-number': () =>
      assertOpIsTheJournalRecord(dts.replace(/readonly\s+op\s*:\s*[^;]+;/, 'readonly op: number;')),
    'control-readme-states-the-copy-is-not-carried': () =>
      assertSixNotices('/** THE LICENCE OF RECORD IS `AGPL-3.0`.** the licence copy does NOT travel with every artefact'),
    'control-manifest-lists-license-in-files': () =>
      assertAllowlistIsFour(['index.mjs', 'README.md', 'index.d.ts', 'LICENSE']),
  };
  for (const [name, control] of Object.entries(controls)) {
    const result = measureAgainst('NG-PUB-I', name, control);
    assert.equal(result.verdict, 'FAIL',
      `${name} DOES NOT FAIL THIS GENERATOR — it disables the property and the generator answered PASS (PUB-R-5)`);
    recordControl(name, `FAIL (required) → ${result.why}`);
  }
});

// the two halves of the notice claim, factored so the controls can drive them against SCRATCH text
function assertSixNotices(readme) {
  const normalized = readme.replace(/\n\s*/g, ' ');
  assert.ok(/SIX artefacts/.test(normalized) && /carries a copy of the repository's own `LICENSE`/.test(normalized),
    '§2.3 item 2 / distribution.md §4.2 item 1: the shipped README declares that EACH OF THE SIX artefacts carries a copy');
  assert.ok(/assembly step/.test(normalized), 'and names the assembly step that lands the copy (`§4.3` item 2; `Q3-5`)');
}
function assertAllowlistIsFour(files) {
  assert.deepEqual([...files].sort(),
    ['README.md', 'index.d.ts', 'index.mjs', 'src/constraint-kernel.mjs'],
    '§2.1 item 6: the main package\'s `files` array is FOUR entries — `index.mjs` · `README.md` · '
    + '`index.d.ts` plus the kernel\'s own package-root-relative path `src/constraint-kernel.mjs` — and '
    + 'NOTHING BESIDE THEM');
}

// =============================================================================================
// `NG-PUB-J` · `P-PUB-8` (`S-TAG`, `S-LAYER`) — A REAL TAG RESOLUTION, AND A DELIBERATELY WRONG
// `SITE`/`LAYER` PAIR ON A FIGURE ROW
// =============================================================================================
// **(1)** `P-PUB-8`'s property is *"The version equals the tag, no publication happens from an untagged
// commit"* and its only drive was `tagRule.test(\`v${manifest.version}\`)` — a string built from the
// version itself (`PUB-R-9`). **THE GENERATOR RESOLVES `refs/tags/v<version>` IN A REAL GIT REPOSITORY**
// and asserts the coupling there, and asserts the ABSENCE of any tag in the repository's own pre-release
// state — which is the declared state, not a missing instrument.
// **(2)** A figure row's `SITE` and `LAYER` are asserted as a PAIR, so a wrong pair is a finding.
//
// **⟶ RE-CUT 2026-10-11 BY THE TAG-STATE PASS (`role_test_writer`): ITEM `(1)`'S ABSENCE READING IS
// RE-EMITTED HERE VERBATIM SO `git diff` HAS NOTHING TO RECOVER** — *"and asserts the ABSENCE of any tag in
// the repository's own pre-release state — which is the declared state, not a missing instrument"* — **AND
// IT IS REPLACED BY THE PROPERTY `P-PUB-8` ACTUALLY PINS.** **THE RELEASE ACT CREATED THE STATE THAT READING
// DENIED**: at that date `git tag --list` answered `v0.1.1` — the run's own trigger — so the absence was a reading of the
// TREE'S DATE rather than of the clause. **THE PROPERTY IS COUPLING, NOT ABSENCE** (`release.md §2.1` item
// `2`; `PAR-PUB-29`'s second outside value, *"a tag whose version differs from the six manifests' →
// REFUSED"*): the tag whose name is `v<version>` EXISTS; its version EQUALS the main manifest's, read from
// the repository's OWN `git tag --list` and compared MECHANICALLY; the manifest AT that tag declares the same
// version; and the tag's commit is REACHABLE, lying on this branch's own history. **THE PRE-RELEASE STATE IS
// KEPT AS A FAIL-STATE DRIVEN BY NAME** (`control-no-tag-at-all` below), and the reading is STRICTLY STRONGER
// than the one it replaces: the as-filed absence held for every tree carrying no tag, including one whose
// manifest named a version no tag could ever carry. **AND NO TAG FIGURE IN THIS BLOCK IS OPERATIVE** (`DEF-2026-10-13-C`): every tag figure the coupling asserts is read at RUN TIME by `assertTagCoupling` below — which names no version of its own — and the dated `v0.1.1` above is THAT pass's own reading, kept as its record rather than re-cut at a figure this tree no longer carries.

const FIGURE_ROWS = [
  { value: 'the red set\'s reported failing set', site: 'bindings/js/test/publish.test.mjs', layer: 'ENVELOPE/PURE', app: 'NONE' },
  { value: 'the negative generators\' measured controls', site: 'bindings/js/test/publish-generators.test.mjs', layer: 'ENVELOPE/PURE', app: 'NONE' },
];
const LAYERS = new Set(['ENVELOPE/PURE', 'LIVE / ASSEMBLED PACKAGE', 'LIVE/INSTALL']);

function assertFigureRow(row, { root = REPO_ROOT } = {}) {
  assert.ok(LAYERS.has(row.layer) || /^LIVE/.test(row.layer),
    `a figure's LAYER is one of the declared layers; got ${JSON.stringify(row.layer)}`);
  assert.equal(row.app, 'NONE', 'acceptance.md §5.3 item 1: a node-suite figure is never `APP`-green');
  assert.ok(existsSync(join(root, row.site)), `the figure's SITE is a real home: ${row.site}`);
  assert.equal(row.layer, 'ENVELOPE/PURE',
    `the figure's LAYER must match the layer its SITE runs at; a wrong pair is void (acceptance.md §2.3)`);
}

/** Resolve `refs/tags/v<version>` in a REAL repository, and report the tag list. */
function resolveTagVersion(repo, version) {
  const listed = execFileSync('git', ['-C', repo, 'tag', '--list', `v${version}`], { encoding: 'utf8', timeout: 30000 }).trim();
  return { listed, present: listed === `v${version}` };
}

// **⟶ THE TAG-COUPLING INSTRUMENT, ADDED 2026-10-11 BY THE TAG-STATE PASS (`role_test_writer`) AND RE-CUT
// FROM THE ABSENCE READING THIS GENERATOR CARRIED.** **THE PROPERTY IS COUPLING, NOT ABSENCE** (`release.md
// §2.1` item `2` — *"THE MAIN PACKAGE'S `version` IS THAT TAG'S VERSION"*; `parameter-semantics.md §4.5`
// (`PAR-PUB-29`) — *"a tag whose version differs from the six manifests' → REFUSED"*), and the same
// instrument is driven against the SHIPPED repository and against every control's scratch repository alike,
// so a clause that cannot fail is reported as a finding rather than read as a pass.
/** `§2.1` item 1 — the tag's declared form, at one home (`PAR-PUB-29`). */
const TAG_FORM = /^v\d+\.\d+\.\d+$/;
/** **THE REPOSITORY'S OWN TAG LIST, UNFILTERED** (`git tag --list`): the coupling is a statement about the
 *  tags the repository CARRIES, and a name filter would hide exactly the tag `PAR-PUB-29` refuses. */
function repoTagList(repo) {
  return execFileSync('git', ['-C', repo, 'tag', '--list'], { encoding: 'utf8', timeout: 30000 })
    .split('\n').map((line) => line.trim()).filter((line) => line !== '');
}
/** The main manifest's own path, RELATIVE to the repository root — what `git show <tag>:<path>` reads. */
const MAIN_MANIFEST_REL = MAIN_MANIFEST.slice(REPO_ROOT.length + 1).split(sep).join('/');
/** **THE TAG'S COMMIT, NAMED AND PLACED**: the commit `refs/tags/v<version>` points at, and whether it lies
 *  on `HEAD`'s own history — `release.md §1.3` item `2` makes the provenance subject *"the TAGGED COMMIT OF
 *  THIS REPOSITORY"*, so a commit this branch does not carry names bytes no reader of this tree can reach. */
function tagCommit(repo, version) {
  const named = execFileSync('git', ['-C', repo, 'rev-parse', '--verify', `refs/tags/v${version}^{commit}`], {
    encoding: 'utf8', timeout: 30000,
  }).trim();
  let onHeadHistory = false;
  try {
    execFileSync('git', ['-C', repo, 'merge-base', '--is-ancestor', named, 'HEAD'], { encoding: 'utf8', timeout: 30000 });
    onHeadHistory = true;
  } catch {
    onHeadHistory = false;
  }
  return { named, onHeadHistory };
}
/** **THE COUPLING, AT FOUR MECHANICAL SITES** — the tag list's every tag against the manifest's version; the
 *  coupling's own tag resolved by `git`; the manifest AT the tag; and the tag's commit's reachability. */
function assertTagCoupling(repo, { version, label }) {
  assert.ok(TAG_FORM.test(`v${version}`), `${label}: \`§2.1\` item 1 — the tag's form is the version's`);
  assert.ok(!TAG_FORM.test('main') && !TAG_FORM.test('HEAD'),
    `${label}: \`§2.1\` item 3 — NO PUBLICATION HAPPENS FROM AN UNTAGGED COMMIT`);
  const listed = repoTagList(repo);
  const resolution = resolveTagVersion(repo, version);
  assert.equal(resolution.present, true,
    `${label}: \`release.md §2.1\` item 2 / \`PAR-PUB-29\` — the manifest declares \`${version}\`, so `
    + `\`v${version}\` IS the tag the coupling fixes and it must EXIST. \`git tag --list\`: ${JSON.stringify(listed)}`);
  assert.equal(resolution.listed, `v${version}`, `${label}: the resolution's own return value is read`);
  for (const tag of listed) {
    assert.ok(TAG_FORM.test(tag), `${label}: every tag this repository carries has the declared form; got \`${tag}\``);
    assert.equal(tag.slice(1), version,
      `${label}: \`§2.1\` item 2 / \`PAR-PUB-29\` — THE TAG'S VERSION AND THE MAIN MANIFEST'S \`version\` DIVERGE: `
      + `\`${tag}\` carries \`${tag.slice(1)}\` where the manifest declares \`${version}\`, and a tag whose version `
      + 'differs from the six manifests\' is REFUSED');
  }
  const atTag = JSON.parse(execFileSync('git', ['-C', repo, 'show', `${resolution.listed}:${MAIN_MANIFEST_REL}`], {
    encoding: 'utf8', timeout: 30000,
  })).version;
  assert.equal(atTag, version,
    `${label}: \`PAR-PUB-18\` — THE MANIFEST AT THE TAG (\`${resolution.listed}:${MAIN_MANIFEST_REL}\`) declares `
    + `\`${atTag}\` WHERE THE COUPLING FIXES \`${version}\`: the tag and the manifest DIVERGE, which the coupling `
    + 'rule REFUSES');
  const { named, onHeadHistory } = tagCommit(repo, version);
  assert.match(named, /^[0-9a-f]{40}$/, `${label}: the tag names a commit object: ${JSON.stringify(named)}`);
  assert.equal(onHeadHistory, true,
    `${label}: \`release.md §1.3\` item 2 — the tag's commit \`${named}\` must be REACHABLE, lying on THIS `
    + 'branch\'s own history, so the bytes the tag names are the bytes this tree carries');
  return { version, tags: listed, tag: resolution.listed, commit: named };
}
/** **ONE SCRATCH GIT REPOSITORY PER CONTROL, OUTSIDE THIS ONE** (`CONTROL_ROOT`), carrying the main manifest
 *  at `MAIN_MANIFEST_REL`'s own path, one commit, and the tag the caller names. */
function scratchTagRepo(label, { name, manifestVersion, tagName }) {
  const dir = mkdtempSync(join(CONTROL_ROOT, `tag-${label}-`));
  mkdirSync(dirname(join(dir, MAIN_MANIFEST_REL)), { recursive: true });
  execFileSync('git', ['init', '--quiet', dir], { timeout: 30000 });
  execFileSync('git', ['-C', dir, 'config', 'user.email', 'generator@pubred.invalid'], { timeout: 30000 });
  execFileSync('git', ['-C', dir, 'config', 'user.name', 'pubred generator'], { timeout: 30000 });
  writeFileSync(join(dir, MAIN_MANIFEST_REL), JSON.stringify({ name, version: manifestVersion }, null, 2));
  execFileSync('git', ['-C', dir, 'add', MAIN_MANIFEST_REL], { timeout: 30000 });
  execFileSync('git', ['-C', dir, 'commit', '--quiet', '-m', 'the generator\'s own scratch manifest'], { timeout: 30000 });
  if (tagName !== null) execFileSync('git', ['-C', dir, 'tag', tagName], { timeout: 30000 });
  return dir;
}

generator('NG-PUB-J', 'the version equals a resolved tag, and every figure row\'s site/layer pair holds', (recordControl) => {
  const mainManifest = JSON.parse(readFileSync(MAIN_MANIFEST, 'utf8'));
  const version = mainManifest.version;
  const shipped = measureAgainst('NG-PUB-J', null, () => {
    // **(1a) THE REPOSITORY'S OWN STATE: THE COUPLING, DRIVEN AS AN EQUALITY** — the tag `v<version>` exists in
    // the repository's own `git tag --list`, its version is the main manifest's, the manifest AT the tag agrees
    // character for character, and the tag's commit lies on this branch's own history. **THE AS-FILED READING
    // ASSERTED THE ABSENCE OF THAT TAG, WHICH IS A FACT ABOUT THE TREE'S DATE AND NOT ABOUT THE CLAUSE.**
    const coupling = assertTagCoupling(REPO_ROOT, { version, label: 'the shipped repository' });
    // **(1b) THE MECHANISM IS NOT VACUOUS**: a scratch repository whose tag and manifest AGREE passes the SAME
    // instrument, so the equality above is answered by the tree rather than by the instrument's strictness.
    const agreeing = scratchTagRepo('agreeing', { name: mainManifest.name, manifestVersion: version, tagName: `v${version}` });
    const agreed = assertTagCoupling(agreeing, { version, label: 'the agreeing scratch repository' });
    assert.notEqual(agreed.commit, coupling.commit, 'the two repositories are not the same repository');
    // **(2)** EVERY FIGURE ROW, PAIRED
    for (const row of FIGURE_ROWS) assertFigureRow(row);
  });
  assert.equal(shipped.verdict, 'PASS', `NG-PUB-J: THE PROPERTY DOES NOT HOLD AT THE SHIPPED BYTES — ${shipped.why}`);
  recordControl('SHIPPED-BYTES', 'PASS (required)');
  const controls = {
    // **THE STATE THE AS-FILED READING ASSERTED, AND IT IS A FAIL-STATE OF THE COUPLING AND NOT A PASS**: a
    // repository carrying NO tag names no version at all, so nothing could be published from it (`§2.1` item 3).
    'control-no-tag-at-all': () => {
      const repo = scratchTagRepo('untagged', { name: mainManifest.name, manifestVersion: version, tagName: null });
      assertTagCoupling(repo, { version, label: 'the untagged control' });
    },
    // **THE REQUIRED NON-VACUITY CONTROL: A TAG WHOSE VERSION DIFFERS FROM THE MANIFEST'S.** The tag's own name
    // IS the coupling's (`v${version}`) and the manifest AT that tag declares `9.9.9` — so the equality the rule
    // pins is broken by DIVERGENCE and by nothing else.
    'control-a-tag-whose-version-differs': () => {
      const repo = scratchTagRepo('divergent', { name: mainManifest.name, manifestVersion: '9.9.9', tagName: `v${version}` });
      assertTagCoupling(repo, { version, label: 'the divergent-version control' });
    },
    // **AND THE SAME DIVERGENCE AT THE TAG LIST'S OWN SITE**: a tag whose NAME carries another version, beside
    // a manifest at the coupling's own version — `PAR-PUB-29` reads the coupling in the tags a repository carries.
    'control-a-tag-naming-another-version': () => {
      const repo = scratchTagRepo('othername', { name: mainManifest.name, manifestVersion: version, tagName: 'v9.9.9' });
      assertTagCoupling(repo, { version, label: 'the other-name control' });
    },
    // **AND ONE CONTROL FOR THE REACHABILITY CLAUSE: THE TAG'S COMMIT IS NOT ON THIS BRANCH'S OWN HISTORY.** The
    // tag is cut at the control's own commit and its `HEAD` then moves to an ORPHAN root, so the tag still
    // resolves — and names a commit this branch does not carry (`release.md §1.3` item 2).
    'control-a-tag-outside-this-history': () => {
      const repo = scratchTagRepo('orphan', { name: mainManifest.name, manifestVersion: version, tagName: `v${version}` });
      execFileSync('git', ['-C', repo, 'checkout', '--quiet', '--orphan', 'elsewhere'], { timeout: 30000 });
      execFileSync('git', ['-C', repo, 'commit', '--quiet', '--allow-empty', '-m',
        'a history the tag is not part of'], { timeout: 30000 });
      assertTagCoupling(repo, { version, label: 'the unreachable-tag control' });
    },
    'control-a-wrong-site-layer-pair': () =>
      assertFigureRow({ value: 'a figure row', site: 'bindings/js/test/publish.test.mjs', layer: 'LIVE / ASSEMBLED PACKAGE', app: 'NONE' }),
    'control-a-figure-row-with-no-site': () =>
      assertFigureRow({ value: 'a figure row', site: 'bindings/js/test/not-a-file.mjs', layer: 'ENVELOPE/PURE', app: 'NONE' }),
  };
  for (const [name, control] of Object.entries(controls)) {
    const result = measureAgainst('NG-PUB-J', name, control);
    assert.equal(result.verdict, 'FAIL',
      `${name} DOES NOT FAIL THIS GENERATOR — it disables the property and the generator answered PASS (PUB-R-9)`);
    recordControl(name, `FAIL (required) → ${result.why}`);
  }
});
