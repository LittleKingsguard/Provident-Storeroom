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
//! **AND THE FACADE INVOKES THE LISTENERS THE CORE'S REGISTRY DECLARES** (`§4.5` item 5): the core invokes
//! nothing of its own accord, the facade reads `Instance::listener_for` and performs the invocation after
//! the verb has returned — *"the package invokes a registered listener function SYNCHRONOUSLY AFTER the
//! verb's own call has returned"* (`§2.7` item 4, `DD-22`). **A throwing body is NOT caught, NOT retried and
//! NOT reported** (`DD-23`): the pending exception is left standing and the runtime raises it.

use std::cell::RefCell;
use std::os::raw::{c_char, c_void};

use crate::crossing::{
    self, JsAddressArg, JsBaseState, JsConfig, JsDeleteReceipt, JsFilePathArg, JsHandle, JsHandleArg,
    JsJournalLengthArg,
    JsJournalOp, JsKey, JsListener, JsListenerEntry, JsListenersArg, JsNonArray, JsObject, JsOpIdArg,
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
type NapiRef = *mut c_void;

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
    fn napi_is_exception_pending(env: NapiEnv, result: *mut bool) -> NapiStatus;
    fn napi_get_boolean(env: NapiEnv, value: bool, result: *mut NapiValue) -> NapiStatus;
    fn napi_has_named_property(
        env: NapiEnv,
        object: NapiValue,
        name: *const c_char,
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
    fn napi_get_value_bool(env: NapiEnv, value: NapiValue, result: *mut bool) -> NapiStatus;
    fn napi_create_uint32(env: NapiEnv, value: u32, result: *mut NapiValue) -> NapiStatus;
    fn napi_get_value_uint32(env: NapiEnv, value: NapiValue, result: *mut u32) -> NapiStatus;
    fn napi_typeof(env: NapiEnv, value: NapiValue, result: *mut i32) -> NapiStatus;
    fn napi_create_object(env: NapiEnv, result: *mut NapiValue) -> NapiStatus;
    fn napi_create_array_with_length(env: NapiEnv, length: usize, result: *mut NapiValue) -> NapiStatus;
    fn napi_set_element(env: NapiEnv, object: NapiValue, index: u32, value: NapiValue) -> NapiStatus;
    fn napi_create_double(env: NapiEnv, value: f64, result: *mut NapiValue) -> NapiStatus;
    fn napi_throw(env: NapiEnv, error: NapiValue) -> NapiStatus;
    fn napi_create_reference(
        env: NapiEnv,
        value: NapiValue,
        refcount: u32,
        result: *mut NapiRef,
    ) -> NapiStatus;
    fn napi_delete_reference(env: NapiEnv, reference: NapiRef) -> NapiStatus;
    fn napi_get_reference_value(env: NapiEnv, reference: NapiRef, result: *mut NapiValue) -> NapiStatus;
    fn napi_create_type_error(
        env: NapiEnv,
        code: NapiValue,
        msg: NapiValue,
        result: *mut NapiValue,
    ) -> NapiStatus;
    fn napi_call_function(
        env: NapiEnv,
        recv: NapiValue,
        func: NapiValue,
        argc: usize,
        argv: *const NapiValue,
        result: *mut NapiValue,
    ) -> NapiStatus;
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

/// The refusal `package.md §4.5` item 5 (a) spells at the core layer, translated to **the JS `TypeError`
/// `surface.md §2.4` item 5 (d) declares** — the ONE form this package throws that is not the store's
/// `{status, message}`, carrying NO `status` and NO `message` member of its own (`PAR-JS-12`).
unsafe fn throw_type_error(env: NapiEnv, _refusal: &Refusal) -> NapiValue {
    let mut error: NapiValue = std::ptr::null_mut();
    // The declaration's own words: a `TypeError` carrying NO `status` member — the two-member form is the
    // VERBS', and a `TypeError` thrown by a verb remains a FINDING (`§2.4` item 5 (d), (e)).
    let reason = make_string(env, "the registration's arguments are outside the site's domain");
    if napi_create_type_error(env, std::ptr::null_mut(), reason, &mut error) != 0 {
        return throw_refusal(env, _refusal);
    }
    napi_throw(env, error);
    let mut undefined: NapiValue = std::ptr::null_mut();
    napi_get_undefined(env, &mut undefined);
    undefined
}

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
//   value    {k:'s', v:<string>}            a JS string
//            {k:'b', v:<boolean>}           a JS boolean
//            {k:'n', v:<number>}            a JS number, `-0` included
//            {k:'o', m:[[key, value]…], p:'plain'|'null'|'foreign'|'class',
//                     acc:<boolean>, proxy:<boolean>}   a plain object / a class instance
//            {k:'a', i:[value…]}            a dense array
//            {k:'g', v:<bigint>}            a JS bigint
//            {k:'F', v:<number>}            a non-finite JS number
//            {k:'z'} {k:'u'} {k:'f'} {k:'y'} {k:'c'} {k:'P'} {k:'H'}
//                                           null · undefined · function · symbol · cyclic ·
//                                           non-plain collection · sparse array
//   key      a JS string, or the `{symbol:true}` marker for a `Symbol`-keyed own property
//   segment  a JS string, a JS number, or one of the outside markers `{bad:'negative'|'fractional'|
//            'null'|'undefined'|'bool'|'object'|'array'|'function'}`
//   address  {k:'L', s:[segment…]} an array of segments   ·  {k:'A'|'N'|'U'|'S'|'X'|'C'} the outside forms
//            {k:'D', o:…} a non-array, carrying the outside segment class it was spelled as
//   tier     {k:'A'} absent · {k:'N'} null · {k:'U'} undefined · {k:'T', v:<string>} a token ·
//            {k:'S', i:[TierSetItem…]} a set · {k:'B'|'O'|'F'|'D', v:…} the outside scalars
//   handle   {k:'O', v:<token>} the opaque form · {k:'B', v:<string>} a bare token · {k:'X'} outside
// =================================================================================================

struct Codec {
    env: NapiEnv,
}

impl Codec {
    /// A named property of a Node-API object, or `None` where the member is absent.
    unsafe fn member(&self, object: NapiValue, name: &str) -> Option<NapiValue> {
        let spelled = as_utf8(name);
        let mut has: bool = false;
        if napi_has_named_property(self.env, object, spelled.as_ptr() as *const c_char, &mut has) != 0 || !has {
            return None;
        }
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

    unsafe fn number_of(&self, value: NapiValue) -> f64 {
        let mut out: f64 = 0.0;
        if napi_get_value_double(self.env, value, &mut out) != 0 {
            return 0.0;
        }
        out
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
            "n" => JsValue::Num(self.member(v, "v").map(|x| self.number_of(x)).unwrap_or(0.0)),
            "g" => JsValue::BigInt(
                self.member(v, "v")
                    .and_then(|x| self.string_of(x).parse::<i64>().ok())
                    .unwrap_or(0),
            ),
            "F" => JsValue::NonFinite(self.member(v, "v").map(|x| self.number_of(x)).unwrap_or(0.0)),
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
            NAPI_NUMBER => {
                let n = self.number_of(v);
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
            NAPI_NUMBER => JsTierSetItem::Number(self.number_of(item)),
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
            "D" => JsTierArg::Number(self.member(t, "v").map(|x| self.number_of(x)).unwrap_or(0.0)),
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
            "D" => JsOpIdArg::Number(self.member(o, "v").map(|x| self.number_of(x)).unwrap_or(0.0)),
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
            NAPI_NUMBER => {
                let n = self.number_of(v);
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
            NAPI_STRING => JsJournalLengthArg::NumericString(self.string_of(v)),
            NAPI_BOOLEAN => JsJournalLengthArg::Bool(self.bool_of(v)),
            NAPI_BIGINT => JsJournalLengthArg::BigInt(0),
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
    /// One slot per (instance, handle token): the registry's FUNCTION, held by a Node-API reference.
    static LISTENERS: RefCell<Vec<(usize, String, NapiRef)>> = const { RefCell::new(Vec::new()) };
}

/// **THE TRIGGERING ADDRESS, AS A JS VALUE** (`PAR-JS-12`'s `domain` cell: *"The package's invocation
/// passes the triggering ADDRESS as its argument; no other argument is declared"*). A segment is a JS
/// `string` or a non-negative integer `number` — `crossing.md §1.3`'s `AddressArg` rows 2 and 3 — and the
/// address crosses as a FRESH dense array (`§1.1` clause 2).
unsafe fn address_value(env: NapiEnv, address: &[JsSegment]) -> NapiValue {
    let mut array: NapiValue = std::ptr::null_mut();
    napi_create_array_with_length(env, address.len(), &mut array);
    for (index, segment) in address.iter().enumerate() {
        let element = match segment {
            JsSegment::Key(k) => make_string(env, k),
            JsSegment::Index(i) => {
                let mut number: NapiValue = std::ptr::null_mut();
                napi_create_double(env, *i as f64, &mut number);
                number
            }
            _ => {
                let mut undefined: NapiValue = std::ptr::null_mut();
                napi_get_undefined(env, &mut undefined);
                undefined
            }
        };
        napi_set_element(env, array, index as u32, element);
    }
    array
}

/// `§2.7` item 2 / `DD-22`: the invocation happens AFTER the verb's own call has returned and its record
/// is copied out, it is SYNCHRONOUS, and **its ONE argument is the TRIGGERING ADDRESS** (`PAR-JS-12`).
unsafe fn invoke_listeners(
    env: NapiEnv,
    index: usize,
    triggered: &[JsHandle],
    address: &[JsSegment],
) -> bool {
    let mut threw = false;
    for handle in triggered {
        let reference = LISTENERS.with(|slots| {
            slots
                .borrow()
                .iter()
                .find(|(i, token, _)| *i == index && token == handle.token())
                .map(|(_, _, reference)| *reference)
        });
        if let Some(reference) = reference {
            unsafe {
                let mut function: NapiValue = std::ptr::null_mut();
                if napi_get_reference_value(env, reference, &mut function) == 0 {
                    let mut undefined: NapiValue = std::ptr::null_mut();
                    napi_get_undefined(env, &mut undefined);
                    let mut argv: [NapiValue; 1] = [address_value(env, address)];
                    let mut result: NapiValue = std::ptr::null_mut();
                    // A throwing body is NOT caught (`DD-23`): `napi_call_function` reports the pending
                    // exception as its own status, the flag is recorded here and the runtime raises the
                    // body's exception after this native frame returns.
                    if napi_call_function(env, undefined, function, 1, argv.as_mut_ptr(), &mut result) != 0 {
                        threw = true;
                        break;
                    }
                }
            }
        }
    }
    threw
}

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

/// The runtime's own `undefined`, where a position is SUPPLIED but carries no value — never a null pointer,
/// which is what an ABSENT position is.
unsafe fn js_undefined(env: NapiEnv) -> NapiValue {
    let mut out: NapiValue = std::ptr::null_mut();
    napi_get_undefined(env, &mut out);
    out
}

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
/// value — a bare token, a blank token, a fabricated or non-opaque value, an absent argument, and a
/// handle a FOREIGN instance minted — answers the CORE's refusal and is translated to the JS `TypeError
/// that item 5 (d) declares, carrying NO `status` and NO `message`** (`PAR-JS-12`). **The listener
/// crosses as its registration SLOT: the FUNCTION itself is held by the JS side (`DD-15`), which is where
/// `surface.md §2.4` puts the registry's own state.**
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
    // answers an outside handle or a non-function listener with the `TypeError` refusal (`§4.5` item 5 (a)).
    // **The FUNCTION itself never crosses** (`DD-15`): the mapping layer holds it, and the addon is asked
    // only whether the HANDLE is a member of this instance's own domain.
    let answer = INSTANCES.with(|all| {
        let mut all = all.borrow_mut();
        match all.get_mut(index as usize) {
            Some(instance) => instance.register(&handle, JsListener::Function(Box::new(|_| ()))),
            None => Err(Refusal {
                status: crossing::TYPE_ERROR_STATUS.to_string(),
                message: "the package holds no instance at that id".to_string(),
            }),
        }
    });
    if let Err(refusal) = answer {
        return unsafe { throw_type_error(env, &refusal) };
    }
    // Nothing of the registry is held here: the caller's FUNCTION is the package's own state (`§2.4`),
    // and the core holds only the entry that makes the handle a member of the triggered set (rule 1).
    let mut undefined: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_undefined(env, &mut undefined);
    }
    undefined
}

/// The token a `JsHandleArg` names, where it names one — the outside forms name none.
fn handle_token(handle: &JsHandleArg) -> String {
    match handle {
        JsHandleArg::Opaque(opaque) => opaque.token().to_string(),
        JsHandleArg::Bare(bare) => bare.clone(),
        JsHandleArg::NonOpaque | JsHandleArg::Absent => String::new(),
    }
}

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
