// tests/e2e/blind-listener-surface.test.mjs
//
// BLIND INSTRUMENT — THE LISTENER SURFACE: the caller-spelled handle, the address position as a SET,
// set-assignment rather than union, `unlisten`'s no-op success outside the domain, `register`'s
// replacement rule, the triggered set's prefix membership, the invocation's ONE argument, the cross-kind
// rule, and the handle's non-survival across a restart.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `bindings/js/index.d.ts` — `Handle`, `Listener`, `TriggerPair`, `WriteRecord`, the `listen`/`unlisten`/
//     `register` members (primary input)
//   · `docs/specs/storeroom-held-listener-identity/contract.md` §2.1 · §2.2 · §2.4 · §2.5 · §2.7 · §3 · §4
//   · `docs/specs/storeroom-js/surface.md` §2.3 · §2.4 · §2.7
//   · `docs/specs/storeroom-native/contract.md` §6.5 (the watched-address selection rule) · §7.2
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**`, `src/**`, or any existing battery or runner
// under `tests/**` was read to author this file, and NO CELL OPENS A DOCUMENT AT RUNTIME (`D-17`).

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
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

/** The `triggered` pairs of a returned record, as handles — the record's member set is `WriteRecord`'s. */
const triggeredHandles = (record) => record.triggered.map((pair) => pair.handle).sort();

// ---------------------------------------------------------------------------------------------
// §1 — THE CALLER-SPELLED HANDLE
// ---------------------------------------------------------------------------------------------

test('listener · held-listener contract.md §2.1 item 1 · the handle is CALLER-SPELLED: the string the caller passes is the string the record carries, because "nothing mints it"', () => {
  // DECLARED: "A handle IS a `string`. The caller spells it, holds it and passes it back; nothing mints
  // it. No counter, no UUID, no scalar and no skip loop exists" (§2.1 item 1); `index.d.ts`'s `Handle`:
  // "THE CALLER SPELLS IT, HOLDS IT AND PASSES IT BACK; NOTHING MINTS IT. The value the store reports in
  // a trigger pair and the value the caller holds ARE ONE VALUE".
  const instance = make();
  instance.write(['l1'], 'mem', {}); // the parent the write's own resolution rule requires (rank `2`)
  const handle = 'caller-spelled-handle';
  instance.listen(handle, [['l1']]);
  instance.register(handle, () => {});
  const record = instance.write(['l1', 'x'], 'mem', 1);

  assert.deepEqual(triggeredHandles(record), [handle]);
  assert.equal(typeof record.triggered[0].handle, 'string');
});

test('listener · surface.md §2.4 item 5 (b) · `register` answers `undefined` on every success, including a REPLACEMENT', () => {
  // DECLARED: "The return is `undefined` on every success, including on a REPLACEMENT" (`surface.md`
  // §2.4 item 5 (b)); `index.d.ts`'s `register(handle: Handle, listener: Listener): void`.
  const instance = make();
  instance.listen('register-h', [['g1']]);
  assert.equal(instance.register('register-h', () => {}), undefined);
  assert.equal(instance.register('register-h', () => {}), undefined);
});

// ---------------------------------------------------------------------------------------------
// §2 — THE ADDRESS POSITION AS A SET
// ---------------------------------------------------------------------------------------------

test('listener · held-listener contract.md §2.2 item 2 · position 2 is a SET of addresses: one handle at two addresses watches BOTH, and an address outside the set triggers nothing', () => {
  // DECLARED: "`listen(handle, addresses)` — arity `2`, position `1` a `string` in `HL-1`'s domain,
  // position `2` a SET of addresses"; "`addresses` is an ARRAY of addresses, each in the store's own
  // address domain; THE EMPTY ARRAY is IN the domain; a SINGLE address supplied as a bare array-of-
  // segments is NOT — the position is a set and a segment list is a different shape" (§2.2 item 2).
  const instance = make();
  for (const address of [['s1'], ['s2'], ['s3']]) instance.write(address, 'mem', {});
  instance.listen('set-handle', [['s1'], ['s2']]);
  const fired = [];
  instance.register('set-handle', (...args) => fired.push(args[0]));

  instance.write(['s1', 'x'], 'mem', 1); // ['s1'] is a prefix of ['s1','x']
  instance.write(['s2', 'y'], 'mem', 1); // ['s2'] is a prefix of ['s2','y']
  instance.write(['s3', 'z'], 'mem', 1); // ['s3'] is in no member's prefix set
  assert.deepEqual(fired, [
    ['s1', 'x'],
    ['s2', 'y'],
  ]);

  // AND the EMPTY ARRAY is in the position's domain: it names a set with no member, so it watches
  // nothing and is not a refusal.
  assert.doesNotThrow(() => instance.listen('empty-set-handle', []));
});

test('listener · held-listener contract.md §2.2 item 3 (ruling `(R1)`) · `listen(h, S2)` after `listen(h, S1)` is SET-ASSIGNMENT, not union: `S1` is purged wholesale', () => {
  // DECLARED: "`listen(h, S2)` after `listen(h, S1)` DESTROYS `S1` WHOLLY AND INSTALLS `S2`. A caller
  // cannot narrow a live handle's standing by omitting an address it previously named; the handle's
  // standing is ALWAYS the last act's set, never cumulative" (§2.2 item 3; `P: docs/pending.md · (R1)`,
  // verbatim: *"S1 gets purged wholesale, yes"*).
  //
  // THE RE-`register` IS NOT PART OF THIS CELL'S SUBJECT — it is `§2.2` item 5 (a)'s declared consequence
  // that a `listen` writes the entry with `off` set, which the next cell drives on its own. It is called
  // here so that the ONLY difference between the two arms is the SET.
  //
  // THE OBSERVABLE IS THE UNION'S ABSENCE: if the standing set were `S1 ∪ S2`, the first write would fire.
  const instance = make();
  instance.write(['a1'], 'mem', {});
  instance.write(['a2'], 'mem', {});
  instance.listen('assign-handle', [['a1']]);
  const fired = [];
  instance.register('assign-handle', (...args) => fired.push(args[0]));
  instance.listen('assign-handle', [['a2']]);
  instance.register('assign-handle', (...args) => fired.push(args[0]));

  instance.write(['a1', 'x'], 'mem', 1); // nothing of S1 survives
  instance.write(['a2', 'y'], 'mem', 1);
  assert.deepEqual(fired, [['a2', 'y']]);
});

test('listener · held-listener contract.md §2.2 item 5 (a)–(b) · "`listen(handle, addresses)` WRITES THE ENTRY WITH `off` SET — the reservation" and "`register(handle, listener)` CLEARS `off` AND INSTALLS THE FUNCTION": a repeat `listen` DISARMS the handle until it is registered again', () => {
  // DECLARED: "**THE THREE STATES AND THE ONE TRANSITION OF THE ENTRY.** **(a) `listen(handle,
  // addresses)` WRITES THE ENTRY WITH `off` SET** — the reservation; **(b) `register(handle, listener)`
  // CLEARS `off` AND INSTALLS THE FUNCTION**; **(c) `removeListener(handle)` REMOVES THE ENTRY WHOLE" —
  // and, of the repeat set: "`listen(h, S1)` then `listen(h, S1)` IS IDEMPOTENT ONLY IN EFFECT — purge
  // then reinstall the same set — and never by a fast path" (§2.2 items 3 and 5).
  const instance = make();
  instance.write(['res'], 'mem', {});
  instance.listen('reserve-handle', [['res']]);
  const fired = [];
  instance.register('reserve-handle', (...args) => fired.push(args[0]));

  instance.write(['res', 'x'], 'mem', 1); // ARMED by (b)
  assert.deepEqual(fired, [['res', 'x']]);

  // A repeat `listen` over the SAME set re-writes the entry with `off` set — the reservation again, and
  // NOT a fast path ("never by a fast path"), so the function no longer fires.
  instance.listen('reserve-handle', [['res']]);
  instance.write(['res', 'y'], 'mem', 1);
  assert.deepEqual(fired, [['res', 'x']], 'the reservation stood armed without a `register`');

  // (b) again: `register` clears `off`.
  instance.register('reserve-handle', (...args) => fired.push(args[0]));
  instance.write(['res', 'z'], 'mem', 1);
  assert.deepEqual(fired, [
    ['res', 'x'],
    ['res', 'z'],
  ]);
});

// ---------------------------------------------------------------------------------------------
// §3 — `unlisten`: THE NO-OP SUCCESS SET, AND THE TWO DISPOSITIONS
// ---------------------------------------------------------------------------------------------

test('listener · surface.md §2.3 item 4 and held-listener contract.md §4 `F-3` · `unlisten` over EVERY value outside the domain is a NO-OP SUCCESS answering `undefined`, and NO OTHER REGISTRATION IS REMOVED', () => {
  // DECLARED: "`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS. A value a foreign
  // instance minted, a value a prior session minted, a value the store never minted at all (fabricated),
  // a blank token and a non-opaque value are EACH a no-op success at `unlisten`: no code is produced and
  // NO OTHER REGISTRATION IS REMOVED" (`surface.md` §2.3 item 4). The four `F-3` rows add `null` and an
  // ABSENT argument to that set, each "NO THROW — a no-op success returning `undefined`"
  // (`docs/specs/storeroom-held-listener-identity/contract.md §4`).
  const instance = make();
  instance.write(['k1'], 'mem', {});
  instance.listen('keeper-handle', [['k1']]);
  const fired = [];
  instance.register('keeper-handle', (...args) => fired.push(args[0]));

  for (const outside of ['fabricated-never-minted', '', null, undefined, 42, {}, []]) {
    assert.equal(
      instance.unlisten(outside),
      undefined,
      `unlisten(${String(outside)}) is not a no-op success`,
    );
  }

  // "NO OTHER REGISTRATION IS REMOVED": the untouched handle still fires.
  instance.write(['k1', 'x'], 'mem', 1);
  assert.deepEqual(fired, [['k1', 'x']]);
});

// ---------------------------------------------------------------------------------------------
// §4 — `register`'s REPLACEMENT RULE
// ---------------------------------------------------------------------------------------------

test('listener · surface.md §2.4 rule 2 · a SECOND registration for the same handle REPLACES the first — "one handle, one function", and the replaced function is dropped without notice', () => {
  // DECLARED: "A SECOND REGISTRATION FOR THE SAME HANDLE REPLACES THE FIRST. One handle, one function —
  // the registry is NOT a fan-out, and the replaced function is dropped without notice" (`surface.md`
  // §2.4 rule 2), read through item 6 (e): "the id→function map holds AT MOST ONE function per id, so a
  // replacement CHANGES THE MATCHED FUNCTION AND NOT THE IDENTITY".
  const instance = make();
  instance.write(['r1'], 'mem', {});
  instance.listen('replace-handle', [['r1']]);
  const replaced = [];
  const replacement = [];
  instance.register('replace-handle', () => replaced.push('replaced'));
  instance.register('replace-handle', () => replacement.push('replacement'));

  instance.write(['r1', 'x'], 'mem', 1);
  assert.equal(replaced.length, 0, 'the replaced function was invoked');
  assert.equal(replacement.length, 1, 'the replacement was not invoked exactly once');
});

test('listener · surface.md §2.4 rule 1 and item 6 (c) · a handle the registry holds no function for fires NOTHING: its pair stands in `triggered`, no invocation follows, and a registered neighbour is unaffected', () => {
  // DECLARED: "AN UNREGISTERED HANDLE FIRES NOTHING, SILENTLY. A handle returned in a `triggered` list
  // with no registered function invokes nothing and reports nothing — no code, no warning, no log"
  // (§2.4 rule 1), and item 6 (c): "the absence of a call, the absence of any output and the absence of
  // an exception are each DECLARED OBSERVABLES of that state and each may be asserted".
  const instance = make();
  instance.write(['q1'], 'mem', {});
  instance.listen('silent-handle', [['q1']]); // never registered with a function
  instance.listen('noisy-handle', [['q1']]); // the SAME address, a second identity
  const fired = [];
  instance.register('noisy-handle', (...args) => fired.push(args[0]));

  let record;
  assert.doesNotThrow(() => {
    record = instance.write(['q1', 'x'], 'mem', 1);
  });

  // The silent identity IS in the returned set ("a handle returned in a `triggered` list with no
  // registered function") — so this arm is not vacuous: the identity stands and nothing was invoked.
  assert.ok(triggeredHandles(record).includes('silent-handle'));
  assert.deepEqual(fired, [['q1', 'x']]); // exactly ONE invocation, and it is the registered neighbour's
});

// ---------------------------------------------------------------------------------------------
// §5 — THE TRIGGERED SET'S MEMBERSHIP RULE, AND THE INVOCATION'S ONE ARGUMENT
// ---------------------------------------------------------------------------------------------

test("listener · surface.md §2.3 item 5 and native contract.md §6.5 item 3 · a handle appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the triggering address", () => {
  // DECLARED: "THE HANDLE'S PRESENCE IN A TRIGGERED SET IS DECIDED BY ADDRESS AND BY NOTHING ELSE: a
  // handle appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the
  // triggering address" (`surface.md` §2.3 item 5, citing the store's own selection rule).
  //
  // ARM (i) — TWO PREFIXES OF ONE ADDRESS BOTH STAND.
  const instance = make();
  instance.write(['p'], 'mem', { q: { r: 0 } }); // the subtree the write's resolution rule requires
  instance.listen('shallow-handle', [['p']]);
  instance.listen('nested-handle', [['p', 'q']]);
  const record = instance.write(['p', 'q', 'r'], 'mem', 1);
  assert.deepEqual(triggeredHandles(record), ['nested-handle', 'shallow-handle']);
  // AND THE PAIR'S `address` IS THE BINDING'S OWN ADDRESS, "never the address the write targeted"
  // (`index.d.ts`'s `TriggerPair`): the shallow binding is reported at `['p']`, not at `['p','q','r']`.
  const shallow = record.triggered.find((pair) => pair.handle === 'shallow-handle');
  assert.deepEqual(shallow.address, ['p']);

  // ARM (ii) — A DESCENDANT IS NOT A PREFIX: a binding BELOW the written address is not selected.
  const converse = make();
  converse.listen('at-the-address', [['z']]);
  converse.listen('below-the-address', [['z', 'w']]);
  const converseRecord = converse.write(['z'], 'mem', 1);
  assert.deepEqual(triggeredHandles(converseRecord), ['at-the-address']);
});

test('listener · surface.md §2.7 item 5 · the invocation takes EXACTLY ONE argument, and it is the TRIGGERING ADDRESS — never the binding address and never the handle that selected the function', () => {
  // DECLARED: "When the package invokes a registered function for a triggered id, IT PASSES THE
  // TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT — the function's `length`-and-`arguments` view is ONE
  // argument, the address, and it is NOT the id that selected the function"; "the `triggered` member's
  // element's `address` is THE BINDING's address; `triggeringAddress` is THE WRITE's address; a listener
  // at `['a']` fired by a write at `['a','b','c']` sees `{handle, address: ['a']}` in the set and
  // `['a','b','c']` in its argument" (`docs/specs/storeroom-held-listener-identity/contract.md §2.4`
  // item 7, read with `surface.md` §2.7 item 5).
  const instance = make();
  instance.write(['m'], 'mem', { n: { o: 0 } });
  instance.listen('argument-handle', [['m']]);
  const calls = [];
  instance.register('argument-handle', (...args) => calls.push(args));

  instance.write(['m', 'n', 'o'], 'mem', 1);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].length, 1, 'the invocation carried more than one argument');
  assert.deepEqual(calls[0][0], ['m', 'n', 'o']);
});

// ---------------------------------------------------------------------------------------------
// §6 — THE CROSS-KIND RULE
// ---------------------------------------------------------------------------------------------

test("listener · index.d.ts `register` (rulings `D-25`/`D-29`) · a listener registered where a CONSTRAINT's `id` stands is REJECTED, and NOTHING moves", () => {
  // DECLARED: "AND IT REFUSES WHERE A CONSTRAINT'S `id` STANDS AT THE ADDRESS (`D-25`'s *"vice versa"*;
  // `D-29`) … taken after the handle's domain and registry tests and before the registry write and
  // before the re-install `listen`, so NO STATE MOVES" (`index.d.ts`'s `register`); the counterpart at
  // the add route: "a pair whose `id` equals a LIVE LISTENER'S HANDLE is REJECTED" (`D-25`).
  const instance = make();
  instance.addConstraint({ address: ['x'], id: 'cross-kind-id' }, () => true);
  const carriedBefore = instance.constraints().length;

  const fired = [];
  const caught = catchIt(() => instance.register('cross-kind-id', () => fired.push('listener')));

  assert.ok(caught, 'the cross-kind arm did not throw');
  assert.equal(instance.constraints().length, carriedBefore, 'the constraint entry moved');

  // AND NO LISTENER IS INSTALLED UNDER THAT IDENTITY: the constraint stands and passes this write, so
  // the write succeeds and nothing of the caller's is invoked.
  assert.doesNotThrow(() => instance.write(['x'], 'mem', 1));
  assert.deepEqual(fired, []);
});

test("listener · the cross-kind refusal's FORM · index.d.ts (rulings `D-25`/`D-29`) declares the surface's ONE form `{status, message, log}` with the store's `AddressMalformed`, and held-listener contract.md §2.3 item 9 / §4 `F-9`'s `TypeError` reading is SUPERSEDED at both sites on 2026-10-25 — the cell now asserts the ONE declared form", () => {
  // THE TWO DECLARED READINGS, EACH AT ITS OWN BYTES, AND THE ONE THAT GOVERNS:
  //  (i) `index.d.ts`'s `register` — "the cross-kind rule's register-side direction, in the surface's
  //      OWN thrown form `{status, message, log}` with the store's `AddressMalformed` — NOT the
  //      `TypeError` this member's conflict arm carried while a reserved `constraint@` prefix existed to
  //      be exempted … so NO STATE MOVES"; and, at the add route, "The rejection is the surface's one
  //      thrown form `{status, message, log}` with the store's `AddressMalformed`", its `message` "naming
  //      BOTH SIDES and carrying the shared rule sentence *"a listener and a constraint do not share
  //      one"*".
  //  (ii) `docs/specs/storeroom-held-listener-identity/contract.md §2.3` item 9's AS-FILED text — "THE
  //      CONFLICT'S STATUS IS A PACKAGE-SIDE `TypeError` WITH NO `status` MEMBER — NO NEW CODE, NO
  //      CLOSED-SET WIDENING" — whose `§4` row `F-9` read "THROWN `TypeError`, `status` ABSENT".
  //
  // THIS CELL WAS RED IN THE PASS THAT MET IT AND IS GREEN NOW, AND IT IS GREEN BECAUSE THE DOCUMENT
  // MOVED: reading (ii) was corrected on 2026-10-25 by a PURE INSERTION at `§2.3` item 9 and by a second
  // one at `§4` `F-9`, both naming the superseded `TypeError` reading and both reading the state through
  // `D-25`/`D-29` and index.d.ts's `register` clause. Its own ground is printed at those clauses: the
  // item had borrowed rule (ii)'s form — the three constraint methods' class test on an OUTSIDE VALUE —
  // for a rule between TWO KINDS, which rule (ii) does not govern. `AddressMalformed` is rank `1` of the
  // store's own closed set, so the item's own "NO NEW CODE, NO CLOSED-SET WIDENING" stands whole and is
  // better satisfied. The build was not changed and no byte of it was read.
  const instance = make();
  instance.addConstraint({ address: ['y'], id: 'cross-form-id' }, () => true);
  const caught = catchIt(() => instance.register('cross-form-id', () => {}));

  // THE ONE DECLARED FORM: the surface's flat three-member shape, the store's own `AddressMalformed`,
  // and `log: []` (the failure's cause has no attempt at all — `surface.md §2.5` item 4's enumeration
  // names the registration site's refusal among the `[]` arms).
  assert.deepEqual(Object.keys(caught).sort(), ['address', 'log', 'message', 'status']);
  assert.equal(caught.status, 'AddressMalformed');
  assert.equal(typeof caught.message, 'string');
  assert.deepEqual(caught.log, []);
  // AND THE MESSAGE NAMES BOTH SIDES AND CARRIES THE SHARED RULE SENTENCE.
  assert.equal(caught.message.includes('a listener and a constraint do not share one'), true);
});

// ---------------------------------------------------------------------------------------------
// §7 — THE HANDLE'S NON-SURVIVAL ACROSS A RESTART
// ---------------------------------------------------------------------------------------------

test('listener · held-listener contract.md §2.1 item 7 (`(AA-3)`) · a handle from a PRIOR SESSION names NOTHING after a restart: a fresh instance over the same config answers `unlisten` as a no-op success and REFUSES `register` with `AddressMalformed`', () => {
  // DECLARED: "Handles are NOT saved data. The `file` tier persists STORE STATE and handles are not part
  // of it; A HANDLE FROM A PRIOR SESSION NAMES NOTHING AFTER A RESTART; `cfg.listeners` re-supplies the
  // boot's own handles" (`contract.md §2.1` item 7, `P: docs/pending.md · (AA-3)`), and the table's row
  // "a well-formed string THIS INSTANCE HELD IN A PRIOR SESSION": at `unlisten` a NO-OP SUCCESS, at
  // `register` a REFUSAL — `AddressMalformed` (§2.1 item 5).
  //
  // THE RESTART IS DRIVEN AS AN INSTANCE OVER AN EQUAL `cfg` (the surface's own boot route), and the
  // `read` below proves the SECOND instance opened the SAME state, so the arm is not a fresh empty store.
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-reload-'));
  const filePath = join(directory, 'store.json');
  const priorHandle = 'prior-session-handle';

  const first = make({ filePath });
  first.listen(priorHandle, [['rs']]);
  first.write(['rs'], 'file', 1); // the state reaches the file (`native contract.md §7.2`)

  const second = make({ filePath }); // "a restart": the same config, a new instance
  assert.equal(second.read(['rs'], 'file'), 1, 'the second instance did not open the same state');

  assert.equal(second.unlisten(priorHandle), undefined); // `F-3`'s prior-session row
  const caught = catchIt(() => second.register(priorHandle, () => {})); // `F-4`'s prior-session row
  assert.equal(caught.status, 'AddressMalformed');

  // OWED (recorded, not guessed): "**Whether the refusal names the deletion as the reason is `OWED`**"
  // (`contract.md §2.1` item 8) — so this cell asserts the `status` alone and NOT one byte of the
  // message's text. And `surface.md §2.3` item 3 (i)'s duty — "THE PACKAGE'S OWN DOCUMENTATION MUST STATE
  // THAT A HANDLE MUST NOT BE CARRIED ACROSS A PROCESS RELOAD" — is a documentation obligation with no
  // runtime observable: nothing below asserts it.
});

test("listener · held-listener contract.md §2.1 item 7 (`(AA-3)`) · a handle is NOT SAVED DATA: the persisted file carries no byte of the handle's spelling", () => {
  // DECLARED: "The `file` tier persists STORE STATE and handles are not part of it" (§2.1 item 7), read
  // with `docs/specs/storeroom-held-listener-identity/contract.md §1` item 3: "the `file` tier's
  // persistence of STORE STATE is UNMOVED — THE HANDLE'S NON-PERSISTENCE IS A FACT ABOUT WHAT IS SAVED".
  //
  // THE OBSERVABLE IS THE FILE THE STORE ITSELF WROTE — not a document: this cell reads the artefact
  // under test, never a `docs/**` path (`D-17`).
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-unpersisted-'));
  const filePath = join(directory, 'store.json');
  const handle = 'handle-spelling-that-must-not-be-saved';

  const instance = make({ filePath });
  instance.listen(handle, [['pf']]);
  instance.write(['pf'], 'file', 1);

  const bytes = readFileSync(filePath, 'latin1');
  assert.equal(bytes.includes(handle), false, 'the persisted state carries the handle');

  // AND the arm above is NOT VACUOUS — the store state itself DID reach the file — proved the way the
  // surface declares it rather than by guessing the file's encoding: a fresh instance over the same
  // `cfg.filePath` reads the written value back (`native contract.md §7.2`).
  assert.ok(bytes.length > 0, 'the persisted file is empty');
  assert.equal(make({ filePath }).read(['pf'], 'file'), 1);
});
