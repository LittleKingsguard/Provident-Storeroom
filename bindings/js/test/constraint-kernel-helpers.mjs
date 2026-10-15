// SHARED FIXTURE AND ASSERTION HELPERS FOR THE `U-STOREROOM-CONSTRAINTS` RED SET.
//
// NOT A TEST FILE: `node --test bindings/js/test/*.test.mjs` does not match this name, so this
// module contributes no test and holds no assertion of its own.
//
// THE FIXTURE RULE, CITED AND NOT RE-DECLARED (`kernel-surface.md §1` item 1): every drive of this
// unit constructs its store through THE PACKAGE'S OWN `storeCreate(cfg)`, `cfg` carrying `StoreConfig`'s
// three declared keys and no fourth (`journalLength` · `listeners` · `filePath`, `filePath` alone
// optional). No drive spells an addon path, no drive reaches the store another way, and no store is
// stubbed (`A: bindings/js/index.d.ts`).
//
// THE SURFACE RULE (`fail-surface.md §1`, cited): the kernel's own failure form is a THROWN plain
// object of exactly THREE members `{ status, message, log }`; the store's own failures are the store's
// and arrive in the store's own two-member form. Both are read off `.status`, and no helper here
// converts one into the other.

import assert from 'node:assert/strict';
import { storeCreate, write, read } from 'provident-storeroom';

/**
 * THE KERNEL MODULE AND ITS FIVE ITEMS, LOADED THROUGH THE CONTRACT'S OWN ONE CHECKOUT HOME
 * (`kernel-surface.md §1` item 1): `bindings/js/src/constraint-kernel.mjs`.
 *
 * DYNAMIC ON PURPOSE, AND FOR THE RED SET'S SAKE ONLY: with a static `import` the module's absence
 * collapses a whole file into ONE failure and the red set cannot be enumerated by test name. Here
 * every test stands as its own entry and fails with the same module-not-found cause. This is the
 * red-set harness and never a fallback: no path is searched beyond the declared home, no stub is
 * substituted, and nothing under `src/` is created or edited by the red set.
 */
let loaded = null;
export async function kernel() {
  if (loaded === null) {
    loaded = await import('../src/constraint-kernel.mjs');
  }
  return loaded;
}

/** One store per drive, constructed by the package's own call and by nothing else (`§1` item 1). */
export function makeStore(opts = {}) {
  const cfg = { journalLength: 8, listeners: [] };
  if ('filePath' in opts) cfg.filePath = opts.filePath;
  if ('listeners' in opts) cfg.listeners = opts.listeners;
  if ('journalLength' in opts) cfg.journalLength = opts.journalLength;
  return storeCreate(cfg);
}

/** The five `K-1`–`K-5` names the surface is exactly made of (`kernel-surface.md §1` item 2). */
export const KERNEL_ITEMS = ['register', 'commit', 'runAttempt', 'log', 'report'];

/** The eight kernel state tokens, closed (`fail-surface.md §2`) — the SAME token set `LogEntry.state` carries. */
export const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];

/**
 * THE ONE SPELLING A MEMBER CARRIES, DECLARED ONCE AND READ BY EVERY CELL THAT READS A STATE
 * (`fail-surface.md §1.1` item 1 (a)–(d)): **the refusal's `status` carries the TOKEN — `KC-1` … `KC-8` —
 * and NOTHING ELSE, and `LogEntry.state` carries THE SAME TOKEN, the two related by IDENTITY** (§1.1
 * item 1 (c)). So `KC[3]` IS `'KC-3'`, and the map's values are the tokens themselves: the full names
 * (`ConstraintViolated` …) are LABELS — §1.1 item 1 (d) gives them exactly one declared use, the `name`
 * column of `fail-surface.md §2`'s table and a citation that prints a name BESIDE its token — and no
 * member's VALUE is ever a name.
 */
export const KC = {
  1: 'KC-1',
  2: 'KC-2',
  3: 'KC-3',
  4: 'KC-4',
  5: 'KC-5',
  6: 'KC-6',
  7: 'KC-7',
  8: 'KC-8',
};

/** The same eight states by their LABELS, for a message and never for a member's value (§1.1 (d)). */
export const KC_NAMES = {
  1: 'ConstraintAddressRefused',
  2: 'ConstraintArgRefused',
  3: 'ConstraintViolated',
  4: 'ConstraintRepairFailed',
  5: 'ConstraintRepairRepeat',
  6: 'ConstraintRepeat',
  7: 'ConstraintAttemptOpen',
  8: 'ConstraintRollbackFloor',
};

/** The store's own closed set, read as the untouched neighbour (`fail-surface.md §3`). */
export const STORE_CODES = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch',
  'WriteParentNotLink', 'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing',
  'FilePathUnreachable', 'ValueNotAdmitted', 'FileCommitFailed',
];

/** One counter shared by every drive so the ids and addresses of two drives never collide. */
let uid = 0;
export function tag(label) {
  uid += 1;
  return `${label}-${process.pid.toString(36)}-${uid}`;
}

/** `AttemptRef` IS A RECORD OF EXACTLY ONE MEMBER `{id: string}` (`parameter-semantics.md §2.15`). */
export function assertAttemptRef(ref, where) {
  assert.equal(typeof ref, 'object', `${where}: AttemptRef is a record`);
  assert.notEqual(ref, null, `${where}: AttemptRef is not null`);
  assert.deepEqual(Object.keys(ref), ['id'], `${where}: AttemptRef carries exactly the one member id`);
  assert.equal(typeof ref.id, 'string', `${where}: AttemptRef.id is a string`);
  assert.ok(ref.id.length > 0, `${where}: AttemptRef.id is non-empty`);
}

/**
 * `{status, message, log}` — EXACTLY THREE MEMBERS, A PLAIN OBJECT OF THE CALLER'S REALM, THROWN AND
 * NEVER RETURNED (`fail-surface.md §1.1` items 1–3).
 */
export function assertKernelForm(err, where) {
  assert.equal(typeof err, 'object', `${where}: the kernel's failure is a thrown object`);
  assert.notEqual(err, null, `${where}: the kernel's failure is not null`);
  assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
    `${where}: the failure form's member set is exactly {status, message, log}`);
  assert.equal(typeof err.status, 'string', `${where}: status is a string`);
  assert.equal(typeof err.message, 'string', `${where}: message is a string`);
  assert.ok(err.message.length > 0, `${where}: the kernel's message is never empty`);
  assert.ok(Array.isArray(err.log), `${where}: log is the attempt's own LogEntry[]`);
  assert.ok(err instanceof Error === false, `${where}: the form is a plain object and not an Error instance`);
  assert.equal(KC_TOKENS.includes(err.status), true,
    `${where}: status IS one of the kernel's own eight tokens, and nothing else — a drive reads `
    + `${JSON.stringify(err.status)}, a full name being a LABEL and never a value this member carries `
    + '(`fail-surface.md §1.1` item 1 (a), (d))');
  assert.equal(Object.values(KC_NAMES).includes(err.status), false,
    `${where}: and it is NEVER a full name — "${err.status}" is §2's name column, not the member's value ` +
    '(`fail-surface.md §1.1` item 1 (d): no clause may spell a member VALUE as a name)');
}

/**
 * THE STORE'S OWN FAILURE FORM — A THROWN `{status, message}` WHOSE `status` IS ONE OF THE STORE'S
 * CLOSED `15` MEMBERS VERBATIM (`fail-surface.md §1.2` item 2; `fail-surface.md §1.1`'s alternative (i)
 * prints the two-member form as the JS unit's own; `A: docs/specs/storeroom-native/contract.md §8.3`).
 * The kernel WRAPS NOTHING and RE-LABELS NOTHING on this channel, so the two members are the store's.
 */
export function assertStoreRefusal(err, where) {
  assert.equal(typeof err, 'object', `${where}: the store's refusal is a thrown object`);
  assert.notEqual(err, null, `${where}: the store's refusal is not null`);
  assert.equal(typeof err.status, 'string', `${where}: the store's refusal carries its own status`);
  assert.equal(typeof err.message, 'string', `${where}: the store's refusal carries its own message`);
  assert.equal(STORE_CODES.includes(err.status), true,
    `${where}: the status is one of the store's closed 15 members (read ${err.status})`);
  assert.equal(KC_TOKENS.includes(err.status), false,
    `${where}: and it is NEVER one of the kernel's own eight — the kernel converts no channel into the other's form`);
  assert.equal(err instanceof Error, false,
    `${where}: the store's form is a plain object and no Error subclass`);
  return err;
}

/** Capture a throw without swallowing the distinction between "threw" and "returned". */
export function capture(fn) {
  try {
    const value = fn();
    return { threw: false, value };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/** `LogEntry` IS EXACTLY SIX MEMBERS (`kernel-surface.md §2.5` item 1). */
export function assertLogEntry(entry, where) {
  assert.equal(typeof entry, 'object', `${where}: a log entry is a record`);
  assert.notEqual(entry, null, `${where}: a log entry is not null`);
  assert.deepEqual(Object.keys(entry).sort(), ['id', 'kind', 'message', 'opId', 'seq', 'state'],
    `${where}: LogEntry's member set is exactly the six declared`);
  assert.equal(typeof entry.seq, 'number', `${where}: LogEntry.seq is a number`);
  assert.equal(typeof entry.kind, 'string', `${where}: LogEntry.kind is a string`);
  assert.ok(['constraint-check', 'repair-run', 'commit', 'outcome'].includes(entry.kind),
    `${where}: LogEntry.kind is one of the four declared kinds (read ${entry.kind})`);
  assert.ok(entry.id === null || typeof entry.id === 'string',
    `${where}: LogEntry.id is the constraint's bare id or null`);
  assert.equal(typeof entry.message, 'string', `${where}: LogEntry.message is a string`);
  assert.ok(entry.opId === null || typeof entry.opId === 'string',
    `${where}: LogEntry.opId is an op id or null`);
  assert.ok(entry.state === null || typeof entry.state === 'string',
    `${where}: LogEntry.state is a state token or null`);
  // ── THE KIND/STATE RULE, RELAXED TO EXACTLY THE RULE THE CLAUSES NAME (`P-NEG-10`) ──────────────
  //
  // THE RULE, AT ITS OWN BYTES: `fail-surface.md §1.1` item 1 (b) — "`LogEntry.state` CARRIES THE SAME
  // TOKEN, FROM THE SAME CLOSED SET, AND `null` ON THE THREE NON-`outcome` KINDS" — READ WITH the two
  // clauses that declare the ONE exception to its other half, both cited here and neither re-derived:
  //   · `composition-and-states.md §2.7` item 13 — "the CONSTRAINT-body path's `outcome` entry carries
  //     `state` `null`, and the REPAIR-body path's carries `KC-4`'s own token";
  //   · `fail-surface.md §1.1` item 5 and `§2`'s `KC-4` row — a throwing body mints NO `KC` token for the
  //     caller's channel, while on the repair-body path the `outcome` entry's `state` "IS THE ONLY
  //     DECLARED CARRIER OF `KC-4`".
  // SO THE BICONDITIONAL THIS HELPER ONCE ASSERTED — "`kind === 'outcome'` ⟺ `state` is a `KC` token" — IS
  // FALSE AT ITS SECOND HALF on the constraint-body path, where a closed record's `outcome` entry
  // legitimately carries `null`; `assertAttemptReport`/`assertLogEntry` must let that declared record
  // through UNCHANGED, or the path's own declared state is unreachable to every cell that reads it.
  //
  // THE STRICT HALF IS KEPT EXACTLY: on the THREE NON-`outcome` KINDS the member is `null` and nothing
  // else, unconditionally, as both clauses print it. THE `outcome` HALF IS NOW: a `KC` token from the
  // closed eight, OR `null` on the one body path §2.7 item 13 names. `§1.1` item 1 (d)'s ban on a full
  // name standing as a member's value is asserted for both halves, and is NOT relaxed.
  if (entry.kind !== 'outcome') {
    assert.equal(entry.state, null,
      `${where}: a non-\`outcome\` entry's state is \`null\` — read ${JSON.stringify(entry.state)}; `
      + '`fail-surface.md §1.1` item 1 (b)');
  } else {
    assert.equal(entry.state === null || KC_TOKENS.includes(entry.state), true,
      `${where}: an \`outcome\` entry's state is one of the kernel's own eight TOKENS — read `
      + `${JSON.stringify(entry.state)}; \`fail-surface.md §1.1\` item 1 (b)–(c), the two members reading `
      + 'the SAME token STRING — or `null` on the CONSTRAINT-body path, which '
      + '`composition-and-states.md §2.7` item 13 and `fail-surface.md §1.1` item 5 declare');
  }
  assert.equal(Object.values(KC_NAMES).includes(entry.state), false,
    `${where}: and a full name is NEVER the state a member carries — §2's name column is a LABEL `
    + '(`fail-surface.md §1.1` item 1 (d))');
}

/** The `seq` member is the kernel's own append ordinal, strictly increasing from `1`. */
export function assertSeqIncreasesFromOne(log, where) {
  for (let i = 0; i < log.length; i += 1) {
    assert.equal(log[i].seq, i + 1, `${where}: seq is the append ordinal, strictly increasing from 1 (index ${i})`);
  }
}

export function entries(log, kind) {
  return log.filter((e) => e.kind === kind);
}

/**
 * Every `repair-run` entry whose `id` is the pair's own BARE id (`attempt-lifecycle.md §2.4` item 2:
 * "`LogEntry.id` holds the bare `id` (`'x'`), never the pair token"). One pair's own repair count is
 * read through this and never through the log's total, so a drive can tell ONE pair's repeat from
 * another's.
 */
export function repairRunsFor(log, id) {
  return entries(log, 'repair-run').filter((e) => e.id === id);
}

/** The `RollbackStep` RECORD — SIX members (`parameter-semantics.md §2.17`). */
export function assertRollbackStep(step, where) {
  assert.equal(typeof step, 'object', `${where}: a RollbackStep is a record`);
  assert.notEqual(step, null, `${where}: a RollbackStep is not null`);
  assert.deepEqual(Object.keys(step).sort(), ['answer', 'checkpoint', 'failed', 'opId', 'restoredTo', 'undoneOps'],
    `${where}: RollbackStep's member set is exactly the six declared`);
  assert.equal(typeof step.opId, 'string', `${where}: RollbackStep.opId is the op the call concerned`);
  assert.ok(Array.isArray(step.undoneOps), `${where}: RollbackStep.undoneOps is the store's own report`);
  assert.equal(typeof step.failed, 'boolean', `${where}: RollbackStep.failed is a boolean`);
  assert.ok(step.checkpoint === null || typeof step.checkpoint === 'string',
    `${where}: RollbackStep.checkpoint is an opId or null — the op whose landing left the last valid state`);
}

/** `AttemptReport` — FIVE members, the ONE shape `K-3` and `K-5` return (`parameter-semantics.md §2.13`). */
export function assertAttemptReport(report, where) {
  assert.equal(typeof report, 'object', `${where}: an AttemptReport is a record`);
  assert.notEqual(report, null, `${where}: an AttemptReport is not null`);
  assert.deepEqual(Object.keys(report).sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback'],
    `${where}: AttemptReport's member set is exactly the five declared`);
  assertAttemptRef(report.attempt, `${where}.attempt`);
  assert.equal(typeof report.outcome, 'string', `${where}: AttemptReport.outcome is a string`);
  assert.ok(Array.isArray(report.ops), `${where}: AttemptReport.ops is a list of the ops the attempt created`);
  assert.ok(Array.isArray(report.log), `${where}: AttemptReport.log is the attempt's own list`);
  assert.ok(Array.isArray(report.rollback), `${where}: AttemptReport.rollback is a list of RollbackStep`);
  for (const e of report.log) assertLogEntry(e, `${where}.log`);
  for (const s of report.rollback) assertRollbackStep(s, `${where}.rollback`);
  assert.equal('appliedRepairs' in report, false,
    `${where}: NO closed record carries appliedRepairs — the retained read-only history reading is withdrawn by name`);
}

/**
 * A PLAIN STORE LISTENER THAT COUNTS ITS OWN INVOCATIONS — a caller body reached through a store verb
 * call the kernel is running (`attempt-lifecycle.md §2.4` item 8 (ii) (e)).
 */
export function countingListener() {
  const seen = [];
  const fn = (address) => {
    seen.push({ address: Array.isArray(address) ? address.slice() : address });
  };
  fn.seen = seen;
  return fn;
}

/** Every constraint-check entry's `id`, in the log's own order — the only order a drive may compare. */
export function checkIds(log) {
  return entries(log, 'constraint-check').map((e) => e.id);
}

/** The store's own read, used only where a scenario's observation names it. */
export function readBack(store, address) {
  return read(store, address);
}

export { write, read, storeCreate };
