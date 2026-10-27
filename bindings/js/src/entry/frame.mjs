// `D-2` (`docs/L1/entry-subdivision.md` §1 part `6b`, `D-33`'s seam at `L2799`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { boundaryReject } from './artefact.mjs';
import { appendOwn } from './refusal.mjs';
import { addressSpelling } from './kernel-foundations.mjs';
import { arrayClass, classSpelling, hasLoneSurrogate, isAdmittedArray, isLawfulListenerElement, isPlainObjectValue, valueTargetSpelling } from './class-decision.mjs';
import { encodeAddress, encodeFilePath, encodeJournalLength } from './carrier.mjs';

function encodeListeners(listeners) {
  if (listeners === undefined) return undefined;
  if (listeners === null) return null;
  if (types.isProxy(listeners)) return { bad: 'non-array' }; // row 3: not the array's shape (`DD-34`)
  if (!Array.isArray(listeners)) return { bad: 'non-array' };
  if (arrayClass(listeners) === 'class') return { bad: 'non-array' }; // `JS-2`: a class extending `Array`
  // **⟶ AND THE LIST IS WALKED BY A LOCAL INDEX LOOP, NOT BY `Array.prototype.map`** (`contract.md §2.1`'s
  // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `62`; arm `(xix)`,
  // cell `JC-TC-65`): a caller-side `delete Array.prototype.map` made EVERY `storeCreate` throw a RAW HOST
  // `TypeError` before it returned — the direction `F-RA-3`'s item `(3)` forbids — and a forged `map` decided
  // which entries the construction's declared seeding saw. The loop answers one encoded entry per element, at
  // that element's own position.
  const encoded = [];
  for (let position = 0; position < listeners.length; position += 1) {
    const entry = listeners[position];
    if (!isPlainObjectValue(entry)) {
      boundaryReject(
        'AddressMalformed',
        'listeners',
        `the listeners entry at position ${position} is ${classSpelling(entry)}, and an entry is a plain { address, handle } record`,
      );
    }
    const keys = Object.keys(entry); // the OWN enumerable string keys, and nothing inherited
    if (keys.length !== 2 || !Object.hasOwn(entry, 'address') || !Object.hasOwn(entry, 'handle')) {
      appendOwn(encoded, { bad: 'entry' });
      continue;
    }
    const handle = entry.handle;
    if (typeof handle !== 'string' || handle === '') {
      appendOwn(encoded, { bad: 'handle' });
      continue;
    }
    appendOwn(encoded, { address: encodeAddress(entry.address), handle });
  }
  return encoded;
}

/// **⟶ ADDED 2026-10-15 (`parameter-semantics.md §2.21`; `surface.md §2.1`'s `cfg` block dated 2026-10-15;
/// `contract.md §8.1` #16) — THE CONSTRUCTION'S FOURTH DECLARED KEY, `constraints`: THE LIST'S OWN WALK.**
///
/// **THE CLASS DECISION IS TAKEN FIRST, ON THE VALUE AS IT IS, AND NO COERCION IS PERFORMED ANYWHERE
/// HERE** (`A76`'s part (1)): a `Proxy`, a class extending `Array` and every non-array is the LIST's own
/// outside form and is carried as one; a plain array is walked element by element; **and ONE ELEMENT
/// OUTSIDE THE `{ address, id }` PAIR'S SHAPE crosses as THE FAILING ENTRY'S OWN `<SEGMENT>` SPELLING**
/// (`§8.2`'s row: *"the failing ENTRY's `address` spelling, joined by `/` … or the element's own position
/// printed bare where the failing element carries no address at all"*). **THE CODE AND THE MESSAGE STAY THE
/// STORE'S** (`§8.1` #16, `DD-40`): nothing here mints a status and nothing here authors a sentence.
function encodeConstraints(constraints) {
  if (constraints === undefined) return undefined;
  if (constraints === null) return null;
  if (types.isProxy(constraints)) return { bad: 'non-array' }; // `DD-34`'s class order, taken first
  if (!Array.isArray(constraints)) return { bad: 'non-array' };
  if (arrayClass(constraints) === 'class') return { bad: 'non-array' };
  // **⟶ AND THE FOURTH KEY'S OWN WALK IS A LOCAL INDEX LOOP, NOT `Array.prototype.map`** (`contract.md §2.1`'s
  // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `63`; arm `(xix)`,
  // cell `JC-TC-65`): a forged `map` registered nothing while the construction returned an instance, and the
  // deletion threw a RAW HOST `TypeError` out of the same construction. Each element is encoded at its own
  // position and the list crosses WHOLE.
  const encoded = [];
  for (let position = 0; position < constraints.length; position += 1) {
    const element = constraintEntry(constraints[position], position);
    // **⟶ AND THE ELEMENT'S THIRD MEMBER IS DROPPED HERE AND ONLY HERE — `D-26` item 3, 2026-10-24.** The
    // element type the declaration now carries is THREE members and `constraint` is REQUIRED; **a JavaScript
    // function cannot cross into Rust at any depth**, so `ConstraintEntry::Pair { address, id }` stays two
    // fields and the crossing carries the PAIR. **THE PACKAGE ARMS THE SUBSTANCE** — `constraintEntry` below
    // FORWARDS it and the construction's own batch walk captures it; the crossing is this one projection.
    appendOwn(encoded, element.bad === undefined
      ? { address: element.address, id: element.id }
      : element);
  }
  return encoded;
}

/// ONE `constraints[]` ELEMENT: the closed `{ address, id }` pair, or the element's own `<SEGMENT>`
/// spelling (`§8.2`). **AN ELEMENT THAT IS NOT A PLAIN OBJECT — an array, a `Proxy`, a class instance and
/// every non-object included — CARRIES NO ADDRESS AT ALL**, so its slot is the element's own POSITION
/// printed bare.
function constraintEntry(entry, position) {
  const where = `the constraint entry at position ${position}`;
  if (!isPlainObjectValue(entry)) return { bad: 'element', subject: where };
  if (!Object.hasOwn(entry, 'address') || entry.address === undefined) {
    return { bad: 'element', subject: where };
  }
  const address = constraintAddress(entry.address);
  if (typeof address === 'string') return { bad: 'element', subject: address };
  // AN ELEMENT CARRYING NO `id` AT ALL IS THE SAME OUTSIDE FORM AS ONE WHOSE `id` IS NOT A STRING: the
  // `<SEGMENT>` slot prints the entry's own `address` spelling and the `<KEYLIST>`'s members are the
  // entry's own, read by the store's generator and never here.
  if (
    !Object.hasOwn(entry, 'id')
    || entry.id === undefined
    || typeof entry.id !== 'string'
    || entry.id === ''
  ) {
    return { bad: 'element', subject: spellConstraintAddress(address.s) };
  }
  // **⟶ AMENDED 2026-10-24 (`D-26`, verbatim: *"The batch in cfg.constraints must supply functions"*): THE
  // ELEMENT'S THIRD MEMBER IS FORWARDED, NOT DROPPED.** The bytes this return replaced were
  // `return { address, id: entry.id };` — *"nothing else is forwarded, so a `constraint` member a caller
  // attaches to an element is DROPPED at the crossing, silently"* — and **that drop is named a DEFECT by
  // `D-26` item 1, not a design**. The member is CARRIED HERE for the PACKAGE's own use: the construction's
  // batch walk validates it (`B-1`) and the arming loop hands it to `K-1` after the instance exists (`D-27`:
  // *"Functions are armed"*). **IT IS STRIPPED AT THE CROSSING ALONE** (`encodeConstraints` above), because
  // a JS function cannot cross into Rust. **THE FUNCTION'S PRESENCE IS NOT TESTED HERE**: a missing or
  // non-function member is `B-1`'s refusal, decided one layer up in the construction's own walk, in the
  // surface's one thrown form and before any filesystem act (`D-26` item 5).
  return { address, id: entry.id, constraint: entry.constraint };
}

/// `§1.5`'s segment array as the carrier `encodeAddress` declares it — **or, where the value lies outside
/// that domain, the failing ELEMENT's own `address` spelling as a STRING** (`§8.2`'s `<SEGMENT>` slot: a
/// string key single-quoted, an integer index bare, joined by `/`).
export function constraintAddress(address) {
  if (types.isProxy(address) || !Array.isArray(address) || arrayClass(address) === 'class') {
    return `'${valueTargetSpelling(address)}'`;
  }
  const segments = [];
  for (let i = 0; i < address.length; i += 1) {
    if (!(i in address)) {
      return `${spellConstraintAddress(segments)} and no segment at position ${i}`;
    }
    const segment = address[i];
    if (typeof segment === 'string' && !hasLoneSurrogate(segment)) {
      appendOwn(segments, segment);
    } else if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0
      && Number.isSafeInteger(segment)) {
      appendOwn(segments, segment);
    } else {
      return `${spellConstraintAddress(segments)} and ${classSpelling(segment)} at position ${i}`;
    }
  }
  return { k: 'L', s: segments };
}

/// `§8.2`'s whole-address spelling: **a string key SINGLE-QUOTED (`'a'`) and an integer index BARE (`0`),
/// JOINED BY `/`** — the same spelling the store's own generator prints at its `<SEGMENT>` slot.
///
/// **⟶ AND NOTHING HERE IS TAKEN FROM A MUTABLE PROTOTYPE FROM 2026-10-24** (`contract.md §2.1`'s clause of
/// this date on `F7-1`, items `(2b)`'s row `39` and `(10d)`): the as-built spelling built an array with
/// `Array.prototype.map` and joined it with `Array.prototype.join`, so a caller's override RAN on every
/// `ConstraintListInvalid` rendering and ITS RETURN VALUE BECAME THE `<SEGMENT>` SLOT of the store's own
/// diagnostic — the battery's row `(k)` measures the marker in the message. **The form is item `(1c)(i)`'s
/// local loop and the same `+=` join `valuePosition` takes**; the bytes, the quoting, the bare integer and the
/// `/` separator are unmoved.
export function spellConstraintAddress(segments) {
  let spelled = '';
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    const rendered = typeof segment === 'string' ? `'${segment}'` : String(segment);
    spelled += i === 0 ? rendered : `/${rendered}`;
  }
  return spelled;
}

/// `surface.md §2.1` / `DD-36`: the as-filed *"`cfg` carries the store's THREE declared keys and no
/// fourth"* is read THROUGH this clause and is **the FOUR declared keys and no FIFTH** — `filePath` ·
/// `journalLength` · `listeners` · `constraints` (`surface.md §2.1`'s `cfg` block dated 2026-10-15 and its
/// dated clause of 2026-10-16; `parameter-semantics.md §2.21` = `PAR-JS-21`) — **and a CALLER-SUPPLIED key
/// beyond those four is IGNORED, never refused: no code, no refusal and no member moved** (`docs/specs/storeroom-js/surface.md §2.1`'s dated
/// clause of 2026-10-16, `contract.md §7.1`'s third-key row governing the caller's key; `§8.1`'s
/// complement). **Each key's own ABSENCE is the member's own absence** — `crossing.md §1.3`'s
/// absent-versus-`undefined` rule reads a
/// `cfg` key by MEMBERSHIP and never by arity, and **`A76`/`JS-5` fixes that membership as OWNERSHIP:
/// `Object.hasOwn` and never `in`, which walks the prototype chain.**
///
/// **AND THE CLASS DECISION COMES FIRST, ON `cfg` AS IT IS.** The shipped line
/// `const object = cfg !== null && typeof cfg === 'object' ? cfg : {};` **SUBSTITUTED an empty object for
/// every non-object `cfg`** — a repair, and one that answered the wrong code at that: `storeCreate(null)`,
/// `storeCreate(5)` and `storeCreate([])` all fell through to a missing `journalLength` and answered
/// `ConstructionArgumentMissing`, where `PAR-JS-1` declares **`AddressMalformed` for EVERY outside form of
/// `cfg`** (*"ABSENT · `null` · `undefined` · a non-object (a number, a string, a boolean, a function, an
/// array) — `AddressMalformed` for every one of them, with no instance returned"*). **That substitution is
/// GONE: a `cfg` that is not a PLAIN object is REFUSED, verbosely, naming the class — and so is a
/// prototype-carrying object or a class instance, whose inherited keys the shipped `in`-test read as
/// PRESENT (`JS-5`).**
export function encodeConfig(cfg) {
  if (!isPlainObjectValue(cfg)) {
    boundaryReject(
      'AddressMalformed', // `PAR-JS-1`'s declared answer for every outside form of `cfg`, carried — **AND THE MESSAGE BELOW IS RE-SPELLED IN PLACE, 2026-10-16: *"carrying the store's three declared keys"* READS *"carrying the store's four declared keys"*, THE COUNT ALONE MOVING, because the set is `filePath` · `journalLength` · `listeners` · `constraints` (`§2.1`'s `cfg` block and dated clause, both of 2026-10-15), because the sentence's subject is the `cfg` CARRIER CLASS and NEVER a caller obligation (a CALLER-SUPPLIED key BEYOND the four is still IGNORED and never refused, `contract.md §7.1` — no semantics and no refusal path moves with the word), and because NOTHING PINNED THE OLD WORDING: no clause of `docs/specs/**` declares this message's figure and no test reads it — the drives read the TARGET `cfg` and the CLASS that failed (`negative-generators.test.mjs` · `registry.test.mjs`) — so it was ordinary prose written when the count was three and NOT a clause's own byte.**
      'cfg',
      `the construction's cfg is ${classSpelling(cfg)}, and cfg is one plain object carrying the store's four declared keys`,
    );
  }
  const out = {};
  if (Object.hasOwn(cfg, 'filePath')) out.filePath = encodeFilePath(cfg.filePath);
  if (Object.hasOwn(cfg, 'journalLength')) out.journalLength = encodeJournalLength(cfg.journalLength);
  if (Object.hasOwn(cfg, 'listeners')) out.listeners = encodeListeners(cfg.listeners);
  // **⟶ THE FOURTH DECLARED KEY** (`§2.21`; `docs/specs/storeroom-js/surface.md §2.1`'s `cfg` block dated 2026-10-15): `constraints` passes
  // through by the SAME membership rule the three above take, so a key the caller did not supply is
  // ABSENT and a key the caller supplied as `undefined` is the key's own outside form. **A key BEYOND the
  // four is IGNORED and produces no code** (`§8.1`'s complement), and no default, no rename and no fifth
  // key is added here (`DD-36`).
  if (Object.hasOwn(cfg, 'constraints')) out.constraints = encodeConstraints(cfg.constraints);
  return out;
}

// ---------------------------------------------------------------------------------------------
// **⟶ ADDED 2026-10-24 — THE CONSTRUCTION'S STEP `2`: THE BATCH'S MEMBER CHECKS (`D-26`, `D-27`), TAKEN
// BEFORE ANY FILESYSTEM ACT.** (`docs/L1/surface-deltas.md` §3.1 step 2, §3.2.)
// ---------------------------------------------------------------------------------------------
/// **THE BATCH'S THREE CHECKS, PER ELEMENT, ASCENDING POSITION, AND THE ELEMENT IT ANSWERS IS THE ONE THE
/// ARMING LOOP LATER HANDS TO `K-1`.**
///
/// **`D-27`'S TWO WALLS, WHICH ARE NOT THIS PASS'S TO MOVE:** every check **precedes any filesystem act** —
/// and the construction's FIRST filesystem act is inside `addon_.storeCreate(encoded)`, which is why this
/// function is called between `encodeConfig` and that call — and **the function check precedes the uniqueness
/// check that must see the adopted listeners.**
///
/// **THE THREE CHECKS, IN THE DECLARED ORDER, AND THE TWO GROUNDS FOR THAT ORDER:**
///   * **`B-1` — the function check is FIRST among the three, and first for every element before that
///     element's uniqueness checks.** A function fault is decidable **from the element alone** while both
///     uniqueness checks need a second input, so **the first fault to cross is the fault that needs the least
///     information** (`A76`'s part (1)).
///   * **`B-2` — the within-batch uniqueness check precedes `B-3` for the same element.** `2b` is decidable
///     from the list alone; `2c` needs the adopted handles. **A caller whose list is self-contradictory is told
///     the self-contradiction, not a collision with an argument they may not even have supplied.**
///   * **`B-3` — the cross-kind check against the construction's listeners**, `D-25`'s cross-kind rejection
///     *"applied at the one instant it can be checked wholesale"* (`D-27`).
///
/// **THE CHECKS ARE TAKEN OVER THE ELEMENTS THE STORE WOULD ADMIT AND SKIP THE ENCODER'S OWN `{bad: …}` ARMS**
/// (`constraintEntry`'s three refusals): **the package does not shadow a store refusal**, so an element that is
/// both malformed and functionless is refused by the store's own code, at its own instant, with its own
/// generated message. (`D-27`: *"the store's own list validation keeps its subject — shape, address domain,
/// `id` domain — and gains no arm"*.)
///
/// **AND THE ADOPTED-LISTENER SET IS COMPUTED FROM THE SUPPLIED `cfg.listeners`, NOT FROM THE STORE'S ADOPTED
/// ONE, WHICH DOES NOT EXIST YET.** That is not a loophole: **the boot ruling applies every adopted handle
/// through `listen`, i.e. after the create**, and a `cfg.listeners` array that reaches the create is admitted
/// **WHOLE** (*"a REJECTED ARRAY ADMITS NOTHING"*), so on any construction that can succeed the lawful
/// supplied handles and the adopted handles are **the same set** (`docs/L1/surface-deltas.md` §3.2, marked
/// CONCLUDED there). `isLawfulListenerElement` is the one predicate both sides take.
///
/// **THE FORM IS THE SURFACE'S ONE THROWN OBJECT** `{status, message, log: []}` — `boundaryReject` reaches the
/// store's own generator for the message and throws the one form with `log: []`, because **no attempt is open
/// and no instance exists**. `ConstraintListInvalid` is the member: the list's own validation code, the same
/// subject one layer up, and **the package mints no code** (`D-26` item 5; `D-27`; §1.5's clause 5).
export function admittedConstraintBatch(cfg) {
  const admitted = [];
  const constraints = cfg.constraints;
  if (constraints === undefined || constraints === null) return admitted;
  if (types.isProxy(constraints) || !isAdmittedArray(constraints)) return admitted;
  // ── THE SUPPLIED LISTENER HANDLES, AND THE ADDRESS EACH IS ADOPTED AT (for `B-3`'s message) ────────────
  const adoptedHandles = [];
  const adoptedAddresses = [];
  if (cfg.listeners !== undefined && cfg.listeners !== null
    && !types.isProxy(cfg.listeners) && isAdmittedArray(cfg.listeners)) {
    for (let i = 0; i < cfg.listeners.length; i += 1) {
      const entry = cfg.listeners[i];
      if (!isLawfulListenerElement(entry)) continue;
      appendOwn(adoptedHandles, entry.handle);
      appendOwn(adoptedAddresses, entry.address);
    }
  }
  // ── THE WITHIN-BATCH NAMES, AS TWO PARALLEL LOCAL ARRAYS READ BY INDEX ────────────────────────────────
  // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`/`F8-2`: no `Map`/`Set` member and no iterator is
  // taken off a mutable prototype on this path.)
  const namedHandles = [];
  const namedPositions = [];
  for (let position = 0; position < constraints.length; position += 1) {
    const element = constraintEntry(constraints[position], position);
    // THE STORE'S OWN ARM KEEPS ITS SUBJECT — an element the encoder refused is skipped, never shadowed.
    if (element.bad !== undefined) continue;
    const segment = spellConstraintAddress(element.address.s);
    // ── `B-1` — THE FUNCTION CHECK ──────────────────────────────────────────────────────────────────────
    if (typeof element.constraint !== 'function') {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} carries ${classSpelling(element.constraint)} at its `
          + "constraint member, and a batch element's constraint is a JS function and it is the pair's substance",
        ['constraints'],
      );
    }
    // ── `B-2` — TWO BATCH ELEMENTS NAMING ONE HANDLE: REPORTED AT THE LATER ONE ───────────────────────────
    let namedAt = -1;
    for (let n = 0; n < namedHandles.length; n += 1) {
      if (namedHandles[n] === element.id) {
        namedAt = namedPositions[n];
        break;
      }
    }
    if (namedAt !== -1) {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} names the handle '${element.id}', and the element at `
          + `position ${namedAt} names the same one: a batch element's id is the store-side handle for its `
          + 'pair, and one batch may not name one handle twice',
        ['constraints'],
      );
    }
    // ── `B-3` — A BATCH `id` EQUAL TO AN ADOPTED LISTENER'S `handle`: THE CROSS-KIND COLLISION ───────────
    let adoptedAt = -1;
    for (let n = 0; n < adoptedHandles.length; n += 1) {
      if (adoptedHandles[n] === element.id) {
        adoptedAt = n;
        break;
      }
    }
    if (adoptedAt !== -1) {
      boundaryReject(
        'ConstraintListInvalid',
        segment,
        `the batch element at position ${position} names the handle '${element.id}', and this construction `
          + `adopts a listener under that handle at ${addressSpelling(adoptedAddresses[adoptedAt])}: a listener `
          + 'and a constraint do not share one',
        ['constraints'],
      );
    }
    appendOwn(namedHandles, element.id);
    appendOwn(namedPositions, position);
    appendOwn(admitted, {
      addresses: [element.address.s],
      id: element.id,
      constraint: element.constraint,
    });
  }
  return admitted;
}

// ---------------------------------------------------------------------------------------------
// THE COPY OUT — the core's own records and values mapped back into FRESH JS values
// (`crossing.md §1.1` clause 2: no returned value is a view into store memory).
// ---------------------------------------------------------------------------------------------
export function decodeValue(encoded) {
  // **THE COPY-OUT IS THE SAME BARE TREE** (`contract.md §5`; `A148` Q4/Q5): the native writer already
  // builds fresh plain objects and dense arrays, so this frame only normalizes `-0` and keeps the tree fresh.
  if (typeof encoded === 'number') return Object.is(encoded, -0) ? 0 : encoded;
  // **⟶ AND THE COPY-OUT'S OWN ARRAY ARM TAKES NO METHOD FROM A MUTABLE PROTOTYPE** (`contract.md §1`'s clause
  // of 2026-10-24 on `F-RA-3`, item `(3)`): the as-built `.map` read `Array.prototype.map` off the array's own
  // chain, so `delete Array.prototype.map` in the caller's realm threw a raw `TypeError` out of a read the
  // crossing had already ADMITTED — an admission converted into a failure by the caller's own deletion. The
  // walk is by INDEX, so the fresh tree is the same fresh tree.
  if (Array.isArray(encoded)) {
    const elements = [];
    for (let i = 0; i < encoded.length; i += 1) appendOwn(elements, decodeValue(encoded[i]));
    return elements;
  }
  if (encoded !== null && typeof encoded === 'object') {
    // **⟶ AN OWN DATA PROPERTY IS DEFINED, NEVER SET — CLOSED 2026-10-23 BY THE GATE-4 ADVERSARIAL BATTERY
    // (`json-crossing-gate4-adversarial.test.mjs`'s `ADV-12`).** `out[name] = member` runs `[[Set]]`, whose
    // `__proto__` step reaches the `Object.prototype` accessor: a stored member genuinely named `__proto__`
    // became the returned object's PROTOTYPE instead of an own member (and an attacker-supplied member could
    // shadow the returned object's methods). **`Object.fromEntries` defines OWN data properties**, so the
    // bare tree the contract declares crosses back member for member (`contract.md §5`; `A76`: *"do not
    // attempt to fix"*). **⟶ AND FROM 2026-10-24 THE MEMBERS ARE DEFINED BY A LOCAL LOOP** (`contract.md
    // §2.1`'s clause of this date on `F7-1`, items `(1c)(ii)` and `(2b)`'s rows `21` and `22`):
    // `Object.entries`'s pair iteration and `fromEntries`'s argument iteration are both
    // `Array.prototype[Symbol.iterator]` — a member of a MUTABLE PROTOTYPE on the COPY-OUT path — so the key
    // census is read by `Object.keys` and consumed by index, the member is read by its own key, and each is
    // defined as `fromEntries` defined it.
    const names = Object.keys(encoded);
    const plain = {};
    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      Object.defineProperty(plain, name, {
        value: decodeValue(encoded[name]),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return plain;
  }
  return encoded;
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

/// **⟶ AND NO METHOD IS TAKEN FROM A MUTABLE PROTOTYPE HERE EITHER** (`contract.md §1`'s clause of 2026-10-24
/// on `F-RA-3`, item `(3)`: a caller-side DELETION cannot turn an admission into a refusal). The reply's own
/// segment array is decoded by INDEX: the as-built `.map` read `Array.prototype.map` off the array's chain, so
/// `delete Array.prototype.map` in the caller's realm made THIS read throw a raw `TypeError` out of a write the
/// walk had already ADMITTED — the admission converted into a failure at the package's own frame, which is
/// `§2.5` item 5 (e)'s forbidden raw host error as well as item `(3)`'s forbidden conversion.
export function decodeSegments(segments) {
  const decoded = [];
  for (let i = 0; i < segments.length; i += 1) appendOwn(decoded, decodeSegment(segments[i]));
  return decoded;
}

export function decodeBaseState(encoded) {
  return { present: encoded.present, value: decodeValue(encoded.value) };
}

export function decodeJournalOp(encoded) {
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

