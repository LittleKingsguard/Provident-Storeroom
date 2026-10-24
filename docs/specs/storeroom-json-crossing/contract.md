# CONTRACT — `U-STOREROOM-JSON-CROSSING`: the crossing's value tree becomes the bare JSON tree, and every outside class is refused at the package's own boundary

**Status: GATE 3 GREEN — CONTRACT AUTHORED 2026-10-23; RED SET RUN 2026-10-23 (`23` PASS / `25` FAIL); GREEN RUN 2026-10-23 (`48` PASS / `0` FAIL).** Gate 1 closed `APPROVE-WITH-CONDITIONS`; the architect granted go-ahead on 2026-10-23 (`docs/specs/storeroom-json-crossing-proposal-review.md`; `docs/next-steps.md` · `N8`). The five gate-owned mechanics are settled here: `OM-2(b)`, `OM-4`, `OM-5`, `OM-6`, `OM-7(b)` (`JC-C7`). The store-side 17th status landed 2026-10-23, discharging `JC-C3`'s landing precondition. `JC-C6`'s residue dispositions are named and owned in `§6`, not absorbed. `[T]`

**Unit:** `U-STOREROOM-JSON-CROSSING`. **Prefix:** `D-GP-SRJC`. **Derivation:** `docs/specs/storeroom-json-crossing-proposal-review.md` · `decomposition` · `disposition = SPLIT-NOW` · `decider = the user` · `BUBBLE-ANSWERED: DECLINED | 2026-10-23`; one contract, both directions, no second unit (`A148` Q1). `[T]`

**Requirement of record:** `A147` (the ruling reaches both codecs; outside classes are refused at the package boundary), `A148` (the seven architect answers and the store-side widening), `A140` as amended (envelope and side-channel retired; `-0`, domain, walk discipline and store-surface clarification stand), and `A145` (the fourth dependency's form). `[A2 docs/decisions.md · A147 · A148 · A140 · A145]`

**Subject caption.** The contract governs the crossing's value tree — the JavaScript package's `encodeValue` walk, the Rust codec's `value_of` reader and `to_js_value` writer, and the JavaScript package's `decodeValue` decoder — for both directions of the `write`/`read` surface. It does not govern carrier addresses, tiers, op-ids, handles, file-tier JSON, or the native store's own API. `[T]`

## §1 — THE TREE, BOTH DIRECTIONS, ONE DEFINITION

**The admitted value tree is the bare JSON tree and nothing else.**

- A **string** is a sequence of Unicode scalar values (a JS string without a lone surrogate).
- A **number** is a finite IEEE-754 binary64 value; `-0` normalizes to `0` at the binding boundary (`A140`'s pin stands).
- A **boolean** is `true` or `false`.
- An **array** is a dense, genuine `Array` whose elements are admitted values. A hole, a subclass of `Array`, and an own accessor or own Symbol-keyed member on the array each refuse the whole value (`§2`).
- An **object** is a plain object (or a foreign-realm plain object) whose own enumerable string-keyed members carry admitted values. A class instance, any other prototype-carrying object, a `Proxy`, an own accessor, and an own Symbol-keyed member each refuse the whole value (`§2`). Member order is not semantically significant; array order is.
- **`null` is not admitted**, although JSON can spell it, because the store's own taxonomy makes `StoreValue::Null` an outside class. `undefined` is not admitted. No outside class is encoded as an object, a string, a marker, or a `{"v":…}` / `{"e":…}` envelope. `[A2 docs/decisions.md · A140 · A147 · A148 | the retired envelope; A1 src/value.rs:16 · :39 | the admitted/outside taxonomy]`

**Copy-in.** The package walks the caller's value first, classifies every reached value and member key, and emits the bare tree only if the whole value is admitted. The native half receives that tree through `napi`'s `serde-json` conversion and the codec's `value_of` reads a bare JSON value. A refusal is answered before any store verb is called. `[A1 bindings/js/index.mjs:1016 | encodeValue; bindings/js/src/codec.rs:332 | value_of]`

**Copy-out.** The store's value is written by the codec's `to_js_value` as the same bare tree, and the package's `decodeValue` returns that bare tree. No tag, class token, envelope, or side-channel appears in either direction. `[A1 bindings/js/src/codec.rs:857 | to_js_value; bindings/js/index.mjs:1801 | decodeValue]`

**One tree, two directions.** The same definition governs copy-in and copy-out; there is no split contract for copy-out and no second vocabulary (`A148` Q1). A tag or envelope that once carried a class is dead on this route; the only answer to an outside class is the refusal in `§2`. `[T]`

## §2 — THE SIXTEEN CLASSES, THEIR POSITIONS, AND THE ONE REFUSAL

**The marker count is nine; the class count is sixteen.** The old encoder's refusal arms spell `z` 1 · `u` 1 · `f` 1 · `y` 2 · `g` 1 · `F` 1 · `c` 4 · `P` 4 · `H` 1 = `16`; the contract pins the classes, not the markers (`A147`'s amendment). `[A2 docs/decisions.md · A147 | the label correction]`

| # | Class spelling (the package's exact reason text) | Failing position | Old marker | Answer |
| --- | --- | --- | --- | --- |
| 1 | `null` | value | `z` | `ValueRefusedAtBoundary` |
| 2 | `undefined` | value | `u` | `ValueRefusedAtBoundary` |
| 3 | `a function` | value | `f` | `ValueRefusedAtBoundary` |
| 4 | `a symbol` | value | `y` | `ValueRefusedAtBoundary` |
| 5 | `a value carrying a Symbol-keyed own member` | value of the containing object | `y` | `ValueRefusedAtBoundary` |
| 6 | `a bigint` | value | `g` | `ValueRefusedAtBoundary` |
| 7 | `a non-finite number` | value | `F` | `ValueRefusedAtBoundary` |
| 8 | `a value over the walk ceiling` | value | `c` | `ValueRefusedAtBoundary` |
| 9 | `a string carrying a lone surrogate` | value | `c` | `ValueRefusedAtBoundary` |
| 10 | `a string carrying a lone surrogate` | key | `c` | `ValueRefusedAtBoundary` |
| 11 | `a value that contains itself` | value | `c` | `ValueRefusedAtBoundary` |
| 12 | `a Proxy` | value | `P` | `ValueRefusedAtBoundary` |
| 13 | `a class extending Array` | value | `P` | `ValueRefusedAtBoundary` |
| 14 | `a class instance or another prototype-carrying non-plain object` | value | `P` | `ValueRefusedAtBoundary` |
| 15 | `a value carrying an own accessor member` | value of the containing object | `P` | `ValueRefusedAtBoundary` |
| 16 | `a sparse array` | value | `H` | `ValueRefusedAtBoundary` |

**Every row is refused at the package's walk, before any verb is called.** None reaches the store on the JavaScript route. None is coerced, repaired, dropped, or replaced. A refusal of a member refuses the whole containing value; a refusal of a member key likewise refuses the whole value and never drops the key. `[A2 docs/decisions.md · A147 · A148 Q3; A1 bindings/js/index.mjs:1016 | the walk's own class decisions]`

**The status is `ValueRefusedAtBoundary`, rank `17` in the store's closed set.** The store set widened `16 → 17` on 2026-10-23; `ValueNotAdmitted` remains rank `14` for the native route and is not the answer on this JavaScript route for these sixteen classes. `[A2 docs/decisions.md · A148 Q3; A1 src/error.rs:43 | CODES; docs/specs/storeroom-native/contract.md §8.1–§8.2 | the widened set]`

### §2.1 — THE MESSAGE'S PROVENANCE

**PART ONE is the store generator's own bytes.** `storeErrorMessage('ValueRefusedAtBoundary', args)` renders:

> `<subject> is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays`

where `<subject>` is `MessageArgs.segment` — the failing target's own spelling, rendered by the store's own target rule. The generator supplies the surrounding single quotes, so a `bigint` subject `10n` appears as `'10n'`; the package does not add a second quoting. **PART TWO is the package's and is appended beside it:**

> `, the value at <position> is <class>`

where `<position>` is the failing target's position spelling and `<class>` is one of the sixteen exact spellings in `§2`. **The package mints neither the status nor PART ONE; the store adds no `MessageArgs` member for the class or the position; the status's message has no second source.** `[A2 docs/decisions.md · A148 Q3; A1 src/error.rs:81 | storeErrorMessage; docs/specs/storeroom-native/contract.md §8.2 | the generator row and provenance clause]`

**One form.** The refusal travels inside the one `{status, message}` object. No raw host error, no second refusal form, and no side-channel is introduced. `[A1 bindings/js/index.mjs:655 | boundaryReject; A2 docs/decisions.md · A140 | the one form]`

## §3 — THE OBJECT ARM: `p`, `acc`, `proxy` ARE COPY-IN WALK DECISIONS

**`p`, `acc`, and `proxy` are not members of the value tree.** They are decisions the package's copy-in walk takes while classifying an object: `p` is the prototype classification (`plain`, `foreign`, `null`, or `class`), `acc` is the own-accessor presence decision, and `proxy` is the Proxy decision. They are consumed by the walk; they do not appear in the emitted tree, are not passed to the native half, and are not emitted by the copy-out writer. `[A1 bindings/js/index.mjs:1016 | encodeValue's object arm; bindings/js/src/codec.rs:857 | to_js_value's object arm]`

**Copy-in only.** The native reader has no `p`, `acc`, or `proxy` fields and does not require them. Their absence from a bare JSON object is not a failure. A tagged object that still carries them is an obsolete form and is not produced by this contract's package. `[T]`

**Copy-out indifferent.** The writer emits a plain JSON object from the store's map. It does not emit `p`, `acc`, or `proxy`, and it does not re-run the class decision — the store's own value model cannot produce an outside class on this route. `[A2 docs/decisions.md · A148 Q4 | the retired envelope; A1 src/value.rs:16 | the store's admitted model]`

## §4 — COPY DISCIPLINE: DEEP, ONCE, BOTH DIRECTIONS

**Deep copy in both directions.** Every admitted value crosses as a newly allocated tree on the recipient side. No object, array, or member is shared across the boundary; no member is aliased into two positions; no copy is skipped at any depth. A nested array inside an object is copied as part of the tree, not referenced. `[T]`

**Read once.** Each member and each array element is read exactly once by the walk. A getter cannot occur on an admitted value (an own accessor refuses the whole value, `§2` row 15), so "read once" is a structural property of the admitted tree rather than a promise about a caller's getter. Mutation of a caller's object **after** the walk visited that member is not observed in the crossing; mutation **before** the visit is observed. The crossing takes no snapshot and performs no second deep copy. `[A2 docs/decisions.md · A140 | walk/clone discipline; A1 bindings/js/index.mjs:1016 | the single walk]`

**The copy-out is deep at both sites.** `to_js_value` constructs the JS tree from the store's value; `decodeValue` returns a fresh tree to the caller. Neither site shares a mutable object with the store or with another crossing. `[A2 docs/decisions.md · A148 Q5 | both sites; A1 bindings/js/src/codec.rs:857; bindings/js/index.mjs:1801]`

**The crate's ceilings govern: depth `128`, nodes `1,000,000`.** The package's former depth `64` is re-derived to the crate's `128`; `65` and `66` are admitted depth values, not refusals, and `129` and beyond are refused by row 8's class. `JAS-07` and the greens set's depth cells are re-derived in the owning passes (`§6` row 5). **The node ceiling is the crate's `1,000,000`; exceeding it uses the SAME row 8 class (`a value over the walk ceiling`) and the same status.** `[A2 docs/decisions.md · A148 Q6 | the ceilings; A1 bindings/js/index.mjs:993 | ENCODER_CEILING as the pre-amendment value]`

**`-0` does not cross as a sign.** The crossing normalizes `-0` to `0`; the store's own sign behavior is not a crossing promise (`A140`'s pin stands). `[A2 docs/decisions.md · A140]`

## §5 — THE COPY-OUT FORM: THE SAME BARE TREE AT BOTH SITES

**Both copy-out sites carry the same bare tree.** The native half's `to_js_value` and the JavaScript half's `decodeValue` return strings, booleans, finite numbers, dense arrays, and plain objects. Neither emits `{k:'s'|'b'|'n'|'g'|'F'|'z'|'u'|'a'|'o'}`, a class token, or a `{"v":…}` envelope. `[A2 docs/decisions.md · A148 Q4 · Q5; A1 bindings/js/src/codec.rs:857; bindings/js/index.mjs:1801]`

**The outside arms are unproduced, not deleted by this contract.** The Rust `JsValue` outside variants remain declared for the Rust surface and are not removed by this unit; the copy-out writer's arms for them remain declared but unproduced on this route. The package's `decodeValue` has no outside-class arm because the store's admitted value cannot yield one. `[A1 bindings/js/src/crossing.rs:130 | JsValue; bindings/js/src/codec.rs:857 | the writer's arms]`

**Retired forms.** The `{"v":…}` envelope and the `{"e":…}` side-channel are dead for this crossing. The tagged form survives only where `§6` names a residue and an owning unit's pass has not yet moved it. `[A2 docs/decisions.md · A140 · A148 Q4]`

## §6 — THE RESIDUE: DISPOSITIONS AND OWNERS

**The residue is named here and owned elsewhere. This contract does not absorb it, and this unit's build edits only the cells its own change moves.** `[A2 docs/specs/storeroom-json-crossing-proposal-review.md §5 entry 7 · `JC-C6`]`

| # | Site | Disposition | Owner | State |
| --- | --- | --- | --- | --- |
| 1 | The JS test tree's tagged value-tree occurrences — `4`, not `8`: the red run's `8` tagged hits are the `4` value-tree occurrences (the `s` 3 and `n` 1 value tree) plus `4` carrier literals (`{ k: 's', v: opId }` and `{ k: 's', v: 'extra' }`); the carrier tags `L`, `T`, `v` are not value-tree tags | Re-spell only the `4` value-tree occurrences to the bare tree; leave the carriers; `JC-TC-44` whitelists the two carrier shapes and asserts zero value-tree tags | this unit's test writer | **landed 2026-10-23** |
| 2 | `bindings/js/src/codec.rs`'s `value_of` tag dispatch and `to_js_value` tag arms | Replace the value-tree tag dispatch with the `serde-json` reader/writer; keep the four carrier tag sites (address, tier, op-id, handle) | this unit's implementer | **landed 2026-10-23** |
| 3 | `bindings/js/src/crossing.rs`'s `JsValue` outside variants | Keep them declared; copy-in no longer produces them on this route; copy-out arms remain unproduced | this unit's implementer | **landed 2026-10-23**; depth `128` |
| 4 | `ValueNotAdmitted` re-render arm | Retain it for the conversion core's own bounds; drop the class-set trigger from this route; amend its clauses and cells | `U-STOREROOM-ADDON-SURFACE` | owed to that unit's pass |
| 5 | The status/depth cells that move: `bindings/js/test/**` cases asserting class-set `ValueNotAdmitted`, the legacy mem-tier `-0` cell (`round-trip.test.mjs`), and the old `64/65/66` depth cells; the greens set's `15` status cells and the three printed status arrays; the depth cells | Move the class-set status to `17`; re-derive depth `64/65/66` to the crate's `128/129/130`; re-spell the legacy `-0` cell to `0`; no cell asserts a tagged value tree | this unit's test writer for `bindings/js/test/**`; `U-STOREROOM-JS` for `JSG`/`LIVE`; the JSON-acceptance cells (`JAS`) for acceptance | **`bindings/js/test/**` landed 2026-10-23**; `JSG`/`LIVE`/`JAS` still owed to those units' passes |
| 6 | The dependency table's `napi` spelling | Re-spell to `napi` with the `serde-json` feature plus `serde_json = "1"` as the fourth direct entry; a fifth entry remains unlawful | `U-STOREROOM-ADDON-ADOPTION` (`binding-crate-and-abi.md §1`) | **landed 2026-10-23 by this unit**; the owning unit's declaration clause remains owed |
| 7 | The `PKGS` preflight | No action; its property holds with the fourth entry | none | closed |

**The residue's rule.** A site's disposition is its owner's claim; this unit's edits are limited to the paths in the implementation plan's declared scope and to the cells this unit's own change moves. No other unit's cells are re-spelled by this contract. `[A2 docs/specs/storeroom-json-crossing-proposal-review.md · `JC-C6`]`

## §7 — THE STORE-SIDE STATUS LANDING

**The store's set is `17` members, ranked `1`…`17`, with `ValueRefusedAtBoundary` appended at rank `17`; no rank `1`…`16` moves.** The algebra is `11 + 2 + 1 + 1 + 1 + 1 = 17`. `CODES` is `[&'static str; 17]`; `ConstraintListInvalid` remains rank `16`; `ValueNotAdmitted` remains rank `14`. `[A2 docs/decisions.md · A148 Q3; A1 src/error.rs:43]`

**The landing is dated 2026-10-23 and is complete.** `src/error.rs` carries `CODES: [&str; 17]` and the new generator arm; `docs/specs/storeroom-native/contract.md` `§0.4`, `§8.1` and `§8.2` carry the amendments; `docs/specs/storeroom-native/implementation-plan.md` `P-TP-8` is re-derived with the operative `17`, the operative failure list `15` or `16`, and no ninth register row. The store tests pass after the widening. `[A1 src/error.rs:43 · :81; docs/specs/storeroom-native/contract.md §0.4 · §8.1 · §8.2; docs/specs/storeroom-native/implementation-plan.md P-TP-8]`

**The package's answer is not the store's `ValueNotAdmitted`.** A store `ValueNotAdmitted` on the native route is still that member; on the JavaScript route the sixteen classes are decided by the package and answered with `ValueRefusedAtBoundary`. The two answers are distinct and neither re-renders the other's code. `[A2 docs/decisions.md · A148 Q3; A1 bindings/js/index.mjs:938 | valueReject, to be re-pointed]`

## §8 — THE TYPED REGISTER

| # | Property | Type / shape | Carrier | Meaning |
| --- | --- | --- | --- | --- |
| 1 | `value` (copy-in) | `JsValue` at the package edge; admitted tree | `encodeValue` | The caller's value; admitted only as `§1`'s tree |
| 2 | `key` (copy-in) | JS `string` | object member / array index | A member key is an admitted string; a lone surrogate at this position is class row 10 |
| 3 | `value` (copy-out) | JS tree | `decodeValue` / `to_js_value` | The same bare tree; no tags or envelope |
| 4 | `class` | one of the 16 exact spellings | refusal message | The class that failed; never a converted class |
| 5 | `position` | value / member / key | refusal message | Where the failure was found |
| 6 | `status` | `'ValueRefusedAtBoundary'` | refusal object | Rank `17`; minted by the store's set, selected by the package |
| 7 | `depth` | integer, `0…128` | walk | The crate's ceiling; `129` is class row 8 |
| 8 | `nodes` | integer, `0…1,000,000` | crate conversion | The crate's node ceiling; over it is class row 8's family |

**No row is a union or an optional; no row carries a second type.** `[T]`

## §9 — PARAMETER SEMANTICS

The parameter-semantics part is `parameter-semantics.md`. It carries the copy-in and copy-out rows, the position mapping, the depth/node ceilings, the `-0` rule, and the exact refusal-message assembly. Its rows are normative and are read with `§2`–`§5`. `[T]`

## §10 — TEST CASES AND IMPLEMENTATION

The test-case view is `test-cases.md`. It carries the acceptance cases for both directions, the sixteen class refusals, the depth and node boundaries, the `-0` pin, and the residue assertions. The implementation plan is `implementation-plan.md`; it carries the ordered steps, the declared edit scope, and the verification gates. `[T]`

## §11 — ACCEPTANCE AND CONDITION DISCHARGE

**`JC-C3`** is discharged by the dated store-side landing in `§7` and the re-derived `P-TP-8`. **`JC-C7`** is discharged by `§2`–`§5` settling the five gate-owned mechanics as contract clauses. **`JC-C6`** is discharged by `§6`'s named dispositions and owners, with the owners' own passes still owing their edits. `[A2 docs/specs/storeroom-json-crossing-proposal-review.md · `JC-C3`/`JC-C6`/`JC-C7`]`

**No condition is deferred as an open question.** No class, status, message, copy discipline, object-arm member, copy-out form, or residue owner is "to be decided" in this contract. `[T]`

## §12 — NEGATIVE CLAIMS

- No `null` or `undefined` crosses as data; both are refused (`§2` rows 1–2).
- No class token, tag, envelope, or side-channel crosses (`§1`, `§5`).
- No second status is minted for the sixteen classes (`§2`).
- No fifth direct dependency is admitted (`§6` row 6).
- No split unit or second contract is admitted (`§1`).
- No codec, bindings, test, or store byte outside the declared scope is edited by this contract (`implementation-plan.md`).
- No outside value reaches the store on the JavaScript route (`§2`).

## §13 — PART MAP AND CLOSURE

| Part | Path | Carries | Status |
| --- | --- | --- | --- |
| `parameter-semantics` | `parameter-semantics.md` | the typed parameter rows and the message/position assembly | authored |
| `test-cases` | `test-cases.md` | the acceptance and refusal cases | authored |
| `implementation-plan` | `implementation-plan.md` | the ordered steps, scope, and verification | authored |

**Closure predicate.** `{map entries} = {files present} − {contract.md}`. The map has `3` entries; the directory has `4` files, one of which is this contract; `3 = 4 − 1` ✓. No part is a flat shadow of another part, and no file outside the map is present. `[T]`

**Omissions, declared.** `property-register` is `§8`; `data-class-structure` is derived from `§1` and `§2`; `process-flow` is derived from `§4` and `implementation-plan.md`; `residue` is `§6`; `classes` is `§2`. No omission is an unanswered semantic. `[T]`

**Citation re-spellings this contract requires.** `16 → 17` for the store set; `64 → 128` for the package depth; tagged `{k:…}` → bare JSON for the value tree; `ValueNotAdmitted → ValueRefusedAtBoundary` for the sixteen classes on this route; the dependency table's `napi` → `napi` + `serde-json` + fourth entry. Each is owned by the pass named in `§6` or `implementation-plan.md`. `[T]`

**END OF CONTRACT — GATE 3 GREEN, 2026-10-23. THE FIVE GATE-OWNED MECHANICS ARE SETTLED; THE STORE-SIDE 17TH STATUS IS LANDED; THE RESIDUE IS NAMED AND OWNED; THE RED SET RAN (`23` PASS / `25` FAIL); THE GREEN RUNS (`48` PASS / `0` FAIL); THE ONLY INTEGRATED RED IS THE PARKED `P-ADA-5`; GATES 4–10 ARE OWED.**
