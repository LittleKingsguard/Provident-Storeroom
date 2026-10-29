# L1 drive re-staging — the four drives, `D-14`'s glob and the explicit kernel path

**WHAT THIS FILE IS.** The declaration of **how the four drives re-stage their scratch trees** once the entry and the
constraint kernel are subdivided — the mechanism `strata/decisions.md` **`D-14`** fixes as *"the GLOB of the parts
directory, paired with an EXPLICIT KERNEL PATH"* — and, **for each of the four drives separately**, what the glob's
form means, what the explicit path names against the cut declared in **`docs/L1/kernel-subdivision.md`**, what the
drive's claim becomes now that **the entry-only-tree claim is withdrawn**, and how `publish`'s fault injection stays
orthogonal to a shape fault.

**THE FOUR DRIVES, NAMED BY THEIR OWN STAGING CODE, MEASURED ON THIS BRANCH.** `bindings/js/test/publish.test.mjs`
(`makeScratch` `:704`, the copy at `:711`), `bindings/js/test/publish-generators.test.mjs` (`makeScratch` `:415`, the
lever's reader `entryText` `:377`), `bindings/js/test/version-stamp.test.mjs` (`makeEnv` `:653`, the copy at `:656`)
and `bindings/js/test/negative-generators.test.mjs` (the copy arm `:1536`–`:1572`, the copy at `:1547`). **Those are
the only four staging sites of their kind in the battery** — a grep for `makeScratch`/`makeEnv` and for a literal copy
of `index.mjs` returns these files and no others.

**⟶ AND THE FOUR PATHS IN THE PARAGRAPH ABOVE ARE SUPERSEDED, MEASURED 2026-10-25: THE DRIVES STAND AT THE PRESET'S

**⟶ AND THE FOUR DRIVES' STAGING SITES ARE RE-MEASURED AN EIGHTH TIME AT THIS TREE, 2026-10-29 — THE ELEVEN COMMITS PAST `v1.5.0` (`git describe`: `v1.5.0-11-g8f5454f`), WHICH IS THE `1.6.0` PREPARATION, AND THIS TIME SIX OF THEM MOVE.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed, and the ones that moved are named with both readings.** **THE FOUR DRIVES STILL STAND AT THE PRESET'S SCOPE UNDER `tests/e2e/`, AND EACH IS RE-READ THIS DATE: `tests/e2e/staged-install/publish.test.mjs` (`makeScratch` `:783`) · `tests/e2e/staged-install/publish-generators.test.mjs` · `tests/e2e/staged-install/version-stamp.test.mjs` (`makeEnv`) · `tests/e2e/negative-generators.test.mjs`** — **a `makeScratch`/`makeEnv` grep over `tests/e2e/` returns exactly these four files and no others, so the count of FOUR DRIVES is UNMOVED ✓**; **and `D-14`'s glob-plus-explicit-kernel-path shape is untouched by this release, which changes no staging site at all.** (`D-14`; `D-76`; the four files named, grepped this date.)
SCOPE UNDER `tests/e2e/`, AND THEIR STAGING CODE IS A CALL TO `stageModuleTree` RATHER THAN A LITERAL COPY OF
`index.mjs`.** Present paths and present sites: **`tests/e2e/staged-install/publish.test.mjs`** (`makeScratch` `:774`,
the staging call `:776`); **`tests/e2e/staged-install/publish-generators.test.mjs`** (`makeScratch` `:438`, the staging
call `:443` — the lever's reader is `stagedOverrides`, and the name `entryText` that stood in this paragraph is **not a
name in the tree** any more); **`tests/e2e/staged-install/version-stamp.test.mjs`** (`makeEnv` `:654`, the staging call
`:664`); and **`tests/e2e/negative-generators.test.mjs`** (the copy arm `:1537`–`:1584`, the staging call `:1559`, the
`package.json` copy at `:1560`). **The fourth is not under `staged-install/`, and is named where it stands rather than
moved for the look of it.** The pre-move addresses this paragraph prints — `:704`/`:711`, `:415`/`:377`, `:653`/`:656`,
`:1536`–`:1572`/`:1547` — were `bindings/js/test/` addresses and are kept here beside their correction. **A
`makeScratch`/`makeEnv` grep over `tests/e2e/` still returns exactly these four files, so the count of FOUR DRIVES is
unmoved**; the thirteen an earlier pass corrected (§1) is the TARGET SET's file count under `bindings/js/src/entry/`,
a different list. **AND THE SAME IS TRUE OF THE ADDRESSES §3 PRINTS: every `:nnn` in §3.1.1, §3.2, §3.3 and §3.4 is a
`bindings/js/test/` address, and the measured present equivalents for the four staging sites are the ones given
above** — including the quoted clause, which stands at **`tests/e2e/staged-install/version-stamp.test.mjs:1466`** where
§3.3 and §3.4 print `:1457`–`:1458`. **The addresses for the four staging sites are measured; the remaining `:nnn`
inside §3 are not re-measured by this pass and are read as pre-move.**

**THIS PASS MOVES NO CODE, EDITS NO TEST, WRITES NO FIXTURE, STARTS NO L2, AND COMMITS NOTHING.** `D-14` orders no
code move (*"It orders no code move. The cut and these four drives land as one wave … and no wave is opened by this
ruling"*). Every edit below is declared against a file that exists today, because these four drives are
`bindings/js/test/` paths — present-state paths **no strata role may write** (`D-5`, `D-9`): the edits land with the
migration wave, in the batteries' new home, and each present-state path appears below only to identify the site.
**⟶ AND THAT WAVE HAS LANDED, 2026-10-25: the four drives are at `tests/e2e/` — `D-5`'s preset scope, which a strata
test role MAY write — so the freeze this paragraph records is a past state of the declaration and the paths below are
present-state paths in the ordinary sense.**

**WHAT THIS FILE SUPERSEDES.** `docs/L1/entry-subdivision.md` §4.2's table is the **consequence** this file declares
the **mechanism** for; its row for `negative-generators` — *"the copy must carry the parts, or the subject is
unreachable"* — is right and is detailed here. `docs/L1/module-map.md` I-26's closing clause (*"the four drives … must
stage the part set"*) is a pointer to this file. **And one sentence in the tree itself is superseded as a premise and
kept as a claim** — `version-stamp.test.mjs:1457`–`:1458` (§3.3).

---

## §1 · The one wave, and its file set by path

**`D-14` established the ordering fact and this section records it, because it is the fact that makes the cut and the
drives one unit of work rather than two:** *"The cut and these four drives land as one wave"*, and **either order
breaks the suite.** Both directions are checkable and both are red:

- **The cut first, the drives second.** The moment the entry statically imports its parts, a tree carrying
  `index.mjs` alone **cannot be constructed as a module graph at all** — a static relative import is resolved before
  any statement runs, before the artefact ladder, before anything. **Every cell in all four drives fails at import**,
  which is the wrong subject for every one of them: `publish`'s ~62 cells, `publish-generators`' `NG-PUB-A`…`J`,
  `version-stamp`'s `P-PUB-9`/`P-PUB-10` cells and `negative-generators`' `NG-JS-H`.
- **The drives first, the cut second.** A drive told to stage `bindings/js/src/entry/*.mjs` from a tree where that
  directory does not exist stages **nothing**, and the zero-match rule (§2.2) makes that a **loud** failure at the
  staging call. If it were not loud, the drive would stage a tree that cannot load and report the failure two layers
  down, in the wrong vocabulary — the failure mode §5 exists to prevent.

**And there is a third coupling inside the same wave, measured, which is why the wave's file set is larger than "the
kernel plus four drives":** **`publish`'s two fault-injection controls are cut at literal sites in `index.mjs`'s own
bytes, and both sites move when the entry is cut** — `MUTATION_SITE` (`publish.test.mjs:1795`) is
`addonArm = { … mismatchArmMessage(candidate, name) }` at `index.mjs:481`, inside **`loadAddon`** (declared `:434`),
which is part 3's region `L301–L564`; and `FAIL_SITE` (`publish.test.mjs:1925`) is
`throw { status: refusal.status, message: refusal.message, log: refusalLog(log) };` at `index.mjs:623`, inside
**`fail`** (declared `:618`), which is part 2's region `L565–L645`. **So the two anchors of one cell land in two
different files, neither of them the kernel's** (`docs/L1/entry-subdivision.md` §1 parts 2 and 3). A wave that
re-stages the tree but leaves the anchors pointed at `index.mjs` fails at the anchors' own precondition
(`publish.test.mjs:1892`, `:1926`), which is loud but at the wrong subject.

**THE WAVE'S FILE SET, BY PATH.**

**Source — created (13 new files):**

- `bindings/js/src/entry/refusal.mjs`, `artefact.mjs`, `state.mjs`, `class-decision.mjs`, `carrier.mjs`, `frame.mjs`,
  `delivery.mjs`, `constraints.mjs` — the entry's eight parts (`docs/L1/entry-subdivision.md` §1 parts 2–8, part 6
  taken as two under `D-33`).
- `bindings/js/src/entry/kernel-foundations.mjs`, `kernel-registration.mjs`, `kernel-commit.mjs`, `kernel-attempt.mjs`,
  `kernel-terminal.mjs` — the kernel's five parts (`docs/L1/kernel-subdivision.md` §1 parts 9a–9e).

**⟶ THE TARGET SET THIS FILE WAS DECLARED AGAINST IS SUPERSEDED AND IS READ THROUGH HERE, 2026-10-25 (`D-33`,
`strata/decisions.md`, 2026-10-24):** entry part 6 (`the walk`, 1,337 lines) **splits at `L2799` into `927 + 410`** —
`carrier.mjs` and `frame.mjs` — **so the target set is THIRTEEN paths (8 entry + 5 kernel), plus the barrel by explicit
path, and no longer twelve.** `D-33`'s own words: *"the entry becomes NINE parts and the subdivision's target set
becomes thirteen paths plus the barrel, not twelve."* **`D-14`'s enumeration is restated accordingly and the four
drives are re-staged against thirteen**; the `twelve`/`12`/`14` figures standing elsewhere in this file are the
superseded reading **and are corrected in place beside this clause**, so the arithmetic below stays checkable rather
than silently short by one.

**Source — changed in place (2):**

- `bindings/js/index.mjs` — keeps its path and its one export; becomes part 1.
- `bindings/js/src/constraint-kernel.mjs` — keeps its path; its 2,203 lines leave it and it becomes the six-name
  barrel (`kernel-subdivision.md` §4).

**The four drives — changed in place (4), at their PRESENT paths** (⟶ CORRECTED 2026-10-25: this list read
`bindings/js/test/publish.test.mjs`, `bindings/js/test/publish-generators.test.mjs`,
`bindings/js/test/version-stamp.test.mjs` and `bindings/js/test/negative-generators.test.mjs`; the first three are
under `tests/e2e/staged-install/` now and the fourth stands directly under `tests/e2e/`, which is `D-5`'s preset
scope and not a `staged-install/` one):

- `tests/e2e/staged-install/publish.test.mjs`
- `tests/e2e/staged-install/publish-generators.test.mjs`
- `tests/e2e/staged-install/version-stamp.test.mjs`
- `tests/e2e/negative-generators.test.mjs`

**Consequences the wave owes and this file does not own (declared, not decided):** `bindings/js/package.json`'s `files`
allowlist is `delivery`'s (`kernel-subdivision.md` §6: reachability puts **16 rows** in it, arithmetic, not a measured
publish); `P-PUB-7` (`publish.test.mjs:2284`, `:2516`) and `JSG-12.18` (`greens.mjs:1205`) are the two cells that
assert the retired four-entry equality and are owed their edits by their owners (`D-3`'s correction); and the anchors'
re-point is `js-battery`'s, inside the file set above.

**The wave therefore spans four owners, and that is the honest statement of its size:** `js-surface`,
`js-resolution`, `js-crossing`, `js-registry-delivery` and `js-constraints` (the source); `js-battery` (the four drives,
the two anchors); `greens-harness` (one of the two cells); `delivery` (the manifest rows).

---

## §2 · The mechanism — one glob, one explicit path, one closure check

### §2.1 The glob's exact form

**The directory:** `bindings/js/src/entry/` — **one directory, no recursion**, extension **`.mjs`** only. Evaluated as
`readdirSync(join(PKG_DIR, 'src', 'entry'))`, filtered on the `.mjs` suffix, **sorted** so that two staging calls in
one process produce the same order, and each hit asserted to be a regular file. **Thirteen matches after the wave**:
the eight entry parts and the five kernel parts (`D-33`; §1's clause — twelve was the pre-split count).

**Why non-recursive, and why one directory.** `D-14`'s ground for choosing a glob at all is that *"`src/entry/` is a
**closed set by construction**, so a glob is stable"* — and a closed set by construction is exactly what a
**non-recursive** glob of **one** directory is. A recursive glob (`src/entry/**/*.mjs`) would also match anything a
later pass put in a subdirectory, which is a silently larger tree rather than a closed one. **`bindings/js/src/`'s own
top level is not globbed**: it holds the addon crate's Rust (`lib.rs`, `crossing.rs`, `codec.rs`, `facade.rs`,
`build.rs`) and **exactly one `.mjs` — the kernel's barrel — both before and after the wave**, so a glob there would
stage a directory whose `.mjs` membership says nothing about the entry's family.

**Why the kernel's parts are inside it, and what that makes the explicit path do.** The kernel's five parts live under
`src/entry/` with a `kernel-` prefix (`kernel-subdivision.md` §5), so **the glob covers them**, and the **explicit
kernel path is load-bearing for the barrel** — `bindings/js/src/constraint-kernel.mjs` sits one directory **up**, is
matched by no glob, and would otherwise be staged by nothing. **That is `D-14`'s pairing exactly**: *"the kernel's path
is named explicitly because a glob cannot express it."* Had the kernel's parts been placed in a directory of their own,
the explicit path would have had to carry five more files, which no single path can do.

### §2.2 What a zero match does — loud, and named

**A zero match is a thrown failure in the parent process, before any child is spawned, and its message names the
directory it globbed.** `D-14`: *"an empty match must be a **loud** failure, not a silently smaller tree."* The
declaration is stronger than a non-empty check, in three steps, because a *degraded* match (twelve of thirteen) is as
dangerous as an empty one and much quieter:

1. **Zero match throws**, naming the absolute directory and the rule (`src/entry/*.mjs`).
2. **Every match is asserted to be a regular file and to be non-empty**, because a zero-length part loads as a module
   with no exports and fails at a `ReferenceError` two layers down.
3. **A CLOSURE CHECK runs over the staged bytes**: every relative specifier the staged files actually carry
   (`./x.mjs`, `../src/constraint-kernel.mjs`, `./entry/kernel-*.mjs`, …) is extracted from the bytes and required to
   resolve to a path **in the staged set**. A missing target throws naming **the importing file and the missing
   target**. **This is the step that makes the drive's own tree a subject rather than an assumption**, and it is what
   turns a degraded match into a named missing file instead of a child-process failure — the whole of §5's
   orthogonality rests on it.

### §2.3 The staged tree, with its arithmetic

Every one of the four trees becomes the same 15-file `.mjs` set plus the drive's own fixtures:

| what | how it is staged | count |
|---|---|---|
| the entry | **written by the drive** — the shipped bytes, or the drive's mutant (§3.1, §3.2) | 1 |
| the parts | **the glob** of `src/entry/*.mjs` | 13 |
| the barrel | **the explicit path** `src/constraint-kernel.mjs` | 1 |
| the drive's own fixtures | `package.json` (with `exports`), `preload.cjs`, `driver.mjs`, the platform artefact stub / rung-two candidate | per drive, unchanged |

**1 + 13 + 1 = 15 `.mjs` files**, and the barrel stands on the entry's **load path** — the entry's constraint glue
imports it as a namespace (`entry-subdivision.md` §4.2). Nothing of the repository is written, renamed or removed: each
drive stages under the OS temporary area and sweeps on exit, exactly as it does today
(`publish.test.mjs:404`–`:405`, `publish-generators.test.mjs:190`–`:192`, `version-stamp.test.mjs:574`–`:575`,
`negative-generators.test.mjs:1541` and its `finally` sweep).

---

## §3 · The four drives, one at a time

### §3.1 `publish.test.mjs` — the 62-cell red set, and the only drive with a fault lever

**What it stages today** (`:704`–`:741`): one `SCRATCH_ROOT` per file (`:404`), one `mkdtemp` tree per cell (`:705`), a
**byte copy of `index.mjs` alone** (`:711`, `entrySource ?? readFileSync(join(PKG_DIR, 'index.mjs'))`), the tree's own
`package.json` carrying `exports` (`:712`–`:715`), `preload.cjs` (`:716`), `driver.mjs` (`:717`), the fake platform
artefact under `node_modules/<name>` (`:721`), a rung-two candidate or decoy (`:723`–`:739`), and every drive an
`execFileSync` subprocess with `cwd` = the tree and `NODE_PATH` = its `node_modules` (`:744`–`:763`). **The driver
imports the entry BY PATH INSIDE THE TREE** (`await import(process.argv[2])`, `:466`).

**Re-staged:** the tree gains the glob's thirteen parts and the barrel (§2.3). The entry copy at `:711` stays a byte
write, because it is the **lever's** site (§3.1.1).

**Its claim becomes:** *"a tree carrying the entry **and everything the entry requires** loads, runs the three ordered
rungs, and answers the absent-addon and wrong-version arms"* — the first clause is the only one that changes, and it
changes from an **unstated precondition** into a **parent-side assertion**. The drive never asserted "the tree loads";
it relied on it. **`D-14` withdraws that reliance** (*"the claim that a tree carrying the entry by itself still loads
retires with `D-1`'s lazy seam — it is not repaired, it is withdrawn"*), and the replacement is not a new cell: it is
the staging-time closure check (§2.2), which fails in the vocabulary of files rather than of arms.

#### §3.1.1 `publish`'s fault injection, and how it stays orthogonal to a shape fault

**What the injection is, measured.** The drive reads the **shipped entry's source text**
(`readFileSync(join(PKG_DIR, 'index.mjs'), 'utf8')`, `:1891`), anchors on two literal sites — `MUTATION_SITE` (`:1795`,
the mismatch arm) and `FAIL_SITE` (`:1925`, the one arm-building `throw`) — cuts two mutants with `.replace()`
(`joinedEntry` `:1898`, `secondShapeEntry` `:1927`), asserts each mutant really differs from the shipped bytes
(`:1900`, `:1929`), and stages each through the `entrySource` lever (`:704`, `:711`, called from `thirdConditionEnv`
`:1798`) so that **the same instrument** — the cell's own assertions, not a copy of them (`:1803`–`:1807`) — **must
FAIL** on the mutant (`:1904`) and PASS on the shipped entry. Its subjects are the absent-addon arm and the
wrong-version arm (`:1782`–`:1791`).

**A shape fault and an injected fault must not be readable as one another, and today they could be:** both arrive in
the child as `report.ok === false` beside a `report.error` member, and the drive's own comments record exactly this
class of mis-attribution once already (`publish.test.mjs:521`–`:528`: *"the observer's own re-require failure … a cell
… then read `undefined` against `1` and reported a version failure at the wrong site"*). **Four rules make them
distinct, and the first is the one that carries the weight:**

1. **A shape fault cannot reach the child.** The parent throws at staging (§2.2 steps 1–3) — zero match, an empty
   file, or an unstaged specifier — **before `execFileSync` is called**. The mutant, by contrast, is staged,
   closure-checked and loadable **by construction**: it is the shipped entry's own bytes with two literal strings
   replaced, so it is a *behavioural* fault inside a well-formed tree. **The two faults therefore never share a
   process.**
2. **The anchors' precondition stays a parent-side assertion, and it moves with the sites.** `assert.ok(shippedEntry
   .includes(MUTATION_SITE))` (`:1892`) and the same for `FAIL_SITE` (`:1926`) must read **the file that carries the
   anchor** after the cut — `src/entry/artefact.mjs` for the mismatch arm (`index.mjs:481`) and
   `src/entry/refusal.mjs` for the throw (`index.mjs:623`) — and the mutant must be staged **as that part**, not as
   `index.mjs`. **So `entrySource` becomes a per-file override** (`{ relativePath → bytes }`, defaulting to the shipped
   bytes for every path), and the lever's default is the whole staged set rather than one file.
3. **The declared form is asserted before anything else is read.** The instrument's first reading is
   `recordArm(err)`'s verdict (`:444`–`:459`), which distinguishes *the declared arm* from *an absorbed state* by the
   arm's own declared member set, and `report.error` is assigned only for what is **not** the arm (`:486`–`:500`).
   The wave adds one assertion inside `drive()`: **a report whose `error` names a module-resolution failure
   (`ERR_MODULE_NOT_FOUND`, `Cannot find module`) is refused by name**, so a shape fault that somehow reached the child
   can never be counted as an absorbed state — and therefore never as the mutant's verdict.
4. **The controls keep their positive direction.** Each control asserts that the instrument **fails** and that the
   verdict **names** what it caught (`:1904`–`:1907`). An injected fault is therefore always a *measured* success of
   the control, while a staging fault is always an *exception* before the control runs. **The two are different
   outcomes of different functions, not two readings of one.**

### §3.2 `publish-generators.test.mjs` — the same tree, and a lever with one more dimension

**What it stages today** (`:415`–`:449`): the same `SCRATCH_ROOT`/`mkdtemp` idiom, a **staged entry written through
the lever's reader** (`writeFileSync(join(dir, 'index.mjs'), entryText(entrySource))`, `:420`), the tree's manifest
with `exports` (`:424`–`:427`), a preload built from a body (`:428`), a driver plus a tail (`:429`), and a fake
artefact with three rung-two variants (`:432`–`:447`); drives are subprocesses (`:452`–`:469`, and `driveRaw`
`:480`–`:516` for the generators allowed to die). **The lever has three shapes, and they are told apart by construction
rather than by a guess** (`:364`–`:388`): `null` = the shipped entry's bytes; a **control record**
`{controlPath, controlSource}` = a staged control whose file is asserted to **be** those bytes (`:380`); a bare string
= a drive's own source text. The controls are staged outside the repository under `CONTROL_ROOT` (`:190`), and every
control's tree is recorded so a control can be attributed to the drive that ran it (`:391`–`:397`).
**It spells no package name of its own**, so it has nothing to re-spell (stratification §2.6.1).

**Re-staged:** the tree gains the glob's thirteen parts and the barrel (§2.3). **The lever gains one dimension** — which
**file** the bytes are staged as — because its controls are cut by `.replace()` on the shipped entry text exactly as
`publish`'s are (`:652`, `:746`, `:795`, `:846`, `:889`, `:944`, `:972`, `:997`, `:1053` are nine control cuts), and
after the entry's cut each cut's anchor lives in the part that carries it. **The F-14 repair's assertion carries over
unchanged and is the reason this drive needs no new orthogonality rule:** `entryText`'s byte-equality check (`:380`)
already refuses to measure a control against a copy, a path or a stale image of itself — the wave must only re-point
**which** file it reads, keeping the same two-member record shape.

**Its claim becomes:** *"a tree carrying the entry and everything it requires drives `NG-PUB-A`…`J`, and each control's
mutated bytes reach a drive and walk"* — again the tree clause alone changes, and the controls' own audit
(`withControls`, `:399`–`:413`) is what already keeps a control from being counted as evidence for a drive it did not
stage.

### §3.3 `version-stamp.test.mjs` — the stamp's homes, and the one sentence the withdrawal touches

**What it stages today** (`:653`–`:684`): one `SCRATCH_ROOT` (`:574`), a per-cell `mkdtemp`, a tree manifest
(`:655`), **a byte copy of `index.mjs` alone** (`:656`), the driver **beside the entry** — load-bearing, because
`require(<rung-one name>)` resolves through Node's module paths relative to the *requiring file* (`:657`–`:662`) — and
`node_modules/<the host's platform name>/` carrying a candidate `index.js` (`:666`–`:682`). Its subjects are the
stamp's homes and the pre-publish guard (`P-PUB-9`/`P-PUB-10`).

**Re-staged:** the tree gains the glob's thirteen parts and the barrel (§2.3), staged **beside the entry**, so the
`require` resolution the comment at `:657` protects is untouched: the parts are relative imports from the entry's own
directory and the driver's `require` is still the file-relative one it is today.

**Its claim becomes — and this is the sentence `D-14`'s withdrawal touches, read at its bytes.**
`version-stamp.test.mjs:1457`–`:1458` quotes the contract: *"THE MAIN PACKAGE'S HALF IS NOT A SECOND GUARD STEP: the
main package ships `index.mjs` and no `.node` at all, so the five leg-subjects are the whole guard set"*
(`release.md §1.4a` item `6`). **The cut falsifies the first half of the quoted clause's subject and leaves its ground
intact:**

- **"ships `index.mjs`"** — after the wave the main package ships `index.mjs`, **eight entry parts, five kernel parts
  and the barrel**, and no `.node` (`kernel-subdivision.md` §6: 16 allowlist rows by reachability). **The clause is
  contract text and stands as text, read through `D-13`/`D-14` on this project's own ANNOTATE-BESIDE convention
  (`D-3`'s precedent) — no role in this workflow amends it.**
- **"and no `.node` at all"** — **unchanged, and it is the half the cell's claim rests on.** The guard set is the five
  platform legs because the main package carries no addon; the cut moves no `.node` into any tarball, and the
  prohibitions (`P-PUB-7`, `JSG-12.18`) that keep one out are untouched by it.
- **So the cell's assertions are unmoved** — one guard step, named by its three tokens, positioned between the
  assembly and the first publish site, inside the matrix job that declares the five labels, with no ordinal selector
  (`:1416`–`:1473`) — and **what is owed is the quoted sentence's restatement as a *reading*, not a re-derived cell.**
  A pass that re-writes the assertion instead has edited a cell for a reason other than a path, which is the entry
  pass's own falsifier (`entry-subdivision.md` §8).
- **And the drive has no entry-only claim to withdraw anywhere else:** its cells read the workflow file, the manifest
  and the artefact's own stamp, and none of the ones read here asserts that the staged tree is one file. **The copy at
  `:656` is a *fixture*, not a subject.** *(Concluded, not measured, for the cells whose bodies this pass did not read:
  §5's third and fifth "concluded" items are the limit, and the falsifier is named there.)*

### §3.4 `negative-generators.test.mjs` — the copy arm, the bare specifier, and the trap

**What it stages today** (`:1536`–`:1572`): a scratch directory under the OS temporary area, a
**`build/Release` created and left empty** (`:1546`), **a copy of `index.mjs`** (`:1547`) and **a copy of
`package.json`** (`:1548`), and a driver written as source text whose **first line is a bare specifier**
(`import { storeCreate } from 'provident-storeroom';`, `:1550`), run as a subprocess with `cwd` = the scratch
directory (`:1572`). **A bare specifier resolved from a file under the copy resolves to the copy through the copy's
own `package.json`**, so the absent-addon state is measured at the copy's own entry and never at the repository's.

**Re-staged:** the copy gains the glob's thirteen parts and the barrel (§2.3), copied to the same relative layout
(`src/entry/*.mjs` and `src/constraint-kernel.mjs`), so the copy's entry loads exactly as the repository's does.

**Its claim becomes:** *"a copy of the package — **whose own entry, parts and barrel are the copy's** — resolves a bare
specifier from under itself and answers the declared absent-addon refusal"*. **And the embedded specifier at `:1550`
must stay a bare specifier** (`test-stratification.md` §2.6.1 call 3, §`respelling.second_respelling_embedded_sources`):
**there the name is the assertion** — a path there would bypass the copy's `package.json`, the absent arm would be
measured at the repository's own resolution, and the cell would prove nothing. **A mechanical re-spelling sweep that
converts it is the one edit that destroys this drive, and the stratification declares it in as many words.**

#### §3.4.1 Why `negative-generators` is the trap, and what makes its failure self-identifying

**The subject's vocabulary is a plain object's member set.** The child prints one JSON line; the parent parses the
last line (`:1573`) and asserts that the throw's key set is **exactly** `['log','message','status']` (`:1586`), that
`keyCount` is `3` (`:1589`), that `log` is present, an array and empty (`:1591`–`:1599`), that the prototype is the
caller realm's `Object.prototype` (`:1600`), that it is not an `Error` (`:1601`), and that its `status` is
`FilePathUnreachable` and a member of the closed set (`:1602`–`:1603`). **Every one of those assertions reads a refusal
object the child produced — so if the fixture is stale, whatever the child produces instead lands in a *shape*
assertion.**

**The trap, stated exactly.** A stale fixture — a copy that carries `index.mjs` and `package.json` and **not** the part
set — does not produce a refusal at all: the child's static `import` fails while the module graph is being constructed,
the child writes **no** report line, and the parent's `JSON.parse(out.trim()…pop())` throws on an empty string. **That
outcome is loud but wrong-vocabulary**: its message names neither the tree nor the missing file, and a reader — or a
later pass — sees *"the refusal form changed"* rather than *"the copy was not staged"*. And a **partial** staleness is
worse: a copy that loads far enough to throw something else would put an `Error` or a module-resolution object into
the exact assertions that exist to distinguish a refusal from an absorbed state, so **a shape fault and the cell's
subject would be read as one another** — the same class the publish drive records at `:521`–`:528`.

**What makes it self-identifying — four rules, and the first two are what turn the trap into a diagnosis:**

1. **The copy's closure is asserted in the parent, before the child runs** (§2.2): the staged set is enumerated, every
   file is asserted non-empty, and every relative specifier in the copied bytes must resolve inside the copy. **The
   failure is then a named missing file and a named importer, in the staging call, not a parse error at the assertion.**
2. **The child's `stderr` is carried into every assertion message** (`:1572`'s `execFileSync` captures it today; the
   wave must surface it), because Node's module-resolution failure names the file it could not find — which is the fact
   a reader needs and which the empty-stdout path currently discards.
3. **"The child reached the entry" is asserted as its own precondition, before the shape census.** The driver must
   report a member only a **loaded** module can produce — the natural one is that the import succeeded at all, which
   makes `keys` non-null by construction (`:1556`) rather than null — and the cell must assert **that** first. **A
   shape fault can then never be read as a changed form, because a child that did not load fails the precondition in
   its own words.**
4. **The name stays a name** (`:1550`), so the one thing this arm measures — resolution *through the copy's own
   `package.json`* — cannot be satisfied by a path.

---

## §4 · The four claims, side by side

| drive | the claim withdrawn (`D-14`) | the claim it carries after the wave | the one clause that changes |
|---|---|---|---|
| `publish` | *a tree carrying `index.mjs` alone loads and reaches the rungs* | *a tree carrying the entry **and everything it requires** loads, runs the three rungs, and answers the absent-addon and wrong-version arms — and each of the two injected faults fails the instrument* | the tree's completeness: an assertion at staging, not a hope |
| `publish-generators` | same | *the same tree drives `NG-PUB-A`…`J`, and each control's mutated bytes reach a drive and walk* | same, plus **which part file** a control's bytes are staged as |
| `version-stamp` | same, and **written down** at `:1457`–`:1458` | *the main package ships no `.node` at all, so the five leg-subjects are the whole guard set; after `D-13` it ships `index.mjs`, its thirteen part files and the barrel* | the quoted clause's `index.mjs` half is restated **as a reading**; its `.node`-free half is untouched, and **the cell's assertions do not move** |
| `negative-generators` | same, and it is the copy arm's whole premise | *a copy whose own entry, parts and barrel are the copy's resolves a bare specifier from under itself and answers the declared absent-addon refusal* | the copy's contents; **the embedded specifier stays a bare name** (`:1550`) |

---

## §5 · Measured, concluded, and not verified

**Read at the bytes** — the four drives' **staging code and their levers, not their cell bodies**:
`publish.test.mjs` `:26`, `:404`–`:405`, `:407`–`:543` (the driver and its `recordArm`), `:466`, `:486`–`:500`,
`:521`–`:528`, `:545`–`:554` (the preload), `:695`–`:741` (`makeScratch`), `:744`–`:764` (`drive`), `:767`–`:775`
(`coveredEnv`), `:1780`–`:1930` (the fault-injection block, both anchors and both mutants);
`publish-generators.test.mjs` `:190`–`:192`, `:330`–`:397` (the artefact tail, `isControlLever`, `entryText`,
`CONTROL_DIRS`), `:399`–`:449` (`makeScratch`), `:452`–`:516` (`drive`, `driveRaw`), `:518`–`:525` (`coveredEnv`),
`:544`–`:552` (`controlEntry`) and the nine control cuts at `:652`, `:746`, `:795`, `:846`, `:889`, `:944`, `:972`,
`:997`, `:1053`; `version-stamp.test.mjs` `:565`–`:575`, `:577`–`:588` (the preload), `:590`–`:645` (the driver),
`:647`–`:684` (`makeEnv`), `:1406`–`:1473` (the guard cells' quoted clause at `:1457`–`:1458`);
`negative-generators.test.mjs` `:1503`–`:1609` (the absent-addon cell, the copy arm, the driver source and the
assertions). **Also read:** `bindings/js/index.mjs` `:434` (`loadAddon`), `:481` (the mismatch arm), `:536`
(`mismatchArmMessage`), `:618` (`fail`), `:623` (the arm-building throw), `:642` (`refusalLog`), `:646` (`withAddon`);
and `docs/L1/entry-subdivision.md` §1/§4.2, `docs/L1/test-stratification.md`/`.json` whole,
`docs/L1/kernel-subdivision.md` whole.

**Concluded, not measured:**

1. **That the glob returns thirteen matches.** Arithmetic on the two declared cuts (8 + 5), not a `readdir` — the
   directory does not exist.
2. **That the closure check is sufficient.** It reads *relative literal specifiers* out of staged bytes; a specifier
   built by concatenation or carried in a template (as `negative-generators`' own child driver carries a bare name)
   would be invisible to it. **The rule is therefore a floor, not a proof.**
3. **That `src/entry/` stays a closed set of `.mjs` parts.** Nothing enforces it; the glob's premise is a convention
   (this is `D-14`'s own ground, and it is a convention rather than a measurement).
4. **That every staged tree loads.** No tree was assembled and no child was spawned in this pass.
5. **The per-drive effect on cell counts.** `publish`'s ~62 cells and the others' cell sets are cited from the
   stratification and from the files' own headers; **I read no cell body beyond the ones named above**, so "every cell
   fails at import if the tree is stale" is a conclusion from how ES module graphs are built, not a run.

**Not verified:** whether a stale fixture's `JSON.parse` failure is reported by `node --test` with the child's stdout
attached (the wave's rule 3 of §3.4.1 makes that moot, and rule 2 makes it visible either way); the behaviour of
`execFileSync`'s `stderr` on a non-zero child exit at the exact site `:1572` uses; and **the tracked status of the
thirteen new part paths** — the maps' target counts are arithmetic this branch cannot confirm without a shell.

---

## §6 · Questions for the architect

**Q1 — is a thirteenth-of-thirteen closure check within `D-14`'s mechanism, or is it a second mechanism?** `D-14` fixes
*"a glob … paired with an explicit kernel path"*; this file adds a **closure check over the staged bytes** as the way
an empty or degraded match becomes loud (§2.2). **L0's reading, marked as inference:** the closure check is not a third
*staging* mechanism — it stages nothing — it is the **loud-failure rule `D-14` requires** (*"an empty match must be a
**loud** failure, not a silently smaller tree"*), applied to the degraded case as well as the empty one. Confirm or
narrow.

**Q2 — does `publish`'s lever become a per-file override map?** §3.1.1 rule 2 concludes that it must, because the two
anchors land in `src/entry/artefact.mjs` and `src/entry/refusal.mjs` after the entry's cut. **The alternative is to
keep `entrySource` pointed at `index.mjs` and re-cut both anchors inside a *part's* copy of the entry** — which no
longer exists. **The choice is the test layer's to land and this pass's to declare**; if the architect prefers the
anchors move rather than the lever widen, that is a different wave shape and should be said now.

**Q3 — the `P-PUB-7`/`JSG-12.18` edits are not in this wave's file set, and they are what a published tarball is
falsified by.** `delivery` adds twelve allowlist rows by reachability (`kernel-subdivision.md` §6) and the two cells
assert the retired four-name equality (`D-3`'s correction). **Nothing in `D-14` orders those edits into this wave.**
The suite does not break if they wait (the equality still passes while the manifest still has four rows), but **the
tarball is broken from the moment the code lands until the manifest and the two cells follow** — and `D-1-ter`'s
ordering (*"the code integrates first, the allowlist and the clause follow it, and no release may be cut in
between"*) already prices exactly that window. Is the wave to be declared as spanning the manifest too, or is the
release freeze the whole of the guard?
