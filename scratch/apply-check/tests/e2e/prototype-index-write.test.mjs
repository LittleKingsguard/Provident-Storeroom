// tests/e2e/prototype-index-write.test.mjs
//
// DERIVED INSTRUMENT — THE `F8-2` CLASS'S WRITE VECTOR: **A LAWFUL CALL MUST NOT ANSWER WITH A RAW HOST
// `TypeError`, WHATEVER AN OWN ACCESSOR AT `Array.prototype`'S INDEX LOOKS LIKE.**
//
// **PROVENANCE, AND WHY THIS CELL IS DERIVED AND NOT BLIND.** The state was MEASURED by the blind pass at
// `blind-value-crossing.test.mjs`'s row-`16` accessor cell, whose text records it: *"a RAW HOST `TypeError` —
// message `Cannot set property 0 of [object Array] which has only a getter`, its stack naming the per-call
// reference-set read — thrown out of `write` AND out of `storeCreate(cfg)` itself."* That blind cell could not
// assert it (`void caught`), so the observable stood unreported by any green. **This cell is DERIVED from the
// declaration, not discovered blind:** it names the states first, derives each declared answer from
// `docs/specs/storeroom-json-crossing/contract.md §2` rows `3`/`16` and their `F-RA-11` clause of 2026-10-24,
// from `contract.md §2.1`'s item `(1c)` (the lawful forms) and from `docs/specs/storeroom-js/surface.md §2.5`
// (the ONE failure form, never a host object), and then drives them.
//
// **THE LANGUAGE FACT THE WHOLE CELL RESTS ON.** `arr[i] = v` and `Array.prototype.push` perform `[[Set]]`,
// and `[[Set]]` WALKS THE PROTOTYPE CHAIN. Where `Array.prototype` carries an own ACCESSOR at that index with
// no setter, `[[Set]]` answers `false` and a strict frame raises `TypeError` — **before any verdict, with no
// user code run.** An array LITERAL, `Array.of(…)` and `Object.defineProperty` DEFINE own properties instead
// and consult no chain, which is why the package's array building was moved to the last of those forms.
//
// **THE STATES, ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | a lawful `storeCreate` in a process that has not yet loaded the artefact, accessor installed | the declared ONE form `{status, message, log}` — or an instance, where the runtime's own module loader can carry the load; NEVER a raw `Error`/`TypeError`, and `reads === 0` |
// | a lawful `write` of a string, of an array, of a plain object, accessor installed | the declared record `{op, watched, triggered}`; NEVER a raw `Error`/`TypeError` |
// | a lawful `write` whose value is refused — a sparse array (row `16`), a function (row `3`), `undefined` | the declared ONE form `{status, message, log}`, status `ValueRefusedAtBoundary`, the row's own class spelling in the message, and `reads === 0` — no user code ran, so the prototype is the only actor |
// | the prototype after every arm | RESTORED: `Array.prototype` carries no own index `0` or `1`, and `0 in []` is `false` |
//
// **TWO DRIVING ACCOMMODATIONS, NAMED RATHER THAN LEFT TO A READER.** **(a)** The instance is CONSTRUCTED and
// its constraint kernel RESOLVED before the accessor is installed, and the cold-construction state is driven
// in a CHILD PROCESS instead. The ground is measured and it is the runtime's, not the package's: node's own
// CJS loader (`Module._nodeModulePaths`, `updateChildren`) performs `Array.prototype.push` internally, so
// under this mutation NO module can be loaded for the first time — the addon and the lazily-resolved kernel
// alike. A constructor warmed first, and a cold one probed where a fresh process can be poisoned instead of
// this one, are the only two ways the package's own bytes can be reached at all. What the cold probe asserts
// is the PACKAGE's answer to that state, which is exactly the defect the blind pass measured.
// **(b)** The admitted arms assert the shape of the answer and the ABSENCE of a host object, and they do NOT
// assert `reads === 0`: an admitted `write` copies its journal op's address out of the native codec, whose
// array construction is `[[Set]]`-based (`bindings/js/src/codec.rs`, `fn array`) and is therefore holed under
// this mutation — a native site this pass reports and does not own.
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

/** Run `fn`, returning the thrown value. A call that RETURNS is a failure of every caller that uses this. */
const catchIt = (fn) => {
  try {
    fn();
  } catch (thrown) {
    return thrown;
  }
  assert.fail('the call returned; the declared surface says it THROWS');
};

/** THE ONE FORM, ASSERTED AS THE DECLARATION SPELLS IT — three own enumerable string members and no host object. */
const assertOneForm = (thrown, status, classSpelling) => {
  assert.equal(thrown instanceof Error, false,
    `§2.5 requires the ONE form and never a host object; got ${thrown && thrown.constructor && thrown.constructor.name}: `
    + `${thrown && thrown.message}`);
  assert.equal(Object.getPrototypeOf(thrown), Object.prototype,
    'the failure form\'s prototype is `Object.prototype`: it is a plain object, not an `Error`');
  assert.deepEqual(Object.keys(thrown).sort(), ['address', 'log', 'message', 'status'],
    `the failure form carries exactly {status, message, log}; got ${JSON.stringify(Object.keys(thrown))}`);
  assert.equal(thrown.status, status);
  assert.equal(typeof thrown.message, 'string');
  assert.ok(Array.isArray(thrown.log) && thrown.log.length === 0,
    'no attempt is live on this path, so `log` is the declared empty array');
  assert.ok(thrown.message.includes(classSpelling),
    `the message carries the row's own class spelling \`${classSpelling}\`; got ${JSON.stringify(thrown.message)}`);
};

test('crossing · contract.md §2.1 item (1c) and §2 rows 3/16 · an own getter-only accessor at Array.prototype\'s index cannot answer a lawful `storeCreate` or `write` with a raw host `TypeError`, and every refusal it owes is the one plain form with no user code run', () => {
  // ── THE ARRANGEMENT (accommodation (a)): the instance is built, and the lazily-resolved constraint kernel
  // is resolved, BEFORE the accessor exists — see this file's header for the measured ground.
  const inst = make();
  inst.write(['warm'], 'mem', 'warm');

  let reads = 0;
  const install = () => {
    Object.defineProperty(Array.prototype, '0', {
      get() {
        reads += 1;
        return 'from-the-prototype';
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(Array.prototype, '1', {
      get() {
        reads += 1;
        return 'from-the-prototype';
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

  // ── (1) THE ADMITTED ARMS: a lawful call RETURNS, whatever the prototype looks like.
  const returned = {};
  let hostError = null;
  try {
    install();
    try {
      returned.scalar = inst.write(['scalar'], 'mem', 'kept');
    } catch (thrown) {
      hostError = thrown;
    }
    try {
      returned.array = inst.write(['list'], 'mem', ['x', 'y']);
    } catch (thrown) {
      hostError = thrown;
    }
    try {
      returned.object = inst.write(['map'], 'mem', { k: 1 });
    } catch (thrown) {
      hostError = thrown;
    }
  } finally {
    restore();
  }
  assert.equal(hostError, null,
    'a LAWFUL `write` must not throw at all under this mutation — the walk was not even asked to refuse. '
    + `It answered ${hostError && hostError.constructor && hostError.constructor.name}: ${hostError && hostError.message}`);
  for (const key of ['scalar', 'array', 'object']) {
    const record = returned[key];
    assert.equal(Object.prototype.toString.call(record), '[object Object]',
      `the ${key} write's answer is the declared record`);
    assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
      `the write record carries {op, watched, triggered}; got ${JSON.stringify(Object.keys(record || {}))}`);
  }

  // ── (2) THE REFUSAL ARMS: the one form, and `reads === 0` — the prototype is the only actor.
  let sparseError = null;
  let functionError = null;
  let undefinedError = null;
  let readsOnSparse = null;
  let readsOnFunction = null;
  let readsOnUndefined = null;
  try {
    install();
    let before = reads;
    sparseError = catchIt(() => inst.write(['sparse'], 'mem', new Array(2)));
    readsOnSparse = reads - before;
    before = reads;
    functionError = catchIt(() => inst.write(['callable'], 'mem', () => 1));
    readsOnFunction = reads - before;
    before = reads;
    undefinedError = catchIt(() => inst.write(['nothing'], 'mem', undefined));
    readsOnUndefined = reads - before;
  } finally {
    restore();
  }
  // ROW `16` — a sparse array refuses as `a sparse array`, at the value's own position; and the array is not
  // dense, index `0` being carried by the prototype alone, so the walk reads no index of it.
  assertOneForm(sparseError, 'ValueRefusedAtBoundary', 'a sparse array');
  assert.equal(readsOnSparse, 0,
    'no inherited accessor at an index is read on ANY path (`contract.md §2`\'s clause of 2026-10-24 on '
    + `\`F-RA-11\`, item (5)(b)); the getter RAN ${readsOnSparse} time(s) on the row-16 refusal`);
  // ROW `3` — a function refuses as `a function`.
  assertOneForm(functionError, 'ValueRefusedAtBoundary', 'a function');
  assert.equal(readsOnFunction, 0,
    `the getter RAN ${readsOnFunction} time(s) on the row-3 refusal`);
  // ROW `3`'s outside class — an absent class answer for the runtime's own `undefined`.
  assertOneForm(undefinedError, 'ValueRefusedAtBoundary', 'undefined');
  assert.equal(readsOnUndefined, 0,
    `the getter RAN ${readsOnUndefined} time(s) on the undefined refusal`);

  // ── (3) THE COLD CONSTRUCTION: `storeCreate` in a process that has not loaded the artefact, driven in its
  // OWN process (accommodation (a)) because node's loader cannot load ANY module under this mutation and a
  // failed load is terminal for this module instance.
  const probe = `
import { storeCreate } from ${JSON.stringify(ENTRY)};
let reads = 0;
Object.defineProperty(Array.prototype, '0', { get() { reads += 1; return 'from-the-prototype'; }, configurable: true });
Object.defineProperty(Array.prototype, '1', { get() { reads += 1; return 'from-the-prototype'; }, configurable: true });
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
    `no user code may run on the construction path either; the getter RAN ${child.reads} time(s)`);
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

  // ── (4) THE RESTORE, PROVED IN THIS PROCESS AFTER EVERY ARM. **AND THE READS ASSERTION IS SCOPED TO THE
  // ARMS THAT OWE IT** — the per-arm deltas above and the child's own count. The admitted arms do NOT owe it:
  // an admitted `write` copies its journal op's address out of the native codec, whose `fn array`
  // (`bindings/js/src/codec.rs`) builds through `napi_create_array_with_length` + `napi_set_element` — a
  // `[[Set]]` — so under this mutation that array crosses HOLED and the entry's index read reaches the
  // prototype once per element. That native site is REPORTED by this pass and is not this cell's subject; no
  // expectation here is narrowed to it and no green is claimed over it.
  assertRestored();
});
