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
// THE CENSUS. `144` cells = the `67` greens cells + ONE `A149` cell of this runner's own (`LIVE-R1`, depth
// `128` — the crate's CONVERSION bound, refused at this walk) + `2` observations of the first re-drive
// (`LIVE-X1`, `LIVE-X2`) + `28` cells of the `DEF-2026-10-24-C` re-drive (`LIVE-C01`–`LIVE-C28`: the three
// cross-realm shapes and four controls across the four mutation states) + `10` cells of the
// `DEF-2026-10-24-D` re-drive (`LIVE-D01`–`LIVE-D10`: the six re-derived arms and the two conditional arms'
// two branches) + `3` observations of that re-drive (`LIVE-X3`–`LIVE-X5`) + `14` cells and ONE observation
// of the 2026-10-24 re-drive (the second of the day) (`LIVE-E01`–`LIVE-E15`: the conversion guard's chain walk at both conditional
// arms in both variants, the three sanctioned standard renderings, row `17` and its controls, and the
// caller-side deletion, with `LIVE-E15` the deletion's construction boundary) + `14` cells and `4`
// observations of the 2026-10-24 re-drive after `DEF-2026-10-24-E` (`LIVE-F01`–`LIVE-F18`: the four boundary
// laws `F-RA-11` / `F-RA-12` / `F-RA-13` at their own states and controls, and the residual override the
// defect declares NOT closed, recorded as `LIVE-F16`–`LIVE-F18`).
//
// THE 2026-10-24 RE-DRIVE AFTER `DEF-2026-10-24-E` (the THIRD of the day). Four boundary laws landed red-first
// at the node layer and are re-driven here at the assembled surface, each over a REAL store that ALREADY
// CARRIES A COMMITTED SEED — so "the store file is byte-unchanged" and "the register is unmoved" are asserted
// over a NON-EMPTY store, and a fresh instance proves the seed still reads back: **(a) `F-RA-11`** — the array
// density test is `Object.hasOwn`, so a PROTOTYPE-CARRIED index is a hole (`Array.prototype[0] = 'x'` and the
// inherited-ACCESSOR carrier, both refused as row `16` with the getter counted at `0`), and the DENSE CONTROL
// under the same mutation is still admitted; **(b) `F-RA-12`** — a `Proxy` standing as the value's PROTOTYPE
// answers rows `14`/`13` with NO TRAP RUN, a LYING handler buys no admission and a REVOKED link escapes no
// host error; **(c) `F-RA-13`** (three limbs) — an ADDED `Symbol.toPrimitive`, an own or added
// `Symbol.toStringTag` accessor, and an array's ELEMENT conversions each leave the arm's CLASS SPELLING as the
// subject with every counter `0`, while the three sanctioned renderings survive; and **(d) the residual** — an
// OVERRIDDEN `toString`/`valueOf`/`join` on a shape-standard prototype is DECLARED, NOT CLOSED, so it is
// driven and recorded as an OBSERVED declaration conformance, never as a pass.
//
// THE 2026-10-24 RE-DRIVE (THE SECOND OF THE DAY). The conversion guard now walks the value's PROTOTYPE CHAIN (stopping at a
// prototype judged language-standard by shape), so a prototype-supplied `toString` no longer runs on the
// refusal path; row `17` (`an array carrying a non-index own member`) refuses at the walk; and the array
// census reads take no method from a mutable prototype, so a caller-side `delete Array.prototype.map` is
// admission-preserving. `LIVE-E01`–`LIVE-E04` re-drive the `LIVE-X4`/`LIVE-X5` shapes ASSERTED (both
// variants, counted), `LIVE-E06`–`LIVE-E12` drive row `17` and its controls, and `LIVE-E13`–`LIVE-E15` drive
// the deletion. No cell of the earlier re-drives was weakened or re-expressed.
//
// THE 2026-10-24 RE-DRIVE AFTER `DEF-2026-10-24-C` AND `DEF-2026-10-24-D`. The crossing's plain-prototype
// predicate is now STRUCTURAL (`contract.md §1`'s clause of 2026-10-24: a prototype that is terminal and
// CARRIES the standard member set, with extra own members on either realm irrelevant), and the six arms that
// rendered the refused value now answer the ROW'S CLASS SPELLING, with the two conditional arms answering it
// only where the refused value carries an OWN conversion member (`§2.1`'s clause of the same date). **The
// `LIVE-C*` cells drive the admission surface across the defect's four mutation states — pristine, this realm
// mutated, the value's realm mutated, both mutated — with every prototype restored in a `finally` and the
// restoration measured; the `LIVE-D*` cells drive a refused value carrying its own counting conversion traps
// and assert the counters are `0` AND the subject is the declared class spelling.** No cell of the first two
// re-drives was weakened or re-expressed.
//
// RUN:  node bindings/js/greens/json-crossing-live.mjs
// EXIT: 0 iff no cell FAILed and no cell was a FINDING.
// ============================================================================

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { createContext, runInContext, runInNewContext } from 'node:vm';
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

// THE SEVENTEEN CLASS SPELLINGS (`contract.md §2`'s table, verbatim; row `17` added in place 2026-10-24,
// `F-RA-5`). Rows `9`/`10` share one spelling, so seventeen rows carry sixteen distinct strings.
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
  // `contract.md §2`'s row `17`, added in place 2026-10-24 (`F-RA-5`): the seventeenth class.
  arrayNonIndex: 'an array carrying a non-index own member',
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
  RESULTS.push({ id: spec.id, verdict, detail, coverage: spec.coverage ?? null });
  console.log(`RESULT ${spec.id} ${verdict} :: ${spec.scenario} :: green=${spec.green} :: ${detail}`);
  CURRENT = null;
  return verdict;
}

function observedCell(spec, body) {
  CURRENT = spec;
  let value;
  try {
    value = body();
    RESULTS.push({ id: spec.id, verdict: 'OBSERVED', detail: value, coverage: spec.coverage ?? null });
    console.log(`RESULT ${spec.id} OBSERVED :: ${spec.scenario} :: green=${spec.green} :: ${value}`);
  } catch (error) {
    RESULTS.push({ id: spec.id, verdict: 'OBSERVED', detail: `observation threw: ${describe(error)}`, coverage: spec.coverage ?? null });
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
        tail.slice(0, tail.length - ` is ${declaredClass}`.length))} file=${run.after.length}B unchanged register={}`
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

/** Wrap a leaf in `depth` arrays, so the LEAF itself stands at that depth (the depth arm's target). */
function wrap(leaf, depth) {
  let value = leaf;
  for (let i = 0; i < depth; i += 1) value = [value];
  return value;
}

/** PART ONE's `<subject>`, read back out of a refusal message without touching the refused value. */
function partOneSubject(message) {
  if (typeof message !== 'string') return null;
  const at = message.indexOf(PART_ONE);
  if (at < 0) return null;
  const head = message.slice(0, at);
  const open = head.indexOf("'");
  const close = head.lastIndexOf("'");
  if (open !== 0 || close <= open) return null;
  return head.slice(open + 1, close);
}

// ─────────────────────────────────────────────────────────────────────────────
// §1A. THE REALM-MUTATION HARNESS — `DEF-2026-10-24-C`'s four mutation states
// ─────────────────────────────────────────────────────────────────────────────
//
// **EVERY MUTATION IS RESTORED IN A `finally`, AND THE RESTORATION IS MEASURED, NOT ASSUMED.** The harness
// takes a baseline census of all four prototypes (this realm's and the value's realm's `Object.prototype`
// and `Array.prototype`), applies the state's injections, runs the cell's body, and restores in `finally`
// — then RE-READS the four censuses and records whether they match the baseline (`RESTORE_LOG`). A restore
// that did not take is printed as a violation in the summary.
//
// **THE INJECTED MEMBER IS A NON-ENUMERABLE OWN DATA PROPERTY**, exactly as `DEF-2026-10-24-C`'s own
// reproduction spells it (`Object.defineProperty(Object.prototype, 'x', { value: 1, configurable: true })`):
// it is invisible to `for … in` and to `Object.keys`, so it cannot perturb the package's own member walks,
// while `Object.getOwnPropertyNames` — the census the predicate reads — sees it. That is the mutation the
// defect measured and the one the clause of 2026-10-24 freezes the verdict against.
const MUTANT = '__jcx_mutation_probe_2026_10_24';
const RESTORE_LOG = [];

const MUTATION_STATES = [
  { id: '(i)', label: 'pristine — neither realm mutated', thisRealm: false, foreignRealm: false },
  { id: '(ii)', label: "this realm's Object.prototype and Array.prototype mutated", thisRealm: true, foreignRealm: false },
  { id: '(iii)', label: "the value's own realm's Object.prototype and Array.prototype mutated", thisRealm: false, foreignRealm: true },
  { id: '(iv)', label: 'both realms mutated (the same injected member in each — the defect\'s own causal control)', thisRealm: true, foreignRealm: true },
];

const injectOn = (proto, name) => {
  Object.defineProperty(proto, name, { value: 1, writable: true, configurable: true });
};
const removeFrom = (proto, name) => {
  Reflect.deleteProperty(proto, name);
};
const injectOnRealm = (ctx, name) => runInContext(
  `Object.defineProperty(Object.prototype, ${JSON.stringify(name)}, { value: 1, writable: true, configurable: true });`
  + `Object.defineProperty(Array.prototype, ${JSON.stringify(name)}, { value: 1, writable: true, configurable: true });`,
  ctx,
);
const removeFromRealm = (ctx, name) => runInContext(
  `Reflect.deleteProperty(Object.prototype, ${JSON.stringify(name)});`
  + `Reflect.deleteProperty(Array.prototype, ${JSON.stringify(name)});`,
  ctx,
);
const realmCensus = (ctx) => ({
  thisObject: Object.getOwnPropertyNames(Object.prototype).length,
  thisArray: Object.getOwnPropertyNames(Array.prototype).length,
  foreignObject: runInContext('Object.getOwnPropertyNames(Object.prototype).length', ctx),
  foreignArray: runInContext('Object.getOwnPropertyNames(Array.prototype).length', ctx),
});

/**
 * Run `body` with the mutation state in force over a fresh foreign realm, and restore every prototype in a
 * `finally` — then prove the restoration by re-reading the four censuses against the baseline.
 */
function withRealmState(state, body, names = {}) {
  const thisName = names.thisName ?? MUTANT;
  const foreignName = names.foreignName ?? MUTANT;
  const ctx = createContext({});
  const baseline = realmCensus(ctx);
  const mutated = { thisRealm: false, foreignRealm: false };
  try {
    if (state.thisRealm) {
      injectOn(Object.prototype, thisName);
      injectOn(Array.prototype, thisName);
      mutated.thisRealm = true;
    }
    if (state.foreignRealm) {
      injectOnRealm(ctx, foreignName);
      mutated.foreignRealm = true;
    }
    return body({ ctx, state });
  } finally {
    if (mutated.foreignRealm) removeFromRealm(ctx, foreignName);
    if (mutated.thisRealm) {
      removeFrom(Object.prototype, thisName);
      removeFrom(Array.prototype, thisName);
    }
    const after = realmCensus(ctx);
    RESTORE_LOG.push({
      state: state.id,
      thisName,
      foreignName,
      mutated,
      baseline,
      after,
      restored: JSON.stringify(baseline) === JSON.stringify(after),
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// §1B. THE CONVERSION-TRAP INSTRUMENT — `DEF-2026-10-24-D`'s measurement
// ─────────────────────────────────────────────────────────────────────────────
//
// **A TRAP IS PROVED NOT TO HAVE RUN BY A COUNTER, NOT BY A THROWING TRAP.** A throwing trap is caught by the
// guarded `catch` and a RETURNING trap is not: `C-1`'s precedent and `contract.md §2.1`'s clause of
// 2026-10-24 exist because *"a guarded `catch` cannot un-run a trap that RETURNS"*. So every trapped value
// below carries own conversion members that COUNT and RETURN a recognisable string, and the cell asserts the
// counters are `0` — a counter of `1` is the defect, measured.
//
// The members are defined NON-ENUMERABLE own data properties, so the walk's member domain (`Object.keys`) is
// untouched and the arm driven is the one the cell names.
function installTraps(value, keys) {
  const counters = {};
  for (const key of keys) {
    const label = key === Symbol.toPrimitive ? 'Symbol.toPrimitive' : key;
    counters[label === 'Symbol.toPrimitive' ? 'toPrimitive' : label] = 0;
    const trap = () => {
      counters[label === 'Symbol.toPrimitive' ? 'toPrimitive' : label] += 1;
      return `<<${label} ran>>`;
    };
    Object.defineProperty(value, key, { value: trap, configurable: true });
  }
  return counters;
}

const trapText = (counters) => {
  const entries = Object.entries(counters);
  if (entries.length === 0) return 'none';
  return entries
    .map(([key, count]) => `${key === 'toPrimitive' ? 'Symbol.toPrimitive' : key}:${count}`)
    .join(',');
};

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
      ? `${walkCheck.detail}; commit route THREW ${STATUS} (not FileCommitFailed), file=${commit.after.length}B unchanged, fresh boot AddressNotFound`
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
// §10. GROUP §H — THE CROSS-REALM ADMISSION SURFACE (`DEF-2026-10-24-C`'s fix)
//
// `contract.md §1`'s clause of 2026-10-24 makes the plain-prototype predicate STRUCTURAL: the value carries a
// prototype, that prototype is terminal, and that prototype CARRIES the standard member set — with any FURTHER
// own member on either realm's prototype IRRELEVANT (items `(1)`–`(3)`), while the census is still read per
// call and intersected with the standard set so `C-11` stays closed (item `(4)`).
//
// **EVERY CELL BELOW IS DRIVEN THROUGH THE PACKAGE'S PUBLIC SURFACE, OVER A REAL STORE ON REAL DISK, AND ENDS
// AT THE SETTLED STATE** (write → `K.commit` → `K.runAttempt` → a FRESH instance over the same `store.json`
// reading the value back) — not at an in-memory answer. The four mutation states are the defect's own:
// **(i)** pristine; **(ii)** THIS realm's `Object.prototype`/`Array.prototype` mutated; **(iii)** the VALUE's
// own realm mutated; **(iv)** both mutated identically (the defect's causal control). The three admitted
// SHAPES are the defect's three (`test-cases.md` `JC-TC-07` cells (a)–(c)); the controls are the two classes
// the clause must still refuse and this realm's own values, which must stay admitted. **EVERY PROTOTYPE IS
// RESTORED IN A `finally` AND THE RESTORATION IS MEASURED** (`§1A`; the run's `PROTOTYPES-RESTORED` line).
// ═════════════════════════════════════════════════════════════════════════════

const CROSS_REALM_DRIVES = [
  {
    key: 'foreign-object',
    admitted: true,
    label: 'a `vm`-realm plain object `({ a: 1 })`',
    matrixRow: 'contract.md §1\'s clause of 2026-10-24, items (1)(a)–(1)(c) and (3) · test-cases.md JC-TC-07 cell (a)',
    make: (ctx) => ({ value: runInContext('({ a: 1 })', ctx), expected: { a: 1 } }),
  },
  {
    key: 'foreign-array',
    admitted: true,
    label: 'a `vm`-realm array `[1, 2, 3]`',
    matrixRow: 'contract.md §1\'s clause of 2026-10-24, item (2) · docs/specs/storeroom-js/crossing.md §1.2 row 5 · test-cases.md JC-TC-07 cell (b)',
    make: (ctx) => ({ value: runInContext('[1, 2, 3]', ctx), expected: [1, 2, 3] }),
  },
  {
    key: 'foreign-nested',
    admitted: true,
    label: 'a nested `{ outer: <vm-realm plain object> }` (the foreign value at a MEMBER position)',
    matrixRow: 'contract.md §1\'s clause of 2026-10-24, item (1) at a member position (the member-position item, (3), of §2\'s clause of the same date) · test-cases.md JC-TC-07 cell (c)',
    make: (ctx) => ({ value: { outer: runInContext('({ a: 1 })', ctx) }, expected: { outer: { a: 1 } } }),
  },
  {
    key: 'class-instance',
    admitted: false,
    cls: 'nonPlain',
    label: 'a class INSTANCE (the control the clause must still refuse)',
    matrixRow: 'contract.md §2 row 14 · §2\'s clause of 2026-10-24, items (2) and (5)',
    make: () => ({ value: new (class C {})() }),
  },
  {
    key: 'array-subclass',
    admitted: false,
    cls: 'arraySubclass',
    label: 'a class EXTENDING `Array` (the control the clause must still refuse)',
    matrixRow: 'contract.md §2 row 13 · §2\'s clause of 2026-10-24, items (1) and (5)',
    make: () => ({ value: new (class V extends Array {})() }),
  },
  {
    key: 'same-realm-object',
    admitted: true,
    label: "this realm's own plain object `{ a: 1 }`",
    matrixRow: 'DEF-2026-10-24-C\'s own causal control — a same-realm object under the same mutation is ADMITTED (test-cases.md JC-TC-07 item (3))',
    make: () => ({ value: { a: 1 }, expected: { a: 1 } }),
  },
  {
    key: 'same-realm-array',
    admitted: true,
    label: "this realm's own array `[1, 2, 3]`",
    matrixRow: 'DEF-2026-10-24-C\'s own causal control, array limb — a same-realm array under the same mutation is ADMITTED',
    make: () => ({ value: [1, 2, 3], expected: [1, 2, 3] }),
  },
];

let crossRealmIndex = 0;

for (const state of MUTATION_STATES) {
  for (const drive of CROSS_REALM_DRIVES) {
    crossRealmIndex += 1;
    const id = `LIVE-C${String(crossRealmIndex).padStart(2, '0')}`;
    const coverage = {
      matrixRow: drive.matrixRow,
      scenario: `${drive.label}, mutation state ${state.id} (${state.label})`,
      start: `${drive.label} → \`K.commit(store, ['a'], 'file', value)\` → \`K.runAttempt\` on a REAL store, with mutation state ${state.id} in force`,
      state: state.id,
      shape: drive.key,
    };
    if (drive.admitted) {
      cell({
        id,
        green: 'DEF-2026-10-24-C · contract.md §1 (2026-10-24)',
        scenario: `${drive.label} under mutation state ${state.id} (${state.label}) — ADMITTED and round-tripped to its settled state`,
        coverage,
      }, () => withRealmState(state, ({ ctx }) => {
        const { value, expected } = drive.make(ctx);
        const trip = roundTrip(id, value);
        const green = {
          ok: Boolean(trip.record && trip.record.outcome === 'passed'),
          detail: `commit=${trip.record && trip.record.outcome} read-back=${short(trip.back, 70)}`,
        };
        return { green, settled: settledChecks(trip, expected) };
      }));
    } else {
      cell({
        id,
        green: 'DEF-2026-10-24-C · contract.md §2 (2026-10-24)',
        scenario: `${drive.label} under mutation state ${state.id} (${state.label}) — still REFUSED with its declared class at the declared value position`,
        coverage,
      }, () => withRealmState(state, ({ ctx }) => {
        const { value } = drive.make(ctx);
        const run = refusalRun(id, value);
        return { green: refusalChecks(run, { cls: drive.cls, position: 'declared-value' }) };
      }));
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// §11. GROUP §I — THE NO-USER-CODE SURFACE (`DEF-2026-10-24-D`'s fix)
//
// `contract.md §2.1`'s clause of 2026-10-24: **NO USER CODE RUNS ON A REFUSAL PATH** — item `(1)` states the
// rule, item `(2)` re-derives the six arms that rendered the refused value (rows `5`, `11`, `13`, `14`, `15`,
// `16`) to the ROW'S OWN CLASS SPELLING, and item `(4)` re-derives the two conditional arms (row `3`'s arm and
// row `8`'s DEPTH arm) to answer the class spelling only where the refused value CARRIES AN OWN conversion
// member, keeping the value's own spelling where it does not.
//
// **EVERY CELL DRIVES A REFUSED VALUE THAT CARRIES ITS OWN CONVERSION TRAP, INSTRUMENTED BY COUNTER**, and
// asserts BOTH halves: **(a)** the counters are `0` — the trap did not run, though a pre-fix `String(value)`
// would have run it and a RETURNING trap is not something the guarded `catch` can undo — and **(b)** PART
// ONE's subject IS the row's class spelling (rows `5`, `11`, `13`, `14`, `15`, `16`) or, at the two
// conditional arms, the declared branch's subject. The settled state (the store file byte-identical, a fresh
// boot's register `{}`, `AddressNotFound` at the address) is asserted beside them.
// ═════════════════════════════════════════════════════════════════════════════

/**
 * One no-user-code drive: hand the value to a real store's `write`, assert the declared refusal AND the
 * subject AND the trap counters, and return the settled-state check with them. `counters` is the
 * instrumented object the value's own conversion members increment; an absent counter is not asserted.
 */
function noUserCodeDrive(id, { value, cls, position = 'declared-value', expectedSubject, counters }) {
  const run = refusalRun(id, value);
  const check = refusalChecks(run, { cls, position });
  const problems = [];
  let subject = null;
  if (run.r.ok) {
    problems.push('the value was ADMITTED (no refusal to inspect)');
  } else {
    subject = partOneSubject(run.r.error.message);
    if (subject !== expectedSubject) {
      problems.push(`PART ONE's subject is ${short(subject, 110)} (declared ${short(expectedSubject, 110)})`);
    }
  }
  for (const [key, label] of [['toPrimitive', 'Symbol.toPrimitive'], ['toString', 'toString'], ['valueOf', 'valueOf'], ['protoSupplied', "the class's own (prototype-supplied) toString"]]) {
    // **AN OWN-KEY TEST, NOT `in`**: `toString` and `valueOf` are on `Object.prototype`, so `'valueOf' in
    // counters` is true for EVERY object and would read the inherited native function as a count.
    if (Object.hasOwn(counters, key) && counters[key] !== 0) problems.push(`${label} RAN on the refusal path (count=${counters[key]})`);
  }
  const traps = trapText(counters);
  const ok = check.ok && problems.length === 0;
  return {
    ok,
    detail: ok
      ? `status=${STATUS} class=${JSON.stringify(CLASS[cls])} subject=${JSON.stringify(subject)} trap=${traps}; ${check.detail}`
      : [...problems, ...(check.ok ? [] : [check.detail])].join('; '),
    subject,
    counters,
  };
}

const noUserCodeCell = (id, spec, build) => cell({ id, green: spec.green, scenario: spec.scenario, coverage: spec.coverage }, () => {
  const { value, counters, expectedSubject } = build();
  return { green: noUserCodeDrive(id, { value, cls: spec.cls, position: spec.position, expectedSubject, counters }) };
});

noUserCodeCell('LIVE-D01', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 5 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 5 — a plain object carrying own `Symbol.toPrimitive`/`toString` traps AND its own Symbol-keyed member: subject is the row\'s class spelling and NEITHER trap ran',
  cls: 'symbolKey',
  coverage: {
    matrixRow: 'contract.md §2 row 5 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'a Symbol-keyed own member on a plain object that also carries own conversion traps',
    start: "the caller's plain object (own traps + own Symbol member) → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = { a: 1 };
  const counters = installTraps(value, [Symbol.toPrimitive, 'toString']);
  return { value, counters, expectedSubject: CLASS.symbolKey };
});

noUserCodeCell('LIVE-D02', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 11 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 11 — a value that contains itself, whose repeated ancestor carries own `toString`/`valueOf` traps (string-keyed, so the cycle arm is the one reached): subject is the class spelling and NEITHER trap ran',
  cls: 'cyclic',
  coverage: {
    matrixRow: 'contract.md §2 row 11 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'a repeated ancestor carrying own toString/valueOf traps',
    start: "the caller's `{ child: <self-containing object> }` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const counters = { toString: 0, valueOf: 0 };
  const child = {};
  Object.defineProperty(child, 'toString', { value: () => { counters.toString += 1; return '<<toString ran>>'; }, configurable: true });
  Object.defineProperty(child, 'valueOf', { value: () => { counters.valueOf += 1; return '<<valueOf ran>>'; }, configurable: true });
  child.self = child;
  return { value: { child }, counters, expectedSubject: CLASS.cyclic };
});

noUserCodeCell('LIVE-D03', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 13 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 13 — an instance of a class extending `Array`, carrying own conversion traps: subject is the class spelling (the retired empty subject is not answered) and NEITHER trap ran',
  cls: 'arraySubclass',
  coverage: {
    matrixRow: 'contract.md §2 row 13 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'an Array-subclass instance carrying own conversion traps',
    start: "the caller's `new (class extends Array {})()` with own traps → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = new (class V extends Array {})();
  const counters = installTraps(value, [Symbol.toPrimitive, 'toString']);
  return { value, counters, expectedSubject: CLASS.arraySubclass };
});

noUserCodeCell('LIVE-D04', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 14 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 14 — a class instance whose own prototype supplies a THROWING `toString` and which carries own conversion traps: subject is the row\'s class spelling, neither own trap ran, and the class\'s own `toString` was not reached',
  cls: 'nonPlain',
  coverage: {
    matrixRow: 'contract.md §2 row 14 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'a class instance with own traps and a prototype-supplied throwing toString',
    start: "the caller's `new (class C {})()` with own traps → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const counters = { protoSupplied: 0 };
  const proto = { toString() { counters.protoSupplied += 1; throw new Error("the class's own toString was reached"); } };
  class C {}
  Object.setPrototypeOf(C.prototype, proto);
  const value = new C();
  Object.assign(counters, installTraps(value, [Symbol.toPrimitive, 'toString']));
  return { value, counters, expectedSubject: CLASS.nonPlain };
});

noUserCodeCell('LIVE-D05', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 15 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 15 — a plain object carrying an own ACCESSOR member beside own conversion traps: subject is the class spelling and NEITHER trap ran',
  cls: 'accessor',
  coverage: {
    matrixRow: 'contract.md §2 row 15 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'an own accessor member on a value that also carries own conversion traps',
    start: "the caller's object (own getter + own traps) → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = { a: 1 };
  Object.defineProperty(value, 'g', { get() { return 1; }, configurable: true });
  const counters = installTraps(value, [Symbol.toPrimitive, 'toString']);
  return { value, counters, expectedSubject: CLASS.accessor };
});

noUserCodeCell('LIVE-D06', {
  green: 'DEF-2026-10-24-D · contract.md §2 row 16 (clause of 2026-10-24, items (1), (2), (3))',
  scenario: 'row 16 — a sparse array carrying own conversion traps: subject is the class spelling (the retired `\'1,,3\'` join is not answered) and NEITHER trap ran',
  cls: 'sparse',
  coverage: {
    matrixRow: 'contract.md §2 row 16 (its `<subject>` cell, re-derived by the clause of 2026-10-24, item (2))',
    scenario: 'a sparse array carrying own conversion traps',
    start: "the caller's `[1, , 3]` with own traps → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = [1, , 3];
  const counters = installTraps(value, [Symbol.toPrimitive, 'toString']);
  return { value, counters, expectedSubject: CLASS.sparse };
});

// **THE TWO CONDITIONAL ARMS — `contract.md §2.1`'s clause of 2026-10-24, item `(4)`: BOTH BRANCHES DRIVEN.**
noUserCodeCell('LIVE-D07', {
  green: 'DEF-2026-10-24-D · contract.md §2.1 row 3 (clause of 2026-10-24, item (4)) — the WITH branch',
  scenario: 'row 3 WITH an own conversion member — a function carrying own `Symbol.toPrimitive`/`toString` traps: subject is the class spelling `a function` and NEITHER trap ran',
  cls: 'function',
  coverage: {
    matrixRow: 'contract.md §2.1 row 3\'s `<subject>` cell (re-derived by the clause of 2026-10-24, item (4)) — WITH branch',
    scenario: 'a function carrying own conversion traps',
    start: "the caller's `function g(){...}` with own traps → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = function g() { return 1; };
  const counters = installTraps(value, [Symbol.toPrimitive, 'toString']);
  return { value, counters, expectedSubject: CLASS.function };
});

noUserCodeCell('LIVE-D08', {
  green: 'DEF-2026-10-24-D · contract.md §2.1 row 3 (clause of 2026-10-24, item (4)) — the WITHOUT branch',
  scenario: 'row 3 WITHOUT an own conversion member — the function\'s own source text is the subject, read through the standard `Function.prototype.toString` machinery (no trap exists to run)',
  cls: 'function',
  coverage: {
    matrixRow: 'contract.md §2.1 row 3\'s `<subject>` cell (re-derived by the clause of 2026-10-24, item (4)) — WITHOUT branch',
    scenario: 'a function carrying no own conversion member',
    start: "the caller's `function g(){...}` with no own conversion member → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = function g() { return 1; };
  return { value, counters: {}, expectedSubject: String(value) };
});

noUserCodeCell('LIVE-D09', {
  green: 'DEF-2026-10-24-D · contract.md §2.1 row 8 (clause of 2026-10-24, item (4)) — the depth arm, WITH branch',
  scenario: 'row 8\'s DEPTH arm WITH an own conversion member — the value refused at depth 127 carries own traps: subject is the class spelling `a value over the walk ceiling` and NEITHER trap ran',
  cls: 'ceiling',
  coverage: {
    matrixRow: 'contract.md §2.1 row 8\'s depth arm `<subject>` cell (re-derived by the clause of 2026-10-24, item (4)) — WITH branch',
    scenario: 'a value refused at depth 127 that carries own conversion traps',
    start: "a nesting of 127 around a trapped plain object → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const leaf = { a: 1 };
  const counters = installTraps(leaf, [Symbol.toPrimitive, 'toString']);
  return { value: wrap(leaf, 127), counters, expectedSubject: CLASS.ceiling };
});

cell({
  id: 'LIVE-D10',
  green: 'DEF-2026-10-24-D · contract.md §2.1 row 8 (clause of 2026-10-24, item (4)) — the depth arm, WITHOUT branch',
  scenario: "row 8's DEPTH arm WITHOUT an own conversion member — the refused value's own spelling is the subject, driven at two leaves (`'0'` and `'[object Object]'`)",
  coverage: {
    matrixRow: 'contract.md §2.1 row 8\'s depth arm `<subject>` cell (re-derived by the clause of 2026-10-24, item (4)) — WITHOUT branch',
    scenario: 'a value refused at depth 127 that carries no own conversion member (number leaf and object leaf)',
    start: 'a nesting of 127 around a number leaf and around a plain-object leaf → `write([\'a\'], \'file\', value)` on a REAL store',
  },
}, () => {
  const number = noUserCodeDrive('LIVE-D10-number', {
    value: wrap(0, 127), cls: 'ceiling', expectedSubject: '0', counters: {},
  });
  const object = noUserCodeDrive('LIVE-D10-object', {
    value: wrap({ a: 1 }, 127), cls: 'ceiling', expectedSubject: '[object Object]', counters: {},
  });
  const problems = [];
  if (!number.ok) problems.push(`number leaf: ${number.detail}`);
  if (!object.ok) problems.push(`object leaf: ${object.detail}`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `number leaf subject=${JSON.stringify(number.subject)} · object leaf subject=${JSON.stringify(object.subject)} · trap=none (no own conversion member to run)`
        : problems.join(' | '),
    },
  };
});

// ═════════════════════════════════════════════════════════════════════════════
// §12. THIS RUNNER'S OWN LIVE OBSERVATIONS — recorded, never asserted
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

// **⟶ `LIVE-X3` — THE STRONGER MUTATION STATE, RECORDED NOT ASSERTED.** `DEF-2026-10-24-C`'s causal control
// mutates both realms IDENTICALLY (`(iv)` above). This observation mutates both realms with DIFFERENT injected
// names, so the two censuses diverge by TWO names and no equality against either realm can hold — the state in
// which a census-equality predicate must refuse both and a structural one must admit both. Recorded beside the
// asserted `(iv)` cells so the supervisor can read the stronger state without it being asserted as a declaration.
observedCell({
  id: 'LIVE-X3', green: '(none — this runner\'s own observation)', scenario: "both realms mutated with DIFFERENT injected names — the state no census-equality predicate can survive; the three foreign shapes driven to their settled state",
  coverage: {
    matrixRow: 'runner observation — a stronger instance of contract.md §1\'s clause of 2026-10-24, item (3)',
    scenario: 'both realms mutated with different member names',
    start: 'the three `vm`-realm shapes → `K.commit` → `K.runAttempt` → a fresh instance over the same `store.json`, with a different injected name in each realm',
  },
}, () => {
  const state = { id: '(iv-different-names)', label: 'both realms mutated with different names', thisRealm: true, foreignRealm: true };
  return withRealmState(state, ({ ctx }) => {
    const parts = [];
    const drives = [
      ['object', () => runInContext('({ a: 1 })', ctx), { a: 1 }],
      ['array', () => runInContext('[1, 2, 3]', ctx), [1, 2, 3]],
      ['nested', () => ({ outer: runInContext('({ a: 1 })', ctx) }), { outer: { a: 1 } }],
    ];
    for (const [key, make, expected] of drives) {
      const trip = roundTrip(`LIVE-X3-${key}`, make());
      const ok = trip.record && trip.record.outcome === 'passed' && sameTree(trip.back, expected);
      parts.push(`${key}: ${ok ? `ADMITTED outcome=${JSON.stringify(trip.record.outcome)} file=${trip.bytes.length}B read-back=${short(trip.back, 45)}` : 'REFUSED/DIFFERENT'}`);
    }
    return parts.join(' | ');
  }, { thisName: `${MUTANT}_this`, foreignName: `${MUTANT}_foreign` });
});

// **⟶ `LIVE-X4` — THE RESIDUAL READING OF `contract.md §2.1` ITEM `(1)` AT ROW `8`'s DEPTH ARM, RECORDED NOT
// ASSERTED.** Items `(2)`/`(4)` scope the fix to an OWN conversion member; item `(1)` states the rule generally
// (*"whether that member is OWN on the value or reached through a prototype the value supplies"*). This
// observation drives a value refused at depth `127` that carries NO own conversion member but whose PROTOTYPE
// supplies one, and records whether that member ran. It is an OBSERVATION: no greens cell and no item `(2)`/`(4)`
// sub-item declares this corner, so it is reported to the supervisor rather than scored.
observedCell({
  id: 'LIVE-X4', green: '(none — this runner\'s own observation)', scenario: 'row 8 depth arm — a value at depth 127 whose PROTOTYPE (not the value) supplies a counting `toString`: does user code run on the refusal path, and what subject is answered?',
  coverage: {
    matrixRow: 'runner observation — contract.md §2.1 item (1)\'s general rule read against items (2)/(4) at row 8\'s depth arm',
    scenario: 'a prototype-supplied conversion member on the value refused at depth 127',
    start: 'a nesting of 127 whose leaf inherits a counting `toString` from its prototype → `write([\'a\'], \'file\', value)` on a REAL store',
  },
}, () => {
  const drive = (label, trapFactory) => {
    const counter = { n: 0 };
    const leaf = Object.create({ toString: trapFactory(counter) });
    leaf.a = 1;
    const dir = dirFor(`LIVE-X4-${label}`);
    const filePath = path.join(dir, 'store.json');
    PATHS.set(`LIVE-X4-${label}`, filePath);
    const store = bootStore(filePath);
    const r = attempt(() => store.write(['a'], 'file', wrap(leaf, 127)));
    if (r.ok) return `${label}: ADMITTED (!!)`;
    const subject = partOneSubject(r.error.message);
    return `${label}: status=${r.error.status} subject=${JSON.stringify(subject)} PART-TWO-class=${JSON.stringify(CLASS.ceiling)} trapRan=${counter.n}`;
  };
  const throwing = drive('throwing', (counter) => () => { counter.n += 1; throw new Error('prototype-supplied toString ran'); });
  const returning = drive('returning', (counter) => () => { counter.n += 1; return 'CALLER-CONTROLLED SUBJECT'; });
  return `${throwing} | ${returning}`;
});

// **⟶ `LIVE-X5` — THE SAME RESIDUAL AT ROW `3`'s ARM, RECORDED NOT ASSERTED.** A function whose PROTOTYPE (not
// the function) supplies the conversion member: `String(fn)` reaches it, so the guarded `catch` answers the
// class spelling only if it throws, and a RETURNING member's text becomes the subject. Observation only.
observedCell({
  id: 'LIVE-X5', green: '(none — this runner\'s own observation)', scenario: 'row 3 — a function whose PROTOTYPE supplies a counting `toString`: does user code run on the refusal path?',
  coverage: {
    matrixRow: 'runner observation — contract.md §2.1 item (1)\'s general rule read against item (4) at row 3\'s arm',
    scenario: 'a prototype-supplied conversion member on a refused function',
    start: 'the caller\'s function whose prototype supplies a counting `toString` → `write([\'a\'], \'file\', value)` on a REAL store',
  },
}, () => {
  const drive = (label, trapFactory) => {
    const counter = { n: 0 };
    const fn = function h() { return 2; };
    Object.setPrototypeOf(fn, { toString: trapFactory(counter) });
    const dir = dirFor(`LIVE-X5-${label}`);
    const filePath = path.join(dir, 'store.json');
    PATHS.set(`LIVE-X5-${label}`, filePath);
    const store = bootStore(filePath);
    const r = attempt(() => store.write(['a'], 'file', fn));
    if (r.ok) return `${label}: ADMITTED (!!)`;
    return `${label}: status=${r.error.status} subject=${JSON.stringify(partOneSubject(r.error.message))} trapRan=${counter.n}`;
  };
  const throwing = drive('throwing', (counter) => () => { counter.n += 1; throw new Error('prototype-supplied toString ran'); });
  const returning = drive('returning', (counter) => () => { counter.n += 1; return 'CALLER-CONTROLLED SUBJECT'; });
  return `${throwing} | ${returning}`;
});

// ═════════════════════════════════════════════════════════════════════════════
// §12A. THE 2026-10-24 RE-DRIVE (THE SECOND OF THE DAY) — THE CONVERSION GUARD'S CHAIN WALK (`LIVE-E01`–`LIVE-E05`), ROW `17`
// (`LIVE-E06`–`LIVE-E12`) AND THE CALLER-SIDE DELETION (`LIVE-E13`–`LIVE-E15`)
//
// **THE THREE LAWS THIS SECTION DRIVES, EACH AT ITS OWN BYTES.**
//
// `(1)` **THE CONVERSION GUARD NOW WALKS THE PROTOTYPE CHAIN** (`contract.md §2.1`'s clause of 2026-10-24,
// items `(1)` and `(11)`): a conversion member the refused value CARRIES — own on it, or owned by a prototype
// its chain reaches before `isLanguageStandardPrototype` stops the walk (`bindings/js/index.mjs:1152` ·
// `:1138`) — answers the row's class spelling and is not invoked. `LIVE-E01`–`LIVE-E04` drive the two
// conditional arms with a PROTOTYPE-supplied member (RETURNING and THROWING, counted), which is the state
// the OLD guard let run; `LIVE-E05` drives the three SANCTIONED STANDARD renderings that the chain walk must
// preserve (`'[object Object]'` · `'1,2'` · a function's source text).
//
// `(2)` **ROW `17`** (`contract.md §2`'s clause of 2026-10-24 on `F-RA-5`, items `(3)`, `(5)`, `(6)`, `(8)`;
// `test-cases.md`'s `JC-TC-49`): an array carrying a non-index own member is REFUSED at the walk, at the
// ARRAY's own value position, class and subject the row's spelling, the status `ValueRefusedAtBoundary`, the
// store's file unchanged and a fresh boot over the same `store.json` reading the empty register. A
// NON-ENUMERABLE extra member stays ADMITTED (the row's predicate is `Object.keys`' own ENUMERABLE string
// keys), and a plain array is admitted with its `13 B` register image.
//
// `(3)` **CALLER-SIDE DELETION IS ADMISSION-PRESERVING** (`contract.md §1`'s clause of 2026-10-24 on
// `F-RA-3`, items `(3)`–`(6)`): the array census reads take no method from a mutable prototype
// (`arrayProtoSymbols` `:815`, `arrayClass` `:944`–`:946`, `decodeValue` `:2286`–`:2289`, `decodeSegments`
// `:2326`–`:2329`), so `delete Array.prototype.map` in THIS realm must not turn an admitted write into a
// refusal or into a raw host error. `LIVE-E13`/`LIVE-E14` drive a foreign-realm array and a foreign-realm
// plain object through `K.commit` → `K.runAttempt` with the deletion in force, then restore in a `finally`
// and REOPEN a fresh instance over the same `store.json` — **the deletion harness records the descriptor it
// removed and proves the restored `map` is the SAME function object with the same flags.** `LIVE-E15` is the
// boundary OBSERVATION: a store CONSTRUCTED while the deletion is in force.
// ═════════════════════════════════════════════════════════════════════════════

/** The exact position spelling of the depth arm's path: `segments` index segments under the root. */
const depthPosition = (segments) => `member ${new Array(segments).fill(0).join('/')} of ${ROOT_POSITION}`;

// ─────────────────────────────────────────────────────────────────────────────
// §12A.1 — THE CONVERSION GUARD'S CHAIN WALK, ASSERTED (`LIVE-E01`–`LIVE-E05`)
// ─────────────────────────────────────────────────────────────────────────────

// Row `3`'s arm: a function whose PROTOTYPE (not the function) supplies the conversion member.
const row3PrototypeCell = (id, variant) => noUserCodeCell(id, {
  green: 'contract.md §2.1\'s clause of 2026-10-24, items (1), (4) and (11) — the chain walk, WITH branch',
  scenario: `row 3 — the function's PROTOTYPE supplies a ${variant === 'returning' ? 'RETURNING' : 'THROWING'} \`toString\`: the subject is the class spelling \`a function\` and the member did NOT run`,
  cls: 'function',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24, items (1), (4) and (11) — item (4)\'s row-3 WITH branch, the member reached through the value\'s chain',
    scenario: `a function whose prototype supplies a ${variant} conversion member`,
    start: `the caller's function (its [[Prototype]] is a custom object supplying a counting ${variant} \`toString\`) → \`write(['a'], 'file', value)\` on a REAL store`,
  },
}, () => {
  const counters = { toString: 0 };
  const value = function h() { return 2; };
  Object.setPrototypeOf(value, {
    toString() {
      counters.toString += 1;
      if (variant === 'throwing') throw new Error('prototype-supplied toString ran');
      return 'CALLER-CONTROLLED SUBJECT';
    },
  });
  return { value, counters, expectedSubject: CLASS.function };
});

row3PrototypeCell('LIVE-E01', 'returning');
row3PrototypeCell('LIVE-E02', 'throwing');

// Row `8`'s DEPTH arm: a leaf refused at depth `127` whose PROTOTYPE supplies the conversion member.
const depthPrototypeCell = (id, variant) => noUserCodeCell(id, {
  green: 'contract.md §2.1\'s clause of 2026-10-24, items (1), (4) and (11) — the chain walk, WITH branch',
  scenario: `row 8's DEPTH arm — the leaf refused at depth 127 has a PROTOTYPE-supplied ${variant === 'returning' ? 'RETURNING' : 'THROWING'} \`toString\`: the subject is the class spelling \`a value over the walk ceiling\` and the member did NOT run`,
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24, items (1), (4) and (11) — item (4)\'s depth-arm WITH branch, the member reached through the value\'s chain',
    scenario: `a leaf refused at depth 127 whose prototype supplies a ${variant} conversion member`,
    start: `a nesting of 127 around \`Object.create({ toString: <counting> })\` → \`write(['a'], 'file', value)\` on a REAL store`,
  },
}, () => {
  const counters = { toString: 0 };
  const leaf = Object.create({
    toString() {
      counters.toString += 1;
      if (variant === 'throwing') throw new Error('prototype-supplied toString ran');
      return 'CALLER-CONTROLLED SUBJECT';
    },
  });
  leaf.a = 1;
  return { value: wrap(leaf, 127), counters, expectedSubject: CLASS.ceiling };
});

depthPrototypeCell('LIVE-E03', 'returning');
depthPrototypeCell('LIVE-E04', 'throwing');

// **THE THREE SANCTIONED STANDARD RENDERINGS ARE PRESERVED AT BOTH CONDITIONAL ARMS.**
cell({
  id: 'LIVE-E05',
  green: 'contract.md §2.1\'s clause of 2026-10-24, items (2) and (4) — the three standard renderings',
  scenario: "the chain walk preserves the three SANCTIONED renderings: an ordinary `{}` answers `'[object Object]'`, an ordinary `[1,2]` answers `'1,2'`, and a plain function answers its source text",
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24, item (2) — the three sanctioned renderings the exemption buys at the two conditional arms',
    scenario: 'the three standard renderings at the two conditional arms',
    start: 'an ordinary `{}` and `[1,2]` at depth 127, and a plain function at the root, each → `write([\'a\'], \'file\', value)` on a REAL store',
  },
}, () => {
  const problems = [];
  const arrayLeaf = noUserCodeDrive('LIVE-E05-array', {
    value: wrap([1, 2], 127), cls: 'ceiling', position: depthPosition(127), expectedSubject: '1,2', counters: {},
  });
  const objectLeaf = noUserCodeDrive('LIVE-E05-object', {
    value: wrap({ a: 1 }, 127), cls: 'ceiling', position: depthPosition(127), expectedSubject: '[object Object]', counters: {},
  });
  const plainFunction = function g() { return 1; };
  const functionArm = noUserCodeDrive('LIVE-E05-function', {
    value: plainFunction, cls: 'function', position: ROOT_POSITION, expectedSubject: String(plainFunction), counters: {},
  });
  if (!arrayLeaf.ok) problems.push(`array leaf: ${arrayLeaf.detail}`);
  if (!objectLeaf.ok) problems.push(`object leaf: ${objectLeaf.detail}`);
  if (!functionArm.ok) problems.push(`function arm: ${functionArm.detail}`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `array leaf subject=${JSON.stringify(arrayLeaf.subject)} · object leaf subject=${JSON.stringify(objectLeaf.subject)} · function subject=${JSON.stringify(functionArm.subject)} · trap=none at all three`
        : problems.join(' | '),
    },
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// §12A.2 — ROW `17`, ASSERTED (`LIVE-E06`–`LIVE-E12`)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * One row-`17` drive: the array is handed to a REAL store's `write`; the refusal's status, class, position
 * and PART ONE subject are asserted, beside the settled state (`refusalChecks`: file bytes unchanged, a
 * fresh boot's empty register, `AddressNotFound` at the address).
 */
function row17Drive(id, value, position, address = ['a']) {
  const run = refusalRun(id, value, address);
  const check = refusalChecks(run, { cls: 'arrayNonIndex', position });
  const problems = check.ok ? [] : [check.detail];
  let subject = null;
  if (run.r.ok) {
    problems.push('the array was ADMITTED (row 17 declares the refusal)');
  } else if (check.answer) {
    subject = partOneSubject(run.r.error.message);
    if (subject !== CLASS.arrayNonIndex) {
      problems.push(`PART ONE's subject is ${short(subject, 110)} (declared ${CLASS.arrayNonIndex})`);
    }
    const named = run.r.error.message.split(CLASS.arrayNonIndex).length - 1;
    if (named !== 2) problems.push(`the message names the row's class ${named} times (declared twice)`);
  }
  const ok = problems.length === 0;
  return {
    ok,
    subject,
    detail: ok
      ? `${check.detail} subject=${JSON.stringify(subject)} (the class named twice)`
      : problems.join('; '),
  };
}

cell({
  id: 'LIVE-E06',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3), (5), (6)) · test-cases.md JC-TC-49 (drive a)',
  scenario: 'row 17 — `const a = [1]; a.foo = 3` at the root: REFUSED at the walk, at the ARRAY\'s own value position, with the row\'s class spelling as the subject and the store untouched',
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3), (5), (6)) · test-cases.md JC-TC-49',
    scenario: 'an own enumerable non-index data member on a dense array, at the root',
    start: "the caller's `const a = [1]; a.foo = 3` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const a = [1];
  a.foo = 3;
  return { green: row17Drive('LIVE-E06', a, ROOT_POSITION) };
});

cell({
  id: 'LIVE-E07',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3), (5), (6)) · test-cases.md JC-TC-49 (the member-position drive)',
  scenario: "row 17 at a MEMBER position — the same array inside `{ x: a }`: the position is `member 'x' of the write's value argument`, never the extra member's own spelling",
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, item (5) — the position) · test-cases.md JC-TC-49',
    scenario: 'the row-17 shape at a member position',
    start: "the caller's `{ x: <[1] carrying a.foo = 3> }` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const a = [1];
  a.foo = 3;
  return { green: row17Drive('LIVE-E07', { x: a }, "member 'x' of the write's value argument") };
});

cell({
  id: 'LIVE-E08',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3), (5), (6)) · test-cases.md JC-TC-49 (drive b)',
  scenario: 'row 17 — the second spelling `Object.assign([1, 2], { note: \'x\' })` at the root: the same refusal, the same position, the same subject',
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, item (3)) · test-cases.md JC-TC-49',
    scenario: 'an own enumerable non-index data member assigned onto a dense array',
    start: "the caller's `Object.assign([1, 2], { note: 'x' })` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const value = Object.assign([1, 2], { note: 'x' });
  return { green: row17Drive('LIVE-E08', value, ROOT_POSITION) };
});

cell({
  id: 'LIVE-E09',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3), (5), (6)) · test-cases.md JC-TC-49 (drive c)',
  scenario: "row 17 — an own enumerable key that LOOKS like an index and is not a canonical one (`'01'`) at the root: the same refusal",
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, item (3) — the canonical-index predicate) · test-cases.md JC-TC-49',
    scenario: "an own enumerable key `'01'` on a dense array",
    start: "the caller's `const a = [1]; Object.defineProperty(a, '01', { value: 2, enumerable: true })` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const a = [1];
  Object.defineProperty(a, '01', { value: 2, enumerable: true, configurable: true });
  return { green: row17Drive('LIVE-E09', a, ROOT_POSITION) };
});

cell({
  id: 'LIVE-E10',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, item (3) — the predicate\'s scope, a dense array carries no non-index member — and item (9) — nothing else moves) · test-cases.md JC-TC-49',
  scenario: 'the row-17 CONTROL — a plain dense array `[1, 2, 3]` is ADMITTED, committed and reopened, its register image the `13 B` `{"a":[1,2,3]}`',
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3) and (9)) — the admitted control: a dense array carries no non-index member and rows 1–16 stand',
    scenario: 'a plain dense array',
    start: "the caller's `[1, 2, 3]` → `K.commit` → `K.runAttempt` → a fresh instance over the same `store.json`",
  },
}, () => {
  const trip = roundTrip('LIVE-E10', [1, 2, 3]);
  const settled = settledChecks(trip, [1, 2, 3]);
  const problems = settled.ok ? [] : [settled.detail];
  if (trip.bytes.length !== 13) problems.push(`the register image is ${trip.bytes.length}B (declared 13B: {"a":[1,2,3]})`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0 ? settled.detail : problems.join('; '),
    },
  };
});

cell({
  id: 'LIVE-E11',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, item (3) — `Object.keys`\' own ENUMERABLE keys: a non-enumerable member is outside the predicate and a non-enumerable index is still an index — and item (9) — nothing else moves) · test-cases.md JC-TC-49',
  scenario: 'the row-17 CONTROLS — a NON-ENUMERABLE extra member stays ADMITTED and round-trips to the indexed tree, and so does an element whose own index property is non-enumerable',
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, items (3) and (9)) — the non-enumerable controls: the predicate reads own ENUMERABLE string keys only',
    scenario: 'a non-enumerable extra member and a non-enumerable element',
    start: "the caller's `[1, 2, 3]` with `Object.defineProperty(a, 'note', { value: 'x', enumerable: false })`, and `[1, 2]` with a non-enumerable element at index 2, each → `K.commit` → `K.runAttempt` → a fresh instance over the same `store.json`",
  },
}, () => {
  const problems = [];
  const parts = [];
  const drives = [
    ['extra-member', () => {
      const a = [1, 2, 3];
      Object.defineProperty(a, 'note', { value: 'x', enumerable: false, configurable: true });
      return a;
    }],
    ['non-enumerable-element', () => {
      const a = [1, 2];
      Object.defineProperty(a, 2, { value: 3, enumerable: false, configurable: true, writable: true });
      return a;
    }],
  ];
  for (const [label, make] of drives) {
    const trip = roundTrip(`LIVE-E11-${label}`, make());
    const settled = settledChecks(trip, [1, 2, 3]);
    if (!settled.ok) problems.push(`${label}: ${settled.detail}`);
    if (trip.bytes.length !== 13) problems.push(`${label}: the register image is ${trip.bytes.length}B (declared 13B)`);
    parts.push(`${label}: ${settled.ok ? `ADMITTED outcome=${JSON.stringify(trip.record.outcome)} file=${trip.bytes.length}B image=${short(imageAt(trip.image, ['a']), 40)} read-back=${short(trip.back, 40)}` : 'FAILED'}`);
  }
  return {
    green: { ok: problems.length === 0, detail: problems.length === 0 ? parts.join(' | ') : problems.join(' | ') },
  };
});

cell({
  id: 'LIVE-E12',
  green: 'contract.md §2 row 17 (its clause of 2026-10-24, item (6) — THE ORDER) · §2 rows 13, 16, 5',
  scenario: "the row-17 ORDER CONTROLS — an `Array` subclass carrying the member still answers row 13, a sparse array carrying it still answers row 16, and a Symbol-keyed member beside it still answers row 5",
  coverage: {
    matrixRow: 'contract.md §2 row 17 (its clause of 2026-10-24, item (6) — rows 13, 16 and 15/5 precede it)',
    scenario: 'the three arms that precede row 17, each carrying a non-index own member',
    start: "an `Array`-subclass instance, `[1, , 3]`, and `[1]` with an own Symbol-keyed member, each also carrying `a.foo = 3` → `write(['a'], 'file', value)` on a REAL store",
  },
}, () => {
  const problems = [];
  const parts = [];
  const drives = [
    ['row-13', () => {
      const a = new (class V extends Array {})();
      a.foo = 3;
      return a;
    }, 'arraySubclass'],
    ['row-16', () => {
      const a = [1, , 3];
      a.foo = 3;
      return a;
    }, 'sparse'],
    ['row-5', () => {
      const a = [1];
      a[Symbol('s')] = 2;
      a.foo = 3;
      return a;
    }, 'symbolKey'],
  ];
  for (const [label, make, cls] of drives) {
    const check = refusalChecks(refusalRun(`LIVE-E12-${label}`, make()), { cls, position: ROOT_POSITION });
    if (!check.ok) problems.push(`${label}: ${check.detail}`);
    parts.push(`${label}: ${check.ok ? `${CLASS[cls]} (not row 17)` : 'FAILED'}`);
  }
  return {
    green: { ok: problems.length === 0, detail: problems.length === 0 ? parts.join(' | ') : problems.join(' | ') },
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// §12A.3 — THE CALLER-SIDE DELETION (`LIVE-E13`–`LIVE-E15`)
// ─────────────────────────────────────────────────────────────────────────────

const DELETION_LOG = [];

/**
 * **THE CALLER-SIDE DELETION HARNESS**: `delete Array.prototype.map` in THIS realm, `body` runs with the
 * deletion in force, and the member is restored in a `finally` and the RESTORATION MEASURED — the restored
 * `map` is the SAME function object, with the same `writable`/`enumerable`/`configurable` flags, as the
 * descriptor read before the deletion.
 */
function withDeletedArrayMap(id, body) {
  const before = Object.getOwnPropertyDescriptor(Array.prototype, 'map');
  const entry = { id, presentBefore: before !== undefined, presentUnderDeletion: false, restored: false, identityRestored: false };
  delete Array.prototype.map;
  entry.presentUnderDeletion = Object.getOwnPropertyDescriptor(Array.prototype, 'map') === undefined;
  try {
    return body(entry);
  } finally {
    if (before !== undefined) Object.defineProperty(Array.prototype, 'map', before);
    const after = Object.getOwnPropertyDescriptor(Array.prototype, 'map');
    entry.restored = after !== undefined;
    entry.identityRestored = after !== undefined
      && after.value === before.value
      && after.writable === before.writable
      && after.enumerable === before.enumerable
      && after.configurable === before.configurable;
    DELETION_LOG.push(entry);
  }
}

/**
 * The deletion drive: the store is CONSTRUCTED BEFORE the deletion (construction is not one of the reads the
 * deletion law names — `LIVE-E15` measures what construction answers under it), the deletion is in force for
 * the WRITE and the COMMIT, the member is restored in the harness's `finally`, and a FRESH instance over the
 * same `store.json` reads the value back.
 */
function deletionRoundTrip(id, make, address = ['a']) {
  const dir = dirFor(id);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(id, filePath);
  const store = bootStore(filePath);
  const before = fs.readFileSync(filePath, 'utf8');
  let entry = null;
  const under = withDeletedArrayMap(id, (window) => {
    entry = window;
    let record = null;
    let error = null;
    try {
      record = writeAndCommit(store, address, make());
    } catch (caught) {
      error = caught;
    }
    const bytes = fs.readFileSync(filePath, 'utf8');
    return { record, error, bytes };
  });
  const fresh = bootStore(filePath);
  const back = attempt(() => fresh.read(address, 'file'));
  const register = attempt(() => fresh.read([]));
  return {
    dir,
    filePath,
    before,
    under,
    bytes: under.bytes,
    image: under.bytes.length > 0 ? JSON.parse(under.bytes) : null,
    fresh,
    back,
    register,
    deletion: entry,
  };
}

const deletionCell = (id, spec, make, expected) => cell({ id, green: spec.green, scenario: spec.scenario, coverage: spec.coverage }, () => {
  const drive = deletionRoundTrip(id, make);
  const problems = [];
  const { deletion } = drive;
  if (!deletion || deletion.presentBefore !== true) problems.push('the harness found no own `Array.prototype.map` to delete');
  if (!deletion || deletion.presentUnderDeletion !== true) problems.push('`Array.prototype.map` was still present while the deletion was in force');
  if (drive.under.error !== null) problems.push(`the write/commit THREW under the deletion: ${describe(drive.under.error)}`);
  else if (!drive.under.record || drive.under.record.outcome !== 'passed') {
    problems.push(`the commit's outcome is ${JSON.stringify(drive.under.record && drive.under.record.outcome)} (declared "passed")`);
  }
  if (drive.bytes.length === 0) problems.push('the store file on disk is EMPTY — nothing was written');
  else if (!sameTree(imageAt(drive.image, ['a']), expected)) problems.push(`the image's value is not the bare tree: ${short(imageAt(drive.image, ['a']))}`);
  if (!drive.back.ok) problems.push(`a fresh instance's read THREW: ${describe(drive.back.error)}`);
  else if (!sameTree(drive.back.value, expected)) problems.push(`the read-back is not the bare tree: ${short(drive.back.value)}`);
  const expectedRegister = {};
  expectedRegister['a'] = expected;
  if (!drive.register.ok) problems.push(`a fresh boot's register read THREW: ${describe(drive.register.error)}`);
  else if (!sameTree(drive.register.value, expectedRegister)) problems.push(`a fresh boot's register is not the bare tree: ${short(drive.register.value)}`);
  if (!deletion || !deletion.restored) problems.push('`Array.prototype.map` was NOT restored in the finally');
  else if (!deletion.identityRestored) problems.push('the restored `Array.prototype.map` is not the same function object with the same flags');
  const ok = problems.length === 0;
  return {
    green: {
      ok,
      detail: ok
        ? `map deleted=(own descriptor absent=${deletion.presentUnderDeletion}) write under the deletion=ADMITTED outcome=${JSON.stringify(drive.under.record.outcome)} file=${drive.bytes.length}B image=${short(imageAt(drive.image, ['a']), 60)}; restored in a finally=(same function, same flags=true); fresh instance read-back=${short(drive.back.value, 60)} register=${short(drive.register.value, 60)}`
        : problems.join('; '),
    },
  };
});

deletionCell('LIVE-E13', {
  green: 'contract.md §1\'s clause of 2026-10-24 on F-RA-3, items (3)–(6) · the array census reads · test-cases.md JC-TC-07 state (v), the caller\'s realm',
  scenario: 'caller-side deletion — `delete Array.prototype.map` in THIS realm, then a FOREIGN-REALM array written and committed WITH THE DELETION IN FORCE and read back through a fresh instance opened AFTER the `finally` restore: ADMITTED and settled, no raw TypeError on the write path',
  coverage: {
    matrixRow: 'contract.md §1\'s clause of 2026-10-24 on F-RA-3, item (3) — the caller\'s-realm deletion, admission-preserving',
    scenario: '`delete Array.prototype.map` in this realm; a foreign-realm array driven through the commit route',
    start: 'a `vm`-realm `[1, 2, 3]` → `K.commit` → `K.runAttempt` on a REAL store with `Array.prototype.map` deleted in this realm → restore in a `finally` → a fresh instance over the same `store.json`',
  },
}, () => runInContext('[1, 2, 3]', createContext({})), [1, 2, 3]);

deletionCell('LIVE-E14', {
  green: 'contract.md §1\'s clause of 2026-10-24 on F-RA-3, items (3)–(6) · the array census reads · test-cases.md JC-TC-07 state (v), the caller\'s realm',
  scenario: 'caller-side deletion — `delete Array.prototype.map` in THIS realm, then a FOREIGN-REALM plain object written and committed WITH THE DELETION IN FORCE and read back through a fresh instance opened AFTER the `finally` restore: ADMITTED and settled, no raw TypeError on the write path',
  coverage: {
    matrixRow: 'contract.md §1\'s clause of 2026-10-24 on F-RA-3, item (3) — the caller\'s-realm deletion, admission-preserving (the object limb)',
    scenario: '`delete Array.prototype.map` in this realm; a foreign-realm plain object driven through the commit route',
    start: 'a `vm`-realm `({ a: 1 })` → `K.commit` → `K.runAttempt` on a REAL store with `Array.prototype.map` deleted in this realm → restore in a `finally` → a fresh instance over the same `store.json`',
  },
}, () => runInContext('({ a: 1 })', createContext({})), { a: 1 });

// **⟶ `LIVE-E15` — THE DELETION'S OWN BOUNDARY, RECORDED NOT ASSERTED.** The two cells above delete the
// member for the WRITE, restore it in a `finally`, and take their fresh instance AFTER the restore. **What a
// store CONSTRUCTED while the deletion is in force answers is a different read** — `encodeListeners`' own
// `listeners.map` (`bindings/js/index.mjs:2135`) is not one of the census reads the deletion law names — and
// this observation measures it rather than assuming it. Recorded beside the asserted cells; not scored.
observedCell({
  id: 'LIVE-E15',
  green: '(none — this runner\'s own observation)',
  scenario: 'the caller-side deletion\'s boundary — a store CONSTRUCTED while `Array.prototype.map` is deleted in this realm: what `storeCreate` answers, and what its cfg with `listeners` omitted answers',
  coverage: {
    matrixRow: 'runner observation — the construction path\'s own read, outside the census reads `contract.md §1`\'s clause on F-RA-3 names',
    scenario: 'store construction under the caller-side deletion',
    start: '`storeCreate({ filePath, journalLength: 8, listeners: [] })`, then `storeCreate({ filePath, journalLength: 8 })`, each with `Array.prototype.map` deleted in this realm; the member restored in a `finally`',
  },
}, () => {
  const dir = dirFor('LIVE-E15');
  const filePath = path.join(dir, 'store.json');
  PATHS.set('LIVE-E15', filePath);
  let entry = null;
  const answer = withDeletedArrayMap('LIVE-E15-boot', (window) => {
    entry = window;
    let standard;
    let omitted;
    try {
      PKG.storeCreate({ filePath, journalLength: 8, listeners: [] });
      standard = 'BOOTED';
    } catch (error) {
      standard = `${error && error.name}: ${error && error.message}`;
    }
    try {
      const fresh = PKG.storeCreate({ filePath, journalLength: 8 });
      omitted = `BOOTED register=${JSON.stringify(fresh.read([]))}`;
    } catch (error) {
      omitted = `${error && error.name}: ${error && error.message}`;
    }
    return { standard, omitted };
  });
  return `deletion-in-force=${entry.presentUnderDeletion} | standard cfg (listeners: []): ${answer.standard} | cfg with listeners omitted: ${answer.omitted} | restored in a finally=${entry.restored} same-function-same-flags=${entry.identityRestored}`;
});

// ═════════════════════════════════════════════════════════════════════════════
// §12B. THE 2026-10-24 RE-DRIVE AFTER `DEF-2026-10-24-E` — THE FOUR BOUNDARY LAWS AT THE ASSEMBLED LAYER
// (`LIVE-F01`–`LIVE-F18`)
//
// `docs/defects.md` · `DEF-2026-10-24-E` records four states in which the refusal boundary "admitted what it
// declared refused, or ran code it declared it never runs", each closed red-first at the node layer: **(a)
// `F-RA-11`** — the array density test is `Object.hasOwn`, so an index carried only by `Array.prototype` is a
// HOLE (row `16`) and an inherited ACCESSOR at an index is never read; **(b) `F-RA-12`** — a `Proxy` standing
// as the value's PROTOTYPE answers `'class'` with NO TRAP RUN, revoked links included; **(c) `F-RA-13`** —
// three residual states became closable with descriptor-only per-call reads: an ADDED `Symbol.toPrimitive` on
// a shape-standard prototype, an own or added `Symbol.toStringTag` accessor, and an array's ELEMENT
// conversions (each driven at row `8`'s DEPTH arm, the first also at row `3`); and **(d) the residual that
// REMAINS** — an OVERRIDDEN `toString`/`valueOf`/`join` on a shape-standard prototype, which alone needs an
// identity `C-11` forbids, is DECLARED and NOT CLOSED.
//
// **EVERY CELL BELOW DRIVES THE PUBLIC SURFACE OVER A REAL STORE ON REAL DISK THAT ALREADY CARRIES A
// COMMITTED SEED** (`['seed'] = 'kept'`, committed through the package's own `K.commit` → `K.runAttempt`
// route), because the supervisor's own words for these states are *"the store's file bytes unchanged; the
// register unmoved"* — a claim about a NON-EMPTY store. **Each refusal cell therefore asserts, at its settled
// end point: the refusal's status, class, position and PART ONE subject; the file's bytes BYTE-IDENTICAL to
// the seeded image; the register unmoved (`{"seed":"kept"}`); `AddressNotFound` at the refused address on a
// FRESH instance over the same `store.json`; and the seed still reading back as `'kept'`.** **EVERY
// CALLER-SIDE PROTOTYPE STATE IS INSTALLED BY A HARNESS THAT RESTORES THE EXACT PRIOR DESCRIPTOR IN A
// `finally` AND MEASURES THE RESTORE — the same function/getter object and the same flags, or absence where
// the member was absent — and the run prints `BOUNDARY-PROTOTYPES-RESTORED` beside the two earlier restore
// lines.** A cell the run could NOT drive is reported as such and never silently dropped.
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// §12B.0 — THE HARNESS: THE SEEDED STORE, THE CALLER-SIDE STATE, THE MEASURED RESTORE
// ─────────────────────────────────────────────────────────────────────────────

const BOUNDARY_RESTORE_LOG = [];

/**
 * **THE CALLER-SIDE PROTOTYPE HARNESS.** `mutate` names the prototype, the member and the descriptor to
 * install; `body` runs with the state in force; the EXACT prior descriptor is restored in a `finally` and the
 * restore is MEASURED (the same `value`/`get`/`set` object identity and the same `writable`/`enumerable`/
 * `configurable` flags, or the member absent where it was absent before). Every install is logged, so the
 * summary can prove it, not assume it.
 */
function withBoundaryPrototype(id, mutate, body) {
  const before = Object.getOwnPropertyDescriptor(mutate.proto, mutate.name);
  const entry = { id, member: String(mutate.name), hadMember: before !== undefined, presentWhileInstalled: false, restored: false };
  Object.defineProperty(mutate.proto, mutate.name, mutate.descriptor);
  entry.presentWhileInstalled = Object.getOwnPropertyDescriptor(mutate.proto, mutate.name) !== undefined;
  try {
    return body(entry);
  } finally {
    if (before === undefined) Reflect.deleteProperty(mutate.proto, mutate.name);
    else Object.defineProperty(mutate.proto, mutate.name, before);
    const after = Object.getOwnPropertyDescriptor(mutate.proto, mutate.name);
    entry.restored = before === undefined
      ? after === undefined
      : after !== undefined
        && after.value === before.value
        && after.get === before.get
        && after.set === before.set
        && after.writable === before.writable
        && after.enumerable === before.enumerable
        && after.configurable === before.configurable;
    BOUNDARY_RESTORE_LOG.push(entry);
  }
}

/**
 * **ONE SEEDED BOUNDARY DRIVE.** A real store over a real `store.json` is created, a seed is COMMITTED through
 * the package's own commit route, the file's bytes and the register are read, the caller-side state (if any)
 * is installed, the value is handed to the public `write`, the file's bytes are read again, the prototype is
 * restored by the harness's `finally`, and the SETTLED state is taken off a FRESH instance over the same path
 * AFTER the restore — the store's register, the refused address's own answer, and the seed's read-back.
 */
function boundaryDrive(id, { mutate, value, address = ['a'] }) {
  const dir = dirFor(id);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(id, filePath);
  const store = bootStore(filePath);
  const seed = writeAndCommit(store, ['seed'], 'kept');
  const before = fs.readFileSync(filePath, 'utf8');
  const registerBefore = attempt(() => store.read([]));
  let answer = null;
  let after = before;
  const run = () => {
    answer = attempt(() => store.write(address, 'file', value));
    after = fs.readFileSync(filePath, 'utf8');
  };
  if (mutate) withBoundaryPrototype(id, mutate, run);
  else run();
  const fresh = bootStore(filePath);
  const register = attempt(() => fresh.read([]));
  const readAt = attempt(() => fresh.read(address, 'file'));
  const seeded = attempt(() => fresh.read(['seed'], 'file'));
  return { dir, filePath, store, seed, before, after, registerBefore, answer, fresh, register, readAt, seeded };
}

/**
 * **THE SEEDED REFUSAL'S SETTLED END POINT, ASSERTED.** The refusal is the declared one (status, class,
 * position, PART ONE's subject, the class named twice); the file's bytes are unchanged; the register is
 * UNMOVED from its seeded state; the refused address answers `AddressNotFound`; and the seed still reads back.
 * `position` is either an exact spelling or the token `'declared-value'`.
 */
function seededRefusalChecks(drive, { cls, position, subject = undefined }) {
  const problems = [];
  const { answer } = drive;
  if (answer === null) problems.push('the drive recorded no answer');
  else if (answer.ok) problems.push(`the write was ADMITTED (returned ${short(answer.value)})`);
  else {
    const parsed = refusalAnswer(answer.error);
    if (!parsed.ok) problems.push(parsed.why);
    else {
      if (parsed.status !== STATUS) problems.push(`status=${JSON.stringify(parsed.status)} (declared ${STATUS})`);
      if (!parsed.message.includes(PART_ONE)) problems.push(`PART ONE absent: ${short(parsed.message, 200)}`);
      const declaredClass = CLASS[cls];
      const marker = ` is ${declaredClass}`;
      const tail = parsed.positionAndClass;
      if (!tail.endsWith(marker)) {
        problems.push(`PART TWO does not name the class ${JSON.stringify(declaredClass)}: ${short(tail, 220)}`);
      } else {
        const observed = tail.slice(0, tail.length - marker.length);
        if (position === 'declared-value') {
          if (!isDeclaredValuePosition(observed)) problems.push(`position ${JSON.stringify(observed)} is not a declared value position`);
        } else if (observed !== position) {
          problems.push(`position ${short(observed, 220)} (declared ${short(position, 220)})`);
        }
      }
      const got = partOneSubject(parsed.message);
      if (subject !== undefined && got !== subject) problems.push(`PART ONE's subject is ${JSON.stringify(got)} (declared ${JSON.stringify(subject)})`);
      const named = parsed.message.split(declaredClass).length - 1;
      if (subject === declaredClass && named !== 2) problems.push(`the message names the class ${named} times (declared twice)`);
    }
  }
  if (!drive.seed || drive.seed.outcome !== 'passed') problems.push(`the seed did not commit (outcome=${JSON.stringify(drive.seed && drive.seed.outcome)})`);
  if (drive.after !== drive.before) problems.push('the store file CHANGED on the refused write');
  if (!drive.registerBefore.ok) problems.push(`the seeded register read threw: ${short(drive.registerBefore.error)}`);
  else if (!sameTree(drive.registerBefore.value, { seed: 'kept' })) problems.push(`the seeded register is not {"seed":"kept"}: ${short(JSON.stringify(drive.registerBefore.value))}`);
  if (!drive.register.ok) problems.push(`the fresh boot threw: ${short(drive.register.error)}`);
  else if (!sameTree(drive.register.value, drive.registerBefore.value)) problems.push(`the fresh boot's register moved: ${short(JSON.stringify(drive.register.value))}`);
  if (!isAddressNotFound(drive.readAt)) problems.push(`the refused address does not answer AddressNotFound: ${short(drive.readAt.ok ? drive.readAt.value : drive.readAt.error)}`);
  if (!drive.seeded.ok || drive.seeded.value !== 'kept') problems.push(`the committed seed no longer reads back: ${short(drive.seeded.ok ? drive.seeded.value : drive.seeded.error)}`);
  const ok = problems.length === 0;
  return {
    ok,
    detail: ok
      ? `status=${STATUS} class=${JSON.stringify(CLASS[cls])} position=${short(position, 240)} file=${drive.after.length}B unchanged register={"seed":"kept"} unmoved readAt=AddressNotFound seed=kept`
      : problems.join('; '),
  };
}

/** A cell whose body returns the seeded settled-state check plus whatever counters its drive measured. */
const seededRefusalCell = (id, spec, make) => cell({ id, green: spec.green, scenario: spec.scenario, coverage: spec.coverage }, () => {
  const built = make();
  // **A COMPOSITE CELL MAY ANSWER ITS OWN `green`.** The five multi-drive cells of `§12B.3` run two or three
  // seeded drives and assert them together (each arm's settled state included, through
  // `seededRefusalChecks`), so their bodies return `{ green }` whole; a single-drive cell returns its drive,
  // its counters and the subject this harness asserts.
  if (built && built.green) return { green: built.green };
  const { drive, counters, extraProblems = [] } = built;
  const check = seededRefusalChecks(drive, { cls: spec.cls, position: spec.position, subject: built.subject });
  const problems = check.ok ? [] : [check.detail];
  problems.push(...extraProblems);
  for (const [label, count] of Object.entries(counters ?? {})) {
    if (count !== 0) problems.push(`${label} RAN on the refusal path (count=${count})`);
  }
  const traps = counters && Object.keys(counters).length > 0 ? Object.entries(counters).map(([k, v]) => `${k}:${v}`).join(',') : null;
  const ok = problems.length === 0;
  return {
    green: {
      ok,
      detail: ok ? `${check.detail}${traps ? ` trap=${traps}` : ''}` : problems.join('; '),
    },
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// §12B.1 — `F-RA-11`: THE OWN-PROPERTY DENSITY TEST (`LIVE-F01`–`LIVE-F04`)
//
// `contract.md §2`'s clause of 2026-10-24 on `F-RA-11`, items `(1)`–`(7)`; `test-cases.md` `JC-TC-50`.
// The as-built test was `i in value` (`[[HasProperty]]`, which walks the chain), so
// `Array.prototype[0] = 'x'; const a = new Array(2); a[1] = 'y'` was ADMITTED and the tree that crossed was
// `['x', 'y']` — an element the caller's array never owned — and an inherited ACCESSOR at an index RAN on the
// admission path. The test is now `Object.hasOwn(value, i)`, and the element loop below it reaches only
// indices that scan has proved OWN.
// ─────────────────────────────────────────────────────────────────────────────

seededRefusalCell('LIVE-F01', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-11, items (1), (3), (4), (5), (6) · test-cases.md JC-TC-50 (the DATA carrier)',
  scenario: 'F-RA-11a — `Array.prototype[0] = \'x\'; const a = new Array(2); a[1] = \'y\'`: REFUSED as row 16 `a sparse array` at the array\'s own value position, the subject the class spelling, the seeded store untouched',
  cls: 'sparse',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 16, its clause of 2026-10-24 on F-RA-11 (items (1), (3), (5)) · test-cases.md JC-TC-50',
    scenario: 'an index whose only carrier is `Array.prototype`, as a DATA member',
    start: '`Array.prototype[0] = \'x\'` (installed, restored in a `finally`, measured) → `const a = new Array(2); a[1] = \'y\'` → `write([\'a\'], \'file\', a)` on a REAL store that already carries the committed seed `[\'seed\'] = \'kept\'` → a FRESH instance over the same `store.json`',
  },
}, () => {
  const value = new Array(2);
  value[1] = 'y';
  const drive = boundaryDrive('LIVE-F01', {
    mutate: { proto: Array.prototype, name: '0', descriptor: { value: 'x', writable: true, configurable: true } },
    value,
  });
  return { drive, subject: CLASS.sparse, extraProblems: Object.hasOwn(value, 0) ? ['the caller\'s array OWNS index 0 — the shape under test is not the one driven'] : [] };
});

// **⟶ `LIVE-F02` IS THE `F-RA-11` CONTROL, AND IT IS DRIVEN BY A BODY OF ITS OWN, NOT AS A REFUSAL:** it
// asserts an ADMISSION and its settled state — the register image, the read-back and the fresh register — so
// it is a `cell` beside the refusal cells and never a `seededRefusalCell`.
cell({
  id: 'LIVE-F02',
  green: 'DENSE CONTROL of F-RA-11 · contract.md §2\'s clause of 2026-10-24 on F-RA-11, item (3)',
  scenario: 'F-RA-11a CONTROL — a genuinely DENSE `[1, 2, 3]` under the SAME `Array.prototype[0]` mutation is ADMITTED, committed and read back through a fresh instance',
  coverage: {
    matrixRow: 'contract.md §2\'s clause of 2026-10-24 on F-RA-11, item (3) — the control the clause must not over-refuse · test-cases.md JC-TC-50 (its CONTROL half)',
    scenario: 'a dense array whose every index is own, under the prototype-carried DATA index',
    start: '`Array.prototype[0] = \'x\'` in force → `[1, 2, 3]` → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const drive = boundaryDrive('LIVE-F02', {
    mutate: { proto: Array.prototype, name: '0', descriptor: { value: 'x', writable: true, configurable: true } },
    value: [1, 2, 3],
  });
  const problems = [];
  if (!drive.answer.ok) problems.push(`the dense array was REFUSED: ${short(drive.answer.error && drive.answer.error.message)}`);
  if (!drive.seed || drive.seed.outcome !== 'passed') problems.push('the seed did not commit');
  const image = drive.after.length > 0 ? JSON.parse(drive.after) : null;
  if (!image || !sameTree(imageAt(image, ['a']), [1, 2, 3])) problems.push(`the image's value at ['a'] is ${short(image && image.a)}`);
  if (!image || image.seed !== 'kept') problems.push(`the seeded member is not in the image: ${short(drive.after)}`);
  if (drive.after.length !== 27) problems.push(`the register image is ${drive.after.length}B (declared 27B — the seed's 15B and the array's own member in one image)`);
  const back = attempt(() => drive.fresh.read(['a'], 'file'));
  if (!back.ok || !sameTree(back.value, [1, 2, 3])) problems.push(`read-back is not [1,2,3]: ${short(back.ok ? back.value : back.error)}`);
  if (!drive.register.ok || !sameTree(drive.register.value, { seed: 'kept', a: [1, 2, 3] })) problems.push(`the fresh register is ${short(drive.register.ok ? JSON.stringify(drive.register.value) : drive.register.error)}`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `ADMITTED outcome=${JSON.stringify(drive.answer.value && drive.answer.value.op && drive.answer.value.op.kind)} file=${drive.after.length}B image=${drive.after} read-back=[1,2,3]`
        : problems.join('; '),
    },
  };
});

seededRefusalCell('LIVE-F03', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-11, items (4), (5) and (6) · test-cases.md JC-TC-50 (the ACCESSOR carrier)',
  scenario: 'F-RA-11b — the same shape with the carrier an inherited ACCESSOR at the index (installed as the node cell\'s own GET/SET pair): the SAME row-16 refusal, the subject the class spelling, and the inherited getter counted at `0`',
  cls: 'sparse',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 16, its clause of 2026-10-24 on F-RA-11 (items (4), (5)) · test-cases.md JC-TC-50',
    scenario: 'an index whose only carrier is `Array.prototype`, as an ACCESSOR',
    start: '`Object.defineProperty(Array.prototype, \'0\', { get, set })` (installed, restored in a `finally`, measured) → `const a = new Array(2); a[1] = \'y\'` → `write([\'a\'], \'file\', a)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const counters = { 'inherited-getter': 0 };
  const value = new Array(2);
  value[1] = 'y';
  const drive = boundaryDrive('LIVE-F03', {
    mutate: {
      proto: Array.prototype,
      name: '0',
      descriptor: {
        get() { counters['inherited-getter'] += 1; return 'x'; },
        set(element) {
          Object.defineProperty(this, '0', { value: element, writable: true, enumerable: true, configurable: true });
        },
        enumerable: false,
        configurable: true,
      },
    },
    value,
  });
  return { drive, subject: CLASS.sparse, counters };
});

// **⟶ `LIVE-F04` — THE GETTER-ONLY CARRIER: THE BOUNDARY ITSELF, RECORDED NOT SCORED.** A getter-only member
// at `Array.prototype`'s index `0` makes EVERY `push` on a fresh array throw, so the package's own carrier
// encoding (`encodeAddress`'s segments, `encodeValue`'s members) raises a raw host `TypeError` BEFORE the value
// walk is reached. **The node cell declares exactly this and drives the clause with a GET/SET pair instead**
// (`bindings/js/test/json-crossing.test.mjs`'s `JC-TC-50` driving accommodation `(a)`), so this is not a
// contradiction of the clause — it is the boundary the clause names, measured at the assembled layer and
// reported for the architect.
observedCell({
  id: 'LIVE-F04',
  green: '(none — this runner\'s own observation; the node cell\'s recorded driving accommodation)',
  scenario: 'F-RA-11b\'s GETTER-ONLY variant — a getter-only accessor at `Array.prototype[0]`: what a write, the dense control and the address carrier each answer, with the getter counted and the prototype restored',
  coverage: {
    matrixRow: 'runner observation — the getter-only carrier the node cell records as measured and "NOT this clause\'s subject" (test-cases.md JC-TC-50 / test/json-crossing.test.mjs JC-TC-50 accommodation (a))',
    scenario: 'a getter-only inherited accessor at an array index, measured at the assembled layer',
    start: '`Object.defineProperty(Array.prototype, \'0\', { get })` (restored in a `finally`, measured) → `write([\'a\'], \'file\', <new Array(2) with a[1]=\'y\'>)`, `write([], \'file\', [1,2,3])` and `write([\'a\'], \'file\', 1)` on REAL seeded stores',
  },
}, () => {
  const getter = { reads: 0 };
  const descriptor = { get() { getter.reads += 1; return 'x'; }, configurable: true };
  const text = (x) => (x.ok
    ? `ADMITTED (returned ${short(x.value, 60)})`
    : `${x.error && x.error.name}: ${x.error && x.error.message} (status=${JSON.stringify(x.error && x.error.status)})`);
  const parts = [];
  const sparse = new Array(2);
  sparse[1] = 'y';
  const a = boundaryDrive('LIVE-F04a', { mutate: { proto: Array.prototype, name: '0', descriptor }, value: sparse });
  parts.push(`sparse write(['a'],'file',<new Array(2); a[1]='y'>): ${text(a.answer)}; file=${a.after.length}B unchanged=${a.after === a.before}`);
  const b = boundaryDrive('LIVE-F04b', { mutate: { proto: Array.prototype, name: '0', descriptor }, value: [1, 2, 3] });
  parts.push(`dense control write(['a'],'file',[1,2,3]): ${text(b.answer)}; file=${b.after.length}B unchanged=${b.after === b.before}`);
  const c = boundaryDrive('LIVE-F04c', { mutate: { proto: Array.prototype, name: '0', descriptor }, value: 1 });
  parts.push(`address carrier write(['a'],'file',1): ${text(c.answer)}; file=${c.after.length}B unchanged=${c.after === c.before}`);
  parts.push(`inherited-getter=${getter.reads}`);
  parts.push(`restored in a finally=${BOUNDARY_RESTORE_LOG.filter((entry) => entry.id.startsWith('LIVE-F04')).every((entry) => entry.restored)}`);
  return parts.join(' | ');
});

// ─────────────────────────────────────────────────────────────────────────────
// §12B.2 — `F-RA-12`: A `Proxy` STANDING AS THE VALUE'S PROTOTYPE (`LIVE-F05`–`LIVE-F09`)
//
// `contract.md §2`'s clause of 2026-10-24 on `F-RA-12`, items `(1)`–`(7)`; `test-cases.md` `JC-TC-51`. The
// three census reads (`isStandardObjectPrototype`, `arrayClass`, `isLanguageStandardPrototype`) now test
// `util.types.isProxy(link)` BEFORE any read of the link, so a LYING `ownKeys`/`getPrototypeOf` handler buys no
// admission, no trap runs, and a revoked link answers `'class'` with no host error escaping.
// ─────────────────────────────────────────────────────────────────────────────

/** The LYING handler `F-RA-12` measured: it reports a standard-shaped prototype over a `null`-prototype target. */
function lyingProxy(counters) {
  const target = Object.create(null);
  return new Proxy(target, {
    getPrototypeOf() { counters.getPrototypeOf += 1; return Object.prototype; },
    ownKeys() { counters.ownKeys += 1; return [...Object.getOwnPropertyNames(Object.prototype), '__proto__']; },
    getOwnPropertyDescriptor(t, key) {
      counters.getOwnPropertyDescriptor += 1;
      return { value: Object.prototype[key], writable: true, enumerable: false, configurable: true };
    },
    get(t, key) { counters.get += 1; return Object.prototype[key]; },
    has(t, key) { counters.has += 1; return key in Object.prototype; },
  });
}
const trapCounters = () => ({ getPrototypeOf: 0, ownKeys: 0, getOwnPropertyDescriptor: 0, get: 0, has: 0 });

seededRefusalCell('LIVE-F05', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-12, items (1), (2), (4), (6)(a) · test-cases.md JC-TC-51 (the non-array limb)',
  scenario: 'F-RA-12 — a value whose PROTOTYPE is a LYING `Proxy` (its traps report a standard-shaped prototype over an `Object.create(null)` target): REFUSED as row 14 with NO TRAP RUN',
  cls: 'nonPlain',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 14, its clause of 2026-10-24 on F-RA-12 (items (1), (2), (4)) · test-cases.md JC-TC-51',
    scenario: 'a LYING `Proxy` standing as a non-array value\'s prototype',
    start: '`Object.create(<lying Proxy>)` with an own `a` member → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const counters = trapCounters();
  const value = Object.create(lyingProxy(counters));
  Object.defineProperty(value, 'a', { value: 1, enumerable: true, writable: true, configurable: true });
  const drive = boundaryDrive('LIVE-F05', { mutate: null, value });
  return { drive, subject: CLASS.nonPlain, counters };
});

seededRefusalCell('LIVE-F06', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-12, items (1), (2), (4), (6)(b) · test-cases.md JC-TC-51 (the array limb)',
  scenario: 'F-RA-12 — the same LYING `Proxy` standing as an ARRAY value\'s prototype: REFUSED as row 13 with NO TRAP RUN',
  cls: 'arraySubclass',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 13, its clause of 2026-10-24 on F-RA-12 (items (1), (2), (4), (6)(b)) · test-cases.md JC-TC-51',
    scenario: 'a LYING `Proxy` standing as an array value\'s prototype',
    start: '`Object.setPrototypeOf([1, 2], <lying Proxy>)` → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const counters = trapCounters();
  const value = Object.setPrototypeOf([1, 2], lyingProxy(counters));
  const drive = boundaryDrive('LIVE-F06', { mutate: null, value });
  return { drive, subject: CLASS.arraySubclass, counters };
});

seededRefusalCell('LIVE-F07', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-12, items (4) and (6)(a) — a REVOKED `Proxy` link, no host error escaping · test-cases.md JC-TC-51',
  scenario: 'F-RA-12 — a value whose PROTOTYPE is a REVOKED `Proxy`: REFUSED as row 14, with no host error escaping',
  cls: 'nonPlain',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 14, its clause of 2026-10-24 on F-RA-12 (items (4), (6)(a)) · test-cases.md JC-TC-51 (the revoked link)',
    scenario: 'a REVOKED `Proxy` standing as a non-array value\'s prototype',
    start: '`Object.create(<Proxy>)` with an own `a` member, then `revoke()` → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const { proxy, revoke } = Proxy.revocable({}, {});
  const value = Object.create(proxy);
  Object.defineProperty(value, 'a', { value: 1, enumerable: true, writable: true, configurable: true });
  revoke();
  const drive = boundaryDrive('LIVE-F07', { mutate: null, value });
  return { drive, subject: CLASS.nonPlain };
});

seededRefusalCell('LIVE-F08', {
  green: 'contract.md §2\'s clause of 2026-10-24 on F-RA-12, items (4) and (6)(b) — a REVOKED `Proxy` link at the ARRAY limb, no host error escaping · test-cases.md JC-TC-51',
  scenario: 'F-RA-12 — a REVOKED `Proxy` standing as an ARRAY value\'s prototype: REFUSED as row 13, with no host error escaping',
  cls: 'arraySubclass',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2 row 13, its clause of 2026-10-24 on F-RA-12 (items (4), (6)(b)) · test-cases.md JC-TC-51 (the revoked link at the array limb)',
    scenario: 'a REVOKED `Proxy` standing as an array value\'s prototype',
    start: '`Object.setPrototypeOf([1, 2], <Proxy>)`, then `revoke()` → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const { proxy, revoke } = Proxy.revocable({}, {});
  const value = Object.setPrototypeOf([1, 2], proxy);
  revoke();
  const drive = boundaryDrive('LIVE-F08', { mutate: null, value });
  return { drive, subject: CLASS.arraySubclass };
});

// **⟶ `LIVE-F09` — THE `F-RA-12` CONTROL: THE GUARD MUST NOT OVER-REFUSE AN ORDINARY PROTOTYPE.** An ordinary
// `{}` and an ordinary `[1, 2]` are driven through the same seeded store and the same fresh boot, so the
// `types.isProxy` guard's cost is measured on the values it must never touch.
cell({
  id: 'LIVE-F09',
  green: 'CONTROL of F-RA-12 · contract.md §1 · §2 — an ordinary `{}` and an ordinary `[1, 2]` are still ADMITTED and round-tripped',
  scenario: 'F-RA-12 CONTROL — an ordinary `{}` and an ordinary `[1, 2]` under the same seeded route: ADMITTED, committed and read back through a fresh instance',
  coverage: {
    matrixRow: 'the F-RA-12 clause\'s own control — the ordinary prototypes the guard must not touch (contract.md §1\'s plain-object and array limbs)',
    scenario: 'an ordinary plain object and an ordinary array',
    start: '`{ a: 1 }` and `[1, 2]`, each → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const problems = [];
  const parts = [];
  for (const [label, value] of [['object', { a: 1 }], ['array', [1, 2]]]) {
    const drive = boundaryDrive(`LIVE-F09-${label}`, { mutate: null, value });
    if (!drive.answer.ok) problems.push(`${label}: the write THREW ${short(drive.answer.error && drive.answer.error.message)}`);
    const image = drive.after.length > 0 ? JSON.parse(drive.after) : null;
    if (!image || !sameTree(imageAt(image, ['a']), value)) problems.push(`${label}: the image's value at ['a'] is ${short(image && image.a)}`);
    if (!image || image.seed !== 'kept') problems.push(`${label}: the seed is not in the image`);
    const back = attempt(() => drive.fresh.read(['a'], 'file'));
    if (!back.ok || !sameTree(back.value, value)) problems.push(`${label}: read-back is not the bare tree: ${short(back.ok ? back.value : back.error)}`);
    if (!drive.register.ok || !sameTree(drive.register.value, { seed: 'kept', a: value })) problems.push(`${label}: the fresh register is ${short(drive.register.ok ? JSON.stringify(drive.register.value) : drive.register.error)}`);
    if (problems.length === 0) parts.push(`${label}: ADMITTED file=${drive.after.length}B image=${short(drive.after, 60)} read-back=${short(JSON.stringify(back.value), 40)}`);
  }
  return { green: { ok: problems.length === 0, detail: problems.length === 0 ? parts.join(' | ') : problems.join(' | ') } };
});

// ─────────────────────────────────────────────────────────────────────────────
// §12B.3 — `F-RA-13`'s THREE LIMBS (`LIVE-F10`–`LIVE-F15`)
//
// `contract.md §2.1`'s clause of 2026-10-24 on `F-RA-13`, items `(1a)`, `(1b)`, `(1c)` and `(6)`, with
// `test-cases.md` `JC-TC-52`, `JC-TC-53` and `JC-TC-54`. The render guard's three tests are per-call
// descriptor reads — one `@@toPrimitive` descriptor read per link, the `@@toStringTag` descriptor read, and the
// element reads — so `C-11` is untouched and no identity is captured. **Where an arm's subject is the refused
// value's own rendering and any of the three answers "caller code is reachable", the arm answers the ROW'S
// CLASS SPELLING and renders nothing.**
// ─────────────────────────────────────────────────────────────────────────────

/** The counted `Symbol.toPrimitive` member the two added-member cells install on a shape-standard prototype. */
const addedToPrimitive = (counter) => ({
  value() { counter.count += 1; return 'CALLER-CONTROLLED SUBJECT'; },
  writable: true,
  enumerable: false,
  configurable: true,
});

seededRefusalCell('LIVE-F10', {
  green: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, item (1a) · test-cases.md JC-TC-52 (the Object.prototype limb)',
  scenario: 'F-RA-13(1a) — an ADDED `Symbol.toPrimitive` on `Object.prototype`: row 8\'s DEPTH arm answers `a value over the walk ceiling` and row 3 answers `a function`, the added member counted at `0`',
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, items (1a) and (6) — the added-`Symbol.toPrimitive` read · test-cases.md JC-TC-52',
    scenario: 'an ADDED `Symbol.toPrimitive` on `Object.prototype`, at row 8\'s depth arm and at row 3',
    start: '`Object.defineProperty(Object.prototype, Symbol.toPrimitive, { value() { … }, configurable: true })` (installed, restored in a `finally`, measured) → a `{}` at depth 127 and a plain function at the root → `write([\'a\'], \'file\', value)` on REAL seeded stores → FRESH instances over the same `store.json`',
  },
}, () => {
  const counter = { count: 0 };
  const depthDrive = boundaryDrive('LIVE-F10a', {
    mutate: { proto: Object.prototype, name: Symbol.toPrimitive, descriptor: addedToPrimitive(counter) },
    value: wrap({ a: 1 }, 127),
  });
  const depthCheck = seededRefusalChecks(depthDrive, { cls: 'ceiling', position: depthPosition(127), subject: CLASS.ceiling });
  const fnDrive = boundaryDrive('LIVE-F10b', {
    mutate: { proto: Object.prototype, name: Symbol.toPrimitive, descriptor: addedToPrimitive(counter) },
    value: function h() { return 2; },
  });
  const fnCheck = seededRefusalChecks(fnDrive, { cls: 'function', position: ROOT_POSITION, subject: CLASS.function });
  const problems = [];
  if (!depthCheck.ok) problems.push(`depth arm: ${depthCheck.detail}`);
  if (!fnCheck.ok) problems.push(`row 3: ${fnCheck.detail}`);
  if (counter.count !== 0) problems.push(`the added Symbol.toPrimitive RAN on the refusal path (count=${counter.count})`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `depth arm subject="a value over the walk ceiling" · row 3 subject="a function" · added-member counter=0; ${depthCheck.detail}`
        : problems.join('; '),
    },
  };
});

seededRefusalCell('LIVE-F11', {
  green: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, item (1a) · test-cases.md JC-TC-52 (the Function.prototype limb and the CONTROL)',
  scenario: 'F-RA-13(1a) — the same ADDED `Symbol.toPrimitive` on `Function.prototype`: row 3 answers `a function` with the member counted at `0`, and the CONTROL (the member is not on an ordinary `{}`\'s chain) leaves `[object Object]` unmoved',
  cls: 'function',
  position: ROOT_POSITION,
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, items (1a), (2) and (6) — the added member on `Function.prototype`, and the off-chain CONTROL · test-cases.md JC-TC-52',
    scenario: 'an ADDED `Symbol.toPrimitive` on `Function.prototype`, driven at row 3, with the off-chain control',
    start: '`Object.defineProperty(Function.prototype, Symbol.toPrimitive, { value() { … }, configurable: true })` (installed, restored in a `finally`, measured) → a plain function at the root and a `{}` at depth 127 → `write([\'a\'], \'file\', value)` on REAL seeded stores → FRESH instances over the same `store.json`',
  },
}, () => {
  const counter = { count: 0 };
  const fnDrive = boundaryDrive('LIVE-F11a', {
    mutate: { proto: Function.prototype, name: Symbol.toPrimitive, descriptor: addedToPrimitive(counter) },
    value: function h() { return 2; },
  });
  const fnCheck = seededRefusalChecks(fnDrive, { cls: 'function', position: ROOT_POSITION, subject: CLASS.function });
  const leafDrive = boundaryDrive('LIVE-F11b', {
    mutate: { proto: Function.prototype, name: Symbol.toPrimitive, descriptor: addedToPrimitive(counter) },
    value: wrap({ a: 1 }, 127),
  });
  const leafCheck = seededRefusalChecks(leafDrive, { cls: 'ceiling', position: depthPosition(127), subject: '[object Object]' });
  const problems = [];
  if (!fnCheck.ok) problems.push(`row 3: ${fnCheck.detail}`);
  if (!leafCheck.ok) problems.push(`off-chain control: ${leafCheck.detail}`);
  if (counter.count !== 0) problems.push(`the added Symbol.toPrimitive RAN on the refusal path (count=${counter.count})`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `row 3 subject="a function" · off-chain control subject="[object Object]" · added-member counter=0; ${fnCheck.detail}`
        : problems.join('; '),
    },
  };
});

seededRefusalCell('LIVE-F12', {
  green: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, item (1b) · test-cases.md JC-TC-53 (the own accessor)',
  scenario: 'F-RA-13(1b) — an OWN `Symbol.toStringTag` ACCESSOR: row 8\'s DEPTH arm answers `a value over the walk ceiling` and its own value position answers row 5\'s `a value carrying a Symbol-keyed own member`, the getter counted at `0`',
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, items (1b) and (6) — the own `@@toStringTag` accessor · test-cases.md JC-TC-53',
    scenario: 'an OWN `Symbol.toStringTag` accessor, at row 8\'s depth arm and at its own value position',
    start: '`Object.defineProperty(<{}>, Symbol.toStringTag, { get() { counter += 1; return \'TAGGED\'; } })` → the value at depth 127 and at the root → `write([\'a\'], \'file\', value)` on REAL seeded stores → FRESH instances over the same `store.json`',
  },
}, () => {
  const counters = { 'toStringTag-getter': 0 };
  const leaf = { a: 1 };
  Object.defineProperty(leaf, Symbol.toStringTag, { get() { counters['toStringTag-getter'] += 1; return 'TAGGED'; }, configurable: true });
  const depthDrive = boundaryDrive('LIVE-F12a', { mutate: null, value: wrap(leaf, 127) });
  const depthCheck = seededRefusalChecks(depthDrive, { cls: 'ceiling', position: depthPosition(127), subject: CLASS.ceiling });
  const ownDrive = boundaryDrive('LIVE-F12b', { mutate: null, value: leaf });
  const ownCheck = seededRefusalChecks(ownDrive, { cls: 'symbolKey', position: ROOT_POSITION, subject: CLASS.symbolKey });
  const problems = [];
  if (!depthCheck.ok) problems.push(`depth arm: ${depthCheck.detail}`);
  if (!ownCheck.ok) problems.push(`own position: ${ownCheck.detail}`);
  if (counters['toStringTag-getter'] !== 0) problems.push(`the own tag getter RAN on the refusal path (count=${counters['toStringTag-getter']})`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `depth arm subject="a value over the walk ceiling" · own position subject="a value carrying a Symbol-keyed own member" · getter=0; ${depthCheck.detail}`
        : problems.join('; '),
    },
  };
});

seededRefusalCell('LIVE-F13', {
  green: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, item (1b) · test-cases.md JC-TC-53 (the added accessor)',
  scenario: 'F-RA-13(1b) — an ADDED `Symbol.toStringTag` ACCESSOR on `Object.prototype`: row 8\'s DEPTH arm answers `a value over the walk ceiling`, the getter counted at `0`',
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, items (1b) and (6) — the added `@@toStringTag` accessor · test-cases.md JC-TC-53',
    scenario: 'an ADDED `Symbol.toStringTag` accessor on `Object.prototype`, at row 8\'s depth arm',
    start: '`Object.defineProperty(Object.prototype, Symbol.toStringTag, { get() { counter += 1; return \'TAGGED\'; }, configurable: true })` (installed, restored in a `finally`, measured) → a `{}` at depth 127 → `write([\'a\'], \'file\', value)` on a REAL seeded store → a FRESH instance over the same `store.json`',
  },
}, () => {
  const counters = { 'toStringTag-getter': 0 };
  const drive = boundaryDrive('LIVE-F13', {
    mutate: {
      proto: Object.prototype,
      name: Symbol.toStringTag,
      descriptor: { get() { counters['toStringTag-getter'] += 1; return 'TAGGED'; }, configurable: true },
    },
    value: wrap({ a: 1 }, 127),
  });
  return { drive, subject: CLASS.ceiling, counters };
});

seededRefusalCell('LIVE-F14', {
  green: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, item (1c) · test-cases.md JC-TC-54 (the element limb)',
  scenario: 'F-RA-13(1c) — an ARRAY at row 8\'s DEPTH arm whose ELEMENT carries a conversion member (own, prototype-supplied, and an own ACCESSOR at an index beside it): `a value over the walk ceiling`, every counter `0`',
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24 on F-RA-13, items (1c) and (6) — the array-element reads · test-cases.md JC-TC-54',
    scenario: 'an array at row 8\'s depth arm whose elements carry conversion members',
    start: '`[<element owning toString>]`, `[<element whose toString sits on a custom prototype>]` and `[<element whose index 0 is an own accessor>]`, each wrapped to depth 127 → `write([\'a\'], \'file\', value)` on REAL seeded stores → FRESH instances over the same `store.json`',
  },
}, () => {
  const counters = { 'element-own-toString': 0, 'element-prototype-toString': 0, 'element-index-getter': 0 };
  const owned = { v: 1 };
  Object.defineProperty(owned, 'toString', { value() { counters['element-own-toString'] += 1; return 'ELEMENT-RAN'; }, configurable: true });
  const aDrive = boundaryDrive('LIVE-F14a', { mutate: null, value: wrap([owned], 127) });
  const aCheck = seededRefusalChecks(aDrive, { cls: 'ceiling', position: depthPosition(127), subject: CLASS.ceiling });
  const protoSupplied = Object.create({ toString() { counters['element-prototype-toString'] += 1; return 'PROTO-ELEMENT-RAN'; } });
  protoSupplied.v = 1;
  const bDrive = boundaryDrive('LIVE-F14b', { mutate: null, value: wrap([protoSupplied], 127) });
  const bCheck = seededRefusalChecks(bDrive, { cls: 'ceiling', position: depthPosition(127), subject: CLASS.ceiling });
  const accessor = [1, 2];
  Object.defineProperty(accessor, 0, { get() { counters['element-index-getter'] += 1; return 1; }, configurable: true });
  const cDrive = boundaryDrive('LIVE-F14c', { mutate: null, value: wrap([accessor], 127) });
  const cCheck = seededRefusalChecks(cDrive, { cls: 'ceiling', position: depthPosition(127), subject: CLASS.ceiling });
  const problems = [];
  if (!aCheck.ok) problems.push(`own element: ${aCheck.detail}`);
  if (!bCheck.ok) problems.push(`prototype element: ${bCheck.detail}`);
  if (!cCheck.ok) problems.push(`accessor element: ${cCheck.detail}`);
  for (const [label, count] of Object.entries(counters)) if (count !== 0) problems.push(`${label} RAN on the refusal path (count=${count})`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `own element subject="a value over the walk ceiling" · prototype element the same · accessor element the same · trap=element-own-toString:0,element-prototype-toString:0,element-index-getter:0; ${aCheck.detail}`
        : problems.join('; '),
    },
  };
});

seededRefusalCell('LIVE-F15', {
  green: 'CONTROL of F-RA-13 · contract.md §2.1\'s clause of 2026-10-24, item (2) — the three sanctioned renderings stand',
  scenario: 'F-RA-13 CONTROL — on the UNMUTATED intrinsic chains the three sanctioned renderings stand: an ordinary `{}` at depth 127 answers `[object Object]`, an ordinary `[1, 2]` answers `1,2`, and a plain function answers its own source text',
  cls: 'ceiling',
  position: depthPosition(127),
  coverage: {
    matrixRow: 'contract.md §2.1\'s clause of 2026-10-24, item (2) — the three sanctioned renderings the exemption buys at the two conditional arms · test-cases.md JC-TC-52 (its CONTROL half)',
    scenario: 'the three sanctioned renderings on the unmutated intrinsic chains',
    start: 'an ordinary `{}` and `[1, 2]` at depth 127, and a plain function at the root, each → `write([\'a\'], \'file\', value)` on REAL seeded stores → FRESH instances over the same `store.json`',
  },
}, () => {
  const objDrive = boundaryDrive('LIVE-F15a', { mutate: null, value: wrap({ a: 1 }, 127) });
  const objCheck = seededRefusalChecks(objDrive, { cls: 'ceiling', position: depthPosition(127), subject: '[object Object]' });
  const arrDrive = boundaryDrive('LIVE-F15b', { mutate: null, value: wrap([1, 2], 127) });
  const arrCheck = seededRefusalChecks(arrDrive, { cls: 'ceiling', position: depthPosition(127), subject: '1,2' });
  const plainFunction = function g() { return 1; };
  const fnDrive = boundaryDrive('LIVE-F15c', { mutate: null, value: plainFunction });
  const fnCheck = seededRefusalChecks(fnDrive, { cls: 'function', position: ROOT_POSITION, subject: String(plainFunction) });
  const problems = [];
  if (!objCheck.ok) problems.push(`ordinary object: ${objCheck.detail}`);
  if (!arrCheck.ok) problems.push(`ordinary array: ${arrCheck.detail}`);
  if (!fnCheck.ok) problems.push(`plain function: ${fnCheck.detail}`);
  return {
    green: {
      ok: problems.length === 0,
      detail: problems.length === 0
        ? `object subject="[object Object]" · array subject="1,2" · function subject=${JSON.stringify(String(plainFunction))} · trap=none at all three; ${objCheck.detail}`
        : problems.join('; '),
    },
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// §12B.4 — THE RESIDUAL THAT REMAINS: AN OVERRIDDEN MEMBER ON A SHAPE-STANDARD PROTOTYPE (`LIVE-F16`–`LIVE-F18`)
//
// `contract.md §2.1`'s residual clause (items `(3)`, `(9)(d)` and `(10)`) and `DEF-2026-10-24-E`'s disposition:
// an **OVERRIDDEN** `toString`/`valueOf` (or `join`) on a shape-standard prototype is **declared, not closed** —
// closing it needs an identity `C-11` forbids. **These three cells are OBSERVED DECLARATION CONFORMANCE, never
// passes:** each measures that the caller's overridden member DOES run and what the subject becomes, so the
// record states the residual as the documents state it.
// ─────────────────────────────────────────────────────────────────────────────

observedCell({
  id: 'LIVE-F16',
  green: '(none — OBSERVED declaration conformance to contract.md §2.1\'s residual clause; DEF-2026-10-24-E (d))',
  scenario: 'THE RESIDUAL — an OVERRIDDEN `Object.prototype.toString` on a shape-standard prototype: the caller\'s member RUNS at row 8\'s DEPTH arm and becomes PART ONE\'s subject',
  coverage: {
    matrixRow: 'contract.md §2.1\'s residual clause (items (3), (9)(d), (10)) — an OVERRIDDEN conversion member on a shape-standard prototype, declared NOT closed',
    scenario: 'an OVERRIDDEN `Object.prototype.toString`, at row 8\'s depth arm',
    start: '`Object.prototype.toString = function () { counter += 1; return \'OVERRIDDEN-SUBJECT\'; }` (installed, restored in a `finally`, measured) → a `{}` at depth 127 → `write([\'a\'], \'file\', value)` on a REAL seeded store',
  },
}, () => {
  const counters = { 'overridden-toString': 0 };
  const drive = boundaryDrive('LIVE-F16', {
    mutate: {
      proto: Object.prototype,
      name: 'toString',
      descriptor: { value() { counters['overridden-toString'] += 1; return 'OVERRIDDEN-SUBJECT'; }, writable: true, configurable: true },
    },
    value: wrap({ a: 1 }, 127),
  });
  const subject = drive.answer.ok ? null : partOneSubject(drive.answer.error.message);
  const status = drive.answer.ok ? 'ADMITTED' : drive.answer.error.status;
  return `subject=${JSON.stringify(subject)} overridden-toString-runs=${counters['overridden-toString']} status=${JSON.stringify(status)} file=${drive.after.length}B unchanged=${drive.after === drive.before} restored=${BOUNDARY_RESTORE_LOG.filter((entry) => entry.id === 'LIVE-F16').every((entry) => entry.restored)} — the DECLARED residual, conforming: the caller's member ran and its string is PART ONE's subject`;
});

observedCell({
  id: 'LIVE-F17',
  green: '(none — OBSERVED declaration conformance to contract.md §2.1\'s residual clause; DEF-2026-10-24-E (d))',
  scenario: 'THE RESIDUAL — an OVERRIDDEN `Object.prototype.valueOf` on a shape-standard prototype: `valueOf` is NOT reached (the language\'s `String` consults `toString` first), so the subject stays `[object Object]` and the override is counted at `0`',
  coverage: {
    matrixRow: 'contract.md §2.1\'s residual clause (items (3), (9)(d), (10)) — an OVERRIDDEN `valueOf` on a shape-standard prototype, declared NOT closed',
    scenario: 'an OVERRIDDEN `Object.prototype.valueOf`, at row 8\'s depth arm',
    start: '`Object.prototype.valueOf = function () { counter += 1; return 7; }` (installed, restored in a `finally`, measured) → a `{}` at depth 127 → `write([\'a\'], \'file\', value)` on a REAL seeded store',
  },
}, () => {
  const counters = { 'overridden-valueOf': 0 };
  const drive = boundaryDrive('LIVE-F17', {
    mutate: {
      proto: Object.prototype,
      name: 'valueOf',
      descriptor: { value() { counters['overridden-valueOf'] += 1; return 7; }, writable: true, configurable: true },
    },
    value: wrap({ a: 1 }, 127),
  });
  const subject = drive.answer.ok ? null : partOneSubject(drive.answer.error.message);
  return `subject=${JSON.stringify(subject)} overridden-valueOf-runs=${counters['overridden-valueOf']} status=${JSON.stringify(drive.answer.ok ? 'ADMITTED' : drive.answer.error.status)} — the DECLARED residual, conforming: the override alone does not move the subject, because ToPrimitive prefers toString on this value`;
});

observedCell({
  id: 'LIVE-F18',
  green: '(none — OBSERVED declaration conformance to contract.md §2.1\'s residual clause; DEF-2026-10-24-E (d))',
  scenario: 'THE RESIDUAL — an OVERRIDDEN `Array.prototype.join` on a shape-standard prototype at row 8\'s DEPTH arm: the caller\'s `join` RUNS TWICE (the subject by `String(value)`, and the POSITION spelling by `valuePosition`\'s own `.join`), and the position part becomes `member JOIN-RAN of …`',
  coverage: {
    matrixRow: 'contract.md §2.1\'s residual clause (items (3), (9)(d), (10)) — an OVERRIDDEN `join` on a shape-standard prototype, declared NOT closed, measured at BOTH the subject and the position',
    scenario: 'an OVERRIDDEN `Array.prototype.join`, at row 8\'s depth arm',
    start: '`Array.prototype.join = function () { counter += 1; return \'JOIN-RAN\'; }` (installed, restored in a `finally`, measured) → `[1, 2]` at depth 127 → `write([\'a\'], \'file\', value)` on a REAL seeded store',
  },
}, () => {
  const counters = { 'overridden-join': 0 };
  const drive = boundaryDrive('LIVE-F18', {
    mutate: {
      proto: Array.prototype,
      name: 'join',
      descriptor: { value() { counters['overridden-join'] += 1; return 'JOIN-RAN'; }, writable: true, configurable: true },
    },
    value: wrap([1, 2], 127),
  });
  const message = drive.answer.ok ? '' : drive.answer.error.message;
  const subject = drive.answer.ok ? null : partOneSubject(message);
  const marker = ', the value at ';
  const positionPart = message.length > 0 ? message.slice(message.lastIndexOf(marker) + marker.length) : '';
  return `subject=${JSON.stringify(subject)} overridden-join-runs=${counters['overridden-join']} position-part=${JSON.stringify(short(positionPart, 160))} status=${JSON.stringify(drive.answer.ok ? 'ADMITTED' : drive.answer.error.status)} — the DECLARED residual, conforming, and a SECOND caller-code path named: the position spelling itself takes .join off the mutable prototype`;
});

// ═════════════════════════════════════════════════════════════════════════════
// §13. THE SUMMARY, THE STORE PATHS AND THE CLEANUP
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
const entrySha256 = crypto.createHash('sha256').update(fs.readFileSync(ENTRY)).digest('hex');
const kernelSha256 = crypto.createHash('sha256').update(fs.readFileSync(KERNEL)).digest('hex');
console.log(`ENTRY-SHA256 ${entrySha256}`);
console.log(`KERNEL-SHA256 ${kernelSha256}`);

// **THE PROTOTYPES, RESTORED AND MEASURED** — `§1A`: every mutation state is undone in a `finally`, and the
// four censuses are re-read afterwards and compared with the baseline taken before the state was applied.
const restoreAll = RESTORE_LOG.every((row) => row.restored);
console.log(`PROTOTYPES-RESTORED state-instances=${RESTORE_LOG.length} all=${restoreAll} baseline=${JSON.stringify(RESTORE_LOG[0] ? RESTORE_LOG[0].baseline : null)}`);
for (const row of RESTORE_LOG) if (!row.restored) console.log(`RESTORE-FAIL ${row.state} :: ${JSON.stringify(row)}`);

// **THE CALLER-SIDE DELETIONS, RESTORED AND MEASURED** — `§12A.3`: `delete Array.prototype.map` is taken for
// the body's duration only, the descriptor is restored in a `finally`, and the entry proves the restored
// member is the SAME function object with the same flags.
const deletionsRestored = DELETION_LOG.every((row) => row.presentBefore && row.presentUnderDeletion && row.restored && row.identityRestored);
console.log(`DELETION-RESTORED state-instances=${DELETION_LOG.length} all=${deletionsRestored} entries=${JSON.stringify(DELETION_LOG)}`);
for (const row of DELETION_LOG) if (!(row.restored && row.identityRestored)) console.log(`RESTORE-FAIL deletion ${row.id} :: ${JSON.stringify(row)}`);

// **THE `DEF-2026-10-24-E` BOUNDARY STATES, RESTORED AND MEASURED** — `§12B`: every caller-side prototype state
// (`Array.prototype[0]`, `Object.prototype`/`Function.prototype`'s added `Symbol.toPrimitive`, the two
// `Symbol.toStringTag` accessors, and the three residual overrides) is installed for one body's duration only,
// the EXACT prior descriptor is restored in the harness's `finally`, and the entry proves the restored member
// is the SAME function/getter object with the same flags (or absent, where it was absent).
const boundaryRestored = BOUNDARY_RESTORE_LOG.every((row) => row.presentWhileInstalled && row.restored);
console.log(`BOUNDARY-PROTOTYPES-RESTORED state-instances=${BOUNDARY_RESTORE_LOG.length} all=${boundaryRestored} entries=${JSON.stringify(BOUNDARY_RESTORE_LOG)}`);
for (const row of BOUNDARY_RESTORE_LOG) if (!row.restored) console.log(`RESTORE-FAIL boundary ${row.id} :: ${JSON.stringify(row)}`);

// **THE MUTATION MATRIX, READ OFF THE RESULTS** — one line per state, one token per drive: the measured verdict.
const matrixLine = MUTATION_STATES.map((state) => {
  const rows = RESULTS.filter((row) => row.coverage && row.coverage.state === state.id);
  const cells = rows.map((row) => `${row.coverage.shape}=${row.verdict}`);
  const passed = rows.filter((row) => row.verdict === 'PASS').length;
  return `${state.id}(${passed}/${rows.length}) ${cells.join(' ')}`;
}).join(' | ');
console.log(`MUTATION-MATRIX ${matrixLine}`);

const tally = (verdict) => RESULTS.filter((r) => r.verdict === verdict).length;
console.log('---');
console.log(`SUMMARY reach=${REACH} cells=${RESULTS.length} pass=${tally('PASS')} fail=${tally('FAIL')} finding=${tally('FINDING')} observed=${tally('OBSERVED')}`);
for (const row of RESULTS) {
  if (row.verdict === 'FAIL' || row.verdict === 'FINDING') console.log(`VIOLATION ${row.id} ${row.verdict} :: ${row.detail}`);
}

// **THE STRUCTURED COVERAGE EVIDENCE (the `D-GP-UFA` §6.1 duty, applied to this re-drive).** This unit has no
// `§5.U` user-flow-audit matrix (no `docs/specs/user-flow-audit.md` in this repository), so the matrix rows this
// section binds to are the clauses named in each row. **`summary.total` IS the row count — built from the row
// array itself, so it cannot drift from it** — and every row was driven by a real input through the live
// surface named beside it, every end point is the SETTLED state, and `proxy_pass` is `false` throughout.
const coverageRows = RESULTS.filter((row) => row.coverage).map((row) => ({
  cell: row.id,
  matrix_row: row.coverage.matrixRow,
  scenario: row.coverage.scenario,
  start: row.coverage.start,
  end: row.detail,
  verdict: row.verdict,
  real_input: true,
  proxy_pass: false,
  surface: {
    // **THE LIVE SURFACE, PER ROW: the reach label plus the claim that it was PRESENT.** The exact paths and
    // hashes of the entry, kernel and addon every row ran against are carried ONCE, in `live_surface` below,
    // because all rows of this section share the one mapped surface — the per-row field is the claim, and it
    // is the same claim on every row.
    target: REACH,
    live_surface_present: true,
  },
}));
const countVerdict = (verdict) => coverageRows.filter((row) => row.verdict === verdict).length;
const coverage = {
  unit: 'U-STOREROOM-JSON-CROSSING',
  drive: 're-drive-2026-10-24-c-after-the-four-boundary-laws-F-RA-11-F-RA-12-F-RA-13-and-the-residual-override',
  clauses: [
    'docs/specs/storeroom-json-crossing/contract.md §1 — its clause of 2026-10-24 (items (1)–(9)) and its clause of 2026-10-24 on F-RA-3 (items (3)–(6), the caller-side deletion)',
    // **§2's clause is named here because it is the HOME of the two class decisions the controls drive
    // (`LIVE-C04`/`LIVE-C05` at rows `14`/`13`) and of the member-position admission `LIVE-C03` drives
    // (item `(3)`); it is ALSO the home of row `17` (`F-RA-5`, its clause of 2026-10-24) and — from this pass —
    // of `F-RA-11`'s own-property hole test and of `F-RA-12`'s `Proxy` prototype link; `§2.1`'s clause is
    // named beside it as the home of the `<subject>` cells, of the conversion guard's chain walk and of the
    // `F-RA-13` render guard's three tests.**
    'docs/specs/storeroom-json-crossing/contract.md §2 — its clause of 2026-10-24 (items (1)–(6)), its clause of 2026-10-24 on F-RA-5 (row 17, items (3), (5), (6), (8)), its clause of 2026-10-24 on F-RA-11 (the own-property density test, items (1)–(7)) and its clause of 2026-10-24 on F-RA-12 (a `Proxy` prototype link, items (1)–(7))',
    'docs/specs/storeroom-json-crossing/contract.md §2.1 — its clause of 2026-10-24 (items (1)–(7)), its clause of 2026-10-24 (items (1)–(12), the exemption at its exact boundary and the chain walk), and its clause of 2026-10-24 on F-RA-13 (items (1a), (1b), (1c) and (6), the render guard\'s three tests) with the residual clause those items narrow',
    'docs/specs/storeroom-json-crossing/test-cases.md §3 — JC-TC-49, the seventeenth class; and JC-TC-50, JC-TC-51, JC-TC-52, JC-TC-53 and JC-TC-54, the five cells of 2026-10-24',
    'docs/defects.md · DEF-2026-10-24-C',
    'docs/defects.md · DEF-2026-10-24-D',
    'docs/defects.md · DEF-2026-10-24-E',
  ],
  live_surface: {
    reach: REACH,
    entry: ENTRY,
    entry_sha256: entrySha256,
    kernel: KERNEL,
    kernel_sha256: kernelSha256,
    addon: addonPath,
    addon_bytes: addonBytes,
    addon_md5: addonMd5,
    node: process.version,
  },
  rows: coverageRows,
  summary: {
    total: coverageRows.length,
    pass: countVerdict('PASS'),
    fail: countVerdict('FAIL'),
    finding: countVerdict('FINDING'),
    observed: countVerdict('OBSERVED'),
    proxy_pass: 0,
    parked: 0,
  },
};
console.log(`COVERAGE ${JSON.stringify(coverage)}`);

// THE EXACT STORE PATHS, printed before the cleanup removes them.
for (const [id, filePath] of PATHS) console.log(`STORE ${id} ${filePath}`);

const dirs = fs.readdirSync(ROOT).length;
fs.rmSync(ROOT, { recursive: true, force: true });
const removed = !fs.existsSync(ROOT);
console.log(`CLEANUP root=${ROOT} dirs=${dirs} removed=${removed}`);

const failed = tally('FAIL') + tally('FINDING');
console.log(`EXIT ${failed === 0 ? 0 : 1} (exit 0 iff no cell FAILed and no cell was a FINDING)`);
process.exitCode = failed === 0 ? 0 : 1;
