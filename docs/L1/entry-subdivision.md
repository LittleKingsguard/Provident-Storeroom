# L1 entry subdivision — `bindings/js/index.mjs`, and the kernel's integration into it

**WHAT THIS FILE IS.** The declaration of **the cut** the architect sanctioned in `strata/decisions.md` **`D-2`**
(*"Index.mjs is already too long and should be subdivided anyway for readability"*) and of **where the constraint
kernel goes** in that cut, per **`D-1`** (*the kernel is tightly integrated, not an external import*). It names
**nine parts**, each with a target path, the line region it takes, what it owns, why the boundary falls there rather
than one line either side, and what it needs from its siblings — as a **DAG**. It states what happens to the lazy
`require_` at `index.mjs:5227`, to `bindings/js/src/constraint-kernel.mjs`'s six exports, and to the package's
`files`/`exports` **as consequences only**. It then states the ownership arithmetic the cut produces.

**THIS PASS MOVES NO CODE, WRITES NO CODE, EDITS NO MANIFEST, STARTS NO L2, AND COMMITS NOTHING.**
`D-1`, `D-2` and `D-3` each order no code move; `D-2` says *"How many parts, where the boundaries fall, and what
they are called is L1's to declare and an implementation wave's to land"*, and **`D-2` also says the map's five
declared regions are not blessed** — *"the regions that exist are the ones the current file implies, and nothing in
`D-2` blesses them as the cuts to take"*. So the five regions are taken here as a **starting point and audited**, and
three of them are re-cut.

**WHAT THIS FILE REPLACES, NAMED AT EACH SITE RATHER THAN ABSORBED.** `docs/L1/module-map.md` §5.1 recorded *"no
single module can own `index.mjs` until the regions are physically separable — and this map does not order that
separation"*; `D-2` superseded the second clause and left the first as the tree's state. **This file supersedes the
first clause too, as a declared target:** after the cut, `index.mjs` is owned by exactly one module and the
co-ownership of §5.1 has no subject. **The tree is unchanged by that supersession** — every figure below is either a
fact measured on this branch or is marked `target`, and the map's `owns` lists are left stating the tree as it is,
with §2.3 and §5.1 carrying the target beside them.

**MEASUREMENT — WHAT WAS READ, AND HOW.** No shell, no run. `index.mjs` (5,903 lines) and
`src/constraint-kernel.mjs` (2,203 lines) were **surveyed by structure, not read end to end**: a declaration-site
grep (`^import|^export|^const|^let|^function|^class|^async function`) returned **148 top-level declarations** in
`index.mjs` and **62** in the kernel, each with its line number; the region banners were found by their own
`---`/`═══` rules (26 in `index.mjs`, 22 in the kernel); and the **boundary zones were read at the bytes**:
`index.mjs` L1–110, L298–342, L548–760, L1830–1900, L1940–2010, L2960–3080, L3380–3449, L4550–4609, L4762–4831,
L4995–5114, L5140–5340, L5405–5524, L5834–5903; `constraint-kernel.mjs` L1–100, L168–197, L374–423, L1000–1013;
`bindings/js/package.json` whole. **The interior of every span not in that list was not read**, and no behaviour was
executed. §7 is the honest ledger.

---

## §1 · The cut — nine parts

| # | part | target path | line region taken | owner module | lines |
|---|---|---|---|---|---|
| 1 | **the entry and the fourteen members** | `bindings/js/index.mjs` (**unchanged path**) | `L1–L87` (file header, the four node imports, `require_`, `ADDON_PATH`), `L3406–L4577` (the surface banner, `storeCreate` with the fourteen members, the three `MOVED` markers), `L5901–L5903` (the module-namespace statement) | `js-surface` | 1,262 |
| 2 | **the one failure form** | `bindings/js/src/entry/refusal.mjs` | `L565–L645` (`fail`, `refusalLog` and their doc blocks) | `js-resolution` | 81 |
| 3 | **the artefact meeting** | `bindings/js/src/entry/artefact.mjs` | `L301–L564` (the resolution rule banner, `PLATFORM_NAMES`, the three rungs, `absentSubject`, `generatorFilePathUnreachable`, `mismatchArmMessage`, `addonLoadMessage`), `L646–L716` (`withAddon`, `spellDottedContainer`, `boundaryReject`) | `js-resolution` | 335 |
| 4 | **the package's own state** | `bindings/js/src/entry/state.mjs` | `L88–L300` (seven well-known symbol keys — `CHECKED_OFF`, `SETTLED_ON_THE_PASSING_ARM`, `SAVE_FAILED_AT_THE_TERMINAL_ARM`, `TERMINAL_ARM`, `FORGET_PAIR`, `ATTEMPT_COUNT`, `ATTEMPT_OPENED` — and the attempt seam: `ATTEMPT_INDEX`, `attemptIndex`, `openCommit`, `closeCommit`, `installAttemptSeam`), `L3067–L3405` (`INSTANCES`, `STORE_INDEX`, `STORE_RETIREMENT`, `crossTriggered`, `handlesOf`, `stateOf`, `notFoundRendering`, `entryOf`, `isStoreReceiver`, `carryRefusal`, `commitFile`, `listedSegments`, `writeRefusal`) — **plus `homeAddressKey`, `L4780–L4796`, moved down out of part 7** | `js-registry-delivery` | 569 |
| 5 | **the class decisions** | `bindings/js/src/entry/class-decision.mjs` | `L717–L1871` (the class-decision banner, the prototype censuses, `protoClass`, `accessorOrSymbolArm`, `arrayClass`, the conversion-member arms, the guard-tripped renderers, `valuePosition`, `valueTargetSpelling`, `valueReject`, `shapeArmClass`) | `js-crossing` | 1,155 |
| 6 | **the walk's encoders and decoders** | `bindings/js/src/entry/walk.mjs` | `L1872–L3066` (the crossing-model banner, `ENCODER_CEILING`/`NODE_CEILING`, `refusedValue`, `refusedAsClass`, `isCanonicalArrayIndex`, `encodeValue`, `encodeSegment`, `encodeAddress`, `encodeTier`, `encodeOpId`, `handleWire`, `encodeFilePath`, `encodeJournalLength`, `encodeListeners`, `encodeConstraints`, `encodeConfig`, `decodeValue`, `decodeSegment`, `decodeSegments`, `decodeBaseState`, `decodeJournalOp`) | `js-crossing` | 1,195 |
| 7 | **the delivered set and the terminal arm** | `bindings/js/src/entry/delivery.mjs` | `L4578–L5186` (**except `L4780–L4796`**): `commitPositionRefusal`, `deliver`, `inDomainAddress`, `isLawfulListenerElement`, `registerOn`, `constraintAtAnyAddress`, `terminalArm` | `js-registry-delivery` | 592 |
| 8 | **the constraint members' glue** | `bindings/js/src/entry/constraints.mjs` | `L5187–L5900` (the constraint-section banner, `constraintsKernel`, `KC_TOKENS`, `constraintPairKey`, `addressSetKey`, `constraintRefuse`, `withEmptyLog`, `constraintArity`, `constraintSite`, `carryConstraint`, `registrationCrossing`, `constraintParked`, `withdrawStanding`, `restoreHeldPair`, `constraintUncarried`, `enumerateConstraints`, `carriesConstraintAt`, `constraintWrite`, `KERNEL_REFUSAL`, `isKernelBuiltRefusal`, `constraintCrossing`) | `js-constraints` | 714 |
| 9 | **the constraint kernel** | `bindings/js/src/constraint-kernel.mjs` (**unchanged path**) | the whole file, `L1–L2203` | `js-constraints` | 2,203 |

**The partition is exact and closed.** 1,262 + 81 + 335 + **569** + 1,155 + 1,195 + **592** + 714 = **5,903** ✓ —
the file's own last line. No line of `index.mjs` is unassigned and none is claimed twice; the only two figures that
are not a contiguous range are part 4's `+17` and part 7's `−17`, which are the single function §2 says changes
region.

**Two things the table's function lists do not mean, stated because a reader would otherwise infer them.** (1) **A
listed name is a line region's content, not a claim that the name survives unchanged**: part 8's list includes
`constraintsKernel` and the `let KERNEL` cache, and **§4.2 declares that the integration retires both** — the cut
takes their lines and the kernel's integration removes them, in one wave. (2) **Every part imports the node builtins
it uses for itself** (`node:util`'s `types` for the class decisions and the terminal arm's proxy test, `node:fs`'s
`readFileSync` for the artefact part, `node:path`/`node:url` for the parts that spell a path): `L79–L87`'s bindings
are **the entry's own copy**, and what crosses to part 3 is the three *derived path values*, never an import (§2,
`I-29`).

**`index.mjs` keeps its path and its one export.** A thin re-export shell (`export { storeCreate } from
'./src/entry/members.mjs'`) was considered and refused: the package's *one arms-bearing entry* (`DD-24`) is the
surface, the shipped file that publishes it should hold it, and a shell would move the `export` site off the file
every battery cell, and every greens runner, reaches by path — every one of those reaches would then depend on an
indirection that buys no legibility. **The entry is 1,262 lines after the cut, from 5,903.**

---

## §2 · Why each boundary falls there, and not one line either side

**Part 2 / part 3 — the boundary is `L645→L646`, inside the map's "failure form" region `L618–L746`.**
`fail` (618) and `refusalLog` (642) depend on **nothing**: `fail` reads `status` and `message` off a handed value
and throws the one plain object; `refusalLog` returns an array or `[]`. `withAddon` (646) is the artefact gate and
**throws through `fail`**; `boundaryReject` (700) renders through the loaded artefact's generator and **calls
`withAddon`**. **This cut is refused on readability, not on dependency — and the honesty matters because `D-2`'s
ground IS readability.** The region taken whole (`L618–L746`, or the whole `L79–L746`) would in fact be
**self-contained** and would close no cycle (§3.2 case 1 proves it, so no cycle is claimed here). What is wrong with
it is what a reader meets: a part named for the artefact meeting would also own **the package's single refusal
form**, and that form is the most-imported thing in the family — **every part except the kernel imports the form or
the rejection** — while the gate's private mutable state (`let addon`, `addonLoadError`, `addonArm`, `rungOneName`,
`tried`, `loadedFrom`: `L399–L417`) is nobody else's business. **Two subjects, two files; `L645` is `refusalLog`'s
closing brace and `L646` is `withAddon`'s first line, so no statement straddles the cut.**

**Part 3 — why the gate and the rejection are one part, and why `spellDottedContainer` travels with them.**
`boundaryReject`'s entire dependency set is `withAddon()` (the loaded artefact), `addon_.errorMessage` (the store's
own generator), `ADDON_PATH` (for the one arm where the generator is absent) and `spellDottedContainer` (the
container's dotted spelling). Those four are the artefact meeting's own facts and nothing else in the file uses
them. **The alternative — `boundaryReject` with the walk, which is where `A76`'s rejection is described — puts a
function that calls `withAddon` above the walk and gives the artefact part a dependency on the walk; the DAG then
has `artefact → walk → artefact`.**

**Part 1 — why the module context stays in the entry, and this is the cut's highest-risk edge.**
Three facts today are computed from **`index.mjs`'s own `import.meta.url`**: `ADDON_PATH` (`:85–86`, rung two's
module-relative artefact), the `createRequire` base (`:85`, rung one's `require_(name)` at `:441` and rung two's
`require_(ADDON_PATH)` at `:491`), and `packageVersion`'s manifest path (`:359`, the rung-one version comparison).
**A part that computed them from *its own* `import.meta.url` would search `bindings/js/src/entry/` for the addon,
for the manifest and for the platform packages** — a silent change of the resolution domain that `resolution.md
§2.1`/`§3.2` declares over the *entry's* directory. So `L79–L87` stays in the entry and the three derived facts are
**handed to part 3** (declared as a value interaction, map §3.1 `I-29`).

**Part 4 — why the symbol-key block and the attempt seam sit with the per-instance state.**
`L88–L300` declares seven well-known keys (`CHECKED_OFF`, `SETTLED_ON_THE_PASSING_ARM`,
`SAVE_FAILED_AT_THE_TERMINAL_ARM`, `TERMINAL_ARM`, `FORGET_PAIR`, `ATTEMPT_COUNT`, `ATTEMPT_OPENED`) and the
attempt accounting (`ATTEMPT_INDEX` + `installAttemptSeam`), and the second block adds an eighth (`STORE_INDEX`,
`:3085`). **Every one of them is read or written through an instance object or a commit record — the package's own
per-instance state** — and the region the map gave them
(`L88–L200`, `L201–L331`) lay *inside* `js-resolution`'s claimed `L79–L617` while `js-registry-delivery` claimed
the same bytes. **That overlap is measured, not supposed:** §2.3 of the map lists `L79–L617` for `js-resolution`
and `L88–L200` **and** `L201–L331` for `js-registry-delivery`. The cut removes the overlap by moving both blocks
down to the state part, where their only consumers already are.

**Part 4 also gains `homeAddressKey` (`L4780–L4796`), and this is the one function that changes region.**
It is **the listener mirror's key** — its own doc block says so: *"it is this factory's own closure, like `tokens`
and `registry`"* — and its consumers are the mirror's pushes (entry `:3830`, `registerOn` `:4956`), the pair check
(`constraintAtAnyAddress` `:5006`) and **the address set's canonical spelling** (`addressSetKey` `:5262`, in the
constraint glue).
Left where the map puts it (the delivery region), the constraint glue would import the delivery part and the DAG
would read *the constraint pass depends on the terminal arm* — false in the mechanism, where the pass runs **before**
the arm. **It is one function, 17 lines, and the edge it removes is the cut's second cycle.**

**Parts 5 / 6 — the boundary is `L1871→L1872`, the walk's own banner.** The class-decision half **only classifies**:
it reads a value's class, records the walk's first fault and renders the boundary refusal through `valueReject`;
it needs the artefact part (`boundaryReject`) and nothing above it. The encoder/decoder half **builds the carrier
tree**: it consumes `hasLoneSurrogate`, `classSpelling`, `protoClass`, `arrayClass`, `isAdmittedArray`,
`isPlainObjectValue`, `accessorOrSymbolArm`, `carriesConversionMember`, `carriesTagMember`, `valuePosition` and
`valueTargetSpelling` — every one of them declared above the banner — and produces nothing the class half reads.
**The dependency runs one way, 747→1871 → 1872→3066, and the map's single `js-crossing` region `L747–L3070` splits
cleanly at the banner the file itself drew.** One line higher would mix `shapeArmClass` (the class arms' spelling)
into the encoders; one line lower would put `ENCODER_CEILING`/`NODE_CEILING` above the class predicates that use
neither.

**Part 7 — why `writeRefusal` stays in the state part while its one caller is in the entry.**
`writeRefusal` (`L3399–3404`) composes `valueReject` (class decision) with `fail` (the form) and is called once, at
`:3660`, by the write member. It sits on the state part's side of the `3405→3406` boundary because the map's region
`L3072–3424` carries it and because it is a *refusal composition*, not a member; **the cost is declared rather than
hidden: the entry part imports it (an inter-part edge, inside one module) and nothing else does.** One line either
side is therefore a judgement, and it is the only function in parts 4 and 7 whose caller is not in its own part.

**Part 8 — the constraint glue keeps the map's region `L5202–L5903`, re-drawn at `L5187–L5900`.**
The banner at `L5187–L5189` is the section's own (`═══`), and `L5901–L5903` is the module-namespace statement —
*"THE MODULE NAMESPACE CARRIES ONE NAME, `storeCreate` ALONE"* — which is a statement about **the entry**, not about
the constraint members, so those three lines travel up to part 1. **Nothing else in the region moved**: the five
members' glue, the two crossings, the pair keying and `constraintWrite` are one subject.

**Part 9 — the kernel's own file, whole.** See §4. Its internal boundaries were surveyed (22 banners; 62 top-level
declarations) and are **not** cut here: §8 puts that question to the architect rather than inventing a second cut.

---

## §3 · The dependency DAG, and the cycles this cut refuses

### §3.1 The DAG, part by part

**The arrow points at what is *needed*.** Every edge below was measured by grep over call sites
(`name(`), not by reading 8,000 lines; §7 states the method's blind spots.

```
1 entry (js-surface)  → 2,3,4,5,6,7,8,9
2 refusal (js-resolution) → (nothing)
3 artefact (js-resolution) → 2
4 state (js-registry-delivery) → 2, 3, 5, 6
5 class-decision (js-crossing) → 3
6 walk (js-crossing) → 3, 5
7 delivery (js-registry-delivery) → 2, 4, 5, 6
8 constraints (js-constraints) → 2, 3, 4, 9
9 kernel (js-constraints) → (nothing)
```

**Each part's needs, stated so the part is readable alone:**

- **1 entry** needs: `withAddon`/`boundaryReject` (3), `fail` (2), `stateOf`/`installAttemptSeam`/`openCommit`/
  `closeCommit`/`homeAddressKey`/`writeRefusal` (4), `valueReject`/`classSpelling` (5), the encoders and decoders
  (6), `deliver`/`registerOn`/`terminalArm`/`commitPositionRefusal`/`isLawfulListenerElement` (7), the constraint
  glue (8), and `constraintsKernel().register` / `.remove` at `:3995`, `:4089`, `:4156` (9).
- **2 refusal** needs **nothing** — no import of any sibling, no node builtin.
- **3 artefact** needs `fail` (2) and the entry's three derived path facts (handed in, `I-29`).
- **4 state** needs `fail` (2), `boundaryReject`/`withAddon` (3), `classSpelling` (5), and `decodeValue`/
  `decodeSegments` (6).
- **5 class-decision** needs `boundaryReject` (3) — and nothing else outside itself.
- **6 walk** needs `boundaryReject` (3) and eleven class predicates (5).
- **7 delivery** needs `fail` (2), the state accessors (4), `inDomainAddress`'s three class predicates (5), and
  `encodeAddress`/`encodeOpId` (6).
- **8 constraints** needs `refusalLog` (2), `withAddon` (3), `entryOf` (4) and the kernel's six names (9).
- **9 kernel** needs **nothing** — zero imports today, and §4.4 says why that must stay true.

**Two parts reach the kernel directly (1 and 8), and that is declared rather than tidied.** `storeCreate` calls
`constraintsKernel().register` twice (`:3995` `addConstraint`, `:4089` `constraintOn`) and `.remove` once
(`:4156` `removeConstraint`) inside its own member bodies; the glue calls it four times (`:5426`, `:5542`, `:5599`,
`:5720`). **Seven call sites in total — the map's §4 E6 and the brief's *"six call sites"* are both short by one,
missing `:5720`** (`const constraint = constraintsKernel();` at the head of `constraintWrite`). Routing the three
member-side calls behind the glue would unify the seam, **but it moves `try`/`catch` frames that today wrap
`registrationCrossing` and `restoreHeldPair`**, so it is a code change this declaration does not order: the rule it
does declare is **no third part reaches part 9**.

### §3.2 The candidate cuts that would close a cycle, shown and refused

1. **"The failure form is one part"** — `fail` + `refusalLog` + `withAddon` + `boundaryReject` kept together, and
   with the ladder too, as the map's `L79–L746` reads. **`boundaryReject → withAddon → fail` is internal to the part,
   and the part's only outgoing edge would be the ladder's own (`loadAddon`, `addonLoadMessage`), so nothing
   cycles.** It is not refused on dependency but on **legibility**: it makes the form unfindable and puts the gate's
   mutable module state in scope of every refusal consumer (declaration §2). **Recorded this way deliberately** — a
   cycle that does not exist must not be manufactured to justify a cut.
2. **"`boundaryReject` belongs with the surface"** (its `A76` description is in the surface's own words). Then
   `5 class-decision → 1 entry` for `valueReject`, while `1 entry → 5` for the write member's fault check:
   **a two-part cycle.** Refused.
3. **"`homeAddressKey` stays in the delivery part"**: `8 constraints → 7 delivery` (for `addressSetKey`) and
   **no edge back**, so it is not a cycle — but it makes the constraint glue depend on the part that owns the
   terminal arm, i.e. **the pass depending on the act it precedes.** Refused on the mechanism, and the fix is the
   17-line move into part 4.
4. **"Keep `fail` in the part owned by `js-surface`"** — a *module*-level cycle, not a part cycle: part 3
   (`js-resolution`) imports part 2, and part 1 (`js-surface`) imports part 3, so the modules point both ways while
   the parts stay a DAG. **Refused: the map's interaction table would then need `js-surface ↔ js-resolution`.** The
   cost is §4.3's re-homing: the failure form's **module** changes.

---

## §4 · The kernel's integration — `D-1` inside `D-2`

### §4.1 Where the kernel's content goes

**Into part 9, at its existing path `bindings/js/src/constraint-kernel.mjs`, as a statically-imported part of the
subdivided entry.** `D-1` rules the kernel *"tightly integrated"*; `D-2` rules that a file already too long is the
wrong destination for 2,203 more lines. **The two compose: the kernel is not appended to `index.mjs`, it becomes a
part of the entry family, and the entry reaches it by a relative import like every other part.**

**The file does not cease to exist, and it does not become "thin".** It stays 2,203 lines and stays one file. What
changes is its **status**:

| | today | after the cut |
|---|---|---|
| how the entry reaches it | `require_('./src/constraint-kernel.mjs')`, lazily, on the first constraint act (`:5227`) | `import` of part 9 by part 8 and part 1 |
| its role | a separately-reachable module published as the **fourth `files` entry** | **the ninth part of the entry family**, required by the entry, published for nobody |
| its six exports | six `export` sites (L486 `register`, L1008 `commit`, L1158 `runAttempt`, L2063 `log`, L2075 `report`, L2111 `remove`) | **the same six `export` sites, unchanged** — module-level names its siblings import |
| its published export set | none since `D-1` (`exports` publishes `"."` alone) | none, and now not even a tarball carries the file for a caller to reach |

**The six exports are not deleted and not made private.** `D-1` says a tightly integrated kernel *"publishes no
export set at all"*, and that is already true: `exports` names `"."` and nothing else, so no consumer has ever been
able to reach them (`package-entry.test.mjs:97` and `constraints-publication.test.mjs:1223` assert exactly that
three spellings of a kernel subpath are refused). **The six remain what they have been all along — the module-level
names the two shared helpers, the cells that import the file directly and nine greens runners rely on**
(`constraint-kernel-helpers.mjs:33`, `held-listener-identity-helpers.mjs:157`; §7 counts **21 non-`scratch/` files
reaching the path in code**). Making them `const`-internal would break those reaches and buy nothing: **an export
that no `exports` arm publishes is not a surface claim.**

### §4.2 The lazy seam at `:5227` — what it protected, and which drives still need it

**What it protected, in the code's own words** (`:5220–:5224`): *"the entry must still LOAD where nothing is staged
beside it — the publish and negative drives assemble trees carrying `index.mjs` alone — and a load-time import of
`./src/` would make every one of those trees unable to reach the artefact they were built to drive."*

**`D-12` is not what decides this — the cut is.** `D-12` permits the installed battery to pack a local tarball, and a
tarball carries whatever `files` carries, so that battery never had an `index.mjs`-alone tree and needs no laziness
either way. **The decisive fact is that the subdivision destroys the property the laziness bought: a tree carrying
`index.mjs` alone cannot load at all once the entry statically imports eight parts,** because a static relative
import is resolved at module-graph construction — before any constraint act, before the addon, before anything.
**So the laziness has no remaining subject, and the drives that relied on it must stage the part set instead of
being spared the `src/` directory.**

| drive | today | after the cut |
|---|---|---|
| `publish.test.mjs` — `makeScratch`/`coveredEnv` write a manifest beside a byte-for-byte copy of the entry (per `docs/L1/test-stratification.md` §2.6.2's measured citations) | an `index.mjs`-alone tree loads; the kernel is absent and never reached | **must stage the eight part files**; otherwise every cell fails at import, not at a constraint act |
| `publish-generators.test.mjs` — the same idiom with staged control copies | same | same |
| `version-stamp.test.mjs` — assembles `<scratch>/{package.json, index.mjs, node_modules/<platform>/…}` | same | same |
| `negative-generators.test.mjs`'s copy arm (`:1536–1572`) | the copy is the cell's **subject** (a name reach through the copy's manifest), not its route | the copy must carry the parts, or the subject is unreachable; **its embedded name must still not be re-spelled** (stratification §2.6.1 call 3) |
| `consumer-fix/scenarios.mjs` | reaches no entry today | unaffected |
| the installed battery (`D-10`/`D-12`, `tests/e2e/installed/`) | packs and installs a real tarball | **unaffected** — the tarball carries the `files` set, and this battery is now the instrument that falsifies a missing part row |
| the greens runners | reach `../index.mjs` where `src/` exists | unaffected |
| the `typecheck` stage | stages `package.json` + `index.d.ts` and compiles; no runtime import | unaffected |

**The consequence is also a gain, and it is declared because it is the diagnosis `D-1-ter` priced:** *"a tarball cut
in between is a tarball whose first constraint act throws."* After the cut there is no such window — an entry without
its parts **throws at import**, which names the missing file, instead of throwing at the first constraint act two
layers down. **The failure mode moves earlier and gets its own name.**

**`constraintsKernel()` the function disappears; the `let KERNEL = null` cache with it.** There is nothing to defer
and no second resolution to guard: **all seven call sites lose their gate** — the three member-side sites (`:3995`,
`:4089`, `:4156`) call the imported names directly from part 1, and the glue's four (`:5426`, `:5542`, `:5599`,
`:5720`) do the same from part 8. **The one thing the seam must not lose is `constraintWrite`'s `kernel` binding's
role** — `:5720`'s `const kernel` is used for `kernel.commit` (`:5723`) and `kernel.runAttempt` (`:5729`) inside one
`try`, and a namespace import keeps that shape exactly (`import * as kernel from '../constraint-kernel.mjs'`), while
the three member-side sites take the two names they use (`register`, `remove`).

**`KERNEL_HANDLE_PREFIX` (`:5216`) and `KC_TOKENS` (`:5235`) are untouched and need no seam at all** — they are
declared constants the entry already spells for itself, and `:5214` says so: *"`constraintsKernel()` is not reached
at all for this test."*

### §4.3 What the failure form's move does to the modules

**Part 2 (`refusal.mjs`) and part 3 (`artefact.mjs`) are owned by `js-resolution`, and this is a module-level
re-homing that must be said plainly.** The map gives *"render the single failure form"* to `js-surface` (§1 row 10,
§2.3's `L618–L746`). **The cause is the split §2 declares, and the chain is stated rather than implied:** once part 2
is its own file, its owner must be the module that also owns the gate it sits under — because **owning part 2 from
`js-surface` closes a two-module cycle** (part 3 imports part 2, and part 1 imports part 3 — §3.2 case 4) — and the
only alternative that avoids the re-homing is the merged part §2 refuses on legibility. **So `js-surface`'s
responsibility loses the failure form and `js-resolution`'s gains it**, and the failure-form **endpoint** moves from
`js-surface` (3 → 2) to `js-resolution` (3 → 4). **The endpoint total is unmoved at 61; the module total is unmoved
at 19.** `A75`'s fact — *"the registry, the opaque handle and the single failure form stay in JS"* — is untouched:
all three stay in JS.

`js-resolution`'s responsibility becomes: **"Name the platform packages, read the version stamp, run the three
ordered rungs, answer the one declared absent-addon refusal, and render the package's single failure form and its
boundary rejection through the artefact's own generator."**

### §4.4 What the cut must NOT do to the kernel

Three prohibitions, each from a contract or a ruling that outranks this pass:

1. **The kernel must keep an empty import footprint.** `kernel-surface.md §1` item 1 declares it — *"NOTHING — no
   `createRequire`, no addon path, no native module and no dependency of the module's own"* — and
   `constraint-kernel.mjs:18–21` states it again. So **part 9 imports no sibling part, not even the symbol keys it
   re-spells.** `§3.1` gives it no outgoing edge.
2. **The six `Symbol.for` keys stay declared on both sides.** The entry's own comments call the duplication the
   mechanism (*"the entry does not import the kernel to read it — the same well-known symbol is declared on both
   sides"*), and it is what keeps (1) true. **A tidying pass that collapses them into one home would make the kernel
   import the entry family and would break (1)** — refused here by name so no wave "improves" it.
3. **The `A112` ordering law is untouched.** Whether delivery already follows the constraint pass stays `OWED` a
   measurement (`D-1-bis`, brief §6). **This cut moves lines; it does not measure and does not re-spell the law.**

---

## §5 · What this does to the shipped package — consequences, not edits

**`delivery` owns these bytes and none is edited here.**

- **`files` (`bindings/js/package.json:34–39`).** Today four rows: `index.mjs`, `README.md`, `index.d.ts`,
  `src/constraint-kernel.mjs`. **After the cut the entry requires eight more files by relative import, so all eight
  must ship** — `src/entry/refusal.mjs`, `artefact.mjs`, `state.mjs`, `class-decision.mjs`, `walk.mjs`,
  `delivery.mjs`, `constraints.mjs` (seven) *and* `src/constraint-kernel.mjs`, which stops being "the separately
  reachable fourth entry" and becomes "a file the entry requires like the rest". **The shape is
  `4 + 7 = 11` rows by reachability, and the number is a consequence, not a declaration**: `D-3` retired the count
  and `D-4` made the shape *"determined empirically — by `delivery` together with the e2e/blind scenario testing"*,
  so **no allowlist question goes to the architect** and the instrument that answers it is the installed battery
  (`tests/e2e/installed/`, `D-10`/`D-12`), whose `INSTALL-02` already carries reachability in place of the retired
  count. `D-3` also states that nothing licenses a glob, a wildcard or a directory row; **whether `src/entry/` may be
  named once instead of seven times is not decided here and is delivery's with its evidence.**
- **A supersession inside `D-1`, named.** `D-1` says the fourth `files` entry *"has no subject"*. Read through
  `D-2`: **it has no subject as a published module and a full subject as a required file.** The row survives, on a
  different ground. **This is the one place where `D-2` changes what `D-1` predicted, and it is the opposite
  direction from what the brief anticipated**: the brief's §6 said *"the lazy reach and the fourth entry are a
  superseded configuration"* — the lazy reach is gone, the fourth entry is not.
- **`exports` (`:27–32`) is unmoved.** One arm, `"."` → `{types: ./index.d.ts, import: ./index.mjs}`. **No part may
  be added to it**: an `exports` arm for an internal part would republish the kernel's names and re-create the
  boundary `D-1` dissolved. **The deep-subpath refusals the batteries assert survive** — they are `exports`'s, not
  `files`'s, so `./src/constraint-kernel.mjs` is refused as a subpath whether or not the file ships.
- **Load footprint.** The entry's module graph grows by ~2,200 lines of kernel at import. This is the price of
  integration and it is `D-1`'s, not the cut's: **the entry already enters the kernel on every four-position write**
  — `index.mjs:3578–:3590` records that the entry→kernel edge is *unconditional* since 2026-10-18 — and the mechanism
  is declared unconditional (`D-1-bis`). **What the cut removes is the deferral, not a decision to use the kernel.**
- **`version` (`0.5.0`) and the five exact `optionalDependencies`** are untouched. **Nothing here authorises a
  release**, and `D-1-ter`'s ordering stands: the code integrates first, the allowlist follows it, and no release is
  cut in between.

---

## §6 · What the module map becomes

### §6.1 The arithmetic

| | before the cut | after the cut |
|---|---|---|
| modules | 19 | **19** (none added, none removed) |
| endpoints | 61 | **61** (one **moves**: the failure form, `js-surface` 3→2, `js-resolution` 3→4) |
| interactions (tree) | 27 (I-11 vacated, I-1…I-28) | 27 in the tree; **four declared-target rows** `I-29`…`I-32` (§3.1 of the map) |
| tracked paths | 126 | **134** — arithmetic, `126 + 8` new part files; **not measured** (§7) |
| paths owned by exactly one module | 105 | **114** (105 + the 8 new parts + `index.mjs`, which stops being co-owned) |
| co-owned paths | 1 (`bindings/js/index.mjs`, five modules) | **0** |
| unowned with a reason | 20 | 20 |
| reconciliation | 105 + 1 + 20 = 126 | **114 + 0 + 20 = 134** ✓ |

**Who gains a whole file, and who loses a region:**

| module | gains | loses | files after |
|---|---|---|---|
| `js-surface` | `bindings/js/index.mjs` **whole** (was 3 of 5 co-owned regions) | its `L618–L746` region and its `L3425–L4593` region, both re-cut into parts 1–3 | 1 |
| `js-resolution` | `src/entry/refusal.mjs`, `src/entry/artefact.mjs` (both new) | its `L79–L617` region, which was **overlapping** `js-registry-delivery`'s two blocks | 2 |
| `js-crossing` | `src/entry/class-decision.mjs`, `src/entry/walk.mjs` (both new) | its `L747–L3070` region | 2 |
| `js-registry-delivery` | `src/entry/state.mjs`, `src/entry/delivery.mjs` (both new) | its four regions, `L88–L200`, `L201–L331`, `L3072–L3424`, `L4594–L5200` | 2 |
| `js-constraints` | `src/entry/constraints.mjs` (new; its `L5202–L5903` region, re-drawn `L5187–L5900`) | nothing — it keeps `src/constraint-kernel.mjs` | 2 |
| the other 14 modules | nothing | nothing | unchanged |

**The co-owned `index.mjs` entry of §5.1 disappears; it does not become "a list of files".** The one path that was
co-owned by five modules becomes **one** path owned by **one** module, and the five regions are replaced by eight
files each owned once. **That is the whole of what `D-2` buys the map's ownership arithmetic**, and it is why the
module count does not move: `D-1` had already folded two file-owners into one module, and `D-2` frees the *regions*
without freeing a module.

### §6.2 The interactions that cross a part boundary

**Four are new across module lines, and every one is declared rather than left implicit** (map §3.1; they are
`target` — no such edge exists in the tree until the wave lands):

| # | from | to | over what surface |
|---|---|---|---|
| `I-29` | `js-surface` (part 1) | `js-resolution` (part 3) | **the entry's module context** — `ADDON_PATH`, the `createRequire` base and the manifest path, all derived from `index.mjs`'s own `import.meta.url` and handed in, so the rung-2 artefact, rung-1 resolution domain and the version read keep their declared directory |
| `I-30` | `js-crossing` (parts 5, 6) | `js-resolution` (part 3) | `boundaryReject` — the walk's own `A76` rejection, rendered through the artefact's generator at eleven call sites (`:1856`, `:2288`, `:2307`, `:2326`, `:2379`, `:2452`, `:2513`, `:2604`, `:2726`, `:2815`, `:2958`) |
| `I-31` | `js-registry-delivery` (part 4) | `js-resolution` (parts 2, 3) | `fail` in `carryRefusal`/`writeRefusal`, `boundaryReject` in `stateOf`, and `withAddon` in `entryOf` — the state part's four uses of the artefact meeting |
| `I-32` | `js-constraints` (part 8) | `js-resolution` (parts 2, 3) | `refusalLog` in `registrationCrossing`/`constraintCrossing` and `withAddon` in `registrationCrossing` |

**Part-boundary edges *inside* one module are not module interactions and are not added to §3**: they are the DAG in
§3.1 above, which is the place a reader should go for them. **`I-11` stays vacated** and is not reused (`D-1` cites
it by number). **`I-4` (`js-surface → js-constraints`) gains the three member-side kernel calls** it now carries —
`:3995`, `:4089`, `:4156` — as a restatement at its own row rather than a fifth new interaction.

### §6.3 What changes in `docs/L1/module-map.md` and `docs/L1/modules.json`

**`modules.json`'s `owns` lists are left stating the tree as it stands** — every path it names exists on this
branch, the eight new paths do not, and a JSON that listed target paths as owned would make the map assert something
false about the tree. **The declaration is carried in the fields that are prose**, exactly as `D-3`/`D-4`/`D-8` were
carried into `delivery`'s allowlist endpoint:

- `js-resolution` — `responsibility` gains the failure form and the boundary rejection (with the `D-2` pointer);
  `loadAddon`'s `input` gains the module-context sentence; a fourth endpoint (`the failure form`) moves in from
  `js-surface`; `interactions` gains `js-crossing`, `js-registry-delivery`, `js-constraints`.
- `js-surface` — `responsibility` loses the failure form; its third endpoint moves to `js-resolution`.
- `js-crossing`, `js-registry-delivery`, `js-constraints` — `responsibility` carries the part names and the target
  paths; `interactions` gains `js-resolution` where §6.2 declares it; `js-constraints` carries the kernel's new
  status (a part, not a published module).
- `delivery` — the `files` allowlist endpoint carries the reachability consequence of §5 (read through `D-3`/`D-4`,
  decided by `delivery` with the installed battery, not by this file).
- `js-battery` — its endpoint's mention of the kernel at its checkout home is **unchanged**: the path does not move,
  so no cell re-points because of the cut. **The drives' staging is its own change** (§4.2) and lands with the wave.

---

## §7 · Measured, concluded, and not verified

**Read at the bytes** (site named in the body): the 148 `index.mjs` top-level declaration sites and their line
numbers; the 62 kernel declaration sites; the 26 + 22 region rules; the `Symbol.for` keys — **six declared on both
sides** (the entry's `:108`, `:126`, `:139`, `:166`, `:183`, `:5840` answering the kernel's `:97`, `:113`, `:135`,
`:148`, `:2192` and `:138`, the last five named and the sixth spelled inline), plus three the entry declares for
itself (`:201`, `:202`, `:3085`); the seven `constraintsKernel()`
call sites (`:3995`, `:4089`, `:4156`, `:5426`, `:5542`, `:5599`, `:5720`); the module-context three
(`:85`, `:86`, `:359`) and their four uses (`:441`, `:491`, plus `:5227`); `bindings/js/package.json` whole; the
kernel's empty import footprint (`constraint-kernel.mjs:18–21`, its own statement); the boundary zones listed in the
header; `homeAddressKey`'s doc block and its three consumer sites (`:3830`, `:4956`, `:5006`, `:5262`); and the
non-`scratch/` files that name `src/constraint-kernel.mjs` (measured by grep, **counted by file**: **21 reach it in
code** — 11 under `bindings/js/test/` (the two helpers, `file-tier-save`, `-properties`, `surface`, `json-crossing`,
`constraint-kernel-repairop`, `package-entry`, `constraints-publication`, `publish`, `publish-generators`), 9 under
`bindings/js/greens/`, and `index.mjs:5227`; **27 name it in all**, the other six mentioning it only in a comment —
plus ~90 sites under `scratch/`, which is outside ownership by convention, map §5.4).

**Concluded, not measured:**

1. **That each part is "independently readable."** The dependencies are measured; the *coherence* of each grouping
   is my judgement, exactly as the map's §7 marks its own five-region judgement.
2. **That the call graph is complete.** Edges were found by grep for `name(`, which finds **direct named calls
   only**. A call through a variable, a destructured alias, a computed member, a closure or `Reflect.apply` would be
   invisible to it — and this file *does* call the store indirectly (`Reflect.apply(entryOf().read, this, args)` at
   `:3550`), so the risk class is real rather than theoretical.
3. **The `files` shape (11 rows).** Reachability arithmetic on a manifest I read; **not** a measured publish.
4. **That the four drives copy `index.mjs` alone.** Taken from `docs/L1/test-stratification.md` §2.6.2's citations
   of `publish.test.mjs:711–715`, `version-stamp`'s tree and `negative-generators:1536–1572`; **I did not re-read
   those fixtures.**
5. **That `134` is the tracked path count.** `126` is a supervisor-measured figure (map FIGURES); **`134` is
   arithmetic on it and is owed a `git ls-files` check** — and if `strata/decisions.md`'s own tracked status (which
   the map marks unverified) resolves positive, the denominator moves again, to 135.

**Measured and recorded because they contradict a document:**

- **`constraintsKernel()` has seven call sites, not six.** `module-map.md` §4 E6 and `strata/brief.md` §6 both
  list `:3995`, `:4089`, `:4156`, `:5426`, `:5542`, `:5599`; **`:5720` (`constraintWrite`'s `const kernel =
  constraintsKernel();`) is the seventh.**
- **The map's `js-resolution` region `L79–L617` overlaps `js-registry-delivery`'s `L88–L200` and `L201–L331`.** Two
  modules claim the same bytes today; the cut removes the overlap and §2 says how.
- **Four files carry the four-name `files` array, at five sites**: `publish.test.mjs:2284` and `:2516`,
  `publish-generators.test.mjs:1273`, `constraints-publication.test.mjs:1199`, `greens.mjs:1205`. `D-3`'s
  correction names **two asserted cells** (`P-PUB-7`, `JSG-12.18`). **Which of the five are assertions and which are
  generator inputs is the test layer's to say** — this pass records the population and does not resolve it, and it
  matters here because **under §5 every one of those five sites sees a manifest whose rows change meaning.**
- **`carriesConstraintAt` (`:5688`) has no live call site** — measured by grep for `carriesConstraintAt(`, which
  returns only its declaration, while `:3579` records that the gate it named was removed when the entry→kernel edge
  became unconditional. **It travels with part 8 unchanged; its disposition is no decision of this cut's.**

---

## §8 · What a reader should check first, and what would falsify this cut

**CHECK FIRST, in this order — each is cheap and each can kill a part:**

1. **The three `import.meta.url` facts.** **Stage the entry and its parts into another directory** — the shape the
   publish drives already mint — and confirm rung two still finds `build/Release/storeroom_js_binding.node` beside
   the *entry*, rung one still resolves the platform package from the *entry's* directory, and rung one's version
   read still finds `package.json` there. **If any of the three follows a part's own URL, `I-29` is not an
   interaction but a defect** — and this is the only edge in the DAG whose failure is silent rather than a
   `ReferenceError`.
2. **`grep -n '^function\|^const \|^let ' bindings/js/src/entry/*.mjs` after the wave, against §1's per-part
   function lists.** A function that appears in two parts, or in none, means a region was mis-assigned.
3. **Every name a part uses but does not declare, resolved to a part below it in §3.1.** One edge pointing upward
   is a cycle; the check is mechanical and needs no run.
4. **The four drives' staged trees, before believing §4.2.** A publish cell that passes with `index.mjs` alone in
   the tree means the entry does *not* statically import its parts — which would falsify the whole premise.
5. **`node --test bindings/js/test/*.test.mjs` and the greens, at the layer each reports** — §4.4's third point is
   that a green here measures nothing about `A112`.

**WHAT WOULD SHOW A BOUNDARY IS IN THE WRONG PLACE:**

- **A part that cannot be read without a second part's comments.** If `walk.mjs` is unintelligible without
  `class-decision.mjs`'s prototype census, the two are one part and `L1871→L1872` is a false boundary.
- **Any upward edge.** E.g. `boundaryReject` reached from part 3's own body, or `homeAddressKey` needed by part 3.
- **A `Reflect.apply`/alias call across a boundary that grep could not see**, which would show as a part importing a
  sibling that §3.1 says it must not. The first symptom would be a `ReferenceError` at import — the *loudest*
  failure, and the one `D-1-ter`'s ordering exists to keep out of a published tarball.
- **A test that must change for a reason other than a path.** If landing the cut forces a *behavioural* edit in any
  battery cell, the cut moved more than lines and the boundary is wrong — the stratification declares the reaches
  and their re-spellings, and the cut is not licensed to add a third kind of edit.
- **The installed battery failing on a missing part.** That would mean the `files` consequence (§5) was declared
  right and landed wrong — which is the failure the battery exists to catch, and it is why §5 does not decide the
  row count.

---

## §9 · Questions for the architect

**Q1 — is the kernel to be subdivided too?** The cut leaves `src/constraint-kernel.mjs` at **2,203 lines**, which is
larger than **every** part of the entry (the largest is part 1 at 1,262). `D-2`'s ground (*"too long … for
readability"*) would reach it, and the file has its
own seams: foundations (`KC`, the pair keying, `kernelFor`, the log appenders) · the `K-1`/`K-6` registration and
withdrawal machinery · the `K-2`/`K-3` attempt engine · the `K-4`/`K-5` readers. **I have not drawn that cut**, for
a stated reason: I surveyed the kernel at declaration sites and read four zones of it, and the two candidate halves
share the foundations and the pair rows — **a cut drawn on this evidence would be a guess dressed as a boundary.**
Should it be cut (and drawn by a pass that reads it), or is the kernel one part because `kernel-surface.md §1`'s five
items are one subject?

**Q2 — is `bindings/js/src/entry/` the right home for the parts?** The path is my choice and it is not free of
consequence. `bindings/js/src/` today holds the addon crate's **Rust** (`lib.rs`, `crossing.rs`, `codec.rs`,
`facade.rs`, `build.rs`'s target) and exactly one `.mjs` (the kernel). Putting seven more `.mjs` files under
`src/entry/` states that the directory is *"the crate's Rust plus the entry's parts"*; the alternatives are
`bindings/js/parts/` (a sibling, unambiguous, but the kernel would sit one directory away from its own family) and
the package root (beside `index.mjs`, which keeps `import.meta.url`-derived facts trivially right and makes `I-29`
unnecessary — at the cost of a root with nine `.mjs` files in it). **I chose `src/entry/` because the kernel's
path must not move (§7: 21 non-`scratch/` files reach it in code, so moving it would re-spell every one of them),
and keeping the family together is what `D-1`'s *"tightly integrated"* reads like in a tree.** Is that the
architect's reading too?

**Q3 — the two drives' staging.** §4.2 concludes the publish and version-stamp drives must stage the eight parts
rather than the kernel alone. `D-1-ter` already priced that shape (*"they must either stage the integrated set or
drop their kernel-only limbs"*), so this is a consequence rather than a question — **but it is the one place where
the cut's blast radius reaches a battery's fixtures rather than a source file, and I would rather it were confirmed
than assumed.**
