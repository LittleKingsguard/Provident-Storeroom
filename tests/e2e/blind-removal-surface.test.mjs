// tests/e2e/blind-removal-surface.test.mjs
//
// BLIND INSTRUMENT — THE REMOVAL SURFACE: `removeListener`'s throwing arms against `unlisten`'s
// no-op-success set (the declared reversal), `removeConstraint` as THE ONE ACT THAT DELETES AN
// IDENTITY and its N-address clear, and what SURVIVES a removal versus what does not.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing
// else:
//   · `bindings/js/index.d.ts` — `removeListener(handle)` · `removeConstraint(pair)` · `Handle` ·
//     `ConstraintPair` · `ConstraintIdentity`, and the `register` / `unlisten` / `constraints()`
//     members their arms are read against
//   · `docs/specs/storeroom-held-listener-identity/contract.md` §2.1 items 4–8 (the outside-value
//     table and the store's own domain), §2.2 items 2 and 5 (the set position and the entry's three
//     states), §2.6 items 3–5 (the identity, and a pair over N addresses), §2.7 items 1–10 (the two
//     remove members: their shapes, the ARMS, the two forms, the four removals' order and the
//     `constraintOff` distinction), §3 (`S-7`, `S-12`), §4 (`F-6` · `F-7` · `F-8` · `F-12`)
//   · `docs/specs/storeroom-js/surface.md` §2.3 item 4 (the no-op-success set), §2.4 rule 1 (the
//     unregistered handle's silence), §2.5 (the one failure form), §2.1 (e) item 1 (`A74`, the
//     release clause)
//
// No byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read to author this file,
// no battery or runner under `tests/**` was read (the three existing blind instances were read in a
// previous pass to avoid duplicating a cell, and nothing of theirs is re-authored here), and NO CELL
// OPENS A DOCUMENT AT RUNTIME (`D-17`): every expectation below is a LITERAL written here.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`.

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

/** The `triggered` pairs of a returned record, as handles. */
const triggeredHandles = (record) => record.triggered.map((pair) => pair.handle).sort();

// ---------------------------------------------------------------------------------------------
// §1 — `removeListener`: THE ENTRY REMOVED WHOLE
// ---------------------------------------------------------------------------------------------

test('removal · held-listener contract.md §2.7 item 2 and §2.2 item 5 (c) · `removeListener(handle)` answers `undefined`, REMOVES THE ENTRY WHOLE, and the handle is afterwards OUTSIDE the domain at `register` while `unlisten` still answers it as a no-op success', () => {
  // DECLARED: "**`removeListener(handle) -> undefined`.** Position `1` is `handle`, a `string` in
  // `HL-1`'s domain. **The success return is `undefined`** … **IT REMOVES THE ENTRY WHOLE AND
  // WITHDRAWS THE STORE'S HOME ENTRIES THE HANDLE NAMED** … **AND THE CONSEQUENCE IS STATED IN THE
  // OPERATOR'S OWN TERMS BECAUSE IT IS THE ONE PLACE WHERE *"DELETE"* AND *"OFF"* DIFFER OBSERVABLY:
  // a deleted handle is OUTSIDE the domain at `unlisten` and `register` alike**" (§2.7 item 2), read
  // with §2.2 item 5 (c): "`removeListener(handle)` REMOVES THE ENTRY WHOLE, and it is the ONLY route
  // that removes one".
  const instance = make();
  instance.write(['rl'], 'mem', {});
  instance.listen('remove-me', [['rl']]);
  const fired = [];
  instance.register('remove-me', (...args) => fired.push(args[0]));
  instance.write(['rl', 'x'], 'mem', 1); // the entry is ARMED and fires

  assert.deepEqual(fired, [['rl', 'x']]);
  assert.equal(instance.removeListener('remove-me'), undefined);

  // THE ENTRY IS GONE: nothing fires, and the handle names no pair in a trigger's list.
  const record = instance.write(['rl', 'y'], 'mem', 2);
  assert.deepEqual(fired, [['rl', 'x']], 'a removed entry still delivered');
  assert.equal(triggeredHandles(record).includes('remove-me'), false, 'a removed entry still triggered');

  // AND THE TWO DISPOSITIONS OF THE SAME NOW-OUTSIDE VALUE: `unlisten` is a NO-OP SUCCESS
  // (`surface.md §2.3` item 4), `register` is a REFUSAL in the surface's one form.
  assert.equal(instance.unlisten('remove-me'), undefined);
  const refused = catchIt(() => instance.register('remove-me', () => {}));
  assert.equal(refused.status, 'AddressMalformed');
});

test('removal · held-listener contract.md §2.1 item 5 (its closing clause) and §2.7 item 5 · THE DECLARED REVERSAL: the SAME value that is a SILENT SUCCESS at `unlisten` is a THROWN FAILURE at `removeListener`', () => {
  // DECLARED: "**the SAME value that is a SILENT SUCCESS at `unlisten` is a THROWN FAILURE at
  // `removeListener` — TWO DISPOSITIONS FOR ONE ARGUMENT IN ONE PRODUCT — and that reversal is RULED,
  // not accidental** (`P: docs/pending.md · P-5`'s `(R2)`, verbatim: *"`removeListener`/`removeConstraint`
  // FAIL ON EVERY ARM THAT IS NOT A REAL REMOVAL, WITH MESSAGES — A DECLARED REVERSAL OF `§2.3` ITEM
  // 4'S NO-OP-SUCCESS SET"*)" (§2.1 item 5); and §2.7 item 5's own enumerated arms: "a fabricated
  // handle · a foreign instance's handle · a prior session's handle · a blank string · a non-string
  // value · an ABSENT argument · a handle never listened · an already-deleted handle".
  const instance = make();
  instance.write(['rv'], 'mem', {});
  instance.listen('live-handle', [['rv']]);
  instance.register('live-handle', () => {});
  instance.removeListener('live-handle'); // an ALREADY-DELETED handle, below

  const outside = [
    'fabricated-never-minted', // a fabricated handle
    '', // a blank string
    42, // a non-string value
    undefined, // an ABSENT argument
    null, // `§2.1` item 5's `null` row
    'live-handle', // an already-deleted handle
  ];
  for (const value of outside) {
    // `unlisten` FIRST — the same value, the other member, the OTHER disposition.
    assert.equal(instance.unlisten(value), undefined, `unlisten(${String(value)}) is not a no-op success`);
    const caught = catchIt(() => instance.removeListener(value));
    assert.ok(caught, `removeListener(${String(value)}) did not throw`);
    assert.equal(
      typeof caught.message,
      'string',
      `removeListener(${String(value)}) threw without a message`,
    );
    assert.ok(caught.message.length > 0, 'the failure carries an EMPTY message; the reversal is "WITH MESSAGES"');
  }

  // AND THE HANDLE-SHAPED ARMS CARRY THE STORE'S OWN `AddressMalformed` — "the thrown value's `status`
  // is the store's `AddressMalformed` for a handle-shaped outside value" (§2.7 item 5).
  assert.equal(catchIt(() => instance.removeListener('never-listened-either')).status, 'AddressMalformed');
});

test("removal · held-listener contract.md §2.1 item 5 (the prior-session row) · a handle THIS INSTANCE HELD IN A PRIOR SESSION is a no-op success at `unlisten` and a THROWN FAILURE at `removeListener`, and no handle survives the restart", () => {
  // DECLARED, the table's last row: "a well-formed string THIS INSTANCE HELD IN A PRIOR SESSION |
  // NO-OP SUCCESS | REFUSAL — `AddressMalformed` | **FAILURE — thrown** (and `(AA-3)` states the fact
  // that makes this arm reachable only as a fabrication: no handle survives a restart)" (§2.1 item 5);
  // and §2.1 item 7: "Handles are NOT saved data … a handle from a prior session names NOTHING after a
  // restart".
  const directory = mkdtempSync(join(tmpdir(), 'sr-blind-remove-session-'));
  const filePath = join(directory, 'store.json');

  const first = make({ filePath });
  first.listen('prior-session-handle', [['ps']]);
  first.register('prior-session-handle', () => {});
  first.write(['ps'], 'file', 1); // the STATE reaches the file; the handle does not

  const second = make({ filePath });
  assert.equal(second.read(['ps'], 'file'), 1, 'the second instance did not open the same state');

  assert.equal(second.unlisten('prior-session-handle'), undefined);
  const caught = catchIt(() => second.removeListener('prior-session-handle'));
  assert.equal(caught.status, 'AddressMalformed');
  // OWED (recorded, not guessed): "Whether the refusal names the deletion as the reason is `OWED`"
  // (`§2.1` item 8) — so no byte of the message's text is asserted here.
});

// ---------------------------------------------------------------------------------------------
// §2 — `removeConstraint`: THE ONE ACT THAT DELETES AN IDENTITY
// ---------------------------------------------------------------------------------------------

test('removal · held-listener contract.md §2.6 item 3 and §2.7 item 8 · `removeConstraint` is THE ONE ACT that deletes an identity, and the observable distinction from the toggle is the enumeration: `constraints()` SHRINKS by one per removal where `constraintOff` leaves it standing', () => {
  // DECLARED: "**`removeConstraint` REMOVES THE ROW AND THE IDENTITY WITH IT — THE ONE ACT THAT DELETES
  // AN IDENTITY.** … The observable: after `removeConstraint(pair)`, a fresh `addConstraint` at that
  // pair answers a NEW identity, and the identity the caller held before resolves to nothing" (§2.6
  // item 3); "**And the observable distinction: `constraints()`'s return SHRINKS by one element per
  // `removeConstraint`, where `constraintOff` leaves it standing**" (§2.7 item 8).
  const instance = make();
  const pair = { address: ['rc'], id: 'rc-1' };
  const constraint = () => true;

  const identity = instance.addConstraint(pair, constraint);
  assert.equal(instance.constraints().length, 1);

  // THE TOGGLE IS NOT A REMOVAL — the pair stands carried and still enumerated.
  assert.equal(instance.constraintOff(pair, constraint), undefined);
  assert.equal(instance.constraints().length, 1, '`constraintOff` removed the pair');
  assert.equal(instance.constraintOn(pair, constraint), undefined);
  assert.equal(instance.constraints().length, 1);

  // THE REMOVAL IS.
  assert.equal(instance.removeConstraint(pair), undefined);
  assert.deepEqual(instance.constraints(), []);

  // AND THE IDENTITY IS DELETED WITH THE ROW: a fresh `addConstraint` at the SAME pair answers a
  // DIFFERENT identity (`ConstraintIdentity`: "distinguishable from every other pair's").
  const fresh = instance.addConstraint(pair, constraint);
  assert.notEqual(fresh, identity, 'the deleted identity was answered again');
});

test("removal · held-listener contract.md §2.7 item 3 (`(R4)`) · the N-ADDRESS CLEAR: `removeConstraint` removes the pair, ALL N address rows, the kernel's registration AND the store-side home entry — so a write at the pair's own address is no longer governed by it", () => {
  // DECLARED: "**IT REMOVES EVERYTHING: the pair, all N address rows, the kernel's registration, and
  // the store-side home entry** (`P: docs/pending.md · P-5`'s `(R4)`, verbatim: *"removeConstraint
  // REMOVES EVERYTHING — THE PAIR, ALL N ADDRESS ROWS, THE KERNEL'S REGISTRATION, AND THE STORE-SIDE
  // HOME ENTRY"*)" (§2.7 item 3); and §2.6 item 4: "**A pair standing over N addresses occupies N
  // registry rows and ONE identity**"; §2.9 item 6: "the chain is `removeConstraint → K-6 →
  // removeListener`".
  const instance = make();
  let refuse = false;
  const pair = { address: ['nac'], id: 'nac-1' };
  instance.addConstraint(pair, () => !refuse);

  // THE ELEMENT IS ARMED: the write it refuses is refused.
  refuse = true;
  assert.equal(typeof catchIt(() => instance.write(['nac'], 'mem', 1)).status, 'string');

  // AND THE REMOVAL TAKES THE STORE-SIDE STANDING WITH IT: the same write now succeeds, with no
  // element standing to refuse it — the store's home entry the pair's addresses held is gone.
  refuse = false;
  assert.equal(instance.removeConstraint(pair), undefined);
  refuse = true;
  assert.doesNotThrow(() => instance.write(['nac'], 'mem', 2));
  assert.deepEqual(instance.constraints(), []);

  // OWED (recorded, not guessed): the N > 1 case. `§2.6` item 4 declares "one pair, N registry rows,
  // removal clears all N", and `ConstraintPair.address` is `Address | readonly Address[]` — "on the
  // READ and at the REMOVAL it is the pair's own SET" — but NO clause read for this cell names the ACT
  // THAT GIVES A PAIR ITS SECOND ADDRESS. This cell therefore drives the N = 1 clear, whose `N` rows
  // are one, and asserts neither an N > 1 construction nor an N = 1 ENCODING (`['a']` against
  // `[['a']]`).
});

// ---------------------------------------------------------------------------------------------
// §3 — `removeConstraint`'S TWO FORMS
// ---------------------------------------------------------------------------------------------

test("removal · held-listener contract.md §2.7 item 6 and §4 `F-7` · a PAIR-SHAPED outside value takes the three constraint methods' ONE `TypeError`, whose `status` member is ABSENT — the two forms are told apart by `status`'s PRESENCE", () => {
  // DECLARED: "**`removeConstraint`'S PAIR-SHAPED ARM TAKES THE CONSTRAINT METHODS' `TypeError`, AND THE
  // TWO FORMS ARE TOLD APART BY `status`'S PRESENCE.** … **SO A DRIVE DERIVES `removeConstraint`'S FAIL
  // CELLS BY THE SAME TWO RULES THE TABLE GIVES: rule (i) for a store-code answer, rule (ii) for a
  // class-test answer.**" (§2.7 item 6); and `F-7`: "`removeConstraint` over an outside pair | the
  // constraint methods' `TypeError`, `status` member ABSENT | a malformed pair, a non-string or empty
  // `id`, an absent argument".
  const instance = make();

  const outsidePairs = [
    undefined, // an ABSENT argument
    null,
    'not-a-pair',
    {}, // a malformed pair — no `id`
    { address: ['p'] }, // a malformed pair — `id` absent
    { address: ['p'], id: 42 }, // a non-string `id`
    { address: ['p'], id: '' }, // an empty `id`
  ];
  for (const pair of outsidePairs) {
    const caught = catchIt(() => instance.removeConstraint(pair));
    assert.ok(caught instanceof TypeError, `${JSON.stringify(pair)} did not throw the class test's TypeError`);
    assert.equal('status' in caught, false, `${JSON.stringify(pair)}: the class-test form carries a \`status\``);
    assert.equal(typeof caught.message, 'string');
  }

  // AND THE ENTRY IS NOT TOUCHED BY ANY OF THEM.
  assert.deepEqual(instance.constraints(), []);
});

test('removal · held-listener contract.md §4 `F-8` and §2.7 item 5 · a WELL-FORMED pair the entry does not carry THROWS with a verbose message, and the four structures the removal touches are as they stood after the thrown arm', () => {
  // DECLARED: `F-8` — "`removeConstraint` over a pair the entry does not carry | **THROWN, with a
  // verbose message** | a well-formed pair this instance holds no row for"; and §2.7 item 7 — "**a
  // partial removal is the state nothing declares** … **And the ordering is observable: after any
  // thrown arm the four structures are as they stood; after the success return all four are gone.**"
  const instance = make();
  const carried = { address: ['kept'], id: 'kept-1' };
  instance.addConstraint(carried, () => true);

  const caught = catchIt(() => instance.removeConstraint({ address: ['absent'], id: 'absent-1' }));
  assert.ok(caught, 'removal of an uncarried pair returned');
  assert.equal(typeof caught.message, 'string');
  assert.ok(caught.message.length > 0, 'the arm carries no message; `F-8` reads "WITH A VERBOSE MESSAGE"');

  // THE STRUCTURES ARE AS THEY STOOD: the carried pair is still carried and still evaluates.
  assert.equal(instance.constraints().length, 1);
  assert.equal(instance.constraints()[0].id, 'kept-1');

  // OWED (recorded, not guessed): which of the two forms this arm takes is NOT settled by the clauses
  // read for this cell — `§2.7` item 5 gives a store code for a handle-shaped value and "the surface's
  // own one form" for a pair-shaped one, while item 6 gives the constraint methods' `TypeError` for
  // the pair-shaped arms. `F-8` prints only "THROWN, with a verbose message". So this cell asserts the
  // THROW and the MESSAGE and NOT the form, and no `status` value is asserted either way.
});

// ---------------------------------------------------------------------------------------------
// §4 — WHAT SURVIVES A REMOVAL
// ---------------------------------------------------------------------------------------------

test('removal · held-listener contract.md §2.7 items 2–3 (the reach of each removal) · a removal reaches ITS OWN subject and nothing else: a `removeListener` leaves every other handle armed and the store\'s values standing, and a `removeConstraint` leaves every other pair carried', () => {
  // DECLARED: `removeListener` "REMOVES THE ENTRY WHOLE" — one entry — and the mirror clause:
  // "`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS … and NO OTHER REGISTRATION IS
  // REMOVED" (`surface.md §2.3` item 4), whose reach the remove member neither widens nor narrows:
  // "THE MAP'S SIZE IS BOUNDED BY THE SET OF HANDLES THE CALLER HAS LISTENED TO AND NOT EXPLICITLY
  // DELETED" (§2.2 item 6). `removeConstraint` "REMOVES EVERYTHING: the pair, all N address rows, the
  // kernel's registration, and the store-side home entry" — and the four structures it names are its
  // OWN.
  const instance = make();
  instance.write(['surv'], 'mem', {});
  instance.write(['surv', 'v'], 'mem', 'a-standing-value');

  // TWO HANDLES AT TWO ADDRESSES, and one pair beside them.
  instance.listen('kept-handle', [['surv']]);
  instance.listen('removed-handle', [['surv']]);
  const fired = [];
  instance.register('kept-handle', (...args) => fired.push(['kept', args[0]]));
  instance.register('removed-handle', (...args) => fired.push(['removed', args[0]]));
  const keptPair = { address: ['surv'], id: 'kept-pair' };
  const removedPair = { address: ['surv'], id: 'removed-pair' };
  instance.addConstraint(keptPair, () => true);
  instance.addConstraint(removedPair, () => true);

  instance.removeListener('removed-handle');
  instance.removeConstraint(removedPair);

  // WHAT SURVIVES: the other handle still fires, exactly once; the other pair is still carried.
  instance.write(['surv', 'v'], 'mem', 'next-value');
  assert.deepEqual(fired, [['kept', ['surv', 'v']]]);
  assert.deepEqual(
    instance.constraints().map((pair) => pair.id),
    ['kept-pair'],
  );

  // AND THE STORE'S OWN STATE SURVIVES BOTH: the values written before the removals stand, and the
  // instance still reads and writes.
  assert.equal(instance.read(['surv', 'v'], 'mem'), 'next-value');
  assert.equal(instance.read(['surv'], 'mem').v, 'next-value');
});

test('removal · surface.md §2.1 (e) item 1 (`A74`) and index.d.ts\'s `StoreInstance` head · NEITHER remove member is a RELEASE VERB: after both removals the instance is whole and its fourteen own members are unchanged — no `dispose`, no `close`, no finalizer', () => {
  // DECLARED: "**THE STATE IS PRIVATE AND NONE OF THE TWELVE IS A RELEASE VERB** (`surface.md §2.1`
  // (e) item 1; `A74`): the instance's own state is released with the instance and by nothing else —
  // no `dispose()`, no `close()` and no finalizer is declared here"; and at the fourteen-member figure:
  // "**the two remove members remove a LISTENER and a CONSTRAINT PAIR, never the instance's own
  // state, and no `dispose()`, `close()` or finalizer stands beside them.**"
  const instance = make();
  const before = Object.getOwnPropertyNames(instance).sort();

  instance.write(['live'], 'mem', {});
  instance.listen('gone', [['live']]);
  instance.register('gone', () => {});
  instance.addConstraint({ address: ['live'], id: 'gone-pair' }, () => true);
  instance.removeListener('gone');
  instance.removeConstraint({ address: ['live'], id: 'gone-pair' });

  // THE PRODUCT'S OWN PROPERTY SET IS UNCHANGED BY THE REMOVALS.
  assert.deepEqual(Object.getOwnPropertyNames(instance).sort(), before);
  assert.equal(before.length, 14);

  // AND THE INSTANCE IS STILL WHOLE: every verb still answers.
  assert.doesNotThrow(() => instance.write(['live', 'after'], 'mem', 1));
  assert.equal(instance.read(['live', 'after'], 'mem'), 1);
  assert.ok(Array.isArray(instance.constraints()));
  assert.equal(instance.unlisten('anything'), undefined);

  // AND NO RELEASE VERB STANDS BESIDE THEM.
  for (const forbidden of ['dispose', 'close', 'destroy', 'finalize', 'free', 'release', 'shutdown']) {
    assert.equal(Object.prototype.hasOwnProperty.call(instance, forbidden), false, `${forbidden} stands on the product`);
  }
  assert.equal(Object.prototype.hasOwnProperty.call(instance, Symbol.dispose), false);
});

test("removal · held-listener contract.md §2.2 item 5 (c) and §2.3 item 3 · the ENTRY'S THREE STATES survive the removals they are told apart by: a REMOVED entry is not a RESERVED one, and a `listen` after a removal writes a FRESH entry — the handle is the caller's, so nothing is resumed", () => {
  // DECLARED: "**THE THREE STATES AND THE ONE TRANSITION OF THE ENTRY.** **(a) `listen(handle,
  // addresses)` WRITES THE ENTRY WITH `off` SET** — the reservation; **(b) `register(handle,
  // listener)` CLEARS `off` AND INSTALLS THE FUNCTION**; **(c) `removeListener(handle)` REMOVES THE
  // ENTRY WHOLE**" (§2.2 item 5); and the explicit-delete ruling's consequence: "**A DELETED ENTRY IS
  // NOT A RESERVED ONE**" (§2.7 item 2).
  const instance = make();
  instance.write(['st'], 'mem', {});
  const handle = 'three-states';

  // (a) THE RESERVATION: the entry stands with `off` set, so nothing fires.
  instance.listen(handle, [['st']]);
  const fired = [];
  instance.register(handle, (...args) => fired.push(args[0]));
  // (b) `register` CLEARS `off`.
  instance.write(['st', 'a'], 'mem', 1);
  assert.deepEqual(fired, [['st', 'a']]);

  // (c) THE REMOVAL TAKES THE ENTRY WHOLE — it is NOT left reserved-with-`off` — so a re-`listen`
  // writes a fresh reservation that fires nothing until a fresh `register`.
  instance.removeListener(handle);
  instance.listen(handle, [['st']]);
  instance.write(['st', 'b'], 'mem', 2);
  assert.deepEqual(fired, [['st', 'a']], 'a removed-then-re-listened entry fired WITHOUT a fresh register');
  instance.register(handle, (...args) => fired.push(args[0]));
  instance.write(['st', 'c'], 'mem', 3);
  assert.deepEqual(fired, [
    ['st', 'a'],
    ['st', 'c'],
  ]);
  // OWED (recorded, not guessed): whether a caller can observe the reservation's `off` bit by any
  // member other than the ABSENCE of a firing is not declared — the state is read at the toggles' own
  // clauses and no member exposes it. Nothing above asserts one.
});
