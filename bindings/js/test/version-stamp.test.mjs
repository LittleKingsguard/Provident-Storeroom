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
// ---------------------------------------------------------------------------------------------
// THE KICK-BACK RESOLUTION — `D-GP-SVM-4`, disposition (a) MALFORMED, APPLIED TO THIS FILE
// ---------------------------------------------------------------------------------------------
// TEST IDENTIFIER: `P-PUB-9::S-STAMP` — the carrier's directive cell, `bindings/js/test/
// version-stamp.test.mjs`, the assertion that stood at `:388`.
// DISPOSITION: **(a) MALFORMED — NOT A RE-FREEZE.** The cell demanded a SHAPE the contract refuses: it
// required `DIRECTIVE.value` to equal `0.1.1` while ALSO requiring the SAME expression to name
// `CARGO_MANIFEST_DIR` and `package.json` — jointly satisfiable ONLY IF `build.rs` carried the manifest's
// version as a RUST LITERAL, i.e. ONLY IF the build script STOPPED READING THE MANIFEST. **THE CONTRACT
// REQUIRES THE OPPOSITE**: `release.md §2.4` item `1` and `docs/specs/storeroom-js/package.md §6.1` item
// `2` both say the build script READS `bindings/js/package.json`'s `version` ITSELF, so the cell pinned a
// SYNTACTIC SHAPE (a literal, inline) where the contract pins a SOURCE RELATION (the script reads the
// manifest and derives the directive's value from that read).
// REASON IN THE ARTEFACT'S OWN TERMS: the implementer's lawful carrier prints
// `cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}` at `build.rs:89` with the manifest read at
// `:70`, so the printed slot is an INTERPOLATED BINDING and the cell's own reader — which asked that same
// binding for a QUOTED LITERAL — answered `null` on a carrier that satisfies the relation exactly.
// ROLES THAT ACTED: `role_test_writer` (author of the over-strong cell, and the corrector here) ·
// `role_implementer` (reached 14/15 and STOPPED, naming the cell and its line, and MEASURED the six
// computed-value shapes rather than asserting them) · `role_supervisor` (adjudicated (a) MALFORMED).
// **NO RE-FREEZE OCCURRED AND NO HASH CHANGED**: no spec byte was written, no contract clause was moved,
// re-cut or withdrawn, and the correction below is a TEST-side instrument change against the clauses as
// they already stand — the authority is read AT THE CLAUSES' OWN SPELLING and no hash of any document is
// asserted, recorded or moved by this pass.
// AND THE STANDING RULE THIS UNIT NOW CARRIES IS OBEYED HERE: **an amendment after a re-flow is AUTHORED
// AS ITS OWN LINE and NEVER APPENDED, and MEASURED IN THE UNIT THE LIMIT IS IN.** The paragraph above is
// its own line-bearing block and not an appendage to a clause's tail, and the `2000` limit is a
// **BYTE** width — `awk 'length'` counts CHARACTERS on this tree's `UTF-8` files and a character count is
// NOT a byte count (measured this pass: `awk 'length'` answers `7` where `wc -c` answers `9` on the same
// line, `§` being two bytes and one character). **THIS FILE WRITES NO DOCUMENT, so the rule binds this
// pass as MEASUREMENT DISCIPLINE and not as an edit.**
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
import { stageModuleTree } from './module-set.mjs';

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
// **AND THE MANIFEST'S NAME IS MATCHED AS A WHOLE PATH SEGMENT AND NOT AS A SUBSTRING — THIS PASS (`S1`)
// TIGHTENED THE READER'S OWN TEST, ON THE SAME GROUND THE SIBLING TRIGGER CELL TIGHTENED ITS OWN (`S3`):**
// `text.includes('package.json')` is TRUE of `package.json.bak`, so the reader classified a read of a
// BACKUP as a read of THE MANIFEST — which is how a carrier that prints a value taken from a second read
// was admitted by the corrected relation on its first measurement (the battery's `B7` row). The clause's
// subject is the manifest ITSELF (`release.md §2.4` item `1`: *"READS `bindings/js/package.json`'s
// `version` ITSELF"*), so the name must be terminated: not followed by a word character, a dot or a
// hyphen. `package.json"` and `package.json)` are terminations; `package.json.bak` is not.
const MANIFEST_SEGMENT = new RegExp(`${MANIFEST_REL_TO_CRATE.replace(/\./g, '\\.')}(?![\\w.-])`);

const BUILD_RS = join(PKG_DIR, 'build.rs');
const FACADE_RS = join(PKG_DIR, 'src', 'facade.rs');

/** `release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2` read with `release.md
 *  §6.10` item `1` — **THE EXTRACTION OPERATIONS BY WHICH A DERIVED VALUE IS TAKEN FROM THE MANIFEST'S OWN
 *  BYTES: the `version` FIELD is the thing the clause names as the stamp's source, so a binding that
 *  merely NAMES the read content without extracting from it is not a derivation.** The set is declared
 *  rather than inferred, and each member is an operation a Rust build script reaches the field's text
 *  through — the string searches and slicing the declared carrier uses, and the two JSON parses it does
 *  not: **the reader accepts a FORM and does not prefer one, because `§2.4` item `1` pins the SOURCE and
 *  `§6.10` item `1` pins the read, while neither clause pins a parser.** */
const BuildRsExtraction = /\b(rsplit|split_once|split|find|strip_prefix|trim|from_str|parse|serde_json|json!)\b/;
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
 * **`release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2` — THE DIRECTIVE AS THE
 * CARRIER'S OWN BYTES DECLARE IT, READ AS A SOURCE RELATION AND NOT AS A SPELLING.**
 *
 * **THIS READER WAS CORRECTED, AND WHY IT HAD TO BE** (`D-GP-SVM-4`, disposition `(a)`, whose record stands
 * at this file's own head): its first form asked the printed slot's binding for a QUOTED LITERAL and
 * answered `null` on a LAWFUL carrier whose printed slot is an INTERPOLATED BINDING — because the contract
 * requires the build script to READ the manifest and DERIVE the value from that read, and a derived value
 * is an expression, not a token. **A reader that demanded a token therefore pinned a shape the contract
 * refuses and would have been satisfied only by a build script that HARD-CODED the version and stopped
 * reading the manifest at all** — which is the opposite of what the clause orders.
 *
 * **SO THE READER NOW REPORTS THE FOUR FACTS THE RELATION IS MADE OF, AND `null` IS STILL AN ASSERTABLE
 * ABSENCE RATHER THAN A CRASH:**
 *   (i)   `name` — the directive's NAME, as the printed `cargo:rustc-env=<NAME>=…` spells it;
 *   (ii)  `manifestPathExpression` — the expression that BUILDS the manifest's path, reported ONLY where
 *         that expression names `CARGO_MANIFEST_DIR` AND the manifest file itself; the path-variable
 *         binding is RESOLVED rather than pattern-matched, so `let manifest = env::var("CARGO_MANIFEST_DIR")`
 *         followed by `format!("{manifest}/package.json")` is READ AS the path it is;
 *   (iii) `manifestReadExpression` — the expression that READS THE MANIFEST, reported ONLY where it names
 *         the path variable (i.e. where the read consumes the `CARGO_MANIFEST_DIR`-built path);
 *   (iv)  `valueExpression` — the expression whose value is PRINTED into the directive, resolved through
 *         its binding, and `null` where the printed slot carries a LITERAL — because a literal is exactly
 *         the shape in which the manifest is NOT the source.
 * **NO FACT IS INFERRED FROM A PHRASE SEARCH ALONE**: the two path/read facts are reported as the
 * expressions themselves, so a cell compares RELATIONS and a reader can see what was matched.
 */
// **⟶ THE READER IS PARAMETRIZED OVER ITS SOURCE TEXT, AND THAT IS AN INSTRUMENT CHANGE AND NOT A
// WIDENING — it exists so the relation below can be ASKED OF A CARRIER THAT IS NOT THIS TREE'S.** The
// reader's first form read the module-level `BUILD_RS_CODE` alone, so the only carrier any cell could
// put to it was the file standing in the tree: the relation's DISCRIMINating POWER was therefore
// unfalsifiable in place, and a shape the relation cannot separate could not be exhibited at all. Every
// call in this file now passes a source EXPLICITLY, and the one call that passes `BUILD_RS_CODE` is the
// real carrier's (`D-GP-SVM-5`; this pass's own finding, S1).
// **TWO FACTS ABOUT A CARRIER'S BYTES, EACH DECIDED BY ONE RULE AND SHARED BY EVERY CELL THAT ASKS FOR
// IT** — so the directive's relation and the re-run trigger's relation cannot drift apart, and so a
// carrier that declares its triggers and prints nothing is classified by the same instrument as one that
// does both. **A READ IS CLASSIFIED BY THE FILE ITS ARGUMENT NAMES** (`isManifest`), and **AN IDENTIFIER IS
// `CARGO_MANIFEST_DIR`-BUILT WHERE ITS OWN VALUE RESOLVES TO A `CARGO_MANIFEST_DIR` READ**, transitively.
function readsOf(sourceText, expand, namesManifestDir) {
  const reads = [];
  for (const m of sourceText.matchAll(/let\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*fs::read(?:_to_string)?\(/g)) {
    const at = m.index + m[0].length;
    let depth = 1;
    let end = at;
    for (; end < sourceText.length && depth > 0; end += 1) {
      if (sourceText[end] === '(') depth += 1;
      else if (sourceText[end] === ')') depth -= 1;
    }
    const arg = sourceText.slice(at, end - 1).trim();
    reads.push({ name: m[1], arg, isManifest: arg !== '' && namesManifestDir(expand(arg)) });
  }
  return reads;
}

function dirBuiltOf(bindings, expand) {
  return [...bindings.keys()].filter((id) => /CARGO_MANIFEST_DIR/.test(expand(bindings.get(id))));
}

function declaredDirective(sourceText, { legacyName = false } = {}) {
  // **THE NAMES, THE BINDINGS AND THE `CARGO_MANIFEST_DIR` CLASSIFICATION ARE DECIDED BEFORE THE DIRECTIVE
  // IS EVEN LOOKED FOR, AND THAT ORDER IS THIS PASS'S (`S3`):** the re-run trigger's relation is a fact of
  // the SAME file and is decidable WITHOUT a directive — a carrier that declares its two triggers and
  // prints nothing is a carrier the trigger battery must be able to drive (its `T-real` member is exactly
  // that), and a reader that returned `null` before classifying would have reported the trigger's own
  // directory identifiers ABSENT on it, manufacturing the absence it was asked to measure.
  // Any `let <ident> = <expr>;` in the file, so a path variable can be resolved BY NAME rather than
  // matched by spelling — the declared carrier reaches its path through TWO hops (`let manifest =
  // env::var("CARGO_MANIFEST_DIR")`, then `format!("{manifest}/package.json")`), and a reader that did not
  // resolve names would report the path ABSENT on a carrier that builds it — an absence manufactured by
  // the instrument, which is the very fault this correction exists to remove.
  const bindings = new Map();
  for (const m of sourceText.matchAll(/let\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^;]*);/g)) bindings.set(m[1], m[2].trim());
  /** Every identifier the expression names, replaced by its own binding, repeatedly until nothing changes —
   *  i.e. THE EXPRESSION THE COMPILER SEES, as text. A name that binds nothing is left standing (it is
   *  then a parameter or an outer binding), and the walk stops as soon as a round changes nothing, so a
   *  cyclic pair cannot loop and a long derivation does not grow without bound. */
  function expand(expression) {
    let text = String(expression);
    for (let round = 0; round < 4; round += 1) {
      const before = text;
      for (const [id, bound] of bindings) {
        if (!new RegExp(`\\b${id}\\b`).test(text)) continue;
        text = text.replace(new RegExp(`\\b${id}\\b`, 'g'), `(${bound})`);
      }
      if (text === before) break;
    }
    return text;
  }
  // **`legacyName` REPRODUCES THIS READER'S PRE-PASS CLASSIFICATION SO THE BATTERY CAN SHOW WHAT THE PASS
  // CHANGED**: with it, *"the manifest"* is `text.includes('package.json')` — which is TRUE of
  // `package.json.bak` — and that is the test the reader itself stood on until `S1` corrected it.
  const namesManifestDir = (text) => /CARGO_MANIFEST_DIR/.test(text)
    && (legacyName ? text.includes(MANIFEST_REL_TO_CRATE) : MANIFEST_SEGMENT.test(text));
  const print = /println!\(\s*"cargo:rustc-env=([A-Z_]+)=\{([A-Za-z_][A-Za-z0-9_]*)\}"/.exec(sourceText);
  if (print === null) {
    // **NO DIRECTIVE IS EMITTED, AND THE TWO FACTS THAT DO NOT DEPEND ON ONE ARE STILL REPORTED** — a
    // carrier with no `cargo:rustc-env` line is exactly the shape of the trigger battery's `T-real`
    // member, and a reader that answered a bare `null` there would leave the trigger's own relation
    // unmeasurable. `name` is `null` and every directive-relation fact is ABSENT.
    return { name: null, slot: null, valueExpression: null, manifestPathExpression: null,
      manifestReadExpression: null, viaManifestDir: false, viaManifestFile: false,
      reads: readsOf(sourceText, expand, namesManifestDir),
      dirBuiltIdents: dirBuiltOf(bindings, expand), valueReachableIdents: [] };
  }
  const [, name, slot] = print;
  const bound = new RegExp(`let\\s+${slot}\\s*=\\s*(.+?);`).exec(sourceText);
  if (bound === null) {
    // The slot is printed but binds nothing this reader can resolve. Reported rather than invented: the
    // directive is EMITTED (its name is a fact of its own bytes) and every relation below is ABSENT.
    return { name, slot, valueExpression: null, manifestPathExpression: null, manifestReadExpression: null,
      viaManifestDir: false, viaManifestFile: false, reads: readsOf(sourceText, expand, namesManifestDir),
      dirBuiltIdents: dirBuiltOf(bindings, expand), valueReachableIdents: [] };
  }
  const boundExpression = bound[1];
  // **THE BINDING IS RESOLVED THROUGH THE PRINTED SLOT, SO AN INDIRECT BINDING IS NOT A FALSE ABSENCE**:
  // `let version = &rest[2..7];` prints `{version}`, and the `&` prefix is the reference the printing does
  // not consume. The reported expression is the one whose VALUE is printed.
  const valueExpression = boundExpression.replace(/^&/, '').trim();
  // (ii) THE PATH: **THE CARRIER'S OWN EXPRESSION THAT BUILDS IT, REPORTED AS WRITTEN AND NOT AS EXPANDED.**
  // A DIRECT match is preferred over a resolved one, and the carriers' own order is searched before the
  // printed value's chain — otherwise a value that merely REACHES the path through its bindings would be
  // reported as the path's builder and the diagnostic would name the wrong site. **THE EXPRESSION IS CUT AT
  // ITS OWN COMPOSITION and not at the whole statement**: for the declared carrier the binding is
  // `fs::read_to_string(format!(…)).expect(…)`, and reporting the `expect` chain as "the path expression"
  // would print a read under a path's name.
  const pathCandidates = [...bindings.values(), valueExpression, boundExpression];
  // **THE COMPOSITION IS READ THROUGH THE `format!` ARGUMENT, BECAUSE THE PATH'S LITERAL TEXT NAMES ONLY
  // `package.json`** — `format!("{manifest}/package.json")` resolves to the `CARGO_MANIFEST_DIR`-built path
  // through the variable THE ARGUMENT INTERPOLATES, so a reader that looked for the variable in the format
  // string's own text would report the path ABSENT on the lawful carrier: the reader resolves the argument.
  const formatArg = (text) => {
    const at = text.indexOf('format!(');
    if (at === -1) return null;
    let depth = 0;
    for (let i = at + 'format!'.length; i < text.length; i += 1) {
      if (text[i] === '(') depth += 1;
      else if (text[i] === ')') { depth -= 1; if (depth === 0) return text.slice(at, i + 1); }
    }
    return null;
  };
  const composed = (text) => {
    const call = formatArg(text);
    if (call !== null && (namesManifestDir(call) || namesManifestDir(expand(call)))) return call;
    return namesManifestDir(text) ? text : null;
  };
  // **A DIRECT PASS FIRST, AND THE RESOLVED PASS ONLY WHERE NOTHING STANDS DIRECTLY** — the two tiers are
  // evaluated ONE AFTER THE OTHER and not as one chain, so the direct tier never sees an expanded text.
  let manifestPathExpression = pathCandidates.map(composed).find((e) => e !== null) ?? null;
  if (manifestPathExpression === null) {
    manifestPathExpression = pathCandidates.map((e) => composed(expand(e))).find((e) => e !== null) ?? null;
  }
  // **THE REPORTED PATH IS THE COMPOSITION WHERE ONE STANDS IN THE FILE**, so the `expect` chain around the
  // read is never printed as "the path expression" — a read printed under a path's name would be a
  // diagnostic that misnames its own site.
  // (iii) THE READ: `fs::read_to_string(<expr>)` or `fs::read(<expr>)`, reported only where the argument
  // CONSUMES the `CARGO_MANIFEST_DIR`-built path AT FULL RESOLUTION. **THE ARGUMENT IS MATCHED WITH A
  // BALANCED-PARENTHESIS READER AND NOT BY `[^)]*`**, because the declared carrier's own argument is
  // `format!("{manifest}/package.json")` — a nested call — and a reader that stopped at the first `)` would
  // PRINT a truncated expression and report the read as something other than what it is.
  let manifestReadExpression = null;
  for (const m of sourceText.matchAll(/\bfs::read(?:_to_string)?\(/g)) {
    const at = m.index + m[0].length;
    let depth = 1;
    let end = at;
    for (; end < sourceText.length && depth > 0; end += 1) {
      if (sourceText[end] === '(') depth += 1;
      else if (sourceText[end] === ')') depth -= 1;
    }
    const arg = sourceText.slice(at, end - 1).trim();
    if (arg !== '' && namesManifestDir(expand(arg))) {
      manifestReadExpression = `fs::read_to_string(${arg})`;
      break;
    }
  }
  // **EVERY READ THE CARRIER PERFORMS, EACH WITH THE FILE IT READS NAMED AS THE SUBJECT IT IS** — the
  // fact the corrected relation (S1 below) is decided over, and the fact the pre-correction relation
  // could not see: `release.md §2.4` item `1` makes the MANIFEST the stamp's source, so a cell that
  // asks only *"was SOME read consumed?"* admits a carrier that reads the manifest and prints a value
  // taken from a SECOND read. Each member carries `isManifest`, decided by the SAME
  // `CARGO_MANIFEST_DIR`-built-path test the path and read facts above are decided by, so a read's
  // subject is classified by one rule and not by two.
  const reads = readsOf(sourceText, expand, namesManifestDir);
  // **THE IDENTIFIERS THE PRINTED VALUE REACHES THROUGH `let` BINDINGS — A WALK OF THE REFERENCE GRAPH,
  // WITH STRING LITERALS REMOVED SO THAT A WORD INSIDE A STRING IS NOT A REFERENCE.** The pre-correction
  // relation was decided over `valueResolvedText`, a FOUR-ROUND TEXT SUBSTITUTION whose own fixed point can
  // carry a name that a CYCLE merely re-introduced — which is the second half of `S1`: a name standing
  // anywhere in that text is not a name the printed value is taken from. This walk is the fact the
  // corrected relation is decided over: it starts from the printed expression's own references, follows
  // each name to its `let`, and stops where a name binds nothing (a parameter, a function, a keyword).
  const stripStringLiterals = (text) => String(text)
    .replace(/r#+"[\s\S]*?"#+/g, '""')
    .replace(/r"[\s\S]*?"/g, '""')
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");
  const referencedNames = (text) => new Set(
    [...stripStringLiterals(text).matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g)].map((m) => m[1]));
  const reachableIdents = () => {
    const seen = new Set();
    const queue = [...referencedNames(valueExpression)];
    while (queue.length > 0) {
      const id = queue.pop();
      if (seen.has(id)) continue;
      seen.add(id);
      const own = bindings.get(id);
      if (own === undefined) continue;
      for (const next of referencedNames(own)) if (!seen.has(next)) queue.push(next);
    }
    return seen;
  };
  return {
    name,
    slot,
    valueExpression,
    // **THE FULLY-RESOLVED TEXT IS REPORTED BESIDE THE EXPRESSION, BOUNDED IN LENGTH**, so the relation can
    // be READ at a failure instead of taken on trust; the two tests below are decided over it. It is cut at
    // a declared width because a derivation through several bindings resolves to a LARGE text (the carrier's
    // own resolves to ~93 kB), and a diagnostic nothing can read is not a diagnostic — **and the cut is
    // PRINTED where it happens, so a truncated text is never mistaken for a short one.**
    valueResolvedText: (() => {
      const full = expand(valueExpression);
      return full.length <= 4000 ? full : `${full.slice(0, 4000)} …[TRUNCATED at 4000 of ${full.length} chars]`;
    })(),
    manifestPathExpression,
    manifestReadExpression,
    reads,
    valueReachableIdents: [...reachableIdents()].sort(),
    // **THE IDENTIFIERS WHOSE OWN VALUE IS BUILT FROM THE MANIFEST DIRECTORY, RESOLVED THROUGH THEIR
    // BINDINGS** — the fact the re-run-trigger relation (S3 below) is decided over: `§6.1` item `7` asks
    // for *"an ABSOLUTE path built from `CARGO_MANIFEST_DIR`"*, and *"built from"* is a fact about the
    // identifier's own binding rather than about the spelling of the literal that interpolates it.
    dirBuiltIdents: dirBuiltOf(bindings, expand),
    // **`viaManifestDir` / `viaManifestFile` KEEP THEIR SUBJECT AND LOSE THEIR ONE-HOP DEFECT**: they ask
    // whether the printed value is REACHED THROUGH the `CARGO_MANIFEST_DIR`-built manifest path, and that
    // question is answered over the RESOLVED text, because the declared carrier reaches the path through
    // two hops. **A textual one-hop test here would have failed the lawful carrier on the same fault the
    // kick-back named**, so the correction reaches this flag too — and it reports the same property, not a
    // weaker one: a value that does not stand on the manifest path still answers `false`.
    viaManifestDir: /CARGO_MANIFEST_DIR/.test(expand(valueExpression)),
    viaManifestFile: legacyName
      ? expand(valueExpression).includes(MANIFEST_REL_TO_CRATE)
      : MANIFEST_SEGMENT.test(expand(valueExpression)),
  };
}

const DIRECTIVE = declaredDirective(BUILD_RS_CODE);

// =============================================================================================
// §2.4 THE CARRIER-SHAPE RELATION — DECIDED OVER A GIVEN SOURCE, SO IT CAN BE FAILED ON PURPOSE
// =============================================================================================
// **WHY THIS EXISTS, STATED AS THIS PASS'S OWN FINDING (`S1`):** the relation the `P-PUB-9::S-STAMP`
// cell asserts was, before this pass, decidable over ONE carrier — the file standing in this tree —
// because its reader read the module-level `BUILD_RS_CODE`. **A RELATION THAT CAN BE ASKED OF ONE
// CARRIER CANNOT SHOW WHAT IT SEPARATES**, and the one shape it did not separate (a carrier that keeps
// the manifest read standing and prints a value taken from a SECOND read) was invisible because of it:
// the cell's part (4), `derived`, asked whether ANY identifier bound by a `let X = fs::read…` appeared
// ANYWHERE in the resolved emission text — *"anywhere"* being the whole defect, since a name that
// survives somewhere in a several-hop expansion is not a name the printed value is taken from.
//
// **THE RELATION, IN ITS PARTS, EACH NAMED FOR THE TERM OF THE CLAUSE IT DECIDES** (`release.md §2.4`
// item `1`; `docs/specs/storeroom-js/package.md §6.1` item `2`):
//   `emitted` — the `cargo:rustc-env`-class directive stands;
//   `nameExact` — its NAME is `STOREROOM_JS_PACKAGE_VERSION` (`package.md §6.1` item `2`);
//   `valueIsABinding` — the value is DERIVED (a binding printed into the directive), never a literal;
//   `manifestPathBuilt` — the path is BUILT through `CARGO_MANIFEST_DIR` and carries `package.json`;
//   `manifestReadStands` — the path IS READ (`§2.4` item `1`: *"READS … ITSELF"*);
//   `derivedFromManifest` — **THE VALUE PRINTED IS DERIVED FROM THE MANIFEST THAT READ RETURNED** and
//      not from any other read: the manifest read's own content binding must be consumed by the printed
//      value's chain (`S1`'s correction);
//   `extractedFromTheBytes` — the value performs an extraction over the manifest's own bytes
//      (`§6.10` item `1`: the `version` FIELD is what the clause names);
//   `viaManifestDir` · `viaManifestFile` — the value is REACHED through that path;
//   `noForeignReadConsumed` · **NEW, AND THE CLAUSE'S OWN SUBJECT** — no read of a DIFFERENT file is
//      consumed by the printed value: `§2.4` item `1` makes the MANIFEST the stamp's source, so a value
//      taken from a second read is the refused form whatever the first read does.
// **THE PRE-CORRECTION RELATION IS KEPT AND REPORTED BESIDE THE CORRECTED ONE** (`legacy`),
// because the only way to show a correction closed a hole is to drive the SAME carrier through both and
// print both answers. It is an instrument and not a claim: no cell decides anything by its answer.
function carrierRelation(sourceText, { legacy = false } = {}) {
  const d = declaredDirective(sourceText, { legacyName: legacy });
  const reads = (d && d.reads) || [];
  const manifestReads = reads.filter((r) => r.isManifest);
  const foreignReads = reads.filter((r) => !r.isManifest);
  const text = (d && d.valueResolvedText) || '';
  const reachable = new Set((d && d.valueReachableIdents) || []);
  /** A name appearing ANYWHERE in the resolved emission text — **THE PRE-CORRECTION TEST, KEPT VERBATIM
   *  AS THE INSTRUMENT THAT STOOD HERE**: `contentNames.some((id) => \b id \b.test(valueResolvedText))`
   *  over every read content binding in the file. Its answer is printed for every battery member and
   *  decides nothing. */
  const mentions = (id) => new RegExp(`\\b${id}\\b`).test(text);
  const legacyDerived = reads.some((r) => mentions(r.name));
  const fromManifestRead = manifestReads.some((r) => reachable.has(r.name));
  const foreignConsumed = foreignReads.filter((r) => reachable.has(r.name)).map((r) => r.name);
  const common = {
    // **`emitted` MEANS THE DIRECTIVE IS PRINTED, AND THAT IS `name !== null` AND NOT `d !== null`.** This
    // reader once answered a bare `null` when no `cargo:rustc-env` line stood in the source, so `d !== null`
    // carried that meaning; this pass made it report the two facts that do NOT depend on a directive even
    // when none is printed (`S3`: the trigger relation must be askable of such a carrier), so the OLD
    // spelling of this part silently became TRUE for a carrier that prints nothing at all — **a part
    // weakened by a change to the instrument's return shape, which is precisely the fault class this pass
    // exists to remove and was caught by the battery row `B2`** (the hard-coded emitter, which stopped
    // being refused on `emitted`). The part now asks the question it always asked.
    emitted: d !== null && d.name !== null,
    nameExact: d !== null && d.name === DIRECTIVE_NAME,
    valueIsABinding: d !== null && d.valueExpression !== null && d.valueExpression !== '',
    manifestPathBuilt: d !== null && d.manifestPathExpression !== null,
    manifestReadStands: d !== null && d.manifestReadExpression !== null,
    extractedFromTheBytes: d !== null && BuildRsExtraction.test(text),
    viaManifestDir: d !== null && d.viaManifestDir === true,
    viaManifestFile: d !== null && d.viaManifestFile === true,
  };
  const corrected = { ...common, derivedFromManifest: fromManifestRead,
    noForeignReadConsumed: foreignConsumed.length === 0 };
  const preCorrection = { ...common, derivedFromManifest: legacyDerived };
  const parts = legacy ? preCorrection : corrected;
  const failed = (set) => Object.entries(set).filter(([, ok]) => !ok).map(([part]) => part);
  return {
    directive: d, reads, manifestReads, foreignReads, foreignConsumed, legacyDerived,
    parts, refusedBy: failed(parts), legacyRefusedBy: failed(preCorrection),
    refused: failed(parts).length > 0,
  };
}

// =============================================================================================
// §2.4 item `5` / §6.1 item `7` — THE RE-RUN TRIGGER, DECIDED BY THE CLAUSE'S OWN REQUIREMENT
// =============================================================================================
// **THE CLAUSE'S OWN WORDS, APPLIED RATHER THAN SUBSTRING-CHECKED**: *"THE CARRIER MUST DECLARE A RE-RUN
// TRIGGER ON THE MANIFEST IT READS — an ABSOLUTE path built from `CARGO_MANIFEST_DIR`, TOGETHER WITH
// `cargo:rerun-if-env-changed` FOR THE DIRECTIVE'S NAME"* (`docs/specs/storeroom-js/package.md §6.1`
// item `7`), *"`cargo:rerun-if-changed` ON THE `CARGO_MANIFEST_DIR`-BUILT MANIFEST PATH, PLUS
// `cargo:rerun-if-env-changed` FOR THE DIRECTIVE'S NAME"* (`contract.md §5.0a`'s member and its
// falsifier). **SO THREE FACTS ARE DECIDED, EACH A FACT OF THE FILE'S OWN BYTES:** (1) the changed
// trigger's value is an ABSOLUTE path — it OPENS with the interpolation of an identifier whose own value
// is built from `CARGO_MANIFEST_DIR` (`§6.1` item `7`'s *"ABSOLUTE"*); (2) that path NAMES THE MANIFEST,
// i.e. it ENDS at `/package.json`, so `package.json.bak` — and every other file beside the manifest — is
// REFUSED where a substring test admitted it; (3) the env trigger's value IS the directive's own name,
// CHARACTER FOR CHARACTER — the printed SLOT is a binding's name and not the directive's, so a slot name
// is refused with it.
// **AND THE PRE-CORRECTION TEST IS KEPT BESIDE IT** (`legacySubstring`), because it is the test that stood
// here: `changed.some((p) => p.includes(slot) || p.includes('package.json'))`, a SUBSTRING test that
// `cargo:rerun-if-changed=package.json.bak` satisfies while the warm-`target/` hazard stands open.
function reRunTriggers(sourceText, { legacySubstring = false } = {}) {
  const code = stripRustComments(sourceText);
  const changed = [...code.matchAll(/println!\(\s*"cargo:rerun-if-changed=([^"]*)"\s*\)/g)].map((m) => m[1]);
  const envChanged = [...code.matchAll(/println!\(\s*"cargo:rerun-if-env-changed=([^"]*)"\s*\)/g)].map((m) => m[1]);
  const d = declaredDirective(sourceText);
  const dirBuilt = (d && d.dirBuiltIdents) || [];
  const absolute = new RegExp(`^\\{([A-Za-z_][A-Za-z0-9_]*)\\}/${MANIFEST_REL_TO_CRATE.replace(/\./g, '\\.')}$`);
  const manifestHits = changed.filter((value) => {
    const m = absolute.exec(value);
    return m !== null && dirBuilt.includes(m[1]);
  });
  const envHits = envChanged.filter((name) => name === DIRECTIVE_NAME);
  const legacyManifest = changed.some((p) => p.includes(d ? d.slot : 'manifest') || p.includes(MANIFEST_REL_TO_CRATE));
  const legacyEnv = envChanged.some((n) => n === DIRECTIVE_NAME || n === (d ? d.slot : ''));
  return {
    changed, envChanged, dirBuilt, manifestHits, envHits, legacyManifest, legacyEnv,
    manifestOk: legacySubstring ? legacyManifest : manifestHits.length > 0,
    envOk: legacySubstring ? legacyEnv : envHits.length > 0,
  };
}

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
  // **⟶ RE-STAGED 2026-10-24 (`strata/decisions.md` `D-14`; `docs/L1/drive-restaging.md` §2 and §3.3).** This
  // tree used to copy `index.mjs` ALONE, which after the entry's cut cannot be constructed as a module graph at
  // all — the hub imports eight parts and the barrel stands one directory up. **It now carries the module's own
  // closed set**: the hub, the GLOB of `src/entry/*.mjs` and the barrel, staged at the same relative layout,
  // with the tree's CLOSURE asserted over the staged bytes before any child process is spawned. **THE COPY IS A
  // FIXTURE AND NOT A SUBJECT** (`§3.3`): no cell of this drive asserts that the staged tree is one file, so the
  // cells' assertions do not move — the nine that were red here were red for the staging reason alone.
  stageModuleTree(PKG_DIR, dir);
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
// **AND THE CARRIER-SIDE STATE THIS BLOCK ADDS, ENUMERATED IN THE CORRECTION'S OWN TERMS (`D-GP-SVM-4`
// (a), recorded at this file's head) — one row per shape a build script can take at its own bytes:**
//   (c1) the directive is EMITTED with its declared NAME, and its VALUE IS DERIVED FROM THE MANIFEST THE
//        CARRIER READS — the path built through `CARGO_MANIFEST_DIR` + `package.json`, READ, and the
//        printed value taken from what was read — SUCCESS (`release.md §2.4` item `1`)
//   (c2) the directive is emitted as a HARD-CODED LITERAL — no read stands behind the value → FAIL
//   (c3) the directive is emitted from a value the script did NOT read from the manifest — a fallback, an
//        ambient variable, a second source — → FAIL (`§2.4` item `1(iv)`; `A96`)
//   (c4) the carrier reads a DIFFERENT file, or reaches the manifest through no `CARGO_MANIFEST_DIR` — → FAIL
//   (c5) the carrier reads the manifest and declares NO RE-RUN TRIGGER on it → FAIL, and its falsifier is
//        the source-level cell over `build.rs`'s bytes below (member `(8)`; `§6.10` item `5`)
// Cells `(c1)(c2)(c3)(c4)` are driven by the ONE cell below, and its `(c2)` row is the answer to the
// question this correction was judged by: **could a HARD-CODED emitter, or one that did not read the
// manifest at all, still pass? — NO, and each is refused by a NAMED assertion rather than by a comment.**

test('P-PUB-9::S-STAMP a stamped carrier declares the directive, DERIVES its value from the manifest it READS, and the facade reads it with the crate version on `None` as the only fallback', () => {
  // `release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`: `bindings/js/build.rs`
  // READS THE MANIFEST ITSELF and emits the `cargo:rustc-env`-class directive `STOREROOM_JS_PACKAGE_VERSION`;
  // `release.md §1.4a` item `3`'s dated correction: the self-report's read is
  // `option_env!("STOREROOM_JS_PACKAGE_VERSION")` with `env!("CARGO_PKG_VERSION")` taken on the `None` arm.
  // **THE INSTRUMENT IS A SOURCE-LEVEL READ OF TWO FILES, AT THE CLAUSES' OWN DIRECTION, AND IT IS NAMED
  // HERE**: no run can observe a build-time substitution, so this member is pinned at the source or not at
  // all (`A95`; `§1.4a` item `8`).
  //
  // **⟶ THE ASSERTION THAT STOOD HERE WAS OVER-STRONG AND IS CORRECTED, NOT WEAKENED — `D-GP-SVM-4`,
  // disposition `(a)`, recorded at this file's head.** Its former form required `DIRECTIVE.value` to equal
  // `0.1.1` while requiring the SAME expression to name `CARGO_MANIFEST_DIR` and `package.json`, which is
  // jointly satisfiable ONLY by a build script that carries the manifest's version as a RUST LITERAL and
  // therefore DOES NOT READ THE MANIFEST — the opposite of what `§2.4` item `1` orders. **THE CONTRACT PINS
  // A SOURCE RELATION AND NOT A SPELLING**, so this cell now proves the RELATION: the path is BUILT, the
  // path is READ, and the value PRINTED INTO THE DIRECTIVE IS THE ONE THAT READ RETURNED. **THE `value`
  // ASSERTION IS NOT REPLACED BY A WEAKER ONE**: an emitter that hard-coded the version, or that did not
  // read the manifest at all, is refused by a NAMED assertion below rather than by a comment, and the
  // `DIRECTIVE.name` assertion is the FIRST of them so a reader sees WHAT the correction did not touch.
  assert.ok(DIRECTIVE !== null,
    '`release.md §2.4` item 1 / `parameter-semantics.md §5.1`: `bindings/js/build.rs` must EMIT the '
    + '`cargo:rustc-env`-class directive (no `println!("cargo:rustc-env=<NAME>={...}")` is declared at its bytes)');
  assert.equal(DIRECTIVE.name, DIRECTIVE_NAME,
    '`docs/specs/storeroom-js/package.md §6.1` item 2: the directive\'s NAME is `STOREROOM_JS_PACKAGE_VERSION`');
  // **THE CORRECTED ASSERTION, IN FIVE PARTS, EACH NAMING ONE TERM OF THE RELATION — AND EACH PRINTING THE
  // EXPRESSIONS IT READ**, so a reader of a failure sees the carrier's own bytes rather than an opinion:
  //   (1) the directive's value is a BINDING and not a literal — `§2.4` item `1` makes the manifest the
  //       SOURCE, so a value that is a token in the format string IS the hard-coded shape the clause refuses;
  //   (2) the path IS BUILT through `CARGO_MANIFEST_DIR` and carries `package.json` — `§6.1` item `7`'s
  //       ABSOLUTE path built from `CARGO_MANIFEST_DIR`;
  //   (3) the path IS READ — `§2.4` item `1`'s "READS `bindings/js/package.json`'s `version` ITSELF", so a
  //       script that never reads the manifest cannot stand here whatever it prints;
  //   (4) the value PRINTED is DERIVED FROM THAT READ — **AND FROM THAT READ ALONE** (`S1`'s correction:
  //       the manifest read's own content binding must be the one the printed value consumes, and NO
  //       read of a different file may be consumed at all);
  //   (5) that derivation passes through an extraction over the manifest's own bytes — the `version` FIELD
  //       is the thing `§6.10` item `1` names, and the value is reached through the `CARGO_MANIFEST_DIR`
  //       path itself.
  // Where any of them is not satisfied the assertion says so rather than passing silently.
  assert.ok(DIRECTIVE.valueExpression !== null && DIRECTIVE.valueExpression !== '',
    '`release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`: the directive\'s value '
    + `must be DERIVED (a binding printed into the directive), not a literal token in the format string — a `
    + `literal is the HARD-CODED shape the clause refuses; what the reader found was `
    + `${JSON.stringify(DIRECTIVE.valueExpression)}`);
  assert.ok(DIRECTIVE.manifestPathExpression,
    '`release.md §2.4` item `1`: the manifest\'s path must be BUILT from `CARGO_MANIFEST_DIR` AND carry the '
    + `manifest file \`${MANIFEST_REL_TO_CRATE}\`; the path expressions read were `
    + `${JSON.stringify([DIRECTIVE.valueExpression, DIRECTIVE.manifestPathExpression].filter((x) => x !== null))}`);
  assert.ok(DIRECTIVE.manifestReadExpression,
    '`release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`: the build script must '
    + 'READ the manifest ITSELF — a script that reads nothing from the `CARGO_MANIFEST_DIR`-built path cannot '
    + `satisfy the clause whatever it prints; the read found was ${JSON.stringify(DIRECTIVE.manifestReadExpression)}`);
  // **⟶ PART (4) IS CORRECTED, DATED THIS PASS (`S1`), AND THE DEFECT IT CLOSED IS NAMED IN ITS OWN
  // TERMS: what stood here was `contentNames.some((id) => \b id \b.test(valueResolvedText))` — ANY
  // identifier bound by ANY `let X = fs::read…` in the file, appearing ANYWHERE in the resolved emission
  // text.** *"Anywhere"* is the whole of it: a name that survives anywhere in a several-hop expansion is
  // not the name the printed value is taken from, so **A CARRIER THAT READS `package.json` AND A SECOND
  // FILE AND PRINTS A VALUE TAKEN FROM THE SECOND READ PASSED ALL FOUR PARTS** while `release.md §2.4`
  // item `1` (`THE MANIFEST IS THE STAMP'S SOURCE`) was violated. **THE CORRECTION KEEPS THE SUBJECT AND
  // MOVES THE TEST TO THE RELATION THE CLAUSE STATES:** the read content that must be consumed is THE
  // MANIFEST READ'S OWN (`manifestReads`), and NO OTHER READ'S CONTENT MAY BE CONSUMED AT ALL
  // (`noForeignReadConsumed`). Both are decided by `carrierRelation` above — the SAME relation the
  // falsifier battery below drives seven carrier shapes through, so the correction is MEASURED rather
  // than asserted.
  const RELATION = carrierRelation(BUILD_RS_CODE);
  assert.equal(RELATION.parts.derivedFromManifest, true,
    '`release.md §2.4` item `1`: the value the carrier PRINTS must be DERIVED FROM THE MANIFEST IT READ — '
    + `the printed binding \`${DIRECTIVE.valueExpression}\` must consume the content the MANIFEST read `
    + `returned (\`${RELATION.manifestReads.map((r) => r.name).join('`, `') || '(no manifest read stands in the file)'}\`)`
    + `, and not merely a name that stands somewhere in the expansion (the reads found were `
    + `${JSON.stringify(RELATION.reads.map((r) => ({ name: r.name, manifest: r.isManifest })))}); a value taken `
    + 'from any other source is the refused form');
  assert.equal(RELATION.parts.noForeignReadConsumed, true,
    '`release.md §2.4` item `1` — **THE CLAUSE THIS CELL COULD NOT DECIDE BEFORE THIS PASS**: the stamp\'s '
    + 'source is THE MANIFEST, so a carrier that keeps the manifest read standing and prints a value taken '
    + 'from a SECOND read is the refused form; the foreign read content this value consumes is '
    + `${JSON.stringify(RELATION.foreignConsumed)} of the reads ${JSON.stringify(RELATION.foreignReads.map((r) => r.name))}`
    + ' (the pre-correction discriminator, which asked only whether SOME read was named anywhere, answered '
    + `\`derived=${RELATION.legacyDerived}\` for this very carrier)`);
  assert.ok(BuildRsExtraction.test(DIRECTIVE.valueResolvedText),
    '`docs/specs/storeroom-js/package.md §6.1` item `2` read with `release.md §6.10` item `1`: the value must be '
    + 'EXTRACTED FROM THE MANIFEST\'S OWN BYTES — the `version` FIELD is the thing the clause names as the '
    + 'stamp\'s source — so the printed binding must perform an extraction over the read content rather than '
    + `merely naming it; the binding read was \`${DIRECTIVE.valueExpression}\``);
  assert.equal(DIRECTIVE.viaManifestDir, true,
    '`§5.0a`: the manifest the carrier reads is the CARGO_MANIFEST_DIR-built path, and the value must be '
    + `reached through it (the expression was \`${DIRECTIVE.valueExpression ?? '(absent)'}\`)`);
  assert.ok(DIRECTIVE.viaManifestFile, 'and that path carries the manifest file itself (`package.json` beside the crate)');
  assert.ok(FACADE_RS_CODE.includes(`option_env!("${DIRECTIVE_NAME}")`),
    `\`§1.4a\` item \`3\`: the self-report must READ the directive through \`option_env!(\"${DIRECTIVE_NAME}\")\`; `
    + '`env!` on an unset variable is a COMPILE error and could never fall back');
  assert.ok(/env!\("CARGO_PKG_VERSION"\)/.test(FACADE_RS_CODE),
    '`§1.4a` item `3` / `A96`: `env!("CARGO_PKG_VERSION")` is the value taken on `option_env!`\'s `None` arm');
});

// =============================================================================================
// P-PUB-9::S-STAMP — THE FALSIFIER BATTERY: EIGHT CARRIER SHAPES, EACH DRIVEN THROUGH THE SAME
// RELATION, WITH THE PRE-CORRECTION DISCRIMINATOR'S OWN ANSWER PRINTED BESIDE IT
// =============================================================================================
// **WHY THIS CELL EXISTS, IN THE TERMS OF THE DEFECT IT CLOSES (`S1`):** the relation asserted above was,
// before this pass, decidable over the ONE carrier standing in this tree, so **WHAT IT SEPARATED COULD
// NOT BE EXHIBITED AT ALL** — a shape it failed to refuse was invisible by construction. This cell
// carries eight shapes: the real carrier as a PRESENT CONTROL, six shapes a prior pass built (five
// correct refusals and one lawful carrier, so the battery is not one that refuses everything), **AND THE
// MEMBER THAT WAS MISSING — a carrier that KEEPS A MANIFEST READ STANDING AND PRINTS A VALUE TAKEN FROM
// A DIFFERENT SOURCE** (`B7`). Every member is driven through BOTH discriminators: the corrected relation
// (`carrierRelation`) and the test it replaced (`legacy: true`), which is the only way to show
// a hole was closed rather than to assert that it was.
//
// **`B7`'S SHAPE IS NAMED SO IT IS NOT READ AS A CARRIER INVENTED TO BEAT AN INSTRUMENT**: the manifest is
// read, the read STANDS and is USED (it gates an empty-manifest panic), and the version printed into the
// directive is taken from a SECOND read — `package.json.bak`, the second source `S3` names — reached
// through the same `CARGO_MANIFEST_DIR`-built path. **`B8` is the same shape with a second source that does
// not carry the manifest's name, and it is carried BESIDE `B7` so that `B7`'s admission by the old
// discriminator is not mistaken for the choice of a convenient file name**: the two members differ in ONE
// free parameter, and their refusal reasons are printed side by side.
//
// **AND THE INSTRUMENT IS A SOURCE READ OF EIGHT SYNTHETIC CARRIERS THAT LIVE IN THIS FILE'S OWN TEXT**:
// no byte of the repository is read for a member, no synthetic carrier is written anywhere, and the
// carriers are spelled from `release.md §2.4` item `1`, `docs/specs/storeroom-js/package.md §6.1` item `2`
// and this file's own declared state list (`(c1)`–`(c4)`) — never from the carrier standing in the tree.
test('P-PUB-9::S-STAMP THE FALSIFIER BATTERY — eight carrier shapes; the shape that broke the LINK (a standing manifest read, a value from a SECOND read) is REFUSED by the correction and was ADMITTED by the test it replaced', () => {
  const CARRIERS = [
    {
      id: 'B0', shape: 'THE REAL CARRIER — the present control, so a relation that refuses everything is not mistaken for a strong one',
      expectLegacy: 'ADMITTED', expectCorrected: 'ADMITTED', source: BUILD_RS_CODE,
    },
    {
      id: 'B1', shape: 'the lawful relation with ONE HOP REMOVED: the manifest is read through `CARGO_MANIFEST_DIR`, the value is extracted from THAT read',
      expectLegacy: 'ADMITTED', expectCorrected: 'ADMITTED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed={manifest}/package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let tail = declared.rsplit(r#""version""#).next().expect("version");
    let rest = tail.split_once(':').expect("key").1;
    let start = rest.find('"').expect("json string");
    let end = rest[start + 1..].find('"').expect("terminated");
    let version = &rest[start + 1..start + 1 + end];
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B2', shape: 'A HARD-CODED EMITTER: no read at all, the version a literal in the format string',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION=0.1.1");
}
`,
    },
    {
      id: 'B3', shape: 'THE MANIFEST IS READ, THE VALUE IS A LITERAL — the read is present and the printed value is not from it',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = "0.1.1";
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B4', shape: 'A DIFFERENT FILE and NO `CARGO_MANIFEST_DIR`: a relative `Cargo.toml`, the crate\'s own manifest',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let declared = fs::read_to_string("Cargo.toml").expect("readable");
    let version = declared.lines().next().unwrap_or("0.1.1");
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B5', shape: 'NO `CARGO_MANIFEST_DIR`: the path is built from a directory variable the clause does not name',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("SOME_OTHER_DIR").expect("set");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = declared.trim();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B6', shape: 'AN AMBIENT VARIABLE AS THE VALUE: the manifest is read and the value comes from outside the build',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = env::var("RELEASE_VERSION").expect("set");
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B7', shape: '**THE MISSING MEMBER** — THE MANIFEST READ STANDS AND IS USED, AND THE VERSION PRINTED IS TAKEN FROM A SECOND READ of another file (`package.json.bak`) reached through the SAME `CARGO_MANIFEST_DIR`-built path',
      expectLegacy: 'ADMITTED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed={manifest}/package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let other = fs::read_to_string(format!("{manifest}/package.json.bak")).expect("readable");
    if declared.is_empty() { panic!("the manifest read returned nothing"); }
    let version = other.rsplit(r#""version""#).next().expect("version");
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'B8', shape: 'the SAME shape as `B7` with ONE free parameter moved: the second source does not carry the manifest\'s name (`version.txt`) — carried so `B7` is not read as a file name chosen to fit an instrument',
      expectLegacy: 'REFUSED', expectCorrected: 'REFUSED',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let other = fs::read_to_string(format!("{manifest}/version.txt")).expect("readable");
    if declared.is_empty() { panic!("the manifest read returned nothing"); }
    let version = other.rsplit(r#""version""#).next().expect("version");
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
  ];
  const rows = [];
  const mismatched = [];
  const verdict = (r) => (r.refused ? 'REFUSED' : 'ADMITTED');
  for (const c of CARRIERS) {
    const legacy = carrierRelation(c.source, { legacy: true });
    const corrected = carrierRelation(c.source);
    rows.push(`${c.id} legacy=${verdict(legacy)} corrected=${verdict(corrected)} `
      + `legacyRefusedBy=[${legacy.refusedBy.join(', ')}] correctedRefusedBy=[${corrected.refusedBy.join(', ')}] `
      + `reads=${JSON.stringify(corrected.reads.map((r) => ({ name: r.name, manifest: r.isManifest })))} `
      + `legacyDerivation=${legacy.legacyDerived} valueReachable=[${(corrected.directive
        && corrected.directive.valueReachableIdents || []).slice(0, 12).join(', ')}] :: ${c.shape}`);
    if (verdict(legacy) !== c.expectLegacy) {
      mismatched.push(`${c.id}: the PRE-CORRECTION discriminator answered ${verdict(legacy)} where the battery records ${c.expectLegacy}`);
    }
    if (verdict(corrected) !== c.expectCorrected) {
      mismatched.push(`${c.id}: the CORRECTED relation answered ${verdict(corrected)} where the battery records ${c.expectCorrected} (refused by [${corrected.refusedBy.join(', ')}])`);
    }
  }
  // eslint-disable-next-line no-console
  for (const row of rows) console.log(`[version-stamp falsifier battery] ${row}`);
  assert.deepEqual(mismatched, [],
    '`release.md §2.4` item `1` — each shape the battery declares must be answered as the clause answers it, and '
    + 'the answer must be PRINTED with the parts that carried it; the mismatches were: ' + JSON.stringify(mismatched));
  // **THE DEMONSTRATION, ASSERTED IN ITS OWN TERMS RATHER THAN LEFT TO THE TABLE**: `B7` is the shape that
  // broke the LINK between the read and the emission, it was ADMITTED by the test this pass replaced, and it
  // is REFUSED by the corrected relation — refused on the clause's own subject (the value is not derived
  // from the manifest read) and on the clause's own prohibition (a foreign read's content is consumed).
  const missing = carrierRelation(CARRIERS.find((c) => c.id === 'B7').source);
  const missingLegacy = carrierRelation(CARRIERS.find((c) => c.id === 'B7').source, { legacy: true });
  assert.equal(missingLegacy.refused, false,
    '`S1`: the pre-correction relation must be SHOWN to admit the member that breaks the link — a battery member '
    + 'the old test already refused would prove nothing about the correction; it refused on '
    + `[${missingLegacy.refusedBy.join(', ')}] instead`);
  assert.equal(missing.refused, true,
    '`S1`: the corrected relation must REFUSE the shape that keeps a manifest read standing and prints a value '
    + 'taken from a SECOND read (`release.md §2.4` item `1`)');
  assert.ok(missing.refusedBy.includes('derivedFromManifest'),
    'and it must refuse it ON THE CLAUSE\'S OWN SUBJECT — the value is not derived from the manifest read; '
    + `the failing parts were [${missing.refusedBy.join(', ')}]`);
  assert.ok(missing.refusedBy.includes('noForeignReadConsumed'),
    'and on the clause\'s own prohibition — the printed value consumes the content of a read of a DIFFERENT '
    + `file; the foreign content consumed was ${JSON.stringify(missing.foreignConsumed)}`);
  // **AND ONE PART IS PINNED BY NAME, BECAUSE A CHANGE TO THE INSTRUMENT'S OWN RETURN SHAPE WEAKENED IT IN
  // THIS VERY PASS AND THE VERDICTS DID NOT NOTICE** (`B2`): `emitted` was decided as *"the reader did not
  // answer `null`"*, and `S3` made the reader report the trigger facts of a carrier that prints NO
  // directive — so the part silently became TRUE for the hard-coded emitter, which prints nothing the
  // reader matches. **A VERDICT-ONLY BATTERY CANNOT SEE A PART WEAKENED WHILE OTHERS STILL FAIL**, so the
  // battery also asserts the part.
  const noEmit = carrierRelation(CARRIERS.find((c) => c.id === 'B2').source);
  assert.ok(noEmit.refusedBy.includes('emitted'),
    'part `emitted`: a carrier with no `cargo:rustc-env` line at all must be refused ON THAT PART, whatever '
    + `else it does; the parts that failed were [${noEmit.refusedBy.join(', ')}]`);
  // **AND THE REAL CARRIER IS RE-ASSERTED THROUGH THE SAME OBJECT THE BATTERY USES**, so the eight rows and
  // the cell above cannot drift apart: the relation admits exactly the carriers `§2.4` item `1` admits.
  assert.equal(carrierRelation(BUILD_RS_CODE).refused, false,
    '`release.md §2.4` item `1`: the carrier standing in this tree must satisfy the SAME relation the eight '
    + 'battery rows were decided by — the battery is not a second instrument');
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

// =============================================================================================
// THE BUILT ARTEFACT, DRIVEN THROUGH ITS OWN `version()` — ONE INSTRUMENT, USED BY BOTH CELLS
// THAT ASK FOR IT (the invariant cell below, and the property layer's ARTEFACT row)
// =============================================================================================
// **WHY THIS IS ONE FUNCTION AND NOT TWO (`S5`, THIS PASS'S OWN FINDING, AND THE DEFECT IS NAMED IN WHAT
// STOOD HERE):** the property layer reported the single row `P-PUB-9 strategy=S-VERSION attempts=24 …
// verdict=HELD` while that row's artefact was a COMPOSED FAKE, and the one cell that drives the REAL
// artefact returned early whenever the artefact was absent — so **the layer's only figure for the clause
// this unit bears on was taken from a subject the clause does not name, and stood `HELD` on a tree where
// the subject had been SKIPPED.** The composed fake keeps its own identity below (`P-PUB-4`'s `S-VERSION`,
// whose subject it really is: the rung-one read's refusal — `PUB-DD-18` guards rung one alone). **THE ROW
// ABOUT THE ARTEFACT IS NOW TAKEN FROM THIS FUNCTION AND FROM NOTHING ELSE**, so its figure and the
// invariant cannot be about different things, and the artefact's absence is a NAMED STATE in the census
// rather than a green row.
const BUILT_ARTEFACT = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/** Drives the host target's own build as RUNG TWO — which is what a released install does and what the
 *  local in-place loop already resolves through (`distribution.md §3.1`: *"NO BINARY IS EVER COMMITTED"*, so
 *  the file is a gitignored build product) — and returns the artefact's own answer. **ABSENCE IS RETURNED AS
 *  A STATE AND IS NEVER CONVERTED INTO A PASS**: the caller decides whether it skips (the invariant cell,
 *  which cannot assert what it cannot load) or reports the row as `SKIPPED-ARTEFACT-ABSENT` (the property
 *  layer, which must not report a figure for a subject that was not driven). */
function driveBuiltArtefact() {
  if (!existsSync(BUILT_ARTEFACT)) return { present: false, built: BUILT_ARTEFACT, report: null };
  const env = makeEnv({ label: 'built-artefact', versionValue: 'null' });
  const rungTwoDir = join(env.dir, 'build', 'Release');
  mkdirSync(rungTwoDir, { recursive: true });
  writeFileSync(join(rungTwoDir, 'storeroom_js_binding.node'), readFileSync(BUILT_ARTEFACT));
  rmSync(join(env.dir, 'node_modules'), { recursive: true, force: true }); // rung one absent → rung two answers
  return { present: true, built: BUILT_ARTEFACT, report: drive(env) };
}

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
  // **⟶ AND THE DRIVE ITSELF NOW SITS IN ONE PLACE (`driveBuiltArtefact`, above), WHICH IS THIS PASS'S `S5`
  // CORRECTION**: the property layer's row for this clause is taken from the SAME call, so the skip here
  // and the figure there can no longer be about different subjects.
  // **THE ABSENCE IS REPORTED AS A SKIP WITH ITS REASON AND NEVER AS A PASS.** A clean clone has no
  // artefact (`A68`'s build is `Q3`'s and this gate runs no `cargo`), and the released artefact's own
  // answer is the guard's observable at the leg (`§1.4a` items `2` and `8`) — so this cell is the red
  // set's artefact-side member where a build exists, and its absence is a named skip where none does.
  // **AND THE PROPERTY LAYER'S ROW FOR THIS CLAUSE IS TAKEN FROM THE SAME CALL** (`driveBuiltArtefact`,
  // `S5`), so the skip here and the row there report the SAME state of the SAME file.
  const DRIVEN = driveBuiltArtefact();
  if (!DRIVEN.present) {
    console.log('[version-stamp] SKIP P-PUB-9::S-VERSION the built artefact cell — no artefact at '
      + `${DRIVEN.built}: the tracked tree carries no binary (distribution.md §3.1), and the released artefact's own `
      + 'answer is the guard\'s observable at the RUN (§1.4a item 8). REBUILD TO MAKE THIS CELL ACTIVE.');
    return;
  }
  const r = DRIVEN.report;
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
  // **⟶ AND THE TWO PREDICATES ARE TIGHTENED TO THE CLAUSE'S OWN REQUIREMENT, DATED THIS PASS (`S3`), AND
  // THE DEFECT IS NAMED IN THE TERMS OF WHAT STOOD HERE:** the changed-trigger test was
  // `p.includes(slot) || p.includes('package.json')` and the env-trigger test was
  // `n === DIRECTIVE_NAME || n === slot`. **BOTH WERE SUBSTRING (OR SLOT-NAME) TESTS**, so
  // `cargo:rerun-if-changed=package.json.bak`, a RELATIVE `cargo:rerun-if-changed=package.json`, a path
  // built from a directory other than the manifest's, and a trigger naming the printed SLOT instead of the
  // directive each SATISFIED the member that exists to close the warm-`target/` hazard WHILE THE HAZARD
  // STOOD OPEN. **THE CLAUSE ASKS FOR THREE FACTS AND THIS CELL NOW DECIDES THOSE THREE**: an ABSOLUTE path
  // BUILT FROM `CARGO_MANIFEST_DIR`, NAMING THE MANIFEST (`docs/specs/storeroom-js/package.md §6.1` item
  // `7`), plus `cargo:rerun-if-env-changed` FOR THE DIRECTIVE'S OWN NAME (`§5.0a`'s falsifier). The
  // corrected decision lives in `reRunTriggers` above, and the four red inputs are driven through it by
  // the battery cell below.
  const TRIGGERS = reRunTriggers(BUILD_RS_CODE);
  // **THE PRESENT CONTROL, SO A BROKEN INSTRUMENT IS CAUGHT BEFORE ITS FINDING IS BELIEVED**: the file
  // already declares `cargo:rerun-if-changed=build.rs`, so a search that found NOTHING would be shown to
  // be broken by this very assertion — and it is also the clause's own "plus" of a second member.
  assert.ok(TRIGGERS.changed.includes('build.rs'),
    `the re-run trigger instrument WORKS: \`build.rs\` already emits \`cargo:rerun-if-changed=build.rs\`, so this `
    + `search cannot be silently broken; what it returned was ${JSON.stringify(TRIGGERS.changed)}`);
  assert.equal(TRIGGERS.manifestOk, true,
    '`§5.0a` / `docs/specs/storeroom-js/package.md §6.1` item `7`: the carrier must declare '
    + '`cargo:rerun-if-changed` ON THE MANIFEST IT READS — an ABSOLUTE path BUILT FROM `CARGO_MANIFEST_DIR` '
    + 'and NAMING the manifest — or a warm `target/` re-emits a STALE stamp and the artefact ships the '
    + 'previous version. **A SUBSTRING TEST IS NOT THIS TEST**: `package.json.bak`, a relative '
    + '`package.json`, and a path built from another directory are each admitted by a substring test and '
    + `each leaves the hazard open; the triggers found were ${JSON.stringify(TRIGGERS.changed)}, of them the `
    + `manifest-dir-built ones were ${JSON.stringify(TRIGGERS.manifestHits)}, and the identifiers built from `
    + `\`CARGO_MANIFEST_DIR\` were ${JSON.stringify(TRIGGERS.dirBuilt)}`);
  assert.equal(TRIGGERS.envOk, true,
    `\`§5.0a\`: and \`cargo:rerun-if-env-changed\` FOR THE DIRECTIVE'S NAME (\`${DIRECTIVE_NAME}\`), `
    + 'CHARACTER FOR CHARACTER — the printed SLOT is a binding\'s name and is NOT the directive\'s name, so '
    + `it does not satisfy this member; triggers found: ${JSON.stringify(TRIGGERS.envChanged)}`);
});

// =============================================================================================
// P-PUB-9::S-STAMP — THE RE-RUN TRIGGER'S OWN FALSIFIER BATTERY: four red declarations the
// SUBSTRING test admitted and the corrected test refuses, with the real declaration beside them
// =============================================================================================
// **THE FOUR RED INPUTS ARE THE DEFECT'S OWN EXAMPLES, NAMED BY THE CLAUSE THEY BREACH** (`S3`): a
// `package.json.bak` (which CONTAINS the manifest's name), a RELATIVE `package.json` (which contains it
// exactly and is not an absolute path built from `CARGO_MANIFEST_DIR`), a path BUILT FROM A DIRECTORY THE
// CLAUSE DOES NOT NAME, and a trigger naming the printed SLOT rather than the directive. **EACH SATISFIED
// THE TEST THAT STOOD HERE WHILE THE WARM-`target/` HAZARD IT EXISTS TO CLOSE STOOD OPEN** — which is the
// whole reason `docs/specs/storeroom-js/package.md §6.1` item `7` asks for *"an ABSOLUTE path built from
// `CARGO_MANIFEST_DIR`"* and `§5.0a`'s falsifier asks for `cargo:rerun-if-env-changed` *"FOR THE
// DIRECTIVE'S NAME"* rather than for a name that contains it.
test('P-PUB-9::S-STAMP THE RE-RUN TRIGGER BATTERY — the real declaration is admitted by both tests, and the four red declarations the substring test admitted are refused by the corrected one', () => {
  const CARRIERS = [
    {
      id: 'T-real', expect: { legacy: { changed: true, env: true }, corrected: { changed: true, env: true } },
      shape: 'THE DECLARATION THE CLAUSE ASKS FOR, spelled from `§6.1` item `7` itself and NOT from the file in the tree: ABSOLUTE, built from `CARGO_MANIFEST_DIR`, naming the manifest, with `cargo:rerun-if-env-changed` for the directive — and it prints NO directive, so the trigger relation is exercised on a carrier the directive reader returns nothing for',
      source: `use std::env;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed={manifest}/package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
}
`,
    },
    {
      id: 'T-bak', expect: { legacy: { changed: true, env: true }, corrected: { changed: false, env: true } },
      shape: '`cargo:rerun-if-changed=package.json.bak` — the manifest\'s name is a SUBSTRING of it, and the file the build reads is NOT the file the trigger watches',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed=package.json.bak");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = declared.trim();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'T-relative', expect: { legacy: { changed: true, env: true }, corrected: { changed: false, env: true } },
      shape: '`cargo:rerun-if-changed=package.json` — the manifest\'s name EXACTLY and a RELATIVE path, which cargo resolves against the build script\'s own working directory and not against the manifest directory the clause names',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed=package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = declared.trim();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'T-otherdir', expect: { legacy: { changed: true, env: true }, corrected: { changed: false, env: true } },
      shape: '`cargo:rerun-if-changed={other}/package.json` where `other` is built from a directory the clause does not name — the manifest\'s name stands in the path and the path is not the one the build reads',
      source: `use std::env; use std::fs;
fn main() {
    let other = env::var("SOME_OTHER_DIR").expect("set");
    println!("cargo:rerun-if-changed={other}/package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    let declared = fs::read_to_string(format!("{other}/package.json")).expect("readable");
    let version = declared.trim();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
    {
      id: 'T-slot', expect: { legacy: { changed: true, env: true }, corrected: { changed: true, env: false } },
      shape: '`cargo:rerun-if-env-changed=version` — THE PRINTED SLOT\'S OWN NAME, which the pre-correction test admitted through its `n === DIRECTIVE.slot` branch, and which is NOT the directive\'s name',
      source: `use std::env; use std::fs;
fn main() {
    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set");
    println!("cargo:rerun-if-changed={manifest}/package.json");
    println!("cargo:rerun-if-env-changed=version");
    let declared = fs::read_to_string(format!("{manifest}/package.json")).expect("readable");
    let version = declared.trim();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");
}
`,
    },
  ];
  const rows = [];
  const mismatched = [];
  for (const c of CARRIERS) {
    const legacy = reRunTriggers(c.source, { legacySubstring: true });
    const corrected = reRunTriggers(c.source);
    rows.push(`${c.id} legacy{changed=${legacy.manifestOk},env=${legacy.envOk}} `
      + `corrected{changed=${corrected.manifestOk},env=${corrected.envOk}} `
      + `correctedManifestHits=${JSON.stringify(corrected.manifestHits)} `
      + `correctedEnvHits=${JSON.stringify(corrected.envHits)} dirBuilt=${JSON.stringify(corrected.dirBuilt)} :: ${c.shape}`);
    if (legacy.manifestOk !== c.expect.legacy.changed || legacy.envOk !== c.expect.legacy.env) {
      mismatched.push(`${c.id}: the PRE-CORRECTION test answered {changed=${legacy.manifestOk}, env=${legacy.envOk}} `
        + `where the battery records ${JSON.stringify(c.expect.legacy)}`);
    }
    if (corrected.manifestOk !== c.expect.corrected.changed || corrected.envOk !== c.expect.corrected.env) {
      mismatched.push(`${c.id}: the CORRECTED test answered {changed=${corrected.manifestOk}, env=${corrected.envOk}} `
        + `where the battery records ${JSON.stringify(c.expect.corrected)}`);
    }
  }
  // eslint-disable-next-line no-console
  for (const row of rows) console.log(`[version-stamp re-run trigger battery] ${row}`);
  assert.deepEqual(mismatched, [],
    '`docs/specs/storeroom-js/package.md §6.1` item `7` read with `§5.0a`\'s falsifier: each declaration must be '
    + 'answered as the clause answers it; the mismatches were: ' + JSON.stringify(mismatched));
  // **AND THE TWO FACTS THE CORRECTION TURNS ON, ASSERTED BY NAME RATHER THAN LEFT IN THE TABLE**: the
  // substring test admitted every red declaration, and the corrected test refuses each one ON THE TERM IT
  // BREACHES — while still admitting the declaration the clause asks for. So the correction is a
  // TIGHTENING of one predicate and not a second spelling of the clause.
  for (const c of CARRIERS.filter((x) => x.id !== 'T-real')) {
    const legacy = reRunTriggers(c.source, { legacySubstring: true });
    assert.ok(legacy.manifestOk && legacy.envOk,
      `\`S3\`: \`${c.id}\` must be SHOWN to have satisfied the substring test that stood here — a red input the old `
      + 'test already refused would prove nothing about the correction; it was refused on the old test by '
      + `{changed=${legacy.manifestOk}, env=${legacy.envOk}}`);
    const corrected = reRunTriggers(c.source);
    assert.equal(corrected.manifestOk && corrected.envOk, false,
      `\`S3\`: the corrected test must REFUSE \`${c.id}\``);
  }
  assert.equal(reRunTriggers(BUILD_RS_CODE).manifestOk && reRunTriggers(BUILD_RS_CODE).envOk, true,
    '`S3`: and the declaration standing in this tree must pass the corrected test UNCHANGED — the correction '
    + 'tightens the predicate and does not re-spell the lawful carrier');
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

// **`note` IS OPTIONAL AND IS PRINTED AT THE ROW'S OWN END** — the census reads this table and nothing
// else, so a row whose subject needs naming in the terms of the clause (`S5`: *"the composed fake, whose
// subject is the rung-one READ's refusal"*) must carry that naming IN THE ROW. A note that were not
// printed here would be a claim the table cannot be read against.
function driveRow({ row, strategy, seedFor, attempts, attemptsPerRow, driveOne, note = null }) {
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
    + `verdict=${breaks === 0 ? 'HELD' : 'BROKEN'}${breaks >= MAX_FAILURES ? ' (stopped at the failure cap)' : ''}`
    + `${note === null ? '' : ` (${note})`}`);
  return { driven, breaks, failures };
}

const PROPERTY_ATTEMPTS = [];

test('P-PUB-9 property (S-STAMP) — THE ARTEFACT ROW: the row this unit bears on reports the BUILT ARTEFACT\'s own answer, or reports the state of a SKIPPED subject, and NEVER a figure from the composed fake', () => {
  // **THIS ROW IS THIS PASS'S `S5` CORRECTION AND IT IS STATED FIRST IN WHAT IT REPLACES.** The layer used
  // to carry ONE `P-PUB-9` row — `strategy=S-VERSION attempts=24 … verdict=HELD` — whose subject was a
  // COMPOSED FAKE: a `node_modules/`-shaped rung-one addon the cell writes itself, whose `version()`
  // returns whatever the cell told it to. **SO ON A TREE WITH NO ARTEFACT THE LAYER PRINTED `HELD` FOR A
  // CLAUSE WHOSE ONE REAL OBSERVABLE HAD BEEN SKIPPED**, and on a tree WITH the artefact the row still said
  // nothing about it. The clause `contract.md §5.0a` states about a RELEASED ARTEFACT — *"every released
  // native artefact's `version()` answers the main package manifest's `version` character for character"* —
  // has exactly ONE subject in this suite: the host build at `bindings/js/build/Release/…node`, driven as
  // rung two. **THAT SUBJECT IS DRIVEN HERE, THROUGH THE SAME `driveBuiltArtefact` CALL THE INVARIANT CELL
  // USES**, and the row reports WHICH STATE IT IS IN:
  //   PRESENT → `attempts=1 … verdict=HELD|BROKEN`, the artefact's own answer against the manifest's;
  //   ABSENT  → `attempts=0 … verdict=SKIPPED-ARTEFACT-ABSENT`, with the path in the row and the rebuild
  //             instruction beside it — **A SKIP IS NOT A PASS, WHICH IS THE WHOLE DEFECT BEING CLOSED.**
  // **AND IT IS NOT DRESSED AS A SAMPLE**: one artefact stands in a tree, so this row is a SINGLE-STATE
  // subject and says so, exactly as the `P-PUB-10` row says it is not expressible as a property. The
  // `24`-attempt `S-VERSION` row below is the composition, and it now reports under `P-PUB-4`, whose
  // subject — the rung-one version READ's refusal — it actually is (`PUB-DD-18`).
  const DRIVEN = driveBuiltArtefact();
  if (!DRIVEN.present) {
    PROPERTY_ATTEMPTS.push('P-PUB-9 strategy=S-STAMP attempts=0 breaks=0 verdict=SKIPPED-ARTEFACT-ABSENT '
      + `(subject: the host build \`${DRIVEN.built}\` — NO figure is reported for this clause, and the composed `
      + 'fake\'s counts are NOT substituted for it: a clean clone carries no binary (`distribution.md §3.1`) and '
      + 'this gate runs no `cargo`; REBUILD TO MAKE THIS ROW ACTIVE)');
    assert.ok(true, 'the row is REPORTED with its subject\'s state — a row that cannot say its subject was '
      + 'skipped is how a green figure gets read onto a clause nothing drove');
    return;
  }
  const answered = DRIVEN.report.version;
  const holds = answered === MANIFEST_VERSION;
  PROPERTY_ATTEMPTS.push(`P-PUB-9 strategy=S-STAMP attempts=1 breaks=${holds ? 0 : 1} `
    + `verdict=${holds ? 'HELD' : 'BROKEN'} (SINGLE-STATE SUBJECT and NOT a sample: the host build `
    + `\`${DRIVEN.built}\` driven as rung two — one artefact stands in a tree, so this row drives it instead `
    + `of many near-misses; the artefact answered \`${String(answered)}\`, the manifest declares `
    + `\`${MANIFEST_VERSION}\`)`);
  assert.equal(DRIVEN.report.error, null,
    `the artefact loaded at all (report: ${JSON.stringify(DRIVEN.report).slice(0, 300)})`);
  assert.equal(holds, true,
    '`contract.md §5.0a`: the artefact\'s own answer must BE the manifest\'s value — this is the row the unit '
    + `bears on, and the crate's own \`${CRATE_VERSION}\` here is \`DEF-19\` reproduced (\`§5.0a\`; \`A91\`)`);
});

test('P-PUB-4 property (S-VERSION) — THE COMPOSED FAKE, UNDER ITS OWN IDENTITY: the rung-one version READ\'s equality is EXACT, and every one-character-perturbed answer is refused', () => {
  // **THIS ROW IS THE COMPOSITION, AND IT IS RE-IDENTIFIED BECAUSE ITS OLD IDENTITY WAS A MIS-COMPOSITION
  // (`S5`, THIS PASS).** `contract.md §5.0a` states the equality as CHARACTER FOR CHARACTER, and its failure
  // list names *"an artefact whose stamped version differs from its own manifest's by ONE character"*. The
  // equality's exactness is therefore a property over the equivalence class of near-miss strings, and the
  // seed decides which member of that class each attempt drives — a `Math.random()` stream would make the
  // row unreproducible, which is why the seed is pinned and printed.
  //
  // **WHAT THIS ROW DOES NOT CLAIM, SAID IN THE TERMS OF WHAT IT REPORTS:** it previously reported as
  // `P-PUB-9 … verdict=HELD` with 24 attempts, and **THOSE 24 ATTEMPTS WERE TAKEN FROM A COMPOSED FAKE — a
  // rung-one addon written by the cell — so the figure stood for a subject the clause about the ARTEFACT
  // does not name.** The subject here is exactly the rung-one version read's refusal of a value it does not
  // match, which is `P-PUB-4`'s: `PUB-DD-18` fixes that *"THE VERSION READ GUARDS RUNG ONE ALONE"*, and
  // `PUB-DD-19` fixes the predicate as *"EXACT STRING INEQUALITY"*. The row is therefore **reported under
  // `P-PUB-4`**, the composed fake is not deleted (a cell removed to make a suite green is the failure this
  // unit exists to prevent) and its counts are not carried onto `P-PUB-9`. Its refusals are already in the
  // tree; it is expected `HELD` and is NOT the unit's red.
  const alpha = '0123456789.abc-+';
  const { breaks, driven, failures } = driveRow({
    row: 'P-PUB-4', strategy: 'S-VERSION', seedFor: SEED, attempts: PROPERTY_ATTEMPTS, attemptsPerRow: 24,
    note: 'THE COMPOSED FAKE, and its subject is named so no figure of it can be read onto `P-PUB-9`: each '
      + 'attempt writes a rung-one `node_modules/`-shaped addon whose `version()` is handed a perturbed string, '
      + 'so what is driven is the version READ\'s refusal of a value it does not match (`PUB-DD-18`: the read '
      + 'guards rung one alone; `PUB-DD-19`: the predicate is exact string inequality) — NOT the artefact\'s own '
      + 'answer, which only `P-PUB-9 strategy=S-STAMP` reports',
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
  // **⟶ AND THE GUARDS THAT MAKE `S5`'S CORRECTION HOLD IN THE CENSUS ITSELF, NOT ONLY IN THE CELLS THAT
  // FILL IT** (`S5`, this pass). A cell's own identity can be checked at the cell; **WHAT CANNOT BE CHECKED
  // THERE IS THE SUBSTITUTION — a figure taken from a composed fake printed under the row about the
  // artefact — because that fault is a fact about the TABLE.** So:
  const rowNine = PROPERTY_ATTEMPTS.filter((l) => l.startsWith('P-PUB-9'));
  assert.ok(rowNine.some((l) => /artefact/i.test(l)),
    'the `P-PUB-9` row must NAME THE ARTEFACT AS ITS SUBJECT — the clause `contract.md §5.0a` is about a '
    + `released artefact, so a row that does not name one is a row about something else; the rows were ${JSON.stringify(rowNine)}`);
  assert.ok(rowNine.every((l) => /strategy=S-STAMP/.test(l)),
    'every `P-PUB-9` row must be THE ARTEFACT ROW — the `S-STAMP` strategy, whose subject is the built '
    + `artefact; the rows were ${JSON.stringify(rowNine)}`);
  assert.ok(rowNine.every((l) => !/strategy=S-VERSION/.test(l)),
    'and NO `P-PUB-9` row may BE the COMPOSED FAKE\'s row (`strategy=S-VERSION`): a fake\'s `HELD` printed '
    + 'under the row about the artefact is precisely the mis-composition this pass removes. **THE GUARD IS '
    + 'ON THE ROW\'S STRATEGY AND NOT ON A WORD**, because the artefact row must remain free to SAY that '
    + `the fake\'s counts are not substituted for it; the rows were ${JSON.stringify(rowNine)}`);
  assert.ok(rowNine.some((l) => /verdict=(HELD|BROKEN|SKIPPED-ARTEFACT-ABSENT)/.test(l)),
    'and the row must report a verdict for a subject that was DRIVEN, or the named SKIPPED state of a subject '
    + 'that was not — `un-run` and `silently-skipped` are both failures');
  assert.ok(PROPERTY_ATTEMPTS.some((l) => /composed fake/i.test(l)),
    'and the composed fake is REPORTED under its own identity rather than deleted — a cell removed to make a '
    + 'suite green is the failure this unit exists to prevent');
  assert.ok(PROPERTY_ATTEMPTS.some((l) => l.startsWith('P-PUB-4') && /composed fake/i.test(l)),
    'and it reports under `P-PUB-4`, whose subject it is: the rung-one version READ\'s refusal (`PUB-DD-18`)');
});
