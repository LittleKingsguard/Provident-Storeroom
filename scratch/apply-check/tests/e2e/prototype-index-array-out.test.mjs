// tests/e2e/prototype-index-array-out.test.mjs
//
// DERIVED INSTRUMENT — THE `F8-2` CLASS'S *OUT* VECTOR: **A LAWFUL WRITE'S VALUE MUST COME BACK AS THE EXACT
// VALUES WRITTEN, WHATEVER AN OWN GETTER-ONLY ACCESSOR AT `Array.prototype`'S INDEX LOOKS LIKE.**
//
// **PROVENANCE, AND WHY THIS CELL IS DERIVED AND NOT BLIND.** `tests/e2e/prototype-index-write.test.mjs` is the
// model and this cell is its sibling on the other side of the crossing. That cell closed the *write* vector of
// the class (a lawful `write` must not answer with a raw host `TypeError`) and it REPORTED, without owning, the
// native half it could not assert round: its own header, item **(b)**, records that *"the admitted arms assert
// the shape of the answer and the ABSENCE of a host object, and they do NOT assert `reads === 0`: an admitted
// `write` copies its journal op's address out of the native codec, whose array construction is `[[Set]]`-based
// (`bindings/js/src/codec.rs`, `fn array`) and is therefore holed under this mutation — a native site this pass
// reports and does not own."* **THIS CELL OWNS IT.** The state was measured before this drive was authored, on
// the shipped artefact, and it is a WRONG VALUE out of a lawful call and not a refusal:
//
//     record.op.address          → ["P0"]                    (written: ['list'])
//     record.op.after.value      → ["P0","P1"]               (written: ['x','y'])
//     read(['list'],'mem')       → ["P0","P1"]
//     read(['holder'],'mem')     → {k: 1, arr: ["P0","P1"]}
//
// **THE LANGUAGE FACT, AND WHY THE VALUES ARE WRONG RATHER THAN THE ARRAY BEING VISIBLY BROKEN.** An array the
// codec built out of elements is an array whose INDICES ARE HOLES: `napi_create_array_with_length` sets `length`
// and `napi_set_element` is a `[[Set]]`, which WALKS THE PROTOTYPE CHAIN, so under an own getter-only accessor at
// `Array.prototype[0]` the write answers `false` and the array keeps its `length` with nothing at index `0`. A
// hole is invisible to `Object.hasOwn`-free consumers: the JS layer's own decode walks `0…length-1` and DEFINES
// each element of a fresh array (`appendOwn`), so the array it hands back is DENSE — but the element it copied
// was read off the prototype. **The defect therefore surfaces as a wrong value and never as a hole**, which is
// why this cell asserts EXACT VALUES and `reads === 0` and not a shape.
//
// **THE LAW IS NOT WRITTEN BY THIS CELL: IT IS `contract.md §1`'s tree clause and `§2.1` item `(1c)`'s own law
// as corrected 2026-10-25** — *"a caller-visible array is built by a literal, by `Array.of`, or by DEFINING AN
// OWN PROPERTY, and never by `[[Set]]`"* — and the native half's own form is the same law stated for Node-API:
// **an own index is DEFINED (`napi_define_properties` with a `napi_property_descriptor`), never set.**
//
// **THE STATES, ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | a lawful `write` of a string array at `mem`, accessor installed | the declared record; `op.address` is exactly `['list']` and `op.after.value` exactly `['x','y']` |
// | a lawful `write` of a number array at `mem` | `['1,2']`-shaped: the record's `after.value` is exactly `[1,2]` |
// | a lawful `write` of a plain object carrying an array member | the record's `after.value` is exactly `{k: 1, arr: ['x','y']}` |
// | a lawful `write` of a nested array-in-object-in-array value | the record's `after.value` is exactly `{a: [[1,2],{b:['z']}]}` |
// | a lawful `read` back of each of the four | the exact value written |
// | a lawful `delete` at `mem` | the receipt's `address` exactly `['list']` and `tiers` exactly `['mem']` |
// | every array any of them answers with | DENSE: each index in `0…length-1` is an OWN property |
// | the prototype after every arm | RESTORED: no own index `0` or `1` on `Array.prototype`, and `0 in []` is `false` |
//
// **TWO DRIVING ACCOMMODATIONS, NAMED RATHER THAN LEFT TO A READER.** **(a)** The instance is CONSTRUCTED and
// its constraint kernel RESOLVED before the accessor is installed, and the cold-construction state is driven in
// a CHILD PROCESS instead — the ground is the model cell's and it is the RUNTIME's, not the package's: node's CJS
// loader performs `Array.prototype.push` internally, so under this mutation no module can be loaded for the
// first time, and a cold load is terminal for this module instance. **THE COLD *VALUE* ARM IS THEREFORE NOT
// DRIVEN AND THIS CELL SAYS SO**: what the child asserts is the PACKAGE's answer to cold construction (the one
// form, `FilePathUnreachable`, with `reads === 0`), exactly as the model cell's part (3) does. **(b)** Each
// `reads` delta is measured AROUND THE VERB CALL ALONE, because this cell's own assertions read the values the
// verb answered with and such a read is the test's, not the package's.
//
// **EACH CELL NAMES ITS CLAUSE AS `path §section`.**

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { storeCreate } from '../../bindings/js/index.mjs';

/** The package's entry, as a path a child process can import. */
const ENTRY = fileURLToPath(new URL('../../bindings/js/index.mjs', import.meta.url));

/** A store constructed at the two required `cfg` keys alone (`surface.md §2.1`). */
const make = () => storeCreate({ journalLength: 8, listeners: [] });

/**
 * **THE EXACT-VALUE ASSERTION, AND IT IS THE WHOLE POINT OF THIS CELL.** `assert.deepEqual` would compare the
 * same values, but a HOLED array compares its elements THROUGH THE PROTOTYPE, so a mutation-driven read is what
 * feeds the comparison and a failure names no index. This walk reads each index ONCE, asserts the index is an
 * OWN property first (`contract.md §2.1` item `(5)`'s `Object.hasOwn` byte and no chain), and then asserts the
 * value at it — so a failure names the position and the state.
 */
const assertExact = (actual, expected, path) => {
  if (Array.isArray(expected)) {
    assert.equal(Array.isArray(actual), true, `${path} is an array; got ${JSON.stringify(actual)}`);
    assert.equal(actual.length, expected.length,
      `${path} carries the written length ${expected.length}; got ${actual.length}`);
    for (let index = 0; index < expected.length; index += 1) {
      assert.equal(Object.hasOwn(actual, index), true,
        `${path}[${index}] is an OWN property: an array the package builds must DEFINE its indices, never `
        + '`[[Set]]` them through the prototype chain');
      assertExact(actual[index], expected[index], `${path}[${index}]`);
    }
    return;
  }
  if (expected && typeof expected === 'object') {
    assert.equal(actual !== null && typeof actual === 'object' && !Array.isArray(actual), true,
      `${path} is a plain object; got ${JSON.stringify(actual)}`);
    // The member SET, compared as a set — the crossing's own relation (`crossing.md §1.5` clause 1).
    assert.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort(),
      `${path}'s member set is the written one`);
    for (const key of Object.keys(expected)) {
      assertExact(actual[key], expected[key], `${path}.${key}`);
    }
    return;
  }
  assert.deepEqual(actual, expected, `${path} is exactly the value written`);
};

test('crossing · contract.md §2.1 item (1c) · an array the codec builds is DEFINED and never SET, so a lawful `write` and `read` answer the exact values written under an own getter-only accessor at Array.prototype\'s indices', () => {
  // ── THE ARRANGEMENT (accommodation (a)): the instance is built, and the lazily-resolved constraint kernel is
  // resolved by one warm write, BEFORE the accessor exists — see this file's header for the measured ground.
  const inst = make();
  inst.write(['warm'], 'mem', 'warm');

  let reads = 0;
  const install = () => {
    Object.defineProperty(Array.prototype, '0', {
      get() {
        reads += 1;
        return 'P0';
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Array.prototype, '1', {
      get() {
        reads += 1;
        return 'P1';
      },
      enumerable: false,
      configurable: true,
    });
  };
  const restore = () => {
    delete Array.prototype[0];
    delete Array.prototype[1];
  };
  const assertRestored = () => {
    assert.equal(Object.hasOwn(Array.prototype, '0'), false,
      'the drive must restore `Array.prototype`: index `0` is no longer an own member of it');
    assert.equal(Object.hasOwn(Array.prototype, '1'), false,
      'the drive must restore `Array.prototype`: index `1` is no longer an own member of it');
    assert.equal(0 in [], false, 'the restore is proved a second way: no index is carried by the chain');
  };

  // ── (1) THE FOUR WRITE ARMS, EACH ASSERTS ITS RECORD'S VALUE AND A ZERO READ COUNT. **The record's
  // `op.after.value` and `op.address` are the native codec's own arrays** (`to_js_value`'s array arm and
  // `to_js_segments`), so they are the sites that were HOLED: `["P0","P1"]` and `["P0"]` were the measured wrong
  // values. **`watched` is the reply's watch set and is asserted dense for the same reason.**
  const arms = [
    { address: ['list'], value: ['x', 'y'], label: 'a two-element string array' },
    { address: ['nums'], value: [1, 2], label: 'a two-element number array' },
    { address: ['holder'], value: { k: 1, arr: ['x', 'y'] }, label: 'a plain object carrying an array member' },
    { address: ['nest'], value: { a: [[1, 2], { b: ['z'] }] }, label: 'a nested array-in-object-in-array value' },
  ];
  const writesById = {};
  let readsOnWrites = null;
  try {
    install();
    let before = reads;
    for (const arm of arms) {
      // **A COLLECTION KEYED BY THE ADDRESS'S OWN FIRST SEGMENT AND NOT AN ARRAY APPEND** — `Array.prototype.push`
      // performs `[[Set]]` too, so a drive that collected into an array INSIDE the mutation window would answer
      // the mutation with a raw host `TypeError` in the test's own frame and observe nothing (the state node's
      // own CJS loader is in, and the ground this cell's arrangement avoids). **THE NAME IS A STRING KEY ON A
      // PLAIN OBJECT**, which creates an own property of the collection and consults no index of any array.
      writesById[arm.address[0]] = inst.write(arm.address, 'mem', arm.value);
    }
    readsOnWrites = reads - before;
  } finally {
    restore();
  }
  for (const arm of arms) {
    const record = writesById[arm.address[0]];
    assert.equal(Object.prototype.toString.call(record), '[object Object]',
      `the ${arm.label} write's answer is the declared record`);
    // THE ADDRESS ARRAY — `to_js_segments`' own array, the site that crossed HOLEd as `["P0"]`.
    assertExact(record.op.address, arm.address, `write ${arm.label}: op.address`);
    // THE VALUE ARRAY — `to_js_value`'s array arm, the site that crossed HOLEd as `["P0","P1"]`.
    assertExact(record.op.after.value, arm.value, `write ${arm.label}: op.after.value`);
    // THE WATCH SET — the reply's own array of addresses.
    assert.equal(Array.isArray(record.watched), true, `write ${arm.label}: watched is an array`);
    for (let index = 0; index < record.watched.length; index += 1) {
      assert.equal(Object.hasOwn(record.watched, index), true,
        `write ${arm.label}: watched[${index}] is an OWN property of the array the package built`);
    }
    // The write's own base state is the declared absent one (`present: false`); its `value` member is the
    // runtime's `undefined`, which this cell does not assert because no array crosses at it.
    assert.equal(record.op.before.present, false,
      `write ${arm.label}: op.before.present is the declared absent base state's`);
  }
  assert.equal(readsOnWrites, 0,
    'a lawful `write` reads NO index off `Array.prototype` — the values it answers with are the ones the codec '
    + `DEFINED, so the getter must not run at all; it RAN ${readsOnWrites} time(s)`);

  // ── (2) THE FOUR READ-BACK ARMS: THE EXACT VALUES WRITTEN, AND NO PROTOTYPE INDEX READ.
  const readsBack = {};
  let readsOnReads = null;
  try {
    install();
    const before = reads;
    for (const arm of arms) {
      readsBack[arm.address[0]] = inst.read(arm.address, 'mem');
    }
    readsOnReads = reads - before;
  } finally {
    restore();
  }
  for (const arm of arms) {
    assertExact(readsBack[arm.address[0]], arm.value, `read ${arm.label}`);
  }
  assert.equal(readsOnReads, 0,
    `a lawful \`read\` reads NO index off \`Array.prototype\`; the getter RAN ${readsOnReads} time(s)`);
  // **THE FAILURE THIS CELL WAS AUTHORED AGAINST, NAMED AS A STATE AND ASSERTED ABSENT** — the measured wrong
  // values were `["P0","P1"]` at the read-back and at `after.value`, and `["P0"]` at `op.address`.
  assert.notDeepEqual(readsBack.list, ['P0', 'P1'],
    'the prototype\'s accessor must never answer for an index of a value the package returns');
  assert.notDeepEqual(writesById.list.op.after.value, ['P0', 'P1'],
    'the prototype\'s accessor must never answer for an index of an array the record carries out');
  assert.notDeepEqual(writesById.list.op.address, ['P0'],
    'the prototype\'s accessor must never answer for an index of the address array the record carries out');

  // ── (3) THE DELETE RECEIPT'S TWO ARRAYS (`to_js_delete_receipt`: the address and the tier set).
  let receipt = null;
  let readsOnDelete = null;
  try {
    install();
    const before = reads;
    receipt = inst.delete(['list'], 'mem');
    readsOnDelete = reads - before;
  } finally {
    restore();
  }
  assertExact(receipt.address, ['list'], 'delete receipt: address');
  assertExact(receipt.tiers, ['mem'], 'delete receipt: tiers');
  assert.equal(readsOnDelete, 0,
    `a lawful \`delete\` reads NO index off \`Array.prototype\`; the getter RAN ${readsOnDelete} time(s)`);

  // ── (4) THE COLD CONSTRUCTION, IN ITS OWN PROCESS (accommodation (a)): a cold load is TERMINAL under this
  // mutation, so the one state this cell cannot drive in-process is driven where a fresh process can be poisoned
  // instead of this one. **THE COLD VALUE ARM IS NOT DRIVEN AND THIS CELL SAYS SO** — what is asserted is the
  // PACKAGE's answer to the state, which is either the declared ONE form or an instance, never a host object.
  const probe = `
import { storeCreate } from ${JSON.stringify(ENTRY)};
let reads = 0;
Object.defineProperty(Array.prototype, '0', { get() { reads += 1; return 'P0'; }, configurable: true });
Object.defineProperty(Array.prototype, '1', { get() { reads += 1; return 'P1'; }, configurable: true });
let out;
try {
  const inst = storeCreate({ journalLength: 8, listeners: [] });
  out = { outcome: 'returned', members: Object.keys(inst).length };
} catch (thrown) {
  out = {
    outcome: 'threw',
    host: thrown instanceof Error,
    keys: Object.keys(thrown),
    status: typeof (thrown && thrown.status) === 'string' ? thrown.status : null,
    message: typeof (thrown && thrown.message) === 'string' ? thrown.message : null,
    log: Array.isArray(thrown && thrown.log) ? thrown.log.length : null,
    plain: Object.getPrototypeOf(thrown) === Object.prototype,
  };
} finally {
  delete Array.prototype[0];
  delete Array.prototype[1];
}
out.reads = reads;
out.restored = !Object.hasOwn(Array.prototype, '0') && !Object.hasOwn(Array.prototype, '1');
process.stdout.write(JSON.stringify(out));
`;
  const child = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', probe], {
    encoding: 'utf8',
  }));
  assert.equal(child.restored, true, 'the child drive must restore `Array.prototype` too');
  assert.equal(child.reads, 0,
    `no user code may run on the construction path; the getter RAN ${child.reads} time(s)`);
  if (child.outcome === 'threw') {
    assert.equal(child.host, false,
      '`storeCreate` answered a RAW HOST object under this mutation: §2.5 requires the ONE form; got '
      + `${child.message}`);
    assert.equal(child.plain, true, 'the thrown value is a plain object and not an `Error`');
    assert.deepEqual([...child.keys].sort(), ['address', 'log', 'message', 'status'],
      `the one form carries exactly {status, message, log}; got ${JSON.stringify(child.keys)}`);
    assert.equal(child.status, 'FilePathUnreachable',
      'an artefact that could not be loaded is the construction\'s own declared arm');
    assert.equal(child.log, 0, 'no attempt is live at construction, so `log` is the declared empty array');
  } else {
    assert.equal(child.outcome, 'returned',
      'the cold construction answers either an instance or the declared form');
    assert.ok(child.members >= 1, 'a returned instance carries its own members');
  }

  // ── (5) THE RESTORE, PROVED IN THIS PROCESS AFTER EVERY ARM.
  assertRestored();
});
