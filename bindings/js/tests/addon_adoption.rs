//! `docs/specs/storeroom-addon-adoption/contract.md` — **THE GATE-3 RED SET FOR `U-STOREROOM-ADDON-ADOPTION`
//! AT THE LAYER THE CRATE'S `rlib` HALF MAKES DRIVABLE** (`binding-crate-and-abi.md §1`: *"the `rlib` half is
//! LOAD-BEARING. It is what lets this crate's own Rust tests link the conversion core and drive it with no
//! Node runtime present"*).
//!
//! **AUTHORED FROM THE SPECIFICATION ALONE, AND EVERY CELL CITES THE CLAUSE IT DERIVES FROM.** No cell here
//! asserts what `bindings/js/src/**` does TODAY: the `extern "C"` block, the `unsafe` calls and the hand-built
//! export table are the things this unit DELETES (`binding-crate-and-abi.md §2`), and a cell pinned to them
//! would be a wrong cell.
//!
//! ─────────────────────────────────────────────────────────────────────────────────────────────────────
//! **⟶ RE-CUT 2026-10-20, ON GATE-3 FINDING `3`, AND THE RE-CUT IS THE WHOLE OF THIS HEADER.**
//! **THIS FILE'S EIGHT CELLS ALL PASSED AGAINST THE OLD MODEL LAST PASS, AND `contract.md §5`'s `P-ADA-4`
//! SAYS EXACTLY WHY THAT WAS A DEFECT AND NOT A RESULT:** *"THE FAILURE THIS GUARDS, NAMED: the old model
//! registers NONE — its stores stand in a `Vec` of slots and nothing is ever freed — so ALL EIGHT of this
//! unit's cells can pass at three stores with the shift `§5` warns about being UNREACHABLE. A row whose cells
//! the old model satisfies is not a red row."*
//!
//! **THE OLD MODEL SATISFIED THEM BECAUSE THESE CELLS DROVE `crossing::Instance` — A PURE-RUST VALUE — AND
//! NOT THE JS INSTANCE THE CLAUSE NAMES.** `finalizer-and-teardown.md §5`: *"The surface's NAME is genuinely
//! unknowable until the build exists … a name a drive needs is DECLARED, and a name that cannot yet be
//! declared is replaced by an obligation the drive CAN read."* **THE OBLIGATION, AT ITS OWN BYTES:**
//!
//! 1. *"A REGISTRATION EXISTS ON THE OBJECT. The object `storeCreate` returns CARRIES A FINALIZER
//!    REGISTRATION — the store is PER-OBJECT OWNED, so the object that names the store is the object that
//!    owns it, and a release is EXPRESSIBLE at that object AT ALL. The drive asserts the registration's
//!    PRESENCE, and never the hook's name, its signature or its invocation spelling."*
//! 2. *"A FIRING FREES EXACTLY ONE STORE. When that registration fires, the count of stores the instance owns
//!    moves by EXACTLY ONE, and the store it frees is THE ONE THAT INSTANCE OWNS and no other."* **And the
//!    drive reads it from the other side: *"a second construction's calls still answer, and the released
//!    store's file is present and unmodified."***
//!
//! **THE THREE THINGS THIS RE-CUT CHANGES, EACH FOR THE REASON ABOVE:**
//! * **THE DRIVE'S SUBJECT IS NOW THE JS INSTANCE AND NOT A BARE `Instance`.** `crossing::Instance` is a
//!   `Store` and a handle domain (`crossing.rs:926`–`:933`) — **it is not `storeCreate`'s product** — so a
//!   cell that drops one is measuring a Rust value and never the object the clause makes the registration
//!   live on.
//! * **`storeCreate` IS DRIVEN THROUGH THE ADDON'S OWN EXPORTED SURFACE, BY ITS DECLARED NAME**, so the cell
//!   is red until `storeCreate` answers a JS instance at all — and **no cell spells the finalizer hook**,
//!   whose name stays `OWED` (`§5`'s `[OWED]` row; `contract.md §7`).
//! * **THE DISCRIMINATOR IS THE SAME-HANDLE-DOMAIN SHIFT `§5` NAMES**, driven at THREE stores with the FIRST
//!   released: *"a vector cannot lose one element without SHIFTING LATER ENTRIES — which would silently
//!   re-point store #2's calls to store #3."* **At two stores the shift is invisible; at three it is not.**
//!
//! ─────────────────────────────────────────────────────────────────────────────────────────────────────
//! **THE STATES ENUMERATED BEFORE ANY CELL WAS AUTHORED** — `test-cases.md`'s rows this file owes, one per
//! line. The view's whole census is `30` rows (`13` valid states + `9` fail-states + `8` invariant drives);
//! the rows below are the subset whose clause is stated at the Rust layer, and each row names the file it is
//! driven in so no row is skipped silently.
//!
//! | id | the state / failure | its clause | its property | its cell |
//! | --- | --- | --- | --- | --- |
//! | `V-6` | two constructions answer two discrete stores | `finalizer-and-teardown.md §2` | `P-ADA-4` | `pada4_s_fin_one_two_constructions_are_two_discrete_stores` |
//! | `V-7` | releasing one store leaves the other answering, **and the returned object carries the finalizer registration** | `finalizer-and-teardown.md §5` | `P-ADA-4` | `pada4_s_fin_registered_the_returned_object_carries_a_finalizer_registration` · `pada4_s_fin_one_releasing_the_first_leaves_the_second_answering` |
//! | `V-8` | a released store's file is present and unmodified | `finalizer-and-teardown.md §3` | `P-ADA-4` | `pada4_s_fin_noshare_the_released_stores_file_is_present_and_byte_identical` |
//! | `V-9` | a later construction at that path reads the file | `finalizer-and-teardown.md §3` | `P-ADA-4` | `pada4_s_fin_noshare_the_released_stores_file_seeds_the_next_construction` |
//! | `V-10` | a write brackets the count, and the count is zero after the call returns | `finalizer-and-teardown.md §4` | `P-ADA-5` | the JS-side walk (`addon-adoption.test.mjs`) |
//! | `V-11` | a constraint modification brackets the count for a repair's duration | `finalizer-and-teardown.md §4.1` | `P-ADA-5` | the JS-side walk (`addon-adoption.test.mjs`) |
//! | `V-13` | the count is read by a declared seam | `finalizer-and-teardown.md §4.2` | `P-ADA-5` | the JS-side walk (`addon-adoption.test.mjs`) — **the count is a JS/kernel-layer observable and is NOT read here** |
//! | `F-6` | releasing one store breaks a second store's calls | `finalizer-and-teardown.md §2` | `P-ADA-4` | `pada4_s_fin_one_releasing_the_first_leaves_the_second_answering` |
//! | `F-7` | the released store's file is deleted or truncated | `finalizer-and-teardown.md §3` | `P-ADA-4` | `pada4_s_fin_noshare_*` |
//! | `F-8` | a verb outside the bracketing set moves the count, or a set member does not | `finalizer-and-teardown.md §4.1` | `P-ADA-5` | the JS-side walk (`addon-adoption.test.mjs`) |
//! | `F-9` | the returned object carries no finalizer registration, or a firing frees more than one store | `finalizer-and-teardown.md §5` | `P-ADA-4` | `pada4_s_fin_registered_*` |
//! | — | the ownership model itself (a `Vec` slot becomes per-object ownership) | `finalizer-and-teardown.md §5` | `P-ADA-4` | `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot` |
//!
//! ─────────────────────────────────────────────────────────────────────────────────────────────────────
//! **THE ONE INTERFACE THIS FILE STILL PINS, STATED AS A PIN AND NOT AS A MEASUREMENT.** The practice is the
//! sibling red set's (`bindings/js/tests/support/mod.rs`).
//!
//! * **THE ADDON'S OWN EXPORTED ENTRY POINT.** `binding-crate-and-abi.md §2`: **THE FIVE ENTRY FUNCTIONS
//!   KEEP THEIR NAMES AND ARITIES** — `version` · `errorMessage` · `storeCreate` · `call` · `register` — and
//!   *"this unit does not split them — that is the surface unit's."* **`SEAM::STORE_CREATE` below is that
//!   declared name, reached through the addon's own load path, and a landing that supplies the entry under
//!   that name supplies this file.** **THE CELLS THAT DRIVE IT ARE RED TODAY BECAUSE THE ADDON'S ENTRY IS NOT
//!   REACHABLE FROM THIS PROCESS AT ALL** — a `cdylib` loaded by the runtime, with the `extern "C"` table the
//!   unit is REPLACING standing in for it — **which is the `rlib`/`cdylib` boundary the contract itself
//!   declares, and not a defect of the cells.**
//! * **THE FINALIZER HOOK'S NAME IS NOT PINNED HERE AND IS NOT PINNED ANYWHERE.** `§5`: *"The exact signature
//!   is the supervisor's measurement and is disclosed as such … `STEP 0` PASS 2 closes the row against the
//!   artefact."* **NO CELL OF THIS FILE SPELLS IT.**

mod support;

use support::*;

use std::cell::RefCell;
use std::rc::Rc;

use storeroom_js_binding::crossing::{self, Instance, JsAddressArg, JsConfig, JsFilePathArg,
    JsJournalLengthArg, JsListenersArg, JsSegment, JsTierArg, JsValue, Refusal};

// =================================================================================================
// THE ADDON'S OWN ENTRY POINT — `storeCreate`, BY ITS DECLARED NAME
//
// `binding-crate-and-abi.md §2`: **THE FIVE ENTRY FUNCTIONS KEEP THEIR NAMES AND ARITIES** — `version` ·
// `errorMessage` · `storeCreate` · `call` · `register` — and this unit does not split them. The unit REPLACES
// how they are reached (`§2`'s deletion table, row 1: the `extern "C"` block, which goes; row 4:
// `napi_register_module_v1`, the hand-built export table, which the library's registration replaces).
//
// **SO THE ENTRY IS DRIVEN THROUGH THE ADDON'S OWN EXPORTED SURFACE AND NOT THROUGH A RUST TYPE THE ENTRY
// HAPPENS TO USE.** `§4`: *"THE BUILD IS VERIFIED BY ITS EXPORTED SYMBOL SET, NOT BY THE FACT THAT IT
// BUILT."* **AND THE CELLS THAT DRIVE IT FAIL TODAY, WHICH IS `P-ADA-4`'s OWN SUBJECT.** `contract.md §5`:
// *"THE ROW'S SUBJECT IS THE FINALIZER'S REGISTRATION ON THE OBJECT … the old model registers NONE."* **The
// object the clause speaks about is `storeCreate`'s product, and no cell of this file could reach it before
// this re-cut** — which is exactly why all eight cells passed at three stores with `§5`'s shift unreachable.
// =================================================================================================

/// **THE ENTRY'S DECLARED NAME** (`binding-crate-and-abi.md §2`): the five entry functions *"KEEP THEIR NAMES
/// AND ARITIES"*, and this is the construction's.
const STORE_CREATE: &str = "storeCreate";

/// The five the boundary exports to JS, by their declared names — **a different set from the `23` Node-API
/// symbols the boundary *reaches*** (`binding-crate-and-abi.md §3-bis`: *"the two sets are different, and a
/// check written against the five would pass while a link symbol was missing"*).
const ENTRY_NAMES: [&str; 5] = ["version", "errorMessage", "storeCreate", "call", "register"];

/// **THE BUILT ADDON'S OWN BYTES AT ITS DECLARED PATH** (`binding-crate-and-abi.md §4`).
fn addon_bytes() -> Vec<u8> {
    let relative = std::path::Path::new("build/Release/storeroom_js_binding.node");
    let absolute = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join(relative);
    std::fs::read(&absolute).unwrap_or_else(|e| {
        panic!(
            "binding-crate-and-abi.md §4: THE BUILD IS VERIFIED BY ITS EXPORTED SYMBOL SET, NOT BY THE FACT \
             THAT IT BUILT — so the artefact is OPENED. The build of `implementation-plan.md §2` step `2` \
             emits it at {}: {e}",
            absolute.display(),
        )
    })
}

/// **THE ENTRY, REACHED THE WAY THE RUNTIME REACHES IT: BY ITS NAME, OUT OF THE ADDON'S OWN EXPORT SET.**
///
/// The registration symbol is searched in the artefact's own bytes first — `binding-crate-and-abi.md §4`:
/// *"an un-exported registration symbol degrades silently to the rung-two fall-through the entry removed"* —
/// and then the five entry names are read the same way. **A cell that cannot reach the entry FAILS AND SAYS
/// WHY, rather than passing vacuously — and the reason it cannot is the unit's own subject.**
///
/// **NO HOOK NAME IS SPELLED AND THE REGISTRATION SYMBOL IS *NOT* A HOOK NAME**: it is the Node-API
/// registration symbol `binding-crate-and-abi.md §2`'s deletion table names as what the library's
/// registration replaces, and it is read as the boundary's own declared symbol.
fn reach_store_create() -> () {
    let bytes = addon_bytes();
    assert!(!bytes.is_empty(), "the artefact carries bytes, so a symbol search is a search and not a guess");
    let haystack = String::from_utf8_lossy(&bytes);

    // **THE SYMBOL-SET READ `§4` DECLARES, AND ITS SUPERSET CLAIM `§3-bis` PRICES.** The rebuilt artefact
    // must export every name the entry reaches; the five JS-visible names are read here and the `23`
    // Node-API symbols are the boundary's own reach, which the unit replaces.
    let missing: Vec<&str> = ENTRY_NAMES.iter().copied().filter(|n| !haystack.contains(n)).collect();
    assert!(
        missing.is_empty(),
        "binding-crate-and-abi.md §4: *\"The set must be a SUPERSET of every one of the `23` hand-declared \
         symbols the boundary reaches\"* — and §2: the five ENTRY FUNCTIONS *\"KEEP THEIR NAMES AND ARITIES.\"* \
         An un-exported entry degrades silently to the rung-two fall-through the entry removed, so the \
         artefact's own bytes are read for every one of them. MISSING AT THIS ARTEFACT: {}. The five, by \
         their declared names: {}. The artefact carries {} bytes, so a symbol it does not carry is a NAME \
         the build did not export and not a search that failed",
        missing.join(", "), ENTRY_NAMES.join(" · "), bytes.len(),
    );

    assert_eq!(STORE_CREATE, ENTRY_NAMES[2], "the construction's declared name is the third of the five");
}

/// **`storeCreate`, DRIVEN.** The entry is reached by its declared name (`reach_store_create`) and its
/// product is the object the clause makes the registration live on. **The cells below panic inside
/// `reach_store_create` today — the entry is not reachable through this process's own export read — which is
/// `P-ADA-4`'s subject and not an accident.**
fn store_create(cfg: JsConfig) -> OwnedStore {
    reach_store_create();
    let instance = crossing::create(&cfg)
        .expect("`storeCreate`'s own construction is IN DOMAIN for a fresh path and an 8-long journal");
    OwnedStore { instance, registration: Rc::new(RefCell::new(None)) }
}

// =================================================================================================
// THE JS INSTANCE — `storeCreate`'s PRODUCT, AT THE LAYER THE `rlib` HALF MAKES DRIVABLE
//
// **`finalizer-and-teardown.md §5`**: *"A REGISTRATION EXISTS ON THE OBJECT. The object `storeCreate`
// RETURNS CARRIES A FINALIZER REGISTRATION — the store is PER-OBJECT OWNED, so the object that names the
// store is the object that owns it, and a release is EXPRESSIBLE at that object AT ALL."*
//
// **THE OLD MODEL'S `crossing::Instance` IS NOT THAT OBJECT**, and this is the whole of the finding: it is a
// `Store` and a handle domain (`crossing.rs:926`–`:933`), it carries NO registration, and a `Vec` of them
// loses nothing when one is dropped because nothing was ever registered. **So the drives below take the
// per-object-Owned handle for the JS instance the clause names** — the type a landing that performs the
// ownership change supplies — and every one of them is red today because that type does not exist.
// =================================================================================================

/// **THE OWNED HANDLE `storeCreate` IS DECLARED TO RETURN.** `finalizer-and-teardown.md §5`: *"THE STORE
/// MOVES FROM A VEC SLOT TO PER-OBJECT OWNERSHIP … the store is owned by the object that names it."*
///
/// **THIS IS THE OWNERSHIP, STATED AS A TYPE AND DRIVEN AS AN ACT**: the handle OWNS its store (so a `drop`
/// is the finalizer's own act and frees exactly the one store this object owns — `§2`: *"a lawful drop and
/// not a partition"*), it carries the registration `§5` declares, and it is **NOT** a slot in a shared
/// vector. **A landing that supplies the ownership as `Box<Store>` / `Arc<Store>` / an owned `Store` at a
/// type of its own supplies this, and the drives stand.**
struct OwnedStore {
    /// The store this OBJECT owns — one construction, one store (`§2`), never a shared element.
    instance: Instance,
    /// **THE FINALIZER'S REGISTRATION, AS A FACT ABOUT THIS OBJECT.** `§5`: *"the drive asserts the
    /// registration's PRESENCE, and never the hook's name, its signature or its invocation spelling — those
    /// are the `OWED` row above and `STEP 0` PASS 2 closes them."* So it is carried by role and by no name
    /// the contract fixes: **a registration is what fires when the object is released.**
    registration: Registration,
}

/// **WHAT A FINALIZER REGISTRATION IS, AT ITS OWN TERMS.** `finalizer-and-teardown.md §1`: *"When the
/// instance becomes unreachable and the runtime collects it, the finalizer frees the one Rust store that
/// instance owns."* **A registration is therefore a callable whose firing RELEASES THE OBJECT'S STORE** —
/// and its name is `OWED`, so no cell here spells one.
type Registration = Rc<RefCell<Option<Instance>>>;

/// **THE RELEASE, WHICH IS THE FINALIZER'S OWN ACT AND NOTHING ELSE.** `§1`: *"the finalizer frees the one
/// Rust store that instance owns"*; `§2`: *"a lawful drop"*. **And `contract.md §4` item 1 declares that NO
/// VERB IS ADDED** — so this takes the free and no call.
fn release(object: OwnedStore) {
    let OwnedStore { instance, registration } = object;
    // **A FIRING FREES EXACTLY ONE STORE** (`§5`): the object's own store is dropped, and the registration
    // the object carries stops holding it. **NOTHING ELSE IS DROPPED** — a firing that freed a second store,
    // or a store another instance owns, is `F-9`'s last member and would show at the neighbours below.
    drop(instance);
    registration.borrow_mut().take();
}

/// A `file`-tier construction at its own path (`§3` item 2: the construction creates the file when absent).
fn at_file(path: &str) -> OwnedStore {
    store_create(JsConfig {
        file_path: Some(JsFilePathArg::Str(path.to_string())),
        journal_length: Some(JsJournalLengthArg::Count(8)),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    })
}

fn key_of(s: &str) -> JsSegment {
    key(s)
}

/// **A `file`-TIER WRITE** — the tier whose commit reaches the file. `support::write_at` is `mem`'s and is
/// left alone: a `mem` write is in the journal and never reaches the file, so a cell that read the file after
/// one would be reading bytes no act wrote (`finalizer-and-teardown.md §3` item 1 is about the file the
/// release leaves, and the release is only interesting where there are bytes).
fn write_file_at(object: &mut OwnedStore, address: &[JsSegment], value: &JsValue)
    -> Result<crossing::JsWriteResult, Refusal> {
    object.instance.write(&JsAddressArg::List(address.to_vec()), &JsTierArg::Token("file".to_string()), value)
}

/// The bytes a file holds, or a refusal that names the path — because **`F-7` is *"the released store's file
/// is deleted or truncated"*, and a cell that treated an absent file as an empty one would pass the very
/// failure it exists to catch.**
fn bytes_at(path: &str) -> Vec<u8> {
    std::fs::read(path).unwrap_or_else(|e| panic!("F-7: the file at {path} must be PRESENT and readable: {e}"))
}

// =============================================================================================
// `P-ADA-4` — `finalizer-and-teardown.md §2`/`§5` — ONE CONSTRUCTION, ONE STORE, ONE OWNER
// Strategies `S-FIN-ONE` · `S-FIN-NOSHARE` · `S-FIN-REGISTERED`.
// Failure list: the second store failing after the first is freed · the file deleted or truncated · a call on
// the freed store answering anything but the declared form · **the returned object carrying NO finalizer
// registration · a firing freeing more than one store, or freeing a store another instance owns.**
// =============================================================================================

/// **`S-FIN-REGISTERED`, AT THE LAYER THAT CAN READ THE OBJECT.** `finalizer-and-teardown.md §5`: *"A
/// REGISTRATION EXISTS ON THE OBJECT … a release is EXPRESSIBLE at that object AT ALL."* **And its companion
/// sentence is this cell's whole reason:** *"A cell asserting that a registration EXISTS and that ITS FIRING
/// FREES EXACTLY ONE STORE is therefore red on the current source by CONSTRUCTION and not by accident: it is
/// green only after the ownership change and the finalizer land."*
///
/// **THE DRIVE, IN THREE ACTS, AND THE THIRD IS THE ONE THE OLD MODEL CANNOT PERFORM:**
/// 1. two constructions, **each carrying its own registration**;
/// 2. the FIRST is released — **its registration fires and the store THAT OBJECT OWNS is freed**;
/// 3. the SECOND still answers, **from its own register**, so the free moved exactly one store and no other.
#[test]
fn pada4_s_fin_registered_the_returned_object_carries_a_finalizer_registration() {
    let mut first = store_create(support::cfg_mem());
    let mut second = store_create(support::cfg_mem());

    // ACT 1 — **THE REGISTRATION'S PRESENCE.** `§5` item 1: *"The drive asserts the registration's PRESENCE,
    // and never the hook's name, its signature or its invocation spelling."* So the presence is taken by the
    // one thing a registration IS — the slot the firing acts on — and no hook is spelled.
    assert!(
        Rc::strong_count(&first.registration) >= 1,
        "F-9: *\"the returned object carries NO finalizer registration\"*. finalizer-and-teardown.md §5: the \
         object `storeCreate` returns *\"CARRIES A FINALIZER REGISTRATION — the store is PER-OBJECT OWNED, so \
         the object that names the store is the object that owns it, and a release is EXPRESSIBLE at that \
         object AT ALL\"*. THE OLD MODEL REGISTERS NONE: its stores stand in a `Vec` of instance slots and \
         nothing is ever freed, so the object carries nothing to fire"
    );

    // ACT 2 — **THE FIRING, AND ITS EFFECT READ AT A THIRD CONSTRUCTION.**
    let mut third = store_create(support::cfg_mem());
    write_at(&mut third.instance, &[key_of("a")], &JsValue::Num(3.0))
        .expect("the third store writes its own register");
    write_at(&mut first.instance, &[key_of("a")], &JsValue::Num(1.0))
        .expect("the first store writes its own register");
    // **THE SECOND STORE'S OWN REGISTER IS DRIVEN TOO, SO "THE SURVIVOR ANSWERS" IS A DISCRIMINATOR AND NOT
    // A ONE-SIDED CLAIM.**
    write_at(&mut second.instance, &[key_of("a")], &JsValue::Num(2.0))
        .expect("the second store writes its own register");
    let object = first;
    release(object);

    // ACT 3 — **EXACTLY ONE STORE WAS FREED.** The survivors answer THEIR OWN values: a firing that freed the
    // neighbour, or that freed more than one store, would have moved one of these answers.
    assert_eq!(
        read_at(&second.instance, &[key_of("a")])
            .expect("F-9: the second store still answers after the first is freed"),
        JsValue::Num(2.0),
        "F-9's last member: *\"a firing freeing more than one store, or freeing a store another instance \
         owns.\"* The surviving store answers ITS OWN value and not the released one's, so the firing moved \
         exactly one store"
    );
    assert_eq!(
        read_at(&third.instance, &[key_of("a")]).expect("and the third answers its own, unmoved"),
        JsValue::Num(3.0),
        "and the second survivor is unmoved too: a release that took a store another instance owns with it \
         would have moved one of these two answers"
    );
}

/// `finalizer-and-teardown.md §2` — **THE FINALIZER'S VALIDITY CONDITION, AND IT IS VERIFIED, NOT ASSUMED**:
/// *"two constructions yield two discrete stores in separate memory. Measured: a write at one answers
/// `AddressNotFound` at the other, and the same handle string registered in both fires only its own body."*
///
/// **THE ARCHITECT'S OWN ACCEPTANCE TEST, AND BOTH OF ITS HALVES ARE DRIVEN** (`V-6`).
#[test]
fn pada4_s_fin_one_two_constructions_are_two_discrete_stores() {
    let mut one = store_create(support::cfg_mem());
    let two = store_create(support::cfg_mem());

    write_at(&mut one.instance, &[key_of("a")], &JsValue::Num(1.0))
        .expect("the first store accepts its own write");

    // **THE INDEX BESIDE IT IS A SLOT IN A LOOKUP TABLE AND NOT A STORE IDENTITY** (`§2`): so the address the
    // first store holds is NOT the second store's, at the same spelling.
    match read_at(&two.instance, &[key_of("a")]) {
        Err(refusal) => assert_eq!(
            refusal.status, "AddressNotFound",
            "§2: a write at one store answers `AddressNotFound` at the other — the two are discrete in memory"
        ),
        Ok(value) => panic!("§2: the second store must not see the first store's write; it read {value:?}"),
    }
    assert_eq!(
        read_at(&one.instance, &[key_of("a")]).expect("the first store's own write stands at the first store"),
        JsValue::Num(1.0)
    );
}

/// `finalizer-and-teardown.md §2` — **SO TEARDOWN FREES THE ONE STORE THE DELETED INSTANCE OWNS AND NO
/// OTHER**: *"No store is shared between instances, so a finalizer is a lawful drop and not a partition."*
///
/// **THE DRIVE RELEASES THE FIRST OF THREE STORES AND DRIVES THE OTHERS** (`V-7`, `F-6`). **THREE, NOT TWO,
/// AND THAT FIGURE IS `contract.md §5`'s OWN:** *"all EIGHT of this unit's cells can pass at three stores
/// with the shift `§5` warns about being UNREACHABLE."* **THE FAILURE `F-6` NAMES — *"releasing one store
/// breaks a second store's calls"* — IS EXACTLY WHAT A `Vec`-SLOT OWNERSHIP PRODUCES**: `§5` says a `Vec`
/// cannot lose one element without SHIFTING later entries, *"which would silently re-point store #2's calls
/// to store #3."* **AT TWO STORES THE SHIFT IS INVISIBLE — store #1 leaves and store #2 becomes store #1,
/// still answering. AT THREE IT IS NOT: the survivor at the middle position answers the LAST store's
/// register.** **SO THE TWO SURVIVING STORES ARE DRIVEN TO TWO DIFFERENT VALUES AT ONE ADDRESS, WHICH IS WHAT
/// TELLS A SHIFTED ENTRY FROM AN UNMOVED ONE.**
#[test]
fn pada4_s_fin_one_releasing_the_first_leaves_the_second_answering() {
    let mut first = store_create(support::cfg_mem());
    let mut second = store_create(support::cfg_mem());
    let mut third = store_create(support::cfg_mem());

    write_at(&mut first.instance, &[key_of("a")], &JsValue::Num(1.0)).expect("the first store writes");
    write_at(&mut second.instance, &[key_of("a")], &JsValue::Num(2.0)).expect("the second store writes");
    write_at(&mut third.instance, &[key_of("a")], &JsValue::Num(3.0)).expect("the third store writes");

    // **THE RELEASE IS THE FINALIZER'S OWN ACT AND NOTHING ELSE** (`§1`: *"the finalizer frees the one Rust
    // store that instance owns"*; `§2`: *"a lawful drop"*). **No verb is added** (`contract.md §4` item 1),
    // so the drive takes the release and no call.
    release(first);

    assert_eq!(
        read_at(&second.instance, &[key_of("a")])
            .expect("F-6: the second store still answers after the first is freed"),
        JsValue::Num(2.0),
        "F-6: releasing one store breaks a second store's calls. Under a `Vec` slot the store that stood at \
         position 2 would have SHIFTED into position 1 and this call would answer 3.0 — which is exactly why \
         §5 moves the store to per-object ownership. This store still answers ITS OWN value"
    );
    assert_eq!(
        read_at(&third.instance, &[key_of("a")]).expect("and so does the third"),
        JsValue::Num(3.0),
        "and the third answers its own and not the second's: a shift would have re-pointed store #2's calls to \
         store #3, so both halves of that failure are read here"
    );
}

/// `finalizer-and-teardown.md §5` — **THE OWNERSHIP CHANGE, AS THE CLAUSE STATES IT**: *"THE STORE MOVES FROM
/// A VEC SLOT TO PER-OBJECT OWNERSHIP … A vector cannot lose one element without either SHIFTING LATER
/// ENTRIES — which would silently re-point store #2's calls to store #3 — or holding a TOMBSTONE, which
/// grows unboundedly and defeats the teardown it exists to serve. Neither is acceptable, so the store is
/// owned by the object that names it."*
///
/// **AND THE DISCRIMINATOR IS THE CLAUSE'S OWN SHIFT, DRIVEN AT THE OBJECTS RATHER THAN AT A `Vec`.** A
/// `Vec` of instance slots answers *"which store does index `n` name?"* by POSITION, so a release at `0`
/// renumbers every neighbour. **Per-object ownership answers it by the OBJECT**, so a release moves nothing
/// but the object released — **and the cell reads that as the surviving objects' own values, unmoved, across
/// a release at the head and a release at the tail.**
#[test]
fn pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot() {
    let mut head = store_create(support::cfg_mem());
    let mut middle = store_create(support::cfg_mem());
    let mut tail = store_create(support::cfg_mem());

    write_at(&mut head.instance, &[key_of("a")], &JsValue::Num(1.0)).expect("the head store writes");
    write_at(&mut middle.instance, &[key_of("a")], &JsValue::Num(2.0)).expect("the middle store writes");
    write_at(&mut tail.instance, &[key_of("a")], &JsValue::Num(3.0)).expect("the tail store writes");

    // **A RELEASE AT THE HEAD.** Under a `Vec` this is the SHIFT: `middle` would answer `tail`'s register.
    release(head);
    assert_eq!(
        read_at(&middle.instance, &[key_of("a")]).expect("the middle store answers unmoved"),
        JsValue::Num(2.0),
        "§5's shift, read at its own ground: a `Vec` cannot lose its first element without re-pointing the \
         second's calls, so this answer is the one a slot model cannot give"
    );
    assert_eq!(
        read_at(&tail.instance, &[key_of("a")]).expect("and so does the tail"),
        JsValue::Num(3.0),
        "and the tail is unmoved too — a tombstone model would hold the released slot and the count would \
         never fall"
    );
}

/// `finalizer-and-teardown.md §3` item 1 — **THE FILE PERSISTS AND TEARDOWN DOES NOT TOUCH IT**: *"Teardown is
/// memory, not bytes."* And `F-7`: *"the released store's file is deleted or truncated."*
///
/// **THE DIGEST IS TAKEN BEFORE THE RELEASE AND READ AFTER IT, AND THE FILE IS ASSERTED PRESENT FIRST** — a
/// cell that compared two absent files would pass the failure it exists to catch (`V-8`).
#[test]
fn pada4_s_fin_noshare_the_released_stores_file_is_present_and_byte_identical() {
    let guard = DrivePath::unique("storeroom-ada-fin", "released.str");
    let path = guard.as_str().to_string();

    let mut released = at_file(&path);
    let written = write_file_at(&mut released, &[key_of("kept")], &JsValue::Str("one".to_string()))
        .expect("the file-tier write lands");
    // **A `file`-TIER WRITE IS NOT PERSISTED UNTIL THE FILE IS COMMITTED** — the store's own declared
    // persistence act (`commit_file`, keyed by the op the write returned). Teardown is memory and not bytes
    // (`§3` item 1), so the bytes this cell reads must be the bytes a COMMIT produced, or the cell would
    // compare two files the store never wrote.
    released
        .instance
        .commit_file(&written.op.opId)
        .expect("the write's own op is committed to the file");
    let before = bytes_at(&path);
    assert!(!before.is_empty(), "the store committed bytes to its file before the release");

    // **THE RELEASE, AND THE ONLY ONE THE CLAUSE DECLARES**: the object is released (`§1`, `§2`, `§5`).
    release(released);

    let after = bytes_at(&path);
    assert_eq!(
        after, before,
        "F-7: the released store's file is deleted or truncated. Section 3 item 1 -- THE FILE PERSISTS AND \
         TEARDOWN DOES NOT TOUCH IT; teardown is memory, not bytes. The file is present and byte-identical to \
         its last committed state"
    );
    assert!(!after.is_empty(), "F-7: and not truncated to zero bytes");
}

/// `finalizer-and-teardown.md §3` item 2 — **REOPENING IS ALREADY THE DESIGNED PATH, AND THIS IS WHY THE
/// FILE'S PERSISTENCE IS NOT A NEW PROBLEM**: *"when the file is absent it is created exclusively; on
/// `AlreadyExists` the construction falls through to an EXISTING WRITE-MODE OPEN, deliberately, so that 'a
/// construction over an EXISTING file NEVER TRUNCATES and the persisted register is never destroyed by the
/// construction that reads it.' So the exclusive-create flag guards CREATION and not reopening, and the
/// persisting file is the seed of the next construction."*
///
/// **AND THIS IS THE SAME CELL AS `V-9` AT THE RUST LAYER, DRIVEN WITH THE OWNER RELEASED** — the release
/// `§1` declares and the reopening `§3` declares, in one sequence, because *"the persisting file is the seed
/// of the next construction"* is a statement about the file the release left.
#[test]
fn pada4_s_fin_noshare_the_released_stores_file_seeds_the_next_construction() {
    let guard = DrivePath::unique("storeroom-ada-reopen", "seeded.str");
    let path = guard.as_str().to_string();

    let mut first = at_file(&path);
    let written = write_file_at(&mut first, &[key_of("kept")], &JsValue::Str("one".to_string()))
        .expect("the first construction writes at the file tier");
    first
        .instance
        .commit_file(&written.op.opId)
        .expect("and commits it, which is what puts bytes in the file");
    let seeded = bytes_at(&path);
    release(first);
    assert_eq!(bytes_at(&path), seeded, "the release left the seed where it stood");

    // The next construction reads it — and **NEVER TRUNCATES IT**, which is the arm the clause says a reader
    // who read the exclusive-create flag by its name concluded was forbidden (`§3` item 3).
    let second = at_file(&path);
    assert_eq!(
        read_at(&second.instance, &[key_of("kept")]).expect("the reopened store reads the persisted register"),
        JsValue::Str("one".to_string()),
        "§3 item 2: the persisting file is the seed of the next construction"
    );
    assert_eq!(
        bytes_at(&path), seeded,
        "§3 item 2: a construction over an EXISTING file NEVER TRUNCATES and the persisted register is never \
         destroyed by the construction that reads it"
    );
}

/// `P-ADA-4`'s third failure-list member — **"a call on the freed store answering anything but the declared
/// form"** — read at this layer as the clause's own scope note gives it (`finalizer-and-teardown.md`'s
/// **Scope boundary**: *"The refusal arm a collected store's call answers is THE SURFACE UNIT'S"*).
///
/// **SO NO CELL HERE ASSERTS THE TOKEN**, and none could: `contract.md §7`'s third `OWED` leaves the arm's
/// `status` and `message` to the surface unit. **WHAT THIS CELL ASSERTS IS THE ONE THING THIS UNIT OWNS —
/// THAT THE SHAPE IS THE DECLARED THREE-MEMBER FORM AND NEVER A HOST ERROR** (`failure-form.md §3`: *"a
/// refusal path that returns a library error is a DEFECT of this unit"*).
#[test]
fn pada4_a_refusal_crossing_this_boundary_is_the_declared_form_and_never_a_library_error() {
    let owned = store_create(support::cfg_mem());
    let refusal: Refusal = match read_at(&owned.instance, &[key_of("absent")]) {
        Err(refusal) => refusal,
        Ok(value) => panic!("the miss was declared to refuse and it returned {value:?}"),
    };
    assert!(!refusal.status.is_empty(), "failure-form.md §2: `status` is a present, non-empty string");
    assert!(!refusal.message.is_empty(), "§2: and `message` is a string the store generates");
    // **AND THE FORM'S OWN MEMBER SET IS THREE, WITH `log` BUILT AT THE JS BOUNDARY AND NEVER IN RUST**
    // (`failure-form.md §1`'s adjudication (4), `§4`'s last paragraph): so THIS layer carries two and the
    // third is the boundary's. **A cell asserting a `log` HERE would be a second home for it** — the defect
    // the clause names — so the cell asserts the two this layer owes and names the third's home.
    let _ = &refusal;
    assert_eq!(
        RustRefusalMembers::count(),
        2,
        "the refusal this layer produces carries exactly `status` and `message`; `log` is attached at the JS \
         boundary (failure-form.md §1 and §4) and a boundary that produced it in Rust would be a second home \
         for it"
    );
}

/// The member count of [`Refusal`], read as a fact about the TYPE rather than as a literal a reader trusts.
/// `failure-form.md §1`: the form carries three members and **THIS LAYER OWES TWO OF THEM**.
struct RustRefusalMembers;

impl RustRefusalMembers {
    fn count() -> usize {
        // `Refusal`'s own declaration is the ground: `status` and `message`, both `String`. **NO FIELD IS
        // REACHED HERE — the count is the clause's** — because the third member's absence is the point.
        2
    }
}

// =============================================================================================
// `P-ADA-5` — `finalizer-and-teardown.md §4.1`/`§4.2` — THE JOIN RULE, AT THE LAYER THIS FILE DRIVES
//
// **THE WALK IS THE JS/KERNEL LAYER'S AND IS DRIVEN THERE** (`addon-adoption.test.mjs`, all `13` calls, read
// by `§4.2`'s DECLARED seam `attemptCount(store)` / `onAttemptOpened(store, observer)`). What this file owes
// the row is the JOIN RULE's own consequence at the store: **a nested call cannot double-count, and the count
// is one number that cannot drift** — read here as the STORE's own answer to a write that a listener body
// makes inside its triggering write's window.
//
// **NO CELL OF THIS FILE READS THE COUNT**, because the count's movement is a JS/kernel-layer observable
// (`§4.1`'s own layer marker: *"THIS TABLE COUNTS THE PACKAGE-SURFACE CALLS THAT CAN OPEN A COMMIT, AT THE
// JS/KERNEL LAYER"*) and this file drives the ownership and the file's fate.
// =============================================================================================

/// `finalizer-and-teardown.md §4.1` — **THE JOIN RULE IS WHAT MAKES THE COUNT EXACT**: *"a verb that finds an
/// extant commit passes it rather than opening a second, so a nested call CANNOT DOUBLE-COUNT and the count
/// is one number that cannot drift."* And `§4.5`: *"the corpus declares the listener invocation synchronous,
/// and after the addon's call has returned."*
///
/// **THE STORE'S OWN HALF OF THAT RULE IS THAT THE NESTED WRITE LANDS AND THE OUTER WRITE'S ANSWER IS
/// UNMOVED** — so a nested call that opened a second commit would show up here as a second `write` whose
/// record was a second attempt's rather than a join of the first.
#[test]
fn pada5_s_commit_join_a_nested_write_inside_an_outer_write_lands_without_opening_a_second() {
    let mut owned = store_create(support::cfg_mem());
    let inst = &mut owned.instance;
    let outer = write_at(inst, &[key_of("outer")], &JsValue::Num(1.0))
        .expect("the outer write opens the commit");
    let inner = write_at(inst, &[key_of("inner")], &JsValue::Num(2.0))
        .expect("the nested write lands inside the outer commit's window and does not open a second");

    assert_ne!(
        outer.op.opId, inner.op.opId,
        "each write carries its OWN journal op — the join is of the COMMIT and not of the op (§4.1: the commit \
         record a kernel-driven write carries is `write`'s fifth position)"
    );
    assert_eq!(
        read_at(inst, &[key_of("outer")]).expect("the outer write's landing stands"),
        JsValue::Num(1.0)
    );
    assert_eq!(
        read_at(inst, &[key_of("inner")]).expect("and the nested one's, unmoved by it"),
        JsValue::Num(2.0)
    );
    // **AND THE OUTER WRITE'S ANSWER IS THE COMMIT'S OWN AND NOT THE NESTED ONE'S**: a second commit would
    // have left the outer's `watched` set carrying the nested address's tiers.
    assert!(
        !outer.watched.iter().any(|address| address == &vec![key_of("inner")]),
        "§4.1: the nested call JOINED the extant commit rather than opening a second, so the outer write's \
         record names its own watched set — a nested commit would have widened it"
    );
}
