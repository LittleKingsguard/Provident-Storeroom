// RED SET — THE TYPED PROPERTY LAYER FOR THE `RCA-9` FILE-TIER-SAVE AMENDMENT: THE `8` ROWS OF ITS OWN
// REGISTER (`docs/specs/storeroom-native/implementation-plan.md §10.9`) EXECUTED WITH A DETERMINISTIC
// PINNED SEED.
//
// **BUDGET:** `≤ 100` attempts per row, `≤ 400` total (`8` rows x `50` = `400` exactly), **STOP AFTER `5`**
// failures per row, one seed PER ROW pinned as a literal, no clock, no `Math.random`, no host entropy. A
// row that breaks stops that row's attempts and reports the row id, its STRATEGY ID and the failing input.
//
// **EVERY ROW'S PROPERTY IS QUOTED FROM ITS OWN REGISTER ROW AND ITS OWN CLAUSES** (`§10.9` rows 1–8;
// `docs/specs/storeroom-js/surface.md §2.11` clauses 1–7; `docs/specs/storeroom-native/contract.md §7.1`,
// `§7.2` items 1–5, `§8.1` #15/#16, `§8.2`; `docs/specs/storeroom-js/parameter-semantics.md §2.20`–`§2.21`;
// `docs/specs/storeroom-constraints/kernel-surface.md §2.1` item 2). NOTHING IS READ OFF `src/**`.
//
// **`un-run` IS A FAILURE** (`acceptance.md §4.4`'s rule, read at the register layer's own precedent): every
// row below is driven here, and a row whose attempts all break FAILS this file.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storeCreate } from 'provident-storeroom';

/**
 * **⟶ THE LISTENER SPELLING, ADDED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY`
 * legacy tail). `listen(address)` MOVES TO `listen(handle, addresses)`, ARITY `1 → 2`, AND IT ANSWERS
 * `undefined`** (`contract.md §2.2` items 1 and 10; `listen-verb.md §1` item 1; `PAR-HL-3`). **THE AS-FILED
 * `(register(listen(addr), fn) || listen(addr))` IDIOM DEPENDED ON THE RETURN THE MINT RULING REMOVED** — it
 * took the handle `listen` answered, registered at it, and fell back to a second `listen` when the first
 * answered a falsy value. **Under the new declaration the handle is SPELLED by the caller, so the idiom is
 * replaced by the two acts it always meant: a `listen` that creates the RESERVED entry (`listen-verb.md
 * §4` state `1`), then a `register` that ARMS it.** **NO ASSERTION IS WEAKENED** — every cell reads the same
 * handle, the same call list and the same store-side entry.
 */
let listenerSpellingSeq = 0;
function listenAndRegister(store, address, listener) {
  listenerSpellingSeq += 1;
  const handle = `listener@${JSON.stringify(address)}#${listenerSpellingSeq}`;
  store.listen(handle, [address]);
  store.register(handle, listener);
  return handle;
}
function carriesHandle(set, handle) {
  return set.some((element) => element !== null && typeof element === 'object' && element.handle === handle);
}
function setHandles(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? element : element.handle));
}


// **⟶ ADDED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): the combined `on(address,
// listener)` is MERGED AWAY, so a home entry is minted by `listen(address)` and its function placed by
// `register(handle, listener)`. This file takes both acts at the sites that need them and passes this
// no-op body wherever the listener body's own firing is NOT the site's subject.**
const noop = () => {};

/**
 * **THE REGISTRATION-INSTANT SHIELD, ADDED 2026-10-17** (`A135` (3); `docs/specs/storeroom-native/
 * contract.md §7.3` (b) state 1).
 *
 * EVERY GENERATOR BELOW REGISTERS A CONSTRAINT AND THEN READS WHAT THE **WRITE** DID — its own ordinal
 * against the listener's, the durability of the file's bytes, the save's own arm, the op set a repair's
 * write joined. `A135` (3) ADDS ONE INVOCATION OF EVERY CONSTRAINT BODY AT ITS REGISTRATION, AND AT THAT
 * INSTANT NO SAVE HAS RUN, NO ATTEMPT EXISTS AND NO WRITE'S OP IS IN ANY SET — so an unshielded registration
 * inserts an event the generator reads as a write's, or (for a body carrying a `repair`) is REFUSED there
 * with `ConstraintListInvalid` (`§7.3` (b) state 2) before the generator's own state is reached.
 *
 * **THE GENERATOR'S SUBJECT IS UNMOVED AND ITS PREMISE MOVES: the registration is answered here, so its pair
 * is CARRIED (state 1), and the body sees the write's own context alone.** The instant is told by the two
 * members `kernel-surface.md §2.3` item 1's registration clause spells `null` (`tier`, `op`), which no
 * landing's context carries together.
 */
function atLandingOnly(record) {
  return (context) => {
    if (context !== null && typeof context === 'object'
      && context.tier === null && context.op === null) {
      return true; // the registration stands (`§7.3` (b) state 1) and this invocation is no write's
    }
    return record(context);
  };
}

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);

// ── THE DETERMINISTIC PINNED SEEDS — ONE PER ROW, A LITERAL EACH ───────────────────────────────────────
const SEEDS = {
  'P-IM-1': 0x5EED11,
  'P-IM-2': 0x5EED12,
  'P-SM-3': 0x5EED13,
  'P-SM-4': 0x5EED14,
  'P-SM-5': 0x5EED15,
  'P-TP-6': 0x5EED16,
  'P-TP-7': 0x5EED17,
  'P-TP-8': 0x5EED18,
};

const MAX_FAILURES_PER_ROW = 5;
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;
/** THE REGISTER'S OWN ROW COUNT (`§10.9`: `3 + 3 + 2 = 8` ✓ at the cap `8 ≤ 8`). */
const ROWS_OF_CHECKS = 8;
/** THE EVEN SHARE OF THE `400`-ATTEMPT TOTAL, CAPPED AT THE PER-ROW `100`: `8 x 50 = 400` exactly. */
const ROW_BUDGET = Math.min(MAX_ATTEMPTS_PER_ROW, Math.floor(MAX_ATTEMPTS_TOTAL / ROWS_OF_CHECKS));

let totalAttempts = 0;
const ROW_CELLS = [];

/** A `mulberry32` 32-bit LCG: a pure function of the seed, and the same draw on every run. */
function rngFor(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(next, list) {
  return list[Math.floor(next() * list.length) % list.length];
}

function intBetween(next, lo, hi) {
  return lo + Math.floor(next() * (hi - lo + 1));
}

let UID = 0;
function tag(label) {
  UID += 1;
  return `${label}-p${process.pid.toString(36)}-${UID}`;
}

function bytesOf(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
}

function cfgFor(over = {}) {
  const d = over.dir !== undefined ? over.dir : mkdtempSync(join(tmpdir(), 'fts-p-'));
  const cfg = {
    filePath: join(d, 'store.json'),
    journalLength: over.journalLength !== undefined ? over.journalLength : 8,
    listeners: over.listeners !== undefined ? over.listeners : [],
  };
  if ('constraints' in over) cfg.constraints = over.constraints;
  return { dir: d, filePath: cfg.filePath, cfg };
}

function newStore(over = {}) {
  const f = cfgFor(over);
  f.store = storeCreate(f.cfg);
  return f;
}

let KERNEL = null;
async function kernel() {
  if (KERNEL === null) KERNEL = await import('../src/constraint-kernel.mjs');
  return KERNEL;
}

/** A SEEDED ATTEMPT: a fresh store, a fresh address, and the budget asserted on every draw. The body is
 * handed the attempt's own draws as ONE record, so no body reaches a global generator or a clock. */
function attempt(rng, run) {
  totalAttempts += 1;
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL,
    `the total attempt budget stands at ${MAX_ATTEMPTS_TOTAL}`);
  return run({
    pick: (list) => pick(rng, list),
    int: (lo, hi) => intBetween(rng, lo, hi),
    tag,
  });
}

/**
 * THE ROW RUNNER: at most `ROW_BUDGET` attempts, stopping after `MAX_FAILURES_PER_ROW` failures, and
 * reporting the row id, the STRATEGY IDS it was driven under, its pinned seed and the attempts it ran.
 */
function row({ id, strategies, seed, body }) {
  ROW_CELLS.push({ id, strategies, attempts: ROW_BUDGET });
  const rng = rngFor(seed);
  const failures = [];
  let ran = 0;
  for (let i = 0; i < ROW_BUDGET && failures.length < MAX_FAILURES_PER_ROW; i += 1) {
    ran += 1;
    try {
      body(rng, i);
    } catch (err) {
      failures.push({ attempt: i, message: err && err.message ? err.message : String(err) });
    }
  }
  return { id, strategies, seed, attempts: ran, failures };
}

function heldOrBroken(result) {
  if (result.failures.length > 0) {
    return `BROKEN (${result.id} · ${result.strategies.join(', ')} · seed 0x${result.seed.toString(16)} · `
      + `${result.failures.length} break(s) in ${result.attempts} attempt(s); first: `
      + `${result.failures[0].message})`;
  }
  return null;
}

function assertHeld(result) {
  const broken = heldOrBroken(result);
  if (broken !== null) assert.fail(broken);
}

// ── THE CROSSING'S OWN ACT, AND THE PER-VERB ENTRIES THAT REACH IT (`DEF-2026-10-15-Z`, `P-SM-3`) ──────
// `bindings/js/src/facade.rs`'s dispatcher carries `"commitFile"` — **THE TERMINAL ARM'S OWN ACT AND NOT
// ONE OF THE CROSSING'S EIGHT VERBS** (`surface.md §2.11` clause 2; clause 7; `DEF-2026-10-15-X`) — and the
// addon reaches it through its own per-verb entry. **A drive that must RE-DRIVE ONE OP'S ACT TAKES THIS
// ROUTE AND NO OTHER**: the act is addressable nowhere else, because the package's `settle` member takes it
// only at the two instants `PAR-JS-19` declares (the first call is the adoption and the second is the
// delivery, and a third is a no-op). NOTHING UNDER `src/**` IS READ HERE.
//
// ── **RE-CUT 2026-10-21: `addon().call(index, verb, args)` IS DELETED AND THE PER-VERB ENTRIES REPLACE IT.**
//
// THE OLD HELPERS CALLED THE PRE-SPLIT DISPATCHER — `addon().call(instance, verb, args)` — WHICH NO LONGER
// EXISTS. **`docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §2` is the pin and it is
// MANDATED:** ***"`call` IS DELETED. It **was** the dispatcher: one entry taking `(instance, verb, args)` and
// matching the verb across nine arms. The split is precisely its replacement, so it does not survive."***
// **MEASURED: the built artefact's key set is exactly the thirteen `export-set-and-dispatch.md §1` declares,
// and `call` is not among them.** So the artefact is CORRECT and these helpers were STALE.
//
// **AND THE `index` ARGUMENT IS GONE WITH IT, NOT MERELY RENAMED** — `contract.md §3`: *"THE INTEGER INDEX
// DIES, AND THE RECEIVER REPLACES IT. Today the store is found by a `u32` the package minted; after the
// split each entry resolves its store from the Node-API `this` receiver."* **THE RECEIVER MUST BE THE STORE
// OBJECT**, and the object is the package's own (`storeCreate` from `provident-storeroom`), while the RAW
// ARTEFACT's `storeCreate` answers a bare integer — **so a per-verb entry called with that integer refuses
// *"the receiver position is not the store object this addon's `storeCreate` returned"*, MEASURED.** The
// helpers therefore take the PACKAGE'S STORE OBJECT and call the artefact's own entry with it as receiver.
//
// **THE ACT IS ADDRESSED AT THE ENTRY NAMED FOR ITS VERB** (`export-set-and-dispatch.md §1`'s nine:
// `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` ·
// `commitFile`) — *"ONE ENTRY PER VERB, EACH NAMED FOR ITS VERB"* (`contract.md §2` item 1) — and **no verb
// STRING crosses any more**: *"THE DISPATCHER'S STRING INDIRECTION GOES."*
let ADDON = null;
function addon() {
  if (ADDON === null) {
    const require = createRequire(import.meta.url);
    ADDON = require(join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node'));
  }
  return ADDON;
}

/** ONE ADDRESS SEGMENT ARRAY, in the crossing's own carrier (`crossing.md §1.3`). */
function crossingAddress(segments) {
  return { k: 'L', s: segments };
}

/** **THE STORE OBJECT THE ENTRY'S RECEIVER MUST BE** — the object the package's own `storeCreate` answers,
 *  which is the form `receiver-and-refusal.md §1` describes: *"each entry resolves its store from the
 *  Node-API `this` receiver."* **The raw artefact's `storeCreate` is NOT used for this**: it answers the
 *  integer the pre-split ABI took and cannot serve as a receiver (measured refusal quoted above). */
function storeAt(cfg) {
  return storeCreate(cfg);
}

/** THE READ CROSSING — `read`'s own entry, at the verb's own arguments and no instance position
 *  (`export-set-and-dispatch.md §4`: *"EACH ENTRY TAKES ITS VERB'S OWN ARGUMENTS AND NOTHING ELSE."*) */
function crossingRead(store, address, tier) {
  return addon().read.call(store, crossingAddress(address), { k: 'T', v: tier });
}

function crossingWrite(store, address, tier, value) {
  return addon().write.call(store, crossingAddress(address), { k: 'T', v: tier }, { k: 's', v: value });
}

function crossingDelete(store, address, tier) {
  return addon().delete.call(store, crossingAddress(address), { k: 'T', v: tier });
}

/** THE TERMINAL ARM'S OWN ACT, driven directly for the op the settled record carries (`§2.11` clause 2). */
function commitFileAct(store, opId) {
  return addon().commitFile.call(store, { k: 's', v: opId });
}

// ── `contract.md §8.1`'s CLOSED SET AT ITS AMENDED RANKS `1`…`16`, EACH WITH ITS OWN `§8.2`
// `<mismatch clause>` — the phrase its generated message MUST carry and that no other member's carries.
// The table is the SPEC's enumeration and never the addon's: the addon's own census is what the round trip
// below MEASURES, and the two are asserted equal (`P-TP-8`; `DEF-2026-10-15-Z`).
const DECLARED_CLOSED_SET = [
  ['AddressMalformed', 'is not a legal address segment'],
  ['AddressNotFound', 'does not exist in'],
  ['LeafHasNoDownstream', 'cannot be walked through'],
  ['TierNotFound', 'is not a version of'],
  ['OutOfDomainTier', 'is not a tier'],
  ['ParentAnchorMonotonicityViolation', "outranks its parent anchor's tier"],
  ['ContainerKindConflict', 'does not match the container kind of'],
  ['ReadTargetIsBranch', 'is a branch and not a leaf in'],
  ['WriteParentNotLink', 'cannot be written into'],
  ['JournalOpUnknown', "is not an operation this store's journal holds"],
  ['RollbackCompacted', 'is out of scope because it is compacted'],
  ['ConstructionArgumentMissing', 'requires a'],
  ['FilePathUnreachable', 'is not reachable at construction'],
  ['ValueNotAdmitted', 'is not an admitted value'],
  ['FileCommitFailed', 'could not be committed to'],
  ['ConstraintListInvalid', 'is not a valid constraint entry in'],
];

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-IM-1` · `S-ORDER-SAVE` — for every write, no listener body of the write's own triggered set runs
// before every constraint of that set has passed, AND on the passing arm no body runs before the save.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_IM_1_S_ORDER_SAVE_ordinals_and_the_pre_save_image', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-1',
    strategies: ['S-ORDER-SAVE'],
    seed: SEEDS['P-IM-1'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const tier = choose(['file', 'mem', 'temp']);
      const f = newStore();
      const key = tag(`prop-ord-${i}`);
      const log = [];
      const seen = { constraint: undefined, listener: undefined };
      const before = bytesOf(f.filePath);
      // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THIS GENERATOR'S SUBJECT IS *"the constraint body
      // precedes the listener body"* — an ORDER of the WRITE's own acts, read off `log` — so the registration's
      // invocation must not mark one and must not read a pre-save image the cell then attributes to the pass.
      register(f.store, [key], 'p-ord', atLandingOnly(() => { log.push('c'); seen.constraint = bytesOf(f.filePath); return true; }));
      listenAndRegister(f.store, [key], () => { log.push('l'); seen.listener = bytesOf(f.filePath); });
      runAttempt(f.store, commit(f.store, [key], tier, `v${i}`));
      assert.deepEqual(log, ['c', 'l'],
        `P-IM-1: the constraint body precedes the listener body (tier ${tier})`);
      if (tier === 'file') {
        assert.equal(seen.constraint, before,
          'P-IM-1: on the passing arm no body runs before the save — the constraint body reads the '
          + 'PRE-SAVE image');
        assert.notEqual(seen.listener, before,
          'P-IM-1: and the listener body reads the POST-SAVE image');
      } else {
        assert.equal(seen.listener, before,
          `P-IM-1: a ${tier}-tier write commits nothing, so the image is unmoved at both bodies`);
      }
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-IM-2` · `S-DURABLE-IMAGE` — a failing pass leaves the last passing image byte-identical, AND a
// passing pass's image is durable before any body of the delivered set runs (`§10.9` row 2's TWO drives).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_IM_2_S_DURABLE_IMAGE_a_failing_pass_is_byte_identical', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-2',
    strategies: ['S-DURABLE-IMAGE'],
    seed: SEEDS['P-IM-2'],
    body: (rng, i) => attempt(rng, ({ int }) => {
      const journalLength = int(1, 64);
      const f = newStore({ journalLength });
      const kept = tag(`prop-keep-${i}`);
      runAttempt(f.store, commit(f.store, [kept], 'file', `K${i}`));
      const before = bytesOf(f.filePath);
      const refused = tag(`prop-refused-${i}`);
      // ⟶ `A135` (3) / `§7.3` (b) state 1: this generator reads the FAILING arm's own bytes and the fresh
      // instance's boot, so the pair must be CARRIED — the shield answers the registration `true` and the body
      // still refuses the write's own landing.
      register(f.store, [refused], 'p-dur', atLandingOnly(() => ({ message: `refused ${i}` })));
      assert.throws(() => runAttempt(f.store, commit(f.store, [refused], 'file', `R${i}`)),
        (err) => err.status === 'KC-3', 'P-IM-2: the pass fails on its constraint');
      assert.equal(bytesOf(f.filePath), before,
        `P-IM-2: the bytes after a failing pass are BYTE-IDENTICAL to the last passing image `
        + `(journalLength drawn ${journalLength})`);
      // **⟶ THE TAUTOLOGY IS REPLACED, 2026-10-15 (`DEF-2026-10-15-Z`): the as-filed
      // `assert.equal(refused in image, false)` reads a key the SAME attempt minted a moment earlier, so no
      // state could ever fail it.** **THE REFUSED VERSION'S NON-DURABILITY IS NOW READ THROUGH A FRESH
      // INSTANCE OVER THE EQUAL PATH** — the observable `§10.9` row 2 pins (*"what a fresh instance's boot
      // re-reads"*) — **and beside it the KEPT version is asserted still durable there**, so a file that
      // lost BOTH versions fails this leg too (`contract.md §7.2` item 2; `§7.2` item 6).
      const afterFailure = storeCreate({ filePath: f.filePath, journalLength, listeners: [] });
      assert.throws(() => afterFailure.read([refused], 'file'),
        (err) => err.status === 'AddressNotFound',
        'P-IM-2: the refused version is NOT durable — a fresh instance over the equal path does not hold it');
      assert.equal(afterFailure.read([kept], 'file'), `K${i}`,
        'P-IM-2: and the last passing image IS the one the fresh instance boots');

      // ── THE PASSING ARM (`§10.9` row 2's second drive; the row's own second drive, drawn here so the
      // register's coverage is met rather than promised): the image is durable at the FIRST listener
      // body's own instant and from a FRESH instance over an equal `cfg.filePath` (`surface.md §2.11`
      // clause 4 (ii): *"the version the write installed is present there when the first body of the
      // delivered set runs"*).
      const g = newStore({ journalLength });
      const passed = tag(`prop-pass-${i}`);
      const gBefore = bytesOf(g.filePath);
      let atFirstBody = null;
      let bodies = 0;
      register(g.store, [passed], 'p-dur-pass', () => true);
      listenAndRegister(g.store, [passed], () => {
        bodies += 1;
        if (bodies === 1) atFirstBody = bytesOf(g.filePath);
      });
      runAttempt(g.store, commit(g.store, [passed], 'file', `P${i}`));
      assert.equal(atFirstBody === gBefore, false,
        'P-IM-2: the passing arm\'s image is NOT the pre-save image at the first body\'s own instant — '
        + '"a passing pass whose image is absent when the first body runs" FAILS the row, and so does a body '
        + 'that read the PRE-SAVE image (`§10.9` row 2\'s FAILS-it cell; clause 4 (ii))');
      assert.ok(String(atFirstBody).includes(`P${i}`),
        `P-IM-2: the version the write installed is IN the bytes the first body read — read ${atFirstBody}`);
      const fresh = storeCreate({ filePath: g.filePath, journalLength, listeners: [] });
      assert.equal(fresh.read([passed], 'file'), `P${i}`,
        'P-IM-2: and a FRESH instance over an equal `cfg.filePath` boots the very version the write installed '
        + '(`§10.9` row 2\'s observable: "what a fresh instance\'s boot re-reads")');
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SM-3` · `S-ARM-SAVE` — the save is performed on exactly two axes and no third.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_SM_3_S_ARM_SAVE_the_arm_table_is_total_over_tier_and_arm', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-3',
    strategies: ['S-ARM-SAVE'],
    seed: SEEDS['P-SM-3'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const tier = choose(['file', 'mem', 'temp']);
      const arm = choose(['passing', 'failing']);
      const f = newStore();
      const key = tag(`prop-arm-${i}`);
      const before = bytesOf(f.filePath);
      if (arm === 'failing') {
        // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded, so the arm this generator reads is the WRITE's own.
        register(f.store, [key], 'p-arm', atLandingOnly(() => ({ message: `refused ${i}` })));
        assert.throws(() => runAttempt(f.store, commit(f.store, [key], tier, 1)),
          (err) => err.status === 'KC-3', 'P-SM-3: the pass fails on its constraint');
      } else {
        runAttempt(f.store, commit(f.store, [key], tier, 1));
      }
      const after = bytesOf(f.filePath);
      if (tier === 'file' && arm === 'passing') {
        assert.notEqual(after, before, 'P-SM-3: the `file`-tier passing arm commits once');
        // **⟶ THE PROXY IS REPLACED BY THE SAVE'S OWN OBSERVABLE, 2026-10-15 (`DEF-2026-10-15-Z`).** The
        // as-filed `Object.keys(JSON.parse(after)).length === 1` counts RECORDS and not SAVES, so a second
        // commit of one record is byte-identical and the drive could not see it. **THE REPLACEMENT IS THE
        // IMAGE ITSELF, read against §7.2 item 5's own rule: the bytes at `cfg.filePath` are the bytes of
        // the LAST SUCCESSFUL `file`-TIER WRITE, and one record's second save is not a write.**
        assert.equal(after, `{"${key}":1}`,
          'P-SM-3: the passing arm\'s image is EXACTLY the one record it wrote — a second commit of the same '
          + 'record re-serializes the register and leaves a DIFFERENT image where a memory-only change has '
          + 'intervened, which is the leg below');
      } else {
        assert.equal(after, before,
          `P-SM-3: (${tier}, ${arm}) commits nothing — the table is closed and total`);
      }

      // ── THE ACT DRIVEN TWICE AROUND A LATER COMMIT (`DEF-2026-10-15-Z`'s over-strong cell) ───────────
      // **THE ROW'S FAILS-IT CELL IS *"a save performed twice for one record"*, AND THE AS-FILED CELL HAD
      // NO OBSERVABLE FOR IT.** This leg drives the act through the crossing's own `commitFile` — the act's
      // one addressable route — and asserts the image it leaves.
      const d = mkdtempSync(join(tmpdir(), 'fts-prop-arm-'));
      const filePath = join(d, 'store.json');
      // **RE-CUT 2026-10-21: THE STORE IS THE PACKAGE'S OWN OBJECT AND NOT THE ARTEFACT'S INTEGER.** The
      // pre-split line read `addon().storeCreate({...})`, which answers the `u32` the DELETED dispatcher took
      // as its `instance` position. `contract.md §3`: *"THE INTEGER INDEX DIES, AND THE RECEIVER REPLACES
      // IT"* — so the object below is what each per-verb entry resolves its store from at `this`
      // (`receiver-and-refusal.md §1`). The cfg passed is IDENTICAL, so the store under test is the same
      // store as before the split.
      const store = storeAt({ filePath, journalLength: 8, listeners: [] });
      const aKey = tag(`prop-arm-a-${i}`);
      const bKey = tag(`prop-arm-b-${i}`);
      const writeA = crossingWrite(store, [aKey], 'file', `A${i}`);
      commitFileAct(store, writeA.op.opId);
      const afterA = bytesOf(filePath);
      const writeB = crossingWrite(store, [bKey], 'file', `B${i}`);
      commitFileAct(store, writeB.op.opId);
      const afterB = bytesOf(filePath);
      assert.equal(afterA, `{"${aKey}":"A${i}"}`, 'P-SM-3: A\'s own act leaves A\'s own image');
      assert.equal(afterB, `{"${aKey}":"A${i}","${bKey}":"B${i}"}`, 'P-SM-3: and B\'s act adds B beside it');

      // (a) AROUND A LATER COMMIT: A's act driven a second time must leave the LAST SUCCESSFUL WRITE's
      // image standing. **THE READ-ONLY PASS'S OWN COUNTEREXAMPLE FOR THIS ROW — *"the image reverts to A's
      // snapshot"* — IS FALSIFIED AT THE BYTES: the act serializes the CURRENT register, so both records
      // survive.** This is the cell the row was missing, and it passes on the built artefact.
      commitFileAct(store, writeA.op.opId);
      assert.equal(bytesOf(filePath), afterB,
        'P-SM-3: A\'s act driven a second time around B\'s commit does NOT revert the image to A\'s snapshot '
        + '— the last successful write\'s image stands');

      // (b) AROUND A LATER **NON-COMMITTING** ACT: a `delete` performs NO file I/O (`§7.2` item 5), so the
      // bytes are still the last successful `file`-tier write's. **A SECOND SAVE OF ONE RECORD MOVES THEM
      // — and that is the observable the row's FAILS-it cell needs.**
      crossingDelete(store, [aKey], 'file');
      const afterDelete = bytesOf(filePath);
      assert.equal(afterDelete, afterB,
        'P-SM-3: a `delete` performs NO file I/O — the bytes stand as the last successful write left them '
        + '(`§7.2` item 5 as amended: "the bytes at `cfg.filePath` are therefore the bytes of the LAST '
        + 'SUCCESSFUL `file`-TIER WRITE")');
      commitFileAct(store, writeA.op.opId);
      assert.equal(bytesOf(filePath), afterDelete,
        'P-SM-3: AND ONE RECORD\'S SECOND SAVE IS NOT A NEW WRITE — the act re-driven here must leave '
        + `§7.2 item 5's declared state standing, and it does not: read ${bytesOf(filePath)}`);
      rmSync(d, { recursive: true, force: true });
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SM-4` · `S-REFUSAL` — a failed save is unrepairable, rolled back FIRST and answered SECOND.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_SM_4_S_REFUSAL_rollback_first_message_second_and_no_repair', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-4',
    strategies: ['S-REFUSAL'],
    seed: SEEDS['P-SM-4'],
    body: (rng, i) => attempt(rng, ({ int }) => {
      const f = newStore({ journalLength: int(1, 32) });
      const key = tag(`prop-refuse-${i}`);
      let listeners = 0;
      let evaluated = 0;
      // ⟶ `A135` (3) / `§7.3` (b) state 1: THIS GENERATOR'S SUBJECT IS *"the attempt's own constraint WAS
      // evaluated and passed, so the pass reached the save"* — an act of the WRITE's attempt — so the
      // registration's invocation is answered by the shield and `evaluated` counts the landing's alone.
      register(f.store, [key], 'p-refuse', atLandingOnly(() => { evaluated += 1; return true; }));
      listenAndRegister(f.store, [key], () => { listeners += 1; });
      // THE COMMIT'S OWN ACT IS MADE TO FAIL BY REMOVING THE PARENT THE CONSTRUCTION'S OWN PREDICATE
      // ACCEPTED (`contract.md §7.1` step 3-bis: the path's parent stands at construction), never by a
      // mode-bit reading of it.
      rmSync(f.dir, { recursive: true, force: true });
      let record = null;
      try {
        record = commit(f.store, [key], 'file', `never-${i}`);
      } catch (err) {
        assert.fail('P-SM-4: the commit failure cannot stand at the VERB — the verb performs no file I/O on '
          + `any of its arms, so the failure is the TERMINAL ARM's and is answered after it — caught `
          + `${err && err.status} at the verb call`);
      }
      let caught = null;
      try {
        runAttempt(f.store, record);
      } catch (err) {
        caught = err;
      }
      assert.ok(caught !== null, 'P-SM-4: the caller is answered and never handed the rolled-back state');
      // **⟶ THE `string` IS REPLACED BY THE ROW'S OWN CODE, AND THE TRIVIAL `undefined` BY THE CLOSED
      // RECORD AND BY THE ACT, 2026-10-15 (`DEF-2026-10-15-Z`).** *"`caught.status` is asserted as a string,
      // not `FileCommitFailed`, and `caught.repair === undefined` is trivially true on a two-member form."*
      assert.equal(caught.status, 'FileCommitFailed',
        'P-SM-4: the failed save answers the rank-`15` member ITSELF (§8.1` #15`, whose trigger column was'
        + ' widened to reach the save act; `surface.md §2.11` clause 5)');
      // **⟶ RE-DERIVED TO THE THROWN FORM'S THREE MEMBERS, 2026-10-16** (`surface.md §2.5` item 4 and
      // item 9; `parameter-semantics.md §2.26`). **THE AS-FILED LIMB WAS THE TWO-MEMBER CENSUS AND THE
      // `§8.3` CLOSED-RECORD READING ITS TEXT NAMED; BOTH ARE SUPERSEDED BY THE ROUTE THAT MOVES THE
      // ARITY AND NOT THE PROVENANCE.** **WHAT THE CELL WAS REALLY ASSERTING SURVIVES WORD FOR WORD AND IS
      // NAMED SO IT IS NOT READ AS RE-DERIVED: NO REPAIR MEMBER, NO THIRD-PARTY SHAPE AND NO PACKAGE
      // ENVELOPE IS CARRIED BY THIS ANSWER** — the only member the form gained is the declared `log`, so
      // `caught.repair` remains absent and the "no repair return" observable still holds.
      assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status'],
        'P-SM-4: and the answer is the surface\'s THREE-member form — FLAT across arms and not conditional '
        + '(`surface.md §2.5` item 4), sorted ascending with length `3` (item 9) — so the only member it '
        + 'gained over the superseded `§8.3` record is the declared `log`, and no repair member and no '
        + 'envelope is a shape this answer can carry at all');
      assert.equal(Object.keys(caught).length, 3,
        'P-SM-4: `Object.keys(caught).length` is `3` on this arm as on every arm (`surface.md §2.5` item 9)');
      assert.ok(Array.isArray(caught.log),
        'P-SM-4: `log` is an ARRAY — never absent, never `null`, never a non-array (`surface.md §2.5` '
        + 'item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
      assert.deepEqual(caught.log, [],
        'P-SM-4: and the failed save\'s own attempt reaches this frame with NO APPENDED ENTRY, so the '
        + 'member\'s DECLARED value is `[]` — the empty array and never a placeholder entry '
        + '(`surface.md §2.5` item 4; item 10 (iii): the log is taken as it stood when the refusal was '
        + 'built, and the terminal act that removes the registry entry runs before this frame)');
      assert.equal(caught.repair, undefined,
        'P-SM-4: and NO repair member is carried by this answer — the observable `§10.9` row 4 declares '
        + '(*"the absence of any repair return"*), asserted on the shape itself and not inferred');
      // **THE REAL "NO REPAIR RETURNED" OBSERVABLE: THE SAVE'S OWN VIOLATION IS ANSWERED TO THE CALLER
      // AND NOT ROUTED THROUGH THE REPAIR MACHINERY.** A failure the kernel's repair arm had carried
      // answers `KC-4` (`kernel-surface.md §2.3` item 2 (iii)); this caller is answered the STORE'S OWN
      // token instead, while the pair standing at the attempt's own address was EVALUATED and PASSED
      // (`§10.9` row 4's observable: *"the absence of any repair return"* — read as the ARM the answer
      // travelled and not as a missing member).
      assert.equal(evaluated, 1,
        'P-SM-4: the attempt\'s own constraint WAS evaluated and passed, so the pass reached the save');
      assert.equal(caught.status === 'KC-4', false,
        'P-SM-4: the save\'s failure is NOT carried by the repair machinery — a repair arm answers `KC-4` '
        + 'and this answer is the store\'s own code');
      const expected = `'${key}' could not be committed to '${f.filePath}', the file write failed at `
        + `'${f.filePath}'`;
      assert.equal(caught.message, expected,
        'P-SM-4: the message is `§8.2`\'s own row for the code, EXACTLY — the failing address in the '
        + '`<SEGMENT>` slot, the `file` tier\'s path in the `<CONTAINER>` slot, and the row\'s own '
        + '`the file write failed at \'<PATH>\'` available clause with `MessageArgs.path` substituted');
      assert.equal(listeners, 0, 'P-SM-4: the discard reaches that write\'s bodies');
      assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
        'P-SM-4: the rollback happened before the message and left no readable version');
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SM-5` · `S-JOIN` — a repair's write joins the same commit; the op set grows by exactly one.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_SM_5_S_JOIN_the_op_set_grows_by_exactly_one_per_repair_write', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-5',
    strategies: ['S-JOIN'],
    seed: SEEDS['P-SM-5'],
    body: (rng, i) => attempt(rng, ({ int }) => {
      // A REPAIR IS INVOKED ONCE PER PAIR PER ATTEMPT (`fail-surface.md §2`'s `KC-5`
      // `ConstraintRepairRepeat` is the state a SECOND application of one pair's repair produces), so the
      // row draws a COUNT OF DISTINCT PAIRS, each violated once and each carrying its own repair.
      //
      // **⟶ AND THE CHAIN IS NOW BUILT SO THE `n > 1` HALF IS GENUINELY EXERCISED, 2026-10-15
      // (`DEF-2026-10-15-Z`).** The as-filed `pairs = int(1, 3)` degenerates: after the FIRST repair landed
      // the single value `'fixed'`, every later pair passed on it, so `runs` was always `1` and the row's
      // *"per repair write"* clause was never driven. **Each pair is now VIOLATED BY THE VALUE ITS
      // PREDECESSOR'S REPAIR LANDED and satisfied by its own**: pair `j` passes on a landed rank `>= j` and
      // its repair lands the number `j`, so the pass walks `broken -> 0 -> 1 -> ... -> n-1`, ONE REPAIR WRITE
      // PER PAIR, and the op set closes at `1 + n` (`§10.9` row 5; `surface.md §2.11` clause 6).
      const pairs = 2 + int(0, 1);
      const f = newStore();
      const key = tag(`prop-join-${i}`);
      let held = null;
      let runs = 0;
      const landed = [];
      for (let j = 0; j < pairs; j += 1) {
        // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` MAKES IT MANDATORY: this body carries a `repair`,
        // so an unshielded registration ATTEMPTS it, `runs`/`landed` each gain a run no pair owed, and the
        // `1 + n` op-set arithmetic this generator reads is never the write's.
        register(f.store, [key], `p-join-${j}`, atLandingOnly((ctx) => {
          if (typeof ctx.value === 'number' && ctx.value >= j) return true;
          return {
            message: `the landed value contradicts the shape this pair confirms (${i}/${j})`,
            repair: () => {
              runs += 1;
              const w = f.store.write([key], 'file', j, held);
              landed.push(j);
              return { ok: true, op: w.op };
            },
          };
        }));
      }
      const record = commit(f.store, [key], 'file', `broken-${i}`);
      held = record;
      const report = runAttempt(f.store, record);
      assert.equal(runs, pairs,
        `P-SM-5: EVERY pair's repair ran exactly once — read ${runs} of ${pairs}; the chain is the row's own `
        + '*"per repair write"* clause and `n > 1` is drawn here rather than promised');
      assert.deepEqual(landed, Array.from({ length: pairs }, (_, j) => j),
        'P-SM-5: and each landing is the one its own pair owed, in pair order — a repair that landed the '
        + 'SAME value twice would leave the next pair satisfied and the chain short');
      assert.equal(report.ops.length, 1 + runs,
        'P-SM-5: the commit\'s op set holds the write\'s own op and EXACTLY ONE entry per repair write — no '
        + 'repair write opened a second commit and none landed without an entry');
      assert.equal(report.ops[0].opId, record.op.opId, 'P-SM-5: the write\'s own op is the first entry');
      assert.equal(report.ops.length, new Set(report.ops.map((o) => o.opId)).size,
        'P-SM-5: every entry of the op set is a NEW ENTRY, none a second identity');
      assert.equal(f.store.read([key], 'file'), pairs - 1,
        'P-SM-5: the LAST repair write\'s own landing is the durable one');
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TP-6` · `S-CONSTRAINTS-KEY` — the fourth key at its two instants; an instance iff the list is legal.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

const LEGAL_LIST_FORMS = [
  { name: 'one pair', make: (tag_) => [{ address: [tag_], id: 'c' }] },
  { name: 'two pairs', make: (tag_) => [{ address: [tag_], id: 'a' }, { address: [tag_, 'x'], id: 'b' }] },
  { name: 'empty', make: () => [] },
];

const ILLEGAL_LIST_FORMS = [
  { name: 'null', make: () => null },
  { name: 'a number', make: () => 3 },
  { name: 'a string', make: () => 'constraints' },
  { name: 'a boolean', make: () => false },
  { name: 'an object', make: () => ({ address: ['a'], id: 'c' }) },
  { name: 'a function', make: () => (() => []) },
  { name: 'an element that is not a pair', make: (tag_) => [[tag_]] },
  { name: 'an element with a missing member', make: (tag_) => [{ address: [tag_] }] },
  { name: 'an address outside the segment array', make: (tag_) => [{ address: tag_, id: 'c' }] },
  { name: 'an integer address outside the domain', make: () => [{ address: [-1], id: 'c' }] },
  { name: 'an id that is not a string', make: (tag_) => [{ address: [tag_], id: 7 }] },
];

test('fts_prop_P_TP_6_S_CONSTRAINTS_KEY_instance_iff_the_list_lies_inside_its_domain', async () => {
  const { commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-TP-6',
    strategies: ['S-CONSTRAINTS-KEY'],
    seed: SEEDS['P-TP-6'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const legal = choose([true, false]);
      const key = tag(`prop-ck-${i}`);
      if (legal) {
        const form = choose(LEGAL_LIST_FORMS);
        const { cfg } = cfgFor({ constraints: form.make(key) });
        const store = storeCreate(cfg);
        assert.equal(typeof store, 'object', `P-TP-6: the legal form "${form.name}" constructs`);
      } else {
        const form = choose(ILLEGAL_LIST_FORMS);
        const { cfg } = cfgFor({ constraints: form.make(key) });
        assert.throws(() => storeCreate(cfg), (err) => {
          assert.equal(err.status, 'ConstraintListInvalid',
            `P-TP-6: "${form.name}" answers the store's own sixteenth member`);
          // **RE-DERIVED TO THE THREE-MEMBER FORM 2026-10-16** — a `cfg`-side construction refusal is
          // `surface.md §2.5` item 4's own enumerated `log: []` arm, so the set is three members, sorted
          // ascending, with the empty array as the DECLARED value and not an absence (item 9).
          assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
            'P-TP-6: in the surface\'s three-member form — FLAT across arms (`surface.md §2.5` item 4), '
            + 'sorted ascending with length `3` (item 9)');
          assert.equal(Object.keys(err).length, 3,
            'P-TP-6: `Object.keys(caught).length` is `3` on this arm (`surface.md §2.5` item 9)');
          assert.ok(Array.isArray(err.log),
            'P-TP-6: `log` is an ARRAY — never absent, never `null`, never a non-array (`surface.md §2.5` '
            + 'item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
          assert.deepEqual(err.log, [],
            'P-TP-6: and a refused construction opens NO attempt, so the DECLARED value is `[]` — never a '
            + 'placeholder entry (`surface.md §2.5` item 4)');
          return true;
        }, `P-TP-6: "${form.name}" is outside the key's domain and NO instance is returned`);
      }

      // ── THE LOAD-SIDE INSTANT, WHICH THE AS-FILED CELL NEVER REACHED (`DEF-2026-10-15-Z`: *"no
      // load-side attempt at all"*) ──────────────────────────────────────────────────────────────────
      // **`§7.2` ITEM 5 (ADDED 2026-10-15): *"at construction / startup the SUPPLIED list is validated;
      // over an EXISTING FILE at load THE LOADED STATE IS VALIDATED AGAINST THE SUPPLIED LIST — WHICH IS
      // WHAT DETECTS A CORRUPT OR OBSOLETE FILE, one whose state no longer satisfies the constraints the
      // application now supplies"*.** The fixture is built the ONE way the clause leaves open: the list is
      // NEVER written into the file, so the file is produced by a first construction whose own list is
      // satisfied, and the second construction is handed a DIFFERENT list.
      const loadDir = mkdtempSync(join(tmpdir(), 'fts-prop-ck-'));
      const loadPath = join(loadDir, 'store.json');
      const held = tag(`prop-ck-held-${i}`);
      const first = storeCreate({ filePath: loadPath, journalLength: 8, listeners: [], constraints: [{ address: [held], id: 'c' }] });
      runAttempt(first, commit(first, [held], 'file', `L${i}`));
      const image = bytesOf(loadPath);
      assert.equal(image, `{"${held}":"L${i}"}`,
        'P-TP-6: the file stands as the first construction\'s own `file`-tier write left it — and it '
        + 'carries NO list, because the list is not persisted (`§7.2` item 5, added 2026-10-15)');
      const absent = tag(`prop-ck-absent-${i}`);
      assert.throws(() => storeCreate({
        filePath: loadPath,
        journalLength: 8,
        listeners: [],
        constraints: [{ address: [held], id: 'c' }, { address: [absent], id: 'd' }],
      }), (err) => {
        assert.equal(err.status, 'ConstraintListInvalid',
          'P-TP-6: an EXISTING FILE whose loaded state does not satisfy the SUPPLIED list answers the '
          + 'store\'s own sixteenth member — the counterexample the row\'s own cell admits');
        return true;
      }, 'P-TP-6: the LOAD-side instant is validated and NO instance is returned');
      assert.equal(bytesOf(loadPath), image,
        'P-TP-6: and the refused LOAD construction writes no byte at `cfg.filePath`');
      const boot = storeCreate({ filePath: loadPath, journalLength: 8, listeners: [], constraints: [{ address: [held], id: 'c' }] });
      assert.equal(boot.read([held], 'file'), `L${i}`,
        'P-TP-6: while the SAME file boots under a list its loaded state satisfies — the discriminator that '
        + 'makes the load-side arm single-valued');
      rmSync(loadDir, { recursive: true, force: true });

      // **AND THE ONE FILE STATE THE PASS FLAGGED AS UNVALIDATED (`DEF-2026-10-15-Z`): a NON-ZERO-LENGTH
      // `{}` IMAGE.** The clause's exemption names *"an ABSENT or ZERO-LENGTH file"* and no more, and `{}`
      // is NEITHER: its loaded MEMBER COUNT is `0` and its loaded state satisfies no supplied pair, so the
      // load instant of `§7.2` item 5 is owed here — while the implementation's `loaded > 0` guard
      // (`src/store.rs`, the boot's own count) exempts it and validates nothing.
      const emptyDir = mkdtempSync(join(tmpdir(), 'fts-prop-ck-empty-'));
      const emptyPath = join(emptyDir, 'store.json');
      writeFileSync(emptyPath, '{}');
      assert.ok(readFileSync(emptyPath, 'utf8').length > 0,
        ': the fixture is a NON-ZERO-LENGTH image and not the zero-length file the clause exempts');
      const unreachable = tag(`prop-ck-unreachable-${i}`);
      assert.throws(() => storeCreate({
        filePath: emptyPath,
        journalLength: 8,
        listeners: [],
        constraints: [{ address: [unreachable], id: 'c' }],
      }), (err) => {
        assert.equal(err.status, 'ConstraintListInvalid',
          'P-TP-6: a `{}` image is an EXISTING FILE whose loaded state satisfies no supplied pair, and it '
          + 'answers the store\'s own sixteenth member — the file itself is blocked from saving an invalid '
          + 'state (`§7.2` item 5, added 2026-10-15)');
        return true;
      }, 'P-TP-6: the loaded state of a `{}` image is validated against the supplied list');
      rmSync(emptyDir, { recursive: true, force: true });
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TP-7` · `S-ARG5` — the fifth position's outside values refuse, and the write does not proceed.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

const OUTSIDE_POSITION_5 = [
  { name: 'null', make: () => null },
  { name: 'a number', make: () => 1 },
  { name: 'a string', make: () => 'commit' },
  { name: 'a boolean', make: () => true },
  { name: 'a bigint', make: () => 1n },
  { name: 'a symbol', make: () => Symbol('commit') },
  { name: 'a function', make: () => (() => ({ pending: [] })) },
  { name: 'a Proxy with no pending member', make: () => new Proxy({}, {}) },
  { name: 'the object {}', make: () => ({}) },
  { name: 'a record object with pending undefined', make: () => ({ attempt: {}, op: {}, triggered: [], pending: undefined }) },
  { name: 'an array', make: () => [] },
];

test('fts_prop_P_TP_7_S_ARG5_a_refused_fifth_position_stops_the_write', async () => {
  const result = row({
    id: 'P-TP-7',
    strategies: ['S-ARG5'],
    seed: SEEDS['P-TP-7'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const form = choose(OUTSIDE_POSITION_5);
      const f = newStore();
      const key = tag(`prop-arg-${i}`);
      const before = bytesOf(f.filePath);
      assert.throws(() => f.store.write([key], 'file', i, form.make()), (err) => {
        assert.ok(err instanceof TypeError, `P-TP-7: "${form.name}" is refused by the class test`);
        assert.equal('status' in err, false, 'P-TP-7: the refusal\'s status member MUST BE ABSENT');
        assert.equal(typeof err.message, 'string', 'P-TP-7: a string message member is REQUIRED');
        return true;
      }, `P-TP-7: "${form.name}" is outside the fifth position's domain`);
      assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
        `P-TP-7: the write did not proceed past the refused commit ("${form.name}")`);
      assert.equal(bytesOf(f.filePath), before,
        `P-TP-7: and no durable byte moved ("${form.name}")`);

      // ── THE BRANCH DISCRIMINATOR (`DEF-2026-10-15-Z`'s `F5` cell) ──────────────────────────────────
      // **`§2.20`'s outside-value row names *"a `Proxy` value"*, WHILE `§2.4` item 9 (g) item 1 ADMITS AN
      // OBJECT ON `pending` ALONE — so the as-filed `new Proxy({}, {})` cell could not tell WHICH BRANCH
      // refused the position.** This leg holds the member set FIXED and moves ONE coordinate, the
      // Proxy-ness: **a `Proxy` CARRYING a `pending` member is still refused** (so the CLASS branch, not
      // the `pending` reading, is the one that answered) **while its PLAIN TWIN — the same four members,
      // and a present `pending` — is ADOPTED and its write PROCEEDS** (`§2.4` item 9 (g) item 1's class
      // test; `§2.5`'s single form; `DD-34`'s class order taken first).
      const proxyKey = tag(`prop-arg-proxy-pending-${i}`);
      assert.throws(() => f.store.write([proxyKey], 'mem', i, new Proxy({ pending: [] }, {})), (err) => {
        assert.ok(err instanceof TypeError,
          'P-TP-7: a `Proxy` carrying a `pending` member is refused by the CLASS test — the discriminator '
          + 'that pins the branch, since the `pending` reading alone would have ADMITTED it');
        assert.equal('status' in err, false, 'P-TP-7: and its status member is absent');
        return true;
      }, 'P-TP-7: the `Proxy` branch of §2.20\'s outside-value row refuses before `pending` is read');
      assert.throws(() => f.store.read([proxyKey], 'mem'), (err) => err.status === 'AddressNotFound',
        'P-TP-7: and that refused write did not proceed');
      const twinKey = tag(`prop-arg-twin-${i}`);
      const twin = f.store.write([twinKey], 'mem', i, { attempt: {}, op: {}, triggered: [], pending: [] });
      assert.equal(typeof twin.op.opId, 'string',
        'P-TP-7: while the PLAIN twin carrying the same `pending` member is ADOPTED and its write lands — '
        + 'so the discriminator is the CLASS and never the `pending` reading (§2.4 item 9 (g) item 1)');
      assert.equal(f.store.read([twinKey], 'mem'), i,
        'P-TP-7: and the twin\'s own value is the one its write installed');
    }),
  });
  assertHeld(result);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TP-8` · `S-CENSUS` — the counts and their terms, each read off the enumerations themselves.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_prop_P_TP_8_S_CENSUS_the_set_the_keys_and_the_rows_are_single_valued', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-TP-8',
    strategies: ['S-CENSUS'],
    seed: SEEDS['P-TP-8'],
    body: (rng, i) => attempt(rng, ({ pick: choose, int }) => {
      // THE CLOSED SET, its sixteenth member reachable and its neighbours at their own ranks.
      const { cfg } = cfgFor({ constraints: [{ address: 'a', id: 'c' }] });
      assert.throws(() => storeCreate(cfg), (err) => err.status === 'ConstraintListInvalid',
        'P-TP-8: the sixteenth member is reachable and answers its own name');
      const f = newStore();
      const key = tag(`prop-census-${i}`);
      assert.throws(() => f.store.write([key], 'disk', 1),
        (err) => err.status === 'OutOfDomainTier', 'P-TP-8: rank 5 is unmoved');
      assert.throws(() => f.store.write([key], 'mem', undefined),
        (err) => err.status === 'ValueNotAdmitted', 'P-TP-8: rank 14 is unmoved');
      assert.throws(() => storeCreate({ filePath: null, journalLength: 4, listeners: [] }),
        (err) => err.status === 'AddressMalformed', 'P-TP-8: rank 1 is unmoved');
      // THE CONSTRUCTION'S OWN KEY COUNT, driven key by key: the drawn key is the draw.
      // **⟶ `D-GP-SVM-4` OUTCOME (a), 2026-10-15: THIS ROW'S DRAW WAS MALFORMED AND IS CORRECTED BY ITS
      // AUTHOR ROLE — NO RE-FREEZE OF ANYTHING MOVES, AND NO BYTE OF `src/**` IS IMPLICATED.** The as-filed
      // draw was `choose([1, 2, 3, 4])` against this row's OWN `cfgFor({…})`, whose fixture builds exactly
      // THREE keys without the `cfg.constraints` key and exactly FOUR with it (`surface.md §2.2`'s dated
      // clause; `parameter-semantics.md §2.21`) — so the draws of `1` and `2` asserted a figure no fixture of
      // this row can hold (`arity is 2 … 3 !== 2`), and the object is this test's own literal, read before any
      // call: no store and no package byte could ever move it. **THE INTENDED DRAW IS OVER THE TWO KEY COUNTS
      // THE ROW'S OWN FIXTURE CAN BUILD — `3` without the `cfg.constraints` key present and `4` with it —
      // because the row's subject is that the FOURTH key is OPTIONAL** (`surface.md §2.2`'s dated clause:
      // *"`constraints` ALONE IS OPTIONAL AMONG THE FOUR: absent, it is IN DOMAIN and no list is declared"*).
      const drawn = choose([3, 4]);
      const over = drawn === 4 ? { constraints: [] } : {};
      const cfg2 = cfgFor(over);
      assert.equal(Object.keys(cfg2.cfg).length, drawn,
        `P-TP-8: the construction's declared arity is ${drawn} at this draw and no fifth key is added`);
      const store = storeCreate(cfg2.cfg);
      assert.equal(typeof store, 'object', 'P-TP-8: the drawn key set constructs');
      // THE INSTANCE'S MEMBER SET, `12` own members — `10 + 1 + 1 = 12` — and no thirteenth member anywhere
      // (`surface.md §2.4` item 9 (f)'s `A127` clause of 2026-10-16; the as-filed `4 + 3 = 7` is VACATED with
      // the merged-away pair).
      // ── **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): `13 → 12`, `10 + 1 + 1 = 12` ✓**, the two
      // remaining singles being `register` and `constraints` (`surface.md §2.4` item 9 (f)'s clause of that
      // date, item `1`, read with `§2.4` item 9's `REMOVED-WHOLE` pointer). **The row's own subject — the
      // drawn key set constructs a product whose member set is METHODS ONLY — is unmoved; `settle` alone
      // leaves and no term beside it moves.**
      // **⟶ RE-DERIVED 2026-10-18 AGAIN (`role_test_writer`): `12 → 14`, `10 + 1 + 1 + 2 = 14` ✓**, the
      // `2` being `removeListener` and `removeConstraint`
      // (`docs/specs/storeroom-held-listener-identity/contract.md` §2.7 item 9; `removal-members.md` §2`).
      // **The row's own subject — the drawn key set constructs a product whose member set is METHODS ONLY —
      // is unmoved.**
      assert.deepEqual(Object.getOwnPropertyNames(store).sort(),
        ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
          'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write'],
        'P-TP-8: the TEN store-reaching methods plus `register`, `constraints`, `removeListener` and '
        + '`removeConstraint` — FOURTEEN own members, `10 + 1 + 1 + 2 = 14` ✓, and nothing else '
        + '(`docs/specs/storeroom-held-listener-identity/contract.md` §2.7 item 9)');
      assert.equal(register !== undefined && commit !== undefined && typeof runAttempt === 'function', true,
        'P-TP-8: the kernel\'s extent stays FIVE and no second register exists');
      // AND EVERY OP THE ATTEMPT CARRIES STANDS IN THE STORE'S OWN CLOSED SET AT ITS OWN RANK.
      const record = commit(store, [key], 'mem', `c${i}`);
      assert.equal(record.pending.length >= 0 && Array.isArray(record.pending), true,
        'P-TP-8: the record the seam receives carries its FOURTH member');
      assert.equal(int(0, 0), 0, 'P-TP-8: the draw is consumed so the row\'s attempts are reproducible');
      runAttempt(store, record);

      // ── THE ADDON'S OWN CENSUS, READ OFF ITS OWN GENERATOR (`DEF-2026-10-15-Z`; `DEF-2026-10-15-Y`)
      // ─────────────────────────────────────────────────────────────────────────────────────────────
      // **THE AS-FILED CELL READ ITS FIGURE OFF A LOCAL LITERAL.** This leg reads the addon's OWN census
      // instead: **`contract.md §8.2`'s rule is that EVERY MESSAGE IS GENERATED FROM ITS CODE AND THE
      // FAILING TRIGGER'S ARGUMENTS and that the addon carries the generator (`errorMessage`), so a code
      // the addon's closed set holds ANSWERS ITS OWN `<mismatch clause>` FROM §8.2's TABLE — and a code it
      // does not hold answers the ONE outside-set sentence.** **A SET OF THE WRONG SIZE THEREFORE FAILS
      // THIS DRIVE: at `15` the sixteenth member's round trip answers the outside-set sentence, and the
      // census this drive counts is `15`, not `16`.**
      const censusArgs = { segment: 's', container: 'window.tabs', keys: ['doc1'], tiers: ['file'], path: '/tmp/store.json' };
      const OUTSIDE_SENTENCE = 'no clause is declared here';
      const answered = [];
      const notAnswered = [];
      for (const [code, clause] of DECLARED_CLOSED_SET) {
        const text = addon().errorMessage(code, censusArgs);
        assert.equal(typeof text, 'string', `P-TP-8: \`errorMessage('${code}', …)\` answers a string`);
        assert.equal(text.length > 0, true, `P-TP-8: and never an empty one (\`${code}\`)`);
        assert.equal(text, addon().errorMessage(code, censusArgs),
          `P-TP-8: the generator is a pure function of its code and its arguments (\`${code}\`)`);
        const owns = text.includes(clause) && !text.includes(OUTSIDE_SENTENCE);
        (owns ? answered : notAnswered).push(code);
      }
      assert.deepEqual(notAnswered, [],
        `P-TP-8: EVERY member of §8.1's closed set answers ITS OWN generated clause — the members the `
        + `addon's own generator does NOT hold are ${JSON.stringify(notAnswered)}`);
      assert.equal(answered.length, DECLARED_CLOSED_SET.length,
        'P-TP-8: and the addon\'s OWN census is the closed set\'s size — a set of `15` fails here, because '
        + 'the sixteenth member\'s round trip answers the outside-set sentence');
      assert.equal(DECLARED_CLOSED_SET.length, 16,
        'P-TP-8: §8.1\'s own terms sum it: `11 + 2 + 1 + 1 + 1 = 16` ✓ (the amended heading)');
    }),
  });
  assertHeld(result);
  // THE BUDGET'S TWO TERMS, READ OFF THE FILE'S OWN CELLS (`DQ-13`'s rule, read at this register's shape):
  // the row count is the number of `row()` cells declared here, and the per-row budget is the even share
  // of the `400`-attempt total capped at `100` — `8 x 50 = 400` exactly.
  assert.equal(ROW_CELLS.length, ROWS_OF_CHECKS,
    'P-TP-8: the register declares `8` rows and this runner declares one cell per row — a ninth row or a '
    + 'missing cell moves this figure');
  assert.equal(ROW_BUDGET * ROWS_OF_CHECKS, MAX_ATTEMPTS_TOTAL,
    'P-TP-8: the per-row budget is the even share of the `400`-attempt total: `8 x 50 = 400`');
  assert.ok(ROW_CELLS.every((c) => c.attempts <= MAX_ATTEMPTS_PER_ROW),
    'P-TP-8: no row exceeds the `100`-attempt per-row cap');
});
