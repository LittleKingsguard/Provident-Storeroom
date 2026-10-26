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
// **⟶ THE VALUE POSITION WAS THE ONE ARM AUDITED AND NOT ASSERTED (`D-21`), AND IT IS NOW ASSERTED — ITS CURE
// LANDED ON THE JS SIDE, 2026-10-25 (`RCA-8(g)`; the architect's ruling, verbatim: *"Cast into JSON in the JS
// side of the interface."*).** The VALUE position is the one place the crate is handed a whole JS tree rather
// than a carrier object: `codec.rs`'s `value_of` casts it with the library's `serde_json::Value` conversion,
// whose object walk takes the runtime's property-name enumeration — **which INCLUDES THE PROTOTYPE CHAIN.**
// **THE MEASURED STATE, BEFORE THE CURE** (driven on the artefact and through the public surface, both with an
// ENUMERABLE `Object.prototype.injected`): a lawful `write(['v'],'mem',{a:1})` read back
// `{"a":1,"injected":"P"}` at the root and at EVERY NESTING DEPTH, and `write(…, Object.create({a:1}), …)` driven
// at the artefact directly is ADMITTED and reads back `{"a":1}`. **THE RULING PUT THE CURE ON THE CARRIER'S
// SIDE AND NOT IN THE CODEC**: the carrier now hands the boundary a WIRE value whose objects are
// `Object.create(null)` nodes carrying exactly the admitted own members, built by DEFINING them — so the
// codec's cast keeps its simple form and has no prototype to read. `codec.rs` is untouched by the cure and the
// drive below still shows, as a REPORTED residual and not an assertion, that a value driven into the artefact
// with the caller's own prototype still crosses with what the chain carries.
//
// **THE CLASS DECISION IS UNMOVED BY THE FORM CHANGE, AND THE TWO ANSWERS ARE NAMED BECAUSE THEY DIFFER.**
// A caller object with a prototype that carries an enumerable member is ADMITTED and crosses with that member
// ABSENT (it was never an own member, so the walk never read it — `contract.md §1`'s clause of 2026-10-24, item
// `(3)`, mutation-independence), while `Object.create({a:1})` is REFUSED as row `14`, `a class instance or
// another prototype-carrying non-plain object`, because its prototype's own prototype is an `Object.prototype`
// and so the link is not TERMINAL (`§1` item `(1)(b)`; the bullet list's *"any other prototype-carrying object
// … refuse the whole value"*). **A `null`-prototype WIRE NODE is not that class and is not a new admission**:
// `§1` item `(1)`'s own parenthesis admits it — *"A `null`-prototype object is not this limb; it carries no
// prototype at all, and it is admitted through `§3`'s `p` classification `null`"*.
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
// **THE CARRIER'S VALUE PATH, IMPORTED SO THE CROSSING'S FORM IS READ AT ITS PRODUCER** — `encodeValue` is the
// only producer of the value position's wire tree (`bindings/js/index.mjs` hands the artefact the array it
// returns, and nothing else mints a value node). This is the tree's own producer read directly, as
// `prototype-refusal-form.test.mjs` reads `refusal.mjs`'s `fail`; no second surface is invented here.
import { encodeValue } from '../../bindings/js/src/entry/carrier.mjs';

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

      // ── (6) THE RESIDUAL ARM — REPORTED, NOT ASSERTED (`D-21`), AND IT IS NOW THE **DIRECT-ARTEFACT** ARM
      // ONLY. The codec casts the tree with the library's JSON conversion, whose enumeration INCLUDES THE
      // PROTOTYPE CHAIN, so a caller value driven STRAIGHT INTO THE ARTEFACT still crosses with whatever its
      // chain carries. **THE PRODUCT'S ROUTE IS CLOSED** — the carrier's walk now hands the boundary
      // `Object.create(null)` wire nodes (the cell below asserts it, at every depth), and a value the walk
      // refuses never reaches the artefact at all — so what stands here is the unpublished channel this cell
      // drives, and it is reported rather than frozen: the ruling put the cure on the carrier's side and left
      // the codec's cast in its simple form, and this drive is the state that remains.
      const audited = drive(() => addon().write.call(store, addressWire(['audited']), T, Object.create({ a: 1 }), ABSENT_OP));
      t.diagnostic(`D-35 §2 residual arm (${shapeName}): a prototype-carrying value driven STRAIGHT INTO the `
        + `artefact at the VALUE position is `
        + `${audited.threw ? `refused as ${JSON.stringify(audited.status)}` : 'ADMITTED'} — reported, not `
        + 'asserted: the product\'s route through the carrier refuses it, and the carrier\'s wire form is '
        + 'asserted by the crossing-form cell below');
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

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// THE CROSSING FORM OF AN ADMITTED VALUE — `D-35`'s `§2` SECOND DEFENCE MEASURED AT THE WIRE, AND THE CELL
// THE RULING'S CURE OWES: *"Cast into JSON in the JS side of the interface."*
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/// **EVERY OBJECT NODE OF A WIRE TREE, WITH ITS PROTOTYPE** — the census the crossing-form arm reads.
/// An ARRAY is a node of the array class and is walked by index: the carrier keeps the `appendOwn` route for
/// arrays, unchanged (`§1`'s array limb). Every OTHER object node of an admitted tree must carry no prototype at
/// all, because `codec.rs`'s `value_of` takes the value it is handed as JSON and walks the enumeration the
/// runtime offers — **INCLUDING THE PROTOTYPE CHAIN.** The walk is a local index loop over `Object.keys`'s
/// result, per this file's own rule.
function wireObjectNodes(value, at = '$', out = []) {
  if (value === null || typeof value !== 'object') return out;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) wireObjectNodes(value[i], `${at}[${i}]`, out);
    return out;
  }
  out.push({ at, proto: Object.getPrototypeOf(value) });
  const names = Object.keys(value);
  for (let i = 0; i < names.length; i += 1) wireObjectNodes(value[names[i]], `${at}.${names[i]}`, out);
  return out;
}

/// **EVERY OWN MEMBER NAME AT EVERY DEPTH OF A READ-BACK**, so an arm can assert that a prototype-carried
/// member appears NOWHERE in what the store answered — and not merely at the root.
function ownNamesAtEveryDepth(value, out = []) {
  if (value === null || typeof value !== 'object') return out;
  const names = Object.keys(value);
  for (let i = 0; i < names.length; i += 1) {
    out.push(names[i]);
    ownNamesAtEveryDepth(value[names[i]], out);
  }
  return out;
}

test('D-35 §2 (the Rust boundary) · THE VALUE POSITION CROSSES AS A WIRE FORM THE CARRIER OWNS — `Object.create(null)` object nodes carrying exactly the admitted own members, built by DEFINING them — so no admitted value gains a prototype-carried member at ANY depth, while the class decisions, the ceilings and the refusal codes stand unmoved', (t) => {
  const store = storeCreate({ journalLength: 8, listeners: [] });
  const T = tierWire('mem');
  const HOSTILE_MEMBER = 'injected';
  const HOSTILE_VALUE = 'P';
  /** ONE ENUMERABLE OWN MEMBER ON `Object.prototype` — **the shape the measured defect needed**, and the shape
   * `contract.md §1`'s clause of 2026-10-24, item `(3)`, says the class decision may not see. */
  const installEnumerablePrototypeMember = () => {
    Object.defineProperty(Object.prototype, HOSTILE_MEMBER, {
      value: HOSTILE_VALUE, writable: true, enumerable: true, configurable: true,
    });
  };
  const restoreEnumerablePrototypeMember = () => { delete Object.prototype[HOSTILE_MEMBER]; };

  // ── THE LAWFUL ROUND-TRIP CONTROL, TAKEN FIRST AND ON A CLEAN REALM, so every hostile arm below is read
  // against the package's own answer and this cell mints no spelling of its own. **THE STORE'S CANONICAL
  // SPELLING SORTS AN OBJECT'S OWN MEMBER NAMES** (`{ b: 2, a: 1 }` reads back `{"a":1,"b":2}`), so each expected
  // string below is written in that canonical order and the values are written in it too.
  const PLAIN = { a: 1 };
  const NESTED = { a: 1, b: { c: 2 }, d: [{ e: 3 }, [4, { f: 5 }]] };
  const ARRAY_OF_OBJECTS = [{ a: 1 }, { b: 2 }];
  const NESTED_SPELLING = '{"a":1,"b":{"c":2},"d":[{"e":3},[4,{"f":5}]]}';
  for (const [label, address, value, want] of [
    ['a plain object', ['round-plain'], PLAIN, '{"a":1}'],
    ['a nested object', ['round-nested'], NESTED, NESTED_SPELLING],
    ['an array of objects', ['round-array'], ARRAY_OF_OBJECTS, '[{"a":1},{"b":2}]'],
  ]) {
    store.write(address, 'mem', value);
    const back = store.read(address, 'mem');
    assert.equal(JSON.stringify(back), want,
      `the clean-realm control: ${label} reads back exactly what was written, in the store's canonical `
      + `spelling; got ${JSON.stringify(back)}`);
  }
  // AND THE ARRAY WHOSE HOLES ARE REFUSED KEEPS ITS DECLARED REFUSAL — an index below `length` with no OWN
  // property is a hole (`§2` row `16`), refused at the walk before any store verb, under the one code.
  const holes = drive(() => store.write(['round-holes'], 'mem', [1, , 3]));
  assert.equal(holes.threw, true,
    'an array carrying a hole is refused exactly as it was before the crossing\'s form moved; got '
    + `${JSON.stringify(holes)}`);
  assert.equal(holes.status, 'ValueRefusedAtBoundary', 'and its status is the declared one');
  assert.ok(String(holes.message).includes('a sparse array'),
    `and its class is row 16's own spelling; got ${JSON.stringify(holes.message)}`);

  installEnumerablePrototypeMember();
  try {
    // ── (1) A CALLER OBJECT WHOSE PROTOTYPE CARRIES AN ENUMERABLE MEMBER CROSSES WITH THAT MEMBER ABSENT.
    // The walk reads `Object.keys(value)` — OWN enumerable string keys — so `injected` was never a member of the
    // tree; the wire node's `null` prototype is what stops the codec's cast from finding it on the way in.
    store.write(['carried-plain'], 'mem', PLAIN);
    const carriedPlain = store.read(['carried-plain'], 'mem');
    t.diagnostic(`D-35 §2 crossing form: with an enumerable \`Object.prototype.${HOSTILE_MEMBER}\` = `
      + `${JSON.stringify(HOSTILE_VALUE)} installed, \`write(['carried-plain'],'mem',{a:1})\` read back `
      + `${JSON.stringify(carriedPlain)}; own names at every depth: `
      + `${JSON.stringify(ownNamesAtEveryDepth(carriedPlain))}`);
    assert.equal(JSON.stringify(carriedPlain), '{"a":1}',
      'a caller object whose prototype carries an enumerable member crosses with that member ABSENT — the wire '
      + `form's objects carry no prototype to read; got ${JSON.stringify(carriedPlain)}`);
    assert.deepEqual(ownNamesAtEveryDepth(carriedPlain), ['a'],
      'and no inherited member is an own member of the answer, at any depth');

    // ── (2) THE SAME AT EVERY NESTING DEPTH: an object inside an object, and an object inside an ARRAY.
    store.write(['carried-nested'], 'mem', NESTED);
    const carriedNested = store.read(['carried-nested'], 'mem');
    assert.equal(JSON.stringify(carriedNested), NESTED_SPELLING,
      'a nested admitted value crosses as the tree it is, at every depth — measured before the cure as '
      + `{"a":1,"b":{"c":2,"injected":"P"},"d":[{"e":3,"injected":"P"},[4,{"f":5,"injected":"P"}]],"injected":"P"}; `
      + `got ${JSON.stringify(carriedNested)}`);
    const carriedNames = ownNamesAtEveryDepth(carriedNested);
    for (let i = 0; i < carriedNames.length; i += 1) {
      assert.notEqual(carriedNames[i], HOSTILE_MEMBER,
        `no admitted value gains a prototype-carried member at any nesting depth: \`${HOSTILE_MEMBER}\` was `
        + `read back at depth ${i} of ${JSON.stringify(carriedNames)}`);
    }
    store.write(['carried-array'], 'mem', ARRAY_OF_OBJECTS);
    const carriedArray = store.read(['carried-array'], 'mem');
    assert.equal(JSON.stringify(carriedArray), '[{"a":1},{"b":2}]',
      'an array of objects crosses unchanged — the carrier\'s `appendOwn` route is untouched by this form — and '
      + `its elements gain nothing from the chain; got ${JSON.stringify(carriedArray)}`);

    // ── (3) AND THE WRITE'S OWN RECORD CARRIES THE SAME ANSWER: the crossing's value is the one the record's
    // `after.value` holds, so the hostile member cannot appear there either.
    const recorded = store.write(['carried-record'], 'mem', PLAIN);
    assert.equal(JSON.stringify(recorded.op.after.value), '{"a":1}',
      'the write record\'s own crossed value carries the admitted members and nothing from the chain; got '
      + `${JSON.stringify(recorded.op.after.value)}`);

    // ── (4) THE FORM ITSELF, READ AT THE CARRIER: every OBJECT node of `encodeValue`'s tree has a `null`
    // prototype, carries exactly the admitted own members in the declared member order, and the tree it builds
    // is the tree the artefact admits — driven straight into the artefact below, which is exactly `codec.rs`'s
    // cast reading it.
    const fault = { found: null, value: undefined, path: [], subject: null, nodes: 0 };
    const wire = encodeValue(NESTED, [], 0, [], fault);
    assert.equal(fault.found, null,
      'the carrier ADMITS the lawful tree, so the form below is the form of an ADMITTED crossing');
    const nodes = wireObjectNodes(wire);
    t.diagnostic(`D-35 §2 crossing form: \`encodeValue\`'s object nodes — `
      + `${nodes.map((node) => `${node.at}:${node.proto === null ? 'null-prototype' : 'PROTOTYPE-CARRYING'}`).join(' ')}`);
    for (let i = 0; i < nodes.length; i += 1) {
      assert.equal(nodes[i].proto, null,
        `every object node of the wire value carries NO prototype (\`Object.create(null)\`), so the codec's cast `
        + `has nothing but own members to read; node ${nodes[i].at} carries one`);
    }
    assert.deepEqual(Object.keys(wire), ['a', 'b', 'd'],
      'and the node carries exactly the admitted own members, in the declared member order');
    assert.equal(Object.hasOwn(wire, HOSTILE_MEMBER), false,
      'and the hostile member is not an own member of the node, so no cast can reach it');
    const wireWrote = drive(() => addon().write.call(store, addressWire(['wire-form']), T, wire, ABSENT_OP));
    assert.equal(wireWrote.threw, false,
      `the wire value is ADMITTED by the artefact's own cast; got ${JSON.stringify(wireWrote)}`);
    const wireBack = drive(() => addon().read.call(store, addressWire(['wire-form']), T));
    assert.equal(wireBack.threw, false, 'and it is read back');
    assert.equal(JSON.stringify(wireBack.value), NESTED_SPELLING,
      'the carrier\'s own wire value crosses as exactly the tree it holds — no member added by the chain; got '
      + `${JSON.stringify(wireBack.value)}`);

    // ── (5) `Object.create({a:1})` AT THE VALUE POSITION: **THE DECLARED REFUSAL, AND NEVER THE INHERITED
    // MEMBER.** The contract decides the class and this cell cites it: `§1`'s object limb requires the value's
    // prototype to be TERMINAL — `[[GetPrototypeOf]]([[GetPrototypeOf]](value))` is `null`, `§1`'s clause of
    // 2026-10-24, item `(1)(b)` — and `Object.create({a:1})`'s prototype is `{a:1}`, whose own prototype is an
    // `Object.prototype`; the bullet list's own words are *"any other prototype-carrying object … refuse the
    // whole value (`§2`)"*, and the row is `14`, `a class instance or another prototype-carrying non-plain
    // object`. **IT IS REFUSED HERE, BEFORE ANY STORE VERB, SO NO INHERITED MEMBER CROSSES AT ALL** — the
    // alternative reading, own-members-only admission, is the one `§1`'s limb does not support.
    const inherited = drive(() => store.write(['inherited'], 'mem', Object.create(PLAIN)));
    t.diagnostic(`D-35 §2 crossing form: \`Object.create({a:1})\` at the value position answers `
      + `${inherited.threw ? `${JSON.stringify(inherited.status)} — ${JSON.stringify(inherited.message)}` : 'ADMISSION'}`);
    assert.equal(inherited.threw, true,
      '`Object.create({a:1})` at the value position is REFUSED by the carrier\'s own walk; got '
      + `${JSON.stringify(inherited)}`);
    assert.equal(inherited.status, 'ValueRefusedAtBoundary',
      'and the refusal is the declared one, `ValueRefusedAtBoundary`, not an admission and never `{"a":1}`');
    assert.ok(String(inherited.message).includes('a class instance or another prototype-carrying non-plain object'),
      `and its class is row 14's own spelling; got ${JSON.stringify(inherited.message)}`);
    const neverCrossed = drive(() => store.read(['inherited'], 'mem'));
    assert.equal(neverCrossed.threw, true,
      'nothing crossed: the address that refused write would have made does not exist');
    assert.equal(neverCrossed.status, 'AddressNotFound',
      'and the store\'s own answer for it is `AddressNotFound`, i.e. the inherited member never became a value');
  } finally {
    restoreEnumerablePrototypeMember();
  }
  assert.equal(Object.hasOwn(Object.prototype, HOSTILE_MEMBER), false,
    'the drive must restore the realm: the enumerable member is no longer an own member of `Object.prototype`');
  assert.equal(HOSTILE_MEMBER in {}, false,
    'and the restore is proved a second way: no member is carried by the chain');
});
