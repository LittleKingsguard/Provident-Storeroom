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
//    · the NODE arm's — THE SOURCE'S OWN BYTES, the marked region unchanged, and the identity is
//      ASSERTED (the written file is read back and compared, byte for byte, with the source);
//    · the WASM arm's — the same bytes with EXACTLY the region's body replaced by
//      `  readonly filePath?: never;`, and everything outside the region asserted byte-identical.
//
//  **NEITHER OUTPUT IS HAND-EDITED AND NEITHER IS A SECOND SOURCE.** Both are artefacts of this run:
//  delete them and the run reproduces them. A second run over the same inputs writes the same bytes.
//
//  THE MARKER, AND WHY IT IS A COMMENT LINE AT THE MEMBER'S OWN DEPTH
//  ---------------------------------------------------------------------------
//  The region is delimited in the source by two comment lines around the ONE member that differs:
//
//      // ⟦realm:filePath:begin⟧
//        readonly filePath?: string;
//      // ⟦realm:filePath:end⟧
//
//  (both markers indented two spaces, i.e. at the member's own depth). **THE FORM IS CHOSEN SO THAT
//  NOTHING THAT READS THE DECLARATION CAN SEE IT**: the member read a battery file performs on
//  `export interface … { … }` blocks matches only a line that begins with exactly two spaces and then
//  an optional `readonly`, an identifier and `:` or `(`, so a line whose first two characters after the
//  indentation are `//` is not a member and cannot move a member census; and the `StoreStatus` census
//  reads the union's own `|`-led arm lines, which stand a hundred and fifty lines past this interface,
//  so the marker is not in its range at all. **THE MARKERS ARE MARKERS AND NOT PROSE: each appears
//  EXACTLY ONCE, and a source carrying zero, two or an unbalanced pair is a REFUSAL below.**
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

/// The marker lines, as they stand in the source — one occurrence each, at two spaces of indentation.
const BEGIN = '// ⟦realm:filePath:begin⟧';
const END = '// ⟦realm:filePath:end⟧';

/// **THE REGION'S TWO BODIES** — the source's own member line, and the one replacement the WASM arm
/// makes. Both carry their own newline, so the region is a whole number of lines on both arms and no
/// byte outside it moves.
const NODE_BODY = '  readonly filePath?: string;\n';
const WASM_BODY = '  readonly filePath?: never;\n';

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

/// **THE REGION, DERIVED FROM THE SOURCE'S OWN BYTES.** The two markers must each occur EXACTLY once,
/// each must stand alone on its own line at the member's own two-space depth, and the bytes between
/// them must be EXACTLY the one member line this step replaces — so the region is not a range this
/// script guesses at, it is a range the source declares. **EVERY FAILURE HERE NAMES THE BYTE.**
function regionOf(text) {
  const begins = occurrences(text, BEGIN);
  const ends = occurrences(text, END);

  if (begins === 0) {
    refuse(`the begin marker is ABSENT from ${relative(REPO_ROOT, SOURCE)}: the source declares no `
      + `region this step could emit a WASM arm from, so the realm-conditional member cannot be `
      + `derived. The marker is the line \`${BEGIN}\` at two spaces of indentation.`);
  }
  if (begins > 1) {
    refuse(`the begin marker appears ${begins} times in ${relative(REPO_ROOT, SOURCE)} (at lines `
      + `${offsetsOf(text, BEGIN).map((at) => lineOf(text, at)).join(', ')}): the source must declare `
      + 'ONE realm region, and a second begin marker is a refusal rather than a first match.');
  }
  if (ends === 0) {
    refuse(`the end marker is ABSENT from ${relative(REPO_ROOT, SOURCE)}: the begin marker stands at `
      + `line ${lineOf(text, text.indexOf(BEGIN))} with nothing closing it. The marker is the line `
      + `\`${END}\` at two spaces of indentation.`);
  }
  if (ends > 1) {
    refuse(`the end marker appears ${ends} times in ${relative(REPO_ROOT, SOURCE)} (at lines `
      + `${offsetsOf(text, END).map((at) => lineOf(text, at)).join(', ')}): the source must declare `
      + 'ONE realm region, and a second end marker is a refusal rather than a first match.');
  }

  const beginAt = text.indexOf(BEGIN);
  const endAt = text.indexOf(END);
  if (endAt < beginAt) {
    refuse(`the two markers are UNBALANCED: the end marker stands at byte ${endAt} (line `
      + `${lineOf(text, endAt)}) BEFORE the begin marker at byte ${beginAt} (line `
      + `${lineOf(text, beginAt)}), so the region has no body this step could replace.`);
  }

  const beginLineStart = text.lastIndexOf('\n', beginAt) + 1;
  const endLineStart = text.lastIndexOf('\n', endAt) + 1;
  if (text.slice(beginLineStart, beginAt) !== '  ') {
    refuse(`the begin marker is not an indented comment line at the member's own depth: line `
      + `${lineOf(text, beginAt)} reads ${JSON.stringify(text.slice(beginLineStart, beginAt))} before `
      + 'the marker, where exactly two spaces are required. The indentation is the marker\'s whole '
      + 'point — it is what keeps the line out of reach of the readers of this file.');
  }
  if (text.slice(endLineStart, endAt) !== '  ') {
    refuse(`the end marker is not an indented comment line at the member's own depth: line `
      + `${lineOf(text, endAt)} reads ${JSON.stringify(text.slice(endLineStart, endAt))} before the `
      + 'marker, where exactly two spaces are required (the same reading as the begin marker\'s).');
  }

  const bodyStart = text.indexOf('\n', beginAt) + 1;
  if (bodyStart === 0 || bodyStart >= endLineStart) {
    refuse(`the region between the markers is EMPTY: the begin marker at line `
      + `${lineOf(text, beginAt)} is closed by the end marker at line ${lineOf(text, endAt)} with no `
      + `member line between them, so the WASM arm would replace nothing. The region's body is the `
      + `one line \`${NODE_BODY.trim()}\`.`);
  }
  const body = text.slice(bodyStart, endLineStart);
  if (body !== NODE_BODY) {
    const at = firstDifference(body, NODE_BODY);
    const differsAt = at === -1 ? 'no byte differs and the lengths do' : `byte ${at} differs`;
    refuse(`the region's body is not the ONE member line this step replaces: it reads `
      + `${JSON.stringify(body)}, where \`${NODE_BODY.trim()}\` is the declared body — `
      + `${differsAt}. The region carries the member and nothing else, so that the WASM arm's `
      + 'emission replaces a member and not a docblock or a neighbour.');
  }

  return { bodyStart, bodyEnd: endLineStart, body };
}

const region = regionOf(source);

// ---------------------------------------------------------------------------------------------
// THE TWO EMISSIONS — PURE FUNCTIONS OF THE SOURCE'S BYTES
// ---------------------------------------------------------------------------------------------
/// The bytes OUTSIDE the region, on both arms. They are taken once, from the source, so that the two
/// files below are provably identical outside it rather than merely built from the same text.
const outsideBefore = source.slice(0, region.bodyStart);
const outsideAfter = source.slice(region.bodyEnd);

/// The Node arm's declaration IS the source: not a re-serialisation, not a normalisation — the bytes
/// the hand-authored file holds, which is what makes the identity assertion below a real one.
const nodeText = source;

/// The WASM arm's declaration is those same outside bytes with the one replacement between them.
const wasmText = outsideBefore + WASM_BODY + outsideAfter;

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

// (2) EVERYTHING OUTSIDE THE REGION, BYTE-IDENTICAL — read against BOTH the source and the Node
//     emission, because the claim is about the pair of files this run wrote and about the one source
//     they came from.
const wasmBefore = wasmWritten.slice(0, outsideBefore.length);
const wasmAfter = wasmWritten.slice(wasmWritten.length - outsideAfter.length);
if (wasmBefore !== outsideBefore || wasmBefore !== nodeWritten.slice(0, outsideBefore.length)) {
  refuse(`the WASM arm's emission differs from the source BEFORE the region: the outside bytes `
    + `(0…${outsideBefore.length}) do not match. Only the region's body may move between the arms.`);
}
if (wasmAfter !== outsideAfter || wasmAfter !== nodeWritten.slice(nodeWritten.length - outsideAfter.length)) {
  refuse(`the WASM arm's emission differs from the source AFTER the region: the outside bytes `
    + `(${region.bodyEnd}…${source.length}) do not match. Only the region's body may move between `
    + 'the arms.');
}
if (wasmWritten.length !== outsideBefore.length + WASM_BODY.length + outsideAfter.length) {
  refuse(`the WASM arm's emission is not the outside bytes PLUS the replacement: it reads `
    + `${wasmWritten.length} bytes where ${outsideBefore.length} + ${WASM_BODY.length} + `
    + `${outsideAfter.length} are declared.`);
}
if (wasmWritten.slice(outsideBefore.length, wasmWritten.length - outsideAfter.length) !== WASM_BODY) {
  refuse(`the WASM arm's region body is not the declared replacement: it reads `
    + `${JSON.stringify(wasmWritten.slice(outsideBefore.length, wasmWritten.length - outsideAfter.length))} `
    + `where ${JSON.stringify(WASM_BODY)} is declared.`);
}

// ---------------------------------------------------------------------------------------------
// THE ANSWER — THE TWO ABSOLUTE PATHS THIS RUN WROTE, AND WHAT EACH ONE IS
// ---------------------------------------------------------------------------------------------
process.stdout.write(`emit-declarations: ${nodePath} (${statSync(nodePath).size} bytes) — the Node arm: `
  + `${relative(REPO_ROOT, SOURCE)}'s own bytes, region unchanged, identity asserted\n`);
process.stdout.write(`emit-declarations: ${wasmPath} (${statSync(wasmPath).size} bytes) — the WASM arm: the `
  + `region's body replaced by \`${WASM_BODY.trim()}\`, everything outside it byte-identical\n`);
