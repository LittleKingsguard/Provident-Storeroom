// tests/e2e/pack-reachability.mjs
// **⟶ RE-HOMED 2026-10-25 BY THE BATTERY'S STRATIFICATION MOVE (`D-5`; `docs/L1/test-stratification.json`).
// IT IS ROUTE-NEUTRAL AND SITS AT THE SCOPE'S ROOT FOR THE SAME REASON `module-set.mjs` DOES:** it carries no
// package specifier, takes the package DIRECTORY and the manifest OBJECT as arguments, and therefore serves
// run A (`../pack-reachability.mjs`) and the `O4` cells (`./pack-reachability.mjs`) with one spelling of
// `D-4`'s invariant. **NO RELATIVE ROOT WAS RE-DERIVED HERE — this file declares none**: its two roots,
// `HUB_RELATIVE_PATH` and `BARREL_RELATIVE_PATH`, are PACKAGE-relative and are re-exported from
// `./module-set.mjs`, so the move changed its importers' specifiers and not its own arithmetic.
// **THE INVARIANT `D-4` HANDED THE PUBLISH SHAPE TO, WRITTEN ONCE SO IT CAN BE MEASURED AND MADE TO FAIL.**
//
// `strata/decisions.md` `D-3` retired the declared arity on `bindings/js/package.json`'s `files` allowlist and
// `D-4` lifted the strict count whole: **the shape is a consequence of REACHABILITY** — whatever the published
// module requires by path must ship in the tarball, and nothing that nothing requires is owed. **No cell
// asserted that.** The newest `FINDING` in `strata/decisions.md` records what the missing instrument cost: the
// entry was partitioned into a hub plus thirteen parts under `src/entry/`, the allowlist still named four
// entries, **and every leg of the battery stayed green while a tarball built from that manifest could not
// load** — `ERR_MODULE_NOT_FOUND` on the first `import`, because the checkout has the parts beside the hub and
// the tarball did not.
//
// **WHY THE INSTRUMENT IS THIS FILE AND NOT A LINE INSIDE A CELL.** The verdict is one two-directional
// comparison, and the only way to show a comparison can fail is to drive the SAME code against a manifest that
// is wrong. It is therefore a pure instrument: `measurePackedClosure` takes a package directory and a manifest
// OBJECT (never a path it edits) and returns the measured sets, so a cell can assert the shipped verdict and
// then feed the identical logic a mutated manifest and assert that it reports the defect. Nothing here throws
// on a verdict — a verdict is data; only a malformed subject or a graph that is not closed ON DISK throws,
// because those are staging faults and must never be read as a publish verdict.
//
// =====================================================================================================
// THE TWO RULES, AND EACH IS A MEASUREMENT RATHER THAN A PREFERENCE
// =====================================================================================================
//
//   (1) THE PACKED SET. `files` is expanded by the rule npm itself applies, because **the allowlist carries a
//       DIRECTORY row (`src/entry/`) and a directory row cannot be resolved by path equality** — the shipped
//       form is `index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs`, and the
//       last part of that resolution (the eighteen members `npm pack --dry-run` reports) is a WALK, not a
//       lookup. Two facts of npm's own behaviour are carried here because a cell that forgot either would
//       report a false miss: **`package.json` is always packed whatever `files` says**, and a directory entry
//       carries every non-dot file beneath it (`README*` and `LICEN[CS]E*` at the root are always packed too).
//       **`bindings/js/src/` is CO-TENANTED** — `codec.rs` · `crossing.rs` · `facade.rs` · `lib.rs` sit beside
//       `entry/` and the barrel — which is the measured reason the manifest names `src/entry/` and the
//       barrel's own path instead of `src/`, and which is what the second direction below has to catch.
//
//   (2) THE REACHABLE SET. The closure of the RELATIVE SPECIFIERS carried by the two roots — **the HUB
//       (`index.mjs`) and the BARREL (`src/constraint-kernel.mjs`)** — followed transitively. A specifier
//       resolves FROM THE FILE THAT CARRIES IT, with one declared exception the code itself makes and this
//       walk must respect: **`require_(…)` is the hub's own `createRequire(import.meta.url)`**, handed to the
//       parts by `adoptModuleContext`, so `require_('./src/constraint-kernel.mjs')` sits inside
//       `src/entry/constraints.mjs` and STILL resolves against the hub's directory. A walk that resolved it
//       against the importing part would demand `src/entry/src/constraint-kernel.mjs` and report the kernel
//       MISSING — the one false red that would make this instrument untrustworthy at the exact place the
//       kernel's lazy reach lives (the same base rule `./module-set.mjs` carries for its staging closure).
//
// **THE VERDICT IS BOTH DIRECTIONS, AND THEY CATCH DIFFERENT DEFECTS.** `missing` is the load-blocker: a file
// the module imports that the tarball does not carry, which is the defect the partition created and the
// reason this file exists. `overPacked` is the other half of `D-4`: **a member the allowlist packs that
// nothing imports and that is not a declared non-code artefact** — the limb a `"src/"` entry would fail, on
// the measured evidence of the four `.rs` files.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';

// **THE TWO ROOTS ARE DECLARED ONCE IN THIS BATTERY, AND `./module-set.mjs` IS WHERE.** That file carries
// `D-14`'s pairing — the parts' directory GLOB plus the barrel's EXPLICIT path — for the drives that stage a
// tree, and these are the same two paths: **the HUB** (`index.mjs`, the path the one arms-bearing `exports` arm
// publishes) and **the BARREL** (`src/constraint-kernel.mjs`, one level up from the parts). **A THIRD HOME
// WOULD BE A SECOND UNOWNED SPELLING**: a rename of the hub or the barrel would then have to be found in three
// places, and the one that was missed would be this cell's own subject. So they are re-exported from there
// rather than re-spelled here.
export { HUB_RELATIVE_PATH, BARREL_RELATIVE_PATH } from './module-set.mjs';
import { BARREL_RELATIVE_PATH, HUB_RELATIVE_PATH } from './module-set.mjs';

/** A staging fault of this instrument is never a publish verdict, and it says so in the message. */
function instrumentFailure(message) {
  return new Error(`pack-reachability: ${message}`);
}

/** **npm's never-packed names**, at any depth: a VCS directory, an installed tree, and the two lock/rc files
 *  npm strips. A dotfile is not reached by a directory walk either (`npm`'s globs do not match a dot-entry
 *  unless a pattern names it), which the walk below applies to every entry rather than to this set alone. */
const NEVER_PACKED = new Set([
  '.git', '.hg', '.svn', 'CVS', 'node_modules', 'web_modules', '.npmrc', 'package-lock.json', '.DS_Store',
]);

/** **npm's always-included ROOT names**, whatever `files` says — `README*` and `LICEN[CS]E*`. `package.json` is
 *  the third and is carried explicitly, because it is the one every cell of this corpus names. */
const ALWAYS_INCLUDED = [/^readme(\..*)?$/i, /^licen[cs]e(\..*)?$/i];

/** The directory entries of one absolute directory, SORTED, so every measured list is deterministic. */
function children(absoluteDirectory) {
  return readdirSync(absoluteDirectory, { withFileTypes: true })
    .map((entry) => ({ name: entry.name, isDir: entry.isDirectory() }))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

/** Every non-dot, non-ignored file under `<packageDir>/<relativeDirectory>`, at its `/`-separated relative path. */
function walkFiles(packageDir, relativeDirectory, accumulated = []) {
  const absolute = relativeDirectory === ''
    ? packageDir
    : join(packageDir, ...relativeDirectory.split('/'));
  for (const child of children(absolute)) {
    if (NEVER_PACKED.has(child.name)) continue;
    if (child.name.startsWith('.')) continue;
    const relativePath = relativeDirectory === '' ? child.name : `${relativeDirectory}/${child.name}`;
    if (child.isDir) walkFiles(packageDir, relativePath, accumulated);
    else accumulated.push(relativePath);
  }
  return accumulated;
}

/** **The minimal glob npm's own `files` rows use here** — `*` within one segment and `**` across segments —
 *  converted to one anchored expression. Anything else in a row is matched literally, which is npm's own
 *  reading of a row that carries no wildcard. */
function globToRegExp(pattern) {
  let source = '';
  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    if (character === '*' && pattern[index + 1] === '*') {
      source += '.*';
      index += 1;
      if (pattern[index + 1] === '/') index += 1;
    } else if (character === '*') {
      source += '[^/]*';
    } else if ('\\^$.|?+()[]{}'.includes(character)) {
      source += `\\${character}`;
    } else {
      source += character;
    }
  }
  return new RegExp(`^${source}$`);
}

/**
 * **THE PACKED SET — `files` EXPANDED BY npm'S OWN RULE.** A row ending in `/` (or naming a directory) carries
 * every file beneath it; a row naming a file carries that file; a row carrying a wildcard carries its matches;
 * and **a row that names NOTHING is a loud staging fault**, because a `files` entry matching nothing is a
 * manifest defect that npm would answer with a tarball carrying less than its author read.
 */
export function packedMembers(packageDir, files) {
  if (!Array.isArray(files)) {
    throw instrumentFailure(
      `the manifest carries no \`files\` array (read ${JSON.stringify(files)}) — there is no allowlist to expand, `
      + 'and a package with no allowlist does not answer this instrument\'s question at all',
    );
  }
  // npm packs `package.json` whatever the allowlist says: it is the manifest the registry and the consumer both read.
  const members = new Set(['package.json']);
  for (const row of files) {
    if (typeof row !== 'string' || row.trim() === '') {
      throw instrumentFailure(`the allowlist carries a row that is not a path: ${JSON.stringify(row)}`);
    }
    const isDirectoryRow = row.endsWith('/');
    const entry = row.replace(/^\.\//, '').replace(/\/+$/, '');
    if (entry === '') throw instrumentFailure(`the allowlist carries a row naming the package root itself: ${JSON.stringify(row)}`);
    if (entry.startsWith('..') || posix.isAbsolute(entry)) {
      throw instrumentFailure(`the allowlist row ${JSON.stringify(row)} escapes the package root — nothing outside it can be packed`);
    }
    const absolute = join(packageDir, ...entry.split('/'));
    if (existsSync(absolute) && statSync(absolute).isDirectory()) {
      for (const member of walkFiles(packageDir, entry)) members.add(member);
      continue;
    }
    if (existsSync(absolute) && statSync(absolute).isFile()) {
      members.add(entry);
      continue;
    }
    if (/[*?[\]]/.test(entry)) {
      const expression = globToRegExp(entry);
      const matched = walkFiles(packageDir, '').filter((member) => expression.test(member));
      if (matched.length === 0) {
        throw instrumentFailure(
          `the allowlist row ${JSON.stringify(row)} matches NOTHING in ${packageDir} — an allowlist row that carries `
          + 'no file is a manifest defect, never a smaller tarball',
        );
      }
      for (const member of matched) members.add(member);
      continue;
    }
    throw instrumentFailure(
      `the allowlist row ${JSON.stringify(row)} names nothing at ${absolute}`
      + `${isDirectoryRow ? ' — it is written as a DIRECTORY row and no such directory exists' : ''}`,
    );
  }
  // the two always-included root names, when the package carries them, are packed whether or not a row names them
  for (const child of children(packageDir)) {
    if (child.isDir) continue;
    if (child.name === 'package.json') continue;
    if (ALWAYS_INCLUDED.some((pattern) => pattern.test(child.name))) members.add(child.name);
  }
  return [...members].sort();
}

/**
 * **THE DECLARED NON-CODE ARTEFACTS — the members that may legitimately be packed while nothing imports them.**
 * Four sources and no fifth: **`package.json`** (npm always packs it), **`README*` / `LICEN[CS]E*` at the
 * root** (npm's own always-included set), **the paths the manifest's own resolution fields name**
 * (`main` / `types` / `typings`), and **a ROOT DOCUMENT the manifest's `files` row declares** — a declaration, a
 * readme and a change list are artefacts a consumer receives rather than modules the entry imports, so "nothing
 * imports it" is not a defect when it is one of these. **The list is DERIVED from the manifest and never
 * hand-typed**, so a package that declares a second non-code artefact admits it here by declaring it.
 *
 * **⟶ AND THE FOURTH SOURCE IS THE RELEASE NOTES' OWN, 2026-10-28 — `DEF-AC` (a).** `RELEASE-NOTES.md` rides no
 * tarball while `files` does not name it, and npm's own always-included set stops at `README*`/`LICEN[CS]E*`, so
 * the change list could not be admitted by the three sources above. **THE DERIVED RULE: a `files` row naming a
 * ROOT-LEVEL DOCUMENT (a `.md` / `.markdown` / `.txt` file at the package root, present on disk) is a declared
 * documentation artefact** — it names no module, imports nothing, and is the class the guide's own landing was
 * admitted by. **IT IS A RULE AND NOT A LIST OF ONE NAME**: a second shipped document is admitted by being
 * declared, and a `src/`-shaped row or a code file is NOT admissible this way (the wholesale-`src/` control
 * below still reports its four `.rs` files as over-packed).
 */
export function declaredNonCodeMembers(packageDir, manifest) {
  const allowed = new Set(['package.json']);
  for (const child of children(packageDir)) {
    if (child.isDir) continue;
    if (ALWAYS_INCLUDED.some((pattern) => pattern.test(child.name))) allowed.add(child.name);
  }
  for (const field of ['main', 'types', 'typings']) {
    const value = manifest?.[field];
    if (typeof value === 'string' && value !== '') allowed.add(value.replace(/^\.\//, ''));
  }
  // THE ROOT DOCUMENTS A `files` ROW DECLARES — see the fourth source above.
  for (const row of Array.isArray(manifest?.files) ? manifest.files : []) {
    if (typeof row !== 'string') continue;
    const member = row.replace(/^\.\//, '');
    if (member === '' || member.includes('/') || member.includes('*') || member.includes('?')) continue;
    if (!/\.(md|markdown|txt)$/i.test(member)) continue;
    if (!existsSync(join(packageDir, member))) continue;
    allowed.add(member);
  }
  return allowed;
}

/** The one specifier form this walk follows: a RELATIVE `from '…'`, `import '…'`, `import('…')` or
 *  `require_('…')`. Bare specifiers are a platform package's name and are not this package's bytes. */
const RELATIVE_SPECIFIER = /(?:^|[^\w$.])(from|import|require_?)\s*\(?\s*(['"])(\.\.?\/[^'"\n]+)\2/g;

/**
 * **THE REACHABLE SET — the transitive closure of the relative specifiers carried by the given roots**, each
 * resolved from the file that carries it, except `require_`, which resolves from the hub's directory because
 * that is the module the `createRequire(import.meta.url)` call belongs to.
 *
 * **A SPECIFIER THAT DOES NOT RESOLVE ON DISK THROWS AND IS NOT A VERDICT**: a graph that is not closed in the
 * CHECKOUT is a staging fault of this instrument's subject, and reporting it as `missing` would blame the
 * manifest for a file that does not exist anywhere.
 */
export function reachableMembers(packageDir, roots = [HUB_RELATIVE_PATH, BARREL_RELATIVE_PATH]) {
  const queue = roots.map((root) => posix.normalize(root.replace(/^\.\//, '')));
  const members = new Set();
  const edges = [];
  while (queue.length > 0) {
    const relativePath = queue.shift();
    if (members.has(relativePath)) continue;
    members.add(relativePath);
    const absolute = join(packageDir, ...relativePath.split('/'));
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      throw instrumentFailure(
        `the reachable file '${relativePath}' does not exist at ${absolute} — the module graph is not closed in the `
        + 'CHECKOUT, which is a staging fault and never a publish verdict',
      );
    }
    const bytes = readFileSync(absolute, 'utf8');
    RELATIVE_SPECIFIER.lastIndex = 0;
    let match = null;
    while ((match = RELATIVE_SPECIFIER.exec(bytes)) !== null) {
      const keyword = match[1];
      const specifier = match[3];
      const base = keyword.startsWith('require') ? posix.dirname(HUB_RELATIVE_PATH) : posix.dirname(relativePath);
      const target = posix.normalize(posix.join(base, specifier));
      if (target.startsWith('..') || posix.isAbsolute(target)) {
        throw instrumentFailure(
          `'${relativePath}' carries ${keyword} '${specifier}', which resolves OUTSIDE the package root ('${target}') `
          + '— a published module cannot reach a file no tarball of this package can carry',
        );
      }
      if (!existsSync(join(packageDir, ...target.split('/')))) {
        throw instrumentFailure(
          `'${relativePath}' carries ${keyword} '${specifier}', which resolves to '${target}' from `
          + `${base === '.' ? 'the hub' : `'${base}'`} — and that file DOES NOT EXIST in the checkout, so the graph `
          + 'is not closed on disk (a staging fault, never a publish verdict)',
        );
      }
      edges.push({ from: relativePath, keyword, specifier, target });
      if (!members.has(target)) queue.push(target);
    }
  }
  return { members: [...members].sort(), edges };
}

/**
 * **THE MEASUREMENT, IN BOTH DIRECTIONS, AS DATA.** Nothing is written, nothing is thrown on a verdict, and the
 * manifest is taken as an OBJECT rather than read from the package — which is the lever a control needs, since
 * the only way to show this instrument can fail is to hand it a manifest that is wrong.
 */
export function measurePackedClosure(packageDir, manifest, options = {}) {
  const packed = packedMembers(packageDir, manifest?.files);
  const { members: reachable, edges } = reachableMembers(packageDir, options.roots);
  const allowedNonCode = declaredNonCodeMembers(packageDir, manifest);
  const packedSet = new Set(packed);
  const reachableSet = new Set(reachable);
  // (1) the load-blocker: an imported file the tarball does not carry
  const missing = reachable.filter((member) => !packedSet.has(member));
  // (2) the other half of `D-4`: a packed member nothing imports and that is not a declared non-code artefact
  const overPacked = packed.filter((member) => !reachableSet.has(member) && !allowedNonCode.has(member));
  return {
    packed,
    reachable,
    edges,
    allowedNonCode: [...allowedNonCode].sort(),
    missing,
    overPacked,
    verdict: missing.length === 0 && overPacked.length === 0 ? 'PASS' : 'FAIL',
  };
}

/** The verdict, printed so a failure names the sets rather than the intention. */
export function describeClosure(measured) {
  return [
    `verdict: ${measured.verdict}`,
    `packed (${measured.packed.length}): ${JSON.stringify(measured.packed)}`,
    `reachable (${measured.reachable.length}): ${JSON.stringify(measured.reachable)}`,
    `declared non-code (${measured.allowedNonCode.length}): ${JSON.stringify(measured.allowedNonCode)}`,
    `MISSING from the packed set (${measured.missing.length}): ${JSON.stringify(measured.missing)}`
    + ' — every one of these is imported by the published module and absent from the tarball, so a consumer\'s '
    + 'first import fails with ERR_MODULE_NOT_FOUND',
    `PACKED BUT UNREACHABLE (${measured.overPacked.length}): ${JSON.stringify(measured.overPacked)}`
    + ' — packed by an allowlist row, imported by nothing, and not a declared non-code artefact',
  ].join('\n  ');
}
