// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-105` — AN OP-FREE REPAIR IS **CREDITED**: THE CREDIT IS THE FAILING PAIR'S MARK, THE RETURNED `op` IS READ
// BY NOTHING, THE PINS ARE THE `1.8.1` LEG'S, AND A REPAIR'S EDIT'S TRIGGERED PAIRS JOIN THE COMMIT'S NEXT BATTERY
// — the SIX `integration` CELLS THE DECLARATION OWES (`ORC-I1` … `ORC-I6`).
//
// THE DECLARATION: `docs/L1/op-free-repair-credit.md` — §1 (the credit and the five-step predicate chain), §2 (the
// re-run's carrier, the widened `1.8.1` leg), §3 (the joined triggers), §4 (the rollback, independent of the
// returned op), §5 (the sentence), §7.2 (THESE SIX CELLS). THE RULING: `strata/decisions.md` · `D-105`, the
// architect, verbatim: *"You don't need the ops, the rollback point is determined independently. Track the
// failing constraints for the duplicate repairs. The only supported route for repairs is with the commit id so
// that its triggers can be joined to the commit and the constraint battery run again over them."*
//
// THE DEFECT THESE CELLS CLOSE, IN ONE SENTENCE: the repair arm read the op the repair's RETURN carried and
// credited nothing without it, so a repair that did its write and answered `undefined` — the natural shape of
// `repair: () => { … }` — failed its write `KC-4` (`ST-F2`'s surviving limb). **After this ruling the return's
// `op` is neither required nor read, and the credit is the pair's own registry key.**
//
// WHAT EACH CELL ASSERTS, AT ITS OWN OBSERVABLE (declared at §7.2 and re-measured here, never copied):
//   · `ORC-I1` — the credit is the MARK: `attempt.appliedRepairs` and `attempt.ran` carry the pair's key on every
//     return shape (`undefined`, `{ok: true}`, `{ok: true, op}`, a foreign `op`, `op: undefined`, `true`, `7`,
//     `'done'`, `{ok: 'yes'}`, `{ok: false}` with no message) — the inverse of `ck_p_neg_18`;
//   · `ORC-I2` — the PINS and the ORDER: `entry.opId` is the LAST leg's `opId`, `attempt.ops` is
//     `[the commit's op, …every leg's op in leg order]` with no `opId` twice, and a repair that writes TWICE
//     appends TWO ops whose LAST is the landing (§2 PN-4);
//   · `ORC-I3` — the residual `KC-4`'s TWO predicates: `(d1)` the declared failed arm (the caller's words
//     VERBATIM, nothing pinned, credited or merged) and `(d2)` the invocation that landed nothing (the residual
//     template, byte-for-byte) are DISTINCT answers of one token;
//   · `ORC-I4` — the JOINED PAIR: a pair named only by the leg is asked at the re-run ONCE and in the REGISTRY's
//     order, a pair already in `record.triggered` is not joined twice, a handle the store returned TWICE inside
//     one `triggered` list stands ONCE in `attempt.repairPaired` and is asked once, `record.triggered` is
//     UNMOVED and `pending` carries no pair id;
//   · `ORC-I5` — the LEG'S SHAPE: the channel answers one `{op, triggered}` element per write, the op a FRESH
//     COPY carrying `opId` · `kind` · `address` · `tier` · `before` · `after` · `seq` · `compacted`; and the three
//     absent answers — a channel READ AWAY, a channel that THROWS, a channel answering a NON-ARRAY — are one arm,
//     `(d2)`;
//   · `ORC-I6` — the FAILED ARM'S UNDO PLAN by ADDRESS GEOMETRY and never by credit (`D-89`): a failed-arm
//     repair's beside write STANDS where no attempt op named its address, and a write AT OR UNDER an attempt op's
//     address IS swept with the attempt.
//
// ── THE INSTRUMENTS, NAMED — AND THE THREE RULES THIS FILE OBEYS ────────────────────────────────────────
// THE MODULE UNDER TEST is the kernel's own one checkout home, reached by path through the house helper
// (`constraint-kernel-helpers.mjs`'s `kernel()` → `bindings/js/src/constraint-kernel.mjs`; `kernel-surface.md §1`
// item 1). **NO CELL HERE CLAIMS THE PACKAGED RESOLUTION** (`O4`, `D-6`/`D-7`).
// THREE INSTRUMENTS stand beside the five kernel items, and each is one the tree already uses:
//   (1) **`kernelFor(store).live`** — the kernel record's map of OPEN attempts (`kernel-foundations.mjs`), read
//       at its own `Map.get(ref.id)` **after `commit` and before `runAttempt`, when the attempt is LIVE**: the
//       object is the attempt's own record and the run mutates it in place, so `appliedRepairs`, `ran`, `ops`,
//       `log`, `repairPaired` and `repairTriggered` are read off it AFTER the terminal arm released it. This is
//       the ONLY way a drive can read `appliedRepairs` at all: `D-58` keeps no log and no open member on a closed
//       record, so the marker is an attempt member and never a product one.
//   (2) **the `REPAIR_LEG` channel** (`Symbol.for('provident-storeroom.repair-leg')`), wrapped ONCE in
//       `ORC-I5`'s first drive by a spy that hands the kernel exactly what the store answered — the leg's SHAPE
//       is that cell's subject and the channel is where the shape crosses. The three ABSENT arms of that cell
//       replace the channel by the caller's own act, which is how §7.1's `ORC-5` drives the same three at the
//       entry.
//   (3) **the store's own `read`**, read as a VALUE (`capture`), so a missing address is a reading.
//
// **D-17**: the expectation is a literal here and the citation is a comment — no `docs/**` path is opened at
// runtime. **D-21**: every cell prints the readings it took at its own `t.diagnostic`, and a cell that cannot
// reach its arm asserts the drive's coherence FIRST instead of reporting a verdict.
// **NOTHING IS ASSERTED ABOUT THE ORDER OF A STORE-RETURNED SET** (`DD-22`, `DD-37`, `AB-3`): every reading of
// `triggered` or `pending` below is a SET or a COUNT reading, and the ONE order this file does assert — the
// re-run's ask order — is the REGISTRY's (`D-39`), which is registration sequence and not a store's list.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  kernel, makeStore, tag, KC, assertKernelForm, assertRetainedRecord, capture, entries,
  passAtRegistration,
} from './constraint-kernel-helpers.mjs';
import { kernelFor } from '../../../bindings/js/src/entry/kernel-foundations.mjs';

/** The `1.8.1` leg channel's `Symbol.for` spelling — the same key `state.mjs` installs and the kernel reads. */
const REPAIR_LEG = Symbol.for('provident-storeroom.repair-leg');

/** The attempt's own record, taken while it is LIVE and read after its terminal arm released it. */
function liveAttempt(store, ref) {
  return kernelFor(store).live.get(ref.id);
}

/** The store's own `read`, read as a VALUE so a missing address is a reading and not a crash. */
function readBack(store, address) {
  const answer = capture(() => store.read(address));
  return answer.threw ? `<${answer.thrown.status}>` : answer.value;
}

/** A returned set's `handle` members, in its own order — read as a SET by every citing cell (`DD-22`). */
const handlesOf = (set) => set.map((element) => (
  element === null || typeof element !== 'object' ? element : element.handle
));

/** The kernel context's `op` identity, spelled for a diagnostic and never asserted as a member set. */
const opIdOf = (op) => (op === null || op === undefined ? null : op.opId);

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I1` · THE CREDIT IS THE MARK — `attempt.appliedRepairs` and `attempt.ran` carry the pair's key, and
// the returned `op` is read by nothing (§1.1 `CT-1`–`CT-3`; §7.2's first row)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i1_the_credit_is_the_failing_pairs_mark_and_the_returned_op_is_read_by_nothing', async (t) => {
  const { register, commit, runAttempt, report } = await kernel();
  // THE TEN RETURN SHAPES, EACH ONE A DRIVE OF ITS OWN. The first five are §1.1 `CT-4`'s declared credited arm
  // and its informational `op`; the last five are the values OUTSIDE the arms that §1.1 `CT-3` credits by name
  // (`{ok: false}` WITH NO MESSAGE is the one that looks like the failed arm and is not: the declared failed arm
  // needs a NON-EMPTY `message`).
  const SHAPES = [
    { label: 'no return at all (`undefined`)', build: () => undefined },
    { label: '`{ok: true}`', build: () => ({ ok: true }) },
    { label: '`{ok: true, op: <the op it landed>}`', build: (landed) => ({ ok: true, op: landed.op }) },
    { label: '`{ok: true, op: <an op the attempt landed but this repair did not>}`', build: (landed, record) => ({ ok: true, op: record.op }) },
    { label: '`{ok: true, op: undefined}`', build: () => ({ ok: true, op: undefined }) },
    { label: '`true`', build: () => true },
    { label: '`false`', build: () => false },
    { label: '`7`', build: () => 7 },
    { label: "`'done'`", build: () => 'done' },
    { label: "`{ok: 'yes'}`", build: () => ({ ok: 'yes' }) },
    { label: '`{ok: false}` with NO message', build: () => ({ ok: false }) },
  ];
  const readings = [];
  for (const shape of SHAPES) {
    const store = makeStore({ journalLength: 32 });
    const address = [tag('orci1a')];
    const repaired = [tag('orci1b')];
    let landed = null;       // THE OP THE REPAIR'S OWN EDIT LANDED, read off the caller's own verb's answer
    let returned = null;     // the repair's own return, read whole
    let repairRuns = 0;
    let rerun = null;        // the re-run's own context, as the constraint body met it
    // `A135` (3) / `contract.md §7.3` (b) state 1 — the registration instant is shielded, so the pair is CARRIED
    // and this cell's repair is spent on the WRITE's attempt rather than on the registration.
    register(store, address, 'x', passAtRegistration((context) => {
      if (context.value !== 2) {
        rerun = {
          opId: opIdOf(context.op),
          value: context.value,
          address: context.address,
        };
        return true;
      }
      return {
        message: 'x refuses the committed value',
        repair: (rctx) => {
          repairRuns += 1;
          // **THE SUPPORTED ROUTE (`D-103`, `D-46`): FOUR POSITIONS, the repair naming its own commit at
          // `write`'s fourth position through the context it was handed** — so the write JOINS the attempt and
          // opens no second commit.
          landed = store.write(repaired, 'mem', 3, rctx).op;
          returned = shape.build({ op: landed }, record);
          return returned;
        },
      };
    }));
    const record = commit(store, address, 'mem', 2);
    const attempt = liveAttempt(store, record.attempt);
    const run = capture(() => runAttempt(store, record));
    const closed = report(store, record.attempt);
    const runs = entries(attempt.log, 'repair-run');

    // ── THE DRIVE REACHED ITS ARM, SAID FIRST SO A CELL THAT CANNOT REACH IT REPORTS NO VERDICT. ──
    assert.equal(typeof attempt, 'object',
      `${shape.label}: the attempt must stand in the kernel record's LIVE map after its \`K-2\` and before its `
      + '`K-3` — that is the instrument this cell reads `appliedRepairs` and `ran` through');
    assert.equal(repairRuns, 1, `${shape.label}: the repair must have run ONCE — read ${repairRuns}`);
    assert.equal(landed !== null && typeof landed.opId === 'string', true,
      `${shape.label}: the repair's own edit must have LANDED a journal op — read `
      + `${JSON.stringify(landed && landed.opId)}`);

    // ── (a) THE CREDIT IS THE MARK — AND THE SHAPE THE BODY RETURNED MADE NO DIFFERENCE. ────────────
    assert.equal(run.threw, false,
      `${shape.label}: **THE ATTEMPT MUST RESOLVE ON THE PASS ARM** — \`D-105\` item \`1\` is verbatim *"A repair `
      + 'that does its write and returns `undefined` — the natural shape of `repair: () => { … }` — is NOT '
      + 'refused"*, and `CT-3` credits EVERY value that is not the declared failed arm; the run threw '
      + `${JSON.stringify(run.threw ? run.thrown.status : null)}`);
    assert.equal(run.value.outcome, 'passed',
      `${shape.label}: and its outcome is the pass arm — read ${JSON.stringify(run.value.outcome)}`);
    assert.deepEqual([...attempt.appliedRepairs], ['x'],
      `${shape.label}: **THE PAIR'S OWN REGISTRY KEY IS THE CREDIT** (\`CT-1\`: *"The credit is the FAILING `
      + 'PAIR\'s mark (`attempt.appliedRepairs`, keyed by the pair), and the returned `op` is neither required '
      + `nor read for it"*) — read ${JSON.stringify([...attempt.appliedRepairs])}`);
    assert.deepEqual([...attempt.ran], ['x'],
      `${shape.label}: and the mark the credit shares its identity with — \`attempt.ran\` — carries the SAME key, `
      + `so the two members cannot disagree about which pair was applied: read ${JSON.stringify([...attempt.ran])}`);
    assert.deepEqual(attempt.ops.map((op) => op.opId), [record.op.opId, landed.opId],
      `${shape.label}: AND THE PINS ARE THE LEG'S: \`attempt.ops\` is the commit's own op followed by the op the `
      + 'repair LANDED, in creation order — never the op the return named, and never one op more. Read '
      + `${JSON.stringify(attempt.ops.map((op) => op.opId))} against `
      + `${JSON.stringify([record.op.opId, landed.opId])}`);

    // ── (b) THE RE-RUN JUDGED IT, AT THE LEG'S OP AND THE VALUE THAT OP LANDED (`§2.3 PN-1`). ────────
    assert.deepEqual(rerun, { opId: landed.opId, value: 3, address: address.slice() },
      `${shape.label}: THE RE-RUN'S LANDING IS \`attempt.ops\`' TAIL — the leg's op — so the context's \`op\` is `
      + 'the repair\'s landing and its `value` is that op\'s `after.value`, reached with NO member and NO second '
      + `channel (§2.3 PN-1): read ${JSON.stringify(rerun)}`);

    // ── (c) THE SENTENCE NAMES THE LANDING AND NEVER THE RETURN'S `op` (`§2.3 PN-3`). ─────────────
    assert.equal(runs.length, 1, `${shape.label}: the repair-run entry is appended once — read ${runs.length}`);
    assert.equal(runs[0].opId, landed.opId,
      `${shape.label}: the entry's \`opId\` is THE LAST LEG'S \`opId\` — "the op the repair produced where it `
      + `produced one" (\`kernel-surface.md §2.5\` item 1's \`repair-run\` row): read ${JSON.stringify(runs[0].opId)}`);
    assert.equal(runs[0].message, `the repair x landed ${landed.opId}`,
      `${shape.label}: and its sentence is the existing one, unmoved, carrying the LEG's identity `
      + `(\`§2.3 PN-2\`): read ${JSON.stringify(runs[0].message)}`);
    if (shape.label.includes('an op the attempt landed but this repair did not')) {
      assert.equal(runs[0].opId !== record.op.opId, true,
        `${shape.label}: **AND THE FOREIGN \`op\` IS NAMED BY NO SENTENCE AND SETS NO PIN** — this drive's return `
        + 'names the COMMIT\'s own op (`ck_p_neg_18`\'s identity, read from the other side) and the entry still '
        + `names the repair's landing: read ${JSON.stringify(runs[0].opId)} against `
        + `${JSON.stringify(record.op.opId)}`);
    }

    // ── (d) THE RETENTION AND THE STORE. ────────────────────────────────────────────────────────────
    assertRetainedRecord(closed, `${shape.label}: the retained record`);
    assert.deepEqual(closed.ops.map((op) => op.opId), attempt.ops.map((op) => op.opId),
      `${shape.label}: \`K-5\`'s ops are the attempt's own, by identity and in the same order`);
    assert.equal(readBack(store, repaired), 3,
      `${shape.label}: and the repair's edit stands where it landed — read ${JSON.stringify(readBack(store, repaired))}`);
    readings.push({
      shape: shape.label,
      returned: typeof returned === 'undefined' ? '<undefined>' : JSON.stringify(returned),
      applied: [...attempt.appliedRepairs],
      ops: attempt.ops.map((op) => op.opId),
      rerun,
    });
  }
  t.diagnostic(`ORC-I1 · 2026-11-01 · THE CREDIT IS THE MARK, ACROSS ${SHAPES.length} RETURN SHAPES: every one `
    + 'of them credited its pair (`appliedRepairs` = the pair\'s key, `ran` = the same key), pinned the LEG\'s op '
    + '(entry `opId` and `attempt.ops` both), judged the re-run at that op and the value it landed, and left the '
    + `repair's edit standing. THE READINGS: ${JSON.stringify(readings)}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I2` · THE PINS AND THE ORDER — `entry.opId` is the LAST leg's, `attempt.ops` is `[commit, …legs]` with
// no `opId` twice, and TWO writes append TWO ops whose LAST is the landing (§2 `PN-2`, `PN-4`; §4 `RB-3`, `RB-4`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i2_the_pins_are_the_legs_and_a_repair_that_writes_twice_appends_two_ops_whose_last_is_the_landing', async (t) => {
  const { register, commit, runAttempt, report } = await kernel();
  // ── (a) ONE WRITE — THE PINS, READ ONE BY ONE. ──────────────────────────────────────────────────────
  const one = makeStore({ journalLength: 32 });
  const oneAddress = [tag('orci2a')];
  const oneBeside = [tag('orci2b')];
  let oneLanded = null;
  let oneRerun = null;
  register(one, oneAddress, 'x', passAtRegistration((context) => {
    if (context.value !== 2) {
      oneRerun = { opId: opIdOf(context.op), value: context.value };
      return true;
    }
    return {
      message: 'x refuses the committed value',
      repair: (rctx) => { oneLanded = one.write(oneBeside, 'mem', 3, rctx).op; },
    };
  }));
  const oneRecord = commit(one, oneAddress, 'mem', 2);
  const oneAttempt = liveAttempt(one, oneRecord.attempt);
  const oneRun = capture(() => runAttempt(one, oneRecord));
  assert.equal(oneRun.threw, false,
    `the one-write drive must PASS: it threw ${JSON.stringify(oneRun.threw ? oneRun.thrown.status : null)}`);
  const oneRuns = entries(oneAttempt.log, 'repair-run');
  assert.deepEqual(oneAttempt.ops.map((op) => op.opId), [oneRecord.op.opId, oneLanded.opId],
    'THE LIST IS `[THE COMMIT\'S OWN LANDING, EVERY LEG\'S OP IN LEG ORDER]` (`§4 RB-3`): the commit\'s own op '
    + `first, the repair\'s landing second — read ${JSON.stringify(oneAttempt.ops.map((op) => op.opId))}`);
  assert.equal(oneRuns.length, 1, `one repair, one entry — read ${oneRuns.length}`);
  assert.equal(oneRuns[0].opId, oneLanded.opId,
    `**\`entry.opId\` IS THE LAST LEG'S \`opId\`** (\`§2.3 PN-2\`'s first row: "the entry names the landing, not `
    + `the invocation"): read ${JSON.stringify(oneRuns[0].opId)} against ${JSON.stringify(oneLanded.opId)}`);
  assert.deepEqual(oneRerun, { opId: oneLanded.opId, value: 3 },
    `and the re-run's context is that same op and its landed value: read ${JSON.stringify(oneRerun)}`);
  const oneClosed = report(one, oneRecord.attempt);
  assert.deepEqual(oneClosed.ops.map((op) => op.opId), oneAttempt.ops.map((op) => op.opId),
    '`K-5` answers the same list the attempt pinned, by identity and in the same order');

  // ── (b) TWO WRITES — TWO OPS, THE LAST IS THE LANDING (§2 `PN-4`, DECLARED AND NOT ABSORBED). ──────
  const two = makeStore({ journalLength: 32 });
  const twoAddress = [tag('orci2c')];
  const twoFirst = [tag('orci2d')];
  const twoSecond = [tag('orci2e')];
  const writes = [];
  let twoRerun = null;
  register(two, twoAddress, 'x', passAtRegistration((context) => {
    if (context.value !== 2) {
      twoRerun = { opId: opIdOf(context.op), value: context.value };
      return true;
    }
    return {
      message: 'x refuses the committed value',
      repair: (rctx) => {
        writes.push(two.write(twoFirst, 'mem', 3, rctx).op);
        writes.push(two.write(twoSecond, 'mem', 4, rctx).op);
      },
    };
  }));
  const twoRecord = commit(two, twoAddress, 'mem', 2);
  const twoAttempt = liveAttempt(two, twoRecord.attempt);
  const twoRun = capture(() => runAttempt(two, twoRecord));
  assert.equal(twoRun.threw, false,
    `the two-write drive must PASS: it threw ${JSON.stringify(twoRun.threw ? twoRun.thrown.status : null)}`);
  assert.equal(writes.length, 2, `the repair's body made TWO writes — read ${writes.length}`);
  assert.deepEqual(twoAttempt.ops.map((op) => op.opId),
    [twoRecord.op.opId, writes[0].opId, writes[1].opId],
    '**A REPAIR THAT WRITES TWICE APPENDS TWO LEGS, AND BOTH OPS JOIN `attempt.ops` IN LEG ORDER** '
    + '(`§2 PN-4`, DECLARED: "both ops join `attempt.ops` in leg order, and the LAST is the attempt\'s landing '
    + `and the re-run's \`op\`") — read ${JSON.stringify(twoAttempt.ops.map((op) => op.opId))}`);
  assert.deepEqual(twoAttempt.ops.map((op) => op.address),
    [twoRecord.op.address, twoFirst.slice(), twoSecond.slice()],
    'and each op stands at the address its own write named — the second beside the first: read '
    + `${JSON.stringify(twoAttempt.ops.map((op) => op.address))}`);
  const twoRuns = entries(twoAttempt.log, 'repair-run');
  assert.equal(twoRuns.length, 1, `ONE repair, ONE entry — a second write is not a second repair: ${twoRuns.length}`);
  assert.equal(twoRuns[0].opId, writes[1].opId,
    '**AND THE ENTRY NAMES THE LAST LEG\'S OP** — the landing, which is the second write: read '
    + `${JSON.stringify(twoRuns[0].opId)} against ${JSON.stringify(writes[1].opId)}`);
  assert.deepEqual(twoRerun, { opId: writes[1].opId, value: 4 },
    'and the re-run judges the LAST landing and the value IT left, never the first: read '
    + `${JSON.stringify(twoRerun)}`);

  // ── (c) THE DE-DUPLICATION, ASSERTED AS THE PROPERTY IT IS (§4 `RB-4`). ────────────────────────────
  for (const [label, attempt] of [['one write', oneAttempt], ['two writes', twoAttempt]]) {
    const ids = attempt.ops.map((op) => op.opId);
    assert.equal(new Set(ids).size, ids.length,
      `${label}: **NO \`opId\` STANDS TWICE** — the append's guard is \`landedOp\`'s membership test read `
      + `FORWARD (\`§4 RB-4\`): read ${JSON.stringify(ids)}`);
    for (const op of attempt.ops) {
      assert.equal(typeof op.opId === 'string' && typeof op.seq === 'number', true,
        `${label}: and every entry is a JOURNAL OP the store itself answered — an \`opId\` and a \`seq\` stand `
        + `on it, so no second identity can enter the list: read ${JSON.stringify(op.opId)}`);
    }
  }
  t.diagnostic(`ORC-I2 · 2026-11-01 · ONE WRITE: ops = ${JSON.stringify(oneAttempt.ops.map((op) => op.opId))}, `
    + `the entry's \`opId\` ${JSON.stringify(oneRuns[0].opId)}, the re-run at ${JSON.stringify(oneRerun)}. TWO `
    + `WRITES: ops = ${JSON.stringify(twoAttempt.ops.map((op) => op.opId))}, the entry's \`opId\` `
    + `${JSON.stringify(twoRuns[0].opId)}, the re-run at ${JSON.stringify(twoRerun)} — so \`attempt.ops\` grows by `
    + 'the repair\'s WRITE COUNT and not by its repair count (§2 PN-4\'s printed cost)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I3` · THE RESIDUAL'S TWO PREDICATES — `(d1)` the declared failed arm carries the caller's words and
// `(d2)` the invocation that landed nothing carries the residual template (§1.1 `CT-2` steps 2 and 5; §5.1)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i3_the_residual_KC4_has_two_predicates_and_one_token', async (t) => {
  const { register, commit, runAttempt } = await kernel();
  const CALLERS_WORDS = 'the caller says this repair is not acceptable';

  // ── (d1) THE DECLARED FAILED ARM — `ok === false` AND A NON-EMPTY OWN `message`. ────────────────────
  const failed = makeStore({ journalLength: 32 });
  const failedAddress = [tag('orci3a')];
  const failedBeside = [tag('orci3b')];
  let failedLanded = null;
  register(failed, failedAddress, 'x', passAtRegistration((context) => (context.value === 2 ? {
    message: 'x refuses the committed value',
    repair: (rctx) => {
      // THE EDIT LANDS FIRST: this arm's whole point is that a repair may land and still fail.
      failedLanded = failed.write(failedBeside, 'mem', 3, rctx).op;
      return { ok: false, message: CALLERS_WORDS };
    },
  } : true)));
  const failedRecord = commit(failed, failedAddress, 'mem', 2);
  const failedAttempt = liveAttempt(failed, failedRecord.attempt);
  const failedRun = capture(() => runAttempt(failed, failedRecord));
  assert.equal(failedRun.threw, true,
    '`(d1)` IS THE ONE RETURN THAT STILL FAILS THE ATTEMPT (`D-105` item `4`: *"The failed arm still fails '
    + '(`{ok: false, message}` — the caller\'s words)"*) — the run returned');
  assertKernelForm(failedRun.thrown, 'ORC-I3 (d1): the thrown form');
  assert.equal(failedRun.thrown.status, KC[4],
    `and the token is \`KC-4\` — read ${JSON.stringify(failedRun.thrown.status)}`);
  assert.equal(failedRun.thrown.message, CALLERS_WORDS,
    '**AND THE MESSAGE IS THE CALLER\'S WORDS, VERBATIM** (`§1.1 CT-2` step 2: "the attempt fails `KC-4` '
    + `CARRYING THE CALLER'S WORDS") — read ${JSON.stringify(failedRun.thrown.message)}`);
  assert.deepEqual(failedAttempt.ops.map((op) => op.opId), [failedRecord.op.opId],
    '**AND NOTHING IS PINNED**: `attempt.ops` holds the commit\'s own op and NOT the op the repair landed, '
    + `because this arm returns BEFORE the credit (§1.1 CT-2 step 2): read `
    + `${JSON.stringify(failedAttempt.ops.map((op) => op.opId))}`);
  assert.equal(failedAttempt.ops.some((op) => op.opId === failedLanded.opId), false,
    'so the repair\'s landed op stands in NO member of `ops`, in no order and under no spelling');
  assert.deepEqual([...failedAttempt.appliedRepairs], [],
    '**THE PAIR IS NOT CREDITED** — no mark is taken on this arm: read '
    + `${JSON.stringify([...failedAttempt.appliedRepairs])}`);
  assert.deepEqual(failedAttempt.record.pending, [],
    '**AND `pending` GAINS NO REPAIR ELEMENT** — the merge seat stands AFTER the credit and this arm never '
    + `reaches it: read ${JSON.stringify(failedAttempt.record.pending)}`);
  assert.equal(entries(failedAttempt.log, 'repair-run')[0].message, CALLERS_WORDS,
    'the `repair-run` entry stands (it is minted BEFORE the invocation) and its `message` is the caller\'s own — '
    + 'so "appends nothing" is true of the three MEMBERS and false of the LOG (`§1.1 CT-2` step 2)');
  assert.equal(entries(failedAttempt.log, 'repair-run')[0].opId, failedRecord.op.opId,
    'and the entry still names THE OP IT WAS INVOKED FOR — this arm produced no pin to rewrite it with');

  // ── (d2) THE INVOCATION THAT LANDED NOTHING — THE RESIDUAL TEMPLATE, BYTE-FOR-BYTE. ────────────────
  const nothing = makeStore({ journalLength: 32 });
  const nothingAddress = [tag('orci3c')];
  let nothingRepairs = 0;
  register(nothing, nothingAddress, 'x', passAtRegistration((context) => (context.value === 2 ? {
    message: 'x refuses the committed value',
    // **A REPAIR THAT WRITES NOTHING AND ANSWERS `{ok: true}`** — the credited arm on its own bytes, and the
    // `(d2)` arm on the channel's: the op-free RETURN is not what fails here (`§1.1 CT-4`), the absence of a
    // LEG is.
    repair: () => { nothingRepairs += 1; return { ok: true }; },
  } : true)));
  const nothingRecord = commit(nothing, nothingAddress, 'mem', 2);
  const nothingAttempt = liveAttempt(nothing, nothingRecord.attempt);
  const nothingRun = capture(() => runAttempt(nothing, nothingRecord));
  assert.equal(nothingRepairs, 1, `the (d2) drive's repair ran once — read ${nothingRepairs}`);
  assert.equal(nothingRun.threw, true,
    '**THE RESIDUAL ARMS WHEN THE INVOCATION LANDED NOTHING** (`§1.1 CT-2` step 5) — the run returned');
  assertKernelForm(nothingRun.thrown, 'ORC-I3 (d2): the thrown form');
  assert.equal(nothingRun.thrown.status, KC[4],
    `and it is the SAME token — no new status is minted (\`D-105\` item \`4\`): read `
    + `${JSON.stringify(nothingRun.thrown.status)}`);
  assert.equal(nothingRun.thrown.message, `the repair x produced no op at ${nothingAddress.join('/')}`,
    '**AND ITS SENTENCE IS THE RESIDUAL TEMPLATE, BYTE-FOR-BYTE, NAMING THE ATTEMPT\'S ADDRESS** (`§5.1`, kept '
    + 'unedited: *"the repair `<id>` produced no op at `<address>`"*) — read '
    + `${JSON.stringify(nothingRun.thrown.message)}`);
  assert.equal(entries(nothingAttempt.log, 'outcome')[0].state, KC[4],
    'and the ONE `outcome` entry carries that same token, by identity (`fail-surface.md §1.1` item 1 (c))');

  // ── (c) TWO PREDICATES, ONE TOKEN, AND THEY ARE DISTINCT ANSWERS. ─────────────────────────────────
  assert.notEqual(failedRun.thrown.message, nothingRun.thrown.message,
    '**THE TWO ARMS ARE DISTINCT** (`§1.1 CT-5`): `(d1)` carries the caller\'s words and `(d2)` the template, so '
    + 'a drive can tell WHICH predicate answered and no reading here is one arm standing in for the other — read '
    + `${JSON.stringify(failedRun.thrown.message)} against ${JSON.stringify(nothingRun.thrown.message)}`);
  assert.equal(failedRun.thrown.status, nothingRun.thrown.status,
    'and the token is ONE, unmoved: `KC-4` is re-derived in its SUBJECT and never minted again');
  assert.equal(readBack(failed, failedBeside), 3,
    '**AND THE DISTINCTION IS VISIBLE IN THE STORE**: `(d1)`\'s repair LANDED, and its edit stands where no '
    + `attempt op named its address (\`D-89\`'s geometry, \`§4 RB-5\`): read ${JSON.stringify(readBack(failed, failedBeside))}`);
  t.diagnostic(`ORC-I3 · 2026-11-01 · (d1) the declared failed arm: \`${failedRun.thrown.status}\` · `
    + `${JSON.stringify(failedRun.thrown.message)}, ops = ${JSON.stringify(failedAttempt.ops.map((op) => op.opId))}, `
    + `appliedRepairs = ${JSON.stringify([...failedAttempt.appliedRepairs])}, pending = `
    + `${JSON.stringify(failedAttempt.record.pending)}, the beside edit standing at `
    + `${JSON.stringify(readBack(failed, failedBeside))}. (d2) the landed-nothing arm: `
    + `\`${nothingRun.thrown.status}\` · ${JSON.stringify(nothingRun.thrown.message)} — the residual template, `
    + 'naming the attempt\'s address');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I4` · THE JOINED PAIR — a pair named only by the leg is asked by the NEXT battery, once, in the
// REGISTRY's order; no double-join, no double-ask, and the record's own set unmoved (§3.2, §3.3 `JN-1`–`JN-4`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i4_the_repairs_edit_triggered_pairs_join_the_commits_next_battery', async (t) => {
  const { register, commit, runAttempt } = await kernel();

  // ── (a) THE JOIN AND THE ORDER — the legs run `c` then `b`; the REGISTRY holds `b` then `c`. ─────────
  const store = makeStore({ journalLength: 64 });
  const address = [tag('orci4a')];
  const firstAddress = [tag('orci4b')];
  const secondAddress = [tag('orci4c')];
  const untouched = [tag('orci4d')];
  const asks = [];
  register(store, address, 'x', passAtRegistration((context) => {
    asks.push({ id: 'x', opId: opIdOf(context.op), value: context.value });
    if (context.value !== 2) return true;
    return {
      message: 'x refuses the committed value',
      // THE REPAIR WRITES AT `second` FIRST AND `first` SECOND, so the legs' order is the OPPOSITE of the
      // registry's — which is what makes "the ORDER STAYS THE REGISTRY's" (`§3.3 JN-2`) a measurement here.
      repair: (rctx) => {
        store.write(secondAddress, 'mem', 4, rctx);
        store.write(firstAddress, 'mem', 3, rctx);
      },
    };
  }));
  register(store, firstAddress, 'p-first', (context) => {
    asks.push({ id: 'p-first', opId: opIdOf(context.op), value: context.value });
    return true;
  });
  register(store, secondAddress, 'p-second', (context) => {
    asks.push({ id: 'p-second', opId: opIdOf(context.op), value: context.value });
    return true;
  });
  register(store, untouched, 'p-untouched', (context) => {
    asks.push({ id: 'p-untouched', opId: opIdOf(context.op), value: context.value });
    return true;
  });
  const record = commit(store, address, 'mem', 2);
  const attempt = liveAttempt(store, record.attempt);
  const triggeredBefore = handlesOf(record.triggered).slice();
  const run = capture(() => runAttempt(store, record));
  assert.equal(run.threw, false,
    `the joined-pair drive must PASS: it threw ${JSON.stringify(run.threw ? run.thrown.status : null)}`);
  const landing = attempt.ops[attempt.ops.length - 1];
  assert.equal(handlesOf(record.triggered).join(','), triggeredBefore.join(','),
    '**`record.triggered` IS UNMOVED** — it is the store\'s own returned set for the COMMIT\'s write, VERBATIM '
    + '(`A113` (D1); `§3.2`): a package that wrote a second act\'s handles into it would be forging a store '
    + `result. Read ${JSON.stringify(handlesOf(record.triggered))} against ${JSON.stringify(triggeredBefore)}`);
  assert.deepEqual(handlesOf(attempt.repairPaired), ['p-second', 'p-first'],
    '**THE LEG\'S CARRIED PAIRS JOIN `attempt.repairPaired` IN LEG ORDER** — the member is a SET whose ORDER is '
    + 'the append\'s, and the pass reads it through the registry (`§3.3 JN-1`): read '
    + `${JSON.stringify(handlesOf(attempt.repairPaired))}`);
  const afterPass = asks.filter((ask) => ask.opId !== null);
  assert.deepEqual(afterPass, [
    { id: 'x', opId: record.op.opId, value: 2 },
    { id: 'x', opId: landing.opId, value: 3 },
    { id: 'p-first', opId: landing.opId, value: 3 },
    { id: 'p-second', opId: landing.opId, value: 3 },
  ], '**THE NEXT BATTERY ASKS THEM ONCE EACH, IN THE REGISTRY\'S ORDER AND NOT THE LEG\'S** (`§3.3 JN-2`: '
    + '"the second argument only widens MEMBERSHIP; the ORDER stays the registry\'s") — `p-first` was registered '
    + 'before `p-second` and is asked first although its write was the SECOND leg. And every one of them is '
    + 'asked AT THE RE-RUN\'S LANDING — the LAST leg\'s op and the value IT landed — because the re-run\'s '
    + 'office is to re-ask THIS attempt\'s set against the new state. Read '
    + `${JSON.stringify(afterPass)}`);
  assert.equal(afterPass.filter((ask) => ask.id === 'p-untouched').length, 0,
    '**AND THE PAIR THE REPAIR NEVER TOUCHED IS NOT ASKED AT ALL** — the join widens membership by the LEG\'s '
    + `handles and never by the registry: read ${JSON.stringify(afterPass.map((ask) => ask.id))}`);
  assert.deepEqual(attempt.repairTriggered, ['p-second', 'p-first'],
    'and the `1.8.1` discard\'s own set records EVERY element the repair\'s writes returned, the pair halves '
    + `included (\`§3.2\`; the set \`terminal\`'s filter reads): read ${JSON.stringify(attempt.repairTriggered)}`);
  assert.equal(handlesOf(record.pending).includes('p-first') || handlesOf(record.pending).includes('p-second'),
    false, '**AND `pending` CARRIES NO PAIR ID** — `1.8.1` §3.3\'s ban stands byte-for-byte: a pair is ASKED '
    + `(\`D-69\`), never delivered. Read ${JSON.stringify(handlesOf(record.pending))}`);

  // ── (b) A PAIR ALREADY IN `record.triggered` IS NOT JOINED A SECOND TIME. ──────────────────────────
  const twice = makeStore({ journalLength: 64 });
  const twiceAddress = [tag('orci4e')];
  const twiceAsks = [];
  register(twice, twiceAddress, 'x', passAtRegistration((context) => {
    twiceAsks.push({ id: 'x', opId: opIdOf(context.op), value: context.value });
    if (context.value !== 2) return true;
    return {
      message: 'x refuses the committed value',
      // THE REPAIR REWRITES THE COMMIT'S OWN ADDRESS, so the pair at `['a']` is fired a SECOND time by an act
      // whose handle already stands in `record.triggered`.
      repair: (rctx) => { twice.write(twiceAddress, 'mem', 3, rctx); },
    };
  }));
  register(twice, twiceAddress, 'y', (context) => {
    twiceAsks.push({ id: 'y', opId: opIdOf(context.op), value: context.value });
    return true;
  });
  const twiceRecord = commit(twice, twiceAddress, 'mem', 2);
  const twiceAttempt = liveAttempt(twice, twiceRecord.attempt);
  const twiceRun = capture(() => runAttempt(twice, twiceRecord));
  assert.equal(twiceRun.threw, false,
    `the double-join drive must PASS: it threw ${JSON.stringify(twiceRun.threw ? twiceRun.thrown.status : null)}`);
  assert.deepEqual(handlesOf(twiceRecord.triggered).slice().sort(), ['x', 'y'],
    'the commit\'s own returned set carries both pairs at its address — the premise of this drive');
  assert.deepEqual(twiceAttempt.repairPaired, [],
    '**NEITHER PAIR IS JOINED: BOTH ALREADY STAND IN `record.triggered`** (`§3.3 JN-4` rule 1: "an element '
    + 'whose handle already stands in `record.triggered` is not appended") — and that is the double-ask the '
    + `member exists to prevent. Read ${JSON.stringify(twiceAttempt.repairPaired)}`);
  const twicePass = twiceAsks.filter((ask) => ask.opId !== null);
  // **THE ARITHMETIC IS THE TWO RUNS' OWN, AND THE FIRST RUN STOPS AT ITS FIRST VIOLATING PAIR** (`§2.4` item 5
  // (ii)–(iii)): `x` is asked at the commit's own op and decides the arm, so `y` waits for the re-run — and the
  // property this limb reads is the one a JOINED duplicate would break: **NO PAIR IS ASKED TWICE AT ONE OP**.
  assert.equal(twicePass.length, 3,
    `the commit's own run asks ONE pair (its first violating one decides the arm) and the re-run asks BOTH — `
    + `three asks in all. Read ${JSON.stringify(twicePass)}`);
  const twiceLanding = twicePass[1].opId;
  assert.deepEqual(twicePass[0], { id: 'x', opId: twiceRecord.op.opId, value: 2 },
    'and the first ask is the commit\'s own pass, at the commit\'s own op and the value it landed');
  assert.deepEqual(twicePass[1], { id: 'x', opId: twiceLanding, value: 3 },
    'the second is the RE-RUN, at the repair landing\'s op and the value it left');
  assert.deepEqual(twicePass[2], { id: 'y', opId: twiceLanding, value: 3 },
    'and the third is the second pair, at THAT SAME landing — so the union the re-run judges is the record\'s '
    + 'own set, with nothing joined beside it');
  const perOp = new Map();
  for (const ask of twicePass) {
    const key = `${ask.id}@${ask.opId}`;
    perOp.set(key, (perOp.get(key) ?? 0) + 1);
  }
  for (const [key, count] of perOp) {
    assert.equal(count, 1,
      `**NO PAIR STANDS TWICE AT ONE OP** — \`${key}\` was asked ${count} time(s), and the double-ask is `
      + `exactly what \`§3.3 JN-4\` rule 1 exists to prevent: read ${JSON.stringify(twicePass)}`);
  }

  // ── (c) ONE HANDLE TWICE INSIDE ONE `triggered` LIST — the store's own lawful duplicate. ──────────
  // **THE PREMISE, MEASURED AND NOT ASSUMED (`DD-42` clause 3, `DD-39`, `PAR-JS-15`): a pair standing at TWO
  // addresses, one a descendant of the other, is ONE handle and a write at the descendant returns it TWICE.**
  const dup = makeStore({ journalLength: 64 });
  const dupAddress = [tag('orci4f')];
  const dupParent = [tag('orci4g')];
  const dupLeaf = [...dupParent, 'leaf'];
  dup.write(dupParent, 'mem', {}); // the parent must be a CONTAINER for the descendant to be writable
  let dupReturned = null;
  let dupAsks = 0;
  register(dup, dupAddress, 'x', passAtRegistration((context) => (context.value === 2 ? {
    message: 'x refuses the committed value',
    repair: (rctx) => { dupReturned = handlesOf(dup.write(dupLeaf, 'mem', 3, rctx).triggered); },
  } : true)));
  // ONE PAIR AT TWO ADDRESSES: the second `register` at the same `id` EXTENDS the first (`D-29`, `D-38`).
  register(dup, dupParent, 'dup-pair', () => { dupAsks += 1; return true; });
  register(dup, dupLeaf, 'dup-pair', () => { dupAsks += 1; return true; });
  const dupRecord = commit(dup, dupAddress, 'mem', 2);
  const dupAttempt = liveAttempt(dup, dupRecord.attempt);
  const beforeDupAsks = dupAsks;
  const dupRun = capture(() => runAttempt(dup, dupRecord));
  assert.equal(dupRun.threw, false,
    `the duplicate-handle drive must PASS: it threw ${JSON.stringify(dupRun.threw ? dupRun.thrown.status : null)}`);
  assert.deepEqual(dupReturned, ['dup-pair', 'dup-pair'],
    '**THE STORE RETURNED THE ONE HANDLE TWICE INSIDE ONE `triggered` LIST — THE LAWFUL DUPLICATE** (`DD-42` '
    + 'clause 3; `DD-39`; `PAR-JS-15`), and that is the state this limb drives: read '
    + `${JSON.stringify(dupReturned)}`);
  assert.deepEqual(handlesOf(dupAttempt.repairPaired), ['dup-pair'],
    '**AND IT STANDS ONCE IN `attempt.repairPaired`** (`§3.3 JN-4` rule 2: "an element whose handle already '
    + 'stands in `repairPaired` — whether an earlier repair appended it or the SAME repair\'s write returned it '
    + `twice — is not appended again"). Read ${JSON.stringify(handlesOf(dupAttempt.repairPaired))}`);
  assert.equal(dupAsks - beforeDupAsks, 1,
    '**AND THE PAIR IS ASKED ONCE** — `pairsTriggered` admits one pair per registry row, so the duplicate is '
    + `harmless to the READ and still wrong in the MEMBER (§3.3 JN-4 rule 2): read ${dupAsks - beforeDupAsks} ask(s)`);

  t.diagnostic(`ORC-I4 · 2026-11-01 · (a) THE JOIN: the legs ran p-second then p-first, the registry holds `
    + `p-first then p-second, and the next battery asked ${JSON.stringify(afterPass)} — the REGISTRY's order, `
    + 'once each, at the landing; `repairPaired` = '
    + `${JSON.stringify(handlesOf(attempt.repairPaired))}; \`triggered\` unmoved at `
    + `${JSON.stringify(handlesOf(record.triggered))} and \`pending\` = `
    + `${JSON.stringify(handlesOf(record.pending))}. (b) THE DOUBLE-JOIN: the repair rewrote the commit's own `
    + `address and \`repairPaired\` stayed ${JSON.stringify(twiceAttempt.repairPaired)}, the pass reading `
    + `${JSON.stringify(twicePass.map((ask) => ask.id))}. (c) THE DUPLICATE: one pair at two addresses returned `
    + `${JSON.stringify(dupReturned)}, stood once in the member and was asked `
    + `${dupAsks - beforeDupAsks} time(s)`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I5` · THE LEG'S SHAPE — one `{op, triggered}` element per write, the op a fresh copy, and the three
// absent answers of `repairLegs` (a channel read away · a channel that throws · a non-array) one arm, `(d2)`
// (§2.2; §1.1 `CT-2` step 5; `kernel-attempt.mjs`'s `repairLegs`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i5_the_leg_is_one_element_per_write_and_the_channels_absent_answers_are_one_arm', async (t) => {
  const { register, commit, runAttempt } = await kernel();

  // ── (a) THE SHAPE, READ WHERE IT CROSSES: one element per write, `{op, triggered}`. ────────────────
  const store = makeStore({ journalLength: 64 });
  const address = [tag('orci5a')];
  const firstAddress = [tag('orci5b')];
  const secondAddress = [tag('orci5c')];
  const crossing = [];   // what the CHANNEL answered, as the kernel received it
  let recordReturns = []; // the two `WriteRecord`s the repair's own verbs answered
  const original = store[REPAIR_LEG];
  assert.equal(typeof original, 'function',
    'the store must carry the `1.8.1` leg channel — `state.mjs` installs it once on the instance it returns '
    + `(\`§2.2\`'s "the mint is the same seat and moves no caller"); read ${typeof original}`);
  Object.defineProperty(store, REPAIR_LEG, {
    value: () => {
      const legs = original();
      crossing.push(legs);
      return legs;
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
  register(store, address, 'x', passAtRegistration((context) => (context.value === 2 ? {
    message: 'x refuses the committed value',
    repair: (rctx) => {
      recordReturns = [
        store.write(firstAddress, 'mem', 3, rctx),
        store.write(secondAddress, 'mem', 4, rctx),
      ];
    },
  } : true)));
  const record = commit(store, address, 'mem', 2);
  const run = capture(() => runAttempt(store, record));
  assert.equal(run.threw, false,
    `the leg-shape drive must PASS: it threw ${JSON.stringify(run.threw ? run.thrown.status : null)}`);
  assert.equal(crossing.length, 1,
    `the kernel reads the channel ONCE per repair invocation (\`§2.2\`: "the read is still taken synchronously `
    + `after the invocation returned, and the answer is still cleared in the same read") — read ${crossing.length}`);
  const legs = crossing[0];
  assert.equal(Array.isArray(legs), true, 'and the channel answers a LIST');
  assert.equal(legs.length, 2,
    `**ONE ELEMENT PER WRITE — TWO WRITES, TWO LEGS** (\`§2.2\`: "ONE element per \`write\` the invocation `
    + `made"): read ${legs.length}`);
  for (const [index, leg] of legs.entries()) {
    assert.deepEqual(Object.keys(leg).sort(), ['op', 'triggered'],
      `leg ${index}: the element is EXACTLY \`{op, triggered}\` — the write's own journal op beside the elements `
      + `it returned, and no third member (§2.2): read ${JSON.stringify(Object.keys(leg).sort())}`);
    assert.deepEqual(Object.keys(leg.op).sort(),
      ['address', 'after', 'before', 'compacted', 'kind', 'opId', 'seq', 'tier'],
      `leg ${index}: **THE OP IS COPIED AT ITS OWN MEMBERS** — \`opId\` · \`kind\` · \`address\` · \`tier\` · `
      + `\`before\` · \`after\` · \`seq\` · \`compacted\` (\`decodeJournalOp\`'s own eight): read `
      + `${JSON.stringify(Object.keys(leg.op).sort())}`);
    assert.equal(leg.op.opId, recordReturns[index].op.opId,
      `leg ${index}: and the leg's \`opId\` IS the op THAT WRITE landed — read ${JSON.stringify(leg.op.opId)}`);
    assert.deepEqual(leg.op.address, recordReturns[index].op.address,
      `leg ${index}: at the address that write named`);
    assert.deepEqual(leg.op.after, { present: true, value: recordReturns[index].op.after.value },
      `leg ${index}: and its \`after\` is the landed state, member for member`);
    // **THE COPY DISCIPLINE** (`crossing.md §1.1` read at this crossing; §2.2's own clause): the record stands
    // on an object the repair body was itself handed back, so the commit must not alias it.
    assert.notEqual(leg.op, recordReturns[index].op,
      `leg ${index}: **THE OP IS MINTED FRESH AND NOT ALIASED** — a body that mutated the op it was handed can `
      + 'move nothing the kernel reads (`§2.2`: "the op is copied at its own members … so a body that mutates '
      + 'the op it was handed can move nothing the kernel reads")');
    assert.notEqual(leg.op.address, recordReturns[index].op.address,
      `leg ${index}: and the op's SEGMENT LIST is its own too`);
    assert.notEqual(leg.op.after, recordReturns[index].op.after,
      `leg ${index}: as is every \`{present, value}\` it carries`);
    assert.equal(Array.isArray(leg.triggered), true,
      `leg ${index}: and \`triggered\` is the element list this function always minted (\`{handle, address}\` `
      + 'per returned element)');
  }

  // ── (b) THE THREE ABSENT ANSWERS — ONE ARM, `(d2)`, AND EACH CARRIES THE ATTEMPT'S ADDRESS. ────────
  const ABSENT = [
    {
      label: 'the channel READ AWAY (replaced by a non-function)',
      install: (target) => Object.defineProperty(target, REPAIR_LEG, {
        value: undefined, writable: true, enumerable: false, configurable: true,
      }),
    },
    {
      label: 'a channel that THROWS',
      install: (target) => Object.defineProperty(target, REPAIR_LEG, {
        value: () => { throw new Error('the channel was read away by its caller'); },
        writable: true, enumerable: false, configurable: true,
      }),
    },
    {
      label: 'a channel answering a NON-ARRAY',
      install: (target) => Object.defineProperty(target, REPAIR_LEG, {
        value: () => ({ not: 'an array' }), writable: true, enumerable: false, configurable: true,
      }),
    },
  ];
  const readings = [];
  for (const absent of ABSENT) {
    const drive = makeStore({ journalLength: 32 });
    const driveAddress = [tag('orci5d')];
    const driveBeside = [tag('orci5e')];
    absent.install(drive);
    register(drive, driveAddress, 'x', passAtRegistration((context) => (context.value === 2 ? {
      message: 'x refuses the committed value',
      // THE REPAIR LANDS ITS EDIT AND THE CHANNEL ANSWERS NOTHING — so the attempt cannot name the op, which is
      // exactly what `(d2)` is: the invocation landed no op THIS COMMIT can own (§1.1 `CT-2` step 5).
      repair: (rctx) => { drive.write(driveBeside, 'mem', 3, rctx); },
    } : true)));
    const driveRecord = commit(drive, driveAddress, 'mem', 2);
    const driveAttempt = liveAttempt(drive, driveRecord.attempt);
    const driveRun = capture(() => runAttempt(drive, driveRecord));
    assert.equal(driveRun.threw, true,
      `${absent.label}: the attempt FAILS — the invocation landed no op the enclosing attempt can pin`);
    assertKernelForm(driveRun.thrown, `${absent.label}: the thrown form`);
    assert.equal(driveRun.thrown.status, KC[4],
      `${absent.label}: and the token is \`KC-4\`, the residual arm's one`);
    assert.equal(driveRun.thrown.message,
      `the repair x produced no op at ${driveAddress.join('/')}`,
      `${absent.label}: **AND THE TEMPLATE IS KEPT BYTE-FOR-BYTE, NAMING THE ATTEMPT'S ADDRESS** (§5.1: the `
      + 'address is the only one the kernel holds on this arm) — read '
      + `${JSON.stringify(driveRun.thrown.message)}`);
    assert.deepEqual(driveAttempt.ops.map((op) => op.opId), [driveRecord.op.opId],
      `${absent.label}: nothing of the repair's is pinned — \`attempt.ops\` holds the commit's own op alone`);
    assert.deepEqual([...driveAttempt.appliedRepairs], [],
      `${absent.label}: and no mark is taken`);
    assert.equal(readBack(drive, driveBeside), 3,
      `${absent.label}: **THE LANDED EDIT STANDS** — the channel's absence is a refusal of the ATTEMPT, not a `
      + `reversal of the store, and no attempt op named that beside address (\`§4 RB-5\`, \`D-89\`): read `
      + `${JSON.stringify(readBack(drive, driveBeside))}`);
    readings.push({ absent: absent.label, status: driveRun.thrown.status, message: driveRun.thrown.message });
  }
  t.diagnostic(`ORC-I5 · 2026-11-01 · THE LEG: two writes -> ${legs.length} legs, each `
    + `${JSON.stringify(legs.map((leg) => Object.keys(leg).sort()))}, the ops `
    + `${JSON.stringify(legs.map((leg) => leg.op.opId))} fresh copies of the writes' own; THE THREE ABSENT `
    + `ANSWERS: ${JSON.stringify(readings)} — one arm, each naming the attempt's address`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-I6` · THE FAILED ARM'S UNDO PLAN — BY ADDRESS GEOMETRY AND NEVER BY CREDIT (`D-89`, §4 `RB-5`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_orc_i6_the_failed_arms_undo_plan_is_the_commits_own_record_and_the_address_geometry', async (t) => {
  const { register, commit, runAttempt, report } = await kernel();
  const CALLERS_WORDS = 'this repair refuses what it did';

  // ── (a) THE BESIDE WRITE STANDS — no attempt op named its address. ─────────────────────────────────
  const beside = makeStore({ journalLength: 64 });
  const attemptAddress = [tag('orci6a')];
  const besideAddress = [tag('orci6b')];
  let besideLanded = null;
  register(beside, attemptAddress, 'x', passAtRegistration((context) => (context.value === 2 ? {
    message: 'x refuses the committed value',
    repair: (rctx) => {
      besideLanded = beside.write(besideAddress, 'mem', 3, rctx).op;
      return { ok: false, message: CALLERS_WORDS };
    },
  } : true)));
  const besideRecord = commit(beside, attemptAddress, 'mem', 2);
  const besideRun = capture(() => runAttempt(beside, besideRecord));
  assert.equal(besideRun.threw, true,
    `(a) the failed arm must fail: the run returned ${JSON.stringify(besideRun.threw)}`);
  const besideClosed = report(beside, besideRecord.attempt);
  assertRetainedRecord(besideClosed, 'ORC-I6 (a): the retained record');
  assert.deepEqual(besideClosed.ops.map((op) => op.opId), [besideRecord.op.opId],
    '**THE PLAN IS DERIVED FROM `attempt.ops` AND FROM NOTHING ELSE** (`§4 RB-2`, `RB-5`): the failed arm '
    + 'pinned nothing, so the list is the commit\'s own op and the floor plan is derived from THAT — read '
    + `${JSON.stringify(besideClosed.ops.map((op) => op.opId))}`);
  assert.equal(besideClosed.ops.some((op) => op.opId === besideLanded.opId), false,
    'and the repair\'s landed op is in no member of it');
  assert.equal(besideClosed.rollback.length, 1,
    `**ONE CALL — ONE DISTINCT ADDRESS THE ATTEMPT'S OPS TOUCHED** (\`§4 RB-2\`'s \`floorCallPlan\`): read `
    + `${besideClosed.rollback.length}`);
  assert.equal(besideClosed.rollback[0].opId, besideRecord.op.opId,
    'and it is the attempt\'s own first op, the address the plan takes its first owed op at');
  assert.deepEqual(besideClosed.rollback[0].undoneOps, [besideRecord.op.opId],
    '**AND THE REPAIR\'S BESIDE OP IS NOT IN ITS \`undoneOps\`** — a write at an address NO attempt op named '
    + 'STANDS (`D-89`\'s second conjunct, `§4 RB-5`): read '
    + `${JSON.stringify(besideClosed.rollback[0].undoneOps)}`);
  assert.equal(readBack(beside, attemptAddress), '<AddressNotFound>',
    'and the attempt\'s own address is restored to the state it stood at before the attempt — read '
    + `${JSON.stringify(readBack(beside, attemptAddress))}`);
  assert.equal(readBack(beside, besideAddress), 3,
    '**THE LANDED EDIT STANDS** — "a write at an address no attempt op named STANDS, credited or not" '
    + `(\`D-89\`): read ${JSON.stringify(readBack(beside, besideAddress))}`);

  // ── (b) THE WRITE AT OR UNDER AN ATTEMPT OP'S ADDRESS IS SWEPT WITH THE ATTEMPT. ───────────────────
  const under = makeStore({ journalLength: 64 });
  const rootSegment = tag('orci6c');
  const root = [rootSegment];
  const underAddress = [rootSegment, 'a'];
  const underChild = [rootSegment, 'a', 'child'];
  under.write(root, 'mem', {}); // the parent link the descendant write needs
  let childLanded = null;
  register(under, underAddress, 'x', passAtRegistration((context) => (
    context.op !== null && context.op.address.length === 2 && context.value !== null
      && typeof context.value === 'object'
      ? {
        message: 'x refuses the committed container',
        repair: (rctx) => {
          childLanded = under.write(underChild, 'mem', 3, rctx).op;
          return { ok: false, message: CALLERS_WORDS };
        },
      }
      : true
  )));
  const underRecord = commit(under, underAddress, 'mem', {});
  const underRun = capture(() => runAttempt(under, underRecord));
  assert.equal(underRun.threw, true,
    `(b) the failed arm must fail: the run returned ${JSON.stringify(underRun.threw)}`);
  const underClosed = report(under, underRecord.attempt);
  assert.equal(childLanded !== null && typeof childLanded.opId === 'string', true,
    `(b) the repair's own edit must have landed: read ${JSON.stringify(childLanded && childLanded.opId)}`);
  assert.deepEqual(underClosed.ops.map((op) => op.opId), [underRecord.op.opId],
    'and the failed arm pinned nothing, so the plan\'s input is the commit\'s op alone');
  assert.equal(underClosed.rollback.length, 1,
    `(b) one call, at the one distinct address the attempt's ops touched: read ${underClosed.rollback.length}`);
  assert.equal(underClosed.rollback[0].opId, underRecord.op.opId,
    'and the call is that op\'s own');
  assert.equal(underClosed.rollback[0].undoneOps.includes(childLanded.opId), true,
    '**AND THE CHILD OP IS IN THE ONE CALL\'S \`undoneOps\`** — "a repair\'s write AT OR UNDER an address one '
    + 'of `attempt.ops` named IS swept with the attempt, credited or not" (`D-89`; `§4 RB-5`): read '
    + `${JSON.stringify(underClosed.rollback[0].undoneOps)} against ${JSON.stringify(childLanded.opId)}`);
  assert.equal(readBack(under, underChild), '<AddressNotFound>',
    '**SO THE CHILD DOES NOT STAND** — it went with the attempt, and the store answers its own '
    + `\`AddressNotFound\` there: read ${JSON.stringify(readBack(under, underChild))}`);
  assert.equal(readBack(under, underAddress), '<AddressNotFound>',
    'and the attempt\'s own address stands nowhere either, exactly as it stood before the attempt');
  assert.deepEqual(readBack(under, root), {},
    'while the caller\'s own write ABOVE the attempt stands, because it is not the attempt\'s: read '
    + `${JSON.stringify(readBack(under, root))}`);

  t.diagnostic(`ORC-I6 · 2026-11-01 · (a) THE BESIDE WRITE STANDS: the plan read `
    + `${JSON.stringify(besideClosed.rollback.map((step) => step.undoneOps))} and the repair's op `
    + `${JSON.stringify(besideLanded.opId)} is in none of it, the store answering `
    + `${JSON.stringify(readBack(beside, besideAddress))} at the beside address and `
    + `${JSON.stringify(readBack(beside, attemptAddress))} at the attempt's. (b) THE UNDER WRITE IS SWEPT: `
    + `the plan read ${JSON.stringify(underClosed.rollback.map((step) => step.undoneOps))} and the child op `
    + `${JSON.stringify(childLanded.opId)} IS in it, the store answering `
    + `${JSON.stringify(readBack(under, underChild))} at the child and `
    + `${JSON.stringify(readBack(under, root))} at the caller's own root`);
});
