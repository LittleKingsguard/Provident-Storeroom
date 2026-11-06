// tests/e2e/tier-readout-properties.test.mjs
//
// GATE 11 — **THE TYPED PROPERTY LAYER FOR `U-STOREROOM-TIER-READOUT`**: the `3` rows of
// `docs/specs/storeroom-tier-readout/verification.md §3` (`P-TRO-1`…`P-TRO-3`) EXECUTED WITH A
// DETERMINISTIC PINNED SEED. **A REAL REGISTER IS OWED AND `ZERO-ROW` IS UNAVAILABLE: the predicates are
// executable and this unit is code-bearing** (`contract.md §3`, gate 11).
//
// **BUDGET:** `≤ 100` attempts per row, `≤ 400` total, **STOP AFTER `5`** failures per row, one seed PER ROW
// pinned as a literal, no clock, no `Math.random`, no host entropy. A row that breaks stops that row's
// attempts and reports the row id, its strategy ids, its pinned seed and the failing input. **`un-run` IS A
// FAILURE**: every row below is driven, and a row whose attempts all break FAILS this file.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE GENERATOR'S ALPHABET IS THE ADMITTED SET AND NOTHING ELSE.** `verification.md §3`'s own correction
// (`P-TRO-1`'s alphabet clause) is the law here: a value the write does not admit would build a tree no
// lawful write can stand, and the row would fail for a reason the row is not about. **So the generator emits
// ONLY: a FINITE number, a string, a boolean, a dense array of admitted values, a plain object of admitted
// values, the empty object and the empty array** — and `null`, `NaN`, `±Infinity`, a function, a `BigInt`, a
// cyclic structure and any non-plain collection are OUT, refused by `src/value.rs:39`–`:47`'s fall-through
// arm and answered `ValueNotAdmitted` at `src/store.rs:2309`–`:2311`.
//
// **THE THREE ROWS, AS THE REGISTER PRINTS THEM:**
//
// | row | its strategy | its property |
// | --- | --- | --- |
// | `P-TRO-1` | `S-SHAPE-TOTALITY` | the shape is total: an OBJECT answer, one `_tier` from the three tokens, and exactly the member names the node's KIND fixes |
// | `P-TRO-2` | `S-STRIP` | stripping the compilation yields EXACTLY `read`'s answer — whose only declared exception is a stored `_tier`, which `read` still answers |
// | `P-TRO-3` | `S-REFUSAL-SET` | the compilation cannot fail: an answer, or one of the FIVE declared statuses, and no sixth and no non-refusal throw |
//
// **NO CELL BELOW ASSERTS THAT `_tier` IS A SET OR A COUNT, AN OMITTED MEMBER'S `_tier`, A RULE FOR THE
// WRITE-BACK, OR THE GUIDE'S UNQUALIFIED-READ SENTENCE** (`verification.md §2.3`'s three prohibitions), and
// **not one byte of any `docs/**` path is opened at runtime** (`D-17`): every clause this file names is a
// literal written here. The entry is reached by PATH (`../../bindings/js/index.mjs`), the `O4` route.
//
// **THE SHAPE ORACLE IS `read`, AND IT IS THE ONLY ONE AVAILABLE TO A BLIND ROW:** `PIN-6` (i) moves neither
// of the two existing read verbs, so `read(a, t)`'s own answer tells a row what KIND the node at `a` is
// (array, plain object, or a literal) without this file knowing a byte of the new verb's code. The three
// rows are red at `HEAD` because the verb is absent, and green only after it lands.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

// ── THE DETERMINISTIC PINNED SEEDS — ONE PER ROW, A LITERAL EACH.
const SEEDS = {
  'P-TRO-1': 0x54524F01,
  'P-TRO-2': 0x54524F02,
  'P-TRO-3': 0x54524F03,
};

const MAX_FAILURES_PER_ROW = 5;
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;
/** THE REGISTER'S OWN ROW COUNT (`verification.md §3`: `P-TRO-1`…`P-TRO-3`, three rows). */
const ROWS_OF_CHECKS = 3;
/** THE EVEN SHARE OF THE `400`-ATTEMPT TOTAL, CAPPED AT THE PER-ROW `100`: `3 x 100 = 300 ≤ 400` ✓. */
const ROW_BUDGET = Math.min(MAX_ATTEMPTS_PER_ROW, Math.floor(MAX_ATTEMPTS_TOTAL / ROWS_OF_CHECKS));

const THREE_TOKENS = ['file', 'mem', 'temp'];
/** The store's own persistence order — `rank(file) = 2 > rank(mem) = 1 > rank(temp) = 0`
 *  (`src/records.rs:26`–`:33`). **A child's rank is at most its parent's** (`A27`), so a re-write below a
 *  node may only move DOWN this ladder. */
const RANK = { temp: 0, mem: 1, file: 2 };
/** The five statuses this unit inherits from `read` and mints no sixth of (`PIN-7` (i)–(ii)). */
const FIVE_STATUSES = ['AddressMalformed', 'AddressNotFound', 'TierNotFound', 'LeafHasNoDownstream', 'OutOfDomainTier'];

let totalAttempts = 0;
const ROW_CELLS = [];

// ── THE DETERMINISTIC GENERATOR — `mulberry32`, a PURE FUNCTION OF THE SEED, and the same draws every run.
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
  return `${label}-${process.pid.toString(36)}-${UID}`;
}

/** THE ROW RUNNER: at most `ROW_BUDGET` attempts, stopping after `MAX_FAILURES_PER_ROW` failures, reporting
 *  the row id, the strategy ids it was driven under, its pinned seed and the attempts it ran. */
function row({ id, strategies, seed, body }) {
  ROW_CELLS.push({ id, strategies, attempts: ROW_BUDGET });
  const next = rngFor(seed);
  const failures = [];
  let ran = 0;
  for (let i = 0; i < ROW_BUDGET && failures.length < MAX_FAILURES_PER_ROW; i += 1) {
    ran += 1;
    try {
      body(next, i);
    } catch (err) {
      failures.push({ attempt: i, message: err && err.message ? err.message : String(err) });
    }
  }
  return { id, strategies, seed, attempts: ran, failures };
}

function assertHeld(result) {
  if (result.failures.length === 0) return;
  assert.fail(
    `BROKEN (${result.id} · ${result.strategies.join(' · ')} · seed 0x${result.seed.toString(16)} · `
    + `${result.failures.length} break(s) in ${result.attempts} attempt(s); first: ${result.failures[0].message})`,
  );
}

/** THE ATTEMPT COUNTER, so the file's own total budget is a real ceiling and not a comment. */
function attemptCount() {
  totalAttempts += 1;
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL, `the total attempt budget stands at ${MAX_ATTEMPTS_TOTAL} — read ${totalAttempts}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE GENERATOR — the ADMITTED alphabet alone, at depth up to `4`, plus the three trees that CARRY a stored
// `_tier` (`P-TRO-2`'s own generator clause)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** A FINITE number, a string and a boolean — the admitted leaves, and the ONLY leaves this generator makes.
 *  `null`, `NaN`, `±Infinity`, a function and a `BigInt` are excluded by `src/value.rs:39`–`:47`. */
const ADMITTED_LEAVES = ['a-string', '', 'two words', 'file', 0, 7, -3, 1.5, true, false];

/** THE KEY ALPHABET — plain strings, and it DELIBERATELY carries `_tier` and `value`, because a caller's own
 *  member at either name is a state `PIN-5` decides and a row that never drew one would not test it. */
const KEY_ALPHABET = ['a', 'b', 'c', 'inner', 'list', 'value', '_tier'];

/** **THE GENERATED TREE.** `depth` counts the levels still allowed BELOW the node being built, so `depth 4`
 *  is the register prints' "at depth up to `4`". Every arm builds a value the write ADMITS. */
function genValue(next, depth) {
  const leavesOnly = depth <= 0;
  const kinds = leavesOnly
    ? ['leaf', 'leaf', 'leaf']
    : ['leaf', 'leaf', 'array', 'object', 'object', 'empty-map', 'empty-vec'];
  switch (pick(next, kinds)) {
    case 'leaf':
      return pick(next, ADMITTED_LEAVES);
    case 'array': {
      const count = intBetween(next, 0, 2);
      const out = [];
      for (let i = 0; i < count; i += 1) out.push(genValue(next, depth - 1));
      return out;
    }
    case 'object': {
      const count = intBetween(next, 0, 2);
      const out = {};
      for (let i = 0; i < count; i += 1) out[pick(next, KEY_ALPHABET)] = genValue(next, depth - 1);
      return out;
    }
    case 'empty-map':
      return {};
    case 'empty-vec':
      return [];
    /* c8 ignore next */
    default:
      throw new Error('the generator drew a kind it does not carry');
  }
}

/** **A TREE THAT CARRIES A STORED `_tier` AT THE ROOT, AT AN INTERIOR NODE AND AT A NESTED NODE** —
 *  `P-TRO-2`'s own generator clause, and the three kinds are all sampled at the collided name so the
 *  exception is driven at a LEAF `_tier`, an OBJECT `_tier` and an ARRAY `_tier` alike. */
function genStoredTierTree(next) {
  return {
    _tier: pick(next, ['a-string', 'file', 'mem']),
    inner: {
      _tier: { note: pick(next, ADMITTED_LEAVES) },
      leafy: pick(next, ADMITTED_LEAVES),
    },
    deep: {
      arr: { _tier: [intBetween(next, 0, 9), pick(next, ADMITTED_LEAVES)] },
      tail: pick(next, ADMITTED_LEAVES),
    },
  };
}

/** THE ADDRESSES A WRITTEN TREE CARRIES — the generator's own `a ∈ T`, the empty address excluded (it is
 *  drawn separately at every row, because `P-TRO-1` says *"the empty address included"*). */
function addressesOf(value, prefix) {
  const out = [prefix];
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) out.push(...addressesOf(value[index], [...prefix, index]));
  } else if (value !== null && typeof value === 'object') {
    for (const key of Object.keys(value)) out.push(...addressesOf(value[key], [...prefix, key]));
  }
  return out;
}

/** The value standing at an address inside a tree the generator built — used to RE-WRITE that node at a
 *  second tier without changing the tree's shape. */
function valueAt(value, path) {
  let node = value;
  for (const segment of path) node = node[segment];
  return node;
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE TIER ARGUMENTS — the register's own four drawn shapes, each spelled as a call of the verb
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE FOUR ARGUMENT SHAPES `verification.md §3` names** — *"arguments over `{absent, one token, a
 *  2-token set, the 0-token set}`"* — each applied to a one-address call. **ABSENT AND THE 0-TOKEN SET ARE
 *  TWO DIFFERENT CALLS AND BOTH ARE DRAWN**: `read(a)` and `read(a, [])` are the same arm at `src/args.rs`'s
 *  reader (`:199` versus `:210`–`:215`), and a row that conflated them would not test the second. */
const TIER_ARGUMENTS = [
  { label: 'ABSENT', apply: (call) => call() },
  { label: "the one token 'mem'", apply: (call) => call('mem') },
  { label: "the one token 'temp'", apply: (call) => call('temp') },
  { label: "the one token 'file'", apply: (call) => call('file') },
  { label: "the 2-token set ['mem','temp']", apply: (call) => call(['mem', 'temp']) },
  { label: "the 2-token set ['file','mem']", apply: (call) => call(['file', 'mem']) },
  { label: 'the 0-token set []', apply: (call) => call([]) },
];
const TIER_ARGUMENT_ABSENT = 0;

/** ONE CALL of `store[verb]` at `address` under one drawn argument shape, CLASSIFIED. */
function callVerb(store, verb, address, argument) {
  const call = (...extra) => store[verb](address, ...extra);
  try {
    return { answered: true, value: argument.apply(call) };
  } catch (thrown) {
    return { answered: false, err: thrown };
  }
}

function statusOf(result) {
  return result.answered ? '<no refusal>' : (result.err && result.err.status) || `<no status: ${result.err && result.err.message}>`;
}

function ownNames(value) {
  return value !== null && typeof value === 'object' ? Object.getOwnPropertyNames(value).sort() : [];
}

/** THE DRIVE'S OWN FIXTURE — a `file` register, so all three tokens are standable, with the two required
 *  `cfg` keys spelled and `filePath` supplied. One per row, disposed with the row's cell. */
function fileRegister() {
  const dir = mkdtempSync(join(tmpdir(), 'tro-prop-'));
  const store = storeCreate({ journalLength: 4096, listeners: [], filePath: join(dir, 'store.json') });
  return { store, dispose: () => rmSync(dir, { recursive: true, force: true }) };
}

/**
 * **THE DRIVE EVERY ROW SHARES — one generated tree, written at a drawn tier and RE-WRITTEN at two interior
 * paths at tiers the monotonicity clause permits, so a single answer carries nodes at more than one tier.**
 * It answers the addresses the tree stands at, `[]` included.
 */
function buildTree(store, next, rowId, attempt) {
  const rootKey = tag(`${rowId}-${attempt}`);
  const storedTier = attempt % 4 === 3;
  const tree = storedTier ? genStoredTierTree(next) : genValue(next, 4);
  const rootTier = pick(next, THREE_TOKENS);
  store.write([rootKey], rootTier, tree);

  // ── TWO INTERIOR RE-WRITES, each at a tier at most the rank of its NEAREST RE-WRITTEN ANCESTOR and at most
  // the root's own (`A27`'s monotonic clause: *"a child anchor may not be more persistent than its parent"*).
  // **THE BOUND IS CARRIED DOWN AS THE WRITES GO**, because a second re-write deeper than the first must obey
  // the tier the FIRST one made and not the root's alone.
  const rewritten = [];
  const boundFor = (address) => {
    let bound = RANK[rootTier];
    for (const [prefix, tier] of rewritten) {
      const isPrefix = prefix.length <= address.length && prefix.every((segment, index) => segment === address[index]);
      if (isPrefix) bound = Math.min(bound, RANK[tier]);
    }
    return bound;
  };
  const inner = addressesOf(tree, [rootKey]).filter((address) => address.length > 1);
  for (let k = 0; k < 2 && inner.length > 0; k += 1) {
    const address = pick(next, inner);
    const permitted = THREE_TOKENS.filter((token) => RANK[token] <= boundFor(address));
    const tier = pick(next, permitted);
    store.write(address, tier, valueAt(tree, address.slice(1)));
    rewritten.push([address, tier]);
  }

  const addresses = addressesOf(tree, [rootKey]);
  return { rootKey, tree, rootTier, addresses, storedTier };
}

/** The address a row drives: one of the tree's own, or — drawn at a stated rate — the EMPTY address, which
 *  `P-TRO-1` names explicitly (*"the empty address included"*). */
function drawAddress(next, addresses) {
  return next() < 0.1 ? [] : pick(next, addresses);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TRO-1` · `S-SHAPE-TOTALITY` — THE TOTALITY OF THE SHAPE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('P-TRO-1 · `S-SHAPE-TOTALITY` · THE TOTALITY OF THE SHAPE: for every generated admitted tree, every address in it (the empty address included) and every tier argument, `readTiered(a, t)` is an OBJECT carrying exactly one `_tier` from the three tokens and exactly the member names the node\'s KIND fixes', (t) => {
  const file = fileRegister();
  t.after(() => file.dispose());

  const result = row({
    id: 'P-TRO-1',
    strategies: ['S-SHAPE-TOTALITY'],
    seed: SEEDS['P-TRO-1'],
    body: (next, i) => {
      attemptCount();
      const { addresses } = buildTree(file.store, next, 'ptro1', i);
      const address = drawAddress(next, addresses);
      const argument = pick(next, TIER_ARGUMENTS);
      const where = `attempt ${i}: address ${JSON.stringify(address)} · argument ${argument.label}`;

      const plain = callVerb(file.store, 'read', address, argument);
      const tiered = callVerb(file.store, 'readTiered', address, argument);

      // ── THE WALK IS `read`'s OWN, SO AN ANSWER EXISTS WHERE `read` ANSWERS (`D-121-ter` item 5: *"its only
      // difference the compilation of the answer"*). Where `read` refuses at a walk step this verb refuses the
      // same way — that limb is `P-TRO-3`'s, and it is asserted here only as the pair's coherence.
      if (!plain.answered) {
        assert.equal(tiered.answered, false, `${where}: the same walk answers the same way — \`read\` refused ${statusOf(plain)} and this verb ANSWERED ${JSON.stringify(tiered.value)}`);
        return;
      }

      // ── (1) THE ANSWER IS AN OBJECT, AT EVERY ADDRESS THIS ROW DRIVES — and because `a` ranges over EVERY
      // address of `T`, this one assertion is the totality of the shape at EVERY node of every answer.
      assert.equal(tiered.answered, true, `${where}: the answer is total — \`read\` answered and this verb refused ${statusOf(tiered)}`);
      const answer = tiered.value;
      assert.equal(
        answer !== null && typeof answer === 'object' && !Array.isArray(answer),
        true,
        `${where}: every node of the answer is an OBJECT and no node is a primitive or a bare array (\`PIN-3\` (i)) — read ${JSON.stringify(answer)}`,
      );

      // ── (2) EXACTLY ONE `_tier`, AND IT IS ONE OF THE THREE TOKENS — never a set, never a count, never an
      // array and never a fourth token (`PIN-4` (ii), `PIN-4` (v)).
      const names = ownNames(answer);
      assert.equal(names.includes('_tier'), true, `${where}: an \`_tier\` is present at EVERY node (\`PIN-3\` (ii)) — read ${JSON.stringify(names)}`);
      assert.equal(names.filter((name) => name === '_tier').length, 1, `${where}: exactly ONE member stands at the minted name`);
      assert.equal(typeof answer._tier, 'string', `${where}: \`_tier\` is a STRING and never an array (\`PIN-4\` (ii)) — read ${JSON.stringify(answer._tier)}`);
      assert.equal(THREE_TOKENS.includes(answer._tier), true, `${where}: the token is one of \`file\` · \`mem\` · \`temp\` and no fourth (\`PIN-4\` (v)) — read ${JSON.stringify(answer._tier)}`);

      // ── (3) THE OTHER MEMBER NAMES ARE EXACTLY THE SET THE NODE'S KIND FIXES. The kind is LEARNED FROM
      // `read`'s own answer, which this unit does not move (`PIN-6` (i)).
      const plainAnswer = plain.value;
      if (Array.isArray(plainAnswer)) {
        assert.deepEqual(names, ['_tier', 'value'], `${where}: the ARRAY kind carries exactly \`_tier\` and \`value\` (\`PIN-3\`'s table) — read ${JSON.stringify(names)}`);
        assert.equal(Array.isArray(answer.value), true, `${where}: and \`value\` is an array`);
        assert.equal(answer.value.length, plainAnswer.length, `${where}: of the same length as the read's array — read ${answer.value.length}`);
      } else if (plainAnswer !== null && typeof plainAnswer === 'object') {
        const storedKeys = Object.keys(plainAnswer).filter((key) => key !== '_tier');
        assert.deepEqual(names, [...['_tier'], ...storedKeys].sort(), `${where}: the OBJECT kind carries its stored key set minus \`_tier\` plus the minted \`_tier\` (\`PIN-3\`, \`PIN-5\` (iii)) — read ${JSON.stringify(names)}`);
      } else {
        assert.deepEqual(names, ['_tier', 'value'], `${where}: the LEAF kind carries exactly \`_tier\` and \`value\` (\`PIN-3\`'s table) — read ${JSON.stringify(names)}`);
      }
    },
  });

  t.diagnostic(`P-TRO-1 · seed 0x${result.seed.toString(16)} · ${result.attempts} attempts · ${result.failures.length} break(s)`);
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TRO-2` · `S-STRIP` — THE COMPILATION IS A DECORATION OF THE READ'S OWN ANSWER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * **STRIPPING THE COMPILATION.** Delete every minted `_tier` and unwrap every `{ value }` at an ARRAY or a
 * LEAF node, and what is left must be EXACTLY `read`'s answer. **THE KIND IS LEARNED FROM `read`'s ANSWER AT
 * THE SAME ADDRESS**, so the stripper has no opinion of its own about which form a node carries.
 *
 * **AND THE ONE DECLARED EXCEPTION IS APPLIED HERE, ONCE:** a stored member named `_tier` is not restored by
 * stripping (`PIN-5` (i)) and is recovered by calling `read`, which this row asserts directly (`PIN-5` (ii)).
 */
function stripCompiled(compiled, plain, where) {
  assert.equal(
    compiled !== null && typeof compiled === 'object' && !Array.isArray(compiled),
    true,
    `${where}: every node of the answer is an OBJECT (\`PIN-3\` (i)) — read ${JSON.stringify(compiled)}`,
  );
  if (Array.isArray(plain)) {
    assert.deepEqual(ownNames(compiled), ['_tier', 'value'], `${where}: the ARRAY kind's member set, before unwrapping — read ${JSON.stringify(ownNames(compiled))}`);
    assert.equal(Array.isArray(compiled.value), true, `${where}: \`value\` is an array`);
    assert.equal(compiled.value.length, plain.length, `${where}: and it is the same length as the read's — read ${compiled.value.length}`);
    return plain.map((element, index) => stripCompiled(compiled.value[index], element, `${where}.value[${index}]`));
  }
  if (plain !== null && typeof plain === 'object') {
    const out = {};
    for (const key of Object.keys(plain)) {
      if (key === '_tier') continue; // THE ONE DECLARED EXCEPTION
      assert.equal(Object.prototype.hasOwnProperty.call(compiled, key), true, `${where}: the stored member \`${key}\` is DELIVERED — a lost stored member is this row's falsifier — read ${JSON.stringify(ownNames(compiled))}`);
      out[key] = stripCompiled(compiled[key], plain[key], `${where}.${key}`);
    }
    return out;
  }
  assert.deepEqual(ownNames(compiled), ['_tier', 'value'], `${where}: the LEAF kind's member set, before unwrapping — read ${JSON.stringify(ownNames(compiled))}`);
  return compiled.value;
}

/** The SAME exception, applied to `read`'s own answer, so the two sides of the equality are read under one
 *  rule: a stored `_tier` is present in `read`'s answer and absent from the stripped compilation, by
 *  declaration and not by defect. */
function stripStoredTier(plain) {
  if (Array.isArray(plain)) return plain.map(stripStoredTier);
  if (plain !== null && typeof plain === 'object') {
    const out = {};
    for (const key of Object.keys(plain)) {
      if (key === '_tier') continue;
      out[key] = stripStoredTier(plain[key]);
    }
    return out;
  }
  return plain;
}

test('P-TRO-2 · `S-STRIP` · THE COMPILATION IS A DECORATION OF THE READ\'S OWN ANSWER: stripping every minted `_tier` and unwrapping every `{ value }` at an array or a leaf yields EXACTLY `read(a, t)`\'s answer, with the ONE declared exception — a stored member named `_tier` is not restored by stripping and is recovered by calling `read`, which this row asserts directly', (t) => {
  const file = fileRegister();
  t.after(() => file.dispose());

  const result = row({
    id: 'P-TRO-2',
    strategies: ['S-STRIP'],
    seed: SEEDS['P-TRO-2'],
    body: (next, i) => {
      attemptCount();
      const built = buildTree(file.store, next, 'ptro2', i);
      const address = drawAddress(next, built.addresses);
      const argument = pick(next, TIER_ARGUMENTS);
      const where = `attempt ${i}: address ${JSON.stringify(address)} · argument ${argument.label}`;

      const plain = callVerb(file.store, 'read', address, argument);
      const tiered = callVerb(file.store, 'readTiered', address, argument);
      if (!plain.answered) {
        assert.equal(tiered.answered, false, `${where}: the same walk answers the same way — \`read\` refused ${statusOf(plain)} and this verb ANSWERED ${JSON.stringify(tiered.value)}`);
        return;
      }
      assert.equal(tiered.answered, true, `${where}: \`read\` answered, so this verb answers — it refused ${statusOf(tiered)}`);

      // ── THE STRIP, AND THE EQUALITY IT MUST PRODUCE.
      const stripped = stripCompiled(tiered.value, plain.value, where);
      assert.deepEqual(stripped, stripStoredTier(plain.value), `${where}: stripping the compilation yields EXACTLY \`read\`'s answer under the one declared exception — stripped ${JSON.stringify(stripped)} vs read ${JSON.stringify(stripStoredTier(plain.value))}`);

      // ── AND NOTHING BUT `_tier` MAY BE LOST: the strip above already refuses a lost stored member, and
      // this limb names the SHAPE of the loss AT THE ONE KIND THAT CARRIES MEMBERS — a compilation that
      // renamed or dropped a member of an OBJECT node changes its key set, and a `value` wrapper minted there
      // would show up as an extra name. **At the ARRAY and LEAF kinds `value` IS the declared wrapper**, so
      // that kind's member set is `PIN-3`'s and not this comparison's (`P-TRO-1` asserts it at every address).
      if (plain.value !== null && typeof plain.value === 'object' && !Array.isArray(plain.value)) {
        assert.deepEqual(
          ownNames(tiered.value).filter((name) => name !== '_tier'),
          ownNames(plain.value).filter((name) => name !== '_tier'),
          `${where}: the ONLY name the compilation can add or shadow is \`_tier\` (\`PIN-5\` (iv)) — read ${JSON.stringify(ownNames(tiered.value))} against ${JSON.stringify(ownNames(plain.value))}`,
        );
      }

      // ── AND `read` STILL ANSWERS EVERYTHING IT ANSWERED, the stored `_tier` included (`PIN-5` (ii)):
      // this row's falsifier is *"a stored `_tier` that `read` no longer answers"*.
      const reread = callVerb(file.store, 'read', address, argument);
      assert.equal(reread.answered, true, `${where}: \`read\` still answers at this address — it refused ${statusOf(reread)}`);
      assert.deepEqual(reread.value, plain.value, `${where}: and answers the same tree, byte for byte — a moved \`read\` is this row's falsifier — read ${JSON.stringify(reread.value)}`);
    },
  });

  t.diagnostic(`P-TRO-2 · seed 0x${result.seed.toString(16)} · ${result.attempts} attempts · ${result.failures.length} break(s)`);
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-TRO-3` · `S-REFUSAL-SET` — THE COMPILATION CANNOT FAIL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('P-TRO-3 · `S-REFUSAL-SET` · THE COMPILATION CANNOT FAIL: for every generated tree, every address and every argument the answer is either a compiled form or one of the FIVE declared statuses — no sixth status, no `ReadTargetIsBranch`, no thrown non-refusal and no failure produced by a DESCENDANT the caller did not name', (t) => {
  const file = fileRegister();
  t.after(() => file.dispose());

  const result = row({
    id: 'P-TRO-3',
    strategies: ['S-REFUSAL-SET'],
    seed: SEEDS['P-TRO-3'],
    body: (next, i) => {
      attemptCount();
      const built = buildTree(file.store, next, 'ptro3', i);
      const argument = pick(next, TIER_ARGUMENTS);

      // ── THE FOUR ADDRESS SHAPES THE REGISTER NAMES, drawn one per attempt, alongside an address of the
      // tree itself: *"addresses that terminate at a leaf with segments remaining, at a missing key, at an
      // out-of-set tier, and outside the segment domain"*.
      const base = drawAddress(next, built.addresses);
      const shapes = [
        // (a) AN ADDRESS OF THE TREE ITSELF — the ordinary arm, so the row is not all refusals.
        () => ({ label: 'an address of the tree', address: base }),
        // (b) TERMINATING AT A LEAF WITH SEGMENTS REMAINING (`L-4`).
        () => ({ label: 'a leaf with segments remaining', address: [...base, pick(next, KEY_ALPHABET)] }),
        // (c) A MISSING KEY (`L-3`) — a segment no write ever made.
        () => ({ label: 'a missing key', address: [...base, `absent-${intBetween(next, 0, 999)}`] }),
        // (d) OUTSIDE THE SEGMENT DOMAIN (`L-1`) — a fractional index, a negative index and a non-scalar.
        () => ({ label: 'a segment outside the domain', address: [...base, pick(next, [{}, 1.5, -1, true])] }),
        // (e) THE EMPTY ADDRESS, which is `L-0` and is always in domain (`PIN-8` (ii)).
        () => ({ label: 'the empty address', address: [] }),
      ];
      const { label, address } = pick(next, shapes)();
      const where = `attempt ${i}: ${label} ${JSON.stringify(address)} · argument ${argument.label}`;

      const tiered = callVerb(file.store, 'readTiered', address, argument);

      // ── (1) AN ANSWER, OR ONE OF THE FIVE — and no sixth status.
      if (tiered.answered) {
        const answer = tiered.value;
        assert.equal(answer !== null && typeof answer === 'object' && !Array.isArray(answer), true, `${where}: a refusal is the ONLY way this verb declines — an answer is always an OBJECT (\`PIN-3\` (i)) — read ${JSON.stringify(answer)}`);
        assert.equal(THREE_TOKENS.includes(answer._tier), true, `${where}: and it carries an \`_tier\` from the three tokens — read ${JSON.stringify(answer._tier)}`);
        return;
      }
      const status = statusOf(tiered);
      assert.equal(FIVE_STATUSES.includes(status), true, `${where}: NO SIXTH STATUS IS REACHABLE — the closed set is five, all of them \`read\`'s own (\`PIN-7\` (i)–(ii)) — read ${JSON.stringify(status)}`);
      assert.notEqual(status, 'ReadTargetIsBranch', `${where}: \`ReadTargetIsBranch\` is \`readLiteral\`'s narrowing and this verb has none (\`PIN-7\` (iv))`);

      // ── (2) AND NO THROWN NON-REFUSAL: the declared form is a plain object carrying `status` · `message` ·
      // `log` · `address`, and never an `Error` (the store's own single form, carried and never minted here).
      assert.equal(tiered.err instanceof Error, false, `${where}: a thrown non-refusal is this row's falsifier — read ${Object.prototype.toString.call(tiered.err)}`);
      assert.equal(typeof tiered.err.status, 'string', `${where}: the refusal is the store's own form, carrying \`status\``);
      assert.equal(typeof tiered.err.message, 'string', `${where}: and a STRING \`message\``);
      assert.equal(Array.isArray(tiered.err.log), true, `${where}: and an ARRAY \`log\``);

      // ── (3) AND NO DESCENDANT PRODUCES THE CODE: whatever the address refused with, the SAME address under
      // `read` refuses with the same status — the walk is one walk, so a status that only the compilation
      // could produce would show up here as a disagreement.
      const plain = callVerb(file.store, 'read', address, argument);
      assert.equal(plain.answered, false, `${where}: the same walk refuses the same address — \`read\` ANSWERED ${JSON.stringify(plain.value)} where this verb refused ${JSON.stringify(status)}`);
      assert.equal(statusOf(plain), status, `${where}: and with the same status — read ${JSON.stringify(statusOf(plain))} against ${JSON.stringify(status)}`);
    },
  });

  t.diagnostic(`P-TRO-3 · seed 0x${result.seed.toString(16)} · ${result.attempts} attempts · ${result.failures.length} break(s)`);
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE REGISTER'S OWN CLOSURE — every row above was DRIVEN, and no row was skipped
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('P-TRO closure · `verification.md §3` · EVERY ROW OF THE REGISTER WAS DRIVEN AND NO ROW WAS SKIPPED: the three rows stand, each with its pinned seed, and the file\'s own attempt ceiling held', (t) => {
  t.diagnostic(`P-TRO closure · ${ROW_CELLS.length} row cell(s) registered: ${JSON.stringify(ROW_CELLS)} · ${totalAttempts} attempt(s) taken of the ${MAX_ATTEMPTS_TOTAL} ceiling`);
  assert.equal(ROW_CELLS.length, ROWS_OF_CHECKS, 'the register carries three rows and this file drove three');
  assert.deepEqual(ROW_CELLS.map((cell) => cell.id), ['P-TRO-1', 'P-TRO-2', 'P-TRO-3']);
  for (const cell of ROW_CELLS) {
    assert.equal(cell.strategies.length >= 1, true, `${cell.id} names at least one strategy`);
    assert.equal(cell.attempts > 0, true, `${cell.id} was DRIVEN — \`un-run\` is a failure`);
  }
  assert.ok(totalAttempts > 0, 'the file took attempts, so no row is `un-run`');
});
