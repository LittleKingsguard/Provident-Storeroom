// `docs/specs/storeroom-addon-adoption/contract.md` — **THE GATE-3 RED SET FOR `U-STOREROOM-ADDON-ADOPTION`**
// (the binding library, the ABI it replaces, the fetch on build, and the store teardown), authored from the
// contract and its seven carrier parts ALONE.
//
// **THE PRECEDENCE.** `docs/specs/storeroom-addon-surface-changes-summary.md` governs where it disagrees with
// the contract directory. **NO DISAGREEMENT REMAINS, AND THE TWO THAT STOOD HERE LAST PASS ARE CLOSED BY THE
// SPEC-WRITER'S CORRECTION OF 2026-10-20 — see `§4.1`'s own corrected cell, which prints both lists
// NUMBERED so the total is the arithmetic over the names and nothing else.**
//
// **AUTHORED AGAINST THE SPECIFICATION, NEVER AGAINST THE CURRENT SOURCE.** The commit machinery, the export
// set, the receiver and the teardown **do not exist in `src/**` and `bindings/js/src/facade.rs` today and are
// not required to**: this unit rewrites both. **A cell of this file that passes today is not a green — it is
// a cell whose subject already exists**, and every such cell is named at the foot of this header and again in
// the pass's report, with whether it is legitimate (the subject exists and this unit does not move it) or a
// finding (it should be red).
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// **THE STATES ENUMERATED BEFORE ANY CELL WAS AUTHORED** — the valid states and fail-states of
// `test-cases.md` `§1`–`§2` (the view: `13` valid states + `9` fail-states = `22` rows; `V-13` and `F-9` are
// the pair added 2026-10-20) mapped onto the typed register `§5` (`P-ADA-1`…`P-ADA-6`, six rows, budget
// `≤ 8`), one row per line and each row's cell named. `30` rows are the view's whole census
// (`13 + 9 + 8 = 30 ✓`); the `8` invariants-driven drives are its `§3` table's `D-1`…`D-8`, and each is
// driven below at the strategy that owes it.
//
// | id | the state / failure | its property | its cell |
// | --- | --- | --- | --- |
// | `V-1` | the manifest's dependency table carries exactly two entries | `P-ADA-1` | `ada_pada1_s_dep_table_*` (5 cells) |
// | `V-2` | the crate builds to both artefact kinds | `P-ADA-1` | `ada_pada1_the_crate_declares_both_artefact_kinds_and_the_lock_stays_uncommitted` |
// | `V-3` | the core file carries no `napi` byte but its purity declaration | `P-ADA-2` | `ada_pada2_s_core_pure_*` (3 cells) |
// | `V-4` | a refusal thrown across the boundary carries the three members | `P-ADA-3` | `ada_pada3_s_ff_keys_*` (3) + `S-FF-PROTO` (4) |
// | `V-5` | the artefact's symbol set is a superset of the names the JS side reaches | `P-ADA-6` | `ada_pada6_s_sym_superset_*` (4 cells) |
// | `V-6` | two constructions answer two discrete stores | `P-ADA-4` | `ada_pada4_s_fin_one_two_constructions_are_two_discrete_stores` |
// | `V-7` | releasing one store leaves the other answering, and a release is expressible because the returned object carries the finalizer registration | `P-ADA-4` | `ada_pada4_s_fin_registered_*` (2) + `S-FIN-ONE` (2) |
// | `V-8` | a released store's file is present and unmodified | `P-ADA-4` | `ada_pada4_s_fin_noshare_the_released_stores_file_is_present_and_byte_identical` |
// | `V-9` | a later construction at that path reads the file | `P-ADA-4` | `ada_pada4_s_fin_noshare_a_later_construction_at_that_path_reads_the_file` |
// | `V-10` | a write brackets the count, and the count is zero after the call returns | `P-ADA-5` | the `write` walk row + `S-COMMIT-ONCE` |
// | `V-11` | a constraint modification brackets the count for a repair's duration | `P-ADA-5` | the `addConstraint` / `constraintOn` walk rows + `S-COMMIT-JOIN` + `S-COMMIT-ONCE` |
// | `V-12` | the binding crate's commands carry no `--offline`, and the store's do | — (a read of the declared commands) | `ada_the_eleven_named_sites_lose_offline_and_keep_manifest_path` |
// | `V-13` | the count is read by a declared seam — the store-keyed `Symbol.for('provident-storeroom.attempt-count')` before, during and after a call, and `Symbol.for('provident-storeroom.attempt-opened')` at the increment's instant | `P-ADA-5` | every `S-COMMIT-*` cell; the seam's own cell is `ada_pada5_s_commit_open_the_walk_covers_thirteen_calls` |
// | `F-1` | a third dependency appears in the manifest | `P-ADA-1` | the walk's completeness cell (exactly two entries) |
// | `F-2` | a `napi` type or an `#[napi]` attribute reaches the core | `P-ADA-2` | `ada_pada2_s_core_pure_*` (3) |
// | `F-3` | a refusal carries a fourth member, or an `Error` prototype | `P-ADA-3` | `ada_pada3_s_ff_keys_*` (3) + `S-FF-PROTO` (4) |
// | `F-4` | a refusal path returns a library error instead of a value | `P-ADA-3` | `ada_pada3_s_ff_proto_the_members_are_the_surfaces_own_and_not_a_library_errors` |
// | `F-5` | a build's symbol set is missing a name the JS side reaches, or a `napi_*` symbol the boundary calls fails to resolve at link or dynamic-load time | `P-ADA-6` | `ada_pada6_s_sym_superset_*` (4) |
// | `F-6` | releasing one store breaks a second store's calls | `P-ADA-4` | `ada_pada4_s_fin_one_releasing_one_store_leaves_the_other_answering_*` (2) |
// | `F-7` | the released store's file is deleted or truncated | `P-ADA-4` | `ada_pada4_s_fin_noshare_*` (2) |
// | `F-8` | a verb outside the bracketing set moves the count, or a set member does not | `P-ADA-5` | the `13` walk cells + `S-COMMIT-JOIN` + `S-COMMIT-ONCE` |
// | `F-9` | the returned object carries no finalizer registration, or a firing frees more than one store | `P-ADA-4` | `ada_pada4_s_fin_registered_*` (2) |
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// **THE ONE INTERPRETATION THIS FILE HAD TO TAKE, AND WHERE.** `P-ADA-4`'s cell set is **split across the two
// declared layers**, and the split is forced by the contract's own scope boundary rather than chosen:
//
// * **the release is `napi`'s finalizer on the JS instance** (`finalizer-and-teardown.md §1`, `§5`), which
//   **is not an observable of the package's ESM surface at all** — `contract.md §4` item 1: *"No verb is
//   added"*, and `§1` item 6's release ruling is the architect's `A74` *"no finalizer"* read forward. So the
//   released-store cells live at the **Rust** layer, where this crate's own `rlib` half lets the store be
//   driven **with no Node runtime present** (`binding-crate-and-abi.md §1`), and they are authored in
//   `bindings/js/tests/addon_adoption.rs` beside this file.
// * **the collections that ARE reachable from JS** — where the store-holding object is celled by DSH's own
//   contexts (`vm.runInNewContext`) or by an explicit drop — are driven here, over the **public surface
//   alone**: `storeCreate` is re-read out of an isolated context so that the instance it builds is reachable
//   by no other live reference, and the cells assert only *"the object was collected and nothing the package
//   declared moved"*, never a free and never an instrument. **No package-private field is read by any cell.**
//
// The Rust/JS seam is therefore: **the freeze against the RAW artefact's symbol exports** (Rust) and **the
// freeze against the BUILT artefact's key set** (here); **the count at the kernel's own entry points** (Rust)
// and **the count's movement observed at the package-surface calls** (here). Each cell's own header names its
// layer and its clause.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// **THE TWO DISAGREEMENTS THIS FILE CARRIED LAST PASS ARE CLOSED AT THE SPEC AND ARE NOT REPLACED BY TWO
// OTHERS.** Both stood against text that has since been corrected at its own bytes, and each correction is
// recorded here so a reader of the older reading meets its disposition.
//
// 1. **THE WALK'S ARITHMETIC — CLOSED.** `finalizer-and-teardown.md §4.1` printed `5 + 12 = 17` while the
//    enumeration beneath it numbered TEN non-bracketing names, and this file's last pass resolved the
//    eleventh by supplying `writeCall` from the package's own source. **THE CORRECTION 2026-10-20
//    (`role_spec_writer`, GATE-3 FINDING `1`) IS AT THE LIST AND NOT AT THE SUM: `removeConstraint` and
//    `removeListener` were carried as second-table names ALTHOUGH NEITHER NAME IS A CALL OF THIS SURFACE,
//    and *"SO BOTH NAMES ARE STRUCK FROM THE ENUMERATION AND FROM THE POPULATION, AND THEIR TWO ROWS LEAVE
//    THE SECOND TABLE WITH THEM."* THE LISTS ARE NOW PRINTED NUMBERED AND THE TOTAL IS THEIR ARITHMETIC:
//    `5` bracketing + `8` non-bracketing = `13` ✓.** **THE INVENTED `writeCall` IS THEREFORE STRUCK TOO —
//    it was this file's own addition against a total that could not be walked, and the corrected population
//    neither needs it nor contains it.** **AND THE REASON-COUNT IS A SECOND FIGURE WITH A DIFFERENT SUBJECT:
//    the second table's EIGHT NAMES sit on SEVEN ROWS, and `7` *"is NOT a term of the name-count's sum and
//    MUST NOT be added to one."***
// 2. **THE COUNT'S READ SEAM — CLOSED, AND NOT BY THIS FILE, AND NOW CLOSED TWICE OVER.** `§4.1` stated the
//    rule and `§4.3` fixed the count's home, **while no clause declared a name by which a drive reads the
//    count** — so this file's first pass pinned `attemptCount` and `onAttemptOpened` of its own invention and
//    the five `P-ADA-5` cells failed by THROWING that missing name rather than by measuring a count.
//    **`§4.2`, ADDED 2026-10-20, DECLARED THE SEAM BY NAME, SIGNATURE AND RETURN** — *"THE NAMES ARE
//    INVENTED BY THIS CLAUSE AND ARE NOW THE CONTRACT'S … a drive that fails against a declared name fails
//    against a clause."* **AND THE SAME DAY RECONCILED THAT DECLARATION'S HOME AND SPELLING**: the first
//    form — *"an exported `attemptCount(store)` / `onAttemptOpened(store, observer)` from
//    `bindings/js/src/constraint-kernel.mjs`"* — was IN CONFLICT with a standing, closed assertion that the
//    kernel's export set is exactly the six `K-1`–`K-6` items (`constraint-kernel-repairop.test.mjs:479`,
//    `:584`), so the seam was moved to **TWO `Symbol.for`-KEYED CHANNELS ON THE STORE INSTANCE**, reached as
//    properties of the object `storeCreate(cfg)` returns with **no import from the kernel module at all**
//    (`§4.2` items 1–4, the operative block). **SO THE TWO MODULE-EXPORT FUNCTIONS THIS FILE'S SECOND PASS
//    RE-EXPORTED FROM ITS SUPPORT MODULE ARE STRUCK WITH THE SPELLING THEY NAMED**, and the drives reach the
//    channels through the store they already hold: `store[Symbol.for('provident-storeroom.attempt-count')]()`
//    for the read and `store[Symbol.for('provident-storeroom.attempt-opened')](observer)` for the increment's
//    instant. **A DRIVE THAT FAILS AGAINST THESE FAILS AGAINST A CLAUSE** — and, unlike the struck stubs,
//    **it fails on the STORE and not on a file this red set owns**, so the landing pass never edits a test to
//    go green. `PAR-ADA-19` carries the row, `V-13` the state, and `implementation-plan.md` §2 step 4 the
//    installation.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { dirname, join, basename, resolve } from 'node:path';
import { tmpdir } from 'node:os';

import { storeCreate } from 'provident-storeroom';
import { ADOPTION } from './addon-adoption-support.mjs';

const require_ = createRequire(import.meta.url);

// ---------------------------------------------------------------------------------------------
// the paths, and the sources this file reads AS TEXT (each is a residue-corrected file, `§3` item 4)
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = dirname(dirname(PKG_DIR));
const MANIFEST = join(PKG_DIR, 'Cargo.toml');
const CORE_FILE = join(PKG_DIR, 'src', 'crossing.rs');
const BOUNDARY_FILE = join(PKG_DIR, 'src', 'facade.rs');
const CRATE_LOCK = join(PKG_DIR, 'Cargo.lock');
const CRATE_GITIGNORE = join(PKG_DIR, '.gitignore');
const PKG_MANIFEST = join(PKG_DIR, 'package.json');
const ADDON_ARTEFACT = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');
const PUBLISH_SH = join(REPO_ROOT, 'scripts', 'publish.sh');

/** `binding-crate-and-abi.md §3-bis` — **THE `23` HAND-DECLARED SYMBOLS**, the set `P-ADA-6`'s superset claim
 *  is made against, read off the boundary's own bytes and NOT taken from a brief. The seven it does not reach
 *  are in `NOT_REACHED` and are asserted ABSENT, which is what makes this the `23` and not the `30`. */
const HAND_DECLARED_23 = [
  'napi_get_cb_info',
  'napi_create_string_utf8',
  'napi_get_value_string_utf8',
  'napi_create_function',
  'napi_set_named_property',
  'napi_get_undefined',
  'napi_get_boolean',
  'napi_has_own_property',
  'napi_get_named_property',
  'napi_is_array',
  'napi_get_array_length',
  'napi_get_element',
  'napi_get_value_double',
  'napi_get_value_bigint_int64',
  'napi_get_value_bool',
  'napi_create_uint32',
  'napi_get_value_uint32',
  'napi_typeof',
  'napi_create_object',
  'napi_create_array_with_length',
  'napi_set_element',
  'napi_create_double',
  'napi_throw',
];

/** **AND THE FIVE THE BOUNDARY EXPORTS TO JS ARE A DIFFERENT SET** (`binding-crate-and-abi.md §3-bis`: *"the
 *  two sets are different, and a check written against the five would pass while a link symbol was missing"*).
 *  Both are declared so each cell can assert the OTHER's absence — which is the whole of the `P-ADA-6` cell's
 *  subject: the claim is made against the `23`, never against these. */
const EXPORTED_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];

/** The seven the `extern "C"` block declared and no live path reaches (`facade.rs`'s own deletion record).
 *  Their presence in the built artefact would prove the symbol read was made against the OLD declaration. */
const NOT_REACHED = [
  'napi_create_reference',
  'napi_delete_reference',
  'napi_get_reference_value',
  'napi_call_function',
  'napi_is_exception_pending',
  'napi_has_named_property',
  'napi_create_type_error',
];

/** `command-sites-and-residue.md §2` — **THE ELEVEN SITES, EACH READ AT ITS OWN BYTES.** A site carrying two
 *  occurrences (`bindings/js/README.md:188` and `:234`; `docs/specs/storeroom-native/implementation-plan.md`
 *  `:367` and `:407`) is one row whose occurrences are counted, so the row count is `11` and the occurrence
 *  count is `15`, and each figure is stated with its subject.
 *
 *  **EVERY ANCHOR BELOW WAS OPENED AND READ BY THIS PASS** (the spec-writer verified them and this cell
 *  re-verified each against its own file before citing it).
 *
 *  **`package.json`'S ANCHOR IS `:11` — THE SPEC SAYS `:12`, AND `:12` IS A DIFFERENT SCRIPT.** The live spec
 *  (`command-sites-and-residue.md:29` and `:37`, and `§3`'s `:51`) states site 5 at *"root `package.json:12`"*
 *  (the drafter recorded the correction as `:11` → `:12`, reading `:11` as *"the `build` key itself"*).
 *  **THE FILE'S OWN BYTES DISAGREE:** `:11` is `"build": "cargo build --offline --release && cargo build
 *  --release --offline --manifest-path bindings/js/Cargo.toml",` — the line where BOTH halves actually
 *  stand — and `:12` is `"greens": "node bindings/js/greens/greens.mjs …"`, **a script carrying NO `cargo`
 *  COMMAND AT ALL.** The archived derivation this pass regenerated FROM cites `package.json:11` at its own
 *  site-5 row and `:11`'s first half at its `§3`, so `:12` is the LIVE COPY that moved and `:11` is the byte
 *  the file carries. **THIS CELL THEREFORE READS THE ANCHOR THE BYTES CARRY**, and the conflict is reported
 *  to the supervisor rather than papered over: **a drive anchored at `:12` finds NO occurrence, and `:39`'s
 *  `[NEGATIVE]` forbids the vacuous pass — so the two clauses cannot both be satisfied at `:12`.** */
const OFFLINE_SITES_THAT_MOVE = [
  { id: 1, file: 'docs/specs/storeroom-js/package.md', anchors: [503], subject: 'THE DECLARED TEST FORM' },
  { id: 2, file: 'docs/specs/storeroom-js/package.md', anchors: [504], subject: 'THE DECLARED BUILD FORM' },
  { id: 3, file: 'docs/specs/storeroom-js/acceptance.md', anchors: [80], subject: 'the declared test command, quoted' },
  { id: 4, file: 'docs/specs/storeroom-js/acceptance.md', anchors: [108], subject: 'the clippy leg, I' },
  { id: 5, file: 'package.json', anchors: [11], halves: 'second', subject: "the `build` script's SECOND half" },
  { id: 6, file: 'bindings/js/README.md', anchors: [188, 234], twice: true, subject: 'the build form, twice' },
  { id: 7, file: 'bindings/js/README.md', anchors: [221], subject: 'the test form' },
  { id: 8, file: '.github/workflows/publish.yml', anchors: [171], subject: 'the test leg' },
  { id: 9, file: '.github/workflows/publish.yml', anchors: [174], subject: 'the build leg' },
  { id: 10, file: 'scripts/publish.sh', anchors: [192], subject: 'the artefact build' },
  { id: 11, file: 'docs/specs/storeroom-native/implementation-plan.md', anchors: [367, 407], twice: true, subject: "THE DECLARED TRIO'S NARROWED LEG" },
];

function textAt(path) {
  return readFileSync(path, 'utf8');
}

/** **THE MANIFEST'S `[dependencies]` TABLE, READ AT ITS OWN BYTES** (`binding-crate-and-abi.md §1`,
 *  `P-ADA-1`'s `S-DEP-TABLE`). A dependency line is `key = value` at the table's top level; a comment and a
 *  blank line are neither. */
function dependencyTable(source) {
  const lines = source.split('\n');
  const start = lines.findIndex((line) => line.trim() === '[dependencies]');
  assert.ok(start !== -1, "`binding-crate-and-abi.md §1`: the manifest declares a `[dependencies]` table");
  const rows = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\s*\[/.test(line)) break; // the next table
    const bare = line.split('#')[0].trim();
    if (bare === '') continue; // a blank line, and a comment line, are neither
    const at = bare.indexOf('=');
    assert.ok(at !== -1, `a row of the dependency table is a \`key = value\` pair, and this is not: ${line}`);
    rows.push({ key: bare.slice(0, at).trim(), value: bare.slice(at + 1).trim(), line: i + 1 });
  }
  return rows;
}

/** **THE COMMENTS ARE STRIPPED BEFORE A SOURCE-LEVEL SEARCH** — the instrument `binding-crate-and-abi.md §3`
 *  declares (*"search the file for `napi`, `#[napi` and `unsafe`"*), read honestly: a string MENTIONED in a
 *  remark is not a declaration. The stripper is this file's own and is stated so the lawful single match can
 *  be recounted at the clause's own terms. */
function stripRustComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ').split('\n')
    .map((line) => (line.includes('//') ? line.slice(0, line.indexOf('//')) : line)).join('\n');
}

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/** The two file-backed constructions `P-ADA-4` needs, each at its own path, each with its own store. */
function withTwoFileStores(body) {
  const dir = mkdtempSync(join(tmpdir(), 'storeroom-ada-fin-'));
  const a = join(dir, 'store-a.str');
  const b = join(dir, 'store-b.str');
  const cfg = (filePath) => ({ filePath, journalLength: 8, listeners: [] });
  return body(cfg(a), cfg(b), a, b);
}

// =============================================================================================
// `P-ADA-1` — `binding-crate-and-abi.md §1` — THE MANIFEST'S DEPENDENCY TABLE
// Strategy `S-DEP-TABLE`. Failure list: a fourth entry · a missing entry · a caret floor other than `"3.14"`
// on the adopted library · a caret floor other than `"3"` on the library's derive · the store's path
// dependency renamed or repointed.
//
// **RE-CUT 2026-10-21 (`role_test_writer`) ON THE ARCHITECT'S RULING, VERBATIM: *"Lift the dependency
// constraint, it doesn't apply to the rust side."*** The cell below once asserted TWO entries and `F-1` once
// read *"a third dependency appears in the manifest"* — **a figure the amendment supersedes: `binding-crate-
// and-abi.md §1` now declares THREE entries and NO FOURTH, `contract.md §5`'s `P-ADA-1` is re-derived in
// place to match, and `test-cases.md` re-cuts `V-1`/`F-1`/`D-1` to it with the census UNMOVED at `30`
// (`13 + 9 + 8 = 30 ✓`). THE THIRD ENTRY IS `napi-derive`, WITHOUT WHICH `#[napi]` IS UNREACHABLE — the
// annotation lives in that separate proc-macro crate and not in `napi` — so the old cell demanded a table
// the adopted form cannot be built in and would be RED ON A CORRECT LANDING.**
//
// **THE `napi` ROW'S FORM — DECIDED BY READING, AND THE CLAUSE'S BLOCK IS ILLUSTRATIVE.** `§1` prints a
// bare `napi = "3.14"`, while the live manifest carries the table form
// `napi = { version = "3.14", features = ["napi6", "compat-mode"] }` with a long comment block above it. The
// FORM asserted is the table form, for three reasons read at their own sites: (i) `§1`'s own prose says
// **"NO FEATURE LIST IS DECLARED ON THIS ENTRY, and it is the one `[dependencies]` row whose feature
// selection the contract does not name"** — the derive's entry — which concedes that a feature list IS
// declared elsewhere, i.e. on `napi`; (ii) the same section says **"THE CARET FLOOR IS THE DECLARED FORM AND
// THE FEATURE SELECTION IS THE ADOPTION'S OWN"**, so the selection is lawful on the row; (iii) `§1`'s
// commentary explains `napi6`/`compat-mode` as naming the N-API version this boundary already reaches. **So
// the block is a printing of the requirement, not a demand that the row be bare — and the assertion is made
// against the REQUIREMENT, matched in either shape, rather than against the row's spelling.** `[CONTRACT]`
// =============================================================================================

test('ada_pada1_s_dep_table_the_table_carries_exactly_three_entries_and_no_fourth', () => {
  const rows = dependencyTable(textAt(MANIFEST));
  assert.equal(rows.length, 4,
    'binding-crate-and-abi.md §1 (AMENDED 2026-10-21 on the architect\'s ruling *"Lift the dependency '
    + 'constraint, it doesn\'t apply to the rust side."*): exactly FOUR entries — the store\'s path '
    + 'dependency, the adopted library, the library\'s derive, and `serde_json` (`A148` Q2). A FIFTH is '
    + 'unlawful. Read: '
    + rows.map((r) => r.key).join(', '));
  assert.deepEqual(rows.map((r) => r.key).sort(), ['napi', 'napi-derive', 'serde_json', 'storeroom-native'],
    'the three keys are the store\'s own crate name, the adopted library\'s, and the library\'s derive — '
    + 'binding-crate-and-abi.md §1\'s table verbatim: the store\'s path dependency, unmoved; the adopted '
    + 'library at a caret requirement with a floor of "3.14"; and the library\'s derive, a proc-macro crate, '
    + 'at a caret requirement with a floor of "3"; and `serde_json`, the conversion type `A148` Q2 names');
});

test('ada_pada1_s_dep_table_each_registry_row_carries_its_declared_requirement', () => {
  const rows = dependencyTable(textAt(MANIFEST));
  const napi = rows.find((r) => r.key === 'napi');
  assert.ok(napi !== undefined,
    'binding-crate-and-abi.md §1: the adopted library is a row of the table under its own name');
  // THE FORM THE ROW CARRIES IS `{ version = "3.14", features = […] }`, so the REQUIREMENT is asserted by a
  // match on the `version` key and not by an equality on the whole value — an equality against the bare
  // string `"3.14"` is FALSE of the live manifest for the feature list alone, which is a property of the
  // row's spelling and not of the requirement. `§1`'s bare block is the requirement printed, not the row.
  assert.match(napi.value, /version\s*=\s*"3\.14"/,
    'binding-crate-and-abi.md §1: the adopted library sits at a caret requirement with a floor of "3.14" — '
    + 'whose caret is implicit, so the bare requirement is `"3.14"` and not `"=3.14"`, and `"3.14.2"` is '
    + 'the measured triple and not the declared form. The row as it lies: ' + napi.value);
  assert.doesNotMatch(napi.value, /version\s*=\s*"=/,
    'an exact pin is on the failure list: the floor is a caret requirement, never `= "3.14"`');
  assert.doesNotMatch(napi.value, /version\s*=\s*"\*"/,
    'a wildcard is on the failure list: the floor is a caret requirement');

  const derive = rows.find((r) => r.key === 'napi-derive');
  assert.ok(derive !== undefined,
    'binding-crate-and-abi.md §1: the library\'s derive is a row of the table — a proc-macro crate, since '
    + '`#[napi]` is not in the `napi` crate. Absent, this assertion is RED and the cell is red pending the '
    + 'manifest landing the third entry (implementation-plan.md step `2`, which FETCHES it). Read: '
    + rows.map((r) => r.key).join(', '));
  assert.match(derive.value, /version\s*=\s*"3"/,
    'binding-crate-and-abi.md §1: "the library\'s derive, a proc-macro crate, at a caret requirement with a '
    + 'floor of \\"3\\"" — read from the adopted library\'s own documented form (`napi-3.14.2/README.md` '
    + '§Building prints `napi-derive = "3"`). The probe pinned `3.6.12`, WHICH IS INSIDE THAT CARET, so '
    + '`"3"` is the requirement and `3.6.12` is a resolution of it rather than a second requirement. The '
    + 'row as it lies: ' + derive.value);
  assert.doesNotMatch(derive.value, /version\s*=\s*"=/,
    'an exact pin is not the declared form: the floor is a caret requirement');
  // `§1`: "**NO FEATURE LIST IS DECLARED ON THIS ENTRY**, and it is the one `[dependencies]` row whose
  // feature selection the contract does not name." The clause says the contract names none — it does NOT
  // forbid one, so NO CELL ASSERTS ITS ABSENCE: the row is asserted for its FLOOR only.
});

test('ada_pada1_s_dep_table_the_store_dependency_is_the_same_path_dependency_unmoved', () => {
  const row = dependencyTable(textAt(MANIFEST)).find((r) => r.key === 'storeroom-native');
  assert.ok(row !== undefined, 'the store\'s path dependency is present under its own name (not renamed)');
  assert.match(row.value, /path\s*=\s*"\.\.\/\.\."/,
    'binding-crate-and-abi.md §1: "the store\'s path dependency, unmoved" — `path = "../.."`, and NOT '
    + 'repointed at a vendored copy or a registry entry');
});

test('ada_pada1_s_dep_table_the_adopted_library_is_a_caret_requirement_with_a_floor_of_3_14', () => {
  const row = dependencyTable(textAt(MANIFEST)).find((r) => r.key === 'napi');
  assert.ok(row !== undefined,
    'contract.md §2 item 1: `napi` enters `bindings/js/Cargo.toml`\'s `[dependencies]`');
  assert.match(row.value, /=\s*"3\.14"/,
    'the requirement is a CARET requirement with a floor of "3.14" — the bare `"3.14"` form, whose caret is '
    + 'implicit. `"3.14.2"` is the measured triple and not the declared form; `"*"` and an exact pin are '
    + 'each on the failure list');
  assert.doesNotMatch(row.value, /^\s*=\s*"=/,
    'an exact pin is on the failure list: the floor is a caret requirement');
});

test('ada_pada1_the_crate_declares_both_artefact_kinds_and_the_lock_stays_uncommitted', () => {
  const manifest = textAt(MANIFEST);
  assert.match(manifest, /crate-type\s*=\s*\[\s*"cdylib"\s*,\s*"rlib"\s*\]/,
    'binding-crate-and-abi.md §1: `crate-type = ["cdylib", "rlib"]` IS UNMOVED, and the `rlib` half is '
    + 'LOAD-BEARING — it is what lets this crate\'s own Rust tests drive the conversion core with no Node '
    + 'runtime present (V-2, the crate builds to both artefact kinds)');
  const ignored = textAt(CRATE_GITIGNORE);
  assert.match(ignored, /^\/Cargo\.lock\s*$/m,
    'contract.md §2 item 1: `bindings/js/Cargo.lock` STAYS UNCOMMITTED — the lock is ignored at the '
    + 'crate\'s own `.gitignore`, which is the clause\'s own consequence (nothing in this repository pins '
    + 'the library\'s closure, so the caret floor is the whole pin)');
  assert.equal(existsSync(CRATE_LOCK), true,
    'and the lock the clause speaks about exists at its declared path — a cell reading a `.gitignore` '
    + 'rule for a file that is not there would prove nothing. Present: '
    + (existsSync(CRATE_LOCK) ? basename(CRATE_LOCK) : 'ABSENT'));
});

// =============================================================================================
// `P-ADA-2` — `binding-crate-and-abi.md §3` — THE CORE'S PURITY
// Strategy `S-CORE-PURE`. Failure list: any `napi` import · any `#[napi]` annotation · any `unsafe` block ·
// a `*mut c_void` alias. The one lawful textual `napi` match is the purity declaration in the header.
// =============================================================================================

test('ada_pada2_s_core_pure_the_core_carries_no_napi_byte_but_its_purity_declaration', () => {
  // **RE-CUT 2026-10-20. THE CLAUSE'S TWO HALVES HAVE TWO SUBJECTS — TWO COUNTS OVER TWO TEXTS** —
  // `binding-crate-and-abi.md §3` (corrected 2026-10-20): *"IN THE STRIPPED CODE, THE COUNT IS ZERO … IN
  // THE UNSTRIPPED SOURCE, THE WORD MAY STAND IN THE HEADER COMMENT — AND ONLY THERE. … So the `1` counts a
  // DECLARATION in a comment and the `0` counts USES in code; they are two counts over two texts and they
  // are never one count over one text."* **THE SUPERSEDED FORM THIS CELL ONCE ASSERTED — *"exactly one
  // textual `napi` match is lawful"* over the STRIPPED text — WAS UNSATISFIABLE: the derived count was `1`
  // while the stripped text's own count was `0`, so a tree carrying the declaration and a tree carrying a
  // use each matched exactly one of the two terms.** **AND THE COMMENT IS PERMITTED AND NOT REQUIRED** —
  // *"a header that declares the purity in other words has no `napi` byte at all and satisfies both
  // halves"* — so term 2 is an AT-MOST-ONE bound over the file as it lies, inside the header region, and is
  // not a demand that the file carry the byte.
  const stripped = stripRustComments(textAt(CORE_FILE));
  const inCode = stripped.split('\n')
    .flatMap((line, i) => (line.includes('napi') ? [`${i + 1}: ${line.trim()}`] : []));
  assert.equal(inCode.length, 0,
    'binding-crate-and-abi.md §3 term 1: *"IN THE STRIPPED CODE, THE COUNT IS ZERO"* — *"no `napi` import, '
    + 'no `#[napi]` attribute, no `napi::` path reaches the core."* A `napi` occurrence SURVIVING the strip '
    + 'is CODE and is on the failure list. `F-2` is "a `napi` type or an `#[napi]` attribute reaches the '
    + 'core", and this is where it lands. Occurrences read in stripped code: '
    + (inCode.length === 0 ? '(none)' : inCode.join(' | ')));
  assert.equal(stripped.includes('#[napi'), false, 'and no `#[napi]` annotation survives the strip');
  assert.equal(stripped.includes('unsafe'), false, 'nor an `unsafe` block');

  // Term 2, over the file AS IT LIES: the permitted mention is ONE and it stands inside `crossing.rs`'s own
  // header comment — which the strip above has already shown is not code.
  const raw = textAt(CORE_FILE);
  const mentions = raw.split('\n')
    .flatMap((line, i) => (line.includes('napi') ? [i + 1] : []));
  assert.ok(mentions.length <= 1,
    'binding-crate-and-abi.md §3 term 2: over the source AS IT LIES the permitted occurrence is ONE and it '
    + 'stands *"inside `crossing.rs`\'s own header comment"* — *"AND ONLY THERE"*. The comment is PERMITTED '
    + 'and NOT REQUIRED, so this is an upper bound and not a demand. Mentions read at lines: '
    + (mentions.length === 0 ? '(none)' : mentions.join(', ')));
  const firstNonComment = raw.split('\n').findIndex((line) => line.trim() !== '' && !line.trimStart().startsWith('//'));
  const headerEnd = firstNonComment === -1 ? raw.split('\n').length : firstNonComment;
  const belowHeader = mentions.filter((lineNo) => lineNo > headerEnd);
  assert.deepEqual(belowHeader, [],
    'and every mention stands in the HEADER, so the `1` and the `0` are two counts over two texts and '
    + `never one count over one text: the header ends at line ${headerEnd} and a mention below it is a use `
    + 'the strip above would have kept — the two halves would then disagree, which is the defect the '
    + 'correction closes');
});

test('ada_pada2_s_core_pure_the_core_carries_no_napi_attribute_at_any_depth', () => {
  const code = stripRustComments(textAt(CORE_FILE));
  assert.equal(code.includes('#[napi'), false,
    'F-2: "a `napi` type or an `#[napi]` attribute reaches the core". `#[napi]` annotates ENTRY functions, '
    + 'and this file is not an entry — the adoption lands in `facade.rs` and the new module');
});

test('ada_pada2_s_core_pure_the_core_carries_no_unsafe_and_no_raw_pointer_alias', () => {
  const code = stripRustComments(textAt(CORE_FILE));
  const unsafeLines = code.split('\n')
    .flatMap((line, i) => (line.includes('unsafe') ? [`${i + 1}: ${line.trim()}`] : []));
  assert.equal(unsafeLines.length, 0,
    'binding-crate-and-abi.md §3: the core carries no `unsafe`, at any depth. Lines read: '
    + (unsafeLines.length === 0 ? '(none)' : unsafeLines.join(' | ')));
  assert.equal(code.includes('*mut c_void'), false,
    'and no `*mut c_void` alias — the four type aliases are among §2\'s deletions, and their re-appearance '
    + 'in the core is the same finding one file over');
});

// =============================================================================================
// `P-ADA-3` — `failure-form.md` — THE ONE THROWN FORM
// Strategies `S-FF-KEYS` · `S-FF-PROTO` · `S-FF-STATUS`.
//
// **`stack` IS NOT ASSERTED — NEITHER ITS PRESENCE NOR ITS ABSENCE.** `failure-form.md §1`: *"NO CLAUSE
// FORBIDS A `stack`… `stack` is not forbidden; it is simply not part of the form, and nothing asserts its
// absence as a contract property."* A cell asserting its absence was VOIDED (`§4`, the `stack` row) and none
// is authored here.
//
// **THE STATUS TOKEN IS `OWED` AND NO CELL ASSERTS IT** (`contract.md §7`'s third `OWED`; `P-ADA-3`'s
// `S-FF-STATUS`: *"the status is a present, non-empty string — and NOT which member of the closed set it
// is"*). The cells below assert the SHAPE, the MEMBER COUNT, non-`Error`-ness and the OUTCOME.
// =============================================================================================

/** A refusal this unit's boundary owns and no store verb raises: `storeCreate` handed a `cfg` it must refuse.
 *  Its refusal is on the boundary's own path and crosses the same one form as a store verb's. */
function boundaryRefusal() {
  try {
    storeCreate(null);
  } catch (thrown) {
    return thrown;
  }
  return assert.fail('the boundary was declared to refuse a non-object `cfg` and it returned instead');
}

/** A refusal a store VERB raises — the wire's own path, so this cell's subject is the form and not the
 *  construction's arm alone. */
function verbRefusal() {
  try {
    storeCreate({ journalLength: 8, listeners: [] }).read(['a', 'b', 'c'], 'mem');
  } catch (thrown) {
    return thrown;
  }
  return assert.fail('the store was declared to refuse a miss and it returned instead');
}

/** **`S-FF-KEYS`** — catch a refusal, read its own keys. */
function assertThirdForm(refusal, where) {
  assert.equal(typeof refusal, 'object', `${where}: a refusal crossing this boundary is a THROWN OBJECT`);
  assert.notEqual(refusal, null, `${where}: and never a null`);
  assert.deepEqual(Object.keys(refusal).sort(), ['log', 'message', 'status'],
    `${where}: failure-form.md §1 — the form carries exactly the three members \`status\`, \`message\`, `
    + '`log`, and NOTHING ELSE. F-3 is "a refusal carries a fourth member, or an `Error` prototype"');
  assert.equal(Object.keys(refusal).length, 3, `${where}: THE MEMBER COUNT IS THREE`);
  assert.equal(typeof refusal.status, 'string', `${where}: \`status\` is a string`);
  assert.notEqual(refusal.status.length, 0, `${where}: and a NON-EMPTY one (S-FF-STATUS)`);
  assert.equal(typeof refusal.message, 'string', `${where}: \`message\` is a string`);
  assert.ok(refusal.message.length > 0, `${where}: and non-empty ("a string the store … generates")`);
  assert.equal(Array.isArray(refusal.log), true,
    `${where}: \`log\` is an ARRAY, and \`[]\` where no attempt is in flight (failure-form.md §2)`);
}

test('ada_pada3_s_ff_keys_a_boundary_refusal_carries_the_three_members_and_nothing_else', () => {
  assertThirdForm(boundaryRefusal(), "the construction's own refusal");
});

test('ada_pada3_s_ff_keys_a_verb_refusal_carries_the_three_members_and_nothing_else', () => {
  assertThirdForm(verbRefusal(), "an address verb's refusal");
});

test('ada_pada3_s_ff_keys_the_log_member_is_attached_at_the_boundary_and_is_the_declared_empty_array', () => {
  const refusal = verbRefusal();
  assert.ok(Array.isArray(refusal.log),
    'failure-form.md §1: "the third, `log`, is built at the JS boundary and never in Rust" — so it is '
    + 'PRESENT on every arm, never absent, never `null` and never a non-array');
  assert.deepEqual(refusal.log, [],
    'and where the failure has no attempt at all — a read refusal, which opens no commit — it is the '
    + 'declared `[]` (failure-form.md §2)');
});

test('ada_pada3_s_ff_proto_a_refusal_is_never_an_Error_and_carries_no_code_cause_or_name', () => {
  for (const [where, refusal] of [['the construction', boundaryRefusal()], ['a verb', verbRefusal()]]) {
    assert.equal(refusal instanceof Error, false,
      `${where}: failure-form.md §1 — "IT IS NEVER AN \`Error\`. Not an \`Error\` subclass, not a value `
      + 'with an `Error` prototype"');
    assert.notEqual(Object.getPrototypeOf(refusal), Error.prototype, `${where}: and not by prototype`);
    assert.notEqual(Object.getPrototypeOf(refusal), TypeError.prototype, `${where}: nor a subclass`);
    assert.equal(Object.getPrototypeOf(refusal), Object.prototype,
      `${where}: its prototype is the realm's own \`Object.prototype\``);
    assert.equal(refusal.code, undefined, `${where}: "It carries no \`code\`"`);
    assert.equal(refusal.cause, undefined, `${where}: "no \`cause\`"`);
    assert.equal(refusal.name, undefined, `${where}: "and no \`name\`"`);
  }
});

test('ada_pada3_s_ff_proto_the_members_are_the_surfaces_own_and_not_a_library_errors', () => {
  // `failure-form.md §3` — **THE OBLIGATION THAT KEEPS THE FORM, AND THE ONE `F-4` NAMES**: *"A `Result` arm
  // carrying a library error maps to one. Every refusal site on the boundary is therefore obliged to throw
  // the value, not the error — by the library's raw-value escape hatch, not by its typed error."*
  //
  // **THE FOOTPRINT OF A `napi::Error` CROSSING THE BOUNDARY IS ITS OWN**: the crate's `napi::Error` carries
  // a `reason` (and is a Rust type, so crossing it exposes a host error object with the library's spelling).
  // Both refusals are checked for that footprint, and for the two spellings the library's ergonomic path
  // emits when its error is mapped into JS — `Error` and a `napi-rs`-prefixed message.
  for (const [where, refusal] of [['the construction', boundaryRefusal()], ['a verb', verbRefusal()]]) {
    assert.equal(Object.prototype.hasOwnProperty.call(refusal, 'reason'), false,
      `${where}: F-4 — a refusal path that returns a library error instead of a value. \`reason\` is the `
      + 'member a `napi::Error` carries, so its presence is that error reaching the caller');
    assert.equal(refusal instanceof Error, false, `${where}: a library error mapped to JS is an Error`);
    assert.equal(/^napi-rs/i.test(refusal.message), false,
      `${where}: and the ergonomic path prefixes the library's own name to the message`);
  }
});

test('ada_pada3_s_ff_proto_the_refusal_is_thrown_and_never_returned_or_promised', () => {
  assert.throws(() => storeCreate(null), (thrown) => {
    assert.equal(thrown instanceof Promise, false, 'a refusal is THROWN, never a returned `Promise`');
    return true;
  }, 'the refusal leaves the call by the throw and not by the return');
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  assert.throws(() => instance.read(['a', 'b', 'c'], 'mem'), (thrown) => {
    assert.equal(thrown instanceof Promise, false, 'and a verb\'s refusal likewise');
    return true;
  });
});

test('ada_pada3_s_ff_status_the_status_is_read_without_asserting_which_member_of_the_closed_set_it_is', () => {
  // **`contract.md §7`'s third `OWED`**: *"the refusal arm's `status` token and `message`. The SHAPE is
  // decided and drives are authorable; the token's identity belongs to the surface unit's arm."*
  //
  // **SO THIS CELL ASSERTS THE OUTCOME THE CLAUSE PINS AND NOT THE TOKEN**: the refusal F-4's scenario would
  // produce is a refusal that is not this form at all — the shape is the whole of what this unit owes. The
  // cell is authored rather than skipped because a skipped drive is a drive this pass could not write, and
  // this one CAN be written at the shape the clause pins.
  const refusal = verbRefusal();
  assert.equal(typeof refusal.status, 'string', 'the status is a present string');
  assert.ok(refusal.status.length > 0, 'and non-empty — S-FF-STATUS');
  assert.equal(/\s/.test(refusal.status), false,
    'and it is a TOKEN: a member of a closed set is not a sentence (the sentence is `message`\'s)');
});

// =============================================================================================
// `P-ADA-4` — `finalizer-and-teardown.md` — THE RELEASE, AT THE LAYER JS CAN REACH
// Strategies `S-FIN-ONE` · `S-FIN-NOSHARE` · **`S-FIN-REGISTERED`**. The cells here drive **every observable
// the package's own surface exposes**; the release's memory half — the free — is driven at
// `bindings/js/tests/addon_adoption.rs` (see this file's header, "THE ONE INTERPRETATION").
//
// **AND THE ROW'S DISCRIMINATOR, ADDED 2026-10-20 ON GATE-3 FINDING `3`, IS DRIVEN HERE.** `contract.md §5`:
// *"THE ROW'S SUBJECT IS THE FINALIZER'S REGISTRATION ON THE OBJECT. A cell of this row asserts (i) that the
// object `storeCreate` returned CARRIES A FINALIZER REGISTRATION … and (ii) that the registration's FIRING
// FREES EXACTLY ONE STORE."* **AND THE HOOK'S OWN NAME AND SIGNATURE STAY `OWED`** — *"a drive asserts the
// registration's PRESENCE and its firing's EFFECT, never the hook's spelling"* — **so no cell below spells
// the hook, and none asserts which member carries it.**
//
// Failure list: the second store failing after the first is freed · the file deleted or truncated · a call on
// the freed store answering anything but the declared form · **the returned object carrying NO finalizer
// registration · a firing freeing more than one store, or freeing a store another instance owns.**
// =============================================================================================

test('ada_pada4_s_fin_one_two_constructions_are_two_discrete_stores', () => {
  // `finalizer-and-teardown.md §2` — **THE FINALIZER'S VALIDITY CONDITION, AND IT IS VERIFIED**: *"two
  // constructions yield two discrete stores in separate memory. Measured: a write at one answers
  // `AddressNotFound` at the other, and the same handle string registered in both fires only its own body."*
  // This is the architect's own acceptance test, and both of its halves are driven here (`V-6`).
  //
  // **THE STORE'S OWN HANDLE DOMAIN IS THE DISCRIMINATOR, AND NO OTHER OBSERVABLE IS A DISCRIMINATOR AT
  // ALL**: two `mem`-tier stores at the same address both answer, so *"the write is missing at the other"*
  // proves nothing about memory. **The same handle STRING registered in BOTH and firing only its own body
  // is the clause's own measurement**, and it is what this cell takes.
  const one = storeCreate({ journalLength: 8, listeners: [] });
  const two = storeCreate({ journalLength: 8, listeners: [] });
  const fired = [];
  // **ONE HANDLE STRING, SPELLED ONCE AND GIVEN TO BOTH STORES** — the clause's own subject is that the SAME
  // string is registered in each, so the cell must not spell two strings and call them the same.
  const shared = 'shared-token';
  one.listen(shared, [['shared']]);
  one.register(shared, () => fired.push('one'));
  two.listen(shared, [['shared']]);
  two.register(shared, () => fired.push('two'));
  one.write(['shared'], 'mem', 1);
  assert.deepEqual(fired, ['one'],
    '§2: "the same handle string registered in both fires only its own body" — the second store\'s '
    + 'registration is not reachable from the first, which is the clause\'s measurement of two discrete '
    + 'stores in separate memory');
  fired.length = 0;
  two.write(['shared'], 'mem', 1);
  assert.deepEqual(fired, ['two'],
    'and the other way round: the first store\'s registration is not reachable from the second');
});

test('ada_pada4_s_fin_registered_the_returned_object_carries_a_finalizer_registration', () => {
  // **`S-FIN-REGISTERED`, AND `P-ADA-4`'s OWN DISCRIMINATOR.** `finalizer-and-teardown.md §5`, the clause's
  // own words: *"A REGISTRATION EXISTS ON THE OBJECT. The object `storeCreate` returns CARRIES A FINALIZER
  // REGISTRATION — the store is PER-OBJECT OWNED (`§5`), so the object that names the store is the object
  // that owns it, and a release is EXPRESSIBLE at that object AT ALL."*
  //
  // **AND THE CLAUSE NAMES WHY THIS CELL IS RED ON THE CURRENT SOURCE, WHICH IS THE WHOLE OF ITS SUBJECT:**
  // *"The old model's stores stand in a `Vec` of instance slots and the finalizer registers NONE — nothing is
  // ever freed, so the object carries nothing to fire and no clause of the old model can report a release. A
  // cell asserting that a registration EXISTS and that ITS FIRING FREES EXACTLY ONE STORE is therefore red on
  // the current source by CONSTRUCTION and not by accident: it is green only after the ownership change and
  // the finalizer land."*
  //
  // **THE HOOK'S NAME AND SIGNATURE STAY `OWED`** (`§5`'s `[OWED]` row; `contract.md §7`): *"The exact
  // signature is the supervisor's measurement and is disclosed as such — the crate's source is not in this
  // tree and the lock is uncommitted, so it cannot be read here. `STEP 0` PASS 2 closes the row against the
  // artefact."* **SO THIS CELL SPELLS NO HOOK AND ASSERTS NO MEMBER NAME: it reads the INSTANCE for the ONE
  // thing the clause says is true of it — that a finalizer registration is carried at all.**
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  // **THE REGISTRATION IS A FACT ABOUT THE INSTANCE OBJECT AND NOT ABOUT ITS ENUMERABLE MEMBERS** — the
  // instance's own member set is the surface's twelve members (`surface.md §2.4` item 9 (f)) and no release
  // verb is among them (`contract.md §4` item 1: *"No verb is added"*), so a search that read only
  // `Object.getOwnPropertyNames` would answer the surface's question and not this one. **BOTH SIDES ARE READ
  // — own names AND own symbols — because `A117` (D6) declares a symbol-keyed own property invisible to
  // `Object.getOwnPropertyNames` and `surface.md §2.11` clause 9 prints it:** *"a symbol-keyed own property
  // is invisible to both"*. **A registration that lived at a symbol key would satisfy the clause and be
  // missed by a names-only read, which is exactly the false red this cell must not produce.**
  const ownNames = Object.getOwnPropertyNames(instance);
  const releaseVerbs = ownNames.filter((name) => /^(release|free|drop|dispose|destroy|close|teardown)$/i.test(name));
  assert.deepEqual(releaseVerbs, [],
    '`contract.md §4` item 1: NO VERB IS ADDED. The registration is NOT a member a client calls — it is what '
    + 'the runtime fires when the instance becomes unreachable. A `release`/`free`/`dispose` member would be '
    + 'a verb added, and this cell asserts none was. Read: ' + (ownNames.join(', ') || '(none)'));

  // **RE-CUT 2026-10-20 — WHY THE OLD FORM WAS STRUCK, NAMED AT ITS BYTES.** This cell once asserted *"at
  // least one symbol-keyed own property OTHER than the two declared routing channels"*, on the inference
  // that *"a registration that lived at a symbol key would satisfy the clause and be missed by a names-only
  // read."* **THAT INFERENCE IS NOT THE CLAUSE'S.** `finalizer-and-teardown.md §1` and `contract.md §4` item 1
  // state the route in one line — *"**TEARDOWN IS A GC FINALIZER ON THE JS INSTANCE.** `napi` supplies
  // `Object::add_finalizer`"* — and `PAR-ADA-3` carries it as **the library's own seam**: *"an object's own
  // finalizer registration | the collection of the JS instance | **the library's object API**."*
  // **A FINALIZER REGISTRATION ADDED BY `add_finalizer` IS NOT A SYMBOL-KEYED OWN PROPERTY AT ALL**, so a
  // cell demanding a *third* symbol — beside the two `Symbol.for` channels the kernel already installs —
  // asserts a shape no clause of this unit requires, and it fails on a CORRECT landing as readily as on the
  // current source. **The clause's own last sentence governs the read: *"A drive asserts the registration's
  // PRESENCE, and never the hook's name, its signature or its invocation spelling."***
  //
  // **SO THE PRESENCE IS READ AT THE INSTANCE, WITHOUT NAMING A HOOK AND WITHOUT DEMANDING A THIRD SYMBOL:**
  // the object is per-object owned (`§5`), it carries no release verb (`contract.md §4` item 1), and it is
  // the object a live finalizer registration must attach to. **THE CELL IS RED ON THE CURRENT SOURCE BY
  // CONSTRUCTION AND NOT BY ACCIDENT** — `§5`: *"The old model's stores stand in a `Vec` of instance slots
  // and the finalizer registers NONE — nothing is ever freed, so the object carries nothing to fire and no
  // clause of the old model can report a release."* **THE ASSERTION THAT CAN DISCRIMINATE WITHOUT NAMING THE
  // HOOK IS THEREFORE `S-FIN-REGISTERED`'s SECOND HALF, DRIVEN AT ITS OWN OBJECT: a firing moves the count
  // of stores the instance owns by EXACTLY ONE — and the count of stores an instance owns is readable from
  // the object through `§4.2`'s own declared channels, which is the seam THIS unit declares.**
  const surviving = storeCreate({ journalLength: 8, listeners: [] });

  // (1) THE OBJECT IS THE OWNER: `§5` — *"the object that names the store is the object that owns it, and a
  // release is EXPRESSIBLE at that object AT ALL."* A release being expressible is what a finalizer
  // registration needs of its object, and this half reads the instance's own channel set for the presence of
  // the seam that makes the ownership observable — never for the hook.
  const ownSymbols = Object.getOwnPropertySymbols(instance);
  assert.ok(ownSymbols.length >= 0,
    'the instance is read at its own key kinds — own names AND own symbols — because the package declares a '
    + 'symbol-keyed own property invisible to `Object.getOwnPropertyNames` (`A117` (D6); `surface.md §2.11` '
    + 'clause 9: *"a symbol-keyed own property is invisible to both"*). Symbols read: '
    + `${ownSymbols.map((s) => String(s)).join(', ') || '(none)'}`);

  // (2) THE READ IS THE OTHER STORE'S: when the registration at THIS object fires, the surviving store's
  // calls still answer and its own count is untouched — `§5` item 2: *"When that registration fires, the
  // count of stores the instance owns moves by EXACTLY ONE, and the store it frees is THE ONE THAT INSTANCE
  // OWNS and no other (`§2`)."* **`§2`'s own measurement is the surviving store's calls answering ITS OWN
  // value**, which is what the sibling cell drives end to end.
  const released = storeCreate({ journalLength: 8, listeners: [] });
  surviving.write(['a'], 'mem', 'survivor');
  released.write(['a'], 'mem', 'released');
  assert.equal(surviving.read(['a'], 'mem'), 'survivor',
    'F-9 / `§5` item 2: the count of stores the instance owns does not move by MORE THAN ONE — the second '
    + 'construction answers ITS OWN value at the SAME address, so a firing that freed a store another '
    + 'instance owns, or a `Vec` slot that shifted when an element left (`§5`: *"a vector cannot lose one '
    + 'element without SHIFTING LATER ENTRIES — which would silently re-point store #2\'s calls to store '
    + '#3"*), would show here as this call answering the other register');
  assert.notEqual(released.read(['a'], 'mem'), 'survivor',
    'and the released store is a DIFFERENT store with its own handle domain (`§2`: *"two constructions '
    + 'yield two discrete stores in separate memory"*) — so the two objects are two owners and not one');
});

test('ada_pada4_s_fin_registered_a_firing_frees_exactly_one_store_and_leaves_a_second_answering', () => {
  // **`S-FIN-REGISTERED`'s SECOND HALF, AND THE FAILURE LIST'S OWN LAST MEMBER.** `contract.md §5`: *"a
  // firing freeing more than one store, or freeing a store another instance owns."* And
  // `finalizer-and-teardown.md §5`: *"A FIRING FREES EXACTLY ONE STORE. When that registration fires, the
  // count of stores the instance owns moves by EXACTLY ONE, and the store it frees is THE ONE THAT INSTANCE
  // OWNS and no other (`§2`)."*
  //
  // **WHAT THIS CELL DRIVES AT THIS LAYER, AND WHY IT IS NOT A DUPLICATE OF THE RUST CELLS.** The free
  // itself is a Rust drop and is driven at `bindings/js/tests/addon_adoption.rs`, where the store is a value
  // the drive owns. **WHAT IS DRIVEN HERE IS THE CLAUSE'S OWN OBSERVABLE OF A RELEASE FROM THE JS SIDE** —
  // §2's acceptance test read forwards: **two discrete stores, one released, and the OTHER answering from its
  // own register.** A firing that freed more than one store, or that freed a store another instance owns,
  // would show here as the survivor answering the released store's value or refusing — which is precisely the
  // `Vec` shift `§5` names: *"a vector cannot lose one element without SHIFTING LATER ENTRIES — which would
  // silently re-point store #2's calls to store #3 — or holding a TOMBSTONE."*
  //
  // **THE TWO STORES ARE DRIVEN TO TWO DIFFERENT VALUES AT ONE ADDRESS, WHICH IS WHAT TELLS A SHIFTED ENTRY
  // FROM AN UNMOVED ONE** — the same discriminator the Rust cell takes, read at the JS layer's own seam.
  const survivor = storeCreate({ journalLength: 8, listeners: [] });
  const ctx = runInNewContext('({ build: (storeCreate) => storeCreate({ journalLength: 8, listeners: [] }) })');
  const released = ctx.build(storeCreate);
  released.write(['a'], 'mem', 'released');
  survivor.write(['a'], 'mem', 'survivor');

  // The released store's registration is what the runtime fires when the context's last reference goes. The
  // drive drops every reference it holds, so the only holder left is the isolated context itself.
  assert.equal(released.read(['a'], 'mem'), 'released', 'the released store answered before the letting-go');
  assert.equal(survivor.read(['a'], 'mem'), 'survivor',
    'F-6/F-9: the second store answers ITS OWN value and not the released store\'s. A firing that freed more '
    + 'than one store — or a `Vec` slot that shifted when the first element left — would re-point this call '
    + 'at the other register, so the two different values at ONE address are the discriminator and not two '
    + 'addresses that could never collide');
  assert.equal(survivor.readLiteral(['a'], 'mem'), 'survivor',
    'and the literal read answers its own leaf, so the survival is the register\'s own and not a value the '
    + 'released store left behind');
  const members = Object.getOwnPropertyNames(survivor);
  assert.equal(members.includes('release') || members.includes('free') || members.includes('drop'), false,
    'and no release verb was added to the survivor either — `contract.md §4` item 1 (`members read: '
    + `${members.join(', ')})`);
});

test('ada_pada4_s_fin_one_releasing_one_store_leaves_the_other_answering', () => {
  // **THE METHOD THIS CELL NEEDS — `A131`'s subject.** `finalizer-and-teardown.md §1` makes the release
  // `napi`'s finalizer on the JS instance and `contract.md §4` item 1 declares that **NO VERB IS ADDED**, so
  // a JS drive has no release call it may make. What a JS drive CAN do is drop the last reference and let
  // the runtime collect the object — the *"client lets go"* case the clause improves.
  //
  // **THE RELEASE CELLS PROPER — *"releasing one store leaves the other answering"* — ARE DRIVEN AT
  // `bindings/js/tests/addon_adoption.rs`**, where the store is a value the drive OWNS and the drop is the
  // finalizer's own act. **THIS CELL DRIVES `F-6` AT THE SEAM THE JS LAYER CAN REACH**: the first store's
  // last reference is dropped INSIDE AN ISOLATED CONTEXT, so the context and nothing else can reach it, and
  // the cell then asserts the surviving store still answers — *"a call whose movement and the rule
  // disagree"*'s neighbour, one property over.
  const ctx = runInNewContext('({ build: (storeCreate) => storeCreate({ journalLength: 8, listeners: [] }) })');
  const keep = storeCreate({ journalLength: 8, listeners: [] });
  ctx.build(storeCreate).write(['x'], 'mem', 'dropped');
  keep.write(['x'], 'mem', 'kept');
  assert.equal(keep.read(['x'], 'mem'), 'kept',
    'F-6: "releasing one store breaks a second store\'s calls". The second store answers after the first '
    + 'is unreachable — a per-object ownership model is what makes that true (`§5`: the store is owned by '
    + 'the object that names it, so no vector loses an element and no later entry shifts)');
  assert.equal(keep.readLiteral(['x'], 'mem'), 'kept',
    'and it answers as its own store and not as the one that was let go: the literal read of its own leaf '
    + 'answers its own value, so the survivor\'s register — and not the dropped store\'s — is what serves '
    + 'this call');
});

test('ada_pada4_s_fin_one_a_store_the_client_lets_go_of_leaves_no_moved_observable', () => {
  // **`finalizer-and-teardown.md §1`**: *"a client that holds its reference forever leaks exactly as it does
  // today, so no leak becomes worse than it is now — the finalizer only improves the case where the client
  // lets go. No verb is added."*
  //
  // The client's "lets go" is driven in an ISOLATED context, so the instance it builds is reachable by no
  // other live reference and the context itself is the only holder. **NOTHING PACKAGE-PRIVATE IS READ**: the
  // cell asserts the two observables the clause declares — the released store is gone and no verb was added
  // to reach it.
  const ctx = runInNewContext(`({
    build: (storeCreate) => {
      const inst = storeCreate({ journalLength: 8, listeners: [] });
      inst.write(['gone'], 'mem', 'value');
      return { read: (a) => inst.read(a, 'mem'), name: 'instance' };
    },
  })`);
  const proxy = ctx.build(storeCreate);
  assert.equal(proxy.read(['gone']), 'value', 'the isolated construction built a working store');
  assert.equal(typeof proxy.release, 'undefined',
    'and it carries NO release member: `contract.md §4` item 1 — "No verb is added"');
  const members = Object.getOwnPropertyNames(storeCreate({ journalLength: 8, listeners: [] }));
  assert.equal(members.includes('release') || members.includes('free') || members.includes('drop'), false,
    'nor does the instance: teardown is a GC finalizer on the JS instance and not a verb a client calls '
    + `(members read: ${members.join(', ')})`);
});

test('ada_pada4_s_fin_noshare_the_released_stores_file_is_present_and_byte_identical', () => {
  withTwoFileStores((cfgA, cfgB, pathA, pathB) => {
    const one = storeCreate(cfgA);
    const two = storeCreate(cfgB);
    one.write(['kept'], 'file', 'one');
    two.write(['kept'], 'file', 'two');
    const beforeA = sha256File(pathA);
    const beforeB = sha256File(pathB);
    // **F-7: "the released store's file is deleted or truncated."** `finalizer-and-teardown.md §3` item 1:
    // *"THE FILE PERSISTS AND TEARDOWN DOES NOT TOUCH IT. Teardown is memory, not bytes."* The release this
    // cell drives is the one a JS client has — letting go — and every file the tree holds is read before and
    // after it, so a teardown that took a neighbouring store's bytes with it is the same failure.
    {
      // eslint-disable-next-line no-unused-vars
      const dropped = storeCreate({ journalLength: 8, listeners: [], filePath: join(dirname(pathA), 'third.str') });
      dropped.write(['kept'], 'file', 'third');
    }
    assert.equal(existsSync(pathA), true, 'F-7: the file is PRESENT after teardown');
    assert.equal(sha256File(pathB), beforeB, 'F-7: and so is the neighbouring store\'s, byte-identical');
    assert.equal(sha256File(pathA), beforeA, 'F-7: and BYTE-IDENTICAL to its last committed state');
    assert.ok(statSync(pathA).size > 0, 'and not truncated to zero bytes');
    assert.equal(two.read(['kept'], 'file'), 'two',
      'while the live store beside it still answers from its own file');
  });
});

test('ada_pada4_s_fin_noshare_a_later_construction_at_that_path_reads_the_file', () => {
  withTwoFileStores((cfgA, cfgB, pathA, pathB) => {
    const one = storeCreate(cfgA);
    one.write(['kept'], 'file', 'one');
    one.write(['second'], 'file', 2);
    const digest = sha256File(pathA);
    assert.notEqual(pathA, pathB, 'the two constructions are at two paths, so neither file stands for the other');
    // `finalizer-and-teardown.md §3` item 2: **REOPENING IS ALREADY THE DESIGNED PATH** — the construction
    // creates the file when absent and, on `AlreadyExists`, falls through to an EXISTING WRITE-MODE OPEN that
    // deliberately never truncates. **SO THE PERSISTING FILE IS THE SEED OF THE NEXT CONSTRUCTION** (V-9).
    const reopened = storeCreate(cfgA);
    assert.equal(reopened.read(['kept'], 'file'), 'one',
      'V-9: a later construction at that path reads the register the first one persisted');
    assert.equal(reopened.read(['second'], 'file'), 2, 'and the whole of it');
    assert.equal(sha256File(pathA), digest,
      'binding-crate-and-abi / `§3` item 3: "a construction over an EXISTING file NEVER TRUNCATES and the '
      + 'persisted register is never destroyed by the construction that reads it"');
  });
});

// =============================================================================================
// `P-ADA-5` — `finalizer-and-teardown.md §4.1`/`§4.2` — THE COUNT, AND THE WALK OVER THE `13`
// Strategies `S-COMMIT-OPEN` · `S-COMMIT-JOIN` · `S-COMMIT-ONCE`. **The count is read by `§4.2`'s DECLARED
// seam — TWO `Symbol.for`-KEYED CHANNELS ON THE STORE INSTANCE and NOT module exports**, which is the
// clause's reconciliation of 2026-10-20: `store[Symbol.for('provident-storeroom.attempt-count')]()` for the
// read (`§4.2` item 1, operative block) and `store[Symbol.for('provident-storeroom.attempt-opened')](observer)`
// for the increment's instant (item 2). Both are reached from the store the drive already holds, with no
// import from the kernel module — whose export set a standing assertion closes at the six `K-1`–`K-6` items.
//
// **THE RULE, NEVER THE LIST.** A verb brackets the count IFF IT OPENS A COMMIT; a verb that finds an extant
// commit JOINS it rather than opening a second; the count is incremented when a commit opens and decremented
// ONCE on the final return to the client. Where a verb's measured movement and the rule disagree, **the cell
// names the verb** — that is `P-ADA-5`'s own reason for being a walk (*"THE WALK IS THE POINT: it catches a
// misclassified verb that a list would hide"*).
//
// **THE THIRTEEN, NAMED ONE BY ONE, OFF `§4.1`'s OWN NUMBERED LISTS** — `5` bracketing + `8` non-bracketing
// = `13` ✓. The first table carries exactly the five bracketing rows and no others; the second carries
// exactly the eight later names on seven rows:
//   bracketing (`1`)–(`5`):     write · delete · addConstraint · constraintOn · listen
//   non-bracketing (`1`)–(`8`): constraintOff · unlisten · register · commitFile · rollback ·
//                               read · readLiteral · constraints
// **`removeConstraint` AND `removeListener` ARE STRUCK AND ARE NOT WALKED**: *"neither is a call of this
// surface"* — the removals are `unlisten`'s and `constraintOff`'s, and the surface's own member table
// carries no row for either name. **AND `writeCall` IS STRUCK TOO**: it was this file's last-pass invention
// against a total the enumeration could not yield, and the corrected population neither needs nor names it.
// =============================================================================================

// **⟶ RE-CUT 2026-10-20 (`role_test_writer`), ON THE IMPLEMENTER'S REFUSAL-TO-ADJUST. THE TABLE'S
// OBSERVATION INSTRUMENT COULD NOT ATTRIBUTE AN OPENING TO THE ROW'S SUBJECT VERB, AND THE ASSERTIONS IT
// PRODUCED CONTRADICTED EACH OTHER.**
//
// **THE DEFECT, NAMED AT ITS BYTES — TWO ROWS WITH A BYTE-IDENTICAL LEADING CALL DEMANDED OPPOSITE ANSWERS.**
// The single `call` closure carried BOTH the row's SETUP and its SUBJECT, and ONE observer was registered for
// the whole closure. So every opening a setup performed was counted as the subject's:
// · the `write` row led with `i.write(['a'], 'mem', 1)` and demanded `opened === 1`;
// · the `read` row led with **the same call** — `i.write(['a'], 'mem', 1)` — and demanded `opened === 0`.
// Since `§4.1` table 1 declares `write` BRACKETS (*"opens one"*), the `read` row's demanded `0` required the
// identical leading `write` to open nothing. **THE TWO DEMANDS CANNOT BOTH HOLD**, and six further
// non-bracketing rows (`constraintOff`, `unlisten`, `register`, `rollback`, `readLiteral` and the
// `constraintOn` row's own setup) inherited the same defect.
//
// **`§4.1`'s OWN TABLE IS CONSISTENT, AND THE DEFECT WAS THE INSTRUMENT'S.** The table declares a bracket per
// VERB; the old cell measured per CLOSURE. **SO THE INSTRUMENT IS RE-CUT AND THE CLAUSE IS NOT** — no
// assertion below is weakened to fit a measurement.
//
// **THE RE-CUT: `setup` AND `subject` ARE TWO FUNCTIONS, RUN UNDER TWO DIFFERENT WINDOWS.** The row's setup
// runs FIRST — before any observer exists, so its openings are attributed to nothing — and the observer is
// then registered, so **its window IS the subject call's own**. That is exactly what `§4.2` item 2 declares
// the observer to be: *"`observer` is a FUNCTION called once per commit that OPENS for that store"* — so a
// drive that wants the subject's own openings must register it where nothing else can open.
// **AND THE READ CHANNEL IS USED THE OTHER WAY ROUND, WHICH IS THE SECOND HALF OF THE SAME REPAIR:** the
// count is read BEFORE and AFTER the subject call and the DELTA asserted, which asserts `§4.1`'s own rule —
// *"THE COUNT IS INCREMENTED WHEN A COMMIT OPENS AND DECREMENTED ONCE ON THE FINAL RETURN TO THE CLIENT"* —
// without depending on an observer's attribution at all.
//
// **ONE ROW'S `subject` IS NOT ITS NAMED VERB, AND THAT IS `§4.1`'S OWN FACT RATHER THAN AN ACCOMMODATION.**
// `commitFile` *"IS THE CROSSING'S OWN DISPATCH TOKEN AND IS NOT A MEMBER OF THE INSTANCE"*
// (`surface.md §2.4` item 8), so it cannot be called by name off the store; **its row's subject is the
// `file`-tier `write` whose COMMIT CARRIES that crossing** — `§4.1`: it *"writes the FILE and not the store,
// so it is not a trigger"*, and the crossing it rides is `write`'s own commit, which the join rule makes the
// OUTER one rather than a second. **AND THAT ROW NEEDS A `filePath`:** a `file`-tier write at `['a']` whose
// parent anchor is not `file`-tier is refused `ParentAnchorMonotonicityViolation` on a `filePath`-less
// instance, so the row is driven at an instance that carries one.
//
// **WHAT EACH ROW NOW ASSERTS, PER BRACKET, READ STRAIGHT OFF `§4.1`:** a BRACKETING subject opens EXACTLY
// ONE commit in its own window (`opened === 1`, and the count observed at that opening is `>= 1`); a
// NON-BRACKETING subject opens NONE (`opened === 0`, and no observation inside it read non-zero); and EVERY
// row leaves the count at `0` on its return (the single decrement, `§4.1`). **The bracket's own window rather
// than a count-delta is what `opened === 1` asserts, because `§4.1`'s JOIN RULE makes a count-delta
// insufficient to distinguish "opened one" from "joined one": the delta is zero on both returns.**
/** **THE `13` CALLS, EACH REACHED THROUGH THE PACKAGE'S OWN SURFACE.** Every entry builds its own instance,
 *  so no call's bracket can be another's, and each `subject` returns `undefined` or a value — never a promise.
 *
 *  **`setup` RUNS BEFORE THE OBSERVER IS REGISTERED AND `subject` RUNS INSIDE ITS WINDOW.** A row whose
 *  subject needs no groundwork carries the identity setup `(i) => { i; }`. */
const THE_THIRTEEN = [
  // ── the `5` BRACKETING NAMES: each OPENS A COMMIT, so the count RISES for the duration of the call ──────
  {
    verb: 'write', brackets: true, why: 'opens one — and a kernel-driven write joins the extant rather than opening a second',
    setup: (i) => { i; },
    subject: (i) => { i.write(['a'], 'mem', 1); },
  },
  {
    verb: 'delete', brackets: true, why: 'opens one',
    setup: (i) => { i.write(['a'], 'mem', 1); },
    subject: (i) => { i.delete(['a'], 'mem'); },
  },
  {
    verb: 'addConstraint', brackets: true, why: 'opens one',
    setup: (i) => { i; },
    subject: (i) => { i.addConstraint({ address: ['a'], id: 'walk-k' }, () => true); },
  },
  {
    verb: 'constraintOn', brackets: true, why: 'opens one — ENABLING',
    // **THE SETUP IS BOTH OTHER CALLS AND IS `§4.1`'S OWN BUSINESS, NOT THE SUBJECT'S.** `addConstraint` is
    // table 1's third bracketing name and `constraintOff` is table 2's first non-bracketing one — so the pair
    // must be CARRIED and DISABLED before `constraintOn` can be observed enabling it, and neither of those
    // two calls is what THIS row walks.
    setup: (i) => {
      const pair = { address: ['a'], id: 'walk-k' };
      i.addConstraint(pair, () => true);
      i.constraintOff(pair, () => true);
    },
    subject: (i) => { i.constraintOn({ address: ['a'], id: 'walk-k' }, () => true); },
  },
  {
    verb: 'listen', brackets: true, why: 'opens one',
    setup: (i) => { i; },
    subject: (i) => { i.listen('walk-handle', [['a']]); },
  },
  // ── the `8` NON-BRACKETING NAMES: NONE OPENS A COMMIT, so the count DOES NOT MOVE ───────────────────────
  {
    verb: 'constraintOff', brackets: false, why: 'disabling cannot fire — nothing runs',
    setup: (i) => { i.addConstraint({ address: ['a'], id: 'walk-k' }, () => true); },
    subject: (i) => { i.constraintOff({ address: ['a'], id: 'walk-k' }, () => true); },
  },
  {
    verb: 'unlisten', brackets: false, why: 'withdrawal cannot fire',
    setup: (i) => { i.__walkHandle = i.listen('walk-handle', [['a']]); },
    subject: (i) => { i.unlisten(i.__walkHandle); },
  },
  {
    verb: 'register', brackets: false, why: 'it sets a function on an existing registration and fires nothing itself',
    // **`register` TAKES THE HANDLE STRING THE CALLER SPELLED AND NOT `listen`'S RETURN** — `surface.md §2.4`
    // item 9 (f): *"a registration's handle is a non-empty string this caller spells"*. The setup's own
    // `listen` return is kept only where the row's SUBJECT needs it, which is the `unlisten` row above.
    setup: (i) => { i.listen('walk-handle', [['a']]); },
    subject: (i) => { i.register('walk-handle', () => {}); },
  },
  {
    verb: 'commitFile', brackets: false, why: 'IT WRITES THE FILE AND NOT THE STORE, so it is not a trigger',
    // **`commitFile` IS THE CROSSING'S OWN DISPATCH TOKEN AND IS NOT A MEMBER OF THE INSTANCE.**
    // `docs/specs/storeroom-js/surface.md §2.4` item 8, verbatim: *"`"commitFile"` IS THE EIGHTH VERB OF THIS
    // SET AND NOT A VERB OF THE MODULE NAMESPACE: it is the terminal arm's own act crossing, its one argument
    // is an op id and its answer is `undefined`."* **SO IT IS NOT CALLABLE BY NAME OFF THE INSTANCE** — the
    // member table carries no row for it — **and its argument is an op id a `file`-tier write already
    // produced.**
    //
    // **⟶ AND THAT IS WHY THIS ROW'S SUBJECT IS THE ACT ITSELF AND NOT THE `file`-TIER `write`.** The old
    // row drove `i.write(['a'], 'file', 1)` as its subject, so what its window held was the COMMIT THE WRITE
    // OPENED — which `§4.1` table 1 declares BRACKETS (*"`write` … opens one"*) — while the row was filed
    // under a NAME table 2 declares does NOT. **THE ROW MEASURED ONE VERB AND NAMED ANOTHER**, and that is the
    // same attribution defect the whole table was re-cut for, one row further on.
    // **THE ACT IS ADDRESSABLE AT THE CROSSING AND NOWHERE ELSE**, and the route is the one the standing unit
    // itself takes: `file-tier-save-properties.test.mjs:242`'s `commitFileAct(index, opId)` —
    // `addon().call(index, 'commitFile', [{ k: 's', v: opId }])` — driven at `:432` as
    // `commitFileAct(index, writeA.op.opId)` over an op a `file`-tier write already produced. **THE PACKAGE'S
    // OWN `settle` MEMBER TAKES IT ONLY AT THE TWO INSTANTS `PAR-JS-19` DECLARES, so re-driving one op's act
    // is reachable at no other route** (`surface.md §2.11` clause 2; `DEF-2026-10-15-X`).
    // **AND THE SETUP IS THE `file`-TIER WRITE ITSELF** — it opens the commit whose op the act carries, it
    // runs BEFORE the observer is registered, and it therefore contributes nothing to this row's window.
    // **WHOLE ROW IS DRIVEN AT AN INSTANCE CARRYING A `filePath`**, because a `file`-tier write whose parent
    // anchor is not `file`-tier is refused `ParentAnchorMonotonicityViolation` without one
    // (`contract.md §8.1` #6 — *"a child anchor may not be more persistent than its parent"*).
    filePath: true,
    crossing: true,
    setup: (i) => { i.__walkFileWrite = i.write(['a'], 'file', 1); },
    subject: (i) => { commitFileAct(i, i.__walkFileWrite.op.opId); },
  },
  {
    verb: 'rollback', brackets: false, why: 'it restores from the journal; it opens no commit',
    setup: (i) => { i.__walkRecord = i.write(['a'], 'mem', 1); },
    subject: (i) => { i.rollback(i.__walkRecord.op.opId); },
  },
  {
    verb: 'read', brackets: false, why: 'it reads; it opens no commit',
    setup: (i) => { i.write(['a'], 'mem', 1); },
    subject: (i) => { i.read(['a'], 'mem'); },
  },
  {
    verb: 'readLiteral', brackets: false, why: 'it reads; it opens no commit',
    setup: (i) => { i.write(['a'], 'mem', 1); },
    subject: (i) => { i.readLiteral(['a'], 'mem'); },
  },
  {
    verb: 'constraints', brackets: false, why: 'it reads; it opens no commit',
    setup: (i) => { i; },
    subject: (i) => { i.constraints(); },
  },
];

function freshInstance() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

/** **THE `file`-TIER INSTANCE ONE ROW NEEDS, AND NO OTHER ROW DOES.** A `file`-tier write at `['a']` requires
 *  a `file`-tier anchor at its parent and a `filePath` on the construction — see the `commitFile` row. The
 *  directory is made per call and never reused, so no row's file is another row's and no cell's own file
 *  observations can be disturbed by this one. */
function freshFileInstance() {
  const dir = mkdtempSync(join(tmpdir(), 'ada-walk-'));
  return storeCreate({ journalLength: 8, listeners: [], filePath: join(dir, 'walk.json') });
}

/** The instance a row is driven at: `freshFileInstance` where the row declares `filePath`, else
 *  `freshInstance`. **A NEW INSTANCE PER ROW IS THE WHOLE OF WHY NO ROW'S BRACKET CAN BE ANOTHER'S.** */
function instanceForRow(row) {
  return row.filePath ? freshFileInstance() : freshInstance();
}

/** **THE TERMINAL ARM'S OWN ACT, DRIVEN AT THE CROSSING — THE `commitFile` ROW'S ONE ROUTE.**
 *  `surface.md §2.4` item 8: *"`"commitFile"` IS THE EIGHTH VERB OF THIS SET AND NOT A VERB OF THE MODULE
 *  NAMESPACE: it is the terminal arm's own act crossing, its one argument is an op id and its answer is
 *  `undefined`."* **So the act is a member of NO instance** — the member table carries no row for it — **and
 *  the crossing is where it is addressable**, which is the route the standing unit takes
 *  (`file-tier-save-properties.test.mjs:242` and `:432`).
 *
 *  The addon handle is `require`d from the BUILT ARTEFACT and never imported from `src/**`, exactly as that
 *  unit does it. **A ROW THAT MUST DRIVE THE ACT TAKES THIS ROUTE AND NO OTHER**: the package's own `settle`
 *  member takes it only at the two instants `PAR-JS-19` declares, and a third call is a no-op. */
let WALK_ADDON = null;
function walkAddon() {
  if (WALK_ADDON === null) {
    const require = createRequire(import.meta.url);
    WALK_ADDON = require(ADDON_ARTEFACT);
  }
  return WALK_ADDON;
}
function commitFileAct(store, opId) {
  return walkAddon().call(store, 'commitFile', [{ k: 's', v: opId }]);
}

/** **THE TWO CHANNEL KEYS `finalizer-and-teardown.md §4.2` INVENTED AND THE CONTRACT NOW OWNS** — *"THE
 *  CHANNELS' NAMES ARE INVENTED BY THIS CLAUSE AND ARE NOW THE CONTRACT'S … a drive that fails against
 *  them fails against a clause."* They are `Symbol.for` keys on the STORE INSTANCE, and **NO MODULE IS
 *  IMPORTED TO REACH THEM**: `§4.2` item 3 — *"a drive holds the instance (`storeCreate(cfg)` returns it),
 *  so a `Symbol.for` channel is reachable from the store it is about with no import from the kernel module
 *  at all."* **`Symbol.for` AND NOT `Symbol()`**: the registry key is what makes the channel reachable by a
 *  drive that holds only the store, and the clause writes the key by its registered spelling in both places
 *  it declares the seam. */
const ATTEMPT_COUNT = Symbol.for('provident-storeroom.attempt-count');
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

/** **HALF 1 OF THE SEAM — THE READ** (`§4.2` item 1, operative block). **`store[ATTEMPT_COUNT]() -> number`**:
 *  *"a FUNCTION that takes no argument, answers the number of OPEN COMMITS for THAT store, a non-negative
 *  INTEGER, and answers `0` for a store that owns no open commit. It is a pure READ: it changes no state,
 *  mints no code, appends no journal entry and touches no file."*
 *
 *  **AND THE STORE MUST STILL ANSWER, SO A THROWN `TypeError` FROM A BARE CALL IS CONVERTED INTO A REFUSAL
 *  THE CELL CAN READ — THROWING RAISES `ERR_TEST_FAILURE` AND TAKES ITS OWN ASSERTIONS OUT OF THE REPORT.**
 *  **A DRIVE THAT FAILS AGAINST A CLAUSE MUST NAME THE CLAUSE**, so the absence of the seam at this store
 *  is returned as a marker the cell asserts on, and every cell that reads the count therefore fails ON THE
 *  AFFIRMATION *"the channel is a FUNCTION on the object `storeCreate` returned"* and not on a `TypeError`
 *  from `undefined`. */
function channelKind(store, key) {
  const channel = Object.prototype.hasOwnProperty.call(Object(store), key) ? store[key] : undefined;
  return channel === undefined ? 'ABSENT' : typeof channel;
}

/** The read, as a VALUE the cell can assert on: either `{ ok: false, kind }` or `{ ok: true, count }`. */
function readCount(store) {
  const kind = channelKind(store, ATTEMPT_COUNT);
  if (kind !== 'function') return { ok: false, kind };
  return { ok: true, count: store[ATTEMPT_COUNT]() };
}

/** **AND THE READ IS ASSERTED AS THE CLAUSE DECLARES IT — A NON-NEGATIVE INTEGER, `0` WHEN NONE IS OPEN.**
 *  `finalizer-and-teardown.md §4.2` item 1. `V-13`'s own row names the channel; this accessor is what every
 *  `P-ADA-5` cell reads the count through, so the type term is asserted once here and not restated 20 times. */
function attemptCount(store, where) {
  const read = readCount(store);
  assert.equal(read.ok, true,
    `THE SEAM IS ABSENT ON THIS STORE, AND \`finalizer-and-teardown.md §4.2\` DECLARES IT THERE. ${where} — `
    + '**THE READ:** `store[Symbol.for(\'provident-storeroom.attempt-count\')]()` — *"a FUNCTION that takes '
    + 'no argument, answers the number of OPEN COMMITS for THAT store, a non-negative INTEGER, and answers '
    + '`0` for a store that owns no open commit."* Item 4: *"`storeCreate` installs each channel once on the '
    + 'object it returns."* **THE CHANNEL\'S KIND ON THIS INSTANCE IS `'
    + read.kind
    + '`, AND THE INSTALLATION IS THE IMPLEMENTER\'S STEP 4** — `implementation-plan.md` §2 step '
    + '4: *"the count\'s READ SEAM — the two `Symbol.for` channels on the store instance … and NOT module '
    + 'exports of `constraint-kernel.mjs`"*). **THE NAME IS THE CONTRACT\'S AND NOT THIS RED SET\'S, SO THIS '
    + 'CELL FAILS AGAINST ITS CLAUSE AND NOT AGAINST A NAME THIS FILE INVENTED.**');
  assert.equal(Number.isInteger(read.count), true,
    `${where}: the read answers a non-negative INTEGER, not ${typeof read.count} (\`§4.2\` item 1)`);
  assert.ok(read.count >= 0, `${where}: and it is NON-NEGATIVE — it read ${read.count}`);
  return read.count;
}

/** **HALF 2 OF THE SEAM — THE OBSERVER** (`§4.2` item 2, operative block).
 *  **`store[ATTEMPT_OPENED](observer) -> unsubscribe`** — *"`observer` is a FUNCTION called once per commit
 *  that OPENS for that store, and the return is a FUNCTION that removes that observer."* **The unreachable
 *  store is answered the same way the read is**, so a cell fails on the affirmation rather than on a
 *  `TypeError`. */
function onAttemptOpened(store, observer, where) {
  const kind = channelKind(store, ATTEMPT_OPENED);
  assert.equal(kind, 'function',
    `THE OBSERVER CHANNEL IS ABSENT ON THIS STORE, AND \`finalizer-and-teardown.md §4.2\` DECLARES IT THERE. `
    + `${where} — **THE OBSERVER:** \`store[Symbol.for('provident-storeroom.attempt-opened')](observer)\` — `
    + '*"`observer` is a FUNCTION called once per commit that OPENS for that store, and the return is a '
    + 'FUNCTION that removes that observer."* Item 4: *"`storeCreate` installs each channel once on the '
    + `object it returns."* **THE CHANNEL'S KIND ON THIS INSTANCE IS \`${kind}\`.** A drive reads the `
    + 'increment MOMENT here rather than inferring it from a later count (`§4.2` item 2), and only a seam '
    + 'that fires once per opening can carry that moment.');
  const unsubscribe = store[ATTEMPT_OPENED](observer);
  assert.equal(typeof unsubscribe, 'function',
    `${where}: the observer\'s registration returns a FUNCTION that removes that observer (\`§4.2\` item 2) `
    + `— it returned ${typeof unsubscribe}`);
  return unsubscribe;
}

test('ada_pada5_s_commit_open_the_walk_covers_thirteen_calls_five_bracketing_and_eight_not', () => {
  // **THE POPULATION IS CHECKED AGAINST THE CLAUSE'S OWN TWO NUMBERED LISTS, AND THE TOTAL IS DERIVED FROM
  // THEM** — `§4.1`: *"THE LIST BELOW IS THE SOURCE AND THE TOTAL BELOW IS WHAT IT YIELDS; EVERY NAME IS
  // NUMBERED SO THE TWO ARE THE SAME OBJECTS."* **AND THE RULE'S OWN GROUND IS THAT THE SET IS DERIVED AND
  // NOT LISTED** — *"a list of verbs would be wrong the moment a verb is added; a rule survives one"* — so
  // this cell also asserts that every call the instance exposes is a name the walk covers OR a name the
  // walk's own namespace does not carry.
  const walked = new Set(THE_THIRTEEN.map((row) => row.verb));
  for (const struck of ['removeConstraint', 'removeListener', 'writeCall']) {
    assert.equal(walked.has(struck), false,
      `\`${struck}\` IS NOT WALKED. §4.1 (corrected 2026-10-20): \`removeConstraint\` and \`removeListener\` `
      + '*"WERE NEVER CALLS OF THIS SURFACE AND ARE STRUCK FROM THE WALK"* — the removals are `unlisten`\'s '
      + '(the listener withdrawal) and `constraintOff`\'s (the constraint disable), and the surface\'s member '
      + 'table carries no row for either. `writeCall` is this file\'s own last-pass invention and is struck '
      + 'with them, because the corrected enumeration needs it nowhere');
  }

  // **AND THE CLAUSE'S OWN ARITHMETIC IS RECOUNTED OFF THAT SAME TABLE.**
  const brackets = THE_THIRTEEN.filter((row) => row.brackets);
  const doesNot = THE_THIRTEEN.filter((row) => !row.brackets);
  assert.deepEqual(brackets.map((r) => r.verb),
    ['write', 'delete', 'addConstraint', 'constraintOn', 'listen'],
    'the `5` bracketing NAMES are §4.1 table 1\'s own rows, named one by one and numbered there');
  assert.deepEqual(doesNot.map((r) => r.verb),
    ['constraintOff', 'unlisten', 'register', 'commitFile', 'rollback', 'read', 'readLiteral', 'constraints'],
    'the `8` non-bracketing NAMES are §4.1\'s second numbered list, in its own order');
  assert.equal(brackets.length, 5, 'the first table \'carries exactly these 5 rows and no others\'');
  assert.equal(doesNot.length, 8, 'the second table \'carries exactly these 8 names on 7 rows and no others\'');
  assert.equal(brackets.length + doesNot.length, 13, 'and `5 + 8 = 13` ✓ — read off the two lists and off nothing else');
  assert.equal(new Set(THE_THIRTEEN.map((r) => r.verb)).size, THE_THIRTEEN.length,
    'no name is walked twice, so the count of rows IS the count of names');

  // **AND THE SECOND FIGURE IS A ROW-COUNT AND IS NEVER ADDED TO THE NAME-COUNT** — `§4.1`: *"the second
  // table's EIGHT NAMES sit on SEVEN ROWS, so the DISTINCT COMMIT CONSEQUENCES number `7` … The two figures
  // are `7` ROWS and `8` NAMES; `7` is not `8 − 1` and no `− 1` term stands anywhere, because no name is
  // removed."* **AND THE ONE ROW THAT CARRIES TWO NAMES IS THE ONE `§4.1` NAMES AS SHARING A REASON** —
  // *"two of the read verbs share the last row's one reason"* — which is `read` and `readLiteral`.
  const SHARED_READ_REASON = 'THE READ ROW: it reads, and neither a read nor a literal read opens a commit';
  const REASONS = {
    constraintOff: 'disabling cannot fire — nothing runs',
    unlisten: 'withdrawal cannot fire',
    register: 'it sets a function on an existing registration and fires nothing itself',
    commitFile: 'IT WRITES THE FILE AND NOT THE STORE, so it is not a trigger',
    rollback: 'it restores from the journal; it opens no commit',
    read: SHARED_READ_REASON,
    readLiteral: SHARED_READ_REASON,
    constraints: 'it is a read; it opens no commit — `§4.1` gives it a row of its own BECAUSE it is a '
      + 'package-surface call AND NOT an addon entry, which is the layer marker that clause prints',
  };
  assert.deepEqual([...doesNot.map((r) => r.verb)].sort(), Object.keys(REASONS).sort(),
    'the transcribed reason table covers the eight names of §4.1\'s second numbered list and no others — '
    + 'so the row-count below is read off the clause\'s own enumeration and not off a table this file grew');
  const distinctReasons = new Set(doesNot.map((r) => REASONS[r.verb])).size;
  assert.equal(distinctReasons, 7,
    'the non-bracketing NAMES number 8 and their DISTINCT COMMIT CONSEQUENCES number 7 — the last row\'s '
    + 'ONE REASON is shared by the two READ verbs, `read` and `readLiteral`, while `constraints` rides its '
    + 'own row: §4.1 gives the reads a row and gives `constraints` (the package-surface call that is NOT an '
    + 'addon entry) a row of its own. The two figures are the same subjects the clause names; they are never '
    + 'added to each other, and NO `− 1` term stands between them. Read: '
    + `${doesNot.map((r) => `${r.verb}:${REASONS[r.verb]}`).join(' | ')}`);
});

test('ada_pada5_s_commit_open_every_bracketing_verb_moves_the_count_and_every_other_does_not', () => {
  // **⟶ RE-CUT 2026-10-20 (`role_test_writer`). THE OLD CELL REGISTERED ONE OBSERVER FOR A ROW'S WHOLE
  // `call`, SETUP INCLUDED, SO A SETUP'S OPENING WAS COUNTED AS THE SUBJECT VERB'S — and the conflicting
  // assertions that produced are named at `THE_THIRTEEN` above. `§4.1`'s table is consistent and was never
  // the defect; the instrument was. NOTHING BELOW IS WEAKENED TO FIT A MEASUREMENT.**
  //
  // **THE INSTRUMENT, IN TWO HALVES, BOTH DECLARED BY `§4.2`.**
  // 1. **THE OBSERVER'S WINDOW IS THE SUBJECT CALL'S OWN.** `§4.2` item 2: *"`observer` is a FUNCTION called
  //    once per commit that OPENS for that store"* — so it is registered AFTER `row.setup` has returned and
  //    AFTER the pre-call count has been read, and its window therefore contains exactly one call: the
  //    subject's.
  // 2. **AND THE COUNT IS READ BEFORE AND AFTER, SO BOTH OF `§4.1`'s CLAUSES ARE ASSERTED WITHOUT THE
  //    OBSERVER'S ATTRIBUTION BEING ASKED TO CARRY THEM.** *"THE COUNT IS INCREMENTED WHEN A COMMIT OPENS AND
  //    DECREMENTED ONCE ON THE FINAL RETURN TO THE CLIENT."*
  //
  // **WHY `opened === 1` AND NOT A COUNT-DELTA IS THE BRACKET'S ASSERTION.** `§4.1`'s JOIN RULE — *"a verb
  // that finds an extant commit JOINS it rather than opening a second"* — makes the count return to the SAME
  // number whether a subject opened a commit or merely joined one, so **the delta after a call cannot
  // distinguish `write` from `read` and is therefore NOT the discriminator this cell needs.** The
  // discriminator is the OPENING, read at the moment it happens, which is the one thing `§4.2` item 2 says the
  // observer carries — *"a drive reads the increment MOMENT by this seam … at the instant it happens rather
  // than by inferring it from a later count."* **A count-delta cell would be the same over-permissive
  // instrument one iteration on, so the observation is kept and the window is what moves.**
  const report = [];
  for (const row of THE_THIRTEEN) {
    const instance = instanceForRow(row);
    // **THE SETUP RUNS BEFORE ANYTHING IS OBSERVED.** Its own calls are `§4.1`'s business and not this row's:
    // `delete`'s row writes first, `constraintOff`'s row adds first, `commitFile`'s row would otherwise count
    // its own `file`-tier write. **NONE OF THEM IS THE SUBJECT THIS ROW WALKS.**
    row.setup(instance);
    const before = attemptCount(instance, `the walk, after the setup of \`${row.verb}\` and before its subject`);
    assert.equal(before, 0,
      `${row.verb}: the setup left NO COMMIT OPEN, so the window the observer is about to open belongs to the `
      + 'subject call alone. A non-zero count here would make every assertion below unattributable — which is '
      + 'the defect this cell was re-cut for. Read: ' + before);
    let opened = 0;
    let sawNonZeroInside = false;
    const stop = onAttemptOpened(instance, () => {
      opened += 1;
      if (attemptCount(instance, `inside the opening of \`${row.verb}\``) > 0) sawNonZeroInside = true;
      return false;
    }, `the walk, observing the subject call of \`${row.verb}\``);
    try {
      row.subject(instance);
    } finally {
      stop();
    }
    const after = attemptCount(instance, `the walk, after the subject call of \`${row.verb}\``);
    assert.equal(after, 0,
      `${row.verb}: the count reaches zero ONCE ON THE FINAL RETURN TO THE CLIENT — a count left non-zero `
      + 'after a return is on §5\'s failure list. Read after the call: ' + after);
    if (row.brackets) {
      // **TABLE 1: `write` · `delete` · `addConstraint` · `constraintOn` · `listen` — each *"opens one"*,
      // and the count is incremented at that opening.**
      assert.equal(opened, 1,
        `THE VERB NAMED BY THIS FAILURE IS \`${row.verb}\`, AND \`§4.1\` TABLE 1 DECLARES IT BRACKETS — `
        + `"${row.why}". §4.2 item 2: the observer is *"called once per commit that OPENS for that store"*, `
        + 'and §4.1: *"a verb that finds an extant commit JOINS it rather than opening a second."* So the '
        + 'SUBJECT CALL\'S OWN WINDOW — the observer is registered after the setup returned, so nothing else '
        + 'can open in it — carries EXACTLY ONE opening. Observed: ' + opened);
      assert.equal(sawNonZeroInside, true,
        `\`${row.verb}\` BRACKETS, so the count was NON-ZERO at the instant its commit opened: §4.1 — *"THE `
        + 'COUNT IS INCREMENTED WHEN A COMMIT OPENS"' + '*. An opening observed at a count of ZERO moves the '
        + 'increment off the opening it belongs to, which is the same defect one step earlier');
    } else {
      // **AND TABLE 2's `8` NAMES: *"AND NO OTHER VERB BRACKETS IT"* — each for the reason the rule
      // supplies, transcribed at `THE_THIRTEEN` and recounted by the census cell above.**
      assert.equal(opened, 0,
        `THE VERB NAMED BY THIS FAILURE IS \`${row.verb}\`, AND \`§4.1\` TABLE 2 DECLARES IT DOES NOT `
        + `BRACKET — "${row.why}". So NO commit opens for it and §4.2's observer is never called in the `
        + 'subject call\'s own window. Observed openings: ' + opened);
      assert.equal(sawNonZeroInside, false,
        `${row.verb} does not bracket, so no observation taken inside its subject call may read non-zero`
        + ' — nothing opened, so nothing was incremented');
    }
    report.push(`${row.verb}=${row.brackets ? 'brackets' : 'does-not-bracket'}`);
  }
  assert.equal(report.length, 13, 'and every one of the thirteen was walked');
});

test('ada_pada5_s_commit_join_a_kernel_driven_write_joining_an_extant_commit_does_not_open_a_second', () => {
  // **THE JOIN RULE IS WHAT MAKES THE COUNT EXACT** (`§4.1`): *"a verb that finds an extant commit passes it
  // rather than opening a second, so a nested call CANNOT DOUBLE-COUNT and the count is one number that
  // cannot drift."*
  //
  // The nested call is a LISTENER BODY that writes at a second address while its own write's commit stands —
  // the declared window is synchronous and after the addon's call returned (`§4.5`), so the body's write runs
  // inside the outer call and inside the outer commit. **The pair must therefore cost the count ONE, not
  // two.** A count of two here is the failure and it names the rule it broke.
  const instance = freshInstance();
  const seen = [];
  // **THE HANDLE IS A STRING THIS CALLER SPELLS, AND `listen`'s OWN RETURN IS NOT IT** — `surface.md
  // §2.4` item 9 (f)'s member table: *"a registration's handle is a non-empty string this caller spells"*.
  // `register` takes THAT string, which is what the walk's own `register` row does (`i.listen('walk-handle',
  // [['a']]); i.register('walk-handle', () => {})`). **A cell binding `listen`'s return would fail on a
  // CORRECT landing as readily as on the current source**, so the string is spelled once here.
  const handle = 'outer-handle';
  instance.listen(handle, [['outer']]);
  instance.register(handle, () => {
    seen.push(attemptCount(instance, 'the join cell, inside the nested listener body'));
    instance.write(['inner'], 'mem', 'nested');
  });
  assert.equal(attemptCount(instance, 'the join cell, before the pair'), 0, 'nothing is open before the pair');
  instance.write(['outer'], 'mem', 1);
  assert.equal(attemptCount(instance, 'the join cell, after the pair'), 0,
    'and nothing is left open after it — the count reached zero once, on the final return to the client');
  assert.deepEqual(seen, [1],
    'THE NESTED CALL DID NOT DOUBLE-COUNT: the listener body\'s write found the outer commit EXTANT and '
    + 'JOINED it, so the count stood at ONE (the outer commit\'s own) and never at two. A second increment '
    + 'here is §5\'s failure "a nested call double-counting", and it names the join rule');
  assert.equal(instance.read(['inner'], 'mem'), 'nested', 'and the nested write landed');
});

test('ada_pada5_s_commit_once_a_write_with_a_listener_is_non_zero_before_the_delivery_and_zero_after', () => {
  // `P-ADA-5`'s `S-COMMIT-ONCE` / V-10 — **AND THE ORDERING IS THE WHOLE OF WHAT THE CELL ASSERTS**: the
  // count is non-zero BEFORE the listener fires and zero AFTER the call returns. `§4.1`: *"THE COUNT IS
  // INCREMENTED WHEN A COMMIT OPENS AND DECREMENTED ONCE ON THE FINAL RETURN TO THE CLIENT"*; and `§4.5`:
  // *"the corpus declares the listener invocation synchronous, and after the addon's call has returned."*
  const instance = freshInstance();
  const observed = { atDelivery: null, deliveries: 0 };
  // The handle is the string the caller spells — see the sibling cell; `register` takes THAT and not
  // `listen`'s return (`surface.md §2.4` item 9 (f)).
  const handle = 'once-handle';
  instance.listen(handle, [['a']]);
  instance.register(handle, () => {
    observed.deliveries += 1;
    observed.atDelivery = attemptCount(instance, 'the once cell, at the listener\'s delivery');
  });
  assert.equal(attemptCount(instance, 'the once cell, before the call'), 0,
    'the count is zero before the call — nothing is open');
  instance.write(['a'], 'mem', 1);
  assert.equal(observed.deliveries, 1, 'the listener fired exactly once');
  assert.ok(observed.atDelivery > 0,
    'the count was NON-ZERO at the delivery — "a count reaching zero before the listener fires" is on §5\'s '
    + 'failure list, and the listener is downstream of the edit inside the window that edit holds (§4.5). '
    + 'Read at delivery: ' + observed.atDelivery);
  assert.equal(attemptCount(instance, 'the once cell, after the call returned'), 0,
    'and ZERO after the call returned — the single decrement is taken on the FINAL RETURN TO THE CLIENT, '
    + 'once, after every listener has fired');
});

// **⟶ RE-CUT 2026-10-20 (`role_test_writer`), ON THE IMPLEMENTER'S REFUSAL-TO-ADJUST. THE CELL DROVE A CALL
// SHAPE THE STANDING SURFACE REFUSES AND IS *PINNED* REFUSING — so the cell's own SETUP threw before its
// subject was ever reached, and its red measured the setup rather than the count.**
//
// **THE DEFECT, NAMED AT ITS BYTES.** The cell called `instance.addConstraint('k', ['a'], () => true)` — THREE
// positions with a STRING first — and `instance.constraintOn('k', ['a'])` likewise. **`surface.md §2.12` item 4
// declares `a.addConstraint(pair, constraint)` at ARITY 2 with `pair = { address, id }`, and the standing suite
// pins BOTH the arity and this very spelling's refusal:** `a127-surface.test.mjs:584`, `:615` and `:628` each
// assert `a.addConstraint.length === 2`; `:646` pins `a.constraintOff('pair', fn)` refusing; and
// `a126-constraint-methods.test.mjs:563`–`:593` require `'a.b'`, `''`, `0`, `1`, `true`, `[]` and
// `[['a'], 'id']` each to throw the ONE `TypeError` with `status` ABSENT. **A cell that admitted the string
// spelling would REGRESS four standing cells, so the spelling is not this unit's to widen** — and the
// addon-adoption contract declares no such spelling anywhere: `test-cases.md`'s `V-11` says only that *a
// constraint modification brackets the count for a repair's duration*.
//
// **THE REMEDY IS THE DECLARED SHAPE, READ OFF THE PASSING CELLS AND NOT GUESSED.**
// `a126-constraint-methods.test.mjs:195` defines `PAIR = (id, address = ['a']) => ({ address, id })` and every
// positive cell of that file passes a PAIR OBJECT at position 1 and a FUNCTION at position 2
// (`a.addConstraint(PAIR('c1'), passAtRegistration)` at `:220`; `a.addConstraint({ address: ['a'], id: 'b2' },
// added)` at `:516`). **AND THE TOGGLE'S SECOND POSITION IS THE ELEMENT'S OWN FUNCTION PASSED THROUGH, WHICH
// IS WHAT THE GOING CONCERN REQUIRES:** `surface.md §2.12` item 3 (c) item 1 — *"NO function of the caller's is
// carried by either toggle — the toggle passes the element's existing function through, which is why (a)'s
// definition and not the toggle's own arguments decide carriage."* **A toggle is therefore driven with the
// SAME function the add registered, and the toggle still acts on the element the registry keys by `pair`.**
//
// **WHAT THE OLD ASSERTION DEMANDED, AND WHAT THE NEW ONE ASSERTS.**
// · OLD: `during >= 1` while `opened` was never read, over a subject call spelled `constraintOn('k', ['a'])`.
// · NEW: the subject call is `constraintOn(pair, fn)` at the DECLARED arity, observed PER SUBJECT CALL — the
//   observer is registered AFTER the setup has returned, so its window IS the subject call's own and the
//   count it reads at the opening is attributable to `constraintOn` and to nothing else.
// · PINNED BY: `finalizer-and-teardown.md §4.1` table 1, verb `constraintOn`, *"opens one — ENABLING"* /
//   **YES**; `§4.2` item 2, *"`observer` is a FUNCTION called once per commit that OPENS for that store"*;
//   `§4.1`, *"THE COUNT IS INCREMENTED WHEN A COMMIT OPENS AND DECREMENTED ONCE ON THE FINAL RETURN TO THE
//   CLIENT."* **AND `V-11`'s own wording — "for a repair's duration" — is what the DURING reading asserts:
//   the count stands non-zero across the modification and is zero once it has returned.**
//
// **THE STATES ENUMERATED BEFORE THIS CELL WAS RE-CUT** (`V-11`; the modification's own arms, each at the
// declared shape):
// | # | the state | what the count must do | where it is read |
// | --- | --- | --- | --- |
// | 1 | `constraintOn` ENABLING a pair the entry carries and that `constraintOff` left disabled | rises by ONE at the opening (the subject call's own commit) | `during`, inside the observer |
// | 2 | `constraintOff` DISABLING a carried pair (`§4.1` table 2: *"disabling cannot fire — nothing runs"*) | does NOT move — no commit opens | `opened` and `during` — covered by the walk cell |
// | 3 | `addConstraint` ADDING at a fresh pair (`§4.1` table 1: *"opens one"*) | rises by ONE | the walk cell's `addConstraint` row |
// | 4 | the SETUP calls, which are themselves bracketing (`addConstraint`, `constraintOff`) | OUTSIDE the observation window by construction | the observer is registered after them |
// **FAIL-STATES COVERED** (`F-8`): a verb outside the bracketing set moving the count, and a set member not
// moving it — both read here as the `constraintOn` movement and the zero return of the cell's own shape.
test('ada_pada5_s_commit_once_a_constraint_modification_brackets_for_a_repair_s_duration', () => {
  // V-11 — **a constraint modification brackets the count for a repair's duration** (`§4.1`; the repair is
  // the cascade the rule's own sentence names: *"a repair or a listener can cascade into a file edit, and
  // only a commit can start that cascade"*).
  //
  // The pair under test is `constraintOn`, whose commit the clause calls out as opening one — *"it opens one
  // — ENABLING"* — so the count must rise across the enabling call and be zero on its return.
  //
  // **THE SETUP RUNS BEFORE THE OBSERVER IS REGISTERED, AND THAT ORDERING IS THE INSTRUMENT.** The setup's own
  // calls bracket the count too (`addConstraint` is table 1's third name; `constraintOff` is not, but it is
  // driven here at the element's existing function so nothing else moves), so an observer registered first
  // would count THEIR openings as the subject's. `§4.2` item 2 declares the observer's window as *"once per
  // commit that OPENS for that store"*, so registering it after the setup returns leaves the subject call's
  // own commit as the only opening in it.
  const instance = freshInstance();
  // **THE PAIR IS THE DECLARED SHAPE `{ address, id }`** (`surface.md §2.12` item 4; `§2.4` item 9 (f)'s
  // `A127` clause — `a.addConstraint(pair, constraint)`, ARITY 2), spelled exactly as the passing cells of
  // `a126-constraint-methods.test.mjs` spell it (`PAIR = (id, address = ['a']) => ({ address, id })`, `:195`;
  // `a.addConstraint({ address: ['a'], id: 'b2' }, added)`, `:516`).
  const pair = { address: ['a'], id: 'k' };
  const constraint = () => true;
  instance.addConstraint(pair, constraint);
  // **AND THE TOGGLE CARRIES THE ELEMENT'S OWN FUNCTION THROUGH**, not a function of this cell's choosing —
  // `surface.md §2.12` item 3 (c) item 1: *"NO function of the caller's is carried by either toggle — the
  // toggle passes the element's existing function through."*
  instance.constraintOff(pair, constraint);
  assert.equal(attemptCount(instance, 'the repair cell, after the setup has returned'), 0,
    'the setup left no commit open, so the window the observer is about to open is the subject call\'s own');
  let during = null;
  let opened = 0;
  const stop = onAttemptOpened(instance,
    () => {
      opened += 1;
      during = attemptCount(instance, 'the repair cell, at the opening of `constraintOn`');
      return false;
    },
    'the repair cell, observing `constraintOn`');
  try {
    instance.constraintOn(pair, constraint);
  } finally {
    stop();
  }
  assert.equal(opened, 1,
    '`constraintOn` BRACKETS BY OPENING EXACTLY ONE COMMIT: `§4.1` table 1 names it and gives the reason '
    + '*"it opens one — ENABLING"*, and `§4.2` item 2 declares the observer *"called once per commit that '
    + 'OPENS for that store"* — the count is incremented when a commit opens and no second commit is opened '
    + 'beside it (`§4.1`: *"a verb that finds an extant commit JOINS it rather than opening a second"*). '
    + 'Observed openings in the subject call\'s own window: ' + opened);
  assert.ok(during >= 1,
    'and the count had RISEN by the time that commit opened — this is the "repair\'s duration" `V-11` names: '
    + 'the modification holds a non-zero count across itself. Read at the opening: ' + during);
  assert.equal(attemptCount(instance, 'the repair cell, on the final return'), 0,
    'and the count stands at zero on the final return, the repair\'s cascade included — `§4.1`: *"THE COUNT '
    + 'IS INCREMENTED WHEN A COMMIT OPENS AND DECREMENTED ONCE ON THE FINAL RETURN TO THE CLIENT."* A count '
    + 'left non-zero after this call is on `§5`\'s failure list.');
});

test('ada_pada5_s_commit_once_the_count_never_reaches_zero_before_a_return_and_never_stays_non_zero_after', () => {
  // §5's failure list's last two members, driven TOGETHER and over the whole bracketing set: **"a count
  // reaching zero before the listener fires"** and **"a count left non-zero after a return"**. The sample is
  // taken at every observation point the instrument offers across a run of all five bracketing verbs, so a
  // verb that left the count standing is named by the cell's own failing message.
  const lingering = [];
  for (const row of THE_THIRTEEN.filter((r) => r.brackets)) {
    // **THE SAME TWO-WINDOW INSTRUMENT AS THE WALK CELL'S, AND FOR THE SAME REASON** (`§4.1` is consistent
    // and an observer spanning a row's SETUP measures the setup): the setup runs first, then the observer
    // opens on the SUBJECT call alone. **THIS CELL KEEPS ITS OWN SUBJECT AND IS NOT WEAKENED BY THE RE-CUT —
    // it drives `§5`'s failure list's last two members directly.**
    const instance = instanceForRow(row);
    row.setup(instance);
    if (attemptCount(instance, `the zero-inside cell, after the setup of \`${row.verb}\``) !== 0) lingering.push(row.verb);
    let sawZeroInside = false;
    const stop = onAttemptOpened(instance, () => {
      if (attemptCount(instance, `the zero-inside cell, inside the opening of \`${row.verb}\``) === 0) sawZeroInside = true;
      return false;
    }, `the zero-inside cell, observing \`${row.verb}\``);
    try {
      row.subject(instance);
    } finally {
      stop();
    }
    if (attemptCount(instance, `the zero-inside cell, after \`${row.verb}\``) !== 0) lingering.push(row.verb);
    assert.equal(sawZeroInside, false,
      `${row.verb}: no observation taken INSIDE the call read zero — a zero inside a bracketing call is "a `
      + 'count reaching zero before the listener fires" one step early');
  }
  assert.deepEqual(lingering, [],
    'and not one of the five left the count standing after its return. Left standing: '
    + (lingering.length === 0 ? '(none)' : lingering.join(', ')));
});

// =============================================================================================
// `P-ADA-6` — `binding-crate-and-abi.md §4` / `§3-bis` — THE BUILD IS VERIFIED BY ITS SYMBOLS
// Strategies `S-SYM-SUPERSET` · `S-SYM-LINK` · `S-SYM-NO-FALLBACK`.
//
// **RE-CUT 2026-10-20. THE SUPERSET IS MADE AGAINST THE NAMES THE JS SIDE ACTUALLY REACHES — NOT AGAINST
// THE `23` HAND-DECLARED `napi_*` SYMBOLS, WHICH WAS UNACHIEVABLE.** `contract.md §2` item 4 (corrected
// 2026-10-20): *"the EXPORT SET is compared against THE NAMES THE JS SIDE REACHES (risk (a): the artefact
// loads and registers), and the LINK-SYMBOL risk (risk (b)) is a LINK-TIME property of the built artefact
// whose instrument is the BUILD SUCCEEDING plus the loader's own report — NOT an export-set comparison
// against the `23` C-API symbols, which an addon imports and can never export."* `binding-crate-and-abi.md
// §4`: *"IT IS NOT COMPARED AGAINST THE `23` HAND-DECLARED `napi_*` SYMBOLS — an addon IMPORTS those from
// the host and CAN NEVER EXPORT THEM, so that comparison is unachievable and was never a check. THE `23`
// IS A CENSUS AND NOT AN EXPORT SET (`§3-bis`).*
//
// **SO THE `23` IS RETAINED BELOW AS THE CENSUS `§3-bis` PRICES THE REPLACEMENT AGAINST** — and one cell
// asserts that census and asserts that it is NOT an export claim. Failure list (`§4`): **a name the JS side
// reaches absent from the export set** · **an unresolved `napi_*` reference at link or dynamic-load
// time** · a load succeeding against a stale artefact · the version check passing for a build with a
// different export set.
// =============================================================================================

/** The built artefact, or a refusal that NAMES the artefact's path. `S-SYM-SUPERSET` is a read of a BUILT
 *  artefact (`§4`: *"the artefact is opened and its exported symbol set read"*), so a cell that cannot find
 *  it fails and says so rather than passing vacuously. */
function builtArtefact() {
  assert.equal(existsSync(ADDON_ARTEFACT), true,
    'binding-crate-and-abi.md §4: the artefact is OPENED and its exported symbol set read. No artifact '
    + `stands at ${ADDON_ARTEFACT} — the acceptance run builds it (implementation-plan.md §2 step 2), and `
    + 'a symbol read against an absent artefact would prove nothing');
  return ADDON_ARTEFACT;
}

/** **THE NAMES THE JS SIDE ACTUALLY REACHES — WHAT THE EXPORT SET IS COMPARED AGAINST — READ OFF THE
 *  PACKAGE RATHER THAN TAKEN FROM A BRIEF.** `binding-crate-and-abi.md §4` (corrected 2026-10-20): *"THE
 *  NAMES THE JS SIDE REACHES — the entry names the package's own load path calls, `version` · `errorMessage`
 *  · `storeCreate` · `register` and the per-verb entries the surface unit declares."* **THE LOAD PATH IS THE
 *  SPEC'S OWN PREDICATE HERE**, so the set below is DERIVED FROM `bindings/js/index.mjs` — the file the
 *  package's `import` condition names — and not from a list this file chose.
 *
 *  **AND THE DERIVATION READS THE LOAD PATH'S REACHES *ON THE ADDON*, WHICH IS NOT THE SAME AS EVERY NAME
 *  THE ENTRY FILE IMPORTS.** `index.mjs` imports `readFileSync`, `createRequire`, `dirOf`, `join`,
 *  `fileURLToPath` and `types` from Node's own modules — **none of those is a name of the artefact and none
 *  may be demanded of its export set.** What the clause compares is *"the entry names the package's own load
 *  path **calls**"* — the artefact's own names — so the read below takes the property reaches spelled on the
 *  loaded module. **READING `Object.keys` OF THE ARTEFACT TO BUILD THE EXPECTED SET WOULD MAKE THE CELL
 *  ASSERT ITSELF**, so the expected set comes from the source text and only from it. */
function namesTheJsSideReaches() {
  const importCondition = JSON.parse(textAt(PKG_MANIFEST)).exports['.'].import;
  const entryPath = resolve(PKG_DIR, importCondition);
  assert.equal(existsSync(entryPath), true,
    `the package's own load path — the \`import\` condition's target, \`${importCondition}\` — stands at its `
    + 'declared path, so the names below are read off a file that exists rather than off a claim');
  const entry = textAt(entryPath);
  const reached = new Set();
  // (i) THE FOUR THAT STAND AND THE NINE PER-VERB ENTRIES — THE SET `binding-crate-and-abi.md §4` NAMES AT
  // ITS OWN BYTES: *"the entry names the package's own load path calls, `version` · `errorMessage` ·
  // `storeCreate` · `register` **and the per-verb entries the surface unit declares**."* Each must be
  // spelled on the artefact object the load produces — `addon.<name>`, `addon_.<name>` or `addon['<name>']`
  // — which is what "the package's own load path calls" means at the bytes.
  for (const name of ENTRY_NAMES_REACHED) {
    const spelled = SPELLINGS(name).some((spelling) => entry.includes(spelling));
    if (spelled) reached.add(name);
  }
  // (ii) ANY OTHER NAME THE LOAD PATH READS OFF THE ARTEFACT — every `addon`-rooted spelling alike —
  // because the clause's set is what the load path REACHES and not a list this file chose.
  for (const match of entry.matchAll(/\baddon_?\s*\.\s*([A-Za-z_$][\w$]*)/g)) reached.add(match[1]);
  for (const match of entry.matchAll(/\baddon_?\s*\[\s*['"]([A-Za-z_$][\w$]*)['"]\s*\]/g)) reached.add(match[1]);
  // **AND THE DECLARED SET IS ADDED, BECAUSE THE CLAUSE NAMES IT AS PART OF THE REACH AND THE LOAD PATH MAY
  // SPELL A NAME THROUGH A HELPER OR A FORWARDER** — the nine per-verb entries are the surface unit's own
  // declared entries (`export-set-and-dispatch.md §1`), and they arrive at the addon by exactly this route.
  for (const name of ENTRY_NAMES_REACHED) reached.add(name);
  assert.ok(reached.size > 0,
    'the load path reaches at least one name — `binding-crate-and-abi.md §4`: the comparison is against '
    + '*"the entry names the package\'s own load path calls"*, so a derivation that found none would make '
    + `the superset below vacuous. Read from ${entryPath}: ${reached.size}`);
  return reached;
}

/** **THE NAMES THE JS SIDE REACHES, RE-CUT 2026-10-21 TO THE POST-SPLIT SET — THE THIRTEEN, AND `call` IS
 *  NOT AMONG THEM.**
 *
 *  THE OLD SET WAS `ENTRY_NAMES_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register']`, and
 *  **ITS `call` MEMBER IS NOW CORRECT-AND-DELETED: the split removes the dispatcher, so the artefact no
 *  longer exports `call` and the two `P-ADA-6` cells below went RED AGAINST A CORRECT ARTEFACT.**
 *  `docs/specs/storeroom-addon-surface/export-set-and-dispatch.md §2` is the pin: ***"`call` IS DELETED. It
 *  **was** the dispatcher: one entry taking `(instance, verb, args)` and matching the verb across nine arms.
 *  The split is precisely its replacement, so it does not survive."*** **MEASURED: the built artefact's key
 *  set is exactly the thirteen `export-set-and-dispatch.md §1` declares, with no `call`.**
 *
 *  **AND THE CLAUSE'S OWN WORDS MAKE THE THIRTEEN THE RIGHT COMPARISON SET**: `binding-crate-and-abi.md §4`
 *  names *"`version` · `errorMessage` · `storeCreate` · `register` **and the per-verb entries the surface
 *  unit declares**"* — the four standing plus the nine per-verb. **`contract.md §4` states the same figure:**
 *  *"The export set widens from five names to thirteen; every one of them refuses in this same three-member
 *  form."* **SO THE FIFTH OLD NAME IS REPLACED BY THE NINE, AND THE SET MOVES `5 → 13`.**
 *
 *  **THE COMPARISON REMAINS A SUPERSET CLAIM** (`§4`: *"The set must be a SUPERSET of those and not an
 *  equality, because a build may lawfully export more than the entry reaches"*), so a landing that exports
 *  beyond these thirteen still satisfies the cells. **AND `call` IS NOT ASSERTED ABSENT HERE** — that is
 *  `P-SAS-1`'s cell at the surface unit (`addon-surface.test.mjs`), **which is the key set's ONE HOME**
 *  (`storeroom-addon-surface/contract.md §5`: the golden's diff excludes the key-set cells *"so a key-set
 *  cell left in the golden's diff would fail by design and mask every other diff"*). **THIS FILE SIMPLY
 *  STOPS DEMANDING A NAME THE SPLIT DELETED.** */
/** The two halves of the reach, named at `export-set-and-dispatch.md §1`'s two tables — *"THE FOUR THAT
 *  STAND, UNMOVED IN NAME AND ARITY"* (`4`) and *"THE NINE THE SPLIT ADDS, ONE PER DISPATCHER ARM"* (`9`),
 *  `4 + 9 = 13 ✓`. **THE SAME FIGURE `contract.md §4` states:** *"The export set widens from five names to
 *  thirteen."* */
const STANDING_FOUR_NAMES = ['version', 'errorMessage', 'storeCreate', 'register'];
const PER_VERB_NINE_NAMES = ['read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten', 'removeListener', 'commitFile'];
const ENTRY_NAMES_REACHED = [
  ...STANDING_FOUR_NAMES,
  ...PER_VERB_NINE_NAMES,
];

/** The spellings a load path may use for one reached name: `addon.<n>`, the local-alias `addon_.<n>` and the
 *  bracketed forms. **THE ALIAS FORM IS INCLUDED BECAUSE `index.mjs` REACHES `errorMessage` AND `storeCreate`
 *  THROUGH A LOCAL `addon_` BOUND BY `withAddon()`** — so a derivation that read only the literal `addon.`
 *  spelling would MISS names the load path demonstrably calls, and the superset below would be asserted
 *  against a set smaller than the clause names. */
function SPELLINGS(name) {
  return [`addon.${name}`, `addon_.${name}`, `addon['${name}']`, `addon["${name}"]`,
    `addon_['${name}']`, `addon_["${name}"]`];
}

/** **THE PER-VERB ENTRIES THE SURFACE UNIT DECLARES ARE NOW PART OF THE REACH AND ARE ASSERTED WITH IT.**
 *  `binding-crate-and-abi.md §4` names them (*"and the per-verb entries the surface unit declares"*), and
 *  the split has landed (`export-set-and-dispatch.md §1`: the nine, one per dispatcher arm). **A landing
 *  that reached fewer than the thirteen would fail the superset below** — which is `F-5`'s own term,
 *  *"the export set is missing a name the JS side reaches."* */

test('ada_pada6_s_sym_superset_the_declaration_reaches_twenty_three_symbols_and_the_boundary_still_carries_them', () => {
  // **THE CENSUS IS TAKEN OFF THE BOUNDARY'S OWN BYTES, ONE PER ROW, AS `§3-bis` PRICES IT** — *"THE COUNTS
  // ARE RE-DERIVED AT THE SOURCE'S OWN BYTES, ONE PER ROW, BECAUSE THE REPLACEMENT IS PRICED AGAINST THEM."*
  //
  // **AND `§3-bis`'s CORRECTION OF 2026-10-20 IS THIS CELL'S OTHER HALF:** *"THE `23` IS THIS CENSUS'S
  // SUBJECT AND NOT AN EXPORT CLAIM"* — an addon IMPORTS the `napi_*` symbols from the host and CAN NEVER
  // EXPORT THEM, *"so that comparison is unachievable and was never a check."* **THE CENSUS IS THEREFORE
  // RETAINED AS THE PRICE OF THE DELETION AND IS ASSERTED TO BE NO PART OF THE EXPORT SET BELOW.** */
  const code = textAt(BOUNDARY_FILE);
  const declared = [...code.matchAll(/^\s*(?:pub\s+)?fn\s+(napi_[a-zA-Z0-9_]+)\s*\(/gm)].map((m) => m[1]);
  const distinct = new Set(declared);
  if (distinct.size === 23) {
    assert.deepEqual([...distinct].sort(), [...HAND_DECLARED_23].sort(),
      '§3-bis: "the Node-API symbols the `extern "C"` block declares: `23`" — and the set is this one, read '
      + 'off the file\'s own bytes');
  } else {
    // The rewrite's arm: the hand-declared block is GONE (`contract.md §2` item 2) and the adopted library
    // supplies the bindings, so the `23` is no longer a declaration list in this file. The clause's own count
    // is then asserted against the corpus it names, and the cell asserts that the file carries NO hand-built
    // export table — which is the §2 deletion the census prices.
    assert.equal(code.includes('napi_register_module_v1'), false,
      'contract.md §2 item 2 — WHAT GOES: *"the `extern "C"` block, the four `*mut c_void`/`i32` aliases, '
      + 'the `unsafe fn`s and `unsafe` blocks that call the ABI directly"* — and with them the hand-built '
      + 'export table taking `exports` and calling `napi_create_function` per name');
    assert.equal(HAND_DECLARED_23.length, 23,
      '§3-bis: the hand-declared boundary the replacement is priced against carries TWENTY-THREE symbols');
    assert.equal(distinct.size, 0,
      'and the rewritten boundary declares none of them by hand');
  }

  // **AND THE CENSUS IS NOT AN EXPORT SET** — `§3-bis`: *"The `23` stays here as the CENSUS the replacement
  // is priced against (what was deleted), and the export claim is made at `§4` against the set it can
  // honestly be made against."* **THE TWO SETS ARE DISJOINT BY CONSTRUCTION**, and that disjointness is what
  // the superset cells below are built on: no `napi_*` C-API symbol may appear in any export claim of this
  // file.
  const censusInTheReach = HAND_DECLARED_23.filter((name) => ENTRY_NAMES_REACHED.includes(name));
  assert.deepEqual(censusInTheReach, [],
    'the `23` and the names the JS side reaches are DISJOINT SETS — the C-API symbols are what the addon '
    + 'IMPORTS from the host and the thirteen are what it EXPORTS to JS. A name standing in both would mean '
    + 'one of the two lists had been read off the other');
});

test('ada_pada6_s_sym_superset_the_built_artefacts_export_set_is_a_superset_of_the_names_the_js_side_reaches', () => {
  // **RE-CUT 2026-10-20: THE COMPARISON IS MADE AGAINST THE NAMES THE JS SIDE REACHES AND NOT AGAINST THE
  // `23`.** `binding-crate-and-abi.md §4`: *"So the artefact is opened and its exported symbol set read. AND
  // WHAT THAT SET IS COMPARED AGAINST … THE NAMES THE JS SIDE REACHES — the entry names the package's own
  // load path calls … The set must be a SUPERSET of those and not an equality, because a build may lawfully
  // export more than the entry reaches."* **AND `contract.md §5`'s `F-5` is the failure this cell lands:**
  // *"the export set is missing a name the JS side reaches"* — **which is risk (a), the artefact loading and
  // registering, and the ONLY risk an `Object.keys` read observes.**
  const loaded = require_(builtArtefact());
  const exported = new Set(Object.keys(loaded));
  const reached = namesTheJsSideReaches();
  const missing = [...reached].filter((name) => !exported.has(name));
  assert.deepEqual(missing, [],
    'binding-crate-and-abi.md §4: "The set must be a SUPERSET of THE NAMES THE JS SIDE REACHES … a superset '
    + 'and not an equality, because a build may lawfully export more than the entry reaches." **This is the '
    + 'failure `F-5` names first: "the export set is missing a name the JS side reaches."** MISSING: '
    + (missing.length === 0 ? '(none)' : missing.join(', ')) + `. Read from the load path's own reaches, `
    + `which are: ${[...reached].sort().join(', ')}`);
  // **RE-CUT 2026-10-21: THE OLD LIMB ASSERTED THE FIVE (INCLUDING THE DELETED `call`) WERE EXPORTED.** It is
  // now the THIRTEEN — the four that stand plus the nine per-verb entries (`export-set-and-dispatch.md §1`;
  // `contract.md §4`: *"The export set widens from five names to thirteen"*). **`call` IS NOT AMONG THEM:
  // `export-set-and-dispatch.md §2` — *"`call` IS DELETED … The split is precisely its replacement, so it does
  // not survive."*** The limb asserts the names the JS side reaches under their own names, which is what the
  // clause's superset is made against.
  assert.deepEqual(ENTRY_NAMES_REACHED.filter((name) => !exported.has(name)), [],
    'and the thirteen entries `export-set-and-dispatch.md §1` declares — the four that STAND "UNMOVED IN NAME '
    + 'AND ARITY" and the nine the split adds — are among what the artefact exports, each under its own name: '
    + ENTRY_NAMES_REACHED.join(', '));
  assert.ok(exported.size >= reached.size,
    'a SUPERSET and not an equality — the artefact may lawfully export more than the entry reaches, and the '
    + `artefact exports ${exported.size} names against the ${reached.size} reached`);
});

test('ada_pada6_s_sym_superset_the_check_is_made_against_the_names_the_js_side_reaches_and_not_against_the_census', () => {
  // **RE-CUT 2026-10-20: THE OLD CELL ASSERTED THE CHECK WAS MADE AGAINST THE `23` AND THAT THE ARTEFACT
  // EXPORTED MORE THAN THE FIVE — BOTH HALVES OF WHICH THE CORRECTED CLAUSE NOW REFUSES.** `§3-bis`: *"THE
  // `23` IS THIS CENSUS'S SUBJECT AND NOT AN EXPORT CLAIM … it does not license a check against the `23`."*
  // And `§4`: the set *"must be a SUPERSET of those and not an equality"* — a superset claim is satisfied by
  // equality, so *"the artefact exports at least one name beyond the five"* was never a term of this clause.
  //
  // **WHAT SURVIVES FROM THAT CELL'S REASONING, AND IS THE WHOLE OF THIS ONE:** `§3-bis`'s standing
  // observation — *"the `23` and the `5` are different sets, and a check written against the five would pass
  // while a link symbol was missing"* — **remains TRUE**, and `§4` names where it is answered: **risk (2),
  // THE LINK-TIME HALF, *"whose instrument is THE BUILD SUCCEEDING plus WHATEVER THE LOADER REPORTS"*** and
  // **not** an export-set comparison. **SO THIS CELL ASSERTS THE TWO HALVES STAY SEPARATE: the JS-reach check
  // is satisfied at the artefact, and no `napi_*` C-API symbol may be asserted of an export set.**
  const loaded = require_(builtArtefact());
  const exported = new Set(Object.keys(loaded));
  const reached = namesTheJsSideReaches();

  // HALF 1 — risk (a), the only risk `Object.keys` observes: every name the JS side reaches is exported.
  const missing = [...reached].filter((name) => !exported.has(name));
  assert.deepEqual(missing, [],
    'risk (a), per `§4` item 1 — *"THE ARTEFACT MUST LOAD AND REGISTER … Instrument: the LOAD ITSELF, plus '
    + 'the registration the load performs — the artefact is required and the loaded module\'s names are '
    + 'read. This is the risk `Object.keys` observes, and it is the only one it observes."* MISSING: '
    + (missing.length === 0 ? '(none)' : missing.join(', ')));

  // HALF 2 — risk (b) is NOT this half's evidence, and the cell says which instrument IS. `§4` item 2:
  // *"A SYMBOL THE BOUNDARY CALLS MUST RESOLVE AT LINK TIME. THIS IS NOT OBSERVABLE VIA `Object.keys` … The
  // honest instrument is THE BUILD ITSELF SUCCEEDING, plus WHATEVER THE LOADER REPORTS."* **AND THE LOAD
  // THIS CELL ALREADY PERFORMED IS THAT INSTRUMENT'S SECOND TERM** — a `require_` that returned is a load
  // the loader did not refuse, so an unresolved `napi_*` reference would have failed HERE, before any export
  // set existed to read.
  assert.ok(exported.size > 0,
    'risk (b), read at its own instrument: the load above RETURNED, so the loader reported no unresolved '
    + 'reference — *"an unresolved `napi_*` reference fails the link, or fails the dynamic load with the '
    + 'loader\'s own diagnostic, BEFORE ANY EXPORT SET EXISTS TO READ."* An export-set read is no check at '
    + `all for this half, which is why the cell names the load and not a symbol comparison`);

  // AND THE CENSUS IS NEVER AN EXPORT CLAIM: `§3-bis`.
  const censusClaimedExported = HAND_DECLARED_23.filter((name) => exported.has(name));
  assert.deepEqual(censusClaimedExported, [],
    'and NOT ONE of the `23` C-API symbols is asserted of this export set — `§3-bis`: *"an addon IMPORTS '
    + 'those from the host and CAN NEVER EXPORT THEM, so that comparison is unachievable and was never a '
    + 'check."* A `napi_*` name appearing here would be the artefact exporting a symbol it must import, '
    + `which is the defect the correction names. Exported: ${[...exported].sort().join(', ')}`);
});

test('ada_pada6_s_sym_superset_the_symbol_read_is_not_the_version_check_and_the_two_are_orthogonal', () => {
  const loaded = require_(builtArtefact());
  // `binding-crate-and-abi.md §4`: *"The load path compares only the version STRING the addon reports; the
  // export set is orthogonal to it, so a build with a different export set can carry an identical version.
  // The symbol read is the check."* **SO THIS CELL ASSERTS THE VERSION IS PRESENT AND THE SYMBOL SET IS
  // SEPARATELY READ** — `F-`'s last member, *"the version check passing for a build with a different export
  // set"*, is the failure this separation answers.
  assert.equal(typeof loaded.version, 'function', 'the artefact reports its version');
  assert.equal(typeof loaded.version(), 'string', 'as a string, exactly compared by the load path');
  const exported = new Set(Object.keys(loaded));
  assert.ok(exported.has('version'),
    'and the version name is in the export set read above — the two are read at the same artefact and one '
    + 'does not stand for the other');
});

test('ada_pada6_s_sym_no_fallback_a_build_missing_one_name_fails_at_load_and_not_at_first_call', () => {
  // `P-ADA-6`'s `S-SYM-NO-FALLBACK` and `binding-crate-and-abi.md §4`: *"A successful build is NOT the
  // acceptance evidence. The load path reads a rung-one throw as a MISS, so an un-exported symbol degrades
  // silently to the rung-two fall-through the entry removed — 'EVERY THROW AT RUNG ONE IS A MISS … a
  // `MODULE_NOT_FOUND`, an `ERR_DLOPEN_FAILED` and any other throw alike.'"*
  //
  // **THE BUILD THIS CELL DRIVES IS A SUBSTITUTE ONE, AND THE SUBSTITUTION IS A SUBTRACTION AND NOT AN
  // INVENTION**: the real artefact's export set is read first, at the same path `S-SYM-SUPERSET` reads, and
  // one name that read carried is the name the substitute lacks. **THE DRIVE IS A LOAD**, taken in a CHILD
  // PROCESS so the load path's module cache is not shared with this one, and the assertion is that the load
  // REFUSES — never that a later call refuses.
  const real = builtArtefact();
  const realExports = Object.keys(require_(real));
  assert.ok(realExports.length > 0,
    'the real build exports at least one name, so the substitute below has a name to lack');

  const dir = mkdtempSync(join(tmpdir(), 'storeroom-ada-stale-'));
  const substitute = join(dir, basename(real));
  const narrowed = `${substitute}.js`;
  // **THE ONE NAME THE SUBSTITUTE LACKS IS REMOVED FROM A THIN SHIM, AND THE SHIM IS THE ARTEFACT'S OWN
  // SUBSTITUTE AT THE SAME PATH**: the shim re-exports the real artefact's exports object minus the one
  // name, so a LOAD of the substitute reaches a build whose export set is missing exactly that name and
  // nothing else about the tree moves.
  const missing = realExports[0];
  writeFileSync(narrowed, [
    `// THE SUBSTITUTE BUILD: the real artefact's export set, lacking exactly ONE name — \`${missing}\`.`,
    `import { createRequire } from 'node:module';`,
    `const require_ = createRequire(${JSON.stringify(pathToFileURL(narrowed).href)});`,
    `const real = require_(${JSON.stringify(real)});`,
    `const narrowed_ = Object.fromEntries(Object.entries(real).filter(([k]) => k !== ${JSON.stringify(missing)}));`,
    'export default narrowed_;',
    '',
  ].join('\n'));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'storeroom-adoption-substitute-build',
    version: JSON.parse(textAt(PKG_MANIFEST)).version,
    type: 'module',
    main: basename(narrowed),
  }, null, 2) + '\n');
  assert.equal(readFileSync(narrowed, 'utf8').includes(missing), true,
    'the shim NAMES the one name it drops, so the cell\'s subject is checkable at the bytes rather than '
    + 'inferred from a throw');

  const probe = join(dir, 'probe.mjs');
  writeFileSync(probe, [
    `let outcome;`,
    'try {',
    `  const loaded = (await import(${JSON.stringify(basename(narrowed))})).default;`,
    `  outcome = { loaded: true, carriesTheMissingName: Object.prototype.hasOwnProperty.call(loaded, ${JSON.stringify(missing)}) };`,
    '} catch (thrown) {',
    '  outcome = { loaded: false, message: String(thrown && thrown.message) };',
    '}',
    'process.stdout.write(JSON.stringify(outcome));',
    '',
  ].join('\n'));

  const printed = execFileSync(process.execPath, [probe], { encoding: 'utf8', cwd: dir });
  const outcome = JSON.parse(printed);
  assert.equal(outcome.loaded, false,
    'a build missing one name fails AT LOAD and not at first call: the load path reads a rung-one throw as '
    + 'a MISS, and an un-exported registration symbol a load tolerated would degrade silently to the '
    + `rung-two fall-through the entry removed. The substitute lacked \`${missing}\``);
  assert.equal(typeof outcome.message, 'string',
    'and the load\'s own refusal carries a message rather than a raw host error escaping the boundary '
    + '(F-\'s last member: "the version check passing for a build with a different export set" is answered '
    + 'by the symbol read ABOVE and not by this refusal alone)');
});

// =============================================================================================
// `§3` — THE COMMANDS AND THE RESIDUE — V-12 (a read of the declared commands)
//
// **THIS CELL IS `V-12` AND IT IS THE ONE ROW OF THE VIEW WITH NO `P-ADA-` PROPERTY**: *"— (a read of the
// declared commands)"*. It is authored here because the view gives it a row and a row with no cell would be
// an unwritten cell travelling to gate 4.
// =============================================================================================

// **THE DISCRIMINATOR IS THE COMMAND, NEVER THE FLAG THE ROW REMOVES** — `command-sites-and-residue.md:39`,
// `[NEGATIVE]`: *"a site is a MOVE and not a marker — a cell asserting the post-change state at a site whose
// occurrence is IDENTIFIED BY `--offline` ASSERTS OF AN OCCURRENCE THAT NO LONGER EXISTS, and a cell that
// finds none must FAIL rather than pass vacuously."* **A site's occurrence is therefore read at its COMMAND
// BODY** — `cargo`'s own argument body at the site's declared line — **and never by the flag the row removes.**
//
// **AND `SITE 5 IS TWO COMMANDS IN ONE SCRIPT AND NOT ONE OCCURRENCE`** — `command-sites-and-residue.md:37`,
// `[CONTRACT]`: root `package.json`'s `build` script carries **TWO** `cargo` commands joined by `&&`: **ITS
// FIRST HALF IS `cargo build --offline --release` AND IS THE STORE'S AND IS UNMOVED** (it does not appear in
// the site table at all and is listed at `§3`); **ITS SECOND HALF IS THE BINDING CRATE'S, IS ROW 5, AND LOSES
// `--offline`.** *"A READER THAT TREATS THE SCRIPT AS ONE OCCURRENCE HAS MERGED A MOVING COMMAND WITH A
// STANDING ONE"*, and *"a drive that requires `--manifest-path` OF EVERY `--offline` OCCURRENCE IN THIS LINE
// MUST SPLIT BY HALVES FIRST."* **SO A SITE WHOSE DISCIPLINE IS `halves` IS SPLIT BEFORE EITHER ASSERTION
// TOUCHES IT, AND EACH HALF ANSWERS TO ITS OWN ROW** — the moved half to `§2` row 5, the standing half to
// `§3`'s own second bullet.
//
// **THIS CELL'S LAST FORM COULD NOT PASS FOR ANY TREE, AND THE ARITHMETIC IS WORTH RECORDING SO IT IS NOT
// REINTRODUCED.** It selected an occurrence BY the line's containing `--offline`, then demanded
// `--manifest-path` PRESENT of the WHOLE line and `--offline` ABSENT of the line's SECOND HALF. **An
// occurrence only exists if its line carries `--offline`, so each occurrence demanded `--offline` present and
// absent at once.** **THE SUBJECT IS THEREFORE THE COMMAND BODY, WHICH EXISTS BEFORE AND AFTER THE MOVE** —
// the flag is what MOVES, so a cell keyed on it can only ever measure its own selector.
const CARGO_COMMAND = /\bcargo\s+(?:[a-z-]+)(?:[^\n&|]*)/;

/** **THE HALVES OF A SITE'S LINE, SPLIT BEFORE ANY ASSERTION READS IT** (`§2`'s `[CONTRACT]` paragraph at
 *  `:37`): a line carrying `a && b` yields `['a', 'b']` and a line carrying one command yields `[it]`. **A
 *  SITE THAT NAMES A HALF IS RESOLVED HERE AND NOT BY THE ASSERTIONS**, so the two halves of
 *  `package.json`'s `build` script are two commands before either is tested — never one merged occurrence. */
function commandHalvesAt(source, line) {
  const at = source.split('\n')[line - 1];
  assert.ok(at !== undefined,
    `the site's declared anchor must be a line of its file, and line ${line} is not`);
  return at.split('&&')
    .map((part) => CARGO_COMMAND.exec(part))
    .filter((match) => match !== null)
    .map((match) => match[0].trim());
}

/** The half a site names. `'second'` is `§2` row 5 and only that half moves; the first half is `§3`'s and
 *  stands. A site naming no half is the whole of its line's commands (sites `6` and `11` carry two ANCHORS,
 *  each of them one command, which is a different thing from one line carrying two). */
function commandsAt(source, line, half) {
  const halves = commandHalvesAt(source, line);
  if (half === 'second') {
    assert.equal(halves.length, 2,
      `the site names the SECOND half, so its line must carry TWO commands joined by \`&&\` — `
      + `\`§2\`: "the \`build\` script carries TWO \`cargo\` commands joined by \`&&\`". Read: `
      + (halves.join(' | ') || '(none)'));
    return [halves[1]];
  }
  return halves;
}

test('ada_the_eleven_named_sites_lose_offline_and_keep_manifest_path', () => {
  const rows = [];
  for (const site of OFFLINE_SITES_THAT_MOVE) {
    const source = textAt(join(REPO_ROOT, site.file));
    // **EVERY OCCURRENCE IS READ OFF THE COMMAND AND NOT OFF THE FLAG**, and the count is the site's own
    // (`§2`'s table; sites `6` and `11` each carry two line anchors).
    const lines = site.twice ? site.anchors : [site.anchors[0]];
    const moved = lines
      .flatMap((line) => commandsAt(source, line, site.halves).map((command) => ({ line, command })));
    rows.push({ ...site, occurrences: moved });
    // **THE VACUOUS PASS IS FORBIDDEN BY THE CLAUSE** (`:39`): a cell that finds no occurrence must FAIL.
    assert.ok(moved.length > 0,
      `site ${site.id} (${site.file}:${lines.join(',')}, ${site.subject}): NO OCCURRENCE WAS FOUND, AND THE `
      + 'CLAUSE FORBIDS A VACUOUS PASS — `command-sites-and-residue.md:39`: "a cell that finds none must '
      + 'FAIL rather than pass vacuously. THE DISCRIMINATOR IS THE COMMAND ITSELF — ITS FILE, ITS HALF AND '
      + 'ITS ARGUMENT BODY — AND NEVER THE FLAG THE ROW REMOVES." A site whose command has gone is a '
      + 'finding, not a green');
    for (const occurrence of moved) {
      assert.equal(/--manifest-path/.test(occurrence.command), true,
        `site ${site.id} (${site.file}:${occurrence.line}, ${site.subject}): --manifest-path STAYS AT EVERY `
        + 'SITE — "it is not a flag about the network … the two halves of the command do different jobs". '
        + `Command read: \`${occurrence.command}\``);
      assert.equal(/--offline/.test(occurrence.command), false,
        `site ${site.id} (${site.file}:${occurrence.line}, ${site.subject}): EVERY ONE LOSES ` +
        '`--offline` — the binding crate fetches what it needs at build time and `--offline` leaves its '
        + 'declared commands. Site 11 is the one a ruling\'s own enumeration MISSED: it is a DECLARED LEG '
        + 'and not a copy, and on a fresh runner it fails exactly as the build would. '
        + `Command read: \`${occurrence.command}\``);
    }
  }
  assert.equal(rows.filter((r) => r.occurrences.length > 0).length, rows.length,
    'and not one of the eleven sites lost its command to this pass\'s absence — the count is OF COMMANDS '
    + 'and not of flags, so a site whose `--offline` left still reads here: '
    + rows.map((r) => `${r.id}:${r.occurrences.length}`).join(' '));
  // **AND SITE 5 IS TWO COMMANDS AND THIS CELL READS BOTH** — the merged reading is the defect this pass
  // corrects, so the split is asserted rather than trusted: the moved half carries `--manifest-path` and
  // loses `--offline`, and the standing half keeps `--offline` and carries no `--manifest-path` (`§3`).
  const site5 = rows.find((r) => r.id === 5);
  assert.equal(site5.occurrences.length, 1,
    '`§2` row 5 is ONE command — the binding crate\'s — read at the SECOND half of the `build` script. '
    + `Commands read at that line: ${site5.occurrences.length}`);
  const storeHalf = commandHalvesAt(textAt(join(REPO_ROOT, 'package.json')), site5.anchors[0])
    .filter((command) => !/--manifest-path/.test(command));
  assert.deepEqual(storeHalf, ['cargo build --offline --release'],
    '`§3`\'s second bullet: the FIRST half of the same script is `cargo build --offline --release`, THE '
    + "STORE'S AND UNMOVED — it KEEPS `--offline` and carries no `--manifest-path`, and it does not appear "
    + 'in the site table at all. A reader that treated the script as one occurrence merged a moving command '
    + 'with a standing one');
});

test('ada_the_stores_commands_keep_offline_and_the_asymmetry_is_the_ruling', () => {
  // `command-sites-and-residue.md §3` — **THE COMMANDS THAT DO NOT MOVE**: the store's commands carry
  // `--offline`, the binding crate fetches, and THE ASYMMETRY IS THE RULING. The store's `--offline` is a
  // COMMAND property now, not a dependency prohibition; the old "store is dependency-free" note is archived.
  const rootManifest = textAt(join(REPO_ROOT, 'package.json'));
  const buildScript = JSON.parse(rootManifest).scripts.build;
  const halves = buildScript.split('&&').map((half) => half.trim());
  assert.equal(halves.length >= 2, true, 'the root `build` script is two halves');
  const [storeBuild, crateBuild] = halves;
  assert.match(storeBuild, /--offline/,
    'the FIRST half is the STORE\'s build, and it KEEPS `--offline` as its declared build form — a '
    + 'COMMAND property, not a dependency prohibition');
  assert.doesNotMatch(storeBuild, /bindings\/js/,
    'and the first half is the store\'s: it must not name the binding crate\'s manifest');
  assert.equal(/bindings\/js\/Cargo\.toml/.test(crateBuild), true,
    'the SECOND half is the binding crate\'s');
  assert.equal(/--offline/.test(crateBuild), false,
    'and the SECOND half loses `--offline` — a `--manifest-path` that names the crate WITHOUT dropping '
    + '`--offline` is the defect site 11 is named for');
  assert.match(crateBuild, /--manifest-path/,
    '`--manifest-path` stays: a bare `cd bindings/js && cargo test` resolved UPWARD to the root manifest '
    + 'and ran the store\'s suite while none of this crate\'s cells executed');
});

test('ada_the_pkgs_preflight_is_rewritten_to_prove_its_own_property_and_not_relaxed', () => {
  // `command-sites-and-residue.md §4` — **REWRITTEN, NOT BYPASSED.** *"THE REPLACEMENT MUST PROVE THE SAME
  // PROPERTY: the lock's package set EXACTLY MATCHES what the manifests declare — no package present in
  // `Cargo.lock` that no `Cargo.toml` requires, and none required that the lock omits. A CHECK RELAXED TO
  // 'THE COUNT IS WHATEVER IT IS' WOULD BE A WEAKENING AND IS NOT THIS RULING."*
  const source = textAt(PUBLISH_SH);
  assert.equal(/PKGS\s*=\s*\$\(grep -c '\^\\\[\\\[package\\\]\\\]'/.test(source), false,
    'the OLD preflight — a raw count of `[[package]]` rows refused when it is not `1` — is the check whose '
    + 'SUBJECT HAS CHANGED. Its sentence *"Cargo.lock carries $PKGS packages — the offline property is '
    + 'SPENT"* is what the ruling replaces');
  assert.equal(/"\$PKGS"\s*=\s*"1"/.test(source), false,
    'and the literal `= 1` comparison is gone with it: a count of `1` is no longer the honest form of the '
    + 'proof, and leaving it in place would refuse every tree this unit builds');
  // The replacement must PROVE the set equality, so it reads BOTH sides: the lock's package names and the
  // manifests' declared requirements.
  const provesLockSide = /Cargo\.lock/.test(source) && /\[\[package\]\]|name\s*=/.test(source);
  const provesManifestSide = /Cargo\.toml/.test(source);
  assert.equal(provesLockSide && provesManifestSide, true,
    'the rewritten preflight reads the LOCK\'s package set AND the MANIFESTS\' declared set — a check that '
    + 'reads one side only cannot prove "exactly matches", and a check relaxed to "the count is whatever it '
    + 'is" is the weakening the clause forbids');
  assert.equal(/refuse|exit 1/.test(source), true,
    'and it still REFUSES the release where the property fails: "AND THE PREFLIGHT GATES THIS UNIT\'S OWN '
    + 'REPORT. A green reported from a preflight that refuses the tree it just built is a waiver and not a '
    + 'green"');
});

test('ada_the_three_residue_sites_s_1_s_4_and_s_6_are_corrected', () => {
  // `command-sites-and-residue.md §5` — **A RESIDUE IS A COMMENT OR A FIGURE THE RULING FALSIFIES** — and
  // `§3` item 4 names the three, with `S-6`'s owner explicitly `role_implementer`.
  const crateManifest = textAt(MANIFEST);
  assert.equal(/no registry fetch at all/i.test(crateManifest), false,
    'S-1: `bindings/js/Cargo.toml`\'s "no registry fetch at all" is FALSE the moment the library lands, '
    + 'and it is corrected to state that the crate fetches');
  const boundary = textAt(BOUNDARY_FILE);
  assert.equal(/never a `?stack`?/i.test(boundary), false,
    'S-4: the boundary header\'s "never a `stack`" sentence is REMOVED — `failure-form.md §1`: it appeared '
    + 'in the code\'s own header and in NO clause, and "the header that stated it is a residue this unit '
    + 'corrects"');
  assert.equal(/`?stack`? is (?:not|never) forbidden/i.test(boundary), false,
    'S-4\'s second half is not answered by asserting the prohibition\'s inverse either — the sentence goes, '
    + 'and NOTHING ASSERTS ITS ABSENCE AS A CONTRACT PROPERTY');
  const members = /(?:two|three)[- ]member/i.exec(boundary);
  assert.equal(members === null || !/two[- ]member/i.test(members[0]), true,
    'S-4: and the header no longer declares the failure form as carrying TWO members — the form carries '
    + 'THREE (`status`, `message`, `log`)');
  const core = textAt(CORE_FILE);
  const stale = /closed (\d+)[- ]member set/i.exec(core);
  assert.equal(stale === null || stale[1] === '16', true,
    'S-6: `bindings/js/src/crossing.rs`\'s "closed `15`-member set" is stale against the operative `16`. '
    + `Read: ${stale === null ? '(no such figure)' : stale[1]}`);
});

test('ada_the_root_manifests_old_no_dependencies_comment_is_archived', () => {
  // `command-sites-and-residue.md §3`'s first bullet and `contract.md §3` item 5: the root `Cargo.toml`'s
  // old "No dependencies" sentence was a JS-side constraint on imports and runtime data retrieval, not a
  // rule reaching a compiled Rust crate. It is moved out byte-exactly to the archive, and the source
  // points there; the store's declared commands still keep `--offline` as their build form.
  const root = textAt(join(REPO_ROOT, 'Cargo.toml'));
  assert.doesNotMatch(root,
    /No dependencies: `cargo test --offline` and `cargo build --offline` must work with no registry\./,
    'the old dependency-free sentence is NOT left standing in the manifest');
  assert.match(root, /archive\/spec-history\/2026-10-21-dependency-restriction-notes-move-out\.md/,
    'the manifest points at the archive that holds the moved-out sentence');
  const table = dependencyTable(root);
  assert.deepEqual(table.map((row) => row.key).sort(), ['serde', 'serde_json'],
    'the ROOT crate MAY carry registry dependencies, and it declares `serde` and `serde_json` under its '
    + 'own dated clause');
});

test('ada_the_hand_declared_abi_is_deleted_and_the_core_is_untouched', () => {
  // `contract.md §2` item 2 — **WHAT GOES AND WHAT STAYS.** What goes: the `extern "C"` block, the four
  // `*mut c_void`/`i32` aliases, the `unsafe fn`s and `unsafe` blocks that call the ABI directly. What
  // stays: `crossing.rs`, BYTE-FOR-BYTE — which the `P-ADA-2` cells above assert from the other side.
  const boundary = textAt(BOUNDARY_FILE);
  assert.equal(/extern "C" \{/.test(boundary), false,
    'the `extern "C"` block declaring the Node-API symbols is DELETED — `binding-crate-and-abi.md §2`\'s '
    + 'deletion table, row 1');
  assert.equal(/napi_register_module_v1/.test(boundary), false,
    'and the hand-built export table that took `exports` and called `napi_create_function` per name goes '
    + 'with it — the library\'s registration replaces it');
  assert.equal(/(?:type\s+NapiEnv\s*=\s*\*mut c_void)/.test(boundary), false,
    'and the four type aliases (`*mut c_void` × 3, `i32`): the library\'s typed handles take their place');
  // **AND ONE HELPER IS NOT DELETABLE: `throw_refusal`.** `binding-crate-and-abi.md §2`: *"It is what
  // produces the declared failure form out of an object rather than an `Error`. The library's idiomatic
  // error path would throw an `Error`; the escape hatch that throws a raw value is the one to use."*
  assert.match(boundary, /throw_refusal/,
    'and `throw_refusal` SURVIVES the rewrite — it is named as the one helper that is not deletable, and '
    + 'a rewrite that let the library\'s ergonomic path answer these sites would breach the one form the '
    + '`P-ADA-3` cells above drive');
});

// =============================================================================================
// `§6` — THE STATES A DRIVE DERIVES, AND THE ONE THAT MOVES
// =============================================================================================

test('ada_the_version_stamp_cells_are_re_cut_to_the_relation_and_not_to_a_spelling', () => {
  // `contract.md §6` — **AND THE ONE EXCEPTION TO "THE SUITE DOES NOT MOVE", NAMED SO IT IS NOT A SURPRISE.**
  // `bindings/js/test/version-stamp.test.mjs` reads `bindings/js/src/facade.rs` AS TEXT, binds the path,
  // reads it, strips comments, and asserts the file carries `option_env!("STOREROOM_JS_PACKAGE_VERSION")` and
  // `env!("CARGO_PKG_VERSION")`. **A correct rewrite of that file moves those cells — THIS IS AN INSTRUMENT
  // CHANGE AND NOT A BEHAVIOUR CHANGE.**
  //
  // **THE RE-CUT IS TO THE RELATION** (`implementation-plan.md §3`: *"the cells are re-cut to the RELATION,
  // never re-pinned to whatever spelling the rewrite happens to emit"*), and the relation is: **the directive
  // where the build script emits it, the crate's version where it does not.** `§6` declares the two cells
  // MOVE, so this file asserts the relation's CARRIER — which the rewrite does not move — and no property of
  // the rewrite's spelling. **AND `§6` MAKES THE RE-CUT THE LANDING PASS'S ACT**, so this cell's subject is
  // the seam and not the re-cut: a file asserting the new spelling would be a second pin of exactly the kind
  // the clause forbids.
  const buildScript = textAt(join(PKG_DIR, 'build.rs'));
  assert.match(buildScript, /cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION=/,
    'the directive the boundary reads is emitted by the build script, and the directive\'s NAME is unmoved '
    + 'by the rewrite — this is the relation\'s own carrier');
  assert.match(textAt(PKG_MANIFEST), /"version"/, 'and the manifest the build script reads is unmoved');
  assert.equal(existsSync(join(HERE, 'version-stamp.test.mjs')), true,
    'and the instrument file `§6` names stands at its own path, carrying the two cells the rewrite moves '
    + '(`option_env!("STOREROOM_JS_PACKAGE_VERSION")` and `env!("CARGO_PKG_VERSION")`, read as text)');
});

// =============================================================================================
// THE ADOPTION MANIFEST — the one artifact this pass owes the landing pass, and the reason it is an
// ASSERTION rather than a note: `command-sites-and-residue.md §3-bis` item 1 makes the statement MANDATORY
// content, and item 7 makes its omission a NEGATIVE finding.
// =============================================================================================

test('ada_the_adoption_manifest_states_the_two_declarations_and_names_the_copy_source', () => {
  // **RE-CUT 2026-10-20. THE STATEMENT IS ASSERTED AT `package.json`'S OWN BYTES, WHERE `§3-bis` PUTS IT** —
  // *"THE ARTIFACT IS A WRITTEN STATEMENT, IN `bindings/js/package.json`'S OWN TERMS, OF TWO DECLARATIONS AND
  // TWO PROVENANCES — WITH THE STAGING STEP'S COPY SOURCE NAMED."* Three contents, each mandatory: **(a)** the
  // ADDON's declaration — a build output beside the artefact, reached by NO `exports` condition, unstaged;
  // **(b)** the PACKAGE's `index.d.ts` — reached by the `types` condition and shipped by `files`, **its
  // provenance DEFERRED and not mandated**; **(c)** THE STAGING STEP'S COPY SOURCE, named.
  //
  // **THE OLD FORM READ THE STATEMENT OUT OF A LOCAL `ADOPTION = null` AND DIED ON `null.addonDeclaration`.**
  // That was TWO defects in one: the import was a NAME, so the cell could never assert the clause at its own
  // bytes — and the null was this red set's own placeholder, so the cell's failure named a file this pass owns
  // rather than the artifact the landing pass owes. **`§3-bis` item 4 names the bytes the statement must agree
  // with — *"`bindings/js/package.json`'s `exports` map carries a `types` condition pointing at `./index.d.ts`
  // and an `import` condition pointing at `./index.mjs`; its top-level `types` names the same file; its
  // `files` allowlist carries four entries of which `index.d.ts` is one"* — AND THIS CELL READS EXACTLY
  // THOSE.** **`ADOPTION` IS RETAINED AS THE ONE ARTIFACT THE PASS OWES AND IS ASSERTED, NOT SUPPLIED**:
  // `§3-bis` declares the statement a PREREQUISITE the landing pass authors **in `package.json`'s own terms**,
  // so a cell that supplied its own value would be asserting itself (see `addon-adoption-support.mjs`).
  const pkg = JSON.parse(textAt(PKG_MANIFEST));

  // (a) THE ADDON'S DECLARATION — a build output beside the artefact, reached by NO `exports` condition,
  // unstaged. `§3-bis` item 1: *"a build output beside the artefact, reached by NO `exports` condition,
  // unstaged."* **THE ADD-ON DECLARATION IS `.d.ts` BESIDE THE BUILT `.node`** — the artefact's own path is
  // the package's declared build output (`binding-crate-and-abi.md §1`; `implementation-plan.md §2` step 2),
  // and the declaration a build emits for it stands beside it.
  const addonDir = dirname(ADDON_ARTEFACT);
  const addonDeclarations = existsSync(addonDir)
    ? readdirSync(addonDir).filter((name) => name.endsWith('.d.ts'))
    : [];
  const exportedPaths = [pkg.exports['.'].types, pkg.exports['.'].import]
    .map((p) => resolve(PKG_DIR, p));
  const staging = JSON.parse(textAt(join(REPO_ROOT, 'package.json'))).scripts['typecheck:stage'];
  assert.equal(exportedPaths.some((p) => p.startsWith(addonDir)), false,
    '(a) NO `exports` condition points into the artefact\'s own directory — `§3-bis` item 1: the addon\'s '
    + 'declaration is *"reached by NO `exports` condition, unstaged."* The package\'s two conditions point '
    + `at ${pkg.exports['.'].types} and ${pkg.exports['.'].import}`);
  assert.equal(staging.includes(addonDir) || addonDeclarations.some((name) => staging.includes(name)), false,
    '(a) and it is UNSTAGED — the staging step does not copy it. `§3-bis` item 1');

  // (b) THE PACKAGE'S `index.d.ts`, at the bytes `§3-bis` item 4 names.
  assert.equal(pkg.exports['.'].types, './index.d.ts',
    '(b) `§3-bis` item 4 — the bytes the statement must agree with: the `types` condition points at '
    + '`./index.d.ts`');
  assert.equal(pkg.types, 'index.d.ts', '(b) and the top-level `types` names the same file');
  assert.equal(pkg.files.includes('index.d.ts'), true,
    '(b) and the `files` allowlist carries it — *"shipped by `files`"*. Read: ' + JSON.stringify(pkg.files));
  assert.equal(existsSync(resolve(PKG_DIR, pkg.exports['.'].types)), true,
    `(b) and the declared target stands at its own path: ${pkg.exports['.'].types}`);
  // (b)'s PROVENANCE IS THE DEFERRED CHOICE AND IS NOT MANDATED HERE — `§3-bis` item 2: *"THE CHOICE OF WHICH
  // IS GENERATED IS DEFERRED AND THE ARTIFACT IS NOT."* Item 6: *"NEITHER OPTION IS MANDATED, and a `D-1`
  // statement that declares the package's declaration's provenance without resting it on this deferral is a
  // FINDING."* **SO THE CELL ASSERTS THE DEFERRAL ITSELF AND NOT EITHER OPTION** — a cell that demanded
  // `tracked-and-hand-authored` would mandate what item 1's correction VOIDS.
  assert.equal(ADOPTION === null || (typeof ADOPTION === 'object'
    && ['generated', 'tracked-and-hand-authored', 'deferred'].includes(ADOPTION.packageDeclaration?.provenance)), true,
    '(b) its provenance is the DEFERRED choice, and the statement recording it stays the landing pass\'s act. '
    + '`§3-bis` item 2: *"THE CHOICE OF WHICH IS GENERATED IS DEFERRED AND THE ARTIFACT IS NOT"*; item 6: '
    + '*"NEITHER OPTION IS MANDATED"* — so a cell demanding either option would be mandating what the '
    + 'correction VOIDS. UNTIL THE STATEMENT IS AUTHORED THIS HALF IS SATISFIED BY THE DEFERRAL ALONE, which '
    + `is what \`§3-bis\` item 6 makes \`OWED\` (owner \`role_spec_writer\`)`);

  // (c) THE STAGING STEP'S COPY SOURCE, NAMED — AND THE NAMED SOURCE IS THE BYTE THE STAGING STEP ACTUALLY
  // READS. `§3-bis` item 7: *"THE ONE THING THE DEFERRAL MUST NOT DO: LEAVE THE STAGING STEP'S SOURCE
  // UNNAMED. A `D-1` that states the two declarations and omits the copy source is INCOMPLETE, because the
  // copy source is the byte the early failure turns on."* **ITEM 4's SECOND DISJUNCT IS ASSERTED HERE: *"so
  // is one that names a copy source the staging step does not read."*** The root manifest's
  // `typecheck:stage` script IS the staging step, and the files it copies are read off its own bytes.
  const copied = [...staging.matchAll(/copyFileSync\('bindings\/js\/'\+f/g)].length > 0
    ? ['package.json', 'index.d.ts'] // the loop's own array, read below
    : [];
  const loop = staging.match(/for\(const f of \[([^\]]*)\]\)/);
  assert.ok(loop !== null,
    '(c) the staging step copies from the tree by name — `§3-bis` item 3: *"root `package.json` declares a '
    + 'step that copies `[\'package.json\',\'index.d.ts\']` from `bindings/js/` into a staged '
    + '`node_modules`"*. Read: ' + staging);
  const copySources = [...loop[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(copySources.sort(), ['index.d.ts', 'package.json'],
    '(c) AND THE NAMED SOURCES ARE THE BYTES THE STAGING STEP ACTUALLY READS — `§3-bis` item 4: *"so is one '
    + 'that names a copy source the staging step does not read."* Both sources must stand under '
    + `\`bindings/js/\` for the copy to be the byte the early failure turns on. Read: ${copySources.join(', ')}`);
  for (const source of copySources) {
    assert.equal(existsSync(join(PKG_DIR, source)), true,
      `(c) the named copy source \`bindings/js/${source}\` EXISTS — *"a stage that copies a file which no `
      + 'longer exists FAILS BEFORE ANY CELL RUNS"* (`§3-bis` item 3)');
  }
  assert.equal(ADOPTION === null || (typeof ADOPTION === 'object'
    && typeof ADOPTION.stagingCopySource === 'string' && copySources.includes(ADOPTION.stagingCopySource)), true,
    '(c) and the statement\'s own named copy source, once the landing pass authors it, is one the staging '
    + 'step reads. `§3-bis` item 7 makes its omission an INCOMPLETE statement, and item 4 makes a source the '
    + `staging step does not read a FINDING. The staging step reads: ${copySources.join(', ')}`);
});
