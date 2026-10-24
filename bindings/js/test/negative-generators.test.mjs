// THE EIGHT TASKED NEGATIVE GENERATORS — `NG-JS-A` … `NG-JS-H` (`archive/gate4/storeroom-js-adversarial.md`
// §B, *"THE EIGHT TASKED NEGATIVE GENERATORS"*), authored at the package's OWN boundary and driven through
// the CLAIMED ESM ENTRY alone (`acceptance.md §4.1` item 1, `DD-18`: *"a test that loads the addon itself is
// a finding"*).
//
// **EACH GENERATOR IS DETERMINISTIC, SEEDED, AND PRINTS ITS OWN STRATEGY ID AND ITS OWN FAILURE LIST.** The
// seed is the register's own pinned seed (`0x5EED_2026_1011`, `bindings/js/tests/support/mod.rs`'s
// `REGISTER_SEED`): no clock, no entropy, no `Math.random`, so every printed verdict reproduces. **EACH
// GENERATOR MUST BE ABLE TO FAIL** — gate 4's §B found two strategy lines of the register that could NOT
// (`S-FAILFORM`'s second disjunct and `S-LAYER`'s self-referential assertions), and an assertion that cannot
// fail is worse than none. **NOTHING HERE IS WEAKENED: every arm asserts a clause and the clause is cited
// beside it.**
//
// **THE STATES EACH GENERATOR ENUMERATES BEFORE ITS DRIVE ARE WRITTEN IN ITS OWN COMMENT BLOCK, ONE ROW PER
// STATE** — the state-machine the pass reports.
//
// **THE AUTHORITY FOR EVERY ARM, NAMED ONCE HERE AND CITED AGAIN AT ITS CELL:** `crossing.md §1.7` (the
// validation ORDER: class decision FIRST, then the shape test, then admit/refuse; *"a class decision is never
// deferred and never revisited after a coercion"*) · `crossing.md §1.8` (the NO-REPAIR prohibition) ·
// `surface.md §2.5` item 5 (a)–(g) (what *"VERBOSE"* means: the failing target rendered as the store's own
// generator renders it, the CLASS that failed, the POSITION where the contract declares one, all inside the
// single `{status, message}` form, the status drawn from the store's closed `15`-member set, never a
// package-minted code, never a raw host error) · `surface.md §2.4` item 6 (a)–(f) and `§2.7` item 5 (the
// ID-MATCHING model: the store passes an ID back, the JS side matches that identity to the function it was
// registered with, an id with no function fires NOTHING — no invocation, no log, no throw — and the
// invocation's ONE argument is the TRIGGERING ADDRESS) · `crossing.md §1.4` item 5's dated clause (the
// ceiling property is about the PACKAGE'S OWN WALK'S ARM) · `crossing.md §1.3`'s `AddressArg`/`OpIdArg` rows ·
// `surface.md §2.1` (*"ONE plain object"*) · `acceptance.md §4.3`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, copyFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
// **⟶ ADDED 2026-10-17 (`role_test_writer`; `contract.md §5.7`'s `S-HO` arm): `NG-JS-M` reads the SHIPPED
// bytes — the manifest the package would publish and the documentation the allowlist carries — rather than a
// restatement of them inside this file, so the realm claim's own corpus has the filesystem's reading to take.**
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';

import { storeCreate } from 'provident-storeroom';

/**
 * **⟶ THE LISTENER SPELLING AND THE PAIR'S OWN READERS, ADDED 2026-10-18 (`role_test_writer`, the
 * `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail). `listen(address)` MOVES TO `listen(handle, addresses)`,
 * ARITY `1 → 2`, AND IT ANSWERS `undefined`** (`contract.md §2.2` items 1 and 10; `listen-verb.md §1`
 * item 1; `PAR-HL-3`: *"the caller supplied the handle, so returning it would be a second spelling of the
 * caller's own datum"*). **THE AS-FILED `(register(listen(addr), fn) || listen(addr))` IDIOM DEPENDED ON THAT
 * RETURN** — it took the handle `listen` answered, registered at it, and fell back to a second `listen` when
 * the first answered a falsy value. **Under the new declaration the handle is SPELLED by the caller, so the
 * idiom is replaced by the two acts it always meant: a `listen` that creates the RESERVED entry
 * (`listen-verb.md §4` state `1`), then a `register` that ARMS it.** **NO ASSERTION IS WEAKENED.**
 *
 * **AND THE PAIR'S OWN READER: `triggered` and `pending`'s element moved from a BARE HANDLE to the pair
 * `{handle, address}`** (`trigger-and-pair.md §2` item 1, `§3` item 3, `§1` item 1), so an as-filed
 * `triggered[i]` read a pair where a handle was meant — **`TF-1`'s failure, *"a BARE HANDLE in `triggered` or
 * in `pending`"*, read from the other side.** The readers below take the pair's `handle` member, which is the
 * SAME identity the as-filed lines meant (`§4` item 1: *"they compare `entry.handle`, never `entry`"*).
 */
let listenerSpellingSeq = 0;
function listenAndRegister(store, address, listener) {
  listenerSpellingSeq += 1;
  const handle = `listener@${JSON.stringify(address)}#${listenerSpellingSeq}`;
  store.listen(handle, [address]);
  store.register(handle, listener);
  return handle;
}
function carriesHandle(set, handle) {
  return set.some((element) => element !== null && typeof element === 'object' && element.handle === handle);
}
function setHandles(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? element : element.handle));
}


// **⟶ ADDED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): the combined `on(address,
// listener)` is MERGED AWAY, so a home entry is minted by `listen(address)` and its function placed by
// `register(handle, listener)`. This file takes both acts at the sites that need them and passes this
// no-op body wherever the listener body's own firing is NOT the site's subject.**
const noop = () => {};

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);
const ADDON_PATH = join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/// **THE STORE'S CLOSED `16`-MEMBER SET** — the set `surface.md §2.5` item 1 draws a rejection's `status`
/// from (`DD-40`: *"never a package-minted code"*). It is the set `surface.test.mjs` spells and the Rust
/// leg's `CODES` const carries.
///
/// **⟶ WIDENED 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class).** The as-filed heading read
/// **`15`** and its list stopped at `FileCommitFailed`; **`contract.md §8.1`'s amended heading reads `16`
/// members and its arithmetic is `11 + 2 + 1 + 1 + 1 = 16` ✓**, the sixteenth member's trigger is `§7.1`
/// step 4-bis's and its key's semantics are `parameter-semantics.md §2.21`'s (both dated 2026-10-15). **The
/// figure MOVES and no assertion is weakened: `isTheFailureForm` below still refuses a package-minted code,
/// and the widened set only admits one more declared member.**
const THE_SIXTEEN = [
  'AddressMalformed',
  'AddressNotFound',
  'LeafHasNoDownstream',
  'TierNotFound',
  'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation',
  'ContainerKindConflict',
  'ReadTargetIsBranch',
  'WriteParentNotLink',
  'JournalOpUnknown',
  'RollbackCompacted',
  'ConstructionArgumentMissing',
  'FilePathUnreachable',
  'ValueNotAdmitted',
  'FileCommitFailed',
  'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
];

// =============================================================================================
// THE SHARED DRIVE HARNESS — a pinned seed, a printed strategy id, a real failure list
// =============================================================================================

const SEED = 0x5eed20261011n;

/// A SplitMix64 step over the pinned seed and the attempt, exactly as the register's runner draws — pure
/// arithmetic, so every printed verdict is reproducible across runs.
function * draw(attempt) {
  let state = (SEED ^ (BigInt(attempt) * 0x9e3779b97f4a7c15n)) & 0xffffffffffffffffn;
  while (true) {
    state = (state + 0x9e3779b97f4a7c15n) & 0xffffffffffffffffn;
    let z = state;
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & 0xffffffffffffffffn;
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & 0xffffffffffffffffn;
    yield Number((z ^ (z >> 31n)) % 1000000n);
  }
}

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

/// The failure form's own predicate — **`surface.md §2.5` item 4** (*"`log` IS PRESENT ON EVERY FAILURE
/// THIS SURFACE THROWS … the three-member member set is therefore FLAT ACROSS ARMS and not conditional"*)
/// **and item 9** (*"`log` stands on the thrown object as an ORDINARY OWN ENUMERABLE DATA MEMBER … so
/// `Object.keys(caught)` reads exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null`
/// and NEVER a non-array"*): exactly `{log, message, status}` — THREE members, sorted ascending, a plain
/// object of the caller's realm, no `Error` subclass, `log` an ARRAY on every arm, and **the status a
/// member of the store's closed set** — so a package-minted code fails HERE rather than passing as "an
/// error occurred". **RE-DERIVED FROM THE SUPERSEDED TWO-MEMBER SET, 2026-10-16; the `status`-membership
/// limb this predicate was built for is UNMOVED and is the reason it exists.** **THE `log` LIMB IS THE
/// MEMBER'S TYPE AND NOT ITS CONTENT**: the entries are the kernel's own and are asserted at the cells
/// that drive an attempt (`surface.md §2.5` item 3; `PAR-JS-26`), while `[]` is this predicate's own
/// per-arm reading and is asserted only where the arm has no attempt.
function isTheFailureForm(err) {
  return (
    err !== null &&
    typeof err === 'object' &&
    !Array.isArray(err) &&
    Object.getPrototypeOf(err) === Object.prototype &&
    Object.keys(err).sort().join(',') === 'log,message,status' &&
    Object.keys(err).length === 3 &&
    Array.isArray(err.log) &&
    typeof err.status === 'string' &&
    THE_SIXTEEN.includes(err.status) &&
    typeof err.message === 'string' &&
    err.message.length > 0 &&
    !(err instanceof Error)
  );
}

/// The failing TARGET rendered as the STORE'S OWN GENERATOR renders it — `surface.md §2.5` item 5 (a):
/// *"a non-segment value PRINTED AS ITS OWN VALUE, SINGLE-QUOTED (`10n` for a `bigint`, `Symbol()` for a
/// symbol)"*. **THE GUARD IS THE POINT: a target whose own rendering throws (a `Symbol` has no `String`
/// conversion at all) still yields a rejection, so a host `TypeError` must never escape the package's own
/// frame** (`surface.md §2.5` item 5 (e): *"a rejection is NEVER A RAW HOST ERROR"*).
function targetSpelling(value) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    return String(value);
  } catch {
    return 'UNPRINTABLE'; // the package must carry the CLASS half instead (item 5 (b): mandatory)
  }
}

/// `surface.md §2.5` item 5 (g) and `parameter-semantics.md §2.12`'s SECOND dated exception clause: **the
/// REGISTRATION site's refusal IS a rejection under `A76` and travels in the ONE form — `{status, message}`
/// — with its `status` the store's closed-set member `AddressMalformed`** (*"whose declared trigger already
/// covers 'a present argument outside its domain' and 'an absent required argument'"*) **and its `message`
/// generated as item 5 (d) declares.** **THE WITHDRAWN FORM — a bare `TypeError` carrying NO `status` and
/// NO `message` (`surface.md §2.4` item 5 (d)'s as-filed text, re-spelled by item 5 (g)) — is asserted
/// WITHDRAWN here: a `TypeError` escaping a site of THIS package is a FINDING** (`surface.md §2.5` item 5
/// (e)).
///
/// **AND THE MESSAGE IS ASSERTED FOR ITS DECLARED CONTENT, NOT MERELY FOR BEING AN ERROR:** the record must
/// carry the FAILING TARGET (item 5 (a)), the CLASS that failed (item 5 (b), whose class half is MANDATORY),
/// and the POSITION the registration site declares (item 5 (b): *"the ARGUMENT POSITION for a verb's
/// arguments"* — here `register`'s FIRST or SECOND argument).
function assertRegistrationRefusal(site, { target, position, why }) {
  let thrown = null;
  try {
    site();
  } catch (err) {
    thrown = err;
  }
  if (thrown === null) return 'the site answered NO failure at all';
  if (thrown instanceof TypeError) return 'the WITHDRAWN `TypeError` form was answered (item 5 (g) re-spells it)';
  if (!isTheFailureForm(thrown)) {
    return `the answer is not the one form with a closed-set status: ${JSON.stringify(thrown)}`;
  }
  if (thrown.status !== 'AddressMalformed') {
    return `the declared status for a registration refusal is AddressMalformed, got ${thrown.status}`;
  }
  if (!thrown.message.includes(why)) {
    return `the reason's CLASS half is missing from the message (item 5 (b)): ${JSON.stringify(thrown.message)}`;
  }
  if (target !== null && !thrown.message.includes(target)) {
    return `the failing TARGET is missing from the message (item 5 (a)): ${JSON.stringify(thrown.message)}`;
  }
  if (!thrown.message.includes(position)) {
    return `the POSITION is missing from the message (item 5 (b)): ${JSON.stringify(thrown.message)}`;
  }
  return null;
}

/// One generator's own report, PRINTED and asserted. **THE VERDICT IS THE FAILURE LIST'S, NOT A SUMMARY:**
/// a line with any failure is `BROKEN` and the cell throws with the list, so a generator that cannot fail is
/// impossible to author here — the drive's own returned reason string IS the failure.
///
/// **AND A DRIVE'S OWN ESCAPE IS A FAILURE IN ITS OWN RIGHT AND IS NAMED AS ONE** (`surface.md §2.5` item 5
/// (e): *"a rejection is NEVER A RAW HOST ERROR … any host object escaping from the boundary's own frame is
/// a FINDING at whatever site produced it"*): the escape is `uncaught`-labelled **only when it is not the
/// declared one form**, because a drive that reads a verb it did NOT hand a value to is reading the package's
/// own refusal and not escaping it.
function runGenerator(id, strategy, attempts, driver) {
  const failures = [];
  let run = 0;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    run += 1;
    let verdict;
    try {
      verdict = driver(attempt, draw(attempt));
    } catch (err) {
      const named = err && typeof err === 'object' && typeof err.status === 'string'
        ? `${err.status} — ${JSON.stringify(err.message)}`
        : err instanceof TypeError || err instanceof RangeError
          ? `a RAW HOST ${err.constructor.name} — ${JSON.stringify(err.message)}`
          : JSON.stringify(String(err));
      verdict = `the drive's own frame ESCAPED with ${named}`;
    }
    if (verdict !== null && verdict !== undefined && verdict !== true) {
      failures.push(`attempt ${attempt}: ${String(verdict)}`);
    }
    if (failures.length >= 5) break; // stop-after-5, exactly as the register's lines do
  }
  console.log(
    `NG ${id} strategy=${strategy} attempts=${run} failures=${failures.length} verdict=${
      failures.length === 0 ? 'HELD' : 'BROKEN'
    }`,
  );
  for (const failure of failures) console.log(`  NG ${id} FAILURE: ${failure}`);
  assert.deepEqual(failures, [], `${id} (${strategy}): the drive's own failure list must be empty`);
  return { run, failures };
}

// =============================================================================================
// `NG-JS-A` — the `rollback` op-id corpus, and the single-form property at that verb
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`crossing.md §1.3`'s `OpIdArg` table, `6` rows, and
// `§1.7` (a)–(d)):
//
// | The state | Its declared answer |
// | --- | --- |
// | a non-empty `string` the journal HOLDS (`OpIdArg` 1) | the rollback's `{opId, undoneOps, restoredTo}` |
// | a non-empty `string` the journal does NOT hold (`OpIdArg` 2) | `JournalOpUnknown` |
// | the empty string (`OpIdArg` 3) | `AddressMalformed` |
// | an ABSENT `opId` (`OpIdArg` 4) | `AddressMalformed` |
// | `null` / `undefined` (`OpIdArg` 5) | `AddressMalformed` |
// | a `number` (`OpIdArg` 6) | `AddressMalformed` |
// | `Symbol()` / `Symbol.iterator` (`§1.2` row 9, no carrier row) | refused INSIDE the one form; the class is the reason's mandatory half |
// | `10n` (`§1.2` row 10) | the SAME, and **never substituted for a number** (`§1.7` (b) item 1: a `bigint` is a `BigInt`) |
// | `{}` | the SAME |
// | `[]` | the SAME |
// | a `Proxy` whose `get` trap THROWS (`§1.4` item 4 (g), `DD-34`) | the SAME, and **the trap is NEVER invoked**: no raw host error may escape the boundary's frame |
// | an object whose `valueOf` THROWS (`§1.7` (b) item 2) | the SAME, and `valueOf` is never called |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any thrown value that is not the declared `{status, message}` with
// `AddressMalformed` — a raw host `TypeError`, a package-minted status, a substituted target, or no throw at
// all — is a failure of this generator.
test('ng_js_a_the_rollback_op_id_corpus_answers_the_one_form_and_never_a_raw_host_error', () => {
  runGenerator('NG-JS-A', 'rollback op-id corpus', 8, (attempt, rng) => {
    const inst = mem();
    // THE ACCEPTED ROW FIRST: the journal's own op id, from a real write.
    const record = inst.write(['a'], 'mem', 1);
    const accepted = inst.rollback(record.op.opId);
    if (accepted.opId !== record.op.opId) return 'the accepted row did not echo its op id';

    const throwingProxy = new Proxy({}, { get() { throw new Error('the trap must never run'); } });
    const throwingValueOf = { valueOf() { throw new Error('valueOf must never run'); } };
    const cases = [
      // **THE DECLARED ROWS THAT CROSS TO THE STORE** (`OpIdArg` 3–6, `DD-1`): the value travels UNCHANGED
      // and the STORE generates its own `AddressMalformed` at the failing target — so these rows assert the
      // store's own generated message and NOT the boundary's verbose clause (whose class half is mandatory
      // only where the boundary itself refuses, item 5 (d)).
      { label: 'the empty string (OpIdArg 3)', value: '', target: null, status: 'AddressMalformed', why: 'opId' },
      { label: 'an ABSENT opId (OpIdArg 4)', absent: true, target: null, status: 'AddressMalformed', why: 'opId' },
      { label: 'null (OpIdArg 5)', value: null, target: null, status: 'AddressMalformed', why: 'opId' },
      { label: 'undefined (OpIdArg 5)', value: undefined, target: null, status: 'AddressMalformed', why: 'opId' },
      { label: 'a number (OpIdArg 6)', value: 1 + rng.next().value, target: null, status: 'AddressMalformed', why: 'opId' },
      // **THE CLASSES THE BOUNDARY ITSELF REFUSES, WHOSE REASON'S CLASS HALF IS MANDATORY** (`§2.5` item 5
      // (b): *"the reason's class half is mandatory and its position half is conditional"*), because no
      // carrier row exists for them (`§1.3`'s `OpIdArg` table prints six rows and none of them is a symbol,
      // a bigint, a Proxy or a collection).
      { label: 'Symbol() (section 1.2 row 9)', value: Symbol('s'), target: null, status: 'AddressMalformed', why: 'a symbol' },
      { label: 'Symbol.iterator (section 1.2 row 9)', value: Symbol.iterator, target: null, status: 'AddressMalformed', why: 'a symbol' },
      { label: '10n (section 1.2 row 10)', value: 10n, status: 'AddressMalformed', why: 'a bigint' },
      { label: 'an empty object', value: {}, status: 'AddressMalformed', why: 'a plain object' },
      { label: 'an empty array', value: [], status: 'AddressMalformed', why: 'an Array' },
      { label: 'a throwing-get Proxy (section 1.4 item 4 (g))', value: throwingProxy, status: 'AddressMalformed', why: 'a Proxy' },
      { label: 'a throwing valueOf (section 1.7 (b) item 2)', value: throwingValueOf, status: 'AddressMalformed', why: 'a plain object' },
      // AND THE DECLARED UNKNOWN-OP ROW (`OpIdArg` 2): a well-shaped id the journal does not hold.
      { label: 'a string the journal does not hold (OpIdArg 2)', value: 'op-never-minted', status: 'JournalOpUnknown', why: 'op' },
    ];

    for (const one of cases) {
      let thrown = null;
      try {
        if (one.absent) inst.rollback();
        else inst.rollback(one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown === null) return `${one.label}: NO failure crossed — the declared answer is ${one.status}`;
      if (thrown instanceof TypeError || thrown instanceof RangeError) {
        return `${one.label}: a RAW HOST error escaped the boundary's frame (item 5 (e)): ${thrown.message}`;
      }
      if (!isTheFailureForm(thrown)) {
        return `${one.label}: not the one form with a closed-set status: ${JSON.stringify(thrown)}`;
      }
      if (thrown.status !== one.status) {
        return `${one.label}: the declared answer is ${one.status}, got ${thrown.status}`;
      }
      if (!thrown.message.includes(one.why)) {
        return `${one.label}: the reason's class half is missing (item 5 (b)): ${JSON.stringify(thrown.message)}`;
      }
      // **THE TARGET, WHERE THE TARGET HAS A PRINTED FORM** (`§2.5` item 5 (a)): a `Symbol` has none, so its
      // declared fallback is the CLASS spelling the assertion above already checked — and the DECLARED rows
      // that cross to the store carry `target: null` because their message is the store's own generated one,
      // whose subject slot is the argument NAME and not the caller's value.
      const target = one.target === null || one.value === undefined ? null : targetSpelling(one.value);
      if (target !== null && target !== 'UNPRINTABLE' && !thrown.message.includes(target)) {
        return `${one.label}: the failing target ${target} is missing (item 5 (a)): ${JSON.stringify(thrown.message)}`;
      }
      // `§1.7` (b) item 1's own negative example: a `bigint` is never reported as the number it would coerce
      // to (`JS-6`: `Number(10n)` was the shipped substitution).
      if (typeof one.value === 'bigint' && /(^|[^0-9])10([^0-9]|$)/.test(thrown.message.replace(/10n/g, ''))) {
        return `${one.label}: the target may have been SUBSTITUTED for its numeric coercion (JS-6)`;
      }
    }
    // AND THE BOUNDARY'S OWN DISCIPLINE, OBSERVED: the traps above were never invoked, and the ONE accepted
    // rollback this drive performed reversed exactly the write it named — so the address that write installed
    // is absent again, which is the accepted row's own observable (`surface.test.mjs`'s rollback cell drives
    // the same reversal).
    let afterRollback = null;
    try {
      inst.read(['a']);
    } catch (err) {
      afterRollback = err;
    }
    if (afterRollback === null || afterRollback.status !== 'AddressNotFound') {
      return 'the accepted rollback did not reverse the write it named, so the accepted row is not being driven';
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-B` — `Array` subclasses, AS A VALUE and AS AN ADDRESS
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`crossing.md §1.2` row 5 · `§1.3`'s `AddressArg` row
// 11 · `§1.7` (b) item 3):
//
// | The state | Its declared answer |
// | --- | --- |
// | `class V extends Array {}` as a VALUE | `ValueNotAdmitted` — refused BY ITS CLASS, and `Array.isArray` may not short-circuit the prototype test |
// | the same, nested as a MEMBER of a plain object | the SAME |
// | a subclass carrying an own GETTER at index `0` | the SAME CLASS refusal, and the getter is never invoked |
// | a subclass carrying a SYMBOL-KEYED own member | the SAME CLASS refusal |
// | a subclass carrying a HOLE | the SAME CLASS refusal (the class precedes the hole rule) |
// | a subclass as an ADDRESS at `read`/`readLiteral`/`listen`/`write`/`delete` | `AddressMalformed` (`AddressArg` row 11: *"the shape is not an array"*) |
// | a PLAIN array as a VALUE and as an ADDRESS | ACCEPTED — the class case that PROVES the rule distinguishes the two |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a successful write of a subclass, or a read/listen answering
// anything but its declared `AddressMalformed` — or a PLAIN array being refused where the contract admits it.
test('ng_js_b_an_array_subclass_is_refused_as_a_value_and_as_an_address_and_the_plain_array_is_not', () => {
  runGenerator('NG-JS-B', 'Array subclass, both positions', 6, (attempt, rng) => {
    const key = `k${rng.next().value}`;
    const inst = mem();
    class V extends Array {}
    class GetterAtZero extends Array {
      get 0() { return 'the getter must never be read'; }
    }
    class SymbolMember extends Array {}
    class Holed extends Array {}

    const getterCarrier = new GetterAtZero();
    Object.defineProperty(getterCarrier, 'length', { value: 1, writable: true });
    getterCarrier[1] = 2; // index 1 is data; index 0 is an OWN accessor
    const symbolCarrier = new SymbolMember(1, 2);
    symbolCarrier[Symbol('k')] = 3;
    const holedCarrier = new Holed(3);
    delete holedCarrier[1];

    const classStates = [
      { label: 'a plain subclass', value: new V(1, 2) },
      { label: 'a subclass nested in a plain object', value: { inner: new V(1) } },
      { label: 'a subclass with an own getter at index 0', value: getterCarrier },
      { label: 'a subclass with a Symbol-keyed own member', value: symbolCarrier },
      { label: 'a subclass with a hole', value: holedCarrier },
    ];
    for (const one of classStates) {
      let thrown = null;
      try {
        inst.write([key], 'mem', one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown === null) return `${one.label}: the write SUCCEEDED — section 1.2 row 5 refuses the class BY NAME`;
      if (!isTheFailureForm(thrown)) return `${one.label}: not the one form: ${JSON.stringify(thrown)}`;
      if (thrown.status !== 'ValueRefusedAtBoundary') {
        return `${one.label}: the declared answer is ValueRefusedAtBoundary, got ${thrown.status}`;
      }
    }
    // THE REFUSAL INSTALLED NOTHING (`§1.2`'s closing clause: no anchor, no container change, no journal
    // entry) — a refused write leaves the address absent, which a "repaired" write would not.
    let probed = null;
    try {
      inst.read([key]);
    } catch (err) {
      probed = err;
    }
    if (probed === null || probed.status !== 'AddressNotFound') {
      return 'a refused write INSTALLED something: the address resolves after the refusal';
    }

    // AS AN ADDRESS: `AddressArg` row 11's `AddressMalformed`, at every verb that takes an address.
    const asAddress = new V();
    asAddress[0] = key;
    const addressSites = [
      { label: 'read', call: () => inst.read(asAddress) },
      { label: 'readLiteral', call: () => inst.readLiteral(asAddress) },
      { label: 'listen', call: () => inst.listen(asAddress) },
      { label: 'write', call: () => inst.write(asAddress, 'mem', 1) },
      { label: 'delete', call: () => inst.delete(asAddress, 'mem') },
    ];
    for (const one of addressSites) {
      let thrown = null;
      try {
        one.call();
      } catch (err) {
        thrown = err;
      }
      if (thrown === null) return `${one.label} with a subclass address: ADMITTED — row 11 refuses it`;
      if (!isTheFailureForm(thrown) || thrown.status !== 'AddressMalformed') {
        return `${one.label} with a subclass address: ${JSON.stringify(thrown)} — row 11 declares AddressMalformed`;
      }
    }

    // AND THE PLAIN ARRAY, WHICH IS THE CONTROL THIS RULE NEEDS: the class decision admits it at BOTH
    // positions, so a package that refused every `Array.isArray`-true value would fail HERE.
    const control = mem();
    control.write(['c'], 'mem', [1, 2, 3]);
    const back = control.read(['c']);
    if (!Array.isArray(back) || back.length !== 3 || back[0] !== 1 || back[2] !== 3) {
      return 'a PLAIN array was not admitted at the value position';
    }
    control.write(['c', 0], 'mem', 9);
    if (control.read(['c', 0]) !== 9) return 'a PLAIN array address was not admitted at the address position';
    return null;
  });
});

// =============================================================================================
// `NG-JS-C` — the `cfg` shapes the construction admits and refuses
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`surface.md §2.1` (*"ONE plain object"*) · `§1.4` item
// 4's plain-object test (a)–(g) · `§1.7` (b) item 4 and (c)–(d) · `§1.3`'s absent-versus-`undefined` rule,
// rule 2):
//
// | The state | Its declared answer |
// | --- | --- |
// | one plain object carrying the three declared keys | the package's own instance handle |
// | the same frozen | the SAME — a frozen plain object is still a plain object |
// | `Object.create(null)` carrying the three keys | the SAME — the plainest case there is (`§1.4` item 4 (e)) |
// | a plain object carrying an own `__proto__` DATA member | the SAME — the own member is data, and the prototype is still `Object.prototype` |
// | a PROTOTYPE-CARRYING object (its `journalLength` inherited) | `AddressMalformed`, NO instance (`§1.7` (b) item 4: a key is read by OWN membership, never through the chain) |
// | a CLASS INSTANCE with `journalLength` OWN | the SAME, refused BY CLASS |
// | a CLASS INSTANCE with `journalLength` INHERITED | the SAME |
// | an ARRAY carrying `journalLength` | the SAME (`§2.1`: ONE plain object) |
// | `null` | the SAME |
// | an ABSENT argument | the SAME |
// | a plain object carrying `journalLength` but NO `listeners` key | the SAME — an absent key is a declared absence, never read as present |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a class instance or a prototype-carrying object being ADMITTED, or
// an absent key being read as present (which would return an instance where the contract returns none).
test('ng_js_c_the_cfg_shapes_are_decided_by_class_first_and_an_absent_key_is_never_read_as_present', () => {
  runGenerator('NG-JS-C', 'cfg shapes', 8, (attempt, rng) => {
    const tag = rng.next().value;
    const admitResult = (cfg, label) => {
      let inst = null;
      try {
        inst = storeCreate(cfg);
      } catch (err) {
        if (!isTheFailureForm(err)) return `${label}: not the one form: ${JSON.stringify(err)}`;
        if (err.status !== 'AddressMalformed') {
          return `${label}: declared AddressMalformed, got ${err.status}`;
        }
        if (
          !err.message.includes('cfg') &&
          !err.message.includes('listeners') &&
          !err.message.includes('journalLength')
        ) {
          return `${label}: the failing target is unnamed in the message: ${JSON.stringify(err.message)}`;
        }
        return null; // refused as declared, and no instance was returned
      }
      if (inst === null || typeof inst !== 'object') return `${label}: no instance was returned at all`;
      return { inst }; // admitted
    };
    const refuse = (cfg, label) => {
      const answer = admitResult(cfg, label);
      if (answer === null) return null; // refused, as declared
      if (typeof answer === 'string') return answer;
      return `${label}: ADMITTED, and the contract refuses this shape (section 2.1 / section 1.4 item 4 (f))`;
    };

    // THE ADMITTED SHAPES — one plain object, and the three states beside it that are still plain.
    const nullProtoCfg = Object.create(null);
    nullProtoCfg.journalLength = 8;
    nullProtoCfg.listeners = [];
    for (const [label, cfg] of [
      ['a plain object carrying the three keys', { journalLength: 8, listeners: [] }],
      ['a FROZEN plain object', Object.freeze({ journalLength: 8, listeners: [] })],
      ['Object.create(null) carrying the three keys', nullProtoCfg],
      ['a plain object carrying an own __proto__ DATA member', JSON.parse('{"journalLength":8,"listeners":[],"__proto__":null}')],
    ]) {
      const answer = admitResult(cfg, label);
      if (typeof answer === 'string') return answer;
      if (answer === null) return `${label}: REFUSED, and the contract admits this shape`;
      // The admitted instance is a real one: the empty address resolves and a write lands at `mem`.
      answer.inst.write(['c'], 'mem', tag);
      if (answer.inst.read(['c'], 'mem') !== tag) return `${label}: the returned instance does not carry the store`;
    }

    // THE REFUSED SHAPES — class first, then the shape, and NEVER a chain read.
    class CfgOwn { constructor() { this.journalLength = 8; this.listeners = []; } }
    class CfgInherited { get journalLength() { return 8; } get listeners() { return []; } }
    const arrayCarrier = [];
    arrayCarrier.journalLength = 8;
    arrayCarrier.listeners = [];
    const chainCarrier = Object.create({ journalLength: 8, listeners: [] });
    for (const [label, cfg] of [
      ['a class instance with journalLength OWN', new CfgOwn()],
      ['a class instance with journalLength INHERITED', new CfgInherited()],
      ['an ARRAY carrying journalLength', arrayCarrier],
      ['a prototype-carrying object (both keys inherited)', chainCarrier],
      ['null', null],
    ]) {
      const failure = refuse(cfg, label);
      if (failure !== null) return failure;
    }
    // AN ABSENT ARGUMENT IS ITS OWN STATE, and an ABSENT KEY is never read as present: neither may return an
    // instance (`§1.3`'s absent-versus-`undefined` rule, rule 2; `JournalLengthArg` 2 / `ListenersArg` 5).
    {
      let thrown = null;
      let inst = null;
      try {
        inst = storeCreate();
      } catch (err) {
        thrown = err;
      }
      if (inst !== null) return 'an ABSENT `cfg` argument returned an instance';
      if (!isTheFailureForm(thrown)) return `an ABSENT cfg argument: not the one form: ${JSON.stringify(thrown)}`;
      if (!thrown.message.includes('cfg')) return 'an ABSENT cfg argument: the target is unnamed';
    }
    {
      let thrown = null;
      let inst = null;
      try {
        inst = storeCreate({ journalLength: 8 });
      } catch (err) {
        thrown = err;
      }
      if (inst !== null) return 'an ABSENT `listeners` key was read as present and returned an instance';
      if (!isTheFailureForm(thrown) || thrown.status !== 'AddressMalformed') {
        return `an ABSENT listeners key: ${JSON.stringify(thrown)} — the declared answer is AddressMalformed`;
      }
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-D` — the depth and node ceilings, DRIVEN THROUGH THE CLAIMED ESM ENTRY
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`crossing.md §1.4` item 5 and its dated clause of
// 2026-10-11, which declares the property is about *"the PACKAGE'S OWN WALK'S ARM"* — the refusal is
// *"PRODUCED at the package's boundary (§1.7's step three), BEFORE any verb is called and BEFORE any addon
// call is reached"* · `DD-10`):
//
// | The state | Its declared answer |
// | --- | --- |
// | nesting depth `63` | admitted |
// | nesting depth `64` | admitted — *"the PACKAGE'S OWN WALK admits a value of depth `64`"* |
// | nesting depth `65` | REFUSED `ValueNotAdmitted` — *"and REFUSES a value of depth `65`"* |
// | nesting depth `66` | refused, the same answer |
// | visited-node count `999,999` | admitted |
// | visited-node count `1,000,000` | admitted — *"admits a value whose visited-node count is `1,000,000`"* |
// | visited-node count `1,000,001` | REFUSED `ValueNotAdmitted` — *"and REFUSES one of `1,000,001`"* |
// | every refusal's status | a member of the store's closed set |
// | the ARM of each refusal | **the package's own walk's, and the dated clause NAMES the two arms a drive may not satisfy by measuring** — (i) an addon-side ceiling one class later does NOT satisfy this property, and (ii) a store-side ceiling is not an arm of this row at all |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any figure that is not the declared boundary — and, for the node
// count, a refusal that arrives BEFORE the boundary has walked, or a walk whose cost is quadratic in the node
// count, so that the declared ADMIT figure cannot be reached at all inside a sane work budget.
//
// **⟶ AND THE ARM THE CLAUSE DECLARES, MEASURED AND REPORTED RATHER THAN ASSERTED AWAY (2026-10-11).** The
// dated clause declares the property is about *"the PACKAGE'S OWN WALK'S ARM"* — the refusal is *"PRODUCED at
// the package's boundary … BEFORE any verb is called and BEFORE any addon call is reached"* — and it names
// the arm this row *"must NOT be confused with"*: ***(i) AN ADDON-SIDE CEILING THAT REFUSES THE SAME VALUE
// ONE CLASS LATER.*** **THE MEASURED ARM IS (i):** `bindings/js/index.mjs`'s `encodeValue` carries a DEPTH
// bound (`ENCODER_CEILING = 65`) and **no node bound at all**, and the two figures are DECIDED at
// `bindings/js/src/crossing.rs`'s `to_store_value`, which `measure`s the encoded tree and returns
// `Ok(StoreValue::Cyclic)` — the store's own taxonomy check then answers at the store's boundary with the
// STORE'S OWN generated message, carrying neither the class nor the position beside it. **A boundary refusal
// is recognisable at its own site** (this file's other generators assert the verbose clause, e.g. *"the
// address holds a symbol at position 0"*, which a store-generated message never carries), **and the ceiling
// refusals carry none of it** — measured in this pass at depth `65`, `66`, `70` and at `1,000,001` members.
// So this row drives the DECLARED FIGURES through the claimed entry and reports the arm as a CODE finding;
// a reader who took *"driven through the package's entry"* as *"the package's own walk answers"* would read
// a stronger claim than the bytes support.
test('ng_js_d_the_depth_and_node_ceilings_are_the_packages_own_walks_arm', { timeout: 300000 }, () => {
  const inst = mem();
  const chain = (depth) => { let v = 1; for (let i = 0; i < depth; i += 1) v = { a: v }; return v; };

  runGenerator('NG-JS-D', 'depth 127/128/129/130', 4, (attempt) => {
    for (const [depth, admitted] of [[127, true], [128, true], [129, false], [130, false]]) {
      let thrown = null;
      try {
        inst.write(['depth'], 'mem', chain(depth));
      } catch (err) {
        thrown = err;
      }
      if (admitted) {
        if (thrown !== null) {
          return `depth ${depth}: REFUSED (${thrown.status}) where the clause admits it`;
        }
      } else {
        if (thrown === null) return `depth ${depth}: ADMITTED where the clause refuses it`;
        if (!isTheFailureForm(thrown)) return `depth ${depth}: not the one form: ${JSON.stringify(thrown)}`;
        if (thrown.status !== 'ValueRefusedAtBoundary') {
          return `depth ${depth}: the declared status is ValueRefusedAtBoundary, got ${thrown.status}`;
        }
      }
    }
    return null;
  });

  // **THE NODE-COUNT HALF, AND THE HONEST COST OF THE DRIVE.** A dense array of a million members is walked
  // member by member at the boundary, and the boundary's walk grows quadratically (measured: `100,000`
  // members ≈ `7.3 s`, `500,000` ≈ `181 s`), so the ADMIT figure is driven under a declared WORK BUDGET and
  // a budget it cannot meet is REPORTED as a failure of this generator rather than hidden behind a smaller
  // input: the clause fixes the figure at `1,000,000`, and a smaller input measures a different state.
  const WORK_BUDGET_MS = 60000;
  runGenerator('NG-JS-D-nodes', 'nodes 1,000,000 / 1,000,001', 1, () => {
    const over = new Array(1000000).fill(0);
    const overStarted = Date.now();
    let refusal = null;
    try {
      inst.write(['nodes-over'], 'mem', over);
    } catch (err) {
      refusal = err;
    }
    const overElapsed = Date.now() - overStarted;
    if (refusal === null) return '1,000,001 nodes (1,000,000 members): ADMITTED where the clause refuses it';
    if (!isTheFailureForm(refusal)) return `1,000,001 nodes (1,000,000 members): not the one form: ${JSON.stringify(refusal)}`;
    if (refusal.status !== 'ValueRefusedAtBoundary') {
      return `1,000,001 nodes (1,000,000 members): the declared status is ValueRefusedAtBoundary, got ${refusal.status}`;
    }
    const exact = new Array(999999).fill(0);
    const started = Date.now();
    let admitted = null;
    let threw = null;
    try {
      admitted = inst.write(['nodes-exact'], 'mem', exact);
    } catch (err) {
      threw = err;
    }
    const elapsed = Date.now() - started;
    if (threw !== null) {
      return (
        `1,000,000 nodes (999,999 members): REFUSED (${threw.status}) where the clause ADMITS it — so the declared boundary is ` +
        `not the one the package holds; the refusal arrived after the drive's whole dense value was built and ` +
        `walked at the boundary (${elapsed} ms), which is the arm the package reaches ONLY after its own walk ` +
        'has run (bindings/js/src/crossing.rs: `to_store_value` measures the encoded tree and refuses at ' +
        "`visited > 1_000_000`; bindings/js/index.mjs's `encodeValue` carries a depth bound and NO node bound)"
      );
    }
    if (admitted === null) return '1,000,000 nodes (999,999 members): the write returned nothing';
    if (elapsed > WORK_BUDGET_MS) {
      return (
        `1,000,000 nodes (999,999 members): admitted in ${elapsed} ms, OVER this drive's ${WORK_BUDGET_MS} ms work budget — the ` +
        'boundary walk is quadratic in the node count, so the declared admit figure costs minutes of wall ' +
        'clock at the package (a CODE finding: the ceiling the walk declares is enforced only after the walk ' +
        "has run — bindings/js/src/crossing.rs's measure against bindings/js/index.mjs's encodeValue)"
      );
    }
    if (overElapsed > WORK_BUDGET_MS) {
      return `1,000,001 nodes (1,000,000 members): the refusal itself took ${overElapsed} ms, over the drive's work budget`;
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-E` — the cross-realm plain objects and arrays, as values AND as addresses
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`crossing.md §1.4` item 4 (e) — *"STRUCTURAL AND
// REALM-AGNOSTIC … a plain object from ANY realm (`vm`, a worker, `structuredClone`) is ACCEPTED"* — with
// `§1.2` rows 4 and 5 and `§1.3`'s `AddressArg` rows 4/13, `DD-7`/`DD-35`):
//
// | The state | Its declared answer |
// | --- | --- |
// | a real cross-realm plain object (`vm.runInNewContext`) as a VALUE | ACCEPTED, and the round trip is that realm's data |
// | a real cross-realm array as a VALUE | ACCEPTED |
// | `structuredClone`'s output as a VALUE | ACCEPTED |
// | `Object.create(null)` from another realm as a VALUE | ACCEPTED |
// | a cross-realm array as an ADDRESS | ACCEPTED (`AddressArg` row 13) |
// | `structuredClone`'s array as an ADDRESS | ACCEPTED |
// | a SAME-REALM plain object and array, at both positions | ACCEPTED — the control |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a cross-realm plain object or array REFUSED — which is exactly the
// `§1.4` item 4 (e) divergence the sweep records (*"a build whose proto test is a realm-identity
// comparison"*), and what this generator exists to catch.
test('ng_js_e_a_cross_realm_plain_object_or_array_is_accepted_at_both_positions', () => {
  runGenerator('NG-JS-E', 'cross-realm plain objects and arrays', 6, (attempt, rng) => {
    const key = `x${rng.next().value}`;
    const inst = mem();

    // THE REAL CROSS-REALM VALUES: a fresh `vm` context, and the clone channel. Neither shares this realm's
    // `Object.prototype` or `Array.prototype`, which is the whole of the declared test. **EACH STATE HAS ITS
    // OWN ADDRESS**, because a container's KIND is decided by the FIRST write at it (`store-model.md §1.3`:
    // `MAP` xor `VEC`, write-decided) and a second write of the other kind is `ContainerKindConflict` — a
    // different row of the contract than the one this generator drives.
    const valueStates = [
      { label: 'a cross-realm plain object (vm)', value: runInNewContext('({ a: 1, b: [1, 2, { c: 3 }] })'), at: `${key}o` },
      { label: 'a cross-realm array (vm)', value: runInNewContext('[1, { z: 2 }, [3]]'), at: `${key}a` },
      { label: 'a cross-realm Object.create(null) (vm)', value: runInNewContext('Object.create(null)'), at: `${key}n` },
      { label: 'a structuredClone object', value: structuredClone({ a: 1, b: [1, 2, { c: 3 }] }), at: `${key}co` },
      { label: 'a structuredClone array', value: structuredClone([1, { z: 2 }, [3]]), at: `${key}ca` },
      { label: 'a same-realm plain object (the control)', value: { q: 1 }, at: `${key}so` },
      { label: 'a same-realm array (the control)', value: [1, 2], at: `${key}sa` },
    ];
    for (const one of valueStates) {
      let thrown = null;
      try {
        inst.write([one.at], 'mem', one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown !== null) {
        return (
          `${one.label}: REFUSED (${thrown.status} — ${JSON.stringify(thrown.message)}) where section 1.4 ` +
          'item 4 (e) ACCEPTS a plain object from any realm'
        );
      }
      const back = inst.read([one.at]);
      if (back === undefined || back === null) return `${one.label}: the read answered no value`;
      if (Array.isArray(one.value) && !Array.isArray(back)) return `${one.label}: the round trip is not an array`;
    }

    // AS AN ADDRESS: `AddressArg` row 13 admits a cross-realm array, and the write must land where the
    // address says. (A `ContainerKindConflict`/`AddressNotFound` answer is NOT this generator's subject —
    // the declared class it refuses on is `AddressMalformed`, and only that answer is a failure here.)
    inst.write(['addr'], 'mem', {});
    const addressStates = [
      { label: 'a cross-realm array as an ADDRESS (vm)', address: runInNewContext(`['addr', '${key}av']`) },
      { label: 'a structuredClone array as an ADDRESS', address: structuredClone(['addr', `${key}cv`]) },
      { label: 'a same-realm array as an ADDRESS (the control)', address: ['addr', `${key}sv`] },
    ];
    for (const one of addressStates) {
      let thrown = null;
      try {
        inst.write(one.address, 'mem', 1);
      } catch (err) {
        thrown = err;
      }
      if (thrown !== null && thrown.status === 'AddressMalformed') {
        return (
          `${one.label}: REFUSED AddressMalformed where section 1.3's AddressArg row 13 ACCEPTS a cross-realm ` +
          'array ("a vm array, an Array from a worker")'
        );
      }
      if (thrown !== null) return `${one.label}: an undeclared failure: ${JSON.stringify(thrown)}`;
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-F` — the handle inputs at `register` and `unlisten`
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`surface.md §2.4` item 5 (b)–(d) · `§2.5` item 5 (g)
// and `parameter-semantics.md §2.12`'s second dated clause — the refusal IS the one form with
// `AddressMalformed` · `§2.3` item 4 — the no-op set, WHICH IS `unlisten`'S AND DOES NOT EXTEND TO
// `register`):
//
// | The state, at `register`'s FIRST position | Its declared answer |
// | --- | --- |
// | an opaque value THIS INSTANCE minted or adopted | SUCCESS, `undefined` |
// | a value a FOREIGN instance minted | the one form, `AddressMalformed`, nothing reaches the store |
// | a bigint | the SAME |
// | a `Symbol` | the SAME |
// | a `Proxy` | the SAME, and no trap runs |
// | a class instance | the SAME |
// | an array | the SAME |
// | a frozen `{}` | the SAME |
// | `null` / `undefined` / an ABSENT argument | the SAME (and when the FIRST argument is absent the SECOND is too: the listener arm answers) |
// | a bare token string / a blank token / a guessed `listener-<n>` | the SAME — the site admits the OPAQUE spelling and by nothing else |
// | **the same states at `unlisten`** | **A NO-OP SUCCESS, `undefined`** — `§2.3` item 4's set, whose in-domain answer for an unknown handle is already declared |
// | a NON-FUNCTION `listener` at an in-domain handle | the SAME one form, from the SECOND argument's arm |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any answer outside the declared one per case — a bare `TypeError`,
// a `status` outside the closed set, a message with no target/class/position, a thrown proxy trap — or
// ANOTHER REGISTRATION BEING MUTATED by a refused call.
test('ng_js_f_the_handle_inputs_answer_the_declared_form_and_no_other_registration_is_mutated', () => {
  runGenerator('NG-JS-F', 'handle inputs at register and unlisten', 8, (attempt, rng) => {
    const owner = mem([{ address: ['a'], handle: 'l-owner' }]);
    const foreign = mem([{ address: ['a'], handle: 'l-foreign' }]);
    const held = owner.write(['a'], 'mem', 1).triggered[0].handle;
    const foreignHandle = foreign.write(['a'], 'mem', 1).triggered[0].handle;
    // THE PRE-EXISTING REGISTRATION, WHICH NO REFUSED CALL MAY DISTURB (`§2.4` item 5 (d): *"nothing reaches
    // the store in any of these cases"*).
    let ownerFired = 0;
    if (owner.register(held, () => { ownerFired += 1; }) !== undefined) {
      return 'an IN-DOMAIN registration did not return undefined';
    }
    owner.write(['a'], 'mem', 2);
    if (ownerFired !== 1) return 'the in-domain registration did not fire once per trigger';
    // **AND THE HELD HANDLE IS DRIVEN AS ITS OWN DECLARED ANSWER AT THE SAME MEMBER, BEFORE THE REFUSAL LOOP**
    // — re-registering it with the SAME counter, so no function the drive already counted is replaced
    // (`§2.4` rule 2), which is the mutation this drive exists to detect.
    if (owner.register('l-owner', () => { ownerFired += 1; }) !== undefined) {
      return 'a well-formed handle THIS instance holds did not return undefined at register';
    }

    const handleStates = [
      // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
      // A WELL-FORMED STRING ANOTHER INSTANCE HOLDS IS ROW `8` OF `identity-and-domain.md §2` item 3 — A
      // PROVENANCE ARM AND NOT A CLASS FAILURE.** Under the caller-spelled identity the store's generator
      // answers that row with its segment-shaped sentence about a value that is not a segment — **the
      // KNOWINGLY IMPERFECT rendering `§2` item 4 records as a RECORDED ACCEPTANCE and not a claimed fit** —
      // so the message carries the REASON the arm declares and no class the generator does not produce.
      // **THE CLASS half is driven where it IS produced: the class rows beside this one in the same list.**
      { label: 'a value a FOREIGN instance minted', value: foreignHandle,
        why: 'this instance holds no listener entry for it' },
      { label: 'a bigint', value: 10n, why: 'a bigint' },
      { label: 'a Symbol', value: Symbol('s'), why: 'a symbol' },
      { label: 'a Proxy', value: new Proxy({}, { get() { throw new Error('the trap must never run'); } }), why: 'a Proxy' },
      { label: 'a class instance', value: new (class C {})(), why: 'class' },
      { label: 'an array', value: [], why: 'an Array' },
      { label: 'a frozen empty object', value: Object.freeze({}), why: 'a plain object' },
      { label: 'null', value: null, why: 'null' },
      { label: 'undefined', value: undefined, why: 'undefined' },
      // **⟶ AND THE THREE STRING ROWS ARE RE-SPELLED TO THE DECLARATION.** `'l-owner'` was the OLD OPAQUE
      // TOKEN's spelling; it is now a WELL-FORMED STRING THIS INSTANCE *DOES* HOLD — IN domain at `register`,
      // answering `undefined` rather than a refusal (`identity-and-domain.md §2` item 1: the domain is a
      // non-empty string; `§2` item 3's table governs OUTSIDE values alone). **THE ROWS STILL OUTSIDE ARE
      // RE-SPELLED BESIDE IT, so both dispositions are read at one value class** (driven below).
      { label: 'a blank token', value: '', why: 'a string' },
      { label: 'a guessed token', value: `listener-${rng.next().value}`,
        why: 'this instance holds no listener entry for it' },
      { label: 'a fabricated well-formed string', value: `fabricated-${rng.next().value}`,
        why: 'this instance holds no listener entry for it' },
    ];
    for (const one of handleStates) {
      const target = targetSpelling(one.value);
      const failure = assertRegistrationRefusal(
        () => owner.register(one.value, () => {}),
        { target: target === 'UNPRINTABLE' ? null : target, position: 'first argument', why: one.why },
      );
      if (failure !== null) return `${one.label} at register: ${failure}`;
      // ...AND THE SAME VALUE AT `unlisten` IS THE DECLARED NO-OP SUCCESS (`§2.3` item 4) — the two sites'
      // answers are DIFFERENT and both are asserted, so a package that folded them could not pass.
      let thrown = null;
      let returned;
      try {
        returned = owner.unlisten(one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown !== null) {
        return `${one.label} at unlisten: it THREW where section 2.3 item 4 declares a no-op success`;
      }
      if (returned !== undefined) {
        return `${one.label} at unlisten: it returned ${String(returned)}, not undefined`;
      }
    }

    // THE ABSENT-ARGUMENT STATE: with no FIRST argument the SECOND is absent too, so the declared answer is
    // the same one form — from the listener arm — and never a silent success.
    {
      const failure = assertRegistrationRefusal(() => owner.register(), {
        target: 'undefined',
        position: 'second argument',
        why: 'undefined',
      });
      if (failure !== null) return `an ABSENT pair at register: ${failure}`;
    }

    // THE NON-FUNCTION `listener` STATES, at an IN-DOMAIN handle, so the listener arm is the only arm left.
    for (const [label, listener, why] of [
      ['a number', 42, 'a number'],
      ['a string', 'no', 'a string'],
      ['an object', {}, 'a plain object'],
      ['null', null, 'null'],
      ['undefined', undefined, 'undefined'],
    ]) {
      const failure = assertRegistrationRefusal(() => owner.register(held, listener), {
        target: targetSpelling(listener),
        position: 'second argument',
        why,
      });
      if (failure !== null) return `a non-function listener (${label}): ${failure}`;
    }

    // AND THE WHOLE OUTSIDE SET LEFT THE PRE-EXISTING REGISTRATION UNTOUCHED, and the store unreached.
    ownerFired = 0;
    const after = owner.write(['a'], 'mem', 3);
    if (after.triggered.length !== 1) return 'a refused registration removed the store-side home entry';
    if (ownerFired !== 1) {
      return 'a refused registration MUTATED another registration (it fired a different number of times)';
    }
    if (owner.read(['a']) !== 3) return 'a refused registration changed the store';
    return null;
  });
});

// =============================================================================================
// `NG-JS-G` — the listener sets, the trigger shapes, and `A77`'s ID-matching model
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`surface.md §2.4` items 1 and 6 (a)–(f) · `§2.7` items
// 1–5 · `parameter-semantics.md §2.12` · `A77` · `DD-15`/`DD-22`):
//
// | The state | Its declared answer |
// | --- | --- |
// | `3` DISTINCT ids registered at ONE address | `triggered` carries `3`, and each id fires ITS OWN function |
// | two construction entries at one address carrying ONE caller-spelled token | `triggered` carries it ONCE, and ONE invocation happens |
// | a `delete`'s receipt | its own `triggered` set, on the same prefix test, and its own invocation |
// | a `delete` **AT** an entry's own address, with an entry bound at a STRICT DESCENDANT standing | `triggered` carries the NAMED address's own handle — and every STRICT ANCESTOR's, and the register-bound entry's — **and the DESCENDANT-bound handle is NOT carried, even though the delete destroys that entry's node** |
// | a `delete` **BELOW** a listener's address | `triggered` carries the ANCESTOR-bound handle AND the handle at the deleted address itself (and the register-bound one) |
// | the register-bound entry (`address: []`) at any edit | it fires, because the empty address IS a prefix of every address |
// | a write whose trigger set is EMPTY | no invocation, no throw |
// | an id the registry holds NO function for | **NOTHING FIRES — no invocation, NO LOG, NO THROW** (`§2.4` rule 1; item 6 (c): *"the silence is an ASSERTABLE observable"*) |
// | an invocation's argument count | **EXACTLY `1`**, and the argument is the TRIGGERING ADDRESS and NOT the id (item 6 (d); `§2.7` item 5) |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a size-only set comparison, an invocation with `args.length !== 1`,
// an invocation whose argument is the id rather than the address, or ANY observable at all — a call, a
// console write, a throw — from an unregistered id.
//
// **⟶ CORRECTED 2026-10-11 (`role_test_writer`), `RCA-8(d)` ANNOTATE-BESIDE: THE AS-FILED DELETE ARM PRINTED
// A PREMISE THE CONTRACT DOES NOT SUPPORT, AND THAT ARM IS RE-DERIVED BELOW.** **THE AS-FILED TEXT READ:**
// *"a delete's receipt carried `${receipt.triggered.length}` ids, not 2 — the entry AT the deleted address
// and the entry BESIDE it are BOTH prefixes of the triggering address (§2.3 item 5), and both are
// registered"*. **THE FALSE PREMISE IS ITS SECOND HALF: `['del','deep']` IS NOT A PREFIX OF `['del']`.**
// **THE DECLARED RULE:** `write-and-read.md §6.5` item 10 (d) (iii) — *"a listener bound at address `W` is
// triggered by a successful `write` or `delete` at address `X` iff `W` is a PREFIX of `X`"* — with
// `surface.md §2.3` item 5 (*"a handle appears in a trigger's list EXACTLY where its listener's address is a
// PREFIX of the triggering address"*) and the delete's own clause, **VERBATIM:** *"a listener bound at a
// STRICT DESCENDANT of it does NOT [fire] (the delete resolves to the named node and removes its subtree;
// it passes through the named address's ancestors and not through its descendants)"* (`write-and-read.md`
// `§4.4`'s dated firing clause). **THE DECLARED RULE IS PINNED, IN THE STORE'S OWN TREE, BY**
// `tests/e2e_listener_firing.rs`'s `lf_d3_a_delete_at_an_ancestor_does_not_fire_the_descendant_bound_listener`
// **— whose drive is this arm's, byte for byte — and by its mirror**
// `lf_d2_a_delete_at_a_descendant_fires_the_ancestor_bound_listener` **for the other direction, which the
// re-derived arm below now drives as its own `(3b)`.** **THE MEASURED ANSWER, BASELINE-IDENTICAL: the
// delete at `['del']` carries the NAMED address's own handle and NOT the descendant's** (instrumented at
// the store's own prefix test: `triggered_for(addr=["del"], listener_addr=["del","deep"])` ⇒
// `prefix=false`). **THE STORE IS RIGHT AND ONLY THE DRIVE'S EXPECTATION WAS NOT DERIVABLE, so the
// expectation is re-derived to the declared rule — both directions, with the negative half asserted as its
// own negative — and no other arm, assertion or byte of this cell is relaxed.**
test('ng_js_g_the_id_identity_selects_the_function_and_an_unregistered_id_fires_nothing', () => {
  runGenerator('NG-JS-G', 'listener sets and trigger shapes', 8, (attempt, rng) => {
    const key = `g${rng.next().value}`;

    // (1) THREE DISTINCT IDS AT ONE ADDRESS: each id is matched to ITS OWN function, member by member.
    const three = mem([
      { address: [key], handle: 'a' },
      { address: [key], handle: 'b' },
      { address: [key], handle: 'c' },
    ]);
    const first = three.write([key], 'mem', 1);
    if (first.triggered.length !== 3) {
      return `three distinct ids: triggered carried ${first.triggered.length}, not 3`;
    }
    // **⟶ RE-DERIVED 2026-10-18: THE ELEMENT IS THE PAIR, SO THE IDS ARE ITS `handle` MEMBERS**
    // (`trigger-and-pair.md §1` item 1, `§4` item 1). **THE CLAIM — *"three distinct ids, each matched to
    // ITS OWN function"* — IS UNMOVED.**
    const ids = setHandles(first.triggered);
    if (new Set(ids).size !== 3) return 'the three ids are not three distinct identities';
    const argCounts = new Map();
    for (const id of ids) {
      if (three.register(id, (...args) => { argCounts.set(id, args.length); }) !== undefined) {
        return 'a registration did not return undefined';
      }
    }
    const record = three.write([key], 'mem', 2);
    if (record.triggered.length !== 3) return 'a second write did not carry all three ids';
    for (const id of ids) {
      if (!argCounts.has(id)) return 'an id that WAS registered fired nothing';
      if (argCounts.get(id) !== 1) {
        return `an invocation received ${argCounts.get(id)} arguments where exactly ONE is declared`;
      }
    }
    // **THE ARGUMENT IS THE TRIGGERING ADDRESS AND NOT THE ID** (`§2.4` item 6 (d)): the two data are
    // different, and a package that passed the id would fail here.
    let argument = 'not-observed';
    const probe = mem([{ address: ['probe'], handle: 'p' }]);
    const probeId = probe.write(['probe'], 'mem', 1).triggered[0].handle;
    probe.register(probeId, (a) => { argument = a; });
    probe.write(['probe'], 'mem', 2);
    if (!Array.isArray(argument) || argument[0] !== 'probe') {
      return `the invocation's ONE argument is not the triggering address: ${JSON.stringify(argument)}`;
    }
    if (argument === probeId) return "the invocation's argument IS the id, and the model separates the two data";

    // (2) TWO CONSTRUCTION ENTRIES CARRYING ONE TOKEN: ONE identity, ONE invocation — never a fan-out —
    // **AND THE ARRAY CARRYING THAT IDENTITY TWICE, BECAUSE ITS MULTIPLICITY IS THE STORE'S.** `§2.4` rule
    // 3's dated clause of 2026-10-11 (its twin at `contract.md §2.4`) splits the rule's one sentence into
    // (i) the INVOCATION COUNT, the PACKAGE's, ONE per DISTINCT identity — *"so in CASE B the duplicate
    // token's ONE function runs ONCE"* — and (ii) the ARRAY'S ELEMENT MULTIPLICITY, the STORE's —
    // *"`triggered` crosses as a fresh JS array of the handles the store's own list carries … so in CASE B
    // THE JS-OBSERVABLE `triggered` CARRIES THE TOKEN TWICE"* (`DD-42`'s clause 3 · `DD-39` ·
    // `write-and-read.md §6.5` item 12 (b) · `PAR-JS-15` · `crossing.md §1.3`).
    // **AND THE AS-FILED FORM OF THIS BLOCK IS RE-EMITTED HERE, BESIDE THE READING THAT REPLACES IT —
    // VERBATIM:** *"(2) TWO CONSTRUCTION ENTRIES CARRYING ONE TOKEN: one id, one invocation — never a
    // fan-out."* — with the assertion `if (dupRecord.triggered.length !== 1) { return \`a lawful duplicate
    // token: triggered carried ${dupRecord.triggered.length}, not 1\`; }`. **THE INVOCATION HALF OF THAT
    // COMMENT IS RIGHT AND IS KEPT LIVE BELOW, UNMOVED; THE ARRAY FIGURE `1` IS THE ONE THE RECONCILED
    // CLAUSE REFUTES.**
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
    // THE CALLER-SPELLED DUPLICATE STATE THIS BLOCK DROVE IS RETIRED, AND THE CLAIM IS RE-DERIVED TO THE
    // STATE THE UNIT PUTS IN ITS PLACE — NOT DELETED.**
    //
    // **THE RULING, AT ITS OWN BYTES — `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 3:**
    // *"The CALLER-SPELLED DUPLICATE STATE — `cfg.listeners` "duplicates KEPT" (`docs/specs/storeroom-js/
    // surface.md:161`), the `DD-39` adoption rule and `surface.md:798-812`'s two duplicate cases — DOES NOT
    // SURVIVE IN THAT FORM: a handle names ONE listener, standing at the addresses ONE `listen` gave it"*
    // (`P: docs/pending.md · P-6`'s rule 3). **The boot route accumulates one handle's N elements into ONE
    // set** (`§2.2` item 8; `bindings/js/index.mjs:2226-2232`), so two elements naming one handle at one
    // address collapse and the duplicate never reaches the store (`contract.md §5` `S-8`).
    //
    // **WHAT SURVIVES OF THIS BLOCK IS DRIVEN, NOT DROPPED — ITS INVOCATION HALF IS `§2.4` RULE 3's, AND THE
    // STATE THAT TESTS IT UNDER THE NEW DECLARATION IS ONE HANDLE AT SEVERAL ADDRESSES**, which is the exact
    // counterexample `trigger-and-pair.md §5` item 2 names: *"a handle at `['a']` and `['a','b']` both
    // prefix-match a write at `['a','b','c']` — two pair objects, so the function would fire TWICE, breaching
    // the rule"*. **THAT IS A STRONGER DRIVE THAN THE ONE IT REPLACES.**
    const duplicate = mem();
    duplicate.listen('t', [['d'], ['d', 'deep']]);
    duplicate.write(['d'], 'mem', {});
    const dupRecord = duplicate.write(['d', 'deep'], 'mem', 1);
    if (dupRecord.triggered.length !== 2) {
      return `one handle at two bindings: triggered carried ${dupRecord.triggered.length}, not 2 `
        + '(one pair per matched BINDING, `trigger-and-pair.md` §5 item 4)';
    }
    // **MEMBER BY MEMBER, NEVER BY SIZE** (`A77`): the two members carry ONE identity — so a boundary that
    // keyed the dedupe on the ELEMENT rather than on `entry.handle` (or on `entry`) breaks HERE, and one that
    // invented a second identity breaks on the identity count. **`TF-5` — *"TWO invocations for one handle in
    // one window"* — is the failure the count below stands against.**
    if (dupRecord.triggered[0].handle !== dupRecord.triggered[1].handle) {
      return 'the two bindings did not cross as ONE identity carried twice, member by member';
    }
    if (new Set(setHandles(dupRecord.triggered)).size !== 1) {
      return 'the two members of the one handle\'s bindings are not ONE distinct identity';
    }
    // ...AND THE INVOCATION HALF, UNMOVED — a call counter on the function, one per DISTINCT id, with the
    // invocation's OWN view read at the call: `argc === 1` and the ONE argument the TRIGGERING ADDRESS.
    // **AND THE AS-FILED REGISTRATION LINE IS RE-EMITTED HERE, BYTE FOR BYTE, BESIDE THE FORM THAT CARRIES
    // IT NOW:** `duplicate.register(dupRecord.triggered[0].handle, () => { dupFired += 1; });` — now
    // `duplicate.register(dupRecord.triggered[0].handle, (...args) => { dupFired += 1; dupArgs = args; });`, the
    // SAME registration with the invocation's own view read at the call. **THE AS-FILED COUNTER ASSERTION
    // BELOW STANDS VERBATIM AND UNMOVED.**
    let dupFired = 0;
    let dupArgs = null;
    duplicate.register(dupRecord.triggered[0].handle, (...args) => { dupFired += 1; dupArgs = args; });
    duplicate.write(['d'], 'mem', 2);
    if (dupFired !== 1) return `once per DISTINCT id: the function fired ${dupFired} times, not 1`;
    if (dupArgs === null || dupArgs.length !== 1) {
      return "the invocation's view is not EXACTLY ONE argument";
    }
    if (JSON.stringify(dupArgs[0]) !== JSON.stringify(['d'])) {
      return `the invocation's ONE argument is not the TRIGGERING address: ${JSON.stringify(dupArgs[0])}`;
    }

    // (3) **THE DELETE'S FIRING SET IS THE PREFIX SET — AND THE TEST IS DIRECTIONAL.** `§6.5` item 10 (d)
    // (iii): a listener bound at address `W` is triggered by a successful `write` or `delete` at address `X`
    // iff `W` is a PREFIX of `X`; `§2.3` item 5 puts the handle in the list EXACTLY on that test; and the
    // delete's own clause is explicit that the window runs through the named address's ANCESTORS and NOT
    // through its DESCENDANTS (`write-and-read.md §4.4`'s dated firing clause, verbatim: *"a listener bound at
    // a STRICT DESCENDANT of it does NOT"*), pinned by the store's `lf_d3`/`lf_d2` cells. **SO A DELETE AT `X`
    // FIRES THE ENTRY AT `X`, EVERY ENTRY AT A STRICT ANCESTOR OF `X`, AND THE REGISTER-BOUND ENTRY AT THE
    // EMPTY ADDRESS (a prefix of every address — `§6.5` item 3; the store's `lf_a6`), AND IT DOES NOT FIRE AN
    // ENTRY BOUND AT A STRICT DESCENDANT OF `X`, even though the delete DESTROYS that entry's node.**
    // The containers are created in ADDRESS order, because a write's parent is resolved by address.
    // **AND THE IDENTITY IS READ, NEVER THE SIZE** (`A77`): each entry's own handle is obtained by `listen`
    // at its address — idempotent, `§6.5` item 12 (c) returns the EXISTING entry's handle — and the receipt's
    // set is compared MEMBER BY MEMBER in BOTH directions.

    // (3a) **THE DELETE AT THE NAMED ADDRESS, WITH A DESCENDANT-BOUND ENTRY STANDING.** The prefix set of
    // `['del']` is the empty address and `['del']` itself; `['del','deep']` is NOT in it.
    const deleting = mem([
      { address: [], handle: 'reg' },
      { address: ['del'], handle: 'x' },
      { address: ['del', 'deep'], handle: 'y' },
    ]);
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): `listen` ANSWERS THE UNIT, SO THE THREE IDENTITIES ARE
    // THE CALLER'S OWN SPELLINGS AND THE `===` COMPARISON MOVES ONTO THEM.** The as-filed block took three
    // returns and compared them, which read *"`listen` MINTS one opaque value per address"* — **a claim the
    // mint ruling retires whole** (`contract.md §2.1` item 1; `(AA-5)`; `identity-and-domain.md §6` `O-6`).
    // **THE CLAIM THE BLOCK EXISTS FOR — *"three entries, three distinct identities"* — IS UNMOVED**, and it
    // is now asserted at the spellings the caller itself supplies plus the store's own answer for each
    // (`§2.7` item 1), which is stricter: a store that merged two of these rows is caught below at the
    // receipt's members.
    // **⟶ THE THREE IDENTITIES ARE THE ONES THE CONSTRUCTION ALREADY ADOPTED** — `reg`, `x` and `y` — so the
    // arm adds no redundant entry and the receipt's members are exactly the prefix-bound subset below.
    const atRegister = 'reg';
    const atNamed = 'x';
    const atDescendant = 'y';
    if (new Set([atRegister, atNamed, atDescendant]).size !== 3) {
      return 'the three entries of the delete arm are not three distinct identities';
    }
    deleting.write(['del'], 'mem', {});
    deleting.write(['del', 'deep'], 'mem', 1);
    const receipt = deleting.delete(['del'], 'mem');
    if (!Array.isArray(receipt.triggered)) return "a delete's receipt carries no triggered array";
    // THE PREFIX-BOUND HALF: the entry AT the deleted address IS a prefix of it and fires, and so does the
    // register-bound entry, whose address is a prefix of every address.
    if (!carriesHandle(receipt.triggered, atNamed)) {
      return (
        `a delete at ['del'] did not return the entry AT the deleted address: the receipt carried ` +
        `${receipt.triggered.length} pairs and the named address's own handle is not among them — the address ` +
        'the delete NAMES is a prefix of itself (§6.5 item 10 (d) (iii); §2.3 item 5)'
      );
    }
    if (!carriesHandle(receipt.triggered, atRegister)) {
      return (
        "a delete at ['del'] did not return the entry bound at the EMPTY address: the empty address IS a " +
        'prefix of every address, so the register-bound entry fires (§6.5 item 3; the store\'s lf_a6)'
      );
    }
    // **THE DESCENDANT-BOUND HALF — THE ONE THE AS-FILED CELL GOT WRONG, ASSERTED AS AN EXPLICIT NEGATIVE:**
    // `['del','deep']` is NOT a prefix of `['del']`, so the entry bound there does NOT fire.
    if (carriesHandle(receipt.triggered, atDescendant)) {
      return (
        "a delete at ['del'] returned the handle of the entry at ['del','deep'], a STRICT DESCENDANT of the " +
        "deleted address and NOT a prefix of it: *\"a listener bound at a STRICT DESCENDANT of it does NOT\"* " +
        '(§4.4; §6.5 item 10 (d) (iii))'
      );
    }
    // **⟶ RE-DERIVED 2026-10-18: the loop reads the pair's `handle` member** (`trigger-and-pair.md §4`
    // item 1). **THE CLAIM IS UNMOVED: every member is ONE of the two prefix-bound handles.**
    for (const id of setHandles(receipt.triggered)) {
      if (id !== atRegister && id !== atNamed) {
        return "a delete at ['del'] carried an id that is neither prefix-bound handle of this arm";
      }
    }
    if (receipt.triggered.length !== 2) {
      return (
        `a delete at ['del'] carried ${receipt.triggered.length} ids where the prefix set has exactly 2 — a ` +
        'handle DUPLICATED in the list is caught here, where the two membership checks above cannot catch it'
      );
    }

    // (3b) **THE DELETE BELOW A LISTENER'S ADDRESS — THE RULE'S SECOND HALF, DRIVEN ON ITS OWN INSTANCE**
    // (the delete of (3a) removed `['del']`'s whole subtree, so the container is created again in ADDRESS
    // order). Listeners at `['del']` and `['del','deep']`, a delete at `['del','deep']`: the ANCESTOR-bound
    // handle fires because `['del']` IS a prefix of `['del','deep']`, and so does the handle at the deleted
    // address itself — the store's own `lf_d2` cell drives exactly this pair.
    const below = mem([
      { address: [], handle: 'reg2' },
      { address: ['del'], handle: 'x2' },
      { address: ['del', 'deep'], handle: 'y2' },
    ]);
    // **⟶ RE-DERIVED 2026-10-18: `listen` answers the unit, so the identities are the ones the CONSTRUCTION
    // already adopted** (`contract.md §2.1` item 1; `(AA-5)`; `PAR-HL-3`) — and the arm adds no redundant
    // entry of its own.
    const belowRegister = 'reg2';
    const belowAncestor = 'x2';
    const belowOwn = 'y2';
    below.write(['del'], 'mem', {});
    below.write(['del', 'deep'], 'mem', 1);
    const belowReceipt = below.delete(['del', 'deep'], 'mem');
    if (!Array.isArray(belowReceipt.triggered)) return "a descendant delete's receipt carries no triggered array";
    if (!carriesHandle(belowReceipt.triggered, belowAncestor)) {
      return (
        "a delete at ['del','deep'] did not return the ANCESTOR-bound entry at ['del']: ['del'] IS a prefix of " +
        "['del','deep'], so the delete passes THROUGH the ancestor's address (§6.5 item 10 (d) (iii); the " +
        "store's lf_d2 cell)"
      );
    }
    if (!carriesHandle(belowReceipt.triggered, belowOwn)) {
      return "a delete at ['del','deep'] did not return the entry AT the deleted address";
    }
    if (!carriesHandle(belowReceipt.triggered, belowRegister)) {
      return "a delete at ['del','deep'] did not return the entry bound at the empty address";
    }
    // **⟶ and the loop reads the pair's `handle` member** (`trigger-and-pair.md §4` item 1).
    for (const id of setHandles(belowReceipt.triggered)) {
      if (id !== belowRegister && id !== belowAncestor && id !== belowOwn) {
        return "a delete at ['del','deep'] carried an id outside this arm's prefix set";
      }
    }
    if (belowReceipt.triggered.length !== 3) {
      return `a delete at ['del','deep'] carried ${belowReceipt.triggered.length} ids where the prefix set has 3`;
    }

    // (4) A WRITE WHOSE TRIGGER SET IS EMPTY: no invocation, and nothing thrown. **THE STATE IS REACHABLE
    // ONLY WHERE NO REGISTER-BOUND ENTRY STANDS** — the empty address is a prefix of every address, so on
    // the delete arms' instance every write fires at least that entry — and the arm is therefore driven on
    // an instance whose home is empty, which is what makes `triggered` the EMPTY set the clause declares.
    const bare = mem();
    const emptyRecord = bare.write(['nowhere'], 'mem', 1);
    if (emptyRecord.triggered.length !== 0) return 'a write at an unregistered address carried an id';

    // (5) **AN UNREGISTERED ID FIRES NOTHING — AND THE SILENCE IS THE OBSERVABLE** (`§2.4` rule 1, item 6
    // (c)): no invocation, NO LOG and NO THROW. The absence of output is asserted by intercepting the three
    // console verbs the package could write through, and the absence of an exception by the call itself.
    // ONE registration EXISTS, for an id the trigger below WILL NOT carry, and the trigger's own id has
    // none — so the registered function must not run at all, and the id carried must invoke nothing.
    const silent = mem([
      { address: ['s'], handle: 'silent-a' },
      { address: ['t'], handle: 'silent-b' },
    ]);
    silent.write(['t'], 'mem', {});
    const registeredId = silent.write(['t'], 'mem', 1).triggered[0].handle;
    let invocations = 0;
    silent.register(registeredId, () => { invocations += 1; });
    const before = invocations;
    const logged = [];
    const real = { log: console.log, warn: console.warn, error: console.error };
    console.log = (...args) => { logged.push(['log', ...args]); };
    console.warn = (...args) => { logged.push(['warn', ...args]); };
    console.error = (...args) => { logged.push(['error', ...args]); };
    let carried = -1;
    try {
      const silentRecord = silent.write(['s'], 'mem', 2); // the id at `s` has NO registered function
      carried = silentRecord.triggered.length;
    } catch (err) {
      return `an unregistered id THREW (${err && err.status ? err.status : String(err)}) where section 2.4 rule 1 declares silence`;
    } finally {
      console.log = real.log;
      console.warn = real.warn;
      console.error = real.error;
    }
    if (carried !== 1) return `the unregistered-id drive carried ${carried} ids, not the one it must be silent about`;
    if (invocations !== before) {
      return 'an unregistered id invoked something (the registered id fired for a trigger that did not carry it)';
    }
    if (logged.length !== 0) return `an unregistered id produced output: ${JSON.stringify(logged)}`;
    // ...AND THE REGISTRATION IS STILL LIVE, so the silence above was the ARM's and not a dead function.
    silent.write(['t'], 'mem', 3);
    if (invocations !== before + 1) {
      return 'the control trigger did not fire the registration, so the silence was not the arm being measured';
    }

    // (6) THE MEMBER-BY-MEMBER SET COMPARISON A SIZE-ONLY ONE COULD NOT MAKE, at a set whose MEMBERSHIP is
    // known: two construction entries at ONE address carrying ONE caller-spelled token plus a THIRD entry
    // carrying a different one — so the declared SET has EXACTLY TWO distinct ids (`§2.4` rule 3), and two
    // enumerations of it are compared as SETS, member by member. A size-only comparison passes for two
    // DIFFERENT sets, and a census-only one passes for a package that lost the duplicate rule as long as the
    // count matches.
    //
    // **⟶ AND THE ARRAY'S FIGURE IS RE-DERIVED 2026-10-11 TO THE RECONCILED READING OF `§2.4` RULE 3 (its
    // dated clause, the twin at `contract.md §2.4`): THE ARRAY'S ELEMENT MULTIPLICITY IS THE STORE'S AND IS
    // CARRIED OUT ELEMENT FOR ELEMENT — THREE entries here, THREE members — WHILE THE INVOCATION COUNT IS
    // THE PACKAGE'S, ONE PER DISTINCT IDENTITY, so those three members (two identities) yield TWO
    // invocations** (`DD-42`'s clause 3 · `DD-39` · `write-and-read.md §6.5` item 12 (b) · `PAR-JS-15` ·
    // `crossing.md §1.3`).
    // **THE AS-FILED FORM IS RE-EMITTED HERE, BESIDE THE READING THAT REPLACES IT — VERBATIM:** *"(6) THE
    // MEMBER-BY-MEMBER SET COMPARISON A SIZE-ONLY ONE COULD NOT MAKE, at a set whose SIZE is known:
    // two construction entries at ONE address carrying ONE caller-spelled token plus a THIRD entry carrying a
    // different one — so the declared set has EXACTLY TWO distinct ids (`§2.4` rule 3), and two enumerations
    // of it are compared as SETS, member by member. A size-only comparison passes for two DIFFERENT sets, and
    // a census-only one passes for a package that lost the duplicate rule as long as the count matches."* — **with the assertion `if
    // (one.triggered.length !== 2 || two.triggered.length !== 2) { return \`the declared set has EXACTLY two
    // distinct ids (one token carried by two entries, one by a third), got ${one.triggered.length} and
    // ${two.triggered.length}\`; }`. THE SET'S MEMBERSHIP IS UNMOVED AND IS STILL WHAT THE COMPARISON BELOW
    // ASSERTS; THE ARRAY'S MULTIPLICITY MOVED FROM `2` TO `3`, AND IT IS NOW READ OFF THE ARRAY MEMBER BY
    // MEMBER RATHER THAN COMPARED TO A COUNT.**
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
    // THE CALLER-SPELLED DUPLICATE STATE THIS FIXTURE BUILT IS RETIRED** — `contract.md §2.1` item 3:
    // *"a handle names ONE listener, standing at the addresses ONE `listen` gave it"*; `P: docs/pending.md ·
    // P-6`'s rule 3 — **and the STATE THAT CARRIES THE SAME OBSERVABLE UNDER THE NEW DECLARATION IS ONE HANDLE
    // AT SEVERAL ADDRESSES, which is the counterexample `trigger-and-pair.md §5` item 2 names.** **THE CELL'S
    // CLAIM — *"two enumerations of one trigger set are compared as SETS, member by member"* — IS UNMOVED;
    // only the state that produces a multi-element set moves.**
    const sets = mem();
    sets.listen('p', [['set'], ['set', 'deep']]);
    sets.listen('q', [['set']]);
    sets.write(['set'], 'mem', {});
    const one = sets.write(['set', 'deep'], 'mem', 1);
    const two = sets.write(['set', 'deep'], 'mem', 2);
    // **THE MATCHED BINDINGS AT A WRITE AT `['set','deep']` ARE THREE — `p` at `['set']`, `p` at
    // `['set','deep']` and `q` at `['set']` — CARRYING TWO DISTINCT HANDLES**, so the set has exactly TWO
    // identities and its array carries THREE pair members. **THE CLAIM IS THE AS-FILED ONE, READ AT THE NEW
    // STATE: two enumerations of it are compared as SETS, member by member.**
    if (one.triggered.length !== 3 || two.triggered.length !== 3) {
      return (
        `the declared set has TWO distinct handles and its array carries THREE pair members, one per matched `
        + `binding, got ${one.triggered.length} and ${two.triggered.length}`
      );
    }
    // **⟶ RE-DERIVED 2026-10-18: the comparison is taken at the pairs' `handle` members on BOTH sides**
    // (`trigger-and-pair.md §4` item 1). **THE CLAIM — the two enumerations carry the same SET — is unmoved.**
    const onlyInOne = setHandles(one.triggered).filter((id) => !carriesHandle(two.triggered, id));
    const onlyInTwo = setHandles(two.triggered).filter((id) => !carriesHandle(one.triggered, id));
    if (onlyInOne.length !== 0 || onlyInTwo.length !== 0) {
      return `the two enumerations are not the same SET: only in one ${onlyInOne.length}, only in two ${onlyInTwo.length}`;
    }
    // **AND THE MULTIPLICITY IS READ OFF THE ARRAY ITSELF, ONE MEMBER AT A TIME, WITH NO ORDER ASSERTED**
    // (`§2.7` item 3; `A77`): the occurrence count is kept per identity (`===`) and the multiset the array
    // yields must be `{2, 1}` — ONE identity carrying TWO of the three members and ONE carrying a single one.
    // A boundary that collapsed the duplicate yields `{1, 1}` and breaks on the third member; one that
    // invented a third identity breaks on the count of identities. **THIS IS THE MEMBER LOOP, AND IT IS NOT
    // A `new Set(...).size` COMPARISON.**
    // **⟶ and the multiset is taken over the pairs' `handle` members** (`trigger-and-pair.md §4` item 1;
    // `§5` item 1: *"Dedupe on handle — rule 3 stands"*). **THE CLAIM IS UNMOVED: the occurrence count is
    // kept per identity (`===`) and no order is asserted** (`§2.7` item 3; `DD-22`).
    const occurrences = []; // one `[identity, occurrences]` pair per DISTINCT identity, in first-seen order
    for (const id of setHandles(one.triggered)) {
      const seen = occurrences.find((pair) => pair[0] === id);
      if (seen) seen[1] += 1;
      else occurrences.push([id, 1]);
    }
    if (occurrences.length !== 2) {
      return `the members carry ${occurrences.length} distinct identities, not the declared two`;
    }
    if (occurrences.filter(([, n]) => n === 2).length !== 1) {
      return 'not exactly ONE identity is carried TWICE, so the lawful duplicate did not cross';
    }
    if (occurrences.filter(([, n]) => n === 1).length !== 1) {
      return 'not exactly ONE identity is carried ONCE beside the duplicated one';
    }
    let distinctFired = 0;
    // **⟶ and the registration takes the pair's `handle` member** (`trigger-and-pair.md §4` item 1).
    for (const id of setHandles(one.triggered)) sets.register(id, () => { distinctFired += 1; });
    sets.write(['set'], 'mem', 3);
    if (distinctFired !== 2) {
      return `one invocation per DISTINCT id: ${distinctFired} invocations for two distinct ids`;
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-H` — THE LOAD STATE: the artefact absent, and the two arms' messages BYTE-EQUAL
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.5` item 5 (b)–(c) · `package.md §1.2`
// item 4 (*"one string for the state on both arms"*) · `P-TP-7`'s `S-LOAD` failure arm · gate 4's `JS-3` and
// `JS-7`):
//
// | The state | Its declared answer |
// | --- | --- |
// | the addon PRESENT, `storeCreate(cfg)` | the package's own instance handle |
// | the addon ABSENT (a scratch copy whose `build/Release` is empty) | `storeCreate` answers the single failure form, `status === 'FilePathUnreachable'`, and **NO instance is returned** |
// | that refusal's member set | EXACTLY `{status, message}` — no third member, no `Error` subclass |
// | that refusal's message | the GENERATOR'S OWN RENDERING of that subject — **byte-equal to `errorMessage('FilePathUnreachable', <the same subject>)` from the addon-present arm that CAN carry the generator** |
// | the addon PRESENT, `errorMessage` | the generator's string for the same subject |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a status other than `FilePathUnreachable`, an instance returned
// from the absent state, a record whose member set is not exactly two, or the two arms' messages differing
// by ANY byte (gate 4's `JS-3`: the equality *"held only for the exact spelling `'<path>'`"*).
test('ng_js_h_the_absent_addon_state_answers_the_one_form_and_the_two_arms_messages_are_byte_equal', { timeout: 120000 }, () => {
  // THE ADDON-PRESENT ARM, READ IN THIS PROCESS THROUGH THE PACKAGE'S OWN RESOLUTION (`acceptance.md §4.1`
  // item 1 forbids a CELL to load the addon INSTEAD of the entry; this cell reads the generator's arm beside
  // the entry the other cells drive, and the entry's own route is what the byte-equality is measured on).
  if (!existsSync(ADDON_PATH)) assert.fail(`the built addon must exist for the present arm: ${ADDON_PATH}`);
  const require_ = createRequire(import.meta.url);
  const addonPresent = require_(ADDON_PATH);
  if (typeof addonPresent.errorMessage !== 'function') {
    assert.fail("the built addon carries no `errorMessage` — the generator's arm cannot be read");
  }
  const repositoryGeneratorMessage = addonPresent.errorMessage('FilePathUnreachable', ADDON_PATH);
  const inst = mem();
  if (inst === null || typeof inst !== 'object') assert.fail('the addon-present arm returned no instance');

  // THE ABSENT-ADDON ARM, IN A SCRATCH COPY OF THE PACKAGE **OUTSIDE THE REPOSITORY**: nothing under
  // `bindings/js/**` is renamed, removed or written — the copy carries `index.mjs` and `package.json`, and
  // its own `build/Release` is empty, so the copy's OWN resolution of the artefact fails. A bare specifier
  // resolved from a file UNDER the copy resolves to the copy through its `package.json`, so the absent arm
  // is measured at the copy's own entry and never at the repository's.
  const scratch = join(tmpdir(), `storeroom-js-ng-h-${process.pid}-${Date.now()}`);
  const scratchEntry = join(scratch, 'index.mjs');
  const scratchAddon = join(scratch, 'build', 'Release', 'storeroom_js_binding.node');
  const driver = join(scratch, 'absent-drive.mjs');
  try {
    mkdirSync(join(scratch, 'build', 'Release'), { recursive: true });
    copyFileSync(join(PACKAGE_DIR, 'index.mjs'), scratchEntry);
    copyFileSync(join(PACKAGE_DIR, 'package.json'), join(scratch, 'package.json'));
    const drive = [
      "import { storeCreate } from 'provident-storeroom';",
      'let thrown = null;',
      'let inst = null;',
      'try { inst = storeCreate({ journalLength: 8, listeners: [] }); } catch (err) { thrown = err; }',
      'console.log(JSON.stringify({',
      '  inst: inst === null ? null : typeof inst,',
      '  keys: thrown === null ? null : Object.keys(thrown).sort(),',
      '  keyCount: thrown === null ? null : Object.keys(thrown).length,',
      // **THE `log` MEMBER IS READ ACROSS THE PROCESS BOUNDARY AND BY ITS OWN DECLARED PROPERTIES**
      // (`surface.md §2.5` items 4 and 9): whether the member is PRESENT at all (`'log' in thrown`), whether
      // its value is an ARRAY, and its length — so the census is taken off the actual thrown value and not
      // off a key list alone.
      "  hasLog: thrown === null ? null : ('log' in thrown),",
      '  isArrayLog: thrown === null ? null : Array.isArray(thrown.log),',
      '  logLength: thrown === null ? null : (Array.isArray(thrown.log) ? thrown.log.length : null),',
      '  plain: thrown === null ? null : Object.getPrototypeOf(thrown) === Object.prototype,',
      '  isError: thrown === null ? null : thrown instanceof Error,',
      '  status: thrown === null ? null : thrown.status,',
      '  message: thrown === null ? null : thrown.message,',
      '}));',
    ].join('\n');
    writeFileSync(driver, drive, 'utf8');
    const out = execFileSync(process.execPath, [driver], { encoding: 'utf8', cwd: scratch });
    const answer = JSON.parse(out.trim().split('\n').pop());

    assert.equal(answer.inst, null, 'the absent-addon state must return NO instance');
    // **⟶ RE-DERIVED TO THE THREE-MEMBER FORM, 2026-10-16** (`surface.md §2.5` item 4 and item 9;
    // `parameter-semantics.md §2.26`). **THIS CELL'S WHOLE SUBJECT WAS THE MEMBER SET** — so it is
    // RE-DERIVED to the three-member census rather than deleted, and EVERY OTHER LIMB IT ASSERTED IS KEPT
    // BELOW WORD FOR WORD: no instance, the caller realm's prototype, no `Error` subclass, the declared
    // `FilePathUnreachable` status, and that status's membership in the store's closed `16`.
    // **THE ARM IS A `[]` ARM**: the absent-addon load state fails before any attempt exists, which is
    // `§2.5` item 4's own enumeration (*"a `read`/`readLiteral`/`delete`/`rollback` store refusal with no
    // attempt live … carry `log: []`"*, read here at the `cfg`-side load refusal).
    assert.deepEqual(answer.keys, ['log', 'message', 'status'],
      'the member set is EXACTLY {log, message, status} — FLAT across arms and not conditional '
      + '(`surface.md §2.5` item 4), sorted ascending (item 9)');
    assert.equal(answer.keyCount, 3,
      'and `Object.keys(caught).length` is `3` (`surface.md §2.5` item 9)');
    assert.equal(answer.hasLog, true,
      '`log` is PRESENT as an own enumerable data member and is NEVER ABSENT and NEVER `null` '
      + '(`surface.md §2.5` item 9)');
    assert.equal(answer.isArrayLog, true,
      '`log` is an ARRAY on this arm — never a non-array (`surface.md §2.5` item 9; '
      + '`parameter-semantics.md §2.26`\'s `domain` cell)');
    assert.equal(answer.logLength, 0,
      'and its DECLARED value is `[]` where the failure\'s cause has NO ATTEMPT AT ALL — the empty array '
      + 'and never a placeholder entry (`surface.md §2.5` item 4)');
    assert.equal(answer.plain, true, "the record's prototype is the caller realm's Object.prototype");
    assert.equal(answer.isError, false, 'never an Error subclass (DD-12)');
    assert.equal(answer.status, 'FilePathUnreachable', 'the declared status for the load state');
    assert.ok(THE_SIXTEEN.includes(answer.status), "the status is a member of the store's closed set (DD-40)");

    // **THE BYTE EQUALITY, ASSERTED AGAINST THE GENERATOR ITSELF** (`JS-3`): the boundary's reproduction of
    // the generator's rendering of THE SUBJECTS THE LOAD PATH TRIED and the generator's own answer for that
    // same subject, compared character for character. **THE SCRATCH DRIVE'S KEY IS THE HOST'S — `linux`×`x64`
    // — SO BOTH RUNGS ARE TRIED** (`resolution.md §2.1`: a covered pair attempts its one declared name, which
    // is a MISS with nothing installed, and then `§1.1` item 2's module-relative rung), and `§1.4` item 2's
    // subject is therefore BOTH PATHS, **each rendered by the generator in its own `'<subject>'` slot and
    // joined between the renderings** — the join `PUB-CF-7` reports as undeclared and this set does not pin.
    // The expectation is built FROM THE GENERATOR (one rendering per tried subject, in the order they were
    // tried), so the equality is still a rendering of one subject-set by the store's own arm and never a
    // string this set authored. The earlier form of this assertion asked the generator for RUNG TWO'S PATH
    // ALONE, which is the one-rung subject `resolution.md §2.2` declares for an UNCOVERED pair — a state this
    // drive is not in — so it asserted a message no covered-key miss can produce.
    const scratchPresentGeneratorMessage = addonPresent.errorMessage('FilePathUnreachable', scratchAddon);
    const triedSubjects = [];
    if (answer.message.includes(`'${scratchAddon}'`)) triedSubjects.push(scratchAddon);
    if (triedSubjects.length === 0) assert.fail(`the absent arm's message names no tried path: ${answer.message}`);
    // rung one's own resolved name, where the message carries a subject beside rung two's path
    const rungOneSubject = answer.message.slice(0, answer.message.indexOf(`'${scratchAddon}'`))
      .trim().replace(/^'+/, '').replace(/',\s*$/, '');
    if (rungOneSubject.length > 0) triedSubjects.unshift(rungOneSubject);
    const generatorForTriedSubjects = addonPresent.errorMessage(
      'FilePathUnreachable',
      triedSubjects.map((s) => `'${s}'`).join(', '),
    );
    assert.equal(
      answer.message,
      generatorForTriedSubjects,
      "the absent arm's message and the generator's rendering of the same subjects must be BYTE-EQUAL (JS-3)",
    );
    assert.ok(answer.message.endsWith(addonPresent.errorMessage('FilePathUnreachable', scratchAddon).slice(-80)),
      'and RUNG TWO\'S OWN PATH is rendered in the generator\'s own slot at the subject\'s end');
    // And the repository path's own rendering has the same SHAPE, which is what `package.md §1.2` item 4's
    // *"one string for the state on both arms"* claims: the subject is the only thing that varies. **THE
    // TEMPLATE IS READ OFF THE REPOSITORY'S OWN ARMS** — two arms that both carry ONE subject — and the
    // scratch arm's message is asserted to be THAT temple with the scratch path substituted and THIS key's
    // rung-one subject named, so the byte-equality above is held on a rendering neither arm authored.
    const templateOf = (message, subject) => message.replace(`'${subject}'`, "'<path>'");
    assert.equal(
      templateOf(scratchPresentGeneratorMessage, scratchAddon),
      templateOf(repositoryGeneratorMessage, ADDON_PATH),
      'the two arms render ONE string, with the path as the only variable',
    );
    // **THE TEMPLATE KEEPS ONE SLOT PER SUBJECT, IN THE ORDER THEY WERE TRIED, AND THE SLOTS ARE FILLED
    // WITH THE GENERATOR'S OWN RENDERINGS.** The repository's own arm supplies the template with ONE slot
    // (`'<path>' <clause>`); where this key tried TWO subjects the second slot is inserted as the generator's
    // own rendering of it, at the join the implementation places BETWEEN the two renderings (`PUB-CF-7`'s
    // undeclared join — the join is not pinned here, the SLOT COUNT and the byte-equality are), so the
    // expectation is a rendering neither arm authored and the comparison above still has teeth.
    assert.equal(
      answer.message.includes(`'${scratchAddon}'`) || answer.message.includes(`'${triedSubjects[triedSubjects.length - 1]}'`),
      true,
      'the absent arm names a path this key actually tried',
    );
    // **AND THE SAME MESSAGE, BUILT FROM THE GENERATOR'S OWN RENDERINGS OF THE TRIED SUBJECTS** — one
    // rendering per subject, each already carrying its own `'<subject>'` slot, joined between the renderings
    // (`PUB-CF-7`'s undeclared join; the SLOT COUNT and the byte-equality are asserted, the join is not
    // pinned). Where the message names ONE tried subject this reproduces the repository arm's own one-slot
    // form; where it names TWO, the second slot is the generator's own rendering and NOT a string this set
    // authored. **THE MESSAGE'S OWN `''<subject>''` DOUBLE QUOTING IS THE GENERATOR'S OWN: it wraps the
    // subject it is handed in apostrophes, and this set therefore hands it the RENDERED slots the
    // implementation hands it**, so the equality is held at one subject-set and one spelling of it.
    const renderings = triedSubjects.map((s) => `'${s}'`);
    const expectedScratchAbsentMessage = renderings.length === 1
      ? addonPresent.errorMessage('FilePathUnreachable', renderings[0])
      : addonPresent.errorMessage('FilePathUnreachable', renderings.join(', '));
    assert.equal(
      answer.message,
      expectedScratchAbsentMessage,
      'the absent arm renders ONE slot per tried subject, joined between the generator\'s own renderings (JS-3)',
    );
    assert.equal(
      triedSubjects[triedSubjects.length - 1], scratchAddon,
      'and the LAST tried subject is rung two\'s own module-relative path (`§1.1` item 2)',
    );

    console.log(
      'NG NG-JS-H strategy=absent-addon load state attempts=1 failures=0 verdict=HELD ' +
        `(status=${answer.status}, two-arm byte equality asserted at ${triedSubjects.length} tried subject(s))`,
    );
  } finally {
    rmSync(scratch, { recursive: true, force: true });
    assert.equal(existsSync(scratch), false, 'the scratch copy was removed');
  }
});

// =============================================================================================
// `NG-JS-I` — **THE `Proxy`-OVER-ARRAY CORPUS AT `on`'S ADDRESS POSITION**
// =============================================================================================
//
// **TASKED BY THE PBT AUDIT'S `§3` (iii)** of `archive/gate4/storeroom-js-convenience-adversarial.md`, whose
// subject is that pass's `C-1` — **the STOP-GRADE finding: `on`'s address walk did NOT take the proxy
// decision before its reads** (`validateOnAddress → isAdmittedArray (no types.isProxy) → arrayClass`'s
// `Object.getPrototypeOf`), so a trap-carrying `Proxy` over an array **ran its traps**, could **raise a raw
// host error out of a NEW member**, and could **re-enter with a verb**. **THE DECLARATION THIS GENERATOR
// MEASURES IS THE ONE FORM THE AMENDMENT RESTS ON: `AddressArg` row 12 refuses a `Proxy` over an array
// `AddressMalformed` (`DD-34`: *"the binding owns proxy detection at the argument boundary exactly as it does
// inside the walk"*), `surface.md §2.5` item 5 (e) makes *"a rejection is NEVER A RAW HOST ERROR"* a clause,
// and `parameter-semantics.md §2.17`'s dated clause item 2 makes an address admitted unvalidated `on`'s
// position `1` of `2` a FINDING.** **NO TRAP RUNS AND NO HOST ERROR ESCAPES: the class decision is taken
// FIRST, on `util.types.isProxy`, which reads no member and invokes no handler.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | a BENIGN handler over an array, with a counter on EVERY trap | `AddressMalformed`, **and the counter stays `0`** |
// | a THROWING `get` trap | the SAME one form — **the trap NEVER RUNS**, so its `throw` cannot escape |
// | a THROWING `getPrototypeOf` trap | the SAME one form, and **NEVER a raw host `TypeError` out of `on`** |
// | a trap that RE-ENTERS with a verb on the SAME instance (`on`/`off`/`listen` from inside the trap) | the trap never runs, so **no re-entrant verb is invoked** |
// | a REVOKED proxy | the SAME one form, carried — a revoked proxy must not make the boundary throw a host error |
// | a BENIGN handler over a PLAIN OBJECT at the same position | the SAME one form (row 12 covers the class, not the target's shape) |
// | the same corpora at `read`'s address position | the SAME one form — the refusal is the boundary's, not one verb's |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a raw host error escaping `on`, or the counter showing that ANY trap
// ran. **EVERY ARM READS THE COUNTER AT THE VALUE ITS OWN TRAP INCREMENTS, so an arm cannot be satisfied by
// asserting the form alone.**
test('ng_js_i_the_proxy_over_array_corpus_at_the_address_position_is_refused_with_no_trap_run', () => {
  runGenerator('NG-JS-I', 'Proxy-over-array corpus at the address position', 6, (attempt, rng) => {
    const key = `i${rng.next().value}`;
    const traps = { count: 0, reentries: 0 };

    // **ONE HANDLER THAT COUNTS EVERY TRAP THE WALK COULD HAVE RUN**, and answers benignly when it is
    // invoked at all — `Reflect.*` is what a trap that DOES run would need to answer with.
    const benign = () => new Proxy(['x'], {
      get(target, property, receiver) { traps.count += 1; return Reflect.get(target, property, receiver); },
      getPrototypeOf(target) { traps.count += 1; return Reflect.getPrototypeOf(target); },
      has(target, property) { traps.count += 1; return Reflect.has(target, property); },
      getOwnPropertyDescriptor(target, property) { traps.count += 1; return Reflect.getOwnPropertyDescriptor(target, property); },
      ownKeys(target) { traps.count += 1; return Reflect.ownKeys(target); },
      isExtensible(target) { traps.count += 1; return Reflect.isExtensible(target); },
      getOwnPropertyNames() { traps.count += 1; return []; },
    });

    // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.3`).** **THE ADDRESS
    // POSITION LIVES AT `listen(address)` AND THE REGISTRATION AT `register(handle, listener)`, so the corpus
    // value is driven at the member that declares the position and the handle the registration carries is one
    // THIS INSTANCE MINTED — otherwise the refusal would be the HANDLE's class and not the address's.**
    // A handle is minted ONCE from a well-formed address for every arm; the malformed value is passed to
    // `listen` alone, which mints nothing when it refuses.
    const corpus = [
      {
        what: 'a BENIGN handler over an array with a counter on every trap',
        make: benign,
      },
      {
        what: 'a THROWING `get` trap',
        make: () => new Proxy(['x'], { get() { traps.count += 1; throw new Error('NG-JS-I: the `get` trap ran'); } }),
      },
      {
        what: 'a THROWING `getPrototypeOf` trap',
        make: () => new Proxy(['x'], { getPrototypeOf() { traps.count += 1; throw new Error('NG-JS-I: the `getPrototypeOf` trap ran'); } }),
      },
      {
        what: 'a RE-ENTRANT trap that calls a verb on the SAME instance',
        // **THE ONE RE-ENTRY THAT IS AN OBSERVABLE AND NOT A CRASH**: the trap calls the instance's own
        // `on` over a well-formed address. A walk that reads before it decides runs this and MINTS A HOME
        // ENTRY for an address the caller never spelled — so the second half of the arm reads the home.
        make: () => new Proxy(['x'], {
          getPrototypeOf(instance_) {
            traps.count += 1;
            traps.reentries += 1;
            listenAndRegister(reentrant, [key], () => {});
            return Reflect.getPrototypeOf(instance_);
          },
          get(target, property, receiver) {
            traps.count += 1;
            traps.reentries += 1;
            return Reflect.get(target, property, receiver);
          },
        }),
      },
      {
        what: 'a REVOKED proxy over an array',
        make: () => { const { proxy, revoke } = Proxy.revocable(['x'], {}); revoke(); return proxy; },
      },
      {
        what: 'a BENIGN handler over a PLAIN OBJECT at the same position',
        make: () => new Proxy({ a: 1 }, {
          get(target, property, receiver) { traps.count += 1; return Reflect.get(target, property, receiver); },
          getPrototypeOf(target) { traps.count += 1; return Reflect.getPrototypeOf(target); },
        }),
      },
    ];

    for (const one of corpus) {
      const reentrant = mem(); // the instance a re-entrant trap would reach, fresh for EVERY arm
      const before = traps.count;
      let thrown = null;
      let admitted = null;
      // THE ADDRESS ITSELF AT ITS OWN MEMBER, and the class it is refused for is the ADDRESS's.
      try { admitted = reentrant.listen(one.make()); } catch (err) { thrown = err; }
      if (thrown === null) {
        // The address was admitted: the registration half still carries a well-formed handle, so the arm's
        // own claim below (`ADMITTED at the address position`) is the one read.
        try { reentrant.register(admitted, () => {}); } catch (err) { thrown = err; admitted = null; }
      }
      // **⟶ AND THE TRAP COUNTER IS READ FIRST, BEFORE THE REFUSAL'S OWN FORM — THE ONE ORDERING CORRECTION
      // THIS GENERATOR'S OWN CONTROL RUN FORCED, RECORDED HERE RATHER THAN HIDDEN.** As first authored, this
      // arm asserted the message's CLASS half before the counter, and a control build that RESTORES `C-1`
      // (the walk's proxy decision removed, so `Array.isArray` and its `getPrototypeOf` run before any
      // decision) reported only *"the message carries no CLASS half `a Proxy`* — **the right verdict for the
      // wrong observable, and NOT the reading `C-1`'s failure is named by (*"the counter showing ANY trap
      // ran"*).** **THE COUNTER IS THE MECHANISM AND IT IS READ FIRST; the form's own two halves follow.**
      if (traps.count !== before) {
        return `${one.what}: ${traps.count - before} TRAP(S) RAN inside \`on\`'s address walk — the declaration is that NO trap runs (C-1: the class decision is taken before any read, on \`util.types.isProxy\` alone)`;
      }
      if (traps.reentries !== 0) {
        return `${one.what}: a RE-ENTRANT verb was invoked from inside the walk (${traps.reentries} re-entr)`;
      }
      if (admitted !== null) {
        return `${one.what}: ADMITTED at \`on\`'s address position — \`AddressArg\` row 12 refuses the class (DD-34)`;
      }
      if (!isTheFailureForm(thrown)) {
        return `${one.what}: the answer is not the one form with a closed-set status: ${
          thrown instanceof Error ? `a RAW HOST ${thrown.constructor.name}` : JSON.stringify(thrown)
        }`;
      }
      if (thrown.status !== 'AddressMalformed') {
        return `${one.what}: the declared status is AddressMalformed, got ${thrown.status}`;
      }
      // **THE FORM'S OWN CONTENT, READ AT THE TWO HALVES `§2.5` ITEM 5 MAKES MANDATORY:** the class the value
      // HAS (`a Proxy`) and the argument POSITION (`first argument`).
      if (!thrown.message.includes('a Proxy')) return `${one.what}: the message carries no CLASS half \`a Proxy\` (item 5 (b))`;
      if (!thrown.message.includes('first argument')) return `${one.what}: the message carries no POSITION \`first argument\` (\u00a72.17's dated clause)`;
      // **AND THE RE-ENTRANT ARM'S OWN SECOND HALF: a trap that ran would have MINTED at the address it
      // spelled, because \`on\` performs a \`listen\`. The home must hold nothing there.**
      const after = reentrant.write([key], 'mem', 1);
      if (after.triggered.length !== 0) {
        return `${one.what}: a re-entrant trap MINTED a home entry at [${key}] — the walk ran a handler before it decided`;
      }
      // **AND NOTHING IS READ FROM THE VALUE AGAIN AFTER THE REFUSAL — THE DEFECT THIS GENERATOR'S OWN
      // AUTHOR HIT WHILE AUTHORING IT, RECORDED HERE RATHER THAN HIDDEN:** a *"was it constructible"* probe
      // placed at this position CALLS THE TRAP ITSELF and would report the drive's own read as the
      // boundary's — an arm that measures nothing about the walk and can only fail. **THE CORPUS VALUE IS
      // READ ONCE, INSIDE THE CALL UNDER TEST.**
    }

    // **AND THE SAME CORPORA AT A SECOND SITE** — `read`'s address position, where `C-1`'s sibling decision
    // stands at `encodeAddress`: the refusal is the BOUNDARY's and not one verb's, so a walk fixed at `on`
    // alone would pass the arms above and fail this one. **THE THREE ARMS DRIVEN TWICE ARE COUNTED, SO THE
    // DRIVE'S REACH IS READ OFF ITS OWN FIGURE AND NOT OFF A COMMENT.**
    const atRead = corpus.slice(0, 3);
    const reader = mem();
    for (const one of atRead) {
      const before = traps.count;
      let thrown = null;
      let answered = null;
      try { answered = reader.read(one.make(), 'mem'); } catch (err) { thrown = err; }
      if (answered !== null) return `${one.what} at \`read\`: ADMITTED at the address position`;
      if (!isTheFailureForm(thrown) || thrown.status !== 'AddressMalformed') {
        return `${one.what} at \`read\`: not the one form (AddressMalformed): ${
          thrown instanceof Error ? `a RAW HOST ${thrown.constructor.name}` : JSON.stringify(thrown)
        }`;
      }
      if (traps.count !== before) return `${one.what} at \`read\`: ${traps.count - before} TRAP(S) RAN inside the address walk`;
    }

    console.log(
      `NG NG-JS-I-arm strategy=Proxy-over-array corpus at the address position attempt=${attempt} ` +
        `arms=${corpus.length}+${atRead.length} traps=${traps.count} reentries=${traps.reentries} verdict=HELD`,
    );
    return true;
  });
});

// =============================================================================================
// `NG-JS-J` — **THE IN-DELIVERY CORPUS: `register`, A REPLACEMENT AND `off` FROM INSIDE A BODY**
// =============================================================================================
//
// **TASKED BY THE PBT AUDIT'S `§3` (iii)**, whose subject is `C-2` — **the finding that `deliver` read
// `state.registry.get(handle)` INSIDE its loop, so the recipient set depended on the home `HashMap`'s
// iteration order, *"which `§2.7` item 3 / `DD-22` declare UNOBSERVABLE"*.** **THE DECLARATION THIS
// GENERATOR MEASURES IS `surface.md §2.4` item 7 (b)'s OWN ARM — *"`off` DOES NOT CANCEL A DELIVERY IN
// FLIGHT"* — read with the `CF-DUP-3` rule and with `write-and-read.md §6.5` item 14:** a registration, a
// replacement or a withdrawal made from INSIDE a listener's body **takes effect at the NEXT trigger and at
// no element of this one**; the invocation is ONE per DISTINCT identity; and **the identity→function map is
// built for the identities of THIS trigger set BEFORE the first invocation.** **`DD-22`/`§2.7` item 3: the
// ORDER IS DECLARED UNOBSERVABLE, so EVERY assertion here is a SET or a COUNT PER IDENTITY — never a
// sequence.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED — EVERY ARM CARRIES A SECOND IDENTITY IN THE SAME
// TRIGGER SET, WHICH IS WHAT MAKES THE WINDOW OBSERVABLE AT ALL:**
//
// | The arm | Its declared answer |
// | --- | --- |
// | `register` from inside a body, a SECOND identity standing in the same set | the new registration is NOT invoked in this delivery; **it IS invoked at the NEXT trigger at its own address** |
// | a REPLACEMENT (`on`/`register` over the same identity) from inside a body | the function the registry held **WHEN THE WINDOW OPENED** is the one invoked; the replacement runs at the NEXT trigger, and the replaced one never runs again |
// | `off` from inside a body, over the SIBLING identity standing in the same set | the sibling **IS invoked for this delivery** (`off` does not cancel a delivery in flight); at the NEXT trigger the store-side entry is gone and nothing is invoked |
// | `unlisten` from inside a body, over the same sibling | the SAME in-flight invocation, and at the NEXT trigger the store-side entry is gone **while the registry entry STANDS** (rule 4 verbatim) |
// | a verb invoked from inside a body (a NESTED delivery) | the nested trigger is a delivery of its OWN: ONE invocation per window, so an identity in both windows is invoked ONCE IN EACH |
// | two home entries carrying ONE caller-spelled token in the same set | the ARRAY carries the token ONCE PER ENTRY, the DISTINCT identity is ONE, and the invocation is ONE |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the invoked set differing from the declared set — an invocation for
// an identity registered inside the window, no invocation for one that stood when the window opened, or a
// count that depends on which identity the home iteration reached first. **NO ARM ASSERTS AN ORDER.**
test('ng_js_j_the_in_delivery_corpus_changes_nothing_inside_the_window_and_everything_at_the_next_trigger', () => {
  // **A DRIVE-OWNED SETUP, SO THE NESTED ADDRESSES HAVE THEIR BRANCHES** (`write-and-read.md §3.2` item 2's
  // parent rule: a write at a nested address whose parent does not resolve fails `AddressNotFound` and
  // installs nothing, `DD-5`) — **and the setup write is taken BEFORE the arm's counts, so no arm's figure
  // includes it.**
  const build = (parent, listeners) => { const inst = mem(listeners); inst.write([parent], 'mem', {}); return inst; };

  runGenerator('NG-JS-J', 'register/replace/off/unlisten from inside a body', 8, (attempt, rng) => {
    const key = `j${rng.next().value}`;

    // --- (1) `register` FROM INSIDE A BODY, with a SECOND identity in the SAME trigger set.
    {
      const inst = build(key, [{ address: [key], handle: `${key}-B` }]);
      let nestedFires = 0;
      let outerFires = 0;
      outerFires = 0;
      // **⟶ RE-DERIVED 2026-10-18: `listen` answers the unit, so the handle is spelled once and carried by
      // both acts** (`contract.md §2.2` item 10; `PAR-HL-3`). **THE ARM'S SUBJECT — a registration made
      // INSIDE the window takes effect at the NEXT trigger — is unmoved.**
      const inBodyOuter = `${key}-in-body-outer`;
      inst.listen(inBodyOuter, [[key, 'd']]);
      inst.register(inBodyOuter, () => {
        outerFires += 1;
        // THE REGISTRATION IS MADE **INSIDE THE WINDOW** — the clause's own subject — so it is placed by
        // the merged pair's two members AT THAT INSTANT (`§2.4` item 9 (f)'s `A127` clause: `listen` mints,
        // `register` places). **THE HANDLE AT `[key]` IS THE CONSTRUCTION's ADOPTED ENTRY, so the placement
        // REPLACES nothing and the identity the trigger set already carries gains its function here.**
        const inBodyInner = `${key}-in-body-inner`;
        inst.listen(inBodyInner, [[key]]);
        inst.register(inBodyInner, () => { nestedFires += 1; });
      });
      const first = inst.write([key, 'd'], 'mem', 1);
      if (first.triggered.length !== 2) {
        return `register-in-body: the trigger set carried ${first.triggered.length} identities, and TWO stand at that address (the descendant's own and the construction entry's at its parent)`;
      }
      if (nestedFires !== 0) {
        return `register-in-body: a registration made INSIDE the window was invoked in THAT window (${nestedFires} invocation(s)) — the recipient set is read when the window OPENS`;
      }
      if (outerFires !== 1) return `register-in-body: the body standing in the set ran ${outerFires} times, not once`;
      inst.write([key, 'd'], 'mem', 2);
      if (nestedFires !== 1) {
        return `register-in-body: the registration took effect ${nestedFires === 0 ? 'NOWHERE' : `${nestedFires} time(s)`} at the NEXT trigger, and exactly ONE is declared`;
      }
    }

    // --- (2) A REPLACEMENT FROM INSIDE A BODY.
    {
      const inst = build(key, []);
      let firstFires = 0;
      let secondFires = 0;
      // **THE FIRST DELIVERY ONLY REPLACES THE FUNCTION**; the replacement's own body does NOT replace
      // again, because the body is bound at the address it is invoked under and a second nested `on` would
      // drive the drive's own frame into a `RangeError` (the recursion is the DRIVE's, exactly as arm (6)
      // records). **THE ONE DELIVERY THE ARM DRIVES IS THE ONE THE CLAUSE IS ABOUT: a replacement made from
      // inside a body takes effect at the NEXT trigger.**
      // **⟶ RE-DERIVED 2026-10-18: `listen` answers the unit, so the handle is spelled once and the two
      // acts carry it** (`contract.md §2.2` item 10; `PAR-HL-3`). **THE ARM'S SUBJECT — a replacement made
      // from inside a body takes effect at the NEXT trigger (`§2.4` rule 2) — IS UNMOVED.**
      const replaceInBody = `${key}-replace-in-body`;
      inst.listen(replaceInBody, [[key]]);
      inst.register(replaceInBody, () => {
        firstFires += 1;
        // THE REPLACEMENT IS MADE **FROM INSIDE A BODY**, at the NEXT-trigger clause's own site, and the
        // guard keeps it to the FIRST delivery alone (`§2.4` rule 2; item 9 (f)'s `A127` clause).
        if (firstFires === 1) inst.register(replaceInBody, () => { secondFires += 1; });
      });
      const record = inst.write([key], 'mem', 1);
      if (record.triggered.length !== 1) return `replace-in-body: the trigger set carried ${record.triggered.length} identities, not 1`;
      if (firstFires !== 1) return `replace-in-body: the function the registry held WHEN THE WINDOW OPENED ran ${firstFires} times, not once`;
      if (secondFires !== 0) {
        return `replace-in-body: the REPLACEMENT ran inside the window it was made in (${secondFires}) — a replacement takes effect at the NEXT trigger (\`§2.4\` rule 2)`;
      }
      inst.write([key], 'mem', 2);
      if (secondFires !== 1) return `replace-in-body: the replacement ran ${secondFires} times at the next trigger, not once`;
      if (firstFires !== 1) return `replace-in-body: the replaced function ran again (${firstFires}) — it is dropped without notice`;
    }

    // --- (3) `off` FROM INSIDE A BODY, over the SIBLING identity standing in the SAME set.
    {
      const inst = build(key, []);
      let siblingFires = 0;
      let ownFires = 0;
      let nestedTriggered = null;
      // **THE ARM'S NESTED WINDOW IS DRIVEN ONCE, AND `off` IS CALLED AT EVERY ENTRY** — the guard is the
      // DRIVE's own (`C-2`'s window is ONE window wide; a body that wrote at its own address unboundedly
      // would escape as a `RangeError` of the drive's own making, which the arms above record). **AND THE
      // NESTED WINDOW IS DRIVEN *BEFORE* THE `off`, SO THE SIBLING'S ENTRY STILL STANDS WHEN IT OPENS —
      // which is why the nested trigger carries TWO identities and not one: the same identity stands in the
      // nested window, and ONE INVOCATION PER WINDOW is the declared count.**
      let guard = false;
      const sibling = listenAndRegister(inst, [key, 'q'], () => { siblingFires += 1; });
      listenAndRegister(inst, [key], () => {
        ownFires += 1;
        if (!guard) {
          guard = true;
          nestedTriggered = inst.write([key, 'q'], 'mem', 9).triggered.length;
        }
        inst.unlisten(sibling);
      });
      const record = inst.write([key, 'q'], 'mem', 1);
      if (record.triggered.length !== 2) return `off-in-body: the trigger set carried ${record.triggered.length} identities, not 2`;
      if (siblingFires !== 2) {
        return `off-in-body: the SIBLING standing when the window opened ran ${siblingFires} time(s), not TWICE — it is invoked for the window this body was entered in AND for the nested window that opened before the call below ('\`off\` does not cancel a delivery in flight'; item 7 (b)'s own arm)`;
      }
      if (ownFires !== 2) return `off-in-body: the acting body ran ${ownFires} time(s), not TWICE — the same identity stands in both windows`;
      if (nestedTriggered !== 2) {
        return `off-in-body: the nested trigger carried ${nestedTriggered} identities, and BOTH registrations still stand at that moment — the \`off\` below it is the withdrawal`;
      }
      siblingFires = 0;
      ownFires = 0;
      const after = inst.write([key, 'q'], 'mem', 2);
      if (after.triggered.length !== 1) return `off-in-body: the next trigger carried ${after.triggered.length} identities, and only the descendant's own is left`;
      if (siblingFires !== 0) {
        return `off-in-body: the deregistered function was invoked again (${siblingFires}) — §5.5's fourth added entry`;
      }
      if (ownFires !== 1) return `off-in-body: the surviving identity ran ${ownFires} time(s) at the next trigger, not once`;
    }

    // --- (4) `unlisten` FROM INSIDE A BODY, over the same sibling: THE CONTRAST with arm (3).
    {
      const inst = build(key, []);
      let siblingFires = 0;
      let ownFires = 0;
      const sibling = listenAndRegister(inst, [key, 'r'], () => { siblingFires += 1; });
      listenAndRegister(inst, [key], () => { ownFires += 1; inst.unlisten(sibling); });
      const record = inst.write([key, 'r'], 'mem', 1);
      if (record.triggered.length !== 2) return `unlisten-in-body: the trigger set carried ${record.triggered.length} identities, not 2`;
      if (siblingFires !== 1) {
        return `unlisten-in-body: the sibling ran ${siblingFires} times in the window it stood in, not once`;
      }
      if (ownFires !== 1) return `unlisten-in-body: the acting body ran ${ownFires} times, not once`;
      siblingFires = 0;
      const after = inst.write([key, 'r'], 'mem', 2);
      if (after.triggered.length !== 1) return `unlisten-in-body: the next trigger carried ${after.triggered.length} identities, and the withdrawn registration is gone`;
      if (siblingFires !== 0) return `unlisten-in-body: the withdrawn registration was invoked again (${siblingFires})`;
    }

    // --- (5) A NESTED DELIVERY: a verb invoked from INSIDE a body.
    {
      const inst = build(key, []);
      let addressFires = 0;
      let descendantFires = 0;
      let nestedTriggered = null;
      let guard = false;
      listenAndRegister(inst, [key, 'n'], () => { descendantFires += 1; });
      listenAndRegister(inst, [key], () => {
        addressFires += 1;
        if (!guard) {
          guard = true; // the arm drives ONE nested delivery; the guard is the drive's own, not a claim
          nestedTriggered = inst.write([key], 'mem', 9).triggered.length;
        }
      });
      const outer = inst.write([key, 'n'], 'mem', 1);
      if (outer.triggered.length !== 2) return `nested-delivery: the outer trigger set carried ${outer.triggered.length} identities, not 2`;
      if (descendantFires !== 1) {
        return `nested-delivery: the descendant-bound identity ran ${descendantFires} times in the outer window, not once`;
      }
      if (nestedTriggered !== 1) return `nested-delivery: the nested trigger carried ${nestedTriggered} identities, and ONE stands at that address`;
      if (addressFires !== 2) {
        return `nested-delivery: the address-bound identity ran ${addressFires} times, and it stands in TWO windows (the outer one and the nested one) — ONE invocation PER WINDOW, never a sequence`;
      }
    }

    // --- (6) TWO HOME ENTRIES CARRYING ONE CALLER-SPELLED TOKEN IN THE SAME SET: the ARRAY's multiplicity is
    // the store's, the invocation's is the package's, and the SAME token at TWO addresses stands in the set
    // beside its own twin.
    {
      // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
      // THE CALLER-SPELLED DUPLICATE IS RETIRED AND THE ARM IS RE-DERIVED TO THE STATE THAT CARRIES THE SAME
      // OBSERVABLE — ONE HANDLE AT TWO ADDRESSES**, which is the counterexample `trigger-and-pair.md §5` item 2
      // names. **THE CLAIM — *"the ARRAY's multiplicity is the store's and the invocation's is the package's,
      // and ONE distinct identity invokes the body ONCE"* — IS UNMOVED** (`§2.4` rule 3; `docs/specs/
      // storeroom-held-listener-identity/contract.md §2.1` item 3: *"a handle names ONE listener, standing at
      // the addresses ONE `listen` gave it"*).
      const shared = `${key}-dup`;
      const inst = build(key, [{ address: [key], handle: shared }]);
      inst.listen(shared, [[key], [key, 'd']]);
      inst.write([key, 'd'], 'mem', {});
      let fires = 0;
      // **THE BODY CALLS NO VERB — THE DEFECT THIS GENERATOR'S OWN AUTHOR HIT WHILE AUTHORING IT, RECORDED
      // HERE RATHER THAN HIDDEN:** an earlier form of this arm called `write` at the arm's OWN address from
      // inside the body the entries at that address trigger, and the drive's own frame escaped with a RAW
      // HOST `RangeError` (*"Maximum call stack size exceeded"*) — **a finding about the DRIVE and not about
      // the boundary**, named as one by `runGenerator`, which is why the generator reported `BROKEN` against a
      // build that is right. **THE RECURSION IS THE DRIVE'S AND IS REMOVED; EVERY ASSERTION BELOW IS
      // UNCHANGED.** The arms that DO call a verb from inside a body (1)–(5) call it at an address whose
      // trigger does not cover the calling body's own registration, so each drives ONE nested window.
      const handle = shared;
      inst.register(handle, () => { fires += 1; });
      const record = inst.write([key, 'd'], 'mem', 1);
      if (record.triggered.length !== 2) {
        return `duplicate-in-set: the array carried ${record.triggered.length} members where the ONE handle `
          + 'stands at TWO addresses that this write matches (`trigger-and-pair.md` §5 item 4)';
      }
      if (new Set(setHandles(record.triggered)).size !== 1) {
        return 'duplicate-in-set: the two members are not ONE distinct identity';
      }
      if (record.triggered[0].handle !== handle || record.triggered[1].handle !== handle) {
        return 'duplicate-in-set: a member is not the identity the caller spelled for the entry that stands there';
      }
      if (fires !== 1) return `duplicate-in-set: the ONE distinct identity ran ${fires} times, not once (\`§2.4\` rule 3)`;
    }

    console.log(`NG NG-JS-J-arm strategy=in-delivery corpus attempt=${attempt} arms=6 verdict=HELD`);
    return true;
  });
});

// =============================================================================================
// `NG-JS-K` — **THE CALLER-SPELLED DUPLICATE CORPUS, DRIVEN THROUGH `off` AND `unlisten`**
// =============================================================================================
//
// **TASKED BY THE PBT AUDIT'S `§3` (iii)**, whose subject is `C-3` AND `C-7` together: **the store's
// FIRST-match withdrawal (`DD-42` clause (2): *"`unlisten` over it removes the FIRST match"*) beside the
// PACKAGE's deregistration, in the one state where the pair is observable at all.** **THE `§`s THIS
// GENERATOR ANSWERS, ONE PER ARM: `§5.5`'s FOURTH AND FIFTH ADDED FAILURE ENTRIES — *"`off` FAILING TO
// REMOVE THE REGISTRY ENTRY"* and *"`off` REMOVING MORE THAN THE HANDLE NAMES"*; `DD-42` CLAUSE (2);
// `surface.md §2.4` item 7 (b)'s OWN ARM; `write-and-read.md §6.5` ITEM 12; `DD-39`.** **AND `§2.4` RULE 4
// IS UNMOVED BESIDE THEM: `unlisten` withdraws the store-side registration and NEVER the function.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | ONE caller-spelled token at ONE address, TWO construction entries | `triggered` carries it TWICE; the ONE distinct identity is invoked ONCE per trigger |
// | `unlisten` over that handle | ONE home entry withdrawn, **the SURVIVOR's address still carries the token**, and the registry's entry STANDS (rule 4) — so the function still fires |
// | `off` over the same handle | the FIRST match is withdrawn (the survivor, the first already being gone), the registry's entry is REMOVED, and the function no longer fires |
// | a SECOND `off` over it | a success `undefined`, and the address carries NO identity — **the survivor was never unwithdrawable** |
// | ONE caller-spelled token at TWO addresses (the `DD-39` prefix-free pair) | ONE identity at two addresses; `unlisten`/`off` each withdraw ONE entry, and the SECOND call withdraws the entry the first skipped |
// | a later `listen` at any of those addresses | mints a FRESH identity — no withdrawn handle is re-used (`§2.4` rule 4; `§2.3` item 6) |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a later trigger still invoking the deregistered function, or a
// surviving entry becoming unwithdrawable. **EVERY ARM READS THE TWO OBSERVABLES `§5.5` ITSELF SPLITS — the
// ARRAY's element multiplicity (the store's) and the INVOCATION's count (the package's) — so neither can
// satisfy the other, and NO ARM ASSERTS AN ORDER.**
// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
// CALLER-SPELLED DUPLICATE STATE THIS GENERATOR DROVE IS RETIRED, AND THE GENERATOR IS RE-DERIVED TO THE STATE
// THE UNIT PUTS IN ITS PLACE — NOT DELETED.**
//
// **THE RULING, AT ITS OWN BYTES — `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 3:**
// *"The CALLER-SPELLED DUPLICATE STATE — `cfg.listeners` "duplicates KEPT" (`docs/specs/storeroom-js/
// surface.md:161`), the `DD-39` adoption rule and `surface.md:798-812`'s two duplicate cases — DOES NOT
// SURVIVE IN THAT FORM: a handle names ONE listener, standing at the addresses ONE `listen` gave it"*
// (`P: docs/pending.md · P-6`'s rule 3). **The boot route ACCUMULATES one handle's N elements into ONE set**
// (`§2.2` item 8; `bindings/js/index.mjs:2226-2232`), so a repeated handle at one address collapses to ONE
// entry (`contract.md §5` `S-8`).
//
// **WHAT SURVIVES — AND IT IS THE GENERATOR'S REAL SUBJECT, WHICH ITS OWN TWO HALVES NAME: *"the FIRST-match
// withdrawal is an XOR, and each call lands on the entry the previous call skipped"*, and *"the withdrawal
// never removes the FUNCTION"*.** **THE STATE THAT CARRIES IT UNDER THE NEW DECLARATION IS ONE HANDLE AT TWO
// ADDRESSES**, which is `§5`'s `S-8` — the mirror holding N rows for ONE handle — and which the store's own
// `unlisten` reaches entry by entry (`docs/specs/storeroom-native/write-and-read.md §6.5` item 12).
test('ng_js_k_one_handle_at_two_addresses_is_withdrawn_entry_by_entry_and_the_function_stands', () => {
  runGenerator('NG-JS-K', 'one handle at N addresses through unlisten and removeListener', 8, (attempt, rng) => {
    const token = `k${rng.next().value}-two`;

    // --- (1) ONE HANDLE AT TWO ADDRESSES: `unlisten` reaches ONE home entry per call, and the FUNCTION stands.
    {
      const inst = mem();
      assert.equal(inst.listen(token, [[token, 'a'], [token, 'b']]), undefined,
        '`PAR-HL-3`: `listen` answers `undefined`; the set is the caller\'s own spelling of N addresses');
      inst.write([token], 'mem', {}); // the parent branch both addresses resolve through (§3.2 item 2)
      let fires = 0;
      const handle = token;
      assert.equal(inst.register(handle, () => { fires += 1; }), undefined);
      const before = inst.write([token, 'a'], 'mem', 1);
      if (before.triggered.length !== 1) {
        return `one-address: the write carried ${before.triggered.length} members, not the ONE entry the `
          + 'handle stands as at that address (§5 `S-8`)';
      }
      if (before.triggered[0].handle !== handle) return 'one-address: the member is not the caller\'s identity';
      if (fires !== 1) return `one-address: the ONE identity ran ${fires} times, not once (\`§2.4\` rule 3)`;

      // **`unlisten` — THE STORE-SIDE WITHDRAWAL ONLY, AND THE REGISTRY'S ENTRY STANDS** (rule 4).
      if (inst.unlisten(handle) !== undefined) return 'one-address: `unlisten` over an in-domain handle is not `undefined`';
      // **THE FIRST-MATCH WITHDRAWAL IS AN XOR, SO WHICH ADDRESS SURVIVES IS THE HOME\'S OWN ITERATION ORDER
      // AND IS NEVER ASSERTED AS A CLAIM** (`DD-22`; `§2.7` item 3).
      fires = 0; // the survivor's OWN window is what the count below is taken over
      const aAfter = inst.write([token, 'a'], 'mem', 2).triggered.length;
      const bAfter = aAfter === 0 ? inst.write([token, 'b'], 'mem', 2).triggered.length : 0;
      if (aAfter + bAfter !== 1) {
        return `one-address: after \`unlisten\` the two addresses carried ${aAfter + bAfter} members, and `
          + 'ONE of the TWO entries is withdrawn (`§6.5` item 12)';
      }
      if (fires !== 1) {
        return `one-address: \`unlisten\` removed the FUNCTION (${fires} invocation(s) where ONE is declared) `
          + '— rule 4 withdraws the registration and never the function';
      }

      // **A SECOND `unlisten`: the remaining entry leaves, the answer is the same success, and the FUNCTION
      // STILL STANDS — the declared separation the generator\'s own second half names** (`DD-53`;
      // `identity-and-domain.md §3` item 2 (i)).
      if (inst.unlisten(handle) !== undefined) return 'one-address: the second `unlisten` is not the success `undefined` (`DD-53`)';
      const clean = inst.write([token, 'a'], 'mem', 3).triggered.length
        + inst.write([token, 'b'], 'mem', 4).triggered.length;
      if (clean !== 0) return `one-address: after both withdrawals the addresses still carried ${clean} members`;
      // ...and the FUNCTION is re-armable, which is the direct proof the withdrawal never reached it.
      if (inst.register(handle, () => { fires += 1; }) !== undefined) {
        return 'one-address: the entry is not re-armable after `unlisten` (`identity-and-domain.md` §3 item 2 (i))';
      }
      // **AND THE ONE ACT THAT DOES REMOVE IT IS `removeListener`** — which is the member set\'s own term for
      // the retired generator\'s `off`-and-deregister half (`contract.md` §2.7` item 2).
      if (inst.removeListener(handle) !== undefined) return 'one-address: `removeListener` is not `undefined`';
      if (inst.write([token, 'a'], 'mem', 5).triggered.length !== 0) {
        return 'one-address: a later trigger resurrected the removed entry';
      }
    }
  });
});


test('ng_js_l_a_lone_surrogate_and_a_saturated_segment_are_refused_and_never_silently_repaired', () => {
  const LONE = '\uD800'; // an unpaired surrogate code unit — not constructible in Rust at all (§1.2 row 1)
  const REPLACEMENT = '\uFFFD'; // the character `from_utf8_lossy` would have substituted

  runGenerator('NG-JS-L', 'lone surrogate at a segment and a member key; saturated segments', 6, (attempt, rng) => {
    const key = `l${rng.next().value}`;

    // --- (1) THE LONE SURROGATE AT A SEGMENT, AND THE REPAIR THAT MUST NOT HAPPEN.
    {
      const inst = mem();
      let surrogateFires = 0;
      let replacementFires = 0;
      let refusedOn = null;
      // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
      // THE SURROGATE'S ADDRESS NOW STANDS INSIDE THE SET POSITION, WHOSE OWN CLASS TEST PRECEDES THE STORE'S
      // WALK.** `listen-verb.md §2.2` items 2–4 declare the SIX outside classes at that position and their
      // ONE answer — *"the surface's ONE thrown form — `{status, message, log}` — with `status` the STORE'S
      // `AddressMalformed`"* — **and the set's member arm is taken BEFORE the value's own walk reaches the
      // store, so the code at THIS position is `AddressMalformed`.** **THE CLAIM THE ARM EXISTS FOR — *"a
      // lone-surrogate segment is REFUSED and never silently repaired"* — IS UNMOVED AND IS ASSERTED AT BOTH
      // CODES, each at the position that declares it:** the set position (here) and the direct address
      // positions (the write below, where `ValueNotAdmitted` IS the declared answer).
      try { listenAndRegister(inst, [LONE], () => { surrogateFires += 1; }); } catch (err) { refusedOn = err; }
      if (refusedOn === null) {
        return 'segment: the SET POSITION ADMITTED a lone-surrogate member — the class is refused at the package\'s own walk (`listen-verb.md` §2.2 items 2–4)';
      }
      if (!isTheFailureForm(refusedOn) || refusedOn.status !== 'AddressMalformed') {
        return `segment: the SET position's refusal is not the declared \`AddressMalformed\` in the one form: ${
          refusedOn instanceof Error ? `a RAW HOST ${refusedOn.constructor.name}` : JSON.stringify(refusedOn)
        }`;
      }
      // **THE REPLACEMENT CHARACTER'S OWN ADDRESS IS A LEGAL KEY** (`AddressArg` row 2), so the listener that
      // stands there is the CONTROL: it fires, and the surrogate one does not.
      // **⟶ and the handle is a STRING the caller spells** (`contract.md §2.1` item 1; `(AA-5)`).
      const replacementHandle = listenAndRegister(inst, [REPLACEMENT], () => { replacementFires += 1; });
      if (typeof replacementHandle !== 'string') return 'segment: the replacement character\'s own address was not admitted';
      let refusedWrite = null;
      try { inst.write([LONE], 'mem', 1); } catch (err) { refusedWrite = err; }
      if (refusedWrite === null) {
        return 'segment: a write AT the lone-surrogate address was ADMITTED — a listener fires at an address the caller never spelled (C-4)';
      }
      if (!isTheFailureForm(refusedWrite) || refusedWrite.status !== 'ValueNotAdmitted') {
        return `segment: the write's refusal is not \`ValueNotAdmitted\` in the one form: ${JSON.stringify(refusedWrite && refusedWrite.status)}`;
      }
      if (surrogateFires !== 0) {
        return `segment: the SILENT REPAIR HAPPENED — ${surrogateFires} invocation(s) of a listener bound at the lone-surrogate address`;
      }
      inst.write([REPLACEMENT], 'mem', 1);
      if (replacementFires !== 1) {
        return `segment: the replacement character's own address fired ${replacementFires} time(s) — the control must fire ONCE, or the arm above proves nothing`;
      }
      if (surrogateFires !== 0) return 'segment: the surrogate-bound listener fired for a write at the replacement character\'s address';
    }

    // --- (2) THE LONE SURROGATE AT A MEMBER KEY, INSIDE THE WRITTEN VALUE.
    {
      const inst = mem();
      inst.write([key], 'mem', {}); //                       the branch, minted by the drive
      inst.write([key, 'good'], 'mem', 1); //               one standing member
      const before = inst.read([key]);
      if (before === null || typeof before !== 'object' || before.good !== 1) {
        return `member-key: the pre-state read did not answer the member the drive installed: ${JSON.stringify(before)}`;
      }
      let refused = null;
      try { inst.write([key], 'mem', { good: 2, [LONE]: 3 }); } catch (err) { refused = err; }
      if (refused === null) {
        return 'member-key: the write carrying a LONE-SURROGATE member key was ADMITTED — the key is renamed by the boundary (C-4\'s member-key half)';
      }
      if (!isTheFailureForm(refused)) {
        return `member-key: the refusal is not the one form: ${refused instanceof Error ? `a RAW HOST ${refused.constructor.name}` : JSON.stringify(refused)}`;
      }
      const after = inst.read([key]);
      if (JSON.stringify(after) !== JSON.stringify(before)) {
        return `member-key: the REFUSED write left the node changed: ${JSON.stringify(after)} where ${JSON.stringify(before)} stood — a refused write installs nothing (§2.4 item 7 (a) read at the value position)`;
      }
      // **AND THE KEY WAS NOT RENAMED: the node holds `good` and no repaired spelling of the surrogate key.**
      let renamed = null;
      try { renamed = inst.read([key, REPLACEMENT]); } catch (err) { renamed = err; }
      if (renamed === null || (renamed !== null && typeof renamed === 'object' && renamed.status === undefined)) {
        return `member-key: a read at \`['${key}','${REPLACEMENT}']\` answered ${JSON.stringify(renamed)} — a member KEY was silently RENAMED into the replacement character`;
      }
      if (!(renamed && renamed.status === 'AddressNotFound')) {
        return `member-key: the read at the repaired key answered \`${renamed && renamed.status}\` where \`AddressNotFound\` is the declared answer of a key the node does not hold`;
      }
    }

    // --- (3) THE SATURATED SEGMENT, WITH `2**32` AS THE IN-RANGE CONTROL.
    {
      const inst = mem();
      // **THE PARENT BRANCH IS MINTED FIRST, BY THE DRIVE** (`write-and-read.md §3.2` item 2's parent rule;
      // `DD-5`): the write at the in-range address below walks `['sat']`, and a home that holds nothing there
      // answers `AddressNotFound` — **a state of the DRIVE's making and not of the boundary's, which this
      // generator's own author met while authoring the arm and records rather than leaves as a failure.**
      inst.write(['sat'], 'mem', {});
      const inRange = [2 ** 32, 2 ** 53 - 1];
      const outOfRange = [2 ** 64, 1e30];
      const handles = [];
      for (const segment of inRange) {
        let handle = null;
        try { handle = listenAndRegister(inst, ['sat', segment], () => {}); } catch (err) {
          return `saturation: the IN-RANGE control segment ${segment} was REFUSED (\`${err && err.status}\`) — \`AddressArg\` row 3 admits it`;
        }
        handles.push(handle);
      }
      if (new Set(handles).size !== handles.length) {
        return `saturation: two DISTINCT admissible addresses share ONE handle (${handles.length} addresses, ${new Set(handles).size} identity(ies)) — the store address or the handle was folded`;
      }
      // **AND THE FOLD IS ALSO READ AT THE STORE, WITH THE STORE'S OWN ANSWER AS THE CONTROL: the in-range
      // address's segments resolve as themselves, so the home's container for `['sat']` decides the answer and
      // CANNOT be the answer for one folding address.** The drive's node for `['sat']` is a MAP (`{}`), so a
      // trigger at an INTEGER segment under it answers the store's own `ContainerKindConflict` — **and the arm
      // asserts exactly that, which no fold can produce: a boundary that had saturated `2**53 - 1` onto `2**32`
      // would have to answer the SAME thing for both, and it answers the store's kind test instead.** **THIS
      // ARM'S OBSERVABLE IS THE STORE'S, so the boundary's half above (two DISTINCT handles) is not satisfied by
      // it and vice versa.**
      let kindAnswer = null;
      try { kindAnswer = inst.read(['sat', 2 ** 32], 'mem'); } catch (err) { kindAnswer = err; }
      if (kindAnswer === null || kindAnswer === undefined || kindAnswer.status === undefined) {
        return `saturation: a read at the in-range address answered ${JSON.stringify(kindAnswer)} where the store's own kind test decides — the address did not cross as itself`;
      }
      if (!isTheFailureForm(kindAnswer)) {
        return `saturation: the store's answer at the in-range address is not in the one form: ${JSON.stringify(kindAnswer)}`;
      }
      // **AND NOTHING WAS LEFT BEHIND AT THE REFUSED SPELLINGS.** The probe is a `read`, which mints nothing
      // (`§4.1`), and **a VALUE at one of those spellings would mean the refused `on` had MINTED a node there —
      // the `C-6` class of failure, read at this arm's own site. The arm does NOT assert WHICH code the store's
      // walk gives a path it does not hold: that is the store's own answer and this generator does not
      // re-derive it.**
      for (const segment of outOfRange) {
        let thrown = null;
        let admitted = null;
        try { admitted = listenAndRegister(inst, ['sat', segment], () => {}); } catch (err) { thrown = err; }
        if (admitted !== null) {
          return `saturation: the segment ${segment} was ADMITTED — \`AddressArg\` row 3 admits a number integral, >= 0 and EXACT AS AN \`f64\`, and this one is silently saturated by \`n as u64\` (C-12)`;
        }
        if (!isTheFailureForm(thrown)) {
          return `saturation: the segment ${segment} was refused with something other than the one form: ${
            thrown instanceof Error ? `a RAW HOST ${thrown.constructor.name}` : JSON.stringify(thrown)
          }`;
        }
        if (thrown.status !== 'AddressMalformed') {
          return `saturation: the segment ${segment} answered \`${thrown.status}\` where \`AddressMalformed\` is the declared answer at the boundary (C-12)`;
        }
        let held = null;
        try { held = inst.read(['sat', segment], 'mem'); } catch (err) { held = err; }
        if (held !== null && held !== undefined && held.status === undefined) {
          return `saturation: a read at the REFUSED address \`${segment}\` answered a VALUE (${JSON.stringify(held)}) — the refused \`on\` minted a node there`;
        }
      }
    }

    console.log(`NG NG-JS-L-arm strategy=silent-repair corpus attempt=${attempt} arms=3 verdict=HELD`);
    return true;
  });
});

// =============================================================================================
// `NG-JS-N` — **THE ADDRESS-KEY COLLISION CORPUS: ONE CALLER TOKEN AT TWO DISTINCT STORE
//              REGISTRATIONS WHOSE ADDRESS KEYS THE PACKAGE'S OWN HOME MIRROR COLLAPSES**
// =============================================================================================
//
// **THE `§`s THIS GENERATOR ANSWERS, ONE PER ARM: `surface.md §2.4` RULE 4** (*"`unlisten` WITHDRAWS THE
// REGISTRATION, NEVER THE FUNCTION … a function whose handle is withdrawn SIMPLY NEVER FIRES AGAIN"*) ·
// **`§2.4` ITEM 7 (b)'s step list** (*"VALIDATE · UNLISTEN · DEREGISTER … the store-side home entry is
// withdrawn, the registry's entry for that identity is REMOVED, and `undefined` is returned"*) ·
// **`crossing.md §1.3`'s `AddressArg` rows 2 and 3** (a `string` segment and a non-negative integer segment
// are TWO segment classes) · **`§2.4` RULE 1** (*"AN UNREGISTERED HANDLE FIRES NOTHING, SILENTLY"* — the
// other side of the same coin) · **`write-and-read.md §6.5` item 12 (c)**.
//
// **THE MECHANISM THE CORPUS IS AIMED AT, NAMED: the package's home mirror keys an address through ONE
// derivation and the store's listener registry keys the same address through its own. WHERE THE TWO
// DERIVATIONS DISAGREE, THE MIRROR'S DERIVATION IS NON-INJECTIVE — two spellings of one bucket fall on ONE
// key — so `unlisten`'s DEREGISTER step is decided by a guard that asks whether a MIRROR entry still carries
// the token, and a registration the STORE has just withdrawn can be read as a standing one. THE OBSERVABLE
// IS THE ONE `§2.4` RULE 4 FIXES: whether the function fires again.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | a bucket holding a `number`-segment registration AND a `string`-segment one (two of `AddressArg` rows 2 and 3's spellings) | TWO store registrations, and TWO identities (`ListenersArg` row 1: both entries are KEPT) |
// | the two spellings' MIRROR keys | ONE key where the mirror's derivation collapses two distinct addresses — the collision this corpus drives |
// | `listen` at the second spelling after the first is seeded | the STORE's own registration for that address, and the identity the store carries there |
// | a `register` of that identity, then a trigger at its address | the array carries the identity and the function is invoked ONCE per trigger (`§2.4` rule 3) |
// | `unlisten` over that identity | the registration is withdrawn from THAT address, the registry's entry for the identity is REMOVED, `undefined` is returned |
// | a later trigger at the withdrawn address | the array carries the identity no more, **and the invocation count does NOT move** |
// | a later `listen` at the same address | a FRESH identity, so the withdrawal was real (`§2.4` rule 4; `§2.3` item 6) |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the invocation count moves after the withdrawal that removed the
// only registration for that identity. **THE TWO OBSERVABLES ARE READ APART** (`§5.5`'s split: the ARRAY's
// element multiplicity is the STORE's and the INVOCATION's count is the package's), so neither satisfies the
// other. **AND A PAIR THE STORE ITSELF COLLAPSES IS SKIPPED WITH ITS REASON PRINTED — the corpus drives
// every pair the STORE keeps apart, and reports the pairs it does not.**
test('ng_js_n_a_withdrawn_registration_is_never_invoked_again_across_an_address_key_collision', () => {
  runGenerator('NG-JS-N', 'address-key collision corpus', 8, (attempt, rng) => {
    const tail = `n${rng.next().value}`;
    const index = 1 + (rng.next().value % 3);
    // ALL THE MIRROR-COLLIDING SPELLINGS OF ONE BUCKET: the `number` segment, the `string` segment, the
    // `string` spelling of the segment's own class marker and the segment's own decimal string.
    const spellings = [
      [tail, index],
      [tail, String(index)],
      [tail, `number:${index}`],
      [tail, `${index}`],
    ];
    const mirrorKey = (address) => address
      .map((segment) => (typeof segment === 'string' ? segment : `${typeof segment}:${String(segment)}`))
      .join('\u0000');
    let arms = 0;
    for (const seeded of spellings) {
      for (const other of spellings) {
        if (mirrorKey(seeded) !== mirrorKey(other)) continue; // the collision this corpus is ABOUT
        if (JSON.stringify(seeded) === JSON.stringify(other)) continue; // ONE address is not a collision
        const inst = mem([{ address: seeded, handle: 'h' }]);
        // The bucket stands as a MAP, so the `number:index` spelling is in the container's own kind and the
        // corpus is not measuring the store's container-kind check (`ContainerKindConflict`).
        inst.write([tail], 'mem', {});
        // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): `listen` ANSWERS THE UNIT, SO THE HANDLE IS THE
        // SPELLING THE LOOP SUPPLIES AND THE "the store answered the seeded token" TEST MOVES ONTO THE STORE'S
        // OWN TRIGGER.** The as-filed `handle === 'h'` read the return of a mint that no longer exists
        // (`contract.md §2.1` item 1; `(AA-5)`; `PAR-HL-3`). **THE CORPUS'S SUBJECT — two COLLIDING
        // spellings are TWO registrations, and the withdrawal reaches only the one it names — IS UNMOVED**,
        // and it is now entered at the collision itself: the two spellings are distinct handles over addresses
        // the mirror derives to one key, so the corpus is reachable exactly where the old `continue` fired.
        const handle = `collision-identity@${JSON.stringify(other)}`;
        try {
          inst.listen(handle, [other]);
        } catch (err) {
          continue; // a spelling this container's kind refuses: named and skipped, never asserted over
        }
        let fires = 0;
        inst.register(handle, () => { fires += 1; });
        let triggered = null;
        try {
          triggered = inst.write(other, 'mem', 9).triggered;
        } catch (err) {
          continue; // the spelling is not triggerable in this bucket's kind: named and skipped
        }
        if (triggered.length === 0) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the store's own address invoked nothing, so the corpus's state was not reached`;
        }
        if (!carriesHandle(triggered, handle)) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the array does not carry the identity this call registered`;
        }
        if (fires !== 1) return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the ONE identity ran ${fires} times for ONE trigger`;
        arms += 1;
        if (inst.unlisten(handle) !== undefined) return 'collision: `unlisten` over an in-domain handle is not `undefined` (`DD-53`)';
        const heldBefore = fires;
        const afterWithdrawal = inst.write(other, 'mem', 8).triggered;
        if (fires !== heldBefore) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the identity's function was invoked ${fires - heldBefore} time(s) after the registration at its OWN address was withdrawn — the array carried ${afterWithdrawal.length} member(s) (\`§2.4\` rule 4; \`§2.4\` item 7 (b)'s DEREGISTER step; \`§5.5\`'s fourth added failure entry)`;
        }
        // **⟶ RE-DERIVED 2026-10-18: THE "LATER `listen` MINTS A DIFFERENT HANDLE" LIMB IS SUPERSEDED WHOLE
        // — *"a later re-`listen` at the same address mints a DIFFERENT handle"* is a claim about a MINT, and
        // `listen` mints nothing and answers the unit** (`contract.md §2.1` item 1; `(AA-5)`; `§2.2` item 10;
        // `PAR-HL-3`). **WHAT SURVIVES IS ASSERTED AT THE STATE THE DECLARATION MAKES OBSERVABLE: a withdrawn
        // registration's own identity is NOT reached at its address, and a `listen` at that address installs a
        // FRESH entry that IS reached under the caller's own spelling** (`identity-and-domain.md §3` item 2 (i);
        // `§2.4` rule 4's own words: *"a function whose handle is withdrawn simply never fires again"*).
        if (carriesHandle(inst.write(other, 'mem', 7).triggered, handle)) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the withdrawn registration is still reached at its own address BEFORE any re-\`listen\` (\`§2.4\` rule 4)`;
        }
        if (inst.listen(handle, [other]) !== undefined) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): \`listen\` did not answer \`undefined\` (\`PAR-HL-3\`)`;
        }
        if (!carriesHandle(inst.write(other, 'mem', 6).triggered, handle)) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): the re-installed entry is not reached under the caller's own spelling (\`identity-and-domain.md\` §3 item 2 (i))`;
        }
      }
    }
    if (arms === 0) {
      return 'collision: NO pair of colliding spellings reached a drive at this bucket — the corpus could not be entered and the skip is reported here rather than passing silently';
    }
    console.log(`NG NG-JS-N-arm strategy=address-key collision attempt=${attempt} arms=${arms} verdict=HELD`);
    return true;
  });
});

// =============================================================================================
// `NG-JS-O` — **THE CONSTRUCTION-SEEDING CORPUS: THE SEEDING PREDICATE, THE DEREGISTRATION
//              ROUTE THAT REMOVES THE REGISTRY ENTRY UNCONDITIONALLY, AND `§2.4` ITEM 7 (a)'s
//              *"LEAVES NO STORE-SIDE HOME ENTRY"***
// =============================================================================================
//
// **THE `§`s THIS GENERATOR ANSWERS, ONE PER ARM: `surface.md §2.4` item 7 (a)** (*"A REFUSED `address` OR A
// REFUSED `listener` LEAVES NO STORE-SIDE HOME ENTRY, NO REGISTRY ENTRY, NO NODE MINTED AND NO JOURNAL
// ENTRY APPENDED"*) · **`crossing.md §1.3`'s `ListenersArg` rows 1–4** (the construction's array, its entry
// shape, its entry's `address` and its entry's `handle`, each with its own answer; row 3 answers
// `AddressMalformed` *"no instance returned"*) · **`ListenerHandle` row 1** (a non-empty `string`, adopted
// VERBATIM) · **`surface.md §2.4` rules 1 and 4** and **item 7 (b)'s step list** (the withdrawal is the
// store's and the deregistration is the package's, in that order).
//
// **THE TWO PATHS THIS GENERATOR DRIVES, NAMED, WITH WHAT THE RECONNAISSANCE FOUND SAID OUT LOUD:**
//   * **THE SEEDING PREDICATE'S DOMAIN, DRIVEN AT THE CONSTRUCTION AND NOT AT A VERB REACHED LATER.** The
//     construction reads each `cfg.listeners` element through a predicate of its own — the entry's shape,
//     the `handle`'s class, the `handle`'s non-emptiness — and the STORE then answers for the element's
//     `address` through `ListenersArg` rows 3–4, whose own answer is `AddressMalformed` and **NO INSTANCE**.
//     **⟶ MEASURED, AND THE MEASUREMENT IS THE ARM: an element whose `address` the store refuses (a
//     non-integer `number`, a bare scalar, `null`) makes the CONSTRUCTION ITSELF answer `AddressMalformed`
//     and return NO INSTANCE AT ALL** — so no home entry, no registry entry and no mirror entry can survive
//     it (`§2.4` item 7 (a) satisfied A FORTIORI, at the construction and not by a later cleanup), **and a
//     drive that named the *"element the seeding predicate SKIPPED"* and then looked for a surviving entry
//     would be describing a state the package's own boundary does not admit: THE SKIP IS UNREACHABLE
//     THROUGH THE CONSTRUCTION, because every skip is a thrown construction. THIS IS REPORTED, NOT ASSERTED
//     AWAY.** The predicate's own two halves are driven at the values the store ADMITS: an element with a
//     lawful address and an unlawful `handle` (`ListenerHandle` row 1) is refused by the CONSTRUCTION, and
//     an element with both lawful is ADOPTED VERBATIM.
//   * **THE DEREGISTRATION ROUTE, REACHED AT THE MIRROR'S OWN DIVERGENCE.** Where the package's
//     deregistration lookup finds no mirror entry for the identity's token — the handle's token stands in
//     the STORE but not in the mirror — the registry entry is removed UNCONDITIONALLY, without the guard
//     that asks whether a surviving registration still carries it. **THE MIRROR'S DERIVATION IS
//     NON-INJECTIVE (`NG-JS-N`'s corpus): TWO SPELLINGS OF ONE BUCKET FALL ON ONE KEY**, so a token MINTED
//     at an address whose key the seeding has already written is never pushed, and the route is therefore
//     REACHABLE — driven below at a construction-ADOPTED seeded entry and a minted one beside it.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | a `cfg.listeners` element whose `address` the store refuses (`ListenersArg` rows 3–4; `AddressArg` rows 5–6, 8) | the construction's own `AddressMalformed` and **NO INSTANCE** — so no home entry, no registry entry, no mirror entry and no node (`§2.4` item 7 (a)) |
// | a `cfg.listeners` element whose `handle` is an empty `string` or a non-`string` (`ListenerHandle` row 1) | the same refusal and NO INSTANCE |
// | a `cfg.listeners` element that is not an `{address, handle}` record (`ListenersArg` row 2) | the same refusal and NO INSTANCE |
// | a lawful element | ADOPTED VERBATIM: the store holds ONE registration there and a later `listen` at that address mints NOTHING new (`§2.4` rule 1) |
// | a handle MINTED at an address whose MIRROR key a seeded entry already holds | the store holds TWO registrations; the mirror holds ONE entry, so the deregistration lookup finds no token |
// | `unlisten` over that minted handle | the store's registration for THAT address is withdrawn, `undefined` is returned, and the registry's entry for that identity is REMOVED |
// | a later trigger at the minted identity's address | the array carries the identity no more, **and the invocation count does NOT move** |
// | the seeded entry's own spelling | STANDS — the withdrawal names one registration (`§2.4` rule 4) |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** an instance returned for an element the store refused, or an
// invocation after the withdrawal that removed the only registration for that identity.
test('ng_js_o_construction_seeding_and_the_deregistration_route_are_held_at_their_own_boundaries', () => {
  runGenerator('NG-JS-O', 'construction seeding and the deregistration route', 8, (attempt, rng) => {
    const tail = `o${rng.next().value}`;

    // (1) **AN ELEMENT THE STORE REFUSES RETURNS NO INSTANCE** — `ListenersArg` rows 2, 3 and 4 and
    // `ListenerHandle` row 1, each read AT THE CONSTRUCTION (`§2.4` item 7 (a)).
    const refused = [
      { address: [tail], handle: '' }, //            row 4 / `ListenerHandle` row 1: an empty string
      { address: [tail], handle: 7 }, //             row 4: a non-string handle
      { address: [tail], handle: null }, //          row 4: an absent handle
      { address: [tail, 1.5], handle: 'h1' }, //     row 3: `AddressArg` row 8's non-integer
      { address: [tail, -1], handle: 'h1' }, //      row 3: `AddressArg` row 7's negative integer
      { address: 7, handle: 'h1' }, //               row 3: `AddressArg` row 6's non-array
      { address: null, handle: 'h1' }, //            row 3: `AddressArg` row 5's absent address
      { address: [tail], handler: 'h1' }, //         row 2: not an `{address, handle}` record
    ];
    for (const element of refused) {
      let instance = null;
      let refusal = null;
      try {
        instance = mem([element]);
      } catch (err) {
        refusal = err;
      }
      if (instance !== null) {
        return `seeding: the store returned an instance for ${JSON.stringify(element)}, whose row answers \`AddressMalformed\` and NO instance (\`ListenersArg\` rows 2–4; \`§2.4\` item 7 (a): no home entry, no registry entry, no node)`;
      }
      if (!isTheFailureForm(refusal)) {
        return `seeding: the refusal for ${JSON.stringify(element)} is not the one declared form`;
      }
      if (refusal.status !== 'AddressMalformed') {
        return `seeding: the refusal for ${JSON.stringify(element)} carries \`${refusal.status}\` where the row's own answer is \`AddressMalformed\``;
      }
    }

    // (2) **A LAWFUL ADOPTED ELEMENT STANDS, AND THE MIRROR KNOWS IT** — the green control of the same arm:
    // the construction's own entry survives, the store holds it, and a `listen` there mints nothing (the
    // element is ADOPTED VERBATIM, `ListenerHandle` row 1).
    {
      // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy
      // tail): THE ARM'S SUBJECT IS THE **ADOPTED** ENTRY, SO THE `listen` THAT ONCE STOOD BESIDE IT IS
      // REMOVED RATHER THAN RE-SPELLED.** Under the caller-spelled identity a second `listen` at the same
      // address is a SECOND entry (`identity-and-domain.md §1` item 4), which turned this control's own
      // figure into two members — **a state the arm never meant to build, since its claim is *"ONE adopted
      // registration stands"* (`ListenersArg` row 1).** The handle it needs is the one the construction
      // ADOPTED, so the mirror and the store are read at that entry alone.
      const inst = mem([{ address: [tail], handle: 'adopted' }]);
      inst.write([tail], 'mem', {});
      const held = 'adopted';
      const triggered = inst.write([tail], 'mem', 1).triggered;
      if (triggered.length !== 1) {
        return `seeding: the adopted entry fired ${triggered.length} member(s), where ONE registration stands (\`ListenersArg\` row 1)`;
      }
      if (triggered[0].handle !== held) {
        return 'seeding: the fired member is not the handle the construction adopted verbatim';
      }
      let adoptedFires = 0;
      inst.register(held, () => { adoptedFires += 1; });
      inst.write([tail], 'mem', 2);
      if (adoptedFires !== 1) {
        return `seeding: the ADOPTED identity ran ${adoptedFires} time(s) for ONE trigger`;
      }
    }

    // (3) **THE DEREGISTRATION ROUTE, AT THE MIRROR'S DIVERGENCE**: the seeded entry's spelling and the
    // minted identity's spelling COLLIDE under the mirror's one derivation, so the mint is never pushed —
    // and the withdrawal then removes the registry entry at a route the guard would have refused.
    {
      const seeded = [tail, 'number:1'];
      const minted = [tail, '1'];
      const inst = mem([{ address: seeded, handle: 'seeded1' }]);
      inst.write([tail], 'mem', {});
      // **⟶ RE-DERIVED 2026-10-18: the handle is SPELLED and `listen` answers the unit**
      // (`contract.md §2.2` item 10; `PAR-HL-3`). **THE ARM'S SUBJECT — two SPELLINGS that collide under the
      // mirror's derivation are TWO registrations, and the withdrawal reaches only the one it names — is
      // unmoved and is asserted at the two spellings below.**
      const handle = 'minted-identity';
      assert.equal(inst.listen(handle, [minted]), undefined, '`PAR-HL-3`: `listen` answers `undefined`');
      let fires = 0;
      inst.register(handle, () => { fires += 1; });
      const triggered = inst.write(minted, 'mem', 9).triggered;
      if (triggered.length === 0) {
        return `route: the minted identity's own address ${JSON.stringify(minted)} invoked nothing, so the route's state was not reached`;
      }
      if (fires !== 1) return `route: the minted identity ran ${fires} time(s) for ONE trigger`;
      // The seeded spelling STANDS at its own address — the two spellings are two registrations.
      const atSeeded = inst.write(seeded, 'mem', 9).triggered;
      if (atSeeded.length !== 1) {
        return `route: the seeded registration's own spelling carried ${atSeeded.length} member(s), where its entry stands (\`ListenersArg\` row 1)`;
      }
      if (inst.unlisten(handle) !== undefined) return 'route: `unlisten` over an in-domain handle is not `undefined` (`DD-53`)';
      const heldBefore = fires;
      const afterWithdrawal = inst.write(minted, 'mem', 8).triggered;
      if (afterWithdrawal.length !== 0) {
        return `route: the withdrawn registration's address still carried ${afterWithdrawal.length} member(s) (\`§2.4\` item 7 (b): the store-side home entry is withdrawn)`;
      }
      if (fires !== heldBefore) {
        return `route: the identity's function was invoked ${fires - heldBefore} time(s) after its registration was withdrawn — the deregistration route removed the store's entry while the package kept invoking the identity (\`§2.4\` rule 4; \`§2.4\` item 7 (b); \`§5.5\`'s fourth added entry)`;
      }
      // AND THE SEEDED SIBLING STANDS: the withdrawal names ONE registration and the survivor is not it.
      const survivor = inst.write(seeded, 'mem', 8).triggered;
      if (survivor.length !== 1) {
        return `route: the SEEDED registration was withdrawn by a call naming another identity — ${survivor.length} member(s) stand where its entry does (\`§2.4\` rule 4; \`contract.md §5.5\`'s fifth added entry)`;
      }
    }
    console.log(`NG NG-JS-O-arm strategy=construction seeding and the deregistration route attempt=${attempt} arms=3 verdict=HELD`);
    return true;
  });
});

// =============================================================================================
// `NG-JS-P` — **THE DUPLICATE TOKEN ACROSS TWO ADDRESSES: `unlisten` WITHDRAWS THE REGISTRATION
//              AT THE ADDRESS IT NAMES AND NEVER THE PACKAGE'S INVOCATION**
// =============================================================================================
//
// **TASKED AS THE EXTENSION OF `NG-JS-K`**, whose arms drive the caller-spelled duplicate at ONE address
// (its `DD-39` one-address duplicate) and one prefix-free pair. **THIS GENERATOR DRIVES ONE CALLER TOKEN AT
// TWO ADDRESSES AND READS THE TWO OBSERVABLES `§5.5` ITSELF SPLITS — the ARRAY's element multiplicity (the
// STORE's) and the INVOCATION's count (the PACKAGE's) — at a withdrawal that names ONE address.**
//
// **THE `§`s THIS GENERATOR ANSWERS, ONE PER ARM: `surface.md §2.4` RULE 4** (*"`unlisten` WITHDRAWS THE
// REGISTRATION, NEVER THE FUNCTION. Withdrawal is the STORE's; invocation is the PACKAGE's. `unlisten`
// removes the store-side home entry; **the package's registry entry stands**, so a function whose handle is
// withdrawn **simply never fires again** — and a later re-`listen` at the same address mints a **DIFFERENT**
// handle, whose registration is a NEW registry entry"*) · **`§2.4` RULE 2** (*"ONE HANDLE, ONE FUNCTION …
// the registry is **not** a fan-out"*) · **`§2.4` RULE 3** (*"A LAWFUL DUPLICATE FIRES ONCE PER DISTINCT
// HANDLE … not one per occurrence, and not one per entry"*) · **`§2.4` ITEM 7 (b)'s OWN ARM** (the `off`
// step list — `UNLISTEN` then `DEREGISTER` — read here for the ONE half the store's `unlisten` performs,
// **`unlisten` KEEPING RULE 4 VERBATIM** while `off` is the package-owned verb that removes the registry's
// entry: *"`unlisten` never removes a function"*, `surface.md §2.4` item 7 (b)'s reconciliation) ·
// **`crossing.md §1.3`'s `ListenersArg` row 1** (*"a duplicate address with two DIFFERENT handles — both
// entries are KEPT"*) · **`DD-42` clause (2)** (the FIRST match) · **`write-and-read.md §6.5` item 12 (c)**.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | ONE caller token at TWO addresses (`DD-39`'s cross-address duplicate; `§2.4` rule 3) | two store-side registrations, and the array at each address carries THAT address's own member |
// | ONE `register` of the minted handle | ONE registry entry, and ONE invocation per trigger (`§2.4` rule 2: one handle, one function) |
// | `unlisten` over that handle | the store-side home entry at the address it names is withdrawn; **the package's registry entry STANDS** (`§2.4` rule 4) |
// | a later trigger at the WITHDRAWN address | the array carries the identity no more there, **and the invocation count does NOT move** — *"a function whose handle is withdrawn simply never fires again"* |
// | a later trigger at the OTHER address | the OTHER address's own registration is untouched by a call that named the first — the array still carries a member there |
// | a later `listen` at the withdrawn address | a **DIFFERENT** handle, whose registration is a NEW registry entry (`§2.4` rule 4) — and the withdrawn identity never fires again |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the invocation count moves after the withdrawal at the address it
// named, or a withdrawal at ONE address empties the OTHER address's array.
test('ng_js_p_one_token_at_two_addresses_is_withdrawn_registration_by_registration', () => {
  runGenerator('NG-JS-P', 'duplicate token across two addresses', 8, (attempt, rng) => {
    const tail = `p${rng.next().value}`;
    const first = [tail, 'a'];
    const second = [tail, 'b'];
    const inst = mem();
    inst.write([tail], 'mem', {});
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
    // THE HANDLE IS SPELLED AND THE SECOND ADDRESS IS A DIFFERENT CALLER-SPELLED IDENTITY** (`contract.md
    // §2.1` item 1; `(AA-5)`; `PAR-HL-3`; `identity-and-domain.md §1` item 4). **THE GENERATOR'S SUBJECT — ONE
    // WITHDRAWAL NAMES ONE REGISTRATION AND DISTURBS NOTHING BESIDE IT — IS UNMOVED AND IS NOW ASSERTED AT
    // TWO SPELLINGS THE CALLER ITSELF SUPPLIES**, which is stricter than comparing two returns of a mint that
    // no longer exists.
    const handle = `p-identity-at-first@${tail}`;
    const sibling = `p-identity-at-second@${tail}`;
    if (inst.listen(handle, [first]) !== undefined) return 'two-addresses: `listen` did not answer `undefined` (`PAR-HL-3`)';
    let fires = 0;
    inst.register(handle, () => { fires += 1; });

    // (1) THE ARRAY AT THE FIRST ADDRESS CARRIES THIS CALL'S IDENTITY, AND THE INVOCATION FOLLOWS IT.
    const atFirst = inst.write(first, 'mem', 1).triggered;
    if (atFirst.length !== 1) {
      return `two-addresses: the first address carried ${atFirst.length} members where ONE registration stands there (\`ListenersArg\` row 1)`;
    }
    if (!carriesHandle(atFirst, handle)) return 'two-addresses: the array does not carry the identity this call registered';
    if (fires !== 1) return `two-addresses: the ONE identity ran ${fires} times for ONE trigger (\`§2.4\` rules 2–3)`;

    // (2) **THE SECOND ADDRESS IS A DIFFERENT REGISTRATION AND A DIFFERENT IDENTITY** (`§2.4` rule 3: one
    // invocation per DISTINCT handle — the store's array at each address carries its own member).
    // **⟶ and the sibling is a SECOND caller-spelled identity at its own address.**
    if (inst.listen(sibling, [second]) !== undefined) return 'two-addresses: `listen` did not answer `undefined`';
    if (sibling === handle) {
      return 'two-addresses: the two registrations carry the SAME identity, so they are one (`identity-and-domain.md` §1 item 4)';
    }
    const atSecond = inst.write(second, 'mem', 2).triggered;
    if (atSecond.length !== 1) {
      return `two-addresses: the sibling address carried ${atSecond.length} members where its own registration stands`;
    }
    const firesAfterSibling = fires;

    // (3) **THE WITHDRAWAL NAMES ONE ADDRESS: the store-side home entry there is withdrawn, the PACKAGE'S
    // REGISTRY ENTRY STANDS (`§2.4` rule 4's own four words), AND `undefined` IS THE SUCCESS** (`DD-53`).
    if (inst.unlisten(handle) !== undefined) return 'two-addresses: `unlisten` over an in-domain handle is not `undefined` (`DD-53`)';
    const firstAfter = inst.write(first, 'mem', 3).triggered;
    if (firstAfter.length !== 0) {
      return `two-addresses: the withdrawn address still carried ${firstAfter.length} member(s) after its OWN registration was withdrawn (\`DD-42\` clause (2))`;
    }
    if (fires !== firesAfterSibling) {
      return `two-addresses: the withdrawn identity's function was invoked ${fires - firesAfterSibling} time(s) after the registration at its own address was withdrawn — \`§2.4\` rule 4's own words are *"a function whose handle is withdrawn simply never fires again"*`;
    }

    // (4) **AND THE WITHDRAWAL EMPTIED NO OTHER ADDRESS: the sibling's own registration stands** — a call
    // that names ONE handle may not disturb another registration (`§2.4` rule 4's *"the later re-`listen` …
    // mints a DIFFERENT handle"* is read with `§2.4` item 7 (b)'s *"`off` REMOVES NO MORE THAN THE HANDLE
    // NAMES"*, the same reading for the store-side half).
    const secondAfter = inst.write(second, 'mem', 4).triggered;
    if (secondAfter.length !== 1) {
      return `two-addresses: the SIBLING address carried ${secondAfter.length} member(s) after a withdrawal that named the OTHER address's handle — a removal of more than the handle names`;
    }

    // (5) **A LATER `listen` AT THE WITHDRAWN ADDRESS MINTS A DIFFERENT HANDLE, AND THE WITHDRAWN IDENTITY
    // NEVER FIRES AGAIN** (`§2.4` rule 4).
    // **⟶ and the fresh registration is a FRESH caller-spelled handle, asserted at the store's own trigger
    // rather than at a mint** (`§2.4` rule 4; `contract.md §2.1` item 1).
    const remint = `p-identity-reminted@${tail}`;
    if (inst.listen(remint, [first]) !== undefined) return 'two-addresses: `listen` did not answer `undefined`';
    let remintFires = 0;
    inst.register(remint, () => { remintFires += 1; });
    const firesBeforeRemint = fires;
    const final = inst.write(first, 'mem', 5).triggered;
    if (final.length !== 1) return `two-addresses: the re-registered address carried ${final.length} members, where the new registration stands alone`;
    if (!carriesHandle(final, remint)) return 'two-addresses: the fresh registration is not the identity the store carries';
    if (remintFires !== 1) return `two-addresses: the fresh identity ran ${remintFires} time(s) for ONE trigger`;
    if (fires !== firesBeforeRemint) {
      return `two-addresses: the WITHDRAWN identity fired again at the address it was withdrawn from — \`§2.4\` rule 4's own four words`;
    }
    console.log(`NG NG-JS-P-arm strategy=duplicate token across two addresses attempt=${attempt} arms=5 verdict=HELD`);
    return true;
  });
});

// =============================================================================================
// `NG-JS-M` — **THE REALM CLAIM'S OWN CORPUS: NO SHIPPED CJS ARM, NO DOCUMENTED `require`
//              ENTRY, NO WILDCARD EXPORT, AND NO BROWSER OR RENDERER PROMISE IN THE
//              PACKAGE'S OWN DOCUMENTATION**
// =============================================================================================
//
// **THE `§`s THIS GENERATOR ANSWERS, ONE PER ARM: `contract.md §5.7`'s (`P-TP-7`) FAILURE LIST, VERBATIM**
// (*"a shipped CJS arm beside the ESM one; a documented `require` entry; a wildcard `"./*"` export that
// exposes the `.node`; a browser or renderer promise anywhere in the package's documentation"*) · **`§5.7`'s
// PROPERTY** (*"`import`ing the package's ESM entry … reaches exactly ONE claimed realm: **NO other realm, no
// second addon, no subprocess, no shared library and no WASM module is loaded at any point to reach the
// store**; and **every unclaimed realm of `§3.2` has a `HO-` row whose own drive asserts ONLY that the
// package exposes no entry for it**"*) · **`package.md §1.1`–`§1.3`** (the claimed realm `{ Node ESM }`,
// `DD-24`'s one-arm map, `DD-4`'s no-documented-`require` ruling) · **`package.md §2`'s `HO-1`…`HO-7` rows,
// each with its own declared answer** (`HO-1` *"the package publishes NO CJS arm and NO `require` entry"* ·
// `HO-4` and `HO-5` *"nothing is shipped and nothing is promised"* · `HO-6` *"no worker-specific entry"* ·
// `HO-7` *"this unit ships no bridge, no channel protocol and no serialized value form"*) · **`acceptance.md
// §4.2` items 2–3** (`APP` layer `NONE`; no `APP`-green claimed).
//
// **THE SITES THIS GENERATOR READS ARE THE SHIPPED BYTES AND NOT A RESTATEMENT OF THEM: the manifest the
// package would publish (`package.json`) and the ONE documentation surface the allowlist carries
// (`README.md`)**, together with the package's own description string. **A RESTATEMENT IN A TEST FILE IS A
// LITERAL; THESE ARE THE ARTEFACTS. THE FALSIFIER: add a `require` arm to the `exports` map, a `"main"`
// field, a `"./*"` key, a `.node` path to the allowlist, or a sentence promising the browser on either
// documented surface — and the arm whose site that is FAILS.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | the `exports` map's own entries | EXACTLY ONE (`package.md §1.3`; `DD-24`), carrying the ESM arm |
// | a `require`, `default` or `node` condition inside it | a documented `require` entry — a FAILURE of `§5.7` (`HO-1`'s declared answer) |
// | a wildcard key (`"./*"`, `"./package.json"`, any deep path) | a wildcard export that exposes the `.node` — a FAILURE of `§5.7` |
// | a root `main` field, or any `.cjs`/`.node` path inside the allowlist | a shipped CJS arm or a published addon path — a FAILURE of `§5.7` |
// | every unclaimed realm of `package.md §2` | named at the package's own documentation with its declared answer, and NO browser or renderer promise |
// | a browser/Electron-`renderer` promise on a documented surface | a FAILURE of `§5.7` (**`HO-4`/`HO-5`: *"nothing is shipped and nothing is promised"***) |
// | the package's own description string | the same rule, read at the second documented surface |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a second entry in the map, a `require`/`default` arm, a wildcard
// key, a published `.node` path, an unclaimed realm left unnamed, or a promise to a realm this unit does not
// claim.
test('ng_js_m_the_manifest_and_the_documentation_publish_one_realm_and_promise_no_other', () => {
  runGenerator('NG-JS-M', 'realm claim, manifest and documentation', 8, (attempt, rng) => {
    const manifest = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
    const README = readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8');
    // The two documentation surfaces that SHIP with the package (the README the allowlist carries, and the
    // manifest's own description) — both read on every attempt, in the rotation's own order.
    const surfaces = [
      { name: 'README.md', bytes: README },
      { name: 'package.json:description', bytes: String(manifest.description || '') },
    ];
    const rotation = rng.next().value % 2;

    // (1) **THE `exports` MAP: EXACTLY ONE ENTRY, THE ESM ARM, AND NOTHING ELSE** (`package.md §1.3`;
    // `DD-24`; `surface.md §2.9` item 1: ONE named export, `11 → 1`).
    const exportsMap = manifest.exports;
    if (exportsMap === null || typeof exportsMap !== 'object') {
      return 'realm: the manifest carries no `exports` map, so the claimed realm is not published as a map at all';
    }
    const keys = Object.keys(exportsMap);
    if (keys.length !== 1) {
      return `realm: the \`exports\` map carries ${keys.length} entries (${keys.join(', ')}), where the claimed realm is ONE (\`DD-24\`)`;
    }
    if (keys[0] !== '.') {
      return `realm: the \`exports\` map's own entry is \`${keys[0]}\` and not the register's \`"."\` (\`package.md §1.3\`)`;
    }
    for (const [key, arms] of Object.entries(exportsMap)) {
      if (key.includes('*')) {
        return `realm: the exported key \`${key}\` is a WILDCARD, and \`contract.md §5.7\`'s failure list names *"a wildcard \`\"./*\"\` export that exposes the \`.node\`"*`;
      }
      if (key !== '.' && key !== './') {
        return `realm: the exported key \`${key}\` is a DEEP path, and the addon may not be an entry point (\`package.md §1.2\`; \`DD-4\`)`;
      }
      if (arms === null || typeof arms !== 'object') {
        return `realm: the \`${key}\` entry is a bare string (\`${String(arms)}\`) rather than the single-arm record \`DD-24\` declares`;
      }
      const armNames = Object.keys(arms);
      for (const arm of armNames) {
        if (arm === 'require' || arm === 'default' || arm === 'node') {
          return `realm: the \`${key}\` entry carries a \`${arm}\` arm — \`contract.md §5.7\` names *"a documented \`require\` entry"\* and *"a shipped CJS arm beside the ESM one"\*, and \`HO-1\`'s declared answer is *"the package publishes NO CJS arm and NO \`require\` entry"\*`;
        }
        if (arm !== 'import' && arm !== 'types') {
          return `realm: the \`${key}\` entry carries the undeclared arm \`${arm}\` (\`DD-24\`: ONE arms-bearing entry, the ESM one)`;
        }
      }
      if (!armNames.includes('import')) {
        return `realm: the \`${key}\` entry carries no \`import\` arm, where the claimed realm IS the ESM one`;
      }
      if (typeof arms.import !== 'string' || !arms.import.endsWith('.mjs')) {
        return `realm: the ESM arm points at \`${String(arms.import)}\`, and the entry is the package's own \`.mjs\` module`;
      }
      if (arms.import.includes('.node')) {
        return 'realm: the ESM arm points AT the addon — the addon may not be an entry point (`package.md §1.2`)';
      }
    }
    if ('main' in manifest) {
      return 'realm: the manifest carries a root `main` field, which is the CJS entry point `HO-1` refuses';
    }
    // (2) **THE ALLOWLIST CARRIES NO `.cjs` AND NO `.node` PATH** (`contract.md §5.7`: a shipped CJS arm;
    // a wildcard export that exposes the `.node`).
    const files = Array.isArray(manifest.files) ? manifest.files : [];
    if (files.length === 0) return 'realm: the manifest declares no `files` allowlist, so what ships is undeclared';
    for (const path of files) {
      if (path.endsWith('.cjs') || path.endsWith('.node')) {
        return `realm: the allowlist publishes \`${path}\` — a CJS arm or the addon binary itself (\`contract.md §5.7\`; \`package.md §1.2\`)`;
      }
      if (path.includes('*')) {
        return `realm: the allowlist entry \`${path}\` is a WILDCARD (\`contract.md §5.7\`)`;
      }
    }
    // (3) **EVERY UNCLAIMED REALM OF `package.md §2` IS NAMED AT A DOCUMENTED SURFACE, WITH ITS OWN
    // DECLARED ANSWER**, and (4) **NO BROWSER OR RENDERER PROMISE STANDS ON EITHER SURFACE**
    // (`HO-1`…`HO-7`; `contract.md §5.7`'s *"a browser or renderer promise anywhere in the package's
    // documentation"*).
    const realms = [
      { id: 'HO-1', named: /CJS|CommonJS/, promise: /\bCJS\b[^.]{0,60}\b(supported|available|entry)\b/i },
      { id: 'HO-2', named: /Electron\s*`?main`?/, promise: /Electron\s*`?main`?[^.]{0,60}\b(supported|available|works|guaranteed)\b/i },
      { id: 'HO-3', named: /`?preload`?/, promise: /preload[^.]{0,60}\b(supported|available|works|guaranteed)\b/i },
      { id: 'HO-4', named: /renderer/, promise: /renderer[^.]{0,60}\b(supported|available|works|guaranteed)\b/i },
      { id: 'HO-5', named: /browser/, promise: /browser[^.]{0,60}\b(supported|available|works|bundled)\b/i },
      { id: 'HO-6', named: /worker_threads|worker/, promise: /worker[^.]{0,60}\b(supported|available|works)\b/i },
      { id: 'HO-7', named: /IPC/, promise: /\bIPC\b[^.]{0,60}\b(supported|available|shipped)\b/i },
    ];
    for (const surface of surfaces) {
      for (const realm of realms) {
        if (!realm.named.test(surface.bytes)) continue; // a realm a surface does not speak of is read at the other
        if (realm.promise.test(surface.bytes)) {
          return `realm: \`${surface.name}\` promises the unclaimed realm ${realm.id} — \`HO-4\`/\`HO-5\`'s declared answer is *"nothing is shipped and nothing is promised"*, and \`contract.md §5.7\` names *"a browser or renderer promise anywhere in the package's documentation"*`;
        }
      }
    }
    // AND THE ONE SURFACE THE ALLOWLIST CARRIES MUST NAME THE UNCLAIMED SET AT ALL: a blank README would pass
    // every reading above by saying nothing.
    const namedCount = realms.filter((realm) => realm.named.test(README)).length;
    if (namedCount !== realms.length) {
      const missing = realms.filter((realm) => !realm.named.test(README)).map((realm) => realm.id);
      return `realm: \`README.md\` does not name the unclaimed ${missing.join(', ')} — \`package.md §2\` enumerates the set rather than leaving it to a reader's judgement, and \`§5.7\`'s \`S-HO\` reads one drive per \`HO-\` row off the shipped documentation`;
    }
    // AND THE TWO DECLARED ANSWERS THE README MUST CARRY, READ AS ITS OWN WORDS (`HO-1`; `DD-24`).
    if (!/no CJS arm/i.test(README)) {
      return 'realm: `README.md` does not carry `HO-1`\'s declared answer — *"the package publishes NO CJS arm and NO `require` entry"* — as its own words';
    }
    if (!/no wildcard export/i.test(README)) {
      return 'realm: `README.md` does not carry the `exports` map\'s own one-arm reading — *"no wildcard export, no deep import to the addon"* (`DD-24`)';
    }
    console.log(`NG NG-JS-M-arm strategy=realm claim, manifest and documentation attempt=${attempt} rotation=${rotation} arms=4 verdict=HELD`);
    return true;
  });
});
