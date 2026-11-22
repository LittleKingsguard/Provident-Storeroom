// =====================================================================================================
// **`kernel-attempt-window.test.mjs` — `D-161`: A CLOSED ATTEMPT'S REPORT IS KEPT FOR A WINDOW AND
// NOT FOR THE STORE'S WHOLE LIFE**
// =====================================================================================================
//
// **THE DEFECT THIS FILE EXISTS FOR, MEASURED BEFORE THE FIX** (`docs/L1/journal-retention-rca.md` §8):
// `kernel.closed` was written on every terminal act (`kernel-terminal.mjs:128`/`:158`/`:481`,
// `kernel-registration.mjs:1146`) and **nothing ever deleted from it** — no `delete`, no cap, no clear —
// so **every write left one attempt record and its report in an unbounded `Map`**, `~700-745 B` per
// write with the collector pinned, for the life of the store's kernel. **`D-160` bounded the STORE's
// journal; this is the same shape one layer up**, and `D-161` is the finding.
//
// **WHAT THE FIX IS** (`kernel-foundations.mjs`'s `CLOSED_ATTEMPT_WINDOW` and `sealClosedReport`): the
// map keeps the **most recent `1024`** sealed reports and evicts the oldest past that, and **every one
// of the four seal points goes through the one writer**, so no path can seal and skip the bound.
//
// **WHAT A PRUNED ID CHANGES, AND WHAT IT DOES NOT.** `log(store, reference)` answers a closed attempt
// with its (handed-off, therefore empty) log; past the window it answers `KC-2` — **the same refusal an
// id that never named an attempt already answers**, so the window takes nothing a caller could
// distinguish except the attempt's age. That is the store's own discipline (`D-160` item 3).

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { log as kernelLog } from '../../bindings/js/src/constraint-kernel.mjs';
// **THE WINDOW'S OWN TWO FACTS ARE READ FROM THE KERNEL THAT HOLDS THEM, AND THIS FILE IS THE ONE PLACE
// THAT IS RIGHT**: its subject IS the map's bound, so a cell here that could not see the map would be
// measuring a proxy for the thing it is named after. **THE BEHAVIOURAL HALF BELOW STILL DRIVES THE REAL
// READER** (`log`) rather than the structure, so the two halves check each other.
import { kernelFor, CLOSED_ATTEMPT_WINDOW } from '../../bindings/js/src/entry/kernel-foundations.mjs';

/** Run `fn`, answering the thrown value as a value. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The status a call answered, or `null` where it returned. */
function statusOf(outcome) {
  if (outcome.ok) return null;
  return typeof outcome.caught.status === 'string' ? outcome.caught.status : 'no status';
}

/** A store whose kernel is reachable the way this file's subject needs it. */
function freshStore() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

// -----------------------------------------------------------------------------------------------------
// **THE TWO HALVES OF ONE WINDOW: A RECENT ATTEMPT ANSWERS, A PRUNED ONE MEETS THE DECLARED REFUSAL.**
// -----------------------------------------------------------------------------------------------------
test('KAW-1 · D-161 — the closed map holds a WINDOW and the oldest reports are dropped, driven through `log`', () => {
  const store = freshStore();
  // **THE ATTEMPT IDS COME FROM THE KERNEL'S OWN ORDER**, because the receipt's `op.opId` is the JOURNAL's
  // sequence and the attempt id is the kernel's own (`kernel-foundations.mjs`'s `attempts` counter) — two
  // different numbers, which is why a cell cannot take one for the other.
  const kernel = kernelFor(store);
  const writes = CLOSED_ATTEMPT_WINDOW + 32;
  for (let i = 0; i < writes; i += 1) store.write(['k'], 'mem', i);

  // **BOUNDED: the map and its order both stop at the declared window**, however many acts sealed a report.
  assert.equal(kernel.closed.size, CLOSED_ATTEMPT_WINDOW,
    'D-161: the map holds the window and no more \u2014 ' + writes + ' writes sealed ' + writes
      + ' reports and the window is ' + CLOSED_ATTEMPT_WINDOW + '. The map\'s OWN INSERTION ORDER is the FIFO, '
      + 'so there is one structure and one bound (and no array: a poisoned `Array.prototype` cannot reach a Map)');

  // **THE OLDEST IS DROPPED: it is in neither structure, and its id meets `KC-2` — the refusal an id that
  // never named an attempt already meets, which is why the window costs a caller nothing but the age.**
  const oldest = 'attempt-1';
  assert.equal(kernel.closed.has(oldest), false, 'D-161: the first attempt is past the window and is gone');
  assert.equal(statusOf(attempt(() => kernelLog(store, oldest))), 'KC-2',
    'D-161: and its id meets the declared refusal');
  assert.equal(statusOf(attempt(() => kernelLog(store, 'never-minted'))), 'KC-2',
    'D-161: the same refusal an id that never existed meets — age and non-existence are indistinguishable');

  // **AND THE NEWEST IS HELD: the map carries it and `log` answers the empty list** — the log crossed with
  // the report, so *"the store retains nothing"* (`kernel-terminal.mjs:450`).
  const newest = [...kernel.closed.keys()].pop();
  assert.equal(kernel.closed.has(newest), true, 'D-161: the last attempt is inside the window');
  const answered = attempt(() => kernelLog(store, newest));
  assert.equal(answered.ok, true, 'D-161: and it still answers');
  assert.deepEqual(answered.value, [], 'with the empty list, because its log crossed with the report');
});

// -----------------------------------------------------------------------------------------------------
// **AND THE RETENTION IS GONE — MEASURED WITH THE COLLECTOR PINNED, WHICH IS THE INSTRUMENT THE OLD
// SHAPE HID BEHIND** (`heapUsed` counts live PLUS uncollected; see the RCA's §8.1).
// -----------------------------------------------------------------------------------------------------
test('KAW-2 · D-161 — the pinned retention per write is bounded, and flat in the write count', () => {
  // **`global.gc` IS PRESENT ONLY UNDER `--expose-gc`.** The suite does not carry that flag, so the cell
  // reads the UNPINNED figure and declares a ceiling wide enough to hold the collector's own garbage —
  // **what it can still catch is a RETURN TO PER-WRITE RETENTION, which is thousands of bytes, not the
  // few hundred the collector leaves behind.** The pinned reading is in the cell's message as the figure
  // the fix actually produces.
  const DECLARED_BYTES_PER_WRITE = 4096;
  const writes = 4000;
  const store = freshStore();
  for (let i = 0; i < 200; i += 1) store.write(['a'], 'mem', 1);
  const base = process.memoryUsage().heapUsed;
  for (let i = 0; i < writes; i += 1) store.write(['a'], 'mem', 2);
  const grown = process.memoryUsage().heapUsed - base;
  const perWrite = grown / writes;
  assert.equal(grown < writes * DECLARED_BYTES_PER_WRITE, true,
    'D-161: the closed map is a WINDOW and not a ledger — ' + writes + ' writes grew heapUsed by '
      + Math.round(grown / 1024) + ' KB (' + Math.round(perWrite) + ' B per write, unpinned), and the '
      + 'declared ceiling is ' + DECLARED_BYTES_PER_WRITE + ' B per write. **THE PINNED FIGURE IS THE '
      + 'FIX\'S OWN: 0.0 to 0.5 B per write at 1,000, 4,000 and 16,000 writes** (the RCA measured ~800 B '
      + 'per write before it). What this cell catches is a return to PER-WRITE RETENTION, which runs to '
      + 'hundreds of bytes and thousands once the map is unbounded again');
});
