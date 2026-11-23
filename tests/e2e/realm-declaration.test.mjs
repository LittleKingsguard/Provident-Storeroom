// tests/e2e/realm-declaration.test.mjs
//
// THE REALM-CONDITIONAL DECLARATION'S GENERATOR, DRIVEN AT ITS OWN OUTPUT.
//
// PROVENANCE. Every expectation below is derived from the RULING and from the generator's bytes, and from
// nothing else:
//   · `strata/decisions.md` · `D-155` item 2 — *"ONE DECLARATION SOURCE, TWO GENERATED DECLARATIONS: the
//     WASM arm types `filePath?: never`"*: the hand-authored declaration stays ONE source, and the
//     realm-conditional shape is PRODUCED, so no second hand-maintained surface exists.
//   · `docs/L3/wasm-realm/design.md` §6's last three bullets — the marker's home (a comment-delimited
//     region around the one member, both markers indented comment lines), the two emissions, and the
//     identity and outside-the-region assertions. **AND §6's census paragraph: the WASM arm's key is still
//     PRESENT and still OPTIONAL, because `never` narrows the value's type and not the member's presence.**
//   · `bindings/js/index.d.ts` — the artefact under test (the hand-authored declaration of record), and
//     `scripts/emit-declarations.mjs` — the step under test.
//
// WHAT THIS FILE DOES NOT DO. **NO CELL OPENS A `docs/**` PATH AT RUNTIME** (`D-17`): the ruling and the
// design were read by this file's author and are transcribed here as literals. **NO BYTE OF
// `bindings/js/index.mjs` OR `bindings/js/src/**` IS READ.** The two files this cell reads at runtime are
// the SOURCE and the GENERATOR, and the two it writes are the generator's own emissions, into a temp
// directory under the working directory that a `finally` removes.
//
// THE MEMBER READ IS `tests/e2e/blind-entry-module.test.mjs`'s OWN IDIOM, TRANSCRIBED: the same two-space
// member pattern, the same `optional` derivation from the `?` capture, and the same block terminated by a
// lone `}`. **THE POINT OF USING IT HERE IS THAT THE ARM'S DECLARATION MUST SATISFY THE SAME READ THE
// SOURCE DOES** — a marker line the pattern could match would be a SEVENTH member, and a `never` member
// the pattern could not read would be a member the census had lost.
//
// **STRING DISCIPLINE, STATED BECAUSE IT IS A CONDITION OF THIS CELL**: every string literal below is
// single-quoted and every message is built with `+`; no backtick stands inside a string, and this file
// carries no template literal at all. The quoting marks in the prose are the comments'.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(here, '..', '..');
const PACKAGE_DIR = join(REPO_ROOT, 'bindings', 'js');
const SOURCE_PATH = join(PACKAGE_DIR, 'index.d.ts');
const SOURCE = readFileSync(SOURCE_PATH, 'utf8');
const SCRIPT = join(REPO_ROOT, 'scripts', 'emit-declarations.mjs');

// The generator's two emitted names, and the marker lines and bodies of the TWO regions it reads — transcribed
// from the source and from `scripts/emit-declarations.mjs`, never computed from them.
//
// **⟶ ONE REGION UNTIL 2026-11-20; TWO FROM `D-203`** — the factory's position joined the `filePath` member's, and
// the cells below read the set the same way they read the one: each region's markers once each at two spaces of
// indentation, each region's body exactly the line the Node arm declares, and NO byte outside the regions moved
// between the arms.
const NODE_FILE = 'index.d.ts';
const WASM_FILE = 'index.wasm.d.ts';
const BEGIN = '// ⟦realm:filePath:begin⟧';
const END = '// ⟦realm:filePath:end⟧';
const SOURCE_BODY = '  readonly filePath?: string;\n';
const WASM_BODY = '  readonly filePath?: never;\n';
const FACTORY_BEGIN = '// ⟦realm:factory:begin⟧';
const FACTORY_END = '// ⟦realm:factory:end⟧';
const FACTORY_SOURCE_BODY = 'export function storeCreate(cfg: StoreConfig): StoreInstance;\n';
const FACTORY_WASM_BODY = 'export function storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance;\n';

/** **THE SET, IN SOURCE ORDER, AS THE GENERATOR DECLARES IT** — the reading the second cell below walks. */
const REGIONS = [
  { name: 'filePath', begin: BEGIN, end: END, nodeBody: SOURCE_BODY, wasmBody: WASM_BODY },
  { name: 'factory', begin: FACTORY_BEGIN, end: FACTORY_END, nodeBody: FACTORY_SOURCE_BODY, wasmBody: FACTORY_WASM_BODY },
];

/** **THE MEMBER PATTERN, TRANSCRIBED FROM `tests/e2e/blind-entry-module.test.mjs`** — a line at the
 *  block's own two-space depth carrying an optional `readonly`, a name, its optional marker and then the
 *  member's `:` or `(`. A nested inline object stands at four spaces and is therefore not a member of the
 *  outer record, and a comment line carries no name-and-colon shape at all. */
const MEMBER_PATTERN = /^ {2}(?:readonly )?([A-Za-z_$][\w$]*)(\??)\s*(?::|\()/;

/** How many times `needle` occurs in `haystack` — a count, not a search. */
const occurrences = (haystack, needle) => {
  let count = 0;
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    count += 1;
    at = haystack.indexOf(needle, at + needle.length);
  }
  return count;
};

/** The 0-based line index of a byte offset in `text`. */
const lineIndexAt = (text, at) => text.slice(0, at).split('\n').length - 1;

/** The member names of one interface block, each with its optional marker — the
 *  `blind-entry-module.test.mjs` read, applied to whichever declaration is handed to it. */
const membersOf = (text, name) => {
  const lines = text.split('\n');
  const open = lines.findIndex((line) => line.startsWith('export interface ' + name + ' {'));
  assert.notEqual(open, -1, 'the declaration carries no export interface named ' + name);
  const members = [];
  for (let i = open + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === '}') break;
    const match = MEMBER_PATTERN.exec(line);
    if (match) members.push({ name: match[1], optional: match[2] === '?' });
  }
  return members;
};

/** One run of the generator into `dir`, synchronously — the step's own graph is synchronous, so the cell
 *  reads its exit code and its two files with no waiting of its own. */
const runGenerator = (dir) => spawnSync(process.execPath, [SCRIPT, dir], { cwd: REPO_ROOT, encoding: 'utf8' });

/** A fresh temp directory under the working directory, the generator run into it, and everything it wrote
 *  read back. The caller owns the directory and removes it in a `finally`: **A CELL THAT LEFT A
 *  DECLARATION TREE BEHIND WOULD BE WRITING INTO THE CHECKOUT, which no cell may do.** */
const emit = () => {
  const dir = mkdtempSync(join(process.cwd(), 'realm-declaration-'));
  const run = runGenerator(dir);
  const nodePath = join(dir, NODE_FILE);
  const wasmPath = join(dir, WASM_FILE);
  return {
    dir,
    status: run.status,
    stdout: run.stdout,
    stderr: run.stderr,
    nodePath,
    wasmPath,
    node: existsSync(nodePath) ? readFileSync(nodePath, 'utf8') : '',
    wasm: existsSync(wasmPath) ? readFileSync(wasmPath, 'utf8') : '',
  };
};

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('realm-declaration · D-155 item 2 and docs/L3/wasm-realm/design.md §6 · THE SOURCE DECLARES THE `filePath` REALM REGION — two marker lines, once each, in that order, and filePath alone between them (a SECOND region, the one the factory stands in, joins it in `D-203` and is read by the cell below)', () => {
  const begins = occurrences(SOURCE, BEGIN);
  const ends = occurrences(SOURCE, END);
  // **⟶ "ONE REGION" READ THE WHOLE FILE UNTIL 2026-11-20; FROM `D-203` IT READS ONE REGION'S MARKERS**, which is
  // the rule the generator applies to each region of its set: the `factory` region's markers are a different pair
  // and are counted in the cell below, and neither pair may appear twice.
  assert.equal(begins, 1, 'the source must carry this region\'s begin marker EXACTLY once and carries it '
    + begins + ' time(s): ' + BEGIN);
  assert.equal(ends, 1, 'the source must carry this region\'s end marker EXACTLY once and carries it '
    + ends + ' time(s): ' + END);

  const beginAt = SOURCE.indexOf(BEGIN);
  const endAt = SOURCE.indexOf(END);
  assert.equal(endAt > beginAt, true, 'the two markers are IN ORDER: the begin marker at byte '
    + beginAt + ' precedes the end marker at byte ' + endAt);

  // **BOTH MARKERS ARE INDENTED COMMENT LINES AT THE MEMBER'S OWN DEPTH** — the form the design chose,
  // and the reason it was chosen.
  const beginLineStart = SOURCE.lastIndexOf('\n', beginAt) + 1;
  const endLineStart = SOURCE.lastIndexOf('\n', endAt) + 1;
  assert.equal(SOURCE.slice(beginLineStart, beginAt), '  ', 'the begin marker is an INDENTED comment '
    + 'line — exactly two spaces, at the member\'s own depth, which is the form that keeps it out of '
    + 'every read of this file');
  assert.equal(SOURCE.slice(endLineStart, endAt), '  ', 'and so is the end marker');

  // **THE REGION'S BODY IS THE ONE MEMBER AND NOTHING ELSE**, which is what lets the WASM arm replace a
  // member rather than a docblock or a neighbour.
  const body = SOURCE.slice(SOURCE.indexOf('\n', beginAt) + 1, endLineStart);
  assert.equal(body, SOURCE_BODY, 'the region\'s body is EXACTLY the one member line the generator '
    + 'replaces, and it reads ' + JSON.stringify(body));
  assert.equal(body.includes('filePath'), true, 'and the member between the markers is filePath');

  // **AND THE MARKERS ARE INVISIBLE TO THE MEMBER READ — MEASURED, NOT CLAIMED IN PROSE.** The pattern is
  // `blind-entry-module.test.mjs`'s own; a marker line that matched it would be a SEVENTH member of
  // `StoreConfig`, and the census cell there would redden on the bytes this region adds.
  const lines = SOURCE.split('\n');
  const beginLine = lines[lineIndexAt(SOURCE, beginAt)];
  const endLine = lines[lineIndexAt(SOURCE, endAt)];
  assert.equal(MEMBER_PATTERN.test(beginLine), false, 'the begin marker does not match the member '
    + 'pattern, so it is not a member of StoreConfig: ' + JSON.stringify(beginLine));
  assert.equal(MEMBER_PATTERN.test(endLine), false, 'and neither does the end marker: '
    + JSON.stringify(endLine));

  // **AND THE STATUS CENSUS CANNOT SEE THEM EITHER: THE REGION STANDS OUTSIDE ITS SUBJECT'S RANGE.** The
  // `StoreStatus` union is read from its own declaration to the union's first semicolon
  // (`tests/e2e/status-census-support.mjs`), and that declaration opens AFTER this interface's region — so
  // no marker line is ever a line that census reads.
  const statusOpen = SOURCE.indexOf('export type StoreStatus =');
  assert.notEqual(statusOpen, -1, 'the declaration carries the StoreStatus union the census reads');
  assert.equal(statusOpen > endAt, true, 'the union the status census derives opens AFTER the region '
    + '(' + statusOpen + ' > ' + endAt + '), so no marker line stands inside the census\'s range');
});

test('realm-declaration · D-155 item 2 · BOTH EMISSIONS ARE PRODUCED FROM THE ONE SOURCE, AND THE NODE ARM\'S IS THE SOURCE\'S OWN BYTES — the generator\'s own identity assertion, read at the files it wrote', () => {
  const out = emit();
  try {
    assert.equal(out.status, 0, 'the generator must answer exit 0 — its emission and its refusal are '
      + 'different instruments. stderr: ' + out.stderr);
    assert.equal(out.node.length > 0, true, 'the NODE arm\'s declaration is a non-empty file at '
      + out.nodePath);
    assert.equal(out.wasm.length > 0, true, 'the WASM arm\'s declaration is a non-empty file at '
      + out.wasmPath);

    // (1) THE NODE ARM'S IDENTITY, byte for byte against the hand-authored source.
    assert.equal(out.node, SOURCE, 'the NODE arm\'s emission IS the source\'s own bytes with the region '
      + 'unchanged — not a re-serialisation and not a normalisation. A declaration that differed here '
      + 'would be a second surface wearing the source\'s name');

    // (2) THE TWO ABSOLUTE PATHS ARE PRINTED, AND THEY ARE THE FILES THIS RUN WROTE.
    assert.equal(out.stdout.includes(out.nodePath), true, 'the run prints the NODE arm\'s absolute path '
      + 'when it has written it. Read: ' + JSON.stringify(out.stdout));
    assert.equal(out.stdout.includes(out.wasmPath), true, 'and the WASM arm\'s as well');

    // (3) IDEMPOTENCE — a second run over the same inputs writes the same bytes into the same place.
    const again = runGenerator(out.dir);
    assert.equal(again.status, 0, 'the second run answers exit 0 too. stderr: ' + again.stderr);
    assert.equal(readFileSync(out.nodePath, 'utf8'), out.node, 'a second run over the same inputs '
      + 'rewrites the NODE arm to the same bytes');
    assert.equal(readFileSync(out.wasmPath, 'utf8'), out.wasm, 'and the WASM arm to the same bytes');
  } finally {
    rmSync(out.dir, { recursive: true, force: true });
  }
});

test('realm-declaration · D-155 item 2, D-203 and docs/L3/wasm-realm/design.md §6 · THE TWO EMISSIONS DIFFER ONLY INSIDE THE REGIONS — the WASM arm narrows filePath to never and spells the factory with two positions, and moves NEITHER the member\'s presence NOR its optionality', () => {
  const out = emit();
  try {
    assert.equal(out.status, 0, 'the emissions are produced for this cell to read. stderr: ' + out.stderr);
    const node = out.node;
    const wasm = out.wasm;

    // **THE WALK IS THE GENERATOR'S OWN, AND IT IS A WALK AND NOT A SLICE FROM ONE MARKER PAIR** (`D-203`): the
    // bytes BETWEEN two regions are asserted as strictly as the bytes before the first and after the last, so a
    // second region cannot hide inside the arithmetic of the first. `nodeAt`/`wasmAt` are the two arms' own
    // cursors, because each replacement moves its arm's offset by its own length.
    let nodeAt = 0;
    let wasmAt = 0;
    for (const region of REGIONS) {
      const beginAt = node.indexOf(region.begin);
      const endAt = node.indexOf(region.end);
      assert.equal(beginAt !== -1 && endAt > beginAt, true, 'the NODE emission carries the ' + region.name
        + ' region\'s two markers, in order');
      const bodyStart = node.indexOf('\n', beginAt) + 1;
      const bodyEnd = node.lastIndexOf('\n', endAt) + 1;

      // The bytes before this region, on both arms — identical, and this is the assertion the ONE-region reading
      // made once, made now once per region.
      assert.equal(wasm.slice(wasmAt, wasmAt + (bodyStart - nodeAt)), node.slice(nodeAt, bodyStart),
        'every byte of the ' + region.name + ' region\'s PREFIX is identical between the two arms ('
        + (bodyStart - nodeAt) + ' bytes at source offset ' + nodeAt + ')');
      wasmAt += bodyStart - nodeAt;
      nodeAt = bodyEnd;

      // The region's two bodies: the source's own line on the Node arm, the declared replacement on the WASM arm.
      assert.equal(node.slice(bodyStart, bodyEnd), region.nodeBody, 'the source\'s ' + region.name
        + ' region body is the line the Node arm declares: ' + JSON.stringify(node.slice(bodyStart, bodyEnd)));
      assert.equal(wasm.slice(wasmAt, wasmAt + region.wasmBody.length), region.wasmBody, 'and the WASM arm\'s '
        + region.name + ' body is the SAME subject spelled for that realm: '
        + JSON.stringify(wasm.slice(wasmAt, wasmAt + region.wasmBody.length)));
      wasmAt += region.wasmBody.length;
    }

    // (2) NOTHING OUTSIDE THE REGIONS DIFFERS — the tail, and the length that follows from the two bodies.
    assert.equal(wasm.slice(wasmAt), node.slice(nodeAt), 'every byte AFTER the last region is identical between '
      + 'the two arms (' + (node.length - nodeAt) + ' bytes)');
    const moved = REGIONS.reduce((sum, region) => sum + region.wasmBody.length - region.nodeBody.length, 0);
    assert.equal(wasm.length, node.length + moved, 'the emitted length moves by the regions\' own differences and '
      + 'by nothing else — ' + node.length + ' to ' + wasm.length + ', where the bodies move the total by '
      + moved + ' (' + REGIONS.map((region) => region.name + ' ' + (region.wasmBody.length - region.nodeBody.length)).join(', ') + ')');

    // (3) **THE MEMBER'S PRESENCE AND OPTIONALITY ARE UNCHANGED — READ THE WAY
    // `blind-entry-module.test.mjs` READS A MEMBER.** The census is the same list on both arms, in the
    // same order, with the same optional markers: `never` narrows the VALUE's type, so the six rows are
    // the same rows on either arm — which is what lets ONE census cell serve both emissions.
    const nodeMembers = membersOf(node, 'StoreConfig');
    const wasmMembers = membersOf(wasm, 'StoreConfig');
    assert.deepEqual(wasmMembers, nodeMembers, 'the WASM arm\'s StoreConfig census IS the NODE arm\'s '
      + 'census — same members, same order, same optional markers. A never that removed the member, or '
      + 'that made it required, would be exactly that difference. Read: ' + JSON.stringify(wasmMembers));
    assert.deepEqual(nodeMembers.filter((member) => member.name === 'filePath'), [
      { name: 'filePath', optional: true },
    ], 'the member is PRESENT and OPTIONAL on the Node arm');
    assert.deepEqual(wasmMembers.filter((member) => member.name === 'filePath'), [
      { name: 'filePath', optional: true },
    ], 'and PRESENT and OPTIONAL on the WASM arm: the member did not leave the declaration and the '
      + 'optional marker did not leave the member');

    // (4) AND THE TYPE IS THE ARM'S OWN: string on the one, never on the other.
    assert.match(node, /^ {2}readonly filePath\?: string;$/m, 'the Node arm\'s member is a string');
    assert.match(wasm, /^ {2}readonly filePath\?: never;$/m, 'the WASM arm\'s member is never — a '
      + 'string supplied in that position is refused there and nowhere else');

    // (4b) **AND THE FACTORY'S POSITION IS THE SECOND REGION'S SUBJECT (`D-203`)**: one position on the Node arm,
    // two on the WASM arm, and the module's own type `unknown` because the module is the HOST's.
    assert.equal(node.includes('\n' + FACTORY_SOURCE_BODY), true,
      'the Node arm\'s factory is the one position it has always had: ' + JSON.stringify(FACTORY_SOURCE_BODY.trim()));
    assert.equal(wasm.includes('\n' + FACTORY_WASM_BODY), true,
      'and the WASM arm\'s takes the initialised module at its FIRST position, typed `unknown` because the package '
      + 'instantiates nothing and the runtime validates what arrives: ' + JSON.stringify(FACTORY_WASM_BODY.trim()));
    assert.equal(wasm.includes('\n' + FACTORY_SOURCE_BODY), false,
      'and the Node arm\'s signature is absent from the WASM arm — the defect `D-203` found was exactly its presence');

    // (5) THE MARKERS THEMSELVES STAND ON BOTH ARMS: each region is emitted and not consumed, so a reader
    // of either declaration sees the same marker pairs and each region is re-derivable from either
    // emitted file, not only from the hand-authored one.
    for (const region of REGIONS) {
      assert.equal(occurrences(node, region.begin), 1, 'the NODE arm carries the ' + region.name + ' begin marker once');
      assert.equal(occurrences(wasm, region.begin), 1, 'and so does the WASM arm');
      assert.equal(occurrences(node, region.end), 1, 'the NODE arm carries the ' + region.name + ' end marker once');
      assert.equal(occurrences(wasm, region.end), 1, 'and so does the WASM arm');
    }
  } finally {
    rmSync(out.dir, { recursive: true, force: true });
  }
});
