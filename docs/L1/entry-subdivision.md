# L1 entry subdivision — `bindings/js/index.mjs`, and the kernel's integration into it (RE-ISSUED against HEAD)

**WHAT THIS FILE IS.** The declaration of **the cut** the architect sanctioned in `strata/decisions.md` **`D-2`**
(*"Index.mjs is already too long and should be subdivided anyway for readability"*) and of **where the constraint
kernel goes** in that cut, per **`D-1`** (*the kernel is tightly integrated, not an external import*) — **re-issued
against the file as it stands at HEAD**, because the declaration accepted at `D-15` measured a file that no longer
exists. It names **nine parts**, each with a target path, the line regions it takes **measured at HEAD**, what it owns
and why the boundary falls at a declaration boundary rather than one line either side; it states the **DAG re-derived
at HEAD** and checks it for a cycle; it states what the rulings **moved or deleted in this file**; it says what happens
to the lazy `require_` and to the kernel's six exports; it defines **`D-14`'s closed set** for a directory that does not
exist yet; and it states the ownership arithmetic the cut produces.

**THIS IS A RE-ISSUE, AND THIS PASS MOVES NO CODE, WRITES NO CODE, EDITS NO MANIFEST, STARTS NO L2, AND COMMITS
NOTHING.** `D-1`, `D-2` and `D-3` each order no code move; `D-2` says *"How many parts, where the boundaries fall, and
what they are called is L1's to declare and an implementation wave's to land"*.

**WHY IT IS RE-ISSUED.** The supervisor's `FINDING` records the cause and this pass confirms it at the bytes:
**`index.mjs` is 6,350 lines at HEAD, not 5,903** (`read` at offset 6320 reports *"total 6350 lines"*), and it carries
**151 top-level declarations, not 148**. **Twenty-four commits touched the file after `D-15`** — `D-22`…`D-29` and
`D-30` — and **`index.mjs` was the file those rulings rewrote most heavily**: `storeCreate` moved from the `L3406`
region to `L3567`, the constraint section moved from `L5187` to `L5561`, the lazy kernel reach from `L5227` to
`L5604`. **Every region in the old table is therefore false**, and one of its parts — *"part 9: the constraint kernel,
the whole file, `L1–L2203`"* — describes a file that **`D-13` ordered cut** and that
`docs/L1/kernel-subdivision.md` now cuts into five parts.

**⟶ ★ THE CUT THIS FILE DECLARES HAS BEEN EXECUTED — 2026-10-25 — AND EVERY LINE REGION BELOW IS THEREFORE
PRE-CUT. THE DECLARATION IS KEPT AS THE RECORD OF WHAT LANDED, AND IT IS NO LONGER A DESCRIPTION OF ANY FILE
ON DISK.** **`bindings/js/index.mjs` is 1,409 lines**, not the 6,350 this file measured; **the eight parts of §1
are eight files** under `bindings/js/src/entry/`, measured one by one at their own last lines: `refusal.mjs` 82 ·
`artefact.mjs` 355 · `state.mjs` 600 · `class-decision.mjs` 1,204 · `carrier.mjs` 960 · `frame.mjs` 416 ·
`delivery.mjs` 639 · `constraints.mjs` 795 — **and `D-33`'s split of part 6 is in them** (`carrier.mjs` and
`frame.mjs`). **So §1's `lines` column, §2's seam-by-seam addresses, §3.1's DAG and §4's lazy-reach call sites
all describe the file BEFORE the cut**, and a reader who needs a present line number has no line number to read:
the parts are the units now, and `docs/L1/drive-restaging.md` §2 is where the landed set is counted (thirteen).
**This is the second expiry of the same kind and it is recorded rather than presented as though the regions had
always been historical** — the first was the re-issue this file already documents, and its own sentence applies
verbatim to this one: *"a declaration of line regions expires with the next commit that touches the file it
measures."* **Nothing in the file is edited to the new figures: the declaration landed as written, the tree no
longer has regions, and the `D-2`/`D-33` cuts are the only thing left to measure.**

**⟶ AND THE PARTS' OWN SIZES ARE RE-MEASURED AT THIS TREE 2026-10-28, BECAUSE THE EIGHT POST-CUT FIGURES ABOVE ARE THE READING OF 2026-10-25 AND EVERY PART HAS MOVED SINCE.** `RCA-8(g)` ANNOTATE-BESIDE: **the paragraph above stands BYTE-FOR-BYTE and is read THROUGH this clause; its eight figures — `refusal.mjs` 82 · `artefact.mjs` 355 · `state.mjs` 600 · `class-decision.mjs` 1,204 · `carrier.mjs` 960 · `frame.mjs` 416 · `delivery.mjs` 639 · `constraints.mjs` 795 — are the readings of their own date and stay printed.** **THE THIRTEEN PARTS, `wc -l` at each file's own last line this date: `refusal.mjs` **161** (82) · `artefact.mjs` **376** (355) · `state.mjs` **1,038** (600) · `class-decision.mjs` **1,214** ✓ · `carrier.mjs` **1,002** (960) · `frame.mjs` **418** (416) · `delivery.mjs` **668** (639) · `constraints.mjs` **2,695** (795 — the single largest movement in the family), plus the five kernel parts `kernel-foundations.mjs` **908** · `kernel-registration.mjs` **772** · `kernel-commit.mjs` **190** · `kernel-attempt.mjs` **879** · `kernel-terminal.mjs` **422** — **`161 + 376 + 1,038 + 1,214 + 1,002 + 418 + 668 + 2,695 + 908 + 772 + 190 + 879 + 422 = 10,743` lines under `src/entry/`, and the barrel `constraint-kernel.mjs` is `4` on top.** **THE TWO FILES THE CUT LEFT OUT OF THAT LIST ARE RE-READ WITH IT: `index.mjs` is `1,573` lines (the paragraph above reads 1,409) and `index.d.ts` — the declaration of record, not a part — is `1,053` (no earlier figure here).** **The file count is unmoved at thirteen plus the barrel, and no part has been added or removed; what moved is length, which is why no region in §1 can be read as a line number and this file says so at the top.** **THE NINE PARTS' DECLARATION COUNT MOVED NOWHERE EITHER: the four exports and the six names the barrel re-exports stand as §4.3 prints them.**

**⟶ AND THE THIRTEEN PARTS ARE RE-MEASURED AGAIN AT THIS TREE 2026-10-28, BECAUSE THE CLAUSE ABOVE IS ITSELF PAST STATE — `D-57`'s ACT, AND THE SEVEN COMMITS IT READS.** `RCA-8(g)` ANNOTATE-BESIDE: **the clause above stands BYTE-FOR-BYTE and is read THROUGH this one; every figure it printed stays printed, including `constraints.mjs` 2,695 and the `10,743` it read the family as.** **THE THIRTEEN PARTS, `wc -l` at each file's own last line this date, each beside the reading the clause above printed:** `refusal.mjs` **161** ✓ · `artefact.mjs` **376** ✓ · `state.mjs` **1,038** ✓ · `class-decision.mjs` **1,214** ✓ · `carrier.mjs` **1,002** ✓ · `frame.mjs` **418** ✓ · `delivery.mjs` **676** (668) · `constraints.mjs` **2,951** (2,695) · `kernel-foundations.mjs` **1,058** (908) · `kernel-registration.mjs` **785** (772) · `kernel-commit.mjs` **355** (190) · `kernel-attempt.mjs` **920** (879) · `kernel-terminal.mjs` **422** ✓ — **`161 + 376 + 1,038 + 1,214 + 1,002 + 418 + 676 + 2,951 + 1,058 + 785 + 355 + 920 + 422 = 11,376` lines under `src/entry/`, and the barrel `constraint-kernel.mjs` is `4` on top ✓.** **`index.mjs` is `1,651` (1,573) and `index.d.ts` is `1,088` (1,053).** **The file count is unmoved at thirteen plus the barrel and no part has been added or removed; what moved is length, and the seven commits past `v1.3.0` are where it moved** — the delete's `CommitRecord`, its own pass and `D-56`'s ancestor widening landed in `kernel-commit.mjs`, `kernel-attempt.mjs`, `kernel-foundations.mjs` and `constraints.mjs` — **so no region in §1 can still be read as a line number, and this file says so at the top.** **THE NINE PARTS' DECLARATION COUNT MOVED NOWHERE EITHER: the four exports and the six names the barrel re-exports stand as §4.3 prints them.** (`D-57`; `D-56`; the matching re-read is `docs/L1/kernel-subdivision.md`'s and `docs/L1/module-map.md`'s clauses of the same date and `modules.json`'s `sizes_remeasured_2026_10_28_d57` key.)

**MEASUREMENT — WHAT WAS READ, AND HOW.** No shell, no run. `bindings/js/index.mjs` (**6,350 lines**) and
`bindings/js/src/constraint-kernel.mjs` (**2,213 lines**) were **surveyed by structure, not read end to end**: a
declaration-site grep (`^(import|export|function|const|let|class|async function|export const)`) returned **151** sites
in `index.mjs` and **52** in the kernel, each with its line number; the call graph was measured by a `name(` grep per
declaration group (the groups §3.1's table names, plus `state\.` and `Symbol\.for(`); **every seam was then read at the
bytes** — `L60–90`, `L285–314`, `L355–384`, `L545–584`,
`L640–654`, `L692–731`, `L1845–1876`, `L1915–1949`, `L3195–3229`, `L3545–3579`, `L4825–4874`, `L5015–5060`,
`L5284–5380`, `L5560–5619`, `L6240–6350` — and `bindings/js/package.json` whole. **The interior of every span not in
that list was not read**, and no behaviour was executed. §9 is the honest ledger.

**WHAT THIS FILE SUPERSEDES IN OTHER DECLARATIONS, NAMED BY SITE RATHER THAN ABSORBED — AND WHAT IT DOES NOT.**
`docs/L1/module-map.md` §5.1 recorded *"no single module can own `index.mjs` until the regions are physically separable
— and this map does not order that separation"*; `D-2` superseded the second clause and left the first as the tree's
state. **This file supersedes the first clause too, as a declared target:** after the cut, `index.mjs` is owned by
exactly one module and the co-ownership of §5.1 has no subject. **`module-map.md` §6 Q2 is CLOSED** (*should the split
be taken? — yes, for readability) and **§6 Q7 is answered** (`D-13`/`D-15`: `src/entry/`). **The tree is unchanged by
those supersessions, and the map's own region rows (`§2.3`, `§2.4`), its `js-constraints` region `L5202–L5903`, its
`5,903`-line figure and its FIGURES arithmetic are now STALE at HEAD — this pass does not edit them**, because the map
declares the tree's ownership and its revision is its own act. **A pass that reads the map for a current line number is
reading a superseded figure; this file is the current one.**

---

## §0 · The supersession record — what stood at each site, and why it was stale

**ANNOTATE-BESIDE (`RCA-8(d)`): the superseded figure is quoted, once per site, with its cause.** This pass republishes
the *regions* because a false region is a false measurement, and it does not erase the old table from the record: this
is where it is preserved.

| site | what stood there (accepted at `D-15`, file at `fe66387`) | the cause of its staleness | what stands now |
|---|---|---|---|
| the file's size | **5,903 lines** | 24 commits after `D-15`; the seven surface rulings plus `D-30` | **6,350 lines** (`read` at offset 6320) |
| the declaration count | **148** top-level declarations | as above | **151** (§1's per-part counts sum to it) |
| part 1 | `L1–L87`, `L3406–L4577`, `L5901–L5903` = **1,262** | `storeCreate` moved to `L3567` and its region grew by **138 lines** (`D-26`/`D-27`'s batch arming, the `D-29` cross-kind tests, `listen`'s return) | `L1–L87`, `L3548–L4857`, `L6348–L6350` = **1,400** |
| part 2 | `L565–L645` = **81** | nothing in the region moved | `L565–L645` = **81** (unchanged) |
| part 3 | `L301–L564`, `L646–L716` = **335** | nothing in the region moved | `L301–L564`, `L646–L716` = **335** (unchanged) |
| part 4 | `L88–L300`, `L3067–L3405`, `L4780–L4796` = **569** | the package-surface section moved to `L3209`; the `homeAddressKey` carve moved to `L5036–L5076` **and now takes the function's doc block with it** | `L88–L300`, `L3209–L3547`, `L5036–L5076` = **593** |
| part 5 | `L717–L1871` = **1,155** | nothing in the region moved — **the file's own banner still ends the class decision at the same line** | `L717–L1871` = **1,155** (unchanged) |
| part 6 | `L1872–L3066` = **1,195** | the walk grew by 142 lines (`D-26`/`D-27`'s batch and constraint-address encoders, and the outside-value refusals) | `L1872–L3208` = **1,337** |
| part 7 | `L4578–L5186` minus the carve = **592** | the delivery region moved to `L4858` and gained the `D-29` arms (`listenerStandingAt`, `constraintOverwrittenByListen`) | `L4858–L5035`, `L5077–L5560` = **662** |
| part 8 | `L5187–L5900` = **714** | the constraint section moved to `L5561` and gained `D-29`'s `unionAddressSets` and the `D-22` tombstone | `L5561–L6347` = **787** |
| part 9 | **"the constraint kernel, the whole file, `L1–L2203`, 2,203 lines"** | **`D-13` ordered the kernel cut**; `D-15` accepted five parts and a barrel; the kernel is 2,213 lines at HEAD | **the kernel family: five parts behind a barrel**, `docs/L1/kernel-subdivision.md` §1. **Part 9 now takes ZERO lines of `index.mjs`** |
| the DAG | `8 → 2, 3, 4, 9` (and no `7 → 3`) | measured at HEAD, part 8 reaches **5** (`classSpelling` `5736`, `isAdmittedArray` `5801`/`5803`/`6137`) and **6** (`constraintAddress` `5804`/`5812`), and part 7 reaches **3** (`boundaryReject` `5145`/`5159`/`5167`/`5205`) | §3.1 — **three edges the old table did not carry** |
| the lazy reach | `constraintsKernel()` at `:5227`, seven call sites at `:3995 · :4089 · :4156 · :5426 · :5542 · :5599 · :5720` | the constraint section moved; **the call-site count is unchanged** | `require_('./src/constraint-kernel.mjs')` at **`5604`**, seven call sites at **`4273 · 4372 · 4439`** (part 1) and **`5870 · 5989 · 6046 · 6167`** (part 8) |
| the `homeAddressKey` carve | `L4780–L4796`, **17 lines, the function alone** | moved; its doc block (`L5036`–`L5059`) is the function's own and now travels with it | `L5036–L5076`, **41 lines** |

---

## §1 · The cut — nine parts, measured at HEAD

| # | part | target path | regions taken at HEAD | content (measured) | decls | lines |
|---|---|---|---|---|---|---|
| 1 | **the entry and the fourteen members** | `bindings/js/index.mjs` (**unchanged path**) | `L1–L87`, `L3548–L4857`, `L6348–L6350` | the file header, the five node imports, `require_`, `ADDON_PATH`; **the surface banner, `storeCreate` (`L3567–L4847`) with the fourteen members and `D-27`'s batch arming (`4757`/`4759`, inside the factory's own construction)**, and the three `MOVED` markers; the module-namespace statement | **8** | **1,400** |
| 2 | **the one failure form** | `bindings/js/src/entry/refusal.mjs` | `L565–L645` | `fail`, `refusalLog` and their doc blocks | **2** | **81** |
| 3 | **the artefact meeting** | `…/artefact.mjs` | `L301–L564`, `L646–L716` | the resolution banner, `PLATFORM_NAMES`, `platformNameFor`, `platformNameForRuntime`, `packageVersion`, the six private loader `let`s, `rungOneCandidate`, `loadAddon`, `absentSubject`, `generatorFilePathUnreachable`, `mismatchArmMessage`, `addonLoadMessage`; `withAddon`, `spellDottedContainer`, `boundaryReject` | **19** | **335** |
| 4 | **the package's own state** | `…/state.mjs` | `L88–L300`, `L3209–L3547`, `L5036–L5076` | seven well-known symbol keys and the attempt seam (`ATTEMPT_INDEX`, `attemptIndex`, `openCommit`, `closeCommit`, `installAttemptSeam`); `INSTANCES`, `STORE_INDEX`, `STORE_RETIREMENT`, `crossTriggered`, `handlesOf`, `stateOf`, `notFoundRendering`, `entryOf`, `isStoreReceiver`, `carryRefusal`, `commitFile`, `listedSegments`, `writeRefusal`; **plus `homeAddressKey` and its doc block, carved** | **26** | **593** |
| 5 | **the class decisions** | `…/class-decision.mjs` | `L717–L1871` | the class-decision banner, `hasLoneSurrogate`, the prototype censuses (`plainProtoNames`, `arrayProtoNames`, `symbolDescription`, `arrayProtoSymbols`, `referenceSet`, `isStandardObjectPrototype`), `protoClass`, `accessorOrSymbolArm`, `arrayClass`, `isAdmittedArray`, `isPlainObjectValue`, `classSpelling`, `targetSpelling`, `valuePosition`, the conversion-member arms, `arrayElementsReachCallerCode`, `extendedPath`, the guard-trip renderers, `valueTargetSpelling`, `valueReject`, `shapeArmClass` | **32** | **1,155** |
| 6 | **the walk's encoders and decoders** | `…/walk.mjs` | `L1872–L3208` | the crossing-model banner, `ENCODER_CEILING`/`NODE_CEILING`, `refusedValue`, `refusedAsClass`, `isCanonicalArrayIndex`, `encodeValue`, `encodeSegment` and its two outside-segment refusals, `encodeAddress`, the outside-tier refusal, `encodeTier`, `encodeTierSetItem`, `encodeOpId`, `inDomainHandle`, `handleWire`, `encodeFilePath`, `encodeJournalLength`, `encodeListeners`, `encodeConstraints`, `constraintEntry`, `constraintAddress`, `spellConstraintAddress`, `encodeConfig`, **`admittedConstraintBatch`**, `decodeValue`, `decodeSegment`, `decodeSegments`, `decodeBaseState`, `decodeJournalOp` | **31** | **1,337** |
| 7 | **the delivered set and the terminal arm** | `…/delivery.mjs` | `L4858–L5035`, `L5077–L5560` | `commitPositionRefusal`, `deliver`, `inDomainAddress`, `isLawfulListenerElement`, `registerOn`, `constraintAtAnyAddress`, **`listenerStandingAt`**, **`constraintOverwrittenByListen`**, `terminalArm` | **9** | **662** |
| 8 | **the constraint members' glue** | `…/constraints.mjs` | `L5561–L6347` | the `═══` constraint banner, `ARGUMENT_POSITION_FIRST`/`SECOND`, the `D-22` tombstone for `KERNEL_HANDLE_PREFIX`, `let KERNEL` + `constraintsKernel` (**the lazy reach**), `KC_TOKENS`, `constraintPairKey`, `addressSetKey`, **`unionAddressSets`**, `constraintRefuse`, `withEmptyLog`, `constraintArity`, `constraintSite`, `carryConstraint`, `registrationCrossing`, `constraintParked`, `withdrawStanding`, `restoreHeldPair`, `constraintUncarried`, `enumerateConstraints`, `carriesConstraintAt`, `constraintWrite`, `KERNEL_REFUSAL`, `isKernelBuiltRefusal`, `constraintCrossing` | **24** | **787** |
| 9 | **the constraint kernel** | `bindings/js/src/constraint-kernel.mjs` (**unchanged path**) **plus `src/entry/kernel-*.mjs`** | **takes no lines of `index.mjs`**; its **2,213** lines are `docs/L1/kernel-subdivision.md` §1's five parts and a barrel | the kernel's five parts and its six-name barrel | — | 2,213 (sibling file) |

**THE PARTITION IS EXACT AND CLOSED.** `1,400 + 81 + 335 + 593 + 1,155 + 1,337 + 662 + 787 = 6,350` ✓ — the file's own
last line. **No line of `index.mjs` is unassigned and none is claimed twice**, and the two figures that are not one
contiguous range are part 4's `+41` and part 7's `−41`, which are the one function §2 says changes region.
**The tiling rule, stated once so the arithmetic is checkable: every internal boundary is a measured blank line, and
that line belongs to the part whose declaration precedes it.** **Declaration arithmetic:** `8 + 2 + 19 + 26 + 32 + 31 + 9 + 24 = 151` ✓ — the 151-site census.

**Two things the table's content lists do not mean, stated because a reader would otherwise infer them.** (1) **A listed
name is a line region's content, not a claim that the name survives unchanged**: part 8's list includes
`constraintsKernel` and the `let KERNEL` cache, and **§4.2 declares that the integration retires both** — the cut takes
their lines and the kernel's integration removes them, in one wave. (2) **Every part imports the node builtins it uses
for itself**, and `L79–L87`'s bindings are **the entry's own copy**: what crosses to part 3 is the three *derived path
values*, never an import (§2, `I-29`).

**`index.mjs` keeps its path and its one export.** A thin re-export shell was considered and refused again at HEAD: the
package's one arms-bearing entry (`DD-24`) is the surface, the shipped file that publishes it should hold it, and a
shell would move the `export` site off the file every battery cell reaches by path. **The entry is 1,400 lines after the
cut, from 6,350** — and 1,310 of that 1,400 is **one function**, which is §5's subject.

---

## §2 · Why each boundary falls there, and not one line either side

**Every seam below was read.** The declaration on each side is named so a reader can check it without reading 6,350
lines.

**`L87 → L88` (part 1 / part 4).** `L86` is `const ADDON_PATH = …`, `L87` blank, `L88` the first line of
`CHECKED_OFF`'s doc block. **The split is the module context's**: `require_` and `ADDON_PATH` are derived from
`index.mjs`'s own `import.meta.url` and must stay in the file both the published tarball and every staged tree carry as
`index.mjs`; the symbol keys are the package's per-instance state.

**`L300 → L301` (part 4 / part 3).** `L299` is `installAttemptSeam`'s closing brace (`L298` closes its inner block),
`L300` blank, `L301` the resolution banner's first `// ---` rule. **One line higher puts the resolution banner inside
the state part; one line lower puts `PLATFORM_NAMES` above the state that reads it.**

**`L564 → L565` (part 3 / part 2).** `L563` is `addonLoadMessage`'s closing brace, `L564` blank, `L565` the first `///`
of the failure form's doc block. **`fail` (618) and `refusalLog` (642) depend on nothing** — `fail` reads `status` and
`message` off a handed value and throws the one plain object; `refusalLog` returns an array or `[]`. **`withAddon` (646)
throws through `fail`, and `boundaryReject` (700) calls `withAddon` and `fail`.**

**`L645 → L646` (part 2 / part 3).** `L644` is `refusalLog`'s close, `L645` blank, `L646` `function withAddon()`.
**This cut is refused on readability rather than on dependency, and the honesty matters because `D-2`'s ground IS
readability**: the region taken whole (`L301–L746`) would be self-contained and would close no cycle (§3.2 case 1), and
what is wrong with it is what a reader meets — a part named for the artefact meeting would also own the package's single
refusal form, which **every part except the kernel imports**, while the gate's six private `let`s (`L399`–`L417`) are
nobody else's business. **Two subjects, two files.**

**`L716 → L717` (part 3 / part 5).** `L715` is `boundaryReject`'s close, `L716` blank, `L717`–`L722` the class-decision
banner's `// ---` rules. **This is the file's own banner**, and the class decision cannot live above the rejection it
renders through.

**`L1871 → L1872` (part 5 / part 6) — the one seam that is UNCHANGED from the old declaration.** `L1870` is
`shapeArmClass`'s closing brace, `L1871` blank, `L1872`–`L1877` the crossing-model banner. **The class half only
classifies; the encoder half builds the carrier tree and consumes eleven class predicates declared above it.** One line
higher would mix `shapeArmClass` into the encoders; one line lower would put `ENCODER_CEILING` above the predicates that
use no ceiling.

**`L3208 → L3209` (part 6 / part 4).** `L3207` is `decodeJournalOp`'s closing brace, `L3208` blank, `L3209` the
package's-own-surface banner (`// ---`). **The decoders end the crossing model and the package's state begins** — and
this is the seam that moved 142 lines (from `L3066`) because the walk grew.

**`L3547 → L3548` (part 4 / part 1).** `L3546` is `writeRefusal`'s closing brace, `L3547` blank, `L3548` the surface
banner's first rule. **`writeRefusal` (3541) is a *refusal composition* — it renders the walk's fault through
`valueReject` and throws through `fail` — not a member**, and it stays on the state part's side although its one caller
(`writeRefusal(refusal, fault)` at `3834`) is in `storeCreate`. **The cost is declared rather than hidden: the entry
imports it, exactly as it imports `installAttemptSeam` (`4845`) from the same part** — which is why the seam is drawn at
the surface banner rather than at the state part's last declaration.

**`L4857 → L4858` (part 1 / part 7).** `L4847` is `storeCreate`'s closing brace, `L4848` blank, `L4849`–`L4857` the
three `MOVED` markers, `L4858` the first `///` of `commitPositionRefusal`'s doc block. **The `MOVED` markers belong to
the member list they stand in** (`read`, `readLiteral`, `deleteOp`, `rollback` moved into their members' own bodies on
2026-10-18), so they travel with the entry; the delivery part begins at its own first declaration.

**`L5035 → L5036` and `L5076 → L5077` (part 7 / part 4 / part 7) — the one function that changes region.**
`homeAddressKey` (`L5060–L5076`) and its doc block (`L5036–L5059`) move **down into the state part**. It is **the
listener mirror's key** — its own doc says *"it is this factory's own closure, like `tokens` and `registry`"* — and its
consumers are the mirror's pushes (`4041`, `5241`), the pair checks (`constraintAtAnyAddress` `5291`,
`listenerStandingAt`/`constraintOverwrittenByListen` `5348`–`5378`), the mirror's reads (`constraintAtAnyAddress`,
`carriesConstraintAt` `6143`/`6146`) and **the address set's canonical spelling** (`addressSetKey` `5648`, in the
constraint glue). **Left in the delivery part, the constraint glue would import the delivery part and the DAG would read
*the constraint pass depends on the terminal arm*** — false in the mechanism, where the pass runs **before** the arm.
**It is one function, 41 lines with its doc block, and the edge it removes is the cut's second cycle** (§3.2 case 3).
*(The old declaration carved 17 lines and left the doc block behind; the re-issue takes the doc block with the function
because a part that owns a function should own the paragraph that explains it.)*

**`L5560 → L5561` (part 7 / part 8).** `L5559` is `terminalArm`'s closing brace, `L5560` blank, `L5561`–`L5563` the
constraint section's `═══` banner. **The `═══` rule is the section's own and nothing else in the file uses it.**

**`L6347 → L6348` (part 8 / part 1).** `L6346` is `constraintCrossing`'s closing brace, `L6347` blank, `L6348` the
module-namespace statement (*"THE MODULE NAMESPACE CARRIES ONE NAME, `storeCreate` ALONE"*) which runs to `L6350`, the
file's end. **That statement is about the entry, not about the constraint members, so it travels up to part 1** — the
same judgement the old declaration made at `L5901–L5903`.

**Part 9 — the kernel.** Its internal cut is `docs/L1/kernel-subdivision.md`; **it takes no line of `index.mjs`**, and
what this file owes it is two things: **the lazy reach's fate (§4.2)** and **its place in `D-14`'s closed set (§7)**.

---

## §3 · The dependency DAG, re-derived at HEAD, and the cycle check

### §3.1 The DAG, part by part

**The arrow points at what is *needed*.** Every edge was measured by grep over call sites (`name(`), and the three edges
the old table did not carry are named as such rather than slipped in.

```
1 entry (js-surface)            → 2,3,4,5,6,7,8,9
2 refusal (js-resolution)       → (nothing)
3 artefact (js-resolution)      → 2
4 state (js-registry-delivery)  → 2, 3, 5, 6
5 class-decision (js-crossing)  → 3
6 walk (js-crossing)            → 3, 5
7 delivery (js-registry-delivery) → 2, 3, 4, 5, 6
8 constraints (js-constraints)  → 2, 3, 4, 5, 6, 9
9 kernel (js-constraints)       → (nothing — zero imports; kernel-subdivision.md §3)
```

**THE CYCLE CHECK, MECHANICAL.** The graph is acyclic because **a total order exists that every edge respects**:
`1 > {7, 8} > {4, 6} > 5 > 3 > 2`, with `9` below `8` alone. Check each part: `1 →` everything below ✓; `7 → {2,3,4,5,6}`
✓; `8 → {2,3,4,5,6,9}` ✓; `4 → {2,3,5,6}` ✓; `6 → {3,5}` ✓; `5 → {3}` ✓; `3 → {2}` ✓; `2 → ∅` ✓. **No cycle**, and the
cut's depth is five.

**Every edge, named with the call sites that settle it — the three starred rows are the ones the old table did not
carry:**

| edge | what crosses, and where (measured at HEAD) |
|---|---|
| **1 → 2** | `fail(refusal)` at `3625`, inside `storeCreate`'s own refusal frame |
| **1 → 3** | `withAddon` `3568`, `boundaryReject` `3957`, `4191`, `4493`; `ADDON_PATH` derived in `L86` and handed in |
| **1 → 4** | `installAttemptSeam` `4845`, `openCommit` `3750`/`3892`/`3950`/`4172`/`4317`, `closeCommit` `3883`/`3909`/`4078`/`4296`/`4392`, `writeRefusal` `3834`, `carryRefusal` `3724`–`4511`, `entryOf` `3724`–`4511`, `homeAddressKey` `4041` |
| **1 → 5** | `valueReject` `3808`, `classSpelling` `3959`/`4890`, `targetSpelling` `3959`–`4503`, `isAdmittedArray` `3968`–`4795`, `isPlainObjectValue`/`arrayClass` `4795` |
| **1 → 6** | `encodeConfig` `3597`, `admittedConstraintBatch` `3620`, `encodeAddress` `3704`–`4029`, `encodeTier`, `encodeValue` `3804`, `encodeOpId` `3914`, `handleWire` `4031`, `inDomainHandle` `3956`, `spellConstraintAddress` `4019`/`4193`, `constraintAddress` `4584`/`4591`, `decodeValue` `3724`–`3744`, `decodeSegments` `3847`, `decodeJournalOp` `3850`, `decodeBaseState` `3920` |
| **1 → 7** | `commitPositionRefusal` `3782`, `deliver` `3906`, `constraintOverwrittenByListen` `4015`, `listenerStandingAt` `4189`, `registerOn` `4638`, `terminalArm` `4656` |
| **1 → 8** | `constraintWrite` `3810`; `constraintSite` `4174`/`4320`/`4398`; `constraintPairKey` `4198`–`4603`; `carryConstraint` `4200`/`4757`; `withdrawStanding` `4236`/`4629`; `unionAddressSets` `4261`; `restoreHeldPair` `4276`/`4375`; `registrationCrossing` `4277`–`4759`; `addressSetKey` `4285`; `constraintUncarried` `4322`/`4400`; `enumerateConstraints` `4465`; `constraintRefuse` `4555`–`4601`; `withEmptyLog` `4608` |
| **1 → 9** | `constraintsKernel().register` at `4273`, `4372`; `.remove` at `4439` |
| **3 → 2** | `withAddon` throws through `fail` (`652`, `653`); `boundaryReject` through `fail` (`705`, `714`) |
| **4 → 2** | `fail` in `carryRefusal` (`3479`) and `writeRefusal` (`3545`) |
| **4 → 3** | `boundaryReject` in `stateOf` (`3323`), `withAddon` in `entryOf` (`3450`) |
| **4 → 5** | `classSpelling`/`targetSpelling` in `stateOf` (`3325`–`3326`), `valueReject` in `writeRefusal` (`3543`) |
| **4 → 6** | `decodeSegments` in `crossTriggered` (`3292`), `decodeValue`/`decodeJournalOp`/`decodeBaseState` in the answer decoders (`3123`–`3207`'s consumers) |
| **5 → 3** | `valueReject` → `boundaryReject` (`1856`) |
| **6 → 3** | eleven `boundaryReject` calls: `2288`, `2307`, `2326`, `2379`, `2452`, `2513`, `2604`, `2726`, `2815`, `2976`, `3064` |
| **6 → 5** | `classSpelling` (`2192`, `2330`, `2376`, `2449`, `2515`, `2729`, `2818`, `2927`, `2979`, `3067`), `isAdmittedArray` (`3039`, `3044`), `valueTargetSpelling` (`2913`) |
| **7 → 2** | `fail` directly at `5261`, and through the boundary rejections of `5145`–`5205` |
| **★ 7 → 3** | `boundaryReject` at `5145`, `5159`, `5167`, `5205` — **not in the old table** |
| **7 → 4** | `homeAddressKey` `5241`, `5291`, `5348`, `5354`, `5378`; `entryOf` `5238`, `5253`; `commitFile` `5456` |
| **7 → 5** | `classSpelling` `5148`, `5162`, `5169`; `targetSpelling` `5147`, `5161`, `5169` (`inDomainAddress` `5110` is part 7's own, not this edge) |
| **7 → 6** | `encodeAddress` `5238`, `encodeOpId` `5456`, `handleWire` `5258`, `inDomainHandle`, `decodeSegments` `5025` |
| **8 → 2** | `refusalLog` `5941`, `6331`, `6344` |
| **8 → 3** | `withAddon` `5922` |
| **8 → 4** | `homeAddressKey` `5648`, `5681`, `6143`, `6146` |
| **★ 8 → 5** | `classSpelling` `5736`, `isAdmittedArray` `5801`, `5803`, `6137` — **not in the old table** |
| **★ 8 → 6** | `constraintAddress` `5804`, `5812` — **not in the old table** |
| **8 → 9** | `constraintsKernel()` `5604` (the lazy reach), `.register` `5870`, `6046`, `.remove` `5989`, `.commit`/`.runAttempt` `6167` |

**Two parts reach the kernel directly (1 and 8), and that is declared rather than tidied.** `storeCreate` calls
`.register` twice (`4273` `addConstraint`, `4372` `constraintOn`) and `.remove` once (`4439` `removeConstraint`) inside
its own member bodies; the glue calls it four times (`5870`, `5989`, `6046`, `6167`). **Seven call sites in total — the
count is unchanged from the old declaration, and the old declaration's *"the map's §4 E6 and the brief's six are both
short by one"* finding therefore still stands, at new lines.** Routing the three member-side calls behind the glue
would unify the seam, **but it moves `try`/`catch` frames that today wrap `registrationCrossing` and
`restoreHeldPair`**, so it is a code change this declaration does not order: **the rule it declares is *no third part
reaches part 9*.**

**Shared state is not an edge, and `D-29` added one field that must be named.** `state.establishing` is declared in
part 1's per-instance state (`L3672`, added 2026-10-24), **written by part 8** (`5865`, `5866`, `5876`) and **read by
part 7** (`5376`). That is a shared field on one record, not a part dependency: part 8 already reaches part 4 for
`entryOf`, and part 7 already reaches part 4 for the state accessors. **The cut's rule is that the record's *home* is
part 1's creation and its *mutation* is any part's** — and a later reader must not read these writes as edges.

### §3.2 The candidate cuts that would close a cycle, or that the mechanism refuses

1. **"The failure form is one part"** — `fail` + `refusalLog` + `withAddon` + `boundaryReject` + the ladder, as one
   region `L301–L746`. **`boundaryReject → withAddon → fail` is internal to the part and the part's only outgoing edge
   would be the ladder's own, so nothing cycles.** It is refused on **legibility**, not on dependency: it makes the form
   unfindable and puts the gate's mutable module state in scope of every refusal consumer (§2). **Recorded this way
   deliberately — a cycle that does not exist must not be manufactured to justify a cut.**
2. **"`boundaryReject` belongs with the surface"** — then `5 → 1` for `valueReject` while `1 → 5` for the write member's
   fault check: **a two-part cycle. Refused.**
3. **"`homeAddressKey` stays in the delivery part"** — then `8 → 7` (for `addressSetKey`) and **no edge back**, so it is
   not a cycle, but the constraint glue depends on the part that owns the terminal arm, i.e. **the pass depending on the
   act it precedes.** Refused on the mechanism; the fix is the 41-line move into part 4.
4. **"Keep `fail` in the part owned by `js-surface`"** — a *module*-level cycle, not a part cycle: part 3
   (`js-resolution`) imports part 2 and part 1 (`js-surface`) imports part 3, so the modules point both ways while the
   parts stay a DAG. **Refused: the map's interaction table would need `js-surface ↔ js-resolution`.** The cost is
   §4.3's re-homing.
5. **NEW at this re-issue — "split part 5 / part 6 so no part exceeds 1,000 lines".** Measured and **priced without
   being taken** (§5): part 6 splits cleanly at `L2798→L2799`; **part 5's natural seam at `L1310→L1311` is a measured
   CYCLE** — the census half calls `spendGuardRead`/`spendGuardPosition` (`876`, `890`, `927`, `999`, `1012`, `1144`–`1146`)
   which are declared at `1714`/`1686` in the upper half, while the upper half calls the lower's predicates — **so the
   split needs either a two-declaration carve (a pure move, available) or a code change (not available to a move).**

---

## §4 · The kernel's integration — `D-1` inside `D-2`, at HEAD

### §4.1 Where the kernel's content goes

**Into part 9, at its existing path `bindings/js/src/constraint-kernel.mjs` — which is now a barrel over five parts.**
`D-1` rules the kernel *"tightly integrated"*; `D-2` rules that a file already too long is the wrong destination for
2,213 more lines; `D-13` rules the kernel **cut**. **The three compose**: the kernel is not appended to `index.mjs`, it
becomes a part of the entry family, the entry reaches it by a relative import like every other part, and **its internal
cut is `docs/L1/kernel-subdivision.md`'s, not this file's**.

| | today (measured) | after both cuts |
|---|---|---|
| how the entry reaches it | `require_('./src/constraint-kernel.mjs')`, lazily, at the first constraint act (`L5604`) | a static `import` of the barrel by parts 1 and 8 |
| its role | a separately-reachable module, the **fourth `files` row** | **the ninth part of the entry family**, required by the entry, published for nobody |
| its internal shape | **one file, 2,213 lines, 52 declarations, 6 exports** | **five parts behind a barrel** (`kernel-subdivision.md` §1) |
| its six exports | six `export` sites at `472 · 1001 · 1155 · 2066 · 2082 · 2121` | **the same six NAMES**, re-exported from four part files, **the same single path** for every consumer |
| its published export set | none since `D-1` (`exports` publishes `"."` alone) | none, and now not even a tarball carries the file for a caller to reach |

### §4.2 The lazy seam at `L5604` — what it protected, and why the cut retires it

**The site, read at its bytes** (`L5595`–`L5606`): the entry reaches the kernel **as a file, at the path the allowlist
publishes it at**, and **the resolution is lazy on purpose** — *"the entry must still LOAD where nothing is staged
beside it — the publish and negative drives assemble trees carrying `index.mjs` alone — and a load-time import of
`./src/` would make every one of those trees unable to reach the artefact they were built to drive."*

**`D-12` is not what decides this — the cut is.** A tarball carries whatever `files` carries, so the installed battery
never had an `index.mjs`-alone tree. **The decisive fact is that the subdivision destroys the property the laziness
bought: a tree carrying `index.mjs` alone cannot load at all once the entry statically imports seven parts**, because a
static relative import is resolved at module-graph construction — before any constraint act, before the addon, before
anything. **So the laziness has no remaining subject, and `D-14`'s four drives stage the part set instead of being
spared the `src/` directory** (`docs/L1/drive-restaging.md`).

**`constraintsKernel()` the function disappears; the `let KERNEL = null` cache with it** (`L5602`–`L5606`). There is
nothing to defer and no second resolution to guard: **all seven call sites lose their gate** — the three member-side
sites (`4273`, `4372`, `4439`) call the imported names directly from part 1, and the glue's four (`5870`, `5989`,
`6046`, `6167`) do the same from part 8. **The one thing the seam must not lose is `constraintWrite`'s `kernel`
binding's role** — `6167`'s `const kernel` is used for `kernel.commit` and `kernel.runAttempt` inside one `try`, and a
namespace import keeps that shape exactly (`import * as kernel from '../constraint-kernel.mjs'`), while the three
member-side sites take the two names they use (`register`, `remove`).

**`KC_TOKENS` (`L5612`) is untouched and needs no seam at all** — it is a constant the entry spells for itself, and the
kernel declares its own (`constraint-kernel.mjs:59`). **`KERNEL_REFUSAL` (`L6287`) is the sixth shared spelling and
stays doubled** for the same reason.

### §4.3 What the failure form's move does to the modules

**Part 2 (`refusal.mjs`) and part 3 (`artefact.mjs`) are owned by `js-resolution`, and this is a module-level re-homing
that must be said plainly.** The map gives *"render the single failure form"* to `js-surface`. **The cause is the split
§2 declares, and the chain is stated rather than implied:** once part 2 is its own file, its owner must be the module
that also owns the gate it sits under — because **owning part 2 from `js-surface` closes a two-module cycle** (part 3
imports part 2, and part 1 imports part 3 — §3.2 case 4) — and the only alternative is the merged part §2 refuses on
legibility. **So `js-surface`'s responsibility loses the failure form and `js-resolution`'s gains it**, and the
failure-form **endpoint** moves from `js-surface` (3 → 2) to `js-resolution` (3 → 4). **The endpoint total is unmoved at
61; the module total is unmoved at 19.**

### §4.4 What the cut must NOT do to the kernel

Three prohibitions, each from a contract or a ruling that outranks this pass:

1. **The kernel family must keep an empty import footprint** — `kernel-surface.md §1` item 1 declares it (*"NOTHING — no
   `createRequire`, no addon path, no native module and no dependency of the module's own"*), and the file restates it
   at `L18`–`L35`. **After the cut that clause is satisfied by the reading `D-15` recorded: the relative imports are all
   among the kernel's own parts, and nothing comes from outside.** A part that imported a node builtin or an entry part
   would break it.
2. **The shared `Symbol.for` keys stay declared on both sides.** The entry declares six the kernel spells (`L108`,
   `L126`, `L139`, `L166`, `L183`, `L6287`) and the kernel declares five plus `forget-pair` inline
   (`constraint-kernel.mjs:97`, `113`, `135`, `148`, `138`, `2202`). **A tidying pass that collapses them into one home
   would make the kernel import the entry family** — refused here by name so no wave "improves" it.
3. **The `A112` ordering law is untouched.** Whether delivery already follows the constraint pass stays `OWED` a
   measurement (`D-1-bis`, brief §6). **This cut moves lines; it does not measure and does not re-spell the law.**

---

## §5 · Part sizes — the largest part, why it is that size, and the two splits priced but not taken

| part | lines | why it is one part |
|---|---|---|
| **1 entry** | **1,400** | **the largest, and irreducible by a pure move**: 1,310 of it is `storeCreate` (`L3567–L4847`), one factory whose **fourteen members are closures over one local state** — `state`, `tokens`, `registry`, `addon_`. Splitting members into another file is a **code change**, not a move |
| 2 refusal | 81 | one form |
| 3 artefact | 335 | one meeting: the resolution ladder and the rejection rendered through it |
| 4 state | 593 | the package's per-instance state, its accessors and the mirror's key |
| 5 class-decision | 1,155 | the file's own banner: every predicate that classifies a value before it crosses |
| 6 walk | 1,337 | the file's own banner: the carrier tree's encoders and decoders |
| 7 delivery | 662 | the delivered set, the mirror's registration and the terminal arm |
| 8 constraints | 787 | the five constraint members' glue, one section under one `═══` banner |

**THE HONESTY THIS TABLE OWES, AND IT IS THE ONE THING THE SUPERVISOR'S SIZE RULE IS AIMED AT.** Three parts exceed
1,000 lines — 1 **1,400**, **6 1,337**, **5 1,155** — and **the re-issue does not pretend that is invisible**. Two of the
three are splittable **by a pure move** and the third is not:

- **Part 1 cannot be split without a code change.** `storeCreate`'s fourteen members share one closure; a part file
  holding four of them would need the state threaded as a parameter, which changes signatures and is precisely what a
  declaration may not order. **This is a finding for the architect, not a licence to redesign** — and it is the same
  finding the old declaration's `Q2` was circling.
- **Part 6 splits cleanly at `L2798 → L2799`** (measured: `encodeJournalLength`'s close and blank, then
  `encodeListeners`'s doc block): `L1872–L2798` = **927** lines (the value encoder, the segment/address/tier/opId/
  filePath/journalLength encoders and their outside-value refusals) and `L2799–L3208` = **410** lines (the config's
  encoders, the constraint batch's encoders and every decoder). **Edges are one-way**: the upper region calls
  `encodeAddress` (`2831`) and `classSpelling` (`2927`, `2979`, `3067`), and **every call site of a name declared at
  `2799` or above lies at `2799` or above** (measured by the `name(` greps of §9).
- **Part 5 splits at `L1310 → L1311` only with a carve, because the natural seam is a measured cycle** (§3.2 case 5):
  the census half (`L717–L1310`) calls `spendGuardRead`/`spendGuardPosition` (`876`, `890`, `927`, `999`, `1012`,
  `1144`–`1146`), which are declared in the upper half at `1686`/`1714`, and the upper half calls the lower's
  predicates. **Carving the two guard functions down gives two parts of 594 and 561 with a one-way edge.**

**WHY THE SPLITS ARE PRICED AND NOT TAKEN IN THIS PASS — stated so the choice is the architect's and not a silence.**
The part count is not a private number: **`D-14`'s closed set, `docs/L1/drive-restaging.md` §1/§2's file set, and this
file's own part numbering are all declared against seven entry parts and five kernel parts.** Taking either split here
would make a **sibling declaration false in the same pass whose whole purpose is that declarations stop being false.**
**My recommendation, marked as mine and not as a ruling:** take the part-6 split in the same wave that re-issues
`drive-restaging.md`'s counts, and leave part 5 whole (it is one subject under one banner and its seam costs a carve to
reach). **Until the architect orders it, this declaration keeps the accepted nine-part shape with regions measured at
HEAD** — a re-issue that is faithful to the cut the project accepted, rather than a redesign smuggled into a
measurement pass.

---

## §6 · The inventory — what the rulings moved or deleted in `index.mjs`

**The kernel's own ten deleted declarations are `docs/L1/kernel-subdivision.md` §5's subject. This table is the entry's,
and it exists because a part that is declared to own something a ruling removed has no such thing to own.**

| ruling | what it did to this file | where it stands at HEAD | the part it changes |
|---|---|---|---|
| **`D-22`** (*"Discard the noop prefix"*) | **deleted `KERNEL_HANDLE_PREFIX`** and **the blanket exemption of kernel-prefixed handles in `registerOn`** | tombstone `L5579–L5593` (part 8); the exemption's own tombstone inside `registerOn` at `L5199`–`L5202` (part 7) | **part 7 loses the exemption; part 8 keeps the tombstone.** *The old declaration listed `KERNEL_HANDLE_PREFIX` among part 8's content; it is a comment now, not a declaration* |
| **`D-22`** | **`listen` returns the handle** (`void → Handle`) | the member's own body, part 1 | part 1 (no declaration moves) |
| **`D-24` / `D-25`** | the cross-kind overwrite rule: `registerOn` keeps a conflict test with a **better subject**; `constraintAtAnyAddress` is its read | `5142`–`5284` | part 7 |
| **`D-26` / `D-27`** | the batch in `cfg.constraints` **must supply functions and they are armed**; duplicates rejected regardless of kind | **`admittedConstraintBatch` (`L3035`, new, part 6)**, `constraintEntry`'s function member (`2876`+, part 6), `constraintAddress`/`spellConstraintAddress` (`2911`/`2943`, new, part 6), and **the arming inside `storeCreate` (`4757`/`4759`, part 1)** | **part 6 gains three declarations; part 1 gains the arming** |
| **`D-29`** (*"Listen cannot overwrite constraint, only other listeners"* / *"Handle becomes the internal ID"*) | **`constraintOverwrittenByListen` (`L5345`) and `listenerStandingAt` (`L5336`) added** — `B-6`'s one read and `B-4`'s; **`unionAddressSets` (`L5674`) added**; **`state.establishing` added to the per-instance state (`L3672`)**; the pair key is the `id` alone | parts 7, 8, 1 | **part 7 gains two declarations, part 8 one, part 1 one field** |
| **`D-30`** | **nothing in this file** — the attempt registry is the kernel's | — | — |
| **`D-32`** | **no code moves**: the bare `file`-tier write persists (`DD-28` governs) and `surface.md §2.11` clause 2's terminal-arm `commit_file` **still binds** | `terminalArm` calls `commitFile` at `L5456` | part 7 (no declaration moves) |

**And THREE declarations with no live call site, recorded rather than tidied** (measured: a grep for each name returns
only its own declaration): **`constraintParked` (`L5961`)**, **`carriesConstraintAt` (`L6135`)** and — the surprising
one, in part 4 — **`stateOf` (`L3320`)**. **The first two travel with part 8 unchanged; their disposition is no decision
of this cut's** — and `carriesConstraintAt` is the same finding the old declaration recorded at `L5688`. **`stateOf` is
different in kind and is a warning for the wave: the state part's accessor is never called by name, so the members reach
the per-instance state by some other route, and a wave that splits parts 4 and 7 must find that route before it assumes
the DAG's `7 → 4` edge is the only one** (§9).

---

## §7 · `D-14`'s closed set — defined before the directory exists

**`bindings/js/src/entry/` DOES NOT EXIST AT HEAD.** Measured: `bindings/js/src/**/*.mjs` returns exactly one path
(`constraint-kernel.mjs`) and `bindings/js/src/*` lists the crate's five Rust files plus that one `.mjs`. **So the glob
`D-14` sanctions has no closed set today, and a declaration that assumed one would be describing a directory as though
it were there.** **This section is where the closed set is defined, by enumeration, as a target state.**

**THE AUTHORITATIVE ENUMERATION — `src/entry/*.mjs` after the wave, TWELVE files and no others:**

| # | target path | part | the declaration that draws it |
|---|---|---|---|
| 1 | `bindings/js/src/entry/refusal.mjs` | 2 | this file, §1 |
| 2 | `bindings/js/src/entry/artefact.mjs` | 3 | this file, §1 |
| 3 | `bindings/js/src/entry/state.mjs` | 4 | this file, §1 |
| 4 | `bindings/js/src/entry/class-decision.mjs` | 5 | this file, §1 |
| 5 | `bindings/js/src/entry/walk.mjs` | 6 | this file, §1 |
| 6 | `bindings/js/src/entry/delivery.mjs` | 7 | this file, §1 |
| 7 | `bindings/js/src/entry/constraints.mjs` | 8 | this file, §1 |
| 8 | `bindings/js/src/entry/kernel-foundations.mjs` | 9a | `kernel-subdivision.md` §1 |
| 9 | `bindings/js/src/entry/kernel-registration.mjs` | 9b | `kernel-subdivision.md` §1 |
| 10 | `bindings/js/src/entry/kernel-commit.mjs` | 9c | `kernel-subdivision.md` §1 |
| 11 | `bindings/js/src/entry/kernel-attempt.mjs` | 9d | `kernel-subdivision.md` §1 |
| 12 | `bindings/js/src/entry/kernel-terminal.mjs` | 9e | `kernel-subdivision.md` §1 |
| — | `bindings/js/src/constraint-kernel.mjs` | **the barrel — outside the glob, named by `D-14`'s explicit path** | `kernel-subdivision.md` §4.3 |

**Three properties make the enumeration a closed set rather than a hand-maintained list — and they are the properties
`D-14` chose a glob *for*:** (1) **the directory holds its parts and nothing else** — no `.md`, no `.json`, no fixture,
no scratch file, because the glob stages every `.mjs` it finds and a non-part `.mjs` would be a silently larger tree;
(2) **a zero or degraded match is a loud failure at staging, and a closure check over the staged bytes resolves every
relative specifier inside the staged set** (`drive-restaging.md` §2.2), so a thirteenth part added by a later pass is
either staged and checked or the check fails naming it; (3) **`D-14`'s explicit path is load-bearing for exactly one
file** — the barrel, one directory up, which no glob of `src/entry/` can express.

**What this definition does NOT claim:** that the directory will stay closed (nothing enforces it — `drive-restaging.md`
§5 says so), that twelve files land in one wave (they do not have to), or that the tracked-path count is known (§9).

---

## §8 · What this does to the shipped package — consequences, not edits

**`delivery` owns these bytes and none is edited here. The manifest was read whole (50 lines).**

- **`files` (`bindings/js/package.json:34–39`).** Today four rows: `index.mjs`, `README.md`, `index.d.ts`,
  `src/constraint-kernel.mjs`. **After both cuts the entry requires seven new part files and one barrel, and the barrel
  requires five kernel part files, so all twelve must ship** — `4 + 12 = 16` rows by reachability. **The number is
  a consequence, not a declaration**: `D-3` retired the count and `D-4` made the shape *"determined empirically — by
  `delivery` together with the e2e/blind scenario testing"*, so **no allowlist question goes to the architect** and the
  instrument that answers it is the installed battery (`D-10`/`D-12`). **`D-3` also states that nothing licenses a glob,
  a wildcard or a directory row; whether `src/entry/` may be named once instead of twelve times is delivery's, with its
  evidence.**
- **A supersession inside `D-1`, named.** `D-1` says the fourth `files` entry *"has no subject"*. Read through `D-2` and
  `D-13`: **it has no subject as a published module and a full subject as a required file** — and after the kernel's cut
  that file is the barrel. **The row survives, on a third ground.**
- **`exports` (`:27–32`) is unmoved.** One arm, `"."` → `{types: ./index.d.ts, import: ./index.mjs}`. **No part may be
  added to it**: an `exports` arm for an internal part would republish the kernel's names and re-create the boundary
  `D-1` dissolved.
- **Load footprint.** The entry's module graph grows by ~2,200 lines of kernel at import. This is `D-1`'s price, not the
  cut's: the mechanism is declared unconditional (`D-1-bis`), and **what the cut removes is the deferral, not a
  decision to use the kernel.**
- **`version` (`0.5.0`) and the five exact `optionalDependencies` are untouched.** **Nothing here authorises a release**,
  and `D-1-ter`'s ordering stands: the code integrates first, the allowlist follows it, and no release is cut in between.

---

## §9 · Measured, concluded, and not verified

**Read at the bytes.** The **151** `index.mjs` top-level declaration sites and their line numbers; the **52** kernel
sites; the file's last line (*"total 6350 lines"*, `read` at offset 6320); the seams listed in the header, each read in
full; the call graph by a `name(` grep per declaration group (the same instrument §9's header names); the six shared
`Symbol.for` keys on both sides
(`index.mjs` `108`/`126`/`139`/`166`/`183`/`6287`; kernel `97`/`113`/`135`/`148`/`138` plus `2202`'s inline spelling);
the seven `constraintsKernel()` call sites (`4273`, `4372`, `4439`, `5870`, `5989`, `6046`, `6167`) and its definition
(`5602`–`5606`); the module-context three (`85`, `86`, `359`); `homeAddressKey`'s doc block and its eight consumer
sites; `state.establishing` (`3672`, `5376`, `5865`, `5866`, `5876`); `carriesConstraintAt`/`constraintParked`/
`stateOf`'s absent call sites; `bindings/js/package.json` whole; the closed-set premise (`bindings/js/src/**/*.mjs`,
`bindings/js/src/*`); and `docs/L1/kernel-subdivision.md` (this pass's re-issue) and `docs/L1/drive-restaging.md` whole.

**Concluded, not measured:**
1. **That each part is "independently readable."** The dependencies are measured; the *coherence* of each grouping is my
   judgement, exactly as the kernel cut's five are.
2. **That the call graph is complete.** Edges were found by grep for `name(` — **direct named calls only**. **A call
   through a variable, a destructured alias, a computed member, a closure or `Reflect.apply` is invisible to it** — and
   this file *does* call the store indirectly (`Reflect.apply(entryOf().read, this, args)` at `3724`/`3826`/`3899`)
   and dispatches the terminal arm through a symbol-keyed member, so the risk class is real rather than theoretical.
3. **That the three edges the old table lacked (`7 → 3`, `8 → 5`, `8 → 6`) are new rather than previously omitted.** I
   measured them at HEAD and did **not** read the file at `fe66387`, so both causes are possible and neither is claimed.
4. **The `files` shape (16 rows).** Reachability arithmetic on a manifest I read; **not** a measured publish.
5. **That `state.establishing`'s cross-part write is safe under the cut** — it is a field on a record one part creates,
   written by one part and read by another; whether that is the final home is a designer's question, not a move's.

**Not verified, and named as not verified:** **no shell and no run in this pass — no `node --test`, no greens run, no
`wc -l`, no `git ls-files`**; that the four drives' staged trees load after the wave; the tracked-path count after both
cuts (arithmetic); and whether `src/entry/` stays a closed set (a convention, made an obligation in §7).

**Measured and recorded because they contradict a document:**
- **`constraintsKernel()` has seven call sites, not six** — the old finding stands at new lines (`module-map.md` §4 E6
  and `strata/brief.md` §6 both list six).
- **`carriesConstraintAt` (`L6135`), `constraintParked` (`L5961`) and `stateOf` (`L3320`) have no live call site** —
  a grep for each name returns only its own declaration. **`stateOf` is the surprising one**: the state part's
  accessor is never called by name, so the members reach the per-instance state another way, and **a wave that splits
  parts 4 and 7 must check that path is not a computed member before it assumes the edge `7 → 4` is the only one.**
- **The old declaration's part 9 line — *"the whole file, `L1–L2203`"* — is false twice**: the file is 2,213 lines and
  `D-13` cut it.
- **`homeAddressKey`'s doc block is 24 lines of argument about the mirror's key**, and the old carve left it behind in
  the delivery part while taking the 17-line function; §2 takes them together.
- **NOT everything moved, and the two exceptions are load-bearing for a sibling declaration**: `publish`'s two
  fault-injection anchors still resolve at their declared lines (`index.mjs:481` and `:623`, in parts 3 and 2 — §11 Q3),
  because **parts 2 and 3 are the two regions this re-issue measures as line-for-line unchanged**.

---

## §10 · What a reader should check first, and what would falsify this re-issued cut

**CHECK FIRST, in this order — each is cheap and each can kill a part:**
1. **The three `import.meta.url` facts.** **Stage the entry and its parts into another directory** and confirm rung two
   still finds `build/Release/storeroom_js_binding.node` beside the *entry*, rung one still resolves the platform
   package from the *entry's* directory, and rung one's version read still finds `package.json` there. **If any of the
   three follows a part's own URL, `I-29` is not an interaction but a defect** — the only edge whose failure is silent.
2. **`grep -n '^function\|^const \|^let ' bindings/js/src/entry/*.mjs` after the wave, against §1's per-part counts**
   (`8 / 2 / 19 / 26 / 32 / 31 / 9 / 24`). A declaration in two parts, or in none, means a region was mis-assigned.
3. **Every name a part uses but does not declare, resolved to a part below it in §3.1.** One edge pointing upward is a
   cycle; the check is mechanical and needs no run. **Grep `state\.` as well as `name(`** — the shared record's fields
   are not calls.
4. **The four drives' staged trees, before believing §4.2.** A publish cell that passes with `index.mjs` alone in the
   tree means the entry does *not* statically import its parts — which would falsify the whole premise.
5. **`node --test bindings/js/test/*.test.mjs` and the greens, at the layer each reports.**

**WHAT WOULD SHOW A BOUNDARY IS IN THE WRONG PLACE:**
- **A part that cannot be read without a second part's comments.** If `walk.mjs` is unintelligible without
  `class-decision.mjs`'s prototype census, the two are one part and `L1871→L1872` is a false boundary.
- **Any upward edge.** E.g. `boundaryReject` reached from part 3's own body, or `homeAddressKey` needed by part 3.
- **A `Reflect.apply`/alias call across a boundary that grep could not see**, whose first symptom is a
  `ReferenceError` at import — the loudest failure, and the one `D-1-ter`'s ordering exists to keep out of a tarball.
- **A test that must change for a reason other than a path.** If landing the cut forces a *behavioural* edit in any
  battery cell, the cut moved more than lines and the boundary is wrong.
- **The installed battery failing on a missing part** — that would mean §8's `files` consequence was declared right and
  landed wrong.

---

## §11 · Questions for the architect

**Q1 — three parts exceed 1,000 lines (1,400 · 1,337 · 1,155), and only two of them can be reduced without a code
change.** Part 6 splits cleanly at `L2799` (927 + 410); part 5 splits only with a two-declaration carve (594 + 561) and
its natural seam is a **measured cycle**; part 1 cannot be split at all — 1,310 of its 1,400 lines are one factory's
fourteen members closing over one local state, and separating them is a code change, not a move. **§5 prices both
splits and takes neither, because the part count is what `D-14`'s closed set and `drive-restaging.md`'s file set are
declared against, and taking one here would make a sibling declaration false in the pass whose purpose is that
declarations stop being false.** **Order the split and I will re-issue this file and `drive-restaging.md`'s counts
together.**

**Q2 — is `bindings/js/src/entry/` still the right home?** It is my choice and `D-13`/`D-15` confirmed it, and it is
not free of consequence: `bindings/js/src/` holds the addon crate's **Rust** and exactly one `.mjs`, so putting twelve
`.mjs` files under `src/entry/` states that the directory is *"the crate's Rust plus the entry's parts"*. The
alternatives are `bindings/js/parts/` (a sibling, unambiguous, but the kernel's parts sit one directory from the
barrel) and the package root (beside `index.mjs`, which makes `I-29` unnecessary at the cost of a root with thirteen
`.mjs` files). **The reason to keep `src/entry/` is `D-14`'s mechanism**: one non-recursive glob stages all twelve only
because they share one directory.

**Q3 — the four drives' staging is a consequence, but it is the one place this cut's blast radius reaches a battery's
fixtures.** `D-1-ter` already priced the shape (*"they must either stage the integrated set or drop their kernel-only
limbs"*), so this is confirmation rather than a question. **And one measured piece of good news for
`docs/L1/drive-restaging.md`, which is not re-issued in this pass: `publish`'s two fault-injection anchors STILL RESOLVE
AT THEIR DECLARED LINES.** `MUTATION_SITE` needs `addonArm = { status: 'FilePathUnreachable', message:
mismatchArmMessage(candidate, name) };` — which is `index.mjs:481` at HEAD (read), inside `loadAddon`, **part 3** — and
`FAIL_SITE` needs `throw { status: refusal.status, message: refusal.message, log: refusalLog(log) };` — which is
`index.mjs:623` at HEAD, inside `fail`, **part 2**. **Parts 2 and 3 are the two regions this re-issue measures as
unchanged, which is why the anchors survive.** What does change is *which file carries them after the wave* (part 3's
and part 2's own files), which is `drive-restaging.md` §3.1.1 rule 2's subject and not this declaration's. **Should the
next pass re-issue `drive-restaging.md` against HEAD (its `:2,203`-line and `:5,903`-line citations, and its twelve-part
count if §5's splits are ever taken), or is that the wave's own first act?**
