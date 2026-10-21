//! `facade` — **THE NODE-API EXPORT FACADE** of `package.md §4.4`'s `V1` and `§4.5` item 6.
//!
//! **IT IS THE `cdylib` HALF: the internal artefact `package.md §1.2` reaches through the package's own
//! `createRequire`-style step — ONE `.node` load per instance construction, at exactly one path, and the
//! path is a file the `exports` map does not expose** (`§1.2` items 1–2).
//!
//! **ITS METHODS ARE THIN** (`§4.5` item 6): each takes the JS side's own argument, converts it into the
//! core's model (`crate::crossing`), calls the core and translates the core's answer back. **The facade
//! declares NO JS-shaped type of its own** — every `Js*` type is the core's.
//!
// **⟶ THE FAILURE FORM IS THE CONTRACT'S SINGLE ONE — AND ITS MEMBER COUNT IS THREE, CORRECTED 2026-10-20
// (`U-STOREROOM-ADDON-ADOPTION`, `command-sites-and-residue.md §5`'s residue `S-4`; `failure-form.md §1`).**
// **TWO HALVES OF THE SENTENCE THAT STOOD HERE WERE WRONG, AND BOTH ARE CORRECTED AT THEIR OWN BYTES:**
// the header declared the form as carrying exactly **`{status, message}`** — **the form carries THREE,
// `{status, message, log}`, and the third is built at the JS BOUNDARY and never here** (`failure-form.md
// §1`'s adjudication (4), `§4`: *"the `log` member is attached at the JS boundary and not in Rust … a
// boundary that produced it in Rust would be a second home for it"*); and it forbade a **`stack`** —
// **`NO CLAUSE FORBIDS A `stack``*: it *"appeared in the code's own header and in no clause"*, it is *"an
// artefact of a plain object having none, not a rule"*, and **NOTHING ASSERTS ITS ABSENCE AS A CONTRACT
// PROPERTY** (`failure-form.md §1`). **SO THE `stack` SENTENCE IS REMOVED AND NOT REPLACED BY ITS INVERSE**
// — the prohibition's negation is no more law than the prohibition was. **THIS LAYER THROWS THE ONE FORM,
// OUT OF AN OBJECT AND NEVER OUT OF AN `Error`** (`failure-form.md §3`, `P-ADA-3`).
//!
//! **WHY THE WIRE IS A STRING RATHER THAN A NESTED NODE-API VALUE, STATED SO IT IS NOT READ AS A SECOND
//! DESIGN:** `crossing.md §1.4` items 1–4 decide on an own `Symbol`-keyed property, on a hole, on an own
//! accessor and on a `Proxy`, and **Node-API's stable surface carries no `isProxy` predicate and no
//! hole/accessor enumeration that a facade could trust** — so the four class decisions are taken at the JS
//! boundary, which is where the crossing's own `DD-34` puts proxy detection, and the facade receives the
//! DECIDED tree. **The wire below is that decided tree, spelled in the core's own vocabulary and nothing
//! else**; the conversion it performs is the core's, member for member.
//!
//! **⟶ AND THE FACADE INVOKES NO LISTENER — THE MAPPING LAYER IS THE INVOKER (`F-13`; `A75`, `A77`).**
//! **THE SHIPPED SENTENCE HERE NAMED THIS LAYER AS THE INVOKER OVER A CORE REGISTRY, AND THE SHIPPED CODE
//! NEVER CARRIED IT**: `Instance::listener_for` had no caller anywhere (`V-5`), the core's registry slots
//! held placeholder closures nothing could invoke, and the live invocation is `index.mjs`'s `deliver`.
//! `A75` already puts the route `JS → facade → core → store`, and `A77` states the model in full — *"the
//! store passes an ID back to the client when a listener is triggered, and the JS side matches that ID to
//! the function the caller registered it with"* — so **this layer converts values and verbs and NOTHING
//! else** (its methods are thin, `§4.5` item 6): the record it returns carries the triggered handles and the
//! triggering address, and the package invokes SYNCHRONOUSLY AFTER the verb's own call has returned (`§2.7`
//! item 2, `DD-22`). **A throwing body is NOT caught, NOT retried and NOT reported** (`DD-23`): its
//! exception propagates out of the package's own loop, which is where the call is made.

use std::cell::RefCell;

use ::napi::bindgen_prelude::{Object, ToNapiValue, ValueType};
/// **THE RECEIVER EXTRACTOR — `receiver-and-refusal.md §1`'s *"the Node-API `this` receiver"*, AT ITS ONE
/// USE.** `This<T>` is the library's own binding for the callback's `this`
/// (`napi-3.14.2/src/bindgen_runtime/js_values/class.rs:16`), and `napi-derive` injects it from `cb.this()`
/// for a free `#[napi]` function exactly as it does for a class method
/// (`napi-derive-backend-6.1.5/src/codegen/fn.rs:497-575`). **A DETACHED CALL HAS NO `this` AND FAILS THE
/// CONVERSION BEFORE ANY ENTRY BODY RUNS**, which is what makes `§7`'s one declared cost real rather than
/// nominal.
use ::napi::bindgen_prelude::This;

/// **THE RECEIVER'S OWN CHANNEL KEY — `Symbol.for`'s description, shared with `index.mjs`'s `STORE_INDEX`.**
/// It is a `Symbol.for` key rather than an identity symbol precisely so that BOTH SIDES can name it without
/// sharing an object: the package writes it and this layer reads it, and neither holds a reference to the
/// other (`receiver-and-refusal.md §1`).
const STORE_INDEX_KEY: &str = "provident-storeroom.storeIndex";
use ::napi::sys;
use ::napi::bindgen_prelude::BigInt as JsBigInt;
use ::napi::bindgen_prelude::{JsObjectValue as _, JsValue as _};
use ::napi::{Env, Unknown as JsUnknown};
// **THE ENTRY LAYER'S OWN ANNOTATION — `binding-crate-and-abi.md §1`'s THIRD DEPENDENCY, AT ITS ONE USE.**
// `#[napi]` is the adoption's whole subject: it builds the `extern "C"` trampoline, unpacks the caller's
// argv into the Rust types below, converts the answer back and REGISTERS the name in the module's export
// table. **ITS EXPANSION IS CONFINED TO THE FIVE ENTRY FUNCTIONS THIS FILE DECLARES** and it never reaches
// `crate::crossing` (`§3`): the annotation is on the boundary's own frames and on no core type.
use ::napi_derive::napi;

use crate::crossing::{
    self, JsAddressArg, JsBaseState, JsConfig, JsConstraintEntry, JsConstraintsArg, JsDeleteReceipt,
    JsFilePathArg, JsHandle, JsHandleArg, JsJournalLengthArg, JsJournalOp, JsKey, JsListenerEntry,
    JsListenerTrigger, JsListenersArg, JsNonArray, JsObject, JsOpIdArg, JsProto, JsRollbackResult,
    JsSegment, JsTierArg, JsTierSetItem, JsValue, JsWriteResult, Refusal,
};

/// The address's own segments, where the argument IS the declared list shape — the triggering address a
/// listener is handed (`PAR-JS-12`). Any outside shape carries no triggering address and invokes nothing.
fn segments_of(address: &JsAddressArg) -> Vec<JsSegment> {
    match address {
        JsAddressArg::List(segments) | JsAddressArg::CrossRealmList(segments) => segments.clone(),
        _ => Vec::new(),
    }
}

// =================================================================================================
// THE NODE-API BINDING LIBRARY — `binding-crate-and-abi.md §2`'s DELETION TABLE, LANDED.
//
// **WHAT GOES, AND IT IS GONE: the `extern "C"` block that declared the runtime's `23` symbols at their own
// C signatures, the four type aliases beside it (`*mut c_void` × 3, `i32`), the `unsafe fn`s and `unsafe`
// blocks that called that ABI directly, the hand-built module-registration symbol — the export table taking
// `exports` and building one JS function per name — and the five `export(env, exports, name, fn)`
// calls that built it. THE LIBRARY'S CHECKED BINDINGS TAKE THEIR PLACE** (`contract.md §2` item 2, item 3).
//
// **WHAT STAYS UNTOUCHED: `bindings/js/src/crossing.rs`, and THAT IS A CHECKABLE CLAUSE** — `P-ADA-2` drives
// it: zero `napi` type, zero `#[napi]` attribute, zero `unsafe`, at any depth (`binding-crate-and-abi.md
// §3`). **`#[napi]` ANNOTATES ENTRY FUNCTIONS AND IT MUST NOT REACH THE CORE.**
//
// **AND THE FIVE ENTRY FUNCTIONS REMAIN FIVE, UNDER THEIR OWN NAMES, WITH THEIR ARITIES UNMOVED** —
// `version` · `errorMessage` · `storeCreate` · `call` · `register` (`contract.md §2` item 3): this unit
// does not split them, and the split into per-verb entries is the surface unit's. **SO THE EXPORT TABLE IS
// BUILT BY THE LIBRARY'S OWN REGISTRATION HOOK AND NOT BY A HAND-BUILT ONE** — `registration()` at the foot
// of this file is the whole of it, and it is the library's `register_module_export`, run inside ITS
// the library's own registration symbol. **THE ARTEFACT THEREFORE CARRIES THE LIBRARY'S OWN REGISTRATION SYMBOL, WHICH
// IS THE `P-ADA-6` SUPERSET'S SUBJECT** (`binding-crate-and-abi.md §4`).
// =================================================================================================

/// **THE RUNNING ENVIRONMENT'S TYPED VALUES, CARRIED ACROSS THE LIBRARY'S OWN CONVERSION.** A JS value is
/// the library's `JsUnknown` (an untyped handle) and the codec decides its class from the library's own
/// `ValueType` — which is the library's `typed value handles the boundary names` (`PAR-ADA-6`), not a raw
/// pointer this file reinterprets.
type JsVal<'e> = JsUnknown<'e>;

/// **THE ENTRY FUNCTIONS' RETURN**, which is the reason the library's ergonomic path is NOT taken: a
/// `Result` arm carrying a library error maps to a real JS `Error`, and `failure-form.md §3` obliges *"every
/// refusal site on the boundary … to throw the value, not the error"*. **So the entries answer `Ok` on both
/// arms** — the refusal having been thrown as the value by [`throw_refusal`] — and **no `Err` ever leaves
/// one of them**: `napi::Error` reaches no refusal path (`P-ADA-3`, `F-4`).
/// **THE ENTRY'S ANSWER, AS A RAW-BORROW-INDEPENDENT VALUE.** `Unknown<'env>` borrows the environment it
/// was made in, and an entry OWNS the `Env` it was handed — so the entry's answer is the value with the
/// borrow erased, which is exactly what a Node-API callback returns (a `napi_value` the runtime owns for
/// the duration of the call). **The erasure is the callback boundary's own and not a lifetime widened
/// inside the crate**: nothing that holds it outlives the call that produced it.
type NapiRet<'e> = Result<JsVal<'e>, ::napi::Error>;


/// `napi_valuetype`'s arms, as the runtime numbers them.
/// The library's own class decision — `PAR-ADA-9`'s `generic value`, whose class is decided at the boundary
/// from the library's `ValueType` and never from a raw tag this file numbers itself.
use ValueType as Kind;

/// The string a JS `string` value carries, **or the empty-string sentinel where the bytes are not one**
/// (see [`utf8_or_none`]: the repair is gone and the refusal is the caller's declared class).
fn arg_string(_env: &Env, value: &JsVal<'_>) -> String {
    // **THE NON-`String` CLASS IS THE CALLER'S DECLARED ONE AND NOT A REPAIR** — the library refuses it
    // before it reads (`utf8_or_none`'s clause above), so the empty-string sentinel stands and the arm that
    // read it carries the class the value IS.
    unsafe { value.cast::<String>() }.unwrap_or_default()
}

fn make_string(env: &Env, text: &str) -> JsVal<'static> {
    make_value(env, text.to_string())
}

/// **A RUST VALUE AS A JS VALUE, BY THE LIBRARY'S OWN CONVERSION** (`PAR-ADA-6`, `PAR-ADA-9`): the generic
/// is fixed by the caller's own type, so no member of this file names a raw pointer and no conversion is
/// re-spelled by hand. **The library validates and converts; this frame only erases the type** so the wire's
/// own decoded tree can carry it as an untyped value.
fn make_value<T: ToNapiValue>(env: &Env, value: T) -> JsVal<'static> {
    let raw = unsafe { ToNapiValue::to_napi_value(env.raw(), value) }
        .unwrap_or(std::ptr::null_mut());
    unsafe { JsVal::from_raw_unchecked(env.raw(), raw) }
}

/// The runtime's own `undefined` — **never a null pointer, which is what an ABSENT position is** — reached
/// through the library's own `napi_get_undefined` binding rather than through a hand-declared symbol.
fn make_undefined(env: &Env) -> JsVal<'static> {
    let mut raw: sys::napi_value = std::ptr::null_mut();
    unsafe {
        sys::napi_get_undefined(env.raw(), &mut raw);
    }
    unsafe { JsVal::from_raw_unchecked(env.raw(), raw) }
}

/// **THE FAILURE FORM, THROWN — AND IT IS THROWN AS THE VALUE AND NEVER AS THE LIBRARY'S ERROR.**
/// `failure-form.md §1`: a refusal crossing this boundary is *"a THROWN PLAIN OBJECT carrying exactly three
/// members — `status`, `message`, `log` — and nothing else"*, and *"IT IS NEVER AN `Error`. Not an `Error`
/// subclass, not a value with an `Error` prototype. It carries no `code`, no `cause`, and no `name`."*
///
/// **THE THIRD MEMBER IS NOT BUILT HERE** (`failure-form.md §1`'s adjudication (4), `§4`): *"the `log`
/// member is attached at the JS boundary and not in Rust"*, and *"a boundary that produced it in Rust would
/// be a second home for it"* — so the members THIS layer owes are `status` and `message` alone, and the
/// boundary attaches the third.
///
/// **⟶ AND THE OBLIGATION THAT KEEPS THE FORM IS THE WHOLE OF THIS FUNCTION** (`failure-form.md §3`,
/// `P-ADA-3`, and the failure list's `F-4`): *"The adopted library's ergonomic error handling throws a real
/// `Error`. A `Result` arm carrying a library error maps to one. EVERY REFUSAL SITE ON THE BOUNDARY IS
/// THEREFORE OBLIGED TO THROW THE VALUE, NOT THE ERROR — BY THE LIBRARY'S RAW-VALUE ESCAPE HATCH, NOT BY
/// ITS TYPED ERROR."* **The escape hatch is `Env::throw`, which takes `T: ToNapiValue` and reaches
/// `napi_throw` with the VALUE it is handed** — as against `throw_error`/`throw_type_error`, whose arm is
/// the `Error` this form forbids. **`napi::Error` IS USED ON NO REFUSAL PATH**: both members are read
/// off the core's own `Refusal` and the object is built at this frame.
///
/// **THE OBJECT IS A JS PLAIN OBJECT AND NOT A RUST STRUCT CROSSING**: `Object::new` + `Object::set` write
/// them, so the value the runtime throws has `Object.prototype` for its prototype and exactly
/// the keys this function set.
fn throw_refusal(env: &Env, refusal: &Refusal) {
    let mut object = match Object::new(env) {
        Ok(object) => object,
        // A frame that cannot build the form is a frame whose environment is already failing: there is no
        // second shape to fall back to, so the value that IS there crosses as itself.
        Err(_) => return,
    };
    if object.set("status", refusal.status.clone()).is_err() {
        return;
    }
    if object.set("message", refusal.message.clone()).is_err() {
        return;
    }
    // **THE RAW-VALUE ESCAPE HATCH** (`PAR-ADA-4`): the declared value is thrown and no `Error` is minted.
    let _ = env.throw(object);
}

// **⟶ `throw_type_error` STOOD HERE, AND `A76`'S PASS REMOVED IT.** The helper built a JS `TypeError`
// carrying NO `status` and NO `message` for the registration site's refusal — **the form the bounded
// correction pass declared and the form the `A76` pass replaced** (`surface.md §2.5` item 5 (g), verbatim:
// *"the registration site's refusal IS a rejection under `A76` and travels in THIS section's single form …
// and a `status` of `TypeError`, reached at the addon's own boundary, is that FINDING and not a declared
// form, because the store's closed set holds no such member"*). **THE SITE NOW ANSWERS THE ONE FORM, THROUGH
// `throw_refusal`, WITH THE CORE'S OWN `AddressMalformed` AND THE STORE'S GENERATOR'S OWN STRING** — so no
// host `Error` of any kind escapes this frame, and `napi_create_type_error` is no longer declared or used
// (`§2.5` item 5 (e): *"a rejection is NEVER A RAW HOST ERROR"*).

// =================================================================================================
// THE WIRE — THE DECIDED TREE, IN THE CORE'S OWN VOCABULARY, AS PLAIN NODE-API VALUES.
//
// **THE PROTOCOL IS STRUCTURED AND NOT TEXTUAL, STATED SO NO SECOND DESIGN ARISES FROM THE CHOICE:**
// every crossing argument is a plain JS value whose SHAPE the core's own model already declares, and the
// facade reads it member for member. **The four class decisions of `crossing.md §1.4` items 1–4 are taken
// at the JS boundary and are CARRIED HERE AS DATA** — the own `Symbol`-keyed property, the hole, the own
// accessor and the `Proxy` — because Node-API's stable surface carries no `isProxy` predicate and no
// hole/accessor enumeration a facade could trust, which is where `DD-34` puts proxy detection.
//
// **⟶ AND THE READ OF EVERY MEMBER BELOW IS AN OWN-PROPERTY READ (`A76`, `JS-5`): `Codec::member` gates on
// `napi_has_own_property`, so no member of any wire object is ever reached through the prototype chain.**
// **GATE 4's `JS-18` IS CLOSED HERE IN ITS DOCUMENTATION HALF: this block now spells the wire the mapping
// layer ACTUALLY PRODUCES, member for member** (`JS-18`: *"the wire protocol documented at `facade.rs` is
// NOT the wire `index.mjs` produces"*).
//
//   value    {k:'s', v:<string>}            a JS string (`index.mjs`: the string itself)
//            {k:'b', v:<boolean>}           a JS boolean
//            {k:'n', v:<number>}            a JS number, `-0` included — **and NEVER a `bigint`**: the
//            class test precedes the numeric arm (`JS-6`), and a payload that is not a number is read as
//            the class it IS (`classed_value`) rather than substituted
//            {k:'o', m:[[key, value]…], p:'plain'|'null'|'foreign'|'class',
//                     acc:<boolean>, proxy:<boolean>}   a plain object / a class instance
//            {k:'a', i:[value…]}            a dense array
//            {k:'g', v:<DECIMAL STRING>}    a JS bigint, as `BigInt.prototype.toString()` writes it
//            {k:'F', v:<number>}            a non-finite JS number
//            {k:'z'} {k:'u'} {k:'f'} {k:'y'} {k:'c'} {k:'P'} {k:'H'}
//                                           null · undefined · function · symbol · cyclic ·
//                                           non-plain collection · sparse array
//   key      a JS string, or an empty ARRAY as the marker for a `Symbol`-keyed own property
//            (`index.mjs` writes `[]`; `value_of` reads an array key as `JsKey::Symbol`)
//   segment  a JS string, a JS number, or one of the outside markers `{bad:'null'|'undefined'|
//            'object'|'array'|'function'}` — **a boolean segment crosses as the boolean ITSELF**
//            (`index.mjs` returns it unwrapped and `segment` reads `Kind::Boolean`), so `{bad:'bool'}`
//            is not a marker the mapping layer writes; **a `symbol` or a `bigint` segment is refused at
//            the package's own boundary and never reaches this codec**
//   address  {k:'L', s:[segment…]} an array of segments   ·  {k:'A'|'N'|'U'|'S'|'X'|'C'} the outside forms
//            {k:'D', o:…} a non-array, carrying the outside segment class it was spelled as
//            ({k:'R'} is the core's `CrossRealmList`; the mapping layer admits a cross-realm array as an
//            ordinary `{k:'L'}` because the class decision it takes is structural)
//   tier     {k:'A'} absent · {k:'N'} null · {k:'U'} undefined · {k:'T', v:<string>} a token ·
//            {k:'S', i:[TierSetItem…]} a set · {k:'B'|'O'|'F'|'D', v:…} the outside scalars
//   opId     {k:'s', v:<string>} a non-empty string · {k:'N'} null · {k:'U'} undefined ·
//            {k:'D', v:<number>} **a real JS `number` AND NOTHING ELSE** — every other class is refused
//            at the package's own boundary inside the one failure form (`A76`, `JS-1`)
//   handle   {k:'O', v:<token>} the opaque form · {k:'B', v:<string>} a bare token · {k:'X'} outside
//   config   the `cfg` object itself, with each declared key read by OWNERSHIP (`filePath` · `journalLength`
//            · `listeners`), a `bigint` `journalLength` crossing AS a `bigint`, and every non-plain `cfg`
//            refused at the package's own boundary before this codec sees it
// =================================================================================================

#[derive(Clone, Copy)]
struct Codec<'e> {
    /// **THE ENVIRONMENT HANDLE** (`PAR-ADA-7`): the library's own environment type. **It is held as the
    /// owned `Env` and not as a borrow**, because `Env` is `Copy` over the runtime's own env pointer — so a
    /// value this codec builds carries `'e` (the ENTRY's lifetime) rather than the lifetime of whatever
    /// frame happened to spell the codec.
    env: Env,
    /// The lifetime marker that ties every value this codec builds to the ENTRY's environment.
    _marker: std::marker::PhantomData<&'e ()>,
}

impl<'e> Codec<'e> {
    /// **ONE MEMBER OF A JS OBJECT, READ AS AN OWN PROPERTY OR NOT AT ALL** — the facade's own half of
    /// `A76`'s ruling and of gate 4's `JS-5`, whose finding was that *"`src/facade.rs`'s `Codec::member`"*
    /// read *"through the PROTOTYPE CHAIN for every wire member"*, so *"a wire object carrying a
    /// prototype-inherited `address`/`handle` is read as an entry field"*.
    ///
    /// **THE OWN-PROPERTY TEST IS THE LIBRARY'S OWN `Object::has_own_property`** (`napi_has_own_property`'s
    /// checked binding), **and the chain-walking read is not the gate and is not spelled here.** Once the
    /// key has been found OWN, the member read can only answer that own member (an own property shadows
    /// every inherited one), so the pair is an own-property read with no chain lookup anywhere on it. **A
    /// key reached only through the prototype chain is ABSENT (`None`), and absence is what the crossing's
    /// absent-versus-`undefined` rule reads** — while the CLASS that carried the inherited key was already
    /// refused at the package's own boundary, before this codec ever saw it.
    fn member(&self, value: JsVal<'_>, name: &str) -> Option<JsVal<'_>> {
        // A primitive carries no member of its own; `null`/`undefined` carry none at all.
        let object = match self.kind_of(value) {
            Kind::Object | Kind::Function => value.coerce_to_object().ok()?,
            _ => return None,
        };
        if !object.has_own_property(name).unwrap_or(false) {
            return None;
        }
        let member: JsVal<'_> = object.get_named_property_unchecked(name).ok()?;
        Some(member)
    }

    /// **THE STRING READ, STRICT — the repair is deleted here too** (see [`utf8_or_none`]: `C-4`'s Rust
    /// half). A payload whose class is not a JS `string` answers the EMPTY-STRING SENTINEL, and the arm that
    /// read it stands as the class it is: `value_of`'s `"s"` arm carries it as `JsValue::NonPlainCollection`
    /// and the store answers its own `ValueNotAdmitted`, and an empty tag names no arm at all. **Nothing is
    /// substituted, nothing is repaired and no status is minted at this frame.**
    fn string_of(&self, value: JsVal<'_>) -> String {
        arg_string(&self.env, &value)
    }

    fn bool_of(&self, value: JsVal<'_>) -> bool {
        value.get_type().map(|kind| kind == Kind::Boolean).unwrap_or(false)
            && unsafe { value.cast::<bool>() }.unwrap_or(false)
    }

    /// **THE NUMBER READ, CLASS-FIRST** — `A76`'s part (1) and gate 4's `JS-6`: *"the facade's number read
    /// must never be handed a `bigint`"*. **THE CLASS IS READ FIRST, ON THE VALUE AS IT IS, AND A VALUE
    /// THAT IS NOT A JS `number` IS NEVER HANDED TO THE NUMERIC CONVERSION AT ALL: `None` is the caller's
    /// answer, and each caller carries the value's OWN class instead of a default.**
    fn number_of(&self, value: JsVal<'_>) -> Option<f64> {
        if self.kind_of(value) != Kind::Number {
            return None;
        }
        unsafe { value.cast::<f64>() }.ok()
    }

    /// **THE BIGINT READ, CLASS-FIRST** — a JS `bigint` read AS a `bigint`, never through the numeric arm
    /// (`A76`, `JS-6`). The library's `BigInt` conversion reports whether the value fits the store's own
    /// carried `i64`; **the class alone decides the refusal** (`JsJournalLengthArg::BigInt` →
    /// `JournalLengthArg::Object` → `AddressMalformed`, and `JsValue::BigInt` → `StoreValue::BigInt` →
    /// `ValueNotAdmitted`), so a value beyond the carrier's range changes no answer and is never substituted
    /// for by a number.
    fn bigint_of(&self, value: JsVal<'_>) -> i64 {
        match unsafe { value.cast::<JsBigInt>() } {
            Ok(big) => big.get_i64().0,
            Err(_) => 0,
        }
    }

    /// **THE CLASS OF A PAYLOAD THE ARM IT ARRIVED IN DID NOT NAME** (`A76`'s class-first reading, at the
    /// only site where a wire member's own class can contradict its tag): the payload's OWN class decides
    /// and nothing is coerced into the arm's. **It is unreachable from the shipped package** — the mapping
    /// layer encodes each arm with a payload of that arm's own class — and it exists so that a
    /// hand-built wire cannot smuggle a `bigint` through the number arm.
    fn classed_value(&self, payload: JsVal<'_>) -> JsValue {
        match self.kind_of(payload) {
            Kind::String => JsValue::Str(self.string_of(payload)),
            Kind::Boolean => JsValue::Bool(self.bool_of(payload)),
            Kind::Number => JsValue::Num(self.number_of(payload).unwrap_or(f64::NAN)),
            Kind::BigInt => JsValue::BigInt(self.bigint_of(payload)),
            Kind::Undefined => JsValue::Undefined,
            Kind::Null => JsValue::Null,
            Kind::Function => JsValue::Function,
            Kind::Symbol => JsValue::Symbol,
            // An object payload is NOT read (no member is taken from it): its class is the outside one.
            _ => JsValue::NonPlainCollection,
        }
    }

    /// **THE CLASS OF A VALUE, BY THE LIBRARY'S OWN `ValueType`** — the adopted generic value's class
    /// decision (`PAR-ADA-9`), which the hand-written boundary took from a numbered `napi_typeof` result.
    fn kind_of(&self, value: JsVal<'_>) -> Kind {
        value.get_type().unwrap_or(Kind::Unknown)
    }

    fn is_array(&self, value: JsVal<'_>) -> bool {
        self.kind_of(value) == Kind::Object && value.is_array().unwrap_or(false)
    }

    /// The elements of a JS array, in index order — **a DENSE walk, because a hole is a decision the JS
    /// boundary has already taken and carried as `{k:'H'}` (`crossing.md §1.4` item 2, `DD-8`).**
    fn elements(&self, array: JsVal<'_>) -> Vec<JsVal<'_>> {
        let Ok(array) = array.coerce_to_object() else {
            return Vec::new();
        };
        let Ok(length) = array.get_array_length() else {
            return Vec::new();
        };
        let mut out = Vec::with_capacity(length as usize);
        for index in 0..length {
            if let Ok(element) = array.get_element(index) {
                out.push(element);
            }
        }
        out
    }

    fn value_of(&self, v: JsVal<'_>) -> JsValue {
        let tag = match self.member(v, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsValue::NonPlainCollection,
        };
        match tag.as_str() {
            "s" => JsValue::Str(
                self.member(v, "v")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default(),
            ),
            "b" => JsValue::Bool(
                self.member(v, "v")
                    .map(|x| self.bool_of(x))
                    .unwrap_or(false),
            ),
            // **THE CLASS TEST PRECEDES THE NUMERIC ARM (`A76`, `JS-6`): a payload that is not a JS `number`
            // is never read as one — its OWN class decides (`classed_value`), so a `bigint` arrives as
            // `JsValue::BigInt` and is refused as a `BigInt` rather than carried through the number arm to
            // a substituted `0`.
            "n" => match self.member(v, "v") {
                Some(payload) => match self.number_of(payload) {
                    Some(n) => JsValue::Num(n),
                    None => self.classed_value(payload),
                },
                None => JsValue::NonPlainCollection,
            },
            "g" => JsValue::BigInt(
                self.member(v, "v")
                    .and_then(|x| self.string_of(x).parse::<i64>().ok())
                    .unwrap_or(0),
            ),
            "F" => match self.member(v, "v") {
                Some(payload) => match self.number_of(payload) {
                    Some(n) => JsValue::NonFinite(n),
                    None => self.classed_value(payload),
                },
                None => JsValue::NonPlainCollection,
            },
            "z" => JsValue::Null,
            "u" => JsValue::Undefined,
            "f" => JsValue::Function,
            "y" => JsValue::Symbol,
            "c" => JsValue::Cyclic,
            "P" => JsValue::NonPlainCollection,
            "H" => JsValue::SparseArray,
            "o" => {
                let members = self
                    .member(v, "m")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|pair| {
                        let pair = self.elements(*pair);
                        let key = match pair.first() {
                            Some(key) => {
                                if self.is_array(*key) {
                                    JsKey::Symbol
                                } else {
                                    JsKey::Key(self.string_of(*key))
                                }
                            }
                            None => JsKey::Symbol,
                        };
                        let held = match pair.get(1) {
                            Some(held) => self.value_of(*held),
                            None => JsValue::Undefined,
                        };
                        (key, held)
                    })
                    .collect();
                let proto = match self
                    .member(v, "p")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default()
                    .as_str()
                {
                    "null" => JsProto::Null,
                    "foreign" => JsProto::ForeignPlain,
                    "class" => JsProto::Class,
                    _ => JsProto::Plain,
                };
                let has_accessor = self
                    .member(v, "acc")
                    .map(|x| self.bool_of(x))
                    .unwrap_or(false);
                let proxied = self
                    .member(v, "proxy")
                    .map(|x| self.bool_of(x))
                    .unwrap_or(false);
                JsValue::Object(JsObject {
                    members,
                    proto,
                    has_accessor,
                    proxied,
                })
            }
            "a" => JsValue::Array(
                self.member(v, "i")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|item| self.value_of(*item))
                    .collect(),
            ),
            _ => JsValue::NonPlainCollection,
        }
    }

    /// `crossing.md §1.3`'s `Segment`: a JS `string` or a non-negative integer `number` is admitted, and
    /// every outside class is carried as its own variant — the package mints no code (`DD-1`).
    fn segment(&self, v: JsVal<'_>) -> JsSegment {
        match self.kind_of(v) {
            Kind::String => JsSegment::Key(self.string_of(v)),
            // The class was just read as `number`, so the read below cannot fail; where it somehow did, the
            // value is carried as the outside class `Object` rather than substituted by `0` (`A76`).
            Kind::Number => match self.number_of(v) {
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
            Kind::Boolean => JsSegment::Bool(self.bool_of(v)),
            Kind::Function => JsSegment::Function,
            _ => {
                match self
                    .member(v, "bad")
                    .map(|x| self.string_of(x))
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
                }
            }
        }
    }

    /// `crossing.md §1.3`'s `AddressArg` table, rows 1–14.
    fn address_of(&self, a: JsVal<'_>) -> JsAddressArg {
        let tag = match self.member(a, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsAddressArg::Absent,
        };
        match tag.as_str() {
            "L" => {
                let segments = self
                    .member(a, "s")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|segment| self.segment(*segment))
                    .collect();
                JsAddressArg::List(segments)
            }
            "R" => {
                let segments = self
                    .member(a, "s")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|segment| self.segment(*segment))
                    .collect();
                JsAddressArg::CrossRealmList(segments)
            }
            "N" => JsAddressArg::Null,
            "U" => JsAddressArg::Undefined,
            "S" => JsAddressArg::Sparse,
            "X" => JsAddressArg::Proxy,
            "C" => JsAddressArg::ClassArrayLike,
            "A" => JsAddressArg::Absent,
            _ => {
                let inner = self
                    .member(a, "o")
                    .map(|o| self.segment(o))
                    .unwrap_or(JsSegment::Object);
                let non_array = match inner {
                    JsSegment::Key(s) => JsNonArray::Str(s),
                    JsSegment::Index(n) => JsNonArray::Number(n as f64),
                    JsSegment::Negative(n) => JsNonArray::Number(n as f64),
                    JsSegment::Fractional(f) => JsNonArray::Number(f),
                    JsSegment::Bool(b) => JsNonArray::Bool(b),
                    JsSegment::Function => JsNonArray::Function,
                    _ => JsNonArray::Object,
                };
                JsAddressArg::NonArray(non_array)
            }
        }
    }

    /// `crossing.md §1.3`'s `TierSetItem` table, `4` rows.
    fn tier_set_item(&self, item: JsVal<'_>) -> JsTierSetItem {
        match self.kind_of(item) {
            Kind::String => JsTierSetItem::Token(self.string_of(item)),
            Kind::Number => match self.number_of(item) {
                Some(n) => JsTierSetItem::Number(n),
                None => JsTierSetItem::Object, // the class was already read as `number` (`A76`)
            },
            Kind::Boolean => JsTierSetItem::Bool(self.bool_of(item)),
            Kind::Function => JsTierSetItem::Function,
            _ => match self
                .member(item, "bad")
                .map(|x| self.string_of(x))
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

    /// `crossing.md §1.3`'s `TierArg` table, `7` rows. **The JS boundary reads the call's own ARITY and
    /// folds a supplied `undefined` to the ABSENT row** (`§1.3`'s absent-versus-`undefined` rule, rule 1).
    fn tier_of(&self, t: JsVal<'_>) -> JsTierArg {
        let tag = match self.member(t, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsTierArg::Absent,
        };
        match tag.as_str() {
            "A" => JsTierArg::Absent,
            "N" => JsTierArg::Null,
            "U" => JsTierArg::Undefined,
            "T" => JsTierArg::Token(
                self.member(t, "v")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default(),
            ),
            "S" => JsTierArg::Set(
                self.member(t, "i")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|item| self.tier_set_item(*item))
                    .collect(),
            ),
            "B" => JsTierArg::Bool(
                self.member(t, "v")
                    .map(|x| self.bool_of(x))
                    .unwrap_or(false),
            ),
            // The number arm, read class-first: a payload that is not a number answers `Object` — row 6's
            // `OutOfDomainTier` — rather than being substituted by `0` (`A76`).
            "D" => JsTierArg::Number(
                self.member(t, "v")
                    .and_then(|x| self.number_of(x))
                    .unwrap_or(f64::NAN),
            ),
            "F" => JsTierArg::Function,
            _ => JsTierArg::Object,
        }
    }

    /// `crossing.md §1.3`'s `OpIdArg` table, `6` rows.
    fn op_id_of(&self, o: JsVal<'_>) -> JsOpIdArg {
        let tag = match self.member(o, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsOpIdArg::Absent,
        };
        match tag.as_str() {
            "s" => JsOpIdArg::Str(
                self.member(o, "v")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default(),
            ),
            "N" => JsOpIdArg::Null,
            "U" => JsOpIdArg::Undefined,
            // **THE NUMBER ROW, READ CLASS-FIRST (`A76`, `JS-1`/`JS-6`):** the mapping layer carries ONLY a
            // real JS `number` on this tag — a `symbol`, a `bigint`, an object, an array, a function or a
            // `Proxy` is refused at the package's own boundary inside the one form, and never coerced here
            // — so a payload that is not a number is carried as the store's own non-string spelling
            // (`OpIdArg::NonString`), which is row 6's declared arm and mints no code.
            "D" => match self.member(o, "v").and_then(|x| self.number_of(x)) {
                Some(n) => JsOpIdArg::Number(n),
                None => JsOpIdArg::Number(f64::NAN),
            },
            _ => JsOpIdArg::Absent,
        }
    }

    /// `crossing.md §1.3`'s `ListenerHandle` row 2 and `JsHandleArg`.
    fn handle_arg_of(&self, h: JsVal<'_>) -> JsHandleArg {
        let tag = match self.member(h, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsHandleArg::NonOpaque,
        };
        match tag.as_str() {
            "O" => JsHandleArg::Opaque(JsHandle::from_handle(
                &self
                    .member(h, "v")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default(),
            )),
            "B" => JsHandleArg::Bare(
                self.member(h, "v")
                    .map(|x| self.string_of(x))
                    .unwrap_or_default(),
            ),
            "A" => JsHandleArg::Absent,
            _ => JsHandleArg::NonOpaque,
        }
    }

    /// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth. **Each
    /// key's ABSENCE is the member's own absence** — `crossing.md §1.3`'s absent-versus-`undefined` rule
    /// reads a `cfg` key by `in`-MEMBERSHIP, and `None` IS that absence (`§4.5` item 2's `Option` row).
    fn config(&self, cfg: JsVal<'_>) -> JsConfig {
        let file_path = self.member(cfg, "filePath").map(|v| match self.kind_of(v) {
            Kind::String => {
                let text = self.string_of(v);
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
        let journal_length = self
            .member(cfg, "journalLength")
            .map(|v| match self.kind_of(v) {
                Kind::Number => match self.number_of(v) {
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
                Kind::String => JsJournalLengthArg::NumericString(self.string_of(v)),
                Kind::Boolean => JsJournalLengthArg::Bool(self.bool_of(v)),
                // **`A76`/`JS-6`: A `bigint` ARRIVES AS A `bigint`** — it is read as its own class by
                // `napi_get_value_bigint_int64` and is NEVER handed to the number read, where the failure arm
                // would have substituted `0` for the caller's `10n`. The declared answer is unchanged: row 11's
                // `AddressMalformed`, reached through the class and not through a coerced token.
                Kind::BigInt => JsJournalLengthArg::BigInt(self.bigint_of(v)),
                Kind::Null => JsJournalLengthArg::Null,
                Kind::Undefined => JsJournalLengthArg::Undefined,
                Kind::Function => JsJournalLengthArg::Function,
                _ => JsJournalLengthArg::Object,
            });
        let listeners = self.member(cfg, "listeners").map(|v| {
            if !self.is_array(v) {
                return match self.kind_of(v) {
                    Kind::Null => JsListenersArg::Null,
                    Kind::Undefined => JsListenersArg::Undefined,
                    _ => JsListenersArg::NonArray,
                };
            }
            let entries = self
                .elements(v)
                .iter()
                .map(|entry| {
                    if self.is_array(*entry) || self.kind_of(*entry) != Kind::Object {
                        return JsListenerEntry::Other;
                    }
                    let (Some(address), Some(handle)) = (
                        self.member(*entry, "address"),
                        self.member(*entry, "handle"),
                    ) else {
                        return JsListenerEntry::Other;
                    };
                    if self.kind_of(handle) != Kind::String {
                        return JsListenerEntry::Other;
                    }
                    let handle = self.string_of(handle);
                    if handle.is_empty() {
                        return JsListenerEntry::Other;
                    }
                    JsListenerEntry::Entry {
                        address: self.address_of(address),
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

    /// **⟶ `parameter-semantics.md §2.21` / `surface.md §2.1`'s `cfg` block dated 2026-10-15 — THE FOURTH
    /// DECLARED KEY, `constraints`.**
    ///
    /// **THE CLASS DECISION IS TAKEN AT THE BOUNDARY, ON THE VALUE AS IT IS, AND THE CODE AND THE MESSAGE
    /// STAY THE STORE'S** (`A76`'s part (1); `crossing.md §1.4` item 9; `DD-40`): `index.mjs`'s
    /// `encodeConstraints` walks the list — a `Proxy`, a class extending `Array` and every non-array is the
    /// list's own outside form, and one element outside the `{ address, id }` pair's shape crosses as **the
    /// failing ENTRY's own `<SEGMENT>` spelling** (`§8.2`'s row) — and this reader is MECHANICAL over that
    /// encoding, exactly as `address_of` is over `encodeAddress`'s (`§1.3`'s two-layer split).
    fn constraints_arg(&self, value: JsVal<'_>) -> JsConstraintsArg {
        match self.kind_of(value) {
            Kind::Null => return JsConstraintsArg::Null,
            Kind::Undefined => return JsConstraintsArg::Undefined,
            _ => {}
        }
        if !self.is_array(value) {
            return JsConstraintsArg::NonArray;
        }
        JsConstraintsArg::List(
            self.elements(value)
                .iter()
                .map(|entry| self.constraint_entry(*entry))
                .collect(),
        )
    }

    /// One `constraints[]` element: the closed `{ address, id }` pair, or the element outside it with its
    /// own `<SEGMENT>` spelling, read off the boundary's own encoding and nowhere else.
    fn constraint_entry(&self, entry: JsVal<'_>) -> JsConstraintEntry {
        if self.member(entry, "bad").is_some() {
            let subject = self
                .member(entry, "subject")
                .map(|s| self.string_of(s))
                .unwrap_or_default();
            return JsConstraintEntry::Invalid(subject);
        }
        let address = self
            .member(entry, "address")
            .map(|a| self.address_of(a))
            .unwrap_or(JsAddressArg::Absent);
        let id = self
            .member(entry, "id")
            .map(|i| self.string_of(i))
            .unwrap_or_default();
        JsConstraintEntry::Pair { address, id }
    }
}

// -------------------------------------------------------------------------------------------------
// The copy OUT — the core's own records and values, written as fresh Node-API values.
// -------------------------------------------------------------------------------------------------

impl<'e> Codec<'e> {
    fn object(self, members: Vec<(&str, JsVal<'_>)>) -> JsVal<'static> {
        let mut out = Object::new(&self.env)
            .unwrap_or_else(|_| unreachable!("the environment builds an object"));
        for (name, value) in members {
            let _ = out.set(name, value);
        }
        // The object crosses OUT as the untyped value the wire's reader receives.
        let raw = unsafe { ToNapiValue::to_napi_value(self.env.raw(), out) }
            .unwrap_or(std::ptr::null_mut());
        unsafe { JsVal::from_raw_unchecked(self.env.raw(), raw) }
    }

    fn array(self, items: Vec<JsVal<'_>>) -> JsVal<'static> {
        // **A REAL JS ARRAY AND NOT AN OBJECT WITH INDEXED MEMBERS** — the wire's `i:[…]` and `s:[…]` are
        // read by the mapping layer with `Array.prototype.map`, so an object carrying `0`, `1`, … would
        // cross as a value whose shape is the wrong one. The library's `Vec<T>` conversion builds an array
        // through `napi_create_array_with_length` and `napi_set_element`, which is the pair the hand-written
        // copy OUT used.
        let owned: Vec<JsVal<'_>> = items;
        let raw = unsafe { ToNapiValue::to_napi_value(self.env.raw(), owned) }
            .unwrap_or(std::ptr::null_mut());
        unsafe { JsVal::from_raw_unchecked(self.env.raw(), raw) }
    }

    /// A value's own tag member beside the payload the JS side reads it by.
    fn tagged(self, tag: &str, payload: JsVal<'_>) -> JsVal<'static> {
        let tag = self.string_value(tag);
        self.object(vec![("k", tag), ("v", payload)])
    }

    /// One member set on an object this codec built — the record's own triggering address (`§2.7` item 2).
    fn set_member(self, object: JsVal<'_>, name: &str, value: JsVal<'_>) {
        let mut object = match object.coerce_to_object() {
            Ok(object) => object,
            Err(_) => return,
        };
        let _ = object.set(name, value);
    }

    fn string_value(self, text: &str) -> JsVal<'_> {
        make_string(&self.env, text)
    }

    fn number_value(self, n: f64) -> JsVal<'static> {
        make_value(&self.env, n)
    }

    fn bool_value(self, b: bool) -> JsVal<'static> {
        make_value(&self.env, b)
    }

    fn undefined_value(self) -> JsVal<'static> {
        make_undefined(&self.env)
    }

    /// **THE COPY OUT** (`crossing.md §1.1` clause 2): a store value converted into FRESH JS-owned data,
    /// at `crossing.md §1.2`'s own classes — so the JS side holds no reference into store-owned data.
    fn to_js_value(self, v: &JsValue) -> JsVal<'static> {
        match v {
            JsValue::Str(s) => self.tagged("s", self.string_value(s)),
            JsValue::Bool(b) => self.tagged("b", self.bool_value(*b)),
            JsValue::Num(n) => self.tagged("n", self.number_value(*n)),
            JsValue::Object(o) => {
                let members = o
                    .members
                    .iter()
                    .map(|(key, member)| {
                        let key = match key {
                            JsKey::Key(name) => self.string_value(name),
                            // A `Symbol`-keyed member refused the whole value, so it never crosses OUT as
                            // a member; it is carried as the marker the reader recognises.
                            JsKey::Symbol => self.array(vec![]),
                        };
                        self.array(vec![key, self.to_js_value(member)])
                    })
                    .collect();
                let proto = match o.proto {
                    JsProto::Plain => "plain",
                    JsProto::Null => "null",
                    JsProto::ForeignPlain => "foreign",
                    JsProto::Class => "class",
                };
                self.object(vec![
                    ("k", self.string_value("o")),
                    ("m", self.array(members)),
                    ("p", self.string_value(proto)),
                    ("acc", self.bool_value(o.has_accessor)),
                    ("proxy", self.bool_value(o.proxied)),
                ])
            }
            JsValue::Array(items) => {
                let items = items.iter().map(|item| self.to_js_value(item)).collect();
                self.object(vec![
                    ("k", self.string_value("a")),
                    ("i", self.array(items)),
                ])
            }
            JsValue::Null => self.object(vec![("k", self.string_value("z"))]),
            JsValue::Undefined => self.object(vec![("k", self.string_value("u"))]),
            JsValue::Function => self.object(vec![("k", self.string_value("f"))]),
            JsValue::Symbol => self.object(vec![("k", self.string_value("y"))]),
            JsValue::BigInt(n) => self.tagged("g", self.string_value(&n.to_string())),
            JsValue::NonFinite(f) => self.tagged("F", self.number_value(*f)),
            JsValue::Cyclic => self.object(vec![("k", self.string_value("c"))]),
            JsValue::NonPlainCollection => self.object(vec![("k", self.string_value("P"))]),
            JsValue::SparseArray => self.object(vec![("k", self.string_value("H"))]),
        }
    }

    fn to_js_segments(self, segments: &[JsSegment]) -> JsVal<'static> {
        self.array(
            segments
                .iter()
                .map(|segment| match segment {
                    JsSegment::Key(k) => self.string_value(k),
                    JsSegment::Index(i) => self.number_value(*i as f64),
                    JsSegment::Negative(i) => self.number_value(*i as f64),
                    JsSegment::Fractional(f) => self.number_value(*f),
                    JsSegment::Null => self.object(vec![("bad", self.string_value("null"))]),
                    JsSegment::Undefined => {
                        self.object(vec![("bad", self.string_value("undefined"))])
                    }
                    JsSegment::Bool(b) => self.bool_value(*b),
                    JsSegment::Object => self.object(vec![("bad", self.string_value("object"))]),
                    JsSegment::Array => self.object(vec![("bad", self.string_value("array"))]),
                    JsSegment::Function => {
                        self.object(vec![("bad", self.string_value("function"))])
                    }
                })
                .collect(),
        )
    }

    fn to_js_base_state(self, state: &JsBaseState) -> JsVal<'static> {
        self.object(vec![
            ("present", self.bool_value(state.present)),
            ("value", self.to_js_value(&state.value)),
        ])
    }

    fn to_js_journal_op(self, op: &JsJournalOp) -> JsVal<'static> {
        let tier = match &op.tier {
            Some(token) => self.string_value(token),
            None => self.undefined_value(),
        };
        self.object(vec![
            ("opId", self.string_value(&op.opId)),
            ("kind", self.string_value(&op.kind)),
            ("address", self.to_js_segments(&op.address)),
            ("tier", tier),
            ("before", self.to_js_base_state(&op.before)),
            ("after", self.to_js_base_state(&op.after)),
            ("seq", self.number_value(op.seq as f64)),
            ("compacted", self.bool_value(op.compacted)),
        ])
    }

    /// **⟶ THE PAIR EMITTER — `{handle, address}` (`contract.md §2.4` item 1; `trigger-and-pair.md §2`
    /// item 2).** The function that stood here mapped a bare `JsHandle` list to a bare string list, and it
    /// **BECOMES A PAIR EMITTER whose `handle` member is the string and whose `address` member is a segment
    /// array** (`P: docs/pending.md · P-7`, the crossing clause; `PAR-HL-38`).
    ///
    /// **AND WITH THE TOKEN GONE, `handle.token()` IS THE HANDLE ITSELF** (`P: docs/pending.md · P-6`, the
    /// type ruling: *"`JsHandle { token: String }` collapses to the string it always was"*).
    ///
    /// **NO PARALLEL `triggeredAddresses` ARRAY EXISTS AND NONE MAY BE ADDED** — the aligned form is an i-th
    /// correspondence, and it reverses `DD-37` (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 4).
    fn to_js_trigger_pairs(self, triggered: &[JsListenerTrigger]) -> JsVal<'static> {
        let pairs = triggered
            .iter()
            .map(|pair| {
                let handle = self.string_value(pair.handle.handle());
                let address = self.to_js_segments(&pair.address);
                self.object(vec![("handle", handle), ("address", address)])
            })
            .collect();
        self.array(pairs)
    }

    fn to_js_write_result(self, r: &JsWriteResult) -> JsVal<'static> {
        let watched = r
            .watched
            .iter()
            .map(|address| self.to_js_segments(address))
            .collect();
        self.object(vec![
            ("op", self.to_js_journal_op(&r.op)),
            ("watched", self.array(watched)),
            ("triggered", self.to_js_trigger_pairs(&r.triggered)),
        ])
    }

    fn to_js_delete_receipt(self, r: &JsDeleteReceipt) -> JsVal<'static> {
        self.object(vec![
            ("address", self.to_js_segments(&r.address)),
            (
                "tiers",
                self.array(r.tiers.iter().map(|t| self.string_value(t)).collect()),
            ),
            ("triggered", self.to_js_trigger_pairs(&r.triggered)),
        ])
    }

    fn to_js_rollback_result(self, r: &JsRollbackResult) -> JsVal<'static> {
        self.object(vec![
            ("opId", self.string_value(&r.opId)),
            (
                "undoneOps",
                self.array(r.undoneOps.iter().map(|id| self.string_value(id)).collect()),
            ),
            ("restoredTo", self.to_js_base_state(&r.restoredTo)),
        ])
    }
}

// =================================================================================================
// THE INSTANCES AND THE REGISTRY'S FUNCTION SLOTS — thread-local, because the addon is reached from the
// runtime's own thread and a `Store` is not required to be `Send`.
// =================================================================================================

thread_local! {
    static INSTANCES: RefCell<Vec<crossing::Instance>> = const { RefCell::new(Vec::new()) };
    /// **THE RECEIVER TABLE** — `receiver-and-refusal.md §6`'s subject, and this unit's second `OWED` item.
    ///
    /// **IT REMAINS — SOMETHING MUST HOLD THE STORE — AND ITS FORM IS `Vec<usize>`, THE LIVE INDICES OF
    /// [`INSTANCES`] IN ASCENDING ORDER.** *Why this shape*: the index `storeCreate` mints IS the store's
    /// address on the Node-API side — the package's non-enumerable own member carries it and the receiver
    /// hands it back — so a table of anything richer would hold a SECOND copy of a store the first table
    /// already owns, and `receiver-and-refusal.md §5` withdraws exactly that ("it resolves through the same
    /// `this` and so buys only legibility"). **A SET OF INDICES IS THE MAPPING AND NOTHING BESIDE IT.**
    ///
    /// **AND IT GAINS THE RETIREMENT PATH `§6` REQUIRES, FIRING IN THE SAME ACT THAT FREES A STORE.** The
    /// store is freed by the package's own GC finalizer (`docs/decisions.md`: *"THE STORE IS TORN DOWN BY A
    /// GC FINALIZER"*), which reaches this addon through the standing `storeRelease` entry below; that entry
    /// DROPS the instance AND removes ITS OWN index from this table, **IN ONE ACT**, so **THE RETIREMENT
    /// REMOVES EXACTLY ONE ENTRY — the freed instance's own — AND NEVER THE TABLE** (`§6`) and an entry whose
    /// store has been freed can never survive to name nothing.
    static INSTANCE_IDS: RefCell<Vec<usize>> = const { RefCell::new(Vec::new()) };
}

// **⟶ THE CORE-SIDE INVOCATION STRUCTURE IS GONE FROM THIS FILE (`F-13`; `U-9`): THE `LISTENERS`
// THREAD_LOCAL AND `invoke_listeners` ARE DELETED.** The contract declares the FACADE as the invoker over a
// core registry (`package.md §4.5` item 5), but **the shipped facade never wrote a `LISTENERS` slot and
// nothing ever called `invoke_listeners`** (`V-5`: no caller behind any re-export either, and no writer of
// that slot existed at any depth on this file) — *"the live invocation is `index.mjs`'s `deliver`"*, which
// `A77` states as the model: *"the store passes an ID back to the client when a listener is triggered, and
// the JS side matches that ID to the function the caller registered it with."* **THE DEAD STRUCTURE CARRIED
// THE NODE-API REFERENCE SURFACE WITH IT, AND IT FALLS TOGETHER**: `napi_create_reference`,
// `napi_delete_reference` and `napi_get_reference_value`, beside `napi_call_function` (whose ONE call was
// here) and the `NapiRef` alias those three named. **NOTHING IS LOST**: this layer holds no listener and
// raises no body (`DD-23` is carried by `deliver`'s own uncaught call), the addon's record is complete and
// copied out before the package's invocation loop opens (`§2.7` item 2), and the triggering address crosses
// as the record's own `triggeringAddress` member rather than through a builder here.

/// The addon's `storeCreate(cfgWire) -> uint32`: the store's construction, through the core.
///
/// **THE ENTRY'S NAME AND ARITY ARE UNMOVED** (`contract.md §2` item 3): `storeCreate` is the second of the
/// five, it takes ONE argument, and it answers the instance id. **AND IT IS ANNOTATED RATHER THAN
/// HAND-EXPORTED** — the annotation replaces the `export(env, exports, name, fn)` call that built the old
/// table (`binding-crate-and-abi.md §2`'s deletion row 5), and its edit-time argument list IS the arity the
/// runtime reads.
///
/// **THE REFUSAL PATH THROWS THE VALUE** (`failure-form.md §3`): `throw_refusal` is called and the frame
/// answers `undefined` behind the pending exception — **no `Result` arm carrying a library error is
/// returned from this function, which is the obligation that keeps the form** (`P-ADA-3`, `F-4`).
/// **THE ENTRY IS ANNOTATED AND ITS ONE-POSITION ARITY IS UNMOVED** (`contract.md §2` item 3). **THE
/// REFUSAL ARM STILL ANSWERS `Ok`** — a refusal has ALREADY been thrown as the VALUE by [`throw_refusal`],
/// so no `Err` is returned here and no library error reaches a refusal path (`P-ADA-3`, `F-4`).
#[napi]
pub fn storeCreate(env: Env, cfg: JsVal<'_>) -> NapiRet<'static> {
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let config = codec.config(cfg);
    // **⟶ THE FOURTH DECLARED KEY IS READ HERE, BESIDE THE STRUCT** (`parameter-semantics.md §2.21`;
    // `surface.md §2.1`'s `cfg` block dated 2026-10-15): read by OWNERSHIP exactly as the three above are,
    // so its ABSENCE is `None` — no default is fabricated for it — and **a PRESENT `undefined` is the
    // key's own outside form and not its absence**. **THE CODE AND THE MESSAGE STAY THE STORE'S** (`§8.1`
    // #16, `§8.2`; `DD-40`), which is why the list crosses as its own carrier and not as a `JsConfig`
    // field the store could not tell from an absence.
    let constraints = codec
        .member(cfg, "constraints")
        .map(|value| codec.constraints_arg(value));
    match crossing::create_with_constraints(&config, constraints.as_ref()) {
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            Ok(make_undefined(&env))
        }
        Ok(instance) => {
            // **THE MINT AND THE TABLE'S OWN ROW, IN ONE ACT** (`receiver-and-refusal.md §6`): the index the
            // store object is published with is EXACTLY the row [`INSTANCE_IDS`] holds, so the receiver's
            // resolution and the store's own construction cannot disagree about which store an index names.
            let store_index = INSTANCES.with(|instances| {
                let mut instances = instances.borrow_mut();
                instances.push(instance);
                instances.len() - 1
            });
            INSTANCE_IDS.with(|ids| ids.borrow_mut().push(store_index));
            Ok(make_value(&env, store_index as u32))
        }
    }
}

// =================================================================================================
// THE NINE PER-VERB ENTRIES — `U-STOREROOM-ADDON-SURFACE`, `export-set-and-dispatch.md §1`
//
// **THE DISPATCHER'S STRING INDIRECTION GOES** (`contract.md §2` item 2; `§3`): `call(instance, verb, args)`
// matched the verb as a JS string across nine arms and showed as its own frame with the verb as DATA. **THE
// SPLIT IS PRECISELY ITS REPLACEMENT, SO `call` DOES NOT SURVIVE** (`export-set-and-dispatch.md §2`), and
// each arm now stands at its own `#[napi]` entry: **the verb IS the frame's name.**
//
// **EACH ENTRY TAKES ITS VERB'S OWN ARGUMENTS AND NOTHING ELSE** (`§4`). The instance position that once
// preceded them is GONE and is not reintroduced; **the store arrives by the receiver** — the Node-API `this`
// the package hands as the FIRST CALL ARGUMENT and the first element of the call array
// (`receiver-and-refusal.md §1`), which this layer reads at [`store_index_of`] and nowhere else.
//
// **THE ARITIES ARE THE CLAUSE'S OWN TABLE, UNMOVED FROM THE VERB'S** (`§1`; `§4`):
// `read`(3) · `readLiteral`(3) · `write`(**5**) · `delete`(3) · `rollback`(2) · `listen`(3) ·
// `unlisten`(2) · `removeListener`(2) · `commitFile`(2).
//
// **`commit` IS NOT AN ENTRY AND NEVER WAS AN ARM**: it is `write`'s FOURTH POSITION, whose class test the
// package takes before this frame is entered (`§2`; `commitPositionRefusal`). **`constraints` IS NOT AN
// ADDON ENTRY EITHER** — the addon is never reached for it (`§2`).
// =================================================================================================

/// **THE ARGUMENT-READING PROTOCOL, STATED ONCE FOR THE NINE** (`crossing.md §1.3`'s absent-versus-
/// `undefined` rule): a position the call did NOT supply is ABSENT (`None`) and a SUPPLIED `undefined` is
/// `Some` — **and `undefined` IS A VALUE THAT CROSSES IN AND IS REFUSED BY THE STORE'S OWN TAXONOMY**
/// (`DD-46`: `JsValue::Undefined` reaches the store as its own outside member), never read here as an
/// absence. **THIS DISTINCTION IS WHY THE POSITIONS ARE HANDED AS THE RUNTIME'S `undefined` RATHER THAN
/// DROPPED**: an absent position is a SHORT call, and shortening is exactly what `S-ARITY` calls one-fewer.
///
/// **AND A POSITION THE PACKAGE DID NOT SUPPLY AT THE TAIL IS READ AS THE RUNTIME'S OWN `undefined`,
/// WHICH IS THE PACKAGE'S PROTOCOL ITSELF** (`index.mjs`'s own comment at `read`: *"A position the call
/// supplied no value for is handed as the runtime's own `undefined` — NEVER as an absent array slot"*).
/// **THE READ LIVES HERE SO THE NINE ENTRIES CANNOT DRIFT APART ON IT.**
///
/// `positions` is the call's own argument array — **the verb's positions and nothing else** — and
/// `position_index` is the ZERO-BASED ordinal of the declared position being read, `0` being the verb's own
/// first argument.
fn position<'a, 'e>(positions: &'a [JsVal<'e>], position_index: usize) -> Option<&'a JsVal<'e>> {
    positions.get(position_index)
}

/// **THE STORE'S INDEX, RESOLVED FROM THE RECEIVER** (`receiver-and-refusal.md §1`).
///
/// **THE RECEIVER IS A ROUTING CARRIER AND NOT AN AUTHORITY CARRIER** (`§1`), and the index it names is the
/// integer `storeCreate` minted and returned — **the addon's own integer, never a caller's**. The package
/// reads it off the store object it published as its own non-enumerable row and hands it across; a caller
/// who has only the entry function has nothing to hand, which is the DETACHED CALL
/// (`§3`: *"the method lost its object; there is no receiver"*).
///
/// **THE TABLE IS DECLARED AT [`INSTANCE_IDS`] BESIDE `INSTANCES` AND HOLDS NOTHING BUT THE MAPPING**: the
/// entries it maps are the live constructions themselves, so its retirement path is the store's own
/// (`receiver-and-refusal.md §6`).
///
/// **AND A CALL NAMING NO LIVE STORE REFUSES IN THE ONE DECLARED FORM** (`§3`): an ABSENT receiver argument,
/// one that is not an object, one that carries no readable `Symbol.for`-keyed channel, one whose channel is
/// not a number, and one whose index the table does not hold all answer THE ONE REFUSAL — a THROWN PLAIN
/// OBJECT `{status, message}` and never an `Error`, never a `TypeError`, and never a library error
/// (`failure-form.md §1`; `P-ADA-3`, `F-4`).
///
/// **⟶ AND THE RECEIVER IS RESOLVED WITHOUT AN ARRAY CLASS GATE, WHICH IS A CORRECTION AND NOT A
/// LOOSENING.** The spec's own words are *"one arm, one observable"* (`§3`): what the clause requires is
/// that **a call whose receiver names no live store refuses in the ONE declared form** — not that a class
/// **THE RECEIVER ARRIVES AS THE NODE-API `this` AND IS ALREADY AN OBJECT** (`receiver-and-refusal.md §1`:
/// *"each entry resolves its store from the Node-API `this` receiver — the value already received at every
/// entry and today discarded"*). **ITS `Symbol.for`-KEYED CHANNEL IS READ AS THE NUMBER `storeCreate`
/// MINTED**, which the package publishes on the store object; **if that read fails, or the number names no
/// row in [`INSTANCE_IDS`], THE ONE REFUSAL ANSWERS** (`§3`: *"There is no second arm and no second
/// observable."*).
///
/// **NO CLASS GATE IS TAKEN ON THE RECEIVER, AND THAT IS A CORRECTION RATHER THAN A LOOSENING.** The clause
/// requires that a call whose receiver names no live store refuses in the ONE declared form — not that a
/// class test stand first. **THE GATE THAT STOOD HERE WAS ALSO THE FRAGILE ONE**: `is_array()` calls raw
/// `napi_is_array` on the handle's own raw pointer and consults no `value_type`
/// (`napi-3.14.2/src/js_values/mod.rs:249`), and `Object::get_array_length()` is no better — it re-tests
/// `is_array()` internally and answers `ArrayExpected` (`object.rs:515-523`). **BOTH ANSWER ABOUT A POINTER
/// RATHER THAN ABOUT THE VALUE, so neither is a gate this resolution may depend on.**
///
/// **THE TOKEN IS BORROWED AND NOT MINTED** (`DD-40`; `failure-form.md §4`: *"the boundary does not mint a
/// member for it"*): `AddressNotFound` is the store's own member for *"a handle that names nothing"*, with
/// `AddressMalformed` for the argument that is not a receiver at all.
fn store_index_of(env: &Env, receiver: Option<&Object<'_>>) -> Result<usize, Refusal> {
    let Some(store_object) = receiver else {
        return Err(not_a_receiver());
    };
    // **THE INDEX IS READ OFF THE RECEIVER'S OWN `Symbol.for`-KEYED PROPERTY** — the value `storeCreate`
    // minted and the package published as the store object's own channel. **A SYMBOL KEY IS THE FORM CHOSEN
    // BECAUSE IT IS INVISIBLE TO BOTH ENUMERATIONS**: the product's declared fourteen own members stay
    // exactly fourteen (`surface.md §2.4` item 9 (f)) and no member-counting cell can see the carrier, which
    // is the same precedent `A117` (D6) declares for this package's other symbol-keyed channels. **AN
    // INDEXED OWN PROPERTY WAS TRIED FIRST AND REJECTED AT ITS OWN MEASUREMENT**: `Object.getOwnPropertyNames`
    // COUNTS a numeric index, so publishing the row at element `0` moved the member set `14 → 15` and failed
    // a cell that is not this unit's to change.
    //
    // **THE READ IS `get_property` WITH A `Symbol.for` KEY, WHICH RESOLVES THROUGH THE ENV**, so it consults
    // no raw-handle predicate — the property this whole shape exists to avoid depending on.
    let try_channel_key = ::napi::bindgen_prelude::Symbol::for_desc(STORE_INDEX_KEY).into_js_symbol(env);
    let Ok(channel_key) = try_channel_key else {
        return Err(not_a_receiver());
    };
    let Ok(carried_index) = store_object.get_property::<_, JsVal<'_>>(channel_key) else {
        return Err(not_a_receiver());
    };
    // **AND IT IS READ AS A NUMBER.** A value of any other class names no index and refuses in the same form.
    let Ok(raw_index) = (unsafe { carried_index.cast::<f64>() }) else {
        return Err(not_a_receiver());
    };
    let store_index = raw_index as usize;
    // **A RECEIVER NAMING NOTHING LIVE RETIRES NOTHING**: an index beyond the table answers the SAME one
    // form, so a detached call, a never-issued value and a released store are one observable
    // (`receiver-and-refusal.md §3`: *"There is no second arm and no second observable"*).
    INSTANCE_IDS
        .with(|ids| ids.borrow().contains(&store_index))
        .then_some(store_index)
        .ok_or(Refusal {
            status: "AddressNotFound".to_string(),
            message: "the receiver names no store this addon holds".to_string(),
        })
}


/// **THE TABLE HOLDS NO ROW AT THIS INDEX — THE ONE REFUSAL EVERY PER-VERB ENTRY ANSWERS IT WITH.** The
/// receiver resolved to a live row a moment ago and the table no longer holds it, so this is the OTHER half
/// of the detached/released observable [`store_index_of`] closes: the token is `AddressNotFound`, BORROWED
/// AND NOT MINTED (`DD-40`; `failure-form.md §4`), and the message text is unchanged.
fn no_instance_at(_store_index: usize) -> Refusal {
    Refusal {
        status: "AddressNotFound".to_string(),
        message: "the package holds no instance at that id".to_string(),
    }
}


/// **THE NINE ENTRIES, ONE PER ARM, EACH ON ITS OWN FRAME** (`contract.md §2` item 2).
///
/// **THE BODY OF EACH IS THE ARM IT REPLACES, UNMOVED**: the same encoder, the same core call, the same
/// translator back, and the same `triggeringAddress` member the write and delete arms set (`§2.7` item 2).
/// What moved is HOW THE STORE IS FOUND: **the receiver arrives as the Node-API `this`**, injected by
/// `napi-derive` from `cb.this()` into the `receiver: This<Object<'_>>` parameter (`receiver-and-refusal.md
/// §1`), and each entry resolves its store from it via [`store_index_of`]. **`positions` therefore holds the
/// VERB'S OWN ARGUMENTS ALONE — the receiver is NOT in it at all, and `position(&positions, 0)` reads the
/// verb's OWN FIRST argument, at element ZERO**, with no instance among them (`§4`).
///
/// **⟶ THE ELEMENT-ZERO DESIGN WAS ABANDONED, AND THE REASON IS RECORDED RATHER THAN LEFT AS A TRACE**: an
/// earlier shape took the receiver as the call array's FIRST element and began each entry's declared
/// positions at element ONE. It was withdrawn with the whole element-0 scheme — the receiver ruling is
/// `receiver-and-refusal.md §1` (*"each entry resolves its store from the Node-API `this` receiver — the
/// value already received at every entry and today discarded"*), and the rejected alternatives that had
/// gathered around the array shape are named and refused at `§5` (binding the members to the instance, and a
/// `WeakMap` from receiver to store). **THE ABANDONED SPELLING SURVIVES ONLY IN THE TWO COMMENTS THAT STILL
/// DESCRIBE IT — [`register`]'s own interior comment and the block comment above [`store_index_of`] — and in
/// no byte of any entry's declared positions.**
#[napi(js_name = "read")]
fn verb_read(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `3`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE THIRD DECLARED POSITION IS DECLARED AND NOT READ** — the
    // store's own `read` takes the address and the tier and no more — and it stands so the declared arity
    // is a property of the signature (`S-ARITY` drives this entry at `3` and at ±1).
    let positions: Vec<JsVal<'_>> = vec![address_pos, tier_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let address = codec.address(position(&positions, 0));
        let tier = codec.tier(position(&positions, 1));
        let value = store.read(&address, &tier)?;
        Ok(codec.to_js_value(&value))
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "readLiteral")]
fn verb_read_literal(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `3`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE THIRD DECLARED POSITION IS DECLARED AND NOT READ**, exactly as
    // `read`'s is — the literal read is `read` narrowed at the target and takes no position `read` lacks.
    let positions: Vec<JsVal<'_>> = vec![address_pos, tier_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let address = codec.address(position(&positions, 0));
        let tier = codec.tier(position(&positions, 1));
        let value = store.read_literal(&address, &tier)?;
        Ok(codec.to_js_value(&value))
    });
    answer_or_throw(env, answer)
}

/// **`write` CARRIES A FIFTH POSITION THE OTHERS DO NOT** (`export-set-and-dispatch.md §1`; `§4`): its
/// fourth declared position is the ADOPTED RECORD IDENTITY a repair write's join key names (`PAR-SAS-4`,
/// preserved unmoved), and **a caller supply of it is an unsupported anti-pattern that is neither refused
/// by arity nor detected by a test** (`§4`) — which is why this entry reads four positions and no more.
///
/// **AND THE TRIGGERING ADDRESS CROSSES BESIDE THE RECORD** (`§2.7` item 2, `PAR-JS-12`): the invocation
/// window opens AFTER this frame returns, in the mapping layer that holds the caller's functions.
#[napi(js_name = "write")]
fn verb_write(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>, value_pos: JsVal<'_>, commit_identity: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `5`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE FOURTH DECLARED POSITION IS THE COMMIT IDENTITY** — the
    // adopted record identity a kernel-driven write carries (`§1`: *"it carries a fifth position the others
    // do not"*; `surface.md §2.2`'s `commit?` clause) — **and it is CONSUMED WITHOUT BEING READ HERE**: the
    // class test on it is the PACKAGE's, taken before this frame is entered (`§2`, `commitPositionRefusal`),
    // and this entry reads the three positions above and no more. **THE FIFTH IS DECLARED AND NOT READ**: it
    // carries the arity and nothing else.
    let positions: Vec<JsVal<'_>> = vec![address_pos, tier_pos, value_pos, commit_identity, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let address = codec.address(position(&positions, 0));
        let tier = codec.tier(position(&positions, 1));
        let value = codec.value(position(&positions, 2));
        let result = store.write(&address, &tier, &value)?;
        let answer = codec.to_js_write_result(&result);
        let triggering = codec.to_js_segments(&segments_of(&address));
        codec.set_member(answer, "triggeringAddress", triggering);
        Ok(answer)
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "delete")]
fn verb_delete(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `3`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE THIRD DECLARED POSITION IS DECLARED AND NOT READ** — the
    // store's own `delete` takes the address and the tier and no more.
    let positions: Vec<JsVal<'_>> = vec![address_pos, tier_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let address = codec.address(position(&positions, 0));
        let tier = codec.tier(position(&positions, 1));
        let receipt = store.delete(&address, &tier)?;
        let answer = codec.to_js_delete_receipt(&receipt);
        let triggering = codec.to_js_segments(&segments_of(&address));
        codec.set_member(answer, "triggeringAddress", triggering);
        Ok(answer)
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "rollback")]
fn verb_rollback(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE SECOND DECLARED POSITION IS DECLARED AND NOT READ** — the
    // store's own `rollback` takes the op id and no more.
    let positions: Vec<JsVal<'_>> = vec![op_id_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let op_id = codec.op_id(position(&positions, 0));
        let result = store.rollback(&op_id)?;
        Ok(codec.to_js_rollback_result(&result))
    });
    answer_or_throw(env, answer)
}

/// **`listen(handle, addresses)` — THE TWO POSITIONS REACH THE CORE AS THE TWO THE STORE DECLARES**
/// (`contract.md §2.2`; `listen-verb.md §1` item 1). **POSITION `1` IS THE CALLER-SPELLED HANDLE; POSITION
/// `2` IS THE SET** — an ARRAY OF ADDRESSES, each member already inside the store's address domain, refused
/// otherwise by the package's own set-position class test before this frame is entered (`F-2`). **AND THE
/// ANSWER IS `undefined`** — the caller supplied the identity, so there is no datum to return (`PAR-HL-3`).
#[napi(js_name = "listen")]
fn verb_listen(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>, addresses_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `3`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE THIRD DECLARED POSITION IS DECLARED AND NOT READ** — the two
    // positions the store declares are the handle and the set, and the doc block above says so.
    let positions: Vec<JsVal<'_>> = vec![handle_pos, addresses_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let handle = codec.handle_arg(position(&positions, 0));
        let addresses = codec.address_set(position(&positions, 1));
        store.listen(&handle, &addresses)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "unlisten")]
fn verb_unlisten(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE SECOND DECLARED POSITION IS DECLARED AND NOT READ** — the
    // withdrawal's store half takes the handle and no more.
    let positions: Vec<JsVal<'_>> = vec![handle_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let handle = codec.handle_arg(position(&positions, 0));
        store.unlisten(&handle)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

/// **`removeListener(handle)`'s STORE HALF** (`U-STOREROOM-HELD-LISTENER-IDENTITY`, `D-GP-SHLI`). **THE
/// REMOVAL *IS* THE PURGE** (`removal-members.md §2` item 3), so this verb reaches the store's own wholesale
/// `Home::purge` and answers `undefined`. **It is NOT a crossing verb of the eight the store's declared
/// namespace carries** — it is the package's own member reaching the store's own operation, exactly as
/// `listen` does (`contract.md §2.7` item 2).
#[napi(js_name = "removeListener")]
fn verb_remove_listener(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **THE SECOND DECLARED POSITION IS DECLARED AND NOT READ** — the
    // removal reaches the store's own wholesale `Home::purge` with the handle and no more.
    let positions: Vec<JsVal<'_>> = vec![handle_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let handle = codec.handle_arg(position(&positions, 0));
        store.remove_listener(&handle)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

/// **THE TERMINAL ARM'S OWN ACT, AND NOT A VERB** (`surface.md §2.11` clause 2; `contract.md §7.2` item 2 as
/// amended): the package's seam performs the store's `file`-tier commit as the FIRST act of its passing arm,
/// keyed by the settled record's own `op` identity. **IT IS NOT ONE OF THE CROSSING'S EIGHT VERBS**: the
/// store's declared namespace stays at `8` and no member of either census moves (`§2.11` clause 7;
/// `implementation-plan.md §10.9` row 8). Its one argument is an op id and its answer is `undefined`.
#[napi(js_name = "commitFile")]
fn verb_commit_file(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>, _tail: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **AN ABSENT POSITION IS `None`
    // AND A SUPPLIED `undefined` IS `Some`** (`crossing.md §1.3`), which is the distinction the
    // tail-position protocol turns on. **ITS ONE ARGUMENT IS AN OP ID** (the doc block above says so) and
    // **THE SECOND DECLARED POSITION IS DECLARED AND NOT READ**.
    let positions: Vec<JsVal<'_>> = vec![op_id_pos, _tail];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let op_id = codec.op_id(position(&positions, 0));
        let JsOpIdArg::Str(token) = &op_id else {
            return Err(Refusal {
                status: "JournalOpUnknown".to_string(),
                message: "'the terminal arm's act' is keyed by the settled record's own op \
                          identity, and this argument is not one"
                    .to_string(),
            });
        };
        store.commit_file(token)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

// **⟶ `js_undefined` STOOD HERE AND IS DELETED AT THE DEAD-SURFACE SWEEP** (`docs/open-items-review.md`
// `§2` row 4's class). **Its own documentation, re-emitted rather than lost:** *"The runtime's own
// `undefined`, where a position is SUPPLIED but carries no value — never a null pointer, which is what an
// ABSENT position is."* **It had NO caller.** The supplied-`undefined` position travels through
// `Codec::address`/`Codec::tier`/`Codec::op_id`/`Codec::handle_arg`/`Codec::value`, each of which reads the
// VALUE the runtime handed rather than manufacturing one; the one place this file needs the runtime's
// `undefined` on the copy OUT is `Codec::undefined_value`, which is live (`§2.7` item 2's record member).
// **No byte of a live path is touched by the deletion: the helper had no caller.**

impl<'e> Codec<'e> {
    /// A position the call did not supply is ABSENT — the arity reading of `crossing.md §1.3`'s
    /// absent-versus-`undefined` rule, rule 1, taken at the JS boundary because the callee is the only
    /// place the call's own arity is observable. **The library's `Array` conversion hands the positions as
    /// the values the runtime supplied, so an absent position is `None` and a SUPPLIED `undefined` is
    /// `Some`** — the two states this rule exists to keep apart.
    fn address(&self, value: Option<&JsVal<'_>>) -> JsAddressArg {
        match value {
            Some(v) => self.address_of(*v),
            None => JsAddressArg::Absent,
        }
    }

    /// **THE SET POSITION — `listen`'s SECOND argument, an ARRAY OF ADDRESSES** (`contract.md §2.2` item 2;
    /// `PAR-HL-2`). **THE MEMBER COUNT IS THE CALLER'S AND EACH MEMBER IS READ THROUGH THE ADDRESS READER
    /// THE OTHER POSITIONS USE**: a member outside the store's address domain is refused by the package's own
    /// class test before this frame, so what arrives here is a set of list-shaped members — and a shape that
    /// is not list-shaped still crosses as it stands, to be answered by the store's own `AddressMalformed`.
    fn address_set(&self, value: Option<&JsVal<'_>>) -> Vec<JsAddressArg> {
        let Some(array) = value else {
            return Vec::new();
        };
        let mut out = Vec::new();
        for element in self.elements(*array) {
            out.push(self.address_of(element));
        }
        out
    }

    fn tier(&self, value: Option<&JsVal<'_>>) -> JsTierArg {
        match value {
            Some(v) => self.tier_of(*v),
            None => JsTierArg::Absent,
        }
    }

    fn op_id(&self, value: Option<&JsVal<'_>>) -> JsOpIdArg {
        match value {
            Some(v) => self.op_id_of(*v),
            None => JsOpIdArg::Absent,
        }
    }

    fn handle_arg(&self, value: Option<&JsVal<'_>>) -> JsHandleArg {
        match value {
            Some(v) => self.handle_arg_of(*v),
            None => JsHandleArg::Absent,
        }
    }

    fn value(&self, value: Option<&JsVal<'_>>) -> JsValue {
        match value {
            Some(v) => self.value_of(*v),
            // An ABSENT value reaches the store's own taxonomy as a shapeless value: the JS side spells it
            // as the outside class, and the store answers its own `ValueNotAdmitted` (`DD-46`).
            None => JsValue::Undefined,
        }
    }
}

/// **THE CALL'S ARGUMENTS, ELEMENT FOR ELEMENT** — the array every per-verb entry is handed.
///
/// **ELEMENT ZERO IS THE RECEIVER AND THE VERB'S OWN POSITIONS BEGIN AT ELEMENT ONE** (`contract.md §2` item
/// 1; `receiver-and-refusal.md §1`): the package passes the store object it published at position `0` of the
/// call and the verb's own arguments after it, so **NO ENTRY OF THE NINE TAKES A LEADING INSTANCE
/// POSITION** (`export-set-and-dispatch.md §4`) and **an integer handed at the entry's own position `0` —
/// the package's position `1` — is a value the verb's own first carrier refuses** (`S-NO-INSTANCE`; `F-3`).
///
/// **EVERY ELEMENT THE RUNTIME SUPPLIED IS KEPT AS IT STANDS** — a hole yields nothing and is skipped, and
/// a SUPPLIED `undefined` is kept, which is the absent-versus-`undefined` distinction of
/// `crossing.md §1.3` read at the boundary.
/// **THE CALL'S OWN REFUSAL FOR A RECEIVER THAT IS NOT ONE** — one form, one observable
/// (`receiver-and-refusal.md §3`).
fn not_a_receiver() -> Refusal {
    Refusal {
        status: "AddressMalformed".to_string(),
        message: "the receiver position is not the store object this addon's storeCreate returned".to_string(),
    }
}


/// **THE ONE LANDING EVERY PER-VERB ENTRY TAKES**: a refusal is THROWN AS THE VALUE by [`throw_refusal`] and
/// the frame answers `undefined` behind the pending exception — **no `Result` arm carrying a library error is
/// returned, which is the obligation that keeps the form** (`P-ADA-3`, `F-4`).
fn answer_or_throw(env: Env, answer: Result<JsVal<'static>, Refusal>) -> NapiRet<'static> {
    match answer {
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            Ok(make_undefined(&env))
        }
        Ok(value) => Ok(value),
    }
}

/// The addon's `register(instance, handleArgWire, listenerSlot)`: **THE REGISTRATION SITE, OVER THE CORE**
/// (`surface.md §2.4` item 5). The handle crosses at `JsHandleArg`'s own spellings, so **every outside
/// value — a bare token, a blank token, a fabricated or non-opaque value, an absent argument, and a handle a
/// FOREIGN instance minted — answers a refusal, and NOTHING reaches the store in any of them.**
///
/// **⟶ AND THE REFUSAL IS THE ONE FORM, IN THE STORE'S OWN CODE (`A76`; `surface.md §2.5` item 5 (g); `DD-40`).**
/// **THE SHIPPED ARM TRANSLATED IT TO A JS `TypeError` CARRYING NO `status`** — the form the bounded
/// correction pass declared, and the form the `A76` pass REPLACED: *"the registration site's refusal IS a
/// rejection under `A76` and travels in THIS section's single form, with its `status` drawn from the store's
/// closed set … and a `status` of `TypeError`, reached at the addon's own boundary, is that FINDING and not a
/// declared form, because the store's closed set holds no such member."* **SO THIS ARM THROWS THE ONE FORM,
/// with the core's own `AddressMalformed` and the store's generator's own string, and the `TypeError` helper
/// is GONE FROM THIS FILE.**
/// **THE ENTRY IS ANNOTATED AND ITS TWO-POSITION ARITY IS UNMOVED** (`contract.md §2` item 3).
#[napi]
pub fn register(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>, listener_slot: JsVal<'_>) -> NapiRet<'static> {
    // **THE RECEIVER IS THE STORE OBJECT ITSELF** (`js-unwrap.md §4`'s successor sentence): the registration
    // path does NOT stop addressing a store, it resolves one a different way — *"it hands NOTHING for the
    // store's identity, because the call's own receiver IS the identity"* — and `register` KEEPS ITS ARITY
    // `2` UNMOVED (`export-set-and-dispatch.md §1`): **the handle and the listener's own slot, declared as
    // TWO POSITIONS HERE SO THE ARITY IS A PROPERTY OF THE SIGNATURE AND NOT OF A COUNT ANYTHING TAKES.**
    //
    // **AND THE LISTENER'S POSITION IS DECLARED AND NOT READ** — the FUNCTION itself never crosses
    // (`DD-15`): the mapping layer holds it in its own per-instance registry, and this entry is asked only
    // whether the HANDLE is a member of the instance's own domain.
    let positions: Vec<JsVal<'_>> = vec![handle_pos, listener_slot];
    let store_index = match store_index_of(&env, Some(&receiver)) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let handle = codec.handle_arg(position(&positions, 0));
    // **THE CORE IS THE SITE'S OWN JUDGE**: it holds the instance's handle domain (`§2.4` item 5 (c)) and
    // answers an outside handle with the store's own `AddressMalformed` and a generated message.
    // **⟶ THE PLACEHOLDER CLOSURE IS GONE (`F-13`; `U-11`): `JsListener::Function(Box::new(|_| ()))` WAS A
    // SLOT NOTHING COULD INVOKE.** **The FUNCTION itself never crosses** (`DD-15`): the mapping layer holds
    // it in its own per-instance registry (`index.mjs`'s `state.registry`, `U-12`), and the addon is asked
    // only whether the HANDLE is a member of this instance's own domain — so it hands the core the HANDLE
    // and no listener at all, and the core keeps no list of functions.
    let answer = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        match instances.get_mut(store_index as usize) {
            Some(store) => store.register(&handle),
            None => Err(crossing::registration_refusal(
                "",
                "the addon's first argument",
                "an instance id the package holds no instance at",
            )),
        }
    });
    if let Err(refusal) = answer {
        throw_refusal(&env, &refusal);
    }
    // Nothing of the registry is held here or in the core: the caller's FUNCTION is the package's own state
    // (`§2.4`), and this layer's whole answer is the domain's (`§2.4` item 5 (c)).
    Ok(make_undefined(&env))
}

// **⟶ `handle_token` STOOD HERE AND IS DELETED AT THE DEAD-SURFACE SWEEP** (`docs/open-items-review.md`
// `§2` row 4's class). **Its own documentation, re-emitted rather than lost:** *"The token a `JsHandleArg`
// names, where it names one — the outside forms name none."* **NO path in this file ever called it** — the
// token a registration site reads is the CORE's own read of the handle (`Instance::register` takes the
// `JsHandleArg` itself and answers the store's own refusal), so the spelling never crosses back into this
// layer. **The deletion removes a second route to a token, which is the point: the core is the site's own
// judge (`surface.md §2.4` item 5 (c)).**

/// The addon's `version() -> string` — **THE STAMPED SELF-REPORT** (`release.md §2.4` item 1;
/// `docs/specs/storeroom-js/package.md §6.1` item 2 and its read-mechanism clause).
///
/// **THE READ IS `option_env!` AND NOT `env!`, AND THAT IS A COMPILER FACT RATHER THAN A PREFERENCE:**
/// `env!` is evaluated at compile time and is a COMPILE ERROR where the variable is not set, so a read
/// of `env!("STOREROOM_JS_PACKAGE_VERSION")` could never fall back — and the absent-manifest case is
/// the very state the fallback prices (`§6.10` item 2). **The three states the two macros divide are
/// distinct and none is collapsed here: (i) the directive was emitted — `Some(that value)`, and NO
/// fallback runs, `""` included, because an empty string is a value that was READ; (ii) the directive
/// was not emitted at all — `None`, the ONLY branch that takes the crate's version; (iii) the manifest
/// answered a non-string — the build script emits whatever it read, and the outside value is answered
/// at `parameter-semantics.md §5.1`.**
///
/// **`env!("CARGO_PKG_VERSION")` IS A COMPILE-TIME SUBSTITUTION AND IS NOT A CONSULTATION** (`A96`):
/// it is neither a member of `§5.0a` item (1)'s five-member closed set nor a violation of it.
/// **Its value — the crate's own `Cargo.toml` version — is DELIBERATELY INDEPENDENT of the package
/// manifest's** (`release.md §2.2`), so a build that loses the directive answers the crate's version:
/// legal in a development build, illegal in a release build, and enforced outside the crate by the
/// release's own pre-publish guard (`§1.4a`; `DEF-19`).
/// **THE ENTRY IS ANNOTATED RATHER THAN HAND-EXPORTED** — `binding-crate-and-abi.md §2`'s deletion table,
/// row 5: the `export(env, exports, name, fn)` call that built the old table is GONE and **the annotation
/// replaces it**, its own edit-time argument list being the arity the runtime reads. **THE NAME AND THE
/// ARITY ARE UNMOVED** (`contract.md §2` item 3): `version` takes NO argument and answers a string.
#[napi]
pub fn version(_env: Env) -> String {
    option_env!("STOREROOM_JS_PACKAGE_VERSION")
        .unwrap_or(env!("CARGO_PKG_VERSION"))
        .to_string()
}

/// The addon's `addonErrorMessage(code, subject) -> string` — **THE STORE'S OWN GENERATOR, REACHED FROM
/// THE JS SIDE** (`§2.5` item 2: *"`message` is the store's own GENERATED message VERBATIM — never
/// hand-authored by the package"*). It is reached by the package's own internal step and by nothing else,
/// and its one caller is the entry's DECLARED absent/failed-addon state (`A75`), where the generator is the
/// only lawful author of the string and the addon is the only thing that carries it.
///
/// **⟶ AND ONE OPTIONAL THIRD ARGUMENT IS ADDED 2026-10-17: THE CONTAINER**, so the generator's own
/// `<container>` slot can carry the container the mismatch was found in
/// (`docs/specs/storeroom-js/surface.md` §2.5 item 5 (a)–(b) and the `CF-3` authority split;
/// `docs/specs/storeroom-native/contract.md` §8.2's `MessageArgs.container` — *"the container or node the
/// mismatch was found in: `''` for the register, a dotted path otherwise"*). **AN OMITTED THIRD ARGUMENT
/// IS `MessageArgs.container`'s DEFAULT**, which is what the two-argument call has always produced and what
/// every other caller of this export still gets: **NOT ONE BYTE OF THE GENERATOR'S OUTPUT MOVES WHERE NO
/// CONTAINER IS SUPPLIED**, and the STORE's own bytes are untouched by this function at every input (it
/// reaches the generator; it never mints a code and never authors a sentence). **WHAT IT CHANGES,
/// EXACTLY: a caller that supplies a container gets the generator's own rendering AT THAT SLOT —
/// `the number 1.5 is not a legal address segment in 'a'` — where it previously got the default `''`; and
/// nothing else about this function's answer moves.**
/// **THE ENTRY IS ANNOTATED AND ITS THREE-POSITION ARITY IS UNMOVED** (`contract.md §2` item 3): the
/// annotation's own edit-time argument list IS the arity the runtime reads, so the hand-written
/// `napi_get_cb_info` walk that used to unpack this call is GONE with the shim that carried it.
#[napi]
pub fn errorMessage(
    env: Env,
    code: String,
    subject: JsVal<'_>,
    container: Option<JsVal<'_>>,
) -> String {
    // **THE SUBJECT REACHES THE GENERATOR THROUGH THE SENTINEL READ AND NOT THROUGH THE LIBRARY'S OWN
    // `String` CONVERSION, AND THE REASON IS A MEASURED BEHAVIOUR THIS ENTRY ALREADY HAD.** `read_string` —
    // the shim the annotation replaced — read every position with [`arg_string`], whose **non-string class
    // is the empty-string sentinel** (`facade.rs:120`: *"The string a JS `string` value carries, or the
    // empty-string sentinel where the bytes are not one"*). **The library's own `String` parameter is
    // STRICTER THAN THAT and THROWS a `napi::Error` *before the frame is entered*** when the position holds
    // any non-string — measured: `errorMessage('AddressNotFound', {…})` answered the generator's own `''`
    // rendering at HEAD and threw *"Failed to convert JavaScript value … into rust type `String`"* under the
    // annotated form. **THE ARITY IS WHAT THE CLAUSE PINS** (`binding-crate-and-abi.md §2`: the five entry
    // functions *"keep their names and arities"*; *"their argument counts are unmoved"*) and **it is unmoved
    // here — three JS positions, in this order** — while the CLASS of the second is this entry's own
    // pre-existing read and not a term of the amendment. **`implementation-plan.md §3`: *"the wire is
    // byte-identical, so the node suite's cells must not move."*** **AND NO REFUSAL PATH IS TOUCHED EITHER
    // WAY**: this entry throws no refusal at all, and the arm below reaches the generator and nothing else.
    let subject = arg_string(&env, &subject);

    // **THE THIRD SLOT IS READ ONLY WHERE THE CALLER SUPPLIED ONE** — an omitted slot leaves the null
    // pointer in place, so the container stays `None` and the generator's own default stands, exactly as it
    // stood before this argument existed.
    let container = container.map(|value| arg_string(&env, &value));
    // **⟶ AND THE FOURTH SLOT IS THE CONTAINERSEGMENT, ADDED 2026-10-17 (`DEF-2026-10-17-E`'s second
    // branch).** The clause's own split is exact, and this is the FIRST HALF OF IT: the SUBJECT of the
    // available clause is *"the container's OWN segment spelling — the last string-key segment of the
    // address at which the container stands … and `keys` where the container has no segment spelling of its
    // own (the REGISTER, whose address is empty)"* (`docs/specs/storeroom-native/contract.md` §8.2's
    // `<CONTAINERSEGMENT>`), so **a caller that supplies the container AS THE ADDRESS'S OWN SPELLING — `''`
    // for the register, a dotted path such as `window.tabs` otherwise — gets this half DERIVED from the
    // container the way the STORE's own trigger derives it** (the last dot-separated segment, `keys` when
    // there is none).
    //
    // **WHY THIS SLOT EXISTS RATHER THAN A NEW BOUNDARY RENDERING, STATED AT ITS OWN SITE:** before it, a
    // package-side caller could fill the container and NOT the segment — the register's own not-found
    // sentence, *"'a' does not exist in '', keys are 'a', 'leaf', 'window'"* (`src/error.rs`'s
    // `address_not_found`), was unreachable from JS, and the `AddressNotFound` refusal of an ORDINARY read
    // was blanked into a container with no content claim at all. **THE DERIVATION IS THE CONTRACT'S OWN AND
    // NOT A SECOND READING OF IT:** it is applied to the string the CALLER supplied, and where that string is
    // not an address's spelling the caller's own fourth argument is omitted and the derivation is simply
    // `keys` — the degenerate arm the clause prints, never a claim about a container the caller did not name.
    //
    // **WHAT DOES NOT MOVE: A CALL THAT SUPPLIES NO FOURTH ARGUMENT TAKES THE SAME DERIVATION FOR FREE** —
    // the store's own `<CONTAINERSEGMENT>` rule has always been a rule over `MessageArgs.container` — **and
    // a call that supplies NEITHER a third NOR a fourth argument leaves the container `None`, so its bytes
    // are byte-for-byte what the two-argument call has always produced** (`16` codes × `14` subjects
    // re-verified on the rebuilt artefact).
    let derived_container_segment = container.as_deref().and_then(|c| {
        c.rsplit('.')
            .next()
            .filter(|s| !s.is_empty() && !s.contains(' '))
            .map(|s| s.to_string())
    });
    let message = storeroom_native::storeErrorMessage(
        &code,
        &storeroom_native::MessageArgs {
            segment: Some(format!("'{subject}'")),
            container,
            keys: derived_container_segment.into_iter().collect(),
            path: Some(subject),
            ..Default::default()
        },
    );
    message
}

// **⟶ THE HAND-BUILT EXPORT TABLE STOOD BELOW AND IS DELETED, TOGETHER WITH EVERY SHIM BESIDE IT.**
//
// `binding-crate-and-abi.md §2`'s deletion table, rows 4 and 5, executed at their own bytes: **the
// `registration()` frame that took the runtime's `exports` object and built one JS function per name with
// `napi_create_function`, the `create_entry_function` helper that spelled the symbol, the five
// `pub unsafe extern "C" fn *_callback(env, info)` trampolines, the `answer()` marshalling frame that
// converted an entry's `Ok` arm into a raw `napi_value`, the `read_string` / `first_argument` /
// `call_arguments` / `register_arguments` argv-unpacking shims, and the `sys::` plumbing they shared — ALL
// GONE.**
//
// **WHAT REPLACED THEM IS THE ANNOTATION, AND IT REPLACES EACH AT ITS OWN JOB:** `#[napi]` on an entry
// function emits the `extern "C"` trampoline the runtime calls, unpacks the caller's argv into the Rust
// parameter types the signature declares (so no `napi_get_cb_info` walk is hand-written), converts the
// answer back through the library's own `ToNapiValue` (so `answer()` has no work left), and REGISTERS the
// name in the module's export table with the arity the signature carries (so no table is hand-built).
//
// **AND THE DELETION IS COMPLETE RATHER THAN PARTIAL, WHICH IS WHAT MAKES IT CHECKABLE:** with the shims
// gone, a name the annotated form does not register is a name the artefact does not export — `P-ADA-6`'s
// symbol read is then a read of the artefact and not of a list this file also maintains.

