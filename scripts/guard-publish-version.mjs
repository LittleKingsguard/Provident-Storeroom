#!/usr/bin/env node
// =====================================================================================================
// `scripts/guard-publish-version.mjs` — THE PRE-PUBLISH GUARD, AS A SCRIPT AND NOT AS SHELL
// =====================================================================================================
//
// **WHY THIS FILE EXISTS, AT ITS OWN HISTORY — THREE FAILURES IN A ROW, EACH MINE AND EACH FOUND IN CI**
// (`strata/decisions.md` · `D-201` and its follow-ups):
//
//   1. `require('bindings/js/...')` — **a `require` argument that does not begin with `./`, `../` or `/` is a MODULE SPECIFIER**, so node
//      went looking for a *package* by that name and threw `MODULE_NOT_FOUND` in one second;
//   2. a line whose string closed with `"` and was followed by a stray `)` — **a shell syntax error two lines below** where the string
//      left open;
//   3. and the whole guard was **bash**, which the `windows-2022` leg runs as **PowerShell**: `>/dev/null 2>&1` and `if …; then` are not
//      PowerShell, and the run died with *"Missing '(' after 'if' in if statement."*
//
// **THE THREE HAVE ONE CAUSE: LOGIC WRITTEN IN A SHELL THAT THE MATRIX DOES NOT SHARE.** So the logic moves here, where there is **one
// implementation for every leg**, no quoting to balance, and a body that can be **run locally before a tag is moved** — which is the thing
// all three failures had in common: **none of them could be exercised without a release.**
//
// **THE TWO QUESTIONS IT ANSWERS, AND THE THIRD IT REFUSES TO GUESS** (`D-201`, `D-199`):
//
//   * **DOES THE NAME EXIST?** A name that has never been published has **no trusted publisher** (that configuration is per package), so
//     the OIDC exchange cannot authorize it: **the job stops BEFORE it builds anything**, and the message names the bootstrap.
//   * **IS THIS VERSION ALREADY THERE?** npm refuses a republished version, so **a re-run must SKIP what already published and complete
//     the rest** — that is the recovery arm a partial release needs (`PUB-DD-5`).
//   * **AND AN ASK THAT FAILED IS NOT AN ANSWER** (`D-21`): a `npm view` that could not reach the registry is **NOT** "the package is
//     absent". The script distinguishes a determinate miss (`E404`) from a failed read, and **refuses on the second**.
//
// **IT ADDS NO SECRET**: `npm view` is a public read. **IT TOUCHES NO NETWORK BEYOND THAT READ.**

import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** The refusals and misses npm signals, read from its own output rather than assumed. */
const MISS = /E404|404 Not Found|is not in this registry/i;
const NETWORK = /EAI_AGAIN|ENOTFOUND|ETIMEDOUT|ECONNREFUSED|ECONNRESET|network|socket hang up|getaddrinfo/i;

/** One `npm view <spec> version`, answered or refused — never guessed. */
function view(spec) {
  try {
    return { answer: 'present', value: execFileSync('npm', ['view', spec, 'version'], { encoding: 'utf8', stdio: 'pipe' }).trim() };
  } catch (failure) {
    const said = `${failure.stdout ?? ''}${failure.stderr ?? ''}`;
    if (MISS.test(said)) return { answer: 'absent', said };
    if (NETWORK.test(said)) return { answer: 'failed', said };
    return { answer: 'failed', said };
  }
}

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/guard-publish-version.mjs <package-dir>');
  process.exit(2);
}

const manifest = JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8'));
const { name, version } = manifest;
const out = process.env.GITHUB_OUTPUT;
const setSkip = (value) => {
  if (out) appendFileSync(out, `skip=${value}\n`);
};

console.log(`guard: ${name}@${version}  (manifest at ${dir})`);

const nameAsk = view(name);
if (nameAsk.answer === 'failed') {
  console.error("REFUSED: the registry could not be read, and AN ASK THAT FAILED IS NOT AN ANSWER (D-21).");
  console.error(`  npm said: ${String(nameAsk.said).trim().split('\n').slice(-3).join(' | ')}`);
  console.error('  This guard will not decide that a package is absent, or that it is present, from a read that did not answer.');
  process.exit(1);
}
if (nameAsk.answer === 'absent') {
  console.error(`REFUSED: '${name}' does not exist on the registry, so it has NO TRUSTED PUBLISHER and this job cannot publish it.`);
  console.error("  Trusted publishing is configured PER PACKAGE, so a NEW artefact's first publish is a BOOTSTRAP and not an OIDC publish:");
  console.error('  publish the name ONCE with a credential, configure its trusted publisher at npmjs.org, and re-run this job.');
  console.error('  docs/specs/storeroom-publish/contract.md · PUB-DD-30 · strata/decisions.md · D-201.');
  process.exit(1);
}

console.log(`ok ${name} is published (latest ${nameAsk.value}); its trusted publisher can be configured`);
const versionAsk = view(`${name}@${version}`);
if (versionAsk.answer === 'failed') {
  console.error('REFUSED: the version read did not answer, so this guard will not decide whether the version exists (D-21).');
  console.error(`  npm said: ${String(versionAsk.said).trim().split('\n').slice(-3).join(' | ')}`);
  process.exit(1);
}
if (versionAsk.answer === 'present') {
  setSkip('true');
  console.log(`ok ${name}@${version} already exists — the publish step is SKIPPED`);
  console.log('  (npm refuses a republished version, so a re-run COMPLETES what is missing instead of failing on what already published;');
  console.log('   the artefact is still built, assembled and guarded by the steps around this one)');
} else {
  setSkip('false');
  console.log(`ok ${name}@${version} is not published yet — the publish step runs`);
}
