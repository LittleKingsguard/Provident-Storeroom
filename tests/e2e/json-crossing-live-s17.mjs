#!/usr/bin/env node
// ============================================================================
// THE `§17` LIVE BATTERY for `U-STOREROOM-JSON-CROSSING` — THE SIX BOUNDARY LAWS THAT LANDED AFTER `§16`
// (`LIVE-G01`–`LIVE-G18`), driven against the RUNNING PACKAGE over REAL stores on REAL disk.
//
//   the contract: docs/specs/storeroom-json-crossing/contract.md §2.1 — the clauses of 2026-10-24 on
//                 `F-RA-18` (a carrier position's subject), `F-RA-20` (the element limb's path test),
//                 `F5-1`/`F5-2`/`F6-1` (the per-call position budget), `F5-3` (a callable `Proxy` at a carrier
//                 slot), `F5-4` (the position spelling invokes nothing from a mutable prototype) and
//                 `F6-2` (`hasLoneSurrogate` invokes nothing from a mutable prototype)
//   the cases:    docs/specs/storeroom-json-crossing/test-cases.md §3/§4 — `JC-TC-55`…`JC-TC-61`
//   this harness: tests/e2e/json-crossing-live-s17.mjs   ⟶ MOVED 2026-10-25 (`D-5`), FROM `bindings/js/greens/json-crossing-live-s17.mjs`.
//   the report:   docs/specs/storeroom-json-crossing-live-report.md §17
//
// WHY A SECOND FILE AND NOT A NEW SECTION OF THE 144-CELL BATTERY. `§16` appended its `18` boundary cells
// INSIDE `json-crossing-live.mjs` and the battery's census became `144` cells. This pass must (a) re-drive the
// six NEW laws at the assembled layer and (b) re-run the `144`-cell battery unchanged so the supervisor sees
// nothing regressed — INCLUDING the byte-identity of every one of the battery's `144` `RESULT` lines against
// the `§16` pass. Adding cells to that file would move its census and rewrite its summary line, so the six
// laws are driven here, in their own harness, and the battery is re-run exactly as `§16` left it.
//
// THE SCENARIO RULE THIS HARNESS BINDS ITSELF TO (the live battery's own, `§1`'s):
//   1. EVERY cell starts from a REAL USER INPUT — a caller's value handed to the public surface — and runs to
//      the FINAL RESOLVED STATE.
//   2. EVERY REFUSAL CELL ends at ITS settled state: the refusal's status/class/position/subject; the store's
//      file on disk BYTE-IDENTICAL to a COMMITTED SEED's image; the register unmoved (`{"seed":"kept"}`); a
//      FRESH instance over the same `store.json` booting to the same register and answering `AddressNotFound`
//      at the uncommitted address; and the seed still reading back as `'kept'`.
//   3. EVERY CALLER-SIDE MUTATION is installed by a harness that restores the EXACT prior descriptor in a
//      `finally` and MEASURES the restore (the same function/getter object and the same flags, or absence
//      where the member was absent), and every instrument (an override counter, a handler trap) is proved
//      LIVE by a direct read BEFORE the `0` it is charged with is asserted.
//   4. A LIVE RESULT THAT CONTRADICTS THE CONTRACT OR THE NODE-LAYER CELL IS A FINDING. It is recorded and
//      reported; no green is weakened and no implementation byte is edited.
//
// THE TWO UNBOUNDED WITNESSES RUN WHERE A CLOCK CAN STOP THEM (the driving discipline `JC-TC-57`/`JC-TC-60`
// established at the node layer): each is driven in its OWN CHILD PROCESS, which times the `write` call alone
// and reports the refusal beside its own settled-state facts; a child still running at `5,000 + 2,000` ms is
// KILLED and the timeout is REPORTED, never silently dropped.
// ═════════════════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENTRY = process.env.JC_ENTRY ?? path.join(HERE, '..', '..', 'bindings', 'js', 'index.mjs');
const KERNEL = process.env.JC_KERNEL ?? path.join(HERE, '..', '..', 'bindings', 'js', 'src', 'constraint-kernel.mjs');
const REACH = process.env.JC_ENTRY === undefined ? 'LIVE/CHECKOUT' : 'LIVE/ENTRY-FROM-ENV';

const PKG = await import(pathToFileURL(ENTRY).href);
const K = await import(pathToFileURL(KERNEL).href);

// ─────────────────────────────────────────────────────────────────────────────
// §0. THE DECLARED SPELLINGS AND FIGURES — each read from the documents, none invented
// ─────────────────────────────────────────────────────────────────────────────

const PART_ONE = 'is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays';
const ROOT_POSITION = "the write's value argument";
const STATUS = 'ValueRefusedAtBoundary';
const NODE_CEILING = 1_000_000;
const WALL_CLOCK_CEILING_MS = 5000;
const WALL_CLOCK_KILL_MS = WALL_CLOCK_CEILING_MS + 2000;

const CLASS = {
  ceiling: 'a value over the walk ceiling',
  loneSurrogate: 'a string carrying a lone surrogate',
  functionValue: 'a function',
  bigint: 'a bigint',
  plain: 'a plain object',
  proxy: 'a Proxy',
};

// THE DEPTH ARM'S OWN POSITION: `127` segments of `0` (the figure `A149` fixes and `§16` drove).
const DEEP_PATH = `member ${Array(127).fill('0').join('/')} of ${ROOT_POSITION}`;
// THE KEY POSITION `JC-TC-61` declares: `valuePosition`'s own lone-surrogate key form.
const KEY_POSITION = `member '<key: a string carrying a lone surrogate>' of ${ROOT_POSITION}`;
const MEMBER_A_POSITION = `member 'a' of ${ROOT_POSITION}`;
const MEMBER_NESTED_POSITION = `member 'a'/'b' of ${ROOT_POSITION}`;

// ─────────────────────────────────────────────────────────────────────────────
// §1. THE HARNESS — the temp root, the cells, the seeded store, the measured restore
// ─────────────────────────────────────────────────────────────────────────────

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'jcx-s17-'));
const PATHS = new Map(); // cell id -> the exact `cfg.filePath` used
const RESULTS = [];
const RESTORE_LOG = [];
const WITNESS_LOG = [];

let CURRENT = null;

function cell(spec, body) {
  CURRENT = spec;
  let green;
  let verdict;
  let detail;
  try {
    const r = body();
    green = r.green ?? { ok: true, detail: '' };
    verdict = green.ok ? 'PASS' : 'FAIL';
    detail = green.detail;
  } catch (error) {
    verdict = 'FAIL';
    detail = `UNDECLARED THROW: ${describe(error)}`;
  }
  RESULTS.push({ id: spec.id, scenario: spec.scenario, verdict, detail, coverage: spec.coverage ?? null });
  console.log(`RESULT ${spec.id} ${verdict} :: ${spec.scenario} :: green=${spec.green} :: ${detail}`);
  CURRENT = null;
  return verdict;
}

function observedCell(spec, body) {
  CURRENT = spec;
  let value;
  try {
    value = body();
    RESULTS.push({ id: spec.id, scenario: spec.scenario, verdict: 'OBSERVED', detail: value, coverage: spec.coverage ?? null });
    console.log(`RESULT ${spec.id} OBSERVED :: ${spec.scenario} :: green=${spec.green} :: ${value}`);
  } catch (error) {
    RESULTS.push({ id: spec.id, scenario: spec.scenario, verdict: 'OBSERVED', detail: `observation threw: ${describe(error)}`, coverage: spec.coverage ?? null });
    console.log(`RESULT ${spec.id} OBSERVED :: ${spec.scenario} :: green=${spec.green} :: observation threw: ${describe(error)}`);
  }
  CURRENT = null;
}

function dirFor(id) {
  return fs.mkdtempSync(path.join(ROOT, `${id}-`));
}

function bootStore(filePath) {
  return PKG.storeCreate({ filePath, journalLength: 8, listeners: [] });
}

/** The public write, followed to the act that writes `cfg.filePath` — the package's own commit route. */
function writeAndCommit(store, address, value) {
  const record = K.commit(store, address, 'file', value);
  return K.runAttempt(store, record);
}

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return { ok: false, error };
  }
}

const short = (value, max = 180) => {
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
    if ('status' in value || 'message' in value) {
      return `thrown{${Object.keys(value).join(',')}} status=${JSON.stringify(value.status)} message=${short(value.message, 120)}`;
    }
    try {
      return JSON.stringify(value);
    } catch {
      return `object{${Object.keys(value).join(',')}}`;
    }
  }
  return `${typeof value} ${String(value)}`;
}

function sameTree(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a === 'number' || typeof b === 'number') return Object.is(a, b);
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;
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

const isAddressNotFound = (r) =>
  r.ok === false && r.error !== null && typeof r.error === 'object' && r.error.status === 'AddressNotFound';

/** The PART ONE subject a walk refusal names, read from the message's own bytes. */
function partOneSubject(message) {
  const marker = ' is not a value the JavaScript crossing admits';
  const at = message.indexOf(marker);
  if (at < 0) return null;
  const quoted = message.slice(0, at);
  if (quoted.length < 2 || quoted[0] !== "'" || quoted[quoted.length - 1] !== "'") return quoted;
  return quoted.slice(1, -1);
}

function refusalAnswer(error) {
  if (error === null || typeof error !== 'object') return { ok: false, why: `not a thrown object: ${describe(error)}` };
  const message = error.message;
  if (typeof error.status !== 'string') return { ok: false, why: `status is not a string: ${describe(error)}` };
  if (typeof message !== 'string' || message.length === 0) return { ok: false, why: 'message is not a non-empty string' };
  const marker = ', the value at ';
  const at = message.lastIndexOf(marker);
  if (at < 0) return { ok: false, why: `PART TWO is absent: ${short(message, 200)}` };
  return {
    ok: true,
    status: error.status,
    message,
    partOne: message.slice(0, at),
    positionAndClass: message.slice(at + marker.length),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// §1A. THE SEEDED STORE — the state under assertion is "the store's file bytes unchanged; the register
//      unmoved", a claim about a NON-EMPTY store, so every refusal cell seeds `['seed'] = 'kept'` through the
//      package's own commit route first.
// ─────────────────────────────────────────────────────────────────────────────

function seed(id) {
  const dir = dirFor(id);
  const filePath = path.join(dir, 'store.json');
  PATHS.set(id, filePath);
  const store = bootStore(filePath);
  const record = writeAndCommit(store, ['seed'], 'kept');
  const before = fs.readFileSync(filePath, 'utf8');
  const registerBefore = attempt(() => store.read([]));
  return { id, dir, filePath, store, seedRecord: record, before, registerBefore };
}

/** The settled end point read from a seeded store AFTER its drive: the bytes, a fresh boot, the register. */
function finishDrive(s, address = ['a']) {
  const after = fs.readFileSync(s.filePath, 'utf8');
  const fresh = bootStore(s.filePath);
  return {
    ...s,
    after,
    fresh,
    register: attempt(() => fresh.read([])),
    readAt: attempt(() => fresh.read(address, 'file')),
    seeded: attempt(() => fresh.read(['seed'], 'file')),
  };
}

/**
 * A drive under an optional caller-side mutation frame, then the settled end point. `run` performs the public
 * call; its `attempt` is taken inside the frame so a throw is the answer and not a harness failure.
 */
function settledDrive(id, { installs = [], run, address = ['a'] }) {
  const s = seed(id);
  let answer = null;
  const body = () => {
    answer = attempt(() => run(s.store));
  };
  if (installs.length > 0) withInstalls(id, installs, body);
  else body();
  const drive = finishDrive(s, address);
  drive.answer = answer;
  return drive;
}

/**
 * THE CALLER-SIDE MUTATION HARNESS. Every member is installed from a saved exact descriptor, restored in a
 * `finally`, and the restore is MEASURED (the same `value`/`get`/`set` object identity and the same flags, or
 * absence where the member was absent). The entry is logged so the summary PROVES the restore.
 */
function withInstalls(id, installs, body) {
  const saved = [];
  try {
    for (const install of installs) {
      const before = Object.getOwnPropertyDescriptor(install.proto, install.name);
      const entry = {
        id,
        member: String(install.name),
        hadMember: before !== undefined,
        presentWhileInstalled: false,
        restored: false,
      };
      Object.defineProperty(install.proto, install.name, install.descriptor);
      entry.presentWhileInstalled = Object.getOwnPropertyDescriptor(install.proto, install.name) !== undefined;
      saved.push({ proto: install.proto, name: install.name, before, entry });
    }
    return body();
  } finally {
    for (const { proto, name, before, entry } of saved) {
      if (before === undefined) Reflect.deleteProperty(proto, name);
      else Object.defineProperty(proto, name, before);
      const now = Object.getOwnPropertyDescriptor(proto, name);
      entry.restored = before === undefined
        ? now === undefined
        : now !== undefined
          && now.value === before.value
          && now.get === before.get
          && now.set === before.set
          && now.writable === before.writable
          && now.enumerable === before.enumerable
          && now.configurable === before.configurable;
      RESTORE_LOG.push(entry);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// §1B. THE CHILD WITNESS — the two unbounded drives (and the chain-multiplying witness) where a clock can
//      stop them. The child reaches the package through the SAME entry and kernel this process imported, seeds
//      its own real store through the package's own commit route, times ONLY the `write` call, and reports the
//      refusal beside its own settled-state facts.
// ─────────────────────────────────────────────────────────────────────────────

const CHILD_SOURCE = `
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PKG = await import(pathToFileURL(process.env.JC_ENTRY).href);
const K = await import(pathToFileURL(process.env.JC_KERNEL).href);
const state = process.argv[2];
const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
const chainOf = (links) => {
  let element = {};
  for (let i = 0; i < links; i += 1) element = Object.create(element);
  return element;
};
const states = {
  // F5-1's ALIASED DEPTH-40 LADDER: 2^40 recursive visits at the shipped tree.
  'aliased-ladder': () => {
    let value = [1];
    for (let i = 0; i < 40; i += 1) value = [value, value];
    return arrayChain(value, 127);
  },
  // F5-2's ONE ARRAY WHOSE length DWARFS ANY BUDGET: ~4.29e9 descriptor reads at the shipped tree.
  'length-ceiling': () => arrayChain(new Array(4294967295), 127),
  // F6-1's CHAIN-MULTIPLYING WITNESS: an element at the head of a 100,000-link chain, 10,000 times.
  'chain-multiplying': () => arrayChain(new Array(10000).fill(chainOf(100000)), 127),
};
const VALUE = states[state]();
const dir = fs.mkdtempSync(path.join(process.env.JC_CHILD_ROOT, state + '-'));
const filePath = path.join(dir, 'store.json');
const store = PKG.storeCreate({ filePath, journalLength: 8, listeners: [] });
const seedRecord = K.runAttempt(store, K.commit(store, ['seed'], 'file', 'kept'));
const before = fs.readFileSync(filePath, 'utf8');
const started = Date.now();
let thrown = null;
try {
  store.write(['a'], 'file', VALUE);
} catch (caught) {
  thrown = caught;
}
const elapsedMs = Date.now() - started;
const after = fs.readFileSync(filePath, 'utf8');
const fresh = PKG.storeCreate({ filePath, journalLength: 8, listeners: [] });
const register = fresh.read([]);
let readAtStatus = null;
try {
  fresh.read(['a'], 'file');
} catch (caught) {
  readAtStatus = caught.status;
}
let seeded = null;
try {
  seeded = fresh.read(['seed'], 'file');
} catch {
  seeded = 'THREW';
}
process.stdout.write(JSON.stringify({
  state,
  elapsedMs,
  status: thrown === null ? null : thrown.status,
  message: thrown === null ? null : thrown.message,
  seedOutcome: seedRecord && seedRecord.outcome,
  beforeBytes: before.length,
  afterBytes: after.length,
  fileUnchanged: before === after,
  register,
  readAtStatus,
  seeded,
}) + '\\n');
`;

function boundedChildDrive(state) {
  const dir = fs.mkdtempSync(path.join(ROOT, `child-${state}-`));
  const driver = path.join(dir, 'drive.mjs');
  fs.writeFileSync(driver, CHILD_SOURCE, 'utf8');
  let out = null;
  let timedOut = false;
  try {
    out = execFileSync(process.execPath, [driver, state], {
      encoding: 'utf8',
      cwd: dir,
      timeout: WALL_CLOCK_KILL_MS,
      maxBuffer: 64 * 1024 * 1024,
      env: { ...process.env, JC_ENTRY: ENTRY, JC_KERNEL: KERNEL, JC_CHILD_ROOT: dir },
    });
  } catch (caught) {
    if (caught && (caught.code === 'ETIMEDOUT' || caught.signal === 'SIGTERM')) timedOut = true;
    else throw caught;
  }
  const answer = out === null ? null : JSON.parse(out.trim().split('\n').pop());
  if (answer !== null) WITNESS_LOG.push({ state, elapsedMs: answer.elapsedMs, ceilingMs: WALL_CLOCK_CEILING_MS, timedOut });
  return { timedOut, killedAt: WALL_CLOCK_KILL_MS, answer };
}

// ─────────────────────────────────────────────────────────────────────────────
// §1C. THE ASSERTIONS — the refusal's bytes and the settled state, one check each
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A WALK refusal (`ValueRefusedAtBoundary`): status, class, position and PART ONE subject, with the class
 * named twice where the subject IS the class spelling. Beside it, the settled state of the seeded store.
 */
function walkRefusalCheck(drive, { cls, position, subject, exactPosition = true }) {
  const problems = [];
  const observed = {};
  if (drive.answer === null) {
    problems.push('the drive recorded no answer');
  } else if (drive.answer.ok) {
    problems.push(`the write was ADMITTED (returned ${short(drive.answer.value, 120)})`);
  } else {
    const parsed = refusalAnswer(drive.answer.error);
    if (!parsed.ok) {
      problems.push(parsed.why);
    } else {
      observed.status = parsed.status;
      if (parsed.status !== STATUS) problems.push(`status=${JSON.stringify(parsed.status)} (declared ${STATUS})`);
      if (!parsed.partOne.includes(PART_ONE)) problems.push(`PART ONE is absent: ${short(parsed.partOne, 160)}`);
      const declared = CLASS[cls];
      const tailMarker = ` is ${declared}`;
      if (!parsed.positionAndClass.endsWith(tailMarker)) {
        problems.push(`the class is not ${JSON.stringify(declared)}: ${short(parsed.positionAndClass, 160)}`);
      } else {
        const gotPosition = parsed.positionAndClass.slice(0, -tailMarker.length);
        observed.position = gotPosition;
        if (exactPosition ? gotPosition !== position : !gotPosition.includes(position)) {
          problems.push(`position=${JSON.stringify(short(gotPosition, 120))} (declared ${JSON.stringify(short(position, 120))})`);
        }
      }
      const gotSubject = partOneSubject(parsed.message);
      observed.subject = gotSubject;
      if (gotSubject !== subject) {
        problems.push(`subject=${JSON.stringify(short(gotSubject, 160))} (declared ${JSON.stringify(short(subject, 160))})`);
      }
      if (subject === declared && !new RegExp(`'${declared.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}' is not a value`).test(parsed.message)) {
        problems.push('the class is not named twice in PART ONE (the subject is the class spelling)');
      }
      observed.messageLength = parsed.message.length;
    }
  }
  const settled = settledProblems(drive);
  problems.push(...settled);
  observed.settled = settled.length === 0 ? `file=${drive.after.length}B unchanged register=${JSON.stringify(drive.registerBefore && drive.registerBefore.value)} unmoved readAt=AddressNotFound seed=kept` : settled.join('; ');
  return { ok: problems.length === 0, detail: problems.length === 0 ? '' : problems.join('; '), observed };
}

/** The settled state shared by every seeded drive: bytes, register, fresh boot, the seed. */
function settledProblems(drive) {
  const problems = [];
  if (!drive.seedRecord || drive.seedRecord.outcome !== 'passed') {
    problems.push(`the seed did not commit (outcome=${JSON.stringify(drive.seedRecord && drive.seedRecord.outcome)})`);
  }
  if (drive.after !== drive.before) problems.push('the store file CHANGED (bytes differ from the seeded image)');
  if (!drive.registerBefore.ok || !sameTree(drive.registerBefore.value, { seed: 'kept' })) {
    problems.push(`the register before the drive is not {"seed":"kept"}: ${short(drive.registerBefore.ok ? drive.registerBefore.value : drive.registerBefore.error)}`);
  }
  if (!drive.register.ok) problems.push(`the fresh boot's read([]) threw: ${describe(drive.register.error)}`);
  else if (!sameTree(drive.register.value, { seed: 'kept' })) problems.push(`the fresh boot's register is not unmoved: ${short(drive.register.value)}`);
  if (!isAddressNotFound(drive.readAt)) {
    problems.push(`the fresh boot does not answer AddressNotFound at the uncommitted address: ${describe(drive.readAt.ok ? drive.readAt.value : drive.readAt.error)}`);
  }
  if (!drive.seeded.ok || drive.seeded.value !== 'kept') {
    problems.push(`the seed does not read back as 'kept': ${short(drive.seeded.ok ? drive.seeded.value : drive.seeded.error)}`);
  }
  return problems;
}

/** A CARRIER refusal's object: three members, the declared message bytes, no `undefined`, no marker. */
function carrierObjectCheck(carrier, { expectedMessage, marker = null, allowKeys = ['address', 'log', 'message', 'status'] }) {
  const problems = [];
  if (carrier.ok) {
    problems.push('the carrier ADMITTED the argument (no refusal at the slot)');
    return { ok: false, detail: problems.join('; '), observed: {} };
  }
  const error = carrier.error;
  const keys = Object.keys(error).sort();
  if (JSON.stringify(keys) !== JSON.stringify(allowKeys)) problems.push(`the refusal object's keys are ${JSON.stringify(keys)} (declared ${JSON.stringify(allowKeys)})`);
  const message = typeof error.message === 'string' ? error.message : '';
  if (typeof error.status !== 'string') problems.push(`status is not a string: ${describe(error)}`);
  if (expectedMessage !== null && message !== expectedMessage) {
    problems.push(`message=${JSON.stringify(short(message, 240))} (declared ${JSON.stringify(short(expectedMessage, 240))})`);
  }
  if (JSON.stringify(error).includes('undefined')) {
    problems.push("the word 'undefined' appears in the refusal object — the F-RA-18 regression's own byte");
  }
  if (marker !== null && (message.includes(marker) || JSON.stringify(error).includes(marker))) {
    problems.push('the caller-controlled marker reached the refusal object');
  }
  return { ok: problems.length === 0, detail: problems.join('; '), observed: { status: error.status, message, keys } };
}

/** A carrier slot's declared descriptor form (`startsWith("'<descriptor>' ")`), the class half, no `undefined`. */
function carrierSlotCheck(drive, { descriptor, classHalf, marker = null, status = 'AddressMalformed' }) {
  const problems = [];
  let observed = {};
  if (drive.answer === null) {
    problems.push('the drive recorded no answer');
  } else if (drive.answer.ok) {
    problems.push(`the slot ADMITTED the argument (returned ${short(drive.answer.value, 120)})`);
  } else {
    const error = drive.answer.error;
    const message = typeof error.message === 'string' ? error.message : '';
    observed = { status: error.status, message };
    if (error.status !== status) problems.push(`status=${JSON.stringify(error.status)} (declared ${status})`);
    if (!message.startsWith(`'${descriptor}' `)) problems.push(`the subject is not the declared descriptor ${JSON.stringify(descriptor)}: ${short(message, 200)}`);
    if (classHalf !== null && !message.includes(classHalf)) problems.push(`the class half ${JSON.stringify(classHalf)} is absent: ${short(message, 200)}`);
    if (JSON.stringify(error).includes('undefined')) problems.push("the word 'undefined' appears in the refusal object");
    if (marker !== null && (message.includes(marker) || JSON.stringify(error).includes(marker))) problems.push('the caller-controlled marker reached the refusal object');
  }
  const settled = settledProblems(drive);
  problems.push(...settled);
  return { ok: problems.length === 0, detail: problems.length === 0 ? '' : problems.join('; '), observed };
}

const settledText = (drive) =>
  `file=${drive.after.length}B unchanged register={"seed":"kept"} unmoved readAt=AddressNotFound seed=kept`;

const observedText = (o) =>
  `status=${JSON.stringify(o.status)} subject=${JSON.stringify(short(o.subject ?? '', 120))} position=${JSON.stringify(short(o.position ?? '', 120))}`;

// ─────────────────────────────────────────────────────────────────────────────
// §2. THE SIX LAWS — `LIVE-G01`–`LIVE-G18`
// ─────────────────────────────────────────────────────────────────────────────

const arrayChain = (leaf, levels) => {
  let value = leaf;
  for (let i = 0; i < levels; i += 1) value = [value];
  return value;
};
const chainOf = (links) => {
  let element = {};
  for (let i = 0; i < links; i += 1) element = Object.create(element);
  return element;
};

// ═════════════════════════════════════════════════════════════════════════════
// LAW 1 — THE CARRIER-POSITION SUBJECT (`contract.md §2.1` F-RA-18 · `JC-TC-55`)
// (`LIVE-G01`–`LIVE-G04`)
// ═════════════════════════════════════════════════════════════════════════════

// `LIVE-G01` — the CONSTRUCTION-route carrier slot (`constraintAddress`): an address carrying an own
// `toString` used to render `'undefined'` there. Declared: subject is the class spelling `a plain object`.
cell({
  id: 'LIVE-G01',
  green: 'contract.md §2.1 F-RA-18 items (a),(c),(e),(f) · test-cases.md §4 JC-TC-55 (own toString)',
  scenario: "the constraint entry's `address` carries an own `toString` — the carrier slot's subject is the address's CLASS SPELLING, the member NEVER runs, and the word `undefined` is in no byte",
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-18, items (a),(c),(d)(ii),(e),(f) · test-cases.md §4 JC-TC-55',
    start: 'a caller-supplied constraint entry { address: { toString() { counter += 1; return MARKER } }, id: "k" } handed to storeCreate',
    end: "ConstraintListInvalid with PART ONE's subject 'a plain object', the member's counter 0, the marker in no byte, the word undefined in no byte",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const MARKER = 'CALLER_CONTROLLED_CARRIER_JC55';
  const PROSE = ', a constraint entry is an address and an id, and the address is a segment array';
  const problems = [];
  let reads = 0;
  const address = { toString() { reads += 1; return MARKER; } };
  const live = String(address);
  const liveReads = reads;
  reads = 0;
  // ⟶ **DRIVE RE-DERIVED 2026-10-25 (`D-26`): THE BATCH ELEMENT IS THREE-MEMBER AND ITS FUNCTION IS REQUIRED.**
  // Every construction in this row supplied the two-member `{ address, id }` element the declaration named until
  // 2026-10-24. Under `D-26` a functionless element is refused `ConstraintListInvalid` **before any filesystem
  // act** (`B-1`) — and `LIVE-G04`'s *admitted* control (`{ address: ['a'], id: 'k' }`, an in-domain segment list)
  // was therefore REFUSED, making the control report the opposite of its subject. **The function is supplied at
  // every site and NOTHING ELSE MOVES**: each cell's subject is the ADDRESS's own class spelling, which the
  // entry's encoder decides before `B-1`'s walk ever sees the element, so no refusal under test is masked.
  const carrier = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address, id: 'k', constraint: () => true }] }));
  const check = carrierObjectCheck(carrier, {
    expectedMessage: `'${CLASS.plain}' is not a valid constraint entry in 'constraints'${PROSE}`,
    marker: MARKER,
  });
  if (live !== MARKER || liveReads === 0) problems.push('the own-toString instrument is DEAD: a direct String(address) did not answer the marker');
  if (reads !== 0) problems.push(`the address's own toString RAN at the carrier position (count ${reads})`);
  if (!check.ok) problems.push(check.detail);
  const detail = problems.length === 0
    ? `subject=${JSON.stringify(CLASS.plain)} status=${JSON.stringify(check.observed.status)} toString-runs=0 marker-absent undefined-absent message=${JSON.stringify(check.observed.message)} — CONSTRUCTION refused, so NO store exists to seed (the declared construction boundary); the settled-state assertions for this law are driven at the (d)(i) slots over a real seeded store, LIVE-G03`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G02` — the same slot with an own `Symbol.toStringTag`: a DATA member (its value in no byte) and an
// ACCESSOR (getter `0`). Declared: the same class spelling, and the tag read is the descriptor-only one.
cell({
  id: 'LIVE-G02',
  green: 'contract.md §2.1 F-RA-18 items (1b),(e) · test-cases.md §4 JC-TC-55 (own Symbol.toStringTag, data and accessor)',
  scenario: 'the constraint address carries an own `Symbol.toStringTag` — as a DATA member and as an ACCESSOR: the subject is the class spelling, the data value is in no byte, the getter never runs',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-18, items (1b),(c),(e) · test-cases.md §4 JC-TC-55',
    start: "a constraint entry whose address carries an own Symbol.toStringTag (a data value 'DATATAG', and an accessor answering MARKER)",
    end: 'both refused with the subject a plain object, the data value in no byte, the getter 0, the word undefined in no byte',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const MARKER = 'CALLER_CONTROLLED_TAG_JC55';
  const DATA_TAG = 'DATATAG_JC55';
  const PROSE = ', a constraint entry is an address and an id, and the address is a segment array';
  const EXPECTED = `'${CLASS.plain}' is not a valid constraint entry in 'constraints'${PROSE}`;
  const problems = [];

  const dataAddress = { [Symbol.toStringTag]: DATA_TAG };
  const dataLive = String(dataAddress);
  const dataCarrier = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: dataAddress, id: 'k', constraint: () => true }] }));
  const dataCheck = carrierObjectCheck(dataCarrier, { expectedMessage: EXPECTED });
  if (dataLive !== `[object ${DATA_TAG}]`) problems.push(`the data-tag instrument is DEAD: String(address) answered ${JSON.stringify(dataLive)}`);
  if (!dataCheck.ok) problems.push(`data: ${dataCheck.detail}`);
  if (!dataCarrier.ok && (dataCarrier.error.message.includes(DATA_TAG) || JSON.stringify(dataCarrier.error).includes(DATA_TAG))) {
    problems.push('the tag DATA value reached the refusal object');
  }

  let getterRuns = 0;
  const accessorAddress = Object.defineProperty({}, Symbol.toStringTag, {
    get() { getterRuns += 1; return MARKER; },
    configurable: true,
  });
  const accessorLive = String(accessorAddress);
  const accessorLiveRuns = getterRuns;
  getterRuns = 0;
  const accessorCarrier = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: accessorAddress, id: 'k', constraint: () => true }] }));
  const accessorCheck = carrierObjectCheck(accessorCarrier, { expectedMessage: EXPECTED, marker: MARKER });
  if (accessorLive !== `[object ${MARKER}]` || accessorLiveRuns === 0) problems.push('the tag-accessor instrument is DEAD: String(address) did not run the getter');
  if (getterRuns !== 0) problems.push(`the tag ACCESSOR ran at the carrier position (count ${getterRuns})`);
  if (!accessorCheck.ok) problems.push(`accessor: ${accessorCheck.detail}`);
  const detail = problems.length === 0
    ? `data-tag: subject=${JSON.stringify(CLASS.plain)} status=${JSON.stringify(dataCheck.observed.status)} data-value-absent; accessor-tag: subject=${JSON.stringify(CLASS.plain)} status=${JSON.stringify(accessorCheck.observed.status)} getter-runs=0 marker-absent; undefined-absent at both — CONSTRUCTION refused, no store exists (the declared construction boundary)`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G03` — THE (d)(i) CARRIER SWEEP over REAL SEEDED STORES: every slot answers its OWN declared
// descriptor (never `undefined`), and every refusal leaves the seeded image byte-identical, the register
// unmoved and a fresh boot answering `AddressNotFound`. This is where law 1's settled state is asserted.
cell({
  id: 'LIVE-G03',
  green: 'contract.md §2.1 F-RA-18 item (d)(i) · test-cases.md §4 JC-TC-55 (the carrier sweep)',
  scenario: 'ten `(d)(i)` slots, each driven over a REAL store carrying a committed seed, plus the `(d)(iii)` cfg.listeners slot: every slot spells ITS OWN declared descriptor, the word `undefined` appears at none, and every refusal leaves the store byte-identical and unmoved',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-18, items (c),(d)(i),(d)(iii),(e) · test-cases.md §4 JC-TC-55 (the carrier sweep)',
    start: 'each (d)(i) slot driven with a real caller value at a seeded store: rollback({}), listen({},[]), listen("h",{}), listen("h",[{}]), listen("h",[["a",true]]), removeListener({}), removeListener("nope"), register({},fn), register("nope",fn), register("nope",{}); plus the (d)(iii) cfg.listeners entry [5] and a listeners address carrying an own toString',
    end: 'AddressMalformed with the slot’s own declared descriptor as the subject and its own class half; file bytes unchanged; register {"seed":"kept"} unmoved; fresh boot AddressNotFound at the uncommitted address; the listeners entry: literal \'listeners\' + \'a number\'; the listeners address’s own toString 0 and its marker absent',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const SLOTS = [
    { label: 'rollback-handle', descriptor: '[object Object]', classHalf: null, run: (inst) => inst.rollback({}) },
    { label: 'listen-handle', descriptor: '[object Object]', classHalf: "listen's first argument is a plain object", run: (inst) => inst.listen({}, []) },
    { label: 'listen-set', descriptor: '[object Object]', classHalf: "listen's second argument is a plain object", run: (inst) => inst.listen('h', {}) },
    { label: 'listen-member', descriptor: '[object Object]', classHalf: "listen's second argument carries a plain object at member 0", run: (inst) => inst.listen('h', [{}]) },
    { label: 'listen-domain', descriptor: 'a,true', classHalf: "listen's second argument carries an address outside the store's domain at member 0", run: (inst) => inst.listen('h', [['a', true]]) },
    { label: 'removeListener-handle', descriptor: '[object Object]', classHalf: "removeListener's first argument is a plain object", run: (inst) => inst.removeListener({}) },
    { label: 'removeListener-absent', descriptor: 'nope', classHalf: "removeListener's first argument is 'nope'", run: (inst) => inst.removeListener('nope') },
    { label: 'register-handle', descriptor: '[object Object]', classHalf: "register's first argument is a plain object", run: (inst) => inst.register({}, () => {}) },
    { label: 'register-absent', descriptor: 'nope', classHalf: "register's first argument is 'nope'", run: (inst) => inst.register('nope', () => {}) },
    { label: 'register-listener', descriptor: '[object Object]', classHalf: "register's second argument is a plain object", run: (inst) => inst.register('nope', {}) },
  ];
  const problems = [];
  const lines = [];
  for (const slot of SLOTS) {
    const drive = settledDrive(`LIVE-G03-${slot.label}`, { run: (inst) => slot.run(inst) });
    const check = carrierSlotCheck(drive, { descriptor: slot.descriptor, classHalf: slot.classHalf });
    if (!check.ok) problems.push(`${slot.label}: ${check.detail}`);
    lines.push(`${slot.label}=${JSON.stringify(short(check.observed.message ?? '', 90))}`);
  }
  // THE (d)(iii) SLOT — `cfg.listeners`: a LITERAL subject plus the entry's class spelling, and the listeners
  // ADDRESS crossing refuses with the address's own `toString` NEVER run. Both are CONSTRUCTION refusals, so no
  // store exists: the settled-state assertions of this cell are the ten (d)(i) drives above and this note says so.
  const listenersEntry = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [5] }));
  if (listenersEntry.ok) problems.push('the listeners entry slot ADMITTED a non-plain entry');
  else {
    const message = listenersEntry.error.message;
    if (!message.startsWith("'listeners' ")) problems.push(`the listeners entry slot's subject is not the literal 'listeners': ${short(message, 160)}`);
    if (!message.includes('a number')) problems.push('the listeners entry slot does not carry the entry class spelling in its prose');
    if (JSON.stringify(listenersEntry.error).includes('undefined')) problems.push("the word 'undefined' appears at the (d)(iii) listeners slot");
    lines.push(`listeners-entry=${JSON.stringify(short(message, 90))}`);
  }
  const LISTENER_MARKER = 'CALLER_CONTROLLED_LISTENERS_JC55';
  let listenerAddressReads = 0;
  const listenerAddress = { toString() { listenerAddressReads += 1; return LISTENER_MARKER; } };
  const listenerAddressLive = String(listenerAddress);
  const listenerAddressLiveReads = listenerAddressReads;
  listenerAddressReads = 0;
  const listenersAddress = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [{ address: listenerAddress, handle: 'h' }] }));
  if (listenerAddressLive !== LISTENER_MARKER || listenerAddressLiveReads === 0) problems.push('the listeners-address instrument is DEAD');
  if (listenersAddress.ok) problems.push('the listeners address crossing ADMITTED an out-of-domain address');
  else {
    if (listenerAddressReads !== 0) problems.push(`the listeners address's own toString RAN on the construction (count ${listenerAddressReads})`);
    if (JSON.stringify(listenersAddress.error).includes('undefined')) problems.push("the word 'undefined' appears at the listeners address crossing");
    if (JSON.stringify(listenersAddress.error).includes(LISTENER_MARKER)) problems.push("the listeners address's marker reached the refusal object");
    lines.push(`listeners-address=${JSON.stringify(short(listenersAddress.error.message, 90))} toString-runs=0`);
  }
  const detail = problems.length === 0
    ? `${SLOTS.length} (d)(i) slots: each subject is its own declared descriptor and undefined appears at none; ${SLOTS.length} seeded stores byte-identical with the register unmoved and a fresh boot answering AddressNotFound; the (d)(iii) cfg.listeners slot: literal 'listeners' + the entry class spelling; the listeners ADDRESS crossing: toString-runs=0, undefined-absent, marker-absent — ${lines.join(' | ')}`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G04` — the CONTROLS F-RA-18 item (g) names: the guard does not trip on a plain `{}`, a primitive
// string, a `Proxy` (class spelling, no handler run), a `null`-prototype address (the guarded catch's own
// fallback), and an in-domain segment list is ADMITTED.
cell({
  id: 'LIVE-G04',
  green: 'contract.md §2.1 F-RA-18 item (g) · test-cases.md §4 JC-TC-55 (the controls)',
  scenario: "the controls at the same carrier slot: plain {} renders '[object Object]', the string 'a' renders 'a', a Proxy answers 'a Proxy' with no handler run, a null-prototype address answers 'a plain object', an in-domain segment list is ADMITTED",
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-18, items (g),(c) · test-cases.md §4 JC-TC-55 (the controls)',
    start: 'storeCreate with constraints [{address: <control>, id: "k"}] for the five control addresses',
    end: "each control's own rendering as the subject (never 'undefined'), the Proxy with 0 traps, and the in-domain list ADMITTED",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const PROSE = ', a constraint entry is an address and an id, and the address is a segment array';
  const problems = [];
  const lines = [];

  const plain = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: {}, id: 'k', constraint: () => true }] }));
  const plainCheck = carrierObjectCheck(plain, { expectedMessage: `'[object Object]' is not a valid constraint entry in 'constraints'${PROSE}` });
  if (!plainCheck.ok) problems.push(`plain: ${plainCheck.detail}`);
  lines.push(`plain={${JSON.stringify('[object Object]')}}`);

  const stringy = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: 'a', id: 'k', constraint: () => true }] }));
  const stringCheck = carrierObjectCheck(stringy, { expectedMessage: `'a' is not a valid constraint entry in 'constraints'${PROSE}` });
  if (!stringCheck.ok) problems.push(`string: ${stringCheck.detail}`);
  lines.push(`string=${JSON.stringify('a')}`);

  let getRuns = 0;
  const proxied = new Proxy({}, {
    get(t, key) { getRuns += 1; return Reflect.get(t, key); },
    ownKeys(t) { getRuns += 1; return Reflect.ownKeys(t); },
    getOwnPropertyDescriptor(t, key) { getRuns += 1; return Reflect.getOwnPropertyDescriptor(t, key); },
  });
  const proxyLive = String(proxied);
  const proxyLiveRuns = getRuns;
  getRuns = 0;
  const proxy = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: proxied, id: 'k', constraint: () => true }] }));
  const proxyCarrierTraps = getRuns;
  const proxyCheck = carrierObjectCheck(proxy, { expectedMessage: `'${CLASS.proxy}' is not a valid constraint entry in 'constraints'${PROSE}` });
  if (proxyLive !== `[object ${CLASS.proxy}]` && proxyLive !== '[object Object]') problems.push(`the Proxy liveness read is unexpected: ${JSON.stringify(proxyLive)}`);
  if (proxyCarrierTraps !== 0) problems.push(`a handler trap RAN at the carrier position (${proxyCarrierTraps} member(s))`);
  if (!proxyCheck.ok) problems.push(`proxy: ${proxyCheck.detail}`);
  lines.push(`proxy=${JSON.stringify(CLASS.proxy)} traps=${proxyCarrierTraps}`);

  const nullProto = Object.create(null);
  const nullAttempt = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: nullProto, id: 'k', constraint: () => true }] }));
  const nullCheck = carrierObjectCheck(nullAttempt, { expectedMessage: `'${CLASS.plain}' is not a valid constraint entry in 'constraints'${PROSE}` });
  if (!nullCheck.ok) problems.push(`null-proto: ${nullCheck.detail}`);
  lines.push(`null-proto=${JSON.stringify(CLASS.plain)}`);

  const admitted = attempt(() => PKG.storeCreate({ journalLength: 8, listeners: [], constraints: [{ address: ['a'], id: 'k', constraint: () => true }] }));
  if (!admitted.ok) problems.push(`the in-domain segment list was REFUSED: ${describe(admitted.error)}`);
  lines.push('segments=ADMITTED');

  const anyUndefined = [plain, stringy, proxy, nullAttempt].some((r) => !r.ok && JSON.stringify(r.error).includes('undefined'));
  if (anyUndefined) problems.push("the word 'undefined' appears at a control's refusal");
  const detail = problems.length === 0
    ? `${lines.join(' ')} (the Proxy's liveness read ran ${proxyLiveRuns} handler member(s); the carrier drive ran ${getRuns}); undefined absent at every control`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// LAW 2 — THE ELEMENT LIMB'S PATH TEST (`contract.md §2.1` F-RA-20 · `JC-TC-56`)
// (`LIVE-G05`–`LIVE-G07`)
// ═════════════════════════════════════════════════════════════════════════════

// `LIVE-G05` — the ALIAS: a sub-value the same parent holds twice is NOT a cycle, so row 8's depth arm renders
// the array's own join `'1,1'`; the single-occurrence and distinct-sibling controls render the same family.
cell({
  id: 'LIVE-G05',
  green: 'contract.md §2.1 F-RA-20 items (b),(e) · test-cases.md §3 JC-TC-56 (the aliased drive)',
  scenario: 'an ALIASED element at row 8’s depth arm — arrayChain([e, e], 127) with e = [1] — renders the sanctioned \'1,1\' with no caller code, and the single-occurrence and distinct-sibling controls hold',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-20, items (b),(e) · test-cases.md §3 JC-TC-56',
    start: 'write(addr, "file", arrayChain([e, e], 127)) with e = [1], over a real seeded store; plus [e] and [[1],[1]] at the same arm',
    end: "'1,1' as PART ONE's subject at the depth arm's own 127-segment position, class a value over the walk ceiling; file bytes unchanged; register unmoved; fresh boot AddressNotFound",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const e = [1];
  const problems = [];
  const lines = [];
  const drives = [
    ['alias', [e, e], '1,1'],
    ['single', [e], '1'],
    ['distinct-siblings', [[1], [1]], '1,1'],
  ];
  for (const [label, leaf, expected] of drives) {
    const drive = settledDrive(`LIVE-G05-${label}`, { run: (inst) => inst.write(['a'], 'file', arrayChain(leaf, 127)) });
    const check = walkRefusalCheck(drive, { cls: 'ceiling', position: DEEP_PATH, subject: expected });
    if (!check.ok) problems.push(`${label}: ${check.detail}`);
    lines.push(`${label}: subject=${JSON.stringify(short(check.observed.subject ?? '', 120))}`);
  }
  const detail = problems.length === 0
    ? `${lines.join('; ')}; class=${JSON.stringify(CLASS.ceiling)} at the 127-segment depth position; ${settledText({ after: { length: 15 }, registerBefore: { value: { seed: 'kept' } } })} on each of the three seeded stores`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G06` — the CYCLE still trips: the path test reaches a self-containing array (as the refused value and
// as an element) and a two-link cycle, deterministically, through the class spelling and with no host error.
cell({
  id: 'LIVE-G06',
  green: 'contract.md §2.1 F-RA-20 item (c) · test-cases.md §3 JC-TC-56 (the cycle drives)',
  scenario: 'a CYCLE at the same depth arm — a self-containing array, a self-containing element, and a two-link cycle — still answers row 8’s class spelling, deterministically, with no host error',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-20, item (c) · test-cases.md §3 JC-TC-56',
    start: 'write(addr, "file", ...) for: arrayChain(selfContaining, 127), arrayChain([selfContaining], 127), and the two-link cycle a=[], b=[a], a.push(b)',
    end: 'the class spelling named twice as subject and class at the 127-segment position, identical across three drives, never a host Error; the seeded image unchanged; register unmoved; fresh boot AddressNotFound',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];
  const self = [];
  self.push(self);
  const twoLink = [];
  const twoLinkInner = [twoLink];
  twoLink.push(twoLinkInner);
  const drives = [
    ['self-as-value', self],
    ['self-as-element', [self]],
    ['two-link-cycle', twoLink],
  ];
  const firstAnswers = [];
  for (const [label, leaf] of drives) {
    const drive = settledDrive(`LIVE-G06-${label}`, { run: (inst) => inst.write(['a'], 'file', arrayChain(leaf, 127)) });
    const check = walkRefusalCheck(drive, { cls: 'ceiling', position: DEEP_PATH, subject: CLASS.ceiling });
    if (!check.ok) problems.push(`${label}: ${check.detail}`);
    if (drive.answer && !drive.answer.ok) {
      if (drive.answer.error instanceof Error && drive.answer.error.status === undefined) problems.push(`${label}: a HOST error escaped (${describe(drive.answer.error)})`);
      firstAnswers.push(drive.answer.error.message);
    }
    lines.push(`${label}=${JSON.stringify(short(check.observed.subject ?? '', 80))}`);
  }
  if (firstAnswers.length === 3 && !(firstAnswers[0] === firstAnswers[1] && firstAnswers[1] === firstAnswers[2])) {
    problems.push('the three cycle drives did not answer identically (the class spelling is deterministic)');
  }
  const detail = problems.length === 0
    ? `${lines.join('; ')} — the class spelling named twice, identical across the three drives, no host error; ${settledText({ after: { length: 15 }, registerBefore: { value: { seed: 'kept' } } })} on each seeded store`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G07` — the alias ruling at a NON-ARRAY element and the conversion element: an aliased ordinary object
// renders BOTH occurrences, and an element carrying a conversion member still trips (its counter `0`), so a fix
// cannot trade one alias for another.
cell({
  id: 'LIVE-G07',
  green: 'contract.md §2.1 F-RA-20 items (b),(e) + F-RA-13 item (1c) · test-cases.md §3 JC-TC-56 (the alias controls)',
  scenario: 'the alias ruling is stated at every element, not at arrays alone: an aliased ordinary object renders both occurrences, and a conversion-member element still answers the class spelling with its counter 0',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F-RA-20, items (b),(e); F-RA-13 item (1c) · test-cases.md §3 JC-TC-56',
    start: 'write(addr, "file", arrayChain([o, o], 127)) with an ordinary o, and arrayChain([memberElement, 1], 127)',
    end: "'[object Object],[object Object]' for the non-array alias; the class spelling for the conversion element with its counter 0; both over seeded stores, bytes unchanged, register unmoved, fresh boot AddressNotFound",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const o = { k: 1 };
  const aliasDrive = settledDrive('LIVE-G07-nonarray-alias', { run: (inst) => inst.write(['a'], 'file', arrayChain([o, o], 127)) });
  const aliasCheck = walkRefusalCheck(aliasDrive, { cls: 'ceiling', position: DEEP_PATH, subject: '[object Object],[object Object]' });
  if (!aliasCheck.ok) problems.push(`non-array alias: ${aliasCheck.detail}`);

  const MARKER = 'CALLER_CONTROLLED_ELEMENT_JC56';
  let runs = 0;
  const element = { toString() { runs += 1; return MARKER; } };
  const live = String(element);
  const liveRuns = runs;
  runs = 0;
  const elementDrive = settledDrive('LIVE-G07-conversion-element', { run: (inst) => inst.write(['a'], 'file', arrayChain([element, 1], 127)) });
  const elementCheck = walkRefusalCheck(elementDrive, { cls: 'ceiling', position: DEEP_PATH, subject: CLASS.ceiling });
  if (live !== MARKER || liveRuns === 0) problems.push('the element instrument is DEAD: a direct String(element) did not answer the marker');
  if (runs !== 0) problems.push(`the element's own toString RAN (count ${runs})`);
  if (!elementCheck.ok) problems.push(`conversion element: ${elementCheck.detail}`);
  const detail = problems.length === 0
    ? `non-array alias subject=${JSON.stringify('[object Object],[object Object]')}; conversion element subject=${JSON.stringify(CLASS.ceiling)} with its toString-runs=0; both at the 127-segment position, class=${JSON.stringify(CLASS.ceiling)}; ${settledText({ after: { length: 15 }, registerBefore: { value: { seed: 'kept' } } })} on both seeded stores`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// LAW 3 — THE PER-CALL POSITION BUDGET (`NODE_CEILING`, ONE FIGURE)
// (`contract.md §2.1` F5-1/F5-2/F6-1 · `JC-TC-57` / `JC-TC-60`) — `LIVE-G08`–`LIVE-G10`
// ═════════════════════════════════════════════════════════════════════════════

// `LIVE-G08` — THE RENDERINGS THAT MUST NOT MOVE: the five controls `JC-TC-57` names, the dense inside-budget
// array (`999,000` elements) that still renders its own join, and the `10,000`-element `2`-link chain control.
cell({
  id: 'LIVE-G08',
  green: 'contract.md §2.1 F5-1/F5-2 item (1e) · test-cases.md §3 JC-TC-57 (the controls and the inside-budget state)',
  scenario: 'the budget is not a rendering clamp: five ordinary refused values, a dense 999,000-element inside-budget array and a 10,000-element 2-link chain control all keep their declared renderings',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-1/F5-2, items (1c),(1e) · test-cases.md §3 JC-TC-57',
    start: 'write(addr, "file", <control>) at row 8’s depth arm for [e,e], [1,2], {}, [1,,3]; the function at the ROOT position; the dense 999,000 array and the 10,000×2-link chain at the depth arm',
    end: "'1,1', '1,2', '[object Object]', '1,,3', the function's own source text at the root position, the 999,000-element join and the 10,000-element join — each with the declared class and position; every seeded store byte-identical and unmoved",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];
  const e = [1];
  const controls = [
    ['alias', [e, e], '1,1'],
    ['two-primitives', [1, 2], '1,2'],
    ['object', {}, '[object Object]'],
    ['sparse', [1, , 3], '1,,3'],
  ];
  for (const [label, leaf, expected] of controls) {
    const drive = settledDrive(`LIVE-G08-${label}`, { run: (inst) => inst.write(['a'], 'file', arrayChain(leaf, 127)) });
    const check = walkRefusalCheck(drive, { cls: 'ceiling', position: DEEP_PATH, subject: expected });
    if (!check.ok) problems.push(`${label}: ${check.detail}`);
    lines.push(`${label}=${JSON.stringify(short(expected, 40))}`);
  }

  function namedFunctionSample() { return null; }
  const fnDrive = settledDrive('LIVE-G08-function', { run: (inst) => inst.write(['a'], 'file', namedFunctionSample) });
  const fnSubject = namedFunctionSample.toString();
  const fnCheck = walkRefusalCheck(fnDrive, { cls: 'functionValue', position: ROOT_POSITION, subject: fnSubject });
  if (!fnCheck.ok) problems.push(`function: ${fnCheck.detail}`);
  lines.push(`function@root=${JSON.stringify(short(fnSubject, 60))}`);

  const dense = new Array(999000).fill(0);
  const denseDrive = settledDrive('LIVE-G08-inside-budget-dense', { run: (inst) => inst.write(['a'], 'file', arrayChain(dense, 127)) });
  const denseCheck = walkRefusalCheck(denseDrive, { cls: 'ceiling', position: DEEP_PATH, subject: dense.join(',') });
  if (!denseCheck.ok) problems.push(`inside-budget dense: ${denseCheck.detail}`);
  lines.push(`inside-budget-dense=${denseCheck.observed.messageLength}B rendering`);

  const chainControl = new Array(10000).fill(chainOf(2));
  const chainDrive = settledDrive('LIVE-G08-chain-control', { run: (inst) => inst.write(['a'], 'file', arrayChain(chainControl, 127)) });
  const chainExpected = chainControl.map(() => '[object Object]').join(',');
  const chainCheck = walkRefusalCheck(chainDrive, { cls: 'ceiling', position: DEEP_PATH, subject: chainExpected });
  if (!chainCheck.ok) problems.push(`2-link chain control: ${chainCheck.detail}`);
  lines.push(`chain-control=${chainCheck.observed.messageLength}B rendering`);
  const detail = problems.length === 0
    ? `${lines.join(' ')}; every control keeps its declared rendering at its declared position; ${settledText({ after: { length: 15 }, registerBefore: { value: { seed: 'kept' } } })} on each of the seven seeded stores`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G09` — THE TWO (THREE) UNBOUNDED WITNESSES, TIMED IN CHILD PROCESSES: the aliased depth-40 ladder
// (`F5-1`, ~2^40 visits at the shipped tree), the `4,294,967,295`-length array (`F5-2`, ~4.29e9 descriptor
// reads) and the chain-multiplying witness (`F6-1`, ~2e9 link visits) each answer the class spelling within
// the declared 5,000 ms, and each child reports its own settled state.
cell({
  id: 'LIVE-G09',
  green: 'contract.md §2.1 F5-1 items (1b)(iii),(1d),(1e) + F5-2 + F6-1 · test-cases.md §3 JC-TC-57 / JC-TC-60 (the timed witnesses)',
  scenario: 'the three states the shipped guard could not bound — the aliased depth-40 ladder, the 4,294,967,295-length array and the 100,000-link chain multiplied 10,000 times — each answer the class spelling within the declared 5-second ceiling, and each child’s own seeded store is left byte-identical and unmoved',
  coverage: {
    matrix_row: 'contract.md §2.1 clauses of 2026-10-24 on F5-1,(1b)(iii),(1d),(1e); F5-2; F6-1 · test-cases.md §3 JC-TC-57 and JC-TC-60',
    start: 'three child processes, each seeding a real store through the package’s own commit route and timing ONLY the write: aliased-ladder, length-ceiling, chain-multiplying',
    end: 'ValueRefusedAtBoundary with the class spelling at the 127-segment position, elapsed <= 5,000 ms, file bytes unchanged, register {"seed":"kept"} unmoved, fresh boot AddressNotFound, seed=kept',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];
  const states = ['aliased-ladder', 'length-ceiling', 'chain-multiplying'];
  for (const state of states) {
    const child = boundedChildDrive(state);
    if (child.timedOut) {
      problems.push(`${state}: the child was still running at ${child.killedAt} ms and was KILLED — the declared ceiling is ${WALL_CLOCK_CEILING_MS} ms`);
      lines.push(`${state}=TIMED-OUT@${child.killedAt}ms`);
      continue;
    }
    const a = child.answer;
    if (a === null) {
      problems.push(`${state}: the child printed no answer`);
      continue;
    }
    if (a.elapsedMs > WALL_CLOCK_CEILING_MS) problems.push(`${state}: elapsed ${a.elapsedMs} ms exceeds the declared ceiling ${WALL_CLOCK_CEILING_MS} ms`);
    if (a.status !== STATUS) problems.push(`${state}: status=${JSON.stringify(a.status)} (declared ${STATUS})`);
    if (typeof a.message !== 'string' || !a.message.endsWith(`, the value at ${DEEP_PATH} is ${CLASS.ceiling}`)) {
      problems.push(`${state}: message is not the class spelling at the depth arm: ${short(a.message, 200)}`);
    } else {
      const subject = partOneSubject(a.message);
      if (subject !== CLASS.ceiling) problems.push(`${state}: PART ONE subject=${JSON.stringify(short(subject, 120))} (declared the class spelling)`);
    }
    if (a.seedOutcome !== 'passed') problems.push(`${state}: the seed did not commit (outcome=${JSON.stringify(a.seedOutcome)})`);
    if (a.fileUnchanged !== true) problems.push(`${state}: the store file CHANGED (${a.beforeBytes}B -> ${a.afterBytes}B)`);
    if (!a.register || !sameTree(a.register, { seed: 'kept' })) problems.push(`${state}: the fresh boot's register is not unmoved: ${short(a.register)}`);
    if (a.readAtStatus !== 'AddressNotFound') problems.push(`${state}: the fresh boot answered ${JSON.stringify(a.readAtStatus)} at the uncommitted address`);
    if (a.seeded !== 'kept') problems.push(`${state}: the seed does not read back as 'kept': ${short(a.seeded)}`);
    lines.push(`${state}: elapsed=${a.elapsedMs}ms ceiling=${WALL_CLOCK_CEILING_MS}ms status=${JSON.stringify(a.status)} position=127-segments subject=${JSON.stringify(CLASS.ceiling)} bytes=${a.beforeBytes}->${a.afterBytes} unchanged=${a.fileUnchanged} readAt=${a.readAtStatus} seed=${a.seeded}`);
  }
  const detail = problems.length === 0
    ? `${lines.join(' | ')} — the one figure is NODE_CEILING (${NODE_CEILING}) and no second ceiling is minted`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G10` — THE BUDGET IS NOT A CLAMP AND IT IS FRESH PER CALL: the `3,000`-element `20`-link chain inside
// the budget still renders its join; the `M = 2` over a `600,000`-link chain is outside it and answers the class
// spelling, and two identical calls answer the SAME bytes (the allowance is created per call).
cell({
  id: 'LIVE-G10',
  green: 'contract.md §2.1 F5-1 item (1d) + F6-1 items (1c),(1d) · test-cases.md §3 JC-TC-57 / JC-TC-60 (the per-call freshness and the inside-budget chain)',
  scenario: 'the budget is fresh per call and not a rendering clamp: a 3,000-element 20-link chain renders its join inside one call, while M=2 over a 600,000-link chain answers the class spelling and two identical calls answer the SAME bytes',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-1 item (1d) and F6-1 items (1c),(1d) · test-cases.md §3 JC-TC-57 and JC-TC-60',
    start: 'write(addr, "file", arrayChain(new Array(3000).fill(chainOf(20)), 127)) and, twice on one seeded store, arrayChain(new Array(2).fill(chainOf(600000)), 127)',
    end: 'the inside-budget join byte-for-byte; the class spelling at the 127-segment position for both K-factor calls, byte-identical; the seeded image unchanged, the register unmoved, a fresh boot AddressNotFound',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];

  const insideChain = new Array(3000).fill(chainOf(20));
  const insideDrive = settledDrive('LIVE-G10-inside-chain', { run: (inst) => inst.write(['a'], 'file', arrayChain(insideChain, 127)) });
  const insideExpected = insideChain.map(() => '[object Object]').join(',');
  const insideCheck = walkRefusalCheck(insideDrive, { cls: 'ceiling', position: DEEP_PATH, subject: insideExpected });
  if (!insideCheck.ok) problems.push(`inside-budget chain: ${insideCheck.detail}`);
  lines.push(`inside-chain=${insideCheck.observed.messageLength}B rendering`);

  const kValue = arrayChain(new Array(2).fill(chainOf(600000)), 127);
  const kSeed = seed('LIVE-G10-k-factor');
  const first = attempt(() => kSeed.store.write(['a'], 'file', kValue));
  const second = attempt(() => kSeed.store.write(['a'], 'file', kValue));
  const drive = finishDrive(kSeed);
  drive.answer = second;
  const kCheck = walkRefusalCheck(drive, { cls: 'ceiling', position: DEEP_PATH, subject: CLASS.ceiling });
  if (kCheck.ok) {
    // the second call's settled state is asserted above; the FIRST call's bytes are asserted here, beside the
    // freshness law itself: the two answers must be the same bytes.
    if (!first.ok && !second.ok) {
      if (first.error.message !== second.error.message) problems.push('the two identical K-factor calls answered DIFFERENT bytes (the allowance is not fresh per call)');
      if (first.error.status !== second.error.status) problems.push('the two identical K-factor calls answered different statuses');
    } else {
      problems.push('a K-factor call was ADMITTED');
    }
    lines.push(`k-factor: two identical calls identical=${!first.ok && !second.ok && first.error.message === second.error.message} subject=${JSON.stringify(CLASS.ceiling)}`);
  } else {
    problems.push(`k-factor: ${kCheck.detail}`);
  }
  const detail = problems.length === 0
    ? `${lines.join('; ')}; ${settledText({ after: { length: 15 }, registerBefore: { value: { seed: 'kept' } } })} on both seeded stores`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// LAW 4 — `hasLoneSurrogate` INVOKES NOTHING FROM A MUTABLE PROTOTYPE
// (`contract.md §2.1` F6-2 · `JC-TC-61`) — `LIVE-G11`–`LIVE-G14`
// ═════════════════════════════════════════════════════════════════════════════

const LONE_SURROGATE_PART_ONE = `'${CLASS.loneSurrogate}' is not a value`;

/** The `F6-2` mutation: `String.prototype.charCodeAt` answers `0x41` for EVERY index, counting; plus a
 *  caller-defined out-of-range prototype index `String.prototype['1'] = '\uDC00'`. */
function stringPrototypeInstalls(codeUnits) {
  return [
    {
      proto: String.prototype,
      name: 'charCodeAt',
      descriptor: {
        value: function charCodeAtMarker() { codeUnits.codeUnits += 1; return 0x41; },
        writable: true,
        enumerable: false,
        configurable: true,
      },
    },
    {
      proto: String.prototype,
      name: '1',
      descriptor: { value: '\uDC00', writable: true, enumerable: true, configurable: true },
    },
  ];
}

// `LIVE-G11` — THE VALUE DRIVE under the mutation: a lone-surrogate VALUE is still REFUSED at row `9` with its
// declared class at the root position, the override's counter `0`, and no lone surrogate crossing to the store.
cell({
  id: 'LIVE-G11',
  green: 'contract.md §2.1 F6-2 items (2a),(2b),(2d) · test-cases.md §3 JC-TC-61 (the value drive)',
  scenario: 'with String.prototype.charCodeAt overridden to answer 0x41 for every index and String.prototype["1"] caller-defined, a lone-surrogate VALUE is still refused at row 9 with its declared class at the root position and the override never runs',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F6-2, items (2a),(2b),(2d) · test-cases.md §3 JC-TC-61',
    start: 'write(addr, "file", "\\uD800") under the counting charCodeAt override (and the prototype index) on a real seeded store',
    end: 'ValueRefusedAtBoundary, subject and class \'a string carrying a lone surrogate\', position "the write\'s value argument", override counter 0, no 65 in the message; file bytes unchanged; register unmoved; fresh boot AddressNotFound',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const counters = { codeUnits: 0 };
  const installs = stringPrototypeInstalls(counters);
  const s = seed('LIVE-G11');
  let live = null;
  let liveCount = 0;
  let answer = null;
  let valueCount = 0;
  withInstalls('LIVE-G11', installs, () => {
    live = 'AB'.charCodeAt(0);
    liveCount = counters.codeUnits;
    counters.codeUnits = 0;
    answer = attempt(() => s.store.write(['a'], 'file', '\uD800'));
    valueCount = counters.codeUnits;
  });
  const drive = finishDrive(s);
  drive.answer = answer;
  const check = walkRefusalCheck(drive, { cls: 'loneSurrogate', position: ROOT_POSITION, subject: CLASS.loneSurrogate });
  if (live !== 0x41 || liveCount === 0) problems.push('the charCodeAt override is DEAD: a direct "AB".charCodeAt(0) did not answer 0x41');
  if (valueCount !== 0) problems.push(`the override RAN on the refusal path (count ${valueCount})`);
  if (!check.ok) problems.push(check.detail);
  if (answer && !answer.ok && answer.error.message.includes('65')) problems.push("the override's answer 65 stands in the refusal's bytes where the package's own datum belongs");
  if (answer && !answer.ok && answer.error.message.includes('\uFFFD')) problems.push('a U+FFFD repair stands in the refusal bytes');
  const detail = problems.length === 0
    ? `status=${JSON.stringify(check.observed.status)} subject=${JSON.stringify(CLASS.loneSurrogate)} position=${JSON.stringify(ROOT_POSITION)} charCodeAt-runs=0 (liveness: live read=${JSON.stringify(live)} count=${liveCount}); no 65, no U+FFFD; ${settledText(drive)}`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G12` — THE KEY DRIVE under the same mutation: a lone-surrogate KEY is still refused at row `10` at the
// member position `valuePosition`'s own lone-surrogate form spells, the override's counter `0`.
cell({
  id: 'LIVE-G12',
  green: 'contract.md §2.1 F6-2 items (2a),(2b),(2d) · test-cases.md §3 JC-TC-61 (the key drive)',
  scenario: 'with the same mutation in force, a lone-surrogate KEY is still refused at row 10 at the member position the key path spells, with the override never running',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F6-2, items (2a),(2b),(2d) · test-cases.md §3 JC-TC-61',
    start: 'write(addr, "file", {["a\\uD800"]: 1}) under the counting charCodeAt override on a real seeded store',
    end: 'ValueRefusedAtBoundary, subject "the write\'s value argument", class \'a string carrying a lone surrogate\', position "member \'<key: a string carrying a lone surrogate>\' of the write\'s value argument", override counter 0; file bytes unchanged; register unmoved; fresh boot AddressNotFound',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const counters = { codeUnits: 0 };
  const installs = stringPrototypeInstalls(counters);
  const s = seed('LIVE-G12');
  let answer = null;
  let keyCount = 0;
  withInstalls('LIVE-G12', installs, () => {
    answer = attempt(() => s.store.write(['a'], 'file', { 'a\uD800': 1 }));
    keyCount = counters.codeUnits;
  });
  const drive = finishDrive(s);
  drive.answer = answer;
  const check = walkRefusalCheck(drive, { cls: 'loneSurrogate', position: KEY_POSITION, subject: ROOT_POSITION });
  if (keyCount !== 0) problems.push(`the override RAN on the key refusal path (count ${keyCount})`);
  if (!check.ok) problems.push(check.detail);
  const detail = problems.length === 0
    ? `status=${JSON.stringify(check.observed.status)} subject=${JSON.stringify(ROOT_POSITION)} position=${JSON.stringify(KEY_POSITION)} charCodeAt-runs=0; ${settledText(drive)}`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G13` — THE BOUND's OWN DRIVE (the intrinsic `charCodeAt` untouched, only the out-of-range prototype
// index present) and the pair CONTROL: the high half standing alone is still refused (the pair read is bounded
// to `i + 1 < length`), and the lawful pair `'\uD83D\uDE00'` is ADMITTED and round-trips byte-identically.
cell({
  id: 'LIVE-G13',
  green: 'contract.md §2.1 F6-2 item (2b) · test-cases.md §3 JC-TC-61 (the bound’s own drive and the admitted pair)',
  scenario: 'the surrogate-pair read is bounded: with String.prototype["1"] caller-defined and charCodeAt untouched, a lone high half is still refused at row 9; and the lawful pair "\\uD83D\\uDE00" is admitted and read back byte-identically',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F6-2, item (2b) · test-cases.md §3 JC-TC-61',
    start: 'write(addr, "file", "\\uD800") with String.prototype["1"]="\\uDC00" and the intrinsic charCodeAt; and a seeded store admitted the pair "\\uD83D\\uDE00"',
    end: 'the lone half refused with the declared bytes and the settled state; the pair admitted, committed, and read back byte-identically by a fresh instance',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const indexOnly = [{
    proto: String.prototype,
    name: '1',
    descriptor: { value: '\uDC00', writable: true, enumerable: true, configurable: true },
  }];
  const boundDrive = settledDrive('LIVE-G13-bound', { installs: indexOnly, run: (inst) => inst.write(['a'], 'file', '\uD800') });
  const boundCheck = walkRefusalCheck(boundDrive, { cls: 'loneSurrogate', position: ROOT_POSITION, subject: CLASS.loneSurrogate });
  if (!boundCheck.ok) problems.push(`bound: ${boundCheck.detail}`);

  // THE PAIR CONTROL: admitted under the full mutation, committed, and read back byte-identically.
  const counters = { codeUnits: 0 };
  const pairSeed = seed('LIVE-G13-pair');
  let pairAnswer = null;
  withInstalls('LIVE-G13-pair', stringPrototypeInstalls(counters), () => {
    pairAnswer = attempt(() => writeAndCommit(pairSeed.store, ['pair'], '\uD83D\uDE00'));
  });
  const pairDrive = finishDrive(pairSeed, ['pair']);
  let back = null;
  if (pairAnswer !== null && pairAnswer.ok) {
    back = attempt(() => pairDrive.fresh.read(['pair'], 'file'));
  } else {
    problems.push(`the pair was REFUSED: ${pairAnswer === null ? 'no answer' : describe(pairAnswer.error)}`);
  }
  if (back !== null && (!back.ok || back.value !== '\uD83D\uDE00')) problems.push(`the pair did not read back byte-identically: ${short(back.ok ? back.value : back.error)}`);
  if (!pairDrive.register.ok || !sameTree(pairDrive.register.value, { seed: 'kept', pair: '\uD83D\uDE00' })) {
    problems.push(`the fresh boot's register does not carry the seed and the pair: ${short(pairDrive.register.ok ? pairDrive.register.value : pairDrive.register.error)}`);
  }
  if (counters.codeUnits !== 0) problems.push(`the override RAN on the pair path (count ${counters.codeUnits})`);
  const detail = problems.length === 0
    ? `bound: subject=${JSON.stringify(CLASS.loneSurrogate)} position=${JSON.stringify(ROOT_POSITION)} ${settledText(boundDrive)}; pair: ADMITTED, committed, read back ${JSON.stringify('\uD83D\uDE00')} by a fresh instance, register={seed,pair}, charCodeAt-runs=0`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G14` — THE UNMUTATED CONTROLS ARE BYTE-IDENTICAL, and the restore is proved structurally AND
// behaviourally: the intrinsic's identity and descriptor, an out-of-range index absent, the pair a code point,
// and a lone surrogate refused with the declared bytes again.
cell({
  id: 'LIVE-G14',
  green: 'contract.md §2.1 F6-2 items (2c),(2d) · test-cases.md §3 JC-TC-61 (the controls and the restore)',
  scenario: 'the same three drives with nothing mutated answer BYTE-IDENTICAL refusals, and every mutated member is restored and proved — structurally (identity and descriptor) and behaviourally (the intrinsic answers again, the out-of-range index is absent, the pair is one code point)',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F6-2, items (2c),(2d) · test-cases.md §3 JC-TC-61 (the controls and the restore)',
    start: 'the same value, key and bound drives with no mutation, beside the post-restore behaviour',
    end: 'each refusal byte-identical to its mutated twin; charCodeAt identity and flags restored; String.prototype["1"] absent; "\\uD800"[1] undefined; "A".charCodeAt(0) = 0x41; the pair one code point; a lone surrogate refused with the declared bytes',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const mutated = {};
  {
    const counters = { codeUnits: 0 };
    const s = seed('LIVE-G14-mutated');
    withInstalls('LIVE-G14-mutated', stringPrototypeInstalls(counters), () => {
      mutated.value = attempt(() => s.store.write(['a'], 'file', '\uD800'));
      mutated.key = attempt(() => s.store.write(['a'], 'file', { 'a\uD800': 1 }));
    });
    mutated.drive = finishDrive(s);
  }
  const plain = {};
  {
    const s = seed('LIVE-G14-plain');
    plain.value = attempt(() => s.store.write(['a'], 'file', '\uD800'));
    plain.key = attempt(() => s.store.write(['a'], 'file', { 'a\uD800': 1 }));
    plain.drive = finishDrive(s);
  }
  for (const position of ['value', 'key']) {
    const a = mutated[position];
    const b = plain[position];
    if (!a || !b || a.ok || b.ok) {
      problems.push(`${position}: one of the drives was ADMITTED`);
      continue;
    }
    if (a.error.message !== b.error.message) problems.push(`the ${position} drive's refusal is not byte-identical to its unmutated twin`);
    if (a.error.status !== b.error.status) problems.push(`the ${position} drive's status moved under the mutation`);
  }
  const parsedPlain = plain.value && !plain.value.ok ? refusalAnswer(plain.value.error) : null;
  if (parsedPlain && parsedPlain.ok && !parsedPlain.message.includes(LONE_SURROGATE_PART_ONE)) problems.push('the unmutated value refusal does not carry the declared class');
  const settled = settledProblems(plain.drive);
  problems.push(...settled);

  // THE RESTORE, PROVED — behaviourally (the structural half is measured by `withInstalls` and printed in the
  // summary's S17-PROTOTYPES-RESTORED line).
  const intrinsicCharCodeAt = 'A'.charCodeAt(0);
  const outOfRange = '\uD800'[1];
  const pairPoint = '\uD83D\uDE00'.codePointAt(0);
  const afterRestore = seed('LIVE-G14-after-restore');
  const afterRestoreAnswer = attempt(() => afterRestore.store.write(['a'], 'file', '\uD800'));
  const afterRestoreDrive = finishDrive(afterRestore);
  afterRestoreDrive.answer = afterRestoreAnswer;
  const afterCheck = walkRefusalCheck(afterRestoreDrive, { cls: 'loneSurrogate', position: ROOT_POSITION, subject: CLASS.loneSurrogate });
  if (intrinsicCharCodeAt !== 0x41) problems.push(`the restore is not behavioural: 'A'.charCodeAt(0) answered ${intrinsicCharCodeAt}`);
  if (outOfRange !== undefined) problems.push(`the restore is not behavioural: '\\uD800'[1] answered ${short(outOfRange)}`);
  if (pairPoint !== 0x1F600) problems.push(`the restore is not behavioural: the pair's code point is ${pairPoint}`);
  if (!afterCheck.ok) problems.push(`after restore: ${afterCheck.detail}`);
  const detail = problems.length === 0
    ? `mutated and unmutated refusals byte-identical (value and key); restore proved behaviourally: charCodeAt='A'->0x41, '\uD800'[1]=undefined, pair codePoint=0x1F600, lone surrogate refused with the declared bytes; ${settledText(plain.drive)}`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// LAW 5 — A CALLABLE `Proxy` IS NEVER COERCED AT A CARRIER SLOT
// (`contract.md §2.1` F5-3 · `JC-TC-58`) — `LIVE-G15`–`LIVE-G16`
// ═════════════════════════════════════════════════════════════════════════════

const TRAP_KEYS = [
  'apply', 'construct', 'defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor',
  'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf',
];

/** The `JC-TC-58` instrument: every handler trap counts; `get` answers a marker function for
 *  `Symbol.toPrimitive`/`toString`/`valueOf` so a coercion RUNS if it is attempted. */
function countedProxy(callable) {
  const counters = {};
  for (const key of TRAP_KEYS) counters[key] = 0;
  const state = { primitiveCalls: 0 };
  const target = callable ? function carrierTarget() {} : {};
  const handler = {
    apply(t, thisArg, args) { counters.apply += 1; return Reflect.apply(t, thisArg, args); },
    construct(t, args, newTarget) { counters.construct += 1; return Reflect.construct(t, args, newTarget); },
    defineProperty(t, key, descriptor) { counters.defineProperty += 1; return Reflect.defineProperty(t, key, descriptor); },
    deleteProperty(t, key) { counters.deleteProperty += 1; return Reflect.deleteProperty(t, key); },
    get(t, key, receiver) {
      counters.get += 1;
      if (key === Symbol.toPrimitive) return () => { state.primitiveCalls += 1; return 'TOPRIMITIVE_MARKER'; };
      if (key === 'toString' || key === 'valueOf') return () => { state.primitiveCalls += 1; return 'TOSTRING_MARKER'; };
      return Reflect.get(t, key, receiver);
    },
    getOwnPropertyDescriptor(t, key) { counters.getOwnPropertyDescriptor += 1; return Reflect.getOwnPropertyDescriptor(t, key); },
    getPrototypeOf(t) { counters.getPrototypeOf += 1; return Reflect.getPrototypeOf(t); },
    has(t, key) { counters.has += 1; return Reflect.has(t, key); },
    isExtensible(t) { counters.isExtensible += 1; return Reflect.isExtensible(t); },
    ownKeys(t) { counters.ownKeys += 1; return Reflect.ownKeys(t); },
    preventExtensions(t) { counters.preventExtensions += 1; return Reflect.preventExtensions(t); },
    set(t, key, value, receiver) { counters.set += 1; return Reflect.set(t, key, value, receiver); },
    setPrototypeOf(t, proto) { counters.setPrototypeOf += 1; return Reflect.setPrototypeOf(t, proto); },
  };
  return { proxy: new Proxy(target, handler), counters, state, total: () => Object.values(counters).reduce((a, b) => a + b, 0) };
}

// `LIVE-G15` — the CALLABLE `Proxy` at the four carrier slots over REAL SEEDED STORES: subject `'a Proxy'`,
// class half per slot, EVERY trap `0`, the marker in no byte, and the settled state at each slot.
cell({
  id: 'LIVE-G15',
  green: 'contract.md §2.1 F5-3 items (3a),(3b),(3d) · test-cases.md §3 JC-TC-58 (the four slots)',
  scenario: 'a CALLABLE Proxy — typeof "function" — is never coerced at a carrier slot: listen(proxy,[]), listen("h",[proxy]), removeListener(proxy) and register(proxy,fn) each answer the subject "a Proxy" with EVERY handler trap 0 and the marker in no byte',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-3, items (3a),(3b),(3d) · test-cases.md §3 JC-TC-58',
    start: 'the same counting instrument (a callable Proxy whose get trap answers a marker function for Symbol.toPrimitive) at the four (d)(i) slots, each on a real seeded store',
    end: 'AddressMalformed, subject "a Proxy", the slot’s own class half, every trap 0 (and the marker in no byte); file bytes unchanged; register unmoved; fresh boot AddressNotFound',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const MARKER = 'CALLER_CONTROLLED_TOPRIMITIVE_JC58';
  const problems = [];
  const lines = [];
  const twin = countedProxy(true);
  const twinString = String(twin.proxy);
  const twinState = { traps: twin.total(), live: twinString, primitive: twin.state.primitiveCalls };
  if (twinState.traps === 0 || !twinString.includes('MARKER')) problems.push('the Proxy instrument is DEAD: a direct String(proxy) ran no trap or answered no marker');
  const slots = [
    { label: 'listen-handle', run: (inst, p) => inst.listen(p, []), classHalf: 'is a Proxy' },
    { label: 'listen-member', run: (inst, p) => inst.listen('h', [p]), classHalf: 'carries a Proxy at member 0' },
    { label: 'removeListener', run: (inst, p) => inst.removeListener(p), classHalf: 'is a Proxy' },
    { label: 'register', run: (inst, p) => inst.register(p, () => {}), classHalf: 'is a Proxy' },
  ];
  for (const slot of slots) {
    const instrument = countedProxy(true);
    const drive = settledDrive(`LIVE-G15-${slot.label}`, { run: (inst) => slot.run(inst, instrument.proxy) });
    const check = carrierSlotCheck(drive, { descriptor: CLASS.proxy, classHalf: slot.classHalf, marker: MARKER });
    if (!check.ok) problems.push(`${slot.label}: ${check.detail}`);
    if (instrument.total() !== 0) problems.push(`${slot.label}: a handler trap RAN (${instrument.total()} trap member(s): ${JSON.stringify(instrument.counters)})`);
    if (instrument.state.primitiveCalls !== 0) problems.push(`${slot.label}: a coercion member ran (${instrument.state.primitiveCalls})`);
    lines.push(`${slot.label}: subject=${JSON.stringify(CLASS.proxy)} traps=0 ${settledText(drive)}`);
  }
  const detail = problems.length === 0
    ? `${lines.join(' | ')}; instrument proved live on a twin (String(proxy) ran ${twinState.traps} trap member(s) and ${twinState.primitive} coercion member(s), answering ${JSON.stringify(short(twinString, 60))})`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G16` — the CONTROLS: a NON-CALLABLE `Proxy` with the same counting handler answers BYTE-IDENTICAL
// messages at all four slots with every trap `0`; an ordinary `{}` stays unmoved (`'[object Object]'`, the class
// half naming a `plain object`).
cell({
  id: 'LIVE-G16',
  green: 'contract.md §2.1 F5-3 item (3b) · test-cases.md §3 JC-TC-58 (the controls)',
  scenario: 'the Proxy class is ONE class: a non-callable Proxy with the same counting handler answers BYTE-IDENTICAL messages at all four slots with every trap 0, and an ordinary {} stays unmoved',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-3, item (3b) · test-cases.md §3 JC-TC-58 (the controls)',
    start: 'the same four slots with a NON-CALLABLE counting Proxy, and with an ordinary {}',
    end: 'each slot’s message byte-identical to its callable twin, every trap 0; {} answers subject "[object Object]" with a plain-object class half; settled at each seeded store',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const MARKER = 'CALLER_CONTROLLED_TOPRIMITIVE_JC58';
  const problems = [];
  const lines = [];
  const slots = [
    { label: 'listen-handle', callable: (inst, p) => inst.listen(p, []), plain: (inst, p) => inst.listen(p, []), classHalf: 'is a Proxy' },
    { label: 'listen-member', callable: (inst, p) => inst.listen('h', [p]), plain: (inst, p) => inst.listen('h', [p]), classHalf: 'carries a Proxy at member 0' },
    { label: 'removeListener', callable: (inst, p) => inst.removeListener(p), plain: (inst, p) => inst.removeListener(p), classHalf: 'is a Proxy' },
    { label: 'register', callable: (inst, p) => inst.register(p, () => {}), plain: (inst, p) => inst.register(p, () => {}), classHalf: 'is a Proxy' },
  ];
  for (const slot of slots) {
    const callableInstrument = countedProxy(true);
    const callableDrive = settledDrive(`LIVE-G16-${slot.label}-callable`, { run: (inst) => slot.callable(inst, callableInstrument.proxy) });
    const plainInstrument = countedProxy(false);
    const plainDrive = settledDrive(`LIVE-G16-${slot.label}-plain-proxy`, { run: (inst) => slot.plain(inst, plainInstrument.proxy) });
    const callableCheck = carrierSlotCheck(callableDrive, { descriptor: CLASS.proxy, classHalf: slot.classHalf, marker: MARKER });
    const plainCheck = carrierSlotCheck(plainDrive, { descriptor: CLASS.proxy, classHalf: slot.classHalf, marker: MARKER });
    if (!callableCheck.ok) problems.push(`${slot.label} callable: ${callableCheck.detail}`);
    if (!plainCheck.ok) problems.push(`${slot.label} non-callable: ${plainCheck.detail}`);
    if (plainInstrument.total() !== 0) problems.push(`${slot.label}: a handler trap RAN on the non-callable Proxy (${plainInstrument.total()})`);
    if (!callableDrive.answer || callableDrive.answer.ok || !plainDrive.answer || plainDrive.answer.ok) {
      problems.push(`${slot.label}: one Proxy drive was admitted`);
    } else if (callableDrive.answer.error.message !== plainDrive.answer.error.message) {
      problems.push(`${slot.label}: the callable and non-callable messages are NOT byte-identical`);
    }
    lines.push(`${slot.label}: callable===non-callable, traps=0`);
  }
  // THE ORDINARY {} CONTROL at the same four slots.
  const ordinary = {};
  for (const slot of slots) {
    const drive = settledDrive(`LIVE-G16-${slot.label}-ordinary`, { run: (inst) => slot.plain(inst, ordinary) });
    const check = carrierSlotCheck(drive, { descriptor: '[object Object]', classHalf: null });
    if (!check.ok) problems.push(`${slot.label} ordinary: ${check.detail}`);
  }
  const detail = problems.length === 0
    ? `${lines.join(' | ')}; ordinary {} at all four slots: subject ${JSON.stringify('[object Object]')} with a plain-object class half, every seeded store byte-identical and unmoved`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// LAW 6 — THE POSITION SPELLING INVOKES NOTHING FROM A MUTABLE PROTOTYPE
// (`contract.md §2.1` F5-4 · `JC-TC-59`) — `LIVE-G17`–`LIVE-G18`
// ═════════════════════════════════════════════════════════════════════════════

/** The `F5-4` mutation: `Array.prototype.map` and `Array.prototype.join` replaced by counting functions. */
function arrayPrototypeInstalls(counters) {
  return [
    {
      proto: Array.prototype,
      name: 'map',
      descriptor: { value: function mapMarker() { counters.map += 1; return ['POSITION_MARKER']; }, writable: true, enumerable: false, configurable: true },
    },
    {
      proto: Array.prototype,
      name: 'join',
      descriptor: { value: function joinMarker() { counters.join += 1; return 'POSITION_MARKER'; }, writable: true, enumerable: false, configurable: true },
    },
  ];
}

// `LIVE-G17` — THE MUTATED DRIVE: with `map` and `join` overridden, the member-position refusal still spells
// the declared position byte-for-byte, and NEITHER override runs.
cell({
  id: 'LIVE-G17',
  green: 'contract.md §2.1 F5-4 items (4a),(4c),(4d) · test-cases.md §4 JC-TC-59 (the mutated positions)',
  scenario: 'with Array.prototype.map and Array.prototype.join overridden, a member-position refusal still spells the declared position — member \'a\' and the nested \'a\'/\'b\' — and neither override runs',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-4, items (4a),(4c),(4d) · test-cases.md §4 JC-TC-59',
    start: 'write(addr, "file", {a: 10n}) and {a: {b: 10n}} with map/join counting overrides in force, on real seeded stores',
    end: "position \"member 'a' of the write's value argument\" and \"member 'a'/'b' of the write's value argument\" exactly; map-runs=0 and join-runs=0; file bytes unchanged; register unmoved; fresh boot AddressNotFound",
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];
  const drives = [
    { label: 'member', value: { a: 10n }, position: MEMBER_A_POSITION },
    { label: 'nested', value: { a: { b: 10n } }, position: MEMBER_NESTED_POSITION },
  ];
  for (const d of drives) {
    const counters = { map: 0, join: 0 };
    const live = [1, 2];
    const s = seed(`LIVE-G17-${d.label}`);
    let liveMap = null;
    let liveJoin = null;
    let answer = null;
    withInstalls(`LIVE-G17-${d.label}`, arrayPrototypeInstalls(counters), () => {
      liveMap = live.map((x) => x);
      liveJoin = live.join('/');
      counters.map = 0;
      counters.join = 0;
      answer = attempt(() => s.store.write(['a'], 'file', d.value));
    });
    const drive = finishDrive(s);
    drive.answer = answer;
    const check = walkRefusalCheck(drive, { cls: 'bigint', position: d.position, subject: '10n' });
    if (!Array.isArray(liveMap) || !liveMap.includes('POSITION_MARKER')) problems.push(`${d.label}: the map override is DEAD`);
    if (liveJoin !== 'POSITION_MARKER') problems.push(`${d.label}: the join override is DEAD`);
    if (counters.map !== 0 || counters.join !== 0) problems.push(`${d.label}: an override RAN on the refusal path (map=${counters.map} join=${counters.join})`);
    if (!check.ok) problems.push(`${d.label}: ${check.detail}`);
    lines.push(`${d.label}: position=${JSON.stringify(d.position)} map-runs=0 join-runs=0 ${settledText(drive)}`);
  }
  const detail = problems.length === 0
    ? `${lines.join(' | ')}; subject='10n' at each`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// `LIVE-G18` — the CONTROLS byte-identical with NOTHING mutated, the RESTORE proved structurally and
// behaviourally, and the `LIVE-F18` SUPERSESSION measured: under an overridden `Array.prototype.join`, the
// depth-arm subject's rendering still takes the override (the DECLARED residual's one remaining path, count
// `1`) while the POSITION spelling takes it `0` times — the second path `§16`'s `LIVE-F18` recorded is closed.
cell({
  id: 'LIVE-G18',
  green: 'contract.md §2.1 F5-4 items (4d),(4e) · test-cases.md §4 JC-TC-59 (the controls and the restore)',
  scenario: 'the unmutated controls are byte-identical, the restore is proved, and LIVE-F18’s position half is superseded: under an overridden join the depth-arm subject takes it once (the declared residual) while the position spelling takes it zero times',
  coverage: {
    matrix_row: 'contract.md §2.1 clause of 2026-10-24 on F5-4, items (4d),(4e) · test-cases.md §4 JC-TC-59 (and the LIVE-F18 supersession §2.1 item (4d) rules)',
    start: 'the same two shapes with nothing mutated; the restore; and arrayChain([1,2],127) under an overridden Array.prototype.join',
    end: 'unmutated refusals byte-identical; Array.prototype.map/join the intrinsics again (identity and flags) and the language answering again; the depth-arm subject = the override’s own string with join-runs=1 and the position the declared 127-segment path',
    real_input: true,
    proxy_pass: false,
  },
}, () => {
  const problems = [];
  const lines = [];
  const mutated = {};
  {
    const counters = { map: 0, join: 0 };
    const s = seed('LIVE-G18-mutated');
    withInstalls('LIVE-G18-mutated', arrayPrototypeInstalls(counters), () => {
      mutated.member = attempt(() => s.store.write(['a'], 'file', { a: 10n }));
      mutated.nested = attempt(() => s.store.write(['a'], 'file', { a: { b: 10n } }));
    });
    mutated.drive = finishDrive(s);
  }
  const plain = {};
  {
    const s = seed('LIVE-G18-plain');
    plain.member = attempt(() => s.store.write(['a'], 'file', { a: 10n }));
    plain.nested = attempt(() => s.store.write(['a'], 'file', { a: { b: 10n } }));
    plain.drive = finishDrive(s);
  }
  for (const label of ['member', 'nested']) {
    const a = mutated[label];
    const b = plain[label];
    if (!a || !b || a.ok || b.ok) { problems.push(`${label}: one drive was ADMITTED`); continue; }
    if (a.error.message !== b.error.message) problems.push(`the ${label} refusal is not byte-identical to its unmutated twin`);
  }
  const settled = settledProblems(plain.drive);
  problems.push(...settled);

  // THE RESTORE, PROVED BEHAVIOURALLY (the structural half is `withInstalls`' own measurement).
  const languageMap = [1, 2].map((x) => x * 2);
  const languageJoin = [1, 2].join('/');
  if (JSON.stringify(languageMap) !== JSON.stringify([2, 4])) problems.push('the restore is not behavioural: [1,2].map(x=>x*2) did not answer [2,4]');
  if (languageJoin !== '1/2') problems.push(`the restore is not behavioural: [1,2].join('/') answered ${JSON.stringify(languageJoin)}`);

  // THE `LIVE-F18` SUPERSESSION: join overridden, refused value = an array at the depth arm.
  const joinCounters = { join: 0 };
  const overriddenJoin = [{
    proto: Array.prototype,
    name: 'join',
    descriptor: { value: function joinMarker() { joinCounters.join += 1; return 'JOIN_RAN'; }, writable: true, enumerable: false, configurable: true },
  }];
  const supSeed = seed('LIVE-G18-supersession');
  let supAnswer = null;
  withInstalls('LIVE-G18-supersession', overriddenJoin, () => {
    supAnswer = attempt(() => supSeed.store.write(['a'], 'file', arrayChain([1, 2], 127)));
  });
  const supDrive = finishDrive(supSeed);
  supDrive.answer = supAnswer;
  const supCheck = walkRefusalCheck(supDrive, { cls: 'ceiling', position: DEEP_PATH, subject: 'JOIN_RAN' });
  if (!supCheck.ok) problems.push(`supersession: ${supCheck.detail}`);
  if (joinCounters.join !== 1) problems.push(`supersession: the overridden join ran ${joinCounters.join} time(s), declared 1 (the subject's own rendering and NOT the position) — the position spelling must take it 0 times`);
  lines.push(`supersession: subject='JOIN_RAN' join-runs=${joinCounters.join} position=${JSON.stringify(DEEP_PATH)}`);
  const detail = problems.length === 0
    ? `unmutated controls byte-identical; restore proved behaviourally ([1,2].map->[2,4], [1,2].join('/')->'1/2'); ${lines.join('; ')} — the DECLARED residual's subject path remains, and LIVE-F18's SECOND path is CLOSED; ${settledText(plain.drive)}`
    : problems.join('; ');
  return { green: { ok: problems.length === 0, detail } };
});

// ═════════════════════════════════════════════════════════════════════════════
// §3. THE SUMMARY — identity, the measured restores, the witnesses, the census, the coverage evidence
// ═════════════════════════════════════════════════════════════════════════════

// **THE ADDON THAT THE RUNNING PROCESS ACTUALLY MAPPED** — read from `/proc/self/maps` HERE, after the cell
// above, because the addon loads lazily at the first construction.
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

// **THE PROTOTYPES, RESTORED AND MEASURED** — every install is undone in a `finally`, and the restore is
// measured on the exact prior descriptor (identity and flags, or absence).
const restoredAll = RESTORE_LOG.every((row) => row.restored);
console.log(`S17-PROTOTYPES-RESTORED state-instances=${RESTORE_LOG.length} all=${restoredAll} entries=${JSON.stringify(RESTORE_LOG)}`);
for (const row of RESTORE_LOG) if (!row.restored) console.log(`S17-RESTORE-FAIL ${row.id} :: ${JSON.stringify(row)}`);

// **THE TIMED WITNESSES** — the wall clock beside the declared ceiling.
for (const row of WITNESS_LOG) {
  console.log(`WITNESS state=${row.state} elapsedMs=${row.elapsedMs} ceilingMs=${row.ceilingMs} ${row.timedOut ? 'TIMED-OUT' : 'answered'}`);
}

const tally = (verdict) => RESULTS.filter((r) => r.verdict === verdict).length;
const summary = {
  reach: REACH,
  cells: RESULTS.length,
  pass: tally('PASS'),
  fail: tally('FAIL'),
  finding: tally('FINDING'),
  observed: tally('OBSERVED'),
};
console.log(`SUMMARY reach=${REACH} cells=${summary.cells} pass=${summary.pass} fail=${summary.fail} finding=${summary.finding} observed=${summary.observed}`);

for (const r of RESULTS.filter((x) => x.verdict === 'FAIL')) console.log(`VIOLATION ${r.id} :: ${r.detail}`);

// **THE COVERAGE REPORT** — machine-readable, one row per cell, each bound to the contract's matrix row and the
// real input it starts from. `summary.total` IS the report's own row count, and the row set IS the cell set.
const countVerdict = (verdict) => RESULTS.filter((r) => r.verdict === verdict).length;
// THE ROW'S DEFECT-CLASS BINDING (`D-GP-UFA` §6.1's `d_class`): the refusal status/class (or, for the control and
// byte-identity rows, the declared rendering) the cell pins — i.e. the class the row would FAIL under.
const D_CLASS = {
  'LIVE-G01': "ConstraintListInvalid · 'a plain object' (an own toString at the constraint address)",
  'LIVE-G02': "ConstraintListInvalid · 'a plain object' (an own @@toStringTag, data and accessor)",
  'LIVE-G03': 'AddressMalformed · the position\'s own declared descriptor (ten (d)(i) slots + (d)(iii))',
  'LIVE-G04': 'the carrier control set (plain / string / Proxy / null-prototype / admitted)',
  'LIVE-G05': "the sanctioned alias '1,1' vs 'a value over the walk ceiling'",
  'LIVE-G06': "'a value over the walk ceiling' (a cycle, deterministic across three drives)",
  'LIVE-G07': "'a value over the walk ceiling' (the conversion element, its toString counted 0)",
  'LIVE-G08': "the declared renderings ('1,1', '1,2', '[object Object]', '1,,3', a function's source, 1,998,467 B, 160,467 B)",
  'LIVE-G09': "'a value over the walk ceiling' answered within the declared 5,000 ms (three witnesses)",
  'LIVE-G10': "per-call freshness: 'a value over the walk ceiling' beside a 48,467 B rendering",
  'LIVE-G11': "'a string carrying a lone surrogate' (the VALUE, row 9)",
  'LIVE-G12': "'a string carrying a lone surrogate' (the KEY, row 10)",
  'LIVE-G13': "'a string carrying a lone surrogate' refused beside the ADMITTED pair",
  'LIVE-G14': 'byte identity across the mutated and unmutated refusals + the behavioural restore',
  'LIVE-G15': "'a Proxy' (callable, four carrier slots, every trap 0)",
  'LIVE-G16': "'a Proxy' callable ≡ non-callable + the '[object Object]' controls",
  'LIVE-G17': 'the declared member positions under mutated map/join (runs 0)',
  'LIVE-G18': 'the position spelling closed (join-runs=1) with the declared residual subject path',
};
const coverageRows = RESULTS.map((r) => ({
  cell: r.id,
  scenario: r.scenario,
  d_class: D_CLASS[r.id],
  matrix_row: r.coverage ? r.coverage.matrix_row : null,
  start: r.coverage ? r.coverage.start : null,
  end: r.coverage ? r.coverage.end : null,
  verdict: r.verdict === 'PASS' ? 'PASS' : r.verdict === 'FAIL' ? 'FAIL' : 'PARKED',
  real_input: r.coverage ? r.coverage.real_input === true : false,
  proxy_pass: false,
  surface: { target: REACH, live_surface_present: true },
  evidence: r.detail,
}));
const missingCoverage = coverageRows.filter((row) => row.matrix_row === null || row.start === null || row.end === null);
if (missingCoverage.length > 0) console.log(`COVERAGE-INCOMPLETE ${missingCoverage.map((r) => r.id).join(',')}`);
const coverage = {
  unit: 'U-STOREROOM-JSON-CROSSING',
  section: '§17',
  reach: REACH,
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
