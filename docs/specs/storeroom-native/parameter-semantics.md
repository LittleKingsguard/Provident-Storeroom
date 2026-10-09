# Part — `parameter-semantics` (`U-STOREROOM-NATIVE`, prefix `D-GP-SNST`): one row per declared parameter, its domain, the values OUTSIDE that domain, and the declared answer for each

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-native/`** — authored at
  the gate-2 spec gate in the **same pass** as the contract document's index region and part map, whose
  `parameter-semantics` row declares it **KIND `carrier`** at the path
  `docs/specs/storeroom-native/parameter-semantics.md`.
- **The derivation clause this part reads through — one clause, carried by
  the contract document and NOT re-spelled here:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  (`docs/specs/storeroom-native/contract.md`, its status block; the middle dot `·` separates the slots). **Its
  authority is the FILED gate-1 record itself (that record's `decomposition` row and its `§4.1`); no unfiled
  process-rule path is cited, per `contract.md §0.1` item 7.**
- **WHAT THIS PART IS, AND WHAT IT DECLARES.** **This part is a `carrier`:** it holds the contract
  document's **`§9` index RELOCATED WHOLE** (`§1` below, with its `§`-number and its citations unchanged),
  **and it holds this unit's own AUTHORED parameter-semantics rows (`§2` below, `PAR-1`…`PAR-11`), which are
  this part's admissible content** — the parameter-semantics rows the spec-writer's wall requires **for
  EVERY declared parameter**. **The rows of `§2` carry no `§`-number and no claim the contract does not
  already make:** each row's meaning is the contract's own clause, cited in the row's `the clause it
  declares` cell, and **a row's answer cell never invents a behaviour** — where the contract is silent, the
  row names the `DD` design-default or the park that carries the silence.
  `[T: this part's own scope boundary | CONTRACT]`

## Scope boundary — the two regions this part carries

| Region | Its home | What it carries |
| --- | --- | --- |
| **`§9`** | `docs/specs/storeroom-native/contract.md §9` (**relocated, WHOLE, its `§`-number unchanged**) | the parameter-semantics index: one map entry per `PAR-n` row, naming where the parameter is declared and where its row lives |
| **`§2`'s `PAR-1`…`PAR-11`** | **this part's own authored rows** | for each declared parameter: its `kind`, its `unit`, its **domain**, **the values OUTSIDE that domain**, **the declared answer for each outside value**, its supplier, its evaluator, its observable, and the clause that declares it |

**RECORDED OMISSIONS (what this part does NOT carry, and why).** **This part carries no code, no arm, no
record shape and no prohibition that the contract document does not already declare** — a `PAR` row is a
**provenance row** (unit / domain / referent / evaluator, **uncapped**), **not
a second statement of the store's behaviour**. **In particular this part does NOT carry:** the record shapes
and the walk (`§1`–`§2`, at `store-model.md`) · the three verbs and the journal (`§3`, `§4`, `§6`, at
`write-and-read.md`) · the tier domain, the purge chain and the typed `P-*` register (`§5`, in the contract
document) · the construction inputs' construction clauses and the fail-code set (`§7`–`§8`, at
`seams-and-lifecycle.md`). **A reader seeking one of those is pointed, never served a second copy here.**
**AND THE PARAMETER-ROW SET IS NOT A REGISTER AND NOT A CENSUS OF PARTS:** the `PAR-n` rows are uncapped
provenance rows, **the typed `P-*` register is a separate surface with its own `≤ 8` cap** (which holds at
`8 ≤ 8`, `contract.md §5.2`–`§5.9`), and **no count in this part is a budget** (`contract.md` §0.1 item 5's
cap clause and §9's own uncapped-rows clause, both `T`-tagged in this directory).
**AND THE ROW SCHEMA AND THE `PAR-n` ROW SET'S OWN CENSUS ARE STATED IN THIS PART ALONE:** **the schema's
thirteen cells, the closed `kind` enum and the `2.3.2`-free vocabulary are declared at `§2`'s own head**, and
**the row count is `11` (`PAR-1`…`PAR-11`), with `9 + 1 + 1 = 11` printed at `§1` and at `§2`'s own close**;
**no count of this part is a budget for any other surface** (`[T: this part's own schema and census, stated
where they are read | CENSUS]`). **⟶ RECONCILED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; THE
SENTENCES ABOVE STAND BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE ROW COUNT OF THIS PART)** (`RCA-8(d)`
ANNOTATE-BESIDE): **THE AS-FILED CELL READ:** *"the row count is `11` (`PAR-1`…`PAR-11`), with `9 + 1 + 1 =
11` printed at `§1` and at `§2`'s own close"* **and the scope-boundary table above reads `§2`'s
`PAR-1`…`PAR-11`.** **THE OPERATIVE COUNT: `§2`'s authored row set is `14` rows, `PAR-1`…`PAR-14` —
`PAR-1`…`PAR-11` as filed plus `PAR-12` (`cfg.listeners[]`), `PAR-13` (the listener's `handle`) and `PAR-14`
(the store's two per-node listener reference lists), authored at this contract's sixth bounded amendment (the
listener amendment) — each row living at `§2.12`, `§2.13` and `§2.14` of this part, and closing as
`12 + 1 + 1 = 14` with its terms at this part's own closing arithmetic clause.** **NO ROW IS DROPPED OR
RENUMBERED BY THIS CLAUSE, the `11` stands byte-for-byte above as the as-filed count, and the `§9` index's
relocation is reconciled to the same `14` at its own dated clause** (`[T: this part's own row count, restated
with its terms at the proofreading gate | CENSUS]`).
`[T: this part's omissions and the two surfaces' separation; `contract.md` §0.1 items 5 and 10(a)–(b) |
CONTRACT]`

---

## §1. The parameter-semantics index (relocated WHOLE from `contract.md §9`)

**One row per declared parameter, carrying its unit, its domain (and the values outside it), the declared
answer for EACH outside value, its supplier, its evaluator and its observable.** **The rows are
`PAR-1`…`PAR-11` and they live at `docs/specs/storeroom-native/parameter-semantics.md` `§2`** — this section
is the index, and **every row below is one map entry, not a restatement.**

| Row | The parameter | Where it is declared | Its row's home |
| --- | --- | --- | --- |
| **`PAR-1`** | `address` — the required path argument | `§1.5` (grammar), `§3.2` (walk), `§4.3` (delete) | `parameter-semantics.md §2 · PAR-1` |
| **`PAR-2`** | `tier` on `read` / `findAddress` / `watch` — optional, zero-to-many | `§3.1.1`'s arity table, `§2.3` | `parameter-semantics.md §2 · PAR-2` |
| **`PAR-3`** | `tier` on `write` — required, exactly one | `§3.1`, `§3.1.1` | `parameter-semantics.md §2 · PAR-3` |
| **`PAR-4`** | `tier` on `delete` — optional, exactly one when present | `§4.3`, `§3.1.1` | `parameter-semantics.md §2 · PAR-4` |
| **`PAR-5`** | `value` — the written value's taxonomy | `§1.4`, `§3.1` | `parameter-semantics.md §2 · PAR-5` |
| **`PAR-6`** | `cfg.filePath` — the `file` tier's external location | `§7.1`, `§7.2` | `parameter-semantics.md §2 · PAR-6` |
| **`PAR-7`** | `cfg.journalLength` — the journal's configured length, in ENTRIES | `§7.1`, `§6.1` | `parameter-semantics.md §2 · PAR-7` |
| **`PAR-8`** | `address` on `watch` / the opaque `WatchHandle` | `§6.5` | `parameter-semantics.md §2 · PAR-8` |
| **`PAR-9`** | the listener body and the JS-facing listener surface | **DECLARED as PARKED, not as a parameter this contract carries** (`§6.5`; `DD-23`) | `parameter-semantics.md §2 · PAR-9` |
| **`PAR-10`** | `opId` on `rollback` — the op's identity | `§6.2` (`opId`), `§6.3`, `§6.4` | `parameter-semantics.md §2 · PAR-10` |
| **`PAR-11`** | the `secure` instance's `file` floor | **DECLARED as CLIENT-SIDE and NOT a store parameter** (`DD-15`; `P: §14 · A32`) | `parameter-semantics.md §2 · PAR-11` |

**ARITHMETIC, PRINTED WITH ITS TERMS: the parameter-semantics set is `11` rows (`PAR-1`…`PAR-11`), of
which `9` are parameters this contract DECLARES the store as carrying, `1` (`PAR-9`) is a parameter declared
PARKED, and `1` (`PAR-11`) is a floor declared CLIENT-SIDE — `9 + 1 + 1 = 11` ✓.** **Every parameter the
store's surface declares has a row, and no parameter outside this list exists** (`[T: the parameter set's
closure | CENSUS]`). **The parameter-semantics rows are UNCAPPED** (the cap binds the typed register and
nothing else — `contract.md §0.1` item 5 and `contract.md §9`'s own separation clause), **and they are not
the register's rows — the two are different surfaces.**
`[T: §9's index; `contract.md` §0.1 item 10(a) (the relocated span's citation form) | CONTRACT]`

---

## §2. The `PAR-n` rows — every declared parameter, its domain, and its outside values

**THE ROW SCHEMA, STATED ONCE, SO EVERY ROW BELOW IS READ THE SAME WAY.** **Each row carries thirteen
cells**, and **each cell is mandatory**: `id` · `parameter` · `kind` · `unit` · **`domain (and the values
outside it)`** · **`the declared answer for EACH outside value`** · `supplier` · `evaluator` · `observable` ·
`the clause that declares it` · `the ruling that pins it` · `alt` (the priced alternative where the row's
carrier is a declared default) · `park` (the park that holds the row's silence, where one does).
`kind` is read from the **closed seven-value enum** `parameter` | `option` | `seam` | `callback` |
`return-field` | `error-code` | `vocabulary-token`. **The `alt` and `park` cells are `—` where the row's
carrier is a ruling rather than a default or a park** (`[T: the row schema, this part's own declaration;
the row's column vocabulary is stated HERE and not cited to an identifier-table section the adoption dossier
does not carry — the dossier's operative records are its `§1`/`§1-bis`/`§1-ter` identifier tables and its
`§3-ter` amendments row, and no `§2.3.2` exists in it | CONTRACT]`).
**AND THE ONE RULE EVERY ROW OBEYS:** **the `the declared answer` cell is never empty and never says
`TBD`** — **for each value the row lists as OUTSIDE the domain, an answer is printed, and where the
contract's answer is a code, the code is a member of the closed `14`-member set at
`seams-and-lifecycle.md §8.1`.** **⟶ AMENDED 2026-10-11: the set is now the closed `15`-MEMBER set at that
section (`FilePathUnreachable` at rank `13`, the listener amendment's added member), and THIS SENTENCE'S
RULE IS UNMOVED — every code any row of this part prints is a member of that set, and `0` rows print a code
outside it** (`[T: the rule's restatement, with the as-filed figure named | CENSUS]`).

### §2.1 `PAR-1` — `address`, the required path argument

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-1`** |
| `parameter` | **`address`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a segment list |
| `domain` | **a JS/JSON array of segments, where each segment is a `string` (a key) or a non-negative integer (an index).** **The empty array is IN the domain** (`P: §13 · A25`) |
| `the values OUTSIDE it` | `null` · `undefined` · a non-array (`number`, `string`, `boolean`, `object`, a function) · an array containing a negative integer · an array containing a non-integer `number` · an array containing `null`/`undefined`/a `boolean`/an `object`/an array/a function |
| `the declared answer for EACH outside value` | **`AddressMalformed` for every one of them, with the generated message of `seams-and-lifecycle.md §8.2`; and an ABSENT `address` argument answers `AddressMalformed` as well** (a required argument is missing) |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the walk)** |
| `observable` | **a walk that resolves at depth `0`, `1` and `n`, and that fails with the closed code at each of its arm's states** — `store-model.md §2.2` |
| `the clause that declares it` | **`store-model.md §1.5`** and **`store-model.md §2.2`** |
| `the ruling that pins it` | `P: §1` (the address clause) · `P: §13 · A23` · `P: §13 · A25` |
| `alt` | the `""`-refusal and the coercion alternatives, priced at `contract.md §0.2 · DD-24(c)` |
| `park` | **—** (an address crosses no boundary in this unit) |

`[P: §1, §13 · A23 · A25; L: §1-bis · address; T | CONTRACT]`

### §2.2 `PAR-2` — `tier` on `read` / `findAddress` / `watch`: optional, zero-to-many

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-2`** |
| `parameter` | **`tier`** (the reader's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **ABSENT, or a set of ZERO TO MANY members of `{file, mem, temp}`**, supplied as either a single token or an array of tokens. **The array is an ANY-MATCH set: it is not a union of values, not an ordered preference and not a filter** (`R: §15.2`) |
| `the values OUTSIDE it` | a token outside `{file, mem, temp}` (e.g. `secure`, `FILE`, `disk`, `session`, `""`) · a non-string member of the array · `null` · `undefined` · a non-string, non-array scalar of another type · an object |
| `the declared answer for EACH outside value` | **`OutOfDomainTier` for every token or member outside the domain, and for a non-string/non-array argument; `AddressMalformed` when the argument is `null` or `undefined`** (the shape is not a tier value at all). **These two answers are `write-and-read.md §3.1.1`'s `read`/`findAddress`/`watch` rows' OWN CELLS — the `null`/`undefined` column and the out-of-domain-token column — so the census and this row agree cell by cell** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the walk's selection, then the read's assembly)** — `[T: the evaluator cell's reconciliation, with the as-filed form named \| CONTRACT]` **⟶ RECONCILED 2026-10-11: the as-filed cell read exactly that and it stands; the two acts' scope is now stated so *"then the read's assembly"* is not read as a second walk. THE WALK's selection is `store-model.md §2.2`/`§2.3`: the passed set is applied AT EVERY WALK STEP — the addressed step and every pass-through step — and a step at which the key exists but no passed tier matches answers `TierNotFound`. THE ASSEMBLY's selection is `write-and-read.md §4.2`: the same set is applied PER ADDRESS at each step of the assembly's recursive walk, and a key for which the set selects NO version contributes NO MEMBER — it is OMITTED, the read answering NO code for it. THE WALK HALF IS UNMOVED (`H-1`'s finding stands closed); the OMISSION half is the contract document's `§0.2 · DD-31`** |
| `observable` | **a tier-qualified read answering one version where an unqualified read answers another** — `write-and-read.md §4.1`, `contract.md §5.2 · P-IM-1` |
| `the clause that declares it` | **`write-and-read.md §3.1.1`** (the arity table) and **`store-model.md §2.3`** (the selection rule) |
| `the ruling that pins it` | `P: §13 · A24` · `P: §14 · A28` · `P: §14 · A29` · `P: §11 · A11` |
| `alt` | the ordered-preference alternative, priced at `contract.md §0.2 · DD-12`'s neighbourhood |
| `park` | **—** (the tier argument crosses no boundary in this unit) |

`[P: §1, §11 · A11, §13 · A24, §14 · A28 · A29; L: §1-bis · tier | CONTRACT]`

### §2.3 `PAR-3` — `tier` on `write`: required, exactly one

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-3`** |
| `parameter` | **`tier`** (the writer's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **EXACTLY ONE member of `{file, mem, temp}`** — a single string token, present, never an array |
| `the values OUTSIDE it` | **ABSENT** · `null` · `undefined` · a token outside the three (e.g. `secure`, `FILE`, `disk`) · a non-string · **an array of `0` tokens** · **an array of `1` token** · **an array of `≥ 2` tokens** |
| `the declared answer for EACH outside value` | **ABSENT → `AddressMalformed`** (a required argument is missing). **`null`/`undefined` → `AddressMalformed`.** **Any token outside the three, and any non-string → `OutOfDomainTier`.** **Any array, of any length including `1` → `OutOfDomainTier`** (the array spelling is the READER'S arity and not the writer's). **`write-and-read.md §3.1.1`'s `write` row prints all four answers as its own cells** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the write's arm selection and the minted anchors' property)** |
| `observable` | **`P-SM-4`'s landing half: after any successful write, every anchor the write minted carries the caller's single tier** — **`contract.md §5.4`'s `P-SM-4` row (a)** (**⟶ REPOINTED 2026-10-11: the as-filed form named the row id *and* the bare number; the number `§5.4` is printed twice in the contract document — the row and the purge chain, `contract.md §5.2`'s dual-mapping disclosure — so the possessive names the ROW**) |
| `the clause that declares it` | **`write-and-read.md §3.1`** and **`write-and-read.md §3.1.1`** |
| `the ruling that pins it` | `P: §13 · A24` (*"Exactly one required on write"*) · `P: §14 · A27` (the tier is carried by anchors) · `P: §11 · A10` |
| `alt` | accepting a length-`1` array on write, priced at `write-and-read.md §3.1` |
| `park` | **—** |

`[P: §11 · A10, §13 · A24, §14 · A27 | CONTRACT]`

### §2.4 `PAR-4` — `tier` on `delete`: optional, exactly one when present

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-4`** |
| `parameter` | **`tier`** (the deleter's side) |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a persistence label |
| `domain` | **ABSENT** (which removes every version at the target and all downstream) **or EXACTLY ONE member of `{file, mem, temp}`** |
| `the values OUTSIDE it` | **an array of any length** (including `0` and `1`) · a token outside the three · a non-string · `null` · `undefined` |
| `the declared answer for EACH outside value` | **Any array → `OutOfDomainTier`; any out-of-domain token → `OutOfDomainTier`; a non-string → `OutOfDomainTier`; `null`/`undefined` → `AddressMalformed`.** **NOTE, printed so the absence of a case is not read as a gap: a delete naming a tier that the target does NOT hold is NOT an outside value — it is the in-domain `D-3` arm, it removes nothing, and it is a SUCCESS returning `tiers: []`** (`write-and-read.md §4.4`). **`write-and-read.md §3.1.1`'s `delete` row prints these answers as its own cells** |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the delete's arm selection)** |
| `observable` | **the `DeleteReceipt.tiers` membership and the surviving sibling versions** — `contract.md §5.8 · P-TP-8` (the `D-1`/`D-3` pair) |
| `the clause that declares it` | **`write-and-read.md §4.3`** and **`write-and-read.md §4.4`** |
| `the ruling that pins it` | `P: §1` (the delete clause) · `P: §11 · A12` · `P: §11 · A11` |
| `alt` | accepting a tier **set** on delete, priced at `write-and-read.md §4.3` |
| `park` | **—** |

`[P: §1, §11 · A11 · A12 | CONTRACT]`

### §2.5 `PAR-5` — `value`, the written value's taxonomy

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-5`** |
| `parameter` | **`value`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — any admitted literal, or a JSON object/array |
| `domain` | **exactly four classes: a `string`; a `boolean`; a finite JSON number; a plain JSON object or a plain JSON array** — `store-model.md §1.4` |
| `the values OUTSIDE it` | `null` · `undefined` · a function · a symbol · a `BigInt` · `NaN` · `±Infinity` · a cyclic object · a class instance · a `Map`/`Set`/typed array · any other non-plain collection |
| `the declared answer for EACH outside value` | **`ValueNotAdmitted` for every one of them, with no node minted, no container changed and no journal entry appended** — and **the KIND-CONTRADICTING case is a DIFFERENT answer: an admitted value whose kind contradicts the target container fails `ContainerKindConflict`, not `ValueNotAdmitted`** (`store-model.md §1.4`) |
| `supplier` | **the caller, per call** |
| `evaluator` | **the store (the taxonomy check, then the node-kind decision)** |
| `observable` | **the write→read round trip over all four classes, and the `ValueNotAdmitted` drive for each outside class** — `contract.md §5.2 · P-IM-1`, `§5.9 · P-TP-9` |
| `the clause that declares it` | **`store-model.md §1.4`** and **`write-and-read.md §3.1`** |
| `the ruling that pins it` | `P: §1` (*"any primitive/literal format, but not objects/dicts/arrays or other collections"*) · `P: §11 · A14` (the carrier) |
| `alt` | admitting `null` and the other excluded classes, priced at `contract.md §0.2 · DD-24(e)` |
| `park` | **—** |

`[P: §1, §11 · A14; T: the taxonomy's closure | DECLARED-DEFAULT]`

### §2.6 `PAR-6` — `cfg.filePath`, the `file` tier's external location

**⟶ AMENDED 2026-10-11 — THE PARAMETER BECOMES OPTIONAL AND GAINS A REACHABILITY DOMAIN (`A49`, `A52`,
`A53`, `A54`, `A55`; `RCA-8(d)` ANNOTATE-BESIDE: the as-filed row above stands byte-for-byte and THIS row
is the operative one; `DD-40` and the narrowed `DD-17` carry the alternative and the reversal).**

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-6`** |
| `parameter` | **`cfg.filePath`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a filesystem path string |
| `domain` | **ABSENT, or a non-empty `string` naming a path that PASSES THE CONSTRUCTION-TIME REACHABILITY TEST** — *"the file exists or … the application can write it successfully"* (`A52`), read with `A55`'s **DRY RUN** (the probe writes nothing) and its **WRITE-ACCESS requirement**. **NEITHER arm has a default; the ABSENT arm fixes the register's tier at `mem`** (`A49`, `A50`) |
| `the values OUTSIDE it` | **`null`** · **`undefined`** · **`""`** · **a non-string** · **a string that FAILS the reachability test** — the last in three named forms: **the path's PARENT DIRECTORY does not exist** · **the path or its directory is not writable (an EXISTING BUT READ-ONLY file is the canonical case)** · **the path IS a directory** (`DD-40`). **⟶ AMENDED: ABSENT is NO LONGER an outside value** |
| `the declared answer for EACH outside value` | **ABSENT → NO FAILURE: the path is legal, the register is created at `mem` and the store is returned** (`A49`). **`null` / `undefined` / `""` / a non-string → `AddressMalformed`** (an argument of the wrong SHAPE), **NO instance returned**. **A string that fails the reachability test → `FilePathUnreachable` (`seams-and-lifecycle.md §8.1` #13), NO instance returned, and NOTHING created by the probe** (`A53`; `A54`'s naming; `A55`'s dry run). **NO case answers `ConstructionArgumentMissing` any longer: that member's one remaining trigger is an absent `journalLength`** (`§8.1` #12) |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction (the probe, then the register's tier fixity)** |
| `observable` | **`P-TP-7`'s amended construction drives: a returned instance for the ABSENT and the REACHABLE-PATH states; a thrown `FilePathUnreachable` and NO instance for each of the three unreachable forms; and — the fixity's own observable — the register's tier READ BACK from the empty address's reference (`store-model.md §2.1`'s amended clause) unchanged after any write, delete, rollback or re-boot** (`A50`; `DD-34`) |
| `the clause that declares it` | **`seams-and-lifecycle.md §7.1`** (the amended construction sequence, steps 3–4) and **`seams-and-lifecycle.md §7.2`** |
| `the ruling that pins it` | `P: §11 · A16` (*"File path is passed to store on first creation"*) · `P: §15 · A49` · `P: §15 · A50` · `P: §16 · A52` · `P: §16 · A53` · `P: §16 · A54` · `P: §17 · A55` |
| `alt` | **(both of the amendment's priced alternatives live in the same row): a CONSTRUCTION FAILURE DEFERRED to first use — priced at `contract.md §0.2 · DD-17`, whose as-filed cell is read through its narrowed form; and a PROBE THAT CREATES what it finds (a creatable-path arm, or a directory-state arm with its own member) — priced at `contract.md §0.2 · DD-40`** |
| `park` | **the path's ORIGIN** — *"where that path comes from at first creation"* — is `docs/pending.md` `P-1`'s, and **no clause of this contract reaches it** (`R: §17.4` condition 2) |

`[P: §11 · A16, §14 · A31, §15 · A49 · A50 · A51, §16 · A52 · A53 · A54, §17 · A55; R: §17.4; T: the amended
row, with the as-filed row named and nothing deleted | CONTRACT + 1 PARK]`

### §2.7 `PAR-7` — `cfg.journalLength`, the journal's configured length

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-7`** |
| `parameter` | **`cfg.journalLength`** |
| `kind` | **`parameter`** |
| `unit` | **`count` — a count of journal ENTRIES**, and **not a count of bytes, of operations per address, or of milliseconds** |
| `domain` | **a positive integer (`≥ 1`)** — **REQUIRED, with NO default.** **Its VALUE is the caller's, so this unit owes no value** (`R: §17.3`: *"the value's OWNER is the caller"*) |
| `the values OUTSIDE it` | **ABSENT** from `cfg` · `0` · a negative integer · a non-integer `number` (e.g. `1.5`, `NaN`, `±Infinity`) · a non-number (`string`, `boolean`, `null`, `undefined`, an object) |
| `the declared answer for EACH outside value` | **ABSENT → `ConstructionArgumentMissing`.** **Present but out of domain → `AddressMalformed`.** **In BOTH cases NO store instance is returned.** **No default is fabricated and no clamping occurs** — `seams-and-lifecycle.md §7.1`, `contract.md §0.2 · DD-16` |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction, and then the journal's append trigger** |
| `observable` | **after `n + 1` appends with `journalLength = n`, at most `n` entries remain un-compacted and the oldest are `compacted`** — `write-and-read.md §6.1` item 5 |
| `the clause that declares it` | **`seams-and-lifecycle.md §7.1`** and **`write-and-read.md §6.1`** (items 4–5) |
| `the ruling that pins it` | `P: §9 · A5` (the configured length; older entries above it compress) · `P: §14 · A31` (*"Required as args on store creation"*) |
| `alt` | a **defaulted** length, priced at `contract.md §0.2 · DD-16` — the alternative is unavailable while `A31` names the caller as the value's owner |
| `park` | **—** (the length is a construction argument and not a crossing) |

`[P: §9 · A5, §14 · A31, §15 · A35; R: §17.3 | CONTRACT]`

### §2.8 `PAR-8` — `address` on `watch`, and the opaque `WatchHandle`

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-8`** |
| `parameter` | **`address`** (as the watched address) **and the returned `WatchHandle`** |
| `kind` | **`seam`** — the registration surface, whose returned handle is a **`return-field`** |
| `unit` | **unitless** (the address) · **unitless and opaque** (the handle) |
| `domain` | **the watched address has `PAR-1`'s domain**; the optional tier has **`PAR-2`'s domain**; **the returned `WatchHandle` is OPAQUE, non-empty, and is the only value `unwatch` accepts** |
| `the values OUTSIDE it` | for `address`: **every value outside `PAR-1`'s domain** · for `tier`: **every value outside `PAR-2`'s domain** · for `handle`: **a value the store did not return from a `watch` call** |
| `the declared answer for EACH outside value` | **`address` outside → `AddressMalformed`; a `tier` outside → `OutOfDomainTier`; an unknown or foreign `handle` → NOT a failure: `unwatch` is a no-op SUCCESS** (`write-and-read.md §6.5` item 6) |
| `supplier` | **the caller, per call** (the address and its tier); **the store** (the handle) |
| `evaluator` | **the store (the watched set, and the prefix test at a successful write)** |
| `observable` | **`P-TP-8`'s drive: register at the write's own address, at a strict ancestor, at a strict descendant and at an unrelated address, and assert the returned set is exactly `{own, ancestor}`** — `contract.md §5.8` |
| `the clause that declares it` | **`write-and-read.md §6.5`** |
| `the ruling that pins it` | `P: §9 · A7` (*"track the event listeners and pass a list of watched addresses"*) · `P: §14 · A33` · `P: §15 · A37` |
| `alt` | an ordered, callback-invoking, non-opaque surface — priced at `contract.md §0.2 · DD-23`; **its attachment rule (by address or by identity) is NOT this contract's to choose** |
| `park` | **`docs/pending.md` `P-3`** — the attachment rule is `P-3`'s, and this contract declares only that the registration is keyed by the watched ADDRESS (`R: §17.1`) |

`[P: §9 · A7, §14 · A33, §15 · A37, §16 · A38; R: §17.1 | CONTRACT + 1 PARK]`

### §2.9 `PAR-9` — the listener body and the JS-facing listener surface: DECLARED PARKED

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-9`** |
| `parameter` | **the listener body (the callback) and the JS-facing listener surface** |
| `kind` | **`callback`** — **declared as the KIND the parked subject would have, NOT as a parameter this contract carries** |
| `unit` | **`n/a` — no callable is declared**: this contract declares **no** signature, **no** arity, **no** return and **no** throw behaviour for a listener body |
| `domain` | **EMPTY BY DECLARATION** — **this contract's domain for the listener body is the empty set, because the parameter itself is deferred.** **The nearest live clause is `write-and-read.md §6.5`'s selection rule, which concerns the ADDRESSES returned and never the callable** |
| `the values OUTSIDE it` | **every value** — because **the parameter is not in this contract's declared surface at all** |
| `the declared answer for EACH outside value` | **NO store-side answer exists, and none is invented: the store neither invokes nor validates a listener body.** **The store's own clause is that a write RETURNS the watched-address list; WHAT the host does with it is `P-1`'s, and WHETHER a body throws is `P-3`'s** |
| `supplier` | **the host — and the host's wiring is `docs/pending.md` `P-1`'s** |
| `evaluator` | **nobody inside this unit** — **there is no in-store evaluator for a callable, and that is the declaration** |
| `observable` | **NONE in this unit.** **The observables that DO exist are the list's MEMBERSHIP (`P-TP-8`) and the store's TRACKING of registrations (`write-and-read.md §6.5`)** |
| `the clause that declares it` | **`write-and-read.md §6.5`** (items 1–6) and **`seams-and-lifecycle.md §10.1`** |
| `the ruling that pins it` | `P: §9 · A7` (the tracking and the list) · `P: §16 · A38` (*"Defer listener implementation"*) — **read at `R: §17.1`'s boundary determination: the store's production of the list SURVIVES; the listener's implementation is PARKED** |
| `alt` | a full listener surface with order, attachment and firing — priced at `contract.md §0.2 · DD-23`; **reading the park as a closure of the store-side duty is a finding** |
| `park` | **`docs/pending.md` `P-3` — THE LISTENER IMPLEMENTATION**, owner the architect, positive revisit condition *the store passes its own test suite* (`R: §17.1`) |

**⟶ AMENDED 2026-10-11 (THE LISTENER-AMENDMENT PROOFREADING GATE, `role_proofreader`; EVERY CELL ABOVE STANDS BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE STATE OF THIS ROW — THE PARK THE ROW NAMES HAS BEEN LIFTED AND THE SURFACE IT CALLS PARKED HAS BEEN SPECIFIED)** (`RCA-8(d)` ANNOTATE-BESIDE; **the superseded readings are quoted in their own words so nothing the cells above said is lost**):

- **THE CELLS ABOVE READ** *"`kind` — `callback` … **declared as the KIND the parked subject would have** …"* · *"`domain` — **EMPTY BY DECLARATION** … the parameter itself is deferred"* · *"`the declared answer for EACH outside value` — **NO store-side answer exists, and none is invented** … WHETHER a body throws is `P-3`'s"* · *"`observable` — **NONE in this unit**"* · *"`park` — `docs/pending.md` `P-3` … owner the architect, positive revisit condition *the store passes its own test suite*"* · **and the cell that declares the row** names **`write-and-read.md §6.5` items 1–6**.
- **THE OPERATIVE STATE, IN THE AMENDMENT'S OWN TERMS: `P-3` IS LIFTED (`A44` — *"Yes, this is the listener unpark"*, filed at `docs/specs/storeroom-listeners-proposal.md §10`), so the park this row leans on no longer stands and the `domain EMPTY BY DECLARATION` may be — and is — re-declared live.** **THE LISTENER SURFACE IS SPECIFIED AND THE STORE'S OWN SIDE OF IT IS `§6.5` ITEMS 8–13: ONE HOME MAP (item 8) · THE TWO PER-NODE REFERENCE LISTS (item 9, and `PAR-14` below) · THE LISTENER RECORD `{ address, handle }` BOUND BY ADDRESS (item 10, `A57`) · `listen`/`unlisten` (item 11) · THE HANDLE AND ITS UNIQUENESS DOMAIN (item 12, **`PAR-13` below**) · THE FIRING MODEL, WHICH IS RETURN-BY-HANDLE AND NOT AN INVOCATION (item 10, `A57`: **the store RETURNS the triggered handles and the CLIENT invokes**) · AND THE TRIGGER EVENTS, WHICH ARE `write` AND `delete` AND NEVER A READ (`A43`).**
- **WHAT THAT MOVES IN THIS ROW'S OWN CELLS, EACH NAMED: `domain` is no longer empty by declaration** — the amendment's live subject is the listener ARRAY's element, declared at **`PAR-12`**; **a listener's `handle`** and every one of its outside values are declared at **`PAR-13`**; **the two per-node lists** are declared at **`PAR-14`**; **and the ANSWER to a triggered listener is a RETURNED HANDLE SET, so *"NO store-side answer exists"* is superseded for `write` and `delete` and stands for a READ, which fires nothing.** **AND THE CALLABLE ITSELF IS STILL NOT THIS UNIT'S: `A57`'s firing model means the store never invokes a body, so `J-67`'s throwing body has no subject inside the unit and the CROSSING of a returned handle to a JS consumer remains `P-1`'s** (the amendment's `§18` (2) and (4); `docs/pending.md` `P-1`).
- **THE ROW'S CITATION THEREFORE MOVES WITH ITS SUBJECT: the clause that declares it is `write-and-read.md §6.5`'s supersession clause with items 8–13, as the amendment's dated clauses state them, and the shipped items 1–6 stand as the superseded stopgap's own clauses (`A58`)** — **NO CELL IS DELETED AND THE SHIPPED ITEMS' TEXT IS UNTOUCHED.** **`parameter-semantics.md §2.9` IS STILL THE ROW'S ADDRESS AND `PAR-9` IS STILL ITS ID: no row is added, dropped or renumbered, and this part's closing arithmetic already reads `14` rows with its terms.**
- **NO ROW OF THE REGISTER MOVES, `0` CELLS READ `TBD`, AND NOTHING PARKED IS REPORTED GREEN OR DRIVEN** — **the listener surface's drives are the red set's, and this pass writes no `tests/**` byte** (`[T: this row's operative state, with the lift named and each superseded reading quoted | CONTRACT]`).

`[P: §9 · A7, §16 · A38; R: §17.1; T: the parked row's declaration | CONTRACT + 1 PARK]`

### §2.10 `PAR-10` — `opId` on `rollback`, the op's identity

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-10`** |
| `parameter` | **`opId`** — the argument of `rollback`, and the `JournalOp.opId` member a write returns |
| `kind` | **`parameter`** (its returned counterpart is a **`return-field`**) |
| `unit` | **unitless** — an identity token |
| `domain` | **a non-empty `string` that the INSTANCE'S OWN journal holds** — **uniqueness is per instance and per session**; the id is produced by the store, never minted by the caller |
| `the values OUTSIDE it` | **ABSENT** · `null` · `undefined` · `""` · a non-string · **a well-formed string the instance's journal does NOT hold** (a foreign instance's id, a replayed id from a prior session, a fabricated id) |
| `the declared answer for EACH outside value` | **`""` and a non-string → `AddressMalformed`** (a malformed identity argument); **`null`/`undefined`/ABSENT → `AddressMalformed`**; **a non-empty string the journal does not hold → `JournalOpUnknown`**; **a string naming an op whose SCOPE includes a `compacted` entry → `RollbackCompacted`** (the three answers are distinct and each is a member of `seams-and-lifecycle.md §8.1`'s closed set). **All four answers are `§8.1`'s OWN MEMBERS — `AddressMalformed` (#1) for the blank, the non-string and the two shape-less values, `JournalOpUnknown` (#10), `RollbackCompacted` (#11)** |
| `supplier` | **the store** (the id is minted by the store and returned on the write); **the caller only passes it back** |
| `evaluator` | **the store (the journal's lookup and the scope walk)** |
| `observable` | **`P-TP-8`'s second drive: the `opId` a write returned is accepted by `rollback`, and the `undoneOps` list is returned newest-first** — `contract.md §5.8`, `write-and-read.md §6.3` |
| `the clause that declares it` | **`write-and-read.md §6.2`** (the `opId` member), **`write-and-read.md §6.3`** (the `rollback` signature) and **`write-and-read.md §6.4`** (`M-7`, `M-11`) |
| `the ruling that pins it` | `P: §15 · A37` (*"be id'ed for rollback"*) · `P: §9 · A7` (the op crosses as a returned value) |
| `alt` | an OPAQUE handle instead of a declared string id, priced at `contract.md §0.2 · DD-22`; **and the id's TYPE is contract carriage by the ruling's own consequence clause** (`R: §17.3`, `J-66`) |
| `park` | **—** (the id's boundary crossing is `P-1`'s, and this contract declares its in-store type) |

`[P: §9 · A7, §15 · A37; R: §17.3; T | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THIS ROW'S `domain` CELL'S *"uniqueness is per instance and per session"*
SPELLING IS READ THROUGH `§0.4`'s PROCESS SCOPE, AND THE ROW'S OWN OUTSIDE VALUE IS CONFIRMED UNMOVED**
(`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte, the *"uniqueness is per instance and
per session"* clause included, and THIS clause is the operative statement of what that spelling resolves
to**; `contract.md §0.4` clause 2's dated clause and `contract.md §6.2`'s dated clause; `P: §13 · A69`;
`[T: the row's domain spelling, reconciled beside the cell that prints it | CROSS-REF]`): **THE AS-FILED
`domain` CELL READS** *"**a non-empty `string` that the INSTANCE'S OWN journal holds** — **uniqueness is per
instance and per session**; the id is produced by the store, never minted by the caller"*. **THE OPERATIVE
READING, IN TWO CLAUSES:** **(1)** **the id's uniqueness is satisfied by the SAME PROCESS-GLOBAL MINT that
mints `handle`s, so the id is unique PER INSTANCE, PER SESSION *and* PER PROCESS — and what THIS row's
`domain` cell asserts is the REACH a caller may rely on, which the *"INSTANCE'S OWN journal"* half of the
same cell already fixes: an id names an entry in the journal OF THE INSTANCE THAT RETURNED IT, and the
journal is per-instance (`write-and-read.md §6.1` item 2)**; **(2)** **the outside value
*"a well-formed string the instance's journal does NOT hold (a foreign instance's id, a replayed id from a
prior session, a fabricated id)"* and its declared answer `JournalOpUnknown` are UNMOVED BY THIS CLAUSE —
the row needs no conditional, because a foreign instance's id and a prior session's id name an entry in
ANOTHER journal and this instance's lookup reaches only its OWN** (`write-and-read.md §6.4` `M-11`; the
standing cell `tests/journal_and_rollback.rs`'s `par_10_a_foreign_instance_s_op_id_fails_journal_op_unknown`
asserts exactly this and is untouched). **NO CELL OF THIS ROW IS DELETED, NO CODE IS ADDED TO OR REMOVED
FROM `seams-and-lifecycle.md §8.1`'s closed `15`-member set, AND NOTHING THE CALLER MAY RELY ON NARROWS.**

### §2.11 `PAR-11` — the `secure` instance's `file` floor: DECLARED CLIENT-SIDE

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-11`** |
| `parameter` | **the `file` floor of the `secure` instance** |
| `kind` | **`option`** — **declared as the KIND the floor would have, NOT as an option this contract carries** |
| `unit` | **`n/a` — a floor over a tier domain, not a quantity** |
| `domain` | **EMPTY BY DECLARATION, inside this unit: the store declares NO floor parameter, NO floor check and NO floor record, because the enforcement is CLIENT-SIDE** (`P: §14 · A32`; `DD-15`) |
| `the values OUTSIDE it` | **every value** — because **the floor is not in this contract's declared surface at all** |
| `the declared answer for EACH outside value` | **NO store-side answer exists for the FLOOR ITSELF.** **What the store DOES answer, and all it answers, is the OBSERVATION: a sub-floor address that reaches a `secure` instance is NOT SEEN — the resolver answers `AddressNotFound`, exactly as for an address that does not exist, with a generated message and no distinguishing record.** **No `BelowSecureFloor` code exists and none is authored** (`contract.md §0.2 · DD-13`; `seams-and-lifecycle.md §8.1`'s absent-code clause) |
| `supplier` | **the consuming project** — *"blocked on the node side"* (`P: §9 · A4`), and the enforcement duty is a **`HO-` handoff**, never a step of this unit (`R: §16.1`: the handoff limb is *"ANSWERED, NOT RESIDUAL"*) |
| `evaluator` | **the consuming project's agents** (`P: §9 · A2`) — **the store does not police the floor** (`P: §14 · A32`: *"Client-side"*) |
| `observable` | **none in this unit for the floor**; **the store's own observable is `DD-13`'s indistinguishability drive — a sub-floor address and an absent address produce the SAME `status` and a message generated by the SAME template** |
| `the clause that declares it` | **`seams-and-lifecycle.md §8.3`** (the blindness clause) and **`seams-and-lifecycle.md §10.2`** (the `HO-` handoff row, one of the `7` prohibited rows the relocated `§10.2` prints — **⟶ REPOINTED 2026-10-11: the as-filed form read bare *"`§10.2`"*, which inside this part is `parameter-semantics.md §2.10` (`PAR-10`, the `opId` row); the path is added so the citation resolves to the relocated prohibited-set clause**) |
| `the ruling that pins it` | `P: §9 · A4` (no fourth inbuilt tier; a separate instance with a `file` floor) · `P: §14 · A32` (*"Client-side"*) · `P: §15 · A36` (*"Not see it"*) · `P: §9 · A2` (the delegation) |
| `alt` | an IN-STORE floor with its own refusal code, priced at `contract.md §0.2 · DD-13` and `DD-15` — **the alternative would move a client-side duty into this unit and would make the instance's blindness observable** |
| `park` | **the instance's MECHANISM** (its sharing of the journal, its listeners and its `file` path, and what a sub-floor WRITE does) is `docs/pending.md` `P-1`'s, carried by `contract.md §0.2 · DD-14` and `R: §16.1`'s `J-65` |

`[P: §9 · A2 · A4, §14 · A32, §15 · A36; R: §16.1; T: the client-side declaration | NEGATIVE + 1 PARK]`

### §2.12 `PAR-12` — `cfg.listeners[]`, the construction's listener array: its element shape, the empty case and the duplicate case

**⟶ ADDED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT (THE LISTENER AMENDMENT), ON `A56` AND
`A57`** (`RCA-8(d)` ANNOTATE-BESIDE; the rows above stand byte-for-byte).

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-12`** |
| `parameter` | **`cfg.listeners`** — the construction's listener array |
| `kind` | **`parameter`** |
| `unit` | **`count`** — a count of listener **ENTRIES**, each entry being one `{ address, handle }` record |
| `domain` | **an ARRAY of `{ address, handle }` records, where `address` lies in `PAR-1`'s domain.** **THE EMPTY ARRAY IS IN THE DOMAIN and is the ordinary no-listener store** (`DD-39`). **A DUPLICATE address is IN the domain: both entries are KEPT, each with its OWN handle** (`DD-39`, whose `alt` cell prices the address-level collapse the superseded `watch` performed) |
| `the values OUTSIDE it` | **ABSENT** from `cfg` · **`null`** · **`undefined`** · **a non-array** (`number`, `string`, `boolean`, `object`, a function) · **an array carrying an entry that is not an `{ address, handle }` record** · **an array carrying an entry whose `address` is outside `PAR-1`'s domain** · **an array carrying an entry whose `handle` is not a `ListenerHandle` the store can admit** |
| `the declared answer for EACH outside value` | **`AddressMalformed` for every one of them, with NO instance returned**: **an ABSENT `listeners` argument is the ONE absence `A56`'s construction does NOT admit** — the array is taken as an argument and the home is populated from it, so a missing array is an argument of a shape the construction does not carry, **and `seams-and-lifecycle.md §7.1`'s amended table prints this cell as its own**; **a malformed address INSIDE the array is `PAR-1`'s own answer carried** (`AddressMalformed`); **and no entry is silently dropped: a rejected array admits NOTHING and returns NO instance** |
| `supplier` | **the caller, at store creation** |
| `evaluator` | **the store's construction, at step (iv) of the ordered sequence — BEFORE the registry is generated** (`seams-and-lifecycle.md §7.1`; `A56`) |
| `observable` | **`P-TP-7`'s amended construction cell: `2` entries in ⇒ `2` entries in the home (the duplicate drive); `0` entries in ⇒ a store whose FIRST successful write carries `triggered: []`; and the register's carrier node carrying the references FROM THE OUTSET, because the home was populated first** (`A41`, `A56`; `P-TP-8`) |
| `the clause that declares it` | **`seams-and-lifecycle.md §7.1`** (the amended construction sequence, step (iv)) and **`write-and-read.md §6.5`** (item 8 (d)/(e)) |
| `the ruling that pins it` | `P: §17 · A56` (*"Accept listener array as args, and populate home map before generating registry"*) · `P: §18 · A57` (the element shape `{ address, handle }`) · `P: §11 · A45` / `P: §13 · A48` (the home) |
| `alt` | **a DUPLICATE COLLAPSED at the address level, as the superseded `watch` did — priced: it would silently discard a handle the caller supplied and can never get back (no verb returns it), and the shipped idempotence rule belonged to a surface `A58` supersedes; and an EMPTY array REFUSED — priced: it would make the ordinary no-listener store unconstructable. Both are `contract.md §0.2 · DD-39`'s** |
| `park` | **—** (the array is a construction argument and crosses no boundary; **how a JS client would supply it is `P-1`'s**) |

**⟶ AMENDED 2026-10-11 — TWO CORRECTIONS TO THIS ROW AND THE ONE ELEMENT IT OWED: THE STEP NUMBER IT NAMES, AND ITS OWN REVERSAL INSTRUMENT** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte and THIS clause is the operative statement of the two cells it corrects and of the instrument the row owes**; the gate-4 adversarial pass's `AM-15` and `AM-17`; `A56`; `A57`; `contract.md §0.2 · DD-39`; `contract.md §0.1` item 3 and item 11). **THE CLAUSE, IN THREE PARTS:**
**(1) THE STEP NUMBER, REPOINTED — THE CELLS ABOVE THAT READ *"step (iv)"* RESOLVE TO `seams-and-lifecycle.md §7.1`'s AMENDED SEQUENCE, WHOSE HOME-POPULATION STEP IS NUMBERED `5`:** **the `evaluator` cell's *"the store's construction, at step (iv) of the ordered sequence"* and the `the clause that declares it` cell's *"step (iv)"* are READ AS `seams-and-lifecycle.md §7.1` STEP `5`** — *"POPULATE THE HOME MAP FROM `listeners[]` — BEFORE THE REGISTRY IS GENERATED"* — **the `(i)`–`(v)` spelling being `A56`'s own transcription of the construction and not the clause's numbering** (`seams-and-lifecycle.md §7.1` steps 1–7: step 2 `journalLength`, step 3 the `filePath` probe, step 4 the tier's fixity, **step 5 the home's population**, step 6 the registry's generation, step 7 the boot-load). **The as-filed `(iv)` spelling stands above byte-for-byte and names STEP `5`, NEVER STEP 4** — **so `PAR-12`'s evaluator and clause cells now resolve to the step the amendment's own sequence numbers `5`, and the two cells agree with `contract.md §5.7`'s re-derived property (which prints *"populated BEFORE the registry is generated (`§7.1` step 5; `A56`)"*) and with `§5.9`'s `PAR-12` index row.**
**(2) `ABSENT` IS ONE OF THIS ROW'S SIX OUTSIDE VALUES AND ITS DECLARED ANSWER IS `AddressMalformed` WITH NO INSTANCE — the cell above prints it whole and `seams-and-lifecycle.md §7.1`'s amended `cfg.listeners` table row now prints it as its own, so the two homes agree value for value** (`A56`'s construction takes the array; the ONE absence it does not admit; the gate-4 adversarial pass's `AM-16`, whose reconciliation clause stands at that section).
**(3) THE ROW'S OWN REVERSAL POINT, NAMED BECAUSE A `DECLARED-DEFAULT` OWES ONE OF ITS OWN** (`contract.md §0.1` item 3 and item 11; the gate-4 adversarial pass's `AM-17`): **the row carries two priced alternatives in its `alt` cell** (a DUPLICATE COLLAPSED at the address level, and an EMPTY array REFUSED) — **and its REVERSAL INSTRUMENT is a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded**, `DD-39`'s own instrument; **the row's ruling-sourced half (the array's existence as a construction argument, and the element shape, `A56`/`A57`) reverses only against a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by that bounded amendment.** **NO PARK IS NAMED AS THIS ROW'S REVERSAL INSTRUMENT** (the row's `park` cell stands as filed). `[T: the step's repointing and the row's own reversal instrument | DECLARED-DEFAULT]`

`[P: §17 · A56, §18 · A57, §11 · A45, §13 · A48; T: the row's authoring, at this contract's sixth bounded
amendment | CONTRACT]`

### §2.13 `PAR-13` — the listener's `handle`: its type, its source, its uniqueness domain, and every outside value

**⟶ ADDED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT, ON `A57` AND `A58`** (`RCA-8(d)`
ANNOTATE-BESIDE).

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-13`** |
| `parameter` | **`handle`** — the listener record's second member, the value a trigger RETURNS, and the value `unlisten` accepts |
| `kind` | **`return-field`** (its registration-side twin is a **`seam`**'s returned value) |
| `unit` | **unitless and OPAQUE** — *"a handle that it returns to alert the client of the trigger"* (`A57`) |
| `domain` | **a value THE STORE MINTED — a store-unique opaque token, minted by `listen` and by the construction's `listeners[]` population, unique PER STORE INSTANCE and PER SESSION** (the uniqueness domain's spelling is `JournalOp.opId`'s own, `§6.2`, and is declared by THIS row as contract carriage). **It is the successor of the superseded `WatchHandle` and the ONE handle of this surface** (`A58`; `DD-35`'s neighbourhood) |
| `the values OUTSIDE it` | **ABSENT** from a `listeners[]` entry · **`null`** · **`undefined`** · **a blank (empty-string) value** · **a non-string, non-opaque value** · **a value a FOREIGN instance minted** · **a value THIS instance minted in a PRIOR SESSION** (`session` is the process; `§6.1` item 3) · **a value the store never minted at all (fabricated)** |
| `the declared answer for EACH outside value` | **`unlisten` over ANY of them — the foreign, the prior-session and the fabricated alike — is a NO-OP SUCCESS, and NOT a failure**: **no code is produced, and no other registration is removed** (the superseded `unwatch`'s own clause, `write-and-read.md §6.5` item 6, carried forward by the amendment). **A `listeners[]` entry whose `handle` the construction cannot admit is `AddressMalformed` and NO instance is returned** (`PAR-12`'s own answer, `AddressMalformed` being the member that carries the shape violations of a construction argument). **A handle appears in `triggered` ONLY where its listener's address is a prefix of the triggering address — a handle is never returned for a listener that did not trigger** (`P-TP-8`), **and a handle LOST or DUPLICATED by a change action that replaced the node carrying its borrow FAILS that row** (`A46`) |
| `supplier` | **the store** (the handle is minted by the store, in `listen` and in the construction's population); **the caller only passes it back** |
| `evaluator` | **the store (the home's lookup at `unlisten`, and the trigger's own selection at a `write` or a `delete`)** |
| `observable` | **`S-WATCH`'s re-derived drives (`contract.md §5.8`): the handle set returned by a `write` and by a `delete`; the unknown/foreign handle's no-op success; and the DESTRUCTION drive, where the handle survives the change action that replaced the node carrying its borrow** |
| `the clause that declares it` | **`write-and-read.md §6.5`** (items 8, 10 and 12) |
| `the ruling that pins it` | `P: §18 · A57` (*"a handle that it returns to alert the client of the trigger"*) · `P: §20 · A58` (*"Watch is a stopgap for the listener implementation"*) · `P: §12 · A46` (the borrows' lifetime) |
| `alt` | **an ID SURFACE instead of the minted opaque handle — priced: `A57`'s handle is what a trigger RETURNS, so an id would need a second returned value beside it (the *"one handle or two"* question `A58` answers as ONE), and a caller-supplied handle would let two listeners collide on one token; `contract.md §0.2 · DD-35`'s neighbour states the member's own fate** |
| `park` | **the handle's BOUNDARY CROSSING** — how a JS client eventually receives the handle list — is `docs/pending.md` `P-1`'s; **the in-store type, minting and uniqueness are declared HERE** (`R: §17.4` condition 2) |

**⟶ AMENDED 2026-10-11 — THIS ROW'S OWN REVERSAL INSTRUMENT, NAMED BECAUSE A `DECLARED-DEFAULT` OWES ONE OF ITS OWN** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte**; the gate-4 adversarial pass's `AM-17`; `contract.md §0.1` item 3 and item 11; `A57`; `A58`; `contract.md §0.2 · DD-35`; `contract.md §0.4`'s `ListenerHandle` clause): **the row carries its priced alternative in its `alt` cell** (an ID SURFACE instead of the minted opaque handle, with the two questions it would re-open) — **and its REVERSAL INSTRUMENT is a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded** (`contract.md §0.2`'s preamble: the instrument for a row whose source is this contract's own choice — **and the handle's caller-constructible spelling is that row's own `DECLARED-DEFAULT` at `contract.md §0.4`, whose reversal point is the same instrument**). **The row's ruling-sourced half — that a `handle` exists at all, that a trigger RETURNS it, and that the listener record is `{ address, handle }` (`A57`) — reverses only against a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by that bounded amendment.** **NO PARK IS NAMED AS THIS ROW'S REVERSAL INSTRUMENT** (the row's `park` cell names the handle's BOUNDARY CROSSING as `P-1`'s, and it stands as filed). `[T: the row's own reversal instrument | DECLARED-DEFAULT]`

`[P: §18 · A57, §20 · A58, §12 · A46; R: §17.4; T: the row's authoring | CONTRACT + 1 PARK]`

**⟶ RECONCILED 2026-10-11 — `PAR-13`'s DOMAIN CELL AND OUTSIDE VALUES RE-STATED ON CLAUSE 2'S NEW
SPELLING, AND THE PRIOR-SESSION ANSWER PRINTED AS ITS OWN CONDITIONAL** (`RCA-8(d)` ANNOTATE-BESIDE:
**EVERY CELL OF THIS ROW, ITS `alt`, ITS `park` AND THE DATED REVERSAL CLAUSE ABOVE STAND BYTE-FOR-BYTE,
and THIS clause is the operative statement of the row's uniqueness domain and of its four outside-value
classes — the as-filed cells are quoted below so nothing either read is lost and `git diff` recovers the
pre-pass bytes**; `contract.md §0.4`'s dated clause; `P: §13 · A69`; `write-and-read.md §6.5` item 12;
`DD-42`; `DD-39`; `tests/e2e_listener_firing.rs`'s `lf_e12`; `[T: the row's domain and outside values,
restated with the as-filed cell re-emitted, so the clause and the cells agree item for item | CONTRACT]`).

**THE AS-FILED CELLS THIS CLAUSE RECONCILES, RE-EMITTED IN THEIR OWN WORDS:** **the `domain` cell read**
*"**a value THE STORE MINTED — a store-unique opaque token, minted by `listen` and by the construction's
`listeners[]` population, unique PER STORE INSTANCE and PER SESSION** (the uniqueness domain's spelling is
`JournalOp.opId`'s own, `§6.2`, and is declared by THIS row as contract carriage)"*; **and the `the
declared answer for EACH outside value` cell read** *"**`unlisten` over ANY of them — the foreign, the
prior-session and the fabricated alike — is a NO-OP SUCCESS, and NOT a failure**: **no code is produced,
and no other registration is removed**"*.

**THE OPERATIVE `domain` CELL, RE-STATED ON CLAUSE 2'S PROCESS SCOPE:** **a value THE STORE MINTED — a
store-unique opaque token, minted by `listen` and by the construction's `listeners[]` population, UNIQUE
PER PROCESS: no OTHER token the store mints, in this instance, in ANY other instance of THIS process, or
at ANY LATER moment of THIS process, is equal to it (`contract.md §0.4` clause 2, its dated clause).**
**The uniqueness domain's spelling is `JournalOp.opId`'s own (`§6.2`), which carries the same dated
reconciliation; it is declared by THIS row as contract carriage.** **It is the successor of the superseded
`WatchHandle` and the ONE handle of this surface** (`A58`; `DD-35`'s neighbourhood).

**THE FOUR OUTSIDE-VALUE CLASSES, EACH WITH ITS DECLARED ANSWER, READ ON THE PROCESS SCOPE (the row's
outside-value list is UNMOVED and every member of it keeps its declared answer; what this clause prints is
which of them answers UNCONDITIONALLY and which one carries a condition):**
- **(A) UNKNOWN · FABRICATED** — **a value the store never minted at all: a NO-OP SUCCESS, UNCONDITIONALLY.
  No code is produced and NO other registration is removed.**
- **(B) FOREIGN-INSTANCE (same process)** — **a value ANOTHER instance of THIS process minted: a NO-OP
  SUCCESS, UNCONDITIONALLY, and it cannot name THIS instance's entry, because a minted token is unique
  across this process's instances (`§0.4` clause 2's dated clause). No code is produced and NO other
  registration is removed.**
- **(C) PRIOR-SESSION (different process)** — **a value a PRIOR SESSION minted: a NO-OP SUCCESS EXACTLY
  WHEN THE CURRENT PROCESS HAS NOT MINTED THAT TOKEN — a NO-OP SUCCESS while this process (and therefore
  the instance the caller is speaking to) has minted NO equal token, and where the current process HAS
  since minted that same token, it names THAT registration for a DIFFERENT listener, because a prior
  session's handle lies OUTSIDE the domain while its TOKEN may lie INSIDE this process's minted set (handle
  identity is TOKEN EQUALITY ALONE, `contract.md §0.4` clause 1). THE DECLARED CROSS-PROCESS HAZARD, NOT A
  DEFENDED PROPERTY: a caller that must be safe across a reload must not carry handles across it**
  (`P: §13 · A69`'s accepted-consequence cell).
- **(D) THE SHAPE VIOLATIONS** — **ABSENT from a `listeners[]` entry · `null` · `undefined` · a blank
  (empty-string) value · a non-string, non-opaque value: an ANSWER THAT DEPENDS ON WHERE THE VALUE IS
  PRESENTED.** **At `unlisten` each is the NO-OP SUCCESS of (A); at the CONSTRUCTION a `listeners[]` entry
  whose `handle` the construction cannot admit is `AddressMalformed` and NO instance is returned**
  (`PAR-12`'s own answer).
**AND THE ONE NOTE THIS CELL OWES ON CLAUSE 3, PRINTED SO THE STANDING CELLS' SUBJECT IS NAMED:**
**`contract.md §0.4` clause 3's *"removing NO other registration"* is what the standing cells drive
(`tests/e2e_listener_firing.rs`'s `lf_e12_a_fabricated_and_a_foreign_handle_unlisten_remove_nothing`;
`tests/watched_addresses.rs`'s `par_13_a_foreign_instance_s_handle_is_a_no_op_success_and_the_other_instance_is_untouched`
and `par_13_two_instances_never_cross_name_each_other_s_registrations`), and IT HOLDS UNCONDITIONALLY FOR
CLASSES (A), (B) AND (D) — a token outside this process's minted set and an instance-local adopted token
each name no entry, so nothing else can be removed, and a foreign-instance or fabricated value can never
name THIS instance's registration because a minted token is unique across this process's instances. FOR
CLASS (C) IT HOLDS UNDER THE CONDITION PRINTED ABOVE, and under it ALONE: the prior-session value is
OUTSIDE the domain while its token may lie INSIDE this process's minted set.**

**AND THE TWO ANSWERS THIS ROW DOES NOT MOVE, NAMED SO THE RECONCILIATION IS NOT READ AS A WIDENING:**
**(1)** **the trigger half is UNMOVED: a handle appears in `triggered` ONLY where its listener's address is
a prefix of the triggering address, and a handle is never returned for a listener that did not trigger**
(`P-TP-8`); **and (2)** **the lifetime half is UNMOVED: a handle LOST or DUPLICATED by a change action that
replaced the node carrying its borrow FAILS that row** (`A46`). **NO ROW IS ADDED, DROPPED OR RENUMBERED BY
THIS CLAUSE, `0` CELLS READ `TBD`, AND NOT ONE OF THE `14` `PAR` ROWS MOVES: this part's set stands at `14`
(`12 + 1 + 1 = 14` ✓) and the typed `P-*` register stands at `8` rows with its cap holding (`8 ≤ 8` ✓).**

### §2.14 `PAR-14` — the two lists' entries, and the reference they carry into the home

**⟶ ADDED 2026-10-11, AT THIS CONTRACT'S SIXTH BOUNDED AMENDMENT, ON `A45`, `A46`, `A47` AND `A48`**
(`RCA-8(d)` ANNOTATE-BESIDE).

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-14`** |
| `parameter` | **a node's `active` list and `carried` list — the two per-node LISTENER REFERENCE LISTS** (`A47`) |
| `kind` | **`seam`** — **NOT a parameter the caller supplies: it is the store's own internal reference surface, declared because `A47` gives it two members and `AR-6` requires the member tables and the spelling table to move with it** |
| `unit` | **`count`** — a count of REFERENCES, each referring to ONE home-map entry |
| `domain` | **for a `branch`: `0` to many references, split by the partition rule — `active` holds the references of the listeners bound EXACTLY at this node's address, `carried` holds the references a newly created child takes; THE TWO LISTS ARE DISJOINT AT A NODE.** **For a `leaf`: `active` may hold the references of the listeners bound at the leaf's own address, and `carried` is EMPTY BY CONSTRUCTION** (`store-model.md §1.1`; *"leaf nodes cannot have downstream anchors"*) |
| `the values OUTSIDE it` | **a LISTENER RECORD OR A CALLABLE HELD ON THE NODE** (a copy, never a reference — `A45`/`A48`; `DD-32`) · **an ADDRESS stored as a list entry instead of a reference** · **a `leaf` with a NON-EMPTY `carried` list** · **a node whose `active` and `carried` lists hold the SAME reference** · **a reference that outlives the node that held it** |
| `the declared answer for EACH outside value` | **each is a VIOLATION OF `P-SM-4`'s and `P-TP-8`'s declared properties and not a code** — **this surface produces NO `§8.1` member: the per-node lists are internal, no caller argument reaches them, and the amendment mints NO code for them** (`seams-and-lifecycle.md §8.1`'s complement). **The observable for each is named in the same cell: a copy instead of a reference is observed by the home and the node disagreeing after a registration is withdrawn (`A45`); a leaf's non-empty `carried` list by a descendant-inheritance drive over a leaf (`§1.1`); a self-holding node by the DESTRUCTION drive's duplicated handle (`A46`)** |
| `supplier` | **the store** (the lists are built by the construction, by a node's creation from its nearest parent, and by the arms — never by a caller) |
| `evaluator` | **the store (the arms that mint, purge, re-mint, delete and roll back, and the trigger's own selection)** |
| `observable` | **`P-SM-4`'s listener half and `P-TP-8`'s re-derived drives (`(iv)` the DESTRUCTION drive and `(v)` the HOME-IS-NOT-A-GRAPH-STRUCTURE drive), plus `P-IM-3`'s CLOSURE pass — no address answers a sixth structure, so these lists surface in NO read** |
| `the clause that declares it` | **`write-and-read.md §6.5`** (items 8 (c) and 9 (a)–(e)) and **`store-model.md §1.1`** (the two member tables) |
| `the ruling that pins it` | `P: §11 · A45` (*"the top-level listener map is the home and the nodes borrow"*) · `P: §12 · A46` (*"The borrow is removed on node change actions because they destroy and replace nodes"*) · `P: §12 · A47` (*"Two lists to keep active listeners separate from ones that are being passed to children"*) · `P: §13 · A48` |
| `alt` | **a STABLE ID/INDEX into the home instead of a shared handle — priced: it needs the additional rule that the home's removal path be the only way an entry dies, so no index can be reused while a node still names it; `contract.md §0.2 · DD-32` carries it. AND AN ACTIVE LISTENER ALSO CARRIED — priced: it would make a listener bound at an ancestor fire TWICE for one write unless a de-duplication rule were added; `write-and-read.md §6.5` item 9 (d) carries it** |
| `park` | **—** (an internal reference crosses no boundary) |

**⟶ AMENDED 2026-10-11 — THE ROW IS CONDITIONAL ON THE PER-NODE INDEX'S MATERIALIZATION, AND ITS REVERSAL INSTRUMENT IS NAMED IN ITS OWN `alt` CELL'S TERMS** (`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte and THIS clause is the operative statement of when the lists this row declares exist, and of the row's own reversal instrument**; the gate-4 adversarial pass's `AM-2` and `AM-17`; `A45`; `A47`; `DD-41`; `DD-32`; `store-model.md §1.1`'s dated clause; `write-and-read.md §6.5` item 9's clause (a-bis) and item 13's clause; `contract.md §5.8` (d)'s dated clause). **THE CLAUSE, IN THREE PARTS:**
**(1)** **the two lists are an INDEX FOR LOOKUP COST and their materialization is OPTIONAL:** where the index IS materialized, this row's `domain`, `the values OUTSIDE it`, `declared answer` and `observable` cells bind whole and each outside value is reachable; **where it is NOT materialized, a node holds NEITHER list, `DD-32`'s borrow spelling has no subject, this row's cells have NO INSTANCE, and its outside values are named UNREACHABLE for that spelling rather than left to be inferred from a missing member** — so no claim of this directory reads a node-side member a node shape does not carry;
**(2)** **the row's `alt` cell's two priced alternatives stand unchanged** (`DD-32`'s stable-id/index spelling, with the home-removal rule it needs; and the ACTIVE-listener-ALSO-CARRIED overlay, with the double-fire it would create) — **and neither is this row's reversal instrument**;
**(3)** **THE ROW'S OWN REVERSAL POINT, NAMED BECAUSE A `DECLARED-DEFAULT` OWES ONE OF ITS OWN** (`contract.md §0.1` item 3 and item 11; the gate-4 adversarial pass's `AM-17`): **the instrument is a bounded amendment of `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded** — the instrument `contract.md §0.2`'s preamble names for a row whose source is this contract's own choice — **and the row's ruling-sourced half (the two lists' existence, `A47`) reverses only against a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by that bounded amendment.** **NO PARK IS NAMED AS THIS ROW'S REVERSAL INSTRUMENT, and the row's `park` cell — *"—"* — is unmoved.** `[T: the row's conditional subject and its own reversal instrument | DECLARED-DEFAULT]`

`[P: §11 · A45, §12 · A46 · A47, §13 · A48; T: the row's authoring | CONTRACT]`

---

**ARITHMETIC OF THIS PART, RESTATED WITH ITS TERMS BY THE LISTENER AMENDMENT — THE OPERATIVE FIGURE**
(`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed closing arithmetic (`11` rows, `9 + 1 + 1 = 11`) stands
byte-for-byte above and THIS clause is the operative count**): **the `PAR` row set is `14` rows
(`PAR-1`…`PAR-14`) = `12` parameters the store carries (`PAR-1`…`PAR-8`, `PAR-10`, `PAR-12`, `PAR-13`) + `1`
parked parameter (`PAR-9`) + `1` internal reference surface (`PAR-14`) + `1` client-side duty (`PAR-11`) —
**`12 + 1 + 1 + 1 = 15` — ⟶ CORRECTED 2026-10-11 (THE PROOFREADING GATE, `role_proofreader`; THE TERM LIST AND ITS SUM STAND BYTE-FOR-BYTE AND THIS CLAUSE IS THE OPERATIVE ARITHMETIC)** (`RCA-8(d)` ANNOTATE-BESIDE: **the cell printed a FOUR-term sum and then asserted the set closes at `14`, so `12 + 1 + 1 + 1 = 15` was FALSE OF ITS OWN TERMS — `4` addends against `3` in the closing figure**): **THE FOUR PARTS OF THE `14`-ROW SET ARE COUNTED ONCE EACH — `12` caller-facing parameters and surfaces the store carries (`PAR-1`…`PAR-8`, `PAR-10`, `PAR-12`, `PAR-13`) + `1` parked parameter (`PAR-9`) + `1` client-side duty (`PAR-11`) + `1` internal reference surface (`PAR-14`) — and `PAR-14` is the store's OWN internal surface and NOT a caller parameter, so the CALLER-FACING and DECLARED-ROW count is `12 + 1 + 1 = 14` ✓.** **THE SET CLOSES AT `14` BY EITHER READING (`14` caller-facing/declared rows = `14` `PAR` ids) AND THE `15` IS REFUTED; the contract document's `§9` index carries the same correction, so this part and its relocation agree** (`contract.md §9`; `[T: this part's own accounting, corrected at the proofreading gate so no cell sums `4` terms to `3` | CENSUS]`). **`PAR-12` and `PAR-13` are the
two CALLER-FACING rows the list
required and did not have; `PAR-14` is the internal row `AR-6`'s condition forces the moment the member
tables move.** **`0` cells read `TBD`, and every one of the `14` names the values outside its domain AND the
declared answer for each outside value** — **with the amendment's own two changed answers named: `PAR-6`'s
ABSENT case is NO LONGER a failure, and the codes the rows cite now come from the closed `15`-member set at
`seams-and-lifecycle.md §8.1`** (`[T: this part's own accounting, restated at this contract's sixth bounded
amendment | CENSUS]`).

**AND THE `§1` INDEX'S OWN RECONCILIATION, STATED SO THE TWO HOMES AGREE BY POINTER AND BY COUNT** (`[T: the
index's reconciliation, at this contract's sixth bounded amendment, with the relocated span named |
CROSS-REF]`): **`§1`'s as-filed index table lists `PAR-1`…`PAR-11` and its arithmetic prints
`9 + 1 + 1 = 11`; BOTH STAND BYTE-FOR-BYTE ABOVE, and the amendment's rows are the `3` its table does not
name — `PAR-12` (`cfg.listeners`, declared at `seams-and-lifecycle.md §7.1`), `PAR-13` (the listener's
`handle`, declared at `write-and-read.md §6.5` items 10 and 12) and `PAR-14` (the two per-node lists,
declared at `write-and-read.md §6.5` item 9 and `store-model.md §1.1`), each row living at `§2.12`, `§2.13`
and `§2.14` of this part.** **The `contract.md §9` index's own reconciliation is a clause of the CONTRACT
DOCUMENT's `§9`, and it carries the same three additions** (that section is the index's home in the contract
document, and this part's `§1` is its relocation).

---

**ARITHMETIC OF THIS PART, PRINTED WITH ITS TERMS: `11` `PAR` rows = `9` parameters the store carries
(`PAR-1`…`PAR-8`, `PAR-10`) + `1` parked parameter (`PAR-9`) + `1` client-side duty (`PAR-11`)
(`9 + 1 + 1 = 11` ✓);** **each of the `11` names the values outside its domain AND the declared answer for
each outside value, and `0` cells read `TBD`** (`[T: this part's own accounting | CENSUS]`).

**END OF THE `parameter-semantics` PART.** **Its relocated span is `contract.md §9` (its `§`-number
unchanged); its authored content is `§2`'s `PAR-1`…`PAR-11` rows, each of which cites the contract clause
that declares the parameter it names and invents no behaviour.** **A citation to the relocated index is
written with this part's path** (`docs/specs/storeroom-native/parameter-semantics.md §1`, etc.) — *a bare
`§n` across documents is not an edge* (`docs/specs/storeroom-native/contract.md` §3.6 and §0.1 item 10(a);
`[T: contract.md §3.6 and §0.1 item 10(a) | CROSS-REF]`).

**⟶ AND ONE CLOSING RECORD, ADDED 2026-10-11 SO THIS PART'S OWN RECONCILIATION IS COUNTABLE RATHER THAN
ASSUMED** (`RCA-8(d)` ANNOTATE-BESIDE: **every sentence above stands byte-for-byte**; `contract.md §0.4`
clause 2's dated clause; `P: §13 · A69`; `[T: this part's own count of the cells the process-scope
reconciliation touched | CENSUS]`): **THIS PART CARRIES `2` OF THE DIRECTORY'S `5` CELLS THAT READ THE
*"per instance and per session"* CLAIM — `§2.10` (`PAR-10`'s `domain` cell) and `§2.13` (`PAR-13`'s `domain`
cell, with its four outside-value classes) — and each is reconciled IN PLACE BESIDE ITS OWN CELL, the
as-filed text re-emitted and nothing deleted.** **THE OTHER `3` CELLS ARE THE CONTRACT DOCUMENT'S: `§0.4`
clause 2 (the operative re-statement, from which the other cells read), `§6.2`'s `JournalOp.opId` comment
(the same claim in the record's own comment), and the RELOCATED twin of that comment at
`write-and-read.md §6.2` — whose home this part does not carry and which the contract document's `§6.2`
dated clause names as the superseded mirror** (`docs/specs/storeroom-native/write-and-read.md §6.2`, a
**`carrier`** part's relocation of `contract.md §6.2`, readable through that clause). **NO ROW COUNT, NO
CAP, NO FAIL-SET MEMBER AND NO `DD` ROW MOVES: this part's set stands at `14` rows
(`12 + 1 + 1 = 14` ✓), the typed register at `8` (`8 ≤ 8` ✓), the fail set at `15`
(`11 + 2 + 1 + 1 = 15` ✓) and the table at `46` (`24 + 3 + 2 + 1 + 1 + 9 + 5 + 1 = 46` ✓).**

