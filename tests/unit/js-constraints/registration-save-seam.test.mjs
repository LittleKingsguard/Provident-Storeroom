// tests/unit/js-constraints/registration-save-seam.test.mjs
//
// **`U-STOREROOM-FILE-SAVE-COVERAGE` AT THE PRESET'S `tests/unit/js-constraints/` SCOPE (`D-5`).**
//
// WHAT THIS SCOPE IS FOR, AND WHY THESE CELLS ARE NOT IN `tests/e2e/`. The e2e battery drives BEHAVIOUR at the
// package's boundary; these cells pin the CENSUS consequences `contract.md PIN-3`, `PIN-6` and `PIN-13` (iv)
// hold: that the carriers this unit added mint NO member, NO entry and NO fourth record position. Each cell
// asserts an own-key set, which is a package-level observable and needs no `.node` beyond the one the e2e
// battery already loads. **Layer: `ENVELOPE/PURE`.**
//
// **AND ONE HONEST NOTE ON PROVENANCE.** `verification.md §2.3`'s `U1` names a `Symbol`-keyed seam installed on
// the instance and asserts it is invisible to `Object.keys` / `Object.getOwnPropertyNames`. No cell here
// asserts that seam: a package-level drive cannot reach a `Symbol.for` channel without reading the source, and
// reading the source is not this scope's instrument. What is asserted instead is the CENSUS the seam exists to
// keep — the instance's own enumerable member set before and after every arm of this unit, and the three
// declared members of the reversal's record. A cell claiming the seam's invisibility from here would be
// claiming an instrument it does not have.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../../bindings/js/index.mjs';

const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });
const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `fsc-unit-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const attempt = (fn) => {
  try {
    return { ok: true, value: fn() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
};
const bytesOf = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

test('U1 · the instance\'s own enumerable member set is UNMOVED by every arm of this unit — the registration\'s save, a refusal\'s rollback, a reversal\'s save and a regeneration mint no member', () => {
  const { dir, filePath } = scratch('u1');
  const store = make({ filePath });
  const before = Object.keys(store).slice().sort();
  assert.equal(before.length > 0, true, 'the census must be readable, or the comparison is vacuous');

  // ARM 1: a registration whose repair route-writes at the `file` tier and PASSES.
  store.write(['seed'], 'file', 1);
  attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => ({ ok: true, op: record.write(['b'], 'file', 42).op }) })));
  assert.deepEqual(Object.keys(store).sort(), before, 'ARM 1 mints no member (`PIN-3` (ii)(b))');

  // THE REFUSING ARM: the composition and the report's `rollback` are the attempt's, not the instance's.
  attempt(() => store.addConstraint({ address: ['c'], id: 'c' }, (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => { record.write(['d'], 'file', 1); return { ok: false, message: 'declines' }; } })));
  assert.deepEqual(Object.keys(store).sort(), before, 'the refused arm mints no member (`PIN-10`)');

  // ARM 3 / ARM 4: a reversal's save and a regenerating reversal mints no member (`D-116`, `PIN-13` (iv)).
  const w = store.write(['e'], 'file', 1);
  attempt(() => store.rollback(w.op.opId));
  assert.deepEqual(Object.keys(store).sort(), before, 'a caller\'s reversal mints no member');

  const small = make({ filePath, journalLength: 2 });
  const a1 = small.write(['x'], 'file', 1);
  const a2 = small.write(['x'], 'file', 2);
  small.write(['y'], 'file', 9);
  attempt(() => small.rollback(a2.op.opId));
  attempt(() => small.rollback(a2.op.opId));
  assert.deepEqual(Object.keys(small).sort(), before, 'and a regenerating reversal mints none either');
  const _ = a1;
  rmSync(dir, { recursive: true, force: true });
});

test('U2 · ★ `RollbackRecord`\'s own key set is STILL ITS THREE DECLARED MEMBERS after a reversal that REGENERATED (`PIN-13` (iv))', () => {
  const { dir, filePath } = scratch('u2');
  const store = make({ filePath, journalLength: 2 });
  store.write(['a'], 'file', 1);
  const second = store.write(['a'], 'file', 2);
  store.write(['x'], 'file', 9);
  store.rollback(second.op.opId);                       // the plain walk, whose marks produce the arm
  const regenerating = attempt(() => store.rollback(second.op.opId));
  assert.equal(regenerating.ok, true,
    `the arm must REGENERATE and return (\`D-108\` item 1): ${JSON.stringify(regenerating.caught?.status)}`);
  const record = regenerating.value;
  assert.deepEqual(Object.keys(record), ['opId', 'undoneOps', 'restoredTo'],
    '**NO MEMBER IS MINTED — a `regenerated: true` flag, a `base` member or a fourth position would be the '
      + `finding** (\`PIN-13\` (iv)): ${JSON.stringify(Object.keys(record))}`);
  assert.equal(Array.isArray(record.undoneOps), true, '`undoneOps` is still an ARRAY of ids');
  assert.equal(record.undoneOps.every((id) => typeof id === 'string'), true, 'and every element is an id');
  assert.equal(typeof record.restoredTo === 'object' && record.restoredTo !== null, true,
    '`restoredTo` is still the store\'s own `BaseState`');
  assert.deepEqual(Object.keys(record.restoredTo).sort(), ['present', 'value'],
    `and \`BaseState\` is still its two members: ${JSON.stringify(Object.keys(record.restoredTo))}`);
  rmSync(dir, { recursive: true, force: true });
});

test('U3 · a refused registration mints no member on the REFUSAL either — its own key set is the surface\'s four, and the composition\'s steps are the attempt\'s and not the caller\'s', () => {
  const store = make();
  const refused = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => { record.write(['b'], 'mem', 1); return { ok: false, message: 'declines' }; } })));
  assert.equal(refused.ok, false, 'the registration refuses');
  // `surface.md §2.5` item 9: the failure form's member set is FLAT across arms — this unit adds no fifth.
  assert.deepEqual(Object.keys(refused.caught).sort(), ['address', 'log', 'message', 'status'],
    `**THE COMPOSITION ADDS NO MEMBER TO THE REFUSAL** (\`PIN-10\` (iii): the steps live in the closed `
      + `report's \`rollback\`, which is the landing's carrier): ${JSON.stringify(Object.keys(refused.caught))}`);
  assert.deepEqual(store.constraints(), [], 'and no pair is carried on a refusal');
});

test('U4 · the store\'s `file`-tier projection and the bytes agree once every arm of this unit has run — the rule read as a unit-level invariant (`D-106` item 2)', () => {
  const { dir, filePath } = scratch('u4');
  const store = make({ filePath });
  store.write(['a'], 'file', 1);
  attempt(() => store.addConstraint({ address: ['p'], id: 'p' }, (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => ({ ok: true, op: record.write(['q'], 'file', 'v').op }) })));
  store.write(['m'], 'mem', 1);
  store.delete(['m']);
  const second = store.write(['a'], 'file', 2);
  attempt(() => store.rollback(second.op.opId));
  // THE INVARIANT: a FRESH BOOT over the same path answers, at every address the acting instance holds, what
  // the acting instance answers. **That is the rule as a universal, read at one deterministic instance.**
  const fresh = make({ filePath });
  for (const address of [['a'], ['q'], ['p']]) {
    const mine = attempt(() => store.read(address));
    const theirs = attempt(() => fresh.read(address));
    assert.deepEqual(theirs.ok ? { present: true, value: theirs.value } : { present: false, refused: theirs.caught.status },
      mine.ok ? { present: true, value: mine.value } : { present: false, refused: mine.caught.status },
      `**THE BYTES AGREE WITH THE MEMORY AT ${JSON.stringify(address)}** — \`D-106\` item 2: an act that moves `
        + `file-tier data and leaves the bytes alone is a defect (fresh=${JSON.stringify(theirs.ok ? theirs.value : theirs.caught.status)})`);
  }
  assert.notEqual(bytesOf(filePath), null, 'and the path exists, so the invariant is not read off an absent file');
  rmSync(dir, { recursive: true, force: true });
});
