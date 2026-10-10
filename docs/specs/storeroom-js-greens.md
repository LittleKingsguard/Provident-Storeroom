# GREENS — the blind-scenario set for `U-STOREROOM-JS` (`D-GP-SRJS`), authored at gate 5 (`P5`) from the documentation alone

**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.** The inputs read were
`docs/specs/storeroom-js/contract.md` and its parts (`crossing.md` · `surface.md` · `package.md` ·
`acceptance.md` · `parameter-semantics.md`), `docs/specs/storeroom-js-proposal.md`'s rulings as they are
carried in those documents, `docs/specs/storeroom-js-rca-scaling.md`, the store's own contract
(`docs/specs/storeroom-native/contract.md` + `store-model.md` · `write-and-read.md` · `seams-and-lifecycle.md`
· `parameter-semantics.md`), and `docs/specs/storeroom-native-greens.md` **for its FORM and not for its
content**.

**NO BYTE OF `bindings/js/src/**`, `bindings/js/index.mjs`, `bindings/js/test/**`, `bindings/js/tests/**`,
`src/**` OR `tests/**` WAS READ.** The package was reached **only as a consumer**, through its **claimed ESM
entry** — the one `import` this set's own runner performs — and the driver of this set lives at
`bindings/js/greens/greens.mjs`, an `ENVELOPE/PURE` scratch consumer that is **not** a part of the delivered
package. **The only bytes this pass writes inside the repository are this file, that one driver, and the
run's record at `archive/gate5/storeroom-js-greens-run.md`.**

**Layer.** This set is an **`ENVELOPE/PURE`** set and **NOTHING MORE**: it drives a library through its
claimed entry. **The ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`** (`§4.2` item 2; `DD-20`), **no `APP`-green
is claimed anywhere in this file or in its driver, and no figure of this pass is a node-suite or a
`cargo test` figure** — the two figures this pass reports are **the driver's own assertion counts**.

**Method.** Every expected observable below was written **value by value, before the run**, from the clause
cited beside it. A divergence between an expectation and the run is reported as a **FINDING with the clause
on each side**; **no assertion is weakened to make a scenario pass**, and a failing cell is never re-worded
after it is seen. Where a **drive** (never an expectation) was malformed, the drive is corrected and
re-driven, and **each correction is named in this file's scenarios and enumerated, with the run that
exposed it, at `archive/gate5/storeroom-js-greens-run.md §2`** — **four such corrections were taken and no
expectation moved.**

**The two declared normalizations, and the one thing this set refuses to drive.** **In the cell tables below,
a short verb form — `read(['p'])`, `write(['p'],'temp',1)`, `readLiteral(['rb'])`, `delete(['d1'])`,
`rollback(opId)`, `listen(['ev'])`, `unlisten(h1)` — names the MODULE-level verb of `§2.2`/`§2.10` with the
scenario's own instance as its FIRST argument, and `register(handle, listener)` names the instance's own ONE
member (`§2.4` item 5).** `§4.3`'s round-trip
property declares exactly **two exclusions and no third**: (i) **a `file`-tier `-0` reads back `0` after a
boot**, which is the file-image normalization, and (ii) **object member ORDER is not compared**. **This set
does NOT read `cfg.filePath`, and it drives neither the file's bytes nor its JSON text**, because
`DD-5` declares the canonical number spelling **outside this unit's acceptance layer** and states that *"the
JS layer never reaches around the store's surface to read `cfg.filePath`"*: the file-image half of the
normalization is driven here **through its declared JS-observable consequence only** — a fresh instance over
an equal `cfg.filePath` reads the committed `-0` back as `0` (`§7.2` item 7 (c) of the store's contract).

---

## §1. THE SCENARIO SET — 13 scenarios, each bound to its clause

| id | The clause(s) it drives (and the ruling where one governs) |
| --- | --- |
| **JSG-01** | **THE SURFACE.** The eight verbs and nothing else; the instance's own member set is exactly `{ register, on, off }` — `§2.9` item 1, **`§2.1`'s dated clause 1 (a)** (the member set, RE-DERIVED at `Q5`), **`§2.4` item 7** (the two new members' own clauses: their signatures and their return types), `package.md §1.3` item 3, `package.md §1.3` item 4, `§3.5` — **`A63`** · **`A74`** · **`A79`** · **`A80`** · **`A81`** |
| **JSG-02** | **THE ROUND TRIP, END TO END**, under the declared relation, plus the boot and the two declared normalizations: construct at a real `filePath`, write, read, **boot a FRESH instance on the same path**, read again — `§4.3`, `§1.5`, `§1.1`, `§2.2` (`R-5`'s whole-register read), `§5.1` (`P-IM-1`), `crossing.md §1.3`'s returned-record rows, the store's `§7.2` items 6–7, `DD-5` · `DD-9` · `DD-39` — **`A39`** |
| **JSG-03** | **THE DEEP-COPY DISCIPLINE, BOTH DIRECTIONS** — mutate the argument after the call and the store is unchanged; mutate the read-back and the store is unchanged — `§1.1` items 1–4, `§5.2` (`P-IM-2`, `S-COPY-IN`/`S-COPY-OUT`) — **`A65`** |
| **JSG-04** | **THE VALIDATION ORDER AND THE VERBOSE REJECTION** — a `bigint`, a `Symbol`, a symbol-keyed own property, a class instance, an `Array` subclass, a sparse array, `{a: undefined}`, a `Proxy`, an own accessor, a `Map`, a `Date`, a function and a cycle, **each refused in the ONE declared form** with the target and the class carried, **no raw host error** and **nothing installed** — `§1.2` rows 4–13, `§1.4` items 1–4, `§1.7` (a)–(d), `§1.8`, `§2.5` items 1–3, `surface.md §2.5` items 5–6, `crossing.md §1.4`, `crossing.md §1.7` (b) 3's dated clause, `crossing.md §1.8`'s dated clause — **`A76`** |
| **JSG-05** | **THE ABSENT-VERSUS-`undefined` READING** — a verb's trailing argument by CALL ARITY, a `cfg` key by `in`-MEMBERSHIP — `crossing.md §1.3`'s dated rule, `acceptance.md §4.1` item 7, `§1.3`'s `FilePathArg`/`JournalLengthArg`/`ListenersArg`/`TierArg` rows, the store's `store-model.md §1.6` item 4 (d) — **`A49`** · **`A51`** |
| **JSG-06** | **THE CEILING'S ARMS AND THE ANCESTOR-STACK GUARD** — depth `63`/`64` admitted and `65`/`66` refused `ValueNotAdmitted`, the ADMITTED diamond, and the refused cycle — `§1.4` item 5 and its two dated clauses, `§1.4` item 6, `DD-10`, `DD-11`, `crossing.md §1.4` item 5's dated clause, `crossing.md §1.7` (a) — **`A76`** |
| **JSG-07** | **THE TIERS AND THE PURGE** — the shadow at a less persistent write, the unqualified read's lowest-persistence selection, the tier-qualified and the zero-token set reads, and the purge chain at `temp` → `mem` → `file`; then the delete's own tier scope (`D-1`/`D-2`/`D-3`) — `§2.2` (`DD-37`), `§2.3`'s zero-tier arm, the store's `§5.1` (`M-1`), `§5.3` item 2–4, `§5.4`'s purge chain, `write-and-read.md §3.4` (`W-5`/`W-6`), `§4.2` (`R-4`), `§4.3`, `§4.4` (`D-1`/`D-2`/`D-3`) — **`A11`** · **`A19`** · **`A28`** |
| **JSG-08** | **THE HANDLE AND THE TRIGGERED IDS** — `listen` → `register` → a write at that address → the `triggered` member carries the id registration gave; the function runs ONCE; **its single argument is the triggering ADDRESS and not the id**; an id the package holds no function for fires NOTHING; then `unlisten` and no further fire — `§2.3` items 1–6, `§2.4` rules 1–4 and item 6, `§2.7` items 1–5, `§2.10`, `parameter-semantics.md §2.12` and `§2.15`, the store's `§6.5` items 10–12 — **`A57`** · **`A69`** · **`A77`** |
| **JSG-09** | **THE REGISTRATION SITE'S DOMAIN AND ITS REFUSAL FORM** — a re-registration replaces, a bare `string` and a `null` are refused, and the refusal's OPERATIVE form is the single `{status, message}` with the store's own `AddressMalformed` — `§2.4` item 5 (b)–(e), `surface.md §2.5` item 5 (g), `surface.md §2.4` item 6's reconciliation clause, `parameter-semantics.md §2.12`'s second dated clause, `§0.2`'s `SW-1` record's final clause item 1 — **`A76`** · **`A77`** |
| **JSG-10** | **THE CLOSED FAIL SET** — as many of the **fifteen** codes as the documents make reachable from the package, each by its own trigger, asserting its OWN code, the ONE failure form, the generated message's form, and the contract's own worked messages — `§2.5`, `§2.9` item 2, `§5.3` (`P-IM-3`), `crossing.md §1.3`, the store's `§8.1` (`15` members), `§8.2` (the generator, its properties and its three worked examples), `§8.3`, `§6.1` item 5, `§7.1`, `§7.2` — **`A14`** · **`A53`** · **`A63`** |
| **JSG-11** | **THE JOURNAL AND THE ROLLBACK** — the returned op's closed eight-member shape, its `opId`, `seq`, `before`/`after`; `rollback` with that id restoring the declared state; and a made-up id answering its declared code — `§2.2`, `§2.6`, `parameter-semantics.md §2.13`, the store's `§3.6`, `§6.1` item 1, `§6.2`, `§6.3`, `§6.4` (`M-5`–`M-11`) — **`A7`** · **`A35`** · **`A37`** |
| **JSG-12** | **THE PACKAGE AND THE LAYER** — the claimed realm is Node ESM and the addon is reached INTERNALLY, the declared exports are the docs' set (one arms-bearing entry, no wildcard, no CJS arm, no `main`), the declared engine floor, licence and prebuild matrix, and **no `APP`-green asserted anywhere** — `§3.1`–`§3.5`, `§4.1`–`§4.2`, `package.md §1.1`–`§1.4`, `§3.1`–`§3.4`, `§4.5` item 5, `§5`, `DD-4` · `DD-18` · `DD-20` · `DD-24` · `DD-25` · `DD-26` · `DD-38` · `DD-43` — **`A70`** · **`A71`** · **`A74`** |
| **JSG-13** | **THE SCALING CLAIM THE DOCS NOW MAKE** — a value of a few thousand members **completes and round-trips** (nothing is timed into a failure: the RCA's claim is asymptotic and its timing is the implementer's measurement) — `docs/specs/storeroom-js-rca-scaling.md §1`, `§4`, `§5-bis`, `§6` item 1 — **the architect's own requirement, quoted at that file's head** |

**Coverage against gate 5's nine items.** (1) the surface → **JSG-01**; (2) the round trip end to end, the
declared relation and the two normalizations → **JSG-02**; the deep-copy discipline → **JSG-03**;
(3) the validation order and the verbose rejection → **JSG-04** (+ **JSG-09** at the registration site,
whose site is not a crossing); (4) the absent-versus-`undefined` reading → **JSG-05**; the ceiling's arms and
the guard → **JSG-06**; (5) the tiers and the purge → **JSG-07**; (6) the handle and the triggered ids →
**JSG-08**; (7) the failure set → **JSG-10**; (8) the journal and the rollback → **JSG-11**; the package and
the layer → **JSG-12**; (9) the scaling claim → **JSG-13**.

**The assertion census, printed with its terms.** Every table row below is ONE assertion cell; **a refusal
cell whose row prints an extra assertion carries `4 + 1` assertions and the table says so**, and a scenario's
own count is printed at its head. **⟶ RE-DERIVED 2026-10-11 (`Q5`): THE SET IS NOW AUTHORED AS `240`  **⟶ AND THE BATTERY'S FIGURE IS RE-READ 2026-10-11 (`LIVE-F5`, the supervisor's landing): the live battery is `91` authored · `91` PASS · `0` FAIL over `13` scenarios (the earlier `72`/`72` this set printed was the pre-`Q6` reading, the `+19` being the `on`/`off` flow `LIVE-13`); and the blind set itself is `240` authored · `240` PASS · `0` FAIL with `JSG-12` at `17`.**  **⟶ THE ARTEFACT'S DIGEST RE-PINNED 2026-10-11 BY THE SUPERVISOR (`LIVE-F4`'s class; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `cf088d91…`/`957,904` cells below STAND as the `Q7`/`Q8` tree's own reading and THIS clause is the operative tie): the artefact is `sha256:0136c912…` over `958112` bytes, the pre-rename/pre-`Q3` artefact being `cf088d91…`/`957,904`. EVERY figure this file prints describes THIS digest from here on; the blind set (`241`) and the JS leg (`185`) and the live battery (`91`) were all re-measured against it.**
ASSERTIONS OVER THE SAME `13` SCENARIOS — the as-filed sentence read *"The set was authored as `236`
assertions over `13` scenarios"*, and the `4` cells this pass adds to `JSG-01` (`.14`–`.17`, the two new
instance members' surface coverage) move the assertion census `236 → 240` while the scenario census stays
`13`; `JSG-01`'s own head moves `13 → 17` and every other head stands unmoved** (the run's record at
`archive/gate5/storeroom-js-greens-run.md` prints the executed/PASS/FAIL totals and any cell the run
could not reach).

---

## §2. THE SCENARIOS

### JSG-01 — THE SURFACE (17 assertions)

**The clause(s).** `§2.9` item 1 (`8` verbs, no `findAddress`, no `NodeRef`); `§2.9` item 3
(no `exists()`, no shim); `§3.5` (`A74`: no `dispose()`, no `close()`); **`§2.1`'s dated clause 1 (a) (the
instance's entire declared member set is `{ register, on, off }` — RE-DERIVED at `Q5`, where the as-filed
entry named `§2.4` item 5 (a) and the set `{ register }`)**; **`§2.1`'s dated clause 1 (b) (the module
namespace is UNCHANGED at the eight declared verbs, and NEITHER `on` NOR `off` is a named export)**;
**`§2.4` item 7 (the two new members' own clauses: `(a)` `on`'s signature, its atomic validation and its
return; `(b)` `off`'s signature and its return; `(c)` that neither states a firing rule)**; **`§2.3`'s dated
clause 1 (the handle `on` produces is the one `§2.3` item 2 declares — the two spellings gain NO third)**;
**`parameter-semantics.md §2.12`'s dated clause (`on`'s listener slot) and `§2.8`'s dated clause (`off`'s
handle slot)**; `§2.1` (the store's internals are exposed through no member of the package's handle);
`§2.4` item 5 (a)'s own pointer that `register` is NOT a ninth named export; `package.md §1.3` items 3–4
(the entry's named exports are the verbs and the factory, and NOTHING ELSE; the internal addon's five names
are internal); `§2.6` (no constraint/repair verb).

**The steps a caller takes.** (1) `import` the package's **claimed ESM entry** and take its namespace.
(2) Enumerate the namespace's own export names. (3) Call `storeCreate` with a legal `cfg` (a real path, a
positive `journalLength`, an empty `listeners`). (4) Enumerate the returned object's own member names.
(5) **At the re-derivation `Q5`, and for the two members `A79` adds: name their class, name their absence
from the namespace, and reach the two DECLARED RETURN types at the positions `§2.4` item 7 declares — the
`on` call's `address` at argument position `1` and its `listener` at position `2`, the `off` call's `handle`
at its first and only position. Each of the two addresses is MINTED FIRST with a `temp` write, a DRIVING
step and not an expectation, exactly as `JSG-08`/`JSG-09` mint theirs — so the positions are reachable and
NOT because any firing is asserted: NO FIRE RULE IS ASSERTED ANYWHERE IN THIS SCENARIO** (`§2.4` item 7 (c);
**`A78`**).

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-01.1** | `import` the entry | the module resolves to a non-null namespace object | `package.md §1.1`; `§3.1` |
| **JSG-01.2** | `Object.keys(ns).sort()` | **exactly `['delete','listen','read','readLiteral','rollback','storeCreate','unlisten','write']`** — `8` names, no ninth and none missing | `§2.9` item 1; `package.md §1.3` item 3; **`§2.1`'s dated clause 1 (b), UNMOVED** |
| **JSG-01.3** | `typeof ns[v]` for each of the `8` | `'function'` for every one of the eight | `§2.9` item 1 |
| **JSG-01.4** | `'findAddress' in ns` | **not an own export** | `§2.9` item 1 · **`A63`** |
| **JSG-01.5** | `'exists' in ns` | **not an own export** | `§2.9` item 3 |
| **JSG-01.6** | `'dispose'`/`'close'` in `ns` | **neither is an own export, at the package level or the store level** | `§3.5` · **`A74`**; `§2.4` item 7 (c) (neither new member is a release verb) |
| **JSG-01.7** | `'register' in ns` | **NOT an own export of the module namespace** | `§2.4` item 5 (a); `package.md §1.3` item 3 |
| **JSG-01.8** | `storeCreate(cfg)` | a non-null object, neither a function nor an array | `§2.1` |
| **JSG-01.9** | `Object.getOwnPropertyNames(inst).sort()` | **exactly `['off','on','register']`** — **the THREE declared members, and NOTHING ELSE.** **The value this cell asserted before the `Q1` amendment was `['register']`; the OLD `{ register }` was `§2.4` item 5 (a)'s PRE-AMENDMENT declaration, and `§2.1`'s dated clause 1 (a) FIXES the new value** | **`§2.1`'s dated clause 1 (a)** · **`A79`** · `§2.4` item 7 |
| **JSG-01.10** | `typeof inst.register` | `'function'` | `§2.4` item 5 |
| **JSG-01.11** | the eight verbs and `findAddress` as properties OF the instance | each is `undefined` — the store's own surface is exposed through no member of the handle | `§2.1`'s dated clause; `§2.4` item 5 (a) |
| **JSG-01.12** | `'version'`/`'errorMessage'`/`'call'` in `ns` | **none is an own export** — the internal addon's five names are internal | `package.md §1.3` item 4; `§3.1`'s dated clause |
| **JSG-01.13** | `'addConstraint'`/`'repair'` in `ns` | **neither is an own export** — no constraint or repair verb, parameter or seam is declared | `§2.6` · **`A73`** |
| **JSG-01.14** | `typeof inst.on` and `typeof inst.off` | **`'function'` for BOTH** — the two members the amendment adds are functions on the object `storeCreate` returned, beside `register` | **`§2.1`'s dated clause 1 (a)** · **`§2.4` item 7** |
| **JSG-01.15** | `Object.prototype.hasOwnProperty.call(ns,'on')` and `…(ns,'off')` | **FALSE for both** — neither `on` nor `off` is an own named export of the entry: **the module namespace stays at the EIGHT declared verbs, and no name is added or removed** | **`§2.1`'s dated clause 1 (b)** · `§2.4` item 7; `package.md §1.3` item 3 |
| **JSG-01.16** | mint `['surf-on']` and `['surf-ls']`, then `inst.on(['surf-on'], fn)` and `listen(inst, ['surf-ls'])` | **`on` returns the package's OPAQUE handle — a non-null object, neither a function nor an array — and it is the SAME output spelling `listen` returns: the output direction gains NO third spelling** | **`§2.4` item 7 (a)** (*"ITS RETURN IS THE HANDLE"*); **`§2.3`'s dated clause 1**; `§2.3` item 2; `parameter-semantics.md §2.12`'s dated clause (the listener at position `2` of `2`) |
| **JSG-01.17** | `inst.off(<the handle JSG-01.16 returned>)` | **`undefined`** — `off`'s declared return on EVERY success, driven over the in-domain handle `on` produced, with the handle at `off`'s first and only argument position | **`§2.4` item 7 (b)** (*"ITS RETURN IS `undefined` ON EVERY SUCCESS"*); **`parameter-semantics.md §2.8`'s dated clause** |

**What its failure would mean.** A ninth export, a missing verb, a `findAddress`/`exists`/`dispose` reach, an
instance member **outside the declared three** (where the as-filed sentence read *"a second instance member"*,
SUPERSEDED by `§2.1`'s dated clause 1 (a), which declares the second and third members `on` and `off`) or an
exposed internal addon name means **the declared surface is not the shipped one**: the crossing's whole
closure argument (`§2.9`'s non-exposure, `§2.1`'s dated clause 1 (a) and `§2.4` item 7's three-member handle)
reads false of the package.

**⟶ RE-DERIVED 2026-10-11 — THE `Q5` RE-DERIVATION PASS (`role_blind_test_writer`), ON THE `Q1` CONTRACT
AMENDMENT'S `A79`–`A81`: THIS SCENARIO'S MEMBER-SET FIGURE MOVES AND THE SET IS RE-RUN.** `RCA-8(d)`
ANNOTATE-BESIDE: **every byte this clause does not name STANDS AS FILED and is read THROUGH it — `JSG-01.1`,
`.3`–`.8`, `.10`–`.13` are NOT MOVED, no expectation of theirs is touched, and no assertion of this set is
weakened by this pass.** **THE CELLS THAT MOVE, AND THE CLAUSE THAT FIXES EACH:**
1. **THE HEADER AND `JSG-01.9`, AND ONLY THEY, CARRIED THE SUPERSEDED FIGURE.** **The as-filed head read**
   *"(13 assertions)"* **and its clause list's own entry read** *"`§2.4` item 5 (a) (the instance's entire
   declared member set is `{ register }`)"*; **the as-filed cell read** *"**exactly `['register']`** — one own
   member and NOTHING ELSE"*, cited to `§2.4` item 5 (a). **BOTH ARE RE-DERIVED HERE: `§2.1`'s dated clause 1
   (a) — the `Q1` amendment's own operative member-set statement — FIXES the value as `{ register, on, off }`
   (`A79`), and that clause names the `{ register }` figure it supersedes as `§2.4` item 5 (a)'s
   PRE-AMENDMENT declaration, standing byte-for-byte at its own `§` and read from that date as the three
   members.** **THE RE-DERIVED CELL ASSERTS THE NEW SET EXACTLY — `Object.getOwnPropertyNames(inst).sort()`
   equal to `['off','on','register']`, sorted membership — and NO LOOSER FORM: nothing weaker than the exact
   three-member set is asserted, and no member outside the three is tolerated.** **`contract.md §5.5`'s dated
   clause, clause 5, NAMED THESE TWO CELLS as the ones this amendment makes false and required their authors
   to re-derive them and re-run the set; this is that re-derivation and the record of its run.**
2. **THE NAMESPACE CLAIM IS UNMOVED, AND IT IS SAID HERE SO IT IS NOT DRAGGED ALONG BY THE MEMBER-SET MOVE.**
   **`JSG-01.2` — the namespace's EIGHT names, sorted, with no ninth and none missing — stands as filed and
   STANDS TRUE, and so do `JSG-01.7`, `.11`, `.12` and `.13`; and the amendment's own clause says so at
   `§2.1`'s dated clause 1 (b), where *"THE MODULE NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS"* is
   printed with the reason (`on` and `off` are reached through the FACTORY'S OWN PRODUCT and through nothing
   else).** **`JSG-01.15` is NEW COVERAGE OF THAT SAME UNMOVED CLAIM at the two names this amendment adds —
   it asserts an absence, and it cannot make `.2`'s eight-name count looser than it is.**
3. **AND `JSG-01.10` KEEPS ITS BYTES.** **Its expectation — *"the one member is a function"* — is read
   THROUGH clause `1` above as *"the `register` member is a function"*; the CLAIM IT ASSERTS
   (`typeof inst.register === 'function'`) IS TRUE of the three-member set and is UNMOVED, and no byte of the
   row is rewritten here.**
4. **THE FOUR CELLS THIS PASS ADDS, EACH AT ITS OWN CLAUSE — THE TWO NEW MEMBERS' SURFACE, AND NOTHING OF
   WHAT THEY DO AT A TRIGGER.** **`JSG-01.14`** (their function class — `§2.1`'s dated clause 1 (a); `§2.4`
   item 7). **`JSG-01.15`** (neither is a named export — `§2.1`'s dated clause 1 (b)). **`JSG-01.16`** (`on`'s
   DECLARED RETURN is the opaque handle, and the output direction gains no third spelling — `§2.4` item 7
   (a); `§2.3`'s dated clause 1). **`JSG-01.17`** (`off`'s DECLARED RETURN is `undefined` on every success —
   `§2.4` item 7 (b); `parameter-semantics.md §2.8`'s dated clause). **SO THIS SCENARIO SURVEYS THE TWO NEW
   MEMBERS' SIGNATURES AND THEIR RETURN TYPES, WHICH IS WHAT `§2.4` ITEM 7 DECLARES, AND IT ASSERTS NO MORE:
   no arm of `on`'s validation, no replacement observable, no removal observable and no refusal class is
   asserted HERE — those are the parameter-semantics slots' and the behaviour scenarios' subjects, and the
   drives the amendment makes derivable are owed where they belong.**
5. **AND NO FIRING RULE IS STATED, DERIVED OR ASSERTED BY THIS SCENARIO.** **`on`/`off` are DELIVERY-SIDE
   members: which listener fires, when it fires, what it is bound to and which ids a trigger returns are ALL
   the store's, and their authority stands at `docs/specs/storeroom-native/write-and-read.md §6.5` item 14**
   (**`A78`**; `§2.4` item 7 (c)). **The addresses this scenario mints are a DRIVING step so the declared
   positions are reachable, and not a firing expectation.**
6. **THE CENSUS, WITH BOTH TERMS PRINTED BECAUSE ONE OF THEM MOVES.** **`JSG-01` is `17` assertions where the
   as-filed head read `13` — the `4` cells of clause `4` above — and the SET'S ASSERTION CENSUS is `240`
   where the as-filed head read `236`, while THE SCENARIO CENSUS STAYS `13`, every other scenario's own count
   stands unmoved, and the `§2` heads now sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 =
   240` ✓.** **THE RUN THAT MEASURED IT, ITS BUILD STEP, ITS FOUR LEGS AND ITS LAYER ARE FILED AT
   `archive/gate5/storeroom-js-greens-run.md` as this pass's dated `§`** (`docs/specs/storeroom-js-proposal.md
   §5` · `Q5`; `contract.md §5.5`'s dated clause, clause 5 — the cells that move and the re-run they owe).**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A3 docs/specs/storeroom-js/surface.md
   §2.1's dated clause 1 (a)–(b) and §2.4 item 7 (a)–(c); §2.3's dated clause 1; A3
   docs/specs/storeroom-js/parameter-semantics.md §2.8's and §2.12's dated clauses; A3
   docs/specs/storeroom-js/contract.md §5.5's dated clause | requirement]`).

### JSG-02 — THE ROUND TRIP, END TO END, THE BOOT AND THE TWO NORMALIZATIONS (16 assertions)

**The clause(s).** `§4.3` (the round-trip property and its two exclusions), `§1.5` (the one relation), `§1.1`
(deep copy out), `§2.2` (`read`'s signature and its freshness), the store's `§4.1` (`R-5`: the empty
address answers the whole register), `§4.2` (`R-1`/`R-2`/`R-3`), `§5.2`'s `P-IM-1`, `§7.2` items 6–7 (the boot
and the file image's canonical spelling), `DD-5` (the file's bytes are NOT a JS-side observable), `DD-9`,
`DD-39` (the returned records' own spellings).

**The steps a caller takes.** (1) `const A = storeCreate({ filePath: <tmp>/state.json, journalLength: 4,
listeners: [] })`. (2) `A.write(['rt'], 'file', V)` with `V` the mixed JSON value below. (3) `A.read(['rt'])`
and compare under `§1.5`. (4) `A.read([])`. (5) `const B = storeCreate(<the same cfg>)` — **the boot**.
(6) `B.read(['rt'])` and compare. (7) `A.write(['neg-mem'],'mem',-0)`, `A.write(['neg-temp'],'temp',-0)`,
`A.write(['neg-file'],'file',-0)` and read each back **in memory**. (8) `const C = storeCreate(<the same
cfg>)` and `C.read(['neg-file'])` — **the committed spelling observed through the boot**.

`V = { name: 'alpha', flag: true, count: 3, ratio: 0.5, nest: { z: 1, arr: [1,2,3] },
list: ['p', { q: false }], '10': 'ten', '2': 'two' }` — every class in it is admitted
(`§1.2` rows 1–5) and it carries **integer-like keys BESIDE non-integer-like ones**, so the member-SET half
of the relation is driven at its sharpest. **The `-0` positions are driven SEPARATELY and at the tiers the
clause names** — at `JSG-02.8` as a MEMBER of a `mem`-tier value, at `JSG-02.12`/`JSG-02.13` as a top-level
`mem`/`temp` value, and at `JSG-02.14`/`JSG-02.15` through the boot's own consequence at `file` — **so that
no cell asserts the pre-boot in-memory sign of a `file`-tier `-0`, which no clause names.**

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-02.1** | `A.write(['rt'],'file',V)` | a returned record; **no throw** | `§2.2`; `§4.3` |
| **JSG-02.2** | `A.read(['rt'])` vs `V` | **EQUAL under `§1.5`** — the round-trip property | `§4.3`; `§5.2` `P-IM-1`; `crossing.md §1.5` |
| **JSG-02.3** | the read's member key set vs `V`'s | **equal as SETS compared as a sorted set** (never by insertion order) | `§1.5` item 1 · `DD-9` |
| **JSG-02.4** | `read.nest.arr` vs `[1,2,3]` | equal member-by-member by IDEX, dense, equal length | `§1.5` item 2 · `DD-9` |
| **JSG-02.5** | `read.list[1].q` | `false` — a nested object member inside an array, index-order significant | `§1.5` items 1–2 |
| **JSG-02.6** | the returned object's identity | **NOT the `V` object the caller passed** — a fresh JS-owned value | `§1.1` item 2 |
| **JSG-02.7** | two `read`s of one address | **not the same object** — every verb returns a FRESH JS value | `§1.1`; `§2.2` |
| **JSG-02.8** | `A.write(['negmem'],'mem',{neg:-0})`; `A.read(['negmem']).neg` | `Object.is(read.neg, -0)` is **true** — `mem` keeps the sign in memory, and the relation is `Object.is` at a MEMBER position | `§1.5` item 3; store `§7.2` item 7 (c) |
| **JSG-02.9** | `A.read([])` | an OBJECT whose key set contains `'rt'` — the empty address answers the whole register | store `§4.1`; `§4.2` `R-5`; **`A25`** |
| **JSG-02.10** | `B = storeCreate(<the same cfg>)`; `B.read(['rt'])` | equal to `V` under `§1.5` — **the boot re-loads the last successful `file` write's bytes** | store `§7.2` item 6 |
| **JSG-02.11** | `B.read(['rt'])`'s member set | the same member SET as `V`'s | `§1.5` item 1; store `§7.2` item 6 |
| **JSG-02.12** | `A.write(['neg-mem'],'mem',-0)`; read back | `Object.is(v, -0)` is **true** | store `§7.2` item 7 (c) |
| **JSG-02.13** | `A.write(['neg-temp'],'temp',-0)`; read back | `Object.is(v, -0)` is **true** | store `§7.2` item 7 (c) |
| **JSG-02.14** | `A.write(['neg-file'],'file',-0)`; `C = storeCreate(<the same cfg>)`; `C.read(['neg-file'])` | **`Object.is(v, 0)` is true** — the committed bytes carry `0` and the boot converts to the carrier and not to a sign | store `§7.2` item 7 (c) |
| **JSG-02.15** | the same booted value | **`Object.is(v, -0)` is false** — the ONE declared number normalization | store `§7.2` item 7 (c); `§4.3` exclusion (i) |
| **JSG-02.16** | `C.read(['rt'])` | **EQUAL to `V` under `§1.5`** — the value's members are unchanged by the file image, and the ONE member the image moves is the `-0` of `JSG-02.14`/`JSG-02.15` | store `§7.2` item 7 (a)–(c); `§1.5` |

**What its failure would mean.** A read that is not equal under `§1.5`, a member dropped or added, an
asserted member order, a `-0` compared with `===`, a read that is the store's own object, a boot that does
not re-load the committed bytes, or a booted `-0` that is still `-0` is **`P-IM-1`'s FAILURE LIST item for
item**: the round trip — the unit's one invariant — is not held.

**Not driven here, named.** (i) **The file's bytes and its JSON text are NOT read** — `DD-5` declares the
canonical spelling outside this layer and forbids a JS-side read of `cfg.filePath`; the spelling is driven
through the boot's own consequence above and by no byte comparison. (ii) **The pre-boot in-memory sign of a
`file`-tier `-0` is NOT asserted**: the clause names `mem`/`temp` for the in-memory half and the boot for the
committed half, so a third expectation would be this document's own and not the contract's.

### JSG-03 — THE DEEP-COPY DISCIPLINE, BOTH DIRECTIONS (5 assertions)

**The clause(s).** `§1.1` items 1–4 (the architect's ruling, verbatim: *"Neither the store nor the JS should
be able to get a reference/pointer to data owned by the other"*); `§5.2`'s `P-IM-2` (`S-COPY-IN`,
`S-COPY-OUT`); the store's `§4.1` (*"mutating the object a read returned never mutates the store"*).

**The steps a caller takes.** (1) `const arg = { a: { b: [1,2] } }`; `inst.write(['cp'], 'temp', arg)`.
(2) Mutate `arg` deeply **after the call** (`arg.a.b.push(3)`, `arg.x = 'later'`). (3) `inst.read(['cp'])`.
(4) Mutate the read-back deeply. (5) `inst.read(['cp'])` again.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-03.1** | mutate `arg.a.b` after the write | the read's `a.b` is **`[1,2]`** — the post-call mutation is invisible to the store | `§1.1` items 1 & 4; `§5.2` `S-COPY-IN` |
| **JSG-03.2** | `arg.x = 'later'` after the write | the read carries **no `x` member** — the member set is the written one | `§1.1` items 1 & 4 |
| **JSG-03.3** | mutate the read-back's `a.b` (`push(9)`) | a **second read** answers `a.b === [1,2]` — the JS side holds no reference into store-owned data | `§1.1` items 2–3; `§5.2` `S-COPY-OUT` |
| **JSG-03.4** | replace a read-back member (`r.a = 'nope'`) | a second read answers the written `a` — the read is a value and not a view | `§1.1` items 2–3 |
| **JSG-03.5** | the identity of `read(['cp']).a` against the caller's `arg.a` | **different objects** — no borrow, no pointer and no shared ownership crosses in either direction | `§1.1` item 3 · **`A65`** |

**What its failure would mean.** A stored value that aliases the caller's, or a returned object that is or
shares the store's own, means the boundary is a **reference** boundary: `A65`'s ruling is violated at the
one place the whole unit's design rests on.

### JSG-04 — THE VALIDATION ORDER AND THE VERBOSE REJECTION (67 assertions)

**The clause(s).** `§1.2` rows 4–13 (the refused value classes), `§1.4` items 1–4 (the symbol-keyed member,
the sparse array, the `{a: undefined}` member and the plain-object test (a)–(g)), `§1.7` (a) (the class
decision is first and taken on the value as it is), `§1.7` (b) items 1–4 (the four shipped defects the rule
forbids), `§1.7` (b) 3's dated clause (the array arm admits `Plain`/`ForeignPlain`/`Null` and refuses
`Class`), `§1.7` (c)–(d) (the shape test, then ADMIT or REFUSE), `§1.8` (no repair: nothing converts,
substitutes, defaults or truncates), `§1.8`'s dated clause (the position split and the class in the message),
`§2.5` items 1–3 (the ONE thrown form), `surface.md §2.5` item 5 (the verbose content: the failing target as
the store's generator renders it, then the class and the position, INSIDE the single form), `surface.md §2.5`
item 5 (e) (a rejection is NEVER a raw host error and NEVER a second form).

**The steps a caller takes.** For each class below: `inst.write(['v'], 'temp', <the value>)` (or the value
as a member of `{ a: <the value> }` where the member position is the subject), and then `inst.read(['v'])`.
`['v']` is unoccupied for the whole scenario, so every refusal is driven at a state whose pre-state is
absent.

**The expected observable, from the docs.** Each refusal cell asserts **all four** of: (i) a value is
THROWN; (ii) its `status` is exactly **`'ValueNotAdmitted'`**; (iii) the thrown value is a plain object whose
prototype is the caller realm's `Object.prototype` and whose own member set is **exactly**
`{message, status}`, both members being non-empty `string`s; and (iv) the `message` carries the store's own
mismatch clause for that code — **`is not an admitted value`** — as its first part. Cells marked
`+target`/`+class` add the fifth assertion the docs print for that class.

| cell | the refused class | the clause | the extra assertion the docs print |
| --- | --- | --- | --- |
| **JSG-04.1** | a `bigint` (`10n`) | `§1.2` row 10; `§1.7` (b) 1 | `+target`: the message carries the failing target's own spelling **`10n`** (and not `0`) — the `JS-6` defect this rule forbids | 
| **JSG-04.2** | a `Symbol` (`Symbol()`) | `§1.2` row 9; `§1.7` (b) 2 | `+target`: the message carries **`Symbol()`** |
| **JSG-04.3** | an object with a `Symbol`-keyed own property | `§1.4` item 1 · `DD-8` | — |
| **JSG-04.4** | a class instance (`new (class Foo {})()`) | `§1.2` row 4 (f) | `+class`: the message carries the class — **`prototype-carrying non-plain object`** |
| **JSG-04.5** | a class extending `Array` | `§1.2` row 5; `§1.7` (b) 3 | (see `JSG-04.17`) |
| **JSG-04.6** | a sparse array `[1, , 3]` | `§1.4` item 2 · `DD-8` | — |
| **JSG-04.7** | `{a: undefined}` (the member position) | `§1.4` item 3; `§1.2` row 7 | — |
| **JSG-04.8** | a `Proxy` over a plain object | `§1.4` item 4 (g) · `DD-34` | — |
| **JSG-04.9** | an object with an own accessor property | `§1.4` item 4 (c) | — |
| **JSG-04.10** | a `Map` | `§1.2` rows 4/13 | — |
| **JSG-04.11** | a `Date` | `§1.2` row 13 | — |
| **JSG-04.12** | a function | `§1.2` row 8 | — |
| **JSG-04.13** | `NaN` | `§1.2` row 11 (`NonFinite`) | — |
| **JSG-04.14** | a cycle (`const c = {n:1}; c.self = c`) | `§1.2` row 12 · `DD-11` · `§1.4` item 6 | — |

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-04.15** | after EVERY refusal above, `inst.read(['v'])` | a thrown **`AddressNotFound`** in each of the 14 cases: **no node is minted, no anchor is installed, no container changes and no journal entry is appended** | `§1.2`'s closing clause |
| **JSG-04.16** | every caught value across the 14 refusals | **not one is an `Error` instance**, and every one's own member set is exactly `{message, status}` — no raw host error is a rejection | `surface.md §2.5` item 5 (e) · **`A76`**'s reach clause |
| **JSG-04.17** | `Array.isArray(x)` for the `Array` subclass, THEN its refusal | `Array.isArray` answers **`true`** and the value is nonetheless REFUSED — the class decision is not short-circuited by a shape test | `§1.7` (a) · `§1.7` (b) 3 · `§1.7` (b) 3's dated clause |
| **JSG-04.18** | the `Array` subclass as the **ADDRESS** (`read(inst, arrSubclass)`) | **`AddressMalformed`** — the code moves with the POSITION, and the class name is never a carrier-position code | `§1.7` (b) 3; `§1.3` `AddressArg` row 11; `§1.8`'s dated clause |
| **JSG-04.19** | a `Proxy` over an array as the **ADDRESS** | **`AddressMalformed`** — the binding owns proxy detection at the argument boundary exactly as inside the walk | `§1.3` `AddressArg` row 12 · `DD-34` |
| **JSG-04.20** | a bare `string` as the address (`read(inst, 'a.b')`) | **`AddressMalformed`** — `'a.b'` is not a delimited address and is refused as a shape | `§1.3` `AddressArg` row 6 |
| **JSG-04.21** | `storeCreate` on a class instance whose own keys are `filePath`/`listeners` and whose `journalLength` is a PROTOTYPE getter | a thrown **`AddressMalformed`** (the carrier-position code for `cfg`) | `§1.7` (b) 4; `§1.8`'s dated clause 4; `parameter-semantics.md §2.1` |
| **JSG-04.22** | the message of that `cfg` refusal | it carries the class — **`prototype-carrying non-plain object`**; a `cfg` whose message does NOT carry its class is a FINDING | `§1.8`'s dated clause 4 |

**What its failure would mean.** A class that is admitted, a refusal that arrives as a raw `TypeError`/`Error`
or as a second shape, a message that is the generic clause alone where the docs print the target or the
class, or **any residue** at the refused address means the validation order and the verbose contract of
`A76` are not held: the crossing's refusal surface has a state the contract does not declare, and (where the
residue is non-empty) a refused write has **installed** something.

### JSG-05 — THE ABSENT-VERSUS-`undefined` READING (14 assertions)

**The clause(s).** `crossing.md §1.3`'s dated rule (1: a verb's trailing argument by CALL ARITY; 2: a `cfg`
key by `in`-membership), `acceptance.md §4.1` item 7 (both arities and both memberships are DRIVEN),
`§1.3`'s `TierArg` rows 3–4, `FilePathArg` rows 2–3, `JournalLengthArg` rows 2 and 9, `ListenersArg` row 5,
the store's `store-model.md §1.6` item 4 (d) (the register's conditional tier and its real bound),
`§7.1`'s shape/absence line.

**The steps a caller takes.** With a legal instance `A` over a real path (so the register is created at
`file`) and, separately, one instance whose `filePath` key is ABSENT.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-05.1** | `storeCreate({filePath: <real>, journalLength: 1, listeners: []})` | an instance; no throw | `§2.1`; `§1.3` `JournalLengthArg` row 1 |
| **JSG-05.2** | `A.write(['ab'],'mem',1)`; `A.read(['ab'])` with the tier position UNSET | **succeeds** and answers `1` — an ABSENT trailing argument is `TierArg` row 3's in-domain state | `crossing.md §1.3`'s dated rule 1; `§1.3` `TierArg` row 3 |
| **JSG-05.3** | `A.read(['ab'], undefined)` | the SAME state as absent: **succeeds**, answers `1` | `crossing.md §1.3`'s dated rule 1 |
| **JSG-05.4** | `A.read(['ab'], null)` | **`AddressMalformed`** — `null` is PRESENT and its shape is not a tier's | `§1.3` `TierArg` row 4 |
| **JSG-05.5** | `A.read(['ab'], [])` | **succeeds**, answers `1` — a `0`-token set is the zero-tier arm (the lowest-persistence selection) | store `store-model.md §2.3`'s zero-tier bullet; `§1.3` `TierArg` row 2 |
| **JSG-05.6** | `A.write(['abt'],'mem',1)`; `A.delete(['abt'])` with the tier position unset | **succeeds**; the receipt's `tiers` is `['mem']` | `§1.3` `TierArg` row 3 (delete); store `§4.4` `D-2` |
| **JSG-05.7** | `A.write(['x'])` — the tier position unset on a WRITE | **`AddressMalformed`** — a required argument is missing | `§1.3` `TierArg` row 3 (write); store `write-and-read.md §3.4` `F-1` |
| **JSG-05.8** | `storeCreate({journalLength: 1, listeners: []})` — `filePath` ABSENT | **IN DOMAIN**: an instance IS returned | `§1.3` `FilePathArg` row 2 |
| **JSG-05.9** | on that instance, `write(['x2'],'file',1)` | **`ParentAnchorMonotonicityViolation`** — the register is created at `mem`, so `file` is unreachable at a register key | store `store-model.md §1.6` item 4 (d)(ii); `§8.1` #6 |
| **JSG-05.10** | `storeCreate({filePath: undefined, journalLength: 1, listeners: []})` — the key PRESENT carrying `undefined` | **`AddressMalformed`** | `§1.3` `FilePathArg` row 3; `crossing.md §1.3`'s dated rule 2 |
| **JSG-05.11** | `storeCreate({filePath: <real>, listeners: []})` — `journalLength` ABSENT | **`ConstructionArgumentMissing`** — the ONE absence the amended construction still refuses | `§1.3` `JournalLengthArg` row 2; store `§8.1` #12's reconciliation clause |
| **JSG-05.12** | `storeCreate({filePath: <real>, journalLength: undefined, listeners: []})` | **`AddressMalformed`** — the two states are told apart by their ANSWER | `§1.3` `JournalLengthArg` row 9; `crossing.md §1.3`'s dated rule 2 |
| **JSG-05.13** | `storeCreate({filePath: <real>, journalLength: 1})` — `listeners` ABSENT | **`AddressMalformed`** — the ONE absence the construction does not admit | `§1.3` `ListenersArg` row 5 |
| **JSG-05.14** | `storeCreate({filePath: <real>, journalLength: 1, listeners: undefined})` | **`AddressMalformed`** — the same ANSWER, still TWO states of the carrier | `§1.3` `ListenersArg` row 5's other state |

**What its failure would mean.** A missing argument that is defaulted, a `cfg` key read through the prototype
chain or by a truthiness test, an absent `journalLength` accepted, an absent `filePath` refused, or two
states collapsing into one code where the contract declares two **turns a declared refusal unreachable and
makes a state the contract does not declare reachable**: `§4.1` item 7's drive is then unmet and the
carriers' row tables are not total.

### JSG-06 — THE CEILING'S ARMS AND THE ANCESTOR-STACK GUARD (7 assertions)

**The clause(s).** `§1.4` item 5 (the declared bound `64` / `1,000,000` and its answer `ValueNotAdmitted`),
its first dated clause (THE ARM: the refusal belongs to the package's own walk, produced before any verb is
called) and its second dated clause (the two-arm split: `63`/`64` ADMITTED, `65` REFUSED by the conversion
core's bound, `66` and beyond REFUSED by the boundary's own encoder carrying the store's outside class
`Cyclic`), `§1.4` item 6 · `DD-11` (the ancestor stack and the ADMITTED diamond), `crossing.md §1.4` item 5's
dated clause and `crossing.md §1.7` (a).

**The steps a caller takes.** `nest(k)` is **`k` nested arrays**: `nest(1) = [0]`, `nest(k) = [nest(k-1)]`, so
the value's nesting depth is `k` by the plain reading of *"nesting depth"*. For `k` in `63`,`64`,`65`,`66`:
`inst.write(['d'+k], 'temp', nest(k))` and, where the write succeeds, `inst.read(['d'+k])`. Then the diamond
and the cycle.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-06.1** | `nest(63)` at `temp` | **ADMITTED**: the write succeeds and the value round-trips under `§1.5` | `crossing.md §1.4` item 5's dated two-arm table |
| **JSG-06.2** | `nest(64)` at `temp` | **ADMITTED**: same | idem |
| **JSG-06.3** | `nest(65)` at `temp` | **REFUSED `ValueNotAdmitted`** — the conversion core's own bound, one past the declared one | idem; `DD-10` |
| **JSG-06.4** | `nest(66)` at `temp` | **REFUSED `ValueNotAdmitted`** — the same code by the boundary's own encoder's arm, whatever class it carries | idem |
| **JSG-06.5** | the `65` refusal's thrown value | the ONE declared form: a plain object, member set exactly `{message, status}`, `status === 'ValueNotAdmitted'`, message non-empty | `§2.5` items 1–3; `§1.7` (d) |
| **JSG-06.6** | the `66` refusal's thrown value | the same form and the same code — **the two arms answer ONE answer** | idem |
| **JSG-06.7** | `const d = {n:1}; write(['dia'],'temp',{x:d, y:d})` | **ADMITTED** and round-trips: the guard is the walk's OWN ANCESTOR STACK and a DIAMOND is not a cycle | `§1.4` item 6 · `DD-11` |

**What its failure would mean.** A `63` or `64` refused means the declared bound is **narrower in the
build than in the contract**; a `65` or `66` admitted means the bound is **not enforced at all**; a raw host
`RangeError` in place of `ValueNotAdmitted` means a failure OUTSIDE the store's closed `15`-member set has
become reachable (`DD-10`'s priced alternative, refused); and a refused diamond means the guard is a
`WeakSet` of visited objects and not an ancestor stack (`DD-11`).

**Not driven here, named.** **The `1,000,000`-node state is NOT driven.** The RCA
(`docs/specs/storeroom-js-rca-scaling.md §1`, `§6` item 2) records that at its filing the `1,000,000` state
is **refused where the declared bound admits it** and that the call blows a drive's work budget; driving it
here would be a **performance measurement at a figure the RCA declares unrepaired**, and this set's own
scaling cell (`JSG-13`) is deliberately the few-thousand-member one. **The `1,000,001` figure is therefore
also not asserted, and neither exclusion weakens `JSG-06.1`–`JSG-06.4`.**

### JSG-07 — THE TIERS AND THE PURGE, AND THE DELETE'S OWN TIER SCOPE (15 assertions)

**The clause(s).** `§2.2` (`read`'s `tier` accepts zero to many and an array is an ANY-MATCH set), the
store's `§5.1` (`M-1`: `file` `2` > `mem` `1` > `temp` `0`), `store-model.md §2.3` (the zero-tier arm selects
the LOWEST-persistence anchor; the passed set is an any-match set with the same lowest-persistence rule over
the matched subset), `write-and-read.md §3.4` (`W-5` the shadow, `W-6` the purge), `§5.4`'s purge chain,
`write-and-read.md §4.2` (`R-4`), `§4.3` and `§4.4` (`D-1`/`D-2`/`D-3`), `crossing.md §1.3`'s `TierArg` rows
1–2, `DD-37`.

**The steps a caller takes.** On one instance over a real `filePath` (register at `file`, so all three tiers
are reachable at a register key):

1. `write(['p'],'file',100)`
2. `write(['p'],'temp',1)` — a LESS persistent write at a key holding a more persistent version
3. `write(['p'],'mem',2)` — a MORE persistent write at a key holding a less persistent version
4. `write(['p'],'file',300)` — a MORE persistent write at a key holding versions on both sides

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-07.1** | after step 1: `read(['p'])` | `100` (the only version) | store `§4.1`; `R-1` |
| **JSG-07.2** | after step 2: `read(['p'])` | **`1`** — the less persistent anchor IS the shadowing one and the unqualified read selects it | `store-model.md §2.3`'s zero-tier arm; store `§5.3` item 2 · **`A11`** |
| **JSG-07.3** | after step 2: `read(['p'],'file')` | **`100`** — the shadowed version SURVIVES (`W-5`) | `write-and-read.md §3.4` `W-5` |
| **JSG-07.4** | after step 2: `read(['p'],'temp')` | **`1`** | `§2.2`; store `§4.2` `R-4` |
| **JSG-07.5** | after step 3: `read(['p'])` | **`2`** — the `mem` write purged the `temp` version (`rank ≤ 1`) | `§5.4`'s purge chain; `write-and-read.md §3.4` `W-6` |
| **JSG-07.6** | after step 3: `read(['p'],'file')` | **`100`** — `file` stands (`rank 2 > 1`, left standing) | `§5.4`'s purge chain column |
| **JSG-07.7** | after step 3: `read(['p'],'temp')` | **`TierNotFound`** — the key exists and the tier does not | `store-model.md §2.3`; store `§8.1` #4 |
| **JSG-07.8** | after step 4: `read(['p'])` | **`300`** — the `file` write purged `file`, `mem` and `temp` (`rank ≤ 2`) | `§5.4`'s purge chain; `W-6` |
| **JSG-07.9** | after step 4: `read(['p'],'mem')` | **`TierNotFound`** | idem; `§8.1` #4 |
| **JSG-07.10** | `write(inst, ['set'], 'file', 8)`; `write(inst, ['set'], 'temp', 7)`; `read(inst, ['set'], ['file','temp'])` | a **tier-qualified set read over a key holding TWO versions** answers the **lowest-persistence member of the matched subset**: **`7`** — the set is an ANY-MATCH set and never an ordered preference | store `store-model.md §2.3`; `§4.2` `R-4`; `DD-37` |
| **JSG-07.11** | `read(['p'],['file','file'])` | the SAME answer as `['file']` — **duplicates are included** in the set's domain and change nothing | `§1.3` `TierArg` row 2 |
| **JSG-07.12** | `write(inst, ['pa'], ['temp'], [1])` — the **THIRD** argument, the tier POSITION, as an ARRAY | **`OutOfDomainTier`** — the array spelling is the READER's arity | `§1.3` `TierArg` row 2; `§5.4` (`P-SM-4`) |
| **JSG-07.13** | `write(['d1'],'file',2)`; `write(['d1'],'temp',1)`; `delete(['d1'],'temp')` | **succeeds**; the receipt's `tiers` is **`['temp']`**; and `read(['d1'])` answers **`2`** — only the named tier's version was removed | store `§4.4` `D-1`; `§4.3` |
| **JSG-07.14** | `delete(['d1'])` — the tier position UNSET on an occupied address | **succeeds**; `tiers` is **`['file']`**; `read(['d1'])` throws **`AddressNotFound`** | store `§4.4` `D-2` |
| **JSG-07.15** | `write(['d3'],'mem',1)`; `delete(['d3'],'file')` | **a SUCCESS carrying `tiers: []`** — the target resolves and the NAMED tier holds no version; no code is produced | store `§4.4` `D-3` · `DD-9` |

**What its failure would mean.** A shadow that does not win the unqualified read, a version that does not
survive a less persistent write, a purge that removes a version outside `rank ≤ rank(write tier)`, a
set read that behaves as an ordered preference or as a filter, or a delete that removes a tier it did not
name means the **one-predicate discipline** (`A11`) and `A19`'s purge are not the build's: the tier property
is then not carried by anchors as the directive rules.

### JSG-08 — THE HANDLE AND THE TRIGGERED IDS (22 assertions)

**The clause(s).** `§2.3` items 1–6 (the process-scoped token, the two spellings, the accepted hazard, the
no-op set, the prefix test, and the INHERITED MINT RULE with its two arms), `§2.4` rules 1–4 and item 6 (the
id-matching model: the store passes an ID back, the JS side matches it, an id with no function fires
nothing and the silence is an ASSERTABLE observable), `§2.7` items 1–5 (the `triggered` array, the window,
no order, the throwing body, and the invocation's ONE argument), `§2.10`, `parameter-semantics.md §2.12`'s
dated producer clause and `§2.15`'s dated clause (the two data are different data), the store's `§6.5`
items 10–12 — **`A57`** · **`A69`** · **`A77`**.

**The steps a caller takes.** **The verbs are the MODULE's, with the instance as their FIRST argument**
(`§2.2`'s and `§2.10`'s signatures: `read(instance, address, tier?)`, `write(instance, address, tier, value)`,
`listen(instance, address)`, `unlisten(instance, handle)`, …); **`register(handle, listener)` is the one
member reached through the INSTANCE the factory returned** (`§2.4` item 5 (a)). **And a listener binds to an
ADDRESS, so the address must be one a WRITE CAN RESOLVE THROUGH** — a failed write returns nothing, so
nothing can fire: **a branch is minted at each listener's own address FIRST** (`write(inst, ['ev'], 'temp',
{})`), and only then is the listener registered there. On one instance: (1) mint the branches at `['ev']`,
`['no']`, `['keep']` and `['wit']`; (2) `const h1 = listen(inst, ['ev'])`; (3)
`inst.register(h1, fn)` with `fn` recording its arguments; (4) `write(inst, ['ev','child'], 'temp', 5)`;
(5) `write(inst, ['ev','child2'], 'temp', 6)`; (6) `const h2 = listen(inst, ['no'])` and a write at
`['no','x']` with no function registered for `h2`; (7) `unlisten(inst, h1)` and another write under `['ev']`;
(8) the two mint-rule arms at `['keep']` and `['wit']`; (9) the lawful duplicate at the construction.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-08.1** | `typeof h1` | **`'object'`** and NOT `'string'` — every handle a verb returns is the package's opaque value | `§2.3` item 2 · `DD-14` |
| **JSG-08.2** | `Object.keys(h1).length` | `0` — the token is PRIVATE and readable by no JS code | `§2.3` item 2 · `DD-28` |
| **JSG-08.3** | `JSON.stringify(h1)` and `String(h1)` | **neither spells a token** (no `listener-` fragment) — the package never spells a token | `§2.3` item 3 (ii) · `DD-28` |
| **JSG-08.4** | `inst.register(h1, fn)` | **`undefined`** on success | `§2.4` item 5 (b) |
| **JSG-08.5** | step (3): the returned record's `triggered` | a non-empty array **containing `h1`** — the id the record carries is the id REGISTRATION was given | `§2.7` item 1; `§2.4` item 6 (a) · **`A77`** |
| **JSG-08.6** | step (3): `fn`'s call count | **exactly `1`** — one invocation per distinct id | `§2.4` rule 3 and item 6 (b) |
| **JSG-08.7** | step (3): `fn`'s `arguments.length` | **exactly `1`** | `§2.7` item 5 |
| **JSG-08.8** | step (3): `fn`'s single argument | **EQUAL to the triggering address `['ev','child']`** (an array, index-equal) — the TRIGGERING ADDRESS and not the id | `§2.7` item 5; `parameter-semantics.md §2.12`'s dated producer clause |
| **JSG-08.9** | step (3): is `fn`'s argument the handle `h1`? | **NO** — the two data are different data | `surface.md §2.4` item 6 (d); `parameter-semantics.md §2.15`'s dated clause |
| **JSG-08.10** | step (4): the record's `triggered` | still contains **`h1`** — the binding is BY ADDRESS and the prefix test is DESCENDANT-INCLUSIVE | `§2.3` item 5; store `§6.5` item 3 |
| **JSG-08.11** | step (5): the record's `triggered` | contains **`h2`** — the address matches, so the id is returned | store `§6.5` item 10 (c) |
| **JSG-08.12** | step (5): the count of `fn` invocations across it | **unchanged** — an id the package holds NO function for invokes nothing | `§2.4` rule 1; `surface.md §2.4` item 6 (c) |
| **JSG-08.13** | step (5): any `console` output (`log`/`warn`/`error`/`info`/`debug` captured) | **none** — no code, no warning, no log; the silence is an assertable observable | `§2.4` rule 1; `surface.md §2.4` item 6 (c) |
| **JSG-08.14** | step (5): any exception escaping the write | **none** — the unregistered id's state produces no throw | `surface.md §2.4` item 6 (c) |
| **JSG-08.15** | `unlisten(inst, h1)` | **`undefined`** | `§2.10` |
| **JSG-08.16** | after `unlisten`: a write under `['ev']` | the record's `triggered` **does NOT contain `h1`** — the store-side home entry is gone | `§2.4` rule 4; `§2.3` item 6 |
| **JSG-08.17** | after `unlisten`: `fn`'s invocation count | **unchanged** — a function whose id is withdrawn simply never fires again | `§2.4` rule 4 · `DD-15` |
| **JSG-08.18** | the STILL-REGISTERED arm: `listen(inst, ['keep'])` twice, with `['keep']` a resolvable address | the TWO calls return **the same opaque value** — a repeat `listen` at a registered address mints nothing and returns the existing entry's handle | `§2.3` item 6; `surface.md §2.3`'s dated pointer |
| **JSG-08.19** | a write under `['keep']` after those two `listen`s | the record's `triggered` carries that address ONCE (its distinct-handle set has ONE member) | store `§6.5` item 2; `§2.4` rule 3 |
| **JSG-08.20** | the WITHDRAWN arm: `const a = listen(inst, ['wit'])`; `unlisten(inst, a)`; `const b = listen(inst, ['wit'])` | **`a !== b`** — the withdrawal removed that address's home entry, so the next `listen` mints a FRESH token | `§2.3` item 6's withdrawn arm |
| **JSG-08.21** | the lawful duplicate: two construction entries at ONE address carrying the SAME caller-spelled token; then `register` that handle once, then a write there | the registry fires **ONCE** — one invocation per DISTINCT handle, not one per occurrence and not one per entry | `§2.4` rule 3; the store's `DD-42` clause |
| **JSG-08.22** | the same drive: the DISTINCT-handle set of the record's `triggered` | **ONE** distinct member (the address's own) — the set, never the sequence | `parameter-semantics.md §2.15`; `§2.7` item 3 |

**What its failure would mean.** A `triggered` member that carries a token instead of the registered
identity, a function that never fires or fires twice, an invocation with zero or two arguments, an id that
fires while the package holds no function for it (or one that throws or logs), an `unlisten` that does not
stop the fire, or a `listen` whose mint rule disagrees with `A45`'s one-entry-per-address — each means **the
store's returned id and the package's registry do not meet**, which is the whole of `A57`/`A77`'s model.

**A named tension, not driven as a count.** `§2.4` rule 3 prints *"the store returns that token ONCE in the
triggered set where the store minted it"* while the store's `DD-42` clause prints, for the caller-spelled
duplicate, *"`triggered` carries the token twice"*. **This set therefore asserts the DISTINCT-handle set and
the invocation count (which both clauses yield) and does NOT assert the duplicate token's multiplicity in
the array**, because the two documents print two counts for that one state. The tension is reported as a
DOC-side finding at `archive/gate5/storeroom-js-greens-run.md`.

### JSG-09 — THE REGISTRATION SITE'S DOMAIN AND ITS REFUSAL FORM (12 assertions)

**The clause(s).** `§2.4` item 5 (b)–(e) (the signature, the per-instance domain, every outside value's
answer, and the two throw sites' distinction), `surface.md §2.5` item 5 (g) (THE OPERATIVE READING: the
registration site's refusal travels in the SINGLE form with the store's own `AddressMalformed`),
`surface.md §2.4` item 6's reconciliation clause ((f) speaks of the arm's DOMAIN and (g) of the arm's FORM),
`parameter-semantics.md §2.12`'s second dated clause, and `§0.2`'s `SW-1` record's final clause item 1
(*"the operative reading is `surface.md §2.5` item 5's clause (g) … which is also what this pass's dated
clause at item 6 (f) reads that model's "does not widen" sentence through"*).

**The steps a caller takes.** On one instance: (1) mint a branch at `['site']`
(`write(inst, ['site'], 'temp', {})`), so a write under it can resolve; (2) `const hIn = listen(inst,
['site'])`; (3) register an in-domain handle there; (4) re-register it; (5) then offer a bare `string`, a
fabricated opaque-looking value, `null`, and an absent argument; (6) re-read the registration that was in
place before a refusal, by a write under `['site']`.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-09.1** | `inst.register(hInDomain, f1)` | **`undefined`** | `§2.4` item 5 (b) |
| **JSG-09.2** | `inst.register(hInDomain, f2)` — a RE-registration | **`undefined`** (a success, `undefined`, on every success including a replacement) | `§2.4` item 5 (b) & rule 2 |
| **JSG-09.3** | a write at that address after the replacement | **`f2` fires and `f1` does NOT** — the previous function is replaced and dropped without notice | `§2.4` rule 2 |
| **JSG-09.4** | `inst.register('a-bare-string', f)` | a value is **THROWN** | `§2.4` item 5 (d); `surface.md §2.5` item 5 (g) |
| **JSG-09.5** | that thrown value's `status` | **`'AddressMalformed'`** — the store's own member token, minted by nothing | `surface.md §2.5` item 5 (g); `SW-1`'s final clause item 1; `DD-40` |
| **JSG-09.6** | that thrown value's FORM | the single form: a plain object whose prototype is the caller realm's `Object.prototype` and whose own member set is **exactly `{message, status}`**, both non-empty strings | `surface.md §2.5` items 1–3; item 5 (e) |
| **JSG-09.7** | `inst.register(<a fabricated opaque-looking object>, f)` | the SAME thrown form and the SAME `status` — the registration site admits the handle's OPAQUE spelling and by nothing else | `§2.4` item 5 (d) |
| **JSG-09.8** | `inst.register(null, f)` | the SAME thrown form and status | `§2.4` item 5 (d) |
| **JSG-09.9** | `inst.register(hInDomain)` — the `listener` position ABSENT | the SAME thrown form and status — `listener` must be a function | `§2.4` item 5 (c)–(d) |
| **JSG-09.10** | `inst.register()` — both positions absent | the SAME thrown form and status | `§2.4` item 5 (d) |
| **JSG-09.11** | after every refusal above: a write at the address of the registration that stood BEFORE them | the record's `triggered` still carries that handle and its function still fires — **no standing registration is disturbed by a refusal** | `§2.4` item 5 (d)'s *"nothing reaches the store in any of these cases … changes no node"* |
| **JSG-09.12** | the `message` of the refusals above | a non-empty `string` carrying the failing target's spelling as the store's generator renders it, and **no unsubstituted `<…>` placeholder** | `surface.md §2.5` item 5 (a) & (e); store `§8.2` property (c) |

**What its failure would mean.** A bare `string` accepted at the registration site, a refusal that arrives
as a raw `TypeError` or as a second form, or a status MINTED at the boundary (`TypeError` is a token the
store's closed set does not hold) means **`A76`'s single-form rule is broken at the one site that is not a
crossing** — and, at `JSG-09.11`, that a refusal has disturbed the store.

**The as-filed cells this scenario reads through, named.** `contract.md §2.4` item 5 (d),
`parameter-semantics.md §2.12`'s first exception clause and `acceptance.md §4.1` item 9 each print a JS
`TypeError` for this site. **The operative reading this set asserts is the one the later dated clauses
declare** (`surface.md §2.5` item 5 (g); `parameter-semantics.md §2.12`'s second dated clause; `SW-1`'s final
clause item 1: *"the operative reading is `surface.md §2.5` item 5's clause (g) — the single `{status,
message}` with the store's own `AddressMalformed`"*), and **a build that answers a bare `TypeError` here is
therefore reported as a divergence between the build and the operative clause, with the as-filed cells named
on the documents' own side.**

### JSG-10 — THE CLOSED FAIL SET (24 assertions)

**The clause(s).** `§2.5` (the ONE thrown form and its two members), `§2.9` item 2 (a failed `read` is the
existence probe and **ALL `15` FAIL CODES REMAIN REACHABLE FROM JS**), `§5.3`'s `P-IM-3`, `crossing.md §1.3`'s
carrier tables, the store's `§8.1` (the closed `15`-member set with each member's trigger), `§8.2` (the
generator's rule, its three properties and its three worked examples), `§8.3`, `§6.1` item 5 (the
compression trigger), `§7.1` (the construction's outside values), `§7.2` items 3–5 (the commit's failure arm
and the automatic journal rollback).

**The steps a caller takes.** **The write's PARENT RULE must be honoured by the drive** (`§3.2`): a write
resolves its parent by walking the address MINUS its last segment, so **a branch is minted at every parent
level FIRST** (`write(inst, ['window'], 'mem', {})` before `write(inst, ['window','tabs'], 'mem', …)`), or the
write fails the walk's own code and no cell below is driven. One drive per code, each by the trigger that
code's own row prints; then three form cells over the whole set; then the two exact worked messages the
store's contract prints.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-10.1** | `read(inst, 'a.b')` | **`AddressMalformed`** | `§1.3` `AddressArg` row 6; store `§8.1` #1 |
| **JSG-10.2** | `A.write(['x'])` — the write's tier absent | **`AddressMalformed`** | `§1.3` `TierArg` row 3; store `§8.1` #1 ; `F-1` |
| **JSG-10.3** | `read(inst, ['nothing-here'])` | **`AddressNotFound`** | store `§8.1` #2 (`L-3`) |
| **JSG-10.4** | `write(['lf'],'temp',1)`; `read(['lf','down'])` | **`LeafHasNoDownstream`** | store `§8.1` #3 (`L-4`) |
| **JSG-10.5** | `write(['tt'],'mem',1)`; `read(['tt'],'temp')` | **`TierNotFound`** | store `§8.1` #4 (`L-TIER`) |
| **JSG-10.6** | `read(['tt'],'secure')` | **`OutOfDomainTier`** | store `§8.1` #5 · **`A29`** |
| **JSG-10.7** | a store whose `filePath` is ABSENT (register at `mem`); `write(['m'],'mem',{})`; then `write(['m','k'],'file',1)` | **`ParentAnchorMonotonicityViolation`** | store `§8.1` #6 (`F-6`); `store-model.md §1.6` item 4 (d)(ii) |
| **JSG-10.8** | `write(['cc'],'mem',{})`; then `write(['cc'],'mem',[1])` | **`ContainerKindConflict`** | store `§8.1` #7 (`F-4`) |
| **JSG-10.9** | `write(['rb'],'temp',{})`; then `readLiteral(['rb'])` | **`ReadTargetIsBranch`** | store `§8.1` #8; `write-and-read.md §4.1.1` item 3 |
| **JSG-10.10** | `write(['wp'],'temp',1)`; then `write(['wp','down'],'temp',2)` | **`WriteParentNotLink`** | store `§8.1` #9 (`F-5`) |
| **JSG-10.11** | `rollback(inst, 'no-such-op')` | **`JournalOpUnknown`** | store `§8.1` #10 (`M-11`) |
| **JSG-10.12** | a store with `journalLength: 1`; two successful writes; then `rollback(<the FIRST write's opId>)` | **`RollbackCompacted`** — the append compressed the oldest entry and a rollback whose candidate set includes a compacted entry fails ALL-OR-NOTHING | store `§8.1` #11 · `§6.1` item 5 · `§6.4` `M-6` |
| **JSG-10.13** | `storeCreate({filePath: <real>, listeners: []})` — `journalLength` absent | **`ConstructionArgumentMissing`** | store `§8.1` #12; `§7.1` |
| **JSG-10.14** | `storeCreate({filePath: <a path whose parent directory does not exist>, journalLength: 1, listeners: []})` | **`FilePathUnreachable`**, and no instance is returned | store `§8.1` #13; `§7.1`; `crossing.md §1.3` `FilePathArg` row 4 |
| **JSG-10.15** | `write(['nv'],'temp',NaN)` | **`ValueNotAdmitted`** | store `§8.1` #14; `§1.2` row 11 |
| **JSG-10.16** | a `file`-tier write whose path becomes unwritable **after** construction (the file's parent is replaced by a regular file) | **`FileCommitFailed`**, delivered to the caller | store `§8.1` #15; `§7.2` items 3–4 |
| **JSG-10.17** | the same drive, immediately after the failure: `read(<the written address>)` | the pre-write state stands — **`A16`'s automatic journal rollback has run before the failure is returned** | store `§6.4` item 8; `§7.2` item 3 (i) |
| **JSG-10.18** | every thrown value across `JSG-10.1`–`JSG-10.17` | a plain object whose own member set is **exactly `{message, status}`**, both non-empty `string`s — ONE form for the whole set | `§2.5` items 1–3 · `DD-12` |
| **JSG-10.19** | every `status` observed across the whole set | a member of the store's closed `15`-member set — **no code outside the set, and none minted by the package** | `§2.5` item 1 · `DD-40` |
| **JSG-10.20** | every `message` observed across the whole set | non-empty, and carrying **no unsubstituted placeholder token** of the generator's own form (`<SEGMENT>`, `<CONTAINER>`, `<KEYLIST>`, `<TIERLIST>`, `<DOMAINLIST>`, `<mismatch clause>`, `<available clause>`, `<argument-name>`, `<TRAITS>`) | store `§8.2` property (c) |
| **JSG-10.21** | `write(['window'],'mem',{})`; then `read(['window','empty'])` | **`AddressNotFound`**, and the message is **exactly** `'empty' does not exist in 'window', it holds no keys` | store `§8.2`'s worked example (2) and its degenerate arm |
| **JSG-10.22** | `write(inst, ['window'], 'mem', {})`; then `write(inst, ['window','tabs'], 'mem', {doc1:1, searchbar:2})`; then `read(inst, ['window','tabs','LandingPage'])` | **`AddressNotFound`**, and the message is **exactly** `'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'` | store `§8.2`'s worked example (1) and its `<CONTAINERSEGMENT>` reconciliation |
| **JSG-10.23** | `write(['window','tabs'],'mem',[1,2])` over the `MAP` that stands there | **`ContainerKindConflict`**, and the message **contains** `does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'` | store `§8.2`'s worked example (3) |
| **JSG-10.24** | the three worked messages above, against the refusal the package threw | the store's generated string is **verbatim** in the message: for a failure the STORE produces, the message is that string and not a hand-authored one, while a refusal the package's own walk produces is the generator's part with the boundary's class/position clause APPENDED after it | `§2.5` item 2; `surface.md §2.5` item 6 (d); its `CF-3` clause 1 and 4 |

**What its failure would mean.** A code with no reachable trigger from the claimed entry means `§2.9` item
2's figure is false of the package; a returned (rather than thrown) failure, a `Promise` rejection, an
`Error` instance, a third member, a lowercased or prefixed `status`, a package-minted code, an empty or
hand-authored `message`, or a message that differs from the store's generated string where the store
produced it — each is `P-IM-3`'s FAILURE LIST item for item, and each leaves a caller unable to read the
failure's target and reason out of the ONE record it is given.

**A named tension, recorded rather than asserted away.** `§2.9` item 2 prints **`15`** reachable codes while
`§0.2`'s `SW-1` record's row `9` prints **`10`** reached by the shipped JS arms and names
`RollbackCompacted` and `ParentAnchorMonotonicityViolation` as having no reachable trigger **as of that
pass**. The set drives all fifteen; a code the build cannot produce is reported as a FINDING against the
side the record names.

### JSG-11 — THE JOURNAL AND THE ROLLBACK (18 assertions)

**The clause(s).** `§2.2` (the three returned records), `§2.6` (the `write` → `rollback` usage pattern),
`parameter-semantics.md §2.13` (the op's eight members in the store's own spellings), the store's `§3.6`
(`WriteResult`), `§6.1` item 1 (the entry-formation rule), `§6.2` (the op's shape, its content duty and its
four properties), `§6.3` (`RollbackResult`'s three members; `undoneOps` in reverse append order), `§6.4`
(`M-5` the scope, `M-8` totality, `M-9` the residue and the no-append rule, `M-10` atomicity, `M-11` the
unknown id), `DD-39`.

**The steps a caller takes.** On a fresh instance over a real path: (1) `const w = write(['j'],'mem',V)`;
(2) read the op's members; (3) `read(['j'])`; (4) `rollback(inst, w.op.opId)`; (5) `read(['j'])`; (6)
`rollback(inst, 'no-such-op')`; (7) a second write to read its `seq`.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-11.1** | the write's returned record | its own member set is **exactly `{op, watched, triggered}`** | `§2.2`; store `§3.6` · `DD-35` |
| **JSG-11.2** | the op's own member set | **exactly** `{opId, kind, address, before, after, seq, compacted}` + `tier`: the store's own eight members | `parameter-semantics.md §2.13`; store `§6.2` |
| **JSG-11.3** | `op.opId` | a **non-empty `string`** | store `§6.2` property 3 |
| **JSG-11.4** | `op.kind` | **`'write'`** | store `§6.2` property 4 |
| **JSG-11.5** | `op.address` | the address the verb was called with, **VERBATIM, in order** | store `§6.2` |
| **JSG-11.6** | `op.tier` | **`'mem'`** — a tier crosses as the string token | `DD-39`; store `§6.2` |
| **JSG-11.7** | `op.seq` | a `number`, **`>= 1`** (strictly increasing from `1`) | store `§6.2` |
| **JSG-11.8** | `op.compacted` | **`false`** — a fresh entry is in every later walk's candidate set | store `§6.2`; `§6.4` `M-9` |
| **JSG-11.9** | `op.before` | **`{present: false}`** at an address whose pre-state was absent | store `§6.2` (`BaseState`) |
| **JSG-11.10** | `op.after` | `present: true` and its value EQUAL to `V` under `§1.5` | store `§6.2` property 2 |
| **JSG-11.11** | `op.watched` | an ARRAY (possibly empty), never `undefined` | `parameter-semantics.md §2.14`; store `§3.6` |
| **JSG-11.12** | `rollback(inst, op.opId)` | a returned record whose own member set is **exactly** `{opId, undoneOps, restoredTo}` | store `§6.3` |
| **JSG-11.13** | that record's `opId` | the id the caller passed, **echoed** | store `§6.3` |
| **JSG-11.14** | that record's `undoneOps` | an array **containing `op.opId`** — the id whose reversal the store actually performed | store `§6.3`; `§6.4` `M-7` (i) |
| **JSG-11.15** | that record's `restoredTo` | **`{present: false}`** — the state the addressed subtree now stands at | store `§6.3`; `§6.4` `M-5`/`M-8` |
| **JSG-11.16** | `read(['j'])` after the rollback | **`AddressNotFound`** — the write that installed the node was undone | store `§6.4` `M-5`/`M-8` |
| **JSG-11.17** | `rollback(inst, 'no-such-op')` | a thrown **`JournalOpUnknown`** in the single form | store `§8.1` #10 · `§6.4` `M-11`; `§1.3` `OpIdArg` row 2 |
| **JSG-11.18** | after the rollback, a NEW write at a fresh address: its `op.seq` | **`2`** — a rollback appends NO journal entry, so the next write's `seq` continues as though the rollback had not happened | store `§6.4` `M-9` (iv); `§6.1` item 1 |

**What its failure would mean.** An op whose shape is renamed, camel-cased or short a member; a `rollback`
that echoes nothing, reports an unperformed reversal, or restores a state the store does not stand at; a
rollback that appends a journal entry; or an unknown id that does not answer its declared code — each
breaks `A37`'s content duty or `A35`'s reach, and the journal ceases to be the observable `J-5` names.

### JSG-12 — THE PACKAGE AND THE LAYER (18 assertions)

**The clause(s).** `package.md §1.1`–`§1.4` (the claimed realm, the internal reach and its five internal
names, the one entry and the `exports` map, the engine floor), `§3.1`–`§3.5` (the identity, the matrix, the
licence, the crate layout, the ownership clause), `§4.1`–`§4.2` (the runner and the LAYER label),
`package.md §4.5` item 5, `§3.2`'s `HO-` rows, `DD-4` · `DD-18` · `DD-20` · `DD-24` · `DD-25` · `DD-26` ·
`DD-38` · `DD-43`, `§0.2`'s `SW-1` record's HELD rows (for the manifest facts they print).

**The steps a caller takes.** (1) `import` the entry and enumerate its namespace. (2) Read the package's
own **published manifest** (`bindings/js/package.json`) — **the package's declared surface and not
implementation source; no `.js`/`.mjs`/`.rs` byte is read by this set** — and compare each declared fact with
the clause that prints it.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-12.1** | the one `import` of the claimed entry | it **resolves**, and the namespace carries the `8` verbs | `§3.1` · **`A70`**; `package.md §1.1` |
| **JSG-12.2** | the namespace's names | exactly the `8` verbs — the entry's named exports are those and NOTHING ELSE | `package.md §1.3` item 3; `§2.9` item 1 |
| **JSG-12.3** | the manifest's `exports` map: its key count | **exactly ONE arms-bearing entry** (the `.` key) | `package.md §1.3` item 1 · `DD-24` |
| **JSG-12.4** | the `exports['.']` arms | an **ESM** arm (`import`/`default` naming a `.mjs` file) | `package.md §1.3` item 1 · `DD-4` |
| **JSG-12.5** | a `require` arm under `exports['.']` | **absent** — publishing a CJS arm is refused, and CJS is `HO-1`'s unclaimed realm | `package.md §1.3` item 1 · `DD-24`; `§3.2` `HO-1` |
| **JSG-12.6** | a wildcard `'./*'` key | **absent** — it would expose the `.node` path | `package.md §1.3` item 2 |
| **JSG-12.7** | the manifest's `main` field | **absent** — no second, arms-bearing CJS entry | `package.md §1.3` items 1–2 · `DD-24` |
| **JSG-12.8** | the manifest's `engines.node` | **`'>=18.0.0'`** | `package.md §1.4` item 1 · `DD-38` |
| **JSG-12.9** | the manifest's `license` | **`'AGPL-3.0'`** | `package.md §3.4` item 6 · `DD-43` |
| **JSG-12.10** | the manifest's registry identity `name` | **`'provident-storeroom'`** — **UNSCOPED, the identity the architect's ruling names; asserted EXACTLY and in no looser form.** **The value this cell asserted before the `U-STOREROOM-PUBLISH` re-derivation was `'@provident-storeroom/js'`; the OLD value was `package.md §3.3` item 1's and `DD-26`'s PRE-RENAME declaration, and `PAR-PUB-1` FIXES the new value** | **`PAR-PUB-1`** · **`A82`** · `docs/specs/storeroom-publish/distribution.md §6.1` item 1 (as filed: `§3.3` item 1 · `DD-26`) |
| **JSG-12.11** | the manifest's `optionalDependencies` count | **`5`** — the matrix is five targets | `package.md §3.2` item 2 · `DD-25` |
| **JSG-12.12** | their names, label for label | **`@auspicion/provident-storeroom-js-linux-x64-gnu`** · **`@auspicion/provident-storeroom-js-linux-arm64-gnu`** · **`@auspicion/provident-storeroom-js-darwin-x64`** · **`@auspicion/provident-storeroom-js-darwin-arm64`** · **`@auspicion/provident-storeroom-js-win32-x64-msvc`** — the label-to-artefact map, project token and toolchain suffixes included, **at the `A88`(a) spellings, the names made to NAME THE PROJECT, because `@auspicion` is a MULTI-PROJECT org; asserted EXACTLY, as set equality with these five spellings, and in no looser form — no substring test, no prefix test and no superseded spelling tolerated.** **THE SUPERSEDED SPELLING THIS RULING MOVES, NAMED HERE SO A READER SEES WHAT MOVED WITHOUT A DIFF: `@auspicion/js-linux-x64-gnu` · `…-js-linux-arm64-gnu` · `…-js-darwin-x64` · `…-js-darwin-arm64` · `…-js-win32-x64-msvc` — the `A86`(a) reading, WHICH THIS CELL REFUSES BY NAME; and BEHIND IT THE OLD SCOPE `@provident-storeroom/js-linux-x64-gnu` and its four siblings, this cell's own as-filed value two rulings back, REFUSED as the `A86` pass refused it.** **THE SCOPE IS UNMOVED AT `@auspicion`, THE PROJECT TOKEN IS INSERTED BEFORE THE LANGUAGE MARKER, AND THE FIVE ARTEFACTS, THEIR LABELS, THEIR SECOND SEGMENTS AND THEIR TOOLCHAIN SUFFIXES ARE UNMOVED (`5` = `3` with a suffix + `2` without).** **`A88`(b) — `@auspicion/provident-storeroom-<label>` — is CARRIED AND UNAPPLIED, and `A86`(b) — `@auspicion/storeroom-js-<label>` — is superseded by this ruling; NEITHER is asserted by any cell of this set.** **This cell MOVED at the `A86` pass (the scope segment alone) and MOVED AGAIN here (the project token); both earlier readings are re-emitted byte-for-byte at items `2` and `8` below and are read from this date as the states those rulings moved.** | **`A88`(a)** · **`docs/specs/storeroom-publish-proposal.md §14`** · `docs/specs/storeroom-publish/resolution.md §3.1` · `docs/specs/storeroom-publish/contract.md §1.3` · `parameter-semantics.md §3.1` (**`PAR-PUB-17`**) · **`PUB-DD-15` as filed** (as filed: `package.md §3.2` item 5 · `§3.3` item 5 · `DD-26`; `PUB-DD-6`) — **AND THE FOUR CONTRACT HOMES THIS RULING AMENDS STILL PRINT THE SUPERSEDED `@auspicion/js-<label>` SPELLING AT THEIR OWN CELLS, NAMED AND NOT EDITED (the DRIFT item `9.6` files)** |
| **JSG-12.13** | the internal addon's own names, taken from the namespace | **the FOUR internal-only names are absent from the module graph** — `version`, `errorMessage`, `call`, and the ADDON's own `register` — **and the fifth, `storeCreate`, is the ENTRY'S OWN FACTORY and not the addon's internal step** (an as-filed reading of `package.md §1.3` item 4 that would forbid that name is REFUTED by item 3's own list, and the tension is a DOC-side finding) | `package.md §1.3` items 3–4; `§1.2` items 1–2 · **`A70`** |
| **JSG-12.14** | the addon artefact's path as a subpath of the package | it is **not** published by the `exports` map — the reach is INTERNAL and is not a second realm | `package.md §1.2` items 1–3 · `DD-4` |
| **JSG-12.15** | this set's own declared layer constant | **`ENVELOPE/PURE`** — the label travels with every figure of this run, and its site is the command recorded at `archive/gate5/storeroom-js-greens-run.md` | `§4.2` items 1–2 · `DD-18` · `DD-20` |
| **JSG-12.16** | this set's own declared APP layer | **`NONE`** — the unit delivers a LIBRARY, there is no assembled application to be green, and **no `APP`-green is claimed in this file, in its driver or in the run's record** | `§4.2` items 2–3 · `DD-20` |
| **JSG-12.17** | the manifest's third-key rule and the runner's own pattern | the manifest declares no second entry and no post-install fallback build as its primary route — the published artefact is what the one claimed entry loads | `package.md §3.2` item 2 · `§3.3` item 2 · `DD-25` |
| **JSG-12.18** | the manifest's `files` allowlist | **EXACTLY `index.mjs` · `README.md` · `index.d.ts`** — set equality, and **NO `build/Release` path and no `.node` entry anywhere in the allowlist**: *"NO binary ships, at any key, on any target"*. **This cell is ADDED by the `U-STOREROOM-PUBLISH` re-derivation and it prints a value that unit declares for the FIRST time — the sibling unit's `package.md` and `contract.md` declare no `files` cell — so it has NO pre-rename counterpart and NO assertion of this set is loosened by its addition** | **`PUB-DD-1`** · **`A85`(1)** · **`PAR-PUB-3`** · `docs/specs/storeroom-publish/contract.md §2.1` item 1 · `distribution.md §6.1` item 8 |

**What its failure would mean.** A second arms-bearing entry, a wildcard export, a CJS arm, a `main`, an
engine floor the docs do not declare, a licence site that disagrees, a matrix that is not the `5` the docs
name, or an `APP`-green anywhere in this pass's figures means **the package's claimed realm is not the one
the contract claims**, or the LAYER discipline (`AR-10`) has been broken — which no pass may do.

**⟶ RE-DERIVED 2026-10-11 — THE `U-STOREROOM-PUBLISH` RE-DERIVATION (`role_blind_test_writer`, the blind
role's `Q3-6`/`Q5` duty, on `A82` and `A84`'s `A-1`): ONE IDENTITY CELL MOVES TO THE VALUE THIS UNIT
DECLARES, ONE ROW IS CHECKED AND STANDS UNMOVED, ONE ROW IS ADDED, AND THE WHOLE SET IS RE-EXECUTED.**
`RCA-8(d)` ANNOTATE-BESIDE: **every byte this clause does not name STANDS AS FILED and is read THROUGH it —
`JSG-12.1`–`.9`, `.11`, `.13`–`.17` are NOT MOVED, no expectation of theirs is touched, and NO ASSERTION OF
THIS SET IS WEAKENED BY THIS PASS.** **WHAT MOVED, WHAT WAS CHECKED, AND WHAT WAS ADDED, EACH WITH ITS
CLAUSE:**
1. **THE ONE CELL THAT MOVES — `JSG-12.10`, AND ONLY IT, CARRIED THE SUPERSEDED IDENTITY.** **The as-filed
   cell read** *"**`'@provident-storeroom/js'`**"*, **cited to** *"`§3.3` item 1 · `DD-26`"*; **`PAR-PUB-1`
   (`docs/specs/storeroom-publish/parameter-semantics.md §2.1`) FIXES the new value as exactly
   `provident-storeroom` — UNSCOPED — and its own outside-values cell REFUSES the old spelling as *"the
   identity the amendment moves"*; the clause is carried at `docs/specs/storeroom-publish/distribution.md
   `§6.1` item 1 and at the `A82`/`A83` decision row's *"public at provident-storeroom:0.1.0"*.** **THE OLD
   VALUE WAS `package.md §3.3` item 1's and `DD-26`'s PRE-RENAME DECLARATION, which stands byte-for-byte at
   its own `§` and is superseded here AS AN IDENTITY FIGURE.** **THE RE-DERIVED CELL ASSERTS THE NEW VALUE
   EXACTLY — the manifest's `name` equal to `'provident-storeroom'`, character for character, with the
   pre-rename spelling named in the cell itself — and NO LOOSER FORM: no substring test, no case-fold, no
   prefix and no scope tolerated.**
2. **⟶ SUPERSEDED 2026-10-11 BY ITEM `8` BELOW, AND RE-EMITTED HERE BYTE-FOR-BYTE SO ITS SITE IS NOT LOST: THIS ITEM'S READING OF `JSG-12.12` — *"CHECKED AND STANDS UNMOVED"* — IS THE PRE-`A86` READING, TAKEN WHEN `PUB-DD-15`'s OLD SCOPE `@provident-storeroom` WAS THE OPERATIVE ONE, AND IT IS READ FROM THIS DATE ONLY AS THE STATE THE RULING MOVED.** `RCA-8(d)` ANNOTATE-BESIDE. **THE ROW THAT WAS CHECKED AND STANDS UNMOVED — `JSG-12.12`, THE FIVE SCOPED PLATFORM NAMES.** **The rename
   does NOT reach them: `PUB-DD-15` and `PUB-DD-6` fix each name as the scope `@provident-storeroom`, a
   separator `/`, and the label `js-<target>-<arch>[-<toolchain>]` (`resolution.md §3.1`'s table;
   `PAR-PUB-17`; `A84`'s `A-1`), which is character for character the five spellings the cell already
   asserts — so NO expected value of the row moves and none is loosened, and the main package's move to an
   UNSCOPED identity leaves the platform scope alone (`A82`).** **AND `JSG-12.11` (the count `5`) AND
   `JSG-12.17` (the five are `optionalDependencies` and never `dependencies`) ARE CHECKED AND STAND
   UNMOVED for the same reason.** **THE NAMING THIS ROW ANSWERS, AND ITS ONE IMPRECISION, STATED SO THE
   CHECK IS READ RATHER THAN ASSUMED: `PUB-CF-6` and `implementation-plan.md`'s pointer row name
   `JSG-12.10`/`JSG-12.12` as the two blind rows that print the OLD identity; `JSG-12.12` does print it —
   but as a SUBSTRING of five names whose own declared values are the new scope's, not as the cell's
   value — so the row is re-derived by CHECKING it, and its citation cell alone gains this unit's two
   clauses.**
3. **THE ROW THAT WAS ADDED — `JSG-12.18`, THE `files` ALLOWLIST — AND IT IS AN ADDITION RATHER THAN A
   RE-DERIVATION, SAID PLAINLY.** **It asserts `PAR-PUB-3`'s domain exactly — the allowlist equal as a SET
   to `index.mjs` · `README.md` · `index.d.ts`, with NO `build/Release` path and no `.node` entry anywhere in
   it (`PUB-DD-1`; `A85`(1); `docs/specs/storeroom-publish/contract.md §2.1` item 1; `distribution.md §6.1`
   item 8) — and it has NO PRE-RENAME COUNTERPART, because the sibling unit's `package.md` and `contract.md`
   declare no `files` cell at all: this set, whose stated method is to read the published manifest and
   compare each declared fact with the clause that prints it, carried the allowlist in NO cell before this
   pass.**
4. **WHAT THE RENAME DOES NOT REACH, EACH CHECKED AND EACH STANDING, SAID SO NONE IS DRAGGED ALONG BY THE
   MOVE OF ITEM 1.** **THE EIGHT MODULE NAMES — `JSG-12.1`, `.2`, and `JSG-01.2`, `.15` — STAND UNMOVED: the
   identity of the package is not the namespace's name set.** **THE INSTANCE'S `{ register, on, off }` —
   `JSG-01.9` — STANDS UNMOVED.** **THE REALM CLAIM, NODE ESM ALONE — `JSG-12.4`'s ESM arm and `JSG-12.5`'s
   refused `require` arm, with `JSG-12.14`'s internal-only addon reach (`package.md §1.3` items 1–2;
   `distribution.md §6.1` item 12's `type`) — STANDS UNMOVED, and no clause of this unit touches the
   package's realm.** **AND THE `HO-` HANDOFF ROWS — `JSG-12.5`'s `§3.2 HO-1`, with `HO-1`…`HO-7` remaining
   handoffs and no consumer wired by any pass (`docs/specs/storeroom-publish/acceptance.md §3.2` item 3) —
   STAND UNMOVED.**
5. **THE CENSUS, WITH BOTH TERMS PRINTED BECAUSE ONE OF THEM MOVES.** **`JSG-12` is `18` assertions where the
   as-filed head read `17` — the added cell of item `3` above — and THE SET'S ASSERTION CENSUS IS `241`
   where the `Q5` re-derivation's own clause read `240`, WHILE THE SCENARIO CENSUS STAYS `13`, every other
   scenario's own count stands unmoved, and the `§2` heads now sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12
   + 24 + 18 + 18 + 6 = 241` ✓.** **THE MOVEMENT IS `+1`, IT IS AN ADDITION FOR A VALUE THIS UNIT DECLARES
   FOR THE FIRST TIME, AND NOT ONE BYTE WAS LOOSENED TO REACH IT** (the `240` reading stays in the file's
   earlier clauses and is read from this date as the pre-pass count, as this file's own convention reads
   every superseded figure).
6. **THE CELLS THIS PASS'S ADDITION MAKES STALE, NAMED AND NOT EDITED — NOT ONE OF THEM LIES INSIDE THIS
   ROLE'S EDIT SCOPE, AND EACH IS READ FROM THIS DATE AS THE SIBLING SET'S PRE-PASS COUNT:** **`docs/specs/
   storeroom-publish/acceptance.md §3.2` item 2** (*"its `113` JS cells, its `240` blind assertions and its
   `91` live assertions"*); **`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-18`'s `alt` cell**
   (the same three figures); **`contract.md §4.3` item 2**; **`contract.md`'s six-artefact figure table's
   row 14** (*"the JS unit's `113`/`240`/`91`"*); **`docs/specs/storeroom-js/implementation-plan.md`**'s
   close-out clause (*"THE BLIND SET IS `240/240`, NOT `236/236`"*); **`docs/specs/storeroom-js/contract.md`**
   `§7`'s digest clause; **`docs/specs/storeroom-js/test-cases.md`**, **`surface.md`**, **`docs/specs/
   storeroom-js-convenience-proposal.md`**, **`docs/specs/storeroom-js-publish-proposal.md`**, **`docs/
   next-steps.md`** and **`docs/decisions.md`**, each where it quotes the figure; **and the archived records
   that print it — `archive/gate6/storeroom-js-live-determination.md`'s `§4` table, `archive/gate3/
   storeroom-js-red-set.md`'s per-scenario line, and `archive/gate3/storeroom-publish-red-set.md`'s
   `240`/`239`/`1` reading of the ENTRY state of this very row — each enumerated at the record's `§8.5` and
   each read from this date as its own tree's.** **The figure the `113` and
   the `91` and the `379` name are UNMOVED by this pass** (`174` tests · `174` pass · `0` fail on the JS leg;
   `91`/`91`/`0` on the live battery; `379` PASS · `0` FAIL at the store's root), **so only the `240` half of
   each of those citations is stale.**
7. **THE RECORD.** **The re-derivation and this run are filed, with every cell and every figure, at
   `archive/gate5/storeroom-js-greens-run.md` `§8`** (`Q5`; `Q3-6`; `contract.md §9` · `Q3-1`'s and `Q3-6`'s
   two-row duty, read with `PUB-CF-6`).
   (`[A1 docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-1` · `PUB-DD-6` · `PUB-DD-15` · `§2.1`
   item 1 and `§2.5`; A1 `parameter-semantics.md §2.1` · `§2.3` · `§2.8` · `§3.1` (`PAR-PUB-1` · `PAR-PUB-3` ·
   `PAR-PUB-8` · `PAR-PUB-17`); A1 `distribution.md §6.1` items 1, 8 and 12; A1 `archive/gate5/
   storeroom-js-greens-run.md §8` — this pass's dated `§`; A3 `docs/specs/storeroom-js/package.md §3.1`
   item 2 and `§3.3` item 1, the pre-rename home this cell moved off | numeric or census claim]`).**
8. **⟶ SUPERSEDED 2026-10-11 BY ITEM `9` BELOW, AND RE-EMITTED HERE BYTE-FOR-BYTE SO ITS SITE IS NOT LOST: THIS ITEM'S READING OF `JSG-12.12` — *"the five names at the scope `A86`(a) moves them to"* — IS THE `A86`(a) READING, WHOSE SPELLING THE `A88` PROJECT-TOKEN RULING MOVES, AND IT IS READ FROM THIS DATE ONLY AS THE STATE THAT RULING MOVED.** `RCA-8(d)` ANNOTATE-BESIDE. **⟶ RE-DERIVED AGAIN 2026-10-11 — THE BOUNDED RE-DERIVATION OF `JSG-12.12` ON THE ARCHITECT'S RULING
   `A86`(a), WHICH IS THE OPERATIVE READING (`docs/specs/storeroom-publish-proposal.md §12`): ONE CELL MOVES
   — `JSG-12.12`, THE FIVE PLATFORM NAMES — AND IT MOVES BY ITS SCOPE SEGMENT ALONE, WHILE `JSG-12.10`, THE
   MAIN PACKAGE'S IDENTITY, IS CHECKED AND DOES NOT MOVE.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of items
   `1`–`7` above stands and is read THROUGH this item; THIS item supersedes item `2`'s reading of `JSG-12.12`
   and NOTHING ELSE, and it is the only clause of this file that reads `A86`.**
   1. **WHAT MOVED, OLD → NEW, WITH THE CLAUSE.** **The as-filed cell read** *"`@provident-storeroom/js-linux-x64-gnu`
      · `…-linux-arm64-gnu` · `…-darwin-x64` · `…-darwin-arm64` · `…-win32-x64-msvc`"*, **cited to** *"`package.md
      §3.2` item 5 · `§3.3` item 5 · `DD-26`; `PUB-DD-15` · `PUB-DD-6` · `docs/specs/storeroom-publish/
      resolution.md §3.1` · `PAR-PUB-17`"*. **THE RE-DERIVED CELL ASSERTS** *"`@auspicion/js-linux-x64-gnu` ·
      `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` ·
      `@auspicion/js-win32-x64-msvc`"* **— the five names at the scope `A86`(a) moves them to, character for
      character, EXACTLY and in no looser form.** **THE CLAUSE: `A86`(a) — "the five artefacts' scope segment
      replaced" — read at its operative home `docs/specs/storeroom-publish/resolution.md §3.1`'s five-name
      table (`@auspicion` as the scope column, `js-<target>-<arch>[-<toolchain>]` as the second segment, all
      five rows rewritten), at `docs/specs/storeroom-publish/contract.md §1.3`'s five-name clause, and at
      `parameter-semantics.md §3.1`'s OPERATIVE domain (`PAR-PUB-17`).** **THE AS-FILED SPELLING THE RULING
      MOVED IS NAMED IN THE CELL ITSELF — the OLD scope `@provident-storeroom` — and `PUB-DD-15`'s pin is
      RE-EMITTED VERBATIM at `docs/specs/storeroom-publish/contract.md §0.3`'s row for that decision, where
      it stands as that row's own as-filed text and is superseded AS A SCOPE.** **THE FIVE ARTEFACTS, THEIR
      LABELS, THEIR SECOND SEGMENTS AND THEIR TOOLCHAIN SUFFIXES ARE UNMOVED, and the arithmetic is unmoved:
      `5` names = `3` carrying a suffix (`-gnu` twice, `-msvc` once) + `2` carrying none (`3 + 2 = 5` ✓).**
      **`A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AND UNAPPLIED and is asserted by NO cell of
      this set; the cell asserts `(a)` and says so.**
   2. **`JSG-12.10` — THE MAIN PACKAGE'S IDENTITY — IS CHECKED AND DOES NOT MOVE, AND THIS IS SAID BECAUSE THE
      TWO ROWS ARE THE SET'S ONLY TWO IDENTITY CELLS AND A READER COULD WRONGLY READ THE PLATFORM RE-SCOPE AS
      DRAGGING IT.** **The manifest's `name` is asserted as** `'provident-storeroom'` **— UNSCOPED — fixed by
      `PAR-PUB-1` (`docs/specs/storeroom-publish/parameter-semantics.md §2.1`) and carried at `distribution.md
      §6.1` item 1 (`A82`); its cell names the pre-rename spelling `'@provident-storeroom/js'` as the value
      the EARLIER pass moved, and that reading STANDS.** **`A86`(a) is a clause about the FIVE ARTEFACTS'
      scope and contains no term about the main package's identity: the two scopes are two decisions, and
      `distribution.md §6.1` item 1 says so in its own words — *"the main package does NOT move with the
      platform names' scope"*.** **NO BYTE OF `JSG-12.10` MOVED IN THIS PASS, IN EITHER HOME.**
   3. **EVERY OTHER ROW WAS SWEPT FOR A SCOPED-NAME BYTE, AND THE SWEEP IS REPORTED IN FULL SO IT IS READ
      RATHER THAN ASSUMED.** **THE BYTES SEARCHED FOR, ACROSS BOTH HOMES AND OVER EVERY ROW OF ALL `13`
      SCENARIOS: `@provident-storeroom/`, `@provident-storeroom/js`, `@auspicion/`, and the label stems
      `js-linux-`, `js-darwin-`, `js-win32-`.** **THE ROWS CARRYING A SCOPED-NAME BYTE WERE EXACTLY THREE, AND
      THEY ARE NAMED ONE BY ONE:**
      - **`JSG-12.12` — AN ASSERTED VALUE. MOVED (item 1 above).** **This is the ONLY row of the set whose
        EXPECTED VALUE moved.**
      - **`JSG-12.10` — A NAMED, NON-ASSERTED SPELLING. CHECKED AND UNMOVED (item 2 above).** **Its occurrence
        of `@provident-storeroom/js` is the cell's own label for the value SUPERSEDED at the earlier pass, and
        it is not the value asserted; no byte of it moved, and it must not.**
      - **`JSG-12.17` — NO SCOPED-NAME BYTE IN ITS CELL; ITS CHECK CONSUMES THE SAME FIVE-NAME SET. CHECKED AND
        UNMOVED, WITH THE COUPLING NAMED.** **Its drive is the manifest's `optionalDependencies`-versus-
        `dependencies` split and its observable prints no scoped name; its subject, however, IS the five
        prebuild ARTEFACTS, so its check ranges over the same five names `JSG-12.12` asserts and therefore
        follows the re-scope automatically — the artefact set being the same five before and after the
        ruling.** **This is a COUPLING and not a move: no expectation of the row changes and nothing is
        loosened, and the driver's own row says so in its own comment.**
      **AND THE ROWS THAT WERE CHECKED AND STAND UNMOVED, EACH NAMED: `JSG-12.1`–`.9`, `.11`, `.13`–`.16`,
      `.18` — `15` rows of this scenario's `18` — carry NO scoped-name byte and NO byte of any of them is
      touched (the other `3` being `.10`, `.12` and `.17`, named one by one just above);
      `JSG-12.11` (the count `5`), `JSG-12.17` (the split, above) and `JSG-12.18` (the `files` allowlist) are
      read again here and STAND; and `JSG-12.15`'s and `JSG-12.16`'s LAYER constants stand, this pass claiming
      NO `APP`-green exactly as they require.** **THE `217` CELLS OF `JSG-01`–`JSG-11` AND THE `6` OF `JSG-13`
      WERE SWEPT WITH THE SAME PATTERNS AND CARRIED NO HIT: THE RE-SCOPE REACHES NO CELL OUTSIDE `JSG-12`
      (`217 + 18 + 6 = 241` ✓ — the sweep is exhaustive over this set, and the balance of the sum is `JSG-12`
      itself, whose `18` cells are enumerated one by one above and in item `2`).**
   4. **THE CENSUS, WITH BOTH TERMS PRINTED BECAUSE NEITHER MOVES.** **THE `§2` HEADS STILL SUM `17 + 16 + 5 +
      67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 = 241` ✓, `JSG-12` is still `18` assertions, and THE
      SCENARIO CENSUS IS STILL `13`.** **NOTHING WAS ADDED AND NOTHING WAS REMOVED BY THIS PASS, so the
      AUTHORED FIGURE STAYS `241` — a re-scope moves a VALUE and not a CENSUS, and a re-derivation that moves
      a value while leaving the count where it was is exactly what this pass is.** **THE PRE-RUN STATE IS
      RECORDED WITH IT: the set entered this pass at `241` AUTHORED · `241` EXECUTED · `240` PASS · `1` FAIL,
      the ONE red cell being `JSG-12.12` itself on the OLD scope — the red cell this bounded pass was tasked
      to correct and the set's only failure.**
   5. **THE RUN, AND ITS FOUR LEGS, EACH WITH ITS SITE, ITS LAYER AND ITS TERMS.** **THE SITE: the repository
      root, `node bindings/js/greens/greens.mjs`.** **THE BLIND SET — `241` AUTHORED · `241` EXECUTED · `241`
      PASS · `0` FAIL over the same `13` scenarios, `JSG-12` reading `18 PASS · 0 FAIL (18 assertions)`, LAYER
      `ENVELOPE/PURE`, `APP` LAYER `NONE` and no `APP`-green claimed.** **THE JS LEG —
      `node --test bindings/js/test/*.test.mjs` — `185` tests · `185` PASS · `0` FAIL** (this pass's
      re-derivation FALSIFIES NO RED-SET CELL: no cell of the test tree is edited, and the moved row reads
      the manifest, not the test tree). **THE LIVE BATTERY — `node bindings/js/greens/live-drive.mjs` — the
      LIVE RUNNER's own artefact, in hand in parallel: its rows are that role's and NO byte of
      `live-drive.mjs` was touched, re-derived or weakened by this pass, the figure being a READING of that
      artefact in flight and never a re-derivation of its rows.** **THE STORE'S ROOT SUITE —
      `cargo test --offline --no-fail-fast` at the repository root — `379` PASS · `0` FAIL.** **ALL FOUR LEGS,
      THEIR EXACT FIGURES AND THEIR COMMANDS ARE FILED AT `archive/gate5/storeroom-js-greens-run.md §9`.**
   6. **THE `174` FIGURE THIS FILE'S ITEM `6` PRINTS FOR THE JS LEG IS FALSIFIED BY THIS PASS'S SECOND LEG AND
      IS NAMED RATHER THAN EDITED.** **Item `6` above reads *"`174` tests · `174` pass · `0` fail on the JS
      leg"*; the operative reading is `185` tests · `185` PASS · `0` fail.** **THE `+11` IS NOT THIS PASS'S
      DOING — this pass edits NO test byte and adds no cell — and the figure is named here so that no reader
      takes the `174` as today's, while its bytes stand at its own item as a pre-pass reading.** **⟶ AND THE `185` ITSELF IS ONE TREE BEHIND FROM THIS DATE, 2026-10-11, AND IS NAMED HERE SO THE `174` IS NOT CORRECTED INTO A SECOND STALE FIGURE: the operative reading is `185` tests · `185` PASS · `0` FAIL · `0` skipped, the `+72` over `113` being `U-STOREROOM-PUBLISH`'s own red set (`62` cells at `bindings/js/test/publish.test.mjs`) and its `10` generators `NG-PUB-A`…`NG-PUB-J` at `bindings/js/test/publish-generators.test.mjs` — `113 + 62 + 10 = 185` ✓; this file's close-out clause, item `2`, carries the same figure.** **The `113`
      and the `91` and the `379` halves of that same item are read again and are UNMOVED.**
   7. **THE RECORD.** **The bounded re-derivation, the sweep of item `3` and this run are filed, with every
      cell, every sweep hit and every figure, at `archive/gate5/storeroom-js-greens-run.md §9`** (`A86`(a);
      `docs/specs/storeroom-publish-proposal.md §12`; `docs/specs/storeroom-publish/contract.md §0.3` ·
      `PUB-DD-15` · `§1.3`; `resolution.md §3.1`; `parameter-semantics.md §3.1` (`PAR-PUB-17`)).
      (`[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the five artefacts' scope segment
      replaced, `(b)` carried and unapplied | declared parameter semantics]`).**
9. **⟶ RE-DERIVED AGAIN 2026-10-11 — THE BOUNDED RE-DERIVATION OF `JSG-12.12` ON THE ARCHITECT'S PROJECT-TOKEN RULING `A88`(a), WHICH IS THE OPERATIVE READING (`docs/specs/storeroom-publish-proposal.md §14`): THE FIVE PLATFORM NAMES GAIN THE PROJECT TOKEN, `JSG-12.10` IS CHECKED AND DOES NOT MOVE, EVERY OTHER ROW OF THE SET IS SWEPT AGAIN AND MOVES NONE, AND THE WHOLE SET IS RE-EXECUTED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte of items `1`–`8` above stands and is read THROUGH this item; THIS item supersedes item `8`'s reading of `JSG-12.12` and NOTHING ELSE, and it is the only clause of this file that reads `A88`.**
   1. **WHAT MOVED, OLD → NEW, WITH THE CLAUSE.** **The `A86`(a) cell read** *"`@auspicion/js-linux-x64-gnu` · `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` · `@auspicion/js-win32-x64-msvc`"*. **THE RE-DERIVED CELL ASSERTS, CHARACTER FOR CHARACTER,** *"`@auspicion/provident-storeroom-js-linux-x64-gnu` · `@auspicion/provident-storeroom-js-linux-arm64-gnu` · `@auspicion/provident-storeroom-js-darwin-x64` · `@auspicion/provident-storeroom-js-darwin-arm64` · `@auspicion/provident-storeroom-js-win32-x64-msvc`"* **— EXACTLY, as set equality, and in no looser form: no substring test, no prefix test, no case-fold and no "one of two spellings" tolerance.** **THE CLAUSE, AT ITS OWN BYTES: `docs/specs/storeroom-publish-proposal.md §14` — the architect's words, VERBATIM, *"Change the platform package names to specify the project they are for, this organization will be used for multiple"*, read at the `A88` row and at `A88`(a) — *"THE ADDITIVE READING (the operative default, because it is the least destructive edit that satisfies the requirement and loses no existing token): the project token is INSERTED before the language marker, so the five become `@auspicion/provident-storeroom-js-linux-x64-gnu` · `…-js-linux-arm64-gnu` · `…-js-darwin-x64` · `…-js-darwin-arm64` · `…-js-win32-x64-msvc`"* — whose REASON the ruling states: *"`@auspicion` is a MULTI-PROJECT org, so a platform name that carries only a language marker is ambiguous inside it"*, the requirement being that the name *"must NAME THE PROJECT"*.** **THE SUPERSEDED SPELLING THE RULING MOVES IS NAMED IN THE CELL ITSELF — `@auspicion/js-<label>`, the `A86`(a) reading — and it is REFUSED by that cell's own assertion; and BEHIND IT THE OLD SCOPE `@provident-storeroom/…`, this cell's as-filed value two rulings back, REMAINS REFUSED exactly as the `A86` pass refused it, so the moved cell can pass on NEITHER.** **THE SCOPE STAYS `@auspicion`, THE PROJECT TOKEN IS ADDED, AND THE FIVE ARTEFACTS, THEIR LABELS, THEIR SECOND SEGMENTS AND THEIR TOOLCHAIN SUFFIXES ARE UNMOVED: `5` = `3` carrying a suffix (`-gnu` twice, `-msvc` once) + `2` carrying none ✓.** **`A88`(b) — `@auspicion/provident-storeroom-<label>` — is CARRIED AND UNAPPLIED, and `A86`(b) — `@auspicion/storeroom-js-<label>` — is superseded by this ruling; NEITHER is asserted by any cell of this set.** **THE REFUSAL CONJUNCT ADDED BY THIS PASS IS A STRENGTHENING AND NOT AN ADDITION OF A CLAIM: the form is `JSG-12.11`'s count `5` conjoined with the row's containment test, and it was checked OFF-LINE FOR VACUITY at five inputs — the five `A88`(a) names → `true`; the five superseded `@auspicion/js-` names → `false`; the five old-scope `@provident-storeroom/` names → `false`; the five new plus a sixth (`@auspicion/provident-storeroom-js-freebsd-x64`) → `false`; the five new REVERSED → `true`.**
   2. **`JSG-12.10` — THE MAIN PACKAGE'S IDENTITY — IS CHECKED AND DOES NOT MOVE, IN EITHER HOME, AND ITS BYTES ARE BYTE-IDENTICAL TO THE PRE-PASS BACKUP.** **The manifest's `name` is asserted as** `'provident-storeroom'` **— UNSCOPED — fixed by `PAR-PUB-1` (`parameter-semantics.md §2.1`) and carried at `distribution.md §6.1` item 1 (`A82`); the row is GREEN in the re-run and the manifest's `name` reads `provident-storeroom`, unscoped.** **AND THE RULING ITSELF SAYS SO AT ITS OWN BYTES: *"THE MAIN PACKAGE'S IDENTITY DOES NOT MOVE: `A82`'s unscoped `provident-storeroom` stands — this ruling orders a change to the PLATFORM names, and the main package's own name already specifies the project."*** **NO BYTE OF `JSG-12.10` MOVED IN THIS PASS, IN EITHER HOME.**
   3. **EVERY OTHER ROW WAS SWEPT AGAIN FOR A PLATFORM-NAME BYTE, AND THE SWEEP IS REPORTED IN FULL SO IT IS READ RATHER THAN ASSUMED.** **THE BYTES SEARCHED FOR, ACROSS BOTH HOMES AND OVER EVERY ROW OF ALL `13` SCENARIOS: `@auspicion/` · `@provident-storeroom/` · `provident-storeroom-js-` · `js-linux-` · `js-darwin-` · `js-win32-`.** **THE ROWS CARRYING A PLATFORM-NAME BYTE WERE EXACTLY THREE, AND THEY ARE NAMED ONE BY ONE:** **`JSG-12.12` — an ASSERTED VALUE — MOVED (item `1` above); `JSG-12.10` — a NAMED, NON-ASSERTED spelling (`'@provident-storeroom/js'`, the cell's own label for the value the earlier pass superseded) — CHECKED AND UNMOVED (item `2` above); `JSG-12.17` — NO name byte in its cell, its CHECK consuming the SAME five-name set, because its subject IS those five ARTEFACTS — CHECKED AND UNMOVED WITH THE COUPLING NAMED.** **AND THE ROWS CHECKED AND STANDING UNMOVED, EACH NAMED: `JSG-12.1`–`.9`, `.11`, `.13`–`.16`, `.18` — `15` rows of this scenario's `18` — and the `217` cells of `JSG-01`–`JSG-11` and the `6` of `JSG-13`, the sweep being EXHAUSTIVE over the set: `15 + 217 + 6 = 238` rows checked and unmoved, `+ 3` named above = `241` ✓.** **THE PROJECT-TOKEN RULING REACHES NO CELL OUTSIDE `JSG-12`, AND INSIDE `JSG-12` IT REACHES NO CELL BUT `.12`.**
   4. **THE CENSUS, WITH BOTH TERMS PRINTED BECAUSE NEITHER MOVES.** **THE `§2` HEADS STILL SUM `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 = 241` ✓, `JSG-12` is still `18` assertions and THE SCENARIO CENSUS IS STILL `13`. NOTHING WAS ADDED AND NOTHING WAS REMOVED BY THIS PASS, so the AUTHORED FIGURE STAYS `241`: A PROJECT TOKEN IS A SPELLING AND NOT A CENSUS — no declared value of the set required a cell, so no cell was cut, and the target `241/241` was reached with the count UNMOVED.** **THE PRE-RUN STATE IS RECORDED WITH IT: the set entered this pass at `241` AUTHORED · `241` EXECUTED · `240` PASS · `1` FAIL, the ONE red cell being `JSG-12.12` itself on the superseded `@auspicion/js-` spelling — the set's only failure at entry and the cell this bounded pass was cut for.**
   5. **THE RUN, AND ITS FOUR LEGS, EACH WITH ITS SITE, ITS LAYER AND ITS TERMS.** **THE SITE: the repository root, `node bindings/js/greens/greens.mjs`, over the artefact the entry resolves against — `bindings/js/build/Release/storeroom_js_binding.node`, `sha256:0136c9122da3c44d625b640b5409158a5bed576a5054a7f8d498cf960f897718`, `958,112` bytes — THE SAME DIGEST `§9` PRINTS, so no figure of either `§` is separated from the other by a byte.** **THE BLIND SET — `241` AUTHORED · `241` EXECUTED · `241` PASS · `0` FAIL in THREE consecutive runs byte-identical once the scratch path is normalised, `JSG-12` reading `18 PASS · 0 FAIL (18 assertions)`, LAYER `ENVELOPE/PURE`, `APP` LAYER `NONE` and NO `APP`-green claimed; NO FAIL LINE WAS PRINTED BY ANY RUN.** **THE JS LEG — `node --test bindings/js/test/*.test.mjs` — `186` tests · `184` PASS · `2` FAIL · `0` skipped: THIS PASS FALSIFIES NO TEST CELL (it edits no test byte; the moved row reads the manifest, not the test tree), and the `2` red cells are the RED SET's own, being synchronised to the ruling IN PARALLEL — THEY ARE NAMED AND NOT EDITED, at item `6.2` below.** **A FIRST READING OF THE SAME LEG, TAKEN EIGHTY SECONDS EARLIER, STOOD AT `186` · `178` · `8`: the `+6` recovered between the two readings is the parallel synchronisation LANDING and not this pass's doing, and the earlier reading is named at item `6.2` so it is not taken for today's.** **THE LIVE BATTERY — `node bindings/js/greens/live-drive.mjs` — `91` authored · `91` executed · `91` PASS · `0` FAIL, its own earlier reading standing at `90` PASS · `1` FAIL on that runner's `LIVE-8.7` and going green in parallel (item `6.3` below): NO byte of `live-drive.mjs` was touched, re-derived or weakened by this pass, and each figure is a READING of that artefact in flight and never a re-derivation of its rows.** **THE STORE'S ROOT SUITE — `cargo test --offline --no-fail-fast` at the repository root — `379` PASS · `0` FAIL over `15` test binaries.** **ALL FOUR LEGS, THEIR EXACT FIGURES AND THEIR COMMANDS ARE FILED AT `archive/gate5/storeroom-js-greens-run.md §10`.**
   6. **THE FINDINGS THIS PASS FILES, EACH WITH ITS `§` AND NOT ONE OF THEM EDITED BY IT — A FAILURE IS A DRIFT OR AN UN-HARDENED REGRESSION, NEVER A PASS.**
      1. **THE CONTRACT HAS NOT MOVED WITH THE RULING, AND THIS IS THE DRIFT THE WHOLE PASS TURNS ON** (`docs/specs/storeroom-publish-proposal.md §14`, blast-radius items `4` and `5`, which NAME as amended homes: `distribution.md §3.1`/`§3.2`, `resolution.md §3.1`/`§4.1`, `contract.md §1.3` and `§5.6`'s `S-SCOPE` failure list, `PUB-DD-6`/`PUB-DD-15`, `parameter-semantics.md §2.1`/`§3.1`, and the JS unit's `package.md §3.1`/`§3.2` with `contract.md`'s `DD-25`/`DD-26`). **ALL OF THEM STILL PRINT THE SUPERSEDED `@auspicion/js-<label>` SPELLING AT THEIR OWN BYTES AS AT THIS PASS (`grep` over `docs/specs/storeroom-publish/*.md` for `provident-storeroom-js-` and for `A88` → `0` matches; `resolution.md §3.1`'s five-row table and `contract.md §1.3`'s five-name clause print `@auspicion/js-linux-x64-gnu` and its four siblings).** **THEIR BYTES ARE THEREFORE READ THROUGH `§14` FROM THIS DATE, AND THEY LIE OUTSIDE THIS ROLE'S EDIT SCOPE (`docs/specs/storeroom-js-greens.md`, `bindings/js/greens/greens.mjs`, `archive/gate5/`) — NAMED, NOT EDITED.**
      2. **THE JS LEG'S RED CELLS, NAMED EACH BY ITS OWN NAME AS THE RUN PRINTS THEM, AND FALSIFIED BY NO BYTE OF THIS PASS. THE TWO STANDING AT THIS PASS'S FINAL READING:** `package_a_wildcard_export_and_a_deep_import_are_both_refused` (`bindings/js/test/package-entry.test.mjs`) — *"the probe's subject is one of the five declared names the manifest pins: `@auspicion/js-linux-x64-gnu`"*: its five-name probe table still spells the SUPERSEDED form, a RED-SET literal not yet synchronised · and **`P-PUB-6::S-SCOPE the five spellings agree across every home the contract names`** (`bindings/js/test/publish.test.mjs`), whose own words are *"the contract's own table (`resolution.md §3.1`) reads the same five spellings"* and whose `actual` is `[]` against the five `A88` spellings it expects: **THIS CELL ALREADY ASSERTS THE `A88` FIVE AND FAILS ON THE CONTRACT HOME ITSELF — the drift of item `6.1` — so it is repaired by AMENDING THE CONTRACT and not by amending a test.** **AND THE SIX FURTHER CELLS RED AT THIS PASS'S FIRST READING, ALL RECOVERED IN PARALLEL: `NG-PUB-A` · `NG-PUB-B` · `NG-PUB-C` · `NG-PUB-D` · `NG-PUB-F` · `NG-PUB-G`** (`bindings/js/test/publish-generators.test.mjs`, each reading the shipped bytes at the superseded spelling in its own fixture or expectation). **ALL OF THEM ARE THE RED SET's OWN CELLS, IN FLIGHT IN PARALLEL, AND THIS PASS EDITS NONE OF THEM.**
      3. **THE LIVE BATTERY'S `LIVE-8.7` WAS ITS RUNNER'S OWN CELL AND STILL PRINTED THE SUPERSEDED SPELLING AT THIS PASS'S FIRST READING** (`bindings/js/greens/live-drive.mjs`'s rung-one map, `@auspicion/js-linux-x64-gnu`; blast-radius item `8`), **and it is GREEN at the second reading, in hand in parallel; NO byte of that file was written by this pass.**
      4. **AND NO OTHER FINDING AROSE: the four legs' figures are printed with their sites and layers, the moved cell is exact and non-vacuous (item `1`), the sweep of item `3` is exhaustive over `241` rows, `JSG-12.10` is verified unmoved byte-for-byte (item `2`), and NO ASSERTION OF THIS SET WAS WEAKENED, LOOSENED OR DROPPED BY THIS PASS.**
   7. **THE RECORD.** **The bounded re-derivation, the sweep of item `3`, the findings of item `6` and this run are filed, with every cell, every sweep hit and every figure, at `archive/gate5/storeroom-js-greens-run.md §10`** (`A88`(a); `docs/specs/storeroom-publish-proposal.md §14`). (`[A1 docs/specs/storeroom-publish-proposal.md §14 · `A88`(a) — the project token INSERTED, the names made to name the project; `(b)` carried and unapplied | declared parameter semantics]`).**

### JSG-13 — THE SCALING CLAIM THE DOCS NOW MAKE (6 assertions)

**The clause(s).** `docs/specs/storeroom-js-rca-scaling.md §1` (the observation), `§4` (the root cause: the
per-datum operation is `O(members so far)`, not `O(1)`), `§5-bis` and `§5-quater` (the corrected fix
direction and its acceptance: **per-datum `O(1)`, iteration `O(n)`**), `§6` item 1 (the conversion itself is
measured linear). **The claim is ASYMPTOTIC and this scenario asserts only its SHAPE: that a value of a few
thousand members COMPLETES and ROUND-TRIPS.** **Nothing here is timed into a failure** — timing is the
implementer's measurement (that file's own tables) and not this layer's, and a timing assertion would make a
machine's speed a contract clause.

**The steps a caller takes.** Build a flat object of `3,000` members, an array of `3,000` members, and a
nested structure of `50 × 60` members; `write` each at `temp`; `read` each back.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-13.1** | `write(['big-map'],'temp',{3,000 members})` | **completes** and returns a record; no throw | RCA `§1`, `§4`, `§5-bis` |
| **JSG-13.2** | `read(['big-map'])` | an object with **3,000** members | RCA `§6` item 1; `§4.2` `R-2` |
| **JSG-13.3** | its member key set | **equal as a set** to the written one | `§1.5` item 1 |
| **JSG-13.4** | `write(['big-vec'],'temp',[3,000 members])`; `read(['big-vec'])` | a **dense** array of `3,000` members, **index order significant** and equal member-by-member | `§1.5` item 2; store `§4.2` `R-3` |
| **JSG-13.5** | `write(['big-nest'],'temp',{50 keys, each a map of 60})`; `read(['big-nest'])` | a value whose member set and nested member sets are equal under the relation | `§1.5`; RCA `§6` item 3 |
| **JSG-13.6** | the three writes above | **no failure code is produced by any of them** — the declared bound is not reached, and the conversion's cost is not this layer's verdict | RCA `§1`, `§6` item 1; `§1.4` item 5 |

**What its failure would mean.** A few-thousand-member value that **cannot complete or cannot round-trip**
means the boundary's own conversion is **super-linear in a way that has become a functional failure** at a
size the docs' declared bound admits by a factor of hundreds — the state the RCA names, escalated from a
cost curve to an unusable surface. **A value that completes but does not round-trip is a `P-IM-1` failure and
not a scaling finding**, and is reported as such.

---

## §3. WHAT THIS SET COULD NOT DERIVE FROM THE DOCS (named rather than papered)

1. **`watch`/`unwatch` are NOT driven.** The store's own surface declares them (`§6.5` items 1–7), while this
   unit's surface is `listen`/`unlisten` (`§2.10`) and the store's contract amends the registration surface
   to the listener record. **No clause of this unit declares `watch` as a JS verb**, so driving it would
   assert a name `§2.9` item 1 does not carry. Its subject — the registration and the returned handle set —
   is driven at `JSG-08` through the declared verbs.
2. **The `secure` instance is not constructed.** `§8.1` #2 and the store's `parameter-semantics.md §2.11`
   declare the floor CLIENT-SIDE and the row unreachable from this direction; the `secure` token is not a
   fourth tier (`M-2`) and `§1.3`'s `TierArg` row 1 refuses it (`OutOfDomainTier`, driven at `JSG-10.6`).
3. **The register's internal structure, its parent anchor, its carrier node and its `register_marker` are
   not driven.** They are `findAddress`-reachable and `findAddress` is NOT exposed (`§2.9` item 1), so no JS
   drive can observe them; the RCA's `§5-ter`/`§5-quater` findings are about that unobservability.
4. **`1,000,000` / `1,000,001` visited nodes are not driven** — the reason is at `JSG-06`'s closing note.
5. **The order of `watched` and of `triggered` is never asserted** — both are declared order-insignificant
   (store `§6.5` item 5; `DD-37`; `§2.7` item 3), so this set compares SETS only.
6. **A listener body that THROWS is not driven here.** `§2.7` item 4 declares the throw is neither caught
   nor reported and that the store's verb result is already complete — an assertion on it would need an
   uncaught-exception harness that outlives the verb, and the clause it would drive is `DD-23`'s own
   `alt`-free declaration. **It is recorded as an un-driven clause rather than papered.**
7. **A `cfg` with a fourth key is not driven.** The store declares `cfg`'s member set CLOSED at two keys and
   carries the unrepresentability as `OWED` (`§7.1`'s own clause), while this unit's own `cfg` carries three
   — so a fourth key's answer is a state the two documents hand to each other. Recorded, not asserted.
8. **No figure of this pass is a store figure.** The store's green, its `e2e` battery and its suite are
   QUOTED by this unit's documents and are **not re-measured here** (`DD-31`, `DD-33`).

---

## §4. THE RUN — filed at `archive/gate5/storeroom-js-greens-run.md`

**The driver is `bindings/js/greens/greens.mjs`; its only entry is the package's claimed ESM entry, and its
only command is the one the run's record prints with its site and its layer.** **THE RUN'S TOTALS, AT THEIR
SITE AND WITH THEIR LAYER** (`§4.2` item 1; `AR-10`; `DD-18`, `DD-20`, `DD-33`):

| The figure | Its site | Its layer |
| --- | --- | --- |
| **`236` authored · `236` executed · `233` PASS · `3` FAIL**, the same `3` cells in **three consecutive runs** | **`node bindings/js/greens/greens.mjs`, at the repository root, against `bindings/js/build/Release/storeroom_js_binding.node`** | **`ENVELOPE/PURE`** — and **the `APP` layer for this unit is `NONE`; no `APP`-green is claimed by this set, by its driver or by its record** |

**The `3` FAILs are ONE FINDING of ONE scenario — `JSG-04.1.v` · `JSG-04.2.v` · `JSG-04.4.v`, the verbose
rejection's target half and its class half at a VALUE position** — **and its defect is the
IMPLEMENTATION's** (`surface.md §2.5` item 6 (a)–(b); `crossing.md §1.8`'s dated clause 3): **the fourteen
refused value classes answer one byte-identical message that carries the ADDRESS, double-quoted, and NO
class, while the same mechanism's class-and-position half IS carried at the `cfg` position.** **One
DOC-side finding is also filed — `F-DOC-1`, `package.md §1.3` item 4's *"none of the five"* read against
item 3's own list — and one DOC-side tension is recorded rather than guessed (`§2.4` rule 3's *"ONCE"*
against the store's `DD-42` for the caller-spelled duplicate).** **The full disposition of each, with the
clause on each side, is the record's `§3`–`§4`.**

**AND FOUR DRIVING CORRECTIONS WERE TAKEN, NAMED WITH THEIR CLAUSES AND WITH THE RUN THAT EXPOSED EACH
(`§2` of the record); NOT ONE EXPECTATION MOVED, AND NO ASSERTION WAS WEAKENED.**

**⟶ RECONCILED 2026-10-11 — THE DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`, gate 8, the
per-unit pass): THE FIGURE THIS SECTION PRINTS IS THE GATE-5 TREE'S OWN RECORD, AND THE OPERATIVE FIGURE IS
`236` PASS OF `236`.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the `§4` table's
`233` PASS · `3` FAIL figure, its `3`-FAILS paragraph, its `F-DOC-1` row and its tension row included — and
the section is read THROUGH this clause; THIS clause is a PURE INSERTION, it CORRECTS NO SCENARIO, WEAKENS NO
ASSERTION, RE-DERIVES NO EXPECTATION and EDITS NO CELL of `§2`.** **THE SET'S AUTHORED `236` IS UNMOVED AND
THE SET'S OWN `13` SCENARIOS ARE UNMOVED** (its `§2`'s per-scenario heads sum `13 + 16 + 5 + 67 + 14 + 7 + 15
+ 22 + 12 + 24 + 18 + 17 + 6 = 236` ✓, which this pass re-derived at the file's own bytes and at the driver's
own scenario comments).

**THE CELL THAT MOVED, AND WHAT IT READ BEFORE, QUOTED IN ITS OWN WORDS:** **the `§4` table's figure cell read
*"`236` authored · `236` executed · `233` PASS · `3` FAIL**, the same `3` cells in **three consecutive
runs**"*.** **THE OPERATIVE READING IS `13` scenarios · `236` authored · `236` executed · `236` PASS · `0`
FAIL** — the SAME `236` assertions, RE-MEASURED against a LATER artefact, with `JSG-04` reading `67 PASS · 0
FAIL` where the gate-5 record printed `64 PASS · 3 FAIL` (`archive/gate6/storeroom-js-live-determination.md`
`§2.3`; `§3` · `LIVE-F1`, whose own revisit condition names THIS pass as the site of the reconciliation and
requires the `233`/`3` reading to be quoted here rather than withdrawn).

**WHY IT MOVED, NAMED WITH ITS COMMIT AND ITS DATES SO NEITHER FIGURE IS READ AS THE OTHER:** the gate-5 run
was taken at `23:28`–`23:29` over the artefact built `2026-10-09 19:19`; the artefact and the entry under it
were REBUILT at `23:37:59` and `23:42:54`, AFTER that run and on commit **`9707ee9`** — *"js: the value-arm
refusal verbose and the two doc cells reconciled — the blind set is `236/236`"* (`2026-10-09 23:39:01`) —
whose body records the sweep of eleven value arms plus the member positions and the measured
`233/236 → 236/236` with `JSG-04 64/67 → 67/67`. **SO THE `3` FAILs ARE HISTORY AND NOT A CURRENT STATE:**
they were ONE finding of ONE scenario — `JSG-04.1.v` · `JSG-04.2.v` · `JSG-04.4.v`, the verbose rejection's
target half and its class half at a VALUE position — and **their defect was the IMPLEMENTATION's, which has
since repaired it** (`docs/specs/storeroom-js/surface.md §2.5` item 5 clauses (a)–(b) and `crossing.md §1.8`'s
dated clause 3 are the clauses they drove; `archive/gate5/storeroom-js-greens-run.md` `§3`'s FINDING 1 is the
filing of that state, and `§1`/`§3` of that record are read as HISTORICAL beside this clause).

**AND `F-DOC-1` AND THE TENSION ROW ARE UNMOVED AND ARE NOT THIS CLAUSE'S SUBJECT.** **`F-DOC-1`**
(`package.md §1.3` item 4's *"none of the five"* against item 3's own list) **was repaired in the document**
(**`JSG-12.13`** on this page asserts the RE-DERIVED cell, and `package.md §1.3` item 4 now declares the
addon's five names with the fourth item naming `storeCreate` as the entry's OWN factory), **and the tension
row** — `§2.4` rule 3's *"ONCE"* against the store's `DD-42` for the caller-spelled duplicate — **was
RECONCILED by the later dated clauses** (`surface.md §2.4`'s dated clause of 2026-10-11 and `contract.md
§2.4`'s twin, whose (i)–(ii) split both this set's `JSG-08.21`/`JSG-08.22` figures and the shipped boundary now
hold). **NEITHER ROW IS ASSERTED AWAY, NEITHER IS WITHDRAWN, AND NO CELL OF `§2` MOVES BY THIS CLAUSE.**

**WHAT THIS CLAUSE DOES NOT DO, SAID PLAINLY BECAUSE IT IS A GREENS SET AND NOT A RUN.** **This pass RAN
NOTHING — it holds no execution verb — so NOT ONE ASSERTION WAS RE-EXECUTED BY IT, and the `236/236` above is
QUOTED FROM THE GATE-6 RE-MEASUREMENT AT A PINNED ARTEFACT HASH, named at its own `§2.3`.** **THE LAYER IS
`ENVELOPE/PURE`, THE `APP` LAYER FOR THIS UNIT IS `NONE`, AND NO `APP`-GREEN IS CLAIMED HERE OR ANYWHERE IN
THIS FILE** (`§4.2` items 2–3; `DD-20`). **NO `APP`-GREEN EXISTS, NO CONSUMER APPLICATION LOADS THIS PACKAGE
ANYWHERE IN THIS REPOSITORY, AND THE `72`-ASSERTION LIVE BATTERY (`archive/gate6/storeroom-js-live-determination.md`
`§4`) IS A `LIVE / ASSEMBLED PACKAGE` FIGURE THAT RETIRES NO `ENVELOPE/PURE` ROW**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` — every figure carries its site and its layer;
A3 archive/gate6/storeroom-js-live-determination.md §2.3 · §3 · §4 — the re-measurement and the live battery |
numeric or census claim]`).

**END OF THE GREENS SET.**

---

**⟶ RECONCILED AGAIN 2026-10-11 — THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`): EVERY FIGURE THIS FILE PRINTS FOR THE JS LEG, FOR THE BLIND SET AND FOR THE LIVE BATTERY IS READ AT ITS OWN BYTES AND CORRECTED BESIDE ITSELF, BECAUSE A THIRD TREE HAS LANDED SINCE THE LAST CLAUSE ABOVE AND THIS FILE'S CENSUS STILL PRINTS THE SECOND'S.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's census sentence, the `§1` scenario table, the `§2` per-scenario heads and their cells, `JSG-01`'s and `JSG-12`'s re-derivation clauses, the `§3` un-derived list, the `§4` region with all of its dated clauses, the census clause and the `Q5` and `Q7` clauses — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION at the file's foot, it CORRECTS NO SCENARIO, WEAKENS NO ASSERTION, RE-DERIVES NO EXPECTATION, ADDS NO CELL and EDITS NO BYTE of `§2`.** **THIS PASS RAN NOTHING AND HOLDS NO EXECUTION VERB: every figure below is the CLOSE-OUT MEASUREMENT'S, taken at this close-out by the supervisor on artefact `sha256:0136c912…` (`958,112` bytes), and each carries the site, the layer and the terms of its own tree.**

1. **THE BLIND SET'S OPERATIVE FIGURE, WITH BOTH ITS TERMS, AND THE THREE READINGS ALREADY IN THIS FILE EACH KEPT AT ITS OWN TREE.** **OPERATIVE: `node bindings/js/greens/greens.mjs` at the REPOSITORY ROOT — `241` authored · `241` EXECUTED · `241` PASS · `0` FAIL over the SAME `13` scenarios, `JSG-12` reading `18` assertions.** **The `§2` heads sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 = 241` ✓.** **THE READINGS THIS FILE ALREADY CARRIES, EACH WITH ITS TREE AND NONE WITHDRAWN: `236` authored · `236` executed · `233` PASS · `3` FAIL is the GATE-5 TREE'S own record, quoted at the `§4` table; `236` PASS of `236` at commit `9707ee9` is the GATE-6 RE-MEASUREMENT'S; `240` authored · `240` PASS of `240` with `JSG-01` at `17` is the `Q5` RE-DERIVATION'S; and `241`/`241` is the `U-STOREROOM-PUBLISH` RE-DERIVATION'S, which added `JSG-12.18` (the `files` allowlist) and is the operative one.** **THE LAST OF THESE IS NAMED IN THIS FILE'S OWN `JSG-12` CLAUSE, ITEM `5`, AND IN THE HEAD'S `LIVE-F5` CLAUSE — WHERE THE SET IS STILL PRINTED AS `240` — so THE HEAD'S `240` IS READ FROM THIS DATE AS THE PRE-PUBLISH-UNIT FIGURE: it is that re-derivation's ENTRY reading, and the `241` is that re-derivation's own RESULT.** **THE LAYER IS `ENVELOPE/PURE`; THE `APP` LAYER FOR THIS UNIT IS `NONE`, AND NO `APP`-GREEN EXISTS, IS CLAIMED OR BECOMES AVAILABLE.**

2. **THE JS LEG'S OPERATIVE FIGURE, AND THIS FILE'S `174` — THE ONE CELL THE SUPERVISOR NAMED — NAMED BESIDE ITS OWN BYTES.** **OPERATIVE: `node --test bindings/js/test/*.test.mjs` at the REPOSITORY ROOT — `185` tests · `185` PASS · `0` FAIL · `0` skipped, OVER `9` TEST FILES.** **THE TERMS, SO THE FIGURE IS CHECKABLE AND NOT MERELY ASSERTED: `185` = `113` PRE-EXISTING + `62` THIS PUBLISH UNIT'S OWN RED-SET CELLS AT `bindings/js/test/publish.test.mjs` + `10` ITS `NG-PUB-A`…`NG-PUB-J` GENERATORS AT `bindings/js/test/publish-generators.test.mjs` — `113 + 62 + 10 = 185` ✓ — and the per-file census beside it is `round-trip` `21` · `surface` `36` · `registry` `17` · `package-entry` `17` · `register` `2` · `negative-generators` `12` · `convenience` `8` · `publish` `62` · `publish-generators` `10` = `185` ✓.** **THE `113` IS NOT A THIRD FIGURE OF A DIFFERENT SUITE: IT IS THE SAME LEG'S COUNT AT THE `U-STOREROOM-JS`/CONVENIENCE TREE, and THIS FILE'S `113` AT `Q7`'S CLAUSE AND AT THE `JSG-12` CLAUSE'S ITEM `6` IS READ FROM THIS DATE AS THAT TREE'S.** **THE AS-FILED CELL THE SUPERVISOR NAMED IS `JSG-12`'s RE-DERIVATION CLAUSE, ITEM `6`, WHICH READS** *"the `174` tests · `174` pass · `0` fail on the JS leg; `91`/`91`/`0` on the live battery; `379` PASS · `0` FAIL at the store's root"* **— and `174` IS NEITHER THE LEG'S COUNT AT THAT CLAUSE'S OWN DATE NOR ITS COUNT TODAY: it is the reading of the tree that stood between the convenience add-on's `113` and this publish unit's `185` (the `14`-figure check at `archive/gate3/storeroom-publish-red-set.md` `§7.7` prints `174` at its own date and `§9.4`/`§10.5` print `185` after it).** **SO THE OPERATIVE JS-LEG FIGURE IS `185` tests · `185` PASS · `0` FAIL · `0` skipped, and `174` joins `108`, `101`, `92` and `89` as that leg's own superseded readings, each at its own tree and each kept byte-for-byte where it stands.**

3. **THE LIVE BATTERY'S OPERATIVE FIGURE.** **OPERATIVE: `node bindings/js/greens/live-drive.mjs` at the REPOSITORY ROOT — `91` authored · `91` PASS · `0` FAIL over `13` scenarios, `LIVE-13` (the end-to-end `on`/`off` flow) carrying `19` — LAYER `LIVE / ASSEMBLED PACKAGE`, `APP` LAYER `NONE`, additive: it retires no `ENVELOPE/PURE` row.** **The `72`/`72` over `12` scenarios this file's `§4` clause and its `Q7` clause print is the PRE-`Q6` reading, and `72 + 19 = 91` ✓; `§4`'s `72`-assertion sentence is the ONE cell of this section that the `LIVE-F5` finding at `archive/gate6/storeroom-js-live-determination.md` `§10.7` item `2` names and does not move, and it is read through this item.**

4. **AND THE TWO RUST LEGS, PRINTED ONCE MORE BECAUSE THIS FILE QUOTES THEM AND NEITHER IS RE-MEASURED HERE.** **The store's root suite — `cargo test --offline --no-fail-fast` at the REPOSITORY ROOT, its root `Cargo.toml` byte-identical — `379` PASS · `0` FAIL over `15` test binaries (`22+110+46+28+11+22+12+26+20+12+20+21+29`), the `+2` over `377` being the two listener cells whose home is `tests/watched_addresses.rs` (`19` → `21`), so `379 = 377 + 2` ✓; `377` and `374` are HISTORICAL. The sibling crate — `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` — `223` PASS · `0` FAIL, UNMOVED. And the narrowed correctness gates — `clippy --lib` and `rustfmt --check src/*.rs` — CLEAN on both crates.** **`ENVELOPE/PURE` for both, QUOTED and never re-labelled as this unit's.** (`DD-31`; `DD-33`.)

5. **WHAT THIS CLAUSE DOES NOT DO, STATED SO ITS SCOPE IS NOT OVER-READ.** **It runs nothing and holds no execution verb, so NOT ONE ASSERTION OF `§2` WAS RE-EXECUTED BY IT: every figure above is the close-out measurement's, QUOTED at the site that carries it.** **It adds no scenario, moves no `§2` head, edits no cell, re-words no expectation, admits no unit row, moves no ledger count and lifts no park.** **It does not touch `bindings/js/**`, `src/**`, `tests/**` or any byte under `../Provident-Electron/**`.** **AND IT DOES NOT TOUCH THE ONE FIGURE THIS FILE LEAVES UNCLOSED: the register runner's JS half is `107` attempts in this file's clauses and `117` over `12` lines at `bindings/js/test/register.test.mjs`'s own `line(...)` caps, so THAT FIGURE REMAINS OPEN FOR THE REGISTER RUNNER'S OWN OUTPUT, exactly as the `Q7`/`Q8` documentation-gates clause filed it.** **A reader takes the operative figures above; the as-filed cells stand beside them at their own dates.**

`[A1 docs/specs/storeroom-publish-proposal.md §12` · `A86`(a); A1 `docs/specs/storeroom-js-greens.md`'s `JSG-12` re-derivation clause item `5` and its head's `LIVE-F5` clause — the set's own two homes for the `241`; A3 `archive/gate5/storeroom-js-greens-run.md` `§7`–`§9`, `archive/gate6/storeroom-js-live-determination.md` `§8.5` · `§10.6` · `§11.6`, `archive/gate3/storeroom-publish-red-set.md` `§7.7` · `§9.4` · `§10.5`, `bindings/js/test/publish.test.mjs`'s `BLOCKS` registry and `bindings/js/test/publish-generators.test.mjs`'s `GENERATORS` registry — the `185`'s own derivation — and the supervisor's close-out measurement on artefact `sha256:0136c912…` (`958,112` bytes) | numeric or census claim]`

**⟶ AND THE CENSUS THIS FILE STATES IS SETTLED HERE, IN ONE READING WITH ITS TERMS, LANDED 2026-10-11 BY THE
BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THE PROOFREADING PASS NAMED THE HEAD'S SENTENCE AN UNDECIDABLE,
AND THIS CLAUSE IS ITS DISPOSITION.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's sentence, the
`§1` scenario table, the `§2` per-scenario heads and their cells, the `§3` un-derived list and the `§4` region
with both dated clauses — stands BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE
INSERTION, it CORRECTS NO SCENARIO, WEAKENS NO ASSERTION, RE-DERIVES NO EXPECTATION and EDITS NO CELL of
`§2`.**

1. **THE ONE CENSUS, STATED WITH ITS TERMS SO ITS TWO FIGURES ARE READ AS TWO COUNTED THINGS AND NOT AS ONE
   PHRASE.** **THE SET IS `236` ASSERTION CELLS OVER `13` SCENARIOS — two figures of two different things,
   each counted at its own site.** **THE ASSERTION CENSUS IS `236`: it is the count of ASSERTION CELLS, each
   cell being one table row of `§2` (with a refusal cell whose row prints an extra assertion counting
   `4 + 1`), and it is the count the `§2` per-scenario heads carry — `13 · 16 · 5 · 67 · 14 · 7 · 15 · 22 · 12
   · 24 · 18 · 17 · 6` — whose sum is `13 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 236` ✓.**
   **THE SCENARIO CENSUS IS `13`: it is the count of `JSG-nn` scenarios, one per `§2` head and one per row of
   `§1`'s table, and it is NOT a figure any driver counter prints.** **NEITHER FIGURE IS A SUBSET OF THE
   OTHER: `236` is not "`236` per scenario" and `13` is not an assertion count.**
2. **THE TOTALS, WITH THEIR TREE, THEIR COMMIT AND THEIR LAYER.** **`236` authored · `236` executed · `236`
   PASS · `0` FAIL, over the same `13` scenarios — the operative reading of this set, at the artefact built
   at commit `9707ee9` (*"js: the value-arm refusal verbose and the two doc cells reconciled — the blind set
   is `236/236`"*), which is the re-measurement the gate-6 record carries at its own `§2.3` and which the
   gate-8 clause above quotes.** **`236` authored · `236` executed · `233` PASS · `3` FAIL is the GATE-5
   TREE'S OWN RECORD, quoted at the `§4` table above and HISTORICAL from commit `9707ee9`.** **THE LAYER IS
   `ENVELOPE/PURE` AND THE `APP` LAYER FOR THIS UNIT IS `NONE`: no `APP`-green exists in this file, in its
   driver or in any record of this pass.**
3. **AND THE UNDECIDABLE THIS CLAUSE DISPOSES OF IS NAMED WITH ITS OWN WORDS.** **The gate-7 proofreading
   pass's item `4` records the head's sentence *"The set was authored as `236` assertions over `13`
   scenarios"* as a count it REPORTS RATHER THAN DECIDES, and names TWO READINGS** — **reading (i): `236` is
   the assertion census and `13` the scenario census, two figures of two different things; reading (ii): the
   sentence is read as a SINGLE authored-suite census in which the `13` is a SUBSET figure, because the
   driver's counters advance once per assertion and no counter in it counts scenarios.** **THE DISPOSITION
   IS READING (i), AND IT IS TAKEN HERE: item `1` above states the two counts as two counted things, each at
   its own site, with the `§2` heads' sum printed as the assertion census's own evidence — so the `13` is a
   SCENARIO count and NOT a subset of the `236`, and no figure of the set moves by this clause.**
4. **WHAT THIS CLAUSE DOES NOT DO.** **It runs nothing — this pass holds no execution verb — so not one
   assertion of `§2` was re-executed by it; the `236`/`236` is QUOTED from the gates that carry it.** **It
   edits no cell of `§2`, moves no strategy id, adds no scenario and re-words no head; the citation defect the
   proofreading clause above records as RESOLVED BY THE SUPERVISOR is untouched by it, and the file's own
   closing statement that *"THE `13` SCENARIOS ARE UNMOVED"* stands.** **AND THE FILE'S OWN CLOSING LEDGER IS
   UNMOVED: `236` authored remains this set's own figure, the `72`-assertion live battery remains a `LIVE /
   ASSEMBLED PACKAGE` figure that retires no row of this set, and no `APP`-green is claimed anywhere here**
   (`DD-20`; `DD-33`; `[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-10` — every figure carries its
   site and its layer; A3 archive/gate6/storeroom-js-live-determination.md §2.3 · §3 — the re-measurement |
   numeric or census claim]`).

---

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-JS` GATE-7 PROOFREADING PASS (`role_proofreader`): THE FIGURES
THIS FILE PRINTS, EACH WITH THE TREE IT DESCRIBES, PLUS ONE CITATION DEFECT AND ONE COUNT THAT IS NAMED AS A
FINDING RATHER THAN DECIDED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's `236` assertions over
`13` scenarios, the `§1` scenario table, the `§2` per-scenario heads and their cells, the `§3` un-derived list,
the `§4` table's `233`/`3` figure, its `3`-FAILS paragraph and both dated clauses — STANDS BYTE-FOR-BYTE and is
read THROUGH this clause; THIS clause is a PURE INSERTION, it CORRECTS NO SCENARIO, WEAKENS NO ASSERTION and
RE-DERIVES NO EXPECTATION.**

1. **THE BLIND SET'S OPERATIVE FIGURE IS THE ONE ITS DRIVER PRINTS NOW.** **THE OPERATIVE READING OF THE BLIND
   SET AT THIS PASS IS `node bindings/js/greens/greens.mjs` — `236` authored · `236` executed · `236` PASS ·
   `0` FAIL.** **THE READINGS THIS FILE PRINTS, EACH WITH ITS TREE: `236` authored / `236` executed / `233`
   PASS / `3` FAIL is the GATE-5 TREE'S OWN RECORD, quoted at the `§4` table and standing as that tree's
   HISTORICAL figure; and `236` PASS of `236` at the pinned artefact is the GATE-6 RE-MEASUREMENT's, carried by
   the gate-8 clause above.** **A later pass's own run — this gate's — prints `236/236` again, so no figure in
   this file is currently failing and none is withdrawn** (`DD-33`; `AR-10`).
2. **THE LIVE BATTERY'S FIGURE, NAMED BESIDE THE BLIND SET'S SO THE TWO ARE NOT RUN TOGETHER.** **The clause
   above names the `72`-assertion live battery as a `LIVE / ASSEMBLED PACKAGE` figure that retires no
   `ENVELOPE/PURE` row.** **⟶ AND THE `72` THIS CLAUSE PRINTS AS THAT BATTERY'S OPERATIVE FIGURE IS THE PRE-`Q6` READING, CORRECTED BESIDE ITSELF 2026-10-11 BY THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`): THE OPERATIVE READING IS `node bindings/js/greens/live-drive.mjs` — `91` authored · `91` PASS · `0` FAIL OVER `13` SCENARIOS, `LIVE-13` CARRYING `19`, SO `72 + 19 = 91` ✓.** **The sentence under it — its drive, its additivity, its retirement of no row and its not-being-a-figure-of-this-file — STANDS BYTE-FOR-BYTE AND IS UNMOVED.** **AND THE CENSUS THAT SENTENCE CARRIES — *"this set's `236` is unmoved by it"* — IS RE-READ AS `241`: the set's operative authored census is `241` (`17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 = 241` ✓), the `+1` being `JSG-12.18` (the `files` allowlist), while `236` stands as this clause's own tree's.** **THE OPERATIVE READING OF THAT BATTERY IS `node bindings/js/greens/live-drive.mjs` —
   `72` authored · `72` PASS · `0` FAIL**, driven at a real caller-spelled `cfg.filePath` with real
   file-tier I/O, real child processes and the addon-absent arm, and **it is ADDITIVE: it retires no row of
   this set, and this set's `236` is unmoved by it.** **IT IS NOT A FIGURE OF THIS FILE AND THIS FILE CLAIMS
   NO PART OF IT** (`DD-20`; `[A1 | numeric or census claim]`).
3. **AND ONE CITATION DEFECT, RECORDED HERE BECAUSE THIS FILE IS WHERE THE CITATIONS ARE READ.** **The clauses
   above cite `archive/gate6/storeroom-js-live-determination.md` `§2.3` / `§3` / `§4` as the home of the
   re-measurement and of the `72`-assertion live battery.** **THAT PATH DOES NOT RESOLVE IN THIS REPOSITORY AT
   THIS PASS** — the `archive/gate6/` directory carries the two STORE units' determinations only — **so the
   `236/236` re-measurement and the `72`-assertion live battery are QUOTED THROUGH THIS CLAUSE AND THEIR
   RECORD IS OWED AT THE PATH THE CITATIONS NAME.** **THE DEFECT IS THE CITATION'S, NOT THE FIGURES': the two
   drivers exist at `bindings/js/greens/greens.mjs` and `bindings/js/greens/live-drive.mjs` and print the
   figures quoted, while a record named by three clauses of this file and by `surface.md` `§2.5` has no bytes
   at its own path.** **Owner: the `U-STOREROOM-JS` live-determination gate's landing pass — this pass writes **⟶ RESOLVED 2026-10-11 BY THE SUPERVISOR (inspection): THE RECORD EXISTS — `archive/gate6/storeroom-js-live-determination.md`, `35,923` bytes, written `2026-10-11 23:46` — so BOTH readings the finding offered (an owed unfiled record / a wrong path) ARE REFUTED: the path is correct and the file is present. The proofreading pass read the directory WHILE the live pass was still landing that file, so the finding was a MID-WRITE RACE, closed at this inspection. NO CITATION MOVE IS OWED, and the `236`/`72` figures quoted from that record stand as quoted.**
   no `archive/**` byte and re-points no citation to a path it cannot verify.**
4. **AND THE ONE COUNT THIS PASS REPORTS RATHER THAN DECIDES — NAMED HERE WITH BOTH READINGS.** **THE HEAD's
   sentence reads** *"The set was authored as `236` assertions over `13` scenarios"*, **and it is the count of
   ASSERTION CELLS, not of scenarios.** **READING (i): `236` is the assertion census and `13` the scenario
   census, two figures of two different things, exactly as the `§1` table and the `§2` per-scenario heads
   print them (the heads sum `13 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 17 + 6 = 236` ✓), and the
   driver's own totals line prints `AUTHORED 236 · EXECUTED 236` — so the sentence is accurate and nothing
   moves.** **READING (ii): the sentence's *"`236` assertions over `13` scenarios"* is read as a single
   authored-suite census in which the `13` is a SUBSET figure, because the driver's own counters advance once
   per assertion and no counter in it counts scenarios — so the `13` would be a count this file derives from
   the `§2` heads rather than one the run prints.** **THIS PASS DOES NOT SETTLE WHICH READING IS INTENDED: it
   writes no assertion, edits no scenario and moves no figure of the set, and it names the two readings here so
   a later pass re-derives the sentence's subject instead of guessing** (`[T: this file's figures, its owed
   record and the one undispositioned count | CENSUS]`).

---

**⟶ RE-DERIVED AND RE-RUN 2026-10-11 — THE `Q5` RE-DERIVATION PASS (`role_blind_test_writer`), ON THE `Q1`
CONTRACT AMENDMENT'S `A79`–`A81`: THE MEMBER-SET FIGURE MOVED, THE TWO NEW MEMBERS' SURFACE WAS ADDED, AND
THE WHOLE SET WAS RE-EXECUTED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's census
sentence, the `§1` scenario table, the `§2` per-scenario heads and their cells, the `§3` un-derived list, the
`§4` table's `233`/`3` figure, its `3`-FAILS paragraph and every dated clause of this file — STANDS
BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION, it CORRECTS NO OTHER
SCENARIO, WEAKENS NO ASSERTION, RE-DERIVES NO EXPECTATION OUTSIDE `JSG-01`'S TWO NAMED CELLS and EDITS NO
CELL of `§2` outside the `4` it adds.** **This pass DID run — it holds the set's execution verb, and it is
the pass `contract.md §5.5`'s dated clause (clause 5) tasked.**

1. **WHAT MOVED, AND THE CLAUSE THAT FIXED IT.** **`JSG-01`'s member-set claim moved `{ register }` →
   `{ register, on, off }`.** **THE CLAUSE THAT FIXES THE NEW VALUE IS `docs/specs/storeroom-js/surface.md`
   `§2.1`'s dated clause, item 1 (a), the `Q1` amendment's operative member-set statement on the ruling
   `A79` (*"Use S-1"*), carried by `§2.4` item 7's two clauses; the OLD value was `§2.4` item 5 (a)'s
   PRE-AMENDMENT declaration, which that clause supersedes as a MEMBER-SET FIGURE while its bytes stand at
   their own `§`.** **THE TWO CELLS THAT MOVED ARE THE SCENARIO'S HEADER (its `§1` row and its `§2` clause
   list, whose entries now name `§2.1`'s dated clause 1 (a)–(b) and `§2.4` item 7) AND THE CELL `JSG-01.9`,
   which now asserts the sorted three-member set `['off','on','register']` EXACTLY — no looser form, and no
   fourth member tolerated.** **THE NAMESPACE CLAIM DID NOT MOVE: `JSG-01.2`'s EIGHT names, `JSG-01.7`,
   `.11`, `.12` and `.13` stand as filed and stand TRUE** (`§2.1`'s dated clause 1 (b) — *"THE MODULE
   NAMESPACE IS UNCHANGED AT THE EIGHT DECLARED VERBS"*; `contract.md §5.5`'s dated clause, clause 5, which
   says so in its own words).
2. **WHAT WAS ADDED, AND WHY THE COUNT MOVED.** **`JSG-01` gained `4` cells — `.14`, `.15`, `.16`, `.17` —
   the two new members' surface, each at its own clause and none of them asserting what `§2.4` item 7 does
   not declare:** **their function class** (`.14`); **their ABSENCE from the module namespace, the
   amendment's own UNMOVED claim at its two new names** (`.15`); **`on`'s DECLARED RETURN — the opaque
   handle, the same output spelling `listen` returns, so the two spellings gain no third** (`.16`); **and
   `off`'s DECLARED RETURN — `undefined` on every success** (`.17`). **NO FIRING RULE IS STATED, DERIVED OR
   ASSERTED by any cell of this scenario, new or old: the firing is the store's per `A78`, and its authority
   is `docs/specs/storeroom-native/write-and-read.md §6.5` item 14.**
3. **THE TOTALS OF THIS PASS'S RUN, WITH THEIR SITE, THEIR LAYER AND THE TERMS OF EACH FIGURE.**
   **THE BLIND SET, `node bindings/js/greens/greens.mjs` AT THE REPOSITORY ROOT against the artefact the
   README's declared build step produces — `240` AUTHORED · `240` EXECUTED · `240` PASS · `0` FAIL, over the
   SAME `13` scenarios, with `JSG-01` reading `17 PASS · 0 FAIL` — LAYER `ENVELOPE/PURE`, `APP` LAYER `NONE`,
   and NO `APP`-GREEN CLAIMED.** **THE AUTHORED COUNT MOVED `236 → 240` BY THE `4` CELLS OF ITEM 2, AND THE
   SCENARIO COUNT DID NOT MOVE: the `§2` heads now sum `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 +
   17 + 6 = 240` ✓, with every head but `JSG-01`'s unmoved.** **THE PRE-RUN STATE IS RECORDED WITH IT: the
   as-filed set read `236` AUTHORED · `235` PASS · `1` FAIL at the same site, the ONE red cell being
   `JSG-01.9`'s superseded member set — the red cell this re-derivation was tasked to correct.**
4. **AND THE OTHER THREE LEGS, EACH WITH ITS OWN SITE AND ITS OWN LAYER.** **The JS leg,
   `node --test bindings/js/test/*.test.mjs` — `108` tests · `108` PASS · `0` FAIL** (this pass's re-derivation
   FALSIFIES NO RED-SET CELL; `contract.md §5.5`'s dated clause, clause 5, measured the two own-property
   enumerations of `bindings/js/test/**` as enumerating the HANDLE, which stays memberless, and this pass
   re-measured that as the `108/108` above). **The store's root suite, `cargo test --offline --no-fail-fast`
   at the repository root — `379` PASS · `0` FAIL** (the store's figure, quoted and re-measured; no store
   byte moves). **And the live battery, `node bindings/js/greens/live-drive.mjs` — `72` authored · `72`
   executed · `71` PASS · `1` FAIL, its one red cell being `LIVE-1.3`, the LIVE RUNNER's own superseded
   member-set cell, which is `Q6`'s and is NOT touched, re-derived or weakened by this pass** (LAYER:
   `LIVE / ASSEMBLED PACKAGE`; it retires no row of this `ENVELOPE/PURE` set).
5. **THE RECORD.** **The re-derivation and this run are filed, with every cell and every figure, at
   `archive/gate5/storeroom-js-greens-run.md` `§7`** (`docs/specs/storeroom-js-proposal.md §5` · `Q5`;
   `contract.md §5.5`'s dated clause, clause 5; `archive/gate5/storeroom-js-greens-run.md` — this pass's
   dated `§`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A3 docs/specs/storeroom-js/surface.md
   §2.1's dated clause 1 (a)–(b), §2.3's dated clause 1 and §2.4 item 7 (a)–(c); A3
   docs/specs/storeroom-js/parameter-semantics.md §2.8's and §2.12's dated clauses; A3
   docs/specs/storeroom-js/contract.md §5.5's dated clause; bindings/js/README.md — the build step the JS
   leg runs after | numeric or census claim]`).**

---

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THE FIGURES THE `Q5` CLAUSE ABOVE PRINTS FOR THE OTHER TWO LEGS, AND THIS SET'S OWN OPERATIVE READING.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's census sentence, the `§1` table, the `§2` per-scenario heads and their cells, the `§3` un-derived list, the `§4` region with both dated clauses, the census clause and the `Q5` re-derivation clause's five items — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION, it CORRECTS NO SCENARIO, WEAKENS NO ASSERTION, RE-DERIVES NO EXPECTATION and EDITS NO CELL of `§2`. THIS PASS RAN NOTHING: it holds no execution verb, so every figure below is read at the site that carries it.**

1. **THIS SET'S OWN OPERATIVE READING IS ITS `Q5` RUN: `240` authored · `240` executed · `240` PASS · `0` FAIL over the SAME `13` scenarios, with `JSG-01` at `17` assertions.** **THE READINGS ALREADY IN THIS FILE, EACH WITH ITS TREE: `233` PASS · `3` FAIL of `236` is the GATE-5 TREE'S own record (commit `e941f24`); `236` PASS of `236` is the GATE-6 RE-MEASUREMENT'S at commit `9707ee9`, which the gate-8 and gate-7 clauses above call operative and which is now the PRE-AMENDMENT tree's; and `240/240` is operative from the `Q5` re-derivation.** **The `13` SCENARIOS ARE UNMOVED and every head but `JSG-01`'s is unmoved, so nothing this amendment added moved a scenario — it moved the member-set cell and added the two new members' surface.**
2. **AND THE `Q5` CLAUSE'S OTHER TWO LEGS HAVE MOVED SINCE IT RAN, NAMED WITH THEIR TREES.** **IT READS** *"The JS leg, `node --test bindings/js/test/*.test.mjs` — `108` tests · `108` PASS · `0` FAIL"* **and** *"the live battery, `node bindings/js/greens/live-drive.mjs` — `72` authored · `72` executed · `71` PASS · `1` FAIL, its one red cell being `LIVE-1.3`"*. **THE OPERATIVE READINGS: the JS leg is `113` tests · `113` pass · `0` fail** — the `+5` over `108` being THIS amendment's `convenience.test.mjs` eighth cell and the four generators `NG-JS-I`…`NG-JS-L`, authored after the `Q5` pass — **and the live battery is `91` authored · `91` PASS · `0` FAIL over `13` scenarios, `LIVE-13` (the end-to-end `on`/`off` flow) carrying `19`, `LIVE-1.3`'s member-set assertion having been re-derived by the `Q6` live pass, so `72 + 19 = 91` ✓.** **The `71`/`1` reading is the `Q5` pass's own entry state on a driver that had not yet been re-derived, and its `12`-scenario reading is that tree's.** **The store's leg the `Q5` clause quotes at `379` PASS · `0` FAIL is UNMOVED**, and that clause's own subject — that the re-derivation falsifies no red-set cell — STANDS.
3. **AND THE BYTES BOTH GREENS DRIVERS' FIGURES DESCRIBE, ADDED HERE BECAUSE THIS FILE PRINTS THE FIGURES AND NEVER THE DIGEST: `bindings/js/build/Release/storeroom_js_binding.node` — `sha256:cf088d91…`, `957,904` bytes; the PRE-AMENDMENT digest the gate-5 and gate-6 records carry is `effcf6a6…` at `950,960` bytes.** **The artefact is gitignored and untracked, so the digest is the only durable tie between these figures and the bytes they describe, and both run records carry it at `C-8`.**
4. **AND THE LEDGER THIS FILE'S CLAUSES PRINT IS RE-READ ON THE ARCHITECT'S CENSUS RULING — AN AMENDMENT IS A ROW AND NEVER A UNIT: `2 DONE / 0 open` UNITS = `2` (`2 + 0 = 2` ✓), the two units being `U-STOREROOM-NATIVE` (`N1`) and `U-STOREROOM-JS` (`N3`, whose row this amendment is), with the `## OPEN` set at `0` unit rows and `0` open non-unit rows (`0 + 0 = 0` ✓).**
**NO `APP`-GREEN EXISTS, IS CLAIMED OR BECOMES AVAILABLE: THIS SET'S LAYER IS `ENVELOPE/PURE`, THE LIVE BATTERY'S IS `LIVE / ASSEMBLED PACKAGE`, THE ASSEMBLED/`APP` LAYER IS `NONE`, AND NO CONSUMER APPLICATION LOADS THIS PACKAGE ANYWHERE IN THIS REPOSITORY** (`§4.2` items 2–3; `DD-18`; `DD-20`; `[T: this set's operative reading and the two legs the `Q5` clause names beside it, each with its tree | CENSUS]`).

**⟶ AND THE DIGEST'S TIE IS READ WITH ITS TWO LIMITS, LANDED 2026-10-11 BY THE `Q8` DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`) BECAUSE THIS FILE PRINTS THE FIGURES AND THE CLAUSE ABOVE PRINTS THE DIGEST.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte and is read THROUGH this clause; THIS clause is a PURE INSERTION, it edits no cell, re-derives no expectation, weakens no assertion and runs nothing.**
1. **`sha256:cf088d91…` (`957,904` bytes) TIES EXACTLY TWO FIGURES OF THIS SET'S AMENDMENT — THE BLIND SET'S `240/240` AND THE LIVE BATTERY'S `91/91` — AND IT DOES SO FROM A TAIL CLAUSE OF EACH RUN RECORD AND FROM NOWHERE ELSE.** **NEITHER FIGURE'S OWN CELL NAMES A DIGEST: this set's `§4` cell, its record's `§7.3` blind-set row and its `§7.4` totals print the figure with its site and its layer alone, and the gate-6 record's `§4` row does the same.** **So a reader who takes a cell alone takes an UNTIED figure, and the tail clause is part of the figure's terms.**
2. **AND THE GATE-5 RECORD'S IN-RECORD LEGS ARE NOT TIED AT ALL, WHICH IS A DIFFERENT STATE FROM UNSTATED: its `108`-test JS leg, its `379` store-root leg and its `72`-assertion live leg (`71` PASS · `1` FAIL) were taken on a `950,960`-byte artefact written `2026-10-10 03:12` FOR WHICH NO DIGEST IS RECORDED ANYWHERE IN THIS REPOSITORY.** **The pre-amendment digest `effcf6a6…` names the artefact of a different tree; the tail clause's own sentence groups every pre-amendment figure under it, so the three in-record legs read as UNRESOLVED rather than as pinned to `effcf6a6…` or to `cf088d91…`.**
3. **AND THE TWO RUST LEGS BEAR NO DIGEST AT ALL: `223` (the sibling crate) and `379` (the store's root suite) are the two Rust suites' own totals, and no `.node` is loaded by either — so the artefact's digest is irrelevant to them and a cell that reads one of them as artefact-tied is a FINDING.**
**NO FIGURE OF THIS SET MOVES BY THIS CLAUSE, AND NO `APP`-GREEN IS CLAIMED OR AVAILABLE** (`[A3 `archive/gate5/storeroom-js-greens-run.md` `§7.3`/`§7.4` and its tail digest clause; A3 `archive/gate6/storeroom-js-live-determination.md` `§4` and its tail digest clause; A3 docs/specs/storeroom-js/contract.md §7.2` and `implementation-plan.md`'s foot clause — the same tie, carried at this unit's own two homes | cross-reference]`).

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-PUBLISH` GATE-8 DOCUMENTATION REVIEW (`role_documentation_reviewer`): THE THREE LAYERS THIS SET'S FIGURES LIVE ON, ONE OF WHICH THIS FILE DID NOT NAME, AND THE SCENARIO SETS READ AGAINST THE TWO DRIVERS AS THEY NOW STAND.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's census sentence, the `§1` scenario table, the `§2` per-scenario heads and their cells, the `§3` un-derived list, the `§4` region with all of its dated clauses, and the census, `Q5`, `Q7` and digest clauses — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS CLAUSE IS A PURE INSERTION, it CORRECTS NO SCENARIO, WEAKENS NO ASSERTION, RE-DERIVES NO EXPECTATION, ADDS NO CELL and EDITS NO BYTE of `§2`. THIS PASS RAN NOTHING AND HOLDS NO EXECUTION VERB.**

1. **THE SET'S OWN LAYER, READ AT ITS DRIVER: `ENVELOPE/PURE`, AND THE LABEL TRAVELS WITH EVERY FIGURE OF THE RUN.** **`bindings/js/greens/greens.mjs` declares `const LAYER = 'ENVELOPE/PURE'` and asserts it in-cell at `JSG-12.15`; its own header reads** *"LAYER: ENVELOPE/PURE. APP LAYER: NONE. NO `APP`-GREEN IS CLAIMED HERE OR ANYWHERE IN THIS RUN."* **UNMOVED, AND `§4.2` items `1`–`2` are the clause that pins it.**
2. **THE LIVE BATTERY'S LAYER, READ AT ITS DRIVER: `LIVE / ASSEMBLED PACKAGE`, `APP` LAYER `NONE`.** **`bindings/js/greens/live-drive.mjs` prints, on its own totals line, `layer LIVE / ASSEMBLED PACKAGE (real artifact, real process, real file I/O, real caller) — APP layer NONE` and closes `LAYER: LIVE / ASSEMBLED PACKAGE … — APP layer NONE, no APP-green claimed`; and the run's own record prints the same line verbatim** (`archive/gate6/live-run-auspicion-scope-2026-10-11.txt`, its lines `9` and `53`; `archive/gate6/live-run-prerename-8.7-red-2026-10-11.txt` — the pre-rename reading of the SAME battery). **THE BATTERY IS ADDITIVE: it retires no `ENVELOPE/PURE` row of this set, and this set's rows are not re-labelled by it.**
3. **AND THE THIRD LAYER, NAMED HERE BECAUSE THIS FILE DID NOT NAME IT AND A READER OF THIS SET ALONE COULD NOT TELL IT APART FROM EITHER OF THE TWO ABOVE: `LIVE/INSTALL` IS A DIFFERENT LAYER, IT IS THIS PROJECT'S OWN, IT IS POST-RELEASE BY CONSTRUCTION, AND IT IS NEVER A GREEN — of this set, of its driver, of the live battery, or of any pass of this repository.** **ITS DEFINITION IS THE INSTALL OF THE RELEASED BYTES, BY A REAL PACKAGE MANAGER, IN A CLEAN DIRECTORY WITH NO REPOSITORY IN ITS ANCESTRY AND NO `build/Release` BESIDE THE ENTRY, EXERCISED THROUGH THE CLAIMED ESM ENTRY TO A FINAL RESOLVED STATE — so it PRESUMES REGISTRY STATE (five published platform names and a published main package), ITS FIGURE CANNOT EXIST BEFORE THE ARCHITECT'S RELEASE ACT, AND RUNNING IT EARLY — OR REPORTING ITS FIGURE BEFORE THE RELEASE — IS A STOP CONDITION.** **ITS HOME IS THE `U-STOREROOM-PUBLISH` CONTRACT ALONE — `docs/specs/storeroom-publish/contract.md` `§4.1`–`§4.5` and `docs/specs/storeroom-publish/acceptance.md` `§2`–`§5` — AND ITS LABEL IS CITED AND NEVER INSERTED AT THIS SET'S LAYER CLAUSE, because a layer-vocabulary amendment is not one of the two homes the `A82`+`A84` amendment reaches.** **SO NO `LIVE/INSTALL` FIGURE IS, OR CAN BE, A FIGURE OF THIS FILE; AND A CELL HERE THAT READ ONE AS A GREEN — OR THAT READ THE INSTALL LAYER AS A SUBSTITUTE FOR THIS SET'S `ENVELOPE/PURE` LEG OR FOR THE LIVE BATTERY'S `LIVE / ASSEMBLED PACKAGE` LEG — WOULD BE A FINDING.** **THIS PASS FOUND NONE AND PRINTS THIS ITEM SO THE READING CANNOT DRIFT** (`docs/specs/storeroom-publish/acceptance.md` `§2.1`, `§3.2`, `§4`; `docs/specs/storeroom-publish/implementation-plan.md` `§5` · stop condition `I`; `docs/specs/storeroom-publish-proposal-review.md` `§5.1` item `5`).
4. **AND THE SCENARIO SETS AND COUNTS, READ AGAINST THE TWO DRIVERS AS THEY NOW STAND — EACH WITH THE TREE IT DESCRIBES, AND WITH THE STALE READINGS LEFT WHERE THEY STAND.** **THE BLIND SET: `13` SCENARIOS (`JSG-01`…`JSG-13`) and the `§2` heads, whose operative reading this file's `JSG-12` clause item `5` and its close-out clause both print — `17 + 16 + 5 + 67 + 14 + 7 + 15 + 22 + 12 + 24 + 18 + 18 + 6 = 241` ✓, `JSG-12` at `18`, `JSG-13` at `6` — and THE DRIVER'S OWN SCENARIO ROWS ARE THOSE SAME THIRTEEN, `JSG-12.18` being the cell this unit's pass added and `JSG-12.15`/`.16` the two layer constants asserted in items `1`–`2` above.** **THE LIVE BATTERY: `13` SCENARIOS (`LIVE-1`…`LIVE-13`) and `91` ASSERTIONS, `LIVE-13` at `19`, printed by the driver's own totals line and by the run record's fourteen scenario lines.** **AND THE READINGS THIS FILE STILL CARRIES AT THEIR OLDER TREES — the head's `240` beside its `LIVE-F5` clause, the `§4` table's `236`/`233` figure and its `72`-assertion battery sentence, and the `Q5` clause's two legs — ARE EACH ALREADY NAMED AND RECONCILED BY A CLAUSE ABOVE AND ARE NOT MOVED HERE: they belong to the stale-`FIGURE` class, which this gate does not sweep, and they are NAMED in this pass's own record rather than edited** (`archive/reviews/2026-10-11-U-STOREROOM-PUBLISH-doc-review.md`).
**NO FIGURE OF THIS SET MOVES BY THIS CLAUSE, AND NO `APP`-GREEN AND NO `LIVE/INSTALL` GREEN IS CLAIMED OR AVAILABLE** (`[A1 docs/specs/storeroom-publish/acceptance.md §2`–`§4`; A3 `bindings/js/greens/greens.mjs`'s and `bindings/js/greens/live-drive.mjs`'s own layer lines; A3 `archive/gate6/live-run-auspicion-scope-2026-10-11.txt`; A3 `docs/specs/storeroom-publish/contract.md §4.2` item `3` | CENSUS]`).
