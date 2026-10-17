// RED SET — `U-STOREROOM-CONSTRAINTS`, THE REPAIR-OP SEAM (`A: docs/decisions.md` · `A110`) AND THE
// MALFORMED-RETURN ARM OF ITS ONE HOME `parameter-semantics.md §2.7`'s `PAR-C-7` ROW.
//
// DERIVED FROM THE CONTRACT ALONE: `parameter-semantics.md §2.7` (`PAR-C-7` — the seam's ONE home) and
// `§2.8` (`PAR-C-8`), `kernel-surface.md §1` item 1's fixture clause, `§1` item 2, `§2.3` item 2's shape
// line, add-rule bullet, repair-op-seam bullet and no-second-route bullet, `attempt-lifecycle.md §2.4`
// items 3 and 4's arms `(b)` and `(d)`, `fail-surface.md §2`'s `KC-4` row, and the drives
// `e2e-scenarios.md` / `e2e-scenarios-b.md`.
//
// ── THE REPAIR'S RETURN, ITS STATES ENUMERATED BEFORE THE TESTS (`PAR-C-8`) ────────────────────────
//
// THE DECLARED SHAPE IS `{ok, message, op}` AND ITS ONE HOME IS `§2.7`'s ROW: `op` IS THE OP THE REPAIR'S
// OWN EDIT LANDED — THE STORE'S OWN OP VALUE AS THE STORE'S OWN `write` ANSWERED IT — REQUIRED IFF
// `ok === true` AND ABSENT (NEVER `null`) WHERE `ok === false`. THE KERNEL READS THAT OP OFF THIS RETURN
// AND NOWHERE ELSE: the op it APPENDS to the attempt's `ops` IS `returnValue.op`, so the seam has exactly
// ONE carrier. The route `A110` DELETES — a module interception, a monkey-patch, an addon load path, a
// second dependency — is DELETED and not widened.
//
// THE DATA STATES THIS FILE DRIVES, ONE CELL PER STATE:
//   (1) `{ok: true, message, op}` with `op` = THE OP THE REPAIR'S OWN `write` CALL ANSWERED — the
//       declared success arm; that op is ADDED to `ops` once, the pair enters `ran` and `appliedRepairs`,
//       and the re-run evaluates the pairs at that op.                                  ── `§1`
//   (2) `{ok: true, message}` WITH NO `op` MEMBER, the repair's edit LANDED — the app's own defect:
//       NO op credited, arm `(d)`, `KC-4`, the `repair-run` entry appended.              ── `§2`
//   (3) `{ok: true, message, op: undefined}` — the same defect, its own printed form.   ── `§2`
//   (4) `{ok: true, message, op}` whose `op` IS NOT THE OP THE REPAIR ACTUALLY LANDED (driven here by
//       the attempt's own first-write op, which THIS repair did not land and which the kernel already
//       holds in `attempt.ops`) — the same defect, its third printed form.              ── `§2`
//   (5) THE SEAM'S OWN CONSEQUENCE, `A110`'s: THE MODULE HOLDS NO SECOND LOAD PATH. The kernel reaches
//       the store ONLY through the caller's own instance — every op it credits is one the caller's own
//       instance's verb calls answered, and no addon module stands behind the module's own import
//       footprint.                                                                ── `§3`
//   THE STATES THIS FILE DOES NOT DRIVE, NAMED SO THE SET IS CLOSED: a `{ok: false, message}` failure arm
//   (its `op` ABSENT BY DECLARATION — driven by `constraint-kernel-states.test.mjs`), a repair body that
//   THREW at its own verb call and reached NO return (the same file; `e2e-scenarios-b.md`'s `E2E-C-13`
//   and `E2E-C-16`'s `rB`), and the six OUTSIDE values of `§2.8`'s `the values OUTSIDE it` cell (the same
//   file's `ck_states_arm_d_every_value_outside_the_two_repair_arms_is_read_as_the_failure_arm`).
//
// FAIL STATES: an `ok === true` return whose `op` is absent, `undefined`, or not the op the repair
// landed, credited an op and passing the attempt; a `repair-run` entry omitted on that arm; an attempt
// that reached no rollback or left its registry entry standing; a credited op the caller's own
// instance's verbs never answered; an addon loaded on the kernel's own account.

import test from 'node:test';
import assert from 'node:assert/strict';

import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC, assertKernelForm, assertRollbackStep, assertAttemptReport,
  capture, entries,
} from './constraint-kernel-helpers.mjs';

/** The kernel module's ONE checkout home (`kernel-surface.md §1` item 1) and this directory. */
const HERE = dirname(fileURLToPath(import.meta.url));
const KERNEL_HOME = join(HERE, '..', 'src', 'constraint-kernel.mjs');

/** The five `K-1`–`K-5` names the module's export set is exactly made of (`kernel-surface.md §1` item 2). */
const FIVE_ITEMS = ['commit', 'log', 'register', 'report', 'runAttempt'];

/** Every `repair-run` entry whose `id` is the pair's own BARE id (`attempt-lifecycle.md §2.4` item 2). */
function repairRunsFor(log, id) {
  return entries(log, 'repair-run').filter((e) => e.id === id);
}

/**
 * ARM `(d)`'S OWN CONSEQUENCE SET, ASSERTED ONCE AND READ BY EVERY MALFORMED-RETURN CELL
 * (`attempt-lifecycle.md §2.4` item 4's row `(d)`, verbatim: *"appends a `repair-run` entry carrying what
 * was ATTEMPTED **AND the `outcome` entry carrying THIS ARM'S `KC-4`** …; composes the per-op rollback;
 * removes the registry entry; THROWS with the log"* — `FAILING` → `CLOSED`).
 *
 * THE ARM IS READ OFF THREE MEMBERS AND NEVER OFF ONE: the thrown form's `status`, the attempt's ONE
 * `outcome` entry's `state`, and the `repair-run` entry's own presence (`VA-09`: *"declared here so a
 * drive reads `(d)`'s state off the log and not only off the thrown form"*).
 *
 * THE ROLLBACK IS THE ARM'S OWN DECLARED CONSEQUENCE AND IS READ ON THE STORE: the attempt's address is
 * a FRESH one, so the last valid state is the state before the attempt's first write — NO NODE — and the
 * address's own read answers the store's `AddressNotFound` after the composition has run.
 */
function assertArmD(drive, why) {
  const { run, store, address, commitRecord, id, closed, commit } = drive;
  assert.equal(run.threw, true,
    `${why}: the attempt fails — an \`ok === true\` return whose \`op\` is absent, \`undefined\` or not the `
    + 'op the repair actually landed is the APP\'S OWN DEFECT and never a kernel state of its own '
    + '(`parameter-semantics.md §2.7`; `A: docs/decisions.md` · `A110`)');
  const thrown = run.thrown;
  assertKernelForm(thrown, `${why}: the thrown form`);
  assert.equal(thrown.status, KC[4],
    `${why}: the state token is \`KC-4\` (\`ConstraintRepairFailed\`) — the SAME arm a repair returning `
    + `\`{ok: false, message}\` reaches (read ${JSON.stringify(thrown.status)})`);
  const outcomes = entries(thrown.log, 'outcome');
  assert.equal(outcomes.length, 1,
    `${why}: the attempt has ONE outcome entry and the closure writes it once`);
  assert.equal(outcomes[0].state, KC[4],
    `${why}: and THAT ONE entry carries this arm's own \`KC-4\` — the token the thrown form's status `
    + 'carries, by identity (`fail-surface.md §1.1` item 1 (c))');
  const runs = repairRunsFor(thrown.log, id);
  assert.equal(runs.length, 1,
    `${why}: \`repair-run\` IS APPENDED on this arm — the repair DID run, so the entry carrying what was `
    + 'attempted stands, exactly once for that pair\'s bare id');
  assert.ok(runs[0].message.length > 0,
    `${why}: and it carries the kernel's own generated sentence, never an empty string`);
  assert.equal(entries(thrown.log, 'constraint-check').filter((e) => e.id === id).length, 1,
    `${why}: the pair's own first evaluation appended its entry and NO re-run followed — the arm is `
    + 'terminal (`(d)`: `FAILING` → `CLOSED`)');
  assertAttemptReport(closed, `${why}: the closed record`);
  assert.equal(closed.ops.length, 1,
    `${why}: THE KERNEL CREDITS NO OP — \`attempt.ops\` carries the attempt's own first write and nothing `
    + 'the malformed return named (`§2.7`: *"the kernel credits NO op"*)');
  assert.equal(closed.ops[0].opId, commitRecord.op.opId,
    `${why}: and that one op is the op the caller's own \`K-2\` call answered with, unchanged`);
  assert.ok(closed.rollback.length >= 1,
    `${why}: arm \`(d)\` composes the per-op rollback over the attempt's own ops`);
  for (const step of closed.rollback) assertRollbackStep(step, `${why}: RollbackStep`);
  const restored = capture(() => store.read(address));
  assert.equal(restored.threw, true,
    `${why}: THE ROLLBACK RESTORES THE LAST VALID STATE — the attempt's address stands at NO node, which `
    + 'is the state it stood at before the attempt\'s first write (`A: docs/decisions.md` · `A102`)');
  assert.equal(restored.thrown.status, 'AddressNotFound',
    `${why}: and the store answers its own \`AddressNotFound\` there — the restoration is read on the `
    + 'store and never off a member of the kernel\'s own record');
  const fresh = capture(() => commit(store, address, 'mem', 'after'));
  assert.equal(fresh.threw, false,
    `${why}: arm \`(d)\` REMOVES THE REGISTRY ENTRY — a fresh \`K-2\` at that address answers its own `
    + '`CommitRecord` and mints no `KC-7`');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §1  THE DECLARED SUCCESS ARM — `op` IS THE OP THE REPAIR'S OWN VERB CALL ANSWERED
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_repairop_arm_b_the_declared_success_arm_carries_the_op_the_callers_own_verb_answered', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('rop1')];
  let landed = null; // THE OP THE REPAIR'S OWN EDIT LANDED, read off the caller's own `write` return
  let returned = null; // the repair's own return, read whole
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          // THE SEAM, DRIVEN FROM THE CALLER'S SIDE AND READ OFF THE CALL THE REPAIR ITSELF MADE
          // (`parameter-semantics.md §2.7`): the repair calls the store's own `write` IN ITS OWN BODY,
          // that call's return carries the store's own op value, and the repair SPELLS THAT VALUE onto
          // its own return's `op` member. Nothing is fabricated here: `landed` IS what the verb answered.
          landed = store.write(address, 'mem', 'fixed').op;
          returned = { ok: true, message: 'x was repaired at the attempt\'s own address', op: landed };
          return returned;
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'broken');
  const attempt = runAttempt(store, commitRecord);
  assertAttemptReport(attempt, 'arm (b): the successful repair');
  assert.equal(attempt.outcome, 'passed',
    'the pair passes at the op the repair landed, so the attempt resolves — arm (b) → `EVALUATING` → (g)');
  // THE SHAPE'S OWN THREE MEMBERS, READ OFF THE RETURN THE REPAIR MADE
  assert.deepEqual(Object.keys(returned).sort(), ['message', 'ok', 'op'],
    'the declared return shape is `{ok, message, op}` — three members on the success arm (`§2.7`)');
  assert.equal(returned.op, landed,
    'on the success arm `op` IS the op the repair\'s own edit landed: THE STORE\'S OWN `write` RETURN\'S '
    + 'VALUE, the value the verb answered with (`§2.7`\'s `the subject` and `unit` cells)');
  assert.equal(landed !== null && typeof landed === 'object' && typeof landed.opId === 'string', true,
    'and that value IS an op — the store\'s own `JournalOp`, carrying an `opId`');
  // THE KERNEL'S OWN CARRIAGE: the op it ADDS IS `returnValue.op`, and it is added ONCE
  assert.equal(attempt.ops.length, 2,
    'the attempt\'s `ops` carries the first write\'s op and the one op the repair landed — TWO and no third');
  assert.equal(attempt.ops[1].opId, returned.op.opId,
    'THE OP THE KERNEL APPENDS IS `returnValue.op` — read off the repair\'s own return and nowhere else '
    + '(`§2.7`\'s `observable` cell, the seam\'s ONE home)');
  assert.equal(attempt.ops[1].opId, landed.opId,
    'and that op is the one the caller\'s own verb call answered — the seam has exactly ONE carrier');
  assert.equal(attempt.ops[1].kind, landed.kind,
    'the op is the store\'s own record, read verbatim: its `kind` is unchanged');
  assert.deepEqual(attempt.ops[1].address, landed.address,
    'and its `address` is the address the repair wrote at, unchanged');
  assert.equal(attempt.ops.filter((o) => o.opId === landed.opId).length, 1,
    'the op is credited EXACTLY ONCE — no second route contributes a second copy of it');
  const runs = repairRunsFor(attempt.log, 'x');
  assert.equal(runs.length, 1, 'the pair\'s repair ran once');
  assert.equal(runs[0].opId, landed.opId,
    'and its `repair-run` entry names the op the repair landed (`attempt-lifecycle.md §2.4` item 4 (b))');
  // THE STORE ITSELF STANDS WHERE THE CALLER'S OWN VERB PUT IT
  assert.equal(store.read(address), 'fixed',
    'the caller\'s own write verb landed the value, and the attempt resolved on it');
  assert.equal(report(store, commitRecord.attempt).ops.length, 2,
    'and the closed record `K-5` answers carries the same two ops');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §2  THE MALFORMED-RETURN ARM — AN `ok === true` RETURN THAT CARRIED NO OP (`§2.7`'s own arm `(d)`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_repairop_arm_d_an_ok_true_return_with_no_op_member_is_KC4_and_its_repair_run_entry_is_appended', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('rop2')];
  let landed = null;
  let returned = null;
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          landed = store.write(address, 'mem', 'fixed').op; // THE EDIT **IS** LANDED
          returned = { ok: true, message: 'x was repaired' }; // …AND NO `op` MEMBER IS CARRIED
          return returned;
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'broken');
  const run = capture(() => runAttempt(store, commitRecord));
  assert.equal('op' in returned, false,
    'the state this cell drives, at its own bytes: an `ok === true` return WITH NO `op` MEMBER — the '
    + 'first of the three forms `§2.7` names — and the repair\'s edit above IS landed');
  assert.equal(landed !== null, true,
    'the repair really did land an edit, through the caller\'s own store verb');
  assertArmD({ run, store, address, commitRecord, id: 'x', closed: report(store, commitRecord.attempt), commit },
    'no `op` member');
  // AND THE ENTRY'S OWN `opId` IS READ AS THE ROW DECLARES IT AND NOT AS A NULL THAT NO VALUE CAN
  // EQUAL (`DR-11`: the assertion that stood here — `entries(...)[0].opId === landed.opId` compared
  // against `false` — is trivially true where the entry's `opId` is `null`, which is exactly the state
  // it tolerated). `kernel-surface.md §2.5` item 1's kind table fixes the member for this kind: "the op
  // the repair produced where it produced one, ELSE THE OP IT WAS INVOKED FOR" — and this repair
  // produced none, so the entry names the op the pair's evaluation carried: THE ATTEMPT'S OWN FIRST
  // WRITE'S OP (`attempt-lifecycle.md §2.4` item 4's arm `(d)`; `§2.5` item 1's `repair-run` row).
  assert.equal(entries(run.thrown.log, 'repair-run')[0].opId, commitRecord.op.opId,
    'the `repair-run` entry\'s `opId` is the op the entry was INVOKED FOR — the repair produced no op, so '
    + 'it carries "the op it was invoked for", the op this pair\'s evaluation carried — read '
    + `${JSON.stringify(entries(run.thrown.log, 'repair-run')[0].opId)} against `
    + `${JSON.stringify(commitRecord.op.opId)}`);
  assert.notEqual(landed.opId, commitRecord.op.opId,
    'and the drive\'s own two identities are two: the op the repair landed is NOT the op the entry was '
    + 'invoked for, so the assertion above pins the invocation and not the landing');
});

test('ck_repairop_arm_d_an_ok_true_return_whose_op_is_undefined_is_KC4', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('rop3')];
  let landed = null;
  let returned = null;
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          landed = store.write(address, 'mem', 'fixed').op;
          returned = { ok: true, message: 'x was repaired', op: undefined };
          return returned;
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'broken');
  const run = capture(() => runAttempt(store, commitRecord));
  assert.equal('op' in returned, true, 'the member is PRESENT here and its value is `undefined`');
  assert.equal(returned.op, undefined,
    'the second of the three forms `§2.7` names: an `ok === true` return whose `op` IS `undefined`');
  assert.equal(landed !== null, true, 'and the repair\'s edit is landed all the same');
  assertArmD({ run, store, address, commitRecord, id: 'x', closed: report(store, commitRecord.attempt), commit },
    '`op` undefined');
});

test('ck_repairop_arm_d_an_ok_true_return_naming_an_op_the_repair_never_landed_is_KC4', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('rop4')];
  let landed = null; // the op THIS repair's own edit landed
  let unlanded = null; // an op THIS repair never landed: the attempt's own first-write op
  let returned = null;
  let evaluations = 0;
  register(store, address, 'x', () => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: () => {
          landed = store.write(address, 'mem', 'fixed').op; // the op it REALLY landed
          returned = { ok: true, message: 'x was repaired', op: unlanded }; // …and it names another op
          return returned;
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'broken');
  unlanded = commitRecord.op; // the attempt's own first write: an op of THIS attempt, landed by no repair
  const run = capture(() => runAttempt(store, commitRecord));
  assert.equal(landed !== null && unlanded !== null, true, 'both ops are real and both were read');
  assert.notEqual(returned.op.opId, landed.opId,
    'the state this cell drives: an `ok === true` return whose `op` is NOT the op the repair actually '
    + 'landed — here the attempt\'s own first-write op, which THIS repair did not land');
  assert.equal(unlanded.opId, commitRecord.op.opId,
    'and the identity the return names is one the kernel ALREADY holds in `attempt.ops`, minted by the '
    + 'attempt\'s own first write, so it is provably not this repair\'s own landing');
  assertArmD({ run, store, address, commitRecord, id: 'x', closed: report(store, commitRecord.attempt), commit },
    'an op the repair never landed');
  const sentence = repairRunsFor(run.thrown.log, 'x')[0].message;
  assert.equal(sentence.includes(unlanded.opId) || run.thrown.message.includes(unlanded.opId), true,
    'AND THE KERNEL\'S OWN GENERATED SENTENCE NAMES THE UNRECOGNIZED OR UNLANDED `op` (`§2.7`\'s home, '
    + 'verbatim) — read off the `repair-run` entry, which carries what was ATTEMPTED, or off the thrown '
    + `form's own message; read ${JSON.stringify(sentence)} / ${JSON.stringify(run.thrown.message)}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE SEAM'S OWN CONSEQUENCE — THE MODULE HOLDS NO SECOND LOAD PATH (`A110`, DELETED NOT WIDENED)
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE KERNEL REACHES THE STORE ONLY THROUGH THE CALLER'S OWN INSTANCE (`kernel-surface.md §1` item 1's
 * fixture clause; `§2.3` item 2's no-second-route bullet; `parameter-semantics.md §2.7`: *"no module
 * interception, no monkey-patch, no addon load path and no second dependency exists anywhere in this
 * unit"*).
 *
 * THE OBSERVABLE: every op the kernel credits is ONE THE CALLER'S OWN STORE INSTANCE'S VERB CALLS
 * ANSWERED — the op the caller's own `commit` record carries and the ops the repairs' own `write` calls
 * answered — each credited EXACTLY ONCE, with NO op of the kernel's own making standing beside them. A
 * kernel that interposed a route of its own, or that credited one landing twice (once off an interposed
 * route and once off the return), fails this cell.
 */
test('ck_repairop_the_kernel_reaches_the_store_only_through_the_callers_own_instance', async () => {
  const module = await kernel();
  assert.deepEqual(Object.keys(module).sort(), FIVE_ITEMS,
    'the module\'s export set is exactly the five `K-1`–`K-5` items (`kernel-surface.md §1` item 2) — the '
    + 'kernel exports no route, no addon handle and no sixth name');
  const { register, commit, runAttempt, report } = module;
  const store = makeStore();
  const address = [tag('rop5')];
  const answered = []; // EVERY op this drive's own calls on the caller's instance answered
  let nx = 0;
  let ny = 0;
  register(store, address, 'x', () => {
    nx += 1;
    if (nx !== 1) return true;
    return { repair: () => {
      const op = store.write(address, 'mem', 'x-fixed').op;
      answered.push(op);
      return { ok: true, message: 'x was repaired by the op this repair landed', op };
    }, message: 'x is invalid' };
  });
  register(store, address, 'y', () => {
    ny += 1;
    if (ny !== 1) return true;
    return { repair: () => {
      const op = store.write(address, 'mem', 'y-fixed').op;
      answered.push(op);
      return { ok: true, message: 'y was repaired by the op this repair landed', op };
    }, message: 'y is invalid' };
  });
  const commitRecord = commit(store, address, 'mem', 'broken');
  answered.unshift(commitRecord.op); // the caller's own `K-2` call: the op its write answered with
  const attempt = runAttempt(store, commitRecord);
  assertAttemptReport(attempt, 'the caller-instance drive');
  assert.equal(attempt.outcome, 'passed', 'both pairs are repaired and the re-run passes');
  const credited = attempt.ops.map((o) => o.opId);
  assert.equal(credited.length, answered.length,
    `THE KERNEL CREDITS EXACTLY THE OPS THE CALLER'S OWN INSTANCE'S VERBS ANSWERED — ${answered.length} `
    + `calls made, ${credited.length} ops credited; a second route of the module's own would credit an op `
    + 'no call of this drive answered, or would credit one landing twice');
  assert.deepEqual([...credited].sort(), answered.map((o) => o.opId).sort(),
    'and the two sets are the SAME ops, by identity — no op of the kernel\'s own stands in `ops`');
  assert.equal(new Set(credited).size, credited.length,
    'each of them exactly ONCE: nothing is credited twice over one landing');
  assert.equal(credited[0], commitRecord.op.opId,
    'and the first entry is the op the caller\'s own `K-2` call answered with');
  for (const op of answered.slice(1)) {
    assert.equal(credited.includes(op.opId), true,
      `the op ${op.opId} the caller's own repair's verb call answered is IN the attempt's ops — the seam `
      + 'has ONE carrier, and the caller\'s own instance is it');
  }
  // THE STORE'S OWN STATE IS WHERE THE CALLER'S OWN VERBS PUT IT, AND NOWHERE ELSE
  assert.equal(store.read(address), 'y-fixed',
    'the last value a repair wrote through the caller\'s own instance stands at the attempt\'s address');
  assert.equal(report(store, commitRecord.attempt).outcome, 'passed',
    'and the closed record `K-5` answers carries the same resolved arm');
});

/**
 * THE MODULE HOLDS NO ADDON LOAD PATH — `A110`'s own consequence, asserted OBSERVABLY AND NOT BY READING
 * THE SOURCE: `A110` *"deletes"* the route *"rather than widening"* it, so the kernel module's own IMPORT
 * FOOTPRINT carries no native addon at all and the kernel reaches the store only through the caller's
 * own instance — the instance `storeCreate(cfg)` handed to the caller.
 *
 * THE OBSERVABLE: a process in which the LOADING OF NATIVE ADDONS IS DISABLED still IMPORTS the kernel
 * module, and the module's export set there is the same five items. A module that loads an addon on any
 * account — the kernel's included — cannot be imported in that process at all. This cell reads the
 * module's BEHAVIOUR, never its text: no file of `bindings/js/src/**` is opened by it.
 */
test('ck_repairop_the_module_holds_no_addon_load_path_and_loads_with_native_addons_disabled', () => {
  const script = 'const mod = await import(' + JSON.stringify(pathToFileURL(KERNEL_HOME).href) + ');'
    + "process.stdout.write('EXPORTS:' + JSON.stringify(Object.keys(mod).sort()));";
  const run = spawnSync(process.execPath, ['--no-addons', '--input-type=module', '-e', script], {
    cwd: join(HERE, '..'),
    encoding: 'utf8',
    timeout: 60000,
  });
  assert.equal(run.error, undefined,
    `the child process must run: read ${JSON.stringify(run.error && run.error.message)}`);
  assert.equal(run.status, 0,
    'THE KERNEL MODULE LOADS WHERE NO NATIVE ADDON MAY BE LOADED — its own import footprint carries no '
    + 'addon load path and no second dependency (`A: docs/decisions.md` · `A110`, the route DELETED and '
    + 'not widened; `kernel-surface.md §1` item 1\'s fixture clause: *"this unit carries no module '
    + 'interception, no monkey-patch, no addon load path and no second dependency"*). A module that '
    + `reaches the addon on its own account cannot be imported here at all — read status ${run.status}, `
    + `stderr ${JSON.stringify((run.stderr || '').split('\n').slice(0, 4).join(' | '))}`);
  const marker = run.stdout.indexOf('EXPORTS:');
  assert.notEqual(marker, -1,
    `the child reported its export set: read ${JSON.stringify(run.stdout)}`);
  const keys = JSON.parse(run.stdout.slice(marker + 'EXPORTS:'.length));
  assert.deepEqual(keys, FIVE_ITEMS,
    'and under that disabled-addon load the module\'s export set is still exactly the five `K-1`–`K-5` '
    + 'items — one module, five names, and no sixth');
});
