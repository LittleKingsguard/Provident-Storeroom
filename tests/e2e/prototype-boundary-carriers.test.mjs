// tests/e2e/prototype-boundary-carriers.test.mjs
//
// DERIVED INSTRUMENT — `D-35`'s SECOND DEFENCE (THE RUST BOUNDARY): **NOTHING CROSSING INTO RUST IS TRUSTED.**
// `D-35`: *"Every JS-supplied value must be validated by the crate's own carriers, whose 'outside-value arms
// make each refusal reachable' — so the boundary is designed to validate, and any site that assumes instead
// is a defect."*
//
// **WHAT THIS CELL DRIVES, AND WHY IT DRIVES THE ARTEFACT DIRECTLY.** The subject is the BOUNDARY and not the
// surface: the crate's per-verb entries and the carriers they hand a supplied wire value to. **The surface's
// own encoder (`bindings/js/src/entry/carrier.mjs`'s `encodeValue`, `index.mjs`'s `encodeAddress`) classifies a
// caller's value before it crosses — under a hostile `Object.prototype` a lawful call is refused by that walk
// and never reaches the crate at all (measured: `write(['v'],'mem',Object.create({a:1}))` answers the declared
// `ValueRefusedAtBoundary`). So a cell driving only the public members would measure the ENCODER's class
// decision and would be silent about the carriers the ruling names.** This cell therefore loads the staged
// artefact (`bindings/js/build/Release/storeroom_js_binding.node`, the path the entry computes for rung two)
// and calls the entries with the store object the PUBLIC `storeCreate` returned as the receiver — the
// artefact's own published channel (`Symbol.for('provident-storeroom.storeIndex')`), exactly as
// `tests/e2e/addon-adoption.test.mjs`'s `commitFileAct` does.
//
// **THE STATES THIS CELL MEASURED ON THE ARTEFACT BEFORE IT WAS AUTHORED, UNDER BOTH HOSTILE SHAPES** (a
// non-writable own `status`/`message` on `Object.prototype`, and a getter-only accessor — the refusal's own
// prototype is the object under mutation in both):
//
//     a supplied value whose prototype carries the wire members `k`/`s`, at the ADDRESS position
//         → AddressMalformed, the carrier's declared refusal                       (VALIDATED, not read)
//     a supplied value whose prototype carries `k:'T', v:'file'`, at the TIER position
//         → the store answers from `mem`, i.e. the inherited token named NO tier    (VALIDATED, not read)
//     a supplied value whose prototype carries the wire members `k`/`v`, at the OP-ID and HANDLE positions
//         → AddressMalformed, the declared refusal                                  (VALIDATED, not read)
//     the raw native refusal under the mutation, when this cell was written
//         → own=["message"], hasOwnStatus=false — the `facade.rs:170/173` hole; the OWN members are this
//           cell's red state, and they are red for the reason `D-35` gives and not for a cell's preference
//
// **ONE ARM IS AUDITED AND NOT ASSERTED, AND THIS CELL SAYS SO (`D-21`).** The VALUE position is the one place
// the crate is handed a whole JS tree rather than a carrier object: `codec.rs`'s `value_of` casts it with the
// library's `serde_json::Value` conversion, whose object walk takes the runtime's property-name enumeration —
// **which INCLUDES THE PROTOTYPE CHAIN** (measured on the artefact, driven directly here:
// `write(…, Object.create({a:1}), …)` is ADMITTED and reads back `{"a":1}`; driven through the public surface
// with an ENUMERABLE `Object.prototype.injected`, a lawful `write(['v'],'mem',{a:1})` reads back
// `{"a":1,"injected":"P"}`). **That is a boundary assumption and NOT a `D-35` parameter-access hole of the
// surface's own form, and its cure is a SHAPE DECISION** — an own-member-only JSON read in the codec, or a
// null-prototype wire node in the encoder — **so it is REPORTED by the pass that wrote this cell and left
// unasserted rather than frozen into a green cell or silently weakened.** Its drive is kept below as a
// diagnostic so the state is visible in the run and a later pass can see it change.
//
// **WHAT THE RULING LEAVES ALONE, AND THEREFORE WHAT THIS CELL DOES NOT TOUCH.** A frozen store, an
// `Object.getOwnPropertySymbols(store)` read of the kernel record, and a getter planted on `Object.prototype`
// for a registered symbol **are CLIENT-SCOPE BREAKAGE and are NOT defects** (`D-35`); `cdd2467` STANDS and no
// slot descriptor test is added here.
//
// **EACH CELL NAMES ITS CLAUSE AS `path §section`.**

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { storeCreate } from '../../bindings/js/index.mjs';

/** The artefact the entry resolves for rung two — derived from the package root, as `index.mjs` derives it. */
const ADDON_ARTEFACT = fileURLToPath(new URL('../../bindings/js/build/Release/storeroom_js_binding.node', import.meta.url));

/** The artefact's own exports, loaded once — the boundary this cell measures, and not a second surface. */
let ADDON = null;
function addon() {
  if (ADDON === null) {
    ADDON = createRequire(import.meta.url)(ADDON_ARTEFACT);
  }
  return ADDON;
}

/** The wire's address and tier carriers, as `bindings/js/src/entry/carrier.mjs` encodes them. */
const addressWire = (segments) => wireNode([['k', 'L'], ['s', segments]]);
const tierWire = (token) => wireNode([['k', 'T'], ['v', token]]);
const opIdWire = (token) => wireNode([['k', 's'], ['v', token]]);
const handleWire = (token) => wireNode([['k', 'O'], ['v', token]]);
const ABSENT_OP = wireNode([['k', 'U']]);

/**
 * **ONE WIRE NODE, ITS MEMBERS DEFINED AND NEVER `[[Set]]`** — the form the package's own encoder builds
 * (`Object.defineProperty`, `bindings/js/src/entry/refusal.mjs`'s `appendOwn`'s sibling rule), and, beside that,
 * the form `json-crossing.test.mjs`'s `JC-TC-44` allows the JS test tree: the tagged tree is *spelled* by these
 * helpers and no tagged value-tree literal stands in this file's bytes.
 */
function wireNode(members) {
  const node = {};
  for (const [name, value] of members) {
    Object.defineProperty(node, name, { value, writable: true, enumerable: true, configurable: true });
  }
  return node;
}

const PLANTED_STATUS = 'BogusStatus';
const PLANTED_MESSAGE = 'caller authored';

/**
 * **THE HOSTILE REALM, NON-ENUMERABLE.** The two members are planted NON-ENUMERABLE on purpose: an ENUMERABLE
 * member is the audited finding this file reports and does not assert, so no asserted arm of this cell may
 * depend on either answer. Both shapes `D-35` names are driven — the non-writable data property (the shape
 * that drops a native `[[Set]]`) and the getter-only accessor (the refusal's own prototype mutated).
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

/** One drive against the artefact, with the form's own members read off whatever it threw. */
const drive = (call) => {
  try {
    return { threw: false, value: call() };
  } catch (error) {
    const object = error !== null && typeof error === 'object';
    return {
      threw: true,
      status: object ? error.status : undefined,
      message: object ? error.message : undefined,
      ownStatus: object && Object.hasOwn(error, 'status'),
      ownMessage: object && Object.hasOwn(error, 'message'),
      keys: object ? Object.keys(error).sort() : [],
    };
  }
};

test('D-35 §2 (the Rust boundary) · a supplied value whose prototype is hostile is VALIDATED BY A CARRIER at the address, tier, op-id and handle positions — the declared refusal, carrying its OWN status and message — and an own wire tree is ADMITTED unchanged', (t) => {
  // ── THE ARRANGEMENT: a store built through the PUBLIC construction, so the receiver is the object the
  // package published and the artefact's own channel resolves it. One `mem` key is written through the public
  // member, so the tier discriminator below has a token it can tell apart from the store's default.
  const store = storeCreate({ journalLength: 8, listeners: [] });
  store.write(['warm'], 'mem', 'warm');
  const A = addressWire(['warm']);
  const T = tierWire('mem');

  // ── THE CLEAN CONTROL, READ FIRST: every carrier arm below must ANSWER the same bytes on a clean realm, so
  // the hostile run is compared with the package's own answers and this cell mints no sentence of its own.
  const cleanAddress = drive(() => addon().read.call(store, Object.create(addressWire(['warm'])), T));
  const cleanOp = drive(() => addon().rollback.call(store, Object.create(opIdWire('op-1'))));
  const cleanHandle = drive(() => addon().register.call(store, Object.create(handleWire('H1')), undefined));
  const cleanTierControl = drive(() => addon().read.call(store, A, tierWire('file')));
  for (const [label, answer] of [
    ['the address position', cleanAddress], ['the op-id position', cleanOp],
    ['the handle position', cleanHandle], ['the tier control', cleanTierControl],
  ]) {
    assert.equal(answer.threw, true,
      `${label} is decided by a carrier and must refuse a value outside its domain; got ${JSON.stringify(answer)}`);
  }
  assert.equal(cleanAddress.status, 'AddressMalformed',
    'the address carrier\'s outside arm is the store\'s own `AddressMalformed`');
  assert.equal(cleanTierControl.status, 'TierNotFound',
    'the tier carrier admits its own token and the STORE answers a tier the key does not stand at');
  assert.equal(drive(() => addon().read.call(store, A, Object.create(tierWire('file')))).value, 'warm',
    'and the discriminator this cell reads: an INHERITED tier token names no tier, so the store answers from '
    + 'its own default (`mem`) rather than from the prototype — were the inherited token read, this call '
    + 'would answer the tier control\'s `TierNotFound`');

  for (const [shapeName, install] of [['non-writable data properties', installDataShape], ['getter-only accessors', installGetterShape]]) {
    install();
    try {
      // ── (1) THE ADDRESS POSITION: the prototype carries the wire members `k` and `s`; the carrier reads an
      // own property or nothing at all, so the address is ABSENT and the declared refusal answers.
      const address = drive(() => addon().read.call(store, Object.create({ k: 'L', s: ['warm'] }), T));
      assert.equal(address.threw, true,
        `(${shapeName}) an address whose k/s stand on the prototype must refuse; got ${JSON.stringify(address)}`);
      assert.equal(address.status, 'AddressMalformed',
        `(${shapeName}) the address carrier answers its declared status`);
      assert.equal(address.message, cleanAddress.message, `(${shapeName}) byte for byte the clean realm's answer`);

      // ── (2) THE OP-ID POSITION: the prototype carries `k:'s'`, and an op id it did not own is ABSENT.
      const op = drive(() => addon().rollback.call(store, Object.create(opIdWire('op-1'))));
      assert.equal(op.threw, true, `(${shapeName}) an op id carried only by the prototype must refuse`);
      assert.equal(op.status, 'AddressMalformed', `(${shapeName}) the op-id carrier answers its declared status`);
      assert.equal(op.message, cleanOp.message, `(${shapeName}) byte for byte the clean realm's answer`);

      // ── (3) THE HANDLE POSITION: the prototype carries `k:'O'`, an opaque handle it did not own.
      const handle = drive(() => addon().register.call(store, Object.create({ k: 'O', v: 'H1' }), undefined));
      assert.equal(handle.threw, true, `(${shapeName}) a handle carried only by the prototype must refuse`);
      assert.equal(handle.status, 'AddressMalformed', `(${shapeName}) the handle carrier answers its declared status`);
      assert.equal(handle.message, cleanHandle.message, `(${shapeName}) byte for byte the clean realm's answer`);

      // ── (4) THE DECLARED FORM ITSELF, WHICH IS `D-35`'s OWN SECOND NAMED HOLE: the refusal crosses with its own
      // `status` and `message` DEFINED. Measured before the cure: `own=["message"]`, `hasOwnStatus=false`, and
      // `status` answered the prototype's string.
      for (const [label, answer, baseline] of [
        ['address', address, cleanAddress], ['op id', op, cleanOp], ['handle', handle, cleanHandle],
      ]) {
        assert.equal(answer.ownStatus, true,
          `(${shapeName}) the ${label} refusal's \`status\` is an OWN member — the native half defines it rather `
          + 'than `[[Set]]`ting it through a chain the caller can block (`facade.rs:170`)');
        assert.equal(answer.ownMessage, true,
          `(${shapeName}) the ${label} refusal's \`message\` is an OWN member (\`facade.rs:173\`)`);
        assert.equal(answer.status, baseline.status,
          `(${shapeName}) the ${label} refusal's status is the one it answers on a clean realm; got `
          + `${JSON.stringify(answer.status)} where the clean realm answered ${JSON.stringify(baseline.status)}`);
        assert.equal(answer.message, baseline.message,
          `(${shapeName}) the ${label} refusal's message is byte for byte the clean realm's`);
        assert.notEqual(answer.status, PLANTED_STATUS,
          `(${shapeName}) the ${label} refusal must not answer the prototype's status`);
        assert.notEqual(answer.message, PLANTED_MESSAGE,
          `(${shapeName}) the ${label} refusal must not answer the prototype's message`);
        assert.deepEqual(answer.keys, ['message', 'status'],
          `(${shapeName}) the native form carries \`status\` and \`message\` and nothing else — the third member `
          + 'is the JS boundary\'s and is attached there (`failure-form.md §1` adjudication (4))');
      }

      // ── (5) THE ADMITTED ARM: a value whose members are its OWN crosses as the tree it is, and comes back
      // exactly. **THIS IS THE RULING'S OTHER ANSWER — *admitted* — AND IT IS ASSERTED SO THE REFUSALS ABOVE
      // CANNOT BE READ AS "THE BOUNDARY REFUSES EVERYTHING UNDER A MUTATION".**
      const written = drive(() => addon().write.call(store, addressWire(['own']), T, { a: 1 }, ABSENT_OP));
      assert.equal(written.threw, false,
        `(${shapeName}) an own wire tree is admitted; got ${JSON.stringify(written)}`);
      const answered = drive(() => addon().read.call(store, addressWire(['own']), T));
      assert.equal(answered.threw, false, `(${shapeName}) the admitted value is read back`);
      assert.deepEqual(answered.value, { a: 1 },
        `(${shapeName}) the value crosses as the tree it is and reads back exactly; got `
        + `${JSON.stringify(answered.value)}`);

      // ── (6) THE AUDITED ARM — REPORTED, NOT ASSERTED (`D-21`): the VALUE position's class. The codec casts the
      // tree with the library's JSON conversion, whose enumeration INCLUDES THE PROTOTYPE CHAIN, so a
      // prototype-carrying value is admitted here rather than refused by a carrier. Its cure is a shape
      // decision (`codec.rs`'s `value_of` reading own members only, or a null-prototype wire node in the
      // encoder), and this pass reports it rather than freezing either answer into this cell.
      const audited = drive(() => addon().write.call(store, addressWire(['audited']), T, Object.create({ a: 1 }), ABSENT_OP));
      t.diagnostic(`D-35 §2 audited arm (${shapeName}): a prototype-carrying value at the VALUE position is `
        + `${audited.threw ? `refused as ${JSON.stringify(audited.status)}` : 'ADMITTED'} — reported, not `
        + 'asserted: the carrier validates no class here and the cure is a shape decision');
    } finally {
      restoreRealm();
    }
    assertRestored();
  }

  // ── AND THE PUBLIC SURFACE'S OWN GATE, MEASURED SO THE AUDITED ARM ABOVE IS NOT READ AS REACHABLE THROUGH IT:
  // the package's walk refuses a prototype-carrying value in the one declared form before any store verb.
  const fromTheSurface = drive(() => store.write(['hvp'], 'mem', Object.create({ a: 1 })));
  assert.equal(fromTheSurface.threw, true,
    'a prototype-carrying value supplied to the PUBLIC write is refused by the package\'s own walk');
  assert.equal(fromTheSurface.status, 'ValueRefusedAtBoundary',
    'and the refusal is the declared one: `ValueRefusedAtBoundary`, the class the crossing does not admit');
});
