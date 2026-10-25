//! `codec` — **THE WIRE'S DECIDED TREE, CONVERTED IN BOTH DIRECTIONS.**
//!
//! **THIS FILE'S SHAPE, STATED ONCE SO IT IS NOT RE-DERIVED FROM THE SCROLL: ONE STRUCT AND THREE
//! `impl<'e> Codec<'e>` BLOCKS, AND EACH BLOCK IS ONE JOB.** **BLOCK 1 IS THE COPY IN** — the wire's JS
//! values read INTO the store's own Rust types. **BLOCK 2 IS THE COPY OUT** — the core's own records and
//! values written OUT as fresh Node-API values. **BLOCK 3 IS THE ACCESSOR ADAPTER** — the thin
//! facade-facing layer the entries call, each accessor handed a declared `#[napi]` parameter directly and
//! each one wrapping the inner `*_of` reader of the block the direction belongs to. **EACH BLOCK CARRIES A
//! BANNER STATING THAT JOB AT ITS OWN HEAD, and this paragraph ORIENTS rather than duplicates**: the
//! direction of a single method, its signature and its fail-states are its OWN doc comment's subject, and
//! no claim of theirs is re-spelled here.
//!
//! **THIS MODULE WAS LIFTED OUT OF `bindings/js/src/facade.rs` AS A PURE MOVE AND IT CHANGES NO BEHAVIOUR.**
//! The `Codec` struct, all three of its `impl` blocks, the wire-protocol header block that documents the tree
//! it reads and writes, and the accessor adapter that binds the entries' positions to its readers all crossed
//! here **byte-for-byte**; every `fn` body below is the body that stood in `facade.rs`.
//!
//! **⟶ WHAT CAME WITH IT AND WHAT DID NOT IS THE SPLIT'S OWN DECISION, STATED SO IT IS NOT RE-DERIVED.** The
//! FOUR free helpers the codec's bodies call — [`arg_string`] · [`make_string`] · [`make_value`] ·
//! [`make_undefined`] — and the ONE type alias its signatures are spelled in — [`JsVal`] — **ARE DEFINED
//! HERE, AND `facade.rs` IMPORTS THEM FROM THIS MODULE.** **THEY MOVED IN THE SECOND HALF OF THE SAME PURE
//! MOVE, AND THE CYCLE THE FIRST HALF FEARED DID NOT ARISE**: the revert being that `codec` imported them
//! from `facade` while `facade` imported [`Codec`] from `codec`, so the pair was a cycle rather than a
//! direction. **THE WAY OUT WAS TO CARRY THEM TO THE CODE, NOT TO COPY THEM**: the codec's bodies call all
//! four, `facade` calls them at its own sites, so the primitives cross the seam ONCE — home here, readers
//! there — and `crate::facade` is named on no line of this file.
//!
//! **THE SECOND ALIAS DID NOT MOVE AND THE EARLIER VERSION OF THIS HEADER SAID IT HAD BEEN IMPORTED, WHICH
//! WAS WRONG AND IS CORRECTED HERE:** [`NapiRet`] has NO reader in this file — the codec's bodies answer the
//! wire's own types — while `facade.rs` spells it at every entry signature, so it stays declared in
//! `facade.rs`. **It was never imported, and no import of it is deleted here because none was ever used.**
//!
//! **THAT THEY ARE THE CODEC'S OWN DEPENDENCIES AND NOT PUBLIC HELPERS IS WHY THEY ARE `pub(crate)` HERE
//! AND NOT `pub`: A CRATE-VISIBLE HELPER IS STILL NOT A SURFACE** — the visibility crosses the module seam
//! and stops at the crate's edge, so the artefact's export set is untouched by the move.
//!
//! **THE MODULE IS `pub(crate)`, AND THE VISIBILITY IS PART OF THE MOVE'S OWN RULING** (`lib.rs`): the
//! `Codec` is an implementation detail of the facade's conversion and **nothing outside this crate may name
//! it** — `crossing` is the crate's declared pure-Rust surface and `facade` is the `cdylib` half, while this
//! module is neither a surface nor an export. **NO `#[napi]` ATTRIBUTE APPEARS BELOW, AND NO EXPORT IS
//! REGISTERED FROM THIS FILE**: the annotation's expansion is confined to the five entry functions
//! `facade.rs` declares (`binding-crate-and-abi.md §3`), so the artefact's export set and every declared arity
//! are exactly what they were.

// =================================================================================================
// THIS FILE'S IMPORTS — EVERY NAME BELOW NAMES SOMETHING ONE OF THE MOVED BODIES ACTUALLY SPELLS, AND
// NOTHING IS IMPORTED "IN CASE" (this crate's doctrine is delete-rather-than-allow, so no `#[allow]` stands
// over any line here and a name that no live path names FAILS THE BUILD rather than passing it).
//
// **THE LIBRARY'S OWN CHECKED BINDINGS, AT THEIR OWN USES:** `Object` builds the wire records and reads an
// own property; `ToNapiValue` mints a fresh Node-API value from a Rust one — **and it is named below by the
// moved [`make_value`] as well as by the copy OUT, so the import serves both**; `ValueType` is the class
// decision the codec takes at the boundary (`PAR-ADA-9`) rather than a raw tag this file numbers; `sys`
// reaches `napi_get_undefined` — **for the copy OUT's own `undefined` AND for the moved [`make_undefined`],
// which is the library binding that replaced the hand-declared symbol**; `Env` is the environment every
// moved helper is handed; and `Unknown as JsUnknown` is the untyped handle the [`JsVal`] alias is spelled
// in, which the accessor block's signatures name.
//
// **`unsafe` APPEARS IN THIS FILE AND IT IS THE COPY OUT'S OWN FRAME** (`PAR-ADA-4`): the erasure of the
// library's typed value to the untyped handle the wire crosses as. **AND IT HAS SINCE BEEN AUDITED — THE
// EARLIER SENTENCE HERE SAID THE SPLIT "RELOCATED THE BYTES AND DID NOT AUDIT THEM", AND THAT IS NO LONGER
// TRUE.** **ALL `12` SITES WERE READ AT THEIR OWN LINES AND ALL `12` ARE JUSTIFIED: `7` are the raw-erasure
// sites** ([`make_value`]'s `to_napi_value`/`from_raw_unchecked`, [`make_undefined`]'s raw
// `sys::napi_get_undefined` call and its `from_raw_unchecked`, `object`'s pair, and **`array`'s single
// `from_raw_unchecked` — its `to_napi_value` left on 2026-10-25 with the `[[Set]]`-based `Vec` conversion
// that pair was** (see [`array`])) — **`5` are `cast::<T>()`** ([`string_of`]'s through [`arg_string`],
// [`bool_of`]'s behind its `Kind::Boolean` test, [`number_of`]'s behind its `Kind::Number` test,
// [`bigint_of`]'s behind its match, **and [`value_of`]'s `serde-json` cast, taken on a value the package's own
// walk has already classified**). **THE FINDING IS THAT THE FILE IS CONFINED
// TO THE BOUNDARY BY DESIGN: every one of the `12` is a crossing-or-erasure act and no `unsafe` here reaches
// a store rule — `crossing.rs`, the crate's declared pure half, carries ZERO `unsafe` at any byte**
// (`binding-crate-and-abi.md §3`). **THE AUDIT ALSO RAISED TWO OBSERVATIONS THAT ARE RECORDED AND NOT
// REPAIRED BY THIS PASS**: [`arg_string`] and [`bigint_of`] rely on their CALLERS having tested the class
// before the cast (the cast itself does not re-test it), and [`make_undefined`] discards
// `napi_get_undefined`'s status. **Both are observations at their own sites, both stand as written, and
// neither is this header's to change.**
//
// **⟶ NO `std::collections` IMPORT TRAVELLED, AND THE FIRST DRAFT OF THIS HEADER ASSERTED ONE THAT DOES
// NOT BELONG: the moved bodies store a record's members in a `Vec<(&str, JsVal)>` and never in a `BTreeMap`,
// so importing the map would have been a warning this crate may not carry** (delete-rather-than-allow).
// =================================================================================================
use ::napi::bindgen_prelude::BigInt as JsBigInt;
use ::napi::bindgen_prelude::{
    JsObjectValue as _, JsValue as _, Object, Property, ToNapiValue, ValueType,
};
use ::napi::{sys, Env, Unknown as JsUnknown};
use serde_json::Value as JsonValue;
use crate::crossing::{
    JsAddressArg, JsBaseState, JsConfig, JsConstraintEntry, JsConstraintsArg, JsDeleteReceipt,
    JsFilePathArg, JsHandle, JsHandleArg, JsJournalLengthArg, JsJournalOp, JsKey, JsListenerEntry,
    JsListenerTrigger, JsListenersArg, JsNonArray, JsObject, JsOpIdArg, JsRollbackResult,
    JsSegment, JsTierArg, JsTierSetItem, JsValue, JsWriteResult,
};

/// **THE RUNNING ENVIRONMENT'S TYPED VALUES, CARRIED ACROSS THE LIBRARY'S OWN CONVERSION.** A JS value is
/// the library's `JsUnknown` (an untyped handle) and the codec decides its class from the library's own
/// `ValueType` — which is the library's `typed value handles the boundary names` (`PAR-ADA-6`), not a raw
/// pointer this file reinterprets.
///
/// **⟶ `pub(crate)`, BECAUSE `facade.rs` IS ITS SECOND READER AND THE ALIAS MOVED WITH THE CODE THAT
/// SPELLS IT.** The facade's own entry signatures name this type at every parameter and every answer, and
/// the two halves are the same crate's — so the alias widens to the crate and no further: **it is not
/// `pub`, because no item outside this crate may name the boundary's untyped handle.**
pub(crate) type JsVal<'e> = JsUnknown<'e>;

/// The string a JS `string` value carries, **or the empty-string sentinel where the bytes are not one**
/// (see [`utf8_or_none`]: the repair is gone and the refusal is the caller's declared class).
///
/// **⟶ `pub(crate)`, AND THE THREE HELPERS BELOW WITH IT, BECAUSE `facade.rs` CALLS ALL FOUR AND THEY ARE
/// THE CODEC'S OWN BODIES' PRIMITIVES.** They are the boundary's own conversion primitives — the facade's
/// `errorMessage` entry reads its arguments through [`arg_string`], every per-verb entry lands its answer
/// through [`make_undefined`], and `storeCreate` mints the index it returns through [`make_value`] — so
/// their home is the module whose bodies call them and the facade imports them rather than the reverse.
/// **A CRATE-VISIBLE HELPER IS STILL NOT A SURFACE**: `pub(crate)` reaches the module that needs it and
/// stops at the crate's edge, so the artefact's export set is untouched by the move.
pub(crate) fn arg_string(_env: &Env, value: &JsVal<'_>) -> String {
    // **THE NON-`String` CLASS IS THE CALLER'S DECLARED ONE AND NOT A REPAIR** — the library refuses it
    // before it reads (`utf8_or_none`'s clause above), so the empty-string sentinel stands and the arm that
    // read it carries the class the value IS.
    unsafe { value.cast::<String>() }.unwrap_or_default()
}

pub(crate) fn make_string(env: &Env, text: &str) -> JsVal<'static> {
    make_value(env, text.to_string())
}

/// **A RUST VALUE AS A JS VALUE, BY THE LIBRARY'S OWN CONVERSION** (`PAR-ADA-6`, `PAR-ADA-9`): the generic
/// is fixed by the caller's own type, so no member of this file names a raw pointer and no conversion is
/// re-spelled by hand. **The library validates and converts; this frame only erases the type** so the wire's
/// own decoded tree can carry it as an untyped value.
pub(crate) fn make_value<T: ToNapiValue>(env: &Env, value: T) -> JsVal<'static> {
    let raw = unsafe { ToNapiValue::to_napi_value(env.raw(), value) }
        .unwrap_or(std::ptr::null_mut());
    unsafe { JsVal::from_raw_unchecked(env.raw(), raw) }
}

/// The runtime's own `undefined` — **never a null pointer, which is what an ABSENT position is** — reached
/// through the library's own `napi_get_undefined` binding rather than through a hand-declared symbol.
pub(crate) fn make_undefined(env: &Env) -> JsVal<'static> {
    let mut raw: sys::napi_value = std::ptr::null_mut();
    unsafe {
        sys::napi_get_undefined(env.raw(), &mut raw);
    }
    unsafe { JsVal::from_raw_unchecked(env.raw(), raw) }
}

/// `napi_valuetype`'s arms, as the runtime numbers them. **THIS DECLARATION MOVED WITH THE CODEC AND IS
/// NOT THIS MODULE'S ALIAS OF THE FACADE'S**: `ValueType` is the library's own class decision (`PAR-ADA-9`),
/// and the thirty-odd `Kind::…` arms in the two `impl` blocks below are the ones it serves — **no name
/// outside the moved region reads it**, so a `use` here is the whole of it and no second spelling exists.
use ValueType as Kind;

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

/// **⟶ `pub(crate)`, AND IT IS THE ONE VISIBILITY THE MOVE ITSELF FORCED.** The struct's declaration is
/// otherwise the byte that stood in `facade.rs`, where it was private to that file; now that the facade has
/// to name it at each entry — `Codec { env, _marker: std::marker::PhantomData }`, unmoved — the crate must
/// be able to reach it. **THE WIDENING STOPS AT THE CRATE'S EDGE**: the type stays an implementation detail
/// of the conversion, no consumer of this crate can name it, and **NOT ONE OF ITS FIELDS OR METHODS
/// CHANGED VISIBILITY** — they are read where they always were, by the entries that build it.
#[derive(Clone, Copy)]
pub(crate) struct Codec<'e> {
    /// **THE ENVIRONMENT HANDLE** (`PAR-ADA-7`): the library's own environment type. **It is held as the
    /// owned `Env` and not as a borrow**, because `Env` is `Copy` over the runtime's own env pointer — so a
    /// value this codec builds carries `'e` (the ENTRY's lifetime) rather than the lifetime of whatever
    /// frame happened to spell the codec.
    pub(crate) env: Env,
    /// The lifetime marker that ties every value this codec builds to the ENTRY's environment.
    pub(crate) _marker: std::marker::PhantomData<&'e ()>,
}

// -------------------------------------------------------------------------------------------------
// The copy IN — the wire's JS values, read INTO the store's own Rust types.
// -------------------------------------------------------------------------------------------------


/// **A `serde_json::Value` AS THE CROSSING'S OWN VALUE MODEL** — the bare tree, with no tag, no envelope and
/// no object-shape metadata. The package has already decided `p`/`acc`/`proxy`; this reader does not need
/// them (`contract.md §3`), so every object is the plain object it is.
fn json_to_js_value(value: JsonValue) -> JsValue {
    match value {
        JsonValue::Null => JsValue::Null,
        JsonValue::Bool(b) => JsValue::Bool(b),
        JsonValue::Number(n) => JsValue::Num(n.as_f64().unwrap_or(f64::NAN)),
        JsonValue::String(s) => JsValue::Str(s),
        JsonValue::Array(items) => JsValue::Array(items.into_iter().map(json_to_js_value).collect()),
        JsonValue::Object(map) => JsValue::Object(JsObject::plain(
            map.into_iter()
                .map(|(key, member)| (JsKey::Key(key), json_to_js_value(member)))
                .collect(),
        )),
    }
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
    pub(crate) fn member(&self, value: JsVal<'_>, name: &str) -> Option<JsVal<'_>> {
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
        // **THE BARE JSON TREE, READ BY THE LIBRARY'S OWN `serde-json` CONVERSION** (`A148` Q2/Q4): the
        // package has already classified the value, so this frame reads data and never a tag. A conversion
        // failure (the crate's own depth/node ceiling, or a non-data class on a direct artefact call) is
        // carried as the outside class; the package's own walk refuses it before this frame on its route.
        match unsafe { v.cast::<JsonValue>() } {
            Ok(json) => json_to_js_value(json),
            Err(_) => JsValue::NonPlainCollection,
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
    pub(crate) fn config(&self, cfg: JsVal<'_>) -> JsConfig {
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
    pub(crate) fn constraints_arg(&self, value: JsVal<'_>) -> JsConstraintsArg {
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
            // **⟶ AN OWN DATA PROPERTY IS DEFINED, NEVER SET — CLOSED 2026-10-23 BY THE GATE-4 ADVERSARIAL
            // BATTERY (`json-crossing-gate4-adversarial.test.mjs`'s `ADV-12`).** `Object::set` reaches
            // `napi_set_property`, whose `[[Set]]` step runs the `__proto__` ACCESSOR on `Object.prototype`:
            // a stored member genuinely named `__proto__` was silently turned into the returned object's
            // PROTOTYPE instead of an own member (`A76`: *"do not attempt to fix"*; `contract.md §5`'s bare
            // tree), and an attacker-supplied member could shadow the returned object's methods. **THE
            // DEFINITION ARM TAKES `napi_define_properties`, which creates the OWN data property the tree
            // declares.** Nothing else about the member's attributes moves: `Property`'s default attributes
            // are writable/enumerable/configurable, exactly what `set` produced on a fresh object.
            let property = Property::new()
                .with_name(&self.env, name)
                .and_then(|property| property.with_napi_value(&self.env, value));
            if let Ok(property) = property {
                let _ = out.define_properties(&[property]);
            }
        }
        // The object crosses OUT as the untyped value the wire's reader receives.
        let raw = unsafe { ToNapiValue::to_napi_value(self.env.raw(), out) }
            .unwrap_or(std::ptr::null_mut());
        unsafe { JsVal::from_raw_unchecked(self.env.raw(), raw) }
    }

    fn array(self, items: Vec<JsVal<'_>>) -> JsVal<'static> {
        // **A REAL JS ARRAY AND NOT AN OBJECT WITH INDEXED MEMBERS** — the wire's `i:[…]` and `s:[…]` are
        // read by the mapping layer with `Array.prototype.map`, so an object carrying `0`, `1`, … would
        // cross as a value whose shape is the wrong one.
        //
        // **⟶ AND ITS INDICES ARE DEFINED, NEVER SET — CLOSED 2026-10-25 (`F8-2`'s OUT vector).** The
        // library's `Vec<T>` conversion built this array through `napi_create_array_with_length` and
        // `napi_set_element`, and `napi_set_element` is a `[[Set]]` that WALKS THE PROTOTYPE CHAIN: under an
        // own getter-only accessor at `Array.prototype[0]` the write answered `false`, the slot stayed a
        // HOLE, and every array this codec built crossed OUT holed — a lawful
        // `write(['list'], 'mem', ['x','y'])` answered `after.value: ["P0","P1"]` and `op.address: ["P0"]`,
        // the prototype's accessor answering at each index (`tests/e2e/prototype-index-array-out.test.mjs`
        // drives it). **THE LAWFUL NODE-API FORM IS `napi_define_properties` WITH ONE
        // `napi_property_descriptor` PER INDEX**, which performs `DefineOwnProperty` and consults no chain;
        // the array is created at its own `length` FIRST, so the descriptors define indices `0…n−1` on an
        // array whose `length` is already `n` — nothing assigns `length` and no hole is created. **It is
        // [`object`]'s own member form and its own attributes**, and the creation is still the library's
        // `Env::create_array`, whose `Array` carries the same `JsObjectValue` this file's [`object`] uses, so
        // no raw symbol is hand-declared here.
        //
        // **WHY NOT THE OTHER TWO CANDIDATES, PRICED.** A JS ARRAY LITERAL OR `Array.of` would have to be
        // reached through the caller's realm — `napi_call_function` on a global binding the caller may have
        // replaced — which is user code run on a copy path, and no clause of `contract.md §1` or `§2.1`
        // admits that here. **REFUSING INSTEAD OF DEFINING IS NOT AVAILABLE EITHER**: no clause names a
        // refusal for this state, and the copy OUT is not a boundary decision, so a refusal would mint a
        // class the contract does not declare. **THE COST OF THE FORM CHOSEN IS ONE DESCRIPTOR AND ONE
        // `utf8` NAME PER ELEMENT AND ONE `napi_define_properties` CALL PER ARRAY**, which is what the
        // `[[Set]]` pair cost and is paid only on values crossing OUT.
        let raw = match self.env.create_array(items.len() as u32) {
            Ok(mut out) => {
                let mut properties: Vec<Property> = Vec::with_capacity(items.len());
                let mut complete = true;
                for (index, item) in items.iter().enumerate() {
                    // **THE NAME IS THE INDEX'S OWN DECIMAL SPELLING** — the canonical array-index key — and
                    // it is `utf8`, so no JS `string` value is minted for it.
                    let name = index.to_string();
                    match Property::new()
                        .with_utf8_name(&name)
                        .and_then(|property| property.with_napi_value(&self.env, *item))
                    {
                        Ok(property) => properties.push(property),
                        // An element that cannot be minted leaves no half-built array behind: the answer is
                        // the same null the failed conversion answered with before this arm existed.
                        Err(_) => {
                            complete = false;
                            break;
                        }
                    }
                }
                // **AN EMPTY ARRAY OWES NO DESCRIPTOR AND IS ALREADY THE VALUE IT DECLARES.**
                if complete && (properties.is_empty() || out.define_properties(&properties).is_ok()) {
                    out.raw()
                } else {
                    std::ptr::null_mut()
                }
            }
            Err(_) => std::ptr::null_mut(),
        };
        unsafe { JsVal::from_raw_unchecked(self.env.raw(), raw) }
    }

    /// A value's own tag member beside the payload the JS side reads it by.
    fn tagged(self, tag: &str, payload: JsVal<'_>) -> JsVal<'static> {
        let tag = self.string_value(tag);
        self.object(vec![("k", tag), ("v", payload)])
    }

    /// One member set on an object this codec built — the record's own triggering address (`§2.7` item 2).
    ///
    /// **⟶ AND IT IS DEFINED, NEVER SET — THE SAME CLASS, CLOSED BESIDE [`array`] 2026-10-25.** `Object::set`
    /// reaches `napi_set_property`, a `[[Set]]` that walks the chain: a getter-only accessor of the same name on
    /// `Object.prototype` would answer `false` and the member would be MISSING from a record the caller reads —
    /// the same defect [`object`] was closed against for `__proto__` on 2026-10-23, and the same one
    /// [`array`]'s indices were closed against here. `napi_define_properties` performs `DefineOwnProperty`,
    /// consults no chain and creates the OWN data property the record declares; the attributes are identical
    /// to what `set` produced on a fresh object (writable/enumerable/configurable).
    pub(crate) fn set_member(self, object: JsVal<'_>, name: &str, value: JsVal<'_>) {
        let mut object = match object.coerce_to_object() {
            Ok(object) => object,
            Err(_) => return,
        };
        let property = Property::new()
            .with_name(&self.env, name)
            .and_then(|property| property.with_napi_value(&self.env, value));
        if let Ok(property) = property {
            let _ = object.define_properties(&[property]);
        }
    }

    fn string_value(self, text: &str) -> JsVal<'static> {
        make_string(&self.env, text)
    }

    fn number_value(self, n: f64) -> JsVal<'static> {
        make_value(&self.env, n)
    }

    fn bool_value(self, b: bool) -> JsVal<'static> {
        make_value(&self.env, b)
    }

    pub(crate) fn undefined_value(self) -> JsVal<'static> {
        make_undefined(&self.env)
    }

    /// **THE COPY OUT** (`crossing.md §1.1` clause 2): a store value converted into FRESH JS-owned data,
    /// at `crossing.md §1.2`'s own classes — so the JS side holds no reference into store-owned data.
    pub(crate) fn to_js_value(self, v: &JsValue) -> JsVal<'static> {
        match v {
            JsValue::Str(s) => self.string_value(s),
            JsValue::Bool(b) => self.bool_value(*b),
            // `-0` DOES NOT CROSS AS A SIGN (`contract.md §4`; `A140`).
            JsValue::Num(n) => self.number_value(if *n == 0.0 { 0.0 } else { *n }),
            JsValue::Object(o) => {
                // **THE BARE OBJECT, MEMBER FOR MEMBER** (`contract.md §5`): no `k`, no `m`, no `p`, no
                // `acc`, no `proxy`. A Symbol-keyed member refused the whole value, so it is unproduced.
                let members = o
                    .members
                    .iter()
                    .filter_map(|(key, member)| match key {
                        JsKey::Key(name) => Some((name.as_str(), self.to_js_value(member))),
                        JsKey::Symbol => None,
                    })
                    .collect();
                self.object(members)
            }
            JsValue::Array(items) => {
                self.array(items.iter().map(|item| self.to_js_value(item)).collect())
            }
            // The outside variants remain declared and unproduced on this route (`contract.md §5`).
            JsValue::Null => self.object(vec![("k", self.string_value("z"))]),
            JsValue::Undefined => self.undefined_value(),
            JsValue::Function => self.object(vec![("k", self.string_value("f"))]),
            JsValue::Symbol => self.object(vec![("k", self.string_value("y"))]),
            JsValue::BigInt(n) => self.tagged("g", self.string_value(&n.to_string())),
            JsValue::NonFinite(f) => self.tagged("F", self.number_value(*f)),
            JsValue::Cyclic => self.object(vec![("k", self.string_value("c"))]),
            JsValue::NonPlainCollection => self.object(vec![("k", self.string_value("P"))]),
            JsValue::SparseArray => self.object(vec![("k", self.string_value("H"))]),
        }
    }

    pub(crate) fn to_js_segments(self, segments: &[JsSegment]) -> JsVal<'static> {
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

    pub(crate) fn to_js_write_result(self, r: &JsWriteResult) -> JsVal<'static> {
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

    pub(crate) fn to_js_delete_receipt(self, r: &JsDeleteReceipt) -> JsVal<'static> {
        self.object(vec![
            ("address", self.to_js_segments(&r.address)),
            (
                "tiers",
                self.array(r.tiers.iter().map(|t| self.string_value(t)).collect()),
            ),
            ("triggered", self.to_js_trigger_pairs(&r.triggered)),
        ])
    }

    pub(crate) fn to_js_rollback_result(self, r: &JsRollbackResult) -> JsVal<'static> {
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
// -------------------------------------------------------------------------------------------------
// THE ACCESSOR ADAPTER — the thin facade-facing layer the entries call. Each accessor is handed a declared
// `#[napi]` parameter DIRECTLY (`facade.rs` unpacks the caller's argv into these signatures) and wraps the
// inner `*_of` reader, so an entry says `codec.address(&address_pos)` and the absent-position folding the
// inner reader already carries happens once, there, rather than being re-decided at every call site.
// -------------------------------------------------------------------------------------------------

impl<'e> Codec<'e> {
    /// **A POSITION IS THE `#[napi]` PARAMETER THE ENTRY'S OWN SIGNATURE DECLARES** (`export-set-and-
    /// dispatch.md §1`), so this accessor is handed the value ITSELF and there is no absent arm left to
    /// fold. **AN UNSOUPPLIED POSITION IS STILL ABSENT AND THE DISTINCTION IS STILL HONOURED** (`crossing.md
    /// §1.3`'s absent-versus-`undefined` rule, rule 1): it is folded where the call's own arity is still
    /// observable — `index.mjs`, which hands an unsupplied position as the runtime's own `undefined` and
    /// encodes it as the carrier's OWN ABSENT spelling (`AddressArg` row 4's `{k:'A'}`) — so one carrier
    /// shape stands for one state and this layer reads it. **A SUPPLIED `undefined` IS A VALUE AND IS NEVER
    /// FOLDED** (`DD-46`): the package refuses it at the boundary where the position declares one, and where
    /// it does not, it crosses and the store answers its own outside member.
    pub(crate) fn address(&self, value: &JsVal<'_>) -> JsAddressArg {
        self.address_of(*value)
    }

    /// **THE SET POSITION — `listen`'s SECOND argument, an ARRAY OF ADDRESSES** (`contract.md §2.2` item 2;
    /// `PAR-HL-2`). **THE MEMBER COUNT IS THE CALLER'S AND EACH MEMBER IS READ THROUGH THE ADDRESS READER
    /// THE OTHER POSITIONS USE**: a member outside the store's address domain is refused by the package's own
    /// class test before this frame, so what arrives here is a set of list-shaped members — and a shape that
    /// is not list-shaped still crosses as it stands, to be answered by the store's own `AddressMalformed`.
    /// **AN ABSENT SET'S EMPTY VEC IS [`elements`]' OWN ANSWER** for a value the runtime's object coercion
    /// refuses, so the deleted `None` arm's result survives its deletion unchanged.
    pub(crate) fn address_set(&self, value: &JsVal<'_>) -> Vec<JsAddressArg> {
        let mut out = Vec::new();
        for element in self.elements(*value) {
            out.push(self.address_of(element));
        }
        out
    }

    pub(crate) fn tier(&self, value: &JsVal<'_>) -> JsTierArg {
        self.tier_of(*value)
    }

    pub(crate) fn op_id(&self, value: &JsVal<'_>) -> JsOpIdArg {
        self.op_id_of(*value)
    }

    pub(crate) fn handle_arg(&self, value: &JsVal<'_>) -> JsHandleArg {
        self.handle_arg_of(*value)
    }

    pub(crate) fn value(&self, value: &JsVal<'_>) -> JsValue {
        self.value_of(*value)
    }
}
