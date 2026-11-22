#!/usr/bin/env node
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE `greens` LEG'S CHAIN — DISCOVERED FROM THE TREE, NEVER LISTED BY HAND.
//
// **WHAT THIS FILE IS.** `npm run greens` used to name its runners one by one:
// `node tests/e2e/greens.mjs && node tests/e2e/live-drive.mjs && node tests/e2e/file-tier-save/scenarios.mjs`.
// **A HAND-MAINTAINED LIST OF RUNNERS IS THE SHAPE THAT ROTTED ON THIS PROJECT THREE TIMES ALREADY** — the
// allowlist count, the hand-transcribed status census, and `ENTRY_NAMES` — and the cost of this one was named
// by the examiner: `tests/e2e/blind-constraints-v2.mjs`, the largest blind instrument in the project (125
// cells), **was in NO LEG AT ALL**, because a list written before it existed could not name it. So the chain
// DERIVES its member set from the tree, and a runner added later is picked up with **no edit to any list**.
//
// **THE DISCOVERY RULE, STATED ON EVIDENCE. THERE ARE TWO PREDICATES AND BOTH ARE DERIVED, NOT NAMED.**
//
//   (1) THE SCOPE IS THE TREE's. A candidate is a regular `*.mjs` file under `tests/e2e/` at depth `1` or `2`
//       (`tests/e2e/*.mjs` and `tests/e2e/*/*.mjs`). That is the battery's own home and nothing outside it.
//
//   (2) A RUNNER DECLARES ITS OWN EXIT ARM — AND THAT IS `D-21`'s CONTRACT, NOT A NAMING CONVENTION.
//       `strata/decisions.md` `D-21` (2026-10-24): *"A runner whose cells are red, or whose cells never ran,
//       may not exit `0`."* **Every reporting runner this project has therefore CARRIES ITS RED AT ITS OWN
//       EXIT CODE, AT MODULE SCOPE** — a top-level `process.exit(...)` or `process.exitCode = ...` line. A
//       shared helper (`*-support.mjs`, the route-neutral libraries `module-set.mjs` / `pack-reachability.mjs`)
//       and every `*.test.mjs` module has **no such line**: they are imported, never run, and `node:test` owns
//       their exit code. **MEASURED OVER THE WHOLE SCOPE, THIS PREDICATE SELECTS EXACTLY THE TEN RUNNERS ON
//       DISK AND NOTHING ELSE** — the report prints the set, the selector, and every candidate it REJECTED
//       with the reason, so a reader can check the rule against the tree at a glance.
//       **AND IT IS A DERIVATION FROM A DECLARED REQUIREMENT, NOT A DECORATION**: a runner that does not
//       declare an exit arm is already in breach of `D-21`, and the discovery reports it rather than running
//       it silently as green.
//
//   (3) AND A PATH ANOTHER DECLARED LEG OWNS IS NOT OURS. The partition between the legs is read **OUT OF
//       `package.json` ITSELF**: each `scripts.*` entry other than `greens` is parsed for the module paths and
//       globs it names, and those files are removed from the candidate set. **THAT IS WHAT KEEPS THE INSTALLED
//       BATTERY OUT OF THIS CHAIN**: `scripts.test:e2e` names `tests/e2e/installed/live-install.mjs`, so the
//       installed layer stays the `test:e2e` leg's and is not double-counted here; `scripts.test` globs
//       `tests/**/*.test.mjs`, so every `node:test` file stays that leg's. **When a future leg is declared in
//       the manifest, its runner leaves this chain with no edit to this file.**
//
// **THE CHAIN'S SEMANTICS ARE THE `&&` SEMANTICS IT REPLACES.** The discovered runners run SEQUENTIALLY, in
// path order, each with the repository root as its working directory; **the FIRST non-zero exit STOPS the
// chain and the chain exits non-zero with that code.** A discovered runner that fails therefore fails the
// chain — the one property the `&&` spelling had and this one keeps.
//
//   run:    npm run greens          (the chain; exits non-zero iff a discovered runner did)
//   list:   node scripts/greens-chain.mjs --list     (the discovered set, the selector and the rejections)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.dirname(HERE);

/** `D-21`'s own mark: a module-scope exit arm. The line must BEGIN the line — a `process.exit` inside a
 *  function or an `if` block is not the runner's own arm (and no helper in the scope carries one at all). */
const EXIT_ARM = /^process\.(exit|exitCode)\b/;

/** The tokens a manifest script names that could be module paths or globs. */
function moduleTokens(script) {
  const tokens = [];
  for (const raw of String(script).split(/\s+/)) {
    const token = raw.replace(/^['"]|['"]$/g, '');
    if (token === '' || token.startsWith('-') || token.startsWith('|') || token === '&&') continue;
    if (!/\.m?js$/.test(token) && !token.includes('*')) continue;
    tokens.push(token);
  }
  return tokens;
}

/**
 * THE FILES THE *OTHER* DECLARED LEGS OWN, read out of the manifest at `root` and nowhere else.
 * `greens` itself is skipped: it is this chain, and it names no runner.
 */
export function otherLegFiles(root = REPO_ROOT) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const owned = new Map();
  for (const [name, script] of Object.entries(pkg.scripts ?? {})) {
    if (name === 'greens') continue;
    for (const token of moduleTokens(script)) {
      if (token.includes('*')) {
        // A GLOB IS EXPANDED BY THE SAME ENGINE THE LEG USES, so the exclusion set is the leg's file set.
        const matches = fs.globSync(token, { cwd: root });
        for (const match of matches) owned.set(path.resolve(root, match), name);
        continue;
      }
      owned.set(path.resolve(root, token), name);
    }
  }
  return owned;
}

/** Every `*.mjs` candidate in the scope, at depth 1 or 2, in path order. */
function candidates(root) {
  const scope = path.join(root, 'tests', 'e2e');
  const out = [];
  for (const entry of fs.readdirSync(scope, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.mjs')) out.push(path.join(scope, entry.name));
    if (entry.isDirectory()) {
      for (const inner of fs.readdirSync(path.join(scope, entry.name), { withFileTypes: true })) {
        if (inner.isFile() && inner.name.endsWith('.mjs')) out.push(path.join(scope, entry.name, inner.name));
      }
    }
  }
  return out.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * THE DISCOVERED RUNNER SET, with the selector that chose each one and the reason each rejection was
 * rejected. Nothing here names a runner.
 */
export function discover(root = REPO_ROOT) {
  const ownedByAnotherLeg = otherLegFiles(root);
  const runners = [];
  const rejected = [];
  for (const file of candidates(root)) {
    const absolute = path.resolve(file);
    const relative = path.relative(root, absolute).split(path.sep).join('/');
    if (ownedByAnotherLeg.has(absolute)) {
      rejected.push({ file: relative, why: `owned by another declared leg (scripts.${ownedByAnotherLeg.get(absolute)})` });
      continue;
    }
    const text = fs.readFileSync(absolute, 'utf8');
    const arm = text.split('\n').find((line) => EXIT_ARM.test(line));
    if (arm === undefined) {
      rejected.push({ file: relative, why: 'declares no module-scope exit arm (D-21) — imported, never run' });
      continue;
    }
    runners.push({ file: relative, selectedBy: `D-21 exit arm: ${arm.trim()}` });
  }
  return { runners, rejected };
}

/**
 * THE CHAIN. Sequential, `&&`-ordered, stop at the first failure. Returns the chain's exit code.
 * Exported so the failure arm can be PROVEN against a scratch tree rather than asserted.
 */
export function runChain(runners, { root = REPO_ROOT, spawn = spawnSync } = {}) {
  for (let i = 0; i < runners.length; i += 1) {
    const runner = runners[i];
    console.log('');
    console.log(`════════ [${i + 1}/${runners.length}] ${runner} ════════`);
    const result = spawn(process.execPath, [path.join(root, runner)], { cwd: root, stdio: 'inherit' });
    const code = typeof result.status === 'number' ? result.status : 1;
    if (code !== 0) {
      console.log('');
      console.log(`CHAIN BROKEN AT ${runner} — exit ${code}; the ${runners.length - i - 1} runner(s) after it were NOT reached (the && semantics discovery preserves)`);
      return code;
    }
  }
  console.log('');
  console.log(`CHAIN COMPLETE — ${runners.length} discovered runner(s), every one exit 0`);
  return 0;
}

export function main(argv = process.argv.slice(2), root = REPO_ROOT) {
  const { runners, rejected } = discover(root);
  if (argv.includes('--list')) {
    console.log(`DISCOVERED RUNNERS (${runners.length}) — the rule: a tests/e2e/**/*.mjs file at depth 1 or 2 that declares its own module-scope exit arm (D-21) and is not owned by another declared leg:`);
    for (const runner of runners) console.log(`  ${runner.file}\n      selected by ${runner.selectedBy}`);
    console.log('');
    console.log(`NOT RUNNERS (${rejected.length}) — every candidate the rule rejected, with the reason:`);
    for (const entry of rejected) console.log(`  ${entry.file} — ${entry.why}`);
    return 0;
  }
  if (runners.length === 0) {
    console.log('NO RUNNER DISCOVERED — an empty chain is NOT a green leg (D-21); check tests/e2e/ and the manifest');
    return 1;
  }
  return runChain(runners.map((r) => r.file), { root });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  process.exit(main());
}
