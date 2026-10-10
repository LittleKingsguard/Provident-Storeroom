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
| **JSG-01** | **THE SURFACE.** The eight verbs and nothing else; the instance's own member set is exactly `{ register }` — `§2.9` item 1, `§2.4` item 5 (a), `package.md §1.3` item 3, `package.md §1.3` item 4, `§3.5` — **`A63`** · **`A74`** |
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
own count is printed at its head. **The set was authored as `236` assertions over `13` scenarios** (the run's record
at `archive/gate5/storeroom-js-greens-run.md` prints the executed/PASS/FAIL totals and any cell the run
could not reach).

---

## §2. THE SCENARIOS

### JSG-01 — THE SURFACE (13 assertions)

**The clause(s).** `§2.9` item 1 (`8` verbs, no `findAddress`, no `NodeRef`); `§2.9` item 3
(no `exists()`, no shim); `§3.5` (`A74`: no `dispose()`, no `close()`); `§2.4` item 5 (a) (the instance's
entire declared member set is `{ register }`); `§2.1` (the store's internals are exposed through no member
of the package's handle); `§2.4` item 5 (a)'s own pointer that `register` is NOT a ninth named export;
`package.md §1.3` items 3–4 (the entry's named exports are the verbs and the factory, and NOTHING ELSE; the
internal addon's five names are internal); `§2.6` (no constraint/repair verb).

**The steps a caller takes.** (1) `import` the package's **claimed ESM entry** and take its namespace.
(2) Enumerate the namespace's own export names. (3) Call `storeCreate` with a legal `cfg` (a real path, a
positive `journalLength`, an empty `listeners`). (4) Enumerate the returned object's own member names.

**The expected observable, from the docs.**

| cell | the drive | the expected observable | the clause |
| --- | --- | --- | --- |
| **JSG-01.1** | `import` the entry | the module resolves to a non-null namespace object | `package.md §1.1`; `§3.1` |
| **JSG-01.2** | `Object.keys(ns).sort()` | **exactly `['delete','listen','read','readLiteral','rollback','storeCreate','unlisten','write']`** — `8` names, no ninth and none missing | `§2.9` item 1; `package.md §1.3` item 3 |
| **JSG-01.3** | `typeof ns[v]` for each of the `8` | `'function'` for every one of the eight | `§2.9` item 1 |
| **JSG-01.4** | `'findAddress' in ns` | **not an own export** | `§2.9` item 1 · **`A63`** |
| **JSG-01.5** | `'exists' in ns` | **not an own export** | `§2.9` item 3 |
| **JSG-01.6** | `'dispose'`/`'close'` in `ns` | **neither is an own export, at the package level or the store level** | `§3.5` · **`A74`** |
| **JSG-01.7** | `'register' in ns` | **NOT an own export of the module namespace** | `§2.4` item 5 (a); `package.md §1.3` item 3 |
| **JSG-01.8** | `storeCreate(cfg)` | a non-null object, neither a function nor an array | `§2.1` |
| **JSG-01.9** | `Object.getOwnPropertyNames(inst).sort()` | **exactly `['register']`** — one own member and NOTHING ELSE | `§2.4` item 5 (a) |
| **JSG-01.10** | `typeof inst.register` | `'function'` | `§2.4` item 5 |
| **JSG-01.11** | the eight verbs and `findAddress` as properties OF the instance | each is `undefined` — the store's own surface is exposed through no member of the handle | `§2.1`'s dated clause; `§2.4` item 5 (a) |
| **JSG-01.12** | `'version'`/`'errorMessage'`/`'call'` in `ns` | **none is an own export** — the internal addon's five names are internal | `package.md §1.3` item 4; `§3.1`'s dated clause |
| **JSG-01.13** | `'addConstraint'`/`'repair'` in `ns` | **neither is an own export** — no constraint or repair verb, parameter or seam is declared | `§2.6` · **`A73`** |

**What its failure would mean.** A ninth export, a missing verb, a `findAddress`/`exists`/`dispose` reach, a
second instance member or an exposed internal addon name means **the declared surface is not the shipped
one**: the crossing's whole closure argument (`§2.9`'s non-exposure, `§2.4` item 5's one-member handle) reads
false of the package.

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

### JSG-12 — THE PACKAGE AND THE LAYER (17 assertions)

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
| **JSG-12.10** | the manifest's registry identity `name` | **`'@provident-storeroom/js'`** | `§3.3` item 1 · `DD-26` |
| **JSG-12.11** | the manifest's `optionalDependencies` count | **`5`** — the matrix is five targets | `package.md §3.2` item 2 · `DD-25` |
| **JSG-12.12** | their names, label for label | `@provident-storeroom/js-linux-x64-gnu` · `…-linux-arm64-gnu` · `…-darwin-x64` · `…-darwin-arm64` · `…-win32-x64-msvc` — the label-to-artefact map, toolchain suffixes included | `package.md §3.2` item 5 · `§3.3` item 5 · `DD-26` |
| **JSG-12.13** | the internal addon's own names, taken from the namespace | **the FOUR internal-only names are absent from the module graph** — `version`, `errorMessage`, `call`, and the ADDON's own `register` — **and the fifth, `storeCreate`, is the ENTRY'S OWN FACTORY and not the addon's internal step** (an as-filed reading of `package.md §1.3` item 4 that would forbid that name is REFUTED by item 3's own list, and the tension is a DOC-side finding) | `package.md §1.3` items 3–4; `§1.2` items 1–2 · **`A70`** |
| **JSG-12.14** | the addon artefact's path as a subpath of the package | it is **not** published by the `exports` map — the reach is INTERNAL and is not a second realm | `package.md §1.2` items 1–3 · `DD-4` |
| **JSG-12.15** | this set's own declared layer constant | **`ENVELOPE/PURE`** — the label travels with every figure of this run, and its site is the command recorded at `archive/gate5/storeroom-js-greens-run.md` | `§4.2` items 1–2 · `DD-18` · `DD-20` |
| **JSG-12.16** | this set's own declared APP layer | **`NONE`** — the unit delivers a LIBRARY, there is no assembled application to be green, and **no `APP`-green is claimed in this file, in its driver or in the run's record** | `§4.2` items 2–3 · `DD-20` |
| **JSG-12.17** | the manifest's third-key rule and the runner's own pattern | the manifest declares no second entry and no post-install fallback build as its primary route — the published artefact is what the one claimed entry loads | `package.md §3.2` item 2 · `§3.3` item 2 · `DD-25` |

**What its failure would mean.** A second arms-bearing entry, a wildcard export, a CJS arm, a `main`, an
engine floor the docs do not declare, a licence site that disagrees, a matrix that is not the `5` the docs
name, or an `APP`-green anywhere in this pass's figures means **the package's claimed realm is not the one
the contract claims**, or the LAYER discipline (`AR-10`) has been broken — which no pass may do.

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

**END OF THE GREENS SET.**
