// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-105` — AN OP-FREE REPAIR IS **CREDITED**: the credit is the failing pair's mark, the returned `op` is read
// by nothing, the pins are the `1.8.1` leg's, the residual `KC-4` keeps its template, a repair's edit's TRIGGERED
// PAIRS join the commit's next battery, and its LISTENERS ride `pending` — the NINE `e2e` CELLS THE DECLARATION
// OWES (`ORC-1` … `ORC-9`).
//
// THE DECLARATION: `docs/L1/op-free-repair-credit.md` — §1 (the credit, the five-step predicate chain), §2 (the
// re-run's carrier), §3 (the joined triggers, the listener split), §4 (the rollback), §5 (the sentence), §7.1
// (THESE NINE CELLS). THE RULING: `strata/decisions.md` · `D-105`, the architect, verbatim: *"You don't need the
// ops, the rollback point is determined independently. Track the failing constraints for the duplicate repairs.
// The only supported route for repairs is with the commit id so that its triggers can be joined to the commit and
// the constraint battery run again over them."*
//
// THE DEFECT THESE CELLS CLOSE, IN ONE SENTENCE: the repair arm read the op the repair's RETURN carried and
// credited nothing without it, so a repair that did its write and answered `undefined` — the natural shape of
// `repair: () => { … }` — failed its own write `KC-4` (`ST-F2`'s surviving limb, `strata/research.md` §10).
//
// WHAT EACH CELL DRIVES, AND THE FAILURE IT CATCHES (each at §7.1's own words):
//   `ORC-1` an op-less credit — the write answers its receipt, the pair is marked applied, `report.ops` carries
//           the commit's op AND the repair's, the `repair-run` entry names the repair's, the re-run judged it.
//           CATCHES: `ST-F2` itself.
//   `ORC-2` the repair returns `{ok: true, op: <the whole WriteRecord>}` — credited identically, and the RECEIPT
//           never becomes an op. CATCHES: a path that hands the return's `op` into `attempt.ops`.
//   `ORC-3` `{ok: true, op: <the op it landed>}` (the guide's spelling) and `{ok: true, op: <an op it never
//           landed>}` — BOTH credited, and no sentence and no entry names the foreign id. CATCHES: the retired
//           identity ground read back in (`landedOp`'s membership + ordinal).
//   `ORC-4` the DECLARED FAILED ARM — the caller's exact words, `pending` unmoved, `report.ops` the commit's op
//           alone, and the landed edit's fate is the ADDRESS GEOMETRY. CATCHES: a failed arm that credits, and a
//           merge taken before the arm.
//   `ORC-5` the RESIDUAL `KC-4`, four drives reaching four DIFFERENT absent arms of `repairLegs`: a repair that
//           writes nothing · the three-position (nested) route · a store whose `REPAIR_LEG` channel was read away
//           · a store whose `EXTERNAL_CALL` channel was read away. CATCHES: an arm that credits a repair which
//           landed nothing, and a leg read that answers a PREVIOUS invocation's legs.
//   `ORC-6` a counting pair at the REPAIR's landing address is asked EXACTLY ONCE MORE, at the re-run, against
//           the repair's op and the value it landed — and a pair at an untouched address is not asked at all.
//           CATCHES: `Q-5`'s silence, and the over-reach that asks every registered pair.
//   `ORC-7` a listener bound at the repair's address is invoked ONCE, AFTER the pass, and `pending` carries one
//           element for it. CATCHES: an op-free credit that skips the `1.8.1` merge.
//   `ORC-8` the FLOOR CALL's undo on a failing arm — the repair's op IS in `report.ops` and IS in the one call's
//           `undoneOps`, and the address answers its pre-attempt state. CATCHES: a credit that appends no op.
//   `ORC-9` a repair whose only edit is `store.delete(address)` is NOT credited (`KC-4`, `report.ops` unchanged)
//           — `delete` has NO commit position, so a deletion-repair cannot be on `D-103`'s supported route
//           (`Q-6`). CATCHES: a leg minted for a verb that cannot name the commit.
//
// ── THE INSTRUMENTS, NAMED — AND THE FOUR RULES THIS FILE OBEYS ─────────────────────────────────────────
// THE ENTRY is reached BY PATH (`O4`, `D-6`/`D-7`): no cell here claims the packaged resolution.
// **THE SUPPORTED ROUTE IS FOUR POSITIONS** (`D-46`, `D-103`): a repair names its commit at `write`'s fourth
// position through the context it was handed, and every drive below does that unless its subject IS the unsupported
// route (`ORC-5` (b), `ORC-9`).
// **THE ATTEMPT'S OWN RECORD** is taken from `kernelFor(store).live` while it is LIVE — the ONLY instrument that
// can read `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue: `D-58`
// retains none of them on a closed record, and the published `write` hands the caller its three-member receipt
// instead of a report. **A drive takes the entry after its `K-2` and reads it after the terminal arm released it**
// (the run mutates the object in place).
// **THE TWO CHANNELS** are named by the `Symbol.for` spellings `state.mjs` installs —
// `provident-storeroom.repair-leg` and the `EXTERNAL_CALL` channel — and `ORC-5` replaces each with the CALLER's
// own act, which is what the declaration's drive asks for (`Object.defineProperty`, "a store whose channel was
// read away"). **NO PRODUCT MEMBER IS FORGED BY ANY OF IT**: both channels are non-enumerable own properties, and
// the store's own member census is not this file's subject.
// **D-17**: the expectation is a literal here and the citation is a comment. **D-21**: every cell prints its
// readings at `t.diagnostic`, and a cell that cannot reach its arm asserts the drive's coherence FIRST.
// **AND EVERY READING OF A STORE-RETURNED SET IS A SET OR COUNT READING** (`DD-22`, `DD-37`, `AB-3`), never an
// order — except the one order these cells do assert, the REGISTRY's (`D-39`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import {
  commit as kernelCommit,
  register as kernelRegister,
  report as kernelReport,
  runAttempt as kernelRunAttempt,
} from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';

/** One store per drive, constructed by the package's own call and by nothing else. */
const make = () => storeCreate({ journalLength: 128, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function captured(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/** The store's own `read`, read as a VALUE so a missing address is a reading and not a crash. */
function read(store, address) {
  const answer = captured(() => store.read(address));
  return answer.threw ? `<${answer.thrown.status}>` : answer.value;
}

/**
 * **THE REGISTRATION-INSTANT SHIELD — `A135` (3) / `contract.md §7.3` (b) state 1, the house device**: a body
 * that carries a `repair` is ATTEMPTED at its own registration, so an unshielded fixture would spend its repair
 * on the registration instead of on the pass the cell drives. The shield answers the one instant whose `tier` and
 * `op` are BOTH `null` (`kernel-surface.md §2.3` item 1) with `true`.
 */
const shield = (body) => (context) => (
  context !== null && typeof context === 'object' && context.tier === null && context.op === null
    ? true
    : body(context)
);

/** The `handle` members of a returned set, read as a SET (`DD-22`: the store's list has no declared order). */
const handlesOf = (set) => set.map((element) => (
  element === null || typeof element !== 'object' ? element : element.handle
));

/** The `opId` members of a list of ops, in its own order — the reading every pin below is taken by. */
const opIdsOf = (ops) => ops.map((op) => op.opId);

/** The shape of a caught value, for a diagnostic and never for an assertion. */
const shapeOf = (caught) => (caught === null || caught === undefined
  ? null
  : { status: caught.status ?? null, message: caught.message ?? String(caught) });

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-1` · THE OP-LESS CREDIT — the defect `ST-F2` filed, closed by CARRIER (§1.1 `CT-1`–`CT-4`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-1 · THE OP-LESS CREDIT — a repair that writes 3 at a second address and returns NOTHING is CREDITED: the write answers its receipt, the pair is marked applied, `report.ops` carries both ops, the `repair-run` entry names the repair\'s, and the re-run judged it', (t) => {
  const store = make();
  const address = ['orc1-a'];
  const repaired = ['orc1-b'];
  let repairs = 0;
  let landed = null;
  let attemptRef = null;
  // **THE ATTEMPT'S OWN RECORD, TAKEN WHILE IT IS LIVE** — `D-58` retains no log and no open member on a closed
  // record, so `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue are
  // read off THIS object, and the terminal arm only removes it from the map, not from the drive's reference.
  let live = null;
  let rerun = null;
  const added = captured(() => store.addConstraint({ address, id: 'orc1' }, shield((context) => {
    if (context.attempt !== null) {
      attemptRef = context.attempt;
      live = kernelFor(store).live.get(context.attempt.id);
    }
    if (context.value !== 2) {
      rerun = { opId: context.op === null ? null : context.op.opId, value: context.value };
      return true;
    }
    return {
      message: 'the landed value is not one this pair admits',
      // **THE SUPPORTED ROUTE (`D-46`, `D-103`): the repair NAMES its commit at `write`'s FOURTH position** — and
      // **IT ANSWERS NOTHING**, which is the natural shape of `repair: () => { … }` and the state `ORC-1` drives.
      repair: (rctx) => {
        repairs += 1;
        landed = store.write(repaired, 'mem', 3, rctx).op;
      },
    };
  })));
  assert.equal(added.threw, false,
    `the pair must REGISTER: the call caught ${JSON.stringify(shapeOf(added.thrown))}`);
  assert.equal(typeof live, 'object',
    'the registration must have run the pair at the REGISTRATION instant (the shield answers it), so `attemptRef` '
    + 'is the WRITE\'s attempt by the time the write is made — a null here means the drive never reached its arm');
  const written = captured(() => store.write(address, 'mem', 2));
  const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));

  // ── (a) THE WRITE ANSWERS ITS RECEIPT, AND THE ATTEMPT RESOLVES. ──────────────────────────────────
  assert.equal(written.threw, false,
    '**THE WRITE MUST COMPLETE** — the repair landed an op, so the pair is credited and the commit stands: the '
    + `write threw ${JSON.stringify(shapeOf(written.thrown))}`);
  assert.deepEqual(Object.keys(written.value).sort(), ['op', 'triggered', 'watched'],
    'and it answers the declared three-member record (`PAR-JS-13`): read '
    + JSON.stringify(Object.keys(written.value)));
  assert.equal(repairs, 1, `the repair ran ONCE — read ${repairs}`);
  assert.equal(landed === null ? null : typeof landed.opId, 'string',
    `and its edit landed a journal op — read ${JSON.stringify(landed && landed.opId)}`);

  // ── (b) THE PAIR IS MARKED APPLIED — the credit is the MARK. ──────────────────────────────────────
  assert.deepEqual([...live.appliedRepairs], ['orc1'],
    '**THE CREDIT IS THE FAILING PAIR\'S MARK** (`§1.1 CT-1`: *"The credit is the FAILING PAIR\'s mark '
    + '(`attempt.appliedRepairs`, keyed by the pair), and the returned `op` is neither required nor read for '
    + `it"*) — read ${JSON.stringify([...live.appliedRepairs])}`);
  assert.deepEqual([...live.ran], ['orc1'],
    'and `attempt.ran` carries the same key, so the two members the repeat limbs discriminate on cannot disagree');

  // ── (c) `report.ops` CARRIES THE COMMIT'S OP **AND** THE REPAIR'S, BY `opId`. ──────────────────────
  assert.equal(report.threw, false,
    `\`K-5\` must answer the closed record: it threw ${JSON.stringify(shapeOf(report.thrown))}`);
  assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId, landed.opId],
    '**\`report.ops\` CARRIES THE COMMIT\'S OWN OP AND THE OP THE REPAIR LANDED, in creation order** '
    + `(\`§4 RB-3\`) — read ${JSON.stringify(opIdsOf(report.value.ops))} against `
    + `${JSON.stringify([live.ops[0].opId, landed.opId])}`);
  assert.equal(report.value.outcome, 'passed',
    `and the closed record's outcome is the pass arm — read ${JSON.stringify(report.value.outcome)}`);

  // ── (d) THE `repair-run` ENTRY NAMES THE REPAIR'S OP — THE LANDING, NOT THE INVOCATION. ────────────
  const runs = live.log.filter((entry) => entry.kind === 'repair-run');
  assert.equal(runs.length, 1, `one repair, one entry — read ${runs.length}`);
  assert.equal(runs[0].opId, landed.opId,
    '**AND THE ENTRY\'S `opId` IS THE OP THE REPAIR LANDED** (`§2.3 PN-2`: *"the entry names the landing, not the '
    + `invocation"*) — read ${JSON.stringify(runs[0].opId)}`);
  assert.equal(runs[0].message, `the repair orc1 landed ${landed.opId}`,
    'with the existing `landed <opId>` sentence, unmoved — read ' + JSON.stringify(runs[0].message));

  // ── (e) THE RE-RUN JUDGED IT — at the leg's op and the value that op landed. ───────────────────────
  assert.deepEqual(rerun, { opId: landed.opId, value: 3 },
    '**THE RE-RUN\'S LANDING IS THE LEG\'S OP AND ITS VALUE IS WHAT THAT OP LANDED** (`§2.3 PN-1`: the value '
    + 'carrier needs no member and no second channel) — read ' + JSON.stringify(rerun));
  assert.equal(read(store, repaired), 3,
    `and the repair's edit stands where it landed — read ${JSON.stringify(read(store, repaired))}`);

  t.diagnostic(`ORC-1 · THE OP-LESS CREDIT: the repair wrote ${JSON.stringify(repaired)} and returned NOTHING; `
    + `the write answered ${JSON.stringify(Object.keys(written.value))}; \`appliedRepairs\` = `
    + `${JSON.stringify([...live.appliedRepairs])}; \`report.ops\` = ${JSON.stringify(opIdsOf(report.value.ops))}; `
    + `the \`repair-run\` entry names ${JSON.stringify(runs[0].opId)}; the re-run read `
    + `${JSON.stringify(rerun)}; the store stands at ${JSON.stringify(read(store, repaired))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-2` · THE BARE RECEIPT — `{ok: true, op: <the whole WriteRecord>}` is CREDITED, and the receipt never
// becomes an op (§1.1 `CT-3`; §1.2's "not read" list)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-2 · THE BARE RECEIPT — a repair returning `{ok: true, op: <the whole WriteRecord>}` is credited identically, `report.ops` carries the JOURNAL op and never the receipt, and no entry names the receipt', (t) => {
  const store = make();
  const address = ['orc2-a'];
  const repaired = ['orc2-b'];
  let repairs = 0;
  let receipt = null;
  let answered = null;
  let attemptRef = null;
  // **THE ATTEMPT'S OWN RECORD, TAKEN WHILE IT IS LIVE** — `D-58` retains no log and no open member on a closed
  // record, so `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue are
  // read off THIS object, and the terminal arm only removes it from the map, not from the drive's reference.
  let live = null;
  store.addConstraint({ address, id: 'orc2' }, shield((context) => {
    if (context.attempt !== null) {
      attemptRef = context.attempt;
      live = kernelFor(store).live.get(context.attempt.id);
    }
    if (context.value !== 2) return true;
    return {
      message: 'the landed value is not one this pair admits',
      repair: (rctx) => {
        repairs += 1;
        // **THE WHOLE RECORD IS HANDED BACK AS `op`** — `{op, watched, triggered}` where the member the type names
        // is one journal op. This is the shape §1.1 `CT-3` credits and §6.1's printed gap keeps out of the type.
        receipt = store.write(repaired, 'mem', 3, rctx);
        answered = { ok: true, op: receipt };
        return answered;
      },
    };
  }));
  const written = captured(() => store.write(address, 'mem', 2));
  assert.equal(live !== null && typeof live === 'object', true,
    'the pair must have been asked by the write\'s pass, so that the attempt\'s own record stood in the kernel record\'s LIVE map when the body met it — a null here means the drive never reached its arm');
  const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));
  assert.equal(written.threw, false,
    '**THE WRITE COMPLETES — the return\'s `op` is not the carrier** — read '
    + JSON.stringify(shapeOf(written.thrown)));
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  assert.deepEqual([...live.appliedRepairs], ['orc2'],
    'and the pair is marked applied, exactly as on an op-free return');
  assert.equal(receipt !== null && typeof receipt.op.opId, 'string',
    `the repair's own edit landed a journal op — read ${JSON.stringify(receipt && receipt.op && receipt.op.opId)}`);
  assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId, receipt.op.opId],
    '**`report.ops` CARRIES THE JOURNAL OP AND NOT THE RECEIPT** (`§4 RB-3`: every entry is an op the store '
    + `answered) — read ${JSON.stringify(opIdsOf(report.value.ops))}`);
  assert.equal(report.value.ops.some((op) => op === receipt), false,
    '**AND THE RECEIPT ITSELF STANDS IN NO MEMBER OF `ops`** — it is a `WriteRecord` and not an op, and the '
    + 'leg\'s op is the only thing the credit appends');
  assert.equal(live.ops.some((op) => op === receipt), false,
    'the same, read off the attempt\'s own list');
  const runs = live.log.filter((entry) => entry.kind === 'repair-run');
  assert.equal(runs[0].opId, receipt.op.opId,
    'and the `repair-run` entry names the journal op the write answered with, never the record — read '
    + JSON.stringify(runs[0].opId));
  for (const entry of live.log) {
    assert.equal(entry.message.includes('[object Object]'), false,
      `no entry serialises the receipt into its sentence — read ${JSON.stringify(entry.message)}`);
  }
  assert.equal(read(store, repaired), 3,
    `and the edit stands — read ${JSON.stringify(read(store, repaired))}`);
  t.diagnostic(`ORC-2 · THE BARE RECEIPT: the repair returned \`{ok: true, op: <WriteRecord ${JSON.stringify(
    Object.keys(receipt))}>}\`; \`appliedRepairs\` = ${JSON.stringify([...live.appliedRepairs])}; \`report.ops\` = `
    + `${JSON.stringify(opIdsOf(report.value.ops))} (the journal op ${JSON.stringify(receipt.op.opId)} and never `
    + `the receipt); the entry names ${JSON.stringify(runs[0].opId)}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-3` · THE OP, STILL LAWFUL — AND NOT THE CARRIER: the guide's spelling and a FOREIGN op reach ONE arm
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-3 · THE OP, STILL LAWFUL — AND NOT THE CARRIER: `{ok: true, op: <the op it landed>}` (the guide\'s spelling) is credited, and `{ok: true, op: <an op it never landed>}` is credited TOO, with no entry and no refusal naming that id', (t) => {
  const readings = [];
  for (const arm of ['landed', 'foreign']) {
    const store = make();
    const address = [`orc3-${arm}-a`];
    const repaired = [`orc3-${arm}-b`];
    let repairs = 0;
    let landed = null;
    let named = null;
    let attemptRef = null;
    let live = null; // the attempt's own record, taken while it is live (see `ORC-1`'s clause)
    let firstOpId = null;
    store.addConstraint({ address, id: `orc3-${arm}` }, shield((context) => {
      if (context.attempt !== null) {
        attemptRef = context.attempt;
        live = kernelFor(store).live.get(context.attempt.id);
        firstOpId = context.op === null ? firstOpId : context.op.opId;
      }
      if (context.value !== 2) return true;
      return {
        message: 'the landed value is not one this pair admits',
        repair: (rctx) => {
          repairs += 1;
          landed = store.write(repaired, 'mem', 3, rctx).op;
          // **THE FOREIGN ARM NAMES AN IDENTITY THE KERNEL NEVER LANDED** — a string-named `op`, which the retired
          // `landedOp`/`landedOpDefect` pair refused by name and which `D-105` reads nowhere at all.
          named = arm === 'landed' ? landed : { opId: `not-the-op-${arm}-landed` };
          return { ok: true, op: named };
        },
      };
    }));
    const written = captured(() => store.write(address, 'mem', 2));
    assert.equal(live !== null && typeof live === 'object', true,
      'the pair must have been asked by the write\'s pass, so that the attempt\'s own record stood in the kernel record\'s LIVE map when the body met it — a null here means the drive never reached its arm');
    const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));
    assert.equal(written.threw, false,
      `${arm}: **THE WRITE MUST COMPLETE** — the ruling credits the return whatever its \`op\` names — read `
      + JSON.stringify(shapeOf(written.thrown)));
    assert.deepEqual([...live.appliedRepairs], [`orc3-${arm}`],
      `${arm}: the pair's mark is taken — read ${JSON.stringify([...live.appliedRepairs])}`);
    assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId, landed.opId],
      `${arm}: and the pins are the LEG's op — read ${JSON.stringify(opIdsOf(report.value.ops))}`);
    const runs = live.log.filter((entry) => entry.kind === 'repair-run');
    assert.equal(runs[0].opId, landed.opId,
      `${arm}: the entry names the landing — read ${JSON.stringify(runs[0].opId)}`);
    if (arm === 'foreign') {
      // **AND THE RETIRED IDENTITY GROUND'S TWO SENTENCES ARE GONE FROM THE PATH (§5.2's deletions):**
      assert.equal(live.log.some((entry) => entry.message.includes(named.opId)), false,
        'foreign: **NO ENTRY NAMES THE ID THE RETURN CARRIED** — `landedOpDefect`\'s sentences are withdrawn and '
        + `\`landedOp\` is not read on this path — read ${JSON.stringify(live.log.map((entry) => entry.message))}`);
      assert.equal(named.opId === landed.opId, false,
        'foreign: and the two identities really are two, so the assertion above pins the absence');
      assert.equal(firstOpId !== null, true, 'foreign: the invocation\'s own op identity was read too');
    }
    readings.push({ arm, named: named.opId, landed: landed.opId, credited: [...live.appliedRepairs] });
  }
  t.diagnostic(`ORC-3 · THE OP, STILL LAWFUL: ${JSON.stringify(readings)} — both arms credited, the pins the `
    + 'leg\'s, and the FOREIGN id named by no entry: the retired identity ground read back in would have refused '
    + 'the second arm (`landedOp`\'s membership + ordinal, `§4 RB-4`\'s retirement)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-4` · THE DECLARED FAILED ARM — the caller's words, nothing merged, and the edit's fate is the ADDRESS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-4 · THE DECLARED FAILED ARM — a repair that lands 3 at `[\'b\']` and then answers `{ok: false, message}` fails the write with the caller\'s EXACT words, `pending` gains nothing, `report.ops` is the commit\'s op alone, and the beside edit STANDS', (t) => {
  const store = make();
  const address = ['orc4-a'];
  const beside = ['orc4-b'];
  const CALLERS_WORDS = 'this repair refuses what it did';
  // **A LISTENER AT THE BESIDE ADDRESS, WHICH THE REPAIR'S WRITE RETURNS** — so "`pending` gains no repair
  // element" is a DISCRIMINATING reading: if this arm merged before returning, this handle would stand in the
  // member the caller loops over (`A112`).
  const handle = `orc4-listener-${process.pid.toString(36)}`;
  store.listen(handle, [beside]);
  store.register(handle, () => {});
  let repairs = 0;
  let landed = null;
  let repairReturned = null;
  let attemptRef = null;
  // **THE ATTEMPT'S OWN RECORD, TAKEN WHILE IT IS LIVE** — `D-58` retains no log and no open member on a closed
  // record, so `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue are
  // read off THIS object, and the terminal arm only removes it from the map, not from the drive's reference.
  let live = null;
  store.addConstraint({ address, id: 'orc4' }, shield((context) => {
    if (context.attempt !== null) {
      attemptRef = context.attempt;
      live = kernelFor(store).live.get(context.attempt.id);
    }
    if (context.value !== 2) return true;
    return {
      message: 'the landed value is not one this pair admits',
      repair: (rctx) => {
        repairs += 1;
        const answer = store.write(beside, 'mem', 3, rctx);
        landed = answer.op;
        // **THE WRITE'S OWN RETURNED SET, TAKEN AT THE INSTANT IT ANSWERED** — the premise the `pending` reading
        // below discriminates on.
        repairReturned = handlesOf(answer.triggered);
        return { ok: false, message: CALLERS_WORDS };
      },
    };
  }));
  const written = captured(() => store.write(address, 'mem', 2));
  const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  assert.equal(landed === null ? null : typeof landed.opId, 'string',
    'and its edit landed BEFORE the return, which is the arm\'s whole point');
  assert.equal(written.threw, true,
    '**THE WRITE FAILS — the declared failed arm still fails** (`D-105` item `4`) — the call returned');
  assert.deepEqual(Object.keys(written.thrown).sort(), ['address', 'log', 'message', 'status'],
    `the crossed form is the declared four members — read ${JSON.stringify(Object.keys(written.thrown))}`);
  assert.equal(written.thrown.status, 'ConstraintPassRefused',
    `the store set's rank-20 member is the write's refusal (\`fail-surface.md\` §5.4) — read `
    + JSON.stringify(written.thrown.status));
  assert.equal(written.thrown.message, CALLERS_WORDS,
    '**AND THE MESSAGE IS THE CALLER\'S WORDS, VERBATIM** (`§1.1 CT-2` step 2) — read '
    + JSON.stringify(written.thrown.message));
  assert.deepEqual([...live.appliedRepairs], [],
    '**NOTHING IS CREDITED** — the arm returns before the mark — read '
    + JSON.stringify([...live.appliedRepairs]));
  assert.deepEqual(handlesOf(live.record.pending), [],
    '**AND `PENDING` GAINS NO REPAIR ELEMENT** — the merge seat stands after the credit and this arm never '
    + 'reaches it, so the listener the repair\'s OWN write returned stands nowhere in the member the caller '
    + `loops over (\`A112\`; \`§1.1 CT-2\` step 2) — read ${JSON.stringify(handlesOf(live.record.pending))}`);
  assert.equal(Array.isArray(repairReturned) && repairReturned.includes(handle), true,
    '**AND THE PREMISE IS MEASURED: THE REPAIR\'S WRITE DID RETURN THAT HANDLE** — so a merge taken before this '
    + `arm would have put it in \`pending\` — read ${JSON.stringify(repairReturned)}`);
  assert.equal(report.threw, false,
    `\`K-5\` answers the retained record: it threw ${JSON.stringify(shapeOf(report.thrown))}`);
  assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId],
    '**AND `report.ops` CARRIES THE COMMIT\'S OP ALONE** (`§4 RB-5`: on a failing arm nothing is pinned) — read '
    + `${JSON.stringify(opIdsOf(report.value.ops))}`);
  assert.equal(report.value.ops.some((op) => op.opId === landed.opId), false,
    'so the repair\'s landed op stands in no member of the list');
  assert.equal(live.log.filter((entry) => entry.kind === 'repair-run')[0].message, CALLERS_WORDS,
    'and the `repair-run` entry\'s `message` is the caller\'s own — the entry is minted before the invocation, so '
    + '"nothing is appended" is true of the three MEMBERS and false of the LOG (`§1.1 CT-2` step 2)');
  assert.equal(read(store, address), '<AddressNotFound>',
    'and the attempt\'s own address is restored to the state it found — read '
    + JSON.stringify(read(store, address)));
  assert.equal(read(store, beside), 3,
    '**WHILE THE BESIDE EDIT STANDS** — `[\'b\']` is at no address an attempt op named (`D-89`) — read '
    + JSON.stringify(read(store, beside)));
  t.diagnostic(`ORC-4 · THE DECLARED FAILED ARM: the write threw ${JSON.stringify(written.thrown.status)} · `
    + `${JSON.stringify(written.thrown.message)}; \`appliedRepairs\` = `
    + `${JSON.stringify([...live.appliedRepairs])}; \`pending\` = ${JSON.stringify(live.record.pending)}; `
    + `\`report.ops\` = ${JSON.stringify(opIdsOf(report.value.ops))}; the beside edit at `
    + `${JSON.stringify(read(store, beside))} and the attempt's address at `
    + `${JSON.stringify(read(store, address))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-5` · THE RESIDUAL `KC-4` — four drives, four absent arms of `repairLegs`, ONE template (§1.1 `CT-2`
// step 5; §5.1)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-5 · THE RESIDUAL `KC-4` — a repair that writes nothing · the three-position (nested) route · a store whose `REPAIR_LEG` channel was read away · a store whose `EXTERNAL_CALL` channel was read away: FOUR arms, ONE residual template naming the ATTEMPT\'s address', (t) => {
  const REPAIR_LEG = Symbol.for('provident-storeroom.repair-leg');
  const EXTERNAL_CALL = Symbol.for('provident-storeroom.external-call');
  const DRIVES = [
    {
      label: 'a repair that writes NOTHING and answers `{ok: true}` (the non-array/empty arm of the read)',
      install: () => {},
      repair: () => ({ ok: true }),
    },
    {
      // **THE NESTED-ATTEMPT GUARD, ALONE**: three positions, naming nothing, so the write opens a commit of its
      // own and `kernel.attempts` MOVES across the invocation.
      label: 'the THREE-position route — a nested attempt opened across the invocation',
      install: () => {},
      repair: (store, beside) => { store.write(beside, 'mem', 3); },
    },
    {
      // **THE CHANNEL'S ABSENCE, ALONE**: the write NAMES its commit (four positions, no nested attempt) and the
      // channel is gone, so `repairLegs` answers `[]` on its `typeof channel !== 'function'` arm.
      label: 'a store whose `REPAIR_LEG` channel was read away (a four-position write, so no nested attempt)',
      install: (store) => Object.defineProperty(store, REPAIR_LEG, {
        value: undefined, writable: true, enumerable: false, configurable: true,
      }),
      repair: (store, beside, rctx) => { store.write(beside, 'mem', 3, rctx); },
    },
    {
      // **THE BRACKET, ALONE**: the channel stands but the invocation is never bracketed (`repairInCommit` takes
      // its `run()` fallback), so nothing was appended and the read answers `[]` — the arm whose clause says *"a
      // bare read of the leg channel would answer a PREVIOUS invocation's legs"*.
      label: 'a store whose `EXTERNAL_CALL` channel was read away (a four-position write, so no nested attempt)',
      install: (store) => Object.defineProperty(store, EXTERNAL_CALL, {
        value: undefined, writable: true, enumerable: false, configurable: true,
      }),
      repair: (store, beside, rctx) => { store.write(beside, 'mem', 3, rctx); },
    },
  ];
  const readings = [];
  for (const drive of DRIVES) {
    const store = make();
    const address = ['orc5-a'];
    const beside = ['orc5-b'];
    drive.install(store);
    let repairs = 0;
    let attemptRef = null;
    let live = null; // the attempt's own record, taken while it is live (see `ORC-1`'s clause)
    store.addConstraint({ address, id: 'orc5' }, shield((context) => {
      if (context.attempt !== null) {
        attemptRef = context.attempt;
        live = kernelFor(store).live.get(context.attempt.id);
      }
      if (context.value !== 2) return true;
      return {
        message: 'the landed value is not one this pair admits',
        repair: (rctx) => {
          repairs += 1;
          drive.repair(store, beside, rctx);
        },
      };
    }));
    const written = captured(() => store.write(address, 'mem', 2));
    assert.equal(live !== null && typeof live === 'object', true,
      'the pair must have been asked by the write\'s pass, so that the attempt\'s own record stood in the kernel record\'s LIVE map when the body met it — a null here means the drive never reached its arm');
    assert.equal(repairs, 1, `${drive.label}: the repair ran ONCE — read ${repairs}`);
    assert.equal(written.threw, true,
      `${drive.label}: **THE WRITE FAILS** — the invocation landed no op this commit can name`);
    assert.equal(written.thrown.status, 'ConstraintPassRefused',
      `${drive.label}: with the store set's refusal code — read ${JSON.stringify(written.thrown.status)}`);
    assert.equal(written.thrown.message, `the repair orc5 produced no op at ${address.join('/')}`,
      `${drive.label}: **AND THE RESIDUAL TEMPLATE, BYTE-FOR-BYTE, NAMING THE ATTEMPT\'S ADDRESS** `
      + `(\`§5.1\`, kept unedited) — read ${JSON.stringify(written.thrown.message)}`);
    const outcomes = live.log.filter((entry) => entry.kind === 'outcome');
    assert.equal(outcomes.length, 1, `${drive.label}: ONE \`outcome\` entry, as every failing arm has`);
    assert.equal(outcomes[0].message, written.thrown.message,
      `${drive.label}: and the log's entry carries the same sentence the caller was handed`);
    assert.deepEqual([...live.appliedRepairs], [],
      `${drive.label}: and nothing is credited — read ${JSON.stringify([...live.appliedRepairs])}`);
    assert.equal(read(store, address), '<AddressNotFound>',
      `${drive.label}: so the attempt's own address is restored, the invocation having landed nothing of it`);
    readings.push({
      arm: drive.label,
      status: written.thrown.status,
      message: written.thrown.message,
      beside: read(store, beside),
    });
  }
  assert.equal(new Set(readings.map((reading) => reading.message)).size, 1,
    '**AND THE FOUR ARMS ANSWER ONE SENTENCE** — one token, one template, and only the ADDRESS inside it differs '
    + `by attempt — read ${JSON.stringify(readings.map((reading) => reading.message))}`);
  t.diagnostic(`ORC-5 · THE RESIDUAL KC-4: ${JSON.stringify(readings)} — four absent arms of \`repairLegs\`, one `
    + 'arm `(d2)`, each naming the attempt\'s address; the beside write of the three drives that LANDED one stands '
    + '(no attempt op named its address)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-6` · THE REPAIR'S EDIT'S TRIGGERED PAIR IS ASKED — once more, at the re-run, at the repair's op and the
// value it landed (§3.3 `JN-1`–`JN-3`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-6 · THE REPAIR\'S EDIT\'S TRIGGERED PAIR IS ASKED — exactly ONCE MORE, at the re-run, against the repair\'s op and the value it landed; a pair at an untouched address is not asked at all', (t) => {
  const store = make();
  const address = ['orc6-a'];
  const repaired = ['orc6-b'];
  const untouched = ['orc6-c'];
  const asks = [];
  let repairs = 0;
  let landed = null;
  store.addConstraint({ address, id: 'orc6' }, shield((context) => {
    if (context.value !== 2) {
      asks.push({ pair: 'orc6', opId: context.op === null ? null : context.op.opId, value: context.value });
      return true;
    }
    return {
      message: 'the landed value is not one this pair admits',
      repair: (rctx) => { repairs += 1; landed = store.write(repaired, 'mem', 3, rctx).op; },
    };
  }));
  // **THE COUNTING PAIR AT THE REPAIR'S LANDING ADDRESS** — not in the commit's write's returned set, so its only
  // appearance in the pass is the JOIN this cell exists for.
  store.addConstraint({ address: repaired, id: 'at-repair' }, shield((context) => {
    asks.push({ pair: 'at-repair', opId: context.op === null ? null : context.op.opId, value: context.value });
    return true;
  }));
  store.addConstraint({ address: untouched, id: 'elsewhere' }, shield((context) => {
    asks.push({ pair: 'elsewhere', opId: context.op === null ? null : context.op.opId, value: context.value });
    return true;
  }));
  const written = captured(() => store.write(address, 'mem', 2));
  assert.equal(written.threw, false,
    `the drive must PASS: it threw ${JSON.stringify(shapeOf(written.thrown))}`);
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  const passAsks = asks.filter((ask) => ask.opId !== null);
  const atRepair = passAsks.filter((ask) => ask.pair === 'at-repair');
  assert.equal(atRepair.length, 1,
    '**THE PAIR AT THE REPAIR\'S LANDING ADDRESS IS ASKED EXACTLY ONCE MORE THAN ITS REGISTRATION** — the '
    + 'registration instant is the shield\'s and is not recorded here, so this list is the pass\'s own asks and '
    + `it holds ONE (\`§7.1\`: "asked exactly once more") — read ${JSON.stringify(atRepair)}`);
  assert.deepEqual(atRepair[0], { pair: 'at-repair', opId: landed.opId, value: 3 },
    '**AND THAT ONE ASK IS AT THE RE-RUN, AGAINST THE REPAIR\'S OP AND THE VALUE IT LANDED** (`§3.3 JN-2`) — '
    + 'read ' + JSON.stringify(atRepair[0]));
  assert.equal(passAsks.filter((ask) => ask.pair === 'elsewhere').length, 0,
    '**AND THE PAIR AT AN ADDRESS THE REPAIR NEVER TOUCHED IS NOT ASKED AT ALL** — the join widens membership by '
    + `the LEG's handles and never by the registry — read ${JSON.stringify(passAsks.map((ask) => ask.pair))}`);
  assert.equal(read(store, repaired), 3,
    `and the repair's edit stands — read ${JSON.stringify(read(store, repaired))}`);
  t.diagnostic(`ORC-6 · THE JOINED ASK: the repair landed ${JSON.stringify(landed.opId)} at `
    + `${JSON.stringify(repaired)}; the asks taken at an op were ${JSON.stringify(passAsks)} — the `
    + '`at-repair` pair once MORE than its registration, at the repair\'s op and 3, and the `elsewhere` pair not at '
    + 'all. **A pass that asks every registered pair fails the second reading; a pass that asks nothing fails the '
    + 'first**');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-7` · THE REPAIR'S EDIT'S TRIGGERED LISTENER — the `1.8.1` subject re-asserted at the op-free shape
// (§3.4; `D-104` item `2`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-7 · THE REPAIR\'S EDIT\'S TRIGGERED LISTENER — a listener bound at the repair\'s address is invoked ONCE, AFTER the pass, and `pending` carries ONE element for it', (t) => {
  const store = make();
  const address = ['orc7-a'];
  const repaired = ['orc7-b'];
  store.write(address, 'mem', 1);
  store.write(repaired, 'mem', 1);
  const seen = [];
  const handle = `orc7-listener-${process.pid.toString(36)}`;
  const answered = store.listen(handle, [repaired]);
  store.register(answered, (triggeringAddress) => seen.push(triggeringAddress));
  seen.length = 0; // the seed write above is not this cell's subject
  let repairs = 0;
  let ranAgain = false; // set by the RE-RUN's ask, and read by the listener: the ordering evidence
  let repairReturned = null;
  kernelRegister(store, address, 'orc7', shield((context) => {
    if (context.value !== 2) {
      ranAgain = true;
      return true;
    }
    return {
      message: 'the landed value is not one this pair admits',
      // **OP-FREE, ON THE SUPPORTED ROUTE** — the shape this cell re-asserts the `1.8.1` delivery at.
      repair: (rctx) => {
        repairs += 1;
        repairReturned = handlesOf(store.write(repaired, 'mem', 3, rctx).triggered);
      },
    };
  }));
  const record = kernelCommit(store, address, 'mem', 2);
  const outcome = captured(() => kernelRunAttempt(store, record));
  assert.equal(outcome.threw, false,
    `the attempt must RESOLVE — the op-free repair is credited: it threw ${JSON.stringify(shapeOf(outcome.thrown))}`);
  assert.equal(outcome.value.outcome, 'passed',
    `and its outcome is the pass arm — read ${JSON.stringify(outcome.value.outcome)}`);
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  assert.equal(Array.isArray(repairReturned) && repairReturned.includes(handle), true,
    '**THE REPAIR\'S WRITE RETURNED THE LISTENER\'S HANDLE — the premise of the whole cell** — read '
    + JSON.stringify(repairReturned));
  assert.equal(seen.length, 1,
    '**THE LISTENER IS INVOKED EXACTLY ONCE** (`D-104` item `2`: *"The repair\'s write\'s listeners ARE delivered — '
    + 'in the COMMIT\'s delivery, after the pass"*): read ' + `${seen.length} invocation(s)`);
  assert.deepEqual(seen[0], repaired,
    'and the invocation\'s ONE argument is the triggering address (`PAR-JS-12`) — read ' + JSON.stringify(seen[0]));
  assert.equal(ranAgain, true,
    '**AND THE INVOCATION STANDS AFTER THE PASS** — the mark the pair\'s own re-run set is what the listener '
    + 'read, so the pass\'s second evaluation had happened before the body was reached');
  assert.deepEqual(handlesOf(record.pending), [handle],
    '**`pending` CARRIES ONE ELEMENT FOR IT AND NOTHING ELSE ON THIS COMMIT** (`§3.4`; `1.8.1` §4) — read '
    + JSON.stringify(handlesOf(record.pending)));
  assert.deepEqual(record.pending.map((entry) => entry.address), [repaired],
    'and the element\'s `address` is the address the listener was BOUND at — read '
    + JSON.stringify(record.pending.map((entry) => entry.address)));
  assert.equal(handlesOf(record.triggered).includes(handle), false,
    '**AND `triggered` IS UNMOVED**: it stays the store\'s own returned set for the COMMIT\'s write, VERBATIM '
    + `(\`A113\` (D1); \`§3.2\`) — read ${JSON.stringify(handlesOf(record.triggered))}`);
  t.diagnostic(`ORC-7 · THE LISTENER AT THE OP-FREE SHAPE: the repair wrote ${JSON.stringify(repaired)} and its `
    + `returned set read ${JSON.stringify(repairReturned)}; the listener was invoked ${seen.length}× with `
    + `${JSON.stringify(seen)} after the re-run (${ranAgain}); \`pending\` = `
    + `${JSON.stringify(handlesOf(record.pending))} and \`triggered\` = `
    + `${JSON.stringify(handlesOf(record.triggered))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-8` · THE FLOOR CALL'S UNDO ON A FAILING ARM — the repair's op is in `report.ops` AND in the one call's
// `undoneOps`, and the address answers its pre-attempt state (§4 `RB-2`, `RB-3`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-8 · THE FLOOR CALL\'S UNDO ON A FAILING ARM — an op-free repair lands 3 under the attempt\'s address, a SECOND pair refuses at the re-run, and the repair\'s op IS in `report.ops` and IS in the floor call\'s `undoneOps`', (t) => {
  const store = make();
  const address = ['orc8-a'];
  const child = ['orc8-a', 'child'];
  store.write(address, 'mem', {}); // the parent link the descendant write needs
  let repairs = 0;
  let landed = null;
  let attemptRef = null;
  // **THE ATTEMPT'S OWN RECORD, TAKEN WHILE IT IS LIVE** — `D-58` retains no log and no open member on a closed
  // record, so `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue are
  // read off THIS object, and the terminal arm only removes it from the map, not from the drive's reference.
  let live = null;
  store.addConstraint({ address, id: 'repairs-it' }, shield((context) => {
    if (context.attempt !== null) {
      attemptRef = context.attempt;
      live = kernelFor(store).live.get(context.attempt.id);
    }
    const atCommit = context.op !== null && context.op.address.length === 1 && context.value !== null
      && typeof context.value === 'object';
    if (!atCommit) return true;
    return {
      message: 'the container must carry a repaired child',
      repair: (rctx) => { repairs += 1; landed = store.write(child, 'mem', 3, rctx).op; },
    };
  }));
  store.addConstraint({ address, id: 'refuses-the-landing' }, shield((context) => (
    context.value === 3 && context.op !== null && context.op.address.length === 2
      ? { message: 'the child must not be 3' }
      : true
  )));
  const written = captured(() => store.write(address, 'mem', {}));
  assert.equal(live !== null && typeof live === 'object', true,
    'the pair must have been asked by the write\'s pass, so that the attempt\'s own record stood in the kernel record\'s LIVE map when the body met it — a null here means the drive never reached its arm');
  const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  assert.equal(landed === null ? null : typeof landed.opId, 'string',
    `and its edit landed a journal op — read ${JSON.stringify(landed && landed.opId)}`);
  assert.equal(written.threw, true,
    '**THE ATTEMPT FAILS AT THE RE-RUN** — the second pair refuses the state the repair left');
  assert.equal(written.thrown.status, 'ConstraintPassRefused',
    `with the store set's refusal code — read ${JSON.stringify(written.thrown.status)}`);
  assert.equal(report.threw, false,
    `\`K-5\` answers the retained record: it threw ${JSON.stringify(shapeOf(report.thrown))}`);
  assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId, landed.opId],
    '**THE REPAIR\'S OP IS IN `report.ops`** — the credit appended it and the list is the commit\'s own record '
    + `(\`§4 RB-3\`) — read ${JSON.stringify(opIdsOf(report.value.ops))}`);
  assert.equal(report.value.rollback.length >= 1, true,
    `the failing arm composes a floor call — read ${report.value.rollback.length} step(s)`);
  const swept = report.value.rollback.some((step) => step.undoneOps.includes(landed.opId));
  assert.equal(swept, true,
    '**AND THE REPAIR\'S OP IS IN THE FLOOR CALL\'S `undoneOps`** — the write lies UNDER the attempt\'s own '
    + `address, so the call at that address reaches it (\`D-89\`, \`§4 RB-2\`) — read `
    + JSON.stringify(report.value.rollback.map((step) => step.undoneOps)));
  assert.equal(read(store, child), '<AddressNotFound>',
    '**SO THE ADDRESS ANSWERS ITS PRE-ATTEMPT STATE** — it stood nowhere before the attempt — read '
    + JSON.stringify(read(store, child)));
  assert.deepEqual(read(store, address), {},
    'while the attempt\'s own landing is restored to the container the caller committed — read '
    + JSON.stringify(read(store, address)));
  t.diagnostic(`ORC-8 · THE FLOOR CALL'S UNDO: the op-free repair landed ${JSON.stringify(landed.opId)} at `
    + `${JSON.stringify(child)}; the second pair refused the re-run and the write threw `
    + `${JSON.stringify(written.thrown.status)}; \`report.ops\` = `
    + `${JSON.stringify(opIdsOf(report.value.ops))}; the plan's \`undoneOps\` = `
    + `${JSON.stringify(report.value.rollback.map((step) => step.undoneOps))}; the child reads `
    + `${JSON.stringify(read(store, child))}. **A credit that appends no op would leave the child standing**`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `ORC-9` · THE DELETE-SHAPED REPAIR IS NOT CREDITED — `delete` has NO commit position (§8.3 `Q-6`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ORC-9 · THE DELETE-SHAPED REPAIR IS NOT CREDITED — a repair whose only edit is `store.delete(address)` and which returns nothing fails `KC-4` with the residual template, and `report.ops` is unchanged', (t) => {
  const store = make();
  const address = ['orc9-a'];
  const doomed = ['orc9-b'];
  store.write(doomed, 'mem', 9);
  let repairs = 0;
  let attemptRef = null;
  // **THE ATTEMPT'S OWN RECORD, TAKEN WHILE IT IS LIVE** — `D-58` retains no log and no open member on a closed
  // record, so `appliedRepairs`, `ran`, the attempt's `ops`, its `log` and the `pending`/`triggered` residue are
  // read off THIS object, and the terminal arm only removes it from the map, not from the drive's reference.
  let live = null;
  store.addConstraint({ address, id: 'orc9' }, shield((context) => {
    if (context.attempt !== null) {
      attemptRef = context.attempt;
      live = kernelFor(store).live.get(context.attempt.id);
    }
    if (context.value !== 2) return true;
    return {
      message: 'the landed value is not one this pair admits',
      // **`delete`'S DECLARED ARITY IS `delete(address, tier?)`** (`index.mjs:564`; `index.d.ts:936`) — it has NO
      // commit position, so this repair cannot be on `D-103`'s supported route at all, and its delete opens a
      // commit of its own.
      repair: () => {
        repairs += 1;
        store.delete(doomed);
      },
    };
  }));
  const written = captured(() => store.write(address, 'mem', 2));
  assert.equal(live !== null && typeof live === 'object', true,
    'the pair must have been asked by the write\'s pass, so that the attempt\'s own record stood in the kernel record\'s LIVE map when the body met it — a null here means the drive never reached its arm');
  const report = attemptRef === null ? null : captured(() => kernelReport(store, attemptRef));
  assert.equal(repairs, 1, `the repair ran once — read ${repairs}`);
  assert.equal(written.threw, true,
    '**THE ENCLOSING WRITE FAILS** — a leg is minted for a WRITE that names its commit, and a deletion names '
    + 'none (`Q-6`)');
  assert.equal(written.thrown.status, 'ConstraintPassRefused',
    `with the store set's refusal code — read ${JSON.stringify(written.thrown.status)}`);
  assert.equal(written.thrown.message, `the repair orc9 produced no op at ${address.join('/')}`,
    '**AND THE RESIDUAL TEMPLATE, NAMING THE ATTEMPT\'S ADDRESS** (`§5.1`) — read '
    + JSON.stringify(written.thrown.message));
  assert.deepEqual([...live.appliedRepairs], [],
    'and no mark is taken — read ' + JSON.stringify([...live.appliedRepairs]));
  assert.equal(report.threw, false,
    `\`K-5\` answers the retained record: it threw ${JSON.stringify(shapeOf(report.thrown))}`);
  assert.deepEqual(opIdsOf(report.value.ops), [live.ops[0].opId],
    '**AND `report.ops` IS UNCHANGED** — the attempt\'s own op alone, because the deletion opened its own commit '
    + `and pinned nothing here — read ${JSON.stringify(opIdsOf(report.value.ops))}`);
  assert.equal(live.log.filter((entry) => entry.kind === 'commit').length, 1,
    'while the deletion\'s OWN commit stands in the log as its own entry — read '
    + JSON.stringify(live.log.map((entry) => entry.kind)));
  assert.equal(read(store, address), '<AddressNotFound>',
    'and the attempt\'s own address is restored — read ' + JSON.stringify(read(store, address)));
  assert.equal(read(store, doomed), '<AddressNotFound>',
    '**AND THE DELETION ITSELF STANDS** — it is another commit\'s edit, at an address no enclosing attempt op '
    + `named (\`D-89\`), which is exactly the hole \`Q-6\` prints — read ${JSON.stringify(read(store, doomed))}`);
  t.diagnostic(`ORC-9 · THE DELETE-SHAPED REPAIR: the repair deleted ${JSON.stringify(doomed)} and returned `
    + `nothing; the write threw ${JSON.stringify(written.thrown.status)} · `
    + `${JSON.stringify(written.thrown.message)}; \`report.ops\` = `
    + `${JSON.stringify(opIdsOf(report.value.ops))}; the doomed address reads `
    + `${JSON.stringify(read(store, doomed))} — the deletion's own commit, standing beside a refused attempt`);
});
