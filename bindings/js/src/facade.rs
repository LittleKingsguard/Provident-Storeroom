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
    self, JsAddressArg, JsConfig, JsDeleteReceipt, JsFilePathArg, JsHandle, JsHandleArg, JsJournalLengthArg,
    JsJournalOp, JsKey, JsListener, JsListenerEntry, JsListenersArg, JsNonArray, JsObject, JsOpIdArg, JsProto,
    JsRollbackResult, JsSegment, JsTierArg, JsTierSetItem, JsValue, JsWriteResult, Refusal,
};


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
    fn napi_create_uint32(env: NapiEnv, value: u32, result: *mut NapiValue) -> NapiStatus;
    fn napi_get_value_uint32(env: NapiEnv, value: NapiValue, result: *mut u32) -> NapiStatus;
    fn napi_typeof(env: NapiEnv, value: NapiValue, result: *mut i32) -> NapiStatus;
    fn napi_create_object(env: NapiEnv, result: *mut NapiValue) -> NapiStatus;
    fn napi_throw(env: NapiEnv, error: NapiValue) -> NapiStatus;
    fn napi_create_reference(
        env: NapiEnv,
        value: NapiValue,
        refcount: u32,
        result: *mut NapiRef,
    ) -> NapiStatus;
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

/// `napi_valuetype`'s function arm — the one type the registry admits (`PAR-JS-12`).
const NAPI_FUNCTION: i32 = 7;

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
// THE WIRE — the DECIDED tree, self-delimiting, in the core's own vocabulary.
//
//   value    s<len>:<bytes> | b0 | b1 | n<16 hex> | o<proto><flags><count>,<key><value>… | a<count>,…
//            z (null) | u (undefined) | f (function) | y (symbol) | g<decimal>, (bigint)
//            F<16 hex> (non-finite) | c (cyclic) | P (non-plain collection) | H (sparse array)
//   key      k<len>:<bytes> | y (a Symbol key)
//   proto    p (plain) | n (null) | f (foreign plain) | c (class)
//   flags    two characters: accessor? proxied?
//   segment  k<len>:<bytes> | i<decimal>, | -<decimal>, | ~<16 hex> | Z (null) | U (undefined)
//            B0 | B1 | O (object) | Y (array) | F (function)
//   address  A (absent) | N (null) | U (undefined) | L<count>,<segment>… | R<count>,<segment>…
//            S (sparse) | X (proxy) | C (class array-like) | D<class><payload>
// =================================================================================================

struct Cursor<'a> {
    bytes: &'a [u8],
    at: usize,
}

impl<'a> Cursor<'a> {
    fn new(text: &'a str) -> Cursor<'a> {
        Cursor {
            bytes: text.as_bytes(),
            at: 0,
        }
    }

    fn peek(&self) -> Option<u8> {
        self.bytes.get(self.at).copied()
    }

    fn tag(&mut self) -> u8 {
        let tag = self.bytes.get(self.at).copied().unwrap_or(0);
        self.at += 1;
        tag
    }

    /// A decimal run, and the `,` that closes it where the wire spells one — so every numeric atom is
    /// self-delimiting and a value carrying a `,` inside a string can never be mis-read.
    fn digits(&mut self) -> u64 {
        let start = self.at;
        while matches!(self.peek(), Some(b'0'..=b'9')) {
            self.at += 1;
        }
        let value = std::str::from_utf8(&self.bytes[start..self.at])
            .ok()
            .and_then(|s| s.parse::<u64>().ok())
            .unwrap_or(0);
        if self.peek() == Some(b',') {
            self.at += 1;
        }
        value
    }

    fn hex16(&mut self) -> f64 {
        let start = self.at;
        self.at += 16;
        let text = std::str::from_utf8(&self.bytes[start..self.at]).unwrap_or("0");
        u64::from_str_radix(text, 16)
            .map(f64::from_bits)
            .unwrap_or(0.0)
    }

    /// `s<len>:<bytes>` — the length-prefixed string, so a value carrying a `:` or a `,` is unambiguous.
    /// A reader that has already consumed a one-byte tag (a tier token's `t`, a listener entry's `h`, the
    /// construction's fourth key) reaches the atom at this same spelling, so its own `s` tag is read here.
    fn string(&mut self) -> String {
        if self.peek() == Some(b's') {
            self.at += 1;
        }
        let len = self.digits() as usize;
        if self.peek() == Some(b':') {
            self.at += 1;
        }
        let start = self.at;
        self.at = (start + len).min(self.bytes.len());
        String::from_utf8_lossy(&self.bytes[start..self.at]).into_owned()
    }

    fn expect(&mut self, tag: u8) {
        if self.peek() == Some(tag) {
            self.at += 1;
        }
    }

    fn value(&mut self) -> JsValue {
        match self.tag() {
            b's' => JsValue::Str(self.string()),
            b'b' => JsValue::Bool(self.digits() == 1),
            b'n' => JsValue::Num(self.hex16()),
            b'o' => {
                let proto = match self.tag() {
                    b'n' => JsProto::Null,
                    b'f' => JsProto::ForeignPlain,
                    b'c' => JsProto::Class,
                    _ => JsProto::Plain,
                };
                let has_accessor = self.tag() == b'1';
                let proxied = self.tag() == b'1';
                let count = self.digits() as usize;
                self.expect(b',');
                let mut members = Vec::with_capacity(count.min(4096));
                for _ in 0..count {
                    let key = match self.tag() {
                        b'y' => JsKey::Symbol,
                        _ => JsKey::Key(self.string()),
                    };
                    members.push((key, self.value()));
                }
                JsValue::Object(JsObject {
                    members,
                    proto,
                    has_accessor,
                    proxied,
                })
            }
            b'a' => {
                let count = self.digits() as usize;
                self.expect(b',');
                let mut items = Vec::with_capacity(count.min(4096));
                for _ in 0..count {
                    items.push(self.value());
                }
                JsValue::Array(items)
            }
            b'g' => JsValue::BigInt(self.digits() as i64),
            b'F' => JsValue::NonFinite(self.hex16()),
            b'z' => JsValue::Null,
            b'u' => JsValue::Undefined,
            b'f' => JsValue::Function,
            b'y' => JsValue::Symbol,
            b'H' => JsValue::SparseArray,
            b'c' => JsValue::Cyclic,
            _ => JsValue::NonPlainCollection,
        }
    }

    fn segment(&mut self) -> JsSegment {
        match self.tag() {
            b'k' => JsSegment::Key(self.string()),
            b'i' => {
                let n = self.digits();
                JsSegment::Index(n)
            }
            b'-' => {
                let n = self.digits();
                JsSegment::Negative(-(n as i64))
            }
            b'~' => JsSegment::Fractional(self.hex16()),
            b'Z' => JsSegment::Null,
            b'U' => JsSegment::Undefined,
            b'B' => JsSegment::Bool(self.digits() == 1),
            b'Y' => JsSegment::Array,
            b'F' => JsSegment::Function,
            _ => JsSegment::Object,
        }
    }

    fn address(&mut self) -> JsAddressArg {
        match self.tag() {
            b'L' | b'R' => {
                let cross_realm = self.bytes[self.at - 1] == b'R';
                let count = self.digits() as usize;
                self.expect(b',');
                let mut segments = Vec::with_capacity(count.min(4096));
                for _ in 0..count {
                    segments.push(self.segment());
                }
                if cross_realm {
                    JsAddressArg::CrossRealmList(segments)
                } else {
                    JsAddressArg::List(segments)
                }
            }
            b'A' => JsAddressArg::Absent,
            b'N' => JsAddressArg::Null,
            b'U' => JsAddressArg::Undefined,
            b'S' => JsAddressArg::Sparse,
            b'X' => JsAddressArg::Proxy,
            b'C' => JsAddressArg::ClassArrayLike,
            other => {
                let inner = self.segment();
                let non_array = match (other, inner) {
                    (b'k', JsSegment::Key(s)) => JsNonArray::Str(s),
                    (_, JsSegment::Negative(n)) => JsNonArray::Number(n as f64),
                    (_, JsSegment::Index(n)) => JsNonArray::Number(n as f64),
                    (_, JsSegment::Fractional(f)) => JsNonArray::Number(f),
                    (_, JsSegment::Bool(b)) => JsNonArray::Bool(b),
                    (_, JsSegment::Function) => JsNonArray::Function,
                    _ => JsNonArray::Object,
                };
                JsAddressArg::NonArray(non_array)
            }
        }
    }

    fn tier(&mut self) -> JsTierArg {
        match self.tag() {
            b'A' => JsTierArg::Absent,
            b'N' => JsTierArg::Null,
            b'U' => JsTierArg::Undefined,
            b't' => JsTierArg::Token(self.string()),
            b'L' => {
                let count = self.digits() as usize;
                self.expect(b',');
                let mut items = Vec::with_capacity(count.min(4096));
                for _ in 0..count {
                    items.push(self.tier_set_item());
                }
                JsTierArg::Set(items)
            }
            b'B' => JsTierArg::Bool(self.digits() == 1),
            b'n' => JsTierArg::Number(self.hex16()),
            b'F' => JsTierArg::Function,
            _ => JsTierArg::Object,
        }
    }

    fn tier_set_item(&mut self) -> JsTierSetItem {
        match self.tag() {
            b't' => JsTierSetItem::Token(self.string()),
            b'N' => JsTierSetItem::Null,
            b'U' => JsTierSetItem::Undefined,
            b'n' => JsTierSetItem::Number(self.hex16()),
            b'B' => JsTierSetItem::Bool(self.digits() == 1),
            b'F' => JsTierSetItem::Function,
            _ => JsTierSetItem::Object,
        }
    }

    fn op_id(&mut self) -> JsOpIdArg {
        match self.tag() {
            b's' => JsOpIdArg::Str(self.string()),
            b'A' => JsOpIdArg::Absent,
            b'N' => JsOpIdArg::Null,
            b'U' => JsOpIdArg::Undefined,
            _ => JsOpIdArg::Number(self.hex16()),
        }
    }

    fn listeners(&mut self) -> JsListenersArg {
        match self.tag() {
            b'L' => {
                let count = self.digits() as usize;
                self.expect(b',');
                let mut entries = Vec::with_capacity(count.min(4096));
                for _ in 0..count {
                    entries.push(self.listener_entry());
                }
                JsListenersArg::List(entries)
            }
            b'A' => JsListenersArg::Absent,
            b'N' => JsListenersArg::Null,
            b'U' => JsListenersArg::Undefined,
            _ => JsListenersArg::NonArray,
        }
    }

    fn listener_entry(&mut self) -> JsListenerEntry {
        if self.peek() == Some(b'O') {
            self.at += 1;
            return JsListenerEntry::Other;
        }
        let address = self.address();
        self.expect(b'h');
        JsListenerEntry::Entry {
            address,
            handle: self.string(),
        }
    }

    /// `cfg`'s four slots, each of which may be the ABSENT marker `-` — `crossing.md §1.3`'s
    /// absent-versus-`undefined` rule, read at the construction.
    fn config(&mut self) -> JsConfig {
        let file_path = if self.tag() == b'-' {
            None
        } else {
            Some(match self.bytes[self.at - 1] {
                b's' => JsFilePathArg::Str(self.string()),
                b'A' => JsFilePathArg::Absent,
                b'N' => JsFilePathArg::Null,
                b'U' => JsFilePathArg::Undefined,
                b'E' => JsFilePathArg::Empty,
                _ => JsFilePathArg::NonString,
            })
        };
        let journal_length = if self.tag() == b'-' {
            None
        } else {
            Some(match self.bytes[self.at - 1] {
                b'c' => JsJournalLengthArg::Count(self.digits() as u32),
                b'A' => JsJournalLengthArg::Absent,
                b'Z' => JsJournalLengthArg::Zero,
                b'-' => JsJournalLengthArg::Negative(-(self.digits() as i64)),
                b'~' => JsJournalLengthArg::Fractional(self.hex16()),
                b'a' => JsJournalLengthArg::NaN,
                b'I' => JsJournalLengthArg::Infinity,
                b'q' => JsJournalLengthArg::NumericString(self.string()),
                b'B' => JsJournalLengthArg::Bool(self.digits() == 1),
                b'i' => JsJournalLengthArg::BigInt(self.digits() as i64),
                b'T' => JsJournalLengthArg::TooLarge(self.digits()),
                b'N' => JsJournalLengthArg::Null,
                b'U' => JsJournalLengthArg::Undefined,
                b'F' => JsJournalLengthArg::Function,
                _ => JsJournalLengthArg::Object,
            })
        };
        let listeners = if self.tag() == b'-' {
            None
        } else {
            self.at -= 1;
            Some(self.listeners())
        };
        let fourth_key = if self.tag() == b'-' {
            None
        } else {
            Some(self.string())
        };
        JsConfig {
            file_path,
            journal_length,
            listeners,
            fourth_key,
        }
    }
}

// -------------------------------------------------------------------------------------------------
// The writer — the copy OUT, at the wire's own spellings.
// -------------------------------------------------------------------------------------------------

struct Writer(String);

impl Writer {
    fn new() -> Writer {
        Writer(String::new())
    }

    fn raw(&mut self, text: &str) {
        self.0.push_str(text);
    }

    fn number(&mut self, n: u64) {
        self.0.push_str(&n.to_string());
        self.0.push(',');
    }

    fn string(&mut self, text: &str) {
        self.0.push('s');
        self.0.push_str(&text.len().to_string());
        self.0.push(':');
        self.0.push_str(text);
    }

    fn bits(&mut self, x: f64) {
        self.0.push_str(&format!("{:016x}", x.to_bits()));
    }

    fn value(&mut self, v: &JsValue) {
        match v {
            JsValue::Str(s) => self.string(s.clone().as_str()),
            JsValue::Bool(b) => self.raw(if *b { "b1" } else { "b0" }),
            JsValue::Num(n) => {
                self.raw("n");
                self.bits(*n);
            }
            JsValue::Object(o) => {
                self.raw("o");
                self.raw(match o.proto {
                    JsProto::Plain => "p",
                    JsProto::Null => "n",
                    JsProto::ForeignPlain => "f",
                    JsProto::Class => "c",
                });
                self.raw(if o.has_accessor { "1" } else { "0" });
                self.raw(if o.proxied { "1" } else { "0" });
                self.number(o.members.len() as u64);
                for (key, member) in &o.members {
                    match key {
                        JsKey::Key(name) => {
                            self.raw("k");
                            self.0.push_str(&name.len().to_string());
                            self.0.push(':');
                            self.0.push_str(name);
                        }
                        JsKey::Symbol => self.raw("y"),
                    }
                    self.value(member);
                }
            }
            JsValue::Array(items) => {
                self.raw("a");
                self.number(items.len() as u64);
                for item in items {
                    self.value(item);
                }
            }
            JsValue::SparseArray => self.raw("H"),
            JsValue::Null => self.raw("z"),
            JsValue::Undefined => self.raw("u"),
            JsValue::Function => self.raw("f"),
            JsValue::Symbol => self.raw("y"),
            JsValue::BigInt(n) => {
                self.raw("g");
                self.number(*n as u64);
            }
            JsValue::NonFinite(f) => {
                self.raw("F");
                self.bits(*f);
            }
            JsValue::Cyclic => self.raw("c"),
            JsValue::NonPlainCollection => self.raw("P"),
        }
    }

    fn segments(&mut self, segments: &[JsSegment]) {
        self.number(segments.len() as u64);
        for segment in segments {
            match segment {
                JsSegment::Key(k) => {
                    self.raw("k");
                    self.0.push_str(&k.len().to_string());
                    self.0.push(':');
                    self.0.push_str(k);
                }
                JsSegment::Index(i) => {
                    self.raw("i");
                    self.number(*i);
                }
                JsSegment::Negative(i) => {
                    self.raw("-");
                    self.number((*i).unsigned_abs());
                }
                JsSegment::Fractional(f) => {
                    self.raw("~");
                    self.bits(*f);
                }
                JsSegment::Null => self.raw("Z"),
                JsSegment::Undefined => self.raw("U"),
                JsSegment::Bool(b) => self.raw(if *b { "B1" } else { "B0" }),
                JsSegment::Object => self.raw("O"),
                JsSegment::Array => self.raw("Y"),
                JsSegment::Function => self.raw("F"),
            }
        }
    }

    fn base_state(&mut self, present: bool, value: &JsValue) {
        self.raw(if present { "1" } else { "0" });
        self.value(value);
    }

    fn journal_op(&mut self, op: &JsJournalOp) {
        self.raw("o");
        self.string(&op.opId);
        self.string(&op.kind);
        self.segments(&op.address);
        match &op.tier {
            Some(token) => {
                self.raw("t");
                self.string(token);
            }
            None => self.raw("-"),
        }
        self.base_state(op.before.present, &op.before.value);
        self.base_state(op.after.present, &op.after.value);
        self.number(op.seq);
        self.raw(if op.compacted { "b1" } else { "b0" });
    }

    fn handles(&mut self, handles: &[JsHandle]) {
        self.number(handles.len() as u64);
        for handle in handles {
            self.string(handle.token());
        }
    }

    fn write_result(&mut self, r: &JsWriteResult) {
        self.journal_op(&r.op);
        self.number(r.watched.len() as u64);
        for address in &r.watched {
            self.segments(address);
        }
        self.handles(&r.triggered);
    }

    fn delete_receipt(&mut self, r: &JsDeleteReceipt) {
        self.segments(&r.address);
        self.number(r.tiers.len() as u64);
        for tier in &r.tiers {
            self.string(tier);
        }
        self.handles(&r.triggered);
    }

    fn rollback_result(&mut self, r: &JsRollbackResult) {
        self.string(&r.opId);
        self.number(r.undoneOps.len() as u64);
        for op in &r.undoneOps {
            self.string(op);
        }
        self.base_state(r.restoredTo.present, &r.restoredTo.value);
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

fn invoke_listeners(env: NapiEnv, index: usize, triggered: &[JsHandle]) {
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
                    let mut result: NapiValue = std::ptr::null_mut();
                    // A throwing body is NOT caught (`DD-23`): the pending exception stands and the
                    // runtime raises it after this native frame returns.
                    napi_call_function(env, undefined, function, 0, std::ptr::null(), &mut result);
                }
            }
        }
    }
}

/// The addon's `create(cfgWire) -> uint32`: the store's construction, through the core.
extern "C" fn addon_create(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
    let mut argc: usize = 2;
    let mut argv: [NapiValue; 2] = [std::ptr::null_mut(); 2];
    let mut this: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_cb_info(env, info, &mut argc, argv.as_mut_ptr(), &mut this, std::ptr::null_mut());
    }
    let text = unsafe { arg_string(env, argv[0]) };
    let mut cursor = Cursor::new(&text);
    let config = cursor.config();
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

/// The addon's `call(instance, verb, argsWire) -> string`: every crossing verb, thin.
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
    let args = unsafe { arg_string(env, argv[2]) };
    let mut cursor = Cursor::new(&args);
    let index = index as usize;
    let answer: Result<String, Refusal> = INSTANCES.with(|all| {
        let mut all = all.borrow_mut();
        let Some(instance) = all.get_mut(index) else {
            return Err(Refusal {
                status: "AddressNotFound".to_string(),
                message: "the package holds no instance at that id".to_string(),
            });
        };
        let mut writer = Writer::new();
        match verb.as_str() {
            "read" => {
                let address = cursor.address();
                let tier = cursor.tier();
                let value = instance.read(&address, &tier)?;
                writer.value(&value);
                Ok(writer.0)
            }
            "readLiteral" => {
                let address = cursor.address();
                let tier = cursor.tier();
                let value = instance.read_literal(&address, &tier)?;
                writer.value(&value);
                Ok(writer.0)
            }
            "write" => {
                let address = cursor.address();
                let tier = cursor.tier();
                let value = cursor.value();
                let result = instance.write(&address, &tier, &value)?;
                writer.write_result(&result);
                invoke_listeners(env, index, &instance.triggered_set(&result));
                Ok(writer.0)
            }
            "delete" => {
                let address = cursor.address();
                let tier = cursor.tier();
                let receipt = instance.delete(&address, &tier)?;
                writer.delete_receipt(&receipt);
                invoke_listeners(env, index, &receipt.triggered);
                Ok(writer.0)
            }
            "rollback" => {
                let op_id = cursor.op_id();
                let result = instance.rollback(&op_id)?;
                writer.rollback_result(&result);
                Ok(writer.0)
            }
            "listen" => {
                let address = cursor.address();
                let handle = instance.listen(&address)?;
                writer.string(handle.token());
                Ok(writer.0)
            }
            "unlisten" => {
                let token = cursor.string();
                instance.unlisten(&JsHandleArg::Bare(token))?;
                Ok(writer.0)
            }
            _ => Err(Refusal {
                status: "AddressMalformed".to_string(),
                message: "that is not one of the crossing's verbs".to_string(),
            }),
        }
    });
    match answer {
        Err(refusal) => unsafe { throw_refusal(env, &refusal) },
        Ok(text) => unsafe { make_string(env, &text) },
    }
}

/// The addon's `register(instance, handleToken, listener)`: the registry's own site, over the core.
extern "C" fn addon_register(env: NapiEnv, info: NapiCallbackInfo) -> NapiValue {
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
    let token = unsafe { arg_string(env, argv[1]) };
    let mut kind: i32 = 0;
    unsafe {
        napi_typeof(env, argv[2], &mut kind);
    }
    if kind != NAPI_FUNCTION {
        // `PAR-JS-12`: a non-function registration is the ONE site the contract declares a `TypeError` at.
        return unsafe {
            throw_type_error(
                env,
                &Refusal {
                    status: crossing::TYPE_ERROR_STATUS.to_string(),
                    message: "the registration's listener is not a function".to_string(),
                },
            )
        };
    }
    let mut reference: NapiRef = std::ptr::null_mut();
    unsafe {
        napi_create_reference(env, argv[2], 1, &mut reference);
    }
    // The CORE's registry is the one `triggered_set` consults (`§4.5` item 5): the facade's own slot holds
    // the FUNCTION (`DD-15`) and the core's entry is what makes the handle a member of the set.
    INSTANCES.with(|all| {
        if let Some(instance) = all.borrow_mut().get_mut(index as usize) {
            let handle = JsHandleArg::Opaque(JsHandle::from_token(&token));
            let _ = instance.register(&handle, JsListener::Function(Box::new(|_| ())));
        }
    });
    LISTENERS.with(|slots| {
        let mut slots = slots.borrow_mut();
        match slots
            .iter_mut()
            .find(|(i, t, _)| *i == index as usize && *t == token)
        {
            // `§2.4` rule 2: `register` REPLACES, never fans out.
            Some(slot) => slot.2 = reference,
            None => slots.push((index as usize, token, reference)),
        }
    });
    let mut undefined: NapiValue = std::ptr::null_mut();
    unsafe {
        napi_get_undefined(env, &mut undefined);
    }
    undefined
}

/// The addon's `version() -> string` — the crate's own version, so a consumer that reached the addon
/// directly sees what it loaded.
extern "C" fn addon_version(env: NapiEnv, _info: NapiCallbackInfo) -> NapiValue {
    unsafe { make_string(env, env!("CARGO_PKG_VERSION")) }
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
    export(env, exports, "storeCreate", addon_create);
    export(env, exports, "call", addon_call);
    export(env, exports, "register", addon_register);
    exports
}
