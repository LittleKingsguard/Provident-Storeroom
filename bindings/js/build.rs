// `bindings/js/build.rs` — **THE PER-TARGET LINK TREATMENT OF THE NODE-API FACADE**, and the least file that
// makes this crate link on the four declared targets Linux was hiding.
//
// **WHY A BUILD SCRIPT AT ALL, IN ONE PARAGRAPH.** `bindings/js/src/facade.rs`'s `extern "C"` block DECLARES
// the Node-API C functions (`napi_set_named_property`, `napi_set_element`, `napi_get_cb_info`, …) and calls
// them directly; **the Node host supplies those symbols AT RUNTIME, when it loads the `.node`.** Linux
// tolerates an undefined symbol in a shared object, so `libstoreroom_js_binding.so` links with every one of
// them unresolved and the defect is invisible on this machine. **macOS's `ld` and Windows' MSVC `link.exe`
// do not, which is why four of the matrix's five legs failed to link:**
//
//   darwin-arm64  "_napi_set_named_property", referenced from: …facade…Codec::set_member
//   darwin-arm64  ld: symbol(s) not found for architecture arm64
//   win32-x64     LNK2019: unresolved external symbol napi_set_element …  LNK1120: 23 unresolved externals
//
// **WHAT THIS FILE IS NOT, STATED SO IT IS NOT READ AS A WIDENING.** It is NOT a dependency, NOT a second
// path dependency and NOT a change to the facade: the manifest's own `[dependencies]` comment (`package.md
// §4.2` item 3 — *"the only dependency is the single path dependency on the store"*) stands byte-for-byte.
// This file emits LINKER arguments and fetches ONE import library. **Cargo finds it by the crate root's own
// `build.rs` name, so `bindings/js/Cargo.toml` is NOT edited and carries NO `build = ` key.** Its declared
// home is `docs/specs/storeroom-js/implementation-plan.md §1`'s build-surface row, whose parenthesised
// `build.rs` entry names the phases that may write it (`Q1`, `Q3`) — **and whose dated clause beside it
// declares that the tree carries no `build.rs`: THAT CELL IS MOVED BY THIS FILE AND IS NAMED IN THE
// IMPLEMENTER'S REPORT RATHER THAN EDITED HERE, because no pass of the build edits a contract.**

use std::env;
use std::fs;
use std::path::PathBuf;
use std::process::Command;

/// **THE DECLARED PIN OF THE WINDOWS IMPORT LIBRARY — `v24.11.0` (`Krypton`), READ FROM
/// `https://nodejs.org/dist/index.json`, WITH ITS IMPORT LIBRARY VERIFIED AT
/// `https://nodejs.org/dist/v24.11.0/win-x64/node.lib` (`HTTP/2 200`, `2,867,548` bytes).**
///
/// **THE PIN IS A DECLARED CHOICE AND NOT A GUESS, AND WHY ANY VERSION AT OR ABOVE THE FLOOR IS LAWFUL:
/// NODE-API IS ABI-STABLE.** The facade's highest-referenced class is `napi_get_value_bigint_int64`
/// (beside `napi_get_all_property_names`), both **Node-API version 6** — `Node 12.17.0` / `10.20.0`, and
/// this package's own `engines` floor is `Node 18.0.0` — **so the import library's version need not equal
/// any consumer runtime's: it need only EXPORT the `napi_*` symbols, and it names `node.exe` as the module
/// they are imported from.** The pin exists so that the Windows link input is a FIXED, reproducible byte
/// rather than whatever the runner image happens to carry.
const NODE_PIN: &str = "24.11.0";

fn main() {
    // A build-script edit is a link-affecting edit: re-run when THIS file changes.
    println!("cargo:rerun-if-changed=build.rs");

    // =============================================================================================
    // THE STAMP — the self-report's own value, read from the manifest at BUILD TIME.
    // `release.md §2.4` item 1 / `§6.10` item 1 / `docs/specs/storeroom-js/package.md §6.1` item 2:
    // THIS script reads `package.json` itself and emits the `cargo:rustc-env`-class directive
    // `STOREROOM_JS_PACKAGE_VERSION`, which `facade.rs`'s `addon_version` reads with
    // `option_env!(...)` and falls back from to `env!("CARGO_PKG_VERSION")` on the `None` arm alone.
    // **NO AMBIENT ENVIRONMENT VARIABLE IS CONSULTED** (`§2.4` item 1(iv)): the value comes from the
    // same build's own manifest, so the directive is a TRANSPORT and not a source.
    // **AND NO SEMVER VALIDATION IS ADDED** (`§6.10` item 4): the manifest's own reader is the
    // validator, and a second one here would mint a failure shape no clause declares.
    // =============================================================================================
    let manifest = env::var("CARGO_MANIFEST_DIR")
        .expect("CARGO_MANIFEST_DIR is set by cargo for every build-script invocation");
    // **THE CACHE HAZARD, CLOSED HERE RATHER THAN LEFT TO A LATER RUN** (`§6.10` item 5): without
    // these two triggers a warm `target/` re-emits the PREVIOUS stamp on a version bump that touches
    // no source file, and the artefact ships the previous version. The first is the ABSOLUTE path the
    // item requires, built from `CARGO_MANIFEST_DIR`; the second is the directive's own name.
    println!("cargo:rerun-if-changed={manifest}/package.json");
    println!("cargo:rerun-if-env-changed=STOREROOM_JS_PACKAGE_VERSION");
    // The manifest's own `version` field, as text: the LAST `"version"` key and the JSON string after
    // its colon. The last and not the first, because `optionalDependencies` pins the five platform
    // packages to the same value and a pin's own name carries the word — so the field this reads is
    // the field the main package declares, which is what the stamp's value must be.
    let declared = fs::read_to_string(format!("{manifest}/package.json"))
        .expect("bindings/js/package.json is the crate's sibling manifest and is readable");
    // **AND THE SLOT IS IDENTIFIED BY ITS OWN KEY, WITH ITS ABSENCE HELD AS A STATE THIS SCRIPT CAN
    // OBSERVE** (`parameter-semantics.md §5.1` outside value `(vii)`, clause `(E)` — *"it is a read that
    // produced no value at all"* — read with `release.md §6.10` item 2's parser-domain clause):
    // `rsplit_once` keeps the DOMAIN that clause declares — the RIGHTMOST literal occurrence of the
    // byte-sequence `"version"` — and answers `None` where the key is absent, which the total
    // `rsplit(..).next()` could not: a split iterator cannot answer absence, so with the key absent it
    // yielded THE WHOLE FILE TEXT and the colon it then took was THE FIRST COLON IN THE FILE — another
    // key's value. **THE ABSENT KEY IS THEREFORE A STATE THIS SCRIPT HOLDS AND NOT A PANIC.**
    //
    // **⟶ AND `release.md §6.10`'s NEIGHBOURHOOD CLAUSE (`:627`–`:650`), ITS ITEM `3`, OPERATIVE FROM
    // ITS OWN LINE, IS THE DECLARED REPAIR OF THE DEFECT THE GATE-4 ADVERSARIAL PASS FOUND AND THE
    // SUPERVISOR REPRODUCED.** The clause, verbatim, is the one the five-step locator clause's step
    // `(2)` is now read through: *"THE FIRST NON-WHITESPACE BYTE AFTER THE RIGHTMOST OCCURRENCE MUST BE
    // `:`, ELSE THE STATE IS `(N2)` AND THE BUILD ABORTS"*. **AND WHAT IT REPLACES, NAMED SO THIS IS
    // NOT A TASTE**: the withdrawn locator took THE FIRST COLON ANYWHERE IN THE TAIL — so over a
    // manifest whose key carried no colon of its own (`{ "name":"provident-storeroom", "version"
    // "0.1.2", "type":"module" }`) the colon taken was the NEXT KEY'S, the slot read `module`, and A
    // NEIGHBOURING KEY'S VALUE WAS STAMPED. **THE COLON IS NOW THE ONE THE KEY ITSELF INTRODUCES**,
    // standing at the tail's first non-whitespace byte and nowhere else; **WHITESPACE BEFORE IT IS
    // LAWFUL**, the clause's words being *"THE FIRST NON-WHITESPACE BYTE"* and its item `3` admitting
    // *"any run of whitespace bytes, including none"*. **AND THE RIGHTMOST-OCCURRENCE DOMAIN IS
    // UNMOVED** — this is the same `rsplit_once`, at the same step `(1)`.
    // **⟶ AND `release.md §6.10`'s NEIGHBOURHOOD CLAUSE (`:627`–`:650`), ITS ITEM `3`, VERBATIM:**
    // *"THE FIRST NON-WHITESPACE BYTE AFTER THE RIGHTMOST OCCURRENCE MUST BE `:`, ELSE THE STATE IS
    // `(N2)` AND THE BUILD ABORTS"*. **THIS IS THE WHOLE OF THE CORRECTION AND THE LEAST FORM OF IT:
    // THE BYTE CONSULTED IS THE ONE STANDING AT THE OCCURRENCE'S OWN END, AND NOT THE FIRST COLON
    // STANDING ANYWHERE IN THE TEXT AFTER IT** — which is what the withdrawn locator took, and how it
    // came to stamp a NEIGHBOURING KEY'S VALUE (over `{ "name":"provident-storeroom", "version"
    // "0.1.2", "type":"module" }` the colon taken was `"type"`'s and the slot read `module`).
    // **WHITESPACE BEFORE THE COLON IS LAWFUL**: the clause's own words are *"THE FIRST NON-WHITESPACE
    // BYTE"*, and its item `3` admits *"any run of whitespace bytes, including none"*. **AND THE
    // RIGHTMOST-OCCURRENCE DOMAIN IS UNMOVED** — this is the same `rsplit_once`, at the same step
    // `(1)`. **AND THE GATE STANDS WHERE THE COLON IS CONSUMED**, so no other colon survives it and
    // the split below can reach none.
    let rest = match declared.rsplit_once("\"version\"") {
        Some((_, tail)) => match tail.trim_start().as_bytes().first() == Some(&b':') {
            true => &tail[tail.len() - tail.trim_start().len()..],
            // `(N2)` — the key's own separator is not the first non-whitespace byte after its
            // occurrence: a colon belonging to ANOTHER KEY, or no colon at all standing in the tail,
            // **OR NO BYTE AT ALL WHERE THE TAIL IS EMPTY** — the class's degenerate member by the
            // clause's own words at `release.md` `:634` (*"no name is added to the four and none is
            // taken away"*), which the indexed read above could not reach: `as_bytes()[0]` panics on
            // the empty slice and would have aborted with an index-out-of-bounds prose instead of the
            // state's own message. **`.first()` ANSWERS `None` THERE AND THE STATE IS `(N2)`.**
            false => panic!(
                "bindings/js/build.rs: the version stamp's read aborted at state (N2) — NO COLON OF THE \
                 KEY'S OWN: the first non-whitespace byte after the rightmost `\"version\"` byte-sequence \
                 in the manifest is not `:`, so that occurrence introduces no value of its own. Either no \
                 colon stands anywhere after it, or the colon that stands there belongs to a NEIGHBOURING \
                 KEY and no value of this key's own is introduced. The manifest is \
                 bindings/js/package.json, the crate's sibling manifest, read at this build's own \
                 CARGO_MANIFEST_DIR. For the build to proceed it must declare a JSON version key whose \
                 value is a JSON string — a quoted semver such as the one this package already carries."
            ),
        },
        // `(N1)` — the key's byte-sequence is absent from the manifest text read whole.
        None => panic!(
            "bindings/js/build.rs: the version stamp's read aborted at state (N1) — ABSENT KEY: \
             the manifest text carries no `\"version\"` byte-sequence at all, so there is no slot to \
             read. The manifest is bindings/js/package.json, the crate's sibling manifest, read at \
             this build's own CARGO_MANIFEST_DIR. For the build to proceed it must declare a JSON \
             version key whose value is a JSON string — a quoted semver such as the one this package \
             already carries."
        ),
    };
    // **AT A SLOT THAT HOLDS NO STRING THE CARRIER ABORTS** (`§5.1` `(vii)` clause `(C)` is SUPERSEDED —
    // *"THE EMPTY STRING IS NOT AN ANSWER FOR ANY OF THESE STATES"* — and the four-step clause's steps
    // `(1)`/`(2)` with it: *"AT THESE STATES THE DIRECTIVE IS **NOT** EMITTED AND THE BUILD **FAILS**"*;
    // `release.md §6.10`'s four-arm clause: *"EACH PRODUCES ITS OWN ABORT RATHER THAN AN ANSWER: NO
    // DIRECTIVE IS EMITTED, NO ARTEFACT IS BUILT, AND NO STAMPED VALUE EXISTS AT ANY OF THE FOUR"*):
    // the slot's own value is CONSULTED FOR ITS SHAPE, and only a JSON string is a value this read can
    // carry — **AND WHERE IT IS NOT ONE, EACH OF THE FOUR STATES ABORTS WITH A MESSAGE CARRYING WHICH
    // STATE, `bindings/js/package.json`'S OWN PATH AS THE CARRIER READ IT, AND WHAT THE MANIFEST MUST
    // CONTAIN SO THE BUILD CAN PROCEED** (`release.md §6.10` `:569`, whose *"PROSE IS THE CARRIER'S"*).
    // **NO SUBSTITUTE VALUE IS EMITTED ON ANY OF THE FOUR PATHS.** **⟶ AND THE CLAIM THAT ONCE STOOD
    // HERE — *"so no neighbouring key's value is ever stamped"* — WAS FALSE OF THESE BYTES, AND IS
    // CORRECTED HERE RATHER THAN LEFT STANDING** (`release.md §6.10`'s neighbourhood clause, its item
    // `5`, which NAMES this comment as its own site and leaves the re-spelling to this file's author):
    // the slot below was taken by a whole-tail colon search, which over the manifest above took the
    // colon belonging to `"type"` and stamped `module`. **THE COLON IS NOW THE KEY'S OWN OR THERE IS NO
    // SLOT AT ALL**, which is what makes the claim true of these bytes.
    // **AND NO SEMVER VALIDATION STANDS HERE** (`§6.10` item `4`): the abort is for a SLOT HOLDING NO
    // STRING, so `"version": ""` and `"version": "banana"` are VALUES THAT WERE READ and the build
    // proceeds from both.
    //
    // **AND THE SPLIT BELOW IS ON THE COLON THE GATE HAS JUST ANSWERED**: it reads the carried text as
    // bounded by that colon (the five-step locator clause's step `(2)`), and the gate — standing one byte
    // BEFORE the separator rather than past it — is what answers that colon. **THE GATE NO LONGER
    // CONSUMES THE BYTE IT CONSULTED**, and that is the whole of the correction above: while it sliced at
    // `first_non_whitespace + 1` the colon was spent, `rest` began at the byte AFTER it, and the split
    // below therefore reached for a SECOND colon — over the real `bindings/js/package.json` that is
    // `description`'s and the stamp carried a NEIGHBOURING KEY'S VALUE on a well-formed manifest. **WITH
    // THE COLON KEPT, THE FIRST `:` IN `rest` IS THE KEY'S OWN BY ITSELF** — leading whitespace does not
    // hide it, whitespace being no colon — so the split takes the key's own separator and no other key's,
    // and every arm below stands exactly as it did. **AND WHETHER ANY COLON SURVIVES THE GATE BEYOND THAT
    // ONE IS BESIDE THE POINT**: `rest`'s first colon is the key's own at every state, so `Some((_, value))`
    // is reached exactly where the key introduced a separator and the value read is the one that separator
    // introduces. Its `None` arm stands where the gate has already answered the colon the key's own, so it
    // is `(N2)`'s single site in this file and mints no fifth state beside the four.
    let slot = match rest.split_once(':') {
        Some((_, value)) => match value.trim_start().strip_prefix('"') {
            Some(body) => match body.find('"') {
                Some(end) => &body[..end],
                // `(N4)` — the value begins with a quote and carries no further quote.
                None => panic!(
                    "bindings/js/build.rs: the version stamp's read aborted at state (N4) — \
                     UNTERMINATED VALUE: the rightmost `\"version\"` key's value begins with a quote \
                     and carries no further quote, so this manifest declares no complete JSON string \
                     for that key. The manifest is bindings/js/package.json, the crate's sibling \
                     manifest, read at this build's own CARGO_MANIFEST_DIR. For the build to proceed \
                     it must declare a JSON version key whose value is a JSON string — a quoted \
                     semver such as the one this package already carries."
                ),
            },
            // `(N3)` — the value's trimmed text does not begin with a quote: the non-string case,
            // and any other case whose head is not a quote.
            None => panic!(
                "bindings/js/build.rs: the version stamp's read aborted at state (N3) — NON-STRING \
                 VALUE: the rightmost `\"version\"` key's value, after leading whitespace, does not \
                 begin with a quote, so the slot holds no JSON string for this read to carry. The \
                 manifest is bindings/js/package.json, the crate's sibling manifest, read at this \
                 build's own CARGO_MANIFEST_DIR. For the build to proceed it must declare a JSON \
                 version key whose value is a JSON string — a quoted semver such as the one this \
                 package already carries."
            ),
        },
        None => panic!(
            "bindings/js/build.rs: the version stamp's read aborted at state (N2) — NO COLON OF THE \
             KEY'S OWN: the carried text after the rightmost `\"version\"` occurrence carries no colon \
             of that occurrence's own, so no value is introduced for that key. The manifest is \
             bindings/js/package.json, the crate's sibling manifest, read at this build's own \
             CARGO_MANIFEST_DIR. For the build to proceed it must declare a JSON version key whose \
             value is a JSON string — a quoted semver such as the one this package already carries."
        ),
    };
    // **THE ONE REMAINING PATH THAT ANSWERS AN EMPTY STRING IS A VALUE THAT WAS READ** (`§6.10` item
    // 3): `"version": ""` reaches this line as the carried value and is stamped as one, with no
    // fallback and no validation running from it — the four arms above never reach here, and the
    // four-path count of paths to a stamped empty value is `1` and is a read. **AND NO SEMVER
    // VALIDATION IS ADDED HERE** (`§6.10` item 4): the shape consulted above is the slot's own
    // string-or-not identity — what the read produced — and never a judgement of the value's form, so
    // `"version": "banana"` is stamped exactly as it was read. **AND NO FALLBACK RUNS FROM THIS
    // LINE** (`§5.1` `(vii)` clause `(D)`: the list stays closed at *"absent, unparseable, or
    // unreadable"*, and the four aborting states are a read that produced no value at all rather than
    // a member added to that list).
    let version = slot.to_string();
    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");

    let target_os = env::var("CARGO_CFG_TARGET_OS")
        .expect("CARGO_CFG_TARGET_OS is set by cargo for every build-script invocation");

    match target_os.as_str() {
        // =============================================================================================
        // macOS — THE FLAG PAIR EVERY macOS `.node` IS BUILT WITH.
        // `-undefined dynamic_lookup` tells `ld` to LEAVE the Node-API symbols undefined and let the
        // loading host resolve them at `dlopen` time, which is exactly the contract the facade relies on.
        // **`cargo:rustc-link-arg` reaches the `cdylib` AND the test binary** (the `rlib` arm that lets this
        // crate's own integration tests drive the crossing in-process carries the same unresolved symbols),
        // so both halves of the macOS leg link from these two lines and no third line is owed.
        // =============================================================================================
        "macos" => {
            println!("cargo:rustc-link-arg=-undefined");
            println!("cargo:rustc-link-arg=dynamic_lookup");
        }

        // =============================================================================================
        // Windows — THE IMPORT LIBRARY, FETCHED HERE BECAUSE MSVC HAS NOTHING TO LOOK UP.
        // `link.exe` reports `LNK2019` for each unresolved `napi_*` symbol and has no `dynamic_lookup`
        // equivalent, so BOTH artefacts this leg produces — the `.dll` and the test binary — need the same
        // import library named on the link line. Nothing on `windows-2022` carries it, so this branch
        // fetches the PINNED one into `OUT_DIR` and THEN emits the search path and the library name.
        // **A FAILED FETCH PANICS — THE BUILD FAILS LOUDLY — RATHER THAN LINKING NOTHING.**
        // =============================================================================================
        "windows" => windows_import_library(),

        // =============================================================================================
        // Linux (and every other target) — NOTHING, AND THE NO-OP IS THE HONEST STATEMENT OF IT.
        // This shared object links with the Node-API symbols undefined and the host resolves them at load
        // time; the matrix's two Linux legs are green on the tree before this file existed, and no flag
        // this branch could emit would change a byte of that. `build.rs` is invoked, matches nothing,
        // and emits only the `rerun-if-changed` above.
        // =============================================================================================
        _ => {}
    }
}

/// **THE WINDOWS ARM, AS ONE FUNCTION: FETCH THE PINNED `node.lib`, THEN NAME IT ON THE LINK LINE.**
fn windows_import_library() {
    let target_env = env::var("CARGO_CFG_TARGET_ENV")
        .expect("CARGO_CFG_TARGET_ENV is set by cargo for every build-script invocation");
    if target_env != "msvc" {
        panic!(
            "bindings/js/build.rs: the declared matrix's Windows leg is `win32-x64` \
             (`x86_64-pc-windows-msvc`) and only the MSVC toolchain can consume the pinned `node.lib` \
             import library. Target environment `{target_env}` is OUTSIDE the declared matrix and this \
             build script refuses to emit a link line it cannot honour rather than linking nothing."
        );
    }

    let target_arch = env::var("CARGO_CFG_TARGET_ARCH")
        .expect("CARGO_CFG_TARGET_ARCH is set by cargo for every build-script invocation");
    let dist_dir = match target_arch.as_str() {
        "x86_64" => "win-x64",
        "aarch64" => "win-arm64",
        "x86" => "win-x86",
        other => panic!(
            "bindings/js/build.rs: no Node distribution directory is declared for target architecture \
             `{other}`; `node.lib` is published for `win-x64`, `win-arm64` and `win-x86` only."
        ),
    };

    let out_dir = PathBuf::from(env::var("OUT_DIR").expect("OUT_DIR is set for every build script"));
    let dir = out_dir.join("node-import-library");
    fs::create_dir_all(&dir).expect("the build script's own OUT_DIR is writable");
    let lib = dir.join("node.lib");

    if !lib.exists() {
        let url = format!("https://nodejs.org/dist/v{NODE_PIN}/{dist_dir}/node.lib");
        let staged = dir.join("node.lib.partial");
        // `curl.exe` is present on the `windows-2022` image; a CROSS build from a POSIX host uses `curl`.
        let curl = if cfg!(windows) { "curl.exe" } else { "curl" };
        let fetched = Command::new(curl)
            .args(["-fsSL", "--retry", "3", "--retry-delay", "2", "-o"])
            .arg(&staged)
            .arg(&url)
            .status();
        match fetched {
            Ok(status) if status.success() => {}
            Ok(status) => panic!(
                "bindings/js/build.rs: fetching the pinned Node import library FAILED — `{curl}` exited \
                 {status} for {url}. The Windows link line needs this library; the build stops here rather \
                 than linking with nothing."
            ),
            Err(err) => panic!(
                "bindings/js/build.rs: fetching the pinned Node import library FAILED — `{curl}` could not \
                 be run ({err}) for {url}. The Windows link line needs this library; the build stops here \
                 rather than linking with nothing."
            ),
        }
        let len = fs::metadata(&staged).map(|m| m.len()).unwrap_or(0);
        if len == 0 {
            panic!("bindings/js/build.rs: the fetch of {url} produced an EMPTY file; refusing it.");
        }
        fs::rename(&staged, &lib).expect("the fetched import library is staged and renamed inside OUT_DIR");
        println!(
            "cargo:warning=bindings/js/build.rs: fetched the pinned Node-API import library \
             (node v{NODE_PIN}, {dist_dir}) — {len} bytes at {}",
            lib.display()
        );
    }

    println!("cargo:rustc-link-search=native={}", dir.display());
    println!("cargo:rustc-link-lib=node");
}
