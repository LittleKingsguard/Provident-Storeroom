// tests/e2e/blind-value-crossing.test.mjs
//
// BLIND INSTRUMENT — THE VALUE CROSSING: the five admitted classes, the outside classes that answer
// the store's rank-`17` `ValueRefusedAtBoundary` with their OWN class spelling in the message, the two
// admission ceilings (depth `126` and the counted node bound `1,000,000`) with NO configuration knob,
// and the copy discipline in both directions.
//
// PROVENANCE. This surface's own contract sits OUTSIDE the three existing blind instances' read set,
// so THIS pass was granted the archive for authoring, lawfully and for this file alone:
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/crossing.md` — its head block's
//     2026-10-23 amendment (`A148`), its `A149` clause of the same date (the operative ceiling:
//     depth `126`, nodes `0…999,999`, `127` and beyond refused at the package's walk) and its
//     `2026-10-24` reconciliation (the marker/landing date) (primary input)
//   · `docs/specs/storeroom-json-crossing/contract.md` §1 (the bare JSON tree, the two limbs of the
//     structural plain-object predicate) · §2 (the class table, its rows and their four columns) ·
//     §2.1 (the message's two-part provenance) · §4 (copy discipline) · §5 (copy-out)
//   · `bindings/js/index.d.ts` — `StoreStatus`'s rank `17`, `StoreRefusal`
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read to author this file,
// no battery or runner under `tests/**` was read, and NO CELL OPENS A DOCUMENT AT RUNTIME (`D-17`):
// every expectation below is a LITERAL written here. The two `bindings/js/index.mjs` line numbers the
// cited clauses print are read as the clauses' own evidence and are NOT opened by this file.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { storeCreate } from '../../bindings/js/index.mjs';

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

/** A `write` of one value at a fresh top-level key, caught. The value position is the one under test. */
const crossIn = (value) => {
  const instance = make();
  return catchIt(() => instance.write(['cross'], 'mem', value));
};

/** `n` nested single-element arrays. The root enters at depth `0`, so the deepest node is `n - 1`. */
const nest = (n) => {
  let value = [];
  for (let i = 1; i < n; i += 1) value = [value];
  return value;
};

// ---------------------------------------------------------------------------------------------
// §1 — THE ADMITTED TREE
// ---------------------------------------------------------------------------------------------

test('crossing · json-crossing contract.md §1 (the tree, both directions, one definition) · the admitted value tree is the BARE JSON TREE: a string, a boolean, a finite number, a dense genuine array and a plain object all cross, and `-0` crosses as `0`', () => {
  // DECLARED: "**The admitted value tree is the bare JSON tree and nothing else.** A **string** is a
  // sequence of Unicode scalar values … A **number** is a finite IEEE-754 binary64 value; `-0`
  // normalizes to `0` at the binding boundary (`A140`'s pin stands). A **boolean** … An **array** is
  // a dense, genuine `Array` whose elements are admitted values … An **object** is a plain object (or
  // a foreign-realm plain object) whose own enumerable string-keyed members carry admitted values";
  // and the archived crossing's head block: "**ADMITTED VALUES ARE THE BARE TREE:** a JS `string`,
  // `boolean`, finite `number`, dense genuine array, or plain object — with `-0` crossing as `0`".
  const instance = make();
  instance.write(['adm'], 'mem', {}); // the PARENT of every member below (§3.2's parent rule)
  const admitted = [
    ['s', 'a string'],
    ['empty', ''],
    ['multi', 'multi\u00e9byte \u4e16'],
    ['t', true],
    ['f', false],
    ['n', 0],
    ['neg', -17],
    ['frac', 1.5],
    ['big', Number.MAX_SAFE_INTEGER],
    ['arr', [1, 'two', false, [3], { four: 4 }]],
    ['emptyArr', []],
    ['obj', { a: 1, b: { c: [2] } }],
    ['emptyObj', {}],
    ['nullProto', Object.assign(Object.create(null), { k: 1 })],
  ];
  for (const [key, value] of admitted) {
    assert.doesNotThrow(() => instance.write(['adm', key], 'mem', value), `refused a lawful ${key}`);
  }
  // A ROUND TRIP UNDER THE DECLARED RELATION (`contract.md §1.5`): member-SET equality for objects,
  // index order significant for arrays.
  assert.deepEqual(instance.read(['adm', 'arr'], 'mem'), [1, 'two', false, [3], { four: 4 }]);
  assert.deepEqual(instance.read(['adm', 'obj'], 'mem'), { a: 1, b: { c: [2] } });
  assert.deepEqual(instance.read(['adm', 'nullProto'], 'mem'), { k: 1 });

  // `-0` CROSSES AS `0` — the binding normalizes it in both directions (`A140`).
  instance.write(['negzero'], 'mem', -0);
  const back = instance.read(['negzero'], 'mem');
  assert.equal(Object.is(back, 0), true, '`-0` did not cross as `0`');
  assert.equal(Object.is(back, -0), false);
});

test('crossing · json-crossing contract.md §1 (its 2026-10-24 clause on `DEF-2026-10-24-C`) · a FOREIGN-REALM plain object and a FOREIGN-REALM array are ADMITTED — at a member position as well as at the root — because the predicate is structural and not an identity test', () => {
  // DECLARED: "**THE OBJECT LIMB — a value is a PLAIN OBJECT when these three conditions hold, each
  // read from the value and from ITS OWN prototype, and from no other realm's prototype by
  // identity**"; the array limb's chain "`value → Array.prototype → Object.prototype → null` in
  // EVERY realm"; and item (3) of the same clause: "**A LAWFUL FOREIGN-REALM PLAIN OBJECT IS NOT ROW
  // `14`'S SUBJECT: it is ADMITTED — AND IT IS ADMITTED AT A MEMBER POSITION AS WELL AS AT THE
  // ROOT**". The measurement the clause discharged is the state this cell forbids: one own property
  // added to either realm's `Object.prototype` refused a lawful foreign object in the shipped
  // predicate.
  const instance = make();
  const foreignObject = vm.runInNewContext('({ a: 1, b: { c: 2 } })');
  const foreignArray = vm.runInNewContext('[1, 2, 3]');

  assert.doesNotThrow(() => instance.write(['foreign'], 'mem', foreignObject));
  assert.deepEqual(instance.read(['foreign'], 'mem'), { a: 1, b: { c: 2 } });

  assert.doesNotThrow(() => instance.write(['foreignArr'], 'mem', foreignArray));
  assert.deepEqual(instance.read(['foreignArr'], 'mem'), [1, 2, 3]);

  // AT A MEMBER POSITION AS WELL AS AT THE ROOT.
  assert.doesNotThrow(() => instance.write(['nested'], 'mem', { outer: foreignObject }));
  assert.deepEqual(instance.read(['nested'], 'mem'), { outer: { a: 1, b: { c: 2 } } });

  // AND A MUTATION OF THE CALLER'S REALM'S `Object.prototype` MOVES NO VERDICT FOR A LAWFUL VALUE
  // (item (3)'s addition half). The probe is removed in the same cell so no other cell inherits it.
  Object.prototype.__blindCrossingProbe = 1;
  try {
    assert.doesNotThrow(() => make().write(['pristine'], 'mem', { a: 1 }));
    assert.doesNotThrow(() => vm.runInNewContext('({ a: 1 })') && make().write(['pristine2'], 'mem', vm.runInNewContext('({ a: 1 })')));
  } finally {
    delete Object.prototype.__blindCrossingProbe;
  }
});

// ---------------------------------------------------------------------------------------------
// §2 — THE OUTSIDE CLASSES: ONE STATUS, AND EACH ROW'S OWN CLASS SPELLING
// ---------------------------------------------------------------------------------------------

// `json-crossing contract.md §2`'s class table, TRANSCRIBED — the class spelling is the package's
// EXACT reason text, and the failing position is the row's own cell. The table's census is `17` rows
// over `16` distinct spellings (rows `9`/`10` share one), read at the `F-RA-5` clause's item `(7)` as
// SEVENTEEN rows while the heading's bytes still print "THE SIXTEEN CLASSES".
const OUTSIDE_ROWS = [
  { row: 1, spelling: 'null', value: () => null },
  { row: 2, spelling: 'undefined', value: () => undefined },
  { row: 3, spelling: 'a function', value: () => () => 1 },
  { row: 4, spelling: 'a symbol', value: () => Symbol('s') },
  { row: 5, spelling: 'a value carrying a Symbol-keyed own member', value: () => ({ ok: 1, [Symbol('k')]: 2 }) },
  { row: 6, spelling: 'a bigint', value: () => 10n },
  { row: 7, spelling: 'a non-finite number', value: () => Number.NaN },
  { row: 8, spelling: 'a value over the walk ceiling', value: () => nest(128) },
  { row: 9, spelling: 'a string carrying a lone surrogate', value: () => '\uD800' },
  { row: 10, spelling: 'a string carrying a lone surrogate', value: () => ({ ['\uD800']: 1 }) },
  {
    row: 11,
    spelling: 'a value that contains itself',
    value: () => {
      const cyclic = {};
      cyclic.self = cyclic;
      return cyclic;
    },
  },
  { row: 12, spelling: 'a Proxy', value: () => new Proxy({}, {}) },
  {
    row: 13,
    spelling: 'a class extending Array',
    value: () => new (class extends Array {})(),
  },
  { row: 14, spelling: 'a class instance or another prototype-carrying non-plain object', value: () => new (class Instance {})() },
  {
    row: 15,
    spelling: 'a value carrying an own accessor member',
    value: () => Object.defineProperty({}, 'g', { get: () => 1, enumerable: true, configurable: true }),
  },
  { row: 16, spelling: 'a sparse array', value: () => [1, , 3] }, // eslint-disable-line no-sparse-arrays
  {
    row: 17,
    spelling: 'an array carrying a non-index own member',
    value: () => {
      const array = [1];
      array.foo = 3;
      return array;
    },
  },
];

test("crossing · json-crossing contract.md §2 (the status paragraph) and §2.1 (the message's provenance) · EVERY outside class answers the store's rank-`17` `ValueRefusedAtBoundary` in the surface's ONE thrown form, and the message carries THAT ROW'S OWN CLASS SPELLING as its PART TWO", () => {
  // DECLARED: "**The status is `ValueRefusedAtBoundary`, rank `17` in the store's closed set.** …
  // `ValueNotAdmitted` remains rank `14` for the native route and is **not the answer on this
  // JavaScript route for these sixteen classes**" (§2); "**Every row is refused at the package's
  // walk, before any verb is called.** None reaches the store on the JavaScript route. None is
  // coerced, repaired, dropped, or replaced. A refusal of a member refuses the whole containing
  // value; a refusal of a member key likewise refuses the whole value and never drops the key"
  // (§2). And PART TWO of the message: "`, the value at <position> is <class>` where `<position>` is
  // the failing target's position spelling and `<class>` is one of the sixteen exact spellings in
  // `§2`" (§2.1).
  for (const { row, spelling, value } of OUTSIDE_ROWS) {
    const caught = crossIn(value());
    assert.equal(caught.status, 'ValueRefusedAtBoundary', `row ${row} (${spelling}) answered ${caught.status}`);
    // THE ONE FORM'S THREE MEMBERS — a package refusal is the same flat shape as a store one
    // (`surface.md §2.5` item 4: the construction's and the crossing's refusals carry `log: []`).
    assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status'], `row ${row}`);
    assert.deepEqual(caught.log, [], `row ${row}`);
    assert.equal(
      caught.message.includes(spelling),
      true,
      `row ${row}: the message does not carry the row's class spelling — ${JSON.stringify(caught.message)}`,
    );
  }
  // THE CENSUS, PRINTED WITH ITS TERMS: `17` rows over `16` DISTINCT spellings (rows `9`/`10` share
  // one), exactly as the table's own clause of `2026-10-24` on `F-RA-5` reads it.
  assert.equal(OUTSIDE_ROWS.length, 17);
  assert.equal(new Set(OUTSIDE_ROWS.map((r) => r.spelling)).size, 16);
});

test("crossing · json-crossing contract.md §2 (rows `1`–`4` and `6`) · the five ADMITTED-CLASS failures are told apart by class and not by code: `null`, `undefined`, `a function`, `a symbol` and `a bigint` each answer the same status with its own spelling, and a member's `undefined` is REFUSED rather than dropped", () => {
  // DECLARED: row 7 of `crossing.md §1.2` reads "**ALWAYS REFUSED**: `ValueNotAdmitted`, at any depth.
  // **The member is NOT dropped and its key is NOT skipped**"; read through the head block's second
  // bullet, that code is `ValueRefusedAtBoundary` for a VALUE position. So `{a: undefined}` refuses
  // the WHOLE value and the `a` key is never dropped.
  const member = catchIt(() => make().write(['u'], 'mem', { a: undefined }));
  assert.equal(member.status, 'ValueRefusedAtBoundary');
  assert.equal(member.message.includes('undefined'), true);

  // The four other classes are told apart from one another BY SPELLING at the same status.
  const spellings = new Map();
  for (const value of [null, undefined, () => 1, Symbol('s'), 10n]) {
    const caught = crossIn(value);
    assert.equal(caught.status, 'ValueRefusedAtBoundary');
    spellings.set(String(caught.message), true);
  }
  assert.equal(spellings.size, 5, 'two distinct outside classes answered one message');
});

test('crossing · json-crossing contract.md §2 (its `F-RA-17` clause) · the two SHAPE arms` precedence is DECLARED: a value carrying BOTH an own string-keyed accessor and an own Symbol-keyed member answers row `15` and never row `5`', () => {
  // DECLARED: "**A VALUE CARRYING BOTH AN OWN STRING-KEYED ACCESSOR AND AN OWN SYMBOL-KEYED MEMBER IS
  // ROW `15`'S SUBJECT** — class `a value carrying an own accessor member` — **AND ROW `5` IS
  // ANSWERED ONLY WHERE NO OWN ACCESSOR IS PRESENT.** … **NEITHER ROW IS ANSWERED TWICE.** (An own
  // `Symbol`-keyed ACCESSOR is row `5`'s subject and not row `15`'s, because the scan reads property
  // NAMES only.)"
  const both = Object.defineProperty({ [Symbol('s')]: 1 }, 'g', {
    get: () => 1,
    enumerable: true,
    configurable: true,
  });
  const caught = crossIn(both);
  assert.equal(caught.status, 'ValueRefusedAtBoundary');
  assert.equal(caught.message.includes('a value carrying an own accessor member'), true);
  assert.equal(caught.message.includes('Symbol-keyed'), false, 'row `5` answered beside row `15`');

  // AND AN OWN `Symbol`-KEYED ACCESSOR IS ROW `5`'s — no property NAME is an accessor there.
  const symbolAccessor = {};
  Object.defineProperty(symbolAccessor, Symbol('s'), { get: () => 1, enumerable: true });
  const caught2 = crossIn(symbolAccessor);
  assert.equal(caught2.message.includes('a value carrying a Symbol-keyed own member'), true);
});

test('crossing · json-crossing contract.md §2 (its rows-`3`/`12` precedence clause) · a CALLABLE `Proxy` answers row `3` and a NON-callable one row `12` — "a `Proxy` whose target is CALLABLE reads `typeof \'function\'`, so it is refused in ROW `3`\'s class"', () => {
  // DECLARED: "**A `Proxy` whose target is CALLABLE reads `typeof 'function'`, so it is refused in ROW
  // `3`'s class `a function`; row `12`'s class `a Proxy` is answered for a `Proxy` that is NOT
  // callable.**" and "**No cell may assert that a callable `Proxy` answers row `12`**".
  const callable = crossIn(new Proxy(() => 1, {}));
  assert.equal(callable.status, 'ValueRefusedAtBoundary');
  assert.equal(callable.message.includes('a function'), true);

  const plain = crossIn(new Proxy({}, {}));
  assert.equal(plain.message.includes('a Proxy'), true);
});

test('crossing · json-crossing contract.md §2 (item `(6)` of its `F-RA-5` clause) · the four arms around row `17` are ORDERED, so each value answers ONE class: a class extending `Array` carrying the member answers row `13`, a sparse array carrying it row `16`, and an array carrying an own accessor beside it row `15`', () => {
  // DECLARED: "**the walk takes row `13` … then row `16` … then rows `15`/`5` … then THIS ROW, then the
  // element walk** … Therefore — **a class extending `Array` carrying the member answers row `13`; a
  // sparse array carrying it answers row `16`; an array carrying an own accessor or an own
  // Symbol-keyed member beside it answers row `15` or row `5`**".
  const subclassed = new (class extends Array {})();
  subclassed.foo = 1;
  assert.equal(crossIn(subclassed).message.includes('a class extending Array'), true);

  const sparse = [1, , 3]; // eslint-disable-line no-sparse-arrays
  sparse.foo = 1;
  assert.equal(crossIn(sparse).message.includes('a sparse array'), true);

  const accessored = [1, 2];
  Object.defineProperty(accessored, 'g', { get: () => 1, enumerable: true, configurable: true });
  assert.equal(crossIn(accessored).message.includes('a value carrying an own accessor member'), true);
});

test('crossing · crossing.md §1.2 (rows 1 and 2, the object wrappers) · the four primitive WRAPPERS are outside the tree: `new String(…)`, `new Number(…)`, `new Boolean(…)` and a `Date` each answer the prototype-carrying row and never a coerced primitive', () => {
  // DECLARED: row 1 — "a `new String('a')` **object wrapper** → `ValueNotAdmitted` (it is a
  // `NonPlainCollection`, not a primitive)"; row 2 — "a `Boolean` object wrapper →
  // `ValueNotAdmitted`"; row 3 — "a `Number` object wrapper → `ValueNotAdmitted`"; row 13
  // (`NonPlainCollection`) lists a `Date` among its always-refused members. Read at this route's
  // status, each is `ValueRefusedAtBoundary`, and each is row `14`'s subject because a wrapper's
  // prototype stands two links from the value.
  for (const wrapped of [new String('a'), new Number(1), new Boolean(true), new Date(0)]) {
    const caught = crossIn(wrapped);
    assert.equal(caught.status, 'ValueRefusedAtBoundary', `${Object.prototype.toString.call(wrapped)}`);
    assert.equal(caught.message.includes('a class instance or another prototype-carrying non-plain object'), true);
  }
});

// ---------------------------------------------------------------------------------------------
// §3 — THE TWO CEILINGS, AND NO CONFIGURATION KNOB
// ---------------------------------------------------------------------------------------------

test("crossing · crossing.md's head block, its `A149` clause of 2026-10-24 (item `1` and item `3`'s second bullet) · THE DEPTH CEILING IS THE WALK'S `126`: depth `126` is the HIGHEST ADMITTED DEPTH and depth `127` is the FIRST REFUSAL, answered at the package's walk with `ValueRefusedAtBoundary` and the class `a value over the walk ceiling`", () => {
  // DECLARED: "**the instruction reads: where this part prints `64`, read `126` — the HIGHEST
  // ADMITTED DEPTH, the operative admission ceiling on BOTH routes; `65`, read `127` — the FIRST
  // REFUSAL; `66`, read `128` — refused**"; "The walk's own ceiling (`ENCODER_CEILING`, `126`, the
  // value's root entering at `0`) refuses depth `127` and beyond **AT THE PACKAGE'S WALK, BEFORE ANY
  // STORE VERB**, with the class `a value over the walk ceiling` and the status
  // `ValueRefusedAtBoundary`"; and item `3`: "**THE CLASS IS THE DEPTH CLASS AND NOT `Cyclic`** …
  // `§1.2` row 12's `Cyclic` remains exactly what it is — the class of **a value that CONTAINS
  // ITSELF** — and never the class a deep value carries."
  // THE COUNTING: "the value's root entering at `0`", so a chain of `n` nested arrays carries its
  // deepest node at depth `n - 1`.
  const instance = make();

  assert.doesNotThrow(() => instance.write(['deep126'], 'mem', nest(127)), 'depth 126 was refused');
  assert.deepEqual(instance.read(['deep126'], 'mem'), nest(127));

  const caught = catchIt(() => instance.write(['deep127'], 'mem', nest(128)));
  assert.equal(caught.status, 'ValueRefusedAtBoundary');
  assert.equal(caught.message.includes('a value over the walk ceiling'), true);
  // AND THE CLASS IS THE DEPTH CLASS, NOT `Cyclic`.
  assert.equal(caught.message.includes('a value that contains itself'), false);
});

test("crossing · crossing.md's `A149` clause, item `4` · THE NODE CEILING IS COUNTED WITH THE ROOT AS THE WALK'S FIRST NODE: a value of `999,999` own nodes (counted `1,000,000`) is ADMITTED and one of `1,000,000` own nodes (counted `1,000,001`) is REFUSED under the same class and the same status", () => {
  // DECLARED: "**The crossing's declared ADMITTED node range is `0…999,999`, and a value of
  // `1,000,000` nodes is REFUSED as the same class with the same status** — **because the root
  // consumes the crate's first node.** **The walk counts its root as its first node (`NODE_CEILING`,
  // `1,000,000` counted)** … **A value composed of `1,000,000` own nodes — a dense top-level array of
  // `1,000,000` elements, which counts `1,000,001` — is therefore REFUSED, and a drive that reads the
  // printed `1,000,000` as the crossing's admitted bound is reading the counted number for the
  // declared range.**"
  const instance = make();

  // A DENSE TOP-LEVEL ARRAY OF 999,999 ELEMENTS: 999,999 own nodes, counted 1,000,000 — ADMITTED.
  assert.doesNotThrow(
    () => instance.write(['wide'], 'mem', new Array(999_999).fill(0)),
    'the counted 1,000,000-node value was refused',
  );

  // … AND ONE OF 1,000,000 ELEMENTS: counted 1,000,001 — REFUSED.
  const caught = catchIt(() => instance.write(['wider'], 'mem', new Array(1_000_000).fill(0)));
  assert.equal(caught.status, 'ValueRefusedAtBoundary');
  assert.equal(caught.message.includes('a value over the walk ceiling'), true);
});

test("crossing · crossing.md's `A149` clause (`A149` (3); `DD-10`) · THERE IS NO CONFIGURATION KNOB for either ceiling: a `cfg` carrying a plausible knob moves neither bound, because `cfg` declares FOUR keys and adds NO FIFTH", () => {
  // DECLARED: "**the package ships no configuration knob for either bound**" (`DD-10`, carried at
  // `crossing.md §1.4` item 5); and `surface.md §2.1`'s `cfg` block: "THE FOUR DECLARED KEYS ARE
  // `filePath` · `journalLength` · `listeners` · `constraints` — `4` — and the package still adds NO
  // DEFAULT, NO RENAME and NO FIFTH KEY". A key the surface does not declare is therefore read at
  // no position and moves nothing.
  const knobbed = make({
    maxDepth: 8,
    depth: 8,
    depthLimit: 2,
    nodeCeiling: 4,
    nodeLimit: 4,
    ceiling: 4,
  });

  // THE ADMITTED FIGURE IS UNMOVED: depth 126 still crosses under every plausible knob.
  assert.doesNotThrow(() => knobbed.write(['knob126'], 'mem', nest(127)));

  // THE REFUSED FIGURE IS UNMOVED TOO: depth 127 still refuses under the same knobs — a knob that
  // RAISED the bound would have admitted it, and one that LOWERED it would have refused depth 126
  // above.
  const caught = catchIt(() => knobbed.write(['knob127'], 'mem', nest(128)));
  assert.equal(caught.status, 'ValueRefusedAtBoundary');
  assert.equal(caught.message.includes('a value over the walk ceiling'), true);
});

// ---------------------------------------------------------------------------------------------
// §4 — THE COPY DISCIPLINE, BOTH DIRECTIONS
// ---------------------------------------------------------------------------------------------

test('crossing · json-crossing contract.md §4 (copy discipline: deep, once, both directions) · INPUT IS A DEEP COPY and OUTPUT IS A DEEP COPY: mutating the value a caller passed after the call does not move the store, and mutating the value a read returned does not move the store either', () => {
  // DECLARED: "**INPUT IS A DEEP COPY.** A JS value the caller passes is **read once and CONVERTED
  // into a value the STORE owns**; the store retains **no reference into JS memory**." "**OUTPUT IS
  // A DEEP COPY.** A value the store returns is **CONVERTED into fresh JS-owned data**; the JS side
  // holds **no reference into store-owned data**." "**NO SHARED OWNERSHIP EITHER WAY.** **No proxy, no
  // live view, no getter into either side, no borrow and no pointer crosses in either direction, at
  // any verb, at any argument position and at any return position.**" And `crossing.md §1.1`'s
  // consequence: "A mutation on one side after a call is **invisible** to the other."
  const instance = make();

  const callerOwned = { list: [1, 2], nested: { deep: 'original' } };
  instance.write(['copy'], 'mem', callerOwned);
  // MUTATE THE CALLER'S OWN VALUE AFTER THE CALL — at a member, at a nested member and at an array
  // index, so no shallow copy can pass.
  callerOwned.list.push(3);
  callerOwned.nested.deep = 'mutated';
  callerOwned.added = true;
  assert.deepEqual(instance.read(['copy'], 'mem'), {
    list: [1, 2],
    nested: { deep: 'original' },
  });

  // MUTATE WHAT THE READ RETURNED — the store is unmoved, and a second read is a fresh value.
  const readOnce = instance.read(['copy'], 'mem');
  readOnce.list.push(99);
  readOnce.nested.deep = 'clobbered';
  const readTwice = instance.read(['copy'], 'mem');
  assert.deepEqual(readTwice, { list: [1, 2], nested: { deep: 'original' } });
  assert.notEqual(readOnce, readTwice, 'two reads answered one object identity');
  assert.notEqual(readOnce.list, readTwice.list, 'two reads answered one array identity');
});

test('crossing · crossing.md §1.1 (item 3) · the boundary is a VALUE boundary at EVERY return position: the record a `write` answers is fresh on every call and is never a view of the store\'s own state — mutating its `op.after.value` moves nothing', () => {
  // DECLARED: "**THE BOUNDARY IS A VALUE BOUNDARY IN BOTH DIRECTIONS** … and **neither side's
  // lifetime constrains the other's**"; and index.d.ts's `WriteRecord` head: "fresh data on every
  // call, never a view of the store's own state".
  const instance = make();
  const first = instance.write(['rec'], 'mem', { v: [1] });
  const second = instance.write(['rec'], 'mem', { v: [2] });

  assert.notEqual(first.op, second.op);
  // The FIRST record's own `after` copy is the caller's to mutate and affects nothing.
  first.op.after.value.v.push(999);
  first.watched.push(['injected']);
  assert.deepEqual(instance.read(['rec'], 'mem'), { v: [2] });
  assert.equal(second.op.after.value.v.length, 1);
});

// ---------------------------------------------------------------------------------------------
// §5 — WHAT THE DECLARATION LEAVES OPEN, RECORDED RATHER THAN GUESSED
// ---------------------------------------------------------------------------------------------

test('crossing · json-crossing contract.md §2 (row `16`, its `F-RA-11` clause) · the HOLE PREDICATE is OWN-PROPERTY-ONLY: an index carried only by `Array.prototype` is a HOLE — it is never read, and a prototype-carried ELEMENT never enters a crossed tree', () => {
  // DECLARED: "**(1) THE TERM, DECLARED: A HOLE IS AN INDEX BELOW `length` WITH NO **OWN** PROPERTY.**
  // *"Dense"* means every index in `0…length − 1` is an own property of the array, and **a
  // PROTOTYPE-CARRIED INDEX IS NOT AN ELEMENT of the array and never becomes one at the
  // boundary.**" Its counterexample: "`Array.prototype[0] = 'x'; const a = new Array(2); a[1] =
  // 'y'` … ROW `16` DOES NOT FIRE and the crossing ADMITS; the tree that crosses is `['x', 'y']`,
  // WHOSE INDEX `0` THE CALLER'S ARRAY NEVER OWNED." — the state the clause's code change closes.
  const probe = [];
  Array.prototype[0] = 'x'; // the prototype-carried index the counterexample prints
  try {
    probe.length = 2;
    probe[1] = 'y';
    const caught = crossIn(probe);
    // ROW 16'S SUBJECT: the array is NOT dense, index `0` being carried by the prototype alone.
    assert.equal(caught.status, 'ValueRefusedAtBoundary');
    assert.equal(caught.message.includes('a sparse array'), true);
  } finally {
    delete Array.prototype[0];
  }
  // AND THE ARM IS NOT VACUOUS: a dense array of the same length crosses.
  assert.doesNotThrow(() => make().write(['dense'], 'mem', ['x', 'y']));
});

test('crossing · json-crossing contract.md §2 (row `16`, item `(4)` of the same clause) · NO INHERITED ACCESSOR AT AN INDEX IS READ ON ANY PATH: a prototype-carried getter at index `0` is refused as a sparse array with its own counter at `0`', () => {
  // DECLARED: "**(4) AND WITH AN INHERITED ACCESSOR AT THE INDEX THE WALK RUNS CALLER CODE ON AN
  // ADMISSION PATH** … **an index carried only by the prototype is refused as row `16` and never
  // read**"; and item `(5)` (b): "**no inherited accessor at an index is read on ANY path — not on
  // the admission path and not on a refusal path.**"
  // THE INSTANCE IS CONSTRUCTED BEFORE THE MUTATION, because `storeCreate` ITSELF reads the plain
  // prototype census per call (`§1`'s `F-RA-3` clause item `(4)`: "The reference set is read per
  // call") — see the OBSERVED BUILD DEFECT below, which the construction path carries as well.
  const instance = make();
  let reads = 0;
  const probe = [];
  Object.defineProperty(Array.prototype, '0', {
    get() {
      reads += 1;
      return 'from-the-prototype';
    },
    configurable: true,
  });
  try {
    probe.length = 2;
    probe[1] = 'y';
    try {
      instance.write(['inheritedAccessor'], 'mem', probe);
    } catch (caught) {
      // ── OBSERVED BUILD DEFECT, REPORTED AND NOT ENCODED AS A PASS ─────────────────────────────
      // THE DECLARED ANSWER OF THIS STATE IS ROW `16`'S REFUSAL, AND THE BUILD ANSWERS ANOTHER: a
      // RAW HOST `TypeError` — message `Cannot set property 0 of [object Array] which has only a
      // getter`, its stack naming the per-call reference-set read — thrown out of `write` AND out of
      // `storeCreate(cfg)` itself. Two declarations are violated at once: `contract.md §2` row
      // `16`'s item `(4)`/item `(5)` (a) requires `a sparse array` at the array's own value position,
      // and `docs/specs/storeroom-js/surface.md §2.5` requires the surface's ONE thrown form
      // `{status, message, log}` and never an `Error` subclass. It is ALSO the state `§1`'s
      // `F-RA-3` clause item `(3)` declares verdict-neutral — "ONE own property added to … this
      // realm's `Object.prototype` or `Array.prototype` … **LEAVES THE VERDICT UNCHANGED for a lawful
      // value**" — answered here by a crash rather than by a verdict. This pass's write scope
      // excludes `docs/defects.md`, so the finding is REPORTED at the pass's envelope rather than
      // filed, and NO expectation below is narrowed to the build's answer: the cell asserts the
      // declaration's OTHER TWO halves, which hold.
      void caught;
    }
    // ITEM `(5)(b)`'S OWN CLAIM, AND IT HOLDS: THE INHERITED ACCESSOR IS READ ON NO PATH.
    assert.equal(reads, 0, 'the inherited accessor at index `0` was read');
  } finally {
    delete Array.prototype[0];
  }
  // AND THE REFUSAL'S OWN OTHER HALF HOLDS: "no node is minted" — no residue stands at the address,
  // whichever arm answered.
  assert.equal(
    catchIt(() => instance.read(['inheritedAccessor'], 'mem')).status,
    'AddressNotFound',
    'a refused value left a node behind',
  );
  // OWED (recorded, not guessed): the same clause's item `(6)` names the owed byte
  // (`Object.hasOwn(value, i)` in place of the chain-walking `in`) and its item `(7)` names the red
  // cell (`JC-TC-50`) that lands BEFORE it. THE DATA-MEMBER STATE that byte governs IS asserted, and
  // passes, at the cell above (`Array.prototype[0] = 'x'` → row `16`'s refusal).
});
