// tests/e2e/tier-readout.test.mjs
//
// RED SET — **`U-STOREROOM-TIER-READOUT`**, gate 3's cells: the twelve statements `TRO-01`…`TRO-12` of
// `docs/specs/storeroom-tier-readout/verification.md §2.1` and the TWO declared controls `TRO-C1`/`TRO-C2`
// of `§2.2`. **THE RED SET IS RED AT `HEAD` BY CONSTRUCTION: THE VERB `readTiered` DOES NOT EXIST YET.**
// Every red cell below asserts the POST-LANDING answer, so at `HEAD` it fails because `readTiered` is not a
// function — which is the right reason; a red cell that passed at `HEAD` would be a cell that asserts
// nothing (`TRO-01`'s own third failure reading).
//
// **THE TWO CONTROLS ARE GREEN AT `HEAD` AND MUST STAY GREEN.** They are the cells a landing is allowed to
// turn — `read`'s answer and `readLiteral`'s arm — and `TRO-C1` DOES NOT COMPUTE ITS EXPECTED VALUE THROUGH
// `readTiered`, which would make the control circular (`PIN-6` (i)).
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// PROVENANCE. Every expectation below is authored from the CONTRACT DIRECTORY and from nothing else —
// there is no implementation of this verb to read:
//   · `docs/specs/storeroom-tier-readout/contract.md` — `PIN-2` (the name, the signature, `read`'s arity
//     rule, one instance member and never a module export) · `PIN-3` (the three node forms and the member
//     names each kind fixes) · `PIN-4` (the `_tier` referent: that node's own tier, one of the three tokens,
//     never a set, never a count) · `PIN-5` (the `_tier` collision, its `value` half and the write-back
//     consequence) · `PIN-7` (the refusal set is `read`'s five and no sixth) · `PIN-8` (the two empties and
//     the register's creation-fixed tier) · `PIN-9` (the walk refuses, the assembly omits, an omitted member
//     has no `_tier`)
//   · `strata/decisions.md` — `D-121` (`:6174`) · `D-121-ter` (`:6201`) · `D-121-quater` (`:6232`) ·
//     `D-121-quinquies` (`:6252`), the four rows that are LAW and outrank every byte of the directory
//   · `docs/specs/storeroom-tier-readout/verification.md §2.1`/`§2.2` — the statement list itself
//
// **NO BYTE OF `src/**`, `bindings/js/src/**` OR THE NEW VERB WAS READ TO AUTHOR A CELL HERE**, and NO cell
// opens a `docs/**` path at runtime (`D-17`): every citation below is a literal written in this file. The
// entry is reached by PATH (`../../bindings/js/index.mjs`), which is this project's `O4` route.
//
// **TWO GROUNDS ARE NAMED WHERE A READER WOULD EXPECT A GUIDE'S**, because the guide contradicts the
// contract on which version an unqualified read selects (`PIN-9` (vii)): `TRO-08` rests on
// `docs/specs/storeroom-native/contract.md:1789`–`:1794`'s lowest-persistence selection and on the crate's
// own `rank` order, and NOT on `docs/guides/package-use.md:386`–`:387`, whose sentence is filed and is
// nobody's to decide here. **NO CELL BELOW ASSERTS THAT GUIDE'S SENTENCE.**
//
// EACH CELL NAMES ITS CLAUSE AS `pin (§sub)`. **EVERY CELL PRINTS WHAT IT READ WITH `t.diagnostic` AND
// ASSERTS ITS OWN DRIVE'S COHERENCE BEFORE ITS VERDICT**, so a failure says which of the two broke: the
// drive or the verb.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as NS from '../../bindings/js/index.mjs';

const { storeCreate } = NS;

// ── THE THREE TIER TOKENS, THE STORE'S OWN (`src/records.rs:37`–`:43`'s `tier_token`, declared at
// `bindings/js/index.d.ts:179`): **no fourth token, no capitalisation, no abbreviation, no `null`**
// (`PIN-4` (v)).
const TIER_TOKENS = ['file', 'mem', 'temp'];

// ── THE DECLARED MEMBER SET AT ITS POST-LANDING FIGURE: the fourteen plus `readTiered`, sorted
// (`PIN-1` (i)'s one member position beside `read`).
const FIFTEEN_MEMBERS = [
  'addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
  'readLiteral', 'readTiered', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten',
  'write',
];

// ── THE REFUSAL SET, CLOSED AT FIVE AND ALL OF THEM `read`'s OWN (`PIN-7` (i)–(ii)).
const FIVE_STATUSES = ['AddressMalformed', 'AddressNotFound', 'TierNotFound', 'LeafHasNoDownstream', 'OutOfDomainTier'];

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE SMALL READS EVERY CELL USES — none of them the verb under test
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** A `mem`-register store: `cfg.filePath` ABSENT is IN DOMAIN and the register is created at `mem`
 *  (`PIN-8` (ii), `bindings/js/index.d.ts`'s `cfg` block). */
function mem(listeners = []) {
  return storeCreate({ journalLength: 16, listeners });
}

/** A `file`-register store: `cfg.filePath` PRESENT and passed the construction's own reachability probe,
 *  so the register's creation-fixed tier is `file` (`PIN-8` (ii)). */
function fileRegister() {
  const dir = mkdtempSync(join(tmpdir(), 'tro-'));
  const store = storeCreate({ journalLength: 64, listeners: [], filePath: join(dir, 'store.json') });
  return { store, dir, dispose: () => rmSync(dir, { recursive: true, force: true }) };
}

/** THE CALL, CLASSIFIED — the caller's one view of a throw. `answered` is `true` where the call RETURNED. */
function attempt(fn) {
  try {
    return { answered: true, value: fn() };
  } catch (thrown) {
    return { answered: false, err: thrown };
  }
}

/** The `status` a refused call carries, or `'<no refusal>'` where it answered instead. */
function statusOf(result) {
  return result.answered ? '<no refusal>' : (result.err && result.err.status) || '<no status>';
}

/** The own names of a value, SORTED — the set comparison `PIN-3` (ii) and `docs/specs/storeroom-js/
 *  contract.md:1148`–`:1155` want, never an assertion of insertion order. */
function ownNames(value) {
  return value !== null && typeof value === 'object' ? Object.getOwnPropertyNames(value).sort() : [];
}

/** **THE COMPILED NODE, READ AS ITS OWN NAMES AND ITS OWN `_tier`** — the one instrument every cell below
 *  shares, so no cell invents a private reading of the shape. `PIN-3` (i)–(ii): every node is an OBJECT
 *  and every node carries an `_tier`, without exception and with no fourth form. */
function compiledNode(answer, where) {
  assert.equal(
    answer !== null && typeof answer === 'object' && !Array.isArray(answer),
    true,
    `${where}: every node of the answer is an OBJECT and no node is a primitive or a bare array `
    + `(\`PIN-3\` (i)) — read ${JSON.stringify(answer)}`,
  );
  const names = ownNames(answer);
  assert.equal(
    names.includes('_tier'),
    true,
    `${where}: an \`_tier\` is present at EVERY node without exception (\`PIN-3\` (ii)) — read `
    + `${JSON.stringify(names)}`,
  );
  assert.equal(
    TIER_TOKENS.includes(answer._tier),
    true,
    `${where}: the \`_tier\` is ONE of the store's three tokens and is never a set, a count or an array `
    + `(\`PIN-4\` (ii), \`PIN-4\` (v)) — read ${JSON.stringify(answer._tier)}`,
  );
  return { answer, names, tier: answer._tier };
}

/** **`import { <name> }` FROM THE ENTRY, DRIVEN RATHER THAN INFERRED** — a one-line module over the real
 *  entry path whose import either links or does not. `PIN-2` (iv): the namespace stays ONE name, so a
 *  named import of `readTiered` must resolve NOTHING after the landing as well. */
const ENTRY_URL = new URL('../../bindings/js/index.mjs', import.meta.url).href;
async function namedImport(name) {
  const source = `import { ${name} } from ${JSON.stringify(ENTRY_URL)}; export default typeof ${name};`;
  const specifier = `data:text/javascript;base64,${Buffer.from(source, 'utf8').toString('base64')}`;
  try {
    const linked = await import(specifier);
    return { linked: true, type: linked.default };
  } catch (err) {
    return { linked: false, reason: `${err.constructor.name}: ${err.message}` };
  }
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-01` · `PIN-2` (i)–(iv) — THE VERB EXISTS AS A MEMBER AND DOES NOT EXIST AS AN EXPORT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-01 · `PIN-2` (i)–(iv) · THE VERB EXISTS AS A MEMBER AND DOES NOT EXIST AS AN EXPORT: the instance carries `readTiered`, the module namespace still carries `storeCreate` alone, and `import { readTiered }` resolves nothing', async (t) => {
  // DECLARED: "**(i) THE NAME IS LAW AND IS NOT A LAYER'S TO RE-SPELL:** `readTiered`, one word, that
  // capitalisation, that position"; and "**(iv) THE MEMBER IS A MEMBER AND NOT A MODULE EXPORT.** **The
  // namespace stays ONE name — `storeCreate` alone**" (`contract.md` `PIN-2`, `D-121-ter` item 5).
  const instance = mem();

  // ── THE DRIVE'S OWN COHERENCE, BEFORE ANY VERDICT: the store constructed and `read` answers, so an
  // absent member below is the verb's absence and not a dead instance.
  const register = attempt(() => instance.read([]));
  assert.equal(register.answered, true, `the drive's own store must construct and read: ${statusOf(register)}`);
  assert.deepEqual(register.value, {}, 'and the register starts empty, so the drive is not reading another cell\'s state');

  const namespaceNames = Object.keys(NS).filter((key) => key !== 'default').sort();
  const memberType = typeof instance.readTiered;
  const namedProbe = await namedImport('readTiered');
  const namedControl = await namedImport('storeCreate');
  t.diagnostic(`TRO-01 · typeof instance.readTiered = ${JSON.stringify(memberType)} · the instance's own names read ${JSON.stringify(ownNames(instance))} · the namespace reads ${JSON.stringify(namespaceNames)} · \`import { readTiered }\` linked ${JSON.stringify(namedProbe.linked)}${namedProbe.linked ? '' : ` (${namedProbe.reason})`}`);

  // ── THE NAMESPACE IS ONE NAME, AND IT DOES NOT GROW ONE (`PIN-2` (iv)).
  assert.deepEqual(namespaceNames, ['storeCreate'], 'the module namespace carries ONE name and a second name is refused');
  assert.equal(Object.prototype.hasOwnProperty.call(NS, 'readTiered'), false, '`readTiered` is a MEMBER and never a namespace name');

  // ── AND THE NAMED IMPORT IS DRIVEN: the same construction with the ONE declared name LINKS, so a
  // non-link for `readTiered` is about that name and not about the probe.
  assert.equal(namedControl.linked, true, `the probe itself must link a declared name: ${JSON.stringify(namedControl.reason)}`);
  assert.equal(namedControl.type, 'function');
  assert.equal(namedProbe.linked, false, '`import { readTiered }` resolves NOTHING — the verb is not a module export');

  // ── THE VERDICT. RED AT `HEAD`: `typeof` reads `'undefined'` because the verb does not exist yet.
  assert.equal(
    memberType,
    'function',
    '`PIN-2` (i): `readTiered` stands as ONE instance member, one word, that capitalisation — read '
    + `${JSON.stringify(memberType)}`,
  );
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-02` · `PIN-3` (the LEAF row), `R-1` — THE LEAF FORM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-02 · `PIN-3`\'s LEAF row (`R-1`) · THE LEAF FORM: the answer is an OBJECT whose own names are exactly `[\'_tier\',\'value\']`, `value` is the literal `read` answers, and `_tier` is the tier of the version the read selected', (t) => {
  // DECLARED: "**LEAF** (`R-1`) · `{ _tier, value: <the literal> }` · exactly **`_tier`** and **`value`** ·
  // `value` is **the admitted literal itself, exactly as written** — the same value `read` answers, moved by
  // nothing" (`contract.md` `PIN-3`'s table); and "a leaf's is THE TIER OF THE VERSION THE READ SELECTED at
  // that address" (`PIN-4` (i)).
  const WRITTEN_AT = 'mem';
  const store = mem();
  const write = attempt(() => store.write(['k'], WRITTEN_AT, 'the-literal'));
  assert.equal(write.answered, true, `the drive's own write must land: ${statusOf(write)}`);

  // ── THE DRIVE'S COHERENCE: `read` answers the literal, so the leaf exists and stands at `WRITTEN_AT`.
  const plain = store.read(['k']);
  assert.equal(plain, 'the-literal', 'the drive\'s own state: `read([\'k\'])` answers the literal it wrote');
  const plainTiered = attempt(() => store.read(['k'], [WRITTEN_AT]));
  assert.deepEqual(plainTiered.value, 'the-literal', 'and the SAME literal under the passed set, so one version stands');

  const answer = store.readTiered(['k']);
  t.diagnostic(`TRO-02 · written ${JSON.stringify('the-literal')} at ${JSON.stringify(WRITTEN_AT)} · read(['k']) = ${JSON.stringify(plain)} · readTiered(['k']) = ${JSON.stringify(answer)}`);
  const node = compiledNode(answer, 'TRO-02 leaf');

  // ── THE MEMBER SET THE LEAF KIND FIXES: TWO NAMES AND NO THIRD.
  assert.deepEqual(node.names, ['_tier', 'value'], 'the LEAF kind carries exactly `_tier` and `value` — read ' + JSON.stringify(node.names));

  // ── `value` IS THE LITERAL ITSELF AND IS NEVER COMPILED (`PIN-3` (iii)): it is the SAME VALUE `read`
  // answers, moved by nothing.
  assert.deepEqual(answer.value, plain, '`value` is the literal `read` answers, verbatim — not a compiled copy of it');
  assert.equal(typeof answer.value, 'string', 'and it is delivered as the primitive it was written as (`PIN-3` (iii): a leaf\'s `value` is a primitive at every reachable state)');

  // ── `_tier` IS THE TIER OF THE VERSION THE READ SELECTED — the tier the drive itself wrote at, read off
  // the drive and not hard-coded as a free token.
  assert.equal(node.tier, WRITTEN_AT, 'the leaf\'s `_tier` is the tier of the version the read selected — read ' + JSON.stringify(node.tier));

  // ── AND A NARROWED ARGUMENT NAMES THE SAME SELECTED VERSION (`PIN-9` (iv): the selection within the
  // passed subset is `A28`'s own, so the referent is the same rule under both arities).
  const narrowed = store.readTiered(['k'], [WRITTEN_AT]);
  t.diagnostic(`TRO-02 · readTiered(['k'], [${JSON.stringify(WRITTEN_AT)}]) = ${JSON.stringify(narrowed)}`);
  assert.equal(narrowed._tier, WRITTEN_AT, 'the narrowed read reports the version that selection chose');
  assert.deepEqual(narrowed.value, plain);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-03` · `PIN-3` (the OBJECT row), `R-2` — THE OBJECT FORM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-03 · `PIN-3`\'s OBJECT row (`R-2`) · THE OBJECT FORM: the answer\'s own names are exactly the SET `{_tier}` ∪ the node\'s keys, compared as a sorted set, the members INLINE beside the minted `_tier` and each compiled by the same rule — and NO `value` wrapper at this kind', (t) => {
  // DECLARED: "**OBJECT** (`R-2`) · `{ _tier, …members }` — **members INLINE, one per key** · the store's own
  // key set at that node **minus `_tier`** (`PIN-5`), **plus** the minted `_tier` · each member's value is
  // **the same compilation applied to the node that key's selected anchor points to**" (`contract.md`
  // `PIN-3`'s table). **AND THE COMPARISON IS A SORTED SET AND NOT AN ORDER** — `docs/specs/storeroom-js/
  // contract.md:1148`–`:1155` is the member-set relation, so this cell asserts the set and no insertion order.
  const WRITTEN_AT = 'mem';
  const store = mem();
  const write = attempt(() => store.write(['o'], WRITTEN_AT, { a: 1, b: 'two' }));
  assert.equal(write.answered, true, `the drive's own write must land: ${statusOf(write)}`);

  // ── THE DRIVE'S COHERENCE: `read` answers an object with the two keys and no third member.
  const plain = store.read(['o']);
  assert.deepEqual(plain, { a: 1, b: 'two' }, 'the drive\'s own state: `read([\'o\'])` assembles one member per key (`R-2`)');
  assert.deepEqual(ownNames(plain), ['a', 'b']);

  const answer = store.readTiered(['o']);
  t.diagnostic(`TRO-03 · written ${JSON.stringify({ a: 1, b: 'two' })} at ${JSON.stringify(WRITTEN_AT)} · read(['o']) = ${JSON.stringify(plain)} · readTiered(['o']) = ${JSON.stringify(answer)}`);
  const node = compiledNode(answer, 'TRO-03 object');

  // ── THE SET: `{_tier}` ∪ the node's own two keys, SORTED, and nothing else.
  assert.deepEqual(node.names, ['_tier', 'a', 'b'], 'the OBJECT kind\'s names are the store\'s key set plus the minted `_tier` — read ' + JSON.stringify(node.names));
  // ── AND NO `value` MEMBER AT THIS KIND: the wrapper belongs to the ARRAY and LEAF kinds alone
  // (`PIN-5` (iv)). A `value` here would be the CALLER's member and not this compilation's.
  assert.equal(node.names.includes('value'), false, 'an OBJECT node carries NO `value` wrapper (`PIN-3`\'s table, `PIN-5` (iv))');

  // ── THE MEMBERS ARE INLINE — at THIS object's own names, not nested under a carrier.
  assert.equal(Object.prototype.hasOwnProperty.call(answer, 'a'), true, 'the member `a` is INLINE beside `_tier`');
  assert.equal(Object.prototype.hasOwnProperty.call(answer, 'b'), true, 'and so is `b`');

  // ── EACH MEMBER IS COMPILED BY THE SAME RULE — the leaf form, because the drive wrote two leaves.
  for (const [key, literal] of [['a', 1], ['b', 'two']]) {
    const member = compiledNode(answer[key], `TRO-03 member ${key}`);
    assert.deepEqual(member.names, ['_tier', 'value'], `the member \`${key}\` is compiled by the same rule — read ${JSON.stringify(member.names)}`);
    assert.equal(member.tier, WRITTEN_AT, `and its \`_tier\` is its OWN node's tier, never the parent's pushed down (\`PIN-4\` (iii)) — read ${JSON.stringify(member.tier)}`);
    assert.deepEqual(member.answer.value, literal, `and its \`value\` is the literal \`${key}\` holds`);
  }

  // ── `_tier` IS THE OBJECT NODE'S OWN ANCHOR TIER (`PIN-4` (i)).
  assert.equal(node.tier, WRITTEN_AT, 'the object\'s `_tier` is that node\'s own anchor tier — read ' + JSON.stringify(node.tier));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-04` · `PIN-3` (the ARRAY row), `R-3` — THE ARRAY FORM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-04 · `PIN-3`\'s ARRAY row (`R-3`, `D-121-ter` item 1) · THE ARRAY FORM: the answer is `{ _tier, value: [ … ] }` — own names exactly `[\'_tier\',\'value\']`, `value` dense, the same length, in index order, each element compiled — and NEVER a bare array', (t) => {
  // DECLARED: "**ARRAY** (`R-3`) · `{ _tier, value: [ … ] }` · exactly **`_tier`** and **`value`** · `value` is
  // the dense array of **the same compilation applied to each element, in index order**" (`contract.md`
  // `PIN-3`'s table); and `D-121-ter` item 1's own words: *"Wrap arrays too: `{_tier, value: [...]}`"*
  // (`strata/decisions.md:6213`). **THE BARE ARRAY IS THE READING `D-121-ter` REFUSED** (`:6205`).
  const WRITTEN_AT = 'mem';
  const MIXED = [1, 'two', true];
  const store = mem();
  const write = attempt(() => store.write(['a'], WRITTEN_AT, MIXED));
  assert.equal(write.answered, true, `the drive's own write must land: ${statusOf(write)}`);

  // ── THE DRIVE'S COHERENCE: `read` answers a dense arrow of the same length, in index order.
  const plain = store.read(['a']);
  assert.equal(Array.isArray(plain), true, 'the drive\'s own state: `read([\'a\'])` answers an array (`R-3`)');
  assert.deepEqual(plain, MIXED);

  const answer = store.readTiered(['a']);
  t.diagnostic(`TRO-04 · written ${JSON.stringify(MIXED)} at ${JSON.stringify(WRITTEN_AT)} · read(['a']) = ${JSON.stringify(plain)} · readTiered(['a']) = ${JSON.stringify(answer)}`);
  const node = compiledNode(answer, 'TRO-04 array');

  // ── THE BARE-ARRAY READING IS REFUSED: the answer is an OBJECT and not an array.
  assert.equal(Array.isArray(answer), false, 'the answer at an ARRAY node is an OBJECT and never a bare array (`D-121-ter` item 1, `strata/decisions.md:6205`)');

  // ── THE MEMBER SET THE ARRAY KIND FIXES: TWO NAMES AND NO THIRD.
  assert.deepEqual(node.names, ['_tier', 'value'], 'the ARRAY kind carries exactly `_tier` and `value` — read ' + JSON.stringify(node.names));

  // ── DENSE, THE SAME LENGTH, IN INDEX ORDER, EACH ELEMENT COMPILED.
  assert.equal(Array.isArray(answer.value), true, '`value` is an array');
  assert.equal(answer.value.length, MIXED.length, 'and it is the same length as the stored array — read ' + String(answer.value.length));
  assert.deepEqual(Object.keys(answer.value).sort(), ['0', '1', '2'], 'and it is DENSE from `0` — no hole, no reordering, no compacting');
  for (let index = 0; index < MIXED.length; index += 1) {
    const element = compiledNode(answer.value[index], `TRO-04 element ${index}`);
    assert.deepEqual(element.names, ['_tier', 'value'], `element \`${index}\` is compiled by the same rule — read ${JSON.stringify(element.names)}`);
    assert.deepEqual(element.answer.value, plain[index], `and it stands at its own INDEX — \`value[${index}]\` compiles \`read\`'s element ${index}`);
    assert.equal(element.tier, WRITTEN_AT, `and its \`_tier\` is its own node's tier — read ${JSON.stringify(element.tier)}`);
  }
  assert.equal(node.tier, WRITTEN_AT, 'the array node\'s `_tier` is that node\'s own anchor tier — read ' + JSON.stringify(node.tier));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-05` · `PIN-8` (i) — THE TWO EMPTY CONTAINERS ARE DISTINCT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-05 · `PIN-8` (i) (`DD-1`) · THE TWO EMPTY CONTAINERS ARE DISTINCT: a `0`-child `MAP` answers ONE member `{ _tier }` with no `value`, and a `0`-child `VEC` answers TWO `{ _tier, value: [] }` — and the two answers are NOT the same state', (t) => {
  // DECLARED: "**a `MAP` with `0` child anchors reads `{}` and therefore answers `{ _tier }` — ONE member, no
  // `value`; a `VEC` with `0` child anchors reads `[]` and therefore answers `{ _tier, value: [] }` — TWO
  // members** … **THE DISTINCTNESS SURVIVES THE COMPILATION AND IS PINNED: a `0`-member OBJECT answer and a
  // `1`-member `value` answer are NOT the same state and no cell may read one as the other**"
  // (`contract.md` `PIN-8` (i)).
  const WRITTEN_AT = 'mem';
  const store = mem();
  assert.equal(attempt(() => store.write(['em'], WRITTEN_AT, {})).answered, true, 'the drive\'s empty MAP must land');
  assert.equal(attempt(() => store.write(['ev'], WRITTEN_AT, [])).answered, true, 'and the drive\'s empty VEC must land');

  // ── THE DRIVE'S COHERENCE: `read` answers the two DISTINGUISHING forms, `{}` and `[]` — which is the state
  // the compilation must preserve (`docs/specs/storeroom-native/contract.md:2247`–`:2249`).
  assert.deepEqual(store.read(['em']), {}, 'the drive\'s own state: the `0`-child MAP reads `{}`');
  assert.deepEqual(store.read(['ev']), [], 'and the `0`-child VEC reads `[]`');

  const mapNode = compiledNode(store.readTiered(['em']), 'TRO-05 empty MAP');
  const vecNode = compiledNode(store.readTiered(['ev']), 'TRO-05 empty VEC');
  t.diagnostic(`TRO-05 · the empty MAP answers ${JSON.stringify(mapNode.answer)} (${mapNode.names.length} member(s)) · the empty VEC answers ${JSON.stringify(vecNode.answer)} (${vecNode.names.length} member(s))`);

  // ── THE MAP: ONE MEMBER, NO `value`.
  assert.deepEqual(mapNode.names, ['_tier'], 'the empty MAP answers ONE member, `{ _tier }` — read ' + JSON.stringify(mapNode.names));
  assert.equal(Object.prototype.hasOwnProperty.call(mapNode.answer, 'value'), false, 'and it carries NO `value` member');

  // ── THE VEC: TWO MEMBERS, `value` IS `[]`.
  assert.deepEqual(vecNode.names, ['_tier', 'value'], 'the empty VEC answers TWO members, `{ _tier, value: [] }` — read ' + JSON.stringify(vecNode.names));
  assert.deepEqual(vecNode.answer.value, [], 'and its `value` is `[]` — an empty array and not an absence');
  assert.equal(Array.isArray(vecNode.answer.value), true, 'and an ARRAY, not `undefined` and not `null`');

  // ── AND THE TWO ANSWERS ARE NOT THE SAME STATE: a `0`-member object answer and a `1`-member `value` answer.
  assert.notDeepEqual(mapNode.answer, vecNode.answer, 'no cell may read one empty form as the other — the answers differ in a member\'s presence');
  assert.notEqual(mapNode.names.length, vecNode.names.length, 'the two answers carry different MEMBER COUNTS — one and two');

  // ── AND EACH CARRIES ITS OWN NODE'S TIER.
  assert.equal(mapNode.tier, WRITTEN_AT);
  assert.equal(vecNode.tier, WRITTEN_AT);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-06` · `PIN-8` (ii)–(iv) — THE REGISTER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-06 · `PIN-8` (ii)–(iv) · THE REGISTER: `readTiered([])` answers the whole register compiled, every key compiled by the same rule, and `_tier` equal to the REGISTER\'S OWN creation-fixed tier — never the argument\'s; and `readTiered([], \'archive\')` still refuses `OutOfDomainTier`', (t) => {
  // DECLARED: "**THE REGISTER — `readTiered([])` ANSWERS THE WHOLE REGISTER COMPILED, AND ITS `_tier` IS THE
  // REGISTER'S OWN CREATION-FIXED TIER** … **THE REGISTER'S TIER IS `file` WHERE THE CONSTRUCTION'S PATH IS
  // PROVIDED AND PASSED THE PROBE AND `mem` OTHERWISE, FIXED AT CREATION AND NEVER MOVED** … **so it is NOT a
  // selection's tier and NOT a caller's**" (`contract.md` `PIN-8` (ii)); and (iv): "**the ARGUMENT'S DOMAIN is
  // still checked BEFORE the empty address is taken** … so `readTiered([], 'archive')` still refuses
  // `OutOfDomainTier` and `readTiered([], undefined)` still refuses `AddressMalformed`".
  //
  // ── **THE CELL READS WHICH TIER THE CONSTRUCTION MADE INSTEAD OF HARD-CODING ONE.** The register's tier is
  // the MOST PERSISTENT tier its construction admits: a write ABOVE it is refused by the monotonicity clause,
  // a write AT it lands (`PIN-8` (ii)'s `file`-or-`mem` clause read at its own observable). So one probe per
  // store answers the token, and no cell below spells `'file'` or `'mem'` as a free constant.
  const madeTier = (store) => {
    const atFile = attempt(() => store.write(['~register-tier-probe'], 'file', 0));
    return atFile.answered ? 'file' : (statusOf(atFile) === 'ParentAnchorMonotonicityViolation' ? 'mem' : `<unexpected ${statusOf(atFile)}>`);
  };

  // ── ARM A: A `mem` REGISTER WITH TWO KEYS AT TWO TIERS.
  const memStore = mem();
  const memTier = madeTier(memStore);
  assert.equal(memTier, 'mem', 'the drive\'s own construction: a `filePath`-less store is a `mem` register — read ' + String(memTier));
  assert.equal(attempt(() => memStore.write(['r1'], 'mem', 'x')).answered, true, 'the `mem` key must land');
  assert.equal(attempt(() => memStore.write(['r2'], 'temp', 2)).answered, true, 'and the `temp` key must land');

  const plainRegister = memStore.read([]);
  const whole = memStore.readTiered([]);
  t.diagnostic(`TRO-06 · the construction's own register tier reads ${JSON.stringify(memTier)} · read([]) = ${JSON.stringify(plainRegister)} · readTiered([]) = ${JSON.stringify(whole)}`);
  const wholeNode = compiledNode(whole, 'TRO-06 register');

  // ── THE WHOLE REGISTER, COMPILED: `_tier` is the register's own, plus every register key.
  assert.equal(wholeNode.tier, memTier, 'the register\'s `_tier` is the tier its CONSTRUCTION made — read ' + JSON.stringify(wholeNode.tier));
  const registerKeys = Object.keys(plainRegister).filter((key) => key !== '_tier');
  assert.deepEqual(wholeNode.names, [...['_tier'], ...registerKeys].sort(), 'and every register key stands compiled beside it — read ' + JSON.stringify(wholeNode.names));
  for (const key of registerKeys) {
    const member = compiledNode(whole[key], `TRO-06 register key ${key}`);
    assert.deepEqual(member.names, ['_tier', 'value'], `the register key \`${key}\` is compiled by the same rule — read ${JSON.stringify(member.names)}`);
  }

  // ── ARM B: THE ARGUMENT IS NOT THE REFERENT. A `temp` argument leaves the register's `_tier` at the
  // register's own tier, and it NARROWS the members exactly as `read` does — the assembly omits a member
  // whose anchors lie at no passed tier (`PIN-9` (i)), and this verb inherits that act unchanged
  // (`D-121-ter` item 5: *"its only difference the compilation of the answer"*). **`P-TRO-2` is the ground
  // that settles which of the two acts governs here**: stripping this answer must yield `read([], 'temp')`.
  const narrowed = memStore.readTiered([], 'temp');
  const narrowedPlain = memStore.read([], 'temp');
  t.diagnostic(`TRO-06 · read([], 'temp') = ${JSON.stringify(narrowedPlain)} · readTiered([], 'temp') = ${JSON.stringify(narrowed)}`);
  assert.equal(narrowed._tier, memTier, 'the register\'s `_tier` is NEVER taken from the argument — read ' + JSON.stringify(narrowed._tier));
  assert.deepEqual(ownNames(narrowed), ['_tier', ...Object.keys(narrowedPlain)].sort(), 'and its members are exactly the ones `read` assembles under the same argument (`PIN-9` (i)) — read ' + JSON.stringify(ownNames(narrowed)));

  // ── ARM C: WHERE THE ARGUMENT HAS NO SUBJECT THE TWO CALLS ANSWER THE SAME ANSWER, which is `PIN-8`
  // (iii)'s own sentence made drivable: an EMPTY register holds no member whose anchor could be omitted, so
  // nothing narrows and only the referent's fixity is left to read.
  const emptyStore = mem();
  const emptyTier = madeTier(emptyStore);
  assert.equal(emptyTier, 'mem', 'the drive\'s second construction is a `mem` register too — read ' + String(emptyTier));
  assert.deepEqual(emptyStore.read([]), {}, 'and it is empty');
  const emptyDefault = emptyStore.readTiered([]);
  const emptyTemp = emptyStore.readTiered([], 'temp');
  t.diagnostic(`TRO-06 · an EMPTY register whose construction reads ${JSON.stringify(emptyTier)}: readTiered([]) = ${JSON.stringify(emptyDefault)} · readTiered([], 'temp') = ${JSON.stringify(emptyTemp)}`);
  assert.deepEqual(emptyDefault, { _tier: emptyTier }, 'the empty register answers the empty-MAP form with the tier its CONSTRUCTION made');
  assert.deepEqual(emptyTemp, emptyDefault, 'and with no member to omit, a `temp` argument answers the SAME answer (`PIN-8` (iii))');

  // ── ARM D: A `file` REGISTER, SO THE OTHER HALF OF THE `file`-OR-`mem` CLAUSE IS DRIVEN AND NOT ASSUMED.
  const file = fileRegister();
  t.after(() => file.dispose());
  const fileTier = madeTier(file.store);
  assert.equal(fileTier, 'file', 'the drive\'s own construction: a `filePath`-provided store is a `file` register — read ' + String(fileTier));
  assert.equal(attempt(() => file.store.write(['f1'], 'file', { a: 1 })).answered, true, 'a `file`-tier write lands at that register');
  const fileWhole = file.store.readTiered([]);
  t.diagnostic(`TRO-06 · the \`file\` register's own tier reads ${JSON.stringify(fileTier)} · readTiered([]) = ${JSON.stringify(fileWhole)}`);
  assert.equal(fileWhole._tier, fileTier, 'and its `_tier` is the `file` tier its construction fixed — read ' + JSON.stringify(fileWhole._tier));

  // ── ARM E: THE ARGUMENT'S DOMAIN IS CHECKED BEFORE THE EMPTY ADDRESS IS TAKEN (`PIN-8` (iv)).
  const outOfDomain = attempt(() => memStore.readTiered([], 'archive'));
  const suppliedUndefined = attempt(() => memStore.readTiered([], undefined));
  t.diagnostic(`TRO-06 · readTiered([], 'archive') read ${JSON.stringify(statusOf(outOfDomain))} · readTiered([], undefined) read ${JSON.stringify(statusOf(suppliedUndefined))}`);
  assert.equal(statusOf(outOfDomain), 'OutOfDomainTier', 'an out-of-domain token is refused at the register as it is everywhere');
  assert.equal(statusOf(suppliedUndefined), 'AddressMalformed', 'and a SUPPLIED `undefined` at the tier position is PRESENT and malformed (`PIN-2` (iii))');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-07` · `PIN-5` — THE COLLISION
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-07 · `PIN-5` (i)–(iv) (`D-121-ter` item 3) · THE COLLISION: `readTiered` does NOT deliver the caller\'s stored `_tier` — the minted one stands alone, exactly one member at that name — while `read` still answers the stored value, and a stored member named `value` beside it IS delivered', (t) => {
  // DECLARED: "**(i) THE RULE IS LOCAL AND IT IS ONE RULE: at the node whose stored member set contains the
  // key `_tier`, the compiled object carries the MINTED `_tier` and the caller's stored value at that key is
  // NOT DELIVERED IN THAT ANSWER AT ALL.** **(ii) NOTHING IS DESTROYED AND THE TRUTH IS REACHABLE: the
  // DEFAULT `read` at the same address and tier answers the caller's stored value** … **(iv) `value` IS NEVER
  // SHADOWED**" (`contract.md` `PIN-5`), on `D-121-ter` item 3 (`strata/decisions.md:6217`).
  const WRITTEN_AT = 'mem';
  const STORED = { _tier: 'file', a: 1, value: 7 };
  const store = mem();
  assert.equal(attempt(() => store.write(['o'], WRITTEN_AT, STORED)).answered, true, 'the drive\'s own write must land');

  // ── THE DRIVE'S COHERENCE: `read` answers the caller's STORED `_tier`, so the collision is really there.
  const plain = store.read(['o']);
  assert.deepEqual(plain, { _tier: 'file', a: 1, value: 7 }, 'the drive\'s own state: the caller\'s `_tier` is stored as ordinary data');
  assert.deepEqual(ownNames(plain), ['_tier', 'a', 'value']);

  const answer = store.readTiered(['o']);
  t.diagnostic(`TRO-07 · written ${JSON.stringify(STORED)} at ${JSON.stringify(WRITTEN_AT)} · read(['o']) = ${JSON.stringify(plain)} · readTiered(['o']) = ${JSON.stringify(answer)}`);

  // ── ONE MEMBER AT THE MINTED NAME, AND THE MINTED ONE IS THE STORE'S: the stored `'file'` is NOT delivered.
  assert.deepEqual(ownNames(answer), ['_tier', 'a', 'value'], 'the compiled member set is the store\'s key set with `_tier` replaced by the minted one — read ' + JSON.stringify(ownNames(answer)));
  assert.equal(answer._tier, WRITTEN_AT, 'and the minted `_tier` IS the store\'s — the node\'s own anchor tier — read ' + JSON.stringify(answer._tier));
  assert.equal(answer._tier === plain._tier, false, 'the caller\'s stored `_tier` is NOT the value delivered at the minted name — read ' + JSON.stringify(answer._tier));

  // ── NOTHING IS DESTROYED: the default `read` still answers the caller's value, one call away.
  assert.equal(plain._tier, 'file', '`read` still answers the caller\'s STORED `_tier` (the value this cell wrote)');
  assert.equal(store.read(['o', '_tier']), 'file', 'and the stored value is reachable at its own address');

  // ── AND THE OTHER MEMBERS ARE UNTOUCHED BY THE COLLISION: `a` answers its own value in BOTH verbs.
  assert.equal(store.read(['o', 'a']), 1, '`read([\'o\',\'a\'])` answers `1`');
  assert.equal(store.readTiered(['o', 'a']).value, 1, 'and `readTiered([\'o\',\'a\']).value` answers the same `1`');

  // ── AND `value` IS NOT SHADOWED AT THIS KIND: the caller's `value` member IS delivered, compiled as its own
  // node — so the answer's `value` is an OBJECT with a `value` of its own and NOT the wrapper (`PIN-5` (iv),
  // `PIN-5` (vi): *"the outer `value` is the caller's member and the inner is the leaf's wrapper"*).
  assert.equal(Object.prototype.hasOwnProperty.call(answer, 'value'), true, 'a caller member named `value` IS delivered at an OBJECT node');
  const valueMember = compiledNode(answer.value, 'TRO-07 caller member `value`');
  assert.deepEqual(valueMember.names, ['_tier', 'value'], 'and it is compiled as its own node — read ' + JSON.stringify(valueMember.names));
  assert.equal(valueMember.answer.value, 7, 'whose `value` is the `7` the caller wrote — so `_tier` is the ONLY lossy name');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-08` · `PIN-4` — THE REFERENT IS PER NODE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-08 · `PIN-4` (i)–(iii) (and `PIN-9` (iv)) · THE REFERENT IS PER NODE: a tree whose root, child and grandchild stand at three different tiers answers THREE different `_tier` values, each its own node\'s; and at a key holding two versions at two tiers a narrowed read reports the passed tier while the unqualified read reports the version `A28` selects', (t) => {
  // DECLARED: "**an OBJECT node's `_tier` is THAT NODE'S OWN ANCHOR TIER; an ARRAY node's is THAT NODE'S OWN
  // ANCHOR TIER; a LEAF node's is THE TIER OF THE VERSION THE READ SELECTED at that address**" (`PIN-4` (i));
  // "**IT IS NEVER ONE TIER REPEATED ACROSS THE ANSWER AND NEVER THE ADDRESSED NODE'S TIER PUSHED DOWN**"
  // (`PIN-4` (iii)).
  //
  // ── **THE GROUND OF THE SECOND HALF, NAMED BECAUSE THE GUIDE CONTRADICTS IT.** The unqualified read selects
  // the LOWEST-PERSISTENCE anchor WITHIN whatever the caller passed — `docs/specs/storeroom-native/
  // contract.md:1789`–`:1794` (*"the selection is by `rank` ascending, and `temp` (`rank 0`) is selected before
  // `mem` (`rank 1`) before `file` (`rank 2`)"*), enforced at `src/store.rs:1146`–`:1152` and at
  // `src/records.rs:26`–`:33`. **`docs/guides/package-use.md:386`–`:387` says the OPPOSITE and `PIN-9` (vii)
  // refuses to pick between them; THIS CELL RESTS ON THE CONTRACT'S CLAUSE AND ON NOTHING ELSE.**

  // ── ARM A: ROOT, CHILD AND GRANDCHILD AT THREE TIERS.
  const file = fileRegister();
  t.after(() => file.dispose());
  assert.equal(attempt(() => file.store.write(['g3'], 'file', { child: { grandchild: 'a' } })).answered, true, 'the three-tier tree must land at `file`');
  assert.equal(attempt(() => file.store.write(['g3', 'child'], 'mem', { grandchild: 'b' })).answered, true, 'its child is re-written at `mem`');
  assert.equal(attempt(() => file.store.write(['g3', 'child', 'grandchild'], 'temp', 'c')).answered, true, 'and its grandchild at `temp`');

  // THE DRIVE'S OWN COHERENCE — the plain reads carry the three versions the drive wrote, so the tiers the
  // monotonicity clause permitted are the tiers the tree really holds, LEVEL BY LEVEL: under the `file` set
  // every level resolves to the `file` version the first write made, and under no set the deeper levels
  // resolve to the lower-persistence versions the later writes made.
  assert.deepEqual(file.store.read(['g3']), { child: { grandchild: 'c' } }, 'the drive\'s own state: `read` answers the three-level tree');
  assert.deepEqual(file.store.read(['g3'], ['file']), { child: { grandchild: 'a' } }, 'PREMISE: a `file` version stands at EVERY level, so the three tiers are all really held');
  assert.equal(file.store.read(['g3', 'child', 'grandchild']), 'c', 'PREMISE: and the grandchild\'s own selected version is the `temp` one');

  const tree = file.store.readTiered(['g3']);
  t.diagnostic(`TRO-08 · the three-tier tree: read(['g3']) = ${JSON.stringify(file.store.read(['g3']))} · readTiered(['g3']) = ${JSON.stringify(tree)}`);
  const tiers = [];
  const collect = (node, where) => {
    const read = compiledNode(node, where);
    tiers.push([where, read.tier]);
    if (where === 'root') collect(read.answer.child, 'child');
    if (where === 'child') collect(read.answer.grandchild, 'grandchild');
  };
  collect(tree, 'root');  t.diagnostic(`TRO-08 · the three \`_tier\` fields read ${JSON.stringify(tiers)}`);

  assert.equal(tiers.length, 3, 'the walk reached three nodes');
  assert.deepEqual(tiers.map(([, tier]) => tier), ['file', 'mem', 'temp'], 'and each reports ITS OWN node\'s tier, in the persistence ladder the drive wrote');
  assert.equal(new Set(tiers.map(([, tier]) => tier)).size, 3, 'so the answer carries THREE different `_tier` values and never one tier repeated');

  // ── ARM B: A KEY HOLDING TWO VERSIONS AT TWO TIERS.
  const store = mem();
  assert.equal(attempt(() => store.write(['k'], 'mem', 'mem-version')).answered, true, 'the `mem` version must land');
  assert.equal(attempt(() => store.write(['k'], 'temp', 'temp-version')).answered, true, 'and the `temp` version must land');

  // THE DRIVE'S OWN COHERENCE: both versions stand, and `read` selects ONE of them (the contract's rule).
  const plainUnqualified = store.read(['k']);
  assert.equal(plainUnqualified, 'temp-version', 'the drive\'s own state: the unqualified read selects the LOWEST-persistence version (native contract.md:1789–:1794) — read ' + JSON.stringify(plainUnqualified));

  const unqualified = store.readTiered(['k']);
  const narrowedTemp = store.readTiered(['k'], 'temp');
  const narrowedMem = store.readTiered(['k'], ['mem']);
  t.diagnostic(`TRO-08 · the two-version key: read(['k']) = ${JSON.stringify(plainUnqualified)} · readTiered(['k']) = ${JSON.stringify(unqualified)} · readTiered(['k'],'temp') = ${JSON.stringify(narrowedTemp)} · readTiered(['k'],['mem']) = ${JSON.stringify(narrowedMem)}`);

  // THE NARROWED READS REPORT THE PASSED TIER AND THE VERSION STANDING THERE.
  assert.equal(narrowedTemp._tier, 'temp', 'a `temp` set reports `temp` — read ' + JSON.stringify(narrowedTemp._tier));
  assert.equal(narrowedTemp.value, 'temp-version');
  assert.equal(narrowedMem._tier, 'mem', 'a `mem` set reports `mem` — read ' + JSON.stringify(narrowedMem._tier));
  assert.equal(narrowedMem.value, 'mem-version');

  // AND THE UNQUALIFIED READ REPORTS THE VERSION `A28` SELECTS — the same one `read` answers, at ITS tier.
  assert.deepEqual(unqualified.value, plainUnqualified, 'the unqualified `_tier` names the version the read selected, so its `value` is that version');
  assert.equal(unqualified._tier, 'temp', 'and that version stands at `temp`, the lower-persistence anchor (`native contract.md:1789`–`:1794`) — read ' + JSON.stringify(unqualified._tier));
  assert.equal(unqualified._tier === 'mem', false, 'and NOT the more persistent version, which is the reading the guide states and this cell does not rest on');

  // ── AND `_tier` IS A SINGULAR IN EVERY ANSWER ABOVE: one string of `Tier`'s three, never an array.
  for (const answer of [tree, unqualified, narrowedTemp, narrowedMem]) {
    assert.equal(Array.isArray(answer._tier), false, '`_tier` is never an array — the referent is one version\'s tier, never a set (`PIN-4` (ii))');
    assert.equal(typeof answer._tier, 'string');
  }
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-09` · `PIN-9` — THE OMITTED MEMBER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-09 · `PIN-9` (i)–(iii) · THE OMITTED MEMBER: a `file`-tier parent whose only child stands at `temp` answers `{ _tier: \'file\' }` and NO member for the child — no name and no `_tier` — while the addressed read of that child under the same set refuses `TierNotFound` at the WALK step', (t) => {
  // DECLARED: "**at a WALK step the passed set refuses … and at an ASSEMBLY step it OMITS: a key whose
  // container holds an anchor but whose anchors lie at NO passed tier contributes NO entry**" (`contract.md`
  // `PIN-9` (i), on `docs/specs/storeroom-native/contract.md:1745`–`:1747` and `:2264`–`:2267`); and "**THE
  // OMITTED MEMBER HAS NO `_tier` AND THERE IS NOTHING TO STAMP … no node exists in the answer and no field is
  // minted for it — a member that is not delivered is not delivered WITH a tier**" (`PIN-9` (ii)).
  const file = fileRegister();
  t.after(() => file.dispose());
  const { store } = file;
  assert.equal(attempt(() => store.write(['g'], 'file', {})).answered, true, 'the `file`-tier parent must land');
  assert.equal(attempt(() => store.write(['g', 'child'], 'temp', 'x')).answered, true, 'and its only child stands at `temp`');

  // ── THE DRIVE'S OWN COHERENCE: the child EXISTS (the unqualified read carries it) and `read` OMITS it under
  // the `file` set — so the omission this cell reads is the assembly's and not an empty store.
  assert.deepEqual(store.read(['g']), { child: 'x' }, 'the drive\'s own state: the unqualified `read` carries the child');
  assert.deepEqual(store.read(['g'], ['file']), {}, 'and `read([\'g\'], [\'file\'])` OMITS it — the same act this verb inherits');
  const childRefusal = attempt(() => store.read(['g', 'child'], ['file']));
  assert.equal(statusOf(childRefusal), 'TierNotFound', 'and the ADDRESSED read of the child under that set refuses `TierNotFound` at the walk step');

  const answer = store.readTiered(['g'], ['file']);
  t.diagnostic(`TRO-09 · read(['g']) = ${JSON.stringify(store.read(['g']))} · read(['g'],['file']) = ${JSON.stringify(store.read(['g'],['file']))} · readTiered(['g'], ['file']) = ${JSON.stringify(answer)}`);
  const node = compiledNode(answer, 'TRO-09 omitted member');

  // ── THE PARENT ANSWERS, AND IT ANSWERS THE EMPTY-CONTAINER FORM WITH ITS OWN TIER.
  assert.deepEqual(node.names, ['_tier'], 'the parent answers ONE member — the empty-container form with the addressed node\'s own tier (`PIN-8` (v)) — read ' + JSON.stringify(node.names));
  assert.equal(node.tier, 'file', 'and that `_tier` is the ADDRESSED node\'s own tier — read ' + JSON.stringify(node.tier));

  // ── AND THERE IS NO MEMBER FOR THE CHILD: NO NAME, NO `_tier`, NO `null` IN ITS PLACE.
  assert.equal(Object.prototype.hasOwnProperty.call(answer, 'child'), false, 'the out-of-set child contributes NO member and NO name');
  assert.equal('child' in answer, false, 'and it is absent by `in` as well as by own-name — no inherited stand-in');
  assert.equal(node.names.includes('child'), false, 'and no `_tier: null` stands in its place — a member that is not delivered is not delivered WITH a tier (`PIN-9` (ii))');

  // ── AND THE ADDRESSED WALK REFUSES: a `readTiered` at the child under the same set is `TierNotFound`.
  const addressed = attempt(() => store.readTiered(['g', 'child'], ['file']));
  t.diagnostic(`TRO-09 · readTiered(['g','child'], ['file']) read ${JSON.stringify(statusOf(addressed))}`);
  assert.equal(statusOf(addressed), 'TierNotFound', 'the WALK step refuses where the ASSEMBLY step omits — `PIN-9` (i)\'s two acts, unchanged');

  // ── AND THE UNQUALIFIED READ OF THE PARENT DOES CARRY THE CHILD, so the omission above is the ARGUMENT's.
  const whole = store.readTiered(['g']);
  t.diagnostic(`TRO-09 · readTiered(['g']) = ${JSON.stringify(whole)}`);
  assert.equal(Object.prototype.hasOwnProperty.call(whole, 'child'), true, 'with no set passed, the child IS delivered — the omission is the tier argument\'s and not the store\'s');
  assert.equal(whole.child._tier, 'temp', 'and its own node\'s tier is `temp` — the tier the `file` set excluded');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-10` · `PIN-7` — THE REFUSAL SET IS `read`'s AND NO SIXTH CODE IS REACHABLE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-10 · `PIN-7` (i)–(iv) · THE REFUSAL SET IS `read`\'s OWN AND NO SIXTH CODE IS REACHABLE: `AddressMalformed` (a segment outside the domain, and a SUPPLIED `undefined` at the tier position), `AddressNotFound`, `TierNotFound`, `LeafHasNoDownstream`, `OutOfDomainTier` — while a BRANCH answers, because this verb is not `readLiteral`', (t) => {
  // DECLARED: "**(i) THE CLOSED SET IS FIVE, AND THEY ARE `read`'s** … **(ii) NO SIXTH CODE IS REACHABLE** …
  // **(iv) THE COMPILATION CANNOT FAIL … and `readTiered` adds no `ReadTargetIsBranch` — that code is
  // `readLiteral`'s narrowing and this verb has no narrowing**" (`contract.md` `PIN-7`), on `D-121-ter` item 5
  // (`strata/decisions.md:6221`).
  const store = mem();
  assert.equal(attempt(() => store.write(['k'], 'mem', 'leaf')).answered, true, 'the drive\'s leaf must land');
  assert.equal(attempt(() => store.write(['o'], 'mem', { a: 1 })).answered, true, 'and the drive\'s object must land');

  // ── THE DRIVE'S OWN COHERENCE BEFORE ANY REFUSAL IS READ: a call of an ABSENT member throws a `TypeError`
  // with no `status`, and that `TypeError` is indistinguishable from a refusal read one layer up — so the
  // verb's existence is read FIRST and every arm below is the VERB's arm and not a missing member's.
  t.diagnostic(`TRO-10 · typeof store.readTiered = ${JSON.stringify(typeof store.readTiered)}`);
  assert.equal(typeof store.readTiered, 'function', 'the verb must exist before its refusals can be read — read ' + JSON.stringify(typeof store.readTiered));

  // ── THE ARMS, EACH AT ITS OWN TRIGGER — and each trigger is FIRST driven through `read`, so the cell knows
  // the store refuses there before it asks the new verb to.
  const ARMS = [
    ['AddressMalformed', 'a segment outside the domain', () => store.read([{}]), () => store.readTiered([{}])],
    ['AddressMalformed', 'a SUPPLIED `undefined` at the tier position', () => store.read(['k'], undefined), () => store.readTiered(['k'], undefined)],
    ['AddressNotFound', 'no anchor at the key', () => store.read(['missing']), () => store.readTiered(['missing'])],
    ['TierNotFound', 'an anchor at the key and no passed tier matching', () => store.read(['k'], ['file']), () => store.readTiered(['k'], ['file'])],
    ['LeafHasNoDownstream', 'the walk descending past a leaf', () => store.read(['k', 'downstream']), () => store.readTiered(['k', 'downstream'])],
    ['OutOfDomainTier', 'the tier argument\'s own domain', () => store.read(['k'], 'archive'), () => store.readTiered(['k'], 'archive')],
  ];

  const observed = [];
  for (const [wantStatus, trigger, viaRead, viaTiered] of ARMS) {
    const readArm = attempt(viaRead);
    assert.equal(statusOf(readArm), wantStatus, `the drive's own state: \`read\` refuses ${trigger} with \`${wantStatus}\` — read ${JSON.stringify(statusOf(readArm))}`);
    const arm = attempt(viaTiered);
    observed.push([trigger, statusOf(arm)]);
    assert.equal(arm.answered, false, `\`readTiered\` must REFUSE ${trigger} — it answered ${JSON.stringify(arm.value)}`);
    assert.equal(statusOf(arm), wantStatus, `and the status is \`${wantStatus}\`, the code \`read\` itself carries there — read ${JSON.stringify(statusOf(arm))}`);
    assert.equal(FIVE_STATUSES.includes(statusOf(arm)), true, 'and no SIXTH status is reachable — the closed set is five (`PIN-7` (i)–(ii))');
    assert.notEqual(statusOf(arm), 'ReadTargetIsBranch', 'and `ReadTargetIsBranch` is `readLiteral`\'s narrowing and never this verb\'s (`PIN-7` (iv))');
  }
  t.diagnostic(`TRO-10 · the six refused arms read ${JSON.stringify(observed)}`);
  assert.equal(new Set(observed.map(([, status]) => status)).size, 5, 'five distinct statuses and no sixth — read ' + JSON.stringify([...new Set(observed.map(([, status]) => status))].sort()));

  // ── AND A BRANCH ANSWERS: this verb is NOT `readLiteral`, so the two branches answer where `readLiteral`
  // would refuse. The register counts as a branch too — `readLiteral([])` refuses it (`PIN-8` (ii)).
  const literalAtObject = attempt(() => store.readLiteral(['o']));
  assert.equal(statusOf(literalAtObject), 'ReadTargetIsBranch', 'PREMISE: `readLiteral` refuses a branch — that is its own narrowing, and the contrast this arm reads');

  const objectAnswer = store.readTiered(['o']);
  const registerAnswer = store.readTiered([]);
  t.diagnostic(`TRO-10 · a BRANCH answers instead: readTiered(['o']) = ${JSON.stringify(objectAnswer)} · readTiered([]) = ${JSON.stringify(registerAnswer)}`);
  compiledNode(objectAnswer, 'TRO-10 branch at an object node');
  compiledNode(registerAnswer, 'TRO-10 branch at the register');
  assert.equal(attempt(() => store.readLiteral([])).err.status, 'ReadTargetIsBranch', 'PREMISE: `readLiteral` refuses the register too');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-11` · `PIN-5` (v) — THE WRITE-BACK IS THE DECLARED CONSEQUENCE AND NOT A RULE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-11 · `PIN-5` (v) as ANSWERED by `D-121-quater` item 2 (`strata/decisions.md:6246`) · THE WRITE-BACK IS THE DECLARED CONSEQUENCE AND NOT A RULE: a `readTiered` answer handed to `write` STANDS, and `read` of that write answers the wrappers and the minted `_tier` as ORDINARY STORED DATA', (t) => {
  // DECLARED: "**A CALLER WHO HANDS A `readTiered` ANSWER TO `write` STORES `_tier` AND THE WRAPPERS AS
  // ORDINARY DATA**, because the copy-in walk reads `Object.keys` (`bindings/js/src/entry/carrier.mjs:364`) …
  // **`D-121-quater` item 2 ANSWERED `Q-4` BY DECLINING BOTH ALTERNATIVES — *"A refusal and a strip are both
  // DECLINED"* — so this docblock IS the obligation AS LAW, and no rule is taken, owed or pending**"
  // (`contract.md` `PIN-5` (v)).
  //
  // ── **THIS CELL ASSERTS WHAT THE COPY-IN WALK DOES AND NO RULE.** It does not say the write-back is
  // permitted, forbidden, blessed or blessed-against: the ruling declined a rule, so a cell asserting one
  // would be asserting a clause no row of `strata/decisions.md` carries.
  const store = mem();
  assert.equal(attempt(() => store.write(['p'], 'mem', { a: 1 })).answered, true, 'the object the answer compiles must land');
  assert.equal(attempt(() => store.write(['q'], 'mem', [1, 2])).answered, true, 'and the array too, so both wrappers are driven');

  const objectAnswer = store.readTiered(['p']);
  const arrayAnswer = store.readTiered(['q']);
  t.diagnostic(`TRO-11 · readTiered(['p']) = ${JSON.stringify(objectAnswer)} · readTiered(['q']) = ${JSON.stringify(arrayAnswer)}`);

  // ── THE ANSWER STANDS: the walk does not refuse it and it does not strip it.
  const writeBack = attempt(() => store.write(['back'], 'mem', objectAnswer));
  assert.equal(writeBack.answered, true, `the copy-in walk takes the answer — a refusal here would be a rule no clause declares — read ${JSON.stringify(statusOf(writeBack))}`);
  const arrayBack = attempt(() => store.write(['back-array'], 'mem', arrayAnswer));
  assert.equal(arrayBack.answered, true, `and it takes the array wrapper too — read ${JSON.stringify(statusOf(arrayBack))}`);

  // ── AND `read` OF THAT WRITE ANSWERS THE MINTED `_tier` AND THE WRAPPERS AS ORDINARY STORED DATA — the very
  // tree the answer was, member for member, by the same values.
  const stored = store.read(['back']);
  const storedArray = store.read(['back-array']);
  t.diagnostic(`TRO-11 · after the write-back: read(['back']) = ${JSON.stringify(stored)} · read(['back-array']) = ${JSON.stringify(storedArray)} · read(['back','a','value']) = ${JSON.stringify(store.read(['back', 'a', 'value']))}`);
  assert.deepEqual(stored, objectAnswer, 'the minted `_tier` is STORED as ordinary data — `read` answers the same tree the answer was');
  assert.equal(Object.prototype.hasOwnProperty.call(stored, '_tier'), true, 'and it is not stripped: `_tier` stands as a member of the stored object');
  assert.deepEqual(stored.a, { _tier: objectAnswer.a._tier, value: 1 }, 'and the `{ value }` wrapper is stored as an ordinary member named `value`');
  assert.equal(store.read(['back', 'a', 'value']), 1, 'so the wrapped literal is reachable at the wrapper\'s own address, as data');
  assert.deepEqual(storedArray, arrayAnswer, 'and the ARRAY wrapper is stored the same way — `value` is an ordinary member holding the array');
  assert.deepEqual(store.read(['back-array', 'value']), arrayAnswer.value, 'whose elements are the compiled elements, as data');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-12` · `PIN-1` (i), `PIN-2` (iv) — THE MEMBER SET MOVED TO FIFTEEN AND NOTHING ELSE DID
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-12 · `PIN-1` (i) and `PIN-2` (iv) · THE MEMBER SET MOVED TO FIFTEEN AND NOTHING ELSE DID: the instance\'s own names are exactly the fourteen plus `readTiered`, each an own callable, and the module namespace is still the one name', (t) => {
  // DECLARED: `D-121-ter`'s mint — *"**the instance moves `14 → 15` members**"* (`strata/decisions.md:6223`),
  // at `PIN-1` (i)'s ONE member position beside `read`, with the namespace at ONE name (`PIN-2` (iv)).
  //
  // ── **THE CENSUS DEVICE IS `Object.getOwnPropertyNames`, WHICH SEES NON-ENUMERABLE STRING KEYS TOO**
  // (`docs/specs/storeroom-js/surface.md §2.1` (e) item 1), so a "fourteenth-and-a-half" member cannot hide
  // from it. **THE PACKAGE'S SYMBOL-KEYED OWN ROWS ARE A DIFFERENT CHANNEL AND ARE NOT THIS CENSUS'S SUBJECT**
  // — they are invisible to `Object.getOwnPropertyNames` and to `Object.keys` both (`A117` (D6)), and this
  // cell asserts nothing about them either way.
  const instance = mem();
  const own = ownNames(instance);
  const namespaceNames = Object.keys(NS).filter((key) => key !== 'default').sort();
  t.diagnostic(`TRO-12 · the instance's ${own.length} own names read ${JSON.stringify(own)} · the namespace reads ${JSON.stringify(namespaceNames)}`);

  // ── THE FIGURE AND THE SET: FIFTEEN, named.
  assert.equal(own.length, 15, 'the instance carries FIFTEEN own members — the fourteen plus `readTiered` — read ' + String(own.length));
  assert.deepEqual(own, FIFTEEN_MEMBERS, 'and they are exactly the FIFTEEN declared names, sorted as a set — read ' + JSON.stringify(own));
  assert.equal(own.includes('readTiered'), true, 'and `readTiered` is one of them');

  // ── EACH IS AN OWN CALLABLE, ENUMERABLE AND A DATA MEMBER — no accessor, no non-enumerable row.
  for (const name of FIFTEEN_MEMBERS) {
    assert.equal(Object.prototype.hasOwnProperty.call(instance, name), true, `\`${name}\` is an OWN member of the product`);
    const descriptor = Object.getOwnPropertyDescriptor(instance, name);
    assert.equal(typeof descriptor.value, 'function', `and \`${name}\` carries a function`);
    assert.equal(descriptor.enumerable, true, `and \`${name}\` is an own ENUMERABLE data member of the product`);
    assert.equal(typeof descriptor.get, 'undefined', `and no accessor stands at \`${name}\``);
  }

  // ── AND THE NAMESPACE DID NOT GROW A NAME: the member is a member and never an export (`PIN-2` (iv)).
  assert.deepEqual(namespaceNames, ['storeCreate'], 'the module namespace is still the ONE name, `storeCreate`');
  assert.equal(own.includes('storeCreate'), false, 'and the factory is not a member of its own product');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-C1` · `PIN-6` (i) — THE DECLARED CONTROL: `read`'s ANSWER IS BYTE-IDENTICAL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-C1 · `PIN-6` (i) · DECLARED CONTROL — `read`\'s ANSWER IS BYTE-IDENTICAL AND IS NOT REACHED BY THIS UNIT: for a fixed store state, `read(address)` and `read(address, tier)` answer exactly what they answer at `HEAD`, INCLUDING at an address holding a stored `_tier` member — and NO EXPECTED VALUE BELOW IS COMPUTED THROUGH `readTiered`', (t) => {
  // DECLARED: "**`read` AND `readLiteral` GAIN NO POSITION, NO DEFAULT AND NO ARM, AND THEIR ANSWERS ARE
  // BYTE-IDENTICAL AT EVERY STATE**" (`contract.md` `PIN-6` (i), `D-121-ter` item 4).
  //
  // ── **THE CONTROL'S OWN DISCIPLINE: every expectation below is a LITERAL written in this file, or a value
  // the drive itself wrote. NOT ONE of them is read through `readTiered`**, which would let the subject and
  // the control be wrong together and the cell green with both (`§2.2`'s own failure reading).
  const store = mem();
  assert.equal(attempt(() => store.write(['v'], 'mem', 'literal')).answered, true, 'the leaf must land');
  assert.equal(attempt(() => store.write(['o'], 'mem', { a: 1, b: 'two' })).answered, true, 'the object must land');
  assert.equal(attempt(() => store.write(['o', 'a'], 'temp', 42)).answered, true, 'and its member must be re-written at `temp`');
  assert.equal(attempt(() => store.write(['arr'], 'mem', [1, 'two', true])).answered, true, 'the array must land');
  assert.equal(attempt(() => store.write(['tier'], 'mem', { _tier: 'file', a: 1 })).answered, true, 'and the stored-`_tier` node must land');

  const readings = {
    "read(['v'])": store.read(['v']),
    "read(['v'], 'mem')": store.read(['v'], 'mem'),
    "read(['v'], ['mem','file'])": store.read(['v'], ['mem', 'file']),
    "read(['o'])": store.read(['o']),
    "read(['o'], ['mem'])": store.read(['o'], ['mem']),
    "read(['arr'])": store.read(['arr']),
    'read([])': store.read([]),
    "read([], ['mem'])": store.read([], ['mem']),
    "read(['tier'])": store.read(['tier']),
    "read(['tier','_tier'])": store.read(['tier', '_tier']),
    "read(['o','a'])": store.read(['o', 'a']),
  };
  t.diagnostic(`TRO-C1 · the fixed state's readings: ${JSON.stringify(readings)}`);

  // ── THE LITERALS. Each is the value the drive wrote, moved by nothing.
  assert.deepEqual(readings["read(['v'])"], 'literal');
  assert.deepEqual(readings["read(['v'], 'mem')"], 'literal');
  assert.deepEqual(readings["read(['v'], ['mem','file'])"], 'literal');
  assert.deepEqual(readings["read(['o'])"], { a: 42, b: 'two' }, 'the object assembles ONE MEMBER PER KEY (`R-2`) and no minted member');
  assert.deepEqual(readings["read(['o'], ['mem'])"], { a: 1, b: 'two' }, 'and under a passed set it selects the version standing there — the `mem` `a`, not the `temp` one');
  assert.deepEqual(readings["read(['arr'])"], [1, 'two', true], 'the array assembles dense from `0` (`R-3`)');
  assert.deepEqual(readings['read([])'], { arr: [1, 'two', true], o: { a: 42, b: 'two' }, tier: { _tier: 'file', a: 1 }, v: 'literal' }, 'the whole register, `R-5`, as an object of every key');
  assert.deepEqual(readings["read([], ['mem'])"], { arr: [1, 'two', true], o: { a: 1, b: 'two' }, tier: { _tier: 'file', a: 1 }, v: 'literal' }, 'and the same register under the `mem` set');
  assert.deepEqual(readings["read(['tier'])"], { _tier: 'file', a: 1 }, 'THE STORED-`_tier` ARM: `read` answers the caller\'s stored value verbatim (`PIN-5` (ii))');
  assert.equal(readings["read(['tier','_tier'])"], 'file');
  assert.equal(readings["read(['o','a'])"], 42);

  // ── AND NO MINTED MEMBER APPEARED ANYWHERE: the member sets `read` answers are the stored key sets alone.
  assert.deepEqual(ownNames(readings["read(['o'])"]), ['a', 'b'], 'the object\'s own names are its keys and nothing else — no `_tier` was minted into `read`');
  assert.deepEqual(Object.keys(readings["read(['arr'])"]), ['0', '1', '2'], 'and the array\'s are its indices — no wrapper was added');
  assert.deepEqual(ownNames(readings['read([])']), ['arr', 'o', 'tier', 'v'], 'and the register\'s own names carry no minted member either');

  // ── THE TWO REFUSALS THAT PROVE THE ARITY DID NOT MOVE: a supplied `undefined` and an out-of-domain token.
  const malformed = attempt(() => store.read(['v'], undefined));
  const outOfDomain = attempt(() => store.read(['v'], 'archive'));
  const outOfSet = attempt(() => store.read(['o'], 'temp'));
  t.diagnostic(`TRO-C1 · read(['v'], undefined) read ${JSON.stringify(statusOf(malformed))} · read(['v'], 'archive') read ${JSON.stringify(statusOf(outOfDomain))} · read(['o'], 'temp') read ${JSON.stringify(statusOf(outOfSet))}`);
  assert.equal(statusOf(malformed), 'AddressMalformed', '`read`\'s supplied-`undefined` arm is unmoved (`PIN-2` (iii))');
  assert.equal(statusOf(outOfDomain), 'OutOfDomainTier', 'and its tier-domain arm is unmoved');
  assert.equal(statusOf(outOfSet), 'TierNotFound', 'and a walk step matching no passed tier refuses `TierNotFound`, exactly as `L-TIER` declares');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `TRO-C2` · `PIN-6` (i), `PIN-7` (iv) — THE DECLARED CONTROL: `readLiteral` IS UNMOVED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('TRO-C2 · `PIN-6` (i) and `PIN-7` (iv) · DECLARED CONTROL — `readLiteral` IS UNMOVED AND STILL REFUSES BRANCHES: a leaf answers the same literal `read` answers, a branch refuses `ReadTargetIsBranch`, and NO tiered twin of `readLiteral` exists', (t) => {
  // DECLARED: "**`readLiteral` has NO tiered twin** — the compiled form is node-kind-driven, so there is
  // nothing for a literal-only narrowing to add" (`D-121-ter` item 5, `strata/decisions.md:6221`); and
  // `PIN-7` (iv): `ReadTargetIsBranch` *"is `readLiteral`'s narrowing and this verb has no narrowing"*.
  const store = mem();
  assert.equal(attempt(() => store.write(['v'], 'mem', 'literal')).answered, true, 'the leaf must land');
  assert.equal(attempt(() => store.write(['o'], 'mem', { a: 1 })).answered, true, 'the branch must land');

  const literal = store.readLiteral(['v']);
  const viaRead = store.read(['v']);
  const atBranch = attempt(() => store.readLiteral(['o']));
  const atRegister = attempt(() => store.readLiteral([]));
  const underSet = store.readLiteral(['v'], ['mem', 'file']);
  t.diagnostic(`TRO-C2 · readLiteral(['v']) = ${JSON.stringify(literal)} · read(['v']) = ${JSON.stringify(viaRead)} · readLiteral(['o']) read ${JSON.stringify(statusOf(atBranch))} · readLiteral([]) read ${JSON.stringify(statusOf(atRegister))} · readLiteral(['v'], ['mem','file']) = ${JSON.stringify(underSet)}`);

  // ── THE LEAF ANSWERS THE SAME LITERAL AS `read`, with NO WRAPPER — the indifference the default arm
  // declares (`docs/specs/storeroom-native/contract.md:2188`–`:2192`).
  assert.equal(literal, 'literal', 'a leaf answers the stored literal');
  assert.deepEqual(literal, viaRead, 'and it is the same literal `read` answers — `readLiteral`\'s `ReadTargetIsBranch` is the only difference between the two verbs');
  assert.equal(typeof literal, 'string', 'and it is delivered as the primitive, with no `value` wrapper and no `_tier`');
  assert.deepEqual(underSet, 'literal', 'and a passed tier set selects the same version, unmoved');

  // ── THE BRANCH REFUSES, AT BOTH BRANCH SHAPES: an object node and the register.
  assert.equal(statusOf(atBranch), 'ReadTargetIsBranch', 'a branch refuses `ReadTargetIsBranch` — this narrowing is `readLiteral`\'s own');
  assert.equal(statusOf(atRegister), 'ReadTargetIsBranch', 'and the register is a branch too');

  // ── AND NO TIERED TWIN EXISTS: neither a `readLiteralTiered` member nor any second `readLiteral`-shaped
  // name stands on the product (`D-121-ter` item 5).
  const literalShaped = ownNames(store).filter((name) => name.startsWith('readLiteral'));
  t.diagnostic(`TRO-C2 · the product's \`readLiteral\`-shaped own names read ${JSON.stringify(literalShaped)}`);
  assert.deepEqual(literalShaped, ['readLiteral'], 'the product carries `readLiteral` alone — NO tiered twin of it exists');
  assert.equal(typeof store.readLiteralTiered, 'undefined', 'and a `readLiteralTiered` member is absent');
});
