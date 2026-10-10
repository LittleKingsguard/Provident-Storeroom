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
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';

import {
  storeCreate,
  read,
  readLiteral,
  write,
  delete as remove,
  rollback,
  listen,
  unlisten,
} from '@provident-storeroom/js';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);
const ADDON_PATH = join(PACKAGE_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/// **THE STORE'S CLOSED `15`-MEMBER SET** — the set `surface.md §2.5` item 1 draws a rejection's `status`
/// from (`DD-40`: *"never a package-minted code"*). It is the set `surface.test.mjs` spells and the Rust
/// leg's `CODES` const carries.
const THE_FIFTEEN = [
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

/// The failure form's own predicate — `surface.md §2.5` items 1–3: exactly `{status, message}`, a plain
/// object of the caller's realm, no `Error` subclass, no third member, and **the status a member of the
/// store's closed set** — so a package-minted code fails HERE rather than passing as "an error occurred".
function isTheFailureForm(err) {
  return (
    err !== null &&
    typeof err === 'object' &&
    !Array.isArray(err) &&
    Object.getPrototypeOf(err) === Object.prototype &&
    Object.keys(err).sort().join(',') === 'message,status' &&
    typeof err.status === 'string' &&
    THE_FIFTEEN.includes(err.status) &&
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
    const record = write(inst, ['a'], 'mem', 1);
    const accepted = rollback(inst, record.op.opId);
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
        if (one.absent) rollback(inst);
        else rollback(inst, one.value);
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
      read(inst, ['a']);
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
        write(inst, [key], 'mem', one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown === null) return `${one.label}: the write SUCCEEDED — section 1.2 row 5 refuses the class BY NAME`;
      if (!isTheFailureForm(thrown)) return `${one.label}: not the one form: ${JSON.stringify(thrown)}`;
      if (thrown.status !== 'ValueNotAdmitted') {
        return `${one.label}: the declared answer is ValueNotAdmitted, got ${thrown.status}`;
      }
    }
    // THE REFUSAL INSTALLED NOTHING (`§1.2`'s closing clause: no anchor, no container change, no journal
    // entry) — a refused write leaves the address absent, which a "repaired" write would not.
    let probed = null;
    try {
      read(inst, [key]);
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
      { label: 'read', call: () => read(inst, asAddress) },
      { label: 'readLiteral', call: () => readLiteral(inst, asAddress) },
      { label: 'listen', call: () => listen(inst, asAddress) },
      { label: 'write', call: () => write(inst, asAddress, 'mem', 1) },
      { label: 'delete', call: () => remove(inst, asAddress, 'mem') },
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
    write(control, ['c'], 'mem', [1, 2, 3]);
    const back = read(control, ['c']);
    if (!Array.isArray(back) || back.length !== 3 || back[0] !== 1 || back[2] !== 3) {
      return 'a PLAIN array was not admitted at the value position';
    }
    write(control, ['c', 0], 'mem', 9);
    if (read(control, ['c', 0]) !== 9) return 'a PLAIN array address was not admitted at the address position';
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
      write(answer.inst, ['c'], 'mem', tag);
      if (read(answer.inst, ['c'], 'mem') !== tag) return `${label}: the returned instance does not carry the store`;
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

  runGenerator('NG-JS-D', 'depth 63/64/65/66', 4, (attempt) => {
    for (const [depth, admitted] of [[63, true], [64, true], [65, false], [66, false]]) {
      let thrown = null;
      try {
        write(inst, ['depth'], 'mem', chain(depth));
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
        if (thrown.status !== 'ValueNotAdmitted') {
          return `depth ${depth}: the declared status is ValueNotAdmitted, got ${thrown.status}`;
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
  runGenerator('NG-JS-D-nodes', 'visited 1,000,000 / 1,000,001', 1, () => {
    const over = new Array(1000001).fill(0);
    const overStarted = Date.now();
    let refusal = null;
    try {
      write(inst, ['nodes-over'], 'mem', over);
    } catch (err) {
      refusal = err;
    }
    const overElapsed = Date.now() - overStarted;
    if (refusal === null) return '1,000,001 members: ADMITTED where the clause refuses it';
    if (!isTheFailureForm(refusal)) return `1,000,001 members: not the one form: ${JSON.stringify(refusal)}`;
    if (refusal.status !== 'ValueNotAdmitted') {
      return `1,000,001 members: the declared status is ValueNotAdmitted, got ${refusal.status}`;
    }
    const exact = new Array(1000000).fill(0);
    const started = Date.now();
    let admitted = null;
    let threw = null;
    try {
      admitted = write(inst, ['nodes-exact'], 'mem', exact);
    } catch (err) {
      threw = err;
    }
    const elapsed = Date.now() - started;
    if (threw !== null) {
      return (
        `1,000,000 members: REFUSED (${threw.status}) where the clause ADMITS it — so the declared boundary is ` +
        `not the one the package holds; the refusal arrived after the drive's whole dense value was built and ` +
        `walked at the boundary (${elapsed} ms), which is the arm the package reaches ONLY after its own walk ` +
        'has run (bindings/js/src/crossing.rs: `to_store_value` measures the encoded tree and refuses at ' +
        "`visited > 1_000_000`; bindings/js/index.mjs's `encodeValue` carries a depth bound and NO node bound)"
      );
    }
    if (admitted === null) return '1,000,000 members: the write returned nothing';
    if (elapsed > WORK_BUDGET_MS) {
      return (
        `1,000,000 members: admitted in ${elapsed} ms, OVER this drive's ${WORK_BUDGET_MS} ms work budget — the ` +
        'boundary walk is quadratic in the node count, so the declared admit figure costs minutes of wall ' +
        'clock at the package (a CODE finding: the ceiling the walk declares is enforced only after the walk ' +
        "has run — bindings/js/src/crossing.rs's measure against bindings/js/index.mjs's encodeValue)"
      );
    }
    if (overElapsed > WORK_BUDGET_MS) {
      return `1,000,001 members: the refusal itself took ${overElapsed} ms, over the drive's work budget`;
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
        write(inst, [one.at], 'mem', one.value);
      } catch (err) {
        thrown = err;
      }
      if (thrown !== null) {
        return (
          `${one.label}: REFUSED (${thrown.status} — ${JSON.stringify(thrown.message)}) where section 1.4 ` +
          'item 4 (e) ACCEPTS a plain object from any realm'
        );
      }
      const back = read(inst, [one.at]);
      if (back === undefined || back === null) return `${one.label}: the read answered no value`;
      if (Array.isArray(one.value) && !Array.isArray(back)) return `${one.label}: the round trip is not an array`;
    }

    // AS AN ADDRESS: `AddressArg` row 13 admits a cross-realm array, and the write must land where the
    // address says. (A `ContainerKindConflict`/`AddressNotFound` answer is NOT this generator's subject —
    // the declared class it refuses on is `AddressMalformed`, and only that answer is a failure here.)
    write(inst, ['addr'], 'mem', {});
    const addressStates = [
      { label: 'a cross-realm array as an ADDRESS (vm)', address: runInNewContext(`['addr', '${key}av']`) },
      { label: 'a structuredClone array as an ADDRESS', address: structuredClone(['addr', `${key}cv`]) },
      { label: 'a same-realm array as an ADDRESS (the control)', address: ['addr', `${key}sv`] },
    ];
    for (const one of addressStates) {
      let thrown = null;
      try {
        write(inst, one.address, 'mem', 1);
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
    const held = write(owner, ['a'], 'mem', 1).triggered[0];
    const foreignHandle = write(foreign, ['a'], 'mem', 1).triggered[0];
    // THE PRE-EXISTING REGISTRATION, WHICH NO REFUSED CALL MAY DISTURB (`§2.4` item 5 (d): *"nothing reaches
    // the store in any of these cases"*).
    let ownerFired = 0;
    if (owner.register(held, () => { ownerFired += 1; }) !== undefined) {
      return 'an IN-DOMAIN registration did not return undefined';
    }
    write(owner, ['a'], 'mem', 2);
    if (ownerFired !== 1) return 'the in-domain registration did not fire once per trigger';

    const handleStates = [
      { label: 'a value a FOREIGN instance minted', value: foreignHandle, why: 'THIS INSTANCE' },
      { label: 'a bigint', value: 10n, why: 'a bigint' },
      { label: 'a Symbol', value: Symbol('s'), why: 'a symbol' },
      { label: 'a Proxy', value: new Proxy({}, { get() { throw new Error('the trap must never run'); } }), why: 'a Proxy' },
      { label: 'a class instance', value: new (class C {})(), why: 'class' },
      { label: 'an array', value: [], why: 'an Array' },
      { label: 'a frozen empty object', value: Object.freeze({}), why: 'a plain object' },
      { label: 'null', value: null, why: 'null' },
      { label: 'undefined', value: undefined, why: 'undefined' },
      { label: 'a bare token string', value: 'l-owner', why: 'a string' },
      { label: 'a blank token', value: '', why: 'a string' },
      { label: 'a guessed token', value: `listener-${rng.next().value}`, why: 'a string' },
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
        returned = unlisten(owner, one.value);
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
    const after = write(owner, ['a'], 'mem', 3);
    if (after.triggered.length !== 1) return 'a refused registration removed the store-side home entry';
    if (ownerFired !== 1) {
      return 'a refused registration MUTATED another registration (it fired a different number of times)';
    }
    if (read(owner, ['a']) !== 3) return 'a refused registration changed the store';
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
    const first = write(three, [key], 'mem', 1);
    if (first.triggered.length !== 3) {
      return `three distinct ids: triggered carried ${first.triggered.length}, not 3`;
    }
    const ids = [...first.triggered];
    if (new Set(ids).size !== 3) return 'the three ids are not three distinct identities';
    const argCounts = new Map();
    for (const id of ids) {
      if (three.register(id, (...args) => { argCounts.set(id, args.length); }) !== undefined) {
        return 'a registration did not return undefined';
      }
    }
    const record = write(three, [key], 'mem', 2);
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
    const probeId = write(probe, ['probe'], 'mem', 1).triggered[0];
    probe.register(probeId, (a) => { argument = a; });
    write(probe, ['probe'], 'mem', 2);
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
    const duplicate = mem([
      { address: ['d'], handle: 't' },
      { address: ['d'], handle: 't' },
    ]);
    const dupRecord = write(duplicate, ['d'], 'mem', 1);
    if (dupRecord.triggered.length !== 2) {
      return `a lawful duplicate token: triggered carried ${dupRecord.triggered.length}, not 2`;
    }
    // **MEMBER BY MEMBER, NEVER BY SIZE** (`A77`): the two members are the SAME identity, each carrying the
    // caller's own token — so a boundary that collapsed the duplicate breaks HERE, and one that minted a
    // second identity breaks on the identity count.
    if (dupRecord.triggered[0] !== dupRecord.triggered[1]) {
      return 'the lawful duplicate did not cross as ONE identity carried twice, member by member';
    }
    if (new Set(dupRecord.triggered).size !== 1) {
      return 'the two members of the lawful duplicate are not ONE distinct identity';
    }
    // ...AND THE INVOCATION HALF, UNMOVED — a call counter on the function, one per DISTINCT id, with the
    // invocation's OWN view read at the call: `argc === 1` and the ONE argument the TRIGGERING ADDRESS.
    // **AND THE AS-FILED REGISTRATION LINE IS RE-EMITTED HERE, BYTE FOR BYTE, BESIDE THE FORM THAT CARRIES
    // IT NOW:** `duplicate.register(dupRecord.triggered[0], () => { dupFired += 1; });` — now
    // `duplicate.register(dupRecord.triggered[0], (...args) => { dupFired += 1; dupArgs = args; });`, the
    // SAME registration with the invocation's own view read at the call. **THE AS-FILED COUNTER ASSERTION
    // BELOW STANDS VERBATIM AND UNMOVED.**
    let dupFired = 0;
    let dupArgs = null;
    duplicate.register(dupRecord.triggered[0], (...args) => { dupFired += 1; dupArgs = args; });
    write(duplicate, ['d'], 'mem', 2);
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
    const atRegister = listen(deleting, []);
    const atNamed = listen(deleting, ['del']);
    const atDescendant = listen(deleting, ['del', 'deep']);
    if (new Set([atRegister, atNamed, atDescendant]).size !== 3) {
      return 'the three entries of the delete arm are not three distinct identities';
    }
    write(deleting, ['del'], 'mem', {});
    write(deleting, ['del', 'deep'], 'mem', 1);
    const receipt = remove(deleting, ['del'], 'mem');
    if (!Array.isArray(receipt.triggered)) return "a delete's receipt carries no triggered array";
    // THE PREFIX-BOUND HALF: the entry AT the deleted address IS a prefix of it and fires, and so does the
    // register-bound entry, whose address is a prefix of every address.
    if (!receipt.triggered.includes(atNamed)) {
      return (
        `a delete at ['del'] did not return the entry AT the deleted address: the receipt carried ` +
        `${receipt.triggered.length} ids and the named address's own handle is not among them — the address ` +
        'the delete NAMES is a prefix of itself (§6.5 item 10 (d) (iii); §2.3 item 5)'
      );
    }
    if (!receipt.triggered.includes(atRegister)) {
      return (
        "a delete at ['del'] did not return the entry bound at the EMPTY address: the empty address IS a " +
        'prefix of every address, so the register-bound entry fires (§6.5 item 3; the store\'s lf_a6)'
      );
    }
    // **THE DESCENDANT-BOUND HALF — THE ONE THE AS-FILED CELL GOT WRONG, ASSERTED AS AN EXPLICIT NEGATIVE:**
    // `['del','deep']` is NOT a prefix of `['del']`, so the entry bound there does NOT fire.
    if (receipt.triggered.includes(atDescendant)) {
      return (
        "a delete at ['del'] returned the handle of the entry at ['del','deep'], a STRICT DESCENDANT of the " +
        "deleted address and NOT a prefix of it: *\"a listener bound at a STRICT DESCENDANT of it does NOT\"* " +
        '(§4.4; §6.5 item 10 (d) (iii))'
      );
    }
    for (const id of receipt.triggered) {
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
    const belowRegister = listen(below, []);
    const belowAncestor = listen(below, ['del']);
    const belowOwn = listen(below, ['del', 'deep']);
    write(below, ['del'], 'mem', {});
    write(below, ['del', 'deep'], 'mem', 1);
    const belowReceipt = remove(below, ['del', 'deep'], 'mem');
    if (!Array.isArray(belowReceipt.triggered)) return "a descendant delete's receipt carries no triggered array";
    if (!belowReceipt.triggered.includes(belowAncestor)) {
      return (
        "a delete at ['del','deep'] did not return the ANCESTOR-bound entry at ['del']: ['del'] IS a prefix of " +
        "['del','deep'], so the delete passes THROUGH the ancestor's address (§6.5 item 10 (d) (iii); the " +
        "store's lf_d2 cell)"
      );
    }
    if (!belowReceipt.triggered.includes(belowOwn)) {
      return "a delete at ['del','deep'] did not return the entry AT the deleted address";
    }
    if (!belowReceipt.triggered.includes(belowRegister)) {
      return "a delete at ['del','deep'] did not return the entry bound at the empty address";
    }
    for (const id of belowReceipt.triggered) {
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
    const emptyRecord = write(bare, ['nowhere'], 'mem', 1);
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
    write(silent, ['t'], 'mem', {});
    const registeredId = write(silent, ['t'], 'mem', 1).triggered[0];
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
      const silentRecord = write(silent, ['s'], 'mem', 2); // the id at `s` has NO registered function
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
    write(silent, ['t'], 'mem', 3);
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
    const sets = mem([
      { address: ['set'], handle: 'p' },
      { address: ['set'], handle: 'p' },
      { address: ['set'], handle: 'q' },
    ]);
    const one = write(sets, ['set'], 'mem', 1);
    const two = write(sets, ['set'], 'mem', 2);
    if (one.triggered.length !== 3 || two.triggered.length !== 3) {
      return (
        `the declared set has TWO distinct ids and its array carries THREE members ` +
        `(one token carried by two entries, one by a third), got ${one.triggered.length} and ${two.triggered.length}`
      );
    }
    const onlyInOne = one.triggered.filter((id) => !two.triggered.includes(id));
    const onlyInTwo = two.triggered.filter((id) => !one.triggered.includes(id));
    if (onlyInOne.length !== 0 || onlyInTwo.length !== 0) {
      return `the two enumerations are not the same SET: only in one ${onlyInOne.length}, only in two ${onlyInTwo.length}`;
    }
    // **AND THE MULTIPLICITY IS READ OFF THE ARRAY ITSELF, ONE MEMBER AT A TIME, WITH NO ORDER ASSERTED**
    // (`§2.7` item 3; `A77`): the occurrence count is kept per identity (`===`) and the multiset the array
    // yields must be `{2, 1}` — ONE identity carrying TWO of the three members and ONE carrying a single one.
    // A boundary that collapsed the duplicate yields `{1, 1}` and breaks on the third member; one that
    // invented a third identity breaks on the count of identities. **THIS IS THE MEMBER LOOP, AND IT IS NOT
    // A `new Set(...).size` COMPARISON.**
    const occurrences = []; // one `[identity, occurrences]` pair per DISTINCT identity, in first-seen order
    for (const id of one.triggered) {
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
    for (const id of one.triggered) sets.register(id, () => { distinctFired += 1; });
    write(sets, ['set'], 'mem', 3);
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
      "import { storeCreate } from '@provident-storeroom/js';",
      'let thrown = null;',
      'let inst = null;',
      'try { inst = storeCreate({ journalLength: 8, listeners: [] }); } catch (err) { thrown = err; }',
      'console.log(JSON.stringify({',
      '  inst: inst === null ? null : typeof inst,',
      '  keys: thrown === null ? null : Object.keys(thrown).sort(),',
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
    assert.deepEqual(answer.keys, ['message', 'status'], 'the member set is EXACTLY {status, message}');
    assert.equal(answer.plain, true, "the record's prototype is the caller realm's Object.prototype");
    assert.equal(answer.isError, false, 'never an Error subclass (DD-12)');
    assert.equal(answer.status, 'FilePathUnreachable', 'the declared status for the load state');
    assert.ok(THE_FIFTEEN.includes(answer.status), "the status is a member of the store's closed set (DD-40)");

    // **THE BYTE EQUALITY, ASSERTED AGAINST THE GENERATOR ITSELF** (`JS-3`): the boundary's reproduction of
    // the generator's rendering of THIS subject and the generator's own answer for the same subject, compared
    // character for character. The present arm's addon is asked for the SCRATCH path — the subject the absent
    // arm's own constant carries — so the comparison is of two renderings of ONE subject.
    const generatorForScratchSubject = addonPresent.errorMessage('FilePathUnreachable', scratchAddon);
    assert.equal(
      answer.message,
      generatorForScratchSubject,
      "the absent arm's message and the generator's rendering of the same subject must be BYTE-EQUAL (JS-3)",
    );
    // And the repository path's own rendering has the same SHAPE, which is what `package.md §1.2` item 4's
    // *"one string for the state on both arms"* claims: the subject is the only thing that varies.
    assert.equal(
      answer.message.replace(scratchAddon, '<path>'),
      repositoryGeneratorMessage.replace(ADDON_PATH, '<path>'),
      'the two arms render ONE string, with the path as the only variable',
    );

    console.log(
      'NG NG-JS-H strategy=absent-addon load state attempts=1 failures=0 verdict=HELD ' +
        `(status=${answer.status}, two-arm byte equality asserted at one subject)`,
    );
  } finally {
    rmSync(scratch, { recursive: true, force: true });
    assert.equal(existsSync(scratch), false, 'the scratch copy was removed');
  }
});
