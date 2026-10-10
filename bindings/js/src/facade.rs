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
//! **THE FAILURE FORM IS THE CONTRACT'S SINGLE ONE** (`surface.md §2.5`, `DD-12`): the facade THROWS a plain
//! object carrying exactly `{status, message}` and nothing else — never an `Error`, never a `code`, never a
//! `stack`.
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
use std::os::raw::{c_char, c_void};

use crate::crossing::{
    self, JsAddressArg, JsBaseState, JsConfig, JsDeleteReceipt, JsFilePathArg, JsHandle, JsHandleArg,
    JsJournalLengthArg,
    JsJournalOp, JsKey, JsListenerEntry, JsListenersArg, JsNonArray, JsObject, JsOpIdArg,
    JsProto, JsRollbackResult, JsSegment, JsTierArg, JsTierSetItem, JsValue, JsWriteResult, Refusal,
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
// THE NODE-API ABI — the symbols the RUNTIME supplies, declared at their own C signatures.
// =================================================================================================

type NapiEnv = *mut c_void;
type NapiValue = *mut c_void;
type NapiCallbackInfo = *mut c_void;
type NapiStatus = i32;

extern "C" {
    fn napi_get_cb_info(
        env: NapiEnv,
        info: NapiCallbackInfo,
        argc: *mut usize,
        argv: *mut NapiValue,
        this_arg: *mut NapiValue,
        data: *mut *mut c_void,
    ) -> NapiStatus;
    fn napi_create_string_utf8(
        env: NapiEnv,
        s: *const c_char,
        len: usize,
        result: *mut NapiValue,
    ) -> NapiStatus;
    fn napi_get_value_string_utf8(
        env: NapiEnv,
        value: NapiValue,
        buf: *mut c_char,
        bufsize: usize,
        result: *mut usize,
    ) -> NapiStatus;
    fn napi_create_function(
        env: NapiEnv,
        name: *const c_char,
        len: usize,
        cb: Option<extern "C" fn(NapiEnv, NapiCallbackInfo) -> NapiValue>,
        data: *mut c_void,
        result: *mut NapiValue,
    ) -> NapiStatus;
    fn napi_set_named_property(
        env: NapiEnv,
        object: NapiValue,
        name: *const c_char,
        value: NapiValue,
    ) -> NapiStatus;
    fn napi_get_undefined(env: NapiEnv, result: *mut NapiValue) -> NapiStatus;
    fn napi_get_boolean(env: NapiEnv, value: bool, result: *mut NapiValue) -> NapiStatus;
    /// **THE OWN-PROPERTY TEST OF `A76`/`JS-5`** — `napi_get_all_property_names`'s own-key mode is not
    /// needed: this predicate answers whether ONE key is an OWN property of the object, and it takes a JS
    /// `napi_value` KEY rather than a C string.
    fn napi_has_own_property(
        env: NapiEnv,
        object: NapiValue,
        key: NapiValue,
        result: *mut bool,
    ) -> NapiStatus;
    fn napi_get_named_property(
        env: NapiEnv,
        object: NapiValue,
        name: *const c_char,
        result: *mut NapiValue,
    ) -> NapiStatus;
    fn napi_is_array(env: NapiEnv, value: NapiValue, result: *mut bool) -> NapiStatus;
    fn napi_get_array_length(env: NapiEnv, value: NapiValue, result: *mut u32) -> NapiStatus;
    fn napi_get_element(env: NapiEnv, object: NapiValue, index: u32, result: *mut NapiValue) -> NapiStatus;
    fn napi_get_value_double(env: NapiEnv, value: NapiValue, result: *mut f64) -> NapiStatus;
    /// **THE BIGINT READ OF `A76`/`JS-6`** — a JS `bigint` is read as a `bigint` and is NEVER handed to
    /// `napi_get_value_double`, whose failure arm would substitute `0.0` for it.
    fn napi_get_value_bigint_int64(
        env: NapiEnv,
        value: NapiValue,
        result: *mut i64,
        lossless: *mut bool,
    ) -> NapiStatus;
    fn napi_get_value_bool(env: NapiEnv, value: NapiValue, result: *mut bool) -> NapiStatus;
    fn napi_create_uint32(env: NapiEnv, value: u32, result: *mut NapiValue) -> NapiStatus;
    fn napi_get_value_uint32(env: NapiEnv, value: NapiValue, result: *mut u32) -> NapiStatus;
    fn napi_typeof(env: NapiEnv, value: NapiValue, result: *mut i32) -> NapiStatus;
    fn napi_create_object(env: NapiEnv, result: *mut NapiValue) -> NapiStatus;
    fn napi_create_array_with_length(env: NapiEnv, length: usize, result: *mut NapiValue) -> NapiStatus;
    fn napi_set_element(env: NapiEnv, object: NapiValue, index: u32, value: NapiValue) -> NapiStatus;
    fn napi_create_double(env: NapiEnv, value: f64, result: *mut NapiValue) -> NapiStatus;
    fn napi_throw(env: NapiEnv, error: NapiValue) -> NapiStatus;
    // **`napi_create_reference`, `napi_delete_reference`, `napi_get_reference_value` AND
    // `napi_call_function` ARE DELETED FROM THIS DECLARATION LIST WITH `F-13`'s DEAD `invoke_listeners`
    // (`U-9`), TOGETHER WITH THE `NapiRef` ALIAS ABOVE.** They stood here for ONE caller — the invocation of
    // a listener from the facade — and that caller was this file's own dead structure, not a route
    // `A75`/`A77` declares. **The package's invocation is `index.mjs`'s `deliver`, whose call is the
    // runtime's own and needs no Node-API symbol here; nothing else in this facade ever named them.**
    //
    // **⟶ AND TWO MORE DECLARATIONS LEFT THIS LIST AT THE DEAD-SURFACE SWEEP (`docs/open-items-review.md`
    // `§2` row 4, whose named subject is the first of them): `napi_is_exception_pending`, declared here and
    // named by NO live path at any depth — no caller, no reader, no re-export — and `napi_has_named_property`,
    // whose ONE remaining mention was the sentence in `Codec::member`'s own documentation recording that it
    // had CEASED TO BE THE GATE. Both are DELETED, so no declaration in this block stands without a caller:
    // `napi_has_own_property` is the own-property test the codec actually takes (`A76`, `JS-5`), and the
    // exception-pending predicate belongs to no route this facade declares — a refusal travels as the ONE
    // thrown form (`surface.md §2.5`, `DD-12`), thrown by `throw_refusal` and never interrogated here.**
}

/// `napi_valuetype`'s arms, as the runtime numbers them.
const NAPI_UNDEFINED: i32 = 0;
const NAPI_NULL: i32 = 1;
const NAPI_BOOLEAN: i32 = 2;
const NAPI_NUMBER: i32 = 3;
const NAPI_STRING: i32 = 4;
const NAPI_SYMBOL: i32 = 5;
const NAPI_OBJECT: i32 = 6;
/// `napi_valuetype`'s function arm — the one type the registry admits (`PAR-JS-12`).
const NAPI_FUNCTION: i32 = 7;
const NAPI_BIGINT: i32 = 9;

fn as_utf8(name: &str) -> Vec<u8> {
    let mut bytes = name.as_bytes().to_vec();
    bytes.push(0);
    bytes
}

/// The string a JS `string` value carries.
unsafe fn arg_string(env: NapiEnv, value: NapiValue) -> String {
    let mut len: usize = 0;
    if napi_get_value_string_utf8(env, value, std::ptr::null_mut(), 0, &mut len) != 0 {
        return String::new();
    }
    let mut buf = vec![0u8; len + 1];
    let mut written: usize = 0;
    if napi_get_value_string_utf8(env, value, buf.as_mut_ptr() as *mut c_char, len + 1, &mut written) != 0 {
        return String::new();
    }
    buf.truncate(written);
    String::from_utf8_lossy(&buf).into_owned()
}

unsafe fn make_string(env: NapiEnv, text: &str) -> NapiValue {
    let mut out: NapiValue = std::ptr::null_mut();
    napi_create_string_utf8(env, text.as_ptr() as *const c_char, text.len(), &mut out);
    out
}

/// **THE FAILURE FORM, THROWN** (`surface.md §2.5` item 3, `DD-12`): a plain object whose member set is
/// EXACTLY `{status, message}`.
unsafe fn throw_refusal(env: NapiEnv, refusal: &Refusal) -> NapiValue {
    let mut object: NapiValue = std::ptr::null_mut();
    napi_create_object(env, &mut object);
    let status = as_utf8("status");
    let message = as_utf8("message");
    let status_value = make_string(env, &refusal.status);
    let message_value = make_string(env, &refusal.message);
    napi_set_named_property(env, object, status.as_ptr() as *const c_char, status_value);
    napi_set_named_property(env, object, message.as_ptr() as *const c_char, message_value);
    napi_throw(env, object);
    let mut undefined: NapiValue = std::ptr::null_mut();
    napi_get_undefined(env, &mut undefined);
    undefined
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
//            (`index.mjs` returns it unwrapped and `segment` reads `NAPI_BOOLEAN`), so `{bad:'bool'}`
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

struct Codec {
    env: NapiEnv,
}

impl Codec {
    /// **ONE MEMBER OF A NODE-API OBJECT, READ AS AN OWN PROPERTY OR NOT AT ALL** — the facade's own half of
    /// `A76`'s ruling and of gate 4's `JS-5`, whose finding was that *"`src/facade.rs`'s `Codec::member`"*
    /// read *"through the PROTOTYPE CHAIN for every wire member"*, so *"a wire object carrying a
    /// prototype-inherited `address`/`handle` is read as an entry field"*.
    ///
    /// **THE OWN-PROPERTY TEST IS `napi_has_own_property`, AND `napi_has_named_property` — WHICH WALKS THE
    /// CHAIN — IS NO LONGER THE GATE, AND IS NO LONGER DECLARED.** Once the key has been found OWN,
    /// `napi_get_named_property` can only
    /// return that own member (an own property shadows every inherited one), so the pair is an own-property
    /// read with no chain lookup anywhere on it. **A key reached only through the prototype chain is
    /// ABSENT (`None`), and absence is what the crossing's absent-versus-`undefined` rule reads** — while
    /// the CLASS that carried the inherited key was already refused at the package's own boundary, before
    /// this codec ever saw it.
    unsafe fn member(&self, object: NapiValue, name: &str) -> Option<NapiValue> {
        // A primitive carries no member of its own; `null`/`undefined` carry none at all.
        match self.kind_of(object) {
            NAPI_OBJECT | NAPI_FUNCTION => {}
            _ => return None,
        }
        let key = make_string(self.env, name);
        let mut has: bool = false;
        if napi_has_own_property(self.env, object, key, &mut has) != 0 || !has {
            return None;
        }
        let spelled = as_utf8(name);
        let mut out: NapiValue = std::ptr::null_mut();
        if napi_get_named_property(self.env, object, spelled.as_ptr() as *const c_char, &mut out) != 0 {
            return None;
        }
        Some(out)
    }

    unsafe fn string_of(&self, value: NapiValue) -> String {
        let mut len: usize = 0;
        if napi_get_value_string_utf8(self.env, value, std::ptr::null_mut(), 0, &mut len) != 0 {
            return String::new();
        }
        let mut buf = vec![0u8; len + 1];
        let mut written: usize = 0;
        if napi_get_value_string_utf8(self.env, value, buf.as_mut_ptr() as *mut c_char, len + 1, &mut written) != 0 {
            return String::new();
        }
        buf.truncate(written);
        String::from_utf8_lossy(&buf).into_owned()
    }

    unsafe fn bool_of(&self, value: NapiValue) -> bool {
        let mut out: bool = false;
        if napi_get_value_bool(self.env, value, &mut out) != 0 {
            return false;
        }
        out
    }

    /// **THE NUMBER READ, CLASS-FIRST** — `A76`'s part (1) and gate 4's `JS-6`: *"the facade's number read
    /// must never be handed a `bigint`"*. The shipped arm called `napi_get_value_double` unconditionally and
    /// returned `0.0` where the call failed, so **a `bigint` payload was carried through the NUMBER ARM TO
    /// `0`** — a substituted token the caller never spelled. **THE CLASS IS NOW READ FIRST, ON THE VALUE AS
    /// IT IS (`napi_typeof`), AND A VALUE THAT IS NOT A JS `number` IS NEVER HANDED TO THE DOUBLE READ AT
    /// ALL: `None` is the caller's answer, and each caller carries the value's OWN class instead of a
    /// default.**
    unsafe fn number_of(&self, value: NapiValue) -> Option<f64> {
        if self.kind_of(value) != NAPI_NUMBER {
            return None;
        }
        let mut out: f64 = 0.0;
        if napi_get_value_double(self.env, value, &mut out) != 0 {
            return None;
        }
        Some(out)
    }

    /// **THE BIGINT READ, CLASS-FIRST** — a JS `bigint` read AS a `bigint`, never through the numeric arm
    /// (`A76`, `JS-6`). `lossless` reports whether the value fits the store's own carried `i64`; **the class
    /// alone decides the refusal** (`JsJournalLengthArg::BigInt` → `JournalLengthArg::Object` →
    /// `AddressMalformed`, and `JsValue::BigInt` → `StoreValue::BigInt` → `ValueNotAdmitted`), so a value
    /// beyond the carrier's range changes no answer and is never substituted for by a number.
    unsafe fn bigint_of(&self, value: NapiValue) -> i64 {
        let mut out: i64 = 0;
        let mut lossless: bool = false;
        if napi_get_value_bigint_int64(self.env, value, &mut out, &mut lossless) != 0 {
            return 0;
        }
        out
    }

    /// **THE CLASS OF A PAYLOAD THE ARM IT ARRIVED IN DID NOT NAME** (`A76`'s class-first reading, at the
    /// only site where a wire member's own class can contradict its tag): the payload's OWN class decides
    /// and nothing is coerced into the arm's. **It is unreachable from the shipped package** — the mapping
    /// layer encodes each arm with a payload of that arm's own class — and it exists so that a
    /// hand-built wire cannot smuggle a `bigint` through the number arm.
    unsafe fn classed_value(&self, payload: NapiValue) -> JsValue {
        match self.kind_of(payload) {
            NAPI_STRING => JsValue::Str(self.string_of(payload)),
            NAPI_BOOLEAN => JsValue::Bool(self.bool_of(payload)),
            NAPI_NUMBER => JsValue::Num(self.number_of(payload).unwrap_or(f64::NAN)),
            NAPI_BIGINT => JsValue::BigInt(self.bigint_of(payload)),
            NAPI_UNDEFINED => JsValue::Undefined,
            NAPI_NULL => JsValue::Null,
            NAPI_FUNCTION => JsValue::Function,
            NAPI_SYMBOL => JsValue::Symbol,
            // An object payload is NOT read (no member is taken from it): its class is the outside one.
            _ => JsValue::NonPlainCollection,
        }
    }

    unsafe fn kind_of(&self, value: NapiValue) -> i32 {
        let mut kind: i32 = 0;
        napi_typeof(self.env, value, &mut kind);
        kind
    }

    unsafe fn is_array(&self, value: NapiValue) -> bool {
        let mut out: bool = false;
        if napi_is_array(self.env, value, &mut out) != 0 {
            return false;
        }
        out
    }

    /// The elements of a JS array, in index order — **a DENSE walk, because a hole is a decision the JS
    /// boundary has already taken and carried as `{k:'H'}` (`crossing.md §1.4` item 2, `DD-8`).**
    unsafe fn elements(&self, array: NapiValue) -> Vec<NapiValue> {
        let mut len: u32 = 0;
        if napi_get_array_length(self.env, array, &mut len) != 0 {
            return Vec::new();
        }
        let mut out = Vec::with_capacity(len as usize);
        for index in 0..len {
            let mut element: NapiValue = std::ptr::null_mut();
            if napi_get_element(self.env, array, index, &mut element) == 0 {
                out.push(element);
            }
        }
        out
    }

    /// **THE COPY IN** (`crossing.md §1.1` clause 1): the JS side's own encoded value, translated into the
    /// core's model — read ONCE, member by member, and never retained.
    unsafe fn value_of(&self, v: NapiValue) -> JsValue {
        let tag = match self.member(v, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsValue::NonPlainCollection,
        };
        match tag.as_str() {
            "s" => JsValue::Str(self.member(v, "v").map(|x| self.string_of(x)).unwrap_or_default()),
            "b" => JsValue::Bool(self.member(v, "v").map(|x| self.bool_of(x)).unwrap_or(false)),
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
                let proto = match self.member(v, "p").map(|x| self.string_of(x)).unwrap_or_default().as_str() {
                    "null" => JsProto::Null,
                    "foreign" => JsProto::ForeignPlain,
                    "class" => JsProto::Class,
                    _ => JsProto::Plain,
                };
                let has_accessor = self.member(v, "acc").map(|x| self.bool_of(x)).unwrap_or(false);
                let proxied = self.member(v, "proxy").map(|x| self.bool_of(x)).unwrap_or(false);
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
    unsafe fn segment(&self, v: NapiValue) -> JsSegment {
        match self.kind_of(v) {
            NAPI_STRING => JsSegment::Key(self.string_of(v)),
            // The class was just read as `number`, so the read below cannot fail; where it somehow did, the
            // value is carried as the outside class `Object` rather than substituted by `0` (`A76`).
            NAPI_NUMBER => match self.number_of(v) {
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
            NAPI_BOOLEAN => JsSegment::Bool(self.bool_of(v)),
            NAPI_FUNCTION => JsSegment::Function,
            _ => {
                match self.member(v, "bad").map(|x| self.string_of(x)).unwrap_or_default().as_str() {
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
    unsafe fn address_of(&self, a: NapiValue) -> JsAddressArg {
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
                let inner = self.member(a, "o").map(|o| self.segment(o)).unwrap_or(JsSegment::Object);
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
    unsafe fn tier_set_item(&self, item: NapiValue) -> JsTierSetItem {
        match self.kind_of(item) {
            NAPI_STRING => JsTierSetItem::Token(self.string_of(item)),
            NAPI_NUMBER => match self.number_of(item) {
                Some(n) => JsTierSetItem::Number(n),
                None => JsTierSetItem::Object, // the class was already read as `number` (`A76`)
            },
            NAPI_BOOLEAN => JsTierSetItem::Bool(self.bool_of(item)),
            NAPI_FUNCTION => JsTierSetItem::Function,
            _ => match self.member(item, "bad").map(|x| self.string_of(x)).unwrap_or_default().as_str() {
                "null" => JsTierSetItem::Null,
                "undefined" => JsTierSetItem::Undefined,
                "function" => JsTierSetItem::Function,
                _ => JsTierSetItem::Object,
            },
        }
    }

    /// `crossing.md §1.3`'s `TierArg` table, `7` rows. **The JS boundary reads the call's own ARITY and
    /// folds a supplied `undefined` to the ABSENT row** (`§1.3`'s absent-versus-`undefined` rule, rule 1).
    unsafe fn tier_of(&self, t: NapiValue) -> JsTierArg {
        let tag = match self.member(t, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsTierArg::Absent,
        };
        match tag.as_str() {
            "A" => JsTierArg::Absent,
            "N" => JsTierArg::Null,
            "U" => JsTierArg::Undefined,
            "T" => JsTierArg::Token(self.member(t, "v").map(|x| self.string_of(x)).unwrap_or_default()),
            "S" => JsTierArg::Set(
                self.member(t, "i")
                    .map(|list| self.elements(list))
                    .unwrap_or_default()
                    .iter()
                    .map(|item| self.tier_set_item(*item))
                    .collect(),
            ),
            "B" => JsTierArg::Bool(self.member(t, "v").map(|x| self.bool_of(x)).unwrap_or(false)),
            // The number arm, read class-first: a payload that is not a number answers `Object` — row 6's
            // `OutOfDomainTier` — rather than being substituted by `0` (`A76`).
            "D" => JsTierArg::Number(self.member(t, "v").and_then(|x| self.number_of(x)).unwrap_or(f64::NAN)),
            "F" => JsTierArg::Function,
            _ => JsTierArg::Object,
        }
    }

    /// `crossing.md §1.3`'s `OpIdArg` table, `6` rows.
    unsafe fn op_id_of(&self, o: NapiValue) -> JsOpIdArg {
        let tag = match self.member(o, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsOpIdArg::Absent,
        };
        match tag.as_str() {
            "s" => JsOpIdArg::Str(self.member(o, "v").map(|x| self.string_of(x)).unwrap_or_default()),
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
    unsafe fn handle_arg_of(&self, h: NapiValue) -> JsHandleArg {
        let tag = match self.member(h, "k") {
            Some(tag) => self.string_of(tag),
            None => return JsHandleArg::NonOpaque,
        };
        match tag.as_str() {
            "O" => JsHandleArg::Opaque(JsHandle::from_token(
                &self.member(h, "v").map(|x| self.string_of(x)).unwrap_or_default(),
            )),
            "B" => JsHandleArg::Bare(self.member(h, "v").map(|x| self.string_of(x)).unwrap_or_default()),
            "A" => JsHandleArg::Absent,
            _ => JsHandleArg::NonOpaque,
        }
    }

    /// `surface.md §2.1` / `DD-36`: `cfg` carries the store's THREE declared keys and no fourth. **Each
    /// key's ABSENCE is the member's own absence** — `crossing.md §1.3`'s absent-versus-`undefined` rule
    /// reads a `cfg` key by `in`-MEMBERSHIP, and `None` IS that absence (`§4.5` item 2's `Option` row).
    unsafe fn config(&self, cfg: NapiValue) -> JsConfig {
        let file_path = self.member(cfg, "filePath").map(|v| match self.kind_of(v) {
            NAPI_STRING => {
                let text = self.string_of(v);
                if text.is_empty() {
                    JsFilePathArg::Empty
                } else {
                    JsFilePathArg::Str(text)
                }
            }
            NAPI_NULL => JsFilePathArg::Null,
            NAPI_UNDEFINED => JsFilePathArg::Undefined,
            _ => JsFilePathArg::NonString,
        });
        let journal_length = self.member(cfg, "journalLength").map(|v| match self.kind_of(v) {
            NAPI_NUMBER => match self.number_of(v) {
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
            NAPI_STRING => JsJournalLengthArg::NumericString(self.string_of(v)),
            NAPI_BOOLEAN => JsJournalLengthArg::Bool(self.bool_of(v)),
            // **`A76`/`JS-6`: A `bigint` ARRIVES AS A `bigint`** — it is read as its own class by
            // `napi_get_value_bigint_int64` and is NEVER handed to the number read, where the failure arm
            // would have substituted `0` for the caller's `10n`. The declared answer is unchanged: row 11's
            // `AddressMalformed`, reached through the class and not through a coerced token.
            NAPI_BIGINT => JsJournalLengthArg::BigInt(self.bigint_of(v)),
            NAPI_NULL => JsJournalLengthArg::Null,
            NAPI_UNDEFINED => JsJournalLengthArg::Undefined,
            NAPI_FUNCTION => JsJournalLengthArg::Function,
            _ => JsJournalLengthArg::Object,
        });
        let listeners = self.member(cfg, "listeners").map(|v| {
            if !self.is_array(v) {
                return match self.kind_of(v) {
                    NAPI_NULL => JsListenersArg::Null,
                    NAPI_UNDEFINED => JsListenersArg::Undefined,
                    _ => JsListenersArg::NonArray,
                };
            }
            let entries = self
                .elements(v)
                .iter()
                .map(|entry| {
                    if self.is_array(*entry) || self.kind_of(*entry) != NAPI_OBJECT {
                        return JsListenerEntry::Other;
                    }
                    let (Some(address), Some(handle)) =
                        (self.member(*entry, "address"), self.member(*entry, "handle"))
                    else {
                        return JsListenerEntry::Other;
                    };
                    if self.kind_of(handle) != NAPI_STRING {
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
}

// -------------------------------------------------------------------------------------------------
// The copy OUT — the core's own records and values, written as fresh Node-API values.
// -------------------------------------------------------------------------------------------------

impl Codec {
    unsafe fn object(&self, members: Vec<(&str, NapiValue)>) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_create_object(self.env, &mut out);
        for (name, value) in members {
            let spelled = as_utf8(name);
            napi_set_named_property(self.env, out, spelled.as_ptr() as *const c_char, value);
        }
        out
    }

    unsafe fn array(&self, items: Vec<NapiValue>) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_create_array_with_length(self.env, items.len(), &mut out);
        for (index, item) in items.into_iter().enumerate() {
            napi_set_element(self.env, out, index as u32, item);
        }
        out
    }

    /// A value's own tag member beside the payload the JS side reads it by.
    unsafe fn tagged(&self, tag: &str, payload: NapiValue) -> NapiValue {
        self.object(vec![("k", self.string_value(tag)), ("v", payload)])
    }

    /// One member set on an object this codec built — the record's own triggering address (`§2.7` item 2).
    unsafe fn set_member(&self, object: NapiValue, name: &str, value: NapiValue) {
        let spelled = as_utf8(name);
        napi_set_named_property(self.env, object, spelled.as_ptr() as *const c_char, value);
    }

    unsafe fn string_value(&self, text: &str) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_create_string_utf8(self.env, text.as_ptr() as *const c_char, text.len(), &mut out);
        out
    }

    unsafe fn number_value(&self, n: f64) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_create_double(self.env, n, &mut out);
        out
    }

    unsafe fn bool_value(&self, b: bool) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_get_boolean(self.env, b, &mut out);
        out
    }

    unsafe fn undefined_value(&self) -> NapiValue {
        let mut out: NapiValue = std::ptr::null_mut();
        napi_get_undefined(self.env, &mut out);
        out
    }

    /// **THE COPY OUT** (`crossing.md §1.1` clause 2): a store value converted into FRESH JS-owned data,
    /// at `crossing.md §1.2`'s own classes — so the JS side holds no reference into store-owned data.
    unsafe fn to_js_value(&self, v: &JsValue) -> NapiValue {
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

    unsafe fn to_js_segments(&self, segments: &[JsSegment]) -> NapiValue {
        self.array(
            segments
                .iter()
                .map(|segment| match segment {
                    JsSegment::Key(k) => self.string_value(k),
                    JsSegment::Index(i) => self.number_value(*i as f64),
                    JsSegment::Negative(i) => self.number_value(*i as f64),
                    JsSegment::Fractional(f) => self.number_value(*f),
                    JsSegment::Null => self.object(vec![("bad", self.string_value("null"))]),
                    JsSegment::Undefined => self.object(vec![("bad", self.string_value("undefined"))]),
                    JsSegment::Bool(b) => self.bool_value(*b),
                    JsSegment::Object => self.object(vec![("bad", self.string_value("object"))]),
                    JsSegment::Array => self.object(vec![("bad", self.string_value("array"))]),
                    JsSegment::Function => self.object(vec![("bad", self.string_value("function"))]),
                })
                .collect(),
        )
    }

    unsafe fn to_js_base_state(&self, state: &JsBaseState) -> NapiValue {
        self.object(vec![
            ("present", self.bool_value(state.present)),
            ("value", self.to_js_value(&state.value)),
        ])
    }

    unsafe fn to_js_journal_op(&self, op: &JsJournalOp) -> NapiValue {
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

    unsafe fn to_js_handles(&self, handles: &[JsHandle]) -> NapiValue {
        self.array(
            handles
                .iter()
                .map(|handle| self.string_value(handle.token()))
                .collect(),
        )
    }

    unsafe fn to_js_write_result(&self, r: &JsWriteResult) -> NapiValue {
        let watched = r
            .watched
            .iter()
            .map(|address| self.to_js_segments(address))
            .collect();
        self.object(vec![
            ("op", self.to_js_journal_op(&r.op)),
            ("watched", self.array(watched)),
            ("triggered", self.to_js_handles(&r.triggered)),
        ])
    }

    unsafe fn to_js_delete_receipt(&self, r: &JsDeleteReceipt) -> NapiValue {
        self.object(vec![
            ("address", self.to_js_segments(&r.address)),
            ("tiers", self.array(r.tiers.iter().map(|t| self.string_value(t)).collect())),
            ("triggered", self.to_js_handles(&r.triggered)),
        ])
    }

    unsafe fn to_js_rollback_result(&self, r: &JsRollbackResult) -> NapiValue {
        self.object(vec![
            ("opId", self.string_value(&r.opId)),
            ("undoneOps", self.array(r.undoneOps.iter().map(|id| self.string_value(id)).collect())),
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

/// The addon's `create(cfgWire) -> uint32`: the store's construction, through the core.
extern "C" fn addon_create(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
    let mut argc: usize = 2;
    let mut argv: [NapiValue; 2] = [std::ptr::null_mut(); 2];
    let mut this: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_cb_info(env, info, &mut argc, argv.as_mut_ptr(), &mut this, std::ptr::null_mut());
    }
    let codec = Codec { env };
    let config = unsafe { codec.config(argv[0]) };
    match crossing::create(&config) {
        Err(refusal) => unsafe { throw_refusal(env, &refusal) },
        Ok(instance) => {
            let index = INSTANCES.with(|all| {
                let mut all = all.borrow_mut();
                all.push(instance);
                all.len() - 1
            });
            let mut out: NapiValue = std::ptr::null_mut();
            unsafe {
                napi_create_uint32(env, index as u32, &mut out);
            }
            out
        }
    }
}

/// The addon's `call(instance, verb, args) -> any`: every crossing verb, THIN (`§4.5` item 6) — each
/// converts the JS side's own argument into the core's model, calls the core and translates the core's
/// answer back. **The core is what does the work** (`A75`: the route is `JS -> facade -> core -> store`).
///
/// **THE INVOCATION WINDOW IS HERE AND NOWHERE ELSE** (`§2.7` item 2, `DD-22`): the record is complete and
/// copied out BEFORE the listeners run, the invocation is synchronous, **its ONE argument is the
/// TRIGGERING ADDRESS** (`PAR-JS-12`), and a throwing body is NOT caught, NOT retried and NOT reported
/// (`DD-23`).
extern "C" fn addon_call(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
    let mut argc: usize = 3;
    let mut argv: [NapiValue; 3] = [std::ptr::null_mut(); 3];
    let mut this: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_cb_info(env, info, &mut argc, argv.as_mut_ptr(), &mut this, std::ptr::null_mut());
    }
    let mut index: u32 = 0;
    unsafe {
        napi_get_value_uint32(env, argv[0], &mut index);
    }
    let verb = unsafe { arg_string(env, argv[1]) };
    let args = unsafe { codec_argv(env, argv[2]) };
    let codec = Codec { env };
    let index = index as usize;
    // **THE INSTANCE BORROW IS RELEASED BEFORE ANY LISTENER RUNS** (`§2.7` item 4 / `DD-22`): the record is
    // complete and copied out, the borrow ends with the `with` block, and only THEN does the package's
    // invocation loop open — so a listener body that calls a verb of the same instance re-enters freely and
    // a throwing body leaves the store's own result standing and unmoved (`DD-23`).
    let answer: Result<NapiValue, Refusal> = INSTANCES.with(|all| {
        let mut all = all.borrow_mut();
        let Some(instance) = all.get_mut(index) else {
            return Err(Refusal {
                status: "AddressNotFound".to_string(),
                message: "the package holds no instance at that id".to_string(),
            });
        };
        match verb.as_str() {
            "read" => {
                let address = unsafe { codec.address(args.first()) };
                let tier = unsafe { codec.tier(args.get(1)) };
                let value = instance.read(&address, &tier)?;
                Ok(unsafe { codec.to_js_value(&value) })
            }
            "readLiteral" => {
                let address = unsafe { codec.address(args.first()) };
                let tier = unsafe { codec.tier(args.get(1)) };
                let value = instance.read_literal(&address, &tier)?;
                Ok(unsafe { codec.to_js_value(&value) })
            }
            "write" => {
                let address = unsafe { codec.address(args.first()) };
                let tier = unsafe { codec.tier(args.get(1)) };
                let value = unsafe { codec.value(args.get(2)) };
                let result = instance.write(&address, &tier, &value)?;
                let answer = unsafe { codec.to_js_write_result(&result) };
                // **THE RECORD CROSSES COMPLETE, AND THE TRIGGERING ADDRESS CROSSES BESIDE IT** (`§2.7`
                // item 2, `PAR-JS-12`): the invocation window opens AFTER this frame returns, in the
                // mapping layer that holds the caller's functions (`DD-15`, `A57`).
                let triggering = unsafe { codec.to_js_segments(&segments_of(&address)) };
                unsafe { codec.set_member(answer, "triggeringAddress", triggering) };
                Ok(answer)
            }
            "delete" => {
                let address = unsafe { codec.address(args.first()) };
                let tier = unsafe { codec.tier(args.get(1)) };
                let receipt = instance.delete(&address, &tier)?;
                let answer = unsafe { codec.to_js_delete_receipt(&receipt) };
                let triggering = unsafe { codec.to_js_segments(&segments_of(&address)) };
                unsafe { codec.set_member(answer, "triggeringAddress", triggering) };
                Ok(answer)
            }
            "rollback" => {
                let op_id = unsafe { codec.op_id(args.first()) };
                let result = instance.rollback(&op_id)?;
                Ok(unsafe { codec.to_js_rollback_result(&result) })
            }
            "listen" => {
                let address = unsafe { codec.address(args.first()) };
                let handle = instance.listen(&address)?;
                Ok(unsafe { codec.string_value(handle.token()) })
            }
            "unlisten" => {
                let handle = unsafe { codec.handle_arg(args.first()) };
                instance.unlisten(&handle)?;
                Ok(unsafe { codec.undefined_value() })
            }
            _ => Err(Refusal {
                status: "AddressMalformed".to_string(),
                message: "that is not one of the crossing's verbs".to_string(),
            }),
        }
    });
    match answer {
        Err(refusal) => unsafe { throw_refusal(env, &refusal) },
        Ok(value) => value,
    }
}

/// The verb's own arguments, as the JS side hands them: `[]` where the call supplied none. **A position
/// the JS side handed as `undefined` is NOT a Node-API null — it is the runtime's own `undefined` value —
/// so `js_value` is what keeps the two apart** and [`Codec::address`] is what reads a SUPPLIED `undefined`
/// as `AddressArg` row 5.
unsafe fn codec_argv(env: NapiEnv, args: NapiValue) -> Vec<NapiValue> {
    if args.is_null() {
        return Vec::new();
    }
    let codec = Codec { env };
    if codec.is_array(args) {
        codec.elements(args)
    } else {
        Vec::new()
    }
}

// **⟶ `js_undefined` STOOD HERE AND IS DELETED AT THE DEAD-SURFACE SWEEP** (`docs/open-items-review.md`
// `§2` row 4's class). **Its own documentation, re-emitted rather than lost:** *"The runtime's own
// `undefined`, where a position is SUPPLIED but carries no value — never a null pointer, which is what an
// ABSENT position is."* **It had NO caller.** The supplied-`undefined` position travels through
// `Codec::address`/`Codec::tier`/`Codec::op_id`/`Codec::handle_arg`/`Codec::value`, each of which reads the
// VALUE the runtime handed rather than manufacturing one; the one place this file needs the runtime's
// `undefined` on the copy OUT is `Codec::undefined_value`, which is live (`§2.7` item 2's record member).
// **No byte of a live path is touched by the deletion: the helper had no caller.**

impl Codec {
    /// A position the call did not supply is ABSENT — the arity reading of `crossing.md §1.3`'s
    /// absent-versus-`undefined` rule, rule 1, taken at the JS boundary because the callee is the only
    /// place the call's own arity is observable.
    unsafe fn address(&self, value: Option<&NapiValue>) -> JsAddressArg {
        match value {
            Some(v) => self.address_of(*v),
            None => JsAddressArg::Absent,
        }
    }

    unsafe fn tier(&self, value: Option<&NapiValue>) -> JsTierArg {
        match value {
            Some(v) => self.tier_of(*v),
            None => JsTierArg::Absent,
        }
    }

    unsafe fn op_id(&self, value: Option<&NapiValue>) -> JsOpIdArg {
        match value {
            Some(v) => self.op_id_of(*v),
            None => JsOpIdArg::Absent,
        }
    }

    unsafe fn handle_arg(&self, value: Option<&NapiValue>) -> JsHandleArg {
        match value {
            Some(v) => self.handle_arg_of(*v),
            None => JsHandleArg::Absent,
        }
    }

    unsafe fn value(&self, value: Option<&NapiValue>) -> JsValue {
        match value {
            Some(v) => self.value_of(*v),
            // An ABSENT value reaches the store's own taxonomy as a shapeless value: the JS side spells it
            // as the outside class, and the store answers its own `ValueNotAdmitted` (`DD-46`).
            None => JsValue::Undefined,
        }
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
extern "C" fn addon_register(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
    let mut argc: usize = 2;
    let mut argv: [NapiValue; 2] = [std::ptr::null_mut(); 2];
    let mut this: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_cb_info(env, info, &mut argc, argv.as_mut_ptr(), &mut this, std::ptr::null_mut());
    }
    let mut index: u32 = 0;
    unsafe {
        napi_get_value_uint32(env, argv[0], &mut index);
    }
    let codec = Codec { env };
    let handle = unsafe { codec.handle_arg_of(argv[1]) };
    // **THE CORE IS THE SITE'S OWN JUDGE**: it holds the instance's handle domain (`§2.4` item 5 (c)) and
    // answers an outside handle with the store's own `AddressMalformed` and a generated message.
    // **⟶ THE PLACEHOLDER CLOSURE IS GONE (`F-13`; `U-11`): `JsListener::Function(Box::new(|_| ()))` WAS A
    // SLOT NOTHING COULD INVOKE.** **The FUNCTION itself never crosses** (`DD-15`): the mapping layer holds
    // it in its own per-instance registry (`index.mjs`'s `state.registry`, `U-12`), and the addon is asked
    // only whether the HANDLE is a member of this instance's own domain — so it hands the core the HANDLE
    // and no listener at all, and the core keeps no list of functions.
    let answer = INSTANCES.with(|all| {
        let mut all = all.borrow_mut();
        match all.get_mut(index as usize) {
            Some(instance) => instance.register(&handle),
            None => Err(crossing::registration_refusal(
                "",
                "the addon's first argument",
                "an instance id the package holds no instance at",
            )),
        }
    });
    if let Err(refusal) = answer {
        return unsafe { throw_refusal(env, &refusal) };
    }
    // Nothing of the registry is held here or in the core: the caller's FUNCTION is the package's own state
    // (`§2.4`), and this layer's whole answer is the domain's (`§2.4` item 5 (c)).
    let mut undefined: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_undefined(env, &mut undefined);
    }
    undefined
}

// **⟶ `handle_token` STOOD HERE AND IS DELETED AT THE DEAD-SURFACE SWEEP** (`docs/open-items-review.md`
// `§2` row 4's class). **Its own documentation, re-emitted rather than lost:** *"The token a `JsHandleArg`
// names, where it names one — the outside forms name none."* **NO path in this file ever called it** — the
// token a registration site reads is the CORE's own read of the handle (`Instance::register` takes the
// `JsHandleArg` itself and answers the store's own refusal), so the spelling never crosses back into this
// layer. **The deletion removes a second route to a token, which is the point: the core is the site's own
// judge (`surface.md §2.4` item 5 (c)).**

/// The addon's `version() -> string` — the crate's own version, so a consumer that reached the addon
/// directly sees what it loaded.
extern "C" fn addon_version(env: NapiEnv, _info: NapiCallbackInfo) -> NapiValue {
    unsafe { make_string(env, env!("CARGO_PKG_VERSION")) }
}

/// The addon's `addonErrorMessage(code, subject) -> string` — **THE STORE'S OWN GENERATOR, REACHED FROM
/// THE JS SIDE** (`§2.5` item 2: *"`message` is the store's own GENERATED message VERBATIM — never
/// hand-authored by the package"*). It is reached by the package's own internal step and by nothing else,
/// and its one caller is the entry's DECLARED absent/failed-addon state (`A75`), where the generator is the
/// only lawful author of the string and the addon is the only thing that carries it.
extern "C" fn addon_error_message(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
    let mut argc: usize = 2;
    let mut argv: [NapiValue; 2] = [std::ptr::null_mut(); 2];
    let mut this: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_cb_info(env, info, &mut argc, argv.as_mut_ptr(), &mut this, std::ptr::null_mut());
    }
    let code = unsafe { arg_string(env, argv[0]) };
    let subject = unsafe { arg_string(env, argv[1]) };
    let message = storeroom_native::storeErrorMessage(
        &code,
        &storeroom_native::MessageArgs {
            segment: Some(format!("'{subject}'")),
            path: Some(subject),
            ..Default::default()
        },
    );
    unsafe { make_string(env, &message) }
}

fn export(env: NapiEnv, exports: NapiValue, name: &str, cb: extern "C" fn(NapiEnv, NapiCallbackInfo) -> NapiValue) {
    let spelled = as_utf8(name);
    let mut function: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_create_function(
            env,
            spelled.as_ptr() as *const c_char,
            name.len(),
            Some(cb),
            std::ptr::null_mut(),
            &mut function,
        );
        napi_set_named_property(env, exports, spelled.as_ptr() as *const c_char, function);
    }
}

/// **THE MODULE'S REGISTRATION SYMBOL** — the one Node-API looks for, and the whole of the `cdylib` half's
/// external surface. The internal artefact is reached by the package's own step and by nothing else
/// (`package.md §1.2`).
///
/// # Safety
/// Called by the runtime with a live `env` and the module's `exports` object.
#[no_mangle]
pub unsafe extern "C" fn napi_register_module_v1(env: NapiEnv, exports: NapiValue) -> NapiValue {
    export(env, exports, "version", addon_version);
    export(env, exports, "errorMessage", addon_error_message);
    export(env, exports, "storeCreate", addon_create);
    export(env, exports, "call", addon_call);
    export(env, exports, "register", addon_register);
    exports
}
