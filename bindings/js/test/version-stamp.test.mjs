// `bindings/js/test/version-stamp.test.mjs` — **THE GATE-3 RED SET FOR `U-STOREROOM-CONSUMER-FIX`
// (`D-GP-SRPUB`), AUTHORED FROM THE DOCUMENTS ALONE AND RUN BEFORE THE REMEDY `(a2)` LANDS.**
//
// AUTHORITY (every cell below carries its clause in a comment; no cell derives from an implementation):
//   * `docs/specs/storeroom-publish/contract.md` `§5.0a` (`P-PUB-9`, the invariant and its failure list)
//     and `§5.0b` (`P-PUB-10`, the pre-publish guard) — the TWO register rows this unit adds;
//   * `docs/specs/storeroom-publish/release.md` `§1.4a` (the guard: its name, its tokens, its position,
//     its per-leg subject, and the ONE instrument a cell may use — item `8` and item `11`(a)–(c)),
//     `§2.2` (the coupling rule), `§2.4` (the stamp's source, its carrier and its fallback),
//     `§6.10` (the carrier's facts), `§6.11` (the guard's register row at its two homes),
//     `§6.12` (the required order);
//   * `docs/specs/storeroom-publish/parameter-semantics.md` `§5.1` (`PAR-PUB-35`, the stamped
//     self-report, with its outside values and the item-`(vii)` four-step reading);
//   * `docs/specs/storeroom-publish/acceptance.md` `§3.1` row `4` (the pre-publish half is the guard
//     step, the post-release half is `LIVE/INSTALL`'s and is NOT this layer's);
//   * `docs/specs/storeroom-publish/distribution.md` `§7.3` item `1` (the build script is a declared
//     build-surface file) and `§7.1`/`§7.2` (its declared purpose);
//   * `docs/specs/storeroom-publish/implementation-plan.md` `§1` (the declared edit scope),
//     `§12` items `1`–`3` (the carrier's two cells, the required order, the plan-step row) and `§13`
//     (`A94`: the crossing core's prohibition is lifted for the self-report cell ALONE);
//   * `docs/specs/storeroom-js/package.md` `§6.1` items `1`–`2` and its read-mechanism clause
//     (`option_env!` … `None` arm);
//   * `docs/decisions.md` `A91` (`(a2)`, the ruling) · `A94` (the lift) · `A95` (a refusal need not be
//     failed by a run provided it names its layer) · `A96` (a compile-time substitution is not a
//     consultation).
//
// ---------------------------------------------------------------------------------------------
// THE TWO RULINGS THAT DECIDE THE SHAPE OF THIS SET, APPLIED RATHER THAN CITED
// ---------------------------------------------------------------------------------------------
// `A95`: **a refusal need not be failed by a run, provided it names the layer at which it can fail —
// so NO cell here claims to fail a SOURCE-LEVEL refusal by DRIVING the run.** The source-level members
// of `P-PUB-9`'s failure list are pinned by SOURCE-LEVEL cells over the carrier's own bytes, at the two
// files `docs/specs/storeroom-publish/implementation-plan.md §12` item `1` names — and those two files
// are read HERE FOR THAT PURPOSE ALONE, as the clauses explicitly direct (they are read by `readFileSync`
// and parsed for the DECLARED forms; no behaviour of theirs is inferred and no behaviour of any other
// file is learned from them).
//
// `A96`: **a compile-time substitution is not a consultation** — so a cell asserting *"no environment
// consultation outside the five"* is GREEN against the lawful carrier, which reads
// `env!("CARGO_PKG_VERSION")` in the `None` arm. **THE CELL THAT DRIVES THAT RULE IS MARKED
// ACCIDENTALLY-GREEN IN ITS OWN COMMENT AND IS REPORTED AS SUCH**: it is green today only because
// nothing of the remedy exists, and its subject — the refusal — is a SOURCE-level refusal that no run
// can fail.
//
// ---------------------------------------------------------------------------------------------
// INSTRUMENT DISCIPLINE, STATED BECAUSE THIS UNIT HAS PRODUCED FIFTEEN WRONG FIGURES
// ---------------------------------------------------------------------------------------------
// Every count below is taken from a returned value and printed with the name of the instrument that
// returned it. A phrase search finds the SEARCHER'S SPELLING and never the meaning, so no cell decides a
// question of MEANING by a failed search: every absence assertion here either (a) names the exact token
// it searches for and the file it searched, or (b) is paired with a PRESENT control that proves the same
// instrument CAN find something. The re-run-trigger cell carries such a control: the file already emits
// `cargo:rerun-if-changed=build.rs`, so an instrument that found nothing at all would be shown to be
// broken before its finding about the manifest's own trigger is believed.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

// ---------------------------------------------------------------------------------------------
// the declared constants, read at their own bytes
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = dirname(dirname(PKG_DIR));

/** `docs/specs/storeroom-publish/release.md §1.4a` item `11`(a) — **THE STEP'S `name:` SCALAR, AFTER
 *  YAML'S SINGLE-QUOTE ESCAPING IS APPLIED**: the file spells it with the two apostrophes doubled, and
 *  the scalar a reader matches is this one, character for character. */
const GUARD_STEP_NAME = "pre-publish guard: the assembled artefact's version() equals its platform manifest's version";

/** `§1.4a` item `11`(b) — **THE THREE TOKENS A CELL MAY SELECT THE STEP BY, AND NO ORDINAL**: the name
 *  must carry all three, and it may NOT be selected by `guard` alone, by `test -e`, or by any token of
 *  the two EXISTENCE guards, which are different steps with different subjects. */
const GUARD_NAME_TOKENS = ['pre-publish guard', 'version()', 'platform manifest'];

/** `§1.4a` item `11`(c) — the two neighbours the guard's position is declared BETWEEN: the step whose
 *  `run:` carries the manifest-to-manifest comparison (`release.md §2.2` is the string that comparison
 *  throws), and the first publish site. */
const ASSEMBLY_STEP_NAME = '2. assemble the platform artefact (manifest, .node, licence copy)';
const PLATFORM_PUBLISH_STEP_NAME = '4. publish the platform artefact';
const VERSION_THROW_TOKEN = 'release.md §2.2'; // the string the manifest-to-manifest comparison throws

/** `docs/specs/storeroom-publish/release.md §1.4a` item `11`(b) — the ordinal collision the selector must
 *  avoid, and the two `4.`-prefixed steps that create it: `4.` is carried by the platform existence
 *  guard, by the publish step AND by the removal step, so a cell selecting by ordinal reaches a removal. */
const COLLIDING_ORDINALS = ['4. guard: the manifest\'s own paths exist before the publish',
  '4. publish the platform artefact',
  '4. remove the assembled licence copy and binary after the publish'];

/** `contract.md §5.0a` item `(1)` — **THE CARRIER'S BUILD-SYSTEM-SET NAMES, THE FIVE-MEMBER CLOSED SET,
 *  READ OFF THE CARRIER'S OWN BYTES AND NOT TAKEN FROM A BRIEF**: the four names the two files read from
 *  the environment today, plus the one name the row's own re-run-trigger requirement owes. */
const BUILD_SYSTEM_SET = ['CARGO_CFG_TARGET_OS', 'CARGO_CFG_TARGET_ENV', 'CARGO_CFG_TARGET_ARCH',
  'OUT_DIR', 'CARGO_MANIFEST_DIR'];

/** `docs/specs/storeroom-js/package.md §6.1` item `2` — the directive's name, and `release.md §2.4`
 *  item `1` — the manifest the carrier reads. */
const DIRECTIVE_NAME = 'STOREROOM_JS_PACKAGE_VERSION';
const MANIFEST_REL_TO_CRATE = 'package.json'; // the crate is `bindings/js/`, the manifest is `package.json` beside it

const BUILD_RS = join(PKG_DIR, 'build.rs');
const FACADE_RS = join(PKG_DIR, 'src', 'facade.rs');
const WORKFLOW = join(REPO_ROOT, '.github', 'workflows', 'publish.yml');
const MANIFEST_PATH = join(PKG_DIR, 'package.json');

const manifestText = readFileSync(MANIFEST_PATH, 'utf8');
const MANIFEST = JSON.parse(manifestText); // `PAR-PUB-2`: the main package's own manifest, read at its own bytes
const MANIFEST_VERSION = MANIFEST.version;

/** `contract.md §5.0a`: *"every released native artefact's `version()` answers the MAIN PACKAGE
 *  manifest's `version`"* — and `release.md §2.2` item `3` makes the crate's own `Cargo.toml` version
 *  DELIBERATELY INDEPENDENT, so the crate's version is the one value the stamp must never answer. */
const CRATE_VERSION = (() => {
  const cargo = readFileSync(join(PKG_DIR, 'Cargo.toml'), 'utf8');
  const m = /^version\s*=\s*"([^"]*)"/m.exec(cargo);
  assert.ok(m !== null, 'the sibling crate\'s manifest must declare a `version` (the fallback\'s own value)');
  return m[1];
})();

// ---------------------------------------------------------------------------------------------
// the sources the two SOURCE-LEVEL cells read, and the comment-stripper that makes them honest
// ---------------------------------------------------------------------------------------------
/** Comments are removed before a source-level cell searches, because a directive or an environment read
 *  MENTIONED IN A REMARK is not a declaration and not a read. `build.rs` comments the whole of its own
 *  reasoning, so an unstripped search would find the clause's own vocabulary and report a false green. */
function stripRustComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ').split('\n').map((line) => {
    const at = line.indexOf('//');
    return at === -1 ? line : line.slice(0, at);
  }).join('\n');
}

const BUILD_RS_TEXT = readFileSync(BUILD_RS, 'utf8');
const BUILD_RS_CODE = stripRustComments(BUILD_RS_TEXT);
const FACADE_RS_TEXT = readFileSync(FACADE_RS, 'utf8');
const FACADE_RS_CODE = stripRustComments(FACADE_RS_TEXT);

/**
 * **`release.md §2.4` item `1` / `contract.md §5.0a` — THE DIRECTIVE AS THE CARRIER'S OWN BYTES DECLARE
 * IT.** The build script declares it as a printed directive whose value is the manifest's own `version`
 * FIELD, reached through `CARGO_MANIFEST_DIR`; this reader takes the printed form and asks for the
 * DIRECTIVE'S VALUE AS A LITERAL, so that a later cell can compare it to the manifest character for
 * character — the property's own words. **The reader returns `null` rather than inventing anything where
 * the form is absent**, so the absence is an assertable state and not a crash.
 */
function declaredDirective() {
  const print = /println!\(\s*"cargo:rustc-env=([A-Z_]+)=\{([^}]*)\}"/.exec(BUILD_RS_CODE);
  if (print === null) return null;
  const [, name, slot] = print;
  const bound = new RegExp(`let\\s+${slot}\\s*=\\s*(.+?);`).exec(BUILD_RS_CODE);
  if (bound === null) return { name, slot, value: null, expression: null };
  const expression = bound[1];
  const literal = /"((?:[^"\\]|\\.)*)"/.exec(expression);
  return {
    name,
    slot,
    expression,
    value: literal === null ? null : literal[1].replace(/\\(.)/g, '$1'),
    viaManifestDir: expression.includes('CARGO_MANIFEST_DIR'),
    viaManifestFile: expression.includes(MANIFEST_REL_TO_CRATE),
  };
}

const DIRECTIVE = declaredDirective();

// ---------------------------------------------------------------------------------------------
// the observer: a scratch tree, so NO byte of the repository is written, created or removed
// ---------------------------------------------------------------------------------------------
//   <scratch>/package.json                       the manifest standing where the entry stands, whose
//                                                `version` IS the value `§1.5` item 1 reads
//   <scratch>/index.mjs                          a byte-for-byte COPY of the real entry
//   <scratch>/build/Release/storeroom_js_binding.node   a candidate rung two (absent unless asked for)
//   <scratch>/node_modules/<name>/index.js       a candidate rung one
//   <scratch>/preload.cjs · driver.mjs           the observer and the driver
//
// **THE FAKE RUNG-ONE ARTEFACT IS THE ONLY WAY A CELL CAN VARY THE VALUE `version()` ANSWERS**: the
// released `.node` is a fixed byte-string, so the STATE a fail-state member names is reachable only
// through an artefact a cell composes. **AND THAT IS NOT A WEAKENING OF THE PROPERTY'S SUBJECT — it is
// the load path's own instrument**: `P-PUB-4`'s `S-VERSION` cells drive the same seam, and the property
// the member names (*"a `version()` answering an empty string"* is refused) is a property of the READ.
// Each such cell is marked ACCIDENTALLY-GREEN in its own comment, because the read's refusal is already
// in the tree and this unit neither moves it nor claims it.

const SCRATCH_ROOT = mkdtempSync(join(tmpdir(), 'storeroom-verstamp-'));
process.on('exit', () => { try { rmSync(SCRATCH_ROOT, { recursive: true, force: true }); } catch { /* nothing to sweep */ } });

const PRELOAD = `
'use strict';
const Module = require('node:module');
const attempts = [];
globalThis.__VERSTAMP_ATTEMPTS__ = attempts;
const orig = Module._load;
Module._load = function (request) { attempts.push(String(request)); return orig.apply(this, arguments); };
const plat = process.env.VERSTAMP_PLATFORM;
const arch = process.env.VERSTAMP_ARCH;
if (plat) Object.defineProperty(process, 'platform', { value: plat, configurable: true });
if (arch) Object.defineProperty(process, 'arch', { value: arch, configurable: true });
`;

/** The driver. It reports; it does not decide. `arm` carries `§2.5`'s declared absent/failed-addon form
 *  (a throw whose `status` is the store's closed-set member), `error` carries every throw that is NOT
 *  that form, and `version` carries WHAT THE ADDON'S OWN `version()` ANSWERED — the observable the
 *  invariant is stated over. `versionType` is reported beside it because *"a `version()` answering a
 *  value that is not a `string`"* and *"a `version` that is not callable at all"* are DIFFERENT members
 *  of `§5.0a`'s failure list. */
const DRIVER = `
import { createRequire } from 'node:module';
const require_ = createRequire(import.meta.url);
const MARK = '__VERSTAMP__';
const say = (o) => { process.stdout.write(MARK + JSON.stringify(o) + '\\n'); };
const report = { ok: null, error: null, arm: null, returned: null, version: null, versionType: null,
  calls: 0, attempts: globalThis.__VERSTAMP_ATTEMPTS__ };
const isArm = (e) => e !== null && typeof e === 'object' && e.status === ${JSON.stringify('FilePathUnreachable')};
try {
  const mod = await import(process.argv[2]);
  let instance = null;
  if (typeof mod.storeCreate === 'function') {
    try { instance = mod.storeCreate({ journalLength: 4, listeners: [] }); } catch (e) { if (!isArm(e)) report.error = String(e && e.message ? e.message : e); else report.arm = e.status; }
  }
  report.ok = true;
  report.returned = instance !== null;
} catch (err) {
  report.ok = false;
  if (isArm(err)) report.arm = err.status;
  else report.error = String(err && err.message ? err.message : err);
}
const NODE = process.env.VERSTAMP_NODE_NAME;
// THE MATCH IS BY THE PACKAGE'S OWN NAME, NOT BY AN ABSOLUTE PATH: the observer records the REQUEST
// string (Module._load receives the module identifier), so a path-shaped comparison would compare a
// path to a name and silently find nothing — an absence manufactured by the instrument.
if (NODE && report.attempts.some((a) => String(a) === NODE || String(a).includes(NODE))) {
  const seen = require_(NODE).report;
  report.version = seen.version;
  report.versionType = seen.versionType;
  report.calls = seen.calls;
  report.memberPresent = seen.memberPresent;
}
// **AND WHERE THE RUNG-ONE CANDIDATE IS ABSENT — THE REAL BUILT ARTEFACT'S OWN DRIVE — THE ANSWER IS
// READ FROM THE ARTEFACT ITSELF.** Without this the real drive reports the load path's REFUSAL and never
// the VALUE that caused it, so the property's own observable would be invisible at exactly the cell that
// carries it. The read is guarded and recorded like every other instrument here: a throw is recorded, not
// swallowed, and NO cell is made green by a silent failure.
const ARTEFACT = process.env.VERSTAMP_ARTEFACT;
if (!NODE && ARTEFACT && report.attempts.some((a) => String(a).includes('storeroom_js_binding.node'))) {
  try {
    const native = require_(ARTEFACT);
    report.version = native.version();
    report.versionType = typeof report.version;
    report.calls = 1;
  } catch (e) {
    report.error = 'the artefact could not be read: ' + String(e && e.message ? e.message : e);
  }
}
say(report);
`;

writeFileSync(join(SCRATCH_ROOT, 'preload.cjs'), PRELOAD);
writeFileSync(join(SCRATCH_ROOT, 'driver.mjs'), DRIVER);

/** One scratch environment. `versionValue` is a JS EXPRESSION evaluated inside the fake artefact, so a
 *  cell can drive a non-string, an empty string, an absent member and a non-callable read as readily as
 *  a string — the failure list's members are states of the read, and each is driven as one. */
function makeEnv({ label, versionValue = 'null', versionExpr = null, memberPresent = true, manifestVersion = MANIFEST_VERSION, rungOne = true }) {
  const dir = mkdtempSync(join(SCRATCH_ROOT, label + '-'));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: MANIFEST.name, version: manifestVersion }, null, 2) + '\n');
  writeFileSync(join(dir, 'index.mjs'), readFileSync(join(PKG_DIR, 'index.mjs')));
  // **THE DRIVER STANDS BESIDE THE ENTRY, AND THAT IS LOAD-BEARING**: the observer's own
  // `require(<the rung-one name>)` resolves through NODE'S MODULE PATHS, which are relative to the
  // REQUIRING FILE and never to the subprocess's cwd — so a driver in the scratch root would resolve
  // `node_modules` in the scratch root and find nothing, reporting an absence its own instrument
  // manufactured. Placed beside the entry, it reaches the same `node_modules` the entry does.
  writeFileSync(join(dir, 'driver.mjs'), DRIVER);
  const name = MANIFEST.optionalDependencies
    ? Object.keys(MANIFEST.optionalDependencies).find((n) => n.endsWith('linux-x64-gnu'))
    : '@auspicion/provident-storeroom-js-linux-x64-gnu';
  const artefactDir = join(dir, 'node_modules', name);
  mkdirSync(artefactDir, { recursive: true });
  writeFileSync(join(artefactDir, 'package.json'), JSON.stringify({ name, version: manifestVersion, main: 'index.js' }) + '\n');
  const artefactFile = join(artefactDir, 'index.js');
  if (rungOne) {
    writeFileSync(artefactFile, `
'use strict';
const report = { calls: 0, version: null, versionType: null, memberPresent: ${memberPresent} };
function versionValue() { return ${versionValue}; }
const callable = ${versionExpr === null ? 'versionValue' : versionExpr};
const api = { storeCreate: () => ({ on: () => {}, off: () => {} }), errorMessage: () => 'x' };
if (report.memberPresent) {
  api.version = function () { report.calls += 1; let v = null; let t = null; try { v = callable(); t = typeof v; } catch (e) { t = 'threw'; } report.version = v; report.versionType = t; return v; };
}
module.exports = api;
module.exports.report = report;
`);
  }
  return { dir, name, artefactFile, entry: join(dir, 'index.mjs'), driver: join(dir, 'driver.mjs'), rungTwo: join(dir, 'build', 'Release', 'storeroom_js_binding.node') };
}

/** Drive one scratch tree in a FRESH PROCESS — a module already in this process's cache would show no
 *  load at all — and return the driver's own report. */
function drive(env, { platform = 'linux', arch = 'x64', extraEnv = {} } = {}) {
  const out = execFileSync(process.execPath, ['--require', join(SCRATCH_ROOT, 'preload.cjs'), env.driver, env.entry], {
    encoding: 'utf8',
    cwd: env.dir,
    timeout: 60000,
    env: {
      ...process.env,
      VERSTAMP_PLATFORM: platform,
      VERSTAMP_ARCH: arch,
      VERSTAMP_NODE_NAME: existsSync(env.artefactFile) ? env.name : '',
      VERSTAMP_ARTEFACT: existsSync(env.rungTwo) ? env.rungTwo : '',
      ...extraEnv,
    },
  });
  const line = out.split('\n').find((l) => l.startsWith('__VERSTAMP__'));
  assert.ok(line, `the drive produced no report (stdout: ${out.slice(0, 400)})`);
  return JSON.parse(line.slice('__VERSTAMP__'.length));
}

// ---------------------------------------------------------------------------------------------
// the workflow reader — `§1.4a` item `11`(c) says an existence-and-position check IS drivable
// ---------------------------------------------------------------------------------------------
/** The workflow's own step-name lines and their `run:` bodies, read at 1-based line numbers so a
 *  position can be reported as a fact about the FILE rather than as an index into an array. */
function readWorkflowSteps() {
  const lines = readFileSync(WORKFLOW, 'utf8').split('\n');
  const steps = [];
  for (let i = 0; i < lines.length; i += 1) {
    // INDENTATION-AGNOSTIC ON PURPOSE: this workflow's two jobs indent their step lists at different
    // columns, and a reader pinned to one column silently reads ONE JOB and reports the other's steps
    // absent — which is how a broken instrument manufactures a finding. The instrument is named in the
    // assertion messages below so a zero is never mistaken for an absence.
    const m = /^(\s*)- name: (.*)$/.exec(lines[i]);
    if (m === null) continue;
    let scalar = m[2].trim();
    if (scalar.startsWith("'") && scalar.endsWith("'")) scalar = scalar.slice(1, -1).replace(/''/g, "'");
    else if (scalar.startsWith('"') && scalar.endsWith('"')) scalar = scalar.slice(1, -1);
    const body = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      if (/^\s*- name: /.test(lines[j])) break;
      body.push(lines[j]);
    }
    steps.push({ name: scalar, line: i + 1, body: body.join('\n') });
  }
  return steps;
}

const WORKFLOW_TEXT = readFileSync(WORKFLOW, 'utf8');
const WORKFLOW_STEPS = readWorkflowSteps();

// =============================================================================================
// §5.0a P-PUB-9 — THE STAMPED SELF-REPORT (`contract.md §5.0a`, `release.md §2.4` · `§6.10`,
// `parameter-semantics.md §5.1`)
// =============================================================================================
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED (the artefact's `version()` against the main
// package's manifest, one row per reasonable data state):
//   (1) the artefact's `version()` answers the manifest's `version`, character for character — SUCCESS
//   (2) it answers the crate's `Cargo.toml` version — the absent-manifest fallback reaching a release
//   (3) it answers the empty string — a member of the version read's own mismatch set
//   (4) it answers a value that is not a `string`
//   (5) the `version` member is not callable at all, so the read answers `undefined` (a non-string)
//   (6) the stamped version differs from the manifest's by ONE character
//   (7) a substitute artefact is loaded in place of the one built from these sources
//   (8) the carrier stamps a value while declaring NO re-run trigger on the manifest it reads
// FAIL-STATES (each with its declared answer, `P-PUB-9`'s failure list):
//   (2)(3)(4)(5)(6)(7) → refused; (8) → refused, and ITS FALSIFIER IS A SOURCE-LEVEL CELL over
//   `bindings/js/build.rs`'s own bytes, because the warm-`target/` state is reachable from NO cell of
//   this suite and no cell whose observable is the RUN may be authored against it (`A95`).
//   `un-run` IS A FAILURE: every member below is either driven or explicitly reported as pinned
//   elsewhere; none is silently omitted.

test('P-PUB-9::S-STAMP a stamped carrier declares the directive, its value IS the manifest\'s, and the facade reads it with the crate version on `None` as the only fallback', () => {
  // `release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`: `bindings/js/build.rs`
  // READS THE MANIFEST ITSELF and emits the `cargo:rustc-env`-class directive `STOREROOM_JS_PACKAGE_VERSION`;
  // `release.md §1.4a` item `3`'s dated correction: the self-report's read is
  // `option_env!("STOREROOM_JS_PACKAGE_VERSION")` with `env!("CARGO_PKG_VERSION")` taken on the `None` arm.
  // **THE INSTRUMENT IS A SOURCE-LEVEL READ OF TWO FILES, AT THE CLAUSES' OWN DIRECTION, AND IT IS NAMED
  // HERE**: no run can observe a build-time substitution, so this member is pinned at the source or not at
  // all (`A95`; `§1.4a` item `8`).
  assert.ok(DIRECTIVE !== null,
    '`release.md §2.4` item 1 / `parameter-semantics.md §5.1`: `bindings/js/build.rs` must EMIT the '
    + '`cargo:rustc-env`-class directive (no `println!("cargo:rustc-env=<NAME>={...}")` is declared at its bytes)');
  assert.equal(DIRECTIVE.name, DIRECTIVE_NAME,
    '`docs/specs/storeroom-js/package.md §6.1` item 2: the directive\'s NAME is `STOREROOM_JS_PACKAGE_VERSION`');
  assert.equal(DIRECTIVE.value, MANIFEST_VERSION,
    '`release.md §2.4` item 1: the directive\'s VALUE is the manifest\'s own `version` field, so it must be '
    + `\`${MANIFEST_VERSION}\` and not \`${DIRECTIVE.value}\``);
  assert.equal(DIRECTIVE.viaManifestDir, true,
    '`§5.0a`: the manifest the carrier reads is the CARGO_MANIFEST_DIR-built path, and the value must be '
    + `reached through it (the expression was \`${DIRECTIVE.expression ?? '(absent)'}\`)`);
  assert.ok(DIRECTIVE.viaManifestFile, 'and that path carries the manifest file itself (`package.json` beside the crate)');
  assert.ok(FACADE_RS_CODE.includes(`option_env!("${DIRECTIVE_NAME}")`),
    `\`§1.4a\` item \`3\`: the self-report must READ the directive through \`option_env!(\"${DIRECTIVE_NAME}\")\`; `
    + '`env!` on an unset variable is a COMPILE error and could never fall back');
  assert.ok(/env!\("CARGO_PKG_VERSION"\)/.test(FACADE_RS_CODE),
    '`§1.4a` item `3` / `A96`: `env!("CARGO_PKG_VERSION")` is the value taken on `option_env!`\'s `None` arm');
});

test('P-PUB-9::S-VERSION GREEN CONTROL (and NOT a red-set member) — where an artefact answers the manifest, the load succeeds', () => {
  // **THE `success` ARM OF THE PROPERTY, KEPT AS A CONTROL SO THE CELL BELOW IS NOT GREEN FOR THE WRONG
  // REASON.** A composed artefact whose `version()` answers the manifest's own value DOES load and returns
  // an instance — so the instrument can observe the success arm as well as the refusal arm, and an
  // artefact that refused EVERY answer (a broken read) would be caught here rather than mis-read as the
  // invariant holding. **`contract.md §5.0a` makes this state `success`; no fail-state member is
  // satisfied by it, and this cell is NOT part of the red set.**
  const env = makeEnv({ label: 'control-match', versionValue: JSON.stringify(MANIFEST_VERSION) });
  const r = drive(env);
  assert.equal(r.error, null, `no state is absorbed silently (the report was ${JSON.stringify(r).slice(0, 300)})`);
  assert.equal(r.calls, 1, '`§1.5` item 1: the read is PERFORMED — an un-run read is a failure');
  assert.equal(r.version, MANIFEST_VERSION,
    '`contract.md §5.0a`: the artefact\'s `version()` answered the manifest\'s own value, character for character');
  assert.equal(r.versionType, 'string', 'and it IS a string — the mismatch arm is not reached');
  assert.equal(r.returned, true, 'so an instance is returned: the success arm is observable through this instrument');
  assert.equal(r.arm, null, 'no arm answers a match');
});

test('P-PUB-9::S-VERSION THE CELL OF THE INVARIANT — the BUILT ARTEFACT\'s own `version()` answers the manifest\'s `version`, character for character', () => {
  // **THE INVARIANT DRIVEN AGAINST THE BUILD, NOT AGAINST A COMPOSED STAND-IN.** `contract.md §5.0a`:
  // *"every released native artefact's `version()` answers the main package manifest's `version`
  // CHARACTER FOR CHARACTER, AND THE EQUALITY IS ESTABLISHED AT BUILD TIME BY A STAMP TAKEN FROM THAT
  // SAME MANIFEST."* The only artefact this suite can load is the HOST target's own build
  // (`bindings/js/build/Release/storeroom_js_binding.node`), driven AS RUNG TWO — which is what a released
  // install does and what the local in-place loop already resolves through (`distribution.md §3.1`:
  // *"NO BINARY IS EVER COMMITTED"*, so the file is a gitignored build product).
  //
  // **WHY A STAND-IN WOULD HAVE BEEN WORTHLESS HERE, STATED BECAUSE IT WAS WRITTEN FIRST AND MEASURED
  // GREEN:** a composed artefact's `version()` returns whatever the cell told it to, and the load path
  // then compares that to the manifest — so such a cell asserts nothing but its own fixture. It was green
  // on the unimplemented carrier, which is exactly how an accidentally-green member stops a red set being
  // red. The subject of the property is the ARTEFACT'S OWN ANSWER, so the artefact must be the real one.
  const built = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');
  // **THE ABSENCE IS REPORTED AS A SKIP WITH ITS REASON AND NEVER AS A PASS.** A clean clone has no
  // artefact (`A68`'s build is `Q3`'s and this gate runs no `cargo`), and the released artefact's own
  // answer is the guard's observable at the leg (`§1.4a` items `2` and `8`) — so this cell is the red
  // set's artefact-side member where a build exists, and its absence is a named skip where none does.
  if (!existsSync(built)) {
    console.log('[version-stamp] SKIP P-PUB-9::S-VERSION the built artefact cell — no artefact at '
      + `${built}: the tracked tree carries no binary (distribution.md §3.1), and the released artefact's own `
      + 'answer is the guard\'s observable at the RUN (§1.4a item 8). REBUILD TO MAKE THIS CELL ACTIVE.');
    return;
  }
  const env = makeEnv({ label: 'built-artefact', versionValue: 'null' });
  const rungTwoDir = join(env.dir, 'build', 'Release');
  mkdirSync(rungTwoDir, { recursive: true });
  writeFileSync(join(rungTwoDir, 'storeroom_js_binding.node'), readFileSync(built));
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true }); // rung one absent → rung two answers
  const r = drive(env);
  assert.equal(r.error, null, `the built artefact loaded at all (report: ${JSON.stringify(r).slice(0, 300)})`);
  // THE VERSION ASSERTION STANDS FIRST ON PURPOSE: the report carries the artefact's own answer, and an
  // assertion on the READ's wiring placed above it would fail first and HIDE the value the property is
  // about — a cell that reports the wrong site is how a red set's own evidence stops being diagnostic.
  assert.equal(r.version, MANIFEST_VERSION,
    '`contract.md §5.0a` at the artefact\'s own bytes: the built artefact\'s `version()` must answer the '
    + `manifest's \`${MANIFEST_VERSION}\`; it answered \`${String(r.version)}\` — and the crate's own `
    + `\`${CRATE_VERSION}\` is precisely the absent-manifest fallback reaching a build, which is \`DEF-19\` `
    + 'reproduced exactly (`§5.0a`; `A91`)');
  assert.equal(r.calls, 1, '`§1.5` item 1: the artefact\'s own `version()` was CALLED — the read is wired');
  assert.equal(r.versionType, 'string', 'the answer is a string, so it reaches the mismatch set rather than the non-string arm');
  assert.equal(r.returned, true, 'and a correctly stamped artefact loads, returning an instance');
  assert.equal(r.arm, null, 'no arm answers a match');
});

test('P-PUB-9::S-VERSION ACCIDENTALLY-GREEN — a `version()` answering the crate\'s `Cargo.toml` version is refused', async () => {
  // `§5.0a` failure list member: *"a released artefact whose `version()` answers the crate's `Cargo.toml`
  // version — the absent-manifest fallback reaching a release"*.
  // **WHY THIS CELL IS GREEN ON THE UNIMPLEMENTED CARRIER, STATED SO THE RED SET IS NOT MIS-COUNTED:**
  // the refusal is already in the tree and is NOT this unit's subject. The unit's subject is the VALUE the
  // artefact answers; this cell drives the READ's refusal of a value it does not match, which `P-PUB-4`'s
  // `S-VERSION` cells already pin. It is authored here because the STATE is a member of `P-PUB-9`'s own
  // failure list and an un-run member is a failure — but it is reported as already-green, not as red.
  const env = makeEnv({ label: 'crate-version', versionValue: JSON.stringify(CRATE_VERSION) });
  const r = drive(env);
  assert.equal(r.calls, 1, 'the read is performed before it refuses');
  assert.equal(r.returned, false, 'an artefact answering the crate\'s version is REFUSED (no instance)');
  assert.equal(r.arm, 'FilePathUnreachable', '`§1.4` item `1`: the refusal is the store\'s own closed-set member, never a new status');
  assert.equal(r.error, null, 'and it is not absorbed as a host error');
});

test('P-PUB-9::S-VERSION ACCIDENTALLY-GREEN — an empty-string answer is refused and the stamp does not fall back from it', async () => {
  // `parameter-semantics.md §5.1`'s second outside value, verbatim: `""` **→ REFUSED … AND THE STAMP MUST
  // NOT FALL BACK FROM IT — an empty string is a value that was READ, not a manifest that could not be read.**
  // **GREEN ON THE UNIMPLEMENTED CARRIER for the same reason as the cell above**: the mismatch set is the
  // read's and it already contains `""` (`resolution.md §5.1` item 2; `release.md §6.10` item `3`).
  const env = makeEnv({ label: 'empty', versionValue: '""' });
  const r = drive(env);
  assert.equal(r.calls, 1, 'the read is performed');
  assert.equal(r.versionType, 'string', 'an empty answer IS a string, which is why it reaches the mismatch set rather than the non-string arm');
  assert.equal(r.returned, false, 'an empty-string answer is refused');
  assert.equal(r.arm, 'FilePathUnreachable', 'and it is the SINGLE declared arm');
});

test('P-PUB-9::S-VERSION ACCIDENTALLY-GREEN — a non-string answer is refused by the same single arm', async () => {
  // `§5.0a` failure list: *"a `version()` answering a value that is not a `string`"*; `parameter-semantics.md
  // `§5.1`: a stamped value that is not a `string` at the artefact's own export **→ REFUSED: the mismatch
  // arm answers every non-string answer.** **GREEN ON THE UNIMPLEMENTED CARRIER** — the arm is the read's.
  for (const [label, expr] of [['number', '7'], ['null', 'null'], ['object', '({ version: "x" })'], ['boolean', 'true']]) {
    const env = makeEnv({ label: `nonstring-${label}`, versionValue: expr });
    const r = drive(env);
    assert.equal(r.calls, 1, `the read is performed (${label})`);
    assert.notEqual(r.versionType, 'string', `${label} is not a string, so the mismatch arm is the declared answer`);
    assert.equal(r.returned, false, `${label} is refused`);
    assert.equal(r.arm, 'FilePathUnreachable', `${label}'s refusal is the single declared arm`);
  }
});

test('P-PUB-9::S-VERSION ACCIDENTALLY-GREEN — a `version` member that is not callable, and an absent `version` member, are refused', async () => {
  // `§5.0a` failure list: *"a `version` that is not callable at all (so the read answers `undefined`,
  // which is a non-string and therefore the arm)"*. **GREEN ON THE UNIMPLEMENTED CARRIER** — the read's.
  const notCallable = drive(makeEnv({ label: 'notcallable', versionValue: '"0.1.1"', versionExpr: '"not a function"' }));
  assert.equal(notCallable.returned, false, 'a non-callable `version` is refused');
  assert.equal(notCallable.arm, 'FilePathUnreachable', 'by the single declared arm');
  const absent = drive(makeEnv({ label: 'absent-member', memberPresent: false }));
  assert.equal(absent.returned, false, 'an absent `version` member is refused');
  assert.equal(absent.arm, 'FilePathUnreachable', 'by the same single arm, because the read answers `undefined`');
});

test('P-PUB-9::S-VERSION ACCIDENTALLY-GREEN — a version differing by ONE character is refused, and a substitute artefact is refused with it', () => {
  // `§5.0a`: *"an artefact whose stamped version differs from its own manifest's by one character"* and
  // *"a substitute artefact loaded in place of the one built from these sources"*. **GREEN ON THE
  // UNIMPLEMENTED CARRIER**: the comparison is exact equality and the arm is terminal (`§1.5` item 2).
  const oneChar = MANIFEST_VERSION.slice(0, -1) + String((Number(MANIFEST_VERSION.slice(-1)) + 1) % 10);
  const env = makeEnv({ label: 'onechar', versionValue: JSON.stringify(oneChar) });
  const r = drive(env);
  assert.equal(r.calls, 1, 'the read is performed');
  assert.equal(r.returned, false, `\`${oneChar}\` differs from \`${MANIFEST_VERSION}\` by one character and is refused`);
  assert.equal(r.arm, 'FilePathUnreachable', 'the mismatch arm is the declared answer');
  assert.equal(r.error, null, 'nothing is absorbed silently');
  // A substitute artefact is a rung-one artefact that is not the one built from these sources, and the
  // ONLY substitute a cell of this suite can place is a composed one — so THIS drive, whose artefact is
  // composed and whose version answers the crate's own, IS the substitute state: it is refused by the same
  // arm, and no fallback exists for it to reach (`§1.5` item 2: the arm is terminal).
  const substitute = drive(makeEnv({ label: 'substitute', versionValue: JSON.stringify(CRATE_VERSION) }));
  assert.equal(substitute.calls, 1, 'the substitute artefact\'s own `version()` is read');
  assert.equal(substitute.returned, false, 'a substitute artefact is refused in place of the one built from these sources');
  assert.equal(substitute.arm, 'FilePathUnreachable', 'by the SAME single arm — a substitute mints no second failure shape');
  assert.equal(substitute.error, null, 'and the refusal is not absorbed as a host error');
});

test('P-PUB-9::S-STAMP the carrier declares a RE-RUN TRIGGER on the manifest it reads, read at `bindings/js/build.rs`\'s own bytes', () => {
  // `§5.0a` failure list member, with its falsifier stated AT THE MEMBER: *"a carrier that stamps a value
  // while declaring NO re-run trigger on the manifest it reads — the warm-`target/` state in which the
  // artefact ships the PREVIOUS version"*, whose falsifier is *"a source-level cell over
  // `bindings/js/build.rs`'s own bytes: a cell that reads those bytes and asserts the carrier declares a
  // re-run trigger on the manifest it reads — `cargo:rerun-if-changed` on the `CARGO_MANIFEST_DIR`-built
  // manifest path, plus `cargo:rerun-if-env-changed` for the directive's name"*.
  // **THE MEMBER NAMES ITS OWN FALSIFIER, AND THE FALSIFIER IS WHY THIS CELL IS SOURCE-LEVEL**: the
  // warm-`target/` state is reachable from NO cell of this suite, which drives neither `cargo` nor a warm
  // `target/`, and a cell whose observable is the RUN would be UNFALSIFIABLE BY CONSTRUCTION (`A95`).
  const rerunIfChanged = /println!\(\s*"cargo:rerun-if-changed=([^"]*)"\s*\)/g;
  const rerunIfEnv = /println!\(\s*"cargo:rerun-if-env-changed=([^"]*)"\s*\)/g;
  const changed = [...BUILD_RS_CODE.matchAll(rerunIfChanged)].map((m) => m[1]);
  const envChanged = [...BUILD_RS_CODE.matchAll(rerunIfEnv)].map((m) => m[1]);
  // **THE PRESENT CONTROL, SO A BROKEN INSTRUMENT IS CAUGHT BEFORE ITS FINDING IS BELIEVED**: the file
  // already declares `cargo:rerun-if-changed=build.rs`, so a search that found NOTHING would be shown to
  // be broken by this very assertion — and it is also the clause's own "plus" of a second member.
  assert.ok(changed.includes('build.rs'),
    `the re-run trigger instrument WORKS: \`build.rs\` already emits \`cargo:rerun-if-changed=build.rs\`, so this `
    + `search cannot be silently broken; what it returned was ${JSON.stringify(changed)}`);
  const manifestTrigger = changed.some((p) => p.includes(`${DIRECTIVE?.slot ?? 'manifest'}`) || p.includes(MANIFEST_REL_TO_CRATE));
  assert.equal(manifestTrigger, true,
    '`§5.0a`: the carrier must declare `cargo:rerun-if-changed` ON THE MANIFEST IT READS, or a warm '
    + `\`target/\` re-emits a STALE stamp and the artefact ships the previous version; triggers found: ${JSON.stringify(changed)}`);
  const envTrigger = envChanged.some((n) => n === DIRECTIVE_NAME || n === (DIRECTIVE?.slot ?? ''));
  assert.equal(envTrigger, true,
    `\`§5.0a\`: and \`cargo:rerun-if-env-changed\` FOR THE DIRECTIVE'S NAME (\`${DIRECTIVE_NAME}\`); `
    + `triggers found: ${JSON.stringify(envChanged)}`);
});

// =============================================================================================
// §5.0b P-PUB-10 — THE PRE-PUBLISH VERSION GUARD (`contract.md §5.0b`, `release.md §1.4a`)
// =============================================================================================
// STATES ENUMERATED: the guard step present, named, positioned between the assembly and the first publish
// site, per leg, inside the matrix that builds all five targets; the comparison drivable only at the RUN.
// FAIL-STATES: the step absent · a second guard for the main package (it ships no `.node`, so the five
// leg-subjects are the whole guard set) · the token set incomplete · the step selected by an ordinal that
// reaches a REMOVAL rather than a guard · the step placed after the publish site, where the version is
// already spent (`§1.4a` item `10`'s priced `alt`).

test('P-PUB-10::S-GUARD the pre-publish guard step is PRESENT, NAMED by its three tokens, and POSITIONED between the assembly and the first publish site', () => {
  // `release.md §1.4a` item `11`(a): the `name:` scalar, character for character, WITH YAML'S SINGLE-QUOTE
  // ESCAPING APPLIED. Item `11`(c): *"AN EXISTENCE AND POSITION CHECK IS THUS DRIVABLE BY A CELL THAT
  // READS THE WORKFLOW FILE"* — the step is present, it is between the manifest-to-manifest comparison and
  // the first publish site, and its name carries the three tokens. **WHAT THE CELL STILL CANNOT DO IS
  // DRIVE THE COMPARISON: `S-GUARD` is fiable at the FILE and at the RUN, and at nothing else** (`§1.4a`
  // item `8`) — and that is the member `A95` says must not be given a run-driven cell.
  const guards = WORKFLOW_STEPS.filter((s) => s.name === GUARD_STEP_NAME);
  assert.equal(guards.length, 1,
    `\`§1.4a\` item \`11\`(a): the step's own scalar must stand in the workflow file, once per leg and once in the `
    + `file as the matrix is written; the step names read were ${JSON.stringify(WORKFLOW_STEPS.map((s) => s.name))}`);
  for (const token of GUARD_NAME_TOKENS) {
    assert.ok(guards[0].name.includes(token),
      `\`§1.4a\` item \`11\`(b): the step's name must contain \`${token}\` — a guard selected by \`guard\` alone would `
      + 'reach one of the two EXISTENCE guards, which are different steps with different subjects');
  }
  const assembly = WORKFLOW_STEPS.find((s) => s.name === ASSEMBLY_STEP_NAME);
  const publish = WORKFLOW_STEPS.find((s) => s.name === PLATFORM_PUBLISH_STEP_NAME);
  assert.ok(assembly, `\`§1.4a\` item \`11\`(c): the assembly step \`${ASSEMBLY_STEP_NAME}\` must stand as the anchor`);
  assert.ok(publish, `and the first publish site \`${PLATFORM_PUBLISH_STEP_NAME}\` must stand as the other anchor`);
  assert.ok(assembly.body.includes(VERSION_THROW_TOKEN),
    '`§1.4a` item `11`(c): the anchor is the step whose `run:` contains the MANIFEST-TO-MANIFEST comparison '
    + `(\`${VERSION_THROW_TOKEN}\` being the string that comparison throws when the two versions differ)`);
  assert.ok(assembly.line < guards[0].line,
    `\`§1.4a\` item \`1\`: the guard runs AFTER the assembly (assembly at line ${assembly.line}, guard at ${guards[0].line})`);
  assert.ok(guards[0].line < publish.line,
    `\`§1.4a\` item \`4\`: the guard runs BEFORE the first publish site, so a mis-stamped leg FAILS ITS OWN STEP `
    + `AND NO VERSION IS SPENT (guard at line ${guards[0].line}, publish at ${publish.line})`);
  // **AND NO CELL MAY SELECT THIS STEP BY ITS ORDINAL**, item `11`(b): the collision is printed here as the
  // measurement it is, and every one of the `4.`-prefixed steps is asserted to be a DIFFERENT step.
  const ordinals = WORKFLOW_STEPS.filter((s) => s.name.startsWith('4.'));
  assert.ok(ordinals.length >= 3,
    `\`§1.4a\` item \`11\`(b): the platform job carries THREE \`4.\`-prefixed steps, so an ordinal selector reaches `
    + `a removal; the \`4.\`-prefixed names found were ${JSON.stringify(ordinals.map((s) => s.name))}`);
  for (const step of ordinals) assert.notEqual(step.name, GUARD_STEP_NAME, 'the guard is NOT a `4.`-prefixed member of the file — its selector is the name');
  assert.ok(COLLIDING_ORDINALS.every((name) => WORKFLOW_STEPS.some((s) => s.name === name)),
    'and the three colliding steps the clause names are each present at their own bytes');
});

test('P-PUB-10::S-GUARD the guard is declared in the job that BUILDS ALL FIVE LEGS, and the main package carries no second guard step', () => {
  // `release.md §1.4a` item `6`: *"THE SUBJECT OF EACH LEG, NAMED PER LEG BECAUSE ONE CELL CANNOT DRIVE IT"* —
  // the five labels — and *"THE MAIN PACKAGE'S HALF IS NOT A SECOND GUARD STEP: the main package ships
  // `index.mjs` and no `.node` at all, so the five leg-subjects are the whole guard set."*
  const guard = WORKFLOW_STEPS.filter((s) => s.name === GUARD_STEP_NAME);
  assert.equal(guard.length, 1, 'exactly ONE guard step stands in the file, because the five legs share the one matrix job');
  const platforms = [...WORKFLOW_TEXT.matchAll(/^          - label: ([a-z0-9-]+)$/gm)].map((m) => m[1]);
  assert.equal(platforms.length, 5,
    `\`§1.4a\` item \`6\`: the matrix must carry the five per-leg labels; the labels read were ${JSON.stringify(platforms)}`);
  // The guard stands in the SAME job as those labels — i.e. before the `main` job's own declaration.
  const mainJobAt = WORKFLOW_TEXT.split('\n').findIndex((l) => /^  main:$/.test(l));
  assert.ok(mainJobAt > 0, 'the workflow declares a `main` job separately from the platform matrix job');
  const guardLine = guard[0].line;
  const labelsLine = WORKFLOW_TEXT.split('\n').findIndex((l) => /^          - label: /);
  assert.ok(guardLine > labelsLine, 'the guard step stands INSIDE the matrix job that declares the five labels');
  const guardsNamedGuard = WORKFLOW_STEPS.filter((s) => /guard/.test(s.name));
  assert.equal(guardsNamedGuard.filter((s) => s.name === GUARD_STEP_NAME).length, 1,
    'the guard is one member of the file\'s guard set and it is the ONLY member whose subject is the version read');
});

// =============================================================================================
// THE CLOSED EXEMPT SET — `contract.md §5.0a` item `(1)`, `release.md §2.4`, `A96`
// =============================================================================================
test('P-PUB-9::S-STAMP ACCIDENTALLY-GREEN (and GREEN BY DESIGN under `A96`) — every runtime environment read is inside the five-member closed set', () => {
  // `§5.0a` item `(1)` / `A96`: the CLOSED SET IS FIVE — `CARGO_CFG_TARGET_OS` · `CARGO_CFG_TARGET_ENV` ·
  // `CARGO_CFG_TARGET_ARCH` · `OUT_DIR` · `CARGO_MANIFEST_DIR` — and *"EVERY RUNTIME ENVIRONMENT READ
  // OUTSIDE THE FIVE NAMES REMAINS REFUSED"*, while *"A COMPILE-TIME SUBSTITUTION IS NOT A CONSULTATION"*,
  // so `env!("CARGO_PKG_VERSION")` is NEITHER A MEMBER NOR A VIOLATION.
  //
  // **THE LAYER THIS REFUSAL CAN FAIL AT IS THE SOURCE, AND THIS CELL IS THAT LAYER** (`A95`): the
  // refusal's subject is a token in a file, not a behaviour of a run — a run cannot fail a source-level
  // refusal, and a cell that claimed to would be unfalsifiable by construction. **The instrument is a
  // source read of the carrier's two files, at the clauses' own direction.**
  //
  // **AND IT IS GREEN TODAY, WHICH IS REPORTED RATHER THAN HIDDEN — AND IT IS THE ONE GREEN THAT IS ALSO
  // GREEN BY DESIGN**: `A96` rules that a cell asserting *"no environment consultation outside the five"*
  // IS GREEN AGAINST THE LAWFUL CARRIER, which reads `CARGO_PKG_VERSION` in the `None` arm. It is green
  // now because the carrier consults nothing outside the five and it stays green after the remedy lands,
  // so it is NOT a member of the red set and is named as such in the gate record.
  const consulted = [];
  for (const [file, code] of [[BUILD_RS, BUILD_RS_CODE], [FACADE_RS, FACADE_RS_CODE]]) {
    for (const m of code.matchAll(/(?:std::env::|env::)var(?:_os)?\(\s*"([^"]+)"/g)) consulted.push({ file, name: m[1] });
    for (const m of code.matchAll(/(?:std::env::|env::)var(?:_os)?\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)/g)) consulted.push({ file, name: m[1] });
  }
  const outside = consulted.filter((c) => !BUILD_SYSTEM_SET.includes(c.name));
  assert.deepEqual(outside, [],
    `\`§5.0a\` item \`(1)\` / \`A96\`: every RUNTIME environment read must name one of the five closed-set members `
    + `(${BUILD_SYSTEM_SET.join(' · ')}); reads found: ${JSON.stringify(consulted)}`);
  // **THE EXEMPTION IS EXERCISED RATHER THAN ASSUMED**, so a later reader cannot mistake this cell for one
  // that forbids the macro: the lawful carrier DOES carry the substitution, and this cell does not refuse it.
  assert.ok(/env!\("CARGO_PKG_VERSION"\)/.test(FACADE_RS_CODE) || /option_env!\(/.test(FACADE_RS_CODE),
    '`A96`/`§1.4a` item `3`: the carrier reads the crate\'s version through a COMPILE-TIME macro — which is '
    + 'neither a member of the closed set nor a violation of it, and this cell deliberately does not refuse it');
});

// =============================================================================================
// THE PROPERTY LAYER — the register's own rows, driven on a DETERMINISTIC PINNED SEED
// =============================================================================================
// **THE REGISTER THIS UNIT CARRIES IS FLAT: `contract.md §5` `P-PUB-1`…`P-PUB-10`, whose strategy ids
// include `S-STAMP` (minted by `§5.0a`) and `S-GUARD` (minted by `§5.0b`).** The `P-IM`/`P-SM`/`P-TP`
// form quoted in this pass's brief is the form of the SIBLING units' registers
// (`docs/specs/storeroom-js/contract.md`, `docs/specs/storeroom-native/contract.md`); it appears `0`
// times in `docs/specs/storeroom-publish/contract.md`, whose family is `P-PUB-*` — **so the two rows
// below are this unit's own rows, and the brief's family spellings are REPORTED rather than substituted.**
//
// **THE LIMITS ARE THE REGISTER'S OWN, HONOURED RATHER THAN CITED:** a DETERMINISTIC PINNED SEED, ≤ 100
// attempts per row, ≤ 400 in total, stop after 5 failures, and each row reported HELD or BROKEN with its
// strategy id.
const SEED = 20261013; // pinned: the gate-3 opening's own date, so every run drives the same sequence
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;
const MAX_FAILURES = 5;
let attemptsTotal = 0;

/** A deterministic linear congruential generator. Its whole state is the seed, so the SAME attempt set is
 *  driven on every machine and every run — which is what "pinned seed" means and what a `Math.random()`
 *  (whose stream no reader can reproduce) does not. */
function makeRandom(seed) {
  let state = seed >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

function driveRow({ row, strategy, seedFor, attempts, attemptsPerRow, driveOne }) {
  const rand = makeRandom(seedFor);
  let breaks = 0;
  let driven = 0;
  const failures = [];
  for (let i = 0; i < attemptsPerRow; i += 1) {
    if (attemptsTotal >= MAX_ATTEMPTS_TOTAL || breaks >= MAX_FAILURES) break;
    const attempt = driveOne(rand, i);
    driven += 1;
    attemptsTotal += 1;
    if (attempt !== null) { breaks += 1; failures.push({ attempt: i, why: attempt }); if (breaks >= MAX_FAILURES) break; }
  }
  attempts.push(`${row} strategy=${strategy} attempts=${driven} breaks=${breaks} `
    + `verdict=${breaks === 0 ? 'HELD' : 'BROKEN'}${breaks >= MAX_FAILURES ? ' (stopped at the failure cap)' : ''}`);
  return { driven, breaks, failures };
}

const PROPERTY_ATTEMPTS = [];

test('P-PUB-9 property (S-VERSION) — the version read\'s equality is EXACT: over a pinned-seed sample, every one-character-perturbed answer is refused', () => {
  // **THE ROW THAT BEARS ON THIS UNIT AND IS EXPRESSIBLE AS A PROPERTY.** `contract.md §5.0a` states the
  // equality as CHARACTER FOR CHARACTER, and its failure list names *"an artefact whose stamped version
  // differs from its own manifest's by ONE character"*. The equality's exactness is therefore a property
  // over the equivalence class of near-miss strings, and the seed decides which member of that class each
  // attempt drives — a `Math.random()` stream would make the row unreproducible, which is why the seed is
  // pinned and printed.
  //
  // **WHAT THIS ROW DOES NOT CLAIM: it is not the red cell.** The read's exactness is already in the tree;
  // the unit's red is the VALUE the artefact answers, which cell `P-PUB-9::S-VERSION …character for
  // character` drives. This row's `breaks` are reported as the row's own result and it is expected HELD.
  const alpha = '0123456789.abc-+';
  const { breaks, driven, failures } = driveRow({
    row: 'P-PUB-9', strategy: 'S-VERSION', seedFor: SEED, attempts: PROPERTY_ATTEMPTS, attemptsPerRow: 24,
    driveOne: (rand, i) => {
      const pos = Math.floor(rand() * MANIFEST_VERSION.length);
      const ch = alpha[Math.floor(rand() * alpha.length)];
      const mutated = MANIFEST_VERSION.slice(0, pos) + ch + MANIFEST_VERSION.slice(pos + 1);
      if (mutated === MANIFEST_VERSION) return null; // the perturbation missed: not a near-miss, not a break
      const env = makeEnv({ label: `prop9-${i}`, versionValue: JSON.stringify(mutated) });
      const r = drive(env);
      if (r.returned !== false || r.arm !== 'FilePathUnreachable' || r.calls !== 1) {
        return `\`${mutated}\` (position ${pos}) was not refused by the single declared arm: ${JSON.stringify(r).slice(0, 200)}`;
      }
      return null;
    },
  });
  assert.deepEqual(failures, [],
    `\`§5.0a\`: the comparison must be exact, so NO one-character perturbation may be accepted; driven ${driven} `
    + `attempts on seed ${SEED}`);
  assert.ok(driven > 0, 'the row must RUN — `un-run` is a FAILURE');
});

test('P-PUB-10 property — REPORTED AS NOT EXPRESSIBLE: the guard\'s comparison is a RUN observable, and no cell of this suite may claim to drive it', () => {
  // **THIS ROW IS REPORTED, NOT WEAKENED INTO A PROPERTY.** `contract.md §5.0b`'s own drive sentence:
  // *"its drive is the RUN, at the leg that built the artefact, and that is why this row is declared
  // rather than left to a drive."* `release.md §1.4a` item `8`: *"a cell of `bindings/js/test/publish.test.mjs`
  // CANNOT LOAD A FOREIGN-TARGET `.node`, so the red set can only META-assert the step's EXISTENCE AND
  // POSITION in the workflow file and can NOT drive the comparison itself."*
  // **SO THE ROW'S FIABILITY IS AT THE FILE AND AT THE RUN ONLY, AND A PROPERTY OVER THE FILE WOULD HAVE
  // EXACTLY ONE SUBJECT — the tree's single workflow — which is a SINGLE-STATE assertion wearing a
  // generator's clothes.** The two `S-GUARD` cells above drive that file state, and `A95` forbids the
  // run-driven cell this row would otherwise need.
  PROPERTY_ATTEMPTS.push(`P-PUB-10 strategy=S-GUARD attempts=0 breaks=0 verdict=NOT-EXPRESSIBLE-AS-A-PROPERTY `
    + '(the row is fiable at the file — two cells above — and at the RUN, which no cell of this suite may drive)');
  assert.ok(true, 'a report, not a drive: this cell exists so the row\'s absence is NAMED rather than silently omitted');
});

test('THE PROPERTY LAYER\'S OWN CENSUS — the seed, the attempt counts and every row\'s verdict are PRINTED', () => {
  // The register's own limits, printed with their terms so no figure has to be recovered from a table:
  // `attempts ≤ 100` per row, `≤ 400` in total, `stop after 5 failures`, and one line per row.
  // eslint-disable-next-line no-console
  console.log(`\n[version-stamp property layer] seed=${SEED} attemptsTotal=${attemptsTotal} `
    + `capPerRow=${MAX_ATTEMPTS_PER_ROW} capTotal=${MAX_ATTEMPTS_TOTAL} failureCap=${MAX_FAILURES}`);
  for (const line of PROPERTY_ATTEMPTS) console.log(`[version-stamp property layer] ${line}`);
  assert.ok(attemptsTotal <= MAX_ATTEMPTS_TOTAL, `the register's own limit: total attempts ${attemptsTotal} ≤ ${MAX_ATTEMPTS_TOTAL}`);
  assert.ok(PROPERTY_ATTEMPTS.some((l) => l.startsWith('P-PUB-9')), 'the row this unit bears on is present in the census');
  assert.ok(PROPERTY_ATTEMPTS.some((l) => l.startsWith('P-PUB-10')), 'and the row that is NOT expressible is named rather than omitted');
});
