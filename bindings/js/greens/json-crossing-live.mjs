#!/usr/bin/env node
// ============================================================================
// THE LIVE RUN for `U-STOREROOM-JSON-CROSSING` — the blind greens set
// `docs/specs/storeroom-json-crossing-greens.md` (`67` cells, `§A`–`§G`)
// driven against the RUNNING PACKAGE, over a REAL store on REAL disk.
//
//   the set:      docs/specs/storeroom-json-crossing-greens.md
//   the contract: docs/specs/storeroom-json-crossing/contract.md §1–§9
//   this runner:  bindings/js/greens/json-crossing-live.mjs
//   the report:   docs/specs/storeroom-json-crossing-live-report.md
//
// WHAT THIS RUNNER IS. An INDEPENDENT live re-drive of the set's `67` cells, plus (from 2026-10-24) the
// `A149` re-derivation cells. It imports the package the way a consumer reaches it — the ENTRY MODULE
// (`bindings/js/index.mjs`, or an installed copy of the published tarball,
// selected by `JC_ENTRY`) — loaded against the REAL built native addon
// (`build/Release/storeroom_js_binding.node`, reported below from
// `/proc/self/maps`), and it drives a REAL store over REAL files on a REAL
// disk (a per-cell `fs.mkdtempSync` directory, removed at the end of the run).
//
// THE SCENARIO RULE THIS RUNNER BINDS ITSELF TO (the live battery's own):
//   1. EVERY cell starts from a REAL USER INPUT — a caller's value handed to
//      the public surface — and runs to the FINAL RESOLVED STATE.
//   2. EVERY ROUND-TRIP CELL ENDS AT THE SETTLED STATE:
//        create a store over a real path  →  `write` the value through the
//        public surface (the package's own commit route, whose terminal arm
//        is the act that writes `cfg.filePath`)  →  REOPEN a fresh instance
//        over that same path  →  `read` the value back  →  assert the same
//        bare tree AND that the store's own file on disk exists and carries
//        that bare tree.
//   3. EVERY REFUSAL CELL ends at ITS settled state: the write throws the
//      declared refusal, the store's file(s) on disk are BYTE-IDENTICAL, a
//      fresh instance over that path reads an EMPTY register, and the refused
//      address answers `AddressNotFound` (nothing landed as data).
//   4. A LIVE RESULT THAT CONTRADICTS THE GREENS IS A FINDING. It is recorded
//      and reported; no green is weakened and no implementation byte is edited.
//
// THE LAYER LABEL. `JC_REACH` names the reach this run exercised:
//   LIVE/CHECKOUT  — the checkout's entry module + the checkout-built addon.
//   LIVE/INSTALLED — the entry module and kernel bytes of the PUBLISHED
//                    tarball (`npm pack` of `bindings/js`, installed into a
//                    temp project), with the native addon supplied from the
//                    checkout build (the tarball carries no addon; the
//                    published platform packages are not available offline).
//                    The label says exactly that; the report repeats it.
//
// THE RE-DRIVE (2026-10-24, after the architect's ruling `A149`). The gate-6 battery's ONE live finding
// (`LIVE-B54` / `JC-B54`: a nesting of `128` ADMITTED in memory, its commit throwing `FileCommitFailed`, the
// store file left at `0` bytes and a fresh boot answering `AddressNotFound`) was ruled by the architect at
// `docs/decisions.md` · `A149`: **the operative admission depth is `126` ON BOTH ROUTES, `127` and beyond is
// REFUSED AT THIS PACKAGE'S WALK — before any store verb — with the class `a value over the walk ceiling` and
// the status `ValueRefusedAtBoundary`, and the node range is `0…999,999` (`1,000,000` refused as the same
// class).** **The greens writer re-derived the set's `§D` cells to those figures** (`docs/specs/
// storeroom-json-crossing-greens.md`, `§D`'s `⟶ AMENDED 2026-10-23 (A149)` clause: `JC-B54` reads `126`
// ADMITTED + committed + reopened; `JC-B55` reads `127` REFUSED at the walk, explicitly NOT `FileCommitFailed`;
// `JC-B56` reads `999,999` ADMITTED and `1,000,000` refused at the root — no cell added, none removed), **and
// this runner drives the re-derived observables at their SETTLED state** (a real store, the package's own commit
// route, a fresh instance reopened over the same `store.json`). **One `A149` cell of this runner's own is
// driven beside them: `LIVE-R1` at depth `128` — the crate's CONVERSION bound — whose only live answer is now
// the same walk refusal (`A149` (2): `127` *"and beyond"*).** The pre-`A149` text (`128` admitted, `1,000,001`
// refused) and the finding's own failure state are recorded in the report, not driven here. **Nothing is
// weakened: every other cell of the `67` stands exactly as the first battery drove it.**
//
// HOUSE FORM (the corpus's own):
//   RESULT <id> <verdict> :: <one-line scenario> :: green=<cell(s)> :: <detail>
//   verdicts: PASS | FAIL | FINDING | OBSERVED
//     PASS      — the cell's declared observable AND its settled state hold.
//     FAIL      — the greens' own observable was NOT produced.
//     FINDING   — the greens' observable held on the in-memory route, but the
//                 SETTLED state (the round trip the live battery demands)
//                 contradicts the cell's claim. Reported, never repaired.
//     OBSERVED  — a live observation of this runner's own, recorded not
//                 asserted; not one of the greens' `67` cells.
//
// THE CENSUS (re-drive). `70` cells = the `67` greens cells + ONE `A149` cell of this runner's own
// (`LIVE-R1`, depth `128` — the crate's CONVERSION bound, refused at this walk) + `2` observations
// (`LIVE-X1`, `LIVE-X2`).
//
// RUN:  node bindings/js/greens/json-crossing-live.mjs
// EXIT: 0 iff no cell FAILed and no cell was a FINDING.
// ============================================================================

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENTRY = process.env.JC_ENTRY ?? path.join(HERE, '..', 'index.mjs');
const KERNEL = process.env.JC_KERNEL ?? path.join(HERE, '..', 'src', 'constraint-kernel.mjs');
const REACH = process.env.JC_REACH ?? 'LIVE/CHECKOUT';

const PKG = await import(ENTRY);
const K = await import(KERNEL);

// ─────────────────────────────────────────────────────────────────────────────
// §0. THE DECLARED SPELLINGS — each read from the documents, none invented
// ─────────────────────────────────────────────────────────────────────────────

// PART ONE — the store generator's own bytes (`contract.md §2.1`,
// `parameter-semantics.md §3` item 1, `native contract.md §8.2`).
const PART_ONE =
  'is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays';
// PART TWO — the package's appended clause (`contract.md §2.1`,
// `parameter-semantics.md §3` item 2).
const ROOT_POSITION = "the write's value argument";
const partTwo = (position, cls) => `, the value at ${position} is ${cls}`;

// THE SIXTEEN CLASS SPELLINGS — `contract.md §2`'s table, verbatim.
const CLASS = {
  null: 'null',
  undefined: 'undefined',
  function: 'a function',
  symbol: 'a symbol',
  symbolKey: 'a value carrying a Symbol-keyed own member',
  bigint: 'a bigint',
  nonFinite: 'a non-finite number',
  ceiling: 'a value over the walk ceiling',
  loneSurrogate: 'a string carrying a lone surrogate',
  cyclic: 'a value that contains itself',
  proxy: 'a Proxy',
  arraySubclass: 'a class extending Array',
  nonPlain: 'a class instance or another prototype-carrying non-plain object',
  accessor: 'a value carrying an own accessor member',
  sparse: 'a sparse array',
};
const STATUS = 'ValueRefusedAtBoundary';

// The ceilings — RE-DERIVED 2026-10-24 by `A149` (`docs/decisions.md`), read at its bytes.
// **THE OPERATIVE ADMISSION CEILING IS THE STORE'S PERSISTENT `126`, ON BOTH ROUTES — a value the file tier
// cannot commit is never admitted in the first place.** The crate's `128` remains the CONVERSION's own bound
// (`bindings/js/src/crossing.rs`'s `depth > 128`) and is carried here only so the superseded declaration is
// driven as the REFUSAL it now is. The node ceiling is unmoved at `1,000,000`, counted with the root, so the
// admitted node range is `0…999,999`.
const OPERATIVE_DEPTH_CEILING = 126;
const CONVERSION_DEPTH_CEILING = 128;
const NODE_CEILING = 1_000_000;
const NODE_ADMITTED_MAX = NODE_CEILING - 1; // the walk counts its root as its first node

// ─────────────────────────────────────────────────────────────────────────────
// §1. THE HARNESS — temp stores, the commit route, the tree equality, refusals
// ─────────────────────────────────────────────────────────────────────────────

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), `jcx-${REACH.replace(/[^a-z0-9]+/gi, '-')}-`));
const PATHS = new Map(); // cell id -> the exact `cfg.filePath` used
const RESULTS = [];

let CURRENT = null;

function cell(spec, body) {
  CURRENT = spec;
  let green;
  let settled;
  let verdict;
  let detail;
  try {
    const r = body();
    green = r.green ?? { ok: true, detail: '' };
    settled = r.settled;
    if (!green.ok) {
      verdict = 'FAIL';
      detail = green.detail;
    } else if (settled && !settled.ok) {
      verdict = 'FINDING';
      detail = `green-observable OK (${green.detail}); SETTLED STATE FAILS: ${settled.detail}`;
    } else {
      verdict = 'PASS';
      detail = settled ? `${green.detail}; ${settled.detail}` : green.detail;
    }
  } catch (error) {
    verdict = 'FAIL';
    detail = `UNDECLARED THROW: ${describe(error)}`;
  }
  RESULTS.push({ id: spec.id, verdict, detail });
  console.log(`RESULT ${spec.id} ${verdict} :: ${spec.scenario} :: green=${spec.green} :: ${detail}`);
  CURRENT = null;
  return verdict;
}

function observedCell(spec, body) {
  CURRENT = spec;
  let value;
  try {
    value = body();
    RESULTS.push({ id: spec.id, verdict: 'OBSERVED', detail: value });
    console.log(`RESULT ${spec.id} OBSERVED :: ${spec.scenario} :: green=${spec.green} :: ${value}`);
  } catch (error) {
    RESULTS.push({ id: spec.id, verdict: 'OBSERVED', detail: `observation threw: ${describe(error)}` });
    console.log(`RESULT ${spec.id} OBSERVED :: ${spec.scenario} :: green=${spec.green} :: observation threw: ${describe(error)}`);
  }
  CURRENT = null;
}

/** A per-cell directory under the run's root, named by the cell id. */
function dirFor(id) {
  const d = fs.mkdtempSync(path.join(ROOT, `${id}-`));
  return d;
}

/** The instance the cell drives: a REAL store over a REAL path (`cfg.filePath`). */
function bootStore(filePath) {
  return PKG.storeCreate({ filePath, journalLength: 8, listeners: [] });
}

/**
 * The public write, followed to the act that writes `cfg.filePath`: the
 * package's own commit route — `K.commit` reaches `write` (`surface.md §2.2`),
 * `K.runAttempt` is the terminal arm whose act is the store's `commit_file`
 * (`surface.md §2.11` clause 2). Both are members of the shipped package
 * (`package.json`'s `files` carries `src/constraint-kernel.mjs`).
 */
function writeAndCommit(store, address, value) {
  const record = K.commit(store, address, 'file', value);
  return K.runAttempt(store, record);
}

/**
 * THE SETTLED ROUND TRIP — create over a real path, write and commit, reopen a
 * fresh instance over the same path, read back. Returns every observable.
 */
function roundTrip(id, value, address = ['a']) {
  const dir = dirFor(id);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(id, filePath);
  const store = bootStore(filePath);
  const fileBefore = fs.readFileSync(filePath, 'utf8');
  const record = writeAndCommit(store, address, value);
  const bytes = fs.readFileSync(filePath, 'utf8');
  const image = bytes.length > 0 ? JSON.parse(bytes) : null;
  const fresh = bootStore(filePath);
  const back = fresh.read(address, 'file');
  const register = fresh.read([]);
  return { dir, filePath, store, record, bytes, image, fresh, back, register, fileBefore };
}

/** The image's value at an address (an address of segments over the parsed image). */
function imageAt(image, address) {
  let node = image;
  for (const segment of address) {
    if (node === null || typeof node !== 'object') return undefined;
    node = node[segment];
  }
  return node;
}

/**
 * The value tree's own equality — `contract.md §1`: an object's member SET is
 * what matters (order not significant), array INDEX ORDER is, a number is
 * compared with `Object.is` (so a surviving `-0` is a difference), and
 * prototypes are not part of the tree.
 */
function sameTree(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a === 'number' || typeof b === 'number') return Object.is(a, b);
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;
  if (aIsArray) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(a, i) || !Object.prototype.hasOwnProperty.call(b, i)) return false;
      if (!sameTree(a[i], b[i])) return false;
    }
    return true;
  }
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  for (let i = 0; i < aKeys.length; i += 1) {
    if (aKeys[i] !== bKeys[i]) return false;
    if (!sameTree(a[aKeys[i]], b[bKeys[i]])) return false;
  }
  return true;
}

const short = (value, max = 150) => {
  const text = typeof value === 'string' ? JSON.stringify(value) : describe(value);
  return text.length > max ? `${text.slice(0, max)}…` : text;
};

function describe(value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'symbol') return String(value);
  if (typeof value === 'function') return 'a function';
  if (typeof value === 'number') return Object.is(value, -0) ? '-0' : String(value);
  if (value instanceof Error) return `${value.constructor.name}: ${value.message}`;
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if ('status' in value || 'message' in value) {
      return `thrown{${keys.join(',')}} status=${JSON.stringify(value.status)} message=${short(value.message, 120)}`;
    }
    try {
      return JSON.stringify(value);
    } catch {
      return `object{${keys.join(',')}}`;
    }
  }
  return `${typeof value} ${String(value)}`;
}

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return { ok: false, error };
  }
}

const isAddressNotFound = (r) =>
  r.ok === false && r.error !== null && typeof r.error === 'object' && r.error.status === 'AddressNotFound';

/**
 * Read a refusal: the STATUS, PART ONE and PART TWO, as `contract.md §2` and
 * `§2.1` declare them. `position` is either an exact spelling or the token
 * `'declared-value'` — a DECLARED value position per `parameter-semantics.md §2`
 * (the root, or a member path with non-empty segments), which is the reading
 * `contract.md §2`'s `value` position column supports.
 */
function refusalAnswer(error) {
  if (error === null || typeof error !== 'object') return { ok: false, why: `not a thrown object: ${describe(error)}` };
  const message = error.message;
  if (typeof error.status !== 'string') return { ok: false, why: `status is not a string: ${describe(error)}` };
  if (typeof message !== 'string' || message.length === 0) return { ok: false, why: `message is not a non-empty string: ${describe(error)}` };
  const marker = ', the value at ';
  const at = message.lastIndexOf(marker);
  if (at < 0) return { ok: false, why: `PART TWO is absent: ${short(message, 200)}` };
  const tail = message.slice(at + marker.length);
  return {
    ok: true,
    status: error.status,
    message,
    partOne: message.slice(0, at),
    positionAndClass: tail,
  };
}

function isDeclaredValuePosition(position) {
  if (position === ROOT_POSITION) return true;
  const prefix = 'member ';
  const suffix = ` of ${ROOT_POSITION}`;
  if (!position.startsWith(prefix) || !position.endsWith(suffix)) return false;
  const pathText = position.slice(prefix.length, position.length - suffix.length);
  if (pathText.length === 0) return false;
  return pathText.split('/').every((segment) => segment.length > 0);
}

/**
 * Assert one of the sixteen refusals at its declared position, and its settled
 * state (nothing landed, the file unchanged, a fresh boot empty).
 */
function refusalChecks(run, { cls, position, exactMessage = null, form = false, notStatus = null }) {
  const problems = [];
  const { r } = run;
  if (r.ok) {
    problems.push(`the write was ADMITTED (returned ${short(r.value)})`);
    return { ok: false, detail: problems.join('; ') };
  }
  const answer = refusalAnswer(r.error);
  if (!answer.ok) {
    problems.push(answer.why);
    return { ok: false, detail: problems.join('; ') };
  }
  if (answer.status !== STATUS) problems.push(`status=${JSON.stringify(answer.status)} (declared ${STATUS})`);
  // **THE RULING'S OWN NEGATIVE (`A149` (2)): the depth refusal is the WALK's, never a store-commit answer**
  // (`FileCommitFailed` is the answer the finding filed; it must not be the answer at the settled state).
  if (notStatus !== null && answer.status === notStatus) {
    problems.push(`the refusal is the status ${JSON.stringify(notStatus)} — a store-commit answer, not the walk's`);
  }
  if (!answer.message.includes(PART_ONE)) problems.push(`PART ONE absent: ${short(answer.message, 200)}`);
  const declaredClass = CLASS[cls];
  const tail = answer.positionAndClass;
  if (!tail.endsWith(` is ${declaredClass}`)) {
    problems.push(`PART TWO does not name the class ${JSON.stringify(declaredClass)}: ${short(tail, 200)}`);
  } else {
    const observedPosition = tail.slice(0, tail.length - ` is ${declaredClass}`.length);
    if (position === 'declared-value') {
      if (!isDeclaredValuePosition(observedPosition)) {
        problems.push(`position ${JSON.stringify(observedPosition)} is not a declared value position`);
      }
    } else if (observedPosition !== position) {
      problems.push(`position ${JSON.stringify(observedPosition)} (declared ${JSON.stringify(position)})`);
    }
  }
  if (exactMessage !== null && answer.message !== exactMessage) {
    problems.push(`message is not the declared message character for character: got ${short(answer.message, 300)}`);
  }
  if (form) {
    if (r.error instanceof Error) problems.push('the refusal is an Error instance');
    const proto = Object.getPrototypeOf(r.error);
    if (proto !== Object.prototype && proto !== null) problems.push('the refusal is not a caller-realm plain object');
  }
  if (run.after !== run.before) problems.push('the store file CHANGED on a refused write');
  if (!run.register.ok) problems.push(`the fresh boot threw: ${describe(run.register.error)}`);
  else if (!sameTree(run.register.value, {})) problems.push(`the fresh boot's register is not empty: ${short(run.register.value)}`);
  if (run.readAt && !isAddressNotFound(run.readAt)) {
    problems.push(`the refused address does not answer AddressNotFound: ${describe(run.readAt.ok ? run.readAt.value : run.readAt.error)}`);
  }
  return {
    ok: problems.length === 0,
    detail: problems.length === 0
      ? `status=${answer.status}${notStatus ? ` (not ${notStatus})` : ''} class=${JSON.stringify(declaredClass)} position=${JSON.stringify(
        tail.slice(0, tail.length - ` is ${declaredClass}`.length))} fileUnchanged=true register={}`
      : problems.join('; '),
    answer,
    run,
  };
}

/**
 * The refusal run: the value is handed to the public `write` of a REAL store on
 * a REAL path; the file's bytes and a FRESH boot's register are the settled state.
 */
function refusalRun(id, value, address = ['a']) {
  const dir = dirFor(id);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(id, filePath);
  const store = bootStore(filePath);
  const before = fs.readFileSync(filePath, 'utf8');
  const r = attempt(() => store.write(address, 'file', value));
  const after = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const register = attempt(() => fresh.read([]));
  const readAt = attempt(() => fresh.read(address, 'file'));
  return { dir, filePath, store, before, after, r, register, readAt, fresh };
}

/** The settled-state half of an admitted round trip: the value AND the file's image. */
function settledChecks(trip, expected, address = ['a']) {
  const problems = [];
  if (!trip.record || typeof trip.record !== 'object') problems.push('the commit returned no record');
  else if (trip.record.outcome !== 'passed') problems.push(`the commit's outcome is ${JSON.stringify(trip.record.outcome)}`);
  if (trip.bytes.length === 0) problems.push('the store file on disk is EMPTY — nothing was written');
  if (trip.image === null) problems.push('the store file on disk is not a JSON image');
  else if (!sameTree(imageAt(trip.image, address), expected)) {
    problems.push(`the image's value at ${JSON.stringify(address)} is not the bare tree: ${short(imageAt(trip.image, address))}`);
  }
  if (!sameTree(trip.back, expected)) problems.push(`read-back is not the same bare tree: ${short(trip.back)}`);
  const expectedRegister = {};
  expectedRegister[address[0]] = expected;
  if (!sameTree(trip.register, expectedRegister)) {
    problems.push(`the fresh boot's register is not the bare tree: ${short(trip.register)}`);
  }
  return {
    ok: problems.length === 0,
    detail: problems.length === 0
      ? `file=${trip.bytes.length}B image=${short(imageAt(trip.image, address), 90)} read-back=${short(trip.back, 90)}`
      : problems.join('; '),
  };
}

function nesting(depth) {
  let value = 0;
  for (let i = 0; i < depth; i += 1) value = [value];
  return value;
}

// ─────────────────────────────────────────────────────────────────────────────
// §2. THE RUN'S OWN IDENTITY — the reach, the entry, the kernel, the run's root
// ─────────────────────────────────────────────────────────────────────────────

console.log(`REACH ${REACH}`);
console.log(`ENTRY ${ENTRY}`);
console.log(`KERNEL ${KERNEL}`);
console.log(`NODE ${process.version} platform=${process.platform} arch=${process.arch}`);
console.log(`STORE-ROOT ${ROOT}`);
console.log(`STORE-PATTERN ${ROOT}/<cell-id>/store.json`);

// ═════════════════════════════════════════════════════════════════════════════
// §3. GROUP §A — the admitted tree, both directions, with nesting and deep copy
// ═════════════════════════════════════════════════════════════════════════════

cell({
  id: 'LIVE-B01', green: 'JC-B01', scenario: "write 'x' at ['a'], commit, reopen, read ['a']",
}, () => {
  const value = 'x';
  const trip = roundTrip('LIVE-B01', value);
  const green = { ok: trip.back === 'x', detail: `read-back=${JSON.stringify(trip.back)}` };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B02', green: 'JC-B02', scenario: 'a multi-byte string and an astral pair, written and read back across the reopen',
}, () => {
  // A multi-byte string (U+00B5 U+20AC U+591A U+2603) and an astral pair
  // (U+1D11E U+1F600) — the pair is TWO code units in JS and ONE scalar value.
  const strings = {
    multi: String.fromCharCode(0x00b5, 0x20ac, 0x591a, 0x2603),
    astral: String.fromCodePoint(0x1d11e, 0x1f600),
  };
  const trip = (() => {
    const dir = dirFor('LIVE-B02');
    const filePath = path.join(dir, 'store.json');
    PATHS.set('LIVE-B02', filePath);
    const store = bootStore(filePath);
    writeAndCommit(store, ['multi'], strings.multi);
    writeAndCommit(store, ['astral'], strings.astral);
    const bytes = fs.readFileSync(filePath, 'utf8');
    const image = JSON.parse(bytes);
    const fresh = bootStore(filePath);
    return { dir, filePath, bytes, image, back: { multi: fresh.read(['multi'], 'file'), astral: fresh.read(['astral'], 'file') }, fresh };
  })();
  const problems = [];
  if (trip.back.multi !== strings.multi) problems.push(`multi-byte string differs: ${short(trip.back.multi)}`);
  if (trip.back.astral !== strings.astral) problems.push(`astral pair differs: ${short(trip.back.astral)}`);
  const settledProblems = [];
  if (imageAt(trip.image, ['multi']) !== strings.multi) settledProblems.push('the image does not carry the multi-byte string');
  if (imageAt(trip.image, ['astral']) !== strings.astral) settledProblems.push('the image does not carry the astral pair');
  if (trip.bytes.length === 0) settledProblems.push('the store file on disk is EMPTY');
  return {
    green: { ok: problems.length === 0, detail: problems.length === 0 ? `both strings cross byte for byte (${trip.back.astral.length} code units)` : problems.join('; ') },
    settled: { ok: settledProblems.length === 0, detail: settledProblems.length === 0 ? `file=${trip.bytes.length}B carries both strings` : settledProblems.join('; ') },
  };
});

cell({
  id: 'LIVE-B03', green: 'JC-B03', scenario: 'the empty string, written and read back across the reopen',
}, () => {
  const value = '';
  const trip = roundTrip('LIVE-B03', value);
  const green = { ok: trip.back === '', detail: `read-back=${JSON.stringify(trip.back)}` };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B04', green: 'JC-B04', scenario: 'true and false, written and read back across the reopen',
}, () => {
  const trip = (() => {
    const dir = dirFor('LIVE-B04');
    const filePath = path.join(dir, 'store.json');
    PATHS.set('LIVE-B04', filePath);
    const store = bootStore(filePath);
    writeAndCommit(store, ['t'], true);
    writeAndCommit(store, ['f'], false);
    const bytes = fs.readFileSync(filePath, 'utf8');
    const fresh = bootStore(filePath);
    return { dir, filePath, bytes, image: JSON.parse(bytes), back: { t: fresh.read(['t'], 'file'), f: fresh.read(['f'], 'file') } };
  })();
  const problems = [];
  if (trip.back.t !== true) problems.push(`true read back as ${short(trip.back.t)}`);
  if (trip.back.f !== false) problems.push(`false read back as ${short(trip.back.f)}`);
  const settledProblems = [];
  if (imageAt(trip.image, ['t']) !== true) settledProblems.push('the image does not carry true');
  if (imageAt(trip.image, ['f']) !== false) settledProblems.push('the image does not carry false');
  return {
    green: { ok: problems.length === 0, detail: problems.length === 0 ? 'true and false both cross as booleans' : problems.join('; ') },
    settled: { ok: settledProblems.length === 0, detail: settledProblems.length === 0 ? `file=${trip.bytes.length}B carries both booleans` : settledProblems.join('; ') },
  };
});

cell({
  id: 'LIVE-B05', green: 'JC-B05', scenario: '0, 1.5, -2, MAX_SAFE_INTEGER, -0.125, 1e300 — each crosses as a finite number and as itself',
}, () => {
  const corpus = [
    ['zero', 0],
    ['fraction', 1.5],
    ['negative', -2],
    ['max-safe', 9007199254740991],
    ['small-fraction', -0.125],
    ['large', 1e300],
  ];
  const dir = dirFor('LIVE-B05');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B05', filePath);
  const store = bootStore(filePath);
  for (const [key, value] of corpus) writeAndCommit(store, [key], value);
  const bytes = fs.readFileSync(filePath, 'utf8');
  const image = JSON.parse(bytes);
  const fresh = bootStore(filePath);
  const problems = [];
  const settledProblems = [];
  const observed = [];
  for (const [key, value] of corpus) {
    const back = fresh.read([key], 'file');
    observed.push(`${key}=${describe(back)}`);
    if (typeof back !== 'number') problems.push(`${key}: crosses as ${typeof back}, not a number`);
    else if (!Number.isFinite(back)) problems.push(`${key}: crosses as a NON-FINITE number`);
    else if (!Object.is(back, value)) problems.push(`${key}: crosses as ${describe(back)}, not ${describe(value)}`);
    if (!sameTree(imageAt(image, [key]), value)) settledProblems.push(`${key}: the image carries ${short(imageAt(image, [key]))}`);
  }
  return {
    green: { ok: problems.length === 0, detail: problems.length === 0 ? `all six cross as finite numbers (${observed.join(', ')})` : problems.join('; ') },
    settled: { ok: settledProblems.length === 0, detail: settledProblems.length === 0 ? `file=${bytes.length}B carries all six as themselves` : settledProblems.join('; ') },
  };
});

cell({
  id: 'LIVE-B06', green: 'JC-B06', scenario: 'the empty array, written and read back across the reopen',
}, () => {
  const value = [];
  const trip = roundTrip('LIVE-B06', value);
  const back = trip.back;
  const green = {
    ok: Array.isArray(back) && back.length === 0 && Object.keys(back).length === 0,
    detail: `read-back array=${Array.isArray(back)} length=${Array.isArray(back) ? back.length : 'n/a'}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B07', green: 'JC-B07', scenario: "[1, 'a', false, [2, [3]], {k:'v'}] — index order preserved across the reopen",
}, () => {
  const value = [1, 'a', false, [2, [3]], { k: 'v' }];
  const trip = roundTrip('LIVE-B07', value);
  const green = { ok: sameTree(trip.back, value) && Array.isArray(trip.back), detail: `read-back=${short(trip.back)}` };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B08', green: 'JC-B08', scenario: 'the empty object, written and read back across the reopen',
}, () => {
  const value = {};
  const trip = roundTrip('LIVE-B08', value);
  const back = trip.back;
  const green = {
    ok: back !== null && typeof back === 'object' && !Array.isArray(back) && Object.keys(back).length === 0,
    detail: `read-back=${short(back)}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B09', green: 'JC-B09', scenario: "{a:1, b:'x', c:true, d:[1,2]} — the same member set and values across the reopen",
}, () => {
  const value = { a: 1, b: 'x', c: true, d: [1, 2] };
  const trip = roundTrip('LIVE-B09', value);
  return { green: { ok: sameTree(trip.back, value), detail: `read-back=${short(trip.back)}` }, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B10', green: 'JC-B10', scenario: "{a:[{b:[1,'s',false,{c:'deep'}]}]} — the whole tree crosses",
}, () => {
  const value = { a: [{ b: [1, 's', false, { c: 'deep' }] }] };
  const trip = roundTrip('LIVE-B10', value);
  return { green: { ok: sameTree(trip.back, value), detail: `read-back=${short(trip.back)}` }, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B11', green: 'JC-B11', scenario: 'a plain object built in another realm (node:vm) — admitted and the same tree comes back',
}, () => {
  const foreign = runInNewContext('({ a: 1, b: [2, { c: "x" }] })');
  const realmDiffers = Object.getPrototypeOf(foreign) !== Object.prototype;
  const value = { a: 1, b: [2, { c: 'x' }] };
  const trip = roundTrip('LIVE-B11', foreign);
  const green = {
    ok: realmDiffers && sameTree(trip.back, value),
    detail: `foreign-realm=${realmDiffers} read-back=${short(trip.back)}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B12', green: 'JC-B12', scenario: 'a null-prototype plain object with two members — admitted, the same member set comes back',
}, () => {
  const value = Object.create(null);
  value.u = 1;
  value.w = [true];
  const trip = roundTrip('LIVE-B12', value);
  return { green: { ok: sameTree(trip.back, { u: 1, w: [true] }), detail: `read-back=${short(trip.back)}` }, settled: settledChecks(trip, { u: 1, w: [true] }) };
});

cell({
  id: 'LIVE-B13', green: 'JC-B13', scenario: "an acyclic diamond ({x:s, y:s}) — admitted; shared ancestry is not a cycle",
}, () => {
  const shared = { leaf: 1 };
  const value = { x: shared, y: shared };
  const trip = roundTrip('LIVE-B13', value);
  return { green: { ok: sameTree(trip.back, { x: { leaf: 1 }, y: { leaf: 1 } }), detail: `read-back=${short(trip.back)}` }, settled: settledChecks(trip, { x: { leaf: 1 }, y: { leaf: 1 } }) };
});

cell({
  id: 'LIVE-B14', green: 'JC-B14', scenario: 'write, read, mutate the read result (push into a nested array, add a member), read again — the store is unmoved',
}, () => {
  const value = { k: [1], m: { n: 2 } };
  const trip = roundTrip('LIVE-B14', value);
  const first = trip.fresh.read(['a'], 'file');
  first.k.push(2);
  first.added = true;
  const second = trip.fresh.read(['a'], 'file');
  const green = {
    ok: sameTree(second, value) && first.k !== second.k,
    detail: `second read=${short(second)} (the mutation reached no store-owned data)`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B15', green: 'JC-B15', scenario: 'the diamond read back: the two positions hold their own copies (identity, not serialization)',
}, () => {
  const shared = { leaf: 1 };
  const value = { x: shared, y: shared };
  const trip = roundTrip('LIVE-B15', value);
  const back = trip.back;
  const green = {
    ok: back.x !== back.y && sameTree(back, { x: { leaf: 1 }, y: { leaf: 1 } }),
    detail: `back.x !== back.y: ${back.x !== back.y}`,
  };
  return { green, settled: settledChecks(trip, { x: { leaf: 1 }, y: { leaf: 1 } }) };
});

cell({
  id: 'LIVE-B16', green: 'JC-B16', scenario: 'write {a:{deep:[1]}}, mutate the argument at both depths AFTER the write, commit, read — the mutation is NOT observed',
}, () => {
  const dir = dirFor('LIVE-B16');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B16', filePath);
  const store = bootStore(filePath);
  const value = { a: { deep: [1] } };
  const record = K.commit(store, ['a'], 'file', value); // the walk reads the value here
  value.a.deep.push(2); // after the walk visited it
  value.a.deep = [9]; // replace the member after the visit
  const outcome = K.runAttempt(store, record);
  const bytes = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const back = fresh.read(['a'], 'file');
  const green = {
    ok: sameTree(back, { a: { deep: [1] } }),
    detail: `read-back=${short(back)} (the post-write mutation is not observed)`,
  };
  const settled = {
    ok: outcome.outcome === 'passed' && bytes.length > 0 && sameTree(imageAt(JSON.parse(bytes), ['a']), { a: { deep: [1] } }),
    detail: `outcome=${outcome.outcome} file=${bytes.length}B image=${short(imageAt(JSON.parse(bytes), ['a']), 80)}`,
  };
  return { green, settled };
});

cell({
  id: 'LIVE-B17', green: 'JC-B17', scenario: 'two reads of one stored value — two DISTINCT objects at every level, and the same tree',
}, () => {
  const value = { a: { b: [1, { c: 2 }] } };
  const trip = roundTrip('LIVE-B17', value);
  const first = trip.fresh.read(['a'], 'file');
  const second = trip.fresh.read(['a'], 'file');
  const distinctEverywhere = first !== second
    && first.a !== second.a
    && first.a.b !== second.a.b
    && first.a.b[1] !== second.a.b[1];
  const green = {
    ok: distinctEverywhere && sameTree(first, value) && sameTree(second, value),
    detail: `distinct at every level=${distinctEverywhere} both=${short(first, 80)}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B18', green: 'JC-B18', scenario: 'write {a: nestedArray}, read back — back.a !== nested and back.a[1] !== nested[1]',
}, () => {
  const nested = ['x', { deep: 1 }];
  const value = { a: nested };
  const trip = roundTrip('LIVE-B18', value);
  const back = trip.back;
  const green = {
    ok: back.a !== nested && back.a[1] !== nested[1] && sameTree(back, { a: ['x', { deep: 1 }] }),
    detail: `back.a !== nested: ${back.a !== nested}; back.a[1] !== nested[1]: ${back.a[1] !== nested[1]}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B19', green: 'JC-B19', scenario: 'write {a:[{b:leaf}]}, then mutate leaf and the intermediate array, then read — the stored tree is unmoved at every depth',
}, () => {
  const dir = dirFor('LIVE-B19');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B19', filePath);
  const store = bootStore(filePath);
  const leaf = { v: 1 };
  const middle = [{ b: leaf }];
  const value = { a: middle };
  const record = K.commit(store, ['a'], 'file', value);
  leaf.v = 2;
  middle.push('extra');
  middle[0].b = { v: 3 };
  const outcome = K.runAttempt(store, record);
  const bytes = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const back = fresh.read(['a'], 'file');
  const expected = { a: [{ b: { v: 1 } }] };
  return {
    green: { ok: sameTree(back, expected), detail: `read-back=${short(back)}` },
    settled: {
      ok: outcome.outcome === 'passed' && bytes.length > 0 && sameTree(imageAt(JSON.parse(bytes), ['a']), expected),
      detail: `outcome=${outcome.outcome} file=${bytes.length}B image=${short(imageAt(JSON.parse(bytes), ['a']), 80)}`,
    },
  };
});

// ═════════════════════════════════════════════════════════════════════════════
// §4. GROUP §B — the `-0` pin
// ═════════════════════════════════════════════════════════════════════════════

cell({
  id: 'LIVE-B20', green: 'JC-B20', scenario: 'write -0, commit, reopen, read — 0 comes back and never -0',
}, () => {
  const trip = roundTrip('LIVE-B20', -0);
  const back = trip.back;
  const green = {
    ok: Object.is(back, 0) && !Object.is(back, -0),
    detail: `read-back ${Object.is(back, -0) ? '-0' : describe(back)}; Object.is(back,0)=${Object.is(back, 0)} Object.is(back,-0)=${Object.is(back, -0)}`,
  };
  const settled = settledChecks(trip, 0);
  // the image must spell `0`, not `-0`
  const imageSpelling = trip.bytes.includes('-0') ? 'spells -0' : 'spells 0';
  return {
    green,
    settled: { ok: settled.ok && imageSpelling === 'spells 0', detail: `${settled.detail}; the image ${imageSpelling}` },
  };
});

cell({
  id: 'LIVE-B21', green: 'JC-B21', scenario: '{a: -0, b: [-0, 1]} — the member and the element read back 0; the sibling is unmoved',
}, () => {
  const trip = roundTrip('LIVE-B21', { a: -0, b: [-0, 1] });
  const back = trip.back;
  const green = {
    ok: Object.is(back.a, 0) && !Object.is(back.a, -0) && Array.isArray(back.b) && Object.is(back.b[0], 0) && back.b[1] === 1,
    detail: `a=${describe(back.a)} b[0]=${describe(back.b && back.b[0])} b[1]=${describe(back.b && back.b[1])}`,
  };
  const settled = settledChecks(trip, { a: 0, b: [0, 1] });
  return { green, settled };
});

// ═════════════════════════════════════════════════════════════════════════════
// §5. GROUP §C — the sixteen classes at their declared positions
// ═════════════════════════════════════════════════════════════════════════════

const valueCell = (id, green, scenario, make, cls, extra = {}) => cell({ id, green, scenario }, () => {
  const run = refusalRun(id, make());
  const check = refusalChecks(run, { cls, position: 'declared-value', ...extra });
  return { green: check, settled: null };
});

valueCell('LIVE-B22', 'JC-B22', 'null at the value position', () => null, 'null');
valueCell('LIVE-B23', 'JC-B23', 'undefined at the value position', () => undefined, 'undefined');
valueCell('LIVE-B24', 'JC-B24', 'function () {} at the value position', () => function f() {}, 'function');
valueCell('LIVE-B25', 'JC-B25', "Symbol('s') at the value position", () => Symbol('s'), 'symbol');
valueCell('LIVE-B26', 'JC-B26', "{ [Symbol('s')]: 1 } at the root — the CONTAINING object's position", () => ({ [Symbol('s')]: 1 }), 'symbolKey');

cell({
  id: 'LIVE-B27', green: 'JC-B27 · parameter-semantics.md §3 worked example', scenario: "write {a: 10n} — the message EQUALS the declared worked example, character for character",
}, () => {
  const message = `'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 'a' of the write's value argument is a bigint`;
  const run = refusalRun('LIVE-B27', { a: 10n });
  return { green: refusalChecks(run, { cls: 'bigint', position: "member 'a' of the write's value argument", exactMessage: message }) };
});

valueCell('LIVE-B28', 'JC-B28', 'NaN at the value position', () => NaN, 'nonFinite');

cell({
  id: 'LIVE-B29', green: 'JC-B29', scenario: 'Infinity and -Infinity, both driven — the non-finite class at each',
}, () => {
  const problems = [];
  for (const [name, value] of [['Infinity', Infinity], ['-Infinity', -Infinity]]) {
    const run = refusalRun(`LIVE-B29-${name.replace('-', 'neg')}`, value);
    const check = refusalChecks(run, { cls: 'nonFinite', position: 'declared-value' });
    if (!check.ok) problems.push(`${name}: ${check.detail}`);
  }
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? 'both infinities are refused as a non-finite number at a declared value position' : problems.join(' | ') } };
});

cell({
  id: 'LIVE-B30', green: 'JC-B30', scenario: 'a nesting of 129 — the walk-ceiling class at a DECLARED VALUE POSITION',
}, () => {
  const run = refusalRun('LIVE-B30', nesting(129));
  return { green: refusalChecks(run, { cls: 'ceiling', position: 'declared-value' }) };
});

valueCell('LIVE-B31', 'JC-B31', "a lone surrogate '\\uD800' at a value position", () => '\uD800', 'loneSurrogate');

cell({
  id: 'LIVE-B32', green: 'JC-B32', scenario: "a lone-surrogate member KEY — the declared '<key: …>' position, and the whole value refused",
}, () => {
  const run = refusalRun('LIVE-B32', { '\uD800': 1 });
  const check = refusalChecks(run, {
    cls: 'loneSurrogate',
    position: "member '<key: a string carrying a lone surrogate>' of the write's value argument",
  });
  const readAtAddress = isAddressNotFound(run.readAt);
  return {
    green: {
      ok: check.ok && readAtAddress,
      detail: `${check.detail}; read at the address answers AddressNotFound: ${readAtAddress}`,
    },
  };
});

valueCell('LIVE-B33', 'JC-B33', 'a value that contains itself (c.self = c) at a declared value position', () => {
  const c = {};
  c.self = c;
  return c;
}, 'cyclic');

valueCell('LIVE-B34', 'JC-B34', 'new Proxy({}, {}) at the value position', () => new Proxy({}, {}), 'proxy');
valueCell('LIVE-B35', 'JC-B35', 'new (class extends Array {})() at the value position', () => new (class extends Array {})() , 'arraySubclass');
valueCell('LIVE-B36', 'JC-B36', 'new (class C {})() at the value position', () => new (class C {})() , 'nonPlain');

valueCell('LIVE-B37', 'JC-B37', "an own accessor on the ROOT object — the CONTAINING object's position", () => Object.defineProperty({}, 'a', { get() { return 1; } }), 'accessor');
valueCell('LIVE-B38', 'JC-B38', '[1, , 3] — a sparse array', () => [1, , 3], 'sparse');
valueCell('LIVE-B39', 'JC-B39', 'a Map — a prototype-carrying non-plain object', () => new Map(), 'nonPlain');
valueCell('LIVE-B40', 'JC-B40', "new String('a') — the wrapper is not a primitive", () => new String('a'), 'nonPlain');

cell({
  id: 'LIVE-B41', green: 'JC-B41', scenario: "{a: 10n} — the bigint class at member 'a' of the write's value argument",
}, () => {
  const run = refusalRun('LIVE-B41', { a: 10n });
  return { green: refusalChecks(run, { cls: 'bigint', position: "member 'a' of the write's value argument" }) };
});

cell({
  id: 'LIVE-B42', green: 'JC-B42', scenario: "{a: 1, b: null} — the null class at member 'b'",
}, () => {
  const run = refusalRun('LIVE-B42', { a: 1, b: null });
  return { green: refusalChecks(run, { cls: 'null', position: "member 'b' of the write's value argument" }) };
});

cell({
  id: 'LIVE-B43', green: 'JC-B43', scenario: '[1, null] — the index is BARE: member 1 of the write\'s value argument',
}, () => {
  const run = refusalRun('LIVE-B43', [1, null]);
  return { green: refusalChecks(run, { cls: 'null', position: "member 1 of the write's value argument" }) };
});

cell({
  id: 'LIVE-B44', green: 'JC-B44', scenario: "{a:{b:[0, 10n]}} — member 'a'/'b'/1, segments joined by /, the index bare",
}, () => {
  const run = refusalRun('LIVE-B44', { a: { b: [0, 10n] } });
  return { green: refusalChecks(run, { cls: 'bigint', position: "member 'a'/'b'/1 of the write's value argument" }) };
});

cell({
  id: 'LIVE-B45', green: 'JC-B45', scenario: '{ok: 1, bad: 10n} — the WHOLE value is refused and a read at the address answers AddressNotFound',
}, () => {
  const run = refusalRun('LIVE-B45', { ok: 1, bad: 10n });
  const check = refusalChecks(run, { cls: 'bigint', position: "member 'bad' of the write's value argument" });
  const noMemberLanded = isAddressNotFound(run.readAt);
  return {
    green: {
      ok: check.ok && noMemberLanded,
      detail: `${check.detail}; read at the address answers AddressNotFound: ${noMemberLanded} (no member landed as data)`,
    },
  };
});

cell({
  id: 'LIVE-B46', green: 'JC-B46', scenario: "a lone-surrogate member key beside a good member — the whole value refused, 'ok' is NOT stored alone",
}, () => {
  const run = refusalRun('LIVE-B46', { '\uD800': 1, ok: 2 });
  const check = refusalChecks(run, {
    cls: 'loneSurrogate',
    position: "member '<key: a string carrying a lone surrogate>' of the write's value argument",
  });
  const noMemberLanded = isAddressNotFound(run.readAt);
  return {
    green: {
      ok: check.ok && noMemberLanded,
      detail: `${check.detail}; read at the address answers AddressNotFound: ${noMemberLanded} (the surviving 'ok' member is not stored alone)`,
    },
  };
});

cell({
  id: 'LIVE-B47', green: 'JC-B47', scenario: "{a: {[Symbol('s')]: 1}} — the Symbol-keyed class at member 'a' (the CONTAINING object's position)",
}, () => {
  const run = refusalRun('LIVE-B47', { a: { [Symbol('s')]: 1 } });
  return { green: refusalChecks(run, { cls: 'symbolKey', position: "member 'a' of the write's value argument" }) };
});

cell({
  id: 'LIVE-B48', green: 'JC-B48', scenario: "an own accessor on a MEMBER value — the accessor class at member 'a'",
}, () => {
  const run = refusalRun('LIVE-B48', { a: Object.defineProperty({}, 'x', { get() { return 1; } }) });
  return { green: refusalChecks(run, { cls: 'accessor', position: "member 'a' of the write's value argument" }) };
});

cell({
  id: 'LIVE-B49', green: 'JC-B49', scenario: '[1, new Proxy({}, {})] — the Proxy class at member 1',
}, () => {
  const run = refusalRun('LIVE-B49', [1, new Proxy({}, {})]);
  return { green: refusalChecks(run, { cls: 'proxy', position: "member 1 of the write's value argument" }) };
});

cell({
  id: 'LIVE-B50', green: 'JC-B50', scenario: 'the status is ValueRefusedAtBoundary and is NOT ValueNotAdmitted',
}, () => {
  const run = refusalRun('LIVE-B50', { a: 10n });
  const answer = refusalAnswer(run.r.ok ? run.r.value : run.r.error);
  const ok = !run.r.ok && answer.ok && answer.status === STATUS && answer.status !== 'ValueNotAdmitted';
  return {
    green: {
      ok,
      detail: `status=${JSON.stringify(answer.ok ? answer.status : 'n/a')} (declared ${STATUS}; ValueNotAdmitted is not the answer on this route)`,
    },
  };
});

cell({
  id: 'LIVE-B51', green: 'JC-B51', scenario: "the {a: 10n} message: PART ONE's bytes stand, PART TWO is appended BESIDE them, no unsubstituted placeholder",
}, () => {
  const run = refusalRun('LIVE-B51', { a: 10n });
  const answer = refusalAnswer(run.r.ok ? run.r.value : run.r.error);
  const problems = [];
  const partOne = `'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays`;
  const partTwo = `, the value at member 'a' of the write's value argument is a bigint`;
  if (!answer.ok) problems.push(answer.why);
  else {
    if (answer.partOne !== partOne) problems.push(`PART ONE's bytes moved: ${short(answer.partOne, 200)}`);
    if (answer.positionAndClass !== partTwo.slice(', the value at '.length)) {
      problems.push(`PART TWO is not appended beside PART ONE with no slot between: ${short(answer.positionAndClass, 200)}`);
    }
    if (answer.message !== partOne + partTwo) {
      problems.push(`the message is not exactly PART ONE followed by PART TWO: ${short(answer.message, 240)}`);
    }
    if (/<[^>]*>/.test(answer.message)) problems.push(`an unsubstituted <…> placeholder stands: ${short(answer.message, 200)}`);
  }
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? `message=${short(answer.message, 220)}` : problems.join('; ') } };
});

// ═════════════════════════════════════════════════════════════════════════════
// §6. GROUP §D — the ceilings, driven at the `A149` RE-DERIVED text the greens document now carries: depth
//     `126` ADMITTED on both routes, depth `127` REFUSED at the walk (never a commit failure), and the node
//     boundary `999,999` ADMITTED / `1,000,000` REFUSED at the root. One `A149` cell of this runner's own
//     (`LIVE-R1`) drives depth `128` — the crate's CONVERSION bound — whose only live answer is the same walk
//     refusal. **The pre-`A149` text (`128` admitted, `1,000,001` refused) and the finding's failure state are
//     recorded in the report; they are not the set's text and are not driven here.**
// ═════════════════════════════════════════════════════════════════════════════

/**
 * THE SETTLED STATE OF A WALK REFUSAL (`A149` (2)): the value handed to a REAL store's `write`, the store's
 * file on disk BYTE-IDENTICAL, a FRESH instance over that path reading an EMPTY register and answering
 * `AddressNotFound` at the address — AND the same value handed to the package's OWN COMMIT ROUTE
 * (`K.commit` → `K.runAttempt`), where the walk refuses inside `K.commit` so the commit act NEVER RUNS and
 * `FileCommitFailed` is NEVER the answer. This is the half of the finding's state that must not survive.
 */
function commitRouteRefusal(id, value, address = ['a']) {
  const dir = dirFor(`${id}-commit-route`);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(`${id}-commit-route`, filePath);
  const store = bootStore(filePath);
  const before = fs.readFileSync(filePath, 'utf8');
  const r = attempt(() => writeAndCommit(store, address, value));
  const after = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const register = attempt(() => fresh.read([]));
  const readAt = attempt(() => fresh.read(address, 'file'));
  return { dir, filePath, store, before, after, r, register, readAt, fresh };
}

function walkRefusalSettled(id, value, address = ['a'], position = 'declared-value') {
  const walk = refusalRun(id, value, address);
  const walkCheck = refusalChecks(walk, { cls: 'ceiling', position, notStatus: 'FileCommitFailed' });
  const commit = commitRouteRefusal(id, value, address);
  const problems = [];
  if (commit.r.ok) {
    problems.push(`the package's commit route ADMITTED the value (outcome=${JSON.stringify(commit.r.value && commit.r.value.outcome)})`);
  } else {
    const answer = refusalAnswer(commit.r.error);
    if (!answer.ok) problems.push(`the commit route's refusal: ${answer.why}`);
    else {
      if (answer.status === 'FileCommitFailed') problems.push("the commit route answered FileCommitFailed — the FINDING's state, not the walk refusal");
      else if (answer.status !== STATUS) problems.push(`the commit route's status=${JSON.stringify(answer.status)} (declared ${STATUS})`);
      if (!answer.message.includes(CLASS.ceiling)) problems.push(`the commit route's class is not ${JSON.stringify(CLASS.ceiling)}: ${short(answer.message, 180)}`);
    }
  }
  if (commit.after !== commit.before) problems.push("the store file CHANGED through the package's commit route");
  if (!commit.register.ok) problems.push(`the commit route's fresh boot threw: ${describe(commit.register.error)}`);
  else if (!sameTree(commit.register.value, {})) problems.push(`the commit route's fresh boot register is not empty: ${short(commit.register.value)}`);
  if (!isAddressNotFound(commit.readAt)) {
    problems.push(`the commit route's fresh boot does not answer AddressNotFound: ${describe(commit.readAt.ok ? commit.readAt.value : commit.readAt.error)}`);
  }
  if (!walkCheck.ok) problems.push(walkCheck.detail);
  return {
    ok: problems.length === 0,
    detail: problems.length === 0
      ? `${walkCheck.detail}; commit route THREW ${STATUS} (not FileCommitFailed), fileUnchanged=true, fresh boot AddressNotFound`
      : problems.join('; '),
  };
}

const admittedDepthCell = (id, green, depth, scenario) => cell({ id, green, scenario }, () => {
  const value = nesting(depth);
  // THE GREENS' OWN OBSERVABLE, ON ITS OWN ROUTE: the live package's `write` and `read` (the set's cells use
  // an in-memory instance; the tier is outside this contract's subject, `contract.md §1`'s subject caption).
  const live = bootStore(path.join(dirFor(`${id}-mem`), 'store.json'));
  const walked = attempt(() => {
    live.write(['a'], 'mem', value);
    return live.read(['a']);
  });
  const greenOk = walked.ok && sameTree(walked.value, value);
  const greenHalf = {
    ok: greenOk,
    detail: greenOk
      ? `a nesting of ${depth} is ADMITTED by the live write walk and read back`
      : `the live write walk answered ${walked.ok ? short(walked.value, 80) : describe(walked.error)}`,
  };
  // THE SETTLED STATE: the same value through a REAL store on REAL disk, reopened.
  let settledHalf;
  try {
    const trip = roundTrip(id, value);
    settledHalf = settledChecks(trip, value);
  } catch (error) {
    settledHalf = { ok: false, detail: `the settled round trip THREW: ${describe(error)}` };
  }
  return { green: greenHalf, settled: settledHalf };
});

admittedDepthCell('LIVE-B52', 'JC-B52', 65, 'a nesting of 65 — ADMITTED and it round-trips (the former package bound is not a refusal)');
admittedDepthCell('LIVE-B53', 'JC-B53', 66, 'a nesting of 66 — ADMITTED and it round-trips');

// **⟶ THE `§D` GREENS CELLS AT THEIR `A149` RE-DERIVED TEXT** — the greens writer's amendment of `2026-10-24`
// (`docs/specs/storeroom-json-crossing-greens.md`, `§D`'s `⟶ AMENDED 2026-10-23 (A149)` clause): `JC-B54`
// reads `126` ADMITTED, committed and reopened through a FRESH instance over the same store path; `JC-B55`
// reads `127` REFUSED at the walk, explicitly NOT `FileCommitFailed`; `JC-B56` reads `999,999` ADMITTED and
// `1,000,000` refused at the root. **Each cell is driven at its SETTLED state; the two routes are driven
// wherever the greens text names both.**
cell({
  id: 'LIVE-B54', green: 'JC-B54 (re-derived by A149: depth 126)',
  scenario: 'a nesting of 126 — the operative admission ceiling: ADMITTED on BOTH routes, written → committed → a FRESH instance over the same store.json reads the same tree',
}, () => {
  const value = nesting(OPERATIVE_DEPTH_CEILING);
  // ROUTE ONE — the greens' own route: the live package's `write` and `read` (the set's cells use an in-memory
  // instance; the tier is outside this contract's subject, `contract.md §1`'s subject caption).
  const live = bootStore(path.join(dirFor('LIVE-B54-mem'), 'store.json'));
  const walked = attempt(() => {
    live.write(['a'], 'mem', value);
    return live.read(['a']);
  });
  const memOk = walked.ok && sameTree(walked.value, value);
  // ROUTE TWO — the SETTLED state: the same value through a REAL store on REAL disk, committed, reopened.
  const trip = roundTrip('LIVE-B54', value);
  const green = {
    ok: memOk && sameTree(trip.back, value),
    detail: memOk
      ? `a nesting of ${OPERATIVE_DEPTH_CEILING} is ADMITTED on the mem route and read back`
      : `the mem route answered ${walked.ok ? short(walked.value, 80) : describe(walked.error)}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B55', green: 'JC-B55 (re-derived by A149: depth 127)',
  scenario: 'a nesting of 127 — REFUSED AT THE WALK, BEFORE ANY STORE VERB: status ValueRefusedAtBoundary, class "a value over the walk ceiling", the store bytes unmoved, a fresh instance without the value, and NOT FileCommitFailed',
}, () => {
  const value = nesting(OPERATIVE_DEPTH_CEILING + 1);
  const live = bootStore(path.join(dirFor('LIVE-B55-mem'), 'store.json'));
  const mem = attempt(() => {
    live.write(['a'], 'mem', value);
    return live.read(['a']);
  });
  const settled = walkRefusalSettled('LIVE-B55', value);
  const problems = [];
  if (mem.ok) problems.push('the mem route ADMITTED a nesting of 127');
  else if (mem.error.status !== STATUS) problems.push(`the mem route answered ${describe(mem.error)} (declared ${STATUS})`);
  if (!settled.ok) problems.push(settled.detail);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `mem route THREW ${STATUS}${mem.error.message.includes(CLASS.ceiling) ? ` [class ${JSON.stringify(CLASS.ceiling)}]` : ''}; ${settled.detail}`
        : problems.join('; '),
    },
  };
});

// **`JC-B56`'s RE-DERIVED BOUNDARY — BOTH SIDES INSIDE THE ONE CELL** (`A149` (3); the greens writer's clause:
// *"THE ADMITTED SIDE IS CARRIED INSIDE THIS CELL AND NOT AS A NEW ID"*): `999,999` nodes ADMITTED, committed
// and reopened; `1,000,000` nodes REFUSED as the same class and status at the ROOT value position.
cell({
  id: 'LIVE-B56', green: 'JC-B56 (re-derived by A149: nodes 999,999 / 1,000,000)',
  scenario: 'the node boundary — a dense array of 999,999 elements ADMITTED, committed and reopened; a dense array of 1,000,000 elements REFUSED as the same class and status at the root value position',
}, () => {
  const admitted = new Array(NODE_ADMITTED_MAX).fill(0);
  const trip = roundTrip('LIVE-B56', admitted);
  const back = trip.back;
  const admittedOk = Array.isArray(back)
    && back.length === NODE_ADMITTED_MAX
    && back[NODE_ADMITTED_MAX - 1] === 0
    && sameTree(back, admitted);
  const refused = walkRefusalSettled('LIVE-B56-refused', new Array(NODE_CEILING).fill(0), ['v'], ROOT_POSITION);
  const problems = [];
  if (!admittedOk) {
    problems.push(`the 999,999-element side: read-back length=${back && back.length} last=${back && back[NODE_ADMITTED_MAX - 1]}`);
  }
  if (trip.record && trip.record.outcome !== 'passed') problems.push(`the 999,999-element side's commit outcome is ${JSON.stringify(trip.record.outcome)}`);
  if (!refused.ok) problems.push(refused.detail);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `999,999 ADMITTED and committed (outcome=${JSON.stringify(trip.record && trip.record.outcome)}); 1,000,000 REFUSED: ${refused.detail}`
        : problems.join('; '),
    },
    settled: settledChecks(trip, admitted),
  };
});

// **ONE `A149` CELL OF THIS RUNNER'S OWN — the crate's CONVERSION bound (`127` "and beyond", `A149` (2)).**
// The greens set's boundary cells now stop at `127`; this cell drives depth `128` — the depth the FINDING filed —
// to the same settled refusal, so the finding's own value is measured at the state the ruling gives it.
cell({
  id: 'LIVE-R1', green: '(A149 (2) — no greens cell)',
  scenario: 'a nesting of 128 — the crate\'s CONVERSION bound, REFUSED AT THIS WALK to the same settled state as 127 (never admitted, never a commit failure)',
}, () => {
  const settled = walkRefusalSettled('LIVE-R1', nesting(CONVERSION_DEPTH_CEILING));
  return { green: settled };
});

cell({
  id: 'LIVE-B57', green: 'JC-B57', scenario: 'a dense 10,000-element array — ADMITTED; 10,000 elements read back with the last intact',
}, () => {
  const value = Array.from({ length: 10_000 }, (_, i) => i);
  const trip = roundTrip('LIVE-B57', value);
  const back = trip.back;
  const green = {
    ok: Array.isArray(back) && back.length === 10_000 && back[9_999] === 9_999 && sameTree(back, value),
    detail: `length=${back && back.length} last=${back && back[9_999]}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

// ═════════════════════════════════════════════════════════════════════════════
// §7. GROUP §E — the retired forms, and `null`
// ═════════════════════════════════════════════════════════════════════════════

cell({
  id: 'LIVE-B58', green: 'JC-B58', scenario: 'write a string, read it — the BARE value; no {"v":…} envelope wraps it',
}, () => {
  const trip = roundTrip('LIVE-B58', 'x');
  const back = trip.back;
  const bare = typeof back === 'string' && back === 'x';
  const imageValue = imageAt(trip.image, ['a']);
  const noEnvelope = typeof imageValue === 'string' && imageValue === 'x';
  return {
    green: { ok: bare && noEnvelope, detail: `read-back=${short(back)} image value=${short(imageValue)}` },
    settled: settledChecks(trip, 'x'),
  };
});

cell({
  id: 'LIVE-B59', green: 'JC-B59', scenario: 'write a bigint — the refusal is THROWN and carries no `e` class token (no {"e":…} side-channel)',
}, () => {
  const run = refusalRun('LIVE-B59', 10n);
  const problems = [];
  if (run.r.ok) problems.push('the bigint was ADMITTED');
  else {
    const err = run.r.error;
    if (err === null || typeof err !== 'object') problems.push('the refusal is not an object');
    else {
      if ('e' in err) problems.push(`the thrown object carries an 'e' member: ${short(err.e)}`);
      if ('v' in err) problems.push(`the thrown object carries a 'v' member: ${short(err.v)}`);
      if (typeof err.status !== 'string') problems.push('the thrown object carries no string status');
      if (typeof err.message !== 'string' || err.message.length === 0) problems.push('the thrown object carries no non-empty string message');
    }
  }
  if (run.before !== run.after) problems.push('the store file changed on a refused write');
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? `thrown members=${JSON.stringify(Object.keys(run.r.error))} status=${JSON.stringify(run.r.error.status)}; no e/v token` : problems.join('; ') } };
});

cell({
  id: 'LIVE-B60', green: 'JC-B60', scenario: "a plain object whose own members are v, e, k, L, T — it crosses as DATA; nothing is read as an envelope, a class token or a carrier tag",
}, () => {
  const value = { v: 1, e: 2, k: 's', L: [3], T: { t: 'mem' } };
  const trip = roundTrip('LIVE-B60', value);
  const back = trip.back;
  const green = {
    ok: sameTree(back, value) && Object.keys(back).sort().join(',') === 'L,T,e,k,v',
    detail: `read-back=${short(back)} keys=${JSON.stringify(Object.keys(back).sort())}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

cell({
  id: 'LIVE-B61', green: 'JC-B61', scenario: "JSON.parse('null') written — refused as class null at the root, and not stored",
}, () => {
  const premise = JSON.stringify(null) === 'null';
  const run = refusalRun('LIVE-B61', JSON.parse('null'));
  const check = refusalChecks(run, { cls: 'null', position: ROOT_POSITION });
  return {
    green: {
      ok: premise && check.ok,
      detail: `premise JSON.stringify(null) === 'null': ${premise}; ${check.detail}`,
    },
  };
});

// ═════════════════════════════════════════════════════════════════════════════
// §8. GROUP §F — the carriers this contract does not govern
// ═════════════════════════════════════════════════════════════════════════════

cell({
  id: 'LIVE-B62', green: 'JC-B62', scenario: 'a two-segment address carrier, a single tier token and a tier ARRAY at read — each crosses in its own form and the value is found',
}, () => {
  const dir = dirFor('LIVE-B62');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B62', filePath);
  const store = bootStore(filePath);
  writeAndCommit(store, ['car'], {}); // mint the parent anchor
  writeAndCommit(store, ['car', 'rier'], 'found');
  const bytes = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const viaToken = attempt(() => fresh.read(['car', 'rier'], 'file'));
  const viaArray = attempt(() => fresh.read(['car', 'rier'], ['file']));
  const viaAbsent = attempt(() => fresh.read(['car', 'rier']));
  const parent = attempt(() => fresh.read(['car']));
  const problems = [];
  if (!viaToken.ok || viaToken.value !== 'found') problems.push(`a single tier token: ${viaToken.ok ? short(viaToken.value) : describe(viaToken.error)}`);
  if (!viaArray.ok || viaArray.value !== 'found') problems.push(`a tier ARRAY at read: ${viaArray.ok ? short(viaArray.value) : describe(viaArray.error)}`);
  if (!viaAbsent.ok || viaAbsent.value !== 'found') problems.push(`the absent tier: ${viaAbsent.ok ? short(viaAbsent.value) : describe(viaAbsent.error)}`);
  if (!parent.ok || !sameTree(parent.value, { rier: 'found' })) problems.push(`the parent's value: ${parent.ok ? short(parent.value) : describe(parent.error)}`);
  const imageOk = bytes.length > 0 && sameTree(imageAt(JSON.parse(bytes), ['car', 'rier']), 'found');
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0 ? `two-segment address crosses; found via token=${short(viaToken.value)} via array=${short(viaArray.value)} via absent tier=${short(viaAbsent.value)}` : problems.join('; '),
    },
    settled: { ok: imageOk, detail: imageOk ? `file=${bytes.length}B image carries the nested value` : 'the image does not carry the nested value' },
  };
});

cell({
  id: 'LIVE-B63', green: 'JC-B63', scenario: "write(['tier'], 'disk', 1) — the TIER carrier's own code OutOfDomainTier, NOT ValueRefusedAtBoundary",
}, () => {
  const dir = dirFor('LIVE-B63');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B63', filePath);
  const store = bootStore(filePath);
  const before = fs.readFileSync(filePath, 'utf8');
  const written = attempt(() => store.write(['tier'], 'disk', 1));
  const after = fs.readFileSync(filePath, 'utf8');
  const fresh = bootStore(filePath);
  const register = attempt(() => fresh.read([]));
  const problems = [];
  if (written.ok) problems.push('the write was admitted');
  else {
    if (written.error.status !== 'OutOfDomainTier') problems.push(`status=${JSON.stringify(written.error.status)} (declared OutOfDomainTier)`);
    if (written.error.status === STATUS) problems.push('the tier carrier answered the crossing refusal');
  }
  if (before !== after) problems.push('the store file changed');
  if (!register.ok || !sameTree(register.value, {})) problems.push(`the fresh register: ${register.ok ? short(register.value) : describe(register.error)}`);
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? `status=OutOfDomainTier; file unchanged; register={}` : problems.join('; ') } };
});

cell({
  id: 'LIVE-B64', green: 'JC-B64', scenario: "write([-1], 'mem', 1) — the ADDRESS carrier's own code AddressMalformed",
}, () => {
  const dir = dirFor('LIVE-B64');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-B64', filePath);
  const store = bootStore(filePath);
  const before = fs.readFileSync(filePath, 'utf8');
  const written = attempt(() => store.write([-1], 'mem', 1));
  const after = fs.readFileSync(filePath, 'utf8');
  const problems = [];
  if (written.ok) problems.push('the write was admitted');
  else {
    if (written.error.status !== 'AddressMalformed') problems.push(`status=${JSON.stringify(written.error.status)} (declared AddressMalformed)`);
    if (written.error.status === STATUS) problems.push('the address carrier answered the crossing refusal');
  }
  if (before !== after) problems.push('the store file changed');
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? 'status=AddressMalformed; file unchanged' : problems.join('; ') } };
});

cell({
  id: 'LIVE-B65', green: 'JC-B65', scenario: 'a value tree containing no carrier: the tree crosses as itself and NO tag member (k, v, e, L, T) is introduced into it',
}, () => {
  const value = { a: 1, b: [true, 'x'], c: { d: 2 } };
  const trip = roundTrip('LIVE-B65', value);
  const back = trip.back;
  const tagKeys = ['k', 'v', 'e', 'L', 'T'];
  const introduced = [];
  const collect = (node, where) => {
    if (Array.isArray(node) || node === null || typeof node !== 'object') return;
    for (const key of Object.keys(node)) if (tagKeys.includes(key)) introduced.push(`${where}.${key}`);
  };
  collect(back, 'read-back');
  collect(imageAt(trip.image, ['a']), 'image.a');
  const green = {
    ok: sameTree(back, value) && introduced.length === 0,
    detail: `read-back=${short(back)}; tag members introduced=${JSON.stringify(introduced)}`,
  };
  return { green, settled: settledChecks(trip, value) };
});

// ═════════════════════════════════════════════════════════════════════════════
// §9. GROUP §G — the one refusal form
// ═════════════════════════════════════════════════════════════════════════════

cell({
  id: 'LIVE-B66', green: 'JC-B66', scenario: 'a sparse-array refusal is a THROWN plain object carrying a string status and a non-empty string message',
}, () => {
  const run = refusalRun('LIVE-B66', [1, , 3]);
  const err = run.r.ok ? null : run.r.error;
  const problems = [];
  if (run.r.ok) problems.push('the sparse array was ADMITTED — no refusal to inspect');
  else {
    if (err === null || typeof err !== 'object') problems.push(`the refusal is not an object: ${describe(err)}`);
    else {
      if (err instanceof Error) problems.push('the refusal is an Error instance (never the declared form)');
      const proto = Object.getPrototypeOf(err);
      if (proto !== Object.prototype && proto !== null) problems.push('the refusal is not a caller-realm plain object');
      if (typeof err.status !== 'string') problems.push(`status is ${typeof err.status}, not a string`);
      if (typeof err.message !== 'string' || err.message.length === 0) problems.push('message is not a non-empty string');
    }
  }
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0 ? `thrown plain object; members=${JSON.stringify(Object.keys(err))}; status=${JSON.stringify(err.status)}; message length=${err.message.length}` : problems.join('; '),
    },
  };
});

cell({
  id: 'LIVE-B67', green: 'JC-B67', scenario: 'the refusal form\'s member census — the two members BOTH readings carry asserted, the arity RECORDED',
}, () => {
  const run = refusalRun('LIVE-B67', [1, , 3]);
  const err = run.r.ok ? null : run.r.error;
  const problems = [];
  if (err === null || typeof err !== 'object') problems.push(`no refusal object: ${describe(err)}`);
  else {
    if (!('status' in err)) problems.push('status is absent');
    if (!('message' in err)) problems.push('message is absent');
  }
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `status and message both present; CENSUS ${JSON.stringify(Object.keys(err))} (arity ${Object.keys(err).length}) — recorded, not asserted`
        : problems.join('; '),
    },
  };
});

// ═════════════════════════════════════════════════════════════════════════════
// §10. THIS RUNNER'S OWN LIVE OBSERVATIONS — recorded, never asserted
// ═════════════════════════════════════════════════════════════════════════════

observedCell({
  id: 'LIVE-X1', green: '(none — this runner\'s own observation)', scenario: "the LAST depths at the `file` tier, AFTER A149: which nestings the store's own commit can persist, where `127` is now STOPPED (at the walk, not at the commit), and that `128`/`130` answer the same",
}, () => {
  const probe = (depth) => {
    const dir = dirFor(`LIVE-X1-${depth}`);
    const filePath = path.join(dir, 'store.json');
    PATHS.set(`LIVE-X1-${depth}`, filePath);
    const store = bootStore(filePath);
    const before = fs.readFileSync(filePath, 'utf8');
    const written = attempt(() => writeAndCommit(store, ['a'], nesting(depth)));
    const bytes = fs.readFileSync(filePath, 'utf8');
    const fresh = bootStore(filePath);
    const back = attempt(() => fresh.read(['a'], 'file'));
    const answer = written.ok
      ? `commit PASSED (outcome=${JSON.stringify(written.value && written.value.outcome)})`
      : `THREW ${written.error.status}${typeof written.error.message === 'string' && written.error.message.includes(CLASS.ceiling) ? ` [class ${JSON.stringify(CLASS.ceiling)}]` : ''}`;
    return `${depth}: ${answer}, file=${bytes.length}B unchanged=${before === bytes}, fresh boot read ${back.ok ? 'VALUE' : `THREW ${back.error.status}`}`;
  };
  return `${probe(125)} | ${probe(126)} | ${probe(127)} | ${probe(128)} | ${probe(130)}`;
});

observedCell({
  id: 'LIVE-X2', green: '(none — this runner\'s own observation)', scenario: 'the node ceiling on dense top-level arrays: which lengths the crossing admits (the walk counts its root, so the admitted node range is 0…999,999)',
}, () => {
  const probe = (n) => {
    const store = bootStore(path.join(dirFor(`LIVE-X2-${n}`), 'store.json'));
    const r = attempt(() => store.write(['v'], 'mem', new Array(n).fill(0)));
    return r.ok ? 'ADMITTED' : `REFUSED(${r.error.status})`;
  };
  return `999,998=${probe(999_998)}; 999,999=${probe(999_999)}; 1,000,000=${probe(1_000_000)}; 1,000,001=${probe(1_000_001)} (root counted: the admitted node range is 0…999,999, the boundary driven to its settled state at LIVE-B56)`;
});

// ═════════════════════════════════════════════════════════════════════════════
// §11. THE SUMMARY, THE STORE PATHS AND THE CLEANUP
// ═════════════════════════════════════════════════════════════════════════════

// **THE ADDON THAT THE RUNNING PROCESS ACTUALLY MAPPED** — read from `/proc/self/maps` HERE, after the
// battery, because the addon loads lazily at the first construction. This is the evidence that the cells
// above were driven against a real `.node` and against WHICH file — never a stale or a substituted artefact.
const maps = (() => {
  try {
    return fs.readFileSync('/proc/self/maps', 'utf8');
  } catch {
    return '';
  }
})();
const addonPaths = [...new Set(maps.split('\n')
  .filter((line) => line.includes('storeroom_js_binding.node'))
  .map((line) => line.trim().split(/\s+/).slice(5).join(' ')))];
const addonPath = addonPaths[0] ?? null;
const addonBytes = addonPath && fs.existsSync(addonPath) ? fs.statSync(addonPath).size : null;
const addonMd5 = addonPath && fs.existsSync(addonPath)
  ? crypto.createHash('md5').update(fs.readFileSync(addonPath)).digest('hex')
  : null;
console.log(`ADDON ${addonPath ?? 'NOT MAPPED'} bytes=${addonBytes} md5=${addonMd5}`);

const tally = (verdict) => RESULTS.filter((r) => r.verdict === verdict).length;
console.log('---');
console.log(`SUMMARY reach=${REACH} cells=${RESULTS.length} pass=${tally('PASS')} fail=${tally('FAIL')} finding=${tally('FINDING')} observed=${tally('OBSERVED')}`);
for (const row of RESULTS) {
  if (row.verdict === 'FAIL' || row.verdict === 'FINDING') console.log(`VIOLATION ${row.id} ${row.verdict} :: ${row.detail}`);
}

// THE EXACT STORE PATHS, printed before the cleanup removes them.
for (const [id, filePath] of PATHS) console.log(`STORE ${id} ${filePath}`);

const dirs = fs.readdirSync(ROOT).length;
fs.rmSync(ROOT, { recursive: true, force: true });
const removed = !fs.existsSync(ROOT);
console.log(`CLEANUP root=${ROOT} dirs=${dirs} removed=${removed}`);

const failed = tally('FAIL') + tally('FINDING');
console.log(`EXIT ${failed === 0 ? 0 : 1} (exit 0 iff no cell FAILed and no cell was a FINDING)`);
process.exitCode = failed === 0 ? 0 : 1;
