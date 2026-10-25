#!/usr/bin/env node
// =============================================================================
//  scripts/stage-addon.mjs — STAGE THE BUILT CDYLIB AT THE ENTRY'S RUNG-TWO PATH
// =============================================================================
//
//  WHY THIS FILE EXISTS, AND THE DEFECT IT CLOSES
//  ---------------------------------------------------------------------------
//  `npm run build` built the binding crate's cdylib and STAGED NOTHING. The
//  entry resolves its addon on three rungs (`bindings/js/src/entry/artefact.mjs`,
//  the resolution rule's block); rung two is the MODULE-RELATIVE artefact, and on
//  this checkout it is the only rung that can load, because the five platform
//  packages are not installed here. Its path is computed by `bindings/js/index.mjs`
//  from the entry's own `import.meta.url` — never from an environment variable, a
//  configuration key or the working directory (`PUB-DD-20`).
//
//  So with no `.node` at that path the entry throws its declared absent-addon form
//  (`FilePathUnreachable`) at `storeCreate`, and the whole JS battery — which drives
//  the addon through the entry — is red. MEASURED ON THIS TREE, before this step
//  existed: with the artefact moved aside, `npm run build` exits 0 and produces no
//  artefact, and `npm test` is 775 tests / 144 pass / 631 fail. What the build does
//  emit is the workspace root's cdylib (`target/release/libstoreroom_js_binding.so`,
//  `D-34`: a member's target directory is the workspace root's), which nothing on
//  the checkout path copied to where the entry looks. THE BUILD WAS GREEN AND THE
//  TREE WAS 82% RED, and a stage step that silently no-ops would be the same defect
//  wearing a different name — hence every failure below is a REFUSAL.
//
//  WHAT THIS FILE IS AND IS NOT
//  ---------------------------------------------------------------------------
//  It is the checkout's developer build step only: it copies one file inside the
//  repository, into `bindings/js/build/`, which is GITIGNORED (`bindings/js/.gitignore`
//  `:/build/`). It is NOT a packaging step — the package's `files` allowlist is
//  untouched and the main package still ships NO `.node`; the platform packages are
//  what carry the artefact (`D-12`). It is NOT a second resolution rule: it reads the
//  spelling FROM THE ENTRY and writes at exactly the path the entry computes.
//
//  AND IT DOES NOT REPLACE `scripts/publish.sh`'s OWN STAGING STEP, which is the
//  release runbook's and stays where it is; this one exists so that the plain
//  developer command produces the artefact its own battery sits on.
// =============================================================================

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/// **THE REPOSITORY ROOT IS THIS FILE'S OWN PARENT'S PARENT** — `scripts/` is beside the root manifest,
/// so the script is location-independent: it is run from `npm run build` at the repository root, and it
/// must produce the same answer if a developer runs `node scripts/stage-addon.mjs` from anywhere.
const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/// **THE ENTRY IS THE ONE SOURCE OF THE ARTEFACT'S SPELLING**, and it is read here rather than restated:
/// `index.mjs` computes `ADDON_PATH` from its own module URL with `join(...)`, and the trailing string
/// literals of that call are the segments this script reproduces. A path copied into this file would be a
/// second spelling that can drift from the one the load path actually requires — which is precisely how
/// the artefact came to be produced at a path nobody looked at.
const ENTRY = join(REPO_ROOT, 'bindings', 'js', 'index.mjs');

/// A REFUSAL, AND IT IS ALWAYS LOUD: a message on stderr naming the subject, the paths and what must be
/// true for the step to proceed, then a non-zero exit. **NO PATH IN THIS FILE NO-OPS.**
function refuse(message) {
  process.stderr.write(`stage-addon: REFUSED — ${message}\n`);
  process.exit(1);
}

/// **THE RUNG-TWO PATH, READ FROM THE ENTRY'S OWN BYTES** (`bindings/js/index.mjs`'s `ADDON_PATH`).
/// The whole `ADDON_PATH` assignment is taken one line at a time — the entry states it on one line — and
/// its trailing quoted segments are the path below the entry's own directory. **A SHAPE THIS READ CANNOT
/// ANSWER IS A REFUSAL AND NOT A GUESS**: an absent assignment, an assignment carrying no quoted segment,
/// or a final segment that is not a `.node` file all stop the build, because the alternative is staging a
/// file at a path the load path does not read.
function artefactSegments() {
  if (!existsSync(ENTRY)) {
    refuse(`the entry is not on the tree: ${relative(REPO_ROOT, ENTRY)} is the module the artefact path is `
      + 'read from, and it must exist for this step to know where to stage.');
  }
  const source = readFileSync(ENTRY, 'utf8');
  const site = /^\s*(?:const|let)\s+ADDON_PATH\s*=\s*join\(([^\n]*)\)\s*;/m.exec(source);
  if (site === null) {
    refuse(`the entry declares no \`ADDON_PATH = join(...)\` assignment this step can read: `
      + `${relative(REPO_ROOT, ENTRY)}. The artefact path is the ENTRY'S OWN and this script reproduces it `
      + 'rather than restating it, so the assignment must stand as one line of that module — '
      + "`const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', "
      + "'<name>.node');` — for `npm run build` to stage the artefact the load path reads.");
  }
  // The call's QUOTED arguments, in order: `dirOf(fileURLToPath(import.meta.url))` is not one, so what is
  // taken is exactly the path below the entry's own directory.
  const segments = [...site[1].matchAll(/'([^']*)'|"([^"]*)"/g)].map((m) => m[1] ?? m[2]);
  if (segments.length === 0) {
    refuse(`the entry's \`ADDON_PATH\` assignment carries no quoted path segment this step can read: `
      + `${relative(REPO_ROOT, ENTRY)}. The assignment must name the artefact's path relative to the `
      + "entry's own directory as string literals — `'build', 'Release', '<name>.node'`.");
  }
  const last = segments[segments.length - 1];
  if (!last.endsWith('.node')) {
    refuse(`the entry's \`ADDON_PATH\` ends at \`${last}\`, which is not a \`.node\` file: the rung-two `
      + `artefact the resolution ladder requires is a Node-API addon beside the entry, not this. Read at `
      + `${relative(REPO_ROOT, ENTRY)}.`);
  }
  return segments;
}

/// **THE BUILT LIBRARY'S NAME, TAKEN FROM THE ENTRY'S ARTEFACT NAME** — the crate's library target is the
/// package name with `-` mapped to `_` (`storeroom-js-binding` → `storeroom_js_binding`), and the entry's
/// artefact carries that same stem as `<stem>.node`. So the source library is derived from the one name
/// the load path already fixes rather than from a second literal in this file.
function libraryStem(segments) {
  const file = segments[segments.length - 1];
  return { artefact: file, stem: file.slice(0, -'.node'.length) };
}

/// **THE HOST'S OWN LIBRARY EXTENSION, AND ITS PREFIX RULE, AT THE THREE DECLARED HOSTS**
/// (`process.platform`): Linux gives `lib<stem>.so`, macOS `lib<stem>.dylib`, and Windows `<stem>.dll` with
/// no `lib` prefix. `npm run build` is a DEVELOPER command and must work wherever a developer is; this
/// step therefore asks the HOST rather than assuming the one host it was written on.
function hostLibraryName(stem) {
  if (process.platform === 'win32') return `${stem}.dll`;
  if (process.platform === 'darwin') return `lib${stem}.dylib`;
  return `lib${stem}.so`;
}

/// **THE DIRECTORIES THE BUILT CDYLIB CAN STAND IN, IN THE ORDER CARGO WOULD HAVE WRITTEN IT.** `D-34`'s
/// workspace puts a member's target directory at the WORKSPACE ROOT, so `target/release/` is the answer on
/// this tree; `CARGO_TARGET_DIR` is consulted first because cargo honours it and a developer who sets it
/// gets a build somewhere else. **`bindings/js/target/release/` IS DELIBERATELY ABSENT**: it is where a
/// pre-workspace build left a library, and reading it would stage that stale library silently — the exact
/// silent-staleness shape `scripts/publish.sh` removed its own `|| true` for.
function sourceDirectories() {
  const dirs = [];
  if (process.env.CARGO_TARGET_DIR) {
    dirs.push(resolve(REPO_ROOT, process.env.CARGO_TARGET_DIR, 'release'));
  }
  dirs.push(join(REPO_ROOT, 'target', 'release'));
  return dirs;
}

const segments = artefactSegments();
const { artefact, stem } = libraryStem(segments);
const entryDir = dirname(ENTRY);
const destination = join(entryDir, ...segments);
const library = hostLibraryName(stem);

// ---------------------------------------------------------------------------------------------
// THE SOURCE — FOUND OR REFUSED, NEVER ASSUMED
// ---------------------------------------------------------------------------------------------
const tried = sourceDirectories().map((dir) => join(dir, library));
const source = tried.find((path) => existsSync(path));
if (source === undefined) {
  refuse(`the built library \`${library}\` is not on the tree, so there is nothing to stage at `
    + `\`${relative(REPO_ROOT, destination)}\`. The step's source is the BINDING CRATE'S cdylib, built by `
    + "`npm run build`'s second half into the workspace root's target directory (`D-34`: a member's "
    + 'target directory is the workspace root\'s). Looked for, in order:\n'
    + tried.map((path) => `    ${path}`).join('\n')
    + `\nand none exists. A stage step that no-ops over a missing library is the defect this file closes, `
    + 'so this is a refusal: run the binding crate\'s build, then this step again.');
}

// ---------------------------------------------------------------------------------------------
// THE STAGE — THE DIRECTORY IS CREATED, THE COPY IS VERIFIED, AND THE RESULT IS NAMED
// ---------------------------------------------------------------------------------------------
// `bindings/js/build/` is GITIGNORED, so a clean clone has neither it nor `build/Release/`: the build
// must create the artefact's directory before it writes into it.
mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);

// **THE COPY IS VERIFIED RATHER THAN REPORTED** — the byte count is read back from the staged file and
// compared with the source's, so a truncated or empty stage is a refusal and not a green line.
const sourceBytes = statSync(source).size;
const stagedBytes = statSync(destination).size;
if (stagedBytes !== sourceBytes) {
  refuse(`the staged artefact does not match its source: copied ${sourceBytes} bytes to `
    + `\`${relative(REPO_ROOT, destination)}\` and the staged file reads ${stagedBytes}.`);
}
if (stagedBytes === 0) {
  refuse(`the staged artefact is EMPTY (0 bytes): \`${relative(REPO_ROOT, destination)}\` was copied from `
    + `\`${relative(REPO_ROOT, source)}\`, which the binding crate's build produced as an empty file.`);
}

process.stdout.write(`stage-addon: staged ${relative(REPO_ROOT, source)} (${stagedBytes} bytes) -> `
  + `${relative(REPO_ROOT, destination)} — the entry's rung-two artefact\n`);
