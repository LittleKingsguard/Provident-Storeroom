# LIVE REPORT — the blind greens set `JAS` (the `file` tier's JSON codec as a declared contract) driven against the RUNNING PACKAGE

**THE SET UNDER TEST.** `docs/specs/storeroom-json-acceptance-set-greens.md` — the blind scenario set for this
wave (`JAS-01`…`JAS-12`, `50` cells), written from the documentation alone and run once against the live package
(**the set's census ON DISK NOW: `50` cells · `48` PASS · `0` FAIL · `1` LAYER-LIMIT · `1` CLOSED · `0` OBSERVED ·
`0` GAP** — the set was RE-SPELLED on 2026-10-22, AFTER this report's run; at this run it read `50` cells · `46`
PASS · `0` FAIL · `2` LAYER-LIMIT · `1` OBSERVED · `1` GAP`).

**⟶ RE-READ 2026-10-22 (A LATER PROOFREADING PASS) — THE SET AND THE CARRIER WERE RE-SPELLED AFTER THIS REPORT'S
RUN, AND EVERY READING OF THE SET'S OWN STATE IN `§2`, `§4.1` AND `§5` BELOW IS THE PRE-RE-SPELLING READING. EACH
IS MARKED WHERE IT STANDS, AND THE SET'S CURRENT CENSUS IS NAMED AT EACH. THIS REPORT'S OWN RUN FIGURES DO NOT
MOVE: `52` cells · `49` PASS · `0` FAIL · `1` LAYER-LIMIT · `2` OBSERVED · `0` GAP · `0` AMENDMENT-PENDING · `0`
FINDING; runner exit `0`.** **NO CELL VERDICT, NO FINDING AND NO RUN FIGURE OF THIS REPORT IS CHANGED BY THIS
RE-READ.**

**THE LIVE RUNNER.** `bindings/js/greens/json-acceptance-set-live.mjs` — an INDEPENDENT re-drive of the set's
twelve scenarios, written against the set's own cell ids so the two censuses can be diffed cell by cell.
**RUN, from the repository root:** `node bindings/js/greens/json-acceptance-set-live.mjs`. **EXIT `0`** (the house
rule: exit `0` iff no cell FAILed and no cell was a FINDING; a LAYER-LIMIT, an OBSERVED and a GAP do not move the
exit). **THE RUN WAS EXECUTED THREE TIMES AND THE OUTPUT WAS BYTE-IDENTICAL ON ALL THREE.**

**THE SURFACE DRIVEN.** The ASSEMBLED, RUNNING package: the built `storeroom-js-binding` — the staged
`bindings/js/build/Release/storeroom_js_binding.node` — reached through the package's own claimed ESM entry
`bindings/js/index.mjs` (`storeCreate` · `read` · `write`), in-process, against REAL files on a REAL disk, with the
corpus's own kernel module (`bindings/js/src/constraint-kernel.mjs`) driving the terminal arm's commit route.

---

## §0. THE LAYER CLAIM

**THIS RUN VERIFIES THE ASSEMBLED, RUNNING APPLICATION, IN-PROCESS, OVER REAL FILES ON A REAL DISK — THE VERDICT
IS ADDITIVE AND APP-GREEN, AND IT NEVER RETIRES AN ENVELOPE / NODE / TRIO ROW.** The node suite and the trio
verify the pure/envelope layer, and **a node-green stays green on its own layer**: nothing this report says moves
any node, trio or envelope row, and nothing this report says narrows any layer claim the set makes. The blind set's
own layer statement (`ENVELOPE/PURE`; the `APP` layer `NONE`) is **not contradicted** by this pass — this pass adds
the live, assembled, on-disk verification of the same cells and claims nothing over the envelope layer.

**THE SCRATCH DISCIPLINE.** Every path of every scenario lives in an `fs.mkdtempSync` directory under the platform
temp root and is removed at the end of the run (**`0` leftover directories after the run**); **nothing was written
inside the repository by the run** — the only bytes this pass wrote in the tree are the runner and this report.

**NO REPAIR WAS MADE.** No file under `src/**`, `tests/**`, `bindings/js/src/**`, no spec document, no tracker and
no cell of the blind set was edited by this pass. The other modifications visible in the working tree
(`docs/decisions.md`, `docs/defects.md`, `docs/specs/storeroom-native/contract.md`,
`docs/specs/storeroom-native/seams-and-lifecycle.md`, `src/store.rs`, `tests/e2e_json_round_trip.rs`,
`tests/properties.rs`, `scratch/depth-probe/`) were already in the tree when this pass began and were NOT touched
by it.

---

## §1. THE BUILD, AND THE STAGING STEP USED

**THE PROJECT'S OWN DOCUMENTED STEP WAS USED, IN BOTH HALVES, WITH THE PROJECT'S OWN OFFLINE CARGO HOME** (the
form the blind set used, for the same reason — the bare form wants a crates.io index refresh):

1. `CARGO_HOME="$PWD/.cargo-home" cargo build --offline --release` — the root crate (`storeroom-native`): **ok**.
2. `CARGO_HOME="$PWD/.cargo-home" cargo build --release --offline --manifest-path bindings/js/Cargo.toml` — the
   binding crate: **ok**.

**THE STAGING STEP IS `scripts/publish.sh`'s OWN (lines 192–195):**

```
cp -f bindings/js/target/release/libstoreroom_js_binding.so \
      bindings/js/build/Release/storeroom_js_binding.node
```

**THE STAGED ARTEFACT IS NOT A STALE ONE, AND THIS WAS CHECKED, NOT ASSUMED.** The build output
(`bindings/js/target/release/libstoreroom_js_binding.so`, `2026-10-22 05:53`) post-dates the current sources
(`src/store.rs`, `2026-10-22 05:22`), and the staged copy is **byte-identical to it** (`md5
83019d359bc304adf5115f4da07590d5` for both). **THE RUNNING PROCESS'S OWN `/proc/self/maps` NAMES THE STAGED
ARTEFACT** — `…/bindings/js/build/Release/storeroom_js_binding.node` — so the cells below were driven against the
staged `.node`, not against a stale one. The package's own namespace is the one declared name `storeCreate`.

---

## §2. THE DEPTH AMENDMENT — WHAT IT SAID WHEN IT WAS RE-READ, AND WHAT WAS DONE ABOUT IT

**THE RE-READ WAS DONE IMMEDIATELY BEFORE THIS REPORT WAS WRITTEN, AGAINST BOTH THE SET AND THE CARRIER.** **IT IS
THE PRE-RE-SPELLING RE-READ: the set and the carrier were re-spelled on 2026-10-22, AFTER this report was written,
and the table's `state` column now names the CURRENT state with the reading of this run beside it.**

| document | the counting convention, as it stands | state |
| --- | --- | --- |
| `docs/decisions.md` · `A143` (1) | *"**AND THE COUNTING CONVENTION IS NAMED: THE ROOT OBJECT IS THE FIRST LEVEL, SO THE REFUSED IMAGE IS THE `128`th LEVEL OF NESTED CONTAINERS (THE ROOT COUNTED) — EQUIVALENTLY, IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`), THE FIRST REFUSED VALUE IS WALK-DEPTH `127` AND THE LAST ACCEPTED IS WALK-DEPTH `126`**"* | **LANDED** |
| `docs/decisions.md` · `A144` (1) | *"**an image of `127` CONTAINERS (the root counted) IS ACCEPTED and an image of `128` CONTAINERS IS REFUSED**"* | **LANDED** |
| `docs/specs/storeroom-native/seams-and-lifecycle.md §7.2` item 7 (f) class (4) | the class sentence now reads *"A NESTING DEPTH OF `128` OR MORE IS REFUSED"* + the `64`-ceiling clause, **AND — AS RE-SPELLED 2026-10-22, AFTER THIS REPORT'S RUN — THE COUNTING CONVENTION IN ITS OWN WORDS** (*"THE LOADER'S COUNT IS `serde_json`'S OWN RECURSION COUNT, IN WHICH THE ROOT OBJECT IS THE FIRST LEVEL ⇒ `127` CONTAINERS (THE ROOT COUNTED) ARE ACCEPTED AND `128` CONTAINERS ARE REFUSED; IN THE CORPUS'S WALK-DEPTH CONVENTION (THE ROOT AT `0`) THE LAST ACCEPTED VALUE IS WALK-DEPTH `126` AND THE FIRST REFUSED IS WALK-DEPTH `127`"*), **and it cites `A143` (1) and `A144` (1)** — the rows that carry the convention. | **LANDED** (at this report's run: **NOT YET RE-SPELLED** — the rows it cites carried it) |
| `docs/specs/storeroom-json-acceptance-set-greens.md` — the `JAS-07` row | now *"**THE LOADER'S BOUNDARY, ON THE FOREIGN-FILE ROUTE**"* · `2` cells · `2` PASS — **RE-SPELLED 2026-10-22, AFTER THIS REPORT'S RUN**; at this run it read *"**THE CLASS IS OUT OF THIS LAYER'S REACH**"* · `2` cells · `1` LAYER-LIMIT · `1` OBSERVED | **RE-SPELLED** (at this report's run: **NOT YET RE-SPELLED**) |
| `docs/specs/storeroom-json-acceptance-set-greens.md` — the `JAS-12` row | now *"the depth class's counting convention — **THE GAP IS CLOSED** by the clause it named"* · `1` cell · `1` CLOSED — **RE-SPELLED 2026-10-22, AFTER THIS REPORT'S RUN**; at this run it read *"one gap: the depth class's counting convention"* · `1` cell · `1` GAP | **RE-SPELLED** (at this report's run: **NOT YET RE-SPELLED**) |

**SO: THE AMENDMENT HAS LANDED — IN THE TWO DECISION ROWS THAT THE CLASS ITSELF CITES — AND THE DEPTH SCENARIO WAS
RE-DRIVEN AGAINST THAT FINAL WORDING. NOTHING IS CARRIED AS `AMENDMENT-PENDING`.**

**THE EXPECTATION WAS READ FROM THE DOCUMENTS BY THE RUNNER, NOT HARD-CODED BY ME.** The runner parses the two
figures out of `A144 (1)` at run time (`ACCEPT=127` containers, `REFUSE=128` containers, the root counted) and
drives exactly those; had the amendment not been there, the runner would have printed `AMENDMENT-PENDING` and
recorded the measurement without asserting it. **THE RE-DRIVE'S FINAL VERDICT IS AT `JAS-07` AND `JAS-12` BELOW.**

**WHAT THE RE-SPELLING DOES AND DOES NOT CHANGE, STATED SO A READER IS NOT MISLED.** The counting convention is a
DOCUMENTATION amendment; it changes no byte of the loader, and the live boundary is exactly what it was before the
amendment. **THE ONE THING THE AMENDMENT CHANGES FOR THIS SET IS THAT THE DEPTH CLASS BECOMES DERIVABLE — AND
THEREFORE ASSERTABLE — FROM THIS LAYER**, because the boundary is now named exactly (the root counted as the first
level) instead of being reconcilable only under one reading.

---

## §3. THE SCENARIOS, IN ORDER

**EVERY SCENARIO BELOW STARTS FROM A REAL USER INPUT OR AN EXTERNAL EVENT — A FILE WRITTEN BY HAND ON A REAL DISK,
OR A VALUE WRITTEN THROUGH THE PUBLIC API — AND EVERY ONE RUNS TO THE SETTLED END STATE: THE FILE'S BYTES ON DISK,
THE REGISTER AS THE CALLER SEES IT, THE CONSTRUCTION'S ANSWER.**

### `JAS-01` — class 1: a raw control character inside a string is refused, and the escaped form is accepted
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND (`fs.writeFileSync`) at a fresh path in a real temporary
  directory — a file the store did not write — booted by the package's own `storeCreate`.
- **STEPS.** write the bytes at the path; boot the store over them; read the whole register (`read([])`) and the
  keys (`read(['a'])`, `read(['b'])`); read the file's bytes back off the disk.
- **FINAL RESOLVED STATE.** `JAS-01.1` (literal `LF`) · `JAS-01.2` (literal `TAB`) · `JAS-01.3` (literal `NUL`):
  the construction **returned an instance** (no error reached the caller), the register is **`{}`**, both `read(a)`
  and `read(b)` answer **`AddressNotFound`**, and **the refused file's bytes on disk are unchanged** (byte-identical
  to what was written). `JAS-01.4` (the escaped form `\u0000`): the register is **`{"a":"x\u0000y","b":7}`** and
  `read(a)` is the string carrying the NUL. `JAS-01.5` (control): **`{"a":"xy","b":7}`**. `JAS-01.6` (the five
  short escapes `\b \t \n \f \r`): each key loads and its value carries the escaped control character — all five
  ADMITTED.
- **VERDICT.** `JAS-01.1`–`JAS-01.6` — **PASS** (`6`/`6`).

### `JAS-02` — class 2, the grammar violation: eleven number spellings the JSON grammar does not admit are refused
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, one per named spelling, booted by the package's
  own `storeCreate`.
- **STEPS.** write the bytes; boot; read the whole register; settle on the register the caller sees.
- **FINAL RESOLVED STATE.** `JAS-02.1`–`JAS-02.11` (`01` · `+1` · `.5` · `1.` · `1e` · `Infinity` · `NaN` · `0x1` ·
  `1_0` · `--1` · `1.2.3`): the construction returns an instance and the register is **`{}`** in every case — the
  WHOLE file does not load. `JAS-02.12` (control): **`{"a":1,"b":7}`**.
- **VERDICT.** `JAS-02.1`–`JAS-02.12` — **PASS** (`12`/`12`).

### `JAS-03` — class 2, the overflow: a grammar-admitted number whose value does not fit is refused
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, one per named spelling.
- **STEPS.** write the bytes; boot; read the whole register and the key.
- **FINAL RESOLVED STATE.** `JAS-03.1` (`1e400`) · `JAS-03.2` (`1e999999999`) · `JAS-03.3` (`1e309`): the register
  is **`{}`** in each case. `JAS-03.4` (control, `1e308`): the register is **`{"a":1e308,"b":7}`** and `read(a)` is
  `1e+308`.
- **VERDICT.** `JAS-03.1`–`JAS-03.4` — **PASS** (`4`/`4`).

### `JAS-04` — class 2, the underflow half: a number whose value underflows is ACCEPTED and becomes 0
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, one per named spelling.
- **STEPS.** write the bytes; boot; read the whole register and the key.
- **FINAL RESOLVED STATE.** `JAS-04.1` (`1e-400`) · `JAS-04.2` (`1e-324`): the register is **`{"a":0,"b":7}`** and
  `read(a)` is **`0`** in both cases — the underflow half is accepted and it becomes zero. `JAS-04.3` (control,
  `1e-300`): **`{"a":1e-300,"b":7}`** and `read(a)` is `1e-300` — not zeroed.
- **VERDICT.** `JAS-04.1`–`JAS-04.3` — **PASS** (`3`/`3`).

### `JAS-05` — class 3: exactly four token separators are admitted and a Unicode whitespace separator is refused
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, one per separator.
- **STEPS.** write the bytes; boot; read the whole register and the key.
- **FINAL RESOLVED STATE.** `JAS-05.1` (space) · `JAS-05.2` (tab) · `JAS-05.3` (`LF`) · `JAS-05.4` (`CR`): the
  register is **`{"a":1,"b":2}`** in each case. `JAS-05.5` (`U+00A0` as the separator): the register is **`{}`** —
  the whole file does not load. `JAS-05.6` (control, `U+00A0` INSIDE a string): the register is
  **`{"a":"x\u00A0y","b":2}`**.
- **VERDICT.** `JAS-05.1`–`JAS-05.6` — **PASS** (`6`/`6`).

### `JAS-06` — the widening class: the loader accepts an escaped surrogate pair
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, carrying `\uD83D\uDE00`.
- **STEPS.** write the bytes; boot; read the key.
- **FINAL RESOLVED STATE.** the register is **`{"a":"<the pair>","b":7}`**; `read(a)` is a string of **length `2`**
  whose code units are **`0xD83D` and `0xDE00`**; `read(b)` is `7`.
- **VERDICT.** `JAS-06.1` — **PASS** (`1`/`1`).

### `JAS-07` — class 4: the nesting depth — **RE-DRIVEN AGAINST THE FINAL WORDING** (see §2)
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, carrying `N` nested containers — the root
  object counted as the first level — booted by the package's own `storeCreate`. (A foreign file is the declared
  home of this refusal class: `A143` (3).)
- **STEPS.** write the bytes at the path; boot the store over them; read the whole register and the key; read the
  file's bytes back off the disk. The boundary is **MEASURED, not assumed**: the runner probes `126` · `127` · `128`
  · `129` containers.
- **FINAL RESOLVED STATE.** `JAS-07.1` (an image of **`128` containers** — the corpus's walk-depth `127` — the
  DECLARED REFUSED FIGURE): the construction **returns an instance** (no error reaches the caller), the register is
  **`{}`**, `read(a)` and `read(b)` both answer **`AddressNotFound`**, and **the refused file is left on disk
  untouched** (`261` bytes). `JAS-07.2` (an image of **`127` containers** — walk-depth `126`, the DECLARED ACCEPTED
  FIGURE): the register carries the key `a`, and `read(a)` **IS the nested array** — an array of **depth `126`**
  whose innermost value is `0`. The measured bracket: `126` → LOADED, `127` → LOADED, `128` → REFUSED, `129` →
  REFUSED.
- **VERDICT.** `JAS-07.1` — **PASS** · `JAS-07.2` — **PASS** (both were `LAYER-LIMIT` / `OBSERVED` in the set as it
  stood; both are re-driven and asserted here against the amended convention). `JAS-07.x1` — **OBSERVED** (the
  measured bracket, recorded not asserted — the runner's own extra cell, not one of the set's).

### `JAS-08` — the answer for a file the loader refuses, arm (a)
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, carrying a raw `LF` inside a string.
- **STEPS.** write the bytes; boot; read the whole register and the keys; settle on the construction's answer.
- **FINAL RESOLVED STATE.** `JAS-08.1`: the construction **returns an INSTANCE** and no error reaches the caller.
  `JAS-08.2`: the register **begins EMPTY** (`{}`) and `read(a)` answers `AddressNotFound`. `JAS-08.3`: the whole
  file does not load — the sibling well-formed key `b` is gone too (`read(b)` → `AddressNotFound`). `JAS-08.4`
  (control, a parseable file with one non-admitted member): the register is **`{"b":7}`** — the `null` member is
  dropped, the rest loads, the instance is returned and no code is produced for the dropped key.
- **VERDICT.** `JAS-08.1`–`JAS-08.4` — **PASS** (`4`/`4`).

### `JAS-09` — the answer for a file the loader refuses, arm (b)
- **START.** A FOREIGN IMAGE HAND-WRITTEN BY HAND at a fresh path, carrying a raw `LF`, booted with a **SUPPLIED
  CONSTRAINT LIST** (`cfg.constraints`).
- **STEPS.** write the bytes; boot with the list; settle on the construction's answer — an instance, or the thrown
  status.
- **FINAL RESOLVED STATE.** `JAS-09.1` (a list naming at least one address, `[{address:['x'], id:'c1'}]`): the
  construction **threw `{status:"ConstraintListInvalid", message:"'x' is not a valid constraint entry in
  'constraints', a constraint entry is an address and an id, and the address is a segment array", log:[]}`** and
  **NO INSTANCE IS RETURNED**. `JAS-09.2` (control, an EMPTY list over the same refused file): the instance IS
  returned and the register is `{}` — the answer stays in arm (a). `JAS-09.3` (control, the SAME list over a
  parseable image that carries the address): the instance IS returned and the register is **`{"x":1}`** — so the
  refusal at `JAS-09.1` is the LOAD-SIDE validation over the empty register, not a refusal of the list's own shape.
- **VERDICT.** `JAS-09.1`–`JAS-09.3` — **PASS** (`3`/`3`).

### `JAS-10` — the store's own image round trips: what the store writes, the loader reads back
- **START.** A VALUE WRITTEN THROUGH THE PUBLIC API at the `file` tier — the kernel's own commit route, the
  terminal arm's act — committed to a REAL path on a REAL disk.
- **STEPS.** write the value; let the commit land; **read the file's BYTES on disk**; boot a **FRESH** store over
  the same path; read the register and the key.
- **FINAL RESOLVED STATE.** every cell: the commit reports **`outcome="passed"`**, the bytes on disk are the
  store's own image, and the fresh boot's register and `read(a)` carry the value **exactly**:

  | cell | value written | the bytes on disk | the fresh boot reads back |
  | --- | --- | --- | --- |
  | `JAS-10.1` | `"hello"` | `{"a":"hello"}` | `{"a":"hello"}` · `read(a)="hello"` |
  | `JAS-10.2` | `42` | `{"a":42}` | `{"a":42}` · `read(a)=42` |
  | `JAS-10.3` | `true` | `{"a":true}` | `{"a":true}` · `read(a)=true` |
  | `JAS-10.4` | `{x:1,y:"two"}` | `{"a":{"x":1,"y":"two"}}` | `{"a":{"x":1,"y":"two"}}` |
  | `JAS-10.5` | `[1,2,3]` | `{"a":[1,2,3]}` | `{"a":[1,2,3]}` |
  | `JAS-10.6` | `"a\u0000b"` | `{"a":"a\u0000b"}` — **the image ESCAPES the control character** | `{"a":"a\u0000b"}` · `read(a)="a\u0000b"` |
  | `JAS-10.7` | `-0` | `{"a":0}` | `{"a":0}` · `read(a)=0` — the ONE declared normalisation |

- **VERDICT.** `JAS-10.1`–`JAS-10.7` — **PASS** (`7`/`7`).

### `JAS-11` — the commit's own verification — **OUT OF THIS LAYER'S REACH** (the set's own limit, re-driven)
- **START.** A VALUE WRITTEN THROUGH THE PUBLIC API at the `file` tier, at the depths the package's own walk
  guards — the write route is the only route by which this layer produces an image at all.
- **STEPS.** write the value at the `file` tier; read the caller's answer; read the file's bytes on disk.
- **FINAL RESOLVED STATE.** `JAS-11.x1` (**OBSERVED**, the runner's own extra cell): a `file`-tier write at depth
  **`64` does NOT throw**; the writes at depths **`65` and `127` are refused with `ValueNotAdmitted`** — the
  PACKAGE'S OWN WALK, before the commit route is reached — and the file on disk holds the depth-`64` image
  (`137` bytes), which the loader admits. **THE COMMIT'S OWN VERIFICATION (the re-decode and the
  `FileCommitFailed` refusal) IS NEVER REACHED FROM THIS LAYER.**
- **VERDICT.** `JAS-11.1` — **LAYER-LIMIT** (never a pass, never a failure). **THE SET'S OWN LIMIT WORDING IS KEPT
  AND THE LIMIT IS NOW DRIVEN, NOT ONLY CITED:** the commit's verification fires only for an image the LOADER would
  refuse; the loader's ceiling is `128` nested containers (`A144` (1)); the JS package's own walk refuses a value of
  depth `65` before any verb is called (`crossing.md §1.4` item 5); the store admits a value of any depth
  (`A143` (1)); so the only route by which the JS surface could hand the store such a value is closed by the
  package's own walk, and **`A144` (1) says the same in its own words: "THE JS SURFACE CANNOT REACH IT — THE NATIVE
  LIBRARY'S OWN API WAS."** *(The verification itself is implemented in the store's own `write_file` — `src/store.rs`
  — and the built package carries it; it is the REACH that this layer does not have.)*

### `JAS-12` — the gaps in the declaration itself — **RE-DRIVEN AGAINST THE FINAL WORDING** (see §2)
- **START.** THE DECLARATION AS IT STANDS ON DISK — the carrier's class (4) and the two decision rows that name
  the counting convention.
- **STEPS.** read the documents; compare their figures with the live boundary measured at `JAS-07`; settle on
  whether the clause now says enough to derive a boundary cell.
- **FINAL RESOLVED STATE.** the convention **IS declared** — `A144` (1) states it in figures (*"an image of `127`
  CONTAINERS (the root counted) IS ACCEPTED and an image of `128` CONTAINERS IS REFUSED"*) and `A143` (1) states it
  in the other convention (*"THE ROOT OBJECT IS THE FIRST LEVEL … THE FIRST REFUSED VALUE IS WALK-DEPTH `127` AND
  THE LAST ACCEPTED IS WALK-DEPTH `126`"*) — and **the live boundary agrees with the declared figures exactly**
  (`127` containers accepted, `128` refused, measured at `JAS-07`).
- **VERDICT.** `JAS-12.1` — **PASS** (the set's `GAP` is closed by the second branch the gap cell itself named:
  *"`A144` (1) would have to state that its walk-depth figure IS its nested-container figure"*).

---

## §4. THE SUMMARY

```
SUMMARY 52 cells · 49 PASS · 0 FAIL · 1 LAYER-LIMIT · 2 OBSERVED · 0 GAP · 0 AMENDMENT-PENDING · 0 FINDING
```

**`52` cells = the set's `50` cell ids (`JAS-01.1` … `JAS-12.1`) + `2` extra live observations of this runner's own
(`JAS-07.x1`, the measured depth bracket; `JAS-11.x1`, the write-side depth answers).** **OF THE SET'S OWN `50`
CELLS: `49` PASS · `1` LAYER-LIMIT (`JAS-11.1`) · `0` FAIL · `0` GAP.**

| id | cells | PASS | FAIL | LAYER-LIMIT | OBSERVED | GAP | AMENDMENT-PENDING | FINDING |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **`JAS-01`** | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-02`** | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-03`** | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-04`** | 3 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-05`** | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-06`** | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-07`** | 2 (+1 obs) | 2 | 0 | 0 | 1 | 0 | 0 | 0 |
| **`JAS-08`** | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-09`** | 3 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-10`** | 7 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |
| **`JAS-11`** | 1 (+1 obs) | 0 | 0 | **1** | 1 | 0 | 0 | 0 |
| **`JAS-12`** | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| **TOTAL (the set's `50`)** | **50** | **49** | **0** | **1** | **0** | **0** | **0** | **0** |
| **the runner's own extras** | 2 | 0 | 0 | 0 | **2** | 0 | 0 | 0 |
| **TOTAL (all `52`)** | **52** | **49** | **0** | **1** | **2** | **0** | **0** | **0** |

`6 + 12 + 4 + 3 + 6 + 1 + 2 + 4 + 3 + 7 + 1 + 1 = 50` ✓ and `49 + 0 + 1 + 0 + 0 + 0 + 0 = 50` ✓.

### §4.1 THE DIFF AGAINST THE SET'S OWN CENSUS — the three cells that moved, and why

| cell | the set's own verdict (as it stood on disk AT THIS RUN — the pre-re-spelling reading) | this live run | why it moved |
| --- | --- | --- | --- |
| `JAS-07.1` | **LAYER-LIMIT** (*"THE CLASS IS OUT OF THIS LAYER'S REACH"*) | **PASS** | The depth class is the **LOADER's** acceptance set, and the loader's route — a **foreign file hand-written on disk**, the class's own declared home (`A143` (3)) — **IS** reachable from this layer; the set itself records that neighbouring state at `JAS-07.2` and puts the ruling to the supervisor at its `§3.0` (the set's depth-class section — it stood at `§3.1` in the set's pre-re-spelling numbering, and the set's `§3.1` is now the commit-verification limit). The amendment names the boundary exactly, so the cell is derivable and is now asserted: **`128` containers (walk-depth `127`) are REFUSED — the whole file does not load, the register begins empty, the instance is returned, no error reaches the caller.** |
| `JAS-07.2` | **OBSERVED** (*recorded and not asserted*) | **PASS** | Same amendment, same route: **`127` containers (walk-depth `126`) are ACCEPTED** — the key loads and its value is the nested array (depth `126`). |
| `JAS-12.1` | **GAP** (*"the depth class's counting convention"*) | **PASS** | The gap is closed by the second branch the gap cell itself named — `A144` (1) now states the figures — and the live boundary agrees with them exactly. |

**AND THE SET'S OWN ROWS HAVE SINCE BEEN RE-SPELLED (2026-10-22, AFTER THIS RUN): ITS `JAS-07.1` AND `JAS-07.2` ARE
NOW BOTH `PASS` AND ITS `JAS-12.1` IS NOW `CLOSED` (THE SET'S OWN TOKEN FOR A DOCUMENTARY CELL), AND THE SET'S
CURRENT CENSUS IS `50` cells · `48` PASS · `0` FAIL · `1` LAYER-LIMIT (`JAS-11.1`) · `1` CLOSED (`JAS-12.1`) · `0`
OBSERVED · `0` GAP — THE DIFF ABOVE IS THE DIFF AGAINST THE SET AS IT STOOD AT THIS RUN.**

**NO OTHER CELL MOVED. EVERY OTHER VERDICT IS THE SET'S OWN VERDICT, RE-DRIVEN AND CONFIRMED AGAINST THE RUNNING
PACKAGE.** **NOTHING IN THIS SECTION IS A FINDING: the set's own `§3.0` records the neighbouring foreign-file state
and defers the ruling to the supervisor, and the live bytes agree with that recorded state exactly.**

---

## §5. FINDINGS

**NONE.** **NO CELL FAILED, AND NO LIVE CONTRADICTION OF THE SET WAS OBSERVED.** Every declared verdict the set
records — `46` PASS, `2` LAYER-LIMIT, `1` OBSERVED, `1` GAP — was re-driven against the running package and came
out as the set declares it, and the three cells that moved (`JAS-07.1`, `JAS-07.2`, `JAS-12.1`) moved **because the
amendment landed**, not because the live app contradicted the set. **⟶ AND THE SET'S OWN CENSUS AS IT STANDS ON
DISK, AFTER ITS RE-SPELLING OF 2026-10-22, IS `48` PASS, `1` LAYER-LIMIT (`JAS-11.1`), `1` CLOSED (`JAS-12.1`), `0`
OBSERVED, `0` GAP` — THE RE-SPELLING MOVED `JAS-07.1` AND `JAS-07.2` TO `PASS` AND `JAS-12.1` TO `CLOSED`, AND THE
SET'S OWN RE-RUN OF THE SAME FIGURES IS THE SET'S OWN RECORD AND NOT THIS ONE.**

### §5.1 TWO NOTES FOR THE SUPERVISOR — **NOT FINDINGS, AND NOT REPAIRS**

1. **THE SET'S OWN `JAS-07` / `JAS-12` ROWS AND THE CARRIER'S CLASS (4) SENTENCE HAVE SINCE BEEN RE-SPELLED — ON
   2026-10-22, AFTER THIS REPORT'S RUN.** **AS THEY STOOD ON DISK AT THIS REPORT'S RE-READ (immediately before this
   report was written), the set's `JAS-07` row read *"THE CLASS IS OUT OF THIS LAYER'S REACH"* and its `JAS-12` row
   read *"one gap: the depth class's counting convention"*, and the carrier's class (4) sentence read *"A NESTING
   DEPTH OF `128` OR MORE IS REFUSED"* without the convention in its own words — **although the two rows that
   sentence cites (`A143` (1) and `A144` (1)) DID carry it.** **THE RE-SPELLING WAS THE BLIND WRITER'S TO MAKE; THIS
   PASS DID NOT MAKE IT, AND DID NOT EDIT THE SET** — the blind writer's re-spelling of 2026-10-22 has since landed,
   and the set's current rows and census are named at `§2` and at `§4.1` above. The re-drive above is against the
   convention as the decisions state it, which is the amendment's substance.
2. **THE LAYER LIMIT THAT REMAINS IS THE WRITE-SIDE ROUTE, NOT THE CLASS.** The set's `JAS-11.1` limit holds and is
   now driven rather than only cited; the depth class itself is **not** out of this layer's reach — the loader's
   route to it is a foreign file, and the live app answers it exactly as the amended clause says.

---

## §6. THE ARTEFACTS THIS PASS WROTE

| artefact | what it is |
| --- | --- |
| `bindings/js/greens/json-acceptance-set-live.mjs` | the live runner (`node bindings/js/greens/json-acceptance-set-live.mjs`, exit `0`); it reads the declared figures out of the documents at run time, so the depth expectation is never hard-coded |
| `docs/specs/storeroom-json-acceptance-set-live-report.md` | this report |

**NOTHING ELSE WAS WRITTEN BY THIS PASS.** No `src/**` file, no `tests/**` file, no `bindings/js/src/**` file, no
spec document, no tracker and no cell of the blind set was edited, and no implementation byte was repaired.

**⟶ AND A LATER PROOFREADING PASS (2026-10-22) EDITED THIS REPORT ALONE — the stale readings of the set's
pre-re-spelling state at `§2`, `§4.1` and `§5` and the two `§3.1` cross-references at `§4.1` — AND NO ARTEFACT, NO
RUNNER, NO CELL VERDICT, NO FINDING AND NO RUN FIGURE WAS TOUCHED.**

**⟶ AND THE DOCUMENTATION REVIEW OF THIS WAVE (2026-10-22, `role_documentation_reviewer`) READ THIS REPORT AT THE BYTES
THE PROOFREADING PASS LEFT, AND FOUND NO FURTHER STALE ENTRY IN IT — THE HEADER'S RE-READ CLAUSE, §2'S TABLE, §4.1'S
COLUMN AND §5'S SENTENCE NOW CARRY THE SET'S CURRENT CENSUS AND NAME THE PRE-RE-SPELLING READING BESIDE IT, AND THIS
REPORT'S OWN RUN FIGURES, ITS `52` CELLS, ITS `49` PASS, ITS `1` LAYER-LIMIT, ITS `2` OBSERVED, ITS `0` FINDING, ITS
EXIT `0` AND ITS `0` FINDINGS STAND UNMOVED.** **THE LAYER CLAIM AT `§0` STANDS AS PRINTED: THIS RUN IS ADDITIVE AND
`APP`-GREEN, IT NEVER RETIRES AN ENVELOPE / NODE / TRIO ROW, A NODE-GREEN STAYS GREEN ON ITS OWN LAYER, AND AN
`APP`-GREEN DOES NOT STAND IN FOR A NODE-GREEN.** **THE REVIEW'S RECORD:
`archive/reviews/2026-10-22-storeroom-json-codec-wave-doc-review.md` — the `archive/` tree is gitignored by the
repository's own `.gitignore` (the corpus's rule), so the tracker cells carry the pointer.**

**run: 2026-10-22 — `node bindings/js/greens/json-acceptance-set-live.mjs` from the repository root, three
consecutive runs against the freshly built and freshly staged package, BYTE-IDENTICAL output: `52` cells · `49` PASS
· `0` FAIL · `1` LAYER-LIMIT · `2` OBSERVED · `0` GAP · `0` AMENDMENT-PENDING · `0` FINDING; runner exit `0`. Layer:
the ASSEMBLED, RUNNING JavaScript package (the staged `storeroom_js_binding.node` through the package's own ESM
entry) over real files on a real disk — **ADDITIVE AND APP-GREEN; no envelope / node / trio row is retired.**
