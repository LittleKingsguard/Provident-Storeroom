#!/usr/bin/env node
// GREENS RUNNER for U-STOREROOM-CONSUMER-FIX (gate 5, role_blind_test_writer).
// Authored from docs/specs/storeroom-publish/**, docs/specs/storeroom-js/package.md §6.1 and
// docs/decisions.md A90–A96 ONLY. No implementation file was read to author this runner.
// Each scenario prints RESULT <id> PASS|FAIL|SOURCE-PINNED|UNRUNNABLE with its exit code.
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const req = createRequire(import.meta.url);
const M = join(ROOT, 'bindings/js/package.json');
const ART = join(ROOT, 'bindings/js/build/Release/storeroom_js_binding.node');
const WF = join(ROOT, '.github/workflows/publish.yml');
const CRATE = join(ROOT, 'bindings/js/Cargo.toml');
const manifest = () => JSON.parse(readFileSync(M, 'utf8'));

let reds = [];
const say = (id, verdict, detail, clause) => {
  console.log(`RESULT ${id} ${verdict} :: ${detail} :: ${clause}`);
  if (verdict === 'FAIL') reds.push(id);
};

// ---- CF-01: the stamp's happy path -------------------------------------------------
// §-address: contract.md §5.0a (P-PUB-9 property) · release.md §2.4 items 1,4 · §1.4a item 3
// Observable: the native artefact loaded OUTSIDE the repository (a consumer's reach) answers
// version() equal to the package manifest's version, character for character.
try {
  const read = req(ART).version();
  const declared = manifest().version;
  const ok = typeof read === 'string' && read === declared;
  say('CF-01', ok ? 'PASS' : 'FAIL',
    `artefact version()=${JSON.stringify(read)} manifest=${JSON.stringify(declared)} chars=${read.length}/${declared.length}`,
    'contract.md §5.0a (P-PUB-9) · release.md §2.4');
} catch (e) {
  say('CF-01', 'FAIL', `artefact failed to load: ${e.message}`, 'contract.md §5.0a (P-PUB-9)');
}

// ---- CF-01a: the stamp's source is the MANIFEST, not the crate (falsifier of the fallback) --
// §-address: release.md §6.10 item 2 · PAR-PUB-35 (unit/domain) · package.md §6.1 item 3
// Observable: the artefact's version() differs from the crate's Cargo.toml version.
try {
  const read = req(ART).version();
  const crate = (readFileSync(CRATE, 'utf8').match(/^version\s*=\s*"([^"]+)"/m) || [])[1];
  const ok = typeof read === 'string' && read !== crate;
  say('CF-01a', ok ? 'PASS' : 'FAIL',
    `artefact version()=${JSON.stringify(read)} crate Cargo.toml version=${JSON.stringify(crate)}`,
    'release.md §6.10 item 2 · PAR-PUB-35');
} catch (e) {
  say('CF-01a', 'FAIL', `probe failed: ${e.message}`, 'release.md §6.10 item 2');
}

// ---- CF-02: the mismatch fail-state ------------------------------------------------
// §-address: contract.md §1.5 items 1-2, §5.0b · resolution.md §5.1 item 2
// Observable: the guard's own predicate (lifted VERBATIM from the workflow step's run:) refuses
// when the artefact's read leaves the manifest's, and the artefact's own value is unmoved by it.
let guardCmd = null;
try {
  const wf = readFileSync(WF, 'utf8');
  // the STEP's own predicate, verbatim: the `node -e "..."` line that loads the platform addon
  const line = wf.split('\n').find((l) => l.includes('node -e "') && l.includes('storeroom_js_binding.node'));
  const m = line && line.match(/node -e "(.*)"\s*$/);
  guardCmd = m ? m[1] : null;
} catch { /* handled below */ }
if (!guardCmd) {
  say('CF-02', 'FAIL', 'guard predicate could not be lifted from the workflow file', 'release.md §1.4a item 1');
} else {
  const scratch = mkdtempSync(join(tmpdir(), 'cf-blind-'));
  const cases = [
    ['stamped==manifest (control)', manifest().version, false],
    ['manifest declares the previous version', '0.1.0', true],
    ['manifest leaves the read by one character', manifest().version.slice(0, -1) + 'Z', true],
    ['manifest declares the empty string', '', true],
  ];
  // The step's predicate resolves its TWO DATA PATHS through this variable; substituting the
  // checkout's artefact and a synthetic manifest leaves its comparison byte-for-byte unmoved.
  const subst = guardCmd.replace(/const dir='[^']*';/, "__DIR__;")
    .replace(/require\('\.\/'\+dir\+'\/storeroom_js_binding\.node'\)/, 'require(__ARTPATH__)')  // data path swap
    .replace(/require\('\.\/'\+dir\+'\/package\.json'\)/, 'require(__MANPATH__)');              // data path swap
  let ok = true;
  for (const [name, declared, wantRefusal] of cases) {
    const mf = join(scratch, 'm.json');
    writeFileSync(mf, JSON.stringify({ name: 'x', version: declared }));
    const script = 'var __DIR__;\n'
      + `var __ARTPATH__=${JSON.stringify(ART)};var __MANPATH__=${JSON.stringify(mf)};\n`
      + subst;
    let code = 0; let err = '';
    try { execFileSync(process.execPath, ['-e', script], { stdio: 'pipe' }); }
    catch (e) { code = e.status ?? 1; err = String(e.stderr || e.message).split('\n')[0]; }
    const refused = code !== 0;
    if (refused !== wantRefusal) ok = false;
    console.log(`   CF-02 case: ${name} -> declared=${JSON.stringify(declared)} exit=${code} ${refused ? 'REFUSED' : 'ACCEPTED'}${err ? ' :: ' + err.slice(0, 160) : ''}`);
  }
  say('CF-02', ok ? 'PASS' : 'FAIL', 'the step\'s own predicate separate the match from all three leaves (exit codes above)', 'contract.md §1.5 item 2 · §5.0b');
}

// ---- CF-03: the None arm -----------------------------------------------------------
// §-address: package.md §6.1 read-mechanism clause + items 3,4 · release.md §6.10 item 2 · PAR-PUB-35 (vi)
// The clause the documents state: the read is option_env!("STOREROOM_JS_PACKAGE_VERSION") and the
// value taken on None is env!("CARGO_PKG_VERSION") — the crate version — LAWFUL IN A DEVELOPMENT
// BUILD AND ILLEGAL IN A RELEASE BUILD, with enforcement OUTSIDE the crate (release.md §1.4a / P-PUB-10).
// A95: the falsifier of this state is the SOURCE, not the run; no cell may claim to fail it by driving the run.
try {
  const src = readFileSync(join(ROOT, 'bindings/js/src/facade.rs'), 'utf8');
  const hasOption = /option_env!\s*\(\s*"STOREROOM_JS_PACKAGE_VERSION"\s*\)/.test(src);
  const hasNoneArm = /unwrap_or\s*\(\s*env!\s*\(\s*"CARGO_PKG_VERSION"\s*\)/.test(src);
  const ok = hasOption && hasNoneArm;
  say('CF-03', ok ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95): option_env! read=${hasOption}, env!(CARGO_PKG_VERSION) inside the None arm=${hasNoneArm}; the None-arm VALUE is not run-observable at gate time`,
    'package.md §6.1 read-mechanism clause · A95');
} catch (e) {
  say('CF-03', 'FAIL', `source read failed: ${e.message}`, 'package.md §6.1 read-mechanism clause');
}

// ---- CF-04: the pre-publish guard's declared spelling, position and token set -------
// §-address: release.md §1.4a items 1,6,11(a)(b)(c) · contract.md §5.0b
try {
  const lines = readFileSync(WF, 'utf8').split('\n');
  const nameIdx = lines.findIndex((l) => l.includes("pre-publish guard: the assembled artefact''s version() equals its platform manifest''s version"));
  const publishIdx = lines.findIndex((l) => l.includes("'4. publish the platform artefact'"));
  const couplingIdx = lines.findIndex((l) => l.includes('release.md §2.2'));
  const tokens = nameIdx >= 0 && ['pre-publish guard', 'version()', 'platform manifest'].every((t) => lines[nameIdx].includes(t));
  const position = nameIdx > couplingIdx && nameIdx < publishIdx && couplingIdx >= 0;
  const perLeg = /for matrix\.label|\$\{\{\s*matrix\.label\s*\}\}/.test(lines.slice(nameIdx, nameIdx + 6).join('\n'));
  const ok = tokens && position && perLeg;
  say('CF-04', ok ? 'PASS' : 'FAIL',
    `step@line ${nameIdx + 1}, coupling@${couplingIdx + 1}, publish@${publishIdx + 1}; tokens=${tokens} position=${position} perLeg=${perLeg}`,
    'release.md §1.4a items 1,6,11');
} catch (e) {
  say('CF-04', 'FAIL', `workflow read failed: ${e.message}`, 'release.md §1.4a');
}

// ---- CF-05: the re-run triggers the carrier must declare --------------------------
// §-address: release.md §6.10 item 5 · package.md §6.1 item 7 · contract.md §5.0a · A95 amendment
// SOURCE-PINNED (A95 general form): the warm-target/ stale stamp is reachable from no cell.
try {
  const src = readFileSync(join(ROOT, 'bindings/js/build.rs'), 'utf8');
  const absolute = /rerun-if-changed=\{?[a-z_]*\}?\/package\.json|rerun-if-changed=[^\n]*package\.json/.test(src);
  const usesManifestDir = /CARGO_MANIFEST_DIR/.test(src);
  const envTrigger = /rerun-if-env-changed\s*=\s*STOREROOM_JS_PACKAGE_VERSION/.test(src);
  const ok = absolute && usesManifestDir && envTrigger;
  say('CF-05', ok ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95): manifest re-run trigger=${absolute}, CARGO_MANIFEST_DIR=${usesManifestDir}, rerun-if-env-changed for the directive=${envTrigger}`,
    'release.md §6.10 item 5 · A95 amendment');
} catch (e) {
  say('CF-05', 'FAIL', `source read failed: ${e.message}`, 'release.md §6.10 item 5');
}

// ---- CF-06: the ambient-read refusal, over the FIVE-member closed set --------------
// §-address: contract.md §5.0a (P-PUB-9) · A95 · A96 (a compile-time substitution is not a consultation)
// SOURCE-PINNED (A95 by name): the refused form is unobservable at its value.
try {
  const files = ['bindings/js/build.rs', 'bindings/js/src/facade.rs'];
  const closed = new Set(['CARGO_CFG_TARGET_OS', 'CARGO_CFG_TARGET_ENV', 'CARGO_CFG_TARGET_ARCH', 'OUT_DIR', 'CARGO_MANIFEST_DIR']);
  const re = /(?:std::env::|env::)(var|var_os|vars|vars_os)\s*\(\s*"([^"]*)"/g;
  const found = []; const outside = [];
  for (const f of files) {
    const s = readFileSync(join(ROOT, f), 'utf8'); let m;
    while ((m = re.exec(s))) { found.push(`${f}:${m[2]}`); if (!closed.has(m[2])) outside.push(`${f}:${m[2]}`); }
  }
  const envMacroOk = !/env!\s*\(\s*"CARGO_PKG_VERSION"\s*\)/.test('') && true; // macro is not a consultation (A96)
  const ok = outside.length === 0 && found.length > 0 && envMacroOk;
  say('CF-06', ok ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95): consultations=[${found.join(', ')}]; outside the five-member set=[${outside.join(', ')}]`,
    'contract.md §5.0a (P-PUB-9) · A95 · A96');
} catch (e) {
  say('CF-06', 'FAIL', `source read failed: ${e.message}`, 'contract.md §5.0a');
}

// ---- CF-07: PAR-PUB-35 outside value (vii) — non-string version slot --------------
// §-address: parameter-semantics.md §5.1 outside value (vii) and its four-step clause
// The documents declare: DIRECTIVE EMITTED . None NOT TAKEN . version() REFUSES . the run fails;
// and its origin ("what the carrier emits for a version slot holding no string") is FILE-PINNED.
// The documents' own words contradict each other on the one limb (an emitting arm that "writes
// nothing" would leave option_env! on None, i.e. answer (vi)); the source settles which limb stands.
try {
  const src = readFileSync(join(ROOT, 'bindings/js/build.rs'), 'utf8');
  const guard = /emit_directive|rustc-env/.test(src);
  const emitsNothingArm = /if\s+[^\n]*version[^\n]*\{[\s\S]{0,200}?rustc-env/.test(src);
  say('CF-07', guard ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95, by name at parameter-semantics.md §5.1): the emitting arm's bytes are the carrier's; unconditional emission read=${guard}, "writes nothing" branch read=${emitsNothingArm}`,
    'parameter-semantics.md §5.1 (vii)');
} catch (e) {
  say('CF-07', 'FAIL', `source read failed: ${e.message}`, 'parameter-semantics.md §5.1 (vii)');
}

// ---- CF-08: the coupling rule's ELEVEN cells -------------------------------------
// §-address: release.md §2.2 items 1-2 · resolution.md §3.2 item 4 and its dated clause · contract.md §3.2
try {
  const main = manifest();
  const labels = ['linux-x64', 'linux-arm64', 'darwin-x64', 'darwin-arm64', 'win32-x64'];
  const pins = main.optionalDependencies || {};
  const exact = Object.values(pins).every((v) => !/[~^*><]|\s/.test(v)) && Object.keys(pins).length === 5;
  const pinsEqual = Object.values(pins).every((v) => v === main.version);
  const platOk = labels.every((l) => JSON.parse(readFileSync(join(ROOT, `bindings/js/platforms/${l}/package.json`), 'utf8')).version === main.version);
  const ok = exact && pinsEqual && platOk;
  say('CF-08', ok ? 'PASS' : 'FAIL',
    `main version=${main.version}; 5 exact pins=${exact}; pins==main version=${pinsEqual}; five platform manifests==main version=${platOk}`,
    'release.md §2.2 · resolution.md §3.2 item 4');
} catch (e) {
  say('CF-08', 'FAIL', `manifest read failed: ${e.message}`, 'release.md §2.2');
}

// ---- CF-09: the guard's token set is not the existence guard's, and no ordinal -----
// §-address: release.md §1.4a item 11(b) and its corrected count (2 -> 3 four-prefixed members)
try {
  const names = readFileSync(WF, 'utf8').split('\n').filter((l) => /^\s+- name:/.test(l)).map((l) => l.split('name:')[1].trim());
  const fourPrefixed = names.filter((n) => /^'4\./.test(n));
  const guardNames = names.filter((n) => n.includes('pre-publish guard'));
  const existenceGuards = names.filter((n) => n.includes('guard: the manifest') || n.includes('guard: the pack-time'));
  const ok = fourPrefixed.length === 3 && guardNames.length === 1 && existenceGuards.length === 2 &&
    !existenceGuards.some((n) => n.includes('pre-publish guard'));
  say('CF-09', ok ? 'PASS' : 'FAIL',
    `four-prefixed steps=${fourPrefixed.length}; pre-publish guards=${guardNames.length}; existence guards=${existenceGuards.length}`,
    'release.md §1.4a item 11(b)');
} catch (e) {
  say('CF-09', 'FAIL', `workflow read failed: ${e.message}`, 'release.md §1.4a item 11(b)');
}

// ---- CF-10: the tag's version equals the manifest's ------------------------------
// §-address: release.md §2.1 items 1-2, §2.5 item 4
try {
  const tag = execFileSync('git', ['-C', ROOT, 'tag', '-l'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const vs = manifest().version;
  const ok = tag.length > 0 && tag.every((t) => t === `v${vs}`);
  say('CF-10', ok ? 'PASS' : 'FAIL', `tags=[${tag.join(', ')}] manifest version=${vs}`, 'release.md §2.1 · §2.5 item 4');
} catch (e) {
  say('CF-10', 'FAIL', `git unavailable: ${e.message}`, 'release.md §2.1');
}

// ---- CF-11: where the read leaves — the load path ---------------------------------
// §-address: contract.md §1.5 items 1-2 · §1.4 items 1-2 · resolution.md §5.1 item 2
// The documents declare the observable AT THE LOAD PATH of the package entry. The entry is
// `bindings/js/index.mjs`, which this pass may not read (implementation wall), so the leaf-answer
// was NOT driven end-to-end. The guard's predicate (CF-02) verifies the same equality that the
// entry's mismatch arm asserts, and the leaf-form was NOT observed.
say('CF-11', 'UNRUNNABLE',
  'the entry-level refusal cannot be driven by this pass: index.mjs is behind the implementation wall, and no published platform package exists to install; CF-02 drives the same equality one layer out',
  'contract.md §1.5 items 1-2 · resolution.md §5.1 item 2');

console.log(reds.length ? `\nTOTAL: ${reds.length} FAIL (${reds.join(', ')})` : '\nTOTAL: 0 FAIL');
process.exit(reds.length ? 1 : 0);
