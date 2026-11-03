// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE REFUSED REVERSAL'S RESTORE — THE TIER IT STOOD AT, THE ABSENT CASES, AND THE JUDGEMENT THAT THREW
//
// **WHAT THESE THREE CELLS ARE FOR, AND THE DEFECT THEY WERE WRITTEN AGAINST.** `strata/decisions.md` · `D-41`
// item `2` (2026-10-26) recorded the downstream consumer's measurement: the compensating restore of a refused
// reversal **cleared every tier and rewrote the captured standing at `mem`** — so **a `file`-tier value was
// DESTROYED by a REFUSAL that then told the consumer every address *"stands again at its pre-reversal state"*** —
// and **where the terminal standing was ABSENT the restore could not succeed at `200` of `200`**, `src/store.rs`'s
// `delete` answering `AddressNotFound` at a key holding no anchor, so the captured value was never written while
// the refusal still carried a sentence about the reversal. Item `4` of the same ruling records the two smaller
// findings these cells also pin: **a body that THREW at the judgement refused with `log: []` and NO UNDO**, and a
// **fabricated `seq: 1`** in the refused-reversal log entry.
//
// **THE DECLARED ANSWERS THESE CELLS ASSERT AGAINST — LITERALS HERE, CITATIONS IN COMMENTS** (`D-17`: no
// `docs/**` path is opened at runtime):
//   * **`bindings/js/src/entry/constraints.mjs`'s `reversalWatch` CAPTURES THE TIER** — every tier at which the
//     watched address stood, with that tier's own value — and **`restoreReversal` PUTS BACK EXACTLY WHAT STOOD,
//     the same value at the same tier, and does not clear a tier it cannot repopulate**;
//   * **where the pre-reversal state was ABSENT, the restore REMOVES what the reversal left**, so the address is
//     absent again;
//   * **a judgement that cannot complete FAILS CLOSED**: the reversal is restored and the call refuses with a log
//     that NAMES THE THROWING PAIR;
//   * **the refusal's log entry carries NO `seq`** — and from 2026-10-28 that is the KERNEL'S OWN SHAPE at every
//     arm, not only this one: **`D-65` removed the member and the array index IS the position**
//     (`strata/decisions.md`), so no `1` is minted here and none stands anywhere. (This item was re-derived to
//     *"carries `seq` `1`"* on `D-48` · `DEF-AI` in between; that reading is RETIRED with the member, and the
//     entry's five members — `kind` · `id` · `message` · `opId` · `state` — are what every arm now carries.);
//   * **a LAWFUL reversal is unchanged, member for member** — `{opId, undoneOps, restoredTo}`, no throw — **and from
//     2026-11-02 it CARRIES its judgement's list at `record.log`** (`D-119`; the header bullet's *"no log"* is
//     WITHDRAWN BY NAME at the cell's own clause below, and the record's three DECLARED members are unmoved).
//
// **D-21.** Every cell prints what it read at its own `t.diagnostic`, including both sides of each arm, so a red
// reports the readings and not a verdict. **D-35/D-36.** No cell here is a client-scope hardening cell: the
// receiver, `Array.prototype` vandalism and the crossing's prototype boundary are other files' subjects.
//
// **⟶ AMENDED 2026-10-27 (THE ARCHITECT'S RULING, ANNOTATE-BESIDE): THE RESTORE IS THE STORE'S OWN, AND THE TWO
// SHAPES THE CAPTURE COULD NOT REACH ARE THE TWO CELLS THIS FILE NOW ENDS WITH.** `restoreReversal` no longer
// writes anything address by address: it calls the store's journal mark restore (`restoreMark`) ONCE and then
// VERIFIES each address the reversal moved against the capture. **Every clause above still stands and is read
// through this one**, with one arm superseded by measurement: **ARM (C) of the absent-case cell**, which pinned
// *"a restore that cannot be taken"* — the reversal removed the address's PARENT, so the compensating WRITE could
// not land. A journal replay re-states the parent too, so that arm now stands the address again and the arm's
// assertion is the restoral; the honest limb the arm existed for is not reachable through a consumer call any
// more and says so where it is now decided (`undoSpelling`'s store-refusal limb, and the store's own
// `s6_6_an_unknown_mark_refuses_journal_op_unknown_and_changes_nothing` for the one input that reaches it).
// **THE TWO NEW CELLS ARE THE ONES THIS RULING EXISTS FOR:** a MIXED-DEPTH SHADOW (a subtree standing at
// different tiers at different depths — unreachable by a per-address, per-tier capture) and the HIGHER-TIER/
// PARENT case (a `file` version whose parent the reversal left at `mem` — a write the store refuses outright).
// Each prints its readings PER ADDRESS AND PER TIER, and each was shown to bite by a `/tmp` revert.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';

/** The store's three tier tokens, in its own canonical order (`file` > `mem` > `temp`). */
const TIERS = ['file', 'mem', 'temp'];

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/**
 * **WHAT THE STORE STANDS AT ONE ADDRESS — THE CROSS-TIER VALUE THE PRODUCT'S OWN `read` ANSWERS, AND EACH TIER
 * NARROWED.** The tier readings are the whole of what these cells are about: the cross-tier read answers the
 * LOWEST-tier version present, so **it cannot tell `mem` `"second"` alone from a `file` `"durable"` version
 * shadowed beneath it** — which is exactly the difference the refusal used to destroy.
 */
function standing(store, address) {
  const perTier = {};
  for (const tier of TIERS) {
    const read = attempt(() => store.read(address, tier));
    perTier[tier] = read.ok
      ? { present: true, value: read.value }
      : { present: false, refused: read.caught.status };
  }
  const cross = attempt(() => store.read(address));
  return {
    cross: cross.ok ? { present: true, value: cross.value } : { present: false, refused: cross.caught.status },
    perTier,
  };
}

/** The tiers that STOOD at the address, in canonical order, with the value each answered. */
function stoodTiers(sample) {
  const stood = [];
  for (const tier of TIERS) {
    if (sample.perTier[tier].present === true) stood.push({ tier, value: sample.perTier[tier].value });
  }
  return stood;
}

/** A readable one-line rendering of a standing, for a diagnostic and for an assertion message. */
function describe(sample) {
  return JSON.stringify({
    cross: sample.cross.present ? sample.cross.value : `<${sample.cross.refused}>`,
    tiers: stoodTiers(sample).map((each) => `${each.tier}=${JSON.stringify(each.value)}`),
  });
}

/** A `file`-tier-capable store: the register's own tier is `file` where `filePath` is provided (`§1.3`). */
function makeFileStore() {
  const scratch = mkdtempSync(join(tmpdir(), 'psr-reversal-restore-'));
  return storeCreate({ journalLength: 16, listeners: [], filePath: join(scratch, 'store.json') });
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 — A `file`-TIER VALUE SURVIVES A REFUSED REVERSAL, AT ITS OWN TIER
//
// **THE HEADLINE FIX (`D-41` item `2`).** The restore cleared every tier and rewrote the value at `mem`, so a
// value that stood at `file` came back at `mem` — and a value SHADOWED at `file` beneath a `mem` version was
// DESTROYED outright, because the `mem` rewrite replaced the whole state the cross-tier read could see while the
// `file` version that stood beneath it was cleared and never written back. **BOTH ARMS ARE DRIVEN: the SHADOW
// (where a real, distinct `file`-tier VALUE is destroyed) and the `file`-ONLY state (where the TIER is).** And the
// lawful arm is driven beside them, so a cell that only proved the refusing arm could not be read as having
// changed the record a lawful reversal answers (`PAR-JS-9`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-41 · a refused reversal restores a `file`-tier value AT THE `file` TIER — a shadow` file` version and a `file`-only value each survive it — and a lawful reversal still answers `{opId, undoneOps, restoredTo}`', (t) => {
  // ── (1) THE SHADOW ARM. `file` `"durable"` is written first, then `mem` `"base"` and `mem` `"second"` — a write
  // purges only the versions it outranks (`src/store.rs`'s `W-6`), so the `file` version STANDS BENEATH the `mem`
  // one and the cross-tier read answers `"second"`. The reversal of the `"second"` write restores the `mem`
  // `"base"` and leaves the `file` version in place; the pair refuses `"base"`; and the restore must put BOTH the
  // `file` version and the `mem` `"second"` back.
  const store = makeFileStore();
  const durable = attempt(() => store.write(['a'], 'file', 'durable'));
  const base = attempt(() => store.write(['a'], 'mem', 'base'));
  const second = attempt(() => store.write(['a'], 'mem', 'second'));
  const shadowBefore = standing(store, ['a']);
  const shadowPair = attempt(() => store.addConstraint({ address: ['a'], id: 'file-pair' },
    (context) => (context.value === 'second' ? true : { message: 'this pair admits the second value alone' })));
  const shadowRollback = attempt(() => store.rollback(second.value.op.opId));
  const shadowAfter = standing(store, ['a']);
  const shadowLog = shadowRollback.ok === false && shadowRollback.caught !== null
    && typeof shadowRollback.caught === 'object' && Array.isArray(shadowRollback.caught.log)
    ? shadowRollback.caught.log
    : [];

  // ── (2) THE `file`-ONLY ARM. No `mem` version at all: the value stands at `file` alone, so the tier itself is
  // what the old restore destroyed (it wrote the value back at `mem`).
  const fileOnly = makeFileStore();
  const firstWrite = attempt(() => fileOnly.write(['a'], 'file', 5));
  const secondWrite = attempt(() => fileOnly.write(['a'], 'file', 9));
  const fileOnlyBefore = standing(fileOnly, ['a']);
  const filePair = attempt(() => fileOnly.addConstraint({ address: ['a'], id: 'file-only' },
    (context) => (context.value === 9 ? true : { message: 'this pair admits the second value alone' })));
  const fileRollback = attempt(() => fileOnly.rollback(secondWrite.value.op.opId));
  const fileOnlyAfter = standing(fileOnly, ['a']);
  const fileLog = fileRollback.ok === false && fileRollback.caught !== null
    && typeof fileRollback.caught === 'object' && Array.isArray(fileRollback.caught.log)
    ? fileRollback.caught.log
    : [];

  // ── (3) THE LAWFUL ARM. The same shape with a pair that admits everything this reversal can leave: the record
  // is the declared one, no throw, and **its `log` is PRESENT and `[]`** — re-derived 2026-11-02 (`D-119`): the
  // judgement appended nothing, and `[]` is that arm's honest value rather than the member being absent.
  const lawful = makeFileStore();
  lawful.write(['a'], 'file', 5);
  const lawfulSecond = lawful.write(['a'], 'file', 9);
  const lawfulPair = attempt(() => lawful.addConstraint({ address: ['a'], id: 'lawful-file' },
    (context) => (typeof context.value === 'number' ? true : { message: 'admits numbers' })));
  const lawfulRollback = attempt(() => lawful.rollback(lawfulSecond.op.opId));
  const lawfulAfter = standing(lawful, ['a']);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([shadowPair.ok, filePair.ok, lawfulPair.ok], [true, true, true],
    `all three pairs must REGISTER (each passes against the state standing at registration), or the arms are not `
      + `the arms this cell claims: shadow=${JSON.stringify(attempt(() => shadowPair))} `
      + `fileOnly=${JSON.stringify(attempt(() => filePair))} lawful=${JSON.stringify(attempt(() => lawfulPair))}`);
  for (const [name, written] of [['file "durable"', durable], ['mem "base"', base], ['mem "second"', second],
    ['file 5', firstWrite], ['file 9', secondWrite]]) {
    assert.equal(written.ok, true,
      `the drive's own setup write ${name} must land, or nothing below is measured: it caught `
        + `${JSON.stringify(written.caught)}`);
  }
  assert.deepEqual([shadowRollback.ok, fileRollback.ok], [false, false],
    `both refusing reversals must be REFUSED (\`D-38\`), or the restores below are never taken: shadow ok=`
      + `${shadowRollback.ok}, file-only ok=${fileRollback.ok}`);
  assert.equal(lawfulRollback.ok, true,
    `the LAWFUL arm's reversal must answer its record, or the arm beside the finding is not the control: it `
      + `caught ${JSON.stringify(lawfulRollback.caught)}`);

  // ── THE READINGS THE FINDING IS DECIDED ON, TAKEN BEFORE ANY ASSERTION ABOUT THEM. ──────────
  const shadowBeforeTiers = stoodTiers(shadowBefore);
  const shadowAfterTiers = stoodTiers(shadowAfter);
  const fileOnlyBeforeTiers = stoodTiers(fileOnlyBefore);
  const fileOnlyAfterTiers = stoodTiers(fileOnlyAfter);
  const lawfulAfterTiers = stoodTiers(lawfulAfter);

  // ── THE SHADOW ARM: THE `file` VERSION SURVIVES, AT `file`, AND THE `mem` VERSION IS THE PRE-REVERSAL ONE. ──
  assert.deepEqual(shadowBeforeTiers, [{ tier: 'file', value: 'durable' }, { tier: 'mem', value: 'second' }],
    `the drive must stand the PRE-REVERSAL shadow it claims — \`file\` \`"durable"\` beneath \`mem\` \`"second"\` — or `
      + `the refusal below destroyed nothing and this arm is vacuous. THE DRIVE READ ${describe(shadowBefore)}`);
  assert.deepEqual(shadowAfterTiers, shadowBeforeTiers,
    `THE FINDING: a refused reversal restores the address EXACTLY as it stood — \`D-41\` item \`2\`'s *"the same value `
      + `at the same tier"\` — so the \`file\`-tier value \`"durable"\` still STANDS AT \`file\` after the refusal and `
      + `is not cleared, and the \`mem\`-tier version is the pre-reversal \`"second"\`. The old restore cleared every `
      + `tier and wrote one value at \`mem\`, so a shadow's \`file\` version was DESTROYED while the log claimed the `
      + `reversal was undone. THE DRIVE READ before ${describe(shadowBefore)} and after ${describe(shadowAfter)}`);
  assert.equal(shadowAfter.perTier.file.present, true,
    `the \`file\` tier must still stand: THE DRIVE READ ${describe(shadowAfter)}`);
  assert.equal(shadowAfter.perTier.file.value, 'durable',
    `and it must hold the value that stood there before the reversal, not the value the reversal left: THE DRIVE `
      + `READ ${describe(shadowAfter)}`);
  assert.equal(shadowAfter.cross.value, 'second',
    `and the cross-tier read — the ONE route to state (\`§2.4\` item 9) — must answer the pre-reversal standing: `
      + `THE DRIVE READ ${describe(shadowAfter)}`);
  assert.equal(shadowRollback.caught.status, 'ConstraintPassRefused',
    `the refusal's status is the set's rank-\`20\` member and is unmoved by the restore: THE DRIVE READ `
      + `${JSON.stringify(shadowRollback.caught.status)}`);
  assert.equal(shadowLog.length, 1,
    `the refusal's log is ONE entry (\`contract.md §2.6\` item 4): THE DRIVE READ ${JSON.stringify(shadowLog)}`);
  assert.equal(typeof shadowLog[0].message === 'string' && /undone/i.test(shadowLog[0].message), true,
    `and it says the reversal was UNDONE — TRUE here, because every address it moved stands again exactly as it `
      + `stood: THE DRIVE READ ${JSON.stringify(shadowLog[0].message)}`);

  // ── THE `file`-ONLY ARM: THE TIER IS THE FINDING. ───────────────────────────────────────────
  assert.deepEqual(fileOnlyBeforeTiers, [{ tier: 'file', value: 9 }],
    `the value must stand at \`file\` ALONE before the reversal, or the tier is not what this arm measures: THE `
      + `DRIVE READ ${describe(fileOnlyBefore)}`);
  assert.deepEqual(fileOnlyAfterTiers, [{ tier: 'file', value: 9 }],
    `a \`file\`-only value survives a refused reversal AT \`file\`: the old restore wrote it back at \`mem\`, so the `
      + `store answered 9 while the \`file\` version was gone — a tier destroyed under a message that claimed a `
      + `restoration. THE DRIVE READ before ${describe(fileOnlyBefore)} and after ${describe(fileOnlyAfter)}`);
  assert.equal(fileOnlyAfter.perTier.mem.present, false,
    `and nothing was written at \`mem\`: the tier that stood is the tier restored, and no OTHER tier is minted: THE `
      + `DRIVE READ ${describe(fileOnlyAfter)}`);
  assert.equal(fileOnlyAfter.perTier.file.value, 9,
    `and the value is the PRE-REVERSAL standing — 9, what the store held when the reversal was asked for, which `
      + `the reversal replaced with 5 and the pair refused: the refusal undoes the reversal, so the pre-reversal `
      + `standing is what stands again. THE DRIVE READ ${describe(fileOnlyAfter)}`);
  assert.equal(typeof fileLog[0].message === 'string' && /undone/i.test(fileLog[0].message), true,
    `the refusal says the reversal was UNDONE, and here it is true: THE DRIVE READ `
      + `${JSON.stringify(fileLog[0])}`);

  // ── THE LAWFUL ARM IS UNCHANGED, MEMBER FOR MEMBER. ─────────────────────────────────────────
  assert.deepEqual(Object.keys(lawfulRollback.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a LAWFUL reversal answers its declared record and no new member (\`PAR-JS-9\`): THE DRIVE READ `
      + `${JSON.stringify(Object.keys(lawfulRollback.value))}`);
  assert.equal(lawfulRollback.value.opId, lawfulSecond.op.opId,
    `the record's \`opId\` echoes the id the reversal named: THE DRIVE READ `
      + `${JSON.stringify(lawfulRollback.value.opId)}`);
  assert.deepEqual([...lawfulRollback.value.undoneOps], [lawfulSecond.op.opId],
    `\`undoneOps\` is the list of the ids the reversal undid: THE DRIVE READ `
      + `${JSON.stringify(lawfulRollback.value.undoneOps)}`);
  assert.deepEqual(lawfulRollback.value.restoredTo, { present: true, value: 5 },
    `\`restoredTo\` is the base state the address now stands at: THE DRIVE READ `
      + `${JSON.stringify(lawfulRollback.value.restoredTo)}`);
  // **⟶ RE-DERIVED 2026-11-02 — `D-119`: A LAWFUL REVERSAL *DOES* CARRY A `log`, AND THIS CELL'S OLD SENTENCE IS
  // THE ONE THE RULING REVERSES.** The header bullet above read *"a LAWFUL reversal is unchanged, member for
  // member — `{opId, undoneOps, restoredTo}`, no log, no throw"*, and this assertion read
  // `Object.hasOwn(lawfulRollback.value, 'log') === false`. **`D-38`'s *"a lawful reversal is unchanged"* is the
  // ground the assertion stood on, and `D-119` changes it FOR ONE MEMBER**: every RESOLUTION answers with the
  // commit's list exactly as a refusal does, by a NON-ENUMERABLE own accessor at the name the failure form uses.
  // **So the re-derived cell asserts `D-77`'s and `D-78`'s rule instead — the member is PRESENT on the passing
  // arm, and `[]` is its honest value there** — and the record's three DECLARED members, asserted immediately
  // above by `Object.keys`, stay green because the member is non-enumerable (`A117` (D6)). **NO NEIGHBOUR MOVES**:
  // the refusal's one-entry form (`D-41`) is untouched, and this arm appended nothing for a judgement to report.
  assert.equal(Object.hasOwn(lawfulRollback.value, 'log'), true,
    `a lawful reversal CARRIES its judgement's list at \`log\` — the member is PRESENT on the passing arm `
      + `(\`D-119\`, 2026-11-02; \`D-77\`/\`D-78\`: present on EVERY passing answer, \`[]\` included)`);
  assert.deepEqual([...lawfulRollback.value.log], [],
    `and its honest value on THIS arm is \`[]\`: no pair refused, no repair ran and nothing was appended, so the `
      + `judgement's list is empty and \`[]\` means *"this act appended nothing it can report"*. THE DRIVE READ `
      + `${JSON.stringify(lawfulRollback.value.log)}`);
  assert.deepEqual(lawfulAfterTiers, [{ tier: 'file', value: 5 }],
    `and the lawful reversal's own tier is what stands: nothing restored and nothing changed: THE DRIVE READ `
      + `${describe(lawfulAfter)}`);

  // ── THE READINGS, PRINTED ON EVERY ARM (`D-21`: a cell owes what it read). ───────────────────
  t.diagnostic(`D-41 · SHADOW arm: before the reversal the store stood ${describe(shadowBefore)} (the cross-tier `
    + `read answered ${JSON.stringify('second')}); the reversal of op ${JSON.stringify(second.value.op.opId)} `
    + `restored \`mem\` \`"base"\` and the pair 'file-pair' refused it; after the refusal the store stands `
    + `${describe(shadowAfter)} — the \`file\` value \`"durable"\` SURVIVED AT \`file\` (the old restore cleared `
    + `every tier and wrote one value at \`mem\`); status ${JSON.stringify(shadowRollback.caught.status)}; log `
    + `${JSON.stringify(shadowLog)}`);
  t.diagnostic(`D-41 · FILE-ONLY arm: before ${describe(fileOnlyBefore)}, after ${describe(fileOnlyAfter)} — the `
    + `value is restored AT THE TIER IT STOOD, not at \`mem\`; status `
    + `${JSON.stringify(fileRollback.caught.status)}; log ${JSON.stringify(fileLog)}`);
  t.diagnostic(`D-41 · LAWFUL arm: record ${JSON.stringify(lawfulRollback.value)} with keys `
    + `${JSON.stringify(Object.keys(lawfulRollback.value))} and own names `
    + `${JSON.stringify(Object.getOwnPropertyNames(lawfulRollback.value))} — its \`log\` (\`D-119\`) is `
    + `${JSON.stringify(lawfulRollback.value.log)}; store stands ${describe(lawfulAfter)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 — THE ABSENT CASES: REACHED BY MEASUREMENT, AND ANSWERED HONESTLY
//
// **HOW AN ABSENCE IS REACHED AT ALL — MEASURED, AND THE THREE ROUTES ARE NAMED WITH WHAT THEY GAVE.** The
// question `D-41` item `2` owes is whether the watch can ever capture an ABSENT standing for an address the
// reversal then MOVES, because a reversal UNDOES (`src/store.rs`'s `rollback` walks the journal backward and
// rewrites each entry's captured pre-state) and therefore normally moves a state back toward something that once
// stood. **THE MEASUREMENT:**
//   * **ABSENT BEFORE THE REVERSAL IS REACHABLE, through a STRUCTURED ANCESTOR WRITE.** `a` is written as the
//     branch `{b:1}`; `['a','b']` is then absent because an ancestor write REPLACED the branch with `{c:2}`; that
//     write's own captured pre-state still holds `{b:1}`, so rolling it back RE-MINTS `['a','b']` = `1`. The watch
//     reads `['a','b']` before the reversal and gets `AddressNotFound` — an ABSENT capture — and the reversal
//     moves it. **ARM (A) BELOW IS THIS ROUTE**, and it is the one the restore must answer by REMOVING what the
//     reversal left.
//   * **ABSENT AFTER THE REVERSAL — `D-41`'s `200`-of-`200` SHAPE — IS REACHABLE, by naming the FIRST write's op:
//     the reversal undoes it and every write after it, so the base state it restores is the state before that
//     write, i.e. no value at all.** **ARM (B)** is this route, and it is the one that COULD NOT SUCCEED before
//     the fix: the restore deleted every tier first, and `delete` at a key holding no anchor answers
//     `AddressNotFound` (`src/store.rs`), so the captured value was never written back.
//   * **AND A RESTORE THAT GENUINELY CANNOT BE TAKEN IS REACHABLE** where the reversal also removes the address's
//     PARENT: the captured value cannot be written back at all, and the refusal must SAY so rather than claim a
//     restoration. **ARM (C)** is that route, and it is the message's honest limb.
//
// **THE ASSERTION IS THE HONEST OUTCOME IN EVERY ARM** — `D-41` item `2`: *"a message must not claim a restoration
// that did not happen"*. Where the state was absent, the address is ABSENT AGAIN; where it was present, the
// pre-reversal value stands at its pre-reversal tier; and where the restore cannot be taken, **the refusal names
// the address, says what stands there instead and what it was owed, and does not say `UNDONE`.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-41 · the ABSENT cases: an address absent before the reversal is ABSENT AGAIN after the refusal, an address the reversal leaves ABSENT is restored to its pre-reversal value at its tier, and a pair whose PARENT the reversal takes away is SKIPPED at the judgement — so that reversal LANDS and the store stands as the reversal left it', (t) => {
  // ── ARM (A): ABSENT BEFORE THE REVERSAL, REACHED THROUGH A STRUCTURED ANCESTOR WRITE. ────────
  const absentBefore = storeCreate({ journalLength: 16, listeners: [] });
  absentBefore.write(['a'], 'mem', { b: 1 });
  const replaced = absentBefore.write(['a'], 'mem', { c: 2 });
  const absentPair = attempt(() => absentBefore.addConstraint({ address: ['a', 'b'], id: 'admits-absence' },
    (context) => (context.value === undefined ? true : { message: 'this pair admits absence alone' })));
  const absentBeforeStanding = standing(absentBefore, ['a', 'b']);
  const absentRollback = attempt(() => absentBefore.rollback(replaced.op.opId));
  const absentAfterStanding = standing(absentBefore, ['a', 'b']);
  const absentLog = absentRollback.ok === false && absentRollback.caught !== null
    && typeof absentRollback.caught === 'object' && Array.isArray(absentRollback.caught.log)
    ? absentRollback.caught.log
    : [];

  // ── ARM (B): THE TERMINAL STANDING IS ABSENT (`D-41`'s `200`-of-`200` SHAPE). ───────────────
  const terminalAbsent = storeCreate({ journalLength: 16, listeners: [] });
  const seedOp = terminalAbsent.write(['a'], 'mem', 5);
  const laterOp = terminalAbsent.write(['a'], 'mem', 9);
  const numbersPair = attempt(() => terminalAbsent.addConstraint({ address: ['a'], id: 'admits-numbers' },
    (context) => (typeof context.value === 'number' ? true : { message: 'this pair admits numbers alone' })));
  const terminalBeforeStanding = standing(terminalAbsent, ['a']);
  const terminalRollback = attempt(() => terminalAbsent.rollback(seedOp.op.opId));
  const terminalAfterStanding = standing(terminalAbsent, ['a']);
  const terminalLog = terminalRollback.ok === false && terminalRollback.caught !== null
    && typeof terminalRollback.caught === 'object' && Array.isArray(terminalRollback.caught.log)
    ? terminalRollback.caught.log
    : [];

  // ── ARM (C): THE ADDRESS WHOSE PARENT THE REVERSAL REMOVES — **⟶ RE-DERIVED 2026-11-02 ON `D-90` (1)–(4) AND
  // `D-96`: THE PAIR IS SKIPPED AT THE JUDGEMENT, SO THE REVERSAL **LANDS**.**
  //
  // **WHAT THIS ARM PINNED BEFORE THE RE-DERIVATION, NAMED SO THE WITHDRAWAL IS VISIBLE AND NOT SILENT:** *"the
  // reversal must still be REFUSED — the absence is the state the pair refuses"*, and then the `D-41` restore of the
  // parent the reversal took away. **THE RULE THAT MOVED IT IS `D-90` (4) — THE RULE IS GLOBAL AND THE REVERSAL'S
  // JUDGEMENT IS ONE OF ITS INSTANTS — READ THROUGH `D-96` (1)**: the reversal removes `['a']`, so the pair's PARENT
  // **DOES NOT RESOLVE**, and *"a pair is SKIPPED exactly when its parent does not resolve"*. **`D-96`'s foot says
  // the absent-parent skip is the ONE arm a skip survives on** — *"it stands exactly as `D-90` (1)–(3) and `D-90` (5)
  // record it"* — so this arm is not in doubt anywhere: **the pair is not asked, crosses nothing, cannot refuse the
  // reversal, and the reversal LANDS with its own record** (the same confirmed consequence the architect accepted
  // for a `delete` of an ancestor at `G3-09` and `G3-11` pins for a `rollback`). **WHAT MAKES THIS ARM RED NOW:** the
  // call refusing (`ConstraintPassRefused` — the withdrawn arm), a non-zero ask-delta at the judgement, a record
  // that does not name the op the reversal undid, a `['a']` left standing (the restore running for a reversal that
  // was never refused), or the pair being REMOVED from `constraints()` — a skip is not a removal (`PIN-4` (i), and
  // `D-90` (2): a skip *"removes no pair"*).
  const cannot = storeCreate({ journalLength: 16, listeners: [] });
  const branchOp = cannot.write(['a'], 'mem', { b: 1 });
  const cannotAsks = [];
  const bPair = attempt(() => cannot.addConstraint({ address: ['a', 'b'], id: 'admits-numbers' },
    (context) => {
      cannotAsks.push(context.value === undefined ? '<absent>' : context.value);
      return typeof context.value === 'number' ? true : { message: 'this pair admits numbers alone' };
    }));
  const cannotBeforeStanding = standing(cannot, ['a', 'b']);
  const cannotAsksBefore = cannotAsks.length;
  const cannotRollback = attempt(() => cannot.rollback(branchOp.op.opId));
  const cannotAskDelta = cannotAsks.length - cannotAsksBefore;
  const cannotAfterStanding = standing(cannot, ['a', 'b']);
  const cannotParentStanding = standing(cannot, ['a']);
  const cannotRows = cannot.constraints();
  const cannotRecord = cannotRollback.ok === true && cannotRollback.value !== null
    && typeof cannotRollback.value === 'object' ? cannotRollback.value : null;

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([absentPair.ok, numbersPair.ok, bPair.ok], [true, true, true],
    `all three pairs must REGISTER — each passes against the state standing at registration, which is the `
      + `ABSENT state in arm (A), 9 in arm (B) and 1 in arm (C): absent=${JSON.stringify(absentPair.caught)} `
      + `numbers=${JSON.stringify(numbersPair.caught)} b=${JSON.stringify(bPair.caught)}`);
  // **⟶ AND THE THIRD ARM'S OUTCOME MOVED, 2026-11-02 (`D-90` (4) THROUGH `D-96` (1)): the first TWO reversals must
  // be REFUSED — their pairs ARE applicable, because the state the reversal leaves at each pair's PARENT still
  // resolves (arm (A) leaves `['a']` a branch; arm (B)'s parent is the REGISTER) — and the THIRD must LAND, because
  // its pair's parent is the one the reversal took away.** That pair of facts is the whole cell: **the same
  // judgement, two outcomes, decided by the pair's parent and by nothing else** (`D-96` (1)).
  assert.deepEqual([absentRollback.ok, terminalRollback.ok], [false, false],
    `**THE TWO APPLICABLE ARMS MUST STILL REFUSE** — they are the arms that exercise the \`D-41\` restore, so a `
      + `landing here would take the restore away from this cell: absent ok=${absentRollback.ok} `
      + `terminal ok=${terminalRollback.ok} (their statuses read `
      + `${JSON.stringify([absentRollback.ok === false ? absentRollback.caught.status : null, terminalRollback.ok === false ? terminalRollback.caught.status : null])})`);
  assert.equal(cannotRollback.ok, true,
    `**AND THE THIRD MUST LAND — THE PAIR WHOSE PARENT THE REVERSAL TAKES AWAY IS SKIPPED AT THE JUDGEMENT** `
      + `(\`D-90\` (4) names the pass over a \`rollback\` among the five instants; \`D-96\` (1) fixes the threshold as `
      + `ABSENCE, and its foot keeps that arm whole): the call answered `
      + `${JSON.stringify(cannotRollback.ok === false ? cannotRollback.caught.status : null)} `
      + `${JSON.stringify(cannotRollback.ok === false ? cannotRollback.caught.message : null)}. **A `
      + `\`ConstraintPassRefused\` HERE IS THE WITHDRAWN ARM — the judgement asking a pair the rule skips**`);

  // ── ARM (A): THE CAPTURE WAS ABSENT, AND THE ADDRESS IS ABSENT AGAIN. ───────────────────────
  assert.equal(absentBeforeStanding.cross.present, false,
    `the route must stand the address at NO VALUE before the reversal, or arm (A) does not reach the absent `
      + `capture this cell claims: THE DRIVE READ ${describe(absentBeforeStanding)}`);
  assert.equal(absentBeforeStanding.cross.refused, 'AddressNotFound',
    `and it must be the store's own ABSENCE, not some other refusal: THE DRIVE READ `
      + `${JSON.stringify(absentBeforeStanding.cross.refused)}`);
  assert.equal(absentRollback.caught.status, 'ConstraintPassRefused',
    `the refusal is the set's rank-\`20\` member (\`D-38\`): THE DRIVE READ `
      + `${JSON.stringify(absentRollback.caught.status)}`);
  assert.equal(absentAfterStanding.cross.present, false,
    `THE FINDING: the pre-reversal state was ABSENT, so the restore must REMOVE what the reversal left and the `
      + `address must be ABSENT AGAIN — *"absent where it was absent"* (\`D-41\` item \`2\`). THE DRIVE READ `
      + `${describe(absentAfterStanding)}`);
  assert.deepEqual(stoodTiers(absentAfterStanding), [],
    `and it must stand at NO TIER: a restore that cleared some tiers and left the reversal's version at another `
      + `has not answered the capture. THE DRIVE READ ${describe(absentAfterStanding)}`);
  assert.equal(typeof absentLog[0]?.message === 'string' && /undone/i.test(absentLog[0].message), true,
    `and the log says the reversal was UNDONE — true, because the address stands again exactly as it stood: THE `
      + `DRIVE READ ${JSON.stringify(absentLog)}`);

  // ── ARM (B): THE REVERSAL LEFT THE ADDRESS ABSENT, AND THE PRE-REVERSAL VALUE STANDS AGAIN. ──
  assert.deepEqual(stoodTiers(terminalBeforeStanding), [{ tier: 'mem', value: 9 }],
    `the drive must stand the terminal-absent arm's pre-reversal state at \`mem\` 9, or the restoration below is `
      + `not measured: THE DRIVE READ ${describe(terminalBeforeStanding)}`);
  assert.deepEqual(stoodTiers(terminalAfterStanding), [{ tier: 'mem', value: 9 }],
    `THE FINDING — THE SHAPE THAT COULD NOT SUCCEED BEFORE THE FIX: the reversal left the address ABSENT, and the `
      + `restore puts the PRE-REVERSAL standing back AT ITS TIER (9 at \`mem\`, which is what the store held when `
      + `the reversal was asked for — the reversal replaced it with nothing and the pair refused the absence). The `
      + `old restore deleted every tier first and a \`delete\` at a key holding no anchor answers `
      + `\`AddressNotFound\`, so the value was never written back at all while the refusal still spoke of the `
      + `reversal. THE DRIVE READ before ${describe(terminalBeforeStanding)} and after `
      + `${describe(terminalAfterStanding)} (the refused state was \`AddressNotFound\` at every tier)`);
  assert.equal(terminalAfterStanding.cross.value, 9,
    `and the cross-tier read answers the pre-reversal standing: THE DRIVE READ `
      + `${describe(terminalAfterStanding)}`);
  assert.equal(terminalRollback.caught.status, 'ConstraintPassRefused',
    `and the call still REFUSES with the rank-\`20\` member: the state did not satisfy the constraints, which is `
      + `unchanged (\`D-41\` item \`2\`). THE DRIVE READ ${JSON.stringify(terminalRollback.caught.status)}`);
  assert.equal(typeof terminalLog[0]?.message === 'string' && /undone/i.test(terminalLog[0].message), true,
    `and the log says UNDONE, which is now true: THE DRIVE READ ${JSON.stringify(terminalLog)}`);

  // ── ARM (C): THE REVERSAL LANDS, AND THE STORE STANDS AS THE REVERSAL LEFT IT. ──────────────
  assert.deepEqual(stoodTiers(cannotBeforeStanding), [{ tier: 'mem', value: 1 }],
    `the drive must stand the value before the reversal, or the landing below measures nothing: THE DRIVE READ `
      + `${describe(cannotBeforeStanding)}`);
  assert.equal(cannotRollback.ok, true,
    `**THE REVERSAL LANDS** — the state it leaves takes the pair's PARENT away, so the pair is SKIPPED at the `
      + `judgement and cannot refuse it (\`D-90\` (4); \`D-96\` (1); \`D-96\`'s foot keeps the absent-parent skip `
      + `whole): the call answered `
      + `${JSON.stringify(cannotRollback.ok === false ? cannotRollback.caught.status : null)}`);
  assert.deepEqual(cannotRecord === null ? null : Object.keys(cannotRecord).sort(),
    ['opId', 'restoredTo', 'undoneOps'],
    `**AND IT ANSWERS ITS OWN RECORD — \`{opId, undoneOps, restoredTo}\` AND NO OTHER MEMBER** (\`D-41\`'s lawful `
      + `reversal is *"unchanged, member for member"*, and this is that arm): THE DRIVE READ `
      + `${JSON.stringify(cannotRecord === null ? null : Object.keys(cannotRecord))}`);
  assert.equal(cannotRecord === null ? null : cannotRecord.opId, branchOp.op.opId,
    `and the record's \`opId\` is the op the reversal undid: THE DRIVE READ `
      + `${JSON.stringify(cannotRecord === null ? null : cannotRecord.opId)} against `
      + `${JSON.stringify(branchOp.op.opId)}`);
  assert.deepEqual(cannotRecord === null ? null : cannotRecord.undoneOps, [branchOp.op.opId],
    `**AND \`undoneOps\` NAMES THE OPS THE REVERSAL UNDID** — the one write that made the parent stand: THE DRIVE `
      + `READ ${JSON.stringify(cannotRecord === null ? null : cannotRecord.undoneOps)}`);
  assert.deepEqual(cannotRecord === null ? null : cannotRecord.restoredTo, { present: false, value: undefined },
    `and \`restoredTo\` reports the absence it restored the register to: THE DRIVE READ `
      + `${JSON.stringify(cannotRecord === null ? null : cannotRecord.restoredTo)}`);
  assert.equal(cannotAskDelta, 0,
    `**AND THE PAIR WAS NOT ASKED AT THE JUDGEMENT — THE READING THAT SEPARATES A SKIP FROM A JUDGEMENT** `
      + `(\`D-90\` (2): a skipped pair is *"not asked, not refused for, not repaired for and not counted as a `
      + `judgement"*): the body was entered ${cannotAskDelta} time(s) across the reversal. **THE SUPERSEDED ARM `
      + `ASKED IT ONCE AND REFUSED THE REVERSAL ON THAT ANSWER**`);
  assert.equal(cannotAfterStanding.cross.present, false,
    `**AND THE STORE STANDS AS THE REVERSAL LEFT IT** — there is no refusal and therefore no \`D-41\` restore to `
      + `take: the address is ABSENT, exactly as the reversal of the write that created its parent leaves it. THE `
      + `DRIVE READ ${describe(cannotAfterStanding)}`);
  assert.equal(cannotAfterStanding.cross.refused, 'AddressNotFound',
    `with the store's own absence and no other answer, at the address AND at its parent: THE DRIVE READ `
      + `${describe(cannotAfterStanding)}`);
  assert.equal(cannotParentStanding.cross.present, false,
    `and the PARENT is gone with it — the reversal removed `+"`['a']`"+`, which is the very fact that makes the `
      + `pair inapplicable (\`D-90\` (1)): THE DRIVE READ ${describe(cannotParentStanding)}`);
  assert.deepEqual(stoodTiers(cannotAfterStanding), [],
    `at no tier either: the reversal's own state, read at each of the three: THE DRIVE READ `
      + `${describe(cannotAfterStanding)}`);
  assert.equal(cannotRows.length, 1,
    `**AND THE PAIR IS STILL CARRIED — A SKIP REMOVES NOTHING** (\`D-90\` (2): *"removes no pair"*; \`PIN-4\` (i): `
      + `the pair *"becomes applicable at the instant its parent exists"*): \`constraints()\` answers `
      + `${JSON.stringify(cannotRows)}`);
  assert.equal(cannotRows[0].id, 'admits-numbers',
    `and it is the same pair, named by the same \`id\`: ${JSON.stringify(cannotRows.map((row) => row.id))}`);
  // ── THE READINGS, PRINTED ON EVERY ARM (`D-21`: a cell owes what it read). ───────────────────
  t.diagnostic(`D-41 · ARM A (absent BEFORE the reversal, reached by a structured ancestor write): before `
    + `${describe(absentBeforeStanding)}; the reversal of op ${JSON.stringify(replaced.op.opId)} re-minted `
    + `['a','b'] and pair 'admits-absence' refused it; after the refusal `
    + `${describe(absentAfterStanding)} — ABSENT AGAIN, as the capture required; log ${JSON.stringify(absentLog)}`);
  t.diagnostic(`D-41 · ARM B (terminal standing ABSENT — \`D-41\`'s 200-of-200 shape): before `
    + `${describe(terminalBeforeStanding)}; the reversal of the FIRST op ${JSON.stringify(seedOp.op.opId)} left `
    + `the address absent (refused ${JSON.stringify(terminalRollback.caught.status)}); after the refusal `
    + `${describe(terminalAfterStanding)} — the pre-reversal value is back at its own tier; log `
    + `${JSON.stringify(terminalLog)} (the second write's op was ${JSON.stringify(laterOp.op.opId)})`);
  t.diagnostic(`D-41 · ARM C (the reversal removes the address's PARENT — RE-DERIVED ON \`D-90\` (4) AND `
    + `\`D-96\` (1): the pair is SKIPPED at the judgement and the reversal LANDS): before `
    + `${describe(cannotBeforeStanding)}; the reversal of op ${JSON.stringify(branchOp.op.opId)} took `
    + `\`['a']\` away and answered ${JSON.stringify(cannotRecord)} with an ask-delta of ${cannotAskDelta}; after `
    + `it ${describe(cannotAfterStanding)} and its PARENT ${describe(cannotParentStanding)} — the store STANDS AS `
    + `THE REVERSAL LEFT IT, and the pair is still carried as ${JSON.stringify(cannotRows)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 — A BODY THAT THROWS AT THE JUDGEMENT FAILS CLOSED
//
// **THE FINDING (`D-41` item `4`).** A constraint body that threw while the state the reversal left was being
// judged **propagated `ConstraintBodyThrew` out of the judging call with `log: []` and NO UNDO** — the reversal
// had already happened, so the store was left at the very state nobody could judge, and the consumer was told
// nothing had been compensated. **A reversal nobody could judge is a reversal nobody could approve**, so the arm
// is the violating arm's treatment: **the reversal is restored, and the call refuses with a log that NAMES THE
// THROWING PAIR.** The crossed code stays the body's own rank-`18` member — the code says what happened, while
// the treatment is the violation's (`D-41` item `4`: *"the same treatment a violation gets"*).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-41 · a constraint body that THROWS at the judgement of a reversal fails closed: the reversal is UNDONE and the refusal carries a log naming the throwing pair', (t) => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);
  const second = store.write(['a'], 'mem', 9);
  // THE BODY PASSES AT REGISTRATION (the state then standing is 9) AND THROWS AT THE STATE THE REVERSAL LEAVES
  // (5): the judgement is the only ask that throws.
  const asks = [];
  const pair = attempt(() => store.addConstraint({ address: ['a'], id: 'throwing-pair' }, (context) => {
    asks.push(context.value);
    if (context.value === 5) throw new Error('this body will not answer for the seed');
    return true;
  }));
  const before = standing(store, ['a']);
  // THE ASKS AS THEY STAND BEFORE THE REVERSAL — a COPY, because `asks` is the same list the judgement's ask is
  // recorded on and a live read after the reversal would answer both asks at once (`D-21`: the arm's own fact is
  // printed beside the finding).
  const asksBefore = asks.slice();
  const rollback = attempt(() => store.rollback(second.op.opId));
  const after = standing(store, ['a']);
  const log = rollback.ok === false && rollback.caught !== null && typeof rollback.caught === 'object'
    && Array.isArray(rollback.caught.log) ? rollback.caught.log : [];

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(pair.ok, true,
    `the pair must REGISTER — its body passes against the state standing then (9) — or the throw below is the `
      + `registration's and not the judgement's: THE DRIVE CAUGHT ${JSON.stringify(pair.caught)}`);
  assert.deepEqual(asksBefore, [9],
    `the body is asked ONCE before the reversal — at registration, against 9 — and the judgement's ask (5, which `
      + `throws in this drive) is the one the reversal's terminal state produces: THE DRIVE RECORDED `
      + `${JSON.stringify(asksBefore)}`);
  assert.equal(rollback.ok, false,
    `a judgement that cannot complete must FAIL CLOSED and refuse: the call answered `
      + `${JSON.stringify(rollback.value)}`);

  // ── THE REFUSAL'S FORM AND CODE. ────────────────────────────────────────────────────────────
  assert.deepEqual(Object.keys(rollback.caught).sort(), ['address', 'log', 'message', 'status'],
    `the refusal crosses as the ONE plain form \`{status, message, log}\` (\`surface.md §2.5\` items 3–4): THE `
      + `DRIVE CAUGHT ${JSON.stringify(Object.keys(rollback.caught))}`);
  assert.equal(rollback.caught.status, 'ConstraintBodyThrew',
    `the crossed code is the body's own rank-\`18\` member — it says what happened (\`DEF-S\`; \`§8.1\` #18): THE `
      + `DRIVE READ ${JSON.stringify(rollback.caught.status)}`);
  assert.equal(typeof rollback.caught.message === 'string' && rollback.caught.message.includes('threw'), true,
    `and the message is the store's own generated sentence for that code (\`DD-52\`): THE DRIVE READ `
      + `${JSON.stringify(rollback.caught.message)}`);

  // ── THE FINDING, BOTH HALVES: THE LOG NAMES THE PAIR, AND THE UNDO HAPPENED. ─────────────────
  assert.equal(log.length, 1,
    `the refusal's log is ONE \`constraint-check\` entry — not the \`[]\` the arm used to carry — so a consumer is `
      + `told the judgement could not complete and which pair did it: THE DRIVE READ ${JSON.stringify(log)}`);
  assert.equal(log[0].kind, 'constraint-check',
    `the entry is a \`constraint-check\` (the kernel's own CLOSED kind set): THE DRIVE READ `
      + `${JSON.stringify(log[0].kind)}`);
  assert.equal(log[0].id, 'throwing-pair',
    `THE ENTRY NAMES THE THROWING PAIR: THE DRIVE READ ${JSON.stringify(log[0].id)}`);
  assert.equal(log[0].opId, second.op.opId,
    `and it names the act — the store's own echo of the reversal's id: THE DRIVE READ `
      + `${JSON.stringify(log[0].opId)} against ${JSON.stringify(second.op.opId)}`);
  assert.equal(typeof log[0].message === 'string' && log[0].message.includes('throwing-pair'), true,
    `and its sentence names the pair too: THE DRIVE READ ${JSON.stringify(log[0].message)}`);
  assert.equal(typeof log[0].message === 'string' && /THREW/.test(log[0].message), true,
    `and says the body THREW rather than that the state was refused: THE DRIVE READ `
      + `${JSON.stringify(log[0].message)}`);
  assert.equal(typeof log[0].message === 'string' && /undone/i.test(log[0].message), true,
    `AND THE UNDO HAPPENED AND IS REPORTED: the reversal had already run, so failing closed means the `
      + `pre-reversal standing is back and the log says so. THE DRIVE READ ${JSON.stringify(log[0].message)}`);
  assert.deepEqual(after, before,
    `THE STORE STANDS EXACTLY WHERE IT STOOD BEFORE THE REVERSAL — the failing judgement compensated the `
      + `reversal it could not judge. THE DRIVE READ before ${describe(before)} and after ${describe(after)}`);
  assert.equal(after.cross.value, 9,
    `and that value is the pre-reversal one (9), not the state the reversal left (5): THE DRIVE READ `
      + `${describe(after)}`);
  assert.deepEqual(asks, [9, 5],
    `and the body was asked TWICE and no more — registration and the judgement that threw; the restore asks `
      + `nothing (\`D-40\`'s no-per-op-walk is untouched). THE DRIVE RECORDED ${JSON.stringify(asks)}`);

  // ── THE READINGS, PRINTED (`D-21`: a cell owes what it read). ────────────────────────────────
  t.diagnostic(`D-41 · THROWING-BODY arm: pair 'throwing-pair' threw while the state the reversal of op `
    + `${JSON.stringify(second.op.opId)} left was judged; the refusal crossed as `
    + `${JSON.stringify(rollback.caught.status)} / ${JSON.stringify(rollback.caught.message)} with log `
    + `${JSON.stringify(log)}; the store read ${describe(before)} before the reversal and `
    + `${describe(after)} after the refusal — the reversal was UNDONE; the body's asks were `
    + `${JSON.stringify(asks)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 4 — THE MIXED-DEPTH SHADOW: TWO ARMS, BECAUSE THE PAIR'S PARENT DECIDES WHICH ONE THE REVERSAL TAKES
//
// **THE SHAPE.** A subtree whose nodes stand at DIFFERENT TIERS at DIFFERENT DEPTHS: `a` and `a.b` at `mem`,
// and `a.b.c` at `mem` BESIDE `temp` — one level BELOW the pair that watches the branch. **THE WATCH CAPTURES
// THE PAIR'S OWN TIERS AND NOTHING BENEATH THEM** (`reversalWatch`'s `captureStanding`), so the compensating
// write put back `a.b`'s ASSEMBLED value — which carries the deep version's VALUE and not its TIER — and the
// `temp` version standing under it was destroyed while the verification at the pair's own address passed.
// **THE STORE'S JOURNAL RECORDS EVERY VERSION AT EVERY DEPTH WITH ITS OWN TIER** (`src/store.rs`'s
// `Entry::after`), so the mark restore re-states it exactly, and this cell reads that at the DEEP address and
// at every tier.
//
// **⟶ RE-DERIVED 2026-11-02: THE CELL NOW DRIVES BOTH OUTCOMES OF ONE JUDGEMENT, AND THE DIFFERENCE IS THE
// PAIR'S PARENT** (`D-90` (1)–(4) read through `D-96` (1)). **ARM ONE — the drive this cell carried — watches
// `['a','b']`, and the reversal of the ROOT write removes `['a']`: the pair's PARENT does not resolve, so the pair
// is SKIPPED at the judgement and the REVERSAL LANDS** (`D-90` (4) names the pass over a `rollback` among the five
// instants; `D-96`'s foot keeps the absent-parent skip whole). **THE ARM THAT ASSERTED A REFUSAL HERE IS THE
// WITHDRAWN ONE**, and what replaces it is the record, the ask-count of `0` and the store standing as the reversal
// left it. **ARM TWO is added so the `D-41` RESTORE PATH IS STILL EXERCISED AND STILL HAS A RED SIDE**: a pair one
// level DEEP — `['a','b','c']`, whose PARENT `['a','b']` the reversal of the DEEP write LEAVES STANDING — is
// APPLICABLE, refuses the state the reversal restores (the `mem` version `1` beside the `temp` version `5`), and
// the refusal runs the store's mark restore, which this cell then reads at every address and every tier.
// **NEITHER ARM RESTATES THE OTHER'S RULE**: arm one is the skip (`D-90`/`D-96`), arm two is the restoration
// (`D-41` item `2`), and the same mixed-depth shadow is the fixture of both.
//
// **THE READINGS THAT PROVE THE MIX, AND WHY THEY ARE THE ONES PRINTED.** A TIER-NARROWED READ NARROWS EVERY
// SEGMENT OF THE WALK, so at a deep address it answers only where the whole path stands at that tier: `mem` is
// the one narrowing that reaches `a.b.c`. **The pair (`mem`-narrowed = 1, cross-tier = 5) is the proof that the
// `temp` version stands**: the cross-tier read answers the lowest-tier version present, so the two readings can
// differ ONLY if a `temp` version is standing beside the `mem` one.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-41 · a MIXED-DEPTH SHADOW has TWO outcomes by ONE rule: a pair whose PARENT the reversal takes away is SKIPPED (the reversal LANDS and the store stands as it left it), and a pair at a walkable address REFUSES it — and then the D-41 restore re-states the shadow at every address and every tier', (t) => {
  // ══ ARM ONE — THE SKIP: the pair at `['a','b']`, the reversal of the ROOT write, and a LANDING. ═══════════
  const store = storeCreate({ journalLength: 16, listeners: [] });
  // ── THE DRIVE: a branch at `mem`, and a version one level BENEATH it at a lower tier.
  const root = store.write(['a'], 'mem', { b: { c: 1 } });
  const deep = store.write(['a', 'b', 'c'], 'temp', 5);
  // The pair watches `['a','b']` — the level ABOVE the mixed version — and admits the standing it finds there
  // (the cross-tier read at `['a','b']` is `{c:5}`) while refusing the ABSENCE the reversal leaves. **UNDER
  // `D-90` (1) THAT ABSENCE IS A SKIP AND NOT A JUDGEMENT**, which is what arm one now asserts.
  const asks = [];
  const pair = attempt(() => store.addConstraint({ address: ['a', 'b'], id: 'admits-the-standing' },
    (context) => {
      asks.push(context.value === undefined ? '<absent>' : context.value);
      return (context.value === undefined
        ? { message: 'this pair admits the standing and refuses the absence' }
        : true);
    }));
  // THE PRE-REVERSAL STANDING, PER ADDRESS AND PER TIER.
  const before = { a: standing(store, ['a']), b: standing(store, ['a', 'b']), c: standing(store, ['a', 'b', 'c']) };
  const asksBefore = asks.length;
  const rollback = attempt(() => store.rollback(root.op.opId));
  const askDelta = asks.length - asksBefore;
  const after = { a: standing(store, ['a']), b: standing(store, ['a', 'b']), c: standing(store, ['a', 'b', 'c']) };
  const record = rollback.ok === true && rollback.value !== null && typeof rollback.value === 'object'
    ? rollback.value
    : null;
  const rows = store.constraints();

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────────────────
  assert.equal(pair.ok, true,
    `the pair must REGISTER against the standing at \`['a','b']\` ({c:5}), or the arm below reads the `
      + `registration's refusal and not the reversal's: THE DRIVE CAUGHT ${JSON.stringify(pair.caught)}`);
  assert.equal(typeof deep === 'object' && deep !== null && typeof deep.op === 'object', true,
    `the deep \`temp\` write must land and answer its record, or the mix is not the mix this cell claims: THE `
      + `DRIVE CAUGHT ${JSON.stringify(deep)}`);
  assert.deepEqual(stoodTiers(before.b), [{ tier: 'mem', value: { c: 1 } }],
    `\`['a','b']\` stands at ONE tier, and its \`mem\`-NARROWED value is 1 — a narrowed read narrows EVERY segment `
      + `of the walk AND the assembly beneath it, so the pair's own level shows the \`mem\` version while the `
      + `CROSS-tier read at the same address answers the deep \`temp\` version (5). The mix is at the DEPTH and `
      + `that difference is where it shows: THE DRIVE READ ${describe(before.b)}`);
  assert.equal(before.c.cross.value, 5,
    `and the deep address reads 5 across the tiers: THE DRIVE READ ${describe(before.c)}`);
  assert.equal(before.c.perTier.mem.present, true,
    `THE MIX: the \`mem\` narrowing reaches the deep address — the whole path stands at \`mem\`: THE DRIVE READ `
      + `${describe(before.c)}`);
  assert.equal(before.c.perTier.mem.value, 1,
    `and it answers the \`mem\` VERSION (1) while the cross-tier read answers 5 — which can only be a \`temp\` `
      + `version standing BESIDE it: THE DRIVE READ ${describe(before.c)}`);

  // ── ARM ONE'S FINDING: THE REVERSAL LANDS, AND THE PAIR WAS NEVER ASKED. ───────────────────────────────
  assert.equal(rollback.ok, true,
    `**THE REVERSAL MUST LAND — THE PAIR'S PARENT IS THE ADDRESS THE REVERSAL REMOVES, SO THE PAIR IS SKIPPED AT `
      + `THE JUDGEMENT** (\`D-90\` (4): the pass over a \`rollback\` reads the rule; \`D-96\` (1): the skip's `
      + `threshold is ABSENCE, and \`D-96\`'s foot keeps that arm whole): the call answered `
      + `${JSON.stringify(rollback.ok === false ? rollback.caught.status : null)}. **A \`ConstraintPassRefused\` `
      + `HERE IS THE WITHDRAWN ARM** — the judgement asking a pair the rule skips`);
  assert.deepEqual(record === null ? null : Object.keys(record).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `**AND IT ANSWERS ITS OWN RECORD** — \`{opId, undoneOps, restoredTo}\` and no other member (\`D-41\`'s lawful `
      + `reversal, *"unchanged, member for member"*): THE DRIVE READ `
      + `${JSON.stringify(record === null ? null : Object.keys(record))}`);
  assert.equal(record === null ? null : record.opId, root.op.opId,
    `and its \`opId\` is the op the reversal was asked for: THE DRIVE READ `
      + `${JSON.stringify(record === null ? null : record.opId)} against ${JSON.stringify(root.op.opId)}`);
  assert.deepEqual(record === null ? null : (record.undoneOps ?? []).slice().sort(),
    [root.op.opId, deep.op.opId].sort(),
    `**AND \`undoneOps\` NAMES EVERY OP IT UNDID — the root write AND the deep \`temp\` write beneath it** (the `
      + `reversal takes the subtree with it, which is the whole reason the pair's parent goes): THE DRIVE READ `
      + `${JSON.stringify(record === null ? null : record.undoneOps)} against `
      + `${JSON.stringify([root.op.opId, deep.op.opId])}`);
  assert.equal(record === null ? null : record.undoneOps.includes(deep.op.opId), true,
    `and the DEEP op is among them — read on its own, so a record naming the root alone is caught: THE DRIVE `
      + `READ ${JSON.stringify(record === null ? null : record.undoneOps)}`);
  assert.equal(askDelta, 0,
    `**AND THE PAIR WAS NOT ASKED AT THE JUDGEMENT** (\`D-90\` (2): *"not asked, not refused for, not repaired `
      + `for and not counted as a judgement"*): the body was entered ${askDelta} time(s) across the reversal. **THE `
      + `SUPERSEDED ARM ASKED IT ONCE AND REFUSED THE REVERSAL ON THAT ANSWER**`);
  assert.equal(after.c.cross.present, false,
    `**AND THE STORE STANDS AS THE REVERSAL LEFT IT — THERE IS NO REFUSAL, SO NO \`D-41\` RESTORE IS TAKEN** and `
      + `the deep address is GONE with the subtree the reversal took: THE DRIVE READ ${describe(after.c)}`);
  assert.equal(after.b.cross.present, false,
    `and the pair's own level is gone with it: THE DRIVE READ ${describe(after.b)}`);
  assert.equal(after.a.cross.present, false,
    `and the branch above them both: THE DRIVE READ ${describe(after.a)}`);
  assert.deepEqual([stoodTiers(after.a), stoodTiers(after.b), stoodTiers(after.c)], [[], [], []],
    `at NO tier at ANY of the three addresses: THE DRIVE READ a=${describe(after.a)} b=${describe(after.b)} `
      + `c=${describe(after.c)}`);
  assert.equal(rows.length, 1,
    `**AND THE PAIR IS STILL CARRIED — A SKIP REMOVES NOTHING** (\`D-90\` (2), \`PIN-4\` (i)): \`constraints()\` `
      + `answers ${JSON.stringify(rows)}`);

  // ══ ARM TWO — THE REFUSAL: a pair the reversal's state still resolves refuses it, AND THE SHADOW IS RESTORED. ══
  // **THE PARENT IS WHAT DECIDES** (`D-96` (1)): this pair stands at the DEEP address, and the reversal of the
  // DEEP WRITE restores `a.b.c` to the `mem` version `1` **while `['a','b']` stays a branch** — so the pair is
  // APPLICABLE, it refuses the restored state, the reversal is REFUSED, and the `D-41` restore runs.
  const shadow = storeCreate({ journalLength: 16, listeners: [] });
  const shadowRoot = shadow.write(['a'], 'mem', { b: { c: 1 } });
  const shadowDeep = shadow.write(['a', 'b', 'c'], 'temp', 5);
  const shadowAsks = [];
  const deepPair = attempt(() => shadow.addConstraint({ address: ['a', 'b', 'c'], id: 'admits-five' },
    (context) => {
      shadowAsks.push(context.value === undefined ? '<absent>' : context.value);
      return (context.value === 5 ? true : { message: 'this pair admits five alone' });
    }));
  const shadowBefore = {
    a: standing(shadow, ['a']), b: standing(shadow, ['a', 'b']), c: standing(shadow, ['a', 'b', 'c']),
  };
  const shadowAsksBefore = shadowAsks.length;
  const shadowRollback = attempt(() => shadow.rollback(shadowDeep.op.opId));
  const shadowAskDelta = shadowAsks.length - shadowAsksBefore;
  const shadowAfter = {
    a: standing(shadow, ['a']), b: standing(shadow, ['a', 'b']), c: standing(shadow, ['a', 'b', 'c']),
  };
  const shadowLog = shadowRollback.ok === false && shadowRollback.caught !== null
    && typeof shadowRollback.caught === 'object' && Array.isArray(shadowRollback.caught.log)
    ? shadowRollback.caught.log : [];

  assert.equal(deepPair.ok, true,
    `ARM TWO's pair must REGISTER — it admits 5, which is what the deep address reads across the tiers: THE `
      + `DRIVE CAUGHT ${JSON.stringify(deepPair.caught)}`);
  assert.equal(typeof shadowDeep === 'object' && shadowDeep !== null && typeof shadowDeep.op === 'object', true,
    `and the deep \`temp\` write must land and answer its record, or the mix is not the mix: THE DRIVE CAUGHT `
      + `${JSON.stringify(shadowDeep)}`);
  assert.equal(shadowBefore.c.cross.value, 5,
    `ARM TWO must stand the same MIX arm one did — the deep address reads 5 across the tiers and 1 at \`mem\`: `
      + `THE DRIVE READ ${describe(shadowBefore.c)}`);
  assert.equal(shadowBefore.c.perTier.mem.value, 1,
    `with the \`mem\` version beside the \`temp\` one: THE DRIVE READ ${describe(shadowBefore.c)}`);
  assert.equal(shadowRollback.ok, false,
    `**THE REVERSAL IS REFUSED HERE — AND THE DIFFERENCE FROM ARM ONE IS THE PAIR'S PARENT AND NOTHING ELSE** `
      + `(\`D-90\` (1): *"a parent that RESOLVES applies the pair"*; \`D-96\` (1)): the call answered `
      + `${JSON.stringify(shadowRollback.ok === true ? shadowRollback.value : null)}`);
  assert.equal(shadowRollback.ok === false ? shadowRollback.caught.status : null, 'ConstraintPassRefused',
    `with the set's rank-\`20\` member: THE DRIVE READ `
      + `${JSON.stringify(shadowRollback.ok === false ? shadowRollback.caught.status : null)}`);
  assert.equal(shadowAskDelta, 1,
    `**AND THE JUDGEMENT ASKED IT ONCE — THE READING ARM ONE READS AS \`0\`** (\`D-90\` (2) read at both `
      + `instants): the body was entered ${shadowAskDelta} time(s) across the reversal, on `
      + `${JSON.stringify(shadowAsks)}`);
  assert.equal(shadowLog.length, 1,
    `the refusal carries ONE \`constraint-check\` entry: THE DRIVE READ ${JSON.stringify(shadowLog)}`);
  assert.equal(shadowLog[0].kind, 'constraint-check',
    `and the entry is a \`constraint-check\` — the kernel's own closed kind set: THE DRIVE READ `
      + `${JSON.stringify(shadowLog[0].kind)}`);
  assert.equal(shadowLog[0].id, 'admits-five',
    `and it names the pair that refused, one level below the branch: THE DRIVE READ `
      + `${JSON.stringify(shadowLog[0].id)}`);
  assert.equal(typeof shadowLog[0].message === 'string' && /undone/i.test(shadowLog[0].message), true,
    `**AND IT SAYS THE REVERSAL WAS UNDONE — TRUE, BECAUSE EVERY ADDRESS IT MOVED STANDS AGAIN** (\`D-41\` item `
      + `\`2\`: *"a message must not claim a restoration that did not happen"*): THE DRIVE READ `
      + `${JSON.stringify(shadowLog[0].message)}`);

  // ── ARM TWO'S FINDING: EVERY ADDRESS, EVERY TIER, IDENTICAL. ────────────────────────────────────────────
  assert.deepEqual(shadowAfter.c, shadowBefore.c,
    `**THE FINDING — THE MIXED-DEPTH SHADOW IS RESTORED VERSION BY VERSION: the deep address stands again with `
      + `the \`mem\` version (1) and the \`temp\` version (5) that the compensating write could not put back, `
      + `because it wrote the pair's ASSEMBLED value at the pair's own tier and moved the deep tier with it. THE `
      + `DRIVE READ before ${describe(shadowBefore.c)} and after ${describe(shadowAfter.c)}`);
  assert.equal(shadowAfter.c.perTier.mem.value, 1,
    `and the \`mem\` version is the PRE-REVERSAL one (1), not the assembled value written back at \`mem\` (5): THE `
      + `DRIVE READ ${describe(shadowAfter.c)}`);
  assert.equal(shadowAfter.c.cross.value, 5,
    `and the cross-tier read answers 5 again — so the \`temp\` version stands beside the \`mem\` one: THE DRIVE `
      + `READ ${describe(shadowAfter.c)}`);
  assert.deepEqual(shadowAfter.b, shadowBefore.b,
    `the level above the mixed version stands again too, at the tier it stood at — a PARENT the reversal left `
      + `a branch, which is why this arm's pair was applicable at all: THE DRIVE READ before `
      + `${describe(shadowBefore.b)} and after ${describe(shadowAfter.b)}`);
  assert.deepEqual(shadowAfter.a, shadowBefore.a,
    `and so does the branch above it: THE DRIVE READ before ${describe(shadowBefore.a)} and after `
      + `${describe(shadowAfter.a)}`);
  assert.equal(shadow.constraints().length, 1,
    `and the pair still stands registered — a REFUSED reversal removes nothing: \`constraints()\` answers `
      + `${JSON.stringify(shadow.constraints())}`);

  // ── THE READINGS, PRINTED PER ADDRESS AND PER TIER (`D-21`). ────────────────────────────────────────────
  t.diagnostic(`D-41 · MIXED-DEPTH SHADOW — TWO ARMS, ONE RULE. ARM ONE (SKIP, \`D-90\` (4) + \`D-96\` (1)): the `
    + `drive stood a=\`mem\`, a.b=\`mem\` and a.b.c=\`mem\` 1 BESIDE \`temp\` 5 (write `
    + `${JSON.stringify(deep.op.opId)}); the reversal of ${JSON.stringify(root.op.opId)} answered `
    + `${JSON.stringify(record)} at an ask-delta of ${askDelta} — the store STANDS AS THE REVERSAL LEFT IT: before `
    + `a=${describe(before.a)} b=${describe(before.b)} c=${describe(before.c)} / after ${describe(after.a)} `
    + `${describe(after.b)} ${describe(after.c)}; the pair is carried as ${JSON.stringify(rows)}. ARM TWO `
    + `(REFUSAL, \`D-41\` item \`2\`): a pair at the DEEP address refused the state the reversal of `
    + `${JSON.stringify(shadowDeep.op.opId)} left (status `
    + `${JSON.stringify(shadowRollback.ok === false ? shadowRollback.caught.status : null)}, ask-delta `
    + `${shadowAskDelta}), and the store's mark restore re-stated the shadow EXACTLY: before `
    + `a=${describe(shadowBefore.a)} b=${describe(shadowBefore.b)} c=${describe(shadowBefore.c)} / after `
    + `a=${describe(shadowAfter.a)} b=${describe(shadowAfter.b)} c=${describe(shadowAfter.c)} — the \`mem\` `
    + `version 1 and the \`temp\` version 5 both standing; log ${JSON.stringify(shadowLog[0]?.message)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 5 — THE HIGHER TIER WHOSE PARENT THE REVERSAL MOVED BELOW IT
//
// **THE SHAPE.** `a.b` stands at `file` under a PARENT (`a`) that stands at `file`; the reversal moves the parent
// DOWN to `mem`; the compensating restore therefore had to write a `file` version under a `mem` parent — **the
// store's own monotonicity clause refuses exactly that write** (`§3.4`: a write whose tier outranks its parent's
// answers `ParentAnchorMonotonicityViolation`; the store's own battery pins it at
// `s6_6_a_version_above_its_parent_s_tier_is_restored_from_the_record`), so the old restore reported the address
// as not restored. **A MARK RESTORE DOES NOT WRITE: it re-states what the journal recorded**, so the `file`
// version comes back under the `file` parent it stood under, and this cell reads it at both addresses and at
// every tier.
//
// **AND THE PAIR WATCHES ONLY THE CHILD** (`['a','b']`), which is the measurement's own point: the parent is not
// an address the restore would ever name.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-41 · the HIGHER-TIER/PARENT case — a `file` version whose parent the reversal leaves at `mem` — is restored exactly by the store\'s own journal, at both addresses and at every tier', (t) => {
  const store = makeFileStore();
  // ── THE DRIVE: `mem` first, then the `file` write that outranks and purges it.
  const lower = attempt(() => store.write(['a'], 'mem', { b: 'second' }));
  const upper = attempt(() => store.write(['a'], 'file', { b: 'durable' }));
  // The pair watches the CHILD and admits the file-tier standing.
  const pair = attempt(() => store.addConstraint({ address: ['a', 'b'], id: 'admits-the-durable' },
    (context) => (context.value === 'durable' ? true : { message: 'this pair admits the durable value alone' })));
  const before = { a: standing(store, ['a']), b: standing(store, ['a', 'b']) };
  const rollback = attempt(() => store.rollback(upper.ok ? upper.value.op.opId : 'no-op'));
  const after = { a: standing(store, ['a']), b: standing(store, ['a', 'b']) };
  const log = rollback.ok === false && rollback.caught !== null && typeof rollback.caught === 'object'
    && Array.isArray(rollback.caught.log) ? rollback.caught.log : [];

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([lower.ok, upper.ok, pair.ok], [true, true, true],
    `the drive's two writes and its pair must all land, or nothing below is measured: lower=`
      + `${JSON.stringify(lower.caught)} upper=${JSON.stringify(upper.caught)} pair=${JSON.stringify(pair.caught)}`);
  assert.equal(rollback.ok, false,
    `the reversal must be REFUSED — it restores the `+"`mem`"+` version under the child and the pair refuses it: `
      + `the call answered ${JSON.stringify(rollback.value)}`);

  // ── THE DRIVE STANDS THE SHAPE THE OLD RESTORE COULD NOT REBUILD. ───────────────────────────
  assert.deepEqual(stoodTiers(before.b), [{ tier: 'file', value: 'durable' }],
    `\`['a','b']\` must stand at \`file\` ALONE before the reversal: THE DRIVE READ ${describe(before.b)}`);
  assert.deepEqual(stoodTiers(before.a), [{ tier: 'file', value: { b: 'durable' } }],
    `and its PARENT must stand at \`file\` — the tier the reversed write leaves it below: THE DRIVE READ `
      + `${describe(before.a)}`);
  // **THE REVERSED STATE IS NOT READABLE BETWEEN THE TWO ACTS, AND THAT IS A PROPERTY OF THE DESIGN RATHER
  // THAN A GAP IN THIS CELL**: the restore runs INSIDE the refusal's production, so the first instant a caller
  // can read is after it. **WHAT IS READABLE IS THAT THE REVERSAL MOVED THE STATE TO ONE THE PAIR REFUSED** —
  // the throw below — **and its shape is the store's own battery's subject**
  // (`s6_6_a_version_above_its_parent_s_tier_is_restored_from_the_record`: the reversal leaves the parent at
  // `mem`, the child with it, and a `file` write under that parent answers `ParentAnchorMonotonicityViolation`).
  assert.equal(rollback.caught.status, 'ConstraintPassRefused',
    `the reversal's terminal state is the one the pair REFUSED, which is what proves it moved the parent and the `
      + `child to \`mem\`: THE DRIVE READ ${JSON.stringify(rollback.caught.status)}`);

  // ── THE FINDING: THE HIGHER TIER IS RESTORED UNDER THE HIGHER PARENT. ──────────────────────
  assert.deepEqual(after.b, before.b,
    `THE FINDING — the \`file\` version of the CHILD stands again at \`file\`, where it stood: the compensating `
      + `WRITE could not take this state at all (a \`file\` version under a \`mem\` parent is `
      + `\`ParentAnchorMonotonicityViolation\`), and the store's journal replay re-states it because it writes `
      + `nothing. THE DRIVE READ before ${describe(before.b)} and after ${describe(after.b)}`);
  assert.deepEqual(after.a, before.a,
    `and the PARENT — an address no compensating restore would name — stands again at \`file\` with it: THE `
      + `DRIVE READ before ${describe(before.a)} and after ${describe(after.a)}`);
  assert.equal(after.b.perTier.mem.present, false,
    `and no \`mem\` version was minted under the child as a side effect: THE DRIVE READ ${describe(after.b)}`);
  assert.equal(log.length, 1,
    `the refusal carries ONE \`constraint-check\` entry: THE DRIVE READ ${JSON.stringify(log)}`);
  assert.equal(typeof log[0].message === 'string' && /undone/i.test(log[0].message), true,
    `and it says the reversal was UNDONE — TRUE, because every address it moved stands again: THE DRIVE READ `
      + `${JSON.stringify(log[0].message)}`);

  // ── THE READINGS, PRINTED PER ADDRESS AND PER TIER (`D-21`). ────────────────────────────────
  t.diagnostic(`D-41 · HIGHER-TIER/PARENT: before the reversal a=${describe(before.a)} b=${describe(before.b)}; `
    + `the reversal of ${JSON.stringify(upper.value.op.opId)} moved the parent to \`mem\` (a state the pair `
    + `refuses, ${JSON.stringify(rollback.caught.status)}); after the refusal a=${describe(after.a)} `
    + `b=${describe(after.b)} — the \`file\` child back under the \`file\` parent, at \`file\` and at no other `
    + `tier; log ${JSON.stringify(log[0]?.message)}`);
});
