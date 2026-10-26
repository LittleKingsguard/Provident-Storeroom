// tests/e2e/prototype-refusal-form.test.mjs
//
// DERIVED INSTRUMENT — `D-35`'s FIRST DEFENCE (PARAMETER ACCESS): **THE SURFACE BUILDS ITS ONE PLAIN FORM OUT
// OF THE STORE'S OWN BYTES, AND NEVER OUT OF A PROTOTYPE IT READS A SUPPLIED OBJECT THROUGH.**
//
// **PROVENANCE, AND WHAT THIS CELL OWNS.** `D-35` (2026-10-25) reclassifies the frozen store, the
// `getOwnPropertySymbols` record and the registered-symbol getter as CLIENT-SCOPE BREAKAGE — not defects —
// and moves the defence to exactly two places, the first of which is *"what the package reads off a value the
// caller supplied"*: *"`fail()`'s re-read of `refusal.status` through the prototype and `facade.rs:170/173`'s
// dropped own `status` are PARAMETER-ACCESS HOLES and are therefore still defects — a caller gets a status
// outside the closed set and a caller-authored message, not because they broke anything but because the
// package read a supplied object through a chain it should not consult."* **THIS CELL IS THE MEASUREMENT OF
// THAT SENTENCE AT THE SURFACE**, and the wrong values it was written against were taken on the artefact
// BEFORE the cure, with `Object.prototype.status`/`.message` installed (both shapes below answer the same
// bytes):
//
//     read(['absent'], 'mem')          → status "BogusStatus"      message "caller authored"
//     the thrown form's own members    → three own keys carrying the PROTOTYPE'S strings
//     the raw native refusal           → own=["message"], hasOwnStatus=false   (facade.rs:170)
//     fail(a handed value, no own members) → a MINTED form carrying "BogusStatus"/"caller authored"
//
// **THE TWO SITES, AND WHY PART (A) AND PART (B) ARE BOTH HERE.** Part (A) drives the **surface** — the
// package's public members — and is the observable the ruling names (*"the surface must still answer the
// declared status for its code and a message the package generated"*). **PART (B) DRIVES [`fail`] DIRECTLY,
// WHICH IS THE ONLY ROUTE THAT STILL REACHES ITS OWN HOLE ONCE THE NATIVE HALF DEFINES ITS TWO MEMBERS**: the
// native cure makes a genuine refusal carry its own `status`/`message`, so the surface can no longer expose
// the re-read — **and a cell that let the site go unmeasured on that account would be reporting the cure as
// the whole of the ruling.** The direct drive is also where the two arms `D-35` says the package must NOT
// consult are distinguished from the ONE it may: an OWN DATA property is the store's form and crosses; an
// inherited member and an OWN ACCESSOR (which would run caller code on the failure path) are both absent.
//
// **THE RULING'S OTHER HALF, WHICH THIS CELL DOES NOT TOUCH.** Nothing here asserts anything about a frozen
// store, an `Object.getOwnPropertySymbols` read of the store, or a getter planted for a registered symbol:
// **those are CLIENT-SCOPE BREAKAGE under `D-35`, `cdd2467` STANDS, and no cell of this file adds a slot
// descriptor test.**
//
// **EACH CELL NAMES ITS CLAUSE AS `path §section`.**

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../bindings/js/index.mjs';
import { fail } from '../../bindings/js/src/entry/refusal.mjs';

/** A store constructed at the two required `cfg` keys alone (`surface.md §2.1`). */
const make = () => storeCreate({ journalLength: 8, listeners: [] });

/** The prototype's two strings, named once so a failure prints them. */
const PLANTED_STATUS = 'BogusStatus';
const PLANTED_MESSAGE = 'caller authored';

/**
 * **THE HOSTILE REALM, IN THE TWO SHAPES A CALLER MAY INSTALL WITHOUT BREAKING ANYTHING OF THEIR OWN.**
 * `(1)` a NON-WRITABLE OWN DATA PROPERTY — the shape that drops a native `[[Set]]` (`facade.rs:170/173`'s
 * measured `own=["message"]`); `(2)` an OWN GETTER-ONLY ACCESSOR ON THE REFUSAL'S OWN PROTOTYPE — the shape
 * `D-35` names *"a hostile getter on the refusal's own prototype"*, and the one under which a `[[Set]]`
 * answers `false` with no setter to run.
 */
const installDataShape = () => {
  Object.defineProperty(Object.prototype, 'status', {
    value: PLANTED_STATUS, writable: false, enumerable: false, configurable: true,
  });
  Object.defineProperty(Object.prototype, 'message', {
    value: PLANTED_MESSAGE, writable: false, enumerable: false, configurable: true,
  });
};
const installGetterShape = () => {
  Object.defineProperty(Object.prototype, 'status', {
    get() { return PLANTED_STATUS; }, enumerable: false, configurable: true,
  });
  Object.defineProperty(Object.prototype, 'message', {
    get() { return PLANTED_MESSAGE; }, enumerable: false, configurable: true,
  });
};
const restoreRealm = () => {
  delete Object.prototype.status;
  delete Object.prototype.message;
};
const assertRestored = () => {
  assert.equal(Object.hasOwn(Object.prototype, 'status'), false,
    'the drive must restore the realm: `status` is no longer an own member of `Object.prototype`');
  assert.equal(Object.hasOwn(Object.prototype, 'message'), false,
    'the drive must restore the realm: `message` is no longer an own member of `Object.prototype`');
  assert.equal('status' in {}, false, 'the restore is proved a second way: no member is carried by the chain');
  assert.equal('message' in {}, false, 'the restore is proved a second way: no member is carried by the chain');
};

/**
 * **THE FOUR ARMS, AND EACH ONE'S DECLARED STATUS** — a `read` at an absent address, a `read` at an
 * out-of-domain tier, a `register` whose argument is outside its domain, and the construction's own `cfg`
 * refusal. **Four and not one** because the form is built at ONE site for every arm, and a cell driving one
 * arm would leave the other three unmeasured if a later arm were routed around it.
 */
const ARMS = [
  {
    label: 'read at an absent address',
    declared: 'AddressNotFound',
    run: (instance) => instance.read(['absent'], 'mem'),
  },
  {
    label: 'read at an out-of-domain tier',
    declared: 'OutOfDomainTier',
    run: (instance) => instance.read(['warm'], 'nope'),
  },
  {
    label: 'register with an argument outside the handle domain',
    declared: 'AddressMalformed',
    run: (instance) => instance.register('not-a-handle'),
  },
  {
    label: 'the construction\'s own refusal',
    declared: 'AddressMalformed',
    run: () => storeCreate({ journalLength: 0, listeners: [] }),
  },
];

/** One arm, driven against a warm instance, with everything the FORM declares read off what it threw. */
const driveArm = (arm) => {
  const instance = make();
  instance.write(['warm'], 'mem', 'warm');
  try {
    const value = arm.run(instance);
    return { threw: false, value };
  } catch (error) {
    const object = error !== null && typeof error === 'object';
    return {
      threw: true,
      status: object ? error.status : undefined,
      message: object ? error.message : undefined,
      // **THE OWN-NESS OF THE TWO STORE MEMBERS IS READ BY `Object.hasOwn`** — the census `surface.md §2.5`
      // item 9 declares, and the half the native `[[Set]]` dropped.
      ownStatus: object && Object.hasOwn(error, 'status'),
      ownMessage: object && Object.hasOwn(error, 'message'),
      keys: object ? Object.keys(error).sort() : [],
      log: object ? error.log : undefined,
    };
  }
};

test('D-35 §1 (parameter access) · surface.md §2.5 items 1–2, 9 · the one plain form is built from the store\'s own status and message under a hostile Object.prototype, and `fail` reads a supplied value\'s OWN data properties and never a chain', () => {
  // ── (A) THE SURFACE, UNDER BOTH HOSTILE SHAPES ────────────────────────────────────────────────────────
  // The CLEAN bytes are measured first, on an unmutated realm, so the cell compares the package's own answers
  // with themselves and mints no expected sentence of its own (the message is the store's generated string,
  // `surface.md §2.5` item 2).
  const clean = ARMS.map((arm) => ({ arm, answer: driveArm(arm) }));
  for (const { arm, answer } of clean) {
    assert.equal(answer.threw, true,
      `the arm "${arm.label}" is a refusal and must throw; the clean realm answered ${JSON.stringify(answer)}`);
    assert.equal(answer.status, arm.declared,
      `the arm "${arm.label}" answers its declared status on a clean realm; got ${JSON.stringify(answer.status)}`);
  }

  for (const [shapeName, install] of [['non-writable data properties', installDataShape], ['getter-only accessors', installGetterShape]]) {
    install();
    try {
      for (const { arm, answer: baseline } of clean) {
        const hostile = driveArm(arm);
        const where = `(${shapeName}) the arm "${arm.label}"`;
        assert.equal(hostile.threw, true,
          `${where} must still refuse; it answered ${JSON.stringify(hostile.value)} — a package that stops `
          + 'refusing under a hostile prototype has lost a refusal and not merely reshaped one');
        // THE DECLARED STATUS FOR ITS CODE, AND THE MESSAGE THE PACKAGE GENERATED — byte for byte against the
        // clean realm's own answer. The measured wrong values were `"BogusStatus"` and `"caller authored"`.
        assert.equal(hostile.status, arm.declared,
          `${where} answers the DECLARED status ${JSON.stringify(arm.declared)}; got `
          + `${JSON.stringify(hostile.status)} (the prototype's string, not the store's)`);
        assert.equal(hostile.status, baseline.status, `${where} answers the status it answers on a clean realm`);
        assert.equal(hostile.message, baseline.message,
          `${where} answers the message the package generated on a clean realm; got `
          + `${JSON.stringify(hostile.message)}`);
        assert.notEqual(hostile.status, PLANTED_STATUS,
          `${where} must not answer the prototype's status ${JSON.stringify(PLANTED_STATUS)}`);
        assert.notEqual(hostile.message, PLANTED_MESSAGE,
          `${where} must not answer the prototype's message ${JSON.stringify(PLANTED_MESSAGE)}`);
        // THE FORM'S OWN MEMBERS: `{status, message, log}` and nothing else, both store members OWN.
        assert.equal(hostile.ownStatus, true,
          `${where}: \`status\` is an OWN member of the thrown form — the native half defines it and does not `
          + '`[[Set]]` it, which is the hole `facade.rs:170` was measured at (`hasOwnStatus=false`)');
        assert.equal(hostile.ownMessage, true, `${where}: \`message\` is an OWN member of the thrown form`);
        assert.deepEqual(hostile.keys, ['log', 'message', 'status'],
          `${where}: the form carries exactly the three declared members; got ${JSON.stringify(hostile.keys)}`);
        assert.deepEqual(hostile.log, [], `${where}: \`log\` is the declared empty array`);
      }

      // ── (B) THE SITE ITSELF, DRIVEN DIRECTLY ───────────────────────────────────────────────────────────
      // **(B1) A HANDED VALUE THAT CARRIES NO OWN `status`/`message` IS THROWN AS ITSELF.** The chain answers
      // both names here; a form built out of them would be `{status:'BogusStatus', message:'caller authored'}`,
      // which is the measured wrong value. **THE PROVENANCE TEST'S OWN DECLARED ANSWER IS THE OTHER ARM**
      // (`fail`'s header: *"a value that is not that object is NOT this form's provenance — so it is THROWN AS
      // ITSELF"*), and it is asserted by IDENTITY, so a minted copy cannot pass.
      const bare = { other: 1 };
      let bareThrown = null;
      try {
        fail(bare);
      } catch (thrown) {
        bareThrown = thrown;
      }
      assert.equal(bareThrown, bare,
        'a handed value carrying no OWN `status`/`message` is thrown AS ITSELF — the measured wrong answer was '
        + `a minted form carrying the prototype's strings; got ${JSON.stringify(bareThrown)}`);

      // **(B2) AN OWN ACCESSOR IS NOT AN OWN DATA PROPERTY, AND ITS GETTER IS NEVER RUN.** The failure path may
      // not execute caller code: the package reads `[[GetOwnProperty]]`'s descriptor and a descriptor without
      // an own `value` answers the absent arm.
      let reads = 0;
      const accessor = { message: 'a caller-authored message' };
      Object.defineProperty(accessor, 'status', {
        get() {
          reads += 1;
          return PLANTED_STATUS;
        },
        enumerable: true,
        configurable: true,
      });
      let accessorThrown = null;
      try {
        fail(accessor);
      } catch (thrown) {
        accessorThrown = thrown;
      }
      assert.equal(accessorThrown, accessor,
        'an own ACCESSOR at `status` is not the store\'s two-member form: the value crosses as itself');
      assert.equal(reads, 0,
        'the package runs no getter on the failure path — the accessor\'s count is zero, not the one an '
        + 'ordinary member read leaves');

      // **(B3) THE ONE VALUE THAT MAY CROSS STILL DOES, BYTE FOR BYTE, WITH `log` ATTACHED BESIDE IT.** The cure
      // moves the READING and not the form: an own `{status, message}` still yields the three-member literal.
      let ownThrown = null;
      try {
        fail({ status: 'AddressNotFound', message: 'a message the package generated' });
      } catch (thrown) {
        ownThrown = thrown;
      }
      assert.equal(ownThrown !== null && typeof ownThrown === 'object', true,
        'the store\'s own two-member form is thrown as a form');
      assert.deepEqual(Object.keys(ownThrown).sort(), ['log', 'message', 'status'],
        'the form carries exactly the three declared members');
      assert.equal(ownThrown.status, 'AddressNotFound', 'the store\'s own status crosses VERBATIM');
      assert.equal(ownThrown.message, 'a message the package generated',
        'the store\'s own message crosses VERBATIM');
      assert.deepEqual(ownThrown.log, [], 'the third member is attached at this boundary as the declared `[]`');
    } finally {
      restoreRealm();
    }
    assertRestored();
  }

  // AND THE SURFACE IS WHOLE ONCE THE REALM IS RESTORED: the same four arms answer the same bytes.
  for (const { arm, answer: baseline } of clean) {
    const after = driveArm(arm);
    assert.equal(after.status, baseline.status, `after the restore, "${arm.label}" answers its own status`);
    assert.equal(after.message, baseline.message, `after the restore, "${arm.label}" answers its own message`);
  }
});
