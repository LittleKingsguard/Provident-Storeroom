// `@provident-storeroom/js` — **THE CLAIMED REALM: Node ESM, ALONE** (`package.md §1.1`, `A70`).
//
// **THE ONE ARMS-BEARING ENTRY** (`package.md §1.3` item 1, `DD-24`) — the `exports` map publishes it and
// publishes nothing else: no wildcard, no deep import to the addon and no CJS arm (`§1.2`, `HO-1`).
//
// ---------------------------------------------------------------------------------------------
// THE ROUTE, AND THE SHAPE THE ARCHITECT'S RULING `A75` FIXED: `JS -> facade -> core -> store`
// ---------------------------------------------------------------------------------------------
//
// **THIS FILE IS A MAPPING LAYER AND NOTHING ELSE** (`docs/specs/storeroom-js-proposal.md §17` · `A75`,
// verbatim: *"Proceed V-1"*; `package.md §4.4`'s `V1`, `§4.5` item 1). **EVERY VERB OF `surface.md §2`
// CONSTRUCTS THE CROSSING MODEL, HANDS IT TO THE ADDON'S `storeCreate`/`call` DISPATCH, AND MAPS THE
// ADDON'S ANSWER BACK INTO JS VALUES.** **THE STORE'S OWN LOGIC IS THE RUST CORE'S**
// (`bindings/js/src/crossing.rs`): the register tree, the anchors, the journal and its compaction, the
// listener home and the prefix test, the file image and its boot, the fifteen-member fail set and its
// generated messages are ALL reached through the facade, and NOTHING of them is re-implemented here.
//
// **WHAT STAYS IN JS, AND WHY IT IS NOT STORE LOGIC** (`A75`: *"THE REGISTRY, THE OPAQUE HANDLE AND THE
// SINGLE FAILURE FORM STAY IN JS (they are the PACKAGE's surface, `§2.4`)"*):
//   * **THE PACKAGE'S OWN OPAQUE HANDLE** (`surface.md §2.3` item 2, `DD-14`): a frozen, memberless JS
//     object whose token is private — the store's token crosses OUT of the addon and is wrapped here.
//   * **THE PACKAGE'S OWN REGISTRY** (`surface.md §2.4`): the caller's FUNCTION, held per instance and
//     reached through the ONE member `storeCreate` returns (`register(handle, listener)`). **The store
//     returns handles and invokes nothing** (`A57`), so the invocation is the package's — performed after
//     the addon's call has returned, with the triggering ADDRESS as its ONE argument (`PAR-JS-12`).
//   * **THE SINGLE FAILURE FORM** (`surface.md §2.5`, `DD-12`): the addon THROWS the store's own
//     `{status, message}` and this file re-throws THAT OBJECT UNCHANGED — **no status is minted here, no
//     message is authored here, and no code outside the store's closed set can be produced by this file.**
//   * **THE FOUR CLASS DECISIONS THE WALK OWES** (`crossing.md §1.4` items 1–4; `DD-8`, `DD-34`): an own
//     `Symbol`-keyed property, a hole, an own accessor and a `Proxy` are decided at the JS boundary — where
//     `DD-34` puts proxy detection — and carried to the core as DATA, beside the DECIDED tree.
//
// **THE COPY DISCIPLINE** (`crossing.md §1.1`, `A65`): every value that crosses IN is read once and
// converted into data the boundary owns, and every value that crosses OUT is fresh data no other side can
// reach — no proxy, no live view, no getter, no borrow and no pointer, in either direction.

import { createRequire } from 'node:module';
import { dirname as dirOf, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from 'node:util';

const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

// ---------------------------------------------------------------------------------------------
// THE DECLARED ABSENT/FAILED-ADDON STATE (`A75`: *"an addon that is absent or fails to load is a DECLARED
// FAILURE and never a silent JS store (`V-3` was refused by this choice)"*).
//
// **THERE IS NO FALLBACK, BECAUSE THERE IS NO SECOND IMPLEMENTATION.** `require_(ADDON_PATH)` is called
// ONCE; if the artefact is absent, unreadable or refuses to load, the construction answers `§2.5`'s
// SINGLE FAILURE FORM and NO instance is returned — the package never falls back to a JS store and never
// absorbs the state silently.
//
// **THE DECLARED STATE:** an addon that is absent or fails to load answers
// `{status: 'FilePathUnreachable', message: <the store's own generated string for that code at the
// addon's own path>}`. The status is a member of the store's closed `15`-member set carried VERBATIM
// (`§2.5` item 1, `DD-40`) and is not minted here; the message is the STORE'S generator's string, reached
// through the addon where it loaded far enough to carry the generator (`errorMessage`), and the ONE string
// stated at its own site where the generator itself is the thing that failed to load.
// **THE ROW THAT PINS THIS STATE IS `P-TP-7`'s `S-LOAD`, and no clause of the contract names a status or a
// message-home for it** — reported as a CONTRACT FINDING rather than repaired here.
// ---------------------------------------------------------------------------------------------
let addon = null;
let addonLoadError = null;

function loadAddon() {
  if (addon !== null || addonLoadError !== null) return;
  try {
    addon = require_(ADDON_PATH);
  } catch (err) {
    addon = null;
    addonLoadError = err;
  }
}

function addonLoadMessage() {
  if (addon !== null && typeof addon.errorMessage === 'function') {
    return addon.errorMessage('FilePathUnreachable', ADDON_PATH);
  }
  return `'${ADDON_PATH}' is not reachable at construction, the path must exist or the application must be able to write it`;
}

/// `surface.md §2.5`: **THE SINGLE FAILURE FORM** — a THROWN plain object carrying EXACTLY
/// `{status, message}` and nothing else. **The status and the message are the store's own and are carried
/// VERBATIM** (`§2.5` items 1–2, `DD-40`): `fail` re-throws the addon's own object, so no code is minted
/// here and no message is authored here.
function fail(refusal) {
  throw { status: refusal.status, message: refusal.message };
}

function withAddon() {
  loadAddon();
  if (addon === null) fail({ status: 'FilePathUnreachable', message: addonLoadMessage() });
  return addon;
}

// ---------------------------------------------------------------------------------------------
// THE CROSSING MODEL, ENCODED FOR THE CORE — `bindings/js/src/facade.rs` states the protocol, and this
// section is its only producer. **The four class decisions are TAKEN HERE and carried as data**; every
// other rule of `crossing.md §1.4` is the core's (`package.md §4.5` item 3 (c)).
// ---------------------------------------------------------------------------------------------

/// `crossing.md §1.2` row 1's dated clause of 2026-10-11 and `§1.4` item 9: **a JS `string` carrying a
/// LONE SURROGATE is REFUSED `ValueNotAdmitted` AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED** —
/// no Rust `String` can carry one, and the value is never silently replaced, dropped or normalized into a
/// replacement character. **The class is BOUNDARY-ONLY and this is its one site.**
function hasLoneSurrogate(text) {
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      i += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

/// `Object.prototype`'s own property names — `['constructor', '__proto__']` — read ONCE from THIS realm's
/// own prototype. **They are the KEY SET the (e)-half of the plain-object test compares against.**
const PLAIN_PROTO_NAMES = new Set(Object.getOwnPropertyNames(Object.prototype));

/// `crossing.md §1.4` item 4: **THE PLAIN-OBJECT TEST**, items (a)–(g) — **STRUCTURAL AND REALM-AGNOSTIC.**
/// **The prototype half is NOT an identity test against this realm's `Object.prototype`**: the prototype
/// is `null`, or a prototype whose OWN properties are exactly the plain-object prototype's. **A plain
/// object from ANY realm (`vm`, a worker, `structuredClone`) is therefore ACCEPTED** — its prototype is
/// that realm's own `Object.prototype`, whose own names are this realm's own two — **while a CLASS INSTANCE
/// is refused, because a class's prototype carries its own `constructor`** (`DD-7`, `DD-35`).
function protoClass(value) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  let names;
  try {
    names = Object.getOwnPropertyNames(proto);
  } catch {
    return 'class';
  }
  if (names.length !== PLAIN_PROTO_NAMES.size) return 'class';
  for (const name of names) if (!PLAIN_PROTO_NAMES.has(name)) return 'class';
  return proto === Object.prototype ? 'plain' : 'foreign';
}

/// `crossing.md §1.4` item 4 (c), (d) and item 1: an own ACCESSOR, or an own `Symbol`-keyed property,
/// REFUSES THE WHOLE VALUE — *"any other answer would DROP A MEMBER SILENTLY"* (`DD-8`).
function accessorOrSymbolArm(value) {
  for (const name of Object.getOwnPropertyNames(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, name);
    if (descriptor.get || descriptor.set) return { k: 'P' };
  }
  return Object.getOwnPropertySymbols(value).length > 0 ? { k: 'y' } : null;
}

/// The `JsValue` model of `crossing.md §1.2`, encoded member for member. **The walk reads each member ONCE
/// and carries its OWN ancestor stack — never a `WeakSet` of visited objects, which would refuse an
/// acyclic DIAMOND** (`§1.4` item 6, `DD-11`).
///
/// **THE DEPTH CEILING IS THE CORE'S DECLARATION AND THE ENCODER IS BOUNDED BESIDE IT** (`§1.4` item 5,
/// `DD-10`): the encoder's own nesting bound is `65` — one PAST the declared `64` — so the value the
/// declared ceiling refuses is still encoded, handed to the core, and refused THERE with the store's own
/// `ValueNotAdmitted` and the store's own generated message. A deeper value is carried as the outside class
/// the ceiling names, so the same declared answer reaches the caller without a second rule.
const ENCODER_CEILING = 65;

function encodeValue(value, ancestors, depth) {
  if (depth > ENCODER_CEILING) return { k: 'c' };
  if (value === null) return { k: 'z' };
  const kind = typeof value;
  if (kind === 'undefined') return { k: 'u' };
  if (kind === 'string') return hasLoneSurrogate(value) ? { k: 'c' } : { k: 's', v: value };
  if (kind === 'boolean') return { k: 'b', v: value };
  if (kind === 'number') return Number.isFinite(value) ? { k: 'n', v: value } : { k: 'F', v: value };
  if (kind === 'bigint') return { k: 'g', v: value.toString() };
  if (kind === 'function') return { k: 'f' };
  if (kind === 'symbol') return { k: 'y' };
  if (types.isProxy(value)) return { k: 'P' }; // `§1.4` item 4 (g), `DD-34`
  if (ancestors.includes(value)) return { k: 'c' }; // `§1.4` item 6: the ancestor stack, never a `WeakSet`
  const next = [...ancestors, value];
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      if (!(i in value)) return { k: 'H' }; // `§1.4` item 2: a hole refuses the WHOLE value (`DD-8`)
    }
    const refusal = accessorOrSymbolArm(value);
    if (refusal !== null) return refusal;
    const members = [];
    for (const item of value) members.push(encodeValue(item, next, depth + 1));
    return { k: 'a', i: members };
  }
  const proto = protoClass(value);
  if (proto === 'class') return { k: 'P' }; // `§1.4` item 4 (f): a class instance is REFUSED
  const refusal = accessorOrSymbolArm(value);
  if (refusal !== null) return refusal;
  const members = [];
  for (const name of Object.keys(value)) {
    // `§1.2` row 7 / `§1.4` item 3: an `{a: undefined}` member is SEEN and REFUSED, and **the key is NEVER
    // dropped** — the member is encoded and the core's own taxonomy answers `ValueNotAdmitted`.
    members.push([name, encodeValue(value[name], next, depth + 1)]);
  }
  return { k: 'o', m: members, p: proto, acc: false, proxy: false };
}

/// `crossing.md §1.3`'s `Segment`: a string or a non-negative integer is admitted, and EVERY outside class
/// is carried as its own variant so the STORE produces the code (`DD-1`) — the package mints none.
function encodeSegment(segment) {
  if (typeof segment === 'string' || typeof segment === 'number' || typeof segment === 'boolean') {
    return segment;
  }
  if (segment === null) return { bad: 'null' };
  if (segment === undefined) return { bad: 'undefined' };
  if (typeof segment === 'function') return { bad: 'function' };
  if (Array.isArray(segment)) return { bad: 'array' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `AddressArg` table, rows 1–14.
function encodeAddress(address) {
  // `crossing.md §1.3`'s absent-versus-`undefined` rule, rule 1: an argument position the call supplied no
  // value for is ABSENT, and `undefined` at a supplied position folds to that SAME state. `AddressArg` rows
  // 4 and 5 answer the one code, so no declared answer moves by the fold.
  if (address === undefined) return { k: 'A' };
  if (address === null) return { k: 'N' };
  if (Array.isArray(address)) {
    if (types.isProxy(address)) return { k: 'X' }; // row 12 (`DD-34`)
    for (let i = 0; i < address.length; i += 1) {
      if (!(i in address)) return { k: 'S' }; // row 14 (`DD-8`)
    }
    return { k: 'L', s: address.map(encodeSegment) }; // rows 1–3 and 13
  }
  if (typeof address === 'object') return { k: 'C' }; // rows 6 and 11: the shape is not an array's
  return { k: 'D', o: encodeSegment(address) }; // row 6: a non-array's five named classes
}

/// `crossing.md §1.3`'s `TierArg` table and `TierSetItem` table.
///
/// **THE TWO READERS AND THE TWO WRITERS ARE READ DIFFERENTLY, AND `§1.3` SAYS SO:** rule 1 reads a VERB's
/// trailing argument BY CALL ARITY and folds a supplied `undefined` to the ABSENT row **for `read` ·
/// `readLiteral` and `write`** — which is why `read(i, a, undefined)` answers the value while `read(i, a,
/// null)` answers row 4 — **while `delete`'s `tier` is reached as a VALUE, and its own `null`/`undefined`
/// row is row 4's `AddressMalformed`.**
function encodeTier(tier, supplied, foldsUndefined) {
  if (!supplied) return { k: 'A' };
  if (tier === undefined) return foldsUndefined ? { k: 'A' } : { k: 'U' };
  if (tier === null) return { k: 'N' };
  if (typeof tier === 'string') return { k: 'T', v: tier };
  if (Array.isArray(tier)) return { k: 'S', i: tier.map(encodeTierSetItem) };
  if (typeof tier === 'number') return { k: 'D', v: tier };
  if (typeof tier === 'boolean') return { k: 'B', v: tier };
  if (typeof tier === 'function') return { k: 'F' };
  return { k: 'O' };
}

function encodeTierSetItem(item) {
  if (item === null) return { bad: 'null' };
  if (item === undefined) return { bad: 'undefined' };
  if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') return item;
  if (typeof item === 'function') return { bad: 'function' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `OpIdArg` table, `6` rows.
function encodeOpId(opId) {
  if (opId === undefined) return { k: 'U' };
  if (opId === null) return { k: 'N' };
  if (typeof opId === 'string') return { k: 's', v: opId };
  return { k: 'D', v: Number(opId) };
}

/// `crossing.md §1.3`'s `ListenerHandle` row 2 and `JsHandleArg`: **the OPAQUE form alone is the site's**,
/// and every outside spelling is carried as its own variant.
function encodeHandle(state, handle) {
  for (const [candidate, token] of state.tokens) {
    if (candidate === handle) return { k: 'O', v: token };
  }
  return typeof handle === 'string' ? { k: 'B', v: handle } : { k: 'X' };
}

/// `crossing.md §1.3`'s `FilePathArg` table: ABSENT is IN DOMAIN, and `undefined` at a PRESENT key is row
/// 3's `AddressMalformed`.
function encodeFilePath(filePath) {
  if (filePath === undefined) return undefined;
  if (filePath === null) return null;
  if (typeof filePath === 'string') return filePath;
  return { bad: typeof filePath };
}

/// `crossing.md §1.3`'s `JournalLengthArg` table, `12` rows, with NO coercion (`PAR-JS-4`).
function encodeJournalLength(n) {
  if (n === undefined) return undefined;
  if (n === null) return null;
  if (typeof n === 'number' || typeof n === 'string' || typeof n === 'boolean') return n;
  if (typeof n === 'bigint') return { bigint: n.toString() };
  if (typeof n === 'function') return { bad: 'function' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `ListenersArg` table: ABSENT answers `AddressMalformed` — *"the ONE absence the
/// construction does not admit"* — and a rejected array admits NOTHING.
function encodeListeners(listeners) {
  if (listeners === undefined) return undefined;
  if (listeners === null) return null;
  if (!Array.isArray(listeners)) return { bad: 'non-array' };
  return listeners.map((entry) => {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) return { bad: 'entry' };
    const keys = Object.keys(entry);
    if (keys.length !== 2 || !('address' in entry) || !('handle' in entry)) return { bad: 'entry' };
    const handle = entry.handle;
    if (typeof handle !== 'string' || handle === '') return { bad: 'handle' };
    return { address: encodeAddress(entry.address), handle };
  });
}

/// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth. **Each key's
/// own ABSENCE is the member's own absence** — `crossing.md §1.3`'s absent-versus-`undefined` rule reads a
/// `cfg` key by `in`-MEMBERSHIP and never by arity.
function encodeConfig(cfg) {
  const object = cfg !== null && typeof cfg === 'object' ? cfg : {};
  const out = {};
  if ('filePath' in object) out.filePath = encodeFilePath(object.filePath);
  if ('journalLength' in object) out.journalLength = encodeJournalLength(object.journalLength);
  if ('listeners' in object) out.listeners = encodeListeners(object.listeners);
  return out;
}

// ---------------------------------------------------------------------------------------------
// THE COPY OUT — the core's own records and values mapped back into FRESH JS values
// (`crossing.md §1.1` clause 2: no returned value is a view into store memory).
// ---------------------------------------------------------------------------------------------
function decodeValue(encoded) {
  switch (encoded.k) {
    case 's':
      return encoded.v;
    case 'b':
      return encoded.v;
    case 'n':
      return encoded.v;
    case 'g':
      return BigInt(encoded.v);
    case 'F':
      return encoded.v;
    case 'z':
      return null;
    case 'u':
      return undefined;
    case 'a':
      return encoded.i.map(decodeValue);
    case 'o': {
      const out = {};
      for (const [name, member] of encoded.m) out[name] = decodeValue(member);
      return out;
    }
    default:
      return undefined;
  }
}

/// `crossing.md §1.3`'s segment spellings, mapped back: a string or a non-negative integer is what the JS
/// side spelled, and every outside class is carried as its own marker rather than silently coerced.
function decodeSegment(segment) {
  if (typeof segment === 'object' && segment !== null) {
    if (segment.bad === 'null') return null;
    if (segment.bad === 'undefined') return undefined;
    if (segment.bad === 'bool') return false;
    if (segment.bad === 'array') return [];
    if (segment.bad === 'function') return () => {};
    return {};
  }
  return segment;
}

function decodeSegments(segments) {
  return segments.map(decodeSegment);
}

function decodeBaseState(encoded) {
  return { present: encoded.present, value: decodeValue(encoded.value) };
}

function decodeJournalOp(encoded) {
  return {
    opId: encoded.opId,
    kind: encoded.kind,
    address: decodeSegments(encoded.address),
    tier: encoded.tier === undefined ? null : encoded.tier,
    before: decodeBaseState(encoded.before),
    after: decodeBaseState(encoded.after),
    seq: encoded.seq,
    compacted: encoded.compacted,
  };
}

// ---------------------------------------------------------------------------------------------
// THE PACKAGE'S OWN SURFACE — the opaque handle (`§2.3` item 2) and the per-instance registry (`§2.4`)
// ---------------------------------------------------------------------------------------------
/// **THE PACKAGE'S OWN INSTANCE HANDLE'S STATE**, keyed by the instance the factory returned. The handle
/// itself carries EXACTLY ONE member, `register` (`surface.md §2.4` item 5 (a)).
const INSTANCES = new WeakMap(); // instance -> {id, tokens: Map(handle -> token)}

function wrapHandles(state, tokens) {
  const out = [];
  for (const token of tokens) {
    let handle = null;
    for (const [candidate, held] of state.tokens) {
      if (held === token) {
        handle = candidate;
        break;
      }
    }
    if (handle === null) {
      handle = Object.freeze({}); // **THE OPAQUE HANDLE**: frozen, memberless, and its token is PRIVATE
      state.tokens.set(handle, token);
    }
    // `§2.4` rule 3: one DISTINCT handle per token, however many home entries carry it — *"the registry
    // fires one invocation per DISTINCT handle — not one per occurrence, and not one per entry"*.
    if (!out.includes(handle)) out.push(handle);
  }
  return out;
}

function stateOf(instance) {
  const state = INSTANCES.get(instance);
  if (!state) throw new TypeError();
  return state;
}

function call(state, verb, args) {
  const addon_ = withAddon();
  try {
    return addon_.call(state.id, verb, args);
  } catch (refusal) {
    fail(refusal);
  }
}

// ---------------------------------------------------------------------------------------------
// THE SURFACE — `surface.md §2.9` item 1: the EIGHT verbs, and NOTHING else. `findAddress` is NOT exposed
// (`A63`), no `exists` verb exists (`§2.9` item 3) and no release verb is declared (`A74`).
// ---------------------------------------------------------------------------------------------

/// `§2.1`: `storeCreate(cfg)` takes ONE plain object carrying the store's THREE declared keys, passes them
/// through WITHOUT adding a default, a rename or a fourth key (`DD-36`), and **never returns a partial
/// instance** — it throws the single failure form instead. **The object it returns carries EXACTLY the one
/// own member `surface.md §2.4` item 5 (a) declares, and not one member beside it.**
export function storeCreate(cfg) {
  const addon_ = withAddon();
  let id;
  try {
    id = addon_.storeCreate(encodeConfig(cfg));
  } catch (refusal) {
    fail(refusal);
  }
  // **ONE HANDLE PER TOKEN PER INSTANCE**: the map is read in BOTH directions, so a token the store
  // returns twice (a lawful duplicate, `§2.4` rule 3) reaches the caller as the SAME opaque value.
  // **THE PACKAGE'S OWN REGISTRY, ONE PER INSTANCE** (`surface.md §2.4`): the opaque handle -> the
  // caller's FUNCTION. **`unlisten` withdraws the store-side home entry and NEVER the function** (`§2.4`
  // rule 4, `DD-15`), so nothing removes an entry — the registry is released with the instance and by
  // nothing else (`DD-17`), and a re-registration of a handle REPLACES its entry (rule 2, never a fan-out).
  const state = { id, tokens: new Map(), registry: new Map() };
  const instance = {
    /// `surface.md §2.4` item 5 (b): `register(handle, listener) -> undefined` — the OPAQUE handle a verb
    /// returned or the construction adopted, and ANY JS function. **It is NOT a ninth named export of the
    /// entry** (`package.md §1.3` item 3): it is reached through the factory's own product alone.
    register(handle, listener) {
      return registerOn(state, handle, listener);
    },
  };
  INSTANCES.set(instance, state);
  return instance;
}

/** `§2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register. */
export function read(instance, address, tier) {
  const state = stateOf(instance);
  // A position the call supplied no value for is handed as the runtime's own `undefined` — NEVER as an
  // absent array slot — so the facade can tell an unsupplied position from a supplied `undefined` and the
  // core is never reached with a null pointer (`crossing.md §1.3`'s absent-versus-`undefined` rule).
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  return decodeValue(call(state, 'read', args));
}

/** `§2.2` / `§2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch`. */
export function readLiteral(instance, address, tier) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  return decodeValue(call(state, 'readLiteral', args));
}

/// `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, never a view.
export function write(instance, address, tier, value) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  args.push(encodeTier(tier, arguments.length >= 3, true));
  args.push(encodeValue(value, [], 0));
  const answer = call(state, 'write', args);
  const record = {
    op: decodeJournalOp(answer.op),
    watched: answer.watched.map(decodeSegments),
    triggered: wrapHandles(state, answer.triggered),
  };
  // **THE INVOCATION WINDOW** (`§2.7` item 2, `DD-22`): the record above is COMPLETE before the window
  // opens, the invocation is SYNCHRONOUS, it happens AFTER the addon's call returned, and **its ONE
  // argument is the TRIGGERING ADDRESS** (`PAR-JS-12`).
  deliver(state, record.triggered, answer.triggeringAddress);
  return record;
}

/// **THE PACKAGE'S OWN INVOCATION LOOP** (`surface.md §2.4`: *"the invocation is the packages's"*; `A57`:
/// *"the store returns handles and invokes nothing"*). One invocation per DISTINCT handle the addon's
/// record carries, at the address the record carries beside it — **and a THROWING BODY IS NOT CAUGHT, NOT
/// RETRIED AND NOT REPORTED** (`§2.7` item 4, `DD-23`): its own exception propagates out of this loop, and
/// the store's result stands complete and unmoved behind it.
function deliver(state, triggered, triggeringAddress) {
  const address = typeof triggeringAddress === 'object' && triggeringAddress !== null ? triggeringAddress : [];
  for (const handle of triggered) {
    const listener = state.registry.get(handle);
    // `§2.4` rule 1: a handle with NO registered function invokes nothing and reports nothing — no code,
    // no warning, no log.
    if (typeof listener === 'function') listener(address);
  }
}

/// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM, `tiers` in the store's canonical order,
/// and the in-domain no-op arm a SUCCESS returning `tiers: []`. **Its declared NAME is `delete`, and it is
/// published under that name ALONE** (`package.md §1.3` item 3): `deleteOp` is a reserved-word workaround
/// for the declaration and never a member of the package's namespace.
function deleteOp(instance, address, tier) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  // `delete`'s tier is read as a VALUE and not by an arity fold: an ABSENT position is the whole-target
  // removal, and a supplied `undefined` answers row 4's `AddressMalformed` (`crossing.md §1.3`).
  args.push(encodeTier(tier, arguments.length >= 3, false));
  const answer = call(state, 'delete', args);
  const receipt = {
    address: decodeSegments(answer.address),
    tiers: answer.tiers,
    triggered: wrapHandles(state, answer.triggered),
  };
  // `A43`: a delete FIRES its own triggered set, on the same window as a write (`§2.7` item 2).
  deliver(state, receipt.triggered, answer.triggeringAddress);
  return receipt;
}

/// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`§2.6`).
export function rollback(instance, opId) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeOpId(opId)] : [];
  const answer = call(state, 'rollback', args);
  return {
    opId: answer.opId,
    undoneOps: answer.undoneOps,
    restoredTo: decodeBaseState(answer.restoredTo),
  };
}

/// `§2.10`: `listen` mints a token, populates the store's home and wraps it for JS — and its `address` is
/// `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
export function listen(instance, address) {
  const state = stateOf(instance);
  const args = arguments.length >= 2 ? [encodeAddress(address)] : [];
  return wrapHandles(state, [call(state, 'listen', args)])[0];
}

/// `§2.3` item 4 / `PAR-JS-8`: **`unlisten` over ANY value outside the domain is a NO-OP SUCCESS** — a
/// foreign instance's value, a prior session's value, a fabricated value, a blank token, a non-opaque value
/// and an absent handle are EACH a no-op success, no code is produced, and NO OTHER REGISTRATION IS REMOVED.
/// **The package's own registry entry STANDS** (`§2.4` rule 4, `DD-15`): only the store-side home entry is
/// withdrawn, so a withdrawn handle's function simply never fires again.
export function unlisten(instance, handle) {
  const state = stateOf(instance);
  if (arguments.length < 2) return undefined;
  const encoded = encodeHandle(state, handle);
  if (encoded.k !== 'O') return undefined; // outside the domain: a no-op success, and the store is not reached
  call(state, 'unlisten', [encoded]);
  // **The package's registry entry STANDS** (`§2.4` rule 4, `DD-15`): only the store-side home entry is
  // withdrawn, so the withdrawn handle's function simply never fires again, and a later re-`listen` at the
  // same address mints a DIFFERENT handle whose registration is a NEW entry.
  return undefined;
}

/// **THE REGISTRY'S OWN SITE AT THE PACKAGE'S BOUNDARY** (`surface.md §2.4` item 5): the caller's FUNCTION
/// for a handle, held by the package (`DD-15`) and invoked after the verb has returned (`§2.7` item 2).
/// **`register` REPLACES, never fans out** (rule 2); a non-function `listener`, a `handle` THIS INSTANCE
/// never minted or adopted, a bare `string`, a blank token, `null`, `undefined`, a non-opaque value and an
/// ABSENT argument are EACH the SAME JS `TypeError`, carrying NO `status` and NO `message` member (`§2.4`
/// item 5 (d), `PAR-JS-12`) — **and NOTHING reaches the store in any of those cases.** **`unlisten`'s
/// NO-OP-SUCCESS reading does NOT extend here**, because a registration's argument is a member of the
/// registry's own key set and has no such arm: the addon is the site's own judge, so this file asks it.
function registerOn(state, handle, listener) {
  if (typeof listener !== 'function') throw new TypeError();
  const encoded = encodeHandle(state, handle);
  if (encoded.k !== 'O') throw new TypeError();
  const addon_ = withAddon();
  try {
    addon_.register(state.id, encoded);
  } catch (refusal) {
    if (refusal && refusal.status === 'TypeError') throw new TypeError();
    fail(refusal);
  }
  // `§2.4` rule 2: ONE handle, ONE function — the previous entry is REPLACED and dropped without notice.
  state.registry.set(handle, listener);
  return undefined;
}

// `delete` is a reserved word and the declared spelling is preserved on the way out.
export { deleteOp as delete };
