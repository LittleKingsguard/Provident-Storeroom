// tests/e2e/blind-address-verbs.test.mjs
//
// BLIND INSTRUMENT — THE ADDRESS VERBS: `read` · `readLiteral` · `write` · `delete` · `rollback`.
// The declared surface's largest verb set: `TierSet`'s any-match arity at the READERS against the
// EXACTLY-ONE token at the WRITERS; the three returned records' member sets (`WriteRecord`,
// `DeleteRecord`, `RollbackRecord`, whose `undoneOps` is a LIST OF IDS and never a count); the
// fourth-position `commit` class test; the branch-assembly and container-kind rules; and the
// delete/rollback no-file-I/O clauses.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing
// else:
//   · `bindings/js/index.d.ts` — `Address`, `Tier`, `TierSet`, `WriteRecord`, `DeleteRecord`,
//     `RollbackRecord`, `JournalOp`, `BaseState`, `AttemptRef`, `CommitRecord`, and the five members
//     `read` · `readLiteral` · `write` · `delete` · `rollback` (primary input)
//   · `docs/specs/storeroom-js/surface.md` §2.2 (the signature block, the tier arity of each verb and
//     the fourth position's arity law, clauses 1–5)
//   · `docs/specs/storeroom-js/contract.md` §1.3 (the `TierArg` / `OpIdArg` carrier tables) and §2.2
//   · `docs/specs/storeroom-native/contract.md` §1.3 (the `MAP` xor `VEC` container rule, its
//     write-decided/read-inferred form, and the key-domain contradiction) · §1.4 (the node-kind
//     decision) · §1.5 (the address grammar) · §3.2 (the parent rule) · §3.6 (`WriteResult`) ·
//     §4.1–§4.2 (the read's arity and its five assembly arms) · §4.3–§4.4 (the delete's arity, its
//     five arms and `DeleteReceipt`) · §5.1 (the canonical tier order) · §6.3–§6.4 (`RollbackResult`,
//     the rollback's reach and its floors) · `DD-28` · `DD-30` · §8.1 (#1 · #7 · #8 · #9 · #10 · #13)
//
// One file under `tests/e2e/` WAS read, and only to avoid duplicating a cell: the three existing blind
// instances (`blind-entry-surface.test.mjs`, `blind-listener-surface.test.mjs`,
// `blind-constraints-surface.test.mjs`), so that the harness idiom matches and no cell of theirs is
// re-authored here. NO other battery or runner under `tests/**` was read, no byte of
// `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read, and NO CELL OPENS A DOCUMENT AT
// RUNTIME (`D-17`): every expectation below is a LITERAL written here.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`. A reader must be able to tell whether a cell was
// derived from the surface or inherited from the code.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

/** The store's own canonical tier order (`native contract.md §5.1`: `file`, `mem`, `temp`). */
const CANONICAL_TIER_ORDER = ['file', 'mem', 'temp'];

// ---------------------------------------------------------------------------------------------
// §1 — `TierSet`: THE READER'S ANY-MATCH ARITY
// ---------------------------------------------------------------------------------------------

test('verbs · surface.md §2.2 and index.d.ts `TierSet` · the READERS take ABSENT, ONE token or an ARRAY read as an ANY-MATCH set — the array is a set of tokens, never a union of values and never an ordered preference', () => {
  // DECLARED: "`read`'s `tier` accepts ZERO TO MANY — one token or an array — and an array is an
  // ANY-MATCH set, not a union of values, not an ordered preference and not a filter" (`surface.md`
  // §2.2); `contract.md §1.3`'s `TierArg` row 2: "on `read`/`readLiteral`: `[]`, `['mem']`,
  // `['file','mem','temp']`, duplicates included"; index.d.ts's `TierSet` is
  // `Tier | readonly Tier[]`.
  const instance = make();
  instance.write(['r'], 'mem', 'the-mem-version');

  // ONE token, the array spelling of the SAME token, and a set that carries it among others all
  // answer the one version that stands — the set SELECTS a version per address and does not union.
  assert.equal(instance.read(['r'], 'mem'), 'the-mem-version');
  assert.equal(instance.read(['r'], ['mem']), 'the-mem-version');
  assert.equal(instance.read(['r'], ['mem', 'file']), 'the-mem-version');
  assert.equal(instance.readLiteral(['r'], ['file', 'mem', 'temp']), 'the-mem-version');

  // AND THE ABSENT POSITION IS THE READER'S OWN THIRD ARITY: `TierArg` row 3 — "on
  // `read`/`readLiteral`/`delete`: in domain".
  assert.equal(instance.read(['r']), 'the-mem-version');
});

test('verbs · native contract.md §4.2 (arms `R-1` and `R-5`) · a read answers the assembled value at a `branch` and the WHOLE REGISTER at the empty address — `read([])` is `R-5`, not a refusal', () => {
  // DECLARED: the read's return "by what it resolved to" — "a `leaf` → the leaf's stored value …
  // a `branch` → a freshly assembled JSON value (`§4.2`) … the REGISTER (empty address) → an object
  // containing the ENTIRE REGISTRY" (`§4.1`); and arm `R-5`: "the resolved node is the REGISTER →
  // an object containing every register key — one member per key … This is `R-2` applied to the
  // register, which is always a `MAP`".
  const instance = make();
  instance.write(['whole'], 'mem', {}); // the PARENT the write's own resolution rule requires (§3.2)
  instance.write(['whole', 'a'], 'mem', { nested: 1 });

  const register = instance.read([]);
  assert.equal(typeof register, 'object');
  assert.equal(Array.isArray(register), false);
  assert.deepEqual(Object.keys(register).sort(), ['whole']);
  assert.deepEqual(register.whole, { a: { nested: 1 } });
});

// ---------------------------------------------------------------------------------------------
// §2 — THE WRITERS' EXACTLY-ONE TOKEN
// ---------------------------------------------------------------------------------------------

test("verbs · surface.md §2.2 and contract.md §1.3 (`TierArg` row 2, the array arm) · the WRITERS take EXACTLY ONE token: an ARRAY at `write`'s or `delete`'s tier position answers `OutOfDomainTier` — \"the array spelling is the READER's arity\"", () => {
  // DECLARED: "`write`'s `tier` is REQUIRED and SINGULAR; `delete`'s `tier` is OPTIONAL and EXACTLY
  // ONE when present" (`surface.md` §2.2), and the carrier table's own row: "on `write`/`delete`:
  // **any array of any length → `OutOfDomainTier`** (the array spelling is the READER's arity)"
  // (`contract.md §1.3`, `TierArg` row 2). THE ARRAY-OF-ONE IS THE DISCRIMINATING ARM: it spells a
  // token that IS in the domain, and only the ARITY decides it.
  const instance = make();
  instance.write(['w'], 'mem', {});
  instance.write(['w', 'x'], 'mem', 1);

  for (const tier of [['mem'], ['mem', 'file'], []]) {
    const caught = catchIt(() => instance.write(['w', 'y'], tier, 1));
    assert.equal(caught.status, 'OutOfDomainTier', `write's tier ${JSON.stringify(tier)}`);
  }
  for (const tier of [['mem'], ['file', 'mem', 'temp']]) {
    const caught = catchIt(() => instance.delete(['w', 'x'], tier));
    assert.equal(caught.status, 'OutOfDomainTier', `delete's tier ${JSON.stringify(tier)}`);
  }

  // AND THE SAME TWO VERBS ADMIT THE SINGLE TOKEN — the arm above is an ARITY refusal and not a
  // refusal of the token's domain.
  assert.doesNotThrow(() => instance.write(['w', 'z'], 'mem', 1));
  assert.doesNotThrow(() => instance.delete(['w', 'z'], 'mem'));

  // `TierArg` row 1's other half, driven once so the two arms are told apart: a token outside the
  // store's three is `OutOfDomainTier` at EITHER verb, array or not.
  assert.equal(catchIt(() => instance.write(['w', 'q'], 'secure', 1)).status, 'OutOfDomainTier');
});

test("verbs · contract.md §1.3 (`TierArg` row 3 and row 4) · `write`'s tier is REQUIRED, so the ABSENT position answers `AddressMalformed`; a SUPPLIED `undefined` is PRESENT at BOTH verbs and answers `AddressMalformed` too", () => {
  // DECLARED: `TierArg` row 3 — "on `read`/`readLiteral`/`delete`: in domain | on `write`:
  // **`AddressMalformed`** (a required argument is missing)"; row 4 — "**`null`** / **`undefined`**
  // | — | **`AddressMalformed`** on every verb".
  const instance = make();
  instance.write(['t'], 'mem', {});
  instance.write(['t', 'a'], 'mem', 1); // a leaf the delete arms below need to resolve
  instance.write(['t', 'b'], 'mem', 2);

  // ABSENT: the call supplies three positions, so no value stands at `tier` at all.
  const absent = catchIt(() => instance.write(['t', 'a'], undefined, 1));
  // (The line above SUPPLIES `undefined`; the genuinely ABSENT call is the three-position one, and
  // both reach the carrier as the same JS value — `contract.md §1.3`'s absent-versus-`undefined`
  // rule item 1: "a position the caller spelled `undefined` at folds to THE SAME STATE".)
  assert.equal(absent.status, 'AddressMalformed');

  const nullTier = catchIt(() => instance.write(['t', 'b'], null, 1));
  assert.equal(nullTier.status, 'AddressMalformed');

  // `delete`'s tier is OPTIONAL, so its ABSENT arm is in domain (`TierArg` row 3) while its
  // `null`/`undefined` arm is not (row 4).
  assert.doesNotThrow(() => instance.delete(['t', 'a']));
  assert.equal(catchIt(() => instance.delete(['t', 'b'], undefined)).status, 'AddressMalformed');
  assert.equal(catchIt(() => instance.delete(['t', 'b'], null)).status, 'AddressMalformed');
});

// ---------------------------------------------------------------------------------------------
// §3 — THE THREE RETURNED RECORDS
// ---------------------------------------------------------------------------------------------

test('verbs · index.d.ts `WriteRecord` · a `write` answers EXACTLY THREE members — `op` (the store\'s own eight-member journal record, NOT a number), `watched` (a list of ADDRESSES) and `triggered` (a list of PAIRS)', () => {
  // DECLARED: `WriteRecord`'s three members, with "**`op` IS THE STORE'S OWN JOURNAL RECORD AND NOT
  // A NUMBER** … the shipped declaration read `op: number`, which is false of EVERY value the line
  // returns"; `JournalOp`'s eight declared names `{ opId, kind, address, tier, before, after, seq,
  // compacted }`; and `watched`'s own rule from the store's `WriteResult` (`native contract.md`
  // §3.6): "`watched` is ALWAYS an array … it is never `undefined`", its members being addresses —
  // "a watched address is **a SEGMENT LIST** … and NOT a `string`".
  const instance = make();
  const record = instance.write(['wr'], 'mem', { v: 1 });

  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched']);

  assert.equal(typeof record.op, 'object');
  assert.notEqual(typeof record.op, 'number');
  assert.deepEqual(Object.keys(record.op).sort(), [
    'address',
    'after',
    'before',
    'compacted',
    'kind',
    'opId',
    'seq',
    'tier',
  ]);
  assert.equal(typeof record.op.opId, 'string');
  assert.ok(record.op.opId.length > 0, 'the op id is not a non-empty string');
  assert.deepEqual(record.op.address, ['wr']);
  assert.equal(record.op.tier, 'mem');
  assert.deepEqual(record.op.after, { present: true, value: { v: 1 } });
  assert.equal(typeof record.op.seq, 'number');
  assert.equal(typeof record.op.compacted, 'boolean');

  assert.ok(Array.isArray(record.watched), '`watched` is not an array');
  assert.ok(Array.isArray(record.triggered), '`triggered` is not an array');
});

test('verbs · index.d.ts `DeleteRecord` and native contract.md §4.4 (`DeleteReceipt`) · a `delete` answers EXACTLY THREE members — `address` VERBATIM, `tiers` in the store\'s canonical order, and `triggered` — and a delete that removes NOTHING is a SUCCESS with `tiers: []`', () => {
  // DECLARED: `DeleteRecord` `{ address, tiers, triggered }`, read with the store's `DeleteReceipt`
  // ("a record with exactly two members"): "`address`: the address the caller passed, VERBATIM — the
  // same array's segments, in order; the store returns a fresh array", and "`tiers`: the tiers whose
  // versions were removed, **in §5.1's canonical order; `[]` when nothing was removed**". And
  // §4.4's arm `D-3`: "the target resolves, but holds **no** version at the named tier … **removes
  // nothing**, and is a **success** | **`[]`**".
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-del-'));
  const instance = make({ filePath: join(directory, 'store.json') });

  // TWO VERSIONS AT ONE ADDRESS. The `file` write comes FIRST because a write PURGES by the
  // monotonic clause (`§5.4`'s `temp` → `mem` → `file` chain): a `file` write purges the `mem`
  // version at the same key, while a `mem` write purges only `temp` and leaves `file` standing.
  instance.write(['d'], 'file', 2);
  instance.write(['d'], 'mem', 1);

  const receipt = instance.delete(['d'], 'mem');
  assert.deepEqual(Object.keys(receipt).sort(), ['address', 'tiers', 'triggered']);
  // THE ADDRESS IS THE CALLER'S OWN ARRAY, VERBATIM — a fresh array, the same segments, in order.
  assert.deepEqual(receipt.address, ['d']);
  assert.equal(Array.isArray(receipt.address), true);
  // ONE named tier removed ⇒ that one token, and the canonical order is not strained by a set of one.
  assert.deepEqual(receipt.tiers, ['mem']);

  // ARM `D-3`: the address still resolves (its `file` version stands) and the NAMED tier holds
  // nothing — a SUCCESS that removed nothing, and `[]` is its declared `tiers` value.
  const nothing = instance.delete(['d'], 'mem');
  assert.deepEqual(nothing.tiers, []);

  // ARM `D-2`: tier ABSENT removes EVERY version, and the receipt prints them in the store's own
  // canonical order (`§5.1`: `file`, `mem`, `temp`).
  instance.write(['d'], 'mem', 3);
  const every = instance.delete(['d']);
  assert.deepEqual(every.tiers, CANONICAL_TIER_ORDER.filter((tier) => every.tiers.includes(tier)));
  assert.ok(every.tiers.includes('file') && every.tiers.includes('mem'));
});

test('verbs · index.d.ts `RollbackRecord` · a `rollback` answers EXACTLY THREE members, and `undoneOps` is the LIST of the ids the reversal undid — never a count, never `op: number`', () => {
  // DECLARED: "`RollbackRecord` → `{ opId, undoneOps, restoredTo }`"; "**ALL THREE MEMBERS WERE
  // MISTYPED BY THE SHIPPED DECLARATION** (`opId: number`, `undoneOps: number`, `restoredTo:
  // number`): **`opId` echoes the id the caller passed, and that id is a `string`** …; **`undoneOps`
  // is the LIST of the ids the reversal undid — an ARRAY of those ids, not a count**; and
  // **`restoredTo` is the base state the addressed subtree now stands at**, `{ present, value }`."
  const instance = make();
  instance.write(['rb'], 'mem', 0);
  const first = instance.write(['rb'], 'mem', 1);
  const second = instance.write(['rb'], 'mem', 2);

  const result = instance.rollback(second.op.opId);
  assert.deepEqual(Object.keys(result).sort(), ['opId', 'restoredTo', 'undoneOps']);

  // `opId` ECHOES THE CALLER'S STRING — the id a `write` returned is the id a `rollback` takes.
  assert.equal(result.opId, second.op.opId);
  assert.equal(typeof result.opId, 'string');

  // `undoneOps` IS A LIST OF IDS. The cell asserts the LIST, not its length: a count would satisfy
  // `typeof === 'number'` and fail every assertion below.
  assert.ok(Array.isArray(result.undoneOps), '`undoneOps` is not an array');
  for (const undone of result.undoneOps) assert.equal(typeof undone, 'string');
  assert.ok(
    result.undoneOps.includes(second.op.opId),
    'the named op is not in `undoneOps`; the rollback reverses the named op itself (`M-5` amendment (b): `>=`, NOT `>`)',
  );
  assert.equal(
    result.undoneOps.includes(first.op.opId),
    false,
    'an op OLDER than the named op was reversed; the temporal floor is `E.seq >= the named op seq`',
  );

  // `restoredTo` IS A BASE STATE — the state the addressed subtree stands at AFTER the rollback.
  assert.deepEqual(Object.keys(result.restoredTo).sort(), ['present', 'value']);
  assert.equal(result.restoredTo.present, true);
  assert.equal(result.restoredTo.value, 1);

  // AND THE REVERSAL IS THE STORE'S: the address reads at the value the named op displaced.
  assert.equal(instance.read(['rb'], 'mem'), 1);
});

// ---------------------------------------------------------------------------------------------
// §4 — THE FOURTH POSITION'S CLASS TEST
// ---------------------------------------------------------------------------------------------

test("verbs · surface.md §2.4 item 9 (g) item 1 and §2.2's fourth-position arity law · `write`'s FOURTH position takes `CommitRecord` and nothing else: every other form throws THE CLASS TEST'S OWN `TypeError`, whose `status` member is ABSENT and whose STRING `message` is REQUIRED", () => {
  // DECLARED: "**the admitted form is the kernel's own `CommitRecord`** (`surface.md §2.4` item 9
  // (g) item 1: an object carrying a `pending` member present and not `undefined`), and **every
  // other form at this position — absent, `undefined`, `null`, a primitive, a function, a `Proxy`,
  // an object whose `pending` member is absent or `undefined` — throws THE CLASS TEST'S OWN
  // `TypeError`, whose `status` member is ABSENT and whose STRING `message` member is REQUIRED**"
  // (index.d.ts's `write`). AND THE ARITY HALF: "`write(instance, address, tier, value, undefined)`
  // — the position SUPPLIED WITH `undefined` — IS REFUSED", while "the position ABSENT … OPENS OR
  // JOINS ITS COMMIT AND PROCEEDS" (`surface.md §2.2` clause 4's two call shapes).
  const instance = make();
  instance.write(['cm'], 'mem', {});

  // THE POSITION ABSENT — a THREE-position call — is IN DOMAIN.
  assert.doesNotThrow(() => instance.write(['cm', 'absent'], 'mem', 1));

  const outside = [
    undefined, // the position SUPPLIED with `undefined`
    null,
    1,
    'a string',
    true,
    () => ({}),
    {}, // a plain object whose `pending` member is ABSENT
    { pending: undefined }, // … and one whose `pending` member is PRESENT and `undefined`
  ];
  for (const value of outside) {
    const caught = catchIt(() => instance.write(['cm', 'x'], 'mem', 1, value));
    assert.ok(caught instanceof TypeError, `${String(value)} did not throw the class test's TypeError`);
    assert.equal('status' in caught, false, `${String(value)}: the class test's form carries a \`status\``);
    assert.equal(typeof caught.message, 'string');
    assert.ok(caught.message.length > 0, `${String(value)}: the form's \`message\` is empty`);
  }

  // "A REFUSED POSITION STOPS THE WRITE: no verb is reached and no byte moves."
  assert.equal(instance.read(['cm', 'absent'], 'mem'), 1);
});

// ---------------------------------------------------------------------------------------------
// §5 — THE BRANCH-ASSEMBLY AND CONTAINER-KIND RULES
// ---------------------------------------------------------------------------------------------

test('verbs · native contract.md §1.3 (`A22`) · the container\'s kind is DECIDED AT WRITE and INFERRED FROM CONTENTS ON READ: an object value decides a `MAP` and an array value a `VEC`, and a read of each assembles an object and a dense index-ordered array', () => {
  // DECLARED: "**THE CONTAINER'S KIND IS DECIDED AT WRITE AND INFERRED FROM CONTENTS ON READ**
  // (`P: §13 · A22`): a write of a JSON **object** decides/uses `MAP`; a write of a JSON **array**
  // decides/uses `VEC`; **a read infers the kind from what the container holds**". And §4.2's arms
  // `R-2`/`R-3`: `MAP` → "an object — *convert to an object, using the same keys*"; `VEC` → "an
  // array … index order, element `i` produced by the same read applied to the node the index-`i`
  // anchor points to. **The array is dense from `0` and its length is the container's contiguous
  // index count**".
  const instance = make();
  instance.write(['map'], 'mem', { z: 1, a: 2 });
  instance.write(['vec'], 'mem', [10, 20, 30]);

  const mapped = instance.read(['map'], 'mem');
  assert.equal(Array.isArray(mapped), false);
  assert.deepEqual(Object.keys(mapped).sort(), ['a', 'z']);
  assert.deepEqual(mapped, { z: 1, a: 2 });

  const vectored = instance.read(['vec'], 'mem');
  assert.equal(Array.isArray(vectored), true);
  assert.deepEqual(vectored, [10, 20, 30]);
  assert.equal(vectored.length, 3); // dense from 0, length = the contiguous index count
  // AND A NESTED ASSEMBLY IS THE SAME READ APPLIED RECURSIVELY (`R-2`'s own recursion sentence).
  instance.write(['mix'], 'mem', { list: [{ k: 1 }, 2] });
  assert.deepEqual(instance.read(['mix'], 'mem'), { list: [{ k: 1 }, 2] });
});

test("verbs · native contract.md §1.3 (the key-domain paragraph) · a write whose LAST SEGMENT's class contradicts the resolved parent container's key domain answers `ContainerKindConflict` with NOTHING INSTALLED — a `string` segment aimed at a `VEC`", () => {
  // DECLARED: "**the container's key domain is part of the container's kind (`MAP` = string keys;
  // `VEC` = index keys, contiguous from `0`), so a write whose LAST segment's CLASS contradicts the
  // resolved parent container's key domain — a `string` segment aimed at a `VEC`, or an integer
  // segment aimed at a `MAP` — is a KIND CONTRADICTION, and its answer is the SAME member the
  // value's kind contradiction answers: `ContainerKindConflict`, with NOTHING INSTALLED (no
  // anchor, no coercion, no container-kind change, and no journal entry)**" (§1.3; §8.1 #7). And
  // "**NO COERCION OCCURS**, and `\"0\"` is never `0`".
  const instance = make();
  instance.write(['vd'], 'mem', [7, 8]);

  const byString = catchIt(() => instance.write(['vd', 'name'], 'mem', 1));
  assert.equal(byString.status, 'ContainerKindConflict');

  // AND A WRITE OF A VALUE WHOSE OWN KIND CONTRADICTS THE EXISTING CONTAINER FAILS THE SAME WAY:
  // "a write of a JSON object decides/uses `MAP`; a write of a JSON array decides/uses `VEC` …
  // **A WRITE WHOSE KIND CONTRADICTS THE EXISTING CONTAINER FAILS**, with `ContainerKindConflict`,
  // and **the failed write leaves the container, the node and the journal untouched**".
  const byValue = catchIt(() => instance.write(['vd'], 'mem', { k: 1 }));
  assert.equal(byValue.status, 'ContainerKindConflict');

  // NOTHING INSTALLED: the container, its node and its index keys stand exactly as they stood.
  assert.deepEqual(instance.read(['vd'], 'mem'), [7, 8]);

  // AND THE INDEX ARM IS IN DOMAIN — an integer segment aimed at the `VEC` it belongs to.
  assert.doesNotThrow(() => instance.write(['vd', 2], 'mem', 9));
  assert.deepEqual(instance.read(['vd'], 'mem'), [7, 8, 9]);
});

test('verbs · native contract.md §3.2 (the PARENT RULE) · a write\'s resolution reaches its parent FIRST, so a write whose parent holds a LEAF answers `WriteParentNotLink` while the same write under a branch succeeds', () => {
  // DECLARED: "the write's two-stage resolution — the PARENT RULE, stated once" (§3.2), whose
  // failure arm is `§8.1` #9's `WriteParentNotLink`. The rule the observable rests on: the write
  // resolves the address's PARENT and installs the value as that parent link's child, so a parent
  // that is a LEAF is not a link and the write cannot reach an install stage.
  const instance = make();
  instance.write(['leaf'], 'mem', 42); // a LEAF at ['leaf']

  const caught = catchIt(() => instance.write(['leaf', 'under'], 'mem', 1));
  assert.equal(caught.status, 'WriteParentNotLink');

  // AND THE SAME WRITE UNDER A BRANCH INSTALLS — the arm above is the PARENT's and not the
  // segment's.
  instance.write(['branch'], 'mem', {});
  assert.doesNotThrow(() => instance.write(['branch', 'under'], 'mem', 1));
  assert.equal(instance.read(['branch', 'under'], 'mem'), 1);
});

// ---------------------------------------------------------------------------------------------
// §6 — `readLiteral`'S OWN NARROWING
// ---------------------------------------------------------------------------------------------

test("verbs · native contract.md §4.1.1 · `readLiteral` refuses EXACTLY TWO states: a `branch` target answers `ReadTargetIsBranch`, and at a LEAF the two forms are INDISTINGUISHABLE — \"the two forms differ ONLY in what they refuse\"", () => {
  // DECLARED: "`readLiteral` is the SAME read with ONE narrowing: its target must be a `leaf` …
  // 3. **IT REFUSES EXACTLY TWO STATES AND NOTHING ELSE:** **a `branch` target** (including the
  // register, whose read assembles an object) fails **`ReadTargetIsBranch`** (`§8.1` #8);
  // **everything else fails with the walk's own codes exactly as `read` does** … **It never returns
  // `null` and never returns the assembled JSON of a branch.**"
  const instance = make();
  instance.write(['lit'], 'mem', 5);
  instance.write(['br'], 'mem', { child: 1 });

  // A LEAF: indistinguishable from `read`.
  assert.equal(instance.readLiteral(['lit'], 'mem'), 5);
  assert.equal(instance.readLiteral(['lit'], 'mem'), instance.read(['lit'], 'mem'));

  // A BRANCH: `ReadTargetIsBranch` — and the register is a branch too, its read assembling an object.
  assert.equal(catchIt(() => instance.readLiteral(['br'], 'mem')).status, 'ReadTargetIsBranch');
  assert.equal(catchIt(() => instance.readLiteral([], 'mem')).status, 'ReadTargetIsBranch');

  // AND THE WALK'S OWN CODES ARE UNCHANGED BETWEEN THE TWO FORMS (`§4.1.1` clause 3): an address that
  // resolves to nothing answers `AddressNotFound` at BOTH.
  assert.equal(catchIt(() => instance.read(['nowhere'], 'mem')).status, 'AddressNotFound');
  assert.equal(catchIt(() => instance.readLiteral(['nowhere'], 'mem')).status, 'AddressNotFound');
});

// ---------------------------------------------------------------------------------------------
// §7 — THE NO-FILE-I/O CLAUSES
// ---------------------------------------------------------------------------------------------

test('verbs · native contract.md `DD-28` and js contract.md `DD-45` · a DELETE performs NO FILE I/O: a version it removed in memory STANDS AGAIN after a fresh boot over the same `cfg.filePath`, and that re-boot is the DECLARED consequence and not a defect', () => {
  // DECLARED: "**the `delete` and the `rollback` DO NOT COMMIT THE FILE, and the `file` tier's
  // durability is a WRITE's act alone** … **a `delete` — of any tier scope, including one that
  // removes `file`-tier versions — performs NO file I/O, and a `rollback` performs NO file I/O**;
  // consequently **a FRESH `storeCreate(cfg)` with the same `cfg.filePath` re-boots from the last
  // committed `file` write's bytes, so a version the delete or the rollback removed in memory STANDS
  // AGAIN after the re-boot** — that re-boot being *"`§7.2` item 6's declared boot, and it is the
  // declared consequence of this row rather than a defect"*" (`native contract.md`, `DD-28`);
  // `DD-45` carries the same rule on the JS side.
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-noio-'));
  const filePath = join(directory, 'store.json');

  const instance = make({ filePath });
  instance.write(['keep'], 'file', 'committed');
  // THE ARM IS NOT VACUOUS: the bytes DID reach the file, proved by a second instance over the same
  // path reading the written value (`native contract.md §7.2`).
  assert.equal(make({ filePath }).read(['keep'], 'file'), 'committed');

  // THE DELETE — of the `file`-tier version itself — performs NO file I/O.
  const receipt = instance.delete(['keep'], 'file');
  assert.deepEqual(receipt.tiers, ['file']);
  assert.equal(catchIt(() => instance.read(['keep'], 'file')).status, 'AddressNotFound');

  // … AND THE VERSION STANDS AGAIN AFTER THE RE-BOOT.
  assert.equal(make({ filePath }).read(['keep'], 'file'), 'committed');
});

test('verbs · native contract.md `DD-28` and §6.4 item 5 (`M-9`) · a ROLLBACK performs NO FILE I/O either, and it appends NO journal entry — so the re-boot reads the LAST COMMITTED `file` write, not the reversed one', () => {
  // DECLARED: `DD-28`'s second half — "a … `rollback` performs NO file I/O"; and `M-9`: "**a rollback
  // ITSELF appends NO journal entry** — the journal records store changes (`write`/`delete`), and a
  // rollback is not one of the two tracked verbs"; its observable "(iv) the next write's `seq`
  // continues as though the rollback had not happened".
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-rbio-'));
  const filePath = join(directory, 'store.json');

  const instance = make({ filePath });
  const first = instance.write(['rf'], 'file', 'one');
  const second = instance.write(['rf'], 'file', 'two');
  assert.equal(make({ filePath }).read(['rf'], 'file'), 'two');

  const result = instance.rollback(second.op.opId);
  assert.ok(result.undoneOps.includes(second.op.opId));
  assert.equal(instance.read(['rf'], 'file'), 'one'); // the in-memory state IS reversed

  // THE FILE IS UNTOUCHED BY THE ROLLBACK: a fresh boot reads the last committed write.
  assert.equal(make({ filePath }).read(['rf'], 'file'), 'two');

  // AND `M-9`'s OWN OBSERVABLE, "(iv) the next write's `seq` continues as though the rollback had
  // not happened" — read against `JournalOp.seq`'s own declaration: "the entry's APPEND ORDINAL,
  // strictly increasing from `1`" (`native contract.md §6.2`). TWO writes were appended before the
  // rollback, so their ordinals are `1` and `2`; the rollback appends nothing; and the next write is
  // ordinal `3` — never `4`, which is what a reverse that journalled itself would print.
  assert.equal(first.op.seq, 1);
  assert.equal(second.op.seq, 2);
  const third = instance.write(['rf'], 'file', 'three');
  assert.equal(third.op.seq, 3);
});

// ---------------------------------------------------------------------------------------------
// §8 — THE `rollback` ARGUMENT'S DOMAIN AND ITS TWO FLOORS
// ---------------------------------------------------------------------------------------------

test("verbs · contract.md §1.3 (`OpIdArg` rows 3–6) · `rollback`'s id is a NON-EMPTY `string`: a number, the empty string and `null`/`undefined` answer `AddressMalformed`, while a well-shaped id the journal does not hold answers `JournalOpUnknown`", () => {
  // DECLARED: `OpIdArg` row 1 — "a **non-empty `string`**"; row 2 — "a **string the store's journal
  // does not hold** | — | **`JournalOpUnknown`** (a well-shaped but unknown op id)"; row 3 — "the
  // **empty string** | — | **`AddressMalformed`** (a blank `opId`)"; row 4 — "**ABSENT** | —
  // | **`AddressMalformed`**"; row 5 — "**`null`** / **`undefined`** | — | **`AddressMalformed`**";
  // row 6 — "a **number** | — | **`AddressMalformed`**". index.d.ts's `rollback` states the same on
  // the JS side: "**`opId` IS A NON-EMPTY `string` AND NOT A NUMBER** … a number is an OUTSIDE value
  // the store answers `AddressMalformed` for".
  const instance = make();

  for (const outside of [42, '', null, undefined]) {
    const caught = catchIt(() => instance.rollback(outside));
    assert.equal(caught.status, 'AddressMalformed', `rollback(${String(outside)})`);
  }

  // A WELL-SHAPED ID THE JOURNAL DOES NOT HOLD IS A DIFFERENT CODE — the two arms are told apart by
  // the answer, which is how the carrier's own rule reads them (`contract.md §1.3`'s absent-vs-
  // `undefined` rule item 2: "told apart by the ANSWER").
  const unknown = catchIt(() => instance.rollback('never-minted-op-id'));
  assert.equal(unknown.status, 'JournalOpUnknown');
});

test('verbs · native contract.md §6.4 (`M-5` amendment (a)(ii)) · the rollback\'s TEMPORAL FLOOR: no entry whose `seq` is LESS than the named op\'s is reversed, so a value seeded BEFORE the named op survives a rollback that reverses it', () => {
  // DECLARED: "**(a) THE SCOPE, AMENDED: AN ENTRY `E` IS IN SCOPE IFF BOTH HOLD —** … **(ii) THE
  // TEMPORAL TEST: `E.seq` ≥ THE NAMED OP'S OWN `seq`** — so **AN ENTRY AT OR AFTER THE NAMED OP,
  // WITHIN ITS SUBTREE, AND NOTHING OLDER**"; its stated observable: "**A ROLLBACK OVER AN OP THAT AN
  // ATTEMPT CREATED LEAVES EVERY VALUE WRITTEN AT THE SAME ADDRESS (OR ANYWHERE UNDER IT) BY AN OP
  // WHOSE `seq` IS LESS THAN THAT OP'S `seq` STANDING**"; and item 1A's reading rule (A1):
  // "`RollbackResult.undoneOps` … CONTAINS NO `opId` WHOSE ENTRY LIES AT OR UNDER THE ROLLED-BACK
  // OP'S ADDRESS WITH `seq` LESS THAN THE NAMED OP'S".
  const instance = make();
  instance.write(['tf'], 'mem', {}); // the PARENT of every address below (§3.2)
  const seed = instance.write(['tf', 'k'], 'mem', 'seed'); // an EARLIER op at a descendant address
  instance.write(['tf', 'guard'], 'mem', {});
  const later = instance.write(['tf', 'k'], 'mem', 'later'); // the op we roll back over

  const result = instance.rollback(later.op.opId);

  // (A1) THE PERFORMED SET CARRIES NO OLDER ENTRY — read as a MEMBERSHIP test over the ids the drive
  // itself holds, never as an absence inferred from a value.
  assert.equal(result.undoneOps.includes(seed.op.opId), false);
  assert.ok(result.undoneOps.includes(later.op.opId));
  assert.ok(seed.op.seq < later.op.seq, 'the seeding write is not older than the named op');
  // AND THE SEED STILL READS — the SUPPORTING observation item 1A declares, never the discriminating
  // one.
  assert.equal(instance.read(['tf', 'k'], 'mem'), 'seed');
});

// ---------------------------------------------------------------------------------------------
// §9 — WHAT THE DECLARATION LEAVES OPEN, RECORDED RATHER THAN GUESSED
// ---------------------------------------------------------------------------------------------

test('verbs · index.d.ts `StoreInstance.delete` and native contract.md §4.4 (`DD-30`) · the receipt\'s `address` is the caller\'s array VERBATIM — a fresh array whose SEGMENTS are the caller\'s, at both an integer-bearing address and an empty one', () => {
  // DECLARED: "`address`: the address the caller passed, VERBATIM — the same array's segments, in
  // order; **the store returns a fresh array**" (§4.4's `DeleteReceipt`); and `DD-30`'s
  // renumbering clause is `VEC`-only — "its `address` member is the caller's own array VERBATIM".
  const instance = make();
  instance.write(['seg'], 'mem', [1, 2]);
  instance.write(['seg', 0], 'mem', 100);

  const caller = ['seg', 0];
  const receipt = instance.delete(caller);
  assert.deepEqual(receipt.address, ['seg', 0]);
  assert.notEqual(receipt.address, caller, 'the receipt handed back the CALLER\'S OWN array');
  // The caller's array is unmoved by the call — the copy is a copy in both directions.
  assert.deepEqual(caller, ['seg', 0]);

  // OWED (recorded, not guessed): the empty-address delete empties the register (`§4.4` arm `D-5`),
  // and the receipt's `address` there is `[]` — but whether the store's `[]` is a fresh array on a
  // call that removed nothing is not decided by any clause read for this cell. Nothing below
  // asserts the empty-address receipt's own identity.
  instance.write(['only'], 'mem', 1);
  const emptied = instance.delete([]);
  assert.deepEqual(emptied.address, []);
  assert.deepEqual(instance.read([]), {});
});

test("verbs · surface.md §2.2 · the FOURTH position exists on `write` ALONE: `read`, `readLiteral`, `delete` and `rollback` each take their declared arity and NO trailing position, because `write` is the one verb whose arity law `surface.md §2.2` clause 4 declares", () => {
  // DECLARED: "**THE PACKAGE MAY READ THE CALL'S ARGUMENT COUNT FOR THE FOURTH POSITION, AND ONLY FOR
  // THE FOURTH POSITION** … **NO OTHER VERB AND NO OTHER POSITION OF THIS SURFACE GAINS AN ARITY
  // READING, A DEFAULT OR A SUBSTITUTED ARGUMENT**" (`surface.md §2.2` clause 4); index.d.ts's
  // `read(address, tier?)` · `readLiteral(address, tier?)` · `delete(address, tier?)` ·
  // `rollback(opId)` — one optional position at most, and no record position anywhere.
  //
  // THE OBSERVABLE IS THE ABSENCE OF A FOURTH POSITION'S CLASS TEST AT THE OTHER FOUR: a SURPLUS
  // trailing argument is a surplus position the package passes through as supplied (`DD-46`: "the
  // package passes every argument position through as supplied and performs NO arity check of its
  // own", read through clause 4 at `write`'s fourth position ALONE) — so none of the four may answer
  // the class test's `TypeError` there.
  const instance = make();
  instance.write(['ap'], 'mem', {});
  const record = instance.write(['ap', 'x'], 'mem', 1);

  for (const call of [
    () => instance.read(['ap', 'x'], 'mem', 'surplus'),
    () => instance.readLiteral(['ap', 'x'], 'mem', 'surplus'),
    () => instance.delete(['ap', 'x'], 'mem', 'surplus'),
    () => instance.rollback(record.op.opId, 'surplus'),
  ]) {
    let threw = null;
    try {
      call();
    } catch (thrown) {
      threw = thrown;
    }
    // A SURPLUS POSITION IS NOT A REFUSAL AT THESE FOUR: if anything is thrown at all it is not the
    // class test's form, which is `write`'s fourth position and nowhere else.
    if (threw !== null) {
      assert.equal(
        threw instanceof TypeError,
        false,
        'a surplus position at one of the four non-`write` verbs threw the class test\'s TypeError',
      );
    }
  }
});
