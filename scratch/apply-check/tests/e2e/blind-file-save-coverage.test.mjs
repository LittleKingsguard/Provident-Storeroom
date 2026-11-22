// tests/e2e/blind-file-save-coverage.test.mjs
//
// **★ THIS FILE IS `verification.md §3.1`'s BLIND INSTANCE, AND IT IS NO LONGER BLIND. THAT IS SAID PLAINLY
// RATHER THAN CLAIMED AWAY.**
//
// `verification.md §3.1` requires a blind instance for THE RULE, THE REFUSAL AND THE REGENERATION, *"authored
// BEFORE the fix"*, written from `clauses.md`'s eight replacement texts and from the contract directory alone,
// and asserting the END STATE a consumer reads — *"the bytes after the act, and a fresh instance's answer over
// the same path"*. **THIS PASS COULD NOT MEET THE ORDERING REQUIREMENT.** The landing this file would have
// predicted is already at this tree's HEAD (`1a0d252` + the unit's working tree), so these six cells were
// authored against a tree in which the behaviour is already correct. **WHAT THAT COSTS, STATED EXACTLY: a
// blind instance's whole value is its capacity to have been RED before the fix and GREEN after it; a cell
// authored afterwards cannot demonstrate that it would have turned, and the corpus therefore loses the one
// piece of evidence that these arms are BEHAVIOUR and not documentation.** **No cell below claims blindness,
// and `verification.md §3.1` is owed a blind instance by the pass that can author one before a fix — this file
// is not it, and it says so here rather than in a report nobody reads beside the battery.**
//
// WHAT IT IS STILL WORTH, NAMED SO IT IS NOT READ AS NOTHING: each cell is derived from the DECLARED TEXTS and
// not from the cells of `verification.md §2.1` — the four predictions `carrier.md §5` records at its own
// closing paragraph — so it is an independent reading of the same corpus at a second scope, and it fails if
// any of the four declared end states stops holding. It asserts STATE and never a mechanism: no cell here
// names a helper, a frame or a member, because a blind instance may not know one (`verification.md §3.1`'s own
// limit clause). **Layer: `ENVELOPE/PURE`.**

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

const bytesOf = (filePath) => (existsSync(filePath) ? readFileSync(filePath, 'utf8') : null);
const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `fsc-blind-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });
const attempt = (fn) => {
  try {
    return { ok: true, value: fn() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
};
const at = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, code: read.caught.status };
};

// PREDICTION 1 — *a compensation writes nothing.*
test('blind-p1 · a FAILING act leaves the bytes exactly as it found them — a reversal the act composes to undo itself is not an act and saves nothing', () => {
  const { dir, filePath } = scratch('p1');
  const store = make({ filePath });
  store.write(['keep'], 'file', 'kept');
  const before = bytesOf(filePath);
  attempt(() => store.addConstraint({ address: ['n'], id: 'n' },
    (context) => (context.value === undefined ? true : { message: 'nothing is admitted here' })));
  const write = attempt(() => store.write(['n'], 'file', 'never'));
  assert.equal(write.ok, false, 'the act must fail');
  assert.equal(bytesOf(filePath), before,
    `the bytes are the ones the failing act found: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(at(store, ['n']), { present: false, code: 'AddressNotFound' },
    'and the store is where the call found it');
  rmSync(dir, { recursive: true, force: true });
});

// PREDICTION 2 — *a reversal whose judgement passes writes the image the path does not hold.*
test('blind-p2 · a reversal that PASSES leaves the path holding the state it restored — and a fresh instance over that path reads it', () => {
  const { dir, filePath } = scratch('p2');
  const store = make({ filePath });
  store.write(['v'], 'file', 'first');
  const second = store.write(['v'], 'file', 'second');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { v: 'second' }, 'the path holds the value the reversal will remove');
  const reversal = attempt(() => store.rollback(second.op.opId));
  assert.equal(reversal.ok, true, 'the reversal passes');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { v: 'first' },
    `the path holds the state the reversal restored: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(at(make({ filePath }), ['v']), { present: true, value: 'first' },
    'and a fresh boot reads it');
  rmSync(dir, { recursive: true, force: true });
});

// PREDICTION 3 — *a pair that refuses a reversed state and has a repair ends with the repaired state durable.*
test('blind-p3 · a pair that refuses the state a reversal leaves and carries a repair ends with the REPAIRED state durable', () => {
  const { dir, filePath } = scratch('p3');
  const store = make({ filePath });
  const only = store.write(['w'], 'file', 1);
  store.addConstraint({ address: ['w'], id: 'w' }, (context) => (context.value !== undefined
    ? true
    : { message: '`["w"]` must be present', repair: (record) => ({ ok: true, op: store.write(['w'], 'file', 'repaired', record).op }) }));
  const reversal = attempt(() => store.rollback(only.op.opId));
  assert.equal(reversal.ok, true, `the judgement passes through the repair: ${JSON.stringify(reversal.caught?.status)}`);
  assert.deepEqual(at(make({ filePath }), ['w']), { present: true, value: 'repaired' },
    `**THE REPAIRED STATE IS DURABLE** — the path carries it: ${JSON.stringify(bytesOf(filePath))}`);
  rmSync(dir, { recursive: true, force: true });
});

// PREDICTION 4 — *a listener a repair's write fires at a reversal's judgement is invoked once, with the
// triggering address, BEFORE the member returns* — the second half of `carrier.md §5`'s fourth prediction
// (*"and never on a judgement that refuses"*) is NOT claimed here; see the cell's own closing paragraph.
test('blind-p4 · a listener a repair\'s write fires at a reversal\'s judgement runs ONCE, with the triggering address, BEFORE the call returns', () => {
  const { dir, filePath } = scratch('p4');
  const store = make({ filePath });
  const fires = [];
  const flags = { returned: false };
  store.listen('h', [['site']]);
  store.register('h', (...args) => { fires.push({ count: args.length, address: args[0], returned: flags.returned }); });
  store.write(['site'], 'file', { seed: 'yes' });
  const only = store.write(['k'], 'file', 1);
  store.addConstraint({ address: ['k'], id: 'k' }, (context) => {
    if (context.value !== undefined) return true;
    return {
      message: '`["k"]` must be present',
      repair: (record) => {
        store.write(['k'], 'file', 'ok', record);
        store.write(['site', 'event'], 'file', 'fired', record);
        return { ok: true };
      },
    };
  });
  fires.length = 0;
  const reversal = attempt(() => store.rollback(only.op.opId));
  flags.returned = true;
  assert.equal(reversal.ok, true, 'the judgement passes');
  assert.equal(fires.length, 1, `**ONCE** — the drive read ${JSON.stringify(fires)}`);
  assert.equal(fires[0].count, 1, 'with ONE argument');
  assert.deepEqual(fires[0].address, ['site', 'event'], 'and it is the triggering address');
  assert.equal(fires[0].returned, false, '**BEFORE THE MEMBER RETURNED**');

  // **AND NOT ON A JUDGEMENT THAT REFUSES.** This pass could not reproduce a refusing judgement from this
  // file's own fixture without reaching a mechanism a blind instance may not name (the pair's own carried
  // state and the instant its ask is made), so the limb is **NOT CLAIMED HERE**: the three silent arms — the
  // throwing arm, the failing arm and a reversal that fired nothing — are driven at
  // `tests/e2e/file-save-coverage.test.mjs`'s `FSC-RV-11`, where the fixture is derived from `carrier.md §5`'s
  // own rows and not from a blind reader's reading of prose. **A prediction this file did not make is left
  // unmade rather than asserted and quietly weakened.**
  rmSync(dir, { recursive: true, force: true });
});

// THE TWO ARMS `D-107` AND `D-108` ADD, PREDICTED FROM THE REPLACEMENT TEXTS ALONE.
test('blind-p5 · a REGISTRATION THAT REFUSES leaves the store where the call found it — what the route landed before the refusal does not stand', () => {
  const { dir, filePath } = scratch('p5');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const refused = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => { record.write(['b'], 'file', 9); return { ok: false, message: 'no' }; } })));
  assert.equal(refused.ok, false, 'the registration refuses');
  assert.deepEqual(at(store, ['b']), { present: false, code: 'AddressNotFound' },
    '**A REFUSAL ROLLS BACK, WITHOUT EXCEPTION**');
  assert.equal(bytesOf(filePath), before, 'and the bytes are the ones the call found');
  rmSync(dir, { recursive: true, force: true });
});

test('blind-p6 · a reversal that meets an entry the window has already swallowed still REVERTS TO THE LAST VALID STATE — it does not strand you where you stand', () => {
  const { dir, filePath } = scratch('p6');
  const store = make({ filePath, journalLength: 2 });
  store.write(['a'], 'file', 1);
  const second = store.write(['a'], 'file', 2);
  store.write(['other'], 'file', 'kept');
  store.rollback(second.op.opId);
  const regenerating = attempt(() => store.rollback(second.op.opId));
  assert.equal(regenerating.ok, true,
    `**THE CALL RETURNS** — a state is rebuilt rather than refused: ${JSON.stringify(regenerating.caught?.status)}`);
  assert.deepEqual(at(store, ['a']), { present: true, value: 1 }, 'and the address answers the last valid state');
  assert.deepEqual(at(store, ['other']), { present: true, value: 'kept' },
    '**AND WHAT STANDS OUTSIDE THE REVERSAL\'S REACH SURVIVES IT**');
  assert.deepEqual(at(make({ filePath }), ['other']), { present: true, value: 'kept' },
    'in the bytes as well as in the memory');
  rmSync(dir, { recursive: true, force: true });
});
