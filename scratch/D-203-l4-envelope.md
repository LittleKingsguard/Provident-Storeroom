# Envelope — `D-203` · THE ARM'S DECLARATION SPELLS THE FACTORY WITH TWO POSITIONS · L4 landing pass · 2026-11-20

**THE PATCH:** `scratch/D-203-factory-region.patch` — **16 files**, `651` insertions, `143` deletions, `1,109` lines;
`git apply --check` **exit `0`** against a pristine `HEAD` (`0b80b17`) export, and applied there cleanly with `patch -p1`
(16/16 files). **`strata/**` IS NOT TOUCHED BY IT AND THIS ENVELOPE IS THE ONLY THING RETURNED BESIDE IT.**

**THE RUNS, EACH TAKEN ONCE, ON THIS WORKING TREE WITH THE PATCH APPLIED** (`CARGO_HOME` pointed at this tree's own
`.cargo-home`, which is what `scripts/publish.sh` does at `:93` — an unset `CARGO_HOME` cannot resolve `napi` offline):

| leg | invocation | result |
|---|---|---|
| JS suite | `npm test` | **exit `0`** · `1401` tests · `1401` pass · **`0` fail** · **`0` skipped** (= `D-203` item 6's `1400` **plus `CW-10`**) |
| typecheck | `npm run typecheck` | **exit `0`** (both legs) |
| Rust batteries | `CARGO_HOME=$PWD/.cargo-home cargo test` | **exit `0`** · **`23`** `test result: ok` lines · **`0` FAILED** |
| wasm compile | `CARGO_HOME=$PWD/.cargo-home cargo check --offline --target wasm32-unknown-unknown --manifest-path bindings/js/Cargo.toml` | **exit `0`**, **0 errors** |
| build | `CARGO_HOME=$PWD/.cargo-home npm run build` | **exit `0`** |
| wasm package | `node scripts/build-wasm-package.mjs` | **exit `0`** — `@auspicion/provident-storeroom-js-wasm @ 2.0.1` staged; **the nineteen module entries unmoved** (`CW-6` re-read them, green) |
| figures | `bash scripts/publish.sh --figures` | **`ok`** — three shipped documents, three lines, one generator, *"all three shipped documents' version lines AGREE with the manifest"* |
| publish cells | `node --test tests/e2e/staged-install/publish.test.mjs` | **`66` tests · `66` pass · `0` fail · `0` skipped**, `W-STEP-1` green |
| arm cells | `node --test tests/e2e/wasm-arm.test.mjs` | **`9/9`** — `CW-10` red before, green after (both readings printed below) |
| generator cells | `node --test tests/e2e/realm-declaration.test.mjs` | **`3/3`** |

**AFTER THE RUNS THE TREE WAS RETURNED TO `HEAD`** (`git checkout -- .`), and the two ignored build stages were re-made
against the reverted manifests (`npm run build`, `node scripts/build-wasm-package.mjs`) so that no stale artefact is left
answering `2.0.1` beside a manifest reading `2.0.0`: `publish.test.mjs` `66/66` and `--figures` `ok` were re-measured on that
restored tree. **Nothing was tagged, packed, published, installed or attested** (`release.md §4.1`).

---

## 1 · THE GENERATOR'S GENERALISATION, AND EVERY REFUSAL IT KEEPS

`scripts/emit-declarations.mjs` went from **one** hard-coded region to a **`REGIONS` set**, and nothing else about its shape
moved: still synchronous, still no top-level `await`, still two emitted files under a caller-chosen output directory, still
refusing the source's own directory as that directory, **and still asserting the Node arm's identity byte for byte before
either file is written.**

`REGIONS` is a list of `{ name, begin, end, nodeBody, wasmBody }` — `name` is what the refusals speak and what the output
prints, never a filename and never an offset. `regionOf(text, region)` derives **one** region and `REGIONS.map(...)` derives
the set; the emission walks the source once per arm, taking each region's body from the arm being composed for, and the
pieces between regions are the source's own bytes.

**THE FIFTEEN REFUSALS THAT STOOD BEFORE, ALL KEPT** — eight of them now **per region** (each naming the region):

1. the declaration source is not on the tree · 2. the **begin** marker is ABSENT · 3. the begin marker appears **n** times
(with the line numbers) · 4. the **end** marker is ABSENT · 5. the end marker appears **n** times (with the lines) ·
6. the two markers are **UNBALANCED** (end before begin, both bytes and lines named) · 7. the begin marker is **not an
indented comment line at this file's marker depth** (naming the bytes before it) · 8. the end marker likewise · 9. the region
between the markers is **EMPTY** · 10. the region's body is **not the one line this step replaces** (first-differing byte,
both texts) · 11. the output directory is **the source's own directory** · 12. the NODE arm's emission is **not the source's
identity** · 13. the WASM arm differs **BEFORE** a region · 14. the WASM arm differs **AFTER** the last region · 15. the
emitted length is not the outside bytes plus the replacements.

**AND FOUR THAT THE SET OWED**, added rather than subtracted:

16. **`the 'a' region … and the 'b' region … OVERLAP`** — two regions must be disjoint or one replacement would cut into the
other's body; 17. **`the declared Node bodies do not compose back to the source`** — the Node composition is compared with
the source before the writes, so a region whose Node body drifted is a refusal and not a second surface wearing the source's
name; 18. **`the 'x' region's body is not the declared replacement`**, read back at the **written** file per region;
19. **`the emission moves by the regions' own differences and by nothing else`** — the written length is accounted for
**twice**, once by the walk and once by the sum of the deltas, so an emission that swallowed a byte and gave one back in the
same place could not pass.

**THE REFUSE-ON-SECOND-MARKER RULE IS NOW REFUSE-ON-SECOND-MARKER-PER-REGION, AND IT WAS NOT WEAKENED**: a duplicated marker
still stops the run (it is never taken at its first match), the message names the region and every line the marker occurs
at, and the four marker-count refusals fire per region **in addition to** the new overlap refusal — so a source carrying two
`filePath` begin markers and two `factory` end markers reports the first of the four by region name.

---

## 2 · THE TWO REGIONS' BODIES, VERBATIM

```
// ⟦realm:filePath:begin⟧          region 'filePath'
  readonly filePath?: string;      →  `  readonly filePath?: never;`
// ⟦realm:filePath:end⟧
```

```
  // ⟦realm:factory:begin⟧         region 'factory'
export function storeCreate(cfg: StoreConfig): StoreInstance;
                                   →  `export function storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance;`
  // ⟦realm:factory:end⟧
```

**THE MARKERS ARE TWO-SPACE COMMENT LINES AT THE FACTORY'S OWN DECLARATION**, in the form the `filePath` region uses — which
is why the declaration's own line stays at column zero while the pair is indented, and why **no reader moves**: the member
pattern (two spaces, optional `readonly`, a name, `:` or `(`) cannot match `  //`, the `StoreStatus` census reads a union 300
lines below, and `blind-entry-module.test.mjs:497`'s count of `^export function` lines (exactly **one**) counts lines
beginning at column zero — **measured green in the after-run, not assumed**.

**AND THE `unknown` IS ARGUED AT THE BYTE, IN THE DECLARATION AND IN THE SCRIPT**: `D-203` item 5's module is the HOST's, the
package instantiates nothing on this arm (`D-155` item 3), the runtime validates what arrives
(`bindings/js/src/entry/addon-slot.mjs`'s `installAddon` refuses `null`, `undefined`, a primitive, a function and an object
carrying no callable `storeCreate`), and **a named type in that position would be this package claiming the HOST's shape** —
so `bindings/js/index.d.ts`, `scripts/emit-declarations.mjs`'s `REGIONS` entry and the notes all say it in those words.

---

## 3 · `CW-10` — THE THREE LIMBS, AND THE READINGS BOTH WAYS

`tests/e2e/wasm-arm.test.mjs` gains one cell. It writes a `.ts` fixture into a temp dir and drives **the project's own
`tsc`** (`node_modules/typescript/bin/tsc`, TypeScript `5.9.3`) with `--noEmit` over it, compiling **against
`bindings/js/platforms/wasm/index.d.ts`** — the staged arm, reached by a relative specifier from the temp dir. The tsconfig
is `strict`, `noEmit`, `module: esnext` + `moduleResolution: bundler` (a consumer's extensionless relative import resolves)
and **`types: []`** (no `@types` on the machine may enter the graph). The three limbs:

1. **`storeCreate(bindings, cfg)` TYPECHECKS** — `bindings` a plain `object` (the declaration's position is `unknown`), `cfg`
   satisfying the arm's `StoreConfig` with no `filePath`; the answer is annotated `StoreInstance` and used once.
2. **`storeCreate(cfg)` DOES NOT** — behind `// @ts-expect-error`, **and an unused directive is `TS2578`, which is an error
   of the run**: the limb cannot silently stop being negative.
3. **`filePath: 'x'` DOES NOT** — also behind `// @ts-expect-error`, the `never` narrowing (`D-155` item 2) read beside the
   second region so that "the first region still lands" is a limb and not a claim.

**DOES THE CELL DEPEND ON A PRIOR BUILD? YES, AND IT SAYS SO RATHER THAN TOLERATING ONE.** `ensureBuilt()` builds the arm
only when its **runtime** artefacts are absent, so a **stale declaration can stand beside a current runtime**. The cell
therefore produces the generator's own WASM arm into a temp directory, compares it with the staged file, and — **only when
they disagree** — runs `scripts/build-wasm-package.mjs` (whose step 5 installs that emission as `index.d.ts`) and re-reads.
A `tsc` run that cannot be staged on a current arm **fails in words**; it never skips (`P-PUB-7`'s doctrine).

**THE BEFORE READING — the patch's two source files stashed, the cell present, `HEAD`'s generator and `HEAD`'s staged arm:**

```
✖ CW-10 · D-203 — a TypeScript consumer compiled against the STAGED ARM … (426.93ms)
  AssertionError [ERR_ASSERTION]: CW-10, `D-203` item 5: a TypeScript consumer of the WebAssembly arm must be able to
  write the construction its runtime and its guide require. `storeCreate(bindings, cfg)` must TYPECHECK,
  `storeCreate(cfg)` must NOT (its @ts-expect-error must be USED), and `filePath` must NOT (`never`). The compilation
  that decides this is over the STAGED ARM at …/bindings/js/platforms/wasm/index.d.ts; tsc said:
    fixture.ts(11,52): error TS2554: Expected 1 arguments, but got 2.
    fixture.ts(15,1): error TS2578: Unused '@ts-expect-error' directive.
  2 !== 0
ℹ tests 9 · pass 8 · fail 1 · skipped 0
```

**TWO ERRORS, AND BOTH ARE THE DEFECT** — limb 1 (`TS2554`: the two-position construction rejected by the one-position
signature) and limb 2 (`TS2578`: `storeCreate(cfg)` **compiled**, so its directive was unused). **`filePath` was already
refused on the `2.0.0` tree — which is exactly why a positive-only fixture would have passed for the wrong reason.**

**THE AFTER READING — the patch applied, the arm re-staged by the cell itself:**

```
[CW-10] tsc --noEmit over the staged arm: exit 0 — `storeCreate(bindings, cfg)` compiles, `storeCreate(cfg)` and
        `filePath` are both refused at their own `@ts-expect-error` lines
✔ CW-10 · D-203 — … (569.50ms)
ℹ tests 9 · pass 9 · fail 0 · skipped 0
```

And the cell's byte limbs behind the compiler: the arm's factory region body is
`export function storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance;`, the **source's** is
`export function storeCreate(cfg: StoreConfig): StoreInstance;`, and the arm still carries `readonly filePath?: never;`.

---

## 4 · EVERY VERSION SITE MOVED, OLD → NEW, WITH `--figures`' VERDICT

| # | site | old → new |
|---|---|---|
| 1 | `bindings/js/package.json:3` `version` | `2.0.0` → **`2.0.1`** |
| 2–6 | `bindings/js/package.json:45`–`:49` — the FIVE exact `optionalDependencies` pins | `2.0.0` → **`2.0.1`** each |
| 7 | `bindings/js/platforms/darwin-arm64/package.json:3` | `2.0.0` → **`2.0.1`** |
| 8 | `bindings/js/platforms/darwin-x64/package.json:3` | `2.0.0` → **`2.0.1`** |
| 9 | `bindings/js/platforms/linux-arm64/package.json:3` | `2.0.0` → **`2.0.1`** |
| 10 | `bindings/js/platforms/linux-x64/package.json:3` | `2.0.0` → **`2.0.1`** |
| 11 | `bindings/js/platforms/win32-x64/package.json:3` | `2.0.0` → **`2.0.1`** |
| 12 | `bindings/js/platforms/wasm/package.json:3` | `2.0.0` → **`2.0.1`** |
| 13 | `bindings/js/README.md:53` `PUBLISH-README-VERSION-LINE` | `2.0.0` → **`2.0.1`** |
| 14 | `docs/guides/package-use.md:33` `PUBLISH-GUIDE-VERSION-LINE` | `2.0.0` → **`2.0.1`** |
| 15 | `RELEASE-NOTES.md:19` `PUBLISH-NOTES-VERSION-LINE` | `2.0.0` → **`2.0.1`** |

**THE TWO LANDED COPIES WERE RE-STAGED BYTE-FOR-BYTE, NEVER HAND-EDITED**: the canonical guide was rewritten at its own
line and then `cp`'d to `bindings/js/README.guide.md`; the canonical change list was rewritten at its own line and then
`cp`'d to `bindings/js/RELEASE-NOTES.md`; both pairs are `cmp`-clean and the patch carries them as whole-file-identical
edits of one line each (`±1` line, `±84` lines for the notes section). **`bindings/js/package.json` still carries `"version"`
exactly ONCE** (`grep -c` reads `1`), which is the carrier's own precondition (`build.rs` reads the RIGHTMOST occurrence).

**`bash scripts/publish.sh --figures` — `ok`, three times over:**

```
  bindings/js/README.md          generated = shipped = … `2.0.1`.
  bindings/js/README.guide.md    generated = shipped = … `2.0.1`.
  bindings/js/RELEASE-NOTES.md   generated = shipped = … `2.0.1`.
 ok  three shipped documents, three version lines, one generator …
 ok  all three shipped documents' version lines AGREE with the manifest
```

---

## 5 · THE NOTES' NEW SECTION, IN ITS OWN WORDS

`## §2.0.1 · a PATCH — the WebAssembly arm's declaration spells the factory with the TWO positions its runtime and its guide
require: one shipped artefact corrected in the declaration alone, the instrument that would have caught it, and no byte of
the runtime moved`, placed **above `§2.0.0`**. Its opening names the class as `D-203` item 5's own sentence (architect
verbatim: *"its class is a **patch on the arm at most** (the one-position form it replaces **could not construct at all**),
and **the number is the architect's**"*) and names the **artefact**: `@auspicion/provident-storeroom-js-wasm`, the sixth
package, the only one of the set whose bytes move. Then the finding at the byte (the shipped line, the runtime's
two-position docblock, the guide's §13.1), and four numbered entries: the **second region** and the guard it keeps; the
**arm's body with `unknown` argued as the honest type of a host-supplied module**; **the Node arm moving no byte**, with the
markers' invisibility to every reader; and **`CW-10`**, the instrument with its three limbs and its fails-on-`2.0.0`
reading. Then **WHAT A CONSUMER ON `2.0.0` MEETS** — a TypeScript consumer of the arm can now write the construction the
guide teaches; **the runtime never moved**, no `.mjs` and no `.rs` byte, `CW-1`…`CW-9` reading what they read; a JavaScript
consumer sees no change at all (the defect was declaration-only, `D-203` item 6); a consumer of the Node package sees no
change either. Then **the migration sentence** — delete the cast / `@ts-expect-error` / wrapper and write
`storeCreate(bindings, cfg)` with the module the host obtained from the glue's own `initSync`; the call never moved, the
workaround is the only thing that does. Then **WHAT DOES NOT MOVE, NAMED ONE BY ONE**, the **twelve sites moving together**
with `build.rs` stamping `version()` = `2.0.1`, the three generated lines re-derived and re-staged, and closing on
**`AND THIS RELEASE DESCRIBES `2.0.1` AND CLAIMS NO TAG`** (`D-57`).

---

## 6 · THE TAG COMMANDS — PRINTED, NOT RUN

`release.md §4.1`: **no pass publishes, packs, tags, installs or attests.** After the patch is applied and **committed**, the
architect's own instrument prints and then runs these three:

```
scripts/publish.sh --tag 2.0.1 --yes     # refuses on a dirty tree and on a manifest that is not 2.0.1; prints the three lines below
  git commit -am 'release v2.0.1'
  git tag -a v2.0.1 -m 'v2.0.1'
  git push origin main && git push origin v2.0.1
```

**AND THE SCRIPT WILL WARN ABOUT `v2.0.0`** (`§2.5` item 4(i): *"existing tag(s) that will redden the coupling cell"*). **THE
WARNING WAS MEASURED AND NOT TAKEN ON FAITH**: with `v2.0.0` in the tag set and the manifests at `2.0.1`, `npm test` reads
`1401 / 1401 / 0 / 0` and `publish.test.mjs` `66/66` — so on this tree the leftover tag is not a red cell, and the decision
the script asks for is still the architect's. `git describe` reads `v2.0.0-3-g0b80b17`.

---

## 7 · WHAT I COULD NOT DO, AND WHY

1. **`npm run build` AND `cargo check --target wasm32` DO NOT RUN WITH AN UNSET `CARGO_HOME` IN THIS ENVIRONMENT** — the
   offline resolution of `napi` fails (`error: no matching package named napi found`) because the registry mirror lives at
   `.cargo-home/` in-tree and is not `~/.cargo`. Both were run with `CARGO_HOME=$PWD/.cargo-home`, which is exactly what
   `scripts/publish.sh:93` exports and what `scripts/build-wasm-package.mjs:41` defaults to. **The green readings above are
   those runs**; the bare invocations are red for a reason that has nothing to do with this patch (verified: the same
   failure occurs on the unpatched tree).
2. **I EDITED TWO TEST FILES AND ONE OF THEM IS NOT `CW-10`.** `tests/e2e/wasm-arm.test.mjs` gains the owed cell as
   instructed. **`tests/e2e/realm-declaration.test.mjs` also had to move, and this is the one deliverable the brief does not
   name**: its third cell read ONE region by slicing the WASM arm from the `filePath` markers to the end of the file, so a
   second region **after** it made that slice swallow the new region's bytes and the cell reddened for arithmetic rather
   than for a claim. The cell now **walks the set of regions**, asserting per region that the prefix is byte-identical, that
   the body is the arm's declared replacement, that the tail is identical and that the length moves by the sum of the deltas;
   the member census, the `never` match and the marker-count limbs are kept and generalised per region; and one new limb
   (`4b`) asserts the factory's two positions on the arm and its one position on the Node arm. The first cell's title and two
   messages were re-cut to say **this** region rather than "ONE realm region", its assertions untouched. **Both files were
   necessary to keep `0` failing cells; neither weakens a limb** — but the architect should read them (patch hunks
   `tests/e2e/realm-declaration.test.mjs`).
3. **ONE PROSE FIGURE IN THE DECLARATION IS NOW A READING OF ITS OWN DATE AND WAS LEFT ALONE**:
   `bindings/js/index.d.ts:694`–`:696` still reads *"THE CLASS IS `MAJOR` (`2.0.0`, `D-190`) … this declaration describes
   `2.0.0`"*. It is `D-190`'s class reading of the `2.0.0` landing and the brief scoped the declaration's change to the
   region; no cell asserts it and no shipped figure moves with it (the version figure is the manifest's and is generated
   into three documents). **Flagged so that a later pass can decide, rather than silently re-cut.**
4. **NOTHING IN `.mjs` OR `.rs` CHANGED.** The brief's stop condition was never reached: `git diff --stat` touches
   declarations, the generator, tests, the notes, the guide's version line and the twelve manifest cells — **the runtime is
   byte-unmoved**, which is the release's own headline.

---

## 8 · THE ONE EDIT MOST LIKELY TO REDDEN A CELL I DID NOT EXPECT

**THE VERSION BUMP, AND THE CELLS THAT READ THE *BUILT ARTEFACT* RATHER THAN THE MANIFEST.** `publish.test.mjs`'s
`declaredReleaseVersion` takes the release version from `bindings/js/build/Release/storeroom_js_binding.node`'s `version()`
(`:1136` onward) and compares six manifests against it. **The moment the twelve cells move to `2.0.1` and the artefact is not
re-stamped, those cells compare `2.0.1` manifests against a `2.0.0` artefact and go red** — so **the gate order is
load-bearing**: `npm run build` must run before `node --test tests/e2e/staged-install/publish.test.mjs` (and before
`npm test`, which contains it). That is why the tree I return has been rebuilt against `HEAD`'s own manifests after the
revert: a reverted manifest beside an artefact stamped from the patched one would redden those same cells on a tree nobody
touched. **The near-miss I verified rather than trusted**: `blind-entry-module.test.mjs:497` counts lines beginning
`^export function` and requires exactly **one** — the marker pair had to sit at two spaces of indentation for that count to
stay `1`, which is precisely the reason the brief named that depth.
