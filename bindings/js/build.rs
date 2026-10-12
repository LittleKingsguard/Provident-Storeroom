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
    let tail = declared
        .rsplit("\"version\"")
        .next()
        .expect("bindings/js/package.json declares a `version` field");
    let rest = tail
        .split_once(':')
        .expect("the `version` field is a key with a value")
        .1;
    let start = rest
        .find('"')
        .expect("the `version` field's value is a JSON string");
    let end = rest[start + 1..]
        .find('"')
        .expect("the `version` field's JSON string is terminated");
    // **AN EMPTY STRING IS A VALUE THAT WAS READ AND IS STAMPED AS ONE** (`§6.10` item 3): no fallback
    // and no validation runs from it, so nothing here tests the value's shape.
    let version = &rest[start + 1..start + 1 + end];
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
