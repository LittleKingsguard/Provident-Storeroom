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
import { storeCreate } from '../../../bindings/js/index.mjs';

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
    loaded = await import('../../../bindings/js/src/constraint-kernel.mjs');
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
export const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8', 'KC-9'];

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

/** The store's own closed set, read as the untouched neighbour (`fail-surface.md §3`).
 *
 * **⟶ WIDENED 2026-10-15 (`DEF-2026-10-15-Y`): `contract.md §8.1`'s amended heading reads `16` members
 * (`11 + 2 + 1 + 1 + 1 = 16` ✓) and the as-filed `15` here was the superseded figure.** *"The untouched
 * neighbour"* is exactly what the widening preserves: **this list is READ and never minted, and it now
 * carries the sixteenth member the spec's own heading carries** (`§7.1` step 4-bis;
 * `parameter-semantics.md §2.21`, both dated 2026-10-15). `assertStoreRefusal` below reads its figure off
 * this list, so the two cannot drift. */
export const STORE_CODES = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch',
  'WriteParentNotLink', 'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing',
  'FilePathUnreachable', 'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
  // ⟶ APPENDED 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set for both
  // S/N"*): the set's ranks `18` and `19`, so this list stays a census of the CLOSED SET — `ConstraintBodyThrew`
  // (a constraint BODY's throw, converted at the crossing from a value the kernel marked) and
  // `ConstraintRefusedAtRegistration` (the REGISTRATION VERDICT) — and no rank of `1`…`17` moves.
  'ConstraintBodyThrew',
  'ConstraintRefusedAtRegistration',
  // ⟶ APPENDED 2026-10-26 (`DEF-H`/`DEF-W`; the architect, verbatim: *"Expand the returned fail-state list to
  // include the refusal"* and *"Assert the constraints on rollback"*): the set's rank `20`,
  // `ConstraintPassRefused` — THE ONE MEMBER A CONSTRAINT REFUSAL ANSWERS WITH, at the write's attempt and at
  // a reversal whose terminal state a registered constraint refuses — and NO RANK OF `1`…`19` MOVES.
  'ConstraintPassRefused',
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
 * THE STORE'S OWN FAILURE CHANNEL — A THROWN `{status, message, log}` WHOSE `status` IS ONE OF THE
 * STORE'S CLOSED MEMBERS VERBATIM (`fail-surface.md §1.2` item 2; `A: docs/specs/storeroom-native/
 * contract.md §8.3`). The kernel WRAPS NOTHING and RE-LABELS NOTHING on this channel, so the `status` and
 * the `message` are the store's own.
 *
 * **⟶ RE-SPELLED 2026-10-16: THE AS-FILED CLAUSE CALLED THIS A `{status, message}` FORM AND SAID *"the two
 * members are the store's"*.** Since `surface.md §2.5` item 4 the crossing form is THREE members and
 * `log` is the attempt's own message log, not a store value — *"the store supplies no part of this member
 * and holds no log"* (`parameter-semantics.md §2.26`'s `supplier` cell) — so the two-member phrasing would
 * name a provenance the law denies. **THE ASSERTIONS THIS HELPER MAKES ARE UNMOVED AND IT ASSERTS NO
 * MEMBER SET**: it gates the CHANNEL (the status is the store's, never a `KC` token; the shape is a plain
 * object), and the member-set census is made at each cell that reads a caught value, against the `3` the
 * descriptor clause declares (`surface.md §2.5` item 9).
 */
export function assertStoreRefusal(err, where) {
  assert.equal(typeof err, 'object', `${where}: the store's refusal is a thrown object`);
  assert.notEqual(err, null, `${where}: the store's refusal is not null`);
  assert.equal(typeof err.status, 'string', `${where}: the store's refusal carries its own status`);
  assert.equal(typeof err.message, 'string', `${where}: the store's refusal carries its own message`);
  assert.equal(STORE_CODES.includes(err.status), true,
    `${where}: the status is one of the store's closed ${STORE_CODES.length} members (read ${err.status})`);
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
  // closed nine (8 → 9 by `D-53`, 2026-10-28), OR `null` on the one body path §2.7 item 13 names. `§1.1` item 1 (d)'s ban on a full
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

/**
 * THE NO-OP LISTENER BODY, AND ITS ONE DECLARED USE.
 *
 * **⟶ ADDED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.12` item 5):** the combined
 * `on(address, listener)` is MERGED AWAY, so a drive whose subject is the HOME ENTRY — its minting, its
 * address-level idempotence, or the registration a kernel pass reads through — must now take the two acts
 * the product declares: `listen(address)` mints the entry and answers its handle, and `register(handle,
 * listener)` places a function at it. A drive that takes both acts but whose subject is NOT the listener
 * body's own firing passes this body at the `listener` position; a drive whose subject IS that firing
 * passes its own counting body instead. This module owns the no-op so no drive re-declares one.
 */
export const noop = () => {};

/** Every constraint-check entry's `id`, in the log's own order — the only order a drive may compare. */
export function checkIds(log) {
  return entries(log, 'constraint-check').map((e) => e.id);
}

/** The store's own read, used only where a scenario's observation names it.
 *
 * **⟶ RESHAPED 2026-10-16 (`surface.md §2.9` item 1's `A127` clause and `§2.4` item 9 (f)'s `A127`
 * clause): the module's named-export count is `11 → 1` ✓ — `storeCreate` ALONE — and the ten
 * store-reaching names are METHODS of the object that call returned, so the LEADING `instance` POSITION IS
 * DROPPED (`8 → 1` ✓) and this observer is spelled on its RECEIVER.** `write`/`read` are not named exports
 * of the package any more: this module neither re-exports them nor reaches a store through them.
 */
export function readBack(instance, address) {
  return instance.read(address);
}

/**
 * **THE REGISTRATION-INSTANT SHIELD, ADDED 2026-10-17 FOR THE `A135` RE-DERIVATION.**
 *
 * **THE FALSIFIED PREMISE, NAMED:** the corpus was authored against *"registering a constraint does not run
 * its body"*. THE ARCHITECT'S RULING `A135` (3) FALSIFIES IT — *"run constraints against the store when
 * they are added, otherwise they can result in the rollback state not being valid"* — and
 * `docs/specs/storeroom-native/contract.md §7.3` (b) declares the three registration states: **state 1** the
 * current state passes → the registration stands; **state 2** it violates and no repair is registered → the
 * registration is REFUSED with `ConstraintListInvalid` (`§8.1` #16); **state `3-bis`** it violates and a
 * repair is registered → the repair is attempted.
 *
 * **THE CONTEXT THE BODY MEETS AT THAT INSTANT IS DECLARED** (`kernel-surface.md §2.3` item 1's clause of
 * 2026-10-17): the same five members, with `tier` ABSENT spelled `null`, `op` ABSENT spelled `null`, and
 * `value` THE STORE'S CURRENT VALUE, read not landed (`undefined` where the address holds nothing).
 *
 * **SO A BODY THAT VIOLATES EVERY CONTEXT VIOLATES AT ITS REGISTRATION TOO, AND THE PAIR IS NEVER
 * CARRIED** — which is why 130 cells of this corpus read `ConstraintListInvalid` where they expected their
 * own subject. **THIS HELPER IS THE ROUTE THE LAW ITSELF NAMES: *"register it against a state it accepts,
 * THEN write the violating value."*** It answers `true` on the registration instant — recognised by the two
 * members that clause spells `null` and that a LANDING's context never carries together — and hands every
 * OTHER context to the cell's own body untouched, so:
 *   · **the cell's SUBJECT IS UNMOVED** — the body still refuses every landed value, and every count, log,
 *     token and repair the cell asserts is produced by the same body as before;
 *   · **the premise moves and nothing else** — the pair is carried (state 1), and the violation the cell
 *     drives is reached by the WRITE, which is where the cell always meant it to happen.
 *
 * **A CELL WHOSE SUBJECT *IS* THE NON-RUN AT REGISTRATION USES `registrationRuns` BELOW INSTEAD, and a cell
 * whose subject is the registration's own refusal uses NO shield at all.**
 */
export function passAtRegistration(constraint) {
  const wrapper = (context) => {
    if (context !== null && typeof context === 'object'
      && context.tier === null && context.op === null) {
      return true; // STATE 1 — the registration stands and the pair is carried (`§7.3` (b) state 1)
    }
    return constraint(context);
  };
  // THE CELL'S OWN OBSERVABLES ARE CARRIED ONTO THE SHIELD, so no cell must reach through it by name.
  for (const key of Object.keys(constraint)) wrapper[key] = constraint[key];
  return wrapper;
}

/**
 * **THE CALL COUNTER A CELL READS WHEN ITS SUBJECT IS THE BODY'S *RUN* — AND THE ONE IT NOW READS ONCE MORE
 * THAN BEFORE.** `A135` (3) runs the body ONCE at its registration, so a cell asserting *"the body ran `1`
 * time"* off a write alone now reads `2`. **THE CELL'S SUBJECT IS KEPT AND ITS PREMISE IS MOVED: the count is
 * split into the registration's own run and every run after it**, and a cell asserts whichever of the two its
 * clause speaks of.
 */
export function registrationRuns(constraint) {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return constraint(context);
  };
  wrapper.calls = [];
  wrapper.atRegistration = () => wrapper.calls.filter((c) => (
    c !== null && typeof c === 'object' && c.tier === null && c.op === null
  ));
  wrapper.afterRegistration = () => wrapper.calls.filter((c) => !(
    c !== null && typeof c === 'object' && c.tier === null && c.op === null
  ));
  return wrapper;
}

/**
 * **A RECORDER THAT THE REGISTRATION INSTANT DOES NOT REACH** — for a cell whose subject is the SEQUENCE of
 * invocations the WRITES produced (`contract.md §5.1`'s order clauses, `§5.5`'s window) and whose own list
 * would otherwise open with one entry per registration (`A135` (3); `§7.3` (b) state 1).
 *
 * **THE REGISTRATION'S OWN RUN IS NOT HIDDEN, IT IS EXCLUDED BY THE ONE MARK THE CLAUSE ITSELF GIVES IT:**
 * `kernel-surface.md §2.3` item 1's registration clause spells that instant's `tier` and `op` `null`, and no
 * LANDING's context carries both. The body is handed every other context untouched, so the cell's subject —
 * which function ran, in which order, for which write — is exactly as filed.
 */
export function recordsAfterRegistration(record) {
  const wrapper = (context) => {
    if (context !== null && typeof context === 'object'
      && context.tier === null && context.op === null) {
      return true; // STATE 1 (`§7.3` (b)): the registration stands and this invocation is not a write's
    }
    return record(context);
  };
  return wrapper;
}

/**
 * **THE SAME SHIELD, UNDER THE NAME THE `deltamodel` FIXTURES USE IT BY** — a body whose own run counter,
 * call list or guard belongs to the WRITE's window (`surface.md §2.4` item 9's instant (a); `A116` (D1)) and
 * must not carry the registration's own invocation (`A135` (3); `contract.md §7.3` (b) state 1).
 *
 * **IT IS AN ALIAS OF `recordsAfterRegistration` AND NOT A SECOND RULE**, declared here so a fixture reads
 * the name its own comment uses and so the two cannot drift.
 */
export const atLandingOnly = recordsAfterRegistration;

/**
 * **⟶ THE LISTENER SPELLING AND THE PAIR'S OWN READERS, ADDED 2026-10-18 (`role_test_writer`, the
 * `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail). `listen(address)` MOVES TO `listen(handle, addresses)`,
 * ARITY `1 → 2`, AND IT ANSWERS `undefined`.**
 *
 * `contract.md §2.2` items 1 and 10; `listen-verb.md §1` item 1 and `§2.2` item 1; `PAR-HL-3`: *"the caller
 * supplied the handle, so returning it would be a second spelling of the caller's own datum"*. **THE AS-FILED
 * IDIOM** `(store.register(store.listen(addr), fn) || store.listen(addr))` **DEPENDED ON THAT RETURN** — it
 * took the handle `listen` answered, registered at it, and fell back to a second `listen` when the first
 * answered a falsy value. **UNDER THE NEW DECLARATION BOTH HALVES VANISH: the handle is SPELLED by the caller
 * and every `listen` answers the unit, so the idiom is replaced by the two acts it always meant — a `listen`
 * that creates the RESERVED entry (`listen-verb.md §4` state `1`), then a `register` that ARMS it — and the
 * handle is the spelling below.**
 *
 * **NO ASSERTION IS WEAKENED:** every cell that used the idiom still reads the same `listenerHandle`, the same
 * call list and the same store-side entry. The spelling is unique per store and per call, so a cell driving
 * two listeners at one address still gets two distinguishable handles (`DD-39`'s distinct-handles rule).
 */
export function listenAndRegister(store, address, listener) {
  listenAndRegister.count += 1;
  const handle = `listener@${JSON.stringify(address)}#${listenAndRegister.count}`;
  // **THE SET POSITION IS `[address]` — ONE MEMBER, the address the as-filed call named**
  // (`listen-verb.md §2.2` item 1: *"`addresses` is an ARRAY whose every member is an address in the store's
  // own domain, … the empty array included"*).
  store.listen(handle, [address]);
  store.register(handle, listener);
  return handle;
}
listenAndRegister.count = 0;

/**
 * **THE PAIR'S OWN READER, RE-DERIVED 2026-10-18 WITH IT.** `triggered` and `pending`'s element moved from a
 * BARE HANDLE to the pair `{handle, address}` (`trigger-and-pair.md §2` item 1 and `§3` item 3; `§1` item 1),
 * so every as-filed `triggered.includes(handle)` compared a pair to a string and was ALWAYS FALSE —
 * **`TF-1`'s exact failure, *"a BARE HANDLE in `triggered` or in `pending`"*, read from the other side.**
 * **THE REPLACEMENT READS THE PAIR'S `handle` MEMBER, which is the SAME identity the as-filed line meant**
 * (`§5` item 1: *"Dedupe on handle — rule 3 stands"*; `§4` item 1: *"both filters become PAIR-AWARE — they
 * compare `entry.handle`, never `entry`"*).
 */
export function carriesHandle(set, handle) {
  return set.some((element) => element !== null && typeof element === 'object' && element.handle === handle);
}

/** The `handle` members of a returned set, in ITS OWN order — read as a SET by every citing cell (`DD-22`). */
export function setHandles(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? element : element.handle));
}

/** The `address` members of a returned set, in ITS OWN order — `trigger-and-pair.md §1.2`. */
export function setAddresses(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? undefined : element.address));
}
