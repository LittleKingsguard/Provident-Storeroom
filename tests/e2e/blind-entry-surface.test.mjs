// tests/e2e/blind-entry-surface.test.mjs
//
// BLIND INSTRUMENT — THE ENTRY SURFACE: the one module name, the fourteen own members, `listen`'s
// return, `StoreConfig`'s four declared keys, the seventeen-member status set and its open escape arm,
// the single failure form's shape, and what the instance must NOT have.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `bindings/js/index.d.ts`                             — the published declaration of record (primary input)
//   · `docs/specs/storeroom-js/surface.md` §2.1 · §2.4 · §2.5 · §2.9
//   · `docs/specs/storeroom-native/contract.md` §8.1      — the closed code set, its ranks and its triggers
// and, where a JS clause defers, `docs/specs/storeroom-held-listener-identity/contract.md` §2.7 item 9.
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**`, `src/**`, or any existing battery or runner
// under `tests/**` was read to author this file, and NO CELL OPENS A DOCUMENT AT RUNTIME (`D-17`): every
// expectation below is a LITERAL written here.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`. That is the point: a reader must be able to tell whether
// a cell was derived from the surface or inherited from the code.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as entry from '../../bindings/js/index.mjs';

const { storeCreate } = entry;

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

// `index.d.ts`'s `StoreInstance` member set: "THE FOURTEEN OWN MEMBERS … `10 + 1 + 1 + 2 = 14` ✓: THE TEN
// METHODS, `register`, `constraints` AND THE TWO REMOVE MEMBERS `removeListener(handle)` AND
// `removeConstraint(pair)`" (`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9).
const FOURTEEN = [
  'read',
  'readLiteral',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
  'register',
  'constraints',
  'removeListener',
  'removeConstraint',
];

// `index.d.ts`'s `StoreStatus` union, in the order it writes its literals — which is the store
// contract's own rank order: "the operative set is `17` members ranked `1`…`17`" and "NO RANK `1`…`16`
// MOVES" (`docs/specs/storeroom-native/contract.md §8.1`'s 2026-10-23 amendment).
const STATUS_RANK_ORDER = [
  'AddressMalformed', // 1
  'AddressNotFound', // 2
  'LeafHasNoDownstream', // 3
  'TierNotFound', // 4
  'OutOfDomainTier', // 5
  'ParentAnchorMonotonicityViolation', // 6
  'ContainerKindConflict', // 7
  'ReadTargetIsBranch', // 8
  'WriteParentNotLink', // 9
  'JournalOpUnknown', // 10
  'RollbackCompacted', // 11
  'ConstructionArgumentMissing', // 12
  'FilePathUnreachable', // 13
  'ValueNotAdmitted', // 14
  'FileCommitFailed', // 15
  'ConstraintListInvalid', // 16
  'ValueRefusedAtBoundary', // 17
];

// The store's four declared `cfg` keys, and the two of them the declaration marks OPTIONAL.
const REQUIRED_KEYS = ['journalLength', 'listeners'];
const OPTIONAL_KEYS = ['filePath', 'constraints'];

// ---------------------------------------------------------------------------------------------
// harness — construction and the catch, both literal
// ---------------------------------------------------------------------------------------------

/** A store constructed at the two REQUIRED keys alone. `listeners` may be EMPTY (`surface.md §2.1`). */
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

// ---------------------------------------------------------------------------------------------
// §1 — THE MODULE NAMESPACE
// ---------------------------------------------------------------------------------------------

test('entry · surface.md §2.9 item 1 (the `A127` clause) · the module namespace carries ONE own name, `storeCreate`, and no second', () => {
  // DECLARED: "THE OPERATIVE ENUMERATION IS ONE NAME — `storeCreate` — AND `A127`'s NAMESPACE ARITHMETIC
  // IS `11 → 1` ✓" (surface.md §2.9 item 1); "IT DECLARES THREE THINGS AND NOTHING ELSE … (1) the claimed
  // entry's OWN NAMED EXPORT SET — ONE NAME, `storeCreate`, AND NOTHING ELSE" (index.d.ts, item (1)).
  //
  // NOTE, RECORDED AND NOT GUESSED: the pass's brief names a surface called `storeStatus`. NO SUCH NAME
  // IS DECLARED — index.d.ts carries `StoreStatus` as a TYPE and the namespace carries one name. A
  // runtime `storeStatus` export would be a SECOND module name and this cell would go red on it, by the
  // clause cited above. Nothing here guesses that such a member should exist.
  assert.deepEqual(Object.keys(entry), ['storeCreate']);
  assert.equal(typeof storeCreate, 'function');
});

test('entry · contract.md §2.4 item 9 (the fourteen) · the instance carries EXACTLY fourteen own members, by name', () => {
  // DECLARED: `StoreInstance`'s member set is "THE FOURTEEN OWN MEMBERS … `10 + 1 + 1 + 2 = 14` ✓"
  // (index.d.ts's `StoreInstance` head; `docs/specs/storeroom-held-listener-identity/contract.md §2.7`
  // item 9, which moves the figure `12 → 14` and names every member). The count is asserted with its
  // terms: `10` methods + `register` + `constraints` + `removeListener` + `removeConstraint`.
  const instance = make();
  const own = Object.getOwnPropertyNames(instance).sort();
  assert.deepEqual(own, [...FOURTEEN].sort());
  assert.equal(FOURTEEN.length, 14); // 10 + 1 + 1 + 2 = 14 ✓
});

test('entry · surface.md §2.1 (e) item 2 · NOT ONE of the fourteen is a name of the module namespace, and `storeCreate` is not a member of its own product', () => {
  // DECLARED: "`storeCreate` ALONE IS A NAMED EXPORT … and it is NOT a member of its own product"
  // (surface.md §2.1 (e) item 2); "NEITHER `on` NOR `off` is added to the entry's named exports, because
  // both are reached through the FACTORY'S OWN PRODUCT and through nothing else" (§2.1 (b), read through
  // §2.9 item 1's `A127` clause). The same holds for every one of the fourteen: "NO member below is a
  // named export" (index.d.ts's `StoreInstance` head).
  const instance = make();
  for (const name of FOURTEEN) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(entry, name),
      false,
      `${name} stands in the module namespace as well as on the product`,
    );
  }
  assert.equal(Object.prototype.hasOwnProperty.call(instance, 'storeCreate'), false);
});

// ---------------------------------------------------------------------------------------------
// §2 — `listen`'s RETURN: THE TWO DECLARATIONS ON FILE, RECORDED BESIDE ONE ANOTHER
// ---------------------------------------------------------------------------------------------

test("entry · listen's return · index.d.ts:685 (ruling `D-22`, 2026-10-24) declares `listen(handle, addresses) -> Handle`, and held-listener contract §2.2 item 10's AS-FILED `-> undefined` is SUPERSEDED at that item by the 2026-10-25 correction clause — the cell now asserts the ONE declared reading, `Handle`", () => {
  // THE TWO DECLARED READINGS, EACH AT ITS OWN BYTES, AND THE ONE THAT GOVERNS:
  //  (i) `bindings/js/index.d.ts:685` — `listen(handle: Handle, addresses: readonly Address[]): Handle`,
  //      on the architect's ruling `D-22` ("Listen should return the handle on success … Discard the noop
  //      prefix"): "`listen` ANSWERS THE HANDLE IT WATCHES UNDER ON SUCCESS — the caller's own spelling,
  //      returned as THE IDENTITY THE STORE HOLDS FOR THAT ENTRY"; its clause names the ground it
  //      overrules by name: "the ground this block states above — *'returning the supplied handle would
  //      be a second spelling of the caller's own datum'* — is OVERRULED BY NAME".
  //  (ii) `docs/specs/storeroom-held-listener-identity/contract.md §2.2` item 10's AS-FILED text —
  //      "`listen(handle, addresses) -> undefined`. This is a DECLARED CHANGE of the return shape
  //      (`Handle` → `undefined`)", whose priced `alt` was "RETURN THE SUPPLIED HANDLE".
  //
  // THIS CELL WAS RED IN THE PASS THAT MET IT AND IS GREEN NOW, AND IT IS GREEN BECAUSE THE DOCUMENT
  // MOVED: reading (ii) was corrected on 2026-10-25 by a PURE INSERTION at its own item — "THE RETURN
  // SHAPE MOVES `undefined → Handle`, `alt` (a) IS TAKEN, AND THIS ITEM IS READ THROUGH `D-22`", with
  // the widening's one consumer and the declaration of record's agreement both printed beside it. The
  // two sites now agree, so this cell asserts the SINGLE declared reading and a third answer is still a
  // finding. The build was not changed and no byte of it was read.
  const instance = make();
  instance.write(['a'], 'mem', {}); // the parent the write's own resolution rule requires
  const handle = 'entry-listen-handle';
  const returned = instance.listen(handle, [['a']]);
  // THE SUCCESS RETURN IS THE HANDLE — the caller's own spelling, returned as THE IDENTITY.
  assert.equal(returned, handle);

  // AND the return carries an entry that WATCHES: an identity that answers a handle nobody can trigger
  // is not a success signal.
  const fired = [];
  assert.equal(instance.register(handle, (...args) => fired.push(args)), undefined);
  instance.write(['a', 'b'], 'mem', 1);
  assert.deepEqual(fired, [[['a', 'b']]]);
});

// ---------------------------------------------------------------------------------------------
// §3 — `StoreConfig`'S FOUR DECLARED KEYS
// ---------------------------------------------------------------------------------------------

test('entry · surface.md §2.1 (cfg block, amended 2026-10-15) · the config carries FOUR declared keys, and the two OPTIONAL ones may both be ABSENT', () => {
  // DECLARED: "THE FOUR DECLARED KEYS ARE `filePath` · `journalLength` · `listeners` · `constraints` —
  // `4` — and the package still adds NO DEFAULT, NO RENAME and NO FIFTH KEY"; "`constraints` ALONE IS
  // OPTIONAL AMONG THE FOUR: absent, it is IN DOMAIN and no list is declared"; and the `cfg` block's row
  // "`filePath: string | absent, // PAR-JS-2 — absent is IN DOMAIN (the register is created at mem)".
  // index.d.ts's own key set is the same four: `journalLength` and `listeners` required, `filePath?` and
  // `constraints?` optional.
  //
  // THE OBSERVABLE: a call spelling the two required keys and NEITHER optional key CONSTRUCTS.
  const bare = storeCreate({ journalLength: 8, listeners: [] });
  assert.equal(Object.getOwnPropertyNames(bare).length, 14);

  // AND the two optional keys are each admitted when SUPPLIED — `filePath`'s domain is a path the
  // process may write (`native contract.md §7.1`'s reachability arm), so the directory is a fresh one.
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-entry-'));
  const withFilePath = storeCreate({
    journalLength: 8,
    listeners: [],
    filePath: join(directory, 'store.json'),
  });
  assert.equal(typeof withFilePath.write, 'function');
  assert.equal(OPTIONAL_KEYS.length, 2);
  assert.equal(REQUIRED_KEYS.length, 2);
});

test('entry · index.d.ts `StoreConfig.listeners` · an ABSENT `listeners` is the one absence the construction does not admit, and it answers the store\'s `AddressMalformed`', () => {
  // DECLARED: "AND THE KEY IS REQUIRED, NOT OPTIONAL: an ABSENT `listeners` is the ONE absence the
  // construction does not admit and answers `AddressMalformed` for, so `listeners?` — the shipped
  // spelling — invited a call that can never construct" (index.d.ts, `StoreConfig.listeners`). Read with
  // `surface.md §2.1`'s `cfg` block: "`listeners: { address, handle }[], // PAR-JS-4 — REQUIRED, may be
  // EMPTY, duplicates KEPT`".
  const caught = catchIt(() => storeCreate({ journalLength: 8 }));
  assert.equal(caught.status, 'AddressMalformed');
});

test('entry · native contract.md §8.1 #12 (and its 2026-10-11 reconciliation clause) · an ABSENT `journalLength` answers `ConstructionArgumentMissing`, and NO instance is returned', () => {
  // DECLARED, THE OPERATIVE READING: "`ConstructionArgumentMissing` is produced ONLY by the ABSENCE of
  // `cfg.journalLength`" (§8.1 #12's reconciliation clause of 2026-10-11), delivered "before any instance
  // exists".
  //
  // AND THE SUPERSEDED READING IS RECORDED, NOT SMOOTHED: §8.1 #1's as-filed trigger column still lists
  // "`storeCreate` with `cfg.filePath` or `cfg.journalLength` absent" as `AddressMalformed`. The two
  // rows conflict at this argument, and the reconciliation clause is the one that declares #12
  // OPERATIVE ("the member's trigger column, read for `cfg.filePath`, is superseded by the amendment").
  // This cell takes the operative reading; a build answering #1 would be a finding of that conflict and
  // would turn this cell red rather than be re-spelled away.
  const caught = catchIt(() => storeCreate({ listeners: [] }));
  assert.equal(caught.status, 'ConstructionArgumentMissing');
});

// ---------------------------------------------------------------------------------------------
// §4 — THE STATUS SET: SEVENTEEN LITERALS, THE RANK ORDER, AND THE OPEN ESCAPE ARM
// ---------------------------------------------------------------------------------------------

test("entry · native contract.md §8.1 (its 2026-10-23 amendment, `A148` Q3, and its 2026-10-25 correction clause at the heading) · the closed set reads SEVENTEEN members ranked `1`…`17`, and the declaration's literal list agrees with the rank table member for member", () => {
  // THE TWO READINGS, BOTH ON FILE, RECORDED BESIDE ONE ANOTHER AND NEITHER CHOSEN SILENTLY:
  //  (a) §8.1's HEADING: "THE CLOSED CODE SET — `16` members, each with its trigger", which "stands
  //      byte-for-byte as the pre-amendment heading";
  //  (b) that section's operative amendment: "the operative set is `17` members ranked `1`…`17` with the
  //      arithmetic `11 + 2 + 1 + 1 + 1 + 1 = 17` ✓", `ValueRefusedAtBoundary` appended at rank `17`,
  //      and "NO RANK `1`…`16` MOVES".
  //  (c) THE HEADING'S OWN SITE, AMENDED 2026-10-25 on this pass's evidence: a PURE INSERTION at §8.1's
  //      heading reads the as-filed `16` as `17` FROM 2026-10-23, names the superseded reading, and
  //      prints the two other sites that carried the same figure (`§1.4`'s `CODES`-class sweep clause and
  //      the `A148` Q3 amendment) so the three agree at `17` instead of two of them reading `16`.
  // index.d.ts's `StoreStatus` writes seventeen literals IN §8.1's RANK ORDER, before the escape arm —
  // "`ValueRefusedAtBoundary` is written among the literals at rank `17`, LAST of the seventeen and
  // BEFORE the escape". SO THE DECLARATION, THE STORE'S OPERATIVE TABLE AND THE HEADING'S CORRECTED
  // READING ALL AGREE AT `17`; the disagreement this cell first recorded was INSIDE the store's own
  // contract — the heading's `16` against the amendment's `17` — and it is resolved by the DOCUMENT
  // moving, not by the expectation: the assertions below never changed.
  assert.equal(STATUS_RANK_ORDER.length, 17);
  assert.equal(new Set(STATUS_RANK_ORDER).size, 17, 'the seventeen literals are distinct');
  // The two ends of the rank order, which are the two the declaration singles out by name: rank `1` is
  // the construction's own argument code and rank `17` is the crossing's boundary code.
  assert.equal(STATUS_RANK_ORDER[0], 'AddressMalformed');
  assert.equal(STATUS_RANK_ORDER[15], 'ConstraintListInvalid'); // rank 16
  assert.equal(STATUS_RANK_ORDER[16], 'ValueRefusedAtBoundary'); // rank 17
  // `ValueNotAdmitted` KEEPS rank 14 and is not a rename of rank 17 — "a pass that reads rank `17` as a
  // RENAME of rank `14` has destroyed a member".
  assert.equal(STATUS_RANK_ORDER[13], 'ValueNotAdmitted');
});

test('entry · surface.md §2.5 (its 2026-10-23 amendment) · a store-produced refusal carries a member of the seventeen VERBATIM: rank `1` at a malformed address and rank `17` at a boundary-refused value', () => {
  // DECLARED: "`status` is the store's own member token VERBATIM — one of the store's closed `16`
  // members, as a JS `string`, never an index, never a lowercased or prefixed variant and never a
  // package-minted code" (§2.5 item 1), read through its 2026-10-23 clause: "the sixteen outside value
  // classes take THIS section's one form with `status: 'ValueRefusedAtBoundary'`, the store's rank-`17`
  // member".
  const instance = make();

  // rank 1 — "a segment outside `§1.5`'s domain" (§8.1 #1): `-1` is outside the segment domain, which is
  // "a string key or a non-negative integer a `u64` can carry exactly" (index.d.ts's `Address`).
  const malformed = catchIt(() => instance.read(['a', -1], 'mem'));
  assert.equal(malformed.status, 'AddressMalformed');
  assert.ok(STATUS_RANK_ORDER.includes(malformed.status));

  // rank 17 — a FUNCTION is outside the crossing's admitted value tree ("string, boolean, finite number,
  // dense genuine array, plain object"), so the package's own walk refuses it BEFORE any store verb.
  const refused = catchIt(() => instance.write(['a'], 'mem', () => 1));
  assert.equal(refused.status, 'ValueRefusedAtBoundary');
  assert.ok(STATUS_RANK_ORDER.includes(refused.status));
});

test("entry · index.d.ts's `(string & {})` escape arm · the form's `status` is a STRING on the constraint-check arm, and no clause of this surface names the member — the escape arm is what keeps such a value typeable", () => {
  // DECLARED: "AND AN UNKNOWN STATUS IS STILL TYPED — THE ESCAPE IS LOAD-BEARING, NOT A LOOSENESS … The
  // `(string & {})` arm is what keeps a member the store has added typeable in an installed `0.1.0`, and
  // its absence would be a finding rather than a strictness" (index.d.ts's `StoreStatus`).
  //
  // AND THE REASON THIS CELL ASSERTS FORM ONLY, AT ITS OWN CLAUSE: on the arm where the KERNEL's own act
  // produced the failure "THE FAIL ARM'S `status` MEMBER IS ***DELIBERATELY UNNAMED*** AT THIS SURFACE,
  // AND THE REASON IS RECORDED HERE SO NO DRIVE ASSERTS A MEMBER THIS DIRECTORY DOES NOT DECLARE … on
  // the constraint-check sub-arm A DRIVE MAY NAME NONE, AND A CELL THAT NAMES ONE IS CLAIMING A VALUE
  // NO CLAUSE OF THIS DIRECTORY DECLARES" (surface.md §2.12 item 3). So: a string, and no membership
  // claim either way — a value outside the seventeen is exactly what the escape arm exists for.
  let refuse = false;
  const instance = make({
    constraints: [{ address: ['esc'], id: 'esc-1', constraint: () => !refuse }],
  });
  refuse = true;
  const caught = catchIt(() => instance.write(['esc'], 'mem', 1));
  assert.equal(typeof caught.status, 'string');
  assert.ok(caught.status.length > 0);
  // OWED (recorded, not guessed): the escape arm itself is a TYPE-level property with no runtime
  // observable — no declared member enumerates the set, and no arm lets a drive force a status the
  // store has not minted. Nothing below asserts one.
});

// ---------------------------------------------------------------------------------------------
// §5 — THE SINGLE FAILURE FORM
// ---------------------------------------------------------------------------------------------

test('entry · surface.md §2.5 items 1–4 and 9 · the failure form is ONE thrown plain object carrying exactly the THREE members `status`, `message` and `log`, with `log` an ordinary own enumerable data member', () => {
  // DECLARED: "A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY
  // ONE SUCH FORM" (§2.5's opening), read through its 2026-10-16 clause on the architect's ruling
  // *"Bubble the message log to the client on failure, override any clauses that forbid this."*:
  // "THE FAILURE THAT CROSSES THIS SURFACE IS A THROWN PLAIN OBJECT OF EXACTLY THREE MEMBERS,
  // `{status, message, log}`"; and item 9: "`log` stands on the thrown object as an ORDINARY OWN
  // ENUMERABLE DATA MEMBER … not `Object.defineProperty`, not a getter, not on a prototype and not behind
  // a `Symbol` … a failure whose `log` is not an array is a FINDING at the site that produced it."
  //
  // THIS CELL ASSERTS THE MEMBER SET AND THE DESCRIPTOR, WHICH IS WHAT ITEM 9 DECLARES AS ITS SUBSTANCE.
  // The ORDER in which the clause prints those keys is a separate cell below, so a disagreement about it
  // cannot hide inside this one.
  const instance = make();
  const caught = catchIt(() => instance.read(['nowhere'], 'mem'));

  assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status']);
  assert.equal(Object.keys(caught).length, 3);

  // "`log` IS AN ORDINARY OWN ENUMERABLE DATA MEMBER" — an own data property, enumerable, not a getter.
  const logDescriptor = Object.getOwnPropertyDescriptor(caught, 'log');
  assert.ok(logDescriptor, '`log` is not an own member');
  assert.equal(logDescriptor.enumerable, true);
  assert.equal('get' in logDescriptor, false);
  for (const member of ['status', 'message', 'log']) {
    assert.equal(Object.getOwnPropertyDescriptor(caught, member).enumerable, true);
  }

  // item 3 — "the object thrown is a plain object whose prototype is the caller realm's
  // `Object.prototype` … never an `Error` subclass", never a `Promise` rejection.
  assert.equal(Object.getPrototypeOf(caught), Object.prototype);
  assert.equal(caught instanceof Error, false);

  assert.equal(typeof caught.status, 'string');
  assert.equal(typeof caught.message, 'string');
  assert.ok(Array.isArray(caught.log), '`log` is not an array');

  // item 4 — "`[]` IS ITS DECLARED VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT ALL … the construction's
  // own refusals (`cfg`-side), a `read`/`readLiteral`/`delete`/`rollback` store refusal with no attempt
  // live, `a.register`'s `TypeError`, and the three constraint methods' `TypeError` all carry `log: []`".
  // A `read` is not routed through the kernel, so this arm has no attempt.
  assert.deepEqual(caught.log, []);
});

test("entry · surface.md §2.5 item 9 (as corrected 2026-10-25) · THE CLAUSE'S OWN PRINT — `Object.keys(caught)` reads exactly `[\"status\",\"message\",\"log\"]`, the object literal's own source order — HELD AGAINST THE BUILD, WHICH ANSWERS THAT SAME ORDER", () => {
  // THE DECLARATION, AT ITS OWN BYTES, AND ITS CORRECTION — both recorded here because this cell is
  // the one that measured the disagreement:
  //   (a) THE SUPERSEDED READING, as this cell first met it: "**`log` IS AN ORDINARY OWN ENUMERABLE
  //       DATA MEMBER OF THAT SAME PLAIN OBJECT** (item 9): *"written with an object literal, not
  //       `Object.defineProperty`, not a getter, not on a prototype and not behind a `Symbol`"* — so
  //       `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on
  //       EVERY arm." (`surface.md` §2.5 item 9; the same sentence at index.d.ts's `StoreRefusal`.)
  //   (b) THE OPERATIVE READING, LANDED AT THAT ITEM BY THE 2026-10-25 CORRECTION CLAUSE WRITTEN ON
  //       THIS PASS'S EVIDENCE: "**THE ORDER THIS ITEM PRINTS IS SUPERSEDED, AND `Object.keys(caught)`
  //       READS `["status","message","log"]` — THE OBJECT LITERAL'S OWN SOURCE ORDER, which is the
  //       order the form is spelled in at EVERY OTHER CELL OF THIS SECTION.**" Its ground is item 8's
  //       own words, *"the set they must re-derive TO is `{log, message, status}`, sorted ascending,
  //       length `3`"* — a sorted SET spelling, which the superseded sentence carried into an
  //       `Object.keys` print where an object literal answers INSERTION ORDER.
  //
  // SO THIS CELL WAS RED AND IS NOW GREEN, AND IT IS GREEN BECAUSE THE DOCUMENT MOVED AND NOT THE
  // EXPECTATION: the expectation below is the corrected clause's own print, transcribed after the
  // correction landed. The build was not changed and no byte of it was read.
  const instance = make();
  const caught = catchIt(() => instance.read(['nowhere'], 'mem'));
  assert.deepEqual(Object.keys(caught), ['status', 'message', 'log']);
});

test('entry · surface.md §2.5 item 4 · the construction\'s own refusals carry the same flat three-member form, so `log` is never absent and never `null`', () => {
  // DECLARED: "The three-member member set is therefore FLAT ACROSS ARMS and not conditional: the
  // construction's own refusals (`cfg`-side) … all carry `log: []` — the EMPTY ARRAY, never an absent
  // member, never `null`, and never a placeholder entry".
  const caught = catchIt(() => storeCreate({ journalLength: 8 }));
  assert.deepEqual(Object.keys(caught).sort(), ['log', 'message', 'status']);
  assert.deepEqual(caught.log, []);
});

// ---------------------------------------------------------------------------------------------
// §6 — WHAT THE INSTANCE MUST **NOT** HAVE
// ---------------------------------------------------------------------------------------------

test('entry · surface.md §2.1 (e) item 1 and `A74` · NOT ONE of the fourteen is a RELEASE VERB: no `dispose`, no `close`, no finalizer, and the state is released with the instance and by nothing else', () => {
  // DECLARED: "THE STATE IS PRIVATE AND NONE OF THE TWELVE IS A RELEASE VERB (`surface.md §2.1` (e) item
  // 1; `A74`): the instance's own state is released with the instance and by nothing else — no
  // `dispose()`, no `close()` and no finalizer is declared here", and, at the fourteen-member figure,
  // "the two remove members remove a LISTENER and a CONSTRAINT PAIR, never the instance's own state,
  // and no `dispose()`, `close()` or finalizer stands beside them" (index.d.ts's `StoreInstance` head).
  const instance = make();
  for (const forbidden of ['dispose', 'close', 'destroy', 'finalize', 'free', 'release', 'shutdown']) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(instance, forbidden),
      false,
      `${forbidden} stands on the product`,
    );
  }
  // A finalizer would have to be reachable by its well-known symbol, which no member-name sweep sees.
  assert.equal(Object.prototype.hasOwnProperty.call(instance, Symbol.dispose), false);
  assert.equal(Object.prototype.hasOwnProperty.call(instance, Symbol.asyncDispose), false);
});

test('entry · surface.md §2.1 (e) item 1 · the product\'s OWN PROPERTY SET IS METHODS ONLY: no own member is store data, a record, a map, a tier, an address, a handle or a commit', () => {
  // DECLARED: "`storeCreate(cfg)` RETURNS AN INTERFACE OBJECT THAT CARRIES THE SURFACE FUNCTIONS AS OWN
  // MEMBERS — METHODS — AND THE STORE'S STATE IS HELD PRIVATELY: no own property of the product is store
  // data, a record, a map, a tier, an address, a handle or a commit"; and, at the operative figure, "the
  // product's OWN PROPERTY SET IS METHODS ONLY … and the opacity sentence is satisfied BY CONSTRUCTION
  // with no data member".
  const instance = make();
  const names = Object.getOwnPropertyNames(instance);
  assert.equal(names.length, 14);
  for (const name of names) {
    const descriptor = Object.getOwnPropertyDescriptor(instance, name);
    assert.equal(typeof descriptor.value, 'function', `${name} is an own member and is not a method`);
  }
  // OWED (recorded, not guessed): whether that sentence also reaches an own SYMBOL-KEYED property is not
  // decided by any clause read for this cell. The declaration's own censuses are `Object.keys` and
  // `Object.getOwnPropertyNames`, and the contract ITSELF relies on symbol-keyed own properties being
  // invisible to both (`A117` (D6): "a symbol-keyed own property is invisible to both, so `CommitRecord`
  // keeps its declared FOUR members"). NO CELL HERE ASSERTS AGAINST A SYMBOL-KEYED MEMBER EITHER WAY.
});
