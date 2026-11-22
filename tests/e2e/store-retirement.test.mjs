// `store-retirement.test.mjs` — **THE RETIREMENT THE ADDON'S OWN DOCBLOCK ALREADY CLAIMED, MEASURED**.
//
// **THE FINDING THIS CELL IS WRITTEN AGAINST, AT ITS BYTES.** `bindings/js/src/facade.rs`'s docblock above
// `INSTANCE_IDS` has declared since the receiver table was written that a store *"is freed by the package's own
// GC finalizer … which reaches this addon through the standing `storeRelease` entry below; that entry DROPS the
// instance AND removes ITS OWN index from this table, IN ONE ACT"* — **and no such entry existed.** `grep -rn
// storeRelease bindings/js/src/` found one doc comment and no definition, the artefact exported nineteen names
// and none of them was it, and the package's finalizer (`instance.mjs`'s `STORE_RETIREMENT.register`) deleted a
// row of its own `WeakMap` and never reached this layer. **So every constructed store stayed in the addon's
// `Vec` for the process's life.**
//
// **WHAT THAT COSTS, MEASURED ON THIS TREE RATHER THAN ARGUED — AND THE INSTRUMENT'S OWN CORRECTION.**
//
//   * **A ZERO-PAYLOAD STORE: `~15–22 KB/store`, linear, with the store dropped every time** — the supervisor's
//     own reading (`+17.8 / +17.3 / +36.4 MB` at `N = 200 / 800 / 2000`, i.e. `~18–21 KB`), reproduced here.
//   * **★ AND THAT FIGURE CANNOT SEE THE FIX, WHICH THIS CELL HAD TO LEARN BY TAKING IT BOTH WAYS.** A
//     zero-payload run reads `65.5 / 22.2 / 15.2 KB` per store BEFORE the landing and `53.0 / 22.9 / 15.1 KB`
//     AFTER it: **identical to the noise.** `rss` is a HIGH-WATER MARK, and the runtime reserves heap for the
//     allocation rate whether or not anything is retained — measured by segment: after `gc()`, `heapUsed` moves
//     `~0 B/store` in BOTH trees while `heapTotal` (and therefore `rss`) grows in 17–32 MB chunks that are never
//     handed back. **SO A ZERO-PAYLOAD `rss` CEILING WOULD PASS A RETURNING LEAK AND THIS CELL DOES NOT USE ONE.**
//   * **THE HONEST MEMORY OBSERVABLE IS THE STORE'S OWN PAYLOAD.** Each store is told to keep a 128 KiB value and
//     then dropped: a retained store costs its payload, a freed one costs nothing but the allocator's chunk. Both
//     directions measured three times each: **BEFORE the landing, `573112 / 573112 / 574587` bytes per store**
//     (flat, batch after batch); **AFTER it, `42025 / 43930 / 42977`** on the first measured batch of the same
//     three-run shape — and `-3127` to `91013` on later batches, i.e. the allocator's own chunk. **The declared
//     ceiling is `131072` bytes — EXACTLY THE PAYLOAD THE STORE WAS TOLD TO KEEP**: a store that is still held
//     cannot cost less than what it holds, and the fixed figure sits 3x under the line while the pre-fix figure
//     sits 4.4x over it.
//   * **AND THE EXACT, BYTE-FREE OBSERVABLE IS THE ENTRY'S OWN ANSWER** (`SR-02`): a row the finalizer reached
//     answers `storeRelease(id)` with `{status: 'AddressNotFound'}` because the addon has already emptied it.
//     Measured before the landing: `0 of 400` (the entry did not exist; every call threw a host `TypeError`).
//     After it: `400 of 400`. **THAT IS NOT A TABLE LENGTH** — the addon's table is not observable from JS and no
//     cell here asserts one (`receiver-and-refusal.md §6`'s `OWED-2`: *"NOTHING ASSERTS A TABLE TYPE"*); it is the
//     retirement read at the one answer the entry declares.
//
// **WHERE `gc()` IS ABSENT, AND WHY THIS CELL DOES NOT NEED IT TO BE PRESENT.** `npm test` runs
// `node --test "tests/**/*.test.mjs"` with no `--expose-gc`, so nothing collected here can be FORCED in the test
// process. **The two instruments therefore live in a CHILD PROCESS THIS FILE RE-EXECUTES ITSELF WITH
// `--expose-gc`** (`MEASURE` below), which is where `gc()` is available by construction; **the process that
// asserts is the same file, so there is one instrument and no second copy of it.** `SR-02`'s read survives even
// without a collection — a store the caller still holds answers a live release — and `SR-03` needs no `gc()` at
// all: it drives the entry directly, which is the half that measures the ENTRY rather than the memory.
//
// **WHAT IS NOT THIS PASS'S, STATED SO ITS ABSENCE IS NOT READ AS AN OMISSION.** The second realm's arm has no
// `storeRelease` and retires nothing (`bindings/js/src/wasm.rs`; `D-155` item 4: its set is eighteen and
// `commitFile` is the one that is absent BY RULING) — adding a release there would change that export set, which
// is a declaration and a cell's subject and not this pass's. **`index.d.ts` moves no byte**: the addon's entries
// are not the package's declared surface (`surface.md §3.8`), and `storeRelease` is reached by the finalizer and
// by no consumer.
//
// **⟶ AND THE FIRST OF THOSE SENTENCES IS RE-CUT AT ITS OWN BYTES, 2026-11-19 — THE SECOND ARM'S PASS LANDED.**
// *"The second realm's arm has no `storeRelease` and retires nothing (`bindings/js/src/wasm.rs`; `D-155` item 4:
// its set is eighteen and `commitFile` is the one that is absent BY RULING) — adding a release there would change
// that export set, which is a declaration and a cell's subject and not this pass's."* **THAT ARM HAS ONE NOW**:
// `wasm.rs`'s `storeRelease`, its set is **nineteen** (`D-155` item 4's figure re-cut at its own sentence), and its
// own two cells are `tests/e2e/wasm-arm.test.mjs`'s `CW-8` (the entry's arms, `SR-03`'s limbs one arm over) and
// `CW-9` (the package's finalizer fired at that arm under `--expose-gc`). **EVERY CELL OF THIS FILE MOVES NO BYTE**:
// the Node frame's entry, its two tables and these three cells are exactly what they were, and the addon's twenty
// are still the twenty.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import { storeCreate } from '../../bindings/js/index.mjs';

const HERE = fileURLToPath(import.meta.url);
const ADDON_ARTEFACT = fileURLToPath(new URL('../../bindings/js/build/Release/storeroom_js_binding.node', import.meta.url));
const require_ = createRequire(import.meta.url);
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

// ── THE INSTRUMENT'S PARAMETERS, EACH WITH THE REASON IT HAS THE VALUE IT HAS ────────────────────────────
/** **`N` — THE STORES PER BATCH.** It is the divisor the marginal figure is taken over, and it is large enough
 *  that one of the runtime's own 17–32 MB heap chunks costs ~40 KB per store rather than ~500 KB. */
const N = 400;
/** **THE WARM-UP BATCH, DISCARDED.** The first batch of this shape pays the runtime's heap reservation for the
 *  whole allocation rate (measured: `~880–900 KB/store` in the FIRST batch, BOTH before and after the landing) —
 *  a cost that is not the leak's and would swamp it. **The second batch is the one that answers the question**,
 *  and it is measured twice so a single chunk landing on one of them cannot decide the cell. */
const WARMUP_BATCHES = 1;
const MEASURED_BATCHES = 2;
/** **THE PAYLOAD — 128 KiB of the store's own `mem` tier, written through the package's own `write`.** A store
 *  that is never freed keeps this; a store that is freed keeps nothing. **THE SAME STRING INSTANCE IS WRITTEN
 *  INTO EVERY STORE**, so the figure cannot be the caller's own allocation. */
const PAYLOAD_CHARS = 131072;
const PAYLOAD = 'x'.repeat(PAYLOAD_CHARS);
/** **THE CEILING, AND IT IS THE PAYLOAD ITSELF** — the one bound that is a statement about the property rather
 *  than about a machine: *a constructed-and-dropped store may not cost more than the data it was told to keep.*
 *  **MEASURED: `42025`–`43930` bytes/store after the landing, `573112`–`574587` before it** — so the fixed figure
 *  sits `~3x` under this line and the defected figure `~4.4x` over it. **A RETURN OF THE PRE-FIX BEHAVIOUR IS
 *  CAUGHT BY A FACTOR OF FOUR**, which is why the figure is printed beside the ceiling in the failure message. */
const CEILING_BYTES_PER_STORE = PAYLOAD_CHARS;
/** **THE PRE-FIX FIGURES THIS CELL PRINTS SO THE CEILING IS READABLE AS A CHANGE** — both of them measured on
 *  this tree: the zero-payload reading the finding was filed with (`~18–21 KB`, the supervisor's) and the
 *  payload-bearing reading this instrument takes (`~573 KB`). */
const PRE_FIX_ZERO_PAYLOAD_KB = '~18–21 KB/store (the supervisor\'s reading, reproduced: 15.2–22.2 KB at N = 800 / 2000)';
const PRE_FIX_PAYLOAD_BYTES_PER_STORE = 573112;

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE PROBE — THE CHILD THIS FILE RE-EXECUTES ITSELF AS, WITH `--expose-gc`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **IT PRINTS ONE JSON LINE AND EXITS**, and it registers no test: the guard below runs before every `test(…)`
// call in this file, so the child never loads a cell.
const PROBE_FLAG = '--store-retirement-probe';

/// **`gc()` THREE TIMES AND A TURN**, which is what it takes for a `FinalizationRegistry` callback to have run:
/// the collect is the host's, the callback is queued on it, and the settle hands the queue its turn.
async function settle() {
  globalThis.gc();
  globalThis.gc();
  await new Promise((resolve) => setTimeout(resolve, 25));
  globalThis.gc();
}

/// **ONE BATCH: `N` STORES CONSTRUCTED, EACH GIVEN THE PAYLOAD, EVERY ONE DROPPED.** The only reference that
/// outlives an iteration is the store's own index — an integer — so nothing here can retain the store *object*.
async function constructAndDrop() {
  const ids = [];
  for (let i = 0; i < N; i += 1) {
    const dropped = storeCreate({ journalLength: 8, listeners: [] });
    dropped.write(['payload'], 'mem', PAYLOAD);
    ids.push(dropped[STORE_INDEX]);
  }
  await settle();
  return ids;
}

if (process.argv.includes(PROBE_FLAG)) {
  const addon = require_(ADDON_ARTEFACT);
  await settle();
  for (let w = 0; w < WARMUP_BATCHES; w += 1) await constructAndDrop();
  let previous = process.memoryUsage().rss;
  const perBatchBytesPerStore = [];
  let measuredIds = [];
  for (let b = 0; b < MEASURED_BATCHES; b += 1) {
    const ids = await constructAndDrop();
    if (b === 0) measuredIds = ids;
    const now = process.memoryUsage().rss;
    perBatchBytesPerStore.push(Math.round((now - previous) / N));
    previous = now;
  }
  // **THE SECOND OBSERVABLE — THE ENTRY'S OWN ANSWER.** A row the finalizer reached is ALREADY EMPTIED, so
  // `storeRelease` answers `AddressNotFound`; a row that is still live is released here and answers `undefined`;
  // and an entry that does not exist throws a host `TypeError`, which is a third state and is named as one.
  let releasedByFinalizer = 0;
  let stillHeld = 0;
  let releaseEntryAbsent = false;
  for (const id of measuredIds) {
    try {
      addon.storeRelease(id);
      stillHeld += 1;
    } catch (thrown) {
      if (thrown !== null && typeof thrown === 'object' && thrown.status === 'AddressNotFound') releasedByFinalizer += 1;
      else releaseEntryAbsent = true;
    }
  }
  process.stdout.write(`${JSON.stringify({
    gc: typeof globalThis.gc === 'function',
    n: N,
    payloadChars: PAYLOAD_CHARS,
    perBatchBytesPerStore,
    marginalBytesPerStore: Math.min(...perBatchBytesPerStore),
    worstBatchBytesPerStore: Math.max(...perBatchBytesPerStore),
    releasedByFinalizer,
    stillHeld,
    releaseEntryAbsent,
  })}\n`);
  process.exit(0);
}

/// **THE PROBE, RUN** — one child, `--expose-gc`, this same file. **`--expose-gc` IS THE ONLY WAY `gc()` IS
/// AVAILABLE AT ALL HERE** (`npm test` passes no such flag), and a child is also what keeps the measurement's
/// heap out of the test process's own.
function probe() {
  const stdout = execFileSync(process.execPath, ['--expose-gc', HERE, PROBE_FLAG], {
    encoding: 'utf8',
    timeout: 180000,
    maxBuffer: 4 * 1024 * 1024,
  });
  return JSON.parse(stdout.trim().split('\n').pop());
}

const REPORT = probe();

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `SR-01` · THE MEMORY HALF — THE STORE'S PAYLOAD IS NOT RETAINED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('SR-01 · the retained `rss` per constructed-and-dropped store is bounded — the store\'s own 128 KiB payload costs nothing once the store is dropped', () => {
  assert.equal(REPORT.gc, true,
    'the probe ran with `--expose-gc`, so the retention it measures is a retention and not a lag in the collector');
  assert.equal(REPORT.n, N, 'and it measured the batch this cell declares');
  assert.equal(REPORT.payloadChars, PAYLOAD_CHARS, 'and every store in it was told to keep this cell\'s payload');
  // **THE ASSERTION, AT ITS CEILING.** `marginalBytesPerStore` is the LOWEST of the measured batches — the limb
  // that asks "can this workload allocate a whole batch and keep nothing?" — and the worst batch is printed
  // beside it so a reader can see the allocator's own spread rather than a single number.
  assert.ok(REPORT.marginalBytesPerStore <= CEILING_BYTES_PER_STORE,
    `**THE RETAINED RSS PER CONSTRUCTED-AND-DROPPED STORE IS AT MOST THE PAYLOAD THE STORE WAS TOLD TO KEEP** — `
    + `measured ${REPORT.marginalBytesPerStore} bytes/store (worst batch ${REPORT.worstBatchBytesPerStore}, batches `
    + `${JSON.stringify(REPORT.perBatchBytesPerStore)}) against the ceiling of ${CEILING_BYTES_PER_STORE} bytes `
    + `(= the ${PAYLOAD_CHARS}-char payload). **THE PRE-FIX FIGURES, SO THIS LINE IS READ AS A CHANGE AND NOT AS A `
    + `NUMBER: ${PRE_FIX_PAYLOAD_BYTES_PER_STORE} bytes/store with this payload, and ${PRE_FIX_ZERO_PAYLOAD_KB} with `
    + 'none** — a store that is never freed cannot cost less than the data it holds, and the pre-fix run sat 4.4x '
    + 'over this ceiling while the fixed run sits 3x under it. A return of that behaviour is caught here.');
  // **AND THE CEILING IS NOT VACUOUS**: it is below the defected figure by a factor this line states, so a cell
  // that passed by being generous would be visible as a ceiling that no longer separates the two.
  assert.ok(CEILING_BYTES_PER_STORE * 2 <= PRE_FIX_PAYLOAD_BYTES_PER_STORE,
    'and the ceiling is DISCRIMINATING: the pre-fix figure is more than twice the line this cell holds the '
    + `landing to (${PRE_FIX_PAYLOAD_BYTES_PER_STORE} vs ${CEILING_BYTES_PER_STORE}), so the limb separates a `
    + 'retired store from a retained one rather than passing both');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `SR-02` · THE EXACT HALF — THE FINALIZER REACHES THE ADDON, READ AT THE ENTRY'S OWN ANSWER
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THIS IS NOT A TABLE LENGTH AND MUST NOT BE READ AS ONE.** The addon's table is not observable from JS
// (`receiver-and-refusal.md §6`'s `OWED-2`: *"NOTHING ASSERTS A TABLE TYPE"*), and the number below is the
// ADDON'S ANSWER about each of `N` indexes the package itself published — `AddressNotFound` for an index whose
// store the finalizer has already dropped, `undefined` for one it has not.
test('SR-02 · the package\'s finalizer reaches the addon — every constructed-and-dropped store\'s own row answers the absent arm, which is the release read at its own answer', () => {
  assert.equal(REPORT.releaseEntryAbsent, false,
    '`storeRelease` exists on the artefact and answers in the crate\'s own forms — before the landing every call '
    + 'here threw a host `TypeError` because there was no entry at all (`facade.rs`\'s docblock cited one that '
    + 'did not exist), which is the state this limb was written red against');
  assert.equal(REPORT.stillHeld, 0,
    '**NO MEASURED STORE WAS STILL IN THE ADDON\'S TABLE AFTER `gc()`** — every one of the '
    + `${N} answered \`{status: 'AddressNotFound'}\`, whose declared reading is *"the package holds no instance at `
    + 'that id"*: the row was emptied by the finalizer before this cell asked. **MEASURED BEFORE THE LANDING: 0 of '
    + `400** (the entry was absent); after it: ${REPORT.releasedByFinalizer} of ${REPORT.n}`);
  assert.equal(REPORT.releasedByFinalizer, N,
    'and the count is the whole batch — a partial count would mean the finalizer reaches the addon for some '
    + `stores and not others: ${REPORT.releasedByFinalizer} of ${N}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `SR-03` · THE ENTRY'S OWN CONTRACT — TWO ABSENT ARMS, ONE CLASS ARM, AND NO PANIC IN ANY OF THEM
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **NO `gc()` IS NEEDED FOR ANY LIMB BELOW**, which is why the entry's contract is driven here in the test
// process itself: the release is CALLED, and what is asserted is what the addon answers.
function addon() {
  return require_(ADDON_ARTEFACT);
}

/// A thrown refusal, read as the artefact layer's two members (`failure-form.md §1`: `log` is the JS boundary's
/// and is built there, never in Rust).
function thrownBy(call) {
  try {
    return { answered: call() };
  } catch (thrown) {
    return { thrown };
  }
}

test('SR-03 · releasing a store twice, releasing an index that names nothing, and releasing a position that is not an index each answer the crate\'s own arm and none of them panics', () => {
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  instance.write(['a'], 'mem', 7);
  const id = instance[STORE_INDEX];
  assert.equal(typeof id, 'number',
    'the index the addon minted is published on the store object as the package\'s own `Symbol.for` row '
    + '(`receiver-and-refusal.md §1`) — a NUMBER, which is what the held value may carry and all it may carry');
  // A SECOND STORE, HELD ACROSS THE FIRST'S RELEASE: `§6`'s requirement is that a retirement removes EXACTLY ONE
  // ENTRY and never the table, and this is the store that must still answer.
  const neighbour = storeCreate({ journalLength: 8, listeners: [] });

  // ── (a) THE RELEASE ITSELF: `undefined`, no throw, and the store is dropped.
  const released = thrownBy(() => addon().storeRelease(id));
  assert.equal('answered' in released, true,
    `the release of a live store answers rather than throwing: ${JSON.stringify(released.thrown ?? null)}`);
  assert.equal(released.answered, undefined, 'and its answer is `undefined` — the crate\'s own success shape for a verb that carries nothing back (`register`\'s arm)');

  // ── (b) THE RELEASED STORE'S OWN CALL REFUSES IN THE ONE FORM — the observable `§3` names.
  const after = thrownBy(() => instance.read(['a'], 'mem'));
  assert.equal('thrown' in after, true,
    'a call on a RELEASED store refuses rather than answering: the receiver names an index the table no longer '
    + 'holds (`store_index_of`), and that is the same one observable a detached call gets (`receiver-and-refusal.md §3`)');
  assert.equal(after.thrown.status, 'AddressNotFound',
    `and the refusal's status is the crate's own absent arm, not a minted one (\`DD-40\`): ${JSON.stringify(after.thrown)}`);
  assert.equal(after.thrown instanceof Error, false,
    'and it is the ONE FORM and never an `Error` (`failure-form.md §1`)');

  // ── (c) THE SECOND STORE STILL ANSWERS ITS OWN — the property `P-SAS-5` names.
  neighbour.write(['b'], 'mem', 11);
  assert.equal(neighbour.read(['b'], 'mem'), 11,
    '**THE RETIREMENT REMOVED EXACTLY ONE ENTRY AND NEVER THE TABLE** (`§6`): the second store\'s own register '
    + 'answers after the first store\'s release, so a retirement cannot remove a neighbour\'s row');

  // ── (d) THE SAME INDEX AGAIN — an EMPTIED row, not a live one.
  const twice = thrownBy(() => addon().storeRelease(id));
  assert.equal('thrown' in twice, true,
    'releasing an already-released store refuses rather than releasing again (the release is not idempotent at '
    + 'its answer: a second call must not free a second store)');
  assert.equal(twice.thrown.status, 'AddressNotFound',
    `and it answers the crate's absent arm — \`no_instance_at\`'s own ` + '`AddressNotFound`' + `: ${JSON.stringify(twice.thrown)}`);

  // ── (e) AN INDEX NO MINT EVER REACHED — the same arm, because a fabricated index and an emptied row are one
  // observable (`receiver-and-refusal.md §3`: *"There is no second arm and no second observable"*).
  const nothing = thrownBy(() => addon().storeRelease(999999));
  assert.equal('thrown' in nothing, true, 'an index that names nothing refuses');
  assert.equal(nothing.thrown.status, 'AddressNotFound',
    `and it is the SAME token the emptied row answers, which is what makes the two one observable: ${JSON.stringify(nothing.thrown)}`);

  // ── (f) A POSITION THAT IS NOT AN INDEX — the crate's malformed arm, and never a store touched.
  for (const outside of ['not-an-index', null, undefined, {}, Number.NaN, Number.POSITIVE_INFINITY, -1, 1.5]) {
    const answered = thrownBy(() => addon().storeRelease(outside));
    assert.equal('thrown' in answered, true,
      `a position that is not an index refuses: ${JSON.stringify(outside)} answered instead`);
    assert.equal(answered.thrown.status, 'AddressMalformed',
      `and its status is the crate's own malformed-argument member — the same token \`not_a_receiver\` answers at `
      + `the receiver position — and not a minted one: ${JSON.stringify(outside)} answered ${JSON.stringify(answered.thrown)}`);
  }
  // **★ AND THE NaN GUARD IS ASSERTED AT ITS OWN CONSEQUENCE.** `NaN as usize` saturates to `0` in Rust, so a
  // class test that let `NaN` through would name the FIRST store ever constructed — a release that frees a store
  // the caller never named. **THE FIRST STORE IS EXACTLY THE ONE THIS CELL RELEASED, SO THE GUARD IS DRIVEN ON A
  // LIVE STORE THAT MUST STILL ANSWER**: `neighbour` is index 1 here only if nothing was minted before it in this
  // process, which this cell does not assume — so the LIVE store it holds is the one it re-reads.
  assert.equal(neighbour.read(['b'], 'mem'), 11,
    'and none of those outside positions freed the live store this cell held across them: `NaN` in particular '
    + 'would have saturated to index `0` and released whatever store was minted first');
});
