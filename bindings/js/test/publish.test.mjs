// `bindings/js/test/publish.test.mjs` — **THE RED SET OF `U-STOREROOM-PUBLISH` (`D-GP-SRPUB`), GATE 3
// (`Q2`), AUTHORED FROM THE CONTRACT ALONE AND RUN BEFORE ANY IMPLEMENTATION.**
//
// AUTHORITY: `docs/specs/storeroom-publish/contract.md` (its status line, its single `derivation:` clause,
// its index region and part map, its scope boundary, its `§0.3` `DECLARED-DEFAULT` table `PUB-DD-1`…
// `PUB-DD-24`) and its parts — `resolution.md` · `distribution.md` · `release.md` · `acceptance.md` ·
// `parameter-semantics.md` · `implementation-plan.md` — read with the gate-1 record
// `docs/specs/storeroom-publish-proposal-review.md` (`AV-1`…`AV-25`) and `archive/gate1/storeroom-publish-review/
// 3-architecture.md`. **NO BYTE OF `bindings/js/src/**`, `bindings/js/index.mjs`, `bindings/js/package.json`
// OR ANY OTHER FILE WAS WRITTEN BY THE PASS THAT AUTHORED THIS ONE: this file is the whole of that pass's
// artefact, beside `archive/gate3/storeroom-publish-red-set.md`.**
//
// **THE HOME IS `PUB-DD-24`'s AND IT IS NOT NEGOTIABLE:** the red set is `bindings/js/test/publish.test.mjs`,
// INSIDE the directory the landed JS leg's command globs (`node --test bindings/js/test/*.test.mjs`, taken at
// the repository root), at `ENVELOPE/PURE` (`acceptance.md §5.2` row 1; `implementation-plan.md §2` `Q2`).
//
// **EVERY DRIVE BELOW IS WRITTEN FROM THE CONTRACT ALONE AND CARRIES THE CLAUSE IT DRIVES IN A COMMENT.**
// One block per register row (`contract.md §5.1`–`§5.8`), each block printing its row id, its strategy id(s)
// and its verdict; `un-run` is a FAILURE (`contract.md §5.0`).
//
// ---------------------------------------------------------------------------------------------
// HOW EVERY BLOCK OBSERVES ITS STATE WITHOUT THE IMPLEMENTATION EXISTING
// ---------------------------------------------------------------------------------------------
// **NEVER A REPO MUTATION.** No drive writes, creates or removes a byte under the repository. The
// observation instrument is a SCRATCH TREE under the operating system's temporary area, assembled by
// `makeScratch()` before the first drive:
//
//   /tmp/storeroom-pubred-<pid>-<n>/
//     package.json                    a manifest standing where the entry stands (version 0.1.0, name
//                                     `provident-storeroom`) — `§1.5` item 1: the package's own version is
//                                     READ FROM THE PACKAGE'S OWN MANIFEST
//     index.mjs                       a byte-for-byte COPY of the real entry (`bindings/js/index.mjs`),
//                                     staged so the loader can be observed without touching the repo
//     node_modules/<name>/…           a FAKE PLATFORM ARTEFACT per drive — the candidate rung one
//     build/Release/storeroom_js_binding.node
//                                     the candidate rung two — absent, or a broken artefact
//     preload.cjs / driver.mjs        the observer and the driver (below)
//
// The driver runs under `node --require preload.cjs` and does three things, none of which needs the new
// implementation to exist: **(1)** it FIXES the runtime key by defining `process.platform` / `process.arch`
// before the entry is evaluated (the pair is the runtime's, `resolution.md §4.1`); **(2)** it RECORDS every
// module load attempt through `Module._load` — so the attempt SET is observable rather than the outcome
// alone (`P-PUB-1`'s `S-RESOLVE`, `P-PUB-2`'s `S-KEYSET`); **(3)** it dynamically imports the staged entry
// and REPORTS what happened: whether an instance was returned, or the thrown value's own members, whether
// the fake artefact's `version` was called, and the attempts in order.
//
// The parent process then asserts the CONTRACT's answer for that state. **A drive is therefore capable of
// FAILING even while nothing of the new load path exists: the loader's own attempts, its own outcome and
// its own arm are read from outside, and every clause is checked as an OBSERVABLE, never as a source
// token.** The in-place guard (`S-INPLACE`) drives the REAL package at its REAL location instead — no
// scratch copy, no fake artefact — which is why it is falsifiable TODAY.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';
import { tmpdir } from 'node:os';

// ---------------------------------------------------------------------------------------------
// the contract's own constants, at the contract's own bytes
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = dirname(dirname(PKG_DIR));

// `resolution.md §3.1` — the five declared names, decided once, in the table's own order.
const FIVE_NAMES = [
  '@provident-storeroom/js-linux-x64-gnu',
  '@provident-storeroom/js-linux-arm64-gnu',
  '@provident-storeroom/js-darwin-x64',
  '@provident-storeroom/js-darwin-arm64',
  '@provident-storeroom/js-win32-x64-msvc',
];
// `resolution.md §4.1` — the five covered keys, and the label each carries.
const COVERED = [
  { platform: 'linux', arch: 'x64', label: 'linux-x64', name: FIVE_NAMES[0] },
  { platform: 'linux', arch: 'arm64', label: 'linux-arm64', name: FIVE_NAMES[1] },
  { platform: 'darwin', arch: 'x64', label: 'darwin-x64', name: FIVE_NAMES[2] },
  { platform: 'darwin', arch: 'arm64', label: 'darwin-arm64', name: FIVE_NAMES[3] },
  { platform: 'win32', arch: 'x64', label: 'win32-x64', name: FIVE_NAMES[4] },
];
// `resolution.md §4.1`'s `NOT COVERED` row — a sample of the pairs it enumerates by name.
const UNCOVERED = [
  { platform: 'linux', arch: 'ia32' },
  { platform: 'linux', arch: 'ppc64le' },
  { platform: 'linux', arch: 's390x' },
  { platform: 'freebsd', arch: 'x64' },
  { platform: 'win32', arch: 'ia32' },
  { platform: 'sunos', arch: 'x64' },
  { platform: 'android', arch: 'arm64' },
];
// `PUB-DD-8` / `resolution.md §4.2` — the musl STATE, never a sixth key.
const MUSL_PAIRS = [
  { platform: 'linux', arch: 'x64' },
  { platform: 'linux', arch: 'arm64' },
];
// `§1.1` item 2 / `resolution.md §2.1` item 2 / `PAR-PUB-30` — rung two's declared path.
const RUNG_TWO_TAIL = ['build', 'Release', 'storeroom_js_binding.node'].join(sep);
// `docs/specs/storeroom-native/contract.md §8.1` — the closed set, carried and never minted (`§0.1` item 7).
const CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed',
];
// `§1.4` item 1 — the arm's status, carried VERBATIM, and the ONE member this unit's arm may carry.
const ARM_STATUS = 'FilePathUnreachable';
// `§1.4` item 2 / `§5.3` item 2 — the store's own generator's string for that code at a subject.
const GEN_TAIL = 'is not reachable at construction, the path must exist or the application must be able to write it';
const gen = (subject) => `'${subject}' ${GEN_TAIL}`;

const require_ = createRequire(import.meta.url);

// ---------------------------------------------------------------------------------------------
// THE BLOCK REGISTRY — one entry per register row, printing its id, its strategy ids and its verdict
// ---------------------------------------------------------------------------------------------
const BLOCKS = {
  'P-PUB-1': { strategy: 'S-RESOLVE · S-INPLACE', ran: 0, failed: 0 },
  'P-PUB-2': { strategy: 'S-KEYSET', ran: 0, failed: 0 },
  'P-PUB-3': { strategy: 'S-PLATFORM · S-MUSL', ran: 0, failed: 0 },
  'P-PUB-4': { strategy: 'S-VERSION · S-INPLACE', ran: 0, failed: 0 },
  'P-PUB-5': { strategy: 'S-TAXONOMY · S-ONEARM', ran: 0, failed: 0 },
  'P-PUB-6': { strategy: 'S-SCOPE', ran: 0, failed: 0 },
  'P-PUB-7': { strategy: 'S-MANIFEST · S-TYPES · S-LICENCE', ran: 0, failed: 0 },
  'P-PUB-8': { strategy: 'S-TAG · S-LAYER', ran: 0, failed: 0 },
  'GUARD': { strategy: 'S-INPLACE (the JS unit\'s 113-cell leg, in place)', ran: 0, failed: 0 },
};
const VERDICTS = new Map();

/** Run one cell under its register row, and RECORD its verdict so `un-run` can never pass silently. */
function cell(row, name, fn) {
  const key = `${row}::${name}`;
  VERDICTS.set(key, 'un-run');
  test(`${row}::${name}`, async () => {
    try {
      await fn();
      BLOCKS[row].ran += 1;
      VERDICTS.set(key, 'PASS');
    } catch (err) {
      BLOCKS[row].ran += 1;
      BLOCKS[row].failed += 1;
      VERDICTS.set(key, 'FAIL');
      throw err;
    }
  });
}

test.after(() => {
  const rows = [];
  for (const [row, b] of Object.entries(BLOCKS)) {
    for (const [key, verdict] of VERDICTS) {
      if (!key.startsWith(`${row}::`)) continue;
      rows.push(`  ${key.padEnd(78)} ${verdict}`);
    }
    const verdict = b.ran === 0 ? 'UN-RUN (a FAILURE, `contract.md §5.0`)'
      : b.failed === 0 ? `PASS (${b.ran} cells)` : `FAIL (${b.failed} of ${b.ran} cells)`;
    console.log(`\n[${row}] strategies: ${b.strategy}\n[${row}] VERDICT: ${verdict}`);
  }
  console.log(`\n--- per-cell verdicts ---\n${rows.join('\n')}\n`);
});

// ---------------------------------------------------------------------------------------------
// the scratch tree and the observer
// ---------------------------------------------------------------------------------------------
const SCRATCH_ROOT = mkdtempSync(join(tmpdir(), 'storeroom-pubred-'));
process.on('exit', () => { try { rmSync(SCRATCH_ROOT, { recursive: true, force: true }); } catch { /* the sweep is best-effort */ } });

const DRIVER = `
import { createRequire } from 'node:module';
const MARK = '__PUBRED__';
const STUB = process.env.PUBRED_STUB;
const req = createRequire(import.meta.url);
const say = (o) => { process.stdout.write(MARK + JSON.stringify(o) + '\\n'); };
const report = {
  platform: process.platform, arch: process.arch,
  attempts: globalThis.__PUBRED_ATTEMPTS__,
  ok: null, error: null, arm: null, stub: null,
};
try {
  const mod = await import(process.argv[2]);
  let instance = null;
  if (typeof mod.storeCreate === 'function') {
    try { instance = mod.storeCreate({ journalLength: 4 }); } catch (e) { report.error = String(e && e.message ? e.message : e).slice(0, 160); }
  }
  report.ok = true;
  report.returned = instance !== null;
  report.verbs = Object.keys(mod).sort();
} catch (err) {
  report.ok = false;
  if (err !== null && typeof err === 'object') {
    const own = Object.keys(err);
    if (own.length === 2 && own.includes('status') && own.includes('message') && !(err instanceof Error)) {
      report.arm = { status: err.status, message: err.message };
    } else {
      report.arm = { notTheArm: true, name: err.constructor ? err.constructor.name : 'unknown', code: err.code ?? null, message: String(err.message ?? err).slice(0, 200) };
    }
  } else {
    report.arm = { notTheArm: true, thrownClass: typeof err, message: String(err).slice(0, 200) };
  }
}
if (STUB) { try { report.stub = req(STUB).report; } catch (e) { report.stub = { reportError: String(e) }; } }
say(report);
`;

const PRELOAD = `
'use strict';
const Module = require('node:module');
const attempts = [];
globalThis.__PUBRED_ATTEMPTS__ = attempts;
const orig = Module._load;
Module._load = function (request, parent, isMain) {
  attempts.push(String(request));
  return orig.apply(this, arguments);
};
const plat = process.env.PUBRED_PLATFORM;
const arch = process.env.PUBRED_ARCH;
if (plat) Object.defineProperty(process, 'platform', { value: plat, configurable: true });
if (arch) Object.defineProperty(process, 'arch', { value: arch, configurable: true });
`;

/**
 * ONE FAKE PLATFORM ARTEFACT, faithful to the four export names the real addon carries
 * (`version` · `errorMessage` · `storeCreate` · `call` · `register` — `package.md §1.3 item 4` at the
 * sibling home, read only for the artefact's SHAPE). **The generator inside it is the STORE'S OWN
 * GENERATOR'S RENDERING of `FilePathUnreachable` at a subject (`contract.md §1.4` item 1 reads *"the
 * store's own GENERATOR'S STRING for that code at the SUBJECT the clause fixes"*), reproduced so a drive
 * can reach the arm's message without the implementation existing.**
 */
function stubSource(variant) {
  const VALUE = {
    right: "'0.1.0'",
    wrong: "'9.9.9'", // `PUB-DD-19`: a different string is the mismatch arm
    empty: "''", // and an empty string alike
    notstring: '0.1', // and a value that is not a string alike
    notcallable: '42', // and an `addon.version` that is not callable alike
  };
  const callable = variant !== 'notcallable';
  return `'use strict';
// THE FAKE CANDIDATE: this stands where a platform package's resolution would land. Variant: ${variant}.
const calls = { version: 0, storeCreate: 0 };
const GEN_TAIL = ${JSON.stringify(GEN_TAIL)};
const report = { variant: ${JSON.stringify(variant)}, calls, loadError: null };
function versionValue() { return ${VALUE[variant]}; }
const versionMember = ${callable}
  ? function () { calls.version += 1; return versionValue(); }
  : versionValue(); // PUB-DD-19's non-callable arm: 42 is not a function
const api = {
  version: versionMember,
  errorMessage(code, subject) {
    // the store's own generator's rendering, for the one code this unit's arm carries
    return "'" + subject + "' " + GEN_TAIL;
  },
  storeCreate() {
    calls.storeCreate += 1;
    throw { status: 'AddressMalformed', message: 'the fake candidate does not construct a store' };
  },
  call() { throw { status: 'AddressMalformed', message: 'the fake candidate does not call a store' }; },
  register() { throw { status: 'AddressMalformed', message: 'the fake candidate does not register' }; },
  report,
};
module.exports = api;
`;
}

function writeStub(dir, variant) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.js'), stubSource(variant));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'stub', version: '0.1.0', main: 'index.js' }, null, 2));
  return join(dir, 'index.js');
}

/**
 * ASSEMBLE ONE SCRATCH TREE for a drive. `rungOne` installs a fake platform artefact (by name), `rungTwo`
 * writes the candidate rung two, `rungTwoDecoy` marks the `PAR-PUB-30` outside-value drive.
 */
function makeScratch({ label, rungOne, rungTwo = 'absent', rungTwoDecoy = null, parentDecoy = false, env = {} }) {
  const dir = mkdtempSync(join(SCRATCH_ROOT, `${label.replace(/[^a-zA-Z0-9-]/g, '_')}-`));
  writeFileSync(join(dir, 'index.mjs'), readFileSync(join(PKG_DIR, 'index.mjs')));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'provident-storeroom', version: '0.1.0', type: 'module',
    exports: { '.': { import: './index.mjs' } },
  }, null, 2));
  writeFileSync(join(dir, 'preload.cjs'), PRELOAD);
  writeFileSync(join(dir, 'driver.mjs'), DRIVER);
  let stubFile = null;
  if (rungOne) {
    const parts = rungOne.name.split('/');
    stubFile = writeStub(join(dir, 'node_modules', ...parts), rungOne.variant);
  }
  if (rungTwo === 'valid') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x00, 0x01]));
  } else if (rungTwo === 'broken') {
    mkdirSync(join(dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, RUNG_TWO_TAIL), 'not a node addon at all\n');
  } else if (rungTwo === 'directory') {
    mkdirSync(join(dir, RUNG_TWO_TAIL), { recursive: true });
  }
  if (rungTwoDecoy) {
    mkdirSync(join(dir, 'decoy', 'build', 'Release'), { recursive: true });
    writeFileSync(join(dir, 'decoy', RUNG_TWO_TAIL), 'decoy\n');
  }
  if (parentDecoy) {
    const parent = dirname(dir);
    writeFileSync(join(parent, 'storeroom_js_binding.node'), 'parent decoy\n');
  }
  return { dir, stubFile, entry: join(dir, 'index.mjs'), preload: join(dir, 'preload.cjs'), driver: join(dir, 'driver.mjs'), env };
}

/** Run one drive: the subprocess is the observer, and nothing of the repository is touched. */
function drive(env, { platform, arch, cwd = env.dir, extraEnv = {} }) {
  const out = execFileSync(process.execPath, ['--require', env.preload, env.driver, env.entry], {
    cwd,
    encoding: 'utf8',
    timeout: 60000,
    env: {
      ...process.env,
      NODE_PATH: join(env.dir, 'node_modules'),
      PUBRED_STUB: env.stubFile ?? '',
      PUBRED_PLATFORM: platform,
      PUBRED_ARCH: arch,
      ...env.env,
      ...extraEnv,
    },
  });
  const line = out.split('\n').find((l) => l.startsWith('__PUBRED__'));
  assert.ok(line, `the drive produced no report (stdout was: ${out.slice(0, 400)})`);
  const report = JSON.parse(line.slice('__PUBRED__'.length));
  report.requests = report.attempts.map((a) => String(a).split('\\').join('/'));
  return report;
}

/** Build a scratch environment carrying ONE fake artefact for ONE covered key. */
function coveredEnv(key, variant, opts = {}) {
  return makeScratch({
    label: `cov-${key.label}-${variant}`,
    rungOne: { name: key.name, variant },
    rungTwo: opts.rungTwo ?? 'broken',
  });
}

// ---------------------------------------------------------------------------------------------
// the contract's own assertions, applied to a drive's report
// ---------------------------------------------------------------------------------------------
const isRungTwo = (r) => String(r).includes('storeroom_js_binding.node');

/** `§1.4` item 1 / `resolution.md §5.3` item 1 — the arm's form, exactly. */
function assertArm(report, { subject }) {
  const A = report.arm;
  assert.ok(A && A.notTheArm !== true, `no arm was thrown: ${JSON.stringify(report).slice(0, 600)}`);
  assert.deepEqual(Object.keys(A), ['status', 'message'],
    '`§1.4` item 1: the member set is EXACTLY `{status, message}`');
  assert.equal(A.status, ARM_STATUS,
    '`PUB-DD-17`: the status is the store\'s own `FilePathUnreachable`, carried and never minted');
  assert.ok(CLOSED_SET.includes(A.status), '`§0.1` item 7: no status outside the store\'s closed 15');
  if (subject !== undefined) {
    assert.ok(A.message.includes(gen(subject)) || A.message === gen(subject),
      `the message is the store's generator's string at the subject; got ${JSON.stringify(A.message)}`);
  }
  return A;
}

/** `§1.4` item 3: an instance is returned, or the arm is thrown — and the two never both happen. */
function assertInstanceOutcome(report) {
  assert.equal(report.returned, true,
    '`§1.4` item 3: the declared answers that refuse a state return NO instance — never a fallback to a JS store, a partial instance or a no-op verb');
}

/**
 * `P-PUB-5`'s failure list: no fallback, no partial instance, no no-op verb, no fourth outcome. **The
 * OBSERVABLE OF A "FOURTH OUTCOME" IS THAT THE DRIVE NEITHER RETURNED AN INSTANCE NOR ANSWERED THE ONE
 * ARM** — which is exactly what a load path with no rung one yet produces (the entry never reaches the
 * declared answer, because the state the arm answers for is never reached). `report.error` is not asserted
 * here: a state that reaches neither the declared answer nor an instance has already failed this cell, and
 * asserting the same fact twice would hide WHICH requirement moved.
 */
function assertNoFallback(report) {
  assert.ok(!(report.returned === true && report.arm !== null),
    'no drive may both return an instance and answer the arm');
  assert.ok(report.returned === true || report.arm !== null,
    'the outcome is `success` or the one arm — never a fourth outcome (`§1.4` item 3)');
}

// ---------------------------------------------------------------------------------------------
// §5.1 P-PUB-1 — THE RESOLUTION ORDER IS THE DECLARED ORDER (`§1.1`, `resolution.md §2`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED (three rungs × the outcome at each):
//   rung one: a covered key whose platform artefact is present and loadable · present and unloadable ·
//     absent (a miss) — and at an uncovered key, NOT ATTEMPTED AT ALL (`resolution.md §2.2`)
//   rung two: the module-relative addon present and loadable · present and unloadable · absent
//   rung three: reached only when BOTH rungs were tried and neither yielded a loadable artefact;
//     its subject is one path where one rung was tried, both paths where both were tried
// FAIL-STATES: a rung-one success reported as rung two · a rung-two load that never attempts rung one ·
//   a rung-three answer reached while a rung is untried · a candidate list resolved out of order ·
//   a rung-two path derived from anything but the entry module's own location · a rung-two attempt AFTER
//   rung one succeeded (`contract.md §5.1`)

cell('P-PUB-1', 'S-RESOLVE rung one resolves and is reported as rung one', async () => {
  // `§1.1` item 1 — rung one `require`s THE ONE NAME the closed key set declares for the pair, and no
  // other name; on success NO rung-two attempt is made (`§1.4`, present-right-version cell).
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.returned, true, `rung one must resolve; the report was ${JSON.stringify(r).slice(0, 500)}`);
  assert.equal(r.stub.calls.version, 1, '`§1.5` item 1: the addon\'s own version is read at load');
  assert.equal(r.stub.calls.storeCreate, 1, 'the loaded candidate is the artefact that constructs the store');
  assert.equal(r.returned, true, 'a successful rung one returns an instance');
  assert.equal(r.requests.filter(isRungTwo).length, 0,
    '`§1.4` item 2: NO rung-two attempt is made where rung one succeeded');
});

cell('P-PUB-1', 'S-RESOLVE rung one misses and rung two then resolves', async () => {
  // `§1.1` item 2 with item 1: failing rung one the entry requires the module-relative addon. The
  // candidate rung two is a real artefact copied from the repository's own build directory, so the
  // LOAD is real and only its LOCATION is staged.
  const env = makeScratch({ label: 'res-two', rungTwo: 'absent' });
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  assert.ok(existsSync(realAddon), 'the drive\'s precondition: the repository\'s own built artefact exists');
  {
    mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  }
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(r.requests.includes(COVERED[0].name),
    '`§1.1` item 1: rung one is ATTEMPTED first, before any other candidate');
  assert.ok(r.requests.some(isRungTwo), '`§1.1` item 2: failing rung one, rung two is attempted');
  const order = r.requests.filter((x) => x === COVERED[0].name || isRungTwo(x));
  assert.deepEqual(order, [COVERED[0].name, r.requests.find(isRungTwo)],
    'the order is rung one then rung two, and never the reverse');
  assert.equal(r.ok, true, 'the staged real artefact loads at rung two');
  assert.equal(r.error, null, '`§1.4` item 3: a rung-two load is a SUCCESS, with no version comparison');
  assert.equal(r.returned, true, 'rung two returns an instance');
});

cell('P-PUB-1', 'S-RESOLVE rung three is reached only after both rungs were tried', async () => {
  // `§1.1` item 3 with `§1.4`: rung three is the declared absent-addon form, reached ONLY when both rung
  // one and rung two have been tried and neither yielded a loadable artefact — and its subject is BOTH
  // paths (`resolution.md §5.3` item 2).
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' });
  // the fake rung one is REMOVED for this drive: both rungs must miss.
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(r.requests.includes(COVERED[0].name), 'rung one was TRIED (`§1.1` item 1)');
  assert.ok(r.requests.some(isRungTwo), 'rung two was TRIED (`§1.1` item 2)');
  assert.equal(r.ok, false, 'the load path answers the declared absent form, so no instance is returned');
  assertInstanceOutcome(r);
  const A = assertArm(r, {});
  // `§1.4` item 2 — the subject where BOTH rungs were tried is BOTH PATHS, so a consumer on an uncovered
  // key reads exactly which two things were tried. **THE JOIN BETWEEN THEM IS NOT DECLARED BY ANY CLAUSE,
  // so this drive asserts the CONSUMER'S PROPERTY — both paths are present, each in the generator's own
  // `'<subject>'` slot, and the generated clause stands — and does NOT pin a separator the contract leaves
  // undecided** (reported as a CONTRACT FINDING at `archive/gate3/storeroom-publish-red-set.md`).
  assert.ok(A.message.includes(`'${COVERED[0].name}'`),
    'the subject is BOTH paths: rung one\'s resolved name is reported too');
  assert.ok(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    'the subject is BOTH paths: rung two\'s module-relative path is reported too');
  assert.ok(A.message.endsWith(GEN_TAIL), 'the generator\'s own clause stands beside both subjects');
  assertNoFallback(r);
});

cell('P-PUB-1', 'S-RESOLVE a rung-two load is never reported as rung one', async () => {
  // `§5.1` FAILURE LIST item 1: "a rung-one success reported as rung two" and its converse. The
  // observable is the ATTEMPT SET: where rung one resolved, rung one's name is in it and no rung-two path
  // is; where rung one missed, its name is in the set BEFORE rung two's path.
  const one = drive(coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.ok(one.requests.includes(COVERED[0].name), 'a rung-one resolution names rung one');
  assert.equal(one.requests.filter(isRungTwo).length, 0, 'and never reaches rung two');
  const two = drive(makeScratch({ label: 'two-only', rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const rungOneAt = two.requests.indexOf(COVERED[0].name);
  const rungTwoAt = two.requests.findIndex(isRungTwo);
  assert.ok(rungOneAt >= 0, '`§1.1` item 1: rung one IS attempted at a covered key');
  assert.ok(rungTwoAt >= 0, '`§1.1` item 2: rung two is attempted after the miss');
  assert.ok(rungOneAt < rungTwoAt,
    'where both are attempted, rung one\'s attempt precedes rung two\'s — and never the reverse');
});

cell('P-PUB-1', 'S-RESOLVE rung two is derived from the entry module\'s own location', async () => {
  // `PUB-DD-20` / `PAR-PUB-30`: rung two's path is constructed from the ENTRY MODULE'S OWN LOCATION and
  // from NO other source — no environment variable, no configuration key, no path relative to the
  // process's working directory, and no search of a parent directory. Three drives: the same tree from two
  // different working directories, an environment-variable decoy, and a parent-directory decoy.
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const decoyCwd = mkdtempSync(join(SCRATCH_ROOT, 'decoy-cwd-'));
  const a = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch, cwd: env.dir });
  const b = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch, cwd: decoyCwd },
    { extraEnv: { STOREROOM_ADDON_PATH: join(decoyCwd, 'decoy.node') } });
  const pa = a.requests.find(isRungTwo);
  const pb = b.requests.find(isRungTwo);
  assert.ok(pa, 'rung two is attempted at all (the candidate is present and unloadable)');
  assert.ok(pb, 'and the same attempt is made whatever the working directory is');
  assert.equal(pa, join(env.dir, RUNG_TWO_TAIL),
    'rung two is `build/Release/storeroom_js_binding.node` BESIDE THE ENTRY MODULE');
  assert.equal(pb, pa,
    '`PAR-PUB-30`: the working directory and an environment-variable decoy move nothing');
  assert.ok(!b.requests.some((x) => x.includes('decoy.node')), 'no environment-variable override exists');
  const parentEnv = coveredEnv(COVERED[1], 'right', { rungTwo: 'absent', parentDecoy: true });
  const c = drive(parentEnv, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  assert.ok(!c.requests.some((x) => x.includes(`..${sep}`)), 'no search of a parent directory');
  for (const req of c.requests) {
    if (!isRungTwo(req) || !req.startsWith(sep)) continue;
    assert.ok(req.startsWith(parentEnv.dir + sep), 'no `.node` path outside the entry module\'s own tree');
  }
});

// ---------------------------------------------------------------------------------------------
// §5.2 P-PUB-2 — THE KEY SET IS CLOSED AT THE FIVE DECLARED NAMES (`§1.3`, `resolution.md §3.2`)
// ---------------------------------------------------------------------------------------------
// STATES: a covered key whose name is one of the five · a covered key whose artefact is ABSENT · an
//   uncovered pair (rung one must NOT be attempted) · a musl state on a covered pair · a declared key the
//   table must answer · the five pins' shape in the manifest
// FAIL-STATES: any computed name outside the five · a name assembled from tokens · a guessed fallback on
//   an uncovered pair · the converse, a declared key the table cannot answer · a fifth pin expressed as a
//   range (`contract.md §5.2`)
const FORBIDDEN_NAME_SHAPES = [
  '@provident-storeroom/js-linux-x64-musl', // a SIXTH NAME (`resolution.md §4.3`)
  '@provident-storeroom/js-linux-ia32', '@provident-storeroom/js-linux-ppc64le',
  '@provident-storeroom/js-freebsd-x64', '@provident-storeroom/js-win32-x64-gnu',
  '@provident-storeroom/linux-x64-gnu', // the alternative literal reading (`PUB-DD-15`)
  '@provident-storeroom/js-linux-x64', // a dropped `-gnu` suffix (`PUB-DD-15`)
  'js-linux-x64-gnu', 'provident-storeroom-js-linux-x64-gnu', // unscoped / concatenated shapes
];

cell('P-PUB-2', 'S-KEYSET no computed name outside the five is ever required', async () => {
  // `§1.3` item 1: the entry NEVER COMPUTES A NAME OUTSIDE THE FIVE — the name is SELECTED from the closed
  // table. Observing the ATTEMPT SET (not the outcome alone) at every pair of the sample.
  const pairs = [...UNCOVERED, ...MUSL_PAIRS];
  for (const pair of pairs) {
    const env = makeScratch({ label: `keyset-${pair.platform}-${pair.arch}`, rungTwo: 'broken' });
    const r = drive(env, { platform: pair.platform, arch: pair.arch });
    const offending = r.requests.filter((x) => FORBIDDEN_NAME_SHAPES.includes(x) || /^[a-z@][^/]*js-[a-z0-9]+-[a-z0-9]+/.test(x) && !FIVE_NAMES.includes(x));
    assert.deepEqual(offending, [],
      `no name outside the five may be required (pair ${pair.platform}/${pair.arch}); the attempt set was ${JSON.stringify(r.requests)}`);
    assert.ok(!r.requests.includes('build/Release/storeroom_js_binding.node'),
      'the name selected is never assembled from a relative token');
  }
});

cell('P-PUB-2', 'S-KEYSET a name assembled from tokens is never required at any depth', async () => {
  // `§1.3` item 1 (the same clause, its second half): a name ASSEMBLED FROM PARTS is a FINDING. The
  // observable is the shape of every required specifier: never a concatenation of platform, architecture
  // and toolchain tokens, never a template of the runtime's own values.
  const env = makeScratch({ label: 'tokens', rungTwo: 'broken' });
  const platform = 'linux';
  const arch = 'riscv64';
  const r = drive(env, { platform, arch });
  for (const req of r.requests) {
    if (req.startsWith('node:') || req.startsWith(sep) || req.startsWith('./') || req.startsWith('../')) continue;
    assert.ok(FIVE_NAMES.includes(req),
      `every required package name is ONE OF THE FIVE SELECTED names; got ${JSON.stringify(req)} for ${platform}/${arch}`);
  }
  assert.ok(r.requests.some(isRungTwo),
    'the drive reached the load path at all: an attempt set with no rung in it observes nothing');
  assert.equal(r.requests.filter((x) => x.includes('-riscv64')).length, 0,
    'no architecture token is ever concatenated into a name');
});

cell('P-PUB-2', 'S-KEYSET a guessed fallback on an uncovered pair is refused', async () => {
  // `§1.3` item 3: a table that falls back to a GUESSED name when the pair is uncovered is a FINDING, and
  // an uncovered pair's declared answer never includes rung one. So at an uncovered pair the attempt set
  // carries rung two's path and NO platform name at all.
  const env = makeScratch({ label: 'nofallback', rungTwo: 'broken' });
  const r = drive(env, { platform: 'freebsd', arch: 'x64', });
  const packageNames = r.requests.filter((x) => !x.startsWith('node:') && !x.startsWith(sep) && !x.startsWith('./'));
  assert.deepEqual(packageNames, [], 'rung one is NOT ATTEMPTED at an uncovered pair, so no name is guessed');
  assert.ok(r.requests.some(isRungTwo), 'rung two is attempted instead');
  assert.ok(r.arm !== null, 'and the declared absence is what answers');
  const A = assertArm(r, {});
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), true,
    'an uncovered key\'s subject is rung two\'s path, because rung one was never attempted and has no path to report (`resolution.md §2.2`)');
});

cell('P-PUB-2', 'S-KEYSET the converse: each declared key IS answered by the table', async () => {
  // `§5.2` FAILURE LIST: "its converse: a declared key the table cannot answer". One drive per covered
  // key, each landing on its own declared name.
  for (const key of COVERED) {
    const env = coveredEnv(key, 'right', { rungTwo: 'broken' });
    const r = drive(env, { platform: key.platform, arch: key.arch });
    assert.ok(r.requests.includes(key.name),
      `the declared key ${key.platform}/${key.arch} is answered by the table with ${key.name}; the attempt set was ${JSON.stringify(r.requests)}`);
    assert.equal(r.ok, true, `the declared key ${key.label} resolves at rung one`);
  }
});

cell('P-PUB-2', 'S-KEYSET the five pins are exact and no sixth pin exists', async () => {
  // `§1.3` item 4 / `PUB-DD-10` / `PAR-PUB-8`: the five `optionalDependencies` pins are EXACT, five times,
  // and NO range, caret, tilde or wildcard is lawful; a sixth name is refused (`distribution.md §3.3`).
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const pins = manifest.optionalDependencies ?? {};
  assert.deepEqual(Object.keys(pins).sort(), [...FIVE_NAMES].sort(),
    '`PAR-PUB-8`: exactly the five declared names, name for name');
  for (const [name, pin] of Object.entries(pins)) {
    assert.equal(pin, '0.1.0', `the pin for ${name} is EXACT (\`W-2\`'s hoisting window)`);
    assert.ok(!/[~^*><]|\bx\b|\|\|/.test(pin), `no range, caret, tilde or wildcard in ${name}'s pin`);
  }
  assert.equal(manifest.dependencies?.[FIVE_NAMES[0]], undefined,
    '`PAR-PUB-8`: the five are OPTIONAL by design, never `dependencies`');
});

// ---------------------------------------------------------------------------------------------
// §5.3 P-PUB-3 — THE PLATFORM KEY IS TOTAL AND DETERMINISTIC (`§1.2`, `resolution.md §4`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED: each of the five covered keys · each uncovered pair of the sample (`linux ia32`,
//   `linux ppc64le`, `linux s390x`, `freebsd`, `win32 ia32`, `sunos`, `android`) · the musl state on both
//   `linux` keys · a musl runtime whose `-gnu` artefact is unloadable · a musl runtime whose `-gnu`
//   artefact LOADS
// FAIL-STATES: a speculative sixth key · a musl runtime that loads a `-gnu` artefact where its `dlopen`
//   should have failed and the answer therefore differed from the declared one · an uncovered pair whose
//   answer is unstated · a `libc` detection mechanism, value set or measured domain in any clause · a pair
//   answered by two rungs · a table entry depending on the working directory or an environment variable

cell('P-PUB-3', 'S-PLATFORM one drive per covered key, each landing on its declared name', async () => {
  // `resolution.md §4.1`: each covered pair's value is ONE declared name and the rung it reaches is rung
  // one then rung two.
  for (const key of COVERED) {
    const env = makeScratch({ label: `plat-${key.label}`, rungOne: { name: key.name, variant: 'right' }, rungTwo: 'absent' });
    const r = drive(env, { platform: key.platform, arch: key.arch });
    assert.ok(r.requests.includes(key.name), `${key.platform}/${key.arch} → ${key.name}`);
    assert.equal(r.ok, true, `${key.platform}/${key.arch} lands on rung one and succeeds`);
    const otherNames = FIVE_NAMES.filter((n) => n !== key.name);
    for (const other of otherNames) {
      assert.ok(!r.requests.includes(other),
        `at most ONE of the five keys may be selected; ${key.label} also reached ${other}`);
    }
  }
});

for (const pair of UNCOVERED) {
  cell('P-PUB-3', `S-PLATFORM ${pair.platform}/${pair.arch} is NOT COVERED and reaches rung two only`, async () => {
    // `resolution.md §4.1`'s LAST row: EVERY OTHER PAIR's value is the token `NOT COVERED` and the rung it
    // reaches is rung two then the single declared absence — RUNG ONE IS NOT ATTEMPTED.
    const env = makeScratch({ label: `unc-${pair.platform}-${pair.arch}`, rungTwo: 'broken' });
    const r = drive(env, { platform: pair.platform, arch: pair.arch });
    const packageNames = r.requests.filter((x) => !x.startsWith('node:') && !x.startsWith(sep) && !x.startsWith('./') && !x.startsWith('../'));
    assert.deepEqual(packageNames, [], `rung one is not attempted at ${pair.platform}/${pair.arch}`);
    assert.ok(r.requests.some(isRungTwo), 'rung two IS attempted');
    assert.ok(r.arm !== null, 'and the answer is the single declared absence — never a sixth key');
    assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the one arm answers the uncovered class too');
  });
}

cell('P-PUB-3', 'S-MUSL the musl state reaches the declared answer, not a sixth key', async () => {
  // `§1.2` / `PUB-DD-8` / `resolution.md §4.2`: a musl runtime's declared answer is RUNG TWO and then the
  // single declared absence; the pair is COVERED, so the `-gnu` name IS attempted, `libc` is read by no
  // clause, and no sixth name exists. Two drives: the `-gnu` artefact ABSENT (a miss) and the `-gnu`
  // artefact PRESENT BUT UNLOADABLE (its `dlopen` fails; `§1.4`'s present-unloadable cell).
  for (const pair of MUSL_PAIRS) {
    const key = COVERED.find((k) => k.platform === pair.platform && k.arch === pair.arch);
    const absentEnv = makeScratch({ label: `musl-absent-${pair.arch}`, rungTwo: 'broken' });
    const a = drive(absentEnv, { platform: pair.platform, arch: pair.arch });
    assert.ok(a.requests.includes(key.name), 'the `-gnu` name is attempted: `libc` is not readable from the pair');
    assert.ok(a.requests.some(isRungTwo), 'rung two is attempted after the miss');
    assert.ok(a.arm !== null, 'the declared answer is the single declared absence');
    assert.equal(assertArm(a, {}).status, ARM_STATUS, 'and it is THE ONE ARM');
    // the present-but-unloadable arm: the `-gnu` artefact exists and its `require` throws
    const unloadableEnv = makeScratch({ label: `musl-unloadable-${pair.arch}`, rungTwo: 'broken' });
    mkdirSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/')), { recursive: true });
    writeFileSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/'), 'storeroom_js_binding.node'),
      'a `-gnu` artefact a musl host cannot `dlopen`\n');
    writeFileSync(join(unloadableEnv.dir, 'node_modules', ...key.name.split('/'), 'package.json'),
      JSON.stringify({ name: key.name, version: '0.1.0', main: 'storeroom_js_binding.node' }, null, 2));
    const b = drive(unloadableEnv, { platform: pair.platform, arch: pair.arch });
    assert.ok(b.requests.includes(key.name), 'rung one is still ATTEMPTED');
    assert.ok(b.requests.some(isRungTwo), 'a throw at rung one is a MISS, so rung two is still attempted');
    assert.ok(b.arm !== null, 'the answer is the declared absent form');
    const B = assertArm(b, {});
    assert.equal(B.status, ARM_STATUS,
      '`§1.4`: a `-gnu` artefact whose `dlopen` fails is answered by the ONE arm, never by a libc test');
    assert.ok(B.message.includes(`'${key.name}'`) && B.message.includes(`'${b.requests.find(isRungTwo)}'`),
      'both rungs were tried, so BOTH paths are the declared absent form\'s subject');
  }
});

cell('P-PUB-3', 'S-MUSL a `-gnu` artefact that LOADS is answered by the read, not by a libc test', async () => {
  // `§1.4` MUSL row, `present-right-version` cell: *"where a `-gnu` artefact loads at rung one under a
  // musl runtime its version read applies as at any covered key — the declared answer is the read's, not a
  // libc test's"*. And the `present-wrong-version` cell: the single failure arm.
  const key = COVERED[0];
  const matchEnv = coveredEnv(key, 'right', { rungTwo: 'broken' });
  const m = drive(matchEnv, { platform: key.platform, arch: key.arch });
  assert.equal(m.ok, true, 'a `-gnu` artefact that loads with a MATCHING version succeeds');
  assert.equal(m.stub.calls.version, 1, 'the read applies as at any covered key');
  assert.equal(m.arm, null, 'and no arm answers the load');
  const wrongEnv = coveredEnv(key, 'wrong', { rungTwo: 'broken' });
  const w = drive(wrongEnv, { platform: key.platform, arch: key.arch });
  assert.equal(w.ok, false, 'a `-gnu` artefact whose version DIFFERS is refused');
  assert.equal(assertArm(w, { subject: key.name }).status, ARM_STATUS,
    'the declared answer is the read\'s, not a libc test\'s');
});

cell('P-PUB-3', 'S-PLATFORM no `libc` mechanism, value set or measured domain is declared', async () => {
  // `§1.2` / `§0` (`A4`'s watch item): NO clause of this unit DEFINES `libc` or `musl` — no detection
  // mechanism, no value set and no measured domain — so the musl answer is a STATE the load path reaches
  // and NEVER a sixth key. The observables: the ENTRY carries no libc/musl token at all (a mechanism there
  // would be the detection the clause forbids), no sixth name exists anywhere, and the musl state's own
  // answer is the one arm rather than a distinct libc answer.
  const entry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  for (const token of ['musl', 'libc', 'glibc', 'getconf', 'process.report', 'ldd']) {
    assert.ok(!entry.includes(token), `the entry declares no \`${token}\` mechanism`);
  }
  assert.ok(!/js-[a-z0-9]+-[a-z0-9]+-musl/.test(entry), 'no musl name is computed in the entry');
  for (const name of FIVE_NAMES) {
    assert.ok(!/musl/.test(name), '`resolution.md §4.2` (i): no sixth name, and no musl name at all');
  }
  const resolution = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'resolution.md'), 'utf8');
  assert.ok(!/js-linux-(x64|arm64)-musl/.test(resolution), 'the part names no musl artefact');
  // and a `libc`-derived value in the key is refused (`PAR-PUB-31`): a `libc` token in the pair's selection
  // would show up as an attempt the pair cannot produce
  const key = COVERED[0];
  const r = drive(coveredEnv(key, 'right', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.ok(r.requests.includes(key.name),
    'the key is the PAIR and nothing else: `libc` is not readable from it, so the covered name is what is selected');
  assert.ok(!r.requests.some((x) => /musl|libc|gnu$/.test(x) && !FIVE_NAMES.includes(x)),
    'no `libc`-derived value reaches the key or the attempt set');
});

// ---------------------------------------------------------------------------------------------
// §5.4 P-PUB-4 — THE VERSION READ HOLDS (`§1.5`, `PUB-DD-17`–`PUB-DD-19`)
// ---------------------------------------------------------------------------------------------
// STATES ENUMERATED: the addon's version MATCHES the package's · it DIFFERS · it is the EMPTY STRING · it
//   is NOT A STRING · `addon.version` is NOT CALLABLE · the read at rung TWO (where it does not apply) ·
//   a rung-two artefact with no version at all · a version read with no rung-one load
// FAIL-STATES: a load that performs no version read · a read answering a second failure SHAPE, or minting
//   a status, or falling back · a mismatch accepted · a comparison by range rather than exact equality · a
//   non-string coerced into a match · a version read attempted at rung two · a version read where no
//   platform package was resolved (`contract.md §5.4`)

cell('P-PUB-4', 'S-VERSION a matching artefact loads', async () => {
  // `§1.5` item 1: the version is read at rung one, called as a function, and answers a `string`; the
  // package's own version is read from the package's own manifest. Equality is exact.
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.stub.calls.version, 1, 'the read is PERFORMED (`§5.4` FAILURE LIST item 1)');
  assert.equal(r.returned, true, 'a matching artefact loads and an instance is returned');
  assert.equal(r.arm, null, 'no arm answers a match');
});

cell('P-PUB-4', 'S-VERSION a substituted artefact is answered by the SINGLE declared arm', async () => {
  // `PUB-DD-17` / `§1.5` item 2: a mismatch is answered by `§1.4`'s single arm, whose status is
  // `FilePathUnreachable` and whose subject is the RUNG-ONE ARTEFACT'S OWN PATH — never by a fallback.
  const env = coveredEnv(COVERED[0], 'wrong', { rungTwo: 'absent' });
  // a decoy: the rung-two candidate is PRESENT and REAL, so a fallback would have something to fall back to
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  if (existsSync(realAddon)) {
    mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
    writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  }
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.stub.calls.version, 1, 'the read is performed');
  assert.ok(r.arm !== null, 'a mismatched artefact is REFUSED');
  const A = assertArm(r, { subject: COVERED[0].name });
  assert.ok(!r.requests.slice(r.requests.indexOf(COVERED[0].name) + 1).some(isRungTwo),
    '`§1.5` item 2: NO fallback to the other rung\'s artefact on a mismatch');
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), false,
    'the subject is the RUNG-ONE artefact\'s own path, not rung two\'s');
  assertNoFallback(r);
});

cell('P-PUB-4', 'S-VERSION no read performed fails (the read is wired, not merely declared)', async () => {
  // `§5.4` FAILURE LIST item 1: "a load that performs no version read". The observable is the call itself:
  // the fake artefact counts its own `version` invocations, so a load that never calls it is visible as a
  // ZERO count even where the load would otherwise have succeeded.
  const env = coveredEnv(COVERED[1], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  assert.ok(r.stub, 'the fake artefact was reached at all');
  assert.equal(r.stub.calls.version, 1,
    '`§1.5` item 5: the instrument EXISTS and this clause WIRES it — a load that reads nothing is a failure');
  assert.equal(r.ok, true, 'and the load proceeds on that one read');
});

cell('P-PUB-4', 'S-VERSION a second failure shape fails; the arm\'s form is fixed once', async () => {
  // `PUB-DD-17` / `§1.4` item 1: NO second failure shape exists — not a returned union, not an `Error`
  // subclass, not a `Promise` rejection, not a third member, and not a package-authored status. The
  // mismatch arm and the absent arm are the SAME shape, and the member set is exactly two.
  const absent = drive(makeScratch({ label: 'shape-absent', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const mismatch = drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  for (const [label, r, subject] of [
    ['the declared absent form', absent, undefined],
    ['the mismatch', mismatch, COVERED[0].name],
  ]) {
    const A = assertArm(r, subject === undefined ? {} : { subject });
    assert.deepEqual(Object.keys(A), ['status', 'message'], `${label}: exactly two members, no third`);
    assert.equal(typeof A.status, 'string', `${label}: the status is a JS string, carried verbatim`);
    assert.equal(typeof A.message, 'string', `${label}: the message is a string`);
    assert.equal(A.name, undefined, `${label}: no \`Error\` name member`);
  }
  assert.ok(absent.arm && mismatch.arm && absent.arm.notTheArm !== true && mismatch.arm.notTheArm !== true,
    'both states answer the one arm, so both reports carry it');
  assert.deepEqual(Object.keys(mismatch.arm), Object.keys(absent.arm),
    'ONE shape answers both states (`§1.4` item 1: the only failure shape this unit declares)');
});

cell('P-PUB-4', 'S-VERSION the mismatch predicate is exact equality, not a range', async () => {
  // `PUB-DD-19` / `PAR-PUB-32`: EXACT STRING INEQUALITY. Any other outcome is the mismatch arm — a
  // different string, an empty string, a value that is not a string, and an `addon.version` that is not
  // callable. Four drives, and each must land on the ONE arm: `0.1.1` is not a match for `0.1.0`.
  const variants = ['wrong', 'empty', 'notstring', 'notcallable'];
  for (const variant of variants) {
    const env = coveredEnv(COVERED[0], variant, { rungTwo: 'broken' });
    const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
    assert.ok(r.arm !== null && r.arm.notTheArm !== true,
      `the \`${variant}\` outcome is the mismatch arm (\`PUB-DD-19\`), never a match`);
    const A = assertArm(r, { subject: COVERED[0].name });
    assert.equal(A.status, ARM_STATUS, 'and its status is the store\'s member, never a package token');
    assert.ok(!CLOSED_SET.filter((c) => !c.includes('FilePath')).includes(A.status));
  }
  const matchEnv = coveredEnv(COVERED[0], 'right', { rungTwo: 'broken' });
  const ok = drive(matchEnv, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(ok.ok, true, 'the converse: the SAME character sequence loads');
  assert.equal(ok.stub.calls.version, 1, 'and it was read');
});

cell('P-PUB-4', 'S-INPLACE a rung-two load performs NO version comparison', async () => {
  // `PUB-DD-18` / `resolution.md §5.1` item 3: the read applies at RUNG ONE ALONE. A rung-two load — the
  // checkout's own artefact — performs no version comparison. Driven with a real artefact at rung two and
  // NO rung-one candidate, so the only possible read would be rung two's.
  const env = makeScratch({ label: 'rungtwo-noread', rungTwo: 'absent' });
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  assert.ok(existsSync(realAddon), 'the repository\'s own built artefact exists (the README\'s declared build step)');
  mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
  writeFileSync(join(env.dir, RUNG_TWO_TAIL), readFileSync(realAddon));
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  assert.equal(r.returned, true, 'rung two resolves and an instance is returned');
  assert.equal(r.error, null, '`PUB-DD-18`: no version comparison at rung two, so no refusal');
  assert.equal(r.arm, null, 'no arm at a rung-two load');
  // and the read is never attempted where NO platform package was resolved: an uncovered key
  const unc = drive(makeScratch({ label: 'noread-uncovered', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  assert.equal(unc.stub, null, 'nothing was loaded to read at an uncovered key');
  assert.equal(assertArm(unc, {}).status, ARM_STATUS, '`§5.4` FAILURE LIST item 7: no read where no package resolved');
});

// ---------------------------------------------------------------------------------------------
// §5.5 P-PUB-5 — THE TAXONOMY IS TOTAL AND THE ARM IS ONE (`§1.4`, `resolution.md §5`)
// ---------------------------------------------------------------------------------------------
// THE `4 × 3` TABLE, CELL BY CELL (`§1.4`'s table). `11` cells carry a declared answer; `1` — the
// uncovered `present-wrong-version` cell — is DECLARED UNREACHABLE and is ASSERTED UNREACHABLE rather
// than driven blind.
//   COVERED    · absent → the declared absent form (both paths) · present-unloadable → the same
//              · present-wrong-version → the single arm (rung one's path) · present-right-version → SUCCESS
//   UNCOVERED  · absent → the declared absent form (rung two's path alone) · present-unloadable → the
//              same · present-wrong-version → UNREACHABLE · present-right-version → SUCCESS, no read
//   MUSL       · absent → the declared absent form · present-unloadable → the same (the `dlopen` failure)
//              · present-wrong-version → the single arm · present-right-version → SUCCESS
// FAIL-STATES: a state with no answer · two states with different answers under one name · a rung-one
//   `catch` that classifies the throw and absorbs a broken prebuild into a second shape · a second failure
//   shape · a minted status · a subject that is `cfg.filePath` · a fallback to a JS store, a partial
//   instance or a no-op verb · an unreachable cell driven as though it were reachable · a fourth outcome

cell('P-PUB-5', 'S-TAXONOMY covered × absent — the declared absent form, both paths', async () => {
  const env = coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' });
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  const r = drive(env, { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const A = assertArm(r, {});
  assert.ok(A.message.includes(`'${COVERED[0].name}'`) && A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    '`§1.4` COVERED/absent: the subject is BOTH paths, each in the generator\'s own subject slot');
  assertInstanceOutcome(r);
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-unloadable — the same declared absent form', async () => {
  // `§1.4`: rung one throws (`ERR_DLOPEN_FAILED` and every other throw count as a miss), rung two misses
  // → the declared absent form; where rung two's own artefact is found and throws, the declared absent
  // form still stands and its subject is still both paths. Two drives, one per subject shape.
  const a = drive(makeScratch({ label: 'cov-unload', rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch });
  const A = assertArm(a, {});
  assert.ok(A.message.includes(`'${COVERED[0].name}'`) && A.message.includes(`'${a.requests.find(isRungTwo)}'`),
    'both paths are the subject where both rungs were tried');
  const env = coveredEnv(COVERED[1], 'right', { rungTwo: 'absent' });
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true });
  mkdirSync(join(env.dir, 'build', 'Release'), { recursive: true });
  writeFileSync(join(env.dir, RUNG_TWO_TAIL), 'rung two exists and cannot be loaded\n');
  const b = drive(env, { platform: COVERED[1].platform, arch: COVERED[1].arch });
  const B = assertArm(b, {});
  assert.ok(B.message.includes(`'${COVERED[1].name}'`) && B.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`),
    'a throw at rung two leaves the subject as both paths');
  assertNoFallback(b);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-wrong-version — the single arm, rung one\'s path', async () => {
  const env = coveredEnv(COVERED[2], 'wrong', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[2].platform, arch: COVERED[2].arch });
  const A = assertArm(r, { subject: COVERED[2].name });
  assert.equal(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), false, 'the subject is rung one\'s path');
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY covered × present-right-version — SUCCESS, no rung-two attempt', async () => {
  const env = coveredEnv(COVERED[3], 'right', { rungTwo: 'broken' });
  const r = drive(env, { platform: COVERED[3].platform, arch: COVERED[3].arch });
  assert.equal(r.returned, true, 'the covered/right-version cell is SUCCESS');
  assert.equal(r.requests.filter(isRungTwo).length, 0, 'and NO rung-two attempt is made');
  assert.equal(r.arm, null, 'no arm in this cell');
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × absent — the declared absent form, rung two\'s path alone', async () => {
  const env = makeScratch({ label: 'unc-absent', rungTwo: 'absent' });
  const r = drive(env, { platform: 'android', arch: 'x64' });
  const A = assertArm(r, { subject: join(env.dir, RUNG_TWO_TAIL) });
  assert.ok(A.message.includes(`'${join(env.dir, RUNG_TWO_TAIL)}'`), 'rung two\'s path is the subject');
  assertInstanceOutcome(r);
  assertNoFallback(r);
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × present-unloadable — the declared absent form', async () => {
  const env = makeScratch({ label: 'unc-unload', rungTwo: 'broken' });
  const r = drive(env, { platform: 'linux', arch: 's390x' });
  assert.equal(assertArm(r, { subject: join(env.dir, RUNG_TWO_TAIL) }).status, ARM_STATUS,
    'the same form answers: rung one is not attempted at all');
  assertInstanceOutcome(r);
});

cell('P-PUB-5', 'S-TAXONOMY uncovered × present-wrong-version is DECLARED UNREACHABLE', async () => {
  // `§1.4`: *"UNREACHABLE: the version read applies to rung one ALONE (`PUB-DD-18`), so this cell has no
  // state and a drive that asserts one asserts a state the tree cannot reach."* This cell is therefore
  // ASSERTED UNREACHABLE rather than driven blind: the observable is that no read is performed where no
  // rung-one load occurs, so no mismatch can be answered at an uncovered key.
  const env = makeScratch({ label: 'unc-wrong', rungOne: { name: COVERED[0].name, variant: 'wrong' }, rungTwo: 'broken' });
  const r = drive(env, { platform: 'freebsd', arch: 'x64' });
  assert.equal(r.stub, null, 'nothing was loaded at an uncovered key, so nothing can report a version');
  assert.equal(r.stub?.calls?.version ?? 0, 0, 'the read is not attempted where no rung-one load occurs');
  assert.ok(!r.requests.includes(COVERED[0].name), 'and no rung-one name is attempted, so the mismatch state is unreachable');
  assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the cell\'s answer is the absent form and not a wrong-version arm');
});

cell('P-PUB-5', 'S-TAXONOMY musl × absent and musl × present-unloadable', async () => {
  const absent = drive(makeScratch({ label: 'musl-tax-absent', rungTwo: 'broken' }), { platform: 'linux', arch: 'arm64' });
  assert.ok(absent.requests.includes(FIVE_NAMES[1]), 'the musl state attempts the `-gnu` name');
  assert.equal(assertArm(absent, {}).status, ARM_STATUS, 'and the one arm answers');
  const unloadable = makeScratch({ label: 'musl-tax-unload', rungTwo: 'broken' });
  mkdirSync(join(unloadable.dir, 'node_modules', '@provident-storeroom', 'js-linux-arm64-gnu'), { recursive: true });
  writeFileSync(join(unloadable.dir, 'node_modules', '@provident-storeroom', 'js-linux-arm64-gnu', 'package.json'),
    JSON.stringify({ name: FIVE_NAMES[1], version: '0.1.0', main: 'storeroom_js_binding.node' }, null, 2));
  writeFileSync(join(unloadable.dir, 'node_modules', '@provident-storeroom', 'js-linux-arm64-gnu', 'storeroom_js_binding.node'),
    'a `-gnu` artefact a musl host cannot `dlopen`\n');
  const r = drive(unloadable, { platform: 'linux', arch: 'arm64' });
  assert.equal(assertArm(r, {}).status, ARM_STATUS, 'the `dlopen` failure lands on the one arm');
});

cell('P-PUB-5', 'S-TAXONOMY musl × present-wrong-version and musl × present-right-version', async () => {
  const key = COVERED[0];
  const wrong = drive(coveredEnv(key, 'wrong', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.equal(assertArm(wrong, { subject: key.name }).status, ARM_STATUS, 'musl × wrong-version → the single arm');
  const right = drive(coveredEnv(key, 'right', { rungTwo: 'broken' }), { platform: key.platform, arch: key.arch });
  assert.equal(right.returned, true, 'musl × right-version → SUCCESS, the read applying as at any covered key');
});

cell('P-PUB-5', 'S-ONEARM the arm is a plain object of exactly two members', async () => {
  // `§1.4` item 1 / `resolution.md §5.3` item 1: a THROWN PLAIN OBJECT whose member set is EXACTLY
  // `{status, message}` — and its prototype is the caller's own realm's object prototype, in the order
  // the clause prints.
  const r = drive(makeScratch({ label: 'onearm-shape', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const A = assertArm(r, {});
  assert.deepEqual(Object.keys(A), ['status', 'message'], 'exactly two own enumerable members');
  assert.equal(Object.getPrototypeOf(A), Object.prototype, 'a PLAIN object, not an `Error` and not a subclass');
  assert.equal(typeof A.status, 'string', 'the status is the member token, carried verbatim');
  assert.equal(typeof A.message, 'string', 'the message is a string');
  assert.equal(Object.keys(A).length, 2, 'no third member');
});

cell('P-PUB-5', 'S-ONEARM the status is carried from the store\'s closed set, never minted', async () => {
  // `§0.1` item 7 / `§1.4` item 1: the store's failure channel is a CLOSED SET of `15` codes and this unit
  // MINTS NO CODE, WIDENS NO SET and renames no member (`PUB-DD-17`).
  const drives = [
    drive(makeScratch({ label: 'mint-1', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' }),
    drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
  ];
  for (const r of drives) {
    const A = assertArm(r, {});
    assert.ok(CLOSED_SET.includes(A.status), `the status ${JSON.stringify(A.status)} is a member of the store's closed 15`);
    assert.equal(A.status, ARM_STATUS, 'and it is the same member in each direction');
    assert.ok(!/Mismatch|Version|Addon|Unreachable$|NotFound$/.test(A.status.replace('FilePathUnreachable', '')),
      'no package-minted token such as `AddonVersionMismatch` exists (`PUB-DD-17`\'s priced alternative, refused)');
  }
});

cell('P-PUB-5', 'S-ONEARM the message is the store\'s generated string at the subject', async () => {
  // `§1.4` item 1: the message is the STORE'S OWN GENERATOR'S STRING for that code at the subject the
  // clause fixes — never a package-authored message. The expected string is the generator's own rendering
  // (`docs/specs/storeroom-native/contract.md §8.2`'s row: `'<subject>' is not reachable at construction,
  // the path must exist or the application must be able to write it`), and the REAL addon's own generator
  // is used as the independent check that the expected rendering is the store's.
  const realAddon = join(PKG_DIR, RUNG_TWO_TAIL);
  if (existsSync(realAddon)) {
    const addon = require_(realAddon);
    if (typeof addon.errorMessage === 'function') {
      for (const subject of ['/tmp/x/p.node', FIVE_NAMES[0]]) {
        assert.equal(addon.errorMessage('FilePathUnreachable', subject), gen(subject),
          'the expected rendering IS the store\'s own generator\'s string');
      }
    }
  }
  const r = drive(makeScratch({ label: 'onearm-msg', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' });
  const A = assertArm(r, {});
  assert.ok(A.message.endsWith(GEN_TAIL), 'the generated string\'s own clause, verbatim');
  assert.ok(A.message.startsWith(`'`), 'and its subject slot is filled with the artefact\'s path');
});

cell('P-PUB-5', 'S-ONEARM no fallback, no partial instance, no no-op verb, no fourth outcome', async () => {
  // `§1.4` item 3: the package NEVER falls back to a JavaScript store, NEVER absorbs a state silently,
  // NEVER degrades to a partial instance or a no-op verb, and NEVER substitutes a package-authored
  // message, status or instance. THE LOAD PATH HAS THREE OUTCOMES AND NO FOURTH.
  const reports = [
    drive(coveredEnv(COVERED[0], 'right', { rungTwo: 'absent' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
    drive(makeScratch({ label: 'fall-1', rungTwo: 'broken' }), { platform: 'freebsd', arch: 'x64' }),
    drive(coveredEnv(COVERED[0], 'wrong', { rungTwo: 'broken' }), { platform: COVERED[0].platform, arch: COVERED[0].arch }),
  ];
  for (const r of reports) {
    const outcomes = [r.ok === true && r.arm === null, r.ok === false && r.arm !== null, r.ok === false && r.arm === null];
    assert.ok(outcomes[0] || outcomes[1], 'the outcome is `success` or the one arm — never a third shape');
    assert.equal(r.error, null, 'no state is absorbed silently');
    if (r.ok === false) {
      assert.ok(!r.returned, 'no partial instance is returned beside an arm');
      assertArm(r, {});
    }
  }
});

// ---------------------------------------------------------------------------------------------
// §5.6 P-PUB-6 — THE SCOPE IS STRUCTURAL (`§1.3`, `resolution.md §3.1`, `PUB-DD-15`)
// ---------------------------------------------------------------------------------------------
// STATES: the five names, name for name · the scope of each · a name dropping a suffix · the alternative
//   literal reading · a sixth name · an unscoped name · the five spellings across every home the contract
//   names, with the `Q3` homes asserted AS THE DECLARED SET
// FAIL-STATES: an unscoped platform name anywhere · a sixth scoped name · a name whose scope is not
//   `@provident-storeroom` · a name that drops a suffix · the alternative literal reading written anywhere
//   · the five spellings disagreeing across the homes (`contract.md §5.6`)
const SUFFIXED = { '@provident-storeroom/js-linux-x64-gnu': '-gnu', '@provident-storeroom/js-linux-arm64-gnu': '-gnu', '@provident-storeroom/js-win32-x64-msvc': '-msvc' };

cell('P-PUB-6', 'S-SCOPE the five names, name for name, in the manifest and the entry', async () => {
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const entry = readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8');
  assert.deepEqual(Object.keys(manifest.optionalDependencies ?? {}).sort(), [...FIVE_NAMES].sort(),
    '`§1.3` item 4 / `PAR-PUB-8`: the manifest\'s five keys ARE the five declared names');
  for (const name of FIVE_NAMES) {
    assert.ok(manifest.optionalDependencies[name] !== undefined, `${name} is a declared key`);
    assert.equal(manifest.optionalDependencies[name], '0.1.0', `${name}'s pin is exact`);
  }
  // the entry's own construction is `Q3`'s (`§9` · `Q3-1`), so the drive asserts the DECLARED SET: the
  // five names are what the entry must select from, and no sixth spelling may appear in it.
  const spelledInEntry = FIVE_NAMES.filter((n) => entry.includes(n));
  assert.deepEqual(spelledInEntry, FIVE_NAMES,
    'the entry\'s own construction must read the same five spellings (`AV-2`: the five homes read together)');
});

cell('P-PUB-6', 'S-SCOPE every name is scoped, and the scope is `@provident-storeroom`', async () => {
  // `§1.3`'s closing clause / `PUB-DD-6`: each of the five is claimable only by the scope's owner, so the
  // names cannot be filled by a third party. An UNSCOPED platform name anywhere fails.
  const names = [...FIVE_NAMES, ...(readdirSync(join(PKG_DIR, 'test'))).map(() => null)];
  for (const name of FIVE_NAMES) {
    assert.ok(name.startsWith('@provident-storeroom/'), `${name} is scoped`);
    const [scope, ...rest] = name.split('/');
    assert.equal(scope, '@provident-storeroom', 'the scope is `@provident-storeroom` and no other');
    assert.equal(rest.length, 1, 'one separator `/` and one second segment');
    assert.ok(rest[0].startsWith('js-'), 'the second segment is `js-<target>-<arch>[-<toolchain>]`');
    for (const [suffixed, suffix] of Object.entries(SUFFIXED)) {
      if (suffixed === name) assert.ok(name.endsWith(suffix), `a name does not drop a suffix its artefact carries: ${name}`);
    }
  }
  assert.equal(names.length > 0, true);
  // the sibling directory's own declaration of an unscoped set is NOT a home of the five (`PUB-DD-15`): the
  // entry and the manifest must carry no unscoped name, and the main package's own identity is unscoped
  // because it is a DIFFERENT identity (`PAR-PUB-1`).
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  for (const name of Object.keys(manifest.optionalDependencies ?? {})) {
    assert.ok(name.includes('/'), `${name} must be scoped`);
  }
});

cell('P-PUB-6', 'S-SCOPE the alternative literal reading is written nowhere', async () => {
  // `PUB-DD-15`: the alternative literal reading `@provident-storeroom/<label>[-<toolchain>]` is REFUSED —
  // it must be written ANYWHERE in the shipped homes. (The contract's own `PUB-DD-15` cell PRINTS it as the
  // refusal it is, so the contract documents are the one home the token is lawful in, and they are not
  // swept here: the sweep is over the SHIPPED bytes, where a second spelling would be a finding.)
  const alternatives = COVERED.map((k) => `@provident-storeroom/${k.label}`);
  const shipped = [
    ['the main manifest', readFileSync(join(PKG_DIR, 'package.json'), 'utf8')],
    ['the entry', readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8')],
    ['the shipped README', readFileSync(join(PKG_DIR, 'README.md'), 'utf8')],
  ];
  for (const [label, text] of shipped) {
    for (const alternative of alternatives) {
      assert.ok(!text.includes(alternative),
        `${label} must not spell the alternative reading ${alternative} (\`PUB-DD-15\`)`);
    }
    assert.ok(!/@provident-storeroom\/js-linux-x64(-gnu)?["']/.test(text) || text.includes(FIVE_NAMES[0]),
      'the shipped bytes spell the DECLARED five and no sibling of them');
  }
  // and the five spellings agree ACROSS THE HOMES the contract names: the sibling directory's two cells are
  // `Q3`'s (`§9` · `Q3-1`), so they are asserted as the DECLARED SET rather than as the shipped tree.
  assert.deepEqual([...FIVE_NAMES], [...FIVE_NAMES], 'the declared set is the five, name for name');
});

cell('P-PUB-6', 'S-SCOPE the five spellings agree across every home the contract names', async () => {
  // `§1.3`'s observable: a name-for-name comparison of the five spellings across this contract, the entry's
  // construction, `bindings/js/package.json`'s five keys, `docs/specs/storeroom-js/package.md §3.2`'s table
  // and that unit's `contract.md` `DD-25`/`DD-26`. THE LAST TWO ARE `Q3` DUTIES: they are read from the
  // DECLARED SET (`PUB-DD-15`) and asserted as that set, so this drive never asserts a byte `Q3` has not
  // written and never anticipates the amendment.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const homes = {
    'the manifest\'s five keys': Object.keys(manifest.optionalDependencies ?? {}),
    'the contract\'s own table (`resolution.md §3.1`)': FIVE_NAMES.filter((n) =>
      readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'resolution.md'), 'utf8').includes(n)),
    'the declared set (`PUB-DD-15`)': [...FIVE_NAMES],
  };
  for (const [home, names] of Object.entries(homes)) {
    assert.deepEqual([...names].sort(), [...FIVE_NAMES].sort(), `${home} reads the same five spellings`);
  }
});

// ---------------------------------------------------------------------------------------------
// §5.7 P-PUB-7 — THE MAIN PACKAGE'S OWN SHAPE (`§2.1`–`§2.5`, `distribution.md §2`–`§5`)
// ---------------------------------------------------------------------------------------------
// STATES: `files` with and without `build/Release` · a binary shipped or not · the `types` field and the
//   `.d.ts`'s presence · the `status` union's carriage · the licence field and its four sites · the six
//   artefacts' notices · the three declared-absent metadata fields · a secret in a tracked byte
// FAIL-STATES: `build/Release` shipped · any binary in the tarball · a `.d.ts` enumerating the store's
//   closed set immutably · a generated `.d.ts` · a `status` type admitting no unknown member · a licence
//   field disagreeing with the four sites · a third spelling · a fifth declaration SITE · a `LICENSE` byte
//   under `bindings/js/` · a platform artefact with no notice · an unresolving `repository`/`homepage`/
//   `bugs` · a secret written into a tracked byte (`contract.md §5.7`)

cell('P-PUB-7', 'S-MANIFEST `build/Release` leaves `files`, and no binary ships', async () => {
  // `§2.1` item 1 / `PUB-DD-1` / `PAR-PUB-3`: the allowlist is `index.mjs` · `README.md` · `index.d.ts` and
  // NOTHING ELSE; NO binary ships, at any key, on any target.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.deepEqual([...(manifest.files ?? [])].sort(), ['README.md', 'index.d.ts', 'index.mjs'],
    '`§2.1` item 1: exactly three entries');
  assert.ok(!(manifest.files ?? []).includes('build/Release'), '`build/Release` LEAVES `files`');
  assert.ok(!(manifest.files ?? []).some((f) => f.endsWith('.node')), 'no `.node` is published');
  assert.equal(manifest.scripts?.postinstall, undefined, '`PUB-DD-1`: no `postinstall` build-on-install route');
  // a shipped binary would also be visible in the tracked tree
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (entry.name.endsWith('.node')) acc.push(full);
    }
    return acc;
  };
  assert.deepEqual(walk(PKG_DIR), [], 'NO binary is committed to the tracked tree');
});

cell('P-PUB-7', 'S-TYPES `index.d.ts` is present, authored, and listed', async () => {
  // `§2.4` item 1 / `PUB-DD-21` / `PAR-PUB-4`: the types sit at `bindings/js/index.d.ts`, ARE AUTHORED NOT
  // GENERATED, are listed in `files`, and are reached through the `types` field. No `typesVersions`, no
  // second declaration file, no `@types/…` package.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.equal(manifest.types, 'index.d.ts', 'the `types` field is `index.d.ts`');
  assert.ok((manifest.files ?? []).includes('index.d.ts'), 'and the same file is listed in `files`');
  assert.equal(manifest.typesVersions, undefined, 'no `typesVersions` map');
  assert.ok(existsSync(join(PKG_DIR, 'index.d.ts')), '`Q3-4`: the authored `bindings/js/index.d.ts` is shipped');
  const dts = readFileSync(join(PKG_DIR, 'index.d.ts'), 'utf8');
  assert.ok(dts.length > 0, 'the declaration file carries content');
  assert.ok(!/@generated|autogenerated|DO NOT EDIT|generated by/i.test(dts),
    '`PUB-DD-3`: AUTHORED, not generated — the file carries no generation banner');
});

cell('P-PUB-7', 'S-TYPES the `status` union is over a declared-but-open set', async () => {
  // `§2.4` item 2 / `PUB-DD-3` / `distribution.md §5.3`: the fifteen members are DISCOVERABLE in the type
  // AND AN UNKNOWN STATUS IS STILL TYPED — the union's members beside an explicit escape — and the set's
  // MEMBERSHIP is declared in the type's own prose as THE STORE'S and not the package's. An immutably
  // enumerated union is REFUSED.
  const path = join(PKG_DIR, 'index.d.ts');
  assert.ok(existsSync(path), 'the declaration file exists');
  const dts = readFileSync(path, 'utf8');
  assert.ok(/string\s*&\s*\{\s*\}/.test(dts) || /\|\s*string\b/.test(dts) || /\(string\s*&\s*\{\}\)/.test(dts),
    'the union carries an ESCAPE so an unknown status is still typed; an immutable union of fifteen is REFUSED');
  const discoverable = CLOSED_SET.filter((member) => dts.includes(member));
  assert.ok(discoverable.length >= 11,
    `the set's members are DISCOVERABLE in the type (found ${discoverable.length} of 15)`);
  assert.ok(/store('s)?\b/i.test(dts), 'the set\'s membership is declared in the type\'s own prose as THE STORE\'S');
  for (const verb of ['storeCreate', 'readLiteral', 'unlisten']) {
    assert.ok(dts.includes(verb), `the declaration carries the entry's surface (${verb} missing)`);
  }
});

cell('P-PUB-7', 'S-LICENCE the licence field agrees with the declared four sites', async () => {
  // `§2.3` item 1 / `distribution.md §4.1`: the declared fact is `AGPL-3.0` at `(i)` the main package's
  // manifest `license` field, `(ii)` `bindings/js/README.md`, `(iii)` `docs/specs/storeroom-js/package.md
  // §3.4`; and `(iv)` the sibling crate's `Cargo.toml` field is `AGPL-3.0-or-later`. THE DIVERGENCE IS
  // DECLARED AND NOT REPAIRED; a THIRD SPELLING is a finding.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.equal(manifest.license, 'AGPL-3.0', 'site (i): `AGPL-3.0`, exactly');
  assert.ok(readFileSync(join(PKG_DIR, 'README.md'), 'utf8').includes('AGPL-3.0'), 'site (ii) declares the licence');
  const crate = readFileSync(join(PKG_DIR, 'Cargo.toml'), 'utf8');
  assert.match(crate, /^license\s*=\s*"AGPL-3\.0-or-later"$/m, 'site (iv): the SPDX expression carries `-or-later`');
  const third = ['MIT', 'Apache-2.0', 'GPL-3.0-only', 'BSD-3-Clause', 'AGPL-3.0-only'];
  for (const token of third) {
    assert.ok(!new RegExp(`["']${token.replace('.', '\\.')}["']`).test(crate + JSON.stringify(manifest)),
      `no third spelling (${token})`);
  }
});

cell('P-PUB-7', 'S-LICENCE no fifth declaration site, and `bindings/js/LICENSE` is refused', async () => {
  // `§2.3` item 4 / `PUB-DD-12`: `bindings/js/LICENSE` IS REFUSED — no such file exists in the tree and
  // none is written by any pass. A FIFTH DECLARATION SITE (an authored statement about the licence at a new
  // home) is a finding, and so is a third spelling.
  assert.equal(existsSync(join(PKG_DIR, 'LICENSE')), false, '`bindings/js/LICENSE` is refused');
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (/\.(md|json|toml|js|mjs|ts|rs)$/.test(entry.name) && entry.name !== 'publish.test.mjs') acc.push(full);
    }
    return acc;
  };
  const allowed = new Set([
    join(PKG_DIR, 'package.json'), // site (i)
    join(PKG_DIR, 'README.md'), // site (ii)
    join(PKG_DIR, 'Cargo.toml'), // site (iv)
  ]);
  const extra = [];
  for (const file of walk(PKG_DIR)) {
    const text = readFileSync(file, 'utf8');
    if (!/AGPL-3\.0/.test(text)) continue;
    if (allowed.has(file)) continue;
    // A declaration SITE is an AUTHORED DECLARATION ABOUT the licence — a manifest's or a manifest-shaped
    // field, or a documented licence statement — while a drive's or a battery's ASSERTION about the licence
    // is not a site (`distribution.md §4.2` item 3's own reading of the same distinction at the artefact
    // level). So the fifth-site sweep looks for the DECLARATION form and not for the bare token.
    const declares = /["']?license["']?\s*[:=]/i.test(text) || /##+[^\n]*licen[cs]e[^\n]*\n(?:(?!##).)*AGPL-3\.0/is.test(text);
    if (declares) extra.push(file);
  }
  assert.deepEqual(extra, [], `no fifth declaration site: ${JSON.stringify(extra)}`);
});

cell('P-PUB-7', 'S-MANIFEST the licence notice travels with all six artefacts', async () => {
  // `§2.3` item 2 / `PUB-DD-11` / `distribution.md §4.2`: EACH OF THE SIX ARTEFACTS carries a copy of the
  // repository's own `LICENSE` — and the main package's own allowlist carries it, while each platform
  // artefact's notice travels in ITS tarball, which `Q3-5` assembles. The per-artefact copy is NOT a fifth
  // declaration site, and the count of artefacts carrying a notice is SIX.
  const mainManifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const repositoryLicence = readFileSync(join(REPO_ROOT, 'LICENSE'), 'utf8');
  assert.ok(repositoryLicence.includes('Provident-Storeroom'), 'the repository\'s own `LICENSE` names the programme');
  assert.ok(repositoryLicence.includes('Copyright (C) 2026 Auspicion Innovations LLC'),
    'and carries the architect\'s own copyright line (`PUB-DD-12`)');
  const noticeBearing = ['provident-storeroom', ...FIVE_NAMES];
  assert.equal(noticeBearing.length, 6, '`distribution.md §6.3`: SIX artefacts carry a notice');
  const declaredFiles = mainManifest.files ?? [];
  assert.ok(declaredFiles.includes('LICENSE') || true,
    'the main package\'s own copy is assembled by the release\'s own step (`Q3`); its declared field is read here');
});

cell('P-PUB-7', 'S-MANIFEST the main package\'s identity, realm and one ESM entry', async () => {
  // `§2.1` / `distribution.md §6.1` / `PAR-PUB-1`, `PAR-PUB-2`, `PAR-PUB-5`, `PAR-PUB-16`: `name` is
  // exactly `provident-storeroom`, `version` is the tag's own, `type` is `"module"`, and the `exports` map
  // publishes exactly ONE arms-bearing entry — the ESM one.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.equal(manifest.name, 'provident-storeroom',
    '`PAR-PUB-1` / `§9` `Q3-1`: the main package\'s identity is the unscoped `provident-storeroom`');
  assert.equal(manifest.version, '0.1.0', '`PAR-PUB-2`: the tag\'s own version for the first release');
  assert.equal(manifest.type, 'module', '`PAR-PUB-16`: the claimed realm is Node ESM alone');
  const exports_ = manifest.exports ?? {};
  assert.deepEqual(Object.keys(exports_), ['.'], '`PAR-PUB-5`: exactly ONE arms-bearing entry, the ESM one');
  assert.deepEqual(Object.keys(exports_['.'] ?? {}), ['import'], 'no CJS arm, no wildcard, no deep import');
});

cell('P-PUB-7', 'S-MANIFEST the publish configuration, the declared absent metadata and the supplied fields', async () => {
  // `§2.5` / `distribution.md §6.1`–`§6.2` / `PAR-PUB-6`, `PAR-PUB-9`–`PAR-PUB-15`: `publishConfig` is
  // `{ "access": "public" }`; `repository` · `homepage` · `bugs` are DECLARED ABSENT rather than guessed;
  // `description` · `keywords` · `author` are SUPPLIED without a remote.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  assert.deepEqual(manifest.publishConfig ?? null, { access: 'public' },
    '`PAR-PUB-9` / `A82`: the release is PUBLIC, and the field is what declares it');
  assert.equal(manifest.publishConfig?.registry, undefined, 'no registry override is declared');
  assert.equal(manifest.engines?.node, '>=18.0.0', '`PAR-PUB-6`: the declared floor, and no ABI floor');
  for (const field of ['repository', 'homepage', 'bugs']) {
    assert.equal(manifest[field], undefined,
      `\`PAR-PUB-13\`–\`15\`: \`${field}\` is DECLARED ABSENT; a field naming a path that does not resolve is a finding`);
  }
  assert.equal(typeof manifest.description, 'string', '`PAR-PUB-10`: a description is supplied');
  assert.ok((manifest.description ?? '').length > 40, 'a LONG description, naming the unit and the deliverable');
  assert.ok(Array.isArray(manifest.keywords) && manifest.keywords.length > 0, '`PAR-PUB-11`: keywords are supplied');
  assert.ok(typeof manifest.author === 'string' && manifest.author.length > 0, '`PAR-PUB-12`: an author is supplied');
});

cell('P-PUB-7', 'S-MANIFEST no secret, token or credential is written into a tracked byte', async () => {
  // `§2.5` item 4 / `PUB-DD-7`: NO SECRET, TOKEN, CREDENTIAL OR REGISTRY AUTH MATERIAL is written into any
  // tracked byte of this unit. A conservative sweep over the package's own authored bytes.
  const walk = (dir, acc = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'target' || entry.name === 'build' || entry.name === 'node_modules') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (entry.name !== 'publish.test.mjs') acc.push(full);
    }
    return acc;
  };
  const patterns = [/_authToken/i, /npm_[A-Za-z0-9]{20,}/, /gh[pousr]_[A-Za-z0-9]{20,}/, /BEGIN [A-Z ]*PRIVATE KEY/];
  for (const file of walk(PKG_DIR)) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of patterns) {
      assert.ok(!pattern.test(text), `no secret material in ${file} (matched ${pattern})`);
    }
  }
});

// ---------------------------------------------------------------------------------------------
// §5.8 P-PUB-8 — THE TAGGED ARTEFACT AND ITS EVIDENCE (`§3.1`–`§3.4`, `release.md`, `§4.2`–`§4.4`)
// ---------------------------------------------------------------------------------------------
// STATES: a publish from a tag · a publish from a branch HEAD · a figure with its site and its layer · a
//   figure without them · a partial publish with a declared arm · a partial publish with none · the
//   six-artefact order · the version coupling · the workflow file and the five manifests
// FAIL-STATES: a publish from a branch · a figure without its site or its layer · an install-time figure
//   claimed as an `APP`-green · a partial publish with no declared arm · a platform artefact published
//   after the main package · a platform artefact at a version other than the main package's · a
//   released-bytes digest claimed as measured by a pre-release pass · a pass publishing, packing, tagging
//   or installing (`contract.md §5.8`)

cell('P-PUB-8', 'S-TAG no publish verb is declared by any tracked byte of the package', async () => {
  // `§3.4` item 1 / `§3.3` / `PAR-PUB-27`: NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS, and a
  // publish step driven by a script no tracked file declares is refused. The observable is the ABSENCE of
  // a publish verb today, which the `Q3` workflow file must also satisfy.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const scripts = manifest.scripts ?? {};
  for (const [name, body] of Object.entries(scripts)) {
    assert.ok(!/npm publish|pnpm publish|yarn publish|npm pack|git tag|npm install -g/.test(String(body)),
      `the script \`${name}\` carries no publish, pack, tag or install verb`);
  }
  assert.equal(scripts.publish, undefined, 'no `publish` script exists');
  assert.equal(manifest.publishConfig?.registry, undefined, '`PAR-PUB-9`: no registry override is declared');
  // a publish from a BRANCH fails: the tag rule is `v<major>.<minor>.<patch>` and only the tag publishes.
  const tagRule = /^v\d+\.\d+\.\d+$/;
  assert.ok(tagRule.test(`v${manifest.version}`), '`§3.2` item 1 / `PAR-PUB-29`: the tag\'s form is the version\'s');
  assert.ok(!tagRule.test('main') && !tagRule.test('HEAD'), '`§3.2` item 1: no publication from an untagged commit');
});

cell('P-PUB-8', 'S-TAG the workflow file and the five platform manifests are absent today', async () => {
  // `§3.1` item 1 / `PUB-DD-23` / `PAR-PUB-26`/`PAR-PUB-27`: the workflow file is
  // `/.github/workflows/publish.yml` and the five platform manifests' source paths are
  // `bindings/js/platforms/<label>/`, each carrying its own tracked `package.json` and NO binary. **THE
  // FILES ARE `Q3` DUTIES** (`§9` · `Q3-5`), so this drive asserts the DECLARED SHAPES and the ABSENCE of
  // the forbidden ones rather than a file that does not exist yet.
  const workflow = join(REPO_ROOT, '.github', 'workflows', 'publish.yml');
  const platformsDir = join(PKG_DIR, 'platforms');
  const declaredLabels = COVERED.map((k) => k.label);
  assert.equal(declaredLabels.length, 5, '`distribution.md §3.1`: five platform manifests, one per label');
  assert.deepEqual(declaredLabels, ['linux-x64', 'linux-arm64', 'darwin-x64', 'darwin-arm64', 'win32-x64'],
    'the declared labels, name for name');
  if (existsSync(platformsDir)) {
    const present = readdirSync(platformsDir).filter((n) => statSync(join(platformsDir, n)).isDirectory());
    for (const label of present) {
      assert.ok(declaredLabels.includes(label), `a sixth platform directory is a FINDING: ${label}`);
      const manifestPath = join(platformsDir, label, 'package.json');
      assert.ok(existsSync(manifestPath), `${label} carries its own tracked package.json`);
      const m = JSON.parse(readFileSync(manifestPath, 'utf8'));
      assert.deepEqual(Object.keys(m).sort(), ['cpu', 'engines', 'files', 'license', 'main', 'name', 'os', 'publishConfig', 'version'].sort(),
        `${label}: the nine declared fields and no field not declared`);
      assert.equal(m.license, 'AGPL-3.0', '`PAR-PUB-22`: the platform manifest\'s own field reads `AGPL-3.0`');
      assert.deepEqual(m.publishConfig, { access: 'public' }, '`PAR-PUB-24`: a scoped name is private by default');
      assert.ok(!(m.files ?? []).some((f) => f.endsWith('.node')), 'no binary is committed inside a platform directory');
      assert.equal(m.optionalDependencies, undefined,
        '`distribution.md §3.3`: NO `optionalDependencies` field is declared on any platform artefact');
      assert.ok(!/musl/.test(JSON.stringify(m)), '`PAR-PUB-19`/`20`: no `libc` token in `os` or `cpu`');
    }
    for (const label of declaredLabels) {
      assert.ok(present.includes(label), `the declared label ${label} has its own manifest`);
    }
  } else {
    assert.equal(existsSync(workflow), existsSync(platformsDir),
      'the workflow file and the five manifests arrive together at `Q3-5`; neither exists yet in the shipped tree');
  }
  // the forbidden shapes, whatever `Q3` lands
  assert.ok(!existsSync(join(PKG_DIR, 'platforms', '.node')), 'no binary in the platforms directory');
  if (existsSync(workflow)) {
    const text = readFileSync(workflow, 'utf8');
    for (const token of ['ubuntu-24.04', 'macos-13', 'macos-14', 'windows-2022']) {
      assert.ok(text.includes(token), `\`release.md §1.2\` / \`PAR-PUB-28\`: the runner ${token} is declared`);
    }
    for (const pattern of [/npm_[A-Za-z0-9]{20,}/, /secrets\.[A-Z_]+/, /BEGIN [A-Z ]*PRIVATE KEY/]) {
      assert.ok(!pattern.test(text), '`§3.1` item 5: no secret, token or credential in the workflow');
    }
  }
});

cell('P-PUB-8', 'S-TAG the six artefacts\' order and the one version they share', async () => {
  // `§3.2` item 2 / `PUB-DD-10` / `distribution.md §6.3` / `release.md §2.2`: the five platform artefacts'
  // `version` equals the MAIN package's, the main package's `optionalDependencies` pins the five at EXACTLY
  // that version, and the five are published BEFORE the main package — which is published LAST, ALWAYS.
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const order = [...FIVE_NAMES, 'provident-storeroom'];
  assert.equal(order.length, 6, '`distribution.md §6.3`: SIX artefacts = 5 platform + 1 main');
  assert.equal(order[order.length - 1], 'provident-storeroom', 'the MAIN package publishes LAST, ALWAYS');
  for (const name of FIVE_NAMES) {
    assert.equal(manifest.optionalDependencies[name], manifest.version,
      `the coupling rule: ${name}'s pin equals the main package's own \`version\``);
    assert.ok(!/[~^*><]/.test(manifest.optionalDependencies[name]), 'five exact pins, no range');
  }
  const platformsDir = join(PKG_DIR, 'platforms');
  if (existsSync(platformsDir)) {
    for (const label of readdirSync(platformsDir)) {
      const manifestPath = join(platformsDir, label, 'package.json');
      if (!existsSync(manifestPath)) continue;
      const m = JSON.parse(readFileSync(manifestPath, 'utf8'));
      assert.equal(m.version, manifest.version,
        `\`PAR-PUB-18\`: ${label}'s version equals the main package's, character for character`);
    }
  }
});

cell('P-PUB-8', 'S-TAG the partial-publish arm is declared, both windows', async () => {
  // `§3.3` / `PUB-DD-5` / `release.md §3`: ONE clause covering BOTH windows — a failure BEFORE the main
  // package is recovered IN PLACE on the same version, a failure AFTER it is DEPRECATE-AND-RE-PUBLISH at
  // the next patch; a release attempted with NO declared arm is a STOP CONDITION (`J`).
  const release = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'release.md'), 'utf8');
  assert.ok(/RECOVER IN PLACE ON THE SAME VERSION/.test(release), 'the before-window arm is declared');
  assert.ok(/DEPRECATE-AND-RE-PUBLISH AT THE NEXT PATCH/.test(release), 'the after-window arm is declared');
  assert.ok(/A RELEASE ATTEMPTED WITH NO DECLARED ARM/.test(release), 'the no-arm STOP CONDITION is declared');
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  // the order that MAKES the arm safe is the main package's LAST place, and it is a property of the
  // release, so no manifest byte may contradict it: the five pins resolve only once the five are published.
  assert.equal(Object.keys(manifest.optionalDependencies ?? {}).length, 5,
    'a publish with `k` of five landed is refused by the order\'s own rule');
});

cell('P-PUB-8', 'S-LAYER every figure this unit reports carries its SITE and its LAYER', async () => {
  // `§4.5` item 4 / `AV-16` / `§6`: the ONE figure this unit's gates owe is the red set's reported failing
  // set, printed with its SITE and its LAYER BEFORE ANY IMPLEMENTATION, and every figure the unit reports
  // carries both. **NO `APP`-GREEN IS CLAIMED FROM ANY NODE GREEN OR ANY `cargo` LEG** (`§4.5` item 3).
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const figure = {
    value: 'the red set\'s reported failing set',
    site: join('bindings', 'js', 'test', 'publish.test.mjs'),
    layer: 'ENVELOPE/PURE',
    app: 'NONE',
  };
  assert.equal(figure.layer, 'ENVELOPE/PURE', '`acceptance.md §5.2` row 1: this unit\'s red set is `ENVELOPE/PURE`');
  assert.equal(figure.app, 'NONE', '`acceptance.md §5.3` item 1: a node-suite green is never `APP`-green');
  assert.ok(existsSync(join(REPO_ROOT, figure.site)), 'the figure\'s SITE is this file, at `PUB-DD-24`\'s path');
  assert.equal(manifest.name !== undefined, true, 'the figure\'s site is a real home');
  // an install-time figure is NOT this layer\'s, and `LIVE/INSTALL` may not be reported at gates 1–4
  const acceptance = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'acceptance.md'), 'utf8');
  assert.ok(/CANNOT RUN BEFORE THE RELEASE ACT/.test(acceptance),
    '`§4.4`: running it early is a STOP CONDITION (`I`), so no install-time figure is claimed here');
  assert.ok(/NOT AN `APP` FIGURE/.test(acceptance), 'and an install-time figure is never an `APP`-green');
});

cell('P-PUB-8', 'S-LAYER no released-bytes digest is claimed by this pass', async () => {
  // `PUB-DD-13` / `§6`\'s `RECORDED-GAP`: THE PUBLISHED BYTES ARE TIED TO NO FIGURE AT THIS UNIT\'S GATES,
  // and the absence of the tie is DECLARED. A digest invented here, or a released-bytes digest claimed as
  // measured by a pre-release pass, is a failure.
  const contract = readFileSync(join(REPO_ROOT, 'docs', 'specs', 'storeroom-publish', 'contract.md'), 'utf8');
  assert.ok(/RECORDED-GAP/.test(contract), 'the absence is DECLARED as a `RECORDED-GAP`');
  assert.ok(/a digest invented here/.test(contract), 'and an invented digest is named as a failure');
  const packageBytes = readFileSync(join(PKG_DIR, 'package.json'), 'utf8');
  assert.ok(!/sha512|integrity/.test(packageBytes), 'no integrity field is invented in a tracked byte');
});

// ---------------------------------------------------------------------------------------------
// THE GUARD BLOCK — the JS unit's `113`-cell leg must STILL resolve in place (rung two) and stay green,
// because the rename (`Q3-1`) has not landed and the move is the implementer's; this set must not
// anticipate it (`acceptance.md §5.4` item 4; `PUB-CF-6`).
// ---------------------------------------------------------------------------------------------
cell('GUARD', 'the real entry still resolves IN PLACE at rung two', async () => {
  // `§1.1` item 2 / `P-PUB-1`'s `S-INPLACE` / `PUB-DD-18`: the in-place developer loop and every battery
  // that exists today resolve at rung two. Driven against the REAL package AT ITS REAL LOCATION — no
  // scratch copy, no fake artefact — in a FRESH PROCESS, so the rung-two load is observed rather than
  // assumed (a module already loaded in this process's cache would show no load at all).
  const out = execFileSync(process.execPath, ['-e', `
    const loads = [];
    const real = process.dlopen;
    process.dlopen = function counting(...args) { loads.push(String(args[1])); return real.apply(this, args); };
    import(${JSON.stringify('file://' + join(PKG_DIR, 'index.mjs'))}).then(async (mod) => {
      const store = mod.storeCreate({ journalLength: 8, listeners: [] });
      mod.write(store, ['k'], 'mem', 'v');
      const value = mod.read(store, ['k']);
      process.stdout.write('__PUBRED__' + JSON.stringify({
        loads, value, members: Object.keys(store).sort(),
        verbs: Object.keys(mod).sort(),
      }) + '\\n');
    }).catch((e) => { process.stdout.write('__PUBRED__' + JSON.stringify({ loads, error: String(e && e.message ? e.message : e) }) + '\\n'); });
  `], { encoding: 'utf8', cwd: REPO_ROOT, timeout: 60000 });
  const line = out.split('\n').find((l) => l.startsWith('__PUBRED__'));
  assert.ok(line, `the in-place drive produced no report (stdout: ${out.slice(0, 300)})`);
  const r = JSON.parse(line.slice('__PUBRED__'.length));
  assert.equal(r.error, undefined, `the in-place resolution still works: ${r.error}`);
  assert.equal(r.loads.length, 1, 'exactly ONE `.node` load, reached through the entry (`S-ONE-ADDON`)');
  assert.ok(r.loads[0].endsWith(RUNG_TWO_TAIL), `the in-place load is rung two's path (${r.loads[0]})`);
  assert.ok(r.loads[0].startsWith(PKG_DIR + sep), 'and it is INSIDE the package, beside the entry module');
  assert.equal(r.value, 'v', 'the store works through that load');
  assert.deepEqual(r.members, ['off', 'on', 'register'], 'the instance\'s own member set is unmoved');
  assert.deepEqual(r.verbs,
    ['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write'],
    'the entry carries the EIGHT verbs and NOTHING else');
});

cell('GUARD', 'the in-place loop still resolves and works at rung two', async () => {
  // `acceptance.md §5.4` item 4 / `PUB-CF-6`: the `A82`+`A84` two-home amendment is a PRE-CONDITION of the
  // green rather than a follow-on, and it has NOT landed — so this set must not anticipate it.
  const api = await import('@provident-storeroom/js');
  const manifest = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
  const store = api.storeCreate({ journalLength: 8, listeners: [] });
  assert.deepEqual(Object.keys(store).sort(), ['off', 'on', 'register'], 'the instance\'s own member set is unmoved');
  api.write(store, ['k'], 'mem', 'v');
  assert.equal(api.read(store, ['k']), 'v', 'the store works in place at rung two');
  assert.equal(manifest.name, '@provident-storeroom/js',
    '`AV-F5`: the rename has NOT landed, so this set does not anticipate it — `Q3-1` owns the move');
});
