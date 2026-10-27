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

// **⟶ AND `Property` JOINS THE LIST WITH `D-35`'S CURE, BECAUSE [`throw_refusal`] NOW BUILDS THE
// `status` AND `message` IT DEFINES WITH `napi_define_properties` AND NO LONGER WITH `[[Set]]`** — the same lawful form `codec.rs`'s copy OUT
// already uses for every member it defines. Its ONE reader is that frame.
use ::napi::bindgen_prelude::{JsObjectValue as _, Object, Property};
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
// **THE `sys` IMPORT AND THE `Unknown as JsUnknown` ALIAS BOTH LEFT THIS LIST WITH THE MOVE, DELETED RATHER
// THAN SUPPRESSED** (this crate's doctrine): `sys::napi_get_undefined` is now called by `codec.rs`'s
// [`make_undefined`] and the untyped handle is spelled by `codec.rs`'s [`JsVal`], so neither has a reader
// here — and a name no live path names is a warning this file may not carry.
use ::napi::Env;
// **THE ENTRY LAYER'S OWN ANNOTATION — `binding-crate-and-abi.md §1`'s THIRD DEPENDENCY, AT ITS ONE USE.**
// `#[napi]` is the adoption's whole subject: it builds the `extern "C"` trampoline, unpacks the caller's
// argv into the Rust types below, converts the answer back and REGISTERS the name in the module's export
// table. **ITS EXPANSION IS CONFINED TO THE FIVE ENTRY FUNCTIONS THIS FILE DECLARES** and it never reaches
// `crate::crossing` (`§3`): the annotation is on the boundary's own frames and on no core type.
use ::napi_derive::napi;

// **THE NAMES BELOW ARE THE ONES THE ENTRIES AND THE ENTRY-SIDE HELPERS STILL NAME, AND THE LIST SHRANK
// WITH THE MOVE RATHER THAN BEING LEFT WIDER THAN ITS USE** (this crate's doctrine is delete-rather-than-
// allow, so a name no live path names is a warning this file may not carry). **THE TWENTY-TWO `Js*` NAMES
// THAT CROSSED TO `codec.rs` WERE DELETED FROM THIS LIST, NOT SUPPRESSED** — the codec is their only
// reader and it imports them from `crate::crossing` itself.
//
// **AND THE FIVE CONVERSION PRIMITIVES ARE IMPORTED FROM `codec.rs` RATHER THAN DECLARED HERE** — the
// `JsVal` alias and the four free helpers. **THIS FILE IS NOW THEIR READER AND NO LONGER THEIR HOME**: the
// codec DEFINES them, because its own bodies call every one of them, and the facade names them at the uses
// listed above. **SO THE DEPENDENCY RUNS ONE WAY AND THERE IS NO CYCLE TO BREAK**: `codec` imports nothing
// from this file, and this file imports these five from `codec`. **A CRATE-VISIBLE HELPER IS STILL NOT A
// SURFACE**, which is why the five cross the module seam as `pub(crate)` and stop at the crate's edge.
//
// **`make_string` IS THE ONE OF THE FOUR THIS FILE DOES NOT NAME, SO IT IS NOT IMPORTED** — the entries
// mint their strings through the codec's accessors, which is where it is read. It is deleted from this list
// rather than suppressed, on the same ruling as the `Js*` names above; the other four have live readers
// here and stay.
use crate::codec::{arg_string, make_undefined, make_value, Codec, JsVal};
use crate::crossing::{self, JsAddressArg, JsOpIdArg, JsSegment, Refusal};

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
///
/// **⟶ `pub(crate)`, ON THE SAME RULING AS [`JsVal`] — WHICH IS NOW DECLARED IN `codec.rs` AND IMPORTED
/// HERE:** the codec's accessor block is typed in it and `codec.rs` is a sibling module, so the crate must
/// be able to name it — and nothing beyond the crate, because the entries' answer is the callback
/// boundary's own type.
pub(crate) type NapiRet<'e> = Result<JsVal<'e>, ::napi::Error>;

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
/// **THE OBJECT IS A JS PLAIN OBJECT AND NOT A RUST STRUCT CROSSING**: `Object::new` defines the object, so
/// the value the runtime throws has `Object.prototype` for its prototype and exactly the two keys this
/// function defined.
///
/// **⟶ AND ITS `status` AND `message` ARE *DEFINED* OWN DATA PROPERTIES, NEVER *SET* — `D-35`'s SECOND NAMED
/// PARAMETER-ACCESS HOLE, CLOSED ON THE CODEC'S OWN PRECEDENT.** `Object::set` reaches `napi_set_property`,
/// whose `[[Set]]` step WALKS THE PROTOTYPE CHAIN: under a caller-installed own `status` on
/// `Object.prototype` that is non-writable or carries no setter, the write answers `false` and **THE OWN
/// MEMBER IS DROPPED** — measured on the artefact before this cure, with a non-writable
/// `Object.prototype.status`: the thrown refusal's own members were `own=["message"]`,
/// `hasOwnStatus=false`, and `refusal.status` answered the caller's prototype string. **The boundary had
/// produced a refusal carrying neither of the members the form declares, out of a value the caller can
/// reach without breaking anything of their own.** **THE CURE IS THE ONE [`crate::codec`] TOOK FOR ITS OWN
/// MEMBERS** (`napi_define_properties`, which performs `DefineOwnProperty` and consults no chain), and
/// **nothing else about the form moves**: `Property`'s default attributes are
/// writable/enumerable/configurable, exactly what `set` produced on a fresh object, so the thrown value is
/// the same three-member form with the same bytes (`D-35`; `failure-form.md §1`; the `F8-2` class).
fn throw_refusal(env: &Env, refusal: &Refusal) {
    let mut object = match Object::new(env) {
        Ok(object) => object,
        // A frame that cannot build the form is a frame whose environment is already failing: there is no
        // second shape to fall back to, so the value that IS there crosses as itself.
        Err(_) => return,
    };
    // **THE `status` AND `message` THE CORE'S `Refusal` OWNS, EACH DEFINED FROM THE CORE'S OWN BYTES** — never read
    // back off the object this frame is constructing and off no caller's object (`D-35`'s own principle).
    let mut properties: Vec<Property> = Vec::with_capacity(2);
    for (name, value) in [
        ("status", refusal.status.clone()),
        ("message", refusal.message.clone()),
    ] {
        let property = Property::new()
            .with_name(env, name)
            .and_then(|property| property.with_napi_value(env, value));
        match property {
            Ok(property) => properties.push(property),
            // A member that cannot be minted leaves no half-built form behind, exactly as the `set` arm it
            // replaces did: the environment is already failing and there is no second shape to fall to.
            Err(_) => return,
        }
    }
    if object.define_properties(&properties).is_err() {
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
// THE WIRE AND ITS CODEC MOVED TO THEIR OWN MODULE — `bindings/js/src/codec.rs`, A PURE MOVE AND
// NOT A REWRITE (`U-STOREROOM-ADDON-ADOPTION`).
//
// **WHAT STOOD HERE AND IS NOW THERE, BYTE FOR BYTE: this header block; the `#[derive(Clone, Copy)]
// struct Codec<'e>` with its own doc block; its first `impl<'e> Codec<'e>` block, carrying the copy IN;
// its second `impl` block, carrying the copy OUT; and the accessor block that binds the entries' own
// positions to the codec's readers.** Its FOUR helpers — [`arg_string`] · [`make_string`] ·
// [`make_value`] · [`make_undefined`] — and its type alias [`JsVal`] went with it, because the codec's own
// bodies call all four and spell the alias at every signature; **this file imports those five from
// `codec.rs`, and no second copy of any conversion exists.** The other alias, [`NapiRet`], has its only
// readers here — the entries' own signatures — and stays declared in this file: **it is the one of the
// pair the codec never named.**
//
// **⟶ SO THE DEPENDENCY BETWEEN THE TWO HALVES RUNS ONE WAY AND THAT IS THE POINT OF THE SECOND MOVE**:
// `codec.rs` names `crate::facade` on NO line, while this file imports [`Codec`], the four helpers and
// [`JsVal`] from `codec`. **THE PRIMITIVES CROSSED TO THE MODULE THAT CALLS THEM MOST, RATHER THAN BEING
// COPIED OR CROSS-IMPORTED** — which is what keeps the pair a direction instead of a cycle.
//
// **⟶ NOTHING OF THE CODE THAT MOVED WAS EDITED, AND THE ARGUMENT IS THE MOVE'S OWN**: the artefact
// still exports the thirteen names with every declared arity unmoved, `crossing.rs` is untouched and
// still pure, and the codec sits on every verb's path, so a live call is the witness that the split
// changed a location and not a behaviour. **THIS FILE IS SMALLER BY THE MOVED REGION AND ITS REMAINDER IS
// UNMOVED.**
//
// **THE ONE NAME THIS FILE NOW NAMES ACROSS THE SEAM IS `Codec` ITSELF**, built at each entry as
// `Codec { env, _marker: std::marker::PhantomData }` exactly as before; the seam is a `use` line and no
// call site changed.
// =================================================================================================

// =================================================================================================
// THE INSTANCES AND THE REGISTRY'S FUNCTION SLOTS — thread-local, and THE BOUND THAT PUTS THEM THERE IS
// `Sync`, NOT `Send`.
//
// **`Store` AND `Instance` ARE BOTH `Send`, SO THE REASON ONCE GIVEN HERE — *"a `Store` is not required
// to be `Send`"* — IS FALSE AND IS CORRECTED AT ITS OWN BYTES.** `assert_send::<storeroom_native::Store>()`
// and `assert_send::<crossing::Instance>()` both compile, `src/store.rs` holds no `Rc`, no raw-pointer
// field and no `Cell`, and there is no `impl !Send` and no `unsafe impl Send` anywhere in `src/` or in this
// crate's `src/`. **WHAT WOULD ACTUALLY BE REJECTED IS A `static`, AND IT IS REJECTED ON `Sync` ALONE.**
// `static INSTANCES: RefCell<Vec<crossing::Instance>>` fails to compile with E0277 — *"`RefCell<Vec<…>>`
// cannot be shared between threads safely"*, *"the trait `Sync` is not implemented for `RefCell<Vec<…>>`"*,
// *"shared static variables must have a type that implements `Sync`"* — **AND `RefCell` IS PRECISELY WHAT
// DISQUALIFIES IT**: its runtime-checked interior mutability is the property that buys the cheap
// `borrow_mut`, and it is bought by declining `Sync`. The `Send` half is satisfied and is not the bound that
// bites: `RefCell<Vec<…>>` IS `Send` whenever its contents are.
//
// **SO THE `thread_local!` IS A CHOICE ABOUT A BOUND AND NOT ABOUT THREAD AFFINITY, AND THE AFFINITY CLAIM IS
// THE ONE THAT DOES NOT HOLD.** The addon IS reached from the runtime's own thread — `#[napi]` entries run
// on whichever thread called in, and in this package that is the runtime's own — but **nothing here enforces
// it**: `Env` is the genuine thread-bound handle (`napi-3.14.2/src/env.rs:70` wraps `sys::napi_env`, which
// `napi-sys-3.4.0/src/types.rs:15` declares as `*mut napi_env__`, a raw pointer, so `Env` is neither `Send`
// nor `Sync`), and **`Env` is passed BY VALUE into every entry and never stored in this cell** — so it
// constrains the entries' own signatures and does not reach this storage at all. A `static` would be honest
// about the affinity fact and still refuse to compile; the `thread_local!` is what the `Sync` bound leaves,
// and a store reached from a second thread would be a defect of the CALLERS rather than a state this file
// could guard against.
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
// **⟶ AND A TENTH STANDS BESIDE THEM 2026-10-27 (`restoreMark`), WHICH IS NOT ONE OF THE NINE AND IS NOT A
// MEMBER OF THE FOURTEEN.** It joins `rollback` as the journal's second consumer — the store's
// `restoreMark(mark?)` — and it is reached by the package's own refusal path
// (`src/entry/constraints.mjs`) and by nothing else. The NINE are unmoved, name for name and arity for
// arity; the set this file declares is `9 + 1 = 10` PER-VERB and `4 + 10 = 14` IN ALL.
//
// **THE DISPATCHER'S STRING INDIRECTION GOES** (`contract.md §2` item 2; `§3`): `call(instance, verb, args)`
// matched the verb as a JS string across nine arms and showed as its own frame with the verb as DATA. **THE
// SPLIT IS PRECISELY ITS REPLACEMENT, SO `call` DOES NOT SURVIVE** (`export-set-and-dispatch.md §2`), and
// each arm now stands at its own `#[napi]` entry: **the verb IS the frame's name.**
//
// **EACH ENTRY TAKES ITS VERB'S OWN ARGUMENTS AND NOTHING ELSE** (`§4`). The instance position that once
// preceded them is GONE and is not reintroduced; **the store arrives by the receiver** — the Node-API `this`
// that `napi-derive` injects from `cb.this()` into the entry's `receiver: This<Object<'_>>` parameter
// (`receiver-and-refusal.md §1`), which this layer reads at [`store_index_of`] and nowhere else. **AN
// ELEMENT-ZERO RECEIVER WAS TRIED AND ABANDONED, SO IT IS NOT THE RECEIVER'S POSITION**: *"the first call
// argument and the first element of the call array"* is the WITHDRAWN spelling, and `§1`'s ruling is the
// Node-API `this`. The receiver holds no position in any entry's declared parameters.
//
// **THE ARITIES ARE THE CLAUSE'S OWN TABLE, COUNTED FROM THE VERB'S OWN POSITIONS** (`§1`; `§4`), and they
// were corrected here: the five- and three-position readings this cell carried were the PRE-REMOVAL ones and
// included the instance position, which is gone. The live table is
// `read`(2) · `readLiteral`(2) · `write`(4) · `delete`(2) · `rollback`(1) · `restoreMark`(1) · `listen`(2) ·
// `unlisten`(1) · `removeListener`(1) · `commitFile`(1) — and each equals its entry's declared `#[napi]`
// parameter count below, the receiver excluded because it is not a declared parameter. **`restoreMark`'s one
// position is the journal MARK** (`OpIdArg`: an op id, or the ABSENT carrier for the journal's head).
//
// **`commit` IS NOT AN ENTRY AND NEVER WAS AN ARM**: it is `write`'s FOURTH POSITION, whose class test the
// package takes before this frame is entered (`§2`; `commitPositionRefusal`). **`constraints` IS NOT AN
// ADDON ENTRY EITHER** — the addon is never reached for it (`§2`).
// =================================================================================================

/// **THE ARGUMENT-READING PROTOCOL, STATED ONCE FOR THE NINE** (`crossing.md §1.3`'s absent-versus-
/// `undefined` rule): an UNSOUPPLIED position folds to ABSENT and a SUPPLIED `undefined` is a VALUE —
/// **and `undefined` IS A VALUE THAT CROSSES IN AND IS REFUSED BY THE STORE'S OWN TAXONOMY**
/// (`DD-46`: `JsValue::Undefined` reaches the store as its own outside member), never read here as an
/// absence. **THIS DISTINCTION IS WHY THE POSITIONS ARE HANDED AS THE RUNTIME'S `undefined` RATHER THAN
/// DROPPED**: an absent position is a SHORT call, and shortening is exactly what `S-ARITY` calls one-fewer.
///
/// **AND EACH VERB'S POSITIONS ARE THE `#[napi]` PARAMETERS ITS OWN SIGNATURE DECLARES**, so the boundary
/// supplies a value for every one of them and the entries hand them to [`Codec`]'s accessors DIRECTLY.
/// **THE ABSENT ROW IS REACHED, AND IT IS REACHED THROUGH `index.mjs`**: a position the caller did not
/// supply is handed as the runtime's own `undefined`, which `index.mjs` encodes as the carrier's OWN
/// ABSENT spelling (`AddressArg` row 4's `{k:'A'}`, `TierArg` row 3's, `OpIdArg` row 2's) and refuses
/// verbosely where a position is outside its domain — *"A position the call supplied no value for is
/// handed as the runtime's own `undefined` — NEVER as an absent array slot"* (`index.mjs`'s own comment
/// at `read`).
///
/// **⟶ AND THE VEC AND ITS `position()` READER STOOD HERE AND ARE DELETED, AS RESIDUE OF THE ABANDONED
/// ELEMENT-0 RECEIVER DESIGN** (whose receiver ruling is `receiver-and-refusal.md §1`/`§5`, and whose
/// surplus `_tail` parameter the previous pass removed). Under that design `args` WAS the JS `Array` a
/// caller passed, so an index could genuinely fall off the end and `None` was a real case. **WHEN THE
/// NINE MOVED TO FIXED `#[napi]` PARAMETERS THE ARITY BECAME STRUCTURAL** — the boundary supplies every
/// declared parameter — and every call site's index was strictly inside its own vec's length, so the
/// `Option` was ALWAYS `Some` and the `None` arm UNREACHABLE from the entries. The entries now pass their
/// parameters directly, which is the same value each index read, reached without the indirection.
///
/// **⟶ AND THE RECEIVER'S OWN `Option` HAS NOW GONE THE SAME WAY — THE FOURTH RESIDUE OF THE SAME
/// ABANDONED DESIGN, AND THE LAST.** `store_index_of` took `Option<&Object<'_>>` and opened with a
/// `let Some(…) else { return Err(not_a_receiver()) }` guard. **THAT ARM WAS UNREACHABLE**: `napi-derive`
/// injects the receiver into every entry's `receiver: This<Object<'_>>` from `cb.this()`, so the host
/// supplies it or the entry is not entered, and **all ten call sites passed `Some(&receiver)` — ten `Some`s,
/// no `None`, ever.** The `Some(…)` wrap was not redundant for the COMPILER (`&This<Object>` does not coerce
/// to `Option<&Object>`), but it WAS redundant for the design: it wrapped a case no caller can produce. The
/// parameter is now `&Object<'_>` and the ten call sites hand `&receiver` directly. **`not_a_receiver()`
/// SURVIVES THE DELETION AND ITS THREE REMAINING CALL SITES ARE REACHABLE** — a `Symbol.for` read that fails,
/// a channel that is not a number, and the table miss — so the token it answers and the observable it names
/// are unmoved.

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
/// **AND A CALL NAMING NO LIVE STORE REFUSES IN THE ONE DECLARED FORM** (`§3`): a receiver that is not an
/// object, one that carries no readable `Symbol.for`-keyed channel, one whose channel is
/// not a number, and one whose index the table does not hold all answer THE ONE REFUSAL — a THROWN PLAIN
/// OBJECT `{status, message}` and never an `Error`, never a `TypeError`, and never a library error
/// (`failure-form.md §1`; `P-ADA-3`, `F-4`).
///
/// **⟶ AND THE "ABSENT RECEIVER ARGUMENT" THIS LINE ONCE LISTED IS DELETED, BECAUSE THE RECEIVER IS
/// STRUCTURAL AND CAN NO LONGER BE ABSENT.** The parameter is `&Object<'_>` and not an `Option`, and every
/// caller hands the Node-API `this` (`receiver-and-refusal.md §1`): the host supplies it or the entry is not
/// entered, so *"there is no receiver"* is not a state this function can be asked about. **THE FOUR CASES
/// THAT REMAIN ARE THE ONES A RECEIVER THAT IS PRESENT BUT NAMES NO LIVE STORE CAN PRODUCE** — a detached
/// call, a never-issued value and a released store, which `§3` declares as ONE observable.
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
fn store_index_of(env: &Env, receiver: &Object<'_>) -> Result<usize, Refusal> {
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
    let Ok(carried_index) = receiver.get_property::<_, JsVal<'_>>(channel_key) else {
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
/// §1`), and each entry resolves its store from it via [`store_index_of`]. **EACH ENTRY THEREFORE TAKES
/// THE VERB'S OWN POSITIONS AS ITS DECLARED `#[napi]` PARAMETERS AND PASSES THEM DIRECTLY** — the verb's
/// OWN FIRST argument is the entry's own first parameter, with no instance among them and no array beside
/// them (`§4`).
///
/// **⟶ THE ELEMENT-ZERO DESIGN WAS ABANDONED, AND THE REASON IS RECORDED RATHER THAN LEFT AS A TRACE**: an
/// earlier shape took the receiver as the call array's FIRST element and began each entry's declared
/// positions at element ONE. It was withdrawn with the whole element-0 scheme — the receiver ruling is
/// `receiver-and-refusal.md §1` (*"each entry resolves its store from the Node-API `this` receiver — the
/// value already received at every entry and today discarded"*), and the rejected alternatives that had
/// gathered around the array shape are named and refused at `§5` (binding the members to the instance, and a
/// `WeakMap` from receiver to store). **THE RECEIVER'S POSITION IN THE CALL IS NOT THE ONLY RESIDUE THE
/// DESIGN LEFT**: the call array itself, and the `position(&positions, n)` reader every entry used to read
/// it back through, were the other half and are DELETED at the note above [`store_index_of`]. **WHAT
/// SURVIVES OF THE ABANDONED SPELLING IS THE PROSE THAT RECORDS IT — this clause, the note above
/// [`store_index_of`], and [`register`]'s own interior comment — and it survives in NO byte of any entry's
/// declared positions.**
#[napi(js_name = "read")]
fn verb_read(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION
    // CARRIER AT THIS BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]`
    // parameter is ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design
    // left (and `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS
    // THE ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as
    // the RUNTIME'S OWN `undefined`, and a supplied `undefined` as that same value, so the two are told
    // apart by the CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the
    // ONE call that folds is the one that supplied nothing). **THE DECLARED ARITY EQUALS THE CALL SHAPE,
    // WITH NO SURPLUS TAIL** (`§4`).
    let store_index = match store_index_of(&env, &receiver) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    // **THE `&mut` BORROW IS DELIBERATELY UNIFORM ACROSS THE ENTRIES, AND THE ONE SHARED-BORROW CASE IS
    // LEFT UNTILTED ON PURPOSE** — so this entry and `readLiteral`, the only two that COULD take a shared
    // borrow, take the exclusive one anyway. **OF THE TEN STORE-REACHING METHODS ON `Instance`, EIGHT MUTATE
    // AND ONLY TWO — `read` and `read_literal` — TAKE `&self`**: `write`, `delete`, `rollback`, `listen`,
    // `unlisten`, `remove_listener`, `commit_file` and `register` all take `&mut self`, so `get_mut` is the
    // correct DEFAULT and the shared borrow is the exception rather than the rule.
    // **AND THE DISTINCTION IS NOT READABLE OFF THE VERB**: `delete` LOOKS read-only and takes `&mut self` —
    // it returns a receipt and mutates the store — so a per-entry judgement would have to be RE-DERIVED
    // CORRECTLY EACH TIME, against a name that does not carry the answer, and **A MIS-CLASSIFICATION HERE IS
    // SILENT UNTIL IT IS A COMPILE ERROR AT BEST OR A WIDENED BORROW AT WORST.** **THE STRONGER BORROW COSTS
    // NOTHING TODAY BECAUSE IT IS CONFINED TO THIS CLOSURE AND RELEASED BEFORE ANYTHING ELSE RUNS**, which is
    // exactly what the closure boundary is for; the cost it WOULD have is a WIDENED BORROW SCOPE — an
    // `INSTANCES` borrow held live across the encoder, the core call and the translation back — and that is
    // the one thing the closure exists to prevent. See the block above the nine for the note on `register`
    // and `storeCreate`, which take the same borrow for the same reason.
    let answer: Result<JsVal<'static>, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances.get_mut(store_index).ok_or(no_instance_at(store_index))?;
        let address = codec.address(&address_pos);
        let tier = codec.tier(&tier_pos);
        let value = store.read(&address, &tier)?;
        Ok(codec.to_js_value(&value))
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "readLiteral")]
fn verb_read_literal(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE TWO DECLARED POSITIONS ARE THE TWO THE LITERAL READ TAKES**,
    // exactly as `read`'s are — the literal read is `read` narrowed at the target and takes no position
    // `read` lacks, and the surplus tail is removed from this entry as it is from `read`.
    let store_index = match store_index_of(&env, &receiver) {
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
        let address = codec.address(&address_pos);
        let tier = codec.tier(&tier_pos);
        let value = store.read_literal(&address, &tier)?;
        Ok(codec.to_js_value(&value))
    });
    answer_or_throw(env, answer)
}

/// **`write` CARRIES A FOURTH POSITION THE OTHERS DO NOT** (`export-set-and-dispatch.md §1`; `§4`): its
/// fourth declared position is the ADOPTED RECORD IDENTITY a repair write's join key names (`PAR-SAS-4`,
/// preserved unmoved), and **a caller supply of it is an unsupported anti-pattern that is neither refused
/// by arity nor detected by a test** (`§4`) — which is why this entry reads three positions and no more.
///
/// **AND THE FOURTH POSITION IS THE LAST ONE — THE SURPLUS FIFTH `_tail` IS REMOVED.** **THE RECORD IS NOT
/// CONSUMED HERE AND WAS NEVER READ BY THIS BODY**: no read of `commit_identity` stands anywhere in this
/// file, so the fourth position is DECLARED AND NOT READ, exactly as [`verb_write`]'s own comment
/// records. **THE RECORD IS CONSUMED IN THE MEMBER, NOT HERE**: the kernel hands it to the PACKAGE
/// (`constraint-kernel.mjs`'s `store.write(address, tier, value, record)`), whose `write` member refuses a
/// bad one at `commitPositionRefusal` and then spreads **three** encoded args to this entry. The four
/// positions `§1`/`§4` declare stand as the verb's own call shape, and the fifth did not.
///
/// **AND THE TRIGGERING ADDRESS CROSSES BESIDE THE RECORD** (`§2.7` item 2, `PAR-JS-12`): the invocation
/// window opens AFTER this frame returns, in the mapping layer that holds the caller's functions.
#[napi(js_name = "write")]
fn verb_write(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>, value_pos: JsVal<'_>, commit_identity: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `4`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE FOURTH DECLARED POSITION IS THE COMMIT IDENTITY** — the
    // adopted record identity a kernel-driven write carries (`§1`: *"it carries a fourth position the others
    // do not"*; `surface.md §2.2`'s `commit?` clause) — **and it is CONSUMED WITHOUT BEING READ HERE**: the
    // class test on it is the PACKAGE's, taken before this frame is entered (`§2`, `commitPositionRefusal`),
    // and this entry reads the three positions above and no more. **THE FOURTH CARRIES THE DECLARED CALL
    // SHAPE; THE SURPLUS FIFTH IS REMOVED.**
    let store_index = match store_index_of(&env, &receiver) {
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
        let address = codec.address(&address_pos);
        let tier = codec.tier(&tier_pos);
        let value = codec.value(&value_pos);
        let result = store.write(&address, &tier, &value)?;
        let answer = codec.to_js_write_result(&result);
        let triggering = codec.to_js_segments(&segments_of(&address));
        codec.set_member(answer, "triggeringAddress", triggering);
        Ok(answer)
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "delete")]
fn verb_delete(env: Env, receiver: This<Object<'_>>, address_pos: JsVal<'_>, tier_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE TWO DECLARED POSITIONS ARE THE TWO THE STORE'S OWN `delete`
    // TAKES** — the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let address = codec.address(&address_pos);
        let tier = codec.tier(&tier_pos);
        let receipt = store.delete(&address, &tier)?;
        let answer = codec.to_js_delete_receipt(&receipt);
        let triggering = codec.to_js_segments(&segments_of(&address));
        codec.set_member(answer, "triggeringAddress", triggering);
        Ok(answer)
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "rollback")]
fn verb_rollback(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `1`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE ONE DECLARED POSITION IS THE ONE THE STORE'S OWN `rollback`
    // TAKES** — the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let op_id = codec.op_id(&op_id_pos);
        let result = store.rollback(&op_id)?;
        Ok(codec.to_js_rollback_result(&result))
    });
    answer_or_throw(env, answer)
}

/// **`restoreMark(mark?) → undefined` — THE JOURNAL'S SECOND CONSUMER, AND THE ONLY ENTRY THAT REACHES NO
/// MEMBER OF THE FOURTEEN.**
///
/// **WHAT IT JOINS.** It stands BESIDE `rollback`, the store's other journal verb, and it IS the store's own
/// `restoreMark` (`src/store.rs`) and nothing else: the entry hands the mark across, the store replays its own
/// journal to the state that mark describes, and the entry answers `undefined` on the `listen`/`unlisten`
/// precedent — **there is no member to return and no record to shape**, because the state is read back through
/// `read` (the ONE route to state, `§2.4` item 9) and is never carried out of this frame.
///
/// **IT IS AN ADDON VERB AND NOT A MEMBER.** The product's instance carries its FOURTEEN declared members and
/// this one is not among them: `index.mjs` reaches it exactly as it reaches `rollback` — `Reflect.apply` on the
/// addon's own entry, bound to the instance — from `constraints.mjs`'s refusal path, and no subpath publishes
/// it and no member exposes it. **THE ADDON'S OWN EXPORT SET IS THEREFORE FOURTEEN NAMES — the four standing
/// plus the nine per-verb entries this file declared plus THIS ONE** — and the cells that read that set are
/// amended where they stand (`tests/e2e/addon-surface.test.mjs`, `addon-adoption.test.mjs`).
///
/// **THE POSITION.** `mark` is the store's own `OpIdArg`: an op id names the state that stood immediately
/// after that operation landed, and **a position the caller supplies NO value for is the ABSENT carrier, which
/// the store reads as THE HEAD** — the state the journal's most recent entry describes. **That is the mark the
/// refused-reversal restore names, and it is named by ABSENCE and not by a token**: a reversal appends no entry
/// (`src/store.rs`'s `rollback`), so the head is still the pre-reversal state after the reversal ran.
///
/// **WHAT IT DOES NOT DO, AT THIS BOUNDARY.** It opens no commit, evaluates no pair, delivers no listener and
/// appends no journal entry — the store's own method states each — so the package's judgement is not re-entered
/// and `D-40`'s no-per-op-walk is untouched.
#[napi(js_name = "restoreMark")]
fn verb_restoreMark(env: Env, receiver: This<Object<'_>>, mark_pos: JsVal<'_>) -> NapiRet<'static> {
    let store_index = match store_index_of(&env, &receiver) {
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
        let mark = codec.op_id(&mark_pos);
        store.restore_mark(&mark)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

/// **`listen(handle, addresses)` — THE TWO POSITIONS REACH THE CORE AS THE TWO THE STORE DECLARES**
/// (`contract.md §2.2`; `listen-verb.md §1` item 1). **POSITION `1` IS THE CALLER-SPELLED HANDLE; POSITION
/// `2` IS THE SET** — an ARRAY OF ADDRESSES, each member already inside the store's address domain, refused
/// otherwise by the package's own set-position class test before this frame is entered (`F-2`). **AND THE
/// ANSWER IS `undefined`** — the caller supplied the identity, so there is no datum to return (`PAR-HL-3`).
#[napi(js_name = "listen")]
fn verb_listen(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>, addresses_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `2`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE TWO DECLARED POSITIONS ARE THE ONLY TWO — THE HANDLE AND THE
    // SET** — which is exactly what the doc block above says, and the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let handle = codec.handle_arg(&handle_pos);
        let addresses = codec.address_set(&addresses_pos);
        store.listen(&handle, &addresses)?;
        Ok(codec.undefined_value())
    });
    answer_or_throw(env, answer)
}

#[napi(js_name = "unlisten")]
fn verb_unlisten(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `1`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE ONE DECLARED POSITION IS THE HANDLE** — the withdrawal's
    // store half takes the handle and no more — and the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let handle = codec.handle_arg(&handle_pos);
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
fn verb_remove_listener(env: Env, receiver: This<Object<'_>>, handle_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `1`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **THE ONE DECLARED POSITION IS THE HANDLE** — the removal reaches
    // the store's own wholesale `Home::purge` with the handle and no more — and the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let handle = codec.handle_arg(&handle_pos);
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
fn verb_commit_file(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>) -> NapiRet<'static> {
    // **THE VERB'S OWN POSITIONS, POSITION FOR POSITION** (`export-set-and-dispatch.md §1`'s declared
    // arity `1`, `§4`: the verb's arguments and no instance among them). **THERE IS NO ABSENT-POSITION CARRIER AT THIS
    // BOUNDARY, AND THE OLD SENTENCE SAYING SO IS CORRECTED HERE**: a declared `#[napi]` parameter is
    // ALWAYS supplied by the host, so the `Option`/`None` path the abandoned element-0 design left (and
    // that `position(&positions, n)` read through) no longer exists. **THE DISTINCTION THAT REMAINS IS THE
    // ONE THE PACKAGE DRAWS BEFORE THE CALL**: `index.mjs` hands a position the call did not supply as the
    // RUNTIME'S OWN `undefined`, so "not supplied" and "supplied as `undefined`" are told apart by the
    // CALLER's own `arguments.length` test and NOT here (`crossing.md §1.3`; `PAR-JS-6`: the ONE call
    // that folds is the one that supplied nothing). **ITS ONE ARGUMENT IS AN OP ID** (the doc block above says so) and
    // **THERE IS NO SECOND DECLARED POSITION** — the surplus tail is removed.
    let store_index = match store_index_of(&env, &receiver) {
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
        let op_id = codec.op_id(&op_id_pos);
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
    let store_index = match store_index_of(&env, &receiver) {
        Ok(store_index) => store_index,
        Err(refusal) => {
            throw_refusal(&env, &refusal);
            return Ok(make_undefined(&env));
        }
    };
    let codec = Codec { env, _marker: std::marker::PhantomData };
    let handle = codec.handle_arg(&handle_pos);
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

