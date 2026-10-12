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

// **EVERY SELECTOR IN THIS RUNNER IS COUNTED, AND UNIQUENESS IS PART OF THE VERDICT** (`S5`'s sibling
// finding, applied to this runner): `lines.findIndex(pred)` is a FIRST MATCH and not a count, so a
// selector that takes the first of several matching lines can take the WRONG one and still report PASS.
// `soleLine` returns the index only when exactly one line matches, and reports the count either way.
const soleLine = (lines, pred) => {
  const hits = lines.map((l, i) => (pred(l) ? i : -1)).filter((i) => i >= 0);
  return { idx: hits.length === 1 ? hits[0] : (hits.length > 0 ? hits[0] : -1), count: hits.length, unique: hits.length === 1 };
};

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
// Observable: the guard's own comparison refuses when the artefact's read leaves the manifest's.
// **THE CLAIM THAT STOOD HERE IS WITHDRAWN AND REPLACED BY ONE THAT IS TRUE** (`S5`, this runner):
// the scenario used to call what it runs *"the step's own predicate, verbatim"* and then REPLACE THE
// STEP'S TWO DATA PATHS before running it. It is not verbatim, and it cannot be: the step reads its
// two paths out of `bindings/js/platforms/${{ matrix.label }}/` at the leg, and no cell of this pass
// may install a published platform package. **WHAT IS LIFTED IS THE COMPARISON AND ITS MESSAGE; WHAT
// IS SWAPPED IS WHERE THE TWO SUBJECTS COME FROM** — three named textual substitutions, each of which
// is ASSERTED TO HAVE APPLIED (a swap that silently failed to match would leave the step's own `dir`
// read standing over a checkout artefact, i.e. a different experiment wearing this name). The three
// swaps are: the `dir` binding; the artefact `require`; the manifest `require`.
let guardCmd = null; let guardLine = null;
try {
  const wf = readFileSync(WF, 'utf8');
  const lines = wf.split('\n');
  // **AND THE LINE IS COUNTED BEFORE IT IS TAKEN**: two `node -e "` lines loading an addon would make
  // this lift ambiguous, and the first of them might not be the guard's.
  const lift = soleLine(lines, (l) => l.includes('node -e "') && l.includes('storeroom_js_binding.node'));
  const m = lift.unique ? lines[lift.idx].match(/node -e "(.*)"\s*$/) : null;
  guardCmd = m ? m[1] : null;
  guardLine = lift.unique ? lift.idx + 1 : null;
  if (!lift.unique) console.log(`   CF-02 note: the guard-predicate line was matched ${lift.count} time(s)`);
} catch { /* handled below */ }
if (!guardCmd) {
  say('CF-02', 'FAIL', 'the guard comparison could not be lifted unambiguously from the workflow file', 'release.md §1.4a item 1');
} else {
  const scratch = mkdtempSync(join(tmpdir(), 'cf-blind-'));
  const cases = [
    ['stamped==manifest (control)', manifest().version, false],
    ['manifest declares the previous version', '0.1.0', true],
    ['manifest leaves the read by one character', manifest().version.slice(0, -1) + 'Z', true],
    ['manifest declares the empty string', '', true],
  ];
  // The step's comparison resolves its TWO DATA PATHS through this variable; the three swaps below
  // leave the comparison itself untouched, and each is asserted to have applied.
  const swaps = [
    [/const dir='[^']*';/, '__DIR__;', 'the `dir` binding, which is the step\'s `platforms/${matrix.label}`'],
    [/require\('\.\/'\+dir\+'\/storeroom_js_binding\.node'\)/, 'require(__ARTPATH__)', 'the ARTEFACT require, pointed at the checkout\'s own build'],
    [/require\('\.\/'\+dir\+'\/package\.json'\)/, 'require(__MANPATH__)', 'the MANIFEST require, pointed at a synthetic manifest written per case'],
  ];
  let subst = guardCmd; let swapped = 0; const unapplied = [];
  for (const [re, to, what] of swaps) {
    if (re.test(subst)) { subst = subst.replace(re, to); swapped += 1; } else unapplied.push(what);
  }
  let ok = swapped === swaps.length;
  if (unapplied.length > 0) {
    say('CF-02', 'FAIL', `the lift did NOT apply ${unapplied.length} of its ${swaps.length} substitutions `
      + `(${unapplied.join('; ')}), so what would run is not the step\'s comparison with the subjects `
      + 're-pointed — reported rather than run', 'release.md §1.4a item 1');
  }
  if (unapplied.length === 0) {
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
    // **WHAT THE VERDICT CLAIMS, IN THE TERMS OF THE LIFT**: the step's COMPARISON, with its two subjects
    // re-pointed by `swapped` substitutions, separates the match from all three leaves. **IT DOES NOT
    // CLAIM TO HAVE RUN THE STEP**, and the substitutions are printed so the claim can be checked.
    say('CF-02', ok ? 'PASS' : 'FAIL',
      `the step's COMPARISON (lifted from line ${guardLine}, ${swapped}/${swaps.length} data-path substitutions applied) `
      + 'separates the match from all three leaves (exit codes above)',
      'contract.md §1.5 item 2 · §5.0b');
  }
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
  // **EACH OF THE THREE SELECTORS IS COUNTED AND MUST BE UNIQUE** (`S5`, this runner): the scenario took
  // the FIRST line naming `release.md §2.2`, the FIRST line naming the guard step and the FIRST line
  // naming the publish site, and a first match reported as THE match is how a position check passes over
  // the wrong pair of anchors. The counts are printed and are part of the verdict.
  const step = soleLine(lines, (l) => l.includes("pre-publish guard: the assembled artefact''s version() equals its platform manifest''s version"));
  const publish = soleLine(lines, (l) => l.includes("'4. publish the platform artefact'"));
  const coupling = soleLine(lines, (l) => l.includes('release.md §2.2'));
  const nameIdx = step.idx; const publishIdx = publish.idx; const couplingIdx = coupling.idx;
  const unique = step.unique && publish.unique && coupling.unique;
  const tokens = nameIdx >= 0 && ['pre-publish guard', 'version()', 'platform manifest'].every((t) => lines[nameIdx].includes(t));
  const position = nameIdx > couplingIdx && nameIdx < publishIdx && couplingIdx >= 0;
  const perLeg = /for matrix\.label|\$\{\{\s*matrix\.label\s*\}\}/.test(lines.slice(nameIdx, nameIdx + 6).join('\n'));
  const ok = tokens && position && perLeg && unique;
  say('CF-04', ok ? 'PASS' : 'FAIL',
    `step@line ${nameIdx + 1} (matched ${step.count}), coupling@${couplingIdx + 1} (matched ${coupling.count}), `
    + `publish@${publishIdx + 1} (matched ${publish.count}); unique=${unique} tokens=${tokens} position=${position} perLeg=${perLeg}`,
    'release.md §1.4a items 1,6,11');
} catch (e) {
  say('CF-04', 'FAIL', `workflow read failed: ${e.message}`, 'release.md §1.4a');
}

// ---- CF-05: the re-run triggers the carrier must declare --------------------------
// §-address: release.md §6.10 item 5 · package.md §6.1 item 7 · contract.md §5.0a · A95 amendment
// SOURCE-PINNED (A95 general form): the warm-target/ stale stamp is reachable from no cell.
try {
  const src = readFileSync(join(ROOT, 'bindings/js/build.rs'), 'utf8');
  // **THE TRIGGER IS NOW DECIDED AS THE CLAUSE DECIDES IT, AND THE ALTERNATIVE THAT STOOD HERE IS
  // WITHDRAWN AND NAMED** (`S5`, this runner). The old predicate was
  // `… |rerun-if-changed=[^\n]*package\.json` — **A SUBSTRING TEST**, satisfied by
  // `cargo:rerun-if-changed=package.json.bak` and by a RELATIVE `cargo:rerun-if-changed=package.json`, so
  // the scenario reported PASS while the warm-`target/` hazard it exists to close stood open. `package.md
  // §6.1` item `7` asks for *"an ABSOLUTE path built from `CARGO_MANIFEST_DIR`"* naming the manifest, and
  // `§5.0a`'s falsifier asks for `cargo:rerun-if-env-changed` FOR THE DIRECTIVE'S NAME — the three facts
  // below, each reported with the values it was decided over.
  const dirBuilt = new Set([...src.matchAll(/let\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^;]*);/g)]
    .filter((m) => /CARGO_MANIFEST_DIR/.test(m[2])).map((m) => m[1]));
  const changedValues = [...src.matchAll(/cargo:rerun-if-changed=([^"]*)"/g)].map((m) => m[1]);
  const manifestHits = changedValues.filter((v) => {
    const m = /^\{([A-Za-z_][A-Za-z0-9_]*)\}\/(package\.json)$/.exec(v);
    return m !== null && dirBuilt.has(m[1]);
  });
  const envValues = [...src.matchAll(/cargo:rerun-if-env-changed=([^"]*)"/g)].map((m) => m[1]);
  const absolute = manifestHits.length === 1;
  const usesManifestDir = dirBuilt.size > 0;
  const envTrigger = envValues.filter((n) => n === 'STOREROOM_JS_PACKAGE_VERSION').length === 1;
  const ok = absolute && usesManifestDir && envTrigger;
  // **AND THE WITHDRAWN TEST IS SHOWN TO ADMIT WHAT THE NEW ONE REFUSES** — the two red spellings are
  // driven through the OLD predicate's text here, so the tightening is exhibited and not merely claimed.
  const oldPredicate = (text) => /rerun-if-changed=\{?[a-z_]*\}?\/package\.json|rerun-if-changed=[^\n]*package\.json/.test(text);
  const redShapes = ['cargo:rerun-if-changed=package.json.bak', 'cargo:rerun-if-changed=package.json',
    'cargo:rerun-if-changed={other}/package.json'];
  const admittedByTheOldTest = redShapes.filter((t) => oldPredicate(t));
  say('CF-05', ok && admittedByTheOldTest.length === redShapes.length ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95): dir-built identifiers=[${[...dirBuilt].join(', ')}]; rerun-if-changed values=[${changedValues.join(', ')}]; `
    + `OF THEM, absolute and naming the manifest=[${manifestHits.join(', ')}]; rerun-if-env-changed values=[${envValues.join(', ')}]; `
    + `the WITHDRAWN substring predicate admitted [${admittedByTheOldTest.join(' | ')}] — the corrected one admits none of them`,
    'package.md §6.1 item 7 · release.md §6.10 item 5 · A95 amendment');
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
  // **`A96` SAYS A COMPILE-TIME SUBSTITUTION IS NOT A CONSULTATION — SO THE MACROS ARE COUNTED AND
  // EXCLUDED, NOT IGNORED** (`S5`, this runner). The line that stood here was
  // `!/env!\((…)\)/.test('') && true` — a test of the EMPTY STRING, whose answer is `true` for every
  // tree that could ever exist, so the conjunct was DEAD and could not fail. **A dead conjunct in a
  // scenario's conjunction is a claim that reads as coverage and is not.** This one is now decided over
  // the two files: every `env!("…")` must be one the ruling names (`A96` names `CARGO_PKG_VERSION`), so a
  // macro the closed-set instrument would otherwise have swallowed silently fails the scenario.
  // **AND THE TEXT THAT IS NOT CODE IS EXCLUDED, WITH WHAT WAS EXCLUDED PRINTED**: the first run of this
  // conjunct over the RAW bytes reported four macro occurrences where the sources carry two — the other
  // two stand inside doc comments that NAME the macros (`/// of \`env!("STOREROOM_JS_PACKAGE_VERSION")\`
  // could never fall back`) and a comment is not a substitution. A macro on a line whose own prefix
  // already carries `//` is therefore not counted, **AND EVERY EXCLUSION IS PRINTED** so a reader can see
  // which text was dropped rather than trusting a count.
  const macroUses = []; const macroInComments = [];
  const macroRe = /\b(?:option_)?env!\s*\(\s*"([^"]*)"\s*\)/g;
  for (const f of files) {
    const text = readFileSync(join(ROOT, f), 'utf8');
    for (const m of text.matchAll(macroRe)) {
      const lineStart = text.lastIndexOf('\n', m.index) + 1;
      const prefix = text.slice(lineStart, m.index);
      if (prefix.includes('//') || prefix.trimStart().startsWith('/*')) macroInComments.push(`${f}:${m[1]} (at line ${text.slice(0, m.index).split('\n').length})`);
      else macroUses.push(`${f}:${m[1]}`);
    }
  }
  // **`A96`'S OWN TWO NAMES, AND NOTHING ELSE**: the directive's `option_env!` and the crate-version
  // `env!` are the declared read mechanism (`package.md §6.1`; pinned by CF-03 above), so a macro naming
  // anything else is a substitution the closed-set instrument would otherwise have swallowed.
  const macroA96 = ['bindings/js/src/facade.rs:CARGO_PKG_VERSION', 'bindings/js/src/facade.rs:STOREROOM_JS_PACKAGE_VERSION'];
  const macroOutside = macroUses.filter((u) => !macroA96.includes(u));
  const envMacroOk = macroOutside.length === 0;
  const ok = outside.length === 0 && found.length > 0 && envMacroOk;
  say('CF-06', ok ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95): consultations=[${found.join(', ')}]; outside the five-member set=[${outside.join(', ')}]; `
    + `compile-time macros counted and excluded by A96=[${macroUses.join(', ')}]; macros A96 does NOT name=[${macroOutside.join(', ')}]; `
    + `macro mentions dropped as COMMENT TEXT (a comment is not a substitution)=[${macroInComments.join(', ')}]`,
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
  // is the directive's own emit line wrapped in any conditional? read its nearest enclosing block head
  const lines = src.split('\n');
  const emitAt = lines.findIndex((l) => /rustc-env=STOREROOM_JS_PACKAGE_VERSION/.test(l));
  let enclosingIf = false;
  for (let i = emitAt - 1; i >= 0 && i > emitAt - 40; i--) {
    if (/^\s*(if|else if|match)\b/.test(lines[i])) { enclosingIf = true; break; }
    if (/^\s*fn\s/.test(lines[i])) break;               // reached the item's own head first
  }
  const emitted = emitAt >= 0;
  const ok = emitted && !enclosingIf;
  say('CF-07', ok ? 'PASS' : 'FAIL',
    `SOURCE-PINNED (A95, by name at parameter-semantics.md §5.1): the emit line stands at ${emitAt + 1} with no enclosing conditional (unconditional=${!enclosingIf}); the "writes an empty string / writes nothing" fork is READ ONLY at the carrier's own source`,
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
  // **THE EXISTENCE GUARDS ARE NOW DERIVED STRUCTURALLY AND THE COUNT IS A COUNT** (`S5`, this runner).
  // The two hard-coded spellings that stood here (`guard: the manifest` / `guard: the pack-time`) made the
  // scenario's `2` a LOWER BOUND: a THIRD existence guard spelled differently would not have been counted,
  // and the clause's arithmetic would have been reported over a set the instrument had silently narrowed.
  // `release.md §1.4a` item `11`(b) names the form itself — the ordinal-prefixed guard spelling — so the
  // set is taken by THAT form (an ordinal, a dot, optional space, `guard:`), which is structural and needs
  // no spelling of any step's own words. Printed with the members' own names so the count can be read.
  const existenceGuards = names.filter((n) => /^'?\d+\.\s*guard:/.test(n));
  // The version guard is the one the clause's three name tokens select; the clause's own arithmetic is
  // `2` existence guards PLUS `1` version guard = the `3` members of the `4.`-prefixed set — and it is
  // PRINTED as that arithmetic rather than asserted as one number standing alone.
  const arithmetic = existenceGuards.length + guardNames.length;
  const ok = fourPrefixed.length === 3 && guardNames.length === 1 && existenceGuards.length === 2 &&
    arithmetic === fourPrefixed.length &&
    !existenceGuards.some((n) => n.includes('pre-publish guard'));
  say('CF-09', ok ? 'PASS' : 'FAIL',
    `four-prefixed steps=${fourPrefixed.length} [${fourPrefixed.join(' | ')}]; existence guards by the clause's `
    + `ordinal-prefixed form=${existenceGuards.length} [${existenceGuards.join(' | ')}]; version guards=${guardNames.length} `
    + `[${guardNames.join(' | ')}]; ${existenceGuards.length} + ${guardNames.length} = ${arithmetic} == ${fourPrefixed.length}`,
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
