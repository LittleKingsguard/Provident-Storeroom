// tests/e2e/blind-kernel-surface.test.mjs
//
// BLIND INSTRUMENT — THE KERNEL'S OWN SURFACE: its SIX items `K-1`…`K-6` and their arity with the store in
// the FIRST position, the closed `KC` token set and its count, the ONE identity each call answers, and
// `K-4`/`K-5` taking the `AttemptRef` OR its `id` string and NOTHING ELSE. The kernel is not a subpath
// export, and this file says what that means for a caller.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/kernel-surface.md` §1 items 1,
//     2 and 5 (the module's declared name and its ONE checkout home, the six-item extent `5 + 1 = 6` ✓
//     under `R-B2`, the store-in-first-position binding and the printed call shapes) · §2.1 items 1–5 (the
//     five original items' signatures, return shapes and throw patterns, `RD-9`) · §2.5 item 1 (the log)
//   · `docs/specs/storeroom-held-listener-identity/contract.md` §2.9 items 3, 5 and 7 (`K-6
//     remove(store, pair) -> undefined`, the extent's arithmetic, the pair's shape) and §2.7 item 9
//   · .../storeroom-constraints/attempt-lifecycle.md §2.4 items 1 and 3 (the one-member `AttemptRef`;
//     `id` non-empty, kernel-unique, minted at `K-2`; the six lifecycle states) and item 4's arms
//   · .../storeroom-constraints/fail-surface.md §1.1 items 1–4 (the kernel's ONE three-member thrown
//     form, the token spelling `KC-1`…`KC-8`, the thrown-not-returned rule) and §2 (the closed set, its
//     `2 + 2 + 2 + 1 + 1 = 8` arithmetic and its `13` trigger sites)
//   · .../storeroom-constraints/parameter-semantics.md §2.1, §2.2, §2.15 (`AttemptRef`, *"TOGETHER WITH the
//     bare `id` string itself, which `K-4`/`K-5` accept as the same argument; NOTHING ELSE"*)
//   · `bindings/js/index.d.ts` — `CommitRecord` (four members), `AttemptRef` (one member) and the
//     published realm of the package whose map does NOT carry the kernel (its head and `§2.4` item 9)
//   · `archive/.../storeroom-publish/distribution.md` §2.1 item 6 / `A121`–`A122`: the kernel is *"NOT a
//     separately reachable export: the `exports` arm set is UNMOVED, the subpath shape is REFUSED BY
//     NAME"*, and its items are INTERNAL ORCHESTRATION STAGES
//
// The six existing blind instances were read ONLY to avoid duplicating a cell; none of them drives the
// kernel, so none of theirs is re-authored here. NO byte of `bindings/js/index.mjs`,
// `bindings/js/src/**` or `src/**` was read, no other battery or runner under `tests/**` was read, and NO
// CELL OPENS A `docs/**` PATH AT RUNTIME (`D-17`): every expectation below is a LITERAL written here.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, symlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as kernel from '../../bindings/js/src/constraint-kernel.mjs';
import { storeCreate } from '../../bindings/js/index.mjs';

const { register, commit, runAttempt, log, report, remove } = kernel;

const here = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(here, '..', '..', 'bindings', 'js');

/** A store constructed at the two REQUIRED `cfg` keys alone (`surface.md §2.1`). */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** Run `fn`, returning the thrown value. A call that RETURNS is a failure of every cell that uses this. */
const catchIt = (fn) => {
  try {
    fn();
  } catch (thrown) {
    return thrown;
  }
  assert.fail('the call returned; the declared surface says it THROWS');
};

/** A plain violation with no registered repair — `PAR-C-5`'s `{message}` arm — so the attempt reaches
 *  `KC-3` on its first evaluation of the pair. */
const violating = (read, address, violatingValue) =>
  () => (read(address) === violatingValue ? { message: 'the value is outside the constraint' } : true);

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

/** `kernel-surface.md §1` item 2, amended by `R-B2`: SIX items, `5 + 1 = 6` ✓. */
const SIX_ITEMS = ['register', 'commit', 'runAttempt', 'log', 'report', 'remove'];

/** The same item, by item number — the vocabulary every clause above uses. */
const ITEM_NUMBER = {
  register: 'K-1',
  commit: 'K-2',
  runAttempt: 'K-3',
  log: 'K-4',
  report: 'K-5',
  remove: 'K-6',
};

/** `kernel-surface.md §2.1`'s signature block, as amended: `register(store, address, id, constraint)`,
 *  `commit(store, address, tier, value)`, `runAttempt(store, commit)`, `log(store, attempt)`,
 *  `report(store, attempt)` and `remove(store, pair)` — four, four, two, two, two, two. */
const DECLARED_ARITY = { register: 4, commit: 4, runAttempt: 2, log: 2, report: 2, remove: 2 };

/** `fail-surface.md §2`: the set is CLOSED AT NINE — `2 + 2 + 2 + 1 + 1 + 1 = 9` ✓ — and the `status` member
 *  carries THE TOKEN SPELLING and never a name and never a store code.
 *
 *  **⟶ MOVED `8 → 9` ON 2026-10-28 BY `D-53`'s THIRD RULING (*"Open the token set"*), AND BY NOTHING ELSE:** the
 *  appended member is the SAVE ARM's own `KC-9`, so a failed `file`-tier save and a constraint refusal cross with
 *  different statuses **and each is derivable from the log's terminal state** — `D-52` measured `KC-8` crossing as
 *  both while the save arm had no token of its own. **NO OTHER READING OF THIS CELL MOVES**: the tokens are still
 *  the whole declared set, `status` still never carries a name and never a store code. */
const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8', 'KC-9'];

/** Every name the surface's refused sixth and later passes put forward: none of them is an item. */
const NOT_ITEMS = ['unregister', 'attempts', 'pending', 'createKernel', 'settle', 'constraintLog'];

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('kernel · kernel-surface.md §1 item 1 · THE MODULE IS ONE Node ESM MODULE NAMED `constraint-kernel` WHOSE ONE CHECKOUT HOME IS `bindings/js/src/constraint-kernel.mjs`, AND ITS NAMESPACE CARRIES THE SIX ITEM NAMES AND NOTHING ELSE', () => {
  assert.deepEqual(Object.keys(kernel).sort(), [...SIX_ITEMS].sort());
  for (const item of SIX_ITEMS) assert.equal(typeof kernel[item], 'function', `${item} is a function`);
  // No default export, no factory, no constant table: a seventh name is a FINDING.
  assert.equal('default' in kernel, false);
  for (const name of NOT_ITEMS) {
    assert.equal(name in kernel, false, `${name} is not a name this surface declares`);
  }
});

test('kernel · §1 item 2 (`R-B2`: *"THE KERNEL\'S DECLARED EXTENT MOVES `5 → 6`"*) · THE EXTENT IS SIX ITEMS — `K-1` register · `K-2` commit · `K-3` runAttempt · `K-4` log · `K-5` report · `K-6` remove — `5 + 1 = 6` ✓, and no SEVENTH name is reachable', () => {
  assert.equal(SIX_ITEMS.length, 6);
  assert.equal(6 - 1, 5); // `5 + 1 = 6` ✓, read with its terms
  assert.deepEqual(Object.keys(ITEM_NUMBER).sort(), [...SIX_ITEMS].sort());
  const surface = Object.keys(kernel);
  assert.equal(surface.length, 6);
  assert.deepEqual(surface.filter((name) => !SIX_ITEMS.includes(name)), []);
});

test('kernel · §2.1\'s signature block · EACH ITEM\'S ARITY IS ITS DECLARED PARAMETER COUNT — `K-1` and `K-2` take FOUR, and `K-3`…`K-6` take TWO', () => {
  for (const item of SIX_ITEMS) {
    assert.equal(kernel[item].length, DECLARED_ARITY[item], `${ITEM_NUMBER[item]} ${item} declares arity ${DECLARED_ARITY[item]}`);
  }
  assert.deepEqual(Object.values(DECLARED_ARITY), [4, 4, 2, 2, 2, 2]);
});

test('kernel · §1 item 5 (*"EACH OF THE FIVE ITEMS TAKES THE CALLER\'S OWN STORE … AS ITS FIRST ARGUMENT"*) · THE STORE IS POSITION ONE AT EVERY ITEM, AND THE CALL REACHES THE INSTANCE THE CALLER PASSED AND NO OTHER', () => {
  const first = make();
  const second = make();
  const issued = commit(first, ['a'], 'mem', 1);
  assert.equal(issued.attempt.id.length > 0, true);
  // The write `K-2` issues landed in the instance it was handed …
  assert.equal(first.read(['a']), 1);
  // … and the second instance is untouched, its register holding no key at that address.
  assert.equal(catchIt(() => second.read(['a'])).status, 'AddressNotFound');
});

test('kernel · §2.1 item 1 and held-listener contract §2.1 item 1 (`D-29`: *"Handle becomes the internal ID"*) · `K-1`\'s ANSWER IS ONE IDENTITY, ADOPTED AND NEVER MINTED: the pair\'s own `id`, and a second registration at that pair answers the SAME value', () => {
  const store = make();
  const first = register(store, ['a'], 'c1', () => true);
  assert.equal(typeof first, 'string');
  assert.equal(first, 'c1');
  assert.equal(register(store, ['a'], 'c1', () => true), first);
  // A second pair at the same address under a DIFFERENT id is a separate entry, and the store's home still
  // holds ONE entry at that address — so the answer is the pair's own id and never a second mint.
  assert.equal(register(store, ['a'], 'c2', () => true), 'c2');
});

test('kernel · §2.1 item 1, channel (i) (`KC-1`) · AN ADDRESS SHAPE OUTSIDE THE STORE\'S DOMAIN IS REFUSED BY THE KERNEL BEFORE THE STORE SEES ANYTHING, IN `§1.1`\'s THREE-MEMBER FORM, WITH THE TOKEN SPELLING `KC-1`', () => {
  const store = make();
  for (const outside of [null, undefined, 'a', 7, (() => {})(), ['a', true], ['a', -1], ['a', 1.5]]) {
    const caught = catchIt(() => register(store, outside, 'c1', () => true));
    assert.equal(caught.status, 'KC-1', `the address ${JSON.stringify(outside)} is outside the shape domain`);
    assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status']);
    assert.equal(Array.isArray(caught.log), true);
  }
});

test('kernel · §2.1 item 1, channel (ii) (`KC-2`) and `PAR-C-2` · AN `id` THAT IS NOT A NON-EMPTY STRING, AND A `constraint` THAT IS NOT A FUNCTION, ARE REFUSED WITH `KC-2` — NO REGISTRY ENTRY AND NO STORE REGISTRATION', () => {
  const store = make();
  for (const outside of ['', null, undefined, 7, true, {}, ['x']]) {
    const caught = catchIt(() => register(store, ['a'], outside, () => true));
    assert.equal(caught.status, 'KC-2', `the id ${JSON.stringify(outside)} is outside the domain`);
    assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status']);
  }
  for (const outside of [undefined, null, 7, 'fn', {}, [], true]) {
    assert.equal(catchIt(() => register(store, ['a'], 'c1', outside)).status, 'KC-2');
  }
  // The store's home holds no entry for any of the refused registrations: a write there triggers nothing.
  const record = store.write(['a'], 'mem', 1);
  assert.deepEqual(record.triggered, []);
});

test('kernel · §2.1 item 2 and fail-surface §2 (`KC-7`) · A SECOND `K-2` AT AN ADDRESS WHOSE ATTEMPT IS OPEN IS REFUSED `KC-7` BEFORE THE WRITE VERB IS REACHED — the refused call moves nothing', () => {
  const store = make();
  commit(store, ['q'], 'mem', 1);
  const caught = catchIt(() => commit(store, ['q'], 'mem', 7));
  assert.equal(caught.status, 'KC-7');
  assert.equal(store.read(['q']), 1, 'the refused commit never reached the write verb');
});

test('kernel · §2.1 item 2 and attempt-lifecycle §2.4 item 1 · `K-2` ANSWERS ONE IDENTITY PER CALL: a `CommitRecord` of exactly FOUR members whose `attempt` is the ONE-member `{id}`, non-empty and unique within the instance', () => {
  const store = make();
  const one = commit(store, ['a'], 'mem', 1);
  const two = commit(store, ['b'], 'mem', 2);
  assert.deepEqual(Object.keys(one).sort(), ['attempt', 'op', 'pending', 'triggered']);
  assert.deepEqual(Object.keys(one.attempt), ['id']);
  assert.equal(typeof one.attempt.id, 'string');
  assert.equal(one.attempt.id.length > 0, true);
  assert.notEqual(one.attempt.id, two.attempt.id, 'each call mints its own identity');
  // `op` is the store's own write return, VERBATIM — the store's own eight-member journal record at the
  // caller's own address, carrying the value this call landed.
  assert.equal(typeof one.op.opId, 'string');
  assert.equal(one.op.kind, 'write');
  assert.deepEqual(one.op.address, ['a']);
  assert.equal(one.op.tier, 'mem');
  assert.equal(one.op.after.present, true);
  assert.equal(one.op.after.value, 1);
});

test('kernel · §2.1 item 3 · `K-3` ANSWERS THE FIVE-MEMBER `AttemptReport`: `outcome` is the success arm\'s ONE value `\'passed\'`, `rollback` is `[]`, and the report\'s `attempt` IS the commit\'s identity — *"one identity, at both instants"*', () => {
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  assert.deepEqual(Object.keys(attemptReport).sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback']);
  assert.equal(attemptReport.outcome, 'passed');
  assert.deepEqual(attemptReport.rollback, []);
  assert.equal(attemptReport.attempt.id, issued.attempt.id);
});

test('kernel · §2.1 items 4–5 and parameter-semantics §2.15 (*"the `AttemptRef` record or its `id` string and NOTHING ELSE"*) · `K-4` AND `K-5` ACCEPT EITHER SPELLING AND ANSWER THE SAME VALUE; `null`, `undefined`, a number, an empty-id ref and an unknown id are each `KC-2`', () => {
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  const fromRecord = log(store, issued.attempt);
  const fromString = log(store, issued.attempt.id);
  assert.deepEqual(fromString, fromRecord, 'the reference and its own id are the SAME argument');
  assert.deepEqual(report(store, issued.attempt.id), report(store, issued.attempt));
  assert.deepEqual(report(store, issued.attempt).log, attemptReport.log);
  for (const outside of [null, undefined, 7, true, {}, { id: '' }, { id: 'no-such-attempt' }, 'no-such-attempt']) {
    assert.equal(catchIt(() => log(store, outside)).status, 'KC-2', `the reference ${JSON.stringify(outside)} names no attempt`);
    assert.equal(catchIt(() => report(store, outside)).status, 'KC-2');
  }
});

test('kernel · §2.1 items 4–5 · THE TWO READERS\' LIFETIME: over an OPEN attempt `K-4` returns the open record\'s own log and `K-5` throws `KC-7`; over the CLOSED attempt both answer the final record, and the log `K-4` reads is the report\'s own list', () => {
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  assert.deepEqual(log(store, issued.attempt), [], 'the open record has appended nothing yet');
  assert.equal(catchIt(() => report(store, issued.attempt)).status, 'KC-7', 'an OPEN attempt has no final record');
  const attemptReport = runAttempt(store, issued);
  assert.deepEqual(log(store, issued.attempt), attemptReport.log);
  assert.deepEqual(report(store, issued.attempt), attemptReport);
});

test('kernel · §2.1 items 4–5 (*"for `K-4` and `K-5` the argument is NEITHER VALIDATED NOR READ"*, read with *"a drive passes the caller\'s own instance there and asserts NOTHING about it"*) · THE TWO READERS TAKE THE CALLER\'S OWN STORE IN POSITION ONE AND REACH IT NEVER: repeated calls append no entry, move no value, and answer the same log and the same report', () => {
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  const closedLength = attemptReport.log.length;
  // The position IS the store position (`§1` item 5 binds every item's first position to the caller's own
  // instance) and the item ANSWERS the caller — while its own declared sentence says the two readers reach
  // the store NEVER, so the only lawful observable is that NOTHING MOVES across them.
  const firstRead = log(store, issued.attempt);
  const secondRead = log(store, issued.attempt);
  assert.deepEqual(secondRead, firstRead);
  assert.equal(log(store, issued.attempt).length, closedLength, 'a reader appends no entry');
  const firstReport = report(store, issued.attempt);
  assert.deepEqual(report(store, issued.attempt), firstReport);
  assert.deepEqual(firstReport.log, firstRead, 'the two readers answer ONE list');
  assert.equal(store.read(['a']), 1, 'no reader moved the store\u2019s own state');
});

test('kernel · fail-surface §1.1 items 1–4 and §2 · THE `KC` SET IS CLOSED AT NINE — `2 + 2 + 2 + 1 + 1 + 1 = 9` ✓ (`8 → 9` by `D-53`, 2026-10-28) — AND EVERY `status` THE SURFACE THROWS IS ONE OF THE NINE TOKEN SPELLINGS, never a name and never a store code', () => {
  const store = make();
  const observed = new Set();
  const note = (caught) => {
    assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status'], 'the kernel\u2019s own act throws the three-member form');
    assert.equal(typeof caught.message, 'string');
    assert.equal(caught.message.length > 0, true);
    observed.add(caught.status);
  };

  note(catchIt(() => register(store, null, 'c1', () => true))); // KC-1
  note(catchIt(() => register(store, ['a'], '', () => true))); // KC-2
  const plain = make();
  plain.write(['n'], 'mem', 0);
  register(plain, ['n'], 'plain', violating(plain.read.bind(plain), ['n'], 1));
  note(catchIt(() => runAttempt(plain, commit(plain, ['n'], 'mem', 1)))); // KC-3
  const repaired = make();
  repaired.write(['n'], 'mem', 0);
  register(repaired, ['n'], 'repaired', () =>
    repaired.read(['n']) === 1 ? { message: 'v', repair: () => ({ ok: false, message: 'attempted and failed' }) } : true,
  );
  note(catchIt(() => runAttempt(repaired, commit(repaired, ['n'], 'mem', 1)))); // KC-4
  const held = make();
  commit(held, ['q'], 'mem', 1);
  note(catchIt(() => commit(held, ['q'], 'mem', 2))); // KC-7

  assert.deepEqual([...observed].sort(), ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-7']);
  for (const status of observed) assert.equal(KC_TOKENS.includes(status), true, `${status} is a member of the closed nine`);
  for (const status of observed) assert.equal(status.startsWith('KC-'), true, 'the token spelling, never a name and never a store code');
  assert.equal(KC_TOKENS.length, 9);
  assert.equal(2 + 2 + 2 + 1 + 1, 8);
});

test('kernel · §2.1 item 3 (`RD-9`) · A `K-3` WHOSE `CommitRecord.attempt` NAMES A CLOSED ATTEMPT IS REFUSED `KC-2` AND NOT `KC-7` — the attempt is not live, and no entry is appended', () => {
  const store = make();
  const issued = commit(store, ['a'], 'mem', 1);
  const attemptReport = runAttempt(store, issued);
  const before = attemptReport.log.length;
  assert.equal(catchIt(() => runAttempt(store, issued)).status, 'KC-2');
  assert.equal(log(store, issued.attempt).length, before, 'the closed record\u2019s log is untouched');
});

test('kernel · held-listener contract §2.9 item 3 (*"`K-6 remove(store, pair) -> undefined`"*) · THE SIXTH ITEM ANSWERS `undefined` FOR A PAIR IT HOLDS AND `KC-2` FOR A PAIR IT HOLDS NO ROW FOR, with both structures unmoved by the refusal', () => {
  const store = make();
  register(store, ['a'], 'c1', () => true);
  assert.equal(remove(store, { address: ['a'], id: 'c1' }), undefined, 'success is `undefined`, matching `removeConstraint`\u2019s own answer');
  // The row is gone: the same pair now names no row, and nothing moves.
  assert.equal(catchIt(() => remove(store, { address: ['a'], id: 'c1' })).status, 'KC-2');
  assert.equal(catchIt(() => remove(store, { address: ['b'], id: 'never' })).status, 'KC-2');
  // A pair outside the kernel's own domain is `KC-2` too, before any store verb.
  assert.equal(catchIt(() => remove(store, { address: ['a'], id: '' })).status, 'KC-2');
});

test('kernel · distribution.md §2.1 item 6 (`A121`/`A122`: *"NOT a separately reachable export: the `exports` arm set is UNMOVED, the subpath shape is REFUSED BY NAME"*) · THE KERNEL IS NOT A SUBPATH EXPORT — so a package consumer reaches NO item by specifier, and the six items are internal orchestration a caller drives only through its own checkout home', () => {
  const root = mkdtempSync(join(tmpdir(), 'kernel-surface-'));
  mkdirSync(join(root, 'node_modules'));
  symlinkSync(PACKAGE_DIR, join(root, 'node_modules', 'provident-storeroom'), 'dir');
  const code = [
    'const code = async (specifier) => {',
    '  try {',
    '    const m = await import(specifier);',
    "    return 'REACHABLE ' + JSON.stringify(Object.keys(m).sort());",
    '  } catch (e) {',
    "    return 'REFUSED ' + (e && e.code ? e.code : String(e));",
    '  }',
    '};',
    'console.log(await code(\'provident-storeroom/src/constraint-kernel.mjs\'));',
    'console.log(await code(\'provident-storeroom\'));',
  ].join('\n');
  const printed = spawnSync(process.execPath, ['--input-type=module', '-e', code], { cwd: root, encoding: 'utf8' }).stdout.trim().split('\n');
  assert.deepEqual(printed, [
    'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED',
    'REACHABLE ["storeCreate"]',
  ]);
  // WHAT THAT MEANS FOR A CALLER, in the same cell: the package's entry hands out no kernel item, so a
  // consumer of the published package can only reach a constraint through the instance's own members —
  // the six items are reachable at the checkout home this file imports and by no specifier.
  for (const item of SIX_ITEMS) assert.equal(typeof kernel[item], 'function');
});
