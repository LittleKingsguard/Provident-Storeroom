# TEST-CASE VIEW — `U-STOREROOM-JSON-CROSSING`

**Part of `contract.md`.** This view names the acceptance cases; the red set's files are authored at step 3 and the greens cells are owned by `§6` of the contract. Every case is stated in terms the contract can decide, not in terms of the retired tagged form. `[T]`

## §1 — COPY-IN, ADMITTED

| ID | Case | Expected |
| --- | --- | --- |
| `JC-TC-01` | `write(id, 'v', 'x')` | stores `'x'`; read returns `'x'` |
| `JC-TC-02` | `true`, `false` | stored and returned as booleans |
| `JC-TC-03` | finite numbers `0`, `1.5`, `-2` | stored and returned as finite numbers |
| `JC-TC-04` | `[]`, `[1, 'a', false]` | dense arrays; order preserved |
| `JC-TC-05` | `{}`, `{a: 1, b: 'x'}` | plain objects; members preserved |
| `JC-TC-06` | nested `{a: [{b: [1]}]}` | the whole tree crosses |
| `JC-TC-07` | a foreign-realm plain object | admitted; the plain-object test is structural, not identity-based |
| `JC-TC-08` | `-0` | stores and returns `0`; no `-0` sign promise |
| `JC-TC-09` | depth `126` | admitted; the store's persistent depth ceiling is operative, and the value commits and reopens intact |
| `JC-TC-10` | depth `65` and `66` | admitted; the former package bound is not a refusal |
| `JC-TC-11` | an acyclic diamond (`const a = {}; ({x: a, y: a})`) | admitted; the ancestor stack refuses cycles, not shared ancestry |

## §2 — COPY-OUT, ADMITTED

| ID | Case | Expected |
| --- | --- | --- |
| `JC-TC-12` | stored string / boolean / finite number | `read` returns the same primitive |
| `JC-TC-13` | stored dense array | `read` returns a fresh array with the same order |
| `JC-TC-14` | stored plain object | `read` returns a fresh plain object with the same members |
| `JC-TC-15` | stored nested tree | `read` returns the same tree, deeply copied |
| `JC-TC-16` | stored `-0` | `read` returns `0` |
| `JC-TC-17` | `to_js_value` output | no `{k:…}` tag, no `{v:…}` envelope, no `{e:…}` side-channel |
| `JC-TC-18` | `decodeValue` output | same bare tree as `to_js_value`; neither site leaks a class token |
| `JC-TC-19` | two reads of one stored value | two independent trees; no shared mutable member |

## §3 — THE SIXTEEN REFUSALS

Each case is refused at the package's walk, before any verb, with `ValueRefusedAtBoundary`, rank `17`, and the exact message parts in `parameter-semantics.md §3`.

| ID | Value | Expected class |
| --- | --- | --- |
| `JC-TC-20` | `null` | `null` |
| `JC-TC-21` | `undefined` | `undefined` |
| `JC-TC-22` | `function () {}` | `a function` |
| `JC-TC-23` | `Symbol('s')` | `a symbol` |
| `JC-TC-24` | `{[Symbol('s')]: 1}` | `a value carrying a Symbol-keyed own member` |
| `JC-TC-25` | `10n` | `a bigint` |
| `JC-TC-26` | `NaN`, `Infinity`, `-Infinity` | `a non-finite number` |
| `JC-TC-27` | nested depth `127` | `a value over the walk ceiling`, at the walk before any store verb, with `ValueRefusedAtBoundary` |
| `JC-TC-28` | `'\uD800'` at a value position | `a string carrying a lone surrogate` |
| `JC-TC-29` | `{'\uD800': 1}` | `a string carrying a lone surrogate` at the key position |
| `JC-TC-30` | `const a = {}; a.self = a` | `a value that contains itself` |
| `JC-TC-31` | `new Proxy({}, {})` | `a Proxy` |
| `JC-TC-32` | `new (class extends Array {})()` | `a class extending Array` |
| `JC-TC-33` | `new (class C {})()` | `a class instance or another prototype-carrying non-plain object` |
| `JC-TC-34` | `Object.defineProperty({}, 'a', {get() { return 1; }})` | `a value carrying an own accessor member` |
| `JC-TC-35` | `[1, , 3]` | `a sparse array` |

## §4 — REFUSAL FORM AND ORDER

| ID | Case | Expected |
| --- | --- | --- |
| `JC-TC-36` | a refused value at `write` | no store verb is called; no node/anchor/journal byte is written |
| `JC-TC-37` | message for `10n` at `{a: 10n}` | PART ONE is the store generator's bytes; PART TWO is `, the value at member 'a' of 'v' is a bigint` |
| `JC-TC-38` | status assertion | `ValueRefusedAtBoundary`; rank `17`; `ValueNotAdmitted` is not used on this route |
| `JC-TC-39` | a refused member | the whole containing value is refused; the key is not dropped |
| `JC-TC-40` | a refused member key | the whole value is refused; the key is not repaired or renamed |
| `JC-TC-41` | a missing carrier position beside a refused value | the carrier row's own answer wins its declared order; the walk does not reorder the store's answer |
| `JC-TC-42` | the node boundary: a dense top-level array of `999,999` elements, and of `1,000,000` elements | `999,999` is admitted (the root consumes the crate's first node); `1,000,000` is `a value over the walk ceiling` at the root `value` position, with `ValueRefusedAtBoundary` — same class and status as depth row 8, not `ValueNotAdmitted` |

**⟶ AMENDED 2026-10-23 — THE GATE-3 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): `JC-TC-37`'s PART TWO IS RE-SPELLED, AND THE NORMATIVE SPELLING IS `parameter-semantics.md`'s.** **The row above stands byte-for-byte and is read THROUGH this clause; THIS clause re-decides no case, moves no class and adds no cell.** **THE ROW PRINTS `, the value at member 'a' of 'v' is a bigint`; the normative spelling is `, the value at member 'a' of the write's value argument is a bigint`** — because PART TWO's position half is the position mapping of `parameter-semantics.md §2` (*"The root position is `the write's value argument`; below it the position is `member <path> of the write's value argument`"*) and the whole message is that part's `§3` WORKED EXAMPLE, whose rows `contract.md §9` declares normative (*"Its rows are normative and are read with `§2`–`§5`"*). **`'v'` IS THE RETIRED ADDRESS SPELLING OF THE POSITION and is a form no clause of this unit declares; it appears in `JC-TC-37` alone.** **THE MEASUREMENT: the executed greens cell `JC-B27` reproduces the normative spelling character for character** (its expected string ends `…, the value at member 'a' of the write's value argument is a bigint`), **so this row's `of 'v'` is the outlier and not the greens'.** **AND THE DRIFT THIS DISCHARGES:** the blind set recorded it and owed the reconciliation to the pass owning this file (`docs/specs/storeroom-json-crossing-greens.md` `§3.4`); this clause IS that reconciliation. `[A2 docs/specs/storeroom-json-crossing-greens.md · `JC-B27` and `§3.4`; parameter-semantics.md §2 · §3; contract.md §9 | requirement]`

## §5 — RESIDUE AND SCOPE

| ID | Case | Expected |
| --- | --- | --- |
| `JC-TC-43` | four carrier tag sites | address, tier, op-id and handle carriers are untouched; only the value tree moves |
| `JC-TC-44` | the JS test tree's value-tree tags | only the `4` value-tree occurrences are re-spelled (the red run's `8` tagged hits include `4` carriers); the `L`/`T`/`v` carriers stay; zero value-tree tags remain |
| `JC-TC-45` | `decodeValue` and `to_js_value` | both carry the bare tree; outside arms remain declared but unproduced |
| `JC-TC-46` | `napi` dependency row | fourth direct entry `serde_json = "1"` plus the `serde-json` feature; no fifth entry |
| `JC-TC-47` | `PKGS` preflight | no action; the property holds |
| `JC-TC-48` | store set | `CODES` is `[&str; 17]`; rank `17` is `ValueRefusedAtBoundary`; no rank moves |

## §6 — ACCEPTANCE RULE

**A case passes only if its expected form is the bare tree (for admissions) or the exact two-part refusal (for refusals).** A passing case that asserts a tag, an envelope, a class token, or a second status is not evidence for this contract. The implementation plan's verification step runs these cases plus the store test suite and `git diff --check`. `[T]`

**⟶ AMENDED 2026-10-23 (`A149`) — THREE CELLS ARE RE-DERIVED TO THE OPERATIVE BOUNDARY AND THE CELL CENSUS IS UNMOVED** (`RCA-8(g)`: **the clauses and cells above stand byte-for-byte and are read THROUGH this clause; the acceptance rule above is unmoved**). **`JC-TC-09`'s admission moves depth `128` → `126` and now reads *"the store's persistent depth ceiling is operative, and the value commits and reopens intact"*; `JC-TC-27`'s refusal moves depth `129` → `127` and now names the walk, the "before any store verb" position and the status `ValueRefusedAtBoundary`; `JC-TC-42`'s node boundary is stated at its two sides, `999,999` ADMITTED and `1,000,000` REFUSED as the same class and status.** **NO CELL IS ADDED AND NONE IS REMOVED: the set stays `JC-TC-01`…`JC-TC-48` (`48` cells), because the admitted node side the boundary requires is carried INSIDE `JC-TC-42`'s own cell and not as a forty-ninth id; `JC-TC-10`'s `65`/`66` admission is unmoved, those being admitted depth values under the operative `126`; and every class spelling, the status, the two message parts and every other expected answer stand as filed.** `[A2 docs/decisions.md · A149 | the re-derived boundary; A2 docs/specs/storeroom-json-crossing-live-report.md §5 · §6 — `LIVE-B54` · `LIVE-X1` · `LIVE-X2` | the measured boundary | numeric or census claim]`

**⟶ RECONCILED 2026-10-24 — THE DOCUMENTATION REVIEW (`role_documentation_reviewer`; `RCA-8(g)`): THIS PART'S MARKER DATES AND ITS CELL CENSUS ARE RECONCILED AGAINST THE LANDED SET, AND NO CELL, CLASS, STATUS OR EXPECTED ANSWER MOVES.** **Every clause and cell of this part — the `A149` clause above included — stands byte-for-byte and is read THROUGH this one; THIS clause adds no cell, removes none and re-decides no expectation.**

**(a) THE DATE — THE MARKERS STAND AND THE FILINGS ARE `2026-10-24`.** This part's `§4` gate-3 proofreading clause and its `§6` `A149` clause carry `2026-10-23` and record landings of **`2026-10-24`**, one day after the marker: the `A149` landing is the source edit `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` at mtime **`2026-10-24 19:09:06`** with the native addon built `19:09:49` and restaged `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`), and the proofreading insertions into this unit's documents measured **`17:23` on `2026-10-24`** (`… §10`). **No marker is rewritten — they are cited by `A149`, by the `N8` delta and by the review record — and this item is their resolution of record** (`docs/defects.md` · `DEF-2026-10-24-A`). **The gate-`4`/gate-`5` runs the cited clauses point at ran on `2026-10-23`, unmoved.**

**(b) THE CELL CENSUS, COUNTED RATHER THAN TRUSTED.** This part carries **`48`** cells — `§1` `11` (`JC-TC-01`…`JC-TC-11`) + `§2` `8` (`JC-TC-12`…`JC-TC-19`) + `§3` `16` (`JC-TC-20`…`JC-TC-35`) + `§4` `7` (`JC-TC-36`…`JC-TC-42`) + `§5` `6` (`JC-TC-43`…`JC-TC-48`) = **`48`** ✓ — and the landed red set matches one for one: `bindings/js/test/json-crossing.test.mjs` carries **`48`** `test()` cells, titled `JC-TC-01`…`JC-TC-48`. **The file is the census; no cell of either side is missing.**

**(c) THE THREE RE-DERIVED CELLS AGREE WITH THE BUILD, EACH AT ITS OWN BYTES.** `JC-TC-09`'s *"depth `126`"* is the landed set's own cell (`json-crossing.test.mjs`'s `JC-TC-09 depth 126 is admitted and commits and reopens intact`); `JC-TC-27`'s *"nested depth `127` … at the walk before any store verb, with `ValueRefusedAtBoundary`"* is its cell (`JC-TC-27 depth 127 is refused at the walk, before any store verb`); `JC-TC-42`'s two-sided node boundary is its cell (`JC-TC-42 the node boundary is stated at both sides`), against `NODE_CEILING = 1_000_000` at `bindings/js/index.mjs:1043` counted with the root. **`JC-TC-37`'s PART TWO is the normative spelling `parameter-semantics.md §2`/`§3` print, discharged at `§4`'s clause above; no cell of this part states the superseded `128` law.** `[A1 bindings/js/test/json-crossing.test.mjs, forty-eight cell titles counted at this pass's read, and bindings/js/index.mjs:1042 · :1043 | numeric or census claim; A2 docs/specs/storeroom-json-crossing-live-report.md §10 · §11 | the landing dates; docs/defects.md · `DEF-2026-10-24-A` | cross-reference]`
