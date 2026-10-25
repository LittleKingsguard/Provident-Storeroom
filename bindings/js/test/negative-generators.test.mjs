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
// **⟶ AMENDED 2026-10-24 BY THE GATE-11 FOURTH AUDIT PASS (`contract.md §2.1`'s clause of that date on `F-RA-13`,
// `§2`'s clause of that date on `F-RA-12`, `§5`'s clause of that date on `F-RA-15`, and the audit's own letters
// `G(i)`, `G(ii)`, `G(iii)` and `I`; `RCA-8(g)`). THREE THINGS MOVE AND THE CELL CENSUS MOVES `36` → `39`.**
// **(1) THE SHARED PREDICATE `isTheFailureForm` IS NARROWED** — its `Object.getPrototypeOf(err) ===
// Object.prototype` limb is an allocation identity no clause pins, and `F-RA-15` item `(2)`'s ruling is *"the cell
// is narrowed; the contract is not widened"*; the MEMBER SET and each member's OWN-ENUMERABLE-DATA shape stand in
// its place, which is what `surface.md §2.5` item 9 pins. **Every property cell in this file is re-verified green
// after the narrowing, because this predicate is the shared machinery every arm reads.** **(2) THREE TRIPWIRE
// CELLS ARE ADDED — `NG-JS-Q15` (the DATA `Symbol.toStringTag` limb), `NG-JS-Q16` (the `Proxy`-link guard at the
// RENDERING arms) and `NG-JS-Q17` (the residual's remaining OVERRIDE state) — each of which asserts the state the
// law ALREADY answers, marked `OBSERVED` in its own comment, so that a silent `C-11` re-open or a narrowing of a
// limb fails a cell instead of holding every file green.** **(3) NO EXISTING CELL IS DELETED, WEAKENED OR
// REWORDED beyond the narrowing `(1)` names, and no expected answer is reversed.**
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
import { existsSync, mkdirSync, mkdtempSync, rmSync, copyFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
// **⟶ ADDED 2026-10-17 (`role_test_writer`; `contract.md §5.7`'s `S-HO` arm): `NG-JS-M` reads the SHIPPED
// bytes — the manifest the package would publish and the documentation the allowlist carries — rather than a
// restatement of them inside this file, so the realm claim's own corpus has the filesystem's reading to take.**
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
// **⟶ `types` IS ADDED 2026-10-24 FOR `NG-JS-Q5`'s NARROWED COPY-OUT ASSERTION** (`contract.md §5`'s clause of
// that date on `F-RA-15`, item `(3)(b)`: a copy-out object is *"NOT a `Proxy`"*). `util.types.isProxy` reads no
// member and runs no handler, exactly as the walk's own guard does, so the test asks the question the law asks.
import { types as nodeTypes } from 'node:util';
// **⟶ `createContext` and `runInContext` ARE ADDED 2026-10-24 FOR `NG-JS-Q7`: the four mutation states of
// `test-cases.md` `JC-TC-07` item `(2)` include the value's OWN realm mutated, and that realm must be a context
// the cell HOLDS so the mutation can be made and restored inside it. `runInNewContext` stays for `NG-JS-E`'s
// arms, whose fixtures need no handle on their realm.**
import { createContext, runInContext, runInNewContext } from 'node:vm';

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

/// **THE STORE'S CLOSED STATUS SET, SPELLED COUNT-FREE ON PURPOSE** — the set `surface.md §2.5` item 1 draws
/// a rejection's `status` from (`DD-40`: *"never a package-minted code"*). It is the set `surface.test.mjs`
/// spells and the Rust leg's `CODES` const carries.
///
/// **⟶ WIDENED 2026-10-15 (`DEF-2026-10-15-Y`, the `stale-by-census` class).** The as-filed heading read
/// **`15`** and its list stopped at `FileCommitFailed`; **`contract.md §8.1`'s amended heading reads `16`
/// members and its arithmetic is `11 + 2 + 1 + 1 + 1 = 16` ✓**, the sixteenth member's trigger is `§7.1`
/// step 4-bis's and its key's semantics are `parameter-semantics.md §2.21`'s (both dated 2026-10-15). **The
/// figure MOVES and no assertion is weakened: `isTheFailureForm` below still refuses a package-minted code,
/// and the widened set only admits one more declared member.**
///
/// **⟶ AND THE CENSUS MOVES `16` → `17` ON 2026-10-23, WHICH IS WHY THE CONSTANT IS RENAMED COUNT-FREE**
/// (`A148` Q3; `contract.md §2` — *"the store set widened `16 → 17` on 2026-10-23"*, `ValueRefusedAtBoundary`
/// at rank `17`, the JavaScript crossing's own status; the census finding is `F5-10`). The array below
/// carried `17` members while the doc comment above called it *"the store's closed `16`-member set"* and the
/// constant was named `THE_SIXTEEN` — **a stale census in the NAME and the PROSE, never in the data**. The
/// `2026-10-15` clause above stands byte-for-byte as that pass's own record and is read THROUGH this one;
/// **the rename is FUNCTIONALLY INERT — the same `17` members stand in the same order, and no assertion, no
/// counter and no expected answer of any cell moves.**
const THE_CLOSED_STATUS_SET = [
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
///
/// **⟶ NARROWED 2026-10-24 (the GATE-11 FOURTH AUDIT PASS's letter `I`, read through `contract.md §5`'s clause
/// of 2026-10-24 on `F-RA-15`, item `(2)`'s ruling — *"THE CELL IS NARROWED; THE CONTRACT IS NOT WIDENED"* —
/// at parity, because the identity this predicate pinned is the same allocation identity that clause refuses to
/// pin anywhere else).** **THE AS-FILED PREDICATE ASSERTED `Object.getPrototypeOf(err) === Object.prototype`,
/// AN ALLOCATION IDENTITY NO CLAUSE PINS:** `F-RA-15` item `(1)` states that what the contract pins is the
/// TREE'S DATA SHAPE and *"it pins NO PROTOTYPE"*, and item `(2)(a)`'s realm ground is decisive for a throwable
/// too — the form is minted by the MODULE's realm (`fail`) while the cell compares against the TEST realm's
/// `Object.prototype`, so a drive whose package was loaded into another realm would fail a cell on a fact no
/// clause declares. **WHAT STANDS IN ITS PLACE IS THE MEMBER SET AND EACH MEMBER'S OWN-DESCRIPTOR SHAPE**, which
/// is the whole of what item 9 pins: every one of the three is present as an **OWN** member (`Object.hasOwn`),
/// is **ENUMERABLE**, and is a **DATA** member (`'value' in descriptor`) — so the form cannot be a getter's
/// product, cannot carry a member it inherited, and cannot be an `Object.defineProperty` spelling of any of the
/// three. **NO ASSERTION IS WEAKENED BEYOND THE IDENTITY THE RULING NAMES: `Object.keys` is STILL read (a
/// non-enumerable or a prototype-carried member would move it), the closed-set `status` limb is unmoved, and the
/// `log`-is-an-array limb is unmoved.**
function ownsTheFailureFormMember(object, name) {
  if (!Object.hasOwn(object, name)) return false;
  const descriptor = Object.getOwnPropertyDescriptor(object, name);
  return descriptor !== undefined && descriptor.enumerable === true && 'value' in descriptor;
}

function isTheFailureForm(err) {
  return (
    err !== null &&
    typeof err === 'object' &&
    !Array.isArray(err) &&
    Object.keys(err).sort().join(',') === 'log,message,status' &&
    Object.keys(err).length === 3 &&
    ownsTheFailureFormMember(err, 'log') &&
    ownsTheFailureFormMember(err, 'message') &&
    ownsTheFailureFormMember(err, 'status') &&
    Array.isArray(err.log) &&
    typeof err.status === 'string' &&
    THE_CLOSED_STATUS_SET.includes(err.status) &&
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
// **⟶ RE-DERIVED 2026-10-23 — THE AUTHORITY IS `docs/decisions.md` · `A149`, AND THE CROSSING CLAUSE IS READ
// THROUGH ITS DATED CLAUSE OF THAT DATE AND NOT THROUGH THE STALE HEAD INSTRUCTION.** `crossing.md §1.4` item
// 5 is cited here THROUGH the dated clause the `A149` pass lands at that item; **the head instruction it sits
// under — *"THE CEILINGS ARE THE CRATE'S: depth `128` … Where this part prints `64`, read `128`; `65`, read
// `129`; `66`, read `130`"* — is the `128`-ERA MAPPING AND IS SUPERSEDED: the crate's `128` is the CONVERSION's
// own bound and is NOT the crossing's admission bound from this date** (`A149` (4)). **WHAT `A149` PINS, AND
// THEREFORE WHAT THIS DRIVE NOW ENUMERATES: `ENCODER_CEILING` is `126` on BOTH routes; `126` is the highest
// ADMITTED depth, because the root enters at `0` AND because the store's persistent path cannot commit a
// `127`-deep value; and `127` AND BEYOND IS REFUSED AT THE PACKAGE'S WALK, BEFORE ANY STORE VERB, with the
// depth class `a value over the walk ceiling` and the status `ValueRefusedAtBoundary` — never admitted and then
// failed at commit** (`A149` (1)–(2); `docs/specs/storeroom-json-crossing/contract.md §4`'s clause of
// 2026-10-23). **THE ROWS THE DRIVE CARRIES, RE-DERIVED (the enumerated-state table above stands at its own
// bytes and is read THROUGH this clause):**
//
// | The state (one `{a: …}` chain, root at `0`) | Its declared answer |
// | --- | --- |
// | nesting depth `126` | **ADMITTED** — the last admitted depth on both routes |
// | nesting depth `127` | **REFUSED at the walk**, class `a value over the walk ceiling`, status `ValueRefusedAtBoundary` |
// | nesting depth `128` | refused, the same answer (the crate's `128` is the conversion's own bound and not this boundary's) |
// | nesting depth `129` | refused, the same answer |
// | the ARM of each refusal | **the PACKAGE'S OWN WALK'S** — so the drive reads the one form and the boundary status and never a store-side or commit-side answer (`A149` (2)) |
//
// **THE STALE ROWS ABOVE, NAMED SO THEY ARE NOT READ AS LAW:** the `63`/`64`/`65`/`66` depth rows and the
// `999,999`/`1,000,000`/`1,000,001` *node* rows print the 2026-10-11 era's figures and its `ValueNotAdmitted`
// answers; the depth rows are read as the four rows just above, and **the node half is UNMOVED by this re-cut
// and is green as authored** — its two figures, spelled there in MEMBERS (`999,999` admitted, `1,000,000`
// refused), are the root-counted range `A149` (3) declares (`999,999` members + the root = `1,000,000` nodes
// admitted; `1,000,000` members + the root = `1,000,001` nodes refused, the same class and status).
// **THE MEASURED-ARM FINDING ABOVE IS CLOSED BY THIS RULING, NOT IGNORED:** the arm it reported was an
// addon-side ceiling one class later, and `A149` (2) moves the refusal to the package's own walk —
// `ENCODER_CEILING = 126` in `bindings/js/index.mjs` — so the drive's `ValueRefusedAtBoundary` reading now
// measures the arm the row's first dated clause declares.
// `[A2 docs/decisions.md · `A149` (1)–(4) | the operative depth ceiling, the refusing site, the class, the
// status and the node range; A2 docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23 clause |
// numeric and site claim; A1 bindings/js/index.mjs | ENCODER_CEILING · NODE_CEILING, cited by symbol |
// numeric claim]`
//
// ⟶ **RECONCILED 2026-10-24 — THE `2026-10-23` MARKER CARRIED BY THIS CLAUSE DENOTES A `2026-10-24` LANDING, AND
// THE CLAUSE STANDS AS FILED.** The marker is one day early: the landing it records is this unit's own of
// 2026-10-24 (the ground — source edit `2026-10-24 19:09:06`, addon built `19:09:49`, restaged `19:09:51`). The
// marker digits are NOT re-pointed in place and no sentence above is rewritten: the clause is cited elsewhere BY
// THAT DATE, so moving it would break the resolving citations rather than repair anything. `ENCODER_CEILING` `126`
// on both routes, the refusing site at the package's own walk, the class `a value over the walk ceiling`, the
// status `ValueRefusedAtBoundary` and the node range above are unmoved, byte-for-byte, and are the figures driven
// below.
test('ng_js_d_the_depth_and_node_ceilings_are_the_packages_own_walks_arm', { timeout: 300000 }, () => {
  const inst = mem();
  const chain = (depth) => { let v = 1; for (let i = 0; i < depth; i += 1) v = { a: v }; return v; };

  runGenerator('NG-JS-D', 'depth 126/127/128/129', 4, (attempt) => {
    for (const [depth, admitted] of [[126, true], [127, false], [128, false], [129, false]]) {
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
        // **⟶ AND THE CLASS AND THE POSITION, WHICH THE AS-FILED CELL DID NOT ASSERT** (the gate-11 PBT
        // audit's sharpest single case, `DEF-2026-10-24-B`: *"`NG-JS-D` … asserts the status only, never the
        // class or the position, so a build refusing at the ROOT position for a depth refusal passes it"*).
        // **THE POSITION IS `contract.md §4`'s clause of 2026-10-24 item `(3)` (c): the DEPTH arm records the
        // refused value's OWN path**, so the `127`-deep value of a `{a: …}` chain is spelled at `127` `'a'`
        // segments and the root position is a FAILURE here. **THE SUBJECT IS `§2.1`'s row-`8` DEPTH arm:
        // *"THAT value's own spelling by `valueTargetSpelling`, e.g. `'0'` for a one-element array leaf"*** —
        // `'1'` for the leaf `depth 127` refuses, and `'[object Object]'` for the object at depth `127` that
        // `128` and `129` refuse.
        const declaredPosition = positionOf(Array(127).fill('a'));
        const declaredSubject = depth === 127 ? '1' : '[object Object]';
        const expectedDepthMessage = declaredRefusalMessage(
          declaredSubject,
          declaredPosition,
          'a value over the walk ceiling',
        );
        if (thrown.message !== expectedDepthMessage) {
          return (
            `depth ${depth}: the refusal is not the declared one — expected ${JSON.stringify(expectedDepthMessage)}, ` +
            `got ${JSON.stringify(thrown.message)} (class and position are ` +
            `${JSON.stringify(declaredPartTwo(declaredPosition, 'a value over the walk ceiling'))})`
          );
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
  // **⟶ THE STRATEGY LABEL IS RE-SPELLED TO ITS FIXTURES, 2026-10-24** (`docs/defects.md` ·
  // `DEF-2026-10-24-B` · `F4`'s repair for `NG-JS-D-nodes`: *"its strategy LABEL must match its FIXTURES — the
  // label says `1,000,000` / `1,000,001` nodes (root counted) while its fixtures are `999,999` / `1,000,000`
  // MEMBERS"*). **UNDER `contract.md §8` row `8`'s clause of 2026-10-24 THE DECLARED INTEGER IS THE VALUE'S OWN
  // NODE COUNT WITH THE ROOT EXCLUDED, so these two fixtures ARE the declared integers**: a dense root array of
  // `1,000,000` elements is `1,000,000` own nodes and is REFUSED, and one of `999,999` elements is `999,999`
  // own nodes and is ADMITTED. **NO ASSERTION MOVES: the two figures, the one form, the status and the work
  // budget are the as-filed drive's, and only the label and its failure strings now say which integer they
  // drive.**
  runGenerator('NG-JS-D-nodes', 'own nodes 999,999 admitted / 1,000,000 refused', 1, () => {
    const over = new Array(1000000).fill(0);
    const overStarted = Date.now();
    let refusal = null;
    try {
      inst.write(['nodes-over'], 'mem', over);
    } catch (err) {
      refusal = err;
    }
    const overElapsed = Date.now() - overStarted;
    if (refusal === null) return '1,000,000 own nodes (1,000,000 members): ADMITTED where the clause refuses it';
    if (!isTheFailureForm(refusal)) return `1,000,000 own nodes (1,000,000 members): not the one form: ${JSON.stringify(refusal)}`;
    if (refusal.status !== 'ValueRefusedAtBoundary') {
      return `1,000,000 own nodes (1,000,000 members): the declared status is ValueRefusedAtBoundary, got ${refusal.status}`;
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
        `999,999 own nodes (999,999 members): REFUSED (${threw.status}) where the clause ADMITS it — so the declared boundary is ` +
        `not the one the package holds; the refusal arrived after the drive's whole dense value was built and ` +
        `walked at the boundary (${elapsed} ms), which is the arm the package reaches ONLY after its own walk ` +
        'has run (bindings/js/src/crossing.rs: `to_store_value` measures the encoded tree and refuses at ' +
        "`visited > 1_000_000`; bindings/js/index.mjs's `encodeValue` carries a depth bound and NO node bound)"
      );
    }
    if (admitted === null) return '999,999 own nodes (999,999 members): the write returned nothing';
    if (elapsed > WORK_BUDGET_MS) {
      return (
        `999,999 own nodes (999,999 members): admitted in ${elapsed} ms, OVER this drive's ${WORK_BUDGET_MS} ms work budget — the ` +
        'boundary walk is quadratic in the node count, so the declared admit figure costs minutes of wall ' +
        'clock at the package (a CODE finding: the ceiling the walk declares is enforced only after the walk ' +
        "has run — bindings/js/src/crossing.rs's measure against bindings/js/index.mjs's encodeValue)"
      );
    }
    if (overElapsed > WORK_BUDGET_MS) {
      return `1,000,000 own nodes (1,000,000 members): the refusal itself took ${overElapsed} ms, over the drive's work budget`;
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
    // `FilePathUnreachable` status, and that status's membership in the store's closed status set (`17`
    // members from 2026-10-23 — `contract.md §2`, `A148` Q3; the constant is spelled count-free for exactly
    // this reason, `F5-10`).
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
    assert.ok(THE_CLOSED_STATUS_SET.includes(answer.status), "the status is a member of the store's closed set (DD-40)");

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
      assert.equal(inst.listen(token, [[token, 'a'], [token, 'b']]), token,
        '`D-22`: `listen` ANSWERS THE HANDLE it watches under; the set is the caller\'s own spelling of N '
        + 'addresses. The `PAR-HL-3` reading that said `undefined` is SUPERSEDED BY NAME');
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
        if (inst.listen(handle, [other]) !== handle) {
          return `collision(${JSON.stringify(seeded)}|${JSON.stringify(other)}): \`listen\` did not answer the caller's own handle (\`D-22\`)`;
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
      assert.equal(inst.listen(handle, [minted]), handle,
        '`D-22`: `listen` ANSWERS THE HANDLE it watches under — `contract.md §2.2` item 10\'s `Handle → '
        + 'undefined` reading is superseded by name');
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
    if (inst.listen(handle, [first]) !== handle) return 'two-addresses: `listen` did not answer the caller\'s own handle (`D-22`)';
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
    if (inst.listen(sibling, [second]) !== sibling) return 'two-addresses: `listen` did not answer the caller\'s own handle (`D-22`)';
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
    if (inst.listen(remint, [first]) !== remint) return 'two-addresses: `listen` did not answer the caller\'s own handle (`D-22`)';
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

// =============================================================================================
// THE CROSSING'S OWN RENDERER, POSITION MAPPING AND REFUSAL DRIVE — shared by `NG-JS-Q1` … `NG-JS-Q7`
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 (`role_test_writer`; `docs/defects.md` · `DEF-2026-10-24-B` · `F4`, the gate-11
// read-only PBT audit). THE AUDIT'S FINDING, AS THIS PASS RECEIVED IT: OF THE SIXTEEN GENERATORS NONE ASSERTS
// A REFUSAL CLASS SPELLING, A VALUE-WALK POSITION, A PART ONE SUBJECT, OR THE COPY-OUT TREE** — so a build
// answering the right STATUS with the wrong class, the wrong position, or a tag-echoing copy-out held every
// green. **THE REGISTER WAS RE-DERIVED ON THIS DATE SO THESE PROPERTIES CAN BE WRITTEN, AND THEY ARE WRITTEN
// FROM IT:** `contract.md §2`'s clause of 2026-10-24 (rows `3`/`12`'s declared precedence for a CALLABLE
// `Proxy`), `§2.1`'s per-arm subject table, `§4`'s clause of the same date (the pre-order single-pass
// ordering and the two arms' positions), `§8`'s clause of the same date (row `4`'s fifteen distinct
// spellings; row `8`'s own-node integer) and `parameter-semantics.md §1`'s rows `7`/`8` (`copy-in`).
//
// **PART ONE IS NEVER HAND-TYPED HERE: it is the store's own generator, rendered through the addon's
// `errorMessage` BESIDE the entry the cells drive** — the arm this file already read at `NG-JS-H`, and
// `contract.md §2.1`'s provenance rule (*"the package mints neither the status nor PART ONE"*). **PART TWO is
// the contract's own spelling** (`parameter-semantics.md §3` item 2), and every position below is derived
// from the FIXTURE a cell built through `parameter-semantics.md §2`'s mapping (`member <path> of the write's
// value argument`, an array index bare, a string key single-quoted, a refused key's own declared segment), so
// no cell compares a build against itself.
const ROOT_POSITION = "the write's value argument";
const LONE_SURROGATE_KEY_SEGMENT = "'<key: a string carrying a lone surrogate>'";
const CROSSING_STATUS = 'ValueRefusedAtBoundary';

let crossingGenerator = null;

/// The store's own generator, read from the artefact beside the claimed entry. `acceptance.md §4.1` item 1
/// forbids a cell that loads the addon INSTEAD of the entry; every drive below still reaches the package
/// through `provident-storeroom`, and this arm exists only so PART ONE's bytes have their own source.
function storeGenerator() {
  if (crossingGenerator === null) {
    if (!existsSync(ADDON_PATH)) {
      assert.fail(`the built addon must exist for PART ONE's byte-equality arm: ${ADDON_PATH}`);
    }
    crossingGenerator = createRequire(import.meta.url)(ADDON_PATH);
    if (typeof crossingGenerator.errorMessage !== 'function') {
      assert.fail('the built addon carries no `errorMessage` — PART ONE cannot be rendered by its own generator');
    }
  }
  return crossingGenerator;
}

/// PART ONE — `storeErrorMessage('ValueRefusedAtBoundary', { segment: subject })`, byte for byte
/// (`contract.md §2.1`; `parameter-semantics.md §3` item 1). The generator supplies the single quoting, and
/// this file adds none.
function declaredPartOne(subject) {
  return storeGenerator().errorMessage(CROSSING_STATUS, subject);
}

/// PART TWO — the package's appended clause, spelled exactly as `parameter-semantics.md §3` item 2 declares.
function declaredPartTwo(position, cls) {
  return `, the value at ${position} is ${cls}`;
}

/// The whole declared message: PART ONE, then PART TWO, and no third byte (`contract.md §2.1`).
function declaredRefusalMessage(subject, position, cls) {
  return declaredPartOne(subject) + declaredPartTwo(position, cls);
}

/// `parameter-semantics.md §2`'s position mapping, derived from the fixture a cell BUILT — never from a
/// build's output. The root's own position is `the write's value argument`; below it the segment path is
/// joined by `/`, an array index is bare, a string key is single-quoted, and a refused member key's segment is
/// the declared `'<key: a string carrying a lone surrogate>'` spelling (printed already quoted by the part).
function positionOf(segments) {
  if (segments.length === 0) return ROOT_POSITION;
  const path = segments
    .map((segment) => {
      if (typeof segment === 'number') return String(segment);
      if (segment !== null && typeof segment === 'object' && segment.loneSurrogateKey === true) {
        return LONE_SURROGATE_KEY_SEGMENT;
      }
      return `'${segment}'`;
    })
    .join('/');
  return `member ${path} of ${ROOT_POSITION}`;
}

/// One refusal driven through the package's claimed entry, at a FRESH instance so no container kind is carried
/// between arms. `null` is returned where the value was admitted.
function refusalOf(value, address = ['q']) {
  const inst = mem();
  try {
    inst.write(address, 'mem', value);
  } catch (err) {
    return err;
  }
  return null;
}

/// A refusal checked against the register's own cells: the ONE form with a closed-set status
/// (`surface.md §2.5`), the declared status, and the class and position — BYTE FOR BYTE where the arm's
/// PART ONE subject is declared (`contract.md §2.1`'s per-arm table), and as the exact PART TWO clause
/// otherwise. Returns `null` on the declared answer and a failure line naming what moved.
function checkRefusal(err, { cls, position, subject = null }) {
  if (err === null || err === undefined) return 'the value was ADMITTED where the contract refuses it';
  if (!isTheFailureForm(err)) return `the answer is not the one form with a closed-set status: ${JSON.stringify(err)}`;
  if (err.status !== CROSSING_STATUS) return `the declared status is ${CROSSING_STATUS}, got ${err.status}`;
  if (subject !== null) {
    const expected = declaredRefusalMessage(subject, position, cls);
    if (err.message !== expected) {
      return `the message is not the declared two-part rendering: got ${JSON.stringify(err.message)}, expected ${JSON.stringify(expected)}`;
    }
    return null;
  }
  const clause = declaredPartTwo(position, cls);
  if (!err.message.endsWith(clause)) {
    return `the class/position clause is not the declared one: got ${JSON.stringify(err.message)}, expected a message ending ${JSON.stringify(clause)}`;
  }
  return null;
}

/// A bare-tree serialisation with object keys in a CANONICAL order, so a copy-out comparison is
/// member-for-member: `contract.md §1` declares *"Member order is not semantically significant; array order
/// is"*, and a `JSON.stringify` equality would refuse a lawful re-ordering.
function canonicalTreeJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalTreeJson).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalTreeJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

// =============================================================================================
// `NG-JS-Q1` — the node ceiling under its declared convention: OWN nodes, the root excluded
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §8` row `8` and `§4`'s clause of
// 2026-10-24 items `(1)`–`(2)`; `parameter-semantics.md §1` row `8` and its clause of the same date):
//
// | The state | Its declared answer |
// | --- | --- |
// | `{}` — `0` own nodes, `1` counted | ADMITTED: the lower end of the declared `0…999,999` own-node range |
// | a dense root array of `999,999` elements — `999,999` own nodes, `1,000,000` COUNTED | ADMITTED, and it commits and reads back: the root consumes the walk's first node |
// | a dense root array of `1,000,000` elements — `1,000,000` own nodes, `1,000,001` COUNTED | REFUSED: row `8`'s class `a value over the walk ceiling`, at the ROOT position, PART ONE's `<subject>` the CLASS SPELLING, status `ValueRefusedAtBoundary` |
// | the integer's own reading | the declared integer is the OWN-node count; a cell that read it as a TOTAL node count would refuse the `999,999` state |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the `999,999`-element array refused (the total-count reading), the
// `1,000,000`-element array admitted, a refusal naming a member position instead of the root, or a PART ONE
// subject that is the value's own rendering rather than the class spelling.
test('ng_js_q1_the_node_ceiling_counts_own_nodes_and_refuses_at_the_root', { timeout: 300000 }, () => {
  runGenerator('NG-JS-Q1', 'own nodes 0 / 999,999 admitted, 1,000,000 refused', 1, () => {
    // (1) THE LOWER END OF THE DECLARED RANGE: an empty object carries no own node below its root.
    const empty = mem();
    const emptyRecord = empty.write(['q1-empty'], 'mem', {});
    if (emptyRecord === null || emptyRecord === undefined) return '0 own nodes: the write answered no commit record';
    if (emptyRecord.op === null || emptyRecord.op === undefined) return '0 own nodes: nothing committed';

    // (2) THE ADMITTED SIDE AT THE BOUNDARY: 999,999 elements are 999,999 own nodes and 1,000,000 counted.
    const inst = mem();
    const admitted = new Array(999999).fill(0);
    const record = inst.write(['q1-admitted'], 'mem', admitted);
    if (record === null || record === undefined) return '999,999 own nodes: the write answered no commit record';
    if (record.op === null || record.op === undefined) return '999,999 own nodes: the write carried no op, so nothing committed';
    const back = inst.read(['q1-admitted']);
    if (!Array.isArray(back)) return '999,999 own nodes: the read is not a dense array';
    if (back.length !== 999999) return `999,999 own nodes: the read carries ${back.length} elements`;
    if (back[999998] !== 0) return '999,999 own nodes: the last element did not cross';

    // (3) THE REFUSED SIDE: 1,000,000 elements are 1,000,000 own nodes and 1,000,001 counted.
    return checkRefusal(refusalOf(new Array(1000000).fill(0), ['q1-refused']), {
      cls: 'a value over the walk ceiling',
      position: ROOT_POSITION,
      subject: 'a value over the walk ceiling',
    });
  });
});

// =============================================================================================
// `NG-JS-Q2` — PART ONE's `<subject>`, per arm, BYTE-EQUAL to the store's own renderer
// =============================================================================================
//
// **⟶ RE-DERIVED 2026-10-24 — THE CROSSING-DEFECT RULING PASS (`role_test_writer`; `docs/defects.md` ·
// `DEF-2026-10-24-D`; `contract.md §2.1`'s clause of that date, items `(1)`–`(5)`). THE STATE TABLE BELOW WAS
// AUTHORED FROM `§2.1`'s PER-ARM TABLE AS IT STOOD BEFORE THAT CLAUSE LANDED, SO SIX OF ITS `<subject>` CELLS
// ENCODED THE SUPERSEDED LAW — the rendering of the refused value — AND ARE RE-DERIVED HERE TO THE CLASS
// SPELLING EACH ARM'S OWN ROW CARRIES.** The rule the table is re-derived from is the clause's item `(1)`, which
// is quoted so no cell is guessed at: *"a refusal's message is rendered from the walk's own facts, and NO USER
// CODE RUNS ON A REFUSAL PATH — the subject rendering may not invoke the refused value's own
// `Symbol.toPrimitive`, `toString` or `valueOf`"*; a guarded `catch` answers a THROWING trap only and cannot
// un-run a trap that RETURNS a string, so `String(value)` is withdrawn as a subject source at every arm whose
// subject was the value's own rendering. **THE CELLS RE-DERIVED ARE ROWS `5`, `11`, `13`, `14`, `15` and `16`
// (item `(2)`), and at those arms PART ONE's `<subject>` and PART TWO's `<class>` are now THE SAME STRING, so the
// message names the row's class twice — the declared form, not a defect (item `(3)`), and NO CELL MAY ASSERT AN
// EMPTY SUBJECT (item `(5)` item `(b)`).** Rows `1`, `2`, `4`, `6`, `7`, `9`, `10`, `12` and row `8`'s NODE arm
// are byte-identical (item `(6)`): a `bigint`'s `` `n` `` form, a `Symbol()`'s own rendering, a lone-surrogate
// string's class spelling and the callable `Proxy`'s `a Proxy` subject with its `a function` class are NOT
// value renderings and are unmoved. **THE TWO CONDITIONAL CELLS — row `3`'s SOURCE TEXT and row `8`'s DEPTH arm's
// own spelling, *"each read WITHOUT invoking an own `Symbol.toPrimitive`, `toString` or `valueOf` member of the
// refused value; WHERE THE REFUSED VALUE CARRIES SUCH AN OWN MEMBER, THE ARM ANSWERS THE CLASS SPELLING"*
// (item `(4)`) — ARE DRIVEN BY `NG-JS-Q2d` BELOW, which asserts BOTH branches of each. AND ROWS `11` AND `15`'S
// RE-DERIVED CELLS CARRY NO ARM IN THIS GENERATOR: their subjects are driven by `NG-JS-Q2b` (row `11`) and
// `NG-JS-Q2c` (row `15`), each with the conversion trap instrumented so a later regression that re-enters user
// code at those arms cannot pass.**
//
// **THE STATES ENUMERATED, RE-DERIVED — ONE ROW PER ARM, THE SUBJECT FROM THE CLAUSE AND NEVER FROM THE BUILD:**
//
// | The arm | The target the walk hands (`fault.value`) | PART ONE's `<subject>` | This pass |
// | --- | --- | --- | --- |
// | row `5`, an EMPTY containing array (`[]` carrying a Symbol-keyed own member) | the containing value | **the CLASS SPELLING `'a value carrying a Symbol-keyed own member'`** — the containing value is NOT rendered, so the empty subject is retired | RE-DERIVED |
// | row `5`, a plain object carrying a Symbol-keyed own member | the containing value | **the CLASS SPELLING `'a value carrying a Symbol-keyed own member'`** — `'[object Object]'` is retired | RE-DERIVED |
// | row `13`, a NON-EMPTY `Array` subclass (`1,2`) | the instance itself | **the CLASS SPELLING `'a class extending Array'`** — the instance is NOT rendered, so `'1,2'` is retired | RE-DERIVED |
// | row `13`, an EMPTY `Array` subclass | the instance itself | **the CLASS SPELLING `'a class extending Array'`** — the empty subject is retired | RE-DERIVED |
// | row `14`, a class instance | the value itself | **the CLASS SPELLING `'a class instance or another prototype-carrying non-plain object'`** — its class's own `toString` is not reached, so `'[object Object]'` is retired | RE-DERIVED |
// | row `16`, a sparse `[1,,3]` | the array itself | **the CLASS SPELLING `'a sparse array'`** — the array is NOT rendered, so `'1,,3'` is retired | RE-DERIVED |
// | row `9`, a lone-surrogate string at a value position | the value itself | the CLASS SPELLING `'a string carrying a lone surrogate'` — a declared substitution, not a value rendering | unmoved |
// | row `6`, a `bigint` | the value itself | `` `10n` `` — the decimal carrying its `n` (a declared substitution) | unmoved |
// | row `4`, a `Symbol` | the value itself | `'Symbol()'` (a declared substitution) | unmoved |
// | rows `3`/`12`, a CALLABLE `Proxy` | the value itself | `'a Proxy'` — a declared substitution that runs no trap — while its CLASS is row `3`'s `a function` | unmoved |
// | row `12`, a `Proxy` that is not callable | the value itself | `'a Proxy'`, and its CLASS is `a Proxy` | unmoved |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any arm whose message differs from
// `declaredPartOne(<subject>) + declaredPartTwo(<position>, <class>)` by ONE byte — which is what catches a
// subject re-rendered by the package, **a VALUE RENDERING at any of the six re-derived arms (`''`, `'1,2'`,
// `'1,,3'`, `'[object Object]'`), i.e. the `String(value)` the ruling pass withdrew — a class spelling taken as
// the subject where a declared substitution is the subject**, and the `Proxy` arm answering one spelling for
// both its class and its subject.
test('ng_js_q2_part_ones_subject_is_the_declared_arm_subject_byte_for_byte', () => {
  runGenerator('NG-JS-Q2', "PART ONE's subject per arm, against the store's own renderer", 1, () => {
    class ArraySubclass extends Array {}
    class SampleClass {}
    const nonEmptySubclass = new ArraySubclass();
    nonEmptySubclass.push(1, 2);
    const emptySubclass = new ArraySubclass();
    const symbolMemberOnEmptyArray = [];
    symbolMemberOnEmptyArray[Symbol('s')] = 1;
    const symbolMemberOnObject = { [Symbol('s')]: 1 };
    const sparse = [1, , 3];
    const loneSurrogate = '\uD800';
    const bigint = 10n;
    const symbol = Symbol('s');
    const callableProxy = new Proxy(function crossingProxyTarget() {}, {});
    const objectProxy = new Proxy({}, {});
    const classInstance = new SampleClass();
    const arms = [
      {
        // RE-DERIVED 2026-10-24: `§2.1`'s clause of that date, item `(2)` — row `5`'s `<subject>` cell reads the
        // CLASS SPELLING, and item `(5)` item `(b)` retires the empty subject this arm used to answer (`''`).
        label: 'row 5: an empty containing array answers the CLASS SPELLING, not the empty subject',
        value: symbolMemberOnEmptyArray,
        cls: 'a value carrying a Symbol-keyed own member',
        subject: 'a value carrying a Symbol-keyed own member',
      },
      {
        // RE-DERIVED 2026-10-24: row `16`'s `<subject>` cell reads the CLASS SPELLING; `'1,,3'` is retired.
        label: 'row 16: a sparse [1,,3] answers the CLASS SPELLING, not its comma join',
        value: sparse,
        cls: 'a sparse array',
        subject: 'a sparse array',
      },
      {
        // RE-DERIVED 2026-10-24: row `13`'s `<subject>` cell reads the CLASS SPELLING; `'1,2'` is retired.
        label: 'row 13: a non-empty Array subclass answers the CLASS SPELLING, not its elements',
        value: nonEmptySubclass,
        cls: 'a class extending Array',
        subject: 'a class extending Array',
      },
      {
        // RE-DERIVED 2026-10-24: row `13` again — the instance is not rendered at all, so the empty subject this
        // arm used to answer is retired with the cell.
        label: 'row 13: an empty Array subclass answers the CLASS SPELLING, not the empty subject',
        value: emptySubclass,
        cls: 'a class extending Array',
        subject: 'a class extending Array',
      },
      {
        // RE-DERIVED 2026-10-24: row `5`'s other state — `'[object Object]'` is retired for the class spelling.
        label: 'row 5: a plain object answers the CLASS SPELLING, not [object Object]',
        value: symbolMemberOnObject,
        cls: 'a value carrying a Symbol-keyed own member',
        subject: 'a value carrying a Symbol-keyed own member',
      },
      {
        // RE-DERIVED 2026-10-24: row `14`'s `<subject>` cell reads the CLASS SPELLING, and *"its class's own
        // `toString` is not reached"* (item `(2)`) — so `'[object Object]'` is retired.
        label: 'row 14: a class instance answers the CLASS SPELLING, not its own [object Object]',
        value: classInstance,
        cls: 'a class instance or another prototype-carrying non-plain object',
        subject: 'a class instance or another prototype-carrying non-plain object',
      },
      {
        label: 'row 9: a lone surrogate renders the CLASS SPELLING and not its bytes',
        value: loneSurrogate,
        cls: 'a string carrying a lone surrogate',
        subject: 'a string carrying a lone surrogate',
      },
      {
        label: 'row 6: a bigint renders its decimal carrying an n',
        value: bigint,
        cls: 'a bigint',
        subject: `${bigint}n`,
      },
      {
        label: 'row 4: a Symbol renders Symbol()',
        value: symbol,
        cls: 'a symbol',
        subject: 'Symbol()',
      },
      {
        label: 'rows 3/12: a CALLABLE Proxy renders a Proxy while its class is a function',
        value: callableProxy,
        cls: 'a function',
        subject: 'a Proxy',
      },
      {
        label: 'row 12: a Proxy that is not callable renders a Proxy, class a Proxy',
        value: objectProxy,
        cls: 'a Proxy',
        subject: 'a Proxy',
      },
    ];
    for (const arm of arms) {
      const verdict = checkRefusal(refusalOf(arm.value), {
        cls: arm.cls,
        position: ROOT_POSITION,
        subject: arm.subject,
      });
      if (verdict !== null) return `${arm.label}: ${verdict}`;
    }
    // AND THE SUBJECT AND THE CLASS ARE NOT THE SAME STRING AT THE CALLABLE `Proxy`'S ARM — the clause of
    // 2026-10-24 in `§2` item `(3)` declares exactly this divergence, and the two arms above prove it.
    const callable = refusalOf(callableProxy);
    if (callable.message === declaredRefusalMessage('a Proxy', ROOT_POSITION, 'a Proxy')) {
      return 'the callable Proxy arm answered one spelling for its subject and its class';
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q2b` — row `11`: the CLASS SPELLING as the subject, and the ancestor's trap NEVER RUNS
// =============================================================================================
//
// **THE GAP THIS CLOSES, AS THE GATE-11 RE-AUDIT MEASURED IT (2026-10-24, read-only): row `11`'s `<subject>` cell
// was re-derived to the class spelling and NO CELL ANYWHERE DROVE THE ARM** — so a build that re-entered the
// refused ancestor's own conversion member at `String(value)` and rendered whatever that member returned (the
// `'[object Object]'` of the retired law, or the caller's marker) held every green. **THE EXPECTATION IS READ
// FROM `contract.md §2.1`'s clause of 2026-10-24 AND NOT FROM THE BUILD:** item `(1)` — *"a refusal's message is
// rendered from the walk's own facts, and NO USER CODE RUNS ON A REFUSAL PATH — the subject rendering may not
// invoke the refused value's own `Symbol.toPrimitive`, `toString` or `valueOf`"* — item `(2)`'s row-`11` cell
// (*"the CLASS SPELLING `'a value that contains itself'` — the ancestor is not rendered"*) and item `(3)` (*"at
// those six arms PART ONE's `<subject>` and PART TWO's `<class>` are the SAME STRING … and no cell may assert a
// value rendering"*). `parameter-semantics.md §2`'s position mapping supplies the member positions.
//
// **AND THE ONE MEMBER THIS FIXTURE MAY NOT GIVE THE ANCESTOR IS `Symbol.toPrimitive`, BY THE REGISTER'S OWN
// ORDER AND NOT BY CONVENIENCE:** an own SYMBOL-keyed member refuses the whole value at row `5`
// (`§2` row `5`, the `accessorOrSymbolArm` test) at the value's OWN visit and BEFORE any member is walked — a
// row-`11` fixture carrying one would answer row `5`'s class and would not be a row-`11` drive at all. The
// `toString` and `valueOf` members below are string-keyed data members, neither an accessor nor a symbol, so the
// ancestor arm is the one reached.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | `a.self = a` at the ROOT, `a` owning `toString` and `valueOf` DATA members, each a counting trap | REFUSED row `11`'s class at ``member 'self' of the write's value argument``, PART ONE's `<subject>` the CLASS SPELLING `'a value that contains itself'`, and BOTH counters `0` |
// | the same shape one level down (`{outer: <the same value>}`) | the SAME class and subject at ``member 'outer'/'self' of the write's value argument``, counters `0` — the position moves and the subject does not |
// | the same shape with NO own conversion member (the CONTROL) | the SAME class, position and subject: the subject is DECLARED and is never derived from the value's own rendering |
// | the trap's own return value | NEVER appears in PART ONE, so a build that ran a trap fails the byte-equality as well as the counter |
// | THE INSTRUMENT'S OWN LIVENESS | a direct `String(...)` of a FRESH twin RUNS the trap and answers its marker, ASSERTED before any drive — so every `0` below is evidence that no rendering was taken, never a dead counter |
//
// **NOTHING SHARED IS MUTATED:** every trap member lives on a value this drive CREATED, and no counter outlives
// the arm it was read at — so there is no prototype, no shared object and no global to restore, and a red here
// cannot poison a later cell.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** PART ONE carrying `'[object Object]'` or the trap's marker, the class
// spelling with a wrong position beside it, or either counter reading non-zero.
test('ng_js_q2b_row_11s_subject_is_the_class_spelling_and_its_conversion_trap_never_runs', () => {
  runGenerator('NG-JS-Q2b', "row 11: the class spelling as the subject, the ancestor's trap never run", 1, () => {
    const CLASS = 'a value that contains itself';
    const buildTrappedAncestor = () => {
      const runs = { toString: 0, valueOf: 0 };
      const value = {};
      value.self = value; // the repeated ancestor — row 11's arm
      Object.defineProperty(value, 'toString', {
        value() { runs.toString += 1; return 'REENTERED_BY_TO_STRING'; },
        enumerable: false,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(value, 'valueOf', {
        value() { runs.valueOf += 1; return 'REENTERED_BY_VALUE_OF'; },
        enumerable: false,
        configurable: true,
        writable: true,
      });
      return { value, runs };
    };

    // THE INSTRUMENT IS LIVE, ASSERTED BEFORE ANY DRIVE: a direct `String(...)` of a FRESH twin runs the trap, so
    // every `0` below is EVIDENCE that no rendering was taken and never a dead counter.
    const liveTwin = buildTrappedAncestor();
    const liveRendering = String(liveTwin.value);
    if (liveTwin.runs.toString === 0) {
      return 'the trap instrument is DEAD: a direct String(value) ran no conversion member';
    }
    if (!liveRendering.includes('REENTERED_BY')) {
      return `the trap instrument answered ${JSON.stringify(liveRendering)} instead of its marker`;
    }

    // (1) THE ROOT STATE.
    const atRoot = buildTrappedAncestor();
    const rootError = refusalOf(atRoot.value, ['q2b-root']);
    const rootVerdict = checkRefusal(rootError, {
      cls: CLASS,
      position: positionOf(['self']),
      subject: CLASS,
    });
    if (rootVerdict !== null) return `row 11 at the ROOT: ${rootVerdict}`;
    if (atRoot.runs.toString !== 0 || atRoot.runs.valueOf !== 0) {
      return `row 11's conversion member RAN on the refusal path: toString=${atRoot.runs.toString}, valueOf=${atRoot.runs.valueOf}`;
    }
    if (rootError.message.includes('REENTERED_BY')) return "the trap's return value reached PART ONE";

    // (2) THE SAME SHAPE AT A MEMBER POSITION: the position moves, the subject does not.
    const atMember = buildTrappedAncestor();
    const memberVerdict = checkRefusal(refusalOf({ outer: atMember.value }, ['q2b-member']), {
      cls: CLASS,
      position: positionOf(['outer', 'self']),
      subject: CLASS,
    });
    if (memberVerdict !== null) return `row 11 at a MEMBER position: ${memberVerdict}`;
    if (atMember.runs.toString !== 0 || atMember.runs.valueOf !== 0) {
      return `row 11's conversion member RAN at a MEMBER position: toString=${atMember.runs.toString}, valueOf=${atMember.runs.valueOf}`;
    }

    // (3) THE CONTROL: with NO own conversion member the answer is the SAME — the subject is the row's class and
    // is never the value's own rendering, whatever that rendering would have been.
    const untrapped = {};
    untrapped.self = untrapped;
    const controlVerdict = checkRefusal(refusalOf(untrapped, ['q2b-control']), {
      cls: CLASS,
      position: positionOf(['self']),
      subject: CLASS,
    });
    if (controlVerdict !== null) return `row 11 with NO own conversion member (the control): ${controlVerdict}`;
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q2c` — row `15`: the CLASS SPELLING as the subject, and the ACCESSOR never runs
// =============================================================================================
//
// **THE GAP THIS CLOSES, AND WHY THIS IS THE SHARPEST OF THE SIX:** row `15` refuses a CONTAINING VALUE that owns
// an accessor, and the retired law handed that containing value to `String(value)` — which for a
// `toString` ACCESSOR means the refusal itself READS THE CALLER'S GETTER, i.e. runs user code while rejecting the
// value. **`contract.md §2.1`'s clause of 2026-10-24, items `(1)`–`(3)`, declares the answer and this cell asserts
// exactly it:** item `(1)` — *"NO USER CODE RUNS ON A REFUSAL PATH"* — item `(2)`'s row-`15` cell (*"the CLASS
// SPELLING `'a value carrying an own accessor member'` — the containing value is not rendered"*) and item `(3)`
// (*"no cell may assert a value rendering, an element join or an EMPTY subject at any of the six"*).
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | an object owning a `toString` ACCESSOR at the ROOT, the getter counting and returning a marker function | REFUSED row `15`'s class at `the write's value argument`, PART ONE's `<subject>` the CLASS SPELLING `'a value carrying an own accessor member'`, and the getter's counter `0` |
// | the same shape at a MEMBER position (`{outer: <the same shape>}`) | the SAME class and subject at ``member 'outer' of the write's value argument``, counter `0` |
// | an object owning `toString` as an ENUMERABLE DATA member of an admitted class (the CONTROL) | ADMITTED — row `15` is the ACCESSOR arm (`§2` row `15`), not a test on a member's NAME, and the member crosses as data |
// | the getter's own return value | NEVER appears in PART ONE |
// | THE INSTRUMENT'S OWN LIVENESS | a direct `String(...)` of a FRESH twin READS the accessor and answers its marker, ASSERTED before any drive — so the `0`s below are evidence, never a dead counter |
//
// **THE CONTROL IS THE SHARPEST LIMB OF THIS CELL:** if a build refused any own member named `toString`, the
// control fails; if it rendered the containing value, the counter and the byte-equality fail; and if it rendered
// the empty subject of the retired array arm, the subject mismatch fails. **NOTHING SHARED IS MUTATED** — every
// accessor and counter lives on a value this drive created.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the getter's counter non-zero, PART ONE carrying the marker or
// `'[object Object]'`, the empty subject, or the control's `toString` DATA member refused.
test('ng_js_q2c_row_15s_subject_is_the_class_spelling_and_its_accessor_never_runs', () => {
  runGenerator('NG-JS-Q2c', "row 15: the class spelling as the subject, the accessor never run", 1, () => {
    const CLASS = 'a value carrying an own accessor member';
    const buildAccessorValue = () => {
      const runs = { getter: 0 };
      const value = { k: 1 };
      Object.defineProperty(value, 'toString', {
        get() {
          runs.getter += 1;
          return () => 'REENTERED_BY_ACCESSOR';
        },
        enumerable: true,
        configurable: true,
      });
      return { value, runs };
    };

    // THE INSTRUMENT IS LIVE, ASSERTED BEFORE ANY DRIVE: a direct `String(...)` of a FRESH twin READS the accessor,
    // so the `0`s below are evidence that the refusal took no rendering and never a dead counter.
    const liveTwin = buildAccessorValue();
    const liveRendering = String(liveTwin.value);
    if (liveTwin.runs.getter === 0) {
      return 'the accessor instrument is DEAD: a direct String(value) read no accessor';
    }
    if (!liveRendering.includes('REENTERED_BY')) {
      return `the accessor instrument answered ${JSON.stringify(liveRendering)} instead of its marker`;
    }

    // (1) THE ROOT STATE.
    const atRoot = buildAccessorValue();
    const rootError = refusalOf(atRoot.value, ['q2c-root']);
    const rootVerdict = checkRefusal(rootError, {
      cls: CLASS,
      position: ROOT_POSITION,
      subject: CLASS,
    });
    if (rootVerdict !== null) return `row 15 at the ROOT: ${rootVerdict}`;
    if (atRoot.runs.getter !== 0) return `row 15's accessor was READ on the refusal path (getter ran ${atRoot.runs.getter}x)`;
    if (rootError.message.includes('REENTERED_BY')) return "the accessor's return value reached PART ONE";

    // (2) THE SAME SHAPE AT A MEMBER POSITION.
    const atMember = buildAccessorValue();
    const memberVerdict = checkRefusal(refusalOf({ outer: atMember.value }, ['q2c-member']), {
      cls: CLASS,
      position: positionOf(['outer']),
      subject: CLASS,
    });
    if (memberVerdict !== null) return `row 15 at a MEMBER position: ${memberVerdict}`;
    if (atMember.runs.getter !== 0) return `row 15's accessor was READ at a MEMBER position (getter ran ${atMember.runs.getter}x)`;

    // (3) THE CONTROL: `toString` as an ENUMERABLE DATA member of an admitted class is not row `15`'s arm — the
    // row names an ACCESSOR, so the name alone refuses nothing and the member crosses as data.
    const inst = mem();
    try {
      inst.write(['q2c-control'], 'mem', { toString: 'data member', k: 2 });
    } catch (err) {
      return `an own \`toString\` DATA member was REFUSED (${err && err.status}: ${JSON.stringify(err && err.message)}) where §2 row 15 names an ACCESSOR`;
    }
    const back = inst.read(['q2c-control']);
    if (back === null || typeof back !== 'object') return 'the control: the read answered no object';
    if (back.toString !== 'data member') return `the control: member \`toString\` read back as ${JSON.stringify(back.toString)}`;
    if (back.k !== 2) return 'the control: member `k` did not cross beside it';
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q2d` — rows `3`/`8`: each CONDITIONAL subject, driven on BOTH sides of the test
// =============================================================================================
//
// **THE GAP THIS CLOSES:** `contract.md §2.1`'s clause of 2026-10-24, item `(4)`, re-derives row `3`'s `<subject>`
// cell and row `8`'s DEPTH-arm cell CONDITIONALLY — *"each read WITHOUT invoking an own `Symbol.toPrimitive`,
// `toString` or `valueOf` member of the refused value; WHERE THE REFUSED VALUE CARRIES SUCH AN OWN MEMBER, THE ARM
// ANSWERS THE CLASS SPELLING — `'a function'` at row `3`, `'a value over the walk ceiling'` at row `8`'s depth
// arm."* **NEITHER BRANCH WAS DRIVEN ANYWHERE:** row `3`'s BASE subject — a plain callable function's own SOURCE
// TEXT — was unasserted in the whole file, and row `8`'s depth arm was asserted only with a NUMBER leaf (`'0'` in
// `NG-JS-Q6` and `NG-JS-Q3`), never with an object and never on the conditional side.
//
// **THE BASE'S EXPECTATION IS THE CLAUSE'S OWN NAMED MACHINERY, READ FROM THE LANGUAGE AND NOT FROM THE PACKAGE:**
// *"the function's own source text — read through the standard `Function.prototype.toString` machinery (`String
// (fn)`'s answer for a function that carries no conversion member of its own)"* — so `String(fn)` IS the declared
// rendering here, and a build answering class spelling at this arm is answering the CONDITIONAL branch
// unconditionally.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | (a) row `3`, a plain named function with NO own conversion member — THE BASE | REFUSED `a function` at `the write's value argument`, PART ONE's `<subject>` its own SOURCE TEXT `String(fn)` |
// | (b) row `3`, the same function owning `toString` (a counting trap) | the SAME class and position, `<subject>` the CLASS SPELLING `'a function'`, counter `0` |
// | (c) row `3`, owning `valueOf` (a counting trap) | as (b) — **and `String(fn)` never reaches an own `valueOf` at all** (the `string` hint answers through the inherited `toString` first), so this member's liveness is proved through the `number` hint while its PART ONE expectation is the clause's, which names all three members |
// | (d) row `3`, owning `Symbol.toPrimitive` (a counting trap) | as (b) — a FUNCTION reads row `3` before any object-shape arm, so an own symbol is not row `5` here |
// | (e) row `8`'s DEPTH arm, a plain object with NO own conversion member at depth `127` — THE BASE | REFUSED `a value over the walk ceiling` at the value's own `127`-segment path, `<subject>` its OWN RENDERING `'[object Object]'` |
// | (f) row `8`'s DEPTH arm, the same depth, the object owning `toString` (a counting trap) | the SAME class and position, `<subject>` the CLASS SPELLING `'a value over the walk ceiling'`, counter `0` |
// | THE INSTRUMENTS' OWN LIVENESS | each counting trap is proved live before its drive — a direct `String(...)` of a fresh twin runs it, and `String({})` is the language's own `'[object Object]'` — so every `0` is evidence |
//
// **NOTHING SHARED IS MUTATED** — the traps live on functions and objects this drive created, and the depth chains
// are fresh arrays.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the BASE arms answering the class spelling (the conditional branch taken
// unconditionally), the CONDITIONAL arms answering a source text or `'[object Object]'`, or any counter non-zero.
test('ng_js_q2d_row_3_and_row_8s_depth_arm_answer_their_conditional_subjects', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q2d', "rows 3 and 8's depth arm: each subject on BOTH sides of the conversion-member test", 1, () => {
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const deepPaths = positionOf([...Array(127).fill(0)]);

    // (a) ROW 3, THE BASE.
    const plainFunction = function crossingPlainFunction() {
      return 1;
    };
    const sourceText = String(plainFunction);
    if (typeof sourceText !== 'string' || sourceText.indexOf('function crossingPlainFunction') !== 0) {
      return "the fixture's own source text is not the standard machinery's answer, so the BASE arm is not driven";
    }
    const baseVerdict = checkRefusal(refusalOf(plainFunction, ['q2d-fn-base']), {
      cls: 'a function',
      position: ROOT_POSITION,
      subject: sourceText,
    });
    if (baseVerdict !== null) return `row 3 with NO own conversion member (the BASE): ${baseVerdict}`;

    // (b)–(d) ROW 3, THE CONDITIONAL, one conversion member at a time.
    const conversionMembers = ['toString', 'valueOf', Symbol.toPrimitive];
    for (let i = 0; i < conversionMembers.length; i += 1) {
      const key = conversionMembers[i];
      const runs = { count: 0 };
      const trapped = function crossingTrappedFunction() {
        return 2;
      };
      Object.defineProperty(trapped, key, {
        value() {
          runs.count += 1;
          return 'REENTERED_AT_ROW_3';
        },
        enumerable: false,
        configurable: true,
        writable: true,
      });
      // THE INSTRUMENT IS LIVE FOR THIS MEMBER, each through a CONVERSION THE MEMBER ACTUALLY PARTICIPATES IN: a
      // direct `String(fn)` takes the `string` hint and reaches an own `toString` or `Symbol.toPrimitive`, while an
      // own `valueOf` is NEVER reached by `String(fn)` — the inherited `toString` answers first — so that member's
      // liveness is proved through the `number` hint, which is the conversion that does consult it. **THE FRESH
      // TWIN CARRIES ITS OWN COUNTER**, so the driven counter below is untouched by this probe.
      const liveRuns = { count: 0 };
      const liveTwin = function crossingLiveTwin() {
        return 3;
      };
      Object.defineProperty(liveTwin, key, {
        value() {
          liveRuns.count += 1;
          return 'REENTERED_AT_ROW_3';
        },
        enumerable: false,
        configurable: true,
        writable: true,
      });
      if (key === 'valueOf') {
        Number(liveTwin);
        if (liveRuns.count === 0) return `the row 3 instrument for an own ${String(key)} is DEAD: the number hint ran no conversion member`;
      } else {
        const liveRendering = String(liveTwin);
        if (liveRuns.count === 0 || !liveRendering.includes('REENTERED_AT_ROW_3')) {
          return `the row 3 instrument for an own ${String(key)} is DEAD: a direct String(fn) answered ${JSON.stringify(liveRendering)}`;
        }
      }
      const verdict = checkRefusal(refusalOf(trapped, [`q2d-fn-${i}`]), {
        cls: 'a function',
        position: ROOT_POSITION,
        subject: 'a function',
      });
      if (verdict !== null) return `row 3 carrying an own ${String(key)}: ${verdict}`;
      if (runs.count !== 0) return `row 3's own ${String(key)} RAN on the refusal path (count ${runs.count})`;
    }

    // (e) ROW 8's DEPTH ARM, THE BASE: the refused value is a plain object and it is NOT rendered as its class.
    const depthBaseVerdict = checkRefusal(refusalOf(arrayChain({}, 127), ['q2d-depth-base']), {
      cls: 'a value over the walk ceiling',
      position: deepPaths,
      subject: '[object Object]',
    });
    if (depthBaseVerdict !== null) return `row 8's DEPTH arm with NO own conversion member (the BASE): ${depthBaseVerdict}`;

    // (f) ROW 8's DEPTH ARM, THE CONDITIONAL: the same depth, the refused value owning `toString`.
    const depthRuns = { count: 0 };
    const trappedLeaf = {};
    Object.defineProperty(trappedLeaf, 'toString', {
      value() {
        depthRuns.count += 1;
        return 'REENTERED_AT_ROW_8';
      },
      enumerable: false,
      configurable: true,
      writable: true,
    });
    // THE INSTRUMENT IS LIVE: a direct `String({})` of this shape answers `'[object Object]'`, and with the own
    // member it answers the marker and counts — so the `0` asserted below is evidence and not a dead counter.
    const liveRuns = { count: 0 };
    const liveLeaf = {};
    Object.defineProperty(liveLeaf, 'toString', {
      value() {
        liveRuns.count += 1;
        return 'REENTERED_AT_ROW_8';
      },
      enumerable: false,
      configurable: true,
      writable: true,
    });
    const liveRendering = String(liveLeaf);
    if (liveRuns.count === 0 || !liveRendering.includes('REENTERED_AT_ROW_8')) {
      return `the row 8 depth-arm instrument is DEAD: a direct String(object) answered ${JSON.stringify(liveRendering)}`;
    }
    if (String({}) !== '[object Object]') {
      return "the BASE expectation `'[object Object]'` is not the language's own rendering of a plain object";
    }
    const depthConditionalVerdict = checkRefusal(refusalOf(arrayChain(trappedLeaf, 127), ['q2d-depth-trapped']), {
      cls: 'a value over the walk ceiling',
      position: deepPaths,
      subject: 'a value over the walk ceiling',
    });
    if (depthConditionalVerdict !== null) return `row 8's DEPTH arm carrying an own \`toString\`: ${depthConditionalVerdict}`;
    if (depthRuns.count !== 0) return `row 8's own \`toString\` RAN on the refusal path (count ${depthRuns.count})`;
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q2e` — a CALLABLE `Proxy` owning a conversion member: row `3`'s class, `a Proxy` subject
// =============================================================================================
//
// **THE GAP THIS CLOSES:** `contract.md §2`'s clause of 2026-10-24 (`DEF-2026-10-24-B` · `F7`) declares that a
// CALLABLE `Proxy` occupies rows `3` AND `12` and that ROW `3` GOVERNS, and `§2.1`'s clause of the same date
// item `(4)` states the subject for that one arm separately from every other `Proxy` state. **THE GUARD ORDERING
// IS THE POINT OF THE CELL AND IT IS WHAT THE TRAP COUNTER INSTRUMENTS:** the `Proxy` test must run BEFORE the
// conversion-member test — `§2.1` item `(1)` re-derives the `Proxy` branch as *"renders `classSpelling(value)` and
// RUNS NO TRAP"* — so a build that tested the conversion member first would ask the proxy for its own
// `toString` (`getOwnPropertyDescriptor`, a TRAP) and answer row `3`'s class spelling as the subject. The
// counters below make that ordering an OBSERVED fact rather than an inference from the message.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`§2`'s clause of 2026-10-24 item `(1)`/`(3)` and `§2.1`'s
// clause of the same date, its row-`3` cell):
//
// | The state | Its declared answer |
// | --- | --- |
// | a callable `Proxy` whose TARGET owns `toString` and `valueOf`, the handler counting `get`, `getOwnPropertyDescriptor`, `has` and `apply` | REFUSED row `3`'s class `a function` at `the write's value argument`, PART ONE's `<subject>` `'a Proxy'`, and EVERY counter `0` |
// | the same shape whose target owns no conversion member (the CONTROL) | the SAME class, position and subject — the subject does not depend on the target |
// | the divergence `§2` item `(3)` declares | the CLASS and the `<subject>` are DIFFERENT strings — `a function` and `a Proxy` — at both states, asserted so a build answering one spelling for both fails |
// | THE INSTRUMENT'S OWN LIVENESS | a direct `String(...)` of a FRESH twin proxy RUNS the handler's traps, ASSERTED before any drive — so a zero count below is evidence that no member of the proxy was asked for |
//
// **NOTHING SHARED IS MUTATED:** the target, the handler and its counters belong to this drive.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the class answered as `a Proxy` (row `12` taking precedence over row `3`),
// the subject answered as `a function` (the conversion-member test reached the proxy first), or any handler trap
// counted.
test('ng_js_q2e_a_callable_proxy_owning_a_conversion_member_answers_row_3s_class_and_a_proxys_subject', () => {
  runGenerator('NG-JS-Q2e', 'rows 3/12: a callable Proxy owning a conversion member, and its guard ordering', 1, () => {
    const buildCallableProxy = (withConversionMembers) => {
      const runs = { get: 0, getOwnPropertyDescriptor: 0, has: 0, apply: 0 };
      const target = function crossingProxyTarget() {
        return 1;
      };
      if (withConversionMembers) {
        for (const key of ['toString', 'valueOf']) {
          Object.defineProperty(target, key, {
            value() {
              return 'REENTERED_BY_PROXY_TARGET';
            },
            enumerable: false,
            configurable: true,
            writable: true,
          });
        }
      }
      const handler = {
        get(t, key, receiver) {
          runs.get += 1;
          return Reflect.get(t, key, t);
        },
        getOwnPropertyDescriptor(t, key) {
          runs.getOwnPropertyDescriptor += 1;
          return Reflect.getOwnPropertyDescriptor(t, key);
        },
        has(t, key) {
          runs.has += 1;
          return Reflect.has(t, key);
        },
        apply(t, thisArg, args) {
          runs.apply += 1;
          return Reflect.apply(t, thisArg, args);
        },
      };
      return { value: new Proxy(target, handler), runs };
    };

    const states = [
      ['with an own `toString`/`valueOf` on its target', true],
      ['with no own conversion member on its target (the CONTROL)', false],
    ];

    // THE INSTRUMENT IS LIVE, ASSERTED BEFORE ANY DRIVE: a direct `String(...)` of a FRESH twin proxy runs the
    // handler's traps, so a zero count below is EVIDENCE that no member of the proxy was ever asked for.
    const liveTwin = buildCallableProxy(true);
    const liveRendering = String(liveTwin.value);
    const liveTraps = liveTwin.runs.get + liveTwin.runs.getOwnPropertyDescriptor + liveTwin.runs.has + liveTwin.runs.apply;
    if (liveTraps === 0) return 'the Proxy trap instrument is DEAD: a direct String(proxy) ran no handler trap';
    if (!liveRendering.includes('REENTERED_BY_PROXY_TARGET')) {
      return `the Proxy trap instrument answered ${JSON.stringify(liveRendering)} instead of the target's marker`;
    }

    for (let i = 0; i < states.length; i += 1) {
      const [label, withConversionMembers] = states[i];
      const built = buildCallableProxy(withConversionMembers);
      const error = refusalOf(built.value, [`q2e-${i}`]);
      // ROW `3` GOVERN (`§2`'s clause of 2026-10-24, item `(1)`) AND THE SUBJECT IS `a Proxy` (item `(3)`).
      const verdict = checkRefusal(error, {
        cls: 'a function',
        position: ROOT_POSITION,
        subject: 'a Proxy',
      });
      if (verdict !== null) return `a CALLABLE Proxy ${label}: ${verdict}`;
      const traps = built.runs.get + built.runs.getOwnPropertyDescriptor + built.runs.has + built.runs.apply;
      if (traps !== 0) {
        return `a CALLABLE Proxy ${label}: a handler TRAP ran on the refusal path (get=${built.runs.get}, getOwnPropertyDescriptor=${built.runs.getOwnPropertyDescriptor}, has=${built.runs.has}, apply=${built.runs.apply})`;
      }
      if (error.message.includes('REENTERED_BY')) return `a CALLABLE Proxy ${label}: the target's conversion member reached PART ONE`;
      if (error.message === declaredRefusalMessage('a Proxy', ROOT_POSITION, 'a Proxy')) {
        return `a CALLABLE Proxy ${label}: the class and the subject answered ONE spelling where §2 item (3) declares two`;
      }
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q2f` — a conversion member carried on the PROTOTYPE never runs on a refusal path
// =============================================================================================
//
// **THE RESIDUAL THIS CELL WAS THE RED FOR, AS THE LIVE LAYER MEASURED IT** (`docs/specs/storeroom-json-crossing-live-report.md §14.5`, `LIVE-X4`/`LIVE-X5`): the guard as that run read it tested **own** descriptors only,
// so a conversion member carried on the **prototype chain** was not seen, `String(value)` ran it, and the trap's
// return value became PART ONE's `<subject>` — caller-controlled bytes inside a refusal message. **`LIVE-X4`
// measured exactly that at row `8`'s depth arm (`trapRan=1`, subject `"CALLER-CONTROLLED SUBJECT"` while PART
// TWO still names `a value over the walk ceiling`), and `LIVE-X5` at row `3`'s arm.**
//
// **⟶ AND THE GUARD HAS SINCE MOVED, SO THIS CELL NOW DRIVES THE SHAPE THE GUARD HAS RATHER THAN AN OPEN RED, AND
// ITS CITES ARE RE-POINTED AT THAT NAME AND THAT FORM.** `bindings/js/index.mjs`'s `carriesConversionMember`
// (`:1152`) tests the value's own descriptors first (`ownsConversionMember`, `:1125`: a three-key
// `getOwnPropertyDescriptor` loop over `Symbol.toPrimitive`, `toString` and `valueOf`), then WALKS THE CHAIN and
// stops at the language's own prototypes (`isLanguageStandardPrototype`, `:1138`, recognised STRUCTURALLY — a
// class's `toString` is found, `Object.prototype.toString` and the standard `Function.prototype.toString`
// machinery are not mistaken for the caller's code) — so a member standing on a custom prototype or on a class's
// prototype is seen at `:1216` and `String(value)` at `:1217` is not reached. **NO ASSERTION AND NO FIXTURE OF
// THIS CELL MOVED WITH THAT RENAME; the comment is the only text this pass (2026-10-24, `role_proofreader`)
// changed here.**
//
// **THE EXPECTATION IS READ FROM `contract.md §2.1`'s clause of 2026-10-24 AND NOT FROM THE BUILD:** item
// `(1)` — *"a refusal's message is rendered from the walk's own facts, and NO USER CODE RUNS ON A REFUSAL PATH
// — the subject rendering may not invoke the refused value's own `Symbol.toPrimitive`, `toString` or `valueOf`,
// whether that member is OWN on the value or reached through a prototype the value supplies (a class's own
// `toString` method is reached exactly that way)"* — plus item `(2)`'s six `<subject>` cells (rows `5`, `11`,
// `13`, `14`, `15`, `16`: the row's CLASS SPELLING, the value not rendered) and item `(3)` (*"no cell may
// assert a value rendering … at any of the six"*). **THE SIX ARE DRIVEN HERE WITH A RETURNING PROTOTYPE-CARRIED
// TRAP, which is the form `§2.1` item `(1)` names and the form a guarded `catch` cannot answer, and each is
// driven with the marker string the trap RETURNS so a build that renders the value is caught by the counter AND
// by the byte-equality.**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED — ONE ROW PER ARM AND PER CARRIER SHAPE:**
//
// | The arm | The refused value, its conversion member ON THE PROTOTYPE | Declared answer |
// | --- | --- | --- |
// | row `5` | a FOREIGN-realm plain object carrying an own Symbol-keyed member, its realm's `Object.prototype.toString` a counting trap | REFUSED row `5`'s CLASS SPELLING at `the write's value argument`, counter `0`, marker absent |
// | row `11` | a FOREIGN-realm self-containing object, its realm's `Object.prototype.toString` a counting trap | REFUSED row `11`'s CLASS SPELLING at ``member 'self' of the write's value argument``, counter `0`, marker absent |
// | row `13` | `class V extends Array` whose PROTOTYPE defines `toString` and `Symbol.toPrimitive` (counting traps) | REFUSED row `13`'s CLASS SPELLING at the root, both counters `0`, marker absent |
// | row `14` | `class C` whose PROTOTYPE defines `toString` and `Symbol.toPrimitive` (the very shape item `(1)` names — *"a class's own `toString` method is reached exactly that way"*) | REFUSED row `14`'s CLASS SPELLING at the root, both counters `0`, marker absent |
// | row `15` | a FOREIGN-realm plain object owning an ACCESSOR member, its realm's `Object.prototype.toString` a counting trap | REFUSED row `15`'s CLASS SPELLING at the root, counter `0`, marker absent |
// | row `16` | a FOREIGN-realm sparse `[1,,3]`, its realm's `Array.prototype.toString` a counting trap | REFUSED row `16`'s CLASS SPELLING at the root, counter `0`, marker absent |
// | row `3` | a function whose `[[Prototype]]` is a CUSTOM object carrying `toString` (then `Symbol.toPrimitive`, then `valueOf`) as a counting trap | REFUSED `a function` at the root, counter `0`, marker absent |
// | row `8`'s DEPTH arm | a `127`-deep array chain around an object whose PROTOTYPE carries `toString`/`Symbol.toPrimitive` as a counting trap | REFUSED `a value over the walk ceiling` at the leaf's own `127`-segment path, counter `0`, marker absent |
// | THE CONTROL | a value whose prototype-supplied conversion member is the STANDARD one (`Object.prototype.toString` reached normally): `{}`, `{a: 1}`, `[1, 2]`, and the `127`-deep plain-object leaf | ADMITTED, ADMITTED, ADMITTED, and the depth leaf REFUSED with the declared base subject `'[object Object]'` — **a fix must not over-refuse ordinary values and must not withdraw the BASE arm** |
// | THE INSTRUMENTS' OWN LIVENESS | every counting trap is proved live before its drive — a direct `String(...)` of a FRESH TWIN runs the trap and answers the marker, and the counter is RESET after the proof | so every `0` below is evidence that no rendering was taken, never a dead counter |
//
// **WHERE THE ONE DECLARED SUBJECT IS NOT NAMED BY A CLAUSE, STATED RATHER THAN GUESSED.** Item `(4)`'s two
// `<subject>` cells and the per-arm table's rows `3`/`8`-depth cells say *"an OWN `Symbol.toPrimitive`,
// `toString` or `valueOf` member"*, and item `(5)` item `(a)`'s arm list names the class spelling at *"rows `3`
// and `8`'s DEPTH arm where the refused value carries an own conversion member"*. **So for a PROTOTYPE-carried
// member at those two arms the clause declares the NO-RUN rule (item `(1)`) but does not spell the subject;
// this cell asserts the two limbs item `(1)` DOES declare at those two arms — the counter is `0` and the marker
// never reaches the message — and asserts the class spelling as the arm's declared non-rendering subject, the
// only subject the clause offers once `String(value)` is withdrawn. If the architect instead wants the standard
// machinery's answer at these two arms (`Function.prototype.toString.call` · `Object.prototype.toString.call`),
// the two expectations move and nothing else in this cell does.**
//
// **NOTHING SHARED IS MUTATED:** the class-carried traps live on prototypes this drive DECLARED, and the
// foreign-realm traps live on the prototypes of a fresh `vm` context this drive created and then drops — so a
// red here cannot poison a later cell.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any counter non-zero, the trap's MARKER anywhere in the refusal
// object, a class or position that is not the row's own, or the control arms refused.
test('ng_js_q2f_a_prototype_carried_conversion_member_never_runs_on_a_refusal_path', () => {
  runGenerator('NG-JS-Q2f', "§2.1 item (1): no user code on a refusal path, own OR prototype-carried", 1, () => {
    const MARKER = 'CALLER_CONTROLLED_SUBJECT_Q2F';
    const ROOT_CLASS_OF = {
      row5: 'a value carrying a Symbol-keyed own member',
      row11: 'a value that contains itself',
      row13: 'a class extending Array',
      row14: 'a class instance or another prototype-carrying non-plain object',
      row15: 'a value carrying an own accessor member',
      row16: 'a sparse array',
      row3: 'a function',
      row8: 'a value over the walk ceiling',
    };
    const failures = [];

    // THE TWO LIMBS EVERY REFUSED ARM IS HELD TO — item `(1)`'s rule and item `(3)`'s prohibition, each
    // asserted at its own spelling so a red names WHICH limb moved.
    const refusedWithoutUserCode = (label, error, counters) => {
      if (error === null || error === undefined) {
        failures.push(`${label}: the value was ADMITTED where the contract refuses it`);
        return;
      }
      for (const [name, count] of Object.entries(counters)) {
        if (count !== 0) failures.push(`${label}: the PROTOTYPE-carried ${name} RAN on the refusal path (count ${count})`);
      }
      if (error.message.includes(MARKER) || JSON.stringify(error).includes(MARKER)) {
        failures.push(`${label}: the trap's MARKER reached the refusal object: ${JSON.stringify(error.message)}`);
      }
    };
    const expected = (label, error, cls, position, subject = cls) => {
      const verdict = checkRefusal(error, { cls, position, subject });
      if (verdict !== null) failures.push(`${label}: ${verdict}`);
    };

    // ---------------------------------------------------------------------------------------
    // (1)–(2) ROW `3`: a function whose CONVERSION MEMBER stands on a CUSTOM PROTOTYPE
    // ---------------------------------------------------------------------------------------
    const functionCarryingOnItsPrototype = (key) => {
      const counters = { [String(key)]: 0 };
      const proto = Object.create(null); // the chain ENDS at this prototype: `Function.prototype` is NOT reached
      proto[key] = function prototypeConversionMember() {
        counters[String(key)] += 1;
        return MARKER;
      };
      const value = function crossingPrototypeCarriedFunction() {
        return 1;
      };
      Object.setPrototypeOf(value, proto);
      return { value, counters };
    };
    for (const key of ['toString', Symbol.toPrimitive, 'valueOf']) {
      // THE INSTRUMENT IS LIVE, AND ITS LIVENESS IS PROVED THROUGH A CONVERSION THE MEMBER IS REACHED BY: an own
      // `valueOf` is never reached by `String(...)` when a `toString` answers first, but here the chain carries
      // only `valueOf`, so the `string` hint falls through to it — asserted, not assumed.
      const live = functionCarryingOnItsPrototype(key);
      const liveRendering = String(live.value);
      if (live.counters[String(key)] === 0) {
        return `the row 3 instrument for a PROTOTYPE-carried ${String(key)} is DEAD: a direct String(fn) ran no conversion member`;
      }
      if (!liveRendering.includes(MARKER)) {
        return `the row 3 instrument for a PROTOTYPE-carried ${String(key)} answered ${JSON.stringify(liveRendering)} instead of its marker`;
      }
      const arm = functionCarryingOnItsPrototype(key); // a FRESH twin: the proof above touched another counter
      const error = refusalOf(arm.value, ['q2f-fn']);
      const label = `row 3, a PROTOTYPE-carried ${String(key)}`;
      expected(label, error, ROOT_CLASS_OF.row3, ROOT_POSITION);
      refusedWithoutUserCode(label, error, arm.counters);
    }

    // ---------------------------------------------------------------------------------------
    // (3)–(4) ROW `8`'s DEPTH ARM: the `127`-deep refused value carries its member on a PROTOTYPE
    // ---------------------------------------------------------------------------------------
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const deepPath = positionOf([...Array(127).fill(0)]);
    const leafCarryingOnItsPrototype = (key) => {
      const counters = { [String(key)]: 0 };
      const proto = Object.create(null);
      proto[key] = function prototypeConversionMember() {
        counters[String(key)] += 1;
        return MARKER;
      };
      return { value: Object.create(proto), counters };
    };
    for (const key of ['toString', Symbol.toPrimitive]) {
      const live = leafCarryingOnItsPrototype(key);
      const liveRendering = String(live.value);
      if (live.counters[String(key)] === 0 || !liveRendering.includes(MARKER)) {
        return `the row 8 depth-arm instrument for a PROTOTYPE-carried ${String(key)} is DEAD: a direct String(object) answered ${JSON.stringify(liveRendering)}`;
      }
      const arm = leafCarryingOnItsPrototype(key);
      const error = refusalOf(arrayChain(arm.value, 127), ['q2f-depth']);
      const label = `row 8's DEPTH arm, a PROTOTYPE-carried ${String(key)}`;
      expected(label, error, ROOT_CLASS_OF.row8, deepPath);
      refusedWithoutUserCode(label, error, arm.counters);
    }

    // ---------------------------------------------------------------------------------------
    // (5)–(8) ROWS `5`, `11`, `15`, `16`: a FOREIGN realm's standard prototype supplies the trap
    // ---------------------------------------------------------------------------------------
    // The three containing-value arms and the sparse arm are driven on a value whose OWN members are the row's
    // subject, so the row is reached with the trap standing exactly one link away, on the prototype the value's
    // realm supplies — the shape `§2.1` item `(1)` names in its own parenthesis.
    const foreignCarrying = (limb, source) => {
      const realm = createContext({});
      const counters = { [`${limb}Prototype.toString`]: 0 };
      realm.__q2fPrototypeTrap = function foreignPrototypeConversionMember() {
        counters[`${limb}Prototype.toString`] += 1;
        return MARKER;
      };
      const prototypePath = limb === 'object' ? 'Object.prototype' : 'Array.prototype';
      runInContext(
        `Object.defineProperty(${prototypePath}, 'toString', { value: __q2fPrototypeTrap, writable: true, configurable: true, enumerable: false });`,
        realm,
      );
      return { value: runInContext(source, realm), twin: runInContext(source, realm), counters };
    };
    const foreignArms = [
      { row: 5, limb: 'object', source: '({ [Symbol("s")]: 1 })', position: ROOT_POSITION },
      { row: 11, limb: 'object', source: '(() => { const a = {}; a.self = a; return a; })()', position: positionOf(['self']) },
      {
        row: 15,
        limb: 'object',
        source: "Object.defineProperty({ k: 1 }, 'g', { get() { return 1; }, enumerable: true, configurable: true })",
        position: ROOT_POSITION,
      },
      { row: 16, limb: 'array', source: '[1, , 3]', position: ROOT_POSITION },
    ];
    for (const arm of foreignArms) {
      const built = foreignCarrying(arm.limb, arm.source);
      const liveRendering = String(built.twin);
      if (built.counters[`${arm.limb}Prototype.toString`] === 0 || !liveRendering.includes(MARKER)) {
        return `row ${arm.row}'s instrument is DEAD: a direct String(twin) answered ${JSON.stringify(liveRendering)}`;
      }
      const driven = foreignCarrying(arm.limb, arm.source); // a FRESH realm and a FRESH counter
      const error = refusalOf(driven.value, [`q2f-row${arm.row}`]);
      const label = `row ${arm.row}, a ${arm.limb}-prototype-carried toString`;
      expected(label, error, ROOT_CLASS_OF[`row${arm.row}`], arm.position);
      refusedWithoutUserCode(label, error, driven.counters);
    }

    // ---------------------------------------------------------------------------------------
    // (9)–(10) ROWS `13` AND `14`: the CLASS's own prototype supplies `toString` and `Symbol.toPrimitive`
    // ---------------------------------------------------------------------------------------
    const arraySubclassCarryingTraps = () => {
      const counters = { toString: 0, toPrimitive: 0 };
      class ArraySubclassWithPrototypeTrap extends Array {
        toString() {
          counters.toString += 1;
          return MARKER;
        }

        [Symbol.toPrimitive]() {
          counters.toPrimitive += 1;
          return MARKER;
        }
      }
      const value = new ArraySubclassWithPrototypeTrap();
      value.push(1, 2);
      return { value, counters };
    };
    const classCarryingTraps = () => {
      const counters = { toString: 0, toPrimitive: 0 };
      class ClassWithPrototypeTrap {
        toString() {
          counters.toString += 1;
          return MARKER;
        }

        [Symbol.toPrimitive]() {
          counters.toPrimitive += 1;
          return MARKER;
        }
      }
      return { value: new ClassWithPrototypeTrap(), counters };
    };
    for (const [row, build, cls] of [
      [13, arraySubclassCarryingTraps, ROOT_CLASS_OF.row13],
      [14, classCarryingTraps, ROOT_CLASS_OF.row14],
    ]) {
      const live = build();
      if (!String(live.value).includes(MARKER) || live.counters.toString + live.counters.toPrimitive === 0) {
        return `row ${row}'s instrument is DEAD: a direct String(instance) ran no prototype method`;
      }
      const arm = build();
      const error = refusalOf(arm.value, [`q2f-row${row}`]);
      const label = `row ${row}, a class-prototype-carried toString/toPrimitive`;
      expected(label, error, cls, ROOT_POSITION);
      refusedWithoutUserCode(label, error, arm.counters);
    }

    // ---------------------------------------------------------------------------------------
    // (11) THE CONTROL: the STANDARD prototype-supplied conversion member changes nothing
    // ---------------------------------------------------------------------------------------
    // `Object.prototype.toString` is reached through the prototype chain by EVERY ordinary value this crossing
    // admits; a fix that refuses or re-spells those has over-refused. The admissible side is asserted, and the
    // depth arm's BASE subject is asserted beside it so the standard rendering is not withdrawn either.
    for (const [label, value] of [
      ['an empty object', {}],
      ['a plain object', { a: 1 }],
      ['a dense array', [1, 2]],
    ]) {
      if (refusalOf(value, ['q2f-control']) !== null) {
        failures.push(`the control: ${label} carrying the STANDARD Object.prototype.toString was REFUSED`);
      }
    }
    if (String({}) !== '[object Object]') {
      return "the control's own premise is wrong: String({}) is not the language's own rendering";
    }
    expected(
      "row 8's DEPTH arm with the STANDARD prototype-supplied toString (the BASE)",
      refusalOf(arrayChain({}, 127), ['q2f-control-depth']),
      ROOT_CLASS_OF.row8,
      deepPath,
      '[object Object]',
    );

    if (failures.length > 0) return failures.join(' | ');
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q3` — the seventeen rows' class spellings, at the ROOT and at a MEMBER position
// =============================================================================================
//
// **⟶ RE-DERIVED 2026-10-24 (`role_test_writer`; `contract.md §2`'s clause of 2026-10-24 on `F-RA-5`, item
// `(7)` item `(j)`, and `§8` row `4`'s `Distinct` cell re-derived in place): THE CENSUS THIS GENERATOR PRINTS
// WAS THE SUPERSEDED ONE — SIXTEEN ROWS OVER FIFTEEN DISTINCT SPELLINGS — AND IT NOW READS SEVENTEEN ROWS OVER
// SIXTEEN DISTINCT SPELLINGS, because row `17` (`an array carrying a non-index own member`) was added to `§2`'s
// table with a spelling no other row carries. THE PER-ROW DRIVE GAINS ROW `17` AT BOTH POSITIONS, because the
// `observed` set can only carry seventeen rows' answers if the seventeenth is driven.**
//
// **⟶ REPAIRED 2026-10-24 (`role_test_writer`; `contract.md §2`'s clause of that date on the gate-11 finding
// `F-RA-14`): THE SENTENCE THAT CALLED THIS GENERATOR RED FOR ROW `17` IS SUPERSEDED AND NOW READS AS THE
// LANDED STATE — THE SHAPE TEST LANDED AT `bindings/js/index.mjs:1535` (the canonical-index census taken before
// the element walk) AND ITS TWO CELLS ARE GREEN, THIS GENERATOR AND `test-cases.md`'s `JC-TC-49` ALONG WITH
// `NG-JS-Q9`. Nothing else of this clause moves: row `17` is still driven at both positions, and the census
// still reads seventeen rows over sixteen distinct spellings.** **COMMENT TEXT ONLY — no drive, no expectation
// and no census below is touched by this repair.****
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2`'s seventeen-row table, its rows `3`/`12`
// clause of 2026-10-24 and `§8` row `4`'s clause of the same date; `parameter-semantics.md §2`'s position
// mapping; `test-cases.md §3`'s `JC-TC-20`…`JC-TC-35` and `JC-TC-49`):
//
// | Row | Class spelling | At the ROOT | At a MEMBER position |
// | --- | --- | --- | --- |
// | `1` | `null` | `null` | `{a: null}` |
// | `2` | `undefined` | `undefined` | `{a: undefined}` |
// | `3` | `a function` | a named function | `{a: <the same function>}` |
// | `4` | `a symbol` | `Symbol('s')` | `{a: Symbol('s')}` |
// | `5` | `a value carrying a Symbol-keyed own member` | `{[sym]: 1}` | `{a: {[sym]: 1}}` |
// | `6` | `a bigint` | `10n` | `{a: 10n}` |
// | `7` | `a non-finite number` | `NaN` (also `Infinity`, `-Infinity`) | `{a: NaN}` |
// | `8` | `a value over the walk ceiling` | a `127`-array chain, refused at the leaf's own path | `{a: <a 126-array chain>}`, refused at the leaf's own path |
// | `9` | `a string carrying a lone surrogate` | `'\uD800'` at a value position | `{a: '\uD800'}` |
// | `10` | `a string carrying a lone surrogate` | `{'\uD800': 1}` at a KEY position | `{a: {'\uD800': 1}}` |
// | `11` | `a value that contains itself` | `a.self = a` | `{a: <a self-containing object>}` |
// | `12` | `a Proxy` | `new Proxy({}, {})` | `{a: new Proxy({}, {})}` |
// | `13` | `a class extending Array` | `new (class extends Array {})()` | `{a: <the same class instance>}` |
// | `14` | `a class instance or another prototype-carrying non-plain object` | `new (class C {})()` | `{a: <the same class instance>}` |
// | `15` | `a value carrying an own accessor member` | `Object.defineProperty({}, 'k', {get})` | `{a: <the same shape>}` |
// | `16` | `a sparse array` | `[1,,3]` | `{a: [1,,3]}` |
// | `17` | `an array carrying a non-index own member` | `const a = [1]; a.foo = 3;` | `{a: <the same shape>}` |
// | *(the MIXED path, this pass)* | `a bigint` | — | `[{a: 10n}]` — the refused member stands inside an ARRAY ELEMENT, so the position spells an INDEX then a KEY: `member 0/'a' of the write's value argument` |
//
// **THE CENSUS IS SIXTEEN DISTINCT SPELLINGS OVER SEVENTEEN ROWS, AND NOT SEVENTEEN DISTINCT** (`§2`'s clause
// of 2026-10-24 on `F-RA-5`, item `(7)` item `(j)`, which re-derives `§8` row `4`'s cell from `15` distinct over
// `16` rows to `16` distinct over `17` rows in place): rows `9` and `10` are the SAME spelling at two positions
// and row `17`'s spelling is carried by no other row, so a generator asserting seventeen distinct strings is
// unsatisfiable while a generator asserting fifteen is now false by one. **Both halves are asserted below — the
// register's own row count and distinct count, then the drive's observed distinct count — because a set-count
// alone cannot catch a row answered with another row's spelling, which is why every row is also asserted
// individually at both positions.**
//
// **⟶ AND THE MIXED SEGMENTS PATH IS DRIVEN HERE TOO, ADDED 2026-10-24 (the gate-11 re-audit):** every position
// this generator drove was an ALL-ZERO-INDEX chain (rows `8`'s two arms) or a single segment, so a build whose
// segment JOIN broke between an index and a key — a missing separator, a key left unquoted beside an index, an
// index quoted as a key — held every green. The state is `[{a: 10n}]`: the walk reaches index `0`, then the key
// `'a'`, and `parameter-semantics.md §2`'s mapping declares the position `member 0/'a' of the write's value
// argument` — the index BARE and the key SINGLE-QUOTED, joined by `/`.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any row whose message does not end with
// `, the value at <the position the fixture declares> is <that row's exact spelling>` at EITHER position — a
// marker letter, a converted class, a store-side status, or the root position where the walk's path was
// declared.
test('ng_js_q3_every_class_spelling_is_exercised_at_the_root_and_at_a_member_position', { timeout: 300000 }, () => {
  const DECLARED_CLASS_SPELLINGS = [
    'null', // row 1
    'undefined', // row 2
    'a function', // row 3
    'a symbol', // row 4
    'a value carrying a Symbol-keyed own member', // row 5
    'a bigint', // row 6
    'a non-finite number', // row 7
    'a value over the walk ceiling', // row 8
    'a string carrying a lone surrogate', // row 9
    'a string carrying a lone surrogate', // row 10 — the SAME spelling, at the key position
    'a value that contains itself', // row 11
    'a Proxy', // row 12
    'a class extending Array', // row 13
    'a class instance or another prototype-carrying non-plain object', // row 14
    'a value carrying an own accessor member', // row 15
    'a sparse array', // row 16
    'an array carrying a non-index own member', // row 17 — `§2`'s clause of 2026-10-24 on `F-RA-5`, item `(1)`
  ];
  const arrayChain = (leaf, levels) => {
    let value = leaf;
    for (let i = 0; i < levels; i += 1) value = [value];
    return value;
  };
  const indexes = (count) => [...Array(count).fill(0)];

  runGenerator('NG-JS-Q3', 'seventeen rows at the root and at a member position', 1, () => {
    class ArraySubclass extends Array {}
    class SampleClass {}
    const sampleFunction = function crossingSample() {};
    const selfAtRoot = {};
    selfAtRoot.self = selfAtRoot;
    const selfAtMember = {};
    selfAtMember.self = selfAtMember;
    const symbolMember = () => ({ [Symbol('s')]: 1 });
    const accessorObject = () => Object.defineProperty({}, 'k', { get() { return 1; }, enumerable: true });
    // ROW `17`'s fixture — an array carrying a NON-INDEX OWN member (`contract.md §2` row `17`, added at its
    // clause of 2026-10-24 on `F-RA-5`): `const a = [1]; a.foo = 3;`. A factory, so the root arm and the member
    // arm each drive their own array.
    const arrayWithExtraMember = () => {
      const array = [1];
      array.foo = 3;
      return array;
    };
    const rows = [
      {
        row: 1,
        cls: 'null',
        root: { value: null, position: ROOT_POSITION },
        member: { value: { a: null }, position: positionOf(['a']) },
      },
      {
        row: 2,
        cls: 'undefined',
        root: { value: undefined, position: ROOT_POSITION },
        member: { value: { a: undefined }, position: positionOf(['a']) },
      },
      {
        row: 3,
        cls: 'a function',
        root: { value: sampleFunction, position: ROOT_POSITION },
        member: { value: { a: sampleFunction }, position: positionOf(['a']) },
      },
      {
        row: 4,
        cls: 'a symbol',
        root: { value: Symbol('s'), position: ROOT_POSITION },
        member: { value: { a: Symbol('s') }, position: positionOf(['a']) },
      },
      {
        row: 5,
        cls: 'a value carrying a Symbol-keyed own member',
        root: { value: symbolMember(), position: ROOT_POSITION },
        member: { value: { a: symbolMember() }, position: positionOf(['a']) },
      },
      {
        row: 6,
        cls: 'a bigint',
        root: { value: 10n, position: ROOT_POSITION },
        member: { value: { a: 10n }, position: positionOf(['a']) },
      },
      {
        row: 7,
        cls: 'a non-finite number',
        root: { value: NaN, position: ROOT_POSITION },
        member: { value: { a: NaN }, position: positionOf(['a']) },
      },
      {
        row: 8,
        cls: 'a value over the walk ceiling',
        root: { value: arrayChain(0, 127), position: positionOf(indexes(127)) },
        member: { value: { a: arrayChain(0, 126) }, position: positionOf(['a', ...indexes(126)]) },
      },
      {
        row: 9,
        cls: 'a string carrying a lone surrogate',
        root: { value: '\uD800', position: ROOT_POSITION },
        member: { value: { a: '\uD800' }, position: positionOf(['a']) },
      },
      {
        row: 10,
        cls: 'a string carrying a lone surrogate',
        root: { value: { '\uD800': 1 }, position: positionOf([{ loneSurrogateKey: true }]) },
        member: {
          value: { a: { '\uD800': 1 } },
          position: positionOf(['a', { loneSurrogateKey: true }]),
        },
      },
      {
        row: 11,
        cls: 'a value that contains itself',
        root: { value: selfAtRoot, position: positionOf(['self']) },
        member: { value: { a: selfAtMember }, position: positionOf(['a', 'self']) },
      },
      {
        row: 12,
        cls: 'a Proxy',
        root: { value: new Proxy({}, {}), position: ROOT_POSITION },
        member: { value: { a: new Proxy({}, {}) }, position: positionOf(['a']) },
      },
      {
        row: 13,
        cls: 'a class extending Array',
        root: { value: new ArraySubclass(), position: ROOT_POSITION },
        member: { value: { a: new ArraySubclass() }, position: positionOf(['a']) },
      },
      {
        row: 14,
        cls: 'a class instance or another prototype-carrying non-plain object',
        root: { value: new SampleClass(), position: ROOT_POSITION },
        member: { value: { a: new SampleClass() }, position: positionOf(['a']) },
      },
      {
        row: 15,
        cls: 'a value carrying an own accessor member',
        root: { value: accessorObject(), position: ROOT_POSITION },
        member: { value: { a: accessorObject() }, position: positionOf(['a']) },
      },
      {
        row: 16,
        cls: 'a sparse array',
        root: { value: [1, , 3], position: ROOT_POSITION },
        member: { value: { a: [1, , 3] }, position: positionOf(['a']) },
      },
      {
        // ROW `17`'s position is the ARRAY'S OWN VALUE POSITION, not the extra member's (`§2`'s clause of
        // 2026-10-24 on `F-RA-5`, item `(5)`); its `<subject>` is the class spelling (this file's `§2.1` per-arm
        // table, row `17`), and its spelling is carried by no other row.
        row: 17,
        cls: 'an array carrying a non-index own member',
        root: { value: arrayWithExtraMember(), position: ROOT_POSITION },
        member: { value: { a: arrayWithExtraMember() }, position: positionOf(['a']) },
      },
    ];

    // THE REGISTER'S OWN CENSUS, ASSERTED BEFORE THE PER-ROW DRIVE so the re-derived figure is proved live even
    // while a row is red: `§2`'s SEVENTEEN rows carry SIXTEEN distinct spellings (`§2`'s clause of 2026-10-24 on
    // `F-RA-5`, item `(7)` item `(j)`, which re-derives `§8` row `4`'s cell in place from `15`/`16` to `16`/`17`).
    const declaredDistinct = new Set(DECLARED_CLASS_SPELLINGS);
    if (DECLARED_CLASS_SPELLINGS.length !== 17) {
      return `the register carries ${DECLARED_CLASS_SPELLINGS.length} rows where §2 declares seventeen`;
    }
    if (declaredDistinct.size !== 16) {
      return `the register's seventeen rows carry ${declaredDistinct.size} distinct spellings where §8 row 4 declares sixteen`;
    }
    for (const row of rows) {
      if (!declaredDistinct.has(row.cls)) return `row ${row.row}'s class spelling is not one §2 declares`;
    }

    const observed = new Set();
    for (const row of rows) {
      for (const [where, arm] of [['the ROOT', row.root], ['a MEMBER position', row.member]]) {
        const verdict = checkRefusal(refusalOf(arm.value), { cls: row.cls, position: arm.position });
        if (verdict !== null) return `row ${row.row} at ${where}: ${verdict}`;
        observed.add(row.cls);
      }
    }
    // ROW `7`'s OTHER TWO STATES, at the root: `Infinity` and `-Infinity` answer the same class
    // (`contract.md §2` row `7`; `parameter-distribution` is not involved — the spelling is the row's).
    for (const nonFinite of [Infinity, -Infinity]) {
      const verdict = checkRefusal(refusalOf(nonFinite), {
        cls: 'a non-finite number',
        position: ROOT_POSITION,
      });
      if (verdict !== null) return `row 7 with ${String(nonFinite)} at the ROOT: ${verdict}`;
    }

    // THE MIXED SEGMENTS PATH — AN INDEX THEN A KEY (`parameter-semantics.md §2`'s mapping, and the state this
    // pass added): the refused member is a member OF AN ARRAY ELEMENT, so the position spells both segment kinds
    // at once — the index bare, the key single-quoted, joined by `/`.
    const mixedVerdict = checkRefusal(refusalOf([{ a: 10n }], ['q3-mixed']), {
      cls: 'a bigint',
      position: positionOf([0, 'a']),
      subject: '10n',
    });
    if (mixedVerdict !== null) return `the MIXED index-then-key position: ${mixedVerdict}`;
    if (positionOf([0, 'a']) !== "member 0/'a' of the write's value argument") {
      return 'the fixture\'s own position spelling is not the mapping\'s: the mixed path is not driven';
    }

    // AND THE DRIVE OBSERVED EVERY ONE OF THE SIXTEEN: a set-count alone cannot catch a row answered with another
    // row's spelling, which is why each row is also asserted individually at both positions above.
    if (observed.size !== 16) {
      return `the drive observed ${observed.size} distinct class spellings where §2's seventeen rows carry sixteen`;
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q4` — the key domain, and the position segment's own spelling
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`parameter-semantics.md §1` row `2`, `§2`'s
// member-key and string-key clauses; `contract.md §2` rows `9`/`10` and `§2.1` row `10`'s subject):
//
// | The state | Its declared answer |
// | --- | --- |
// | a HIGH-half lone surrogate key `'\uD800'` | REFUSED, class row `10`'s `a string carrying a lone surrogate`, at the member-key position, whose segment is `'<key: a string carrying a lone surrogate>'`, PART ONE's subject the VALUE ARGUMENT's name |
// | a LOW-half lone surrogate key `'\uDC00'` | the SAME — the low half is not repaired, renamed or replaced |
// | the SAME low-half key at a MEMBER position | the SAME class, with the key's declared segment carried beside the key it follows |
// | the EMPTY key `''` with a `10n` member | ADMITTED as a key; the member's class `a bigint` at the segment `''` — the position mapping quotes it |
// | a key carrying `'` (`"a'b"`) | ADMITTED as a key; the segment is the single-quoted key, `'a'b'` |
// | a key carrying `/` (`'a/b'`) | ADMITTED as a key; the segment is `'a/b'` — the join's own separator does not split it |
// | a valid surrogate pair key `'\uD83D\uDE00'` — the CONTROL | ADMITTED, and it crosses and reads back under the same key |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a lone surrogate REFUSED under the wrong spelling or at the root
// position, a LOW-half surrogate silently repaired to `U+FFFD` and admitted, a key segment quoted twice or not
// at all, or a valid pair refused.
test('ng_js_q4_the_key_domain_and_the_position_segments_spelling', () => {
  runGenerator('NG-JS-Q4', 'the key domain: lone surrogates, empty, quote, slash, pair', 1, () => {
    const loneSurrogateKeyPosition = positionOf([{ loneSurrogateKey: true }]);
    for (const [label, key] of [
      ['a HIGH-half lone surrogate key (\\uD800)', '\uD800'],
      ['a LOW-half lone surrogate key (\\uDC00)', '\uDC00'],
    ]) {
      const verdict = checkRefusal(refusalOf({ [key]: 1 }), {
        cls: 'a string carrying a lone surrogate',
        position: loneSurrogateKeyPosition,
        subject: ROOT_POSITION, // `§2.1` row `10`: the VALUE ARGUMENT's name, never the unpaired code unit
      });
      if (verdict !== null) return `${label}: ${verdict}`;
    }
    // THE LOW-HALF KEY AT A MEMBER POSITION: the declared segment is carried beside the key it follows.
    const nestedLowHalf = checkRefusal(refusalOf({ a: { '\uDC00': 1 } }), {
      cls: 'a string carrying a lone surrogate',
      position: positionOf(['a', { loneSurrogateKey: true }]),
      subject: ROOT_POSITION,
    });
    if (nestedLowHalf !== null) return `a LOW-half lone surrogate key at a MEMBER position: ${nestedLowHalf}`;

    // THE ADMITTED KEYS, each carrying a member whose own class is declared, so the POSITION SEGMENT is what
    // the message spells: the empty key, a key carrying `'`, and a key carrying `/`.
    for (const [label, key] of [
      ["the EMPTY key", ''],
      ["a key carrying '", "a'b"],
      ['a key carrying /', 'a/b'],
    ]) {
      const verdict = checkRefusal(refusalOf({ [key]: 10n }), {
        cls: 'a bigint',
        position: positionOf([key]),
        subject: '10n',
      });
      if (verdict !== null) return `${label}: ${verdict}`;
    }

    // THE CONTROL: a valid surrogate pair is a legal key and the member crosses under the same key.
    const pairKey = '\uD83D\uDE00';
    const inst = mem();
    inst.write(['q4-pair'], 'mem', { [pairKey]: 'x' });
    const back = inst.read(['q4-pair']);
    if (back === null || typeof back !== 'object') return 'a valid surrogate pair key: the read answered no object';
    if (back[pairKey] !== 'x') return 'a valid surrogate pair key: the member did not cross under the same key';
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q5` — the copy-out corpus: the bare tree at both sites, and NO bound on the way out
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §5` and `§4`'s clause of 2026-10-24 item
// `(4)` — the copy-out carries no depth and no node ceiling; `parameter-semantics.md §1` rows `5` and `7`/`8`
// reading `copy-in`; `test-cases.md` `JC-TC-12`…`JC-TC-19`):
//
// | The state | Its declared answer |
// | --- | --- |
// | the tag-spelling member set `{v:'x', e:'a bigint', k:'s', L:'a', T:'mem'}` | READ BACK MEMBER FOR MEMBER: every member is the stored bare string, the member set is the stored one — the object carries exactly the stored OWN ENUMERABLE STRING-KEYED members — and no tag, class token or `{v:…}`/`{e:…}` envelope appears. **Its SHAPE is `§1`'s object limb or `§3`'s `p = 'null'`, never an array and never a `Proxy`; its PROTOTYPE is not pinned** (`§5`'s clause of 2026-10-24 on `F-RA-15`, items `(3)` and `(4)`) |
// | member ORDER | not semantically significant (`§1`): the comparison is member-for-member and order-free |
// | a depth-`126` tree written to a persistent store | the same tree read back through a FRESH instance, level for level, with no tag member and no level dropped |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** a member read back as a tag form (a `k:'s'` member beside a `v:'x'`
// one, i.e. the retired envelope), a member
// renamed, dropped or wrapped in an envelope, a tree that does not reopen level for level, or a copy-out that
// imposes a ceiling the register declares for the copy-IN walk alone.
test('ng_js_q5_the_copy_out_corpus_is_the_bare_tree_at_both_sites', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q5', 'copy-out: the tag-spelling member set and a depth-126 tree', 1, () => {
    // (1) THE TAG-SPELLING MEMBER SET: each member's VALUE is itself a tag spelling, so a writer that
    // interpreted members as tags would answer a different tree.
    const tagSpelling = { v: 'x', e: 'a bigint', k: 's', L: 'a', T: 'mem' };
    const inst = mem();
    inst.write(['q5-tagset'], 'mem', tagSpelling);
    const back = inst.read(['q5-tagset']);
    if (back === null || typeof back !== 'object' || Array.isArray(back)) {
      return 'the tag-spelling member set: the copy-out is not an object';
    }
    // **⟶ NARROWED 2026-10-24 (`contract.md §5`'s clause of that date on `F-RA-15`, items `(3)(b)` and `(4)`):
    // NO PROTOTYPE IDENTITY IS ASSERTED ON THE COPY-OUT — neither `Object.getPrototypeOf(back) ===
    // Object.prototype` NOR ITS NEGATION AT A NAMED REALM — because the contract pins the TREE and not the
    // allocation. WHAT STANDS IN ITS PLACE IS THE ADMITTED OBJECT'S SHAPE: not an array (above), not a `Proxy`,
    // and either `§1`'s OBJECT LIMB (a prototype that is terminal and carries the standard `Object.prototype`
    // member set) or `§3`'s `p = 'null'` (a `null`-prototype object). A lawful `null`-prototype copy-out must
    // NOT fail this cell, and it does not.**
    if (nodeTypes.isProxy(back)) {
      return 'the copy-out object is a Proxy: §5\'s clause of this date on F-RA-15, item (3)(b), forbids it';
    }
    const copyOutPrototype = Object.getPrototypeOf(back);
    const carriesObjectLimb = copyOutPrototype !== null
      && Object.getPrototypeOf(copyOutPrototype) === null
      && Object.getOwnPropertyNames(Object.prototype).every((name) => Object.hasOwn(copyOutPrototype, name));
    if (copyOutPrototype !== null && !carriesObjectLimb) {
      return 'the copy-out object carries a prototype that is neither §1\'s object limb nor a null-prototype '
        + 'object (§3\'s `p` classification `null`): its shape is not one of the contract\'s two admitted forms';
    }
    const storedKeys = Object.keys(tagSpelling).sort();
    const readKeys = Object.keys(back).sort();
    if (readKeys.join(',') !== storedKeys.join(',')) {
      return `the member set is not the stored one: got [${readKeys.join(', ')}], stored [${storedKeys.join(', ')}]`;
    }
    for (const key of storedKeys) {
      if (typeof back[key] !== 'string') return `member ${JSON.stringify(key)} is not a bare string`;
      if (back[key] !== tagSpelling[key]) {
        return `member ${JSON.stringify(key)} read back as ${JSON.stringify(back[key])}, stored ${JSON.stringify(tagSpelling[key])}`;
      }
    }
    if (canonicalTreeJson(back) !== canonicalTreeJson(tagSpelling)) {
      return 'the copy-out is not the stored bare tree: a tag, class token or envelope reached the caller';
    }

    // (2) THE DEPTH-126 TREE THROUGH A FRESH PERSISTENT INSTANCE.
    const nestedObject = (levels) => {
      let value = 'leaf';
      for (let i = 0; i < levels; i += 1) value = { a: value };
      return value;
    };
    const objectDepth = (value) => {
      let depth = 0;
      let cursor = value;
      while (cursor !== null && typeof cursor === 'object' && !Array.isArray(cursor)) {
        depth += 1;
        cursor = cursor.a;
      }
      return depth;
    };
    const dir = mkdtempSync(join(tmpdir(), 'ng-js-q5-'));
    try {
      const filePath = join(dir, 'store.json');
      const writer = storeCreate({ filePath, journalLength: 8, listeners: [] });
      const tree = nestedObject(126);
      writer.write(['q5-depth'], 'file', tree);
      const fresh = storeCreate({ filePath, journalLength: 8, listeners: [] });
      const readBack = fresh.read(['q5-depth'], 'file');
      if (readBack === null || typeof readBack !== 'object') {
        return 'a depth-126 tree: a fresh instance over the same path answered no tree';
      }
      if (canonicalTreeJson(readBack) !== canonicalTreeJson(tree)) {
        return `a depth-126 tree did not read back whole through a fresh instance: got ${canonicalTreeJson(readBack).slice(0, 120)}…`;
      }
      if (objectDepth(readBack) !== 126) {
        return `the reopened tree is ${objectDepth(readBack)} levels deep where 126 was stored`;
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q6` — the two ceilings' ORDER, and the position each arm records
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §4`'s clause of 2026-10-24 item `(3)`
// (a)–(e), and `§2.1`'s row-`8` arms):
//
// | The state | Its declared answer |
// | --- | --- |
// | over BOTH ceilings, its `127`-deep path reached EARLIER in the traversal than the node overflow | the DEPTH arm answers: row `8`'s class at THAT VALUE'S OWN path, PART ONE's subject that value's own spelling |
// | over BOTH ceilings, the deep path reached LATER than the node overflow | the NODE arm answers: row `8`'s class at the ROOT position, PART ONE's subject the CLASS SPELLING |
// | over the NODE ceiling with its `1,000,001`st COUNTED node itself an outside class (a `Symbol`) | the NODE arm answers at the ROOT with the class spelling: the node test runs on ENTRY, before the class decision, so the outside class is never answered |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** one arm answering for both orderings (the class and the status are
// shared, so only the POSITION and the SUBJECT can distinguish them), the node arm recording the deep path,
// the depth arm recording the root, or an outside class answered where the node ceiling had already failed.
test('ng_js_q6_the_ceilings_interaction_is_pre_order_and_the_arms_positions_differ', { timeout: 300000 }, () => {
  runGenerator('NG-JS-Q6', 'over both ceilings, and an outside class at the overflowing node', 1, () => {
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const indexes = (count) => [...Array(count).fill(0)];

    // (1) OVER BOTH, THE DEEP PATH EARLIER: the `127`-deep leaf at index `0`, the flat tail behind it. The
    // depth test fails at the leaf long before the node counter reaches `1,000,001`.
    const deepEarly = new Array(1000000).fill(0);
    deepEarly[0] = arrayChain(0, 126);
    const depthFirst = checkRefusal(refusalOf(deepEarly, ['q6-deep-first']), {
      cls: 'a value over the walk ceiling',
      position: positionOf([0, ...indexes(126)]),
      subject: '0',
    });
    if (depthFirst !== null) return `over BOTH ceilings with the deep path EARLIER: ${depthFirst}`;

    // (2) OVER BOTH, THE NODE OVERFLOW EARLIER: the same deep chain at the LAST index, so the counter
    // overflows on entry to it before the depth test can be reached below it.
    const deepLate = new Array(1000000).fill(0);
    deepLate[999999] = arrayChain(0, 126);
    const nodeFirst = checkRefusal(refusalOf(deepLate, ['q6-deep-last']), {
      cls: 'a value over the walk ceiling',
      position: ROOT_POSITION,
      subject: 'a value over the walk ceiling',
    });
    if (nodeFirst !== null) return `over BOTH ceilings with the node overflow EARLIER: ${nodeFirst}`;

    // (3) THE OUTSIDE CLASS AT THE OVERFLOWING NODE: it is never answered, because the node test runs first.
    const outsideAtOverflow = new Array(1000000).fill(0);
    outsideAtOverflow[999999] = Symbol('s');
    const outside = refusalOf(outsideAtOverflow, ['q6-outside']);
    const outsideVerdict = checkRefusal(outside, {
      cls: 'a value over the walk ceiling',
      position: ROOT_POSITION,
      subject: 'a value over the walk ceiling',
    });
    if (outsideVerdict !== null) return `an outside class AT the overflowing node: ${outsideVerdict}`;
    if (outside.message.includes('is a symbol')) {
      return 'the outside class at the overflowing node was answered where the node test runs on entry, before the class decision';
    }

    // AND THE TWO ARMS' POSITIONS DIFFER, WHICH IS THE DECLARATION'S POINT: a build recording one position for
    // both orderings answers here even though its class and status are right at each.
    if (depthFirst === null && outsideVerdict === null) {
      const depthArm = refusalOf(deepEarly, ['q6-deep-first-again']);
      const nodeArm = refusalOf(deepLate, ['q6-deep-last-again']);
      if (depthArm.message === nodeArm.message) {
        return 'the depth arm and the node arm rendered the same message: one position was recorded for both ceilings';
      }
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q6b` — the SAME-VISIT tie: both ceilings fail at one visit and the NODE arm answers
// =============================================================================================
//
// **THE GAP THIS CLOSES:** `NG-JS-Q6` drives two orderings that are separated by TRAVERSAL ORDER — the deep path
// earlier than the overflow, and the overflow earlier than the deep path — so neither arm is ever forced to
// answer at the ONE visit at which both tests fail. **`contract.md §4`'s clause of 2026-10-24, item `(3)` item
// `(b)`, declares that state explicitly:** *"a value over BOTH answers the arm whose test first FAILS at the
// EARLIEST visit in the traversal, and WHERE BOTH WOULD FAIL AT THE SAME VISIT THE NODE ARM ANSWERS, BECAUSE ITS
// TEST RUNS FIRST"* — with item `(c)` (*"the NODE arm records `path = []` … so its position is the ROOT … and its
// `<subject>` is the class spelling, while the DEPTH arm records the refused value's own `path`"*) and item `(e)`
// (*"the CLASS and the STATUS are shared by both arms, so neither can distinguish them, and only the POSITION and
// the SUBJECT can"*). The `§2.1` row-`8` NODE-arm cell supplies the subject.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | The state | Its declared answer |
// | --- | --- |
// | `999,873` flat elements followed by `arrayChain(0, 126)` at the LAST index — the walk's `1,000,001`st visit IS the depth-`127` visit | the NODE arm answers: row `8`'s class at the ROOT position `the write's value argument`, `<subject>` the CLASS SPELLING; the DEPTH arm's message — the `127`-segment deep path and the leaf's own `'0'` — is NOT the one returned |
// | the SAME chain with ONE FEWER flat element (`999,872`) | the leaf's visit is the `1,000,000`th COUNTED node, so the node test does NOT fail and the depth test does: the DEPTH arm answers at the leaf's own `127`-segment path with the subject `'0'` — the arm flips on ONE element, which is what proves the tie sits exactly at the boundary |
// | the fixture's own arithmetic | `999,873 + 126 + 1 = 1,000,000` OWN nodes, so `1,000,001` counted (`§4` item `(1)`: the root is the walk's first node) — ASSERTED before the drive, so a mis-built fixture cannot read as a passed cell |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the tie answering the depth arm's message (the deep path, or the leaf's
// own `'0'` as the subject), the tie answering a member position, or the one-element-fewer state answering the
// ROOT — i.e. any build that cannot tell the two arms apart at one visit.
test('ng_js_q6b_the_same_visit_tie_answers_the_node_arm_at_the_root', { timeout: 300000 }, () => {
  runGenerator('NG-JS-Q6b', 'over both ceilings, BOTH failing at the SAME visit: the node arm answers', 1, () => {
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const indexes = (count) => [...Array(count).fill(0)];
    const FLAT = 999873;
    const CHAIN = 126;

    // THE FIXTURE'S OWN ARITHMETIC, asserted before any drive.
    const ownNodes = FLAT + CHAIN + 1;
    if (ownNodes !== 1000000) {
      return `the fixture carries ${ownNodes} own nodes, so the walk's 1,000,001st visit is not the depth-127 visit`;
    }
    const nodeArmMessage = declaredRefusalMessage(
      'a value over the walk ceiling',
      ROOT_POSITION,
      'a value over the walk ceiling',
    );
    const depthArmMessage = declaredRefusalMessage(
      '0',
      positionOf([FLAT, ...indexes(CHAIN)]),
      'a value over the walk ceiling',
    );

    // (1) THE TIE: the `1,000,001`st counted node and the depth-`127` value are the SAME visit.
    const tie = new Array(FLAT).fill(0);
    tie.push(arrayChain(0, CHAIN));
    const tieError = refusalOf(tie, ['q6b-tie']);
    const tieVerdict = checkRefusal(tieError, {
      cls: 'a value over the walk ceiling',
      position: ROOT_POSITION,
      subject: 'a value over the walk ceiling',
    });
    if (tieVerdict !== null) return `the SAME-VISIT tie: ${tieVerdict}`;
    if (tieError.message === depthArmMessage) {
      return "the same-visit tie answered the DEPTH arm (the deep path and the leaf's own `0`) where §4 item (3) (b) declares the NODE arm";
    }
    if (tieError.message !== nodeArmMessage) {
      return `the same-visit tie is not the node arm's declared rendering: got ${JSON.stringify(tieError.message)}`;
    }

    // (2) ONE FLAT ELEMENT FEWER: the counter stops one visit short, the depth test is the only one that fails,
    // and the arm flips — the discriminator that proves the tie is at the boundary and not one visit early.
    const nearMiss = new Array(FLAT - 1).fill(0);
    nearMiss.push(arrayChain(0, CHAIN));
    const nearMissError = refusalOf(nearMiss, ['q6b-near']);
    const nearMissVerdict = checkRefusal(nearMissError, {
      cls: 'a value over the walk ceiling',
      position: positionOf([FLAT - 1, ...indexes(CHAIN)]),
      subject: '0',
    });
    if (nearMissVerdict !== null) return `one flat element FEWER (the DEPTH arm must answer): ${nearMissVerdict}`;
    if (nearMissError.message === nodeArmMessage) {
      return 'one flat element fewer answered the ROOT (node) arm where the depth test is the only one that fails';
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q7` — the cross-realm admission corpus UNDER PROTOTYPE MUTATION
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §1`'s foreign-realm clause — *"a plain
// object (or a foreign-realm plain object)"* — and `test-cases.md` `JC-TC-07` — *"a foreign-realm plain
// object — admitted; the plain-object test is structural, not identity-based"*; `docs/defects.md` ·
// `DEF-2026-10-24-C`):
//
// **THE THREE SHAPES** `JC-TC-07` item `(1)` names: **(a)** a `vm`-realm plain object; **(b)** a `vm`-realm
// array; **(c)** the nested `{outer: <vm plain object>}`, whose foreign value stands at a MEMBER position
// (`member 'outer' of the write's value argument`) and not at the root.
// **THE FOUR MUTATION STATES** `JC-TC-07` item `(2)` names, each addition made to the prototype THE SHAPE'S OWN
// LIMB READS — `Object.prototype` for (a) and (c), `Array.prototype` for (b):
//
// | The state | Its declared answer |
// | --- | --- |
// | (i) PRISTINE — neither realm mutated | ADMITTED, and the tree reads back, at EVERY one of the three shapes |
// | (ii) THIS REALM MUTATED — one injected own name on this realm's prototype, the value's realm pristine | ADMITTED at every one of the three shapes |
// | (iii) THE VALUE'S REALM MUTATED — the same name injected inside the `vm` realm by `runInContext`, this realm pristine | ADMITTED at every one of the three shapes |
// | (iv) BOTH REALMS MUTATED IDENTICALLY | ADMITTED at every one of the three shapes |
//
// **THE CONTROLS, WHICH ARE DRIVES OF THEIR OWN AND ARE NOT SHAPES** (`JC-TC-07` item `(3)`):
//
// | The drive | Its declared answer |
// | --- | --- |
// | a same-realm `{a: 1}` under state (ii) — `DEF-2026-10-24-C`'s own CAUSAL control, proving the mutation is not a general breakage | ADMITTED |
// | a same-realm `[1, 2]` under state (ii)'s `Array.prototype` mutation | ADMITTED |
// | a real class instance, under the mutation and pristine | REFUSED row `14`'s exact spelling, at the ROOT position |
// | a class extending `Array`, under the mutation and pristine | REFUSED row `13`'s exact spelling, at the ROOT position |
// | every mutation, restored in a `finally` | both realms' prototypes are pristine afterwards, and the pristine control is admitted again |
//
// **⟶ AND THE TWO DELETION STATES `JC-TC-07` GAINED ON 2026-10-24 ARE DRIVEN HERE AS ITS STATES `(v)` AND
// `(vi)`** (`contract.md §1`'s clause of 2026-10-24 on the gate-11 finding `F-RA-3`; that part's `§3` clause of
// the same date, item `(3)`, which re-derives the drive arithmetic from `12 + 1` to `12 + 1 + 2 = 15`): **a
// DELETION is the one mutation that is not frozen, and it is frozen only in the realm whose census supplies the
// reference set's LIVE HALF — the CALLER's** (item `(3)`), **so every deletion drive below NAMES ITS REALM**
// (item `(5)`), and a realm whose prototype still carries a name THIS realm deleted is ADMITTED (item `(6)`).
//
// | The deletion state | Its declared answer |
// | --- | --- |
// | (v) `delete Object.prototype.hasOwnProperty` in THIS realm | the same-realm `{a: 1}` ADMITTED and the foreign `vm` plain object ADMITTED — the name left the reference set with the deletion |
// | (v) `delete Array.prototype.map` in THIS realm | the same-realm `[1, 2]` ADMITTED and the foreign `vm` array ADMITTED — the array limb of the caller-realm branch |
// | (vi) `delete Object.prototype.hasOwnProperty` in the VALUE's realm | the lawful `vm` plain object REFUSED as row `14`'s exact spelling at the ROOT position, and that realm's array REFUSED as row `13` |
// | (vi) `delete Array.prototype.map` in the VALUE's realm | the lawful `vm` array REFUSED as row `13`'s exact spelling at the ROOT position, while that realm's plain object and this realm's `[1, 2]` stay ADMITTED |
// | every deletion, restored in a `finally` | the name is an own member of its prototype again in both realms, and the pristine control is admitted again |
//
// **THE ARITHMETIC IS PRINTED SO A LATER CLAUSE CAN CHECK IT RATHER THAN TRUST IT** (`JC-TC-07` item `(2)`):
// `three shapes × four ADDITION states = 12` admitted drives, plus the `1` causal control and the `1` array
// control = `14` admissions asserted, plus `1 + 1 = 2` deletion drives of the caller-realm branch (each with its
// value written and read back after the restore), plus the `4` class-refusal drives (each of the two classes
// under the mutation and pristine), plus the `4` value-realm deletion drives (`2` refused values and `2`
// admissions that prove the deletion is scoped to the realm), plus the `2` restored-pristine drives that prove
// the `finally` blocks did their work — `12 + 2 + 2 + 4 + 4 + 2`.
//
// **AND A CELL MUST NOT READ THE ABSENCE OF A CENSUS CHANGE AS EVIDENCE OF ADMISSION** (`JC-TC-07` item `(4)`):
// the measurement records the `{status, message, log}` census as unmoved on the refused drives too, so only the
// thrown/not-thrown answer and the round-tripped tree distinguish the two states — which is what is driven
// here.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any of the twelve admitted drives REFUSED — with ANY class, and in
// particular with `a class instance or another prototype-carrying non-plain object` for the plain-object shapes
// or `a class extending Array` for the array shape, which those values do not have (`DEF-2026-10-24-C`,
// measured) — or a real class instance or `Array` subclass admitted, or a prototype left mutated after the
// cell, in either realm.
//
// **⟶ RE-WORDED 2026-10-24 (the gate-11 re-audit; `role_test_writer`): THIS GENERATOR IS NOT EXPECTED TO BE RED
// AGAINST TODAY'S BUILD — THE FIX IT ASSERTS HAS LANDED AND THE CELL IS GREEN.** It asserts `DEF-2026-10-24-C`'s
// fix on `contract.md §1`'s clause of that date, items `(1)`–`(6)`: the plain-prototype predicate is STRUCTURAL,
// so a prototype mutation in either realm changes no verdict for a lawful value. **IT WAS RED BEFORE THE FIX AND
// GREEN AFTER IT, AND BOTH STATES ARE THE DECLARATION'S OWN RECORD** — the red is what the clause was written
// from (*"a same-realm prototype mutation makes every foreign-realm plain value be refused, with a class it does
// not have"*), and the green is the clause being true at the landed bytes. **NO ASSERTION IN THE CELL MOVED WITH
// THIS RE-WORDING; the stale "EXPECTED TO BE RED" sentence is the only thing that was wrong.** **EVERY PROTOTYPE
// THIS CELL MUTATES — IN EITHER REALM — IS RESTORED IN A `finally`**, so a red here cannot poison the rest of the
// suite.
test('ng_js_q7_the_cross_realm_admission_corpus_under_prototype_mutation', () => {
  runGenerator('NG-JS-Q7', 'cross-realm admission: three shapes x four addition states, plus the two deletion states', 1, () => {
    class SampleClass {}
    class ArraySubclass extends Array {}
    const INJECTED = 'pbtQ7Injected';
    const valueRealm = createContext({});
    const vmObject = runInContext('({ a: 1 })', valueRealm);
    const vmArray = runInContext('[1, { z: 2 }]', valueRealm);
    const shapes = [
      { label: 'a vm-realm plain object', value: vmObject, limb: 'object' },
      { label: 'a vm-realm array', value: vmArray, limb: 'array' },
      { label: 'a nested {outer: <vm plain object>}', value: { outer: vmObject }, limb: 'object' },
    ];
    const failures = [];

    const admitted = (label, value, address) => {
      const inst = mem();
      try {
        inst.write([address], 'mem', value);
      } catch (err) {
        failures.push(
          `${label}: REFUSED (${err && err.status} — ${JSON.stringify(err && err.message)}) where the contract admits it`,
        );
        return;
      }
      try {
        const back = inst.read([address]);
        if (back === undefined || back === null) failures.push(`${label}: the read answered no value`);
      } catch (err) {
        failures.push(`${label}: the read threw ${err && err.status}`);
      }
    };
    // **THE SUBJECT IS PASSED WHERE A CLAUSE DECLARES ONE** — rows `13`/`14` answer their own CLASS SPELLING at
    // these drives (`contract.md §2.1`'s clause of 2026-10-24, item `(2)`, and `§1`'s clause of the same date on
    // `F-RA-3`, item `(4)`: *"each with ITS OWN ROW'S CLASS SPELLING"*), so a build that rendered such a value
    // instead is caught here and not only by its class.
    const refusedWith = (label, value, cls, address, subject = null) => {
      const verdict = checkRefusal(refusalOf(value, [address]), { cls, position: ROOT_POSITION, subject });
      if (verdict !== null) failures.push(`${label}: ${verdict}`);
    };

    // THE MUTATION'S ONE NAME, AND EACH REALM'S PROTOTYPE READ THROUGH THE SHAPE'S OWN LIMB: `Object.prototype`
    // for the plain-object shapes, `Array.prototype` for the array shape.
    const thisRealmPrototype = (limb) => (limb === 'object' ? Object.prototype : Array.prototype);
    const valueRealmPrototypePath = (limb) => (limb === 'object' ? 'Object.prototype' : 'Array.prototype');
    const withThisRealmMutated = (limb, body) => {
      Object.defineProperty(thisRealmPrototype(limb), INJECTED, {
        value: 1,
        configurable: true,
        writable: true,
        enumerable: false,
      });
      try {
        body();
      } finally {
        delete thisRealmPrototype(limb)[INJECTED];
      }
    };
    const withValueRealmMutated = (limb, body) => {
      runInContext(
        `Object.defineProperty(${valueRealmPrototypePath(limb)}, '${INJECTED}', { value: 1, configurable: true, writable: true, enumerable: false });`,
        valueRealm,
      );
      try {
        body();
      } finally {
        runInContext(`delete ${valueRealmPrototypePath(limb)}['${INJECTED}'];`, valueRealm);
      }
    };
    const withBothRealmsMutated = (limb, body) => withThisRealmMutated(limb, () => withValueRealmMutated(limb, body));

    // EACH OF THE FOUR STATES, EVERY SHAPE, ONE DRIVE EACH (`JC-TC-07` item `(2)`: `three × four`).
    const driveState = (state, mutate) => {
      shapes.forEach((shape, index) => {
        const drive = () => admitted(`(${state}) ${shape.label}`, shape.value, `q7-${state}-${index}`);
        if (mutate === null) drive();
        else mutate(shape.limb, drive);
      });
    };
    driveState('i', null); // (i) PRISTINE
    driveState('ii', withThisRealmMutated); // (ii) THIS REALM MUTATED
    driveState('iii', withValueRealmMutated); // (iii) THE VALUE'S REALM MUTATED
    driveState('iv', withBothRealmsMutated); // (iv) BOTH REALMS MUTATED IDENTICALLY

    // THE CONTROLS (`JC-TC-07` item `(3)`): the causal control and the array control under state (ii), and the
    // two class refusals BOTH under the mutation and PRISTINE, so a build refusing them only BECAUSE of the
    // mutation is caught.
    withThisRealmMutated('object', () => {
      admitted('(ii) the causal control: a same-realm {a: 1}', { a: 1 }, 'q7-ii-caller-object');
      refusedWith(
        "(ii) a real class instance under this realm's mutation",
        new SampleClass(),
        'a class instance or another prototype-carrying non-plain object',
        'q7-ii-class-instance',
      );
    });
    withThisRealmMutated('array', () => {
      admitted('(ii) the array control: a same-realm [1, 2]', [1, 2], 'q7-ii-caller-array');
      refusedWith(
        "(ii) a class extending Array under this realm's mutation",
        new ArraySubclass(),
        'a class extending Array',
        'q7-ii-subclass',
      );
    });
    refusedWith(
      'pristine: a real class instance',
      new SampleClass(),
      'a class instance or another prototype-carrying non-plain object',
      'q7-pristine-class-instance',
    );
    refusedWith(
      'pristine: a class extending Array',
      new ArraySubclass(),
      'a class extending Array',
      'q7-pristine-subclass',
    );

    // ---------------------------------------------------------------------------------------
    // STATES (v) AND (vi) — THE TWO DELETION STATES, EACH NAMING THE REALM IT DELETES IN
    // ---------------------------------------------------------------------------------------
    const ROW_14 = 'a class instance or another prototype-carrying non-plain object';
    const ROW_13 = 'a class extending Array';
    // (v) A DELETION IN THE CALLER'S REALM — item `(3)`'s admission-preserving branch: the deleted name leaves the
    // reference set's live half and with it the requirement, so no verdict moves.
    const withThisRealmDeleted = (target, name, body) => {
      const saved = Object.getOwnPropertyDescriptor(target, name);
      if (saved === undefined) {
        failures.push(`the deletion drive cannot run: ${name} is not an own member of this realm's prototype`);
        return;
      }
      try {
        delete target[name];
        body();
      } finally {
        Object.defineProperty(target, name, saved);
      }
      if (Object.getOwnPropertyDescriptor(target, name) === undefined) {
        failures.push(`this realm's ${name} was not restored after the deletion drive`);
      }
    };
    withThisRealmDeleted(Object.prototype, 'hasOwnProperty', () => {
      admitted('(v) the caller realm deleted `hasOwnProperty`: a same-realm {a: 1}', { a: 1 }, 'q7-v-caller-object');
      admitted(
        '(v) the caller realm deleted `hasOwnProperty`: the foreign vm plain object (whose prototype still carries it)',
        vmObject,
        'q7-v-foreign-object',
      );
    });
    // THE ARRAY LIMB OF THE CALLER-REALM BRANCH. **THE THREE INSTANCES ARE BUILT BEFORE THE WINDOW because the
    // PACKAGE'S OWN CONSTRUCTION reads `Array.prototype` — a fact about the harness, not about the verdict on the
    // value, which is what this drive asserts; the read-back is taken AFTER the restore for the same reason.**
    const callerRealmArrayInstances = [mem(), mem()];
    withThisRealmDeleted(Array.prototype, 'map', () => {
      const writes = [
        ['(v) the caller realm deleted `map`: a same-realm [1, 2]', [1, 2], 'q7-v-caller-array'],
        ['(v) the caller realm deleted `map`: the foreign vm array', vmArray, 'q7-v-foreign-array'],
      ];
      writes.forEach(([label, value, address], index) => {
        try {
          callerRealmArrayInstances[index].write([address], 'mem', value);
        } catch (err) {
          failures.push(
            `${label}: REFUSED (${err && err.status} — ${JSON.stringify(err && err.message)}) where §1's caller-realm branch admits it`,
          );
        }
      });
    });
    for (const [index, label, address] of [
      [0, '(v) the caller realm deleted `map`: a same-realm [1, 2]', 'q7-v-caller-array'],
      [1, '(v) the caller realm deleted `map`: the foreign vm array', 'q7-v-foreign-array'],
    ]) {
      try {
        const back = callerRealmArrayInstances[index].read([address]);
        if (back === undefined || back === null) failures.push(`${label}: the read answered no value`);
      } catch (err) {
        failures.push(`${label}: the read threw ${err && err.status}`);
      }
    }

    // (vi) A DELETION IN THE VALUE'S REALM — item `(4)`'s declared consequence: the value's own prototype is
    // genuinely no longer standard-shaped, so it is refused as ITS OWN ROW's class at its own value position.
    const withValueRealmDeleted = (targetPath, name, body) => {
      const saved = runInContext(
        `Object.getOwnPropertyDescriptor(${targetPath}, ${JSON.stringify(name)})`,
        valueRealm,
      );
      if (saved === undefined || saved === null) {
        failures.push(`the deletion drive cannot run: ${name} is not an own member of the value realm's ${targetPath}`);
        return;
      }
      runInContext(`delete ${targetPath}[${JSON.stringify(name)}];`, valueRealm);
      try {
        body();
      } finally {
        valueRealm.__q7SavedDescriptor = saved;
        runInContext(
          `Object.defineProperty(${targetPath}, ${JSON.stringify(name)}, __q7SavedDescriptor);`,
          valueRealm,
        );
      }
    };
    withValueRealmDeleted('Object.prototype', 'hasOwnProperty', () => {
      refusedWith(
        "(vi) the value realm deleted `hasOwnProperty`: the lawful vm plain object",
        vmObject,
        ROW_14,
        'q7-vi-object',
        ROW_14,
      );
      // **AND THE ARRAY LIMB FOLLOWS FROM THE SAME DELETION** — `§1`'s item `(2)`: *"a deletion from the VALUE's
      // realm's `Object.prototype` reaches the array limb too, through `isStandardObjectPrototype(above)`"*.
      refusedWith(
        "(vi) the value realm deleted `hasOwnProperty`: that realm's array, through the chain check",
        vmArray,
        ROW_13,
        'q7-vi-array-via-object-deletion',
        ROW_13,
      );
      admitted("(vi) this realm is untouched: a same-realm {a: 1}", { a: 1 }, 'q7-vi-caller-object');
    });
    withValueRealmDeleted('Array.prototype', 'map', () => {
      refusedWith(
        "(vi) the value realm deleted `map`: the lawful vm array",
        vmArray,
        ROW_13,
        'q7-vi-array',
        ROW_13,
      );
      admitted(
        "(vi) that realm's plain object stays ADMITTED under the array-limb deletion",
        vmObject,
        'q7-vi-object-under-array-deletion',
      );
      admitted("(vi) this realm's [1, 2] stays ADMITTED", [1, 2], 'q7-vi-caller-array');
    });
    // AND EVERY DELETED NAME IS RESTORED, IN BOTH REALMS, ASSERTED RATHER THAN ASSUMED.
    if (Object.getOwnPropertyDescriptor(Object.prototype, 'hasOwnProperty') === undefined) {
      failures.push("this realm's `Object.prototype.hasOwnProperty` was not restored after the deletion drive");
    }
    if (Object.getOwnPropertyDescriptor(Array.prototype, 'map') === undefined) {
      failures.push("this realm's `Array.prototype.map` was not restored after the deletion drive");
    }
    const valueRealmDeletedNamesRestored = runInContext(
      "Object.prototype.hasOwnProperty('hasOwnProperty') && Array.prototype.hasOwnProperty('map')",
      valueRealm,
    );
    if (valueRealmDeletedNamesRestored !== true) {
      failures.push("the value realm's deleted standard names were not restored after the drive");
    }
    admitted('after the deletion states: a vm-realm plain object (pristine again)', vmObject, 'q7-v-restored-object');
    admitted('after the deletion states: a vm-realm array (pristine again)', vmArray, 'q7-v-restored-array');

    // AND EVERY PROTOTYPE IS PRISTINE AFTERWARDS, IN BOTH REALMS: the restore is asserted, not assumed, and the
    // pristine state admits the foreign values again.
    if (Object.prototype.hasOwnProperty.call(Object.prototype, INJECTED)) {
      failures.push("this realm's `Object.prototype` was not restored after the drive");
    }
    if (Array.prototype.hasOwnProperty.call(Array.prototype, INJECTED)) {
      failures.push("this realm's `Array.prototype` was not restored after the drive");
    }
    const valueRealmRestored = runInContext(
      `!(Object.prototype.hasOwnProperty('${INJECTED}') || Array.prototype.hasOwnProperty('${INJECTED}'))`,
      valueRealm,
    );
    if (valueRealmRestored !== true) {
      failures.push("the value realm's prototypes were not restored after the drive");
    }
    admitted('after every restore: a vm-realm plain object', vmObject, 'q7-restored-object');
    admitted('after every restore: a vm-realm array', vmArray, 'q7-restored-array');

    if (failures.length > 0) return failures.join(' | ');
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q8` — the node integer counts the POSITIONS the walk visits, not the objects it meets
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 (`role_test_writer`; `contract.md §4`'s clause of 2026-10-24 on the gate-11 finding
// `F-RA-4`, items `(2)`, `(3)` and `(5)`; `test-cases.md`'s `JC-TC-11` and `JC-TC-42` cells at that part's `§3`
// clause of the same date). THE TERM THE CLAUSE DECIDES, WHICH NO CELL HAD PINNED: a sub-value reachable from
// TWO positions is counted ONCE PER POSITION, so the ceiling bounds the CROSSING'S OWN WORK and not the
// caller's graph** — item `(2)`'s words, *"the integer counts visits — each position the walk visits below the
// root, a sub-value reached from two positions counting twice"*, with *"the emitted tree's own-node count"* as
// the convention's ground because `§4`'s first clause requires every position to become its OWN node.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (item `(3)`'s two printed witnesses, verbatim, plus the
// controls item `(5)` permits):
//
// | State | The caller's value | Distinct objects | Positions visited | Declared answer |
// | --- | --- | --- | --- | --- |
// | (a) THE DIAMOND | `const a = {}; ({x: a, y: a})` | `2` | `3` (the root, then one at each member) | **ADMITTED**, with the store round-trip, and the copy-out's two positions are DISTINCT nodes (`§4`'s no-aliasing rule) |
// | (b) THE FILLED ARRAY | `new Array(1_000_000).fill(<one shared leaf>)` | `2` | `1,000,001` | **REFUSED** at the ROOT, row `8`'s class `a value over the walk ceiling` as PART ONE's subject, status `ValueRefusedAtBoundary` |
// | (c) A SMALL ALIASED ARRAY (the control item `(5)` allows: an aliased value is not refused for its repeated sub-value) | `new Array(4).fill(<one shared leaf>)` | `2` | `5` | **ADMITTED**, and its four positions are four distinct nodes in the copy-out |
// | (d) THE CEILING'S OWN BOUNDARY PAIR, `999,999` ADMITTED / `1,000,000` REFUSED | driven at `NG-JS-Q1` and at the acceptance set's `JC-TC-42`; NOT re-run here | — | — | stated here and not driven, because `§4` item `(5)` allows the figures and the acceptance set already answers them |
//
// **THE ONE THING THIS CELL MAY NOT DO IS DERIVE THE INTEGER FROM A CENSUS THAT DE-DUPLICATES — item `(5)`'s
// `MAY NOT`.** Both censuses are therefore PRINTED as the clause prints them and asserted as facts, while the
// verdicts come from the declared answers; the cell never infers a verdict from a distinct-node count.
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the diamond refused (a distinct-object census standing in for the
// integer), the filled array admitted (the same), the refusal naming a member position instead of the ROOT,
// PART ONE's subject rendered instead of the class spelling, or the copy-out aliasing two positions onto one
// node.
test('ng_js_q8_the_node_integer_counts_visits_and_not_distinct_objects', { timeout: 300000 }, () => {
  runGenerator('NG-JS-Q8', 'the node integer counts visits: 2 objects, 3 and 1,000,001 positions', 1, () => {
    // THE POSITIONS THE WALK VISITS — the root plus every member/element position, WITH REPETITION (a shared
    // sub-value is counted once per position). This is the count the clause declares, and it is computed from
    // the fixture's SHAPE; it does not de-duplicate.
    const positionsVisited = (value) => {
      if (value === null || typeof value !== 'object') return 1;
      if (Array.isArray(value)) {
        let count = 1;
        for (let i = 0; i < value.length; i += 1) count += positionsVisited(value[i]);
        return count;
      }
      let count = 1;
      for (const key of Object.keys(value)) count += positionsVisited(value[key]);
      return count;
    };
    // THE OTHER CENSUS, PRINTED ONLY: the distinct objects the value carries, which item `(3)` prints beside the
    // integer to show that the two are different questions.
    const distinctObjects = (value) => {
      const seen = new Set();
      const visit = (node) => {
        if (node === null || typeof node !== 'object' || seen.has(node)) return;
        seen.add(node);
        if (Array.isArray(node)) {
          for (let i = 0; i < node.length; i += 1) visit(node[i]);
        } else {
          for (const key of Object.keys(node)) visit(node[key]);
        }
      };
      visit(value);
      return seen.size;
    };

    // (a) THE DIAMOND — `contract.md §4` item `(3)` item `(a)`: `2` distinct objects, `3` visits, ADMITTED.
    const sharedNode = {};
    const diamond = { x: sharedNode, y: sharedNode };
    if (positionsVisited(diamond) !== 3) {
      return `the diamond's own fixture is not the clause's witness: it visits ${positionsVisited(diamond)} positions where item (3) prints 3`;
    }
    if (distinctObjects(diamond) !== 2) {
      return `the diamond's own fixture is not the clause's witness: it carries ${distinctObjects(diamond)} distinct objects where item (3) prints 2`;
    }
    const diamondInstance = mem();
    let diamondRefusal = null;
    try {
      diamondInstance.write(['q8-diamond'], 'mem', diamond);
    } catch (err) {
      diamondRefusal = err;
    }
    if (diamondRefusal !== null) {
      return (
        `the acyclic diamond — 2 distinct objects reached from 3 positions — was REFUSED ` +
        `(${diamondRefusal.status}: ${JSON.stringify(diamondRefusal.message)}); §4 item (2) declares the ancestor ` +
        `stack refuses cycles and never shared ancestry, and item (3) (a) declares this value ADMITTED`
      );
    }
    const diamondBack = diamondInstance.read(['q8-diamond']);
    if (diamondBack === null || typeof diamondBack !== 'object') {
      return 'the diamond: the read answered no tree';
    }
    if (diamondBack.x === diamondBack.y) {
      return 'the diamond: the copy-out ALIASED two positions onto ONE node, which §4\'s first clause forbids';
    }
    assert.deepEqual(diamondBack, { x: {}, y: {} });

    // (b) THE FILLED ARRAY — `new Array(1_000_000).fill(<one shared leaf>)`: `2` distinct nodes, `1,000,001`
    // visits, REFUSED at the ROOT as row `8`. **THE LEAF IS `{}`, exactly as item `(3)` item `(b)` prints the
    // arithmetic ("the root `1`, then `1` per element"), so the visit count below is the clause's own figure
    // and not a nearby one.**
    const sharedLeaf = {};
    const filled = new Array(1000000).fill(sharedLeaf);
    if (positionsVisited(filled) !== 1000001) {
      return `the filled array's own fixture is not the clause's witness: it visits ${positionsVisited(filled)} positions where item (3) prints 1,000,001`;
    }
    if (distinctObjects(filled) !== 2) {
      return `the filled array's own fixture is not the clause's witness: it carries ${distinctObjects(filled)} distinct nodes where item (3) prints 2`;
    }
    const filledVerdict = checkRefusal(refusalOf(filled, ['q8-filled']), {
      cls: 'a value over the walk ceiling',
      position: ROOT_POSITION,
      subject: 'a value over the walk ceiling',
    });
    if (filledVerdict !== null) return `the 1,000,001-visit filled array: ${filledVerdict}`;

    // (c) THE ALIASED ADMISSION AT A SMALL SIZE — the same shape four elements wide: `2` distinct nodes, `5`
    // positions, ADMITTED, and its four positions come out as four DISTINCT nodes. **This is the control that
    // makes the ceiling's subject unambiguous: the value is not refused for its repeated sub-value.**
    const smallLeaf = {};
    const smallAliased = new Array(4).fill(smallLeaf);
    if (positionsVisited(smallAliased) !== 5 || distinctObjects(smallAliased) !== 2) {
      return `the small aliased array's own fixture is not the clause's witness: ${positionsVisited(smallAliased)} positions over ${distinctObjects(smallAliased)} distinct nodes`;
    }
    const smallInstance = mem();
    try {
      smallInstance.write(['q8-small'], 'mem', smallAliased);
    } catch (err) {
      return `the small aliased array was REFUSED (${err.status}: ${JSON.stringify(err.message)}); shared ancestry is not a refusal under §4 item (2)`;
    }
    const smallBack = smallInstance.read(['q8-small']);
    if (!Array.isArray(smallBack) || smallBack.length !== 4) {
      return 'the small aliased array: the read is not a four-element dense array';
    }
    for (let i = 1; i < smallBack.length; i += 1) {
      if (smallBack[i] === smallBack[0]) {
        return `the small aliased array: positions 0 and ${i} came out as ONE node — §4's first clause requires every position to become its own`;
      }
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q9` — row `17`: an array carrying a non-index own member is REFUSED
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 (`role_test_writer`; `contract.md §2`'s clause of 2026-10-24 on the gate-11 finding
// `F-RA-5`, items `(1)`–`(8)`; `test-cases.md §3`'s `JC-TC-49`). THE ROW IS A DECLARED TARGET LAW AND THE BUILD
// DOES NOT ANSWER IT YET — item `(8)` says so in as many words: *"UNTIL IT LANDS THE BUILD DROPS THE MEMBER: no
// cell may assert the drop as admission, no cell may assert this row's message as present, and the row is owed
// and not green."* THE STATE THIS CELL IS THE RED FOR, READ AT THE BYTES: `const a = [1]; a.foo = 3;` crosses as
// `[1]` — the member is dropped, silently.**
//
// **THE PREDICATE, VERBATIM FROM ITEM `(3)` SO NO CELL GUESSES: *"a value is this row's subject iff
// `Array.isArray(value)` is `true` AND the value carries an own ENUMERABLE string-keyed member whose key is not
// a canonical array index — i.e. not `String(i)` for an integer `i` with `0 ≤ i ≤ value.length − 1`".* The
// POSITION is the ARRAY'S OWN value position and never the extra member's (item `(5)`); the SUBJECT is the ROW'S
// CLASS SPELLING (item `(5)` and `§2.1`'s per-arm table row `17`), so the message names the class twice; and the
// ORDER with the four arms around it is row `13`, then row `16`, then rows `15`/`5`, then THIS ROW, then the
// element walk (item `(6)`).**
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:**
//
// | State | The caller's value | Declared answer |
// | --- | --- | --- |
// | (a) THE ROW ITSELF, AT THE ROOT | `const a = [1]; a.foo = 3;` | REFUSED row `17` at `the write's value argument`, subject the class spelling, status `ValueRefusedAtBoundary` |
// | (b) THE ROW AT A MEMBER POSITION | `{ m: <the same shape> }` | REFUSED row `17` at ``member 'm' of the write's value argument`` |
// | (c) A NON-CANONICAL INDEX KEY | `const b = [1]; b['01'] = 9;` | REFUSED row `17` at the root — `'01'` is not `String(i)` for any `i` in `0…0` |
// | (d) THE SHAPE TEST PRECEDES THE ELEMENT WALK (item `(6)`) | `const d = [10n]; d.foo = 1;` | REFUSED **row `17`**, NOT row `6`'s `a bigint`, and the refusal costs no element visit |
// | (e) THE CONTROL — NO EXTRA MEMBER | `[1]` | ADMITTED, round-tripped as `[1]` |
// | (f) THE CONTROL — AN INDEX-SHAPED KEY THAT IS CANONICAL | `const c = [1]; c[1] = 2;` (length `2`, keys `'0'`,`'1'`) | ADMITTED — every key is a canonical index |
// | (g) THE CONTROL — AN OWN SYMBOL-KEYED MEMBER answers its OWN row | `const s = [1]; s[Symbol('s')] = 1;` | REFUSED **row `5`**, `a value carrying a Symbol-keyed own member` (item `(6)`: the shape helper precedes this row) |
// | (h) THE CONTROL — an own NON-ENUMERABLE extra member | `const e = [1]` with a non-enumerable `note` | ADMITTED — item `(3)`'s predicate is over own **ENUMERABLE** members, and the walk reads elements by index (a member outside the tree by the same rule that puts an object's non-enumerable members outside it) |
// | (i) THE ORDER WITH row `13` | `class V extends Array {}` instance carrying `foo` | REFUSED **row `13`**, `a class extending Array` |
// | (j) THE ORDER WITH row `16` | `const h = [1, , 3]; h.foo = 1;` | REFUSED **row `16`**, `a sparse array` |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any of (a)–(d) ADMITTED (today's silent drop), the extra member's own
// spelling in the message, a member position where the array's own value position is declared, or a control
// refused.
test('ng_js_q9_row_17_refuses_an_array_carrying_a_non_index_own_member', () => {
  runGenerator('NG-JS-Q9', 'row 17: an array carrying a non-index own member, plus its four controls and two order arms', 1, () => {
    const ROW_17 = 'an array carrying a non-index own member';
    const arrayWithExtraMember = () => {
      const array = [1];
      array.foo = 3;
      return array;
    };
    const refusedAsRow17 = (label, value, position) => {
      const verdict = checkRefusal(refusalOf(value, ['q9']), {
        cls: ROW_17,
        position,
        subject: ROW_17,
      });
      return verdict === null ? null : `${label}: ${verdict}`;
    };
    const admitted = (label, value) => {
      const instance = mem();
      try {
        instance.write(['q9-admitted'], 'mem', value);
      } catch (err) {
        return `${label}: REFUSED (${err.status}: ${JSON.stringify(err.message)}) where the contract admits it`;
      }
      return null;
    };

    // (a) THE ROW AT THE ROOT — item `(1)`'s measured state and item `(2)`'s ruling.
    const rootVerdict = refusedAsRow17('(a) the row itself at the ROOT', arrayWithExtraMember(), ROOT_POSITION);
    if (rootVerdict !== null) return rootVerdict;

    // (b) THE ROW AT A MEMBER POSITION — the ARRAY's own value position, never the extra member's (item `(5)`).
    const memberVerdict = refusedAsRow17(
      '(b) the row at a MEMBER position',
      { m: arrayWithExtraMember() },
      positionOf(['m']),
    );
    if (memberVerdict !== null) return memberVerdict;

    // (c) A NON-CANONICAL INDEX KEY — `'01'` is a string key whose integer form is not its own spelling.
    const nonCanonical = [1];
    nonCanonical['01'] = 9;
    const nonCanonicalVerdict = refusedAsRow17("(c) a non-canonical index key `'01'`", nonCanonical, ROOT_POSITION);
    if (nonCanonicalVerdict !== null) return nonCanonicalVerdict;

    // (d) THE SHAPE TEST PRECEDES THE ELEMENT WALK (item `(6)`'s last clause): an array carrying the member whose
    // ELEMENT is itself refused answers THIS ROW, so the answer must not be `a bigint`.
    const extraMemberBesideARefusedElement = [10n];
    extraMemberBesideARefusedElement.foo = 1;
    const orderVerdict = refusedAsRow17(
      '(d) the shape test preceding the element walk (an array whose element is a bigint)',
      extraMemberBesideARefusedElement,
      ROOT_POSITION,
    );
    if (orderVerdict !== null) return orderVerdict;

    // (e) THE CONTROL — the same array WITHOUT the extra member is ADMITTED and round-trips as `[1]`.
    const admittedVerdict = admitted('(e) the plain `[1]` control', [1]);
    if (admittedVerdict !== null) return admittedVerdict;
    const controlInstance = mem();
    controlInstance.write(['q9-plain'], 'mem', [1]);
    assert.deepEqual(controlInstance.read(['q9-plain']), [1]);

    // (f) THE CONTROL — an index-shaped key that IS canonical: `c[1] = 2` lengthens the array to `2` and every
    // key is then a canonical index, so the value is NOT this row's subject.
    const canonicalIndex = [1];
    canonicalIndex[1] = 2;
    const canonicalVerdict = admitted('(f) the canonical-index control `c[1] = 2`', canonicalIndex);
    if (canonicalVerdict !== null) return canonicalVerdict;

    // (g) THE CONTROL — an own Symbol-keyed member answers its OWN row `5`, which precedes this row (item `(6)`).
    const symbolKeyedArray = [1];
    symbolKeyedArray[Symbol('s')] = 1;
    const symbolVerdict = checkRefusal(refusalOf(symbolKeyedArray, ['q9-symbol']), {
      cls: 'a value carrying a Symbol-keyed own member',
      position: ROOT_POSITION,
      subject: 'a value carrying a Symbol-keyed own member',
    });
    if (symbolVerdict !== null) return `(g) an own Symbol-keyed member beside the shape: ${symbolVerdict}`;

    // (h) THE CONTROL — an own NON-ENUMERABLE extra member is outside item `(3)`'s predicate, so the value is
    // ADMITTED and the member never reaches the tree (the walk reads elements by index).
    const nonEnumerableExtra = [1];
    Object.defineProperty(nonEnumerableExtra, 'note', {
      value: 2,
      enumerable: false,
      configurable: true,
      writable: true,
    });
    const nonEnumerableVerdict = admitted('(h) an own non-enumerable extra member', nonEnumerableExtra);
    if (nonEnumerableVerdict !== null) return nonEnumerableVerdict;

    // (i) THE ORDER WITH row `13`: a class extending `Array` carrying the member answers row `13` first.
    class ArraySubclassWithExtraMember extends Array {}
    const subclassValue = new ArraySubclassWithExtraMember();
    subclassValue.push(1);
    subclassValue.foo = 2;
    const subclassVerdict = checkRefusal(refusalOf(subclassValue, ['q9-subclass']), {
      cls: 'a class extending Array',
      position: ROOT_POSITION,
      subject: 'a class extending Array',
    });
    if (subclassVerdict !== null) return `(i) a class extending Array carrying a non-index member: ${subclassVerdict}`;

    // (j) THE ORDER WITH row `16`: a sparse array carrying the member answers row `16` first.
    const sparseWithExtra = [1, , 3];
    sparseWithExtra.foo = 1;
    const sparseVerdict = checkRefusal(refusalOf(sparseWithExtra, ['q9-sparse']), {
      cls: 'a sparse array',
      position: ROOT_POSITION,
      subject: 'a sparse array',
    });
    if (sparseVerdict !== null) return `(j) a sparse array carrying a non-index member: ${sparseVerdict}`;

    return null;
  });
});

// =============================================================================================
// `NG-JS-Q10` — `F-RA-11`: an index whose only carrier is the prototype is a HOLE
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2`'s row `16` and its clause of 2026-10-24
// on `F-RA-11`, items `(1)`, `(3)`, `(4)`, `(5)` and `(7)`; `§2.1`'s per-arm row `16` cell; `test-cases.md §3`'s
// `JC-TC-50`):
//
// | The state | Its declared answer |
// | --- | --- |
// | an array of length `2…4` whose index `k` has NO OWN property, the prototype carrying index `k` as a DATA member | REFUSED: row `16`'s class `a sparse array`, at the ARRAY'S own value position, PART ONE's subject the class spelling |
// | the same shape with the prototype's index `k` an ACCESSOR | the SAME answer, and the inherited getter's counter `0` |
// | an array carrying an OWN hole at an index the prototype does NOT carry | REFUSED as row `16` — the carrier is irrelevant to the row |
// | the same array with every index OWN (a genuinely dense array), under the same mutated prototype | ADMITTED and round-tripped, carrying the caller's OWN elements and never the prototype's value |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the holey array ADMITTED with the prototype's value in the crossed
// tree (today's chain-inclusive `in` test), the inherited getter RUN on the refusal path, a refusal naming the
// prototype-carried index as a position, or the dense control refused.
//
// **THE ACCESSOR CARRIER IS A GET/SET PAIR, AND WHY IS DRIVING AND NOT EXPECTING:** a getter-only member on
// `Array.prototype` makes every `push` on a length-`0` array throw inside the package's carrier encoding
// (`encodeAddress`'s `segments`, `write`'s `args`), so the value walk is never reached — measured, and outside
// this clause (`§2`'s clause of this date, item `(8)`, keeps the carrier `in` tests out of it). The setter
// defines an own property on the receiver exactly as `push` would, so the carrier path is unaffected while the
// state under test — an index with no own property, the prototype carrying it as an accessor — is unchanged.
//
// **THE PROTOYPE IS RESTORED IN A `finally` AND THE RESTORE IS ASSERTED**, so no attempt can leak a carrier
// into the next attempt's state.
test('ng_js_q10_a_prototype_carried_index_is_a_hole_and_is_refused', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q10', 'row 16: a prototype-carried index — data and accessor carriers, drawn length and index', 6, (attempt, rng) => {
    const ROW_16 = 'a sparse array';
    const CARRIED = 'PROTOTYPE_CARRIED_INDEX';
    const length = 2 + (rng.next().value % 3);
    const holeIndex = rng.next().value % length;
    const ownHoleIndex = (holeIndex + 1) % length;
    const accessorCarrier = rng.next().value % 2 === 1;
    const reads = { count: 0 };
    const build = (holeAt) => {
      const array = [];
      for (let i = 0; i < length; i += 1) if (i !== holeAt) array[i] = `own-${i}`;
      array.length = length;
      return array;
    };
    const install = () => {
      if (accessorCarrier) {
        Object.defineProperty(Array.prototype, String(holeIndex), {
          get() {
            reads.count += 1;
            return CARRIED;
          },
          set(value) {
            Object.defineProperty(this, String(holeIndex), {
              value, writable: true, enumerable: true, configurable: true,
            });
          },
          configurable: true,
        });
      } else {
        Array.prototype[holeIndex] = CARRIED;
      }
    };
    let rowError = null;
    let ownHoleError = null;
    let denseVerdict = null;
    try {
      install();
      // (0) THE INSTRUMENT'S LIVENESS: a direct read of the carried index on a HOLEY twin runs the getter.
      if (accessorCarrier) {
        void build(holeIndex)[holeIndex];
        if (reads.count === 0) return `attempt ${attempt}: the accessor carrier at index ${holeIndex} is DEAD — a direct index read ran nothing`;
        reads.count = 0;
      }
      // (1) THE ROW ITSELF.
      rowError = refusalOf(build(holeIndex), ['q10']);
      // (2) THE OWN-HOLE CONTROL — the array's hole is at an index the prototype does NOT carry.
      ownHoleError = refusalOf(build(ownHoleIndex), ['q10-own']);
      // (3) THE DENSE CONTROL — every index OWN, under the same mutated prototype.
      const admitted = build(-1);
      const inst = mem();
      inst.write(['q10-dense'], 'mem', admitted);
      const back = inst.read(['q10-dense']);
      denseVerdict = canonicalTreeJson(back) === canonicalTreeJson(admitted) && !canonicalTreeJson(back).includes(CARRIED)
        ? null
        : `attempt ${attempt}: the dense control did not round-trip its OWN elements: ${canonicalTreeJson(back)}`;
    } finally {
      delete Array.prototype[holeIndex];
    }
    if (Object.hasOwn(Array.prototype, String(holeIndex))) {
      return `attempt ${attempt}: Array.prototype was NOT restored at index ${holeIndex}`;
    }
    const rowVerdict = checkRefusal(rowError, { cls: ROW_16, position: ROOT_POSITION, subject: ROW_16 });
    if (rowVerdict !== null) {
      return `attempt ${attempt} (length ${length}, index ${holeIndex}, ${accessorCarrier ? 'accessor' : 'data'} carrier): ${rowVerdict}`;
    }
    if (accessorCarrier && reads.count !== 0) {
      return `attempt ${attempt}: the prototype-carried getter RAN on the refusal path (count ${reads.count})`;
    }
    const ownHoleVerdict = checkRefusal(ownHoleError, { cls: ROW_16, position: ROOT_POSITION, subject: ROW_16 });
    if (ownHoleVerdict !== null) {
      return `attempt ${attempt}: the own-hole control (no prototype carrier at index ${ownHoleIndex}): ${ownHoleVerdict}`;
    }
    return denseVerdict;
  });
});

// =============================================================================================
// `NG-JS-Q11` — `F-RA-12`: a `Proxy` standing as a prototype is answered as `'class'`, no trap run
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2`'s clause of 2026-10-24 on `F-RA-12`,
// items `(2)`, `(5)`, `(6)` and `(7)`; `§2`'s rows `13`/`14`; `test-cases.md §3`'s `JC-TC-51`):
//
// | The state | Its declared answer |
// | --- | --- |
// | a LYING `Proxy` as a NON-ARRAY value's prototype, at the root or at a member position | REFUSED: row `14`'s class `a class instance or another prototype-carrying non-plain object`, subject the class spelling, EVERY trap `0` |
// | a LYING `Proxy` as an ARRAY value's prototype | REFUSED: row `13`'s class `a class extending Array`, every trap `0` |
// | an HONEST `Proxy` over a `null`-prototype target as either limb's prototype | the SAME class answer for its limb, every trap `0` — the class answer is taken by `util.types.isProxy` BEFORE any census read |
// | a REVOKED `Proxy` as a prototype | the SAME class answer for its limb, no trap (none can run), and NO host error escaping |
// | a plain `{}` / `{a: 1}` / `[1, 2]` drawn as the control | ADMITTED and round-tripped |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the value ADMITTED (a lying `ownKeys` believed), the right class
// answered with a trap counted above `0`, the revoked link's `TypeError` escaping the boundary's frame, or the
// plain control refused.
test('ng_js_q11_a_proxy_standing_as_a_prototype_is_answered_as_class_with_no_trap_run', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q11', 'rows 14/13: a Proxy as a prototype — lying, honest and revoked, at drawn limbs and positions', 6, (attempt, rng) => {
    const ROW_13 = 'a class extending Array';
    const ROW_14 = 'a class instance or another prototype-carrying non-plain object';
    const LIE = 'CALLER_CONTROLLED_PROTOTYPE_Q11';
    const TRAP_KEYS = ['get', 'has', 'ownKeys', 'getOwnPropertyDescriptor', 'getPrototypeOf'];
    const limb = rng.next().value % 2 === 0 ? 'object' : 'array';
    const mode = ['lying', 'honest', 'revoked'][rng.next().value % 3];
    const atMember = rng.next().value % 2 === 0;
    const position = atMember ? positionOf(['m']) : ROOT_POSITION;
    const cls = limb === 'array' ? ROW_13 : ROW_14;

    const countedProxy = (limbName, lying) => {
      const counters = { get: 0, has: 0, ownKeys: 0, getOwnPropertyDescriptor: 0, getPrototypeOf: 0 };
      const target = Object.create(null);
      const standardKeys = limbName === 'array'
        ? [...Object.getOwnPropertyNames(Array.prototype), ...Object.getOwnPropertySymbols(Array.prototype)]
        : Object.getOwnPropertyNames(Object.prototype);
      const handler = lying
        ? {
          get() { counters.get += 1; return LIE; },
          has() { counters.has += 1; return false; },
          ownKeys() { counters.ownKeys += 1; return [...standardKeys]; },
          getOwnPropertyDescriptor() {
            counters.getOwnPropertyDescriptor += 1;
            return { value: 1, writable: true, enumerable: false, configurable: true };
          },
          getPrototypeOf() {
            counters.getPrototypeOf += 1;
            return limbName === 'array' ? Object.prototype : null;
          },
        }
        : {
          get(t, key, receiver) { counters.get += 1; return Reflect.get(t, key, receiver); },
          has(t, key) { counters.has += 1; return Reflect.has(t, key); },
          ownKeys(t) { counters.ownKeys += 1; return Reflect.ownKeys(t); },
          getOwnPropertyDescriptor(t, key) {
            counters.getOwnPropertyDescriptor += 1;
            return Reflect.getOwnPropertyDescriptor(t, key);
          },
          getPrototypeOf(t) { counters.getPrototypeOf += 1; return Reflect.getPrototypeOf(t); },
        };
      return { proxy: new Proxy(target, handler), counters };
    };
    const trappedValue = (built) => {
      if (limb !== 'array') return Object.create(built.proxy);
      const array = [1, 2];
      Object.setPrototypeOf(array, built.proxy);
      return array;
    };

    // THE LIVENESS PROOF, ON A TWIN: each of the five counters is driven directly before any `0` is asserted.
    if (mode !== 'revoked') {
      const live = countedProxy(limb, mode === 'lying');
      Object.getPrototypeOf(live.proxy);
      Object.getOwnPropertyNames(live.proxy);
      Object.getOwnPropertyDescriptor(live.proxy, 'probe');
      live.proxy.probe;
      'probe' in live.proxy;
      for (const key of TRAP_KEYS) {
        if (live.counters[key] === 0) return `attempt ${attempt}: the ${key} trap's counter is DEAD — a direct read ran it 0 times`;
      }
    }

    const built = countedProxy(limb, mode === 'lying');
    let error = null;
    if (mode === 'revoked') {
      const revocable = Proxy.revocable(Object.create(null), {});
      const value = limb === 'array' ? (() => {
        const array = [1, 2];
        Object.setPrototypeOf(array, revocable.proxy);
        return array;
      })() : Object.create(revocable.proxy);
      revocable.revoke();
      try {
        Object.getPrototypeOf(revocable.proxy);
        return `attempt ${attempt}: the revoked instrument is NOT revoked — a direct read answered`;
      } catch (thrown) {
        if (!(thrown instanceof TypeError)) return `attempt ${attempt}: the revoke proof threw ${String(thrown)}`;
      }
      // A MEMBER POSITION IS THE VALUE'S OWN POSITION INSIDE THE WRITE'S VALUE ARGUMENT: the refused
      // value stands at `member 'm'` and never at the address's own root, so the address is held fixed
      // across the two positions and only the VALUE's shape moves.
      try {
        const inst = mem();
        inst.write(['q11'], 'mem', atMember ? { m: value } : value);
      } catch (caught) {
        error = caught;
      }
    } else {
      const value = trappedValue(built);
      try {
        const inst = mem();
        inst.write(['q11'], 'mem', atMember ? { m: value } : value);
      } catch (caught) {
        error = caught;
      }
    }
    const verdict = checkRefusal(error, { cls, position, subject: cls });
    if (verdict !== null) {
      return `attempt ${attempt} (${mode} Proxy as the prototype of a ${limb} value, ${atMember ? 'at a member position' : 'at the root'}): ${verdict}`;
    }
    if (mode !== 'revoked') {
      for (const key of TRAP_KEYS) {
        if (built.counters[key] !== 0) {
          return `attempt ${attempt}: the ${key} trap RAN on the refusal path (count ${built.counters[key]})`;
        }
        if (error.message.includes(LIE) || JSON.stringify(error).includes(LIE)) {
          return `attempt ${attempt}: the handler's MARKER reached the refusal object: ${JSON.stringify(error.message)}`;
        }
      }
    }
    // THE CONTROL — a plain value of the drawn shape is ADMITTED and round-trips: the guard costs nothing.
    const control = ['plain', 'member', 'array'][rng.next().value % 3];
    const plain = control === 'array' ? [1, 2] : control === 'member' ? { a: 1 } : {};
    const inst = mem();
    inst.write(['q11-control'], 'mem', plain);
    const back = inst.read(['q11-control']);
    if (canonicalTreeJson(back) !== canonicalTreeJson(plain)) {
      return `attempt ${attempt}: the plain control was refused or altered: ${canonicalTreeJson(back)}`;
    }
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q12` — `F-RA-13` limb `1a`: an ADDED `Symbol.toPrimitive` on a shape-standard prototype
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.1`'s clause of 2026-10-24 on `F-RA-13`,
// items `(1a)`, `(4)` and `(6)`; `§2.1`'s per-arm row `3` and row-`8`-depth cells; `test-cases.md §3`'s
// `JC-TC-52`):
//
// | The state | Its declared answer |
// | --- | --- |
// | row `3`, the function's only conversion path a `Symbol.toPrimitive` ADDED to `Function.prototype` | row `3`'s CLASS SPELLING `a function`, the added member's counter `0` |
// | row `3`, the added member on `Object.prototype` (the chain's next standard link) | the SAME class spelling, counter `0` |
// | row `8`'s DEPTH ARM over an object whose only conversion path is the added member on `Object.prototype` | row `8`'s CLASS SPELLING `a value over the walk ceiling`, at the value's own `127`-segment position, counter `0` |
// | row `8`'s DEPTH ARM over a FUNCTION leaf whose only conversion path is the added member on `Function.prototype` | the SAME class spelling, counter `0` |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the added member's marker rendered as the subject (today's answer),
// the class spelling answered with a counter above `0`, or the sanctioned renderings of the unmutated chains
// withdrawn by an over-refusal. **THE PROTOYPE MUTATED BY THE ATTEMPT IS RESTORED IN A `finally` AND THE
// RESTORE IS ASSERTED**, so the property layer cannot leak a conversion member into the next attempt.
test('ng_js_q12_an_added_to_primitive_on_a_shape_standard_prototype_never_renders_a_refused_value', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q12', "rows 3 and 8's depth arm: a Symbol.toPrimitive ADDED to a shape-standard prototype", 4, (attempt, rng) => {
    const ROW_3 = 'a function';
    const ROW_8 = 'a value over the walk ceiling';
    const MARKER = 'CALLER_CONTROLLED_SUBJECT_Q12';
    const deepPath = positionOf([...Array(127).fill(0)]);
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const variants = [
      { arm: 'row3', carrier: 'Function.prototype', leaf: () => function drawnSample() {} },
      { arm: 'row3', carrier: 'Object.prototype', leaf: () => function drawnSample() {} },
      { arm: 'row8', carrier: 'Object.prototype', leaf: () => ({}) },
      { arm: 'row8', carrier: 'Function.prototype', leaf: () => function drawnLeaf() {} },
    ];
    const variant = variants[rng.next().value % variants.length];
    const cls = variant.arm === 'row3' ? ROW_3 : ROW_8;
    const position = variant.arm === 'row3' ? ROOT_POSITION : deepPath;
    const target = variant.carrier === 'Function.prototype' ? Function.prototype : Object.prototype;

    let reads = 0;
    let error = null;
    let liveVerdict = null;
    try {
      Object.defineProperty(target, Symbol.toPrimitive, {
        value() { reads += 1; return MARKER; },
        configurable: true,
        writable: true,
      });
      const live = String(variant.leaf());
      if (reads === 0 || !live.includes(MARKER)) liveVerdict = `attempt ${attempt}: the added member is NOT the conversion path a rendering takes (String(leaf) answered ${JSON.stringify(live)})`;
      reads = 0;
      const value = variant.arm === 'row3' ? variant.leaf() : arrayChain(variant.leaf(), 127);
      error = refusalOf(value, ['q12']);
    } finally {
      delete target[Symbol.toPrimitive];
    }
    if (Object.hasOwn(target, Symbol.toPrimitive)) {
      return `attempt ${attempt}: ${variant.carrier} was NOT restored`;
    }
    if (liveVerdict !== null) return liveVerdict;
    const verdict = checkRefusal(error, { cls, position, subject: cls });
    if (verdict !== null) {
      return `attempt ${attempt} (${variant.arm} with the added member on ${variant.carrier}): ${verdict}`;
    }
    if (reads !== 0) return `attempt ${attempt}: the added Symbol.toPrimitive RAN on the refusal path (count ${reads})`;
    // THE CONTROLS — the three sanctioned renderings stand on the restored chains.
    const objectSubject = checkRefusal(refusalOf(arrayChain({}, 127), ['q12-c1']), {
      cls: ROW_8, position: deepPath, subject: '[object Object]',
    });
    if (objectSubject !== null) return `attempt ${attempt}: the sanctioned {} rendering: ${objectSubject}`;
    const arraySubject = checkRefusal(refusalOf(arrayChain([1, 2], 127), ['q12-c2']), {
      cls: ROW_8, position: deepPath, subject: '1,2',
    });
    if (arraySubject !== null) return `attempt ${attempt}: the sanctioned array rendering: ${arraySubject}`;
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q13` — `F-RA-13` limb `1b`: an own or ADDED `Symbol.toStringTag` ACCESSOR
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.1`'s clause of 2026-10-24 on `F-RA-13`,
// items `(1b)` and `(6)`; `§2`'s row `5` and its clause of this date on `F-RA-17`, item `(2)`;
// `test-cases.md §3`'s `JC-TC-53`):
//
// | The state | Its declared answer |
// | --- | --- |
// | row `8`'s DEPTH ARM over an object owning a `Symbol.toStringTag` ACCESSOR | row `8`'s CLASS SPELLING `a value over the walk ceiling`, the getter's counter `0` |
// | row `8`'s DEPTH ARM with the accessor ADDED to `Object.prototype` and an ordinary object leaf | the SAME class spelling, counter `0` |
// | the SAME own accessor at its OWN value position | row `5`'s CLASS SPELLING `a value carrying a Symbol-keyed own member`, the getter's counter `0` — unmoved by this limb |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the tag read rendered as the subject (`'[object <marker>]'`, today's
// answer), the class spelling answered with a counter above `0`, or row `5`'s answer moved at the own position.
test('ng_js_q13_an_own_or_added_toStringTag_accessor_never_renders_a_refused_value', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q13', "row 8's depth arm and row 5's own position: an own and an ADDED Symbol.toStringTag accessor", 4, (attempt, rng) => {
    const ROW_5 = 'a value carrying a Symbol-keyed own member';
    const ROW_8 = 'a value over the walk ceiling';
    const MARKER = 'CALLER_CONTROLLED_TAG_Q13';
    const deepPath = positionOf([...Array(127).fill(0)]);
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const variant = ['own-depth', 'added-depth', 'own-position'][rng.next().value % 3];
    const leafBody = rng.next().value % 2 === 0 ? {} : { a: 1 };

    let reads = 0;
    const tagged = (body) => Object.defineProperty(body, Symbol.toStringTag, {
      get() { reads += 1; return MARKER; },
      enumerable: true,
      configurable: true,
    });

    if (variant === 'added-depth') {
      let error = null;
      let liveVerdict = null;
      try {
        Object.defineProperty(Object.prototype, Symbol.toStringTag, {
          get() { reads += 1; return MARKER; },
          configurable: true,
        });
        const live = String({});
        if (reads === 0 || !live.includes(MARKER)) liveVerdict = `attempt ${attempt}: the added accessor is NOT the read Object.prototype.toString takes (String({}) answered ${JSON.stringify(live)})`;
        reads = 0;
        error = refusalOf(arrayChain({}, 127), ['q13']);
      } finally {
        delete Object.prototype[Symbol.toStringTag];
      }
      if (Object.hasOwn(Object.prototype, Symbol.toStringTag)) return `attempt ${attempt}: Object.prototype was NOT restored`;
      if (liveVerdict !== null) return liveVerdict;
      const verdict = checkRefusal(error, { cls: ROW_8, position: deepPath, subject: ROW_8 });
      if (verdict !== null) return `attempt ${attempt} (an ADDED @@toStringTag accessor at the depth arm): ${verdict}`;
      if (reads !== 0) return `attempt ${attempt}: the added tag getter RAN on the refusal path (count ${reads})`;
      return null;
    }

    // THE OWN ACCESSOR — at row `8`'s depth arm or at its own value position.
    const value = tagged(leafBody);
    // THE INSTRUMENT'S LIVENESS: `Object.prototype.toString` reads the tag off the value directly.
    const live = String(value);
    if (reads === 0 || !live.includes(MARKER)) {
      return `attempt ${attempt}: the own tag accessor is DEAD — String(value) answered ${JSON.stringify(live)}`;
    }
    reads = 0;
    const error = variant === 'own-depth' ? refusalOf(arrayChain(value, 127), ['q13']) : refusalOf(value, ['q13-own']);
    const cls = variant === 'own-depth' ? ROW_8 : ROW_5;
    const position = variant === 'own-depth' ? deepPath : ROOT_POSITION;
    const verdict = checkRefusal(error, { cls, position, subject: cls });
    if (verdict !== null) return `attempt ${attempt} (an OWN @@toStringTag accessor, ${variant}): ${verdict}`;
    if (reads !== 0) return `attempt ${attempt}: the own tag getter RAN on the refusal path (count ${reads})`;
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q14` — `F-RA-13` limb `1c`: the ARRAY-ELEMENT limb at row `8`'s depth arm
// =============================================================================================
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.1`'s clause of 2026-10-24 on `F-RA-13`,
// items `(1c)` and `(6)`; `§2`'s row `8`; `test-cases.md §3`'s `JC-TC-54`):
//
// | The state | Its declared answer |
// | --- | --- |
// | row `8`'s DEPTH ARM over an array with `2…3` elements drawn from: an element owning `toString`, an element whose `toString` sits on a custom prototype, an element owning `Symbol.toPrimitive`, a primitive | row `8`'s CLASS SPELLING `a value over the walk ceiling`, at the array's own `127`-segment position, EVERY element's counter `0` |
// | the same arm over an array carrying an own ACCESSOR at a drawn element index | the SAME class spelling, and the index getter never runs |
// | the CONTROL — the same depth with PRIMITIVE elements | the sanctioned rendering `'1,2'` survives |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the joined elements' conversions rendered as the subject (today's
// answer — `Array.prototype.toString` → `join` → `[[Get]]` and `ToString` per element), the class spelling
// answered with a counter above `0`, or the primitive control's `'1,2'` withdrawn.
test('ng_js_q14_array_elements_are_never_converted_at_the_depth_arms_refusal_path', { timeout: 120000 }, () => {
  runGenerator('NG-JS-Q14', "row 8's depth arm: an array whose elements carry conversion members, and its own-index accessor", 4, (attempt, rng) => {
    const ROW_8 = 'a value over the walk ceiling';
    const MARKER = 'CALLER_CONTROLLED_ELEMENT_Q14';
    const deepPath = positionOf([...Array(127).fill(0)]);
    const arrayChain = (leaf, levels) => {
      let value = leaf;
      for (let i = 0; i < levels; i += 1) value = [value];
      return value;
    };
    const count = 2 + (rng.next().value % 2);
    const counters = [];
    const element = () => {
      const kind = ['own-toString', 'proto-toString', 'own-toPrimitive', 'primitive'][rng.next().value % 4];
      if (kind === 'primitive') return { kind, value: rng.next().value % 3 };
      const counter = { kind, count: 0 };
      counters.push(counter);
      if (kind === 'own-toString') {
        return {
          kind,
          counter,
          value: { toString() { counter.count += 1; return MARKER; } },
        };
      }
      if (kind === 'proto-toString') {
        const prototype = Object.create(null);
        prototype.toString = () => {
          counter.count += 1;
          return MARKER;
        };
        return { kind, counter, value: Object.create(prototype) };
      }
      return {
        kind,
        counter,
        value: { [Symbol.toPrimitive]() { counter.count += 1; return MARKER; } },
      };
    };
    const drawn = [];
    for (let i = 0; i < count; i += 1) drawn.push(element());
    // (A) EVERY DRAWN CARRIER'S LIVENESS: a direct conversion of the element runs its own counter.
    for (const item of drawn) {
      if (item.kind === 'primitive') continue;
      const live = String(item.value);
      if (item.counter.count === 0 || !live.includes(MARKER)) {
        return `attempt ${attempt}: the ${item.kind} element instrument is DEAD — String(element) answered ${JSON.stringify(live)}`;
      }
      item.counter.count = 0;
    }
    const elements = drawn.map((item) => item.value);
    let indexReads = 0;
    const withAccessor = rng.next().value % 2 === 0;
    if (withAccessor) {
      // THE INDEX ACCESSOR IS DRAWN ABOVE the drawn length, so the array's declared elements are unmoved.
      const index = count + 1;
      Object.defineProperty(elements, index, {
        get() { indexReads += 1; return MARKER; },
        enumerable: true,
        configurable: true,
      });
      const liveJoin = String(elements);
      if (indexReads === 0 || !liveJoin.includes(MARKER)) {
        return `attempt ${attempt}: the index accessor at ${index} is DEAD — String(array) answered ${JSON.stringify(liveJoin)}`;
      }
      indexReads = 0;
      for (const item of drawn) if (item.kind !== 'primitive') item.counter.count = 0;
    }
    const error = refusalOf(arrayChain(elements, 127), ['q14']);
    const verdict = checkRefusal(error, { cls: ROW_8, position: deepPath, subject: ROW_8 });
    if (verdict !== null) {
      return `attempt ${attempt} (${count} elements: ${drawn.map((item) => item.kind).join(', ')}${withAccessor ? ', with an own index accessor' : ''}): ${verdict}`;
    }
    for (const item of drawn) {
      if (item.kind === 'primitive') continue;
      if (item.counter.count !== 0) {
        return `attempt ${attempt}: the ${item.kind} element converted on the refusal path (count ${item.counter.count})`;
      }
    }
    if (indexReads !== 0) return `attempt ${attempt}: the own index accessor RAN on the refusal path (count ${indexReads})`;
    if (error.message.includes(MARKER) || JSON.stringify(error).includes(MARKER)) {
      return `attempt ${attempt}: an element's MARKER reached the refusal object: ${JSON.stringify(error.message)}`;
    }
    // THE CONTROL — the same depth with PRIMITIVE elements renders the sanctioned `'1,2'`.
    const control = checkRefusal(refusalOf(arrayChain([1, 2], 127), ['q14-control']), {
      cls: ROW_8, position: deepPath, subject: '1,2',
    });
    if (control !== null) return `attempt ${attempt}: the primitive-element control: ${control}`;
    return null;
  });
});

// =============================================================================================
// `NG-JS-Q15` — the audit's `G(i)`: the DATA `Symbol.toStringTag` limb, at row `8`'s depth arm
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 BY THE GATE-11 FOURTH AUDIT PASS's letter `G(i)`, AND IT IS OBSERVED AND NOT PASS: it
// does NOT declare a new law — it PINS the state the law already answers, so that a silent `C-11` re-open or a
// narrowing of the tag limb cannot hold every file green.** `contract.md §2.1`'s clause of 2026-10-24 on
// `F-RA-13`, item `(1b)`, reads the tag limb as an OWN-DESCRIPTOR read of the KEY — *"`descriptor !== undefined`"*
// rather than an accessor-bit test — and item `(6)` puts that read in the render guard's three tests at the two
// conditional arms.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.1`'s clause of this date on `F-RA-13`,
// items `(1b)` and `(6)`; `§2`'s row `8`; `test-cases.md`'s `JC-TC-53` row):
//
// | The state | Its declared answer | OBSERVED at this tree |
// | --- | --- | --- |
// | the refused value carries an own **DATA** `Symbol.toStringTag` whose value is a STRING, at row `8`'s depth arm | row `8`'s CLASS SPELLING `a value over the walk ceiling`, and the tag's value in no byte of the refusal | **the class spelling, exactly** — OBSERVED |
// | the same with a **NON-STRING** data value (`42`) | the SAME class spelling: item `(1b)` reads the KEY and not the value's type | **the class spelling** — OBSERVED |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the value's own rendering (`'[object <TAG>]'`) answered as the subject —
// i.e. a limb that tests `descriptor.get !== undefined` (the ACCESSOR bit alone) and so lets the DATA member
// through. `NG-JS-Q13` drives the accessor, and only this cell drives the data member.
test('ng_js_q15_a_data_toStringTag_member_at_the_depth_arm_answers_the_class_spelling', { timeout: 120000 }, () => {
  runGenerator(
    'NG-JS-Q15',
    "row 8's depth arm: an own DATA Symbol.toStringTag member with a string value and with a non-string value",
    3,
    (attempt, rng) => {
      const ROW_8 = 'a value over the walk ceiling';
      const MARKER = 'DATA_TAG_MARKER_Q15';
      const deepPath = positionOf([...Array(127).fill(0)]);
      const arrayChain = (leaf, levels) => {
        let value = leaf;
        for (let i = 0; i < levels; i += 1) value = [value];
        return value;
      };
      // (A) THE STRING-VALUE VARIANT, WITH ITS INSTRUMENT PROVEN LIVE: the tag's own value reaches
      // `Object.prototype.toString`'s rendering, so a limb that renders the value would carry this marker.
      const tagged = { [Symbol.toStringTag]: MARKER };
      const live = String(tagged);
      if (!live.includes(MARKER)) {
        return `attempt ${attempt}: the data-tag instrument is DEAD — String(value) answered ${JSON.stringify(live)}`;
      }
      const error = refusalOf(arrayChain(tagged, 127), ['q15']);
      const verdict = checkRefusal(error, { cls: ROW_8, position: deepPath, subject: ROW_8 });
      if (verdict !== null) return `attempt ${attempt} (an own DATA tag, string value): ${verdict}`;
      if (error.message.includes(MARKER) || JSON.stringify(error).includes(MARKER)) {
        return `attempt ${attempt}: the tag VALUE reached the refusal object: ${JSON.stringify(error.message)}`;
      }
      // (B) THE NON-STRING VARIANT: the KEY is what item `(1b)` reads, so the value's type changes nothing.
      const numericTag = { [Symbol.toStringTag]: 42 };
      const numericDescriptor = Object.getOwnPropertyDescriptor(numericTag, Symbol.toStringTag);
      if (numericDescriptor === undefined || numericDescriptor.value !== 42) {
        return `attempt ${attempt}: the non-string tag instrument is DEAD — its own descriptor is ${JSON.stringify(numericDescriptor)}`;
      }
      const numericVerdict = checkRefusal(refusalOf(arrayChain(numericTag, 127), ['q15-numeric']), {
        cls: ROW_8, position: deepPath, subject: ROW_8,
      });
      if (numericVerdict !== null) return `attempt ${attempt} (an own DATA tag, non-string value): ${numericVerdict}`;
      // (C) THE CONTROL — a value with NO tag at the same arm renders its own plain spelling.
      const plainVerdict = checkRefusal(refusalOf(arrayChain({ a: rng.next().value % 3 }, 127), ['q15-control']), {
        cls: ROW_8, position: deepPath, subject: '[object Object]',
      });
      if (plainVerdict !== null) return `attempt ${attempt}: the untagged control: ${plainVerdict}`;
      return null;
    },
  );
});

// =============================================================================================
// `NG-JS-Q16` — the audit's `G(ii)`: the `Proxy`-link guard at the RENDERING arms
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 BY THE GATE-11 FOURTH AUDIT PASS's letter `G(ii)`, AND IT IS OBSERVED AND NOT PASS: the
// CLASS-DECISION guards are driven (`NG-JS-Q11`, `JC-TC-51`), and the RENDERING WALKS are not.** `contract.md
// §2`'s clause of 2026-10-24 on `F-RA-12`, item `(6)`, and `§2.1`'s clause on `F-RA-13`'s exemption: **a chain
// carrying a `Proxy` link answers "does not carry" WITHOUT ASKING IT ANYTHING** (`util.types.isProxy` reads no
// member and runs no handler), so the arm loses its class spelling's rendering and runs no trap.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2`'s clause of this date on `F-RA-12`,
// items `(2)` and `(6)`; `§2.1`'s clause of this date on `F-RA-13`; `§2`'s row `8`):
//
// | The state | Its declared answer | OBSERVED at this tree |
// | --- | --- | --- |
// | a refused value at row `8`'s depth arm whose prototype link is a `Proxy` with an HONEST handler | row `8`'s CLASS SPELLING, and EVERY handler trap counted `0` | **the class spelling, all traps `0`** — OBSERVED |
// | the same with a LYING handler (`ownKeys` reporting the standard `Object.prototype` name set, `getPrototypeOf` reporting `null`) | the SAME class spelling, every trap `0` | **the class spelling, all traps `0`** — OBSERVED |
// | the same shape on an ARRAY value (`Object.setPrototypeOf([1,2], proxy)`) | the SAME class spelling, every trap `0` | **the class spelling, all traps `0`** — OBSERVED |
// | a link that is a REVOKED `Proxy` | the SAME class spelling, and NO host error | **the class spelling, no host error** — OBSERVED |
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** any trap counted above `0` on the refusal path, or the class spelling
// replaced by the value's own rendering (`'[object Object]'`).
test('ng_js_q16_a_proxy_prototype_link_at_the_rendering_arms_answers_class_with_no_trap_run', { timeout: 120000 }, () => {
  runGenerator(
    'NG-JS-Q16',
    "row 8's depth arm: a refused value whose prototype link is a Proxy — honest, lying, an array, and revoked",
    2,
    (attempt) => {
      const ROW_8 = 'a value over the walk ceiling';
      const deepPath = positionOf([...Array(127).fill(0)]);
      const arrayChain = (leaf, levels) => {
        let value = leaf;
        for (let i = 0; i < levels; i += 1) value = [value];
        return value;
      };
      const TRAPS = ['get', 'has', 'ownKeys', 'getOwnPropertyDescriptor', 'getPrototypeOf'];
      const STANDARD_OBJECT_PROTO_NAMES = [
        'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__',
        '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__',
        'toLocaleString',
      ];
      const proxiedLink = (lying) => {
        const counts = { get: 0, has: 0, ownKeys: 0, getOwnPropertyDescriptor: 0, getPrototypeOf: 0 };
        const target = Object.create(null);
        const handler = {
          get(t, key, receiver) { counts.get += 1; return Reflect.get(t, key, receiver); },
          has(t, key) { counts.has += 1; return Reflect.has(t, key); },
          ownKeys(t) { counts.ownKeys += 1; return lying ? STANDARD_OBJECT_PROTO_NAMES.slice() : Reflect.ownKeys(t); },
          getOwnPropertyDescriptor(t, key) {
            counts.getOwnPropertyDescriptor += 1;
            return Reflect.getOwnPropertyDescriptor(t, key);
          },
          getPrototypeOf(t) { counts.getPrototypeOf += 1; return lying ? null : Reflect.getPrototypeOf(t); },
        };
        return { proxy: new Proxy(target, handler), counts };
      };
      // (A) EVERY TRAP'S LIVENESS, PROVED ON A TWIN INSTRUMENT BEFORE ANY `0` IS ASSERTED.
      const twin = proxiedLink(false);
      Object.getPrototypeOf(twin.proxy);
      Object.getOwnPropertyNames(twin.proxy);
      'a' in twin.proxy;
      void twin.proxy.a;
      Object.getOwnPropertyDescriptor(twin.proxy, 'a');
      const dead = TRAPS.filter((trap) => twin.counts[trap] === 0);
      if (dead.length > 0) return `attempt ${attempt}: the trap instruments are DEAD — {${dead.join(', ')}} never ran`;
      // (B) THE FOUR STATES, EACH ON ITS OWN FRESH INSTANCE AND EACH WITH ITS OWN COUNTERS.
      const states = [
        {
          label: 'a non-array value with an HONEST Proxy link',
          value: () => { const link = proxiedLink(false); const value = Object.create(link.proxy); value.a = 1; return { value, counts: link.counts }; },
        },
        {
          label: 'a non-array value with a LYING Proxy link',
          value: () => { const link = proxiedLink(true); const value = Object.create(link.proxy); value.a = 1; return { value, counts: link.counts }; },
        },
        {
          label: 'an ARRAY value with an honest Proxy link',
          value: () => { const link = proxiedLink(false); const value = [1, 2]; Object.setPrototypeOf(value, link.proxy); return { value, counts: link.counts }; },
        },
      ];
      for (const state of states) {
        const built = state.value();
        const error = refusalOf(arrayChain(built.value, 127), ['q16']);
        const verdict = checkRefusal(error, { cls: ROW_8, position: deepPath, subject: ROW_8 });
        if (verdict !== null) return `attempt ${attempt} (${state.label}): ${verdict}`;
        const moved = TRAPS.filter((trap) => built.counts[trap] !== 0);
        if (moved.length > 0) {
          return `attempt ${attempt} (${state.label}): the handler's traps RAN on the refusal path — ${moved.map((trap) => `${trap}:${built.counts[trap]}`).join(', ')}`;
        }
      }
      // (C) THE REVOKED LINK: no trap can even be answered, so the arm must not ask — and no host error escapes.
      const revocable = Proxy.revocable(Object.create(null), {});
      const revokedValue = Object.create(revocable.proxy);
      revokedValue.a = 1;
      revocable.revoke();
      const revokedError = refusalOf(arrayChain(revokedValue, 127), ['q16-revoked']);
      const revokedVerdict = checkRefusal(revokedError, { cls: ROW_8, position: deepPath, subject: ROW_8 });
      if (revokedVerdict !== null) return `attempt ${attempt} (a REVOKED Proxy link): ${revokedVerdict}`;
      return null;
    },
  );
});

// =============================================================================================
// `NG-JS-Q17` — the audit's `G(iii)`: the residual's remaining OVERRIDE state
// =============================================================================================
//
// **⟶ ADDED 2026-10-24 BY THE GATE-11 FOURTH AUDIT PASS's letter `G(iii)`, AND IT IS OBSERVED AND NOT PASS: it
// asserts the DECLARED LIMITATION, so that a future pass which closes `C-11` (and can distinguish an intrinsic
// from an OVERRIDDEN member that keeps the standard NAME set) FAILS THIS CELL and re-opens the clause instead of
// letting the recorded truth go stale.** `contract.md §2.1`'s clause of 2026-10-24 on `F-RA-13`, item `(4)`:
// *"no user code … runs on a refusal path, except (i) where that path lies on a prototype judged
// language-standard by SHAPE at the two conditional arms AND IS AN OVERRIDDEN `toString` or `valueOf`"* — the
// shape test is a NAME-SET test (`isStandardObjectPrototype`), so replacing a member's VALUE leaves the link
// shape-standard, the exemption stops the walk above it, and the replacement is what `String(value)` reaches.
//
// **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED** (`contract.md §2.1`'s clause of this date on `F-RA-13`,
// items `(2)`, `(3)(a)`, `(4)` and `(5)(a)`; `§2`'s row `3` and row `8`):
//
// | The state | Its declared answer | OBSERVED at this tree |
// | --- | --- | --- |
// | `Object.prototype.toString` REPLACED (the standard name set unmoved), a refused `{}` at row `8`'s depth arm | the override is the DECLARED LIMITATION: it runs | **the marker is the SUBJECT and the member ran, exactly ONCE** — OBSERVED |
// | `Array.prototype.join` REPLACED, a refused `[1, 2]` at row `8`'s depth arm | **the SUBJECT side only**: the override runs ONCE, by the subject's own rendering (`Array.prototype.toString` → `join`), and the marker is the SUBJECT — while the POSITION spells the DECLARED path (`member 0/…/0 of the write's value argument`) and the position's own join runs `0` times (`contract.md §2.1`'s clause of 2026-10-24 on `F5-4`, items `(4a)`, `(4c)` and `(4d)`) | **the marker is the SUBJECT and the RENDERING-side join ran exactly ONCE — the residual override, DECLARED, whose closing must fail this cell and re-open the clause; AND the POSITION-side join runs `0` times, the POSITION being the DECLARED spelling `member 0/0/…/0 of the write's value argument`** — the law `F5-4` declares, whose byte (arm `(x)`) is LANDED — OBSERVED, **the column RE-DERIVED 2026-10-25** (`F6-6`; this row's `OBSERVED` cell alone) |
// | `Function.prototype.toString` REPLACED, a refused function at row `3` | the override runs at the other conditional arm | **the marker is the SUBJECT and the member ran, exactly ONCE** — OBSERVED |
// | `Object.prototype.valueOf` REPLACED, a refused `{}` at row `8`'s depth arm | the override runs **where the rendering reaches it** | **it does NOT run here, and the subject stays `'[object Object]'`: a hint-STRING rendering takes `toString` first (`OrdinaryToPrimitive`), so the residual's `valueOf` member is not reachable at these two arms — a MEASURED correction for the spec pass, and no contradiction, because item `(4)(i)`'s exception is permissive** — OBSERVED |
//
// **⟶ THE TABLE'S `join` ROW IS RE-DERIVED ON 2026-10-25, ITS `OBSERVED` COLUMN AND NOTHING ELSE (`F6-6` — the
// sixth audit's stale-column finding, recorded in the tracker and NOT in the spec documents, which carry no
// `F6-6` byte; this is the pass that lands `contract.md §2.1`'s clause of 2026-10-24 on `F6-1` and `F6-2` at
// cells `JC-TC-60`/`JC-TC-61`).**
// That column still printed the state the arms have since changed — *"the position's own join ALSO ran, so the
// POSITION renders the marker where the declared spelling belongs"* — which was TRUE when it was measured and is
// NOT the tree's state any more: arm `(x)`'s byte has landed, so the position-side contribution is `0` and the
// position is the DECLARED spelling, which is exactly what this cell's own assertions below read
// (`renderingJoins === 1`, `positionJoins === 0`, and the declared `deepPath`). **NO ASSERTION MOVES WITH THIS
// EDIT, THE DECLARED COLUMN IS BYTE-IDENTICAL, AND THE THREE OTHER ROWS STAND AS FILED: a comment column is not
// an instrument, and a column that records a CLOSED path as the current state is precisely the staleness this
// cell exists to prevent.**
//
// **⟶ RE-DERIVED 2026-10-24 — THE GATE-11 FIFTH AUDIT PASS (`contract.md §2.1`'s clause of this date on
// `F5-4`, item `(4d)`; the audit's `F5-7`).** The `join` row above PINNED THE DEFECT AS THE LAW: it asserted the
// override's whole-path counter at `2` and the POSITION at `member <marker> of …`, so the legitimate repair of
// `valuePosition` — `F5-4`'s owed byte — would have FAILED THIS TRIPWIRE, and a cell that freezes a defect is
// not a tripwire. **THE CELL NOW SPLITS THE TWO CONTRIBUTIONS BY RECEIVER AND ASSERTS EACH SEPARATELY: the
// SUBJECT-side contribution is `1` (the DECLARED residual, whose closing must fail this cell and re-open the
// clause) and the POSITION-side contribution is `0` with the position the DECLARED SPELLING (the law
// `F5-4` declares and arm `(x)` owes). `contract.md §2.1` item `(4d)` records this cell's move as THE TEST
// WRITER'S, "WITH THE BYTE, NEVER BEFORE IT AND NEVER AFTER IT": the two position assertions below are RED
// until arm `(x)` lands and no other limb of this cell moves.**
//
// **WHAT FAILING LOOKS LIKE, ONE LINE:** the marker no longer the subject (a future pass closed the override), a
// counter that moved off its declared contribution (`1` rendering-side, `0` position-side), a position that is
// not the declared spelling, or a restore that did not take.
// **EVERY MUTATED INTRINSIC IS RESTORED IN A `finally`, AND THE RESTORE IS PROVED BEHAVIOURALLY BESIDE ITSELF.**
test('ng_js_q17_the_override_on_a_shape_standard_prototype_runs_and_its_marker_is_the_subject', { timeout: 120000 }, () => {
  runGenerator(
    'NG-JS-Q17',
    "the residual's OVERRIDE state at a shape-standard prototype: toString at row 8, join at the array limb, toString at row 3, and valueOf",
    2,
    (attempt) => {
      const ROW_3 = 'a function';
      const ROW_8 = 'a value over the walk ceiling';
      const MARKER = 'OVERRIDE_MARKER_Q17';
      const deepPath = positionOf([...Array(127).fill(0)]);
      const arrayChain = (leaf, levels) => {
        let value = leaf;
        for (let i = 0; i < levels; i += 1) value = [value];
        return value;
      };
      // INSTALL / DRIVE / RESTORE, with the OWN-DESCRIPTOR saved and put back verbatim.
      const withReplacedMember = (owner, key, replacement, body) => {
        const saved = Object.getOwnPropertyDescriptor(owner, key);
        try {
          Object.defineProperty(owner, key, {
            value: replacement,
            writable: saved === undefined ? true : saved.writable,
            enumerable: saved === undefined ? false : saved.enumerable,
            configurable: true,
          });
          return body();
        } finally {
          if (saved === undefined) delete owner[key];
          else Object.defineProperty(owner, key, saved);
        }
      };
      // (1) `Object.prototype.toString` — the residual's own spelling.
      let toStringRuns = 0;
      let toStringLive = null;
      const toStringError = withReplacedMember(Object.prototype, 'toString', function () {
        toStringRuns += 1;
        return MARKER;
      }, () => {
        toStringLive = String({});
        toStringRuns = 0; // the liveness read is not the refusal path's count
        return refusalOf(arrayChain({}, 127), ['q17']);
      });
      if (toStringLive !== MARKER) return `attempt ${attempt}: the toString override is DEAD — String({}) answered ${JSON.stringify(toStringLive)}`;
      if (Object.getOwnPropertyDescriptor(Object.prototype, 'toString').value !== Object.prototype.toString
        || String({}) !== '[object Object]') {
        return `attempt ${attempt}: the toString restore did NOT take — String({}) answered ${JSON.stringify(String({}))}`;
      }
      const toStringVerdict = checkRefusal(toStringError, { cls: ROW_8, position: deepPath, subject: MARKER });
      if (toStringVerdict !== null) return `attempt ${attempt} (the OVERRIDDEN Object.prototype.toString): ${toStringVerdict}`;
      if (toStringRuns !== 1) {
        return `attempt ${attempt}: the declared limitation's counter must be EXACTLY 1 on the refusal path; it was ${toStringRuns}`;
      }
      // (2) `Array.prototype.join` at the ARRAY limb — **⟶ RE-DERIVED 2026-10-24 (`F5-7`; `contract.md §2.1`'s
      // clause of this date on `F5-4`, items `(4c)` and `(4d)`): THE TWO CONTRIBUTIONS ARE SPLIT BY RECEIVER.**
      // The override is reached ONCE by the subject's own rendering — `Array.prototype.toString` calls `join`
      // with the REFUSED ARRAY as its receiver — and that one call is the DECLARED residual this cell exists to
      // guard. Until arm `(x)`'s byte lands a SECOND call runs, from `valuePosition`'s own `.join` over the
      // path, whose receiver is the mapped segment list: **that one is the DEFECT, and the position may not
      // carry it.** The subject is the marker (the residual) and the position is the DECLARED spelling.
      const renderedArray = [1, 2];
      const refusedArray = arrayChain(renderedArray, 127);
      let renderingJoins = 0;
      let positionJoins = 0;
      let joinLive = null;
      const joinError = withReplacedMember(Array.prototype, 'join', function () {
        if (this === renderedArray) renderingJoins += 1;
        else positionJoins += 1;
        return MARKER;
      }, () => {
        joinLive = String(renderedArray);
        renderingJoins = 0; // the liveness read is not the refusal path's count
        positionJoins = 0;
        return refusalOf(refusedArray, ['q17-array']);
      });
      if (joinLive !== MARKER) return `attempt ${attempt}: the join override is DEAD — String([1, 2]) answered ${JSON.stringify(joinLive)}`;
      if (String([1, 2]) !== '1,2') {
        return `attempt ${attempt}: the join restore did NOT take — String([1, 2]) answered ${JSON.stringify(String([1, 2]))}`;
      }
      const joinVerdict = checkRefusal(joinError, { cls: ROW_8, position: deepPath, subject: MARKER });
      if (joinVerdict !== null) {
        return `attempt ${attempt} (the OVERRIDDEN Array.prototype.join): ${joinVerdict} — the POSITION must be the `
          + `DECLARED spelling ${JSON.stringify(deepPath)} and may invoke nothing taken from a mutable prototype `
          + `(contract.md §2.1, item (4d), whose byte is implementation-plan.md §2 step 4's arm (x))`;
      }
      if (renderingJoins !== 1) {
        return `attempt ${attempt}: the residual override's RENDERING-side contribution must be EXACTLY 1 (the `
          + `subject's own Array.prototype.toString → join); it was ${renderingJoins} — a pass that closed the `
          + `declared override must FAIL this cell and re-open the clause, never pass here`;
      }
      if (positionJoins !== 0) {
        return `attempt ${attempt}: valuePosition invoked Array.prototype.join ${positionJoins} time(s) — the `
          + `position spelling may invoke nothing taken from a mutable prototype (contract.md §2.1, item (4c); `
          + `the owed byte is arm (x))`;
      }
      // (3) `Function.prototype.toString` at the OTHER conditional arm (row `3`).
      let functionRuns = 0;
      const sample = function sampleListener() {};
      let functionLive = null;
      const functionError = withReplacedMember(Function.prototype, 'toString', function () {
        functionRuns += 1;
        return MARKER;
      }, () => {
        functionLive = String(sample);
        functionRuns = 0; // the liveness read is not the refusal path's count
        return refusalOf(sample, ['q17-row3']);
      });
      if (functionLive !== MARKER) return `attempt ${attempt}: the Function.prototype.toString override is DEAD — String(fn) answered ${JSON.stringify(functionLive)}`;
      if (typeof Function.prototype.toString.call(sample) !== 'string' || String(sample) === MARKER) {
        return `attempt ${attempt}: the Function.prototype.toString restore did NOT take`;
      }
      const functionVerdict = checkRefusal(functionError, { cls: ROW_3, position: ROOT_POSITION, subject: MARKER });
      if (functionVerdict !== null) return `attempt ${attempt} (the OVERRIDDEN Function.prototype.toString at row 3): ${functionVerdict}`;
      if (functionRuns !== 1) {
        return `attempt ${attempt}: row 3's override counter must be EXACTLY 1; it was ${functionRuns}`;
      }
      // (4) `Object.prototype.valueOf` — MEASURED, NOT REACHED at these arms, and asserted so the record does
      // not overclaim item `(4)(i)`: a hint-STRING rendering takes `toString` first.
      let valueOfRuns = 0;
      let valueOfLive = null;
      const valueOfError = withReplacedMember(Object.prototype, 'valueOf', function () {
        valueOfRuns += 1;
        return MARKER;
      }, () => {
        // THE INSTRUMENT'S LIVENESS: a hint-NUMBER coercion reaches `valueOf` first, and it runs here.
        valueOfLive = Number({});
        valueOfRuns = 0;
        return refusalOf(arrayChain({}, 127), ['q17-valueof']);
      });
      if (!Number.isNaN(valueOfLive)) {
        return `attempt ${attempt}: the valueOf override is DEAD — Number({}) answered ${JSON.stringify(valueOfLive)} instead of the marker's NaN`;
      }
      if (String({}) !== '[object Object]' || Object.getOwnPropertyDescriptor(Object.prototype, 'valueOf').value !== Object.prototype.valueOf) {
        return `attempt ${attempt}: the valueOf restore did NOT take`;
      }
      const valueOfVerdict = checkRefusal(valueOfError, { cls: ROW_8, position: deepPath, subject: '[object Object]' });
      if (valueOfVerdict !== null) return `attempt ${attempt} (the OVERRIDDEN Object.prototype.valueOf): ${valueOfVerdict}`;
      if (valueOfRuns !== 0) {
        return `attempt ${attempt}: an overridden valueOf must NOT be reached at this arm (a hint-string rendering `
          + `takes toString first, measured); it ran ${valueOfRuns} time(s)`;
      }
      return null;
    },
  );
});
