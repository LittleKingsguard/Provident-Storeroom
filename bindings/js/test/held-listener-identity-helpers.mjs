// SHARED FIXTURE AND ASSERTION HELPERS FOR THE
// `U-STOREROOM-HELD-LISTENER-IDENTITY` RED SET (`D-GP-SHLI`).
//
// NOT A TEST FILE: `node --test bindings/js/test/*.test.mjs` does not match this name, so this module
// contributes no test and holds no assertion of its own.
//
// **AUTHORED FROM THE CONTRACT ALONE** (`docs/specs/storeroom-held-listener-identity/contract.md` and its
// parts). Nothing here reads `bindings/js/index.mjs`, `bindings/js/index.d.ts` or `bindings/js/src/**` for
// an expectation: every domain, every form and every count below is the contract's own, cited at the
// clause it comes from.
//
// ── THE TWO DOMAINS THIS FILE SPELLS ONCE, AND THE SITES THAT CITE THEM ────────────────────────────
//
// 1. THE HANDLE'S DOMAIN — `{ s : s ∈ String ∧ s ≠ "" }` (contract.md §2.1 item 1;
//    identity-and-domain.md §2 item 1). `HANDLE_OUTSIDE` is identity-and-domain.md §2 item 3's
//    ROW-FOR-ROW list of the ten outside values, and `SET_OUTSIDE` is listen-verb.md §2.2 item 2's six
//    classes for `listen`'s SECOND position. Every outside-value cell in this red set draws from these two
//    arrays, so a class cannot be driven at one site and forgotten at another.
//
// 2. THE TWO REFUSAL FORMS, TOLD APART BY `status`'s PRESENCE AND BY NOTHING ELSE
//    (constraint-sites.md §6 item 3): rule (i) is the surface's ONE thrown form
//    `{status, message, log}` whose `status` is drawn from the store's closed sixteen
//    (constraint-sites.md §6 item 1); rule (ii) is the constraint methods' `TypeError`, `status` member
//    ABSENT, `log: []` (constraint-sites.md §6 item 2).
//
// AND THE ONE THING THIS FILE DOES NOT DO: IT DECLARES NO THIRD FORM, NO `KC` TOKEN AND NO FAIL STATE.
// A row the contract marks `OWED` or `UNSUPPORTED` is named in the file that would have driven it and is
// driven by nothing here (contract.md §10; test-cases.md §5 item 1).

import assert from 'node:assert/strict';
import { storeCreate } from 'provident-storeroom';

/** The store's closed sixteen-member set, read and never minted (constraint-sites.md §6 item 1). */
export const STORE_CODES = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch',
  'WriteParentNotLink', 'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing',
  'FilePathUnreachable', 'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
];

/** The eight kernel `KC` tokens — read so a drive can assert a store code is NEVER one of them. */
export const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];

/**
 * **`identity-and-domain.md §2` ITEM 3'S TEN OUTSIDE VALUES, ROW FOR ROW, EACH WITH THE ROW NUMBER THAT
 * CLAUSE PRINTS.** A drive takes the rows its own clause names and never all ten by default: `unlisten`
 * answers EVERY row as a no-op success (contract.md §2.1 item 5's third column), `register` and `listen`
 * refuse every row (`§2.1` item 5's second column), and `removeListener` throws on every row
 * (`§2.1` item 5's fourth column, the DECLARED REVERSAL `P: docs/pending.md · P-5`'s `(R2)`).
 */
export function handleOutsideValues() {
  return [
    { row: 1, label: 'a BLANK string ""', value: '' },
    { row: 2, label: 'a non-string primitive (number)', value: 7 },
    { row: 2, label: 'a non-string primitive (boolean)', value: true },
    { row: 2, label: 'a non-string primitive (bigint)', value: 7n },
    { row: 3, label: 'null', value: null },
    { row: 4, label: 'undefined', value: undefined },
    { row: 5, label: 'a plain object', value: { handle: 'x' } },
    { row: 5, label: 'an array', value: ['x'] },
    { row: 5, label: 'a function', value: () => {} },
    { row: 6, label: 'a Symbol', value: Symbol('handle') },
    {
      row: 7,
      label: 'a Proxy (read WITHOUT invoking a trap)',
      value: new Proxy({}, { get() { throw new Error('a trap was invoked'); }, has() { throw new Error('a trap was invoked'); } }),
    },
    { row: 8, label: 'a well-formed string A FOREIGN INSTANCE HOLDS', value: 'a-foreign-instances-handle' },
    { row: 9, label: 'a well-formed string THIS INSTANCE HELD IN A PRIOR SESSION', value: 'a-prior-sessions-handle' },
    { row: 10, label: 'a well-formed string the store NEVER held', value: 'a-fabricated-handle-never-listened' },
  ];
}

/**
 * **`listen-verb.md §2.2` ITEM 2'S SIX OUTSIDE CLASSES FOR THE SET POSITION, EACH WITH ITS OWN LETTER.**
 * The sixth is the shape a caller reaches for by mistake: ONE address spelled as a bare segment list, which
 * the position refuses because a SEGMENT LIST IS NOT A SET (listen-verb.md §2.2 item 2, verbatim: *"A
 * SINGLE ADDRESS SUPPLIED AS A BARE SEGMENT LIST IS OUTSIDE THE DOMAIN"*).
 */
export function setOutsideValues() {
  return [
    { cls: '(i)', label: 'ABSENT', omit: true },
    { cls: '(ii)', label: 'null', value: null },
    { cls: '(iii)', label: 'undefined', value: undefined },
    { cls: '(iv)', label: 'a non-array (number)', value: 4 },
    { cls: '(iv)', label: 'a non-array (string)', value: 'a/b' },
    { cls: '(iv)', label: 'a non-array (plain object)', value: { 0: 'a' } },
    { cls: '(iv)', label: 'a non-array (function)', value: () => {} },
    { cls: '(v)', label: 'an array carrying a null segment', value: [['a', null]] },
    { cls: '(v)', label: 'an array carrying an undefined segment', value: [['a', undefined]] },
    { cls: '(v)', label: 'an array carrying a float index', value: [['a', 1.5]] },
    { cls: '(v)', label: 'an array carrying a negative index', value: [['a', -1]] },
    { cls: '(v)', label: 'an array carrying a nested array where a segment belongs', value: [[['a']]] },
    { cls: '(vi)', label: 'a BARE SEGMENT LIST (one address where a set is required)', value: ['a', 'b'] },
  ];
}

/**
 * **SEED THE CONTAINER A WRITE'S ADDRESS SITS IN — A PRE-EXISTING STORE INVARIANT THIS CHANGE DOES NOT
 * MOVE, AND FIXTURE RATHER THAN PROPERTY.**
 *
 * A write mints its own key INSIDE an existing parent container: `write-and-read.md §3.4`'s `W-3`/`W-4`
 * fire where *"the parent is a `branch`/the register"* and the container holds no anchor at `key`, so a
 * caller-made write carrying an OBJECT value mints the branch tree the deeper address needs. Where that
 * parent container does not exist the write is `F-3`'s arm — the parent resolution fails and the walk's
 * own code crosses, `AddressNotFound` (`write-and-read.md §3.4`'s `F-3`; its message is the store's own
 * *"'x' does not exist in '', it holds no keys"*, `seams-and-lifecycle.md §8.2`).
 *
 * SO A DRIVE THAT WRITES AT A NESTED ADDRESS SEEDS EACH ANCESTOR CONTAINER FIRST, one level at a time
 * from the root down to the write's own parent. The seeds are FIXTURE and carry no expectation: no cell
 * asserts a seed's value, and every seed runs BEFORE `listen`/`register` so no seed write is ever
 * delivered to a listener under test (a delivery count a cell asserts is therefore unmoved by it).
 *
 * `written` is the ONE address the drive is about to write at, a segment list — never a set of addresses.
 */
export function seedContainers(store, written) {
  for (let depth = 1; depth < written.length; depth += 1) {
    store.write(written.slice(0, depth), 'mem', { seeded: 'the container the write lands inside' });
  }
  return written;
}

/** One counter shared by every drive, so two drives' handles never collide. */
let uid = 0;
export function tag(label) {
  uid += 1;
  return `${label}-${process.pid.toString(36)}-${uid}`;
}

/** A `mem`-register store with an empty `listeners` array — `S-1` (contract.md §3 `S-1`). */
export function makeStore(opts = {}) {
  const cfg = { journalLength: 16, listeners: [] };
  if ('filePath' in opts) cfg.filePath = opts.filePath;
  if ('listeners' in opts) cfg.listeners = opts.listeners;
  if ('constraints' in opts) cfg.constraints = opts.constraints;
  if ('journalLength' in opts) cfg.journalLength = opts.journalLength;
  return storeCreate(cfg);
}

/** A caller-spelled handle this drive owns (contract.md §2.1 item 1). */
export function newHandle(label = 'h') {
  return tag(label);
}

/**
 * THE KERNEL MODULE, LOADED DYNAMICALLY AND FOR THE RED SET'S SAKE ONLY.
 *
 * With a static `import` the module's absence collapses a whole file into ONE failure and the red set
 * cannot be enumerated by test name; here every cell stands as its own entry and fails with the same
 * cause. No path is searched beyond the declared home (`bindings/js/src/constraint-kernel.mjs`,
 * docs/specs/storeroom-constraints/kernel-surface.md §1 item 1) and no stub is substituted.
 */
let loaded = null;
export async function kernel() {
  if (loaded === null) {
    loaded = await import('../src/constraint-kernel.mjs');
  }
  return loaded;
}

/** The kernel's six declared items — `5 + 1 = 6` ✓ (remove-member.md §5 item 1; contract.md §2.9). */
export const KERNEL_ITEMS = ['register', 'commit', 'runAttempt', 'log', 'report', 'remove'];

/** Capture a throw without swallowing the distinction between "threw" and "returned". */
export function capture(fn) {
  try {
    const value = fn();
    return { threw: false, value };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/**
 * RULE (i) — THE SURFACE'S ONE THROWN FORM (constraint-sites.md §6 item 1; contract.md §2.1 item 6):
 * a THROWN PLAIN OBJECT of EXACTLY {status, message, log}, status a member of the store's closed
 * sixteen, message the store's own text carried verbatim, log an ARRAY on every arm.
 */
export function assertRuleOne(err, where) {
  assert.equal(typeof err, 'object', where + ': rule (i) form is a thrown object');
  assert.notEqual(err, null, where + ': rule (i) form is not null');
  assert.equal(Array.isArray(err), false, where + ': rule (i) form is not an array');
  assert.equal(err instanceof Error, false,
    where + ': rule (i) form is a plain object and not an Error instance — constraint-sites.md §6 item 1');
  assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
    where + ': the member set is EXACTLY {status, message, log} — read '
    + JSON.stringify(Object.keys(err).sort()));
  assert.equal(typeof err.status, 'string', where + ': status is a string');
  assert.equal(STORE_CODES.includes(err.status), true,
    where + ': and it is drawn from the store closed sixteen-member set — read '
    + JSON.stringify(err.status)
    + ' (constraint-sites.md §6 item 1; P: docs/pending.md · (C-3): no widening)');
  assert.equal(KC_TOKENS.includes(err.status), false,
    where + ': and a store code is NEVER a kernel KC token');
  assert.equal(typeof err.message, 'string', where + ': message is a string');
  assert.ok(err.message.length > 0,
    where + ': message is never empty (the store own text, carried verbatim)');
  assert.ok(Array.isArray(err.log), where + ': log is an array on every arm');
  return err;
}

/**
 * RULE (ii) — THE PACKAGE'S CLASS TEST (constraint-sites.md §6 item 2): a TypeError CARRYING NO
 * status MEMBER, gaining log: [] by surface.md §2.5's clause of 2026-10-16 item 4. status's
 * PRESENCE IS THE ONE THING THAT TELLS THE TWO FORMS APART, and nothing else (constraint-sites.md
 * §6 item 3).
 */
export function assertRuleTwo(err, where) {
  assert.ok(err instanceof TypeError,
    where + ': rule (ii) is a TypeError — read ' + Object.prototype.toString.call(err)
    + ' (constraint-sites.md §6 item 2)');
  assert.equal('status' in err, false,
    where + ': and its status member is ABSENT — that absence IS the discriminator ('
    + 'constraint-sites.md §6 item 3)');
  assert.deepEqual(err.log, [], where + ': it carries log: [] and no other log');
  return err;
}

/**
 * **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-22`, verbatim: *"Listen should return the handle on
 * success, or error message on fail. Discard the noop prefix"*) — `listen` ANSWERS THE HANDLE IT WATCHES
 * UNDER, AND THIS HELPER ASSERTS THAT INSTEAD OF `undefined`.**
 *
 * **WHAT STOOD HERE, NAMED SO ITS ABSENCE IS LEGIBLE.** `assert.equal(value, undefined, …)` with the ground
 * `contract.md §2.2 item 10`'s *"the caller supplied the identity, so there is no datum to return"* — the
 * `Handle → undefined` return the 2026-10-19 pass declared and `D-22` OVERRULES BY NAME (`docs/L1/
 * surface-deltas.md` §1.1: *"the ground this block states above … is OVERRULED BY NAME"*). **The success
 * signal now CARRIES the identity — the caller's own spelling, returned as the identity the store holds for
 * that entry** — and `K-1` ADOPTS the value (that is what makes the kernel's occupancy *adopted, never
 * minted*, and what `FTS-12.4`'s adoption observable asserts). **The failure channel is untouched**: it stays
 * the surface's one thrown form, and `assertStoreFailure` is what a refusing call must pass.
 *
 * **`handle` IS OPTIONAL AND IS THE STRONGER READING WHERE THE CELL HAS IT**: with the caller's own spelling
 * in scope the assertion is `value === handle`, which is the whole of `D-22`; without it (a `listen` reached
 * through another act) the assertion is the weaker but still real *"a non-empty string came back"*, which is
 * `Handle`'s declared domain and nothing else.
 */
export function assertListenAnswer(value, where, handle) {
  if (handle !== undefined) {
    assert.equal(value, handle,
      where + ': listen(h, S) ANSWERS THE HANDLE IT WATCHES UNDER — the caller\'s own spelling, returned as '
      + 'the identity the store holds for that entry (`D-22`; `docs/L1/surface-deltas.md` §1.1). Read '
      + JSON.stringify(value) + ' against ' + JSON.stringify(handle));
    return value;
  }
  assert.equal(typeof value, 'string',
    where + ': listen(h, S) answers a `Handle` and nothing else — the return moved `void → Handle` (`D-22`). '
    + 'Read ' + JSON.stringify(value));
  assert.ok(value.length > 0, where + ': and a `Handle` is a NON-EMPTY string (`identity-and-domain.md §2`)');
  return value;
}

/** removeListener answers undefined on success (contract.md §2.7 item 2; PAR-HL-15). */
export function assertRemoveListenerAnswer(value, where) {
  assert.equal(value, undefined,
    where + ': removeListener(h) === undefined on the success arm; the fail is the THROW and never a '
    + 'returned discriminant (contract.md §2.7 item 4; PAR-HL-15). Read ' + JSON.stringify(value));
}

/** removeConstraint answers undefined on success (contract.md §2.7 item 3; PAR-HL-17). */
export function assertRemoveConstraintAnswer(value, where) {
  assert.equal(value, undefined,
    where + ': removeConstraint(pair) === undefined on the success arm '
    + '(contract.md §2.7 item 3; PAR-HL-17). Read ' + JSON.stringify(value));
}

/**
 * THE TRIGGER PAIR, ASSERTED AS ITS TWO MEMBERS AND NO THIRD (contract.md §2.4 item 1;
 * PAR-HL-19, PAR-HL-20, PAR-HL-21).
 *
 * A BARE HANDLE IN THIS LIST IS TF-1 — a FAILURE of contract.md §2.4 and trigger-and-pair.md §3
 * item 3 — so a string element is reported at its own name and not as a shape mismatch.
 */
export function assertTriggerPair(element, where) {
  if (typeof element === 'string') {
    assert.fail(
      where + ': a BARE HANDLE stands in a trigger set — read ' + JSON.stringify(element)
      + '. Every element is a {handle, address} pair (contract.md §2.4 item 1; '
      + 'trigger-and-pair.md §8 TF-1)',
    );
  }
  assert.equal(typeof element, 'object', where + ': a trigger element is a pair record');
  assert.notEqual(element, null, where + ': a trigger element is not null');
  assert.deepEqual(Object.keys(element).sort(), ['address', 'handle'],
    where + ': the element carries EXACTLY the two members — read '
    + JSON.stringify(Object.keys(element).sort())
    + ' (PAR-HL-19, PAR-HL-20; a THIRD member is a member of no element)');
  assert.equal(typeof element.handle, 'string',
    where + ': the handle member is the caller own STRING, never a wrapper, a token or an encoding '
    + '(contract.md §2.1 item 1; PAR-HL-19)');
  assert.ok(element.handle.length > 0, where + ': and it is non-empty');
  assert.ok(Array.isArray(element.address),
    where + ': the address member is the BINDING address, a segment list (PAR-HL-20)');
  return element;
}

/** Every element of a trigger set, checked as a pair — the totality PAR-HL-21/PAR-HL-22 declare. */
export function assertAllPairs(list, where) {
  assert.ok(Array.isArray(list), where + ': a trigger set is an array');
  for (let i = 0; i < list.length; i += 1) assertTriggerPair(list[i], where + '[' + i + ']');
  return list;
}

/** The pair handle members, as a LIST — how a drive reads a trigger set as a SET (DD-37/DD-22). */
export function handlesOf(list) {
  return list.map((e) => (e !== null && typeof e === 'object' ? e.handle : e));
}

/** SET equality over two trigger sets, by handle and binding address — NEVER a sequence comparison. */
export function sameTriggerSet(a, b) {
  const key = (list) => list.map((e) => e.handle + '\u0000' + JSON.stringify(e.address)).sort();
  return JSON.stringify(key(a)) === JSON.stringify(key(b));
}

/**
 * SELF-EXCLUSION: A DRIVE THAT ASSERTS A NEGATIVE MUST FAIL WHEN THE FEATURE IS PRESENT.
 * legacyListenSignature reports whether the OLD listen(address) arity is what the instance answers,
 * so a cell can say whether the new verb has landed at all rather than blame its own subject.
 */
export function legacyListenSignature(store) {
  return typeof store.listen === 'function' && store.listen.length === 1;
}

/** The product's declared fourteen own members — `10 + 1 + 1 + 2 = 14` ✓ (contract.md §2.7 item 9). */
export const THE_FOURTEEN = [
  'read', 'readLiteral', 'write', 'delete', 'rollback',
  'listen', 'unlisten',
  'addConstraint', 'constraintOn', 'constraintOff',
  'register', 'constraints',
  'removeListener', 'removeConstraint',
];
