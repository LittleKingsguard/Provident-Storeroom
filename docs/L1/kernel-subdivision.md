# L1 kernel subdivision — `bindings/js/src/constraint-kernel.mjs`, cut at last

**WHAT THIS FILE IS.** The declaration of **the constraint kernel's internal cut** that the architect sanctioned in
`strata/decisions.md` **`D-13`** (*"Kernel can be cut"*), and of **where the kernel's parts live** — the one question
`D-13` answered for the entry and explicitly left open for the kernel (*"the kernel is not part of the entry's I/O
surface, so 'the parts' home' answers the entry's question and not necessarily the kernel's"*). It names **five
parts**, each with a target path, the line region it takes, what it owns and why the boundary falls there rather than
one line either side; it states the **DAG** and shows **which candidate cuts would close a cycle and why they are
refused**; it says what happens to **the six exports**; and it states the **ownership arithmetic** the cut produces.
The four drives' re-staging, which `D-14` couples to this cut, is declared in the sibling file
**`docs/L1/drive-restaging.md`**.

**THIS PASS MOVES NO CODE, WRITES NO CODE, EDITS NO MANIFEST, STARTS NO L2, AND COMMITS NOTHING.** `D-13` orders no
code move (*"It orders no code move, like `D-1` and `D-2`"*), and `D-14` opens no wave. Every path below except the
barrel's is a path **that does not exist on disk**.

**THE MEASUREMENT `D-13` REQUIRED, AND WHY IT COMES FIRST.** `D-13`'s first open item is a precondition, not a
detail: *"The subdivision pass **did not measure the kernel's internal graph** and said so; **its cut must be declared
against a measurement of that file, not guessed from its length.**"* `docs/L1/entry-subdivision.md` §9 Q1 declined
the cut on exactly that ground, and named four candidate halves from a declaration-site survey. **This pass takes the
measurement, and it does not simply confirm those four halves: the measurement moves two of the four boundaries**
(§2, §3.2).

**WHAT THIS FILE SUPERSEDES, NAMED AT EACH SITE RATHER THAN ABSORBED.**

1. **`docs/L1/entry-subdivision.md` §9 Q1** — *"is the kernel to be subdivided too?"* — is **CLOSED: yes**, by
   `D-13`, and the cut it declined to guess is drawn here.
2. **`docs/L1/entry-subdivision.md` §1 part 9** (*"the constraint kernel … the whole file, `L1–L2203`"*) and its
   §4.1 table row (*"the same six `export` sites, unchanged"*) are **superseded as to the file's internal state**.
   The part 9 **region** still covers `L1–L2203`; what changes is that it is no longer **one file**. The six export
   *sites* move (§4); the six module-level *names* do not, and the difference is the finding this pass exists to
   report — that pass predates `D-13`, which is why it could state the stronger sentence.
3. **`docs/L1/module-map.md` §6 Q6** (the kernel's own subdivision question) and **§6 Q7** (where the parts live) are
   **answered here**; the map carries the pointers.
4. **`docs/L1/module-map.md` §4 E6**'s paragraph *"its six exports stay exactly where they are"* is **corrected**:
   they stay module-level **names** reachable at the same **path**, held there by a re-export shell, and the export
   *sites* are four files.

---

## §1 · The cut — five parts and a barrel

| # | part | target path | line region taken | owns | decls | lines |
|---|---|---|---|---|---|---|
| **9a** | **the kernel's foundations** | `bindings/js/src/entry/kernel-foundations.mjs` | `L1–L481`, `L1364–L1417`, `L1777–L1802` | the closed state set (`KC`, `KC_TOKENS`, `STORE_FLOOR_CODES`), the five `Symbol.for` keys, `refuse`/`isKernelRefusal`, `inDomainAddress`/`inDomainId`, the pair key and the row scans (`PAIR_KEYS`, `pairKey`, `pairSpelling`, `pairRowCarrying`, `pairKeyOf`, `pairRowAt`), `sameAddress`, the module-private state and its one accessor (`KERNELS`, `LIVE`, `CLOSED`, `ATTEMPTS`, `kernelFor`), the log appenders (`append`, `withdraw`), the repair's own op reading (`landedOp`, `landedOpDefect`, `opSpelling`), the two scans over that state (`pairsAtAddress`, `attemptHeldAt`), the attempt reference's two spellings (`attemptIdOf`, `commitAttemptIdOf`), and the file header | **33** | 561 |
| **9b** | **the registration act and the registry's removal** | `…/kernel-registration.mjs` | `L483–L1003`, `L2091–L2203` | **`K-1`** `register` and its third step (the registration-time evaluation), the withdrawal a refused registration owes, the synthetic attempt and its re-run, the registration refusal's own form, the synthetic attempt's closer, the kernel's handle spelling and its noop listener/handle, and **`K-6`** `remove` | **14** | 634 |
| **9c** | **the commit act** | `…/kernel-commit.mjs` | `L1004–L1153` | **`K-2`** `commit`: the held-address refusal, the attempt record's opening, the `CommitRecord`'s four members and their placement in `LIVE`, and the store's own write verb at its fourth position | **1** | 150 |
| **9d** | **the pass** | `…/kernel-attempt.mjs` | `L1155–L1362`, `L1419–L1775` | **`K-3`** `runAttempt`, the seam's terminal instant (`settleArm`), the pass loop (`runToCompletion`), one evaluation run (`evaluate`), the run's check-off (`releasePending`), the passing arm's publication (`publishCheckedOff`) and the outside-return sentence (`unrecognized`) | **7** | 565 |
| **9e** | **the terminal act and the record readers** | `…/kernel-terminal.mjs` | `L1804–L2058`, `L2060–L2089` | the terminal act (`terminal`), the per-op rollback composition (`composeRollback`), the store's base state (`baseState`), the one removal every terminal arm owes (`release`), the success arm's closer (`close`), and **`K-4`** `log` / **`K-5`** `report` | **7** | 285 |
| — | **the barrel** | `bindings/js/src/constraint-kernel.mjs` (**unchanged path**) | the file's 2,203 lines leave it; **six re-exports** remain | the six module-level names, and nothing else | — | — |

**The partition is exact and closed, and the arithmetic is printed with its terms:** 561 + 634 + 150 + 565 + 285 =
**2,195** assigned lines, plus **8 blank separator lines** (`L482`, `L967`, `L968`, `L1363`, `L1418`, `L1776`,
`L1803`, `L2059`) = **2,203** — the file's own last line. No line of the kernel is unassigned and none is claimed
twice. **The declaration count closes the same way:** 33 + 14 + 1 + 7 + 7 = **62**, the top-level declaration sites the
entry pass measured, of which 48 are `function` declarations (42 internal, 6 exported) and 14 are top-level
`const`/`let` bindings.

**Four of the five parts take more than one region, and the cut's one structural cost is stated here so it is not
discovered in the wave.** The regions are not line-ordered in every part, because four declaration groups sit *inside*
a region whose subject they do not share — and **each carve is justified by the edge it removes or by the two readers it
serves, never by tidiness:**

- **9a takes `L1364–L1417`** (`pairsAtAddress`, `attemptHeldAt`) **out of the pass's region, and this one removes TWO
  EDGES:** left in place, 9b's `registrationRerun` (`L894`) would reach the pass part for `pairsAtAddress` and 9c's
  `commit` (`L1020`) would reach it for `attemptHeldAt` — `9b → 9d` and `9c → 9d`, two act parts depending on a third.
  **This is the same device the entry's cut used for `homeAddressKey`** (`entry-subdivision.md` §2: *"one function, 17
  lines, and the edge it removes is the cut's second cycle"*).
- **9a also takes `L1777–L1802`** (`attemptIdOf`, `commitAttemptIdOf`) **out of the terminal region — and that carve
  removes no edge, which is said plainly rather than dressed up.** 9d already reaches 9e for `terminal`/`close`, so
  the reference's normalisation could have stayed there; it is carved because it is read by **two** parts (9d's
  `runAttempt` at `L1160` and 9e's readers at `L2064`/`L2076`) and belongs below both. **A legibility carve, not a
  cycle-breaking one** — recorded this way so a later reader does not infer a cycle that is not there.
- **9b takes `L2091–L2203`** (`K-6` `remove`) **out of the file's tail**, because `register`'s refusal path calls it
  (`withdrawRegistration`, `L654`) and both act on `kernel.pairs`/`kernel.handles` and nothing else (§2). One caller
  inside the family, one subject.
- **9d and 9e are the two halves of the region `L1155–L2089`**, split at `L1803`, where the pass's last declaration
  (`unrecognized`, closing at `L1775`) and the second carve above give way to the terminal act's banner (`L1804`).

**Nothing else moves region.** The five `Symbol.for` keys, `KC`, the pair machinery and the state block are already a
contiguous head (`L1–L481`); `kernel-foundations.mjs` is that head plus the four carves.

---

## §2 · Why each boundary falls there, and not one line either side

**The cut is drawn on the kernel's own declared item set.** The file's header (`L7–L12`) declares **five** items and
the sixth (`K-6`) is declared at `L2094–L2097` as the extent's move `5 → 6`; **each act item gets one part, and the
machinery that more than one item reads gets the foundations.** That is the whole of the rationale — not line count,
and not the four-way guess `entry-subdivision.md` §9 Q1 sketched from a declaration-site survey.

**9a — the foundations, and the three groups that are foundations rather than code-owner's property.**

- **The closed vocabulary and the one refusal form.** `KC` (`L46`), `KC_TOKENS` (`L59`),
  `STORE_FLOOR_CODES` (`L67`), the five symbol keys (`L97`, `L113`, `L135`, `L138`, `L148`), `refuse` (`L149`),
  `isKernelRefusal` (`L167`), `inDomainAddress` (`L175`), `inDomainId` (`L186`). **`refuse` is called from six of the
  six act sites' parts** (`L491`, `L497`, `L1021`, `L1165`–`L1205`, `L1633`, `L2069`–`L2159`) and depends on nothing;
  the eight tokens are the closed set every status in this file is a member of. **One line either side is wrong in
  both directions:** `refuse` cannot live above anything (its six caller-parts would then depend on each other's
  chosen home), and the tokens cannot live below it (nothing else declares them).
- **The pair key and the row scans** (`L238`–`L320`). `pairKey` is called from `register` (`L533`), `withdrawRegistration`
  (`L640`) and `registrationAttempt` (`L800`); `pairRowAt` from `registrationAttempt` (`L799`) and `remove` (`L2157`);
  `sameAddress` from `pairRowAt` (`L299`), `register` (`L559`), `pairsAtAddress` (`L1393`), `attemptHeldAt` (`L1414`)
  and `evaluate` (`L1693`); `pairKeyOf`/`pairRowCarrying` from `register` (`L553`, `L562`); `pairSpelling` only from
  `evaluate` (`L1526`–`L1548`). **Three of the five act parts read this block, so it sits below all of them.** §3.2
  case 1 is the candidate cut that would put it in the registry and close a cycle.
- **The kernel's own caller-side state** (`L322`–`L376`): `KERNELS`/`kernelFor` (read by all four act parts),
  `LIVE`/`CLOSED`/`ATTEMPTS`. **The write sites are in three different parts and the declaration says so instead of
  routing them:** `ATTEMPTS += 1` at `L801` (9b) and `L1043` (9c); `LIVE.set` at `L1123` (9c); `LIVE.delete` at
  `closeRegistrationAttempt` `L964` (9b) and `release` `L1888` (9e); `CLOSED.set` at `L963` (9b), `terminal` `L1873`
  and `close` `L1902` (9e). **These are shared writes to one home, not edges between the parts**, and the cut's rule
  is that the maps' *home* is 9a's and their *mutation* is any act part's.
- **The two appenders** (`append` `L382`, `withdraw` `L394`) — the log's own shape, written from
  `registrationAttempt` (`L828`, `L830`), `evaluate` (`L1477`, `L1558`), `terminal` (`L1833`) and the passing arm
  (`L1296`). Three parts write one log; the appenders belong to the log, below all three.
- **The repair's own op reading** (`landedOp` `L442`, `landedOpDefect` `L463`, `opSpelling` `L474`) — read at **both**
  repair sites, `registrationAttempt` `L846` (9b) and `evaluate` `L1645`/`L1648` (9d). §3.2 case 2 is the candidate
  cut that gives it to the attempt engine, refused on the mechanism.
- **The two scans and the two reference spellings, carved** — see §1. Consumers: `pairsAtAddress` at
  `registrationRerun` `L894` (9b) **and** `evaluate` `L1444` (9d); `attemptHeldAt` at `commit` `L1020` (9c);
  `attemptIdOf` at `commitAttemptIdOf` (9a), `log` `L2064` and `report` `L2076` (9e); `commitAttemptIdOf` at
  `runAttempt` `L1160` (9d).

**9b — why `K-1` and `K-6` are one part, and what else travels with them.** Both are the registry's mutation surface
and nothing else: `register` writes `kernel.pairs`/`kernel.handles` (`L574`–`L582`) and `remove` deletes them
(`L2175`, `L2176`), and **`withdrawRegistration`'s refusal path calls `remove`** (`L654`, inside a `try` whose silence
is declared at `L650`–`L657`). **Split `K-6` into a part of its own and `register` depends on it, one-way** — no
cycle — **but the dependency would read "the registration act depends on the removal act it calls only to undo
itself", and the two acts' shared subject is the registry.** The registration-time evaluation (`registrationEvaluation`
`L686`, `registrationContext` `L707`, `readCurrent` `L722`, `registrationRepairContext` `L749`, `registrationAttempt`
`L791`, `registrationRerun` `L883`, `registrationRefusal` `L936`, `closeRegistrationAttempt` `L953`) travels with
`K-1` because it **is** `K-1`'s third step — the file's own banner at `L586–L589` says so — and because it calls
**nothing in 9d or 9e**: `registrationRerun` inlines its own evaluation rather than calling `evaluate` (`L898`), and
`closeRegistrationAttempt` writes `CLOSED`/`LIVE` directly rather than calling `close` (`L963`, `L964`).

**A measured duplication the cut does not resolve, named so the wave does not "tidy" it.** `closeRegistrationAttempt`
(`L953`–`L966`, 9b) and `close` (`L1892`–`L1905`, 9e) build the same five-member report, set `CLOSED`, delete `LIVE`
and return the report. **They are one shape in two parts and unifying them would create the edge 9b → 9e**, which the
DAG does not have. The cut therefore leaves the duplication standing; its disposition is no decision of this pass's.

**9c — why `K-2` is alone.** `commit` is one 145-line act whose body reads the foundations and the store: `kernelFor`
`L1009`, `inDomainAddress` `L1010`, `attemptHeldAt` `L1020`, `refuse` `L1021`, `ATTEMPTS` `L1043`, `store.write`
`L1116`, `LIVE.set` `L1123`. **It calls no other act part** — not the pass, not the terminal act, not the registry —
and nothing but `runAttempt` reads what it wrote (`LIVE.get` at `L1161`). One item, one part; the boundary at
`L1003→L1004` and `L1153→L1155` is where `K-1`'s machinery closes (`closeRegistrationAttempt` at `L966`, the noop
block at `L969`–`L1003`) and where the `K-2` banner opens.

**9d — why the pass is one part and why the seam is in it.** `runAttempt` (`L1158`) is the only caller of
`runToCompletion` (`L1187`), `terminal` (`L1191`, `L1278`), `settleArm` (`L1201`, `L1258`), `close` (`L1216`),
`publishCheckedOff` (`L1229`); `runToCompletion` is the only caller of `evaluate` (`L1358`); `evaluate` is the only
caller of `releasePending` (`L1670`, `L1677`), `withdraw` (`L1486`), `unrecognized` (`L1500`, `L1503`) and
`pairSpelling`. **`settleArm` belongs here rather than with the terminal act** although it is named for the terminal
instant: its whole body is `store[TERMINAL_ARM](record)` (`L1322`), the *entry's* channel, and its two call sites are
`runAttempt`'s two arms one line from the terminal act's call. What sits in 9e is the **kernel's** terminal act, and
the two are different acts that share an instant.

**9e — why the terminal act and the readers are one part.** `log` and `report` (`L2063`, `L2075`) answer **from the
records `terminal` and `close` write**: `LIVE.get`/`CLOSED.get` at `L2065`–`L2086`, on the same two maps those
functions set at `L1873`/`L1902`. `terminal` is reached from exactly two sites, both in 9d (`L1191`, `L1278`), and
calls `composeRollback` (`L1822`), `append` (9a), `release` (`L1874`) and `CLOSED.set` (`L1873`);
`composeRollback` calls `baseState` (`L2025`) and `store.rollback` (`L2005`) and reads `STORE_FLOOR_CODES` (9a,
`L2012`); `baseState` calls `store.read` (`L2052`). **The record's write end and its read end are one part because
they are one subject: the closed attempt.** §3.2 case 3 prices the alternative.

**The barrel — why the six's home is a file that holds no logic.** `bindings/js/src/constraint-kernel.mjs` keeps its
path and becomes six re-exports, because **the path is reached as an identity and not only as a route** (§4.3), and
because `D-14`'s staging mechanism names exactly this one explicit path (§5).

---

## §3 · The dependency DAG, and the cycles this cut refuses

### §3.1 The DAG, part by part

**The arrow points at what is *needed*.** Every edge below was measured by grep for `name(` over the file and mapped
to its enclosing top-level declaration by line number; §7 states the method's blind spots.

```
9a foundations  → (nothing — the part imports nothing at all)
9b registration → 9a
9c commit       → 9a
9d attempt      → 9a, 9e
9e terminal     → 9a
```

**Its shape, stated so a reader can check it without reading this file again:** **9a is the root and has no outgoing
edge**; **9e depends on 9a alone**; **9d is the only part that reaches a second part, and it reaches
downward-to-9e**; 9b and 9c are leaves above the root. **The DAG's depth is three, its longest path is
`9b → 9a`, and there is exactly one edge that is not `→ 9a`.** A cycle needs an edge into 9a or out of 9e's top; there
is neither.

**Each part's needs, stated so the part is readable alone:**

- **9a** needs **nothing**: no sibling, no node builtin, no `require`, no `createRequire`. This is the strongest form
  of `kernel-surface.md §1` item 1's footprint and it must stay true (§4.4).
- **9b** needs `kernelFor`, the two domain predicates, `refuse`, `pairKey`, `pairRowCarrying`, `pairKeyOf`,
  `pairRowAt`, `sameAddress`, `pairsAtAddress`, `landedOp`, `append`, `LIVE`/`CLOSED`/`ATTEMPTS` (all 9a); and, on its
  own object, the caller's `store.listen` (`L565`), `store.register` (`L566`), `store.read` (`readCurrent` `L722`) and
  `store.removeListener` (`L2201`).
- **9c** needs `kernelFor`, `inDomainAddress`, `attemptHeldAt`, `refuse`, `ATTEMPTS`, `LIVE` (9a); `store.write`
  (`L1116`).
- **9d** needs `kernelFor`, `refuse`, `append`, `withdraw`, `pairsAtAddress`, `sameAddress`, `pairSpelling`,
  `isKernelRefusal`, `landedOp`, `landedOpDefect`, `unrecognized`, `publishCheckedOff`, `commitAttemptIdOf`,
  `LIVE`/`CLOSED` (9a); `terminal`, `close` (9e); and `store[TERMINAL_ARM]` (`L1322`).
- **9e** needs `append`, `release`'s map, `CLOSED`, `STORE_FLOOR_CODES`, `attemptIdOf`, `refuse` (9a); and on the
  caller's object `store.rollback` (`L2005`) and `store.read` (`L2052`).

**`store.*` is not an import and not an edge.** Every store-reaching act in this family is a **method of the object the
caller passed as the first position** (`store.listen`, `store.register`, `store.write`, `store.read`, `store.rollback`,
`store.removeListener`, `store[TERMINAL_ARM]`) — the file's own header states it at `L23`–`L35`, and it is what makes
the family's import footprint empty. **The cut must not move one of these behind a sibling**: a part that exported a
"store accessor" would mint the second route `parameter-semantics.md §2.7` refuses.

### §3.2 The candidate cuts that would close a cycle, or that the mechanism refuses

1. **"The pair key and the row scans travel with the registry that owns them"** — `pairKey`, `pairKeyOf`,
   `pairRowCarrying`, `pairRowAt` and `sameAddress` into 9b (`register`/`remove` are their heaviest users: `L533`,
   `L553`, `L562`, `L640`, `L642`, `L799`–`L800`, `L2157`). **THIS IS A TWO-PART CYCLE AND IT IS THE CUT'S REAL HAZARD.**
   9b → 9a is already an edge (`kernelFor`, `refuse`, `append`, …), and moving the block up gives 9a → 9b as well:
   **9a's `pairsAtAddress` calls `sameAddress` (`L1393`) and 9a's `attemptHeldAt` calls it too (`L1414`), while 9d's
   `evaluate` reaches `sameAddress` through 9a's `pairsAtAddress` (`L1444`, `L1693`) and 9c's `commit` reaches
   `attemptHeldAt` (`L1020`).** Refused: **the comparison and the row scans stay in the foundations, below every part
   that reads them.** *(This is the exact mirror of the entry cut's `homeAddressKey` case, `entry-subdivision.md`
   §3.2 case 3, where the alternative was refused because "the pass would depend on the act it precedes".)*
2. **"The repair's own op reading travels with the attempt engine, where the landing repair runs"** — `landedOp`,
   `landedOpDefect`, `opSpelling` into 9d. **It closes no cycle** (9d does not reach 9b), **and it is refused on the
   mechanism rather than on dependency**: 9b's `registrationAttempt` reads the same three at `L846`, so the
   registration act would depend on the attempt engine — **`K-1` depending on `K-3`, the act on the act it precedes**,
   which is the ground the entry cut refused its own case 3 on. The reading is a reading of **a caller's return**, the
   same subject at both repair sites, so it sits below both.
3. **"The terminal act travels with the pass, which is its only caller"** — `terminal`, `composeRollback`, `baseState`,
   `release`, `close` into 9d. **It closes no cycle either**: `terminal → composeRollback → baseState → store.read`
   has no return edge, and no part outside 9d calls any of them. **Refused on legibility and on the store's own
   shape:** `composeRollback` is 92 lines of `RollbackResult`/`undoneOps`/floor-code arithmetic that is *not* the
   pass's subject, and `log`/`report` would be left in a part that no longer writes the record they read. **Recorded
   this way deliberately** — a cycle that does not exist must not be manufactured to justify a cut, exactly as
   `entry-subdivision.md` §3.2 case 1 records its own refusal.
4. **"The six exports stay in one file, so keep the kernel whole"** — refused by `D-13` on `D-2`'s ground: the file is
   **2,203 lines, larger than every one of the eight entry parts** (the largest is 1,262). A reader who wants the six
   names reads a 27-line barrel (§4).

### §3.3 What the cut must NOT do to the kernel

Four prohibitions, three of them inherited and one added by this pass:

1. **The six `Symbol.for` keys stay declared on both sides** (`kernel-surface.md §1` item 1; the entry's own comments
   call the duplication the mechanism). A tidying pass that collapses them into one home would make a kernel part
   import an entry part, and §3.1's root would gain an edge. **Refused here by name so no wave "improves" it.**
2. **No kernel part imports a node builtin.** The tree's kernel imports nothing at all; the cut adds five relative
   imports and **no sixth kind**. A part that reached for `node:fs` to read a manifest would be a second route to the
   store's own facts.
3. **The family imports nothing from `src/entry/`'s other parts** — no `refusal.mjs`, no `artefact.mjs`, no
   `state.mjs`. The one shared shape is the doubled symbol spelling, and it stays doubled.
4. **NEW: the barrel exports exactly six enumerable names — no `default`, no seventh, no helper.** Two greens cells
   assert the module namespace's key set by exact string (§4.3), and `remove-member.md §5 item 1`/`§7 MF-6` names *"a
   seventh name reachable on the kernel's surface"* as the falsifier. **A re-export added for convenience would make
   two already-false cells false for a second reason**, which is the worst possible outcome for a wave whose whole
   purpose is to keep a suite's reds attributable.

---

## §4 · The six exports — the names stay, the sites move, and that is a finding

### §4.1 The fact, and what changes

| | today | after the cut |
|---|---|---|
| export sites | six, in one file: `register` `L486`, `commit` `L1008`, `runAttempt` `L1158`, `log` `L2063`, `report` `L2075`, `remove` `L2111` | six, across **four** files: `register`/`remove` (9b), `commit` (9c), `runAttempt` (9d), `log`/`report` (9e) |
| the module namespace at `src/constraint-kernel.mjs` | the six, and nothing else | **the same six, and nothing else**, held by a re-export shell |
| how a consumer reaches them | `import(...)` of the path | **unchanged** — the path is the same path |

**`docs/L1/entry-subdivision.md` said *"its six exports stay as module-level names"* and its §4.1 table said the six
export sites stay *"unchanged"*. The first half is kept exactly; the second half cannot survive a cut and is corrected
here.** A module-level name lives in **a module's namespace**, and after `D-13` the namespace is the barrel's; the
*sites* are four files. **The entry pass was not wrong when it wrote it** — it wrote before `D-13`, and it drew no
kernel cut, so the only way its sentence could be true was for the file to stay whole. **The finding is that the two
halves of its sentence come apart under the ruling the architect gave one ruling later.**

### §4.2 Why re-exported, and not re-pointed

Three measured facts, and each one alone would settle it:

1. **21 non-`scratch/` files reach the path in code** (the entry pass's count, §7: 11 under `bindings/js/test/`,
   9 under `bindings/js/greens/`, and `index.mjs:5227`), and the forms are mixed: named imports
   (`json-crossing.test.mjs:124`, `import { commit as kernelCommit, runAttempt } from '../src/constraint-kernel.mjs'`),
   namespace imports (`greens/blind-constraints-v2.mjs:30`, `held-listener-identity-greens.mjs:117`), dynamic
   `await import(...)` (`constraint-kernel-helpers.mjs:33`, `held-listener-identity-helpers.mjs:157`,
   `file-tier-save.test.mjs:156`, `surface.test.mjs:79`, `greens.mjs:213`), a path constant
   (`constraint-kernel-repairop.test.mjs:61`, `json-crossing-live.mjs:133`, `json-crossing-live-s17.mjs:51`) and a
   path used as an **identity** (`json-crossing.test.mjs:3936`'s `CROSSING_KERNEL_FILE_SUFFIX` and `:4140`'s
   `fileURLToPath(new URL('../src/constraint-kernel.mjs', …))`). **A re-point is ~21 files' worth of mechanical edit
   for one file's legibility — and it puts the six names in four files' namespaces, where the next reader has to
   discover which.**
2. **Two greens cells assert the namespace's key set by exact string**, so the namespace's *shape* is a measured
   subject and not an incidental:
   - **`greens/blind-constraints-v2.mjs:1139`**: `KERNEL_EXPORTS === 'commit,log,register,report,runAttempt'` — the
     **five**, from before `K-6`. It is **false on this tree today**, and the cut neither fixes nor worsens it.
   - **`greens/held-listener-identity-greens.mjs:909`** (cell `HLI-13.1`): `Object.keys(kernel).sort().join(',') ===
     KERNEL_ITEMS.join(',')` against `KERNEL_ITEMS = ['register','commit','runAttempt','log','report','remove']`
     (`:163`). **A sorted list is compared to an unsorted one, so this comparison is also false on the tree today**;
     the cell's *other* half — *"no seventh name is reachable"* — is the half the barrel must keep true.
   **So the kernel's export set is not, in fact, a claim that "governs nothing outside the code"** (`D-1`'s phrase
   about the archived unit's pin): two runners carry namespace-shape assertions off it. **That is a divergence between
   `D-1`'s reading and the tree, recorded rather than resolved** — and it is the strongest reason the barrel must
   reproduce exactly six names and no other.
3. **A test that must change for a reason other than a path is a falsifier of the cut.** `entry-subdivision.md` §8's
   last falsifier says so in as many words. **Re-pointing the 21 files is exactly that edit** — 21 cells edited to
   keep a claim they already make, at a path that did not have to move.

**So: re-exported.** The barrel carries `export { register, remove } from './entry/kernel-registration.mjs';` and
three more lines of the same shape, and nothing else.

### §4.3 What the barrel is, precisely, and what it is not

- **It is a shell with no logic**: five relative specifiers, six re-exported names, no statement, no state.
- **It is the only file at the family's old path**, which is why `D-14` names *this* path explicitly beside the glob
  (`docs/L1/drive-restaging.md` §2).
- **It is load-bearing for the entry**: the entry's constraint glue imports it as a namespace
  (`entry-subdivision.md` §4.2's `import * as kernel from '../constraint-kernel.mjs'`), so it stands on the entry's
  **load path** and a staged tree without it fails at module-graph construction, not at a constraint act.
- **It is not an `exports` arm and not a published module.** `bindings/js/package.json`'s `exports` publishes `"."`
  alone; the deep-subpath refusals the batteries assert (`package-entry.test.mjs:97`,
  `constraints-publication.test.mjs:1223` — three spellings of a kernel subpath) are `exports`'s and stand whether or
  not any file ships.
- **It is not "thin" as a virtue.** The family's content is 2,195 lines in five parts; the barrel is what keeps the
  six names one import away.

### §4.4 The clause this cut makes a contract-reading question — put to the architect, not decided here

`kernel-surface.md §1` item 1 declares the module's import footprint as **"NOTHING — no `createRequire`, no addon
path, no native module and no dependency of the module's own"**, and the file restates it at `L18`–`L35`. **The
measurement that has stood for it is the plain fact that the file has zero `import` statements** (re-measured here:
`^import` and `require(` both return nothing).

**A cut makes that measurement stop being true: the barrel imports five files and four parts import one another.** What
does **not** change is the clause's enumerated subject — no `createRequire`, no addon path, no native module, no
dependency of the module's own, and **no route to the store except the caller's own instance** — and this pass's §3.3
adds the two rules that keep it so (no node builtin, no entry part).

**Whether "an import footprint of NOTHING" is satisfied by "five imports, all of its own parts, and nothing from
outside" is a reading of a kept contract, and no role in this workflow owns that corpus** (map §5.3: *"a module that
owned its contract could amend what it is measured against"*). **L0's reading, marked as inference and built on by
nothing:** the clause's *list* is the subject and the empty-footprint sentence is how it was measured, so five relative
imports among its own parts do not touch it — **and a part that imported a node builtin, an entry part, or anything
third-party would.** The architect should confirm or refuse that reading; the cut does not depend on it, because §3.3
is written to be true under the strictest reading available.

---

## §5 · The home — `src/entry/`, with the family distinction carried by names and by the DAG

**DECISION: the kernel's five parts live under `bindings/js/src/entry/` — the parts' home `D-13` confirmed — named
with a `kernel-` prefix; the barrel stays at `bindings/js/src/constraint-kernel.mjs`.** `D-13` left this open in terms
that name the doubt honestly: *"the kernel is not part of the entry's I/O surface, so 'the parts' home' answers the
entry's question and not necessarily the kernel's."* **The doubt is real and it is not what decides it.**

**The evidence, in the order it decides:**

1. **`D-14`'s mechanism is *one glob plus one explicit path*, and only this placement makes that pair complete.**
   Every staged tree must carry every file the entry's module graph loads: **7 entry parts + 5 kernel parts + the
   barrel + `index.mjs` = 14 `.mjs` files** (`docs/L1/drive-restaging.md` §2). A single non-recursive glob of **one**
   directory covers all **twelve** parts only if the kernel's parts share that directory; **the barrel is one
   directory up, which is exactly the fact `D-14` means by *"the kernel's path is named explicitly because a glob
   cannot express it."*** Put the kernel's parts in a directory of their own and the sanctioned mechanism can no
   longer stage a loadable tree: it would need a **second** glob or a **recursive** one — a third mechanism `D-14` did
   not sanction, and the one thing `D-14` chose its option *to avoid*, namely a hand-maintained set by another name.
2. **The kernel is not part of the entry's I/O surface — and a directory cannot say so here, because the owner is the
   same module.** `js-constraints` owns the entry's constraint glue (`src/entry/constraints.mjs`) **and** every kernel
   part; `D-1` folded them into one module on purpose. So **no directory carries an ownership statement between
   them** — what carries the distinction is three things the tree can enforce: (a) the **`kernel-` prefix**, which
   makes the two families legible in one listing; (b) **the DAG**, whose root imports nothing and no part of which
   imports an entry part (§3.3); and (c) **the barrel**, the only file at the family's old path and the only thing
   anything outside reaches.
3. **The counter-argument is real and is answered rather than hidden.** A shared directory makes the prohibited
   tidying look natural: a reader who sees `kernel-foundations.mjs` beside `state.mjs` may reach for one
   `Symbol.for` home. **That tidying is refused by name in §3.3 item 1**, and the reason it can be refused there is
   that it is a *rule about imports*, which is checkable, rather than a rule about adjacency, which is not. **A
   `src/kernel/` directory would say "a second family" and buy nothing the DAG does not already enforce — while
   costing the staging mechanism its completeness, which is a defect that lands in a drive as a load failure.**

**What the choice does to `D-14`'s glob, in one sentence:** the glob covers the kernel's parts, so the explicit
kernel path is **belt-and-braces for the parts and load-bearing for the barrel** — the barrel is outside the globbed
directory and would otherwise be staged by nothing.

**And the barrel's path is not this pass's to move.** 21 files reach it in code and two of them use it as an identity
(§4.2). `D-13`'s own note — *"the kernel's path must not move (21 non-`scratch/` files reach it in code, so moving it
would re-spell every one of them)"* — is the entry pass's, and it is right.

---

## §6 · What this does to the shipped package — consequences only, no manifest edited

**`delivery` owns these bytes and this pass decides none of them** (`D-3`: the count is obsolete; `D-4`: the shape is
*"determined empirically — by `delivery` together with the e2e/blind scenario testing"*). What the cut does is change
**what the entry requires by path**, which is the one rule `D-3` leaves binding:

- **Today:** four rows — `index.mjs`, `README.md`, `index.d.ts`, `src/constraint-kernel.mjs`.
- **After both cuts:** the entry statically imports **7 entry parts and 1 barrel**, and the barrel imports **5 kernel
  parts** — so reachability puts **16 rows** in the allowlist (`4 + 12`), **arithmetic on a manifest this pass read
  and not a measured publish**. `src/constraint-kernel.mjs`'s ground changes for the third time in this branch's
  record: *the separately reachable fourth entry* (`D-1`'s subject, dissolved) → *a file the entry requires like every
  other part* (`entry-subdivision.md` §5) → **the re-export shell the entry requires, which is also the only file of
  the family that is not a part**.
- **Whether `src/entry/` may be named once instead of twelve times is not decided here.** `D-3` states in as many
  words that nothing licenses a glob, a wildcard or a directory row in the allowlist, and `D-4` gives the decision to
  `delivery` with the installed battery's evidence.
- **The 16-row figure is the reason the wave is one wave** (`docs/L1/drive-restaging.md` §1): a tarball cut between
  the code and the manifest throws at the **first constraint act** (`D-1-ter`) — and after the cut it throws at
  **import**, which names the missing file.
- **`exports` is unmoved**: one arm, `"."`. **No kernel part and not the barrel may be added to it** — an `exports`
  arm for an internal part would republish the six names and re-create the boundary `D-1` dissolved.

---

## §7 · Measured, concluded, and not verified

**Read at the bytes** (site named in the body): all **62 top-level declaration sites** of
`bindings/js/src/constraint-kernel.mjs` with their line numbers (a `^import|^export|^function|^const|^let|^class`
grep), of which **6 are `export function`** at `L486`, `L1008`, `L1158`, `L2063`, `L2075`, `L2111`; the file's **zero
`import`/`require`** footprint (`^import` and `require(` both return nothing); the call graph by grep for `name(`
followed by mapping each site to its enclosing declaration; the state write sites (`ATTEMPTS` `L801`/`L1043`,
`LIVE.set` `L1123`, `LIVE.delete` `L964`/`L1888`, `CLOSED.set` `L963`/`L1873`/`L1902`); the boundary zones of all five
parts (`L1–L175`, `L176–L500`, `L500–L720`, `L790–L970`, `L970–L1153`, `L1150–L1350`, `L1350–L1470`, `L1655–L1775`,
`L1775–L1935`, `L1935–L2115`, `L2114–L2203`); the barrel's consumers' import forms
(`json-crossing.test.mjs:124`/`:3936`/`:4140`, `blind-constraints-v2.mjs:30`/`:32`/`:1139`,
`held-listener-identity-greens.mjs:117`/`:163`/`:909`, `constraint-kernel-helpers.mjs:33`/`:48`,
`held-listener-identity-helpers.mjs:157`/`:163`, `constraint-kernel-repairop.test.mjs:61`, `greens.mjs:213`,
`json-crossing-live.mjs:133`, `json-crossing-live-s17.mjs:51`, `file-tier-save.test.mjs:156`, `surface.test.mjs:79`,
`json-acceptance-set-greens.mjs:56`, `json-acceptance-set-live.mjs:52`, `live-drive.mjs:132`,
`file-tier-save/scenarios.mjs:33`, `package-entry.test.mjs:97`, `constraints-publication.test.mjs:1199`/`:1214`/`:1223`,
`publish.test.mjs:2284`/`:2516`, `publish-generators.test.mjs:1273`, `index.mjs:5227`); and
`docs/L1/module-map.md`, `docs/L1/modules.json`, `docs/L1/entry-subdivision.md` whole.

**Concluded, not measured:**

1. **That each part is independently readable.** The dependencies are measured; the *coherence* of each grouping is my
   judgement, on the same footing as the map's own five-region judgement and the entry pass's nine.
2. **That the call graph is complete.** Edges were found by grep for `name(`, which finds **direct named calls only**.
   A call through a variable, a destructured alias, a computed member, a closure or `Reflect.apply` would be invisible
   to it. **The risk class is real here:** the kernel reaches the store through method calls on a handed object
   (`store.write`, `store[TERMINAL_ARM]`, …), so the file's *own* internal calls are unusually plain — but that is an
   argument, not a measurement.
3. **The line arithmetic.** 2,195 assigned + 8 separator blanks = 2,203 is arithmetic on the declaration-site map and
   the boundary zones I read; **it is owed a `sed`-class check at wave time** (the same debt `entry-subdivision.md` §7
   item 5 carries).
4. **That the barrel preserves the six names for every one of the 21 reaches.** I read the forms above, not all 21
   files' import statements; **the two greens cells' assertions (§4.2) are the hard constraint, and they were read at
   their bytes.**
5. **The 16-row allowlist figure** (§6) — reachability arithmetic on a manifest I read, **not** a measured publish.

**Measured and recorded because they contradict a document:**

- **`blind-constraints-v2.mjs:1139` pins the kernel's namespace to FIVE names** (`commit,log,register,report,runAttempt`)
  and is therefore **red on this tree today**, `K-6` having landed.
- **`held-listener-identity-greens.mjs:909` compares a SORTED key list to an UNSORTED declared list**, so `HLI-13.1` is
  **false on this tree today** for an ordering reason and not because a seventh name exists.
- **`constraint-kernel-helpers.mjs:48` declares the five** (`KERNEL_ITEMS` without `remove`), while
  `held-listener-identity-helpers.mjs:163` declares the six — **two shared helpers disagree about the kernel's
  extent**, and both are consumed across scopes (map §4 E6's successor fact).
- **`closeRegistrationAttempt` and `close` are the same closer written twice** (§2, 9b/9e).

**Not verified, and named as not verified:** no shell and no run in this pass — **no `node --test`, no greens run, no
`wc -l`, no `git ls-files`**; whether `bindings/js/src/entry/` stays a **closed set of `.mjs` parts** (the glob's
premise is a convention nothing enforces); the tracked-status consequence of the five new paths (the map's target
counts are arithmetic); and **whether the strictest reading of `kernel-surface.md §1` item 1 forbids the five relative
imports** — that is §4.4's question, and no role here owns the corpus that answers it.

---

## §8 · What a reader should check first, and what would falsify this cut

**CHECK FIRST, in this order — each is cheap and each can kill a part:**

1. **`grep -n '^function\|^const \|^let \|^export' bindings/js/src/entry/kernel-*.mjs` after the wave, against §1's
   per-part declaration counts** (33 / 14 / 1 / 7 / 7). A declaration in two parts, or in none, means a region was
   mis-assigned.
2. **Every name a part uses but does not declare, resolved to 9a or to `9e`'s five.** **One edge into 9a or out of 9e
   upward is a cycle**; the check is mechanical and needs no run.
3. **`Object.keys(await import('./src/constraint-kernel.mjs')).sort()` === the six, and nothing else.** This is §4.3's
   whole claim and takes one line.
4. **That no `kernel-*.mjs` carries an `import` of anything but a sibling part** — `grep '^import' bindings/js/src/entry/kernel-*.mjs`
   must return only `./kernel-*.mjs` specifiers. A node builtin or a `../state.mjs` is a prohibition broken (§3.3).
5. **The drives' staged trees, before believing `docs/L1/drive-restaging.md`**: a publish cell that passes with the
   entry and no `src/` means the entry does not statically import its parts — which would falsify the premise both
   cuts rest on.

**WHAT WOULD SHOW A BOUNDARY IS IN THE WRONG PLACE:**

- **A part that cannot be read without a second part's comments.** If `kernel-commit.mjs` is unintelligible without
  `kernel-foundations.mjs`'s pair-key essay, the two are one part and `L1003→L1004` is a false boundary.
- **Any upward edge.** E.g. `kernel-foundations.mjs` reaching for `kernelFor`'s sibling, or 9a importing
  `pairsAtAddress`'s caller.
- **A `Reflect.apply`/alias call across a boundary that grep could not see**, which would show as a part importing a
  sibling §3.1 says it must not; its first symptom is a `ReferenceError` at import.
- **A greens or battery cell that must change for a reason other than a path.** If landing the cut forces a
  *behavioural* edit anywhere, the cut moved more than lines — and **the two namespace cells of §4.2 are the ones to
  watch: they must be exactly as red after the wave as they are now, for the same reasons.**
- **The installed battery failing on a missing kernel part.** That would mean §6's reachability consequence was
  declared right and landed wrong.

---

## §9 · Questions for the architect

**Q1 — is the cut's five-part count the one you want, or is `9a` too large at 561 lines?** It is the kernel's
foundations and it exists because **four** act parts read it; every attempted split of it (pair machinery to the
registry, the repair-op reading to the attempt engine) closes a cycle or inverts a precedence (§3.2 cases 1 and 2).
The alternative is to accept a part of 561 lines against `D-2`'s readability ground. **The comparison, printed so it is
not a slogan:** the entry's eight parts are 81 · 335 · 569 · 592 · 714 · 1,155 · 1,195 · 1,262 lines, so **9a is larger
than two of them and smaller than the other six**, and it sits inside the band the entry's cut already accepted.
**Neither alternative is drawn; this file declares the five.**

**Q2 — is the barrel the right home for the six names, or should the six's namespace be the five parts' own?** §4.2
gives the measured reasons for the barrel (21 reaches, two namespace-asserting cells, one path used as an identity).
**The alternative — no barrel, six names in four files — is lawful and cheaper on one axis (no shell file) and dearer
on three**, and it would re-point 21 files, which the entry pass's own §8 falsifier calls a defect.

**Q3 — is `src/entry/` the right home for the kernel's parts, given that the barrel is then the family's only
non-part file?** §5 decides it on `D-14`'s mechanism and on the fact that the owner is the same module. **The
alternative that is genuinely arguable is `src/entry/kernel/`, with a recursive glob** — it states the family
distinction in the tree and costs one `**` in `D-14`'s glob. **I did not choose it because a recursive glob is a weaker
"closed set by construction"**: it silently includes whatever a later pass puts in a subdirectory, which is the failure
mode a loud zero-match rule exists to prevent.

**Q4 — does `kernel-surface.md §1` item 1 forbid five relative imports among the kernel's own parts?** §4.4 states the
reading I have and refuses to build on it. **No role in this workflow owns the contract corpus, so this is yours to
confirm or refuse** — and if it is refused, then `D-13`'s cut and that clause are in direct conflict and the architect
has to choose, because **a 2,203-line file cannot be cut without at least one relative import.**

**Q5 — the two namespace cells are red on this tree today (§4.2).** They belong to `greens-harness` and `js-battery`
and their correction is a test-layer act, not this pass's. **Should they be brought green in the same wave, or is
their redness to be carried across it?** Carrying it across is what this file assumes (their reasons do not change);
fixing it inside the wave would make the wave's diff carry a behavioural edit that no ruling orders.
