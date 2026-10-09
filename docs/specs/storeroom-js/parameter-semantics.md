# `parameter-semantics` — every declared JS parameter, its domain, its outside values, and the declared answer for each

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own text
— its `§6`, the parameter-semantics index — WHOLE, and it also carries its OWN AUTHORED ROWS, which are its
admissible content under the name-resolution table** (`[A3 docs/specs/spec-scope-and-structure/contract.md
§C.6 — `implementation-plan` and `parameter-semantics`'s own footing: the relocated `§9` index plus the
authored `PAR-n` rows; §C.11.6 — the kind rule | requirement]`). **A citation to a relocated section names
THIS part's path plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The pass's own record enumerates
the citation re-spellings the relocation required as a REQUIREMENT list, one line per re-spelled citation,
old form → new form** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class
(v-2) | requirement]`).

**AND ONE SCOPE STATEMENT, SO THIS PART IS NOT MISTAKEN FOR THE STORE'S OWN:** **the store's parameter rows
are `PAR-1`…`PAR-14` and live at `docs/specs/storeroom-native/parameter-semantics.md`; they are CITED here
and never restated.** **This part's rows are `PAR-JS-1`…`PAR-JS-18` — the JS SURFACE's own parameters, one row
per declared JS parameter — and they are a SEPARATE, UNCAPPED surface that is NOT the typed register's**
(`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 — no per-part reading of the `≤ 8` cap |
requirement]`).

---

## §1. The parameter-semantics index (relocated WHOLE from `contract.md §6`)

**One row per declared JS parameter, carrying its kind, its unit, its domain, the values outside it, the
declared answer for EACH outside value, its supplier, its evaluator and its observable.** **The rows are
`PAR-JS-1`…`PAR-JS-18` and they live at `docs/specs/storeroom-js/parameter-semantics.md` `§2`** — **the index
below is a map and every row of it is one entry, not a restatement.**

| Row | The JS parameter | Its kind | Where it is declared | Its row's home |
| --- | --- | --- | --- | --- |
| **`PAR-JS-1`** | **`cfg`** — the construction's one object argument | `parameter` | `contract.md §2.1`, `parameter-semantics.md §2.1` | `parameter-semantics.md` `§2.1` |
| **`PAR-JS-2`** | **`cfg.filePath`** | `parameter` | `contract.md §2.1`, `contract.md §1.3` | `parameter-semantics.md` `§2.2` |
| **`PAR-JS-3`** | **`cfg.journalLength`** | `parameter` | `contract.md §2.1`, `contract.md §1.3` | `parameter-semantics.md` `§2.3` |
| **`PAR-JS-4`** | **`cfg.listeners[]`** — the array and its `{ address, handle }` element | `parameter` | `contract.md §2.1`, `contract.md §1.3` | `parameter-semantics.md` `§2.4` |
| **`PAR-JS-5`** | **`address`** on `read` / `readLiteral` / `write` / `delete` / `listen` | `parameter` | `contract.md §1.3`, `contract.md §2.2` | `parameter-semantics.md` `§2.5` |
| **`PAR-JS-6`** | **`tier`** on `read` / `readLiteral` — optional, zero to many | `parameter` | `contract.md §2.2`, `contract.md §1.3` | `parameter-semantics.md` `§2.6` |
| **`PAR-JS-7`** | **`tier`** on `write` — required, exactly one | `parameter` | `contract.md §2.2`, `contract.md §1.3` | `parameter-semantics.md` `§2.7` |
| **`PAR-JS-8`** | **`handle`** — the listener's handle, its two spellings and its outside values | `return-field` (its construction-side twin is a `parameter`) | `contract.md §2.3`, `contract.md §1.3` | `parameter-semantics.md` `§2.8` |
| **`PAR-JS-9`** | **`opId`** on `rollback` | `parameter` | `contract.md §1.3`, `contract.md §2.2` | `parameter-semantics.md` `§2.9` |
| **`PAR-JS-10`** | **`value`** — the written value's taxonomy | `parameter` | `contract.md §1.2` | `parameter-semantics.md` `§2.10` |
| **`PAR-JS-11`** | **`tier`** on `delete` — optional, exactly one when present | `parameter` | `contract.md §2.2`, `contract.md §1.3` | `parameter-semantics.md` `§2.11` |
| **`PAR-JS-12`** | **`listener`** — the caller's function, held by the package's registry, **together with the `handle` its registration site takes as its FIRST argument (the domain of `PAR-JS-8`)** | `callback` | `contract.md §2.4`, **`contract.md §2.4` item 5 (the registration site's declared spelling, added 2026-10-11)**, `contract.md §2.7` | `parameter-semantics.md` `§2.12` |
| **`PAR-JS-13`** | **the returned `op`** — the `JournalOp` the write returned, in its JS spelling | `return-field` | `contract.md §1.3`, `contract.md §2.6`, `contract.md §2.8` | `parameter-semantics.md` `§2.13` |
| **`PAR-JS-14`** | **the returned `watched`** — the watched ADDRESSES | `return-field` | `contract.md §1.3`, `contract.md §2.2` | `parameter-semantics.md` `§2.14` |
| **`PAR-JS-15`** | **the returned `triggered`** — the triggered handles | `return-field` | `contract.md §2.7`, `contract.md §1.3` | `parameter-semantics.md` `§2.15` |
| **`PAR-JS-16`** | **the returned `tiers`** on the delete receipt | `return-field` | `contract.md §1.3` | `parameter-semantics.md` `§2.16` |
| **`PAR-JS-17`** | **the thrown `{status, message}`** — the failure channel's two members | `error-code` | `contract.md §2.5` | `parameter-semantics.md` `§2.17` |
| **`PAR-JS-18`** | **the constraint/repair pattern's own carrier** — the `write` → `rollback` pair, declared as a USAGE PATTERN and NOT as a parameter | `vocabulary-token` | `contract.md §2.6` | `parameter-semantics.md` `§2.18` |

**ARITHMETIC, PRINTED WITH ITS TERMS: the parameter-semantics set is `18` rows
(`PAR-JS-1`…`PAR-JS-18`) — `15` are parameters or returned fields this unit declares the JS surface as
carrying (`PAR-JS-1`…`PAR-JS-11` and `PAR-JS-13`…`PAR-JS-16`) + `1` callback (`PAR-JS-12`) + `1` error-code
carrier (`PAR-JS-17`) + `1` declared NON-parameter, the constraint pattern (`PAR-JS-18`) — so `15 + 1 + 1 +
1 = 18` ✓.** **AND ONE RE-DERIVATION OF THIS INDEX, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS (`role_spec_writer`),
CLOSING THE RED SET'S CONTRACT FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) WITHOUT MOVING A
COUNT.** `RCA-8(d)` ANNOTATE-BESIDE: **the table above stands byte-for-byte; THIS clause is the operative
statement of what the same pass changed in it, and it is a PURE INSERTION — `18` rows before and `18` rows
after, so the arithmetic above is UNCHANGED and `contract.md §6` prints the same figure.** **`PAR-JS-12` IS
RE-DERIVED RATHER THAN JOINED BY A NINETEENTH ROW: `contract.md §2.4` item 5 declares the registration site
`register(handle, listener)`, and that site's TWO argument positions are the function `PAR-JS-12` ALREADY
names and the HANDLE `PAR-JS-8` ALREADY names — so the registration's own parameter pair is carried by the
two rows that exist and NO new row is minted.** **`PAR-JS-13` … `PAR-JS-18` are NOT renumbered and no row's
`§`-home moves** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-15`; A3
docs/specs/storeroom-js/contract.md §2.4 item 5 | numeric or census claim]`).

---

## §2. The `PAR-JS-n` rows — every declared JS parameter, its domain, and its outside values

**THE ROW SCHEMA, STATED ONCE, SO EVERY ROW BELOW IS READ THE SAME WAY.** **Each row carries thirteen cells,
and each cell is mandatory:** `id` · `parameter` · `kind` · `unit` · **`domain (and the values outside it)`** ·
**`the declared answer for EACH outside value`** · `supplier` · `evaluator` · `observable` · `the clause that
declares it` · `the ruling that pins it` · `alt` (the priced alternative where the row's carrier is a
declared default) · `park` (the park that holds the row's silence, where one does).
**`kind` is read from the CLOSED seven-value enum `parameter` | `option` | `seam` | `callback` |
`return-field` | `error-code` | `vocabulary-token`** (`[A3
docs/specs/storeroom-native/parameter-semantics.md §2 — the row schema, cited as this part's precedent |
requirement]`).
**AND THE ONE RULE EVERY ROW OBEYS:** **the `the declared answer` cell is NEVER EMPTY and never says
`TBD`** — **for each value the row lists as OUTSIDE the domain, an answer is printed, and where the
contract's answer is a code, the code is a member of the store's closed `15`-member set**
(`[A3 docs/specs/storeroom-native/contract.md §8.1 — the closed set, as the store's own contract closes it |
requirement]`).
**AND THE `park` CELL'S RULE, STATED ONCE FOR EVERY ROW:** **a park is NEVER a reversal instrument; where a
row's subject stands parked, the park is named in the `park` cell and the reversal instrument is named in
the row's own terms** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` | requirement]`).

### §2.1 `PAR-JS-1` — `cfg`, the construction's one object argument

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-1`** |
| `parameter` | **`cfg`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — one record of three declared keys |
| `domain` | **a PLAIN JS OBJECT carrying the store's three declared keys — `filePath` · `journalLength` · `listeners` — and no fourth key that changes the outcome** |
| `the values OUTSIDE it` | **ABSENT** · `null` · `undefined` · a **non-object** (a number, a string, a boolean, a function, an array) |
| `the declared answer for EACH outside value` | **`AddressMalformed` for every one of them, with no instance returned** — **and an ABSENT `cfg` is the same answer, because the construction takes ONE argument** |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction** |
| `observable` | **a returned instance for the three-key object; a thrown `{status: 'AddressMalformed', message}` and NO instance for each outside form** |
| `the clause that declares it` | **`contract.md §2.1`** |
| `the ruling that pins it` | **`A1`** (`A16`: *"File path is passed to store on first creation"`) · **`A1`** (`A31`: *"Required as args on store creation"`) |
| `alt` | **a fourth key that produces a code** — priced at `DD-36`: the store's own `cfg` member set is CLOSED, so a third key is UNREPRESENTABLE in a typed crate and "ignored" is the declared answer rather than an arm |
| `park` | **the path's ORIGIN** — where `filePath` comes from at first creation — is the store's `P-1` material and **no clause of this unit reaches it**; **the park is NOT this row's reversal instrument** |

`[A1 docs/specs/storeroom-js-proposal.md §9.3 · `D1`; A3 docs/specs/storeroom-native/contract.md §7.1 |
declared parameter semantics]`

### §2.2 `PAR-JS-2` — `cfg.filePath`, the `file` tier's external location

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-2`** |
| `parameter` | **`cfg.filePath`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a filesystem path string |
| `domain` | **ABSENT — which is IN DOMAIN and creates the register at `mem` — or a non-empty `string` naming a path that PASSES the store's construction-time reachability probe (`A52`/`A55`: a DRY RUN with a write-access requirement)** |
| `the values OUTSIDE it` | **`null`** · **`undefined`** · **`''`** · **a non-string** · **a string that FAILS the probe, in three named forms: the parent directory does not exist · the path or its directory is not writable (an existing but read-only file is the canonical case) · the path IS a directory** |
| `the declared answer for EACH outside value` | **`null` / `undefined` / `''` / a non-string → `AddressMalformed`, NO instance returned.** **A string that fails the probe → `FilePathUnreachable`, NO instance returned, and NOTHING created by the probe.** **AND THE ONE ABSENCE IS NOT AN OUTSIDE VALUE: an ABSENT `filePath` returns an instance whose register is `mem`** |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction — the probe, then the register's tier fixity** |
| `observable` | **a returned instance for the ABSENT and the REACHABLE-PATH states; a thrown `FilePathUnreachable` and NO instance for each of the three unreachable forms; and the register's tier read back from the empty address's reference, unchanged after any write, delete, rollback or re-boot** |
| `the clause that declares it` | **`contract.md §2.1`**, **`crossing.md §1.3`'s `FilePathArg` rows 1–6**, and `docs/specs/storeroom-native/contract.md §7.1` |
| `the ruling that pins it` | **`A1`** (`A16`) · **`A1`** (`A49`: the path is optional) · **`A1`** (`A52`/`A55`: the probe) · **`A1`** (`A53`/`A54`: the member) |
| `alt` | **a probe that CREATES what it finds (a creatable-path arm, or a directory-state arm with its own member)** — priced at the store's own `DD-40`; **NOT this unit's to take** |
| `park` | **—** (the path's origin is `PAR-JS-1`'s `park` cell, and this row's own subject crosses no boundary) |

`[A1 docs/specs/storeroom-js-proposal.md §9.4 · `D12`'s neighbourhood; A3
docs/specs/storeroom-native/parameter-semantics.md §2.6 · PAR-6 | declared parameter semantics]`

### §2.3 `PAR-JS-3` — `cfg.journalLength`, the journal's configured length

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-3`** |
| `parameter` | **`cfg.journalLength`** |
| `kind` | **`parameter`** |
| `unit` | **`count` — a count of journal ENTRIES**, and **not** a count of bytes, of operations per address, or of milliseconds |
| `domain` | **a positive integer `number` (`>= 1`)** |
| `the values OUTSIDE it` | **ABSENT** · `null` · `undefined` · `0` · a negative integer · a fractional number · `NaN` · `Infinity` · a numeric string (`'5'`) · a boolean · an object · a function · a `bigint` · a positive integer beyond `u32` |
| `the declared answer for EACH outside value` | **ABSENT → `ConstructionArgumentMissing`** — **the ONE absence the amended construction still refuses.** **Every other outside value → `AddressMalformed`**, **and no coercion of a numeric string, a boolean or a `bigint` is performed**; **NO instance is returned in any of these cases** |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction** |
| `observable` | **a returned instance for `1`; a thrown `ConstructionArgumentMissing` for the ABSENT case; a thrown `AddressMalformed` for each present-but-out-of-domain value; and NO instance in any failure case** |
| `the clause that declares it` | **`contract.md §2.1`**, **`crossing.md §1.3`'s `JournalLengthArg` rows 1–12**, and `docs/specs/storeroom-native/contract.md §7.1` |
| `the ruling that pins it` | **`A1`** (`A31`: *"Required as args on store creation"*) · **`A1`** (`A16`) |
| `alt` | **a DEFAULTED length** — priced at the store's own `DD-16`: a fabricated default is *"the decision the consumer owns, baked in as the mechanism's default"*, and the ruling names the CALLER as the value's owner |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §2 item 5 · the toolchain and fixture context; A3
docs/specs/storeroom-native/parameter-semantics.md §2.7 · PAR-7 | declared parameter semantics]`

### §2.4 `PAR-JS-4` — `cfg.listeners[]`, the construction's listener array

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-4`** |
| `parameter` | **`cfg.listeners`** |
| `kind` | **`parameter`** |
| `unit` | **`count` — a count of listener ENTRIES, each entry being one `{ address, handle }` record** |
| `domain` | **an ARRAY of `{ address, handle }` records, where `address` lies in `PAR-JS-5`'s domain and `handle` is a plain non-empty `string`.** **THE EMPTY ARRAY IS IN THE DOMAIN and is the ordinary no-listener store.** **A DUPLICATE address is IN the domain: both entries are KEPT, each with its OWN handle** |
| `the values OUTSIDE it` | **ABSENT** from `cfg` · `null` · `undefined` · a **non-array** (a number, a string, a boolean, an object, a function) · **an array carrying an entry that is not an `{ address, handle }` record** · **an array carrying an entry whose `address` lies outside `PAR-JS-5`'s domain** · **an array carrying an entry whose `handle` is not a plain non-empty `string`** |
| `the declared answer for EACH outside value` | **`AddressMalformed` for every one of them, with NO instance returned**: **an ABSENT `listeners` is the ONE absence the construction does not admit**; **a malformed address INSIDE the array is `PAR-JS-5`'s own answer carried**; **and NO entry is silently dropped — a rejected array admits NOTHING and returns NO instance** |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction, at its own home-population step — BEFORE the register is generated** |
| `observable` | **`2` entries in ⇒ `2` entries in the store's home (the duplicate drive); `0` entries in ⇒ a store whose FIRST successful write carries `triggered: []`; and the register's carrier node carrying the references FROM THE OUTSET, because the home was populated first** |
| `the clause that declares it` | **`contract.md §2.1`**, **`crossing.md §1.3`'s `ListenersArg` rows 1–5**, and `docs/specs/storeroom-native/contract.md §7.1`'s amended construction sequence |
| `the ruling that pins it` | **`A1`** (`A56`: *"Accept listener array as args, and populate home map before generating registry"*) · **`A1`** (`A57`: the element shape `{ address, handle }`) |
| `alt` | **a DUPLICATE COLLAPSED at the address level, as the superseded stopgap verb did** — priced at the store's own `DD-39`: it would silently discard a handle the caller supplied and can never get back; **and an EMPTY array REFUSED** — priced: it would make the ordinary no-listener store unconstructable |
| `park` | **how a JS client would SUPPLY the array is the store's `P-1` material and is closed here by `DD-44`; no other subject of this row is parked** |

`[A1 docs/specs/storeroom-js-proposal.md §9.2 · `K9`'s neighbourhood; A3
docs/specs/storeroom-native/parameter-semantics.md §2.12 · PAR-12 | declared parameter semantics]`

### §2.5 `PAR-JS-5` — `address`, the path argument on five verbs

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-5`** |
| `parameter` | **`address`** on `read` · `readLiteral` · `write` · `delete` · `listen` |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a segment list |
| `domain` | **a JS ARRAY of segments, where each segment is a `string` (a key) or a non-negative integer (an index).** **The EMPTY array is IN the domain and resolves to the register** |
| `the values OUTSIDE it` | **the fourteen carrier-variant rows of `crossing.md §1.3`** — ABSENT · `null` · `undefined` · a non-array · an array holding a negative integer · an array holding a non-integer number · an array holding `null`/`undefined`/a boolean/an object/a nested array/a function · a class instance that is array-like but not an `Array` · a `Proxy` over an array · a sparse array |
| `the declared answer for EACH outside value` | **`AddressMalformed` for every one of them, with the store's generated message** — **and an ABSENT `address` argument answers `AddressMalformed` as well** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the walk)** |
| `observable` | **a walk that resolves at depth `0`, `1` and `n`, and that fails with `AddressMalformed` at each outside form** |
| `the clause that declares it` | **`crossing.md §1.3`'s `AddressArg` rows 1–14** and `docs/specs/storeroom-native/contract.md §1.5` |
| `the ruling that pins it` | **`A1`** (`A23`: the register carries no ordered-vector form) · **`A1`** (`A25`: *"Empty address resolves to register"*) |
| `alt` | **a delimited `"a.b.c"` STRING address** — priced at the store's own `DD-24(d)`: a key containing a dot would become unaddressable; **and `"0"`-as-`0` COERCION** — priced at `DD-24(c)`: it would destroy the store's own key-vs-index distinction |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §9.1 · `K18`'s neighbourhood; A3
docs/specs/storeroom-native/parameter-semantics.md §2.1 · PAR-1 | declared parameter semantics]`

### §2.6 `PAR-JS-6` — `tier` on `read` / `readLiteral`: optional, zero to many

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-6`** |
| `parameter` | **`tier`** (the reader's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **ABSENT, or a set of ZERO TO MANY members of `{ 'file', 'mem', 'temp' }`, supplied as either a single token string or an array of token strings.** **The array is an ANY-MATCH set: it is not a union of values, not an ordered preference and not a filter** |
| `the values OUTSIDE it` | **a token outside the three** (`'secure'`, `'FILE'`, `'disk'`, `'session'`, `''`) · **a non-string member of the array** · **`null`** · **`undefined`** · **a non-string, non-array scalar of another type** · **an object** · **a function** |
| `the declared answer for EACH outside value` | **`OutOfDomainTier` for every token or member outside the domain, and for a non-string/non-array argument; `AddressMalformed` when the argument is `null` or `undefined`** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store — the walk's selection, then the read's assembly** |
| `observable` | **a tier-qualified read answering one version where an unqualified read answers another; and a read whose assembled subtree carries exactly the members whose selected versions lie in the passed set** |
| `the clause that declares it` | **`contract.md §2.2`** and **`crossing.md §1.3`'s `TierArg` rows 1 and 3–7** |
| `the ruling that pins it` | **`A1`** (`A24`: *"Optional on read, accepts zero to many tiers"*) · **`A1`** (`A28`: the zero-token set) · **`A1`** (`A29`: the domain) |
| `alt` | **an ordered-preference reading of the array** — priced at the store's own `DD-12`: the same read would answer by preference rather than by any-match, and the store's own `A24` names one match, not a ranking |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §9.1 · `K3`'s neighbourhood; A3
docs/specs/storeroom-native/parameter-semantics.md §2.2 · PAR-2 | declared parameter semantics]`

### §2.7 `PAR-JS-7` — `tier` on `write`: required, exactly one

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-7`** |
| `parameter` | **`tier`** (the writer's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **EXACTLY ONE member of `{ 'file', 'mem', 'temp' }` — a single string token, present, never an array** |
| `the values OUTSIDE it` | **ABSENT** · `null` · `undefined` · a token outside the three · a non-string · **an array of `0` tokens** · **an array of `1` token** · **an array of `≥ 2` tokens** |
| `the declared answer for EACH outside value` | **ABSENT → `AddressMalformed`**; **`null`/`undefined` → `AddressMalformed`**; **any token outside the three, any non-string, and any array of any length including `1` → `OutOfDomainTier`** (the array spelling is the READER's arity and not the writer's) |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store — the write's arm selection and the minted anchors' tier property** |
| `observable` | **after any successful write, every anchor the write minted carries the caller's single tier** |
| `the clause that declares it` | **`contract.md §2.2`** and **`crossing.md §1.3`'s `TierArg` rows 1–2** |
| `the ruling that pins it` | **`A1`** (`A24`: *"Exactly one required on write"*) · **`A1`** (`A27`: the tier is carried by anchors) |
| `alt` | **accepting a length-`1` ARRAY on write** — priced at the store's own `§0.4`'s write row: it would make two arities spell one argument, and the store's own table names one; **NOT this unit's to take** |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §2 item 3 · `A57`'s return-by-handle reading; A3
docs/specs/storeroom-native/parameter-semantics.md §2.3 · PAR-3 | declared parameter semantics]`

### §2.8 `PAR-JS-8` — `handle`, the listener's handle: two spellings, one domain, and every outside value

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-8`** |
| `parameter` | **`handle`** — the listener record's second member, the value a trigger RETURNS, the value `unlisten` accepts, and the value a construction entry carries |
| `kind` | **`return-field`** (its construction-side twin is a `parameter`) |
| `unit` | **unitless and OPAQUE** |
| `domain` | **the store-minted tokens and the construction-adopted tokens of THIS PROCESS — a store-minted handle being UNIQUE PER PROCESS** (`A69`). **IN JS: the construction's `listeners[]` takes a plain `string`; every handle a verb RETURNS is the package's opaque JS value; `unlisten` accepts the OPAQUE form ONLY** |
| `the values OUTSIDE it` | **ABSENT** from a `listeners[]` entry · **`null`** · **`undefined`** · **a blank (empty-string) token** · **a non-string, non-opaque value** · **a value a FOREIGN instance minted** · **a value a PRIOR SESSION minted** · **a value the store never minted at all (fabricated)** |
| `the declared answer for EACH outside value` | **`unlisten` over ANY of them — the foreign, the prior-session and the fabricated alike — is a NO-OP SUCCESS and NOT a failure: no code is produced and NO OTHER REGISTRATION IS REMOVED.** **A `listeners[]` entry whose `handle` the construction cannot admit is `AddressMalformed` and NO instance is returned.** **A bare `string` passed to `unlisten` is an UNKNOWN handle and is the same no-op success** |
| `supplier` | **the store** (the token is minted by the store); **the caller only passes it back, or spells one at the construction** |
| `evaluator` | **the store (the home's lookup at `unlisten`, and the trigger's own selection at a `write` or a `delete`) — and the PACKAGE for the opaque wrapper's identity** |
| `observable` | **the handle set returned by a `write` and by a `delete`; the unknown/foreign/fabricated handle's no-op success that removes nothing; a returned handle whose token JS cannot read; and the DESTRUCTION drive, where a handle survives the change action that replaced the node carrying its borrow** |
| `the clause that declares it` | **`contract.md §2.3`** and **`crossing.md §1.3`'s `ListenerHandle` rows 1–2** |
| `the ruling that pins it` | **`A1`** (`A57`: *"a handle that it returns to alert the client of the trigger"*) · **`A1`** (`A58`) · **`A1`** (`A69`: *"Proceed on b"*) |
| `alt` | **ONE spelling in both directions, the STRING** — priced at `DD-14`: opacity is surrendered for a guessable `listener-<n>` namespace, **which the store's own contract declares an ACCEPTED cross-process hazard and does not defend** |
| `park` | **the handle's BOUNDARY CROSSING is the store's `P-1` material and is closed by `contract.md §2.3`; the park is NOT this row's reversal instrument** |

`[A1 docs/specs/storeroom-js-proposal.md §13 · A69; A3
docs/specs/storeroom-native/parameter-semantics.md §2.13 · PAR-13 | declared parameter semantics]`

### §2.9 `PAR-JS-9` — `opId` on `rollback`

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-9`** |
| `parameter` | **`opId`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — the `JournalOp.opId` string |
| `domain` | **a non-empty `string` the store's journal holds — in practice the `WriteResult.op.opId` the store returned** |
| `the values OUTSIDE it` | **ABSENT** · **`null`** · **`undefined`** · **the empty string** (a blank `opId`) · **a number** · **a well-shaped string the journal does not hold** |
| `the declared answer for EACH outside value` | **ABSENT / `null` / `undefined` / a blank string / a number → `AddressMalformed`.** **A well-shaped but unknown string → `JournalOpUnknown`** |
| `supplier` | **the caller, per call** — and the ONLY producer of a valid value is the write that returned it |
| `evaluator` | **the store (the journal's own lookup)** |
| `observable` | **a rollback that reverses the named op's scope and echoes the id it was passed; a `JournalOpUnknown` for an unknown id; an `AddressMalformed` for each shape violation** |
| `the clause that declares it` | **`contract.md §2.2`** and **`crossing.md §1.3`'s `OpIdArg` rows 1–6** |
| `the ruling that pins it` | **`A1`** (`A37`: *"be id'ed for rollback"*) · **`A1`** (`A35`: the reach and the floor) |
| `alt` | **an OPAQUE op handle instead of a string id** — priced at the store's own `DD-22`: the op's record must carry enough to reconstruct the original tree, and an opaque handle cannot be shown to do so |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §15 · A73 — the `write`→`rollback` pair; A3
docs/specs/storeroom-native/parameter-semantics.md §2.10 · PAR-10 | declared parameter semantics]`

### §2.10 `PAR-JS-10` — `value`, the written value's taxonomy

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-10`** |
| `parameter` | **`value`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — any admitted literal, or a plain JSON object or array |
| `domain` | **exactly five admitted variants of the store's `StoreValue`: a `string`; a `boolean`; a finite `number`; a PLAIN object; a PLAIN array — where every nested member must itself be admitted** |
| `the values OUTSIDE it` | **the eight outside variants of `crossing.md §1.2`'s rows 6–13** — `null` · `undefined` · a function · a symbol · a `bigint` · a non-finite number · a cyclic value · a non-plain collection (a `Map`/`Set`/typed array/`Date`/`RegExp`/`Proxy`/class instance, and also a `String`/`Number`/`Boolean` object wrapper) — **and, one level deeper, the three WALK refusals of `crossing.md §1.4`: a symbol-keyed own property · a sparse array · an accessor own property** |
| `the declared answer for EACH outside value` | **`ValueNotAdmitted` for every one of them, with no node minted, no anchor installed, no container changed and no journal entry appended.** **AND THE KIND-CONTRADICTING CASE IS A DIFFERENT ANSWER: an admitted value whose kind contradicts the target container's answers `ContainerKindConflict`, not `ValueNotAdmitted`** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the binding's own walk (the copy in), then the store (the taxonomy check and the node-kind decision)** |
| `observable` | **the write→read round trip over the corpus of `acceptance.md §4.3`, and the `ValueNotAdmitted` drive for each outside class** |
| `the clause that declares it` | **`contract.md §1.2`** and **`crossing.md §1.2`–`§1.4`** |
| `the ruling that pins it` | **`A1`** (`A65`: the deep copy in and out) · **`A1`** (`A60`: the numeric bound and its refusal) · **`A1`** (`A62`: the refusal stands as a defense-in-depth rule) |
| `alt` | **admitting `null` and the other excluded classes** — priced at the store's own `DD-24(e)`: the round trip could not distinguish `null` from *"absent"* and a function has no JSON image; **and a `JSON.stringify` carrier** — priced at `DD-6`: it is impossible as the store stands and would move the store's declared surface |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §10 · A65; A1 docs/specs/storeroom-js-proposal.md §8 · A62; A3
docs/specs/storeroom-native/parameter-semantics.md §2.5 · PAR-5 | declared parameter semantics]`

### §2.11 `PAR-JS-11` — `tier` on `delete`: optional, exactly one when present

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-11`** |
| `parameter` | **`tier`** (the deleter's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **ABSENT** — which removes every version at the target and all its downstream — **or EXACTLY ONE member of `{ 'file', 'mem', 'temp' }`** |
| `the values OUTSIDE it` | **an array of any length** (including `0` and `1`) · **a token outside the three** · **a non-string** · **`null`** · **`undefined`** |
| `the declared answer for EACH outside value` | **Any array → `OutOfDomainTier`; any out-of-domain token → `OutOfDomainTier`; a non-string → `OutOfDomainTier`; `null`/`undefined` → `AddressMalformed`.** **AND THE NOTE THAT KEEPS A GAP FROM BEING READ AS AN ABSENCE: a delete naming a tier the target does NOT hold is NOT an outside value — it is the store's own in-domain no-op arm, it removes nothing, and it is a SUCCESS returning `tiers: []`** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the delete's arm selection)** |
| `observable` | **the receipt's `tiers` membership and the surviving sibling versions; and the `[]` receipt of an arm that removed nothing** |
| `the clause that declares it` | **`contract.md §2.2`** and **`crossing.md §1.3`'s `TierArg` rows 1–7** |
| `the ruling that pins it` | **`A1`** (`A12`: the delete's tier scope) · **`A1`** (`A19`: purge is a WRITE's act) |
| `alt` | **accepting a tier SET on delete** — priced at the store's own `§4.3`: it would give the delete a reader's arity and would make the receipt's `tiers` list ambiguous with its scope |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §2 item 3; A3
docs/specs/storeroom-native/parameter-semantics.md §2.4 · PAR-4 | declared parameter semantics]`

### §2.12 `PAR-JS-12` — `listener`, the caller's function

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-12`** |
| `parameter` | **`listener`** — the function the package's registry holds for a handle |
| `kind` | **`callback`** |
| `unit` | **unitless** — one JS function value |
| `domain` | **ANY JS function the caller registers for a handle the package returned or adopted.** **The package's invocation passes the triggering ADDRESS as its argument; no other argument is declared and no return value is read** |
| `the values OUTSIDE it` | **a non-function** (a number, a string, an object, `null`, `undefined`) · **a function registered for a handle the package never returned or adopted** |
| `the declared answer for EACH outside value` | **A non-function is a REGISTRATION of nothing: the package's registry admits only functions, and a non-function is REFUSED at registration with a JS-side `TypeError` — the ONE failure form this unit's package throws that is NOT the store's `{status, message}`** — **and the refusal is STATED HERE AS A DECLARED EXCEPTION rather than left to be discovered.** **A function registered for an unreturned or unadopted handle is held but can NEVER fire, because `triggered` carries only handles the store returned — and that is a declared no-op and NOT a failure** |
| `supplier` | **the caller** |
| `evaluator` | **the package (its registry's lookup at delivery time, and its own invocation)** |
| `observable` | **a registered function invoked after a write whose address scope covers its listener's address; an unregistered handle that fires nothing silently; a second registration that replaces the first; and a throwing body that propagates and alters nothing** |
| `the clause that declares it` | **`contract.md §2.4`** — **`§2.4` RULES 1–4 AND `§2.4` ITEM 5, the registration site's declared spelling (`register(handle, listener)` on the object `storeCreate` returned; the bounded correction pass of 2026-10-11)** — and **`contract.md §2.7`** |
| `the ruling that pins it` | **`A1`** (`A57`: the store *"returns"* the handle and *"invokes nothing"*) · **`A1`** (`A74`: no background work, no queue) · **`A1`** (`docs/specs/storeroom-js-proposal-review.md §5.4` · `AR-15`: the registry's rules **drivable**) |
| `alt` | **a FAN-OUT registry (many functions per handle)** — priced at `DD-15`: it would give one handle a broadcast the store's own set semantics do not carry, and *"`unlisten` withdraws the registration, never the function"* would stop being single-valued; **and a CATCHING invocation** — priced at `DD-23`: the report would need a failure channel the package does not own |
| `park` | **the listener's ORDER, its attachment rule and a throwing body's disposition were the store's `P-3`, and `A57`/`A58` leave the invocation to the CLIENT — which is THIS unit; no subject of this row is parked** |

`[A1 docs/specs/storeroom-js-proposal.md §9.2 · `K9`; A1 docs/specs/storeroom-js-proposal.md §18 · A57;
docs/specs/storeroom-js-proposal.md §20 · A58 | declared parameter semantics]`

**AND ONE EXCEPTION, DECLARED SO THE SINGLE-FAILURE-FORM RULE IS NOT READ AS WIDER THAN IT IS:** **the
package throws a JS `TypeError` at REGISTRATION for a non-function, and that `TypeError` carries NO
`status` and NO `message` member.** **It is NOT a crossing failure: it never reaches the store, it is thrown
by the package's own registration helper before any verb is called, and the store's closed set is untouched
by it.** **A drive must therefore distinguish the TWO throw sites — `surface.md §2.5`'s `{status, message}`
for a verb, and this row's `TypeError` for a registration — and a `TypeError` thrown by a VERB is a
finding** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-14` — the failure channel names exactly
one JS form, for a VERB | declared parameter semantics]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 1 (`archive/gate3/storeroom-js-red-set.md` §5 item 1) AT THIS ROW.** `RCA-8(d)` ANNOTATE-BESIDE: **the
cells above stand byte-for-byte; THIS clause is the operative statement of the ONE cell the declaration of
a registration site moves, and it adds no row — `§1`'s `18`-row arithmetic and `contract.md §6`'s index are
UNCHANGED, and this reconciliation is a RE-DERIVATION of this row's own cells rather than a nineteenth
row.** **WHAT MOVED, AND WHY IT MOVED RATHER THAN BEING WIDENED SILENTLY:** **the row's `the values OUTSIDE
it` cell prints *"a function registered for a handle the package never returned or adopted"*, whose declared
answer read *"is held but can NEVER fire — a declared no-op and NOT a failure."* THAT CELL STOOD WHILE NO
REGISTRATION SITE WAS DECLARED; `contract.md §2.4` item 5 now declares one, and the site ADMITS THE HANDLE'S
OPAQUE SPELLING AND BY NOTHING ELSE — **so the operative reading, stated with its terms, is the
substitution below and NOT the as-filed sentence:** **the cell's `the declared answer for EACH outside value`
reads, from this date: *"A non-function `listener` → a JS `TypeError` at REGISTRATION, carrying NO `status`
and NO `message` member. A `handle` the package never returned or adopted — fabricated, a foreign
instance's, a prior session's, a bare `string`, a blank token, `null`, `undefined`, a non-opaque value or an
ABSENT argument — → the SAME JS `TypeError`, because `register`'s domain is the handles THIS INSTANCE minted
or adopted and its only in-domain key spelling is the OPAQUE one, so every other value is a MEMBER OF NO
REGISTRY and not a held-but-silent entry. A re-registration of a handle IN the domain → SUCCESS,
`undefined`, the previous function REPLACED. Nothing reaches the store in any of these cases."*`** **The
as-filed no-op reading stands ONLY where the as-filed text places it: at `unlisten`, whose no-op-success
answer for an unknown handle is `contract.md §2.3` item 4's and is NOT moved by this clause.** **AND ONE
CONSEQUENCE IS NAMED SO IT IS NOT READ AS A DEFECT: `PAR-JS-12`'s own invocation half is unaffected — a
registered function still fires or does not fire by `§2.4` rules 1 and 3, and `§2.7`'s firing window, order
rule and throwing-body rule are untouched** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-15`;
docs/specs/storeroom-js/contract.md §2.4 item 5; `DD-15` | declared parameter semantics]`).
**ITS `alt`, CARRIED FORWARD AND REPRICED BECAUSE THE SITE MOVED:** **holding an out-of-domain registration
silently, as the as-filed cell read** — priced: it would give `register` a no-op arm beside `unlisten`'s,
so a caller's typo and a caller's deliberate withdrawal would print the same observable, and `§2.4` rule 1's
silent-fire would stop being the ONLY silent arm in the registry; **and** admitting a bare `string` at
`register`'s first position — priced: it would make the registration site accept a spelling `unlisten`
declares UNKNOWN, so the two registration-side verbs would disagree about one value; **both available with a
fresh ruling, and the reversal instrument is a bounded amendment of `docs/specs/storeroom-js/`** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` | declared parameter semantics]`).

### §2.13 `PAR-JS-13` — the returned `op`, the `JournalOp` a write returns

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-13`** |
| `parameter` | **the `WriteResult.op` member** |
| `kind` | **`return-field`** |
| `unit` | **unitless** — one record |
| `domain` | **a fresh JS object carrying the store's own eight members: `{ opId: string, kind: 'write' | 'delete', address: Array<segment>, tier: 'file'|'mem'|'temp', before: { present: boolean, value: JS value }, after: { present: boolean, value: JS value }, seq: number, compacted: boolean }`** |
| `the values OUTSIDE it` | **an OPAQUE value** (a wrapped handle, a function) · a **member renamed, camel-cased or re-typed** · a **missing member** · a **live view into store memory** |
| `the declared answer for EACH outside value` | **None of them is reachable: the member is ALWAYS present on a successful write, ALWAYS a fresh JS value, and ALWAYS in the store's own member spellings.** **A caller that mutates the returned object does not reach the store, and the object does not reach the store's memory** |
| `supplier` | **the store, on every successful write** |
| `evaluator` | **the binding's own translation out (the deep copy out)** |
| `observable` | **the `opId` a later `rollback` accepts; the `before`/`after` halves; and the object's identity differing from the store's own record** |
| `the clause that declares it` | **`crossing.md §1.3`'s returned-record spellings** and **`contract.md §2.2`** |
| `the ruling that pins it` | **`A1`** (`A7`: the returned op is how the journal crosses) · **`A1`** (`A37`: the op's content duty) |
| `alt` | **an OPAQUE op handle** — priced at the store's own `DD-22`: the op must carry enough to reconstruct the original tree and resolve the current state, which an opaque handle cannot be shown to do |
| `park` | **—** (the op's crossing is `A63`'s surface and `A65`'s copy discipline, both settled) |

`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A3 docs/specs/storeroom-native/contract.md §6.2 · §0.4 |
declared parameter semantics]`

### §2.14 `PAR-JS-14` — the returned `watched`, the watched addresses

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-14`** |
| `parameter` | **the `WriteResult.watched` member** |
| `kind` | **`return-field`** |
| `unit` | **`count` — a count of ADDRESSES** |
| `domain` | **a fresh JS ARRAY of ADDRESSES, where each address is itself a JS array of segments.** **The empty array is IN the domain and means nothing was watched in the write's scope** |
| `the values OUTSIDE it` | **`undefined`** · **`null`** · **a `string[]`** (an address is a SEGMENT LIST and never a delimited string) · **a set of handles instead of addresses** · **a live view into store memory** |
| `the declared answer for EACH outside value` | **None of them is reachable: the member is ALWAYS an array, `[]` when nothing watched matched, NEVER `undefined` and NEVER `null`, and ALWAYS a fresh JS value of addresses** |
| `supplier` | **the store, on every successful write** |
| `evaluator` | **the binding's own translation out** |
| `observable` | **the address list returned after a write whose address a registration's own address is a prefix of, descendant-inclusive; and `[]` where nothing matched** |
| `the clause that declares it` | **`crossing.md §1.3`'s returned-record spellings** and **`contract.md §2.2`** |
| `the ruling that pins it` | **`A1`** (`A33`: *"Alerts if a write resolves to or through the matched address"*) · **`A1`** (`A37`: descendant-inclusive) |
| `alt` | **a `string[]` spelling** — priced at the store's own `§3.6`: a `string` could carry neither the EMPTY address nor an integer INDEX segment, both of which are legal watched addresses |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A3 docs/specs/storeroom-native/contract.md §3.6 · §6.5 |
declared parameter semantics]`

### §2.15 `PAR-JS-15` — the returned `triggered`, the triggered handles

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-15`** |
| `parameter` | **the `WriteResult.triggered` and `DeleteReceipt.triggered` member** |
| `kind` | **`return-field`** |
| `unit` | **`count` — a count of DISTINCT handles** |
| `domain` | **a fresh JS ARRAY of the package's OPAQUE handles, one per distinct handle the store returned.** **The empty array is IN the domain and means no listener triggered** |
| `the values OUTSIDE it` | **`undefined`** · **`null`** · **the raw token strings** · **a duplicated member** · **an ordered sequence asserted by a caller** · **a handle for a listener that did not trigger** |
| `the declared answer for EACH outside value` | **None of them is reachable: the member is ALWAYS an array of opaque handles, `[]` when nothing triggered, NEVER `undefined`; a member appears EXACTLY where its listener's address is a prefix of the triggering address; and NO ORDER IS ASSERTED — the caller may rely on MEMBERSHIP ONLY** |
| `supplier` | **the store, on every successful write and on every successful delete** |
| `evaluator` | **the binding's translation out, then the package's registry at delivery time** |
| `observable` | **the handle set a write and a delete each return; a `[]` array where no registration's address is a prefix; and the same set returned in a different enumeration order on a second run, which NO drive may treat as a failure** |
| `the clause that declares it` | **`contract.md §2.7`** and **`crossing.md §1.3`'s returned-record spellings** |
| `the ruling that pins it` | **`A1`** (`A43`: a `delete` FIRES) · **`A1`** (`A57`: the returned handle) · **`A1`** (`A58`) |
| `alt` | **a DECLARED ORDER (registration order first, address order as the runner-up)** — priced at the store's own `DD-37`: either spelling would need a monotonic ordinal the store's record does not carry |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A3 docs/specs/storeroom-native/contract.md §3.6 · §4.4 ·
§6.5 | declared parameter semantics]`

### §2.16 `PAR-JS-16` — the returned `tiers` on the delete receipt

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-16`** |
| `parameter` | **the `DeleteReceipt.tiers` member** (and the receipt's `address` member beside it) |
| `kind` | **`return-field`** |
| `unit` | **`count` — a count of tiers** |
| `domain` | **a fresh JS ARRAY of the three tier token strings, in the store's canonical order (`'file'`, `'mem'`, `'temp'`), naming the tiers whose versions were REMOVED.** **`[]` is IN the domain and means nothing was removed.** **The receipt's `address` member is the caller's own array VERBATIM, as a fresh copy** |
| `the values OUTSIDE it` | **`undefined`** · **`null`** · **a tier the target did not hold at** · **a relabelled or re-ordered array** · **the caller's own array object returned by reference** |
| `the declared answer for EACH outside value` | **None of them is reachable: the member is ALWAYS an array of tier tokens in canonical order, `[]` where nothing was removed; a tier NOT removed never appears; and the `address` member is a FRESH array equal to the caller's, never the caller's own object** |
| `supplier` | **the store, on every successful delete** |
| `evaluator` | **the binding's translation out** |
| `observable` | **the `tiers` membership after a one-tier delete, after a whole-target delete and after a delete that removed nothing; and the `address` member comparing set- and index-equal to the caller's array under `crossing.md §1.5`** |
| `the clause that declares it` | **`crossing.md §1.3`'s returned-record spellings** and **`contract.md §2.2`** |
| `the ruling that pins it` | **`A1`** (`A11`/`A12`: the delete's tier scope) · **`A1`** (`A19`: purge is a WRITE's act) |
| `alt` | **an ORDER-INSIGNIFICANT `tiers` array** — priced at the store's own `§4.4`: the canonical order is the store's own declaration and a JS-side re-ordering would make the receipt's content depend on the caller's realm |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A3 docs/specs/storeroom-native/contract.md §4.4 · §5.1 |
declared parameter semantics]`

### §2.17 `PAR-JS-17` — the thrown `{status, message}`, the failure channel's two members

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-17`** |
| `parameter` | **the thrown object's `status` and `message` members** |
| `kind` | **`error-code`** |
| `unit` | **unitless** — two strings |
| `domain` | **`status`: one of the store's closed `15` member tokens, as a JS `string`, verbatim.** **`message`: the store's generated message, a non-empty JS `string`** |
| `the values OUTSIDE it` | **an index, a numeric code** · **a lowercased or prefixed variant of a member** · **a package-minted code** · **an empty `message`** · **a hand-authored `message` carrying a placeholder** · **a third member** (`code`, `cause`, `stack`, `data`) · **a `status` that is not a `string`** |
| `the declared answer for EACH outside value` | **None of them is reachable: the exception object's member SET is exactly `{status, message}`, its prototype is the caller realm's `Object.prototype`, and both members are the store's own strings.** **A code the store returns that lies outside the closed set is passed through VERBATIM and re-mapped to nothing** |
| `supplier` | **the store — the code and the message are both its own** |
| `evaluator` | **the store's generator, then the binding's translation out** |
| `observable` | **the thrown object's `typeof`, its prototype, its member set, and the exact `status` token for each reachable failure** |
| `the clause that declares it` | **`contract.md §2.5`** |
| `the ruling that pins it` | **`A1`** (`A14`: *"a CLOSED SET OF STATUS CODES with GENERATED messages"*) · **`A1`** (`A63`: the surface's scope) · **`A1`** (`A64`: no discrimination rule) |
| `alt` | **a thrown `Error` subclass carrying the two members** — priced at `DD-12`: it adds a class the package must export and a `name` literal, and the store's own record declares exactly two members, so the subclass would be a translation of a record rather than the record; **and a returned tagged union** — priced: it makes every call site branch on the arm |
| `park` | **—** |

`[A1 docs/specs/storeroom-js-proposal.md §8 · A64; A3 docs/specs/storeroom-native/contract.md §8.1–§8.3 |
declared parameter semantics]`

### §2.18 `PAR-JS-18` — the constraint/repair pattern: a declared NON-parameter

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-18`** |
| `parameter` | **the constraint/repair pattern's own carrier — the `write` → `rollback` pair** |
| `kind` | **`vocabulary-token`** — **it is DECLARED as a USAGE PATTERN and NOT as a parameter, and no verb, option, seam or callback is declared for it** |
| `unit` | **unitless** |
| `domain` | **the pattern: evaluate constraints AFTER a `write` returns; on a violation, call `rollback` with the `JournalOp.opId` THAT WRITE RETURNED** |
| `the values OUTSIDE it` | **a CONSTRAINT VERB** · **a CONSTRAINT PARAMETER** · **a REPAIR VERB OR ROUTE** · **a FUNCTION-CARRYING PARAMETER at any position** · **a constraint record** |
| `the declared answer for EACH outside value` | **NONE OF THEM EXISTS AND NONE IS DECLARED: no verb, no parameter, no seam and no record carries a constraint or a repair in this unit, and the store's own surface takes no function at any position.** **A caller that wants constraints evaluates them itself and reverses a violation with `rollback`** |
| `supplier` | **the caller** — the JS side holds the constraint functions |
| `evaluator` | **the caller** — the evaluation is CLIENT-SIDE |
| `observable` | **a constraint evaluated after a write, a violation reversed by a `rollback` over the op the write returned, and the state the rollback restores** |
| `the clause that declares it` | **`contract.md §2.6`** |
| `the ruling that pins it` | **`A1`** (`A73`: *"Constraint/Repair is client-side, using rollback to reverse constraint violations."*) |
| `alt` | **a STORE-SIDE constraint surface** — priced at `DD-16`: the store declares no constraint surface and adding one is a STORE-SURFACE CHANGE, which the layout ruling's whole purpose is to avoid |
| `park` | **the constraint seam was the store's `P-1` material and `A73` settled it as client-side; no subject of this row is parked** |

`[A1 docs/specs/storeroom-js-proposal.md §15 · A73; A3 docs/specs/storeroom-native/contract.md §7.3 |
declared parameter semantics]`

---

**END OF THIS PART.** **Its `§1` is the contract's `§6` relocated WHOLE and its `§2` is its OWN authored
rows, which are its admissible content under the name-resolution table; it declares nothing the contract
does not already carry beyond those rows, and every authority citation is its own row's** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.6 and §C.6 — a carrier introduces no claim of its own,
and the `implementation-plan`/`parameter-semantics` footing | requirement]`).
