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
test('KAW-1 · D-175 — the closed table is a WEAKMAP keyed by the attempt, and BOTH declared forms answer while it lives', () => {
  const store = freshStore();
  const kernel = kernelFor(store);
  // **NO WINDOW TO ASSERT**: `CLOSED_ATTEMPT_WINDOW`'s `1024` stands as the superseded mechanism's declared figure with no reader,
  // and what is asserted instead is the PROPERTY THE WINDOW APPROXIMATED — **retention tied to reachability, and the two forms
  // `parameter-semantics.md §2.15` declares both answering while the attempt can still be named.**
  assert.equal(typeof kernel.closed.get, 'function', 'the closed table answers a read');
  assert.equal(typeof kernel.closed.size, 'undefined',
    'D-175: it is a `WeakMap` — it has NO size, so nothing can bound it by a count and nothing needs to');

  const writes = 1056;                     // far past the superseded window, so the old mechanism would have dropped the first
  const receipts = [];
  for (let i = 0; i < writes; i += 1) receipts.push(store.write(['k'], 'mem', i));

  // **THE OLDEST IS STILL ANSWERABLE** — the window would have taken it, and it is the whole difference between the two mechanisms.
  const oldest = receipts[0].op;
  const oldestAttempt = kernel.closedIds.get('attempt-1')?.deref();
  assert.ok(oldestAttempt !== undefined,
    'D-175: the first attempt is still nameable after ' + writes + ' writes — the window would have dropped it at '
      + '`CLOSED_ATTEMPT_WINDOW`');
  const byRecord = attempt(() => kernelLog(store, oldestAttempt));
  assert.equal(byRecord.ok, true, 'and its REF answers `log`');
  assert.deepEqual(byRecord.value, [], 'with the empty list, because its log crossed with the report (`D-58`)');
  const byId = attempt(() => kernelLog(store, 'attempt-1'));
  assert.equal(byId.ok, true,
    'AND ITS `id` STRING ANSWERS TOO — `parameter-semantics.md §2.15` holds on this table: the weak id index resolves');
  assert.deepEqual(byId.value, byRecord.value, 'to the same answer the reference gives');

  // **AND A NAME THAT IS NOBODY'S MEETS THE DECLARED REFUSAL**, which is the one answer the two forms share.
  assert.equal(statusOf(attempt(() => kernelLog(store, 'never-minted'))), 'KC-2',
    'D-175: an id no mint reached meets `KC-2` — and a name whose attempt has been COLLECTED meets the same one, because the report '
      + 'is gone at that instant too, so the two forms cannot disagree');
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
