//! `wasm` — **THE SECOND CLAIMED REALM'S ENTRY LAYER: NINETEEN FREE FUNCTIONS — FIFTEEN OF THEM TAKING THE
//! HANDLE FIRST, ONE TAKING THE WIRE, TWO TAKING NO HANDLE AT ALL, AND ONE TAKING THE STORE'S OWN INDEX.**
//!
//! **⟶ THE SET MOVED `18 → 19` ON 2026-11-19, AND THE SENTENCE IT MOVED FROM IS QUOTED BEFORE IT IS RE-DERIVED:
//! *"THE SECOND CLAIMED REALM'S ENTRY LAYER: EIGHTEEN FREE FUNCTIONS — FIFTEEN OF THEM TAKING THE HANDLE FIRST,
//! ONE TAKING THE WIRE, AND TWO TAKING NO HANDLE AT ALL."*** **THE ARCHITECT'S CLOSURE ANSWER, ARM `a`, IS THAT
//! THIS ARM RETIRES A STORE AS THE NODE ARM DOES** — and `D-171` item 5 named the absence at its own last
//! sentence while leaving it open: *"THE WASM ARM IS UNTOUCHED: its set stays **eighteen** and **its table still
//! never retires a store** — which is now the one arm of the two whose leak is unclosed, and closing it changes
//! that arm's export set (a declaration, `D-155` item 4, and `CW-6`'s subject)."* **`D-155` item 4 AND `CW-6` ARE
//! THE TWO SITES THIS LANDING RE-CUTS**, and the nineteenth entry is [`store_release`] — the retirement's frame,
//! whose whole docblock stands at its own bytes below. **THE ARITHMETIC KEEPS ITS SHAPE**: the arm's set is *"the
//! Node arm's twenty minus `commitFile`"*, which is `19`, and it read `18` only because the retirement's entry had
//! no twin on this arm — so the COUNT moves and the rule that produces it does not.
//!
//! **THE FORM IS `docs/L3/wasm-realm/design.md` §1's, AND IT IS A RULING RATHER THAN A TASTE**: the store's
//! fifteen members and `cfg`'s six keys are the package's, so *"the crossing may be shaped freely beneath
//! them"* — and of the three grounds that ruling is stated on, **two are properties of THIS file**:
//!
//! * **`#[wasm_bindgen]` with a class and methods LOSES THE DECLARED DETACHED-CALL OBSERVABLE** (`§1` ground
//!   2): a method resolves its store from `this.__wbg_ptr`, which the package's own store object is not; and
//!   a method called detached raises a **raw host `TypeError`** from the glue while one called on a freed
//!   instance panics — **both are a second failure form crossing the boundary** (`DD-12`'s prohibition).
//!   **Free functions keep the crate's own arm**: a handle the table does not hold answers ONE refused form,
//!   built by [`no_instance_at`] and thrown as the value.
//! * **`withAddon()` hands out a module object** (`§1` ground 3, `entryOf()`, `state.mjs:1186`, 15 sites), so
//!   the free-function shape is the shape the package already holds.
//!
//! **THE TWO CALL FORMS, AT THE DESIGN'S OWN BYTES** (`§1`'s table): `entryOf().read(state.handle, a, b)` for
//! the ordinary call, and `Reflect.apply(entryOf().read, undefined, withHandle(state.handle, args))` for the
//! `Reflect.apply` one — which is why each entry's handle is its FIRST declared position and never its
//! receiver.
//!
//! **`state.receiver` BECOMES `state.handle` AS THE ROUTING DATUM** (`§1`'s closing sentence: *"the
//! envelope's forced change"*), and the handle is **a `u32` index into a module-level table of `Instance`s**
//! — [`INSTANCES`], the same `thread_local!` shape `facade.rs`'s table takes, minus the second ids table,
//! because on this arm the handle IS the row index and `facade.rs`'s second table exists only to map a
//! RECEIVER's channel to a live row.
//!
//! **⟶ AND THE SENTENCE THAT STOOD HERE IS QUOTED BEFORE IT IS RETIRED, 2026-11-19**: *"… because on this arm the
//! handle IS the row index and no release entry exists to retire a row."* **THERE IS ONE NOW** — [`store_release`],
//! the arm's twin of `facade.rs`'s retirement entry — and **it retires a row without a second table, for the
//! reason the first half of that sentence gives**: the row IS the handle, so a release EMPTIES the slot
//! ([`Slots`]) and every index minted before it still names the store it was minted for.
//!
//! **THE SET IS NINETEEN AND IT WAS DELIVERED IN TWO SLICES AND ONE LATER ENTRY** (`design.md` §6, at its own
//! words: *"The WASM module exports 18 of the Node arm's 19: `commitFile` (`facade.rs:1072`) is ABSENT"*; `D-155`
//! item 4 — **⟶ RE-CUT AT ITS OWN SENTENCE, 2026-11-19: the exports are `19` of the Node arm's `20`, and
//! `commitFile` is still the one that is ABSENT**).
//! **THE FIRST SLICE WAS THE SIX THE `saveCall` PATH NEEDS** — `storeCreate` · `read` · `write` ·
//! `exportImage` · `saveSucceeded` · `saveFailed` — **AND THE SECOND IS THE TWELVE THAT COMPLETE `6 + 12 = 18`**:
//! `delete` · `readLiteral` · `readTiered` · `rollback` · `restoreMark` · `journalMark` · `listen` ·
//! `unlisten` · `removeListener` · `register` · `version` · `errorMessage` — **AND THE NINETEENTH STANDS BESIDE
//! THE TWO SLICES AND IS NEITHER ONE'S: `storeRelease`, the retirement's frame, declared in its own section at
//! the end of this file.** **`commitFile` IS ABSENT BY
//! RULING AND IS DECLARED BY NO BYTE OF THIS FILE** — named nowhere except in the two sentences that record
//! its absence, which is the only mention a name the arm must not export may have. Each entry is the
//! `facade.rs` frame it is named after, with the same reader, the same core delegate and the same answer.

use std::cell::RefCell;

use wasm_bindgen::prelude::*;

use crate::crossing::{self, Instance, JsAddressArg, JsOpIdArg, JsSegment, Refusal};
use crate::wasm_codec as codec;

// =================================================================================================
// THE INSTANCES — thread-local, AND THE BOUND THAT PUTS THEM THERE IS `Sync`, NOT `Send`
// (`facade.rs`'s own block, carried with the table).
//
// **`Store` AND `Instance` ARE BOTH `Send`, AND WHAT WOULD BE REJECTED IS A `static`**: `RefCell<Vec<…>>`
// declines `Sync`, which is precisely the property that buys the cheap `borrow_mut`, so
// `static INSTANCES: RefCell<Vec<crossing::Instance>>` fails E0277 (*"shared static variables must have a
// type that implements `Sync`"*). **The `thread_local!` is what the `Sync` bound leaves**, and on this arm
// the realm is single-threaded by construction — a wasm module has one thread unless it starts one — so the
// affinity claim the `napi` arm declines to make is the arm's own fact here.
//
// **⟶ AND THE RETIREMENT PATH, ABSENT AT THE SENTENCE ABOVE, IS HERE FROM 2026-11-19 — THE SENTENCE IS QUOTED
// BEFORE IT IS MADE TRUE** (`design.md` §8: *"`STORE_RETIREMENT` has no finalizer to fire it — so a WASM store is
// never released and the `INSTANCES` table grows, `SC-10`'s shape one arm over"*). **THE ARCHITECT'S CLOSURE
// ANSWER, ARM `a`, IS THAT THIS ARM RETIRES AS THE NODE ARM DOES, so the sentence's subject is discharged and its
// bytes are kept**: [`store_release`] is the finalizer's frame, the package's `STORE_RETIREMENT` is the caller of
// it (`state.mjs`'s callback, unchanged), and `addon-slot.mjs`'s dispatch table forwards it (a PASSED-THROUGH
// member — the release takes the index and not a handle-of-a-receiver, so nothing is prepended).
//
// **THE `napi` arm's second table (`INSTANCE_IDS`) STILL HAS NO SUBJECT HERE, AND THE RETIREMENT DOES NOT MINT
// ONE**: it exists to map a receiver's channel to a live row and to retire exactly that row, and this arm's handle
// IS the row INDEX — so the table is [`Slots`] and the miss arm is a length test, with nothing between the handle
// and the row at all. **THE RELEASE EMPTIES THE SLOT AND NEVER SHIFTS IT**, which is the one thing a `Vec::remove`
// would get wrong on an arm whose handles are row indexes ([`Slots`]' own docblock).
// =================================================================================================
/// **THE SLOTS OF [`INSTANCES`] — A STORE'S OWN SLOT, OR THE TOMBSTONE ITS RELEASE LEAVES BEHIND** — the twin of
/// `facade.rs`'s own table type (`facade.rs:327`), read at `D-171` item 2's sentence: *"It takes the slot (a
/// TOMBSTONE, so no index shifts and the integer the package holds can never name its neighbour), drops the
/// instance and removes its id, in one act."* **THE FOUR METHODS ARE THE FOUR READS THE SIXTEEN ENTRIES ALREADY
/// TAKE**, so not one of them moves a byte.
///
/// **⟶ ADDED 2026-11-19 WITH THE ARM'S RETIREMENT, AND THE REASON IT IS A TOMBSTONE IS THIS ARM'S OWN FACT AND NOT
/// A COPY OF THE OTHER'S.** On this arm the handle IS the row index (`design.md` §1 ground 1), so a `Vec::remove`
/// would renumber every store minted after the freed one: a store minted as `7` would answer at `6`, and the
/// integer the package publishes on its own `STORE_INDEX` row would name its NEIGHBOUR — a silent cross-store
/// defect and not a stale handle. **SO THE ID IS KEPT STABLE AND THE SLOT IS EMPTIED**: `Some(store)` is a live
/// store and `None` is the tombstone its release left, the row count never shrinks, and an index can name at most
/// the one store it was minted for.
///
/// **WHAT A TOMBSTONE COSTS AND WHAT IT BUYS, AT THIS ARM'S OWN MEASURE.** It costs ONE EMPTY OPTION PER STORE
/// EVER CONSTRUCTED — the slot's own footprint, and NOT the store's: the `Instance` and the `Store` inside it are
/// DROPPED at the release, which is the ~18–21 KB per constructed-and-dropped store this arm retained until this
/// landing (the figure `tests/e2e/store-retirement.test.mjs` measures on the other arm). **IT BUYS ONE OBSERVABLE
/// AS A PROPERTY OF THE TYPE**: `get_mut` answers `None` for an emptied slot exactly as it does for an index no
/// mint ever reached, so a released store and a fabricated index are ONE answer — [`no_instance_at`]'s
/// `AddressNotFound` — at every entry, which is `receiver-and-refusal.md §3`'s rule reached on this arm.
///
/// **AND THE `Vec` IS NOT REALLOCATED BY A RELEASE**, so an index is stable against the growth every later
/// construction performs: nothing but `push` touches the shape.
struct Slots(Vec<Option<Instance>>);

impl Slots {
    /// **THE ONE WRITER OF A NEW ROW** — `storeCreate`'s mint, and the index it answers is this row's own.
    fn push(&mut self, instance: Instance) {
        self.0.push(Some(instance));
    }

    /// The row count, which is the number of stores ever constructed and never the number live. **IT IS THE
    /// HANDLE RESOLVER'S TEST** ([`store_index_of`]), so a handle is in range exactly where a row exists — and a
    /// TOMBSTONE in that range is the release's own arm, taken one line later by the entry that reads it.
    fn len(&self) -> usize {
        self.0.len()
    }

    /// **THE ONE READER OF A LIVE STORE** — a live row's `&mut`, or `None` for an emptied row and for an index the
    /// table never reached. **THE ENTRIES TAKE NO OTHER ROUTE TO A STORE**, so no verb can observe the difference
    /// between a tombstone and a fabricated index at any depth.
    fn get_mut(&mut self, store_index: usize) -> Option<&mut Instance> {
        self.0.get_mut(store_index).and_then(Option::as_mut)
    }

    /// **THE SHARED-BORROW HALF OF THE SAME READ** — `exportImage` and `journalMark` take `&self` on the instance
    /// and borrow the table without mutability. **The tombstone is `None` here exactly as it is above**, so a
    /// released store is one observable on the pure reads too.
    fn get(&self, store_index: usize) -> Option<&Instance> {
        self.0.get(store_index).and_then(Option::as_ref)
    }

    /// **THE RELEASE** — the store is TAKEN OUT OF ITS SLOT AND DROPPED, and the slot stands as the tombstone.
    /// Answers whether this call was the one that freed it: `false` for a slot already emptied and for an index no
    /// mint ever reached, which are the two arms the entry answers its absent form with.
    fn release(&mut self, store_index: usize) -> bool {
        self.0.get_mut(store_index).and_then(Option::take).is_some()
    }
}

thread_local! {
    /// **THE HANDLE'S TABLE** — `storeCreate`'s answer is the row it appends, and every other entry's first
    /// position names one. **A HANDLE THE TABLE DOES NOT HOLD ANSWERS THE ONE REFUSED FORM** ([`no_instance_at`])
    /// — **never a panic and never a raw host `TypeError`** (`design.md` §1 ground 2; `C-W10`).
    ///
    /// **⟶ AND THE SLOT TYPE MOVED `Instance` → `Option<Instance>` ON 2026-11-19** ([`Slots`]): a store can now be
    /// RELEASED, and an emptied slot is the tombstone that keeps every index stable. `RefCell<Slots>` declines
    /// `Sync` for exactly the reason `RefCell<Vec<…>>` did, so the bound's argument above is unmoved.
    static INSTANCES: RefCell<Slots> = const { RefCell::new(Slots(Vec::new())) };
}

// =================================================================================================
// THE REFUSAL'S TWIN — `{status, message}`, BOTH MEMBERS **DEFINED** AND NEVER SET
// =================================================================================================

/// **THE REFUSAL THROUGH THE GLUE, AND IT IS `facade.rs`'s `throw_refusal` WITH ONE DEVICE SWAPPED FOR THE
/// ONE `D-155` ITEM 1 GETS WRONG** (`design.md` §3, whose whole subject this function is).
///
/// **WHAT THE NODE ARM DOES, AT ITS BYTES** (`facade.rs:195`–`:224`): `Object::new`, a two-pair
/// `Vec<Property>` (`status`, `message`) built from the core's own `Refusal`, **`define_properties` (`:219`)
/// — `DefineOwnProperty`, consulting no chain** — and then `env.throw(object)`, the raw-value escape hatch.
///
/// **★ `D-155` ITEM 1 CALLS `js_sys::Object` + `Reflect::set` *"`throw_refusal`'s own idiom", AND THAT IS
/// WRONG.** **`Reflect::set` is `[[Set]]`, and `[[Set]]` is precisely what `D-35` removed from this frame**
/// (`facade.rs:182`–`:194`): with a non-writable own `status` on `Object.prototype`, `[[Set]]` answers
/// `false` and **THE OWN MEMBER IS DROPPED** — measured on the artefact as `own=["message"]`,
/// `hasOwnStatus=false`. Reproduced through the glue, the object reaches `refusal.mjs:103` with no own
/// `status`, `fail`'s provenance test refuses it, and **the caller receives the bare object instead of the
/// one form** — the `F8-2` state — and in a browser `Object.prototype` is the page's own. **SO THE TWIN IS
/// `define_property`, NOT `set`** (`design.md` §3's ruling, verbatim), and this frame reaches it through
/// `wasm_codec`'s [`codec::define_member`], whose `[[DefineOwnProperty]]` is the same operation the
/// `napi_define_properties` call performs.
///
/// **TWO MEMBERS AND NO THIRD**: **`log` and `address` are the JS boundary's**, attached at `fail`, never in
/// Rust (`failure-form.md §1`'s adjudication (4); `design.md` §3: *"`log` and `address` are the JS boundary's
/// and are NOT built here"*). **Both members are own DEFINED data properties with the same flags the `napi`
/// frame gives them — writable, enumerable, configurable** (`facade.rs:192`–`:194`: *"`Property`'s default
/// attributes are writable/enumerable/configurable"*) — **so the same four members cross and `carryRefusal`
/// and `fail` move zero bytes** (`design.md` §3; `C-W7`, `C-W8`).
///
/// **AND IT IS THROWN AND NEVER SERIALIZED**: this function ANSWERS the object and the entry hands it back
/// inside `Err` ([`answer_or_throw`]), where `wasm-bindgen`'s glue performs `throw takeObject(err)`.
/// **Forbidden by construction and absent here**: `JsValue::from_str` as an `Err`, `JsError`,
/// `Result<_, String>`, and any exported error struct (`design.md` §3's last sentence).
///
/// **THE NODE ARM'S TWO `Err(_) => return` ARMS HAVE NO TWIN AND NEED NONE**: they guard a member that
/// *"cannot be minted"* (`facade.rs:213`–`:217`) — an environment already failing — and on this arm the
/// target is a fresh `Object()` that no caller can have frozen, so each definition lands. The object as built
/// is answered either way: **there is no second shape to fall back to on this arm either.**
fn throw_refusal(refusal: &Refusal) -> JsValue {
    let object = codec::empty_object();
    // **THE `status` AND `message` THE CORE'S `Refusal` OWNS, EACH DEFINED FROM THE CORE'S OWN BYTES** —
    // never read back off the object this frame is constructing and off no caller's object (`D-35`'s own
    // principle).
    let _ = codec::define_member(&object, "status", &JsValue::from_str(&refusal.status));
    let _ = codec::define_member(&object, "message", &JsValue::from_str(&refusal.message));
    object
}

/// **THE ONE LANDING EVERY ENTRY TAKES** — `facade.rs`'s `answer_or_throw`, with the throw moved into the
/// `Err` arm the glue performs: **a refusal is returned INSIDE `Err` rather than thrown beside an
/// `Ok(undefined)`** (`design.md` §3: *"`answer_or_throw`'s twin returns the refusal rather than throwing
/// beside an `Ok(undefined)`"*). **No `String` and no `JsError` is ever an `Err` arm of this file.**
fn answer_or_throw(answer: Result<JsValue, Refusal>) -> Result<JsValue, JsValue> {
    answer.map_err(|refusal| throw_refusal(&refusal))
}

// =================================================================================================
// THE HANDLE — resolved from the entry's FIRST POSITION, and a handle that names nothing live refuses in the
// ONE form (`design.md` §1 ground 2; `C-W10`).
// =================================================================================================

/// **THE STORE'S INDEX, READ FROM THE HANDLE — `facade.rs`'s `store_index_of`, and its OBSERVABLE rather
/// than its carrier.**
///
/// **THE NODE ARM'S CARRIER IS A RECEIVER OBJECT AND ITS `Symbol.for`-KEYED CHANNEL** (`facade.rs:547`–
/// `:581`), which it reads as a NUMBER with a class test; **its three miss arms — a channel that is not a
/// number, an index no row holds, and a released store — answer ONE observable** (`§3`: *"There is no second
/// arm and no second observable"*). **On this arm there is no receiver at all**: the handle is DATA
/// (`design.md` §1 ground 1), so the same class test is taken on the value itself and the same one form
/// answers.
///
/// **AND THE CLASS TEST IS TAKEN HERE RATHER THAN BY THE DECLARED PARAMETER, WHICH IS A DECISION WITH ITS
/// REASON AT ITS BYTES**: a `u32` parameter would let `wasm-bindgen`'s glue perform `arg0 >>> 0`, where a
/// detached call's `undefined` and a `NaN` both become `0` — **a handle the table DOES hold, and a detached
/// call that ANSWERS**, which is `receiver-and-refusal.md §3`'s regression read backwards. So the position
/// is an untyped value, it is read as a number class-first (`carried_index.cast::<f64>()`'s twin), and
/// anything else is the one refusal.
fn store_index_of(handle: &JsValue) -> Result<u32, Refusal> {
    // **THE CLASS TEST FIRST, ON THE VALUE AS IT IS** — a handle that is not a JS number names no row, and a
    // number that is not an integral `u32` names none either: `1.5` and `-1` are not indices.
    match handle.as_f64() {
        Some(index) if index >= 0.0 && index.fract() == 0.0 && index <= u32::MAX as f64 => {
            let store_index = index as u32;
            let held = INSTANCES.with(|instances| (store_index as usize) < instances.borrow().len());
            if held {
                Ok(store_index)
            } else {
                Err(no_instance_at(store_index))
            }
        }
        // The class miss answers the SAME form and prints no index: `no_instance_at`'s subject is the one
        // answer, and its parameter's value reaches no byte of the message on either miss (`facade.rs:588`).
        _ => Err(no_instance_at(0)),
    }
}

/// **THE TABLE HOLDS NO ROW AT THIS INDEX — THE ONE REFUSAL EVERY ENTRY ANSWERS IT WITH**, and the bytes are
/// `facade.rs:588`'s: the token is `AddressNotFound`, BORROWED AND NOT MINTED (`DD-40`; `failure-form.md §4`:
/// *"the boundary does not mint a member for it"*), and the message text is the `napi` frame's own.
///
/// **THE `napi` FRAME'S SECOND MISS ARM — `store_index_of`'s table miss with its own text — IS NOT A SECOND
/// FORM HERE, AND THAT IS THE ARM'S FACT RATHER THAN A SIMPLIFICATION**: on that arm the receiver is an
/// OBJECT whose channel must be read, so *"no readable channel"* and *"an index the table does not hold"* are
/// two different observations of one caller's mistake; **here the handle IS the row's name and there is
/// nothing between the value and the table**, so the class miss and the table miss are the same observation —
/// a handle naming no live store — and one form answers it (`design.md` §1 ground 2; `C-W10`).
fn no_instance_at(_store_index: u32) -> Refusal {
    Refusal {
        status: "AddressNotFound".to_string(),
        message: "the package holds no instance at that id".to_string(),
    }
}

/// **THE RETIREMENT ENTRY'S OWN MALFORMED ARM — the token `facade.rs`'s `not_a_store_index` answers
/// (`facade.rs:1412`), at the position this arm's finalizer hands instead of a receiver** (`store_release`'s
/// docblock; `receiver-and-refusal.md §3`).
///
/// **NO STATUS IS MINTED** (`DD-40`): `AddressMalformed` is the store's own member for *"a present argument outside
/// its domain"*, and the sentence behind it names THIS position — the store's index — rather than a receiver,
/// because a `message` that named a receiver on a call that has none would be false at its own bytes.
/// **THE BYTES ARE THE NODE FRAME'S, BYTE FOR BYTE, AND THAT IS THE TWIN'S RULE RATHER THAN AN OMISSION**: the
/// arms answer ONE form for one caller's mistake, `storeCreate` is the entry's name on both of them, and the word
/// *"addon"* is this layer's own name for the artefact on both. **THE TWO-MEMBER FORM IS [`throw_refusal`]'S AND IS
/// UNMOVED**: this function authors a `Refusal` and throws nothing.
fn not_a_store_index() -> Refusal {
    Refusal {
        status: "AddressMalformed".to_string(),
        message: "the position is not the store index this addon's storeCreate returned".to_string(),
    }
}

/// The address's own segments, where the argument IS the declared list shape — `facade.rs`'s `segments_of`:
/// the `triggeringAddress` member the write's record carries (`PAR-JS-12`, `§2.7` item 2).
fn segments_of(address: &JsAddressArg) -> Vec<JsSegment> {
    match address {
        JsAddressArg::List(segments) | JsAddressArg::CrossRealmList(segments) => segments.clone(),
        _ => Vec::new(),
    }
}

/// **THE TWO VERDICTS' ONE POSITION, FOLDED TO THE STORE'S OWN CARRIER** — `facade.rs`'s `op_id_token`
/// (`D-145` item 3): the carrier's `Str` row is the op id the package read off a settled record, and **every
/// other row is handed on as the BLANK token**, which the store's `op_id` refuses as `AddressMalformed`
/// naming `opId` — **so one classifier answers and no second is authored.**
fn op_id_token(op_id: &JsOpIdArg) -> String {
    match op_id {
        JsOpIdArg::Str(token) => token.clone(),
        _ => String::new(),
    }
}

// =================================================================================================
// THE FIRST SLICE'S SIX ENTRIES — the `saveCall` path's own, and six of the eighteen the TWO SLICES deliver
// (`6 + 12 = 18`; **⟶ and the ARM's set is NINETEEN from 2026-11-19, the nineteenth standing in its own section
// below and belonging to neither slice** — the slices' arithmetic is unmoved and this heading's figure was the
// slice count and never the arm's)
// =================================================================================================

/// **`storeCreate(wire)` — ONE POSITION, THE ENCODED CONFIG AS A JS OBJECT, ANSWERING THE HANDLE AS A
/// NUMBER** (`design.md` §2: *"the addon's `storeCreate` keeps one wire position and a `u32` answer on both
/// arms"*; `D-155` item 3).
///
/// **THE BODY IS `facade.rs:344`'s, READER FOR READER**: `codec::config` for the three declared keys,
/// `codec::member(cfg, "constraints")` for the fourth (`parameter-semantics.md §2.21`; the key is read by
/// OWNERSHIP beside the struct, so its absence is `None` and a present `undefined` is the key's own outside
/// form and not its absence), `durable_without_path` read BY OWNERSHIP AND BY CLASS (`D-137` item 3: *"The
/// caller spells NOTHING: the PACKAGE sets it when `saveCall` is present and `filePath` is absent"*; a value
/// that is not a JS `boolean` reads `false`), and `initial_image` read by ownership and by class with an
/// empty text taken as the carrier's ABSENCE (`U-STOREROOM-05`; `D-137` item 4 — `frame.mjs` refuses the
/// empty string as broken config one layer up). **THEN `crossing::create_with_inputs`, THE ONE CONSTRUCTION,
/// AND NOTHING IS DECIDED HERE THAT THE `napi` FRAME DOES NOT DECIDE.**
///
/// **THE MINT AND THE ROW ARE ONE ACT** (`receiver-and-refusal.md §6`'s shape): the index answered is
/// exactly the row the table holds, so the handle a later entry is handed and the store it names cannot
/// disagree. **`design.md` §2's `storeCreate(bindings, cfg)` factory is the JS arm's spelling and is not this
/// frame**: the injection is the host's, so the wiring position is the wire's and no handle crosses in.
#[wasm_bindgen(js_name = "storeCreate")]
pub fn store_create(wire: JsValue) -> Result<JsValue, JsValue> {
    let config = codec::config(&wire);
    let constraints = codec::member(&wire, "constraints").map(|value| codec::constraints_arg(&value));
    let durable_without_path = codec::member(&wire, "durable_without_path")
        .map(|value| codec::bool_of(&value))
        .unwrap_or(false);
    let initial_image = codec::member(&wire, "initial_image")
        .map(|value| codec::arg_string(&value))
        .filter(|text| !text.is_empty());
    match crossing::create_with_inputs(
        &config,
        constraints.as_ref(),
        durable_without_path,
        initial_image.as_deref(),
    ) {
        Err(refusal) => Err(throw_refusal(&refusal)),
        Ok(instance) => {
            let store_index = INSTANCES.with(|instances| {
                let mut instances = instances.borrow_mut();
                instances.push(instance);
                (instances.len() - 1) as u32
            });
            Ok(JsValue::from_f64(store_index as f64))
        }
    }
}

/// **`read(handle, address, tier)` — THREE POSITIONS, `Instance::read` BEHIND THEM, THE VALUE OUT.**
///
/// **THE POSITIONS ARE `facade.rs:619`'s**, position for position: the address through `codec::address_of`,
/// the tier through `codec::tier_of`, and the answer through the copy OUT. **The absent-versus-`undefined`
/// rule is the PACKAGE's and is drawn before this frame is entered** (`crossing.md §1.3`; `PAR-JS-6`: the ONE
/// call that folds is the one that supplied nothing), so this frame reads the carrier it is handed.
///
/// **THE WIRE READS HAPPEN BEFORE THE TABLE IS BORROWED, AND THAT IS DELIBERATE**: a reader performs JS
/// calls, and a JS call that re-entered an entry while a `RefCell` was borrowed would panic — **a second
/// failure form** (`DD-12`). The borrow is confined to the store call, which performs no JS at all.
#[wasm_bindgen(js_name = "read")]
pub fn read(handle: JsValue, address: JsValue, tier: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let address = codec::address_of(&address);
    let tier = codec::tier_of(&tier);
    let answer: Result<crossing::JsValue, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.read(&address, &tier)
    });
    answer_or_throw(answer.map(|value| codec::to_js_value(&value)))
}

/// **`write(handle, address, tier, value, commit)` — FIVE POSITIONS, AND THE FIFTH IS DECLARED AND NOT
/// READ** (`facade.rs:751`: *"the fourth declared position is the ADOPTED RECORD IDENTITY … and it is
/// CONSUMED WITHOUT BEING READ HERE"*, its class test being the PACKAGE's and taken before the frame is
/// entered — `§2`, `commitPositionRefusal`). **ITS PRESENCE IS THE CALL SHAPE**, which is why the position
/// stands even though no byte below names it.
///
/// **THE THREE READERS ARE THE THREE `facade.rs` USES**: `codec::value_of` for the value — **the one position
/// that is a bare tree rather than a tag** (`A148` Q2/Q4: *"the package has already classified the value, so
/// this frame reads data and never a tag"*) — and the address and tier through their own readers. **Then
/// `Instance::write`, which runs the core's own two gates** (`to_store_value`'s ceiling, then the store's
/// taxonomy), **and the record crosses OUT with its `triggeringAddress` member set beside it**
/// (`§2.7` item 2; `PAR-JS-12`).
#[wasm_bindgen(js_name = "write")]
pub fn write(
    handle: JsValue,
    address: JsValue,
    tier: JsValue,
    value: JsValue,
    _commit: JsValue,
) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let address = codec::address_of(&address);
    let tier = codec::tier_of(&tier);
    let value = codec::value_of(&value);
    let answer: Result<crossing::JsWriteResult, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.write(&address, &tier, &value)
    });
    answer_or_throw(answer.map(|result| {
        let answer = codec::to_js_write_result(&result);
        let triggering = codec::to_js_segments(&segments_of(&address));
        codec::set_member(&answer, "triggeringAddress", &triggering);
        answer
    }))
}

/// **`exportImage(handle)` — ONE POSITION, THE STORE'S OWN IMAGE TEXT AS A STRING** (`D-137` items 1–2;
/// `D-133` item 2; `facade.rs:1138`).
///
/// **IT MARKS NOTHING AND IS A PURE READ**: `Instance::export_image` takes `&self`, so the table is borrowed
/// and not borrowed mutably, and **the text crosses OUT as an ordinary JS string** — no value crosses in.
/// **Its refusal is the store's own** (`FileCommitFailed`, rank `15`, the writer's own check inherited), and
/// it travels in the one form like every other.
#[wasm_bindgen(js_name = "exportImage")]
pub fn export_image(handle: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let answer: Result<String, Refusal> = INSTANCES.with(|instances| {
        let instances = instances.borrow();
        let store = instances
            .get(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.export_image()
    });
    answer_or_throw(answer.map(|text| JsValue::from_str(&text)))
}

/// **`saveSucceeded(handle, opId)` — TWO POSITIONS, ANSWERING `undefined`** (`D-144` item 6; `D-145` item 3;
/// `facade.rs:1164`).
///
/// **ITS DECLARED FORM IS `commitFile`'S OWN, SATISFIED VERBATIM** — *"its one argument is an op id and its
/// answer is `undefined`"* — **and THE STORE IS TOLD, NOT ASKED TO JUDGE** (`D-146` item 2). The position is
/// classified by the store's own classifier ([`op_id_token`]), and it writes no byte.
#[wasm_bindgen(js_name = "saveSucceeded")]
pub fn save_succeeded(handle: JsValue, op_id: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let op_id = codec::op_id_of(&op_id);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.save_succeeded(&op_id_token(&op_id))
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`saveFailed(handle, opId)` — THE MIRROR: TWO POSITIONS AND `undefined`** (`D-146` items 1–3;
/// `D-144` item 4; `facade.rs:1191`).
///
/// **THE ARCHITECT'S WHOLE WORD ON IT IS *"Mirror"***, and what it mirrors is `saveSucceeded`'s declared form:
/// one op-id position and an `undefined` answer, with the store performing `commit_file`'s five failure steps
/// and writing no byte. **THE CALLER RECEIVES ITS FAILURE AFTER THE ROLLBACK** (`§2.11` clause 5's order):
/// this entry returns before the package throws, so `SC-6` is closed in route and in seat, and the journal
/// stays the STORE's.
#[wasm_bindgen(js_name = "saveFailed")]
pub fn save_failed(handle: JsValue, op_id: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let op_id = codec::op_id_of(&op_id);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.save_failed(&op_id_token(&op_id))
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

// =================================================================================================
// THE SECOND SLICE'S TWELVE ENTRIES — `D-155` ITEM 4's ARM COMPLETED AT EIGHTEEN (`design.md` §6) — **⟶ AND THE
// ARM IS NINETEEN FROM 2026-11-19, `storeRelease` standing in its own section at the end of this file: the
// `6 + 12 = 18` this heading counts is the SLICES' and stays exactly so**
//
// **EACH IS THE `facade.rs` FRAME IT IS NAMED AFTER, AND WHAT MOVES IS ONLY WHAT `design.md` §1 AND §3
// MOVE.** The handle is the FIRST POSITION rather than the Node-API receiver (`§1`: on this arm the receiver
// is DATA, and a handle the table does not hold answers ONE refused form — [`no_instance_at`]'s — rather
// than a raw host `TypeError`); **the wire reads are taken BEFORE the table is borrowed**, because a reader
// performs JS calls and a JS call that re-entered an entry under a live `RefCell` borrow would panic — a
// second failure form (`DD-12`); and **the refusal is [`throw_refusal`]'s one form** (`§3`), thrown through
// the glue's `Err` arm, never a `String`, never a `JsError`, never an exported error struct.
//
// **THE TWO ENTRIES THAT ROUTE THROUGH NO STORE ARE DECLARED BELOW WITH NO HANDLE AT ALL**, because their
// node frames take no receiver either (`facade.rs:1347`'s `version(_env)`, `:1397`'s `errorMessage(env, …)`)
// and `§3` forbids a `Result` on both: *"`version` and `errorMessage` answer no `Result` at all — a `Result`
// there mints a failure path the export set does not declare."* **A handle position there would be a
// position the frame must either ignore (a lie about its arity) or refuse (a refusal neither entry's
// declared form has), so there is none.**
// =================================================================================================

/// **`readLiteral(handle, address, tier)` — `read`'s TWO POSITIONS AND `read`'S ANSWER, NARROWED AT THE
/// TARGET** (`facade.rs:665`–`:695`; `§2.9` item 2: `ReadTargetIsBranch` on a branch is the STORE's own
/// answer, never a boundary verdict — `crossing::Instance::read_literal` is the store's `readLiteral` and
/// nothing else). **THE LITERAL READ TAKES NO POSITION `read` LACKS**, so the two readers, the delegate and
/// the copy OUT are the same three devices and no fourth stands here.
#[wasm_bindgen(js_name = "readLiteral")]
pub fn read_literal(handle: JsValue, address: JsValue, tier: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let address = codec::address_of(&address);
    let tier = codec::tier_of(&tier);
    let answer: Result<crossing::JsValue, Refusal> = INSTANCES.with(|instances| {
        // **THE EXCLUSIVE BORROW IS TAKEN UNIFORMLY, EXACTLY AS `read` TAKES IT** (`facade.rs:639`–`:653`:
        // *"a mis-classification here is silent until it is a compile error at best or a widened borrow at
        // worst"*, so the per-entry judgement is not taken) — and it is confined to the store call.
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.read_literal(&address, &tier)
    });
    answer_or_throw(answer.map(|value| codec::to_js_value(&value)))
}

/// **`readTiered(handle, address, tier)` — THE THIRD READ VERB, AND ITS TWO POSITIONS ARE `read`'s**
/// (`facade.rs:697`–`:734`; `U-STOREROOM-TIER-READOUT`, `D-121-ter` item 5). **The answer is an ORDINARY tree
/// whose tiers are ordinary strings**, which is why the twin's codec gains no emitter for it
/// (`D-121-quinquies` item 1): `codec::to_js_value` is the copy OUT, row for row, and the `_tier` members are
/// ordinary keys of an ordinary object.
#[wasm_bindgen(js_name = "readTiered")]
pub fn read_tiered(handle: JsValue, address: JsValue, tier: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let address = codec::address_of(&address);
    let tier = codec::tier_of(&tier);
    let answer: Result<crossing::JsValue, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.read_tiered(&address, &tier)
    });
    answer_or_throw(answer.map(|value| codec::to_js_value(&value)))
}

/// **`delete(handle, address, tier)` — THE TWO POSITIONS THE STORE'S OWN `delete` TAKES, AND THE RECEIPT
/// OUT** (`facade.rs:790`–`:822`; `§2.2`, `PAR-JS-16`).
///
/// **THE RECEIPT IS THE ONE THAT CARRIES THE `triggeringAddress` MEMBER BESIDE IT** (`§2.7` item 2;
/// `PAR-JS-12`), exactly as `write`'s record does — the invocation window opens AFTER this entry returns, in
/// the mapping layer that holds the caller's functions (`F-13`: this layer invokes no listener). **AND THE
/// RECEIPT'S `op` MEMBER IS THE ONE THAT CROSSES `null` WHERE THE DELETE REMOVED NOTHING** (`D-43` item 3;
/// `codec::to_js_delete_receipt`'s `None` arm).
#[wasm_bindgen(js_name = "delete")]
pub fn delete(handle: JsValue, address: JsValue, tier: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let address = codec::address_of(&address);
    let tier = codec::tier_of(&tier);
    let answer: Result<crossing::JsDeleteReceipt, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        // **`delete` LOOKS READ-ONLY AND TAKES `&mut self`** (`facade.rs:645`–`:648`): it returns a receipt
        // AND mutates the store, so `get_mut` is the correct borrow and the shared one would not compile.
        store.delete(&address, &tier)
    });
    answer_or_throw(answer.map(|receipt| {
        let answer = codec::to_js_delete_receipt(&receipt);
        let triggering = codec::to_js_segments(&segments_of(&address));
        codec::set_member(&answer, "triggeringAddress", &triggering);
        answer
    }))
}

/// **`rollback(handle, opId)` — ONE POSITION, THE JOURNAL'S OWN VERB, AND THE PATTERN'S REVERSE STEP**
/// (`facade.rs:824`–`:852`; `§2.6`): the id a `write` returned, `crossing::Instance::rollback` behind it, and
/// `{opId, undoneOps, restoredTo}` out through the twin's `to_js_rollback_result`.
#[wasm_bindgen(js_name = "rollback")]
pub fn rollback(handle: JsValue, op_id: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let op_id = codec::op_id_of(&op_id);
    let answer: Result<crossing::JsRollbackResult, Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.rollback(&op_id)
    });
    answer_or_throw(answer.map(|result| codec::to_js_rollback_result(&result)))
}

/// **`restoreMark(handle, mark)` — ONE POSITION AND `undefined` OUT** (`facade.rs:854`–`:908`), the journal's
/// second consumer beside `rollback`.
///
/// **AN ABSENT POSITION IS THE JOURNAL'S HEAD** and **the FLOOR row (`{k:'F'}`) is the born state**, and both
/// are the STORE's readings (`crossing::Instance::restore_mark`'s two arms); **the entry answers `undefined`
/// because the state is read back through `read`, the ONE route to state** (`surface.md §2.4` item 9), and no
/// record is shaped for a verb whose whole product is the state the journal already records.
#[wasm_bindgen(js_name = "restoreMark")]
pub fn restore_mark(handle: JsValue, mark: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let mark = codec::op_id_of(&mark);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.restore_mark(&mark)
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`journalMark(handle)` — ZERO POSITIONS BEYOND THE HANDLE, AND THE MARK AS A CARRIER**
/// (`facade.rs:910`–`:951`): *"ITS ZERO POSITIONS ARE THE WHOLE OF IT, AND IT IS A PURE READ."*
///
/// **THE ANSWER IS NOT A BARE STRING** (`codec.rs:545`–`:556`): it is `{k:'s', v:<op id>}` for an entry and
/// `{k:'F'}` for the floor, so the package holds the store's own spelling and hands it back to `restoreMark`
/// verbatim — **the mark's spelling lives here and nowhere in the package.**
///
/// **THE SHARED BORROW IS TAKEN, AND IT IS THE NODE FRAME'S OWN** (`facade.rs:943`–`:947`: *"A pure read, so
/// the table is borrowed and not borrowed mutably"*): `Instance::journal_mark` takes `&self`, and unlike the
/// two read verbs the frame's own comment reads it as the pure read it is.
#[wasm_bindgen(js_name = "journalMark")]
pub fn journal_mark(handle: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let answer: Result<JsValue, Refusal> = INSTANCES.with(|instances| {
        let instances = instances.borrow();
        let store = instances
            .get(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        Ok(codec::to_js_mark(store.journal_mark().as_deref()))
    });
    answer_or_throw(answer)
}

/// **`listen(handle, listenerHandle, addresses)` — THE TWO POSITIONS REACH THE CORE AS THE TWO THE STORE
/// DECLARES, AND THE ANSWER IS `undefined`** (`facade.rs:953`–`:987`; `contract.md §2.2`; `listen-verb.md §1`
/// item 1).
///
/// **THE CALLER SUPPLIES THE IDENTITY AND THE SET, SO THERE IS NO DATUM TO RETURN** (`PAR-HL-3`): the
/// caller's handle string is the store's own handle, and the set is an array of the store's addresses, each
/// member read through the SAME address reader every other position uses (`codec::address_set`). **A
/// MEMBER OUTSIDE THE STORE'S DOMAIN IS REFUSED BY THE STORE'S OWN SITE**, which is where the node frame's
/// outside values are refused too.
#[wasm_bindgen(js_name = "listen")]
pub fn listen(handle: JsValue, listener_handle: JsValue, addresses: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let listener_handle = codec::handle_arg_of(&listener_handle);
    let addresses = codec::address_set(&addresses);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.listen(&listener_handle, &addresses)
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`unlisten(handle, listenerHandle)` — THE ONE POSITION IS THE HANDLE, AND THE WITHDRAWAL IS THE STORE'S**
/// (`facade.rs:989`–`:1017`). **A value outside the instance's domain is a NO-OP SUCCESS** (`§2.3` item 4;
/// `crossing::Instance::unlisten`'s non-opaque arm answers `Ok(())`), so no second form is minted here for a
/// handle the caller spelled wrongly.
#[wasm_bindgen(js_name = "unlisten")]
pub fn unlisten(handle: JsValue, listener_handle: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let listener_handle = codec::handle_arg_of(&listener_handle);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.unlisten(&listener_handle)
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`removeListener(handle, listenerHandle)` — THE STORE HALF, AND THE REMOVAL *IS* THE PURGE**
/// (`facade.rs:1019`–`:1052`; `removal-members.md §2` item 3): every entry the handle names, at every address
/// it stood at, and **it does NOT reach `unlisten`**, whose first-match withdrawal is a different act.
///
/// **A NON-STRING CANNOT NAME AN ENTRY AND THE STORE ANSWERS ITS OWN NO-OP** (`PAR-HL-4`: *"a purge of
/// nothing is a lawful act"*), which is the arm `crossing::Instance::remove_listener` already carries for
/// every row but the opaque one.
#[wasm_bindgen(js_name = "removeListener")]
pub fn remove_listener(handle: JsValue, listener_handle: JsValue) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let listener_handle = codec::handle_arg_of(&listener_handle);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        let store = instances
            .get_mut(store_index as usize)
            .ok_or_else(|| no_instance_at(store_index))?;
        store.remove_listener(&listener_handle)
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`register(handle, listenerHandle, listenerSlot)` — THE REGISTRATION SITE'S DOMAIN HALF, AND IT RECORDS
/// NOTHING** (`facade.rs:1255`–`:1313`; `surface.md §2.4` item 5).
///
/// **WHAT THE NODE FRAME ACTUALLY DOES, AT ITS BYTES, BECAUSE THE NAME PROMISES MORE THAN THE BODY DOES:**
/// it resolves the store, reads the handle's carrier (`codec.handle_arg`), hands the HANDLE to
/// `crossing::Instance::register`, and answers `undefined` — and **`Instance::register` is a MEMBERSHIP TEST
/// and no store call at all**: its own arm is
/// `JsHandleArg::Opaque(opaque) if self.owned.contains(&opaque.handle) => Ok(())`, and every other row is
/// refused with the store's own generated `AddressMalformed` (`crossing.rs:1336`–`:1360`).
/// **IT STORES NO FUNCTION, OPENS NO SLOT, MUTATES NO STORE AND RECORDS NOTHING.** The caller's function is the
/// PACKAGE's own state (`index.mjs`'s `state.registry`, `U-12`), the core keeps no list of functions, and
/// **`DD-15` is why**: a JS function cannot cross into Rust at any depth, so there is nothing here to hold it.
///
/// **⟶ AND THE THIRD POSITION IS DECLARED AND NEVER READ — THAT IS THE HONEST READING OF
/// `facade.rs:1270`.** The node frame's `listener_slot: JsVal<'_>` is named by no byte of its body; it is
/// carried **so that the arity `2` is a property of the SIGNATURE and not of a count anything takes**
/// (`export-set-and-dispatch.md §1`; `facade.rs:1274`–`:1279`: *"AND THE LISTENER'S POSITION IS DECLARED AND
/// NOT READ — the FUNCTION itself never crosses (`DD-15`)"*). **THIS ENTRY REPRODUCES THAT AND NOTHING MORE**:
/// the position stands, its value is ignored, and no observable moves. **The node arm's `listener_slot` is
/// also the `unused variable` warning the host build prints** — it is spelled with a leading underscore here
/// because this file may carry no warning, and **the difference between the two spellings is a lint and not a
/// behaviour.**
///
/// **THE TABLE MISS ANSWERS THE REGISTRATION SITE'S OWN REFUSAL AND NOT `no_instance_at`** — `facade.rs:1300`'s
/// `registration_refusal("", "the addon's first argument", "an instance id the package holds no instance
/// at")` — which is why this entry's `match` is written out rather than folded into `?`.
#[wasm_bindgen(js_name = "register")]
pub fn register(
    handle: JsValue,
    listener_handle: JsValue,
    _listener_slot: JsValue,
) -> Result<JsValue, JsValue> {
    let store_index = store_index_of(&handle).map_err(|refusal| throw_refusal(&refusal))?;
    let listener_handle = codec::handle_arg_of(&listener_handle);
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        match instances.get_mut(store_index as usize) {
            Some(store) => store.register(&listener_handle),
            None => Err(crossing::registration_refusal(
                "",
                "the addon's first argument",
                "an instance id the package holds no instance at",
            )),
        }
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}

/// **`version()` — ZERO POSITIONS, A STRING, AND NO `Result`** (`facade.rs:1323`–`:1351`; `release.md §2.4`
/// item 1; `docs/specs/storeroom-js/package.md §6.1` item 2).
///
/// **IT TAKES NO HANDLE BECAUSE THE NODE FRAME HAS NO RECEIVER EITHER** (`facade.rs:1347`'s `version(_env)`),
/// and `design.md` §3's sentence governs the answer: *"`version` and `errorMessage` answer no `Result` at
/// all."* **THE READ IS `option_env!` AND NOT `env!`, UNCHANGED FROM THE NODE FRAME**, and for that frame's
/// own reason: `env!` is a compile error where the variable is not set, so a read of
/// `STOREROOM_JS_PACKAGE_VERSION` could never fall back — and the absent-directive case is the very state the
/// fallback prices (`§6.10` item 2). **The three states stay distinct and none is collapsed**: the directive
/// emitted is its own value; the directive absent takes `env!("CARGO_PKG_VERSION")`; and a manifest that
/// answered a non-string is answered at `parameter-semantics.md §5.1`.
#[wasm_bindgen(js_name = "version")]
pub fn version() -> String {
    option_env!("STOREROOM_JS_PACKAGE_VERSION")
        .unwrap_or(env!("CARGO_PKG_VERSION"))
        .to_string()
}

/// **`errorMessage(code, subject, container?, token?)` — THE STORE'S OWN GENERATOR, REACHED FROM THE JS SIDE,
/// ANSWERING A STRING AND THROWING NO REFUSAL AT ALL** (`facade.rs:1353`–`:1477`, and `:1417`'s own sentence:
/// *"this entry throws no refusal at all, and the arm below reaches the generator and nothing else"*).
///
/// **THE POSITIONS ARE THE NODE FRAME'S FOUR, IN ITS OWN ORDER** — `code`, `subject`, the optional container,
/// and the optional closed arm token — and the two optional ones are folded by `codec::supplied`, which is
/// the node arm's `Option<JsVal>` rule (`napi`'s `Option<T>` answers `None` for `undefined` OR `null`) rather
/// than the glue's narrower `Option<JsValue>` one. **The generator's frame is the codec's** (`codec::error_message`):
/// this entry reads no position itself, mints no code, authors no sentence and touches no store — **there is
/// no handle here because the generator is the STORE's function and not the instance's** (`§2.5` item 2: *"`message`
/// is the store's own GENERATED message VERBATIM"*), which is why this entry resolves no row and can refuse
/// nothing a handle could name.
///
/// **`code` IS DECLARED A RUST `String`, WHICH IS THE NODE FRAME'S DECLARED TYPE** (`facade.rs:1399`), so the
/// class of that position is the same declaration on both arms; **the difference between the two arms is
/// declared rather than glossed**: the node arm's `String` conversion is STRICT and throws a library error
/// before the frame is entered (measured there and recorded at `facade.rs:1404`–`:1417`), while the glue's
/// string decode COERCES the position — and every shipped caller supplies a status token
/// (`artefact.mjs:280`, `:300`, `:392`–`:393`; `constraints.mjs:550`, `:1409`, `:3783`;
/// `delivery.mjs:1538`).
#[wasm_bindgen(js_name = "errorMessage")]
pub fn error_message(code: String, subject: JsValue, container: JsValue, token: JsValue) -> String {
    codec::error_message(&code, &subject, &container, &token)
}

// =================================================================================================
// THE NINETEENTH ENTRY — `storeRelease`, THE RETIREMENT'S FRAME (`D-171`; the architect's closure answer, arm `a`)
//
// **IT IS NOT ONE OF THE FIFTEEN PER-VERB AND NOT A MEMBER OF THE PRODUCT'S SURFACE**, exactly as its Node twin is
// not (`facade.rs:1279`–`:1288`): it is reached by the package's own `STORE_RETIREMENT` callback and by no consumer,
// and the declaration names it not at all (`surface.md §3.8`; `index.d.ts` moves no byte — the addon's entries are
// not the package's declared surface). **AND IT IS THE ONE ENTRY OF THE NINETEEN WHOSE STORE IS A POSITION AND NOT
// THE HANDLE-FIRST FORM**, which is the single place this file's §1 rule is bent — and it is bent by who calls it,
// not by a taste: see its own docblock.
// =================================================================================================

/// **`storeRelease(handle)` — THE RETIREMENT'S FRAME: THE STORE IS DROPPED AND ITS SLOT STANDS AS THE TOMBSTONE**
/// (`facade.rs:473`–`:549`, read as this arm's own; `D-171` item 2; `receiver-and-refusal.md §6`).
///
/// **⟶ ADDED 2026-11-19 BY THE ARCHITECT'S CLOSURE ANSWER, ARM `a`: THIS ARM RETIRES AS THE NODE ARM DOES.** The
/// state it closes is declared at this file's own head and at `design.md` §8 — *"`STORE_RETIREMENT` has no finalizer
/// to fire it — so a WASM store is never released and the `INSTANCES` table grows"* — and **the package's callback
/// already existed and already fires**: `state.mjs`'s `STORE_RETIREMENT.register(instance, id)` holds the INTEGER
/// and calls `withAddon().storeRelease(id)`, so before this entry that call raised and the registry's `catch`
/// swallowed it. **Nothing in the package moves; the member it calls now exists.**
///
/// **THE POSITION IS AN INDEX AND NOT A HANDLE-OF-A-RECEIVER, AND THAT IS FORCED BY WHO CALLS IT.** Every other
/// entry here resolves its store from the FIRST position, which on this arm is the same integer the Node arm reads
/// off its Node-API `this` — and **a finalizer has no receiver to be called on**: `FinalizationRegistry`'s callback
/// is handed the HELD VALUE and nothing else, and the held value may not be the store object itself, because
/// holding it would be the strong reference that stops the very collection the finalizer exists to observe. **SO
/// THE INTEGER IS THE WHOLE OF WHAT CROSSES**, and this entry therefore reads `store_index_of` not at all: the
/// position IS the row's name and there is nothing between it and the table.
///
/// **THE POSITION IS READ BY CLASS, AND THAT IS WHY IT IS NOT DECLARED A `u32`.** A declared `u32` parameter would
/// let the glue perform `arg0 >>> 0`, where a detached call's `undefined` and a `NaN` both become `0` — **a slot the
/// table DOES hold, and a release that answers while freeing the wrong store** — which is `receiver-and-refusal.md
/// §3`'s regression read backwards (`store_index_of`'s own clause, one screen up). The value is read through
/// `wasm_codec`'s `number_of`, which asks the CLASS first ([`codec::number_of`]), and no coercion stands anywhere on
/// this path.
///
/// **★ AND THE `NaN` GUARD IS LOAD-BEARING, STATED AT THE LINE THAT TAKES IT.** `NaN as usize` — and `NaN as u32`
/// on this arm — **SATURATES TO `0` IN RUST** (a float→integer cast saturates rather than being undefined, which is
/// the reason the other arm's docblock calls the same cast out): a cast that let `NaN` through would name **THE FIRST
/// STORE EVER CONSTRUCTED** and free a store the caller never named. **SO THE DOMAIN TEST IS THE GUARD AND NOT A
/// CAST**: `NaN`, `±Infinity`, a negative and a fraction are one arm and are refused — never coerced — and no store
/// is touched by any of them.
///
/// **THE TWO ABSENT ARMS ARE ONE OBSERVABLE, WHICH IS `receiver-and-refusal.md §3`'s OWN RULE.** A handle whose
/// slot has ALREADY been emptied and a handle no mint ever reached both answer [`no_instance_at`] — the crate's own
/// `AddressNotFound` — because [`Slots::release`] is a `get_mut`-guarded take: the tombstone and the fabricated index
/// read the same `None`. **NEITHER PANICS AND NEITHER ANSWERS `Ok`**: a finalizer that fires twice, or a package
/// handed the same integer by a stale row, is REFUSED rather than obeyed, so a second release can never free a
/// second store. **AND A NUMBER THIS ARM COULD NEVER HAVE MINTED** — integral and finite but beyond `u32::MAX` — is
/// the same table miss and not the malformed arm, because the Node frame's `raw as usize` saturates there and
/// answers its absent form; the two arms keep one observable for one value.
///
/// **THE ANSWER IS `undefined` AND IT IS THE NODE FRAME'S** (`facade.rs:546`'s `make_undefined`), on the one landing
/// every entry takes ([`answer_or_throw`]).
#[wasm_bindgen(js_name = "storeRelease")]
pub fn store_release(handle: JsValue) -> Result<JsValue, JsValue> {
    let store_index = match codec::number_of(&handle) {
        // **THE CLASS IS READ FIRST, THEN THE DOMAIN** — a finite, non-negative integer that fits the arm's own
        // handle width. **Nothing on this path coerces the value**, which is the property the guard above states.
        Some(raw) if raw.is_finite() && raw >= 0.0 && raw.fract() == 0.0 && raw <= u32::MAX as f64 => raw as u32,
        // A number this arm could never have minted: the table miss, and NOT the malformed arm (see the docblock).
        Some(raw) if raw.is_finite() && raw >= 0.0 && raw.fract() == 0.0 => {
            return Err(throw_refusal(&no_instance_at(u32::MAX)));
        }
        // **AND `NaN`, `±inf`, a negative, a fraction and every non-number are THIS arm** — the malformed one, which
        // touches no store. The `NaN` arm is the load-bearing one: `NaN as u32` would be `0`, the first store's slot.
        _ => return Err(throw_refusal(&not_a_store_index())),
    };
    // **THE ONE ACT** (`§6`): the instance is TAKEN OUT OF ITS SLOT AND DROPPED, and the slot stands as the
    // tombstone — so every index minted before this act still names the store it was minted for and no later store
    // is renumbered. **THE `Err` ARM IS THE TOMBSTONE AND THE FABRICATED INDEX ALIKE** ([`no_instance_at`]), and it
    // is taken BEFORE anything is dropped, so a refused release frees nothing at all.
    let answer: Result<(), Refusal> = INSTANCES.with(|instances| {
        let mut instances = instances.borrow_mut();
        if instances.release(store_index as usize) {
            Ok(())
        } else {
            Err(no_instance_at(store_index))
        }
    });
    answer_or_throw(answer.map(|()| JsValue::UNDEFINED))
}
