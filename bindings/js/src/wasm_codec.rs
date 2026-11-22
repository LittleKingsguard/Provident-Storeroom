//! `wasm_codec` — **THE CODEC'S TWIN FOR THE SECOND CLAIMED REALM: THE READERS AND THE COPY OUT, OVER
//! `wasm-bindgen`'s OWN UNTYPED VALUE HANDLE.**
//!
//! **WHAT THIS FILE IS, STATED ONCE SO IT IS NOT RE-DERIVED FROM THE SCROLL: `bindings/js/src/codec.rs` IS
//! THE SPECIFICATION AND THIS FILE REPRODUCES EVERY DECISION IT TAKES, IN THE ORDER IT TAKES THEM.** The
//! class tests, the own-property gates, the sentinels, the absent-versus-`undefined` readings, the tag
//! tables the eight carriers are decoded by, and the copy OUT's member-for-member record shape are the same
//! decisions with the same answers — **because a second realm that decides differently is a second store,
//! and the corpus declares one domain.**
//!
//! **THREE DIFFERENCES ARE STRUCTURAL AND EACH IS NAMED AT ITS OWN SITE RATHER THAN LEFT TO BE FOUND:**
//!
//! 1. **THE VALUE HANDLE IS `wasm_bindgen::JsValue`, AND NO `napi` NAME APPEARS BELOW** — this module is
//!    compiled only under `#[cfg(target_arch = "wasm32")]` (`lib.rs`), and the crate's Node-API half is
//!    compiled only under its negation. The alias [`JsVal`] is the twin of `codec.rs`'s `JsVal`: the
//!    UNTYPED hand-carried value, as against `crossing`'s [`JsValue`], which is the decided tree.
//! 2. **THE PRIMITIVES ARE DECLARED IMPORTS OF THE STANDARD GLOBALS, NOT `js_sys` CALLS** — see the block
//!    above [`object_new`]. `js_sys` is NOT in this tree's closure (`Cargo.lock` carries `wasm-bindgen`
//!    `0.2.130` and no `js-sys`), and this crate's wasm dependency table declares `wasm-bindgen` alone, so
//!    the twin reaches `Object`, `Reflect` and `Array` through the facility `wasm-bindgen` exists for:
//!    `#[wasm_bindgen] extern "C"` with `js_namespace`.
//! 3. **THE DEPTH CEILING IS CONSULTED BEFORE THE DESCENT** (`docs/L3/wasm-realm/design.md` §4's ceiling
//!    row, which is *"a new obligation, not a port"*) — see [`value_of`] and `DEPTH_CEILING`.
//!
//! **THE COPY IN AND THE COPY OUT ARE BOTH HERE, AND THE SECOND IS NOT AN EXTRA.** `read` answers a value
//! and `write` answers a record, so the entries cannot exist without the copy OUT's twin; the same is true
//! of every later entry, one reader and one emitter each, and **an item no live path names is a warning this
//! file may not carry** — this crate's doctrine is delete-rather-than-allow, so what appears below appears
//! because an entry in `wasm.rs` reads it.
//!
//! **⟶ AND THE SECOND SLICE'S TWELVE ENTRIES REACHED THE PART OF `codec.rs` THE FIRST SIX NEVER DID**, each
//! decision reproduced at the step `codec.rs` takes it: the delete receipt's copy out (`codec.rs:998`–`:1015`,
//! with the `null` arm its absent `op` crosses as), the rollback result's (`:1017`–`:1026`), the mark's
//! carrier (`:551`–`:556`, the `{k:'s', v}` row and the floor `{k:'F'}`), the listener handle's reader
//! (`:559`–`:579`), the address set's (`:1056`–`:1062`), and `errorMessage`'s positions with the generator's
//! own frame behind them (`facade.rs:1418`–`:1476`). **THE ONCE-ABSENT FIVE ARE NAMED BECAUSE THE LIST USED
//! TO BE PRINTED AS *"the part `codec.rs` this slice's six entries never reach"*** — that sentence was true of
//! the first slice and is false now, and the module that says a name is absent from itself is the last place
//! to leave a stale figure.

use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue as JsVal;

use crate::crossing::{
    JsAddressArg, JsBaseState, JsConfig, JsConstraintEntry, JsConstraintsArg, JsDeleteReceipt,
    JsFilePathArg, JsHandle, JsHandleArg, JsJournalLengthArg, JsJournalOp, JsKey, JsListenerEntry,
    JsListenerTrigger, JsListenersArg, JsNonArray, JsObject, JsOpIdArg, JsRollbackResult, JsSegment,
    JsTierArg, JsTierSetItem, JsValue, JsWriteResult,
};

// =================================================================================================
// THE PRIMITIVES — EIGHT DECLARED IMPORTS OF THE STANDARD GLOBALS, AND EVERY ONE OF THEM IS NAMED AT THE
// DECISION IT SERVES.
//
// **⟶ AND THIS BLOCK IS WHERE `design.md` §4's TABLE MEETS THE TOOLCHAIN AS MEASURED.** That table says the
// twin reads a member as *"`is_object()`/`is_function()` → `has_own_property` → read"*, and `D-155` item 1
// names `js_sys::Object` and `js_sys::Reflect` as the spellings it assumed. **`js_sys` IS NOT IN THIS TREE'S
// CLOSURE**: `Cargo.lock` carries `wasm-bindgen` · `wasm-bindgen-macro` · `wasm-bindgen-macro-support` ·
// `wasm-bindgen-shared`, all at `0.2.130`, and no `js-sys` row; the offline registry under
// `.cargo-home/registry/` holds no `js-sys` crate either. `wasm-bindgen` re-exports `JsValue` and not
// `Object`, so the four names the table reaches for — `Object::new`, `Object::has_own_property`,
// `Reflect::get_own_property_descriptor`/`define_property`, `Array::length`/`get` — are reached here through
// the crate's own import facility instead, at the same JS identities:
//
// * `Object()` — an ordinary object with this realm's `Object.prototype`: `throw_refusal`'s form
//   (`facade.rs:196`'s `Object::new`, at its own bytes: *"the value the runtime throws has `Object.prototype`
//   for its prototype"*).
// * `Object.create` — the NULL-PROTOTYPE object the descriptor is built on; see [`descriptor_for`].
// * `Object.hasOwn` — `HasOwnProperty`, i.e. `[[GetOwnProperty]]` and no chain (`A76`, `JS-5`), and the same
//   predicate `carrier.mjs` uses for a hole (`Object.hasOwn` and NOT
//   `Object.prototype.hasOwnProperty`, *"a method taken from a mutable prototype"*).
// * `Object.keys` — OWN ENUMERABLE STRING KEYS: the member census `crossing.md §1.4` item 4 (b) takes.
// * `Array()` — `[]`, the empty array the copy OUT starts from (`[]` called as a function with no arguments
//   is the ordinary empty array). Never `new Array(n)` plus `[[Set]]`: see [`array`].
// * `Reflect.get` — `[[Get]]` AFTER an own-key gate, exactly as `codec.rs`'s `member` reads the value once
//   `napi_has_own_property` has answered; and the element read `codec.rs`'s `elements` performs.
// * `Reflect.set` — used on the null-prototype DESCRIPTOR only, and never on a value a caller can see; the
//   specification makes it `CreateDataProperty` there (see [`descriptor_for`]).
// * `Reflect.defineProperty` — `[[DefineOwnProperty]]`, consulting no chain: `D-35`'s cure and `D-155`
//   item 1's correction, at every member this file writes.
//
// **NO OTHER JS NAME IS REACHED AND NO `[[Set]]` REACHES A CALLER-VISIBLE OBJECT**: the one `Reflect.set`
// above is on an object created by `Object.create(null)`, whose `[[Set]]` is `CreateDataProperty` by the
// specification's own definition, and the members of every record and of the refusal are
// `[[DefineOwnProperty]]` through `Reflect.defineProperty`.
// =================================================================================================
#[wasm_bindgen]
extern "C" {
    /// `Object()` — the empty object with this realm's own `Object.prototype`.
    #[wasm_bindgen(js_name = "Object")]
    fn object_new() -> JsVal;

    /// `Object.create(prototype)` — the descriptor builder's own null-prototype object.
    #[wasm_bindgen(js_namespace = Object, js_name = "create")]
    fn object_create(prototype: &JsVal) -> JsVal;

    /// `Object.hasOwn(target, key)` — `HasOwnProperty`, chain-consulting on no path (`A76`, `JS-5`).
    #[wasm_bindgen(js_namespace = Object, js_name = "hasOwn")]
    fn object_has_own(target: &JsVal, key: &JsVal) -> bool;

    /// `Object.keys(target)` — the own ENUMERABLE STRING keys, in the runtime's own order.
    #[wasm_bindgen(js_namespace = Object, js_name = "keys")]
    fn object_keys(target: &JsVal) -> JsVal;

    /// `Array()` — `[]`.
    #[wasm_bindgen(js_name = "Array")]
    fn array_new() -> JsVal;

    /// `Reflect.get(target, key)` — `[[Get]]`.
    #[wasm_bindgen(js_namespace = Reflect, js_name = "get")]
    fn reflect_get(target: &JsVal, key: &JsVal) -> JsVal;

    /// `Reflect.set(target, key, value)` — `[[Set]]`, taken on a NULL-PROTOTYPE object only.
    #[wasm_bindgen(js_namespace = Reflect, js_name = "set")]
    fn reflect_set(target: &JsVal, key: &JsVal, value: &JsVal) -> bool;

    /// `Reflect.defineProperty(target, key, descriptor)` — `[[DefineOwnProperty]]`, no chain.
    #[wasm_bindgen(js_namespace = Reflect, js_name = "defineProperty")]
    fn reflect_define_property(target: &JsVal, key: &JsVal, descriptor: &JsVal) -> bool;
}

/// **`napi_valuetype`'s arms, AS `JsValue`'s OWN PREDICATES DIVIDE THEM** — `codec.rs`'s local
/// `use ValueType as Kind`, re-stated for an arm that has no Node-API.
///
/// **EVERY ARM IS ONE OF THE LIBRARY'S CLASS PREDICATES AND NO ARM IS A TAG THIS FILE NUMBERS**: `Null` is
/// `is_null()`, `Undefined` `is_undefined()`, `Boolean` `as_bool()` (`typeof v === 'boolean'` — measured at
/// the glue, `wasm-bindgen-cli-support-0.2.130/src/js/mod.rs:6561`–`:6565`), `Number` `as_f64()`
/// (`typeof v === 'number'`, `:6541`–`:6545` — **and that is why a `bigint` never reaches the numeric arm:
/// the same glue answers `undefined` for it, `A76`/`JS-6`**), `String` `is_string()`, `Symbol` `is_symbol()`,
/// `BigInt` `is_bigint()` (`typeof v === 'bigint'`, `:6389`–`:6392`), `Function` `is_function()`, `Object`
/// `is_object()` (`typeof v === 'object' && v !== null`, `:6373` — arrays included, which is why
/// [`is_array`] tests the class before the shape), and `Unknown` the runtime's remainder.
#[derive(Clone, Copy, PartialEq, Eq)]
enum Kind {
    Null,
    Undefined,
    Boolean,
    Number,
    String,
    Symbol,
    BigInt,
    Function,
    Object,
    Unknown,
}

/// **THE CLASS OF A VALUE** — `codec.rs`'s `kind_of`, one predicate ladder deep, with the arms in the same
/// order the `napi`-typed match reads them. Nothing is coerced and no wrapper is minted (design §4's
/// *"No `coerce_to_object`"*).
fn kind_of(value: &JsVal) -> Kind {
    if value.is_null() {
        Kind::Null
    } else if value.is_undefined() {
        Kind::Undefined
    } else if value.as_bool().is_some() {
        Kind::Boolean
    } else if value.as_f64().is_some() {
        Kind::Number
    } else if value.is_string() {
        Kind::String
    } else if value.is_symbol() {
        Kind::Symbol
    } else if value.is_bigint() {
        Kind::BigInt
    } else if value.is_function() {
        Kind::Function
    } else if value.is_object() {
        Kind::Object
    } else {
        Kind::Unknown
    }
}

// -------------------------------------------------------------------------------------------------
// THE COPY IN — the wire's JS values, read INTO the store's own Rust types.
// -------------------------------------------------------------------------------------------------

/// **ONE MEMBER OF A JS OBJECT, READ AS AN OWN PROPERTY OR NOT AT ALL** — `codec.rs`'s `member`, decision
/// for decision: **the CLASS GATE FIRST** (`Kind::Object | Kind::Function`, the two classes the library's
/// `coerce_to_object` could have answered for), **then the OWN-KEY GATE** (`Object.hasOwn`, which is
/// `[[GetOwnProperty]]`), **and the read only where the key was found own**. An own property shadows every
/// inherited one, so the pair is an own-property read with no chain lookup anywhere on it; **a key reached
/// only through the prototype chain is ABSENT (`None`)**, which is the crossing's absent-versus-`undefined`
/// rule's input (`A76`; gate 4's `JS-5`, whose finding was that the facade's reader walked *"the PROTOTYPE
/// CHAIN for every wire member"*).
pub(crate) fn member(value: &JsVal, name: &str) -> Option<JsVal> {
    match kind_of(value) {
        // A primitive carries no member of its own; `null`/`undefined` carry none at all.
        Kind::Object | Kind::Function => {}
        _ => return None,
    }
    let key = JsVal::from_str(name);
    if !object_has_own(value, &key) {
        return None;
    }
    Some(reflect_get(value, &key))
}

/// The string a JS `string` value carries, **or the empty-string sentinel where the bytes are not one** —
/// `codec.rs`'s `arg_string`. **THE NON-`String` CLASS IS THE CALLER'S DECLARED ONE AND NOT A REPAIR**: the
/// package refuses it at its own walk before this frame (`utf8_or_none`'s clause, `C-4`'s Rust half), so the
/// sentinel stands and the arm that read it carries the class the value IS.
///
/// **AND THE ONE MEASURED DIFFERENCE FROM THE NODE ARM IS NAMED RATHER THAN LEFT TO BE FOUND**: this crate's
/// `wasm-bindgen` glue decodes a JS string through `TextEncoder`, which REPLACES a lone surrogate with
/// U+FFFD, exactly as `napi_get_value_string_utf8` does on the other arm — **so both arms lose the same code
/// unit in the same place, and neither is the path a lone surrogate crosses on**, because the package's own
/// walk refuses that class first (`§1.2` row 1's dated clause).
pub(crate) fn arg_string(value: &JsVal) -> String {
    value.as_string().unwrap_or_default()
}

/// The string read of a value the caller has ALREADY classed — `codec.rs`'s `string_of`, which delegates to
/// the same helper and adds no decision of its own.
fn string_of(value: &JsVal) -> String {
    arg_string(value)
}

/// **AN OPTIONAL POSITION, READ AS `None` WHERE THE CALL SUPPLIED NOTHING — THE TWIN OF THE NODE ARM'S
/// `Option<JsVal>` PARAMETER, AND IT IS A PORT RATHER THAN AN INVENTION.**
///
/// **THE NODE ARM'S ARM, AT ITS BYTES** (`napi-3.14.2/src/bindgen_runtime/js_values.rs:225`–`:242`): a
/// declared `Option<T>` position is converted by reading `napi_typeof` and answering `None` for
/// **`napi_undefined` OR `napi_null`**, `Some(T)` otherwise. **`facade.rs`'s `errorMessage` relies on
/// exactly that pair** — its third and fourth positions are `Option<JsVal>` and the frame's own sentences
/// say *"an omitted slot leaves the null pointer in place, so the container stays `None`"* (`:1420`–`:1422`)
/// and *"the third slot is read only where the caller supplied one"* (`:1423`).
///
/// **AND THE GLUE'S OWN `Option<JsValue>` IS NOT THAT PAIR, WHICH IS WHY THIS HELPER EXISTS RATHER THAN A
/// DECLARED PARAMETER TYPE** (`wasm-bindgen-0.2.130/src/convert/impls.rs:744`–`:749`): its `is_none` tests
/// `is_undefined()` ALONE, so `null` would arrive as `Some(null)`, be read by [`arg_string`] as the `''`
/// sentinel, and the container slot would answer `Some("")` where the `napi` frame answers `None`. **The two
/// arms would then disagree about a caller-supplied `null` at a position neither of them reads as a value**,
/// which is the one thing a twin may not do — so the fold is taken here, in Rust, on both classes of the
/// node arm's own rule.
///
/// **ITS ONE READER IS [`error_message`], WHICH OWNS BOTH OPTIONAL POSITIONS**, so the entry's parameters
/// stay plain values and no `Option` shape crosses the module seam: the fold answers a borrow of the value
/// it was handed and retains nothing (`D-156`'s copy rule — the datum that leaves this file is the
/// generator's `String`, and the values are read where they are).
fn supplied(value: &JsVal) -> Option<&JsVal> {
    if value.is_undefined() || value.is_null() {
        None
    } else {
        Some(value)
    }
}

/// **THE CLASS-FIRST BOOLEAN READ** — `codec.rs`'s `bool_of`, and `D-137` item 3's own subject: a value that
/// is not a JS `boolean` answers `false` rather than being coerced, so a caller-spelled
/// `durable_without_path: 1` still reads `false` and the package's fact is never a value a caller can spell.
pub(crate) fn bool_of(value: &JsVal) -> bool {
    kind_of(value) == Kind::Boolean && value.as_bool().unwrap_or(false)
}

/// **THE NUMBER READ, CLASS-FIRST** — `codec.rs`'s `number_of`, `A76`'s part (1) and gate 4's `JS-6`: **the
/// class is read first, on the value as it is, and a value that is not a JS `number` is never handed to the
/// numeric conversion at all** (`as_f64` answers `None` for a `bigint` at the glue's own `typeof` test, so
/// the second half is the same class decision and not a coercion).
///
/// **⟶ AND THIS READER IS THE RETIREMENT POSITION'S OWN FROM 2026-11-19** — `wasm.rs`'s `storeRelease(handle)` reads
/// its one position through it, which is **the one place this file was asked for nothing new and said so**: a
/// class-first numeric read already stood here and already answers exactly what that position is, so the entry
/// layer needed a READER made visible and not a reader authored. **THE DOMAIN TEST IS THE ENTRY'S AND NOT THIS
/// FUNCTION'S**, which is the Node frame's own division (`facade.rs`'s `storeRelease` takes its class test and its
/// finite/non-negative/integral test in the entry, and no codec function there performs either), so what moved in
/// this file is exactly one visibility token: `fn` → `pub(crate) fn`, and no byte of the body.
pub(crate) fn number_of(value: &JsVal) -> Option<f64> {
    if kind_of(value) != Kind::Number {
        return None;
    }
    value.as_f64()
}

/// **THE BIGINT READ, CLASS-FIRST** — `codec.rs`'s `bigint_of`, whose carrier is the library's own `BigInt`
/// conversion and whose failure arm answers `0`. **`wasm-bindgen` carries the same conversion for the same
/// reason**: `i64::try_from(JsValue)` reads `__wbindgen_bigint_get_as_i64` and then re-tests that no
/// truncation happened, which is `napi_get_value_bigint_int64`'s pair of facts. **The CLASS alone decides the
/// refusal on both arms** (`JsJournalLengthArg::BigInt` → `JournalLengthArg::Object` →
/// `AddressMalformed`, and `JsValue::BigInt` → `StoreValue::BigInt` → `ValueNotAdmitted`), so a value beyond
/// the carrier's range changes no answer and is never substituted for by a number (`A76`, `JS-6`).
fn bigint_of(value: &JsVal) -> i64 {
    i64::try_from(value.clone()).unwrap_or(0)
}

/// **THE ARRAY CLASS** — `codec.rs`'s `is_array`, which tests the CLASS before the shape: `Array.isArray` is
/// TRUE for a class extending `Array`, so the class gate stands first and the shape test second (`A76`,
/// `JS-2`).
fn is_array(value: &JsVal) -> bool {
    kind_of(value) == Kind::Object && value.is_array()
}

/// `length` — the array's own data property, the read `codec.rs`'s `elements` makes through the library's
/// `get_array_length`. `None` for a length that is not a finite non-negative number, which is the arm that
/// answers the same empty walk the library's failed conversion returns.
fn length_of(array: &JsVal) -> Option<usize> {
    let length = reflect_get(array, &JsVal::from_str("length")).as_f64()?;
    if !length.is_finite() || length < 0.0 {
        return None;
    }
    Some(length as usize)
}

/// The elements of a JS array, in index order — **a DENSE walk, because a hole is a decision the JS boundary
/// has already taken and carried (`crossing.md §1.4` item 2, `DD-8`)**, and `codec.rs`'s `elements` walks
/// densely too. **THE INDEX KEY IS THE INDEX'S OWN DECIMAL SPELLING**, the canonical array-index key, which
/// is the name `codec.rs`'s copy OUT gives it as well.
fn elements(array: &JsVal) -> Vec<JsVal> {
    let Some(length) = length_of(array) else {
        return Vec::new();
    };
    let mut out = Vec::with_capacity(length);
    for index in 0..length {
        out.push(reflect_get(array, &JsVal::from_f64(index as f64)));
    }
    out
}

/// **THE DEPTH CEILING, `crossing.rs`'s OWN FIGURE — `126`** (`crossing.rs:717`'s `depth > 126`,
/// `crossing.md §1.4` item 5 as `A149` items 1–2 amended it, measured there: `126` is the deepest value the
/// conversion admits, the deepest `commit_file` writes and the deepest a fresh boot reads back).
const DEPTH_CEILING: usize = 126;

/// **THE VISITED-NODE CEILING, `crossing.rs`'s OWN FIGURE — `1_000_000`**, counted the way `measure` counts
/// it: **the value's OWN MEMBERS, each once, the root not among them** (`DEF-18`'s second defect, reconciled
/// 2026-10-11: *"an `n`-member array is admitted at `n ≤ 1,000,000` and refused at `n = 1,000,001`"*).
const NODE_CEILING: usize = 1_000_000;

/// **THE COPY IN** — `codec.rs`'s `value_of`, AND THE ONE PLACE THIS FILE OWES A NEW INSTRUMENT RATHER THAN A
/// PORT (`docs/L3/wasm-realm/design.md` §4's ceiling row, verbatim: *"★ the twin must consult `126` /
/// `1_000_000` BEFORE it descends, with its own counter — a recursive walk overflows the wasm stack long
/// before 126 if the ceiling is consulted afterwards. **A new obligation, not a port**"*).
///
/// **WHAT THE NODE ARM DOES, AT ITS BYTES**: `value_of` casts the value through `serde_json::Value` and maps
/// that tree into `crossing`'s own model, and `crossing::to_store_value` then MEASURES the tree it was handed
/// and refuses a value *"whose nesting depth exceeds"* `126` *"or whose visited-node count exceeds
/// `1,000,000`"*, answering `StoreValue::Cyclic` for the WHOLE value (`crossing.rs:715`–`:730`). **The
/// measurement is over the built tree, which a `JsValue` cannot be cast into** — the cast the other arm takes
/// does not exist on this side — **so this walk builds the tree itself and consults the same two bounds
/// BEFORE each descent.**
///
/// **THE COUNTER IS `measure`'s OWN, SO THE BOUND IS THE SAME BOUND AND NOT A SECOND FIGURE**: `depth` is the
/// number of levels the walk has DESCENDED (the root is `0`, an `n`-deep chain measures `n`), and `visited`
/// is incremented once per MEMBER about to be built, the root not counted. **A value this frame admits is
/// therefore a value `to_store_value` admits**, and a value it refuses is answered with the row the core's own
/// guard answers — `JsValue::Cyclic`, the whole value, which the store refuses `ValueNotAdmitted` at the
/// failing target's address, exactly as the `napi` arm's tree does one frame later (`DD-40`: the refusal is
/// reached the STORE's way and no code is minted here).
///
/// **THE CLASSES THIS WALK COVERS ARE `crossing.rs`'s OWN `JsValue` ROWS, ONE ARM EACH** — `Str` · `Bool` ·
/// `Num` · `Object` · `Array` · `SparseArray` · `Null` · `Undefined` · `Function` · `Symbol` · `BigInt` ·
/// `NonFinite` · `Cyclic` · `NonPlainCollection` — so **the domain is not narrowed**: every class the other
/// arm can carry is carried here as its own row. **AND WHERE THE OTHER ARM'S `serde-json` CAST CANNOT CARRY A
/// CLASS AT ALL, THE DIFFERENCE IS IN THE ROW AND NOT IN THE ANSWER**: `to_store_value`'s `convert` maps
/// `SparseArray` to `StoreValue::NonPlainCollection` (`crossing.rs:765`) and every other outside row to its
/// own `StoreValue`, and `src/store.rs:2647`'s `is_admitted()` refuses all of them with ONE status and ONE
/// message — `ValueNotAdmitted` at the failing target's address (`src/error.rs:475`), whose subject is the
/// ADDRESS and never the class. **So a class this arm names and the other collapses answers the same two bytes
/// to the caller.**
///
/// **THE CYCLE ROW IS REACHED BY THE SAME INSTRUMENT AND NEEDS NO ANCESTOR STACK**: a value that contains
/// itself descends until the depth ceiling refuses it, and the row the ceiling answers — `Cyclic` — IS row
/// 12's own row (`crossing.md §1.2`). The ancestor stack is the JS walk's instrument (`carrier.mjs`), taken
/// there over the caller's own objects; here the bound is the instrument and the answer is identical.
pub(crate) fn value_of(value: &JsVal) -> JsValue {
    let mut visited = 0usize;
    match node_of(value, 0, &mut visited) {
        Some(tree) => tree,
        // The ceiling's own answer, the whole value: `crossing.rs`'s guard, answered one frame early.
        None => JsValue::Cyclic,
    }
}

/// One node of the walk [`value_of`] performs, or `None` where the ceiling was reached. **THE CEILING IS
/// CONSULTED AT THE TOP OF EVERY NODE, BEFORE ANY MEMBER IS READ OR ANY CHILD IS BUILT** — that is the
/// obligation `design.md` §4 states, and it is what keeps the recursion bounded at `127` frames.
fn node_of(value: &JsVal, depth: usize, visited: &mut usize) -> Option<JsValue> {
    if depth > DEPTH_CEILING || *visited > NODE_CEILING {
        return None;
    }
    match kind_of(value) {
        Kind::Null => Some(JsValue::Null),
        Kind::Undefined => Some(JsValue::Undefined),
        Kind::Boolean => Some(JsValue::Bool(bool_of(value))),
        // The numeric arm reads the class first (`A76`, `JS-6`), and the two non-finite classes the wire
        // model carries are its own rows rather than a substitution (`crossing.rs`'s `NonFinite(f64)`).
        Kind::Number => {
            let number = number_of(value).unwrap_or(f64::NAN);
            if number.is_finite() {
                Some(JsValue::Num(number))
            } else {
                Some(JsValue::NonFinite(number))
            }
        }
        Kind::BigInt => Some(JsValue::BigInt(bigint_of(value))),
        Kind::String => Some(JsValue::Str(string_of(value))),
        Kind::Symbol => Some(JsValue::Symbol),
        Kind::Function => Some(JsValue::Function),
        Kind::Object if is_array(value) => {
            // **THE HOLE IS ROW 12's CARRIER AND IT IS DECIDED BY `Object.hasOwn`, NOT BY `in`**
            // (`contract.md §2`'s clause on `F-RA-11`, item (1): *"a hole is an index below `length` with no
            // OWN property"*; `in` is `[[HasProperty]]` and walks the chain, which is the defect that clause
            // measured). **AND IT REFUSES THE WHOLE VALUE, AS `DD-8` DECLARES** — the same whole-value
            // refusal `to_store_value`'s `SparseArray => StoreValue::NonPlainCollection` carries.
            let length = length_of(value).unwrap_or(0);
            for index in 0..length {
                if !object_has_own(value, &JsVal::from_f64(index as f64)) {
                    return Some(JsValue::SparseArray);
                }
            }
            let mut items = Vec::with_capacity(length);
            for element in elements(value) {
                *visited += 1;
                if depth + 1 > DEPTH_CEILING || *visited > NODE_CEILING {
                    return None;
                }
                items.push(node_of(&element, depth + 1, visited)?);
            }
            Some(JsValue::Array(items))
        }
        Kind::Object => {
            // **THE MEMBER CENSUS IS `Object.keys` — THE OWN ENUMERABLE STRING KEYS, WHICH IS THE SET THE
            // CROSSING TAKES** (`§1.4` item 4 (b)), and each member is then read by `[[Get]]` on that same
            // object, which is what the `serde` cast the other arm takes reads. **The census IS the gate**:
            // a key it did not offer is not read, and an own `Symbol` key is outside it (`JsKey::Symbol` is
            // refused by the JS walk, `§1.4` items 1 and 4 (g), so it is unproduced here exactly as it is
            // there).
            let mut members = Vec::new();
            for name in own_keys(value) {
                *visited += 1;
                if depth + 1 > DEPTH_CEILING || *visited > NODE_CEILING {
                    return None;
                }
                let member_value = reflect_get(value, &JsVal::from_str(&name));
                members.push((
                    JsKey::Key(name),
                    node_of(&member_value, depth + 1, visited)?,
                ));
            }
            // **THE PLAIN OBJECT OF THE CROSSING'S OWN MODEL, AND THE THREE FACTS BESIDE IT ARE THE
            // BOUNDARY'S**: `codec.rs`'s `json_to_js_value` builds every object through `JsObject::plain`,
            // so `proto` is `Plain`, `has_accessor` is `false` and `proxied` is `false` on that arm, because
            // *"the package has already classified the value, so this frame reads data and never a tag"*
            // (`A148` Q2/Q4; `contract.md §3`). **IT IS THE SAME THREE ANSWERS HERE** — the class decisions
            // (a `Proxy`, an own accessor, a class prototype, a `Symbol` key) are the JS boundary's and are
            // refused there (`crossing.md §1.4` items 1–4), and this frame takes none of them on either arm.
            Some(JsValue::Object(JsObject::plain(members)))
        }
        // The runtime's remainder: a class outside the taxonomy, carried as its own outside row. Both arms
        // reach it the same way — as nothing at all — and the store's answer is `ValueNotAdmitted`.
        Kind::Unknown => Some(JsValue::NonPlainCollection),
    }
}

/// The own ENUMERABLE STRING keys of a value, in the runtime's own order — `Object.keys`, read by index
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`: the CALL is lawful and the result's consumption is
/// by index, so a forged iterator decides nothing here).
fn own_keys(value: &JsVal) -> Vec<String> {
    let keys = object_keys(value);
    let Some(length) = length_of(&keys) else {
        return Vec::new();
    };
    let mut out = Vec::with_capacity(length);
    for index in 0..length {
        if let Some(name) = reflect_get(&keys, &JsVal::from_f64(index as f64)).as_string() {
            out.push(name);
        }
    }
    out
}

/// `crossing.md §1.3`'s `Segment`: a JS `string` or a non-negative integer `number` is admitted, and every
/// outside class is carried as its own variant — the package mints no code (`DD-1`). `codec.rs`'s `segment`,
/// arm for arm, **including the `{bad: …}` marker reads and the `bool` row that is not a marker the mapping
/// layer writes** (a boolean segment crosses as the boolean ITSELF).
fn segment(value: &JsVal) -> JsSegment {
    match kind_of(value) {
        Kind::String => JsSegment::Key(string_of(value)),
        // The class was just read as `number`, so the read below cannot fail; where it somehow did, the
        // value is carried as the outside class `Object` rather than substituted by `0` (`A76`).
        Kind::Number => match number_of(value) {
            Some(n) => {
                if n.is_nan() || n.is_infinite() {
                    JsSegment::Fractional(n)
                } else if n >= 0.0 && n.fract() == 0.0 {
                    JsSegment::Index(n as u64)
                } else if n.fract() == 0.0 {
                    JsSegment::Negative(n as i64)
                } else {
                    JsSegment::Fractional(n)
                }
            }
            None => JsSegment::Object,
        },
        Kind::Boolean => JsSegment::Bool(bool_of(value)),
        Kind::Function => JsSegment::Function,
        _ => match member(value, "bad")
            .map(|bad| string_of(&bad))
            .unwrap_or_default()
            .as_str()
        {
            "null" => JsSegment::Null,
            "undefined" => JsSegment::Undefined,
            "bool" => JsSegment::Bool(false),
            "array" => JsSegment::Array,
            "function" => JsSegment::Function,
            "object" => JsSegment::Object,
            _ => JsSegment::Object,
        },
    }
}

/// `crossing.md §1.3`'s `AddressArg` table, rows 1–14 — `codec.rs`'s `address_of`, tag for tag.
pub(crate) fn address_of(address: &JsVal) -> JsAddressArg {
    let tag = match member(address, "k") {
        Some(tag) => string_of(&tag),
        None => return JsAddressArg::Absent,
    };
    match tag.as_str() {
        "L" | "R" => {
            let segments: Vec<JsSegment> = member(address, "s")
                .map(|list| elements(&list))
                .unwrap_or_default()
                .iter()
                .map(segment)
                .collect();
            if tag == "L" {
                JsAddressArg::List(segments)
            } else {
                // **Row 13: A CROSS-REALM ARRAY IS AN `Array` — ACCEPTED** (`DD-7`'s structural test).
                JsAddressArg::CrossRealmList(segments)
            }
        }
        "N" => JsAddressArg::Null,
        "U" => JsAddressArg::Undefined,
        "S" => JsAddressArg::Sparse,
        "X" => JsAddressArg::Proxy,
        "C" => JsAddressArg::ClassArrayLike,
        "A" => JsAddressArg::Absent,
        _ => {
            let inner = member(address, "o").map(|inner| segment(&inner)).unwrap_or(JsSegment::Object);
            JsAddressArg::NonArray(match inner {
                JsSegment::Key(text) => JsNonArray::Str(text),
                JsSegment::Index(index) => JsNonArray::Number(index as f64),
                JsSegment::Negative(index) => JsNonArray::Number(index as f64),
                JsSegment::Fractional(fraction) => JsNonArray::Number(fraction),
                JsSegment::Bool(flag) => JsNonArray::Bool(flag),
                JsSegment::Function => JsNonArray::Function,
                _ => JsNonArray::Object,
            })
        }
    }
}

/// `crossing.md §1.3`'s `TierSetItem` table, `4` rows — `codec.rs`'s `tier_set_item`.
fn tier_set_item(item: &JsVal) -> JsTierSetItem {
    match kind_of(item) {
        Kind::String => JsTierSetItem::Token(string_of(item)),
        Kind::Number => match number_of(item) {
            Some(n) => JsTierSetItem::Number(n),
            None => JsTierSetItem::Object, // the class was already read as `number` (`A76`)
        },
        Kind::Boolean => JsTierSetItem::Bool(bool_of(item)),
        Kind::Function => JsTierSetItem::Function,
        _ => match member(item, "bad")
            .map(|bad| string_of(&bad))
            .unwrap_or_default()
            .as_str()
        {
            "null" => JsTierSetItem::Null,
            "undefined" => JsTierSetItem::Undefined,
            "function" => JsTierSetItem::Function,
            _ => JsTierSetItem::Object,
        },
    }
}

/// `crossing.md §1.3`'s `TierArg` table, `7` rows — `codec.rs`'s `tier_of`. **The JS boundary reads the
/// call's own ARITY and folds a supplied `undefined` to the ABSENT row** (`§1.3`'s absent-versus-`undefined`
/// rule, rule 1), so this reader reads only the carrier it is handed.
pub(crate) fn tier_of(tier: &JsVal) -> JsTierArg {
    let tag = match member(tier, "k") {
        Some(tag) => string_of(&tag),
        None => return JsTierArg::Absent,
    };
    match tag.as_str() {
        "A" => JsTierArg::Absent,
        "N" => JsTierArg::Null,
        "U" => JsTierArg::Undefined,
        "T" => JsTierArg::Token(
            member(tier, "v").map(|token| string_of(&token)).unwrap_or_default(),
        ),
        "S" => JsTierArg::Set(
            member(tier, "i")
                .map(|list| elements(&list))
                .unwrap_or_default()
                .iter()
                .map(tier_set_item)
                .collect(),
        ),
        "B" => JsTierArg::Bool(
            member(tier, "v").map(|flag| bool_of(&flag)).unwrap_or(false),
        ),
        // The number arm, read class-first: a payload that is not a number answers `Object` — row 6's
        // `OutOfDomainTier` — rather than being substituted by `0` (`A76`).
        "D" => JsTierArg::Number(
            member(tier, "v")
                .and_then(|number| number_of(&number))
                .unwrap_or(f64::NAN),
        ),
        "F" => JsTierArg::Function,
        _ => JsTierArg::Object,
    }
}

/// `crossing.md §1.3`'s `OpIdArg` table, `6` rows — `codec.rs`'s `op_id_of`, **including the mark's floor
/// row (`{k:'F'}`) that the package never spells itself** (`crossing.rs`'s `JsOpIdArg::Floor`).
pub(crate) fn op_id_of(op_id: &JsVal) -> JsOpIdArg {
    let tag = match member(op_id, "k") {
        Some(tag) => string_of(&tag),
        None => return JsOpIdArg::Absent,
    };
    match tag.as_str() {
        "s" => JsOpIdArg::Str(
            member(op_id, "v").map(|id| string_of(&id)).unwrap_or_default(),
        ),
        "N" => JsOpIdArg::Null,
        "U" => JsOpIdArg::Undefined,
        // **THE NUMBER ROW, READ CLASS-FIRST (`A76`, `JS-1`/`JS-6`)**: the mapping layer carries ONLY a real
        // JS `number` on this tag, and a payload that is not a number is carried as the store's own
        // non-string spelling, which is the row that mints no code.
        "D" => match member(op_id, "v").and_then(|number| number_of(&number)) {
            Some(n) => JsOpIdArg::Number(n),
            None => JsOpIdArg::Number(f64::NAN),
        },
        "F" => JsOpIdArg::Floor,
        _ => JsOpIdArg::Absent,
    }
}

/// **THE MARK, WRITTEN AS THE CARRIER THE RESTORE READS BACK — `codec.rs`'s `to_js_mark`, row for row,
/// and its SEAT is `codec.rs`'s too: immediately after the reader that reads it back.**
///
/// **ITS ONE CALLER IS `journalMark` AND ITS ONE READER IS `restoreMark`**: `Some(id)` is `OpIdArg`'s string
/// row (`{k:'s', v:id}`), and `None` — the journal holds no entry, the state the store was born with — is
/// the FLOOR row (`{k:'F'}`, [`op_id_of`]'s own `"F"` arm). **THE FLOOR IS A POSITION AND NOT AN OP ID**,
/// which is why it is a row of its own: no op id can name a state BEFORE the journal's first entry, and the
/// package must not have to spell that fact itself. **The carrier is FRESH on every call** (`D-156`'s copy
/// rule): `object` defines both members on a new object, and the id is copied out of the store's `String`.
pub(crate) fn to_js_mark(mark: Option<&str>) -> JsVal {
    match mark {
        Some(id) => object(vec![("k", string_value("s")), ("v", string_value(id))]),
        None => object(vec![("k", string_value("F"))]),
    }
}

/// `crossing.md §1.3`'s `ListenerHandle` row 2 and `JsHandleArg` — `codec.rs`'s `handle_arg_of`, tag for tag:
/// `"O"` is the opaque row `register`/`listen`/`unlisten`/`removeListener` judge their handle in, `"B"` the
/// caller's bare string, `"A"` the absent position, and **every other spelling — including a value carrying
/// no `k` at all — is `NonOpaque` rather than an absence**, which is the row the store's own site refuses
/// with `AddressMalformed` (`surface.md §2.5` item 5 (a)–(b)).
///
/// **NOTHING IS RETAINED**: the handle's text is copied into the core's own `JsHandle` as a `String`
/// (`JsHandle::from_handle`, `crossing.rs:840`), so the value this reader was handed is not held.
pub(crate) fn handle_arg_of(handle: &JsVal) -> JsHandleArg {
    let tag = match member(handle, "k") {
        Some(tag) => string_of(&tag),
        None => return JsHandleArg::NonOpaque,
    };
    match tag.as_str() {
        "O" => JsHandleArg::Opaque(JsHandle::from_handle(
            &member(handle, "v")
                .map(|value| string_of(&value))
                .unwrap_or_default(),
        )),
        "B" => JsHandleArg::Bare(
            member(handle, "v")
                .map(|value| string_of(&value))
                .unwrap_or_default(),
        ),
        "A" => JsHandleArg::Absent,
        _ => JsHandleArg::NonOpaque,
    }
}

/// **THE SET POSITION — `listen`'s SECOND argument, an ARRAY OF ADDRESSES — `codec.rs`'s `address_set`,
/// element for element** (`contract.md §2.2` item 2; `PAR-HL-2`): each member is read through the SAME
/// [`address_of`] the other positions use, and the member count is the caller's. **A member outside the
/// store's address domain is refused by the package's own class test before this frame** (`F-2`), and a
/// shape that is not list-shaped still crosses as it stands, to be answered by the store's own
/// `AddressMalformed`. **A value the array walk reads no elements from is the empty set**, which is the
/// deleted `None` arm's answer surviving its deletion.
///
/// **ITS SEAT MOVED BY ONE BLOCK AND NOTHING ELSE DID**: `codec.rs` declares it in the accessor adapter at
/// the file's foot because there it wraps a `Codec` method, and there is no `Codec` here — the reader is a
/// free function like every other one in this file, so it stands beside the reader it wraps.
pub(crate) fn address_set(addresses: &JsVal) -> Vec<JsAddressArg> {
    let mut out = Vec::new();
    for element in elements(addresses) {
        out.push(address_of(&element));
    }
    out
}

/// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth — `codec.rs`'s
/// `config`, key for key, with `fourth_key` `None` on both arms (the fourth key crosses BESIDE the struct,
/// as `create_with_inputs`' own second argument). **Each key's ABSENCE is the member's own absence**:
/// `crossing.md §1.3`'s rule reads a `cfg` key by `in`-membership, and `None` IS that absence.
pub(crate) fn config(cfg: &JsVal) -> JsConfig {
    let file_path = member(cfg, "filePath").map(|value| match kind_of(&value) {
        Kind::String => {
            let text = string_of(&value);
            if text.is_empty() {
                JsFilePathArg::Empty
            } else {
                JsFilePathArg::Str(text)
            }
        }
        Kind::Null => JsFilePathArg::Null,
        Kind::Undefined => JsFilePathArg::Undefined,
        _ => JsFilePathArg::NonString,
    });
    let journal_length = member(cfg, "journalLength").map(|value| match kind_of(&value) {
        Kind::Number => match number_of(&value) {
            Some(n) => {
                if n.is_nan() {
                    JsJournalLengthArg::NaN
                } else if n.is_infinite() {
                    JsJournalLengthArg::Infinity
                } else if n.fract() == 0.0 && n >= 1.0 && n <= u32::MAX as f64 {
                    JsJournalLengthArg::Count(n as u32)
                } else if n == 0.0 {
                    JsJournalLengthArg::Zero
                } else if n < 0.0 {
                    JsJournalLengthArg::Negative(n as i64)
                } else if n > u32::MAX as f64 {
                    JsJournalLengthArg::TooLarge(n as u64)
                } else {
                    JsJournalLengthArg::Fractional(n)
                }
            }
            // Unreachable through the shipped encoder (the class was just read as `number`) and NOT a
            // substitution: a value whose class is not a number is carried as row 10's `Object`.
            None => JsJournalLengthArg::Object,
        },
        Kind::String => JsJournalLengthArg::NumericString(string_of(&value)),
        Kind::Boolean => JsJournalLengthArg::Bool(bool_of(&value)),
        // **`A76`/`JS-6`: A `bigint` ARRIVES AS A `bigint`** and is never handed to the number read, where
        // the failure arm would have substituted `0` for the caller's `10n`.
        Kind::BigInt => JsJournalLengthArg::BigInt(bigint_of(&value)),
        Kind::Null => JsJournalLengthArg::Null,
        Kind::Undefined => JsJournalLengthArg::Undefined,
        Kind::Function => JsJournalLengthArg::Function,
        _ => JsJournalLengthArg::Object,
    });
    let listeners = member(cfg, "listeners").map(|value| {
        if !is_array(&value) {
            return match kind_of(&value) {
                Kind::Null => JsListenersArg::Null,
                Kind::Undefined => JsListenersArg::Undefined,
                _ => JsListenersArg::NonArray,
            };
        }
        let entries = elements(&value)
            .iter()
            .map(|entry| {
                if is_array(entry) || kind_of(entry) != Kind::Object {
                    return JsListenerEntry::Other;
                }
                let (Some(address), Some(handle)) =
                    (member(entry, "address"), member(entry, "handle"))
                else {
                    return JsListenerEntry::Other;
                };
                if kind_of(&handle) != Kind::String {
                    return JsListenerEntry::Other;
                }
                let handle = string_of(&handle);
                if handle.is_empty() {
                    return JsListenerEntry::Other;
                }
                JsListenerEntry::Entry {
                    address: address_of(&address),
                    handle,
                }
            })
            .collect();
        JsListenersArg::List(entries)
    });
    JsConfig {
        file_path,
        journal_length,
        listeners,
        fourth_key: None,
    }
}

/// **`parameter-semantics.md §2.21` / `surface.md §2.1`'s `cfg` block dated 2026-10-15 — THE FOURTH DECLARED
/// KEY, `constraints`** — `codec.rs`'s `constraints_arg`. **THE CLASS DECISION IS TAKEN AT THE BOUNDARY, ON
/// THE VALUE AS IT IS, AND THE CODE AND THE MESSAGE STAY THE STORE'S** (`A76`'s part (1); `crossing.md §1.4`
/// item 9; `DD-40`).
pub(crate) fn constraints_arg(constraints: &JsVal) -> JsConstraintsArg {
    match kind_of(constraints) {
        Kind::Null => return JsConstraintsArg::Null,
        Kind::Undefined => return JsConstraintsArg::Undefined,
        _ => {}
    }
    if !is_array(constraints) {
        return JsConstraintsArg::NonArray;
    }
    JsConstraintsArg::List(
        elements(constraints)
            .iter()
            .map(constraint_entry)
            .collect(),
    )
}

/// One `constraints[]` element: the closed `{ address, id }` pair, or the element outside it with its own
/// `<SEGMENT>` spelling — `codec.rs`'s `constraint_entry`.
fn constraint_entry(entry: &JsVal) -> JsConstraintEntry {
    if member(entry, "bad").is_some() {
        let subject = member(entry, "subject")
            .map(|subject| string_of(&subject))
            .unwrap_or_default();
        return JsConstraintEntry::Invalid(subject);
    }
    let address = member(entry, "address")
        .map(|address| address_of(&address))
        .unwrap_or(JsAddressArg::Absent);
    let id = member(entry, "id").map(|id| string_of(&id)).unwrap_or_default();
    JsConstraintEntry::Pair { address, id }
}

// -------------------------------------------------------------------------------------------------
// THE GENERATOR'S OWN FRAME — `errorMessage`'s four positions, read in `facade.rs`'s order.
// -------------------------------------------------------------------------------------------------

/// **`errorMessage`'s POSITIONS AND THE GENERATOR BEHIND THEM — `facade.rs:1418`–`:1476`, read for read,
/// and THIS IS THE ONE ENTRY THAT ANSWERS NO `Result` AND THROWS NO REFUSAL** (`design.md` §3: *"`version`
/// and `errorMessage` answer no `Result` at all — a `Result` there mints a failure path the export set does
/// not declare"*; `facade.rs:1417`: *"this entry throws no refusal at all, and the arm below reaches the
/// generator and nothing else"*).
///
/// **FOUR READS AND NO FIFTH**, in the node arm's own order: the subject (the `<SEGMENT>`/`path` slot), the
/// container (read only where supplied), the arm token (matched against ONE closed literal), and the
/// `<CONTAINERSEGMENT>` derived from the container. **THE STORE IS THE ONLY AUTHOR OF THE SENTENCE**
/// (`§2.5` item 2: *"`message` is the store's own GENERATED message VERBATIM — never hand-authored by the
/// package"*): this frame mints no code, authors no text and hands the generator the two strings it read.
pub(crate) fn error_message(
    code: &str,
    subject: &JsVal,
    container: &JsVal,
    token: &JsVal,
) -> String {
    // **THE SUBJECT, THROUGH THE SENTINEL READ** — `arg_string`'s non-string class is the empty-string
    // sentinel, which is this entry's pre-existing class decision on the node arm too (`facade.rs:1404`–
    // `:1418`: the shim the annotation replaced read every position with `arg_string`, and *"the CLASS of
    // the second is this entry's own pre-existing read and not a term of the amendment"*).
    let subject = arg_string(subject);
    // **THE CONTAINER IS READ ONLY WHERE THE CALLER SUPPLIED ONE** (`facade.rs:1420`–`:1423`): an omitted
    // slot leaves the generator's own default standing, and the fold is [`supplied`]'s.
    let container = supplied(container).map(|value| arg_string(value));
    // **THE ARM TOKEN IS MATCHED AGAINST A CLOSED LITERAL** (`facade.rs:1448`–`:1458`): an unknown token
    // leaves the slot `None` exactly as an omitted one does, so no caller can author a sentence by spelling
    // a token, and the store renders its own words from the flag.
    let arm = supplied(token).and_then(|value| match arg_string(value).as_str() {
        "handle" => Some(storeroom_native::ArmToken::HandleClaim),
        _ => None,
    });
    // **AND THE `<CONTAINERSEGMENT>` IS THE CONTRACT'S OWN RULE APPLIED TO THE STRING THE CALLER SUPPLIED**
    // (`facade.rs:1434`–`:1464`): the last dot-separated segment, and `keys` where the container has none —
    // the degenerate arm the clause prints, never a claim about a container the caller did not name.
    let derived_container_segment = container.as_deref().and_then(|c| {
        c.rsplit('.')
            .next()
            .filter(|s| !s.is_empty() && !s.contains(' '))
            .map(|s| s.to_string())
    });
    storeroom_native::storeErrorMessage(
        code,
        &storeroom_native::MessageArgs {
            segment: Some(format!("'{subject}'")),
            container,
            keys: derived_container_segment.into_iter().collect(),
            path: Some(subject),
            arm,
            ..Default::default()
        },
    )
}

// -------------------------------------------------------------------------------------------------
// THE COPY OUT — the core's own records and values, written OUT as fresh JS values.
// -------------------------------------------------------------------------------------------------

/// **AN OWN DATA PROPERTY IS DEFINED, NEVER SET — `codec.rs`'s `object` AND `throw_refusal`'s OWN RULING,
/// CARRIED TO THE SECOND ARM** (`D-35`; `D-155` item 1's correction; the `F8-2` class; `ADV-12`'s measured
/// drop of an own member under a non-writable `Object.prototype` member).
///
/// **THE DESCRIPTOR IS BUILT ON A NULL-PROTOTYPE OBJECT, AND THAT IS WHAT MAKES THE ONE `[[Set]]` IN THIS
/// FILE A `[[DefineOwnProperty]]`.** `Reflect.set(D, "value", V)` on `D = Object.create(null)` runs
/// `OrdinarySetWithOwnDescriptor`: the own property is absent, so the operation asks `D` for its prototype —
/// `null` — and answers `! CreateDataProperty(D, "value", V)`. **`CreateDataProperty` IS
/// `[[DefineOwnProperty]]` with `{writable: true, enumerable: true, configurable: true}`**, which are exactly
/// `napi::Property`'s defaults and exactly the attributes `codec.rs`'s `object` gives its members — and
/// **there is no prototype to consult, so no caller's `Object.prototype` and no trap can decide any byte of
/// it.** The object the members are then DEFINED ON is the caller-visible one, through
/// `Reflect.defineProperty` — `[[DefineOwnProperty]]` directly — so **no `[[Set]]` reaches a value the caller
/// can see, on either arm.**
fn descriptor_for(value: &JsVal) -> JsVal {
    let descriptor = object_create(&JsVal::NULL);
    let _ = reflect_set(&descriptor, &JsVal::from_str("value"), value);
    let _ = reflect_set(&descriptor, &JsVal::from_str("writable"), &JsVal::TRUE);
    let _ = reflect_set(&descriptor, &JsVal::from_str("enumerable"), &JsVal::TRUE);
    let _ = reflect_set(&descriptor, &JsVal::from_str("configurable"), &JsVal::TRUE);
    descriptor
}

/// **ONE MEMBER DEFINED ON A FRESH OBJECT** — `Reflect.defineProperty`, whose `[[DefineOwnProperty]]`
/// consults no chain, with the descriptor's own attributes as `napi_define_properties` creates them.
/// **`false` where the definition did not land**, which is the arm `codec.rs`'s `object` swallows and
/// `throw_refusal` returns from.
pub(crate) fn define_member(target: &JsVal, name: &str, value: &JsVal) -> bool {
    let descriptor = descriptor_for(value);
    reflect_define_property(target, &JsVal::from_str(name), &descriptor)
}

/// **THE RUNTIME'S OWN EMPTY OBJECT** — `Object()`, whose prototype is this realm's `Object.prototype`
/// exactly as `facade.rs`'s `Object::new` gives the refusal form (`facade.rs:196`–`:201`).
pub(crate) fn empty_object() -> JsVal {
    object_new()
}

/// One object of the copy OUT's own shape — `codec.rs`'s `object`, member for member, each DEFINED.
fn object(members: Vec<(&str, JsVal)>) -> JsVal {
    let out = object_new();
    for (name, value) in members {
        let _ = define_member(&out, name, &value);
    }
    out
}

/// **A REAL JS ARRAY, ITS INDICES DEFINED AND NEVER SET — `codec.rs`'s `array`, closed there 2026-10-25 and
/// carried here from the first byte.** The Node arm's finding, at its own bytes: `napi_set_element` is a
/// `[[Set]]` that WALKS THE PROTOTYPE CHAIN, so under an own getter-only accessor at `Array.prototype[0]` the
/// write answered `false`, **the slot stayed a HOLE, and every array the codec built crossed OUT holed**.
/// **The lawful form is one definition per index on an array that is already an array**, which is what
/// `Reflect.defineProperty` performs here; `[]` carries no `length` assignment and creates no hole.
fn array(items: Vec<JsVal>) -> JsVal {
    let out = array_new();
    for (index, item) in items.iter().enumerate() {
        // **THE NAME IS THE INDEX'S OWN DECIMAL SPELLING** — the canonical array-index key, exactly the
        // `utf8` name `codec.rs`'s `array` mints for the same slot.
        let _ = define_member(&out, &index.to_string(), item);
    }
    out
}

/// One member set on an object this codec built — the record's own `triggeringAddress` — `codec.rs`'s
/// `set_member`, and it is DEFINED for the same reason.
pub(crate) fn set_member(object: &JsVal, name: &str, value: &JsVal) {
    let _ = define_member(object, name, value);
}

/// A value's own tag member beside the payload the JS side reads it by — `codec.rs`'s `tagged`.
fn tagged(tag: &str, payload: JsVal) -> JsVal {
    object(vec![("k", JsVal::from_str(tag)), ("v", payload)])
}

fn string_value(text: &str) -> JsVal {
    JsVal::from_str(text)
}

fn number_value(number: f64) -> JsVal {
    JsVal::from_f64(number)
}

fn bool_value(flag: bool) -> JsVal {
    JsVal::from(flag)
}

fn undefined_value() -> JsVal {
    JsVal::UNDEFINED
}

/// **THE COPY OUT** (`crossing.md §1.1` clause 2): a store value converted into FRESH JS-owned data, at
/// `crossing.md §1.2`'s own classes — `codec.rs`'s `to_js_value`, row for row, so the JS side holds no
/// reference into store-owned data and the markers it decodes are the same markers.
pub(crate) fn to_js_value(value: &JsValue) -> JsVal {
    match value {
        JsValue::Str(text) => string_value(text),
        JsValue::Bool(flag) => bool_value(*flag),
        // `-0` DOES NOT CROSS AS A SIGN (`contract.md §4`; `A140`).
        JsValue::Num(number) => number_value(if *number == 0.0 { 0.0 } else { *number }),
        JsValue::Object(record) => {
            // **THE BARE OBJECT, MEMBER FOR MEMBER** (`contract.md §5`): no `k`, no `m`, no `p`, no `acc`,
            // no `proxy`. A `Symbol`-keyed member refused the whole value, so it is unproduced.
            let members = record
                .members
                .iter()
                .filter_map(|(key, member)| match key {
                    JsKey::Key(name) => Some((name.as_str(), to_js_value(member))),
                    JsKey::Symbol => None,
                })
                .collect();
            object(members)
        }
        JsValue::Array(items) => array(items.iter().map(to_js_value).collect()),
        // The outside variants remain declared and unproduced on this route (`contract.md §5`).
        JsValue::Null => object(vec![("k", string_value("z"))]),
        JsValue::Undefined => undefined_value(),
        JsValue::Function => object(vec![("k", string_value("f"))]),
        JsValue::Symbol => object(vec![("k", string_value("y"))]),
        JsValue::BigInt(number) => tagged("g", string_value(&number.to_string())),
        JsValue::NonFinite(number) => tagged("F", number_value(*number)),
        JsValue::Cyclic => object(vec![("k", string_value("c"))]),
        JsValue::NonPlainCollection => object(vec![("k", string_value("P"))]),
        JsValue::SparseArray => object(vec![("k", string_value("H"))]),
    }
}

/// The segment list the JS side's own decoder reads — `codec.rs`'s `to_js_segments`, row for row.
pub(crate) fn to_js_segments(segments: &[JsSegment]) -> JsVal {
    array(
        segments
            .iter()
            .map(|segment| match segment {
                JsSegment::Key(key) => string_value(key),
                JsSegment::Index(index) => number_value(*index as f64),
                JsSegment::Negative(index) => number_value(*index as f64),
                JsSegment::Fractional(fraction) => number_value(*fraction),
                JsSegment::Null => object(vec![("bad", string_value("null"))]),
                JsSegment::Undefined => object(vec![("bad", string_value("undefined"))]),
                JsSegment::Bool(flag) => bool_value(*flag),
                JsSegment::Object => object(vec![("bad", string_value("object"))]),
                JsSegment::Array => object(vec![("bad", string_value("array"))]),
                JsSegment::Function => object(vec![("bad", string_value("function"))]),
            })
            .collect(),
    )
}

/// `DD-39`'s state half — `codec.rs`'s `to_js_base_state`.
fn to_js_base_state(state: &JsBaseState) -> JsVal {
    object(vec![
        ("present", bool_value(state.present)),
        ("value", to_js_value(&state.value)),
    ])
}

/// `PAR-JS-13`'s own **SEVEN** members — `codec.rs`'s `to_js_journal_op`.
///
/// **⟶ SEVEN, NOT EIGHT, FROM 2026-11-17** (`strata/decisions.md` · `D-189` item 2): **`compacted` left the
/// store's record, so it leaves this emitter with the key it carried, and the wasm arm and the node arm agree
/// key for key** — the two emitters are one spelling of one member list, and a key that survived on one arm
/// and not the other would be a second declared record.
fn to_js_journal_op(op: &JsJournalOp) -> JsVal {
    let tier = match &op.tier {
        Some(token) => string_value(token),
        None => undefined_value(),
    };
    object(vec![
        ("opId", string_value(&op.opId)),
        ("kind", string_value(&op.kind)),
        ("address", to_js_segments(&op.address)),
        ("tier", tier),
        ("before", to_js_base_state(&op.before)),
        ("after", to_js_base_state(&op.after)),
        ("seq", number_value(op.seq as f64)),
    ])
}

/// **THE PAIR EMITTER — `{handle, address}`** (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 2) —
/// `codec.rs`'s `to_js_trigger_pairs`. **NO PARALLEL `triggeredAddresses` ARRAY EXISTS AND NONE MAY BE
/// ADDED**: the aligned form is an i-th correspondence and it reverses `DD-37`.
fn to_js_trigger_pairs(triggered: &[JsListenerTrigger]) -> JsVal {
    let pairs = triggered
        .iter()
        .map(|pair| {
            let handle = string_value(pair.handle.handle());
            let address = to_js_segments(&pair.address);
            object(vec![("handle", handle), ("address", address)])
        })
        .collect();
    array(pairs)
}

/// `PAR-JS-13`–`PAR-JS-15`: `{op, watched, triggered}` — a fresh record on every call; `codec.rs`'s
/// `to_js_write_result`, member for member.
pub(crate) fn to_js_write_result(result: &JsWriteResult) -> JsVal {
    let watched = result
        .watched
        .iter()
        .map(|address| to_js_segments(address))
        .collect();
    object(vec![
        ("op", to_js_journal_op(&result.op)),
        ("watched", array(watched)),
        ("triggered", to_js_trigger_pairs(&result.triggered)),
    ])
}

/// **`delete`'s RECEIPT — `{address, tiers, triggered, op}`, `codec.rs`'s `to_js_delete_receipt` member for
/// member** (`§2.2`; `PAR-JS-16`: *"the receipt's `address` VERBATIM and its `tiers` canonical"*), with the
/// FOURTH member `D-43` item 3 added.
///
/// **THE ONE MEMBER WITH A SECOND CLASS IS `op`, AND IT IS THE ONE THE TWIN OWES A DECISION ON**: *"The `D-3`
/// arm that removed nothing appended no entry and names no op, and it crosses as `null`"* — the store's own
/// `Option` said so first (`codec.rs:1002`–`:1005`, through the node arm's `napi_get_null`). **`JsValue::NULL`
/// IS THAT VALUE ON THIS ARM** — the runtime's `null` and not `undefined`, which is a *supplied* value at a
/// declared position (`DD-46`) and would be read by the package as one.
///
/// **EVERY MEMBER IS FRESH** (`D-156`'s copy rule): the segments, the tiers, the pairs and the journal op are
/// all built by the emitters above on this call, and the receipt the store answered is read and dropped —
/// nothing of it reaches the caller except the data written here.
pub(crate) fn to_js_delete_receipt(receipt: &JsDeleteReceipt) -> JsVal {
    let op = match &receipt.op {
        Some(op) => to_js_journal_op(op),
        None => JsVal::NULL,
    };
    object(vec![
        ("address", to_js_segments(&receipt.address)),
        (
            "tiers",
            array(receipt.tiers.iter().map(|tier| string_value(tier)).collect()),
        ),
        ("triggered", to_js_trigger_pairs(&receipt.triggered)),
        ("op", op),
    ])
}

/// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — `codec.rs`'s `to_js_rollback_result`, member for member,
/// and the three members are the DECLARED three (`non_snake_case` at `lib.rs:63` is the wire's spelling and
/// not this crate's). **`restoredTo` is `DD-39`'s state half** — `{present, value}` with the value copied
/// out through [`to_js_value`] — so a caller reads the restored datum and holds no reference into the store.
pub(crate) fn to_js_rollback_result(result: &JsRollbackResult) -> JsVal {
    object(vec![
        ("opId", string_value(&result.opId)),
        (
            "undoneOps",
            array(result.undoneOps.iter().map(|id| string_value(id)).collect()),
        ),
        ("restoredTo", to_js_base_state(&result.restoredTo)),
    ])
}
