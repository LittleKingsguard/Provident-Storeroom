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
| `JC-TC-09` | depth `128` | admitted; the crate's ceiling is operative |
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
| `JC-TC-27` | nested depth `129` | `a value over the walk ceiling` |
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
| `JC-TC-42` | node ceiling exceedance | `a value over the walk ceiling`; same status as depth row 8, not `ValueNotAdmitted` |

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
