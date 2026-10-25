// GATE-4 ADVERSARIAL / MALFORMED-DATA BATTERY — `U-STOREROOM-JSON-CROSSING`.
//
// **WHAT THIS FILE IS.** An adversarial end-to-end battery over the shipped package entry, not the `.node`
// addon. Every cell drives the public `storeCreate` product with a hostile or malformed input and asserts the
// contract's declared answer (`docs/specs/storeroom-json-crossing/contract.md`, its `parameter-semantics.md`
// and the governed `docs/specs/storeroom-js/crossing.md` amendment of 2026-10-23).
//
// **THE THREE GUARDRAIL FAMILIES DRIVEN HERE:**
//   1. **NO USER CODE RUNS ON THE REFUSAL PATH.** A refusal must be decided by class reads alone — no
//      `get`/`set`, no `valueOf`, no `Symbol.toPrimitive`, no `toString`, no `Proxy` trap — so a hostile
//      value cannot raise a raw host error out of the boundary or mutate state during the walk.
//   2. **MALFORMED SHAPE IS REFUSED WHOLE, NEVER REPAIRED.** Holes, accessors, symbol keys, prototype-
//      carrying objects and the sixteen outside value classes refuse the containing value with the exact
//      class and position; no member is dropped, renamed or coerced, and no store byte is written.
//   3. **MALFORMED CARRIER/ADDRESS DATA IS BOUNDED.** An address segment above the carrier's exact `u64`
//      range, a lone surrogate, or a hostile non-segment is refused with its own declared code before the
//      store can saturate, repair or look anything up.
//
// **THE ONLY EXPECTED REDS ARE THE SIXTEEN CLASSES ABOVE THE DECLARED CEILING AND THE PARKED `P-ADA-5`.
// THIS FILE IS WRITTEN TO BE GREEN ON THE LANDED GATE-3 BUILD.**
//
// ── THE TWO FINDINGS THIS BATTERY RAISED AND CLOSED, 2026-10-23 ──────────────────────────────────
//
// `G4-1` [BLOCKING] — `ADV-03`/`ADV-05`/`ADV-06` measured that `valueTargetSpelling` (the VALUE-position
//        renderer) lacked the `Proxy` guard its carrier sibling carries, so a refused `Proxy` reached
//        `String(value)` and its `Symbol.toPrimitive` GET TRAP RAN. FIXED in `bindings/js/index.mjs`: the
//        `types.isProxy` class read is taken before `String`, so no trap runs on the refusal path.
//
// `G4-2` [BLOCKING] — `ADV-12` measured that a stored member genuinely named `__proto__` was REPARENTED
//        instead of crossing as an own member: `napi_set_property` in `bindings/js/src/codec.rs` and
//        `out[name] = …` in `decodeValue` both run `[[Set]]`, whose `__proto__` step makes the member the
//        returned object's prototype. FIXED: copy-out defines own data properties (`napi_define_properties`
//        via `Property`; `Object.fromEntries` in `decodeValue`), so the bare tree crosses member for member.

import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';

import { storeCreate } from 'provident-storeroom';

const VALUE_POSITION = "the write's value argument";
const BOUNDARY_STATUS = 'ValueRefusedAtBoundary';

function instance() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

function refused(value, address = ['v']) {
  const inst = instance();
  try {
    inst.write(address, 'mem', value);
  } catch (err) {
    return { err, inst };
  }
  assert.fail(`the crossing declares a refusal; ${String(value)} was admitted`);
}

function assertClass(err, cls, position = VALUE_POSITION) {
  assert.equal(err.status, BOUNDARY_STATUS,
    `a value refusal must answer ${BOUNDARY_STATUS}; got ${JSON.stringify(err.status)}: ${err.message}`);
  assert.ok(err.message.endsWith(`, the value at ${position} is ${cls}`),
    `the message must end with the class/position clause; got ${JSON.stringify(err.message)}`);
}

function assertAddress(err, fragment) {
  assert.equal(err.status, 'AddressMalformed',
    `a malformed carrier must answer AddressMalformed; got ${JSON.stringify(err.status)}: ${err.message}`);
  assert.ok(err.message.includes(fragment),
    `the carrier message must name the declared datum; got ${JSON.stringify(err.message)}`);
}

function nestedArray(depth) {
  let value = 'leaf';
  for (let i = 0; i < depth; i += 1) value = [value];
  return value;
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// FAMILY 1 — NO USER CODE RUNS ON THE REFUSAL PATH
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('ADV-01 an own accessor getter that throws is refused without invoking it', () => {
  let calls = 0;
  const value = Object.defineProperty({}, 'a', {
    enumerable: true,
    get() {
      calls += 1;
      throw new Error('the getter ran');
    },
  });
  const { err } = refused(value);
  assertClass(err, 'a value carrying an own accessor member');
  assert.equal(calls, 0, 'the walk must read the descriptor, never the getter');
});

test('ADV-02 an own setter is refused without invoking it', () => {
  let calls = 0;
  const value = Object.defineProperty({}, 'a', {
    enumerable: true,
    set() {
      calls += 1;
    },
  });
  const { err } = refused(value);
  assertClass(err, 'a value carrying an own accessor member');
  assert.equal(calls, 0, 'the setter is never reached by the walk');
});

test('ADV-03 a Proxy with throwing traps is refused with no trap run', () => {
  let calls = 0;
  const trap = () => {
    calls += 1;
    throw new Error('the trap ran');
  };
  const value = new Proxy({}, {
    get: trap,
    ownKeys: trap,
    getOwnPropertyDescriptor: trap,
    getPrototypeOf: trap,
    has: trap,
  });
  const { err } = refused(value);
  assertClass(err, 'a Proxy');
  assert.equal(calls, 0, 'util.types.isProxy must decide without invoking a handler');
});

test('ADV-04 a revoked Proxy is refused as a Proxy, not a host TypeError', () => {
  const revocable = Proxy.revocable({ a: 1 }, {});
  revocable.revoke();
  const { err } = refused(revocable.proxy);
  assertClass(err, 'a Proxy');
});

test('ADV-05 a Proxy over an Array is refused as a Proxy, not an Array', () => {
  let calls = 0;
  const value = new Proxy([1, 2, 3], {
    get() {
      calls += 1;
      return 1;
    },
  });
  const { err } = refused(value);
  assertClass(err, 'a Proxy');
  assert.equal(calls, 0);
});

test('ADV-06 a Proxy over a function is refused as a function before any trap', () => {
  let calls = 0;
  const value = new Proxy(function sample() {}, {
    get() {
      calls += 1;
      return 1;
    },
  });
  const { err } = refused(value);
  assertClass(err, 'a function');
  assert.equal(calls, 0);
});

test('ADV-07 throwing valueOf/toString own members are refused as functions, not invoked', () => {
  let calls = 0;
  const value = {
    valueOf() {
      calls += 1;
      throw new Error('valueOf ran');
    },
    toString() {
      calls += 1;
      throw new Error('toString ran');
    },
  };
  const { err } = refused(value);
  assertClass(err, 'a function', "member 'valueOf' of the write's value argument");
  assert.equal(calls, 0, 'a function member is refused by its class, never called');
});

test('ADV-08 a Symbol-keyed member carrying a throwing function is refused by its key class', () => {
  let calls = 0;
  const value = {
    [Symbol('toPrimitive')]() {
      calls += 1;
      throw new Error('the symbol body ran');
    },
  };
  const { err } = refused(value);
  assertClass(err, 'a value carrying a Symbol-keyed own member');
  assert.equal(calls, 0);
});

test('ADV-09 a non-enumerable Symbol-keyed own member is still refused', () => {
  const value = {};
  Object.defineProperty(value, Symbol('hidden'), { value: 1, enumerable: false });
  const { err } = refused(value);
  assertClass(err, 'a value carrying a Symbol-keyed own member');
});

test('ADV-10 a class instance whose toString throws still answers the declared refusal', () => {
  class Hostile {
    toString() {
      throw new Error('toString ran');
    }
  }
  const { err } = refused(new Hostile());
  assertClass(err, 'a class instance or another prototype-carrying non-plain object');
  assert.notEqual(err.message, 'toString ran', 'the hostile throwable must not escape the boundary');
  assert.equal(Object.getPrototypeOf(err), Object.prototype, 'the refusal is the declared plain simple object');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// FAMILY 2 — MALFORMED VALUE SHAPES ARE REFUSED WHOLE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('ADV-11 Object.create(null) is a plain object and round-trips', () => {
  const value = Object.create(null);
  value.a = 1;
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), { a: 1 });
});

test('ADV-12 an own __proto__ data key is preserved and never pollutes Object.prototype', () => {
  const value = JSON.parse('{"__proto__":{"polluted":true},"a":1}');
  const inst = instance();
  inst.write(['v'], 'mem', value);
  const back = inst.read(['v']);
  assert.ok(Object.prototype.hasOwnProperty.call(back, '__proto__'), 'the own key stays an own key');
  assert.deepEqual(back.__proto__, { polluted: true });
  assert.equal({}.polluted, undefined, 'no prototype pollution crosses the boundary');
});

test('ADV-13 own constructor/hasOwnProperty data members are admitted as members', () => {
  const value = { constructor: 'not a class', hasOwnProperty: 'not a method' };
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), value);
});

test('ADV-14 a non-enumerable own data member is ignored, not copied', () => {
  const value = { a: 1 };
  Object.defineProperty(value, 'hidden', { value: 2, enumerable: false });
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), { a: 1 });
});

test('ADV-15 a frozen/sealed tree is admitted and copied', () => {
  const value = Object.freeze({ a: Object.freeze([1, 2]) });
  const inst = instance();
  inst.write(['v'], 'mem', value);
  assert.deepEqual(inst.read(['v']), { a: [1, 2] });
});

test('ADV-16 a valid surrogate pair in a value and a key is admitted', () => {
  const pair = '\uD83D\uDE00';
  const inst = instance();
  inst.write(['v'], 'mem', { [pair]: pair });
  assert.deepEqual(inst.read(['v']), { [pair]: pair });
});

test('ADV-17 a lone surrogate nested in an array names its index position', () => {
  const { err, inst } = refused({ a: [0, '\uD800'] });
  assertClass(err, 'a string carrying a lone surrogate', "member 'a'/1 of the write's value argument");
  assert.deepEqual(inst.read([]), {}, 'a refused tree writes no store byte');
});

test('ADV-18 a hole in a nested array refuses the whole value and writes nothing', () => {
  const { err, inst } = refused({ a: [1, , 3] });
  assertClass(err, 'a sparse array', "member 'a' of the write's value argument");
  assert.deepEqual(inst.read([]), {});
});

test('ADV-19 an accessor deep in the tree refuses the whole tree and writes nothing', () => {
  const value = { a: { b: Object.defineProperty({}, 'c', { get() { return 1; } }) } };
  const { err, inst } = refused(value);
  assertClass(err, 'a value carrying an own accessor member', "member 'a'/'b' of the write's value argument");
  assert.deepEqual(inst.read([]), {});
});

test('ADV-20 a class extending Array is refused as a class even when empty', () => {
  const { err } = refused(new (class V extends Array {})());
  assertClass(err, 'a class extending Array');
});

test('ADV-21 a cross-realm array is admitted while a cross-realm Array subclass is refused', () => {
  const crossArray = runInNewContext('[1, 2, 3]');
  const inst = instance();
  inst.write(['v'], 'mem', crossArray);
  assert.deepEqual(inst.read(['v']), [1, 2, 3]);

  const crossSubclass = runInNewContext('new (class extends Array {})()');
  const { err } = refused(crossSubclass);
  assertClass(err, 'a class extending Array');
});

test('ADV-22 the non-plain collection family is refused by the one class spelling', () => {
  const values = [
    new Map(),
    new Set(),
    new WeakMap(),
    new WeakSet(),
    new Date(),
    /x/,
    new Uint8Array(2),
    new ArrayBuffer(2),
    new DataView(new ArrayBuffer(2)),
    Promise.resolve(),
    new Error('x'),
  ];
  for (const value of values) {
    const { err } = refused(value);
    assertClass(err, 'a class instance or another prototype-carrying non-plain object');
  }
});

test('ADV-23 a function carrying own members is refused as a function, not walked', () => {
  let read = 0;
  const value = () => {};
  Object.defineProperty(value, 'a', { enumerable: true, get() { read += 1; return 1; } });
  const { err } = refused(value);
  assertClass(err, 'a function');
  assert.equal(read, 0);
});

test('ADV-24 null and undefined nested in arrays and objects are refused at their positions', () => {
  const inArray = refused([1, null]);
  assertClass(inArray.err, 'null', "member 1 of the write's value argument");
  const inObject = refused({ a: undefined });
  assertClass(inObject.err, 'undefined', "member 'a' of the write's value argument");
});

test('ADV-25 -0 nested in arrays and objects normalizes to 0', () => {
  const inst = instance();
  inst.write(['v'], 'mem', { a: [-0], b: -0 });
  const back = inst.read(['v']);
  assert.ok(Object.is(back.a[0], 0) && Object.is(back.b, 0));
});

test('ADV-26 a non-finite number nested in a tree names the class and position', () => {
  for (const value of [NaN, Infinity, -Infinity]) {
    const { err } = refused({ a: [value] });
    assertClass(err, 'a non-finite number', "member 'a'/0 of the write's value argument");
  }
});

test('ADV-27 an absent value argument is refused as undefined', () => {
  const inst = instance();
  assert.throws(
    () => inst.write(['v'], 'mem'),
    (err) => err.status === BOUNDARY_STATUS && err.message.endsWith(`, the value at ${VALUE_POSITION} is undefined`),
    'the declared value position is required and absent is refused as undefined',
  );
});

// **STATES ENUMERATED BEFORE THIS CELL WAS RE-DERIVED** (`docs/decisions.md` · `A149` (1)–(2), (4) — the
// operative admission ceiling is the STORE'S PERSISTENT one and not the conversion's bound: `ENCODER_CEILING`
// is `126` on BOTH routes, `126` is the highest ADMITTED depth because the root enters at `0`, and `127` and
// beyond is the depth class refused AT THE PACKAGE'S WALK, BEFORE ANY STORE VERB, with the status
// `ValueRefusedAtBoundary` — never admitted and then failed at commit; `docs/specs/storeroom-json-crossing/
// contract.md §4`'s clause of 2026-10-23 carries the same four terms at the contract):
//
// | The state (the `mem` route, a plain `write`) | Its declared answer |
// | --- | --- |
// | nesting depth `125` | admitted — one below the ceiling, driven so the ceiling is read at both sides of its edge |
// | nesting depth `126` | ADMITTED — the last admitted depth, and the tree crosses INTACT (read back deep-equal) |
// | nesting depth `127` | REFUSED at the walk: `ValueRefusedAtBoundary`, class `a value over the walk ceiling`, at the refused value's own `127`-segment position |
// | every other store byte | UNTOUCHED by the refusal — the refusal precedes every store verb, so no node, anchor or journal entry exists afterwards |
//
// **WHAT AN ADMIT-THEN-FAIL-AT-COMMIT BUILD ANSWERS HERE, WHICH IS WHY THE CELL IS NOT SHAPE-ONLY:** a build
// that admitted depth `127` and lost it later would answer `refused()`'s own `assert.fail` on this route
// (there is no commit to fail at, so the value would simply be admitted), and a build that refused it after a
// store verb would leave the register root non-empty below — while a refusal that is the STORE'S or the
// COMMIT'S answer never carries the walk's class `a value over the walk ceiling` beside a `127`-segment
// member position at all. `A149` (2) is a statement about the SITE, so the cell reads all three limbs.
// `[A2 docs/decisions.md · `A149` (1)–(2), (4) | the operative depth ceiling, the refusing site, the class and
// the declared position; A2 docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23 clause |
// numeric and site claim]`
//
// ⟶ **RECONCILED 2026-10-24 — THE `2026-10-23` MARKER CARRIED BY THIS CLAUSE DENOTES A `2026-10-24` LANDING, AND
// THE CLAUSE STANDS AS FILED.** The marker is one day early: the landing it records is this unit's own of
// 2026-10-24 (the ground — source edit `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`). The
// marker digits are NOT re-pointed in place and no sentence above is rewritten: the clause is cited elsewhere BY
// THAT DATE, so moving it would break the resolving citations rather than repair anything. Every numeric, site and
// position claim above is unmoved, byte-for-byte, and is the claim this cell drives below.
test('ADV-28 depth 126 is admitted and depth 127 is refused at the walk', () => {
  for (const depth of [125, 126]) {
    const admitted = instance();
    admitted.write(['v'], 'mem', nestedArray(depth));
    assert.deepEqual(admitted.read(['v']), nestedArray(depth),
      `depth ${depth} is admitted: the walk admits it and the tree crosses intact`);
  }

  // THE REFUSED SIDE IS ONE PATH SEGMENT PER NESTING LEVEL: the walk counts past its ceiling on entering the
  // value at depth `127`, so the declared position names that value at the `127`-segment path below the root
  // `value` position (`contract.md §4`'s clause (4); `parameter-semantics.md §2`).
  const { err, inst } = refused(nestedArray(127));
  const position = `member ${Array(127).fill('0').join('/')} of ${VALUE_POSITION}`;
  assertClass(err, 'a value over the walk ceiling', position);
  assert.deepEqual(err.log, [],
    'no attempt was opened: the refusal is reached before any store verb, so the failure form carries no log entry');
  assert.deepEqual(inst.read([]), {},
    'the refusal precedes every store verb: a refused depth-127 write creates no node, anchor or journal entry');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// FAMILY 3 — MALFORMED CARRIER / ADDRESS DATA IS BOUNDED BEFORE THE STORE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('ADV-29 an address segment above the exact integer range is refused, never saturated', () => {
  const inst = instance();
  assert.throws(
    () => inst.write([2 ** 53], 'mem', 'x'),
    (err) => {
      assertAddress(err, 'above the carrier');
      return true;
    },
    '2**53 must not be cast to u64::MAX and must not address a node',
  );
});

test('ADV-30 a bigint and a symbol address segment are refused with no coercion', () => {
  const inst = instance();
  for (const segment of [10n, Symbol('s')]) {
    assert.throws(
      () => inst.write([segment], 'mem', 'x'),
      (err) => {
        assertAddress(err, 'a segment is a string or a non-negative integer');
        return true;
      },
    );
  }
});

test('ADV-31 a lone-surrogate address segment is refused before any store lookup', () => {
  const inst = instance();
  assert.throws(
    () => inst.write(['\uD800'], 'mem', 'x'),
    (err) => {
      assert.equal(err.status, 'ValueNotAdmitted');
      assert.ok(err.message.includes('a string carrying a lone surrogate'));
      return true;
    },
  );
});

test('ADV-32 a Proxy address with a throwing trap is refused with no trap run', () => {
  let calls = 0;
  const address = new Proxy(['a'], {
    get() {
      calls += 1;
      return 'a';
    },
    getPrototypeOf() {
      calls += 1;
      throw new Error('getPrototypeOf ran');
    },
  });
  const inst = instance();
  assert.throws(
    () => inst.write(address, 'mem', 'x'),
    (err) => {
      assert.equal(err.status, 'AddressMalformed');
      assert.ok(err.message.includes('a Proxy'));
      return true;
    },
  );
  assert.equal(calls, 0);
});

test('ADV-33 a supplied undefined tier beside a valid address is refused at the boundary', () => {
  const inst = instance();
  assert.throws(
    () => inst.write(['v'], undefined, 'x'),
    (err) => {
      assertAddress(err, 'the tier position holds undefined');
      return true;
    },
  );
});

test('ADV-34 a Proxy tier with a throwing trap is refused as out of domain, no trap run', () => {
  let calls = 0;
  const tier = new Proxy({}, {
    get() {
      calls += 1;
      return 1;
    },
    ownKeys() {
      calls += 1;
      return [];
    },
  });
  const inst = instance();
  assert.throws(
    () => inst.write(['v'], tier, 'x'),
    (err) => err.status === 'OutOfDomainTier',
  );
  assert.equal(calls, 0);
});

test('ADV-35 a throwing cfg getter propagates as the caller\'s own throwable, not the store form', () => {
  const thrown = new Error('the caller body threw');
  assert.throws(
    () => storeCreate({ journalLength: 8, listeners: [], get constraints() { throw thrown; } }),
    (err) => err === thrown,
    'a caller-owned exception must not be re-shaped into the store\'s failure form',
  );
});

test('ADV-36 a hostile write leaves the journal and register untouched', () => {
  for (const value of [10n, Symbol('s'), () => {}, new Map(), [1, , 3], { a: 10n }]) {
    const { inst } = refused(value);
    assert.deepEqual(inst.read([]), {}, 'a refused write creates no node, anchor or journal entry');
  }
});
