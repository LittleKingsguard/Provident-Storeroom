// `A126` · `A127` — THE THREE CONSTRAINT METHODS: THE ADD ROUTE AND ITS OVERWRITE, THE TWO IDEMPOTENT
// TOGGLES, THE CARRIAGE PRE-CONDITION, AND THE ONE `TypeError`.
//
// **AUTHORED FROM THE CONTRACT ALONE.** Every cell cites its spec cell: `surface.md §2.12` items 2 (a)–(c)
// and 3, `parameter-semantics.md §2.22` and `§2.24` (`PAR-JS-22`, `PAR-JS-24`), `§2.25` (`PAR-JS-25`), and
// `test-cases.md`'s `A126` pointer set. No cell reads `index.mjs`, `index.d.ts` or `src/**`.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// **THE STATE MACHINE, ENUMERATED BEFORE ANY CELL WAS AUTHORED:**
//
// | # | The state | Its cell |
// | --- | --- | --- |
// | 1 | ADD at a pair the entry does NOT carry — the FRESH arm | `a126_add_at_a_fresh_pair_returns_an_opaque_identity_and_carries_the_function` |
// | 2 | ADD at a pair the entry ALREADY carries — the OVERWRITE arm (`A126`: *"overwrites if ID already exists"*) | `a126_add_at_a_held_pair_overwrites_the_function_and_refuses_nothing` |
// | 3 | The overwrite's own observable: the displaced function's invocation count is `0` after the overwrite | `a126_the_displaced_function_is_invoked_no_further_after_the_overwrite` |
// | 4 | The identity is `PAR-JS-25`'s OPAQUE value: ONE identity per pair, and a drive compares identities and never contents | `a126_the_identity_is_opaque_and_pair_keyed` |
// | 5 | `constraintOff` at a pair the entry carries, ENABLED | `a126_constraintOff_disables_a_carried_pair_and_constraintOn_reenables_it` |
// | 6 | `constraintOn` ENABLE (the pair disabled by the toggle above) — the same cell as state 5 | `a126_constraintOff_disables_a_carried_pair_and_constraintOn_reenables_it` |
// | 7 | A toggle reached where the pair ALREADY STANDS in the state it asks for — IDEMPOTENT SUCCESS | `a126_a_toggle_reached_in_the_state_it_asks_for_is_idempotent_success` |
// | 8 | A toggle at a pair the entry does NOT carry — OUTSIDE the domain, either function, either direction | `a126_a_toggle_at_a_pair_the_entry_does_not_carry_throws_the_one_type_error` |
// | 9 | The BATCH route's pair — carried on the SAME footing as an added pair | `a126_a_batch_populated_pair_toggles_like_an_added_one` |
// | 10 | ADD at a BATCH pair — the `A126` overwrite, and NOT a second route | `a126_add_at_a_batch_pair_takes_the_overwrite_and_the_batch_function_is_displaced` |
// | 11 | A batch element carrying NO function — admitted by the store's list rule and NOT a carried pair | `a126_a_functionless_batch_element_is_admitted_and_its_pair_is_not_carried` |
// | 12 | `PAIR-KEYED` carriage: two pairs at one address are carried separately | `a126_two_ids_at_one_address_are_carried_separately` |
//
// **THE FAIL-STATES, EACH WITH ITS OWN CELL:**
//
// | # | The fail-state | Its answer | Its cell |
// | --- | --- | --- | --- |
// | F1 | an outside `pair` — the whole `PAR-JS-24` outside-value list | the ONE `TypeError`, `status` ABSENT, nothing changed | `a126_an_outside_pair_throws_the_one_type_error_and_changes_nothing` |
// | F2 | an outside `constraint` — `PAR-JS-22`'s outside values | the ONE `TypeError` | `a126_an_outside_constraint_throws_the_one_type_error` |
// | F3 | a position BELOW the declared arity (both positions REQUIRED) | the ONE `TypeError` | `a126_a_short_arity_throws_the_one_type_error` |
// | F4 | a toggle at an uncarried pair that carries the pair's KEY but NOT the function the kernel would evaluate | the ONE `TypeError`, the entry NOT widened | `a126_a_toggle_at_a_key_holding_no_function_throws_the_one_type_error` |
//
// **THE ONE THING THIS FILE DOES NOT DRIVE, AND WHY (recorded, not guessed):** `§2.12` item 4's own clause
// makes the `message` half of the three methods' refusal A DRAFTING PROHIBITION CARRYING NO OBSERVABLE OF ITS
// OWN — *"PROVENANCE IS NOT A PROPERTY OF A THROWN VALUE … no assertion over its content can be derived from
// this directory"* — so no cell below asserts anything of the thrown `TypeError`'s `message` string. The one
// observable the prohibition carries, the `status` member's ABSENCE, is asserted in every refusal cell.
//
// (`surface.md §2.4` item 9 (f)'s `A127` clause, rule (ii); `surface.md §2.12` items 2–4; `contract.md §5.0`.)

import test from 'node:test';
import assert from 'node:assert/strict';

const { storeCreate } = await import('provident-storeroom');

function mem(extra = {}) {
  return storeCreate({ journalLength: 8, listeners: [], ...extra });
}

/// **THE OPERATIVE SURFACE THIS FILE DRIVES** (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.12` item 2
/// (a)'s clause of that date; `parameter-semantics.md §2.23`'s VACATED row): the product's own TWELVE members
/// (`10 + 1 + 1 = 12`) and the THREE constraint functions, each at the TWO positions the receiver ruling
/// leaves (`8 → 1`).
const TWELVE_MEMBERS = [
  'addConstraint', 'constraintOff', 'constraintOn', 'delete', 'listen', 'read', 'readLiteral',
  'register', 'rollback', 'settle', 'unlisten', 'write',
];
const THREE = ['addConstraint', 'constraintOn', 'constraintOff'];

/** The one class-test form: a `TypeError` whose `status` member is ABSENT (`surface.md §2.12` item 4). */
function isTheOneTypeError(err) {
  return err instanceof TypeError && Object.prototype.hasOwnProperty.call(err, 'status') === false;
}

function thrown(fn) {
  try {
    fn();
  } catch (err) {
    return err;
  }
  assert.fail('the call was declared to refuse and it returned instead');
}

/**
 * A counting constraint whose own RETURN is the one cell a cell below reads.
 *
 * **⟶ CORRECTED 2026-10-16 (`storeroom-constraints/parameter-semantics.md §2.5`'s `PAR-C-5` row;
 * `§2.16`'s `PAR-C-16` row; `surface.md §2.12` item 3's observable, whose count is *"`1` per write that
 * reaches the pair"*).** **THE BODY'S ONE ARGUMENT IS THE ATTEMPT CONTEXT RECORD — `PAR-C-16`'s FIVE members
 * `{address, tier, value, attempt, op}` — AND NOT THE VALUE THE WRITE CARRIED**, so the as-filed body's
 * `value !== refuse` compared a VALUE against a RECORD and could therefore NEVER refuse: the helper could
 * only ever PASS, which is why two cells that leaned on a refusal ran green for a reason they did not name.
 * **AND ITS RETURN IS `PAR-C-5`'S CLOSED THREE-ARM SET — `true` (the pass) · `{repair, message}` (a
 * repairable violation) · `{message}` (an unrepaired violation)** — so a body returning `false` is OUTSIDE
 * the set and is read as the `{message}` arm with the KERNEL's own generated sentence. This body reads the
 * value it confirms off `context.value` and answers the `{message}` arm — the UNREPAIRED VIOLATION — for
 * every value but the one `admit` names, and `true` for that one. `calls` records each invocation's argument
 * record so a cell may read the context's own SHAPE; no cell asserts a value no clause declares.
 */
function counted(admit = 'ok') {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return context.value === admit ? true : { message: `${JSON.stringify(context.value)} is outside this pair's domain` };
  };
  wrapper.calls = [];
  return wrapper;
}
/** The same body with no admission at all: it violates EVERY write that reaches its pair (`PAR-C-5`'s `{message}` arm). Its `admit` is a symbol — a value no write may carry, `PAR-JS-8`'s outside-value list. */
function refusing() {
  return counted(Symbol('nothing is admitted'));
}
/** A body that always PASSES — `PAR-C-5`'s first arm, `true`, whatever value the write landed. */
function passing() {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return true;
  };
  wrapper.calls = [];
  return wrapper;
}

const PAIR = (id, address = ['a']) => ({ address, id });

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.12` item 2 clause (b) and item 3 clause (b) — THE ADD ROUTE CARRIES THE FUNCTION, AND THE
// OVERWRITE IS `A126`'s OWN WORDS. `parameter-semantics.md §2.25` — the returned identity is an OPAQUE
// value the package owns: no spelling, no accessor, and a drive compares IDENTITIES AND NEVER CONTENTS.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a126_add_at_a_fresh_pair_returns_an_opaque_identity_and_carries_the_function', () => {
  const a = mem();
  const fn = counted(); // it admits `'ok'` and answers the `{message}` arm for everything else
  const id = a.addConstraint(PAIR('c1'), fn);
  assert.ok(id !== undefined && id !== null, 'the ADD route answers the constraint identity');
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 3's observable clause): THE COUNT IS *"`1` PER WRITE
  // THAT REACHES THE PAIR"*, so the cell must contain THE WRITE ITS OWN COUNT SPEAKS OF.** The as-filed
  // cell asserted `fn.calls.length === 1` with the count taken BEFORE its own write — a count no clause
  // declares — and this cell drives the one write first, as item 3's observable requires. The write is the
  // PASSING arm (`PAR-C-5`'s first arm, `true`): it returns the declared three-member record and throws
  // nothing (`§2.7` item 3).
  const record = a.write(['a'], 'mem', 'ok');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'], 'and the write proceeds');
  assert.equal(fn.calls.length, 1, 'the function the caller supplied at the `constraint` position is the one invoked — ONCE, for the one write that reached the pair');
  assert.deepEqual(Object.keys(fn.calls[0]).sort(), ['address', 'attempt', 'op', 'tier', 'value'],
    'and that invocation`s ONE argument IS `PAR-C-16`\'s five-member attempt context');
  assert.equal(fn.calls[0].value, 'ok', 'the context carries VERBATIM the value this write landed');
});

test('a126_add_at_a_held_pair_overwrites_the_function_and_refuses_nothing', () => {
  const a = mem();
  const pair = PAIR('c2');
  const first = counted();
  const second = counted();
  const id1 = a.addConstraint(pair, first);
  const id2 = a.addConstraint(pair, second);
  assert.deepEqual(id2, id1, 'the SAME pair answers the SAME pair-keyed identity, on the fresh arm and the held one');
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 3 clause (c) item 3): *"after `addConstraint` at a
  // batch pair … the added function's own count is `1` PER WRITE THAT REACHES THE PAIR"*, and the clause's
  // own first observable is *"the batch`s function is INVOKED NO FURTHER — its count … is `0`"* read at that
  // same write.** The as-filed cell asserted `second.calls.length === 1` with NO WRITE IN THE CELL — a
  // count the clause does not fix (`0` is what the as-filed bytes measured) — so the one write the count
  // speaks of stands here, and both counts are read after it.
  const record = a.write(['a'], 'mem', 'ok');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'], 'and the write proceeds');
  assert.equal(first.calls.length, 0, 'the displaced function is invoked no further — its count is `0`');
  assert.equal(second.calls.length, 1, 'and the added function`s count is `1` for the one write that reaches the pair');
});

test('a126_the_displaced_function_is_invoked_no_further_after_the_overwrite', () => {
  const a = mem();
  const pair = PAIR('c3');
  const old = refusing();
  a.addConstraint(pair, old);
  thrown(() => a.write(['a'], 'mem', 'anything')); // the pair violates while the OLD function is carried
  const before = old.calls.length;
  a.addConstraint(pair, refusing());
  thrown(() => a.write(['a'], 'mem', 'anything'));
  thrown(() => a.write(['a'], 'mem', 'anything'));
  assert.equal(old.calls.length, before, 'the overwritten function gains NO further invocation');
});

test('a126_the_identity_is_opaque_and_pair_keyed', () => {
  const a = mem();
  const one = a.addConstraint(PAIR('c4'), refusing());
  const two = a.addConstraint(PAIR('c5'), refusing());
  assert.notEqual(one, two, 'two different ids answer two different identities');
  assert.equal(typeof one, 'object', 'and the identity is an opaque value and not a string a caller could author');
  assert.deepEqual(Object.keys(one), [], 'no clause of the unit declares a spelling for it, so it carries no readable member');
});

test('a126_two_ids_at_one_address_are_carried_separately', () => {
  const a = mem();
  const left = passing(); // `PAR-C-5`'s first arm, `true`, for whatever value the write landed
  const right = refusing(); // `PAR-C-5`'s `{message}` arm: it admits nothing
  a.addConstraint(PAIR('left', ['shared']), left);
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 3's carriage definition, clause (a): *"THE ENTRY
  // CARRIES A PAIR IF AND ONLY IF A FUNCTION STANDS REGISTERED AT THAT PAIR IN THE KERNEL'S OWN PAIR-KEYED
  // REGISTRY"*, read with `PAR-C-5`'s arms).** **THE OBSERVABLE IS A WRITE THAT PASSES THE ONE CARRIED
  // HALF'S BODY:** this cell writes at the ONE shared address while the ONLY pair carrying a function is
  // `left`, which admits everything — so the write is accepted, which it could not be were `right`'s own
  // function carried beside it. `right` is then ADDED at the same address and the next write is refused,
  // which reads its own carriage. The as-filed cell wrote values each pair refused and read two counts off
  // writes that never returned — a state in which no count it asserted was observable.
  const record = a.write(['shared'], 'mem', 'yes');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
    'a write that passes the one carried pair returns the declared three-member record');
  assert.equal(left.calls.length, 1, 'the first id at the address carries its own function — ONCE, for the write that reached it');
  assert.equal(right.calls.length, 0, 'and the second id carries nothing yet: its own count is unmoved');
  a.addConstraint(PAIR('right', ['shared']), right);
  thrown(() => a.write(['shared'], 'mem', 'yes'));
  assert.equal(right.calls.length, 1, 'the second id, once added at the SAME address, carries its own function — ONCE');
  assert.equal(left.calls.length, 2, 'and the first id` own count moves only by the write that reached it: the two are carried separately');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.12` item 3 — THE TWO TOGGLES: ENABLE/DISABLE, IDEMPOTENT SUCCESS IN THE STATE ASKED FOR,
// AND THE ONE `TypeError` AT A PAIR THE ENTRY DOES NOT CARRY.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a126_constraintOff_disables_a_carried_pair_and_constraintOn_reenables_it', () => {
  const a = mem();
  const pair = PAIR('t1');
  const fn = refusing();
  a.addConstraint(pair, fn);
  const enabled = thrown(() => a.write(['a'], 'mem', 'refuse'));
  assert.ok(enabled !== undefined, 'while the pair is ENABLED the function is evaluated and the write is refused');

  assert.equal(a.constraintOff(pair, fn), undefined, 'constraintOff answers `undefined` with NO third position');
  const off = a.write(['a'], 'mem', 'refuse');
  assert.deepEqual(Object.keys(off).sort(), ['op', 'triggered', 'watched'],
    'and the disabled pair does not refuse the write: it returns the declared three-member record');
  const afterOff = fn.calls.length;

  assert.equal(a.constraintOn(pair, fn), undefined, 'constraintOn answers `undefined`');
  thrown(() => a.write(['a'], 'mem', 'refuse'));
  assert.ok(fn.calls.length > afterOff, 'and the disabled pair is ENABLED again by the toggle');
});

test('a126_a_toggle_reached_in_the_state_it_asks_for_is_idempotent_success', () => {
  const a = mem();
  const pair = PAIR('t2');
  const fn = refusing();
  a.addConstraint(pair, fn);
  assert.equal(a.constraintOn(pair, fn), undefined, '`constraintOn` at an ENABLED pair THROWS NOTHING');
  assert.equal(a.constraintOff(pair, fn), undefined, 'and `constraintOff` at the pair it just disabled throws nothing');
  assert.equal(a.constraintOff(pair, fn), undefined, '`constraintOff` at an ALREADY DISABLED pair THROWS NOTHING');
  assert.equal(a.constraintOn(pair, fn), undefined, 'and `constraintOn` re-enables it');
});

test('a126_a_toggle_at_a_pair_the_entry_does_not_carry_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION — `A127`'s TWELVE-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), TWELVE_MEMBERS,
    'the product carries its TWELVE declared own members (`10 + 1 + 1 = 12`) before any refusal is driven');
  for (const name of THREE) {
    assert.equal(typeof a[name], 'function',
      `and \`${name}\` IS a member of the product, arity TWO — so the TypeError below is the CLASS TEST's `
      + 'and not a missing member\'s');
    assert.equal(a[name].length, 2, `and \`${name}\` declares TWO positions and no more (\`8 → 1\`)`);
  }
  const fn = refusing();
  for (const [name, call] of [
    ['constraintOn', () => a.constraintOn(PAIR('absent'), fn)],
    ['constraintOff', () => a.constraintOff(PAIR('absent'), fn)],
    ['constraintOn (another address)', () => a.constraintOn(PAIR('absent', ['elsewhere']), fn)],
    ['constraintOff (another address)', () => a.constraintOff(PAIR('absent', ['elsewhere']), fn)],
  ]) {
    const err = thrown(call);
    assert.ok(isTheOneTypeError(err), `${name} at an uncarried pair throws ONE TypeError with no \`status\` member`);
  }
  assert.equal(fn.calls.length, 0, 'and the entry is NOT widened by a refused toggle');
});

test('a126_a_toggle_at_a_key_holding_no_function_throws_the_one_type_error', () => {
  // **⟶ CORRECTED 2026-10-16 — THE CELL NAME IS KEPT AT ITS AS-FILED BYTES AND ITS ASSERTION IS THE
  // ONE THE CLAUSE DECLARES, WHICH IS THE OPPOSITE OF THE ONE THE NAME READS** (`surface.md §2.12` item 3's
  // operative table row for `constraintOn`: *"the third position is REQUIRED and is a NO-OP on every
  // success: the caller supplies as a FUNCTION the identity it holds at that pair; the entry NEVER
  // SUBSTITUTES ONE, and no identity the caller holds at a pair it carries is ever refused here — a value
  // that is not a function takes item 4's refusal on the **ARGUMENT's** ground and not on the pair's"*;
  // quoted verbatim at the pre-existing GREEN cell `test/constraints-publication.test.mjs`'s
  // `cp_toggle_the_third_position_is_required_and_is_a_no_op_on_success`). **THE AS-FILED CELL ASSERTED A
  // `TypeError` AT A CARRIED PAIR AND WAS MALFORMED: the toggle's refusal is on the ARGUMENT's ground, and
  // the PAIR at `t3` carries a function — so the toggles at it SUCCEED.** The state the name reads — a KEY
  // holding NO function — is reached by the BATCH route alone and is asserted at the sibling cell
  // `a126_a_functionless_batch_element_is_admitted_and_its_pair_is_not_carried`.
  const a = mem();
  const pair = PAIR('t3');
  const fn = refusing(); // the function the pair actually carries: it violates every write that reaches it
  a.addConstraint(pair, fn);
  a.constraintOff(pair, fn);
  const other = refusing(); // a DIFFERENT function at the same pair: a NO-OP on success, never a substitute
  assert.equal(a.constraintOn(pair, other), undefined,
    'a pair carrying a function is carried whatever function the toggle passes: carriage is the pair-keyed registry`s own, and the toggle answers `undefined`');
  thrown(() => a.write(['a'], 'mem', 'anything'));
  assert.equal(fn.calls.length, 1,
    'and the pair`s OWN function was invoked by the write that reached it — the toggle substituted NO function');
  assert.equal(other.calls.length, 0,
    'while the function the TOGGLE carried is invoked no further: the third position is a NO-OP on every success');
  assert.equal(a.constraintOff(pair, other), undefined,
    'and the other half answers `undefined` at the same pair, on the same ground');
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.12` item 3 clauses (b)–(d) — THE BATCH ROUTE AND THE ADD ROUTE AT ONE PAIR. The batch is the
// construction's fourth key (`parameter-semantics.md §2.21`, `PAR-JS-21`).
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a126_a_batch_populated_pair_toggles_like_an_added_one', () => {
  const fn = counted('ok');
  const a = mem({ constraints: [{ address: ['a'], id: 'b1', constraint: fn }] });
  a.write(['a'], 'mem', 'ok');
  assert.ok(fn.calls.length >= 1, 'the batch element`s own function stands registered at its pair');

  assert.equal(a.constraintOff({ address: ['a'], id: 'b1' }, fn), undefined, 'constraintOff reaches a batch pair');
  const afterOff = fn.calls.length;
  a.write(['a'], 'mem', 'ok');
  assert.equal(fn.calls.length, afterOff, 'a write the batch element`s function refused while enabled is not reached after constraintOff');

  assert.equal(a.constraintOn({ address: ['a'], id: 'b1' }, fn), undefined, 'and constraintOn re-enables the batch pair');
  a.write(['a'], 'mem', 'ok');
  assert.ok(fn.calls.length > afterOff, 'and the pair is evaluated again');
});

test('a126_add_at_a_batch_pair_takes_the_overwrite_and_the_batch_function_is_displaced', () => {
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 3 clause (c) item 3, its own bytes): *"the batch`s
  // function is INVOKED NO FURTHER — its invocation count on that pair after the overwrite is `0`, and the
  // added function`s own count is `1` PER WRITE THAT REACHES THE PAIR"*.** The as-filed cell asserted the
  // second count with NO WRITE IN THE CELL — a count of `1` the clause does not fix in that state, the
  // measured bytes being `0` — so the ONE write the clause's count speaks of stands here, and BOTH counts
  // are read after it.
  const batch = counted('ok');
  const a = mem({ constraints: [{ address: ['a'], id: 'b2', constraint: batch }] });
  const added = counted('ok');
  a.addConstraint({ address: ['a'], id: 'b2' }, added);
  const record = a.write(['a'], 'mem', 'ok');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'], 'and the write proceeds');
  assert.equal(batch.calls.length, 0, 'the batch`s displaced function is invoked no further: its count is `0`');
  assert.equal(added.calls.length, 1, 'and the added function`s count is `1` for the one write that reaches the pair');
});

test('a126_a_functionless_batch_element_is_admitted_and_its_pair_is_not_carried', () => {
  const a = mem({ constraints: [{ address: ['a'], id: 'b3' }] });
  assert.deepEqual(a.read([]), {}, 'a well-formed pair with no function is admitted by the store`s list rule');
  const fn = refusing();
  assert.ok(
    isTheOneTypeError(thrown(() => a.constraintOn({ address: ['a'], id: 'b3' }, fn))),
    'the toggles REFUSE at a functionless element: no pair is left enabled with no function',
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.12` item 4 (rule (ii) of `§2.4` item 9 (f)) — THE ONE `TypeError`, AND NOTHING CHANGED.
// `parameter-semantics.md §2.24` (`PAR-JS-24`) and `§2.22` (`PAR-JS-22`) name the outside-value lists.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a126_an_outside_pair_throws_the_one_type_error_and_changes_nothing', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION — `A127`'s TWELVE-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), TWELVE_MEMBERS,
    'the product carries its TWELVE declared own members (`10 + 1 + 1 = 12`) before any refusal is driven');
  for (const name of THREE) {
    assert.equal(typeof a[name], 'function',
      `and \`${name}\` IS a member of the product, arity TWO — so the TypeError below is the CLASS TEST's `
      + 'and not a missing member\'s');
    assert.equal(a[name].length, 2, `and \`${name}\` declares TWO positions and no more (\`8 → 1\`)`);
  }
  const fn = refusing();
  const outsidePairs = [
    null,
    undefined,
    'a.b',
    '',
    0,
    1,
    true,
    [],
    [['a'], 'id'],
    {},
    { address: ['a'] },
    { id: 'c1' },
    { address: 'a', id: 'c1' },
    { address: ['a'], id: 1 },
    { address: ['a'], id: '' },
    { address: [null], id: 'c1' },
  ];
  for (const pair of outsidePairs) {
    const err = thrown(() => a.addConstraint(pair, fn));
    assert.ok(isTheOneTypeError(err), `addConstraint over ${JSON.stringify(pair)} throws ONE TypeError`);
    assert.equal(fn.calls.length, 0, 'no store call is made and no pair`s element is overwritten');
  }
  for (const pair of outsidePairs) {
    for (const name of ['constraintOn', 'constraintOff']) {
      const err = thrown(() => a[name](pair, fn));
      assert.ok(isTheOneTypeError(err), `${name} over ${JSON.stringify(pair)} throws ONE TypeError`);
    }
  }
});

test('a126_an_outside_constraint_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION — `A127`'s TWELVE-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), TWELVE_MEMBERS,
    'the product carries its TWELVE declared own members (`10 + 1 + 1 = 12`) before any refusal is driven');
  for (const name of THREE) {
    assert.equal(typeof a[name], 'function',
      `and \`${name}\` IS a member of the product, arity TWO — so the TypeError below is the CLASS TEST's `
      + 'and not a missing member\'s');
    assert.equal(a[name].length, 2, `and \`${name}\` declares TWO positions and no more (\`8 → 1\`)`);
  }
  for (const outside of [null, undefined, 'fn', 0, true, {}, [], Symbol('s'), 1n]) {
    const err = thrown(() => a.addConstraint(PAIR('c9'), outside));
    assert.ok(isTheOneTypeError(err), 'an outside `constraint` throws the ONE TypeError');
    assert.equal(typeof err.status, 'undefined', 'and its `status` member is ABSENT');
  }
});

test('a126_a_short_arity_throws_the_one_type_error', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION — `A127`'s TWELVE-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), TWELVE_MEMBERS,
    'the product carries its TWELVE declared own members (`10 + 1 + 1 = 12`) before any refusal is driven');
  for (const name of THREE) {
    assert.equal(typeof a[name], 'function',
      `and \`${name}\` IS a member of the product, arity TWO — so the TypeError below is the CLASS TEST's `
      + 'and not a missing member\'s');
    assert.equal(a[name].length, 2, `and \`${name}\` declares TWO positions and no more (\`8 → 1\`)`);
  }
  const cases = [
    () => a.addConstraint(PAIR('c10')),
    () => a.addConstraint(),
    () => a.constraintOn(PAIR('c10')),
    () => a.constraintOff(PAIR('c10')),
  ];
  for (const call of cases) {
    assert.ok(isTheOneTypeError(thrown(call)), 'neither position is optional, so a short arity throws the ONE TypeError');
  }
});
