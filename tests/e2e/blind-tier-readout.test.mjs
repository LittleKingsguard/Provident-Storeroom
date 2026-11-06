// tests/e2e/blind-tier-readout.test.mjs
//
// **BLIND INSTRUMENT — AND IT WAS WRITTEN BEFORE THE VERB EXISTED.** There is no implementation of
// `readTiered` in this tree on the day this file was authored: `typeof store.readTiered` is `'undefined'`
// at `HEAD`, the instance's own member set reads fourteen, and no byte of `src/**`, of `bindings/js/src/**`
// or of the member position this file's subject will occupy was read to author a cell here. **THE CELL IS
// THEREFORE RED AT `HEAD` — it fails because the verb is absent, which is the right reason — and it goes
// GREEN only when the verb lands.** That is the gate-5 standing `docs/specs/storeroom-tier-readout/
// contract.md §3` records as `OWED`, written before the thing it is blind to.
//
// PROVENANCE. Every expectation below is authored from the STATEMENT and from the DECLARED SURFACE and from
// nothing else:
//   · `docs/specs/storeroom-tier-readout/verification.md §2.3` — `TRO-B1`, the statement this file is: *"THE
//     TOTAL SHAPE, OVER A LISTED SET OF TREES NOBODY WROTE FOR THE CELL. Six trees — a scalar root · a
//     nested object · a nested array · an object holding an array holding an object · an empty `MAP` · an
//     empty `VEC` (both reached by a delete of every child) — each driven once: for each, the answer's node
//     forms, the member names per node, and the `_tier` token per node are collected and checked against the
//     three-form rule and the three tokens."*
//   · `docs/specs/storeroom-tier-readout/contract.md` `PIN-3` — the three node forms and the member names
//     each kind fixes: `object → { _tier, …members }` · `array → { _tier, value: [ … ] }` ·
//     `leaf → { _tier, value: <the literal> }`, with *"EVERY NODE OF THE ANSWER IS AN OBJECT"*, *"an `_tier`
//     is present at EVERY node without exception"* and *"there is no fourth form and no optional member"*.
//   · `PIN-4` (ii)/(v) — the referent is a SINGULAR and the tokens are the store's own three, `file` · `mem`
//     · `temp`, *"no fourth token, no capitalisation, no abbreviation, no `null`"*.
//   · `PIN-5` (iii) — a stored member named `_tier` "is not delivered at that node", so a node's OTHER names
//     are its stored key set with `_tier` removed.
//   · `bindings/js/index.mjs`'s DECLARED SURFACE for `storeCreate`, `write`, `read` and `delete` — the three
//     verbs this file drives to BUILD the trees and to read the SHAPE ORACLE. `read` is the oracle because
//     this unit does not move it (`PIN-6` (i)); the cell uses it to learn a node's KIND and never to check
//     the new verb's own reading.
//
// **WHAT THIS FILE DOES NOT DO, NAMED SO A GREEN IS NOT BOUGHT CHEAPLY:** it asserts no `_tier` as a SET or a
// COUNT; no omitted member's `_tier`; nothing about the write-back; and not one byte of any `docs/**` path is
// opened at runtime (`D-17`). **AND NO TREE IS SPECIAL-CASED:** the six drives below pass through ONE
// walker, because a shape that needed a per-tree branch would not be total — which is `TRO-B1`'s own last
// failure reading.
//
// THE ENTRY IS REACHED BY PATH (`../../bindings/js/index.mjs`), which is this project's `O4` route.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as NS from '../../bindings/js/index.mjs';

const { storeCreate } = NS;

/** The three tier tokens the declared `Tier` union carries (`bindings/js/index.d.ts:179`, `PIN-4` (v)). */
const THREE_TOKENS = ['file', 'mem', 'temp'];

/** The own names of a value, SORTED — the SET comparison `PIN-3` (ii) fixes, never an assertion of order. */
function ownNames(value) {
  return value !== null && typeof value === 'object' ? Object.getOwnPropertyNames(value).sort() : [];
}

/** THE CALL, CLASSIFIED — the blind instrument's one view of a throw, so a refusal can be NAMED rather than
 *  swallowed and a `TypeError` from an absent member can never pass for the verb's arm. */
function attempt(fn) {
  try {
    return { answered: true, value: fn() };
  } catch (thrown) {
    return { answered: false, err: thrown };
  }
}

function statusOf(result) {
  return result.answered ? '<no refusal>' : (result.err && result.err.status) || `<no status: ${result.err && result.err.message}>`;
}

/**
 * **THE ONE WALKER — `TRO-B1`'s whole instrument.** It takes a compiled answer, the plain answer `read`
 * gives at the SAME address, and the address itself, and it reads the answer against the three-form rule:
 *
 *   · EVERY node of the answer is an OBJECT — no primitive, no bare array (`PIN-3` (i));
 *   · EVERY node carries exactly one `_tier`, whose value is ONE of the three tokens (`PIN-3` (ii),
 *     `PIN-4` (ii)–(v));
 *   · the node's OTHER member names are EXACTLY the ones its KIND fixes — the OBJECT kind's stored key set
 *     minus `_tier`, and the ARRAY and LEAF kinds' singleton `value` (`PIN-3`'s table, `PIN-5` (iii));
 *   · and it recurses INTO the same node the read descended through, so the rule is checked at every depth.
 *
 * **THE KIND IS LEARNED FROM `read`, NEVER FROM THE ANSWER**: a node whose plain answer is an array is an
 * ARRAY node, one whose plain answer is a plain object is an OBJECT node, and anything else is a LEAF. That
 * is what keeps this walker total — it has no per-tree case and no per-token case.
 */
function checkTotalShape({ store, address, answer, trail, readings }) {
  const where = `${trail} at ${JSON.stringify(address)}`;

  // ── (1) EVERY NODE OF THE ANSWER IS AN OBJECT.
  assert.equal(
    answer !== null && typeof answer === 'object' && !Array.isArray(answer),
    true,
    `${where}: every node of the answer is an OBJECT and no node is a primitive or a bare array `
    + `(\`PIN-3\` (i)) — read ${JSON.stringify(answer)}`,
  );

  // ── (2) EXACTLY ONE `_tier`, AND IT IS ONE OF THE THREE TOKENS.
  const names = ownNames(answer);
  assert.equal(names.includes('_tier'), true, `${where}: an \`_tier\` is present at EVERY node without exception (\`PIN-3\` (ii)) — read ${JSON.stringify(names)}`);
  assert.equal(names.filter((name) => name === '_tier').length, 1, `${where}: exactly ONE member stands at the minted name`);
  assert.equal(typeof answer._tier, 'string', `${where}: \`_tier\` is a STRING and never an array, a set or a count (\`PIN-4\` (ii)) — read ${JSON.stringify(answer._tier)}`);
  assert.equal(THREE_TOKENS.includes(answer._tier), true, `${where}: the token is one of \`file\` · \`mem\` · \`temp\` and no fourth (\`PIN-4\` (v)) — read ${JSON.stringify(answer._tier)}`);

  // ── THE PLAIN ANSWER AT THE SAME ADDRESS — the shape oracle, and the kind's own witness.
  const plainRead = attempt(() => store.read(address));
  assert.equal(plainRead.answered, true, `${where}: the oracle must answer — \`read\` is not reached by this unit (\`PIN-6\` (i)) — read ${statusOf(plainRead)}`);
  const plain = plainRead.value;

  // ── (3) THE MEMBER NAMES THE NODE'S KIND FIXES, AND THE RECURSION INTO THE SAME MEMBERS.
  if (Array.isArray(plain)) {
    // THE ARRAY KIND: exactly `_tier` and `value`, dense from `0`, each element compiled in index order.
    assert.deepEqual(names, ['_tier', 'value'], `${where}: an ARRAY node carries exactly \`_tier\` and \`value\` (\`PIN-3\`'s table) — read ${JSON.stringify(names)}`);
    assert.equal(Array.isArray(answer.value), true, `${where}: \`value\` is an array`);
    assert.equal(answer.value.length, plain.length, `${where}: and it is the same length as the read's own array — read ${answer.value.length}`);
    assert.equal(Object.keys(answer.value).length, plain.length, `${where}: and it is DENSE from \`0\` — no hole and no reordering`);
    for (let index = 0; index < plain.length; index += 1) {
      checkTotalShape({ store, address: [...address, index], answer: answer.value[index], trail: `${trail}.value[${index}]`, readings });
    }
  } else if (plain !== null && typeof plain === 'object') {
    // THE OBJECT KIND: the stored key set minus `_tier`, plus the minted one, each member INLINE.
    const storedKeys = Object.keys(plain).filter((key) => key !== '_tier');
    assert.deepEqual(names, [...['_tier'], ...storedKeys].sort(), `${where}: an OBJECT node carries its stored key set minus \`_tier\` plus the minted \`_tier\` (\`PIN-3\`, \`PIN-5\` (iii)) — read ${JSON.stringify(names)}`);
    assert.equal(names.includes('value') && !storedKeys.includes('value'), false, `${where}: no \`value\` wrapper is minted at an OBJECT node (\`PIN-5\` (iv))`);
    for (const key of storedKeys) {
      checkTotalShape({ store, address: [...address, key], answer: answer[key], trail: `${trail}.${key}`, readings });
    }
  } else {
    // THE LEAF KIND: exactly `_tier` and `value`, and `value` IS the literal — never itself compiled
    // (`PIN-3` (iii), because no lawful write mints an object or an array as a leaf).
    assert.deepEqual(names, ['_tier', 'value'], `${where}: a LEAF node carries exactly \`_tier\` and \`value\` (\`PIN-3\`'s table) — read ${JSON.stringify(names)}`);
    assert.deepEqual(answer.value, plain, `${where}: a leaf's \`value\` is the literal itself, moved by nothing (\`PIN-3\` (iii)) — read ${JSON.stringify(answer.value)}`);
  }

  const kind = Array.isArray(plain) ? 'array' : (plain !== null && typeof plain === 'object' ? 'object' : 'leaf');
  readings.push({ address, trail, names, tier: answer._tier, kind, plainNames: ownNames(plain) });
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-B1` — THE TOTAL SHAPE, OVER THE SIX LISTED TREES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-B1 · `verification.md §2.3` · THE TOTAL SHAPE: over six trees — a scalar root, a nested object, a nested array, an object holding an array holding an object, an empty `MAP` and an empty `VEC` (the last two reached by a delete of every child) — every node of every answer is an OBJECT carrying exactly one `_tier` from the three tokens and exactly the member names its KIND fixes', (t) => {
  // ── THE DRIVE'S OWN FIXTURE, and it is the DECLARED SURFACE's: ONE `file` register (so all three tokens
  // are standable) with `journalLength` and `listeners` spelled and `filePath` supplied.
  const dir = mkdtempSync(join(tmpdir(), 'tro-blind-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const store = storeCreate({ journalLength: 256, listeners: [], filePath: join(dir, 'store.json') });

  // ── THE SIX TREES, EACH AT ITS OWN TIER, EACH WRITTEN ONCE — `PIN-3`'s own three kinds sampled by
  // CONSTRUCTION, which is the generator `verification.md §3` names as its source.
  const ROOTS = [
    ['blind-scalar', 'mem', 'a-scalar-root', 'a SCALAR ROOT'],
    ['blind-object', 'file', { l1: { l2: { l3: 'deep' } }, side: 1 }, 'a NESTED OBJECT'],
    ['blind-array', 'temp', [[1, 2], [3, [4]]], 'a NESTED ARRAY'],
    ['blind-mixed', 'file', { list: [{ k: 'v' }, 7] }, 'an OBJECT HOLDING AN ARRAY HOLDING AN OBJECT'],
  ];
  for (const [key, tier, value, description] of ROOTS) {
    const write = attempt(() => store.write([key], tier, value));
    assert.equal(write.answered, true, `the tree "${description}" must land at ${JSON.stringify(tier)} — read ${statusOf(write)}`);
  }

  // ── THE TWO EMPTIES, EACH REACHED BY A DELETE OF EVERY CHILD (`TRO-B1`'s own spelling).
  assert.equal(attempt(() => store.write(['blind-empty-map'], 'mem', { p: 1, q: 2 })).answered, true, 'the empty `MAP`\'s children must land first');
  assert.equal(attempt(() => store.write(['blind-empty-vec'], 'file', [1, 2])).answered, true, 'and the empty `VEC`\'s elements');
  for (const [key, index] of [['blind-empty-map', 'p'], ['blind-empty-map', 'q']]) {
    assert.equal(attempt(() => store.delete([key, index])).answered, true, `deleting \`${index}\` must land`);
  }
  // AN ARRAY COMPACTS ON DELETE, so its indices are re-read rather than assumed.
  while (true) {
    const current = store.read(['blind-empty-vec']);
    if (current.length === 0) break;
    assert.equal(attempt(() => store.delete(['blind-empty-vec', 0])).answered, true, 'deleting index 0 must land');
  }

  // ── THE DRIVE'S OWN COHERENCE, BEFORE ANY VERDICT: the two empties really ARE the two DISTINCT empty
  // forms `PIN-8` (i) fixes — `{}` and `[]` — and the four other trees really are the shapes listed.
  const emptyMapShape = store.read(['blind-empty-map']);
  const emptyVecShape = store.read(['blind-empty-vec']);
  assert.deepEqual(emptyMapShape, {}, 'the `MAP` empty reached by deletion reads `{}`');
  assert.deepEqual(emptyVecShape, [], 'and the `VEC` empty reached by deletion reads `[]` — a DISTINCT form (`PIN-8` (i), `DD-1`)');
  assert.deepEqual(store.read(['blind-scalar']), 'a-scalar-root', 'and the scalar root really is a scalar');
  assert.deepEqual(store.read(['blind-array']), [[1, 2], [3, [4]]], 'and the nested array really is nested');
  assert.deepEqual(store.read(['blind-mixed']), { list: [{ k: 'v' }, 7] }, 'and the mixed tree really carries the three kinds');

  // ── THE ONE PRE-CONDITION THIS DRIVE OWES: the verb exists. A call of an ABSENT member throws a
  // `TypeError` with no `status`, which a later read would mistake for an arm — so it is read FIRST.
  t.diagnostic(`TRO-B1 · typeof store.readTiered = ${JSON.stringify(typeof store.readTiered)} · the six trees stand at the tiers the drive wrote`);
  assert.equal(typeof store.readTiered, 'function', 'the verb under test must exist — the whole statement below is about its answer, and this cell is RED at `HEAD` for exactly this reason — read ' + JSON.stringify(typeof store.readTiered));

  // ── THE SIX DRIVES — ONE PER TREE, EACH THROUGH THE SAME WALKER.
  const SIX = [
    ['blind-scalar', 'a SCALAR ROOT'],
    ['blind-object', 'a NESTED OBJECT'],
    ['blind-array', 'a NESTED ARRAY'],
    ['blind-mixed', 'an OBJECT HOLDING AN ARRAY HOLDING AN OBJECT'],
    ['blind-empty-map', 'an EMPTY `MAP`'],
    ['blind-empty-vec', 'an EMPTY `VEC`'],
  ];
  const readings = [];
  for (const [key, description] of SIX) {
    const answer = store.readTiered([key]);
    t.diagnostic(`TRO-B1 · "${description}" (${JSON.stringify([key])}) answered ${JSON.stringify(answer)}`);
    checkTotalShape({ store, address: [key], answer, trail: key, readings });
  }

  // ── THE COLLECTED READING: the node forms, the member names per node and the `_tier` token per node.
  t.diagnostic(`TRO-B1 · ${readings.length} nodes read across the six trees: ${JSON.stringify(readings)}`);

  // ── AND THE RULE HOLDS AT EVERY ONE OF THEM, CHECKED ONCE MORE OVER THE COLLECTED SET. **THE MEMBER SETS'
  // EXACT FORM IS THE WALKER'S ASSERTION, NODE BY NODE** (it is the only instrument that knows a node's kind);
  // what is re-read here is the collected CENSUS: every node's token, and the one name every node must carry.
  assert.ok(readings.length >= 12, `the six trees carry a node count above the walk's floor — read ${readings.length}`);
  for (const reading of readings) {
    assert.equal(THREE_TOKENS.includes(reading.tier), true, `node ${reading.trail}: the token is one of the three — read ${JSON.stringify(reading.tier)}`);
    assert.equal(reading.names.includes('_tier'), true, `node ${reading.trail}: the node carries \`_tier\` — read ${JSON.stringify(reading.names)}`);
    // **AND THE NAME SET IS THE ONE ITS KIND FIXES**, re-read over the collected census: the ARRAY and LEAF
    // kinds carry `_tier` and `value` and nothing else, and the OBJECT kind carries its stored key set minus
    // `_tier` plus the minted one (`PIN-3`'s table). **The empty `MAP`'s ONE-member answer is lawful here** and
    // is why no node is required to carry a second member (`PIN-8` (i)).
    const wantNames = reading.kind === 'object'
      ? [...['_tier'], ...reading.plainNames.filter((name) => name !== '_tier')].sort()
      : ['_tier', 'value'];
    assert.deepEqual(reading.names, wantNames, `node ${reading.trail}: the ${reading.kind.toUpperCase()} kind's member set — read ${JSON.stringify(reading.names)}`);
  }

  // ── AND THE THREE TOKENS ARE ALL OBSERVED, WHICH IS WHAT MAKES THE COLLECTED `_tier` A PER-NODE READING
  // AND NOT ONE VALUE REPEATED: the drive wrote at three tiers across the six trees.
  const observedTokens = [...new Set(readings.map((reading) => reading.tier))].sort();
  t.diagnostic(`TRO-B1 · the distinct \`_tier\` tokens observed across the six trees read ${JSON.stringify(observedTokens)}`);
  assert.deepEqual(observedTokens, ['file', 'mem', 'temp'], 'and every token the answer carries is one of the store\'s three, read at three different nodes of three different trees (`PIN-4` (iii))');

  // ── AND NO TREE NEEDED A SPECIAL CASE: the two empty forms differ BY A MEMBER'S PRESENCE and by nothing
  // else the walker did (`PIN-8` (i)) — a `0`-member OBJECT answer and a `1`-member `value` answer.
  const emptyMapAnswer = store.readTiered(['blind-empty-map']);
  const emptyVecAnswer = store.readTiered(['blind-empty-vec']);
  t.diagnostic(`TRO-B1 · the empty \`MAP\` answers ${JSON.stringify(emptyMapAnswer)} · the empty \`VEC\` answers ${JSON.stringify(emptyVecAnswer)}`);
  assert.deepEqual(ownNames(emptyMapAnswer), ['_tier'], 'the empty `MAP` answers ONE member');
  assert.deepEqual(ownNames(emptyVecAnswer), ['_tier', 'value'], 'and the empty `VEC` answers TWO');
  assert.deepEqual(emptyVecAnswer.value, [], 'whose `value` is `[]`');
  assert.notDeepEqual(emptyMapAnswer, emptyVecAnswer, 'and the two empty forms are NOT the same state');
});
