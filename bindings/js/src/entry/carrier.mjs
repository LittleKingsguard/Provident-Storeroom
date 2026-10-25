// `D-2` (`docs/L1/entry-subdivision.md` §1 part `6a`, `D-33`'s seam at `L2799`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
import { types } from 'node:util';
import { boundaryReject } from './artefact.mjs';
import { NODE_CEILING, VALUE_ARGUMENT_POSITION, accessorOrSymbolArm, arrayClass, classSpelling, extendedPath, hasLoneSurrogate, protoClass, shapeArmClass, targetSpelling } from './class-decision.mjs';

// ---------------------------------------------------------------------------------------------
// THE CROSSING MODEL, ENCODED FOR THE CORE — `bindings/js/src/facade.rs` states the protocol, and this
// section is its only producer. **The class decisions are TAKEN HERE: an IN-DOMAIN value is carried as
// data and every other rule of `crossing.md §1.4` over it is the core's (`package.md §4.5` item 3 (c)),
// while a value the WALK refuses is ANSWERED HERE, in the one form, verbosely** (`§1.8`'s dated clause 1).
// ---------------------------------------------------------------------------------------------

/// **`A76`'S CLASS ORDER, SHIPPED SO IT IS VISIBLE AS AN ORDER: the CLASS decision, then the SHAPE
/// decision, then admission — and NEVER a coercion between them.** Every arm below CLASSIFIES the value it
/// was handed; not one of them converts it, defaults it or substitutes for it:
///   1. `null` and `undefined` are their own outside classes (`§1.2` rows 6–7);
///   2. the primitives are read by `typeof` — **the `string`, `boolean` and `bigint` classes are decided
///      BEFORE the numeric arm**, so `10n` is a `BigInt` and is NEVER carried through the number arm
///      (`JS-6`): `typeof 10n === 'bigint'`, and no `Number(...)` is spelled anywhere on this path;
///   3. `function` and `symbol` are their own outside classes (rows 8–9);
///   4. a `Proxy` is refused BEFORE any trap can run (`§1.4` item 4 (g), `DD-34`) — **`util.types.isProxy`
///      reads no member and invokes no handler, which is why a throwing trap cannot raise a host error out
///      of this frame** (`JS-1`: *"catch, then classify — never propagate the host error"*; there is
///      nothing to catch because nothing is invoked);
///   5. an ancestor is the cycle class (`§1.4` item 6);
///   6. **the ARRAY CLASS is decided before the array SHAPE**: a genuine array (any realm) is walked, and a
///      class extending `Array` is refused as `NonPlainCollection` (`JS-2` — `Array.isArray` does not
///      short-circuit `arrayClass`, which is what makes `class V extends Array {}` refused as a VALUE);
///   7. otherwise the plain-object test decides, and a prototype-carrying object is refused (§1.4 (f)).
///
/// The `JsValue` model of `crossing.md §1.2`, encoded member for member. **The walk reads each member ONCE
/// and carries its OWN ancestor stack — never a `WeakSet` of visited objects, which would refuse an
/// acyclic DIAMOND** (`§1.4` item 6, `DD-11`).
///
/// **THE DEPTH CEILING IS THE CORE'S DECLARATION AND THE ENCODER IS BOUNDED BESIDE IT** (`§1.4` item 5,
/// `DD-10`): the encoder's own nesting bound is `65` — one PAST the declared `64` — so the value the
/// declared ceiling refuses (`65`) is still encoded, handed to the core, and refused THERE with the store's
/// own `ValueNotAdmitted` and the store's own generated message (`§2.5` item 6 (d): *"for a failure the store
/// itself produces, `message` is the store's generated string verbatim"*), **while the arm `§1.4` item 5's
/// dated table assigns to THIS BOUNDARY — `66` and beyond, *"carrying the store's outside class
/// `Cyclic`"* — is refused HERE, verbosely, with the same code and no second rule.** `ENCODER_CEILING` is
/// therefore `65` and the arm's own site is the first `if` below.
///
/// **⟶ AMENDED 2026-10-23 (`A149`; `RCA-8(g)`): THE OPERATIVE ADMISSION CEILING IS THE STORE'S PERSISTENT
/// `126` — NOT THE CORE'S DECLARATION, AND NEITHER THE `64` NOR THE `65` THIS BLOCK PRINTS.** The block
/// above stands byte-for-byte and is read THROUGH this clause: its `64`/`65`/`66` figures are the retired
/// era's, and its sentence *"`ENCODER_CEILING` is therefore `65`"* is read as **`126`**. **WHAT IS OPERATIVE
/// FROM THIS DATE: depth `126` is the highest ADMITTED value ON BOTH ROUTES, because the root enters at
/// `0`; `127` and beyond is the depth class — refused HERE, at this walk, BEFORE ANY STORE VERB, as `a value
/// over the walk ceiling` with the status `ValueRefusedAtBoundary` and the refused value's own `127`-segment
/// position; and the crate's `128` remains the CRATE-SIDE CONVERSION's OWN bound (`bindings/js/src/
/// crossing.rs`'s `depth > 128`, untouched by this clause), never the crossing's admission bound.** **THE
/// GROUND, AS MEASURED (`A149`): depths `125`/`126` commit and reopen intact, while `127`/`128` were ADMITTED
/// and round-tripped IN MEMORY but their commit threw `FileCommitFailed`, the store file stayed `0` bytes and
/// a fresh boot answered `AddressNotFound` — cause `serde_json::from_str` at `src/json.rs:83` with its
/// recursion limit `128`, plus the register root, plus the commit's re-load of the image it wrote
/// (`src/store.rs:1283`–`:1292`) — so a value the file tier cannot commit is never admitted in the first
/// place.** **`NODE_CEILING` IS UNMOVED AT `1,000,000`** (`A149` (3)): the walk counts its root as its first
/// node, so the admitted node range is `0…999,999` and a dense `1,000,000`-element top-level array is
/// `1,000,001` nodes and is refused as the same class. **THE ARM'S OWN SITE IS STILL THE FIRST `if` BELOW,
/// and no other behaviour of this file moves.**
/// `[A2 docs/decisions.md · `A149`; docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23
/// clause | the operative ceiling and the refusal's place; A1 bindings/js/index.mjs | `ENCODER_CEILING`,
/// cited by symbol | numeric claim]`
///
/// **⟶ RECONCILED 2026-10-24 (`DEF-2026-10-24-A`; `RCA-8(g)`): THE CLAUSE ABOVE CARRIES A `2026-10-23` MARKER
/// FOR A `2026-10-24` LANDING, AND NOTHING ELSE OF IT MOVES.** The clause above stands byte-for-byte and is
/// read THROUGH this one: its `126` on both routes, its `127`-and-beyond refusal with the
/// `ValueRefusedAtBoundary` status, its node range `0…999,999` and every authority tag it carries are unmoved.
/// **THE DATE ALONE IS RECONCILED: the landing that clause records is `2026-10-24`, one day after its
/// marker** — the source edit `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` landed
/// `2026-10-24 19:09:06`, and the native addon the live battery drove was built `19:09:49` and restaged
/// `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`) — **and the marker stands as filed,
/// because `A149`, the `docs/next-steps.md` `N8` delta and the review record already cite it; re-pointing it
/// would break resolving citations rather than repair anything.** No behaviour byte of this file moved.
/// `[A2 docs/decisions.md · `A149`; docs/defects.md · `DEF-2026-10-24-A` | the marker's resolution of record;
/// A2 docs/specs/storeroom-json-crossing-live-report.md §11 | the landing's own timestamps | cross-reference]`
///
/// **⟶ AND ONE SENTENCE OF THE `2026-10-23` CLAUSE ABOVE IS NOW FALSE AT THE BYTES — CORRECTED BESIDE IT RATHER
/// THAN REWRITTEN, 2026-10-25 (`RCA-8(g)`).** Its phrase *"the crate's `128` remains the CRATE-SIDE
/// CONVERSION's OWN bound (`bindings/js/src/crossing.rs`'s `depth > 128`, untouched by this clause)"* **names a
/// guard that no longer reads `128`.** The conversion's guard is **`if depth > 126 || visited > 1_000_000`**
/// (`bindings/js/src/crossing.rs:696`, measured on this tree), so **the conversion's admitted bound and this
/// part's `ENCODER_CEILING` are ONE FIGURE — `126` — and not two.** `128` is what that guard read until
/// 2026-10-25, and it was the bound that ADMITTED a depth the `file` tier's commit then could not write; the
/// guard moved when the three acts (admitted · committed · re-booted) were measured together (`crossing.rs:691`
/// –`:702`'s own dated clause; `tests/unit/binding-crossing/crossing_values.rs`'s `ceiling_depth_126_is_admitted`
/// cell). **Nothing else of the clause above moves:** its `126` on both routes, its `127`-and-beyond refusal, its
/// `ValueRefusedAtBoundary` status and its node ceiling are exactly as it prints them, and no behaviour byte of
/// this file is touched by this clause.
/// `[A2 docs/decisions.md · `A149`; A1 bindings/js/src/crossing.rs:696 | the conversion's own guard, read at its
/// bytes | numeric claim]`
const ENCODER_CEILING = 126;

// ⟶ CARVED UP 2026-10-24 (`D-2`/`D-33`): `NODE_CEILING` now stands with the guard machinery in the
// class-decision part — see that part's marker. `ENCODER_CEILING` is unmoved and is this part's own.

/// **THE WALK'S FIRST VALUE FAULT, RECORDED — AND THE CORE'S OWN MARKER FOR THAT ARM RETURNED.**
///
/// **WHY THE FAULT IS RECORDED AND NOT ANSWERED HERE, AND IT IS A DECLARED REASON RATHER THAN A
/// CONVENIENCE:** the crossing's own refusal ORDER is the STORE's (`DD-46`: *"the package passes every
/// argument position through as supplied and performs NO arity check of its own"*; `write-and-read.md §3.4`
/// `F-1`), so `write(instance, ['x'])` — the `tier` position ABSENT and the `value` position ABSENT with it —
/// answers the carrier row's own `AddressMalformed` and NOT the value's `ValueNotAdmitted`. **An answer
/// rendered at the walk before the carrier positions had been converted would REORDER two declared answers**,
/// and `JSG-05.7`/`JSG-10.2` drive exactly that state. The walk therefore CLASSIFIES, RECORDS the first fault
/// it meets and hands the core the marker the shipped encoder handed it; **`write` then renders the verbose
/// message from the record at the ONE site where the store answered `ValueNotAdmitted` for a value the walk
/// refused** (`§1.8`'s dated clause 1: the value-position refusal is *"PRODUCED AT THE WALK"*, and `CF-3`
/// clause 1 is its message's route). Nothing here coerces, and nothing here repairs.
///
/// **⟶ AND THE RECORD CARRIES THE ARM'S OWN PART ONE SUBJECT WHERE THE ARM DECLARES ONE —
/// `contract.md §2.1`'s clause of 2026-10-24, item `(2)` (`DEF-2026-10-24-D`).** `subject` is `null` at every
/// arm whose PART ONE is the failing target's own rendering — the walk then leaves the rendering to
/// `valueTargetSpelling` at answer time, exactly as it always did — and it is the ROW'S CLASS SPELLING at the
/// six arms item `(2)` re-derives in place (rows `5`, `11`, `13`, `14`, `15`, `16`), where **the refused value
/// is NOT rendered and no member, element join or empty spelling can reach the message** (item `(3)`). **The
/// TARGET the walk hands in `value` is unmoved at those six too** — the target and its rendering are two
/// different facts and only the second is withdrawn (item `(2)`).
function refusedValue(fault, value, failedClass, path, marker, subject = null) {
  if (fault.found === null) {
    fault.found = failedClass;
    fault.value = value;
    fault.path = path;
    fault.subject = subject;
  }
  return marker;
}

/// **ONE OF THE SIX ARMS WHOSE PART ONE SUBJECT IS THE ROW'S OWN CLASS SPELLING** — the same record as
/// `refusedValue` above with the row's class handed to it as the subject, so the arm states in one word that
/// it renders nothing (`contract.md §2.1`'s clause of 2026-10-24, items `(2)` and `(3)`). **THE CLASS AND THE
/// SUBJECT ARE THE SAME STRING AT THESE SIX, AND THAT IS THE DECLARED FORM** — e.g.
/// `'a sparse array' is not a value …, the value at the write's value argument is a sparse array`.
function refusedAsClass(fault, value, failedClass, path, marker) {
  return refusedValue(fault, value, failedClass, path, marker, failedClass);
}

/// **A CANONICAL ARRAY INDEX, AS `§2` ROW `17`'S PREDICATE SPELLS IT** — `String(i)` for an integer `i` with
/// `0 ≤ i ≤ length − 1`, and nothing else (`contract.md §2`'s clause of 2026-10-24 on `F-RA-5`, item `(3)`).
/// **THE `String(i) === key` HALF IS THE POINT AND NOT A FORMALITY**: `'01'`, `'1.0'`, `'1e0'`, `'-0'`, `' 1'`
/// and `'0x1'` all convert to a number INSIDE the range, and none of them is the canonical spelling of the
/// index it would otherwise be taken for — so the key's own spelling is compared with the index's. No member
/// is read, no user code runs, and `length` is the exotic array's own data property (the value is a genuine
/// array by the time this test is taken).
function isCanonicalArrayIndex(key, length) {
  const index = Number(key);
  if (!Number.isInteger(index) || index < 0 || index > length - 1) return false;
  return String(index) === key;
}

export function encodeValue(value, ancestors, depth, path, fault) {
  // **THE WALK STOPS AT ITS FIRST FAULT** — the refusal is recorded once and the remaining members are not
  // read, so a refused tree costs the members already visited and no more.
  if (fault.found !== null) return { k: 'c' };
  // **THE NODE CEILING IS THE CRATE'S `1,000,000`, COUNTED ON THIS ONE WALK** (`contract.md §4`; `A148` Q6).
  // The crate's conversion counts the root as its first node; the `1,000,001`st node is row `8`'s class at
  // the root `value` position.
  // **⟶ AMENDED 2026-10-23 (THE GATE-3 PROOFREADING PASS, `role_proofreader`; `RCA-8(g)`): THE CITE ABOVE IS
  // RE-SPELLED, BECAUSE `A148` CARRIES NO `Q6`.** The comment above stands byte-for-byte and is read THROUGH
  // this clause; the ceiling and both counting conventions are unmoved. **`docs/decisions.md` · `A148` records
  // `Q1`–`Q5` and TWO follow-ups — there is no `Q6`** — so `A148` Q6 is read as the gate-1 record's own THIRD
  // `Follow-up` row: *"Crate `128` governs"* → *"Depth `128` and nodes `1,000,000`"*
  // (`docs/specs/storeroom-json-crossing-proposal-review.md §4`'s answers cell, `§4.1`, the last of its three
  // `Follow-up` rows). The same re-spelling is already carried at `contract.md §4` and
  // `parameter-semantics.md §4`; this site follows their form.
  // `[A2 docs/decisions.md · `A148` (its two follow-ups); docs/specs/storeroom-json-crossing-proposal-review.md
  // §4.1 — its third `Follow-up` row | cross-reference]`
  fault.nodes += 1;
  if (fault.nodes > NODE_CEILING) {
    return refusedValue(fault, 'a value over the walk ceiling', 'a value over the walk ceiling', [], { k: 'c' });
  }
  // **EVERY REFUSAL BELOW IS THE WALK'S OWN** (`§1.8`'s dated clause 1; `A76`: *"Test JS data for compliance
  // with permitted shape before admitting and do not attempt to fix. reject with verbose error to client"*):
  // the failing target's own spelling is PART ONE (the store's generator's bytes), the class that failed and
  // the position it holds are PART TWO, appended — and the status is the store's own `ValueNotAdmitted`
  // (`§1.2`'s outside rows 6–13). **NOTHING IS REPAIRED**: no member is dropped, no class is substituted, no
  // value is converted (`A76`'s second part; `§1.8`).
  // `§1.4` item 5's dated two-arm table: *"`66` and beyond REFUSED by the boundary's own encoder carrying the
  // store's outside class `Cyclic`"* — the encoder's bound is one PAST the declared `64`, so `65` is still
  // encoded and refused by the conversion core's own bound, whose message is the store's own (item 6 (d)).
  // **⟶ AMENDED 2026-10-23 (`A149`; `RCA-8(g)`): THIS NARRATION'S `64`/`65`/`66` TWO-ARM SPLIT IS THE
  // RETIRED ERA'S AND IS READ THROUGH THIS CLAUSE.** The three lines above stand byte-for-byte; their `64`
  // and `65` are read as the operative `126` and the `127` it refuses, and the arm that was "still encoded and
  // refused by the conversion core's own bound" no longer exists on this route. **WHAT IS OPERATIVE: depth
  // `126` is the highest admitted value ON BOTH ROUTES, so `127` and beyond is refused HERE, at the walk,
  // BEFORE ANY STORE VERB, as `a value over the walk ceiling` with the status `ValueRefusedAtBoundary` at the
  // refused value's own `127`-segment position; the crate's `128` is the CRATE-SIDE CONVERSION's bound ONLY
  // (`bindings/js/src/crossing.rs`'s `depth > 128`, untouched).** **THE GROUND, AS MEASURED (`A149`):
  // `125`/`126` commit and reopen; `127`/`128` threw `FileCommitFailed` with a `0`-byte store file and a
  // fresh boot answering `AddressNotFound`, from `serde_json::from_str` at `src/json.rs:83` (recursion limit
  // `128`), the register root and the commit's re-load of the image it wrote (`src/store.rs:1283`–`:1292`).**
  // The node ceiling above (`1,000,000`, root counted) is unmoved.
  // `[A2 docs/decisions.md · `A149`; docs/specs/storeroom-json-crossing/contract.md §4 — its 2026-10-23
  // clause; A1 bindings/js/src/crossing.rs | the conversion's own guard, cited by symbol | numeric claim]`
  // **⟶ RECONCILED 2026-10-24 (`DEF-2026-10-24-A`; `RCA-8(g)`): THIS CLAUSE'S `2026-10-23` MARKER DENOTES A
  // `2026-10-24` LANDING, AND NOTHING ELSE OF IT MOVES.** The clause above stands byte-for-byte and is read
  // THROUGH this one: its reading of the retired figures (`64` read `126`, `65` read `127`), its one-arm
  // re-derivation, the retired core-bound arm it closes and the unmoved node ceiling are all unmoved.
  // **THE DATE ALONE IS RECONCILED: the landing it records is `2026-10-24`, one day after its marker** — the
  // source edit landed `2026-10-24 19:09:06`, and the native addon the live battery drove was built `19:09:49`
  // and restaged `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`) — **and the marker stands
  // as filed, because `A149` and the review record already cite it; re-pointing it would break resolving
  // citations rather than repair anything.** No behaviour byte of this file moved.
  // `[A2 docs/decisions.md · `A149`; docs/defects.md · `DEF-2026-10-24-A` | the marker's resolution of record;
  // A2 docs/specs/storeroom-json-crossing-live-report.md §11 | the landing's own timestamps | cross-reference]`
  // **⟶ AND THE SAME ONE SENTENCE IS FALSE HERE AS AT `ENCODER_CEILING`'S BLOCK ABOVE — CORRECTED BESIDE IT,
  // 2026-10-25 (`RCA-8(g)`).** This narration's *"the crate's `128` is the CRATE-SIDE CONVERSION's bound ONLY
  // (`bindings/js/src/crossing.rs`'s `depth > 128`, untouched)"* names a guard that reads **`depth > 126`** on
  // this tree (`crossing.rs:696`), so **there is no longer a second, larger bound behind the walk's: the
  // conversion admits exactly what this part admits, `126`, and refuses `127` at the same figure.** The retired
  // `128` is named here once and is not re-spelled anywhere else in this file. **Every other reading of the
  // clause above stands**: the operative `126` on both routes, the `127`-and-beyond refusal at the walk before
  // any store verb, the `ValueRefusedAtBoundary` status at the refused value's own `127`-segment position, and
  // the unmoved `1,000,000` node ceiling.
  // `[A2 docs/decisions.md · `A149`; A1 bindings/js/src/crossing.rs:696 | the conversion's own guard, read at its
  // bytes | numeric claim]`
  if (depth > ENCODER_CEILING) {
    return refusedValue(fault, value, 'a value over the walk ceiling', path, { k: 'c' });
  }
  if (value === null) return refusedValue(fault, value, 'null', path, { k: 'z' }); // `§1.2` row 6, any depth
  const kind = typeof value;
  if (kind === 'undefined') return refusedValue(fault, value, 'undefined', path, { k: 'u' }); // row 7
  if (kind === 'string') {
    // `§1.2` row 1's dated clause: a LONE SURROGATE is refused at the package's own walk — the class has no
    // Rust spelling at all — and it is never silently replaced, dropped or normalized.
    if (hasLoneSurrogate(value)) {
      return refusedValue(fault, value, 'a string carrying a lone surrogate', path, { k: 'c' });
    }
    return value;
  }
  if (kind === 'boolean') return value;
  // THE CLASS TEST PRECEDES THE NUMERIC ARM (`JS-6`): `bigint` is refused here, as its own outside class,
  // and is NEVER converted through the numeric arm (`Number(10n)` is the shipped `JS-6` substitution).
  if (kind === 'bigint') {
    // **⟶ AND THE SPELLING IS A SPEC CONVERSION ON THE PRIMITIVE, NOT `BigInt.prototype.toString`**
    // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, items `(1c)`, `(2b)`'s row `37` and `(10c)`): the
    // as-built `value.toString()` was a method taken off a MUTABLE PROTOTYPE, and the battery's row `(i)`
    // measures the answer it gave — a caller's `BigInt.prototype.toString` returned a marker that crossed as
    // the carrier's own value. `String(10n)` is `'10'` — the language's `ToString` for a BigInt appends NO
    // suffix — and the `'10n'` spelling the contract's row `6` subject carries is `valueTargetSpelling`'s own
    // `` `${value}n` `` substitution and a DIFFERENT BYTE from the conversion named here; the conversion reads
    // no member. No second figure and no second rendering is minted.
    return refusedValue(fault, value, 'a bigint', path, { k: 'g', v: String(value) });
  }
  if (kind === 'number') {
    if (!Number.isFinite(value)) {
      return refusedValue(fault, value, 'a non-finite number', path, { k: 'F', v: value }); // `§1.2` row 11
    }
    // `-0` DOES NOT CROSS AS A SIGN (`A140`; `contract.md §4`).
    return Object.is(value, -0) ? 0 : value;
  }
  if (kind === 'function') return refusedValue(fault, value, 'a function', path, { k: 'f' }); // row 8
  if (kind === 'symbol') return refusedValue(fault, value, 'a symbol', path, { k: 'y' }); // row 9
  // `§1.4` item 4 (g), `DD-34` — and NO trap is invoked: `util.types.isProxy` reads no member.
  if (types.isProxy(value)) return refusedValue(fault, value, 'a Proxy', path, { k: 'P' });
  // `§1.4` item 6: the ancestor stack, never a `WeakSet` — which is what ADMITS an acyclic diamond.
  // **⟶ AND THE STACK IS READ BY INDEX, NOT BY `Array.prototype.includes`** (`contract.md §2.1`'s clause of
  // 2026-10-24 on `F7-1`, items `(1c)(vi)`, `(2b)`'s rows `18` and `29`, and `(10b)`): the as-built membership
  // was a member of a mutable prototype, and the battery's row `(b)` measures both of its forgeries — an
  // `includes` answering `true` refused an ACYCLIC value at the root and one answering `false` missed the
  // CYCLE, so the walk re-entered the ancestor and the host stopped it. **THE MEMBERSHIP IS A LOCAL LOOP AND
  // THE STACK'S EXTENSION IS A LOCAL INDEX LOOP** — no method and no iterator of a mutable prototype decides
  // row `11`.
  let onAncestorPath = false;
  for (let i = 0; i < ancestors.length; i += 1) {
    if (ancestors[i] === value) {
      onAncestorPath = true;
      break;
    }
  }
  if (onAncestorPath) {
    // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `11`'s subject is its own CLASS SPELLING
    // — the repeated ancestor is NOT rendered (`DEF-2026-10-24-D`).
    return refusedAsClass(fault, value, 'a value that contains itself', path, { k: 'c' }); // `§1.2` row 12
  }
  const next = extendedPath(ancestors, value);
  if (Array.isArray(value)) {
    // **THE CLASS DECISION COMES FIRST, ON THE VALUE AS IT IS** (`A76`, `JS-2`): `Array.isArray` is TRUE
    // for a class extending `Array`, so it may not stand alone as the admission test. **A class extending
    // `Array` is refused under ITS OWN declared class — `§1.2` row 5's `ValueNotAdmitted`
    // (`NonPlainCollection`) — and NEVER through the array shape test.**
    if (arrayClass(value) === 'class') {
      // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `13`'s subject is its own CLASS SPELLING
      // — the instance is NOT rendered, so the empty subject this arm once answered is retired.
      return refusedAsClass(fault, value, 'a class extending Array', path, { k: 'P' });
    }
    for (let i = 0; i < value.length; i += 1) {
      // `§1.4` item 2: a hole refuses the WHOLE value (`DD-8`), and its class is the array's own hole arm.
      // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `16`'s subject is its own CLASS SPELLING
      // — the array is NOT rendered, so `'1,,3'` is retired.
      // **⟶ AND `contract.md §2`'s clause of 2026-10-24 on `F-RA-11` RE-DERIVES THE HOLE ITSELF: A HOLE IS AN
      // INDEX BELOW `length` WITH NO **OWN** PROPERTY** (its item `(1)`), so the test is `Object.hasOwn` and
      // NOT `in`. `in` is `[[HasProperty]]`, which walks the prototype chain, so
      // `Array.prototype[0] = 'x'; const a = new Array(2); a[1] = 'y'` passed this scan and the crossing
      // admitted `['x', 'y']` — **an element REPLACED at the boundary, one the caller's array never owned** —
      // while an inherited ACCESSOR at an index was then READ by the element loop's `[[Get]]`, running caller
      // code on an admission path (its items `(3)`, `(4)` and `(5)`). **`Object.hasOwn` and never
      // `Object.prototype.hasOwnProperty`, which is a method taken from a mutable prototype** (item `(6)`,
      // the file's own idiom at `:2144` · `:2179` · `:2261` and the rule stated at `:2240`). **A
      // prototype-carried index is therefore never read** — the element loop below reaches only indices this
      // scan has proved OWN — and an OWN accessor at an index is refused as row `15` three lines below.
      if (!Object.hasOwn(value, i)) return refusedAsClass(fault, value, 'a sparse array', path, { k: 'H' });
    }
    const refusal = accessorOrSymbolArm(value);
    // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: rows `5`/`15`'s subject is the CLASS SPELLING —
    // the containing ARRAY is NOT rendered, so the empty subject an empty array answered is retired.
    if (refusal !== null) return refusedAsClass(fault, value, shapeArmClass(refusal), path, refusal);
    // **⟶ ROW `17` — `an array carrying a non-index own member` — IS DECIDED HERE AND NOWHERE ELSE**
    // (`contract.md §2`'s clause of 2026-10-24 on the gate-11 finding `F-RA-5`, items `(3)`, `(5)`, `(6)` and
    // `(8)`). The as-built walk read an array BY INDEX ALONE, so `const a = [1]; a.foo = 3` crossed as `[1]`
    // and **the member was DROPPED SILENTLY** — the one answer `§2`'s own ground (*"None is coerced, repaired,
    // dropped, or replaced"*) forbids, and the answer rows `15` and `5` had already refused twice for a member
    // with no JSON spelling. **THE PREDICATE IS ITEM `(3)`'S, EXACTLY: every string in `Object.keys(value)` is
    // a canonical index in `0…length − 1`** — own ENUMERABLE string keys only, so `length` itself (an own
    // non-enumerable data member) is not a member of this test and an own NON-ENUMERABLE member other than it
    // is outside the tree by the rule that puts an object's non-enumerable members outside it, while an
    // element whose own index property happens to be non-enumerable is still carried, because the element walk
    // below reads by INDEX. **THE POSITION IS THE ARRAY'S OWN** (item `(5)`) and **THE SUBJECT IS THE ROW'S
    // CLASS SPELLING**, so the message names the class twice and the extra member is never reached.
    // **THE ORDER IS ITEM `(6)`'S**: row `13` above, then row `16`, then rows `15`/`5`, then THIS ROW, then
    // the element walk — so a subclass, a sparse array and a Symbol-carrying array each keep answering their
    // own row, and a refused element costs no visit because this test precedes the loop. **AND A
    // `Proxy`-SHAPED PROTOTYPE IS NO LONGER PART OF THAT LIST**, because `contract.md §2`'s clause of
    // 2026-10-24 on `F-RA-12` item `(4)` declares this comment's old half false for a LYING trap: a `Proxy`
    // prototype link is answered as `'class'` with no trap run, so such a value answers row `13` above and
    // never reaches here. **THE MEMBER IS NEVER CARRIED**: the row refuses its PRESENCE, not its value
    // (item `(3)`'s last sentence).
    // **⟶ AND THE KEY CENSUS IS CONSUMED BY INDEX, NOT THROUGH THE ITERATION PROTOCOL** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F7-1`, items `(1c)(ii)`, `(2b)`'s row `17` and `(10b)`: *"`Object.keys`'s
    // iteration is row `17`'s **only** gate"*) — `Object.keys`'s CALL is lawful and its result's `for … of` is
    // not, so a caller's forged iterator decided whether row `17` saw the non-index member at all.
    const indexKeys = Object.keys(value);
    for (let at = 0; at < indexKeys.length; at += 1) {
      if (!isCanonicalArrayIndex(indexKeys[at], value.length)) {
        return refusedAsClass(fault, value, 'an array carrying a non-index own member', path, { k: 'c' });
      }
    }
    const members = [];
    for (let i = 0; i < value.length; i += 1) {
      // **AN ARRAY MEMBER'S INDEX IS A DECLARED POSITION** (`§2.5` item 6 (b): *"the MEMBER POSITION for a
      // member inside a value the walk reached"*), and it is carried BARE, as item 6 (a) spells an integer
      // segment. Every index is present and is a data property by the two rules above, so the read below is
      // the read `for … of` performed.
      members[members.length] = encodeValue(value[i], next, depth + 1, extendedPath(path, i), fault);
      if (fault.found !== null) break;
    }
    return members;
  }
  const proto = protoClass(value);
  // `§1.4` item 4 (f): a prototype-carrying object is REFUSED — never read through its chain (`JS-5`).
  // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: row `14`'s subject is its own CLASS SPELLING —
  // the value is NOT rendered and its class's own `toString` is not reached.
  if (proto === 'class') return refusedAsClass(fault, value, classSpelling(value), path, { k: 'P' });
  // ⟶ `contract.md §2.1`'s clause of 2026-10-24, item `(2)`: rows `5`/`15`'s subject is the CLASS SPELLING —
  // the containing OBJECT is NOT rendered, so `'[object Object]'` is retired.
  const refusal = accessorOrSymbolArm(value);
  if (refusal !== null) return refusedAsClass(fault, value, shapeArmClass(refusal), path, refusal);
  const members = [];
  // **⟶ AND OBJECT KEYS' ITERATION IS A LOCAL INDEX LOOP** (`contract.md §2.1`'s clause of 2026-10-24 on
  // `F7-1`, items `(1c)(ii)` and `(2b)`'s row `17`): `Object.keys` is an `Object` static and lawful; consuming
  // its result with `for … of` is `Array.prototype[Symbol.iterator]` and is not.
  const memberNames = Object.keys(value);
  for (let at = 0; at < memberNames.length; at += 1) {
    const name = memberNames[at];
    // `§1.2` row 7 / `§1.4` item 3: an `{a: undefined}` member is SEEN and REFUSED, and **the key is NEVER
    // dropped** — the member is walked, its own position is carried, and the walk records the fault THERE.
    // **THE READ IS AN OWN-PROPERTY READ** (`A76`, `JS-5`): `Object.keys` yields the OWN enumerable string
    // keys — the keys the walk takes, `§1.4` item 4 (b) — and the member read is that key's own value.
    //
    // **⟶ AND THE LONE SURROGATE IS APPLIED AT THIS KEY POSITION TOO — `C-4`, THE MEMBER-KEY HALF
    // (2026-10-11).** A KEY of a walked value is a JS `string` exactly as a value is, so `§1.2` row 1's
    // dated clause reaches it: the class has no Rust spelling, **and the facade's string path ended in
    // `String::from_utf8_lossy`, so a key holding `\uD800` was silently REPAIRED to U+FFFD on the way in —
    // a member KEY silently renamed under a write the caller spelled at another name.** The class is
    // refused here as the VALUE position refuses it, and the KEY IS STILL NEVER DROPPED: the whole value is
    // refused, verbosely, at the member's own position (`§1.4` item 3's own answer to a dropped member).
    if (hasLoneSurrogate(name)) {
      // **THE TARGET IS THE MEMBER POSITION'S OWN NAME AND NOT THE KEY**, for the reason `encodeSegment`
      // carries at the same class: the unpaired code unit has no `String` spelling and the only alternative
      // is a REPAIR of it, which `§1.8` forbids — so the failing target is named by the VALUE argument the
      // member was reached under, and the member's own POSITION (the key path, whose spelling
      // `valuePosition` takes from the same key) carries the rest.
      return refusedValue(fault, VALUE_ARGUMENT_POSITION, 'a string carrying a lone surrogate', extendedPath(path, name), { k: 'c' });
    }
    members[members.length] = [name, encodeValue(value[name], next, depth + 1, extendedPath(path, name), fault)];
    if (fault.found !== null) break;
  }
  // **THE BARE PLAIN OBJECT** (`contract.md §3`, `§5`; `A148` Q4): the members are data and the shape is
  // the object's own, so no `k`, no `m`, no `p`, no `acc` and no `proxy` is carried.
  // **⟶ AND THE MEMBERS ARE DEFINED OWN DATA PROPERTIES BY A LOCAL LOOP, NOT BY `Object.fromEntries`**
  // (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`, items `(1c)(ii)` and `(2b)`'s row `20`): the CALL is
  // lawful and its ARGUMENT'S ITERATION is not — `fromEntries` consumed the members through
  // `Array.prototype[Symbol.iterator]`, so a forged iterator could drop or reorder a crossed member. **The
  // defined form is the one `Object.fromEntries` took all along** — an own data property per member, per the
  // gate-4 `ADV-12` rule that a member genuinely named `__proto__` must stay a member and not become the
  // returned object's prototype (`Object.defineProperty` defines; `[[Set]]` would not).
  const plain = {};
  for (let at = 0; at < members.length; at += 1) {
    Object.defineProperty(plain, members[at][0], {
      value: members[at][1],
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
  return plain;
}

/// `crossing.md §1.3`'s `Segment`: a string or a non-negative integer is admitted, and EVERY outside class
/// is carried as its own variant so the STORE produces the code (`DD-1`) — the package mints none.
///
/// **`A76` AT THIS SITE: THE CLASS IS DECIDED FIRST AND NOTHING IS RESHAPED.** The declared rows (a
/// `null`, an `undefined`, a boolean, an object, a nested array, a function) are carried as their own
/// variants, so the store generates its own `AddressMalformed` at the failing target's address. **A
/// `symbol` and a `bigint` have NO carrier row at all** — and folding either into the `object` marker would
/// report a class that is not the one the caller spelled — so those two are REFUSED AT THE BOUNDARY,
/// verbosely, naming the class and the POSITION the segment holds. **`JS-1`'s demand is met by
/// CONSTRUCTION, not by a `catch`: no `String(segment)`/`Number(segment)` is spelled here, so no `valueOf`,
/// no `Symbol.toPrimitive` and no trap is ever invoked, and the class is read with `typeof` alone.**
///
/// **⟶ AND TWO MORE CLASSES ARE DECIDED AT THIS POSITION, ADDED 2026-10-11 BY THIS HOST-FIX PASS — `C-4`
/// AND `C-12` OF THE GATE-4 ADVERSARIAL PASS:**
/// * **THE LONE SURROGATE (`C-4`).** `crossing.md §1.2` row 1's dated clause and `§1.4` item 9 make the class
///   BOUNDARY-ONLY and refuse it *"AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED"*, *"never silently
///   replaced, never silently dropped and never normalized into a replacement character"* — **and the class
///   is a property of a JS `string`, which a SEGMENT is.** The as-built walk never called
///   `hasLoneSurrogate` here, so `on(['\uD800'], f)` was admitted, `facade.rs`'s string path repaired the
///   code unit to U+FFFD on the way in, and **a listener fired at an address the caller never spelled.**
///   **THE CLASS IS NOW APPLIED HERE EXACTLY AS THE VALUE POSITION APPLIES IT**, with the answer the same
///   dated clause declares.
/// * **AN INTEGRAL SEGMENT ABOVE THE CARRIER'S OWN RANGE (`C-12`).** `AddressArg` row 3 admits *"a `number`
///   that is integral, `>= 0` and exact as an `f64`"* — and the carrier that row's own spelling reaches is
///   `JsSegment::Index(u64)` (`package.md §4.5` item 2's `JsSegment` row; `crossing.rs`'s
///   `JsSegment::Index(i) => Segment::Index(*i)`), **so a JS `number` above `u64::MAX` has NO EXACT SPELLING
///   IN THE CARRIER AT ALL.** The facade read it with `n as u64`, a SATURATING cast in Rust: `2**64` and
///   `1e30` both arrived as `u64::MAX`, so **two distinct admissible addresses became ONE store address and
///   shared one handle.** **THE RANGE IS CHECKED BEFORE THE CAST AND THE OUT-OF-RANGE INTEGRAL SEGMENT IS
///   REFUSED `AddressMalformed` — `AddressArg` row 8's own code for a number outside the segment domain,
///   carried and never minted (`DD-40`) — because a silent saturation is a repair (`A76`: *"do not attempt
///   to fix"*; `§1.8`). `Number.MAX_SAFE_INTEGER` is the boundary carried here: it is the largest integral
///   `number` a JS consumer can hold and compare EXACTLY, and every `number` at or below it is exact in the
///   carrier's `u64` as well.**
function encodeSegment(segment, position, argumentPosition) {
  const kind = typeof segment;
  if (kind === 'string') {
    // `§1.2` row 1's dated clause at the SEGMENT position (`C-4`): the class is refused at the package's
    // own walk and never repaired on the way in.
    if (hasLoneSurrogate(segment)) {
      boundaryReject(
        'ValueNotAdmitted', // row 1's dated clause's own answer, carried and never minted (`DD-40`)
        // **THE TARGET IS THE POSITION'S OWN NAME, NOT THE STRING, FOR THE REASON THIS CLASS EXISTS**: the
        // unpaired code unit cannot cross into the generator's own message either — it has no `String`
        // spelling, and the only alternative is a REPAIR of it, which `§1.8` forbids — so the failing TARGET
        // is named `'address'` (as this file already names it for the other class refused at this position)
        // and the failing segment is named by its INDEX and the ARGUMENT POSITION beside it. **The class is
        // what item 5 (b) makes mandatory; the value that failed is the one datum no clause requires here.**
        'address',
        argumentPosition === undefined
          ? `the address holds a string carrying a lone surrogate at position ${position}, and a segment is a string or a non-negative integer`
          : `the address holds a string carrying a lone surrogate at position ${position} of the ${argumentPosition}, and a segment is a string or a non-negative integer`,
      );
    }
    return segment;
  }
  if (kind === 'number') {
    // `C-12`: the class decision then the RANGE, both before the carrier's cast and never by it.
    if (Number.isInteger(segment) && segment >= 0 && !Number.isSafeInteger(segment)) {
      boundaryReject(
        'AddressMalformed', // `AddressArg` row 8's own declared code, carried and never minted (`DD-40`)
        'address',
        argumentPosition === undefined
          ? `the address holds an integral segment ${segment} at position ${position} above the carrier's own range, and a segment is a string or a non-negative integer a \`u64\` can carry exactly`
          : `the address holds an integral segment ${segment} at position ${position} of the ${argumentPosition} above the carrier's own range, and a segment is a string or a non-negative integer a \`u64\` can carry exactly`,
      );
    }
    return segment;
  }
  if (kind === 'boolean') return segment;
  if (segment === null) return { bad: 'null' };
  if (kind === 'undefined') return { bad: 'undefined' };
  if (kind === 'function') return { bad: 'function' };
  if (kind === 'symbol' || kind === 'bigint') {
    // **THE ARGUMENT POSITION IS APPENDED WHERE THE CALLING SITE DECLARES ONE** (`surface.md §2.5` item 5
    // (b): *"the ARGUMENT POSITION for a verb's arguments"* — `parameter-semantics.md §2.17`'s dated clause,
    // position `1` of `2` at `on`). **WHERE NO SITE IS PASSED, NOTHING MOVES**: the clause this arm already
    // stood on, byte-for-byte, is its default, and no verb but `on` declares a position here.
    boundaryReject(
      'AddressMalformed', // `AddressArg` rows 7–10's own declared code, carried and never minted
      'address',
      argumentPosition === undefined
        ? `the address holds ${classSpelling(segment)} at position ${position}, and a segment is a string or a non-negative integer`
        : `the address holds ${classSpelling(segment)} at position ${position} of the ${argumentPosition}, and a segment is a string or a non-negative integer`,
    );
  }
  if (Array.isArray(segment)) return { bad: 'array' };
  return { bad: 'object' };
}

/// **A SEGMENT'S OWN CLASS OUTSIDE `PAR-JS-5`'s DOMAIN, DECIDED AT THE PACKAGE'S OWN BOUNDARY AND REFUSED
/// `AddressMalformed` — THE OUTSIDE-VALUE CLASSIFICATION, TAKEN **BEFORE** THE STORE IS REACHED AND SO
/// BEFORE ANY ABSENT-KEY LOOKUP** (`parameter-semantics.md §2.5` line `357`: *"**The declared answer for EACH
/// outside value** — **`AddressMalformed` for every one of them, with the store's generated message**"*,
/// the fourteen carrier-variant rows `crossing.md §1.3` names — *"an array holding a negative integer · an
/// array holding a non-integer number · an array holding `null`/`undefined`/a boolean/an object/a nested
/// array/a function"*).
///
/// **WHY THE DECISION STANDS HERE AND NOT AT THE STORE: a well-formed address no node holds is the store's
/// own `AddressNotFound` (`a127-surface.test.mjs`'s F1 arm asserts that code at the ABSENT position), while
/// a node HELD and a segment outside the domain must answer `AddressMalformed` — so the CLASS must be
/// decided before the lookup rather than after it. The store's own walk decides it at `write` · `delete` ·
/// `listen` (`src/args.rs`, `src/store.rs`); at the READER the carrier reaches the walk FIRST, which returns
/// `AddressNotFound` for a held key. **The class is decided ONCE, at `encodeAddress`, for every verb alike**,
/// so no verb's address position can answer a lookup's code for a class the row refuses.
///
/// **THE MESSAGE IS THE STORE'S GENERATED ONE AND NEVER AN AUTHORED ONE** (`boundaryReject` reaches the
/// addon's `errorMessage`, `docs/specs/storeroom-js/surface.md §2.5` item 2): the SUBJECT is the failing segment's own spelling as the store's
/// generator renders it (`src/value.rs`'s `Segment::spelling`), and *"the integer `-1`"*, *"a shapeless
/// value"*, *"a boolean"*, *"an array"* and *"a Proxy"* are that rendering carried here, not invented.
/// **NOTHING IS COERCED** (`A76`/`JS-1`): the class is read with `typeof`, `Number.isInteger` and
/// `Array.isArray` alone — no `String(segment)`, no `Number(segment)`, no `valueOf` and no trap — so a
/// segment that is a `Proxy` is refused by `util.types.isProxy` and NO TRAP RUNS (`surface.md §2.4` item 7
/// (a) item 1; `crossing.md §1.4` item 4; `C-1`).
/// **THE CONTAINER IS NOW A PREFIX ARGUMENT AND NOT A SPELLED STRING, 2026-10-17** (`§2.5` item 5 (a)–(b)):
/// the segments the failing one stood in are handed to `boundaryReject`, which passes the store's own
/// `dotted_address` spelling of them into the generator's `<container>` slot, so **the container is stated
/// ONCE and by the store's generator** — and PART TWO carries the reason's class-and-position half ALONE,
/// which is the half `§2.5` item 5 (b) declares the boundary's own (*"the ARGUMENT POSITION … is carried
/// INSIDE the generated message's own text"*) and is never a second container claim.
function refuseOutsideSegment(segment, position, prefix, addressArgumentPosition) {
  const kind = typeof segment;
  let subject;
  if (segment === null) subject = 'a shapeless value';
  else if (kind === 'undefined') subject = 'an absent value';
  else if (kind === 'boolean') subject = 'a boolean';
  else if (kind === 'number') subject = Number.isInteger(segment) ? `the integer ${segment}` : `the number ${segment}`;
  else if (kind === 'function') subject = 'a function';
  else if (kind === 'symbol' || kind === 'bigint') subject = classSpelling(segment);
  else if (Array.isArray(segment)) subject = 'an array';
  else subject = 'an object'; // a `Proxy` over an array included: its class is `an object` to the carrier
  boundaryReject(
    'AddressMalformed', // `PAR-JS-5`'s own declared answer for every one of the fourteen rows, carried (`DD-40`)
    subject,
    addressArgumentPosition === undefined
      ? `the address holds ${subject} at position ${position}, and a segment is a string or a non-negative integer`
      : `the address holds ${subject} at position ${position} of the ${addressArgumentPosition}, and a segment is a string or a non-negative integer`,
    prefix,
  );
  return { bad: 'object' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// **`AddressArg` ROWS 5–6'S OUTSIDE SHAPE, DECIDED ON THE VALUE AS IT IS AND BEFORE ANY READ** (`A76`'s
/// class-first order; `C-1`): everything that is neither an `Array` nor a `Proxy` is rows 5–6's outside
/// value at the ADDRESS position — **and a `Proxy` is NOT this arm**: its own refusal stands above, where the
/// class decision is taken on `util.types.isProxy` before any `.length` read and before any element
/// (`surface.md §2.4` item 7 (a) item 1; `crossing.md` `AddressArg` row 12; `DD-34`), so no trap is run by
/// THIS predicate either.
function isOutsideAddressValue(value) {
  if (value === undefined || value === null) return true; // row 5's two named classes, on the value as it is
  if (types.isProxy(value)) return false; // row 12's own arm, decided above, with no trap run
  if (Array.isArray(value)) return false; // rows 1–3, 13, 14 — the ordinary array arm and its own tests
  return true; // rows 5–6: a string, a number, a boolean, an object, a function, a symbol, a bigint
}

/// **THE VALUE-SHAPE ARM OF `AddressArg` ROWS 5–6 — A NON-ARRAY OUTSIDE VALUE AT AN ADDRESS POSITION,
/// REFUSED AT THE BOUNDARY WITH ITS OWN RENDERING AND THE ARGUMENT POSITION IT STANDS AT** (`surface.md`
/// §2.5 item 5 (a)–(b); the `CF-3` authority split).
///
/// **THE DEFECT IT CLOSES, NAMED AS THE SUPERVISOR'S OWN RECORD NAMES IT** (`archive/reviews/
/// 2026-10-16-constraints-publication-gate1.md` §57, finding `2`): at EVERY address position — `listen`,
/// `read`, `write`, `delete`, `readLiteral` — a NON-ARRAY outside value (`'a.b'`, `7`, `null`, `undefined`)
/// answered the store's GENERIC line *"the address argument is not a legal address segment in `''` …"*,
/// **carrying the class half and NEITHER the failing TARGET NOR the argument POSITION** — while `§2.5` item 5
/// (a) makes the failing target mandatory and item 5 (b) makes the ARGUMENT POSITION mandatory where the
/// contract declares one (and a verb's argument position is the one place it does). **IT WAS HIDDEN UNTIL
/// NOW because the older `register` subject carried both at a HANDLE position — a VALUE position, where a
/// non-segment value is printed as its own value — and once the subject moved to an ADDRESS position the gap
/// became visible.**
///
/// **WHAT IS DECLARED, AND WHAT THIS SITE THEREFORE DOES:**
///   * **THE TARGET IS THE VALUE'S OWN RENDERING** (item 5 (a): *"a non-segment value PRINTED AS ITS OWN
///     VALUE … where the failure is about a value and not about a segment"*), in the spelling the store's own
///     generator and this package already give that value at every other site: `the number 7` · `the string
///     'a.b'` · `null` · `undefined` — **and a class whose own value cannot be printed (a `bool` · a
///     `function` · an `object` · a `Proxy`) is rendered by the store's own class spelling for it**, exactly
///     as `refuseOutsideSegment` renders the same classes at a SEGMENT position.
///   * **THE POSITION IS THE ARGUMENT POSITION** the verb's own signature declares (item 5 (b): *"the
///     ARGUMENT POSITION for a verb's arguments"*) — `first argument` at all five verbs, whose `address` is
///     the first position of each (`surface.md` §2.4 item 9 (f)'s table).
///   * **AND THE CONTAINER IS THE ARGUMENT ITSELF AND NEVER THE EMPTY REGISTER.** **THE ONE DECISION THE
///     CLAUSE DOES NOT PIN, STATED RATHER THAN GUESSED:** the store's `AddressMalformed` template always
///     prints a container (`src/error.rs`, *"… in '{container}', …"*), and the store's own trigger for this
///     state supplies the empty string (`malformed_address_argument`, whose rendering *"… in '', …"* names
///     THE REGISTER). **THAT CONTAINER IS FALSE HERE** — a whole-address SHAPE failure is found in no
///     container at all, the address argument never having resolved against the register — so the truthfully
///     filled slot is the failing ARGUMENT's own name, `address`, which is the same reading the store's own
///     `ConstraintListInvalid` row takes where the container is a KEY and not an address (`'constraints'`;
///     `docs/specs/storeroom-native/contract.md` §8.2's row and its `<CONTAINERSEGMENT>` degenerate arm).
///     **NO CLAUSE FIXES THIS WORDING: the clause fixes the TARGET, the CLASS and the POSITION, and the
///     container is this site's own truth claim.** **PART TWO then carries the reason's class half and the
///     position, appended after a separator, exactly as `boundaryReject` appends it at every other site.**
function refuseOutsideAddressValue(address, addressArgumentPosition) {
  const kind = typeof address;
  let subject;
  if (address === null) subject = 'null';
  else if (kind === 'undefined') subject = 'undefined';
  else if (kind === 'number') subject = `the number ${address}`;
  else if (kind === 'string') subject = `the string '${address}'`;
  else if (kind === 'boolean') subject = 'a boolean';
  else if (kind === 'function') subject = 'a function';
  else if (kind === 'symbol' || kind === 'bigint') subject = classSpelling(address);
  else subject = 'an object'; // a `Proxy` over a plain object included: its class is `an object` to the carrier
  // **THE CONTAINER SLOT CARRIES THE ARGUMENT'S OWN NAME AND NOT `''`** — see this site's own clause above.
  boundaryReject(
    'AddressMalformed', // `AddressArg` rows 5–6's own declared code, carried and never minted (`DD-40`)
    subject,
    `the address position holds ${subject} at the ${addressArgumentPosition}, and an address is an array of segments`,
    ['address'],
  );
  return { k: 'A' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// `crossing.md §1.3`'s `AddressArg` table, rows 1–14.
///
/// **⟶ AND ONE OPTIONAL PARAMETER, ADDED 2026-10-11 BY THE `Q3` PASS, SO `on` CAN OBEY `A81` WITHOUT A
/// SECOND REFUSAL FORM AND WITHOUT A SECOND ENCODER.** `addressArgumentPosition` is the ARGUMENT POSITION
/// `parameter-semantics.md §2.17`'s dated clause declares at a site that declares one — `on`'s `address` is
/// `1` of `2` — and it is threaded into the SEGMENT arm alone, which is the one arm of this table that
/// refuses at the BOUNDARY rather than carrying its class to the store. **EVERY OTHER CALLER PASSES
/// NOTHING AND EVERY BYTE OF EVERY OTHER ARM IS UNMOVED**, so no verb's answer and no other site's message
/// changes: the parameter is additive and its absence is the as-filed reading.
///
/// **⟶ AND FROM 2026-10-17 A SECOND, SEPARATE POSITION PARAMETER GOVERNS `AddressArg` ROWS 5–6**
/// (`§2.5` item 5 (a)–(b); see `refuseOutsideAddressValue` above): a NON-ARRAY outside value — a supplied
/// `undefined`, a `null`, a string, a number, a boolean, an object, a function — is refused at the boundary
/// at EVERY verb that declares an argument position, verbosely, carrying its own rendering and that position.
///
/// **WHY IT IS A SEPARATE PARAMETER AND NOT THE SAME ONE, STATED SO THE BLAST RADIUS IS EXACTLY ONE ARM:**
/// `addressArgumentPosition` is the SEGMENT arm's (`rows 7–10`, and the `Proxy` and out-of-range arms) and it
/// is passed by `listen` ALONE, so the segment arm's bytes at the other four verbs are UNMOVED — **THE
/// INSTRUCTION IS THAT NO MESSAGE ALREADY CORRECT MOVES, and the supervisor's defect is the NON-ARRAY arm
/// only.** `addressValuePosition` reaches the arms THIS PASS REPAIRS, and nothing else.
/// **WHERE NO VALUE POSITION IS PASSED — the construction's `listeners[]` walk, which calls this encoder with
/// one argument — EVERY BYTE IS UNMOVED and the store answers the construction itself** (`PAR-JS-21`; the
/// construction's own answer is the store's, and no argument position is declared at that site).
export function encodeAddress(address, addressArgumentPosition, addressValuePosition) {
  // `crossing.md §1.3`'s absent-versus-`undefined` rule, rule 1: an argument position the call supplied no
  // value for is ABSENT, and `undefined` at a supplied position folds to that SAME state. `AddressArg` rows
  // 4 and 5 answer the one code, so no declared answer moves by the fold.
  //
  // **⟶ AND AT A SITE THAT DECLARES AN ARGUMENT POSITION, ROWS 5 AND 6 ARE ANSWERED HERE AND VERBOSELY**
  // (`§2.5` item 5 (a)–(b); `refuseOutsideAddressValue`): a supplied `undefined`, a `null` and every
  // non-array carry their OWN RENDERING and the POSITION instead of the store's generic argument-shaped line.
  // **THE ARITY-ABSENT CALL IS NOT THIS ARM AND CHANGES NOTHING**: `undefined` reaches this encoder only
  // from a call that SUPPLIED it (every caller passes `[encodeAddress(address)]` under its own `n >= 1`
  // test), while the NO-ARGUMENT call reaches the store as its own carrier and answers there — which is
  // `CF-3`'s part 5 unmoved (*"an absent CARRIER argument … crosses to the store as its own carrier value"*).
  if (addressValuePosition !== undefined && isOutsideAddressValue(address)) {
    refuseOutsideAddressValue(address, addressValuePosition);
  }
  if (address === undefined) return { k: 'A' };
  if (address === null) return { k: 'N' };
  // **`A76`/`JS-2`: THE CLASS DECISION COMES FIRST HERE TOO, ON THE ADDRESS AS IT IS — AND THE `Proxy`
  // REFUSAL IS PART OF THAT DECISION AND NOT BESIDE IT** (`surface.md §2.4` item 7 (a) item 1: *"the `Proxy`
  // refusal is part of that decision, not beside it … BEFORE the shape test, BEFORE `Array.isArray`, BEFORE
  // any `.length` read and BEFORE any element is read"*). **`util.types.isProxy` READS NO MEMBER AND
  // INVOKES NO HANDLER**, which is what makes the class decidable with NO TRAP RUN at both proxies-over-array
  // and proxies-over-object (`crossing.md §1.4` item 4; `DD-34`; `C-1`). **AND `§2.5` item 5 (b) MAKES THE
  // CLASS HALF MANDATORY**: the refusal's message carries `a Proxy` and the POSITION, so the class the value
  // HAS is named rather than the store's own generic object arm; a class extending `Array` — for which
  // `Array.isArray` is TRUE — is refused under its own declared class (`AddressArg` row 11's
  // `AddressMalformed`: *"the shape is not an array"*) rather than ADMITTED because a language predicate made
  // it look like one.
  if (types.isProxy(address)) {
    boundaryReject(
      'AddressMalformed', // row 12's own declared code (`DD-34`), carried and never minted (`DD-40`)
      classSpelling(address), // the class half, mandatory under item 5 (b): `a Proxy`
      addressArgumentPosition === undefined
        ? 'the address position holds a Proxy, and a Proxy over an array is refused as AddressArg row 12\'s own class with no trap run'
        : `the address position of the ${addressArgumentPosition} holds a Proxy, and a Proxy over an array is refused as AddressArg row 12's own class with no trap run`,
    );
  }
  if (Array.isArray(address)) {
    if (arrayClass(address) === 'class') return { k: 'C' }; // row 11: a class extending `Array`
    for (let i = 0; i < address.length; i += 1) {
      if (!(i in address)) return { k: 'S' }; // row 14 (`DD-8`)
    }
    const segments = [];
    for (let i = 0; i < address.length; i += 1) {
      const segment = address[i];
      const encoded = encodeSegment(segment, i, addressArgumentPosition);
      // **`PAR-JS-5`: THE FOURTEEN ROWS' CLASS IS DECIDED HERE, BEFORE THE STORE AND BEFORE ANY LOOKUP**
      // — a `{bad: …}` marker, a negative or non-integer number, a boolean, or a `Proxy` over an array.
      const outsideMarker = encoded !== null && typeof encoded === 'object' && typeof encoded.bad === 'string';
      const outsideNumber = typeof segment === 'number' && !(Number.isInteger(segment) && segment >= 0);
      if (outsideMarker || typeof segment === 'boolean' || outsideNumber) {
        // **AND THE PREFIX IS THE SEGMENTS THIS ONE STOOD IN AND NOTHING ELSE** — the container the
        // store's own `malformed_segment` names at its `L-1` arm (the store's walk pushes each in-domain
        // segment into its own container before it tests the next), so the refusal's container is the
        // SAME datum at both layers and not a second spelling of it.
        refuseOutsideSegment(segment, i, address.slice(0, i), addressArgumentPosition);
      }
      // **⟶ AND THE CARRIER'S SEGMENT LIST IS EXTENDED BY INDEX TOO** (`contract.md §2.1`'s clause of
      // 2026-10-24 on `F7-1`, item `(1b)`, and the battery's row `(g)`): the as-built `segments.push` was
      // `Array.prototype.push` taken off a MUTABLE PROTOTYPE on the ADMISSION path, so a caller's no-op `push`
      // emptied this list and the whole write crossed to the REGISTER instead of the address the caller
      // spelled — an admitted drive whose crossed member moved. The list, its order and the shape it is
      // handed in are unmoved.
      segments[segments.length] = encoded;
    }
    return { k: 'L', s: segments }; // rows 1–3, 13
  }
  if (typeof address === 'object') return { k: 'C' }; // rows 6 and 11: the shape is not an array's
  return { k: 'D', o: encodeSegment(address, 0) }; // row 6: a non-array's five named classes
}

/// `crossing.md §1.3`'s `TierArg` table and `TierSetItem` table.
///
/// **A SUPPLIED `undefined` IS PRESENT AT THIS POSITION AND `delete`'s TIER IS REACHED AS A VALUE — THE ONE
/// CALL THAT FOLDS TO THE ABSENT ROW IS THE CALL THAT SUPPLIED NOTHING THERE.** **⟶ ADJUDICATED 2026-10-16,
/// AND THIS CLAUSE IS THE OPERATIVE READING OF THE BYTES BELOW** (`parameter-semantics.md §2.6`'s
/// `PAR-JS-6` row, its `the declared answer for EACH outside value` cell as reconciled the same date, whose
/// words are *"`a.read(address, undefined)` IS A SUPPLIED VALUE AT THIS POSITION AND TAKES `PAR-JS-6`'s
/// DECLARED ANSWER — the store's own thrown `{status, message}` with `status` `AddressMalformed` — while the
/// ONE CALL THAT FOLDS TO THE ABSENT ROW IS `a.read(address)`, WHICH SUPPLIED NOTHING THERE"*; the same
/// adjudication stands at `acceptance.md §4.1` item `7`, whose *"folds to the ABSENT row"* is read through
/// that row from that date). **SO `foldsUndefined` IS `false` AT EVERY SUPPLYING SITE — `read` ·
/// `readLiteral` · `write` · `delete` — and the arity fold that reaches `{ k: 'A' }` is the NO-ARGUMENT CALL
/// ALONE**, which is exactly what `supplied` carries: `n >= 2` at the readers and the writers, read off the
/// METHOD's own call arity (`docs/specs/storeroom-js/surface.md §2.12` item 3's one-spelling rule). **THE STORE'S OWN `TierArg::Undefined` ARM
/// ANSWERS `AddressMalformed` AT ALL FOUR** (`src/args.rs`'s `read_tier_sel` and `write_tier`), so no code is
/// minted here and the answer is the store's own.
///
/// **AND `A76`'S CLASS ORDER IS TAKEN HERE FIRST (`JS-2`'s reach at this carrier):** a `Proxy` is refused
/// as an OBJECT before any element is read from it — **so a throwing `get` trap cannot be raised, because
/// nothing reads the proxy** — and a class extending `Array` is refused as an OBJECT (`TierArg` row 6's
/// `OutOfDomainTier`) rather than admitted as the array spelling row 2 declares for the readers.
/// **THE SUPPLIED-`undefined`-TIER ARM AT AN ADDRESS POSITION** — `refuseOutsideAddressValue`'s own
/// shape, taken at the one value that reached neither of the boundary's two segment/address arms
/// (`DEF-2026-10-17-A`; `surface.md §2.5` item 5 (a)–(b) and its `CF-3` authority split).
///
/// **THE TARGET IS THE VALUE'S OWN RENDERING AND IT IS THE STORE'S OWN SPELLING FOR THAT VALUE** (item 5
/// (a): *"a non-segment value PRINTED AS ITS OWN VALUE"*) — `undefined`, which is the spelling
/// `refuseOutsideAddressValue` already gives this same value at the whole-address arm, so ONE value has
/// ONE rendering at both arms and neither is authored here. **THE CONTAINER IS THE ARGUMENT'S OWN NAME**
/// (`['address']`, handed to `boundaryReject`, whose third slot fills the generator's own `<container>`),
/// exactly as the whole-address arm does one function above — a WHOLE-ADDRESS refusal is found in no
/// container, so the truthfully filled slot is the failing ARGUMENT's own name. **PART TWO CARRIES THE
/// POSITION AND NOT A SECOND CONTAINER CLAIM:** the ARGUMENT POSITION `§2.5` item 5 (b) requires beside the
/// class, and the class of the value the position refused.
///
/// **⟶ AND THE SECOND VALUE THIS ARM SERVES IS A SUPPLIED `null`, WIDENED 2026-10-17 BY THE SAME ONE SITE
/// (`DEF-2026-10-17-E`).** **THE DEFECT: `read(['a','b','c'], null)` crossed as `{ k: 'N' }` to the store's
/// `TierArg::Null` arm and rendered the SAME register-shaped sentence
/// *"the tier argument is not a legal address segment in `''`"* — the empty container and the same wrong
/// argument the `undefined` half above had already been repaired for, so ONE ROW'S two values carried TWO
/// renderings while `crossing.md §1.3`'s `TierArg` row 4 declares them ONE answer.** **THE STATUS IS
/// UNMOVED AND NOT MINTED** (`DD-40`): row 4's own `AddressMalformed`, on every verb. **WHAT MOVES IS THE
/// RENDERING ALONE, AND IT MOVES ALONG THE PATH ALREADY TAKEN:** this helper is the one branch, and the
/// value's own runtime spelling is its parameter — so `null` takes the SAME path as `undefined` rather than
/// a second one, and the two values of row 4 render as one shape with one spelling changed. **THE STORE'S
/// OWN `TierArg::Null` ARM IS UNTOUCHED** (`src/args.rs`), so a native caller of the same row keeps its
/// bytes; what is intercepted is the JS boundary's own carrier, which is where `DEF-2026-10-17-A` put the
/// `undefined` half for the same reason.
function refuseSuppliedOutsideTier(value, addressArgumentPosition) {
  boundaryReject(
    'AddressMalformed', // `PAR-JS-6`'s and `TierArg` rows 3–4's own declared code for this value, carried (`DD-40`)
    value, // the value's own runtime spelling, as the store renders it and as `refuseOutsideSegment` renders it
    // **THE POSITION HALF IS SPELLED IN THIS SITE'S OWN VOCABULARY because `addressArgumentPosition` is the
    // address's OWN position token (`'first argument'`, the position every one of the five verbs declares
    // for its `address` — `surface.md §2.4` item 9 (f)'s table): the address position was SUPPLIED, and
    // what was supplied BESIDE it is a `tier` position carrying this value. The sentence therefore names
    // the argument that was supplied, the position it stands AT, and the class the supplied value has —
    // which is the whole of what item 5 (b) requires to travel inside the message.**
    addressArgumentPosition === undefined
      ? `the address position was supplied, the tier position holds ${value}, and a tier is a token or a set of tokens`
      : `the address position was supplied at the ${addressArgumentPosition}, the tier position holds ${value}, and a tier is a token or a set of tokens`,
    ['address'],
  );
  return undefined; // `boundaryReject` throws; this is unreachable and is not a second path
}

export function encodeTier(tier, supplied, foldsUndefined, addressArgumentPosition) {
  if (!supplied) return { k: 'A' };
  if (tier === undefined) {
    if (foldsUndefined) return { k: 'A' };
    // **⟶ AND THE SUPPLIED-`undefined` ARM IS THE FOURTH BRANCH, REFUSED AT THE BOUNDARY 2026-10-17
    // (`DEF-2026-10-17-A`; `surface.md` §2.5 item 5 (a)–(b) and its `CF-3` authority split).**
    //
    // **THE DEFECT, MEASURED ON INSTALLED BYTES AND REPRODUCED AT THIS TREE: this value crossed to the
    // store as `{ k: 'U' }` and the store answered its OWN `malformed_tier_argument()`
    // (`src/args.rs`'s `read_tier_sel` / `read_literal_tier_sel` / `write_tier`), whose generated text is
    // *"the tier argument is not a legal address segment in `''`, segments are strings or non-negative
    // integers"* — AN EMPTY CONTAINER AND A NAMED ARGUMENT THE OFFENDING VALUE IS NOT.** *"`''` for the
    // register"* (`docs/specs/storeroom-native/contract.md` §8.2's `<CONTAINER>`), so that message answers
    // a failure found INSIDE THE REGISTER, while a `read(['a','b','c'], undefined)` on an EMPTY store has
    // resolved against no register node at all.
    //
    // **WHY THIS IS THE MISMATCH THE OTHER THREE BRANCHES ALREADY REPAIR, AND WHY IT IS THE FOURTH:** rows
    // 1–3 of that classification are whole-ADDRESS shapes refused by `refuseOutsideAddressValue`
    // (container `'address'`, position `at the first argument`), and the array's own outside SEGMENTS are
    // refused by `refuseOutsideSegment` (container = the failing segment's PREFIX). **A SUPPLIED
    // `undefined` TIER BESIDE AN ADDRESS THAT IS ITSELF WHOLLY IN DOMAIN — `['a','b','c']`, `['a.b']`,
    // `['a']`, `[]` — REACHED NEITHER ARM** and fell through to the store's register-shaped sentence.
    //
    // **WHAT IS DECLARED HERE, AT THIS ONE SITE:** the ARGUMENT POSITION the verb's own signature declares
    // (item 5 (b): *"the ARGUMENT POSITION for a verb's arguments"*) and a TRUE container — the same
    // reading the whole-address arm takes one function above and the same one the store's own
    // `ConstraintListInvalid` row takes where its container is a KEY and not an address
    // (`constraints`; native `contract.md` §8.2's row and its `<CONTAINERSEGMENT>` degenerate arm).
    // **THE STATUS IS NOT MINTED** (`DD-40`): it stays the store's own `AddressMalformed`, which is the
    // code this row declares — *"`AddressMalformed` when the argument is `null` or `undefined`"*
    // (`parameter-semantics.md` §2.6's `PAR-JS-6` answer cell, as reconciled 2026-10-16) — carried and not
    // re-minted, exactly as `refuseOutsideSegment` carries it.
    //
    // **WHAT DOES NOT MOVE:** the call still SUPPLIES the value at the position and does not fold it to the
    // ABSENT row (`PAR-JS-6`'s reconciliation, unmoved: the ONE call that folds is `a.read(address)`, which
    // supplied nothing); `write`'s required tier answers the same code; and the store's own
    // `TierArg::Undefined` arm is untouched.
    refuseSuppliedOutsideTier('undefined', addressArgumentPosition);
    return { k: 'U' }; // `refuseSuppliedOutsideTier` throws; this is unreachable and is not a second path
  }
  // **⟶ AND THE OTHER VALUE OF ROW 4 TAKES THE SAME BRANCH, ADDED 2026-10-17 (`DEF-2026-10-17-E`).**
  // `crossing.md §1.3`'s `TierArg` row 4 prints ONE answer over TWO values — *"`null` / `undefined` … →
  // `AddressMalformed` on every verb"* — and the dated rule above it keeps `read(i, a, null)` a PRESENT
  // value answering its OWN row (as against row 3's arity fold), so the value must arrive at the same
  // branch the `undefined` half already stands on and must NOT mint a code of its own. **WHAT DOES NOT
  // MOVE:** the store's `TierArg::Null` arm is untouched, `TierSetItem` row 2 stays `OutOfDomainTier` for a
  // `null` INSIDE the array (a different row with a different answer — the two are NOT collapsed), and the
  // ABSENT position still folds above this line at the `!supplied` guard.
  if (tier === null) {
    refuseSuppliedOutsideTier('null', addressArgumentPosition);
    return { k: 'N' }; // `refuseSuppliedOutsideTier` throws; this is unreachable and is not a second path
  }
  if (typeof tier === 'string') return { k: 'T', v: tier };
  if (types.isProxy(tier)) return { k: 'O' }; // row 6: an object, and no trap is invoked
  if (Array.isArray(tier)) {
    if (arrayClass(tier) === 'class') return { k: 'O' }; // row 6: a class extending `Array` is an object
    // **⟶ AND THE TIER SET IS ENCODED BY A LOCAL INDEX LOOP, NOT BY `Array.prototype.map`** (`contract.md §2.1`'s
    // clause of 2026-10-24 on `F8-2`, items `(2a)`, `(2b)` and `(2c)`, and item `(2b)`'s row `61`; arm `(xix)`,
    // cell `JC-TC-65`): `delete Array.prototype.map` threw a RAW HOST `TypeError` out of a LAWFUL store verb, and
    // a forged `map` silently dropped tier items from a verb that then succeeded — a crossed member decided by a
    // prototype. The loop carries one encoded item per item, in the caller's own order.
    const items = [];
    for (let i = 0; i < tier.length; i += 1) items[items.length] = encodeTierSetItem(tier[i]);
    return { k: 'S', i: items };
  }
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
///
/// **⟶ `JS-1` AND `JS-6` ARE CLOSED AT THIS SITE — THE `Number(opId)` COERCION IS GONE.** The shipped arm
/// was `return { k: 'D', v: Number(opId) }`, and it was wrong three ways at once: `Number(Symbol())` threw
/// a RAW HOST `TypeError` out of this frame (outside `docs/specs/storeroom-js/surface.md §2.5`'s one form), an object with a throwing
/// `valueOf`/`Symbol.toPrimitive` or a `Proxy` with a throwing trap did the same, and **a `bigint` crossed
/// the NUMBER ARM and was substituted — `Number(10n)` is `10` — so the caller's `10n` was reported as a
/// number** (`JS-6`). **THE FIX IS THE ORDER, NOT A `catch`: THE CLASS IS DECIDED FIRST AND NOTHING IS
/// CONVERTED, so no `valueOf`, no `Symbol.toPrimitive` and no trap is ever invoked and there is no host
/// error left to catch.**
///
/// **THE DECLARED ROWS CROSS TO THE STORE (`OpIdArg` rows 1, 3–6): a `string`, a supplied `undefined`, a
/// `null`, and a NUMBER — `JS-1`'s *"a number"* row 6 — each carried as its own variant so the store renders
/// its own generated `AddressMalformed` at the failing target.** **EVERY OTHER CLASS — a `symbol`, a
/// `bigint`, a `boolean`, an object, an array, a function, a `Proxy`, a class instance — is refused AT THE
/// BOUNDARY, inside the one form, naming the target and the class** (`A76`: *"an op-id (and every other
/// argument) whose class is outside the declared domain is refused INSIDE the single failure form"*; the
/// status is the one the table's rows 3–6 declare, `AddressMalformed`, and it is carried rather than
/// minted — `DD-40`).
export function encodeOpId(opId) {
  if (opId === undefined) return { k: 'U' };
  if (opId === null) return { k: 'N' };
  if (typeof opId === 'string') return { k: 's', v: opId };
  // THE DECLARED NUMBER ROW: the number itself crosses — **never `Number(opId)`, which would COERCE every
  // other class into this arm.**
  if (typeof opId === 'number') return { k: 'D', v: opId };
  boundaryReject(
    'AddressMalformed', // `OpIdArg` rows 3–6's own declared code, carried and never minted (`DD-40`)
    targetSpelling(opId), // item 5 (a): the non-segment target printed as its OWN value
    `the rollback's opId is ${classSpelling(opId)}, and an op id is a non-empty string`,
  );
  return { k: 'U' }; // `boundaryReject` throws; this is unreachable and is not a second path
}

/// **⟶ `encodeHandle` IS DELETED, NOT REWRITTEN — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).**
/// The three-variant classifier (*"the OPAQUE form alone is the site's, and every outside spelling is
/// carried as its own variant"*) and its `state.tokens` walk **go whole**, on the architect's ruling that
/// settles fork (g), VERBATIM: *"This is also irrelevant because tokens is being eliminated and the function
/// lookup is now a direct map key check."* (`P: docs/pending.md · P-6`; `contract.md §2.8` item 2 item (6);
/// `identity-and-domain.md §1` item 1).
///
/// **WHAT REPLACES IT IS A DIRECT MAP KEY CHECK AT EACH VERB** — `map.has(handle)` / `map.get(handle)` on
/// the ONE function map keyed by the handle string (`identity-and-domain.md §1` item 4). **THE THREE VARIANTS
/// AND THEIR TWO DISPOSITIONS SURVIVE AS CONSEQUENCES AND NOT AS A CLASSIFIER**: a NON-STRING is REFUSED by
/// the class test at `listen`/`register`/`removeListener`; a STRING the map does not carry is `unlisten`'s
/// NO-OP SUCCESS and `register`'s REFUSAL; and a BLANK STRING stays the store's own refused form.
///
/// **THE ONE PREDICATE THE SITES SHARE IS THE DOMAIN TEST ITSELF — A `typeof` READ AND A LENGTH READ AND
/// NOTHING MORE** (`identity-and-domain.md §2` item 1: *"no object inspection, no `Proxy` trap invocation, no
/// property read"*).
export function inDomainHandle(handle) {
  return typeof handle === 'string' && handle !== '';
}

/// **THE HANDLE SHAPE THE ADDON IS HANDED FOR A VERB'S HANDLE POSITION** — one spelling, and it is the
/// handle's own value: `{k:'O', v: handle}` is the `JsHandleArg` carrier's opaque arm, which with the token
/// gone carries the handle it always was (`P: docs/pending.md · P-6`, the type ruling: *"`JsHandle { token:
/// String }` collapses to the string it always was"*).
export function handleWire(handle) {
  return { k: 'O', v: handle };
}

/// `crossing.md §1.3`'s `FilePathArg` table: ABSENT is IN DOMAIN, and `undefined` at a PRESENT key is row
/// 3's `AddressMalformed`.
export function encodeFilePath(filePath) {
  if (filePath === undefined) return undefined;
  if (filePath === null) return null;
  if (typeof filePath === 'string') return filePath;
  return { bad: typeof filePath };
}

/// `crossing.md §1.3`'s `JournalLengthArg` table, `12` rows, with NO coercion (`PAR-JS-4`).
///
/// **`A76`/`JS-6` AT THIS CARRIER: A `bigint` CROSSES AS A `bigint`.** The shipped arm wrote the marker
/// `{ bigint: n.toString() }`, which the facade could only read as an OBJECT — a class folding the caller
/// never spelled. **The value's own class is handed over as the value itself**, the facade reads it as
/// `NAPI_BIGINT` (never through the number read), and the store answers row 11's declared
/// `AddressMalformed` — *"and no coercion of a numeric string, a boolean or a `bigint` is performed"*
/// (`PAR-JS-3`).
export function encodeJournalLength(n) {
  if (n === undefined) return undefined;
  if (n === null) return null;
  if (typeof n === 'number' || typeof n === 'string' || typeof n === 'boolean') return n;
  if (typeof n === 'bigint') return n;
  if (typeof n === 'function') return { bad: 'function' };
  return { bad: 'object' };
}

/// `crossing.md §1.3`'s `ListenersArg` table: ABSENT answers `AddressMalformed` — *"the ONE absence the
/// construction does not admit"* — and a rejected array admits NOTHING.
///
/// **`A76`/`JS-5` AT THIS CARRIER — THE TWO DEFECTS THE GATE-4 PASS MEASURED ARE BOTH CLOSED HERE:**
/// **(1) `'address' in entry` WALKED THE PROTOTYPE CHAIN, so an entry carrying an INHERITED `address` or
/// `handle` was read as an entry field** — every member read below is now `Object.hasOwn`'s own-property
/// read and nothing else; **(2) an ENTRY that is a prototype-carrying object or a class instance was read
/// through the chain at all** — **the entry's CLASS is now decided first** (`isPlainObjectValue`, which
/// refuses a `Proxy`, an `Array` and any prototype-carrying object before one member is read) and a
/// non-plain entry is REFUSED AT THE BOUNDARY with the class and the POSITION named, inside the one form
/// (`ListenersArg` row 2's declared `AddressMalformed`, carried and never minted).
