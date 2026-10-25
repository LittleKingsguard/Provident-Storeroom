// bindings/js/test/module-set.mjs
// **THE MODULE'S OWN FILES, READ AND STAGED AS ONE CLOSED SET** — the mechanism `strata/decisions.md` `D-14`
// fixed (*"the GLOB of the parts directory, paired with an EXPLICIT KERNEL PATH"*), implemented once for every
// drive that stages a scratch tree, and the same closed set used as the SUBJECT of the cells that read the
// module's own source text.
//
// WHY THIS FILE EXISTS. `bindings/js/index.mjs` is no longer the whole module: it is the HUB and it imports
// eight parts from `src/entry/`, and the constraint kernel's five parts live in the same directory behind a
// re-export barrel one level up. **Two test-side coupling classes follow from that and both are repaired
// against this one file** (`strata/decisions.md`'s FINDING of 2026-10-24, classes (1) and (3)):
//
//   (1) STAGED-TREE COPIES — a drive that copies `index.mjs` alone stages a tree that cannot be constructed as
//       a module graph at all, because a static relative import is resolved before evaluation. `stageModuleTree`
//       stages the HUB, the GLOB of the parts directory and the BARREL at its explicit path.
//   (3) SOURCE-TEXT COUPLINGS — a cell that greps "the entry" now greps `index.mjs` alone and misses the part
//       that carries the text. `moduleText`, `moduleCodeFiles` and `moduleCodeLines` read the SAME closed set,
//       so the subject of a text cell is the module and not one of its files.
//
// **THE GLOB IS ONE DIRECTORY, NON-RECURSIVE AND `.mjs` ONLY, SORTED** (`docs/L1/drive-restaging.md` §2.1):
// `src/entry/` is a closed set BY CONSTRUCTION, which is `D-14`'s whole ground for choosing a glob over a
// hand-maintained part list. `bindings/js/src/`'s own top level is deliberately NOT globbed — it carries the
// addon crate's Rust and exactly one `.mjs`, the barrel — so the barrel is named by its own path, which no glob
// can express.
//
// **A ZERO MATCH IS A LOUD FAILURE AND SO IS EVERY DEGRADED MATCH** (`D-14`: *"an empty match must be a LOUD
// failure, not a silently smaller tree"*; `docs/L1/drive-restaging.md` §2.2), in three steps:
//   1. zero matches throws, naming the absolute directory and the rule `src/entry/*.mjs`;
//   2. every match is asserted to be a REGULAR FILE and NON-EMPTY, because a zero-length part loads as a module
//      with no exports and fails two layers down at a `ReferenceError`;
//   3. a CLOSURE CHECK runs over the STAGED bytes: every relative specifier the staged files carry must resolve
//      to a path IN THE STAGED SET, and a missing target throws naming the IMPORTING FILE and the MISSING
//      TARGET — so a staging fault is diagnosed in the vocabulary of files and never mistaken for a behaviour
//      failure at an assertion (`docs/L1/drive-restaging.md` §3.4.1, the `negative-generators` trap).

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';

/** **THE HUB** (`entry-subdivision.md` §1 part 1): the claimed entry, at the path `package.json` publishes. */
export const HUB_RELATIVE_PATH = 'index.mjs';
/** **THE PARTS' DIRECTORY** — `D-14`'s glob walks this one directory and no other. */
export const PARTS_RELATIVE_DIRECTORY = 'src/entry';
/** **THE BARREL'S EXPLICIT PATH** — one level up from the parts, so no glob of the parts can match it. */
export const BARREL_RELATIVE_PATH = 'src/constraint-kernel.mjs';
/** The glob's own suffix rule: `.mjs` and nothing else. */
const PART_SUFFIX = '.mjs';

/** Every failure this file throws is a STAGING failure and says so, so a reader never reads one as a verdict. */
function stagingFailure(message) {
  return new Error(`module-set (D-14 staging): ${message}`);
}

/** One file of the module's own set, as the tests name it: `{ relativePath, bytes }` with `/` separators. */
function readModuleFile(absolutePath, relativePath) {
  let stat = null;
  try {
    stat = statSync(absolutePath);
  } catch (err) {
    throw stagingFailure(`the module's own file '${relativePath}' does not exist at ${absolutePath} (${err.code ?? err.message})`);
  }
  if (!stat.isFile()) throw stagingFailure(`'${relativePath}' is not a regular file (${absolutePath})`);
  const bytes = readFileSync(absolutePath, 'utf8');
  if (bytes.length === 0) throw stagingFailure(`'${relativePath}' is EMPTY at ${absolutePath} — a zero-length part loads as a module with no exports and fails two layers down`);
  return { relativePath, bytes };
}

/** The set is read once per package directory: it is the SHIPPED module and no drive mutates it. */
const MODULE_FILES = new Map();

/**
 * **THE MODULE'S OWN FILES, AS A CLOSED SET**: the hub, every `.mjs` in the parts directory (the glob), and the
 * barrel at its explicit path. **Order is deterministic** — hub, the globbed parts SORTED, the barrel — so two
 * staging calls in one process produce the same tree. Every file is asserted regular and non-empty here, once.
 */
export function moduleFiles(pkgDir) {
  const cached = MODULE_FILES.get(pkgDir);
  if (cached !== undefined) return cached;

  const files = [readModuleFile(join(pkgDir, HUB_RELATIVE_PATH), HUB_RELATIVE_PATH)];

  const partsDir = join(pkgDir, ...PARTS_RELATIVE_DIRECTORY.split('/'));
  let matched = [];
  try {
    matched = readdirSync(partsDir, { withFileTypes: true })
      .filter((entry) => entry.name.endsWith(PART_SUFFIX))
      .map((entry) => entry.name)
      .sort();
  } catch (err) {
    throw stagingFailure(`the glob '${PARTS_RELATIVE_DIRECTORY}/*${PART_SUFFIX}' cannot be read at ${partsDir} (${err.code ?? err.message})`);
  }
  if (matched.length === 0) {
    throw stagingFailure(
      `the glob '${PARTS_RELATIVE_DIRECTORY}/*${PART_SUFFIX}' matched NOTHING under ${partsDir} — an empty match is a `
      + 'LOUD failure and never a silently smaller tree (`strata/decisions.md` `D-14`; '
      + '`docs/L1/drive-restaging.md` §2.2), because the hub imports its parts by name and a tree without them '
      + 'cannot be constructed as a module graph at all',
    );
  }
  for (const name of matched) {
    files.push(readModuleFile(join(partsDir, name), `${PARTS_RELATIVE_DIRECTORY}/${name}`));
  }

  files.push(readModuleFile(join(pkgDir, ...BARREL_RELATIVE_PATH.split('/')), BARREL_RELATIVE_PATH));

  MODULE_FILES.set(pkgDir, files);
  return files;
}

/**
 * **THE STAGED SET'S CLOSURE, ASSERTED OVER THE STAGED BYTES.** Every relative specifier a staged file carries
 * — a static `from '…'`, a bare `import '…'`, a dynamic `import('…')`, and the hub's own `require_('…')` — is
 * resolved and required to land inside the staged set. **A missing target throws naming the importing file and
 * the missing target**, which is the whole point: a degraded glob then reads as *"`src/entry/frame.mjs` imports
 * `./carrier.mjs`, which this tree did not stage"* and never as *"the refusal form changed"*.
 *
 * **AND THE TWO RESOLUTION BASES ARE NOT THE SAME, WHICH IS THE WHOLE OF `D-14`'s PAIRING.** An ESM specifier
 * resolves FROM THE FILE THAT CARRIES IT; **`require_` does not — it is the HUB's own `createRequire(
 * import.meta.url)` (`adoptModuleContext`), so `require_('./src/constraint-kernel.mjs')` is read from within
 * `src/entry/constraints.mjs` and still resolves against `index.mjs`'s directory.** A closure check that
 * resolved it against the importing part would demand `src/entry/src/constraint-kernel.mjs` — and it DID, on
 * this pass's first run, which is why the base is carried per keyword rather than assumed.
 */
const RELATIVE_SPECIFIER = /(?:^|[^\w$.])(from|import|require_?)\s*\(?\s*(['"])(\.\.?\/[^'"\n]+)\2/g;

export function assertModuleClosure(destDir, stagedRelativePaths) {
  const staged = new Set(stagedRelativePaths);
  for (const relativePath of stagedRelativePaths) {
    const absolutePath = join(destDir, ...relativePath.split('/'));
    const bytes = readFileSync(absolutePath, 'utf8');
    RELATIVE_SPECIFIER.lastIndex = 0;
    let match = null;
    while ((match = RELATIVE_SPECIFIER.exec(bytes)) !== null) {
      const keyword = match[1];
      const specifier = match[3];
      // `require`/`require_` is the HUB's own CJS require (`createRequire(import.meta.url)` in `index.mjs`,
      // handed to the parts by `adoptModuleContext`), so its base is the hub's directory; every ESM form
      // resolves from the file that carries it.
      const base = keyword.startsWith('require') ? posix.dirname(HUB_RELATIVE_PATH) : posix.dirname(relativePath);
      const target = posix.normalize(posix.join(base, specifier));
      if (!staged.has(target)) {
        throw stagingFailure(
          `the staged tree is NOT CLOSED: '${relativePath}' carries ${keyword} '${specifier}', which resolves to `
          + `'${target}' from ${base === '.' ? 'the hub' : `'${base}'`} — a path this tree did not stage `
          + `(staged: ${JSON.stringify([...staged].sort())}). A shape fault is reported HERE, in the vocabulary `
          + 'of files, and never reaches a child process (`docs/L1/drive-restaging.md` §2.2 and §3.4.1)',
        );
      }
    }
  }
}

/**
 * **ASSEMBLE ONE STAGED MODULE SET UNDER `destDir`, AT THE SAME RELATIVE LAYOUT**, with an optional per-file
 * override — the lever a fault-injection control needs, because a control's mutation must be staged AS THE PART
 * THAT CARRIES THE MUTATED SITE (`docs/L1/drive-restaging.md` §3.1.1) and not as the hub.
 *
 * `overrides` is `[{ relativePath, bytes }]`; **an override naming a path the set does not carry is refused**,
 * since a control that mutates a file no tree stages measures nothing and would "pass" for the wrong reason
 * (the `F-14` class). The closure check runs AFTER every file is written, over the staged bytes.
 */
export function stageModuleTree(pkgDir, destDir, overrides = []) {
  const files = moduleFiles(pkgDir);
  const byPath = new Map(files.map((file) => [file.relativePath, file.bytes]));
  for (const override of overrides) {
    if (!byPath.has(override.relativePath)) {
      throw stagingFailure(
        `an override names '${override.relativePath}', which is NOT one of the module's staged files `
        + `(${JSON.stringify([...byPath.keys()].sort())}) — a control must be staged as the file that carries its site`,
      );
    }
    byPath.set(override.relativePath, override.bytes);
  }
  for (const [relativePath, bytes] of byPath) {
    const absolutePath = join(destDir, ...relativePath.split('/'));
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, bytes);
  }
  const staged = [...byPath.keys()];
  assertModuleClosure(destDir, staged);
  return staged;
}

/** **THE MODULE'S OWN BYTES, JOINED** — the subject of a cell that asks what the module SPELLS (a name, a
 *  token's absence). Comments are NOT stripped here: the cells that use this read the shipped bytes as shipped. */
export function moduleText(pkgDir) {
  let text = '';
  for (const file of moduleFiles(pkgDir)) text += file.bytes;
  return text;
}

/**
 * **A LEXICAL COMMENT BLANKER, AND WHY IT IS LEXICAL.** The two-step stripper this battery used before
 * (`/\/\*[\s\S]*?\*\//g` first, then everything after a `//`) is not a lexer: **a `/*` that stands inside a LINE
 * COMMENT, or inside a string, opens a phantom block comment and blanks LIVE CODE with it.** Measured on this
 * tree before the repair: the phantom region swallowed `index.mjs`'s `L2977`–`L3699` — 723 lines of code,
 * including the function bodies the cells below scan — so a cell could pass because its subject was blanked,
 * which is the one failure mode a text instrument must not have. This scanner walks the text once, tracking
 * line comments, block comments, `'…'`, `"…"` and template literals (including `${ … }` expressions, in which
 * comments and strings can occur), and blanks COMMENT BYTES ONLY — a string literal is left standing, so the
 * verb-as-data shapes the cells refuse are still visible.
 */
function stripComments(source) {
  const out = source.split('');
  const n = source.length;
  const blank = (from, to) => {
    for (let k = from; k < Math.min(to, n); k += 1) if (out[k] !== '\n') out[k] = ' ';
  };
  function scan(i, stopAtBrace) {
    let depth = 0;
    while (i < n) {
      const c = source[i];
      const d = source[i + 1];
      if (c === '/' && d === '/') {
        let j = i;
        while (j < n && source[j] !== '\n') j += 1;
        blank(i, j);
        i = j;
        continue;
      }
      if (c === '/' && d === '*') {
        let j = i + 2;
        while (j < n && !(source[j] === '*' && source[j + 1] === '/')) j += 1;
        blank(i, Math.min(j + 2, n));
        i = Math.min(j + 2, n);
        continue;
      }
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < n) {
          if (source[j] === '\\') { j += 2; continue; }
          if (source[j] === c) { j += 1; break; }
          if (source[j] === '\n') break;
          j += 1;
        }
        i = j;
        continue;
      }
      if (c === '`') {
        let j = i + 1;
        while (j < n) {
          if (source[j] === '\\') { j += 2; continue; }
          if (source[j] === '`') { j += 1; break; }
          if (source[j] === '$' && source[j + 1] === '{') { j = scan(j + 2, true); continue; }
          j += 1;
        }
        i = j;
        continue;
      }
      if (stopAtBrace) {
        if (c === '{') { depth += 1; i += 1; continue; }
        if (c === '}') { if (depth === 0) return i + 1; depth -= 1; i += 1; continue; }
      }
      i += 1;
    }
    return i;
  }
  scan(0, false);
  return out.join('');
}

/** **EACH OF THE MODULE'S OWN FILES WITH ITS COMMENTS BLANKED**, at its own relative path. */
export function moduleCodeFiles(pkgDir) {
  return moduleFiles(pkgDir).map((file) => ({ relativePath: file.relativePath, text: stripComments(file.bytes) }));
}

/** The joined code text — for the shapes that are asserted ACROSS the family (a verb string, a token). */
export function moduleCodeText(pkgDir) {
  let text = '';
  for (const file of moduleCodeFiles(pkgDir)) text += file.text;
  return text;
}

/** **EVERY CODE LINE OF THE MODULE, LABELLED `<relativePath>:<line>`** — so a reported site names the file it
 *  stands in, and a cell that used to print `:1151` now prints `src/entry/state.mjs:507`. */
export function moduleCodeLines(pkgDir) {
  const lines = [];
  for (const file of moduleCodeFiles(pkgDir)) {
    const rows = file.text.split('\n');
    for (let i = 0; i < rows.length; i += 1) lines.push({ where: `${file.relativePath}:${i + 1}`, text: rows[i] });
  }
  return lines;
}

/**
 * **THE CARRIER OF ONE ANCHOR** — the ONE file of the module's own set whose bytes contain `anchor` (a string,
 * or a `RegExp` without the `g` flag). This is how a fault-injection control finds the part that now holds the
 * site it cuts: **the control names the SITE, never the FILE**, so the next partition re-points it by itself
 * instead of breaking it. Zero carriers and two carriers are both LOUD, and each says which files were tried:
 * an anchor that silently matched nothing is how a control becomes inert (`F-14`), and an anchor that matched
 * two files makes "which part does the mutant go into" undecidable.
 */
export function locateCarrier(pkgDir, anchor) {
  const test = (bytes) => (anchor instanceof RegExp ? anchor.test(bytes) : bytes.includes(anchor));
  const hits = moduleFiles(pkgDir).filter((file) => test(file.bytes));
  if (hits.length === 0) {
    throw stagingFailure(
      `the anchor ${anchor instanceof RegExp ? String(anchor) : JSON.stringify(anchor.slice(0, 160))} matches NO file of `
      + `the module's own set (${JSON.stringify(moduleFiles(pkgDir).map((f) => f.relativePath))}) — the site MOVED and `
      + 'the control must be re-cut at the part that carries it',
    );
  }
  if (hits.length > 1) {
    throw stagingFailure(
      `the anchor ${anchor instanceof RegExp ? String(anchor) : JSON.stringify(anchor.slice(0, 160))} matches `
      + `${hits.length} files of the module's own set (${JSON.stringify(hits.map((f) => f.relativePath))}) — the `
      + 'control cannot know which part its mutant belongs in, so the anchor is not specific enough',
    );
  }
  return hits[0];
}
