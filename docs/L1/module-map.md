# L1 module map — `Provident-Storeroom`

**WHAT THIS FILE IS.** The ownership map of the tree that exists on branch `docs/pre-strata-consolidation`.
It divides the code that is already here into discrete modules, says which module owns which existing path,
states each module's one-line responsibility, records the interactions between modules, and declares the e2e
I/O surface. **It designs nothing.** No module internals, no logic, no restructuring, no code. Where the tree
already draws a boundary the map adopts it; where one file plainly carries several responsibilities the map
declares the ownership split it recommends and says so as an ownership boundary, never as a work item.

**INPUTS.** `strata/brief.md` (read whole), the nine kept contracts under `docs/specs/` (read selectively by
section heading and by `grep` — the sections actually read are listed in the return envelope), and the tree
itself, surveyed file by file. The first pass had no decision file: `strata/decisions.md` did not exist on this
branch then, and the only rulings available were what the brief and the contracts quote. **It exists now, and
its entry `D-1` is the authority this revision applies.**

**REVISION AT `D-1` — WHAT THIS MAP REPLACED.** `D-1` rules the constraint kernel **tightly integrated, not an
external import**, and on that ruling the boundary this map drew between module **13 `js-constraints`** and
module **14 `constraint-kernel`** is *not a boundary the architect recognises*. The two are **one module**
below; interaction **I-11** ceases to be a boundary interaction; the kernel's export set stops being a boundary
claim; and the fourth `files` allowlist entry has no subject. **`D-1` orders no code move**, so every fact this
map records about the tree is a fact of the tree as it stands, and each changed reading is marked where it
stands rather than presented as though it had always read that way.

**STATE AT `D-8`, `D-9` AND `D-10` — THREE READINGS BELOW ARE ANNOTATED, AND NOTHING IS REDRAWN.** `D-3`, `D-4`
and `D-8` lift the `files` allowlist's count family (§4 E4, I-23 — annotated as pointers there); `D-9` and `D-10`
are **declared in the sibling file** `docs/L1/test-stratification.md` (§2.7 the `O3` relabel and its structural
move, §2.8 the installed-layer battery, §2.9 the `LICENSE` limb's disposal) **because both are test-layer cuts
this map's path inventory cannot carry** — a battery that does not exist yet owns no path, and a label is not an
ownership boundary. **The map's figures are therefore unmoved: 19 modules, 61 endpoints, 105 + 1 + 20 = 126
paths**, and §2.4 carries the pointer that says where the cut now lives.

**REVISION AT `D-2` AND `D-1` — THE ENTRY'S SUBDIVISION IS NOW DECLARED, AND THIS MAP STILL OWNS THE TREE AS IT
STANDS.** `D-2` (*"Index.mjs is already too long and should be subdivided anyway for readability"*) closes §6 Q2's
second half and leaves the first half — *are the five declared regions the right cuts?* — to L1. **The answer is
declared in `docs/L1/entry-subdivision.md`**: **nine parts, eight of them cut out of this file, each owned by
exactly one module, with the constraint kernel as the ninth.** **This map's `owns` lists are NOT rewritten to the
target**, on the map's own honesty ground: the eight part paths do not exist on this branch, and a map that listed
them as owned would assert something false about the tree. **What this revision therefore does is:**
(1) annotates each of the five co-owned regions at §2.3 with the part it is declared to become;
(2) rewrites **§5.1** so the co-ownership has both its present state and its declared end;
(3) adds **§3.1**, four *declared-target* interaction rows (`I-29`…`I-32`) that no tree measurement backs, marked as
targets and numbered so that nothing is left implicit;
(4) corrects one measured figure at **§4 E6** (seven `constraintsKernel()` call sites, not six) and one at **§2.3**
(the `js-resolution` region overlaps `js-registry-delivery`'s);
(5) **moves one endpoint** — the failure form, `js-surface` → `js-resolution` — in the target only, leaving the
tree's endpoint count at **61** and the module count at **19**;
(6) records the target arithmetic at **FIGURES**: 8 new paths, 126 → 134, and the co-owned path → 0.
**Nothing in this revision is a work order.** `D-1`, `D-2` and `D-3` each order no code move; the wave that lands
the cut is not open, and this map draws no code.

**REVISION AT `D-13` AND `D-14` — THE KERNEL'S CUT AND THE FOUR DRIVES' RE-STAGING, DECLARED IN TWO SIBLING FILES, AND
THIS MAP'S ARITHMETIC IS THE ONLY THING THEY MOVE.** `D-13` (*"Kernel can be cut"*; *"That works"*) orders the
constraint kernel's internal cut **and** confirms `bindings/js/src/entry/` as the parts' home; `D-14` fixes the four
drives' re-staging mechanism as **a glob of the parts directory paired with an explicit kernel path**, and establishes
that **the cut and the four drives are one wave.** Both are declared, and the declarations live outside this file
because neither is a path inventory this map can carry:

- **`docs/L1/kernel-subdivision.md`** — the kernel's cut: **five parts** (`kernel-foundations`, `-registration`,
  `-commit`, `-attempt`, `-terminal.mjs`), declared against a **measurement of the file's internal call graph** that
  `D-13` required and the entry pass had not taken; the **DAG** and the two candidate cuts that would have closed a
  cycle; the **barrel** at the kernel's unchanged path and the six exports' fate — **the names stay module-level, the
  six `export` SITES move to four files, and that is a named correction of `docs/L1/entry-subdivision.md` §4.1, which
  said the sites stay "unchanged"**; and the **home decision** `D-13` left open (the kernel's parts under `src/entry/`,
  with a `kernel-` prefix, on `D-14`'s own mechanism).
- **`docs/L1/drive-restaging.md`** — the four drives (`publish`, `publish-generators`, `version-stamp`,
  `negative-generators`) re-staged by glob + explicit path, the **zero-match-is-loud** rule and the closure check, the
  **orthogonality** of `publish`'s injected faults from a shape fault, and **what each drive's claim becomes** now that
  `D-14` withdraws the entry-only-tree claim — including **`version-stamp.test.mjs:1457`–`:1458`'s quoted *"`index.mjs`
  and no `.node` at all"***, which survives on its `.node`-free half and is restated on its other, and
  **`negative-generators`' bare specifier at `:1550`**, which must stay a name because there the name is the assertion.

**WHAT DOES *NOT* MOVE, STATED FIRST BECAUSE IT IS THE ANSWER THIS MAP EXISTS TO GIVE: 19 modules and 61 endpoints
stand.** The kernel's five parts are **files inside one module's ownership** (`js-constraints`), not five modules: `D-1`
ruled the boundary between the constraint members' glue and the kernel *"not a boundary the architect recognises"*, and
a part is a file where a module is an ownership unit — so adding five modules would re-create four boundaries the
ruling dissolved. **No endpoint moves either:** the six exports were dissolved as endpoints at `D-1` (the export set is
no longer a surface anything outside the code crosses), and not one of the five parts is an I/O surface any other
module reaches. **And no interaction row is added:** every edge the kernel's cut crosses is **inside `js-constraints`**,
so it is the part DAG's business (`kernel-subdivision.md` §3.1) and not this map's §3 — which is the structural
difference between this cut and the entry's, whose parts span five modules and therefore owe four rows (§3.1).
**What moves is the TARGET path count** (FIGURES) and the `files` reachability consequence (§4 E4, I-23). **No code
moved, no manifest was edited, and the wave is not open.**

**⟶ THE POST-WAVE REVISION, 2026-10-25 — `THE WAVE IS NOT OPEN` ABOVE IS NOW FALSE, BOTH CUTS ARE EXECUTED, AND
THE BATTERIES HAVE MOVED. THIS BLOCK NAMES EVERY FIGURE THE MAP STILL PRINTS THAT THE TREE NO LONGER CARRIES, AND
THE SITES BELOW IT CARRY THEIR OWN CLAUSES.** This is the map's third honesty revision and it is the largest,
because three of the four things it declared as *targets* are now the tree:

- **THE ENTRY IS CUT.** `bindings/js/index.mjs` is **1,409 lines** (the map prints **5,903**, and the re-issued
  declaration measured **6,350** at its own HEAD; both are past readings now) and is **a hub**, not the entry
  whole. **`bindings/js/src/entry/` holds THIRTEEN files**, measured one by one at their own last lines:
  `refusal.mjs` 82 · `artefact.mjs` 355 · `state.mjs` 600 · `class-decision.mjs` 1,204 · `carrier.mjs` 960 ·
  `frame.mjs` 416 · `delivery.mjs` 639 · `constraints.mjs` 795 (the entry's eight parts) and
  `kernel-foundations.mjs` 529 · `kernel-registration.mjs` 644 · `kernel-commit.mjs` 156 · `kernel-attempt.mjs`
  570 · `kernel-terminal.mjs` 324 (the kernel's five). **So §2.3's region rows are PAST STATE and its declared
  target table IS the tree**, and §5.1's one co-owned path no longer exists: `index.mjs` is a single owner's.
- **THE KERNEL IS CUT AND THE BARREL IS AT ITS OLD PATH.** `bindings/js/src/constraint-kernel.mjs` is **4 lines**
  — six names in four re-export specifiers — where the map prints **2,203** and the re-issue measured **2,213**.
  **The five parts and the barrel are thirteen of the thirteen files above; there is no separate kernel file
  left to own.**
- **THE BATTERIES MOVED, AND `D-5`'s PRESENT-STATE PATHS ARE NOW THE PAST.** `bindings/js/test/` (**42** files),
  `bindings/js/greens/` (**11**), `bindings/js/tests/` (**7**) and `tests/`'s **15** Rust files **no longer exist**;
  their content is **83 files** under the preset's three scopes — `tests/e2e/` **44**, `tests/integration/` **33**,
  `tests/unit/` **5** — plus **`tests/Cargo.toml`**, the manifest of the third workspace member
  (`storeroom-tests`) that hosts the Rust targets. **`75 → 83` is not a growth: one path of the 75 was
  `tests/support/mod.rs` and the 83 carries the same 75 artifacts plus the eight new ones the stratification
  declared** (`installed/install-support.mjs`, `installed/live-install.mjs`,
  `installed/license-row-evidence.json`, `staged-install/staged-install-support.mjs`, `module-set.mjs`,
  `pack-reachability.mjs`, `REVIEW-2026-10-24.md`, `tests/Cargo.toml`).
- **`bindings/js/Cargo.lock` IS DELETED AND `bindings/js/.gitignore` NO LONGER CARRIES A `/Cargo.lock` LINE.**
  The map's prose below cites that line twice (§"MEASUREMENT LIMIT", §5.2) and both citations are superseded here
  rather than rewritten there: a workspace member has no lock of its own (`D-34`), and the one lock at
  `./Cargo.lock` is the workspace's, committed. **Neither citation was ever in the 126-path denominator** — the
  file was untracked — so the deletion moves no figure of the map's own arithmetic.

**THE ARITHMETIC, STATED WITH ITS TERMS AND MARKED AS OWED A `git ls-files` CHECK THIS PASS COULD NOT TAKE (no
shell).** The denominator the map reconciles to is **126**. This pass's measured deltas are **+13** paths under
`bindings/js/src/entry/`, **−75 + 83 = +8** in the battery tree, and **−0** for `bindings/js/Cargo.lock` (never
counted). **So the arithmetic denominator is `126 + 13 + 8 = 147`** — a figure this pass did **not** verify against
the index, and it is printed as arithmetic on measured deltas rather than as a measurement.
**⟶ MEASURED 2026-10-25 BY THE SUPERVISOR, WHICH SUPERSEDES THAT ARITHMETIC: `git ls-files | grep -v '^scratch/'`
returns `156`.** **The `147` is short by `9`, and the reason is that this pass counted only the paths the two CUTS
created and the battery tree's net; the migration's own additions — the installed battery's three files, the O3
staged-install helper, `tests/Cargo.toml`, and the two Rust `support` helpers that moved into `tests/` — are outside
that count.** **The measured figure is `156`; treat every `147` below as that arithmetic and not as the tree.** **The module count
(19) and the endpoint count (61) are unmoved by all of it**: a part is a file, not an ownership unit, and every
new edge in both cuts is intra-module (§3.2's own ground, restated for the entry by §3.1). **What has genuinely
moved is the ownership split, and it moves by the same three deltas: `105 owned + 1 co-owned + 20 unowned = 126`
becomes `127 owned + 0 co-owned + 20 unowned = 147`** — `105 + 13` (the parts, all single-owned) `+ 8` (the
battery tree's net) `+ 1` (the co-owned hub, which gains an owner) `= 127`, and the co-owned column empties. **⟶ AND THE UNOWNED COLUMN IS THE ONE THIS ARITHMETIC GETS WRONG, CORRECTED HERE 2026-10-25: the `147` was arithmetic and its terms counted only what the two cuts and the battery move, so the split at the MEASURED denominator is `127 owned + 0 co-owned + 29 unowned = 156` — the owned and co-owned columns above stand, and the unowned column is 29, not 20 (FIGURES, and `modules.json`'s `ownership_arithmetic_against_156` for the itemisation).**
**Everyone who needs one of those three numbers should re-derive it rather than read it here.**

**MEASUREMENT LIMIT — READ BEFORE TRUSTING THE COUNTS.** The first pass over this map had no shell. Its
inventory was built from the file tools' glob enumeration of the workspace (a complete 11,930-path listing of
everything under the repository root, filtered against the project's own `.gitignore` rules), **not** from
`git ls-files`, so its counts were *paths present on disk and not excluded by the project's own ignore files*
and **not** a verified tracked set. A supervisor-run shell pass has since measured the tracked set, and this
correction pass settles the figures that pass could not: the corrected denominator reconciles exactly to
`git ls-files`'s **126** non-`scratch/` paths (see **FIGURES**), the `#[napi]` figure is 13 **line-initial
attribute sites** (§4 E2), and both root lock files are confirmed tracked (§5.3). Three consequences are
carried openly:

- the paths below are present on disk but **excluded by the project's own ignore rules**, so they are neither
  owned nor listed as unowned: `bindings/js/target/` and `bindings/js/build/` (`bindings/js/.gitignore` lines
  **9–10** — ⟶ CORRECTED 2026-10-25: the map printed *"lines 4–5"*, and the crate's ignore file grew a
  dated clause at its head, so the two rules moved down five lines; the rules themselves are unchanged), and the
  trees `.cargo-home/`, `target/`, `archive/`, `.impl-rc8-backup/`, `.tracker-reflow-backup/`,
  `.npm-cache/`, `typecheck/node_modules/` (root `.gitignore`). **⟶ AND ONE PATH LEAVES THIS LIST ENTIRELY,
  CORRECTED 2026-10-25: `bindings/js/Cargo.lock` (`bindings/js/.gitignore` line 6) IS DELETED AND ITS IGNORE LINE
  WITH IT** — after `D-34` the crate is a member of the one workspace at the repository root, a member has no
  lock of its own, and the workspace's `./Cargo.lock` is the only one that exists (`bindings/js/.gitignore`'s own
  dated head clause records the deletion). **It was never in the 126-path denominator — untracked then, gone
  now — so no figure of this map moves with it.**
- **`scratch/` is NOT in that class, and the first pass put it there wrongly.** **477 files under `scratch/`
  are tracked in git.** They are excluded from ownership by the project's own *convention* and never by an
  ignore rule: the root `.gitignore`'s own prose states the rule it applies — *"a scratch is never a source"*
  (`.gitignore:217`) — and on that rule each of the 477 is a probe, a byproduct, a log or a one-off driver,
  which is the whole answer; this map does not classify them path by path. Only scattered subpaths of
  `scratch/` are ignored, and the root `.gitignore` names them (`scratch/live/install-0.2.0/drive/`,
  `scratch/g7-*/`, `scratch/depth-probe/`, `scratch/def-f-live/`, `scratch/def-f-probe/`, `scratch/jcx-*/`,
  `scratch/npmcache/`, `scratch/probe-shape-a/`). **The project's convention and git's tracking disagree
  here**, and a reader who runs `git ls-files` will see all 477 of them. Nothing under `scratch/` is owned,
  listed or counted; §5.4 is the whole statement of it;
- the root `Cargo.lock` and the root `package-lock.json` exist on disk, **no ignore rule names them**, and
  **both are tracked** — verified: `git ls-files` lists each one. The root `.gitignore`'s prose states
  *"`Cargo.lock` STAYS UNCOMMITTED by decision"*, which the repository's own index contradicts. The
  contradiction is recorded, not resolved; both are listed in §5.3.

**THE REVISION AT `D-1` HAD NO SHELL EITHER**, so it measures nothing: it re-reads the map's own figures
against the module merge and moves two of them (**20 → 19 modules**, **68 → 61 endpoints**), re-reads the four
tree facts it restates (`package.json`'s four `files` entries, `constraint-kernel.mjs`'s six `export` sites, the
`constraintsKernel()` call sites, and the `kernel.commit` / `kernel.runAttempt` calls), and changes no path
ownership at all — **105 + 1 + 20 = 126 stands untouched**. Everything it could not check is named where it
stands (§5.3, §7).

**FIGURES.** **⟶ MEASURED 2026-10-25, AND THIS BLOCK NOW PRINTS THE TREE: `156` paths in the denominator —
`git ls-files | grep -v '^scratch/'` returns `156` — reconciled by ownership as
`127 owned + 0 co-owned + 29 unowned = 156`.** **127 are owned by exactly one module** (§2); **no path is
co-owned** (§5.1: the co-ownership ended with the entry's cut, `bindings/js/index.mjs` being `js-surface`'s
hub alone — 1,409 lines, measured at the file's own last line); and **29 are unowned with a reason**,
itemised in §5.3: the `docs/specs/` nine,
**`docs/L1/`'s eight** (`module-map.md`, `modules.json`, `test-stratification.md`,
`test-stratification.json`, `entry-subdivision.md`, `kernel-subdivision.md`, `drive-restaging.md`,
`surface-deltas.md`), the root's eight unowned, `bindings/js/.gitignore`, one `typecheck/` fixture, and
**`strata/brief.md` with `strata/decisions.md`'s two**. **THE ENTIRE DELTA LANDED IN THE UNOWNED COLUMN:
`126 → 156` is `docs/L1`'s 8 + `strata/decisions.md`'s 1, and not one of the nine is owned** — which is why
the owned column reads 127 where the earlier passes read 105 (the `+1` is `index.mjs` leaving the co-owned
column, not a new path) while the unowned column went 20 → 29. **The arithmetic by tree closes at the same
figure in twelve terms, no path counted twice:** `src/` 7 · `tests/` 83 · `bindings/js/` root 7 ·
`bindings/js/src/` 18 · `bindings/js/platforms/` 10 · `docs/specs/` 9 · `docs/L1/` 8 · `typecheck/` 1 ·
`.github/workflows/` 1 · `scripts/` 1 · `strata/` 2 · root 9 = **156**. The 477 tracked files under
`scratch/` are outside this denominator by convention, not by rule (§5.4), and `git ls-files` measures the whole
index at **633**, so **633 = 477 + 156** is a measurement and not arithmetic.

**THE READING THIS BLOCK CARRIED BEFORE THAT MEASUREMENT IS NAMED HERE AND NOT REWRITTEN AWAY: `126` paths,
`105 owned + 1 co-owned + 20 unowned`, and the `147` the head revision block printed as arithmetic on
measured deltas.** The `126` was reconciled to `git ls-files` for the tree it was struck against, and the
`126`'s own by-tree list itemised **no `docs/L1` path at all** — the directory is the migration's, not the
first pass's; the `147` was arithmetic its own pass said it could not check. **The `156` above supersedes
both**, and the by-tree list that stood here — `src/` 7 · `tests/` 15 · `bindings/js/` root 7 ·
`bindings/js/src/` 5 · `bindings/js/test/` 42 · `bindings/js/tests/` 7 · `bindings/js/greens/` 11 ·
`bindings/js/platforms/` 10 · `docs/specs/` 9 · `typecheck/` 1 · `.github/workflows/` 1 · `scripts/` 1 ·
root 9 · `strata/` 1 = `126` — **is kept as that past reading so a reader can see which trees moved rather
than only where they landed.** **19 modules** are declared, **61 endpoints** — **revised at `D-1` from the 20 modules and 68
endpoints this line carried at `e2fcbef`, and the movement is shown rather than absorbed:** folding 13 and 14
into one module removes one module and **dissolves seven endpoints** — the six kernel exports, whose subject is
the export set `D-1` rules away, and `constraintsKernel`, the lazy reach that *was* the boundary (§3, §4 E6).
The five member-facing constraint endpoints stay. **61 + 7 = 68**, and 19 + 1 = 20.
**⟶ AND THE ARITHMETIC BY TREE THAT FOLLOWS IS THE `126`'S OWN LIST, SUPERSEDED BY THE TWELVE-TERM LIST ABOVE AND
READ THROUGH IT** — `tests/`'s 15 owned are 83 paths at the preset's three scopes, `bindings/js/test/`'s 42,
`bindings/js/tests/`'s 7 and `bindings/js/greens/`'s 11 are 0 each, `bindings/js/src/`'s 5 are 18, and `strata/`'s 1
is 2 (the second file is `decisions.md`, which that list said this pass could not verify). The arithmetic by tree:
`src/` 7 owned ·
`tests/` 15 owned · `bindings/js/` root 7 (5 owned, `index.mjs` co-owned, `.gitignore` unowned) ·
`bindings/js/src/` 5 owned · `bindings/js/test/` 42 owned · `bindings/js/tests/` 7 owned ·
`bindings/js/greens/` 11 owned · `bindings/js/platforms/` 10 owned · `docs/specs/` 9 unowned ·
`typecheck/` 1 unowned · `.github/workflows/` 1 owned · `scripts/` 1 owned (`scripts/publish.sh`, the release
runbook, given to `delivery` by this correction pass — §2.3, §5) · root 9 (1 owned, 8 unowned) · `strata/`
1 unowned (`strata/brief.md`; **`strata/decisions.md` now stands beside it and this pass could not verify
whether it is tracked**, so whether the tracked denominator is now 127 is owed a shell check — the 126 is left
as measured). The 477 tracked files under `scratch/` are **outside** this denominator by convention, not by rule
(§5.4); the whole tracked tree is **603 = 477 + 126**. **⟶ SUPERSEDED 2026-10-25 BY THE MEASUREMENT ABOVE:
`git ls-files` returns `633` for the whole index and `156` outside `scratch/`, so the tracked tree is
`633 = 477 + 156`** — and the `603` is named rather than overwritten.

**⟶ THE `D-2` REVISION ADDS NO FIGURE TO THAT DENOMINATOR AND DECLARES ONE BESIDE IT, MARKED AS TARGET AND AS
ARITHMETIC.** The map's counts stand as **19 modules · 61 endpoints · 105 owned + 1 co-owned + 20 unowned = 126**,
because the tree has not moved. **The declared target** (`docs/L1/entry-subdivision.md`) is **the same 19 modules and
the same 61 endpoints, with 8 new paths** — `bindings/js/src/entry/{refusal,artefact,state,class-decision,walk,
delivery,constraints}.mjs` — so the target arithmetic is **114 owned + 0 co-owned + 20 unowned = 134**, and the
co-owned path of §5.1 becomes `js-surface`'s alone. **The 134 is arithmetic on the measured 126 (which a supervisor
shell pass reconciled to `git ls-files`) and is owed its own `git ls-files` check**; if `strata/decisions.md` proves
tracked, which §5.3 marks unverified, the figure is 135. **No path, module or endpoint in the 126 moves today.**

**⟶ AND THE `D-13`/`D-14` REVISION CORRECTS THE TARGET ARITHMETIC IT ADDS TO, BY ONE, AND PRINTS ITS OWN TERMS.** The
entry's cut creates **seven** part files — `src/entry/{refusal,artefact,state,class-decision,walk,delivery,constraints}
.mjs`; `docs/L1/entry-subdivision.md` §6.1 and the paragraph above both say **"eight new part files"** while listing
seven names, because the eight-part count includes **part 1 (`index.mjs`)**, which already exists. **So the entry cut's
own target is `126 + 7 = 133`, with `113 owned + 0 co-owned + 20 unowned = 133`** (`105` single-owned today **+**
`index.mjs`, which stops being co-owned, **+** the seven parts). **The kernel's cut then adds five more** —
`src/entry/kernel-{foundations,registration,commit,attempt,terminal}.mjs` — and **keeps every path it already owns**
(the barrel stays at `bindings/js/src/constraint-kernel.mjs`), so **the two cuts together put the target at
`126 + 12 = 138`, with `118 owned + 0 co-owned + 20 unowned = 138`**; `138 − 5 = 133` is the entry cut alone. **These
are arithmetic on the measured 126 and on each declaration's own file list — not `git ls-files` figures** — and they
are owed their own check after the wave, like the 134 before them. **The module count (19) and the endpoint count (61)
are unmoved by both cuts; only these path figures move.**

---

## §1 · The modules

| # | id | name | one-line responsibility |
|---|---|---|---|
| 1 | `store-core` | The register | Hold the register, walk addresses, and perform the verbs — tiers and purge, the journal and rollback, the listener home, the file image and its boot, and construction. |
| 2 | `store-value` | The store's value domain and its JSON image | Declare the admitted value taxonomy and convert it to and from the canonical JSON text the `file` tier stores. |
| 3 | `store-args` | The argument carriers | Carry every declared parameter as a permissive Rust type whose outside-value arms make each refusal reachable, and fold it to the in-domain argument or the refusal. |
| 4 | `store-records` | The record shapes | Declare the shapes the verbs, the resolver and the listener surface return, including the tier token and the listener identity. |
| 5 | `store-fail-set` | The closed fail set | Hold the sixteen statuses as one closed set and generate every message from the code and the failing trigger's arguments. |
| 6 | `binding-crossing` | The pure-Rust conversion core | Model a JS value, admit or refuse it per class, convert in both directions, and hold the per-instance `Instance` over the store — with no Node-API type at any depth. |
| 7 | `binding-codec` | The wire's codec | Convert the Node-API carrier to the core's model and the core's answer back to a Node-API value, over the decided tree. |
| 8 | `binding-facade` | The Node-API export facade | Publish the addon's exported entry functions, each thin over the core, and declare the crate's link and version-stamp treatment. |
| 9 | `js-resolution` | The addon's resolution ladder | Name the platform packages, read the version stamp, run the three ordered rungs, and answer the one declared absent-addon refusal. |
| 10 | `js-surface` | The entry and its members | Publish the module's one export, define the instance's fourteen members, admit each call's arguments at its site, and render the single failure form. |
| 11 | `js-crossing` | The JS-side walk | Decide each value's class, guard the walk's ceilings and caller-code arms, and encode arguments in and decode answers out. |
| 12 | `js-registry-delivery` | The registry and the delivery path | Hold the package's per-instance state, the handle and its registry, deliver the triggered set to the caller's functions, and perform the terminal arm's `file`-tier save. |
| 13 | `js-constraints` | The constraint members and the integrated kernel | Carry the five constraint members and the write path's constraint evaluation, and evaluate a write against registered pairs — composing and repairing the attempt and answering its log and report — as **one integrated mechanism rather than an external import**. |
| 14 | `js-declaration` | The published declaration | Declare the whole published surface — the config, the statuses, the records and the fourteen members — as the hand-authored `index.d.ts`. |
| 15 | `delivery` | What ships and how it is built | Own the package manifest, the five per-platform packages, both crate manifests, the shipped README and the release pipeline. |
| 16 | `store-battery` | The store-side battery | Drive the native crate's declared behaviour through its own integration battery. |
| 17 | `binding-battery` | The binding crate's battery | Drive the conversion core's per-class table in Rust, with no Node runtime present. |
| 18 | `js-battery` | The JS battery | Drive the assembled package through the entry: surface, kernel, listeners, codec, properties, publication. |
| 19 | `greens-harness` | The greens runners | Drive the assembled package as a caller from outside, per wave, and report each green with its layer. |

**Row 13 is a supersession, not an original reading.** At `e2fcbef` this table carried two rows here — **13
`js-constraints`** (*"reach the kernel lazily without importing it at load"*) and **14 `constraint-kernel`**
(*"evaluate a write against registered pairs…"*) — and `D-1` folds them into one: the mechanism is a strict
requirement with nothing to defer, so the boundary between the members' glue and the evaluation machinery is
not an ownership boundary. **The merged row keeps the id `js-constraints`** rather than taking a new one, so
that every consumer-facing relation keeps its key and `D-1`'s own citations keep resolving; the separate
`constraint-kernel` key is dropped from every module's list (§3, `modules.json`). The
fourteen-member instance and the single failure form are unmoved by `D-1` and are still stated at row 10 and
§4 E1.

**⟶ ROWS 9–13 ARE THE FIVE MODULES THE `D-2` CUT RE-HOMES, AND NO ROW IS ADDED OR REMOVED BY IT.** The
subdivision (`docs/L1/entry-subdivision.md`) turns the five co-owned regions into **nine single-owned parts across
the same five modules**: `js-surface` 1 file, `js-resolution` 2, `js-crossing` 2, `js-registry-delivery` 2,
`js-constraints` 2 — so **19 modules stand**, and the responsibility lines above stay as written **with one
declared change marked at `modules.json` and at §2.3**: *"render the single failure form"* moves from row 10
(`js-surface`) to row 9 (`js-resolution`), because the form's file must sit below the artefact gate that throws
through it. **That is the only responsibility that moves**, and it moves *within* JS — it does not touch `A75`'s
three JS-resident things (the registry, the opaque handle, the single failure form), all of which stay in JS.

**⟶ AND AT `D-13` ROW 13 GAINS THE KERNEL'S OWN PARTS, WITHOUT GAINING A FILE COUNT OF ITS OWN IN THIS TABLE.**
`docs/L1/kernel-subdivision.md` cuts `bindings/js/src/constraint-kernel.mjs` into **five parts — `kernel-foundations.mjs`,
`kernel-registration.mjs`, `kernel-commit.mjs`, `kernel-attempt.mjs`, `kernel-terminal.mjs` — under
`bindings/js/src/entry/`**, and reduces the kernel's own path to **a six-name re-export barrel**. **All five parts are
files inside row 13's ownership and none is a module** (`kernel-subdivision.md` §1, and the revision block above says
why: a part is a file, a module is an ownership unit, and `D-1` dissolved the boundary between the glue and the
kernel). **The row's responsibility line therefore gains one clause rather than a row: *"and hold the kernel as five
parts beneath a six-name barrel whose export sites are its parts' and whose export NAMES are the module's."*** The
other fourteen rows are untouched by both cuts.

---

## §2 · Ownership — which existing paths each module owns

### §2.1 The native store crate (`storeroom-native`)

| module | paths |
|---|---|
| `store-core` | `src/store.rs` (2,472 lines), `src/lib.rs` (41 — the crate root and its re-export list) |
| `store-value` | `src/value.rs` (330), `src/json.rs` (203) |
| `store-args` | `src/args.rs` (329) |
| `store-records` | `src/records.rs` (268) |
| `store-fail-set` | `src/error.rs` (795) |

`src/lib.rs` re-exports (read at the bytes, lines 31–41): `args::{…}`, `error::{storeErrorMessage, MessageArgs,
StoreError, CODES}`, `records::{…}`, `store::{storeCreate, storeCreateWithConstraints, Store}`,
`value::{Segment, StoreValue}`. The crate root is owned by `store-core` because it is the store's own
public-surface declaration; every other store module's items reach the outside world *through* it, which is
recorded as an interaction rather than as co-ownership of the file.

### §2.2 The binding crate (`storeroom-js-binding`, `bindings/js/`)

| module | paths |
|---|---|
| `binding-crossing` | `bindings/js/src/crossing.rs` (1,178) |
| `binding-codec` | `bindings/js/src/codec.rs` (966) |
| `binding-facade` | `bindings/js/src/facade.rs` (1,105), `bindings/js/src/lib.rs` (90), `bindings/js/build.rs` (325) |

The three-way split is **the crate's own declared split**, not this map's proposal: `bindings/js/src/lib.rs`
declares `pub mod crossing` (the pure-Rust core, `package.md §4.5` item 1), `pub mod facade` (the `cdylib`
half) and `pub(crate) mod codec` ("the facade's conversion core … an implementation detail of the facade's own
thin methods"). `build.rs` is owned by `binding-facade` because it exists to make the facade's `extern "C"`
Node-API symbols link, and it emits the version stamp that the facade's `addon_version` reads.

### §2.3 The published JS package

| module | paths |
|---|---|
| `js-resolution` | `bindings/js/index.mjs` — **region** `L79–L617` |
| `js-surface` | `bindings/js/index.mjs` — **regions** `L1–L78` (file header and route statement), `L618–L746` (the failure form), `L3425–L4593` (`storeCreate` and the fourteen members) |
| `js-crossing` | `bindings/js/index.mjs` — **region** `L747–L3070` |
| `js-registry-delivery` | `bindings/js/index.mjs` — **regions** `L88–L200` (the symbol-key registry), `L201–L331` (the attempt seam), `L3072–L3424` (instance state and carriers), `L4594–L5200` (commit refusal, delivery, registration, terminal arm) |
| `js-constraints` | `bindings/js/index.mjs` — **region** `L5202–L5903`; and `bindings/js/src/constraint-kernel.mjs` (2,203) |
| `js-declaration` | `bindings/js/index.d.ts` (788) |
| `delivery` | `bindings/js/package.json`, `bindings/js/README.md`, `bindings/js/Cargo.toml`, `Cargo.toml`, **`tests/Cargo.toml`** (the third package's manifest — ⟶ ADDED 2026-10-25: `D-34` put a `storeroom-tests` package at the root to host the Rust batteries, and a manifest is `delivery`'s kind of artifact; the map's "both crate manifests" is now three), `bindings/js/platforms/{linux-x64,linux-arm64,darwin-x64,darwin-arm64,win32-x64}/package.json` (5), the same five `README.md` (5), `.github/workflows/publish.yml`, `scripts/publish.sh` |

**⟶ THE TABLE ABOVE IS THE PRE-CUT REGION MAP AND STANDS AS FILED; THE TREE IT AUDITS IS A HUB PLUS THIRTEEN
FILES, MEASURED 2026-10-25.** The rows above name line regions of a 5,903-line file, and no such file exists: the
present ownership is **`bindings/js/index.mjs` — 1,409 lines, `js-surface`'s alone**, carrying the file header and
route statement, the module-context derivation, `storeCreate` and the fourteen members, the eight static imports of
`./src/entry/` and the module-namespace statement; **`bindings/js/src/entry/` — thirteen `.mjs` files, each owned by
exactly one module** — `js-resolution` 2 (`refusal.mjs` 82 · `artefact.mjs` 355), `js-crossing` 3
(`class-decision.mjs` 1,204 · `carrier.mjs` 960 · `frame.mjs` 416), `js-registry-delivery` 2 (`state.mjs` 600 ·
`delivery.mjs` 639), `js-constraints` 6 (`constraints.mjs` 795 plus the kernel's `kernel-foundations.mjs` 529 ·
`kernel-registration.mjs` 644 · `kernel-commit.mjs` 156 · `kernel-attempt.mjs` 570 · `kernel-terminal.mjs` 324);
**`bindings/js/src/constraint-kernel.mjs` — 4 lines, where this table's `js-constraints` row prints 2,203** (six
names in four re-export specifiers, `owns_note`); and **`bindings/js/index.d.ts` — 891 lines, where the
`js-declaration` row prints 788**. **One name in the target column is not a path on disk and is named rather than
looked for: `walk.mjs`** — `D-33` took part 6's seam at `index.mjs:2799` and the halves landed as `carrier.mjs` and
`frame.mjs`. The thirteen sizes and the by-module split are `modules.json`'s `entry_owns_reconciled`; the hub's
1,409, the barrel's 4 and the declaration's 891 are read at each file's own last line in this pass.

**⟶ AND THE REGIONS ABOVE WERE AUDITED AT `D-2`, WHOSE CUT IS DECLARED IN `docs/L1/entry-subdivision.md` §1–§2.**
`D-2` says in as many words that the five regions *"are the ones the current file implies, and nothing in `D-2`
blesses them as the cuts to take."* **The audit found three things and the declaration acts on all three:**

1. **The regions overlap.** `js-resolution`'s `L79–L617` contains `js-registry-delivery`'s `L88–L200` **and**
   `L201–L331` — two modules claim the same bytes today. **Measured**, not supposed: both rows are in the table
   above. The cut removes the overlap by giving the symbol-key block and the attempt seam to one part (§2 of the
   subdivision declaration, part 4).
2. **`js-surface`'s "failure form" region `L618–L746` is three subjects, not one.** `fail` + `refusalLog`
   (`L565–L645`) depend on nothing; `withAddon` + `spellDottedContainer` + `boundaryReject` (`L646–L716`) are the
   artefact meeting's own and throw through the form; `L717–L746` is the walk's class-decision banner. The cut
   splits them — **on legibility, and the declaration says so rather than manufacturing a cycle: keeping the region
   whole closes none** (declaration §3.2 case 1), but it would make the package's most-imported function unfindable
   and put the gate's private mutable state (`let addon`, `addonArm`, `tried`, …) in scope of every refusal
   consumer. **Once the form is its own file, owning it from `js-surface` DOES close a module cycle** (declaration
   §3.2 case 4: part 3 imports part 2 and part 1 imports part 3), and that is why its carrier module changes.
3. **`js-crossing`'s `L747–L3070` splits at the banner the file itself drew** (`L1871→L1872`, *"THE CROSSING MODEL,
   ENCODED FOR THE CORE"*), because the class decisions are consumed by the encoders and produce nothing the class
   half reads.

**THE MAPPING, REGION BY REGION — a declared target ⟶ AND, AS OF 2026-10-25, THE TREE ITSELF.** The caption as
filed read *"a declared target, with no path on disk today except the two the file already has"*; **every `target
path` in the table below now exists on disk and carries the bytes it was assigned, so the right-hand column IS the
tree and the `present region` column beside it is a PAST STATE** — `index.mjs` is 1,409 lines, so the ranges
`L1–L78`, `L618–L746`, `L3425–L4593`, `L5202–L5903` and every other address a reader may still find in this
section no longer point at the code they name. **No row is rewritten and no boundary is redrawn**: the declaration
and the landed tree agree, which is what the table was for, and the stale half is the half that described the
world before the wave (`D-2`, `D-33`; the head revision block names each of the thirteen files and its measured
size). **A reader who needs a present line number must read `docs/L1/entry-subdivision.md` — and even that file's
regions are pre-cut, as its own head now says.**

| module | present region | declared part (§1 of the subdivision) | target path |
|---|---|---|---|
| `js-surface` | `L1–L78`, `L618–L746`, `L3425–L4593` | **part 1**: `L1–L87`, `L3406–L4577`, `L5901–L5903` | `bindings/js/index.mjs` (**unchanged**) |
| `js-surface` → `js-resolution` | `L618–L645` (the failure form) | **part 2** | `bindings/js/src/entry/refusal.mjs` |
| `js-resolution` | `L79–L617`, **minus the two blocks below** | **part 3**: `L301–L564`, `L646–L716` | `bindings/js/src/entry/artefact.mjs` |
| `js-registry-delivery` | `L88–L200`, `L201–L331`, `L3072–L3424` | **part 4**: those two blocks + `L3067–L3405` + `homeAddressKey` (`L4780–L4796`, moved down) | `bindings/js/src/entry/state.mjs` |
| `js-crossing` | `L747–L3070` | **parts 5 and 6**: `L717–L1871` / `L1872–L3066` | `…/class-decision.mjs` · `…/walk.mjs` |
| `js-registry-delivery` | `L4594–L5200` | **part 7**: `L4578–L5186` minus `homeAddressKey` | `bindings/js/src/entry/delivery.mjs` |
| `js-constraints` | `L5202–L5903` | **part 8**: `L5187–L5900` (the module-namespace statement `L5901–L5903` travels to part 1) | `bindings/js/src/entry/constraints.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` | **part 9**: the whole file, unchanged | `bindings/js/src/constraint-kernel.mjs` (**unchanged**) **⟶ SUPERSEDED AS TO THE FILE'S INTERNAL STATE AT `D-13`: see the kernel table below** |

**⟶ THE KERNEL'S OWN CUT AT `D-13`, REGION BY REGION — a declared target, and no path on disk under `src/entry/` at
all.** The entry pass declined this cut and said why (`entry-subdivision.md` §9 Q1: *"a cut drawn on this evidence
would be a guess dressed as a boundary"*); **`D-13` ordered the measurement, and `docs/L1/kernel-subdivision.md` draws
the cut from it.** The row above is right about the **region** (`L1–L2203`) and superseded about the **file**:

| module | present path | declared part (§1 of `kernel-subdivision.md`) | target path |
|---|---|---|---|
| `js-constraints` | `src/constraint-kernel.mjs` `L1–L481`, `L1364–L1417`, `L1777–L1802` | **9a** the foundations — the closed tokens, the five symbols, the refusal form, the pair machinery, the state, the appenders, the repair-op reading, the two scans | `bindings/js/src/entry/kernel-foundations.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` `L483–L1003`, `L2091–L2203` | **9b** `K-1` and `K-6` with the registration-time evaluation | `bindings/js/src/entry/kernel-registration.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` `L1004–L1153` | **9c** `K-2` | `bindings/js/src/entry/kernel-commit.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` `L1155–L1362`, `L1419–L1775` | **9d** `K-3` and the pass | `bindings/js/src/entry/kernel-attempt.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` `L1804–L2058`, `L2060–L2089` | **9e** the terminal act and `K-4`/`K-5` | `bindings/js/src/entry/kernel-terminal.mjs` |
| `js-constraints` | `src/constraint-kernel.mjs` — the rest | **the barrel**: six re-exports and nothing else | `bindings/js/src/constraint-kernel.mjs` (**unchanged**) |

**The partition is exact: 2,195 assigned lines + 8 blank separators = 2,203, the file's own last line**
(`kernel-subdivision.md` §1). **Four of the five parts take more than one range**, because four declaration groups are
carved out of a region whose subject they do not share — and **the two kinds of carve are told apart rather than lumped
together**: `pairsAtAddress`/`attemptHeldAt` out of the pass **removes two edges** (`9b → 9d` and `9c → 9d`, i.e. two
act parts depending on a third) and is the same device the entry's cut used once for `homeAddressKey`;
`attemptIdOf`/`commitAttemptIdOf` out of the terminal region **removes no edge at all** (`9d` already reaches `9e`) and
is carved because two parts read the reference's normalisation; and `K-6` `remove` is carved out of the file's tail
because its one in-family caller is inside 9b. **The six exports' `export` SITES move to four files and their
module-level NAMES stay reachable at the same path** (`kernel-subdivision.md` §4) — the correction of
`entry-subdivision.md` §4.1's *"the same six `export` sites, unchanged"* that this map carries, and the reason its own
§4 E6 paragraph is rewritten below.

**So of the five declared regions: three are kept with their boundaries moved by a few lines (constraints,
registry-delivery's delivery half, surface's member region), one is split in two (crossing), and one is re-cut into
three (resolution ↔ surface ↔ the failure form).** The module count does not move: the cut frees **regions**, not
modules — which is the same thing `D-1` did when it folded two file-owners into one module. §5.1 states the
consequence for the co-owned path.

**`js-constraints` owns both paths, and the line between them is internal to it.** At `e2fcbef` this table gave
`bindings/js/src/constraint-kernel.mjs` to its own module **14**; under `D-1` the kernel is tightly integrated,
so the module owns the entry's constraint region `L5202–L5903` **and** the kernel file, at one ownership. The
two paths and the `require_` that joins them are therefore **inside one module's boundary, not across it** —
their separation is a fact of how the code is laid out, not an ownership claim. **Dissolving it physically
(moving the kernel's content into the entry, or folding the two files) is an implementation pass's act, and
neither this map nor `D-1` orders it**: `D-1` rules what the mechanism *is*, and says in as many words that it
orders no code move. The file still exists and is still owned here; nothing in this map presumes it has moved.
**⟶ AND AT `D-13` THE "ONE OWNERSHIP" IS NOW SEVEN PATHS UNDER ONE MODULE: the entry's constraint glue
(`src/entry/constraints.mjs`) plus the five kernel parts plus the barrel, all `js-constraints`'.** The two-path sentence
above stands for the tree; what the kernel's cut adds is that **the family's internal edges are five relative imports
and nothing else** — no node builtin, no entry part, no third-party dependency — which is the shape
`kernel-surface.md §1` item 1's *"an import footprint of NOTHING"* becomes once the file is cut
(`kernel-subdivision.md` §4.4 puts that reading to the architect rather than taking it).

`scripts/publish.sh` (410 lines) is the release runbook, and it is owned here because it and
`.github/workflows/publish.yml` are **one pipeline under one owner**: the script's own header says its tag push
is what fires the workflow, and `delivery`'s responsibility already carries *the release pipeline*. The first
pass left the path out of the map altogether; §5 carries the reconciliation that puts it back.

**`bindings/js/index.mjs` is the one file this map splits.** ⟶ **AND IT IS NO LONGER SPLIT ONLY ON PAPER,
2026-10-25: the file is 1,409 lines, the seven regions below are past state, and the eight parts this paragraph
declares are eight files under `bindings/js/src/entry/`.** The paragraph is kept whole because it is the audit
that justified the cut, and it is read through the head revision block. As filed it was 5,903 lines and carried, by its own
declaration sites (measured by grep on function declarations, not read line by line): the platform and version
table and the resolution ladder (`L332–L617`), the failure form (`L618–L746`), the JS-side walk, class
decisions and all encoders and decoders (`L747–L3070`), the per-instance registry, the state carriers and the
`finalization` retirement (`L3072–L3424`), the fourteen members as one 1,169-line `storeCreate`
(`L3425–L4593`), delivery and the terminal arm (`L4594–L5200`), and the constraint glue (`L5202–L5903` — the
one region whose owner also owns a second file, `src/constraint-kernel.mjs`, under `D-1`). The five regions
above are declared **as ownership boundaries only**, and the count of owning modules is unchanged at **five**:
the merge folds two file-owners into one module, it does not free a region. The path itself is therefore listed
in §5 as co-owned: *no single module can own `index.mjs` until the regions are physically separable* — **and the
clause that followed it here at the `D-1` revision, *"and this map does not order that separation"*, is
SUPERSEDED AT `D-2`: §5.1 is its operative home and this is a pointer to it, not a second site for the ruling.**
`D-2` orders the subdivision **for readability**, and **this map still draws no cut** (§6 Q2's first half stays
open). **⟶ ANNOTATED AT THE `D-2` REVISION, BY THE SUPERVISOR, ON THE CORRECTION PASS'S OWN QUESTION** — the echo
stood here unannotated while §5.1 carried the ruling, which left one map printing both readings; the ruling
itself is `D-2`'s and no boundary is redrawn here.

### §2.4 The batteries and the greens

| module | paths |
|---|---|
| `store-battery` | **NOW `tests/integration/store-core/` (12), `tests/integration/store-fail-set/` (1), `tests/integration/store-args/` (1) and `tests/integration/support/mod.rs` (1)** — the same fifteen files the row below names, at the stratified paths. **WAS `tests/` — 15 files:** `construction.rs`, `construction_access_probe.rs`, `e2e_json_round_trip.rs`, `e2e_listener_firing.rs`, `fail_codes.rs`, `gate4_red_set_fix.rs`, `journal_and_rollback.rs`, `properties.rs`, `read_and_delete.rs`, `record_shapes.rs`, `tiers_and_purge.rs`, `walk_and_resolver.rs`, `watched_addresses.rs`, `write_arms.rs`, `support/mod.rs`. **`tests/` holds no `.rs` file at its top level today** (⟶ MOVED 2026-10-25, `D-5`; `docs/L1/test-stratification.md` §2.2/§2.5) |
| `binding-battery` | **NOW `tests/integration/binding-crossing/` (`crossing_copy.rs`, `addon_adoption.rs`, `surface_verbs.rs`, `register_layer.rs`, `support/mod.rs`) and `tests/unit/binding-crossing/` (`crossing_carriers.rs`, `crossing_values.rs`)** — the same seven files. **WAS `bindings/js/tests/` — 7 files:** `addon_adoption.rs`, `crossing_carriers.rs`, `crossing_copy.rs`, `crossing_values.rs`, `register_layer.rs`, `surface_verbs.rs`, `support/mod.rs`. **These seven are targets of the third package, `storeroom-tests` (`tests/Cargo.toml`), not of the binding crate** — a Cargo package's integration tests must live inside it, and this crate's no longer do (⟶ MOVED 2026-10-25, `D-34`) |
| `js-battery` | **NOW `tests/e2e/` (23 `*.test.mjs`), `tests/integration/js-constraints/` (11 `*.test.mjs`) and `tests/unit/js-{surface,constraints}/` (3 `*.test.mjs`), plus four helpers and two records at the scopes §2.5 of the stratification assigns** — the same 42 files. **⟶ CORRECTED 2026-10-25: FORTY-SIX paths, not 42** — the 37 `*.test.mjs` plus the four shared helpers plus the two records are 43, and the migration's three helpers (`module-set.mjs`, `pack-reachability.mjs`, `staged-install/staged-install-support.mjs`) are the rest; `modules.json`'s `js-battery` `owns` array lists all forty-six. **WAS `bindings/js/test/` — 42 files:** 37 `*.test.mjs`, 4 shared helpers (`addon-adoption-support.mjs`, `addon-surface-support.mjs`, `constraint-kernel-helpers.mjs`, `held-listener-identity-helpers.mjs`), and `REMEASURE-2026-10-18.md` (⟶ MOVED 2026-10-25, `D-5`) |
| `greens-harness` | **NOW `tests/e2e/` — the ten runners (`greens.mjs`, `live-drive.mjs`, `blind-constraints-v2.mjs`, `held-listener-identity-greens.mjs`, `json-acceptance-set-greens.mjs`, `json-acceptance-set-live.mjs`, `json-crossing-live.mjs`, `json-crossing-live-s17.mjs`, `consumer-fix/scenarios.mjs`, `file-tier-save/scenarios.mjs`), the set document `file-tier-save/file-tier-save-greens.md`, and — declared new after the move — `installed/live-install.mjs` with `installed/install-support.mjs`, `module-set.mjs` and `pack-reachability.mjs`.** **WAS `bindings/js/greens/` — 11 files** as the row below names them (⟶ MOVED 2026-10-25, `D-5`; the four new artifacts are the stratification's §2.8 installed battery and the cut's own staging helpers). **⟶ AND THOSE FOUR ARE TWO MODULES' AND NOT THIS ONE'S, CORRECTED 2026-10-25: `module-set.mjs` and `pack-reachability.mjs` are `js-battery`'s (its `owns` array names both), and this module's added three are `installed/live-install.mjs`, `installed/install-support.mjs` and `installed/license-row-evidence.json` — the record `D-8`'s conditional reads, `INSTALL-12`'s home. Eleven + three = FOURTEEN, which is `modules.json`'s figure and the one the caption below restates.** |

**⟶ AND THE BATTERY ROWS ABOVE ARE THE TREE NOW, MEASURED 2026-10-25: `tests/**` IS 83 PATHS IN THE PRESET'S THREE
SCOPES PLUS THE PACKAGE'S MANIFEST — `tests/e2e/` 44 · `tests/integration/` 33 · `tests/unit/` 5 ·
`tests/Cargo.toml` 1 — AND THE OWNERSHIP SPLIT CLOSES OVER THEM EXACTLY: `store-battery` 15 · `binding-battery` 7 ·
`js-battery` 46 · `greens-harness` 14 · `delivery`'s `tests/Cargo.toml` 1 = 83, with no path owned twice and none
left unowned (`modules.json`'s `battery_owns_reconciled`).** The scopes are the preset's own (`D-5`, `D-6`), the
re-cut is `docs/L1/test-stratification.md`'s, and **it has landed** — so the sentences below that read the two JS
drivers as `bindings/js/test/` and `bindings/js/greens/`, and the clause that has the four battery modules keeping
"their present-state paths until the post-migration revision", are **past state read through this caption**:
`node --test "tests/**/*.test.mjs"` runs the first across all three scopes at once, and the second is the ten
runners plus their set document under `tests/e2e/`, with the installed battery's three files beside them. The
75-to-83 difference is the eight paths the migration added and not a growth of tests (head revision block).

The two Rust batteries are separate modules by the project's own ruling (`docs/specs/storeroom-js/contract.md`
§3.4 item 2: an independent sibling crate means *"the store's … `tests/**` and its measured green are NOT
TOUCHED"*), and the two JS-side drivers are separate because they differ in kind: `bindings/js/test/` is a
`node --test` battery over the entry, while `bindings/js/greens/` is a set of caller-shaped live runners that
report each green with its layer. **This is an ownership choice, not an observation** — see §6 Q3. **⟶ AND EVERY PATH IN THIS SECTION IS A
PRESENT-STATE PATH, NOT THE MODEL'S HOME (`D-5`: *"Keep the preset's choice"*):** the strata preset's test roles
are kept as configured — `role_l1_test_writer` → `tests/e2e/`, `role_l2_test_writer` →
`tests/integration/<module>/`, `role_l3_test_writer` → `tests/unit/<module>/` — **so the tree adapts and the
preset is not amended.** When the model takes these batteries over, their content is **stratified into those three
scopes**, and **which file goes to which scope is NOT drawn here**: the preset decomposes **by layer**, this
project's batteries are organised **by unit and wave**, and the re-cut of 75 files across three layers is L1's to
declare. **⟶ THE ORDER THIS IMPLIES, RECORDED AS CONSEQUENCE AND NOT AS A RULING:** `D-4` makes the publish shape
a consequence of what the e2e/blind scenarios prove, so the scenarios' placement is **upstream** of `delivery`'s
manifest decision.
**⟶ AND THE CUT IS NOW DRAWN ELSEWHERE, IN THE SIBLING DECLARATION (`D-5`'s own delegation):**
`docs/L1/test-stratification.md` carries the 75-file re-cut across the three scopes, **and at `D-9`/`D-10` it
also declares two things this section's path lists cannot carry:** **the `O3` cells' own run and label** (§2.7)
and **a NEW installed-layer battery under `tests/e2e/installed/`** (§2.8) which **owns no present-state path and
therefore appears in no module's `owns` list** — 19 modules and 61 endpoints stand, and the four battery modules
keep their ids and their present-state paths until the post-migration revision the stratification's §5 names.
**A reader looking for the installed layer's owner will not find one here, and that absence is the accurate
statement: the battery is declared before it exists.**

---

## §3 · Interactions — who calls whom, over what surface

The system has one declared route, and it is the direction of every interaction in it:

```
consumer → provident-storeroom entry (index.mjs) → addon artefact (.node, facade) → conversion core → native store
```

| # | from | to | over what surface | direction |
|---|---|---|---|---|
| I-1 | `js-surface` | `js-resolution` | `withAddon()` before any construction; the resolution answer or the absent-addon refusal | call |
| I-2 | `js-surface` | `js-crossing` | each verb's arguments, position by position, to the encoders; the decoded answer back | call |
| I-3 | `js-surface` | `js-registry-delivery` | `stateOf(instance)` for per-instance state; the member set handed the state at construction | call |
| I-4 | `js-surface` | `js-constraints` | the five constraint members and the write path's constraint evaluation | call |
| I-5 | `js-crossing` | `js-surface` (the failure form declared at `L618–L746`) | the package's one refusal form, rendered by `boundaryReject` with the store's own generator, appended with the class and position that failed | call |
| I-6 | `js-resolution` | `delivery` | the five scoped platform names and the version the ladder compares are the manifest's own `optionalDependencies` set — the entry's table and the manifest must name the same five at the same exact version | carried, not called |
| I-7 | `js-crossing` | the addon artefact | the encoded carrier set for `storeCreate` and the verb entries; the answer decoded back | runtime crossing |
| I-8 | `js-registry-delivery` | the addon artefact | `commitFile(opId)` — the terminal arm's only store call, on the passing arm alone | runtime crossing |
| I-9 | `js-registry-delivery` | the caller's own functions | `deliver` invokes each registered function with the triggering ADDRESS as its one argument | the package's own act |
| I-10 | `js-registry-delivery` | `js-crossing` | the `triggered` set's addresses, decoded, and the handle tokens | call |
| I-11 | — **vacated at `D-1`** — | — | stood for `js-constraints → constraint-kernel` as a lazy `require_`; the relation it named is **internal** to `js-constraints` now, and the number is retained rather than reused (see below) | internal, not a boundary |
| I-12 | `js-constraints` (its integrated kernel half) | the instance (an object `js-surface` defines) | the kernel drives the instance's own public members (`write`, `read`, `rollback`, `listen`, `unlisten`, `removeListener`) through the object it is handed | call, consumer-shaped |
| I-13 | `js-surface`, `js-crossing`, `js-declaration` | the store's fail set | the statuses are the store's and are carried, never minted; `index.mjs`'s header states this at `L18–L25` | carried value |
| I-14 | addon artefact (`binding-facade`) | `binding-codec` | each entry's Node-API arguments and its return value | call |
| I-15 | `binding-codec` | `binding-crossing` | the carrier model (`JsConfig`, `JsAddressArg`, `JsValue`, …) | call |
| I-16 | `binding-crossing` | `store-core` | `storeCreate`, `storeCreateWithConstraints`, and the `Store` verb surface | call (`Result<_, StoreError>`) |
| I-17 | `binding-crossing` | `store-args` | the permissive argument carriers folded to the store's arguments | call |
| I-18 | `store-core` | `store-value` | the admitted value domain for every value written and read | call |
| I-19 | `store-core` | `store-args` | `address_segments(arg)` and the config's closure | call |
| I-20 | `store-core` | `store-records` | the returned record shapes, the tier token and the resolver's reference | call |
| I-21 | `store-core`, `binding-crossing` | `store-fail-set` | `StoreError` / `Refusal` construction and the generated messages | call |
| I-22 | `binding-crossing` | `store-value` + `store-records` | `StoreValue` conversion and the `Js*` record wrappers over the store's records | call |
| I-23 | `delivery` | every published module | the `files` allowlist **carries FIVE rows in the tree today** — `index.mjs`, `README.md`, `index.d.ts`, **`src/entry/`**, `src/constraint-kernel.mjs` — and `D-1` rules the **kernel's own row has no subject**, so the intended shipped set is four entries plus one the ruling leaves standing in the manifest; **⟶ RE-MEASURED 2026-10-25: this row read four entries, and the fourth was the kernel's; the directory row is new and is the reachability consequence of the entry's cut, not a declared arity** (`D-13`: the parts live under `src/`, so a tarball must carry them); the `exports` map publishes `"."` only; five `optionalDependencies` pinned exactly. **⟶ THE COUNT'S BINDING FORCE IS RETIRED AT `D-3`** (*"Obsolete the constraint on 'exactly four'"*): the four entries **stand as a fact of the tree and no longer as a rule**, and the allowlist is now a consequence of **reachability** — what the entry requires by path must ship — with the `exports` arm and the five exact pins untouched by it. **⟶ ANNOTATED BY THE SUPERVISOR, on the same ground as §2.3's annotation: propagation of a ruling already given, not a boundary redrawn.** **⟶ AND THE WHOLE COUNT FAMILY IS LIFTED AT `D-4`** (*"The strict count is lifted, the delivery module and the e2e/blind scenario testing will determine the required publish shape"*): **no declared arity and no declared exclusivity binds this allowlist**, `§2.1` item 1's *"NOTHING ELSE"* retiring with item 6's four. **The shape is now decided EMPIRICALLY — `delivery` together with the e2e/blind scenarios (`js-battery`, `greens-harness`) determine it** — so this row's four names are **a fact of the tree and nothing more**, and a pass that restores a hand-maintained allowlist inside a specification has re-created the constraint `D-4` lifted. **The prohibitions are unmoved:** no `.node`, no `build/Release`, no `postinstall` route, and the tracked-tree walk are functional and security rules, not shape rules. | declared, not called |
| I-24 | `store-battery` | `store-core`, `store-value`, `store-args`, `store-records`, `store-fail-set` | the crate's own integration battery | test drive |
| I-25 | `binding-battery` | `binding-crossing` | the per-class table driven with no Node runtime | test drive |
| I-26 | `js-battery` | `js-surface`, `js-crossing`, `js-registry-delivery`, `js-constraints`, `delivery`, `js-resolution` | `node --test` through the entry (`import { storeCreate } from 'provident-storeroom'`) and, for the kernel's cells, `../src/constraint-kernel.mjs` — a fact of the tree; `D-1`'s consequence is that those cells reach a file internal to one module, not a peer module's published export. **`D-1-ter` names why that reach is lazy, and it bears on this row:** the entry must load where nothing is staged beside it, because **the publish and negative drives assemble trees carrying `index.mjs` alone** — so a wave dissolving the lazy reach would have to touch those drive fixtures. No unit is open and this row orders no such wave. **⟶ AND AT `D-2` THE REACH'S PATH IS DECLARED UNCHANGED: the kernel stays at `bindings/js/src/constraint-kernel.mjs`, so no cell re-points because of the subdivision** (`docs/L1/entry-subdivision.md` §4.1; 21 non-`scratch/` files reach that path in code today — 11 under `bindings/js/test/`, 9 under `bindings/js/greens/`, and `index.mjs:5227`; 27 name it in all). **What the subdivision does change for this row is the DRIVES' STAGING, not their reach:** once the entry statically imports eight parts, a tree carrying `index.mjs` alone cannot load, so the publish, publish-generators, version-stamp and negative-generators copy arms must stage the part set (`D-1-ter`'s *"they must either stage the integrated set or drop their kernel-only limbs"*, now generalised: the kernel was one file and the part set is eight). §4.2 of the subdivision declaration lists every drive and which one is unaffected. | test drive |
| I-27 | `greens-harness` | the assembled package (all JS modules) | the entry and the built `.node` as a caller would reach them, per wave | live drive |
| I-28 | `js-declaration` | nothing at runtime | it declares the same surface the entry publishes; no module imports it | declaration |

**I-11 is vacated, and its number is retained rather than reassigned.** At `e2fcbef` that row declared
`js-constraints → constraint-kernel` over `require_('./src/constraint-kernel.mjs')` — **lazily**, inside
`constraintsKernel()`, never at load. `D-1` rules the kernel **not an external import but tightly integrated**,
so the reach it described is **internal to one module** and nothing crosses a boundary there; what stood in the
row was a module boundary, and there is none. The number stays with the row it named because
`strata/decisions.md`'s `D-1` cites `I-11` by number — renumbering would make the ruling's own citation resolve
to a different relation — so **27 boundary interactions stand in this table and no id shifted**. I-12, I-23 and
I-26 are likewise kept at their numbers and restated where `D-1` moved them.

**Two interactions the map states explicitly because they are the ones a reader gets wrong.** The store
invokes no callback: I-9 is the *package's* act, performed after the addon's call has returned, and the addon
only ever returns the triggered handle set (`A57`, brief §5 item 5). And the constraint mechanism is **not an
external import**. The sentence that stood here at `e2fcbef` — I-11's lazy `require_` keeps the entry's
zero-dependency rule intact *"while the kernel still ships in the package's `files` allowlist"* — is
**superseded**: the mechanism is a strict requirement, so there is nothing to defer and nothing separate to
ship, and the fourth allowlist entry's *published-module* subject is gone (I-23). The `require_` is still in the
tree and `D-1` orders no code move; what changes is that its two ends are one module's ends.
**⟶ AND THE LAST CLAUSE IS COMPLETED AT `D-2`, IN BOTH DIRECTIONS, BECAUSE HALF OF IT WOULD MISLEAD ALONE:**
the *lazy reach* is declared to retire with the subdivision (no tree carrying `index.mjs` alone can load once the
entry imports its parts — declaration §4.2), while **the fourth allowlist ROW survives on a different ground** —
reachability, because the entry then requires the kernel as a file like any other part (declaration §5; I-23's
annotation). `D-1`'s *"no subject"* was about the **published-module** reading, and `D-2` does not restore the
module, only the required file.

### §3.1 The four interactions the subdivision declares — **TARGET, not tree**

**These rows describe edges that do not exist in the tree and will once `D-2`'s cut lands**
(`docs/L1/entry-subdivision.md` §3, §6.2). **They are numbered and tabulated here rather than left implicit, which
is the one thing this map owes a cut that crosses part boundaries**: §6.2 of the declaration says every part-boundary
edge that crosses a *module* line is declared as an interaction, and every edge that stays inside one module is the
part DAG's own business (declaration §3.1). **The tree's figure remains 27; these four are marked `target` and no
reader may count them as measured.**

| # | from | to | over what surface | status |
|---|---|---|---|---|
| `I-29` | `js-surface` (part 1, `index.mjs`) | `js-resolution` (part 3, `artefact.mjs`) | **the entry's module context** — `ADDON_PATH` (`index.mjs:85–86`), the `createRequire` base (`:85`, used at `:441` and `:491`) and the manifest path (`:359`), all derived from **`index.mjs`'s own `import.meta.url`** and handed in. A part deriving them from its own URL would search `bindings/js/src/entry/` for the artefact, the manifest and the platform packages | target |
| `I-30` | `js-crossing` (parts 5, 6) | `js-resolution` (part 3) | `boundaryReject` — the walk's own `A76` rejection, rendered through the artefact's generator, at eleven sites (`:1856` in the class decisions and ten in the encoders) | target |
| `I-31` | `js-registry-delivery` (part 4) | `js-resolution` (parts 2, 3) | `fail` in `carryRefusal`/`writeRefusal`, `boundaryReject` in `stateOf`, `withAddon` in `entryOf` | target |
| `I-32` | `js-constraints` (part 8) | `js-resolution` (parts 2, 3) | `refusalLog` in `registrationCrossing`/`constraintCrossing`, `withAddon` in `registrationCrossing` | target |

**All four point the same way, and that is the DAG's shape rather than a coincidence:** the parts `js-resolution`
owns are the ones that need nothing above them (the form depends on nothing; the artefact meeting depends only on
the form), so the module that owns them is the **bottom** of the JS stack and every other JS module sits above it.
**The one direction that is deliberately absent is `js-resolution → js-surface`** — the module-level cycle §3.2
case 4 of the declaration refuses, and the reason the failure form's *module* changes: the form is its own file, and
that file must be owned below the gate that throws through it.

### §3.2 The kernel's cut adds **no** interaction row — and that is a measured difference from the entry's cut

**`D-13`'s five parts cross no module line.** `js-constraints` owns the entry's constraint glue and every kernel part,
so **each edge the kernel's cut creates is an edge inside one module's ownership**, which §3.1 of the entry's
declaration already declares to be *"the part DAG's own business"* and not this table's. **So the arithmetic here is
not four more rows; it is four rows and nothing:** `I-29`…`I-32` stand as declared targets, **`I-33` is not minted**,
and the kernel's DAG is carried in `docs/L1/kernel-subdivision.md` §3.1 where a reader can check it against the call
sites.

**Stated as the shape rather than as an absence, because the shape is the claim:**
`kernel-foundations → (nothing)`; `kernel-registration → foundations`; `kernel-commit → foundations`;
`kernel-attempt → foundations, kernel-terminal`; `kernel-terminal → foundations`. **One part reaches a second part, and
it reaches downward**; there is exactly one edge that is not `→ foundations`, and the foundations import nothing at
all.

**And one consequence lands on an existing row rather than on a new one.** **`I-26`'s kernel reach keeps its path and
changes its SUBJECT**: the 21 non-`scratch/` files that reach `bindings/js/src/constraint-kernel.mjs` in code now reach
**a six-name re-export barrel**, not a file that carries the machinery — so the reach is still a path reach, still needs
no re-spelling, and `json-crossing.test.mjs:3936`/`:4140` still use the path as an identity. **Two greens cells pin that
barrel's namespace by exact string** (**MEASURED 2026-10-25: both of these are GREEN now and the citations below are corrected at their own sites** — `blind-constraints-v2.mjs:1251` pins the SIX names and passes; `held-listener-identity-greens.mjs:951` compares a sorted key list to the sorted declared one and passes): **as filed both were false on
this tree today, and the cut neither fixes nor worsens them** (`kernel-subdivision.md` §4.2) — which is why the barrel
must reproduce **exactly six enumerable names and no seventh**. **⟶ AND THIS SENTENCE IS THE MOST MISLEADING ON THIS
PAGE AS OF 2026-10-25, BECAUSE *"BOTH ARE FALSE ON THIS TREE TODAY"* IS FALSE OF BOTH.** `HLI-13.1` was measured
**green** by `D-15` (the greens file declares its own sorted `KERNEL_ITEMS`, which shadows the helper's unsorted
one), and `blind-constraints-v2.mjs`'s SURFACE cell has stood at **`:1249`, green on SIX**, since the battery's own
`D-20` execution pass — **both before the cut, so neither was ever the cut's to fix.** **The operative half is the last
clause only: the barrel reproduces exactly six enumerable names and no seventh, and it does.** `kernel-subdivision.md`
§4.2 and §7 items 14–15 carry the same correction at their own sites.

---

## §4 · The e2e I/O surface

What a driver of the whole system touches, and what crosses at each place.

### E1 · The consumer entry — the package's one export

```js
import { storeCreate } from 'provident-storeroom';
const store = storeCreate(cfg);
```

- **Crosses IN:** `cfg` — four declared keys, no fifth (`journalLength` and `listeners` required; `filePath`
  and `constraints` optional; a caller-supplied extra key is ignored rather than refused). Then, per member
  call: an address (`readonly (string|number)[]`), a tier token or tier set, a JS value, a `Handle` (a string
  the caller spells), a `Listener` function, a `ConstraintPair` and a `Constraint` function, a `CommitRecord`,
  an `opId`.
- **Crosses OUT:** the `StoreInstance` (fourteen own members, **none of them data**); a leaf's literal, a
  branch's assembled value or the whole register; `WriteRecord`, `DeleteRecord`, `RollbackRecord`;
  `ConstraintPair[]` from `constraints()`; `ConstraintIdentity`; `undefined` from `listen` / `unlisten` /
  `register` / the toggles; and, on every refusal, **one thrown plain object** `{status, message[, log]}` —
  never an `Error` subclass, never a rejection.
- **Verified at the bytes:** the module carries exactly one `export` (`storeCreate`, `index.mjs:3425`); the
  declaration carries exactly fourteen `StoreInstance` members (`index.d.ts:506–L729`: `read` ·
  `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` ·
  `constraintOn` · `constraintOff` · `register` · `removeListener` · `removeConstraint` · `constraints`), and
  `StoreStatus` is sixteen spellings plus the open escape arm `(string & {})` (`index.d.ts:237–L254`).

### E2 · The addon artefact boundary

- **The path:** `bindings/js/build/Release/storeroom_js_binding.node`, reached by `createRequire` from the
  entry (`index.mjs:85–L86`), or the scoped platform package at rung one.
- **Crosses IN:** the thirteen exported entry names as built — `storeCreate` · `read` · `readLiteral` ·
  `write` · `delete` · `rollback` · `listen` · `unlisten` · `removeListener` · `commitFile` · `register` ·
  `version` · `errorMessage` (`facade.rs`'s `#[napi]` sites, read by grep: lines 297, 513, 559, 606, 645, 679,
  714, 745, 780, 815, 911, 988, 1016).
- **The measurement behind the thirteen, stated exactly, because three greps give three numbers.** The figure
  counts **line-initial `#[napi` attribute sites only**: 4 bare `#[napi]` plus 9 `#[napi(js_name = …)]`. A
  `grep -c '#\[napi\]'` returns **24** and a looser grep **33**, because `facade.rs`'s own prose names the
  attribute many times in comments — those are mentions of it, not sites that export anything. The 13 is
  verified against the file's line-initial attributes, and it stands.
- **Crosses OUT:** a `JsVal` answer per entry, or the store's own thrown `{status, message}` carried verbatim.
- **Note a divergence:** `bindings/js/src/lib.rs`'s closing comment still says *"THE FIVE ENTRY FUNCTIONS KEEP
  THEIR NAMES AND ARITIES — `version` · `errorMessage` · `storeCreate` · `call` · `register`"*. The bytes of
  `facade.rs` declare thirteen annotated entries and **no `call`**: the single `call` dispatcher the comment
  describes has been replaced by nine per-verb entries plus `commitFile`. Recorded, not resolved.

### E3 · The store file boundary

- **The path:** `cfg.filePath`, probed at construction; the register's tier is fixed there and never moves.
- **IN:** the file's bytes at boot, through the store's own codec only (*never read, edited, parsed or migrated
  by hand* — brief §5 item 6).
- **OUT:** the canonical JSON image, written by the terminal arm's `commitFile`/`commit_file` on a passing
  `file`-tier write alone, before any listener body runs.
- **A `delete` and a `rollback` cross this boundary in neither direction** (brief §5 item 7).

### E4 · The publication boundary

- **IN:** `npm install provident-storeroom` for a consumer; a registry install for the five platform packages;
  the release workflow's run.
- **OUT:** the `provident-storeroom@0.5.0` package, one `exports` arm (`"."`), and five
  `@auspicion/provident-storeroom-js-*` packages pinned **exactly** at `0.5.0`.
- **Verified:** `bindings/js/package.json` — `version` `0.5.0`, `files` = **FIVE rows — `index.mjs` · `README.md` ·
  `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs`** (⟶ RE-MEASURED 2026-10-25; this line read **four**
  entries, `index.mjs` · `README.md` · `index.d.ts` · `src/constraint-kernel.mjs`, until the entry's cut put
  thirteen parts on disk and the packlist had to carry the directory they live in), `engines.node` `>=18.0.0`,
  five exact `optionalDependencies`.
- **The allowlist is what `D-1` corrects, and both halves are stated.** The tree **does** carry four entries
  today — that is a fact of the manifest, not a reading — and `D-1` rules that the **fourth
  (`src/constraint-kernel.mjs`) has no subject**, because a tightly integrated kernel is not published as a
  separately-reachable module. So the shipped set the ruling intends is three entries plus one row the ruling
  leaves in place. **This map records the ruling and does not pretend the code has moved**; no manifest edit is
  ordered here, and the fourth-row removal is an implementation pass's act.
  **⟶ AND THE ROW FAMILY IS LIFTED AT `D-3`, `D-4` AND `D-8`: this subsection is read THROUGH them and its
  arithmetic binds nothing.** `D-3` retires the *"exactly four"* count, `D-4` lifts the whole strict-count family
  (`§2.1` item `1`'s *"and NOTHING ELSE"* with it) and makes the publish shape **empirical** — decided by
  `delivery` together with the e2e/blind scenario testing — and `D-8` settles the **`LICENSE` row** as *lawful
  only if evidence requires it*, neither refused nor granted by rule. **So the four names above are a FACT OF THE
  TREE and not a rule**, the `files` output in `modules.json` is annotated to that reading, and **the prohibitions
  are unmoved** (no `.node`, no `build/Release`, no `postinstall` route, the tracked-tree walk). **The evidence
  that now determines the shape is declared at `docs/L1/test-stratification.md §2.8`** — the `LIVE/INSTALL`
  battery's installed-layer cell set, whose `INSTALL-02` carries reachability in place of the retired count.
  **⟶ ANNOTATED AS A POINTER, on the same ground as §2.3's and I-23's annotations: the ruling is `D-3`/`D-4`/
  `D-8`'s and no boundary is redrawn here.**

### E5 · The repository's instrument surface (not the product's)

`package.json` at the root is **private** and declares the gate-9 trio plus the greens:
`npm test` (**NOW** `node --test "tests/**/*.test.mjs"` — ⟶ RE-POINTED 2026-10-25: this read `node --test
bindings/js/test/*.test.mjs`, and that directory no longer exists, so the old command would have exited `0` having
run NOTHING), `npm run typecheck` (staged copy + two `tsc` projects), `npm run build` (**NOW**
`cargo build --offline --release -p storeroom-native && cargo build --release --manifest-path
bindings/js/Cargo.toml` — the store's half gained `-p` when `D-34` made the root a workspace and a bare root
`--offline` build would reach the sibling crate's registry crates), `npm run greens` (**NOW** the three runners at
their stratified paths: `node tests/e2e/greens.mjs && node tests/e2e/live-drive.mjs && node
tests/e2e/file-tier-save/scenarios.mjs`), and **three Rust legs plus the installed battery** the trio did not
have: `test:store` (`cargo test --offline -p storeroom-native`, 415), `test:battery` (`cargo test -p
storeroom-tests`, 235), `test:both` (plain `cargo test`, 650) and `test:e2e`
(`node tests/e2e/installed/live-install.mjs`). Nothing here is a consumer
entry point; it is how the batteries in §2.4 are driven.

### E6 · The kernel's loop — inside the module, no longer a package surface

`constraint-kernel.mjs` carries six `export` sites (`register` · `commit` · `runAttempt` · `log` · `report` ·
`remove`, read at L486, L1008, L1158, L2063, L2075, L2111). At `e2fcbef` this subsection declared those six
**a caller loop deliberately outside the package**, on the ground that the kernel was a separately-reachable
published module (`files` entry four) with its own consumer-facing entry points. **`D-1` supersedes that
reading:** a tightly integrated kernel **publishes no export set at all**, so the six are not a surface anything
outside the module crosses, and the pin that once governed them — an archived unit's *"exactly five"*, widened
to six, with a seventh refused by name — **governs nothing outside the code**. The six functions remain a fact
of the file (`D-1` orders no code move); they are internal to `js-constraints` (§2.3), and their endpoints are
among the seven the revision dissolves (FIGURES, §1).

**A divergence is recorded, not resolved.** This subsection also said the entry never invokes the loop. The tree
says otherwise: `constraintsKernel()` is called at `L3995`, `L4089`, `L4156`, `L5426`, `L5542`, `L5599`, and
`constraintWrite` runs `kernel.commit(instance, address, tier, value)` at `L5723` then
`kernel.runAttempt(instance, record)` at `L5729` — the brief's account, verified at the bytes. **Nor is that the
`A112` question:** whether delivery follows the constraint pass is still `OWED` a measurement (brief §6, §7
below), and this map takes no position on it.

**⟶ CORRECTED AT THE `D-2` REVISION: THE CALL-SITE FIGURE IS SEVEN, NOT SIX.** A grep for `constraintsKernel()`
returns **seven call sites** — the six above **plus `L5720`** (`const constraint = constraintsKernel();` at the head
of `constraintWrite`) — and one definition (`L5226`). **The sentence above and `strata/brief.md` §6 both print six,
because both name the member-side and glue-side sites and miss the one inside the write path's own function.** The
seven split **3 in the surface's region (`:3995`, `:4089`, `:4156`) and 4 in the constraint glue (`:5426`, `:5542`,
`:5599`, `:5720`)**, which is the fact the subdivision's part DAG turns on: **two parts reach the kernel, and the
declaration says so instead of routing one through the other** (`docs/L1/entry-subdivision.md` §3.1).

**AND THE KERNEL'S STATUS CHANGES AT `D-2` WITHOUT ITS PATH OR ITS FILE MOVING.** Under the declared cut the kernel
is **the ninth part of the subdivided entry** — statically imported by the constraint glue and, at three member
sites, by the entry itself — so the lazy `require_` and the `let KERNEL = null` cache have **no remaining subject**
(declaration §4.2 shows why a tree carrying `index.mjs` alone cannot load at all once the entry imports its parts,
which is what the laziness existed to prevent). **Its six exports stay exactly where they are (`L486`, `L1008`,
`L1158`, `L2063`, `L2075`, `L2111`) and stop being anything but module-level names its siblings import:** they were
never a published set — `exports` publishes `"."` only — and after the cut not even a tarball carries the file for a
caller to reach. **The kernel keeps an empty import footprint** (`kernel-surface.md §1` item 1; declaration §4.4),
so the doubled `Symbol.for` spellings are **mechanism, not duplication**, and a tidying pass that collapses them
would break the clause that keeps this module dependency-free.

**⟶ CORRECTED AT `D-13`: "ITS SIX EXPORTS STAY EXACTLY WHERE THEY ARE" IS RIGHT ABOUT THE NAMES AND WRONG ABOUT THE
SITES.** The paragraph above was written before the architect ordered the kernel's own cut, and the only world in which
its sentence is literally true is the world where the file stays whole. **`docs/L1/kernel-subdivision.md` §4 declares
what happens instead:** the **six `export` sites move to four parts** (`register`/`remove` → `kernel-registration.mjs`;
`commit` → `kernel-commit.mjs`; `runAttempt` → `kernel-attempt.mjs`; `log`/`report` → `kernel-terminal.mjs`) and the
**six module-level names stay reachable at the unchanged path** through **a re-export barrel** at
`bindings/js/src/constraint-kernel.mjs`. **Re-exported rather than re-pointed, on three measured facts:** 21
non-`scratch/` files reach that path in code in four different forms (named, namespace, dynamic and path-constant) and
two of them use it **as an identity**; **two greens cells assert the module namespace's key set by exact string**, so
the namespace's shape is a measured subject outside the code — **which is itself the divergence this map records
against `D-1`'s phrase that the kernel's export set *"publishes no export set at all"***, since a namespace that two
runners census is a surface of some kind even when no `exports` arm publishes it; and a re-point of 21 files would be
*"a test that must change for a reason other than a path"*, which the entry declaration's own §8 names as a falsifier of
the cut. **The barrel exports exactly six enumerable names — no `default`, no seventh** (`kernel-subdivision.md` §3.3
item 4), because the one thing `held-listener-identity-greens.mjs:951` still gets right is *"no seventh name is
reachable"*.

---

## §5 · Paths not owned by exactly one module

**THE ARITHMETIC OF §5, RECONCILED.** 105 paths owned by exactly one module (`§2`) + 1 co-owned (`§5.1`) + 20
unowned with a reason (`§5.3`) = **126**, which is the number of tracked non-`scratch/` paths in
`git ls-files`. **⟶ CORRECTED 2026-10-25 BY MEASUREMENT — the reconciled arithmetic is
`127 owned + 0 co-owned + 29 unowned = 156`:** the co-owned column emptied when the entry was cut and
`index.mjs` became `js-surface`'s hub, and the nine paths that were never in the `126` — `docs/L1`'s eight
files and `strata/decisions.md` — are unowned and itemised at FIGURES (`modules.json`'s
`ownership_arithmetic_against_156` carries the same terms). **The three figures above are the `126`'s own
reading and stand beside the correction, not in place of it.** No path is unaccounted for. The one path that accounts for the difference between the first
pass's 125 and the tracked 126 is **`scripts/publish.sh`** — tracked, at the repository root's `scripts/`, and
the release runbook — which that pass neither owned nor listed; this correction pass **gives it an owner**:
`delivery`, whose declared responsibility already carries *the release pipeline* and which already owns
`.github/workflows/publish.yml`, the workflow the script's own tag push fires (§2.3). `scratch/`'s 477 tracked
files are outside that 126 altogether, and §5.4 is why.

### §5.1 Co-owned — one file, several declared ownership regions

| path | why it is not owned once |
|---|---|
| `bindings/js/index.mjs` | **⟶ PAST STATE, 2026-10-25: THE FILE IS NOW THE HUB — 1,409 lines — AND THE FIVE REGIONS BELOW ARE THIRTEEN FILES UNDER `bindings/js/src/entry/`, EACH OWNED BY EXACTLY ONE MODULE; this cell is kept because it is the map's own record of *why* the file was co-owned at all, not because any of it stands.** As filed: 5,903 lines carrying five plainly distinct responsibilities (resolution, failure form, walk/codec, registry/delivery, constraints). §2.3 declares the regions and which module owns each. **The co-ownership is the present state of the tree:** it is one file today, and the five regions *are* the ownership declaration — a declaration the file has yet to be separated to satisfy. **The separation is sanctioned by the architect** (`D-2`: *"Index.mjs is already too long and should be subdivided anyway for readability"*), and it is owed as **legibility work on its own ground** — not as a consequence of `D-1`, and owed even had the kernel question never arisen; the two rulings compose by landing the tight integration *inside* a subdivided entry. **⟶ SUPERSEDED AT `D-2`'s DECLARATION: THE CUT IS NOW DRAWN.** *"This map still does not draw the cut … §6 Q2's first half stays open"* was true of the `D-1` revision and is no longer: **`docs/L1/entry-subdivision.md` §1–§2 draws it — nine parts, eight of them out of this file, each owned by exactly one module** — and §2.3's target table maps every present region to its part. **What is NOT superseded is this row's present-state claim:** the tree is one file today, no code has moved, and the arithmetic stands at **one co-owned path, five owning modules**. **What the declaration changes is the END of the co-ownership, marked as target:** `index.mjs` becomes `js-surface`'s alone and the eight part paths — seven new files plus the kernel — become single-owned, so the *target* is **zero co-owned paths** and **114 owned + 0 + 20 = 134** (FIGURES). **The second clause that stood here at the `D-1` revision — *"this map does not order the separation"* — is superseded by `D-2`; the clause this revision adds is that the declaration orders nothing either**: it draws the target and no wave is open. |

**⟶ AND THE CO-OWNERSHIP THIS ROW DECLARES IS ENDED, 2026-10-25 — NO PATH OF THIS MAP IS CO-OWNED ANY MORE.**
`bindings/js/index.mjs` is **1,409 lines** and is `js-surface`'s alone; **the eight parts the row declares as "the
END of the co-ownership, marked as target" are thirteen files on disk** under `bindings/js/src/entry/`, each
single-owned by the module its row assigns it. **The row above is kept whole because its reasoning is the map's
own record of why the file was co-owned at all**, and it is read through this clause: *"the tree is one file
today"* is a **past-tense** statement now, `index.mjs` carries the hub and eight imports, and **the co-owned
column of the FIGURES arithmetic is `0`.** **What the row's last clause promised is also settled and in the
direction it named:** the declaration ordered nothing, **and `D-33` and the implementation wave landed the cut
anyway** — the count is a fact rather than a target, and a reader who needs the present ownership should read §2.3's
right-hand column. **`114 + 0 + 20 = 134` / `113 + 0 + 20 = 133` / `118 + 0 + 20 = 138` are all superseded
arithmetic on a denominator that has since moved by the battery tree as well**: the head revision block prints
`127 owned + 0 co-owned + 20 unowned = 147` as arithmetic on measured deltas, owed its own `git ls-files` check —
**and that check has now been taken: the tracked non-`scratch/` set is `156`, not `147` (see the head revision block),
so the ownership split is owed a re-derivation against `156` rather than reprinted here. **⟶ AND THAT RE-DERIVATION IS NO LONGER OWED, 2026-10-25: FIGURES now prints it — `127 owned + 0 co-owned + 29 unowned = 156`, with the nine that the `147` missed (`docs/L1`'s 8 and `strata/decisions.md`) standing in the unowned column — and `modules.json`'s `ownership_arithmetic_against_156` itemises every term.**

**⟶ AND THE TARGET FIGURE THIS ROW CARRIES IS CORRECTED BY ONE AT `D-13`/`D-14` (FIGURES).** The co-owned path's end
is unchanged — `index.mjs` becomes `js-surface`'s alone and the co-ownership goes to zero — but **the entry cut creates
seven part files, not eight** (the eight-part count includes `index.mjs`, which already exists), so the entry cut's
target is **133**, and the kernel's five parts take it to **138**. **`114 + 0 + 20 = 134` in the row above is arithmetic
on a miscount and is superseded; `113 + 0 + 20 = 133` and `118 + 0 + 20 = 138` are the figures.**

### §5.2 Generated, vendored or built — present on disk, excluded by the project's own rules

`.cargo-home/` (the vendored crates.io cache, which its own ignore entry describes in those words: *"24 MB and
1,589 files … NEVER A DELIVERABLE AND NEVER A SOURCE"* — root `.gitignore` lines 154–169); `target/` and
`bindings/js/target/` (Rust build output); `bindings/js/build/`
(the built `.node`); **`bindings/js/Cargo.lock` — ⟶ DELETED 2026-10-25, AND IT LEAVES THIS CLASS BY CEASING TO
EXIST RATHER THAN BY BEING REPRIEVED** (a workspace member has no lock of its own, `D-34`; the workspace's
`./Cargo.lock` is listed as *tracked* at §5.3 and is the only lock in the tree);
`typecheck/node_modules/` (a staged copy of the shipped
manifest and declaration, rebuilt by `npm run typecheck`); `archive/` (the historical corpus — gitignored by
the project's own process rule, so the `archive/pre-strata-docs-2026-10-24/` tree the task describes is
**present but untracked**); `.impl-rc8-backup/`; `.tracker-reflow-backup/`; `.npm-cache/`.

**`scratch/` is not in this class** — it is not excluded by an ignore rule at all, and it must not be read as
though it were. See §5.4.

### §5.3 Harness and configuration — owned by no product module, and why

| path | class | reason |
|---|---|---|
| `package.json` (root) | harness | The private instrument manifest; *"INSTRUMENT HARNESS ONLY … NOT a publishable package"* (its own description). It carries no version of the deliverable. |
| `package-lock.json` (root) | harness lock | Produced by the harness's own `typescript` devDependency. **No ignore rule names it, and it is tracked** — verified: `git ls-files` lists it. |
| `Cargo.lock` (root) | store lock | **Present on disk and tracked** — verified: `git ls-files` lists it. **⟶ AND THE CONTRADICTION THIS ROW RECORDED IS NOW CORRECTED AT ITS OWN SITE, 2026-10-25: the root `.gitignore`'s prose no longer says *"`Cargo.lock` STAYS UNCOMMITTED by decision"*.** That sentence is superseded by a dated clause in the ignore file itself, because it never described the rule the repository follows — `git ls-files` has always carried the file, and since `D-34` it is **the one WORKSPACE lock: 41 packages, 3 members plus 38 registry crates**. **So this row's `class` column is now the whole truth and the parenthetical contradiction it carried is retired**: the lock is a **workspace lock**, tracked and committed, and `binding-crate-and-abi.md §1`'s *"pinning a consumer's transitive versions is a consuming-application decision"* is read as a decision this project took the other way. |
| `tsconfig.typecheck.json`, `tsconfig.typecheck.nodenext.json` | configuration | The two `tsc` projects the harness runs; they describe a staged copy, not the product. |
| `typecheck/consumer-fixture.ts` | harness fixture | The consumer-shaped fixture the type check compiles against. |
| `.gitignore` (root), `bindings/js/.gitignore` | configuration | Repository hygiene rules. `bindings/js/.gitignore` is the crate's own ignore set and is deliberately **not** owned by `delivery`, because it is a rule about what never ships. |
| `README.md` (root) | repository documentation | Product-level prose; the brief cites it, but no module's behaviour depends on it. (The *shipped* README at `bindings/js/README.md` **is** owned, by `delivery`.) |
| `LICENSE` | licence of record | *"Carried into every artefact at assembly time"* (brief §1). It is an input to the assembly, not an artefact any module produces; the package's `files` allowlist deliberately carries **no** `LICENSE` row. |
| `docs/specs/**` — 9 contracts | specification corpus | The authoritative kept contracts (`storeroom-native`, `storeroom-js` + `surface.md`, `storeroom-publish`, `storeroom-json-crossing`, `storeroom-held-listener-identity`, `storeroom-constraints`, `storeroom-addon-surface`, `storeroom-addon-adoption`). They are this workflow's *inputs*, and no code module owns its own specification: a module that owned its contract could amend what it is measured against. |
| `strata/brief.md` | L1 input | The brief itself. `strata/decisions.md` was **absent when this map was written** and is **present now**, carrying `D-1` — it is the authority this revision applies. Neither file is owned by a code module: a ruling is not a module's to hold. **Whether `strata/decisions.md` is tracked is not verified by this pass** (no shell), so it is neither owned nor counted; see FIGURES. **⟶ RESOLVED 2026-10-25 ON MEASUREMENT: `strata/decisions.md` IS TRACKED and it IS counted — as unowned, beside `docs/L1`'s eight files, and those are the two classes that take this section's unowned column from 20 to 29 (FIGURES).** |

### §5.4 `scratch/` — excluded from ownership by convention, never by an ignore rule, and git disagrees

**477 files under `scratch/` are tracked in git.** The tree as a whole carries no ignore rule; only scattered
subpaths of it do, and the root `.gitignore` names them one by one — `scratch/live/install-0.2.0/drive/`,
`scratch/probe-shape-a/`, `scratch/depth-probe/`, `scratch/g7-cache/`, `scratch/g7-consumer/`,
`scratch/g7-logs/`, `scratch/g7-stage/`, `scratch/npmcache/`, `scratch/def-f-live/`, `scratch/def-f-probe/`,
`scratch/jcx-impl/`, `scratch/jcx-s17/`. Everything else under `scratch/` is in the index.

What excludes those 477 from ownership is the project's own **convention**, and the root `.gitignore` states
it in those words in its own prose: **"a scratch is never a source"** (`.gitignore:217`). On that rule every
one of the 477 is a probe, a byproduct, a log or a one-off driver — **and that class is the whole answer**:
this map does not classify them path by path, and no reader should expect a per-file inventory of `scratch/`
anywhere in it.

**The convention and git's tracking disagree here, and this map says so instead of smoothing it over.** A
reader who runs `git ls-files` will see all 477 of those files; a reader who trusts the first pass's claim
that `scratch/` was *"excluded by the project's own ignore rules"* would not, and that claim was false.
Nothing under `scratch/` is owned, co-owned or listed as unowned, and none of it enters the 126-path
denominator. The whole tracked tree is **603 = 477 + 126**, which accounts for every path git carries. **⟶ SUPERSEDED 2026-10-25 BY MEASUREMENT: the denominator is `156` and `git ls-files` puts the whole index at `633`, so `633 = 477 + 156` (FIGURES).**

---

## §6 · Boundaries that are unclear in the existing tree

Stated as the question to be decided, not as a decision taken.

**Q1 — `src/store.rs`: one module, or one module per declared region?** The file is 2,472 lines and holds one
`Store` with 1,577 lines of methods across the contract's own regions: the resolver and walk
(`storeroom-native/contract.md` §2), the write/read/delete verbs (§3–§4), the tiers and purge chain (§5), the
journal, rollback and watched-address list (§6), the file image and construction (§7), and the listener home
(§6.5). **The tree draws no boundary inside it** — one `impl` block, no region banners — so this map adopts it
whole. Should ownership follow the file (as declared), or should the six contract regions each be owned
separately, which would make `src/store.rs` a second co-owned path?

**Q2 — are the five declared regions of `index.mjs` the right boundaries — and, as it also asked, is the split
to be taken at all?** **The second half is CLOSED by `D-2`, and the question keeps its wording so a reader sees
what was asked:** it read *"Is the split to be taken at all, or is `index.mjs` to remain one module and the size
accepted?"*, and the architect answered it — **yes, taken, for readability** (`D-2`, *"already too long and
should be subdivided anyway for readability"*), superseding this map's *"does not order the separation"* (§5.1).
**The first half is OPEN, and `D-2` explicitly leaves it so:** the regions that exist are the ones the current
file implies, and nothing in the ruling blesses them as the cuts to take. Specifically open: **(a)** the
symbol-key block at `L88–L200`, where `FORGET_PAIR` and `KERNEL_REFUSAL` are written for `js-constraints` to
read while the block itself is declared under `js-registry-delivery`; **(b)** the failure form at `L618–L746`,
owned by `js-surface` but called from inside `js-crossing`'s encoders; **(c)** the 1,169-line `storeCreate` at
`L3425–L4593`, which both defines the fourteen members and constructs the instance state, so the surface and
the registry cannot be separated without a code change. **⟶ ANSWERED AT `D-2`'s DECLARATION, AND THE QUESTION KEEPS ITS WORDING SO A READER SEES WHAT WAS ASKED.** *"No cut is drawn here"* was the `D-1` revision's sentence; **`docs/L1/entry-subdivision.md` now draws it**, and it answers the three specific points this question raised: **(a)** the symbol-key block goes to **part 4** (`src/entry/state.mjs`, owned by `js-registry-delivery`) together with the attempt seam, and `js-resolution`'s overlapping claim on `L88–L331` is withdrawn (§2.3); **(b)** the failure form is **split** — `fail`/`refusalLog` to **part 2** (`src/entry/refusal.mjs`) and `withAddon`/`spellDottedContainer`/`boundaryReject` to **part 3** (`src/entry/artefact.mjs`), both under `js-resolution` — **on legibility, not on a cycle** (keeping the region whole closes none; declaration §3.2 case 1), while the *ownership* consequence follows hard: once the form is its own file it cannot be owned by `js-surface` without closing a module cycle (case 4) — and **one endpoint moves with it**; **(c)** `storeCreate` **stays whole** in `index.mjs` as part 1: the surface and the registry are not separated *inside* the member body, and the entry reaches the state part through `stateOf`/`installAttemptSeam`/`openCommit`/`closeCommit` instead. **A fourth finding the question did not have:** `homeAddressKey` (`L4780–L4796`) moves down from the delivery region to the state part, because the constraint glue's `addressSetKey` uses it and the alternative edge reads *the pass depends on the terminal arm*. **No pass is ordered by any of this** (`D-2` orders none) and the map's own figure stays 1 co-owned path until a wave lands.

**Q3 — batteries as modules, or tests owned by the module they drive?** This map declares four harness
modules (`store-battery`, `binding-battery`, `js-battery`, `greens-harness`) because each battery is a real,
discrete unit and because the alternative requires assigning 75 individual battery files to product modules
— and six of those are genuinely shared (`tests/support/mod.rs`, `bindings/js/tests/support/mod.rs`, and the
four `bindings/js/test/*-helpers.mjs` / `*-support.mjs` files, which are imported across subjects). Should a
test path be owned by the module whose behaviour it drives, with those six helper files listed as shared?

**Q4 — where do the build inputs belong: `build.rs`, the two `Cargo.toml` files, and one correctness choice
that lives inside a manifest?** This map gives `build.rs` to `binding-facade` (it exists for the facade's
symbols and emits the facade's version stamp) and both crate manifests to `delivery`. But the root
`Cargo.toml`'s `serde_json` `float_roundtrip` feature is declared there as *"NOT OPTIONAL AND NOT A
PERFORMANCE CHOICE — IT IS A CORRECTNESS ONE"*: without it a `file`-tier state holding `f64::MAX` writes bytes
the decoder cannot read back. Should that feature selection be owned by `store-value` and the manifest split,
or does a manifest's whole content belong to delivery?

**Q5 — are the kernel and the declaration peers or dependants?** **(a) is answered by `D-1`, and the question is
kept so a reader sees what was asked.** It read: *"`constraint-kernel.mjs` is declared here as a peer module
that `js-constraints` loads lazily, which matches the fact that it is a separate published file (`files` entry
four) with its own six exports and its own battery. Should it instead be owned by `js-constraints`…?"* — **yes,
and `D-1` is the ground:** the kernel is not an external import, so it is not a peer, and one integrated module
owns both paths (§1 row 13, §2.3). The question is **closed, not re-decided here**; what `D-1` leaves open is
the *physical* merge, which is an implementation pass's act and which the ruling does not order. **(b) is still
open.** `index.d.ts` is declared here as a peer (`js-declaration`) because it is hand-authored and shipped and
the brief lists it as its own layer. But it declares shapes no runtime member of the entry carries (`BaseState`,
`AttemptRef`, `CommitRecord`, `LogEntry`) and it is the surface the type check measures — should the
declaration be owned by `js-surface` as *the surface's own declaration*, or stay a peer so that a divergence
between the two is visible as an interaction rather than hidden inside one module?

**Q6 — is the constraint kernel to be subdivided as well?** **CLOSED BY `D-13` (*"Kernel can be cut"*), AND THE CUT IS
DRAWN.** The question is kept whole so a reader sees what was asked: the declared cut left
`bindings/js/src/constraint-kernel.mjs` at **2,203 lines** — larger than every part — and `D-2`'s ground reached it on
its face, while `docs/L1/entry-subdivision.md` §9 Q1 **declined to draw the cut** on the honest ground that the
candidate halves shared the foundations and the pair rows and that *"a cut drawn on this evidence would be a guess
dressed as a boundary."* **`D-13` made that measurement a precondition** (*"its cut must be declared against a
measurement of that file, not guessed from its length"*), **and `docs/L1/kernel-subdivision.md` takes it and draws
five parts.** Two things the answer carries that the question did not anticipate: **the measurement moves two of the
four candidate halves** (the pair machinery cannot travel with the registry without closing a two-part cycle, and the
repair's op reading cannot travel with the attempt engine without making `K-1` depend on `K-3`), and **the cut forces
the six exports' sites apart from their names** (§4 E6's correction).

**Q7 — where do the entry's parts live?** **ANSWERED TWICE, AND THE SECOND ANSWER IS THE ONE `D-13` LEFT OPEN.**
`D-13` (*"That works"*) confirms **`bindings/js/src/entry/`** as the parts' home, so the entry's eight parts ship inside
`src/` — and the ruling states the consequence this map inherits: *"with the parts under `src/`, a published tarball
must carry `src/entry/**`, which is the third time this branch has found the allowlist to be a consequence of the code
rather than a declaration."* **For the kernel's five parts, `D-13` left the question open by name** — *"the kernel is
not part of the entry's I/O surface, so 'the parts' home' answers the entry's question and not necessarily the
kernel's"* — and **`kernel-subdivision.md` §5 decides it: the same directory, with a `kernel-` prefix, the barrel left
at its own path.** The decisive evidence is not the kernel's nature but **`D-14`'s mechanism**: the sanctioned
staging rule is **one glob plus one explicit path**, and only a shared directory makes that pair stage a loadable tree
(the barrel, one directory up, is what the explicit path is *for*). **`src/entry/kernel/` with a recursive glob is the
arguable alternative and is refused on the ground that a recursive glob is a weaker "closed set by construction" than a
loud zero-match rule.**

---

## §7 · What was read off a file, and what was concluded

**Read at the bytes** (file + site named in the body): the seven `src/*.rs` paths and `src/lib.rs`'s re-export
list; `bindings/js/src/lib.rs`'s three-module declaration; the `Store` public method list and `storeCreate`'s
two entry points (`src/store.rs`); `facade.rs`'s thirteen **line-initial** `#[napi]` sites (§4 E2 says which
measurement that is); `crossing.rs`'s `Instance` methods
and its 45 public items; `codec.rs`'s `Codec` methods; `constraint-kernel.mjs`'s six `export` sites (L486,
L1008, L1158, L2063, L2075, L2111) — **read as exports of a file, not as a published export set, since `D-1`
rules a tightly integrated kernel publishes none**;
`index.d.ts`'s fourteen `StoreInstance` members and sixteen-plus-open `StoreStatus`; `index.mjs`'s single
export and its function-declaration line map, and — added by this revision — the `constraintsKernel()` call
sites and the `kernel.commit` / `kernel.runAttempt` calls at `L5720–L5729` (§4 E6);
`bindings/js/package.json`'s version, `files`, `exports`,
`engines` and five exact pins; the root `package.json`'s scripts and `private`; root `Cargo.toml`'s
`float_roundtrip` clause; both `.gitignore` files; the nine `docs/specs/**` paths and the section headings of
`storeroom-native/contract.md` and `storeroom-js/contract.md`; and, for the revision, all of
`strata/decisions.md`.

**Concluded, not read:** that the five `index.mjs` regions correspond to five coherent responsibilities
(the boundaries are the declaration sites, which I measured; the *coherence* is my judgement); that the
`contract.md §3.4`/`§0.4` boundary clauses and the bytes agree on the binding crate's three-module split (they
do as far as the split goes, but the *content* of `codec` was read only at its method list); that `delivery`'s
responsibility is one thing rather than two; and every count in this file's header — those counts remain a
disk measurement *by method*, and the aggregate denominator plus the three figures the measurement limit names
have since been reconciled to the tracked set by a supervisor-run shell pass, not by this one.

**Divergences verified at the bytes** — between the brief and the tree, or between an earlier reading in this
map and the tree — recorded so no reader inherits a stale figure:

1. **The kernel DOES ship — and `D-1` rules its allowlist row has no subject.** Brief §6 says *"The constraint
   kernel does not ship … `bindings/js/package.json`'s `files` still has three entries; `src/**` reaches no
   consumer today"*. The bytes read four entries — `index.mjs`, `README.md`, `index.d.ts`,
   `src/constraint-kernel.mjs` — and the corpus's own clause agrees (`greens.mjs:1211` quotes
   `distribution.md §2.1` item 6, *"the kernel's own module as the FOURTH entry"*). **The tree fact stands
   unchanged by this revision** (the manifest is not edited here); what `D-1` adds is that the fourth entry has
   no subject under an integrated kernel, so the *shipping* reading and the *ruling* are both carried and
   neither is used to erase the other (§4 E4, I-23).
2. **`index.mjs` is at the package root, not under `src/`.** The brief's §2 table and the task statement both
   list it as `bindings/js/src/index.mjs`; the tree has it at `bindings/js/index.mjs` (5,903 lines, confirmed
   at the file's own end-of-file marker) and `bindings/js/src/` holds no `index.mjs` at all.
3. **`bindings/js/src/lib.rs` describes five addon entries including `call`; `facade.rs` declares thirteen and
   no `call`** (§4 E2).
4. **The commit act is `Store::commit_file`, not `Instance::commit_file` as `storeroom-native/contract.md`
   §0.4's row spells it** — `src/store.rs:1343` declares it inside `impl Store`, and the crate re-exports
   `store::{storeCreate, storeCreateWithConstraints, Store}` with no `Instance` type.
5. **The store crate's manifest declares `license = "GPL-3.0-or-later"`** while the package and the brief
   carry `AGPL-3.0` / `AGPL-3.0-or-later` (`bindings/js/Cargo.toml`). Not an ownership question; recorded
   because ownership puts `delivery` in front of both files.
6. **`E6`'s old claim that the entry never invokes the kernel loop was wrong, and the brief was right.**
   `index.mjs` calls `constraintsKernel()` at `L3995`, `L4089`, `L4156`, `L5426`, `L5542`, `L5599` and runs
   `kernel.commit` / `kernel.runAttempt` at `L5723` / `L5729`. Recorded because the sentence this revision
   replaced asserted the opposite, and `D-1` does not depend on either reading (§4 E6).

**⟶ READ AT THE BYTES BY THE `D-2` REVISION, AND RECORDED HERE BECAUSE EACH ONE MOVED A FIGURE OR A BOUNDARY.**
The revision surveyed the two source files by structure — **148 top-level declaration sites in `index.mjs` and 62
in `constraint-kernel.mjs`**, each with its line number — found the region rules (26 in the entry, 22 in the kernel),
read thirteen boundary zones (`index.mjs` L1–110, L298–342, L548–760, L1830–1900, L1940–2010, L2960–3080,
L3380–3449, L4550–4609, L4762–4831, L4995–5114, L5140–5340, L5405–5524, L5834–5903; the kernel's L1–100, L168–197,
L374–423, L1000–1013), read `bindings/js/package.json` whole, and grepped the reach and consumer sets it needed.
**It did not read either file end to end and ran nothing.**

7. **`constraintsKernel()` has SEVEN call sites, not six** (§4 E6's correction): the six this map already printed
   plus **`L5720`**, at the head of `constraintWrite` — which is why the map's own §4 E6 and `strata/brief.md` §6
   were both short by one.
8. **The `js-resolution` region and two `js-registry-delivery` regions OVERLAP**: `L79–L617` contains `L88–L200`
   **and** `L201–L331`. Two modules claimed the same 244 bytes of the file. Recorded at §2.3 and removed by the
   declared cut (part 4).
9. **Four files carry the four-entry `files` array, at five sites** — `publish.test.mjs:2284` and `:2516`,
   `publish-generators.test.mjs:1273`, `constraints-publication.test.mjs:1199`, `greens.mjs:1205` — where `D-3`'s
   correction names **two asserted cells** (`P-PUB-7`, `JSG-12.18`). **Whether the other three are assertions or
   generator inputs is the test layer's to say**; this map records the population only, and records it because
   under the declared cut every one of those five sites sees a manifest whose rows change meaning
   (`docs/L1/entry-subdivision.md` §5).
10. **Twenty-one non-`scratch/` files REACH `bindings/js/src/constraint-kernel.mjs` in code** — 11 under
    `bindings/js/test/`, 9 under `bindings/js/greens/`, and `index.mjs:5227` — and **27 name it in all**, the other
    six mentioning it only in a comment (measured by grep, counted by file; ~90 further sites live under `scratch/`,
    which §5.4 puts outside ownership by convention). **This is the fact that decided the kernel's path does not
    move in the cut** (`docs/L1/entry-subdivision.md` §4.1).
11. **Five `Symbol.for` keys are declared on BOTH sides** — `index.mjs` `:108`, `:126`, `:139`, `:166`, `:183`,
    `:5840` and the kernel's `:97`, `:113`, `:135`, `:138`, `:148`, with a sixth spelled inline in the kernel at
    `:2192`. **That duplication is the declared mechanism** (`kernel-surface.md §1` item 1's empty import
    footprint), not an oversight, and the cut must not collapse it (§4 E6).
12. **`carriesConstraintAt` (`index.mjs:5688`) has no live call site** — grep for `carriesConstraintAt(` returns
    its declaration alone, while `:3579` records that the gate it named was removed when the entry→kernel edge
    became unconditional. It travels with the constraint part unchanged; its disposition is no decision of this
    map's.

**⟶ READ AT THE BYTES BY THE `D-13`/`D-14` REVISION, AND RECORDED HERE BECAUSE EACH ONE MOVED A FIGURE, A BOUNDARY OR
A CLAIM.** This revision surveyed the kernel by structure — its **62 top-level declaration sites** (48 functions of
which 6 are `export function`, and 14 top-level `const`/`let`), its **call graph** by grep for `name(` mapped to the
enclosing declaration, its **zero `import`/`require`** footprint (`^import` and `require(` both return nothing), and
its boundary zones — and read the four drives' **staging code and levers only**. **It ran nothing and moved nothing.**
The findings it adds:

13. **The kernel's cut is five parts, not the four the entry pass sketched.** The measurement moves two boundaries:
    the **pair machinery** cannot join the registry without a **two-part cycle** (the pass's `pairsAtAddress` and
    `commit`'s `attemptHeldAt` both read `sameAddress`, which the registry's row scan also reads), and the **repair's
    op reading** cannot join the attempt engine without making **`K-1` depend on `K-3`**. Both are recorded as
    **refused candidate cuts** in `kernel-subdivision.md` §3.2, which is the mirror of the entry declaration's own
    §3.2.
14. **`blind-constraints-v2.mjs:1251` pins the kernel's namespace to SIX names** (`commit,log,register,remove,report,
    runAttempt`) and is **red on this tree today**, `K-6` having landed. **⟶ BOTH OF THOSE CLAUSES ARE STALE AND
    ARE CORRECTED HERE, 2026-10-25 ON MEASUREMENT: the cell stands at `tests/e2e/blind-constraints-v2.mjs:1249` and
    it is GREEN, asserting SIX names** (`commit,log,register,remove,report,runAttempt`) — the battery's `D-20`
    execution pass re-derived it, and its own comment records the move. **The "red" this item carried was true of an
    earlier tree and has not been true since.**
15. **`held-listener-identity-greens.mjs:951` compares a SORTED key list against a SORTED declared one** — re-derived 2026-10-24, GREEN — so
    `HLI-13.1` is **false today for an ordering reason** — not because a seventh name exists, which is the half the
    barrel must keep true. **⟶ AND THIS ONE IS WITHDRAWN BY `D-15`, WHICH MEASURED IT: the cell is GREEN**, because
    the greens file declares its **own** `KERNEL_ITEMS` **sorted** at its own `:31` and that constant shadows the
    helper's unsorted one the pass attributed to it. **A fixer sent to "the ordering bug" would have edited a file
    with no bug** (`strata/decisions.md` `D-15`'s second corrected finding). **The half the barrel must keep true —
    "no seventh name is reachable" — is the half that was ever real.**
16. **The two shared helpers disagree about the kernel's extent:** `constraint-kernel-helpers.mjs:48` declares five
    names, `held-listener-identity-helpers.mjs:163` declares six.
17. **`publish`'s two fault-injection anchors land in TWO DIFFERENT ENTRY PARTS.** `MUTATION_SITE`
    (`publish.test.mjs:1795`) is `addonArm = { … mismatchArmMessage(candidate, name) }` at `index.mjs:481`, inside
    `loadAddon` (`:434`) — **part 3's region**; `FAIL_SITE` (`:1925`) is `throw { status: refusal.status, … }` at
    `index.mjs:623`, inside `fail` (`:618`) — **part 2's region**. **So the entry's cut forces `publish`'s anchors to
    re-point, and the drive's staging lever must widen from "the entry's bytes" to a per-file override**
    (`docs/L1/drive-restaging.md` §3.1.1). This is the fact that makes the cut and the four drives **one wave** on a
    third axis.
18. **`closeRegistrationAttempt` (`:953`) and `close` (`:1892`) are the same closer written twice** — same report
    shape, same `CLOSED.set`, same `LIVE.delete`. The kernel's cut **does not resolve it**, because unifying them would
    create the edge `kernel-registration → kernel-terminal` that its DAG does not have.
19. **The four drives' staging is one copy of `index.mjs` each and nothing else:**
    `publish.test.mjs:711`, `publish-generators.test.mjs:420` (through `entryText` `:377`), `version-stamp.test.mjs:656`
    and `negative-generators.test.mjs:1547` — verified by grep as the only staging sites of their kind in the battery,
    and each an `index.mjs`-only tree.

 The declaration carries its own list
(`docs/L1/entry-subdivision.md` §8); the four that bear on *ownership* rather than on code layout are: **a part
that cannot be read without a sibling's comments** (then two parts are one and the boundary is false); **any
part-boundary edge pointing upward in the declaration's §3.1 DAG** — a cycle, and the first symptom would be a
`ReferenceError` at import; **a battery cell that must change for a reason other than a path** (then the cut moved
more than lines, and the stratification's own reaches are the evidence); and **an installed tarball from the packed
battery that fails on a missing part** — which would mean the `files` consequence was declared right and landed
wrong, and is exactly the falsifier `D-10`/`D-12` built that battery for.

**The kernel's cut carries its own list too (`docs/L1/kernel-subdivision.md` §8), and its one ownership-shaped
falsifier is worth stating here because it is the whole of this map's exposure: a kernel part that turns out to be an
I/O surface some other module reaches, or an edge that points UP into `kernel-foundations`.** Either would make the
part a boundary, and a boundary moves **19 modules / 61 endpoints** — the two figures this revision declares unmoved.
**The one place it could happen is the barrel**: if the six names stop being a re-export and become a seventh surface,
the six dissolved endpoints of `D-1` come back.

**Not verified:** the tracked status of this map's owned entries **path by path** — a supervisor-run shell
pass settled the aggregate (603 tracked, 477 of them under `scratch/`, 126 outside it), the `#[napi]` figure
and the two root lock files, but it did not walk §2's ownership table line by line; **whether
`strata/decisions.md` is tracked, which this revision could not check** (it had no shell either), so whether the
tracked denominator is now 127 rather than 126 is owed a check and FIGURES keeps the 126 as measured; **the target
denominator** (FIGURES: `133` for the entry cut and `138` for both cuts, arithmetic owed a `git ls-files` check after
the wave); **the completeness of either part DAG** — their edges were found by grep for named calls, so an aliased,
destructured, computed or `Reflect.apply`-reached call across a part boundary would be invisible to it, and the
kernel's DAG is unusually exposed to that class because the kernel reaches the store through method calls on a handed
object; **the kernel cut's line arithmetic** (2,195 assigned + 8 blank separators = 2,203, owed a `wc -l`-class check);
**whether `src/entry/` stays a closed set of `.mjs` parts**, which is the glob's premise and a convention nothing
enforces; **whether `kernel-surface.md §1` item 1 forbids five relative imports among the kernel's own parts**
(`kernel-subdivision.md` §4.4 — a contract reading no role here owns); and
the three items above that were already open: whether the five platform package names resolve on any registry
(`LIVE / INSTALL` is OPEN, brief §6), the A112 ordering gate's state (the brief carries it as RED; this map takes
no position), and the tier-eviction reading, which the brief itself declines to settle.
