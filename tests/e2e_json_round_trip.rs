//! `tests/e2e_json_round_trip.rs` — **THE END-TO-END JSON ROUND-TRIP BATTERY** for `U-STOREROOM-NATIVE`.
//!
//! **THE ARCHITECT'S DIRECTIVE THIS BATTERY DISCHARGES, VERBATIM:** *"Run e2e test battery, passing in
//! various JSON to write and comparing to the read output. Expect exact match in all cases."* Every case
//! below is a **write → read → compare** drive over one JSON value, and **every comparison is an EXACT
//! comparison** under the relation stated next.
//!
//! # THE EQUALITY RELATION THIS BATTERY USES, AND THE CLAUSE THAT FIXES IT
//!
//! **THE RELATION IS `StoreValue`'s OWN STRUCTURAL EQUALITY — same variant, same members, same member
//! values, and INDEX ORDER for arrays — and nothing weaker.** Its ground is the contract's own three
//! clauses:
//!
//! * **the value carrier** is `§0.4`'s declared Rust spelling
//!   `StoreValue::{Str(BTreeMap-free String), Bool(bool), Num(f64), Object(BTreeMap<String, StoreValue>),
//!   Array(Vec<StoreValue>)}` — `§1.4`'s admitted four classes and no others;
//! * **the predicate** is `§5.2`'s row `P-IM-1`, property *"`read(a, t)` after `write(a, t, v)` returns a
//!   value **structurally equal to `v`**"*, whose strategy id is `S-RT` and whose own words are *"byte-equal
//!   after a JSON round trip"*;
//! * **the ONE normalization `P-IM-1` itself declares** is stated in the same row's `What FAILS it` cell:
//!   *"an object's key order counted as significant"* FAILS the row — so **an OBJECT's member ORDER is not
//!   part of the value's identity** (`§1.3`: *"the store declares **no order** over a `MAP`'s children"*),
//!   while **an ARRAY's index order IS** (`§4.2` `R-3`: *"index order, element `i` …"*). `Object`'s declared
//!   spelling is a `BTreeMap` (`§0.4`), so the normalized half is carried by the type and the battery
//!   asserts the declared CONSEQUENCE — the members and their values — rather than an order the carrier
//!   does not have.
//! * **⟶ THE SECOND NORMALIZATION THIS BATTERY NOW CARRIES — THE `file` TIER'S CANONICAL NUMBER SPELLING,
//!   DECLARED BY THE ARCHITECT'S NUMERIC RULING `A59`** (*"Normalize into file"*, transcribed verbatim with
//!   its `A59` consequences at `docs/specs/storeroom-listeners-proposal.md` `§21`): **a number is NORMALIZED
//!   ON THE WAY INTO THE `file` TIER'S JSON TEXT — `-0` is written as `0`, and the other non-canonical
//!   spellings a JSON literal may take (`1e2`, `1.0`, `1E+2`) are written in their canonical form — WHILE IN
//!   MEMORY (`mem`/`temp`) THE SIGN AND THE SPELLING ARE UNTOUCHED**, because the normalization is a property
//!   of the FILE's IMAGE and not of the value the store holds. **`A59` (c) therefore re-scopes `§5.2`
//!   `P-IM-1`'s *"byte-equal after a JSON round trip"* half to the CANONICAL spelling and not to the
//!   caller's literal.** **So EVERY `file`-tier case below is EXACT-MODULO THE TWO DECLARED NORMALIZATIONS —
//!   object member order (`§5.2` `P-IM-1` + `§1.3`) and the file image's canonical number spelling (`A59` +
//!   `§7.2` item 1 `M-12`)** — and the cells that drive the numeric one are
//!   `e2e_boot_neg_zero_sign_is_declared_nowhere` and the `num.spelling.*` cells (both in section 11).
//!   **THE CLAUSES `A59` OWES HAD NOT LANDED IN THE CONTRACT AT THIS BATTERY'S RUN** (`contract.md`,
//!   `store-model.md`, `write-and-read.md` and `seams-and-lifecycle.md` name no canonical number spelling):
//!   the cells therefore cite **`A59`'s own two halves** and say so in each of their comments.
//!
//! **THE THREE COMPARISON CLASSES EVERY CASE BELOW IS LABELLED WITH, so a reader sees exactly which cases
//! are exact and which are contract-normalized:**
//!
//! * **`Exact`** — the value carries no object with `≥ 2` members, so no declared normalization is in play:
//!   `read(write(a,t,v), t) == v` **byte-exact** at the declared carrier.
//! * **`ExactOrder`** — the value carries an object with `≥ 2` members: **exact-modulo the ONE
//!   normalization `§5.2 P-IM-1` declares (object member order, `§1.3`)**. Nothing else is relaxed: the
//!   member SET, each member's value, the array lengths and the array index order are all asserted exact.
//! * **`Refused(code)`** — the contract declares the class REFUSED, so no round trip exists to compare and
//!   the battery **asserts the declared CODE and the zero residue `§3.5` guarantees** (`§1.4`'s outside
//!   classes → `ValueNotAdmitted`; a `VEC` index outside the contiguous range → `ContainerKindConflict`,
//!   `DD-43`; a tier outside `§5.1`'s domain → `OutOfDomainTier`; a segment outside `§1.5` item 1
//!   → `AddressMalformed`).
//!
//! **NO ASSERTION IN THIS FILE IS WEAKENED TO MAKE A CASE PASS.** A case that comes back different is
//! reported, not adjusted: **a precision loss, a key-order change, an empty-container change or an
//! added/removed member is a FINDING.**
//!
//! # THE JSON CARRIER — STATED SO NO CASE IS READ AS PASSING IN SOME OTHER FORM
//!
//! **THE JSON TEXT IS NOT ON THIS CRATE'S SURFACE, SO THE BATTERY'S JSON VALUES ARE CARRIED BY
//! `StoreValue`.** `§0.4` closes the declared Rust surface item by item and declares no JSON-text
//! entry point; `§1.4`'s admitted classes ARE a JSON value's classes (a string, a boolean, a finite JSON
//! number, a JSON object, a JSON array), and `§7.2`'s `M-12` JSON image is the `file` tier's own bytes —
//! written by a commit and read back by the boot, never handed to a caller as text. Every value below is
//! therefore built as `StoreValue` and driven through `write`/`read`, and the `file`-tier cases add the one
//! route that does cross a JSON TEXT: **commit → fresh `storeCreate` at the same `cfg.filePath` → read**
//! (`§7.2` item 6, the declared boot). **The consequences of that carrier are reported as CONTRACT
//! FINDINGS and are not worked around: see `e2e_carrier_integral_above_2_pow_53_has_no_exact_carrier`,
//! `e2e_boot_neg_zero_sign_is_declared_nowhere`, and the battery's record in
//! `archive/gate3/storeroom-native-red-set.md`.**
//!
//! # THE STATES ENUMERATED FOR THIS BATTERY (the corpus, one comment per group)
//!
//! 1. **admitted primitives** — a string (plain · empty · unicode/emoji · combining + RTL marks ·
//!    escapes/quotes/backslashes/newlines/NUL/control chars · very long ASCII · very long unicode) and a
//!    boolean (`true` · `false`);
//! 2. **numbers** (`§1.4` class 3, *"a finite JSON number"*) — `0` · `-0` · `±1` · small `±`ints · `2^53` ·
//!    `2^53+2` · `i64::MAX as f64` · `2^63` · `0.1` · `1/3` · `1.5` · `pi` · `1e2` · `1e21` · `1e300` ·
//!    `1e-300` · `5e-324` · `f64::MAX` · a 30-digit integral magnitude — **⟶ AND, ADDED FOR `A59`/`A60`:
//!    `2^53+4` and the NEGATIVE out-of-bounds neighbours `-(2^53)`, `-(2^53+2)`, `-(2^53+4)` · the
//!    out-of-bounds literal `2^53+1` and its negative at the ONE exact carrier it can reach the store
//!    through (`BigInt(i64)`) · and the caller-literal SPELLINGS `1e2`, `1.0`, `1E+2` (`§21`'s rulings)**;
//! 3. **empty containers** — `{}` and `[]` at a key, nested in each other, and read at the register
//!    (`§4.2`'s closing clause + `DD-1`: the two empty forms are DISTINCT);
//! 4. **structure** — objects nested to depth 8 · arrays of length 0/1/2/3/8/100 · arrays of objects ·
//!    objects with array members · a mix at depth · a wide object (50 keys) · a stress tree of `≥ 100`
//!    nodes;
//! 5. **keys** — the empty key `""` · numeric-LOOKING keys (`"0"`, `"00"`, `"1"`, `"1.5"`) set against real
//!    indices · unicode keys · keys differing only by case · a 1000-char key · a key carrying dots and
//!    slashes · a key that is the same as a sibling's at ANOTHER TIER;
//! 6. **tiers** — the write's own tier read qualified and unqualified · the same key at two tiers read
//!    qualified and unqualified (the SHADOW) · a write at the same tier (the purge arm) · a less-persistent
//!    write over a more-persistent version (the purge chain) · the register's CONDITIONAL tier and its
//!    REAL bound · an any-match tier SET · `L-TIER` at the addressed step · `DD-31`'s assembly OMISSION;
//! 7. **refusals** — every class `§1.4` puts outside the taxonomy · a `VEC` write outside the contiguous
//!    range · a tier outside the domain · a malformed address · a kind contradiction in both directions ·
//!    the empty-address write · a leaf parent · a leaf in mid-walk;
//! 8. **re-write fidelity** — write A, read it, write that read-back value at a FRESH address, read again,
//!    all three equal.

mod support;
use support::*;

use storeroom_native::{AddressArg, Segment, StoreError, StoreValue, Tier, TierArg};

/// A long key, leaked to `'static` so a `Case`'s address can carry it (the battery is a test binary).
fn long_key(n: usize) -> &'static str {
    Box::leak("k".repeat(n).into_boxed_str())
}

/// A `'static` member key, for the depth-built structures below.
fn static_member_key(i: usize) -> &'static str {
    Box::leak(format!("d{i}").into_boxed_str())
}

/// `depth` nested objects, `{"d1": {"d2": … {"d<depth>": leaf} … }}` — `§4.2` `R-2`'s recursion, written
/// once so the nesting's own delimiters are not counted by hand.
fn nest_obj(depth: usize, leaf: StoreValue) -> StoreValue {
    let mut v = leaf;
    for i in (1..=depth).rev() {
        v = v_obj(&[(static_member_key(i), v)]);
    }
    v
}

/// `depth` nested one-element arrays — `§4.2` `R-3`'s recursion.
fn nest_arr(depth: usize, leaf: StoreValue) -> StoreValue {
    let mut v = leaf;
    for _ in 0..depth {
        v = v_arr(vec![v]);
    }
    v
}

// ---------------------------------------------------------------------------------------------------
// The drive engine — one closed case, one write → read → compare.
// ---------------------------------------------------------------------------------------------------

/// The comparison class of a case. See the file header: `Exact` and `ExactOrder` (the one normalization
/// `§5.2 P-IM-1` declares) are the two round-trip classes; a refusal is driven by `refusal_case!`.
#[derive(Clone, Copy, PartialEq, Eq)]
enum Rel {
    Exact,
    ExactOrder,
}

impl Rel {
    fn label(self) -> &'static str {
        match self {
            Rel::Exact => "EXACT",
            Rel::ExactOrder => "EXACT-MODULO-MEMBER-ORDER (§5.2 P-IM-1)",
        }
    }
}

/// One corpus entry: an address, a write tier, the JSON value written, and the comparison class.
struct Case {
    name: &'static str,
    address: Vec<Segment>,
    tier: Tier,
    value: StoreValue,
    rel: Rel,
    clause: &'static str,
}

/// `§3.2`'s parent rule: a write at a multi-segment address needs its ancestors to exist, so a case whose
/// address is deeper than one segment first installs an EMPTY OBJECT at each ancestor (`{}` = `DD-1`'s
/// empty `MAP`, and `§3.4`'s per-slot kind consequence (i) admits the write below it). Only key-shaped
/// ancestors are set up this way; a `VEC` in mid-address has its own dedicated cases.
fn install_ancestors(store: &mut Store, address: &[Segment], tier: Tier, name: &str) {
    for i in 1..address.len() {
        assert!(
            matches!(address[i - 1], Segment::Key(_)),
            "{name}: the drive's ancestor setup is key-shaped; a VEC in mid-address is driven by its own case"
        );
        let parent = address[..i].to_vec();
        ok(
            store.write(AddressArg::List(parent), t(tier), v_obj(&[])),
            "§3.2/DD-1: the ancestor is installed as an empty MAP",
        );
    }
}

/// The battery's ONE round-trip drive. It asserts, in order:
///
/// 1. **the write succeeds** (`§3.4`: the case's value is inside `§1.4`, its tier inside `§5.1`, its
///    address inside `§1.5`);
/// 2. **the TIER-QUALIFIED read at the write's own tier returns the value, EX ACTLY** (`§4.1`/`§4.2`;
///    `§5.2 P-IM-1`; `§5.4` (a)'s own observable `findAddress(address, t).anchor.tier == t`);
/// 3. **the UNQUALIFIED read returns the same value** (`§2.3`'s zero-tier arm; `§4.1`);
/// 4. **the read at the EMPTY address carries the same value under the case's top-level key**
///    (`§1.5` item 4 + `§4.1`'s register row + `§4.2` `R-5`) — the same JSON value observed through the
///    whole-registry route;
/// 5. **a second read returns it again** — reads never mutate the store (`§4.1`'s copy discipline).
///
/// The comparison is `StoreValue`'s structural equality in every case; the case's `Rel` labels whether the
/// one declared normalization (object member order) is in play.
fn drive(case: &Case) {
    let mut store = new_store();
    install_ancestors(&mut store, &case.address, case.tier, case.name);
    ok(
        store.write(
            AddressArg::List(case.address.clone()),
            t(case.tier),
            case.value.clone(),
        ),
        "§3.4: the write succeeds — the value is admitted, the tier is in the domain, the parent resolves",
    );

    // (2) the write's OWN tier — §5.2 P-IM-1's primary drive, §5.4 (a)'s observable beside it.
    let same = ok(
        store.read(AddressArg::List(case.address.clone()), t(case.tier)),
        "§4.1: the read at the write's own tier resolves",
    );
    assert_eq!(
        same, case.value,
        "case `{}` ({}): §5.2 P-IM-1 — read(a, t) after write(a, t, v) is structurally equal to v, \
         at a tier inside the write's own [{}]",
        case.name,
        case.rel.label(),
        case.clause
    );
    let reference = ok(
        store.findAddress(AddressArg::List(case.address.clone()), t(case.tier)),
        "§2.1: findAddress returns the reference",
    );
    assert_eq!(
        reference.anchor.tier,
        case.tier,
        "case `{}`: §5.4 (a) — findAddress(address, t).anchor.tier == t [{}]",
        case.name,
        case.clause
    );

    // (3) the UNQUALIFIED read — §2.3's zero-tier arm.
    let unqualified = read_at(&store, &case.address);
    assert_eq!(
        unqualified, case.value,
        "case `{}` ({}): §2.3's zero-tier arm + §5.2 P-IM-1 — the unqualified read returns the same \
         value [{}]",
        case.name,
        case.rel.label(),
        case.clause
    );

    // (4) the register route — §4.1's register row / §4.2 R-5, for a one-segment key address.
    if case.address.len() == 1 {
        if let Segment::Key(k) = &case.address[0] {
            let whole = read_at(&store, &empty_address());
            match &whole {
                StoreValue::Object(members) => {
                    let got = members.get(k).unwrap_or_else(|| {
                        panic!(
                            "case `{}`: §4.1/§4.2 R-5 — a read at the empty address answers an object \
                             containing the ENTIRE registry; the key '{k}' is absent from it",
                            case.name
                        )
                    });
                    assert_eq!(
                        got, &case.value,
                        "case `{}`: §4.2 R-5 — the register's own read carries the same value at '{k}' [{}]",
                        case.name, case.clause
                    );
                }
                other => panic!(
                    "case `{}`: §4.2 R-5 — the empty address answers an object containing the whole \
                     registry; got {other:?}",
                    case.name
                ),
            }
        }
    }

    // (5) idempotence — §4.1's copy discipline: a read never mutates the store.
    let again = read_at(&store, &case.address);
    assert_eq!(
        again, case.value,
        "case `{}`: §4.1's copy discipline — a second read answers the same value [{}]",
        case.name, case.clause
    );
}

macro_rules! rt_case {
    ($(#[$attr:meta])* $name:ident, $label:expr, $addr:expr, $tier:expr, $value:expr, $rel:expr, $clause:expr) => {
        // **THE CELL'S OWN ATTRIBUTES, FORWARDED ONTO THE CELL IT GENERATES — `$(#[$attr])*`.** A cell whose
        // LITERAL is the subject of its own assertion can carry a TARGETED `#[allow(...)]` at its invocation
        // (see `e2e_num_pi` below); a cell that forwards none expands to byte-for-byte what it expanded to
        // before this arm's attribute slot existed, and NO cell forwards more than the one lint it does not
        // obey. **THE RUSTC FACT THIS SLOT EXISTS FOR, MEASURED RATHER THAN ASSUMED:** an attribute written
        // directly ON an item-position `macro_rules!` INVOCATION is IGNORED — rustc prints
        // *"the built-in attribute `allow` will be ignored, since it's applied to the macro invocation"*
        // (`unused_attributes`) and the lint fires anyway, because the lint level governing an expanded
        // literal is the level of the generated item's scope. **So the attribute must TRAVEL THROUGH the macro
        // to land on the cell; there is no crate-level, module-level or macro-level allow here, and the
        // matcher's `*` admits zero attributes so every existing cell is untouched.**
        $(#[$attr])*
        #[test]
        fn $name() {
            drive(&Case {
                name: $label,
                address: $addr,
                tier: $tier,
                value: $value,
                rel: $rel,
                clause: $clause,
            });
        }
    };
}

/// A refusal drive: the write must fail with the DECLARED code, and the store must hold ZERO residue —
/// no node, no anchor, no version, no journal entry (`§3.4`'s fail-closed arms' one guarantee; `§3.5`;
/// `DD-4`, `DD-19`). The observable asserted is `§3.5`'s own: the store's state after the failure is
/// identical to its state before it.
fn refuse(name: &str, write: impl FnOnce(&mut Store) -> Result<WriteResult, StoreError>, code: &str, clause: &str) {
    let mut store = new_store();
    let before = read_at(&store, &empty_address());
    assert_eq!(
        before,
        v_obj(&[]),
        "case `{name}`: the register is empty before the refused write"
    );
    let e = failure(write(&mut store), clause);
    assert_code(&e, code, clause);
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[]),
        "case `{name}`: §3.5 — a failed write leaves ZERO residue; the register is unchanged [{clause}]"
    );
}

macro_rules! refuse_case {
    ($name:ident, $label:expr, $addr:expr, $tier:expr, $value:expr, $code:expr, $clause:expr) => {
        #[test]
        fn $name() {
            let address = $addr;
            refuse(
                $label,
                move |store: &mut Store| {
                    store.write(AddressArg::List(address), $tier, $value)
                },
                $code,
                $clause,
            );
        }
    };
}

// ===================================================================================================
// 1. THE ADMITTED PRIMITIVES — §1.4 classes 1 and 2.
// ===================================================================================================

// `§1.4` class 1, `§4.1`'s leaf row, `§4.2` R-1: a string is a leaf's value, returned verbatim.
rt_case!(
    e2e_str_plain,
    "str.plain",
    key(&["v"]),
    Tier::Mem,
    v_str("hello, world"),
    Rel::Exact,
    "§1.4 class 1; §4.1 leaf row; §4.2 R-1"
);
rt_case!(
    e2e_str_empty,
    "str.empty",
    key(&["v"]),
    Tier::Mem,
    v_str(""),
    Rel::Exact,
    "§1.4 class 1; §1.5 item 1's empty-string legality"
);
rt_case!(
    e2e_str_unicode_emoji,
    "str.unicode+emoji",
    key(&["v"]),
    Tier::Mem,
    v_str("héllo — 世界 🎉 Ω≈ç√∫˜µ ÀÉÎÕÜ"),
    Rel::Exact,
    "§1.4 class 1; §5.2 P-IM-1"
);
rt_case!(
    e2e_str_combining_and_rtl,
    "str.combining+RTL",
    key(&["v"]),
    Tier::Mem,
    v_str("e\u{0301} أهلاً \u{202E}reversed\u{202C} \u{200B}zero-width"),
    Rel::Exact,
    "§1.4 class 1; §5.2 P-IM-1"
);
rt_case!(
    e2e_str_escapes_quotes_backslashes_newlines,
    "str.escapes/quotes/backslashes/newlines/NUL",
    key(&["v"]),
    Tier::Mem,
    v_str("\"double\" 'single' \\back\\ \nnewline\ttab\rcr \u{0000}NUL \u{001F}us \u{007F}del / slash"),
    Rel::Exact,
    "§1.4 class 1; §2.5's no-escape-collapse reading: the value is the exact character sequence"
);
rt_case!(
    e2e_str_very_long_ascii,
    "str.very-long (100_000 chars)",
    key(&["v"]),
    Tier::Mem,
    {
        let mut s = "x".repeat(100_000);
        s.push_str("__END__");
        v_str(&s)
    },
    Rel::Exact,
    "§1.4 class 1; §5.2 P-IM-1 — no truncation is admitted"
);
rt_case!(
    e2e_str_very_long_unicode,
    "str.very-long-unicode (20_000 x 'é')",
    key(&["v"]),
    Tier::Mem,
    v_str(&"é".repeat(20_000)),
    Rel::Exact,
    "§1.4 class 1; §5.2 P-IM-1 — no multi-byte truncation is admitted"
);
rt_case!(
    e2e_bool_true,
    "bool.true",
    key(&["v"]),
    Tier::Mem,
    v_bool(true),
    Rel::Exact,
    "§1.4 class 2; §4.1 leaf row"
);
rt_case!(
    e2e_bool_false,
    "bool.false",
    key(&["v"]),
    Tier::Mem,
    v_bool(false),
    Rel::Exact,
    "§1.4 class 2; §4.1 leaf row"
);

// ===================================================================================================
// 2. THE NUMBERS — §1.4 class 3, "a finite JSON number (integral or fractional)".
//
// **THE CARRIER IS `Num(f64)` (`§0.4`).** **⟶ AMENDED 2026-10-11 BY THE ARCHITECT'S NUMERIC RULING (`A59`,
// `docs/specs/storeroom-listeners-proposal.md` `§21`, VERBATIM: *"Normalize into file"*): THE `file` TIER'S
// JSON TEXT NOW CARRIES A DECLARED CANONICAL NUMBER SPELLING, so this section's as-filed sentence — *"the
// contract declares NO canonical spelling for a number"* — is SUPERSEDED for the `file` tier's bytes and
// stands, byte-for-byte, for everything it did not reach (the `mem`/`temp` tiers, where the spelling is
// untouched).** **Every case below is still driven as a VALUE (`§5.2` `P-IM-1`'s declared predicate, `f64`
// structural equality), which is where they remain exact; the SPELLING is asserted at the `file` tier's own
// bytes in section 11 (`num.spelling.*` and the re-derived `-0` cell).**
// ===================================================================================================

rt_case!(e2e_num_zero, "num.0", key(&["v"]), Tier::Mem, v_num(0.0), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_neg_zero, "num.-0", key(&["v"]), Tier::Mem, v_num(-0.0), Rel::Exact,
    "§1.4 class 3 — exact under f64 equality (-0.0 == 0.0); NO canonical number spelling is declared");
rt_case!(e2e_num_one, "num.1", key(&["v"]), Tier::Mem, v_num(1.0), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_neg_one, "num.-1", key(&["v"]), Tier::Mem, v_num(-1.0), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_small_int, "num.42", key(&["v"]), Tier::Mem, v_num(42.0), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_neg_int, "num.-42", key(&["v"]), Tier::Mem, v_num(-42.0), Rel::Exact, "§1.4 class 3");
rt_case!(
    e2e_num_2_pow_53,
    "num.2^53 (9007199254740992)",
    key(&["v"]),
    Tier::Mem,
    v_num(9007199254740992.0),
    Rel::Exact,
    "§1.4 class 3 — the largest integral magnitude f64 carries with a unit ulp"
);
rt_case!(
    e2e_num_2_pow_53_plus_2,
    "num.2^53+2 (9007199254740994)",
    key(&["v"]),
    Tier::Mem,
    v_num(9007199254740994.0),
    Rel::Exact,
    "§1.4 class 3 — the next representable integral magnitude ABOVE 2^53"
);
rt_case!(
    e2e_num_i64_max_as_f64,
    "num.i64::MAX as f64",
    key(&["v"]),
    Tier::Mem,
    v_num(i64::MAX as f64),
    Rel::Exact,
    "§1.4 class 3 — the value written is the carrier's own value (§0.4 Num(f64))"
);
rt_case!(
    e2e_num_2_pow_63,
    "num.2^63 (9223372036854775808)",
    key(&["v"]),
    Tier::Mem,
    v_num(9223372036854775808.0),
    Rel::Exact,
    "§1.4 class 3"
);
rt_case!(e2e_num_one_tenth, "num.0.1", key(&["v"]), Tier::Mem, v_num(0.1), Rel::Exact,
    "§1.4 class 3 — a repeating binary expansion");
rt_case!(e2e_num_one_third, "num.1/3", key(&["v"]), Tier::Mem, v_num(1.0 / 3.0), Rel::Exact,
    "§1.4 class 3 — a repeating binary expansion");
// **WHY THIS CELL CARRIES A TARGETED `#[allow(clippy::approx_constant)]`, AND WHY THE LINT IS DELIBERATELY NOT
// OBEYED.** **THE LITERAL IS THE SUBJECT OF THE ASSERTION.** This cell's input IS `3.141592653589793` — `§1.4`
// class 3's finite fractional number, the same shape as `num.1/3` beside it — and what the cell drives is that
// the `f64` carrying π's EXACT binary value is written, read back at the write's own tier, read unqualified and
// read again through the register route, all STRUCTURALLY EQUAL to the value written (`§5.2 P-IM-1`, strategy
// `S-RT`; `§4.1`'s leaf row; `§4.2` `R-1`/`R-5`). **The literal's SPELLING is what the value is entered by, and
// `A59`'s declared normalization is a statement about a spelling — so the literal must be SPELLED HERE.**
// **`clippy::approx_constant` asks for `std::f64::consts::PI`, and obeying it would replace the subject of the
// assertion with a reference to a constant: the cell would stop asserting anything about a float the battery
// itself spells.** The value, the assertion, the label and the cell's NAME are all UNCHANGED; the lint is
// silenced ON THIS CELL ALONE, through `rt_case!`'s attribute slot (rustc ignores an attribute written on the
// invocation itself — see that macro's definition above), with NO crate-level or module-level allow anywhere.
rt_case!(
    #[allow(clippy::approx_constant)]
    e2e_num_pi,
    "num.pi",
    key(&["v"]),
    Tier::Mem,
    v_num(3.141592653589793),
    Rel::Exact,
    "§1.4 class 3"
);
rt_case!(e2e_num_three_halves, "num.1.5", key(&["v"]), Tier::Mem, v_num(1.5), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_exponent_1e2, "num.1e2", key(&["v"]), Tier::Mem, v_num(1e2), Rel::Exact,
    "§1.4 class 3 — the exponent FORM is a spelling, not a value: 1e2 IS 100.0 in the declared carrier");
rt_case!(e2e_num_exponent_1e21, "num.1e21", key(&["v"]), Tier::Mem, v_num(1e21), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_1e300, "num.1e300", key(&["v"]), Tier::Mem, v_num(1e300), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_1e_minus_300, "num.1e-300", key(&["v"]), Tier::Mem, v_num(1e-300), Rel::Exact, "§1.4 class 3");
rt_case!(e2e_num_min_subnormal, "num.5e-324", key(&["v"]), Tier::Mem, v_num(5e-324), Rel::Exact,
    "§1.4 class 3 — the smallest positive subnormal");
rt_case!(e2e_num_f64_max, "num.f64::MAX", key(&["v"]), Tier::Mem, v_num(f64::MAX), Rel::Exact,
    "§1.4 class 3 — finite, so admitted; ±Infinity is NOT (§1.4's outside list)");
rt_case!(
    e2e_num_30_digit_magnitude,
    "num.123456789012345678901234567890",
    key(&["v"]),
    Tier::Mem,
    v_num(123456789012345678901234567890.0),
    Rel::Exact,
    "§1.4 class 3 — the value written is the carrier's rounded one"
);

// ===================================================================================================
// 3. THE EMPTY CONTAINERS — `§4.2`'s closing clause and `DD-1`: `MAP` with 0 anchors reads `{}` and
// `VEC` with 0 anchors reads `[]`, and **the two empty forms are DISTINCT**.
// ===================================================================================================

rt_case!(e2e_empty_object, "empty.{ }", key(&["v"]), Tier::Mem, v_obj(&[]), Rel::Exact,
    "§1.4 class 4; §4.2's closing clause; DD-1");
rt_case!(e2e_empty_array, "empty.[ ]", key(&["v"]), Tier::Mem, v_arr(vec![]), Rel::Exact,
    "§1.4 class 4; §4.2's closing clause; DD-1");

// `DD-1`'s DECLARED FORM, asserted as a FORM and not only as an equality: the read at the empty object's
// key is an OBJECT with 0 members and NOT the array form, and the read at the empty array's key is an
// ARRAY with 0 elements and NOT the object form. **This is the one place `DD-1`'s `what it REFUSES` cell is
// directly assertable: *"a `branch` that reports the other container's empty form"*.**
#[test]
fn e2e_dd_1_the_two_empty_forms_are_distinct() {
    // §4.2's closing clause + DD-1 — a MAP with 0 child anchors reads {} and never [].
    let mut obj_store = new_store();
    ok(
        obj_store.write(AddressArg::List(key(&["v"])), w_mem(), v_obj(&[])),
        "§3.4 W-4: a write of {} mints a branch whose container is a MAP",
    );
    match read_at(&obj_store, &key(&["v"])) {
        StoreValue::Object(m) => assert!(
            m.is_empty(),
            "DD-1: a write of {{}} mints a MAP with 0 child anchors, so the read is the empty object"
        ),
        other => panic!("DD-1: a read at a written {{}} is the empty OBJECT; got {other:?} — the other container's form"),
    }

    // §4.2's closing clause + DD-1 — a VEC with 0 child anchors reads [] and never {}.
    let mut arr_store = new_store();
    ok(
        arr_store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![])),
        "§3.4 W-4: a write of [] mints a branch whose container is a VEC",
    );
    match read_at(&arr_store, &key(&["v"])) {
        StoreValue::Array(a) => assert!(
            a.is_empty(),
            "DD-1: a write of [] mints a VEC with 0 child anchors, so the read is the empty array"
        ),
        other => panic!("DD-1: a read at a written [] is the empty ARRAY; got {other:?} — the other container's form"),
    }

    // And the two are NOT equal as values — the distinctness `DD-1` exists to keep (A22's read-inference).
    assert_ne!(
        v_obj(&[]),
        v_arr(vec![]),
        "DD-1: the two empty forms are DISTINCT — this is what makes A22's read-inference observable"
    );
}

// DD-1 + §4.2 R-2/R-3 — the empty forms NESTED in each other, each round-tripped exactly.
rt_case!(e2e_empty_object_in_object, "empty.{ } in { }", key(&["v"]), Tier::Mem,
    v_obj(&[("a", v_obj(&[]))]), Rel::Exact, "§4.2 R-2; DD-1");
rt_case!(e2e_empty_array_in_array, "empty.[ ] in [ ]", key(&["v"]), Tier::Mem,
    v_arr(vec![v_arr(vec![])]), Rel::Exact, "§4.2 R-3; DD-1");
rt_case!(e2e_empty_object_at_array_slot, "empty.{ } at array slot 0", key(&["v"]), Tier::Mem,
    v_arr(vec![v_obj(&[]), v_num(0.0)]), Rel::Exact, "§4.2 R-3; DD-1");
rt_case!(e2e_empty_array_at_object_member, "empty.[ ] at object member", key(&["v"]), Tier::Mem,
    v_obj(&[("a", v_arr(vec![]))]), Rel::Exact, "§4.2 R-2; DD-1");
rt_case!(
    e2e_empty_container_at_grandchild,
    "empty.{ } and [ ] at depth 3",
    key(&["v"]),
    Tier::Mem,
    v_obj(&[("a", v_obj(&[("b", v_obj(&[("c", v_arr(vec![]))]))]))]),
    Rel::Exact,
    "§4.2's recursion; DD-1"
);

// ===================================================================================================
// 4. THE STRUCTURE — nesting, array lengths, arrays of objects, objects with array members, a mix.
// ===================================================================================================

rt_case!(e2e_object_depth_1, "object depth 1", key(&["v"]), Tier::Mem,
    v_obj(&[("a", v_num(1.0))]), Rel::Exact, "§4.2 R-2");
rt_case!(e2e_object_depth_2, "object depth 2", key(&["v"]), Tier::Mem,
    v_obj(&[("a", v_obj(&[("b", v_num(2.0))]))]), Rel::Exact, "§4.2 R-2");
rt_case!(e2e_object_depth_3, "object depth 3", key(&["v"]), Tier::Mem,
    v_obj(&[("a", v_obj(&[("b", v_obj(&[("c", v_num(3.0))]))]))]), Rel::Exact, "§4.2 R-2");
rt_case!(e2e_object_depth_8, "object depth 8", key(&["v"]), Tier::Mem,
    nest_obj(8, v_str("bottom")), Rel::Exact, "§4.2 R-2's recursion, eight levels deep");
rt_case!(e2e_array_depth_8, "array depth 8", key(&["v"]), Tier::Mem,
    nest_arr(8, v_str("bottom")), Rel::Exact, "§4.2 R-3's recursion, eight levels deep");
rt_case!(e2e_array_len_1, "array len 1", key(&["v"]), Tier::Mem, v_arr(vec![v_num(0.0)]), Rel::Exact, "§4.2 R-3");
rt_case!(e2e_array_len_2, "array len 2", key(&["v"]), Tier::Mem,
    v_arr(vec![v_num(0.0), v_num(1.0)]), Rel::Exact, "§4.2 R-3 — dense from 0, order significant");
rt_case!(e2e_array_len_3_mixed, "array len 3 (mixed)", key(&["v"]), Tier::Mem,
    v_arr(vec![v_str("a"), v_bool(true), v_num(3.0)]), Rel::Exact, "§4.2 R-3");
rt_case!(e2e_array_len_8, "array len 8", key(&["v"]), Tier::Mem,
    v_arr((0..8).map(|i| v_num(i as f64)).collect()), Rel::Exact, "§4.2 R-3 — order significant");
rt_case!(e2e_array_len_100, "array len 100", key(&["v"]), Tier::Mem,
    v_arr((0..100).map(|i| v_num(i as f64)).collect()), Rel::Exact, "§4.2 R-3 — dense from 0, length is the contiguous index count");
rt_case!(e2e_array_of_objects, "array of objects", key(&["v"]), Tier::Mem,
    v_arr(vec![
        v_obj(&[("a", v_num(1.0)), ("b", v_str("x"))]),
        v_obj(&[("a", v_num(2.0)), ("b", v_str("y"))]),
    ]),
    Rel::ExactOrder, "§4.2 R-3 over R-2; §5.2 P-IM-1's member-order normalization is the only relaxation");
rt_case!(e2e_object_with_array_members, "object with array members", key(&["v"]), Tier::Mem,
    v_obj(&[
        ("xs", v_arr(vec![v_num(1.0), v_num(2.0), v_num(3.0)])),
        ("ys", v_arr(vec![])),
        ("zs", v_arr(vec![v_str("only")])),
    ]),
    Rel::ExactOrder, "§4.2 R-2 over R-3");
rt_case!(e2e_mix_at_depth, "mixed object/array/scalar at depth", key(&["v"]), Tier::Mem,
    v_obj(&[
        ("a", v_arr(vec![
            v_obj(&[("b", v_arr(vec![v_bool(false), v_str("deep"), v_obj(&[])])),
                    ("c", v_num(-7.5))]),
            v_str("tail"),
            nest_arr(2, v_obj(&[])),
        ])),
        ("d", nest_obj(2, v_num(0.0))),
    ]),
    Rel::ExactOrder, "§4.2 R-1/R-2/R-3 at once; DD-1's two empty forms inside the mix");
rt_case!(e2e_wide_object_50_keys, "object with 50 keys", key(&["v"]), Tier::Mem,
    v_obj(&(0..50).map(|i| {
        let k: &'static str = Box::leak(format!("k{i:02}").into_boxed_str());
        (k, v_num(i as f64))
    }).collect::<Vec<_>>()),
    Rel::ExactOrder, "§4.2 R-2 — one member per key; §1.3 declares no MAP order");

// The same value through a DEEPER address — §3.2's parent rule plus §4.1's leaf row.
rt_case!(e2e_nested_address_3_segments, "value at a 3-segment address", vec![
        Segment::Key("a".into()), Segment::Key("b".into()), Segment::Key("c".into())],
    Tier::Mem, v_str("deep"), Rel::Exact, "§3.2 item 1; §4.2 R-1");

// ===================================================================================================
// 5. THE KEYS — the empty key, numeric-looking keys against real indices, unicode, case, length.
// ===================================================================================================

rt_case!(e2e_key_empty_string, "key ''", key(&[""]), Tier::Mem, v_str("at the empty key"), Rel::Exact,
    "§1.5 item 1: '' is a legal string segment and a legal key");

// §1.5 items 2–3's NO-COERCION rule, driven as a value: a MAP whose keys LOOK like indices and a VEC
// whose indices are the numbers the strings name — the two never meet.
#[test]
fn e2e_numeric_looking_keys_never_coerce_to_indices() {
    let mut store = new_store();
    // the map: string keys '0', '00', '1', '1.5'
    let map = v_obj(&[
        ("0", v_str("string zero")),
        ("00", v_str("string double-zero")),
        ("1", v_str("string one")),
        ("1.5", v_str("string one-and-a-half")),
    ]);
    ok(store.write(AddressArg::List(key(&["m"])), w_mem(), map.clone()), "§1.4 class 4");
    // the vector: indices 0, 1, 2
    let vecv = v_arr(vec![v_str("index zero"), v_str("index one"), v_str("index two")]);
    ok(store.write(AddressArg::List(key(&["v"])), w_mem(), vecv.clone()), "§1.4 class 4");

    assert_eq!(read_at(&store, &key(&["m"])), map, "§5.2 P-IM-1: the map round-trips");
    assert_eq!(read_at(&store, &key(&["v"])), vecv, "§5.2 P-IM-1: the vector round-trips");

    // §1.5 item 3: a string segment resolves against a MAP — '0' is the STRING key.
    assert_eq!(
        read_at(&store, &key(&["m", "0"])),
        v_str("string zero"),
        "§1.5 item 2: '0' is a string key; the store never coerces it into 0"
    );
    // §1.5 item 2/§2.2: an integer segment resolves against a VEC — index 0 is the FIRST element.
    assert_eq!(
        read_at(&store, &vec![Segment::Key("v".into()), idx(0)]),
        v_str("index zero"),
        "§1.5 item 2: 0 is an index; the store never coerces it into '0'"
    );
    // §1.5 item 3 + §2.2 L-3: a string segment resolves NOWHERE against a VEC — a READ answers
    // AddressNotFound (only a WRITE's answer differs, and that is driven below at F-4).
    let e = failure(
        store.read(
            AddressArg::List(vec![Segment::Key("v".into()), Segment::Key("0".into())]),
            t(Tier::Mem),
        ),
        "§1.5 item 3",
    );
    assert_code(&e, "AddressNotFound", "§1.5 item 3: a string segment resolves nowhere against a VEC");
    // …and an integer segment aimed at the register: §2.2 L-INT-REG.
    let e = failure(
        store.read(AddressArg::List(vec![idx(0)]), t(Tier::Mem)),
        "§2.2 L-INT-REG",
    );
    assert_code(&e, "AddressNotFound", "§2.2 L-INT-REG: the register holds no index semantics");

    // The two containers' key domains are DISJOINT as values: the map carries the STRING keys, the
    // vector carries the indices — the round trip keeps both, which is what forbids a coercion.
    match read_at(&store, &key(&["m"])) {
        StoreValue::Object(m) => {
            assert_eq!(
                m.len(),
                4,
                "§4.2 R-2: the four string keys are four members, none of them collapsed into an index"
            );
            for k in ["0", "00", "1", "1.5"] {
                assert!(m.contains_key(k), "§1.5 item 2: the STRING key '{k}' survives the round trip");
            }
        }
        other => panic!("§4.2 R-2: a written {{}} reads as an object; got {other:?}"),
    }
}

rt_case!(e2e_key_unicode, "key '日本語 🎉 ñ'", key(&["日本語 🎉 ñ"]), Tier::Mem, v_num(1.0), Rel::Exact,
    "§1.5 item 1: any string is a legal key");
rt_case!(e2e_key_with_dots_and_slashes, "key 'a/b.c[0]'", key(&["a/b.c[0]"]), Tier::Mem, v_str("dotted"), Rel::Exact,
    "§1.5: an address is an ARRAY of segments (DD-24(d)), so a key carrying '.', '/' or '[' is addressable");
rt_case!(e2e_key_long_1000, "key of 1_000 chars", key(&[long_key(1_000)]),
    Tier::Mem, v_num(7.0), Rel::Exact, "§1.5 item 1");

// §1.3's MAP key domain: keys differing ONLY by case are distinct members — the member set is exact and
// the ORDER is the one normalization §5.2 P-IM-1 declares.
#[test]
fn e2e_keys_differing_only_by_case_are_distinct_members() {
    let mut store = new_store();
    let value = v_obj(&[
        ("Key", v_str("upper")),
        ("key", v_str("lower")),
        ("KEY", v_str("upper-upper")),
    ]);
    ok(store.write(AddressArg::List(key(&["v"])), w_mem(), value.clone()), "§1.4 class 4");
    let back = read_at(&store, &key(&["v"]));
    assert_eq!(
        back, value,
        "§1.3/§4.2 R-2: the three case-variant keys are three distinct members \
         (exact-modulo the member ORDER alone, §5.2 P-IM-1)"
    );
    assert_eq!(read_at(&store, &key(&["v", "Key"])), v_str("upper"), "§4.2 R-2: the member at 'Key'");
    assert_eq!(read_at(&store, &key(&["v", "key"])), v_str("lower"), "§4.2 R-2: the member at 'key'");
    assert_eq!(read_at(&store, &key(&["v", "KEY"])), v_str("upper-upper"), "§4.2 R-2: the member at 'KEY'");
}

// ===================================================================================================
// 6. THE TIERS — the write's own tier, the shadow, the purge chain, the register's conditional tier,
//    the any-match set, the addressed step's L-TIER, and DD-31's assembly OMISSION.
// ===================================================================================================

// §5.2 P-IM-1 at a tier the register can carry, read qualified and unqualified (the two reads every
// `drive` case performs) — plus the file and temp tiers below.
rt_case!(e2e_tier_file_write_read, "file tier", key(&["v"]), Tier::File, v_str("durable"), Rel::Exact,
    "§5.1 rank(file)=2; §5.2 P-IM-1; §5.4 (a)");
rt_case!(e2e_tier_temp_write_read, "temp tier", key(&["v"]), Tier::Temp, v_str("trial"), Rel::Exact,
    "§5.1 rank(temp)=0; §5.2 P-IM-1; §5.4 (a)");
rt_case!(e2e_tier_mem_write_read, "mem tier", key(&["v"]), Tier::Mem, v_str("session"), Rel::Exact,
    "§5.1 rank(mem)=1; §5.2 P-IM-1; §5.4 (a)");

// **THE SAME VALUE WRITTEN AT TWO TIERS — THE SHADOW RULE.** Write `file` first, then `mem` at the SAME
// key: `§3.4 W-5` adds the `mem` version ALONGSIDE, the `file` version SURVIVES, and **the shadow wins the
// unqualified read** (`§5.4` (c): the unqualified read answers the LOWER-persistence one).
#[test]
fn e2e_shadow_same_value_at_two_tiers_read_qualified_and_unqualified() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_str("trial")), "§3.4 W-5");

    assert_eq!(read_tier(&store, &key(&["k"]), Tier::File), v_str("durable"),
        "§3.4 W-5: the more persistent version SURVIVES the shadowing write");
    assert_eq!(read_tier(&store, &key(&["k"]), Tier::Mem), v_str("trial"),
        "§4.1/§2.3: the passed tier reads its own version");
    assert_eq!(read_at(&store, &key(&["k"])), v_str("trial"),
        "§5.4 (c): the UNQUALIFIED read answers the LOWER-persistence version — the shadow wins");
    assert_eq!(
        versions_at(&store, &key(&["k"])),
        vec![Tier::File, Tier::Mem],
        "§1.3's (key, tier) pair rule: two versions of one key are two anchors, one per tier"
    );
}

// The mirrored direction: `temp` written first, then `mem`. Both stand; the unqualified read answers temp.
#[test]
fn e2e_shadow_temp_over_mem() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_str("mem-version")), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["k"])), w_temp(), v_str("temp-version")), "§3.4 W-5");
    assert_eq!(read_at(&store, &key(&["k"])), v_str("temp-version"),
        "§5.4 (c): temp (rank 0) is the lowest-persistence version, so it answers the unqualified read");
    assert_eq!(read_tier(&store, &key(&["k"]), Tier::Mem), v_str("mem-version"),
        "§3.4 W-5: the mem version survives the temp shadow");
    // §5.3's monotonic clause: temp ≤ mem ≤ file holds over the pair that stands.
    assert_monotonic(Tier::Temp, Tier::Mem, "§1.2: the child anchor (temp) does not outrank its parent (mem)");
}

// **THE PURGE CHAIN** — `§5.4 W-6`: a write at a MORE persistent tier purges every version at
// `rank ≤ rank(write tier)`. After `mem` then `file`, NO `mem` version stands any more.
#[test]
fn e2e_write_at_a_more_persistent_tier_purges_the_lower_versions() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_str("trial")), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")), "§3.4 W-6");
    assert_eq!(read_at(&store, &key(&["k"])), v_str("durable"), "§4.1: the file version is the target");
    assert_eq!(read_tier(&store, &key(&["k"]), Tier::File), v_str("durable"), "§4.1");
    assert_eq!(
        versions_at(&store, &key(&["k"])),
        vec![Tier::File],
        "§3.5 item 4: no read after the write observes a version at rank ≤ rank(write tier) other than \
         the one this write installed — the mem version is PURGED (§3.4 W-6; P: §12 A19)"
    );
    assert_tier_not_found(&store, &key(&["k"]), Tier::Mem,
        "§2.2 L-TIER: the key exists and no version at mem remains");
}

// **A WRITE AT THE SAME TIER IS THE PURGE ARM, NOT A SHADOW** (`§3.4 W-1`; `DD-8`, `DD-11`): the version
// count does not grow, and an idempotent re-write is a SUCCESS.
#[test]
fn e2e_write_at_the_same_tier_replaces_and_the_count_does_not_grow() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_num(1.0)), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_num(2.0)), "§3.4 W-1/DD-8");
    assert_eq!(read_at(&store, &key(&["k"])), v_num(2.0), "§3.4 W-1: the pair is purged then minted");
    assert_eq!(versions_at(&store, &key(&["k"])), vec![Tier::Mem],
        "DD-8: the equal-tier write is the purge arm — the version count does not grow");
    // And writing the SAME value again is a success, never a PairOccupied refusal (DD-11).
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_num(2.0)), "DD-11");
    assert_eq!(read_at(&store, &key(&["k"])), v_num(2.0), "§5.2 P-IM-1");
}

// **THE REGISTER'S OWN CONDITIONAL TIER, FIXED AT CREATION** (`store-model.md §1.6` item 4 (d); `§1.6`'s
// amended bound): `file` where the construction's path is provided and passes the reachability test, `mem`
// otherwise — and the empty address answers THAT tier whatever `t` the caller passed.
#[test]
fn e2e_register_tier_is_conditional_and_fixed_at_creation() {
    // the path-provided construction: the register's tier is file
    let file_store = new_store();
    for tier in canonical_tiers() {
        let r = ok(
            file_store.findAddress(AddressArg::List(empty_address()), t(tier)),
            "§2.1: the empty address resolves to the register",
        );
        assert_eq!(
            r.anchor.tier,
            Tier::File,
            "§1.6 item 4 (d): the register's tier is file where the path is provided and reachable, and \
             the caller's t is not asserted into the answer"
        );
        assert!(r.anchor.register_marker, "DD-44: register_marker is TRUE on the register's own reference");
    }
    // the pathless construction: the register's tier is mem
    let mem_store = new_mem_store();
    let r = ok(
        mem_store.findAddress(AddressArg::List(empty_address()), t(Tier::Temp)),
        "§2.1: the empty address resolves to the register",
    );
    assert_eq!(r.anchor.tier, Tier::Mem, "§1.6 item 4 (d): A49 — an absent filePath creates the register at mem");
    assert!(r.anchor.register_marker, "DD-44");
}

// **THE REGISTER'S BOUND IS REAL** (`store-model.md §1.6` item 4 (d)(ii); `A51`; `§3.4 F-6`): with a `mem`
// register the `file` tier is UNREACHABLE at register keys, and the refusal is
// `ParentAnchorMonotonicityViolation` — nothing installed.
#[test]
fn e2e_mem_register_refuses_a_file_tier_write_at_a_register_key() {
    let mut store = new_mem_store();
    let e = failure(
        store.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")),
        "§3.4 F-6 / store-model.md §1.6 item 4 (d)(ii)",
    );
    assert_code(&e, "ParentAnchorMonotonicityViolation",
        "A51: a write whose minted anchor would outrank the register's own mem anchor (rank 2 > 1)");
    assert_eq!(read_at(&store, &empty_address()), v_obj(&[]), "§3.5: nothing is installed");
    // and the mem tier IS reachable there — the bound is a bound and not a blanket refusal
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_str("trial")), "§1.6 item 4 (d)(ii)");
    assert_eq!(read_at(&store, &key(&["k"])), v_str("trial"), "§5.2 P-IM-1");
}

// **THE ANY-MATCH SET** (`§4.1`, `§2.3`): one or more tiers passed reads ANY node whose tier is in the
// set, and where a key holds more than one PASSED tier the same lowest-persistence rule answers over the
// matched subset.
#[test]
fn e2e_read_with_a_tier_set_is_an_any_match_set() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["k"])), w_mem(), v_str("trial")), "§3.4 W-5");

    assert_eq!(ok(store.read(AddressArg::List(key(&["k"])), set(&[Tier::File, Tier::Mem])),
        "§2.3"), v_str("trial"),
        "§2.3: the set is an any-match set; over the matched subset the lowest-persistence member answers");
    assert_eq!(ok(store.read(AddressArg::List(key(&["k"])), set(&[Tier::File])), "§2.3"),
        v_str("durable"), "§2.3: a one-member set reads that tier's version alone");
    assert_eq!(ok(store.read(AddressArg::List(key(&["k"])), set(&[Tier::Mem, Tier::Temp])), "§2.3"),
        v_str("trial"), "§2.3: the members that hold no version contribute nothing to the set");
    assert_eq!(read_tier(&store, &key(&["k"]), Tier::File), v_str("durable"),
        "§3.4 W-5: the file version survived every read in this drive");
    // §3.1.1's row for a READ: the 0-token set is the zero-tier arm — the unqualified read.
    assert_eq!(ok(store.read(AddressArg::List(key(&["k"])), set_empty()), "§3.1.1"),
        v_str("trial"), "§3.1.1: a 0-token set on read is the lowest-persistence arm");
}

// **`L-TIER` AT THE ADDRESSED STEP** (`§2.2` `L-TIER`; `D D-12`): the key exists and the passed tier holds
// no version — `TierNotFound`, and NOT `AddressNotFound`.
#[test]
fn e2e_addressed_step_with_no_passed_version_fails_tier_not_found() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["k"])), w_file(), v_str("durable")), "§3.4 W-3");
    assert_tier_not_found(&store, &key(&["k"]), Tier::Mem,
        "§2.2 L-TIER: the key exists at file and no mem version stands — DD-12");
    assert_tier_not_found(&store, &key(&["k"]), Tier::Temp,
        "§2.2 L-TIER: same state at the third tier");
    let missing = failure(store.read(AddressArg::List(key(&["nope"])), t(Tier::Mem)), "§2.2 L-3");
    assert_code(&missing, "AddressNotFound", "§2.2 L-3: no anchor at the key at all — NOT TierNotFound");
}

// **`DD-31`'s ASSEMBLY OMISSION** (`§4.2`'s reconciliation (b); `DD-31`; `§2.2`'s scope clause): the passed
// set governs WHICH VERSION EACH ADDRESS ANSWERS and never WHETHER THE READ SUCCEEDS — a descendant key
// whose anchors lie at NO passed tier contributes NO member, the read SUCCEEDS, and the empty object
// `DD-1` declares answers where nothing is left to assemble.
#[test]
fn e2e_dd_31_a_member_outside_the_passed_set_is_omitted_and_the_read_succeeds() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["g"])), w_file(), v_obj(&[])), "§3.4 W-4: a file-tier MAP");
    ok(store.write(AddressArg::List(key(&["g", "c"])), w_temp(), v_str("trial")),
        "§3.4 W-4: the child stands at temp ALONE (the parent g is file, so temp ≤ file holds)");
    assert_eq!(read_at(&store, &key(&["g", "c"])), v_str("trial"), "§5.2 P-IM-1 at the child");
    assert_eq!(read_tier(&store, &key(&["g"]), Tier::File), v_obj(&[]),
        "§4.2's reconciliation (b) + DD-31: the addressed node g IS at file (the read succeeds), and the \
         child c — whose anchors lie at temp alone — contributes NO member, so the assembled MAP is the \
         empty object DD-1 declares. It is NOT TierNotFound (the assembly's steps are not walk steps).");
    assert_eq!(read_at(&store, &key(&["g"])),
        v_obj(&[("c", v_str("trial"))]),
        "§2.3's zero-tier arm at every address: unqualified, the child IS assembled");
    assert_tier_not_found(&store, &key(&["g"]), Tier::Temp,
        "§2.2 L-TIER at the ADDRESSED step: g holds no temp version, and the addressed step does fail");
}

// ===================================================================================================
// 7. THE REFUSALS — §1.4's outside classes, the VEC's range rule (DD-43), the tier domain, the address
//    grammar, and the kind rule in both directions.
// ===================================================================================================

// §1.4's outside classes, each a write-time ValueNotAdmitted with no node minted (F-2).
refuse_case!(e2e_refuse_null, "value.null", key(&["v"]), w_mem(), v_null(),
    "ValueNotAdmitted", "§1.4's outside list: null; §3.4 F-2");
refuse_case!(e2e_refuse_undefined, "value.undefined", key(&["v"]), w_mem(), v_undefined(),
    "ValueNotAdmitted", "§1.4's outside list: undefined; §3.4 F-2");
refuse_case!(e2e_refuse_function, "value.function", key(&["v"]), w_mem(), v_function(),
    "ValueNotAdmitted", "§1.4's outside list: a function; §3.4 F-2");
refuse_case!(e2e_refuse_symbol, "value.symbol", key(&["v"]), w_mem(), v_symbol(),
    "ValueNotAdmitted", "§1.4's outside list: a symbol; §3.4 F-2");
refuse_case!(e2e_refuse_bigint, "value.BigInt", key(&["v"]), w_mem(), v_bigint(),
    "ValueNotAdmitted", "§1.4's outside list: a BigInt; §3.4 F-2");
refuse_case!(e2e_refuse_nan, "value.NaN", key(&["v"]), w_mem(), v_nan(),
    "ValueNotAdmitted", "§1.4's outside list: a non-finite number; §3.4 F-2");
refuse_case!(e2e_refuse_infinity, "value.+Infinity", key(&["v"]), w_mem(), v_infinity(),
    "ValueNotAdmitted", "§1.4's outside list: a non-finite number; §3.4 F-2");
refuse_case!(e2e_refuse_neg_infinity, "value.-Infinity", key(&["v"]), w_mem(), v_neg_infinity(),
    "ValueNotAdmitted", "§1.4's outside list: a non-finite number; §3.4 F-2");
refuse_case!(e2e_refuse_cyclic, "value.cyclic", key(&["v"]), w_mem(), v_cyclic(),
    "ValueNotAdmitted", "§1.4's outside list: a cyclic object; §3.4 F-2");
refuse_case!(e2e_refuse_non_plain_collection, "value.Map/Set/typed-array", key(&["v"]), w_mem(), v_non_plain_collection(),
    "ValueNotAdmitted", "§1.4's outside list: a class instance or any non-plain collection; §3.4 F-2");
// A null NESTED in an admitted object is no more admitted at the member than at the top (§1.4's closure
// over the four classes; §3.4 F-2): the assembled read has no image for it.
refuse_case!(e2e_refuse_null_nested_in_object, "value.{a:null}", key(&["v"]), w_mem(),
    v_obj(&[("a", v_null())]), "ValueNotAdmitted", "§1.4's closure; §3.4 F-2");
refuse_case!(e2e_refuse_nan_nested_in_array, "value.[NaN]", key(&["v"]), w_mem(),
    v_arr(vec![v_nan()]), "ValueNotAdmitted", "§1.4's closure; §3.4 F-2");

// **THE VEC'S RANGE RULE — `DD-43`.** A write at an index OUTSIDE the contiguous range (`i > n`) is
// refused by the EXISTING member `ContainerKindConflict`, and INSTALLS NOTHING.
#[test]
fn e2e_dd_43_vec_write_above_the_contiguous_range_is_refused() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![v_num(1.0), v_num(2.0)])),
        "§3.4 W-4: a two-element VEC");
    let e = failure(
        store.write(
            AddressArg::List(vec![Segment::Key("v".into()), idx(5)]),
            w_mem(),
            v_str("out of range"),
        ),
        "DD-43: a write whose last segment is an INDEX outside 0 ≤ i ≤ n",
    );
    assert_code(&e, "ContainerKindConflict",
        "DD-43: the integer segment falls outside the container's own key domain — §1.3's key-domain arm, \
         §3.4 F-4, §8.1 #7; NO range-specific code is minted");
    assert_eq!(read_at(&store, &key(&["v"])), v_arr(vec![v_num(1.0), v_num(2.0)]),
        "DD-43: no anchor, no coercion, no container-kind change — the VEC is untouched");
    assert_eq!(versions_at(&store, &vec![Segment::Key("v".into()), idx(0)]), vec![Tier::Mem],
        "DD-43: the in-range slot still holds exactly its one version — nothing was installed");
    // And no hole can be read: §4.2 R-3's density + §2.2 L-3.
    let hole = failure(
        store.read(AddressArg::List(vec![Segment::Key("v".into()), idx(2)]), t(Tier::Mem)),
        "DD-43/§2.2 L-3",
    );
    assert_code(&hole, "AddressNotFound",
        "DD-43: the read's holes have NO instance — read(['v', idx(2)]) over a 2-element VEC is L-3's \
         AddressNotFound, because no gap can be minted");
}

// DD-43's other half: `i = n` APPENDS (W-3/W-4) and `i < n` is the pair's own arm — both legal.
#[test]
fn e2e_dd_43_vec_write_at_the_append_index_and_an_in_range_index_succeed() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![v_num(1.0), v_num(2.0)])),
        "§3.4 W-4");
    ok(store.write(AddressArg::List(vec![Segment::Key("v".into()), idx(2)]), w_mem(), v_str("appended")),
        "DD-43: i = n APPENDS");
    assert_eq!(read_at(&store, &key(&["v"])), v_arr(vec![v_num(1.0), v_num(2.0), v_str("appended")]),
        "§4.2 R-3: dense from 0, the append at index 2, index order significant");
    ok(store.write(AddressArg::List(vec![Segment::Key("v".into()), idx(1)]), w_mem(), v_str("replaced")),
        "DD-43: i < n is the pair's own arm");
    assert_eq!(read_at(&store, &key(&["v"])), v_arr(vec![v_num(1.0), v_str("replaced"), v_str("appended")]),
        "§4.2 R-3: the in-range write replaced exactly its own slot");
    assert_eq!(read_at(&store, &vec![Segment::Key("v".into()), idx(2)]), v_str("appended"),
        "§4.2 R-3: element 2 addresses the appended node");
}

// §1.3's key-domain arm / §3.4 F-4: a STRING segment aimed at a VEC, and an INTEGER segment aimed at a
// MAP, are both ContainerKindConflict — and nothing is installed.
#[test]
fn e2e_key_domain_contradictions_are_container_kind_conflict() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["v"])), w_mem(), v_arr(vec![v_str("a")])), "§3.4 W-4");
    ok(store.write(AddressArg::List(key(&["m"])), w_mem(), v_obj(&[("k", v_str("x"))])), "§3.4 W-4");

    let e = failure(
        store.write(AddressArg::List(vec![Segment::Key("v".into()), Segment::Key("0".into())]), w_mem(), v_str("no coercion")),
        "§1.5 items 2–3 / §3.4 F-4",
    );
    assert_code(&e, "ContainerKindConflict", "a string segment aimed at a VEC — §8.1 #7's extended trigger");
    let e = failure(
        store.write(AddressArg::List(vec![Segment::Key("m".into()), idx(0)]), w_mem(), v_str("no coercion")),
        "§1.5 item 3 / §3.4 F-4",
    );
    assert_code(&e, "ContainerKindConflict", "an integer segment aimed at a MAP — §8.1 #7's extended trigger");
    assert_eq!(read_at(&store, &key(&["v"])), v_arr(vec![v_str("a")]), "DD-19: the container is untouched");
    assert_eq!(read_at(&store, &key(&["m"])), v_obj(&[("k", v_str("x"))]), "DD-19: the node is untouched");
}

// §3.4 F-4 + DD-19, the VALUE-kind direction, with §8.2's own worked example (3) asserted VERBATIM — the
// contract prints that message, so the battery compares against the printed string and not a paraphrase.
#[test]
fn e2e_f4_value_kind_conflict_and_the_s8_2_worked_example_3() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["window"])), w_mem(), v_obj(&[])), "§3.4 W-4");
    ok(store.write(
        AddressArg::List(key(&["window", "tabs"])),
        w_mem(),
        v_obj(&[("doc1", v_str("1")), ("searchbar", v_str("2"))]),
    ), "§3.4 W-4: the map the example names");
    let e = failure(
        store.write(
            AddressArg::List(key(&["window", "tabs"])),
            w_mem(),
            v_arr(vec![v_num(1.0), v_num(2.0)]),
        ),
        "§3.4 F-4",
    );
    assert_code(&e, "ContainerKindConflict", "§8.1 #7: a write whose value's kind contradicts the target slot's");
    assert_eq!(
        e.message,
        "[1,2] does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'",
        "§8.2's worked example (3), printed by the contract in the architect's own form and reproducible \
         from its rule — the message is GENERATED from the code and the failing trigger's arguments"
    );
    assert_eq!(
        read_at(&store, &key(&["window", "tabs"])),
        v_obj(&[("doc1", v_str("1")), ("searchbar", v_str("2"))]),
        "DD-19/§3.5: the refused write installs nothing — the map stands whole"
    );
}

// §3.1.1's write row + §3.4 F-1: the arity failures of the write's tier argument.
#[test]
fn e2e_write_tier_arity_and_domain_failures() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), none(), v_num(1.0)),
        "§3.1.1 write row: tier absent",
    );
    assert_code(&e, "AddressMalformed", "§3.1: a required argument is missing");
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), set_empty(), v_num(1.0)),
        "§3.1.1 write row: an array of 0 tokens",
    );
    assert_code(&e, "OutOfDomainTier", "§3.1: the array form is available on read and NOT on write");
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), set(&[Tier::Mem]), v_num(1.0)),
        "§3.1.1 write row: an array of 1 token",
    );
    assert_code(&e, "OutOfDomainTier", "§3.1: 'exactly one' is read as exactly one TOKEN");
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), TierArg::Null, v_num(1.0)),
        "§3.1.1 write row: tier null",
    );
    assert_code(&e, "AddressMalformed", "PAR-3: null is not a tier-shaped value at all");
    let e = failure(
        store.write(AddressArg::List(key(&["a"])), TierArg::Undefined, v_num(1.0)),
        "§3.1.1 write row: tier undefined",
    );
    assert_code(&e, "AddressMalformed", "PAR-3: undefined is not a tier-shaped value at all");
    for spelling in ["secure", "Secure", "FILE", "disk", "session", ""] {
        let e = failure(
            store.write(AddressArg::List(key(&["a"])), outside_token(spelling), v_num(1.0)),
            "§3.1.1 write row: a token outside the domain",
        );
        assert_code(&e, "OutOfDomainTier", "§5.1 M-2: the domain is closed at three — no fourth tier exists");
    }
    assert_eq!(read_at(&store, &empty_address()), v_obj(&[]), "§3.5: none of the six installs a node");
}

// §1.5 item 1 + §2.2 L-1 + §3.4 F-3: every outside segment class fails AddressMalformed and installs
// nothing.
#[test]
fn e2e_address_segment_domain_refusals() {
    let outside: Vec<Segment> = vec![
        Segment::Negative(-1),
        Segment::Fractional(1.5),
        Segment::Null,
        Segment::Undefined,
        Segment::Bool(true),
        Segment::Object,
        Segment::Array,
        Segment::Function,
    ];
    for segment in outside {
        let mut store = new_store();
        let e = failure(
            store.write(AddressArg::List(vec![segment.clone()]), w_mem(), v_str("x")),
            "§1.5 item 1 / §2.2 L-1",
        );
        assert_code(&e, "AddressMalformed", "§1.5 item 1: the segment domain is closed at two classes");
        assert_eq!(read_at(&store, &empty_address()), v_obj(&[]),
            "§3.5/DD-5: nothing is installed, including below the failing segment");
        // the same segment class at a READ is the walk's L-1, the same code
        let e = failure(
            store.read(AddressArg::List(vec![segment]), t(Tier::Mem)),
            "§2.2 L-1",
        );
        assert_code(&e, "AddressMalformed", "§2.2 L-1: a segment outside §1.5's domain");
    }
}

// §3.2 item 6 + §3.4 F-5: the empty-address write has no key to install under, and neither has a write
// whose resolved PARENT is a leaf.
#[test]
fn e2e_write_parent_not_link_states() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(empty_address()), w_mem(), v_str("nameless root")),
        "§3.2 item 6",
    );
    assert_code(&e, "WriteParentNotLink",
        "§3.2 item 6: write([], tier, v) has no last segment and therefore no key to install under");

    ok(store.write(AddressArg::List(key(&["leaf"])), w_mem(), v_str("a leaf")), "§3.4 W-3");
    let e = failure(
        store.write(AddressArg::List(key(&["leaf", "child"])), w_mem(), v_str("x")),
        "§3.4 F-5",
    );
    assert_code(&e, "WriteParentNotLink",
        "F-5: the resolved parent is a leaf, so no child anchor can be installed there — whatever the value");
    assert_eq!(read_at(&store, &key(&["leaf"])), v_str("a leaf"), "§3.5: nothing is installed");

    // §2.2 L-4: the same address at a READ walks through the leaf and fails LeafHasNoDownstream.
    let e = failure(
        store.read(AddressArg::List(key(&["leaf", "child"])), t(Tier::Mem)),
        "§2.2 L-4",
    );
    assert_code(&e, "LeafHasNoDownstream", "L-4: the walk stood on a leaf with segments remaining");
}

// §3.2 item 2 + §3.4 F-3 + DD-5: a write whose intermediate segment does not resolve fails with the
// WALK's own code and installs nothing below the failing segment.
#[test]
fn e2e_write_with_an_unresolved_parent_fails_the_walks_code() {
    let mut store = new_store();
    let e = failure(
        store.write(AddressArg::List(key(&["nope", "k"])), w_mem(), v_str("x")),
        "§3.4 F-3 / DD-5",
    );
    assert_code(&e, "AddressNotFound", "L-3: the parent address resolves to nothing");
    assert_eq!(read_at(&store, &empty_address()), v_obj(&[]),
        "DD-5: nothing is installed, including below the failing segment");
}

// §4.1.1 item 3: readLiteral refuses EXACTLY two states — a branch target (including the register) and
// nothing else. At a leaf it is indistinguishable from read.
#[test]
fn e2e_read_literal_refuses_a_branch_and_matches_read_at_a_leaf() {
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["leaf"])), w_mem(), v_str("literal")), "§3.4 W-3");
    ok(store.write(AddressArg::List(key(&["branch"])), w_mem(), v_obj(&[("a", v_str("x"))])), "§3.4 W-4");

    assert_eq!(
        ok(store.readLiteral(AddressArg::List(key(&["leaf"])), t(Tier::Mem)), "§4.1.1 item 2"),
        v_str("literal"),
        "§4.1.1 item 2: at a leaf, readLiteral returns exactly what read returns"
    );
    assert_eq!(
        ok(store.readLiteral(AddressArg::List(key(&["leaf"])), t(Tier::Mem)), "§4.1.1 item 2"),
        ok(store.read(AddressArg::List(key(&["leaf"])), t(Tier::Mem)), "§4.1.1 item 2"),
        "§4.1.1 item 2: the two forms differ ONLY in what they refuse"
    );
    let e = failure(
        store.readLiteral(AddressArg::List(key(&["branch"])), t(Tier::Mem)),
        "§4.1.1 item 3 / §8.1 #8",
    );
    assert_code(&e, "ReadTargetIsBranch", "§4.1.1 item 3: a branch target");
    let e = failure(
        store.readLiteral(AddressArg::List(empty_address()), t(Tier::Mem)),
        "§4.1.1 item 3 / §8.1 #8",
    );
    assert_code(&e, "ReadTargetIsBranch",
        "§4.1.1 item 3: the register's read assembles an object, so readLiteral refuses it too");
}

// ===================================================================================================
// 8. THE STRESS CASE — a tree of ≥ 100 nodes, round-tripped and compared MEMBER FOR MEMBER.
// ===================================================================================================

/// The stress tree: 6 branches × (6 members, one of them a 12-element array) — **≥ 100 nodes by the
/// battery's own count**, which the drive asserts rather than assumes.
fn stress_tree() -> StoreValue {
    let branches: Vec<StoreValue> = (0..6)
        .map(|b| {
            v_obj(&[
                ("k0", v_num(b as f64 + 0.1)),
                (
                    "k1",
                    v_arr(
                        (0..2)
                            .flat_map(|r| {
                                vec![
                                    v_num(b as f64 + r as f64),
                                    v_str("s"),
                                    v_bool(b % 2 == 0),
                                    v_obj(&[]),
                                    v_arr(vec![]),
                                    v_obj(&[("z", v_num(9.0))]),
                                ]
                            })
                            .collect(),
                    ),
                ),
                ("k2", v_str("unicode ✓ 日本 🎉")),
                ("k3", v_obj(&[("deep", v_obj(&[("deeper", v_str("bottom"))]))])),
                ("k4", v_bool(true)),
                ("k5", v_str("")),
            ])
        })
        .collect();
    v_obj(&[
        ("b0", branches[0].clone()),
        ("b1", branches[1].clone()),
        ("b2", branches[2].clone()),
        ("b3", branches[3].clone()),
        ("b4", branches[4].clone()),
        ("b5", branches[5].clone()),
    ])
}

/// Member-for-member comparison of two values, counting the nodes it reaches. `§4.1`/`§4.2`'s own
/// recursion, written out so that **an added member, a removed member, a changed value, a changed array
/// length or a changed array order is named at its own path** rather than only reported as an inequality.
fn assert_member_for_member(written: &StoreValue, read: &StoreValue, path: &str, nodes: &mut usize) {
    match (written, read) {
        (StoreValue::Object(a), StoreValue::Object(b)) => {
            *nodes += 1;
            assert_eq!(
                a.len(),
                b.len(),
                "§4.2 R-2: the read at {path} carries ONE member per key — {} written, {} read",
                a.len(),
                b.len()
            );
            for (k, av) in a {
                let bv = b.get(k).unwrap_or_else(|| {
                    panic!("§4.2 R-2: the member '{k}' is MISSING from the read at {path}")
                });
                let child = if path.is_empty() { k.clone() } else { format!("{path}/{k}") };
                assert_member_for_member(av, bv, &child, nodes);
            }
            for k in b.keys() {
                assert!(
                    a.contains_key(k),
                    "§4.2 R-2: the read at {path} carries a member '{k}' that was never written — \
                     an ADDED member"
                );
            }
        }
        (StoreValue::Array(x), StoreValue::Array(y)) => {
            *nodes += 1;
            assert_eq!(
                x.len(),
                y.len(),
                "§4.2 R-3: the array at {path} is dense from 0 and its length is the contiguous index \
                 count — {} written, {} read",
                x.len(),
                y.len()
            );
            for (i, (av, bv)) in x.iter().zip(y.iter()).enumerate() {
                assert_member_for_member(av, bv, &format!("{path}[{i}]"), nodes);
            }
        }
        (a, b) => {
            *nodes += 1;
            assert_eq!(
                a, b,
                "§4.2 R-1: the leaf at {path} does not round-trip — exact match is required"
            );
        }
    }
}

#[test]
fn e2e_stress_tree_of_at_least_100_nodes_member_for_member() {
    let value = stress_tree();
    let path = fresh_path("stress");
    let mut store = ok(storeCreate(&cfg_at(&path, 8)), "§7.1");
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED): the verb RECORDS the write and
    // performs NO FILE I/O on any of its arms, so this cell's own file route is completed by THE TERMINAL
    // ARM'S OWN ACT, keyed by the settled record's own `op` (`surface.md §2.11` clause 2).**
    let landed = ok(
        store.write(AddressArg::List(key(&["root"])), w_file(), value.clone()),
        "§3.4 W-4 / §7.2 item 1 as amended: a `file`-tier tree is RECORDED by the verb",
    );
    ok(
        commit_at_the_terminal_arm(&mut store, &landed.op.opId),
        "§7.2 item 2 as amended: the terminal arm's own act commits the ≥ 100-node tree's JSON image",
    );
    let back = read_at(&store, &key(&["root"]));
    let mut written_nodes = 0usize;
    let mut read_nodes = 0usize;
    assert_member_for_member(&value, &back, "root", &mut written_nodes);
    assert_member_for_member(&back, &value, "root", &mut read_nodes);
    println!("stress census: {written_nodes} nodes member for member");
    assert!(
        written_nodes >= 100,
        "the stress case's own census: ≥ 100 nodes are reached member for member; got {written_nodes}"
    );
    assert_eq!(
        written_nodes, 139,
        "the stress tree's pinned census: 6 branches × 23 nodes + the root (§4.2's recursion, counted)"
    );
    assert_eq!(written_nodes, read_nodes, "§5.2 P-IM-1: the same node count both ways");
    assert_eq!(back, value, "§5.2 P-IM-1 over a ≥ 100-node tree");
    // and the file tier's own ROUTE — commit → fresh storeCreate → read — carries it back whole
    drop(store);
    let booted = ok(storeCreate(&cfg_at(&path, 8)), "§7.2 item 6: the boot loads the file's content");
    let from_file = read_at(&booted, &key(&["root"]));
    assert_member_for_member(&value, &from_file, "root", &mut read_nodes);
    assert_eq!(
        from_file, value,
        "§7.2 M-12 + item 6: a ≥ 100-node tree committed to the file tier and re-booted from its JSON \
         text is the same value, member for member"
    );
}

// ===================================================================================================
// 9. RE-WRITE FIDELITY — write A, read it, write THAT READ-BACK at a FRESH address, read again.
// ===================================================================================================

#[test]
fn e2e_re_write_fidelity_three_values_equal() {
    let a = v_obj(&[
        (
            "list",
            v_arr(vec![
                v_num(0.1),
                v_str("quote \" backslash \\ newline \n"),
                v_bool(false),
                v_obj(&[]),
                v_arr(vec![]),
                v_obj(&[("n", v_num(1e300)), ("u", v_str("日本 🎉"))]),
            ]),
        ),
        ("empty-key-target", v_str("")),
    ]);
    let mut store = new_store();
    ok(store.write(AddressArg::List(key(&["first"])), w_file(), a.clone()), "§3.4 W-4");
    let read_back = read_at(&store, &key(&["first"]));
    assert_eq!(read_back, a, "§5.2 P-IM-1: the first round trip is exact-modulo the declared member order");

    // the READ-BACK value is written at a FRESH address (§1.5 item 5: one address path per node)
    ok(store.write(AddressArg::List(key(&["second"])), w_file(), read_back.clone()), "§3.4 W-4");
    let read_back_again = read_at(&store, &key(&["second"]));
    assert_eq!(read_back_again, read_back, "§5.2 P-IM-1: the re-write round trip is exact");
    assert_eq!(read_back_again, a, "§5.2 P-IM-1: all three values are equal");
    assert_eq!(
        read_at(&store, &key(&["first"])),
        a,
        "§4.1: the first address was not disturbed by the write at the second"
    );
    // and the two nodes are distinct members of the register with the SAME value (§1.5 item 5)
    assert_eq!(
        read_at(&store, &empty_address()),
        v_obj(&[("first", a.clone()), ("second", a.clone())]),
        "§4.2 R-5: the register carries both addresses"
    );
}

// ===================================================================================================
// 10. THE `file` TIER'S OWN ROUTE — COMMIT → FRESH `storeCreate` AT THE SAME PATH → READ, i.e. the one
//     round trip in this battery that crosses a JSON TEXT (`§7.2` item 1 `M-12`, item 6's boot).
// ===================================================================================================

/// Commit `value` at `key(&["root"])` at the `file` tier, then boot a FRESH instance at the same
/// `cfg.filePath` and read the same address back — the declared boot (`§7.2` item 6: *"on `storeCreate`,
/// the `file` tier's content at `cfg.filePath` is loaded if the file exists"*) — and compare EXACTLY.
///
/// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2): THE
/// `file`-TIER COMMIT IS THE TERMINAL ARM'S OWN ACT AND NOT THE VERB'S.** *"`Store::write(…)` RECORDS THE
/// WRITE IN THE JOURNAL, INSTALLS THE NODE, APPENDS THE ENTRY AND RETURNS ITS `WriteResult` … AND IT
/// PERFORMS NO FILE I/O ON ANY OF ITS ARMS"* (item 1 as amended); *"THE `file`-TIER COMMIT IS THE TERMINAL
/// ARM'S OWN ACT … keyed by THE SETTLED RECORD'S OWN `op`"* (item 2 as amended). **So the drive takes the
/// op the verb returned and drives that act at its own instant — the act is what puts the JSON TEXT at
/// `cfg.filePath` that the boot below reads.** **NO ASSERTION IS WEAKENED: the round trip asserted at the
/// end is the same one, over the same JSON text, and the boot is the same declared boot.**
fn boot_round_trip(tag: &str, value: StoreValue, clause: &str) {
    let path = fresh_path(tag);
    {
        let mut store = ok(storeCreate(&cfg_at(&path, 8)), "§7.1: the construction's arguments are valid");
        let landed = ok(store.write(AddressArg::List(key(&["root"])), w_file(), value.clone()),
            "§7.2 item 1 as amended: the verb RECORDS the write and returns its `WriteResult` — and it \
             performs NO FILE I/O on any of its arms");
        ok(commit_at_the_terminal_arm(&mut store, &landed.op.opId),
            "§7.2 item 2 as amended / `surface.md §2.11` clause 2: THE TERMINAL ARM'S OWN ACT — the \
             `file`-tier commit, keyed by the settled record's own `op` — lands the whole serialized state \
             at `cfg.filePath` (`DD-2`)");
    }
    let booted = ok(storeCreate(&cfg_at(&path, 8)),
        "§7.2 item 6: the boot loads the file's content and the instance IS returned");
    let back = read_at(&booted, &key(&["root"]));
    assert_eq!(back, value, "§7.2 item 6's declared boot + §5.2 P-IM-1: the value that survives the JSON \
        TEXT of the file tier is the value that was written [{clause}]");
}

#[test]
fn e2e_boot_str_escapes() {
    boot_round_trip(
        "boot-escapes",
        v_str("\"double\" \\back\\ \nnewline\ttab\rcr \u{0000}NUL \u{001F}us \u{007F}del"),
        "§7.2 M-12; §1.4 class 1",
    );
}

#[test]
fn e2e_boot_unicode_emoji_and_combining() {
    boot_round_trip(
        "boot-unicode",
        v_str("héllo — 世界 🎉 e\u{0301} أهلاً \u{202E}rtl\u{202C}"),
        "§7.2 M-12; §1.4 class 1",
    );
}

#[test]
fn e2e_boot_empty_containers_stay_distinct() {
    boot_round_trip(
        "boot-empty",
        v_obj(&[("o", v_obj(&[])), ("a", v_arr(vec![])),
                ("nested", v_obj(&[("o", v_arr(vec![])), ("a", v_arr(vec![v_obj(&[])]))]))]),
        "§7.2 M-12; §4.2's closing clause + DD-1 — the two empty forms survive the JSON text distinct",
    );
}

#[test]
fn e2e_boot_numbers() {
    boot_round_trip(
        "boot-numbers",
        v_arr(vec![
            v_num(0.1),
            v_num(1.0 / 3.0),
            v_num(1e300),
            v_num(1e-300),
            v_num(5e-324),
            v_num(1e21),
            v_num(9007199254740994.0),
            v_num(0.0),
            v_num(-1.0),
            v_num(1e2),
        ]),
        "§7.2 M-12; §1.4 class 3 — the numbers' TEXTUAL SPELLING is undeclared by the contract, so the \
         comparison is the declared f64 equality and the spelling is reported as a finding",
    );
}

#[test]
fn e2e_boot_long_string_and_long_key() {
    let long_key: &'static str = long_key(1_000);
    let mut long = "x".repeat(100_000);
    long.push_str("__END__");
    boot_round_trip(
        "boot-long",
        v_obj(&[
            ("long", v_str(&long)),
            (long_key, v_str("at the long key")),
            ("", v_str("at the empty key")),
        ]),
        "§7.2 M-12; §1.5 item 1's empty-key legality",
    );
}

#[test]
fn e2e_boot_numeric_looking_keys_and_indices() {
    boot_round_trip(
        "boot-numeric-keys",
        v_obj(&[
            ("m", v_obj(&[("0", v_str("s0")), ("00", v_str("s00")), ("1.5", v_str("s1.5"))])),
            ("v", v_arr(vec![v_str("i0"), v_str("i1"), v_str("i2")])),
        ]),
        "§1.5 items 2–3: no coercion — '0' and 0 stay distinct across the JSON text",
    );
}

#[test]
fn e2e_boot_deep_nesting() {
    boot_round_trip(
        "boot-deep",
        nest_obj(8, v_str("bottom")),
        "§4.2's recursion at depth 8 across the JSON text",
    );
}

// **⟶ RE-DERIVED 2026-10-11 TO THE ARCHITECT'S DECLARED NORMALIZATION (`A59`). THE CASE KEEPS ITS AS-FILED
// NAME AND INTENT — the numeric image's fidelity is DECLARED, at BOTH layers — AND BOTH HALVES ARE NOW
// ASSERTED WHOLE.** The architect ruled *"Normalize into file"* (`A59`; `docs/specs/storeroom-listeners-
// proposal.md` `§21`), and the ruling's own consequences read: **the `file` tier's JSON text CARRIES A
// CANONICAL NUMBER SPELLING — a number is NORMALIZED ON THE WAY INTO THE FILE, so `-0` is written as `0` —
// while IN MEMORY (`mem`/`temp`) THE SIGN IS NOT TOUCHED** (the normalization is a property of the FILE's
// IMAGE, not of the value the store holds), **and `P-IM-1`'s *"byte-equal after a JSON round trip"* half is
// thereby SCOPED to the CANONICAL spelling and not to the caller's literal** (`A59` (a)–(c)).
//
// **THE TWO HALVES THIS CELL ASSERTS, SO NEITHER IS READ AS THE OTHER:**
//
//   (i) **IN MEMORY — THE SIGN IS PRESERVED, AND THIS HALF IS ASSERTED AT THE SIGN BIT AND NOT BY AN
//       EQUALITY** (`-0.0 == 0.0` under `§0.4`'s `Num(f64)`, so an equality is blind to exactly the state
//       this half pins): at `mem`, at `temp` (both the unqualified and the tier-qualified route), **and at
//       the `file`-tier instance's OWN state before any boot**, the read-back's `is_sign_negative()` is
//       TRUE — the value the store holds is the caller's;
//   (ii) **THROUGH THE `file` TIER'S COMMITTED BYTES AND A FRESH BOOT — THE CANONICAL `0`**: the committed
//       JSON text spells the number `0` (`§7.2` item 1 `M-12` is the bytes' clause; `DD-2` lands them whole)
//       and the booted instance (`§7.2` item 6) reads it back as `Num(0.0)` with `is_sign_negative()`
//       FALSE — **EXACT-MODULO THE DECLARED NORMALIZATION**, which is what `A59` (a) declares the round
//       trip through the `file` tier to be. **The canonical spelling's RULE is not named by the ruling**
//       (`A59`'s own *"what it does NOT say"* cell), so this half pins the plain-decimal spelling the
//       ruling's own example requires (`-0` written as `0`) and says so.
//
// **THE CLAUSES, STATED BECAUSE `A59`'s OWN CONTRACT CLAUSES HAD NOT LANDED AT THIS RUN'S BYTES:** the
// ruling cited is `A59` (`§21` of the proposal) and the home it is owed is the `file` tier's bytes clause
// (`§7.2` items 1 and 6) plus `§5.2` `P-IM-1`'s scope; `contract.md`, `store-model.md`, `write-and-read.md`
// and `seams-and-lifecycle.md` name no canonical number spelling at this run. **Nothing is softened: the
// as-filed case's own equality half (`read == Num(-0.0)` through the boot, `§5.2` `P-IM-1` under `§0.4`'s
// `Num(f64)`) stands beside both halves, because the DECLARED predicate holds on either side of the
// normalization — what the image moves is the SPELLING.**
#[test]
fn e2e_boot_neg_zero_sign_is_declared_nowhere() {
    // (i) IN MEMORY at `mem` and at `temp` — `A59` (b): THE SIGN IS NOT TOUCHED.
    for tier in [Tier::Mem, Tier::Temp] {
        let mut store = new_store();
        ok(
            store.write(AddressArg::List(key(&["root"])), t(tier), v_num(-0.0)),
            "§7.2 item 5: a mem-/temp-tier write performs NO file I/O — no JSON text stands between the \
             caller and the value the store holds",
        );
        let routes = [
            (
                "the unqualified read",
                read_at(&store, &key(&["root"])),
            ),
            (
                "the tier-qualified read",
                ok(
                    store.read(AddressArg::List(key(&["root"])), t(tier)),
                    "§4.1: the read at the write's own tier resolves",
                ),
            ),
        ];
        for (route, got) in routes {
            match got {
                StoreValue::Num(n) => assert!(
                    n.is_sign_negative(),
                    "case `num.-0` at {tier:?}, {route}: A59 (b) — IN MEMORY THE SIGN IS NOT TOUCHED: the \
                     value the store holds is the caller's `-0`, so its sign bit is NEGATIVE. The \
                     normalization is a property of the FILE's IMAGE, and neither `mem` nor `temp` has one \
                     (`§7.2` item 5). Read back {n:?}."
                ),
                other => panic!("§4.1 R-1: a leaf's number reads as a number; got {other:?}"),
            }
        }
    }

    // (i) at the `file` tier: the instance's OWN state, after the commit and BEFORE any boot.
    // **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2): the verb
    // RECORDS the write and performs NO FILE I/O on any of its arms, so the JSON image this cell's half (ii)
    // reads is put at the path by THE TERMINAL ARM'S OWN ACT. THE IN-MEMORY HALF (i) IS READ BEFORE THAT ACT,
    // which is the clause's own order and is why the two halves are separable at all.**
    let path = fresh_path("boot-neg-zero");
    let mut live = ok(storeCreate(&cfg_at(&path, 8)), "§7.1");
    let landed = ok(
        live.write(AddressArg::List(key(&["root"])), w_file(), v_num(-0.0)),
        "§7.2 item 1 as amended: the verb RECORDS the write — and the value the store holds is the \
         caller's, because the normalization is a property of the FILE's IMAGE and not of the value",
    );
    match read_at(&live, &key(&["root"])) {
        StoreValue::Num(n) => assert!(
            n.is_sign_negative(),
            "A59 (b) — the normalization is a property of the FILE's IMAGE and not of the value the store \
             holds: a `file`-tier `-0` write reads back IN MEMORY as `-0`; got {n:?}"
        ),
        other => panic!("§4.1 R-1: a leaf's number reads as a number; got {other:?}"),
    }
    assert_eq!(
        read_at(&live, &key(&["root"])),
        v_num(-0.0),
        "§5.2 P-IM-1: the as-filed case's equality half stands — the declared predicate holds in memory"
    );
    ok(
        commit_at_the_terminal_arm(&mut live, &landed.op.opId),
        "§7.2 item 2 as amended / `surface.md §2.11` clause 2: THE TERMINAL ARM'S OWN ACT, keyed by the \
         settled record's own `op`",
    );

    // (ii) THE `file` TIER'S COMMITTED BYTES — `§7.2` item 2 as amended `M-12`, the one JSON image in this unit.
    let bytes = std::fs::read_to_string(&path)
        .expect("§7.2 item 2: a JSON file stands at cfg.filePath after the terminal arm's own commit");
    assert_eq!(
        bytes, "{\"root\":0}",
        "A59 — *NORMALIZE INTO FILE*: the `file` tier's JSON text carries the CANONICAL NUMBER SPELLING, so \
         `-0` is written as `0`. The bytes' clause is `§7.2` item 1 `M-12` and `DD-2` lands them whole; the \
         canonical spelling's RULE is not named by the ruling (`A59`'s own *what it does NOT say*), so this \
         half pins the plain-decimal spelling the ruling's own example requires."
    );

    // (ii) A FRESH BOOT at the same `cfg.filePath` — `§7.2` item 6.
    let booted = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.2 item 6: the boot loads the file's content and the instance IS returned",
    );
    let back = read_at(&booted, &key(&["root"]));
    assert_eq!(
        back,
        v_num(0.0),
        "A59 (a): the round trip through the `file` tier and a boot is EXACT-MODULO THE DECLARED \
         NORMALIZATION — the booted value is the CANONICAL `0`"
    );
    match &back {
        StoreValue::Num(n) => assert!(
            !n.is_sign_negative(),
            "A59 — *NORMALIZE INTO FILE*: through the `file` tier's committed bytes and a fresh boot the \
             read-back is the CANONICAL `0`, whose sign bit is POSITIVE. The image normalized the sign \
             away; the value the store holds did not carry one. Read back {n:?}.",
        ),
        other => panic!("§4.1 R-1: a leaf's number reads as a number; got {other:?}"),
    }
    // **AND THE TWO HALVES ARE THE SAME VALUE — STATED SO THIS CELL IS NOT READ AS AN INEXACTNESS:**
    // `-0.0 == 0.0` under `§0.4`'s `Num(f64)`, so `§5.2` `P-IM-1`'s DECLARED predicate holds THROUGH THE BOOT
    // AS WELL; what the file's image moved is the SPELLING (`A59` (c): *"byte-equal after a JSON round
    // trip"* is scoped to the CANONICAL spelling, not to the caller's literal).
    assert_eq!(
        back,
        v_num(-0.0),
        "§5.2 P-IM-1 under §0.4's Num(f64): the declared predicate holds through the boot too — the \
         normalization is a SPELLING's, declared by A59, and not a value's"
    );
}

// **THE CARRIER'S OWN LIMIT, ASSERTED SO IT IS NOT MISTAKEN FOR A STORE DEFECT.** `§1.4` class 3 admits
// *"a finite JSON number (integral or fractional)"*, and `§0.4` declares the carrier `Num(f64)`. **The
// JSON integer `9007199254740993` (2^53 + 1) has NO exact `f64` carrier**: the loss happens at the
// carrier, before any store call, so a battery that asserted `2^53 + 1` would compare a value the store
// never saw. This case asserts the carrier's limit and the nearest representable neighbours' EXACTNESS.
#[test]
fn e2e_carrier_integral_above_2_pow_53_has_no_exact_carrier() {
    // the carrier's limit: 2^53 + 1 is not representable — it rounds to 2^53
    assert_eq!(
        9007199254740993u64 as f64, 9007199254740992u64 as f64,
        "§0.4's declared carrier Num(f64) cannot hold the integral JSON number 2^53 + 1: the rounding \
         happens in the CARRIER, not in the store. Reported as a CONTRACT FINDING (§1.4 + §0.4 declare no \
         integral carrier wider than f64)."
    );
    assert_eq!(
        9007199254740993u64 as f64, 9007199254740993u64 as f64,
        "…and the carrier is deterministic about it"
    );
    // the nearest representable neighbours DO round-trip exactly, through the store and through the file
    for v in [9007199254740992.0, 9007199254740994.0, 9007199254740996.0] {
        let mut store = new_store();
        ok(store.write(AddressArg::List(key(&["v"])), w_mem(), v_num(v)), "§3.4 W-3");
        assert_eq!(read_at(&store, &key(&["v"])), v_num(v),
            "§5.2 P-IM-1: exact at every f64-representable integral magnitude around 2^53");
    }
}

// ===================================================================================================
// 11. THE AMENDED NUMERIC RULINGS (`A59`/`A60`) — THE DECLARED CANONICAL NUMBER SPELLING AND THE
//     OUT-OF-BOUNDS REFUSAL. (`docs/specs/storeroom-listeners-proposal.md` `§21`; the architect's words
//     verbatim: *"1. Normalize into file"*, *"2. Refuse out-of-bounds numbers"*.)
//
// **AT THIS BATTERY'S RUN THE CLAUSES THE TWO RULINGS OWE HAD NOT LANDED IN THE CONTRACT:** no file under
// `docs/specs/storeroom-native/` names a canonical number spelling, an f64-exact bound or an out-of-bounds
// refusal (`contract.md` `§1.4`, `§5.2` `P-IM-1`, `§7.2` items 1/6, `§8.1` #14, `§8.2`; the word *"canonical"*
// occurs in those files only of `§5.1`'s TIER order). **The cells below therefore cite the RULINGS
// THEMSELVES and assert exactly the two halves each of them states:**
//
// * **`A59` — *"Normalize into file"*.** **HALF (i): IN MEMORY (`mem`/`temp`) THE SIGN AND THE SPELLING ARE
//   UNTOUCHED** — the normalization is a property of the FILE's IMAGE, not of the value the store holds.
//   **HALF (ii): THE `file` TIER'S COMMITTED JSON TEXT CARRIES THE CANONICAL NUMBER SPELLING** — `-0` is
//   written as `0`, and `1e2`/`1.0`/`1E+2` in their canonical form — **so the round trip through the `file`
//   tier and a boot (`§7.2` item 1 `M-12`, item 6) is EXACT-MODULO THIS DECLARED NORMALIZATION, and `§5.2`
//   `P-IM-1`'s *"byte-equal after a JSON round trip"* half is SCOPED to the canonical spelling and not to
//   the caller's literal** (`A59` (a)–(c)).
// * **`A60` — *"Refuse out-of-bounds numbers"*.** **A number outside the carrier's exact range is REFUSED
//   `ValueNotAdmitted` (`§8.1` #14, `§3.4` `F-2`'s fail set member) and NEVER SILENTLY ROUNDED**, so `§1.4`
//   class 3's *"a finite JSON number"* is NARROWED to the f64-exact range. **The ruling's own *"what it does
//   NOT say"* cell records that the BOUND'S PRECISE PREDICATE is not stated** — the integral range
//   `|n| ≤ 2^53` against *"every number whose literal the carrier cannot represent exactly"* — **and that a
//   caller may not be able to observe the refusal's TRIGGER as against its code.** **The cells below read the
//   bound the second way, which is the reading the ruling's own example and `CF-3` force: `2^53 + 1` is
//   refused while `2^53 + 2` and `2^53 + 4` — both ABOVE `2^53`, both exactly representable — round-trip
//   exactly** (asserting the first reading would refuse `2^53 + 2`, which the ruling's own words do not
//   demand and which no cell of this battery may invent).
//
// **EVERY CELL BELOW SAYS IN ITS OWN COMMENT WHICH HALF IS BYTE-SPECIFIC AND WHICH IS EXACT-MODULO THE
// DECLARED NORMALIZATION. NO ASSERTION IS SOFTENED BECAUSE THE CLAUSES ARE ABSENT, AND NO INPUT IS ADJUSTED
// TO AVOID A FINDING.**
// ===================================================================================================

/// `§8.2`'s generated message for `§8.1` #14 `ValueNotAdmitted` at `key(&["v"])` — the row's `<mismatch
/// clause>` and `<available clause>` composed with the subject the generator supplies (the addressed
/// value's own slashed spelling, `§8.2`'s `<SEGMENT>`). **The generated text carries the spelling QUOTED
/// TWICE (`''v''`)** — the `§8.2` subject-quoting divergence already recorded at `tests/properties.rs`'s
/// `ValueNotAdmitted` row and routed to the supervisor; the battery pins the GENERATED text and does not
/// restate the rule (`§8.2`'s generator, determinism (a) + completeness (b)).
const VALUE_NOT_ADMITTED_AT_V: &str = "''v'' is not an admitted value, admitted values are strings, booleans, \
                                       finite numbers, plain objects and arrays";

/// `§7.2` item 1 `M-12` / item 6, driven for ONE value as `A59` separates its two layers: **the `file`-tier
/// instance's OWN in-memory read-back, the committed BYTES at `cfg.filePath`, and a FRESH BOOT's read-back.**
/// `DD-2` lands a successful commit's bytes whole, so the bytes read here are the commit's own.
///
/// **⟶ RE-POINTED 2026-10-15 (`RCA-9`; `§7.2` items 1–2 AS AMENDED, `surface.md §2.11` clause 2): the verb
/// RECORDS the write and takes NO byte of the path — *"it performs NO FILE I/O ON ANY OF ITS ARMS"* — and
/// THE TERMINAL ARM'S OWN ACT, keyed by the settled record's own `op`, is what lands the image these three
/// observables are read at. The in-memory read-back is taken BEFORE the act, which is the clause's own
/// order: the value the store holds is the caller's, and the image is the act's.**
fn file_image_drive(tag: &str, value: StoreValue) -> (StoreValue, String, StoreValue) {
    let path = fresh_path(tag);
    let live = {
        let mut store = ok(
            storeCreate(&cfg_at(&path, 8)),
            "§7.1: the construction's arguments are valid",
        );
        let landed = ok(
            store.write(AddressArg::List(key(&["root"])), w_file(), value),
            "§7.2 item 1 as amended: the verb RECORDS the write, installs the node, appends the entry and \
             returns its `WriteResult` — and it performs NO FILE I/O on any of its arms",
        );
        let held = read_at(&store, &key(&["root"]));
        ok(
            commit_at_the_terminal_arm(&mut store, &landed.op.opId),
            "§7.2 item 2 as amended / `surface.md §2.11` clause 2: THE TERMINAL ARM'S OWN ACT — the \
             `file`-tier commit, keyed by the settled record's own `op`",
        );
        held
    };
    let bytes = std::fs::read_to_string(&path).unwrap_or_else(|e| {
        panic!("§7.2 item 2: a JSON file stands at cfg.filePath after the terminal arm's own commit; got {e}")
    });
    let booted = ok(
        storeCreate(&cfg_at(&path, 8)),
        "§7.2 item 6: the boot loads the file's content and the instance IS returned",
    );
    (live, bytes, read_at(&booted, &key(&["root"])))
}

/// **`A59` HALF (i) — IN MEMORY THE SPELLING AND THE SIGN ARE UNTOUCHED** — driven at `mem` and at `temp`,
/// through the unqualified read and the tier-qualified read. **`§7.2` item 5 is why this is not a
/// spelling's cell: neither tier has a JSON image, so no normalization can be a property of the value the
/// store holds.** (For `-0` this half is NOT asserted here: `-0.0 == 0.0` under `§0.4`'s `Num(f64)`, so an
/// equality is blind to the state that half pins, and `e2e_boot_neg_zero_sign_is_declared_nowhere` asserts it
/// at the SIGN BIT.)
fn in_memory_drive(label: &str, value: StoreValue, expected: &StoreValue, clause: &str) {
    for tier in [Tier::Mem, Tier::Temp] {
        let mut store = new_store();
        ok(
            store.write(AddressArg::List(key(&["root"])), t(tier), value.clone()),
            "§3.4 W-3 / §7.2 item 5: a mem-/temp-tier write performs NO file I/O",
        );
        assert_eq!(
            read_at(&store, &key(&["root"])),
            expected.clone(),
            "case `{label}` at {tier:?}: A59 (b) — IN MEMORY the sign and the spelling are UNTOUCHED: the \
             value the store holds is the PARSED NUMBER, not the file image's canonical spelling [{clause}]"
        );
        assert_eq!(
            read_tier(&store, &key(&["root"]), tier),
            expected.clone(),
            "case `{label}` at {tier:?}: §2.2/§4.1 — the tier-qualified read answers the same value as the \
             unqualified one [{clause}]"
        );
    }
}

/// **`A59`'s two halves, driven for ONE caller literal.** `canonical_bytes` is the number's spelling in the
/// committed JSON text — the whole image of a one-key register is `{"root": <that spelling>}` — and
/// `canonical_value` is the value the canonical spelling carries.
///
/// **THE LABELS THIS HELPER'S ASSERTIONS CARRY, SO NEITHER HALF IS READ AS THE OTHER:** the IN-MEMORY half
/// is **BYTE-EXACT** (the value is the caller's parsed number, `A59` (b)); the ON-DISK half is
/// **EXACT-MODULO THE DECLARED NORMALIZATION** (`A59` (a): the value through the `file` tier and a boot is
/// the canonical spelling's value), and the SPELLING itself is asserted as the image's own bytes, whose
/// canonical RULE the ruling does not name (`A59`'s *"what it does NOT say"*).
fn spelling_drive(
    tag: &str,
    label: &str,
    value: StoreValue,
    canonical_bytes: &str,
    canonical_value: StoreValue,
    clause: &str,
) {
    let parsed = value.clone();
    in_memory_drive(label, value.clone(), &parsed, clause);
    let (live, bytes, booted) = file_image_drive(tag, value);
    assert_eq!(
        live,
        parsed,
        "case `{label}`: A59 (b) — the `file`-tier instance's OWN state is the PARSED NUMBER, untouched: \
         the normalization is a property of the FILE's IMAGE and not of the value the store holds [{clause}]"
    );
    assert_eq!(
        bytes,
        format!("{{\"root\":{canonical_bytes}}}"),
        "case `{label}`: A59 HALF (ii) — *normalize into file*: the `file` tier's committed JSON text \
         (`§7.2` item 1 `M-12`; `DD-2` lands it whole) spells the number in its CANONICAL form and NOT in \
         the caller's literal's form [{clause}]. The canonical spelling's RULE is not named by the ruling, \
         so this half pins the plain-decimal reading its own examples require."
    );
    assert_eq!(
        booted,
        canonical_value,
        "case `{label}`: A59 (a) — through the `file` tier's bytes and a fresh boot (`§7.2` item 6) the \
         read-back is the CANONICAL SPELLING'S VALUE: the round trip is EXACT-MODULO THIS DECLARED \
         NORMALIZATION [{clause}]"
    );
}

// **`A59` HALF (ii), CELL 1 OF 3 — the caller's JSON literal `1e2`.** `A59` names this spelling as one of
// *"the OTHER non-canonical spellings a JSON literal may take"* that *"are written in their canonical
// form"*. **`1e2` IS `100.0` at `§0.4`'s `Num(f64)` carrier** (`§1.4` class 3: *"a finite JSON number"* — the
// exponent form is a SPELLING and not a value), **so the IN-MEMORY half is BYTE-EXACT against `Num(100.0)`
// and the ON-DISK half is the canonical `100` in the image's bytes and `Num(100.0)` out of a fresh boot:
// here the two halves agree in VALUE and differ in SPELLING — the spelling is what the image declares.**
#[test]
fn e2e_num_spelling_1e2_is_canonical_in_the_file_image() {
    spelling_drive(
        "spell-1e2",
        "num.spelling.1e2",
        v_num(1e2),
        "100",
        v_num(100.0),
        "A59 (a)/(c); §7.2 item 1 M-12 + item 6; §1.4 class 3; §5.2 P-IM-1",
    );
}

// **`A59` HALF (ii), CELL 2 OF 3 — the caller's JSON literal `1.0`.** The same rule drives it: `1.0` is
// `Num(1.0)`, and the image's canonical form of that value is the plain-decimal `1` and not the literal's
// `1.0`. **The two halves agree in VALUE and differ in SPELLING.**
#[test]
fn e2e_num_spelling_1_point_0_is_canonical_in_the_file_image() {
    spelling_drive(
        "spell-1p0",
        "num.spelling.1.0",
        v_num(1.0),
        "1",
        v_num(1.0),
        "A59 (a)/(c); §7.2 item 1 M-12 + item 6; §1.4 class 3; §5.2 P-IM-1",
    );
}

// **`A59` HALF (ii), CELL 3 OF 3 — the caller's JSON literal `1E+2`.** **Stated plainly, because this
// literal is the one whose spelling does NOT survive the caller's own source text:** `1E+2` and `1e2` are
// the SAME `f64` (`100.0`), so at `§0.4`'s declared carrier the three literals `1e2`, `1E+2` and `100` are
// ONE value and the difference between them exists only in a JSON TEXT — of which this unit has none but
// the `file` tier's own image (`CF-1`). **The cell therefore asserts exactly what it can observe: the
// in-memory value is `Num(100.0)` (BYTE-EXACT), and the image's bytes carry the canonical `100` and a fresh
// boot reads `Num(100.0)` back (EXACT-MODULO THE DECLARED NORMALIZATION).**
#[test]
fn e2e_num_spelling_1e_plus_2_is_canonical_in_the_file_image() {
    let spelled: f64 = 1E+2;
    assert_eq!(
        spelled, 1e2,
        "the literals `1E+2` and `1e2` are ONE value at §0.4's Num(f64): the spelling a caller's JSON text \
         carried is not a state this surface can hold (CF-1 — no JSON-text entry point is declared)"
    );
    spelling_drive(
        "spell-1E+2",
        "num.spelling.1E+2",
        v_num(spelled),
        "100",
        v_num(100.0),
        "A59 (a)/(c); §7.2 item 1 M-12 + item 6; §1.4 class 3; §5.2 P-IM-1",
    );
}

// **`A59` HALF (ii) — A FRACTIONAL literal whose value is NOT a short decimal: `0.1`.** `A59`'s *"what it
// does NOT say"* cell records that the ruling **does not name the canonical spelling's RULE** — *"what a
// float is written as (`0.1`? `1e-1`? the shortest round-trip form? a fixed precision?)"* — and this cell is
// the one that drives that open half: `§1.4` class 3 admits a *"finite JSON number (integral or
// fractional)"*, and `0.1` is a repeating binary expansion (`1/3` and `pi` below are the same shape).
//
// **WHAT THIS CELL ASSERTS, AND WHICH HALF IS WHICH:**
//   * **IN MEMORY (`mem`, `temp`, and the `file` instance's own state): `Num(0.1)` EXACTLY — BYTE-EXACT, at
//     `§0.4`'s carrier** (`A59` (b): the sign and the spelling are untouched in memory);
//   * **THE IMAGE'S BYTES: the number's spelling is asserted as `0.1` — the shortest round-trip form — and
//     the fresh boot's read-back is asserted to be the SAME `f64` as the caller's literal**, i.e.
//     **EXACT-MODULO THE DECLARED NORMALIZATION**, with the normalization's rule UNNAMED (`A59`'s own
//     cell). **The value half of the on-disk reading is therefore asserted exactly at the carrier while the
//     SPELLING half pins the reading the ruling's own parenthetical names FIRST (`0.1`) — and if the
//     amendment names another rule, this cell is the one cell that must be re-derived to it.**
// **WHY THIS CELL CARRIES A TARGETED `#[allow(clippy::approx_constant)]`, AND WHY THE LINT IS DELIBERATELY NOT
// OBEYED.** **THE π LITERAL IN THE LOOP BELOW IS THE SUBJECT OF THE ASSERTION.** The loop writes each value,
// reads it back in the instance's own memory, reads the COMMITTED BYTES at `cfg.filePath`, and reads again
// through a FRESH BOOT of the same path, asserting at every step that the value is the caller's own `f64`
// (`A59` (a)/(b); `§7.2` item 1 `M-12` / item 6; `§1.4` class 3). **The array spells its floats on purpose: the
// cell's whole subject is that a float SPELLED as a literal — a repeating expansion (`1/3`), π's exact binary
// value, the smallest positive subnormal (`5e-324`) and a long-but-finite exponent (`1e-300`) — crosses the
// `file` tier and a boot unchanged, and `A59`'s declared normalization is a statement about exactly that
// spelling.** **`clippy::approx_constant` asks for `std::f64::consts::PI`, and obeying it would replace the
// subject of the assertion with a constant reference and defeat the cell.** The literal STAYS SPELLED, its
// value is UNCHANGED, every assertion stands, and the lint is silenced ON THIS CELL ALONE — not at crate or
// module scope, and for this cell's other float (`0.1`, above) nothing is silenced that was not already quiet.
#[allow(clippy::approx_constant)]
#[test]
fn e2e_num_spelling_zero_point_1_in_the_file_image() {
    spelling_drive(
        "spell-0p1",
        "num.spelling.0.1",
        v_num(0.1),
        "0.1",
        v_num(0.1),
        "A59 (a)/(c) — the canonical RULE unnamed, `A59`'s own *what it does NOT say*; §7.2 item 1 M-12 + \
         item 6; §1.4 class 3; §5.2 P-IM-1",
    );
    // **AND THE ROUTE `§1.4` class 3's OTHER REPEATING EXPANSIONS TAKE, DRIVEN SO THE SPELLING CELL ABOVE IS
    // NOT MISTAKEN FOR A PRECISION CLAIM:** `1/3` and `pi` are the same shape of value, and each round-trips
    // EXACTLY at the carrier (their spellings in the image are the shortest round-trip forms, which is the
    // only rule `A59` does not name).
    for (i, v) in [1.0 / 3.0, 3.141592653589793, 5e-324, 1e-300].into_iter().enumerate() {
        // the tag is an INDEX and not the value: `5e-324`'s own spelling is a 300-digit decimal, which is no
        // lawful filename — the drive's input is the value and never its text.
        let (live, _bytes, booted) = file_image_drive(&format!("spell-frac-{i}"), v_num(v));
        assert_eq!(
            live,
            v_num(v),
            "A59 (b): in memory the value is the parsed number, untouched (v = {v})"
        );
        assert_eq!(
            booted,
            v_num(v),
            "A59 (a): the round trip through the file tier and a boot is exact-modulo the declared \
             normalization, and for a non-integral value the canonical spelling carries the same f64 \
             (v = {v})"
        );
    }
}

// **`A60` — THE OUT-OF-BOUNDS REFUSAL, DRIVEN AT BOTH SIDES OF THE EDGE.** The value the architect ruled on
// is the JSON integer `9007199254740993` — **`2^53 + 1`** — the value `CF-3` found unrepresentable at
// `§0.4`'s `Num(f64)` carrier. **THE DRIVE NAMES ITS INPUT VERBATIM AND ITS CARRIER, BECAUSE THE CARRIER IS
// THE WHOLE FINDING:** at this surface `Num(f64)` CANNOT carry the literal (`9007199254740993u64 as f64 ==
// 9007199254740992u64 as f64`), so the ONE spelling that carries the EXACT integer to the store is
// `StoreValue::BigInt(i64)` — the declared spelling of an exactly-held integral value wider than `2^53`.
//
// **WHAT IS ASSERTED, HALF BY HALF:**
//   * **THE OUT-OF-BOUNDS VALUES (`2^53 + 1` and its NEGATIVE) ARE REFUSED `ValueNotAdmitted`** — the code
//     `§8.1` #14 / `§3.4` `F-2`, **the generated message of `§8.2`**, and **`§3.5`'s zero residue**: nothing
//     is installed, so the address does not resolve, the register is unchanged, and the in-bound neighbour
//     written at the SAME address afterwards round-trips exactly;
//   * **AND THE OBSERVATION THAT KEEPS THE TWO TRIGGERS FROM BEING READ AS ONE** (`A60`'s own *"what it does
//     NOT say"*: *"nor whether a caller can observe the refusal's TRIGGER (the value) as against its
//     code"*): **an IN-BOUND `BigInt` (`2^53`, `2^53 + 2`) is refused with the SAME code**, because `§1.4`
//     puts a `BigInt` outside the taxonomy at ANY magnitude. **So the code asserted here is the DECLARED
//     ANSWER for the out-of-bounds value AND the refusal's trigger is NOT distinguishable from its class by
//     the code alone — reported as a finding of this battery (see its record) and never as a reason to
//     weaken the assertion, which is the ruling's own answer either way.**
#[test]
fn e2e_num_out_of_bounds_at_the_carriers_exact_edge_is_refused() {
    // §0.4's carrier cannot hold the literal: the out-of-bounds value reaches this surface exactly once.
    assert_eq!(
        9007199254740993u64 as f64,
        9007199254740992u64 as f64,
        "the JSON integer 9007199254740993 (2^53 + 1) rounds IN THE CARRIER (CF-3), so no `Num(f64)` spelling \
         of it exists"
    );

    for (label, out_of_bounds) in [
        ("num.2^53+1", 9_007_199_254_740_993i64),
        ("num.-(2^53+1)", -9_007_199_254_740_993i64),
    ] {
        let mut store = new_store();
        let before = read_at(&store, &empty_address());
        let e = failure(
            store.write(
                AddressArg::List(key(&["v"])),
                w_mem(),
                StoreValue::BigInt(out_of_bounds),
            ),
            "A60 — *refuse out-of-bounds numbers*: the value is outside the carrier's exact range and is \
             refused rather than silently rounded",
        );
        assert_code(
            &e,
            "ValueNotAdmitted",
            "§8.1` #14's `ValueNotAdmitted`, narrowed to the f64-exact range by A60 — and it is `§3.4`'s \
             `F-2` member, NOT a new code and NOT a silent rounding",
        );
        assert_eq!(
            e.message, VALUE_NOT_ADMITTED_AT_V,
            "§8.2's generated form for `ValueNotAdmitted`: the `<mismatch clause>` (`is not an admitted \
             value`) composed with the `<available clause>` (the admitted taxonomy, printed whole). The \
             subject is the addressed value's own slashed spelling — the doubled quoting is the §8.2 \
             divergence already recorded at tests/properties.rs.",
        );
        // §3.5 — NOTHING IS INSTALLED: the register is byte-identical, and no node, anchor or version stands.
        assert_eq!(
            before,
            v_obj(&[]),
            "case `{label}`: the register is empty before the refused write"
        );
        assert_eq!(
            read_at(&store, &empty_address()),
            v_obj(&[]),
            "case `{label}`: §3.5 — a failed write leaves ZERO residue: the store's observable state after \
             the failure is IDENTICAL to its state before it"
        );
        let absent = failure(
            store.read(AddressArg::List(key(&["v"])), t(Tier::Mem)),
            "§2.2 L-3: the address the refused write named",
        );
        assert_code(
            &absent,
            "AddressNotFound",
            "§3.5 — no node and no child anchor was minted, so the address resolves to nothing at any tier",
        );
        // AND THE ADDRESS IS STILL FREE: the in-bound neighbour written there afterwards round-trips exactly.
        ok(
            store.write(
                AddressArg::List(key(&["v"])),
                w_mem(),
                v_num(9007199254740992.0),
            ),
            "§3.4 W-3: 2^53 is inside the f64-exact range A60 leaves admitted",
        );
        assert_eq!(
            read_at(&store, &key(&["v"])),
            v_num(9007199254740992.0),
            "§5.2 P-IM-1: the in-bound neighbour at the SAME address is admitted and exact — the refusal \
             installed nothing [{label}]"
        );
    }

    // **THE IN-BOUND `BigInt` OBSERVATION — the trigger is not separated from the class by the code.**
    for in_bounds_bigint in [9_007_199_254_740_992i64, 9_007_199_254_740_994i64] {
        let mut store = new_store();
        let e = failure(
            store.write(
                AddressArg::List(key(&["v"])),
                w_mem(),
                StoreValue::BigInt(in_bounds_bigint),
            ),
            "§1.4's outside list: a `BigInt`, at ANY magnitude",
        );
        assert_code(
            &e,
            "ValueNotAdmitted",
            "§1.4's outside list puts a `BigInt` outside the admitted set whatever its magnitude, so this \
             SAME code answers an in-bound `BigInt` — A60's own cell records that the trigger is not \
             observable as against the code",
        );
        assert_eq!(
            read_at(&store, &empty_address()),
            v_obj(&[]),
            "§3.5: nothing is installed for the in-bound `BigInt` either"
        );
    }
}

// **`A60`'s IN-BOUND NEIGHBOURS — THE OTHER SIDE OF THE EDGE, ROUND-TRIPPED EXACTLY AT EVERY TIER AND
// THROUGH THE `file` TIER'S OWN BYTES AND A BOOT.** `A60` narrows `§1.4` class 3's *"a finite JSON number"*
// to the f64-EXACT range; **`2^53 + 2` and `2^53 + 4` are ABOVE `2^53` and exactly representable, so the
// bound the ruling draws does not reach them** (the reading `A60`'s own example forces: `2^53 + 1` refused,
// its representable neighbours admitted — the `|n| ≤ 2^53` reading would refuse them and is not what the
// ruling's words say). **The negatives are driven beside the positives, because a bound read as
// `n ≤ 2^53` would let them through one-sidedly.** **Each drives `§5.2` `P-IM-1` at the declared carrier
// (`BYTE-EXACT` in memory) and the `file` route (`EXACT-MODULO the `A59` normalization`, which for an
// exactly-representable integral value leaves the value alone).**
#[test]
fn e2e_num_out_of_bounds_neighbours_round_trip_exactly() {
    for v in [
        9007199254740992.0,  // 2^53 — the edge itself
        9007199254740994.0,  // 2^53 + 2
        9007199254740996.0,  // 2^53 + 4
        -9007199254740992.0, // -(2^53)
        -9007199254740994.0, // -(2^53 + 2)
        -9007199254740996.0, // -(2^53 + 4)
    ] {
        let mut store = new_store();
        for tier in [Tier::File, Tier::Mem, Tier::Temp] {
            ok(
                store.write(AddressArg::List(key(&["root"])), t(tier), v_num(v)),
                "§3.4 W-3: an f64-exactly-representable integral value is inside A60's narrowed domain",
            );
            assert_eq!(
                read_tier(&store, &key(&["root"]), tier),
                v_num(v),
                "§5.2 P-IM-1 at {tier:?}: exact at the carrier (v = {v})"
            );
        }
        // …and the value's own spelling survives the file tier's bytes and a boot, exactly.
        let (live, bytes, booted) = file_image_drive(&format!("oob-nb-{v}"), v_num(v));
        assert_eq!(live, v_num(v), "A59 (b): in memory the value is untouched (v = {v})");
        assert_eq!(
            bytes,
            format!("{{\"root\":{v}}}"),
            "§7.2 item 1 M-12 / A59: an exactly-representable integral magnitude is written in its \
             canonical plain-decimal spelling, which for this value IS the value's own (v = {v})"
        );
        assert_eq!(
            booted,
            v_num(v),
            "§7.2 item 6 + A59 (a): the booted read-back is the same value — the declared normalization \
             moves a SPELLING and this spelling is already canonical (v = {v})"
        );
    }
}

// **THE LITERAL `9007199254740993` SPELLED AT `§0.4`'s `Num(f64)` CARRIER — THE OTHER HALF OF `CF-3`, NOW
// READ AGAINST `A60`.** The ruling refuses *"a number outside the carrier's exact range"*; **the number this
// literal IS at the carrier is `2^53`, which is INSIDE it** — the out-of-bounds integer never reaches the
// store as a number, because the rounding happens in the CALLER's own literal, before any store call. **So
// no refusal is owed for this spelling and this cell asserts the round trip instead: `A60`'s bound is a rule
// about the values a caller can HAND the store, and this spelling hands it `2^53`.** **It is asserted rather
// than assumed, so a reader cannot mistake the carrier's rounding for a store defect, and so a
// store that refused it would be caught.**
#[test]
fn e2e_num_the_literal_2_pow_53_plus_1_through_the_f64_carrier_is_in_bounds() {
    // THE INPUT, VERBATIM: the JSON integer 9007199254740993 (2^53 + 1), at §0.4's Num(f64) carrier. It is
    // written as the cast of the EXACT integer so the input's own value is named and not pre-rounded in the
    // source text; the value driven is the one the literal `9007199254740993.0` spells.
    let carried = 9007199254740993u64 as f64;
    assert_eq!(
        carried, 9007199254740992.0,
        "§0.4's carrier rounds the literal IN THE CALLER'S OWN VALUE (CF-3) — the store is handed 2^53, \
         which A60 leaves admitted"
    );
    let mut store = new_store();
    ok(
        store.write(AddressArg::List(key(&["v"])), w_mem(), v_num(carried)),
        "A60: the value the store is handed is INSIDE the f64-exact range, so the write is admitted",
    );
    assert_eq!(
        read_at(&store, &key(&["v"])),
        v_num(9007199254740992.0),
        "§5.2 P-IM-1: exact — the value the store holds is 2^53 and it round-trips byte-exactly"
    );
    let (live, bytes, booted) = file_image_drive("oob-carrier-2p53p1", v_num(carried));
    assert_eq!(live, v_num(9007199254740992.0), "A59 (b): in memory, the carrier's value, untouched");
    assert_eq!(
        bytes, "{\"root\":9007199254740992}",
        "§7.2 item 1 M-12 / A59: the image's canonical spelling of the value the store holds — the file \
         tier never spells the literal the caller typed, because it never held it"
    );
    assert_eq!(
        booted,
        v_num(9007199254740992.0),
        "§7.2 item 6: the booted value is the same 2^53 (the round trip through the file is exact here — \
         `A59`'s normalization moves a spelling, and 2^53's is already canonical)"
    );
}
