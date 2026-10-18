// RED SET — `U-STOREROOM-CONSTRAINTS`, THE TYPED PROPERTY LAYER (`contract.md §5.1`–`§5.8`, `8` rows)
//
// EVERY ROW OF THE `§5.x` REGISTER IS EXECUTED HERE AS A PROPERTY TEST, WITH A DETERMINISTIC PINNED
// SEED, AT MOST `100` ATTEMPTS PER ROW AND AT MOST `400` IN TOTAL, AND THE RUN STOPS AFTER `5`
// FAILURES IN ANY ONE ROW. THE GENERATORS ARE BUILT FROM THE CONTRACT'S OWN DECLARED DOMAINS ONLY:
// `PAR-C-1`'s address domain (a JS/JSON array of `string` keys or non-negative integer indices, the
// empty array included), `PAR-C-2`'s id domain (a non-empty string), `PAR-C-5`'s closed three-arm
// constraint-outcome set, `PAR-C-8`'s closed two-arm repair-result set, and the store's own three
// declared tiers. A ROW WHOSE GENERATOR IS NOT DERIVABLE FROM THE SPEC IS NAMED AS SUCH AND NOT
// INVENTED.
//
// ── THE REGISTER, READ FROM `contract.md §5`, ROW FOR ROW — **EACH ROW WITH THE STRATEGY IDS THE
//    ROW ITSELF DECLARES, AND NO OTHERS** (`DQ-13`; the realignment pass of this red set) ───────────
//   §5.1 `P-IM-1` · `S-KEY` · `S-KEY-ADDR` · `S-CHECK` — the registration key's uniqueness domain, and
//        the handle check's side.
//   §5.2 `P-IM-2` · `S-REC` · `S-REC-SURFACE` · `S-REC-DISPOSE` · `S-REC-RETAIN` — the per-attempt
//        record's closure across the store's surface.
//   §5.3 `P-IM-3` · `S-CHAN` · `S-CHAN-CONV` · `S-CHAN-FORM` — the constraint-failure channel never
//        carries a store code.
//   §5.4 `P-SM-4` · `S-ATT-ARM` · `S-ATT-OUT` · `S-ATT-SHAPE` — the transition table is TOTAL and every
//        arm's answer is a declared one.
//   §5.5 `P-SM-5` · `S-SIDE` · `S-WINDOW` · `S-LOG-ORDER` · `S-NO-STORE-ORDER` — the function's side,
//        the evaluation's window, and the log's own order.
//   §5.6 `P-SM-6` · `S-FIRST-REPEAT` · `S-SECOND-VIOLATION` · `S-NO-BUDGET` — an applied repair never
//        runs twice, a second violation fails the attempt, and no budget is invented.
//   §5.7 `P-TP-7` · `S-ROLLBACK-ALL` · `S-ROLLBACK-PER-OP` · `S-ROLLBACK-FLOOR` · `S-ROLLBACK-TARGET` —
//        the attempt is all-or-nothing and the rollback is per op with a named floor and a named stop.
//   §5.8 `P-TP-8` · `S-MARK-ATTEMPT` · `S-MARK-SCOPE` · `S-MARK-NO-HOME` — the applied-repair marker is
//        PER ATTEMPT, never global.
//
// **THE IDS THIS FILE CITED BEFORE THIS PASS AND THE IDS THEIR OWN ROWS DECLARE, NAMED ONE BY ONE
// (`DQ-13` — the cells cited ids that stand in NO row of `contract.md §5`, while ids the rows DO
// declare had no generator):** `S-KEY-ALT` → **`S-KEY-ADDR`** · `S-HANDLE` → **`S-CHECK`** ·
// `S-REC-CLOSE` → **`S-REC`** (the member set) and **`S-REC-DISPOSE`** (the two disposal arms) ·
// `S-ARM-TOTAL` → **`S-ATT-ARM`** · `S-ALL-OR-NOTHING` → **`S-ROLLBACK-ALL`** · `S-STEP-SHAPE` →
// **`S-ROLLBACK-PER-OP`** · `S-MARKER-SCOPE` → **`S-MARK-ATTEMPT`** at the second-attempt cell and
// **`S-MARK-SCOPE`** at the two-instance cell. **`7` CITED IDS REALIGNED ONTO `8` DECLARED ONES**, and
// every declared id of every row now has a generator in the red set or is reported as undrivable.
//
// **AND ONE DECLARED ID IS RE-DERIVED RATHER THAN RE-CITED AT THIS PASS:** `§5.5`'s `S-WINDOW` — "the
// evaluation happens after the write verb returned, on the value the verb returned" — is the subject
// the `P-SM-5` cell that read *"the constraint reads only the value the write landed"* was already
// driving, so that cell cites `S-WINDOW` and not the `§5.4` id it once borrowed.

import test from 'node:test';
import assert from 'node:assert/strict';
// **THE CONTRACT'S OWN BYTES ARE READ BY THE REGISTER'S CLOSURE CELL** (`contract.md §5.1`–`§5.8`; the
// re-derivation of 2026-10-17): the declared strategy ids are EXTRACTED FROM THE DOCUMENT that declares
// them, so the closure cannot close over this file's own literal.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC, KC_TOKENS, STORE_CODES,
  assertKernelForm, assertLogEntry, assertSeqIncreasesFromOne, assertAttemptReport,
  assertRollbackStep, assertAttemptRef, capture, entries, checkIds, repairRunsFor, noop,
  passAtRegistration, recordsAfterRegistration, } from './constraint-kernel-helpers.mjs';

// ── THE DETERMINISTIC PINNED SEEDS ───────────────────────────────────────────────────────────────
//
// ONE SEED PER ROW, PINNED AS A LITERAL. The generator is a `mulberry32` 32-bit LCG: a pure function
// of the seed, with no clock, no `Math.random` and no host entropy, so every run of this file draws
// the same values in the same order.
const SEEDS = {
  'P-IM-1': 0x5EED01,
  'P-IM-2': 0x5EED02,
  'P-IM-3': 0x5EED03,
  'P-SM-4': 0x5EED04,
  'P-SM-5': 0x5EED05,
  'P-SM-6': 0x5EED06,
  'P-TP-7': 0x5EED07,
  'P-TP-8': 0x5EED08,
};

const MAX_FAILURES_PER_ROW = 5;
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;

let totalAttempts = 0;
function attemptsUsed() { return totalAttempts; }

/**
 * THE ROW BUDGET, RE-DERIVED AT THIS PASS SO ITS ARITHMETIC CLOSES OVER THE CELLS THAT EXIST (`DQ-13`).
 *
 * THE FIGURE THE FILE ONCE PRINTED — *"`16` ROWS OF CHECKS … `16 x 25 = 400` EXACTLY"* — HAD NO HOME IN
 * ANY ROW OF `contract.md §5`: the register declares `8` ROWS and the `§5.x` spans mint no "row of
 * checks" figure at all, and the file's own `row()` cells stood at `12`, whose `12 x 25 = 300` is not
 * the `400` the comment claimed. THE TWO TERMS ARE NOW BOTH REAL AND BOTH PRINTED: `ROWS_OF_CHECKS` is
 * THE NUMBER OF `row()` CELLS THIS FILE ACTUALLY DECLARES (`12` register cells carried over from the
 * red set plus the strategy-id generators this pass adds for the ids that had none), and `ROW_BUDGET`
 * is the even share of the `400`-attempt total over them, capped at the per-row `100`. A later cell
 * asserts both terms against the cells that ran, so the pair can neither drift nor be re-stated.
 */
const ROWS_OF_CHECKS = 21;
const ROW_BUDGET = Math.min(MAX_ATTEMPTS_PER_ROW, Math.floor(MAX_ATTEMPTS_TOTAL / ROWS_OF_CHECKS));
/** Every `row()` cell registers itself here, so the budget's first term is read off the file itself. */
const ROW_CELLS = [];

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

/** A seeded attempt counter: every attempt is a fresh store and a fresh address. */
function attempt(rng, run) {
  totalAttempts += 1;
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL,
    `the total attempt budget stands at ${MAX_ATTEMPTS_TOTAL}`);
  const store = makeStore({ journalLength: 64 });
  const key = tag('prop');
  const address = [key];
  return run({ store, address, rng, pick: (l) => pick(rng, l), int: (lo, hi) => intBetween(rng, lo, hi) });
}

/**
 * THE ROW RUNNER: at most `MAX_ATTEMPTS_PER_ROW` attempts, stopping after `MAX_FAILURES_PER_ROW`
 * failures — and reporting the row id, its strategy ids, its seed and the attempts it ran.
 */
function row({ id, strategies, seed, attempts, body }) {
  ROW_CELLS.push({ id, strategies, attempts });
  const rng = rngFor(seed);
  const failures = [];
  let ran = 0;
  for (let i = 0; i < attempts && failures.length < MAX_FAILURES_PER_ROW; i += 1) {
    ran += 1;
    try {
      body(rng, i);
    } catch (err) {
      failures.push({ attempt: i, message: err && err.message ? err.message : String(err) });
    }
  }
  return { id, strategies, seed, attempts: ran, failures };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.1  `P-IM-1` — THE REGISTRATION KEY'S UNIQUENESS DOMAIN, AND THE HANDLE CHECK'S SIDE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_IM_1_the_pair_key_is_unique_and_the_handle_check_is_the_store_s', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-1',
    strategies: ['S-KEY', 'S-KEY-ADDR'],
    seed: SEEDS['P-IM-1'],
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address, int: n }) => {
      const ids = i % 3 === 0 ? ['x'] : ['x', 'y', 'z'].slice(0, n(1, 3));
      const invoked = [];
      for (const id of ids) {
        // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS EACH BODY ONCE, so a recorder
        // whose subject is the ORDER THE PASS INVOKED THE PAIRS IN (`§5.1`'s uniqueness and order clauses)
        // must not carry the registration's own entry. `recordsAfterRegistration` answers the registration
        // `true` and lets every LANDING's context reach this recorder unchanged.
        register(store, address, id, recordsAfterRegistration(() => { invoked.push(`${id}:first`); return true; }));
      }
      // ── `P-NEG-11` · THE DUPLICATE PAIR KEY ITS OWN ROW NAMES, DRIVEN AND NEVER ASSUMED AWAY (`§5.1`:
      // "a registration at an address AND id the registry already holds is IDEMPOTENT — it adds no
      // second entry and replaces the FIRST registration's function with the new one"). THE OLD
      // GENERATOR ASSERTED `ids.length === new Set(ids).size` — "the generator itself never repeats a
      // pair key" — WHICH IS AN EXCLUSION FROM ITS OWN SUBJECT AND NOT AN OBSERVATION OF IT: the
      // idempotence arm names the duplicate pair, so the drive must produce one.
      const replaced = ids[n(0, ids.length - 1)];
      const duplicated = i % 3 === 0;
      if (duplicated) {
        register(store, address, replaced, recordsAfterRegistration(() => { invoked.push(`${replaced}:second`); return true; }));
      }
      const report = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.deepEqual(checkIds(report.log), ids,
        'ONE constraint-check entry per ROW, in the registry\'s own first-registration order — the pair '
        + 'key is UNIQUE over (address, id), and a re-registration at a pair already held adds NO second '
        + 'entry and does NOT move the one it replaces');
      assert.deepEqual(invoked, ids.map((id) => `${id}:${duplicated && id === replaced ? 'second' : 'first'}`),
        'and the pass INVOKED THE NEW FUNCTION AT THE REPLACED PAIR\'S OWN ORIGINAL POSITION — read '
        + `(${JSON.stringify(invoked)}); ` + '`contract.md §5.1`, `kernel-surface.md §2.1` item 1');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-1 (${result.strategies.join(', ')}, seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

test('ck_prop_P_IM_1_a_malformed_address_is_refused_caller_side_and_a_store_refusal_stays_the_store_s', async () => {
  const { register } = await kernel();
  const result = row({
    id: 'P-IM-1',
    strategies: ['S-CHECK'],
    seed: SEEDS['P-IM-1'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address, int: n }) => {
      if (i % 2 === 0) {
        // THE CALLER'S OWN SHAPE TEST: an address outside the domain is the kernel's `KC-1`
        const bad = [{ 0: 'a' }, 'a', n(0, 1) === 0 ? null : undefined, [null], [-1]][n(0, 4)];
        const r = capture(() => register(store, bad, 'x', () => true));
        assert.equal(r.threw, true, 'an address outside the shape domain is refused');
        assert.equal(r.thrown.status, 'KC-1', 'KC-1 on the kernel\'s own channel');
        return;
      }
      // THE STORE'S OWN CHECK IS THE STORE'S: an in-domain address the store refuses carries the
      // store's own code in the store's own form, UNCONVERTED
      const r = capture(() => (store.register(store.listen(address), () => {}) || store.listen(address)));
      if (r.threw) {
        assert.equal(KC_TOKENS.includes(r.thrown.status), false,
          'a store refusal on the store\'s channel is never a kernel state');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-1 alt (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `P-NEG-7` · `P-IM-1` · `S-KEY` — THE PAIR KEY'S OWN UNIQUENESS, DRIVEN WHERE THE DECLARED SPELLING
 * MAKES TWO DISTINCT PAIRS SPELL ALIKE. `attempt-lifecycle.md §2.4` item 2 declares the spelling at its
 * bytes — the address's segments joined with `/`, then `#`, then the id — and `contract.md §5.1`'s
 * `S-KEY` line declares what the key must BE: "the pair key is unique over (address, id)". TWO FAMILIES
 * OF DISTINCT PAIRS ARE SPELLED ALIKE BY THAT JOIN, BOTH IN-DOMAIN:
 *   (F1) a `/` inside a segment against two segments — `[r, 'a', 'b']#x` and `[r, 'a/b']#x` are both
 *        `r/a/b#x`;
 *   (F2) a `#` inside a segment against a `#` inside the id — `[r, 'a#b']#c` and `[r, 'a']#b#c` are both
 *        `r/a#b#c`.
 *
 * STATES ENUMERATED FIRST, ONE DRIVE PER FAMILY: (1) TWO DISTINCT pairs registered, each with its OWN
 * function and its own address; (2) a pass at the FIRST address invokes THE FIRST PAIR'S OWN FUNCTION;
 * (3) a pass at the SECOND address invokes THE SECOND PAIR'S OWN FUNCTION. FAIL STATES: a registration
 * at one pair that DISPLACES the other (the second pair's function invoked at the first address, or the
 * first pair's function invoked at the second); a registry that holds ONE entry for two pairs.
 *
 * REPORTED TO THE SPEC WRITER AND NOT RESOLVED HERE: the declared SPELLING on disk is not injective
 * over (address, id) for these two families, so `S-KEY`'s uniqueness clause cannot hold as written while
 * that spelling stands. This cell asserts the CLAUSE (two pairs stand, each addressed by its own
 * function) and not the spelling: making it pass means escaping the separator inside segments and ids,
 * or keying by the tuple — a spec-side decision, reported rather than assumed (no rule is weakened
 * here, and no clause of the contract is read against another).
 */
test('ck_prop_P_IM_1_two_distinct_pairs_that_spell_alike_each_answer_their_own_address', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 32 });
  const root = tag('pk');
  // THE STORE'S OWN TREE OWES EVERY NODE ALONG AN ADDRESS (`'a' does not exist in 'pk-…', it holds no
  // keys`), and registration walks the same path — so the caller lays the four nodes down FIRST, with
  // NO pair registered yet: each pre-write is an ordinary caller-made write and reaches no pass.
  for (const node of [[root], [root, 'a'], [root, 'a', 'b'], [root, 'a/b'], [root, 'a#b']]) {
    store.write(node, 'mem', {});
  }
  const families = [
    { first: [root, 'a', 'b'], firstId: 'x', second: [root, 'a/b'], secondId: 'x', why: 'F1: a `/` inside a segment against two segments — both pairs spell `' + root + '/a/b#x`' },
    { first: [root, 'a#b'], firstId: 'c', second: [root, 'a'], secondId: 'b#c', why: 'F2: a `#` inside a segment against a `#` inside the id — both pairs spell `' + root + '/a#b#c`' },
  ];
  const observed = [];
  for (const family of families) {
    const ran = [];
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS EACH BODY ONCE, and this cell's
    // subject is WHICH PAIR'S OWN FUNCTION ANSWERS AT WHICH ADDRESS — so the registration's own run must not
    // stand in `ran`. `recordsAfterRegistration` answers the registration `true` and passes every LANDING's
    // context to the recorder, so `atFirst`/`atSecond` read exactly the writes the cell drives.
    register(store, family.first, family.firstId, recordsAfterRegistration(((name) => () => { ran.push(name); return true; })('first')));
    register(store, family.second, family.secondId, recordsAfterRegistration(((name) => () => { ran.push(name); return true; })('second')));
    const firstReport = runAttempt(store, commit(store, family.first, 'mem', 1));
    const atFirst = ran.slice();
    ran.length = 0;
    const secondReport = runAttempt(store, commit(store, family.second, 'mem', 2));
    observed.push({ family, atFirst, atSecond: ran.slice(), firstOutcome: firstReport.outcome, secondOutcome: secondReport.outcome });
  }
  for (const o of observed) {
    // EVERY FAMILY'S OBSERVATION IS PRINTED WITH EVERY FAILURE, so one red cell reports the whole
    // collision: family -> [what ran at the first address]/[what ran at the second].
    const census = observed.map((x) => `${x.family.why.slice(0, 2)}[${JSON.stringify(x.atFirst)}|${JSON.stringify(x.atSecond)}]`).join(' ');
    assert.equal(o.firstOutcome, 'passed',
      `${o.family.why}: the pass at the FIRST address resolves`);
    assert.deepEqual(o.atFirst, ['first'],
      `${o.family.why}: THE FIRST PAIR ANSWERS ITS OWN ADDRESS WITH ITS OWN FUNCTION — a registration at `
      + 'a DISTINCT (address, id) must not displace it, because the pair key "is unique over (address, '
      + `id)" (\`contract.md §5.1\`, \`S-KEY\`); every function invoked at that address is `
      + `${JSON.stringify(o.atFirst)} (and the second address invoked ${JSON.stringify(o.atSecond)}). `
      + `THE WHOLE CENSUS: ${census}`);
    assert.equal(o.secondOutcome, 'passed',
      `${o.family.why}: and the pass at the SECOND address resolves`);
    assert.deepEqual(o.atSecond, ['second'],
      `${o.family.why}: with THE SECOND PAIR'S OWN FUNCTION — read ${JSON.stringify(o.atSecond)}`);
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.2  `P-IM-2` — THE PER-ATTEMPT RECORD'S CLOSURE, AND ITS NON-CROSSING OF THE STORE'S SURFACE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_IM_2_no_attempt_record_member_crosses_the_store_s_surface', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  const result = row({
    id: 'P-IM-2',
    strategies: ['S-REC-SURFACE', 'S-REC'],
    seed: SEEDS['P-IM-2'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n, pick: p }) => {
      const arm = p(['pass', 'violate', 'repair-ok', 'repair-fail']);
      // ⟶ `A135` (3) / `§7.3` (b) state 1: SHIELDED, because three of this row's four arms violate at the
      // registration and would be REFUSED there (`ConstraintListInvalid`) with the arm's own attempt never
      // opened. The shield's answer is the registration's; every LANDING's context reaches this body unchanged.
      register(store, address, 'x', passAtRegistration(() => {
        if (arm === 'pass') return true;
        if (arm === 'violate') return { message: 'the caller\'s own string' };
        if (arm === 'repair-ok') return { repair: () => { const landed = store.write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'the repair landed a lawful value', op: landed }; }, message: 'repairable' };
        return { repair: () => ({ ok: false, message: 'what was attempted' }), message: 'unrepairable' };
      }));
      const record = commit(store, address, 'mem', n(0, 9));
      assert.deepEqual(Object.keys(record).sort(), ['attempt', 'op', 'pending', 'triggered'],
        'the commit record carries exactly the four declared members and never a store write result');
      const r = capture(() => runAttempt(store, record));
      const closed = r.threw ? log(store, record.attempt) : r.value.log;
      assert.ok(Array.isArray(closed) || closed === undefined, 'the closed record is reachable from K-4');
      if (r.threw) {
        assertKernelForm(r.thrown, 'P-IM-2 failure');
        assertAttemptRef(record.attempt, 'the attempt reference');
      } else {
        assertAttemptReport(r.value, 'P-IM-2 pass');
        assert.deepEqual(report(store, record.attempt), r.value, 'K-5 reaches the same closed record');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-2 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

test('ck_prop_P_IM_2_an_op_the_attempt_created_and_no_op_it_did_not', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-2',
    strategies: ['S-REC-SURFACE'],
    seed: SEEDS['P-IM-2'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address, int: n }) => {
      // ONE PAIR PER REPAIR, EACH REPAIRED ONCE — the only shape a repair can take: `§2`'s `KC-5` row
      // makes a SECOND violation of a pair whose repair is already recorded as applied an arm of its
      // own, so an attempt that wants `k` repairs holds `k` pairs, and each pair's own repair runs on
      // ITS first evaluation and never again (`attempt-lifecycle.md §2.4` item 4's arms `(b)` and `(e)`).
      const repairs = i % 3;
      if (repairs === 0) {
        register(store, address, 'p0', () => true); // passes every context, the registration's included
      }
      for (let k = 0; k < repairs; k += 1) {
        let seen = 0;
        // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` makes it mandatory: unshielded the registration
        // ATTEMPTS this pair's repair and spends `seen === 1` there, so the row's own "one repair per pair"
        // shape is never produced by the attempt the row drives.
        register(store, address, `p${k}`, passAtRegistration(() => {
          seen += 1;
          if (seen === 1) {
            return { repair: () => { const landed = store.write(address, 'mem', n(0, 99)).op; return { ok: true, message: `p${k} was repaired`, op: landed }; },
              message: `p${k} is repairable` };
          }
          return true;
        }));
      }
      const record = commit(store, address, 'mem', n(0, 99));
      const report = runAttempt(store, record);
      assert.equal(report.ops.length, 1 + repairs, 'ops is exactly the ops THIS attempt created');
      assert.equal(report.ops[0].opId, record.op.opId, 'its first entry is the attempt\'s own first write');
      assert.equal(entries(report.log, 'repair-run').length, repairs,
        'and one repair-run entry per pair whose own repair ran: no pair ever runs its repair twice');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-2 second surface (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.3  `P-IM-3` — THE CONSTRAINT-FAILURE CHANNEL NEVER CARRIES A STORE CODE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_IM_3_no_drive_of_this_unit_produces_a_store_member_as_a_constraint_failure_s_status', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-3',
    strategies: ['S-CHAN', 'S-CHAN-FORM', 'S-CHAN-CONV'],
    seed: SEEDS['P-IM-3'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, pick: p, int: n }) => {
      const arm = p(['violate', 'outside', 'repair-fail', 'repair-throw', 'constraint-throw']);
      const thrown = new Error('the caller body\'s own throwable');
      // ⟶ `A135` (3) / `§7.3` (b) state 1: EVERY arm of this row violates or throws at the registration, so
      // without the shield each is refused THERE and the attempt the row drives is never opened. The shield
      // answers the registration `true`; every LANDING's context reaches this body, arms and throws intact.
      register(store, address, 'x', passAtRegistration(() => {
        if (arm === 'violate') return { message: 'the caller\'s own violation string' };
        if (arm === 'outside') return n(0, 1) === 0 ? undefined : n(0, 5);
        if (arm === 'repair-fail') return { repair: () => ({ ok: false, message: 'attempted' }), message: 'v' };
        if (arm === 'repair-throw') return { repair: () => { throw thrown; }, message: 'v' };
        throw thrown;
      }));
      const r = capture(() => runAttempt(store, commit(store, address, 'mem', n(0, 9))));
      assert.equal(r.threw, true, 'every arm of this state fails the attempt');
      if (arm === 'repair-throw' || arm === 'constraint-throw') {
        assert.equal(r.thrown, thrown,
          'a body\'s own throwable reaches the caller UNCONVERTED, so no store member stands as a status');
        return;
      }
      assertKernelForm(r.thrown, 'P-IM-3');
      // THE STATE'S OWN HOME DECLARES THE TOKEN IN TWO SPELLINGS AND ONE OF THEM IS THE KERNEL'S: the
      // `KC-n` token and the member name the `§2` table prints beside it — `ConstraintViolated`,
      // `ConstraintRepairFailed`, `ConstraintRepeat`, … (`fail-surface.md §2`'s table; `§1.1` item 1
      // closes the member set at ONE of `KC-1`…`KC-8` "by their one member name each"). The
      // `assertKernelForm` call above already reads the status against the kernel's own closed set;
      // NEITHER spelling is a store member, and the two spellings are the ONE token.
      assert.ok(KC_TOKENS.includes(r.thrown.status) || Object.values(KC).includes(r.thrown.status),
        `the status is one of the kernel's own eight tokens in one of its two declared spellings (read ${r.thrown.status})`);
      assert.equal(STORE_CODES.includes(r.thrown.status), false,
        `and NEVER a member of the store's closed ${STORE_CODES.length} — the figure is READ OFF the list `
        + 'and never printed by hand (`contract.md §8.1`\'s amended heading, 16 members; 2026-10-15, '
        + '`DEF-2026-10-15-Y`)');
      const checks = entries(r.thrown.log, 'constraint-check');
      for (const e of checks) {
        assert.equal(STORE_CODES.includes(e.message), false,
          'no store generated string stands as a constraint failure\'s message');
        assert.ok(e.message.length > 0, 'and no message is empty or a placeholder');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-3 (${result.strategies.join(', ')}, seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.4  `P-SM-4` — THE ATTEMPT'S TRANSITION TABLE IS TOTAL, AND EVERY ARM'S ANSWER IS DECLARED
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_SM_4_every_attempt_reaches_exactly_one_declared_terminal_answer', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const result = row({
    id: 'P-SM-4',
    strategies: ['S-ATT-ARM', 'S-ATT-SHAPE'],
    seed: SEEDS['P-SM-4'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, pick: p, int: n }) => {
      const arms = [];
      for (let k = 0; k < n(0, 2); k += 1) arms.push(p(['pass', 'violate', 'repair', 'outside']));
      for (const [k, arm] of arms.entries()) {
        // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: three of this row's four arms violate at the
        // registration (and the `repair` arm would be ATTEMPTED there under state `3-bis`), so each is
        // shielded and the arm the ROW drives is the one its own `runAttempt` reaches.
        register(store, address, `c${k}`, passAtRegistration(() => {
          if (arm === 'pass') return true;
          if (arm === 'violate') return { message: 'violation' };
          if (arm === 'repair') return { repair: () => { const landed = store.write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'the repair landed a lawful value', op: landed }; }, message: 'repairable' };
          return undefined;
        }));
      }
      const record = commit(store, address, 'mem', n(0, 9));
      const r = capture(() => runAttempt(store, record));
      if (r.threw) {
        assertKernelForm(r.thrown, 'S-ATT-ARM failure');
        const out = entries(r.thrown.log, 'outcome');
        assert.equal(out.length, 1, 'exactly ONE outcome entry — an attempt has one and the closure writes it once');
        assert.equal(out[0].state, r.thrown.status,
          'the log\'s outcome token is the SAME token the thrown form\'s status carries');
        assertSeqIncreasesFromOne(r.thrown.log, 'S-ATT-SHAPE log');
      } else {
        assertAttemptReport(r.value, 'S-ATT-SHAPE pass');
        assert.equal(r.value.outcome, 'passed', 'the success arm answers with the declared resolved outcome');
        assert.equal(entries(r.value.log, 'outcome').length, 0,
          'a successful attempt appends no outcome entry and reaches the success arm from nowhere else');
        assert.deepEqual(report(store, record.attempt).outcome, r.value.outcome,
          'the closed record answers the same terminal arm');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-4 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.5  `P-SM-5` — THE FUNCTION'S SIDE, THE EVALUATION'S WINDOW, AND THE LOG'S OWN ORDER
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_SM_5_the_log_s_own_order_and_the_registry_s_first_registration_order', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-5',
    strategies: ['S-LOG-ORDER', 'S-NO-STORE-ORDER'],
    seed: SEEDS['P-SM-5'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      const ids = ['p', 'q', 'r'].slice(0, n(1, 3));
      for (const id of ids) register(store, address, id, () => true);
      const report = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.deepEqual(checkIds(report.log), ids,
        'the constraint-check entries stand in the registry\'s OWN first-registration order');
      assertSeqIncreasesFromOne(report.log, 'S-LOG-ORDER');
      for (const e of report.log) assertLogEntry(e, 'S-LOG-ORDER entry');
      assert.equal(entries(report.log, 'commit').length, 1, 'one commit entry, last');
      assert.equal(report.log[report.log.length - 1].kind, 'commit', 'and it is the log\'s final entry on this arm');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-5 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

test('ck_prop_P_SM_5_the_constraint_reads_only_the_value_the_write_landed', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-5',
    strategies: ['S-WINDOW'],
    seed: SEEDS['P-SM-5'] ^ 0xC2B2AE35,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      const value = n(0, 999);
      const seen = [];
      // ⟶ `A135` (3) / `§7.3` (b) state 1: this row's subject is THE WINDOW — *"the evaluation happens after
      // the write verb returned, on the value the verb returned"* (`§5.5`'s `S-WINDOW`) — so the list it reads
      // must hold the LANDING's value alone. The registration's own context carries `value` READ AND NOT
      // LANDED (`kernel-surface.md §2.3` item 1's registration clause (3)) and is excluded by its own mark;
      // the body's answer is `true` at both instants, so the registration stands (state 1).
      register(store, address, 'x', recordsAfterRegistration((ctx) => { seen.push(ctx.value); return true; }));
      const record = commit(store, address, 'mem', value);
      const report = runAttempt(store, record);
      assert.deepEqual(seen, [value], 'the constraint saw the value the write landed, VERBATIM');
      assert.deepEqual(record.op.after, { present: true, value },
        'and the store\'s own op record carries the same value');
      assert.equal(report.ops[0].opId, record.op.opId, 'the attempt\'s one op is that write');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-5 window (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.6  `P-SM-6` — THE FIRST-REPEAT RULE: AN APPLIED REPAIR NEVER RUNS TWICE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * RE-DERIVED AT THE RED-SET RE-DERIVATION PASS, READING `kernel-surface.md §2.5` ITEM 3 LIMBS (i)/(ii)
 * AND `fail-surface.md §2`'s `KC-5` ROW AT THEIR BYTES.
 *
 * WHAT THE OLD DRIVER GOT WRONG: its comment claimed `c1` stood in `appliedRepairs`, but `c1`'s body
 * returned `true` on the committed value, registered NO repair, and never took arm (b) — so
 * `appliedRepairs` could not hold it and the arm the driver reached was `KC-6`, exactly as
 * `e2e-scenarios.md`'s `E2E-C-5` window (α) prints for that shape ("`a#c1` is IN `ran` … and is NOT IN
 * `appliedRepairs` … so the attempt reaches arm `(f)`"). The cell cannot pass by relaxing the rule:
 * reading 5 fixes the arms as `KC-5` iff in `ran` AND in `appliedRepairs`, `KC-6` iff in `ran` AND OUT
 * of `appliedRepairs`, "THOSE TWO AND NOTHING ELSE EXHAUSTING THE REPEAT".
 *
 * ▸ REPORTED FINDING, WITH THE TWO READINGS, AND WHY THIS CELL DRIVES THE WINDOW IT DRIVES:
 * `kernel-surface.md §2.5` item 3's head promises "the two limbs, **each drivable**". The multi-pair
 * window `E2E-C-5` (γ) prints — a pair whose repair has landed, broken again by ANOTHER pair's repair
 * in a LATER pass — is NOT reachable from the declared surface: the kernel leaves the evaluating loop
 * the moment an arm-(b) repair lands and re-enters it at the repair's own op, so a pair whose repair
 * has landed is ALWAYS re-evaluated at that repair's own op BEFORE any other pair's repair can land,
 * and it therefore repeats at the FIRST re-run or not at all. The ONE window in which a pair stands in
 * `ran` AND in `appliedRepairs` at a repeat is the pair's own arm-(b) repair followed by its own repeat
 * at that repair's landing — the window driven below, and the same window `states.test.mjs`'s arm-(e)
 * cell drives. The clause's own predicate is what this cell asserts; the sentence "each drivable" is
 * what does not hold of (γ), and that is REPORTED and not bent.
 */
test('ck_prop_P_SM_6_an_applied_repair_never_runs_twice_within_one_attempt', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-6',
    strategies: ['S-FIRST-REPEAT'],
    seed: SEEDS['P-SM-6'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      // ARM (e), THE WINDOW IN WHICH BOTH PREDICATES HOLD BEFORE THE REPEAT: the pair's own body takes
      // arm (b) on the committed value — its repair is invoked, its edit lands an op, and the pair is
      // appended to `appliedRepairs` — and the pair then violates again AT THAT LANDING, so `ran`
      // membership (it entered on the committed value) AND `appliedRepairs` membership (its repair is
      // the repair recorded as applied) both hold and the repeat is limb (i)'s.
      //
      // THE SECOND REPAIR IS REGISTERED AND MUST NEVER RUN: reading 5's own words — "NO repair function
      // is invoked a second time" — so `c1`'s repair-run count stays EXACTLY 1 and the counter behind
      // the SECOND repair body stays 0. `c2` is a pass-through pair; the count that separates the two
      // limbs is the pair's own VIOLATION count and never an entry count.
      let c1 = 0;
      let secondRepairRuns = 0;
      // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes the shield mandatory: unshielded, the
      // registration ATTEMPTS c1's repair and spends `c1 === 1` there, so the arm-(e) window this row reads
      // is never reached by the attempt the row drives.
      register(store, address, 'c1', passAtRegistration(() => {
        c1 += 1;
        if (c1 === 1) {
          return { repair: () => {
            const landed = store.write(address, 'mem', n(0, 999)).op;
            return { ok: true, message: 'c1 was repaired by the op this repair landed', op: landed };
          }, message: 'c1 is invalid on the committed value' };
        }
        // THE REPEAT: this body runs a second time at the op its OWN repair landed, and it REGISTERS a
        // repair — which the limb's own words forbid the attempt to invoke.
        return { repair: () => {
          secondRepairRuns += 1;
          const landed = store.write(address, 'mem', n(0, 999)).op;
          return { ok: true, message: 'c1 was repaired again by the op this repair landed', op: landed };
        }, message: 'c1 is invalid again at its own repair\'s landing' };
      }));
      register(store, address, 'c2', () => true); // passes every context, the registration's included
      const r = capture(() => runAttempt(store, commit(store, address, 'mem', n(0, 999))));
      assert.equal(r.threw, true, 'the re-run repeats c1 and fails the attempt');
      assert.equal(c1, 2,
        'c1 was evaluated once per pass — the committed value and the repeat — and never a third time');
      // THE ONE DISCRIMINATOR, READ AT THE ARM ENUMERATION'S OWN HOME (`kernel-surface.md §2.5` item 3;
      // `fail-surface.md §2`'s `KC-5` row): "an evaluation violates a pair that (i) had ALREADY RUN in
      // this attempt — `ran` membership BEFORE this evaluation — and (ii) IS IN `appliedRepairs` before
      // it"; and "a pair in `ran` whose registered repair has NOT run is `KC-6`'s state and never this
      // one". c1 IS in `ran` and IS in `appliedRepairs`, so the limb is `KC-5`'s.
      assert.equal(r.thrown.status, KC[5],
        'the pair repeated AND its own repair had already been recorded as applied — limb (i), `KC-5`');
      assert.equal(entries(r.thrown.log, 'outcome')[0].state, KC[5],
        'and the outcome entry carries the SAME token by identity (`fail-surface.md §1.1` item 1 (c))');
      assert.equal(entries(r.thrown.log, 'repair-run').filter((e) => e.id === 'c1').length, 1,
        'NO REPAIR EVER RUNS TWICE IN ONE ATTEMPT: c1\'s own count is exactly 1 and NEVER 2');
      assert.equal(secondRepairRuns, 0,
        'and the repair the REPEAT registered was never invoked — the invocation\'s absence is carried '
        + 'by that count and by nothing else');
      assert.equal(entries(r.thrown.log, 'constraint-check').filter((e) => e.id === 'c1').length, 2,
        'the counting key is the pair and not the bare id: c1\'s own entry count is exactly 2, never 3');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-6 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

test('ck_prop_P_SM_6_the_two_repeat_limbs_are_distinguishable_by_the_pair_s_own_state', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-6',
    strategies: ['S-FIRST-REPEAT', 'S-SECOND-VIOLATION'],
    seed: SEEDS['P-SM-6'] ^ 0x27D4EB2F,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      // ═══ RE-DERIVED AT THE CONTRADICTION-REPAIR PASS, READING `attempt-lifecycle.md §2.4` ITEM 4's
      // OWN CLOSING CLAUSE AT ITS BYTES, TOGETHER WITH `kernel-surface.md §2.5` ITEM 3 LIMB (ii).
      //
      // THE OLD DRIVER'S FAULT: `() => ({})` — the OUTSIDE form `parameter-semantics.md §2.7` reads as
      // the `{message}` arm with an EMPTY repair — made the pair's FIRST evaluation a violation with no
      // repair registered for its pair, so the transition was taken at `(c)` (`KC-3`) and the pair never
      // reached limb (ii) at all. The clause: *"a pair's first violation with no repair registered fails
      // it at `(c)` … so a pair reaches `(e)` or `(f)` only by having run at least once before"*.
      //
      // SO THE PAIR RUNS BEFORE IT REPEATS, AND THE STATE THE LIMB IS READ OFF IS THE PAIR'S OWN: this
      // pair PASSES on the committed value — appended to `ran` (`§2.4` item 1: "added at that pair's
      // FIRST evaluation") and never to `appliedRepairs`, which is the pairs "WHOSE REPAIR HAS RUN and
      // produced an op" — and then VIOLATES with no repair registered at the op the OTHER pair's landed
      // repair drives the re-run onto. IN `ran` AND OUT of `appliedRepairs` IS limb (ii): `KC-6`.
      const seen = [];
      // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND THE SHIELD IS WHAT MAKES THE ROW'S PREMISE HOLD: *"a pair
      // reaches `(e)` or `(f)` only by having run at least once before"*, and unshielded the registration's own
      // evaluation is that "once", so `seen.length === 1` is spent there and the LANDING's first evaluation
      // violates instead of passing — the limb is never reached. Both pairs are shielded; the order this row
      // asserts (x passes, y's repair lands, x repeats with no applied repair) is exactly as filed.
      register(store, address, 'x', passAtRegistration(() => {
        seen.push('evaluated');
        return seen.length === 1
          ? true // the FIRST evaluation PASSES: this is what makes the repeat reachable at all
          : { message: 'x violates at the re-run and registers no repair' };
      }));
      register(store, address, 'y', passAtRegistration(() => ({ repair: () => { const landed = store.write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'y was repaired at the same address', op: landed }; }, message: 'y is invalid' })));
      const r = capture(() => runAttempt(store, commit(store, address, 'mem', n(0, 9))));
      assert.equal(r.threw, true, 'the re-run repeats x and fails the attempt');
      // THE SAME ONE DISCRIMINATOR, READ AT THE ARM ENUMERATION'S OWN HOME (`fail-surface.md §2`'s
      // `KC-6` row): "an evaluation violates a pair that (i) had ALREADY RUN in this attempt — `ran`
      // membership BEFORE this evaluation — and (ii) is NOT IN `appliedRepairs` at that moment — NO
      // repair is registered for it, or a registered repair has not run". `x` RAN BEFORE and, taking the
      // pass arm there, is in `ran`; no repair is registered for its pair, so it is absent from
      // `appliedRepairs`: the `(f)` limb, whose `observable` is the pair's own `constraint-check` count
      // of `2` and never `3` (`composition-and-states.md §2.7`'s fail-state list; `fail-surface.md §2`'s
      // `KC-6` row).
      assert.equal(r.thrown.status, 'KC-6',
        'a pair in ran whose repair is NOT recorded as applied reaches KC-6');
      assert.equal(entries(r.thrown.log, 'constraint-check').filter((e) => e.id === 'x').length, 2,
        'and the pair\'s OWN check count is 2 and never 3 — the limb\'s own printed observation');
      assert.equal(entries(r.thrown.log, 'outcome').length, 1,
        'the terminal record carries ONE outcome entry');
      assert.equal(entries(r.thrown.log, 'outcome')[0].state, 'KC-6',
        'the outcome entry carries the same token the form\'s status does (§1.1 item 3)');
      assert.equal(entries(r.thrown.log, 'repair-run').filter((e) => e.id === 'x').length, 0,
        'and its own repair-run count is 0, which is the limb\'s own observation');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-6 limbs (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.7  `P-TP-7` — THE WHOLE ATTEMPT IS ALL-OR-NOTHING, AND THE ROLLBACK IS PER OP WITH A NAMED FLOOR
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_TP_7_a_failed_attempt_ran_one_call_per_op_and_a_passed_one_rolled_nothing_back', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const result = row({
    id: 'P-TP-7',
    strategies: ['S-ROLLBACK-ALL', 'S-ROLLBACK-PER-OP'],
    seed: SEEDS['P-TP-7'],
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address, int: n }) => {
      const repaired = i % 2 === 0 ? n(0, 2) : 0;
      let evaluation = 0;
      // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: unshielded, the registration consumes `evaluation === 1`
      // — and on the `repaired === 0` arms it takes the `{message}` arm there and the pair is REFUSED at the
      // registration. The shield answers the registration `true`; the row's own evaluation budget (`repaired`)
      // is spent by the LANDING's evaluations alone, which is what the row's clause reads.
      register(store, address, 'x', passAtRegistration(() => {
        evaluation += 1;
        if (evaluation > repaired) return { message: 'x has no repair left' };
        return { repair: () => { const landed = store.write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'the repair landed a lawful value at the attempt\'s address', op: landed }; }, message: 'repairable' };
      }));
      const record = commit(store, address, 'mem', n(0, 9));
      const r = capture(() => runAttempt(store, record));
      if (!r.threw) {
        assert.deepEqual(r.value.rollback, [],
          'a passed attempt rolls NOTHING back — the whole attempt is all-or-nothing');
        return;
      }
      assertKernelForm(r.thrown, 'P-TP-7 failure');
      const closed = report(store, record.attempt);
      assert.ok(closed.rollback.length >= 1, 'a failed attempt ran at least one per-op call');
      for (const step of closed.rollback) assertRollbackStep(step, 'S-ROLLBACK-PER-OP step');
      // ── THE CLAUSE'S OWN OBSERVABLES, IN PLACE OF THE TWO CHECKS THAT COULD NOT FAIL (`DR-11`) ───
      // (i) `new Set(rollback.map(s => s.opId)).size === rollback.length` compared two products of ONE
      // implementation and no implementation could fail it. What the row fixes is WHICH OP each entry
      // was INVOKED FOR, so the entry's `opId` is read against the attempt's own `ops` — the candidate
      // set the call list is EXACTLY: "ONE CALL PER STILL-OWED OP", the step's `opId` being "the opId the
      // kernel PASSED to that call, echoed" (`composition-and-states.md §2.6` items 1, 3 and 5 (a)).
      const created = closed.ops.map((o) => o.opId);
      const attempted = new Set(created);
      for (const step of closed.rollback) {
        assert.equal(attempted.has(step.opId), true,
          'S-ROLLBACK-PER-OP: each step\'s `opId` IS the op the call was invoked for — an op the attempt '
          + `itself created (\`§2.6\` item 3's \`opId\` row) — read ${JSON.stringify(step.opId)} against the `
          + `${created.length} op ids the attempt holds`);
      }
      // ── RE-DERIVED AT THE STALE-EXPECTATION RE-DERIVATION PASS (`composition-and-states.md §2.6`
      // item 5 (a), at its bytes): "WHERE A RETURNED CALL'S OWN `undoneOps` MEMBER REPORTS AN OP UNDONE,
      // EVERY STILL-OWED OP OF THE SAME SUBTREE THAT LIES AFTER IT IS ALREADY UNDONE BY THAT SAME CALL —
      // the store's per-op reach being TOTAL OVER ITS SCOPE — SO THE KERNEL SKIPS EVERY ONE OF THEM: an
      // op already reported undone by an earlier call's own `undoneOps` member is NOT A STILL-OWED OP …
      // and THE STEP COUNT STAYS THE NUMBER OF CALLS ISSUED", the same clause reading "the composition's
      // step count is the number of calls ISSUED over the still-owed ops AND MAY RUN BELOW that list's
      // size" and "so no drive reads a skip out of a step count". `contract.md §5.7`'s `P-TP-7` carries
      // the identical sentence ("SKIPS an op already reported undone by an earlier call's own
      // `undoneOps` member, so the step count is the calls ISSUED and MAY RUN BELOW the list's size").
      //
      // WHAT THE OLD FORM ASSERTED AND WHY IT WAS MALFORMED: `closed.rollback.map(opId)` sorted EQUAL to
      // the whole still-owed list — a step for EVERY op. This drive's window lands its two repair ops at
      // ONE address, and the store's per-op reach is total over the addressed subtree (`write-and-read.md
      // §6.4` items 1/3/4: `M-5` scope, `M-7` backward walk, `M-8` totality), so the composition's FIRST
      // call — the last-created repair's op, item 2's first member — already reports BOTH ops undone and
      // the second op is skipped: ONE step is the calls issued, and `n` steps is not producible by any
      // build. The step count is therefore asserted as the calls ISSUED, and the skip is read off the
      // steps' own `undoneOps` members.
      const stop = closed.rollback[0].checkpoint;
      assert.equal(stop === null || created.includes(stop), true,
        'the stop op is an op this attempt\'s own `ops` carries: every landing of this drive\'s window is '
        + `an op the attempt itself made, so a foreign \`checkpoint\` op is unreachable here — read `
        + `${JSON.stringify(stop)}`);
      const owed = stop === null ? created.slice() : created.slice(created.indexOf(stop) + 1);
      // THE SKIP IS READ OVER THE LIST'S OWN MEMBERS ONLY: the ops the stop bounds — every op at or
      // before the `checkpoint` op — are left standing and are no members of item 2's list (`§2.6` item 5
      // (b)'s "still owes"; item 8 (ii) (5)), so an earlier call's `undoneOps` member naming one of them is
      // the store's own reach crossing the stop and never a member of the skip set.
      const stopped = new Set(stop === null ? [] : created.slice(0, created.indexOf(stop) + 1));
      const stepsByOp = new Map(closed.rollback.map((s) => [s.opId, s]));
      const reportedUndone = new Set();
      for (const step of closed.rollback) for (const undone of step.undoneOps) reportedUndone.add(undone);
      // THE ONE READING OF A MISSING STEP: a still-owed member carries NO step where — and ONLY where —
      // a call that WAS issued and returned already reports it undone in its own `undoneOps` member
      // (item 5 (a)'s skip). A member with no step that no performed call reports undone is a call the
      // composition owed and never issued, and the assertion below names it.
      const expected = owed.filter((op) => stepsByOp.has(op) || !reportedUndone.has(op));
      assert.deepEqual(closed.rollback.map((s) => s.opId), expected,
        'AND THE CALLS ISSUED ARE ITEM 5 (a)\'S OWN LIST — the still-owed ops MINUS every op an earlier '
        + 'step\'s own `undoneOps` member reports undone, in item 2\'s declared order — read '
        + `${JSON.stringify(closed.rollback.map((s) => s.opId))} against ${JSON.stringify(expected)}; a `
        + 'step standing for an op an earlier call already reversed is the second call the clause forbids, '
        + 'and a step missing where an op was still owed is a call the composition never issued');
      assert.equal(closed.rollback.length <= owed.length, true,
        'THE STEP COUNT IS THE CALLS ISSUED AND MAY RUN BELOW THE LIST\'S SIZE (`§2.6` item 5 (a); '
        + '`contract.md §5.7`): read ' + `${closed.rollback.length} steps over a list of ${owed.length}`);
      let performedIndex = -1;
      for (const step of closed.rollback) {
        const at = owed.indexOf(step.opId);
        assert.equal(at > performedIndex, true,
          'NO CALL IS ISSUED OUT OF ITEM 2\'S ORDER: the performed steps are a SUBSEQUENCE of the list — '
          + 'each call is issued over a list member that stands AFTER the member the call before it was '
          + `issued over — read ${JSON.stringify(step.opId)} at ${at} after index ${performedIndex}`);
        performedIndex = at;
      }
      const covered = new Set();
      for (const step of closed.rollback) {
        covered.add(step.opId);
        for (const undone of step.undoneOps) covered.add(undone);
      }
      for (const op of owed) {
        assert.equal(covered.has(op), true,
          'AND EVERY STILL-OWED OP IS ACCOUNTED FOR BY A DECLARED READING — it is a step\'s own passed '
          + '`opId`, or a member of an earlier step\'s `undoneOps` member (`§2.6` item 8 (ii) (5): "every '
          + 'op of the attempt is either a step\'s passed `opId`, or named in an earlier step\'s '
          + '`undoneOps`, or the checkpoint op itself") — an op in neither is an op the attempt owed and no '
          + `act of the composition reached — read ${JSON.stringify(op)}`);
      }
      for (const step of closed.rollback) {
        for (const undone of step.undoneOps) {
          assert.equal(stopped.has(undone), false,
            'and the store\'s own `undoneOps` member reports the reversal of OPS THE LIST HOLDS — an op at '
            + 'or before the stop is a member of no call of this composition, so its reversal here would be '
            + `the store's reach crossing the stop the \`checkpoint\` member names — read ${JSON.stringify(undone)}`);
        }
      }
      // (ii) `rollback.length <= ops.length` was a bound the composition's own construction holds by
      // definition. `S-ROLLBACK-ALL` fixes the STATE the store is left in, and that state is read
      // through THE STORE'S OWN READ VERB (`§2.6` item 8 (iii)): this attempt's address stood at NO NODE
      // before its own first write — every attempt of this file runs on a fresh store — so the whole
      // attempt is undone and the address answers the store's own `AddressNotFound`.
      const restored = capture(() => store.read(address));
      assert.equal(restored.threw, true,
        'ALL OR NOTHING: an attempt whose first landing already violated passed NO checkpoint, so its end '
        + 'state is "the state the address stood at BEFORE THE ATTEMPT\'S OWN WRITE" — no node — and the '
        + 'store\'s own read of that address refuses (`§2.6` item 8 (iii)); the address answered '
        + `${JSON.stringify(restored.value)}`);
      assert.equal(restored.thrown.status, 'AddressNotFound',
        'and the refusal is the store\'s own code for an address that stands at no node — read '
        + `${JSON.stringify(restored.thrown.status)}`);
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-TP-7 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5.8  `P-TP-8` — THE APPLIED-REPAIR MARKER IS PER ATTEMPT, NEVER GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_P_TP_8_the_marker_opens_empty_on_a_second_attempt_at_the_same_address', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const result = row({
    id: 'P-TP-8',
    strategies: ['S-MARK-ATTEMPT'],
    seed: SEEDS['P-TP-8'],
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      // THE PAIR'S OWN EVALUATION COUNT, PER ATTEMPT: the pair violates on its first evaluation, its
      // repair lands, and the re-run — whose scope is `attempt-lifecycle.md §2.4` item 5 (iv)'s
      // "EVERY PAIR AT THE ATTEMPT'S ADDRESS" — evaluates it a SECOND time, where it passes. So each
      // attempt leaves exactly ONE `repair-run` entry for the pair and `2` `constraint-check` entries,
      // and `4` evaluations stand over the two attempts below.
      let evaluations = 0;
      let repairs = 0;
      // ⟶ `A135` (3) / `§7.3` (b) state 1 — MANDATORY here because of `3-bis`: unshielded the registration
      // ATTEMPTS this repair and `repairs`/`evaluations` — the two counters this row's clause reads off the
      // TWO ATTEMPTS — each gain a run that belongs to neither attempt.
      register(store, address, 'x', passAtRegistration(() => {
        evaluations += 1;
        if (evaluations % 2 === 0) return true;
        return { repair: () => { repairs += 1; const landed = store.write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'the repair landed a lawful value', op: landed }; }, message: 'repairable' };
      }));
      const first = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.equal(first.outcome, 'passed', 'the first attempt resolves once its re-run passes');
      const firstRuns = entries(first.log, 'repair-run');
      assert.equal(firstRuns.length, 1, 'the first attempt ran the repair once, for its own pair');
      const second = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.equal(second.outcome, 'passed', 'the second attempt at the same address resolves too');
      assert.equal(entries(second.log, 'repair-run').length, 1,
        'the second attempt ran its OWN repair once: the marker opened EMPTY and is per attempt, never global');
      assert.equal(repairs, 2, 'one repair per attempt, and never a second for the same pair');
      assert.equal(evaluations, 4, 'two evaluations per attempt, each its own window');
      // NO CLOSED RECORD CARRIES THE MARKER
      assert.equal('appliedRepairs' in report(store, second.attempt), false,
        'the five-member closed record carries the marker nowhere');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-TP-8 (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// THE DECLARED IDS THAT HAD NO GENERATOR — ONE DRIVE PER ID, EACH CITING THE ID ITS ROW DECLARES
// (`DQ-13`: the cells cited ids no row declares while these ids, which their rows DO declare, had
// no generator at all). Every cell below is a generator for one declared id, its state list is
// enumerated in its own comment block, and every assertion is read off a declared member.
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * `contract.md §5.1` — **`S-KEY-ADDR`**: "one address, two ids: both stand, and the store's listener
 * machinery holds ONE entry at that address because `listen` is idempotent at the address level".
 *
 * STATES ENUMERATED FIRST. For one attempt: (1) TWO ids registered at ONE address, both functions
 * standing; (2) the address's store home entry — ONE, read off the adopted handle the two `register`
 * calls answer; (3) the pass's evaluated set — BOTH pairs, in first-registration order. FAIL STATES:
 * a second id at one address that adds a second store home entry; a registration that loses the
 * first pair; an address-keyed registry that makes two ids one registration.
 */
test('ck_prop_P_IM_1_a_second_id_at_one_address_stands_and_the_store_holds_one_home_entry', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-IM-1',
    strategies: ['S-KEY-ADDR'],
    seed: SEEDS['P-IM-1'] ^ 0x1B873593,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      const second = `id-${n(0, 99)}`;
      const invoked = [];
      // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this row's subject is the ADDRESS-LEVEL HOME ENTRY and
      // the two pairs the pass evaluates, so both registrations must STAND and the recorder must hold the
      // PASS's invocations alone. Both bodies pass every context; the recorder is shielded so the two
      // registration invocations are not read as the one pass this row counts.
      const firstHandle = register(store, address, 'x', recordsAfterRegistration(() => { invoked.push('x'); return true; }));
      const secondHandle = register(store, address, second, recordsAfterRegistration(() => { invoked.push(second); return true; }));
      assert.equal(secondHandle, firstHandle,
        'ONE store home entry at the address: both registrations are answered the SAME adopted handle '
        + '(`kernel-surface.md §2.2` item 4 — `listen` is idempotent at the address level)');
      const report = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.deepEqual(checkIds(report.log), ['x', second],
        'and BOTH pairs stand and are evaluated, in the registry\'s own first-registration order: a '
        + 'second id at one address is a SEPARATE key and the first pair is not lost to it');
      assert.deepEqual(invoked.slice().sort(), [second, 'x'].sort(),
        'both functions ran exactly once in the one pass');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-1 / S-KEY-ADDR (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.1` — **`S-CHECK`**: "the handle check's side: a registration whose address the store
 * refuses, and a registration whose address the store admits". ONE DRIVE PER ARM OF THE PAIR.
 *
 * STATES ENUMERATED FIRST: (1) an address the STORE admits → a handle is returned and it IS the
 * store's own answer for that address; (2) an address the KERNEL's shape test admits and the STORE's
 * own walk refuses (an integral segment past the store's upper bound, `store-model.md §1.5` item 1) →
 * THE STORE'S OWN CODE in the store's own form, UNCONVERTED, and never a kernel token. FAIL STATES: a
 * handle check that runs CALLER-side (a store refusal answered as a kernel state, or a kernel shape
 * refusal answered by the store); a registration whose address the store refuses that returns a
 * handle anyway.
 */
test('ck_prop_P_IM_1_the_handle_check_is_the_store_s_on_both_arms', async () => {
  const { register } = await kernel();
  const result = row({
    id: 'P-IM-1',
    strategies: ['S-CHECK'],
    seed: SEEDS['P-IM-1'] ^ 0xCC9E2D51,
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address }) => {
      if (i % 2 === 0) {
        // ARM 1 — THE STORE ADMITS THE ADDRESS: the registration is answered by the store's own handle.
        const handle = register(store, address, 'x', () => true);
        assert.equal((store.register(store.listen(address), () => {}) || store.listen(address)), handle,
          'the kernel mints no token for a store-minted handle: the registration\'s answer IS the '
          + 'store\'s own answer for that address (`kernel-surface.md §2.2` item 1)');
        return;
      }
      // ARM 2 — THE KERNEL'S SHAPE TEST ADMITS IT AND THE STORE'S OWN WALK REFUSES IT.
      const past = [Number.MAX_SAFE_INTEGER + 2];
      const r = capture(() => register(store, past, 'x', () => true));
      if (r.threw) {
        assert.equal(KC_TOKENS.includes(r.thrown.status), false,
          'the store\'s own refusal carries the store\'s own code and is NEVER converted into a kernel '
          + 'state (`fail-surface.md §1.2`: the channel is the failing ACT\'s)');
        assert.equal(STORE_CODES.includes(r.thrown.status), true,
          `and the code it carries is one of the store's closed ${STORE_CODES.length} — read ${JSON.stringify(r.thrown.status)}`);
      } else {
        assert.notEqual(r.value, undefined,
          'where the store admits the address, the registration answers the store\'s own handle and '
          + 'nothing else — the two arms are the store\'s, and no arm of them is the kernel\'s');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-1 / S-CHECK (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.2` — **`S-REC-DISPOSE`**: the attempt's TWO DISPOSAL ARMS — a failure THROWS the
 * attempt's own log, a success RETURNS the closed record's report, and no third disposal exists.
 *
 * STATES ENUMERATED FIRST: (1) the success arm → a five-member `AttemptReport` is RETURNED and the
 * closed record's report equals it member for member; (2) the failure arm → the kernel's own thrown
 * form carries `log`, and that list is the SAME list the closed record holds, MEMBER FOR MEMBER
 * (`fail-surface.md §1.1` item 3: "the two lists are the same list member for member"). FAIL STATES: a
 * failure that returns; a success that throws; a thrown log SHORTER than the closed record's (the
 * closure written outside the carried list).
 */
test('ck_prop_P_IM_2_the_two_disposal_arms_and_the_log_they_carry', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const result = row({
    id: 'P-IM-2',
    strategies: ['S-REC-DISPOSE'],
    seed: SEEDS['P-IM-2'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address, int: n }) => {
      // ⟶ `A135` (3) / `§7.3` (b) state 1: the odd-`i` arms violate, so each is shielded and the disposal arm
      // the row drives is the one its own `runAttempt` reaches.
      register(store, address, 'x', passAtRegistration(() => (i % 2 === 0 ? true : { message: 'the caller\'s own string' })));
      const record = commit(store, address, 'mem', n(0, 9));
      const r = capture(() => runAttempt(store, record));
      const closed = report(store, record.attempt);
      assert.equal(r.threw, i % 2 !== 0,
        'the disposal arm is the ATTEMPT\'S OWN: a failure THROWS and a success RETURNS, and neither '
        + 'arm is the other');
      if (r.threw) {
        assertKernelForm(r.thrown, 'S-REC-DISPOSE failure');
        assert.deepEqual(r.thrown.log, closed.log,
          'the thrown log IS the closed record\'s log, member for member — the failure carries the '
          + 'attempt\'s own list and copies it nowhere (`fail-surface.md §1.1` item 3)');
        assert.equal(closed.outcome, 'failed', 'and the record it disposes to answers the failed arm');
      } else {
        assertAttemptReport(r.value, 'S-REC-DISPOSE success');
        assert.equal(r.value.outcome, 'passed', 'a passed attempt is RETURNED and never thrown away');
        assert.deepEqual(r.value, closed,
          'and `K-5` over the closed attempt answers the very report `K-3` returned');
      }
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-IM-2 / S-REC-DISPOSE (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.4` — **`S-ATT-OUT`**: "one drive per OUTSIDE form, asserting the declared kernel
 * state". The outside forms are `§5.4`'s own four: an absent `address`; an absent or non-function
 * `constraint`; a `tier` outside its domain; an absent `value`; plus a `CommitRecord.attempt` naming a
 * CLOSED or UNKNOWN attempt.
 *
 * STATES ENUMERATED FIRST, ONE PER DRIVE: (1) `register` with an absent address → `KC-1`;
 * (2) `register` with an absent/non-function constraint → `KC-2`; (3) `commit` with a `tier` outside
 * `{file, mem, temp}` → THE STORE'S `OutOfDomainTier` AT THE VERB CALL and NO attempt opened;
 * (4) `commit` with an absent `value` → THE STORE'S OWN write-verb refusal and NEVER `KC-2`;
 * (5) `runAttempt` over a closed attempt's own reference → `KC-2` and NEVER `KC-7`.
 *
 * FAIL STATES: an outside form that succeeds; an outside form whose kernel state differs from the row
 * it is read off; a `KC-2` thrown for an absent `value`, or a `KC-7` thrown over a CLOSED attempt's own
 * reference — the two sites `P-SM-4`'s failure list names (`RD-1`; `RD-9`).
 */
test('ck_prop_P_SM_4_one_drive_per_outside_form_and_its_declared_state', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-4',
    strategies: ['S-ATT-OUT'],
    seed: SEEDS['P-SM-4'] ^ 0x2545F491,
    attempts: ROW_BUDGET,
    body: (rng, i) => attempt(rng, ({ store, address }) => {
      const form = i % 5;
      if (form === 0) {
        const r = capture(() => register(store, undefined, 'x', () => true));
        assert.equal(r.thrown.status, 'KC-1', 'an absent address is the kernel\'s own KC-1');
        return;
      }
      if (form === 1) {
        const r = capture(() => register(store, address, 'x', null));
        assert.equal(r.thrown.status, 'KC-2', 'a non-function constraint is KC-2');
        return;
      }
      if (form === 2) {
        const r = capture(() => commit(store, address, 'nowhere', 1));
        assert.equal(r.threw, true, 'a tier outside the three declared tokens is refused');
        assert.equal(KC_TOKENS.includes(r.thrown.status), false,
          'by THE STORE at the verb call, on the store\'s own channel');
        assert.equal(STORE_CODES.includes(r.thrown.status), true,
          `read ${JSON.stringify(r.thrown.status)} — one of the store's closed ${STORE_CODES.length}, per the row's own ` +
          '"which is the STORE\'S OutOfDomainTier at the verb call, with NO attempt opened"');
        return;
      }
      if (form === 3) {
        const r = capture(() => commit(store, address, 'mem', undefined));
        assert.equal(r.threw, true, 'an absent value is refused');
        assert.equal(r.thrown.status === 'KC-2', false,
          'and the refusal is the STORE\'S write-verb answer on the store\'s channel and NEVER `KC-2` '
          + '(`RD-1`: that site is not one of `K-2`\'s)');
        assert.equal(STORE_CODES.includes(r.thrown.status), true,
          `so its code stands in the store's closed ${STORE_CODES.length} — read ${JSON.stringify(r.thrown.status)}`);
        return;
      }
      // FORM 5 — A CLOSED ATTEMPT'S OWN REFERENCE.
      register(store, address, 'x', () => true);
      const record = commit(store, address, 'mem', 1);
      runAttempt(store, record);
      const again = capture(() => runAttempt(store, record));
      assert.equal(again.threw, true, 'a closed attempt is not re-run');
      assert.equal(again.thrown.status, 'KC-2',
        'a `CommitRecord.attempt` naming a CLOSED attempt is refused `KC-2` at `K-3` and NEVER `KC-7` '
        + '(`RD-9`: the row\'s own failure list names exactly this)');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-4 / S-ATT-OUT (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.4` — **`P-NEG-9`** · **`S-ATT-ARM`** RE-DRIVEN AS "the table's totality and mutual
 * exclusivity, ONE DRIVE PER ARM", and this generator drives the arms the earlier cells did NOT: `(e)`,
 * `(f)` and `(h)`,
 * the three the row's own clause singles out (`(e)`/`(f)` being "the pair the `ran`/`appliedRepairs`
 * membership pair separates", `(h)` being "an op the COMPOSITION STILL OWES … refused by a store verb
 * the COMPOSITION calls").
 *
 * STATES ENUMERATED FIRST, ONE PER ATTEMPT (`i % 3`): (1) limb `(e)` — a pair IN `ran` and IN
 * `appliedRepairs` violated again → `KC-5`, its own `repair-run` count `1` and never `2`;
 * (2) limb `(f)` — a pair IN `ran` and NOT in `appliedRepairs` violated again → `KC-6`;
 * (3) limb `(h)` — a composition whose per-op call over a STILL-OWED op meets a store floor under a
 * LATER still-owed op → the floor's own answer, carried in the outcome entry.
 *
 * FAIL STATES: an `(e)`/`(f)` drive whose violated pair satisfies both membership conditions or
 * neither; a pair in `ran` and NOT in `appliedRepairs` reaching `(e)`; a first violation answered by
 * either limb instead of by `(b)`/`(c)`.
 */
test('ck_prop_P_SM_4_one_drive_per_arm_of_the_repeat_pair_and_the_owed_op', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const result = row({
    id: 'P-SM-4',
    strategies: ['S-ATT-ARM'],
    seed: SEEDS['P-SM-4'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const limb = i % 3;
      if (limb === 2) {
        // LIMB `(h)` — A STILL-OWED OP WHOSE PER-OP CALL MEETS THE STORE'S OWN FLOOR. The address's
        // window is small and seeded past, so the attempt's own op lies out of the reversal's reach by
        // the time the composition runs (the same construction the state layer drives, and the ONE
        // caller-side observable that forces the store's own compression).
        const hStore = makeStore({ journalLength: 2 });
        const hAddress = [tag('attarm-h')];
        for (let k = 0; k < 6; k += 1) hStore.write(hAddress, 'mem', `seed-${k}`);
        // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this pair violates at its registration, so it is
        // shielded or the registration is REFUSED there (`ConstraintListInvalid`) and no attempt is opened for
        // the floor this limb reads. The shield's answer is the registration's — the body still violates the
        // LANDING, which is the state limb (h) drives.
        register(hStore, hAddress, 'x', passAtRegistration(() => ({ message: 'x is invalid, and registers no repair' })));
        const hRecord = commit(hStore, hAddress, 'mem', 1);
        const hr = capture(() => runAttempt(hStore, hRecord));
        assert.equal(hr.threw, true, 'the attempt fails');
        const hClosed = report(hStore, hRecord.attempt);
        assert.equal(entries(hr.thrown.log, 'outcome').length, 1,
          'limb (h): ONE outcome entry, whatever the composition met — the closure writes it once');
        if (hClosed.rollback.some((s) => s.failed === true)) {
          assert.equal(hr.thrown.status, 'KC-8',
            'a still-owed op whose call meets either floor code is `KC-8` — read '
            + `${JSON.stringify(hr.thrown.status)}; composition-and-states.md §2.6 item 5 (b)`);
          assert.equal(entries(hr.thrown.log, 'outcome')[0].state, 'KC-8',
            'and THAT ONE outcome entry carries the same token: the floor is answered in the failure\'s '
            + 'own entry and no second entry is appended (§2.6 item 6 (a))');
        } else {
          assert.equal(hr.thrown.status, 'KC-3',
            'where no floor was met the answer is the violation arm\'s own KC-3 and never the floor\'s');
        }
        return;
      }
      return attempt(rng, ({ store, address, int: n }) => {
      if (limb === 0) {
        // LIMB `(e)` — A PAIR IN `ran` AND IN `appliedRepairs`, VIOLATED AGAIN. `x` registers a repair
        // on its FIRST evaluation and that repair lands an op, so the pair is recorded as applied; its
        // second evaluation (the re-run at its own repair's landing) violates again.
        let x = 0;
        // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes the shield mandatory: unshielded, the
        // registration ATTEMPTS this repair, so `x === 1` is spent at the registration and the limb-(e) window
        // this row reads (first evaluation repairs, the re-run repeats) is never reached.
        register(store, address, 'x', passAtRegistration(() => {
          x += 1;
          if (x === 1) {
            return { repair: () => { const landed = store.write(address, 'mem', `fixed-${n(0, 9)}`).op; return { ok: true, message: 'x was repaired by the op this repair landed', op: landed }; }, message: 'repairable' };
          }
          return { message: 'x is broken again' };
        }));
        const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
        assert.equal(r.threw, true, 'a repeat is a failure arm of the closed table');
        assert.equal(r.thrown.status, 'KC-5',
          'limb (e): the repeated pair\'s repair HAD RUN, so the pair stands in `ran` AND in '
          + `\`appliedRepairs\` — read ${JSON.stringify(r.thrown.status)}`);
        assert.equal(x, 2, 'the pair was evaluated twice: its first evaluation and the repeat');
        assert.equal(repairRunsFor(r.thrown.log, 'x').length, 1,
          'and its repair ran ONCE and never twice — arm (e)\'s own count for that pair');
        assert.deepEqual(checkIds(r.thrown.log), ['x', 'x'],
          'two `constraint-check` entries under that pair\'s own key, and never three');
        return;
      }
      // LIMB `(f)` — A PAIR IN `ran` AND NOT IN `appliedRepairs`, VIOLATED AGAIN. `x` PASSES on the
      // first pass — limb (ii)'s state is reached "ONLY where the pair's first evaluation passes" —
      // `y` violates and its repair lands, and the re-run breaks `x`.
      let y = 0;
      // ⟶ `A135` (3) / `§7.3` (b) state 1: limb (f) is reached *"only where the pair's first evaluation
      // passes"*, and unshielded the registration IS `x`'s first evaluation — so `y === 0` is false at the
      // LANDING, `x` violates at its first landing evaluation, and the limb is unreachable. Both pairs are
      // shielded so the order the limb's own clause declares is the order the row drives.
      register(store, address, 'x', passAtRegistration(() => (y === 0 ? true : { message: 'x is broken by the re-run' })));
      register(store, address, 'y', passAtRegistration(() => {
        y += 1;
        return y === 1
          ? { repair: () => { const landed = store.write(address, 'mem', `y-fixed-${n(0, 9)}`).op; return { ok: true, message: 'y was repaired by the op this repair landed', op: landed }; }, message: 'y is invalid' }
          : true;
      }));
      const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
      assert.equal(r.threw, true, 'the re-run fails the attempt');
      assert.equal(r.thrown.status, 'KC-6',
        'limb (f): `x` is in `ran` and NOT in `appliedRepairs` — read '
        + `${JSON.stringify(r.thrown.status)}`);
      assert.equal(repairRunsFor(r.thrown.log, 'x').length, 0, 'and no repair of its own ever ran');
      assert.deepEqual(checkIds(r.thrown.log), ['x', 'y', 'x'],
        'so its own entry count under its own key is TWO and never three — `S-SECOND-VIOLATION`\'s own '
        + 'count, read at this arm');
      });
    },
  });
  assert.deepEqual(result.failures, [],
    `P-SM-4 / S-ATT-ARM (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.5` — **`S-SIDE`**: "the function's realm: it is invoked by the caller's own code and
 * never by the store".
 *
 * STATES ENUMERATED FIRST: (1) the constraint's function is invoked IN THE KERNEL'S OWN WINDOW, once
 * per pair per pass, from the caller's own call — never by a store delivery; (2) a PLAIN STORE
 * LISTENER standing at the same address is displaced by the registration and its body NEVER runs from
 * the store (`store.on` holds ONE function per address); (3) an id the registry holds with NO function
 * — a pair an address's registration replaced — fires NOTHING.
 *
 * FAIL STATES: a constraint evaluated by the kernel's own constraints layer when no pass stands owed for
 * its pair; a plain listener's body run by the store at an address the kernel registered at; an
 * invocation with no registration behind it.
 *
 * ▸ RE-DERIVED AT THE `A112` DELIVERY-MODEL RE-DERIVATION PASS: THIS CELL ONCE ASSERTED, BESIDE ITS OWN
 * SUBJECT, THAT *"the store's displaced handle is carried by no member of the record"* — and THAT
 * ASSERTION ROSE ON THE WITHDRAWN SIFT READING: it read an empty or filtered `pending` as the write's
 * own DECISION, treating a handle whose pair the kernel runs as one that must not stand in a member the
 * write wrote. `A112` declares the opposite: `pending` is written as THE WHOLE RETURNED SET OF TRIGGERED
 * CONSTRAINTS and an entry leaves it ONLY BY BEING CHECKED OFF AS IT PASSES, so a one-function-per-address
 * home entry is written into that member with the rest of the set and, where the pair it stands behind is
 * one this pass evaluated, leaves it by that check-off and NEVER by never having been there
 * (`kernel-surface.md §2.1` item 2 — "AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" — read
 * with `§2.2` item 3 AS THE `A112` DELIVERY-MODEL RE-SPELL LEAVES IT, where the *"STANDS IN `pending` NO
 * LONGER"* spelling is WITHDRAWN BY NAME and the same state is written as an entry that "IS STILL
 * WRITTEN AS `pending` WITH THE WHOLE RETURNED SET AND LEAVES IT ONLY BY BEING CHECKED OFF AS IT
 * PASSES"; `A: docs/decisions.md` · `A112`). The assertion is
 * therefore REMOVED and not inverted: THIS CELL'S SUBJECT IS THE FUNCTION'S REALM — which body ran and
 * how many times — and that subject is driven, on both sides of the attempt, by the `order` list the
 * bodies themselves write. The extent of `pending` at a write's own instant is the `ck_dm_*` cells' own
 * subject, asserted there and not re-asserted here.
 */
test('ck_prop_P_SM_5_the_constraint_function_is_invoked_by_the_caller_and_never_by_the_store', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-5',
    strategies: ['S-SIDE'],
    seed: SEEDS['P-SM-5'] ^ 0x27220A95,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      const order = [];
      const plain = () => order.push('plain');
      const plainHandle = (store.register(store.listen(address), plain) || store.listen(address));
      // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS THE BODY ONCE, SO A RECORDER
      // WHOSE SUBJECT IS *"the function ran ONCE, IN THE KERNEL'S OWN WINDOW"* (`§5.5`'s `S-SIDE`) MUST NOT
      // CARRY THE REGISTRATION'S OWN ENTRY. `recordsAfterRegistration` answers the registration `true` and
      // passes every LANDING's context to this recorder, so `order` holds the WINDOW's invocations alone and
      // the cell's subject — which layer ran the body, and that the displaced plain body ran ZERO times — is
      // exactly as filed.
      const kernelHandle = register(store, address, 'x', recordsAfterRegistration(() => { order.push('constraint'); return true; }));
      assert.equal(kernelHandle, plainHandle,
        'one home entry per address: the registration REPLACES the plain listener in the store\'s own '
        + 'one slot (`kernel-surface.md §2.1` item 1)');
      const record = commit(store, address, 'mem', n(0, 9));
      const report = runAttempt(store, record);
      assertAttemptReport(report, 'S-SIDE pass');
      assert.deepEqual(order, ['constraint'],
        'the function ran ONCE, IN THE KERNEL\'S OWN WINDOW, and the plain listener\'s body NEVER ran '
        + 'from the store — the function\'s realm is the caller\'s (`§5.5`, `S-SIDE`)');
      // THE SUBJECT, DRIVEN ON BOTH SIDES OF THE ATTEMPT: the ONE run of the pair's body is the
      // constraints layer's, and NEITHER the store nor the caller's own loop over the record's member
      // runs the displaced plain body — read off the bodies' own `order` list and off no member's
      // extent. RE-DERIVED AT THE `A112` DELIVERY-MODEL RE-DERIVATION PASS: the assertion that once
      // stood here read the record's `pending` member for the displaced handle's ABSENCE, which is the
      // withdrawn sift reading — a handle written into that member with the whole returned set leaves
      // it only by being CHECKED OFF AS IT PASSES and never by having been filtered out
      // (`kernel-surface.md §2.1` item 2; `A112`).
      assert.deepEqual(order, ['constraint'],
        'AND NOTHING RAN IT AGAIN: not the store\'s write verb — which returns the handles and invokes '
        + 'nothing of either layer\'s (`§2.2` item 2) — not the caller\'s own loop over the record\'s '
        + 'member, and not a second pass — the displaced plain body ran ZERO times across the '
        + `whole drive (read ${JSON.stringify(order)})`);
      assert.equal(typeof plainHandle === 'object' && plainHandle !== null, true,
        'and the adopted value is the store\'s own handle object, the ONE value both registrations were '
        + 'answered with (`kernel-surface.md §2.1` item 1; `A: bindings/js/index.d.ts`: `Handle = object`)');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-5 / S-SIDE (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.6` — **`S-NO-BUDGET`**: "no clause of this directory declares a repair budget, a
 * retry count or a progress measure, and a drive that needs one to terminate has found a failure of
 * this row."
 *
 * STATES ENUMERATED FIRST: (1) a pair whose repair always lands an op the SAME pair violates again —
 * the attempt terminates at the FIRST repeat and is never driven to a third evaluation of that pair
 * on the strength of a budget; (2) the per-pair evaluation count for the closing pair is exactly `2`
 * (its first evaluation and the repeat) and never `3`; (3) the kernel's answer is a declared repeat
 * token and never a timeout, a retry count or a progress verdict.
 *
 * FAIL STATES: an attempt that does not terminate because a third evaluation was reached; a repair
 * budget, a retry count or a progress measure invented as the bound.
 */
test('ck_prop_P_SM_6_no_repair_budget_or_retry_count_is_the_attempt_s_bound', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-SM-6',
    strategies: ['S-NO-BUDGET'],
    seed: SEEDS['P-SM-6'] ^ 0xC2B2AE35,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      let x = 0;
      // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: unshielded, the
      // registration ATTEMPTS this always-repairing body and lands an op of its own, so the count this row
      // reads (`x` evaluated exactly `2` times) is never the LANDING's own two evaluations.
      register(store, address, 'x', passAtRegistration(() => {
        x += 1;
        // EVERY evaluation registers a repair and lands a NEW op: without a bound the attempt would
        // never stop, and the row declares that NO bound exists — the FIRST REPEAT is the bound.
        return { repair: () => { const landed = store.write(address, 'mem', `again-${x}-${n(0, 9)}`).op; return { ok: true, message: 'x was repaired by the op this repair landed', op: landed }; }, message: 'x is invalid' };
      }));
      const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
      assert.equal(r.threw, true, 'the attempt terminates and fails — a run that needed a budget to '
        + 'stop would have found this row\'s failure');
      assert.ok(['KC-5', 'KC-6'].includes(r.thrown.status),
        `the bound is the FIRST REPEAT and its own declared token — read ${JSON.stringify(r.thrown.status)}`);
      assert.equal(x, 2,
        'and the closing pair was evaluated TWICE and never a third time: no budget, no retry count '
        + 'and no progress measure decided it (`§5.6`, `S-NO-BUDGET`)');
      assert.deepEqual(checkIds(r.thrown.log), ['x', 'x'],
        'two constraint-check entries under that pair\'s own key — `S-SECOND-VIOLATION`\'s own count, '
        + 'read here on the arm that registers a repair that can never resolve');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-SM-6 / S-NO-BUDGET (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.8` — **`S-MARK-SCOPE`**: "TWO INSTANCES: neither sees the other's marker."
 *
 * STATES ENUMERATED FIRST: (1) one pair, at one address, in TWO stores, each driven through its OWN
 * attempt — each store's pass runs that store's OWN function; (2) the marker of the first store's
 * attempt is invisible to the second: the second store's attempt opens its marker empty and runs its
 * repair though the first store's attempt already recorded one for the same pair; (3) neither store's
 * attempt answers with the OTHER's outcome.
 *
 * FAIL STATES: a marker shared between two kernel instances; a second instance's attempt that finds a
 * pair already in `appliedRepairs`; one store's pass that invoked the other's function.
 */
test('ck_prop_P_TP_8_two_instances_never_see_each_other_s_marker', async () => {
  const { register, commit, runAttempt } = await kernel();
  const result = row({
    id: 'P-TP-8',
    strategies: ['S-MARK-SCOPE'],
    seed: SEEDS['P-TP-8'] ^ 0x7FEB352D,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      const other = makeStore({ journalLength: 64 });
      const seen = { first: 0, second: 0 };
      // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` MAKES THE SHIELD MANDATORY: unshielded, each
      // registration ATTEMPTS this pair's repair and spends `seen[which] === 1` on the registration, so the
      // two-window count this row reads (`2` per instance) is never produced by the two ATTEMPTS the row drives.
      const body = (which) => passAtRegistration(() => {
        seen[which] += 1;
        if (seen[which] === 1) {
          return { repair: () => { const landedOp = (which === 'first' ? store : other).write(address, 'mem', n(0, 9)).op; return { ok: true, message: 'the store this attempt drives landed a lawful value', op: landedOp }; }, message: 'repairable' };
        }
        return true;
      });
      register(store, address, 'x', body('first'));
      register(other, address, 'x', body('second'));
      const a = runAttempt(store, commit(store, address, 'mem', n(0, 9)));
      assert.equal(a.outcome, 'passed', 'the first instance\'s attempt resolves on its own');
      assert.equal(entries(a.log, 'repair-run').length, 1, 'and it ran the FIRST instance\'s repair once');
      const b = runAttempt(other, commit(other, address, 'mem', n(0, 9)));
      assert.equal(b.outcome, 'passed', 'the second instance\'s attempt resolves too');
      assert.equal(entries(b.log, 'repair-run').length, 1,
        'and it ran the SECOND instance\'s repair once — the first instance\'s marker is not visible '
        + 'here, so this pair was never "already applied" (`§5.8`, `S-MARK-SCOPE`)');
      assert.equal(seen.first, 2, 'the first store\'s pair was evaluated in the first store\'s own two '
        + 'windows and NEVER by the second store\'s pass');
      assert.equal(seen.second, 2, 'and the second store\'s pair in its own');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-TP-8 / S-MARK-SCOPE (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

/**
 * `contract.md §5.8` — **`S-MARK-NO-HOME`**: "the marker writes NO store entry, appends NO journal
 * entry, and stands in NO closed record: its only home is the open `AttemptRecord`, and the closed
 * form is the five-member `AttemptReport`".
 *
 * STATES ENUMERATED FIRST: (1) an attempt that records an applied repair — the store's own read of the
 * attempt's address is UNCHANGED by the marker (the marker is not a store value); (2) the attempt's own
 * `ops` carry exactly the ops the write verbs returned, and no op of the marker's; (3) the closed
 * record carries `appliedRepairs` NOWHERE, and the OPEN record does — read through `K-4` while the
 * attempt is live.
 *
 * FAIL STATES: a marker that writes a store entry or a journal entry; a closed record that carries the
 * marker (the retained-history reading, withdrawn by name at `kernel-surface.md §2.5` item 2).
 */
test('ck_prop_P_TP_8_the_marker_writes_no_store_entry_no_journal_entry_and_no_closed_record', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  const result = row({
    id: 'P-TP-8',
    strategies: ['S-MARK-NO-HOME'],
    seed: SEEDS['P-TP-8'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => attempt(rng, ({ store, address, int: n }) => {
      let landed = null;
      let x = 0;
      // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes the shield mandatory: unshielded, the
      // registration ATTEMPTS this repair, so `landed` is set and an op landed at the REGISTRATION — a state in
      // which `x === 1` is spent there and the closed record this row reads carries the registration's own op.
      register(store, address, 'x', passAtRegistration((ctx) => {
        x += 1;
        if (x === 1) {
          return { repair: () => {
            landed = `fixed-${n(0, 9)}`;
            const landedOp = store.write(address, 'mem', landed).op;
            return { ok: true, message: 'the repair landed a fixed value', op: landedOp };
          }, message: 'repairable' };
        }
        return true;
      }));
      const done = runAttempt(store, commit(store, address, 'mem', 'v'));
      assert.equal(done.outcome, 'passed', 'the attempt resolves on the repaired arm');
      const closed = report(store, done.attempt);
      assert.equal('appliedRepairs' in closed, false,
        'THE CLOSED FORM CARRIES THE MARKER NOWHERE — the five-member `AttemptReport` is its shape and '
        + '`appliedRepairs` is not one of the five (`§5.8`, `S-MARK-NO-HOME`)');
      assert.equal(entries(closed.log, 'repair-run').length, 1,
        'while the marker\'s own consequence IS observable in the log: the pair\'s repair ran once');
      assert.equal(closed.ops.length, 2,
        'and `ops` carries the two ops the two write VERBS returned and no third op of the marker\'s '
        + 'own (`§5.2`, `P-IM-2`: `ops` is the ops THIS ATTEMPT CREATED)');
      const back = store.read(address);
      assert.equal(back, landed,
        'the marker wrote NO store entry: the value the address now stands at is THE REPAIR\'S OWN '
        + 'landing and nothing the marker appended (`§5.8`: "its only home is the open `AttemptRecord`")');
    }),
  });
  assert.deepEqual(result.failures, [],
    `P-TP-8 / S-MARK-NO-HOME (seed 0x${result.seed.toString(16)}) held over ${result.attempts} attempts`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// THE REGISTER'S OWN DECLARED IDS, `contract.md §5.1`–`§5.8`, in the rows' own order — the ONE home of
// the list, read by the budget cell's two-direction closure and by `P-NEG-21`.
//
// **⟶ RE-DERIVED 2026-10-17 (`role_test_writer`; GATE 4's ADVERSARIAL PASS): THE SET IS NO LONGER A
// LITERAL TYPED IN THIS FILE.** It was one — and so was the `24`/`27` arithmetic below — so a `28`th id
// landing in `contract.md §5` would have moved NOTHING: the closure read compared this file's own list
// against this file's own list's consumers. **THE DECLARED SET IS NOW EXTRACTED FROM THE CONTRACT BYTES IT
// CLAIMS TO CHECK** — the eight `### §5.n` headings and, inside each, the bolded ids of that row's own
// *"**Strategy ids.**"* line — and the extraction is asserted to have found the same number of ids the
// contract's own counts print (`3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27`) and to be a set of DISTINCT ids.
const CONTRACT_PATH = join(
  dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'docs', 'specs', 'storeroom-constraints', 'contract.md',
);
/// The eight `§5.n` sections of the register, each with the ids ITS OWN `Strategy ids` line carries. The
/// reading is the heading's own `§n`, never a position: a row that MOVED would be read at its new section
/// rather than silently re-slotted.
function declaredStrategyIdsFromContract(bytes) {
  const headings = [];
  const heading = /^### §5\.([1-8]) [^\n]*$/gm;
  let hit;
  while ((hit = heading.exec(bytes)) !== null) headings.push({ section: `§5.${hit[1]}`, start: hit.index });
  for (let i = 0; i < headings.length; i += 1) {
    const end = i + 1 < headings.length ? headings[i + 1].start : bytes.length;
    const body = bytes.slice(headings[i].start, end);
    // The row's own list, from its `**Strategy ids.**` label to its `**FAILURE LIST.**` label — the two
    // labels the register fixes for every row — so the ids are read off the ROW and never off a neighbouring
    // row's ids or off the text beside them.
    const list = /\*\*Strategy ids\.\*\*([\s\S]*?)\*\*FAILURE LIST\.\*\*/.exec(body);
    headings[i].ids = list === null ? [] : [...list[1].matchAll(/\*\*`(S-[A-Z][A-Z-]*)`\*\*/g)].map((x) => x[1]);
  }
  return headings;
}
const CONTRACT_STRATEGY_ROWS = declaredStrategyIdsFromContract(
  readFileSync(CONTRACT_PATH, 'utf8'),
);
const DECLARED_STRATEGY_IDS = CONTRACT_STRATEGY_ROWS.flatMap((row) => row.ids);
/// The contract's own arithmetic for the eight rows' ids, printed at the register's census and at this
/// file's own header (`§5.1`–`§5.8`: `3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27`). **AN EMPTY OR TRUNCATED READ IS
/// BELOW IT, SO THE READING FAILS LOUDLY INSTEAD OF CLOSING OVER NOTHING.**
const IDS_PER_SECTION = [3, 4, 3, 3, 4, 3, 4, 3];

/**
 * THE NAMED UNDRIVABLE LIST — the declared ids NO `row()` CELL OF THIS FILE CITES, each with its
 * reason, so the register's closure can be asserted IN BOTH DIRECTIONS (`DR-10`: the `cited ⊆ declared`
 * check that stood alone could not see a declared id with NO generator at all).
 */
const UNDRIVABLE_BY_A_ROW_CELL = [
  {
    id: 'S-REC-RETAIN',
    reason: 'the id\'s subject is the CLOSED-attempt store\'s own LIFETIME: `attempt-lifecycle.md §2.4` '
      + 'item 7 (ii) holds the closed record for the life of the kernel instance and its bound is `RC-3`, '
      + '`STATUS: OPEN`, owner the architect — with NO bound, NO eviction arm and NO enumerator over that '
      + 'store declared, no drive distinguishes retention from eviction, so no seeded generator pins it',
  },
  {
    id: 'S-ROLLBACK-FLOOR',
    reason: 'the id\'s subject is a STORE-STATE condition — a journal base COMPACTED under a still-owed op '
      + '(`composition-and-states.md §2.6` items 5 (b) and 6) — and the contract\'s declared domains carry '
      + 'no term for it, so no seeded generator can pin it; it IS driven by hand-built cells that fix '
      + '`StoreConfig.journalLength` small (`constraint-kernel-states.test.mjs`\'s `ck_neg_3` and `ck_neg_4` '
      + 'arm 2, and `constraint-kernel-negatives.test.mjs`\'s `P-NEG-20`)',
  },
  {
    id: 'S-ROLLBACK-TARGET',
    reason: 'the id\'s subject is the TARGET op — the `opId` the STORE mints at the landing that left the '
      + 'attempt\'s address in its last valid state (`§2.6` item 8 (i)–(ii)): a runtime-minted identity no '
      + 'seed fixes in advance, so a `row()` cell reads the member\'s shape and never the target itself; it '
      + 'IS driven by the hand-built cells that pin a landing '
      + '(`ck_states_every_step_carries_the_six_declared_members_and_the_arm_s_own_checkpoint`, `ck_neg_4`)',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// THE REGISTER'S OWN BOOKKEEPING — THE BUDGET, REPORTED WITH ITS TERMS
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_prop_the_register_ran_at_most_four_hundred_attempts_and_stopped_after_five_failures_a_row', () => {
  // THE BUDGET IS FIXED BY THE FILE AND NOT ACCUMULATED ACROSS TESTS, which the runner schedules one
  // at a time. BOTH TERMS ARE NOW REAL AND BOTH ARE PRINTED: the first is THE NUMBER OF `row()` CELLS
  // THIS FILE DECLARES, read off the cells themselves through `ROW_CELLS`, and the second is the even
  // share of the `400`-attempt total over them. The figure the file once printed — "`16` rows of
  // checks, `16 x 25 = 400` exactly" — named a row count no row of `contract.md §5` declares and no
  // cell of this file stood at (`12` cells stood here, `12 x 25 = 300`); the two terms are asserted
  // against the cells that ran, so neither can drift from the file again.
  assert.equal(ROW_CELLS.length, ROWS_OF_CHECKS,
    `the budget's first term is the number of row cells this file declares: declared `
    + `${ROWS_OF_CHECKS}, found ${ROW_CELLS.length}`);
  assert.ok(ROWS_OF_CHECKS * ROW_BUDGET <= MAX_ATTEMPTS_TOTAL,
    `the register's total budget stands at ${MAX_ATTEMPTS_TOTAL} attempts `
    + `(${ROWS_OF_CHECKS} row cells x ${ROW_BUDGET} attempts = ${ROWS_OF_CHECKS * ROW_BUDGET} <= ${MAX_ATTEMPTS_TOTAL})`);
  assert.ok(ROW_BUDGET <= MAX_ATTEMPTS_PER_ROW, 'and the per-row cap of one hundred is never exceeded');
  assert.equal(MAX_FAILURES_PER_ROW, 5, 'the stop rule is five failures per row');
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL, 'no run has drawn past the total budget');
  // ── BOTH DIRECTIONS, AND THE SECOND ONE IS THE ONE THAT WAS MISSING (`DR-10`, the gate-4 closure
  //    verification's finding): the check that stood here was `cited ⊆ declared` ALONE, so a DECLARED
  //    id with NO generator at all was INVISIBLE — `S-REC-RETAIN`, `S-ROLLBACK-FLOOR` and
  //    `S-ROLLBACK-TARGET` stood in exactly that hole. Direction (a) is unchanged; direction (b) is
  //    added, and the ids that no `row()` cell of this file cites stand in the NAMED list at the head
  //    of this section, each with its own reason.
  const cited = new Set();
  for (const cell of ROW_CELLS) {
    for (const id of cell.strategies) {
      assert.equal(DECLARED_STRATEGY_IDS.includes(id), true,
        `${cell.id} cites the strategy id ${JSON.stringify(id)}: every id a cell cites is one of the `
        + `twenty-seven ids \`contract.md §5.1\`–\`§5.8\` declare`);
      cited.add(id);
    }
  }
  const undrivable = UNDRIVABLE_BY_A_ROW_CELL.map((entry) => entry.id);
  for (const entry of UNDRIVABLE_BY_A_ROW_CELL) {
    assert.equal(DECLARED_STRATEGY_IDS.includes(entry.id), true,
      `the named undrivable list names a DECLARED id and never one of its own: ${entry.id}`);
    assert.equal(cited.has(entry.id), false,
      `${entry.id} stands in the named undrivable list, so no \`row()\` cell of this file may cite it: a `
      + 'cited id is GENERATED, and a generated id needs no place in that list');
    assert.equal(typeof entry.reason === 'string' && entry.reason.length >= 60, true,
      `every undrivable id carries its reason, and it is the reason and not a placeholder: ${entry.id} `
      + `carries ${JSON.stringify(entry.reason)}`);
  }
  for (const id of DECLARED_STRATEGY_IDS) {
    assert.equal(cited.has(id) || undrivable.includes(id), true,
      'AND THE SECOND DIRECTION: every id `contract.md §5.1`–`§5.8` declares either cites a `row()` '
      + `cell of this file or stands in the named undrivable list — ${id} stands in NEITHER; the three `
      + 'ids that stood in that hole before this pass are `S-REC-RETAIN`, `S-ROLLBACK-FLOOR` and '
      + '`S-ROLLBACK-TARGET`');
  }
  assert.equal(cited.size, 24,
    'the register\'s own first term: the ids the `row()` cells of this file cite, read off the cells');
  assert.equal(cited.size + undrivable.length, DECLARED_STRATEGY_IDS.length,
    `and the two sets CLOSE the register: ${cited.size} cited + ${undrivable.length} undrivable = `
    + `${DECLARED_STRATEGY_IDS.length} declared ids (${undrivable.join(', ')})`);
  // **⟶ THE DECLARED SET IS THE CONTRACT'S OWN, AND THE READING OF IT IS ASSERTED BEFORE IT IS USED
  // (2026-10-17, `role_test_writer`; GATE 4's ADVERSARIAL PASS).** **THE FALSIFIER: add a `28`th id to
  // `contract.md §5` — its own row's `Strategy ids` line — and THIS CELL FAILS at `IDS_PER_SECTION` (the
  // row's count moves) and at the closure below (an id neither cited nor named undrivable), where the
  // as-filed literals `27`/`24` could not see it at all.** **A TRUNCATED OR FAILED EXTRACTION IS BELOW THE
  // CONTRACT'S OWN FIGURES, so the closure can never close over an EMPTY reading.**
  const readCounts = CONTRACT_STRATEGY_ROWS.map((row) => `${row.section}:${row.ids.length}`).join(' · ');
  assert.deepEqual(CONTRACT_STRATEGY_ROWS.map((row) => row.ids.length), IDS_PER_SECTION,
    `the eight rows' own id counts, READ FROM \`contract.md\` BY THE ROW'S SECTION (${readCounts})`);
  assert.equal(new Set(DECLARED_STRATEGY_IDS).size, DECLARED_STRATEGY_IDS.length,
    'and every declared id is DISTINCT across the eight rows, so the closure is a set and not a multiset');
  assert.equal(DECLARED_STRATEGY_IDS.length, IDS_PER_SECTION.reduce((a, b) => a + b, 0),
    'and the declared set is the rows\' own: 3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-21` — THE REGISTER'S OWN CLOSURE, READ ONCE MORE AS ITS OWN CELL (`DR-10`'s second direction)
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * `contract.md §5.1`–`§5.8`, read at the register's own closure: **every strategy id the eight rows
 * declare is EITHER cited by a `row()` cell of this file OR named in `UNDRIVABLE_BY_A_ROW_CELL` with
 * its reason, and no id stands in BOTH** (`DR-10`; `DQ-13`'s realignment, whose own sentence — *"every
 * declared id of every row now has a generator in the red set or is reported as undrivable"* — this cell
 * asserts rather than describes).
 *
 * STATES ENUMERATED FIRST: (1) every declared id of the eight rows, `27`; (2) the ids cited by a `row()`
 * cell of this file, `24`; (3) the ids no such cell cites, each with its reason, `3` — `S-REC-RETAIN`
 * (the closed-attempt store's lifetime, `RC-3`, OPEN), `S-ROLLBACK-FLOOR` (a compacted journal base, a
 * store-state condition) and `S-ROLLBACK-TARGET` (a runtime-minted op id).
 *
 * FAIL STATES: a declared id with NO generator and NO place in the named list; an undrivable entry that
 * names an id the rows do not declare; an id that is BOTH cited and listed; an undrivable entry whose
 * reason is absent or is a placeholder.
 */
test('ck_p_neg_21_every_declared_strategy_id_cites_a_row_cell_or_stands_in_the_named_undrivable_list', () => {
  const cited = new Set();
  for (const cell of ROW_CELLS) for (const id of cell.strategies) cited.add(id);
  const undrivable = UNDRIVABLE_BY_A_ROW_CELL.map((entry) => entry.id);
  const uncovered = DECLARED_STRATEGY_IDS.filter((id) => !cited.has(id) && !undrivable.includes(id));
  assert.deepEqual(uncovered, [],
    'EVERY declared id of `contract.md §5.1`–`§5.8` either cites a `row()` cell or stands in the named '
    + `undrivable list — ${uncovered.length} stand in NEITHER: ${uncovered.join(', ')}`);
  assert.deepEqual(undrivable, ['S-REC-RETAIN', 'S-ROLLBACK-FLOOR', 'S-ROLLBACK-TARGET'],
    'and the three ids that stand in the named list are THE THREE, enumerated by name: the register '
    + 'declares `27` ids, the `row()` cells of this file cite `24` of them, and no fourth id is undrivable');
  assert.deepEqual(DECLARED_STRATEGY_IDS.filter((id) => cited.has(id) && undrivable.includes(id)), [],
    'and no id stands in BOTH: a cited id is GENERATED and an undrivable id is not');
  assert.equal(cited.size, 24, 'the register\'s own first term, read off the cells');
  assert.equal(cited.size + undrivable.length, DECLARED_STRATEGY_IDS.length,
    `the register's closure: ${cited.size} + ${undrivable.length} = ${DECLARED_STRATEGY_IDS.length}`);
  // **AND THE `27` THE ARITHMETIC ABOVE CLOSES OVER IS A READING OF `contract.md §5`, NOT A LITERAL TYPED
  // HERE (2026-10-17, `role_test_writer`; GATE 4's ADVERSARIAL PASS): THE IDS ARE EXTRACTED FROM THE EIGHT
  // ROWS' OWN `Strategy ids` LINES, so a `28`th id landing in the contract makes BOTH closure cells fail
  // instead of moving nothing.**
  assert.deepEqual(CONTRACT_STRATEGY_ROWS.map((row) => row.section), ['§5.1', '§5.2', '§5.3', '§5.4', '§5.5', '§5.6', '§5.7', '§5.8'],
    'the eight rows are read at their own sections, in the register\'s own order');
  assert.deepEqual(CONTRACT_STRATEGY_ROWS.map((row) => row.ids.length), IDS_PER_SECTION,
    'and each row\'s own `Strategy ids` line carries the count the register\'s census prints for it');
  assert.equal(DECLARED_STRATEGY_IDS.length, IDS_PER_SECTION.reduce((a, b) => a + b, 0),
    'the declared set read from the contract bytes: 3 + 4 + 3 + 3 + 4 + 3 + 4 + 3 = 27');
  for (const entry of UNDRIVABLE_BY_A_ROW_CELL) {
    assert.equal(typeof entry.reason === 'string' && entry.reason.length >= 60, true,
      `every undrivable id carries the reason it is undrivable by: ${entry.id} carries `
      + `${JSON.stringify(entry.reason)}`);
  }
});

