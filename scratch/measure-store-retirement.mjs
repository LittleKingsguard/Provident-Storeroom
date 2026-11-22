// scratch/measure-store-retirement.mjs — the per-store retention measurement, taken BEFORE and AFTER the
// `storeRelease` landing. **A MEASUREMENT INSTRUMENT AND NOT A CELL**: the cell is
// `tests/e2e/store-retirement.test.mjs`, which carries the declared ceiling from these figures.
//
//   node --expose-gc scratch/measure-store-retirement.mjs 500 4
//
// **WHY SEVERAL BATCHES AND NOT ONE `rss` BEFORE/AFTER.** A single batch's `rss` growth is a HIGH-WATER MARK:
// the allocator does not hand a freed page back to the kernel, so the first batch's figure cannot tell a LEAK
// from a resident allocator, and the fix reads as a non-change (measured: one batch read `15–65` KB/store both
// before and after). **THE MARGINAL BATCH IS THE INSTRUMENT'S SUBJECT.** If a batch's stores are genuinely
// freed, the next batch's allocations REUSE that memory and the marginal cost approaches the steady state the
// package's own per-instance object graph costs; if they are retained, every batch adds a full per-store cost
// on top of the last and the marginal figure stays flat at the leak's own rate.
//
// **THE INSTRUMENT'S SECOND OBSERVABLE IS NOT MEMORY** — `alreadyReleasedByFinalizer` asks the ADDON about each
// of the FIRST batch's indexes: an emptied row answers `AddressNotFound`, a live row is released and answers
// `undefined`. That is the release read at its own answer, and it is what makes this instrument
// discriminating rather than suggestive.
import { storeCreate } from '../bindings/js/index.mjs';
import { createRequire } from 'node:module';

const N = Number(process.argv[2] ?? 1000);
const BATCHES = Number(process.argv[3] ?? 6);
const WARMUP = Number(process.argv[4] ?? 0);
if (typeof global.gc !== 'function') {
  console.error('run with --expose-gc');
  process.exit(2);
}
const addon = createRequire(import.meta.url)('../bindings/js/build/Release/storeroom_js_binding.node');
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

async function settle() {
  global.gc();
  global.gc();
  await new Promise((resolve) => setTimeout(resolve, 25));
  global.gc();
}

await settle();
// **THE WARM-UP BATCHES ARE DISCARDED AND THEY ARE THE INSTRUMENT'S NECESSARY PREAMBLE**: the runtime's own
// heap has to reach the size this allocation rate makes it hold before the marginal batch can be read as a
// retention figure at all (measured: the un-warmed marginals read `8–15` KB/store BOTH before and after the
// fix, which is the allocator's growth and not a leak).
let firstBatchIds = [];
for (let b = 0; b < WARMUP; b += 1) {
  const ids = [];
  for (let i = 0; i < N; i += 1) {
    const dropped = storeCreate({ journalLength: 8, listeners: [] });
    ids.push(dropped[STORE_INDEX]);
  }
  if (b === 0) firstBatchIds = ids;
  await settle();
}
let previous = process.memoryUsage().rss;
const perBatch = [];
for (let b = 0; b < BATCHES; b += 1) {
  const ids = [];
  for (let i = 0; i < N; i += 1) {
    const dropped = storeCreate({ journalLength: 8, listeners: [] });
    ids.push(dropped[STORE_INDEX]);
  }
  if (WARMUP === 0 && b === 0) firstBatchIds = ids;
  await settle();
  const now = process.memoryUsage().rss;
  perBatch.push({
    batch: b + 1,
    deltaBytes: now - previous,
    perStoreBytes: Math.round((now - previous) / N),
  });
  previous = now;
}

let alreadyReleased = 0;
let stillHeld = 0;
let releaseEntryAbsent = false;
for (const id of firstBatchIds) {
  try {
    addon.storeRelease(id);
    stillHeld += 1;
  } catch (thrown) {
    // **THE THROW IS READ BY ITS OWN STATUS AND NOT BY ITS CLASS**: a row the finalizer already emptied
    // answers `{status: 'AddressNotFound'}`, while an ABSENT ENTRY (the pre-fix artefact) throws a host
    // `TypeError` — and counting that as a release was this instrument's own first false green.
    if (thrown !== null && typeof thrown === 'object' && thrown.status === 'AddressNotFound') alreadyReleased += 1;
    else releaseEntryAbsent = true;
  }
}

const marginal = perBatch.map((row) => row.perStoreBytes);
const worstMarginal = marginal.length === 0 ? null : Math.max(...marginal);
const meanMarginal = marginal.length === 0 ? null : Math.round(marginal.reduce((a, b) => a + b, 0) / marginal.length);
console.log(JSON.stringify({
  N,
  batches: BATCHES,
  perBatch,
  worstMarginalPerStoreBytes: worstMarginal,
  meanMarginalPerStoreBytes: meanMarginal,
  alreadyReleasedByFinalizer: alreadyReleased,
  stillHeldAfterCollect: stillHeld,
  releaseEntryAbsent,
}));
