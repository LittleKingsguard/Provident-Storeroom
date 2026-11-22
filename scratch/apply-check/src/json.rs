//! The JSON image of the `file` tier's state (`§7.2` `M-12`, `DD-2`): a compact encoder and a matching
//! decoder over `serde_json`.
//!
//! **⟶ AMENDED 2026-10-21 — THE CLAUSE THAT STOOD HERE IS CORRECTED, NOT DELETED.** **AS FILED IT READ:**
//! *"a compact encoder and a matching decoder, **with no dependency (the crate builds and tests offline)**."*
//! **THAT SENTENCE WAS THE RESIDUE OF THE 'NO DEPENDENCY' HALLUCINATION, and the architect has ruled it so,
//! verbatim:** *"Replace the hand-roll JSON with the crate, it's another legacy of the 'no dependency'
//! hallucination"*; and on the rule itself: *"I have explicitly clarified that it was a hallucination based
//! on a specific constraint that was only on the JS side."* **The clause was a JS-side constraint written
//! into this crate's manifest as prose and then read as though it governed this crate — the misreading this
//! project's own v4-delta flags at `S-2`.** **THIS MODULE NOW DEPENDS ON `serde_json`, declared in the root
//! `Cargo.toml`, whose own `:12` comment is corrected in the same pass.** **WHAT DOES NOT MOVE:** the module
//! stays its OWN module rather than being inlined into its call sites — the seam is what keeps the three
//! call sites unchanged — and its public API stays exactly the two `pub(crate)` functions below.
//!
//! **THE BYTES ARE A PERSISTENCE CONTRACT, SO `serde_json` IS USED WITH ITS DEFAULTS OVERRIDDEN WHERE THEY
//! DISAGREE WITH THE DECLARED IMAGE.** A store saved by this build must be readable by the build that
//! preceded it, and vice versa, for the same state. Three points are pinned:
//!
//! 1. **THE NUMBER SPELLING IS DECLARED, AND `serde_json`'S OWN FLOAT FORMATTER DOES NOT PRODUCE IT.**
//!    `seams-and-lifecycle.md §7.2` item 7(a) declares the rule: *"A NUMBER IS NORMALIZED ON THE WAY INTO THE
//!    FILE, and its canonical spelling is THE SHORTEST DECIMAL SPELLING THAT PARSES BACK TO THE SAME `f64`,
//!    WRITTEN IN POSITIONAL NOTATION — Rust's `f64` `Display` form, AND `Display` NEVER USES EXPONENT
//!    NOTATION: an integral carrier value takes no fractional part (`100`, never `1e2` and never `100.0`), a
//!    signed zero is written `0`, and a value whose shortest spelling WOULD need an exponent takes the
//!    POSITIONAL form instead — `1e300` is written as its 301-digit decimal, `5e-324` as its 326-character
//!    decimal, and `f64::MAX` as its 309 digits."*
//!    (`A59`; `DD-46` (a); `contract.md §5.2` `P-IM-1`'s scoped equality relation).
//!
//!    **⟶ AMENDED 2026-10-21 — THE CLAUSE'S EXPONENT HALF IS WITHDRAWN AND RE-SPELLED, NOT DELETED, AND
//!    THE FILE TIER'S COMMITTED BYTES DO NOT MOVE** (`docs/decisions.md` · `A142` (1); the architect's
//!    ruling, verbatim: *"Re-spell the clause"*). **AS FILED IT READ:** *"and a value whose shortest spelling
//!    needs an exponent takes it (`1e300`, `5e-324`)"*. **THAT HALF WAS FALSE AT THE BYTES: RUST'S `f64`
//!    `Display` NEVER USES EXPONENT NOTATION** — measured, `format!("{}", 1e300f64)` is a 301-digit decimal,
//!    `format!("{}", 5e-324f64)` is 326 characters and `format!("{}", f64::MAX)` is 309 digits — **and
//!    `canonical_number` HAS ALWAYS WRITTEN THE `Display` FORM VERBATIM, so the committed bytes never moved
//!    and do not move.** **WHAT STANDS UNMOVED: THE CLAUSE'S OWN AUTHORITY (`A59`; `DD-46` (a)), THE REST OF
//!    THE RULE AS QUOTED ABOVE, AND THE `serde_json` CONSEQUENCE BELOW** — the alternative the same ruling
//!    declined is the one that would have moved the bytes, exactly as the `write_str` alternative was
//!    declined the same day (`A141`).
//!
//!    **`serde_json`'s default formatter writes `1.0` as `1.0` and `1e16` as `1e+16`, where the declared
//!    form is `1` and `10000000000000000` — so the formatter is overridden, and `canonical_number` below is
//!    the ONE home of the rule.**
//! 2. **KEY ORDER IS DETERMINISTIC AND SORTED.** `StoreValue::Object` is a `BTreeMap` (`§0.4`), so a derive
//!    serialises it in sorted key order and the bytes are deterministic — the property `encode`'s own doc has
//!    always carried and the file tier's bytes depend on. **A `serde_json::Value::Object` would NOT be a
//!    safe substitute (its `Map` is `preserve_order`-dependent), so `StoreValue` is serialised DIRECTLY and
//!    no intermediate `Value` is ever built.**
//! 3. **AN OUTSIDE CLASS WRITES `null`.** `§1.4`'s outside classes are never stored, but `json_spelling` is
//!    reachable on them, so the `Serialize` impl's catch-all arm emits `null`.
//!
//! Only `§1.4`'s admitted classes are ever encoded — a `file`-tier state is built from admitted values
//! only — and the decoder is the exact inverse of the encoder.

use crate::value::StoreValue;
use serde::ser::{SerializeMap, SerializeSeq};
use serde::Serialize;
use serde_json::ser::Formatter;
use std::io::{self, Write};

/// Encodes an admitted value as compact JSON (objects in sorted key order, so the bytes are deterministic).
pub(crate) fn encode(value: &StoreValue) -> String {
    let mut out = Vec::new();
    let mut serializer = serde_json::Serializer::with_formatter(&mut out, Canonical);
    // The `Serialize` impl below is total over `StoreValue`: it either writes a value or reports a write
    // error from the sink. The sink is a `Vec<u8>`, whose `write_all` never fails, so an error here is not
    // a reachable class — but it is not `unwrap`ped away either: the `null` image is the honest answer for
    // "no value could be written", and it is the same answer the outside classes get.
    if value.serialize(&mut serializer).is_err() {
        return String::from("null");
    }
    String::from_utf8(out).unwrap_or_else(|_| String::from("null"))
}

/// Decodes the JSON this module encoded. Any malformed input is an error: the caller boots an empty store
/// from a file it cannot read (`§7.2` item 6 loads `cfg.filePath` *if the file exists*).
///
/// **THE UNIT ERROR TYPE IS PART OF THE SEAM AND IS KEPT.** `serde_json::Error` is mapped to `()`, so
/// `src/store.rs`'s boot arm — `if let Ok(StoreValue::Object(members)) = json::decode(&text)` — keeps
/// falling through to the no-load path on ANY failure, a non-object top level included.
pub(crate) fn decode(text: &str) -> Result<StoreValue, ()> {
    serde_json::from_str(text).map_err(|_| ())
}

/// **The declared canonical spelling of a finite `f64`** (`§7.2` item 7(a); `A59`; `DD-46` (a)): the
/// shortest decimal spelling that parses back to the same `f64`, **WRITTEN IN POSITIONAL NOTATION**, with
/// a signed zero written `0`.
///
/// **Rust's `f64` `Display` IS that form — it emits the shortest round-tripping decimal IN POSITIONAL
/// NOTATION, AND `Display` NEVER USES EXPONENT NOTATION** — with exactly ONE declared exception: it writes
/// a signed zero as `-0`, while item 7(a) declares that *"a signed zero is written `0`"*. So `0.0` (which is
/// the same comparison as `-0.0`) is spelled `0` and every other finite value is the `Display` form
/// verbatim.
///
/// **⟶ AMENDED 2026-10-21 — THE EXPONENT HALF OF THE SENTENCE ABOVE IS WITHDRAWN AND RE-SPELLED, NOT
/// DELETED, AND NO BYTE MOVES** (`docs/decisions.md` · `A142` (1); the architect's ruling, verbatim:
/// *"Re-spell the clause"*). **AS FILED IT READ:** *"it emits the shortest round-tripping decimal and takes
/// an exponent only where the shortest spelling needs one"*. **THAT HALF WAS FALSE AT THE BYTES: `Display`
/// NEVER TAKES AN EXPONENT** — measured, `format!("{}", 1e300f64)` is a 301-digit decimal,
/// `format!("{}", 5e-324f64)` is 326 characters and `format!("{}", f64::MAX)` is 309 digits, so a value
/// whose shortest spelling WOULD need an exponent takes the POSITIONAL form instead (`1e300` as its
/// 301-digit decimal, `5e-324` as its 326-character decimal, `f64::MAX` as its 309 digits). **THE
/// SIGNED-ZERO HALF STANDS UNMOVED, AND SO DOES THE ONE-HOME RULE: EVERY OTHER FINITE VALUE IS THE
/// `Display` FORM VERBATIM.**
///
/// **A NON-FINITE VALUE NEVER REACHES HERE:** it is an outside class (`NonFinite`), is never stored, and its
/// JSON image is `null` — the `Serialize` impl's catch-all arm emits that, not this function.
fn canonical_number(n: f64) -> String {
    if n == 0.0 {
        // `-0.0 == 0.0` is true, so this arm is the ONE declared normalization (`A59` (c) (b): a `file`-tier
        // `-0` reads back `0`, because only the committed bytes carry the spelling, while a `mem`/`temp`
        // `-0` keeps its sign by never being routed through this image).
        return String::from("0");
    }
    format!("{n}")
}

/// **The `serde_json` formatter this module installs, overriding exactly ONE method.** Every other method
/// keeps `serde_json`'s own behaviour — compact separators, `"` and `\` escaped, raw UTF-8 for other
/// non-ASCII, and the control characters escaped (`\b` · `\t` · `\n` · `\f` · `\r` as short escapes, every
/// other control character `< 0x20` as `\u00XX`) — **and only `write_f64` moves, and it moves because the
/// declared rule is not `serde_json`'s default.**
///
/// **⟶ AMENDED 2026-10-21 — THE BYTE CLAUSE THAT STOOD HERE IS CORRECTED, NOT DELETED** (`A141`). **AS
/// FILED IT READ:** *"compact separators, `\u00XX` control escapes, raw UTF-8 for other non-ASCII, and
/// `"`/`\` escaped — which is what the bytes this module has always produced."* **THE TRAILING CLAUSE WAS
/// FALSE, AND TWO CHARACTERS DISPROVE IT: THE PRE-SWAP CODEC'S OWN ENCODER ARMS WERE (CHARACTER → ITS
/// ESCAPE SPELLING) `"` → `\"` · `\` → `\\` · `\n` → `\n` · `\r` → `\r` · `\t` → `\t` · THEN
/// `c if (c as u32) < 0x20 => \u{:04x}` · ELSE THE CHARACTER ITSELF, RAW (`write_string`, at
/// `fc5f915^:src/json.rs`) — SO `U+0008` WENT OUT AS `\u0008` AND `U+000C` AS `\u000c`, WHILE `serde_json`
/// WRITES `\b` AND `\f` FOR THEM.** **AND THOSE ARMS ARE THE GROUND OF THE TWO-CHARACTER CLAIM, NOT THE
/// MEASUREMENT: THE PRE-SWAP CODEC ALSO WROTE `\n`, `\r` AND `\t` AS SHORT ESCAPES, EXACTLY AS `serde_json`
/// DOES, SO THE DEPARTURE FROM THE PRE-SWAP CODEC'S BYTES IS EXACTLY TWO CHARACTERS — `U+0008` AND
/// `U+000C`.**
///
/// **THE ESCAPE IMAGE, SPELLED OUT: `serde_json`'s OWN FIVE SHORT ESCAPES ARE `\b` (`U+0008`), `\t`
/// (`U+0009`), `\n` (`U+000A`), `\f` (`U+000C`) AND `\r` (`U+000D`); EVERY OTHER CONTROL CHARACTER (`< 0x20`)
/// IS WRITTEN `\u00XX`; `"` AND `\` ARE ESCAPED; AND EVERY OTHER NON-ASCII CHARACTER IS RAW UTF-8.** **THE
/// REST OF THE AS-FILED SENTENCE STANDS UNMOVED: THE ONE-METHOD COUNT, THE COMPACT SEPARATORS, THE ESCAPED
/// `"` AND `\`, THE RAW UTF-8 FOR OTHER NON-ASCII, AND THE `write_f64` MOVE.**
///
/// **AND THE CROSS-READ COMPATIBILITY, WHICH IS WHAT MAKES THE DEPARTURE SAFE, IS DECLARED AND NOT
/// ASSUMED: BOTH PARSERS ACCEPT BOTH SPELLINGS** — the pre-swap parser's own `parse_string` took `\b`/`\f`
/// and `\u0008`/`\u000c` alike, and this module's decoder takes both — **SO A FILE WRITTEN BY EITHER BUILD
/// LOADS ON EITHER BUILD, AND THE MODULE HEADER'S STANDING CLAIM — *"a store saved by this build must be
/// readable by the build that preceded it, and vice versa"* — IS TRUE AND IS NOT NARROWED BY THIS CLAUSE.**
///
/// **THE FILE FORMAT IS NOT BIT-STABLE ACROSS THE CODEC SWAP, AND THE TWO ESCAPE SPELLINGS ARE THE WHOLE
/// OF THE DIFFERENCE BETWEEN THE TWO ENCODERS' BYTES — AND THAT CLAIM IS ATTRIBUTED AND BOUNDED, ITS
/// GROUND BEING THE PRE-SWAP ARMS QUOTED ABOVE RATHER THAN THE MEASUREMENT ALONE.** **THE MEASUREMENT IS
/// THE COMPLIANCE REVIEW'S OWN AND ITS CORPUS RECORD IS `docs/defects.md` · `DEF-2026-10-21-E`: the review
/// rebuilt the pre-swap codec in a scratch worktree and byte-diffed it against this build at commit
/// `fc5f915`, and found `33` of `34` parity cases byte-identical, the one difference being these two
/// characters.** **WHAT HOLDS IS THE DECLARED PROPERTY, AND IT IS DETERMINISM: the file tier's bytes are a
/// DETERMINISTIC FUNCTION OF THE STATE.** **THE PRICED ALTERNATIVE — A `write_str` OVERRIDE, WHICH WOULD
/// HAVE RESTORED THE PRE-SWAP BYTES EXACTLY — WAS DECLINED, SO THE FORMATTER'S BEHAVIOUR IS EXACTLY AS IT
/// STANDS.**
///
/// **THE CORPUS HOME:** `docs/specs/storeroom-native/seams-and-lifecycle.md §7.2` item 7 (e) — the file
/// tier's escape image; **THE DECISION:** `docs/decisions.md` · `A141`; **THE DEFECT REGISTER:**
/// `docs/defects.md` · `DEF-2026-10-21-D` · `DEF-2026-10-21-E`; **THE CODE HOME:** this doc.
struct Canonical;

impl Formatter for Canonical {
    fn write_f64<W>(&mut self, writer: &mut W, value: f64) -> io::Result<()>
    where
        W: ?Sized + Write,
    {
        writer.write_all(canonical_number(value).as_bytes())
    }
}

/// **`§1.4`'s wire image** — the declared JSON spelling of every class: the five admitted ones and the
/// outside classes that are never stored but may reach `json_spelling` through `§8.2`'s
/// `ContainerKindConflict` message.
impl serde::Serialize for StoreValue {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        match self {
            StoreValue::Str(s) => serializer.serialize_str(s),
            StoreValue::Bool(b) => serializer.serialize_bool(*b),
            StoreValue::Num(n) => serializer.serialize_f64(*n),
            StoreValue::Object(members) => {
                // A `BTreeMap` iterates in sorted key order, so the emitted bytes are deterministic (this
                // module's `encode` doc) — the declared property the file tier's bytes depend on.
                let mut map = serializer.serialize_map(Some(members.len()))?;
                for (k, v) in members {
                    map.serialize_entry(k, v)?;
                }
                map.end()
            }
            StoreValue::Array(items) => {
                let mut seq = serializer.serialize_seq(Some(items.len()))?;
                for v in items {
                    seq.serialize_element(v)?;
                }
                seq.end()
            }
            // An outside class is never stored; `null` is its JSON image.
            _ => serializer.serialize_unit(),
        }
    }
}
