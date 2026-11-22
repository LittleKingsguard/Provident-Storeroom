#!/usr/bin/env node
// =================================================================================================
// **⟶ `scripts/build-wasm-package.mjs` — THE SIXTH PACKAGE'S BUILD — 2026-11-17** (`D-157` item 1:
// the second realm ships as a sixth package beside the five platform siblings; `D-154` item 1).
//
// **WHAT IT DOES, IN ORDER, AND NOTHING ELSE.** `cargo build --release --target wasm32-unknown-unknown`
// for the addon crate · `wasm-bindgen --target web` over the built module into the package's own
// directory, which is where the `.wasm` and its glue land · **a copy of the shared body** (`src/entry/**`
// and `src/constraint-kernel.mjs`), because this package must be SELF-CONTAINED: it imports the parts
// from its own `src/entry/`, and the main package's `exports` map exposes none of them · and the two
// housekeeping bytes the five siblings carry (`LICENSE` and `README.md`) so the package publishes the
// same licence and the same front page.
//
// **THE DECLARATION IS NOT WRITTEN HERE.** `scripts/emit-declarations.mjs` owns both arms and takes the
// output directory as its argument, so the WASM arm's `index.d.ts` is that script's emission and not this
// one's — one generator, one source, two arms (`D-155` item 2).
//
// **IT IS A SEPARATE SCRIPT AND NOT PART OF `build`**: the main package's build must not require a
// `wasm32` toolchain (`D-154` item 4's other direction — a Node consumer has no reason to carry one).
// **Every environment fact it needs is named when it is missing**, and it exits nonzero rather than
// producing a half-package.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = join(root, 'bindings', 'wasm');
const target = join(root, 'target', 'wasm32-unknown-unknown', 'release', 'storeroom_js_binding.wasm');
const cli = join(root, '.cargo-home', 'bin', 'wasm-bindgen');
const cargoHome = process.env.CARGO_HOME ?? join(root, '.cargo-home');

function fail(message) { process.stderr.write(`build-wasm-package: ${message}\n`); process.exit(1); }

if (!existsSync(join(pkg, 'package.json'))) fail(`${join(pkg, 'package.json')} is absent`);
if (!existsSync(cli)) fail(`${cli} is absent — install it with \`cargo install wasm-bindgen-cli --version <the crate's pin> --root .cargo-home\``);

// 1 · the crate, for the target
execFileSync('cargo', ['build', '--offline', '--release', '--target', 'wasm32-unknown-unknown', '--manifest-path', join(root, 'bindings', 'js', 'Cargo.toml')], { cwd: root, env: { ...process.env, CARGO_HOME: cargoHome }, stdio: 'inherit' });
if (!existsSync(target)) fail(`${target} is absent after the build`);

// 2 · the glue, into the package's own directory — and the OLD glue is removed first so a renamed
// export cannot survive a rebuild
for (const stale of ['storeroom_js_binding.js', 'storeroom_js_binding_bg.wasm', 'storeroom_js_binding.d.ts', 'storeroom_js_binding_bg.wasm.d.ts']) {
  rmSync(join(pkg, stale), { force: true });
}
execFileSync(cli, ['--target', 'web', '--out-dir', pkg, target], { cwd: root, stdio: 'inherit' });

// 2b · **THE PACKAGE'S ENTRY IS COMPOSED FROM THE TRACKED FORK AND NEVER STORED TWICE.** The fork lives at
// `bindings/js/wasm/index.wasm.mjs` (the one tracked copy, `D-157` item 1) and this package's entry is that file with
// its five `../src/` specifiers read as `./src/` — **so there is ONE fork in the repository and the package's copy is
// a build output**. A second tracked copy would be a copy that could drift from the one the tests drive.
const fork = readFileSync(join(root, 'bindings', 'js', 'wasm', 'index.wasm.mjs'), 'utf8');
writeFileSync(join(pkg, 'index.mjs'), fork.replaceAll("from '../src/", "from './src/"));

// 3 · the shared body, copied — this package's own `src/entry/` and the kernel barrel
rmSync(join(pkg, 'src'), { recursive: true, force: true });
mkdirSync(join(pkg, 'src', 'entry'), { recursive: true });
cpSync(join(root, 'bindings', 'js', 'src', 'entry'), join(pkg, 'src', 'entry'), { recursive: true });
cpSync(join(root, 'bindings', 'js', 'src', 'constraint-kernel.mjs'), join(pkg, 'src', 'constraint-kernel.mjs'));

// 4 · the housekeeping bytes the five siblings carry
for (const name of ['LICENSE']) cpSync(join(root, name), join(pkg, name), { force: true });
const readme = join(root, 'bindings', 'js', 'README.md');
if (existsSync(readme)) cpSync(readme, join(pkg, 'README.md'), { force: true });

// 5 · **THE DECLARATION: THE GENERATOR'S WASM ARM BECOMES THIS PACKAGE'S `index.d.ts`** (`D-155` item 2's second
// arm; `D-157` item 2 of its unsettled — *"this row gives it a home and not a filename"*). **THE GENERATOR EMITS
// BOTH ARMS UNDER FIXED NAMES AND NEITHER OF THOSE NAMES IS THIS PACKAGE'S**: its two files are `index.d.ts` (the
// NODE arm's bytes) and `index.wasm.d.ts` (the region's body replaced by `filePath?: never`), and **THIS package's
// one declaration is the SECOND of them**. So the WASM arm is installed under the name this package's `exports` and
// `types` field point at, and the Node arm — which describes a build this package is not — does not ship here.
// **ONE GENERATOR, ONE SOURCE, TWO ARMS, AND EACH PACKAGE TAKES THE ARM THAT DESCRIBES IT.**
execFileSync(process.execPath, [join(root, 'scripts', 'emit-declarations.mjs'), pkg], { cwd: root, stdio: 'inherit' });
const wasmArm = readFileSync(join(pkg, 'index.wasm.d.ts'), 'utf8');
writeFileSync(join(pkg, 'index.d.ts'), wasmArm);
rmSync(join(pkg, 'index.wasm.d.ts'), { force: true });

const manifest = JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf8'));
writeFileSync(join(pkg, 'BUILD-INFO.txt'), `${manifest.name} ${manifest.version}\nbuilt from the checkout at ${root}\nwasm-bindgen ${JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf8')).devDependencies?.['wasm-bindgen'] ?? '(pinned by the crate)'}\n`);
process.stdout.write(`build-wasm-package: ${manifest.name} @ ${manifest.version} — staged in ${pkg}\n`);
