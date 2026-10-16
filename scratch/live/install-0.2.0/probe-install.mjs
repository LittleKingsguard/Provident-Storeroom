// LIVE / INSTALL PROBE — reads the INSTALLED bytes only (never the checkout).
// Run from scratch/live/install-0.2.0.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = path.resolve('.');
const MAIN = path.join(ROOT, 'node_modules/provident-storeroom');
const PLAT = path.join(ROOT, 'node_modules/@auspicion/provident-storeroom-js-linux-x64-gnu');

const j = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const mainPkg = j(path.join(MAIN, 'package.json'));
const platPkg = j(path.join(PLAT, 'package.json'));

console.log('=== MAIN MANIFEST (installed) ===');
console.log('path            :', path.join(MAIN, 'package.json'));
console.log('name            :', mainPkg.name);
console.log('version         :', JSON.stringify(mainPkg.version));
console.log('optionalDeps    :', JSON.stringify(mainPkg.optionalDependencies));
const pins = Object.values(mainPkg.optionalDependencies);
console.log('all five pins == 0.2.0 :', pins.length === 5 && pins.every((v) => v === '0.2.0'));

console.log('\n=== PLATFORM MANIFEST (installed, the one npm actually placed) ===');
console.log('path            :', path.join(PLAT, 'package.json'));
console.log('name            :', platPkg.name);
console.log('version         :', JSON.stringify(platPkg.version));
console.log('main            :', platPkg.main);
console.log('os/cpu/libc     :', JSON.stringify([platPkg.os, platPkg.cpu, platPkg.libc]));

console.log('\n=== THE RUNGS, AS THE INSTALLED TREE ANSWERS THEM ===');
// rung one: is the scoped platform package resolvable AT THE PACKAGE ROOT of the installed main package?
const req = createRequire(path.join(MAIN, 'index.mjs'));
const RUNG_ONE_NAME = '@auspicion/provident-storeroom-js-linux-x64-gnu';
let rungOne = 'THREW';
try {
  const c = req(RUNG_ONE_NAME);
  rungOne = `RESOLVED -> exports=${Object.keys(c).sort().join(',')}`;
  console.log('rung one (' + RUNG_ONE_NAME + ') :', rungOne);
  console.log('rung one resolved path          :', req.resolve(RUNG_ONE_NAME));
  console.log('rung one artefact version()     :', JSON.stringify(c.version()));
  console.log('rung one version() typeof       :', typeof c.version());
  console.log('rung one version() chars        :', [...String(c.version())].map((ch) => `${ch}:U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(' '));
  console.log('rung one artefact byte size     :', fs.statSync(req.resolve(RUNG_ONE_NAME)).size);
} catch (e) {
  console.log('rung one (' + RUNG_ONE_NAME + ') : THREW', e && e.code, e && e.message);
}

// rung two: the module-relative ADDON_PATH — does the INSTALLED package carry it?
const rungTwoPath = path.join(MAIN, 'build', 'Release', 'storeroom_js_binding.node');
console.log('rung two (module-relative)      :', rungTwoPath, fs.existsSync(rungTwoPath) ? 'EXISTS' : 'ABSENT (rung one is the rung that stands)');

// the package's own version() surface, driven through the INSTALLED entry
const PKG = await import(path.join(MAIN, 'index.mjs'));
console.log('\n=== THE INSTALLED ENTRY, DRIVEN ===');
console.log('namespace      :', JSON.stringify(Object.keys(PKG).sort()));
const d = fs.mkdtempSync('/tmp/install-probe-');
const s = PKG.storeCreate({ filePath: path.join(d, 's.json'), journalLength: 8, listeners: [] });
console.log('storeCreate    : OK, members=', JSON.stringify(Object.getOwnPropertyNames(s).sort()));

// the artefact itself, reached the way the entry reaches it (rung one), and its version()
const addon = req(RUNG_ONE_NAME);
console.log('artefact version() === main manifest version :', addon.version() === mainPkg.version, JSON.stringify(addon.version()), '===', JSON.stringify(mainPkg.version));
console.log('artefact exports :', JSON.stringify(Object.keys(addon).sort()));
fs.rmSync(d, { recursive: true, force: true });
