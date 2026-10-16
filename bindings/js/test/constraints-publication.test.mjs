// RED SET — THE `A122`/`A123`/`A124`/`A125` PUBLICATION PASS, DRIVEN FROM THE SPECS ALONE.
//
// AUTHORITY, EACH CLAUSE NAMED BY ITS OWN HOME:
//   · `docs/decisions.md`, 2026-10-16 — `A122` (the engine is BEHIND the package surface: `surface →
//     kernel → Rust store → kernel`, and the kernel's five items stay INTERNAL — there is NO second
//     `exports` arm), `A123` (`manageConstraints(instance, pair, operation)` — the NINTH named export and
//     the FIFTH own member of the `storeCreate` object), `A124` (the fifth position of `write` is a
//     commit), `A125` (an externally-supplied `commit` is an UNSUPPORTED ANTI-PATTERN).
//   · `docs/specs/storeroom-js/surface.md §2.12` — the operative law `§2.6` points at: item 1 (the
//     entry→kernel call, the five stages, the three arms), item 2 (the route: NINTH export, FIFTH own
//     member), item 3 (the three arms with their pre-conditions and observables), item 4 (the refusal and
//     the untouched closed `16`), item 5 (the identity), item 6 (`8 → 9` and `21 → 23` and no third count).
//   · `surface.md §2.2` clause 5 — the fifth-position anti-pattern, in the specification's own terms.
//   · `surface.md §2.9` item 1's dated clause — the namespace's operative enumeration, `8 + 1 = 9`.
//   · `surface.md §2.4` item 9 (f)'s dated clause — the member set `4 + 1 = 5`, and the duty `index.d.ts`
//     owes (NOT driven here: `index.d.ts` is the implementer's wall, and this pass reads it nowhere).
//   · `docs/specs/storeroom-js/parameter-semantics.md §2.22` (`PAR-JS-22` — the three positions, every
//     outside value and the ONE answer) and `§2.23` (`PAR-JS-23` — the identity).
//   · `docs/specs/storeroom-publish/distribution.md §2.1` item 6 (the `files` allowlist's FOUR entries, the
//     kernel at `src/constraint-kernel.mjs` package-root-relative) and item 5 (the `LICENSE`-row
//     prohibition, still in force).
//   · `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 1 — the constraint's function, its one
//     argument, and its closed three-arm outcome (`true` | `{repair, message}` | `{message}`), which is what
//     a drive must return to make a constraint REFUSE.
// THIS FILE WRITES NO SOURCE BYTE, STUBS NOTHING, AND EDITS NOTHING UNDER `src/`.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// THE NAMESPACE (`§2.9` item 1's dated clause, `8 + 1 = 9`): the nine declared names · the eight verbs
//   UNMOVED · `settle` still NOT a named export · `findAddress` still unexposed.
// THE MEMBER SET (`§2.4` item 9 (f)'s dated clause, `4 + 1 = 5`): the five own members · the four UNMOVED ·
//   the fifth own and enumerable · its arity `3`.
// THE THREE ARMS (`§2.12` item 3): `'add'` at a pair carrying no constraint → the identity · `'add'` at a
//   SECOND pair → a value distinguishable from the first · `'disable'` over a pair that is ENABLED →
//   `undefined` and a write the constraint would have refused is ACCEPTED and the constraint is not
//   evaluated again · `'enable'` over that same DISABLED pair → `undefined` and the SAME constraint is
//   evaluated again on the next write.
// THE WRITE PATH (`§2.12` item 1; `§2.6`, whose operative law it is): a four-position `write` enters the
//   kernel's `K-2` · the constraint registered for the write's address is evaluated INSIDE the call · the
//   PASSING arm returns the three-member record and delivers the listeners · the FAILING arm reports the
//   failure to the caller, rolls the attempt back, and delivers NO listener of the failing write.
// FAIL-STATES (`§2.12` item 4; `§2.22`'s outside-value cell): the `operation` position — ABSENT ·
//   `undefined` · `null` · a non-string (`number` · `bigint` · `boolean` · `symbol` · a function · an object ·
//   an array) · any other string (`'ADD'` · `'remove'` · `'delete'` · `'set'` · `''`) · the `pair` position —
//   ABSENT · `null` · `undefined` · a non-object · a function · an array · an object whose `address` is
//   ABSENT or outside `§1.5`'s segment array · an object whose `id` is ABSENT or not a `string` · the
//   `instance` position — ABSENT · `null` · `undefined` · a non-object · an object that is not the one
//   `storeCreate` returned (a second instance included). EVERY ONE OF THEM: ONE `TypeError`, NO `status`
//   member, NO code of the store's closed `16`, and NOTHING CHANGED.
// THE ANTI-PATTERN (`§2.2` clause 5): an external supply carrying a `pending` member → ADOPTED, refused by
//   no arity reading, by no named code and by no provenance; an external supply carrying no `pending`
//   member → refused by `§2.4` item 9 (g)'s class test and by nothing else.
// THE ALLOWLIST (`distribution.md §2.1` items 5–6): `files`' FOUR entries, the kernel at
//   `src/constraint-kernel.mjs` · no second `exports` arm and no subpath · no `LICENSE` row.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// FINDINGS THIS FILE COULD NOT DERIVE FROM THE SPEC (each is reported to the supervisor, none invented)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// G1. THE `'add'` ARM'S FUNCTION. `§2.12` item 3 declares that an added constraint "joins the set the
//     kernel evaluates on every subsequent write", and `PAR-JS-22` declares the route's THREE positions
//     (`instance`, `pair`, `operation`) and NO fourth. No clause declares WHERE the function of a pair
//     added through `'add'` comes from: `kernel-surface.md §1` item 5's `K-1 register(store, address, id,
//     constraint)` is the only declared route by which a pair's function reaches the kernel, and its own
//     pair is registered AT that call — so a pair that `'add'` may lawfully take (its pre-condition is
//     "the entry carries no constraint at the pair") has NO declared function supply. THE HALF OF THE
//     `'add'` OBSERVABLE THAT SAYS "the constraint joins the set the kernel evaluates" IS THEREFORE NOT
//     DRIVABLE FROM THE SPEC AS WRITTEN, and this file drives the other half (the identity) alone. The
//     `'enable'`/`'disable'` observables ARE driven, over a pair whose function the kernel's own `K-1`
//     supplied — the one route the corpus declares.
// G2. THE VIOLATED PRE-CONDITION. `§2.12` item 3 prints each arm's pre-condition and NO clause declares
//     the answer when one is violated: `'add'` at a pair that already carries a constraint, `'disable'` at
//     a pair that is already DISABLED, `'enable'` at a pair that is already ENABLED. Those three states
//     are driven NOWHERE by this file, because `§2.12` item 4's refusal is declared for outside values of
//     the THREE POSITIONS only, and `PAR-JS-22`'s answer cell repeats that scope.
// G3. THE FAILING WRITE'S OWN CROSSING FORM. `§2.12` item 1's fail arm says the caller "receives the
//     refusal" and declares NO member set for it, while the corpus carries TWO declared forms — the
//     kernel's `{status, message, log}` over the eight `KC` tokens (`fail-surface.md §1.1`) and the
//     surface's `{status, message}` over the store's closed set (`surface.md §2.5`). WHICH ONE CROSSES AT
//     A FOUR-POSITION `write` WHOSE CONSTRAINT FAILED IS NOT DECLARED, so the cell below asserts only that
//     the failure IS reported and that no listener of the failing write is delivered.
// G4. THE `message` HALF OF THE NEW REFUSAL. `§2.12` item 4 and `PAR-JS-22` declare the refusal as "a
//     `TypeError`, carrying no `status` member and no `message` member of this unit's own". The `status`
//     half is an assertion; the `message` half names a PROVENANCE and not an observable — a `TypeError`
//     minted by the host carries a `message` of its own and none of that string is the surface's — so no
//     cell here asserts anything about it.
// G5. THE FIGURES THE PASS ITSELF PRINTS AND ITS CITATIONS DO NOT AGREE WITH. `§2.9` item 1's dated clause
//     reads "TEN NAMES, NINE OF THEM VERBS" and then enumerates NINE names; and `parameter-semantics.md`
//     `§2.22`/`§2.23` stand at those two `§`-numbers while the same part's `§1` index, its arithmetic clause
//     and the pass's own requirement list point every reader at `§2.24` and `§2.25`, which no heading of that
//     file carries. Both are reported; neither is driven here, and this file derives `9` from `8 + 1 = 9`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  kernel, makeStore, tag, capture, countingListener, STORE_CODES,
} from './constraint-kernel-helpers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);

// THE CLAIMED ENTRY, REACHED AS A CONSUMER REACHES IT — the self-reference through the package's own
// `exports` map (`package.md §3.1` item 2, `DD-24`).
const api = await import('provident-storeroom');

/** The nine names `§2.9` item 1's dated clause enumerates, in the order that clause prints them. */
const NINE = ['storeCreate', 'read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten',
  'manageConstraints'];
/** The eight names the AS-FILED cell prints, which this clause leaves UNMOVED (`§2.9` item 1). */
const EIGHT = NINE.slice(0, 8);
/** `surface.md §2.4` item 9 (f)'s dated clause: `{ register, on, off, settle, manageConstraints }`. */
const FIVE_MEMBERS = ['manageConstraints', 'off', 'on', 'register', 'settle'];

/**
 * THE ONE REFUSAL `§2.12` item 4 DECLARES, read at the two members it names — and the one member it does
 * NOT declare is read for its ABSENCE only (`G4` above: the clause forbids "a `message` member of this
 * unit's own" and names no observable for it, so no assertion is taken on `message`).
 */
function assertNewRefusal(thrown, where) {
  assert.ok(thrown instanceof TypeError,
    `${where}: the refusal is an instance of \`TypeError\` and of nothing else (\`§2.12\` item 4; `
    + `\`PAR-JS-22\`'s declared-answer cell) — read ${thrown && thrown.constructor && thrown.constructor.name}`);
  assert.equal('status' in thrown, false,
    `${where}: and its \`status\` member is ABSENT — this verb MINTS NO CODE (\`§2.12\` item 4)`);
  assert.equal(STORE_CODES.includes(thrown.status), false,
    `${where}: and no code of the store's closed ${STORE_CODES.length} is carried either — the closed set `
    + 'stands UNTOUCHED by this verb (`§2.12` item 4; `contract.md §0.1` item 9)');
}

/** The pair `PAR-JS-22` takes its operation over: `{ address, id }`, `address` inside `§1.5`’s array. */
function pair(label, id) {
  return { address: [tag(label)], id };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §1  THE NINTH NAMED EXPORT AND THE FIFTH OWN MEMBER — `§2.12` item 2
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_a123_ninth_named_export_the_module_namespace_is_the_nine_declared_names', () => {
  // THE ARITHMETIC, AT ITS ONE HOME (`§2.9` item 1's dated clause, 2026-10-16): `8 + 1 = 9`, the `+1` being
  // `manageConstraints`, "and NOT a tenth name of any other kind".
  assert.equal(typeof api.manageConstraints, 'function',
    '`manageConstraints` is the NINTH named export of the claimed ESM entry (`§2.12` item 2; `A123`) — '
    + `read ${typeof api.manageConstraints}`);
  const names = Object.keys(api).sort();
  assert.deepEqual(names, [...NINE].sort(),
    '`§2.9` item 1\'s dated clause: the operative enumeration is the eight verbs plus the one operation '
    + 'route, and `9` is the whole of the namespace');
  assert.equal(names.length, 9, 'the count is NINE (`8 + 1 = 9`)');
  for (const verb of EIGHT) {
    assert.equal(typeof api[verb], 'function', `and \`${verb}\` is UNMOVED in the same namespace`);
  }
  // THE TWO ABSENCES THE SAME ITEM CARRIES, READ SO THE COUNT CANNOT BE SATISFIED BY AN EXTRA NAME:
  // `settle` is reached through `storeCreate`'s own product alone (`§2.4` item 9 (f)'s dated clause), and
  // `findAddress` stays unexposed (`§2.9` item 1 (1) and (3)).
  assert.equal(names.includes('settle'), false, '`settle` is NOT a named export');
  assert.equal(names.includes('findAddress'), false, '`findAddress` is NOT exposed');
});

test('cp_a123_fifth_own_member_the_storecreate_object_carries_five_own_members', () => {
  const inst = makeStore();
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), FIVE_MEMBERS,
    '`§2.4` item 9 (f)\'s dated clause: the operative declared member set is '
    + '`{ register, on, off, settle, manageConstraints }` — FIVE own members, `4 + 1 = 5`');
  for (const [label, name] of [['the construction verb', 'storeCreate'], ['the listener member', 'on'],
    ['the withdrawal', 'off'], ['the ordering seam', 'settle']]) {
    assert.equal(typeof inst[name], 'function', `${label} \`${name}\` is UNMOVED in the same set`);
  }
  assert.equal(typeof inst.manageConstraints, 'function',
    'and the FIFTH own member is the post-creation constraint route (`§2.12` item 2; `A123`)');
  const descriptor = Object.getOwnPropertyDescriptor(inst, 'manageConstraints');
  assert.ok(descriptor !== undefined && descriptor.enumerable === true,
    'and it is an OWN, enumerable property of the factory\'s own product, with the same standing the other '
    + 'four members have');
});

test('cp_a123_the_declared_arity_is_three_positions_instance_pair_operation', () => {
  // `§2.12` item 2's signature block: `manageConstraints(instance, pair, operation)`. **THE DECLARED ARITY
  // GOVERNS OVER ANY SHAPE A READER WOULD DERIVE FROM THE THREE OPERATIONS** — one name carrying three
  // operations and not three names (`PAR-JS-22`'s `alt` cell, refused at both its arms).
  assert.equal(typeof api.manageConstraints, 'function',
    'the ninth export exists before its arity can be read (`§2.12` item 2)');
  assert.equal(api.manageConstraints.length, 3,
    'the declared arity is THREE — `instance`, `pair`, `operation` — and NOT three names and not one');
  const inst = makeStore();
  assert.equal(inst.manageConstraints.length, 3,
    'and the instance\'s own fifth member carries the same declared arity, being one function of the surface');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §2  THE THREE ARMS — `§2.12` item 3
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_arm_add_returns_the_pairs_constraint_identity', () => {
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its `\'add\'` arm can be driven (`§2.12` item 2)');
  const inst = makeStore();
  const one = api.manageConstraints(inst, pair('cp-add-1', 'a1'), 'add');
  assert.notEqual(one, undefined,
    '`\'add\'` returns the pair\'s constraint identity and never `undefined` (`§2.12` item 3, `\'add\'`\'s '
    + 'observable cell; `PAR-JS-23`)');
  const two = api.manageConstraints(inst, pair('cp-add-2', 'a2'), 'add');
  assert.notEqual(two, undefined, 'and a second pair\'s arm returns its own identity');
  // `PAR-JS-23`'s `domain` cell: one opaque value the package owns, "equal to and distinguishable from no
  // other identity by any rule this unit declares beyond the PAIR it was minted at". TWO PAIRS ARE TWO
  // RULES' WORTH OF DISTINCTION, so the two values are not one value. **NOTHING ELSE OF THE IDENTITY IS
  // READ**: `§2.12` item 5 declares no spelling for it, no accessor reaching a member of it, and "a drive
  // compares identities and never contents".
  assert.notEqual(one, two,
    'two identities minted at two pairs are distinguishable (`PAR-JS-23`\'s domain cell)');
  assert.equal(Object.getOwnPropertyNames(inst).sort().join(), FIVE_MEMBERS.join(),
    'and the two arms changed no member of the instance (`§2.12` item 5: the identity is not `cfg.constraints`)');
});

test('cp_arm_disable_returns_undefined_and_a_write_the_disabled_constraint_would_have_refused_is_accepted', async () => {
  const { register } = await kernel();
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its `\'disable\'` arm can be driven (`§2.12` item 2)');
  const inst = makeStore();
  const address = [tag('cp-disable')];
  const thePair = { address, id: 'd1' };
  let runs = 0;
  // THE FUNCTION SUPPLY IS THE KERNEL'S OWN DECLARED ROUTE (`kernel-surface.md §1` item 5's `K-1`), which is
  // the only route any clause declares — the gap this file reports as `G1` is the `\'add\'` arm's own.
  register(inst, address, thePair.id, () => {
    runs += 1;
    // `kernel-surface.md §2.3` item 1's UNREPAIRABLE-VIOLATION arm: `{ message }`.
    return { message: 'this landing is refused while the constraint stands ENABLED' };
  });
  const before = capture(() => api.write(inst, address, 'mem', 1));
  assert.equal(before.threw, true,
    'PREMISE: the registered constraint stands ENABLED and refuses the write (`§2.12` item 3)');
  const at = runs;
  assert.equal(api.manageConstraints(inst, thePair, 'disable'), undefined,
    '`\'disable\'` returns `undefined` (`§2.12` item 3, `\'disable\'`\'s observable cell)');
  const after = capture(() => api.write(inst, address, 'mem', 2));
  assert.equal(after.threw, false,
    'AND A WRITE THE DISABLED CONSTRAINT WOULD HAVE REFUSED IS ACCEPTED — the same landing, the same '
    + 'address, the constraint standing in the set and NOT evaluated (`§2.12` item 3)');
  assert.deepEqual(Object.keys(after.value ?? {}).sort(), ['op', 'triggered', 'watched'],
    'and the accepted write is the declared three-member record (`§2.2`\'s signature block)');
  assert.equal(runs, at,
    'and the constraint is NOT evaluated on that subsequent write — the body did not run again');
});

test('cp_arm_enable_returns_undefined_and_the_same_constraint_is_evaluated_again', async () => {
  const { register } = await kernel();
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its `\'enable\'` arm can be driven (`§2.12` item 2)');
  const inst = makeStore();
  const address = [tag('cp-enable')];
  const thePair = { address, id: 'e1' };
  let runs = 0;
  register(inst, address, thePair.id, () => {
    runs += 1;
    return { message: 'this landing is refused while the constraint stands ENABLED' };
  });
  api.manageConstraints(inst, thePair, 'disable');
  const parked = capture(() => api.write(inst, address, 'mem', 1));
  assert.equal(parked.threw, false, 'PREMISE: the disabled constraint does not refuse the write');
  const at = runs;
  assert.equal(api.manageConstraints(inst, thePair, 'enable'), undefined,
    '`\'enable\'` returns `undefined` (`§2.12` item 3, `\'enable\'`\'s observable cell)');
  const again = capture(() => api.write(inst, address, 'mem', 2));
  assert.equal(again.threw, true,
    'AND THE CONSTRAINT IS EVALUATED AGAIN ON THE NEXT WRITE (`§2.12` item 3)');
  assert.equal(runs, at + 1,
    'and IT IS THE CONSTRAINT THAT WAS DISABLED AND NOT A SECOND CONSTRAINT: ONE body runs, the one that '
    + 'was disabled and is now enabled again (`§2.12` item 3)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE WRITE PATH — `§2.12` item 1, the operative law of `§2.6`: THE ENGINE IS BEHIND THE SURFACE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_write_path_a_four_position_write_enters_the_kernel_and_a_refusing_constraint_reaches_the_caller', async () => {
  const { register } = await kernel();
  const inst = makeStore();
  const address = [tag('cp-engine-fail')];
  let runs = 0;
  let argc = null;
  register(inst, address, 'r1', function constraint(context) {
    runs += 1;
    argc = arguments.length;
    return { message: 'the constraint refuses this landing' };
  });
  const listener = countingListener();
  inst.on(address, listener);

  // `§2.12` item 1, STAGE 1: *"A `write` CALLED WITH FOUR POSITIONS — `write(instance, address, tier,
  // value)` — ENTERS THE KERNEL'S `K-2`"*, and stage 3: the kernel evaluates the constraint set against
  // the store's own result. **THE EVALUATION IS INSIDE THE CALL** — the sentence the pass supersedes,
  // *"evaluate constraints AFTER a `write` returns"*, is FALSIFIED BY ITEM 1 BY NAME.
  const r = capture(() => api.write(inst, address, 'mem', 7));
  assert.equal(runs >= 1, true,
    'the four-position write ENTERS the kernel: the constraint registered for this write\'s address was '
    + 'EVALUATED INSIDE THE CALL (`§2.12` item 1; `§2.6`\'s operative law) — it ran ' + runs + ' time(s)');
  assert.equal(argc, 1,
    'and it was invoked with ONE argument, the attempt context (`kernel-surface.md §2.3` item 1)');
  // `§2.12` item 1's FAIL ARM: *"`Kernel → rollback over the Rust store → report failure to the package
  // surface's caller`"*. **THE FORM THAT CROSSES IS NOT DECLARED — see this file's finding `G3` — so this
  // cell asserts THAT the failure is reported and nothing about the members of the value that carries it.
  assert.equal(r.threw, true,
    'the constraint refused the write on its FIRST evaluation, so the caller receives the refusal and no '
    + 'three-member record (`§2.12` item 1\'s fail arm)');
  // `§2.7` item 7 (d), cited by that same item: the listeners of the FAILING write are NOT delivered.
  assert.equal(listener.seen.length, 0,
    'and the failing write\'s listeners are NOT delivered (`§2.7` item 7 (d); `§2.12` item 1)');
  // THE ROLLBACK'S OWN OBSERVABLE, DRIVEN AT THE WEAKEST READING THE FAIL ARM SUPPORTS: the write DOES NOT
  // STAND. **NO CLAUSE SPELLS THE READ-BACK, AND `§2.12` item 3\'s `\'add\'` cell orders the refusal
  // "before item 1's stage 2's store leg is taken" WHILE ITEM 1 ORDERS THE PASS AFTER STAGE 2 — the two
  // orderings are not separable at this boundary, so BOTH are satisfied by this one assertion.**
  const back = capture(() => api.read(inst, address, 'mem'));
  assert.ok(back.threw === true || back.value !== 7,
    'the refused write does not stand: the address does not answer the value the write carried');
});

test('cp_write_path_the_passing_arm_returns_the_three_member_record_and_delivers_the_listeners', async () => {
  const { register } = await kernel();
  const inst = makeStore();
  const address = [tag('cp-engine-pass')];
  let runs = 0;
  register(inst, address, 'p1', () => {
    runs += 1;
    // `kernel-surface.md §2.3` item 1's PASS arm — `true` is "the ONLY pass value".
    return true;
  });
  const listener = countingListener();
  inst.on(address, listener);
  const r = capture(() => api.write(inst, address, 'mem', 5));
  assert.equal(runs >= 1, true,
    'the constraint was evaluated inside the call and PASSED — the engine is behind the surface on the '
    + 'passing arm too, and transparent on it (`§2.12` item 1\'s first success arm)');
  assert.equal(r.threw, false, 'so the write proceeds');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'and the caller receives the write\'s three-member record (`§2.2`\'s signature block)');
  assert.equal(listener.seen.length, 1,
    'and `Kernel → listeners → report success to the caller` is the declared ORDER of the passing arm: the '
    + 'listener of the write\'s own address was delivered (`§2.12` item 1; `§2.7` item 2)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §4  THE FIFTH-POSITION ANTI-PATTERN — `§2.2` clause 5, landed 2026-10-16 on `A125`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_anti_pattern_an_external_supply_carrying_no_pending_is_refused_by_the_class_test', () => {
  const inst = makeStore();
  const address = [tag('cp-ap-refused')];
  // THE CLASS TEST, AT ITS OWN WORDS: "an object position is a record position only where it CARRIES A
  // `pending` MEMBER whose value is present and not `undefined`" (`§2.4` item 9 (g) item 1).
  for (const [where, supply] of [
    ['the empty object', {}],
    ['an object whose `pending` member is ABSENT', { op: 1 }],
    ['an object whose `pending` member is `undefined`', { pending: undefined }],
    ['a non-object scalar', 7],
    ['an array', []],
    ['a function', () => {}],
  ]) {
    const r = capture(() => api.write(inst, address, 'mem', 1, supply));
    assert.equal(r.threw, true, `${where} is refused: it is not a record position (\`§2.20\`'s outside row)`);
    assert.ok(r.thrown instanceof TypeError,
      `${where}: refused by the position's OWN class test — ONE class, \`TypeError\` (\`§2.4\` item 9 (b); `
      + '`§2.2` clause 5 item 3)');
    assert.equal('status' in r.thrown, false,
      `${where}: and \`status\` is ABSENT — the position mints no code, being a CLASS TEST and not an `
      + 'identity test (`§2.2` clause 5: \"IS NOT REFUSED BY A NAMED CODE\")');
  }
  // AND THE REFUSED SHAPES LEFT NO LANDING — the write does not proceed (`§2.20`'s answer cell).
  const back = capture(() => api.read(inst, address, 'mem'));
  assert.ok(back.threw === true || back.value !== 1,
    'a refused position stops the write: no store call was reached and no value landed');
});

test('cp_anti_pattern_an_external_supply_carrying_pending_is_adopted_and_refused_by_nothing', () => {
  const inst = makeStore();
  const address = [tag('cp-ap-adopted')];
  // `§2.2` clause 5, ITEM 3: "AN EXTERNAL SUPPLY IS NOT REFUSED BY ARITY, IS NOT REFUSED BY A NAMED CODE,
  // AND IS NOT DETECTED BY A TEST THIS UNIT DECLARES ... WHILE ONE THAT DOES CARRY a `pending` member is
  // ADOPTED at its first call by `§2.4` item 9 (g)'s own admission". **THIS IS THE ANTI-PATTERN'S DECLARED
  // CONSEQUENCE, DRIVEN AS THE NON-REFUSAL IT IS: the position is legal, the write proceeds, and no code
  // is minted for the case.** The clause declares no third arm and mints no code for it.
  const r = capture(() => api.write(inst, address, 'mem', 3, { pending: [] }));
  assert.equal(r.threw, false,
    'a caller-authored object carrying a `pending` member is NOT refused — by no arity reading, by no '
    + 'provenance and by no named code (`§2.2` clause 5 item 3; `A125`)');
  assert.deepEqual(Object.keys(r.value).sort(), ['op', 'triggered', 'watched'],
    'and the write answers the declared three-member record, so the anti-pattern is a SUPPORTED SHAPE of '
    + 'the call and an UNSUPPORTED use of it — never a throw and never a silent degradation');
  assert.equal(STORE_CODES.includes(r.value?.op?.status), false,
    'and no store code is minted for the anti-pattern\'s own case (`§2.2` clause 5 item 3)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §5  THE THREE POSITIONS' OUTSIDE VALUES — `§2.12` item 4; `PAR-JS-22`'s declared-answer cell
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_fail_outside_operation_is_one_typeerror_and_changes_nothing', () => {
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its refusals can be read (`§2.12` item 2)');
  const inst = makeStore();
  const thePair = pair('cp-op', 'o1');
  const OUTSIDE = [
    ['a number', 1], ['a bigint', 1n], ['a boolean', true], ['a symbol', Symbol('add')],
    ['a function', () => {}], ['an object', {}], ['an array', []],
    ["the string 'ADD'", 'ADD'], ["the string 'remove'", 'remove'], ["the string 'delete'", 'delete'],
    ["the string 'set'", 'set'], ['the empty string', ''],
  ];
  for (const [where, value] of OUTSIDE) {
    const r = capture(() => api.manageConstraints(inst, thePair, value));
    assert.equal(r.threw, true, `\`operation\` = ${where} is OUTSIDE the three-member domain (\`§2.12\` item 1)`);
    assertNewRefusal(r.thrown, `\`operation\` = ${where}`);
  }
  // THE ABSENT POSITION AND THE SUPPLIED `undefined` ARE BOTH OUTSIDE IT: "every non-string and the ABSENT
  // position are OUTSIDE it" (`§2.12` item 1).
  assertNewRefusal(capture(() => api.manageConstraints(inst, thePair)).thrown, '`operation` ABSENT');
  assertNewRefusal(capture(() => api.manageConstraints(inst, thePair, undefined)).thrown,
    '`operation` = `undefined`');
  assertNewRefusal(capture(() => api.manageConstraints(inst, thePair, null)).thrown, '`operation` = `null`');
  // NOTHING IS ADDED, ENABLED, DISABLED OR OTHERWISE CHANGED (`§2.12` item 4; `PAR-JS-22`'s answer cell).
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), FIVE_MEMBERS,
    'every one of those refusals left the instance at its five declared members and changed nothing');
  assert.equal(Object.keys(api).length, 9,
    'and left the module namespace at its nine declared names, so no refusal minted a name');
});

test('cp_fail_outside_pair_is_one_typeerror_and_changes_nothing', () => {
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its refusals can be read (`§2.12` item 2)');
  const inst = makeStore();
  const segment = [tag('cp-pair-domain')];
  const OUTSIDE = [
    ['`null`', null], ['`undefined`', undefined], ['a number', 42], ['a string', 'pair'],
    ['a boolean', false], ['a function', () => {}], ['an array', [segment, 'p1']],
    ['an object with no `address`', { id: 'p1' }],
    ['an object whose `address` is not a segment array', { address: 'cp-pair-domain', id: 'p1' }],
    ['an object whose `address` is absent', { id: 'p1' }],
    ['an object whose `id` is absent', { address: segment }],
    ['an object whose `id` is not a string', { address: segment, id: 7 }],
  ];
  for (const [where, value] of OUTSIDE) {
    const r = capture(() => api.manageConstraints(inst, value, 'add'));
    assert.equal(r.threw, true, `\`pair\` = ${where} is OUTSIDE the pair's domain (\`PAR-JS-22\`)`);
    assertNewRefusal(r.thrown, `\`pair\` = ${where}`);
  }
  assertNewRefusal(capture(() => api.manageConstraints(inst, undefined, 'add')).thrown, '`pair` = `undefined`');
  assertNewRefusal(capture(() => api.manageConstraints(inst)).thrown,
    '`pair` and `operation` both ABSENT — one answer, the same for every one of them');
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), FIVE_MEMBERS,
    'and nothing was added, enabled, disabled or otherwise changed');
});

test('cp_fail_outside_instance_is_one_typeerror_and_changes_nothing', () => {
  assert.equal(typeof api.manageConstraints, 'function',
    'the route exists before its refusals can be read (`§2.12` item 2)');
  const inst = makeStore();
  const other = makeStore();
  const thePair = pair('cp-inst', 'i1');
  const OUTSIDE = [
    ['`null`', null], ['`undefined`', undefined], ['a number', 1], ['a string', 'instance'],
    ['a boolean', true], ['a function', () => {}], ['the pair itself', thePair],
    ['an object that is not the one `storeCreate` returned', {}],
    ['ANOTHER instance', other],
  ];
  for (const [where, value] of OUTSIDE) {
    const r = capture(() => api.manageConstraints(value, thePair, 'add'));
    assert.equal(r.threw, true, `\`instance\` = ${where} is OUTSIDE the position's domain (\`PAR-JS-22\`)`);
    assertNewRefusal(r.thrown, `\`instance\` = ${where}`);
  }
  // THE ABSENT POSITION: three positions declared, fewer supplied — the shifted call shape is refused too.
  assertNewRefusal(capture(() => api.manageConstraints(thePair, 'add')).thrown, '`instance` ABSENT');
  assertNewRefusal(capture(() => api.manageConstraints()).thrown, 'all three positions ABSENT');
  assert.deepEqual(Object.getOwnPropertyNames(inst).sort(), FIVE_MEMBERS,
    'and the refusals on a foreign instance changed nothing of this one');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §6  THE ALLOWLIST — `distribution.md §2.1` item 6 (landed 2026-10-16) and item 5 (in force)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('cp_allowlist_the_main_packages_files_array_is_the_four_declared_entries', () => {
  const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
  // `§2.1` item 6: "THE CONSTRAINT KERNEL'S OWN MODULE IS THE MAIN PACKAGE'S `files` ALLOWLIST's FOURTH
  // ENTRY, AND THE SAME FOUR ENTRIES ARE THE WHOLE OF WHAT THE TARBALL SHIPS" — the entry STATED BY PATH as
  // `src/constraint-kernel.mjs` RELATIVE TO THE MAIN PACKAGE'S ROOT, which is `bindings/js/`.
  assert.deepEqual([...(manifest.files ?? [])].sort(),
    ['README.md', 'index.d.ts', 'index.mjs', 'src/constraint-kernel.mjs'],
    '`§2.1` item 6: the allowlist is FOUR entries — `index.mjs` · `README.md` · `index.d.ts` · the kernel\'s '
    + 'own module — and the fourth is the kernel\'s, so the kernel\'s FILE TRAVELS with the surface that '
    + 'drives it (`A122`). Read ' + JSON.stringify(manifest.files));
  assert.equal((manifest.files ?? []).includes('LICENSE'), false,
    '`§2.1` item 5, STILL IN FORCE: a `LICENSE` row added to this array is a FINDING, the copy being the '
    + 'release assembly step\'s and not the allowlist\'s');
  assert.ok(!(manifest.files ?? []).some((f) => f.endsWith('.node')),
    '`§2.1` item 2 stands UNMOVED: no binary ships at any key on any target');
});

test('cp_allowlist_the_kernel_travels_in_files_and_is_no_second_exports_arm', () => {
  const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
  // THE ONE PATH, SPELLED THE TWO WAYS THE TWO HOMES SPELL IT (`§2.1` item 6's first bullet;
  // `kernel-surface.md §1` item 1's one checkout home).
  assert.ok(existsSync(join(PACKAGE_DIR, 'src', 'constraint-kernel.mjs')),
    'the entry the allowlist names resolves, package-root-relative, to `bindings/js/src/constraint-kernel.mjs` '
    + '— the constraints unit\'s own module and no other path');
  // `A122`: "IT IS NOT A SEPARATELY REACHABLE EXPORT: the `exports` arm set is UNMOVED, the subpath shape is
  // REFUSED BY NAME, and the kernel\'s five items stay INTERNAL ORCHESTRATION STAGES that no consumer verb
  // exposes" (`§2.1` item 6's second bullet).
  const exports_ = manifest.exports ?? {};
  assert.deepEqual(Object.keys(exports_), ['.'],
    'the `exports` map publishes EXACTLY ONE entry and `A122` adds NO second arm');
  for (const spelling of ['./src/constraint-kernel.mjs', './kernel', './constraint-kernel']) {
    assert.equal(exports_[spelling], undefined,
      `the subpath shape \`${spelling}\` is REFUSED BY NAME — the kernel is BEHIND the surface, not beside it`);
  }
  assert.deepEqual(Object.keys(exports_['.'] ?? {}), ['import'],
    'and the one arms-bearing arm is the ESM one, unmoved (`DD-24`)');
});
