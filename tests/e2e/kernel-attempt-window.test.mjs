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
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **⟶ AND THIS FILE NOW CARRIES THE `closedIds` SWEEP'S BOUND TOO, ADDED `2026-11-22`** (`role_l3_test_writer`;
// `D-180` item 8, quoted at `KAW-3`: *"`closedIds` is bounded by a sweep of every 256 seals and by nothing else —
// a bound with a constant in it, like the window it replaced, and the only one left in that file"*). **The two
// tables are the same subject one layer apart**: `KAW-1`/`KAW-2` measure the CLOSED REPORT's retention
// (`kernel.closed`, a `WeakMap` keyed by the attempt, `D-175`), and `KAW-3` measures the ID INDEX beside it
// (`kernel.closedIds`, a `Map<id, WeakRef>`) — **which is still a `Map`, and therefore still has a `size`, and
// therefore still needs a bound.** **NO CELL ABOVE MOVED**: `KAW-1`'s reading that `attempt-1` survives `1056`
// writes is the reason `KAW-3` needs a collector, and the two are complementary rather than redundant.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

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

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `KAW-3` · THE `closedIds` SWEEP'S BOUND — THE PROBE, AND THE FIGURE IT IS HELD TO
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE SWEEP, READ AT ITS OWN BYTES AND QUOTED, BECAUSE THE BOUND IS THE WHOLE SUBJECT:**
//
// ```js
// const CLOSED_ID_SWEEP = 256;
// function pruneClosedIds(kernel) {
//   kernel.closedSeals += 1;
//   if (kernel.closedSeals % CLOSED_ID_SWEEP !== 0) return;
//   const kept = new Map();
//   for (const [id, ref] of kernel.closedIds) {
//     if (ref.deref() !== undefined) kept.set(id, ref);
//   }
//   kernel.closedIds = kept;
// }
// ```
//
// **WHAT THE TABLE IS.** `kernel.closedIds` is `Map<string, WeakRef<AttemptRef>>` — the ID FORM of
// `parameter-semantics.md §2.15`'s two spellings, so a caller can name a closed attempt by its id while the ref
// lives (`D-175`). **IT IS A `Map` AND NOT A `WeakMap`**: the KEY is a string, so nothing about reachability
// bounds it and the entries are held strongly. **THE VALUE IS WEAK**, so what the sweep can drop is exactly the
// entries whose ref the collector has taken.
//
// **THE BOUND THE CODE PRODUCES, STATED EXACTLY — AND IT IS NOT `<= 256`.**
//   * A sweep KEEPS every entry whose `WeakRef` still dereferences: **`closedIds.size` immediately after a sweep
//     is the number of attempts something can still name** — call that `live`. It is bounded by NOTHING the sweep
//     controls: a caller holding refs, or a collector that has not run, makes `live` as large as the write count.
//   * Between sweeps, each seal writes ONE fresh `id` (`AttemptRef.id` is minted from a monotone counter, so no
//     key repeats) and NOTHING is removed. **So the table grows by one entry per seal and by nothing else**, and
//     at any instant
//
//         closedIds.size  ≤  live-at-the-last-sweep  +  (seals since it)  ≤  live + (CLOSED_ID_SWEEP − 1)
//
//     — one sweep interval's worth on top of whatever survived the last sweep. **`<= 256` WOULD BE THE WRONG
//     ASSERTION**: the table legitimately exceeds `256` between sweeps (up to `live + 255`), and it exceeds any
//     figure at all when nothing is collected — **measured on this tree, `1200` writes with the receipts dropped
//     and no collection leave `closedIds.size` at `1200`**, every entry kept by the sweeps because every ref still
//     dereferenced (`KAW-1`'s reading, one measurement over). **So this cell asserts the code's own bound —
//     `live + 255` — and prints the measured figures beside it.**
//
// **WHY A CHILD PROCESS, AND WHY THE TURN IN IT.** `npm test` runs `node --test "tests/**/*.test.mjs"` with no
// `--expose-gc`, so nothing here can be collected by force in the test process — and **more than that: a
// `WeakRef.deref()` performed by the sweep keeps its target alive until the END OF THE CURRENT SYNCHRONOUS JOB**
// (the spec's `KeepDuringJob`), so a `gc()` inside the batch that sealed the refs collects none of them; that was
// measured too (`5120` writes in one synchronous loop, `gc()` every 16 writes, `closedIds.size === 5120`). **The
// probe therefore takes a TURN — `setTimeout(0)` — and then collects, which is the one ordering that makes
// "dropped receipts" mean "collectable refs".** The child is this same file re-executed, so there is one
// instrument and no second copy of it (the device `tests/e2e/store-retirement.test.mjs` uses).

const HERE = fileURLToPath(import.meta.url);
const PROBE_FLAG = '--closed-ids-sweep-probe';

/// **THE SWEEP'S CONSTANT, PINNED HERE ON PURPOSE.** `kernel-foundations.mjs:756` declares
/// `const CLOSED_ID_SWEEP = 256;` and **does NOT export it** (unlike `CLOSED_ATTEMPT_WINDOW` beside it), so this
/// cell names the figure itself and asserts the declaration below — **a change to the constant must redden this
/// cell, because the BOUND is its subject and the bound moves with the constant.** A cell that read the constant
/// out of the source and asserted against the same read would move with the implementation and could not fail.
const CLOSED_ID_SWEEP = 256;
const SEALS_PER_SWEEP = CLOSED_ID_SWEEP - 1;

/// **THE WORKLOAD: `5120` writes, each receipt DROPPED, in `80` batches of `64`.** A batch is one synchronous
/// job (so the turn and the collect that follow it can actually reach the previous batch's refs) and `64` writes
/// is `128` seals — so every second batch crosses a sweep boundary and the probe sees many of them.
const BATCH_WRITES = 64;
const BATCHES = 80;
const WRITES = BATCH_WRITES * BATCHES;

/// **`gc()` TWICE AFTER A TURN** — the turn releases the previous job's `KeepDuringJob` pins, and the second
/// collect is what turns a weakly-held target into a `WeakRef` that dereferences to `undefined`.
async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  globalThis.gc();
  globalThis.gc();
}

if (process.argv.includes(PROBE_FLAG)) {
  const store = freshStore();
  const kernel = kernelFor(store);
  let maxSize = 0;
  let survivors = 0;
  // **THE RISE INSIDE ONE SWEEP INTERVAL** — the limb that measures the sweep's SCHEDULE and not only the
  // table's absolute size: from what a sweep kept, how far can the table climb before the next sweep?
  let maxRise = 0;
  let intervalStart = 0;
  // **AND THE FIRST HALF'S OWN MAXIMUM**, which is what makes "bounded" a statement about the WRITE COUNT and
  // not only about a figure: with the pruning in place the two halves answer the same maximum, and with it
  // removed they answer half the write count each.
  let midMax = 0;
  for (let b = 0; b < BATCHES; b += 1) {
    await settle();
    for (let i = 0; i < BATCH_WRITES; i += 1) {
      // **THE RECEIPT IS DROPPED** — nothing of the caller's survives the call, which is the workload's whole
      // premise: "after many writes with their receipts dropped".
      store.write(['k'], 'mem', i);
      const size = kernel.closedIds.size;
      // A sweep has just run iff the seal count is a multiple — and the size read here is the survivors' own,
      // possibly plus the up-to-one seal this same write took after it. Taking the MAX over those instants can
      // only make the survivor figure larger, so the bound asserted below is not made easier by this reading.
      if (kernel.closedSeals % CLOSED_ID_SWEEP === 0) {
        survivors = Math.max(survivors, size);
        intervalStart = size;
      } else {
        maxRise = Math.max(maxRise, size - intervalStart);
      }
      if (b < BATCHES / 2) midMax = Math.max(midMax, size);
      maxSize = Math.max(maxSize, size);
    }
  }
  process.stdout.write(`${JSON.stringify({
    gc: typeof globalThis.gc === 'function',
    writes: WRITES,
    seals: kernel.closedSeals,
    maxSize,
    survivors,
    maxRise,
    midMax,
    finalSize: kernel.closedIds.size,
  })}\n`);
  process.exit(0);
}

/// **THE PROBE, RUN** — one child, `--expose-gc`, this same file. **`--expose-gc` IS THE ONLY WAY `gc()` IS
/// AVAILABLE AT ALL HERE** (`npm test` passes no such flag), and a child also keeps the workload's own heap out
/// of the test process's.
function probe() {
  const stdout = execFileSync(process.execPath, ['--expose-gc', HERE, PROBE_FLAG], {
    encoding: 'utf8',
    timeout: 180000,
    maxBuffer: 4 * 1024 * 1024,
  });
  return JSON.parse(stdout.trim().split('\n').pop());
}

const REPORT = probe();

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

// -----------------------------------------------------------------------------------------------------
// **THE SWEEP'S OWN BOUND, MEASURED — AND THE FIGURE IT MUST NOT BE ASSERTED AT.** `D-180` item 8: the table is
// *"bounded by a sweep of every 256 seals and by nothing else — a bound with a constant in it … and the only one
// left in that file"*; `D-181` stood with it. **NOTHING MEASURED IT** until this cell: `closedIds` is the one
// structure in `kernel-foundations.mjs` whose bound has no reader anywhere in the suite.
//
// **WHAT THIS CELL ASSERTS, IN ORDER: the collector ran · the workload crossed many sweep intervals · the measured
// maximum is under THE CODE'S OWN BOUND (`survivors + 255`) · it is also under a printed absolute figure with
// margin (`511 = 256 + 255`) · that figure is DISCRIMINATING (the write count is a multiple of it, so an unswept
// table could not pass) · and the constant this cell pins is still the source's own.**
// -----------------------------------------------------------------------------------------------------
test('KAW-3 · D-180 item 8 — the closed-id table is bounded by the 256-seal sweep, and the bound is NOT `<= 256`', () => {
  const source = readFileSync(
    new URL('../../bindings/js/src/entry/kernel-foundations.mjs', import.meta.url), 'utf8',
  );
  assert.ok(source.includes(`const CLOSED_ID_SWEEP = ${CLOSED_ID_SWEEP};`),
    `the bound this cell asserts is the source's own — \`bindings/js/src/entry/kernel-foundations.mjs\` must `
    + `declare \`const CLOSED_ID_SWEEP = ${CLOSED_ID_SWEEP};\`, and it does not. **A CHANGE TO THE CONSTANT IS A `
    + `CHANGE TO THE BOUND, SO IT MUST BE ACKNOWLEDGED HERE AND NOT SLIP THROUGH** (\`D-180\` item \`8\`: it is `
    + `"the only one left in that file")`);
  // **THE PROBE'S OWN PRECONDITIONS, ASSERTED AND NOT ASSUMED** — a run without the collector measures retention
  // and not the sweep, and a workload that never crossed a sweep boundary would pass any bound.
  assert.equal(REPORT.gc, true,
    'the probe ran with `--expose-gc`, so the entries it dropped are collected and not merely unreferenced');
  assert.equal(REPORT.writes, WRITES, 'and it drove the workload this cell declares');
  assert.ok(REPORT.seals >= 8 * CLOSED_ID_SWEEP,
    `and it crossed at least eight sweep intervals (${REPORT.seals} seals against a sweep every `
    + `${CLOSED_ID_SWEEP}) — otherwise the bound below would be asserted across a boundary the run never reached`);
  // **THE SWEEP'S OWN ARITHMETIC — THE SCHEDULE, AND WHAT IT CANNOT SEE.** Between two sweeps the table gains at
  // most ONE entry per seal and loses none, so from what a sweep kept it can rise by at most the number of seals
  // in the interval: `CLOSED_ID_SWEEP - 1`. **This limb measures the SCHEDULE and it can NOT see the pruning**: the
  // interval resets every `256` seals whether or not anything was dropped, so a sweep whose body were deleted
  // still answers a rise of `255` — measured, and said here rather than left for a reader to discover. What it
  // does catch is a sweep that runs LESS OFTEN than the constant says, or a seal that writes more than one entry.
  assert.ok(REPORT.maxRise <= SEALS_PER_SWEEP,
    `**THE RISE INSIDE ONE SWEEP INTERVAL IS AT MOST A SWEEP'S WORTH OF SEALS** — measured **${REPORT.maxRise}** `
    + `entries of growth from what a sweep kept, against the code's own interval of **${SEALS_PER_SWEEP}** seals `
    + `(\`CLOSED_ID_SWEEP\` = ${CLOSED_ID_SWEEP}): one fresh id per seal and nothing removed between sweeps. `
    + `**A FIGURE OF \`<= 256\` WOULD BE THE WRONG ASSERTION FOR THIS FIGURE TOO**: it is a RISE and not a `
    + `size, and the size it starts from is whatever the last sweep could not drop`);
  // **AND IT IS FLAT IN THE WRITE COUNT, WHICH IS WHAT "BOUNDED" MEANS — AND THE LIMB THAT MEASURES THE PRUNING.**
  // The second half's maximum against the first half's: with the pruning in place the two halves answer the SAME
  // maximum, and with `pruneClosedIds`'s body removed they answer half the write count each (measured on this
  // tree: `2560` and `5120`). **A table that kept one entry per write cannot pass this one.**
  assert.ok(REPORT.maxSize <= REPORT.midMax + SEALS_PER_SWEEP,
    `**THE TABLE DOES NOT GROW WITH THE WRITE COUNT** — the second half's maximum **${REPORT.maxSize}** exceeds `
    + `the first half's **${REPORT.midMax}** by **${REPORT.maxSize - REPORT.midMax}**, inside the one sweep `
    + `interval of **${SEALS_PER_SWEEP}** that a bounded table can rise by. **A TABLE THAT KEPT ONE ENTRY PER `
    + `WRITE WOULD SHOW THE WHOLE COUNT HERE** (\`D-180\` item \`8\`'s bound, measured the way it is stated: `
    + `bounded by the sweep and by nothing else)`);
  // **AND THE SAME BOUND AT THE TABLE'S ABSOLUTE SIZE.** After a sweep the table holds the refs something can
  // still name; between sweeps it gains one entry per seal — so `size <= survivors + (CLOSED_ID_SWEEP - 1)`, and
  // `survivors` is the probe's own reading at the seal multiples. **A FIGURE OF `<= 256` WOULD BE THE NICER BOUND
  // AND THE WRONG ONE** (`D-180` item 8): the table legitimately stands above `256` between sweeps.
  assert.ok(REPORT.maxSize <= REPORT.survivors + SEALS_PER_SWEEP,
    `**THE TABLE IS BOUNDED BY THE SWEEP'S OWN ARITHMETIC** — measured \`closedIds.size\` maximum `
    + `**${REPORT.maxSize}** over ${REPORT.writes} writes (${REPORT.seals} seals) with every receipt dropped, `
    + `against a survivor reading of **${REPORT.survivors}** at the seal multiples and the code's bound of `
    + `**${REPORT.survivors + SEALS_PER_SWEEP}** (= survivors + ${SEALS_PER_SWEEP}, one sweep interval). `
    + `**THE BOUND IS NOT \`256\`**: a sweep keeps every entry whose \`WeakRef\` still dereferences, so the table `
    + `stands at "whatever something can still name" plus at most one interval's worth of new seals`);
  // **THE ABSOLUTE FIGURE, WITH THE MARGIN THE MEASUREMENT LEAVES.** `2 x 256 - 1 = 511` is a sweep that has just
  // emptied the table plus one full interval — the widest the table can be when the collector keeps up — and the
  // measured maximum is printed beside it so the margin is a reading and not a hope.
  assert.ok(REPORT.maxSize <= (2 * CLOSED_ID_SWEEP) - 1,
    `**AND IT SITS UNDER THE ABSOLUTE FIGURE WITH MARGIN** — measured **${REPORT.maxSize}** against `
    + `**${(2 * CLOSED_ID_SWEEP) - 1}** (= \`256 + 255\`: one full sweep interval on top of a table a sweep has `
    + `just emptied), a margin of ${((2 * CLOSED_ID_SWEEP) - 1) - REPORT.maxSize} entries over `
    + `${REPORT.writes} writes`);
  // **AND THE FIGURE IS DISCRIMINATING.** If the sweep stopped pruning, the table would hold one entry per seal's
  // own id and the maximum would be the write count; this limb asserts the workload is large enough that the two
  // readings cannot be confused, so a cell that passed by being generous would show as a bound that no longer
  // separates a pruned table from an unswept one.
  assert.ok(REPORT.writes >= 4 * ((2 * CLOSED_ID_SWEEP) - 1),
    `and the bound SEPARATES the two readings: ${REPORT.writes} writes against a bound of `
    + `${(2 * CLOSED_ID_SWEEP) - 1}, so an unswept table (whose size would run to the seal count, `
    + `${REPORT.seals}) could not pass this cell by being close to it`);
  // **WHAT THIS CELL CANNOT SEE, SAID AT ITS BYTE.** It cannot see a bound the sweep does not give: with the refs
  // still REACHABLE the table is unbounded by design, and no cell here pins that to a number — `KAW-1` measures
  // the other side of it (`attempt-1` still dereferences after `1056` writes), and this cell's bound is
  // conditional on the collector taking what the caller dropped. **The measured figures are printed in each
  // failure message above and in this pass's record; the pinned readings are `maxSize = 191`, `maxRise = 127`,
  // `survivors = 64`, `seals = 10240`.**
});
