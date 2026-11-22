// =====================================================================================================
// **`leg-carriage.test.mjs` — `D-169`: THE LEG SLOT ANSWERS ONLY THE BRACKET THAT JUST CLOSED**
// =====================================================================================================
//
// **THE HAZARD THIS FILE DRIVES** (`strata/decisions.md` · `D-169`, and `D-54`'s first half — *"do not let a
// pass consume a restart request it did not raise"*): `REPAIR_LEGS_LAST` is a **flat slot** beside a correctly
// nested `REPAIR_LEGS_OPEN` stack. Every bracket's `finally` **writes** it; only a **read** cleared it. So **an
// invocation that closed and was never read left its list standing for the next reader** — which is another
// invocation's, and that is a pass consuming a request it did not raise.
//
// **THE FIX WAS ONE LINE AT THE OPEN** (`state.mjs`'s invocation bracket): `REPAIR_LEGS_LAST = []` before the run,
// so **a bracket opening in between now leaves nothing for a stale read to take**.
//
// **AND THIS FILE IS THE DRIVE `D-169` SAID DID NOT EXIST**, written on the fix's own terms: it is the ONE case
// that distinguishes the two trees — **a read taken WHILE A BRACKET IS OPEN, after an unread close**.
//
//   · WITHOUT the fix the read answers the EARLIER invocation's legs — a list this bracket never raised.
//   · WITH the fix it answers the empty list, because this bracket's own open cleared the slot.
//
// **NOTHING HERE REACHES THE KERNEL**: the two instruments are the package's own and are driven through the
// `Symbol.for` channels it installs on every instance (`state.mjs`'s `EXTERNAL_CALL` and `REPAIR_LEG`), and the
// append is `appendRepairLeg`, which the package exports. **A cell that drove the kernel instead could not place
// its read BETWEEN an open and a close, which is the whole of this file's subject.**

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { appendRepairLeg } from '../../bindings/js/src/entry/state.mjs';

/** The invocation bracket the package installs on every instance (`D-45`'s channel, `D-46`'s name). */
const EXTERNAL_CALL = Symbol.for('provident-storeroom.external-call');
/** The reader that answers the bracket that closed last, and clears it as it answers (`D-104`). */
const REPAIR_LEG = Symbol.for('provident-storeroom.repair-leg');

/** A store, and the two instruments this file drives. **A `saveCall` is absent and the path is absent: the
 *  carriage is the same on every store, and the smallest construction keeps the cell about one thing.** */
function harness() {
  const store = storeCreate({ journalLength: 8, listeners: [] });
  assert.equal(typeof store[EXTERNAL_CALL], 'function',
    'the invocation bracket is installed on the instance: ' + EXTERNAL_CALL.toString());
  assert.equal(typeof store[REPAIR_LEG], 'function',
    'and so is the reader: ' + REPAIR_LEG.toString());
  return { store, bracket: store[EXTERNAL_CALL], read: store[REPAIR_LEG] };
}

/** One record the append accepts: a journal op and one triggered element, both copied member by member. */
function aRecord(handle) {
  return {
    op: {
      opId: 'op-' + handle, kind: 'write', address: ['a'], tier: 'mem',
      before: { present: false, value: undefined }, after: { present: true, value: 1 },
      seq: 1, compacted: false,
    },
    triggered: [{ handle, address: ['a'] }],
  };
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE SUBJECT: A BRACKET THAT OPENS AFTER AN UNREAD CLOSE FINDS NOTHING TO TAKE.**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('LC-1 · D-169 — a read inside an open bracket answers nothing, though an earlier close left legs standing', () => {
  const { bracket, read } = harness();

  // (1) **AN UNREAD CLOSE WITH LEGS** — a bracketed invocation that records one leg and is NEVER read. Before the
  // fix its list stood in the slot for whoever read next.
  bracket(() => {
    appendRepairLeg(aRecord('earlier'));
    return 'closed';
  });
  // **AND NOTHING HAS READ IT**: the slot is where the hazard lives, and this line is the setup's proof that the
  // hazard is real rather than assumed — the bracket below is the only reader in this cell.
  let insideDuringOpen = null;

  // (2) **A READ TAKEN WHILE A BRACKET IS OPEN.** This is the one case the fix changes: the second bracket's open
  // cleared the slot, so the read sees its own (empty) list and not the earlier invocation's.
  bracket(() => {
    insideDuringOpen = read();
    appendRepairLeg(aRecord('this-one'));
    return 'open';
  });

  assert.deepEqual(insideDuringOpen, [],
    'D-169: a read INSIDE an open bracket answers nothing — the bracket that closed before it did not raise this '
      + 'act, so its legs are not this act\'s to consume. It read: ' + JSON.stringify(insideDuringOpen));

  // (3) **AND THE BRACKET THAT JUST CLOSED IS STILL ANSWERED** — the carriage is narrowed and not broken: after the
  // close, the reader takes THIS invocation's leg, exactly as it always did.
  const after = read();
  assert.equal(Array.isArray(after) && after.length, 1,
    'the invocation that just closed is answered: ' + JSON.stringify(after));
  assert.equal(after[0].triggered[0].handle, 'this-one',
    'and the leg it answers is ITS OWN, not the earlier invocation\'s');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **AND THE READ'S OWN CLEAR SURVIVES THE CHANGE** — the fix narrowed the slot, it did not remove the property
// that a second read cannot answer twice.
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('LC-2 · D-169 — the read still clears, so a second read answers nothing', () => {
  const { bracket, read } = harness();
  bracket(() => {
    appendRepairLeg(aRecord('once'));
    return 'closed';
  });
  const first = read();
  assert.equal(Array.isArray(first) && first.length, 1, 'the close is answered once: ' + JSON.stringify(first));
  assert.deepEqual(read(), [], 'and NOT twice — the read clears what it answered');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **AND A NESTED BRACKET STILL OWNS ITS OWN LEGS** — the stack beside the slot was always right, and the fix must
// not move it: the inner act's leg goes to the inner invocation, the outer's to the outer.
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('LC-3 · D-169 — a nested bracket\'s leg is its own, and the outer bracket keeps the legs it took', () => {
  const { bracket, read } = harness();
  let innerSeen = null;
  bracket(() => {
    appendRepairLeg(aRecord('outer-first'));
    bracket(() => {
      appendRepairLeg(aRecord('inner'));
      return 'inner-closed';
    });
    innerSeen = read();
    return 'outer-closed';
  });
  assert.equal(Array.isArray(innerSeen) && innerSeen.length, 1,
    'the nested invocation\'s own close is answered inside the outer one: ' + JSON.stringify(innerSeen));
  assert.equal(innerSeen[0].triggered[0].handle, 'inner',
    'and it is the INNER act\'s leg, because the append went to the innermost open bracket');
  const outerSeen = read();
  assert.equal(Array.isArray(outerSeen) && outerSeen.length, 1,
    'and the outer invocation is answered after ITS close: ' + JSON.stringify(outerSeen));
  assert.equal(outerSeen[0].triggered[0].handle, 'outer-first',
    'with the leg IT took — not the inner one it never raised');
});
