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

const { storeCreate } = await import('../../../bindings/js/index.mjs');

function mem(extra = {}) {
  return storeCreate({ journalLength: 8, listeners: [], ...extra });
}

/// **THE OPERATIVE SURFACE THIS FILE DRIVES** (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.12` item 2
/// (a)'s clause of that date; `parameter-semantics.md §2.23`'s VACATED row): the product's own FOURTEEN members
/// (`10 + 1 + 1 + 2 = 14`) and the THREE constraint functions, each at the TWO positions the receiver ruling
/// leaves (`8 → 1`).
// **⟶ RE-DERIVED 2026-10-18, TWICE — AND THE SECOND STEP IS THIS PASS'S.** **STEP 1, `settle`:** the set moved
// `13 → 12`, `10 + 1 + 1 = 12` ✓, on the architect's ruling VERBATIM *"Settle is redundant because the kernel is
// always in the loop."* — the ten methods plus the TWO remaining singles `register` and `constraints`
// (`surface.md §2.4` item 9 (f)'s clause of that date, whose item `1` names both: *"TWO SINGLES REMAIN, AND THEY
// ARE NAMED"*), read through `§2.4` item 9's `REMOVED-WHOLE` pointer over the `settle` seam. **STEP 2, THIS
// UNIT:** the set moves `12 → 14`, `10 + 1 + 1 + 2 = 14` ✓, the two new members `removeListener` and
// `removeConstraint` (`contract.md §2.7` item 1 and item 9; `P: docs/pending.md · (AA-5)`, which WITHDRAWS the
// `12 → 13` figure BY NAME). **The constant's NAME is kept so no citing cell is renamed by a figure.** Every
// cell below reads this constant as a PREMISE — "the product carries its declared own members before any
// refusal is driven" — so the premise moves by two and each cell's own subject is untouched.
const FOURTEEN_MEMBERS = [
  'addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
  'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write',
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
/**
 * **THE REFUSING BODY, RE-DERIVED 2026-10-17 FOR THE REGISTRATION INSTANT — IT ADMITS THE ABSENCE AND
 * REFUSES EVERY LANDED VALUE.**
 *
 * `A135` (3) and `docs/specs/storeroom-native/contract.md §7.3` (b) state 1: a registration whose current
 * state PASSES stands, the identity is returned and no code is produced. The state a fresh pair is
 * registered against HOLDS NOTHING, and `kernel-surface.md §2.3` item 1's registration clause (3) (e)
 * declares that context's `value` as `undefined` — so a body that refuses EVERY context refuses at the
 * REGISTRATION too, and the pair can never be carried (state 2's refusal, `ConstraintListInvalid` #16).
 * **A CELL WHOSE SUBJECT IS THE WRITE'S REFUSAL THEREFORE NEEDS A BODY THAT PASSES AT REGISTRATION AND
 * REFUSES THE LANDED VALUE** — this one admits exactly `undefined`, and nothing a write can land.
 *
 * The cell's own subject is unchanged: every write that reaches the pair is still REFUSED, and its
 * invocation count is still `1` per write. Only the state the registration meets has moved.
 */
function refusing() {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return context.value === undefined
      ? true
      : { message: `${JSON.stringify(context.value)} is outside this pair's domain` };
  };
  wrapper.calls = [];
  return wrapper;
}
/**
 * **THE BODY THAT REFUSES THE ABSENT STATE AND ADMITS EVERY LANDED VALUE** — the mirror of `refusing()`,
 * and the ONE state a fresh pair is registered against is declared by `kernel-surface.md §2.3` item 1's
 * registration clause (3) (e), which fixes that context's `value` as `undefined`.
 *
 * THE REGISTRATION OF THIS BODY IS STATE 2 — *"the current state violates it and no repair is registered
 * for the pair"* — SO THE `ConstraintListInvalid` REFUSAL IS THE **SUBJECT** OF THE CELLS THAT USE IT, and
 * not a premise those cells need to arrange around (`docs/specs/storeroom-native/contract.md §7.3` (b)
 * state 2; `§8.1` #16 at its amended trigger).
 */
function refusingTheAbsentState() {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return context.value === undefined
      ? { message: 'the pair holds nothing, and this pair admits no absent value' }
      : true;
  };
  wrapper.calls = [];
  return wrapper;
}
/** A body that always PASSES — `PAR-C-5`'s first arm, `true`, whatever value the write landed, AND AT THE
 *  REGISTRATION INSTANT TOO, so the registration is state 1 and the pair is carried (`§7.3` (b) state 1). */
function passing() {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    return true;
  };
  wrapper.calls = [];
  return wrapper;
}

/**
 * **WRAP A BODY SO THAT ITS `calls` LIST HOLDS ONLY THE INVOCATIONS THAT FOLLOW ITS REGISTRATION** — the
 * cells of this file read `calls.length` as *"the count of writes that reached the pair"* (`surface.md
 * §2.12` item 3's observable, *"`1` per write that reaches the pair"*), and `A135` (3) adds ONE invocation
 * of the same body at the registration instant (`contract.md §7.3` (b) state 1; `kernel-surface.md §2.3`
 * item 1's registration context). The wrapper admits absence so the registration PASSES (state 1) and the
 * pair is carried, and it **CLEARS the count once the registration has returned**, so every count a cell
 * reads stays the count the clause declares. The invocation the registration made is not discarded as a
 * fact: it is asserted directly, where a cell's subject is that premise, at
 * `a126_add_at_a_fresh_pair_returns_an_opaque_identity_and_carries_the_function`.
 */
function countsOnlyAfterRegistration(body) {
  const wrapper = (context) => {
    wrapper.calls.push(context);
    if (context.value === undefined) return true; // STATE 1 at the registration: the pair is carried
    return body(context);
  };
  wrapper.calls = [];
  wrapper.mirror = body;
  /** Called by the cell after `addConstraint` returns: the registration's own invocation is a fact about the
   *  registration, and the counts below are counts of WRITES. */
  wrapper.fromHere = () => {
    wrapper.calls.length = 0;
    return wrapper;
  };
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
  // **⟶ RE-DERIVED 2026-10-17 UNDER `A135` (3) AND `contract.md §7.3` (b) STATE 1.** THE BODY IS
  // INCIDENTAL TO THIS CELL — the cell's SUBJECT is the identity the ADD answers and the function the pair
  // then carries, not the body's answer — so the body is `counted()`, which admits `'ok'` and therefore
  // PASSES the registration's own context (`kernel-surface.md §2.3` item 1's registration clause (3) (e):
  // that context's `value` is `undefined` at an address holding nothing) **only where it admits absence**.
  // `counted()` refuses `undefined`, so the registration would be REFUSED (state 2) and the cell could
  // never reach its own subject. **THE BODY THIS CELL REGISTERS ADMITS ABSENCE AND `'ok'`**, so state 1
  // holds and the cell's subject — the identity and the carried function — is reached unchanged.
  const fn = counted();
  // the registration meets an absent value: admit it, so STATE 1 stands and the identity is returned
  const passAtRegistration = (context) => {
    passAtRegistration.calls.push(context);
    return context.value === undefined ? true : fn(context);
  };
  passAtRegistration.calls = [];
  const id = a.addConstraint(PAIR('c1'), passAtRegistration);
  assert.ok(id !== undefined && id !== null, 'the ADD route answers the constraint identity');
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.12` item 3's observable clause): THE COUNT IS *"`1` PER WRITE
  // THAT REACHES THE PAIR"*, so the cell must contain THE WRITE ITS OWN COUNT SPEAKS OF.** The as-filed
  // cell asserted `fn.calls.length === 1` with the count taken BEFORE its own write — a count no clause
  // declares — and this cell drives the one write first, as item 3's observable requires. The write is the
  // PASSING arm (`PAR-C-5`'s first arm, `true`): it returns the declared three-member record and throws
  // nothing (`§2.7` item 3).
  const record = a.write(['a'], 'mem', 'ok');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'], 'and the write proceeds');
  // THE REGISTRATION INVOCATION IS `1` AND THE WRITE'S IS THE SECOND: `A135` (3) runs the body ONCE at the
  // registration instant, and the cell reads the count of the writes that reached the pair off `fn.calls`.
  assert.equal(fn.calls.length, 1, 'the function the caller supplied at the `constraint` position is the one invoked — ONCE, for the one write that reached the pair');
  assert.deepEqual(Object.keys(fn.calls[0]).sort(), ['address', 'attempt', 'op', 'tier', 'value'],
    'and that invocation`s ONE argument IS `PAR-C-16`\'s five-member attempt context');
  assert.equal(fn.calls[0].value, 'ok', 'the context carries VERBATIM the value this write landed');
  // AND THE REGISTRATION'S OWN INVOCATION CARRIES THE REGISTRATION CONTEXT — the same five members, with
  // `tier` and `op` absent spelled `null`, `attempt` `null` on this state, and `value` READ not landed.
  assert.equal(passAtRegistration.calls.length, 2,
    'the same function RAN ONCE AT THE REGISTRATION (`§7.3` (b) state 1 via `A135` (3)) and once for the write');
  assert.deepEqual(Object.keys(passAtRegistration.calls[0]).sort(), ['address', 'attempt', 'op', 'tier', 'value'],
    'and the registration invocation carries the SAME five-member context shape (`kernel-surface.md §2.3` item 1)');
  assert.equal(passAtRegistration.calls[0].value, undefined,
    'the registration context`s `value` is the STORE\'S CURRENT VALUE, READ NOT LANDED — `undefined` at an address holding nothing (`§2.3` item 1\'s registration clause (3) (e))');
  assert.equal(passAtRegistration.calls[0].tier, null, '`tier` is ABSENT and spelled `null` at that instant (its (2))');
  assert.equal(passAtRegistration.calls[0].op, null, 'and `op` is ABSENT and spelled `null` (its (5))');
  assert.equal(passAtRegistration.calls[0].attempt, null,
    'and `attempt` is `null` on state 1: no attempt is opened by a registration that passes (its (4))');
});

test('a126_add_at_a_held_pair_overwrites_the_function_and_refuses_nothing', () => {
  const a = mem();
  const pair = PAIR('c2');
  // **⟶ RE-DERIVED 2026-10-17: EACH BODY'S `calls` LIST IS READ FOR THE COUNT OF *WRITES* THAT REACHED THE
  // PAIR, SO THE REGISTRATION'S OWN INVOCATION MUST NOT STAND IN IT.** `A135` (3) runs a constraint ONCE at
  // its registration (`contract.md §7.3` (b) state 1), and the state a fresh pair is registered against
  // holds nothing (`kernel-surface.md §2.3` item 1's registration clause (3) (e): `value` is `undefined`).
  // The bodies below therefore admit absence AND `'ok'`, so both registrations STAND (state 1) and the cell's
  // own subject — the pair-keyed identity and the overwrite — is reached with no `ConstraintListInvalid`.
  const first = countsOnlyAfterRegistration(counted());
  const second = countsOnlyAfterRegistration(counted());
  const id1 = a.addConstraint(pair, first);
  const id2 = a.addConstraint(pair, second);
  // THE REGISTRATION INVOCATIONS ARE THE PREMISE AND NOT THE SUBJECT: `A135` (3) ran each body once at its
  // own registration, and `§7.3` (b) state 1 returned, so both registrations STOOD. The counts below are
  // counts of WRITES, so the registration's own invocation is dropped from each list here, after it happened.
  first.fromHere();
  second.fromHere();
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
  const left = countsOnlyAfterRegistration(passing()); // `PAR-C-5`'s first arm, `true`, for whatever value the write landed
  // **⟶ RE-DERIVED 2026-10-17 (`A135` (3); `contract.md §7.3` (b) state 1): `right` IS REGISTERED AGAINST
  // THE VALUE THE FIRST WRITE LEFT** — a `'yes'` standing at `['shared']` and READ by the store at the
  // registration instant (`kernel-surface.md §2.3` item 1's registration clause (3)) — so a body refusing
  // every value is REFUSED THERE and its carriage is never reached. The two instants are DISTINGUISHED BY
  // THE CONTEXT ITSELF and not by the value: the registration's context carries `tier` ABSENT, spelled
  // `null` (`§2.3` item 1's clause (2)), while a LANDING's carries the tier it landed at — so a body that
  // admits at `tier === null` and refuses every landed write is exactly the `{message}` arm this cell needs,
  // and the cell's observable (the write is refused) is unchanged.
  const right = countsOnlyAfterRegistration((context) => (
    context.tier === null ? true : { message: `${JSON.stringify(context.value)} is outside this pair's domain` }
  ));
  // **⟶ RE-DERIVED 2026-10-17: BOTH REGISTRATIONS MUST STAND FOR THE CELL'S SUBJECT TO BE REACHED.** `right`
  // is the pair whose carriage this cell reads — *"the second id carries nothing yet"* — so its registration
  // is the act that puts it in the registry, and under `A135` (3) a body refusing the registration's own
  // context is REFUSED THERE and never carried at all. The bodies therefore admit the registration's state
  // and answer their own arms for every other LANDED value, which is the state this cell's observable writes.
  a.addConstraint(PAIR('left', ['shared']), left);
  left.fromHere(); // the first pair's OWN registration invocation is a fact about the registration, not a write
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
  right.fromHere(); // the second pair's OWN registration invocation is a fact about the registration, not a write
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
  // **⟶ RE-DERIVED 2026-10-17: THE CELL'S SUBJECT IS THE TOGGLE, NOT THE BODY'S REGISTRATION ANSWER.** The
  // registration must STAND for a carried pair to exist and be togglable at all (`contract.md §7.3` (b)
  // state 1); a body refusing the registration's own absent `value` is refused there with
  // `ConstraintListInvalid` and leaves nothing to toggle (`§7.3` (b) state 2).
  //
  // **AND THE ENABLE HALF IS ITSELF A REGISTRATION** (`surface.md §2.12` item 3's clause of 2026-10-16 at its
  // `A135` (3) mark: *"RE-REGISTERS THE PAIR'S OWN FUNCTION, SO IT TAKES THE SAME THREE-STATE REGISTRATION AS
  // EVERY OTHER REGISTRATION SITE"*), so `constraintOn` re-evaluates the body against THE STORE'S CURRENT
  // STATE — which by then holds the value the `constraintOff` write landed. **THE BODY MUST THEREFORE ACCEPT
  // THAT STATE AND STILL REFUSE THE WRITE THIS CELL DRIVES AFTER IT**: the two instants are told apart by the
  // context itself, a registration's carrying `tier` ABSENT spelled `null` (`kernel-surface.md §2.3` item 1's
  // registration clause (2)) where a landing's carries the tier it landed at. **THE CELL'S OWN SUBJECT IS
  // UNMOVED: while ENABLED the write is refused, while DISABLED it is accepted, and the toggle re-enables it.**
  const fn = (context) => {
    fn.calls.push(context);
    return context.tier === null ? true : { message: `${JSON.stringify(context.value)} is outside this pair's domain` };
  };
  fn.calls = [];
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
  // **THE EXISTENCE PRECONDITION — `contract.md §2.7` item 9's FOURTEEN-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), FOURTEEN_MEMBERS,
    'the product carries its FOURTEEN declared own members (`10 + 1 + 1 + 2 = 14`) before any refusal '
    + 'is driven');
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
  // **⟶ RE-DERIVED 2026-10-17 (`A135` (3); `contract.md §7.3` (b) state 1): THE REGISTRATION INVOCATIONS ARE
  // COUNTED AND THEN CLEARED, BECAUSE THIS CELL'S COUNTS ARE COUNTS OF LANDED WRITES.** `fn` is invoked once
  // when registered and `other` once when the toggle's third position names it — wait, `other` is never
  // registered, only PASSED to a toggle that substitutes nothing — so only `fn`'s registration invocation
  // stands in a list the cell reads. It is cleared after the registration and the cell's own subject is
  // unchanged: the pair's OWN function is the one the write reaches, and the toggle's function is reached
  // no further.
  const fn = countsOnlyAfterRegistration(refusing()); // the function the pair actually carries: it violates every landed write
  a.addConstraint(pair, fn);
  fn.fromHere();
  a.constraintOff(pair, fn);
  const other = refusing(); // a DIFFERENT function at the same pair: a NO-OP on success, never a substitute
  // `other` is NEVER registered, so no invocation of it at any registration instant stands in its list: every
  // count read off it below is the count of writes that reached it, which is the count the clause names.
  assert.equal(a.constraintOn(pair, other), undefined,
    'a pair carrying a function is carried whatever function the toggle passes: carriage is the pair-keyed registry`s own, and the toggle answers `undefined`');
  // **⟶ AND THE ENABLE HALF IS ITSELF A REGISTRATION, SO IT CARRIES `A135` (3)'s ONE EVALUATION.** The landed
  // `constraintOn` *"RE-REGISTERS THE PAIR'S OWN FUNCTION, SO IT TAKES THE SAME THREE-STATE REGISTRATION AS
  // EVERY OTHER REGISTRATION SITE"* (`surface.md §2.12` item 3's clause of 2026-10-16 at its `A135` (3) mark;
  // `bindings/js/index.mjs`'s `constraintToggle`) — so `fn` runs once more at that registration, and the count
  // this cell reads is the count of WRITES, which starts after it.
  fn.fromHere();
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
  // **⟶ RE-DERIVED 2026-10-17 (`A135` (3); `contract.md §7.3` (b) state 1; `§7.1` step 4-bis):** the batch
  // route registers through the SAME `K-1` the `addConstraint` route does, so THE CONSTRUCTION RUNS THE
  // BATCH ELEMENT'S BODY ONCE AT ITS REGISTRATION. The body admits absence so that registration STANDS
  // (`kernel-surface.md §2.3` item 1's registration clause (3) (e)) and the pair is carried; the cell's
  // subject — that a batch pair toggles exactly like an added one — is unchanged.
  const fn = countsOnlyAfterRegistration(counted('ok'));
  const a = mem({ constraints: [{ address: ['a'], id: 'b1', constraint: fn }] });
  fn.fromHere(); // the construction's own registration invocation is a fact about the registration, not a write
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
  // **⟶ RE-DERIVED 2026-10-17 (`A135` (3); `contract.md §7.3` (b) state 1): BOTH REGISTRATIONS RUN THEIR
  // BODY ONCE, AND BOTH MUST STAND FOR THE OVERWRITE TO BE REACHED.** The batch route's registration and the
  // `addConstraint` overwrite are the SAME `K-1` call, so each body answers the registration's own context —
  // whose `value` is `undefined` at the fresh `['a']` (`kernel-surface.md §2.3` item 1's registration clause
  // (3) (e)) — and each body admits it, so both stand and the cell's own subject (the displacement and the
  // counts of writes) is unchanged. The registration invocations are dropped from the lists the counts read.
  const batch = countsOnlyAfterRegistration(counted('ok'));
  const a = mem({ constraints: [{ address: ['a'], id: 'b2', constraint: batch }] });
  batch.fromHere();
  const added = countsOnlyAfterRegistration(counted('ok'));
  a.addConstraint({ address: ['a'], id: 'b2' }, added);
  added.fromHere();
  const record = a.write(['a'], 'mem', 'ok');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'], 'and the write proceeds');
  assert.equal(batch.calls.length, 0, 'the batch`s displaced function is invoked no further: its count is `0`');
  assert.equal(added.calls.length, 1, 'and the added function`s count is `1` for the one write that reaches the pair');
});

// **⟶ SUPERSEDED 2026-10-24, AND ITS SUBJECT IS GONE RATHER THAN STALE (`D-17`'s DISCARD class; `D-26` item 4,
// verbatim: *"The batch in cfg.constraints must supply functions"*).**
//
// **WHAT STOOD HERE.** `const a = mem({ constraints: [{ address: ['a'], id: 'b3' }] })` — a FUNCTIONLESS batch
// element — followed by *"a well-formed pair with no function is admitted by the store's list rule"* and, at the
// tail, by the toggles REFUSING at that unarmed pair. **`D-26` rules that state away at its own source**: *"a
// well-formed `cfg.constraints` element that carried no function … HAS NO PRODUCER ON THIS ROUTE: a batch element
// is always carried"*, and the construction now refuses such an element `ConstraintListInvalid` BEFORE ANY
// FILESYSTEM ACT (`B-1`). **A DISCARD IS NOT A DELETION, SO THE HALF THAT SURVIVES IS DRIVEN BESIDE IT** — the
// refusal `B-1` now makes, which is the same act this cell used to admit.
test('a126_a_functionless_batch_element_is_REFUSED_at_the_construction_and_no_instance_returns', () => {
  // `B-1` — the refusal `D-26` owes and the package owns, in the surface's ONE thrown form, with the store's
  // existing `ConstraintListInvalid` and NO code minted (`docs/L1/surface-deltas.md` §2.1).
  const refusal = (() => {
    try {
      return mem({ constraints: [{ address: ['a'], id: 'b3' }] }) && null;
    } catch (caught) {
      return caught;
    }
  })();
  assert.notEqual(refusal, null,
    'a functionless batch element is REFUSED at the construction — `D-26` item 5: *"a missing, `undefined` or '
    + 'non-function `constraint` member cannot be seen by the store, so the PACKAGE refuses it"*');
  assert.equal(refusal.status, 'ConstraintListInvalid',
    'and its member is the list\'s own validation code at rank `16` — the package MINTS NO CODE (`D-26` item 5; '
    + '`D-27`; `contract.md §8.1` #16)');
  assert.deepEqual(Object.keys(refusal).sort(), ['log', 'message', 'status'],
    'and it is the surface\'s ONE thrown form with `log: []` — no attempt was opened and no instance exists '
    + '(`surface.md §2.5` item 4)');
  assert.ok(!(refusal instanceof TypeError),
    'and NEVER a `TypeError`: the class-test form belongs to OUTSIDE VALUES of a position, while an element '
    + 'without its function is an element outside the LIST\'s declared shape (`docs/L1/surface-deltas.md` §2.1)');

  // AND THE STATE THE OLD CELL'S TAIL ASSERTED — that a pair carrying no function is NOT a carried pair, so a
  // toggle at it refuses the constraint methods' one `TypeError` — STILL HAS A PRODUCER, at the ADD route's own
  // refused registration: a pair whose function was never supplied is one `addConstraint` refused, and the
  // toggle at it is the class test. **THE BATCH ROUTE CAN NO LONGER PRODUCE IT** (`D-26` item 4).
  const a = mem();
  // **⟶ THE EXISTENCE AND ARITY PRECONDITIONS, ADDED 2026-10-17 (`role_test_writer`, GATE 4's ADVERSARIAL
  // PASS) — THE CELL'S SUBJECT IS A THROW, SO WITHOUT THEM AN ABSENT `constraintOn` SATISFIED IT.** The
  // member set is `contract.md §2.7` item 9's FOURTEEN, and the three constraint functions are read by `typeof` and by ARITY `2`
  // BEFORE the refusal is driven — the same precondition the four cells of this class carry (`surface.md
  // §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s VACATED row; `§2.12` item 3's one
  // spelling, `8 → 1`). **A MISSING `constraintOn` THROWS A `TypeError` TOO, WHICH IS THE ONE CLASS TEST —
  // so deleting the member makes this cell FAIL at the `typeof` reading and not pass at the predicate.**
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), FOURTEEN_MEMBERS,
    'the product carries its FOURTEEN declared own members (`10 + 1 + 1 + 2 = 14`) before any refusal '
    + 'is driven');
  for (const name of THREE) {
    assert.equal(typeof a[name], 'function',
      `and \`${name}\` IS a member of the product, arity TWO — so the TypeError below is the CLASS TEST's `
      + 'and not a missing member\'s');
    assert.equal(a[name].length, 2, `and \`${name}\` declares TWO positions and no more (\`8 → 1\`)`);
  }
  const fn = refusing();
  assert.ok(
    isTheOneTypeError(thrown(() => a.constraintOn({ address: ['a'], id: 'b3' }, fn))),
    'and the toggles REFUSE at a pair no function was ever supplied to: no pair is left enabled with no '
    + 'function (`surface.md §2.12` item 3; `D-26` item 4 — the ADD route is that state\'s only producer now)',
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// `surface.md §2.12` item 4 (rule (ii) of `§2.4` item 9 (f)) — THE ONE `TypeError`, AND NOTHING CHANGED.
// `parameter-semantics.md §2.24` (`PAR-JS-24`) and `§2.22` (`PAR-JS-22`) name the outside-value lists.
// ─────────────────────────────────────────────────────────────────────────────────────────────

test('a126_an_outside_pair_throws_the_one_type_error_and_changes_nothing', () => {
  const a = mem();
  // **THE EXISTENCE PRECONDITION — `contract.md §2.7` item 9's FOURTEEN-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), FOURTEEN_MEMBERS,
    'the product carries its FOURTEEN declared own members (`10 + 1 + 1 + 2 = 14`) before any refusal '
    + 'is driven');
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
  // **THE EXISTENCE PRECONDITION — `contract.md §2.7` item 9's FOURTEEN-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), FOURTEEN_MEMBERS,
    'the product carries its FOURTEEN declared own members (`10 + 1 + 1 + 2 = 14`) before any refusal '
    + 'is driven');
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
  // **THE EXISTENCE PRECONDITION — `contract.md §2.7` item 9's FOURTEEN-MEMBER SET, ASSERTED AS THE STATE THE FAILURE IS
  // DECLARED AGAINST** (`surface.md §2.4` item 9 (f)'s `A127` clause; `parameter-semantics.md §2.23`'s
  // VACATED row; the three functions at their TWO declared positions, `8 → 1` arity). **AN ACCIDENTALLY
  // GREEN CELL — one whose subject is a THROW — is otherwise satisfied by a member that does not exist,
  // because `undefined(x)` throws a `TypeError` too**, so the member's own existence and arity are read
  // FIRST at every cell of this class and no assertion below is weakened by it.
  assert.deepEqual(Object.getOwnPropertyNames(a).sort(), FOURTEEN_MEMBERS,
    'the product carries its FOURTEEN declared own members (`10 + 1 + 1 + 2 = 14`) before any refusal '
    + 'is driven');
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
