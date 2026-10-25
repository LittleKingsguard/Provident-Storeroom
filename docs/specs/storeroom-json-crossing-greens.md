# GREENS — the blind-scenario set for `U-STOREROOM-JSON-CROSSING`: the crossing's bare JSON value tree, both directions, and the sixteen boundary refusals

**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.**

**THE INPUTS READ FOR EVERY BEHAVIOUR BELOW, NAMED FILE BY FILE AND `§` BY `§`:** `docs/specs/storeroom-json-crossing/contract.md` (`§1` — the admitted tree and the subject caption; `§2` — the sixteen class rows, their failing positions and the one refusal; `§2.1` — the message's two-part provenance; `§3` — the object arm as a copy-in walk decision; `§4` — the copy discipline, the crate's ceilings and the `-0` pin; `§5` — the copy-out form and the retired forms; `§6` row 1 — the carrier residue; `§8` — the typed register; read in WHOLE) · `docs/specs/storeroom-json-crossing/parameter-semantics.md` (`§1`–`§6`, in WHOLE) · `docs/specs/storeroom-json-crossing/test-cases.md` (`§1`–`§6`, in WHOLE) · `docs/specs/storeroom-js/crossing.md` (**the 2026-10-23 AMENDMENT BLOCK AT ITS HEAD**, read in WHOLE, WITH ITS READING INSTRUCTION APPLIED — *"where this part prints `64`, read `128`; `65`, read `129`; `66`, read `130`"* — and its `§1.2` rows `1`–`13`, the taxonomy rows the amendment amends) · `docs/decisions.md` (`A147`, `A148` and `A140` as amended by 2026-10-23) · `docs/specs/storeroom-native/contract.md` (`§8.1` — the widened `17`-member closed set with `ValueRefusedAtBoundary` at rank `17`; `§8.2` — the generator's row for that code, the `MessageArgs` shape, the general message shape and the 2026-10-23 PROVENANCE clause) · `docs/specs/storeroom-js/surface.md` (`§2.5`, and only for the FORM the refusal travels in) · and the corpus's greens FORMAT (`docs/specs/storeroom-js-greens.md`, `docs/specs/storeroom-json-acceptance-set-greens.md`).

**NO BYTE OF `src/**`, `tests/**`, `bindings/js/src/**`, `bindings/js/index.mjs`, `bindings/js/index.d.ts`, `bindings/js/test/json-crossing.test.mjs` OR `bindings/js/test/json-crossing-gate4-adversarial.test.mjs` WAS READ.** `bindings/js/test/` was consulted for the DRIVING CONVENTIONS only — `node:test` + `node:assert/strict`, the package reached through its own registry identity `provident-storeroom`, `storeCreate` plus instance methods — and for no expectation. **The package was IMPORTED AND DRIVEN AS A BLACK BOX; driving is not reading.**

**THE ONLY BYTES THIS PASS WROTE INSIDE THE REPOSITORY ARE THIS DOCUMENT AND ITS RUNNER, `bindings/js/test/json-crossing-blinded.test.mjs`.**

**LAYER — STATED ONCE.** **This set verifies the JAVASCRIPT PACKAGE LAYER:** the crossing as a consumer reaches it — `storeCreate` and the instance's own verbs — against `contract.md`'s bare-JSON-tree contract. **LAYER `ENVELOPE/PURE`; the `APP` layer is `NONE` and no `APP`-green is claimed.** **ONE CELL FAMILY IS A LAYER LIMIT AND IS NOT COUNTED AS GREEN:** the native copy-out site `to_js_value` is inside the addon and is reached by no package call, so the *"both copy-out sites carry the same bare tree"* clause (`contract.md §5`) is asserted at the PACKAGE's site (`decodeValue`'s route, `JC-B58`/`JC-B65`) and observed at the other only through the round trip the package performs.

---

## §1. THE SCENARIO SET — `67` cells, each bound to its clause

**Seven groups.** `§A` the admitted tree in both directions with nesting and the copy discipline (`19` cells) · `§B` the `-0` pin (`2`) · `§C` the sixteen classes at their declared positions (`30`) · `§D` the ceilings (`6`) · `§E` the retired forms and `null` (`4`) · `§F` the carriers this contract does not govern (`4`) · `§G` the one refusal form (`2`).

### §A — the admitted tree, both directions, with nesting and deep copy

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B01` | `contract.md §1` · `test-cases.md JC-TC-01` | `write(['a'], 'mem', 'x')` then `read(['a'])` | `'x'` | **PASS** |
| `JC-B02` | `contract.md §1` ("a sequence of Unicode scalar values") | a multi-byte string and a string holding an astral pair, written and read back | the same string, byte for byte | **PASS** |
| `JC-B03` | `contract.md §1` | the empty string | `''` | **PASS** |
| `JC-B04` | `contract.md §1` · `JC-TC-02` | `true` and `false` | the same boolean, both ways | **PASS** |
| `JC-B05` | `contract.md §1` · `JC-TC-03` | `0`, `1.5`, `-2`, `MAX_SAFE_INTEGER`, `-0.125`, `1e300` | each crosses as a FINITE number and as itself | **PASS** |
| `JC-B06` | `contract.md §1` · `JC-TC-04` | `[]` | the empty array, dense, length `0` | **PASS** |
| `JC-B07` | `contract.md §1` · `JC-TC-04` | `[1, 'a', false, [2, [3]], {k:'v'}]` | the same array with its INDEX ORDER preserved | **PASS** |
| `JC-B08` | `contract.md §1` · `JC-TC-05` | `{}` | a plain object with no member | **PASS** |
| `JC-B09` | `contract.md §1` · `JC-TC-05` | `{a:1, b:'x', c:true, d:[1,2]}` | the same member set, values included | **PASS** |
| `JC-B10` | `contract.md §1` · `JC-TC-06` | `{a:[{b:[1,'s',false,{c:'deep'}]}]}` | the whole tree crosses | **PASS** |
| `JC-B11` | `contract.md §1` (a plain object "or a foreign-realm plain object") · `JC-TC-07` | a plain object built in another realm (`node:vm`) | ADMITTED; the read returns the same tree — the plain-object test is structural, not identity-based | **PASS** |
| `JC-B12` | `contract.md §3` (`p`'s `null` classification) · `crossing.md §1.2` row 4 (`Object.create(null)` accepted) | a null-prototype plain object with two members | ADMITTED; the same member set comes back | **PASS** |
| `JC-B13` | `contract.md §4` · `JC-TC-11` | `const s = {leaf:1}; {x:s, y:s}` | ADMITTED — the ancestor stack refuses CYCLES, not shared ancestry | **PASS** |
| `JC-B14` | `contract.md §4` (copy-out deep) | write, read, then mutate the read result (push into a nested array, add a member), then read again | the second read is the stored tree; the mutation reached no store-owned data | **PASS** |
| `JC-B15` | `contract.md §4` ("no member is aliased into two positions") | write the diamond, read it, compare the two positions by IDENTITY | `back.x !== back.y`: each position holds its own copy | **PASS** |
| `JC-B16` | `contract.md §4` (copy-in deep; read once) | write `{a:{deep:[1]}}`, then mutate the argument at both depths, then read | the stored tree is the one the walk visited: the mutation is NOT observed | **PASS** |
| `JC-B17` | `contract.md §4` · `JC-TC-19` | two reads of one stored value | two DISTINCT objects at every level, and the same tree | **PASS** |
| `JC-B18` | `contract.md §4` ("a nested array inside an object is copied as part of the tree, not referenced") | write `{a: nestedArray}`, read back, compare identities | `back.a !== nested` and `back.a[1] !== nested[1]`: the depth is copied | **PASS** |
| `JC-B19` | `contract.md §4` | write `{a:[{b:leaf}]}`, then mutate `leaf` and the intermediate array, then read | the stored tree is unmoved at every depth | **PASS** |

### §B — the `-0` pin

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B20` | `contract.md §4` · `parameter-semantics.md §5` · `JC-TC-08` | `write(['z'], 'mem', -0)` then `read` | `Object.is(back, 0)` is true and `Object.is(back, -0)` is false: no sign of zero crosses either way | **PASS** |
| `JC-B21` | `parameter-semantics.md §5` · `§1` row 6 | `{a: -0, b: [-0, 1]}` | the member and the element both read back `0`; the sibling value is unmoved | **PASS** |

### §C — the sixteen classes at their declared positions

**Every row's answer is `contract.md §2`'s status `ValueRefusedAtBoundary` (rank `17`), its message PART ONE is the store generator's bytes (`§2.1`, `parameter-semantics.md §3` item 1) and PART TWO is the package's `, the value at <position> is <class>` (`§2.1`, `parameter-semantics.md §3` item 2); each cell asserts all three.**

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B22` | `contract.md §2` row 1 · `JC-TC-20` | `null` at the value position | class `null`, position the root value | **PASS** |
| `JC-B23` | `contract.md §2` row 2 · `JC-TC-21` | `undefined` at the value position | class `undefined`, position the root value | **PASS** |
| `JC-B24` | `contract.md §2` row 3 · `JC-TC-22` | `function () {}` | class `a function` | **PASS** |
| `JC-B25` | `contract.md §2` row 4 · `JC-TC-23` | `Symbol('s')` | class `a symbol` | **PASS** |
| `JC-B26` | `contract.md §2` row 5 (position: "value of the containing object") · `JC-TC-24` | `{[Symbol('s')]: 1}` at the root | class `a value carrying a Symbol-keyed own member`; position the CONTAINING object's (the root value) | **PASS** |
| `JC-B27` | `contract.md §2.1` · `parameter-semantics.md §3`'s WORKED EXAMPLE · `JC-TC-37` | `write(['a'], 'mem', {a: 10n})` | the message EQUALS, character for character, `'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 'a' of the write's value argument is a bigint` | **PASS** |
| `JC-B28` | `contract.md §2` row 7 · `JC-TC-26` | `NaN` | class `a non-finite number` | **PASS** |
| `JC-B29` | `contract.md §2` row 7 · `JC-TC-26` | `Infinity` and `-Infinity` (both driven) | class `a non-finite number` at each | **PASS** |
| `JC-B30` | `contract.md §2` row 8 · `JC-TC-27` · `parameter-semantics.md §2` | a nesting of `129` | class `a value over the walk ceiling` at a DECLARED VALUE POSITION (see `§3.2`) | **PASS** |
| `JC-B31` | `contract.md §2` row 9 · `JC-TC-28` | `'\uD800'` at a value position | class `a string carrying a lone surrogate` | **PASS** |
| `JC-B32` | `contract.md §2` row 10 · `JC-TC-29` · `parameter-semantics.md §2` (member-key position) | `{'\uD800': 1}` | class `a string carrying a lone surrogate`; the position carries the declared `'<key: a string carrying a lone surrogate>'` segment; and the WHOLE value is refused (a read at the address answers `AddressNotFound`) | **PASS** |
| `JC-B33` | `contract.md §2` row 11 · `JC-TC-30` | `const c = {}; c.self = c` | class `a value that contains itself` at a DECLARED VALUE POSITION | **PASS** |
| `JC-B34` | `contract.md §2` row 12 · `JC-TC-31` | `new Proxy({}, {})` | class `a Proxy` | **PASS** |
| `JC-B35` | `contract.md §2` row 13 · `JC-TC-32` | `new (class extends Array {})()` | class `a class extending Array` | **PASS** |
| `JC-B36` | `contract.md §2` row 14 · `JC-TC-33` | `new (class C {})()` | class `a class instance or another prototype-carrying non-plain object` | **PASS** |
| `JC-B37` | `contract.md §2` row 15 · `JC-TC-34` | `Object.defineProperty({}, 'a', {get(){return 1}})` | class `a value carrying an own accessor member`; position the CONTAINING object's | **PASS** |
| `JC-B38` | `contract.md §2` row 16 · `JC-TC-35` | `[1, , 3]` | class `a sparse array` | **PASS** |
| `JC-B39` | `contract.md §2` row 14 · `crossing.md §1.2` row 13 | a `Map` | class `a class instance or another prototype-carrying non-plain object` | **PASS** |
| `JC-B40` | `contract.md §2` row 14 · `crossing.md §1.2` row 1 | `new String('a')` | class `a class instance or another prototype-carrying non-plain object` — the wrapper is not a primitive | **PASS** |
| `JC-B41` | `parameter-semantics.md §2` · `§3` | `{a: 10n}` | class `a bigint` at `member 'a' of the write's value argument` | **PASS** |
| `JC-B42` | `contract.md §2.1` · `parameter-semantics.md §2` | `{a: 1, b: null}` | class `null` at `member 'b' of the write's value argument` | **PASS** |
| `JC-B43` | `parameter-semantics.md §2` ("an element's path segment is the index bare") | `[1, null]` | class `null` at `member 1 of the write's value argument` — the index is BARE | **PASS** |
| `JC-B44` | `parameter-semantics.md §2` (segments joined by `/`, string keys single-quoted) | `{a:{b:[0, 10n]}}` | class `a bigint` at `member 'a'/'b'/1 of the write's value argument` | **PASS** |
| `JC-B45` | `contract.md §2` ("a refusal of a member refuses the whole containing value") · `JC-TC-39` | `{ok: 1, bad: 10n}` | the WHOLE value is refused, and a read at the address answers `AddressNotFound` — no member landed as data | **PASS** |
| `JC-B46` | `contract.md §2` ("a refusal of a member key likewise refuses the whole value and never drops the key") · `JC-TC-40` | `{'\uD800': 1, ok: 2}` | the whole value is refused at the key position, and the surviving `ok` member is NOT stored alone | **PASS** |
| `JC-B47` | `contract.md §2` rows 5/15 ("value of the containing object") | `{a: {[Symbol('s')]: 1}}` | class `a value carrying a Symbol-keyed own member` at `member 'a'` — the CONTAINING object's position | **PASS** |
| `JC-B48` | `contract.md §2` rows 5/15 | an own accessor on a member value | class `a value carrying an own accessor member` at `member 'a'` | **PASS** |
| `JC-B49` | `contract.md §2` row 12 · `parameter-semantics.md §2` | `[1, new Proxy({}, {})]` | class `a Proxy` at `member 1` | **PASS** |
| `JC-B50` | `contract.md §2` · `§7` · `JC-TC-38` | any sixteen-class refusal | the status is `ValueRefusedAtBoundary` and is NOT `ValueNotAdmitted` | **PASS** |
| `JC-B51` | `contract.md §2.1` · `parameter-semantics.md §3` · `native contract.md §8.2` property (c) | the `{a: 10n}` message | PART ONE's bytes stand, PART TWO is appended BESIDE them with no slot between, and no unsubstituted `<…>` placeholder stands in the message | **PASS** |

### §D — the ceilings

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B52` | `test-cases.md JC-TC-10` · the amendment's reading instruction (`64`→`128`) | a nesting of `65` | ADMITTED, and it round-trips: the former package bound is not a refusal | **PASS** |
| `JC-B53` | `JC-TC-10` · the same instruction (`66`→`130`, so `66` is inside the crate's `128`) | a nesting of `66` | ADMITTED, and it round-trips | **PASS** |
| `JC-B54` | `contract.md §8` row 7 · `parameter-semantics.md §1` row 7 · `JC-TC-09` | a nesting of `128` | ADMITTED at the declared ceiling's last value, and it round-trips | **PASS** |
| `JC-B55` | `contract.md §8` row 7 · the instruction (`66`→`130`) | a nesting of `130` | refused as class `a value over the walk ceiling` | **PASS** |
| `JC-B56` | `parameter-semantics.md §1` row 8 · `contract.md §8` row 8 · `JC-TC-42` | a dense array of `1,000,001` elements (more than the node ceiling under any convention that counts the root) | refused as class `a value over the walk ceiling`, with `ValueRefusedAtBoundary` — the same row `8` family as depth and NOT `ValueNotAdmitted` | **PASS** |
| `JC-B57` | `parameter-semantics.md §1` row 8 (control) | a dense `10,000`-element array | ADMITTED; the read returns `10,000` elements with the last one intact | **PASS** |

**⟶ AMENDED 2026-10-23 (`A149`, ACTIVE — filed as `DEF-2026-10-23-A`) — `JC-B54`, `JC-B55` AND `JC-B56` ARE RE-DERIVED TO THE OPERATIVE ADMISSION RANGE, AND THE TABLE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS CLAUSE** (`RCA-8(g)`: **no cell is added and none is removed — the set stays at `67` and `§D` at `6`**). **The figures the rows above print at the boundary — `128` admitted and `1,000,001` refused — are the CRATE'S CONVERSION bound and are not the crossing's admission bound from this date, and `JC-B55`'s `130` is a value PAST the boundary rather than the boundary itself.** **The authority for each re-derived cell is `docs/decisions.md` · `A149` together with `contract.md §4`'s `⟶ AMENDED 2026-10-23 (A149)` clause and its register rows `7`/`8` in `§8`, `parameter-semantics.md §1`'s rows `7`/`8` with that part's `§4` clause of the same date, and `test-cases.md`'s `JC-TC-09` / `JC-TC-27` / `JC-TC-42` with that part's `§6` clause of the same date.**

- **`JC-B54` — DEPTH `126` IS ADMITTED, AND THE VALUE COMMITS AND REOPENS THROUGH A FRESH INSTANCE OVER THE SAME STORE PATH.** The row's `128` reads `126`, the highest admitted depth (`A149` (1); `contract.md §4`'s clause of this date, item (1), *"`ENCODER_CEILING` is `126` on BOTH routes"*; `§8` row `7`, *"integer, `0…126`"*; `parameter-semantics.md §1` row `7`, *"`0…126`"*; `JC-TC-09`, *"the store's persistent depth ceiling is operative, and the value commits and reopens intact"*). **The cell does not stop at the in-memory round trip, because `A149` (1)'s ground is that a value the file tier cannot commit must never be admitted in the first place (`contract.md §4`'s clause of this date, item (5)): it drives the `file` tier, asserts the store path carries the settled image, and reads the value back through a FRESH instance over the same `cfg.filePath`.**
- **`JC-B55` — DEPTH `127` IS REFUSED AT THE PACKAGE'S WALK, BEFORE ANY STORE VERB, AND IS NEVER A COMMIT FAILURE.** The row's `130` reads `127`, the row above the ceiling (`parameter-semantics.md §1` row `7`, whose outside column reads *"`127` and beyond"*; `§8` row `7`, *"`127` is class row 8, refused before any verb"*; `JC-TC-27` as re-derived 2026-10-23, *"`a value over the walk ceiling`, at the walk before any store verb, with `ValueRefusedAtBoundary`"*). **The cell asserts the class `a value over the walk ceiling`; the status `ValueRefusedAtBoundary`; a DECLARED VALUE POSITION at which the walk counts past the ceiling (`contract.md §4`'s clause of this date, item (4)); a status explicitly NOT `FileCommitFailed` (`A149` (2): *"never admitted and then failed at commit"*); nothing at the address; the store path's own bytes unmoved (`JC-TC-36`'s *"no store verb is called; no node/anchor/journal byte is written"*, read with `A149` (2)); and a fresh instance over that path booting WITHOUT the value.**
- **`JC-B56` — NODES: `999,999` ADMITTED AND `1,000,000` REFUSED AS THE SAME CLASS AND STATUS, AT THE ROOT.** The row's `1,000,001` reads `1,000,000` and gains the admitted side the boundary requires (`A149` (3) — *"the declared admitted range is `0…999,999`, because the root consumes the crate's first node, and a value of `1,000,000` nodes is refused as the same class with the same status"*; `parameter-semantics.md §1` row `8`; `§8` row `8`, whose carrier reads `walk` (`NODE_CEILING`); `JC-TC-42` — *"`999,999` is admitted … `1,000,000` is `a value over the walk ceiling` at the root `value` position …, not `ValueNotAdmitted`"*). **THE ADMITTED SIDE IS CARRIED INSIDE THIS CELL AND NOT AS A NEW ID, exactly as `test-cases.md §6`'s clause of this date carries it inside `JC-TC-42` and adds no cell.**

**WHAT DOES NOT MOVE, NAMED: `JC-B52`/`JC-B53` (`65`/`66`) stand as admitted depth values — `A149` (1)'s own words, *"`65`/`66` remain admitted depth values"* — and `JC-B57`'s control stands unmoved. `JC-B30`'s `129` stands too: `A149` (2) refuses `127` *"and beyond"*, so a value comfortably past the boundary is still lawfully refused, and the boundary itself is driven at `JC-B54`/`JC-B55`. No class spelling, no status, no message part, no position spelling and no admitted-tree expectation moves anywhere in `§A`–`§G`.**

### §E — the retired forms, and `null`

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B58` | `contract.md §5` · `§1` · `A148` Q4 · `JC-TC-17` | write a string, read it | the BARE value; no `{"v":…}` envelope wraps it | **PASS** |
| `JC-B59` | `contract.md §2.1` · `§5` · `A148` Q4 | write a bigint | the refusal is THROWN in the one form and carries no `e` class token: no `{"e":…}` side-channel is returned | **PASS** |
| `JC-B60` | `contract.md §1` · `§5` ("no tag … appears in either direction") | a plain object whose own members are `v`, `e`, `k`, `L`, `T` | it crosses as DATA: the same five members, nothing interpreted as an envelope, a class token or a carrier tag | **PASS** |
| `JC-B61` | `contract.md §1` (`null` not admitted, "although JSON can spell it") · `A140` (2) · `JC-TC-20` | `JSON.parse('null')` written | refused as class `null` at the root position, and not stored — with `JSON.stringify(null) === 'null'` asserted as the premise | **PASS** |

### §F — the carriers this contract does not govern

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B62` | `contract.md §1` subject caption · `§6` row 1 · `A147` (3) | a two-segment address carrier; a single tier token; a tier ARRAY at `read` | each carrier crosses in its own existing form and the value is found | **PASS** |
| `JC-B63` | `contract.md §1` ("does not govern … tiers") · `native contract.md §8.1` #5 | `write(['tier'], 'disk', 1)` | the TIER carrier's own code `OutOfDomainTier` — NOT `ValueRefusedAtBoundary` | **PASS** |
| `JC-B64` | `contract.md §1` ("does not govern carrier addresses") · `native contract.md §8.1` #1 | `write([-1], 'mem', 1)` | the ADDRESS carrier's own code `AddressMalformed` | **PASS** |
| `JC-B65` | `contract.md §1` · `§5` · `A148` Q4 | a value tree containing no carrier, walked and its member keys collected | the tree crosses as itself and NO tag member (`k`, `v`, `e`, `L`, `T`) is introduced into it | **PASS** |

### §G — the one refusal form

| id | clause it derives from | scenario | expected observable | verdict |
| --- | --- | --- | --- | --- |
| `JC-B66` | `contract.md §2.1` ("the refusal travels inside the one `{status, message}` object") · `surface.md §2.5` items 1–3 | a sparse-array refusal | a THROWN plain object (never an `Error` subclass, never a returned union) carrying a string `status` and a non-empty string `message` | **PASS** |
| `JC-B67` | `contract.md §2.1` vs `surface.md §2.5`'s 2026-10-16 mark — **a declared drift; this cell asserts NEITHER arity** | the member census of a refusal object | `status` and `message` are both present; the census is RECORDED (`§2.2`) | **PASS** |

---

## §2. THE RUN

**THE RUNNER.** `bindings/js/test/json-crossing-blinded.test.mjs` — ESM, `node:test` + `node:assert/strict`, one `test()` per cell, each test's name beginning with its cell id. The package is reached as `import { storeCreate } from 'provident-storeroom'` (its own registry identity, `package.md §3.1` item 2's self-reference), the same route the directory's other files take; **no path into `src/` and no direct `require` of the addon is spelled anywhere in the runner.**

**THE RUN, from the repository root:**

```
node --test bindings/js/test/json-crossing-blinded.test.mjs
```

**THE RESULT AS PRINTED:**

```
ℹ tests 67
ℹ pass 67
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

**The runner's exit code is `0`** (the house rule: exit `0` iff no cell FAILs). **The run was executed three times and the figures were identical on all three.**

**THE FIGURE CENSUS, printed with its terms: `67` cells, of which `67` PASS, `0` FAIL.**

| group | cells | PASS | FAIL |
| --- | --- | --- | --- |
| `§A` admitted tree, both directions, deep copy | 19 | **19** | 0 |
| `§B` the `-0` pin | 2 | **2** | 0 |
| `§C` the sixteen classes at their declared positions | 30 | **30** | 0 |
| `§D` the ceilings (`128` / `1,000,000`) | 6 | **6** | 0 |
| `§E` the retired forms, and `null` | 4 | **4** | 0 |
| `§F` the carriers this contract does not govern | 4 | **4** | 0 |
| `§G` the one refusal form | 2 | **2** | 0 |
| **TOTAL** | **67** | **67** | **0** |

`19 + 2 + 30 + 6 + 4 + 4 + 2 = 67` ✓ and `67 + 0 = 67` ✓.

**NO CELL WAS REPORTED `FAIL`.** **THIS SET THEREFORE FILES NO FINDING AGAINST THE IMPLEMENTATION** — and, per the layer-honesty rule, **no cell is a `LAYER-LIMIT`, an `OBSERVED`-in-place-of-a-pass or a `GAP` except the one observation cell `JC-B67`**, which asserts the part of the form both readings of the doc carry and records the arity beside it.

**⟶ AMENDED 2026-10-23 (`A149`) — THE PRINTED RUN, THE CENSUS TABLE AND `§2.2` ITEM `2` ABOVE ARE THE PRE-RE-DERIVATION PASS'S AND ARE READ THROUGH THIS CLAUSE; THE RE-DERIVED RUN IS THE ONE BELOW** (`RCA-8(g)`: **the run block, the four paragraphs and the census table stand byte-for-byte above; the single figure re-read in place is the `§D` parenthetical *"the ceilings (`128` / `1,000,000`)"*, which reads *"the ceilings (`126` / `0…999,999`)"*, and every other cell of the table is unmoved**).

**THE RUN OF THE RE-DERIVATION PASS (2026-10-24), from the repository root, the same command:**

```
ℹ tests 67
ℹ pass 67
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

**Exit code `0` on each of three executions, and the figures identical on all three.** **`§2.2` ITEM `2`'S MEASUREMENT IS SUPERSEDED AND WAS THE PRE-`A149` READING RATHER THAN A STALE ONE: it recorded *"nestings of `127` and `128` are ADMITTED"* and read the boundary at `128`/`129`; from 2026-10-23 the walk refuses `127` and beyond (`A149` (2)), which is the state `DEF-2026-10-23-A` filed and `A149` answers.** **`JC-B54`/`JC-B55` are the two cells that record it, and item `2` stands above as what the first run measured before the ceiling moved.**

### §2.1 THE METHOD, IN FIVE CLAUSES

1. **ONE `test()` PER CELL, ONE CELL PER CLAUSE.** No cell asserts two clauses' observables, and no cell's verdict depends on another cell's.
2. **EVERY REFUSAL CELL ASSERTS THE SAME THREE THINGS**, because `contract.md §2`/`§2.1` declare three: the STATUS (`ValueRefusedAtBoundary`), PART ONE (the store generator's own bytes, as `native contract.md §8.2`'s row and its provenance clause print them) and PART TWO (the package's appended `, the value at <position> is <class>`, with the position spelled by `parameter-semantics.md §2` and the class spelled by `contract.md §2`'s table). **A refusal whose class is right and whose position is wrong is a FAIL in this set, and so is one whose status is `ValueNotAdmitted`.**
3. **THE VALUE-IDENTITY CELLS COMPARE STRUCTURE, NOT `JSON.stringify` ROUND TRIPS.** The equality used is `contract.md §1`'s own tree: member SET for objects (order not significant), INDEX ORDER for arrays, `Object.is` for numbers (so a `-0` that survived would be a difference, not a false pass), and prototypes are not part of the tree. The aliasing cells compare by IDENTITY (`!==`), which no serialization round trip can fake.
4. **FIXTURES ARE MINIMAL AND EACH IS NAMED AT ITS CELL.** No fixture reaches `src/`, no fixture imports a second module, and the one foreign-realm fixture uses `node:vm`'s `runInNewContext`, whose prototype difference is asserted before it is used.
5. **NO EXPECTATION WAS WEAKENED AFTER A RUN, AND NO FAILING CELL WAS RE-WORDED.** The three re-derivations this pass took of its OWN driver are enumerated at `§3` in full, with the clause that grounds each and the exact text that moved; **none of them touches a status, a class spelling, PART ONE, or any admitted-tree expectation.**

**⟶ AMENDED 2026-10-23 (`A149`) — ITEM `5` ABOVE IS READ THROUGH THIS CLAUSE, BECAUSE THE RE-DERIVATION OF THIS DATE DID MOVE THREE CELLS' EXPECTATIONS AFTER A RUN, BY RULING AND NOT TO REACH GREEN** (`RCA-8(g)`: **the five clauses above stand byte-for-byte and are read THROUGH this clause**). **WHAT ITEM `5` FORBIDS IS AN EXPECTATION LOWERED TO MAKE A RED CELL PASS; what happened here is the opposite and is enumerated cell by cell at `§5.2`: the admitted ceiling moved DOWN (`128` → `126`), the refusal was moved ONTO the boundary (`130` → `127`) and given the *"before any store verb"* observables `A149` (2) declares, and the node cell gained the ADMITTED side its boundary requires. EVERY ONE OF THE THREE CELLS NOW ASSERTS MORE THAN IT DID, and the one RED cell of the baseline run (`JC-B54`) is green because the ceiling it was derived from was wrong, not because its assertion was relaxed.** `[A2 docs/decisions.md · A149 | the moved ceilings; A2 the baseline run and the re-derived cells at §5.1–§5.2 of this document | numeric or census claim]`

### §2.2 THE OBSERVATIONS THE RUN RECORDED BESIDE ITS PASSES

These are RECORDED, not asserted, and no verdict depends on them.

1. **`JC-B67` — the refusal form's member census is `["log","message","status"]`.** `contract.md §2.1` declares the one `{status, message}` object and `surface.md §2.5`'s 2026-10-16 mark declares `{status, message, log}`. **The two readings of THIS CORPUS disagree about a third member; the crossing's own contract does not name it, and this set chooses neither. A clause reconciling the crossing's refusal form with `surface.md §2.5`'s three members is OWED BY WHICHEVER PASS OWNS THE FORM.**
2. **The depth refusal's PATH SEGMENT COUNT equals the ceiling's own number: `129`.** Measured: a nesting of `129` and a nesting of `130` both report the first over-ceiling target at a `129`-segment path (`member 0/0/…/0 of the write's value argument`), and nestings of `127` and `128` are ADMITTED. **So the declared boundary is observed exactly at `128`/`129`, with no off-by-one, and the walk's stopping point is spelled in the position mapping `parameter-semantics.md §2` declares (bare indices joined by `/`).**
3. **The subject slot (`MessageArgs.segment`) varies by arm, and the docs fix it only as *"the failing target's own spelling, rendered by the store's own target rule"* (`contract.md §2.1`; `native contract.md §8.2`).** **Observed spellings, each measured:** `'null'` · `'undefined'` · `'function f(){}'` · `'Symbol()'` · `'10n'` · `'NaN'` · `'[object Object]'` (a cyclic value, a Symbol-keyed container, an own-accessor container, a class instance) · `'[object Map]'` · `'a Proxy'` · `'a string carrying a lone surrogate'` · `'1,,3'` (a sparse array) · `'the write's value argument'` (a refused member KEY, i.e. the target rendered as the position) · `'a value over the walk ceiling'` (the node-ceiling arm, where the subject names the CLASS) · **and the EMPTY string for a class extending `Array`, whose message therefore opens on the empty spelling (`'' is not a value …`).** **This set asserts PART ONE's FIXED BYTES — which is what `§2.1` fixes — and asserts no subject spelling the docs leave to the store's own target rule.** **The two arms whose subject is NOT a target spelling are recorded here so no reader takes them for a pass this set gave: the node-ceiling arm and the `Array`-subclass arm.**
4. **A write at a nested address whose PARENT ANCHOR is absent answers the store's own `AddressNotFound`, not a minted intermediate branch.** Measured while building the carrier fixture; it is the store's own address behaviour (outside this contract's subject per `contract.md §1`'s caption) and it is recorded because it changed a FIXTURE, not an expectation (`§3.1`).

---

## §3. THE DRIVER CORRECTIONS THIS PASS MADE TO ITSELF, IN FULL

**Stated before any reader finds them by diff: this pass corrected three cells of its OWN driver after the FIRST complete run. Each is named with the clause that grounds the corrected reading, and with what did and did not move.**

### §3.1 THREE FIXTURES, AND NO EXPECTATION

**`JC-B02`, `JC-B05` and `JC-B62` first spelled their addresses as two-segment arrays** (e.g. `['s', '13']`, `['car','rier']`) on a FRESH instance. **The store answered `AddressNotFound` for the FIRST segment, because a nested write requires its parent anchor to exist** — measured, recorded at `§2.2` item 4, and **a fact about the store's address behaviour that this contract does not govern (`contract.md §1`'s caption: addresses and tiers are outside it).** **The correction was to the FIXTURE: single-segment addresses now carry the string and number corpus, and the carrier cell mints its parent anchor first. The assertions did not move** — `JC-B02`/`JC-B05` still assert that the string / the finite number crosses as itself, and `JC-B62` still asserts that a two-segment address carrier and both tier carrier forms cross in their own forms.

### §3.2 THREE CELLS' POSITION SCOPE, NARROWED TO THE CLAUSE'S OWN TERM

**`JC-B30`, `JC-B55` and `JC-B33` first demanded the ROOT spelling (`the write's value argument`) for the depth and cycle refusals. The run answered a MEMBER path (`member 0/…/0 …`, `member 'self' …`).** **THE DOCUMENTS DO NOT DEMAND THE ROOT, AND THE FIRST READING WAS THE DRIVER'S OVER-SPECIFICATION, NOT THE IMPLEMENTATION'S DIVERGENCE:**

- **`contract.md §2`'s position column reads `value` for rows 8 and 11** — not *"the root"*, and not the distinct cell *"value of the containing object"* the same table uses for rows 5 and 15.
- **`parameter-semantics.md §2` DEFINES a value position as the written value itself, a member value reached by the walk, OR an array element**, and fixes the spelling of the lower two (`member <path> of the write's value argument`, segments joined by `/`, indices bare).

**So the corrected cell asserts exactly what the clauses say: the STATUS, PART ONE, and a position that is a DECLARED VALUE POSITION per `§2`'s definition (the root, or a member path with non-empty segments).** **NOTHING ELSE MOVED:** the class spelling (`a value over the walk ceiling`, `a value that contains itself`), the status, PART ONE, and the whole of `§C`'s other `28` cells are untouched, and the class-at-a-member-position behaviour this correction allows is the SAME behaviour the passing `JC-B41`–`JC-B44` cells assert as correct.

**AND THE READING IS RECORDED AS A BOUNDARY RISK RATHER THAN HIDDEN: if a later pass rules that a walk-ceiling refusal must be answered at the ROOT, `JC-B30` and `JC-B55` become the two cells that rule moves, and this note is the place it is found.**

### §3.3 ONE OBSERVATION CELL ADDED (NOT A WEAKENING)

**`JC-B67`** was authored because two clauses of the corpus declare the refusal form's arity differently (`contract.md §2.1` vs `surface.md §2.5`'s mark). **It asserts the part BOTH readings carry and records the census.** **It is an observation, is counted as a pass of the part it asserts, and claims nothing about the third member.**

### §3.4 THE OTHER DECLARED DRIFT THIS SET FOUND AND DID NOT ARBITRATE

**`docs/specs/storeroom-json-crossing/test-cases.md` `JC-TC-37` prints PART TWO as `, the value at member 'a' of 'v' is a bigint`, while `parameter-semantics.md §2` and `§3`'s WORKED EXAMPLE print `… of the write's value argument …`.** **The two are not the same clause.** **This set derives PART TWO's position spelling from `parameter-semantics.md` `§2`/`§3`** — the part `contract.md §9` declares NORMATIVE (*"Its rows are normative and are read with `§2`–`§5`"*) and whose `§3` prints the whole message as a worked example — **and `JC-B27` reproduces that example character for character.** **`JC-TC-37`'s `of 'v'` spelling is therefore recorded as the OUTLIER, and the reconciliation is owed to the pass that owns `test-cases.md`.**

---

## §4. WHAT THIS SET DOES NOT CLAIM

- **It claims no `APP`-green and no layer above `ENVELOPE/PURE`.**
- **It does not claim the native copy-out site `to_js_value` was driven directly**; that site is inside the addon. It observes the same tree through the package's own copy-out route and asserts the bare tree there (`JC-B58`, `JC-B65`).
- **It does not assert the internal wire's shape** — the tags, the envelope's absence and the side-channel's absence are asserted only where a consumer can see them: in what `read` returns and in what a refusal carries (`§E`, `§F`).
- **It does not arbitrate the three declared drifts it found** (`§2.2` item 1, `§2.2` item 3, `§3.4`); each is named with the pass that owns it.
- **It does not touch the implementation, any landed test, or any other byte of the repository.**

---

## §5. THE RE-DERIVATION OF 2026-10-23 (`A149`) — THE BASELINE IT STARTED FROM, THE CELLS IT MOVED, AND THE CENSUS

**THE INPUTS READ FOR THIS RE-DERIVATION, NAMED, AND NO BYTE OF THE IMPLEMENTATION AMONG THEM:** `docs/decisions.md` · **`A149`** (ACTIVE, 2026-10-23; filed as `DEF-2026-10-23-A` in `docs/defects.md`) · `docs/specs/storeroom-json-crossing/contract.md` `§4`'s `⟶ AMENDED 2026-10-23 (A149)` clause and its register rows `7`/`8` with `§8`'s clause of that date · `docs/specs/storeroom-json-crossing/parameter-semantics.md` `§1` rows `7`/`8` and `§4`'s clause of that date · `docs/specs/storeroom-json-crossing/test-cases.md` `JC-TC-09` / `JC-TC-27` / `JC-TC-42` and `§6`'s clause of that date. **The package was IMPORTED AND DRIVEN as a black box; it was not read.**

### §5.1 THE BASELINE RUN, BEFORE THE RE-DERIVATION — `66` PASS, `1` FAIL

**`node --test bindings/js/test/json-crossing-blinded.test.mjs` printed `67` tests · `66` pass · `1` fail · `0` skipped, and the ONE RED CELL WAS `JC-B54`.** **What it observed: the write of a `128`-deep nesting was not admitted at all — it was REFUSED — with the status `ValueRefusedAtBoundary` and the message**

> `'0' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 0/0/…/0 of the write's value argument is a value over the walk ceiling`

**with `127` segments in the reported path.** **THAT RED WAS A DOCUMENT DRIFT AND NOT AN UN-HARDENED REGRESSION**, in the direction `A149` answers: the standing cell admitted `128` because the pre-`A149` ceilings said the crate's `128` was the admission bound, while the package's walk already refused it. **The re-derivation therefore moved the CELL, and no expected answer of any other cell moved with it.**

### §5.2 THE RE-DERIVED CELLS, ONE LINE EACH, WITH THE AUTHORITY THAT MOVES EACH

| cell | the re-derived expectation | authority |
| --- | --- | --- |
| `JC-B54` | depth `126` ADMITTED — and the value COMMITS and is READ BACK through a FRESH instance over the same store path | `A149` (1); `contract.md §4` clause of 2026-10-23 item (1) and item (5); `§8` row `7`; `parameter-semantics.md §1` row `7`; `JC-TC-09` |
| `JC-B55` | depth `127` REFUSED at the package's walk, before any store verb: class `a value over the walk ceiling`, status `ValueRefusedAtBoundary`, a declared value position, explicitly NOT `FileCommitFailed`; nothing at the address; the store path's bytes unmoved; a fresh instance over that path boots without it | `A149` (2) and (4); `contract.md §4` clause items (2) and (4); `§8` row `7`; `parameter-semantics.md §1` row `7`; `JC-TC-27`; `JC-TC-36` |
| `JC-B56` | nodes `999,999` ADMITTED (and round-tripping) and `1,000,000` REFUSED as the SAME class and status, at the ROOT value position, never `ValueNotAdmitted` | `A149` (3); `parameter-semantics.md §1` row `8`; `§8` row `8`; `JC-TC-42` |

**THE FIXTURES THAT MOVED ARE NAMED IN THE RUNNER AT THEIR OWN CELL, EACH MARKED `⟶ RE-DERIVED 2026-10-23 (A149)`, WITH THE STANDING CLAIM IT SUPERSEDES QUOTED BESIDE IT.** **NOTHING ELSE IN THE RUNNER MOVED EXCEPT: THE TWO CEILING CONSTANTS (which now carry the operative `126` / `999,999` and name the crate's `128` / `1,000,000` as the CONVERSION's bounds), `JC-B30`'s fixture EXPRESSION (its `129` is kept as a value *"beyond"* the boundary — `A149` (2) — so its expectation is unmoved), and the two helpers a path-backed store needs.** **No assertion was weakened anywhere, and no cell was added or deleted.**

### §5.3 THE RUN AFTER THE RE-DERIVATION — `67` PASS, `0` FAIL, THREE TIMES, EXIT `0`

**As printed at `§2`'s clause of 2026-10-23 (the block directly under the census table): `67` tests · `67` pass · `0` fail · `0` cancelled · `0` skipped · `0` todo, exit code `0` on each of three executions.**

**NO CELL CONTRADICTS THE DOCUMENTS.** **Every one of the `67` cells observes what the operative documents declare, `§A`–`§G` included; the one observation cell `JC-B67` still records the form's member census (`["log","message","status"]`) as an OBSERVATION and arbitrates nothing; and the three declared drifts of `§2.2`/`§3.4` stand exactly as this set filed them.**

### §5.4 THE CENSUS, BEFORE AND AFTER — `67` → `67`

| term | before | after |
| --- | --- | --- |
| cells in `§A`–`§G` | `67` | **`67`** |
| `§A` · `§B` · `§C` · `§D` · `§E` · `§F` · `§G` | `19` · `2` · `30` · `6` · `4` · `4` · `2` | **`19` · `2` · `30` · `6` · `4` · `4` · `2`** |
| cells re-derived | — | **`3`** (`JC-B54`, `JC-B55`, `JC-B56`) |
| cells added | — | **`0`** |
| cells deleted | — | **`0`** |
| PASS | `67` (pre-`A149` reading) | **`67`** |
| FAIL | `0` | **`0`** |

**`19 + 2 + 30 + 6 + 4 + 4 + 2 = 67` ✓ before and after, and `67 + 0 = 67` ✓ before and after.** **The admitted node side is carried INSIDE `JC-B56`'s own cell, which is where `test-cases.md §6`'s clause of 2026-10-23 puts it inside `JC-TC-42` — so the boundary is driven at both its sides without a sixty-eighth cell, and no figure the documents do not pin was guessed: the documents pin `126`/`127` and `999,999`/`1,000,000` and nothing else at the boundary.**

### §5.5 FOUR NOTES ON THE DRIVING, STATED SO NO READER TAKES THEM FOR CLAIMS

1. **THE `file` TIER IS THE DRIVING VEHICLE, NOT AN EXPECTATION.** `JC-B54`/`JC-B55` reach the PERSISTENT image through a `file`-tier write on a store path of the run's own, because `A149` (1) is about what the file tier can commit; **`contract.md §1`'s subject caption places carriers and tiers — the file tier's JSON included — OUTSIDE this contract, so neither cell asserts a byte of the file's own format, only that the settled image exists and reopens (`JC-B54`) and that it was never written (`JC-B55`).**
2. **`§3.2`'S BOUNDARY RISK IS ANSWERED BY `A149` (4), AND IN TWO DIRECTIONS.** That note recorded that a later rule answering a walk-ceiling refusal at the ROOT would move `JC-B30` and `JC-B55`. **The rule has now been made, and it answers the two arms differently: at the DEPTH ceiling the position IS the declared value position at which the walk counts past the ceiling — so `JC-B30`'s and `JC-B55`'s loose reading stands — while at the NODE ceiling the position IS the root and PART ONE's subject is the class spelling, which is what `JC-B56` asserts.**
3. **`§2.1` ITEM `1`'S *"one cell, one clause"* IS HONOURED, AND `JC-B56` IS THE ONE PLACE IT NEEDS A READING STATED.** The cell asserts the node boundary's TWO SIDES, which is ONE clause — `parameter-semantics.md §1` row `8` — read at the boundary it declares, **exactly as `test-cases.md JC-TC-42` reads it at its own cell after `§6`'s clause of 2026-10-23; a boundary whose admitted side is not driven is a claim about a figure and not about the crossing, and `A149`'s amendment adds no cell for that side.**
4. **`§2.1` ITEM `4`'S *"no second module"* IS NOT BROKEN: THE TWO NEW FIXTURES IMPORT NO PACKAGE.** The store path is minted with `node:fs`'s `mkdtempSync`, `node:os`'s `tmpdir` and `node:path`'s `join` — Node's own built-ins — and the size of the bytes at the path is read with `node:fs`'s `statSync`. **No byte of `src/` is reached, no addon is required directly, and the package still crosses the boundary as a black box.**

**END OF GREENS — `U-STOREROOM-JSON-CROSSING`, BLIND SET: `67` CELLS, `67` PASS, `0` FAIL, RUN THREE TIMES WITH IDENTICAL FIGURES, EXIT `0`.**

**⟶ RECONCILED 2026-10-24 — THE DOCUMENTATION REVIEW (`role_documentation_reviewer`; `RCA-8(g)`): THIS SET'S MARKER DATES, ITS INPUT READING INSTRUCTION AND ITS THREE DECLARED DRIFTS ARE RECONCILED AGAINST THE BUILD AND AGAINST THE PASSES THAT HAVE SINCE DISCHARGED THEM; NO CELL, EXPECTATION, VERDICT OR FIGURE MOVES.** **Every clause, cell and table of this set stands byte-for-byte and is read THROUGH this one; THIS clause adds no cell, removes none, weakens no expectation and re-decides no boundary.**

**(a) THE DATE — THE MARKERS STAND AND THE FILINGS ARE `2026-10-24`.** The `A149` clauses of this document (`§1`'s `§D` parenthetical re-read, `§2`'s clause under the census table, `§2.1` item `5`'s clause and `§5`'s heading) carry `2026-10-23` and record the re-derivation of **`2026-10-24`**, one day after the marker — which this document's own bytes already state elsewhere: `§2`'s re-run is dated **`(2026-10-24)`** and the live runner quotes the same clause as *"the greens writer's amendment of `2026-10-24`"* (`bindings/js/greens/json-crossing-live.mjs`). **The landing is measured at the source:** `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` at mtime **`2026-10-24 19:09:06`**, the addon built `19:09:49` and restaged `19:09:51` (`docs/specs/storeroom-json-crossing-live-report.md §11`). **No marker is rewritten — they are cited by `A149` and by the review record — and this item is their resolution of record** (`docs/defects.md` · `DEF-2026-10-24-A`). **The gate-`5` run of `2026-10-23` that `§2` prints, and the baseline run of `§5.1`, keep their own dates and are unmoved.**

**(b) THE INPUT CITATION AT THIS DOCUMENT'S HEAD IS READ THROUGH THE AMENDMENT THAT SUPERSEDES ITS READING INSTRUCTION.** The head names `docs/specs/storeroom-js/crossing.md`'s *"2026-10-23 AMENDMENT BLOCK AT ITS HEAD … read in WHOLE, WITH ITS READING INSTRUCTION APPLIED — *where this part prints `64`, read `128`; `65`, read `129`; `66`, read `130`*"*. **That instruction is the `128` era's and no longer reads as printed:** `docs/specs/storeroom-js/crossing.md §1`'s `A149` clause, item `1`, re-spells it as ***where this part prints `64`, read `126`; `65`, read `127`; `66`, read `128`*** — the offset moving from `+64` to `+62` — so a reader who applies the head's parenthetical without that clause is reading the superseded law. **The head stands as what the authoring pass applied on `2026-10-23`; the cells that depend on it are `§D`'s three, and they are re-derived at `§5.2`.** `[A2 docs/specs/storeroom-js/crossing.md §1 — its `A149` clause, item `1`; A2 docs/decisions.md · `A149` | cross-reference]`

**(c) THE THREE DECLARED DRIFTS ARE ALL DISCHARGED — THE PASSES THAT OWNED THEM HAVE ACTED, AND `§4`'s AND `§5.3`'s *"as this set filed them"* READS AS THE AUTHORING STATE.** Measured at the documents' own bytes, not inferred:
1. **`§2.2` ITEM `1` (the refusal form's member census).** This set recorded `{status, message}` (`contract.md §2.1`) against `{status, message, log}` (`surface.md §2.5`) and declared the reconciling clause **owed by whichever pass owns the form**. **It is discharged:** `contract.md §2.1`'s clause of the gate-3 proofreading pass reads the two-member spelling as **`{status, message, log}`**, names `surface.md §2.5` as the normative declaration of the member set, and fixes `log` as an ordinary own enumerable data member — so `JC-B67`'s recorded observation (`["log","message","status"]`) and that clause now say one thing.
2. **`§2.2` ITEM `3` (the three `<subject>` spellings that are not target spellings).** Declared owed to the pass owning the form; **discharged by the same clause**, `contract.md §2.1`'s third arm family, which names **exactly three** — the class spelling at the node-ceiling arm, the value's own empty rendering at the `Array`-subclass arm, and the value argument's name at the member-key arm — and declares **no fourth**.
3. **`§3.4` (`JC-TC-37`'s `, the value at member 'a' of 'v' is a bigint`).** Declared owed to the pass owning `test-cases.md`; **discharged at `test-cases.md §4`'s clause of the gate-3 proofreading pass**, which re-spells that row to `… of the write's value argument …` and measures the executed `JC-B27` as reproducing the normative spelling character for character.
**SO `§4`'s *"It does not arbitrate the three declared drifts it found"* and `§5.3`'s *"the three declared drifts of `§2.2`/`§3.4` stand exactly as this set filed them"* are read as the state at this set's authoring and re-derivation dates; NOTHING IS OWED, and `§4`'s remaining bullets, `§7`'s layer limits and `JC-B67`'s non-arbitration all stand.**

**(d) THE CENSUS, COUNTED RATHER THAN TRUSTED.** `§1`'s groups are `§A` `19` (`JC-B01`…`JC-B19`) · `§B` `2` (`JC-B20`–`JC-B21`) · `§C` `30` (`JC-B22`…`JC-B51`) · `§D` `6` (`JC-B52`…`JC-B57`) · `§E` `4` (`JC-B58`…`JC-B61`) · `§F` `4` (`JC-B62`…`JC-B65`) · `§G` `2` (`JC-B66`–`JC-B67`) — `19 + 2 + 30 + 6 + 4 + 4 + 2 = 67` ✓ — and the landed runner carries **`67`** `test()` cells, titled `JC-B01`…`JC-B67` (`bindings/js/test/json-crossing-blinded.test.mjs`). **`§5.4`'s before-and-after table, `§2`'s run block (`67` · `67` · `0` · `0` · `0` · `0`, exit `0`) and the `§D` boundary cells `126`/`127` and `999,999`/`1,000,000` all agree with the build, and no cell of this set states the superseded `128` law as operative.**

**(e) `§2.2` ITEM `2` IS THE PRE-`A149` OBSERVATION OF THE BOUNDARY AND IS RE-DERIVED TO THE OPERATIVE ONE — THE ONE PRINT IN THIS DOCUMENT THAT STILL STATED THE `128` LAW.** That item records *"the depth refusal's path segment count equals the ceiling's own number: `129` … nestings of `127` and `128` are ADMITTED … the declared boundary is observed exactly at `128`/`129`"*, measured against the build as it stood on `2026-10-23`. **Under `A149` and the landed source the same observation reads: the boundary is at `126` admitted and `127` refused, and the first refused target's path spells `127` segments** — `const ENCODER_CEILING = 126` at `bindings/js/index.mjs:1042`, refused at the walk at `depth > ENCODER_CEILING` (`:1111`), with the re-driven `LIVE-B55` printing the refusal at a `127`-segment position and `LIVE-B54` committing at `126` (`docs/specs/storeroom-json-crossing-live-report.md §11.4` · `§11.5`). **The observation's LAWFUL content is unmoved — the segment count still equals the first refused depth, there is still no off-by-one, and the walk's stopping point is still spelled in `parameter-semantics.md §2`'s position mapping — and only the two numbers are re-derived.** `[A1 bindings/js/index.mjs:1042 · :1111 | the operative ceiling and its refusal; A2 docs/specs/storeroom-json-crossing-live-report.md §11.4 · §11.5 | the re-driven cells | numeric claim]`

`[A1 bindings/js/test/json-crossing-blinded.test.mjs, sixty-seven cell titles counted at this pass's read; A1 bindings/js/index.mjs:1042 · :1043 | numeric or census claim; A2 docs/specs/storeroom-json-crossing/contract.md §2.1 · test-cases.md §4 | the two discharges; docs/defects.md · `DEF-2026-10-24-A` | cross-reference]`
