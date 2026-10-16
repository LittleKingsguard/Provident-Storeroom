//! `support` — the red set's shared harness for the sibling crate's Rust tests.
//!
//! **AUTHORED FROM `docs/specs/storeroom-js/**` ALONE** (`contract.md` §4.4's `DD-19`: *"the red set is
//! authored from this contract alone, run and reported BEFORE any implementation"*). Nothing in this file
//! implements the unit; it holds the corpus, the equality relation of `crossing.md §1.5`, the deterministic
//! generator the register layer's drives use, and the assertions the drives share.
//!
//! ---
//!
//! ## THE INTERFACE THIS RED SET PINS, AND THE CONTRACT GAP IT EXPOSES
//!
//! `package.md` §4.1 item 3 and §4.4 (`V1`) declare the sibling crate as **an independent crate at
//! `bindings/js/` with `crate-type = ["cdylib", "rlib"]`** whose **`rlib` half makes the crossing's
//! per-class table drivable in Rust WITHOUT a Node runtime**, and §4.4 names the recommended variant exactly:
//! ***"a thin export facade over a PURE-RUST CONVERSION CORE"*** (`DD-2`). `acceptance.md` §4.1 item 2 says
//! the same: *"the Rust layer runs `cargo test` in `bindings/js/`; the conversion core's per-class table is
//! drivable there, because the crate declares the `rlib` half."*
//!
//! **THE CONTRACT NAMES THE CORE AND ITS PROPERTIES BUT NOT ONE OF ITS RUST NAMES.** No clause of
//! `docs/specs/storeroom-js/**` declares the core's module path, its JS-value model, its conversion
//! functions or its returned-record structs — **and the crossing's own walk rules make a JS-value model
//! unavoidable in Rust**: §1.4 items 1–4 refuse on *"an own property whose key is a `Symbol`"*, on *"an
//! array with a hole"*, on *"an own accessor property"* and on *"a `Proxy`"*, **none of which the store's
//! `StoreValue` can carry**. This is recorded as a CONTRACT FINDING of the authoring pass (`§3.4`/`§4.4`
//! gap: the core's declared Rust surface), and **the names below are this red set's own pinning of it** —
//! the interface the implementer must provide for the red set to be drivable. Every name is derived from
//! the contract's own vocabulary: `crossing` is the part's slug (`crossing.md`), each carrier keeps the
//! store's own name (`crossing.md §1.3`: *"THE CARRIERS ARE THE STORE'S OWN ARGUMENT TYPES … the JS side
//! spells each ONE FOR ONE: no carrier is renamed, merged or omitted"*), and each record keeps the member
//! spellings `DD-39` fixes.
//!
//! **WHAT THE MODEL IS NOT.** It is not a `JSON.stringify` carrier (`DD-6`), it is not a Node-API type
//! (`DD-2`), and it admits **no shared-ownership variant** — no `Rc`, no `Arc`, no raw pointer, no borrow
//! field — **so `§1.1`'s *"no shared ownership either way"* holds by construction of the model itself**.
//! The copy discipline is therefore driven by post-call mutation (`S-COPY-IN`/`S-COPY-OUT`), and the
//! mechanism is stated in each cell's own comment.

#![allow(dead_code, unused_imports)]

pub use storeroom_js_binding::crossing::{
    create, create_with_constraints, from_store_value, to_address_arg, to_config, to_file_path_arg,
    to_journal_length_arg, to_listeners_arg, to_op_id_arg, to_segment, to_tier_arg, to_tier_set_item,
    to_store_value, Instance, JsAddressArg, JsBaseState, JsConfig, JsConstraintEntry, JsConstraintsArg,
    JsDeleteReceipt, JsFilePathArg, JsHandle, JsHandleArg, JsJournalLengthArg, JsJournalOp, JsKey,
    JsListenerEntry, JsListenersArg, JsNonArray, JsObject, JsOpIdArg, JsProto, JsRollbackResult,
    JsSegment, JsTierArg, JsTierSetItem, JsValue, JsWriteResult, Refusal,
};

pub use storeroom_native::{
    storeCreate, storeErrorMessage, AddressArg, BaseState, DeleteReceipt, FilePathArg, JournalLengthArg,
    JournalOp, JournalOpKind, ListenerHandle, ListenersArg, MessageArgs, RollbackResult, Segment, Store,
    StoreConfig, StoreError, StoreValue, Tier, TierArg, WriteResult, CODES,
};

// ---------------------------------------------------------------------------------------------
// `crossing.md §1.5` — THE JS-SIDE EQUALITY RELATION, implemented by the ACCEPTANCE LAYER, not by the
// crate: *"the relation is a property of the PACKAGE's own helper and of this unit's acceptance layer,
// NEVER of the store"* (`crossing.md §1.5`). Three clauses and nothing else:
//   1. member-SET equality for objects (keys compared as a SET, never by insertion order, never by the
//      engine's enumeration order — `DD-9`);
//   2. array INDEX ORDER significant, dense, equal length (`DD-9`);
//   3. `Object.is` where sign or `NaN` matters — so `-0` and `0` are NOT equal (`DD-9`).
// ---------------------------------------------------------------------------------------------
pub fn js_equal(a: &JsValue, b: &JsValue) -> bool {
    match (a, b) {
        (JsValue::Str(x), JsValue::Str(y)) => x == y,
        (JsValue::Bool(x), JsValue::Bool(y)) => x == y,
        // Clause 3: `Object.is`. `NaN` is equal to `NaN` and `-0` is not equal to `0`.
        (JsValue::Num(x), JsValue::Num(y)) => object_is(*x, *y),
        (JsValue::Object(x), JsValue::Object(y)) => {
            if x.members.len() != y.members.len() {
                return false;
            }
            // Clause 1: the key set is compared as a SET. Every member of `x` must be found in `y` by
            // KEY EQUALITY, at whatever position the other side holds it, and its value must be equal.
            for (kx, vx) in &x.members {
                match y.members.iter().find(|(ky, _)| key_eq(kx, ky)) {
                    Some((_, vy)) => {
                        if !js_equal(vx, vy) {
                            return false;
                        }
                    }
                    None => return false,
                }
            }
            true
        }
        // Clause 2: dense, equal length, member-by-index.
        (JsValue::Array(x), JsValue::Array(y)) => {
            x.len() == y.len() && x.iter().zip(y.iter()).all(|(a, b)| js_equal(a, b))
        }
        (JsValue::Null, JsValue::Null) => true,
        (JsValue::Undefined, JsValue::Undefined) => true,
        (JsValue::Function, JsValue::Function) => true,
        (JsValue::Symbol, JsValue::Symbol) => true,
        (JsValue::BigInt(x), JsValue::BigInt(y)) => x == y,
        (JsValue::NonFinite(x), JsValue::NonFinite(y)) => object_is(*x, *y),
        (JsValue::Cyclic, JsValue::Cyclic) => true,
        (JsValue::NonPlainCollection, JsValue::NonPlainCollection) => true,
        (JsValue::SparseArray, JsValue::SparseArray) => true,
        _ => false,
    }
}

/// `crossing.md §1.5` clause 3's `Object.is`, spelled out: `NaN` equals `NaN`, and `0` does NOT equal `-0`.
pub fn object_is(a: f64, b: f64) -> bool {
    if a.is_nan() && b.is_nan() {
        return true;
    }
    if a == 0.0 && b == 0.0 {
        return a.is_sign_negative() == b.is_sign_negative();
    }
    a == b
}

fn key_eq(a: &JsKey, b: &JsKey) -> bool {
    match (a, b) {
        (JsKey::Key(x), JsKey::Key(y)) => x == y,
        (JsKey::Symbol, JsKey::Symbol) => true,
        _ => false,
    }
}

// ---------------------------------------------------------------------------------------------
// `acceptance.md §4.3` — THE ROUND-TRIP CORPUS, exactly as the clause enumerates it and no wider.
// ---------------------------------------------------------------------------------------------
pub fn round_trip_corpus() -> Vec<JsValue> {
    use JsKey::Key;
    use JsValue::*;
    vec![
        // "a string, a boolean, a finite number, an empty object, an empty array, a nested object, a
        // nested array, an object holding an array holding an object, and a value carrying an
        // integer-like key beside a non-integer-like one"
        Str("various JSON".to_string()),
        Str(String::new()),
        Bool(true),
        Bool(false),
        Num(42.0),
        Num(-7.5),
        Num(0.0),
        Object(JsObject::plain(vec![])),
        Array(vec![]),
        Object(JsObject::plain(vec![(Key("a".into()), Num(1.0))])),
        Object(JsObject::plain(vec![(
            Key("n".into()),
            Object(JsObject::plain(vec![(Key("deep".into()), Str("x".into()))])),
        )])),
        Array(vec![Num(1.0), Array(vec![Num(2.0), Num(3.0)])]),
        Object(JsObject::plain(vec![(
            Key("a".into()),
            Array(vec![Object(JsObject::plain(vec![(
                Key("b".into()),
                Str("c".into()),
            )]))]),
        )])),
        // "a value carrying an integer-like key beside a non-integer-like one" (`S-KEYSET`).
        Object(JsObject::plain(vec![
            (Key("2".into()), Str("two".into())),
            (Key("10".into()), Str("ten".into())),
            (Key("b".into()), Str("bee".into())),
            (Key("a".into()), Str("aye".into())),
        ])),
    ]
}

// ---------------------------------------------------------------------------------------------
// The deterministic generator the register layer's drives use: a PINNED SEED, no clock, no entropy
// (`implementation-plan.md` §4 item 8: every row prints its strategy id and its verdict; determinism is
// what makes the printed verdict reproducible).
// ---------------------------------------------------------------------------------------------
pub const REGISTER_SEED: u64 = 0x5EED_2026_1011;
pub const MAX_ATTEMPTS_PER_ROW: usize = 100;
pub const MAX_ATTEMPTS_TOTAL: usize = 400;
pub const STOP_AFTER_FAILURES: usize = 5;

#[derive(Clone, Copy)]
pub struct Rng(u64);

impl Rng {
    pub fn new() -> Rng {
        Rng(REGISTER_SEED)
    }
    /// A per-attempt generator: the SAME pinned seed, offset by the attempt index, so the whole ledgers'
    /// draws are a function of `REGISTER_SEED` and of the attempt number and of nothing else.
    pub fn for_attempt(attempt: usize) -> Rng {
        Rng(REGISTER_SEED ^ (attempt as u64).wrapping_mul(0x9E37_79B9_7F4A_7C15))
    }
    pub fn next_u64(&mut self) -> u64 {
        // SplitMix64 — pure arithmetic, so the sequence is a function of the seed alone.
        self.0 = self.0.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.0;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }
    pub fn below(&mut self, n: usize) -> usize {
        if n == 0 {
            0
        } else {
            (self.next_u64() % (n as u64)) as usize
        }
    }
}

/// The register layer's own accumulator: one row, its strategy lines, its attempts and its verdict.
pub struct Row {
    pub id: &'static str,
    pub strategies: Vec<(&'static str, usize, usize)>, // (strategy id, attempts, failures)
    pub unrun: bool,
}

impl Row {
    pub fn new(id: &'static str) -> Row {
        Row {
            id,
            strategies: Vec::new(),
            unrun: false,
        }
    }
    /// Open a strategy line and run its drive `attempts` times, stopping after `STOP_AFTER_FAILURES`.
    pub fn strategy<F: FnMut(usize) -> bool>(&mut self, id: &'static str, attempts: usize, mut drive: F) {
        assert!(
            attempts <= MAX_ATTEMPTS_PER_ROW,
            "a strategy line may not exceed {MAX_ATTEMPTS_PER_ROW} attempts per row"
        );
        let mut failures = 0usize;
        let mut run = 0usize;
        for attempt in 0..attempts {
            run += 1;
            if !drive(attempt) {
                failures += 1;
                if failures >= STOP_AFTER_FAILURES {
                    break;
                }
            }
        }
        self.strategies.push((id, run, failures));
    }
    pub fn verdict(&self) -> &'static str {
        if self.unrun {
            "un-run"
        } else if self.strategies.iter().all(|(_, _, f)| *f == 0) {
            "HELD"
        } else {
            "BROKEN"
        }
    }
    pub fn attempts(&self) -> usize {
        self.strategies.iter().map(|(_, a, _)| *a).sum()
    }
    /// Print the row the way the store's own register prints its lines, and return its verdict.
    pub fn report(&self) -> &'static str {
        for (id, attempts, failures) in &self.strategies {
            println!(
                "ROW {} strategy={} attempts={} failures={} verdict={}",
                self.id,
                id,
                attempts,
                failures,
                if *failures == 0 { "HELD" } else { "BROKEN" }
            );
        }
        println!(
            "ROW {} attempts={} verdict={}",
            self.id,
            self.attempts(),
            self.verdict()
        );
        self.verdict()
    }
}

/// The ledger of one runner half. **A row that no drive reached reports `un-run`, and `un-run` IS A
/// FAILURE** (`acceptance.md` §4.4's closing paragraph; `implementation-plan.md` §4 item 8).
pub struct Ledger {
    pub rows: Vec<Row>,
}

impl Ledger {
    pub fn new() -> Ledger {
        Ledger { rows: Vec::new() }
    }
    pub fn row(&mut self, id: &'static str) -> &mut Row {
        self.rows.push(Row::new(id));
        self.rows.last_mut().expect("a row was just pushed")
    }
    pub fn settle(&self) -> usize {
        let total: usize = self.rows.iter().map(|r| r.attempts()).sum();
        assert!(
            total <= MAX_ATTEMPTS_TOTAL,
            "the register layer's total attempts may not exceed {MAX_ATTEMPTS_TOTAL}"
        );
        for row in &self.rows {
            let verdict = row.report();
            assert_ne!(
                verdict, "un-run",
                "row {} was never driven: `un-run` is a FAILURE (acceptance.md §4.4)",
                row.id
            );
            assert_eq!(
                verdict, "HELD",
                "row {} is BROKEN: {}",
                row.id,
                row.strategies
                    .iter()
                    .filter(|(_, _, f)| *f > 0)
                    .map(|(id, _, f)| format!("strategy {id} failed {f} time(s)"))
                    .collect::<Vec<_>>()
                    .join("; ")
            );
        }
        total
    }
}

// ---------------------------------------------------------------------------------------------
// Shared assertions. Each states the clause it drives.
// ---------------------------------------------------------------------------------------------

/// `surface.md §2.5` item 3 / `DD-12`: the failure's member set is EXACTLY `{status, message}`, and `status`
/// is a member of the store's closed `15`-member set (`DD-40`: a code the store returned outside the set is
/// passed through VERBATIM; the package MINTS NO CODE).
pub fn assert_refusal_is_the_single_form(failure: &Refusal, expected_status: &str) {
    assert_eq!(
        failure.status, expected_status,
        "the declared answer for this cell is `{expected_status}` (crossing.md §1.2/§1.3)"
    );
    assert!(
        !failure.message.is_empty(),
        "the message is the store's own generated string and is never empty (surface.md §2.5 item 2)"
    );
}

/// `crossing.md §1.2`'s closing clause: every refused row answers the SAME code `ValueNotAdmitted`, *"with
/// its message generated by the store's own generator from the failing target's address"* — so the message
/// is the store's own string and no package-minted prose may replace it.
pub fn assert_value_refusal(failure: &Refusal, address: &[JsSegment]) {
    assert_refusal_is_the_single_form(failure, "ValueNotAdmitted");
    assert!(
        CODES.contains(&failure.status.as_str()),
        "`no package-minted code` — the status must be a member of the store's closed 16-member set \
         (crossing.md §1.6; surface.md §2.5 item 1; §8.1's amended heading, 16 members)"
    );
    let oracle = store_value_refusal_message(address);
    assert_eq!(
        failure.message, oracle,
        "the refusal's message is the store's own generated message at the failing target's address \
         (crossing.md §1.2's closing clause)"
    );
}

/// The store's own `ValueNotAdmitted` message for a plain refused class at `address` — the oracle the
/// binding may not replace with prose of its own. Reached through the STORE's public surface only.
pub fn store_value_refusal_message(address: &[JsSegment]) -> String {
    let segments: Vec<Segment> = address.iter().map(to_segment).collect();
    let mut store = storeCreate(&StoreConfig {
        filePath: FilePathArg::Absent,
        journalLength: JournalLengthArg::Count(2),
        listeners: ListenersArg::List(vec![]),
    })
    .expect("an absent filePath is IN DOMAIN: the register is created at `mem` (crossing.md §1.3)");
    let err = store
        .write(
            AddressArg::List(segments),
            TierArg::Token(Tier::Mem),
            StoreValue::Null,
        )
        .expect_err("the store refuses `Null` with `ValueNotAdmitted`");
    err.message
}

/// `surface.md §2.5` item 1: no code outside the store's closed set may be minted by the package.
pub fn assert_code_is_in_the_closed_set(failure: &Refusal) {
    assert!(
        CODES.contains(&failure.status.as_str()),
        "`{}` is outside the store's closed 16-member set — the package MINTS NO CODE (DD-40; §8.1's \
         amended heading, 16 members)",
        failure.status
    );
}

// ---------------------------------------------------------------------------------------------
// The drives' shared construction helpers. `surface.md §2.1` / `DD-36`: `cfg` carries EXACTLY the store's
// three keys and the package adds no default, no rename and no fourth key.
// ---------------------------------------------------------------------------------------------

pub fn cfg_mem() -> JsConfig {
    JsConfig {
        file_path: None,
        journal_length: Some(JsJournalLengthArg::Count(2)),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    }
}

pub fn cfg_mem_with(listeners: Vec<JsListenerEntry>) -> JsConfig {
    JsConfig {
        file_path: None,
        journal_length: Some(JsJournalLengthArg::Count(2)),
        listeners: Some(JsListenersArg::List(listeners)),
        fourth_key: None,
    }
}

pub fn cfg_at(path: &str, journal_length: u32) -> JsConfig {
    JsConfig {
        file_path: Some(JsFilePathArg::Str(path.to_string())),
        journal_length: Some(JsJournalLengthArg::Count(journal_length)),
        listeners: Some(JsListenersArg::List(vec![])),
        fourth_key: None,
    }
}

// ---------------------------------------------------------------------------------------------
// THE SCRATCH PATH A DRIVE OWNS, AND WHY IT MUST BE UNIQUE PER DRIVE.
//
// **BECAUSE THE TEST HARNESS RUNS THE CELLS OF ONE BINARY CONCURRENTLY, AND A PATH KEYED BY THE PROCESS
// ID IS SHARED BY EVERY CELL OF THAT BINARY.** A `std::process::id()` suffix does NOT distinguish two
// cells of the SAME process — `cargo test` runs them on parallel threads with no `--test-threads=1` — so
// two cells that key a scratch path by the PID alone build, create, replace and REMOVE the SAME file.
// The `FileCommitFailed` drive is the class in the small: it replaces its path with a DIRECTORY and then
// removes it, while a sibling cell that booted over the same path is still holding it, so the sibling's
// next `std::fs::write` meets a directory (or no path at all) and panics. **The cell is green serially and
// green only in a minority of parallel runs** — a drive whose verdict depends on the other drives running
// beside it proves nothing about the contract.
//
// **THE CONSTRUCTION HERE:** the TEST'S OWN NAME (`std::thread::current().name()`, which the Rust test
// harness sets to the `#[test]` function's name) PLUS a process-wide monotonic COUNTER, so two cells of one
// binary can never name the same path even when one cell mints several paths. **AND THE CLEANUP IS
// GUARANTEED BY A GUARD, NOT BY A TRAILING STATEMENT:** the guard's `Drop` removes the file and the
// directory on EVERY exit, so a panicking drive leaves no bytes behind for the next run to meet.
// ---------------------------------------------------------------------------------------------

/// One scratch path this drive OWNS and no other drive of this process can name; the guard cleans up on
/// every exit path, including a panic. **IT REMOVES THE CHILD FIRST AND ITS OWN PARENT DIRECTORY SECOND, in
/// that order:** the drives below delete their own path before the guard runs (a drive that replaced the
/// path with a directory has to, or the file's own removal fails), and removing the parent first would make
/// the guard's own two calls fail on a path that no longer exists — leaving an EMPTY DIRECTORY behind,
/// which is exactly what a "guaranteed cleanup" must not do.
pub struct DrivePath {
    path: std::path::PathBuf,
}

impl Drop for DrivePath {
    fn drop(&mut self) {
        let _ = std::fs::remove_file(&self.path);
        let _ = std::fs::remove_dir_all(&self.path);
        if let Some(dir) = self.path.parent() {
            let _ = std::fs::remove_dir_all(dir);
        }
    }
}

impl DrivePath {
    /// A unique path for `suffix`, named under `dir_name`, itself unique to THIS drive.
    pub fn unique(dir_name: &str, suffix: &str) -> DrivePath {
        use std::sync::atomic::{AtomicUsize, Ordering};
        static SEQ: AtomicUsize = AtomicUsize::new(0);
        let test = std::thread::current()
            .name()
            .unwrap_or("unnamed-cell")
            .to_string();
        let n = SEQ.fetch_add(1, Ordering::SeqCst);
        let dir = std::env::temp_dir().join(format!("{dir_name}-{test}-{n}"));
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).expect("a scratch directory outside the repository");
        DrivePath {
            path: dir.join(suffix),
        }
    }

    pub fn as_str(&self) -> &str {
        self.path.to_str().expect("a UTF-8 scratch path")
    }

    /// This drive's own directory, for a drive whose explicit removal has to take the whole directory.
    pub fn dir(&self) -> &std::path::Path {
        self.path.parent().expect("a scratch path names a file in it")
    }
}

/// A `mem`-tier instance: the declared state an ABSENT `filePath` produces (`crossing.md §1.3`'s
/// `FilePathArg` row 2).
pub fn mem_instance() -> Instance {
    create(&cfg_mem()).expect("an absent filePath is IN DOMAIN and the store IS returned")
}

pub fn write_at(inst: &mut Instance, address: &[JsSegment], value: &JsValue) -> Result<JsWriteResult, Refusal> {
    inst.write(
        &JsAddressArg::List(address.to_vec()),
        &JsTierArg::Token("mem".to_string()),
        value,
    )
}

pub fn read_at(inst: &Instance, address: &[JsSegment]) -> Result<JsValue, Refusal> {
    inst.read(&JsAddressArg::List(address.to_vec()), &JsTierArg::Absent)
}

/// `PAR-JS-8`'s observable and `surface.md §2.7` item 3: **set equality, never a sequence** — *"a drive
/// compares sets, never sequences"* (`DD-22`).
pub fn js_set_equal(a: &[JsHandle], b: &[JsHandle]) -> bool {
    a.len() == b.len() && a.iter().all(|x| b.iter().any(|y| x == y))
}

/// `crossing.md §1.3`'s `AddressArg` row 2/3: a segment is a `string` key or a non-negative integer index.
pub fn key(s: &str) -> JsSegment {
    JsSegment::Key(s.to_string())
}

pub fn idx(i: u64) -> JsSegment {
    JsSegment::Index(i)
}

pub fn handle(token: &str) -> JsListenerEntry {
    JsListenerEntry::Entry {
        address: JsAddressArg::List(vec![key("a")]),
        handle: token.to_string(),
    }
}

/// `crossing.md §1.3`'s `TierArg` row 1: the three tokens and no fourth (`docs/specs/storeroom-native/
/// contract.md §5.1`'s closed three-member set).
pub fn tier(t: &str) -> Tier {
    match t {
        "file" => Tier::File,
        "mem" => Tier::Mem,
        "temp" => Tier::Temp,
        other => panic!("`{other}` is not one of the three tier tokens"),
    }
}

/// A listener entry at an arbitrary address, for the construction and handle drives.
pub fn listener_at(address: Vec<JsSegment>, token: &str) -> JsListenerEntry {
    JsListenerEntry::Entry {
        address: JsAddressArg::List(address),
        handle: token.to_string(),
    }
}

/// The store's own `StoreValue` spelling of the corpus value, for the accepted rows: *"every accepted
/// JS-shaped input → the store value it must produce"* (`crossing.md §1.2`).
pub fn store_str(s: &str) -> StoreValue {
    StoreValue::Str(s.to_string())
}


/// `surface.md §2.9` item 2 / `P-IM-3`'s `S-FAILSET`: **all `16` fail codes remain reachable from the
/// crossing** — *"the walk's `9` address codes on the address verbs, the value taxonomy's
/// `ValueNotAdmitted`, the two construction members, `JournalOpUnknown`, `RollbackCompacted`,
/// `ReadTargetIsBranch` and `ContainerKindConflict` — and no code is left without a JS-reachable
/// trigger."* Each drive below reaches its code THROUGH the crossing's own surface (never through the
/// store's Rust API directly) and returns whether the declared code was the one produced.
///
/// **⟶ THE FIGURE MOVES TO `16` 2026-10-15 (`DEF-2026-10-15-Y`).** The amendment adds the FOURTH key's own
/// member to the set (`§8.1`'s amended heading: `11 + 2 + 1 + 1 + 1 = 16` ✓; the key's semantics are
/// `parameter-semantics.md §2.21`'s, added the same date), **so the sweep's own sentence — *"all `15` fail
/// codes remain reachable from the crossing"* — was a figure the amendment had already replaced**, and the
/// sixteenth member's drive joins the match below.
pub fn fail_code_drive(code: &'static str) -> bool {
    let produced = |r: Result<(), Refusal>| r.err().map(|e| e.status);
    match code {
        "AddressMalformed" => {
            let inst = mem_instance();
            produced(
                inst.read(&JsAddressArg::Absent, &JsTierArg::Absent)
                    .map(|_| ()),
            ) == Some("AddressMalformed".to_string())
        }
        "AddressNotFound" => {
            let inst = mem_instance();
            produced(
                inst.read(&JsAddressArg::List(vec![key("nope")]), &JsTierArg::Absent)
                    .map(|_| ()),
            ) == Some("AddressNotFound".to_string())
        }
        "LeafHasNoDownstream" => {
            let mut inst = mem_instance();
            write_at(&mut inst, &[key("leaf")], &JsValue::Str("v".into())).expect("a leaf");
            produced(
                inst.read(
                    &JsAddressArg::List(vec![key("leaf"), key("child")]),
                    &JsTierArg::Absent,
                )
                .map(|_| ()),
            ) == Some("LeafHasNoDownstream".to_string())
        }
        "TierNotFound" => {
            let mut inst = mem_instance();
            write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("a mem-tier write");
            produced(
                inst.read(
                    &JsAddressArg::List(vec![key("a")]),
                    &JsTierArg::Token("file".to_string()),
                )
                .map(|_| ()),
            ) == Some("TierNotFound".to_string())
        }
        "OutOfDomainTier" => {
            let inst = mem_instance();
            produced(
                inst.read(
                    &JsAddressArg::List(vec![]),
                    &JsTierArg::Token("secure".to_string()),
                )
                .map(|_| ()),
            ) == Some("OutOfDomainTier".to_string())
        }
        "ParentAnchorMonotonicityViolation" => {
            let mut inst = mem_instance();
            inst.write(
                &JsAddressArg::List(vec![key("a")]),
                &JsTierArg::Token("temp".to_string()),
                &JsValue::Object(JsObject::plain(vec![])),
            )
            .expect("a temp-tier map at the parent");
            produced(
                inst.write(
                    &JsAddressArg::List(vec![key("a"), key("b")]),
                    &JsTierArg::Token("file".to_string()),
                    &JsValue::Num(1.0),
                )
                .map(|_| ()),
            ) == Some("ParentAnchorMonotonicityViolation".to_string())
        }
        "ContainerKindConflict" => {
            let mut inst = mem_instance();
            write_at(
                &mut inst,
                &[key("m")],
                &JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))])),
            )
            .expect("a map target");
            produced(write_at(&mut inst, &[key("m")], &JsValue::Array(vec![])).map(|_| ()))
                == Some("ContainerKindConflict".to_string())
        }
        "ReadTargetIsBranch" => {
            let mut inst = mem_instance();
            write_at(
                &mut inst,
                &[key("a")],
                &JsValue::Object(JsObject::plain(vec![(JsKey::Key("k".into()), JsValue::Num(1.0))])),
            )
            .expect("a branch");
            produced(
                inst.read_literal(&JsAddressArg::List(vec![key("a")]), &JsTierArg::Absent)
                    .map(|_| ()),
            ) == Some("ReadTargetIsBranch".to_string())
        }
        "WriteParentNotLink" => {
            let mut inst = mem_instance();
            produced(write_at(&mut inst, &[], &JsValue::Num(1.0)).map(|_| ()))
                == Some("WriteParentNotLink".to_string())
        }
        "JournalOpUnknown" => {
            let mut inst = mem_instance();
            produced(
                inst.rollback(&JsOpIdArg::Str("op-not-in-the-journal".to_string()))
                    .map(|_| ()),
            ) == Some("JournalOpUnknown".to_string())
        }
        "RollbackCompacted" => {
            // `DD-42`-class compaction: a one-entry journal rolls the earliest op out of the journal, so its
            // id is well shaped and no longer resolvable.
            let cfg = JsConfig {
                file_path: None,
                journal_length: Some(JsJournalLengthArg::Count(1)),
                listeners: Some(JsListenersArg::List(vec![])),
                fourth_key: None,
            };
            let mut inst = create(&cfg).expect("a one-entry journal");
            let first = write_at(&mut inst, &[key("a")], &JsValue::Num(1.0)).expect("first op");
            write_at(&mut inst, &[key("b")], &JsValue::Num(2.0)).expect("second op");
            write_at(&mut inst, &[key("c")], &JsValue::Num(3.0)).expect("third op");
            produced(inst.rollback(&JsOpIdArg::Str(first.op.opId.clone())).map(|_| ()))
                == Some("RollbackCompacted".to_string())
        }
        "ConstructionArgumentMissing" => {
            let cfg = JsConfig {
                file_path: None,
                journal_length: None,
                listeners: Some(JsListenersArg::List(vec![])),
                fourth_key: None,
            };
            produced(create(&cfg).map(|_| ())) == Some("ConstructionArgumentMissing".to_string())
        }
        "FilePathUnreachable" => {
            let path = std::env::temp_dir()
                .join("storeroom-js-redset-no-such-parent-fail-code")
                .join("file.json");
            produced(create(&cfg_at(path.to_str().unwrap(), 2)).map(|_| ()))
                == Some("FilePathUnreachable".to_string())
        }
        "ValueNotAdmitted" => {
            let mut inst = mem_instance();
            produced(write_at(&mut inst, &[key("a")], &JsValue::Null).map(|_| ()))
                == Some("ValueNotAdmitted".to_string())
        }
        "FileCommitFailed" => {
            // **THE PATH IS THIS DRIVE'S OWN** (`DrivePath`'s header: the cells of one binary run on
            // parallel threads, so a PID-keyed path is shared by every one of them and the drive's verdict
            // would depend on them). **AND THIS DRIVE IS THE ONE THAT MUTILATES THE PATH ON PURPOSE** — it
            // replaces the file with a DIRECTORY to make the `file` commit unable to land — so a shared
            // path is exactly the state that makes it flake.
            let scratch = DrivePath::unique("storeroom-js-redset-commit-fails", "store.json");
            let path = std::path::PathBuf::from(scratch.as_str());
            std::fs::write(&path, b"{}").expect("a scratch file whose parent exists and is writable");
            let cfg = cfg_at(scratch.as_str(), 8);
            let mut inst = match create(&cfg) {
                Ok(inst) => inst,
                Err(_) => return false,
            };
            write_at(&mut inst, &[key("ok")], &JsValue::Num(1.0)).expect("a mem-tier write");
            // The trigger is the REAL one (`§7.2` items 2–4): the path is replaced by a directory after the
            // instance exists, so the `file`-tier commit cannot land.
            let _ = std::fs::remove_file(&path);
            std::fs::create_dir(&path).expect("the path now holds a directory");
            // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11`
            // clause 2): THE FAILURE IS THE TERMINAL ARM'S ACT'S AND NOT THE VERB'S.** The verb *"performs
            // NO FILE I/O ON ANY OF ITS ARMS"*, so it returns its `WriteResult` here and no refusal is read
            // off it; **the act is the store's `commit_file`, keyed by THE SETTLED RECORD'S OWN `op`, and
            // that is where this member is reached.** The crossing exposes it as `Instance::commit_file`
            // (`bindings/js/src/crossing.rs`, the package's `commitFile` step).
            let got = match inst.write(
                &JsAddressArg::List(vec![key("never")]),
                &JsTierArg::Token("file".to_string()),
                &JsValue::Num(2.0),
            ) {
                Err(e) => Some(e.status),
                Ok(w) => inst
                    .commit_file(&w.op.opId)
                    .err()
                    .map(|e| e.status),
            };
            // The guard's `Drop` removes the child path and its directory on every exit path; the explicit
            // removal below takes the whole directory now, so the ordinary path leaves nothing behind.
            let _ = std::fs::remove_dir_all(scratch.dir());
            got == Some("FileCommitFailed".to_string())
        }
        // **⟶ ADDED 2026-10-15 (`DEF-2026-10-15-Y`; `§8.1` #16; `§7.1` step 4-bis;
        // `parameter-semantics.md §2.21`): THE SIXTEENTH MEMBER'S OWN TRIGGER.** It is reached THROUGH THE
        // CROSSING'S OWN SURFACE — `create_with_constraints` is the `constraints` carrier's own crossing
        // (`storeCreateWithConstraints`), and `JsConstraintEntry::Invalid` is the element outside
        // `{ address, id }` pre-spelled at the boundary — **and at the CONSTRUCTION's instant, which is the
        // key's own instant.** **`filePath` IS ABSENT**, because `§7.1`'s amended table makes an absent path
        // LEGAL (`A49`) and this drive must reach the FOURTH key's arm and no other: a reachability failure
        // would answer `FilePathUnreachable` (`§8.1` #13) and the drive would pass for the wrong member.
        "ConstraintListInvalid" => {
            let cfg = cfg_mem();
            let constraints = JsConstraintsArg::List(vec![JsConstraintEntry::Invalid("'a'".to_string())]);
            match create_with_constraints(&cfg, Some(&constraints)) {
                Err(e) => e.status == "ConstraintListInvalid",
                Ok(_) => false,
            }
        }
        other => panic!("`{other}` is not a member of the store's closed 16-member set"),
    }
}

/// The closed set itself, printed with its terms: `16` members, and this unit mints no seventeenth.
///
/// **⟶ WIDENED 2026-10-15 (`DEF-2026-10-15-Y`): the as-filed *"`15` members, and this unit mints no
/// sixteenth"* printed a superseded figure.** The figure is `CODES.len()`'s and not this comment's, and the
/// crate's own array is the implementation's to widen (`§8.1`'s amended heading; `§7.2` item 5 ADDED
/// 2026-10-15; `parameter-semantics.md §2.21`). **THE SWEEP'S ASSERTION IS NOT WEAKENED BY THE WIDENING: it
/// is `all_fail_codes().len() == 16` and every member must still have a reachable trigger**
/// (`surface_verbs.rs`'s `fail_set_is_closed_at_sixteen_and_no_drive_produces_a_seventeenth`).
pub fn all_fail_codes() -> Vec<&'static str> {
    CODES.to_vec()
}

#[cfg(test)]
mod tests {
    use super::*;

    /// The harness's own self-check: the relation it implements is the one `crossing.md §1.5` declares.
    #[test]
    fn support_relation_is_the_declared_relation() {
        assert!(js_equal(&JsValue::Num(-0.0), &JsValue::Num(0.0)) == false);
        assert!(js_equal(&JsValue::Num(f64::NAN), &JsValue::Num(f64::NAN)));
        assert!(js_equal(
            &JsValue::Object(JsObject::plain(vec![
                (JsKey::Key("b".into()), JsValue::Num(1.0)),
                (JsKey::Key("a".into()), JsValue::Num(2.0)),
            ])),
            &JsValue::Object(JsObject::plain(vec![
                (JsKey::Key("a".into()), JsValue::Num(2.0)),
                (JsKey::Key("b".into()), JsValue::Num(1.0)),
            ])),
        ));
        assert!(!js_equal(
            &JsValue::Array(vec![JsValue::Num(1.0), JsValue::Num(2.0)]),
            &JsValue::Array(vec![JsValue::Num(2.0), JsValue::Num(1.0)]),
        ));
    }
}
