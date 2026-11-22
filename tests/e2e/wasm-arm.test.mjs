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
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
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
// **`C-W6` · THE ARM'S EXPORT SET — EIGHTEEN, `commitFile` ABSENT, `delete` SPELLED `_delete`**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
test('CW-6 · C-W6 — the module exports the eighteen declared entries, and `commitFile` is not one of them', async () => {
  const { glue } = await arm();
  const names = Object.keys(glue)
    .filter((name) => name !== 'default' && name !== 'initSync' && typeof glue[name] === 'function')
    .sort();
  assert.equal(names.length, 18,
    'D-155 item 4: the WASM arm\'s entry set is eighteen of the Node arm\'s twenty — it read ' + names.join(', '));
  assert.equal(names.includes('commitFile'), false,
    'and `commitFile` is the one that is absent BY RULING: the arm has no writer to reach');
  assert.equal(names.includes('_delete'), true,
    '`delete` exports as `_delete` — the toolchain escapes a keyword, and the package\'s own dispatch table is '
    + 'what spells it back (`addon-slot.mjs`\'s `MODULE_SPELLING`)');
  assert.equal(names.includes('saveSucceeded'), true, 'the save arm\'s verdicts are entries');
  assert.equal(names.includes('exportImage'), true, 'and so is the image export');
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
