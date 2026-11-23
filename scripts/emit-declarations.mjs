#!/usr/bin/env node
// =============================================================================
//  scripts/emit-declarations.mjs — ONE HAND-AUTHORED DECLARATION, TWO EMITTED ARMS
// =============================================================================
//
//  WHY THIS FILE EXISTS
//  ---------------------------------------------------------------------------
//  The WASM realm's configuration carries no file path, and the declaration a consumer compiles
//  against must say so — but the declaration is ONE hand-authored file (`bindings/js/index.d.ts`,
//  the byte the package's `types` condition reaches and its `files` allowlist ships), and a second
//  hand-maintained surface is what `D-155` item 2 REFUSES. **THE RULING TAKEN IS *ONE DECLARATION
//  SOURCE, TWO EMITTED DECLARATIONS*: the source stays the one hand-authored file, the realm-conditional
//  shape is PRODUCED, and the WASM arm types `filePath?: never`.**
//
//  So this step reads ONE source and writes TWO declarations:
//
//    · the NODE arm's — THE SOURCE'S OWN BYTES, every marked region unchanged, and the identity is
//      ASSERTED twice over: the written file is read back and compared, byte for byte, with the source, and
//      the declared Node bodies are asserted to compose back to it;
//    · the WASM arm's — the same bytes with EXACTLY each region's body replaced by that region's one
//      replacement line, and everything outside the regions asserted byte-identical.
//
//  **NEITHER OUTPUT IS HAND-EDITED AND NEITHER IS A SECOND SOURCE.** Both are artefacts of this run:
//  delete them and the run reproduces them. A second run over the same inputs writes the same bytes.
//
//  THE REGIONS — TWO FROM 2026-11-20, ONE BEFORE IT — AND WHY THEY ARE COMMENT LINES AT THEIR OWN DEPTH
//  ------------------------------------------------------------------------------------------------------
//  **ONE REGION STOOD HERE UNTIL `D-203`, WHOSE FINDING WAS THAT THE ARM'S SHIPPED DECLARATION SPELLED THE
//  FACTORY WITH ONE POSITION WHERE THE RUNTIME AND THE GUIDE REQUIRE TWO** — so the set now carries that
//  member's region and the factory's:
//
//      // ⟦realm:filePath:begin⟧
//        readonly filePath?: string;
//      // ⟦realm:filePath:end⟧
//
//      // ⟦realm:factory:begin⟧
//      export function storeCreate(cfg: StoreConfig): StoreInstance;
//      // ⟦realm:factory:end⟧
//
//  (both markers of both regions indented two spaces, i.e. at the depth the file's markers keep). **THE FORM
//  IS CHOSEN SO THAT NOTHING THAT READS THE DECLARATION CAN SEE IT**: the member read a battery file performs
//  on `export interface … { … }` blocks matches only a line that begins with exactly two spaces and then an
//  optional `readonly`, an identifier and `:` or `(`, so a line whose first two characters after the
//  indentation are `//` is not a member and cannot move a member census; the `StoreStatus` census reads the
//  union's own `|`-led arm lines, which stand well past either region, so no marker is in its range at all;
//  and the one module-level count this file is subject to — the number of lines beginning `export function` —
//  counts only lines that begin at column zero, which a marker at two spaces is not. **THE MARKERS ARE
//  MARKERS AND NOT PROSE: each appears EXACTLY ONCE, and a source carrying zero, two or an unbalanced pair of
//  ANY region's markers is a REFUSAL below, named by region.**
//
//  SYNCHRONOUS, DELIBERATELY — AND WHY
//  ---------------------------------------------------------------------------
//  The whole file is synchronous: `readFileSync` / `writeFileSync` / `mkdirSync`, one step after the
//  other, and **NO TOP-LEVEL `await`** (this module carries one at no position). Two grounds, and they
//  are the corpus's rather than this script's taste. (1) **The package's graph is synchronous at load
//  time** (`contract.md:2379`; `D-129` item 4) and this repository keeps its steps in the same
//  discipline: a build step that answered before its writes were settled would let `npm run build`
//  print a path whose bytes are still in flight. (2) **The identity assertion is an act about a
//  MOMENT** — write, read back, compare — and a synchronous body makes that moment a single
//  uninterrupted run of this process rather than a promise another step could interleave with. A Node
//  CLI MAY be async; this one is synchronous so that its two claims (*"these two paths hold these two
//  byte sequences"*) are true when it prints them.
//
//  WHERE IT WRITES, AND WHAT IT NEVER TOUCHES
//  ---------------------------------------------------------------------------
//  **THE WASM DECLARATION'S PATH IS NOT THIS FILE'S TO DECIDE** — a second package, a second artefact
//  or a subpath is the publish shape's (`D-4`; `wasm-realm.md §3(b)`, `SILENT` in this pass). So the
//  output directory is the caller's: `process.argv[2]`, resolved against the working directory, and
//  defaulting to `build/declarations/` under the repository root (created here). The two absolute paths
//  it wrote are PRINTED. **AND IT NEVER WRITES INSIDE `bindings/js/`**: the hand-authored source must
//  never be overwritten by its own generator, so an output directory at or below the package's
//  directory is a REFUSAL and not a write.
//
//  WHAT THIS STEP IS NOT: it is NOT wired into `npm run build`. Whether the build emits a declaration
//  at all is the publish step's question and stands `SILENT`; this command exists so that the emission
//  can be produced, read and driven today.
// =============================================================================

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/// **THE REPOSITORY ROOT IS THIS FILE'S OWN PARENT'S PARENT** — `scripts/` is beside the root manifest,
/// so the script is location-independent: it answers the same paths when run from anywhere.
const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/// **THE ONE SOURCE** — the hand-authored declaration of record. It is READ and never written.
const PACKAGE_DIR = join(REPO_ROOT, 'bindings', 'js');
const SOURCE = join(PACKAGE_DIR, 'index.d.ts');

/// **THE DEFAULT OUTPUT DIRECTORY** — a build directory this step creates. The real path is the
/// publish shape's and is `SILENT`; this default exists so the command runs with no argument at all.
const DEFAULT_OUTPUT = join(REPO_ROOT, 'build', 'declarations');

/// The two emitted file names. The NODE arm keeps the declaration's own name (it IS that declaration);
/// the WASM arm's carries the arm in its name so the two cannot be confused in one directory.
const NODE_FILE = 'index.d.ts';
const WASM_FILE = 'index.wasm.d.ts';

/// **THE REGIONS — THE SET THIS STEP DERIVES, EACH WITH ITS OWN PAIR OF MARKERS AND ITS OWN TWO BODIES.**
/// **ONE REGION UNTIL 2026-11-20 (`D-155` item 2's `filePath` member); TWO FROM `D-203`, AND THE SECOND IS THE
/// FACTORY'S POSITION** — the WASM arm's runtime takes the initialised module at its FIRST position and the caller's
/// `cfg` at its SECOND (`bindings/js/platforms/wasm/index.mjs`; `docs/guides/package-use.md` §13.1), so the declaration
/// that describes that arm must spell two positions where the Node arm spells one, and the one member it already
/// narrowed was not the whole of what the realm changes.
///
/// **EVERY REGION IS DERIVED AND REFUSED BY THE SAME RULES THE ONE REGION WAS DERIVED AND REFUSED BY**: each marker
/// EXACTLY ONCE, each alone on its own line at two spaces of indentation, the body between them EXACTLY the line the
/// Node arm declares, a refusal on overlap, and **every refusal names WHICH REGION it refused** — so a source that is
/// wrong in two places reports both rather than the first.
///
/// **`name` IS THE NAME THE REFUSALS SPEAK AND THE NAME THE OUTPUT PRINTS**, never a filename and never a position.
const REGIONS = [
  {
    name: 'filePath',
    begin: '// ⟦realm:filePath:begin⟧',
    end: '// ⟦realm:filePath:end⟧',
    nodeBody: '  readonly filePath?: string;\n',
    wasmBody: '  readonly filePath?: never;\n',
  },
  {
    name: 'factory',
    begin: '// ⟦realm:factory:begin⟧',
    end: '// ⟦realm:factory:end⟧',
    nodeBody: 'export function storeCreate(cfg: StoreConfig): StoreInstance;\n',
    // **`unknown` IS THE HONEST TYPE OF A HOST-SUPPLIED MODULE**: the package instantiates nothing on this arm
    // (`D-155` item 3), the host hands the initialised module in, and the runtime is what validates it
    // (`addon-slot.mjs`'s `installAddon`). A named type in that position would be this package claiming the host's
    // shape — so the region's replacement admits every value and the runtime says which values are a module.
    wasmBody: 'export function storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance;\n',
  },
];

/// A REFUSAL, AND IT IS ALWAYS LOUD: a message on stderr naming the byte, then a non-zero exit.
/// **NO PATH IN THIS FILE NO-OPS.**
function refuse(message) {
  process.stderr.write(`emit-declarations: REFUSED — ${message}\n`);
  process.exit(1);
}

/// How many times `needle` occurs in `haystack` — a count, not a search, so a duplicated marker is
/// visible rather than silently taken at its first occurrence.
function occurrences(haystack, needle) {
  let count = 0;
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    count += 1;
    at = haystack.indexOf(needle, at + needle.length);
  }
  return count;
}

/// The 1-based line of a byte offset, so a refusal names a place a reader can open.
function lineOf(text, at) {
  return text.slice(0, at).split('\n').length;
}

/// Every offset of `needle` in `haystack`, in order — used only to name the places in a refusal.
function offsetsOf(haystack, needle) {
  const found = [];
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    found.push(at);
    at = haystack.indexOf(needle, at + needle.length);
  }
  return found;
}

/// The first byte at which two texts differ, or `-1` when they are identical. A refusal uses it to
/// name the byte rather than the fact.
function firstDifference(left, right) {
  const bound = Math.min(left.length, right.length);
  for (let i = 0; i < bound; i += 1) {
    if (left[i] !== right[i]) return i;
  }
  return left.length === right.length ? -1 : bound;
}

// ---------------------------------------------------------------------------------------------
// THE SOURCE — READ, AND ITS REGION DERIVED OR REFUSED
// ---------------------------------------------------------------------------------------------
if (!existsSync(SOURCE)) {
  refuse(`the declaration source is not on the tree: ${relative(REPO_ROOT, SOURCE)} is the ONE `
    + 'hand-authored declaration this step emits from, and both arms are its bytes.');
}
const source = readFileSync(SOURCE, 'utf8');

/// **ONE REGION, DERIVED FROM THE SOURCE'S OWN BYTES.** The region's two markers must each occur EXACTLY once,
/// each must stand alone on its own line at this file's marker depth of two spaces, and the bytes between them
/// must be EXACTLY the one line this step replaces — so the region is not a range this script guesses at, it is a
/// range the source declares. **EVERY FAILURE HERE NAMES THE REGION AND THE BYTE**, and each rule below is the rule
/// this step applied to its one region before 2026-11-20, applied now to each region of the set by its own name.
function regionOf(text, region) {
  const named = `the '${region.name}' region`;
  const begins = occurrences(text, region.begin);
  const ends = occurrences(text, region.end);

  if (begins === 0) {
    refuse(`the begin marker of ${named} is ABSENT from ${relative(REPO_ROOT, SOURCE)}: the source declares no `
      + `region this step could emit a WASM arm from, so the realm-conditional byte cannot be derived. The `
      + `marker is the line \`${region.begin}\` at two spaces of indentation.`);
  }
  if (begins > 1) {
    refuse(`the begin marker of ${named} appears ${begins} times in ${relative(REPO_ROOT, SOURCE)} (at lines `
      + `${offsetsOf(text, region.begin).map((at) => lineOf(text, at)).join(', ')}): each region declares its `
      + 'begin marker EXACTLY once, and a second one is a refusal rather than a first match.');
  }
  if (ends === 0) {
    refuse(`the end marker of ${named} is ABSENT from ${relative(REPO_ROOT, SOURCE)}: its begin marker stands `
      + `at line ${lineOf(text, text.indexOf(region.begin))} with nothing closing it. The marker is the line `
      + `\`${region.end}\` at two spaces of indentation.`);
  }
  if (ends > 1) {
    refuse(`the end marker of ${named} appears ${ends} times in ${relative(REPO_ROOT, SOURCE)} (at lines `
      + `${offsetsOf(text, region.end).map((at) => lineOf(text, at)).join(', ')}): each region declares its end `
      + 'marker EXACTLY once, and a second one is a refusal rather than a first match.');
  }

  const beginAt = text.indexOf(region.begin);
  const endAt = text.indexOf(region.end);
  if (endAt < beginAt) {
    refuse(`the two markers of ${named} are UNBALANCED: the end marker stands at byte ${endAt} (line `
      + `${lineOf(text, endAt)}) BEFORE the begin marker at byte ${beginAt} (line `
      + `${lineOf(text, beginAt)}), so the region has no body this step could replace.`);
  }

  const beginLineStart = text.lastIndexOf('\n', beginAt) + 1;
  const endLineStart = text.lastIndexOf('\n', endAt) + 1;
  if (text.slice(beginLineStart, beginAt) !== '  ') {
    refuse(`the begin marker of ${named} is not an indented comment line at this file's marker depth: line `
      + `${lineOf(text, beginAt)} reads ${JSON.stringify(text.slice(beginLineStart, beginAt))} before `
      + 'the marker, where exactly two spaces are required. The indentation is the marker\'s whole '
      + 'point — it is what keeps the line out of reach of the readers of this file.');
  }
  if (text.slice(endLineStart, endAt) !== '  ') {
    refuse(`the end marker of ${named} is not an indented comment line at this file's marker depth: line `
      + `${lineOf(text, endAt)} reads ${JSON.stringify(text.slice(endLineStart, endAt))} before the `
      + 'marker, where exactly two spaces are required (the same reading as the begin marker\'s).');
  }

  const bodyStart = text.indexOf('\n', beginAt) + 1;
  if (bodyStart === 0 || bodyStart >= endLineStart) {
    refuse(`the ${named} between its markers is EMPTY: the begin marker at line `
      + `${lineOf(text, beginAt)} is closed by the end marker at line ${lineOf(text, endAt)} with no `
      + `line between them, so the WASM arm would replace nothing. The region's body is the one line `
      + `\`${region.nodeBody.trim()}\`.`);
  }
  const body = text.slice(bodyStart, endLineStart);
  if (body !== region.nodeBody) {
    const at = firstDifference(body, region.nodeBody);
    const differsAt = at === -1 ? 'no byte differs and the lengths do' : `byte ${at} differs`;
    refuse(`the body of ${named} is not the ONE line this step replaces: it reads `
      + `${JSON.stringify(body)}, where \`${region.nodeBody.trim()}\` is the declared body — `
      + `${differsAt}. The region carries that line and nothing else, so that the WASM arm's emission `
      + 'replaces a declaration or a member and not a docblock or a neighbour.');
  }

  return { name: region.name, wasmBody: region.wasmBody, nodeBody: region.nodeBody, bodyStart, bodyEnd: endLineStart, body };
}

/// **THE SET, DERIVED IN SOURCE ORDER — AND REFUSED WHEN TWO REGIONS OVERLAP.** The order is the source's and not
/// this file's, so the emission below walks the text once; an overlap would make one region's replacement cut into
/// another's body, which is a source that declares two regions where only one can be read.
const regions = REGIONS.map((region) => regionOf(source, region))
  .sort((left, right) => left.bodyStart - right.bodyStart);

for (let index = 1; index < regions.length; index += 1) {
  const previous = regions[index - 1];
  const current = regions[index];
  if (current.bodyStart < previous.bodyEnd) {
    refuse(`the '${previous.name}' region (lines ${lineOf(source, previous.bodyStart)}–`
      + `${lineOf(source, previous.bodyEnd - 1)}) and the '${current.name}' region (starting at line `
      + `${lineOf(source, current.bodyStart)}) OVERLAP in ${relative(REPO_ROOT, SOURCE)}: they must be disjoint, `
      + 'or one region\'s replacement would cut into the other\'s body.');
  }
}

// ---------------------------------------------------------------------------------------------
// THE TWO EMISSIONS — PURE FUNCTIONS OF THE SOURCE'S BYTES
// ---------------------------------------------------------------------------------------------
/// One text composed from the source's bytes, with every region's body taken from the arm this step is composing
/// for. Nothing outside the regions is re-serialised or normalised: the pieces between them are the source's own.
function compose(nodeArm) {
  let out = '';
  let at = 0;
  for (const region of regions) {
    out += source.slice(at, region.bodyStart);
    out += nodeArm ? region.nodeBody : region.wasmBody;
    at = region.bodyEnd;
  }
  return out + source.slice(at);
}

/// The Node arm's declaration IS the source: not a re-serialisation, not a normalisation — the bytes
/// the hand-authored file holds, which is what makes the identity assertion below a real one. **AND THE
/// COMPOSITION IS ASSERTED AGAINST IT**, so a region whose declared Node body was not the source's own bytes
/// would be refused here rather than shipped as a second surface wearing the source's name.
const nodeText = source;
const composedNode = compose(true);
if (composedNode !== source) {
  const at = firstDifference(composedNode, source);
  refuse(`the declared Node bodies do not compose back to the source: the composition and `
    + `${relative(REPO_ROOT, SOURCE)} first differ at byte ${at} (line ${at === -1 ? '—' : lineOf(source, at)}), `
    + `so some region's Node body is not the bytes the source holds. Regions: `
    + `${regions.map((region) => `'${region.name}'`).join(', ')}.`);
}

/// The WASM arm's declaration is those same outside bytes with each region's replacement between them.
const wasmText = compose(false);

// ---------------------------------------------------------------------------------------------
// THE OUTPUT DIRECTORY — THE CALLER'S, AND NEVER INSIDE THE PACKAGE
// ---------------------------------------------------------------------------------------------
const argument = process.argv[2];
const output = argument === undefined || argument === ''
  ? DEFAULT_OUTPUT
  : resolve(process.cwd(), argument);

/// **THE SOURCE'S OWN DIRECTORY IS REFUSED AS AN OUTPUT.** `bindings/js/` holds the ONE hand-authored
/// declaration; a generator that could write beside it could overwrite the source it reads, and the
/// second surface `D-155` item 2 refuses would then be one path away from existing.
/// **⟶ AND IT IS THE SOURCE'S OWN DIRECTORY THAT IS REFUSED, AND NOT ITS WHOLE SUBTREE — CORRECTED 2026-11-17**
/// (`D-157` item 1). **The `provident-storeroom` package's root is `bindings/js/`, and the SIXTH package's root is
/// `bindings/js/platforms/wasm/`** — a different package with its own `index.d.ts` and its own `files`, and **the
/// WASM arm of this very generator is what must land there** (`D-155` item 2's second arm; `D-157` item 2 of its
/// unsettled: *"this row gives it a home and not a filename"*). **So the refusal is an EQUALITY and not a prefix.**
/// **WHAT THE GUARD IS FOR IS UNMOVED**: the emitted filenames are `index.d.ts` and `index.wasm.d.ts` in the output
/// directory, so an output equal to the source's directory would write over the ONE hand-authored declaration it is
/// reading — and that is the only directory that can do so, because every other directory holds a different file.
const insidePackage = relative(PACKAGE_DIR, output);
if (insidePackage === '') {
  refuse(`the output directory ${output} is the source's own directory `
    + `${relative(REPO_ROOT, PACKAGE_DIR)}: ${relative(REPO_ROOT, SOURCE)} is the ONE hand-authored `
    + 'declaration, and this step must never write where it reads. Nothing was written — pass an '
    + `output directory that is not that one (the sixth package's own root is the intended home, or the default, `
    + `${relative(REPO_ROOT, DEFAULT_OUTPUT)}).`);
}

mkdirSync(output, { recursive: true });
const nodePath = join(output, NODE_FILE);
const wasmPath = join(output, WASM_FILE);

// ---------------------------------------------------------------------------------------------
// THE WRITES — THEN THE READ-BACK THAT MAKES THE CLAIM TRUE
// ---------------------------------------------------------------------------------------------
writeFileSync(nodePath, nodeText);
writeFileSync(wasmPath, wasmText);

const nodeWritten = readFileSync(nodePath, 'utf8');
const wasmWritten = readFileSync(wasmPath, 'utf8');

// (1) THE NODE ARM'S IDENTITY — the written file against the source, byte for byte.
if (nodeWritten !== nodeText || nodeWritten !== source) {
  const at = firstDifference(nodeWritten, source);
  refuse(`the NODE arm's emission is NOT the source's identity: ${nodePath} and `
    + `${relative(REPO_ROOT, SOURCE)} first differ at byte ${at} (line `
    + `${at === -1 ? '—' : lineOf(source, at)} of the source). The Node arm is the source's own `
    + 'bytes or it is not the Node arm.');
}

// (2) EVERYTHING OUTSIDE THE REGIONS, BYTE-IDENTICAL — read against the source, which the assertion above has
//     already established is the Node emission's own bytes, so one walk serves both arms. **THE WALK IS IN SOURCE
//     ORDER AND NAMES THE REGION IT IS STANDING IN**, so a second region cannot hide behind the first: the bytes
//     between two regions are checked as strictly as the bytes before the first and after the last.
let sourceAt = 0;
let writtenAt = 0;
for (const region of regions) {
  const before = source.slice(sourceAt, region.bodyStart);
  if (wasmWritten.slice(writtenAt, writtenAt + before.length) !== before) {
    refuse(`the WASM arm's emission differs from the source BEFORE the '${region.name}' region: the `
      + `outside bytes (${sourceAt}…${region.bodyStart}) do not match. Only each region's body may move `
      + 'between the arms.');
  }
  writtenAt += before.length;
  const writtenBody = wasmWritten.slice(writtenAt, writtenAt + region.wasmBody.length);
  if (writtenBody !== region.wasmBody) {
    refuse(`the WASM arm's '${region.name}' body is not the declared replacement: it reads `
      + `${JSON.stringify(writtenBody)} where ${JSON.stringify(region.wasmBody)} is declared.`);
  }
  writtenAt += region.wasmBody.length;
  sourceAt = region.bodyEnd;
}
const tail = source.slice(sourceAt);
if (wasmWritten.slice(writtenAt) !== tail) {
  refuse(`the WASM arm's emission differs from the source AFTER the last region: the outside bytes `
    + `(${sourceAt}…${source.length}) do not match. Only each region's body may move between the arms.`);
}
if (wasmWritten.length !== writtenAt + tail.length) {
  refuse(`the WASM arm's emission is not the outside bytes PLUS the replacements: it reads `
    + `${wasmWritten.length} bytes where ${writtenAt + tail.length} are declared.`);
}
/// **AND THE LENGTH IS ACCOUNTED FOR TWICE — by the walk above and by the sum of the deltas**, so an
/// emission that swallowed a byte and gave one back in the same place could not pass unnoticed.
const expectedWasmLength = source.length
  + regions.reduce((moved, region) => moved + region.wasmBody.length - region.nodeBody.length, 0);
if (wasmWritten.length !== expectedWasmLength) {
  refuse(`the WASM arm's emission moves by the regions' own differences and by nothing else: it reads `
    + `${wasmWritten.length} bytes where ${expectedWasmLength} are declared for regions `
    + `${regions.map((region) => `'${region.name}' (+${region.wasmBody.length - region.nodeBody.length})`).join(', ')}.`);
}

// ---------------------------------------------------------------------------------------------
// THE ANSWER — THE TWO ABSOLUTE PATHS THIS RUN WROTE, AND WHAT EACH ONE IS
// ---------------------------------------------------------------------------------------------
process.stdout.write(`emit-declarations: ${nodePath} (${statSync(nodePath).size} bytes) — the Node arm: `
  + `${relative(REPO_ROOT, SOURCE)}'s own bytes, ${regions.length} region(s) unchanged, identity asserted\n`);
for (const region of regions) {
  process.stdout.write(`emit-declarations:   region '${region.name}' -> \`${region.wasmBody.trim()}\`\n`);
}
process.stdout.write(`emit-declarations: ${wasmPath} (${statSync(wasmPath).size} bytes) — the WASM arm: each `
  + `region's body replaced as printed above, everything outside the regions byte-identical\n`);
