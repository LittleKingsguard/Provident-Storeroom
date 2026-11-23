// =====================================================================================================
// **`wasm-arm.test.mjs` — THE SECOND REALM, CLAIMED BY CELLS AND NOT ONLY BY A DRIVE** (`D-154`, `D-155`,
// `D-156`, `D-164`, and — for the two cells that are no longer held out — `D-166` and `D-167`;
// `docs/L1/wasm-realm.md` §7's `C-W1`, `C-W2`, `C-W4`, `C-W5` and `C-W6`)
// =====================================================================================================
//
// **WHY THIS FILE EXISTS, IN ONE SENTENCE: THE ARM WAS DRIVEN BY HAND IN EVERY REVIEW THAT CLAIMED IT, AND
// NOTHING IN THE SUITE SAID SO.** `docs/L1/publish-readiness.md` §10.2 item 6 named that as the last real gap
// between "the arm works" and "the suite says so"; these are the cells that close it.
//
// **THE ARM IS BUILT, NOT ASSUMED, AND IT IS NOT SKIPPED.** A cell that skipped when the artefact was absent
// would be the vacuous pass this corpus refuses (`P-PUB-7`'s doctrine and `PUB-R-5`'s), so the module builds
// the package on demand — `scripts/build-wasm-package.mjs` — and FAILS with that command in its message when
// the toolchain cannot. **THE NODE ARM'S OWN `.node` IS ASSUMED PRESENT BY EVERY OTHER CELL IN THIS SUITE**
// (`npm run build` stages it); this file assumes no more for its arm than the suite already assumes for the other.
//
// **WHAT IS NOT HERE, AND WHY**: the two refusals' two-way arm is `journal-compaction.test.mjs`'s `JC-TWO-WAY`
// on the Node realm, and the realm's sentences are the spec's (`D-154`'s eleven rows). **These cells are the
// ARM's own: what it constructs, what its `cfg` refuses, what its module exports, that its graph is
// synchronous, and that its crossing is a deep clone with no trap run.**

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, writeSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PKG = join(ROOT, 'bindings', 'js', 'platforms', 'wasm');
const GLUE = join(PKG, 'storeroom_js_binding.js');
const MODULE = join(PKG, 'storeroom_js_binding_bg.wasm');
const ENTRY = join(PKG, 'index.mjs');

/** Build the arm when its artefacts are absent, and refuse in words when the build cannot run. */
function ensureBuilt() {
  if (existsSync(GLUE) && existsSync(MODULE) && existsSync(ENTRY)) return;
  const script = join(ROOT, 'scripts', 'build-wasm-package.mjs');
  assert.ok(existsSync(script), 'the build script this file needs is present: ' + script);
  try {
    execFileSync(process.execPath, [script], { cwd: ROOT, stdio: 'pipe' });
  } catch (caught) {
    assert.fail('D-154: the WebAssembly arm could not be built, so no cell here can measure it. Build it with '
      + 'node scripts/build-wasm-package.mjs (it needs the wasm32-unknown-unknown target and the wasm-bindgen CLI '
      + 'in .cargo-home/bin). The build said: ' + String((caught.stderr ?? caught.message ?? '')).slice(0, 600));
  }
  assert.ok(existsSync(GLUE) && existsSync(MODULE) && existsSync(ENTRY),
    'the build staged the glue, the module and the entry beside them');
}

ensureBuilt();

/** The arm, loaded once: its glue instantiated synchronously, and its entry's factory. */
let loaded = null;
async function arm() {
  if (loaded !== null) return loaded;
  const glue = await import(pathToFileURL(GLUE).href);
  glue.initSync({ module: new WebAssembly.Module(readFileSync(MODULE)) });
  const entry = await import(pathToFileURL(ENTRY).href);
  loaded = { glue, storeCreate: entry.storeCreate };
  return loaded;
}

/** Run `fn`; answer the thrown value as a value, so a cell never prints `undefined` for a refusal. */
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
  return typeof outcome.caught.status === 'string' ? outcome.caught.status : 'no status on the thrown value';
}

/** Every `.mjs` a module reaches, by SPECIFIER, from itself downward — the graph a loader must resolve. */
function transitiveSet(start) {
  const seen = new Map();
  const walk = (file) => {
    if (seen.has(file)) return;
    const source = readFileSync(file, 'utf8');
    seen.set(file, source);
    for (const match of source.matchAll(/from\s+'([^']+)'|import\s+'([^']+)'/g)) {
      const specifier = match[1] ?? match[2];
      if (specifier.startsWith('.')) walk(resolve(dirname(file), specifier));
    }
  };
  walk(start);
  return seen;
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE RETIREMENT PROBE'S MACHINERY, ABOVE EVERY CELL — AND ITS POSITION IS PART OF ITS CORRECTNESS.**
// The child branch stands here, before any `test(…)` call, so **the child never registers a cell**: it writes its one
// JSON line and exits, and the runner in that process has nothing to run and nothing to print over it. (Measured the
// other way round: with the branch below the cells, the child ran the whole file AND its exit truncated the piped
// write; see the drained-exit note at the branch.)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');

const PROBE_FLAG = '--wasm-arm-retirement-probe';
/** **THE STORES PER BATCH, AND THE WARM-UP BESIDE IT.** The warm-up batch is dropped and collected before the
 *  measured one so the registry's callback path has run once before the batch that is counted (`SR-01`'s device). */
const PROBE_WARMUP = 8;
const PROBE_STORES = 48;

/// **A COLLECTION AND A TURN** — three collects and a settle, which is what a `FinalizationRegistry` callback needs
/// before it has run: the collect is the host's, the callback is queued on it, and the settle hands it its turn.
async function settleCollection() {
  globalThis.gc();
  globalThis.gc();
  await new Promise((resolve) => setTimeout(resolve, 25));
  globalThis.gc();
}

/// **ONE BATCH: N STORES CONSTRUCTED, EACH WRITTEN TO, EVERY ONE DROPPED** — the only reference that outlives an
/// iteration is the handle (a NUMBER), so nothing here can retain the store OBJECT.
async function constructAndDrop(glue, storeCreate, n) {
  const handles = [];
  for (let i = 0; i < n; i += 1) {
    const dropped = storeCreate(glue, { journalLength: 8, listeners: [] });
    dropped.write(['payload'], 'mem', i);
    handles.push(dropped[STORE_INDEX]);
  }
  return handles;
}

if (process.argv.includes(PROBE_FLAG)) {
  const { glue, storeCreate } = await arm();
  await settleCollection();
  // THE WARM-UP, DISCARDED: one batch dropped and collected, so the measured batch is not the first callback.
  await constructAndDrop(glue, storeCreate, PROBE_WARMUP);
  for (let round = 0; round < 3; round += 1) await settleCollection();
  const handles = await constructAndDrop(glue, storeCreate, PROBE_STORES);
  for (let round = 0; round < 4; round += 1) await settleCollection();
  // **THE ONE READING, TAKEN ONCE AND DESTRUCTIVELY**: a live slot answers `undefined` (and is freed by this very
  // call), an emptied one answers `AddressNotFound` — so the count cannot be taken twice and is not.
  let releasedByFinalizer = 0;
  let stillLive = 0;
  let unexpected = null;
  for (const handle of handles) {
    try {
      glue.storeRelease(handle);
      stillLive += 1;
    } catch (thrown) {
      if (thrown !== null && typeof thrown === 'object' && thrown.status === 'AddressNotFound') releasedByFinalizer += 1;
      else unexpected = { status: thrown === null ? null : thrown.status, message: thrown === null ? null : thrown.message };
    }
  }
  // **THE LINE IS WRITTEN SYNCHRONOUSLY TO FD 1 AND THAT IS LOAD-BEARING** — measured, not assumed: when this
  // child's stdout is a PIPE, which is what `execFileSync` gives it, `process.stdout.write` is ASYNCHRONOUS, so an
  // immediate `process.exit(0)` truncated it — the parent read a lone `{` and `JSON.parse` threw at position 1 — and
  // a write CALLBACK is not enough either (measured: it did not fire before the exit and the child then re-entered
  // this file's own probe). `fs.writeSync` returns only once the bytes are in the pipe, so the one line the parent
  // parses is the whole line and the exit after it loses nothing.
  writeSync(1, `${JSON.stringify({
    gc: typeof globalThis.gc === 'function',
    stores: PROBE_STORES,
    handlesAreNumbers: handles.every((handle) => typeof handle === 'number'),
    releasedByFinalizer,
    stillLive,
    unexpected,
  })}\n`);
  process.exit(0);
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W1` AND `C-W5` LAND HERE, AND THEIR PROVENANCE IS THE GAP THEY CLOSE** (`D-166` found the defect;
// `D-167` is the ruling that made them writable): **the cells build the arm themselves** — the module above does,
// by `scripts/build-wasm-package.mjs`, and fails in words when the toolchain cannot (`P-PUB-7`'s doctrine: no cell
// here skips) — **and they are the two `docs/L1/publish-readiness.md` §10.2 item 6 named as the last real gap
// between "the arm works" and "the suite says so"** (`docs/L1/wasm-realm.md` §7's `C-W1` and `C-W5`).
//
// **THEY WERE HELD OUT FOR ONE REASON AND IT IS DISCHARGED AT ITS OWN SEAT.** The arm's class instrument is
// `structuredClone` (`D-156`), and `structuredClone` throws for BOTH a `Proxy` AND any object carrying a function
// (`{ saveCall: () => {} }` and `new Proxy({}, {})` fail identically, `D-166` item 1, measured) — so every `cfg`
// the arm exists for was refused as *"a Proxy"* before any of it could be constructed, and **a cell asserting that
// refusal would have encoded a defect as the design**. **The fix is the architect's and it splits the question**
// (`D-167`, verbatim: *"The clone requirement is for data that has to enter the Rust store. constraints,
// listeners, and the saveCall do not"*): the carrier gates are decided without the probe, the value crossing keeps
// it. **THE PRICE IS DECLARED WHERE IT IS TAKEN** (`class-instrument.mjs`'s `isProxyOfCarrier`): a `Proxy` at a
// carrier gate is not detected on this arm — and `CW-7` below is the cell that says the DATA half is unmoved.

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W1` · THE ARM CONSTRUCTS THE STORE IT EXISTS FOR — `saveCall` IN, THE IMAGE OUT, THE IMAGE BACK IN**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-1 · C-W1 — a `saveCall` store constructs, its `file`-tier write lands, the caller\'s saver takes the image '
  + 'text naming the address, and a second store seeded with that image reads the value back', async () => {
  const { glue, storeCreate } = await arm();
  /** Every image the caller's saver was handed, in the order the store handed them over (`D-144` item 1: ONE position). */
  const saved = [];
  // **THE CONSTRUCTION IS THE ONE `D-166` MEASURED AS REFUSED** — `journalLength`, an empty listeners list and a
  // `saveCall`, and no `filePath` (it is not in domain on this arm, `C-W2` above) — **and on this arm it is the
  // whole of a durable store** (`D-154` item 4: `saveCall` + `initialImage` replace the path).
  const store = storeCreate(glue, {
    journalLength: 8,
    listeners: [],
    saveCall: (image) => {
      saved.push(image);
      // **THE VERDICT IS THE CALLER'S AND IT IS THE ONLY ONE THAT SAVES** (`D-146` item 2): anything that is not
      // `{ success: true }` is the failed arm, the store rolls the write back and answers rank `15`
      // `FileCommitFailed`. A cell that returned `undefined` here would drive the other arm and assert nothing.
      return { success: true };
    },
  });
  // **A FIFTEEN-MEMBER STORE** — `surface.md §2.4` item 9 (f)'s declared census, unmoved by the second realm and
  // unmoved by this landing (`D-167` adds no member, no `cfg` key and no entry).
  assert.equal(Object.getOwnPropertyNames(store).length, 15,
    'the arm constructs the store the whole realm exists for: `saveCall` with no path, and the instance carries the '
    + 'fifteen declared members — it read ' + JSON.stringify(Object.getOwnPropertyNames(store)));

  // **A `file`-TIER WRITE LANDS.** On this arm there is no `filePath` to write to; the tier is lawful because the
  // construction set `durable_without_path` with no caller spelling (`D-132` item 1's third entry condition).
  const receipt = store.write(['c'], 'file', { a: 1 });
  assert.equal(receipt.op.tier, 'file',
    'the `file`-tier write LANDS on a `saveCall` store — the receipt\'s own op reads tier ' + JSON.stringify(receipt.op.tier));
  assert.deepEqual(store.read(['c']), { a: 1 }, 'and the value is readable at its address afterwards');

  // **THE CALLER'S SAVER RECEIVES THE IMAGE, AS TEXT, NAMING THE ADDRESS** (`D-144` item 1: one position; `D-137`
  // item 2: the export marks nothing).
  assert.equal(saved.length, 1, 'the passing write performed ONE save through the caller\'s function — it performed '
    + saved.length);
  const image = saved[0];
  assert.equal(typeof image, 'string',
    'the saver is handed the store\'s own IMAGE TEXT and never a record, a handle or a view — it was handed '
    + (typeof image));
  assert.ok(image.includes('c'),
    'and the text names the address that moved: the image reads ' + JSON.stringify(image).slice(0, 160));

  // **AND A SECOND STORE SEEDED WITH THAT IMAGE READS THE VALUE BACK** — `initialImage` is the only way into such a
  // store (`D-165` item 1: the save channel is write-only by construction, so the copy the caller kept IS the
  // ground truth, and this is the act that proves the copy is a lawful seed).
  const seeded = storeCreate(glue, { journalLength: 8, listeners: [], initialImage: image });
  assert.deepEqual(seeded.read(['c']), { a: 1 },
    'the image the caller was handed SEEDS a store: the value the first store held is the value the second one reads');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W5` · THE `file` TIER IS A FACT ABOUT THE CONSTRUCTION AND NOT ABOUT THE VERB**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-5 · C-W5 — the same `file`-tier write lands on a `saveCall` store and is refused on a store with neither '
  + '`saveCall` nor a path, so the tier is the construction\'s and not the verb\'s', async () => {
  const { glue, storeCreate } = await arm();

  // **ARM ONE: THE `saveCall` STORE.** The same construction `C-W1` drives, and the register it produces reads
  // `file` — which is `docs/L1/wasm-realm.md` §3's coherence claim read at its own byte.
  const saved = [];
  const durable = storeCreate(glue, {
    journalLength: 8,
    listeners: [],
    saveCall: (image) => { saved.push(image); return { success: true }; },
  });
  const durableWrite = attempt(() => durable.write(['t'], 'file', 1));
  assert.equal(durableWrite.ok, true,
    'a `file`-tier write lands on a `saveCall` store — it threw '
    + (durableWrite.ok ? 'nothing' : String(durableWrite.caught?.status)));
  assert.equal(durableWrite.value.op.tier, 'file', 'and its receipt names the tier the store is in');
  // **AND THE READOUT IS THE STORE'S OWN** (`readTiered`): a leaf at a `file`-tier address answers its tier beside
  // its value, so the claim is read at the datum and not inferred from the verb that wrote it.
  assert.deepEqual(durable.readTiered(['t']), { _tier: 'file', value: 1 },
    'the register itself reads `file` tier at the address — `file_path == \'\'` with the tier bit set by the '
    + 'construction, no caller spelling anywhere (`D-132` item 1, third entry condition)');

  // **ARM TWO: NEITHER `saveCall` NOR A PATH — THE `mem` STORE.** The SAME VERB, the SAME POSITIONS, the SAME TIER
  // WORD, and the answer is the store's refusal: **a child anchor may not outrank its parent's tier**
  // (`ParentAnchorMonotonicityViolation`), which is what a `file`-tier write asks of a `mem` store and gets.
  const plain = storeCreate(glue, { journalLength: 8, listeners: [] });
  const plainWrite = attempt(() => plain.write(['t'], 'file', 1));
  assert.equal(plainWrite.ok, false, 'the identical write on a store with neither `saveCall` nor a path does NOT land');
  assert.equal(statusOf(plainWrite), 'ParentAnchorMonotonicityViolation',
    'and it answers the store\'s own declared refusal for a child anchor outranking its parent — not a package '
    + 'code and not a host error: ' + statusOf(plainWrite));

  // **SO THE TIER IS THE CONSTRUCTION'S.** One verb, two stores, two answers: the difference is what the caller
  // spelled at `storeCreate` and nothing the write did.
  assert.equal(saved.length, 1, 'and the durable store is the one that saved — the `mem` store performed no save '
    + 'at all: ' + saved.length);
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W2` · THE ARM'S `cfg` DOMAIN — `filePath` IS NOT IN DOMAIN, AND THE EMPTY SEED IS REFUSED**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-2 · C-W2 — `filePath` is refused before any filesystem act, and an empty `initialImage` with it', async () => {
  const { glue, storeCreate } = await arm();
  const withPath = attempt(() => storeCreate(glue, { filePath: 'a-store.json', journalLength: 8, listeners: [] }));
  // **⟶ AND THE SEAT IS THE STORE'S OWN AND NOT THE `cfg` GATE'S, WHICH IS A DIVERGENCE FROM THE PLAN'S `C-W2`
  // AND IS RECORDED RATHER THAN PAPERED** (`docs/L1/wasm-realm.md` §7 names `AddressMalformed`). The `cfg` reader
  // is realm-blind — one shared part serves both arms — so the refusal comes from the store's own `Path` arm,
  // which on this target has no probe to take and answers `FilePathUnreachable`. **THE PLAN'S INTENT AND THE
  // TREE'S ANSWER DIFFER IN THE CODE AND AGREE IN THE FACT: the key is refused, at construction, before any
  // filesystem act.**
  assert.equal(statusOf(withPath), 'FilePathUnreachable',
    'D-154 item 4: `filePath` is not in domain on this arm — the store\'s own Path arm refuses it at the '
    + 'construction, which is the plan\'s `C-W2` fact in the store\'s own seat');
  // **AND THE GENERATED SENTENCE NAMES THE PATH THE CALLER GAVE**, which is `FilePathUnreachable`'s own slot in
  // `src/error.rs` — it is the store's message and not the `cfg` gate's, so the KEY is not what it spells.
  assert.ok(String(withPath.caught?.message).includes('a-store.json'),
    'and its message names the path the caller supplied: ' + String(withPath.caught?.message).slice(0, 140));

  const emptySeed = attempt(() => storeCreate(glue, { journalLength: 8, listeners: [], initialImage: '' }));
  assert.equal(statusOf(emptySeed), 'AddressMalformed',
    'D-147 item 4: an empty `initialImage` is refused as broken config — a present, non-empty image or none at all');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W4` · THE ENTRY'S OWN GRAPH IS SYNCHRONOUS, AND IT REACHES NO HOST MODULE**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-4 · C-W4 — the entry\'s transitive set carries no `node:` specifier and no top-level await', async () => {
  const { glue } = await arm();
  assert.equal(typeof glue.initSync, 'function',
    'the glue offers SYNCHRONOUS instantiation, which is what lets the host hold the instance before the entry '
    + 'evaluates (`D-155` item 3\'s arm: the entry\'s own graph stays synchronous)');

  const set = transitiveSet(ENTRY);
  const host = [];
  for (const [file, source] of set) {
    for (const match of source.matchAll(/from\s+'(node:[^']+)'|import\s+'(node:[^']+)'/g)) {
      host.push(match[1] ?? match[2]);
    }
    assert.equal(/^\s*await\s/m.test(source), false,
      'no module in the set carries a top-level await: ' + file);
  }
  assert.deepEqual(host, [],
    'the arm\'s whole graph carries no host specifier: ' + JSON.stringify([...set.keys()].map((f) => f.slice(PKG.length))));
  assert.ok(set.has(resolve(ENTRY)), 'and the walk started where it was told to');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`C-W6` · THE ARM'S EXPORT SET — NINETEEN, `commitFile` ABSENT, `delete` SPELLED `_delete`**
//
// **⟶ THE FIGURE MOVED `18 → 19` ON 2026-11-19 AND THE SENTENCE IT MOVED FROM IS QUOTED BEFORE IT IS RE-CUT:
// *"`C-W6` · THE ARM'S EXPORT SET — EIGHTEEN, `commitFile` ABSENT, `delete` SPELLED `_delete`"*, and the cell's own
// message read *"D-155 item 4: the WASM arm's entry set is eighteen of the Node arm's twenty"*.** **THE ARCHITECT'S
// CLOSURE ANSWER, ARM `a`, IS THAT THIS ARM RETIRES A STORE AS THE NODE ARM DOES**, so `wasm.rs` gains the
// nineteenth entry — `storeRelease` — and **the arithmetic keeps its shape: the Node arm's twenty minus
// `commitFile`.** `D-155` item 4's own sentence is re-cut at its byte in the same pass, and this cell is the other
// site `D-171` item 5 named by name.
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-6 · C-W6 — the module exports the nineteen declared entries, and `commitFile` is not one of them', async () => {
  const { glue } = await arm();
  const names = Object.keys(glue)
    .filter((name) => name !== 'default' && name !== 'initSync' && typeof glue[name] === 'function')
    .sort();
  assert.equal(names.length, 19,
    'D-155 item 4, re-cut 2026-11-19: the WASM arm\'s entry set is NINETEEN — the Node arm\'s twenty minus '
    + '`commitFile`, plus the retirement\'s frame — it read ' + names.join(', '));
  assert.equal(names.includes('commitFile'), false,
    'and `commitFile` is the one that is absent BY RULING: the arm has no writer to reach');
  assert.equal(names.includes('_delete'), true,
    '`delete` exports as `_delete` — the toolchain escapes a keyword, and the package\'s own dispatch table is '
    + 'what spells it back (`addon-slot.mjs`\'s `MODULE_SPELLING`)');
  assert.equal(names.includes('saveSucceeded'), true, 'the save arm\'s verdicts are entries');
  assert.equal(names.includes('exportImage'), true, 'and so is the image export');
  // **AND THE NINETEENTH IS THE RETIREMENT'S FRAME** — the one name this figure moved for, named here so a reader of
  // the count sees which entry answered for the `18 → 19` and not only that the number moved.
  assert.equal(names.includes('storeRelease'), true,
    'the nineteenth entry is `storeRelease` — the retirement the package\'s `STORE_RETIREMENT` callback calls, '
    + 'declared by `bindings/js/src/wasm.rs` and forwarded by `addon-slot.mjs`\'s `PASSED_THROUGH_ENTRIES`');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **`D-156` · THE CROSSING IS A DEEP CLONE IN BOTH DIRECTIONS, AND A `Proxy` IS REFUSED WITH NO TRAP RUN**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-7 · D-156 — a value crosses by value both ways, and a `Proxy` is refused before a single trap runs', async () => {
  const { glue, storeCreate } = await arm();
  const store = storeCreate(glue, { journalLength: 8, listeners: [] });

  // **COPY IN**: the object the app handed in is not the object the store holds.
  const mine = { a: 1, nested: { b: 2 } };
  store.write(['t'], 'mem', mine);
  mine.a = 99;
  mine.nested.b = 99;
  assert.deepEqual(store.read(['t'], []), { a: 1, nested: { b: 2 } },
    'D-156 item 2: mutating the caller\'s own object after the write changes nothing the store holds — which is '
    + 'what keeps a listener\'s firing and a constraint\'s pass honest');

  // **COPY OUT**: and the store is not a view the app can write through.
  const seen = store.read(['t'], []);
  seen.a = 77;
  assert.deepEqual(store.read(['t'], []), { a: 1, nested: { b: 2 } },
    'and mutating what `read` answered changes nothing the store holds');

  // **AND THE PROBE**: a `Proxy` is refused before any trap of the caller\'s runs (`D-156` item 1).
  const counters = {};
  const traps = ['get', 'set', 'has', 'ownKeys', 'getPrototypeOf', 'getOwnPropertyDescriptor',
    'deleteProperty', 'defineProperty'];
  const handlers = {};
  for (const name of traps) {
    counters[name] = 0;
    handlers[name] = (...args) => { counters[name] += 1; return Reflect[name](...args); };
  }
  const refused = attempt(() => store.write(['p'], 'mem', new Proxy({}, handlers)));
  assert.equal(statusOf(refused), 'ValueRefusedAtBoundary',
    'a Proxy whose target is a plain object is refused in the one crossing form');
  assert.deepEqual(Object.keys(counters).filter((name) => counters[name] !== 0), [],
    'and NOT ONE trap ran: the instrument is `structuredClone`, which throws on a Proxy before any handler is '
    + 'reached — `DD-34`\'s property kept on an arm with no `util.types.isProxy`: ' + JSON.stringify(counters));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// **THE ARM'S RETIREMENT — THE ENTRY'S ARMS, DRIVEN** (the architect's closure answer, arm `a`;
// `bindings/js/src/wasm.rs`'s `storeRelease`; `D-171` item 5's last sentence is what named the absence open)
//
// **THIS IS `tests/e2e/store-retirement.test.mjs`'s `SR-03`, ONE ARM OVER, AND ITS OBSERVABLE IS THE SAME ONE**: a
// released handle answers `AddressNotFound` at the verb that names it — **THE OBSERVABLE AT ITS OWN ANSWER, AND
// NEVER A TABLE LENGTH** (`receiver-and-refusal.md §6`'s `OWED-2`: *"NOTHING ASSERTS A TABLE TYPE"*; a release that
// was measured by the table's size would be measuring the very interior that clause forbids a cell to read). **AND
// THE INDEX-INVARIANCE IS ASSERTED THE SAME WAY `SR-03` ASSERTS IT — BY A NEIGHBOUR**: `§6`'s requirement is that a
// retirement removes EXACTLY ONE store, so the second store constructed across the first's release must still
// answer its own register, which is what a renumbering table would break first.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('CW-8 · the arm retires a store: the released handle answers `AddressNotFound`, a second release refuses, a handle no mint reached answers the same arm, and a position that is not an index answers `AddressMalformed` — and none of them panics', async () => {
  const { glue, storeCreate } = await arm();
  assert.equal(typeof glue.storeRelease, 'function',
    'the module carries the retirement\'s entry — `wasm-bindgen` publishes it as `storeRelease`, the name '
    + '`state.mjs`\'s `STORE_RETIREMENT` callback has always called and the name `addon-slot.mjs` now forwards');

  // **THE STORE, ITS REGISTER AND THE INDEX THE PACKAGE HOLDS** — the same three `SR-03` reads on the other arm.
  const instance = storeCreate(glue, { journalLength: 8, listeners: [] });
  instance.write(['a'], 'mem', 7);
  const handle = instance[STORE_INDEX];
  assert.equal(typeof handle, 'number',
    'the handle the module minted is published on the store object as the package\'s own `Symbol.for` row — a '
    + 'NUMBER, which is what the finalizer\'s held value may carry and all it may carry: ' + JSON.stringify(handle));
  // **A SECOND STORE, HELD ACROSS THE FIRST'S RELEASE**: the store that must still answer (`§6`'s one-entry rule).
  const neighbour = storeCreate(glue, { journalLength: 8, listeners: [] });
  neighbour.write(['b'], 'mem', 11);

  // ── (a) THE RELEASE ITSELF: `undefined`, no throw.
  const released = attempt(() => glue.storeRelease(handle));
  assert.equal(released.ok, true,
    'the release of a live store ANSWERS rather than throwing: ' + String(released.ok ? '' : released.caught?.status));
  assert.equal(released.value, undefined,
    'and its answer is `undefined` — the crate\'s own shape for an entry that carries nothing back (`register`\'s arm)');

  // ── (b) THE RELEASED STORE'S OWN CALL REFUSES IN THE ONE FORM — the observable `§3` names, read through the
  // package's own `read` rather than through the module, so the route is the parts' and not the cell's.
  const after = attempt(() => instance.read(['a'], 'mem'));
  assert.equal(after.ok, false, 'a call on a RELEASED store refuses rather than answering');
  assert.equal(statusOf(after), 'AddressNotFound',
    'and the refusal is the crate\'s own absent arm — `no_instance_at`\'s `AddressNotFound`, the same observable a '
    + 'detached call and a fabricated index get (`receiver-and-refusal.md §3`): ' + JSON.stringify(statusOf(after)));
  assert.equal(after.caught instanceof Error, false,
    'and it is the ONE FORM and never an `Error` (`failure-form.md §1`)');

  // ── (c) THE SECOND STORE STILL ANSWERS ITS OWN — `§6`'s one-entry rule, and the tombstone's whole point.
  assert.equal(neighbour.read(['b'], 'mem'), 11,
    '**THE RETIREMENT EMPTIED ONE SLOT AND NEVER SHIFTED ONE** (`§6`): the second store\'s own register answers '
    + 'after the first store\'s release, so the handle the package holds cannot name its neighbour');

  // ── (d) THE SAME HANDLE AGAIN — an EMPTIED slot, not a live one.
  const twice = attempt(() => glue.storeRelease(handle));
  assert.equal(twice.ok, false,
    'releasing an already-released store refuses rather than releasing again — the release is not idempotent at '
    + 'its answer: a second call must not free a second store');
  assert.equal(statusOf(twice), 'AddressNotFound',
    'and it answers the crate\'s absent arm: ' + JSON.stringify(statusOf(twice)));

  // ── (e) A HANDLE NO MINT EVER REACHED — the same arm, because an emptied slot and a fabricated handle are one
  // observable (`receiver-and-refusal.md §3`: *"There is no second arm and no second observable"*).
  const nothing = attempt(() => glue.storeRelease(handle + 4096));
  assert.equal(statusOf(nothing), 'AddressNotFound',
    'a handle the table never reached refuses with the SAME token the emptied slot answers: '
    + JSON.stringify(statusOf(nothing)));

  // ── (f) A POSITION THAT IS NOT AN INDEX — the crate's malformed arm, and never a store touched.
  const outside = ['not-an-index', null, undefined, {}, Number.NaN, Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY, -1, 1.5, true];
  for (const position of outside) {
    const answered = attempt(() => glue.storeRelease(position));
    assert.equal(answered.ok, false,
      'a position that is not an index refuses: ' + JSON.stringify(position) + ' answered instead');
    assert.equal(statusOf(answered), 'AddressMalformed',
      'and its status is the crate\'s own malformed-argument member — the token the Node frame\'s '
      + '`not_a_store_index` answers and no new one minted (`DD-40`): ' + JSON.stringify(position) + ' answered '
      + JSON.stringify(statusOf(answered)));
  }
  // **★ AND THE `NaN` GUARD IS ASSERTED AT ITS OWN CONSEQUENCE.** `NaN as u32` — `NaN as usize` on the other arm —
  // SATURATES TO `0` in Rust, so a class test that let `NaN` through would name THE FIRST STORE EVER CONSTRUCTED in
  // this process and free a store the caller never named. **THE LIVE STORE THIS CELL HOLDS IS RE-READ AFTER ALL
  // NINE OF THEM**, and it must still answer its own register.
  assert.equal(neighbour.read(['b'], 'mem'), 11,
    'and none of those outside positions freed a live store: `NaN` in particular would have saturated to index `0` '
    + 'and released whatever store this process minted first');
  // ── (g) AND THE RELEASED STORE STILL READS AS RELEASED, after all of the refusals above.
  const stillGone = attempt(() => instance.read(['a'], 'mem'));
  assert.equal(statusOf(stillGone), 'AddressNotFound',
    'the released store is still released after the nine refusals: the tombstone is not resurrected by a failed '
    + 'release, and nothing here answered `Ok` for it');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// **THE FINALIZER REACHES THE ARM — THE PACKAGE'S OWN `STORE_RETIREMENT`, FIRED BY A COLLECTION**
//
// **WHAT CAN BE FORCED HERE AND WHAT CANNOT, AT THE BYTE.** `npm test` runs `node --test "tests/**/*.test.mjs"` with
// no `--expose-gc`, so **NO COLLECTION CAN BE FORCED IN THE PROCESS THAT ASSERTS** — `gc()` is not a function there
// at all, and a cell claiming it had forced one would be claiming an instrument it does not hold. **SO THE
// INSTRUMENT IS A CHILD PROCESS THIS FILE RE-EXECUTES ITSELF AS WITH `--expose-gc`**, which is the device
// `store-retirement.test.mjs` already uses one arm over (`SR-01`/`SR-02`'s probe) — one file, one copy of the
// instrument, and the asserting process is the same file.
//
// **AND WHAT IS *STILL* NOT FORCED IS THE HOST'S TIMING.** V8 queues a finalization callback and runs it on a turn
// of its own, so the child SETTLES in bounded rounds (`gc`, `gc`, a 25 ms turn, `gc`) and then reads the answer once.
// **THE READING IS THE ENTRY'S OWN AND NOT A TABLE'S**: after the stores are dropped and collected, the child calls
// `storeRelease` on each handle it kept — an `AddressNotFound` there means the FINALIZER already emptied that slot
// (the release refused because there was nothing left to free), while an `undefined` answer means the slot was still
// live and this call is the one that freed it. **THE COUNT IS THEREFORE THE FINALIZER'S, MEASURED, AND NOT A
// PROMISE**: the cell asserts that every store the child dropped was already retired when it asked.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/// **THE PROBE, RUN** — one child, `--expose-gc`, this same file. **`--expose-gc` IS THE ONLY WAY `gc()` IS AVAILABLE
/// HERE AT ALL**, and a child is also what keeps the probe's heap out of the test process's own.
function retirementProbe() {
  const stdout = execFileSync(process.execPath, ['--expose-gc', fileURLToPath(import.meta.url), PROBE_FLAG], {
    encoding: 'utf8',
    timeout: 300000,
    maxBuffer: 4 * 1024 * 1024,
  });
  return JSON.parse(stdout.trim().split('\n').pop());
}

const RETIREMENT_REPORT = retirementProbe();

test('CW-9 · the package\'s finalizer reaches the ARM — every store the probe constructed-and-dropped is already retired when the probe asks the module for it', () => {
  assert.equal(RETIREMENT_REPORT.gc, true,
    'the probe ran with `--expose-gc`, so what it measured is a retirement and not a lag in the collector');
  assert.equal(RETIREMENT_REPORT.stores, PROBE_STORES, 'and it measured the batch this cell declares');
  assert.equal(RETIREMENT_REPORT.handlesAreNumbers, true,
    'every handle the probe kept is a NUMBER — the held value `STORE_RETIREMENT.register(instance, id)` passes, and '
    + 'the only thing a finalizer\'s held value may be without retaining the store it observes');
  assert.equal(RETIREMENT_REPORT.unexpected, null,
    'the entry answered in the crate\'s own forms and in no third one: ' + JSON.stringify(RETIREMENT_REPORT.unexpected));
  assert.equal(RETIREMENT_REPORT.stillLive, 0,
    '**NO MEASURED STORE WAS STILL IN THE ARM\'S TABLE AFTER THE COLLECTION**: each of the '
    + `${PROBE_STORES} answered \`{status: 'AddressNotFound'}\` when the probe asked to release it, whose declared `
    + 'reading is *"the package holds no instance at that id"* — the slot was emptied by the finalizer before this '
    + `probe asked. MEASURED: ${RETIREMENT_REPORT.releasedByFinalizer} of ${RETIREMENT_REPORT.stores}. `
    + '**BEFORE THE ENTRY EXISTED THE SAME CALL WAS A RAW HOST `TypeError` AND THE STORES STAYED IN THE TABLE**');
  assert.equal(RETIREMENT_REPORT.releasedByFinalizer, PROBE_STORES,
    'and the count is the whole batch — a partial count would mean the finalizer reaches the arm for some stores '
    + `and not others: ${RETIREMENT_REPORT.releasedByFinalizer} of ${PROBE_STORES}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// **`CW-10` · THE ARM'S DECLARED SURFACE, COMPILED — THE INSTRUMENT `D-203` ITEM 5 OWED**
//
// **WHY THIS CELL EXISTS, IN THE FINDING'S OWN WORDS.** `D-203` item 4: *"**no TypeScript consumer is compiled
// against the ARM's declaration anywhere**"* — `typecheck/consumer-fixture.ts` targets the NODE package, and the
// arm's cells (`CW-1`…`CW-9`) drive the runtime in JAVASCRIPT and never a compiler. **So the arm's declared
// surface went unmeasured from `D-155` item 2 until this cell**, and the defect it hid was that the arm's shipped
// `index.d.ts` spelled `export function storeCreate(cfg: StoreConfig): StoreInstance;` — **the Node arm's line** —
// while the arm's runtime takes the initialised module at its FIRST position (`bindings/js/platforms/wasm/index.mjs`)
// and the guide teaches that construction (`docs/guides/package-use.md` §13.1). **A consumer could write
// `storeCreate(cfg)`, compile, and never be able to construct a store.**
//
// **THE THREE LIMBS, AND EACH ONE IS A LIMB AND NOT A DECORATION** (`D-203` item 5; item 3's own two sentences):
//   1. `storeCreate(bindings, cfg)` TYPECHECKS — the construction the runtime and the guide require, with the module
//      at position one and a `cfg` that carries no `filePath`;
//   2. `storeCreate(cfg)` DOES NOT — the one-position form is the NODE arm's, and a fixture that checked only the
//      positive would have passed on the broken declaration for the wrong reason;
//   3. `filePath: 'x'` DOES NOT — the arm's `StoreConfig` narrows that member to `never` (`D-155` item 2), and this
//      limb is what says the FIRST region still lands while the second is read beside it.
// **AND THE TWO NEGATIVES ARE `@ts-expect-error` LINES, WHICH IS THE SELF-CHECKING FORM**: TypeScript reports an
// UNUSED directive as its own error (`TS2578`), so a negative limb that stopped being negative — or a positive limb
// that stopped being positive — reddens this cell rather than passing it.
//
// **THE FILE IT COMPILES AGAINST IS THE STAGED ARM — `bindings/js/platforms/wasm/index.d.ts` — AND THE CELL DEPENDS
// ON A BUILD ONLY WHEN THE STAGED BYTES ARE NOT THE GENERATOR'S OWN ARM.** `ensureBuilt()` above builds the arm when
// its runtime artefacts are absent, but a STALE declaration can stand beside a current runtime: so the cell produces
// the arm's emission into a temp directory, compares, and — when the staged file disagrees — runs
// `scripts/build-wasm-package.mjs` (whose step 5 installs that very emission as `index.d.ts`) and re-reads. **A cell
// that measured whatever happened to be on disk would be measuring an unknown file; this one measures the generator's
// arm or fails in words.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/// The arm's STAGED declaration, the generator that produces it, and the compiler `npm run typecheck` already drives.
const ARM_DECLARATION = join(PKG, 'index.d.ts');
const EMITTER = join(ROOT, 'scripts', 'emit-declarations.mjs');
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

/// **THE ARM'S OWN EMISSION, PRODUCED INTO A TEMP DIRECTORY AND READ BACK** — exactly the bytes `build-wasm-package.mjs`
/// step 5 installs, and the reading is of the generator rather than of whatever a previous run left behind.
function emittedArm() {
  const dir = mkdtempSync(join(tmpdir(), 'cw-10-emit-'));
  try {
    const run = spawnSync(process.execPath, [EMITTER, dir], { cwd: ROOT, encoding: 'utf8' });
    assert.equal(run.status, 0,
      'the declaration generator must answer exit 0 for the arm to have an emission this cell can measure. It said: '
      + `${(run.stderr ?? '').slice(0, 800)}`);
    return readFileSync(join(dir, 'index.wasm.d.ts'), 'utf8');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/// **THE STAGED ARM, MADE CURRENT BEFORE IT IS MEASURED.** A declaration that is absent or that is not the generator's
/// arm is REBUILT (`scripts/build-wasm-package.mjs`), never tolerated, and the rebuild is asserted to have landed the
/// emission this cell then compiles against.
function stagedArm() {
  const staged = existsSync(ARM_DECLARATION) ? readFileSync(ARM_DECLARATION, 'utf8') : null;
  if (staged !== null && staged === emittedArm()) return staged;
  const script = join(ROOT, 'scripts', 'build-wasm-package.mjs');
  assert.ok(existsSync(script), 'the build script this cell falls back to is present: ' + script);
  const run = spawnSync(process.execPath, [script], { cwd: ROOT, encoding: 'utf8' });
  // **A REBUILD THAT CANNOT RUN IS THE ARM'S OWN DECLARED ABSENCE AND NOT A SKIP** (`P-PUB-7`'s doctrine): the same
  // refusal `ensureBuilt()` prints, one artefact over.
  assert.equal(run.status, 0,
    'CW-10: the arm\'s staged declaration is not the generator\'s arm and the rebuild that would stage it could not run '
    + '(it needs the wasm32-unknown-unknown target and the wasm-bindgen CLI in .cargo-home/bin). The build said: '
    + `${(run.stderr ?? '').slice(0, 800)}`);
  assert.ok(existsSync(ARM_DECLARATION), 'the rebuild staged the arm\'s declaration at ' + ARM_DECLARATION);
  const rebuilt = readFileSync(ARM_DECLARATION, 'utf8');
  assert.equal(rebuilt, emittedArm(),
    'and what it staged IS the generator\'s WASM arm — the emission `scripts/emit-declarations.mjs` produces, with each '
    + 'of its realms\' bodies replaced by that realm\'s own');
  return rebuilt;
}

/// **THE CONSUMER'S FILE** — a `.ts` compiled with `--noEmit` against the STAGED ARM, written into a temp directory so
/// that this cell writes nothing into the checkout. **`bindings` IS A PLAIN `object` HERE AND `unknown` AT THE
/// DECLARATION**: the declared type of a host-supplied module is `unknown` on purpose (`D-203` item 5 — the runtime
/// validates it, and a named type would be this package claiming the HOST's shape), so anything the host may hand over
/// is assignable to it and nothing here has to imitate a module's shape.
function fixtureSource(specifier) {
  return [
    '// GENERATED BY tests/e2e/wasm-arm.test.mjs\'s CW-10 — `D-203` item 5. Compiled with --noEmit, never run.',
    `import { storeCreate } from '${specifier}';`,
    `import type { StoreConfig, StoreInstance } from '${specifier}';`,
    '',
    '// THE HOST INSTANTIATES NOTHING HERE: the module is the caller\'s, so its declared type is `unknown`.',
    'const bindings: object = {};',
    '// AND THIS `cfg` CARRIES NO `filePath` — it is not in domain on this arm (`D-154` item 4).',
    'const cfg: StoreConfig = { journalLength: 256, listeners: [] };',
    '',
    '// LIMB ONE — THE TWO-POSITION CONSTRUCTION THE RUNTIME AND THE GUIDE REQUIRE. It must compile.',
    'const store: StoreInstance = storeCreate(bindings, cfg);',
    "store.read(['a'], 'mem');",
    '',
    '// LIMB TWO — THE ONE-POSITION FORM IS THE NODE ARM\'S AND MUST NOT COMPILE HERE (`D-203` item 3).',
    '// @ts-expect-error — `storeCreate(cfg)` is one position: an unused directive here is a FAILURE.',
    'storeCreate(cfg);',
    '',
    '// LIMB THREE — `filePath` IS `never` ON THIS ARM AND MUST NOT BE SPELLABLE (`D-155` item 2).',
    '// @ts-expect-error — a string in that position is refused on this arm and nowhere else.',
    "const withPath: StoreConfig = { journalLength: 8, listeners: [], filePath: 'x' };",
    '',
  ].join('\n');
}

test('CW-10 · D-203 — a TypeScript consumer compiled against the STAGED ARM writes `storeCreate(bindings, cfg)` and '
  + 'typechecks, while `storeCreate(cfg)` and `filePath` are both refused', () => {
  const declared = stagedArm();
  assert.ok(existsSync(TSC), 'the project\'s own compiler is present and is what this cell drives: ' + TSC);

  // **THE FIXTURE, WRITTEN INTO A FRESH TEMP DIRECTORY AND COMPILED THERE.** The specifier is the arm's declaration
  // reached relatively from that directory, so the file this compilation reads IS `bindings/js/platforms/wasm/index.d.ts`.
  const dir = mkdtempSync(join(tmpdir(), 'cw-10-fixture-'));
  try {
    const specifier = relative(dir, ARM_DECLARATION.replace(/\.d\.ts$/, '')).split(sep).join('/');
    writeFileSync(join(dir, 'fixture.ts'), fixtureSource(specifier.startsWith('.') ? specifier : `./${specifier}`));
    // **`moduleResolution: bundler` AND `types: []` ARE THE TWO SETTINGS THIS READING NEEDS**: the first resolves the
    // extensionless relative specifier a consumer would write, the second keeps any `@types` package on the machine
    // from entering the graph — so the file that answers this compilation is the arm's declaration and nothing else.
    writeFileSync(join(dir, 'tsconfig.json'), `${JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        target: 'ES2022',
        module: 'esnext',
        moduleResolution: 'bundler',
        types: [],
        skipLibCheck: false,
      },
      files: ['fixture.ts'],
    }, null, 2)}\n`);

    const run = spawnSync(process.execPath, [TSC, '-p', join(dir, 'tsconfig.json')], { cwd: dir, encoding: 'utf8' });
    const output = `${run.stdout ?? ''}${run.stderr ?? ''}`.trim();

    // ── THE THREE LIMBS, READ AT THE COMPILER'S OWN ANSWER. `tsc` exits 0 only when limb one compiled, and when both
    //    `@ts-expect-error` directives were USED — an unused one is `TS2578`, which is an error of this run.
    assert.equal(run.status, 0,
      'CW-10, `D-203` item 5: a TypeScript consumer of the WebAssembly arm must be able to write the construction its '
      + 'runtime and its guide require. `storeCreate(bindings, cfg)` must TYPECHECK, `storeCreate(cfg)` must NOT (its '
      + '@ts-expect-error must be USED), and `filePath` must NOT (`never`). The compilation that decides this is over '
      + `the STAGED ARM at ${ARM_DECLARATION}; tsc said: ${output}`);
    console.log('[CW-10] tsc --noEmit over the staged arm: exit 0 — `storeCreate(bindings, cfg)` compiles, '
      + '`storeCreate(cfg)` and `filePath` are both refused at their own `@ts-expect-error` lines');

    // ── AND THE BYTES THE COMPILER READ ARE THE ARM'S, NAMED SO THE READING ABOVE CANNOT BE OF SOME OTHER FILE: the
    //    factory's region body is the TWO-position line, and the Node arm's source beside it is the ONE-position line —
    //    which is what makes the region realm-conditional rather than a second hand-maintained surface.
    const armLines = declared.split('\n');
    const armBegin = armLines.indexOf('  // ⟦realm:factory:begin⟧');
    assert.notEqual(armBegin, -1, 'the arm\'s declaration carries the factory region\'s begin marker at the marker '
      + 'depth this file uses: ' + JSON.stringify('  // ⟦realm:factory:begin⟧'));
    assert.equal(armLines[armBegin + 1],
      'export function storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance;',
      'and the body between the factory region\'s markers is the TWO-position declaration — `unknown` is the honest '
      + 'type of a host-supplied module and the runtime validates it. It reads: '
      + JSON.stringify(armLines[armBegin + 1]));
    assert.equal(armLines[armBegin + 2], '  // ⟦realm:factory:end⟧',
      'and the region is closed at the same depth it opened');

    const nodeLines = readFileSync(join(ROOT, 'bindings', 'js', 'index.d.ts'), 'utf8').split('\n');
    const nodeBegin = nodeLines.indexOf('  // ⟦realm:factory:begin⟧');
    assert.notEqual(nodeBegin, -1, 'the SOURCE declaration carries the same marker pair, because the arm\'s emission '
      + 'is this file\'s bytes with the region\'s body replaced and not a second authored surface (`D-155` item 2)');
    assert.equal(nodeLines[nodeBegin + 1], 'export function storeCreate(cfg: StoreConfig): StoreInstance;',
      'and the NODE arm\'s signature is the one position it has always had — the movement is the realm\'s and not the '
      + 'package\'s. It reads: ' + JSON.stringify(nodeLines[nodeBegin + 1]));

    assert.equal(declared.includes('  readonly filePath?: never;\n'), true,
      'and the FIRST region still lands on this arm: `filePath` narrows to `never` (`D-155` item 2), which is the '
      + 'member census the two arms share');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
