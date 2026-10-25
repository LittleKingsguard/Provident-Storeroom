// `D-2` (`docs/L1/entry-subdivision.md` §1 part `5`; the split is `D-33`'s) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { boundaryReject } from './artefact.mjs';

// ⟶ CARVED UP 2026-10-24 (`D-2`/`D-33`): `inDomainAddress` and `isLawfulListenerElement`, with the doc blocks that
// explain them, are taken out of the delivery part, where `index.mjs:5078`–`:5112` held them: the config frame's own
// encoder (`admittedConstraintBatch`) reads `isLawfulListenerElement`, so leaving them there made the walk depend on
// the part that owns the terminal arm. No byte of either body changed and neither name has a second declaration.

// ---------------------------------------------------------------------------------------------
// THE CLASS DECISION, TAKEN FIRST — `A76`'S PART (1), VERBATIM: *"EVERY JS VALUE IS TESTED FOR COMPLIANCE
// WITH THE PERMITTED SHAPE BEFORE IT IS ADMITTED — the class decision is made first, on the value as it
// IS, never after a coercion"*. **NO COERCION IS PERFORMED ANYWHERE BELOW: every predicate here READS a
// class and CLASSIFIES it, and the classified value is what crosses.**
// ---------------------------------------------------------------------------------------------

/// `crossing.md §1.2` row 1's dated clause of 2026-10-11 and `§1.4` item 9: **a JS `string` carrying a
/// LONE SURROGATE is REFUSED `ValueNotAdmitted` AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED** —
/// no Rust `String` can carry one, and the value is never silently replaced, dropped or normalized into a
/// replacement character. **The class is BOUNDARY-ONLY and this is its one site.**
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-2`, items `(2a)`–`(2d)`): THE
/// PREDICATE INVOKES NOTHING TAKEN FROM A MUTABLE PROTOTYPE — it reads the string's own code units by a LOCAL
/// INDEX READ.** The block above stands byte-for-byte and is read THROUGH this clause; **the class, its one
/// site, its four other readings and every admission stand unmoved.** **THE DEFECT, AT ITS BYTES:** the shipped
/// read was `text.charCodeAt(i)` and `text.charCodeAt(i + 1)` — A MEMBER READ OFF `String.prototype` AT THE
/// MOMENT OF THE CALL — and this predicate is the SOLE gate on `§2` rows `9` and `10` with NO downstream
/// refuser, so an override answering `0x41` at every index made `a string carrying a lone surrogate`
/// UNREACHABLE at both positions and a lone-surrogate value and key crossed, repaired to U+FFFD on the far
/// side. **THE FORM IS THE CLAUSE'S FIRST LAWFUL ONE AND IT IS TAKEN FOR THE REASON `C-11` GIVES:** `text[i]`
/// is a string's OWN EXOTIC INDEX PROPERTY — answered by the string wrapper and by no link of any prototype
/// chain — and `text.length` is the wrapper's own property, so no method is invoked and no intrinsic is
/// captured at load (a captured `String.prototype.charCodeAt` is the frozen prototype fact `C-11` forbids, so
/// the clause's second form, `String.prototype.charCodeAt.call(...)`, is NAMED THERE AND NOT TAKEN HERE).
/// **AND THE PAIR READ CARRIES ITS OWN BOUND, WHICH IS PART OF THE FORM AND NOT AN OPTIMISATION:**
/// `text[i + 1]` is read ONLY WHERE `i + 1 < text.length`, because an out-of-range canonical index is NOT the
/// wrapper's own property — an unguarded read would reach a caller's `String.prototype[i + 1]` and PAIR a high
/// surrogate the caller never paired. Where that index does not exist the answer is LONE, the same answer the
/// shipped `NaN` comparison gave.
export function hasLoneSurrogate(text) {
  for (let i = 0; i < text.length; i += 1) {
    const unit = text[i];
    if (unit >= '\uD800' && unit <= '\uDBFF') {
      // THE PAIR READ IS BOUNDED (item `(2b)`): an out-of-range canonical index is not the wrapper's own
      // property, so it is never asked of the chain.
      if (i + 1 >= text.length) return true;
      const low = text[i + 1];
      if (!(low >= '\uDC00' && low <= '\uDFFF')) return true;
      i += 1;
    } else if (unit >= '\uDC00' && unit <= '\uDFFF') {
      return true;
    }
  }
  return false;
}

/// **THE ECMASCRIPT STANDARD `Object.prototype` MEMBER SET — A FIXED, REALM-INDEPENDENT LIST, SPELLED HERE
/// AND NOT READ FROM ANY PROTOTYPE.**
///
/// **⟶ `contract.md §1`'s clause of 2026-10-24 (`docs/defects.md` · `DEF-2026-10-24-C`), items `(1)(c)`,
/// `(2)` and `(3)`, ARE THIS LIST'S WHOLE AUTHORITY.** Item `(1)(c)` makes the plain-object limb a
/// CARRYING test against the standard `Object.prototype` member set, item `(2)` makes the array limb the
/// same test against the standard `Array.prototype` set with an `Object.prototype`-SHAPED prototype above it,
/// and item `(3)` is why the sets are SPELLED rather than read: **an INJECTED own member on EITHER realm's
/// prototype must leave a lawful value's verdict unchanged, and a set derived from a live prototype would
/// carry the injected name and then DEMAND it of the other realm's values** — the realm-agreement failure
/// `DEF-2026-10-24-C` measured. **THE CENSUS THE TEST READS OFF THE VALUE'S OWN PROTOTYPE IS STILL READ PER
/// CALL (`plainProtoNames`, `arrayProtoNames`, `arrayProtoSymbols` below); what is fixed here is only the
/// STANDARD half of the reference set, which is a fact about ECMAScript and not about any realm's state.**
/// **`Object.prototype` carries no own SYMBOL member**, so item `(1)(c)`'s symbol half is empty for the
/// object limb and no symbol is compared there.
const OBJECT_PROTO_STANDARD_NAMES = [
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString',
];

/// **THE ECMASCRIPT STANDARD `Array.prototype` NAME SET AND SYMBOL-DESCRIPTION SET — a fixed,
/// realm-independent pair of lists, for the reason `OBJECT_PROTO_STANDARD_NAMES` states** (`contract.md §1`'s
/// clause of 2026-10-24, items `(2)` and `(3)`). **The symbols are compared BY DESCRIPTION and never by
/// identity** — `Symbol.iterator` in another realm is a DIFFERENT symbol value, and a cross-realm array must
/// be ADMITTED (`docs/specs/storeroom-js/crossing.md §1.2` row `5`).
const ARRAY_PROTO_STANDARD_NAMES = [
  'length',
  'constructor',
  'at',
  'concat',
  'copyWithin',
  'fill',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'lastIndexOf',
  'pop',
  'push',
  'reverse',
  'shift',
  'unshift',
  'slice',
  'sort',
  'splice',
  'includes',
  'indexOf',
  'join',
  'keys',
  'entries',
  'values',
  'forEach',
  'filter',
  'flat',
  'flatMap',
  'map',
  'every',
  'some',
  'reduce',
  'reduceRight',
  'toReversed',
  'toSorted',
  'toSpliced',
  'with',
  'toLocaleString',
  'toString',
];
const ARRAY_PROTO_STANDARD_SYMBOL_DESCRIPTIONS = ['Symbol.iterator', 'Symbol.unscopables'];

/// `Object.prototype`'s own property names — **read PER CALL from THIS realm's own prototype. They are the
/// LIVE HALF of the reference set the plain-object test compares against.**
///
/// **⟶ READ PER CALL, NOT ONCE AT LOAD: THE LOAD-TIME CACHE WAS A FAIL-CLOSED DoS.** `C-11` of the gate-4
/// adversarial pass measured it: the sets stood as module-level `const`s taken at load, so a LATER own
/// property change to `Array.prototype` (or to `Object.prototype`) left every array address and every plain
/// `cfg` comparing against a key set the realm no longer has — `arrayClass` and `protoClass` then answered
/// `'class'`, the walk refused `[]` and `{}` alike, and the refusal was reached at `on`'s own step 1. **THE
/// SETS ARE FACTS ABOUT THE PROTOTYPES AS THEY ARE AT THIS CALL**, so they are read where they are used;
/// the reading is unchanged in every other respect (by NAME and by SYMBOL DESCRIPTION, never by a symbol's
/// identity — `§1.2` row 5, `§1.3` row 13).
///
/// **⟶ AND `C-11` STANDS UNMOVED BY `contract.md §1`'s CLAUSE OF 2026-10-24: THE PER-CALL READ IS KEPT AND
/// ONLY THE EQUALITY AGAINST IT IS REMOVED** (item `(4)`). The reference set is `referenceSet(...)` below —
/// the standard list INTERSECTED with this per-call reading — so the equality test cannot be reconstructed
/// here, a caller-side mutation leaves no stale set behind, and (item `(3)`) it cannot move a verdict either.
///
/// **⟶ AND NO CENSUS IS HANDED TO `new Set(...)` ANY MORE — `contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-1`, items `(1c)(ii)`, `(2b)`'s rows `1`, `2`, `8` and `11`, and `(10a)` (`S2`).** The static is lawful
/// and its RESULT'S ITERATION is not: `new Set(census)` consumes the census array through
/// `Array.prototype[Symbol.iterator]`, so a FORGED iterator emptied or filled the set and a prototype that
/// owns nothing then passed the carrying test (`Object.create(Object.create(null))` CROSSED as a plain
/// object, item `(1f)(ii)`'s first measured state). **THE FORM IS ITEM `(1c)(i)`'S: THE CENSUS ARRAY ITSELF,
/// KEPT AND READ BY INDEX** — no `Set`, no iterator, no `for … of` over a result.
///
/// **⟶ AND THE READ IS CHARGED ITS OWN LENGTH FROM 2026-10-24** (`contract.md §2.1`'s clause of this date on
/// `F7-2`, item `(4c)(iii)`: *"one own-NAME census read — `1 + the length of the list it returns`"*, and item
/// `(4e)`: the allowance is threaded into this reader and it answers the WITH branch's conservative answer
/// where the spend is refused). `null` is that answer — a census the caller may not pay for is not a census
/// this reader may compare against, so `isStandardObjectPrototype` answers `false` (the class answer) and the
/// guard keeps walking instead of exempting a link on a read it could not charge.
function plainProtoNames(allowance) {
  const names = Object.getOwnPropertyNames(Object.prototype);
  if (!spendGuardRead(allowance, 1 + names.length)) return null;
  return names;
}

/// `Array.prototype`'s own property names and its own symbols' descriptions, **read PER CALL from THIS
/// realm's own prototype**. **They are the LIVE HALF of the reference set the ARRAY half of the class
/// decision compares against**, and the comparison is by NAME and by SYMBOL DESCRIPTION — never by a
/// symbol's identity, because `Symbol.iterator` in another realm is a DIFFERENT symbol value, and a
/// cross-realm array must be ACCEPTED (`§1.2` row 5, `§1.3` row 13). **See `plainProtoNames` above for why
/// these are not cached (`C-11`) and for why the per-call read survives the clause of 2026-10-24.**
/// **And for the reason `plainProtoNames` above spells: the census array is READ BY INDEX and never handed to
/// `new Set(...)` (`F7-1`, items `(2b)` row `2` and `(10a)`).**
function arrayProtoNames(allowance) {
  const names = Object.getOwnPropertyNames(Array.prototype);
  if (!spendGuardRead(allowance, 1 + names.length)) return null;
  return names;
}

/// **⟶ AND THIS READ TAKES NO METHOD FROM A MUTABLE PROTOTYPE: `Array.prototype.map` IS GONE FROM IT.**
/// `contract.md §1`'s clause of 2026-10-24 on `F-RA-3`, item `(3)`, declares a DELETION in the CALLER's realm
/// admission-preserving — the deleted name leaves the reference set's live half and with it the requirement —
/// and the as-built read spelled `Object.getOwnPropertySymbols(Array.prototype).map((s) => s.description)`,
/// **so `delete Array.prototype.map` in this realm made the CENSUS READ ITSELF throw and `arrayClass`'s guarded
/// `try` turned that `TypeError` into `'class'`: a caller's deletion became a REFUSAL of its own array, the
/// one direction item `(3)` forbids.** The read is now a plain indexed loop over an ordinary array
/// (`Object.getOwnPropertySymbols`'s own result, read by index, so no iterator and no method of a live
/// prototype is consulted), and the census is the same census.
///
/// **⟶ AND THE DESCRIPTION READ IS ITSELF MEMBER-FREE FROM 2026-10-24** (`contract.md §2.1`'s clause of this
/// date on `F7-1`, item `(2b)`'s rows `3`, `4` and `12`, and `(10a)`): `symbols[i].description` is
/// `Symbol.prototype.description`'s ACCESSOR taken off a MUTABLE PROTOTYPE, so a caller's getter answered for
/// every symbol and the ARRAY LIMB'S class was decided by it — the measured state `(1f)(ii)` names at row `(e)`,
/// where a genuine array on a one-symbol array-shaped prototype CROSSED. **THE FORM IS A SPEC CONVERSION ON A
/// SYMBOL PRIMITIVE** (`String(sym)`'s `SymbolDescriptiveString`, the same lawful form item `(2b)`'s row `27`
/// records for `String(number)`), **and the description is spelled back by a local index loop** — the string's
/// own exotic index reads (`(1c)(v)`) and `+=` (`(1c)(i)`), never `slice`, never a method of a prototype.
function symbolDescription(symbol) {
  const spelled = String(symbol);
  let description = '';
  for (let i = 7; i < spelled.length - 1; i += 1) description += spelled[i];
  return description;
}

/// **⟶ AND THE RESULT IS AN ARRAY, NOT A `Set`** (`F7-1`, items `(2b)` row `4` and `(10a)`): a `Set`'s
/// membership is `Set.prototype.has` and its construction consumes its argument through an ITERATOR, and both
/// are mutable-prototype members by item `(1d)(iv)`. The census is read by index wherever it is compared.
function arrayProtoSymbols(allowance) {
  const symbols = Object.getOwnPropertySymbols(Array.prototype);
  const descriptions = [];
  for (let i = 0; i < symbols.length; i += 1) descriptions[descriptions.length] = symbolDescription(symbols[i]);
  // THE OWN-SYMBOL CENSUS READ IS `1 + length` TOO (item `(4c)(iv)`); `null` is the conservative answer.
  if (!spendGuardRead(allowance, 1 + symbols.length)) return null;
  return descriptions;
}

/// **THE REFERENCE SET — `contract.md §1`'s clause of 2026-10-24, item `(4)`: THE STANDARD SET INTERSECTED
/// WITH THIS REALM'S LIVE CENSUS READ AT THIS CALL.**
///
/// **THE INTERSECTION IS NOT A CONVENIENCE: IT IS ITEM `(3)`'S DECLARED SAFETY IN THE ONE DIRECTION THAT IS
/// NOT FROZEN.** An ADDED member is not in the standard list, so the intersection cannot see it and the
/// verdict cannot move (item `(3)`); a DELETED standard member is dropped from the live half, so the
/// intersection only ever REMOVES a requirement and a deletion can never turn an admission into a refusal —
/// `C-11`'s fail-closed DoS in the other direction, equally forbidden (item `(4)`'s closing sentence).
///
/// **⟶ AND THE SET IS A LIST — `contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, item `(2b)`'s row `5` and
/// item `(1c)(vi)`, WHICH SPELLS THE REPLACEMENT: *"A MEMBERSHIP TEST WRITTEN AS A LOCAL LOOP"*.** A `Set`'s
/// construction consumes an argument through an iterator and its membership is `Set.prototype.has`; both are
/// mutable-prototype members by item `(1d)(iv)`, and the measured states `(1f)(ii)` names at rows `(c)` and
/// `(d)` are exactly this membership answering a caller's forged `has`/`add`. The intersection is the same
/// intersection: a local loop, a spelled `===`, and an index append.
function referenceSet(standardMembers, liveCensus, allowance) {
  // **⟶ AND THE ALLOWANCE IS THREADED IN HERE TOO** (item `(4e)`): a census the caller could not pay for is
  // not a reference set, so the intersection answers `null` and its caller answers its branch's conservative
  // answer. The memberships themselves are spelled `===` comparisons over lists already charged their length
  // (item `(4c)(viii)`: a spelled relational comparison is `0`).
  if (liveCensus === null) return null;
  const reference = [];
  for (let i = 0; i < standardMembers.length; i += 1) {
    const member = standardMembers[i];
    for (let j = 0; j < liveCensus.length; j += 1) {
      if (liveCensus[j] === member) {
        reference[reference.length] = member;
        break;
      }
    }
  }
  return reference;
}

/// **`§1`'s `(1)(b)` AND `(1)(c)` — A PROTOTYPE THAT IS TERMINAL AND CARRIES THE STANDARD `Object.prototype`
/// MEMBER SET**, which is what `contract.md §1`'s clause of 2026-10-24 calls an *"`Object.prototype`-SHAPED
/// prototype"* in item `(2)`.
///
/// **(b) THAT PROTOTYPE IS TERMINAL: `[[GetPrototypeOf]](proto)` is `null`** — it stands one link from the
/// value and ends the chain. **This condition, and no census comparison, is what refuses a CLASS INSTANCE**
/// (row `14`): a class's prototype's own prototype is an `Object.prototype` and is therefore not `null`.
/// **(c) THAT PROTOTYPE CARRIES THE STANDARD SET**, by `referenceSet` above: every member of the reference set
/// is an own member of the prototype, **and any FURTHER own member it carries is IRRELEVANT — it neither
/// admits nor refuses** (item `(1)(c)`'s own closing words). **No COUNT is compared anywhere here**, which is
/// the two equality tests the clause removed at `:741`–`:742` and `:779`–`:781`.
///
/// The guarded `try` stands where the shipped ones stood: a prototype whose own reads THROW (a `Proxy` used
/// as a prototype, a revoked one) answers `false` — the class answer — and nothing escapes this frame.
/// **⟶ AND EVERY READ IT TAKES IS CHARGED TO THE ONE PER-CALL ALLOWANCE FROM 2026-10-24**
/// (`contract.md §2.1`'s clause of this date on `F7-2`, items `(4a)`, `(4c)` and `(4e)`): the link's
/// `getPrototypeOf` read is `1`, the own-name census read it takes is `1 + its length`, and the live
/// `plainProtoNames` census is the same figure — **the three terms item `(4a)` names as the ones no charge
/// reached.** Where a spend is refused this predicate answers `false`, i.e. **"not a standard shape"**: the
/// conservative direction, since the class answer is `'class'` and the render guard keeps walking instead of
/// exempting a link whose census it could not pay for.
function isStandardObjectPrototype(proto, allowance) {
  if (proto === null) return false;
  // **⟶ `contract.md §2`'s clause of 2026-10-24 on `F-RA-12`, item `(6)(a)`: A PROTOTYPE LINK THAT IS A
  // `Proxy` — INCLUDING A REVOKED ONE — IS `false`, WITH NO TRAP RUN AND BEFORE ANY CENSUS READ OF IT.** A
  // trap that RETURNS a shape is not answered by the `catch` below (a `catch` cannot un-run a trap that
  // returns), so a LYING `ownKeys`/`getPrototypeOf` handler turned a subclass-shaped prototype into an
  // admission: `Object.create(lyingProxy)` crossed as a plain object. `util.types.isProxy` reads no member
  // and invokes no handler, and a shape the package may not read is not a shape the value carries. **THE
  // GROUND IS `§1`'s OWN** — this guard covers `protoClass`'s whole census path, `arrayClass`'s chain link
  // and `isLanguageStandardPrototype`'s `above` read, so no limb and no conversion test reads a proxy link.
  if (types.isProxy(proto)) return false;
  let names;
  try {
    if (!spendGuardRead(allowance, 1)) return false; // ONE `getPrototypeOf` CALL — item `(4c)(ii)`
    if (Object.getPrototypeOf(proto) !== null) return false; // (b) TERMINAL
    // **⟶ AND THE CENSUS IS KEPT AS AN ARRAY AND COMPARED BY INDEX** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(2b)`'s row `6` and `(10a)`): `new Set(...)` consumed the
    // read through `Array.prototype[Symbol.iterator]` and its `has` was `Set.prototype.has`, so a forged
    // iterator or a forged `has` decided the CLASS — `Object.create(Object.create(null))` crossed and
    // `[1]` on a one-symbol array-shaped prototype crossed with it. The read, the reference set and the
    // carrying test below are all local loops on ordinary arrays now.
    names = Object.getOwnPropertyNames(proto); // (c) the value's prototype's own census
  } catch {
    return false;
  }
  // THE OWN-NAME CENSUS READ, CHARGED `1 + the length of the list it returns` (item `(4c)(iii)`).
  if (!spendGuardRead(allowance, 1 + names.length)) return false;
  const reference = referenceSet(OBJECT_PROTO_STANDARD_NAMES, plainProtoNames(allowance), allowance);
  if (reference === null) return false;
  for (let i = 0; i < reference.length; i += 1) {
    const name = reference[i];
    let carried = false;
    for (let j = 0; j < names.length; j += 1) {
      if (names[j] === name) {
        carried = true;
        break;
      }
    }
    if (!carried) return false;
  }
  return true;
}

/// `crossing.md §1.4` item 4: **THE PLAIN-OBJECT TEST**, items (a)–(g) — **STRUCTURAL AND REALM-AGNOSTIC.**
/// **The prototype half is NOT an identity test against this realm's `Object.prototype`**: the prototype
/// is `null`, or a prototype whose OWN properties are exactly the plain-object prototype's. **A plain
/// object from ANY realm (`vm`, a worker, `structuredClone`) is therefore ACCEPTED** — its prototype is
/// that realm's own `Object.prototype`, whose own names are this realm's own two — **while a CLASS INSTANCE
/// is refused, because a class's prototype carries its own `constructor`** (`DD-7`, `DD-35`).
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-C`; `contract.md §1`'s clause of that date, items `(1)`, `(3)`,
/// `(5)`, `(6)`): THE PREDICATE IS `§1`'s OBJECT LIMB, TAKEN STRUCTURALLY — THE VALUE CARRIES A PROTOTYPE,
/// THAT PROTOTYPE IS TERMINAL, AND THAT PROTOTYPE CARRIES THE STANDARD `Object.prototype` MEMBER SET.**
/// The block above stands byte-for-byte and is read THROUGH this clause. **THE TWO EQUALITY TESTS THE CLAUSE
/// REMOVES ARE GONE FROM THIS BODY — `names.length !== plain.size` and `if (!plain.has(name)) return 'class'`
/// — because a COUNT and a NAME-NOT-IN-THE-SET compared the value's prototype's own census against THIS
/// realm's live prototype and so REFUSED a lawful foreign-realm plain object the moment either realm's
/// `Object.prototype` gained one own member.** What stands in their place is `isStandardObjectPrototype`
/// above: terminality (`(1)(b)`, which is what refuses a class instance and needs no census read at all) and
/// a CARRYING test against the standard set (`(1)(c)`, in which an EXTRA own member on either realm's
/// prototype is irrelevant). **A LAWYER'S NOTE ON WHAT DID NOT MOVE: the `'null'` answer and the identity
/// comparison below STAY.** The `'null'` answer is `§3`'s `p` classification for a prototype-less object —
/// admitted, and unmoved by this clause — and `proto === Object.prototype ? 'plain' : 'foreign'` LABELS an
/// admitted value's classification and decides NO admission (`§1`'s item `(5)`); a verdict that turned on it
/// would be the removed test under another name.
export function protoClass(value) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  return isStandardObjectPrototype(proto) ? (proto === Object.prototype ? 'plain' : 'foreign') : 'class';
}

/// `crossing.md §1.4` item 4 (c), (d) and item 1: an own ACCESSOR, or an own `Symbol`-keyed property,
/// REFUSES THE WHOLE VALUE — *"any other answer would DROP A MEMBER SILENTLY"* (`DD-8`).
///
/// **⟶ AND THE SCAN IS A LOCAL INDEX LOOP FROM 2026-10-24** (`contract.md §2.1`'s clause of this date on
/// `F7-1`, items `(1c)(i)`, `(2b)`'s rows `7` and `16`, and `(10a)`): the as-built read walked
/// `Object.getOwnPropertyNames(value)` with `for … of`, i.e. through `Array.prototype[Symbol.iterator]`, so a
/// caller's forged iterator **left row `15`'s accessor untested** while the census still had entries to read.
/// The census is the same census and the two descriptors read are the same two; only the consumption form
/// moved.
export function accessorOrSymbolArm(value) {
  const names = Object.getOwnPropertyNames(value);
  for (let i = 0; i < names.length; i += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, names[i]);
    if (descriptor.get || descriptor.set) return { k: 'P' };
  }
  return Object.getOwnPropertySymbols(value).length > 0 ? { k: 'y' } : null;
}

/// **THE ARRAY HALF OF THE CLASS DECISION** — `crossing.md §1.2` row 5, whose two halves are BOTH declared:
/// *"a cross-realm array IS accepted (it is an `Array`), **a class extending `Array` is not**"*, with
/// `§1.3`'s `AddressArg` row 13 accepting a cross-realm array and row 11 refusing the array-like class.
/// **THE DECISION IS STRUCTURAL AND REALM-AGNOSTIC, exactly as `§1.4` item 4 (e) makes the plain-object
/// test's**: the value's own prototype is `null`, or a prototype whose OWN property names and OWN symbol
/// descriptions are EXACTLY an array prototype's — **reached without an `instanceof` test and without a
/// comparison against this realm's `Array.prototype`, so a cross-realm array is admitted while a SUBCLASS
/// (`class V extends Array {}`, whose prototype carries its own `constructor` and little else) is refused
/// BY ITS CLASS.** (`JS-2`: `Array.isArray` may not SHORT-CIRCUIT this test — it is a predicate about the
/// exotic array-ness of the object and says NOTHING about which class the object belongs to.)
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-C`; `contract.md §1`'s clause of that date, item `(2)`): THE
/// ARRAY LIMB IS `§1`'s THREE CONDITIONS, AND ITS CHAIN HAS ONE MORE LINK THAN THE OBJECT'S — so the test
/// is stated ON THE CHAIN and never on this realm's `Array.prototype` by identity.** (a) the value carries
/// a prototype; (b) that prototype carries the standard `Array.prototype` NAME set AND the standard
/// `Array.prototype` SYMBOL-DESCRIPTION set — compared by description and never by a symbol's identity; and
/// (c) **that prototype's own prototype is an `Object.prototype`-SHAPED prototype, i.e. one satisfying
/// `§1`'s `(1)(b)` and `(1)(c)` (`isStandardObjectPrototype` above)**. **The standard chain is therefore
/// `value → Array.prototype → Object.prototype → null` in EVERY realm**, which is why a `vm` array, a
/// worker's array and a `structuredClone`d array are admitted by the same rule as this realm's own — and why
/// a class extending `Array` is refused: its prototype's own prototype is an `Array.prototype` and NOT an
/// `Object.prototype`-shaped one, so the chain check alone answers `'class'` before any census is compared.
/// **THE TWO EQUALITY TESTS THE CLAUSE REMOVES ARE GONE — `names.length !== arrayNames.size ||
/// symbols.length !== arraySymbols.size` and the two `if (!set.has(...)) return 'class'` loops — and the
/// per-call census reads and the guarded `try` stand exactly where they stood** (item `(5)`). **`Array.isArray`
/// alone may not stand as the admission test and no `instanceof` test is taken** (`JS-2`, unmoved); the
/// identity comparison in the final `return` LABELS the `p` classification and decides no admission.
/// **⟶ AND ITS READS ARE CHARGED TO THE ONE PER-CALL ALLOWANCE WHERE A CALLER CARRIES ONE** (`contract.md
/// §2.1`'s clause of 2026-10-24 on `F7-2`, item `(4e)`): its `getPrototypeOf` reads, its own-name and
/// own-symbol census reads and the two live reference censuses are the same figures
/// `isStandardObjectPrototype` charges. **A REFUSED SPEND ANSWERS `'class'`** — the limb's own class answer,
/// which is the WITH branch's conservative direction for a class decision — and a caller that carries no
/// allowance (the walk's own admission test, `isAdmittedArray`, `constraintAddress`) is charged nothing.
export function arrayClass(value, allowance) {
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return 'null';
  // **⟶ `contract.md §2`'s clause of 2026-10-24 on `F-RA-12`, item `(6)(b)`: THE ARRAY LIMB ANSWERS
  // `'class'` FOR A `Proxy` PROTOTYPE LINK — INCLUDING A REVOKED ONE — BEFORE ITS GUARDED `try` AND
  // THEREFORE BEFORE EVERY CENSUS READ BELOW.** The limb answers `'class'` and not a boolean, so the guard
  // is spelled here as well as in `isStandardObjectPrototype` above; `util.types.isProxy` reads no member,
  // runs no trap and throws for no revoked link.
  if (types.isProxy(proto)) return 'class';
  let names;
  let symbols;
  let above;
  try {
    // `C-11`: the value's prototype's own census is read at THIS call, never from a load-time constant.
    // **⟶ AND IT IS AN ARRAY, READ BY INDEX, WITH A MEMBERSHIP LOOP AND NOT A `Set`** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(1c)(vi)`, `(2b)`'s rows `8`, `11` and `12`, and
    // `(10a)`): `new Set(...)` consumed each read through `Array.prototype[Symbol.iterator]` and each
    // comparison was `Set.prototype.has`, so a forged iterator or a forged `has` answered the array limb for
    // the caller — the measured state `(1f)(ii)` row `(c)`'s `[1]`, and row `(e)`'s genuine array.
    names = Object.getOwnPropertyNames(proto);
    // **⟶ AND NO METHOD IS TAKEN FROM A MUTABLE PROTOTYPE HERE EITHER** — the as-built read spelled
    // `.map((symbol) => symbol.description)`, so `delete Array.prototype.map` in the CALLER's realm threw inside
    // this guarded frame and the catch below answered `'class'` for the caller's own lawful array
    // (`contract.md §1`'s clause of 2026-10-24 on `F-RA-3`, item `(3)`: a caller-side deletion cannot turn an
    // admission into a refusal). The loop reads the census by index, and the description is a spec conversion
    // on the symbol primitive (`symbolDescription` above), never `Symbol.prototype.description`; the guarded
    // `try` still stands for a prototype whose own reads THROW (a `Proxy` used as a prototype, a revoked one).
    const ownSymbols = Object.getOwnPropertySymbols(proto);
    symbols = [];
    for (let i = 0; i < ownSymbols.length; i += 1) symbols[symbols.length] = symbolDescription(ownSymbols[i]);
    above = Object.getPrototypeOf(proto); // (c) the chain's next link: `Array.prototype → Object.prototype`
  } catch {
    return 'class';
  }
  // THE THREE READS JUST TAKEN, EACH AT ITEM `(4c)`'S OWN FIGURE: two own censuses at `1 + length` and the
  // one `getPrototypeOf` call at `1`. A refused spend answers the limb's own class answer.
  if (!spendGuardRead(allowance, 1 + names.length)) return 'class';
  if (!spendGuardRead(allowance, 1 + symbols.length)) return 'class';
  if (!spendGuardRead(allowance, 1)) return 'class';
  if (!isStandardObjectPrototype(above, allowance)) return 'class';
  const liveNames = arrayProtoNames(allowance);
  if (liveNames === null) return 'class';
  const arrayNames = referenceSet(ARRAY_PROTO_STANDARD_NAMES, liveNames, allowance);
  const liveSymbols = arrayProtoSymbols(allowance);
  if (liveSymbols === null) return 'class';
  const arraySymbols = referenceSet(ARRAY_PROTO_STANDARD_SYMBOL_DESCRIPTIONS, liveSymbols, allowance);
  for (let i = 0; i < arrayNames.length; i += 1) {
    const name = arrayNames[i];
    let carried = false;
    for (let j = 0; j < names.length; j += 1) {
      if (names[j] === name) {
        carried = true;
        break;
      }
    }
    if (!carried) return 'class';
  }
  for (let i = 0; i < arraySymbols.length; i += 1) {
    const description = arraySymbols[i];
    let carried = false;
    for (let j = 0; j < symbols.length; j += 1) {
      if (symbols[j] === description) {
        carried = true;
        break;
      }
    }
    if (!carried) return 'class';
  }
  return proto === Array.prototype ? 'plain' : 'foreign';
}

/// **A GENUINE ARRAY** — `Array.isArray`'s own answer AND the class decision beside it: an exotic
/// array-like object whose class is a class extending `Array` is NOT a genuine array (`JS-2`).
export function isAdmittedArray(value) {
  return Array.isArray(value) && arrayClass(value) !== 'class';
}

/// **A PLAIN OBJECT**, in the sense `docs/specs/storeroom-js/surface.md §2.1` takes `cfg` and `§1.3`'s `ListenersArg` row 2 takes an entry:
/// not `null`, `typeof x === 'object'`, not an `Array`, **not a `Proxy`** (`DD-34`) and not a class
/// instance or any other prototype-carrying object (`§1.4` item 4 (e), (f), (g)). **A PLAIN OBJECT FROM
/// ANY REALM IS ACCEPTED** — the (e)-half is structural, never an identity test (`DD-7`, `DD-35`).
export function isPlainObjectValue(value) {
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value) || types.isProxy(value)) return false;
  return protoClass(value) !== 'class';
}

/// **THE CLASS THAT FAILED, SPELLED FOR THE VERBOSE REJECTION** (`A76`: *"the rejection names the failing
/// target and the reason"*; `surface.md §2.5` item 5 (b): *"the reason is the CLASS the value HAS — named as
/// `§1.2`'s or `§1.3`'s own class, never as a class the value could be converted to"*). **IT READS NO
/// MEMBER THROUGH ANY CHAIN** — `typeof`, `util.types.isProxy`, `Array.isArray`, `getPrototypeOf` and the
/// two own-key-set predicates alone: no `.constructor`, no `.name`, no `.toString` and no `in`.
export function classSpelling(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const kind = typeof value;
  if (kind !== 'object' && kind !== 'function') return `a ${kind}`;
  if (types.isProxy(value)) return 'a Proxy';
  if (Array.isArray(value)) return arrayClass(value) === 'class' ? 'a class extending Array' : 'an Array';
  if (kind === 'function') return 'a function';
  return protoClass(value) === 'class'
    ? 'a class instance or another prototype-carrying non-plain object'
    : 'a plain object';
}

/// **THE FAILING TARGET, RENDERED AS THE STORE'S GENERATOR RENDERS IT** — `surface.md §2.5` item 5 (a),
/// verbatim: *"a non-segment value PRINTED AS ITS OWN VALUE, SINGLE-QUOTED (`10n` for a `bigint`, `Symbol()`
/// for a symbol) where the failure is about a value and not about a segment — because the store's generator's
/// own rule prints a non-segment argument that way, and this unit may not invent a second rendering of a
/// target the store already renders"*. **THE GENERATOR APPLIES THE QUOTING ITSELF** (it spells the subject
/// `'<subject>'`), so the BARE rendering is what is handed to it.
///
/// **AND THE RENDERING IS GUARDED, WHICH IS `A76`'S OWN INSTRUCTION:** *"a throwing `valueOf`/
/// `Symbol.toPrimitive`/`Proxy` trap must be caught and answered as the declared refusal (catch, then
/// classify — never propagate the host error)"*. A rendering that throws answers the CLASS spelling instead
/// — **the class half of the reason is mandatory (`§2.5` item 5 (b)), so the rejection still carries it** —
/// and nothing escapes this frame either way.
export function targetSpelling(value) {
  try {
    // **`§2.5` item 5 (a)'s OWN TWO EXAMPLES, RENDERED EXACTLY:** *"`10n` for a `bigint`, `Symbol()` for a
    // symbol"* — a `bigint` is printed with the `n` its own JS spelling carries (which
    // `BigInt.prototype.toString` drops) and a `symbol` is printed `Symbol()`, while every other target class
    // is printed as its own value.
    if (typeof value === 'bigint') return `${value}n`;
    // **⟶ AND A `Proxy` IS NEVER COERCED, BY THIS RENDERER EITHER (`C-1`'s third half, 2026-10-11).** The
    // renderer is reached on the refusal path of a value the walk has ALREADY refused as `AddressArg` row 12
    // — and `String(value)` on a `Proxy` invokes its `get` trap for `Symbol.toPrimitive` and for `toString`,
    // **so the walk's own refusal message RAN THE TRAPS the walk exists to avoid running.** `classSpelling`
    // reads the class with `util.types.isProxy` alone, invoking nothing, so the target half is still the
    // class the value HAS — no trap runs on this path either, and the same refusal is reachable `on` and
    // `read` alike.
    // **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-3`, items `(3a)`–`(3d)`; the owed
    // byte is `implementation-plan.md §2` step `4`'s arm `(ix)`): THE GUARD READS "OR CALLABLE".** The block
    // above stands byte-for-byte and is read THROUGH this clause; its universal is what the one test below now
    // makes true. **THE STATE IT CLOSES:** the shipped test guarded a `Proxy` only when `typeof value ===
    // 'object'`, so a CALLABLE `Proxy` — `typeof 'function'` — fell past it to `String(value)`, whose
    // `ToPrimitive` read `Symbol.toPrimitive` and then `toString` THROUGH THE `get` TRAP at every carrier slot
    // that renders its argument. **THE FORM IS THE SIBLING ARM'S OWN** (`valueTargetSpelling`'s test
    // below): object **or** function, then `types.isProxy`, then the class spelling — the `Proxy` class is ONE
    // class and the renderer's `typeof` split is not a fact about it. Nothing else at this renderer moves: the
    // `bigint` limb, `String(value)`, the `try` and the `catch` all stand, and no identity is compared and no
    // prototype is frozen (`C-11` is untouched).
    if ((typeof value === 'object' || typeof value === 'function') && value !== null && types.isProxy(value)) {
      return classSpelling(value);
    }
    return String(value);
  } catch {
    return classSpelling(value);
  }
}

// ---------------------------------------------------------------------------------------------
// `A76`'S VERBOSE REJECTION AT A **VALUE** POSITION — `surface.md §2.5` item 6 (a)–(d), read with
// the `CF-3` authority split that same section declares
// ---------------------------------------------------------------------------------------------
//
// **THE FINDING THIS BLOCK CLOSES, NAMED AS THE SET MEASURED IT** (`archive/gate5/storeroom-js-greens-run.md`
// §3, FINDING 1; `JSG-04.1.v` · `JSG-04.2.v` · `JSG-04.4.v`): every class the WALK refuses at a VALUE
// position answered ONE byte-identical message — the store's generic `ValueNotAdmitted` clause at the
// WRITE ADDRESS's own spelling — so **the reason's class half was absent at every value position**
// (`§2.5` item 6 (b) makes it MANDATORY), **the position half was absent where the contract declares one**
// (item 6 (b): *"the ARGUMENT POSITION for a verb's arguments, and the MEMBER POSITION for a member inside a
// value the walk reached"*), **and PART ONE's target was the wrong datum**: the failure is about a VALUE,
// and item 6 (a) declares that *"a non-segment value [is] PRINTED AS ITS OWN VALUE, SINGLE-QUOTED (`10n` for a
// `bigint`, `Symbol()` for a symbol) where the failure is about a value and not about a segment"*.
//
// **THE TWO PARTS OF THE COMPOSITE, AND WHOSE BYTES EACH IS** (`CF-3`, the bounded correction pass that
// closed this implementer's own contract finding, `surface.md §2.5` item 6's closing clause):
//   1. **PART ONE IS THE STORE'S GENERATOR'S OWN, VERBATIM** — `boundaryReject` reaches the generator through
//      the addon's `errorMessage` and hands it the failing target in the generator's own `<SEGMENT>` slot, so
//      the target half is the store's bytes and never this file's (item 2; item 6 (d)).
//   2. **PART TWO IS THE BOUNDARY'S OWN AND IS APPENDED** — the class that failed, and the position where the
//      contract declares one. **IT IS APPENDED AND NOT EMBEDDED, because the generator reachable from JS
//      fills two slots and two only** — `errorMessage(code, subject)`'s `segment` and `path`
//      (`bindings/js/src/facade.rs`) — **which is exactly the `CF-3` split this item's own closing clause
//      declares.** The status is a member of the store's closed set and is carried, never minted (`DD-40`).
//
// **AND NOTHING ON THIS PATH COERCES** (`A76`'s second part, verbatim: *"do not attempt to fix"*; `§1.8`): the
// value's own class is READ, the class that failed is NAMED, and the value is REFUSED — never converted,
// substituted, defaulted or truncated. The rendering of the target is the one guarded read `targetSpelling`
// already declares (`JS-1`: catch, then classify — never propagate the host error).

/// **THE POSITION A VALUE OCCUPIES** — `surface.md §2.5` item 6 (b): *"the ARGUMENT POSITION for a verb's
/// arguments, and the MEMBER POSITION for a member inside a value the walk reached"*. `write` is the ONE
/// verb whose argument is a VALUE (`surface.md §2.2`), so the argument position is `write`'s own `value`
/// slot; a member the walk reached is named by its PATH from that argument, spelled with `§2.5` item 6 (a)'s
/// own segment spellings — **a string key SINGLE-QUOTED (`'a'`) and an integer index BARE (`0`), JOINED BY
/// `/`**, which is the spelling the item declares for a whole address.
export const VALUE_ARGUMENT_POSITION = "the write's value argument";

/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-4`, items `(4a)`–`(4e)`; the owed
/// byte is `implementation-plan.md §2` step `4`'s arm `(x)`): THE POSITION SPELLING INVOKES NOTHING TAKEN FROM A
/// MUTABLE PROTOTYPE.** The block above stands byte-for-byte and is read THROUGH this clause; **the three
/// segment renderings, the `/` separator, the empty key's `''` and the `member … of …` wrapper are UNMOVED.**
/// **THE STATE THIS CLOSES:** the shipped limb built the segment list with `path.map(...)` and joined it with
/// `.join('/')` — `Array.prototype.map` and `Array.prototype.join` taken from a MUTABLE PROTOTYPE — so a
/// caller's override RAN ON EVERY MEMBER-POSITION REFUSAL and its return value became the POSITION, which is
/// the package's own diagnostic datum and not a rendering of the value at all (`LIVE-F18`'s second count; the
/// file's own prohibition restated at `:1136`–`:1137` for `Object.prototype.hasOwnProperty`).
///
/// **THE FORM IS A LOCAL INDEX LOOP AND A LOCAL JOIN — `+=` INTO A `let` STRING.** No `map`, no `join`, no
/// `forEach`, no `reduce`, and no array or string METHOD taken from a prototype: the same form `Object.hasOwn`
/// already takes over `hasOwnProperty` at the walk.
function valuePosition(path) {
  if (path.length === 0) return VALUE_ARGUMENT_POSITION;
  let spelled = '';
  for (let i = 0; i < path.length; i += 1) {
    const segment = path[i];
    let rendered;
    if (typeof segment === 'number') {
      rendered = String(segment);
    } else if (hasLoneSurrogate(segment)) {
      // **A KEY THE MESSAGE MAY NOT CARRY IS NAMED BY ITS CLASS.** A member KEY holding a lone surrogate is
      // the one position this pass refuses whose own spelling cannot cross into the message at all: the
      // code unit has no `String` form a Rust `String` can carry, so the alternatives are a REPAIR (`§1.8`
      // forbids it, `A76`: *"do not attempt to fix"*) or a message that is not a string. **The position is
      // therefore spelled `'<key: a string carrying a lone surrogate>'`, which names the class the key HAS
      // and no byte of it** — the same reading `boundaryReject`'s target half takes at the segment position.
      rendered = "'<key: a string carrying a lone surrogate>'";
    } else {
      rendered = `'${segment}'`;
    }
    spelled += i === 0 ? rendered : `/${rendered}`;
  }
  return `member ${spelled} of ${VALUE_ARGUMENT_POSITION}`;
}

/// **A CONVERSION MEMBER ON THE REFUSED VALUE** — `Symbol.toPrimitive`, `toString` or `valueOf`, OWN on the
/// value **or reached through a prototype the value supplies** — **read WITHOUT invoking any of them**
/// (`getOwnPropertyDescriptor` reads a descriptor and never calls a getter, so no user code runs here either).
///
/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 (`docs/defects.md` · `DEF-2026-10-24-D`), items `(1)` and
/// `(4)`, ARE ITS AUTHORITY: `String(value)` INVOKES THE REFUSED VALUE'S CONVERSION MEMBER, AND A GUARDED
/// `catch` CANNOT UN-RUN A TRAP THAT RETURNS.** Item `(4)` re-derives **row `3`'s arm and row `8`'s DEPTH
/// arm conditionally**: each keeps the refused value's own spelling *"read WITHOUT invoking an own
/// `Symbol.toPrimitive`, `toString` or `valueOf` member of the refused value"*, and **where the refused value
/// carries such a member the arm answers the CLASS SPELLING — `'a function'` at row `3`, `'a value over the
/// walk ceiling'` at row `8`'s depth arm**. Item `(1)` states the rule generally (*"NO USER CODE RUNS ON A
/// REFUSAL PATH"*) and **says which members it means: *"whether that member is OWN on the value or reached
/// through a prototype the value supplies (a class's own `toString` method is reached exactly that way)"* —
/// so the own-descriptor read this test was filed as is ONE HALF of item `(1)`, and the chain is the
/// other.** A value whose `toString` stands on a custom prototype or on a class's own prototype runs that
/// trap through `String(value)` exactly as an own member does, and a guarded `catch` is as unable to un-run
/// it.
///
/// **THOSE TWO ARE THE ONLY ARMS THIS TEST CAN REACH WITH AN OBJECT OR A FUNCTION.** Every other rendering
/// arm carries a primitive (`null` · `undefined` · a `string` · a `boolean`-free `number` · a `bigint` · a
/// `symbol`) or the class spelling's own string, the `Proxy` arm answers `classSpelling` before this test is
/// consulted (**a `Proxy`'s descriptor read would run its `getOwnPropertyDescriptor` trap, which is why the
/// guard stands ABOVE this call**), and the six arms item `(2)` re-derives answer their row's class spelling
/// without rendering the value at all (`fault.subject`).
///
/// **⟶ AND THE CHAIN WALK STOPS AT THE LANGUAGE'S OWN PROTOTYPES, WHICH IS WHAT KEEPS THE TWO SANCTIONED
/// RENDERINGS OF ITEM `(4)`'s WITHOUT BRANCH.** An ordinary `{}` reaching `Object.prototype.toString`, an
/// array reaching `Array.prototype.toString` and a function reaching the standard `Function.prototype.toString`
/// machinery supply **no member the caller wrote**, so `'[object Object]'`, `'1,2'` and a function's own
/// source text stay the subject at the BASE of both conditional arms — item `(4)`'s own words for row `3` are
/// *"read through the standard `Function.prototype.toString` machinery (`String(fn)`'s answer for a function
/// that carries no conversion member of its own)"*, and a fix that answered the class spelling for an
/// ordinary value would be an OVER-REFUSAL the law does not declare. **The stop is STRUCTURAL, from the link
/// and from nothing else** (`isLanguageStandardPrototype` below), so a foreign realm's `Object.prototype`,
/// `Array.prototype` and `Function.prototype` are recognised on the same terms as this realm's, and a class's
/// own `toString` — one link above a class's prototype, which is not standard-shaped — is still found.
const CONVERSION_MEMBER_KEYS = [Symbol.toPrimitive, 'toString', 'valueOf'];

/// **ONE LINK'S OWN CONVERSION MEMBER, ASKED BY DESCRIPTOR AND NOTHING ELSE.** No getter is invoked (a
/// descriptor read does not call one), no `hasOwnProperty` is taken from a mutable prototype, no `Reflect.get`
/// is spelled on an accessor, and neither `in` nor `for…in` is used (each would reach the CHAIN, which this
/// walk takes itself so that every link can be classified before it is asked).
/// **⟶ AND THE KEY LIST IS CONSUMED BY INDEX, NOT THROUGH THE ITERATOR PROTOCOL** (`contract.md §2.1`'s
/// clause of 2026-10-24 on `F7-1`, items `(1c)(i)`, `(2b)`'s row `33` and `(10b)`): the array of well-known
/// symbol VALUES is lawful (`(1d)(iii)` — a value read off the `Symbol` binding is not a prototype member),
/// but `for … of` over it takes `Array.prototype[Symbol.iterator]`, and a caller's forged iterator could stop
/// the search before the caller's own `toString` was asked.
/// **⟶ AND EACH OF THE THREE DESCRIPTOR READS IS CHARGED `1`** (`contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-2`, item `(4c)(i)`, and item `(4e)`'s threading): where the spend is refused the answer is `true` —
/// "a conversion member stands here" — which is the WITH branch's conservative answer (the class spelling),
/// so an unpayable read never renders a value.
function ownsConversionMember(link, allowance) {
  for (let i = 0; i < CONVERSION_MEMBER_KEYS.length; i += 1) {
    if (!spendGuardRead(allowance, 1)) return true;
    if (Object.getOwnPropertyDescriptor(link, CONVERSION_MEMBER_KEYS[i]) !== undefined) return true;
  }
  return false;
}

/// **A PROTOTYPE THE LANGUAGE ITSELF SUPPLIES**, recognised STRUCTURALLY so that no realm's identity and no
/// prototype census equality is compared: an `Object.prototype`-shaped prototype (`§1`'s `(1)(b)` and
/// `(1)(c)` — `isStandardObjectPrototype` above), an exotic array standing one link above such a prototype
/// (any realm's `Array.prototype` IS an array, and `§1`'s `(2)` states its chain), or a callable standing one
/// link above such a prototype (any realm's `Function.prototype` IS a function). **Its own conversion members
/// are ECMAScript's machinery and not the caller's code**, so the walk above it STOPS there.
/// **⟶ AND BOTH ITS SHAPE JUDGEMENTS AND ITS ONE `getPrototypeOf` READ ARE CHARGED TO THE ONE ALLOWANCE**
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F7-2`, item `(4e)`): every read that decides whether the
/// walk STOPS here is a read of the budget, so no exemption is granted on reads the caller could not pay for.
/// Where the spend is refused the answer is `false` — **NOT exempted** — which keeps the conversion search
/// going (the conservative direction: the WITH branch, the class spelling).
function isLanguageStandardPrototype(link, allowance) {
  if (isStandardObjectPrototype(link, allowance)) return true;
  if (!Array.isArray(link) && typeof link !== 'function') return false;
  if (!spendGuardRead(allowance, 1)) return false; // ONE `getPrototypeOf` CALL — item `(4c)(ii)`
  const above = Object.getPrototypeOf(link);
  return above !== null && isStandardObjectPrototype(above, allowance);
}

/// **THE VALUE'S CONVERSION MEMBER, ANYWHERE THE CALLER SUPPLIED IT** — own on the value, or owned by any
/// prototype its chain reaches before the language's own. **A `Proxy` LINK IS NOT ASKED ANYTHING**: a
/// descriptor read on one runs its `getOwnPropertyDescriptor` trap, so a chain carrying one answers `true`,
/// which costs the arm its class spelling and runs no handler (`C-1`'s form, at this limb).
///
/// **ITS NAME MOVES WITH THE LAW** — the shipped `carriesOwnConversionMember` read own descriptors only, and
/// that read is the first test below, not the whole of it.
///
/// **⟶ AND `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1a)`, ADDS ONE KEY TO THE LINK
/// WALK: AN **ADDED** `Symbol.toPrimitive` ON A SHAPE-STANDARD PROTOTYPE IS A CONVERSION PATH THE ARM MAY NOT
/// TAKE, AND IT IS SEPARATED FROM AN INTRINSIC BY ONE OWN-DESCRIPTOR READ OF THAT KEY PER LINK, TAKEN BEFORE
/// THE EXEMPTION STOPS THE WALK.** The exemption's carrying test asks NAMES only and no realm's
/// `Object.prototype`, `Array.prototype` or `Function.prototype` carries an own `Symbol.toPrimitive`, so an
/// ADDED one left the shape test TRUE, the stop at the language's own prototype exempted the link, and
/// `String(value)` reached it — ToPrimitive's `@@toPrimitive` lookup being a `[[Get]]` that traverses the
/// chain. **THIS IS NOT THE REJECTED THREE-KEY ORDERING SWAP** (that clause's item `(6)`): the swap asks all
/// three keys of every shape-standard link and would withdraw `'[object Object]'`, `'1,2'` and a function's
/// source text; THIS ASKS ONE KEY and answers "does not carry" for every intrinsic prototype, so item `(2)`'s
/// three sanctioned renderings stand. **THE WALK CONTINUES PAST THE STOP FOR THIS KEY ALONE** — the
/// rendering traverses the WHOLE chain for `@@toPrimitive`, so a member added to a link ABOVE a
/// language-standard one is reached by the rendering just the same — while the `toString`/`valueOf` search
/// still ends at the language's own machinery, which is item `(7)`'s reading of *"own"* for the one key.
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F6-1`, items `(1a)`, `(1c)`, `(1d)`
/// and `(1f)`): EVERY LINK THIS WALK ENTERS IS CHARGED TO THE ONE PER-CALL POSITION BUDGET.** The block above
/// stands byte-for-byte and is read THROUGH this clause; **every descriptor read, the shape test, the
/// exemption's stop, the `Proxy` answer and the guarded `catch` stand unmoved.** The shipped walk was
/// one-argument and walked its chain link by link to `null` WITH NO CHARGE ANYWHERE, so an element set
/// multiplying chain traversals re-scaled the very cost the per-call budget was ruled to close (item `(1b)`).
/// **THE SPEND IS ONE POSITION PER LINK, TAKEN ON ENTRY AND BEFORE THE FIRST READ OF THAT LINK** — through
/// `spendGuardPosition` below, the one figure `NODE_CEILING` and NO SECOND CEILING — and where the spend is
/// refused this reader answers `true`, i.e. **"caller code is reachable"**, so the arm takes its class
/// spelling and nothing is rendered (the WITH branch's conservative answer, un-re-deciding the guard's one
/// conjunction). **THE ALLOWANCE IS THE CALLER'S AND IS NEVER OPENED HERE:** it is the fresh per-call `budget`
/// `renderGuardTrips` creates, threaded in by that entry, so no census, chain length or memo is captured and
/// `C-11` is untouched.
///
/// **⟶ AND EVERY READ THIS WALK TAKES IS CHARGED THE SAME WAY FROM 2026-10-24** (`contract.md §2.1`'s clause
/// of this date on `F7-2`, items `(4c)` and `(4e)`): one link entered is `1` (already charged on entry), its
/// `@@toPrimitive` descriptor read is `1`, each descriptor read of `ownsConversionMember` is `1`, every
/// `getPrototypeOf` call — the value's own and the loop's — is `1`, and the shape judgement's census reads are
/// `1 + length`. Where a spend is refused every branch answers `true`, **"caller code is reachable"**, which
/// is the WITH branch's conservative answer and the arm's class spelling.
function carriesConversionMember(value, allowance) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  try {
    if (types.isProxy(value)) return true;
    if (ownsConversionMember(value, allowance)) return true;
    if (!spendGuardRead(allowance, 1)) return true; // the `getPrototypeOf` read below — item `(4c)(ii)`
    let link = Object.getPrototypeOf(value);
    let aboveTheExemption = false;
    while (link !== null) {
      // ONE POSITION PER LINK ENTERED (item `(1c)`), charged BEFORE the read that reached the link, so no
      // chain can be entered unpaid and exhaustion answers "caller code is reachable".
      if (!spendGuardPosition(allowance, 1)) return true;
      if (types.isProxy(link)) return true;
      // ITEM `(1a)`'S READ — ONE KEY, OWN, BY DESCRIPTOR (so no getter is called), BEFORE THE STOP.
      if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
      if (Object.getOwnPropertyDescriptor(link, Symbol.toPrimitive) !== undefined) return true;
      if (!aboveTheExemption) {
        if (isLanguageStandardPrototype(link, allowance)) {
          // the language's own machinery: the `toString`/`valueOf` search ends here, the `@@toPrimitive`
          // read above does not
          aboveTheExemption = true;
        } else if (ownsConversionMember(link, allowance)) {
          return true;
        }
      }
      if (!spendGuardRead(allowance, 1)) return true; // the loop's `getPrototypeOf` — item `(4c)(ii)`
      link = Object.getPrototypeOf(link);
    }
    return false;
  } catch {
    // **A CHAIN THAT CANNOT BE READ ANSWERS `true`** — the arm takes its class spelling, the rendering is not
    // attempted, and the guarded `catch` that stands beside this call in `valueTargetSpelling` is not needed.
    return true;
  }
}

/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1b)`: AN OWN OR ADDED
/// `Symbol.toStringTag` MEMBER IS THE RENDER GUARD'S SECOND TEST.** `Object.prototype.toString` reads
/// `@@toStringTag` off the refused value — a `[[Get]]` that traverses the chain — so an own `@@toStringTag`
/// ACCESSOR is INVOKED at row `8`'s depth arm (a value the walk refused on ENTRY, above the shape arm that
/// would have refused an own accessor) and an ADDED one on a shape-standard prototype is reached the same
/// way. **THE READ IS TAKEN FOR THE KEY AND NOT MERELY FOR THE ACCESSOR BIT, DELIBERATELY**: a DATA
/// `@@toStringTag` member would move the SUBJECT (`String({ [Symbol.toStringTag]: 'X' })` is `'[object X]'`),
/// and a subject that depends on a caller's data is not the declared form — the accessor case is the no-run
/// case and the data case is the determinism case, and ONE descriptor read answers both. **NO ADMISSION
/// MOVES**: a value carrying an own `Symbol`-keyed member is refused at its own position as row `5` already,
/// and at row `8`'s depth arm it is refused as row `8` regardless. **NO REALM'S INTRINSIC PROTOTYPE CARRIES
/// AN OWN `@@toStringTag`**, so the read answers "absent" for every intrinsic chain and item `(2)`'s
/// renderings stand.
///
/// **⟶ AND THIS WALK IS CHARGED THE SAME WAY** (`contract.md §2.1`'s clause of 2026-10-24 on `F6-1`, items
/// `(1c)`, `(1d)` and `(1f)`): **ONE POSITION PER LINK ENTERED, SPENT ON ENTRY AND BEFORE THE FIRST READ OF
/// THAT LINK**, from the SAME per-call allowance `carriesConversionMember` above spends — so the two walks an
/// element costs are both paid from the one figure, and where a spend is refused this reader answers `true`
/// (the WITH branch, the class spelling). The descriptor reads, the `Proxy` answer and the guarded `catch`
/// stand unmoved.
function carriesTagMember(value, allowance) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  try {
    if (types.isProxy(value)) return true; // a descriptor read on a `Proxy` would run a trap
    // **⟶ AND EVERY READ IS CHARGED, AS THE SIBLING WALK'S ARE** (`contract.md §2.1`'s clause of 2026-10-24 on
    // `F7-2`, items `(4c)` and `(4e)`): each `@@toStringTag` descriptor read is `1` and each `getPrototypeOf`
    // call is `1`; a refused spend answers `true` (the WITH branch, the class spelling).
    if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
    if (Object.getOwnPropertyDescriptor(value, Symbol.toStringTag) !== undefined) return true;
    if (!spendGuardRead(allowance, 1)) return true; // the value's `getPrototypeOf` — item `(4c)(ii)`
    let link = Object.getPrototypeOf(value);
    while (link !== null) {
      // ONE POSITION PER LINK ENTERED (item `(1c)`), before the read that reached the link.
      if (!spendGuardPosition(allowance, 1)) return true;
      if (types.isProxy(link)) return true;
      if (!spendGuardRead(allowance, 1)) return true; // ONE descriptor read — item `(4c)(i)`
      if (Object.getOwnPropertyDescriptor(link, Symbol.toStringTag) !== undefined) return true;
      if (!spendGuardRead(allowance, 1)) return true; // the loop's `getPrototypeOf` — item `(4c)(ii)`
      link = Object.getPrototypeOf(link);
    }
    return false;
  } catch {
    return true;
  }
}

/// **⟶ `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(1c)`: THE ARRAY-ELEMENT LIMB.** At row
/// `8`'s DEPTH arm the refused value may be an ARRAY, and `Array.prototype.toString` calls `join`, which takes
/// each element by `[[Get]]` and CONVERTS it — **so the elements' conversion members run, and the walk never
/// classified those elements, the element loop lying BELOW the arm.** **EVERY OWN INDEX IS READ BY
/// DESCRIPTOR**, so an own ACCESSOR at an index answers the class spelling and ITS GETTER NEVER RUNS, and
/// **EVERY DATA ELEMENT IS SUBJECTED TO THE SAME RENDER GUARD** the refused value itself is put to — an
/// element's `ToString` is a rendering as the value's `String` is, so one guard governs both and a test that
/// asked only `carriesConversionMember` would leave an added `Symbol.toPrimitive` on a standard prototype
/// running for an OBJECT element. **WHERE EVERY ELEMENT IS A PRIMITIVE** — or an object whose conversion and
/// tag members sit only on an intrinsic prototype — no guard is tripped and the sanctioned `'1,2'` renders.
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of that date on `F-RA-20`, items `(b)`, `(c)` and
/// `(d)`): THE REPEAT TEST IS THE CURRENT PATH AND NOT A VISITED SET.** The block above stands byte-for-byte
/// and is read THROUGH this clause; **the descriptor reads, the accessor answer, the element guard and the
/// `try` all stand unmoved.** The second parameter is a PATH — the list of arrays the walk is CURRENTLY
/// reading, extended by `[...path, value]` (the file's own idiom at the ancestor stack's `[...ancestors,
/// value]`) — so `seen.has` becomes a membership test on that path and `seen.add` becomes the append. **A
/// CYCLE STILL TRIPS** — a self-containing array is ON the path when its own element is read, so the
/// membership test answers at the repeat and the arm reaches its class spelling DETERMINISTICALLY rather
/// than through a stack-overflow `catch` — **while an ALIAS DOES NOT**: a sub-value the same parent holds
/// twice is on no path when either occurrence is read, and rendering it twice runs the same code twice and
/// reaches no member the first read did not (item `(b)`: an alias is neither a cycle nor caller code, and
/// `§4`'s clause on `F-RA-4` already declares the walk's *"ancestor stack and never a visited set"*).
///
/// **⟶ AMENDED 2026-10-24 (`contract.md §2.1`'s clause of this date on `F5-1` and `F5-2`, items `(1b)`, `(1c)`,
/// `(1d)`, `(1f)` and `(2)`; the owed byte is `implementation-plan.md §2` step `4`'s arm `(viii)`): THE GUARD'S
/// WORK IS BOUNDED PER CALL.** The block above stands byte-for-byte and is read THROUGH this clause; **the
/// descriptor reads, the accessor answer, the `Proxy` answer, the non-array answer, the hole's `continue` and the
/// guarded `catch` all stand unmoved.** **THE COST IT CLOSES, WITH BOTH WITNESSES:** the path test alone walks a
/// shared sub-value ONCE PER POSITION IT OCCUPIES, so `let v = [1]; for (i < 40) v = [v, v];` costs `~2^40`
/// visits (measured at this tree: depth `16` = `174` ms, depth `20` = `2,578` ms, depth `24` = `40,945` ms, and
/// depth `40` did not answer inside `7` seconds); and the element limb scanned the WHOLE `length`, so
/// `new Array(4294967295)` cost `~4.29×10^9` descriptor reads (also killed at `7` seconds). **Neither ceiling of
/// `§4` counted either, because the refused subtree is never walked.**
///
/// **THE THREE LIMBS, EACH AS ITEM `(1b)` STATES IT:**
///   (i) **THE TRIP IS THE PATH TEST, TAKEN FIRST** — an ancestor on the current path trips (a cycle), a value
///       off it does not (an alias).
///   (ii) **THE COST IS A PER-CALL MEMO CONSULTED ONLY AFTER THE PATH TEST** — a repeat answers `false` (the
///       answer its first occurrence gave, which is the only answer a still-scanning frame can have produced)
///       and ITS OWN POSITION COUNT IS CHARGED, so an aliased DAG is counted per position and the memo cannot
///       be used to evade the budget. **The memo is a COST device and never a trip decision** (item `(1b)`).
///   (iii) **A PER-CALL POSITION BUDGET OF `NODE_CEILING` — `1,000,000` — AND THE CLASS SPELLING WHEN IT IS
///       SPENT** (item `(1d)`: the crossing's own figure, no third ceiling minted). Positions are counted `§8`
///       row `8`'s way — one per position the walk would visit, an alias counted per position — and **the
///       element limb's descriptor reads spend the SAME budget**, so no `length` the walk would never have
///       walked is ever scanned (item `(2)(b)`). **ON EXHAUSTION THE GUARD ANSWERS "CALLER CODE IS REACHABLE"**
///       — the WITH branch — so the arm answers its class spelling and renders nothing.
///
/// **A HOLE IS NOT A TRIP AND IS NOT MADE ONE** (item `(1f)`): `'1,,3'`'s declared rendering survives because a
/// missing descriptor still `continue`s; only the budget bounds the sparse limb. **AND THE BUDGET IS FRESH PER
/// CALL** — created at `renderGuardTrips`'s own entry, never per element and never module-level, so no census is
/// cached across calls and `C-11`'s no-frozen-prototype-fact rule is untouched.
///
/// **⟶ AND NOTHING THIS LIMB DOES IS TAKEN FROM A MUTABLE PROTOTYPE** (`contract.md §2.1`'s clause of
/// 2026-10-24 on `F7-1`, items `(1c)`, `(2b)`'s rows `18`, `24` and `26`, and `(10b)`: *"`Array.prototype.includes
/// = () => false` currently misses a **cycle** and the walk dies in a raw host `RangeError`"*). **Three sites,
/// one class:**
///   * **THE PATH TEST IS A LOCAL LOOP** (`(1c)(vi)`'s spelled `===`), not `path.includes(value)` — a forged
///     `includes` answering `false` un-detected the cycle, the recursion re-entered the ancestor and the host
///     stopped the process instead of the arm answering its class spelling;
///   * **THE PATH EXTENSION IS A LOCAL INDEX LOOP**, not `[...path, value]` — an array spread consumes the
///     path through `Array.prototype[Symbol.iterator]`;
///   * **THE MEMO IS A PAIR LIST READ BY INDEX**, not a `Map` — `Map.prototype.get` was the repeat's whole
///     cost decision (item `(2b)`'s rows `23` and `24`; the measured states are the battery's row `(d)`).
function arrayElementsReachCallerCode(value, path, allowance) {
  if (value === null || typeof value !== 'object') return false;
  try {
    if (types.isProxy(value)) return true;
    if (!Array.isArray(value)) return false;
    // AN ANCESTOR ON THE CURRENT PATH IS A CYCLE, NOT AN ALIAS — asked by a local loop over the datum's own
    // indices, never by `Array.prototype.includes`.
    //
    // **⟶ AND THE SCAN IS CHARGED `1` PER ENTRY THE PATH CARRIES, BEFORE IT IS TAKEN** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-3`, items `(3c)`'s term `(ix)` and `(3d)`): the path test performs one spelled
    // `===` per entry and it is CALLER-SCALED — a shared sub-value walks it once per position it occupies — so
    // an uncharged scan was a caller-set price for a sanctioned rendering. **The spend answers "caller code is
    // reachable" where it is refused**, exactly as the limb's other spends do (`:1618` · `:1638`).
    if (!spendGuardRead(allowance, path.length)) return true;
    let onPath = false;
    for (let i = 0; i < path.length; i += 1) {
      if (path[i] === value) {
        onPath = true;
        break;
      }
    }
    if (onPath) return true;
    // (iii) THE ARRAY'S OWN POSITION, SPENT BEFORE ANY READ.
    if (!spendGuardPosition(allowance, 1)) return true;
    // (ii) THE MEMO, CONSULTED ONLY AFTER THE PATH TEST, AND THE REPEAT'S OWN COUNT IS CHARGED.
    //
    // **⟶ AND THE CONSULTATION IS CHARGED `1 + memo.length`, BEFORE ITS SCAN** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F8-3`, items `(3c)`'s term `(viii)` and `(3d)`): the scan performs one spelled `===` per
    // RECORDED ENTRY and `memo` grows by one entry per DISTINCT leaf, so `~125,000` distinct leaves were
    // `1 + 2 + … + 125,000 ≈ 7.8×10⁹` UNCHARGED identity comparisons inside ONE `1,000,000`-unit call — the
    // guard was bounded in positions and unbounded in reads. **CHARGED, the budget exhausts near the `1,400`th
    // distinct leaf and the arm answers its class spelling without taking the scan; `NODE_CEILING` stays the
    // ONE per-call figure, created once per `renderGuardTrips` call, and no second ceiling is minted.**
    const memo = allowance.memo;
    if (!spendGuardRead(allowance, 1 + memo.length)) return true;
    let recorded = null;
    for (let i = 0; i < memo.length; i += 1) {
      if (memo[i].value === value) {
        recorded = memo[i];
        break;
      }
    }
    if (recorded !== null) {
      if (!spendGuardPosition(allowance, recorded.positions)) return true;
      return recorded.answer;
    }
    const positionsBefore = allowance.positions;
    // **⟶ AND THE COPY IS THE PATH'S SECOND CHARGED LIMB: `1` PER ENTRY IT CARRIES** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-3`, items `(3c)`'s term `(ix)` and `(3d)`): `extendedPath` copies one entry per
    // path entry and that loop was charged nothing. **BOTH limbs are charged** — charging only the copy would
    // leave the caller-scaled TEST at `0`, which is the loop the finding measures.
    if (!spendGuardRead(allowance, path.length)) return true;
    const next = extendedPath(path, value);
    const length = value.length; // an exotic array's own data property: no getter is reached here
    for (let i = 0; i < length; i += 1) {
      // THE DESCRIPTOR READ THIS LIMB PERFORMS IS ONE POSITION OF THE ONE BUDGET (item `(2)(b)`), so a
      // `length` no walk would have walked spends itself out instead of being scanned.
      if (!spendGuardPosition(allowance, 1)) return true;
      const descriptor = Object.getOwnPropertyDescriptor(value, i);
      if (descriptor === undefined) continue; // a hole: `join` converts nothing there
      if (descriptor.get !== undefined || descriptor.set !== undefined) return true;
      if (renderGuardTrips(descriptor.value, next, allowance)) return true;
    }
    memo[memo.length] = { value, answer: false, positions: positionsBefore - allowance.positions };
    return false;
  } catch {
    return true;
  }
}

/// **ONE MORE SEGMENT ON A PATH, BUILT BY A LOCAL INDEX LOOP** — items `(1c)(i)` and `(1c)(v)`: the copy reads
/// the path's own indices and writes the extension's own index, so no array spread and no iterator is reached.
export function extendedPath(path, segment) {
  const next = [];
  for (let i = 0; i < path.length; i += 1) next[i] = path[i];
  next[path.length] = segment;
  return next;
}

/// **ONE SPEND AGAINST THE PER-CALL POSITION BUDGET** — answers `true` where the spend is covered and `false`
/// where it would overdraw, so the caller that receives `false` answers "caller code is reachable" and the arm
/// takes its class spelling (item `(1d)`). **THE FIGURE IS `NODE_CEILING` AND NO SECOND CONSTANT IS MINTED**
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F5-1`, item `(1d)`); the allowance itself is created once per
/// call of `renderGuardTrips` below.
function spendGuardPosition(allowance, positions) {
  if (positions > allowance.positions) {
    allowance.positions = 0;
    return false;
  }
  allowance.positions -= positions;
  return true;
}

/// **⟶ ONE READ SPENT AGAINST THE SAME ONE PER-CALL ALLOWANCE — `contract.md §2.1`'s clause of 2026-10-24 on
/// `F7-2`, items `(4c)`, `(4e)` and `(10e)`, item `(4c)`'s unit being EXHAUSTIVE**, AND RE-DERIVED TO ITS
/// **ELEVEN** TERMS BY THIS SECTION'S CLAUSE OF `2026-10-24` ON `F8-3`, ITEM `(3c)` (arm `(xvii)` widened,
/// cell `JC-TC-67`), EACH WITH THE SITE THAT TAKES IT: **(i)** one `Object.getOwnPropertyDescriptor` call is
/// `1`; **(ii)** one `Object.getPrototypeOf` call is `1`; **(iii)** an own-NAME census read is
/// `1 + the length of the list it returns`; **(iv)** an own-SYMBOL census read is `1 + the length of the list
/// it returns`; **(v)** an element index read is `1`, charged where it is taken through `spendGuardPosition`;
/// **(vi)** a link entered is `1`, charged by the chain loops' own spends; **(vii)** a memo HIT is the
/// repeat's recorded count; **(viii) a MEMO CONSULTATION is `1 + memo.length`** — charged before its scan at
/// `arrayElementsReachCallerCode`, because the scan performs one spelled `===` per recorded entry and the memo
/// grows by one entry per distinct leaf; **(ix) THE PATH IS `1` PER ENTRY IT CARRIES, CHARGED AT BOTH LIMBS —
/// THE TEST'S SCAN AND THE COPY** (`extendedPath`'s call site), the scan being charged because it is the
/// caller-scaled loop the finding measures; **(x)** an allocation and a `typeof` are `0`; and **(xi) AN
/// IDENTITY COMPARE AND A SPELLED RELATIONAL COMPARISON ARE `0` ONLY WHERE THEY ARE NOT ONE OF TERMS `(viii)`
/// AND `(ix)`.** **NO SECOND FIGURE IS MINTED** — `NODE_CEILING` (`1,000,000`) stays the one per-call
/// budget, created once per `renderGuardTrips` call — and **exhaustion is NOT a trip decision**: a caller that
/// receives `false` answers the WITH branch's conservative answer (item `(1d)`), exactly as
/// `spendGuardPosition` already rules. **A CALLER THAT CARRIES NO ALLOWANCE IS THE WALK, WHICH COUNTS NODES**
/// (`encodeValue`'s own ceiling), so the charge is skipped there and no admission moves.
function spendGuardRead(allowance, reads) {
  if (allowance === null || allowance === undefined) return true;
  return spendGuardPosition(allowance, reads);
}

// ⟶ CARVED UP 2026-10-24 (`D-2`/`D-33`): `NODE_CEILING` is the walk's own in the file of record
// (`index.mjs:1945`) and stands here because `renderGuardTrips` reads it while the walk's encoders read this part's
// predicates — the one class-decision ↔ walk edge the re-issued DAG does not carry. Value and readers unchanged.
export const NODE_CEILING = 1_000_000;

/// **THE RENDER GUARD'S THREE TESTS, AS `contract.md §2.1`'s clause of 2026-10-24 ON `F-RA-13`, ITEM `(6)`,
/// STATES THEM: the WITH branch is taken where they do not all answer "no caller code"** — `(1a)`'s
/// `Symbol.toPrimitive` descriptor read (inside `carriesConversionMember` above), `(1b)`'s
/// `Symbol.toStringTag` descriptor read, and `(1c)`'s element reads. Every one of the three is a READ of a
/// descriptor or a per-call walk, so `C-11`'s no-frozen-prototype-fact rule is untouched: no identity is
/// captured, no census is cached and no intrinsic is compared.
///
/// **⟶ AND ITS ENTRY IS WHERE THE ONE ALLOWANCE IS OPENED** (`contract.md §2.1`'s clause of 2026-10-24 on
/// `F5-1`, item `(1b)(iii)`): a FRESH `NODE_CEILING` position budget and a FRESH empty memo per call — the
/// carrier slot reaches that entry through the guard call below, and the value arm through
/// `valueTargetSpelling` — so no allowance is shared between calls and none stands at module level. **An
/// `allowance` is threaded in only by the recursion inside `arrayElementsReachCallerCode`, which passes its
/// own call's allowance down.**
///
/// **⟶ AND FROM 2026-10-24 THE SAME `budget` IS HANDED TO ALL THREE TEST CALLS, THE TWO CHAIN WALKS
/// INCLUDED** (`contract.md §2.1`'s clause of this date on `F6-1`, items `(1c)` and `(1d)`): every read the
/// guard performs is charged to the one per-call allowance — the array's own position, each index the element
/// limb reads, and every link each chain walk enters, per element and for the refused value itself — so no
/// call site is left uncharged and no chain can be entered unpaid. **THE FIGURE STAYS `NODE_CEILING` AND NO
/// SECOND CEILING IS MINTED**, the allowance stays fresh per call, and exhaustion answers "caller code is
/// reachable" at each limb (the WITH branch, the class spelling).
function renderGuardTrips(value, path = [], allowance = null) {
  // **⟶ AND THE MEMO IS A PAIR LIST, NOT A `Map`** (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`,
  // items `(2b)`'s rows `23` and `24` and `(10c)`): `Map.prototype.get`/`set` are mutable-prototype members
  // by item `(1d)(iv)`, and the battery's row `(d)` measures the two answers they gave — a forged `get`
  // answering a recorded "no caller code" and a no-op `set` — each of which decided a rendered subject.
  const budget = allowance === null ? { positions: NODE_CEILING, memo: [] } : allowance;
  return carriesConversionMember(value, budget)
    || carriesTagMember(value, budget)
    || arrayElementsReachCallerCode(value, path, budget);
}

/// **THE FAILING TARGET AT A VALUE POSITION, RENDERED AS THE STORE'S GENERATOR RENDERS IT** —
/// `surface.md §2.5` item 6 (a). **ITS ONE EXAMPLE THAT DIFFERS FROM A CARRIER'S TARGET IS THE SYMBOL**: a
/// symbol's own value carries the caller's DESCRIPTION, and the item's own example prints the CLASS's
/// canonical token `Symbol()`, which is the spelling this arm carries. Every other target is printed as its
/// own value, guarded exactly as `targetSpelling` guards its read.
///
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-D`; `contract.md §2.1`'s clause of that date, items `(1)`,
/// `(4)` and `(6)`): `String(value)` IS WITHDRAWN AS A SUBJECT SOURCE AT EVERY ARM WHOSE SUBJECT IS THE
/// REFUSED VALUE'S OWN RENDERING AND THE VALUE CARRIES A CONVERSION MEMBER.** The block above stands
/// byte-for-byte and is read THROUGH this clause; **its four named substitutions are UNMOVED** — a
/// `bigint`'s `` n ``, a `symbol`'s `Symbol()`, a `Proxy`'s class spelling and a lone-surrogate string's class
/// spelling — and item `(6)` reads them byte-identical. **WHAT MOVES IS ONE TEST, INSERTED AFTER THE PROXY
/// GUARD AND BEFORE `String(value)`:** a `Symbol.toPrimitive`/`toString`/`valueOf` member the refused value
/// carries answers the ROW'S OWN CLASS SPELLING, which the walk hands in as `rowClass` (`fault.found`), and no
/// conversion member is invoked. **THE GUARDED `catch` BELOW STANDS AS THE FALLBACK FOR A RENDERING THAT
/// THROWS** (item `(4)`'s closing sentence, and item `(5)` item `(e)`'s list of its answers). **AND THE
/// MEMBER IS SOUGHT WHERE ITEM `(1)` SAYS IT STANDS — *"whether that member is OWN on the value or reached
/// through a prototype the value supplies"* — so `carriesConversionMember` above walks the chain and stops at
/// the language's own prototypes**, which is what keeps this arm's WITHOUT branch (`'[object Object]'`, a
/// function's source text, `'1,2'`) reachable for a value whose only conversion member is
/// `Object.prototype.toString` or the standard `Function.prototype.toString` machinery.
export function valueTargetSpelling(value, rowClass) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    if (typeof value === 'symbol') return 'Symbol()';
    // **⟶ AND A PROXY IS NEVER COERCED HERE EITHER — `C-1`'s THIRD HALF, CLOSED AT THIS ARM 2026-10-23 BY
    // THE GATE-4 ADVERSARIAL BATTERY (`json-crossing-gate4-adversarial.test.mjs`'s `ADV-03`/`ADV-05`/`ADV-06`).**
    // The `targetSpelling` guard stood at the CARRIER arm; this VALUE arm lacked it, so a refused `Proxy`
    // reached `String(value)` and its `Symbol.toPrimitive`/`toString` GET TRAP RAN — the very trap the walk's
    // `util.types.isProxy` refusal exists to avoid — even though a throwing trap was caught by the `catch`
    // below. **THE CLASS IS READ WITH `util.types.isProxy` ALONE AND NO TRAP RUNS**, exactly as
    // `targetSpelling` does at its own arm.
    if ((typeof value === 'object' || typeof value === 'function') && value !== null && types.isProxy(value)) {
      return classSpelling(value);
    }
    // **AND A TARGET THE MESSAGE MAY NOT CARRY IS NAMED AS ITS OWN CLASS RATHER THAN AS ITS BYTES**: a string
    // carrying a LONE SURROGATE is the one value this pass refuses whose code unit has no `String` form at
    // all, so printing it would REQUIRE the repair `§1.8` forbids (`A76`: *"do not attempt to fix"*). **The
    // class half is mandatory (item 6 (b)); the byte half is the one datum no clause requires here.**
    if (typeof value === 'string' && hasLoneSurrogate(value)) return 'a string carrying a lone surrogate';
    // **`§2.1`'s clause of 2026-10-24, item `(4)` — NO CONVERSION MEMBER OF THE REFUSED VALUE IS INVOKED.**
    // Where the value carries one — OWN, or reached through a prototype it supplies (item `(1)`'s own
    // parenthesis) — the arm answers the row's own class spelling (`'a function'` at row `3`, `'a value over
    // the walk ceiling'` at row `8`'s depth arm), which is the string the walk recorded as the class — so
    // `String(value)` below never runs for such a value and the trap is not merely caught, it is not reached.
    // **⟶ AND THE TEST IS THE RENDER GUARD'S THREE TESTS, NOT ONE OF THEM** (`contract.md §2.1`'s clause of
    // 2026-10-24 on `F-RA-13`, item `(6)`): item `(1a)`'s added-`Symbol.toPrimitive` read, item `(1b)`'s
    // `Symbol.toStringTag` descriptor read and item `(1c)`'s array-element reads each answer "caller code is
    // reachable" here, and where any does, this arm answers the row's class spelling and renders nothing.
    // **⟶ AND WHERE NO ROW CLASS IS SUPPLIED THE ANSWER IS THE VALUE'S OWN CLASS SPELLING**
    // (`contract.md §2.1`'s clause of 2026-10-24 on `F-RA-18`, items `(c)` and `(e)`): **AT A CARRIER POSITION
    // THE SUBJECT IS THAT POSITION'S OWN DECLARED DESCRIPTOR, NEVER `undefined`.** The VALUE arm hands the
    // row's own class in from the walk's record (`:1381`), and the ONE-ARGUMENT carrier call at `:2334`
    // supplies none because a CARRIER refusal declares no row class — `§2`'s seventeen rows are the WALK's —
    // so an address carrying a conversion or tag member rendered the eleven characters `'undefined'` where
    // the caller's own rendering stood. **The fallback is `classSpelling(value)`, exactly the byte the
    // guarded `catch` below already answers for a rendering that throws**, so this arm has ONE fallback rather
    // than two and no call site can print garbage. Nothing else moves: the two substitutions above, the Proxy
    // guard, `String(value)` below, the `catch` and the value arm's two-argument call all stand unmoved.
    if (renderGuardTrips(value)) return rowClass === undefined ? classSpelling(value) : rowClass;
    return String(value);
  } catch {
    // The rendering THREW (a `valueOf`/`Symbol.toPrimitive`/`Proxy` trap): the CLASS spelling is the
    // declared fallback, because the reason's class half is mandatory (item 6 (b)) and nothing escapes.
    return classSpelling(value);
  }
}

/// **A REFUSAL THE WALK PRODUCED AT A VALUE POSITION, ANSWERED IN THE ONE FORM — VERBOSELY.** `§1.8`'s dated
/// clause 1: *"AT A VALUE POSITION — a member of a value the WALK meets, or the written value itself — the
/// class is `NonPlainCollection` and the code is that class's own `ValueNotAdmitted` … PRODUCED AT THE
/// WALK"*. The status is the store's own member token and is never minted here (`DD-40`); PART ONE is the
/// store's generator's bytes at the failing target's own spelling; PART TWO — the class that failed and the
/// position the contract declares for it — is appended (`CF-3`). `write` is this helper's ONE caller, and it
/// calls it at the ONE site where the store answered `ValueNotAdmitted` for a value the walk had refused.
///
/// **⟶ AMENDED 2026-10-23 (THE GATE-3 PROOFREADING PASS, `role_proofreader`; `RCA-8(g)`): THE CODE IS
/// `ValueRefusedAtBoundary` AND IT IS ANSWERED BEFORE ANY STORE VERB IS CALLED.** The block above stands
/// byte-for-byte and is read THROUGH this clause, on exactly two of its terms: *"the code is that class's own
/// `ValueNotAdmitted`"* is read as the boundary refusal's status **`ValueRefusedAtBoundary`** — the store's
/// rank-`17` member, minted by the store's closed set (`docs/specs/storeroom-native/contract.md` `§8.1`, its
/// amendment of 2026-10-23) and SELECTED by the package, which mints neither the status nor its code — and
/// *"it calls it at the ONE site where the store answered `ValueNotAdmitted` for a value the walk had
/// refused"* is read as **the PRE-VERB site**: `write` checks the walk's recorded fault — the statement
/// `if (fault.found !== null) valueReject(fault);` — and this helper throws THERE, ahead of the entry call
/// `entryOf().write.call(this, …)`, so THE STORE ANSWERS NOTHING HERE AND NEVER RECEIVES THE REFUSED TREE.
/// **THE TWO SITES' POSITIONS IN THIS FILE: the fault check at `:2439` and the entry call at `:2454`** —
/// `:2391` and `:2406` are where the gate-4 audit read them, the difference being this pass's own inserted
/// comment lines and nothing else. PART ONE (the store generator's bytes at the failing target's own spelling),
/// PART TWO (class and position appended, `CF-3`) and `DD-40` stand unmoved.
/// `[A2 docs/decisions.md · `A148` (Q3); docs/specs/storeroom-native/contract.md §8.1 — its 2026-10-23
/// amendment, rank `17`, *"the store never receives those values on the JavaScript route"*; A1
/// bindings/js/index.mjs:2439 · :2454 | requirement]`
/// **⟶ AMENDED 2026-10-24 (`DEF-2026-10-24-D`; `contract.md §2.1`'s clause of that date, items `(1)`–`(3)`
/// and `(7)`): THE SUBJECT IS THE WALK'S OWN RECORD WHEN THE ARM DECLARED ONE, AND THE REFUSED VALUE IS NOT
/// RENDERED AT THE SIX ARMS THAT CLAUSE RE-DERIVES.** The block above stands byte-for-byte and is read THROUGH
/// this clause; **PART ONE's fixed bytes, the generator's single quoting, PART TWO and the status are
/// unmoved.** **`fault.subject` IS THE WALK'S DECLARED SUBJECT AND IS `null` AT EVERY ARM THAT RENDERS ITS
/// TARGET**: where the walk set it — rows `5`, `11`, `13`, `14`, `15` and `16`, item `(2)` — PART ONE opens on
/// the CLASS SPELLING that row's own row carries, so at those six arms the subject and PART TWO's class are the
/// SAME STRING and the message names the row's class twice (item `(3)`: the declared form, and not a defect).
/// **THE TARGETS THE WALK HANDS (`fault.value`) ARE UNMOVED AT ALL SIX — the containing value at rows `5` and
/// `15`, the repeated ancestor at `11`, the instance at `13` and `14`, the array at `16` — only the RENDERING
/// of them is withdrawn** (item `(2)`), and `valueTargetSpelling` is the rendering for every other arm.
export function valueReject(fault) {
  boundaryReject(
    'ValueRefusedAtBoundary', // A148 Q3's rank-17 member, carried and never minted (`DD-40`)
    fault.subject === null ? valueTargetSpelling(fault.value, fault.found) : fault.subject,
    `the value at ${valuePosition(fault.path)} is ${fault.found}`,
  );
}

/// **THE CLASS THE SHAPE ARMS REFUSE** — `§1.4` items 1 and 4 (c): an own `Symbol`-keyed member and an own
/// accessor each refuse the WHOLE value (*"any other answer would DROP A MEMBER SILENTLY"*, `DD-8`), so the
/// value's own class is the admitted one it holds and the reason names the arm's own class instead.
export function shapeArmClass(refusal) {
  return refusal.k === 'y'
    ? 'a value carrying a Symbol-keyed own member'
    : 'a value carrying an own accessor member';
}

/// **ONE `listeners[]` ELEMENT IS LAWFUL WHERE THE STORE'S OWN ADMISSION AND THE BOUNDARY'S OWN WALK AGREE
/// ON IT — ADDED 2026-10-17, SO THE SEEDING PREDICATE AND `listen`'S PUSH CONDITION CANNOT DISAGREE ABOUT
/// WHAT A LAWFUL ELEMENT IS** (`docs/specs/storeroom-js/surface.md §2.4` item 7 (a) item 3's *"ADMIT-OR-REFUSE COMES THIRD, and every element
/// read … is reached ONLY for a value the first step has admitted"*, read with `§1.4`'s walk and the store's
/// own `src/args.rs`, which admits exactly the elements whose every segment `Segment::is_in_domain` holds
/// and whose handle token is not blank). **THE FOUR TESTS ARE THE ONES `encodeListeners` AND
/// `constraintAddress` ALREADY TAKE, AND NOT ONE OF THEM IS NEW**: the entry is a plain object (a `Proxy`,
/// an `Array` and a prototype-carrying object refused before a member is read — `§1.4` item 4 (e)–(g),
/// `DD-34`/`DD-35`); `address` and `handle` are OWN members (`Object.hasOwn` and never `in`, `JS-5`); the
/// handle is a non-empty string (`§0.4` clause 3 / `PAR-13`); and the address is an admitted array whose
/// every segment is a string without a lone surrogate or a non-negative SAFE integer — the two classes
/// `encodeSegment` pushes and `Segment::is_in_domain` admits, so the elements the store ADOPTS and the
/// elements this predicate ACCEPTS are one set and the mirror holds one entry per store entry.
export function inDomainAddress(address) {
  if (types.isProxy(address) || !Array.isArray(address) || arrayClass(address) === 'class') return false;
  for (let i = 0; i < address.length; i += 1) {
    if (!(i in address)) return false; // a hole is `AddressArg` row 14's own outside shape (`DD-8`)
    const segment = address[i];
    if (typeof segment === 'string') {
      if (hasLoneSurrogate(segment)) return false; // the class the walk refuses before any verb (`C-4`)
    } else if (!(typeof segment === 'number' && Number.isInteger(segment) && segment >= 0
      && Number.isSafeInteger(segment))) {
      return false; // and every other class is `§1.5`'s own outside set
    }
  }
  return true;
}

/// **AND THE SEEDING PREDICATE IS THAT ONE PREDICATE** — the entry's own four tests, taken together.
export function isLawfulListenerElement(entry) {
  if (!isPlainObjectValue(entry) || !Object.hasOwn(entry, 'address') || !Object.hasOwn(entry, 'handle')) return false;
  if (typeof entry.handle !== 'string' || entry.handle === '') return false;
  return inDomainAddress(entry.address);
}

